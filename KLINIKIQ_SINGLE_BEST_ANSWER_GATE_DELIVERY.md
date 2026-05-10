# KlinikIQ Single-Best-Answer Quality Gate Delivery

Date: 2026-05-10

## Scope

This update strengthens the AI question-generation pipeline without changing the visual design system. It focuses on single-best-answer reliability, clinical target specificity, co-valid option handling, role-aware wrong-option feedback, and source-bound evidence formatting.

## Design Boundary

No CSS, color palette, spacing system, animation pattern, card hierarchy, or UI layout redesign was performed. The only component-level change is a fallback text cleanup in the answer feedback renderer to avoid generic non-teaching phrasing.

## Main Changes

1. Added `src/utils/singleBestAnswerGate.js`.
2. Added `answerTarget` support to the AI JSON schema.
3. Added `optionClinicalRoles` support to the AI JSON schema.
4. Integrated the gate into `api/generate-ai-question.js`.
5. Integrated the gate into `src/utils/aiQuestionQualityGate.js`.
6. Repaired generic wrong-option fallback language in `src/components/AnswerFeedbackPanel.jsx`.
7. Added `scripts/run-single-best-answer-gate-test.mjs`.
8. Added `npm run qa:single-best-answer-gate`.

## New Quality Fields

### answerTarget

Supported values:

- `first_life_saving_step`
- `symptom_control`
- `mechanism_targeted_treatment`
- `definitive_treatment`
- `diagnostic_first_test`
- `confirmatory_test`
- `long_term_management`
- `complication_management`
- `prevention_or_prophylaxis`
- `mechanism_explanation`

### optionClinicalRoles

Supported values:

- `primary_correct`
- `adjunct_correct_but_not_asked`
- `later_step`
- `wrong_condition`
- `unrelated`
- `contraindicated_or_harmful`

## What the Gate Fixes

- Broad question stems are narrowed when they do not force a single best answer.
- Options that may be clinically complementary are no longer treated as simple wrong answers.
- Partly valid wrong options receive nuanced explanations.
- Generic feedback such as “different clinical table” style wording is blocked or rewritten.
- Evidence chain items are normalized to a source-bound `Veri / Anlamı` format.
- Repeated wrong-option feedback is flagged.
- Pre-answer answer leakage is checked against the correct option text.

## Changed Files

- `api/generate-ai-question.js`
- `src/utils/aiQuestionQualityGate.js`
- `src/utils/singleBestAnswerGate.js`
- `src/components/AnswerFeedbackPanel.jsx`
- `scripts/run-single-best-answer-gate-test.mjs`
- `package.json`
- `KLINIKIQ_SINGLE_BEST_ANSWER_GATE_DELIVERY.md`

## Test Results

Passed:

```bash
npm run qa:single-best-answer-gate
npm run qa:feedback-quality-standard
npm run qa:ai-spot-duplicate-data
npm run qa:ai-spot-support-data-readability
npm run qa:ai-scientific-regression
npm run qa:ai-ui-generation-resilience
npm run build
```

Build passed with Vite.

## Deployment Notes

Required Vercel environment variables remain the same for OpenAI-only question generation:

```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-5.4-mini
DEFAULT_GENERATOR_MODEL=gpt-5.4-mini
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MAX_OUTPUT_TOKENS=2600
OPENAI_PER_REQUEST_TIMEOUT_MS=28000

AI_ENABLE_SAFE_FALLBACK=true
REMOTE_AI_ATTEMPTS=2
AI_DEBUG_USAGE_LOGS=false

VITE_ENABLE_REAL_AI=true
VITE_AI_QUESTION_ENDPOINT=/api/generate-ai-question
VITE_AI_REQUEST_TIMEOUT_MS=90000
VITE_AI_REMOTE_RETRY_COUNT=1
```

The real API key must only be stored in Vercel Environment Variables and must not be committed to GitHub.

## Run Commands

```bash
npm install --package-lock=false --legacy-peer-deps --no-audit --no-fund
npm run build
npm run dev
```
