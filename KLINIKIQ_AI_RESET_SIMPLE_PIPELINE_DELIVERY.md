# KlinikIQ AI Reset — Simple TUS Question Pipeline

## Amaç
AI ile Soru Üret modülündeki yavaşlık, aşırı karmaşık prompt/gate zinciri, local fallback tekrarları ve kalite kapılarının üretimi kilitlemesi problemlerini çözmek için AI üretim hattı sadeleştirildi.

## Değiştirilen ana dosyalar
- `api/generate-ai-question.js`
- `src/services/aiQuestionService.js`
- `src/utils/simpleAIQuestionAdapter.js`
- `scripts/run-simple-ai-pipeline-smoke-test.mjs`
- `package.json`
- `.env.example`

## Yeni mimari
1. Frontend yalnızca 1 remote deneme yapar.
2. Server yalnızca 1 OpenAI çağrısı yapar.
3. Prompt kısa, örneksiz ve TUS odaklıdır.
4. Modelden valid JSON istenir.
5. Hafif ama kritik kalite kontrol uygulanır:
   - 5 seçenek var mı?
   - doğru cevap A-E ile eşleşiyor mu?
   - seçenekler aynı kavramsal kategoride mi?
   - kesik cümle / üç nokta / yarım metin var mı?
   - jenerik feedback kalıpları var mı?
   - son sorularla birebir/çok yakın tekrar var mı?
   - model self-check alanları false dönmüş mü?
6. Kalite geçerse kullanıcıya gösterilir.
7. OpenAI başarısız olursa güvenli fallback devreye girer ve kullanıcıya açık şekilde fallback olarak işaretlenir.

## Bilerek kaldırılan/aşırı yumuşatılan eski davranışlar
- Çok uzun, tekrar eden prompt blokları
- Birden fazla repair/gate zinciri
- OpenAI için arka arkaya 4 farklı istek stili denemesi
- En az 4 frontend retry zorlaması
- Local fallback’in gerçek AI gibi görünmesi
- Soru üretimini 1-2 sorudan sonra kilitleyen aşırı agresif diversity mantığı

## Önerilen Vercel env değerleri
```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-5.4-mini
DEFAULT_GENERATOR_MODEL=gpt-5.4-mini
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_API_STYLE=chat
OPENAI_MAX_OUTPUT_TOKENS=1800
OPENAI_PER_REQUEST_TIMEOUT_MS=25000
REMOTE_AI_ATTEMPTS=1
AI_ENABLE_SAFE_FALLBACK=true

VITE_ENABLE_REAL_AI=true
VITE_AI_QUESTION_ENDPOINT=/api/generate-ai-question
VITE_AI_REQUEST_TIMEOUT_MS=45000
VITE_AI_REMOTE_RETRY_COUNT=1
VITE_AI_ENABLE_CLIENT_FALLBACK=true
```

## Test sonucu
- `npm run qa:simple-ai-pipeline` geçti.
- `npm run build` mevcut dependency cache ile geçti.

## Not
Gerçek OpenAI API key hiçbir dosyaya yazılmadı. Key yalnızca Vercel Environment Variables içinde tutulmalıdır.
