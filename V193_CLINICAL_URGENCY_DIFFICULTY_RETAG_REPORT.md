# V193 — Clinical urgency-aware difficulty retagging

This update reviews the clinical branch case difficulty labels after the V192 set.

## Main rule change

`Acil` is no longer used as a generic synonym for “hard”. It is reserved for cases where the vignette itself contains a time-critical clinical situation, such as hemodynamic instability, respiratory compromise, neurologic emergency, active hemorrhage, obstetric/surgical emergency, severe toxicology, urgent antidote/reversal, or vision/limb/life-threatening emergency.

Stable outpatient, elective, follow-up, laboratory/simulation, anatomy, histology, pathology, microbiology, pharmacology or mechanism questions are tagged as `Kolay`, `Orta`, or `Zor` according to concept complexity.

## Explicitly fixed examples

- Chronic Addison/adrenal insufficiency mechanism-type cases in outpatient setting were moved from `Acil` to `Zor`.
- Postpartum Rh prophylaxis and mild/stable bleeding-prophylaxis cases were moved from `Acil` to `Orta`.
- Elective pelvic anatomy and stable outpatient mechanism cases were moved out of `Acil`.
- True emergencies such as DKA/HHS, anaphylaxis, ruptured ectopic pregnancy, eclampsia, severe asthma, meningitis, heat stroke, compartment syndrome, acute stroke, epidural hematoma, postpartum hemorrhage, necrotizing soft tissue infection, mesenteric ischemia and serious toxicology/reversal cases remain or were corrected to `Acil`.

## Final counts

- Total cases: 305
- Acil: 107
- Zor: 86
- Orta: 73
- Kolay: 39

## Validation

- `rawCases = 305`
- `cases = 305`
- `difficulty === difficultyTag` for all cases
- `shuffleOptions: false` preserved
- All cases have 5 options
- Correct answer exists in options for every case
- Option feedback mappings are complete
- `[object Object]` not present
- `node --check src/data/cases.js` passed
- `node --check src/utils/scoring.js` passed
- `node --check src/utils/tusLanguageStandard.js` passed

`npm run build` could not run in the ZIP sandbox because `vite` is not installed in `node_modules`.
