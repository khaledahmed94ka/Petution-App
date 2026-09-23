import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, act, waitFor, within, fireEvent } from '@testing-library/react';
import App, { MainApp } from './App';
import { AppProvider, useApp } from './context/AppContext';
import { ErrorBoundary } from './components/ErrorBoundary';

let app;
const Probe = () => {
  app = useApp();
  return null;
};

const renderDemo = async () => {
  const view = render(<AppProvider><MainApp /><Probe /></AppProvider>);
  await act(() => app.startDemo());
  await waitFor(() => expect(app.dataStatus).toBe('ready'));
  return view;
};

const openDrawer = (drawer, item) => act(() => {
  app.setActiveModalItem(item);
  app.setActiveDrawer(drawer);
});

describe('login screen', () => {
  it('a fresh browser gets the login form, not the dashboard', async () => {
    const { container } = render(<App />);
    expect(await screen.findByText('Sign In to Workspace')).toBeTruthy();
    expect(container.querySelector('.sidebar')).toBeNull();
  });

  it('explains when account sign-in is not configured and disables it', async () => {
    render(<App />);
    expect(await screen.findByText(/Account sign-in isn't configured/)).toBeTruthy();
    expect(screen.getByRole('button', { name: /Sign In to Workspace/ }).disabled).toBe(true);
    expect(screen.queryByText(/demo123/)).toBeNull();
  });
});

describe('SOAP note', () => {
  it('a new note has no prescription and no vitals until the vet enters them', async () => {
    const { container } = await renderDemo();
    let visit;
    act(() => { visit = app.addVisit({ petId: 'pet-2', clientId: 'cli-2', doctorName: 'Dr. Sarah Mahmoud', date: '2026-09-01', state: 'in-progress' }); });
    openDrawer('soapNote', visit.id);

    const vitals = [...container.querySelectorAll('.vitals-grid input')].map(input => input.value);
    expect(vitals).toEqual(['', '', '', '']);
    expect(container.querySelectorAll('.rx-item-row')).toHaveLength(0);
    expect(screen.getByText(/No medications prescribed/)).toBeTruthy();
    expect(container.querySelector('.sig-line-doctor').textContent).toBe('Dr. Sarah Mahmoud');

    fireEvent.click(screen.getByRole('button', { name: /Save SOAP Record/ }));
    const saved = app.soapNotes.find(s => s.visitId === visit.id);
    expect(saved).toMatchObject({ tempC: null, weightKg: null, heartRateBpm: null, respiratoryRateBpm: null, rxMedications: [] });
  });

  it('an unknown visit shows "not found" instead of another patient\'s visit', async () => {
    await renderDemo();
    openDrawer('soapNote', 'vis-does-not-exist');
    expect(screen.getByText('Visit not found')).toBeTruthy();
    expect(screen.queryByText(/Clinical consultation notes for/)).toBeNull();
  });
});

describe('pet passport and vaccines', () => {
  it('an unknown pet shows "not found" instead of the first pet', async () => {
    const { container } = await renderDemo();
    openDrawer('petPassport', 'pet-does-not-exist');
    const drawer = container.querySelector('.drawer-panel');
    expect(within(drawer).getByText('Patient not found')).toBeTruthy();
    expect(within(drawer).queryByText('Milo')).toBeNull();
  });

  it('recording a vaccine from a passport uses that pet and the signed-in vet', async () => {
    const { container } = await renderDemo();
    openDrawer('petPassport', 'pet-2');
    fireEvent.click(screen.getByRole('button', { name: /Record Vaccine Shot/ }));

    const panel = container.querySelector('.drawer-panel');
    const [petSelect, vaccineSelect] = panel.querySelectorAll('select');
    expect(petSelect.value).toBe('pet-2');
    expect(within(panel).getByDisplayValue('Demo Vet')).toBeTruthy();

    fireEvent.change(vaccineSelect, { target: { value: 'Other' } });
    fireEvent.change(within(panel).getByPlaceholderText('Vaccine name'), { target: { value: 'Leptospirosis booster' } });
    fireEvent.click(within(panel).getByRole('button', { name: 'Log Vaccine Dose' }));

    expect(app.vaccines.find(v => v.vaccineName === 'Leptospirosis booster')).toMatchObject({ petId: 'pet-2', vetName: 'Demo Vet' });
    expect(app.activeDrawer).toBe('petPassport');
    expect(app.activeModalItem).toBe('pet-2');
  });
});

describe('error boundary', () => {
  it('shows a message instead of a blank app when a page crashes', () => {
    const Broken = () => { throw new Error('bad record'); };
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<ErrorBoundary onReset={() => {}}><Broken /></ErrorBoundary>);
    expect(screen.getByText('Something went wrong on this page')).toBeTruthy();
    expect(screen.getByText('bad record')).toBeTruthy();
    spy.mockRestore();
  });
});

describe('phone numbers and WhatsApp', () => {
  it('saves a locally typed number in international form', async () => {
    const { container } = await renderDemo();
    openDrawer('addClient', null);
    const panel = container.querySelector('.drawer-panel');
    fireEvent.change(within(panel).getByPlaceholderText('Client full name'), { target: { value: 'Mona Adel' } });
    fireEvent.change(within(panel).getByPlaceholderText('Enter phone number'), { target: { value: '010 0123 4567' } });
    fireEvent.click(within(panel).getByRole('button', { name: 'Create client' }));
    expect(app.clients.find(c => c.name === 'Mona Adel').phones[0].phone).toBe('+201001234567');
  });

  it('opens a wa.me link without "+" from the reminders page', async () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    await renderDemo();
    act(() => app.setActiveTab('reminders'));
    fireEvent.click(screen.getAllByRole('button', { name: /WhatsApp/ })[0]);
    expect(openSpy.mock.calls[0][0]).toMatch(/^https:\/\/wa\.me\/20\d+\?text=/);
  });
});

describe('invoice form', () => {
  it('bills several items, shows the total, and warns before overselling', async () => {
    const { container } = await renderDemo();
    openDrawer('addInvoice', null);
    const panel = container.querySelector('.drawer-panel');
    fireEvent.change(panel.querySelector('select'), { target: { value: 'pet-2' } });
    expect(within(panel).getByText('Owner: Sarah Mahmoud')).toBeTruthy();

    fireEvent.change(within(panel).getByLabelText('Item 1'), { target: { value: 'prod-1' } });
    fireEvent.change(within(panel).getByLabelText('Quantity 1'), { target: { value: '50' } });
    expect(within(panel).getByText(/Only 45 in stock/)).toBeTruthy();
    fireEvent.change(within(panel).getByLabelText('Quantity 1'), { target: { value: '2' } });

    fireEvent.click(within(panel).getByRole('button', { name: /Add item/ }));
    fireEvent.change(within(panel).getByLabelText('Item 2'), { target: { value: 'serv-1' } });
    expect(within(panel).getByTestId('invoice-total').textContent).toBe('EGP 1368.00');

    fireEvent.click(within(panel).getByRole('button', { name: 'Create Invoice' }));
    const invoice = app.invoices[0];
    expect(invoice.items.map(i => `${i.quantity} ${i.productId}`)).toEqual(['2 prod-1', '1 serv-1']);
    expect(invoice.clientId).toBe('cli-2');
    expect(app.products.find(p => p.id === 'prod-1').quantity).toBe(43);
  });

  it('starting from a visit pre-selects that visit\'s pet', async () => {
    const { container } = await renderDemo();
    openDrawer('addInvoice', { invoiceForVisit: 'vis-1' });
    const [petSelect, visitSelect] = container.querySelector('.drawer-panel').querySelectorAll('select');
    expect(petSelect.value).toBe('pet-1');
    expect(visitSelect.value).toBe('vis-1');
  });
});

describe('metrics on screen', () => {
  it('the dashboard shows today\'s paid revenue, not all-time revenue', async () => {
    const { container } = await renderDemo();
    act(() => app.setActiveTab('dashboard'));
    // The sample clinic has one invoice paid today (570) and one paid two weeks ago.
    expect(container.querySelector('.banner-amount').textContent).toBe('570 EGP');

    act(() => { app.addInvoice({ petId: 'pet-1', status: 'paid', items: [{ productId: 'serv-1', name: 'Exam', type: 'service', quantity: 1, unitPrice: 500 }], taxPercentage: 0 }); });
    act(() => { app.addInvoice({ petId: 'pet-1', status: 'pending', items: [{ productId: 'serv-1', name: 'Exam', type: 'service', quantity: 1, unitPrice: 500 }], taxPercentage: 0 }); });
    expect(container.querySelector('.banner-amount').textContent).toBe('1,070 EGP');
    expect(screen.getByText('No paid revenue yesterday to compare')).toBeTruthy();
  });

  it('analytics marks untracked KPIs instead of showing zeros', async () => {
    const { container } = await renderDemo();
    act(() => app.setActiveTab('analytics'));
    expect(container.querySelectorAll('.kpi-card')).toHaveLength(18);
    expect(container.querySelectorAll('.kpi-untracked')).toHaveLength(6);
    expect(screen.getAllByText('Not tracked yet')).toHaveLength(6);
  });
});

describe('demo clinic', () => {
  it('shows a realistic day on the dashboard', async () => {
    const { container } = await renderDemo();
    act(() => app.setActiveTab('dashboard'));
    const pulse = Object.fromEntries([...container.querySelectorAll('.pulse-card')].map(card => [
      card.querySelector('.card-lbl').textContent, card.querySelector('.card-val').textContent
    ]));
    expect(pulse).toMatchObject({ 'Visits Today': '2', 'In Progress': '1', 'Scheduled Queue': '1', '% Recurring (30d)': '33%' });
    const alerts = [...container.querySelectorAll('.alert-card')].map(card => card.textContent);
    expect(alerts).toEqual(['1Overdue reminders', '1Low stock products', '1Reminders due in 7 days', '0Unpaid invoices']);
    expect([...container.querySelectorAll('.queue-item')].map(item => item.textContent)).toEqual([
      '10:30 AMRockyVaccinationin-progress',
      '06:00 PMMiloCheck-upscheduled'
    ]);
  });
});
