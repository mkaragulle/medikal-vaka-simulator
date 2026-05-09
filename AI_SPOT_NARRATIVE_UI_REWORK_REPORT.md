# KlinikIQ AI Spot Narrative UI Rework Report

## Amaç
AI ile üretilen TUS Spot sorularında klasik gömülü vaka ekranındaki Hasta özeti / Profil / Başvuru / Risk bağlamı / Ayırt ettirici ipuçları / Kısa klinik öykü özeti / Muayene kartları yapısı kaldırıldı. AI soruları artık sol panelde tek akışlı, paragraf temelli bir soru kökü olarak gösterilir.

## UI değişiklikleri
- `AIGeneratedQuestionView` artık AI soruları için `CasePlayer` kullanmaz.
- Yeni `AISpotQuestionScreen` iki kolonlu yapıyı korur: sol tarafta narrative soru metni, sağ tarafta mevcut cevap paneli.
- Sol panelde yalnızca küçük meta badge'ler, nötr başlık, kısa branş bağlamı ve tek akışlı soru metni bulunur.
- Cevap öncesi spot bilgi, sınav notu, ayırt ettirici ipucu, klinik gerekçe ve kanıt zinciri gösterilmez.
- Sağ kolonda mevcut `DiagnosisQuiz` ve cevap sonrası `AnswerFeedbackPanel` akışı korunur.

## AI output / veri modeli
- AI promptu `stem` alanını front-facing tek akışlı TUS soru kökü olarak üretmeye zorlar.
- `stemMode: 'narrative'` ve `narrativeStem` alanları normalize edilen AI sorularına eklenir.
- Compact OpenRouter promptu da laboratuvar, kültür, muayene ve vital verilerini ayrı kartlara bırakmadan `s`/`stem` içine doğal metin olarak yazacak şekilde güncellendi.

## Leakage önleme
- Sol panel `buildAISpotNarrativeStem` üzerinden oluşturulur.
- Bu katman cevap öncesi metinden şu kalıpları temizler: Risk bağlamı, Ayırt ettirici ipuçları, Klinik gerekçe, Kanıt zinciri, Sınav notu, Kritik ipucu, neden doğru/yanlış anlatıları.
- Başlık doğru cevabı içeriyorsa otomatik olarak nötr başlığa düşer.
- Soru kökünde doğru cevap metni birebir geçerse kullanıcıya gösterilmeden maskelenir.

## Test sonucu
- `npm run build` başarılıdır.
- Vite build sonucu: 97 modül dönüştürüldü, production build tamamlandı.
