# KlinikIQ OpenRouter Gerçek AI Entegrasyonu

## Amaç

OpenAI API quota/billing problemi nedeniyle gerçek AI üretiminin sürekli local generator fallback'e düşmesini engellemek için `/api/generate-ai-question` endpoint'i OpenRouter destekleyecek şekilde güncellendi.

## Ana değişiklikler

- `api/generate-ai-question.js` içine `callOpenRouterQuestion()` eklendi.
- Varsayılan provider sırası `openrouter → openai → gemini` olarak ayarlandı.
- `AI_PROVIDER=openrouter` ile doğrudan OpenRouter kullanımı desteklendi.
- OpenRouter için `/chat/completions` endpoint'i fetch ile çağrılıyor; ekstra SDK bağımlılığı eklenmedi.
- `response_format: { type: "json_object" }` kullanılıyor; model desteklemezse otomatik olarak JSON mode olmadan ikinci istek deneniyor.
- OpenRouter `HTTP-Referer` ve `X-OpenRouter-Title` header'ları desteklendi.
- İsteğe bağlı `OPENROUTER_MODELS` ile OpenRouter model fallback listesi desteklendi.
- İsteğe bağlı reasoning parametreleri desteklendi; JSON stabilitesi için varsayılan kapalı bırakıldı.
- Frontend timeout varsayılanı 9 saniyeden 30 saniyeye çıkarıldı; free modellerin yavaş yanıtı nedeniyle gereksiz fallback azalır.

## Vercel Environment Variables

```txt
AI_PROVIDER=openrouter
OPENROUTER_API_KEY=sk-or-...
OPENROUTER_MODEL=openai/gpt-oss-120b:free
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_SITE_URL=https://medikal-vaka-simulator-yl76.vercel.app
OPENROUTER_APP_TITLE=KlinikIQ
OPENROUTER_MAX_TOKENS=2800
OPENROUTER_TEMPERATURE=0.86
OPENROUTER_TOP_P=0.92
OPENROUTER_USE_JSON_MODE=true
OPENROUTER_REASONING_ENABLED=false
OPENROUTER_REASONING_EXCLUDE=true
VITE_ENABLE_REAL_AI=true
VITE_AI_QUESTION_ENDPOINT=/api/generate-ai-question
VITE_AI_REQUEST_TIMEOUT_MS=30000
VITE_AI_REMOTE_RETRY_COUNT=2
```

## Değiştirilen dosyalar

- `api/generate-ai-question.js`
- `src/services/aiQuestionService.js`
- `.env.example`
- `README_RUN_FIRST.md`
- `OPENROUTER_REAL_AI_INTEGRATION_REPORT.md`

## Test

Syntax check başarılı:

```bash
node --check api/generate-ai-question.js
node --check src/services/aiQuestionService.js
node --check src/utils/aiQuestionGenerator.js
node --check scripts/run-ai-generation-reliability-test.mjs
```

Sandbox ortamında gerçek OpenRouter çağrısı yapılmadı çünkü kullanıcıya ait API key burada kullanılmamalıdır. Deploy sonrası PowerShell POST testiyle doğrulanmalıdır.

Mock endpoint testi de başarılıdır: OpenRouter response formatına benzeyen sahte `chat.completions` cevabı endpoint'e verildiğinde `200 { ok: true, provider: "openrouter" }` döndü. Bu test gerçek API key kullanmadan endpoint parse/validation akışını doğrular.
