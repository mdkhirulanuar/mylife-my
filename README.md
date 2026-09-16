# MyLife MY

**Your personal life admin for Malaysia.**

Current stage: **VALIDATION — Prototype 0.1**

MyLife MY explores a simple consumer product for keeping things that expire, renew, recur, need servicing, or require attention on one **Life Timeline**.

## Prototype 0.1

This is deliberately a front-end-only validation prototype. It supports:

- onboarding with Malaysia-relevant templates
- adding a Life Item
- due / expiry dates
- expected cost
- recurrence metadata
- reminder threshold
- chronological Life Timeline
- upcoming reminder view
- browser-local persistence

No production backend, authentication, payment, AI, OCR, document storage, or bank connection is included.

## Run locally

No build step or dependencies are required. Serve the repository with any static HTTP server, for example:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Validation gate

Before full development:

- test with at least 20 target users
- >=60% understand the value without explanation
- >=50% add at least 3 Life Items
- >=40% say they would continue using it
- >=20% demonstrate credible willingness to pay RM39/year
- no major usability blocker

## Product constraints

- mobile-first
- first useful value in under 2 minutes
- minimal personal data collection
- no sensitive document storage in Prototype 0.1
- avoid feature creep into budgeting, generic calendars, chat, or document management

## Important prototype limitation

The recurrence field is captured but Prototype 0.1 does not automatically generate future recurring occurrences. That behavior belongs in the MVP only if validation passes.
