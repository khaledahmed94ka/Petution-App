import { describe, it, expect, vi, beforeEach } from 'vitest';

const calls = vi.hoisted(() => ({ setDoc: [], deleteDoc: [], batches: [], listeners: [] }));

vi.mock('./firebaseAuth', () => ({ db: { fake: true } }));

vi.mock('firebase/firestore', () => ({
  doc: (_db, ...segments) => ({ path: segments.join('/') }),
  collection: (_db, ...segments) => ({ path: segments.join('/') }),
  setDoc: vi.fn(async (ref, data, options) => { calls.setDoc.push({ path: ref.path, data, options }); }),
  deleteDoc: vi.fn(async (ref) => { calls.deleteDoc.push(ref.path); }),
  writeBatch: () => {
    const batch = { writes: [] };
    calls.batches.push(batch);
    return {
      set: (ref, data, options) => batch.writes.push({ path: ref.path, data, options }),
      commit: vi.fn(async () => {})
    };
  },
  onSnapshot: vi.fn((ref, onNext) => {
    calls.listeners.push(ref.path);
    onNext({ docs: [{ id: 'd1', data: () => ({ name: 'From server', id: 'stale' }) }], metadata: { fromCache: false } });
    return () => {};
  })
}));

const { createCloudStore } = await import('./firestoreDb');
const { COLLECTIONS } = await import('../data/collections');

describe('cloud store', () => {
  beforeEach(() => {
    calls.setDoc.length = 0;
    calls.deleteDoc.length = 0;
    calls.batches.length = 0;
    calls.listeners.length = 0;
  });

  it('keeps every read and write inside users/{uid}/', async () => {
    const store = createCloudStore('uid-123');
    await store.set('clients', { id: 'c1', name: 'A' });
    await store.update('visits', 'v1', { state: 'completed' });
    await store.remove('pets', 'p1');

    expect(calls.setDoc[0]).toMatchObject({ path: 'users/uid-123/clients/c1', data: { id: 'c1', name: 'A' } });
    expect(calls.setDoc[1]).toMatchObject({ path: 'users/uid-123/visits/v1', options: { merge: true } });
    expect(calls.deleteDoc).toEqual(['users/uid-123/pets/p1']);
  });

  it('listens to every collection and uses the document ID as the record ID', () => {
    const received = {};
    createCloudStore('uid-123').subscribe((name, docs, meta) => { received[name] = { docs, meta }; }, () => {});
    expect(calls.listeners).toEqual(COLLECTIONS.map(name => `users/uid-123/${name}`));
    expect(received.clients.docs).toEqual([{ name: 'From server', id: 'd1' }]);
    expect(received.clients.meta).toEqual({ fromCache: false });
  });

  it('splits large imports into batches under Firestore\'s 500-write limit', async () => {
    const items = Array.from({ length: 900 }, (_, i) => ({ id: `c${i}` }));
    await createCloudStore('uid-123').setMany('clients', items);
    expect(calls.batches.map(b => b.writes.length)).toEqual([400, 400, 100]);
    expect(calls.batches[0].writes[0]).toMatchObject({ path: 'users/uid-123/clients/c0', options: { merge: true } });
  });
});
