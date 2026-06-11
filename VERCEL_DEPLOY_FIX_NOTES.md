# KlinikIQ Vercel Deploy Fix

Yapılan güvenli değişiklikler:

1. Node engine sabitlendi:
   - `package.json`: `engines.node = 22.x`
   - `.nvmrc`: `22`

2. npm davranışı sabitlendi:
   - `.npmrc` eklendi.
   - `engine-strict=true`, `legacy-peer-deps=true`, `audit=false`, `fund=false`, `save-exact=true`, `package-lock=true` aktif.

3. Vercel install komutu lock-aware hale getirildi:
   - `package-lock.json` varsa: `npm ci`
   - Lock yoksa: `npm install`

4. Direct dependency sürümleri exact hale getirildi; `^` kaldırıldı.

5. Vite bundle uyarıları güvenli şekilde düzenlendi:
   - `case-bank` şeması ve veri davranışı korunur.
   - `glossary-bank` tek büyük blok yerine glossary veri dosyalarına göre ayrılır.
   - Büyük veri bankası için uyarı limiti artırıldı; gerçek build hataları yine fail olur.

Önerilen kesin adım:

```bash
node -v
npm install --legacy-peer-deps --no-audit --no-fund
npm run build
git add package.json package-lock.json .npmrc .nvmrc vercel.json vite.config.js README.md VERCEL_DEPLOY_FIX_NOTES.md VERCEL_DEPLOY_STABILITY_NOTES.md
git commit -m "Stabilize Vercel deploy on Node 22"
git push
```

Sonra Vercel'de `Redeploy` yaparken `Clear Build Cache` seçin.
