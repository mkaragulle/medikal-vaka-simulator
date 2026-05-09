# KlinikIQ AI UI Generation Resilience Fix

## Problem
Terminal/API tarafında AI sorusu üretilebilmesine rağmen UI bazen `Uygun soru üretilemedi` ekranına düşüyordu. Bu durum, gerçek üretim başarısızlığından çok frontend tarafındaki ikinci doğrulama zincirinin fazla agresif davranmasından kaynaklanıyordu.

## Kök neden
`src/services/aiQuestionService.js` içinde remote endpoint'ten dönen soru, server tarafında zaten prompt, schema, bilimsel doğruluk ve kalite kontrollerinden geçtiği halde frontend tarafında tekrar sert biçimde şu kapılardan geçiriliyordu:

1. `validateAIQuestionCase(... skipQuality: false)`
2. `validateQuestionDiversity(...)`
3. Local fallback için tekrar diversity kontrolü

Bu kontrollerden biri küçük format, kalite uyarısı veya yakın benzerlik şüphesi verdiğinde UI, terminalde başarılı görünen üretimi kullanıcıya göstermeden hata durumuna alabiliyordu. Özellikle `same_topic_recently`, `semantic_near_duplicate` veya client-side kalite uyarıları kullanıcıya gereksiz `Uygun soru üretilemedi` mesajı olarak yansıyordu.

## Yapılan değişiklikler

### 1. Remote AI çıktısı için server-trusted client validation
Remote endpoint'ten gelen soru artık frontend tarafında hâlâ yapısal olarak kontrol ediliyor; ancak server'dan geçmiş kalite/semantik novelty uyarıları UI'ı bloke etmiyor.

- Yapısal hatalar hâlâ hard fail: ID, doğru cevap, seçenekler, feedback omurgası eksikse reddedilir.
- Kalite uyarıları soft warning olarak `aiMeta.clientQualityWarnings` içine yazılır.
- Semantic novelty kontrolü remote AI için `trustRemoteAi` / `skipSemanticNovelty` ile advisory seviyeye çekildi.

### 2. Remote diversity gate advisory oldu
Remote cevap için `validateQuestionDiversity` artık UI'ı doğrudan hataya düşürmüyor. Yakın tekrar şüphesi varsa soru gösterilir, uyarı `aiMeta.clientDiversityWarning` içinde tutulur.

Bu değişiklik terminalde başarılı üretilen sorunun UI'da gereksiz reddedilmesini engeller.

### 3. Emergency local fallback eklendi
Remote endpoint başarısız olursa veya network/API hatası olursa local fallback zaten devreye giriyordu. Ancak local fallback da uzun geçmiş veya diversity baskısı nedeniyle başarısız olabiliyordu. Yeni `createEmergencyLocalQuestion` fonksiyonu son güvenli katman olarak eklendi:

- Geçmiş context'i temizler.
- Signature-only / empty context ile yeniden üretim dener.
- Gerekirse `random` branşa döner.
- Yine schema/quality kontrolünü korur.
- Başarılı olursa UI error yerine güvenli yerel soru gösterir.

## Değiştirilen dosyalar

- `src/services/aiQuestionService.js`
- `scripts/run-ai-ui-generation-resilience-test.mjs`
- `package.json`
- `AI_UI_GENERATION_RESILIENCE_FIX_REPORT.md`

## QA sonucu

Çalıştırılan komutlar:

```bash
npm run build
npm run qa:ai-ui-generation-resilience
npm run qa:ai-spot-readability
npm run qa:ai-spot-render-layout
npm run qa:ai-spot-duplicate-data
npm run qa:ai-feedback-duplication
npm run qa:highlight-standard
```

Sonuç: Başarılı.

## Beklenen davranış

- Terminal/API soru üretiyorsa UI artık bu soruyu gereksiz client-side diversity/quality sert reddi nedeniyle hata ekranına düşürmemelidir.
- Remote AI formatı yapısal olarak bozuksa hâlâ reddedilir.
- Remote alınamazsa local fallback çalışır.
- Local fallback diversity nedeniyle takılırsa emergency fallback devreye girer.
