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

- Varsayılan: local akıllı generator + tekrar engelleme. API key gerekmez.
- Gerçek AI: `.env.local` içinde `VITE_ENABLE_REAL_AI=true` yapılır ve deploy edilen serverless ortamında `GEMINI_API_KEY` tanımlanır.

Local çalıştırma:

```bash
npm install
npm run dev
```

Build kontrolü:

```bash
npm run build
```
