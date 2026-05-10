# KlinikIQ AI Reset Delivery

## Kapsam
AI ile Soru Üret sistemi sadeleştirildi. Önceki çok katmanlı prompt/repair/diversity zinciri yerine tek çağrılı, kısa promptlu, deterministik güvenlik kontrolü olan yeni bir üretim hattı kuruldu.

## Değiştirilen ana dosyalar
- `api/generate-ai-question.js`
- `src/services/aiQuestionService.js`
- `src/index.css`
- `.env.example`
- `scripts/run-ai-reset-smoke-test.mjs`
- `package.json`

## Yeni mimari
1. Frontend tek istek gönderir.
2. Server kısa ve örneksiz bir sistem promptu ile OpenAI'dan tek TUS spot sorusu ister.
3. Çıktı JSON olarak parse edilir.
4. Hafif ama sert kontroller yapılır: 5 seçenek, tek doğru yanıt, cevap sızıntısı, tamamlanmış cümle, yasak jenerik feedback, kaynak bağlı kanıt, branch uyumu ve yakın tekrar.
5. Çıktı geçerse doğrudan kullanıcıya gösterilecek normalize edilmiş soru objesine çevrilir.
6. Çıktı geçmezse yalnızca bir kez revizyon denenir.
7. Yine olmazsa uygulama kırılmasın diye güvenli fallback döner ve `fallback: true` olarak açıkça işaretlenir.

## Neden daha hızlı?
- Çok aşamalı repair/validator zinciri kaldırıldı.
- Client tarafındaki agresif retry ve hard diversity döngüleri kaldırıldı.
- AI'ya uzun klinik örnekler gönderilmiyor.
- Recent question context kısa fingerprint/başlık/doğru cevap özetiyle sınırlı tutuluyor.
- Default remote attempt sayısı 2'ye indirildi.

## Güvenlik kontrolleri
- Başlık/stem/soru içinde doğru cevap birebir geçerse reddedilir.
- Aynı seçenek seti, aynı başlık veya aynı fingerprint yakın geçmişte varsa reddedilir.
- Feedbackte jenerik ve öğreticiliği düşük kalıplar reddedilir.
- Kesik cümle, üç nokta ve bağlaçla biten metinler reddedilir.
- Kanıt zincirinin en az iki maddesi kaynak metinle ilişkili olmak zorundadır.
- Beş seçenek ve doğru cevap eşleşmesi zorunludur.

## Test sonucu
- `npm run qa:ai-reset-smoke` geçti.
- `npm run build` geçti.

## Vercel env önerisi
```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-5.4-mini
DEFAULT_GENERATOR_MODEL=gpt-5.4-mini
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MAX_OUTPUT_TOKENS=1800
OPENAI_PER_REQUEST_TIMEOUT_MS=28000
REMOTE_AI_ATTEMPTS=2
AI_ENABLE_SAFE_FALLBACK=true

VITE_ENABLE_REAL_AI=true
VITE_AI_QUESTION_ENDPOINT=/api/generate-ai-question
VITE_AI_REQUEST_TIMEOUT_MS=55000
```

## Not
Gerçek API key GitHub'a yüklenmemelidir. Key yalnızca Vercel Environment Variables içinde kalmalıdır.
