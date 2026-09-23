import {
  collection, doc, onSnapshot, setDoc, updateDoc, deleteDoc, writeBatch, increment, query, where
} from 'firebase/firestore';
import { db } from './firebaseAuth';
import { COLLECTIONS } from '../data/collections';
import { canReadCollection } from '../data/permissions';

// Firestore rejects batches with more than 500 writes.
const BATCH_SIZE = 400;

// Store for one clinic of a signed-in user. Records live under clinics/{clinicId}/;
// firestore.rules decides what each role may read and write there.
//   team        -> clinics/{clinicId}/members (document ID = the member's uid)
//   invitations -> top-level invites/ with clinicId, so the invitee can find them
//   workspaces  -> not stored per clinic (the context lists the user's memberships)
export const createCloudStore = ({ clinicId, role }) => {
  const docRef = (name, id) => {
    if (name === 'invitations') return doc(db, 'invites', id);
    if (name === 'team') return doc(db, 'clinics', clinicId, 'members', id);
    return doc(db, 'clinics', clinicId, name, id);
  };

  const source = (name) => {
    if (name === 'invitations') {
      return query(collection(db, 'invites'), where('clinicId', '==', clinicId), where('status', '==', 'pending'));
    }
    return collection(db, 'clinics', clinicId, name === 'team' ? 'members' : name);
  };

  // Invitations carry their clinic so the rules can check the owner.
  const withClinic = (name, data) => (name === 'invitations' ? { ...data, clinicId } : data);

  return {
    kind: 'cloud',
    clinicId,
    role,

    // Live listeners: local writes show up immediately, writes from other devices
    // (or rejected writes being rolled back) arrive as new snapshots.
    subscribe(onCollection, onError) {
      const unsubscribers = COLLECTIONS.map(name => {
        // Collections this role may not read are simply empty, instead of a permission error.
        if (name === 'workspaces' || !canReadCollection(role, name)) {
          onCollection(name, [], { fromCache: false });
          return () => {};
        }
        return onSnapshot(
          source(name),
          snapshot => onCollection(
            name,
            snapshot.docs.map(d => ({ ...d.data(), id: d.id })),
            { fromCache: snapshot.metadata.fromCache }
          ),
          err => onError(name, err)
        );
      });
      return () => unsubscribers.forEach(unsubscribe => unsubscribe());
    },

    set: (name, item) => setDoc(docRef(name, item.id), withClinic(name, item)),

    update: (name, id, changes) => setDoc(docRef(name, id), withClinic(name, changes), { merge: true }),

    remove: (name, id) => deleteDoc(docRef(name, id)),

    // Atomic on the server, so two devices selling the same item can't overwrite each other.
    increment: (name, id, field, delta) => updateDoc(docRef(name, id), { [field]: increment(delta) }),

    async setMany(name, items) {
      for (let start = 0; start < items.length; start += BATCH_SIZE) {
        const batch = writeBatch(db);
        items.slice(start, start + BATCH_SIZE).forEach(item => batch.set(docRef(name, item.id), withClinic(name, item), { merge: true }));
        await batch.commit();
      }
    }
  };
};
