import React, { useState } from 'react';
import { X, Mail, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ROLES, ROLE_LABELS } from '../../data/permissions';
import { invitationMailto } from '../../views/TeamView';

export const InviteMemberDrawer = () => {
  const { setActiveDrawer, inviteMember, isDemo } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Vet');
  const [created, setCreated] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return alert('Please fill in name and email address.');
    const invite = inviteMember({ name: name.trim(), email, role });
    if (invite) setCreated(invite);
  };

  return (
    <div className="drawer-backdrop" onClick={() => setActiveDrawer(null)}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <h3>Invite Team Member</h3>
            <p>They join this clinic by signing in with the invited email and accepting.</p>
          </div>
          <button className="icon-btn" onClick={() => setActiveDrawer(null)}>
            <X size={18} />
          </button>
        </div>

        {created ? (
          <div className="drawer-body">
            <div className="invite-done">
              <CheckCircle2 size={36} className="text-teal" />
              <h4>Invitation ready for {created.name}</h4>
              <p className="text-xs text-muted">
                {isDemo
                  ? 'This is the demo, so nobody can accept it.'
                  : `Ask ${created.name} to sign in to Petution with ${created.email} (verified). The invitation will be waiting for them.`}
              </p>
              {!isDemo && (
                <a className="btn-primary margin-top-sm" href={invitationMailto(created)}>
                  <Mail size={16} /> Email the invitation
                </a>
              )}
            </div>
            <div className="drawer-footer margin-top-auto">
              <button type="button" className="btn-secondary" onClick={() => setActiveDrawer(null)}>
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="drawer-body">
            <div className="form-group">
              <label>Member Full Name *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Dr. Sarah Mahmoud"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                className="form-control"
                placeholder="sarah@clinic.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Assign Role *</label>
              <select
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {ROLES.map(r => (
                  <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                ))}
              </select>
            </div>

            <div className="drawer-footer margin-top-auto">
              <button type="button" className="btn-secondary" onClick={() => setActiveDrawer(null)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Create Invitation
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        .invite-done {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 8px;
          padding: 24px 8px;
        }
      `}</style>
    </div>
  );
};
