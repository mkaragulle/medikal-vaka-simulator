# KlinikIQ Hap Bilgi Kartları + Yanlışlar Rework

## Uygulanan ana değişiklikler

- `Hap Bilgi Kartları` artık BranchSelector içinde bağımsız, uzun liste olarak gösterilmiyor.
- Ana sayfaya yeni `Kişisel tekrar merkezi` eklendi.
- Sol panelde `Yanlış çözülenler`, sağ panelde `Hap Bilgi Kartları` olacak şekilde iki kolonlu çalışma ekosistemi kuruldu.
- Sağ panel artık tam liste değil; istatistik, hızlı filtre, önerilen kartlar, katalog oluşturma ve güçlü CTA yüzeyi olarak çalışıyor.
- `Hızlı tekrar başlat` akışı yeni tek kart odaklı çalışma ekranına yönlendiriyor.

## Yeni component yapısı

- `src/components/StudyReviewHub.jsx`
  - Yanlış çözülenler ve hap kart panelini tek çalışma merkezi olarak birleştirir.
- `src/components/TusPearlHubPanel.jsx`
  - Hap kartların ana sayfadaki özet/CTA panelidir.
- `src/components/TusPearlStudyScreen.jsx`
  - Tek ana kartlı flashcard çalışma ekranıdır.

## Çalışma ekranı özellikleri

- Tek büyük odak kartı.
- Kart çevirme: tıklama veya `Space`.
- Kart geçişi: sağ/sol ok tuşları, alt butonlar veya mobil swipe benzeri sürükleme.
- Favori, biliyorum, tekrar et, zorlandım ve kataloğa ekle aksiyonları.
- Katalog oluşturma ve katalog filtreleme.
- Branş ve filtre seçimi.
- Progress bar ve `x / y kart` göstergesi.

## UX / UI düzenlemeleri

- KlinikIQ tasarım diliyle uyumlu açık yüzeyler, mint/teal aksanlar, yumuşak radius, kontrollü gölge ve premium kart yapısı kullanıldı.
- Desktop iki kolon, tablet tek kolon, mobil güçlü tek kart deneyimi olacak şekilde responsive kırılım yapıldı.
- Eski kalabalık kart listesi ana akıştan kaldırıldı; kullanıcı artık özet panelden çalışma ekranına geçiyor.

## Doğrulama

- `npm install --package-lock=false --legacy-peer-deps --no-audit --no-fund`
- `npm run build`
- Build sonucu: başarılı.
