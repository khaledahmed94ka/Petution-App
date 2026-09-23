import { expect } from '@playwright/test';

export const goTo = (page, label) => page.locator('.sidebar .nav-item', { hasText: label }).click();

export const acceptDialogs = (page) => page.on('dialog', dialog => dialog.accept());

export const addClient = async (page, name, phone = '+201001112233') => {
  await goTo(page, 'Clients');
  await page.getByRole('button', { name: 'Add Client' }).click();
  await page.getByPlaceholder('Client full name').fill(name);
  await page.getByPlaceholder('Enter phone number').fill(phone);
  await page.getByRole('button', { name: 'Create client' }).click();
  await expect(page.locator('tbody td', { hasText: name }).first()).toBeVisible();
};

export const addPet = async (page, ownerName, petName) => {
  await goTo(page, 'Pets');
  await page.getByRole('button', { name: 'Add Pet' }).click();
  await page.locator('.drawer-panel select').first().selectOption({ label: ownerName });
  await page.getByPlaceholder('e.g. Milo, Rocky').fill(petName);
  await page.getByRole('button', { name: 'Create pet' }).click();
  await expect(page.locator('tbody td', { hasText: petName }).first()).toBeVisible();
};

export const addVisit = async (page, clientName, petName) => {
  await goTo(page, 'Visits');
  await page.getByRole('button', { name: 'Add Visit' }).click();
  const selects = page.locator('.drawer-panel select');
  await selects.nth(0).selectOption({ label: clientName });
  const petValue = await selects.nth(1).locator('option', { hasText: `${petName} (` }).first().getAttribute('value');
  await selects.nth(1).selectOption(petValue);
  await page.getByRole('button', { name: 'Create Visit' }).click();
  await expect(page.locator('tbody tr', { hasText: petName })).toBeVisible();
};

export const setVisitState = async (page, petName, state) => {
  await goTo(page, 'Visits');
  await page.locator('tbody tr', { hasText: petName }).getByRole('button', { name: 'Manage Visit' }).click();
  await page.locator('.modal-card select').selectOption(state);
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await expect(page.locator('tbody tr', { hasText: petName }).locator('.badge')).toHaveText(state);
};

export const signOut = async (page) => {
  await page.locator('.user-profile-footer').click();
  await page.getByRole('button', { name: /Sign Out of Petution|Exit Demo/ }).click();
  await expect(page.getByRole('button', { name: /Sign In to Workspace/ })).toBeVisible();
};
