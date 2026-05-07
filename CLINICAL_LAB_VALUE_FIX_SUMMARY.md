# KlinikIQ Laboratory Result Formatting Fix

## Scope
- Checked all 132 embedded cases.
- Checked 162 laboratory/tetkik-oriented investigations and 387 lab/tetkik rows.
- Updated 315 investigation rows across 111 investigation records.
- Rebuilt 149 investigation summaries/findings from structured rows.
- Updated 94 visible narrative/evidence fields that contained incomplete or shorthand measurement wording.

## Main changes
- Added `src/utils/clinicalValueFormatters.js` as the shared lab formatting and validation layer.
- Normalized measurable laboratory rows to `Parametre / Sonuç / Referans / Durum`.
- Repaired incomplete values such as short WBC/lökosit, CRP, troponin, D-dimer, electrolyte, glucose, hemoglobin, platelet, blood gas and culture/serology rows.
- Rebuilt lab summaries from structured rows so cards no longer display fragments like incomplete leukocyte, potassium, glucose or CRP values.
- Updated the investigation panel to keep numeric laboratory tables in four-column format when possible.
- Added AI-generated-question quality checks requiring structured `rows` for measurable laboratory results.
- Updated the server prompt and raw validation so AI output must include unit, reference range and status for measurable labs.

## Reference standard examples
- Lökosit: 4.000–10.000/mm³
- Nötrofil: %40–70 or absolute neutrophil 1.500–7.500/mm³
- CRP: <5 mg/L
- Potasyum: 3.5–5.1 mEq/L
- Sodyum: 135–145 mmol/L
- Glukoz: 70–100 mg/dL
- Kreatinin: 0.6–1.2 mg/dL
- Troponin I / hs-Troponin I: assay threshold shown in row
- D-dimer: <500 ng/mL FEU
- pH: 7.35–7.45
- HCO₃⁻: 22–26 mmol/L
- PaCO₂: 35–45 mmHg
- PaO₂: 80–100 mmHg
- Qualitative tests: reference shown as Negatif, Saptanmamalı, Üreme olmamalı, or equivalent.
