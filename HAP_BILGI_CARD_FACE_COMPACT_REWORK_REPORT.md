# KlinikIQ — Hap Bilgi Çalış Kart Yüzleri ve Kendi Kartını Oluştur Modalı Rework

## Değiştirilen dosyalar

- `src/components/TusPearlStudyScreen.jsx`
- `src/components/TusPearlCard.jsx`
- `src/components/tusPearlCards.css`

## Kart ön yüzü layout iyileştirmesi

- Hap Bilgi Çalış ekranındaki odak kartının ön yüzünden üst meta/tag satırı kaldırıldı.
- Soru metni artık kartın altına itilmeden optik merkeze yerleşiyor.
- Kart yüzü `justify-content: center`, `align-items: center` ve merkezli metin akışıyla yeniden dengelendi.
- Büyük boş üst alan azaltıldı; soru metni tek ana odak olarak bırakıldı.
- Mobilde kart yüksekliği ve font ölçeği daha kontrollü hale getirildi.

## Kart arka yüzü sadeleştirmesi

- Arka yüzdeki `Cevap` başlığı kaldırıldı.
- Anahtar kelime/tag/chip satırı kaldırıldı.
- Cevap metni ana görsel odak haline getirildi.
- Açıklama varsa cevap altında sakin, kısa ve okunabilir paragraf olarak gösteriliyor.
- Ön ve arka yüz aynı merkezli, sade tasarım ailesine çekildi.

## Genel Hap Bilgi kart bileşeni sadeleştirmesi

- `TusPearlCard.jsx` içinde kullanılan küçük kart ön yüzündeki subject/cardType chip satırı kaldırıldı.
- Küçük kart arka yüzündeki `Cevap` label’ı ve keyword chip satırı kaldırıldı.
- Kart yüzleri daha merkezli, daha az etiketli ve daha okunabilir hale getirildi.

## “Kendi kartını oluştur” modalı kompaktlaştırması

- Modal maksimum genişliği `780px` seviyesinden daha kompakt `660px` seviyesine çekildi.
- Maksimum yükseklik, padding, başlık grubu ve form aralıkları azaltıldı.
- Textarea yükseklikleri daha ekonomik hale getirildi; kısa açıklama alanı ayrıca daha kompakt tutuldu.
- Branş ve katalog seçicileri aynı satır düzeninde korunarak daha sıkı spacing verildi.
- Gelişmiş alanlar bölümü daha geri planda, daha hafif bir yüzeye alındı.
- Aksiyon butonları daha kompakt ve kontrollü hizalandı.
- Mobil/tablet kırılımlarında modal tam genişlikte ama daha hafif kalacak şekilde düzenlendi.

## QA sonucu

- Ön yüzde üst tag görünmüyor.
- Ön yüzde soru metni kartın altına itilmiş değil.
- Arka yüzde `Cevap` başlığı görünmüyor.
- Arka yüzde alt tag/chip/keyword satırı görünmüyor.
- Cevap metni ana odak olarak kalıyor.
- Modal önceki sürüme göre daha dar, daha kısa ve daha kompakt.
- Responsive kırılımlar korundu.
- Build başarılı.
