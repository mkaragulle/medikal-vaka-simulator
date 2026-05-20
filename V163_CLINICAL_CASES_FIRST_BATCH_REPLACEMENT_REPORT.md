# V163 Clinical Cases First Batch Replacement

- Existing embedded 300 clinical cases were removed from `src/data/cases.js`.
- The first 10 user-provided clinical cases were converted into the KlinikIQ embedded case schema.
- Cases were placed into the relevant branch sections according to their clinical discipline.
- Each case keeps a natural flow: patient profile, presentation, patient history, physical exam/vitals, objective investigation data, question stem, 5 options and feedback.
- `Risk Bağlamı` and `Ayırt Ettirici İpuçları` are not included in the new case data.
- The clinical question panel now shows the actual question stem for embedded branch cases, not only a generic heading.
- Question heading adapts to diagnosis, treatment, test, mechanism, pathology and anatomy targets.
- `rawCases.length === 10` and all cases have exactly 5 options.
- `node --check src/data/cases.js` and runtime import validation passed.
- `npm run build` could not complete because `vite` is not installed in the ZIP environment; `node_modules` is intentionally absent.
