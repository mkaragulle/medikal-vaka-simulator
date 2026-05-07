# KlinikIQ Case Layout Shift Stable Render Fix

## Amaç
Genel vaka ekranında ilk açılışta görülen geniş yerleşimin birkaç saniye sonra daha dar ve kontrollü bir yerleşime dönmesi engellendi. Final tasarım olarak ikinci görseldeki daha dengeli, sakin ve premium kompozisyon esas alındı.

## Kök neden
Vaka ekranı aynı anda birkaç farklı layout katmanından etkileniyordu:

1. `page-shell`, `case-page-shell` ve `professional-qbank-shell` için dosya boyunca birden fazla genişlik/grid kuralı vardı.
2. Branş seçimi sırasında sayfaya geçici olarak `branch-route-reveal` class'ı ekleniyor, ardından kısa süre sonra kaldırılıyordu.
3. `case-route-transition` ve `page-shell` üzerinde transform/opacity animasyonları vardı. Bunlar width değiştirmese bile ilk frame ile final frame arasında “yerine oturma” hissi yaratıyordu.
4. Overlay kalktıktan sonra oluşan/hesaplanan scrollbar genişliği viewport hesabını değiştirebiliyordu.

Bu kombinasyon, kullanıcının ilk gördüğü case layout ile birkaç saniye sonra oturan layout arasında görsel fark oluşmasına neden oluyordu.

## Yapılan düzeltmeler

### 1. Stable case shell sınıfı
Branch vaka ekranı ve blok sınav vaka ekranı için `stable-case-page-shell` sınıfı eklendi.

### 2. Geçici reveal class kaldırıldı
Branch seçimi sonrası case page artık JSX tarafında `branch-route-reveal` class'ı almaz. Böylece mount sonrası class değişimi layout üzerinde etki oluşturmaz.

### 3. Deterministik container genişliği
Case page shell için tek ve final bir genişlik kuralı tanımlandı:

- Desktop: `width: min(calc(100% - clamp(36px, 14vw, 240px)), 1480px)`
- 1180px altı: tek kolon ve daha dar güvenli gutter
- 768px/420px altı: mobil gutter değerleri

### 4. Deterministik iki kolonlu qbank grid
Case içerik + sağ panel grid'i sabitlendi:

- Desktop: `minmax(0, 1fr) clamp(390px, 28vw, 430px)`
- 1320px altı: sağ panel 390px
- 1180px altı: tek kolon

### 5. Layout animasyonları kaldırıldı
Case shell, branch header, qbank shell, right column ve route transition üzerinde width/transform hissi yaratabilecek animasyon/transition etkileri kapatıldı.

### 6. Scrollbar stabilitesi
Authenticated app modunda `scrollbar-gutter: stable` ve body için stabil vertical scrollbar davranışı eklendi. Böylece overlay kalkınca viewport genişliği değişmez.

## Değiştirilen dosyalar

- `src/App.jsx`
- `src/styles/klinikiq-refine.css`
- `CASE_LAYOUT_SHIFT_STABLE_RENDER_REPORT.md`

## Beklenen sonuç

Genel vaka ekranı artık ilk render anında doğrudan final layout ile açılır. Kullanıcı geniş bir yerleşim görüp birkaç saniye sonra daha dar bir yerleşime geçiş yaşamaz. Sol vaka paneli ve sağ yardımcı panel ilk frame'den itibaren ikinci görseldeki kontrollü orana yakın, kararlı ve premium bir grid içinde durur.

## Test sonucu

- CSS brace kontrolü: başarılı
- JSX patch kontrolü: başarılı
- `npm run build`: bu ortamda tamamlanamadı çünkü `node_modules` yok ve `npm install` timeout'a düştü. Build denemesinde `vite: not found` hatası alındı.

## Çalıştırma komutları

```bash
npm install
npm run build
npm run dev
```
