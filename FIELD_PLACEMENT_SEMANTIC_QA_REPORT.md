# KlinikIQ Clinical Field Placement QA Report

## Root cause

AI-generated and embedded case content used free-text evidence and patient-summary arrays without a semantic field-placement layer. As a result, laboratory, imaging and physical-exam findings could be placed under generic labels such as “Başvuru yakınması” or mixed into `patientIntro.distinctiveClues` without normalization.

## Added field-classification rules

A new global utility was added at `src/utils/clinicalFieldPlacement.js`.

It classifies clinical text into these semantic types:

- `chiefComplaint`
- `history`
- `physicalExam`
- `vital`
- `lab`
- `imaging`

It also removes inline labels such as:

- `Başvuru yakınması:`
- `Karar verdirici ipucu:`
- `Destekleyici kanıt:`
- `Laboratuvar paterni:`
- `Görüntüleme bulgusu:`
- `Fizik muayene bulgusu:`

## Repair behavior

The repair layer now:

- strips inline field labels from summary, evidence and clue text;
- prevents lab/imaging data from staying inside `exam`;
- moves misplaced lab or imaging content from exam-like arrays into `investigations` when needed;
- normalizes short incomplete lab phrases such as `Lökosit 16.` into `Nötrofil baskın lökositoz`;
- retitles evidence-chain items according to their actual clinical type;
- deduplicates repeated evidence-chain items;
- keeps `patientIntro.distinctiveClues` as a compact 3–5 item decision clue list rather than a raw data dump.

## AI quality gate integration

`repairMisplacedClinicalData(caseItem)` now runs inside the AI repair pipeline before the final generated case is returned.

`validateClinicalFieldPlacement(caseItem)` now runs inside the AI quality gate. A generated AI question fails the quality gate if:

- chief complaint contains lab, imaging or vital data;
- physical exam contains lab or imaging data;
- distinctive clues contain inline labels such as `Başvuru yakınması:`;
- evidence-chain title and evidence text disagree, such as a physical exam finding under `Laboratuvar`;
- short incomplete lab phrases such as `Lökosit 16.` remain.

## Embedded case QA result

- Embedded cases checked: 132
- Cases repaired by semantic pass: 132
- Patient clue blocks normalized: 132
- Evidence-chain blocks normalized: 132
- Misplaced exam findings moved or removed from exam field: 67
- Final field-placement validation errors: 0
- Final field-placement validation warnings: 0

## AI generation QA result

The AI generation smoke test was run in two 25-question batches because the sandbox command timeout is short.

- Total AI questions generated: 50
- Generation exceptions: 0
- Field-placement errors: 0
- Batch A unique signatures: 25 / 25
- Batch B unique signatures: 25 / 25

## Build status

- ESM import checks passed.
- `npm install` was attempted but timed out in the sandbox.
- `npm run build` could not complete because `vite` was unavailable before dependency installation completed.

Local commands:

```bash
npm install
npm run build
npm run dev
```
