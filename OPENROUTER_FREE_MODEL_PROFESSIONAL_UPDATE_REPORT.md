# KlinikIQ OpenRouter Free Model Professional Update

Bu güncelleme, mevcut **KlinikIQ Hap Bilgi Review Hub Rework** ZIP'i korunarak yalnızca AI soru üretim altyapısına profesyonel OpenRouter ücretsiz model modu eklemek için yapılmıştır.

## Ana değişiklikler

- Varsayılan OpenRouter sağlayıcı modu `OPENROUTER_FREE_MODEL_MODE=true` olacak şekilde ayarlandı.
- Ücretsiz model profili `openai/gpt-oss-120b:free` olarak tanımlandı.
- Önceki hızlı ama kredi isteyen `google/gemini-2.5-flash-lite` varsayılanlardan çıkarıldı.
- Free modelde tam uzun KlinikIQ JSON şeması doğrudan istenmiyor; modelden kısa/compact JSON alınıyor ve server tarafında tam KlinikIQ soru şemasına tamamlanıyor.
- `:free` modellerin yanlışlıkla yavaş/engellenmiş model listesi tarafından bloklanması önlendi.
- Free modelin yavaş cevap verme ihtimaline göre OpenRouter timeout profili 52 saniyeye, frontend timeout profili 90 saniyeye ayarlandı.
- Test scripti artık beklenen model olarak `openai/gpt-oss-120b:free` gösteriyor.

## Güncellenen dosyalar

- `api/generate-ai-question.js`
- `.env.example`
- `test-openrouter-endpoint.ps1`
- `OPENROUTER_FREE_MODEL_PROFESSIONAL_UPDATE_REPORT.md`

## Vercel için önerilen environment variables

```txt
AI_PROVIDER=openrouter
OPENROUTER_API_KEY=sk-or-v1-...yeni_keyin...
OPENROUTER_FREE_MODEL_MODE=true
OPENROUTER_MODEL=openai/gpt-oss-120b:free
OPENROUTER_MODELS=openai/gpt-oss-120b:free
OPENROUTER_FALLBACK_MODELS=
OPENROUTER_MAX_MODEL_ATTEMPTS=1
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_SITE_URL=https://medikal-vaka-simulator-yl76.vercel.app
OPENROUTER_APP_TITLE=KlinikIQ
OPENROUTER_MAX_TOKENS=850
OPENROUTER_COMPACT_ON_402=true
OPENROUTER_COMPACT_MAX_TOKENS=750
OPENROUTER_PER_MODEL_TIMEOUT_MS=52000
OPENROUTER_ALLOW_SLOW_MODELS=true
OPENROUTER_BLOCKED_MODELS=
OPENROUTER_REPAIR_JSON_ON_PARSE_ERROR=true
OPENROUTER_REPAIR_MAX_TOKENS=1000
OPENROUTER_TEMPERATURE=0.35
OPENROUTER_TOP_P=0.75
OPENROUTER_USE_JSON_MODE=true
OPENROUTER_REASONING_ENABLED=false
OPENROUTER_REASONING_EXCLUDE=true
REMOTE_AI_ATTEMPTS=1
VITE_ENABLE_REAL_AI=true
VITE_AI_QUESTION_ENDPOINT=/api/generate-ai-question
VITE_AI_REQUEST_TIMEOUT_MS=90000
VITE_AI_REMOTE_RETRY_COUNT=1
```

## Not

OpenRouter free modelleri hız ve erişilebilirlik açısından değişken olabilir. Bu entegrasyon free model kullanımı için en stabil akışı hedefler; production kalitesi ve süreklilik istenirse kredi eklenmiş hızlı bir model profiline geçmek daha doğru olur.
