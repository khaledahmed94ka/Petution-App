import { describe, it, expect, vi, beforeEach } from 'vitest';

const calls = vi.hoisted(() => ({ writes: [], deletes: [], batches: [], listeners: [] }));

vi.mock('./firebaseAuth', () => ({ db: { fake: true } }));

vi.mock('firebase/firestore', () => ({
  doc: (_db, ...segments) => ({ path: segments.join('/') }),
  collection: (_db, ...segments) => ({ path: segments.join('/') }),
  query: (ref, ...filters) => ({ path: `${ref.path}?${filters.join('&')}` }),
  where: (field, op, value) => `${field}${op}${value}`,
  setDoc: vi.fn(async (ref, data, options) => { calls.writes.push({ path: ref.path, data, options }); }),
  updateDoc: vi.fn(async (ref, data) => { calls.writes.push({ path: ref.path, data, options: 'update' }); }),
  increment: (delta) => ({ increment: delta }),
  deleteDoc: vi.fn(async (ref) => { calls.deletes.push(ref.path); }),
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

describe('cloud store', () => {
  beforeEach(() => {
    calls.writes.length = 0;
    calls.deletes.length = 0;
    calls.batches.length = 0;
    calls.listeners.length = 0;
  });

  const store = (role = 'Owner') => createCloudStore({ clinicId: 'clinic-1', role });

  it('keeps every record inside clinics/{clinicId}/', async () => {
    await store().set('clients', { id: 'c1', name: 'A' });
    await store().update('visits', 'v1', { state: 'completed' });
    await store().remove('pets', 'p1');

    expect(calls.writes[0]).toMatchObject({ path: 'clinics/clinic-1/clients/c1', data: { id: 'c1', name: 'A' } });
    expect(calls.writes[1]).toMatchObject({ path: 'clinics/clinic-1/visits/v1', options: { merge: true } });
    expect(calls.deletes).toEqual(['clinics/clinic-1/pets/p1']);
  });

  it('stores the team as members and invitations as top-level invites for the clinic', async () => {
    await store().update('team', 'uid-9', { role: 'Vet' });
    await store().set('invitations', { id: 'inv-1', email: 'a@b.com' });
    expect(calls.writes[0].path).toBe('clinics/clinic-1/members/uid-9');
    expect(calls.writes[1]).toMatchObject({ path: 'invites/inv-1', data: { email: 'a@b.com', clinicId: 'clinic-1' } });
  });

  it('adjusts stock with an atomic increment', async () => {
    await store().increment('products', 'prod-1', 'quantity', -2);
    expect(calls.writes[0]).toEqual({ path: 'clinics/clinic-1/products/prod-1', data: { quantity: { increment: -2 } }, options: 'update' });
  });

  it('only listens to what the role may read', () => {
    const received = {};
    store('Receptionist').subscribe((name, docs) => { received[name] = docs; }, () => {});
    expect(calls.listeners).toContain('clinics/clinic-1/clients');
    expect(calls.listeners).toContain('clinics/clinic-1/members');
    expect(calls.listeners).not.toContain('clinics/clinic-1/expenses');
    expect(calls.listeners.some(path => path.startsWith('invites'))).toBe(false);
    expect(received.expenses).toEqual([]);
    expect(received.invitations).toEqual([]);
    expect(received.clients).toEqual([{ name: 'From server', id: 'd1' }]);
  });

  it('an owner also listens to the clinic\'s pending invitations', () => {
    store('Owner').subscribe(() => {}, () => {});
    expect(calls.listeners).toContain('invites?clinicId==clinic-1&status==pending');
    expect(calls.listeners).toContain('clinics/clinic-1/expenses');
  });

  it('splits large imports into batches under Firestore\'s 500-write limit', async () => {
    const items = Array.from({ length: 900 }, (_, i) => ({ id: `c${i}` }));
    await store().setMany('clients', items);
    expect(calls.batches.map(b => b.writes.length)).toEqual([400, 400, 100]);
    expect(calls.batches[0].writes[0]).toMatchObject({ path: 'clinics/clinic-1/clients/c0', options: { merge: true } });
  });
});
