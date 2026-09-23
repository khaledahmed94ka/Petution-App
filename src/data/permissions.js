// Who may do what in a clinic. firestore.rules enforces the same table on the server;
// the app uses it to hide actions a role can't perform.
export const ROLES = ['Owner', 'Admin', 'Vet', 'Receptionist'];

export const ROLE_LABELS = {
  Owner: 'Owner / Co-Owner',
  Admin: 'Billing Admin',
  Vet: 'Vet / Practitioner',
  Receptionist: 'Receptionist / Staff'
};

export const PERMISSIONS = {
  // Clients, pets, visits, invoices, reminders: the daily front-desk work.
  writeRecords: ['Owner', 'Admin', 'Vet', 'Receptionist'],
  // SOAP notes, prescriptions and vaccine records.
  writeMedical: ['Owner', 'Vet'],
  // Add, edit, price or delete products and services (selling them only adjusts stock).
  manageInventory: ['Owner', 'Admin'],
  // Expenses and analytics.
  viewFinances: ['Owner', 'Admin'],
  // Clinic profile, integrations, backups, deleting the clinic.
  manageClinic: ['Owner'],
  // Invitations, roles, removing members.
  manageTeam: ['Owner']
};

export const can = (role, permission) => Boolean(PERMISSIONS[permission]?.includes(role));

// Collections a role can read (matches firestore.rules). Everything else is readable by all members.
export const canReadCollection = (role, name) => {
  if (name === 'expenses') return can(role, 'viewFinances');
  if (name === 'invitations') return can(role, 'manageTeam');
  return ROLES.includes(role);
};

// Pages hidden from roles that can't use them.
export const PAGE_PERMISSIONS = {
  expenses: 'viewFinances',
  analytics: 'viewFinances',
  settings: 'manageClinic'
};

export const canOpenPage = (role, tab) => !PAGE_PERMISSIONS[tab] || can(role, PAGE_PERMISSIONS[tab]);
