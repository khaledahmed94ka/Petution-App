import React from 'react';
import { 
  PlusCircle, 
  UserPlus, 
  Dog, 
  MessageCircle, 
  ArrowRight, 
  AlertCircle, 
  Clock, 
  CalendarCheck, 
  Receipt,
  GripVertical
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DashboardView = () => {
  const { clients, pets, visits, invoices, setActiveDrawer, setActiveTab } = useApp();

  const totalRevenue = invoices
    .filter(i => i.status === 'paid')
    .reduce((sum, i) => sum + i.totalAmount, 0);

  return (
    <div className="dashboard-page">
      {/* Greeting Header */}
      <div className="greeting-header">
        <h2>Good evening, Khaled ElGendy <span className="hand-wave">👋</span> <span className="owner-badge">Owner</span></h2>
        <p className="text-muted">Here's your clinic pulse for today.</p>
      </div>

      {/* Revenue Hero Banner */}
      <div className="revenue-banner">
        <div className="revenue-info">
          <span className="banner-sub">TODAY'S REVENUE</span>
          <h1 className="banner-amount">{totalRevenue} EGP</h1>
          <span className="banner-change">+0% vs yesterday</span>
        </div>
        <button className="view-all-btn" onClick={() => setActiveTab('visits')}>
          View All Visits <ArrowRight size={16} />
        </button>
      </div>

      {/* Clinic Pulse Metrics Grid (7 KPI Cards) */}
      <div className="section-title">
        <h3>Clinic Pulse</h3>
        <p className="text-muted">Live overview of what matters most</p>
      </div>

      <div className="metrics-grid-7">
        <div className="card pulse-card">
          <span className="card-val">{visits.length}</span>
          <span className="card-lbl">Visits Today</span>
        </div>
        <div className="card pulse-card">
          <span className="card-val">{visits.filter(v => v.state === 'in-progress').length}</span>
          <span className="card-lbl">In Progress</span>
        </div>
        <div className="card pulse-card">
          <span className="card-val">0</span>
          <span className="card-lbl">Booked Not Today</span>
        </div>
        <div className="card pulse-card">
          <span className="card-val">{visits.filter(v => v.state === 'scheduled').length}</span>
          <span className="card-lbl">Scheduled Queue</span>
        </div>
        <div className="card pulse-card">
          <span className="card-val">0%</span>
          <span className="card-lbl">% Recurring</span>
        </div>
        <div className="card pulse-card">
          <span className="card-val">—</span>
          <span className="card-lbl">Avg Rating (30d)</span>
        </div>
        <div className="card pulse-card">
          <span className="card-val">0</span>
          <span className="card-lbl">No Show</span>
        </div>
      </div>

      {/* Attention Alert Cards (4 Gradient Cards) */}
      <div className="section-title">
        <h3>Tasks need your attention</h3>
      </div>

      <div className="alert-cards-grid">
        <div className="alert-card grad-amber" onClick={() => setActiveTab('clients')}>
          <div className="alert-content">
            <span className="alert-val">0</span>
            <span className="alert-lbl">Need action</span>
          </div>
          <ArrowRight size={18} className="alert-arrow" />
        </div>
        <div className="alert-card grad-rose" onClick={() => setActiveTab('products')}>
          <div className="alert-content">
            <span className="alert-val">0</span>
            <span className="alert-lbl">Low stock products</span>
          </div>
          <ArrowRight size={18} className="alert-arrow" />
        </div>
        <div className="alert-card grad-teal" onClick={() => setActiveTab('visits')}>
          <div className="alert-content">
            <span className="alert-val">0</span>
            <span className="alert-lbl">Upcoming Follow-ups</span>
          </div>
          <ArrowRight size={18} className="alert-arrow" />
        </div>
        <div className="alert-card grad-rose" onClick={() => setActiveTab('invoices')}>
          <div className="alert-content">
            <span className="alert-val">{invoices.filter(i => i.status === 'pending').length}</span>
            <span className="alert-lbl">Invoices</span>
          </div>
          <ArrowRight size={18} className="alert-arrow" />
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="shortcuts-row">
        <button className="shortcut-btn" onClick={() => setActiveDrawer('addVisit')}>
          <PlusCircle size={20} className="text-teal" />
          <span>New Visit</span>
        </button>
        <button className="shortcut-btn" onClick={() => setActiveDrawer('addClient')}>
          <UserPlus size={20} className="text-teal" />
          <span>Add Client</span>
        </button>
        <button className="shortcut-btn" onClick={() => setActiveDrawer('addPet')}>
          <Dog size={20} className="text-teal" />
          <span>Add Pet</span>
        </button>
        <button className="shortcut-btn" onClick={() => window.open('https://wa.me/', '_blank')}>
          <MessageCircle size={20} className="text-green" />
          <span>WhatsApp</span>
        </button>
      </div>

      {/* Visit Queues */}
      <div className="card queue-card">
        <div className="queue-header">
          <div>
            <h4>Visit Queue</h4>
            <p className="text-muted">Drag and drop to reorder instantly.</p>
          </div>
        </div>
        {visits.filter(v => v.state === 'scheduled').length === 0 ? (
          <div className="empty-state">No scheduled visits in queue.</div>
        ) : (
          <div className="queue-list">
            {visits.filter(v => v.state === 'scheduled').map(v => (
              <div key={v.id} className="queue-item">
                <GripVertical size={16} className="text-light" />
                <span className="font-semibold">{pets.find(p => p.id === v.petId)?.name || 'Pet'}</span>
                <span className="text-muted">{v.visitType}</span>
                <span className="badge badge-teal">{v.state}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .greeting-header h2 {
          font-size: 1.2rem;
          font-weight: 700;
          line-height: 1.4;
        }

        .owner-badge {
          font-size: 0.7rem;
          background: #f1f5f9;
          padding: 2px 8px;
          border-radius: 9999px;
          color: var(--text-muted);
          vertical-align: middle;
        }

        .revenue-banner {
          background: var(--primary-teal);
          color: #ffffff;
          border-radius: var(--radius-lg);
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          margin: 16px 0 20px;
        }

        .banner-sub {
          font-size: 0.7rem;
          letter-spacing: 0.05em;
          opacity: 0.9;
        }

        .banner-amount {
          font-size: 1.75rem;
          font-weight: 800;
          margin: 4px 0;
        }

        .banner-change {
          font-size: 0.8rem;
          opacity: 0.9;
        }

        .view-all-btn {
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
          padding: 10px 20px;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.15s ease;
          width: 100%;
          justify-content: center;
        }

        .view-all-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .section-title {
          margin-bottom: 10px;
        }

        .section-title h3 {
          font-size: 1rem;
          font-weight: 600;
        }

        .pulse-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 12px;
          text-align: center;
        }

        .card-val {
          font-size: 1.3rem;
          font-weight: 700;
        }

        .card-lbl {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .alert-card {
          border-radius: var(--radius-md);
          padding: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }

        .grad-amber { background: var(--grad-amber); }
        .grad-rose { background: var(--grad-rose); }
        .grad-teal { background: var(--grad-teal); }

        .alert-val {
          font-size: 1.5rem;
          font-weight: 800;
          display: block;
        }

        .alert-lbl {
          font-size: 0.78rem;
          font-weight: 600;
          color: rgba(15, 23, 42, 0.8);
        }

        .shortcut-btn {
          background: #ffffff;
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          padding: 14px 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 600;
          font-size: 0.82rem;
          color: var(--text-main);
          box-shadow: var(--shadow-sm);
          transition: all 0.15s ease;
        }

        .shortcut-btn:hover {
          border-color: var(--primary-teal);
          transform: translateY(-1px);
        }

        .queue-card {
          margin-top: 8px;
        }

        .queue-header h4 {
          font-size: 1rem;
          font-weight: 600;
        }

        .queue-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 12px;
        }

        .queue-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          background: #f8fafc;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-card);
          font-size: 0.85rem;
          flex-wrap: wrap;
        }

        @media (min-width: 640px) {
          .greeting-header h2 {
            font-size: 1.5rem;
          }
          .revenue-banner {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 28px 32px;
          }
          .view-all-btn {
            width: auto;
          }
          .banner-amount {
            font-size: 2.25rem;
          }
          .alert-val {
            font-size: 1.75rem;
          }
          .alert-card {
            padding: 20px;
          }
          .pulse-card {
            padding: 16px;
          }
          .card-val {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};
