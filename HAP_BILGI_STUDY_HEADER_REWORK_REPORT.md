# Hap Bilgi Çalış Üst Bar Rework Raporu

## Amaç
Hap Bilgi Çalış ekranındaki üst kontrol alanı sadeleştirildi. Kart çalışma odağını bozan büyük ve dağınık chip/buton dizisi kaldırılarak aktif deck bilgisi, ana tekrar listeleri, yeni sıra ve ikincil işlemler tek bir kompakt kontrol barında toplandı.

## UI değişiklikleri
- Eski `pearl-study-quickbar` yerine yeni `pearl-study-compactbar` yapısı eklendi.
- Sol bölüm yalnızca aktif deck adını ve kart sayısını gösterir.
- Orta bölümde sadece ana tekrar listeleri segment olarak görünür: Tüm kartlar, Favoriler, Zorlandıklarım, Tekrar et.
- Sağ bölümde `Yeni sıra` ve `Diğer` menüsü bulunur.
- `Kendi kartını oluştur` ve `Kataloglarım` üst barda büyük buton olmaktan çıkarıldı.

## Menüye taşınan aksiyonlar
- Bildiklerim
- Kendi kartlarım
- Kataloglarım
- Kendi kartını oluştur

## Yeni sıra davranışı
`Yeni sıra` mevcut `rebuildStudySession(filteredCards)` fonksiyonunu kullanmaya devam eder. Böylece yeni seed üretilir, deck yeniden karıştırılır ve mevcut Fisher-Yates + interleave + recent-start avoidance algoritması korunur.

## Responsive davranış
- Desktop: sol deck bilgisi + ortada segmentler + sağda aksiyonlar.
- Tablet: segment kontrol alt satıra geçer, yatay taşma olmadan scroll edilebilir.
- Mobil: deck adı üstte kalır, `Yeni sıra` ikon butonuna dönüşür, `Diğer` kompakt menü olarak kalır.

## Testler
- `npm run qa:pearl-personal-repeat`: PASS
- `npm run qa:pearl-shuffle`: passed
- `npm run build`: başarılı
