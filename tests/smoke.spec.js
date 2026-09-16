const { test, expect } = require('@playwright/test');

test('core MyLife prototype journey persists data', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('Never miss what matters.')).toBeVisible();

  const firstChip = page.locator('.chip').first();
  await firstChip.click();
  await page.locator('#start').click();

  await expect(page.locator('#timeline')).toBeVisible();
  await expect(page.locator('#timeline-list .item')).toHaveCount(1);

  await page.locator('#add').click();
  await expect(page.locator('#add-screen')).toBeVisible();

  await page.locator('#name').fill('Smoke Test Item');
  await page.locator('#category').selectOption({ label: 'Vehicle' });

  const dueDate = await page.evaluate(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  });
  await page.locator('#date').fill(dueDate);
  await page.locator('#amount').fill('123.45');
  await page.locator('#reminder').selectOption('30');
  await page.locator('#item-form button[type="submit"]').click();

  await expect(page.locator('#timeline')).toBeVisible();
  await expect(page.getByText('Smoke Test Item')).toBeVisible();

  await page.locator('#upcoming-nav').click();
  await expect(page.locator('#upcoming')).toBeVisible();
  await expect(page.getByText('Smoke Test Item')).toBeVisible();

  await page.reload();
  await expect(page.getByText('Smoke Test Item')).toBeVisible();
});
