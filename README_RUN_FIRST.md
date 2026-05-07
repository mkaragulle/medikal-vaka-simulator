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

## AI ile Soru Üret notu

Bu sürümde AI soru üretim ekranı iki modlu çalışır:

- Ana yol: gerçek AI endpointi (`/api/generate-ai-question`) üzerinden server-side OpenAI Responses API çağrısı yapar. API key frontend bundle içine girmez.
- Güvenli fallback: OpenAI/Gemini endpointi çalışmazsa uygulama local akıllı generator ile kırılmadan devam eder.

Vercel Environment Variables içine en az şunu ekle:

```txt
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
AI_PROVIDER=openai
VITE_ENABLE_REAL_AI=true
```

İstersen alternatif/ikincil sağlayıcı olarak `GEMINI_API_KEY` de tanımlanabilir. `OPENAI_API_KEY` veya `GEMINI_API_KEY` yoksa gerçek AI devreye giremez ve sistem local fallback ile çalışır.

Local çalıştırma:

```bash
npm install
npm run dev
```

Build kontrolü:

```bash
npm run build
```
