# Prototype 0.5 Risk Controls

Key risks and controls:

- Double counting: budget is presentation/planning only and never added to spending.
- Formula regression: validated `app.js` calculation engine is unchanged.
- Month contamination: budget and actual comparison use current YYYY-MM scope.
- Data loss: budget values persist in a dedicated browser storage key.
- Overspending visibility: negative remaining budget is explicitly labelled Over Budget.
