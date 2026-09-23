// Clinics a user belongs to, creating clinics, and invitations.
// Firestore layout and permissions are described in firestore.rules.
import {
  collection, collectionGroup, doc, getDocs, onSnapshot, query, where,
  writeBatch, updateDoc, deleteDoc, setDoc, getDoc
} from 'firebase/firestore';
import { db } from './firebaseAuth';
import { CLINIC_RECORD_COLLECTIONS, DEFAULT_SETTINGS } from '../data/collections';
import { newId, todayLocal, slugify } from '../utils/ids';

const BATCH_SIZE = 400;

const commitInBatches = async (operations) => {
  for (let start = 0; start < operations.length; start += BATCH_SIZE) {
    const batch = writeBatch(db);
    operations.slice(start, start + BATCH_SIZE).forEach(apply => apply(batch));
    await batch.commit();
  }
};

// Every clinic membership of this user: [{ clinicId, role, name, email, ... }].
// A membership counts only once the server has it: right after creating or joining a
// clinic the local copy appears first, and the server would still refuse that clinic's data.
// includeMetadataChanges also delivers the server's confirmation of a cached result.
export const watchMemberships = (uid, onChange, onError) =>
  onSnapshot(
    query(collectionGroup(db, 'members'), where('uid', '==', uid)),
    { includeMetadataChanges: true },
    snapshot => onChange(
      snapshot.docs
        .filter(d => !d.metadata.hasPendingWrites)
        .map(d => ({ ...d.data(), clinicId: d.ref.parent.parent.id })),
      { fromCache: snapshot.metadata.fromCache }
    ),
    onError
  );

export const watchClinic = (clinicId, onChange, onError) =>
  onSnapshot(doc(db, 'clinics', clinicId), snapshot => onChange(snapshot.exists() ? { ...snapshot.data(), id: snapshot.id } : null), onError);

// Pending invitations addressed to this email (lowercase, as stored).
// includeMetadataChanges: when the server confirms an unchanged cached result, only the
// metadata changes, and the caller is waiting for exactly that confirmation.
export const watchInvitesFor = (email, onChange, onError) =>
  onSnapshot(
    query(collection(db, 'invites'), where('email', '==', String(email).toLowerCase()), where('status', '==', 'pending')),
    { includeMetadataChanges: true },
    snapshot => onChange(snapshot.docs.map(d => ({ ...d.data(), id: d.id })), { fromCache: snapshot.metadata.fromCache }),
    onError
  );

// Creates the clinic, the owner's membership and the clinic settings in one atomic write.
export const createClinic = async ({ user, name, plan = 'Trial Plan', settings = {} }) => {
  const clinicId = newId('clinic');
  const now = Date.now();
  const slug = slugify(name);
  const batch = writeBatch(db);
  batch.set(doc(db, 'clinics', clinicId), { name, slug, plan, ownerUid: user.id, createdTs: now });
  batch.set(doc(db, 'clinics', clinicId, 'members', user.id), {
    uid: user.id,
    clinicId,
    name: user.name,
    email: String(user.email || '').toLowerCase(),
    role: 'Owner',
    status: 'active',
    joinedTs: now
  });
  batch.set(doc(db, 'clinics', clinicId, 'settings', 'global'), {
    ...DEFAULT_SETTINGS,
    ...settings,
    id: 'global',
    orgName: name,
    slug
  });
  const welcomeId = newId('n');
  batch.set(doc(db, 'clinics', clinicId, 'notifications', welcomeId), {
    id: welcomeId,
    title: `Welcome to ${name}, ${user.name}!`,
    time: todayLocal(),
    read: false,
    createdTs: now
  });
  await batch.commit();
  return clinicId;
};

export const updateClinicProfile = (clinicId, changes) => updateDoc(doc(db, 'clinics', clinicId), changes);

// Joining and marking the invitation accepted must happen together (firestore.rules checks both).
export const acceptInvite = async (invite, user) => {
  const now = Date.now();
  const batch = writeBatch(db);
  batch.set(doc(db, 'clinics', invite.clinicId, 'members', user.id), {
    uid: user.id,
    clinicId: invite.clinicId,
    name: user.name,
    email: String(user.email || '').toLowerCase(),
    role: invite.role,
    status: 'active',
    inviteId: invite.id,
    joinedTs: now
  });
  batch.update(doc(db, 'invites', invite.id), { status: 'accepted', acceptedUid: user.id, respondedTs: now });
  await batch.commit();
};

export const declineInvite = (inviteId) =>
  updateDoc(doc(db, 'invites', inviteId), { status: 'declined', respondedTs: Date.now() });

export const leaveClinic = (clinicId, uid) => deleteDoc(doc(db, 'clinics', clinicId, 'members', uid));

// Owner only. Firestore has no client-side recursive delete, so every record goes one by one:
// records, invitations, other members, the clinic, and finally the owner's own membership.
export const deleteClinic = async (clinicId, uid) => {
  const refs = [];
  for (const name of CLINIC_RECORD_COLLECTIONS) {
    (await getDocs(collection(db, 'clinics', clinicId, name))).docs.forEach(d => refs.push(d.ref));
  }
  (await getDocs(query(collection(db, 'invites'), where('clinicId', '==', clinicId)))).docs.forEach(d => refs.push(d.ref));
  (await getDocs(collection(db, 'clinics', clinicId, 'members'))).docs
    .filter(d => d.id !== uid)
    .forEach(d => refs.push(d.ref));
  await commitInBatches(refs.map(ref => batch => batch.delete(ref)));
  await deleteDoc(doc(db, 'clinics', clinicId));
  await deleteDoc(doc(db, 'clinics', clinicId, 'members', uid));
};

// ---- Data saved under users/{uid}/ by the previous version ----

const LEGACY_COLLECTIONS = [...CLINIC_RECORD_COLLECTIONS.filter(name => name !== 'settings'), 'invitations'];

export const readLegacyAccountData = async (uid) => {
  const settingsSnap = await getDoc(doc(db, 'users', uid, 'settings', 'global'));
  const settings = settingsSnap.exists() ? settingsSnap.data() : null;
  const collections = {};
  let count = 0;
  for (const name of LEGACY_COLLECTIONS) {
    const docs = (await getDocs(collection(db, 'users', uid, name))).docs.map(d => ({ ...d.data(), id: d.id }));
    if (docs.length) {
      collections[name] = docs;
      count += docs.length;
    }
  }
  return { settings, collections, count, migratedToClinicId: settings?.migratedToClinicId || null };
};

// Copies the old per-user records into a clinic. Old invitations become real invitations.
export const copyLegacyDataToClinic = async (legacy, clinicId, clinicName, user) => {
  const operations = [];
  Object.entries(legacy.collections).forEach(([name, records]) => {
    if (name === 'invitations') {
      records.filter(inv => inv.email && inv.status !== 'accepted').forEach(inv => {
        const id = newId('invite');
        operations.push(batch => batch.set(doc(db, 'invites', id), {
          id,
          clinicId,
          clinicName,
          name: inv.name || '',
          email: String(inv.email).trim().toLowerCase(),
          role: ['Owner', 'Admin', 'Vet', 'Receptionist'].includes(inv.role) ? inv.role : 'Vet',
          status: 'pending',
          invitedByUid: user.id,
          invitedByName: user.name,
          sentAt: inv.sentAt || todayLocal(),
          createdTs: Date.now()
        }));
      });
      return;
    }
    records.forEach(record => operations.push(batch => batch.set(doc(db, 'clinics', clinicId, name, record.id), record)));
  });
  if (legacy.settings) {
    const { id, migratedToClinicId, activeWorkspaceId, ...profile } = legacy.settings;
    operations.push(batch => batch.set(doc(db, 'clinics', clinicId, 'settings', 'global'), profile, { merge: true }));
  }
  await commitInBatches(operations);
};

export const markLegacyMigrated = (uid, clinicId) =>
  setDoc(doc(db, 'users', uid, 'settings', 'global'), { migratedToClinicId: clinicId }, { merge: true });
