import { defineConfig, devices } from '@playwright/test';

// `demo` runs everywhere: a build with no Firebase settings, exercised in demo mode.
// `cloud` needs the Firebase emulators (npm run test:emulator sets E2E_EMULATOR=true).
const withEmulator = process.env.E2E_EMULATOR === 'true';

const noFirebase = {
  VITE_FIREBASE_API_KEY: '',
  VITE_FIREBASE_PROJECT_ID: '',
  VITE_USE_FIREBASE_EMULATORS: ''
};

const emulatorFirebase = {
  VITE_FIREBASE_API_KEY: 'demo-key',
  VITE_FIREBASE_AUTH_DOMAIN: 'demo-petution.firebaseapp.com',
  VITE_FIREBASE_PROJECT_ID: process.env.GCLOUD_PROJECT || 'demo-petution',
  VITE_FIREBASE_APP_ID: 'demo-app',
  VITE_USE_FIREBASE_EMULATORS: 'true'
};

const server = (outDir, port, env) => ({
  command: `npx vite build --outDir ${outDir} --emptyOutDir && npx vite preview --outDir ${outDir} --port ${port} --strictPort`,
  url: `http://127.0.0.1:${port}`,
  env: { ...process.env, ...env },
  reuseExistingServer: false,
  timeout: 120000
});

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60000,
  expect: { timeout: 10000 },
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    ...devices['Desktop Chrome'],
    viewport: { width: 1280, height: 900 },
    trace: 'retain-on-failure'
  },
  projects: [
    { name: 'demo', testMatch: 'demo.spec.js', use: { baseURL: 'http://127.0.0.1:4173' } },
    ...(withEmulator
      ? [{ name: 'cloud', testMatch: 'cloud.spec.js', use: { baseURL: 'http://127.0.0.1:4174' } }]
      : [])
  ],
  webServer: [
    server('dist-e2e', 4173, noFirebase),
    ...(withEmulator ? [server('dist-e2e-cloud', 4174, emulatorFirebase)] : [])
  ]
});
