// @vitest-environment node
// Checks firestore.rules against the Firestore + Auth emulators.
// Run with `npm run test:emulator` (needs Java). Skipped when the emulators aren't running.
import { describe, it, expect, beforeAll } from 'vitest';

const firestoreHost = process.env.FIRESTORE_EMULATOR_HOST;
const authHost = process.env.FIREBASE_AUTH_EMULATOR_HOST;
const projectId = process.env.GCLOUD_PROJECT || 'demo-petution';

const FIRESTORE = `http://${firestoreHost}/v1/projects/${projectId}/databases/(default)/documents`;
const SIGN_UP = `http://${authHost}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=demo-key`;

const signUp = async (label) => {
  const response = await fetch(SIGN_UP, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: `${label}-${Date.now()}@example.com`, password: 'secret123', returnSecureToken: true })
  });
  const body = await response.json();
  return { uid: body.localId, token: body.idToken };
};

const request = async (method, path, token, fields) => {
  const response = await fetch(`${FIRESTORE}/${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: fields ? JSON.stringify({ fields }) : undefined
  });
  return response.status;
};

const secret = { name: { stringValue: 'Private client' } };

describe.skipIf(!firestoreHost || !authHost)('firestore.rules', () => {
  let alice;
  let bob;

  beforeAll(async () => {
    alice = await signUp('alice');
    bob = await signUp('bob');
  });

  it('lets a user read and write their own clinic', async () => {
    expect(await request('PATCH', `users/${alice.uid}/clients/c1`, alice.token, secret)).toBe(200);
    expect(await request('GET', `users/${alice.uid}/clients/c1`, alice.token)).toBe(200);
    expect(await request('DELETE', `users/${alice.uid}/clients/c1`, alice.token)).toBe(200);
  });

  it('blocks reading or writing another user\'s clinic', async () => {
    await request('PATCH', `users/${alice.uid}/clients/c2`, alice.token, secret);
    expect(await request('GET', `users/${alice.uid}/clients/c2`, bob.token)).toBe(403);
    expect(await request('PATCH', `users/${alice.uid}/clients/c3`, bob.token, secret)).toBe(403);
    expect(await request('DELETE', `users/${alice.uid}/clients/c2`, bob.token)).toBe(403);
  });

  it('blocks visitors who are not signed in, including the old shared usr-1 path', async () => {
    expect(await request('GET', `users/${alice.uid}/clients/c2`, null)).toBe(403);
    expect(await request('PATCH', 'users/usr-1/clients/x', null, secret)).toBe(403);
  });

  it('keeps everything outside users/{uid} closed', async () => {
    expect(await request('PATCH', 'shared/x', alice.token, secret)).toBe(403);
  });
});
