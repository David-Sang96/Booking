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

test('should book hotel', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder('Where are you going?').fill('Hawaii');

  const date = new Date();
  date.setDate(date.getDate() + 3);
  const formattedDate = date.toISOString().split('T')[0];
  await page.getByPlaceholder('Check-out Date').fill(formattedDate);

  await page.getByRole('button', { name: 'Search' }).click();

  await page.getByText('Paris').click();
  await page.getByRole('button', { name: 'Book now' }).click();

  await expect(page.getByText('Total cost: $600')).toBeVisible();

  const stripeFrame = page.frameLocator('iframe').first();
  await stripeFrame
    .locator('[placeholder="Card number"]')
    .fill('4242 4242 4242 4242');
  await stripeFrame.locator('[placeholder="MM/YY"]').fill('04/25');
  await stripeFrame.locator('[placeholder="CVC"]').fill('434');
  await stripeFrame.locator('[placeholder="ZIP"]').fill('55200');

  await page.getByRole('button', { name: 'Confirm Booking' }).click();
  await expect(page.getByText('Booking Saved!')).toBeVisible();
});
