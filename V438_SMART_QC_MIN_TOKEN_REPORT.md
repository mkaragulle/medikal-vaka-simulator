# KlinikIQ V438 — Smart QC Minimum Token

## Kök sebep
Son örneklerde ana sorun AI’ın tıbbi hedefi çoğunlukla bulması ama düşük token limiti altında 5 şık için tam, seçenek-özel feedback üretirken bazı cümleleri yarım bırakmasıydı. Sistem bu kırık cümleleri bazen genel/kalitesiz fallback ile görünür hale getiriyordu. Ayrıca tekrar problemi için modele hiçbir kısa yakın geçmiş bilgisi gitmediğinden aynı branşta aynı klasik tanı kalıpları tekrar edebiliyordu.

## Token artırmadan yapılan çözüm
- Output token limiti artırılmadı; 650 olarak kaldı.
- İkinci AI çağrısı, repair pass, local fallback, prompt cache, question-bank ve topic steering eklenmedi.
- Prompt kısa kaldı; sadece tamamlanmış kısa seçenek nedenleri ve net soru hedefi vurgulandı.
- Client artık yalnızca son 4 doğru cevap metnini `X:` alanında gönderir; bu küçük anti-repeat bağlamıdır, konu yönlendirme değildir.
- Kırık feedback cümleleri (`... birlikte z.` vb.) hem backend hem frontend seviyesinde yakalanır.
- Eksik feedbackte artık bozuk/generic düşük kalite metin yerine kökten çıkarılmış 1-2 ayırıcı bulgu ile profesyonel kısa cümle oluşturulur.
- Yaygın dil hataları için deterministik Türkçe tıp dili temizliği genişletildi.

## Değiştirilen dosyalar
- `api/generate-ai-question.js`
- `api/tus-question-prompt.js`
- `src/utils/simpleAIQuestionAdapter.js`
- `src/components/AnswerFeedbackPanel.jsx`
- `src/services/aiQuestionService.js`

## Test
`node --check` aktif JS dosyalarında çalıştırıldı. JSX dosyasında syntax kontrolü için Babel parser kullanıldı. Full Vite build yapılmadı çünkü sandbox içinde `node_modules` yok.
