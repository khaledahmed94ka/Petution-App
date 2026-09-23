import { describe, it, expect } from 'vitest';
import {
  addDays, addMonths, percentChange, paidRevenueBetween, timeToMinutes,
  dashboardMetrics, clientMetrics, visitMetrics, analyticsRange, analyticsMetrics
} from './metrics';

const TODAY = '2026-09-23';

describe('date helpers', () => {
  it('adds days and months across boundaries', () => {
    expect(addDays('2026-03-01', -1)).toBe('2026-02-28');
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
    expect(addMonths('2026-05-31', -3)).toBe('2026-02-28');
    expect(addMonths('2026-01-15', -1)).toBe('2025-12-15');
  });

  it('reads 12- and 24-hour times', () => {
    expect(timeToMinutes('12:00 AM')).toBe(0);
    expect(timeToMinutes('9:30 am')).toBe(570);
    expect(timeToMinutes('12:15 PM')).toBe(735);
    expect(timeToMinutes('08:00 PM')).toBe(1200);
    expect(timeToMinutes('14:15')).toBe(855);
    expect(timeToMinutes('')).toBe(1440);
  });

  it('percentChange is null when there is nothing to compare with', () => {
    expect(percentChange(150, 100)).toBe(50);
    expect(percentChange(50, 100)).toBe(-50);
    expect(percentChange(100, 0)).toBeNull();
  });
});

describe('paid revenue', () => {
  it('counts paid invoices on the day they were paid, falling back to the creation day', () => {
    const invoices = [
      { status: 'paid', totalAmount: 100, createdAt: '2026-09-20', paidAt: TODAY },
      { status: 'paid', totalAmount: 50.5, createdAt: TODAY },
      { status: 'pending', totalAmount: 999, createdAt: TODAY },
      { status: 'cancelled', totalAmount: 999, createdAt: TODAY },
      { status: 'paid', totalAmount: 70, createdAt: '2026-09-22' }
    ];
    expect(paidRevenueBetween(invoices, TODAY, TODAY)).toBe(150.5);
    expect(paidRevenueBetween(invoices, '2026-09-01', TODAY)).toBe(220.5);
  });
});

describe('dashboardMetrics', () => {
  const data = {
    visits: [
      { id: 'a', petId: 'p1', date: '2026-08-01', state: 'completed' },
      { id: 'b', petId: 'p1', date: TODAY, state: 'scheduled', time: '08:00 PM' },
      { id: 'c', petId: 'p2', date: TODAY, state: 'in-progress', time: '09:30 AM' },
      { id: 'd', petId: 'p3', date: TODAY, state: 'cancelled' },
      { id: 'e', petId: 'p4', date: '2026-09-30', state: 'scheduled' },
      { id: 'f', petId: 'p5', date: '2026-09-10', state: 'scheduled' },
      { id: 'g', petId: 'p6', date: '2026-07-01', state: 'scheduled' }
    ],
    invoices: [
      { status: 'paid', totalAmount: 300, createdAt: TODAY },
      { status: 'paid', totalAmount: 200, createdAt: '2026-09-22' },
      { status: 'pending', totalAmount: 50, createdAt: TODAY }
    ],
    products: [
      { type: 'product', quantity: 3, alertThreshold: 5 },
      { type: 'product', quantity: 10, alertThreshold: 5 },
      { type: 'service', quantity: 0, alertThreshold: 5 }
    ],
    reminders: [
      { status: 'pending', dueDate: '2026-09-01' },
      { status: 'pending', dueDate: '2026-09-25' },
      { status: 'pending', dueDate: '2026-12-01' },
      { status: 'completed', dueDate: '2026-09-01' }
    ]
  };

  it('computes today\'s numbers from real records', () => {
    const m = dashboardMetrics(data, TODAY);
    expect(m.revenueToday).toBe(300);
    expect(m.revenueChange).toBe(50);
    expect(m.visitsToday).toBe(2);
    expect(m.inProgress).toBe(1);
    expect(m.bookedLater).toBe(1);
    expect(m.scheduledToday).toBe(1);
    expect(m.noShows30d).toBe(1);
    expect(m.recurringPercent).toBe(33);
    expect(m.overdueReminders).toBe(1);
    expect(m.upcomingReminders).toBe(1);
    expect(m.lowStock).toBe(1);
    expect(m.pendingInvoices).toBe(1);
    expect(m.queue.map(v => v.id)).toEqual(['c', 'b']);
  });

  it('shows no change figure when yesterday had no revenue', () => {
    expect(dashboardMetrics({ invoices: [{ status: 'paid', totalAmount: 10, createdAt: TODAY }] }, TODAY).revenueChange).toBeNull();
  });
});

describe('clientMetrics and visitMetrics', () => {
  it('counts by the actual month and day', () => {
    const clients = [
      { id: 'c1', createdAt: TODAY, pets: [] },
      { id: 'c2', createdAt: '2026-09-02' },
      { id: 'c3', createdAt: '2026-08-15' },
      { id: 'c4', createdAt: '2025-09-15' }
    ];
    const pets = [{ id: 'p1', owners: ['c3'] }];
    expect(clientMetrics(clients, pets, TODAY)).toEqual({ total: 4, newThisMonth: 2, changeVsLastMonth: 100, newToday: 1, withPets: 1 });

    const visits = [
      { date: TODAY, state: 'completed' },
      { date: TODAY, state: 'scheduled' },
      { date: '2026-10-02', state: 'scheduled' },
      { date: '2026-08-02', state: 'completed' }
    ];
    expect(visitMetrics(visits, TODAY)).toEqual({ total: 4, thisMonth: 2, completedToday: 1, upcoming: 2 });
  });
});

describe('analytics', () => {
  it('builds the period and the previous period of the same length', () => {
    expect(analyticsRange('This month', TODAY)).toEqual({ from: '2026-09-01', to: TODAY, previousFrom: '2026-08-09', previousTo: '2026-08-31' });
    expect(analyticsRange('Year to date', TODAY).from).toBe('2026-01-01');
    expect(analyticsRange('Last 3 months', TODAY).from).toBe('2026-06-23');
  });

  it('computes KPIs for the period and doctor', () => {
    const range = analyticsRange('This month', TODAY);
    const m = analyticsMetrics({
      visits: [
        { petId: 'p1', clientId: 'c1', date: '2026-09-05', state: 'completed', doctorName: 'Dr. A' },
        { petId: 'p1', date: '2026-09-10', state: 'completed', doctorName: 'Dr. A' },
        { petId: 'p2', date: '2026-09-11', state: 'cancelled', doctorName: 'Dr. B' },
        { petId: 'p2', date: '2026-09-12', state: 'scheduled', doctorName: 'Dr. B' },
        { petId: 'p1', date: '2026-08-12', state: 'completed', doctorName: 'Dr. A' }
      ],
      pets: [{ id: 'p1', owners: ['c1'], createdAt: '2026-09-05' }, { id: 'p2', owners: ['c2'], createdAt: '2026-01-01' }],
      clients: [{ id: 'c1', createdAt: '2026-09-05' }, { id: 'c2', createdAt: '2026-01-01' }],
      invoices: [
        { status: 'paid', totalAmount: 1000, createdAt: '2026-09-05', items: [{ type: 'service', quantity: 2 }, { type: 'product', quantity: 5 }] },
        { status: 'cancelled', totalAmount: 500, createdAt: '2026-09-06', items: [{ type: 'service', quantity: 9 }] },
        { status: 'paid', totalAmount: 500, createdAt: '2026-08-20' }
      ],
      expenses: [{ amount: 300, date: '2026-09-02' }, { amount: 999, date: '2026-08-02' }]
    }, range);

    expect(m).toMatchObject({
      revenue: 1000, revenueChange: 100, visits: 4, completionRate: 50, cancelledVisits: 1,
      newClients: 1, totalClients: 2, newPets: 1, expenses: 300, profit: 700,
      servicesSold: 2, returningClients: 1, avgRevenuePerVisit: 500
    });

    const drA = analyticsMetrics({ visits: [{ date: '2026-09-05', state: 'completed', doctorName: 'Dr. A' }, { date: '2026-09-06', state: 'completed', doctorName: 'Dr. B' }] }, { ...range, doctor: 'Dr. A' });
    expect(drA.visits).toBe(1);
  });
});
