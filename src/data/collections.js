// Every record type the app stores. For a signed-in account each one is a Firestore
// subcollection under users/{uid}/; for the demo it is a list kept in localStorage.
export const COLLECTIONS = [
  'clients',
  'pets',
  'visits',
  'products',
  'invoices',
  'expenses',
  'vaccines',
  'soapNotes',
  'reminders',
  'team',
  'invitations',
  'stockLogs',
  'notifications',
  'workspaces',
  'settings'
];

export const emptyCollections = () => Object.fromEntries(COLLECTIONS.map(name => [name, []]));

// Collections stored under clinics/{clinicId}/ in Firestore. The rest come from elsewhere:
// team = clinics/{clinicId}/members, invitations = top-level invites, workspaces = the user's memberships.
export const CLINIC_RECORD_COLLECTIONS = COLLECTIONS.filter(name => !['team', 'invitations', 'workspaces'].includes(name));

export const DEFAULT_SETTINGS = {
  orgName: 'My Clinic',
  slug: 'my-clinic',
  phone: '',
  address: '',
  website: '',
  shopifyShop: '',
  shopifySyncEnabled: false
};

// Records created by this version carry createdTs; older ones fall back to their ID.
const newestFirst = (a, b) =>
  (b.createdTs || 0) - (a.createdTs || 0) || String(b.id).localeCompare(String(a.id));

export const sortCollection = (name, docs) => {
  const sorted = [...docs].sort(newestFirst);
  // The workspace switcher lists clinics in the order they were added.
  return name === 'workspaces' ? sorted.reverse() : sorted;
};
