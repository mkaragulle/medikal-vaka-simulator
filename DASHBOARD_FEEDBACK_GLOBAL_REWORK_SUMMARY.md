# KlinikIQ Dashboard + Global Feedback Rework Summary

## Kapsam
- Toplam vaka sayısı: 132
- Feedback bulunan vaka sayısı: 132
- Feedback standardizasyonu uygulanan vaka sayısı: 132
- UI düzenlemesi yapılan ana alanlar: Dashboard Oturum Performansı paneli, genel AnswerFeedbackPanel kart sistemi, feedback ikon hizalama sistemi, kanıt zinciri / sınav notu / yönetim / seçenek karşılaştırması kartları.

## Dashboard “Oturum performansı” paneli
- Sağ panel dekoratif skor listesinden kişisel performans içgörü paneline dönüştürüldü.
- Panel artık `stats`, `wrongAnswers`, aktif mod, blok geçmişi ve yanlış cevap branşlarını kullanarak yorum üretir.
- İkon kapsayıcıları fixed-size, center-aligned ve tek tip `inline-grid/place-items:center` mantığına alındı.
- Yeni dinamik alanlar:
  - Ana performans başlığı
  - Veri temelli kısa açıklama
  - Çalışma odağı kartı
  - Aktif strateji kartı
  - Tek aksiyonlu sonraki adım kartı
- Veri yetersizse sistem aşırı spesifik yorum uydurmaz; başlangıç kalibrasyonu ve öğrenme modu önerisi verir.

## Kullanıcı spesifik öneri mantığı
- Doğruluk düşükse kısa öğrenme bloğu ve temel patern tekrarı önerilir.
- Yanlış geçmişinde branş yoğunluğu varsa en zayıf branş açıkça belirtilir.
- Yanlış cevap başlığı/seçimi/doğru cevap içeriğinden hata alanı çıkarılır:
  - Tetkik seçimi
  - Tanısal ayrım
  - Yönetim sırası
  - TUS spot bilgisi
- Doğruluk yüksekse güçlü yön belirtilir ve dar hedefli mini blok önerilir.

## Global feedback sistemi
- `AnswerFeedbackPanel.jsx` genel feedback render mantığı iyileştirildi.
- Klinik gerekçe, kanıt zinciri, sınav notu, yönetim ve seçenek karşılaştırması kartları daha okunabilir hale getirildi.
- Kaba iki nokta üst üste etiketleri render düzeyinde azaltıldı.
- Klinik pearl ve management kartlarında başlık ayrı, açıklama ayrı okunacak şekilde düzenlendi.
- Uzun metin kırılmalarında feedback tarafında `...` / `…` kullanımı kaldırıldı.

## İçerik standardizasyonu
- `src/data/cases.js` içindeki 132 vakanın feedback alanları global QC scriptiyle temizlendi.
- “Kanıt 1”, “İlk tedavi”, “İlk adım”, “TUS kırmızı bayrağı”, “Mekanistik yaklaşım” gibi zayıf başlıklar daha doğal başlıklara dönüştürüldü.
- Kanıt zinciri başlıkları metne göre yeniden sınıflandırıldı: öykü ipucu, muayene bulgusu, laboratuvar paterni, görüntüleme bulgusu, klinik bağlam, mekanizma.
- Seçenek karşılaştırması noktalarında “Ana ipucu:” / “Kanıt:” gibi kaba prefixler temizlendi.
- Çeldirici açıklamalarında yarım kalan `...` ifadeleri kaldırıldı.

## Çocuk istismarı örneği
- `pediatrics-shaken-baby-syndrome-001` özel olarak yeniden yazıldı.
- Klinik gerekçe; nöbeti tek başına primer nörolojik olay gibi ele almama, farklı yaşta ekimoz, tutarsız travma öyküsü ve letarjiyi çocuk istismarı kırmızı bayrağı olarak kurar.
- Kanıt zinciri dört somut maddeye indirildi: letarji, ekimozların yaşı, öykü-bulgu uyumsuzluğu, yüksek özgüllükte ipuçları.
- Yönetim sırası stabilizasyon, objektif kayıt, güvenlik ve bildirim olarak yeniden düzenlendi.

## Değiştirilen dosyalar
- `src/components/HomeCommandCenter.jsx`
- `src/components/AnswerFeedbackPanel.jsx`
- `src/data/cases.js`
- `src/index.css`
- `scripts/rework-performance-feedback-qc.mjs`
- `PERFORMANCE_FEEDBACK_GLOBAL_QC_REPORT.json`
- `DASHBOARD_FEEDBACK_GLOBAL_REWORK_SUMMARY.md`
- `BUILD_CHECK_RESULT.md`

## Çalıştırma komutları
```bash
npm install
npm run build
npm run dev
```
