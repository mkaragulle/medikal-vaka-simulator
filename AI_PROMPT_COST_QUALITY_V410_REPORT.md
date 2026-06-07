# KlinikIQ V410 — Simple Direct TUS AI Rewrite

Bu sürümde AI ile TUS sorusu üretim hattı bilinçli olarak sadeleştirildi. Amaç artık karmaşık gate/repair/fallback sistemiyle AI çıktısını elemek değil; tek kısa çağrıyla profesyonel, öğretici ve düşük token maliyetli TUS sorusu üretmek.

## Kaldırılan / devreden çıkarılan mantık

- Server-side local safe fallback kaldırıldı. API/JSON yapısal hata varsa sahte yerel soru dönmek yerine hata döner.
- AI repair pass kaldırıldı.
- Fatal / repairable / advisory kalite sınıflandırması kaldırıldı.
- Ağır kalite gate ve uzun validator zinciri kaldırıldı.
- Question-bank reuse akışı TUS endpointinden çıkarıldı.
- Output cache akışı TUS endpointinden çıkarıldı.
- Çoklu remote attempt endpoint tarafında kaldırıldı; tek OpenAI çağrısı yapılır.
- Şık dağılım hedefi / desiredCorrectAnswer baskısı kaldırıldı.

## Yeni basit akış

1. Kısa sistem promptu + kısa user promptu hazırlanır.
2. Model kompakt JSON üretir.
3. Sunucu kompakt JSON'u UI'ın beklediği tam şemaya çevirir.
4. Sadece temel yapısal kontrol yapılır: kök, soru, 5 seçenek, A-E correctAnswer, açıklama.
5. Başarılıysa AI sorusu döner; başarısızsa error döner. Yerel fallback yoktur.

## Token azaltma

- Modelden artık tam uzun şema değil, kompakt wire schema istenir: `b,d,lt,at,dem,set,cc,s,cv,co,q,o,c,e,f,k,p,m`.
- Server bu kısa alanları `relatedBranch`, `stem`, `options`, `wrongOptionFeedback` gibi UI alanlarına genişletir.
- Prompt kısa ve tek amaçlıdır.
- Feedback formatı kompakt tutulur: explanation en fazla 2 cümle, her şık feedbacki 1 kısa cümle.
- Varsayılan output token limiti 900'dür; env ile değiştirilebilir: `TUS_OPENAI_MAX_OUTPUT_TOKENS`.

## Kalite yaklaşımı

Kalite artık karmaşık gate ile değil, promptun kısa kalite sözleşmesiyle sağlanır:

- Soru kökü tek başına doğru cevabı seçtirmeli.
- Feedback kökte/panelde olmayan hasta-özel bilgi eklememeli.
- İki seçenek savunulabiliyorsa kök netleştirilmeli.
- Şıklar aynı kategoriden, benzer uzunlukta ve ciddi çeldirici olmalı.
- Türkçe tıp dili temiz olmalı.

## Dosya değişiklikleri

- `api/tus-question-prompt.js` tamamen yeniden yazıldı.
- `api/generate-ai-question.js` tamamen yeniden yazıldı.
- `src/services/aiQuestionService.js` client fallback varsayılanı kapalı olacak şekilde sadeleştirildi; servis modu `openai-simple-direct` olarak değiştirildi.

## Önerilen env ayarları

```bash
KLINIKIQ_AI_COST_PROFILE=ultra
TUS_OPENAI_FAST_MODEL=gpt-5.4-mini
TUS_OPENAI_MODEL=gpt-5.4-mini
TUS_OPENAI_REASONING_EFFORT=low
TUS_OPENAI_VERBOSITY=low
TUS_OPENAI_MAX_OUTPUT_TOKENS=900
VITE_AI_ENABLE_CLIENT_FALLBACK=false
VITE_AI_REMOTE_RETRY_COUNT=1
VITE_AI_ENABLE_NEXT_QUESTION_PREFETCH=false
```

Bu yapı, karmaşık kalite kapılarının maliyetini ve fallback dalgalanmasını ortadan kaldırır. Kaliteyi bozan spesifik örnekler görülürse çözüm yeniden gate eklemek değil, kısa prompt cümlesini veya post-process yazım standardizasyonunu küçük ölçekte güncellemek olmalıdır.
