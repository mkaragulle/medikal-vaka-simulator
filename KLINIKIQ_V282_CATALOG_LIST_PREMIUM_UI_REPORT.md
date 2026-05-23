# KlinikIQ V282 — Kataloglarım Premium Kart Satırı UI Düzeltmesi

## Kök problem
“Kataloglarım” ekranındaki kart satırları tek düz metin bloğu gibi render ediliyordu. Metadata, soru ve cevap aynı görsel ağırlığa yakındı; teal renk fazlaydı; sağdaki `Eklendi` ve `X` aksiyonları premium KlinikIQ arayüzünden kopuk duruyordu. Ayrıca glossary vurguları katalog yönetim ekranında öğrenme ekranına göre fazla baskın görünüyordu.

## Değiştirilen dosyalar
- `src/components/TusPearlStudyScreen.jsx`
- `src/components/tusPearlCards.css`

## Yeni satır layout’u
Kart satırları `catalog-card-row` yapısına alındı:
- Sol taraf: `catalog-card-content`
- Metadata: `catalog-card-meta`
- Soru: `catalog-card-question`
- Cevap: `catalog-card-answer`
- Sağ aksiyonlar: `catalog-card-action`

Bu yapı `grid-template-columns: minmax(0, 1fr) auto` mantığıyla çalışır. Böylece uzun soru/cevap metinleri sağdaki butonların altına girmez.

## Metadata/tag görsel ağırlığı
`Sistem kartı · Anatomi · Aktif hatırlama` tek güçlü teal satır gibi değil, küçük ve muted metadata/chip yapısı olarak gösterildi. Ana soru metni daha okunabilir slate/navy tona çekildi; teal yalnızca düşük doz vurgu olarak bırakıldı.

## “Eklendi” ve X butonları
- `Eklendi` state’i daha soft, küçük ve premium disabled pill olarak düzenlendi.
- `Kataloğa ekle` butonu soft teal aksiyon görünümüne alındı.
- X kaldırma butonu küçük, yuvarlak, subtle border’lı icon button haline getirildi; hover’da hafif kırmızı reaksiyon verir.

## Glossary vurguları
Katalog yönetim listelerinde glossary underline/renk vurgusu daha subtle hale getirildi. Tooltip fonksiyonu korunur; yalnızca bu ekranın yönetim/listing yüzeyinde görsel baskınlığı azaltıldı.

## Responsive davranış
Desktop’ta içerik solda, aksiyonlar sağda kalır. 760px altındaki dar ekranlarda kart tek kolona düşer ve aksiyonlar alt-sağa hizalanır. Arama input’u, kaynak dropdown’u ve Yeni Kart butonu mobilde tek kolona geçer.

## Fonksiyonel akış
Kart ekleme, eklenmiş kart state’i, katalogdan kaldırma, kullanıcı kartını düzenleme, arama, kaynak filtresi ve yeni kart oluşturma akışlarına fonksiyonel değişiklik yapılmadı. Veri yapısı, soru/cevap metinleri ve glossary eşleşme sistemi değiştirilmedi.

## Build notu
`npm install` ortamda zaman aşımına uğradığı için tam Vite build çalıştırılamadı. Değişiklikler JSX/CSS ile sınırlı tutuldu; CSS brace dengesi kontrol edildi.
