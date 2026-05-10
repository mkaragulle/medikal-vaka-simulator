# KlinikIQ Final AI Question Safety Gate Delivery

## Scope
This package strengthens the `AI ile Soru Üret` pipeline without changing the visual identity, color palette, layout hierarchy, or main component workflow. The changes focus on generated question quality, semantic repetition, one-best-answer logic, source-bound evidence, feedback sanitization, and text readability.

## Changed files
- `api/generate-ai-question.js`
- `src/utils/finalAIQuestionSafetyGate.js`
- `src/utils/aiQuestionQualityGate.js`
- `src/index.css`
- `scripts/run-final-ai-question-safety-gate-test.mjs`
- `package.json`

## What was added
- Final AI question safety gate: `finalAIQuestionSafetyGate.js`
- `answerTarget`-aware repair and validation
- `optionClinicalRoles`-aware feedback repair
- Double-correct ambiguity detection
- Option category consistency validation
- Source-bound evidence normalization with typed labels
- Generic feedback phrase removal
- Truncation and incomplete sentence detection
- Compact data panel deduplication
- Semantic fingerprint generation
- Final `qualityFlags` metadata

## How repetition is reduced
Every generated question receives a stable `semanticFingerprint`. The final safety gate also deduplicates support data rows, evidence items, feedback sentences, and repeated wrong-option rationales. The existing remote diversity gate remains active, and this layer adds a final content-level check after model output repair.

## How double-correct ambiguity is handled
The system now checks whether incorrect options are actually adjacent, adjunct, or later-step options in the same clinical context. If a generic stem is detected together with co-valid roles, the question stem is narrowed to the specific decision target instead of allowing a broad “en uygun yaklaşım” style question.

## How wrong-label evidence is handled
Evidence is normalized into typed, source-bound lines:
`Veri: [Öykü/Muayene/Vital/Laboratuvar/Seroloji/Görüntüleme/EKG/Mikrobiyoloji/Mekanizma] — [short clue]. Anlamı: [clinical meaning].`
Items weakly tied to the stem/support data are removed and replaced from actual visible case data.

## How generic feedback is cleaned
The final gate removes or rewrites generic phrases such as empty “different clinical table” explanations, unsupported “clinical context” phrases, and repetitive “correct answer” formulas. Wrong-option feedback is regenerated according to `clinicalRole`: primary correct, adjunct-but-not-asked, later step, wrong condition, unrelated, or harmful.

## How incomplete text is caught
`detectTruncatedText()` rejects ellipsis, missing terminal punctuation, conjunction endings, single-letter endings, and common cut medical word fragments. This is applied to explanation, exam pearl, evidence, management, and option feedback.

## How right-panel readability is handled
The existing support-data layout is preserved, but the final CSS guard prevents AI support data and feedback text from being hidden with ellipsis or line clamp. Long labels and values wrap inside the existing cards.

## Quality gates in order
1. Scientific accuracy gate
2. TUS language standard
3. Answer leakage gate
4. Feedback quality standard
5. Single-best-answer gate
6. Final AI question safety gate
7. Remote diversity/near-duplicate gate
8. Safe fallback pool when remote output fails

## Test results
Executed successfully in the sandbox using an existing local dependency cache:

```bash
npm run qa:final-ai-question-safety
npm run qa:single-best-answer-gate
npm run qa:feedback-quality-standard
npm run qa:ai-spot-support-data-readability
npm run build
```

All listed commands passed.

## Runtime commands
```bash
npm install --package-lock=false --legacy-peer-deps --no-audit --no-fund
npm run build
npm run dev
```

## GitHub/Vercel note
Do not commit `.env`, `.env.local`, `.env.production`, `.vercel`, `dist`, or `node_modules`. Keep the OpenAI API key only in Vercel Environment Variables.
