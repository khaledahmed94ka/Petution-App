import React, { createContext, useContext, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  auth,
  isFirebaseConfigured,
  toAppUser,
  watchAuth,
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  sendPasswordReset,
  signOutUser
} from '../services/firebaseAuth';
import { createCloudStore } from '../services/firestoreDb';
import { createDemoStore, clearDemoData } from '../services/demoStore';
import { readLegacyLocalData, clearLegacyLocalData, pruneLegacyLocalData } from '../services/legacyLocalData';
import { syncToShopify } from '../services/shopifySync';
import { COLLECTIONS, emptyCollections, sortCollection } from '../data/collections';
import { DEMO_USER } from '../data/demoSeed';
import { newId, todayLocal, slugify } from '../utils/ids';

const AppContext = createContext();

const DEMO_SESSION_KEY = 'petution_demo_session';

const DEFAULT_SETTINGS = {
  orgName: 'My Clinic',
  slug: 'my-clinic',
  phone: '',
  address: '',
  website: '',
  shopifyShop: '',
  shopifySyncEnabled: false
};

const DOCTOR_ROLES = ['owner', 'vet'];

const readFlag = (key) => {
  try {
    return localStorage.getItem(key) === 'true';
  } catch {
    return false;
  }
};

const writeFlag = (key, on) => {
  try {
    if (on) localStorage.setItem(key, 'true');
    else localStorage.removeItem(key);
  } catch {
    // Storage blocked: the flag only lasts for this page load.
  }
};

const readUrlParam = (name) => {
  try {
    return new URL(window.location.href).searchParams.get(name);
  } catch {
    return null;
  }
};

const describeSaveError = (err) =>
  err?.code === 'permission-denied'
    ? 'The server refused to save a change (permission denied). Sign out, sign in again, and retry.'
    : `A change could not be saved: ${err?.message || err}`;

// Firestore document IDs cannot contain "/"; anything else from an import is kept.
const safeId = (id, prefix) => (typeof id === 'string' && id.trim() && !id.includes('/') ? id : newId(prefix));

const numberOr = (fallback, ...values) => {
  const value = values.find(v => v !== undefined && v !== null && v !== '');
  return value === undefined ? fallback : Number(value);
};

const yes = (...values) => values.some(v => ['true', 'yes'].includes(String(v ?? '').trim().toLowerCase()));

const parseJsonList = (value, fallback) => {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string' || !value.trim()) return fallback;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

const formatImportedClient = (c, now) => {
  const phone = c.phone || c.PrimaryPhone || '';
  return {
    id: safeId(c.id, 'cli'),
    name: c.name || c.ClientName || c.PetOwnerName || 'Imported Client',
    source: c.source || c.Source || 'Imported',
    governorate: c.governorate || c.Governorate || 'Cairo',
    district: c.district || c.District || '',
    street: c.street || c.Street || '',
    phones: parseJsonList(c.phones, [{ phone, label: 'Primary', isPrimary: true }]),
    tags: parseJsonList(c.tags, ['Imported']),
    pets: [],
    createdAt: c.createdAt || c.CreatedDate || todayLocal(),
    createdTs: now
  };
};

const formatImportedPet = (p, now) => ({
  id: safeId(p.id, 'pet'),
  name: p.name || p.PetName || 'Imported Pet',
  ageValue: numberOr(1, p.ageValue, p.Age),
  ageUnit: p.ageUnit || p.AgeUnit || 'years',
  species: String(p.species || p.Species || p.Type || 'cat').toLowerCase(),
  gender: p.gender || p.Gender || 'male',
  vaccinated: yes(p.vaccinated, p.Vaccinated),
  deworming: yes(p.deworming, p.Deworming),
  antiflea: yes(p.antiflea, p.Antiflea),
  castrated: yes(p.castrated, p.Castrated, p.Neutered),
  neuterDate: p.neuterDate || p.NeuterDate || p.NeuteredDate || '',
  breed: p.breed || p.Breed || '',
  temperament: p.temperament || p.Temperament || 'Calm',
  color: p.color || p.Color || '',
  bloodGroup: p.bloodGroup || p.BloodGroup || 'Unspecified',
  cardNo: p.cardNo || p.CardNo || '',
  protocolNo: p.protocolNo || p.ProtocolNo || '',
  microchipNumber: p.microchipNumber || p.MicrochipNumber || '',
  microchipDate: p.microchipDate || p.MicrochipDate || '',
  microchipLocation: p.microchipLocation || p.MicrochipLocation || '',
  isAggressive: yes(p.isAggressive, p.IsAggressive, p.Aggressive),
  isDeceased: yes(p.isDeceased, p.IsDeceased, p.Deceased),
  deathDate: p.deathDate || p.DeathDate || '',
  privateNotes: p.privateNotes || p.PrivateNotes || '',
  tags: Array.isArray(p.tags) ? p.tags : (p.Tags ? String(p.Tags).split(',') : ['Imported']),
  nutrition: ['Dry food'],
  owners: [],
  createdAt: p.createdAt || p.CreatedDate || todayLocal(),
  createdTs: now
});

const formatImportedProduct = (p, now) => {
  const price = numberOr(100, p.pricePerUnit, p.PricePerUnit);
  const cost = numberOr(50, p.costPerUnit, p.CostPerUnit);
  const reminderDays = numberOr(null, p.reminderDays, p.ReminderDays);
  return {
    id: safeId(p.id, 'prod'),
    name: p.name || p.ItemName || 'Imported Product',
    type: p.type || p.Type || 'product',
    unitType: p.unitType || p.UnitType || 'Piece',
    pricingUnit: p.pricingUnit || p.PricingUnit || 'Piece',
    pricePerUnit: price,
    costPerUnit: cost,
    revenuePerUnit: price - cost,
    quantity: numberOr(10, p.quantity, p.Quantity),
    alertThreshold: numberOr(5, p.alertThreshold, p.AlertThreshold),
    reminderDays,
    notes: p.notes || p.Notes || '',
    createdTs: now
  };
};

// Creates what a brand-new account needs: clinic settings, one workspace, and the
// owner in the team list. Runs once per sign-in, after the first server snapshot.
const bootstrapAccount = async (store, current, user, pendingSignup) => {
  if (!user) return;
  const now = Date.now();
  const ownerName = pendingSignup?.name || user.name;
  const existingSettings = current.settings.find(s => s.id === 'global');
  const clinicName = existingSettings?.orgName || pendingSignup?.clinicName || DEFAULT_SETTINGS.orgName;
  const writes = [];

  let workspaceId = existingSettings?.activeWorkspaceId || current.workspaces[0]?.id;
  if (!current.workspaces.length) {
    workspaceId = newId('ws');
    writes.push(store.set('workspaces', { id: workspaceId, name: clinicName, slug: slugify(clinicName), plan: 'Trial Plan', createdTs: now }));
  }

  if (!existingSettings) {
    writes.push(store.set('settings', {
      ...DEFAULT_SETTINGS,
      id: 'global',
      orgName: clinicName,
      slug: slugify(clinicName),
      activeWorkspaceId: workspaceId
    }));
    writes.push(store.set('notifications', {
      id: newId('n'),
      title: `Welcome to Petution, ${ownerName}!`,
      time: todayLocal(),
      read: false,
      createdTs: now
    }));
  } else if (!existingSettings.activeWorkspaceId) {
    writes.push(store.update('settings', 'global', { activeWorkspaceId: workspaceId }));
  }

  if (!current.team.some(member => member.id === user.id)) {
    writes.push(store.set('team', { id: user.id, name: ownerName, email: user.email, role: 'Owner', status: 'active', createdTs: now }));
  }

  await Promise.all(writes);
};

export const AppProvider = ({ children }) => {
  // --- Session ---
  const [authStatus, setAuthStatus] = useState('loading'); // loading | ready
  const [user, setUser] = useState(null);
  const [store, setStore] = useState(null);

  // --- Clinic data (mirrors the store; never edited directly) ---
  const [data, setData] = useState(emptyCollections);
  const [dataStatus, setDataStatus] = useState('idle'); // idle | loading | ready | error
  const [dataError, setDataError] = useState(null);
  const [syncError, setSyncError] = useState(null);
  const [legacyData, setLegacyData] = useState({ collections: {}, count: 0 });

  // --- UI state ---
  const [activeTab, setActiveTab] = useState(() => readUrlParam('tab') || 'reminders');
  const [isEmbedded] = useState(() => readUrlParam('embedded') === 'true');
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const storeOwnerRef = useRef(null);
  const demoActiveRef = useRef(false);
  const pendingSignupRef = useRef(null);
  const bootstrappedStoreRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  const resetUi = useCallback(() => {
    setActiveDrawer(null);
    setActiveModalItem(null);
    setShowWorkspaceMenu(false);
    setShowNotifications(false);
  }, []);

  const openDemo = useCallback(() => {
    demoActiveRef.current = true;
    storeOwnerRef.current = DEMO_USER.id;
    setUser(DEMO_USER);
    setStore(createDemoStore());
  }, []);

  const applyFirebaseUser = useCallback((firebaseUser) => {
    if (demoActiveRef.current) return;
    if (!firebaseUser) {
      storeOwnerRef.current = null;
      setUser(null);
      setStore(null);
      resetUi();
      return;
    }
    setUser(toAppUser(firebaseUser));
    if (storeOwnerRef.current !== firebaseUser.uid) {
      storeOwnerRef.current = firebaseUser.uid;
      setStore(createCloudStore(firebaseUser.uid));
    }
  }, [resetUi]);

  // Firebase decides who is signed in. Nothing in localStorage can make someone "logged in".
  useEffect(() => {
    pruneLegacyLocalData();
    setLegacyData(readLegacyLocalData());

    if (readFlag(DEMO_SESSION_KEY)) {
      openDemo();
      setAuthStatus('ready');
    }
    if (!isFirebaseConfigured) {
      setAuthStatus('ready');
      return undefined;
    }
    return watchAuth(firebaseUser => {
      applyFirebaseUser(firebaseUser);
      setAuthStatus('ready');
    });
  }, [openDemo, applyFirebaseUser]);

  // Mirror every collection from the store. Each store change arrives here, so the
  // screen always shows what is actually saved.
  useEffect(() => {
    setData(emptyCollections());
    setDataError(null);
    if (!store) {
      setDataStatus('idle');
      return undefined;
    }
    setDataStatus('loading');

    const current = emptyCollections();
    const loaded = new Set();
    const loadedFromServer = new Set();

    return store.subscribe(
      (name, docs, meta) => {
        current[name] = docs;
        setData(prev => ({ ...prev, [name]: sortCollection(name, docs) }));
        loaded.add(name);
        if (!meta.fromCache) loadedFromServer.add(name);
        if (loaded.size === COLLECTIONS.length) {
          setDataStatus(status => (status === 'error' ? status : 'ready'));
        }
        if (loadedFromServer.size === COLLECTIONS.length && bootstrappedStoreRef.current !== store) {
          bootstrappedStoreRef.current = store;
          const pendingSignup = pendingSignupRef.current;
          pendingSignupRef.current = null;
          bootstrapAccount(store, current, userRef.current, pendingSignup)
            .catch(err => setSyncError(describeSaveError(err)));
        }
      },
      (name, err) => {
        console.error(`[Data] Could not load ${name}:`, err);
        setDataError(err);
        setDataStatus('error');
      }
    );
  }, [store]);

  // --- Derived values ---
  const {
    clients, pets, visits, products, invoices, expenses, vaccines, soapNotes,
    reminders, team, invitations, stockLogs, notifications
  } = data;

  const settings = useMemo(() => {
    const { id, ...saved } = data.settings.find(s => s.id === 'global') || {};
    return { ...DEFAULT_SETTINGS, ...saved };
  }, [data.settings]);

  const workspaces = data.workspaces;
  const activeWorkspaceId = settings.activeWorkspaceId || workspaces[0]?.id || null;
  const isDemo = store?.kind === 'demo';

  // Vets who can be assigned to visits and sign prescriptions.
  const doctorNames = useMemo(() => {
    const names = team
      .filter(member => DOCTOR_ROLES.includes(String(member.role || '').toLowerCase()))
      .map(member => member.name)
      .filter(Boolean);
    if (user?.name) names.unshift(user.name);
    return [...new Set(names)];
  }, [team, user]);

  // --- Writing ---
  const reportSaveError = (err) => {
    console.error('[Data] Save failed:', err);
    setSyncError(describeSaveError(err));
  };

  const persist = (write) => {
    try {
      Promise.resolve(write()).catch(reportSaveError);
    } catch (err) {
      reportSaveError(err);
    }
  };

  const createRecord = (name, prefix, fields) => {
    if (!store) return null;
    const record = { ...fields, id: newId(prefix), createdTs: Date.now() };
    persist(() => store.set(name, record));
    return record;
  };

  const updateRecord = (name, id, changes) => {
    if (store) persist(() => store.update(name, id, changes));
  };

  const removeRecord = (name, id) => {
    if (store) persist(() => store.remove(name, id));
  };

  const saveMany = (name, records) => {
    if (store && records.length) persist(() => store.setMany(name, records));
  };

  const pushToShopify = (type, action, payload) => {
    if (store?.kind !== 'cloud') return;
    syncToShopify({ settings, getIdToken: () => auth?.currentUser?.getIdToken() }, type, action, payload)
      .catch(err => {
        console.error('[Shopify] Sync failed:', err);
        setSyncError(err.message);
      });
  };

  const logStock = (itemName, change) => {
    createRecord('stockLogs', 'log', { itemName, change, user: user?.name || '', date: todayLocal() });
  };

  // --- Workspaces & settings ---
  const updateSettings = (newSettings) => {
    const { id, ...fields } = newSettings;
    updateRecord('settings', 'global', fields);
    if (activeWorkspaceId && (fields.orgName !== undefined || fields.slug !== undefined)) {
      updateRecord('workspaces', activeWorkspaceId, { name: fields.orgName ?? settings.orgName, slug: fields.slug ?? settings.slug });
    }
  };

  const registerClinic = (clinicData) => {
    const workspace = createRecord('workspaces', 'ws', {
      name: clinicData.clinicName,
      slug: slugify(clinicData.clinicName),
      plan: clinicData.plan || 'Trial Plan'
    });
    if (!workspace) return;
    updateRecord('settings', 'global', {
      orgName: workspace.name,
      slug: workspace.slug,
      phone: clinicData.phone || settings.phone,
      address: [clinicData.district, clinicData.governorate].filter(Boolean).join(', '),
      activeWorkspaceId: workspace.id
    });
    createRecord('notifications', 'n', { title: `Registered workspace: ${workspace.name}`, time: todayLocal(), read: false });
  };

  const switchWorkspace = (wsId) => {
    const workspace = workspaces.find(w => w.id === wsId);
    if (workspace) {
      updateRecord('settings', 'global', { activeWorkspaceId: workspace.id, orgName: workspace.name, slug: workspace.slug });
    }
  };

  const deleteWorkspace = (wsId) => {
    if (workspaces.length <= 1) {
      alert('Cannot delete the only remaining workspace. You must have at least one active clinic.');
      return;
    }
    const target = workspaces.find(w => w.id === wsId);
    removeRecord('workspaces', wsId);
    if (activeWorkspaceId === wsId) {
      const next = workspaces.find(w => w.id !== wsId);
      updateRecord('settings', 'global', { activeWorkspaceId: next.id, orgName: next.name, slug: next.slug });
    }
    alert(`Clinic workspace "${target ? target.name : 'workspace'}" has been deleted.`);
  };

  // --- Clients, pets, visits ---
  const addClient = (clientData) => {
    const client = createRecord('clients', 'cli', { ...clientData, createdAt: todayLocal() });
    if (!client) return;
    pushToShopify('customer', 'create', {
      firstName: client.name.split(' ')[0],
      lastName: client.name.split(' ').slice(1).join(' '),
      email: client.email || '',
      phone: client.phones?.[0]?.phone || ''
    });
    return client;
  };

  const addPet = (petData) => createRecord('pets', 'pet', { ...petData, createdAt: todayLocal() });

  const addVisit = (visitData) => createRecord('visits', 'vis', visitData);

  const updateVisit = (id, changes) => updateRecord('visits', id, changes);

  // --- Products & stock ---
  const addProduct = (prodData) => {
    const product = createRecord('products', 'prod', {
      ...prodData,
      revenuePerUnit: (Number(prodData.pricePerUnit) || 0) - (Number(prodData.costPerUnit) || 0)
    });
    if (!product) return;
    logStock(product.name, `+${prodData.quantity || 1} units (Created)`);
    pushToShopify('product', 'create', { title: product.name, description: product.notes || '' });
  };

  const updateProduct = (id, updatedData) => {
    const existing = products.find(p => p.id === id) || {};
    const merged = { ...existing, ...updatedData };
    updateRecord('products', id, {
      ...updatedData,
      revenuePerUnit: (Number(merged.pricePerUnit) || 0) - (Number(merged.costPerUnit) || 0)
    });
    logStock(merged.name || 'Product', `Updated (${updatedData.quantity !== undefined ? updatedData.quantity : 'stock'})`);
  };

  const deleteProduct = (id) => removeRecord('products', id);

  // --- Billing & expenses ---
  const addInvoice = (invData) => createRecord('invoices', 'inv', { ...invData, createdAt: todayLocal() });

  const addExpense = (expData) => createRecord('expenses', 'exp', { ...expData, date: expData.date || todayLocal() });

  const deleteExpense = (id) => removeRecord('expenses', id);

  // --- Medical records ---
  const addVaccine = (vacData) => createRecord('vaccines', 'vac', vacData);

  const deleteVaccine = (id) => removeRecord('vaccines', id);

  const saveSOAPNote = (soapData) => {
    const { id, ...fields } = soapData;
    const existing = soapNotes.find(s => (id && s.id === id) || (fields.visitId && s.visitId === fields.visitId));
    if (existing) {
      updateRecord('soapNotes', existing.id, fields);
    } else {
      createRecord('soapNotes', 'soap', fields);
    }
  };

  // --- Reminders ---
  const addReminder = (remData) => createRecord('reminders', 'rem', { ...remData, status: 'pending', createdAt: todayLocal() });

  const updateReminderStatus = (id, status) => updateRecord('reminders', id, { status });

  // --- Team ---
  const inviteMember = (inviteData) => {
    const role = inviteData.role || 'Vet';
    createRecord('invitations', 'invite', {
      name: inviteData.name,
      email: inviteData.email,
      role,
      sentAt: todayLocal(),
      status: 'Pending'
    });
    createRecord('team', 'usr', { name: inviteData.name, email: inviteData.email, role, status: 'invited' });
  };

  const updateMemberRole = (memberId, role) => updateRecord('team', memberId, { role });

  const removeMember = (memberId) => removeRecord('team', memberId);

  const cancelInvitation = (invId) => removeRecord('invitations', invId);

  // --- Notifications ---
  const markAllNotificationsRead = () => {
    saveMany('notifications', notifications.filter(n => !n.read).map(n => ({ ...n, read: true })));
  };

  // --- Imports & backups ---
  const importRows = (name, rows, format, label) => {
    if (!Array.isArray(rows) || rows.length === 0) {
      alert(`No valid ${label} data found in file.`);
      return 0;
    }
    const now = Date.now();
    const records = rows.map((row, idx) => format(row, now - idx));
    saveMany(name, records);
    alert(`Successfully imported ${records.length} ${label}!`);
    return records.length;
  };

  const importClientsData = (rows) => importRows('clients', rows, formatImportedClient, 'clients');
  const importPetsData = (rows) => importRows('pets', rows, formatImportedPet, 'pets');
  const importProductsData = (rows) => importRows('products', rows, formatImportedProduct, 'products/services');

  // Merges a backup into the clinic: records with the same ID are overwritten,
  // everything else already saved is kept.
  const importFullBackup = (backupData) => {
    if (!backupData || typeof backupData !== 'object' || Array.isArray(backupData)) {
      alert('Invalid backup file format.');
      return 0;
    }
    let total = 0;
    COLLECTIONS.filter(name => name !== 'settings').forEach(name => {
      const list = backupData[name];
      if (!Array.isArray(list) || list.length === 0) return;
      const records = list
        .filter(item => item && typeof item === 'object')
        .map(item => ({ ...item, id: safeId(item.id, name) }));
      saveMany(name, records);
      total += records.length;
    });
    if (backupData.settings && typeof backupData.settings === 'object') {
      const { id, activeWorkspaceId: ignored, ...restoredSettings } = backupData.settings;
      updateSettings(restoredSettings);
    }
    alert(total > 0
      ? `Backup restored: ${total} records merged into your clinic.`
      : 'The backup file did not contain any records.');
    return total;
  };

  // Uploads records an older version left in this browser, then removes them locally.
  const importLegacyLocalData = async () => {
    if (!store) return false;
    try {
      for (const [name, records] of Object.entries(legacyData.collections)) {
        await store.setMany(name, records.map(item => ({ ...item, id: safeId(item.id, name) })));
      }
      clearLegacyLocalData();
      setLegacyData({ collections: {}, count: 0 });
      return true;
    } catch (err) {
      console.error('[Data] Legacy upload failed:', err);
      setSyncError(describeSaveError(err));
      return false;
    }
  };

  const discardLegacyLocalData = () => {
    clearLegacyLocalData();
    setLegacyData({ collections: {}, count: 0 });
  };

  // --- Authentication ---
  const loginWithEmail = async (email, password) => {
    applyFirebaseUser(await signInWithEmail(email, password));
  };

  const loginWithGoogle = async () => {
    applyFirebaseUser(await signInWithGoogle());
  };

  const signup = async (name, email, password, clinicName) => {
    pendingSignupRef.current = { name, clinicName };
    try {
      applyFirebaseUser(await signUpWithEmail(email, password, name));
    } catch (err) {
      pendingSignupRef.current = null;
      throw err;
    }
  };

  const resetPassword = (email) => sendPasswordReset(email);

  // Sample clinic that lives only in this browser. No account, no cloud writes.
  const startDemo = async () => {
    demoActiveRef.current = true;
    writeFlag(DEMO_SESSION_KEY, true);
    if (auth?.currentUser) await signOutUser();
    openDemo();
  };

  const logout = async () => {
    resetUi();
    setSyncError(null);
    if (demoActiveRef.current) {
      demoActiveRef.current = false;
      writeFlag(DEMO_SESSION_KEY, false);
      clearDemoData();
      storeOwnerRef.current = null;
      setUser(null);
      setStore(null);
      return;
    }
    await signOutUser();
    applyFirebaseUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        // Session
        authStatus,
        dataStatus,
        dataError,
        isFirebaseConfigured,
        isDemo,
        user,
        loginWithEmail,
        loginWithGoogle,
        signup,
        resetPassword,
        startDemo,
        logout,
        syncError,
        dismissSyncError: () => setSyncError(null),

        // Workspaces & settings
        workspaces,
        activeWorkspaceId,
        registerClinic,
        switchWorkspace,
        deleteWorkspace,
        settings,
        setSettings: updateSettings,

        // Records
        clients,
        addClient,
        importClientsData,
        pets,
        addPet,
        importPetsData,
        visits,
        addVisit,
        updateVisit,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        importProductsData,
        stockLogs,
        invoices,
        addInvoice,
        importFullBackup,
        expenses,
        addExpense,
        deleteExpense,
        vaccines,
        addVaccine,
        deleteVaccine,
        reminders,
        addReminder,
        updateReminderStatus,
        soapNotes,
        saveSOAPNote,
        team,
        doctorNames,
        invitations,
        inviteMember,
        updateMemberRole,
        removeMember,
        cancelInvitation,
        notifications,
        markAllNotificationsRead,
        legacyData,
        importLegacyLocalData,
        discardLegacyLocalData,

        // UI
        activeTab,
        setActiveTab,
        activeDrawer,
        setActiveDrawer,
        activeModalItem,
        setActiveModalItem,
        showWorkspaceMenu,
        setShowWorkspaceMenu,
        showNotifications,
        setShowNotifications,
        isEmbedded
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
