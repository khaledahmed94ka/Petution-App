// Earlier versions kept all clinic records in this browser's localStorage under
// petution_* keys. This module finds real records left there so the owner can
// upload them to their account, and removes the keys afterwards.

const LEGACY_KEYS = {
  clients: 'petution_clients',
  pets: 'petution_pets',
  visits: 'petution_visits',
  products: 'petution_products',
  invoices: 'petution_invoices',
  expenses: 'petution_expenses',
  vaccines: 'petution_vaccines',
  soapNotes: 'petution_soap_notes',
  reminders: 'petution_reminders',
  team: 'petution_team',
  invitations: 'petution_invitations',
  stockLogs: 'petution_stocklogs'
};

const OTHER_LEGACY_KEYS = [
  'petution_settings',
  'petution_notifications',
  'petution_workspaces',
  'petution_active_ws'
];

// Stale sign-in flags from the old localStorage-based login. Never trusted again.
const LEGACY_AUTH_KEYS = ['petution_user', 'petution_jwt_token'];

// The sample records every old install started with. They are not worth uploading.
const OLD_SAMPLE_IDS = {
  clients: ['cli-1', 'cli-2'],
  pets: ['pet-1', 'pet-2'],
  visits: ['vis-1'],
  products: ['prod-1', 'serv-1'],
  invoices: ['inv-1'],
  expenses: ['exp-1', 'exp-2'],
  vaccines: ['vac-1', 'vac-2', 'vac-3'],
  soapNotes: ['soap-1'],
  reminders: ['rem-1'],
  team: ['usr-1'],
  invitations: ['inv-1'],
  stockLogs: ['log-1']
};

const readList = (storage, key) => {
  try {
    const value = JSON.parse(storage.getItem(key));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

// Returns { collections: { clients: [...], ... }, count } with sample records left out.
export const readLegacyLocalData = (storage = window.localStorage) => {
  const collections = {};
  let count = 0;
  Object.entries(LEGACY_KEYS).forEach(([name, key]) => {
    const sampleIds = OLD_SAMPLE_IDS[name] || [];
    const records = readList(storage, key).filter(item => item && item.id && !sampleIds.includes(item.id));
    if (records.length) {
      collections[name] = records;
      count += records.length;
    }
  });
  return { collections, count };
};

export const clearLegacyLocalData = (storage = window.localStorage) => {
  [...Object.values(LEGACY_KEYS), ...OTHER_LEGACY_KEYS, ...LEGACY_AUTH_KEYS].forEach(key => {
    try {
      storage.removeItem(key);
    } catch {
      // Ignore blocked storage.
    }
  });
};

// Run once at start-up: drop old sign-in flags, and drop the old keys entirely
// when they hold nothing but the sample records.
export const pruneLegacyLocalData = (storage = window.localStorage) => {
  LEGACY_AUTH_KEYS.forEach(key => {
    try {
      storage.removeItem(key);
    } catch {
      // Ignore blocked storage.
    }
  });
  if (readLegacyLocalData(storage).count === 0) {
    clearLegacyLocalData(storage);
  }
};
