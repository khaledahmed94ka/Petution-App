// =============================================================================
// PETUTION WEB SERVER
// Serves the built app (dist/) on Render.com. Clinic data lives in Firestore;
// this server stores nothing.
// =============================================================================

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const distPath = path.join(__dirname, '../dist');

app.disable('x-powered-by');

// The prototype REST API and Shopify webhook handlers keep data in memory and have
// no authentication or webhook signature checks. They are for local development
// only and are never mounted unless explicitly switched on.
if (process.env.ENABLE_MOCK_API === 'true') {
  const [{ default: cors }, { apiRouter }, { shopifyRouter }] = await Promise.all([
    import('cors'),
    import('./routes/api.js'),
    import('./routes/shopify.js')
  ]);
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use('/api/v1', apiRouter);
  app.use('/api/webhooks/shopify', shopifyRouter);
  console.warn('⚠️  Mock API enabled (in-memory, unauthenticated). Do not use in production.');
}

app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }));

app.use(express.static(distPath));

// Single-page app: every other GET returns index.html.
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next();
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🐾 Petution web server on port ${PORT}, serving ${distPath}`);
});
