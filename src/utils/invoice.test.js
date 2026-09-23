import { describe, it, expect } from 'vitest';
import { calculateInvoice, lineTotal, stockUsage, newInvoiceNumber } from './invoice';

const items = [
  { productId: 'vac', type: 'product', quantity: 2, unitPrice: 350 },
  { productId: 'exam', type: 'service', quantity: 1, unitPrice: 500 }
];

describe('calculateInvoice', () => {
  it('adds lines, then discount, then tax on the discounted amount', () => {
    expect(calculateInvoice(items, 'percentage', 10, 14)).toEqual({
      subtotal: 1200, discountAmount: 120, taxAmount: 151.2, totalAmount: 1231.2
    });
  });

  it('never discounts more than the subtotal or below zero', () => {
    expect(calculateInvoice(items, 'fixed_amount', 5000, 14).totalAmount).toBe(0);
    expect(calculateInvoice(items, 'fixed_amount', -50, 0).totalAmount).toBe(1200);
    expect(calculateInvoice(items, 'percentage', 150, 0).totalAmount).toBe(0);
  });

  it('rounds to piastres and ignores bad numbers', () => {
    expect(lineTotal({ quantity: 3, unitPrice: 33.333 })).toBe(100);
    expect(lineTotal({ quantity: -1, unitPrice: 50 })).toBe(0);
    expect(calculateInvoice([{ quantity: 'x', unitPrice: 10 }]).totalAmount).toBe(0);
    expect(calculateInvoice([{ quantity: 1, unitPrice: 0.1 }, { quantity: 1, unitPrice: 0.2 }]).subtotal).toBe(0.3);
  });
});

describe('stockUsage', () => {
  it('counts physical products only, summed per product', () => {
    expect(stockUsage([...items, { productId: 'vac', type: 'product', quantity: 1, unitPrice: 350 }]))
      .toEqual([{ productId: 'vac', quantity: 3 }]);
  });
});

describe('newInvoiceNumber', () => {
  it('uses the local date and a random suffix', () => {
    expect(newInvoiceNumber(new Date(2026, 8, 23))).toMatch(/^INV-20260923-[A-Z2-9]{4}$/);
  });
});
