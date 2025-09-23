import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/React Skeleton/);
});

test('has heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Dog Page' })).toBeVisible();
});
