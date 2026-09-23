import React, { useState } from 'react';
import { Building2, MailCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ROLE_LABELS } from '../data/permissions';

// Invitations addressed to the signed-in person, with accept / decline.
export const PendingInvitations = ({ onJoined }) => {
  const { myInvites, acceptInvitation, declineInvitation, checkEmailVerified, resendVerificationEmail, user } = useApp();
  const [busyId, setBusyId] = useState(null);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [message, setMessage] = useState('');

  if (!myInvites.length) return null;

  const run = async (inviteId, action) => {
    setBusyId(inviteId);
    setMessage('');
    try {
      await action();
    } catch (err) {
      if (err.code === 'needs-verification') setNeedsVerification(true);
      else setMessage(err.message || 'Something went wrong. Try again.');
    } finally {
      setBusyId(null);
    }
  };

  const accept = (invite) => run(invite.id, async () => {
    await acceptInvitation(invite);
    onJoined?.(invite);
  });

  const resend = async () => {
    try {
      await resendVerificationEmail();
      setMessage(`Verification email sent to ${user.email}.`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const recheck = async () => {
    const verified = await checkEmailVerified();
    setNeedsVerification(!verified);
    setMessage(verified ? 'Email verified. You can accept the invitation now.' : 'Not verified yet. Open the link in the email, then try again.');
  };

  return (
    <div className="pending-invites">
      {myInvites.map(invite => (
        <div key={invite.id} className="invite-card" data-testid="pending-invite">
          <Building2 size={20} className="text-teal" />
          <div className="invite-info">
            <div className="font-semibold">{invite.clinicName || 'A clinic'}</div>
            <div className="text-xs text-muted">
              {invite.invitedByName ? `${invite.invitedByName} invited you` : 'You were invited'} as {ROLE_LABELS[invite.role] || invite.role}
            </div>
          </div>
          <div className="flex gap-xs">
            <button className="btn-secondary text-xs" disabled={busyId === invite.id} onClick={() => run(invite.id, () => declineInvitation(invite))}>
              Decline
            </button>
            <button className="btn-primary text-xs" disabled={busyId === invite.id} onClick={() => accept(invite)}>
              {busyId === invite.id ? 'Joining…' : 'Accept'}
            </button>
          </div>
        </div>
      ))}

      {needsVerification && (
        <div className="invite-verify" role="alert">
          <MailCheck size={16} />
          <div>
            <div className="font-semibold text-sm">Verify your email first</div>
            <div className="text-xs">
              Invitations are matched to your email, so {user.email} must be verified. Open the link we emailed you, then check again.
            </div>
            <div className="flex gap-xs margin-top-xs">
              <button className="btn-secondary text-xs" onClick={resend}>Resend email</button>
              <button className="btn-primary text-xs" onClick={recheck}>I've verified</button>
            </div>
          </div>
        </div>
      )}

      {message && <p className="text-xs text-muted margin-top-xs">{message}</p>}

      <style>{`
        .pending-invites { display: flex; flex-direction: column; gap: 10px; }
        .invite-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          background: #ffffff;
          flex-wrap: wrap;
        }
        .invite-info { flex: 1; min-width: 160px; text-align: left; }
        .invite-verify {
          display: flex;
          gap: 10px;
          padding: 12px;
          border-radius: var(--radius-sm);
          background: #fef3c7;
          color: #92400e;
          text-align: left;
        }
      `}</style>
    </div>
  );
};
