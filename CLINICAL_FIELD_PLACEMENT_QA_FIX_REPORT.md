# KlinikIQ Clinical Field Placement QA Fix

## Root cause

The AI question pipeline and embedded case data had no dedicated semantic field-placement layer. Some clinical facts were treated as generic clue text, so laboratory values, imaging findings, physical-exam findings and chief complaints could be mixed inside `patientIntro.distinctiveClues`, `patientIntro.presentation`, feedback evidence chains or synthetic investigation blocks.

## Added field classification rules

The new `src/utils/clinicalFieldPlacement.js` module classifies clinical text as:

- `chiefComplaint`
- `history`
- `physicalExam`
- `vital`
- `lab`
- `imaging`
- `ecg`
- `empty`

It also removes inline labels such as `Başvuru yakınması:`, `Laboratuvar paterni:`, `Görüntüleme bulgusu:`, `Fizik muayene bulgusu:`, `Karar verdirici ipucu:` and similar UI-noise prefixes.

## Added repair rules

- `chiefComplaint` and `patientIntro.presentation` may not contain laboratory, imaging, EKG or vital-result text.
- `exam` may not contain laboratory, imaging or EKG results.
- Misplaced laboratory/imaging/EKG findings are moved into `investigations` when possible.
- Non-objective synthetic investigation items such as management pearls are removed from the investigation list.
- `patientIntro.distinctiveClues` is cleaned into 3-5 concise clues without inline section labels.
- Evidence-chain titles are normalized according to the datum type: `Başvuru yakınması`, `Öykü`, `Fizik muayene`, `Laboratuvar`, `Görüntüleme`, `EKG`, or `Vital bulgu`.
- Incomplete lab snippets such as `Lökosit 16` are normalized into clinically readable clue text such as `Nötrofil baskın lökositoz` or kept as one-unit laboratory data when values are available.

## AI quality gate integration

- `aiQuestionQualityGate.js` now repairs misplaced clinical data before final dedupe/signature attachment.
- `validateAIQuestion.js` now runs field-placement checks on remote/generated payloads before display.
- `aiQuestionGenerator.js` no longer fabricates management/exam-pearl text as synthetic lab results; synthetic investigations are created only when objective lab, imaging, EKG or vital data exists.
- `aiBranchRules.js` now prefers seed-level presentation/title cues when they are clinically meaningful, reducing mismatches such as unrelated generic chief complaints.

## Embedded case QA result

- Checked embedded cases: 132
- Visible text strings scanned: 20,523
- Field-placement validation failures: 0
- Inline field-label residue: 0

## AI generation QA result

- Generated field-placement test: 50/50 passed
- Duplicate signatures in generated test: 0
- Button-path smoke test: 5/5 passed

See:

- `CLINICAL_FIELD_PLACEMENT_QA_REPORT.json`
- `CLINICAL_FIELD_PLACEMENT_TEST_RESULT.json`
- `CLINICAL_FIELD_PLACEMENT_BUILD_RESULT.md`
