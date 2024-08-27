import { expect, test } from '@playwright/test';
import path from 'path';

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

test('should allow user to create hotel', async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);

  await page.locator('[name="name"]').fill('Test Hotel');
  await page.locator('[name="city"]').fill('Test City');
  await page.locator('[name="country"]').fill('Test Country');
  await page
    .locator('[name="description"]')
    .fill('This is a description for the Test Hotel');
  await page.locator('[name="pricePerNight"]').fill('100');

  await page.selectOption('select[name="starRating"]', '3');

  await page.getByText('Budget').click();

  await page.getByLabel('Free Wifi').check();
  await page.getByLabel('Parking').check();

  await page.locator('[name="adultCount"]').fill('2');
  await page.locator('[name="childCount"]').fill('2');

  await page.setInputFiles('[name="imagesFiles"]', [
    path.join(__dirname, 'files', '1.jpg'),
    path.join(__dirname, 'files', '2.jpg'),
  ]);

  await page.getByRole('button', { name: 'Create' }).click();

  await expect(page.getByText('Hotel created successfully')).toBeVisible();

  page.pause();
});

test('should display hotels', async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);

  await expect(page.getByText('test hotel')).toBeVisible();
  await expect(
    page.getByText('t is a long established fact that a reade')
  ).toBeVisible();

  await expect(page.getByText('kuala lumpur,malaysia')).toBeVisible();
  await expect(page.getByText('Motel')).toBeVisible();
  await expect(page.getByText('$200 per night')).toBeVisible();
  await expect(page.getByText('5 adults, 6 children')).toBeVisible();
  await expect(page.getByText('5 adults, 6 children')).toBeVisible();

  await expect(page.getByRole('link', { name: 'View Details' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Add Hotel' })).toBeVisible();
});

test('should update hotel', async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);

  await page.getByRole('link', { name: 'View Details' }).click();

  await page.waitForSelector('[name="name"]', { state: 'attached' });
  await expect(page.locator('[name="name"]')).toHaveValue('test hotel');
});
