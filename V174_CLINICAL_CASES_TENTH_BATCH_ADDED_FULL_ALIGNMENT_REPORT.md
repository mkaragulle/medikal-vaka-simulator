# V174 — Clinical Cases Tenth Batch Added + Full Alignment Preserved

## Scope
- Added 10 new embedded clinical cases from `/mnt/data/Pasted text(242).txt`.
- Previous V173 total: 90 cases.
- New V174 total: 100 cases.

## Alignment rules preserved
- Original A–E option order is preserved; no option shuffling is enabled.
- Correct answer is mapped to the exact option text.
- `optionComparison`, `optionFeedback`, `optionRationales`, `feedbackByOption`, and `answerFeedback` maps are keyed by visible option text.
- Original clinical rationale, evidence chain, exam pearl, and option-specific explanations are retained.
- `patientIntro.profile`, `patientIntro.presentation`, and `patientIntro.historySummary` are populated directly from the source text.
- Objective data are converted into structured `investigations` and `availableInvestigations` rows.
- UI fallback strings such as missing option explanation fallbacks are avoided by complete option-level mappings.
- The patient summary subtitle was changed from the generic “Hasta öyküsü, fizik muayene ve objektif veri” to “Profil, başvuru ve öykü”.

## Validation
- `rawCases = 100`
- `cases = 100`
- Added cases: 10
- Duplicate IDs: none
- Each case has exactly 5 options.
- Every correct answer exists in its option list.
- Every option has mapped feedback.
- `[object Object]` was not found in case data.
- Generic missing option explanation fallback string was not found in case data.
- `node --check src/data/cases.js` passed.
- `npm run build` could not be completed in the ZIP environment because `vite`/`node_modules` are not installed.
