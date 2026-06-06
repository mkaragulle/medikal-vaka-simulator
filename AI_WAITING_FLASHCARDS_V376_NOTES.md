# KlinikIQ V376 — AI Bekleme Ekranında Hap Kart Mini Tekrar

Bu sürümde `Yeni TUS Sorusu Üret` akışında kullanıcı beklerken boş progress ekranı görmek yerine mevcut KlinikIQ hap kart havuzundan seçilen mini tekrar kartlarını çalışabilir.

## Eklenen davranış

- Soru üretimi başlayınca bekleme kartı artık `Beklerken mini tekrar` alanı gösterir.
- Mevcut TUS hap kart bankasından 3 kart seçilir.
- Kartlar öncelikle seçilen branşa göre filtrelenir.
- Aynı kartların sık tekrar etmemesi için `localStorage` içinde son gösterilen kartlar tutulur.
- Kullanıcı her kart için `Biliyorum`, `Tekrar et`, `Zorlandım` işaretlemesi yapabilir.
- Bu işaretler yine `localStorage` içinde saklanır.
- Sonraki seçimlerde `Zorlandım` ve `Tekrar et` kartları önceliklendirilebilir.
- Soru hazır olunca kullanıcıya yanıp sönen `Soruyu gör` butonu çıkar.
- Kullanıcı butona basmadan hap kart alanı otomatik kapanmaz; okuma kontrolü kullanıcıda kalır.

## Maliyet etkisi

- Bu özellik yeni OpenAI çağrısı yapmaz.
- Hap kartlar mevcut frontend veri havuzundan çekilir.
- AI üretim maliyeti artmaz.
- Ama bekleme süresi öğretici mini tekrar süresine dönüşür.

## Güncellenen dosyalar

- `src/components/AIGeneratedQuestionView.jsx`
- `src/index.css`

## Teknik notlar

Yeni localStorage anahtarları:

- `klinikiq.aiQuestion.waitingFlashcards.status.v1`
- `klinikiq.aiQuestion.waitingFlashcards.shown.v1`

Kart seçim mantığı:

1. Seçilen branşa uygun kartlar önceliklidir.
2. Son gösterilen kartlar tekrar edilmemeye çalışılır.
3. `Zorlandım` işaretli kartlar öncelikli tekrar adayıdır.
4. Zorluk seçimi ile kart zorluğu arasında uyum puanı verilir.
5. Yeterli kart bulunmazsa genel TUS hap kart havuzundan tamamlanır.

## Build sonucu

`npm run build` başarılıdır. Sadece mevcut büyük chunk uyarıları görülmüştür; compile hatası yoktur.
