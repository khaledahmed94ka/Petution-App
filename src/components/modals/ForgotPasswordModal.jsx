import React, { useState } from 'react';
import { X, Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { describeAuthError } from '../../services/firebaseAuth';

export const ForgotPasswordModal = ({ onClose, initialEmail = '' }) => {
  const { resetPassword, isFirebaseConfigured } = useApp();
  const [email, setEmail] = useState(initialEmail);
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setError('');
    setIsLoading(true);
    try {
      await resetPassword(email.trim());
      setIsSent(true);
    } catch (err) {
      setError(describeAuthError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h4>Reset Password</h4>
          <button className="close-btn" onClick={onClose}><X size={18} /></button>
        </div>

        {!isSent ? (
          <form onSubmit={handleSubmit} className="modal-body">
            <p className="text-muted text-xs margin-bottom-md">
              Enter your registered email address. We will send you a password reset link to access your clinic workspace.
            </p>

            <div className="form-group">
              <label>Work Email Address</label>
              <div className="input-with-icon">
                <Mail size={16} className="input-icon" />
                <input 
                  type="email" 
                  className="form-control"
                  placeholder="doctor@petution.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && <p className="reset-error text-xs margin-top-xs" role="alert">{error}</p>}

            <div className="modal-footer margin-top-md">
              <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn-primary" disabled={isLoading || !isFirebaseConfigured}>
                {isLoading ? 'Sending...' : 'Send Reset Link'}
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        ) : (
          <div className="modal-body text-center py-md">
            <CheckCircle2 size={48} className="text-teal margin-bottom-sm" style={{ margin: '0 auto 12px' }} />
            <h4>Check Your Email</h4>
            <p className="text-muted text-xs margin-top-xs">
              If an account exists for <strong>{email}</strong>, a password reset link is on its way. Check your inbox and spam folder.
            </p>
            <button className="btn-primary w-full margin-top-md" onClick={onClose}>
              Back to Sign In
            </button>
          </div>
        )}
      </div>

      <style>{`
        .reset-error { color: #be123c; }
        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          z-index: 9999; padding: 20px;
        }
        .modal-card {
          width: 100%; max-width: 420px; background: #ffffff;
          border-radius: 16px; padding: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .modal-header h4 { font-size: 1.15rem; font-weight: 700; color: #0f172a; }
        .close-btn { background: none; border: none; color: #94a3b8; cursor: pointer; }
        .modal-footer { display: flex; justify-content: flex-end; gap: 10px; }
        .margin-bottom-sm { margin-bottom: 8px; }
        .margin-bottom-md { margin-bottom: 16px; }
        .margin-top-md { margin-top: 16px; }
        .py-md { padding: 16px 0; }
        .text-center { text-align: center; }
      `}</style>
    </div>
  );
};
