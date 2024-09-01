import { expect, test } from '@playwright/test';

const UI_URL = 'http://localhost:5173';

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  // get sign in button
  await page.getByRole('link', { name: 'Sign In' }).click();
  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();

  await page.locator('[name=email]').fill('userone@gmail.com');
  await page.locator('[name=password]').fill('userone');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Logged in successfully')).toBeVisible();
});

test('should show hotel search result', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder('Where are you going?').fill('Hawaii');
  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page.getByText('Hotels found in Hawaii')).toBeVisible();
  await expect(page.getByText('Sunset Beach Resort')).toBeVisible();
});
