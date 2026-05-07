# KlinikIQ AI Soru Deduplication Rework Report

## Amaç

`AI ile Soru Üret` modülünde yalnızca teknik `id` farklılığına dayanan tekrar önleme mantığı güçlendirildi. Her yeni AI sorusu artık kullanıcıya gösterilmeyen gizli bir `contentSignature` taşır ve kullanıcıya render edilmeden önce hem oturum geçmişi hem de gömülü vaka havuzu ile karşılaştırılır.

## Yapılan ana değişiklikler

1. `id` ve `contentSignature` ayrıldı.
   - `id`: React render/state için teknik benzersiz ID.
   - `contentSignature`: sorunun branş, öğrenme hedefi, başlık, stem, soru kökü, doğru cevap metni, şık seti, kanıt zinciri ve sınav notundan türetilen gizli içerik imzası.

2. `questionDeduplication.js` yeniden güçlendirildi.
   - Exact content signature match.
   - Stem/question benzerlik kontrolü.
   - Option-set + correct answer + learning target overlap kontrolü.
   - Combined semantic similarity kontrolü.
   - Embedded 132 vaka ile overlap kontrolü.
   - Cached embedded-case fingerprint sistemi.

3. `aiQuestionHistory.js` v5 storage yapısına geçirildi.
   - Son ID'ler, content signature'lar, topic signature'lar ve detaylı history item'ları tutulur.
   - Browser localStorage varsa kullanılır.
   - Test/SSR ortamında memory fallback ile sistem kırılmaz.
   - History artık stem, question, optionSet, correct answer, learningTarget ve combinedText içerir.

4. Generator çıktıları zenginleştirildi.
   - Her soru `contentSignature`, `dedupeKey`, `semanticFingerprint`, `generationSignature` ve `aiMeta.contentSignature` alanlarını taşır.
   - Bu alanlar sistem içidir ve UI'da gösterilmez.

5. UI temizlendi.
   - `AIGeneratedQuestionView.jsx` içindeki “Tekrar imzası” chip'i kaldırıldı.
   - İmza/debug alanları kullanıcıya gösterilmez.

## Duplicate check algoritması

Yeni aday soru şu sırayla değerlendirilir:

1. Aday soruya content signature eklenir.
2. Son üretilen AI sorularının ID/signature geçmişiyle exact match kontrol edilir.
3. Recent history içindeki stem, question, option set, correct answer ve learning target benzerliği hesaplanır.
4. Combined semantic similarity eşiği aşılırsa aday reddedilir.
5. Embedded case fingerprint havuzuyla karşılaştırılır.
6. Duplicate/overlap yoksa soru kullanıcıya gösterilir ve history'ye kaydedilir.
7. Duplicate varsa generator sonraki seed/attempt kombinasyonuna geçer; kullanıcı duplicate adayı görmez.

## 50 ardışık üretim testi

Test komutu, local generator ile 50 ardışık random soru üretti ve her soruyu history'ye kaydetti.

Sonuç:

```txt
Üretilen soru: 50
Benzersiz id: 50/50
Benzersiz contentSignature: 50/50
Benzersiz generationSignature: 50/50
Stem/question/combined similarity eşiğini aşan tekrar: 0
Kullanıcıya gösterilen teknik imza/debug alanı: 0
```

## Build/test notu

- `node --check` kontrolleri başarılıdır:
  - `src/utils/aiQuestionHistory.js`
  - `src/utils/questionDeduplication.js`
  - `src/utils/aiQuestionDeduplication.js`
  - `src/utils/aiQuestionGenerator.js`
  - `src/utils/validateAIQuestion.js`
  - `src/services/aiQuestionService.js`
- `npm install` bu çalışma ortamında timeout'a düştüğü için `npm run build` Vite eksikliği nedeniyle tamamlanamadı.
- Yerel ortamda çalıştırma sırası:

```bash
npm install
npm run build
npm run dev
```
