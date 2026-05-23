# V273 — Hap Bilgi Tooltip Viewport / No Card Scroll Fix

## Sorun
Hap Bilgi Çalış ekranında kart alanı bilinçli olarak sayfa scrollbar'ı üretmediği için, özellikle cevap sonrası veya nested glossary tooltipleri uzun olduğunda bazı tooltip içerikleri viewport'un altına taşıyor ve kullanıcı tooltip'in tamamını göremiyordu.

## Çözüm
Bu sürümde Hap Bilgi kart arayüzüne scrollbar eklenmeden tooltip pozisyonlama sistemi düzeltildi.

### Değiştirilen dosyalar
- `src/components/GlossaryTooltip.jsx`
- `src/index.css`

### Teknik değişiklikler
1. Tooltip pozisyonlama artık statik `68vh` yüksekliğe güvenmiyor.
2. Açılan tooltip için viewport yüksekliği, anchor pozisyonu, üst/alt boşluk ve nested seviye hesaplanıyor.
3. Tooltip hiçbir zaman viewport dışına taşmayacak şekilde `--tooltip-max-height` değeri dinamik veriliyor.
4. İçerik çok uzunsa scrollbar Hap Bilgi kart alanında değil, yalnızca tooltip kartının kendi içinde çalışıyor.
5. Nested tooltiplerde mümkünse çocuk tooltip sağ/sol tarafa açılıyor; bu, özellikle tooltip içinde tooltip açıldığında aşağı doğru taşmayı azaltıyor.
6. Sağ/sol açılımlar için arrow placement CSS'i eklendi.
7. Popover root `overflow: visible` bırakıldı; scroll yalnızca `.smart-glossary-card` içinde tutuldu. Böylece arrow kırpılmıyor.

## Beklenen davranış
- Hap Bilgi Çalış ekranına sayfa/kart scrollbar'ı eklenmez.
- Tooltip ekran altına taşıp kaybolmaz.
- Uzun tooltiplerde yalnızca tooltip içeriği kontrollü şekilde scroll eder.
- Nested tooltipler, yer varsa sağ/sol tarafta açılır ve daha az üst üste biner.
- Portal/z-index davranışı korunur.

## Test edilmesi gereken ekranlar
1. Hap Bilgi Çalış ekranı — uzun cevaplı kartlar
2. Hap Bilgi Çalış ekranı — nested glossary tooltip zinciri
3. Klinik Branş Seç vaka ekranı
4. TUS Spot Olgular soru çözme ekranı
5. Zamanlı sınav ekranı
6. Mobil görünümde tap ile tooltip açma/kapatma

## Not
`npm install` ortamda zaman aşımına uğradığı için tam Vite build çalıştırılamadı. `src/utils/glossary.js` import testi çalıştırıldı ve glossary sistemi 1021 terimi doğru yükledi.
