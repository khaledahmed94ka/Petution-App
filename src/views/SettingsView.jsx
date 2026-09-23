import React, { useState, useEffect } from 'react';
import { Camera, Download, Upload, Database, Trash2, AlertTriangle, HardDrive } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { exportSystemBackupJSON } from '../utils/dataExportImport';
import { COLLECTIONS } from '../data/collections';
import { isValidShopDomain } from '../services/shopifySync';

export const SettingsView = () => {
  const app = useApp();
  const {
    settings, setSettings, clients, pets, visits, products, invoices, expenses, vaccines, soapNotes,
    importFullBackup, deleteWorkspace, activeWorkspaceId, isDemo, workspaces,
    legacyData, importLegacyLocalData, discardLegacyLocalData
  } = app;
  const [formData, setFormData] = useState({ ...settings });
  const [activeTab, setActiveTab] = useState('Organization');
  const [shopForm, setShopForm] = useState({ shopifyShop: settings.shopifyShop, shopifySyncEnabled: settings.shopifySyncEnabled });
  const [isUploadingLegacy, setIsUploadingLegacy] = useState(false);

  useEffect(() => {
    setFormData({ ...settings });
    setShopForm({ shopifyShop: settings.shopifyShop, shopifySyncEnabled: settings.shopifySyncEnabled });
  }, [settings]);

  const tabs = [
    'Organization',
    'Tags',
    'Prescription',
    'Pre-defined Prescriptions',
    'Integrations',
    'Reminders',
    'Online Booking',
    'Data Backup & Migration'
  ];

  const handleFullExportJSON = () => {
    const fullBackup = { version: '2.0', exportedAt: new Date().toISOString(), settings };
    COLLECTIONS.filter(name => name !== 'settings').forEach(name => {
      fullBackup[name] = app[name] || [];
    });
    exportSystemBackupJSON(fullBackup, `petution_full_backup_${new Date().toISOString().split('T')[0]}.json`);
  };

  const handleFullRestoreJSON = (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        const message = `Restore "${file.name}"?\n\nRecords in the backup are added to this clinic. Records with the same ID are replaced by the backup's version. Nothing else is deleted.`;
        if (confirm(message)) importFullBackup(jsonData);
      } catch (err) {
        alert(`Failed to restore backup: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  const handleShopifySave = (e) => {
    e.preventDefault();
    const shop = shopForm.shopifyShop.trim().toLowerCase();
    if (shopForm.shopifySyncEnabled && !isValidShopDomain(shop)) {
      alert('Enter your store address in the form your-store.myshopify.com');
      return;
    }
    setSettings({ shopifyShop: shop, shopifySyncEnabled: shopForm.shopifySyncEnabled });
    alert(shopForm.shopifySyncEnabled ? 'Shopify sync is on for this clinic.' : 'Shopify sync is off.');
  };

  const handleLegacyUpload = async () => {
    setIsUploadingLegacy(true);
    const ok = await importLegacyLocalData();
    setIsUploadingLegacy(false);
    if (ok) alert('Done. The records are now saved in your account and removed from this browser.');
  };

  const handleLegacyDiscard = () => {
    if (confirm('Delete these records from this browser? They have not been uploaded to your account.')) {
      discardLegacyLocalData();
    }
  };

  const shopifyConnected = settings.shopifySyncEnabled && isValidShopDomain(settings.shopifyShop);

  const handleSave = (e) => {
    e.preventDefault();
    setSettings(formData);
    alert('Organization settings saved successfully!');
  };

  return (
    <div className="settings-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2>Settings</h2>
          <p className="text-muted">Manage organization settings and application tags.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-nav margin-bottom-lg">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'Organization' ? (
        <div className="card settings-card">
          <div className="card-header-section">
            <h4 className="font-semibold">Organization Profile</h4>
            <p className="text-xs text-muted">Manage your organization details, slug, and avatar.</p>
          </div>

          <form onSubmit={handleSave} className="settings-form">
            <div className="avatar-upload-row">
              <div className="profile-avatar-circle">
                <span>{(formData.orgName || '?').charAt(0)}</span>
                <div className="camera-overlay">
                  <Camera size={14} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Organization Name</label>
              <input 
                type="text" 
                className="form-control"
                value={formData.orgName}
                onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Slug</label>
              <input 
                type="text" 
                className="form-control"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="text" 
                className="form-control"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input 
                type="text" 
                className="form-control"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Website</label>
              <input 
                type="text" 
                className="form-control"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </div>
          </form>

          {/* Danger Zone: Delete Clinic Workspace (only the person who created it) */}
          {workspaces.find(w => w.id === activeWorkspaceId)?.isFounder && !isDemo && (
          <div className="danger-zone-card margin-top-lg">
            <h4 className="font-semibold text-rose flex items-center gap-xs">
              <AlertTriangle size={18} /> Danger Zone: Delete Clinic Workspace
            </h4>
            <p className="text-xs text-muted margin-top-xs">
              Permanently remove this active clinic workspace ("{formData.orgName}"). This action cannot be undone.
            </p>
            <div className="margin-top-sm">
              <button 
                type="button" 
                className="btn-secondary text-rose border-rose"
                style={{ borderColor: '#e11d48', color: '#e11d48' }}
                onClick={() => {
                  if (confirm(`Are you sure you want to PERMANENTLY DELETE the clinic workspace "${formData.orgName}"?`)) {
                    deleteWorkspace(activeWorkspaceId);
                  }
                }}
              >
                <Trash2 size={16} /> Delete Clinic Workspace
              </button>
            </div>
          </div>
          )}
        </div>
      ) : activeTab === 'Data Backup & Migration' ? (
        <div className="card settings-card">
          <div className="card-header-section">
            <h4 className="font-semibold flex items-center gap-xs">
              <Database size={20} className="text-teal" /> Full System Data Backup & Migration
            </h4>
            <p className="text-xs text-muted">Export complete clinic records or restore data from another clinic workspace.</p>
          </div>

          <div className="margin-top-md">
            {!isDemo && legacyData.count > 0 && (
              <div className="card info-card legacy-card margin-bottom-md">
                <h5 className="font-semibold flex items-center gap-xs">
                  <HardDrive size={16} /> Records saved only in this browser ({legacyData.count})
                </h5>
                <p className="text-xs text-muted margin-top-xs">
                  An earlier version of Petution kept records in this browser instead of your account:{' '}
                  {Object.entries(legacyData.collections).map(([name, list]) => `${list.length} ${name}`).join(', ')}.
                  Upload them to keep them, or delete them. On a shared computer they may belong to someone else.
                </p>
                <div className="margin-top-sm flex gap-xs" style={{ flexWrap: 'wrap' }}>
                  <button className="btn-primary" onClick={handleLegacyUpload} disabled={isUploadingLegacy}>
                    <Upload size={16} /> {isUploadingLegacy ? 'Uploading…' : 'Upload to My Account'}
                  </button>
                  <button className="btn-secondary" onClick={handleLegacyDiscard} disabled={isUploadingLegacy}>
                    <Trash2 size={16} /> Delete From This Browser
                  </button>
                </div>
              </div>
            )}

            <div className="card info-card margin-bottom-md">
              <h5 className="font-semibold">Full System Backup (.JSON)</h5>
              <p className="text-xs text-muted margin-top-xs">
                Downloads everything in this clinic into one file: Clients ({clients.length}), Pets ({pets.length}), Visits ({visits.length}), Products/Services ({products.length}), Invoices ({invoices.length}), Expenses ({expenses.length}), Vaccines ({vaccines.length}), SOAP Notes ({soapNotes.length}), reminders, team, stock logs, and clinic settings.
              </p>
              <div className="margin-top-sm">
                <button className="btn-primary" onClick={handleFullExportJSON}>
                  <Download size={16} /> Export Full System Backup
                </button>
              </div>
            </div>

            <div className="card info-card">
              <h5 className="font-semibold">Restore / Import System Backup (.JSON)</h5>
              <p className="text-xs text-muted margin-top-xs">
                Upload a Petution `.json` backup. Its records are merged into this clinic; records with the same ID are replaced, and nothing else is deleted.
              </p>
              <div className="margin-top-sm" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <label className="btn-secondary" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Upload size={16} /> Choose Backup File
                  <input type="file" accept=".json" onChange={handleFullRestoreJSON} className="file-input-hidden" />
                </label>
                <span className="text-xs text-muted">Supports `.json` format</span>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'Integrations' ? (
        <div className="card settings-card">
          <div className="card-header-section">
            <h4 className="font-semibold flex items-center gap-xs">
              <Database size={20} className="text-teal" /> Integrations
            </h4>
            <p className="text-xs text-muted">Connect Petution to external services and platforms.</p>
          </div>

          <div className="margin-top-md">
            <div className="card info-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h5 className="font-semibold">Shopify App Integration</h5>
                  <p className="text-xs text-muted margin-top-xs">
                    Sync your Shopify store data (customers, products, orders) to Petution in real-time and access your Dashboard directly inside Shopify.
                  </p>
                </div>
                <span className="badge" style={shopifyConnected
                  ? { background: '#dcfce7', color: '#166534' }
                  : { background: '#f1f5f9', color: 'var(--text-muted)' }}>
                  {shopifyConnected ? 'On' : 'Off'}
                </span>
              </div>

              {isDemo ? (
                <p className="text-xs text-muted margin-top-md">Shopify sync is not available in the demo.</p>
              ) : (
                <form onSubmit={handleShopifySave} className="settings-form margin-top-md">
                  <div className="form-group">
                    <label>Your Shopify store address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="your-store.myshopify.com"
                      value={shopForm.shopifyShop}
                      onChange={(e) => setShopForm({ ...shopForm, shopifyShop: e.target.value })}
                    />
                  </div>
                  <label className="flex items-center gap-xs text-sm" style={{ cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={shopForm.shopifySyncEnabled}
                      onChange={(e) => setShopForm({ ...shopForm, shopifySyncEnabled: e.target.checked })}
                    />
                    Send new clients and products from this clinic to this Shopify store
                  </label>
                  <p className="text-xs text-muted">
                    Only this clinic's records are sent, and only to the store above. Requests carry your sign-in token so the Petution sync service can check who sent them.
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn-primary">Save Integration</button>
                  </div>
                </form>
              )}

              <div className="margin-top-md" style={{ padding: '16px', background: 'var(--surface-bg)', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
                <h6 className="font-semibold margin-bottom-sm text-primary">How it works:</h6>
                <ol className="text-sm text-muted" style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', listStyleType: 'decimal' }}>
                  <li>Install the custom Shopify app <strong>Petution Reminder</strong> on your store.</li>
                  <li>It runs silently in the background, listening to real-time Webhooks from Shopify.</li>
                  <li>When a new Customer, Order, or Product is created in Shopify, the App instantly pushes that data into your Petution database.</li>
                  <li>You can use the Petution Reminders and Dashboard natively inside your Shopify Admin by clicking on the app in your Shopify sidebar.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card empty-state">
          {activeTab} configuration panel ready for customization.
        </div>
      )}

      <style>{`
        .settings-card { 
          max-width: 100%; 
        }
        .card-header-section { 
          padding-bottom: 12px; 
          margin-bottom: 16px; 
          border-bottom: 1px solid var(--border-card); 
        }
        .settings-form { 
          display: flex; 
          flex-direction: column; 
          gap: 14px; 
        }
        .avatar-upload-row { 
          display: flex; 
          justify-content: center; 
          margin-bottom: 8px; 
        }
        .profile-avatar-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          color: #475569;
          position: relative;
          cursor: pointer;
        }
        .camera-overlay {
          position: absolute;
          bottom: 2px;
          right: 2px;
          background: #ffffff;
          border: 1px solid var(--border-card);
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
        }
        .info-card {
          padding: 16px;
        }
        .legacy-card {
          border-color: #fde68a;
          background: #fffbeb;
        }

        @media (min-width: 640px) {
          .settings-card {
            max-width: 680px;
          }
          .profile-avatar-circle {
            width: 80px;
            height: 80px;
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
};
