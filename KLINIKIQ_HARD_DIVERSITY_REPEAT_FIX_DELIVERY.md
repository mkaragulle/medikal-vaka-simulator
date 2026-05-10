# KlinikIQ Hard Diversity / AI Repeat Fix Delivery

## Amaç
AI ile Soru Üret modülünde aynı başlık, aynı olgu, aynı doğru cevap ve aynı seçenek setinin yalnızca şık sırası değiştirilerek tekrar gösterilmesini engellemek.

## Değiştirilen dosyalar
- `src/services/aiQuestionService.js`
- `src/utils/aiQuestionDiversity.js`
- `api/generate-ai-question.js`
- `scripts/run-ai-hard-diversity-repeat-test.mjs`
- `package.json`

## Ana düzeltmeler
1. Remote AI çıktısı client tarafındaki diversity gate'te başarısız olursa artık advisory/soft warning olarak kabul edilmiyor; hard reject yapılıp yeni deneme isteniyor.
2. Son üretilen sorular listesi prompt içinde açıkça “örnek değil, yasak tekrar penceresi” olarak işaretlendi.
3. Server-side diversity kontrolü `recentSignatures`, `forbiddenOptionSets`, option-set hash, semantic fingerprint, başlık/cevap/olgu benzerliği ve doğru cevap tekrarını daha sıkı denetleyecek şekilde güçlendirildi.
4. Safe fallback havuzu artık diversity gate'i bypass ederek aynı soruyu tekrar gösteremiyor. Uygun fallback bulunamazsa çıktı sessizce reddediliyor ve client tarafı başka üretim/fallback yoluna geçiyor.
5. Emergency/local fallback artık önce geçmişi sıfırlayarak denemiyor; mevcut local/session geçmişini koruyarak üretim yapıyor.
6. Kullanıcının verdiği örneklerin model tarafından kopyalanması/parafrazlanması riskine karşı prompt dili güçlendirildi.

## Testler
Çalıştırılan kontroller:

```bash
npm run qa:ai-hard-diversity-repeat
npm run qa:final-ai-question-safety
npm run qa:single-best-answer-gate
npm run qa:ai-spot-support-data-readability
npm run build
```

Sonuç: PASS.

## GitHub/Vercel notu
- `node_modules`, `dist`, `.env`, `.env.local`, `.vercel` ZIP'e dahil edilmedi.
- Gerçek OpenAI API key yalnızca Vercel Environment Variables içinde tutulmalıdır.
