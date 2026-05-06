# KlinikIQ — 4 Branş İkon ve Motion Düzeltmesi

Bu güncelleme özellikle aşağıdaki branş kartları ve geçiş ekranı ikon/animasyonlarını hedefler:

- TUS Spot Olgular
- Tıbbi Mikrobiyoloji
- Tıbbi Farmakoloji
- Çocuk Sağlığı ve Hastalıkları

## Yapılan ana değişiklikler

1. `src/components/ui.jsx` içine `PrecisionBranchIcon` adlı özel SVG ikon katmanı eklendi.
2. `IconBadge` artık bu 4 branş için genel ikon yerine özel branch SVG kullandırıyor.
3. `BranchTransitionVisual` bu 4 branşta aynı özel ikonun büyük transition versiyonunu render ediyor.
4. `src/components/BranchSelector.jsx` içindeki `IconBadge` kullanımına `branchId` iletildi.
5. `src/index.css` sonuna V104 focused branch icon correction bölümü eklendi.
6. Eski genel SVG animasyonları bu 4 branşta devre dışı bırakıldı; motion artık SVG içindeki anlamlı parçalara uygulandı.
7. Eski/stale production `dist/` klasörü kaldırıldı; kullanıcı projeyi `npm run build` ile yeniden üretmelidir.

## Motion mantığı

### TUS Spot Olgular
Ana yıldız optik merkezli yeniden çizildi. Ana yıldız hafif pulse yapar; iki sparkle öğesi staggered pop/parlama hareketiyle “spot bilgi / flash learning” hissi verir.

### Tıbbi Mikrobiyoloji
Mikrobiyal ana gövde, çevresel spike ve iç dot parçaları ayrı katmanlandı. Gövde kontrollü pulse yapar; spike/dot katmanları mikrobiyal canlılık hissini akademik ve temiz düzeyde verir.

### Tıbbi Farmakoloji
Kapsül ikonu daha dengeli açıda yeniden çizildi. Kapsül çok hafif swing yapar; çevresel etki çizgileri ilaç-etki mekanizması hissini verir.

### Çocuk Sağlığı ve Hastalıkları
Pediatrik figür daha sıcak ve dengeli hale getirildi. Ana çocuk figürü breathing/warm pulse motion taşır; küçük yıldız nazik parlamayla destek verir.

## Düzeltilen dosyalar

- `src/components/ui.jsx`
- `src/components/BranchSelector.jsx`
- `src/index.css`

## Kontrol sonucu

- JS/JSX syntax transpile check: PASSED
- Basic CSS brace/paren/bracket balance check: PASSED
- Full `npm run build`: Bu ortamda çalıştırılamadı; `firebase@12.12.1` dependency kurulumu timeout verdi. Kaynak kod build-ready olacak şekilde düzenlendi; local ortamda `npm install` sonrası `npm run build` çalıştırılmalıdır.

## Çalıştırma komutları

```bash
npm install
npm run build
npm run dev
```
