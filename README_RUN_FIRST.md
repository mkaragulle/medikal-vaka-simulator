# Önce Bunu Oku — KlinikIQ Kurulum ve Deploy

Bu ZIP, GitHub ve Vercel'e doğrudan yüklenebilecek temiz kaynak kod paketidir. `node_modules`, `dist`, `.vercel` ve gizli environment dosyaları bilerek pakete eklenmemiştir.

## 1. ZIP'i doğru aç

ZIP'i açtıktan sonra repo kökünde şu dosyalar görünmelidir:

```text
package.json
index.html
src/
public/
vercel.json
```

Bu dosyalar başka bir iç klasörün altında kalırsa GitHub/Vercel proje kökünü yanlış algılayabilir.

## 2. Lokal çalıştırma

```bash
npm install --package-lock=false --legacy-peer-deps --no-audit --no-fund
npm run dev
```

Tarayıcıda aç:

```text
http://localhost:5173
```

## 3. Build testi

```bash
npm run build
```

Başarılı build sonrası `dist/` klasörü oluşur. Bu klasör GitHub'a commitlenmemelidir.

## 4. Vercel deploy

Vercel Project Settings içinde:

```text
Install Command: npm install --package-lock=false --legacy-peer-deps --no-audit --no-fund
Build Command: npm run build
Output Directory: dist
```

Bu ayarlar ayrıca `vercel.json` içinde de vardır.

## 5. Firebase Google giriş

`.env.example` dosyasını `.env.local` olarak kopyala ve Firebase değerlerini doldur. Vercel'de aynı değerleri Environment Variables bölümüne ekle.

## AI ile Soru Üret notu — OpenRouter sürümü

Bu sürümde gerçek AI üretimi için varsayılan sağlayıcı **OpenRouter** olacak şekilde hazırlandı. Frontend API key görmez; istekler Vercel serverless endpointi üzerinden `/api/generate-ai-question` adresine gider.

Çalışma sırası:

```text
Frontend → /api/generate-ai-question → OpenRouter chat/completions → JSON soru → kalite/şema kontrolü → UI
```

Vercel Environment Variables içine şunları ekle:

```txt
AI_PROVIDER=openrouter
OPENROUTER_API_KEY=sk-or-... veya OpenRouter key'in
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

Notlar:

- OpenRouter free modellerde günlük/rate limit olabilir. Limit, model doluluğu veya JSON validation hatasında uygulama kırılmaz; local generator fallback olarak çalışır.
- `OPENROUTER_API_KEY` kesinlikle `VITE_` ile başlamamalı; aksi halde frontend bundle içine sızabilir.
- Environment variable ekledikten sonra Vercel'de **Redeploy** yap.
- OpenAI quota hatası yaşamamak için `AI_PROVIDER=openrouter` olduğundan emin ol.

Endpoint kontrolü:

```powershell
$body = @{
  branchFilter = "pediatrics"
  previousQuestionId = $null
  recentIds = @()
  recentSignatures = @()
  recentQuestionSummaries = @()
  attempt = 1
  antiRepeatNonce = [guid]::NewGuid().ToString()
} | ConvertTo-Json -Depth 10

Invoke-RestMethod `
  -Uri "https://medikal-vaka-simulator-yl76.vercel.app/api/generate-ai-question" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

Başarılı çıktı içinde şunları görmelisin:

```json
{
  "ok": true,
  "provider": "openrouter",
  "question": { }
}
```

Local çalıştırma:

```bash
npm install
npm run dev
```

Build kontrolü:

```bash
npm run build
```
