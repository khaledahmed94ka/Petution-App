import { collection, doc, onSnapshot, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { db } from './firebaseAuth';
import { COLLECTIONS } from '../data/collections';

// Firestore rejects batches with more than 500 writes.
const BATCH_SIZE = 400;

// Store for a signed-in account. All data lives under users/{uid}/, which the
// security rules in firestore.rules restrict to that user.
export const createCloudStore = (uid) => {
  const docRef = (name, id) => doc(db, 'users', uid, name, id);

  return {
    kind: 'cloud',

    // Live listeners: local writes show up immediately, writes from other devices
    // (or rejected writes being rolled back) arrive as new snapshots.
    subscribe(onCollection, onError) {
      const unsubscribers = COLLECTIONS.map(name =>
        onSnapshot(
          collection(db, 'users', uid, name),
          snapshot => onCollection(
            name,
            snapshot.docs.map(d => ({ ...d.data(), id: d.id })),
            { fromCache: snapshot.metadata.fromCache }
          ),
          err => onError(name, err)
        )
      );
      return () => unsubscribers.forEach(unsubscribe => unsubscribe());
    },

    set: (name, item) => setDoc(docRef(name, item.id), item),

    update: (name, id, changes) => setDoc(docRef(name, id), changes, { merge: true }),

    remove: (name, id) => deleteDoc(docRef(name, id)),

    async setMany(name, items) {
      for (let start = 0; start < items.length; start += BATCH_SIZE) {
        const batch = writeBatch(db);
        items.slice(start, start + BATCH_SIZE).forEach(item => batch.set(docRef(name, item.id), item, { merge: true }));
        await batch.commit();
      }
    }
  };
};
