# KlinikIQ Editorial Turkish Medical Standard Summary

Generated at: 2026-05-07T16:17:01.709Z

## Scope

Project-wide editorial cleanup for embedded case data, AI question seed data, runtime AI quality gate, feedback rendering, and Turkish medical terminology normalization.

## Counts

- Embedded cases reviewed: 132
- Embedded cases with direct text edits: 43
- Data string fields changed: 326
- Bad-pattern scan result: 0

## Main changes

- Removed repeated in-text labels such as “Sınav incisi |”, “Ayırıcı nokta:”, “Mekanizma:”, “Karar verdirici ipucu:” and “Destekleyici kanıt:”.
- Converted unnecessary pipes, semicolons and label-like colon usage into natural Turkish sentences.
- Normalized English terms such as “wheezing”, “rash”, “airway”, “screening”, “follow-up”, “management”, “trigger” and “tripod position”.
- Added reusable editorial utilities: normalizeMedicalTurkish, removeRepeatedSectionLabel, removeUnnecessaryColonUsage, replaceUnnecessaryEnglishTerms, detectTemplateLanguage, detectBrokenSentence, repairEditorialQuality and validateFeedbackTextQuality.
- Hardened AI quality gate so generated questions are repaired and validated before display.
- Updated feedback rendering fallbacks so renderer-generated text no longer introduces “Karar verdirici ipucu:” or “benzer seçenekleri ayıran ana patern” style templates.

## Validation

- JS syntax check passed.
- Data import check passed.
- AI question generator smoke test passed with validateAIQuestionCase ok=true.
- Bad-pattern scanner returned 0 residual matches.
- Full Vite build could not be completed inside this container because dependencies were not installed and npm install could not complete offline; npm run build reported “vite: not found”.

## Additional runtime guard

- api/generate-ai-question.js now rejects remote AI payloads containing repeated section labels, pipe-based labels, template language, or unnecessary English terms before they reach the frontend normalization layer.
- src/utils/aiBranchRules.js was also normalized to avoid visible “wheezing” wording in branch-aware templates.
