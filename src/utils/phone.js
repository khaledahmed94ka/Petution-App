// Egypt, matching the +20 prefix shown in the client form.
const DEFAULT_COUNTRY_CODE = '20';

const digitsOf = (value) => String(value ?? '').replace(/\D/g, '');

// Returns the number in international form (e.g. +201001234567). Local numbers
// such as 010 0123 4567 get the default country code. Anything it can't
// interpret is returned trimmed, unchanged.
export const normalizePhone = (input) => {
  const raw = String(input ?? '').trim();
  const digits = digitsOf(raw);
  if (!digits) return raw;
  if (raw.startsWith('+')) return `+${digits}`;
  if (digits.startsWith('00')) return `+${digits.slice(2)}`;
  if (digits.startsWith(DEFAULT_COUNTRY_CODE) && digits.length >= 11) return `+${digits}`;
  if (digits.startsWith('0')) return `+${DEFAULT_COUNTRY_CODE}${digits.slice(1)}`;
  if (digits.length === 10 && digits.startsWith('1')) return `+${DEFAULT_COUNTRY_CODE}${digits}`;
  return raw;
};

// wa.me needs the full international number as digits only (no "+", no leading 0).
export const whatsappUrl = (phone, message) => {
  const normalized = normalizePhone(phone);
  if (!normalized.startsWith('+')) return null;
  const digits = normalized.slice(1);
  if (digits.length < 8) return null;
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
};

// Lets "0100 123", "+20100123" and "20100123" all find the same stored number.
export const phoneMatches = (phone, search) => {
  const wanted = digitsOf(search);
  if (!wanted) return false;
  const stored = digitsOf(normalizePhone(phone));
  return stored.includes(wanted) || stored.includes(digitsOf(normalizePhone(search)));
};
