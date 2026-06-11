# KlinikIQ Vercel Deploy Stabilite Notları

Bu paket Vercel deploy ortamını stabil hale getirmek için hazırlandı.

## Yapılan güvenli değişiklikler

1. Node sürümü `22.x` olarak kilitlendi.
   - `package.json` içindeki `engines.node`: `22.x`
   - `.nvmrc`: `22`

2. npm davranışı sabitlendi.
   - `.npmrc` eklendi.
   - `engine-strict=true` ile yanlışlıkla Node 24.x veya farklı major Node ile kurulum erken durdurulur.
   - `legacy-peer-deps`, `audit=false`, `fund=false`, `save-exact=true`, `package-lock=true` tanımlandı.

3. Vercel install komutu lock-aware hale getirildi.
   - `package-lock.json` varsa `npm ci` kullanır.
   - Lock yoksa `npm install` ile build devam eder.

4. Direct dependency sürümleri exact hale getirildi.
   - Caret (`^`) kaldırıldı; böylece direct paketler her deploy'da sessizce farklı sürüme zıplamaz.

5. Vite chunk ayarı güvenli hale getirildi.
   - `case-bank` korundu; veri şeması ve uygulama davranışı bozulmadı.
   - Tek parça `glossary-bank` yerine glossary veri dosyaları dosya bazlı chunklara ayrıldı.
   - Büyük case bank için warning limit artırıldı; gerçek build hataları yine fail olur.

## Vercel panelinde kalması gereken değerler

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `if [ -f package-lock.json ]; then npm ci --legacy-peer-deps --no-audit --no-fund; else npm install --legacy-peer-deps --no-audit --no-fund; fi`
- Node.js Version: `22.x`

Deploy sonrası mutlaka `Redeploy` yaparken `Clear Build Cache` seçilmelidir.
