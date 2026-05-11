# KlinikIQ Clean Package Report

Bu paket, önceki geliştirme/QA raporları ve geçici test dosyaları temizlenmiş deploy edilebilir kaynak pakettir.

## Korunan gerekli ana dosyalar
- `src/`: React uygulama kaynakları
- `api/`: Vercel serverless AI soru üretim endpoint'i ve optimize TUS prompt builder
- `public/`: uygulamada kullanılan ikon/PWA varlıkları
- `index.html`, `vite.config.js`, `vercel.json`, `.env.example`, `.npmrc`, `package.json`
- `README.md`, `README_RUN_FIRST.md`, `GOOGLE_LOGIN_SETUP.md`, `FIREBASE_GOOGLE_LOGIN_SETUP.md`

## Temizlenen gereksiz dosya tipleri
- Kök dizindeki eski `*_REPORT.*`, `*_RESULT.*`, `*_SUMMARY.*`, `*_DELIVERY.*`, `*_FIX_*` vb. geliştirme notları
- Lokal QA/patch scriptleri (`scripts/`)
- Geçici test dosyaları (`test-*.mjs`, `qa-*.mjs`, `*.ps1`)
- Statik import grafiğinde kullanılmadığı görülen bazı eski React bileşenleri
- Uygulamada referanslanmayan eski public görselleri
- Boş placeholder asset klasörleri

## Not
`npm run build` komutu için bağımlılıkların kurulu olması gerekir. ZIP içinde `node_modules` bilinçli olarak yoktur.
