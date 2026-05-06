# KlinikIQ Dashboard Oturum Performansı Paneli — Kişiselleştirilmiş İçgörü Rework

## Amaç
Dashboard sağ paneli artık sol hero alanındaki sayısal metrikleri tekrar eden statik bir kart değildir. Panel, kullanıcının mevcut oturum istatistiklerini, yanlış cevap listesini ve son sınav geçmişini birlikte okuyarak kişiye özel çalışma odağı, aktif strateji ve sonraki adım önerisi üretir.

## İkon hizalama düzeltmeleri
- Sağ panel içgörü kartlarında ikon kutuları `44x44px` fixed contract ile standartlaştırıldı.
- İkon wrapper `inline-flex`, `align-items: center`, `justify-content: center`, `line-height: 0` ve `padding: 0` ile tam merkezlendi.
- SVG boyutları `19x19px` olarak sabitlendi; `display: block`, `margin: 0`, `transform: none` ve tutarlı `stroke-width` eklendi.
- Mobilde ikon kutuları kontrollü biçimde `42x42px` değerine düşüyor; grid hizası bozulmuyor.
- Kartlarda ikon-metin yerleşimi `44px + minmax(0, 1fr)` grid yapısına alındı.

## Kullanıcı spesifik yorum üretme mantığı
Panel artık şu verileri değerlendirir:
- genel oturum doğruluk seviyesi,
- mevcut doğru seri,
- yanlış cevap listesi,
- aynı vakada tekrar eden yanlış eğilimleri,
- en sık yanlış yapılan branş,
- son sınav geçmişindeki düşük performanslı branş,
- yanlış cevap metinlerinden çıkarılan hata paterni.

## Dinamik hale getirilen alanlar
- Üst durum başlığı: düşük doğruluk, branş zayıflığı, güçlü seri veya veri eksikliğine göre değişir.
- Üst açıklama: yanlış branş, dominant hata paterni veya tekrar eden yanlış vakaya göre kişiselleşir.
- Kişisel çalışma odağı: en zayıf branş veya hata türüne göre değişir.
- Aktif strateji: doğruluk seviyesi ve öğrenme/sınav moduna göre değişir.
- Sonraki adım: yanlış branşa, hata paternine ve performans seviyesine göre uygulanabilir tek aksiyon üretir.

## Hata paterni sınıfları
- Tetkik seçimi / sonuç yorumlama
- İlk yönetim basamağı
- Ayırıcı tanı ve karar verdirici bulgu
- TUS spot kelime yakalama

## Değiştirilen dosyalar
- `src/components/HomeCommandCenter.jsx`
- `src/App.jsx`
- `src/styles/klinikiq-refine.css`

## Not
Sayısal metrikler sol hero alanında korunmuştur. Sağ panelde aynı metrikler tekrar gösterilmez; sağ panel yalnızca yorumlayıcı ve yönlendirici içerik üretir.
