import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 3000,
    open: true
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{js,jsx}', 'tests/rules/**/*.test.js'],
    setupFiles: ['./src/test/setup.js'],
    // Unit tests never talk to a real Firebase project, whatever a local .env says.
    env: {
      VITE_FIREBASE_API_KEY: '',
      VITE_FIREBASE_PROJECT_ID: ''
    }
  }
});
