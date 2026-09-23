// Real accounts, clinics, invitations and roles, against the Firebase emulators.
import { test, expect } from '@playwright/test';
import { goTo, acceptDialogs, addClient, addPet, addVisit, setVisitState, signOut } from './helpers';

const PROJECT = process.env.GCLOUD_PROJECT || 'demo-petution';
const AUTH_EMULATOR = 'http://127.0.0.1:9099';

test.beforeEach(({ page }) => acceptDialogs(page));

const signUp = async (page, { name, clinic, email }) => {
  await page.getByRole('button', { name: 'Create Account' }).click();
  await page.getByPlaceholder('Dr. Khaled ElGendy').fill(name);
  if (clinic) await page.getByPlaceholder('Petution Vet Center').fill(clinic);
  await page.getByPlaceholder('name@clinic.com').fill(email);
  await page.getByPlaceholder('••••••••').fill('secret123');
  await page.getByRole('button', { name: 'Create Clinic Workspace' }).click();
};

const signIn = async (page, email) => {
  await page.getByPlaceholder('name@clinic.com').fill(email);
  await page.getByPlaceholder('••••••••').fill('secret123');
  await page.getByRole('button', { name: /Sign In to Workspace/ }).click();
  await expect(page.locator('.sidebar')).toBeVisible({ timeout: 20000 });
};

// Opens the verification link the Auth emulator "sent", like clicking it in the email.
const verifyEmail = async (request, email) => {
  const { oobCodes } = await (await request.get(`${AUTH_EMULATOR}/emulator/v1/projects/${PROJECT}/oobCodes`)).json();
  const code = oobCodes.filter(c => c.email === email && c.requestType === 'VERIFY_EMAIL').pop();
  expect(code, `verification email for ${email}`).toBeTruthy();
  const response = await request.get(code.oobLink);
  expect(response.ok()).toBe(true);
};

const openWorkspaceMenu = (page) => page.locator('.workspace-header').click();

test('an account keeps its data across reloads and never sees another account\'s data', async ({ page }) => {
  const stamp = Date.now();
  await page.goto('/');
  await signUp(page, { name: 'Dr. Test Vet', clinic: 'Test Clinic', email: `vet1-${stamp}@example.com` });
  await expect(page.locator('.sidebar')).toBeVisible({ timeout: 20000 });

  await expect(page.locator('.breadcrumb')).toContainText('Test Clinic');
  await expect(page.locator('.user-name')).toHaveText('Dr. Test Vet');
  await goTo(page, 'Clients');
  await expect(page.getByText('No clients found.')).toBeVisible();

  await addClient(page, 'Mona Adel');
  await addPet(page, 'Mona Adel', 'Luna');
  await addVisit(page, 'Mona Adel', 'Luna');
  await setVisitState(page, 'Luna', 'completed');

  await page.reload();
  await expect(page.locator('.sidebar')).toBeVisible({ timeout: 20000 });
  await expect(page.locator('.user-name')).toHaveText('Dr. Test Vet');
  await goTo(page, 'Visits');
  await expect(page.locator('tbody tr', { hasText: 'Luna' }).locator('.badge')).toHaveText('completed');
  await expect(page.locator('tbody tr', { hasText: 'Luna' })).toContainText('Dr. Test Vet');

  await signOut(page);
  const leftover = await page.evaluate(() => Object.keys(localStorage).filter(key => !key.startsWith('petution_active_clinic:')));
  expect(leftover).toEqual([]);

  await signUp(page, { name: 'Dr. Second', email: `vet2-${stamp}@example.com` });
  await expect(page.locator('.sidebar')).toBeVisible({ timeout: 20000 });
  await goTo(page, 'Clients');
  await expect(page.getByText('No clients found.')).toBeVisible();
  await expect(page.getByText('Mona Adel')).toHaveCount(0);
});

test('each clinic has its own records', async ({ page }) => {
  const stamp = Date.now();
  await page.goto('/');
  await signUp(page, { name: 'Dr. Two Clinics', clinic: 'Maadi Branch', email: `two-${stamp}@example.com` });
  await expect(page.locator('.sidebar')).toBeVisible({ timeout: 20000 });
  await addClient(page, 'Maadi Client');

  await openWorkspaceMenu(page);
  await page.getByRole('button', { name: /Register New Clinic/ }).click();
  await page.getByPlaceholder('e.g. Petution Vet Clinic').fill('Zayed Branch');
  await page.getByRole('button', { name: /Register & Launch/ }).click();
  await expect(page.locator('.breadcrumb')).toContainText('Zayed Branch', { timeout: 20000 });
  await goTo(page, 'Clients');
  await expect(page.getByText('No clients found.')).toBeVisible();
  await addClient(page, 'Zayed Client');

  await openWorkspaceMenu(page);
  await page.locator('.workspace-menu-item', { hasText: 'Maadi Branch' }).click();
  await expect(page.locator('.breadcrumb')).toContainText('Maadi Branch');
  await goTo(page, 'Clients');
  await expect(page.locator('tbody td', { hasText: 'Maadi Client' })).toBeVisible();
  await expect(page.getByText('Zayed Client')).toHaveCount(0);

  // The founder can delete a clinic they no longer need.
  await openWorkspaceMenu(page);
  await page.locator('.workspace-menu-item', { hasText: 'Zayed Branch' }).getByTitle('Delete Clinic Workspace').click();
  await expect(page.locator('.workspace-menu-item')).toHaveCount(1, { timeout: 20000 });
  await expect(page.locator('.workspace-menu-item')).toContainText('Maadi Branch');
});

test('records an earlier version saved under the account are moved into its first clinic', async ({ page, request }) => {
  const email = `legacy-${Date.now()}@example.com`;
  const signUpResponse = await request.post(`${AUTH_EMULATOR}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=demo-key`, {
    data: { email, password: 'secret123', returnSecureToken: true }
  });
  const { localId: uid, idToken } = await signUpResponse.json();

  // What the previous version wrote to users/{uid}/.
  const firestore = `http://127.0.0.1:8080/v1/projects/${PROJECT}/databases/(default)/documents/users/${uid}`;
  const put = (path, fields) => request.patch(`${firestore}/${path}`, {
    headers: { Authorization: `Bearer ${idToken}` },
    data: { fields: Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, { stringValue: value }])) }
  });
  expect((await put('settings/global', { orgName: 'Old Clinic Name', phone: '+20225550000' })).ok()).toBe(true);
  expect((await put('clients/cli-1722000000000', { id: 'cli-1722000000000', name: 'Legacy Client', createdAt: '2026-07-20' })).ok()).toBe(true);
  expect((await put('invitations/inv-old', { id: 'inv-old', name: 'Old Invitee', email: 'Old.Invitee@Example.com', role: 'Vet', status: 'Pending' })).ok()).toBe(true);

  await page.goto('/');
  await signIn(page, email);
  await expect(page.locator('.breadcrumb')).toContainText('Old Clinic Name');
  await goTo(page, 'Clients');
  await expect(page.locator('tbody td', { hasText: 'Legacy Client' })).toBeVisible();
  await goTo(page, 'Team');
  await page.getByRole('button', { name: /Invitations/ }).click();
  await expect(page.locator('tbody tr', { hasText: 'old.invitee@example.com' })).toBeVisible();

  // Reloading must not move the records a second time.
  await page.reload();
  await expect(page.locator('.sidebar')).toBeVisible({ timeout: 20000 });
  await openWorkspaceMenu(page);
  await expect(page.locator('.workspace-menu-item')).toHaveCount(1);
});

test('an invited vet joins with a verified email and gets only their role\'s access', async ({ page, request }) => {
  const stamp = Date.now();
  const ownerEmail = `owner-${stamp}@example.com`;
  const vetEmail = `newvet-${stamp}@example.com`;

  // Owner sets up the clinic and invites a vet.
  await page.goto('/');
  await signUp(page, { name: 'Dr. Owner', clinic: 'Heliopolis Vets', email: ownerEmail });
  await expect(page.locator('.sidebar')).toBeVisible({ timeout: 20000 });
  await addClient(page, 'Shared Client');
  await addPet(page, 'Shared Client', 'Bella');
  await addVisit(page, 'Shared Client', 'Bella');
  await goTo(page, 'Team');
  await page.getByRole('button', { name: /Invite member/ }).click();
  await page.getByPlaceholder('e.g. Dr. Sarah Mahmoud').fill('Dr. New Vet');
  await page.getByPlaceholder('sarah@clinic.com').fill(vetEmail);
  await page.getByRole('button', { name: 'Create Invitation' }).click();
  await expect(page.getByText('Invitation ready for Dr. New Vet')).toBeVisible();
  await expect(page.getByRole('link', { name: /Email the invitation/ })).toHaveAttribute('href', new RegExp(`^mailto:${encodeURIComponent(vetEmail)}`));
  await page.getByRole('button', { name: 'Done' }).click();
  await signOut(page);

  // The vet signs up with the invited email: no clinic is created, the invitation is offered.
  await signUp(page, { name: 'Dr. New Vet', email: vetEmail });
  const invite = page.getByTestId('pending-invite');
  await expect(invite).toContainText('Heliopolis Vets', { timeout: 20000 });
  await invite.getByRole('button', { name: 'Accept' }).click();
  await expect(page.getByText('Verify your email first')).toBeVisible();

  await verifyEmail(request, vetEmail);
  await page.getByRole('button', { name: "I've verified" }).click();
  await expect(page.getByText(/Email verified/)).toBeVisible();
  await invite.getByRole('button', { name: 'Accept' }).click();

  await expect(page.locator('.sidebar')).toBeVisible({ timeout: 20000 });
  await expect(page.locator('.breadcrumb')).toContainText('Heliopolis Vets');
  // Joining must not also create a separate clinic for the vet.
  await openWorkspaceMenu(page);
  await expect(page.locator('.workspace-menu-item')).toHaveCount(1);
  await expect(page.locator('.workspace-menu-item')).toContainText('Vet');
  await openWorkspaceMenu(page);
  await goTo(page, 'Clients');
  await expect(page.locator('tbody td', { hasText: 'Shared Client' })).toBeVisible();
  const nav = page.locator('.sidebar .nav-item');
  await expect(nav.filter({ hasText: 'Expenses' })).toHaveCount(0);
  await expect(nav.filter({ hasText: 'Settings' })).toHaveCount(0);

  // As a vet: clinical notes are editable.
  await goTo(page, 'Visits');
  await page.locator('tbody tr', { hasText: 'Bella' }).getByRole('button', { name: /SOAP/ }).click();
  await expect(page.getByRole('button', { name: /Save SOAP Record/ })).toBeVisible();
  await page.getByRole('button', { name: 'Cancel' }).click();
  await signOut(page);

  // The owner makes them a receptionist.
  await signIn(page, ownerEmail);
  await goTo(page, 'Team');
  await page.getByLabel('Role for Dr. New Vet').selectOption('Receptionist');
  await expect(page.getByLabel('Role for Dr. New Vet')).toHaveValue('Receptionist');
  await signOut(page);

  // As a receptionist: notes are read-only.
  await signIn(page, vetEmail);
  await goTo(page, 'Visits');
  await page.locator('tbody tr', { hasText: 'Bella' }).getByRole('button', { name: /SOAP/ }).click();
  await expect(page.getByText(/Only vets and owners can edit clinical notes/)).toBeVisible();
  await expect(page.getByRole('button', { name: /Save SOAP Record/ })).toHaveCount(0);
});
