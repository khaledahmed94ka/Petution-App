import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

// Shown instead of silently opening a different patient's record.
export const RecordNotFoundDrawer = ({ title, message }) => {
  const { setActiveDrawer } = useApp();

  return (
    <div className="drawer-backdrop" onClick={() => setActiveDrawer(null)}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <h3 className="flex items-center gap-xs">
              <AlertTriangle size={20} className="text-rose" /> {title}
            </h3>
            <p>{message}</p>
          </div>
          <button className="icon-btn" onClick={() => setActiveDrawer(null)}>
            <X size={18} />
          </button>
        </div>
        <div className="drawer-body">
          <div className="drawer-footer">
            <button className="btn-primary" onClick={() => setActiveDrawer(null)}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};
