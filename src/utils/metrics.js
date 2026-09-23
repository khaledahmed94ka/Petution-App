// Clinic numbers shown on the Dashboard, Clients, Visits and Analytics pages.
// All dates are local YYYY-MM-DD strings, so plain string comparison orders them.
import { todayLocal } from './ids';

const parseDay = (day) => {
  const [y, m, d] = String(day).split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const addDays = (day, days) => {
  const date = parseDay(day);
  date.setDate(date.getDate() + days);
  return todayLocal(date);
};

export const addMonths = (day, months) => {
  const date = parseDay(day);
  const target = new Date(date.getFullYear(), date.getMonth() + months, 1);
  const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  target.setDate(Math.min(date.getDate(), lastDay));
  return todayLocal(target);
};

export const monthOf = (day) => String(day || '').slice(0, 7);

const total = (list, pick) => list.reduce((sum, item) => sum + (Number(pick(item)) || 0), 0);
const round = (value) => Math.round(value * 100) / 100;

// null when there is nothing to compare against (shown as a dash, not "0%").
export const percentChange = (current, previous) =>
  previous > 0 ? Math.round(((current - previous) / previous) * 100) : null;

// Paid revenue counts on the day it was paid; older invoices only have a creation date.
const paidDay = (invoice) => invoice.paidAt || invoice.createdAt;
export const paidRevenueBetween = (invoices, from, to) =>
  round(total(invoices.filter(i => i.status === 'paid' && paidDay(i) >= from && paidDay(i) <= to), i => i.totalAmount));

// "08:00 PM", "9:30 am" or "14:15" -> minutes after midnight; unreadable times sort last.
export const timeToMinutes = (time) => {
  const match = /(\d{1,2}):(\d{2})\s*(AM|PM)?/i.exec(String(time || ''));
  if (!match) return 24 * 60;
  let hours = Number(match[1]);
  const period = match[3]?.toUpperCase();
  if (period === 'AM' && hours === 12) hours = 0;
  if (period === 'PM' && hours !== 12) hours += 12;
  return hours * 60 + Number(match[2]);
};

const ownerOfVisit = (visit, pets) => visit.clientId || pets.find(p => p.id === visit.petId)?.owners?.[0] || null;

export const dashboardMetrics = ({ visits = [], invoices = [], products = [], reminders = [] }, today = todayLocal()) => {
  const yesterday = addDays(today, -1);
  const monthAgo = addDays(today, -30);
  const weekAhead = addDays(today, 7);
  const active = visits.filter(v => v.state !== 'cancelled');

  // A visit is "recurring" when the same pet had a visit on an earlier day.
  const firstVisitDay = {};
  active.forEach(v => {
    if (v.date && (!firstVisitDay[v.petId] || v.date < firstVisitDay[v.petId])) firstVisitDay[v.petId] = v.date;
  });
  const lastMonth = active.filter(v => v.date >= monthAgo && v.date <= today);
  const recurring = lastMonth.filter(v => firstVisitDay[v.petId] < v.date).length;

  const revenueToday = paidRevenueBetween(invoices, today, today);

  return {
    revenueToday,
    revenueChange: percentChange(revenueToday, paidRevenueBetween(invoices, yesterday, yesterday)),
    visitsToday: active.filter(v => v.date === today).length,
    inProgress: visits.filter(v => v.state === 'in-progress').length,
    bookedLater: visits.filter(v => v.state === 'scheduled' && v.date > today).length,
    scheduledToday: visits.filter(v => v.state === 'scheduled' && v.date === today).length,
    recurringPercent: lastMonth.length ? Math.round((recurring / lastMonth.length) * 100) : null,
    noShows30d: visits.filter(v => v.state === 'scheduled' && v.date < today && v.date >= monthAgo).length,
    overdueReminders: reminders.filter(r => r.status === 'pending' && r.dueDate < today).length,
    upcomingReminders: reminders.filter(r => r.status === 'pending' && r.dueDate >= today && r.dueDate <= weekAhead).length,
    lowStock: products.filter(p => p.type === 'product' && Number(p.quantity) <= Number(p.alertThreshold ?? 0)).length,
    pendingInvoices: invoices.filter(i => i.status === 'pending').length,
    queue: visits
      .filter(v => v.date === today && ['scheduled', 'in-progress'].includes(v.state))
      .sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time))
  };
};

export const clientMetrics = (clients = [], pets = [], today = todayLocal()) => {
  const thisMonth = monthOf(today);
  const lastMonth = monthOf(addMonths(today, -1));
  const newThisMonth = clients.filter(c => monthOf(c.createdAt) === thisMonth).length;
  return {
    total: clients.length,
    newThisMonth,
    changeVsLastMonth: percentChange(newThisMonth, clients.filter(c => monthOf(c.createdAt) === lastMonth).length),
    newToday: clients.filter(c => c.createdAt === today).length,
    withPets: clients.filter(c => c.pets?.length || pets.some(p => p.owners?.includes(c.id))).length
  };
};

export const visitMetrics = (visits = [], today = todayLocal()) => ({
  total: visits.length,
  thisMonth: visits.filter(v => monthOf(v.date) === monthOf(today)).length,
  completedToday: visits.filter(v => v.date === today && v.state === 'completed').length,
  upcoming: visits.filter(v => v.state === 'scheduled' && v.date >= today).length
});

export const ANALYTICS_RANGES = ['This month', 'Last 3 months', 'Year to date'];

// The selected period plus the equally long period right before it.
export const analyticsRange = (option, today = todayLocal()) => {
  let from = addMonths(today, -3);
  if (option === 'This month') from = `${monthOf(today)}-01`;
  if (option === 'Year to date') from = `${today.slice(0, 4)}-01-01`;
  const days = Math.round((parseDay(today) - parseDay(from)) / 86400000) + 1;
  const previousTo = addDays(from, -1);
  return { from, to: today, previousFrom: addDays(previousTo, -(days - 1)), previousTo };
};

export const analyticsMetrics = (
  { visits = [], clients = [], pets = [], invoices = [], expenses = [] },
  { from, to, previousFrom, previousTo, doctor = 'all' }
) => {
  const inRange = (day) => Boolean(day) && day >= from && day <= to;
  const periodVisits = visits.filter(v => inRange(v.date) && (doctor === 'all' || v.doctorName === doctor));
  const completed = periodVisits.filter(v => v.state === 'completed').length;
  const revenue = paidRevenueBetween(invoices, from, to);
  const expenseTotal = round(total(expenses.filter(e => inRange(e.date)), e => e.amount));

  const visitsPerClient = {};
  periodVisits.filter(v => v.state !== 'cancelled').forEach(v => {
    const owner = ownerOfVisit(v, pets);
    if (owner) visitsPerClient[owner] = (visitsPerClient[owner] || 0) + 1;
  });

  const soldItems = invoices
    .filter(i => i.status !== 'cancelled' && inRange(i.createdAt))
    .flatMap(i => i.items || []);

  return {
    revenue,
    revenueChange: previousFrom ? percentChange(revenue, paidRevenueBetween(invoices, previousFrom, previousTo)) : null,
    visits: periodVisits.length,
    completionRate: periodVisits.length ? Math.round((completed / periodVisits.length) * 100) : null,
    cancelledVisits: periodVisits.filter(v => v.state === 'cancelled').length,
    newClients: clients.filter(c => inRange(c.createdAt)).length,
    totalClients: clients.length,
    newPets: pets.filter(p => inRange(p.createdAt)).length,
    expenses: expenseTotal,
    profit: round(revenue - expenseTotal),
    servicesSold: total(soldItems.filter(item => item.type === 'service'), item => item.quantity),
    returningClients: Object.values(visitsPerClient).filter(count => count > 1).length,
    avgRevenuePerVisit: completed ? round(revenue / completed) : null
  };
};
