const randomHex = () =>
  Array.from(globalThis.crypto.getRandomValues(new Uint8Array(16)), b => b.toString(16).padStart(2, '0')).join('');

// randomUUID only exists in secure contexts (https / localhost); getRandomValues works everywhere.
export const newId = (prefix) => `${prefix}-${globalThis.crypto.randomUUID?.() ?? randomHex()}`;

const pad = (n) => String(n).padStart(2, '0');

// YYYY-MM-DD in the clinic's local time zone (toISOString would give the UTC date).
export const todayLocal = (date = new Date()) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const slugify = (text = '') =>
  text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'clinic';
