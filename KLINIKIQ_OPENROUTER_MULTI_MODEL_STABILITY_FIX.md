# KlinikIQ OpenRouter Multi-Model Stability Fix

Bu paket, OpenRouter gerçek AI entegrasyonunda görülen “bazen üretip bazen local generator'a düşme” problemini azaltmak için hazırlanmıştır.

## Kök neden

OpenRouter bağlantısı ve API key çalışıyor; ancak bazı model cevaplarında şu durumlar oluşabiliyor:

- malformed / yarım JSON,
- modelin geç cevap vermesi,
- `response_format: json_object` uyumsuzluğu,
- endpoint şema/editorial validation reddi,
- free model availability/rate değişkenliği.

Bu yüzden sistem bazen başarılı remote soru üretirken bazen local fallback'e düşüyordu.

## Yapılan düzeltmeler

- OpenRouter için manuel multi-model fallback eklendi.
- `OPENROUTER_MODELS` / `OPENROUTER_FALLBACK_MODELS` desteği eklendi.
- Her model için bağımsız timeout eklendi: `OPENROUTER_PER_MODEL_TIMEOUT_MS`.
- JSON mode hata verirse aynı model JSON mode kapalı tekrar deneniyor.
- Malformed JSON gelirse düşük sıcaklıkta JSON repair çağrısı çalışıyor.
- Endpoint, validation/editorial reject durumunda local fallback öncesi ikinci remote attempt yapabiliyor.
- Varsayılan sıcaklık düşürüldü; JSON stabilitesi artırıldı.
- Hata response'una son remote attempt özetleri eklendi; debug daha kolay hale geldi.

## Önerilen Vercel env

```txt
AI_PROVIDER=openrouter
OPENROUTER_API_KEY=sk-or-...yeni_key...
OPENROUTER_MODEL=google/gemini-2.5-flash-lite
OPENROUTER_MODELS=google/gemini-2.5-flash-lite,openai/gpt-oss-120b:free
OPENROUTER_MAX_MODEL_ATTEMPTS=2
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_SITE_URL=https://medikal-vaka-simulator-yl76.vercel.app
OPENROUTER_APP_TITLE=KlinikIQ
OPENROUTER_MAX_TOKENS=2200
OPENROUTER_PER_MODEL_TIMEOUT_MS=24000
OPENROUTER_REPAIR_JSON_ON_PARSE_ERROR=true
OPENROUTER_REPAIR_MAX_TOKENS=2600
OPENROUTER_TEMPERATURE=0.55
OPENROUTER_TOP_P=0.85
OPENROUTER_USE_JSON_MODE=true
OPENROUTER_REASONING_ENABLED=false
OPENROUTER_REASONING_EXCLUDE=true
REMOTE_AI_ATTEMPTS=2
VITE_ENABLE_REAL_AI=true
VITE_AI_QUESTION_ENDPOINT=/api/generate-ai-question
VITE_AI_REQUEST_TIMEOUT_MS=90000
VITE_AI_REMOTE_RETRY_COUNT=2
```

## Test

`node --check` kontrolleri başarılıdır. Full `npm run build` için yerel ortamda `npm install` gerekir.
