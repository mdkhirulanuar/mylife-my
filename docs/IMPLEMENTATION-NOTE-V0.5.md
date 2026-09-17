# Implementation Note

Prototype 0.5 uses an additive `budget.js` module loaded after `app.js`. This minimizes change to the validated Prototype 0.4 core. Budget records use a separate localStorage key and are read only for planning presentation. Existing financial totals remain owned by the Prototype 0.4 engine.