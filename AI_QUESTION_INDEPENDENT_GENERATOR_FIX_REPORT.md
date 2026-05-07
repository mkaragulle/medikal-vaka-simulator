# AI ile Soru Üret — Bağımsız Generator ve Anti-Repeat Düzeltmesi

## Uygulanan ana değişiklikler

- `AI ile Soru Üret` akışı mevcut gömülü vakaları random case picker gibi göstermeyecek şekilde yeniden düzenlendi.
- Gömülü vakalardan türetilen kaynaklar artık `case-derived` kopya obje olarak değil, yalnızca `embedded-case-concept-only` soyut öğrenme hedefi olarak kullanılıyor.
- Üretilen soru ID sistemi `ai-spot-*` formatına taşındı; `crypto.randomUUID()` destekleniyorsa kullanılıyor, yoksa timestamp + sequence counter + random fallback uygulanıyor.
- Her soru için içerik imzası, konu imzası, seçenek seti imzası ve generation signature hesaplanıyor.
- Önceki AI sorularına ve mevcut gömülü vaka havuzuna karşı duplicate/near-duplicate kontrolü eklendi.
- Local fallback artık mevcut gömülü vakayı göstermiyor. Güvenli yeni soru üretilemezse UI hata durumu gösteriyor.
- AI soru ekranında `key={question.id}` ile yeni soru geldiğinde CasePlayer state’i temiz şekilde remount ediliyor.

## 50 ardışık üretim testi

Node tabanlı in-memory context testi çalıştırıldı:

- Üretilen soru sayısı: 50
- Benzersiz ID: 50/50
- Benzersiz içerik signature: 50/50
- Benzersiz topic signature: 50/50
- Mevcut gömülü vakalarla tespit edilen overlap: 0
- Pre-answer doğrudan doğru cevap sızıntısı: 0

## Syntax/build durumu

Başarılı syntax kontrolleri:

- `src/utils/aiQuestionHistory.js`
- `src/utils/questionDeduplication.js`
- `src/utils/aiQuestionGenerator.js`
- `src/utils/validateAIQuestion.js`
- `src/services/aiQuestionService.js`

`npm run build` ilk denemede çalışmadı çünkü ZIP içinde `node_modules` yoktu ve `vite` kurulu değildi. `npm install` denemeleri ortamda paket indirme sırasında timeout’a düştü. Kod tarafında modül syntax kontrolleri ve 50 üretim testi başarıyla tamamlandı.

## Çalıştırma komutları

```bash
npm install
npm run build
npm run dev
```
