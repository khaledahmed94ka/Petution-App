import React, { useState } from 'react';
import { Building2, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PendingInvitations } from '../components/PendingInvitations';

// Shown to a signed-in person who belongs to no clinic yet: join through an
// invitation, or create their own clinic.
export const ClinicSetupView = () => {
  const { user, myInvites, createOwnClinic, setupStatus, setupError, logout } = useApp();
  const [clinicName, setClinicName] = useState('');

  const create = (e) => {
    e.preventDefault();
    createOwnClinic(clinicName.trim() || undefined);
  };

  return (
    <div className="setup-wrapper">
      <div className="setup-card">
        <div className="setup-logo">🐾</div>
        <h2>Welcome, {user.name}</h2>

        {myInvites.length > 0 && (
          <section className="setup-section">
            <h4>You've been invited</h4>
            <p className="text-xs text-muted">Join a clinic that invited {user.email}.</p>
            <PendingInvitations />
          </section>
        )}

        <section className="setup-section">
          <h4 className="flex items-center gap-xs"><Building2 size={16} /> {myInvites.length ? 'Or create your own clinic' : 'Create your clinic'}</h4>
          {setupStatus === 'error' && (
            <p className="setup-error text-xs" role="alert">
              Your clinic couldn't be set up: {setupError?.message || 'unknown error'}. Check your connection and try again.
            </p>
          )}
          <form onSubmit={create} className="flex gap-xs margin-top-xs">
            <input
              className="form-control"
              placeholder="Clinic name"
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
            />
            <button type="submit" className="btn-primary" disabled={setupStatus === 'working'}>
              {setupStatus === 'working' ? 'Creating…' : 'Create Clinic'}
            </button>
          </form>
        </section>

        <button className="btn-secondary text-xs margin-top-md" onClick={logout}>
          <LogOut size={14} /> Sign out
        </button>
      </div>

      <style>{`
        .setup-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(135deg, #0f172a 0%, #0d9488 100%);
        }
        .setup-card {
          background: #ffffff;
          border-radius: var(--radius-lg);
          padding: 28px 24px;
          width: 100%;
          max-width: 520px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
        .setup-logo { font-size: 1.75rem; }
        .setup-card h2 { font-size: 1.3rem; margin: 6px 0 12px; }
        .setup-section {
          text-align: left;
          border-top: 1px solid var(--border-card);
          padding-top: 14px;
          margin-top: 14px;
        }
        .setup-section h4 { font-size: 0.95rem; margin-bottom: 4px; }
        .setup-error { color: #be123c; margin-top: 6px; }
      `}</style>
    </div>
  );
};
