const { test, expect } = require('@playwright/test');

async function openMoney(page) {
  await page.goto('/');
  const open = page.getByRole('button', { name: 'Open Money Overview' });
  if (await open.isVisible().catch(() => false)) await open.click();
}

async function record(page, { type='income', description, amount, classification, category, date }) {
  await page.locator('#addTransaction').click();
  await page.locator('#txType').selectOption(type);
  await page.locator('#txDescription').fill(description);
  await page.locator('#txAmount').fill(String(amount));
  if (date) await page.locator('#txDate').fill(date);
  if (type === 'expense') {
    if (category) await page.locator('#txCategory').selectOption(category);
    if (classification) await page.locator('#txClass').selectOption(classification);
  }
  await page.locator('#transactionForm button[type="submit"]').click();
}

function monthDate(offset=0) {
  const d = new Date();
  d.setMonth(d.getMonth()+offset);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-15`;
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
});

test('VAL-01 exact reconciliation including decimals', async ({ page }) => {
  await openMoney(page);
  await record(page,{description:'Salary',amount:5000.55});
  await record(page,{type:'expense',description:'Need',amount:1000.10,category:'Food',classification:'Need'});
  await record(page,{type:'expense',description:'Want',amount:300.20,category:'Entertainment',classification:'Want'});
  await record(page,{type:'expense',description:'Commitment',amount:700.15,category:'Bills',classification:'Commitment'});
  await record(page,{type:'save',description:'Savings',amount:500.05});
  await expect(page.locator('#incomeTotal')).toHaveText('RM5,000.55');
  await expect(page.locator('#spendingTotal')).toHaveText('RM2,000.45');
  await expect(page.locator('#savedTotal')).toHaveText('RM500.05');
  await expect(page.locator('#surplusTotal')).toHaveText('RM2,500.05');
  await expect(page.locator('#safeSpend')).toHaveText('RM2,500.05');
});

test('VAL-02 savings withdrawal affects safe spend but not income or surplus', async ({ page }) => {
  await openMoney(page);
  await record(page,{description:'Income',amount:1000});
  await record(page,{type:'save',description:'Save',amount:200});
  await record(page,{type:'withdraw',description:'Withdraw',amount:50});
  await expect(page.locator('#incomeTotal')).toHaveText('RM1,000');
  await expect(page.locator('#surplusTotal')).toHaveText('RM800');
  await expect(page.locator('#safeSpend')).toHaveText('RM850');
});

test('VAL-03 negative cash position is calculated and flagged', async ({ page }) => {
  await openMoney(page);
  await record(page,{description:'Income',amount:500});
  await record(page,{type:'expense',description:'Large expense',amount:700,category:'Bills',classification:'Commitment'});
  await expect(page.locator('#surplusTotal')).toHaveText('RM-200');
  await expect(page.locator('#safeSpend')).toHaveText('RM-200');
  await expect(page.locator('#attention')).toContainText('Needs attention');
});

test('VAL-04 transactions outside current month are excluded', async ({ page }) => {
  await openMoney(page);
  await record(page,{description:'Current',amount:1000,date:monthDate(0)});
  await record(page,{description:'Previous',amount:9000,date:monthDate(-1)});
  await expect(page.locator('#incomeTotal')).toHaveText('RM1,000');
});

test('VAL-05 money records persist after reload', async ({ page }) => {
  await openMoney(page);
  await record(page,{description:'Persistent income',amount:1234.56});
  await page.reload();
  await expect(page.locator('#incomeTotal')).toHaveText('RM1,234.56');
  await expect(page.locator('#transactions')).toContainText('Persistent income');
});

test('VAL-06 reset money does not delete tracked reminders', async ({ page }) => {
  await page.goto('/');
  await page.locator('#snapStart').click();
  await page.locator('[data-sample="internet"]').click();
  await page.locator('#extractForm button[type="submit"]').click();
  await page.locator('[data-view="money"]:visible').click();
  await record(page,{description:'Income',amount:1000});
  await page.locator('#manageBtn').click();
  await page.locator('#resetMoney').click();
  await page.locator('#confirmOk').click();
  await expect(page.locator('#incomeTotal')).toHaveText('RM0');
  await page.locator('[data-view="timeline"]:visible').click();
  await expect(page.locator('#items')).toContainText('Home internet bill');
});

test('VAL-07 reset timeline does not delete money records', async ({ page }) => {
  await page.goto('/');
  await page.locator('#snapStart').click();
  await page.locator('[data-sample="roadtax"]').click();
  await page.locator('#extractForm button[type="submit"]').click();
  await page.locator('[data-view="money"]:visible').click();
  await record(page,{description:'Income',amount:777});
  await page.locator('#manageBtn').click();
  await page.locator('#resetTimeline').click();
  await page.locator('#confirmOk').click();
  await page.locator('[data-view="money"]:visible').click();
  await expect(page.locator('#incomeTotal')).toHaveText('RM777');
});

test('VAL-08 upcoming commitment reduces safe spend without paid spending', async ({ page }) => {
  await page.goto('/');
  await page.locator('#snapStart').click();
  await page.locator('[data-sample="internet"]').click();
  await page.locator('#extractForm button[type="submit"]').click();
  await page.locator('[data-view="money"]:visible').click();
  await record(page,{description:'Income',amount:1000});
  await expect(page.locator('#spendingTotal')).toHaveText('RM0');
  await expect(page.locator('#safeSpend')).toHaveText('RM871');
  await expect(page.locator('#moneyCommitments')).toContainText('not counted as paid');
});
