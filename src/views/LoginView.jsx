import React, { useState } from 'react';
import { Mail, Lock, User, Building, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LoginView = () => {
  const { loginWithEmail, loginWithProvider, signup } = useApp();
  const [mode, setMode] = useState('login'); // 'login' | 'signup'

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [clinicName, setClinicName] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      if (!email.trim() || !password) {
        return alert('Please enter both email and password.');
      }
      loginWithEmail(email, password);
    } else {
      if (!name.trim() || !email.trim() || !password) {
        return alert('Please fill in all required fields.');
      }
      signup(name, email, password, clinicName || 'My Petution Clinic');
    }
  };

  const handleDemoLogin = () => {
    loginWithEmail('khaledahmed94.ka@gmail.com', 'demo123');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card card">
        {/* Header / Logo */}
        <div className="auth-header">
          <div className="auth-logo-circle">
            <span>🐾</span>
          </div>
          <h2>Welcome to Petution</h2>
          <p className="text-muted text-xs">
            {mode === 'login' 
              ? 'Sign in to access your veterinary clinic workspace' 
              : 'Register your clinic workspace in 30 seconds'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="auth-tabs">
          <button 
            className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
            onClick={() => setMode('login')}
          >
            Sign In
          </button>
          <button 
            className={`auth-tab-btn ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => setMode('signup')}
          >
            Create Account
          </button>
        </div>

        {/* Social Authentication Buttons */}
        <div className="social-auth-group">
          <button 
            className="social-btn google-btn"
            onClick={() => loginWithProvider('google')}
          >
            <svg className="social-icon" viewBox="0 0 24 24" width="18" height="18">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <button 
            className="social-btn apple-btn"
            onClick={() => loginWithProvider('apple')}
          >
            <svg className="social-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.36c.64-.78 1.08-1.85.96-2.93-.93.04-2.06.62-2.73 1.4-.59.68-1.1 1.77-.96 2.84 1.05.08 2.09-.53 2.73-1.31"/>
            </svg>
            <span>Continue with Apple</span>
          </button>
        </div>

        <div className="auth-divider">
          <span>OR WITH EMAIL</span>
        </div>

        {/* Email Form */}
        <form onSubmit={handleEmailSubmit} className="auth-form">
          {mode === 'signup' && (
            <>
              <div className="form-group">
                <label>Your Name *</label>
                <div className="input-with-icon">
                  <User size={16} className="input-icon" />
                  <input 
                    type="text" 
                    className="form-control"
                    placeholder="Dr. Khaled ElGendy"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Clinic Name</label>
                <div className="input-with-icon">
                  <Building size={16} className="input-icon" />
                  <input 
                    type="text" 
                    className="form-control"
                    placeholder="Petution Vet Center"
                    value={clinicName}
                    onChange={(e) => setClinicName(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email Address *</label>
            <div className="input-with-icon">
              <Mail size={16} className="input-icon" />
              <input 
                type="email" 
                className="form-control"
                placeholder="name@clinic.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="flex justify-between items-center">
              <label style={{ marginBottom: 0 }}>Password *</label>
              {mode === 'login' && (
                <button 
                  type="button" 
                  className="text-xs text-teal font-semibold"
                  onClick={() => alert('Password reset link sent to your email.')}
                >
                  Forgot?
                </button>
              )}
            </div>
            <div className="input-with-icon margin-top-xs">
              <Lock size={16} className="input-icon" />
              <input 
                type="password" 
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full margin-top-md">
            {mode === 'login' ? 'Sign In to Workspace' : 'Create Clinic Workspace'}
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Quick Demo Login Option */}
        <div className="demo-box margin-top-lg">
          <div className="flex justify-between items-center">
            <div>
              <span className="font-bold text-xs flex items-center gap-xs text-teal">
                <ShieldCheck size={14} /> Quick Demo Access
              </span>
              <p className="text-xs text-muted">Test live clinic workspace instantly</p>
            </div>
            <button className="btn-secondary text-xs" onClick={handleDemoLogin}>
              ⚡ Demo Login
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .auth-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0f172a 0%, #0d9488 100%);
          padding: 20px;
        }

        .auth-card {
          width: 100%;
          max-width: 420px;
          background: #ffffff;
          border-radius: var(--radius-lg);
          padding: 32px 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .auth-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .auth-logo-circle {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: var(--primary-teal-light);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
          margin: 0 auto 12px;
        }

        .auth-header h2 {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-main);
        }

        .auth-tabs {
          display: flex;
          background: #f1f5f9;
          padding: 4px;
          border-radius: var(--radius-md);
          margin-bottom: 20px;
        }

        .auth-tab-btn {
          flex: 1;
          padding: 8px 0;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
          background: transparent;
          border: none;
          border-radius: var(--radius-sm);
          transition: all 0.15s ease;
        }

        .auth-tab-btn.active {
          background: #ffffff;
          color: var(--primary-teal);
          box-shadow: var(--shadow-sm);
        }

        .social-auth-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 10px 16px;
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          font-weight: 600;
          background: #ffffff;
          border: 1px solid var(--border-card);
          color: var(--text-main);
          transition: all 0.15s ease;
          cursor: pointer;
        }

        .social-btn:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }

        .auth-divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 16px 0;
        }

        .auth-divider::before, .auth-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid var(--border-card);
        }

        .auth-divider span {
          padding: 0 10px;
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-light);
          letter-spacing: 0.05em;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
        }

        .input-with-icon .form-control {
          padding-left: 36px;
        }

        .demo-box {
          background: #f8fafc;
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          padding: 12px 16px;
        }

        .w-full { width: 100%; justify-content: center; }
      `}</style>
    </div>
  );
};
