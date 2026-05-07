# KlinikIQ Gerçek AI Soru Üretimi Entegrasyonu

Bu güncellemede `AI ile Soru Üret` akışı gerçek LLM çağrısı yapacak şekilde güçlendirildi. Ana sağlayıcı OpenAI Responses API oldu; Gemini desteği ikincil fallback olarak korundu. API anahtarı frontend tarafına konmaz, yalnızca Vercel/serverless environment variable içinde tutulur.

## Eklenen mimari

```txt
React/Vite frontend
  -> src/services/aiQuestionService.js
  -> /api/generate-ai-question
  -> server-side OpenAI Responses API
  -> strict JSON schema
  -> raw/editorial validation
  -> frontend normalize + quality gate + duplicate check
  -> UI
```

## Önemli değişiklikler

- `api/generate-ai-question.js` artık OpenAI Responses API ile gerçek JSON-schema tabanlı soru üretir.
- `OPENAI_API_KEY`, `OPENAI_MODEL`, `AI_PROVIDER`, `OPENAI_MAX_OUTPUT_TOKENS` ve isteğe bağlı `OPENAI_BASE_URL` desteklenir.
- `GEMINI_API_KEY` desteği tamamen kaldırılmadı; OpenAI yoksa veya `AI_PROVIDER=gemini` seçilirse eski Gemini yolu kullanılabilir.
- Frontend tarafında gerçek AI varsayılan olarak denenir; endpoint/API key yoksa local generator fallback olarak devreye girer.
- Local fallback'in uzun oturumlarda takılmaması için eski semantic history özeti daraltıldı; exact signature kontrolü korunur.
- `.env.example` ve `README_RUN_FIRST.md` OpenAI kullanımına göre güncellendi.

## Gerekli Vercel environment variables

```txt
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
AI_PROVIDER=openai
VITE_ENABLE_REAL_AI=true
VITE_AI_QUESTION_ENDPOINT=/api/generate-ai-question
```

## Güvenlik

`OPENAI_API_KEY` kesinlikle `VITE_` prefix'iyle yazılmamalıdır. `VITE_` ile başlayan değişkenler tarayıcı bundle'ına girer ve kullanıcı tarafından görülebilir. Bu entegrasyonda model çağrısı yalnızca `/api/generate-ai-question` serverless dosyasında yapılır.

## Test sonucu

Bu ortamda gerçek OpenAI çağrısı yapılamadı çünkü server-side `OPENAI_API_KEY` bulunmuyor. Yapılan kontroller:

- `node --check api/generate-ai-question.js`: başarılı
- `node --check src/services/aiQuestionService.js`: başarılı
- `node --check src/utils/aiQuestionGenerator.js`: başarılı
- Endpoint, API key yoksa HTTP 503 döndürüp frontend'in local fallback'e geçebileceği şekilde tasarlandı.

## Çalıştırma

```bash
npm install
npm run build
npm run dev
```

Vercel deploy sonrası Project Settings > Environment Variables bölümüne `OPENAI_API_KEY` eklenirse, ekranda kaynak rozeti `Gerçek AI aktif` olarak çalışmalıdır.
