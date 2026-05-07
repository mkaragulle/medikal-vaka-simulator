# KlinikIQ Clinical Field Placement QA Fix

## Root cause

The AI generated question pipeline and embedded case data used free-text fields without a semantic field-placement validator. As a result, evidence-chain fragments, investigation findings, examination findings, and chief complaint text could be mixed into `patientIntro.distinctiveClues`, `findings.history`, or `chiefComplaint`. Inline labels such as `Başvuru yakınması:` were treated as content instead of formatting metadata. The local AI quality gate cleaned style and duplication issues, but it did not previously classify each clinical datum as complaint, history, physical exam, laboratory, imaging/EKG, or investigation result before rendering.

## Implemented fix

A reusable semantic classification and repair layer was added for both embedded cases and AI-generated cases. The layer removes inline field labels, classifies clinical data by type, moves misplaced laboratory/imaging/EKG findings to investigations, moves physical examination findings to exam fields, keeps chief complaint/history fields symptom- and context-focused, normalizes objective measurement formatting, and validates field placement before the AI question is accepted.

## Added classification rules

- Chief complaint detection: patient-reported symptoms such as cough, fever, dyspnea, pain, vomiting, diarrhea, dizziness, rash, seizure, weakness, jaundice, urinary symptoms, trauma-related pain, syncope, and bleeding.
- Physical exam detection: rales, rhonchi, wheezing, rebound/guarding, neck stiffness, rash morphology, joint swelling, focal neurological deficit, capillary refill, skin turgor, hepatosplenomegaly, lymphadenopathy, pulse quality, murmur, and palpation/auscultation findings.
- Laboratory/objective result detection: leukocyte/WBC, CRP, procalcitonin, troponin, creatinine, glucose, electrolytes, AST/ALT, bilirubin, D-dimer, blood gas values, lactate, urinalysis, CSF, culture/PCR, serology, hormones, and cytology/pathology-related objective findings.
- Imaging/EKG detection: chest X-ray, radiography, CT, MRI, ultrasonography, echocardiography, Doppler, angiography, consolidation, air bronchogram, infiltrate, ST changes, QT/QRS findings, and rhythm findings.
- Inline label detection/removal: `Başvuru yakınması:`, `Karar verdirici ipucu:`, `Destekleyici kanıt:`, `Olgu verisi:`, `Ek destek:`, `Laboratuvar paterni:`, `Görüntüleme bulgusu:`, `Fizik muayene bulgusu:`, `Mekanizma özeti:`, `Klinik not:`, `Sık tuzak:`, and similar content-prefix labels.

## AI quality gate additions

- AI output is repaired with `repairMisplacedClinicalData()` before final validation.
- `validateClinicalFieldPlacement()` now checks that chief complaint and history fields do not contain lab, imaging, EKG, physical exam, or vital-sign results.
- Physical exam fields are checked for laboratory, serology, imaging, and EKG leakage.
- Distinctive clues are cleaned, deduplicated, capped, and checked for inline labels.
- Objective measurements such as leukocyte and CRP values are normalized when possible.
- The server-side generation endpoint now rejects raw remote AI output if clinical field placement is already invalid.
- If the repaired local question still fails placement validation, the quality gate marks it invalid so the generation fallback can retry instead of showing a broken item.

## QA result

- Embedded cases checked: 132
- Embedded field-placement failures: 0
- Embedded field-placement warnings: 0
- AI sample questions checked: 5
- AI sample field-placement failures: 0
- AI-generated repair rule groups added: 12

## Changed files

- `src/utils/clinicalFieldClassification.js` — new clinical datum classifier, cleaner, repairer, and validator.
- `src/utils/aiQuestionQualityGate.js` — AI generation repair and field-placement validation integration.
- `src/components/CasePlayer.jsx` — rendering cleanup for inline labels and objective measurement formatting.
- `src/data/cases.js` — embedded cases now pass through the repair layer; `getCaseById` and `getCasesByBranch` exports added.
- `src/data/branches.js` — `TUS_SPOT_BRANCH_ID` export added.
- `api/generate-ai-question.js` — server-side raw AI placement validation and stricter prompt constraints added.
- `scripts/clinical-field-placement-qa.mjs` — new QA script for embedded and generated cases.
- `CLINICAL_FIELD_PLACEMENT_QA_REPORT.json` — QA execution result.
- `CLINICAL_FIELD_PLACEMENT_FIX_SUMMARY.md` — this summary.

## Validation commands run

```bash
node --check src/utils/clinicalFieldClassification.js
node --check src/utils/aiQuestionQualityGate.js
node --check api/generate-ai-question.js
node scripts/clinical-field-placement-qa.mjs
node --input-type=module -e "import('./src/data/cases.js').then(({cases,getCaseById})=>console.log({ count: cases.length, hasGetter: typeof getCaseById === 'function', demoFound: Boolean(getCaseById(cases[0]?.id)) }))"
```

## Build status

The semantic QA and Node syntax/import checks passed. `npm install` could not complete in this sandbox because package fetching from the configured registry timed out repeatedly, so `npm run build` could not be completed here because `vite` was not installed into `node_modules`. No successful Vite production build is claimed in this report.

## Run commands

```bash
npm install
npm run build
npm run dev
```

Optional QA command:

```bash
node scripts/clinical-field-placement-qa.mjs
```
