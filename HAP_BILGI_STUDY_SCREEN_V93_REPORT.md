# Hap Bilgi Çalış Ekranı V93 Revizyonu

## Değişen dosyalar
- `src/components/TusPearlStudyScreen.jsx`
- `src/components/tusPearlCards.css`

## Yapılan düzenlemeler
- `Biliyorum`, `Tekrar et`, `Zorlandım` butonları sağ panelin altından çıkarıldı ve kartın hemen altına taşındı.
- Kullanıcı ekrana geldiğinde öğrenme kararı butonları ilk görünümde karşısına gelecek şekilde kart yüksekliği ve çalışma alanı oranları revize edildi.
- Sağ panel yeniden yapılandırıldı:
  - Çalışma paneli başlığı ve aktif liste bilgisi eklendi.
  - Tekrar listeleri ayrı ve daha anlaşılır bir blok haline getirildi.
  - Katalog / yeni sıra / diğer kontrolleri “Oturum” bölümüne alındı.
  - Favori, kataloğa ekle, kendi kartını oluştur, kopyala/düzenle/sil aksiyonları “Kart araçları” bölümünde toplandı.
- Sağ panelde her aksiyonun kısa açıklaması eklendi; sadece buton kalabalığı görünümü azaltıldı.
- Responsive davranış korundu.

## Build notu
Bu çalışma dosya seviyesinde uygulanmıştır. Paket içinde `node_modules` bulunmadığı için yerel build bu ortamda doğrulanamamıştır.
