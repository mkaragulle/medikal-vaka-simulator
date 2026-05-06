# Build/Test Sonucu

Komutlar:

```bash
npm install --prefer-offline --no-audit --no-fund
npm run build
```

Sonuç:

- `npm install`: başarılı, 149 paket kuruldu.
- `npm run build`: başarılı.
- Vite çıktısı: 68 modül dönüştürüldü, production build tamamlandı.

Not: ZIP içinde `node_modules` klasörü paket boyutunu şişirmemesi için dahil edilmemiştir. Lokal çalıştırmada `npm install` tekrar çalıştırılmalıdır.
