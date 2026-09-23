import { describe, it, expect } from 'vitest';
import { newId, todayLocal, slugify } from './ids';
import { sortCollection } from '../data/collections';

describe('ids and helpers', () => {
  it('newId never repeats, even within the same millisecond', () => {
    const ids = new Set(Array.from({ length: 1000 }, () => newId('cli')));
    expect(ids.size).toBe(1000);
    [...ids].forEach(id => expect(id).toMatch(/^cli-[0-9a-f-]{32,36}$/));
  });

  it('todayLocal uses the local calendar date', () => {
    expect(todayLocal(new Date(2026, 0, 5, 23, 30))).toBe('2026-01-05');
  });

  it('slugify makes URL-safe slugs', () => {
    expect(slugify('  Dr. Mona’s Vet Clinic!! ')).toBe('dr-mona-s-vet-clinic');
    expect(slugify('')).toBe('clinic');
  });

  it('sortCollection lists newest first, workspaces oldest first', () => {
    const docs = [{ id: 'a', createdTs: 1 }, { id: 'b', createdTs: 3 }, { id: 'c', createdTs: 2 }];
    expect(sortCollection('clients', docs).map(d => d.id)).toEqual(['b', 'c', 'a']);
    expect(sortCollection('workspaces', docs).map(d => d.id)).toEqual(['a', 'c', 'b']);
  });
});
