# KlinikIQ AI feedback fix v2

Bu paket, mevcut tasarım ve ana akışı değiştirmeden AI soru üretim/feedback katmanına küçük kalite kapıları ekler.

## Değişen ana dosyalar
- `api/generate-ai-question.js`
- `src/utils/simpleAIQuestionAdapter.js`
- `src/components/AnswerFeedbackPanel.jsx`

## Eklenen kontroller
- Başlık vaka bağlamıyla kopuk görünürse daha güvenli başlığa çekilir veya çıktı reddedilir.
- Feedbackte hipokalemi/hiperkalemi, hipertansiyon/hipotansiyon, ateş/afebril çelişkileri yakalanır.
- Yarım kalan cümleler ve üç noktalı/kesik metinler filtrelenir.
- Branş-hedef uyumu güçlendirildi; Anatomi, Patoloji ve Biyokimya için güvenli fallback örnekleri eklendi.
- Birim eksikliği için temel vital/laboratuvar kontrolü eklendi.
- TUS ipucu alanında çift başlık (`TUS ipucu: Spot bilgi:`) temizlenir.
- Patoloji sorularında morfoloji/antite belirsizliği reddedilir.

## Kontrol
- `npm run build` başarılı.
- `node scripts/run-simple-ai-pipeline-smoke-test.mjs` başarılı.
- `node scripts/run-feedback-quality-standard-test.mjs` başarılı.
- `node scripts/run-final-ai-question-safety-gate-test.mjs` başarılı.
