import { describe, it, expect, vi } from 'vitest';
import { createDemoStore, clearDemoData } from './demoStore';
import { COLLECTIONS } from '../data/collections';

const collect = (store) => {
  const latest = {};
  const listener = vi.fn((name, docs) => { latest[name] = docs; });
  store.subscribe(listener);
  return { latest, listener };
};

describe('demo store', () => {
  it('starts from the sample clinic and emits every collection on subscribe', () => {
    const { latest, listener } = collect(createDemoStore());
    expect(listener).toHaveBeenCalledTimes(COLLECTIONS.length);
    expect(latest.clients.map(c => c.name)).toContain('Ahmed Hassan');
    expect(latest.settings[0].id).toBe('global');
  });

  it('persists writes so a new store (page reload) sees them', async () => {
    const store = createDemoStore();
    await store.set('clients', { id: 'c-new', name: 'New Client' });
    await store.update('visits', 'vis-1', { state: 'completed' });
    await store.remove('pets', 'pet-2');

    const { latest } = collect(createDemoStore());
    expect(latest.clients.find(c => c.id === 'c-new')?.name).toBe('New Client');
    expect(latest.visits.find(v => v.id === 'vis-1').state).toBe('completed');
    expect(latest.visits.find(v => v.id === 'vis-1').reason).toBe('Annual Checkup');
    expect(latest.pets.some(p => p.id === 'pet-2')).toBe(false);
  });

  it('update creates a missing record, like a Firestore merge', async () => {
    const store = createDemoStore();
    const { latest } = collect(store);
    await store.update('settings', 'other', { orgName: 'X' });
    expect(latest.settings.find(s => s.id === 'other')).toEqual({ id: 'other', orgName: 'X' });
  });

  it('setMany merges into existing records instead of replacing the list', async () => {
    const store = createDemoStore();
    const { latest } = collect(store);
    await store.setMany('clients', [{ id: 'cli-1', tags: ['Updated'] }, { id: 'cli-9', name: 'Added' }]);
    const ahmed = latest.clients.find(c => c.id === 'cli-1');
    expect(ahmed.name).toBe('Ahmed Hassan');
    expect(ahmed.tags).toEqual(['Updated']);
    expect(latest.clients.some(c => c.id === 'cli-2')).toBe(true);
    expect(latest.clients.some(c => c.id === 'cli-9')).toBe(true);
  });

  it('clearDemoData resets to the sample clinic', async () => {
    await createDemoStore().set('clients', { id: 'c-new', name: 'Temp' });
    clearDemoData();
    const { latest } = collect(createDemoStore());
    expect(latest.clients.some(c => c.id === 'c-new')).toBe(false);
  });
});
