const { test, expect } = require('@playwright/test');

async function onboard(page) {
  await page.goto('/');
  await page.locator('.chip').first().click();
  await page.locator('#start').click();
  await expect(page.locator('#timeline')).toBeVisible();
}

test('add edit reorder delete and persistence', async ({ page }) => {
  await onboard(page);
  await page.locator('#addBtn').click();
  await page.locator('#name').fill('Smoke Test Item');
  await page.locator('#category').selectOption('Vehicle');
  const dueDate = await page.evaluate(() => { const d=new Date(); d.setDate(d.getDate()+14); const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0'); return `${y}-${m}-${day}`; });
  await page.locator('#date').fill(dueDate);
  await page.locator('#amount').fill('123.45');
  await page.locator('#itemForm button[type="submit"]').click();
  await expect(page.locator('#items .item')).toHaveCount(2);

  await page.locator('#items').getByText('Smoke Test Item',{exact:true}).click();
  await expect(page.locator('#formTitle')).toHaveText('Edit Life Item');
  await page.locator('#name').fill('Edited Item');
  await page.locator('#itemForm button[type="submit"]').click();
  await expect(page.locator('#items').getByText('Edited Item',{exact:true})).toBeVisible();

  const before=await page.locator('#items .item strong').allTextContents();
  await page.locator('#items .item').last().locator('[data-dir="up"]').click();
  const after=await page.locator('#items .item strong').allTextContents();
  expect(after).not.toEqual(before);
  await page.reload();
  await expect(page.locator('#items .item strong').first()).toHaveText(after[0]);

  await page.locator('#items').getByText('Edited Item',{exact:true}).click();
  await page.locator('#deleteBtn').click();
  await expect(page.locator('#confirmPanel')).toBeVisible();
  await page.locator('#confirmCancel').click();
  await expect(page.locator('#add')).toBeVisible();
  await page.locator('#deleteBtn').click();
  await page.locator('#confirmOk').click();
  await expect(page.locator('#items').getByText('Edited Item',{exact:true})).toHaveCount(0);
});

test('reset timeline requires in-app confirmation and can be cancelled', async ({ page }) => {
  await onboard(page);
  await page.locator('#manageBtn').click();
  await page.locator('#resetTimeline').click();
  await expect(page.locator('#confirmPanel')).toBeVisible();
  await expect(page.locator('#confirmText')).toContainText('This will delete all 1 Life Item');
  await page.locator('#confirmCancel').click();
  await expect(page.locator('#items .item')).toHaveCount(1);
  await page.locator('#manageBtn').click();
  await page.locator('#resetTimeline').click();
  await page.locator('#confirmOk').click();
  await expect(page.locator('#items .item')).toHaveCount(0);
  await expect(page.locator('#timeline')).toBeVisible();
});
