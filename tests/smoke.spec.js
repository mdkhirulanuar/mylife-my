const { test, expect } = require('@playwright/test');

async function trackSample(page) {
  await page.goto('/');
  await page.locator('#snapStart').click();
  await expect(page.locator('#capture')).toBeVisible();
  await page.locator('[data-sample="roadtax"]').click();
  await expect(page.locator('#extract')).toBeVisible();
  await expect(page.locator('#extractName')).toHaveValue('Road tax — Ativa');
  await page.locator('#extractForm button[type="submit"]').click();
  await expect(page.locator('#timeline')).toBeVisible();
  await expect(page.locator('#items').getByText('Road tax — Ativa',{exact:true})).toBeVisible();
}

test('simulated snap extract confirm and persistence', async ({ page }) => {
  await trackSample(page);
  await page.reload();
  await expect(page.locator('#timeline')).toBeVisible();
  await expect(page.locator('#items').getByText('Road tax — Ativa',{exact:true})).toBeVisible();
});

test('manual add edit reorder delete remains available', async ({ page }) => {
  await trackSample(page);
  await page.locator('#addBtn').click();
  await page.locator('#name').fill('Manual Test Item');
  await page.locator('#category').selectOption('Bills');
  const dueDate = await page.evaluate(() => { const d=new Date(); d.setDate(d.getDate()+14); const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0'); return `${y}-${m}-${day}`; });
  await page.locator('#date').fill(dueDate);
  await page.locator('#itemForm button[type="submit"]').click();
  await expect(page.locator('#items .item')).toHaveCount(2);
  await page.locator('#items').getByText('Manual Test Item',{exact:true}).click();
  await expect(page.locator('#formTitle')).toHaveText('Edit tracked item');
  await page.locator('#name').fill('Edited Manual Item');
  await page.locator('#itemForm button[type="submit"]').click();
  const before=await page.locator('#items .item strong').allTextContents();
  await page.locator('#items .item').last().locator('[data-dir="up"]').click();
  const after=await page.locator('#items .item strong').allTextContents();
  expect(after).not.toEqual(before);
  await page.reload();
  await expect(page.locator('#items .item strong').first()).toHaveText(after[0]);
  await page.locator('#items').getByText('Edited Manual Item',{exact:true}).click();
  await page.locator('#deleteBtn').click();
  await page.locator('#confirmOk').click();
  await expect(page.locator('#items').getByText('Edited Manual Item',{exact:true})).toHaveCount(0);
});

test('delete all tracked items requires confirmation', async ({ page }) => {
  await trackSample(page);
  await page.locator('#manageBtn').click();
  await page.locator('#resetTimeline').click();
  await expect(page.locator('#confirmPanel')).toBeVisible();
  await page.locator('#confirmCancel').click();
  await expect(page.locator('#items .item')).toHaveCount(1);
  await page.locator('#manageBtn').click();
  await page.locator('#resetTimeline').click();
  await page.locator('#confirmOk').click();
  await expect(page.locator('#items .item')).toHaveCount(0);
});