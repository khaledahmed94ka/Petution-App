import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

const resetPassword = vi.fn();
vi.mock('../../context/AppContext', () => ({
  useApp: () => ({ resetPassword, isFirebaseConfigured: true })
}));

const { ForgotPasswordModal } = await import('./ForgotPasswordModal');

describe('ForgotPasswordModal', () => {
  it('sends a real reset request for the typed email', async () => {
    resetPassword.mockResolvedValueOnce();
    render(<ForgotPasswordModal onClose={() => {}} initialEmail=" vet@clinic.com " />);
    fireEvent.click(screen.getByRole('button', { name: /Send Reset Link/ }));
    expect(await screen.findByText('Check Your Email')).toBeTruthy();
    expect(resetPassword).toHaveBeenCalledWith('vet@clinic.com');
  });

  it('shows the error instead of pretending the email was sent', async () => {
    resetPassword.mockRejectedValueOnce({ code: 'auth/too-many-requests' });
    render(<ForgotPasswordModal onClose={() => {}} initialEmail="vet@clinic.com" />);
    fireEvent.click(screen.getByRole('button', { name: /Send Reset Link/ }));
    expect(await screen.findByRole('alert')).toBeTruthy();
    expect(screen.getByText('Too many attempts. Wait a few minutes and try again.')).toBeTruthy();
    expect(screen.queryByText('Check Your Email')).toBeNull();
  });
});
