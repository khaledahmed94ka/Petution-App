import { describe, it, expect } from 'vitest';
import { can, canReadCollection, canOpenPage } from './permissions';

describe('permissions', () => {
  it('matches the role table', () => {
    expect(can('Owner', 'manageTeam')).toBe(true);
    expect(can('Admin', 'manageTeam')).toBe(false);
    expect(can('Vet', 'writeMedical')).toBe(true);
    expect(can('Receptionist', 'writeMedical')).toBe(false);
    expect(can('Admin', 'manageInventory')).toBe(true);
    expect(can('Vet', 'manageInventory')).toBe(false);
    expect(can('Receptionist', 'writeRecords')).toBe(true);
    expect(can(null, 'writeRecords')).toBe(false);
    expect(can('Owner', 'no-such-permission')).toBe(false);
  });

  it('hides expenses and invitations from roles that may not read them', () => {
    expect(canReadCollection('Vet', 'expenses')).toBe(false);
    expect(canReadCollection('Admin', 'expenses')).toBe(true);
    expect(canReadCollection('Admin', 'invitations')).toBe(false);
    expect(canReadCollection('Receptionist', 'clients')).toBe(true);
    expect(canReadCollection('Stranger', 'clients')).toBe(false);
  });

  it('gates pages', () => {
    expect(canOpenPage('Receptionist', 'expenses')).toBe(false);
    expect(canOpenPage('Receptionist', 'clients')).toBe(true);
    expect(canOpenPage('Admin', 'analytics')).toBe(true);
    expect(canOpenPage('Admin', 'settings')).toBe(false);
  });
});
