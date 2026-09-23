import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ANALYTICS_RANGES, analyticsRange, analyticsMetrics } from '../utils/metrics';

const money = (value) => `${Number(value || 0).toLocaleString('en-US', { maximumFractionDigits: 2 })} EGP`;
const percent = (value) => (value === null ? '—' : `${value}%`);
const NOT_TRACKED = 'Not tracked yet';

const formatDay = (day) => {
  const [y, m, d] = day.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const AnalyticsView = () => {
  const { visits, clients, pets, invoices, expenses = [], doctorNames } = useApp();
  const [doctorFilter, setDoctorFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('Last 3 months');

  const range = analyticsRange(timeRange);
  const m = analyticsMetrics({ visits, clients, pets, invoices, expenses }, { ...range, doctor: doctorFilter });
  const change = m.revenueChange;

  const kpis = [
    { title: 'Net revenue', value: money(m.revenue), sub: 'Paid invoices, by payment date' },
    { title: 'Total visits', value: m.visits, sub: 'Visits dated in the selected period' },
    { title: 'Completion rate', value: percent(m.completionRate), sub: 'Completed visits divided by total visits' },
    { title: 'New clients', value: m.newClients, sub: 'Clients created during this period' },
    { title: 'Total clients', value: m.totalClients, sub: 'All clients today' },
    { title: 'Total Expenses', value: money(m.expenses), sub: 'Operational costs & supplier bills' },
    { title: 'Profit estimate', value: money(m.profit), sub: 'Net revenue minus expenses' },
    { title: 'Canceled visits', value: m.cancelledVisits, sub: 'Visits cancelled in the period' },
    { title: 'New pets', value: m.newPets, sub: 'Pets created during this period' },
    { title: 'Services sold', value: m.servicesSold, sub: 'Service units on non-cancelled invoices' },
    { title: 'Returning clients', value: m.returningClients, sub: 'Clients with more than one visit in the period' },
    { title: 'Avg revenue per visit', value: m.avgRevenuePerVisit === null ? '—' : money(m.avgRevenuePerVisit), sub: 'Net revenue per completed visit' },
    { title: 'Reopen rate', value: '—', sub: NOT_TRACKED },
    { title: 'Avg time to start', value: '—', sub: NOT_TRACKED },
    { title: 'Avg time to complete', value: '—', sub: NOT_TRACKED },
    { title: 'Average rating', value: '—', sub: NOT_TRACKED },
    { title: 'Ratings volume', value: '—', sub: NOT_TRACKED },
    { title: 'Rating comment rate', value: '—', sub: NOT_TRACKED }
  ];

  return (
    <div className="analytics-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2>Analytics</h2>
          <p className="text-muted">Clinic analytics across clients, visits, revenue, operations, and doctors.</p>
        </div>
        <div className="flex gap-sm" style={{ flexWrap: 'wrap' }}>
          <select 
            className="form-control"
            value={doctorFilter}
            onChange={(e) => setDoctorFilter(e.target.value)}
            title="Filters visit numbers only; revenue and expenses are clinic-wide"
          >
            <option value="all">Doctor: all</option>
            {doctorNames.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
          <select 
            className="form-control"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            {ANALYTICS_RANGES.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Banner Card */}
      <div className="card summary-banner margin-bottom-lg">
        <span className="text-muted text-xs font-semibold">{formatDay(range.from)} - {formatDay(range.to)}</span>
        <div className="banner-metrics-row">
          <div>
            <span className="card-title">Net revenue</span>
            <div className="card-value">{money(m.revenue)}</div>
          </div>
          <div>
            <span className="card-title">Total visits</span>
            <div className="card-value">{m.visits}</div>
          </div>
          <div>
            <span className="card-title">Completion rate</span>
            <div className="card-value">{percent(m.completionRate)}</div>
          </div>
          <div>
            <span className="card-title">New clients</span>
            <div className="card-value">{m.newClients}</div>
          </div>
          <div>
            <span className="card-title">Total clients</span>
            <div className="card-value">{m.totalClients}</div>
          </div>
        </div>
        <span className="text-muted text-xs margin-top-xs">
          {change === null
            ? 'No paid revenue in the previous period to compare'
            : `Revenue ${change >= 0 ? '+' : ''}${change}% compared with the previous ${timeRange === 'This month' ? 'same number of days' : 'period of the same length'}`}
        </span>
      </div>

      {/* 18 Metrics Grid */}
      <div className="metrics-grid-16">
        {kpis.map((kpi) => (
          <div key={kpi.title} className={`card kpi-card ${kpi.sub === NOT_TRACKED ? 'kpi-untracked' : ''}`}>
            <span className="card-title">{kpi.title}</span>
            <div className="card-value">{kpi.value}</div>
            <span className="text-muted text-xs">{kpi.sub}</span>
          </div>
        ))}
      </div>

      <style>{`
        .summary-banner { padding: 16px; }
        .banner-metrics-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin: 12px 0;
        }
        .kpi-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .kpi-untracked { opacity: 0.6; }

        @media (min-width: 640px) {
          .summary-banner { padding: 24px; }
          .banner-metrics-row {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
        }

        @media (min-width: 768px) {
          .banner-metrics-row {
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
};
