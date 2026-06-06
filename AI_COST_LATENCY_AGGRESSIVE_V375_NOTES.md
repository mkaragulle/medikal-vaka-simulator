# KlinikIQ V375 — Aggressive Cost + Latency Reduction Notes

Bu sürüm V374 üzerine daha agresif maliyet ve bekleme süresi azaltma katmanı ekler. Amaç prompt kalitesini silmek değil; canlı isteklerde pahalı model, gereksiz prefetch, yüksek output token ve çoklu retry maliyetlerini azaltmaktır.

## Ana değişiklikler

1. Varsayılan cost profile artık `ultra` kabul edilir.
   - Env ile `KLINIKIQ_AI_COST_PROFILE=balanced` veya `quality` yapılabilir.
   - `quality` yapılmadığı sürece sistem hızlı/ucuz model routing kullanır.

2. Pahalı global model bypass edildi.
   - Önceki sürümde `OPENAI_MODEL` pahalı bir modele ayarlıysa TUS ve Komite endpointleri onu kullanmaya devam ediyordu.
   - Bu sürümde `KLINIKIQ_FORCE_FAST_MODEL=true` varsayılan davranış gibi çalışır.
   - `ultra/balanced` profilde `OPENAI_MODEL` pahalı olsa bile canlı üretim `OPENAI_FAST_MODEL` veya varsayılan `gpt-5-mini` üzerinden çalışır.
   - En üst kaliteyi zorlamak istersen `KLINIKIQ_AI_COST_PROFILE=quality` kullan.

3. Cevap sonrası otomatik prefetch varsayılan kapatıldı.
   - Önceki sürümde öğrenci soruyu cevaplayınca arkada otomatik 1 yeni soru üretiliyordu.
   - Bu hız hissi verse de kullanıcı devam etmezse gizli maliyet yaratıyordu.
   - Artık `VITE_AI_ENABLE_NEXT_QUESTION_PREFETCH=false` varsayılandır.

4. Backend retry varsayılanı azaltıldı.
   - TUS AI üretiminde varsayılan remote attempt 2 yerine 1 oldu.
   - Bu başarısız/validator takılan üretimlerde maliyeti doğrudan azaltır.
   - İstersen `TUS_REMOTE_AI_ATTEMPTS=2` ile tekrar açılabilir.

5. TUS soru output'u concise mode'a alındı.
   - JSON schema korunur.
   - optionFeedback alanı kaldırılmaz.
   - explanation korunur ama 2 güçlü cümleye yönlendirilir.
   - Her şık feedback'i 1 öğretici, seçenek özelinde bilimsel cümle olacak şekilde yönlendirilir.
   - `TUS_AI_OUTPUT_DETAIL_MODE=full` ile eski daha uzun anlatım davranışına dönülebilir.

6. Komite kaynak metin bütçeleri cost profile'a göre düşürüldü.
   - Materyal her AI çağrısında daha kısa, daha seçilmiş kaynak penceresiyle gönderilir.
   - Env ile override edilebilir:
     - `KOMITE_MAX_SOURCE_CHARS`
     - `KOMITE_QUESTIONS_MAX_SOURCE_CHARS`
     - `KOMITE_FLASHCARDS_MAX_SOURCE_CHARS`
     - `KOMITE_ANALYSIS_MAX_SOURCE_CHARS`

7. Komite output token cap'leri cost profile'a göre sınırlandı.
   - `ultra` profilde ders, analiz, soru ve flashcard çıktıları daha kompakt üretilir.
   - Schema korunur; yalnızca filler/repetition azaltılır.

8. Canlı TUS AI tamamen kapatılabilir.
   - `KLINIKIQ_LIVE_TUS_AI=false` yapılırsa TUS AI endpoint önce bank/cache arar, yoksa local güvenli fallback üretir.
   - Bu mod maliyeti neredeyse sıfıra indirir ama gerçek OpenAI üretimi yapmaz.

## Önerilen ucuz/hızlı env seti

```env
KLINIKIQ_AI_COST_PROFILE=ultra
KLINIKIQ_FORCE_FAST_MODEL=true
OPENAI_FAST_MODEL=gpt-5-mini
TUS_OPENAI_FAST_MODEL=gpt-5-mini
KOMITE_OPENAI_FAST_MODEL=gpt-5-mini
TUS_REMOTE_AI_ATTEMPTS=1
TUS_AI_OUTPUT_DETAIL_MODE=concise
KOMITE_AI_OUTPUT_DETAIL_MODE=concise
VITE_AI_ENABLE_NEXT_QUESTION_PREFETCH=false
VITE_AI_PREFETCH_QUEUE_SIZE=0
OPENAI_PROMPT_CACHE_KEY=true
OPENAI_PROMPT_CACHE_RETENTION=24h
KLINIKIQ_AI_OUTPUT_CACHE=true
KLINIKIQ_AI_QUESTION_BANK=true
KLINIKIQ_AI_USAGE_LOGS=true
```

## Daha kaliteli ama hâlâ dengeli env seti

```env
KLINIKIQ_AI_COST_PROFILE=balanced
KLINIKIQ_FORCE_FAST_MODEL=true
OPENAI_FAST_MODEL=gpt-5-mini
TUS_AI_OUTPUT_DETAIL_MODE=standard
KOMITE_AI_OUTPUT_DETAIL_MODE=standard
VITE_AI_ENABLE_NEXT_QUESTION_PREFETCH=false
TUS_REMOTE_AI_ATTEMPTS=1
```

## En yüksek kalite modu

```env
KLINIKIQ_AI_COST_PROFILE=quality
KLINIKIQ_FORCE_FAST_MODEL=false
TUS_OPENAI_MODEL=<kalite modeli>
KOMITE_OPENAI_MODEL=<kalite modeli>
TUS_AI_OUTPUT_DETAIL_MODE=full
KOMITE_AI_OUTPUT_DETAIL_MODE=full
```

## Beklenen etki

- Gizli prefetch maliyeti kapanır.
- Başarısız üretimde ikinci API çağrısı varsayılan olarak yapılmaz.
- Pahalı global model ultra/balanced profilde otomatik bypass edilir.
- Output token daha kısa ve hızlı olur.
- Prompt/cache/question bank davranışı korunur.
- Build alınmıştır.
