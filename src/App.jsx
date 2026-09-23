import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';

import { LoginView } from './views/LoginView';
import { DashboardView } from './views/DashboardView';
import { ClientsView } from './views/ClientsView';
import { PetsView } from './views/PetsView';
import { VisitsView } from './views/VisitsView';
import { InvoicesView } from './views/InvoicesView';
import { ExpensesView } from './views/ExpensesView';
import { ProductsView } from './views/ProductsView';
import { AnalyticsView } from './views/AnalyticsView';
import { RemindersView } from './views/RemindersView';
import { TeamView } from './views/TeamView';
import { SettingsView } from './views/SettingsView';
import { RegisterClinicView } from './views/RegisterClinicView';

import { AddClientDrawer } from './components/drawers/AddClientDrawer';
import { AddPetDrawer } from './components/drawers/AddPetDrawer';
import { AddVisitDrawer } from './components/drawers/AddVisitDrawer';
import { AddInvoiceDrawer } from './components/drawers/AddInvoiceDrawer';
import { AddExpenseDrawer } from './components/drawers/AddExpenseDrawer';
import { AddItemDrawer } from './components/drawers/AddItemDrawer';
import { ImportModalDrawer } from './components/drawers/ImportModalDrawer';
import { InviteMemberDrawer } from './components/drawers/InviteMemberDrawer';
import { PetPassportDrawer } from './components/drawers/PetPassportDrawer';
import { AddVaccineDrawer } from './components/drawers/AddVaccineDrawer';
import { SOAPNoteDrawer } from './components/drawers/SOAPNoteDrawer';
import { StatusScreen } from './components/StatusScreen';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ClinicSetupView } from './views/ClinicSetupView';
import { ROLES, canOpenPage } from './data/permissions';
import { X, LogOut, ShieldCheck } from 'lucide-react';

export const MainApp = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const {
    user, authStatus, accountStatus, dataStatus, dataError, isDemo, logout, role, previewRole,
    activeTab, setActiveTab, activeDrawer, setActiveDrawer, activeModalItem, isEmbedded
  } = useApp();

  if (authStatus === 'loading') {
    return <StatusScreen busy title="Checking your sign-in…" />;
  }

  if (!user) {
    return <LoginView />;
  }

  if (accountStatus === 'loading') {
    return <StatusScreen busy title="Loading your clinics…" />;
  }

  if (accountStatus === 'settingUp') {
    return <StatusScreen busy title="Opening your clinic…" message="Setting things up. If you used Petution before, your records are being moved in." />;
  }

  if (accountStatus === 'needsClinic') {
    return <ClinicSetupView />;
  }

  if (accountStatus === 'error' || dataStatus === 'error') {
    return (
      <StatusScreen
        title="Couldn't load your clinic data"
        message={dataError?.code === 'permission-denied'
          ? 'The server refused access to this account\'s records. Sign out and sign in again.'
          : `Check your internet connection and try again. (${dataError?.message || 'Unknown error'})`}
      >
        <button className="btn-secondary" onClick={() => window.location.reload()}>Try again</button>
        <button className="btn-primary" onClick={logout}>Sign out</button>
      </StatusScreen>
    );
  }

  if (dataStatus !== 'ready') {
    return <StatusScreen busy title="Loading your clinic…" />;
  }

  if (isRegistering) {
    return <RegisterClinicView onComplete={() => setIsRegistering(false)} />;
  }

  const renderView = () => {
    if (!canOpenPage(role, activeTab)) {
      return (
        <div className="card" role="alert">
          <h3>You don't have access to this page</h3>
          <p className="text-muted margin-top-xs">Your role in this clinic is {role}. Ask the clinic owner if you need access.</p>
        </div>
      );
    }
    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'clients': return <ClientsView />;
      case 'pets': return <PetsView />;
      case 'visits': return <VisitsView />;
      case 'invoices': return <InvoicesView />;
      case 'expenses': return <ExpensesView />;
      case 'products': return <ProductsView />;
      case 'analytics': return <AnalyticsView />;
      case 'reminders': return <RemindersView />;
      case 'chats': return <div className="page-wrapper"><div className="card"><h3>WhatsApp Messaging Hub</h3><p className="text-muted margin-top-xs">Integrated clinic chat system ready for WhatsApp API configuration.</p></div></div>;
      case 'team': return <TeamView />;
      case 'billing': return <div className="page-wrapper"><div className="card"><h3>Billing & Subscription</h3><p className="text-muted margin-top-xs">Subscription and billing management coming soon.</p></div></div>;
      case 'settings': return <SettingsView />;
      case 'help': return <div className="page-wrapper"><div className="card"><h3>Support & Help Center</h3><p className="text-muted margin-top-xs">Search documentation or contact Petution technical support team.</p></div></div>;
      default: return <DashboardView />;
    }
  };

  return (
    <div className={`app-container ${isEmbedded ? 'embedded-mode' : ''}`}>
      {!isEmbedded && (
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onRegisterClick={() => setIsRegistering(true)}
          isMobileOpen={isMobileOpen}
          onCloseMobile={() => setIsMobileOpen(false)}
        />
      )}
      <div className="main-content" style={isEmbedded ? { marginLeft: 0, width: '100%' } : {}}>
        <Header onMenuToggle={() => setIsMobileOpen(prev => !prev)} />
        <div className="page-wrapper">
          <ErrorBoundary key={activeTab} onReset={activeTab === 'dashboard' ? null : () => setActiveTab('dashboard')}>
            {renderView()}
          </ErrorBoundary>
        </div>
      </div>

      <BottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onMenuToggle={() => setIsMobileOpen(prev => !prev)} 
      />

      {/* Render Active Slide-Over Drawers */}
      <ErrorBoundary key={activeDrawer || 'none'} onReset={() => setActiveDrawer(null)} resetLabel="Close">
      {activeDrawer === 'addClient' && <AddClientDrawer />}
      {activeDrawer === 'addPet' && <AddPetDrawer />}
      {activeDrawer === 'addVisit' && <AddVisitDrawer />}
      {activeDrawer === 'addInvoice' && <AddInvoiceDrawer visitId={activeModalItem?.invoiceForVisit} />}
      {activeDrawer === 'addExpense' && <AddExpenseDrawer />}
      {activeDrawer === 'addItem' && <AddItemDrawer />}
      {activeDrawer === 'inviteMember' && <InviteMemberDrawer />}
      {activeDrawer === 'importClients' && <ImportModalDrawer targetType="clients" />}
      {activeDrawer === 'importPets' && <ImportModalDrawer targetType="pets" />}
      {activeDrawer === 'importProducts' && <ImportModalDrawer targetType="products" />}
      {activeDrawer === 'petPassport' && <PetPassportDrawer petId={activeModalItem} />}
      {activeDrawer === 'addVaccine' && <AddVaccineDrawer petId={activeModalItem} />}
      {activeDrawer === 'soapNote' && <SOAPNoteDrawer visitId={activeModalItem} />}
      </ErrorBoundary>

      {/* User Profile Modal */}
      {activeDrawer === 'profile' && (
        <div className="drawer-backdrop" onClick={() => setActiveDrawer(null)}>
          <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div>
                <h3>User Account</h3>
                <p>Manage your login credentials, provider, and role settings.</p>
              </div>
              <button className="icon-btn" onClick={() => setActiveDrawer(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="drawer-body">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" className="form-control font-semibold" value={user.name} readOnly />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" className="form-control" value={user.email} readOnly />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Workspace Role</label>
                  <input type="text" className="form-control" value={user.role} readOnly />
                </div>
                <div className="form-group">
                  <label>Authentication Method</label>
                  <div className="form-control flex items-center gap-xs font-semibold text-xs text-teal">
                    <ShieldCheck size={14} /> {isDemo ? 'DEMO (THIS BROWSER ONLY)' : user.provider.toUpperCase()}
                  </div>
                </div>
              </div>

              {previewRole && (
                <div className="form-group">
                  <label>Demo: see the app as</label>
                  <select className="form-control" value={role} onChange={(e) => previewRole(e.target.value)}>
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <span className="text-xs text-muted">Pages and actions change to what this role may do.</span>
                </div>
              )}

              <div className="margin-top-lg border-top pt-md flex flex-col gap-sm">
                <button 
                  className="btn-secondary w-full"
                  onClick={() => {
                    setActiveDrawer(null);
                    setIsRegistering(true);
                  }}
                >
                  Switch / Register Clinic
                </button>
                <button 
                  className="btn-primary w-full bg-rose text-white"
                  style={{ background: '#e11d48', borderColor: '#e11d48' }}
                  onClick={() => {
                    setActiveDrawer(null);
                    logout();
                  }}
                >
                  <LogOut size={16} /> {isDemo ? 'Exit Demo (Clears Demo Data)' : 'Sign Out of Petution'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
