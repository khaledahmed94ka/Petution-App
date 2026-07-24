import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const initialClients = [
  {
    id: 'cli-1',
    name: 'Ahmed Hassan',
    source: 'Facebook Ad',
    governorate: 'Cairo',
    district: 'Maadi',
    street: 'Road 9, Bldg 14',
    phones: [{ phone: '+201001234567', label: 'Primary', isPrimary: true, hasWhatsapp: true }],
    tags: ['VIP', 'Regular'],
    pets: ['pet-1'],
    createdAt: '2026-07-20'
  },
  {
    id: 'cli-2',
    name: 'Sarah Mahmoud',
    source: 'Recommendation',
    governorate: 'Giza',
    district: 'Zayed',
    street: 'Compound 4',
    phones: [{ phone: '+201119876543', label: 'Primary', isPrimary: true, hasWhatsapp: true }],
    tags: ['New Client'],
    pets: ['pet-2'],
    createdAt: '2026-07-22'
  }
];

const initialPets = [
  {
    id: 'pet-1',
    name: 'Milo',
    ageValue: 2,
    ageUnit: 'years',
    species: 'cat',
    gender: 'male',
    vaccinated: true,
    deworming: true,
    antiflea: true,
    castrated: true,
    breed: 'Persian',
    temperament: 'Calm',
    nutrition: ['Dry food', 'Soft food'],
    owners: ['cli-1'],
    createdAt: '2026-07-20'
  },
  {
    id: 'pet-2',
    name: 'Rocky',
    ageValue: 4,
    ageUnit: 'years',
    species: 'dog',
    gender: 'male',
    vaccinated: true,
    deworming: true,
    antiflea: false,
    castrated: false,
    breed: 'Golden Retriever',
    temperament: 'Playful',
    nutrition: ['Dry food'],
    owners: ['cli-2'],
    createdAt: '2026-07-22'
  }
];

const initialVisits = [
  {
    id: 'vis-1',
    petId: 'pet-1',
    clientId: 'cli-1',
    doctorName: 'Dr. Khaled ElGendy',
    visitType: 'Check-up',
    date: '2026-07-24',
    time: '08:00 PM',
    state: 'scheduled',
    reason: 'Annual Checkup'
  }
];

const initialProducts = [
  {
    id: 'prod-1',
    name: 'Feline Rabies Vaccine',
    type: 'product',
    unitType: 'Piece',
    pricingUnit: 'Piece',
    quantity: 45,
    pricePerUnit: 350,
    costPerUnit: 200,
    revenuePerUnit: 150,
    alertThreshold: 10,
    notes: 'Keep refrigerated'
  },
  {
    id: 'serv-1',
    name: 'General Examination & Consultation',
    type: 'service',
    unitType: 'Session',
    pricingUnit: 'Session',
    quantity: 999,
    pricePerUnit: 500,
    costPerUnit: 100,
    revenuePerUnit: 400,
    alertThreshold: 0,
    notes: 'Standard vet examination'
  }
];

const initialInvoices = [
  {
    id: 'inv-1',
    petId: 'pet-1',
    visitId: 'vis-1',
    status: 'paid',
    discountType: 'none',
    discountValue: 0,
    taxPercentage: 14,
    subtotal: 500,
    totalAmount: 570,
    createdAt: '2026-07-24'
  }
];

const initialTeam = [
  {
    id: 'usr-1',
    name: 'Khaled ElGendy',
    email: 'khaledahmed94.ka@gmail.com',
    role: 'Owner',
    status: 'active'
  }
];

const initialSettings = {
  orgName: 'Petution',
  slug: 'petution',
  phone: '+201114022371',
  address: '12 Main St, Cairo, Egypt',
  website: 'https://app.petution.com'
};

export const AppProvider = ({ children }) => {
  // Workspaces list
  const [workspaces, setWorkspaces] = useState(() => {
    const saved = localStorage.getItem('petution_workspaces');
    return saved ? JSON.parse(saved) : [
      { id: 'ws-1', name: 'Petution', slug: 'petution', plan: 'Second Plan (Trial)' }
    ];
  });

  const [activeWorkspaceId, setActiveWorkspaceId] = useState(() => {
    const saved = localStorage.getItem('petution_active_ws');
    return saved || 'ws-1';
  });

  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('petution_clients');
    return saved ? JSON.parse(saved) : initialClients;
  });

  const [pets, setPets] = useState(() => {
    const saved = localStorage.getItem('petution_pets');
    return saved ? JSON.parse(saved) : initialPets;
  });

  const [visits, setVisits] = useState(() => {
    const saved = localStorage.getItem('petution_visits');
    return saved ? JSON.parse(saved) : initialVisits;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('petution_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('petution_invoices');
    return saved ? JSON.parse(saved) : initialInvoices;
  });

  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem('petution_team');
    return saved ? JSON.parse(saved) : initialTeam;
  });

  const [settings, setSettingsState] = useState(() => {
    const saved = localStorage.getItem('petution_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.orgName === 'Petfast') parsed.orgName = 'Petution';
      return parsed;
    }
    return initialSettings;
  });

  const [notifications, setNotifications] = useState([
    { id: 'n-1', title: 'Welcome to Petution!', time: '10m ago', read: false },
    { id: 'n-2', title: 'System trial period active (14 days left)', time: '1h ago', read: false }
  ]);

  // Modal & View States
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    localStorage.setItem('petution_workspaces', JSON.stringify(workspaces));
  }, [workspaces]);

  useEffect(() => {
    localStorage.setItem('petution_active_ws', activeWorkspaceId);
  }, [activeWorkspaceId]);

  useEffect(() => {
    localStorage.setItem('petution_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('petution_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('petution_pets', JSON.stringify(pets));
  }, [pets]);

  useEffect(() => {
    localStorage.setItem('petution_visits', JSON.stringify(visits));
  }, [visits]);

  useEffect(() => {
    localStorage.setItem('petution_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('petution_invoices', JSON.stringify(invoices));
  }, [invoices]);

  const updateSettings = (newSettings) => {
    setSettingsState(newSettings);
    // Sync with workspace list
    setWorkspaces(prev => prev.map(ws => 
      ws.id === activeWorkspaceId 
        ? { ...ws, name: newSettings.orgName, slug: newSettings.slug }
        : ws
    ));
  };

  const registerClinic = (clinicData) => {
    const newWs = {
      id: `ws-${Date.now()}`,
      name: clinicData.clinicName,
      slug: clinicData.clinicName.toLowerCase().replace(/\s+/g, '-'),
      plan: clinicData.plan || 'Trial Plan'
    };
    setWorkspaces(prev => [...prev, newWs]);
    setActiveWorkspaceId(newWs.id);
    updateSettings({
      ...settings,
      orgName: clinicData.clinicName,
      slug: newWs.slug,
      phone: clinicData.phone || settings.phone,
      address: `${clinicData.district || ''}, ${clinicData.governorate || ''}`
    });

    setNotifications(prev => [
      { id: `n-${Date.now()}`, title: `Registered workspace: ${clinicData.clinicName}`, time: 'Just now', read: false },
      ...prev
    ]);
  };

  const switchWorkspace = (wsId) => {
    const ws = workspaces.find(w => w.id === wsId);
    if (ws) {
      setActiveWorkspaceId(ws.id);
      setSettingsState(prev => ({ ...prev, orgName: ws.name, slug: ws.slug }));
    }
  };


  const addClient = (clientData) => {
    const newClient = {
      ...clientData,
      id: `cli-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setClients(prev => [newClient, ...prev]);
  };

  const addPet = (petData) => {
    const newPet = {
      ...petData,
      id: `pet-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setPets(prev => [newPet, ...prev]);
  };

  const addVisit = (visitData) => {
    const newVisit = {
      ...visitData,
      id: `vis-${Date.now()}`
    };
    setVisits(prev => [newVisit, ...prev]);
  };

  const [stockLogs, setStockLogs] = useState([
    { id: 'log-1', itemName: 'Feline Rabies Vaccine', change: '+45 units', user: 'Khaled ElGendy', date: '2026-07-24' }
  ]);

  const addProduct = (prodData) => {
    const newProd = {
      ...prodData,
      id: `prod-${Date.now()}`,
      revenuePerUnit: (prodData.pricePerUnit || 0) - (prodData.costPerUnit || 0)
    };
    setProducts(prev => [newProd, ...prev]);
    setStockLogs(prev => [
      { id: `log-${Date.now()}`, itemName: prodData.name, change: `+${prodData.quantity || 1} units (Created)`, user: 'Khaled ElGendy', date: new Date().toISOString().split('T')[0] },
      ...prev
    ]);
  };

  const updateProduct = (id, updatedData) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData, revenuePerUnit: (updatedData.pricePerUnit || 0) - (updatedData.costPerUnit || 0) } : p));
    setStockLogs(prev => [
      { id: `log-${Date.now()}`, itemName: updatedData.name, change: `Updated (${updatedData.quantity || 0} stock)`, user: 'Khaled ElGendy', date: new Date().toISOString().split('T')[0] },
      ...prev
    ]);
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addInvoice = (invData) => {
    const newInv = {
      ...invData,
      id: `inv-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setInvoices(prev => [newInv, ...prev]);
  };

  const importFullBackup = (backupData) => {
    if (backupData.clients) setClients(backupData.clients);
    if (backupData.pets) setPets(backupData.pets);
    if (backupData.visits) setVisits(backupData.visits);
    if (backupData.products) setProducts(backupData.products);
    if (backupData.invoices) setInvoices(backupData.invoices);
    if (backupData.settings) updateSettings(backupData.settings);
    alert('System backup restored successfully!');
  };

  const importClientsData = (newClients) => {
    const formatted = newClients.map((c, idx) => ({
      id: c.id || `cli-imp-${Date.now()}-${idx}`,
      name: c.name || c.PetOwnerName || 'Imported Client',
      source: c.source || 'Imported',
      governorate: c.governorate || 'Cairo',
      district: c.district || '',
      street: c.street || '',
      phones: c.phones ? (typeof c.phones === 'string' ? JSON.parse(c.phones) : c.phones) : [{ phone: c.phone || c.PrimaryPhone || '', label: 'Primary', isPrimary: true }],
      tags: c.tags ? (typeof c.tags === 'string' ? JSON.parse(c.tags) : c.tags) : ['Imported'],
      pets: [],
      createdAt: c.createdAt || new Date().toISOString().split('T')[0]
    }));
    setClients(prev => [...formatted, ...prev]);
    alert(`Successfully imported ${formatted.length} clients!`);
  };

  const importPetsData = (newPets) => {
    const formatted = newPets.map((p, idx) => ({
      id: p.id || `pet-imp-${Date.now()}-${idx}`,
      name: p.name || p.PetName || 'Imported Pet',
      ageValue: Number(p.ageValue) || 1,
      ageUnit: p.ageUnit || 'years',
      species: p.species || p.Type || 'cat',
      gender: p.gender || 'male',
      vaccinated: String(p.vaccinated).toLowerCase() === 'true',
      deworming: String(p.deworming).toLowerCase() === 'true',
      antiflea: String(p.antiflea).toLowerCase() === 'true',
      castrated: String(p.castrated).toLowerCase() === 'true',
      breed: p.breed || '',
      temperament: p.temperament || 'Calm',
      nutrition: ['Dry food'],
      owners: [],
      createdAt: p.createdAt || new Date().toISOString().split('T')[0]
    }));
    setPets(prev => [...formatted, ...prev]);
    alert(`Successfully imported ${formatted.length} pets!`);
  };

  const importProductsData = (newProds) => {
    const formatted = newProds.map((p, idx) => ({
      id: p.id || `prod-imp-${Date.now()}-${idx}`,
      name: p.name || p.ItemName || 'Imported Product',
      type: p.type || 'product',
      unitType: p.unitType || 'Piece',
      pricingUnit: p.pricingUnit || 'Piece',
      pricePerUnit: Number(p.pricePerUnit || p.PricePerUnit) || 100,
      costPerUnit: Number(p.costPerUnit || p.CostPerUnit) || 50,
      revenuePerUnit: (Number(p.pricePerUnit || p.PricePerUnit) || 100) - (Number(p.costPerUnit || p.CostPerUnit) || 50),
      quantity: Number(p.quantity || p.Quantity) || 10,
      alertThreshold: Number(p.alertThreshold || p.AlertThreshold) || 5,
      notes: p.notes || ''
    }));
    setProducts(prev => [...formatted, ...prev]);
    alert(`Successfully imported ${formatted.length} products/services!`);
  };

  const [invitations, setInvitations] = useState(() => {
    const saved = localStorage.getItem('petution_invitations');
    return saved ? JSON.parse(saved) : [
      { id: 'inv-1', name: 'Dr. Sarah Mahmoud', email: 'sarah.m@petution.com', role: 'Vet', sentAt: '2026-07-23', status: 'Pending' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('petution_team', JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem('petution_invitations', JSON.stringify(invitations));
  }, [invitations]);

  const inviteMember = (inviteData) => {
    const newInv = {
      id: `inv-${Date.now()}`,
      name: inviteData.name,
      email: inviteData.email,
      role: inviteData.role || 'Vet',
      sentAt: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    setInvitations(prev => [newInv, ...prev]);

    // Also add to active team list if auto-accepted
    const newMember = {
      id: `usr-${Date.now()}`,
      name: inviteData.name,
      email: inviteData.email,
      role: inviteData.role || 'Vet',
      status: 'invited'
    };
    setTeam(prev => [newMember, ...prev]);
  };

  const updateMemberRole = (memberId, newRole) => {
    setTeam(prev => prev.map(m => m.id === memberId ? { ...m, role: newRole } : m));
  };

  const removeMember = (memberId) => {
    setTeam(prev => prev.filter(m => m.id !== memberId));
  };

  const cancelInvitation = (invId) => {
    setInvitations(prev => prev.filter(i => i.id !== invId));
  };

  return (
    <AppContext.Provider
      value={{
        workspaces,
        activeWorkspaceId,
        registerClinic,
        switchWorkspace,
        clients,
        addClient,
        importClientsData,
        pets,
        addPet,
        importPetsData,
        visits,
        setVisits,
        addVisit,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        importProductsData,
        stockLogs,
        invoices,
        addInvoice,
        importFullBackup,
        team,
        setTeam,
        invitations,
        inviteMember,
        updateMemberRole,
        removeMember,
        cancelInvitation,
        settings,
        setSettings: updateSettings,
        notifications,
        setNotifications,
        activeDrawer,
        setActiveDrawer,
        activeModalItem,
        setActiveModalItem,
        showWorkspaceMenu,
        setShowWorkspaceMenu,
        showNotifications,
        setShowNotifications
      }}
    >
      {children}
    </AppContext.Provider>
  );



};


export const useApp = () => useContext(AppContext);
