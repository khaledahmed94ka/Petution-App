import React from 'react';
import { AlertTriangle } from 'lucide-react';

// Catches a crash in one page or drawer so the rest of the app keeps working.
// Give it a `key` that changes on navigation so the next page gets a fresh start.
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info?.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;

    const { onReset, resetLabel = 'Go to Dashboard' } = this.props;
    return (
      <div className="card error-boundary-card" role="alert">
        <h3 className="flex items-center gap-xs">
          <AlertTriangle size={20} className="text-rose" /> Something went wrong on this page
        </h3>
        <p className="text-muted text-xs margin-top-xs">
          Your saved data is not affected. This is usually caused by a record with missing information.
        </p>
        <p className="text-xs margin-top-xs" style={{ fontFamily: 'monospace', color: '#9f1239' }}>
          {String(this.state.error?.message || this.state.error)}
        </p>
        <div className="flex gap-xs margin-top-md">
          {onReset && <button className="btn-primary" onClick={onReset}>{resetLabel}</button>}
          <button className="btn-secondary" onClick={() => window.location.reload()}>Reload</button>
        </div>
      </div>
    );
  }
}
