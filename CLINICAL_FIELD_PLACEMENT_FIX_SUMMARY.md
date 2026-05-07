# KlinikIQ Clinical Field Placement Fix

## Kök neden

Alan karışması iki noktadan kaynaklanıyordu:

1. AI üretim hattında `evidenceChain`, `patientIntro.distinctiveClues` ve bazı feedback alanları semantik tip kontrolünden geçmeden UI'a taşınıyordu. Bu nedenle laboratuvar, görüntüleme ve fizik muayene bulguları bazen “Başvuru yakınması” etiketiyle veya ayırt ettirici ipuçları içinde veri çöplüğü gibi görünüyordu.
2. Gömülü vaka verilerinde bazı eski seed/template metinleri klinik veri tipini başlıkla karıştırıyordu. Örneğin `Lökosit 16` başvuru verisi gibi, `raller` kanıt zinciri içinde başvuru etiketiyle veya `akciğer grafisi` ayırt ettirici ipucu olarak ham biçimde yer alabiliyordu.

## Eklenen alan sınıflandırma kuralları

- Başvuru yakınması yalnızca hasta/yakınının ifade ettiği semptom ve yakınmaları içerir.
- Fizik muayene yalnızca hekim tarafından muayenede saptanan bulguları içerir.
- Tetkik/laboratuvar alanı sayısal laboratuvar, seroloji, mikrobiyoloji, BOS, idrar ve biyokimya verilerini içerir.
- Görüntüleme bulguları tetkik/görüntüleme alanında kalır.
- Ayırt ettirici ipuçları en fazla 3-5 kısa, karar verdirici ipucuyla sınırlandırılır.
- Inline etiketler bullet içinde kullanılmaz: “Başvuru yakınması:”, “Laboratuvar paterni:”, “Görüntüleme bulgusu:”, “Fizik muayene bulgusu:” vb.
- Eksik ölçüm ifadeleri normalize edilir: `Lökosit 16` → `Lökosit 16.000/mm³`, `CRP 92` → `CRP 92 mg/L`.

## AI quality gate kontrolleri

- `chiefComplaint` içinde laboratuvar/görüntüleme/muayene verisi varsa repair veya reject uygulanır.
- `findings.exam` içinde tetkik verisi varsa muayene alanından çıkarılır ve tetkik alanına taşınır.
- `evidenceChain` başlıkları metnin klinik tipine göre yeniden sınıflandırılır.
- `patientIntro.distinctiveClues` içindeki inline etiketler kaldırılır ve ipuçları dedupe edilir.
- `riskContext` içinde objektif laboratuvar/görüntüleme/muayene bulgusu kalmaması sağlanır.
- AI payload validasyonunda alan karışması varsa soru kullanıcıya gösterilmeden repair/reject döngüsüne alınır.

## Kontrol edilen veri sayısı

- Gömülü vaka: 132 kontrol edildi, 132'sinde alan sınıflandırma standardı uygulandı.
- AI seed/template/fallback item: 30 kontrol edildi, 30'una aynı standart uygulandı.
- Eklenen repair kuralı: 8.
- Final field-placement validation error: 0.

## Değiştirilen dosyalar

- `src/utils/clinicalFieldPlacement.js`
- `src/utils/aiQuestionQualityGate.js`
- `src/utils/validateAIQuestion.js`
- `src/utils/editorialQuality.js`
- `src/components/AnswerFeedbackPanel.jsx`
- `src/components/CasePlayer.jsx`
- `api/generate-ai-question.js`
- `src/data/cases.js`
- `src/data/aiQuestionSeeds.js`
- `src/data/aiBranchQuestionTemplates.js`
- `src/data/aiSyntheticFallbackTemplates.js`
- `scripts/fix-clinical-field-placement.mjs`
- `scripts/fix-clinical-field-placement-fast.mjs`
- `CLINICAL_FIELD_PLACEMENT_REPAIR_REPORT.json`

## Test sonucu

Geçen kontroller:

- `src/data/cases.js` import edildi.
- `validateClinicalFieldPlacement` 132 vaka için çalıştırıldı ve 0 hata verdi.
- `src/utils/aiQuestionQualityGate.js` import edildi.
- `src/utils/validateAIQuestion.js` import edildi.
- `api/generate-ai-question.js` syntax check geçti.
- AI soru üretimi smoke test geçti: `validateAIQuestionCase=true`, `validateAIQuestionQuality=true`.
- `src/data` içinde sorunlu inline label ve `wheezing` taraması temiz çıktı.

Build notu:

- `npm run build` bu sandbox ortamında tamamlanamadı çünkü ZIP içinde `node_modules` yoktu ve `npm install` sandbox süresinde tamamlanamadı. Hata: `vite: not found`.
- Yerel makinede bağımlılıklar kurulduktan sonra build şu komutla çalıştırılmalıdır: `npm run build`.

## Çalıştırma komutları

```bash
npm install
npm run build
npm run dev
```
