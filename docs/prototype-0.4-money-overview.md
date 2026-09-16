# MyLife MY — Prototype 0.4 Money Overview

Status: USER VALIDATION — value proposition pivot

## Problem

Many users receive income without a clear monthly plan. Transactions are not consistently recorded, needs and wants are mixed, savings are not deliberately allocated, future bills are not reserved, and by month-end users may not know where their money went.

MyLife MY should test whether combining life-admin tracking with simple evidence-based money management creates a stronger recurring-use product than reminders alone.

## Validation proposition

**Know where your money goes, what you need to pay, what you can safely spend, and what you are actually saving.**

Core loop:

**Money In → Plan → Record/Snap → Categorise → Track → Remind → Analyse → Improve**

Prototype 0.4 must remain a validation prototype. It is not a bank, accounting system, investment adviser, or production financial platform.

## Target outcome

A tester should be able to answer these questions without manual calculation:

1. How much real income did I receive this month?
2. Where did my money go?
3. How much went to needs versus wants?
4. How much did I deliberately save?
5. What bills and commitments are still coming?
6. How much money is left after planned obligations?
7. Am I running a monthly surplus or deficit?
8. What records support the numbers shown?

## Money model

### Money in

- Salary
- Side income
- Freelance/business income
- Bonus
- Refund/reimbursement
- Other income

### Transfers — not income or expense

- Transfer to savings
- Transfer from savings

Transfers must not inflate earned income or spending. Savings withdrawals must be reported separately from real income.

### Money out

Every outgoing transaction should have:

- Date
- Description / merchant
- Amount
- Category
- Classification: Need / Want / Commitment
- Optional evidence/receipt status
- Optional recurring flag

Savings allocation is tracked separately so it is not misrepresented as consumption spending.

## Core calculations

- **Real Income** = salary + side income + freelance/business + bonus + other earned/received income
- **Spending** = needs + wants + commitments paid
- **Savings Contribution** = transfers allocated to savings during the month
- **Monthly Surplus/Deficit** = Real Income − Spending − Savings Contribution
- **Upcoming Commitments** = unpaid tracked bills/renewals due in the selected period
- **Safe to Spend** = available cash after accounting for remaining planned commitments and savings allocation

The prototype must show the components behind calculations rather than presenting an unexplained financial-health score.

## MUST HAVE — Prototype 0.4

1. Money dashboard as a new primary area alongside Tracking and Reminders.
2. Add multiple income sources.
3. Add expenses/transactions.
4. Need / Want / Commitment classification.
5. Savings allocation and savings transfer handling.
6. Monthly totals for income, spending, savings and remaining balance.
7. Safe-to-Spend estimate with visible calculation basis.
8. Upcoming tracked bills/commitments incorporated into the money view without double-counting.
9. Transaction history/ledger.
10. Dashboard visualisations for:
    - Income vs outflow
    - Spending by category
    - Needs vs wants
    - Savings progress
11. Monthly downloadable report concept containing summary plus transaction ledger.
12. Existing Track/Reminder functionality remains available.
13. Existing data should not be silently destroyed during prototype upgrade.

## SHOULD HAVE

- Monthly budget/plan targets
- Savings goal and progress
- 3/6/12 month trend concept
- Uncategorised transaction warning
- Evidence/receipt indicator
- Income-gap calculator: required additional monthly income to reach a user-defined surplus/savings target
- Simple scenario analysis when spending exceeds income
- Explainable financial indicators based on observable data

## COULD HAVE — later validation

- Faster real camera/gallery capture
- OCR/AI extraction of merchant, date, amount and document type
- Suggested category and Need/Want classification with user confirmation
- Income opportunity planner based on target income gap, skills, available time and capital
- Calendar integration
- Family/household view

## NOT NOW

- Bank/card account integration
- Automatic bank transaction import
- Investment portfolio management
- Tax/accounting functionality
- Credit scoring
- Loan optimisation
- Automated financial advice presented as guaranteed outcomes
- Complex AI career adviser
- WhatsApp/Telegram integration

## Financial-health design rule

Do not label a user financially healthy/unhealthy using an opaque score. Show measurable indicators and the reason for each state, for example:

- Spending exceeds real income
- Savings target not met
- Wants increased relative to the user's own plan
- Upcoming commitments exceed currently available planned cash
- Positive monthly surplus

Any thresholds used in later versions must be documented and validated before being presented as normative financial guidance.

## Income-gap concept

If the user sets a desired monthly remaining amount or savings target, calculate the gap transparently.

Example:

- Current projected surplus: RM100
- User target surplus: RM750
- Income/spending gap: RM650

The app may later help explore ways to close the RM650 gap through spending changes and/or additional income. It must not promise that a suggested job or activity will generate a stated amount.

## Monthly report concept

Downloadable monthly records should include:

- Reporting month
- Income by source
- Transfers to/from savings
- Spending total
- Needs vs wants vs commitments
- Spending by category
- Savings contribution
- Monthly surplus/deficit
- Upcoming commitments
- Transaction ledger: date, description, type, category, classification, amount, evidence status

Target export formats:

- PDF: human-readable monthly statement
- CSV: portable transaction data

Excel export is deferred until user demand is demonstrated.

## Prototype 0.4 validation scenarios

### Scenario A — Salary planning
User enters salary and planned savings, then sees available money after commitments.

### Scenario B — Expense recording
User records several expenses and can identify where money went and which items were needs versus wants.

### Scenario C — Savings transfer
User moves money to savings without the dashboard incorrectly treating it as ordinary spending.

### Scenario D — Savings withdrawal
User uses money from savings without the dashboard incorrectly treating it as new earned income.

### Scenario E — Existing tracked bill
A tracked recurring bill appears as an upcoming commitment and does not become a paid expense until recorded/confirmed as paid.

### Scenario F — Monthly report
User can review a complete monthly summary and transaction ledger suitable for personal record keeping.

## Acceptance criteria for validation build

- Calculations reconcile from transaction-level records.
- Transfers do not inflate income or spending.
- Upcoming unpaid commitments are not double-counted as paid expenses.
- Needs/Wants totals reconcile to their underlying transactions.
- Monthly summary reconciles to the ledger.
- Existing reminder/tracking data survives the prototype upgrade or a documented migration/fallback is provided.
- Tester can explain where their money went using the dashboard without calculating totals manually.

## Validation questions

Ask testers after using the prototype:

1. Can you tell where your money went this month?
2. Does Need vs Want change how you think before spending?
3. Is Safe to Spend clearer than simply seeing your bank balance?
4. Would you record transactions consistently if capture took only a few seconds?
5. Is combining bills/reminders with money tracking more useful than using a calendar plus a separate expense app?
6. Would a downloadable monthly report be useful enough to keep?
7. Which feature would make you consider paying: automation/capture, advanced analysis, reports/history, smart reminders, or family features?

## Commercial hypothesis — not yet validated

Keep basic awareness useful on a free tier. Test willingness to pay for convenience and automation rather than hiding basic financial visibility.

Potential Pro value:

- OCR/smart capture
- Advanced trends and analytics
- Extended report/history
- Forecasting and smart reminders
- Family/household features

Previous RM39/year pricing must be revalidated because the product proposition has materially changed.

## Next implementation step

After this requirements review, build Prototype 0.4 as a reversible branch. Prioritise the core monthly money loop and calculation correctness before OCR, AI recommendations or integrations.