# KlinikIQ Simple AI Pipeline Fix

Bu paket, AI ile Soru Üret modülünde gereksiz uzun promptlar, aşırı sıkı/onarımcı gate zinciri, local fallback baskınlığı ve üretimin 1-2 sorudan sonra kilitlenmesi problemlerini azaltmak için hazırlanmıştır.

## Ana değişiklikler

- API promptu varsayılan olarak sadeleştirildi: `AI_SIMPLE_TUS_PROMPT=true`.
- Remote AI çıktısı artık yayınlanmadan önce kontrol ediliyor; ancak bilimsel metni bozan agresif otomatik repair zinciri varsayılan olarak devre dışı bırakıldı: `AI_SIMPLE_TUS_PIPELINE=true`.
- Server medical gate artık önce klinik uyumsuzluk/cross-topic contamination kontrolü yapıyor; kök başka konu, feedback başka konu olduğunda soru gösterilmiyor.
- Feedback ve option kalite denetimleri bloklayıcı olmaktan çıkarılıp kritik hatalara odaklandı. Böylece modelin iyi üretimleri gereksiz yere reddedilip local fallback'e düşmesi azaltıldı.
- API response içinde local safe fallback artık açık şekilde `fallback: true` döndürüyor.
- Frontend service, server local fallback döndürürse bunu artık gerçek remote AI gibi işaretlemiyor.
- `.env.example` OpenAI + sade pipeline kullanımına göre eklendi.

## Önerilen Vercel env

```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-5.4-mini
DEFAULT_GENERATOR_MODEL=gpt-5.4-mini
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MAX_OUTPUT_TOKENS=2800
OPENAI_PER_REQUEST_TIMEOUT_MS=35000

AI_SIMPLE_TUS_PROMPT=true
AI_SIMPLE_TUS_PIPELINE=true
REMOTE_AI_ATTEMPTS=3
AI_ENABLE_SAFE_FALLBACK=true
AI_DEBUG_USAGE_LOGS=false

VITE_ENABLE_REAL_AI=true
VITE_AI_QUESTION_ENDPOINT=/api/generate-ai-question
VITE_AI_REQUEST_TIMEOUT_MS=90000
VITE_AI_REMOTE_RETRY_COUNT=3
```

## Build sonucu

`npm run build` başarıyla tamamlandı.

## Not

Bu düzenleme AI'ya klinik örnek yüklemiyor. Son üretilen sorular yalnızca yasak tekrar penceresi olarak kısa başlık/doğru cevap/hedef düzeyinde gönderiliyor.
