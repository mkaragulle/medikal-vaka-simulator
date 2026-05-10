# KlinikIQ Feedback Quality Standard Update

## Kapsam
Bu güncelleme, tasarım sistemine dokunmadan AI ile üretilen TUS spot soru feedback alanlarının daha kısa, tutarlı, öğretici ve profesyonel Türkçe ile dönmesini hedefler.

## Tasarım notu
CSS, layout, renk, spacing, grid, radius, shadow ve animasyon katmanları değiştirilmedi. Değişiklikler metin standardizasyonu, validator mantığı, server-side kalite kapısı ve render edilen feedback metinlerinin temizlenmesiyle sınırlıdır.

## Değiştirilen dosyalar
- `api/generate-ai-question.js`
- `src/utils/feedbackQualityStandard.js`
- `src/utils/aiQuestionQualityGate.js`
- `src/components/AnswerFeedbackPanel.jsx`
- `scripts/run-feedback-quality-standard-test.mjs`
- `package.json`

## Eklenen global kalite katmanı
`src/utils/feedbackQualityStandard.js` dosyası eklendi. Bu katman şu alanları konu bağımsız biçimde standardize eder:

- Klinik gerekçe
- Kanıt zinciri
- TUS işareti / sınav notu
- Yönetim adımları
- Doğru ve yanlış seçenek açıklamaları
- `diagnosis.answerFeedback` altındaki paralel alanlar

## Yeni kontroller
- Mekanik başlık kırıntısı temizleme
- Boş şablon feedback cümlelerini yakalama
- Yarım cümle kontrolü
- Kanıt zinciri minimum içerik kontrolü
- Seçenek açıklaması uzunluk ve özgüllük kontrolü
- Alanlar arası cümle tekrarını azaltma
- Cevap sonrası açıklamada aynı bilginin gereksiz yinelenmesini azaltma

## API pipeline değişikliği
Server-side kalite kapısı artık klinik/tıbbi doğruluk ve TUS dili düzeltmesinden sonra feedback standardını da uygular:

`repairScientificAccuracy → applyTusLanguageStandardToQuestion → applyFeedbackQualityStandardToQuestion → validateFeedbackQualityStandard`

Bu sayede model geçerli JSON üretse bile şablon, yarım, tekrarlı veya zayıf feedback kullanıcıya doğrudan gösterilmez.

## Prompt değişikliği
AI soru üretim promptuna topic-agnostic feedback standardı eklendi. Prompt; explanation, evidenceChain, examPearl, managementSteps ve wrongOptionFeedback alanlarının görevlerini birbirinden ayırır ve tekrar eden şablon cümleleri yasaklar.

## Render katmanı değişikliği
`AnswerFeedbackPanel.jsx` içinde kanıt ve seçenek karşılaştırması fallback metinleri daha doğal hale getirildi. Varsayılan mekanik etiketler azaltıldı; seçenek karşılaştırmasında boş ve tekrarlı ifadeler yerine kısa, olgu ipucuna bağlı açıklama tercih edildi.

## Test sonucu
Çalıştırılan testler:

```bash
npm run build
npm run qa:feedback-quality-standard
npm run qa:ai-feedback-duplication
npm run qa:ai-ui-generation-resilience
npm run qa:ai-scientific-regression
npm run qa:pearl-active-recall-language
npm run qa:ai-spot-duplicate-data
```

Sonuç:

- Build: PASS
- Feedback quality standard: PASS
- AI feedback duplication gate: PASS
- AI UI generation resilience: PASS
- AI scientific regression: PASS
- Hap Bilgi active recall language: PASS
- AI spot duplicate data gate: PASS

Not: Uzun süreli worker tabanlı bazı 100 üretim testleri bu çalışma ortamında zaman sınırına takıldığı için final rapora PASS olarak yazılmadı. Yukarıdaki çekirdek kalite ve build testleri başarıyla tamamlandı.

## Çalıştırma komutları
```bash
npm install
npm run build
npm run dev
```

Ek kalite testi:
```bash
npm run qa:feedback-quality-standard
```
