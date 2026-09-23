import React from 'react';

// Full-page message shown while signing in / loading, or when loading failed.
export const StatusScreen = ({ title, message, children, busy = false }) => (
  <div className="status-screen">
    <div className="status-card">
      <div className="status-logo">🐾</div>
      {busy && <div className="status-spinner" aria-hidden="true" />}
      <h3>{title}</h3>
      {message && <p className="text-muted text-xs">{message}</p>}
      {children && <div className="status-actions">{children}</div>}
    </div>

    <style>{`
      .status-screen {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg-app);
        padding: 20px;
      }
      .status-card {
        background: #ffffff;
        border: 1px solid var(--border-card);
        border-radius: var(--radius-lg);
        padding: 32px 24px;
        max-width: 420px;
        width: 100%;
        text-align: center;
        box-shadow: var(--shadow-md);
      }
      .status-logo { font-size: 1.75rem; margin-bottom: 8px; }
      .status-card h3 { font-size: 1.05rem; margin-bottom: 6px; }
      .status-actions { display: flex; gap: 8px; justify-content: center; margin-top: 16px; flex-wrap: wrap; }
      .status-spinner {
        width: 22px;
        height: 22px;
        margin: 4px auto 12px;
        border: 3px solid var(--primary-teal-light);
        border-top-color: var(--primary-teal);
        border-radius: 50%;
        animation: status-spin 0.7s linear infinite;
      }
      @keyframes status-spin { to { transform: rotate(360deg); } }
    `}</style>
  </div>
);
