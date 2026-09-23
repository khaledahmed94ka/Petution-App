import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

beforeEach(() => {
  if (typeof window !== 'undefined') {
    window.localStorage.clear();
    window.alert = vi.fn();
    window.confirm = vi.fn(() => true);
  }
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
