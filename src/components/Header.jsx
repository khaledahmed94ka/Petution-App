import React, { useState } from 'react';
import { Bell, CheckCheck, Menu, AlertTriangle, X, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PendingInvitations } from './PendingInvitations';

export const Header = ({ onMenuToggle }) => {
  const { 
    settings, 
    notifications, 
    markAllNotificationsRead, 
    showNotifications, 
    setShowNotifications,
    isDemo,
    syncError,
    dismissSyncError,
    myInvites
  } = useApp();
  const [showInvites, setShowInvites] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
    {syncError && (
      <div className="sync-error-banner" role="alert">
        <AlertTriangle size={16} />
        <span>{syncError}</span>
        <button className="icon-btn" title="Dismiss" onClick={dismissSyncError}>
          <X size={16} />
        </button>
      </div>
    )}
    {myInvites.length > 0 && (
      <div className="invite-banner">
        <Mail size={16} />
        <span>
          {myInvites.length === 1
            ? `You're invited to join ${myInvites[0].clinicName || 'a clinic'} as ${myInvites[0].role}.`
            : `You have ${myInvites.length} clinic invitations.`}
        </span>
        <button className="btn-secondary text-xs" onClick={() => setShowInvites(true)}>Review</button>
      </div>
    )}
    {showInvites && (
      <div className="modal-overlay invites-overlay" onClick={() => setShowInvites(false)}>
        <div className="invites-modal" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center margin-bottom-sm">
            <h4>Clinic invitations</h4>
            <button className="icon-btn" onClick={() => setShowInvites(false)}><X size={18} /></button>
          </div>
          <PendingInvitations onJoined={() => setShowInvites(false)} />
        </div>
      </div>
    )}
    <header className="top-header">
      <div className="header-left">
        <button 
          className="icon-btn mobile-menu-btn" 
          title="Toggle Navigation Menu"
          onClick={onMenuToggle}
        >
          <Menu size={20} />
        </button>

        <div className="breadcrumb">
          <span className="text-muted">Petution</span>
          <span style={{ color: 'var(--text-light)' }}>/</span>
          <span className="font-semibold">{settings.orgName}</span>
          {isDemo && <span className="demo-badge" title="Demo data stays in this browser and is cleared when you exit">Demo</span>}
        </div>
      </div>

      <div className="header-actions">
        <div style={{ position: 'relative' }}>
          <button 
            className="icon-btn" 
            title="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>

          {/* Notifications Dropdown Popover */}
          {showNotifications && (
            <div className="notifications-popover">
              <div className="notif-header">
                <span className="font-semibold text-sm">Notifications</span>
                {unreadCount > 0 && (
                  <button className="text-xs text-teal font-semibold flex items-center gap-xs" onClick={markAllNotificationsRead}>
                    <CheckCheck size={14} /> Mark all read
                  </button>
                )}
              </div>
              <div className="notif-list">
                {notifications.length === 0 ? (
                  <div className="text-muted text-xs" style={{ padding: '16px', textAlign: 'center' }}>No notifications</div>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className={`notif-item ${!n.read ? 'unread' : ''}`}>
                      <div className="notif-title">{n.title}</div>
                      <div className="notif-time">{n.time}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .notifications-popover {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: calc(100vw - 24px);
          max-width: 320px;
          background: #ffffff;
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          z-index: 100;
          overflow: hidden;
        }

        .notif-header {
          padding: 12px 16px;
          border-bottom: 1px solid var(--border-card);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f8fafc;
        }

        .notif-list {
          max-height: 280px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        .notif-item {
          padding: 12px 16px;
          border-bottom: 1px solid var(--border-card);
          font-size: 0.85rem;
        }

        .notif-item.unread {
          background: var(--primary-teal-light);
        }

        .notif-title {
          font-weight: 500;
          color: var(--text-main);
        }

        .notif-time {
          font-size: 0.725rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .sync-error-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px 6px 16px;
          background: #ffe4e6;
          color: #9f1239;
          font-size: 0.82rem;
          border-bottom: 1px solid #fecdd3;
        }

        .sync-error-banner span { flex: 1; }

        .sync-error-banner .icon-btn { min-height: 32px; color: inherit; }

        .invite-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px 6px 16px;
          background: var(--primary-teal-light);
          color: var(--primary-teal);
          font-size: 0.82rem;
          border-bottom: 1px solid var(--primary-teal-border);
        }

        .invite-banner span { flex: 1; }

        .invites-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 300;
          padding: 16px;
        }

        .invites-modal {
          background: #ffffff;
          border-radius: var(--radius-lg);
          padding: 20px;
          width: 100%;
          max-width: 520px;
        }

        .demo-badge {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          background: #fef3c7;
          color: #92400e;
          padding: 2px 8px;
          border-radius: 9999px;
        }

        @media (max-width: 1023px) {
          .mobile-menu-btn {
            display: flex !important;
          }
        }

        @media (min-width: 1024px) {
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
    </>
  );
};

