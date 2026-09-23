import React, { useState } from 'react';
import { UserPlus, Search, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ROLES, ROLE_LABELS } from '../data/permissions';

// Opens the owner's email app with the invitation text (Petution doesn't send email itself).
export const invitationMailto = (invite) => {
  const appUrl = `${window.location.origin}${window.location.pathname}`;
  const subject = `Join ${invite.clinicName || 'our clinic'} on Petution`;
  const body = [
    `Hi ${invite.name || ''},`.trim(),
    '',
    `I've invited you to join ${invite.clinicName || 'our clinic'} on Petution as ${ROLE_LABELS[invite.role] || invite.role}.`,
    `Sign in at ${appUrl} with ${invite.email} (it must be this email address), then accept the invitation.`
  ].join('\n');
  return `mailto:${encodeURIComponent(invite.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const ROLE_DESCRIPTIONS = [
  { role: 'Owner', badge: 'badge-amber', title: 'Practice Owner', text: 'Everything: clinic settings, team and roles, backups, finances, inventory, and medical records.' },
  { role: 'Vet', badge: 'badge-teal', title: 'Veterinarian / Practitioner', text: 'Visits, clients and pets, invoices, and medical records: SOAP notes, prescriptions and vaccines.' },
  { role: 'Receptionist', badge: 'badge-gray', title: 'Front Desk Staff', text: 'Clients and pets, visit queue, appointments, invoices and reminders. Can read medical records but not edit them.' },
  { role: 'Admin', badge: 'badge-gray', title: 'Billing Admin', text: 'Products, prices and stock, invoices, expenses and analytics. Can read medical records but not edit them.' }
];

export const TeamView = () => {
  const {
    team,
    invitations,
    user,
    founderUid,
    can,
    isDemo,
    setActiveDrawer,
    updateMemberRole,
    removeMember,
    cancelInvitation
  } = useApp();
  const canManage = can('manageTeam');

  const [activeTab, setActiveTab] = useState('members');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredMembers = team.filter(m => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = String(m.name || '').toLowerCase().includes(term) || String(m.email || '').toLowerCase().includes(term);
    const matchesRole = roleFilter === 'all' || String(m.role || '').toLowerCase() === roleFilter.toLowerCase();
    return matchesSearch && matchesRole;
  });

  const handleRoleChange = (member, newRole) => {
    if (newRole !== member.role && window.confirm(`Change ${member.name}'s role to ${newRole}?`)) {
      updateMemberRole(member.id, newRole);
    }
  };

  const handleRemoveMember = (member) => {
    if (window.confirm(`Remove ${member.name} from the clinic? They lose access immediately.`)) {
      removeMember(member.id);
    }
  };

  return (
    <div className="team-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2>Team</h2>
          <p className="text-muted">
            {canManage ? 'Invite people, set their roles, and remove access.' : 'People who work in this clinic. Only owners can change the team.'}
          </p>
        </div>
        {canManage && (
          <button className="btn-primary" onClick={() => setActiveDrawer('inviteMember')}>
            <UserPlus size={18} />
            Invite member
          </button>
        )}
      </div>

      <div className="table-container">
        <div className="table-controls-stack">
          {/* Tabs Nav */}
          <div className="tab-nav">
            <button 
              className={`tab-btn ${activeTab === 'members' ? 'active' : ''}`}
              onClick={() => setActiveTab('members')}
            >
              Members ({team.length})
            </button>
            {canManage && (
              <button 
                className={`tab-btn ${activeTab === 'invitations' ? 'active' : ''}`}
                onClick={() => setActiveTab('invitations')}
              >
                Invitations ({invitations.length})
              </button>
            )}
            <button 
              className={`tab-btn ${activeTab === 'roles' ? 'active' : ''}`}
              onClick={() => setActiveTab('roles')}
            >
              Roles & Permissions
            </button>
          </div>

          {activeTab === 'members' && (
            <div className="controls-row margin-top-sm flex justify-between align-center">
              <div className="search-input-wrapper">
                <Search size={16} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search member" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select 
                className="form-control max-w-xs"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">Role: all</option>
                {ROLES.map(r => <option key={r} value={r.toLowerCase()}>{r}</option>)}
              </select>
            </div>
          )}
        </div>

        {/* Members Tab */}
        {activeTab === 'members' && (
          <table className="data-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.length === 0 ? (
                <tr><td colSpan="3" className="empty-state">No team members found matching filter.</td></tr>
              ) : (
                filteredMembers.map(member => {
                  const isSelf = member.id === user?.id;
                  const isFounder = member.id === founderUid;
                  const editable = canManage && !isSelf && !isFounder;
                  return (
                    <tr key={member.id}>
                      <td>
                        <div className="member-cell">
                          <div className="avatar-circle">{String(member.name || '?').split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2)}</div>
                          <div>
                            <div className="font-semibold">
                              {member.name}{isSelf ? ' (you)' : ''}
                            </div>
                            <div className="text-muted text-xs">{member.email}{isFounder ? ' • created this clinic' : ''}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {editable ? (
                          <select
                            className="form-control role-select"
                            aria-label={`Role for ${member.name}`}
                            value={member.role}
                            onChange={(e) => handleRoleChange(member, e.target.value)}
                          >
                            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                          </select>
                        ) : (
                          <span className={`badge ${
                            member.role === 'Owner' ? 'badge-amber' :
                            member.role === 'Vet' ? 'badge-teal' : 'badge-gray'
                          }`}>
                            {member.role}
                          </span>
                        )}
                      </td>
                      <td>
                        {editable ? (
                          <button className="btn-secondary text-xs text-red" onClick={() => handleRemoveMember(member)}>
                            Remove
                          </button>
                        ) : <span className="text-xs text-muted">—</span>}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}

        {/* Invitations Tab */}
        {activeTab === 'invitations' && canManage && (
          <>
            <p className="text-xs text-muted invite-help">
              {isDemo
                ? 'In the demo, invitations are only examples.'
                : 'Invited people join by signing in to Petution with the invited email (verified) and accepting. Petution does not send the email for you: use "Email invitation" to send it from your own email app.'}
            </p>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Recipient Name</th>
                  <th>Email</th>
                  <th>Invited Role</th>
                  <th>Sent Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {invitations.length === 0 ? (
                  <tr><td colSpan="5" className="empty-state">No pending team invitations.</td></tr>
                ) : (
                  invitations.map(inv => (
                    <tr key={inv.id}>
                      <td className="font-semibold">{inv.name}</td>
                      <td>{inv.email}</td>
                      <td><span className="badge badge-teal">{inv.role}</span></td>
                      <td className="text-muted">{inv.sentAt}</td>
                      <td>
                        <div className="flex gap-xs">
                          <a className="btn-secondary text-xs" href={invitationMailto(inv)}>
                            <Mail size={14} /> Email invitation
                          </a>
                          <button className="btn-secondary text-xs text-red" onClick={() => cancelInvitation(inv.id)}>
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </>
        )}

        {/* Roles & Permissions Tab */}
        {activeTab === 'roles' && (
          <div className="roles-grid p-lg">
            {ROLE_DESCRIPTIONS.map(item => (
              <div key={item.role} className="card role-card">
                <div className="role-card-header">
                  <span className={`badge ${item.badge}`}>{item.role}</span>
                  <h4 className="font-bold margin-top-xs">{item.title}</h4>
                </div>
                <p className="text-xs text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .member-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .max-w-xs { max-width: 160px; }
        .justify-between { justify-content: space-between; }
        .align-center { align-items: center; }
        .controls-row { display: flex; gap: 16px; align-items: center; }
        .tab-nav {
          display: flex;
          gap: 12px;
          border-bottom: 1px solid var(--border-card);
          margin-top: 8px;
        }
        .tab-btn {
          padding: 8px 16px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-muted);
          border-bottom: 2px solid transparent;
        }
        .tab-btn.active {
          color: var(--primary-teal);
          border-bottom-color: var(--primary-teal);
        }
        .roles-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          padding: 24px;
        }
        .role-card {
          padding: 20px;
        }
        .p-lg { padding: 24px; }
        .role-select { max-width: 160px; }
        .invite-help { padding: 12px 20px 0; }
      `}</style>
    </div>
  );
};
