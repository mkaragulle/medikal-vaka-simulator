# KlinikIQ

KlinikIQ, TUS/komite odaklı klinik vaka çözme ve öğrenme simülatörüdür. Bu paket Vite + React ile hazırlanmıştır ve GitHub/Vercel deploy akışı için temiz kaynak kod içerir.

## Projeyi çalıştırma

```bash
npm install --package-lock=false --legacy-peer-deps --no-audit --no-fund
npm run dev
```

Lokal geliştirme adresi varsayılan olarak:

```text
http://localhost:5173
```

## Build alma

```bash
npm run build
npm run preview
```

Build çıktısı `dist/` klasörüne oluşturulur. `dist/` klasörü repoya eklenmez.

## GitHub'a yükleme

ZIP'i açtıktan sonra dosyaların doğrudan repo kökünde olduğundan emin ol:

```text
package.json
index.html
src/
public/
vercel.json
```

Dosyalar `klinikiq/...` gibi ikinci bir klasörün içinde kalırsa Vercel build komutları proje kökünü bulamayabilir.

Önerilen akış:

```bash
git init
git add .
git commit -m "Update KlinikIQ cases and GitHub config"
git branch -M main
git remote add origin <github-repo-url>
git push -u origin main
```

## Vercel ayarları

Bu ayarlar `vercel.json` içinde de tanımlıdır:

```text
Install Command: npm install --package-lock=false --legacy-peer-deps --no-audit --no-fund
Build Command: npm run build
Output Directory: dist
```

## Firebase / Google giriş ayarları

Google giriş özelliği Firebase Authentication üzerinden çalışır. Lokal kullanım için `.env.example` dosyasını `.env.local` olarak kopyala ve Firebase değerlerini doldur:

```bash
cp .env.example .env.local
```

Vercel'de aynı değişkenleri Project Settings → Environment Variables alanına ekleyip redeploy yap.

## Önemli notlar

- `node_modules/`, `dist/`, `.env.local` ve `.vercel/` repoya eklenmemelidir.
- Vaka verileri `src/data/cases.js` içinde tutulur.
- Branş verileri `src/data/branches.js` içinde tutulur.
- UI/component yapısı vaka ekleme işlemi için değiştirilmemelidir.

## KlinikIQ v37 platform pivot

This build adds a broader medical learning workspace on top of the existing TUS case simulator. New users complete onboarding, then the dashboard adapts to medical-school or TUS preparation needs. Users can add PDF/PPTX material metadata, generate a structured lesson workspace, answer a 10-question carousel, create/review flashcards, and use a material-specific review center. Existing TUS Spot and AI TUS question modules remain available.

AI provider keys must stay server-side. Use `OPENAI_API_KEY`, `OPENAI_MODEL`, and `AI_PROVIDER` in Vercel environment variables. Do not add `VITE_OPENAI_API_KEY`.
