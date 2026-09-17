# Prototype 0.5 — Financial Planning

## Implemented scope
- Monthly budgets for Need, Want and Commitment classifications.
- Budget vs Actual comparison using current-month expense records.
- Remaining amount for each classification and total monthly budget.
- Explicit over-budget indication when actual spending exceeds a planned limit.
- Browser persistence of monthly budgets.

## Design controls
- Prototype 0.4 calculation rules remain unchanged.
- Budget data is stored separately under `mylife-monthly-budgets`.
- Budget limits do not alter Real Income, Spending, Savings, Surplus/Deficit or Safe to Spend calculations.
- Existing Prototype 0.4 technical validation suite remains the regression baseline.

## Acceptance criteria
- BUD-01 Monthly budget saves and total reconciles.
- BUD-02 Actual spending is compared against the correct Need/Want/Commitment budget.
- BUD-03 Overspending is visibly identified.
- BUD-04 Budget persists after reload.
- All Prototype 0.4 regression/validation tests remain PASS.
