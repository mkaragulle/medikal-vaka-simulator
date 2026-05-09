# Hap Bilgi Çalış — Diğer Dropdown Portal Fix

## Kök neden
Önceki sürümde `Diğer` menüsü native `<details>` içinde ve üst bar DOM hiyerarşisinin içinde render ediliyordu. Menü `absolute` konumlandığı için üst bar / kart yüzeyi / sayfa shell çevresindeki stacking context ve overflow davranışlarından etkilenebiliyor, sağ üstte yarım görünebiliyor veya tamamen kesilebiliyordu. Menü aksiyonları doğru olsa bile kullanıcı `Bildiklerim`, `Kendi kartlarım`, `Kataloglarım` ve `Kendi kartını oluştur` akışlarına güvenilir şekilde ulaşamıyordu.

## Teknik çözüm
- Native `<details>` yapısı, kontrollü React popover bileşeniyle değiştirildi.
- Menü `createPortal` ile `document.body` içine render ediliyor.
- Menü `triggerRef.getBoundingClientRect()` üzerinden `position: fixed` ile konumlanıyor.
- Desktop/tablet görünümünde butonun altında sağ hizalı açılıyor.
- Viewport kenarına yaklaşınca yatayda içeri clamp ediliyor; aşağıda yer yoksa yukarı açılabiliyor.
- Mobilde popover yerine tam genişliğe yakın kompakt bottom-sheet davranışı kullanılıyor.
- Dışarı tıklama, Escape ile kapatma, scroll/resize sırasında pozisyon güncelleme eklendi.
- `aria-haspopup="menu"`, `aria-expanded`, `aria-controls`, `role="menu"` ve `role="menuitem"` eklendi.

## Menü aksiyonları
- Tüm kartları gör
- Bildiklerim
- Kendi kartlarım
- Kataloglarım
- Kendi kartını oluştur

## CSS / layer düzeltmeleri
- `.pearl-study-more-popover` için `position: fixed`, `z-index: 9999`, `isolation: isolate` kullanıldı.
- Menü artık parent overflow / border-radius clipping davranışından etkilenmiyor.
- Light/dark mode panel, border, shadow, hover ve focus states korundu.
- Üst bar yüksekliği değişmiyor; menü açıldığında layout shift oluşmuyor.

## Test
- `npm run qa:pearl-dropdown`: PASS
- `npm run qa:pearl-personal-repeat`: PASS
- `npm run qa:pearl-shuffle`: PASS
- `npm run build`: PASS
