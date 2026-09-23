import { describe, it, expect } from 'vitest';
import { readLegacyLocalData, clearLegacyLocalData, pruneLegacyLocalData } from './legacyLocalData';

const put = (key, value) => localStorage.setItem(key, JSON.stringify(value));

describe('legacy localStorage data', () => {
  it('ignores the old sample records and finds real ones', () => {
    put('petution_clients', [{ id: 'cli-1', name: 'Ahmed Hassan' }, { id: 'cli-1722000000000', name: 'Real Client' }]);
    put('petution_soap_notes', [{ id: 'soap-1' }]);
    const { collections, count } = readLegacyLocalData();
    expect(count).toBe(1);
    expect(collections.clients.map(c => c.name)).toEqual(['Real Client']);
    expect(collections.soapNotes).toBeUndefined();
  });

  it('pruning always drops the old sign-in flags', () => {
    put('petution_user', { id: 'usr-1', isAuthenticated: true });
    localStorage.setItem('petution_jwt_token', 'mock-jwt');
    put('petution_clients', [{ id: 'cli-99', name: 'Keep me' }]);
    pruneLegacyLocalData();
    expect(localStorage.getItem('petution_user')).toBeNull();
    expect(localStorage.getItem('petution_jwt_token')).toBeNull();
    expect(localStorage.getItem('petution_clients')).not.toBeNull();
  });

  it('pruning removes every old key when only sample data is left', () => {
    put('petution_clients', [{ id: 'cli-1' }, { id: 'cli-2' }]);
    put('petution_settings', { orgName: 'Petution' });
    pruneLegacyLocalData();
    expect(localStorage.getItem('petution_clients')).toBeNull();
    expect(localStorage.getItem('petution_settings')).toBeNull();
  });

  it('clear removes all old keys', () => {
    put('petution_pets', [{ id: 'pet-77' }]);
    put('petution_workspaces', [{ id: 'ws-1' }]);
    clearLegacyLocalData();
    expect(localStorage.length).toBe(0);
  });
});
