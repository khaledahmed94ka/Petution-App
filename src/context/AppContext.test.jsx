import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, act, waitFor } from '@testing-library/react';
import { AppProvider, useApp } from './AppContext';

let app;
const Probe = () => {
  app = useApp();
  return null;
};

// Each mount is a fresh page load: nothing survives except what was saved.
const mount = () => render(<AppProvider><Probe /></AppProvider>);

const openDemo = async () => {
  await act(() => app.startDemo());
  await waitFor(() => expect(app.dataStatus).toBe('ready'));
};

const reload = async (view) => {
  view.unmount();
  app = undefined;
  const next = mount();
  await waitFor(() => expect(app.dataStatus).toBe('ready'));
  return next;
};

describe('AppProvider session', () => {
  it('starts signed out, even when an old version left a "logged in" flag behind', async () => {
    localStorage.setItem('petution_user', JSON.stringify({ id: 'usr-1', isAuthenticated: true }));
    mount();
    await waitFor(() => expect(app.authStatus).toBe('ready'));
    expect(app.user).toBeNull();
    expect(app.clients).toEqual([]);
    expect(localStorage.getItem('petution_user')).toBeNull();
  });

  it('opens the demo without credentials', async () => {
    mount();
    await openDemo();
    expect(app.isDemo).toBe(true);
    expect(app.user.email).toBe('demo@petution.app');
    expect(app.clients.length).toBeGreaterThan(0);
  });

  it('signing out clears clinic data from memory and from the browser', async () => {
    const view = mount();
    await openDemo();
    act(() => app.addClient({ name: 'Private Person', phones: [] }));
    await act(() => app.logout());
    expect(app.user).toBeNull();
    expect(app.clients).toEqual([]);
    expect(Object.keys(localStorage)).toEqual([]);

    view.unmount();
    mount();
    await waitFor(() => expect(app.authStatus).toBe('ready'));
    expect(app.user).toBeNull();
    expect(app.clients).toEqual([]);
  });
});

describe('AppProvider saving', () => {
  it('keeps a visit status change after a reload (used to be lost)', async () => {
    const view = mount();
    await openDemo();
    act(() => app.updateVisit('vis-1', { state: 'completed', doctorName: 'Dr. B' }));
    expect(app.visits.find(v => v.id === 'vis-1').state).toBe('completed');

    await reload(view);
    const visit = app.visits.find(v => v.id === 'vis-1');
    expect(visit.state).toBe('completed');
    expect(visit.doctorName).toBe('Dr. B');
    expect(visit.reason).toBe('Annual Checkup');
  });

  it('keeps new records, imports and notification reads after a reload', async () => {
    const view = mount();
    await openDemo();
    let created;
    act(() => { created = app.addClient({ name: 'Mona Adel', phones: [] }); });
    act(() => { app.importPetsData([{ PetName: 'Imported Cat', Species: 'Cat', Vaccinated: 'Yes' }]); });
    act(() => app.markAllNotificationsRead());

    await reload(view);
    const client = app.clients.find(c => c.id === created.id);
    expect(client.name).toBe('Mona Adel');
    expect(created.id).toMatch(/^cli-/);
    expect(app.clients[0].id).toBe(created.id);
    const pet = app.pets.find(p => p.name === 'Imported Cat');
    expect(pet).toMatchObject({ species: 'cat', vaccinated: true });
    expect(app.notifications.every(n => n.read)).toBe(true);
  });

  it('restoring a backup merges into the clinic instead of replacing it', async () => {
    mount();
    await openDemo();
    const before = app.clients.length;
    act(() => {
      app.importFullBackup({
        clients: [{ id: 'cli-1', name: 'Ahmed Hassan (restored)' }, { id: 'cli-from-backup', name: 'From Backup' }],
        vaccines: [{ id: 'vac-restored', petId: 'pet-1', vaccineName: 'Restored dose' }],
        settings: { id: 'global', orgName: 'Restored Clinic', activeWorkspaceId: 'ws-missing' }
      });
    });
    expect(app.clients.length).toBe(before + 1);
    expect(app.clients.find(c => c.id === 'cli-1').name).toBe('Ahmed Hassan (restored)');
    expect(app.clients.some(c => c.id === 'cli-2')).toBe(true);
    expect(app.vaccines.some(v => v.id === 'vac-restored')).toBe(true);
    expect(app.settings.orgName).toBe('Restored Clinic');
    expect(app.settings.activeWorkspaceId).toBe('ws-demo');
  });

  it('saving a SOAP note twice for one visit updates it instead of duplicating', async () => {
    mount();
    await openDemo();
    const count = app.soapNotes.length;
    act(() => app.saveSOAPNote({ visitId: 'vis-9', petId: 'pet-1', assessment: 'First' }));
    act(() => app.saveSOAPNote({ visitId: 'vis-9', petId: 'pet-1', assessment: 'Second' }));
    const notes = app.soapNotes.filter(s => s.visitId === 'vis-9');
    expect(app.soapNotes.length).toBe(count + 1);
    expect(notes).toHaveLength(1);
    expect(notes[0].assessment).toBe('Second');
  });

  it('never sends demo records to Shopify', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    mount();
    await openDemo();
    act(() => app.setSettings({ shopifyShop: 'my-store.myshopify.com', shopifySyncEnabled: true }));
    act(() => app.addClient({ name: 'Demo Client', phones: [] }));
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('lists only Owner/Vet team members (and the signed-in user) as doctors', async () => {
    mount();
    await openDemo();
    act(() => app.inviteMember({ name: 'Dr. New Vet', email: 'v@x.com', role: 'Vet' }));
    act(() => app.inviteMember({ name: 'Front Desk', email: 'f@x.com', role: 'Receptionist' }));
    expect(app.doctorNames).toEqual(['Demo Vet', 'Dr. New Vet']);
  });
});

describe('AppProvider invoices', () => {
  const vaccineLine = { productId: 'prod-1', name: 'Feline Rabies Vaccine', type: 'product', quantity: 2, unitPrice: 350 };
  const examLine = { productId: 'serv-1', name: 'General Examination & Consultation', type: 'service', quantity: 1, unitPrice: 500 };
  const stockOf = (id) => app.products.find(p => p.id === id).quantity;

  it('saves line items and totals, takes products out of stock, and leaves services alone', async () => {
    mount();
    await openDemo();
    const reminderCount = app.reminders.length;
    let invoice;
    act(() => {
      invoice = app.addInvoice({ petId: 'pet-1', items: [vaccineLine, examLine], discountType: 'percentage', discountValue: 10, taxPercentage: 14 });
    });

    const saved = app.invoices.find(i => i.id === invoice.id);
    expect(saved).toMatchObject({ clientId: 'cli-1', status: 'pending', subtotal: 1200, discountAmount: 120, taxAmount: 151.2, totalAmount: 1231.2, stockDeducted: true });
    expect(saved.items).toHaveLength(2);
    expect(saved.number).toMatch(/^INV-\d{8}-/);
    expect(stockOf('prod-1')).toBe(43);
    expect(stockOf('serv-1')).toBe(999);
    expect(app.stockLogs[0].change).toBe(`-2 units (Invoice ${saved.number})`);
    expect(app.reminders).toHaveLength(reminderCount);
  });

  it('cancelling returns products to stock once; marking paid records the date', async () => {
    mount();
    await openDemo();
    let invoice;
    act(() => { invoice = app.addInvoice({ petId: 'pet-1', items: [vaccineLine] }); });
    act(() => app.setInvoiceStatus(invoice.id, 'paid'));
    expect(app.invoices.find(i => i.id === invoice.id)).toMatchObject({ status: 'paid' });
    expect(app.invoices.find(i => i.id === invoice.id).paidAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    act(() => app.setInvoiceStatus(invoice.id, 'cancelled'));
    act(() => app.setInvoiceStatus(invoice.id, 'cancelled'));
    expect(stockOf('prod-1')).toBe(45);
    expect(app.invoices.find(i => i.id === invoice.id)).toMatchObject({ status: 'cancelled', stockDeducted: false });

    act(() => app.setInvoiceStatus(invoice.id, 'paid'));
    expect(app.invoices.find(i => i.id === invoice.id).status).toBe('cancelled');
  });

  it('an invoice created as cancelled never touches stock', async () => {
    mount();
    await openDemo();
    act(() => { app.addInvoice({ petId: 'pet-1', items: [vaccineLine], status: 'cancelled' }); });
    expect(stockOf('prod-1')).toBe(45);
  });

  it('creates a refill reminder for items with a reminder interval', async () => {
    mount();
    await openDemo();
    act(() => app.updateProduct('prod-1', { reminderDays: 365 }));
    let invoice;
    act(() => { invoice = app.addInvoice({ petId: 'pet-2', items: [{ ...vaccineLine, quantity: 1 }] }); });
    const reminder = app.reminders.find(r => r.invoiceId === invoice.id);
    expect(reminder).toMatchObject({ petId: 'pet-2', clientId: 'cli-2', productId: 'prod-1', status: 'pending' });
  });
});
