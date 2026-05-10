# KlinikIQ AI Generation Stall and Contamination Fix

## Scope
This patch targets the AI question generation module without changing the visual design system. It addresses repeated/static fallback questions, cross-topic contamination in options/feedback, branch-specific generation stalls, overly strict local validation loops, and post-answer feedback leakage false positives.

## Main Changes

- Added a hard clinical coherence gate that rejects cross-topic contamination between stem, options, correct answer, evidence, and feedback.
- Removed static example-pool fallback from the server fallback path so prompt examples or emergency examples are not reused as generated questions.
- Increased remote AI retry robustness and made rejected attempts carry rejection causes into the next attempt.
- Added relaxed local fallback only after medical/raw/editorial gates pass, preventing the user from seeing malformed AI output.
- Fixed a missing local generator import/export path that could break emergency fallback.
- Hardened duplicate checks against exact signature, option-set reuse, same correct answer back-to-back, and same title back-to-back.
- Relaxed only the overbroad “same topic” blocker so generation does not stall after a small number of valid questions.
- Fixed false truncation detection for complete Turkish sentences and false “single-letter ending” flags.
- Fixed answer-leakage checks so post-answer teaching fields are not treated as pre-answer spoiler fields in AI spot validation.
- Added English branch aliases for minor rotations so branch requests such as neurology are not treated as random/global generation.
- Fixed branch-history matching for Turkish branch names with diacritics.

## Changed Files

- `api/generate-ai-question.js`
- `src/services/aiQuestionService.js`
- `src/utils/clinicalCoherenceHardGate.js`
- `src/utils/finalAIQuestionSafetyGate.js`
- `src/utils/aiQuestionQualityGate.js`
- `src/utils/aiQuestionDiversity.js`
- `src/utils/aiQuestionGenerator.js`
- `src/utils/answerLeakageGate.js`
- `src/utils/editorialQuality.js`
- `src/utils/aiBranchRules.js`
- `scripts/run-ai-generation-stall-and-contamination-test.mjs`
- `package.json`

## Tests

```bash
npm run qa:final-ai-question-safety
npm run qa:ai-hard-diversity-repeat
npm run qa:ai-generation-stall-guard
npm run build
```

All listed tests passed in the working environment using the available dependency cache.

## Notes

The submitted problematic outputs are not publishable as valid TUS questions: one contains cross-topic contamination between the clinical stem and the answer/feedback; another has a correct answer concept but invalid evidence labels and generic feedback; another has a correct mechanism concept but contaminated evidence and broken option rationales. This patch rejects those patterns globally instead of teaching the model from those examples.
