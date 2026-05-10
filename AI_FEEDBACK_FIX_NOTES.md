# KlinikIQ AI soru üretim düzeltmesi

Bu paket, mevcut tasarım ve genel uygulama akışı korunarak yalnızca AI TUS spot soru üretimi ve feedback davranışı için küçük, hedefli düzeltmeler içerir.

## Değiştirilen alanlar

- `api/generate-ai-question.js`
  - Prompt basit tutuldu; uzman feedbacklerine göre başlık/kök cevabı ele vermesin, tek öğrenme hedefi olsun, seçenekler aynı kategoride kalsın, veri alanları karışmasın, feedback kısa ve tekrarsız olsun kuralları eklendi.
  - Etik-hukuki soru hedefi otomatik rastgele üretim havuzundan çıkarıldı.
  - Başlıkta, soru kökünde, veri panelinde veya kanıt zincirinde doğru cevabın doğrudan tekrarlanmasını yakalayan hafif validasyon eklendi.
  - Yönetim/tedavi basamağı yalnızca `first_step`, `next_step`, `treatment`, `prevention` hedeflerinde kabul edilecek şekilde sınırlandı.
  - `OPENAI_API_KEY` yokken endpoint artık boş OpenAI cevabı dönmek yerine güvenli yerel fallback soruya düşer.

- `src/utils/simpleAIQuestionAdapter.js`
  - Kanıt zincirinde doğru cevabın aynen tekrar edilmesi filtrelendi.
  - Yönetim basamakları yalnızca gerçekten yönetim/tedavi hedefli sorularda taşınacak şekilde sınırlandı.

- `src/components/AnswerFeedbackPanel.jsx`
  - AI spot sorularda mekanizma, tanı, test veya laboratuvar yorumu hedeflenmişse otomatik “yönetim/tedavi adımı” kartı gösterilmemesi sağlandı.
  - Feedback başlıkları küçük copy düzeltmeleriyle kullanıcının istediği formata yaklaştırıldı: Klinik/Bilimsel gerekçe, TUS ipucu, Kanıt zinciri.

## Kontrol

- `node --check api/generate-ai-question.js` başarılı.
- Endpoint fallback testi başarılı: API anahtarı yokken güvenli yerel soru döndü.
- Cevabı başlıkta ele veren sahte OpenAI çıktısı validasyon tarafından reddedilip fallback’e düştü.

Not: Bu çalışma ortamında `node_modules` bulunmadığı için `npm run build` çalıştırılamadı; Vite yüklü olmadığı için `vite: not found` hatası alındı. Vercel veya lokal ortamda `npm install` sonrası build alınmalıdır.
