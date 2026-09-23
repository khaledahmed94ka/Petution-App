import React from 'react';
import { Bell, CheckCheck, Menu, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header = ({ onMenuToggle }) => {
  const { 
    settings, 
    notifications, 
    markAllNotificationsRead, 
    showNotifications, 
    setShowNotifications,
    isDemo,
    syncError,
    dismissSyncError
  } = useApp();

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

