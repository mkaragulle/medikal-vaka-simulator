# MedSim Pro — Vercel Uyumlu Temiz Kaynak Kod

Bu paket Vercel deploy için hazırlanmış temiz kaynak kod paketidir. `node_modules`, `dist` ve `package-lock.json` ZIP içine bilerek eklenmemiştir.

## Lokal Vercel build testi

PowerShell'de proje klasörüne girin:

```powershell
cd C:\Users\Muhammed\viteproject\medikal-vaka-simulator
```

Kurulum:

```powershell
npm install --package-lock=false --legacy-peer-deps --no-audit --no-fund
```

Build testi:

```powershell
npm run build
```

Build başarılıysa proje içinde `dist` klasörü oluşur.

## Vercel ayarları

Install Command:

```bash
npm install --package-lock=false --legacy-peer-deps --no-audit --no-fund
```

Build Command:

```bash
npm run build
```

Output Directory:

```bash
dist
```

Bu ayarlar ayrıca `vercel.json` içinde de tanımlıdır.
