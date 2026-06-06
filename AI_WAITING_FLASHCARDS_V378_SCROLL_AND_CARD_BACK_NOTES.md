# V378 — AI Waiting Flashcards Scroll and Card Back Refinement

Bu sürümde TUS AI soru üretimi sırasında bekleme alanının kullanıcıyı sayfanın en üstüne zorla götürmesi düzeltildi. `handleGenerateNextAIQuestion` içindeki gereksiz `scrollToTopSmart()` çağrısı kaldırıldı ve AI soru ekranında ilgili bölüme kontrollü scroll davranışı eklendi.

## Değişiklikler

- Yeni TUS sorusu üretildiğinde sayfa artık en üste gitmez; bekleme/mini tekrar alanına scroll edilir.
- “Soruyu Gör” tıklandığında sayfa ilgili soru alanına scroll edilir.
- “Soruyu gör / Hazırlandı — çözmeye başla” butonu tek metne indirildi: “Soruyu Gör”.
- Buton daha güçlü CTA görünümüne alındı.
- Hap kart ön/arka yüzündeki “cevap için karta dokun” ve “soruya dönmek için tekrar dokun” ipuçları kaldırıldı.
- Hap kart arka yüzü iki renkli bilgi bloğuna ayrıldı:
  - yeşil tonlu cevap bloğu
  - turuncu tonlu açıklama bloğu
- Arka yüzde scrollbar fonksiyonu eklendi; scrollbar görsel olarak gizlendi.
- Kartların sabit yükseklik ve buton hizası korunmaya devam ediyor.

## Güncellenen dosyalar

- `src/App.jsx`
- `src/components/AIGeneratedQuestionView.jsx`
- `src/index.css`

## Build

`npm run build` başarılıdır. Yalnızca mevcut büyük chunk uyarıları vardır; compile/beyaz ekran hatası yoktur.
