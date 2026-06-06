# KlinikIQ AI Cost + Latency Optimization Notes

Bu sürümde amaç prompt kalitesini veya medikal açıklama derinliğini azaltmak değildir. Eklenen katmanlar, aynı işi tekrar başlatmayı engellemek, kaliteli çıktıları tekrar kullanılabilir hale getirmek ve öğrencinin bekleme hissini azaltmak için eklenmiştir.

## Yeni/önerilen environment variable'lar

```env
OPENAI_PROMPT_CACHE_KEY=true
OPENAI_PROMPT_CACHE_RETENTION=24h
KLINIKIQ_AI_OUTPUT_CACHE=true
KLINIKIQ_AI_OUTPUT_CACHE_TTL_MS=1800000
KLINIKIQ_AI_USAGE_LOGS=true
KLINIKIQ_AI_QUESTION_BANK=true
KLINIKIQ_AI_QUESTION_BANK_TTL_MS=1209600000
KLINIKIQ_AI_CACHE_DIR=/tmp/klinikiq-ai-cache
VITE_AI_ENABLE_NEXT_QUESTION_PREFETCH=true
VITE_AI_PREFETCH_QUEUE_SIZE=1
```

Opsiyonel kalıcı KV/Redis REST cache için:

```env
KLINIKIQ_KV_REST_API_URL=
KLINIKIQ_KV_REST_API_TOKEN=
```

Alternatif olarak mevcut Vercel KV / Upstash isimleri de okunur:

```env
KV_REST_API_URL=
KV_REST_API_TOKEN=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

## Davranış özeti

- TUS AI sorularında önce question bank/output cache kontrol edilir.
- Uygun hazır soru bulunursa OpenAI çağrısı yapılmadan soru döner.
- Yeni kaliteli OpenAI soruları question bank'e yazılır.
- Aynı anda aynı TUS/Komite işi tekrar tetiklenirse tek OpenAI çağrısı çalışır; diğer istekler aynı sonucu bekler.
- Öğrenci AI sorusunu cevapladıktan sonra frontend sadece 1 adet yedek soruyu arka planda hazırlar.
- Komite lesson/questions/cards/analysis endpointleri durable cache + in-flight dedupe kullanır.
- Prompt ve kaynak metni loglanmaz; loglarda yalnızca güvenli kullanım metrikleri bulunur.

## Üretim notu

Dosya sistemi cache'i serverless instance içinde en iyi-effort çalışır. Gerçek kalıcı, instance bağımsız cache için Vercel KV / Upstash Redis REST environment variable'ları eklenmelidir.
