# KlinikIQ V377 — AI Waiting Flashcards UI Refinement

Bu sürüm, V376'daki AI soru üretimi bekleme alanını görsel ve öğretici açıdan revize eder.

## Yapılan değişiklikler

- Üstteki `Beklerken mini tekrar` kicker/tag kaldırıldı.
- Loading başlığı `Yeni TUS sorunuz hazırlanıyor.` olarak değiştirildi.
- Ready başlığı `Sorunuz hazırlandı, istediğiniz zaman çözebilirsiniz.` olarak değiştirildi.
- Mini tekrar başlığı `Sorunuz oluşturulurken hap kartlar ile çalışın.` olarak sadeleştirildi.
- `Ek AI maliyeti yok...` ve `Soru hazır olduğunda kartlar kapanmaz...` yardımcı metinleri kaldırıldı.
- Hap kartlar gerçek flashcard mantığına çevrildi:
  - Ön yüzde yalnızca soru metni gösterilir.
  - Arka yüzde cevap/açıklama metni gösterilir.
  - Kart tıklanınca ön/arka yüz arasında döner.
- Keyword/tag chipleri kaldırıldı.
- Kart metinleri ön ve arka yüzde ortalandı.
- Kart yükseklikleri eşitlendi.
- `Biliyorum / Tekrar et / Zorlandım` butonları tüm kartlarda sabit alt sıraya alındı.
- `Soruyu gör` CTA'sı daha büyük, belirgin ve animasyonlu hale getirildi.

## Maliyet etkisi

Bu değişiklik ekstra OpenAI çağrısı oluşturmaz. Kartlar mevcut KlinikIQ hap kart havuzundan seçilmeye devam eder.

## Build

`npm run build` başarıyla tamamlandı. Yalnızca mevcut büyük chunk uyarıları devam ediyor.
