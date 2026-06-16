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

## AI TUS soru üretimi

Vercel ortam değişkenlerinde `OPENAI_API_KEY` zorunludur. Varsayılan model `gpt-5.4-nano` olarak ayarlanmıştır; farklı bir model kullanmak için `OPENAI_MODEL` eklenebilir.

Stabil üretim ayarları:

```text
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-5.4-nano
OPENAI_RESPONSE_FORMAT=json_schema
OPENAI_QUESTION_BATCH_SIZE=1
OPENAI_MAX_TOKENS=3000
OPENAI_TEMPERATURE=0.35
OPENAI_PROMPT_CACHE_KEY=klinikiq-tus-question-v3
```

`OPENAI_QUESTION_BATCH_SIZE=1` üretimi daha stabil tutar. `OPENAI_MAX_TOKENS=3000` uzun JSON yanıtlarının kesilmesini önler. `OPENAI_SERVICE_TIER` hata ayıklama ve canlı stabilite için boş bırakılmalıdır; özellikle `flex` değeri kod tarafından güvenli biçimde yok sayılır.

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
