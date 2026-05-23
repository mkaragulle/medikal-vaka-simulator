# Smart Glossary V274 – Related Count Chip Cleanup

## Amaç
Hap Bilgi Çalış ekranında glossary tooltip içinde görünen `14 ilgili olgu`, `3 soru`, `5 hap kart` gibi ilişki sayısı rozetleri kaldırıldı. Bu rozetler özellikle kompakt tooltip deneyimini kalabalıklaştırıyor ve AMBOSS tarzı hızlı ön izleme kartı hissini zayıflatıyordu.

## Değiştirilen dosya
- `src/components/GlossaryTooltip.jsx`

## Yapılan değişiklik
- `GlossaryCard` içinde render edilen `smart-glossary-links` bölümü kaldırıldı.
- `relatedCases`, `relatedQuestions`, `relatedFlashcards` verileri silinmedi; yalnızca tooltip içinde görünmeleri engellendi.
- Böylece ileride “ilgili olgulara git” veya arama/navigasyon özelliği eklenmek istenirse veri modeli korunmuş olur.

## Korunan davranışlar
- Ana terim başlığı görünür.
- Kısa tanım görünür.
- Pre-answer modda cevap sızdırmayan kısa tanım korunur.
- Post-answer modda TUS ipucu ve ayırıcı not korunur.
- Nested tooltip davranışı korunur.
- Tooltip viewport/overflow düzeltmeleri korunur.

## Test edilmesi gereken ekranlar
1. Hap Bilgi Çalış ekranı
2. Klinik Branş Seç vaka ekranı
3. TUS Spot Olgular
4. Zamanlı Sınav Oluştur
5. Tooltip içinde nested tooltip açılan alanlar

## Beklenen sonuç
Tooltip içinde artık `ilgili olgu`, `soru`, `hap kart` sayısı rozetleri görünmez. Kart daha sade, beyaz, hızlı okunabilir ve metin odaklı kalır.
