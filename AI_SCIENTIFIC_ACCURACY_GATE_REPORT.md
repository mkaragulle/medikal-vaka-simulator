# KlinikIQ AI Scientific Accuracy Gate Report

## Root cause
The AI question pipeline already had schema, readability, answer-leakage, and generic quality checks, but it did not have a deterministic clinical rule layer for high-risk “first treatment / first step” questions. When a remote or generated AI answer selected a clinically plausible later treatment, such as insulin + glucose in ECG-positive severe hyperkalemia, the previous gate could still accept the item because the object shape and general feedback looked valid.

## Added gate layer
A new `scientificAccuracyGate(generatedQuestion)` layer was added. It runs after candidate generation and before rendering/validation acceptance. It checks high-risk clinical rules, answer-feedback consistency, self-consistency clinical solving, and Turkish terminology quality. When a repair is possible, `repairScientificAccuracy(question)` normalizes the wording and rewrites high-risk cases into clinically correct, TUS-focused items.

## Pipeline integration
The pipeline now follows this order in practice:

```txt
generateCandidateQuestion
→ normalize/repair clinical wording
→ scientific accuracy repair
→ high-risk clinical rule validation
→ answer-feedback consistency validation
→ Turkish terminology/template-garbage validation
→ self-consistency clinical validation
→ existing answer-leakage/schema/quality validation
→ render only if accepted
```

Remote AI outputs are no longer validated with `skipQuality: true`; they are passed through the quality gate before being shown.

## High-risk clinical rule list
1. Hiperkalemi ve EKG değişiklikleri
2. Anafilaksi / perioperatif anafilaksi
3. DKA ve potasyum
4. Hipoglisemi acil tedavisi
5. Sepsis / septik şok
6. Pulmoner emboli stabil vs instabil ayrımı
7. ACS / STEMI ilk yaklaşım
8. İnme ve tromboliz öncesi görüntüleme
9. Menenjit ampirik tedavi ve LP öncesi kontrendikasyonlar
10. Status epileptikus tedavi sırası
11. Akut astım / KOAH alevlenmesi
12. Hiperkalsemi / hipokalsemi acil yaklaşım
13. Zehirlenmelerde antidot soruları
14. Obstetrik aciller
15. Pediatrik kırmızı bayraklar

The first implemented hard-stop rules cover hyperkalemia, anaphylaxis, DKA, and stroke/trombolysis context. The full list is exported as `highRiskClinicalRules` for extension.

## Hyperkalemia rule
If a generated question contains severe hyperkalemia context, especially K⁺ ≥ 6.5 mEq/L and/or ECG changes such as sivri T dalgaları, PR uzaması, QRS genişlemesi, sine-wave pattern, bradycardia, conduction disorder, or ventricular arrhythmia, and asks for “ilk tedavi / ilk basamak / acil yaklaşımda ilk seçenek”, the accepted answer must be intravenous calcium gluconate or equivalent cardiac membrane stabilization.

The gate rejects insulin + glucose as the first answer in this context. It keeps insulin + glucose as a correct subsequent potassium-shifting treatment and explains that distinction explicitly.

## Corrected hyperkalemia example
**Başlık:** Hiperkalemi ve EKG değişikliği

**Soru:** Hipertansiyon ve kalp yetmezliği nedeniyle spironolakton kullanan 45 yaşındaki erkek hasta, halsizlik ve kas güçsüzlüğü yakınmasıyla acil servise başvurur. Serum potasyumu 6.8 mEq/L saptanır. EKG’de sivri T dalgaları ve QRS genişlemesi görülür. Bu hastada uygulanması gereken ilk tedavi basamağı aşağıdakilerden hangisidir?

**Şıklar:**
A. Sodyum bikarbonat infüzyonu  
B. Diyaliz  
C. Albuterol inhalasyonu  
D. İntravenöz kalsiyum glukonat  
E. İntravenöz insülin + glukoz

**Doğru cevap:** D. İntravenöz kalsiyum glukonat

**Feedback standardı:** EKG bulgulu ciddi hiperkalemide ilk amaç kardiyak membranı stabilize etmektir. İntravenöz kalsiyum glukonat aritmi riskini hızla azaltır. İntravenöz insülin + glukoz potasyumu hücre içine kaydırır; fakat EKG değişikliği varken ilk basamak kalsiyumdur.

## Turkish terminology gate
The gate rejects or repairs weak terminology and broken Turkish such as:
- “T dalgaları tepelemiş” → “sivri T dalgaları”
- “Tall T” → “sivri T dalgaları”
- “widened QRS” → “QRS genişlemesi”
- “insulin+glucose” → “intravenöz insülin + glukoz”
- “Dializ” → “Diyaliz”
- “Ca++” → “kalsiyum / kalsiyum glukonat”
- template garbage such as “Bazı klinik durumlarda gündeme gelebilir” and “Bu seçeneği tek başına yeterli kılmaz”

## Feedback consistency gate
`answerFeedbackConsistencyGate(question)` rejects contradictions between:
- correct answer,
- spot pearl,
- clinical rationale,
- evidence chain,
- management steps,
- wrong-option feedback.

For example, if the answer is insulin + glucose but the feedback states that ECG-positive hyperkalemia should first receive calcium, the item is rejected.

## Self-consistency validation
The validator independently solves high-risk generated questions. If the validator’s deterministic answer differs from the generator’s answer, the item is rejected or repaired before rendering.

## Test results
`npm run qa:ai-scientific-accuracy` completed successfully.

Summary from `AI_SCIENTIFIC_ACCURACY_100_TEST_RESULT.json`:
- High-risk clinical rule count: 15
- Faulty hyperkalemia case rejected: true
- Repaired hyperkalemia case accepted: true
- Repaired hyperkalemia answer: İntravenöz kalsiyum glukonat
- Generated AI question count: 100
- Passed: 100
- Failed: 0

## Build/test status
- `node --check src/utils/clinicalScientificAccuracyGate.js`: passed
- `node --check src/utils/aiQuestionQualityGate.js`: passed
- `node --check src/services/aiQuestionService.js`: passed
- `node --check scripts/run-ai-scientific-accuracy-100-test.mjs`: passed
- `npm run qa:ai-scientific-accuracy`: passed, 100/100
- `npm install`: attempted, but dependency installation timed out in the sandbox before `node_modules` and Vite could be installed.
- `npm run build`: could not be completed in the sandbox because `vite` was not installed (`vite: not found`). On a local machine, run `npm install` first.

## Changed files
- `src/utils/clinicalScientificAccuracyGate.js` — new scientific accuracy/high-risk clinical rule module
- `src/utils/aiQuestionQualityGate.js` — integrated scientific repair and validation into the existing quality gate
- `src/services/aiQuestionService.js` — remote AI outputs now pass quality validation instead of `skipQuality: true`
- `src/components/AnswerFeedbackPanel.jsx` — replaced mechanical feedback labels and weak fallback wording
- `scripts/run-ai-scientific-accuracy-100-test.mjs` — new 100-question scientific accuracy QA script
- `package.json` — added `qa:ai-scientific-accuracy` script
- `AI_SCIENTIFIC_ACCURACY_100_TEST_RESULT.json` — generated test result
- `AI_SCIENTIFIC_ACCURACY_GATE_REPORT.md` — this report

## Run commands
```bash
npm install
npm run build
npm run dev
npm run qa:ai-scientific-accuracy
```
