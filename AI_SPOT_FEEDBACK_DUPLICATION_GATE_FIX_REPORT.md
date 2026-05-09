# AI Spot Feedback Duplication Gate Fix

## Problem
AI ile üretilen TUS Spot sorularında cevap sonrası feedback alanında aynı bilgi farklı kartlarda tekrar ediyordu. Özellikle Klinik gerekçe, TUS işareti/Spot bilgi, chipler ve Sınav notu aynı doğru cevap veya aynı ilk yaklaşım bilgisini yeniden yazabiliyordu. Bu durum anafilaksi örneğinde epinefrin, IM uygulama ve doz bilgisinin hem paragraf hem chip hem de spot bilgi içinde tekrar görünmesine neden oluyordu.

## Root cause
`AnswerFeedbackPanel` içinde `resolveExamSignal` çıktısı doğrudan ayrı bir `TUS işareti / Spot bilgi ve anahtar kelimeler` kartı olarak basılıyordu. Aynı zamanda `derivePearls` fonksiyonu klinik gerekçeye çok benzeyen pearl cümleleri üretebiliyor veya feedback içinden tekrar çekebiliyordu. Arada semantik tekrar, uzun chip, zayıf chip veya doğru cevabın fazla kez tekrarlanmasını engelleyen merkezi bir gate yoktu.

## Implemented solution
A new central `feedbackDuplicationGate` was added in `src/utils/feedbackDuplicationGate.js`.

The gate:
- removes duplicate or near-duplicate exam-note sentences,
- reduces keyword chips to at most 3,
- normalizes weak chips such as `IM önerisi`, `Epinefrin 0.3 mg`, and long clue phrases,
- suppresses pearl cards when they repeat the clinical reasoning or the exam note,
- keeps clinical reasoning, exam note, evidence chain, management and option comparison as separate content functions,
- keeps answer-leakage-sensitive and treatment-order-sensitive anaphylaxis wording compact.

## UI hierarchy after fix
The feedback sequence is now cleaner:

1. Klinik gerekçe
2. Sınav notu / Kritik hatırlatma
3. Kanıt zinciri
4. Yönetim if needed
5. Seçenek karşılaştırması

The old large `TUS işareti / Spot bilgi ve anahtar kelimeler` card was renamed and simplified to `Sınav notu / Kritik hatırlatma`.

## Chip rules
- Maximum 3 chips.
- No repeated chip concepts.
- No long sentence-like chips.
- Weak chips like `IM önerisi`, `Epinefrin 0.3 mg`, `3 mg` are removed or normalized.
- Good chips are short, high-yield cues such as `IM epinefrin`, `Hipotansiyon`, `Bronkospazm`, `Anti-dsDNA↑`, `C3/C4↓`.

## Example: anaphylaxis
Before:
- Clinical reasoning repeated epinephrine/IM/0.3 mg.
- Spot bilgi repeated the same first-step statement.
- Chips repeated `IM önerisi`, `Epinefrin 0.3 mg`, and dose fragments.

After:
- Clinical reasoning explains why the case is anaphylaxis and why epinephrine is first-line.
- Exam note is one compact rule: `Anafilaksi kuralı: Hipotansiyon veya solunum bulgusu varsa ilk ilaç IM epinefrindir; oksijen, sıvı ve ek ilaçlar bunu izler.`
- Chips are reduced to compact cues such as `Hipotansiyon`, `Bronkospazm`, `IM epinefrin`.

## Changed files
- `src/utils/feedbackDuplicationGate.js` — new central duplicate feedback gate.
- `src/components/AnswerFeedbackPanel.jsx` — feedback hierarchy updated; old TUS işareti card replaced with compact exam-note card; duplicate pearl rendering suppressed for spot questions.
- `src/index.css` — compact exam-note card and chip styling added for light/dark/mobile.
- `api/generate-ai-question.js` — AI prompt strengthened to prevent duplicate feedback and weak chips at generation time.
- `scripts/run-ai-feedback-duplication-gate-test.mjs` — new QA test for anaphylaxis and SLE duplication scenarios.
- `package.json` — new QA command: `qa:ai-feedback-duplication`.

## QA
Commands run successfully:

```bash
npm run build
npm run qa:ai-feedback-duplication
npm run qa:ai-spot-render-layout
npm run qa:ai-spot-readability
npm run qa:ai-spot-duplicate-data
```

## Run commands
```bash
npm install
npm run build
npm run dev
```
