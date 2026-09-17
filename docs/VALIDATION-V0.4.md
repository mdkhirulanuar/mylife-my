# Prototype 0.4 Technical Validation Protocol

## Objective
Verify that the Money Overview implementation produces correct and repeatable financial results and that critical legacy functions remain intact.

## Acceptance criteria
- 100% of critical validation tests pass.
- Financial calculation/display differences shall not exceed RM0.01.
- No critical regression affecting tracking/reminders or persistence.
- Prototype smoke test and this validation suite must complete successfully in CI before the build is accepted as the v0.4 validated baseline.

## Calculation specification
- Real Income = income records only.
- Spending = expense records only.
- Monthly Surplus/Deficit = Real Income - Spending - Savings Contribution.
- Safe to Spend = Real Income + Savings Withdrawn - Spending - Savings Contribution - Upcoming Commitments.
- Upcoming tracked commitments shall reduce Safe to Spend but shall not be counted as paid spending.

## Automated validation cases
| ID | Validation | Acceptance |
|---|---|---|
| VAL-01 | Decimal reconciliation | Income, spending, savings, surplus and safe-to-spend reconcile exactly to displayed RM values |
| VAL-02 | Savings withdrawal | Withdrawal increases safe-to-spend only; it does not become real income |
| VAL-03 | Negative cash position | Negative result is calculated and attention warning is displayed |
| VAL-04 | Month isolation | Transactions outside the current month do not affect current totals |
| VAL-05 | Persistence | Money records survive browser reload |
| VAL-06 | Money reset independence | Resetting money does not delete tracked reminders |
| VAL-07 | Timeline reset independence | Resetting tracked reminders does not delete money records |
| VAL-08 | Upcoming commitment | Upcoming item reduces safe-to-spend without becoming paid spending |

## Existing regression coverage
The existing smoke suite additionally checks core reconciliation, upcoming commitment behaviour, money persistence, and legacy manual tracking availability.

## Validation disposition
Do not label Prototype 0.4 as a validated baseline until the PR CI run containing this suite has completed successfully. Any failed critical test requires investigation and corrective change followed by a complete rerun.
