import { todayLocal } from './ids';

const round2 = (value) => Math.round((Number(value) || 0) * 100) / 100;
const nonNegative = (value) => Math.max(0, Number(value) || 0);

export const lineTotal = (item) => round2(nonNegative(item.quantity) * nonNegative(item.unitPrice));

// Discount never goes below zero or above the subtotal; tax applies after discount.
export const calculateInvoice = (items = [], discountType = 'none', discountValue = 0, taxPercentage = 0) => {
  const subtotal = round2(items.reduce((sum, item) => sum + lineTotal(item), 0));
  const value = nonNegative(discountValue);
  let discountAmount = 0;
  if (discountType === 'percentage') discountAmount = (subtotal * Math.min(value, 100)) / 100;
  if (discountType === 'fixed_amount') discountAmount = Math.min(value, subtotal);
  discountAmount = round2(discountAmount);
  const taxable = round2(subtotal - discountAmount);
  const taxAmount = round2((taxable * nonNegative(taxPercentage)) / 100);
  return { subtotal, discountAmount, taxAmount, totalAmount: round2(taxable + taxAmount) };
};

// Stock used by an invoice: physical products only (services have no stock), summed per product.
export const stockUsage = (items = []) => {
  const usage = new Map();
  items
    .filter(item => item.productId && item.type === 'product' && nonNegative(item.quantity) > 0)
    .forEach(item => usage.set(item.productId, (usage.get(item.productId) || 0) + nonNegative(item.quantity)));
  return [...usage.entries()].map(([productId, quantity]) => ({ productId, quantity }));
};

// Human-readable number printed on receipts, e.g. INV-20260923-4F7K.
export const newInvoiceNumber = (date = new Date()) => {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const suffix = Array.from(globalThis.crypto.getRandomValues(new Uint8Array(4)), b => letters[b % letters.length]).join('');
  return `INV-${todayLocal(date).replace(/-/g, '')}-${suffix}`;
};
