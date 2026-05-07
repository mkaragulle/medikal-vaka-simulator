# KlinikIQ — AI ile Soru Üret Branş Uyum ve Başlık Kalitesi Rework Raporu

## Kapsam
Bu güncelleme dashboard üzerindeki **AI ile Soru Üret** akışını branch-aware, validation destekli ve TUS Spot Olgular formatına daha uygun hale getirir. Amaç, seçilen branşa aykırı hasta profili üretimini engellemek, yapay başlıkları kaldırmak ve üretilen soruları branşın yaş/cinsiyet/klinik bağlam kurallarıyla doğrulamaktır.

## Yapılan ana değişiklikler

1. **Branş kural motoru eklendi**
   - Yeni dosya: `src/utils/aiBranchRules.js`
   - 13 ana branş/kategori için kural tanımlandı:
     - TUS Spot Olgular / Rastgele
     - Anatomi
     - Fizyoloji
     - Histoloji ve Embriyoloji
     - Tıbbi Biyokimya
     - Tıbbi Mikrobiyoloji
     - Tıbbi Patoloji
     - Tıbbi Farmakoloji
     - İç Hastalıkları
     - Çocuk Sağlığı ve Hastalıkları
     - Genel Cerrahi
     - Kadın Hastalıkları ve Doğum
     - Küçük Stajlar

2. **Demografi ve bağlam kontrolü eklendi**
   - Pediatri için `yenidoğan / bebek / çocuk / adölesan` dışı profiller reddedilir.
   - Kadın Doğum için erkek hasta, prostat/testis gibi branş dışı bağlamlar reddedilir.
   - Temel bilim branşlarında zorunlu klasik hasta öyküsü yerine klinik-bağlantılı temel bilim senaryosu oluşturulur.

3. **Başlık üretimi yeniden yazıldı**
   - `AI spot`, `AI soru`, `branş adı + AI`, `çeldirici ayrımı`, `vaka analizi` gibi yapay başlıklar kullanıcıya gösterilmez.
   - Başlıklar artık klinik problem veya temel bilim paterninden türetilir.
   - Örnek başlıklar: `Yenidoğanda sarılık paterni`, `Gebelikte hipertansiyon ve baş ağrısı`, `Ventilasyon perfüzyon uyumsuzluğu`, `El bileği düşüklüğü`.

4. **Branşa özel template seed bank eklendi**
   - Yeni dosya: `src/data/aiBranchQuestionTemplates.js`
   - Zayıf seed sayısına sahip branşlar için kontrollü, bilimsel, TUS odaklı ek şablonlar eklendi.
   - Özellikle Kadın Doğum, Fizyoloji, Histoloji-Embriyoloji, Anatomi, Pediatri, Genel Cerrahi ve Küçük Stajlar güçlendirildi.

5. **Generator zinciri branch-aware hale getirildi**
   - `selectedBranch → generation constraints → branch validation → novelty validation → final render` zinciri kuruldu.
   - Seçilen branş filtresi artık seed seçiminde, demografi seçiminde, başlık üretiminde ve validasyonda kullanılır.
   - Branch mismatch durumunda soru discard edilip tekrar üretilir.

6. **Remote AI validation güçlendirildi**
   - Remote AI aktif olduğunda bile üretilen soru seçilen branch kuralından geçmek zorundadır.
   - Remote çıktı başarısızsa mevcut gömülü vaka gösterilmez; local branch-aware generator devreye girer.

7. **Duplicate sistemi ayarlandı**
   - Tam içerik imzası (`signature`) ve gömülü vaka overlap kontrolü korunur.
   - Aynı konu farklı açıdan sorulabileceği için yalnızca topic/correct tekrarına dayalı aşırı katı blok kaldırıldı.
   - Böylece aynı hastalık farklı soru açısıyla üretilebilir; birebir aynı içerik engellenmeye devam eder.

## Kontrol/test sonucu

Node tabanlı generator doğrulama testi çalıştırıldı:

```txt
Random: 50 üretim → 50 benzersiz ID, 50 benzersiz içerik signature, invalid: 0
Pediatri: 50 üretim → erişkin/geriatrik profil: 0, invalid: 0
Kadın Doğum: 30 üretim → erkek/uygunsuz üreme bağlamı: 0, invalid: 0
Anatomi: 12 üretim → invalid: 0
Fizyoloji: 12 üretim → invalid: 0
Histoloji ve Embriyoloji: 12 üretim → invalid: 0
Genel Cerrahi: 12 üretim → invalid: 0
İç Hastalıkları: 12 üretim → invalid: 0
Tıbbi Mikrobiyoloji: 12 üretim → invalid: 0
Tıbbi Farmakoloji: 12 üretim → invalid: 0
Tıbbi Biyokimya: 12 üretim → invalid: 0
Tıbbi Patoloji: 12 üretim → invalid: 0
Küçük Stajlar: 12 üretim → invalid: 0
Başlıklarda AI spot / AI soru / çeldirici ayrımı şablonu: 0
```

## Build durumu

Bu ortamda `node_modules` bulunmadığı için `npm run build` komutu `vite: not found` hatası verdi. `npm install --package-lock=false --legacy-peer-deps --no-audit --no-fund` denemesi ortam kaynaklı timeout ile tamamlanamadı. Değiştirilen JS dosyaları `node --check` ile syntax açısından kontrol edildi ve generator testleri Node import üzerinden başarıyla çalıştırıldı.

## Çalıştırma komutları

```bash
npm install
npm run build
npm run dev
```
