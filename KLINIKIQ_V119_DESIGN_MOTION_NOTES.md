# KlinikIQ V119 — Design + Motion System Update

Bu sürüm giriş ekranı, orbital hero animasyonu, özellik kartları, tema butonu ve branş seçim ekranı için tek bir son katman tasarım/motion sistemi ekler.

## Değişen ana dosyalar

- `src/App.jsx`
  - `src/styles/klinikiq-system.css` son import olarak eklendi.
- `src/styles/klinikiq-system.css`
  - KlinikIQ için final design token, spacing, typography, card, orbit, theme toggle ve branch motion kuralları eklendi.
- `src/components/AuthPanel.jsx`
  - Hero alt metni veriye dayalı gelişim mesajıyla güncellendi.
  - Pro Vaka Havuzu metni sadeleştirildi.
- `src/components/BranchSelector.jsx`
  - “Klinik branş seç” ekranına kısa, profesyonel açıklama eklendi.

## Çözülen problemler

- Desktopta orbit merkezinin kayması için tek merkezli, transform-only orbital sistem kuruldu.
- Orbit badge’leri container dışına taşmayacak şekilde radius ve badge boyutu aynı tokenlardan hesaplandı.
- Desktop/mobil animasyon çakışmaları son CSS katmanı ile bastırıldı.
- Gerçek `prefers-reduced-motion: reduce` kullanıcıları için bilinçli sade fallback bırakıldı.
- Dark mode toggle ikon merkezleme problemi giderildi; auth ve navbar aynı geometriye bağlandı.
- 6 özellik kartı daha kompakt, hizalı, sade ve premium bir grid sistemine alındı.
- Branş kartları daha tutarlı spacing, progress bar, hover ve reveal motion davranışına kavuştu.

## Not

Bu paket node_modules içermez. Lokal çalıştırmak için:

```bash
npm install
npm run dev
```

Production kontrolü için:

```bash
npm run build
```
