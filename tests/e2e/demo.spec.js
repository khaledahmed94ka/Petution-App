import { test, expect } from '@playwright/test';
import { goTo, acceptDialogs, addClient, addPet, addVisit, setVisitState, signOut } from './helpers';

test.beforeEach(({ page }) => acceptDialogs(page));

test('a fresh browser is signed out', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: /Sign In to Workspace/ })).toBeVisible();
  await expect(page.locator('.sidebar')).toHaveCount(0);
  await expect(page.getByText(/Account sign-in isn't configured/)).toBeVisible();
});

test('a clinic day in the demo survives a reload and is wiped on exit', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Open Demo/ }).click();
  await expect(page.locator('.demo-badge')).toBeVisible();

  await addClient(page, 'Mona Adel');
  await addPet(page, 'Mona Adel', 'Luna');
  await addVisit(page, 'Mona Adel', 'Luna');
  await setVisitState(page, 'Luna', 'in-progress');

  // New SOAP note: nothing pre-filled.
  await page.locator('tbody tr', { hasText: 'Luna' }).getByRole('button', { name: /SOAP/ }).click();
  expect(await page.locator('.vitals-grid input').evaluateAll(inputs => inputs.map(i => i.value))).toEqual(['', '', '', '']);
  await expect(page.locator('.rx-item-row')).toHaveCount(0);
  await page.locator('.vitals-grid input').nth(1).fill('4.1');
  await page.getByRole('button', { name: /Add Medication/ }).click();
  await page.getByPlaceholder('e.g. Amoxicillin Drops').fill('Meloxicam 0.5mg/ml');
  await page.getByRole('button', { name: /Save SOAP Record/ }).click();

  await page.reload();
  await goTo(page, 'Visits');
  const row = page.locator('tbody tr', { hasText: 'Luna' });
  await expect(row.locator('.badge')).toHaveText('in-progress');
  await row.getByRole('button', { name: /SOAP/ }).click();
  await expect(page.locator('.vitals-grid input').nth(1)).toHaveValue('4.1');
  await expect(page.getByPlaceholder('e.g. Amoxicillin Drops')).toHaveValue('Meloxicam 0.5mg/ml');
  await page.getByRole('button', { name: 'Cancel' }).click();

  await signOut(page);
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
});

test('a printed receipt shows record text as text, never as HTML', async ({ page, context }) => {
  const evilName = '<img src=x onerror="window.opener.__pwned = true">';
  await page.goto('/');
  await page.getByRole('button', { name: /Open Demo/ }).click();
  await addPet(page, 'Ahmed Hassan', evilName);

  await goTo(page, 'Invoices');
  await page.getByRole('button', { name: 'Add Invoice' }).click();
  await page.locator('.drawer-panel select').nth(0).selectOption({ label: evilName });
  await page.getByLabel('Item 1').selectOption({ index: 1 });
  await page.getByRole('button', { name: 'Create Invoice' }).click();

  const [receipt] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('tbody tr').first().getByRole('button', { name: 'Print Receipt' }).click()
  ]);
  await expect(receipt.getByText(`Pet: ${evilName}`)).toBeVisible();
  await expect(receipt.locator('img')).toHaveCount(0);
  expect(await page.evaluate(() => window.__pwned === true)).toBe(false);
});

test('billing a visit takes stock, prints the items, and cancelling returns the stock', async ({ page, context }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Open Demo/ }).click();
  const vaccineRow = () => page.locator('tbody tr', { hasText: 'Feline Rabies Vaccine' });

  await goTo(page, 'Products & Services');
  await expect(vaccineRow().locator('td').nth(3)).toHaveText('45');

  await goTo(page, 'Visits');
  await page.locator('tbody tr', { hasText: 'Milo' }).first().getByRole('button', { name: 'Manage Visit' }).click();
  await page.getByRole('button', { name: /Create Invoice/ }).click();
  await page.getByLabel('Item 1').selectOption({ label: 'Feline Rabies Vaccine (45 in stock)' });
  await page.getByLabel('Quantity 1').fill('3');
  await page.getByRole('button', { name: /Add item/ }).click();
  await page.getByLabel('Item 2').selectOption({ label: 'General Examination & Consultation' });
  await expect(page.getByTestId('invoice-total')).toHaveText('EGP 1767.00');
  await page.getByRole('button', { name: 'Create Invoice' }).click();

  await goTo(page, 'Invoices');
  const invoiceRow = page.locator('tbody tr').first();
  await expect(invoiceRow).toContainText('3× Feline Rabies Vaccine, 1× General Examination & Consultation');
  await invoiceRow.getByRole('button', { name: /Mark Paid/ }).click();
  await expect(invoiceRow.locator('.badge')).toHaveText('paid');

  const [receipt] = await Promise.all([
    context.waitForEvent('page'),
    invoiceRow.getByRole('button', { name: 'Print Receipt' }).click()
  ]);
  await expect(receipt.locator('td', { hasText: 'Feline Rabies Vaccine' })).toBeVisible();
  await expect(receipt.getByText('Total Amount: 1767.00 EGP')).toBeVisible();
  await receipt.close();

  await goTo(page, 'Products & Services');
  await expect(vaccineRow().locator('td').nth(3)).toHaveText('42');

  await goTo(page, 'Invoices');
  await page.locator('tbody tr').first().getByRole('button', { name: /Cancel/ }).click();
  await expect(page.locator('tbody tr').first().locator('.badge')).toHaveText('cancelled');
  await goTo(page, 'Products & Services');
  await expect(vaccineRow().locator('td').nth(3)).toHaveText('45');
});
