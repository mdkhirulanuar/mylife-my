# Prototype 0.5 P2 — Recurring Transactions, Cash-flow Forecast & Financial Alerts

## Objective
Add forward-looking planning without changing the validated Prototype 0.4 arithmetic or Prototype 0.5 P1 budget calculations.

## Rules
- Recurring transactions are planning records, not actual transactions.
- A recurring item must not change Real Income, Spending, Savings, Surplus/Deficit or Safe to Spend.
- Forecast starts from current Safe to Spend and adds pending recurring income and subtracts pending recurring expenses.
- A recurring item matching a recorded transaction by type, normalized description and amount within RM0.01 is excluded from pending forecast to prevent double counting.
- Only recurring items with a due day on or after today's day-of-month are treated as still due for the current month.
- Budget alerts: >=80% and <=100% is near-limit; >100% is over budget.

## Automated acceptance tests
- PLAN-01 recurring transaction persists and displays.
- PLAN-02 pending recurring expense changes forecast but not Safe to Spend.
- PLAN-03 matched actual transaction is not double counted.
- PLAN-04 negative projected month-end creates a financial alert.
- PLAN-05 budget near-limit creates a financial alert.
- Existing smoke, VAL-01–VAL-08 and BUD-01–BUD-06 remain regression requirements.

## Release gate
All automated tests must pass in CI. No merge to main while any regression or planning test is failing.