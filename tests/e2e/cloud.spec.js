// Real sign-up and Firestore persistence, against the Firebase emulators.
import { test, expect } from '@playwright/test';
import { goTo, acceptDialogs, addClient, addPet, addVisit, setVisitState, signOut } from './helpers';

test.beforeEach(({ page }) => acceptDialogs(page));

const signUp = async (page, { name, clinic, email }) => {
  await page.getByRole('button', { name: 'Create Account' }).click();
  await page.getByPlaceholder('Dr. Khaled ElGendy').fill(name);
  if (clinic) await page.getByPlaceholder('Petution Vet Center').fill(clinic);
  await page.getByPlaceholder('name@clinic.com').fill(email);
  await page.getByPlaceholder('••••••••').fill('secret123');
  await page.getByRole('button', { name: 'Create Clinic Workspace' }).click();
  await expect(page.locator('.sidebar')).toBeVisible({ timeout: 20000 });
};

test('an account keeps its data across reloads and never sees another account\'s data', async ({ page }) => {
  const stamp = Date.now();
  await page.goto('/');
  await signUp(page, { name: 'Dr. Test Vet', clinic: 'Test Clinic', email: `vet1-${stamp}@example.com` });

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
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);

  await signUp(page, { name: 'Dr. Second', email: `vet2-${stamp}@example.com` });
  await goTo(page, 'Clients');
  await expect(page.getByText('No clients found.')).toBeVisible();
  await expect(page.getByText('Mona Adel')).toHaveCount(0);
});
