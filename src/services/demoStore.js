import { COLLECTIONS } from '../data/collections';
import { createDemoSeed } from '../data/demoSeed';

const DEMO_DATA_KEY = 'petution_demo_data_v1';

const readSaved = (storage) => {
  try {
    const saved = JSON.parse(storage.getItem(DEMO_DATA_KEY));
    return saved && typeof saved === 'object' ? saved : null;
  } catch {
    return null;
  }
};

const upsert = (list = [], item) => {
  const exists = list.some(existing => existing.id === item.id);
  return exists ? list.map(existing => (existing.id === item.id ? item : existing)) : [item, ...list];
};

// Store for the no-account demo. Same interface as the Firestore store, but
// everything stays in this browser's localStorage and never reaches the cloud.
export const createDemoStore = (storage = window.localStorage) => {
  let data = readSaved(storage) || createDemoSeed();
  const listeners = new Set();

  const persist = () => {
    try {
      storage.setItem(DEMO_DATA_KEY, JSON.stringify(data));
    } catch {
      // Storage full or blocked: the demo keeps working for this session.
    }
  };

  const write = (name, list) => {
    data = { ...data, [name]: list };
    persist();
    listeners.forEach(listener => listener(name, list, { fromCache: false }));
    return Promise.resolve();
  };

  const find = (name, id) => (data[name] || []).find(item => item.id === id);

  persist();

  return {
    kind: 'demo',

    subscribe(onCollection) {
      listeners.add(onCollection);
      COLLECTIONS.forEach(name => onCollection(name, data[name] || [], { fromCache: false }));
      return () => listeners.delete(onCollection);
    },

    set: (name, item) => write(name, upsert(data[name], item)),

    // Matches Firestore's merge: creates the record if it does not exist yet.
    update: (name, id, changes) => write(name, upsert(data[name], { ...find(name, id), ...changes, id })),

    remove: (name, id) => write(name, (data[name] || []).filter(item => item.id !== id)),

    setMany: (name, items) =>
      write(name, items.reduce((list, item) => upsert(list, { ...find(name, item.id), ...item }), data[name] || []))
  };
};

export const clearDemoData = (storage = window.localStorage) => {
  try {
    storage.removeItem(DEMO_DATA_KEY);
  } catch {
    // Nothing to clear.
  }
};
