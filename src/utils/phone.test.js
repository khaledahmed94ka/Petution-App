import { describe, it, expect } from 'vitest';
import { normalizePhone, whatsappUrl, phoneMatches } from './phone';

describe('normalizePhone', () => {
  it.each([
    ['01001234567', '+201001234567'],
    ['010 0123 4567', '+201001234567'],
    ['(010) 012-34567', '+201001234567'],
    ['1001234567', '+201001234567'],
    ['201001234567', '+201001234567'],
    ['00201001234567', '+201001234567'],
    ['+20 100 123 4567', '+201001234567'],
    ['+44 7700 900123', '+447700900123'],
    ['0223456789', '+20223456789']
  ])('%s -> %s', (input, expected) => {
    expect(normalizePhone(input)).toBe(expected);
  });

  it('leaves empty or unreadable input alone', () => {
    expect(normalizePhone('')).toBe('');
    expect(normalizePhone('  ext  ')).toBe('ext');
    expect(normalizePhone(undefined)).toBe('');
  });
});

describe('whatsappUrl', () => {
  it('builds a wa.me link with digits only, even for numbers stored in local form', () => {
    expect(whatsappUrl('01001234567')).toBe('https://wa.me/201001234567');
    expect(whatsappUrl('+201001234567', 'Hi Mona & co')).toBe('https://wa.me/201001234567?text=Hi%20Mona%20%26%20co');
  });

  it('returns null when there is no usable number', () => {
    expect(whatsappUrl('')).toBeNull();
    expect(whatsappUrl('+123')).toBeNull();
    expect(whatsappUrl('ext')).toBeNull();
  });
});

describe('phoneMatches', () => {
  it('finds a stored international number from a local search', () => {
    expect(phoneMatches('+201001234567', '0100123')).toBe(true);
    expect(phoneMatches('+201001234567', '1234567')).toBe(true);
    expect(phoneMatches('+201001234567', '0111')).toBe(false);
    expect(phoneMatches('+201001234567', 'Mona')).toBe(false);
  });
});
