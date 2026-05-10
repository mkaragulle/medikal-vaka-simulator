# KlinikIQ OpenAI AI Soru Üretim Düzeltmesi

Tarih: 2026-05-10

## Amaç

`AI ile Soru Üret` ekranında görülen şu hata giderildi:

> Uygun soru üretilemedi. Bu denemede TUS dili, bilimsel doğruluk ve tekrar kontrolünden geçen yeni bir soru oluşturulamadı.

Bu düzeltme yalnızca AI soru üretim endpoint'i, environment örneği ve GitHub güvenlik dosyalarını etkiler. UI/CSS/layout/tasarım değiştirilmedi.

## Değiştirilen dosyalar

- `api/generate-ai-question.js`
- `.env.example`
- `.gitignore`
- `KLINIKIQ_OPENAI_QUESTION_GENERATION_FIX_REPORT.md`

## Ana düzeltmeler

1. OpenAI provider artık öncelikli çalışacak şekilde güvenli hale getirildi.
2. OpenAI Responses API strict JSON schema kullanımı güncellendi.
3. JSON schema içindeki `compactVitals` ve `compactObjectiveData` alanları strict schema uyumu için required alanlara eklendi.
4. OpenAI çağrısı için dört katmanlı uyumluluk fallback'i eklendi:
   - Responses API + strict JSON schema
   - Responses API + JSON object
   - Chat Completions + strict JSON schema
   - Chat Completions + JSON object
5. OpenAI isteklerine timeout eklendi: `OPENAI_PER_REQUEST_TIMEOUT_MS=28000`.
6. Remote model veya kalite kapıları soru kabul etmezse kullanıcıya hata göstermek yerine doğrulanmış yerel TUS spot fallback havuzundan güvenli soru döndürülür.
7. Safe fallback havuzu bilimsel gate, leakage gate, editorial gate ve schema validation üzerinden geçirilecek şekilde tasarlandı.
8. Vercel/GitHub için `.env.example` OpenAI kullanımına göre sadeleştirildi.
9. `.gitignore` secret dosyalarını daha kapsamlı engelleyecek şekilde güçlendirildi.

## Vercel Environment Variables

Vercel > Project > Settings > Environment Variables bölümüne minimum şu değerleri ekle:

```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-...kendi_keyin...
OPENAI_MODEL=gpt-5.4-mini
DEFAULT_GENERATOR_MODEL=gpt-5.4-mini
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MAX_OUTPUT_TOKENS=2600
OPENAI_PER_REQUEST_TIMEOUT_MS=28000

AI_ENABLE_SAFE_FALLBACK=true
REMOTE_AI_ATTEMPTS=2
AI_DEBUG_USAGE_LOGS=false

VITE_ENABLE_REAL_AI=true
VITE_AI_QUESTION_ENDPOINT=/api/generate-ai-question
VITE_AI_REQUEST_TIMEOUT_MS=90000
VITE_AI_REMOTE_RETRY_COUNT=1
```

Gerçek `OPENAI_API_KEY` yalnızca Vercel'e girilmelidir. GitHub'a `.env`, `.env.local`, `.env.production` veya gerçek key içeren hiçbir dosya yüklenmemelidir.

## Test sonucu

```bash
npm run build
# PASS

npm run qa:ai-scientific-regression
# PASS: 9/9 fixture

npm run qa:pearl-active-recall-language
# PASS: 700/700 card

npm run qa:ai-spot-duplicate-data
# PASS: 4/4 scenario

npm run qa:ai-ui-generation-resilience
# PASS

node scripts/run-ai-scientific-accuracy-100-test.mjs
# PASS: 100/100
```

## Not

Vercel'de deploy sonrası eski Environment Variables varsa `AI_PROVIDER=openai` değerinin ekli olduğundan emin ol. Daha önce OpenRouter key'i eklenmiş olsa bile bu değer OpenAI provider'ı önceliklendirir.
