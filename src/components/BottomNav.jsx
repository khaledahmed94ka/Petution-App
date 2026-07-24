import React from 'react';
import { LayoutDashboard, Users, Dog, Calendar, Menu } from 'lucide-react';

export const BottomNav = ({ activeTab, setActiveTab, onMenuToggle }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'pets', label: 'Pets', icon: Dog },
    { id: 'visits', label: 'Visits', icon: Calendar },
    { id: 'more', label: 'Menu', icon: Menu, isMenu: true }
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => {
              if (tab.isMenu) {
                onMenuToggle();
              } else {
                setActiveTab(tab.id);
              }
            }}
          >
            <Icon size={20} />
            <span>{tab.label}</span>
          </button>
        );
      })}

      <style>{`
        .bottom-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: #ffffff;
          border-top: 1px solid var(--border-card);
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
          z-index: 180;
          padding: 4px 8px;
        }

        .bottom-nav-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          color: var(--text-muted);
          font-size: 0.7rem;
          font-weight: 500;
          background: transparent;
          border: none;
          padding: 6px 0;
          border-radius: var(--radius-sm);
        }

        .bottom-nav-item.active {
          color: var(--primary-teal);
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .bottom-nav {
            display: flex;
          }
        }
      `}</style>
    </nav>
  );
};
