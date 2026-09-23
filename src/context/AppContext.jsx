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
  signOutUser,
  resendVerificationEmail,
  refreshSignedInUser
} from '../services/firebaseAuth';
import { createCloudStore } from '../services/firestoreDb';
import {
  watchMemberships,
  watchClinic,
  watchInvitesFor,
  createClinic,
  updateClinicProfile,
  acceptInvite,
  declineInvite,
  leaveClinic,
  deleteClinic,
  readLegacyAccountData,
  copyLegacyDataToClinic,
  markLegacyMigrated
} from '../services/clinicDirectory';
import { createDemoStore, clearDemoData } from '../services/demoStore';
import { readLegacyLocalData, clearLegacyLocalData, pruneLegacyLocalData } from '../services/legacyLocalData';
import { syncToShopify } from '../services/shopifySync';
import { COLLECTIONS, DEFAULT_SETTINGS, emptyCollections, sortCollection } from '../data/collections';
import { ROLES, can as roleCan } from '../data/permissions';
import { DEMO_USER } from '../data/demoSeed';
import { newId, todayLocal } from '../utils/ids';
import { normalizePhone } from '../utils/phone';
import { calculateInvoice, stockUsage, newInvoiceNumber } from '../utils/invoice';

const AppContext = createContext();

const DEMO_SESSION_KEY = 'petution_demo_session';

// Which clinic a user last worked in, per user (not sensitive: just an ID).
const activeClinicKey = (uid) => `petution_active_clinic:${uid}`;

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

const readActiveClinic = (uid) => {
  try {
    return localStorage.getItem(activeClinicKey(uid));
  } catch {
    return null;
  }
};

const writeActiveClinic = (uid, clinicId) => {
  try {
    localStorage.setItem(activeClinicKey(uid), clinicId);
  } catch {
    // Storage blocked: the choice only lasts for this page load.
  }
};

const describeSaveError = (err) =>
  err?.code === 'permission-denied'
    ? 'The server refused to save a change (permission denied). Sign out, sign in again, and retry.'
    : `A change could not be saved: ${err?.message || err}`;

// People join a clinic only by accepting an invitation, so backups never restore these.
const NOT_RESTORED = ['settings', 'team', 'invitations', 'workspaces'];

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
    phones: parseJsonList(c.phones, [{ phone, label: 'Primary', isPrimary: true }])
      .map(p => ({ ...p, phone: normalizePhone(p.phone) })),
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

export const AppProvider = ({ children }) => {
  // --- Session ---
  const [authStatus, setAuthStatus] = useState('loading'); // loading | ready
  const [authUser, setAuthUser] = useState(null); // signed-in person, without a clinic role
  const [isDemo, setIsDemo] = useState(false);
  const [demoRole, setDemoRole] = useState('Owner');

  // --- Clinics this user belongs to (accounts only) ---
  const [memberships, setMemberships] = useState([]);
  const [membershipStatus, setMembershipStatus] = useState('idle'); // idle | loading | ready | error
  const [clinicDocs, setClinicDocs] = useState({});
  const [myInvites, setMyInvites] = useState([]);
  const [invitesStatus, setInvitesStatus] = useState('idle'); // idle | loading | ready
  const [activeClinicId, setActiveClinicId] = useState(null);
  const [setupStatus, setSetupStatus] = useState('idle'); // idle | working | error
  const [setupError, setSetupError] = useState(null);
  // The uid whose first-clinic decision was made (auto-create, or leave it to the person).
  const [setupDecidedFor, setSetupDecidedFor] = useState(null);
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

  const demoActiveRef = useRef(false);
  const pendingSignupRef = useRef(null);
  const pendingClinicRef = useRef(null); // clinic to open as soon as its membership arrives
  const authUserRef = useRef(null);

  useEffect(() => {
    authUserRef.current = authUser;
  }, [authUser]);

  const resetUi = useCallback(() => {
    setActiveDrawer(null);
    setActiveModalItem(null);
    setShowWorkspaceMenu(false);
    setShowNotifications(false);
  }, []);

  const resetAccount = useCallback(() => {
    setMemberships([]);
    setMembershipStatus('idle');
    setClinicDocs({});
    setMyInvites([]);
    setInvitesStatus('idle');
    setActiveClinicId(null);
    setSetupStatus('idle');
    setSetupError(null);
    setSetupDecidedFor(null);
    setStore(null);
    pendingClinicRef.current = null;
  }, []);

  const openDemo = useCallback(() => {
    demoActiveRef.current = true;
    setIsDemo(true);
    setDemoRole('Owner');
    setAuthUser(DEMO_USER);
    setStore(createDemoStore());
  }, []);

  const applyFirebaseUser = useCallback((firebaseUser) => {
    if (demoActiveRef.current) return;
    if (!firebaseUser) {
      setAuthUser(null);
      resetAccount();
      resetUi();
      return;
    }
    setAuthUser(toAppUser(firebaseUser));
  }, [resetAccount, resetUi]);

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

  const uid = !isDemo ? authUser?.id : null;
  const email = !isDemo ? authUser?.email : null;

  // The clinics this person belongs to, and invitations waiting for them.
  useEffect(() => {
    if (!uid) return undefined;
    setMembershipStatus('loading');
    const stopMemberships = watchMemberships(
      uid,
      (list, meta) => {
        setMemberships([...list].sort((a, b) => (a.joinedTs || 0) - (b.joinedTs || 0)));
        // An empty list straight from the cache may just mean "offline"; wait for the server.
        if (list.length || !meta.fromCache) setMembershipStatus('ready');
      },
      err => {
        console.error('[Clinics] Could not load memberships:', err);
        setDataError(err);
        setMembershipStatus('error');
      }
    );
    return stopMemberships;
  }, [uid]);

  useEffect(() => {
    if (!uid) return undefined;
    if (!email) {
      setInvitesStatus('ready');
      return undefined;
    }
    setInvitesStatus('loading');
    return watchInvitesFor(
      email,
      (invites, meta) => {
        setMyInvites(invites);
        // An empty list from the cache isn't an answer yet; wait for the server.
        if (invites.length || !meta.fromCache) setInvitesStatus('ready');
      },
      err => {
        console.error('[Clinics] Could not load invitations:', err);
        setMyInvites([]);
        setInvitesStatus('ready');
      }
    );
  }, [uid, email]);

  const clinicIdsKey = memberships.map(m => m.clinicId).join('|');
  useEffect(() => {
    if (!clinicIdsKey) return undefined;
    const unsubscribers = clinicIdsKey.split('|').map(clinicId => watchClinic(
      clinicId,
      clinic => setClinicDocs(prev => ({ ...prev, [clinicId]: clinic })),
      () => {}
    ));
    return () => unsubscribers.forEach(unsubscribe => unsubscribe());
  }, [clinicIdsKey]);

  const openClinic = useCallback((clinicId) => {
    setActiveClinicId(clinicId);
    if (authUserRef.current) writeActiveClinic(authUserRef.current.id, clinicId);
  }, []);

  // Keep a valid clinic open: the one just created/joined, the last one used, or the first.
  useEffect(() => {
    if (!uid || membershipStatus !== 'ready') return;
    const ids = memberships.map(m => m.clinicId);
    if (pendingClinicRef.current && ids.includes(pendingClinicRef.current)) {
      openClinic(pendingClinicRef.current);
      pendingClinicRef.current = null;
      setSetupStatus(status => (status === 'working' ? 'idle' : status));
      return;
    }
    if (activeClinicId && ids.includes(activeClinicId)) return;
    const saved = readActiveClinic(uid);
    setActiveClinicId(ids.includes(saved) ? saved : ids[0] || null);
  }, [uid, membershipStatus, memberships, activeClinicId, openClinic]);

  // First clinic for a new account. Records the previous version saved under users/{uid}/
  // are copied into it. Not started while invitations are waiting: the person may be joining one.
  const setUpOwnClinic = useCallback(async (clinicName) => {
    const person = authUserRef.current;
    if (!person) return;
    setSetupStatus('working');
    setSetupError(null);
    try {
      const pendingSignup = pendingSignupRef.current;
      pendingSignupRef.current = null;
      const owner = { ...person, name: pendingSignup?.name || person.name };
      const legacy = await readLegacyAccountData(owner.id);
      const hasLegacy = !legacy.migratedToClinicId && (legacy.count > 0 || Boolean(legacy.settings?.orgName));
      const name = clinicName || (hasLegacy && legacy.settings?.orgName) || pendingSignup?.clinicName || DEFAULT_SETTINGS.orgName;
      const clinicId = await createClinic({ user: owner, name });
      if (hasLegacy) {
        await copyLegacyDataToClinic(legacy, clinicId, name, owner);
        await markLegacyMigrated(owner.id, clinicId);
      }
      // Stays "working" until the new membership arrives and the clinic opens.
      pendingClinicRef.current = clinicId;
    } catch (err) {
      console.error('[Clinics] Setup failed:', err);
      setSetupError(err);
      setSetupStatus('error');
    }
  }, []);

  // Decided once per sign-in. With invitations waiting, the person chooses (join or create);
  // later changes, like an accepted invitation leaving the pending list, never trigger it.
  useEffect(() => {
    if (!uid || membershipStatus !== 'ready' || invitesStatus !== 'ready' || setupDecidedFor === uid) return;
    setSetupDecidedFor(uid);
    if (!memberships.length && !myInvites.length) setUpOwnClinic();
  }, [uid, membershipStatus, invitesStatus, setupDecidedFor, memberships.length, myInvites.length, setUpOwnClinic]);

  const activeMembership = memberships.find(m => m.clinicId === activeClinicId) || null;
  const membershipRole = activeMembership?.role || null;
  const role = isDemo ? demoRole : membershipRole;

  // One store per open clinic and role (the role decides which collections can be read).
  useEffect(() => {
    // The ref, not isDemo: on a reload the demo opens in this same effect pass.
    if (demoActiveRef.current) return;
    setStore(uid && activeClinicId && membershipRole ? createCloudStore({ clinicId: activeClinicId, role: membershipRole }) : null);
  }, [isDemo, uid, activeClinicId, membershipRole]);

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
    const loaded = new Set();

    return store.subscribe(
      (name, docs) => {
        setData(prev => ({ ...prev, [name]: sortCollection(name, docs) }));
        loaded.add(name);
        if (loaded.size === COLLECTIONS.length) {
          setDataStatus(status => (status === 'error' ? status : 'ready'));
        }
      },
      (name, err) => {
        console.error(`[Data] Could not load ${name}:`, err);
        setDataError(err);
        setDataStatus('error');
      }
    );
  }, [store]);

  // Where the signed-in person is: loading | settingUp | needsClinic | ready
  let accountStatus = 'ready';
  if (uid) {
    if (membershipStatus === 'error') accountStatus = 'error';
    else if (membershipStatus !== 'ready' || invitesStatus !== 'ready') accountStatus = 'loading';
    else if (!memberships.length) {
      if (setupStatus === 'working') accountStatus = 'settingUp';
      else if (myInvites.length || setupStatus === 'error' || setupDecidedFor === uid) accountStatus = 'needsClinic';
      else accountStatus = 'settingUp';
    }
  }

  const user = authUser ? { ...authUser, role: role || authUser.role } : null;
  const can = (permission) => roleCan(role, permission);

  // --- Derived values ---
  const {
    clients, pets, visits, products, invoices, expenses, vaccines, soapNotes,
    reminders, team, invitations, stockLogs, notifications
  } = data;

  const settings = useMemo(() => {
    const { id, ...saved } = data.settings.find(s => s.id === 'global') || {};
    return { ...DEFAULT_SETTINGS, ...saved };
  }, [data.settings]);

  // Accounts: the clinics this person belongs to. Demo: the sample clinic.
  const workspaces = isDemo
    ? data.workspaces.map(ws => ({ ...ws, role: demoRole, isFounder: true }))
    : memberships.map(m => ({
      id: m.clinicId,
      name: clinicDocs[m.clinicId]?.name || (m.clinicId === activeClinicId ? settings.orgName : 'Clinic'),
      plan: clinicDocs[m.clinicId]?.plan || '',
      role: m.role,
      isFounder: clinicDocs[m.clinicId]?.ownerUid === uid
    }));
  const activeWorkspaceId = isDemo ? (settings.activeWorkspaceId || workspaces[0]?.id || null) : activeClinicId;

  // Vets who can be assigned to visits and sign prescriptions.
  const userName = user?.name;
  const doctorNames = useMemo(() => {
    const names = team
      .filter(member => DOCTOR_ROLES.includes(String(member.role || '').toLowerCase()))
      .map(member => member.name)
      .filter(Boolean);
    if (userName) names.unshift(userName);
    return [...new Set(names)];
  }, [team, userName]);

  // Checks a permission and explains a refusal (firestore.rules refuses it anyway).
  const allowed = (permission, action) => {
    if (can(permission)) return true;
    alert(`Your role in this clinic (${role || 'none'}) can't ${action}.`);
    return false;
  };

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

  // delta < 0 takes items out of stock, delta > 0 puts them back.
  const adjustStock = (productId, delta, reason) => {
    const product = products.find(p => p.id === productId);
    if (!store || !product || !delta) return;
    persist(() => store.increment('products', productId, 'quantity', delta));
    logStock(product.name, `${delta > 0 ? '+' : ''}${delta} units (${reason})`);
  };

  // --- Clinics & settings ---
  const updateSettings = (newSettings) => {
    if (!allowed('manageClinic', 'change clinic settings')) return;
    const { id, ...fields } = newSettings;
    updateRecord('settings', 'global', fields);
    if (!activeWorkspaceId || (fields.orgName === undefined && fields.slug === undefined)) return;
    const profile = { name: fields.orgName ?? settings.orgName, slug: fields.slug ?? settings.slug };
    if (isDemo) updateRecord('workspaces', activeWorkspaceId, profile);
    else persist(() => updateClinicProfile(activeWorkspaceId, profile));
  };

  // Creates a separate clinic (its own records and team) and opens it.
  const registerClinic = async (clinicData) => {
    if (isDemo) {
      alert('The demo has one sample clinic. Sign in with an account to create your own clinics.');
      return false;
    }
    try {
      const clinicId = await createClinic({
        user,
        name: clinicData.clinicName,
        plan: clinicData.plan || 'Trial Plan',
        settings: {
          phone: clinicData.phone || '',
          address: [clinicData.district, clinicData.governorate].filter(Boolean).join(', ')
        }
      });
      pendingClinicRef.current = clinicId;
      resetUi();
      return true;
    } catch (err) {
      reportSaveError(err);
      return false;
    }
  };

  const switchWorkspace = (clinicId) => {
    if (isDemo || clinicId === activeClinicId) return;
    resetUi();
    openClinic(clinicId);
  };

  // Founding owner only: deletes the clinic and everything in it.
  const deleteWorkspace = async (clinicId) => {
    const workspace = workspaces.find(w => w.id === clinicId);
    if (!workspace) return;
    if (workspaces.length <= 1) {
      alert('Cannot delete the only remaining workspace. You must have at least one active clinic.');
      return;
    }
    if (isDemo) return;
    if (!workspace.isFounder) {
      alert('Only the person who created this clinic can delete it. You can leave it instead.');
      return;
    }
    try {
      if (clinicId === activeClinicId) openClinic(workspaces.find(w => w.id !== clinicId).id);
      await deleteClinic(clinicId, uid);
      alert(`Clinic workspace "${workspace.name}" has been deleted.`);
    } catch (err) {
      reportSaveError(err);
    }
  };

  const leaveWorkspace = async (clinicId) => {
    const workspace = workspaces.find(w => w.id === clinicId);
    if (!workspace || isDemo) return;
    if (workspace.isFounder) {
      alert('You created this clinic, so you can delete it but not leave it.');
      return;
    }
    try {
      if (clinicId === activeClinicId) {
        const next = workspaces.find(w => w.id !== clinicId);
        if (next) openClinic(next.id);
      }
      await leaveClinic(clinicId, uid);
    } catch (err) {
      reportSaveError(err);
    }
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
    if (!allowed('manageInventory', 'add products or services')) return;
    const product = createRecord('products', 'prod', {
      ...prodData,
      revenuePerUnit: (Number(prodData.pricePerUnit) || 0) - (Number(prodData.costPerUnit) || 0)
    });
    if (!product) return;
    logStock(product.name, `+${prodData.quantity || 1} units (Created)`);
    pushToShopify('product', 'create', { title: product.name, description: product.notes || '' });
  };

  const updateProduct = (id, updatedData) => {
    if (!allowed('manageInventory', 'edit products or services')) return;
    const existing = products.find(p => p.id === id) || {};
    const merged = { ...existing, ...updatedData };
    updateRecord('products', id, {
      ...updatedData,
      revenuePerUnit: (Number(merged.pricePerUnit) || 0) - (Number(merged.costPerUnit) || 0)
    });
    logStock(merged.name || 'Product', `Updated (${updatedData.quantity !== undefined ? updatedData.quantity : 'stock'})`);
  };

  const deleteProduct = (id) => {
    if (allowed('manageInventory', 'delete products or services')) removeRecord('products', id);
  };

  // --- Billing & expenses ---
  // items: [{ productId, name, type, quantity, unitPrice }]. Products leave stock when the
  // invoice is created (unless it starts cancelled) and return if it is cancelled later.
  const addInvoice = (invData) => {
    const items = (invData.items || []).map(item => ({
      productId: item.productId,
      name: item.name,
      type: item.type || 'product',
      quantity: Number(item.quantity) || 0,
      unitPrice: Number(item.unitPrice) || 0
    }));
    const totals = calculateInvoice(items, invData.discountType, invData.discountValue, invData.taxPercentage);
    const pet = pets.find(p => p.id === invData.petId);
    const status = invData.status || 'pending';
    const takesStock = status !== 'cancelled';
    const today = todayLocal();

    const invoice = createRecord('invoices', 'inv', {
      number: newInvoiceNumber(),
      petId: invData.petId || '',
      clientId: invData.clientId || pet?.owners?.[0] || '',
      visitId: invData.visitId || '',
      items,
      status,
      discountType: invData.discountType || 'none',
      discountValue: Number(invData.discountValue) || 0,
      taxPercentage: Number(invData.taxPercentage) || 0,
      ...totals,
      stockDeducted: takesStock,
      paidAt: status === 'paid' ? today : null,
      createdAt: today
    });
    if (!invoice || !takesStock) return invoice;

    const label = `Invoice ${invoice.number}`;
    stockUsage(items).forEach(({ productId, quantity }) => adjustStock(productId, -quantity, label));

    // Refill / booster reminders for items that have a reminder interval.
    items.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (!product?.reminderDays) return;
      const due = new Date();
      due.setDate(due.getDate() + Number(product.reminderDays));
      addReminder({
        clientId: invoice.clientId,
        petId: invoice.petId,
        productId: product.id,
        productName: product.name,
        invoiceId: invoice.id,
        dueDate: todayLocal(due)
      });
    });
    return invoice;
  };

  const setInvoiceStatus = (id, status) => {
    const invoice = invoices.find(inv => inv.id === id);
    if (!invoice || invoice.status === status || invoice.status === 'cancelled') return;
    const changes = { status };
    if (status === 'paid') changes.paidAt = todayLocal();
    if (status === 'cancelled' && invoice.stockDeducted) {
      stockUsage(invoice.items).forEach(({ productId, quantity }) =>
        adjustStock(productId, quantity, `Invoice ${invoice.number || invoice.id} cancelled`));
      changes.stockDeducted = false;
    }
    updateRecord('invoices', id, changes);
  };

  const addExpense = (expData) => {
    if (!allowed('viewFinances', 'record expenses')) return null;
    return createRecord('expenses', 'exp', { ...expData, date: expData.date || todayLocal() });
  };

  const deleteExpense = (id) => {
    if (allowed('viewFinances', 'delete expenses')) removeRecord('expenses', id);
  };

  // --- Medical records ---
  const addVaccine = (vacData) => {
    if (!allowed('writeMedical', 'record vaccines')) return null;
    return createRecord('vaccines', 'vac', vacData);
  };

  const deleteVaccine = (id) => {
    if (allowed('writeMedical', 'delete vaccine records')) removeRecord('vaccines', id);
  };

  const saveSOAPNote = (soapData) => {
    if (!allowed('writeMedical', 'edit clinical notes')) return;
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
  const founderUid = isDemo ? DEMO_USER.id : clinicDocs[activeClinicId]?.ownerUid;

  // Creates an invitation. The invitee joins by signing in with this email (verified).
  const inviteMember = (inviteData) => {
    if (!allowed('manageTeam', 'invite team members')) return null;
    const inviteEmail = String(inviteData.email || '').trim().toLowerCase();
    if (team.some(member => String(member.email || '').toLowerCase() === inviteEmail)) {
      alert(`${inviteEmail} is already a member of this clinic.`);
      return null;
    }
    if (invitations.some(inv => inv.email === inviteEmail)) {
      alert(`${inviteEmail} already has a pending invitation.`);
      return null;
    }
    return createRecord('invitations', 'invite', {
      name: inviteData.name,
      email: inviteEmail,
      role: ROLES.includes(inviteData.role) ? inviteData.role : 'Vet',
      clinicName: settings.orgName,
      invitedByUid: user?.id || '',
      invitedByName: user?.name || '',
      sentAt: todayLocal(),
      status: 'pending'
    });
  };

  const canChangeMember = (memberId, action) => {
    if (!allowed('manageTeam', action)) return false;
    if (memberId === user?.id) {
      alert('You can\'t change your own role or remove yourself here.');
      return false;
    }
    if (memberId === founderUid) {
      alert('The person who created the clinic can\'t be changed or removed.');
      return false;
    }
    return true;
  };

  const updateMemberRole = (memberId, newRole) => {
    if (!ROLES.includes(newRole) || !canChangeMember(memberId, 'change roles')) return;
    updateRecord('team', memberId, { role: newRole });
  };

  const removeMember = (memberId) => {
    if (canChangeMember(memberId, 'remove team members')) removeRecord('team', memberId);
  };

  const cancelInvitation = (invId) => {
    if (allowed('manageTeam', 'cancel invitations')) removeRecord('invitations', invId);
  };

  // Invitations addressed to the signed-in person. Joining needs a verified email.
  const acceptInvitation = async (invite) => {
    if (!user?.emailVerified) {
      const refreshed = await refreshSignedInUser();
      if (!refreshed.emailVerified) {
        const err = new Error('Verify your email address before joining a clinic.');
        err.code = 'needs-verification';
        throw err;
      }
      setAuthUser(toAppUser(refreshed));
    }
    // "working" until the membership arrives and the clinic opens (see the selection effect).
    setSetupStatus('working');
    try {
      await acceptInvite(invite, user);
    } catch (err) {
      setSetupStatus('idle');
      throw err;
    }
    pendingClinicRef.current = invite.clinicId;
    resetUi();
  };

  const declineInvitation = (invite) => declineInvite(invite.id);

  const checkEmailVerified = async () => {
    const refreshed = await refreshSignedInUser();
    setAuthUser(toAppUser(refreshed));
    return refreshed.emailVerified;
  };

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
  const importProductsData = (rows) =>
    (allowed('manageInventory', 'import products') ? importRows('products', rows, formatImportedProduct, 'products/services') : 0);

  // Merges a backup into the clinic: records with the same ID are overwritten,
  // everything else already saved is kept.
  const importFullBackup = (backupData) => {
    if (!allowed('manageClinic', 'restore backups')) return 0;
    if (!backupData || typeof backupData !== 'object' || Array.isArray(backupData)) {
      alert('Invalid backup file format.');
      return 0;
    }
    let total = 0;
    COLLECTIONS.filter(name => !NOT_RESTORED.includes(name)).forEach(name => {
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
      ? `Backup restored: ${total} records merged into your clinic. Team members are not restored; invite them from the Team page.`
      : 'The backup file did not contain any records.');
    return total;
  };

  // Uploads records an older version left in this browser, then removes them locally.
  const importLegacyLocalData = async () => {
    if (!store || !allowed('manageClinic', 'upload records into this clinic')) return false;
    try {
      for (const [name, records] of Object.entries(legacyData.collections)) {
        if (NOT_RESTORED.includes(name)) continue;
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
      setIsDemo(false);
      setDemoRole('Owner');
      setAuthUser(null);
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
        accountStatus,
        dataStatus,
        dataError,
        isFirebaseConfigured,
        isDemo,
        user,
        role,
        can,
        // Demo only: see the app as another role.
        previewRole: isDemo ? setDemoRole : undefined,
        loginWithEmail,
        loginWithGoogle,
        signup,
        resetPassword,
        startDemo,
        logout,
        syncError,
        dismissSyncError: () => setSyncError(null),

        // Clinics & settings
        workspaces,
        activeWorkspaceId,
        registerClinic,
        switchWorkspace,
        deleteWorkspace,
        leaveWorkspace,
        setupStatus,
        setupError,
        createOwnClinic: setUpOwnClinic,
        myInvites,
        acceptInvitation,
        declineInvitation,
        checkEmailVerified,
        resendVerificationEmail,
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
        setInvoiceStatus,
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
        founderUid,
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
