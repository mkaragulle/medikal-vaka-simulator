# KlinikIQ V140 — Hap Kart Kütüphanesi Hiyerarşik Tasarım

- Hap Kartlar ekranı materyal kütüphanesiyle aynı mantıkta sınıf → komite/başlık → hap kart destesi ağacına dönüştürüldü.
- Üst başlık metni daha uzun dönemli kullanım için “Hap Kart Kütüphanesi” olarak sadeleştirildi.
- Eski grid kart görünümü yerine kompakt, açılır/kapanır, girintili satır yapısı eklendi.
- Kullanıcı 1.–6. sınıf boyunca oluşturduğu kart destelerine sınıf, komite ve materyal düzeyinde ulaşabilir.
- Kart destesi satırlarında doğrudan çalışma ekranına geçiş korundu.

Build kontrolü: npm install sonrası `npm run build` başarıyla çalıştı. ZIP hazırlanırken node_modules ve dist klasörleri çıkarıldı.
