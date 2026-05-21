# V178 Clinical Cases Fourteenth Batch Added Report

- Added 10 new clinical cases from `Pasted text(246).txt`.
- Total clinical branch question count: 140.
- Preserved full data–UI alignment rules:
  - `shuffleOptions: false` for all cases.
  - A-B-C-D-E option order preserved.
  - Correct answer remains present in each option list.
  - Option feedback is mapped by option text and by original option IDs when available.
  - No generic fallback feedback text.
  - No `[object Object]` rendering issue.
  - Patient profile, presentation, history, physical exam, investigations, rationale, evidence chain, exam pearl and option comparison fields are normalized for UI rendering.

Validation performed:

- `rawCases = 140`
- `cases = 140`
- Duplicate IDs: none
- Option count: 5/5 for every case
- Correct answer in options: 140/140
- Missing option feedback: none
- `node --check src/data/cases.js`: passed
- `npm run build`: not completed because `vite` is not installed in this ZIP environment (`sh: 1: vite: not found`).
