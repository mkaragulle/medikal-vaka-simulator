# KlinikIQ V372 Performance Audit Report

## Kapsam
Bu performans geçişinde proje zipi açıldı, React + Vite kaynakları incelendi ve özellikle kullanıcı tarafından belirtilen mikro donma alanları hedeflendi: vaka listesi, seçenek/feedback etkileşimi, Kataloglarım > Tüm kartlardan ekle, glossary tooltip katmanı, premium cursor, custom scrollbar, popup/dropdown konumlandırmaları, storage yazımları ve scroll sırasında ağır CSS efektleri.

## Tespit edilen darboğazlar

### 1. Büyük statik dosyalar ve başlangıç yükü
- `src/data/cases.js` yaklaşık 6.6 MB; Vite tarafında `case-bank` chunk olarak ayrılıyor ancak `App.jsx` içinde statik import edildiği için uygulama akışının ana veri bağımlılığı hâlinde kalıyor.
- `src/components/GlossaryTooltip.jsx` + glossary indexleri büyük bir chunk oluşturuyor. Build çıktısında glossary chunk hâlâ en büyük runtime parçalarından biri.
- `src/index.css` yaklaşık 1.6 MB, `src/components/tusPearlCards.css` yaklaşık 0.5 MB. Scroll sırasında box-shadow, blur/backdrop-filter, transition ve animasyon maliyeti hissedilebilir.

### 2. Vaka listesi render maliyeti
- `CaseList.jsx` içinde her vaka kartı başlığında `GlossaryText` çalışıyordu. Yatay vaka listelerinde sık geçiş ve selected/solved state değişimlerinde gereksiz glossary parse/render maliyeti üretiyordu.
- Yatay liste reset anahtarı tüm vaka listesini `id:solved` stringine dönüştürüyordu. Büyük listelerde her renderda gereksiz map/join maliyeti oluşuyordu.

### 3. Hap Bilgi / Kataloglarım liste maliyeti
- `TusPearlStudyScreen.jsx` içinde katalogdaki kartlar ve “Tüm kartlardan ekle” satırları inline JSX ile render ediliyordu.
- Her renderda satır içi callbackler yeniden oluşuyordu; bu durum özellikle arama, filtre, visible count ve catalog membership değişimlerinde satırların gereksiz tekrar render edilmesine yol açıyordu.
- V371’deki 48 görünür kart limiti doğru yönde bir iyileştirmeydi; bu limit korunmalıydı.

### 4. Custom scrollbar DOM tarama/ölçüm maliyeti
- `KlinikIQCustomScrollbars.jsx` genel DOM üzerinde `body *` taraması yapıyordu. MutationObserver tetiklerinde bu tarama ve ardından `getBoundingClientRect` / overflow kontrolleri pahalı hâle gelebiliyordu.
- Top-layer occlusion kontrolü zaten cache’lenmişti ancak cache süresi kısa olduğu için yoğun popup/tooltip/scroll senaryosunda tekrar ölçüm yapabiliyordu.
- Pointer activity scrollbar güncellemeleri çok sık tetiklenebiliyordu.

### 5. Premium cursor hareket maliyeti
- Cursor animasyonu transform tabanlı ve RAF duraklatmalıydı; bu iyi korunmuş. Ancak scrollbar üzerinde dolaşırken cursor state’i daha açık ve ucuz şekilde yönetilebilirdi.
- Layout ölçümü gerektiren native scrollbar hit-test fonksiyonları dosyada duruyordu; aktif pointer path artık custom scrollbar target sınıfları üzerinden daha ucuz yönetilmeli.

### 6. Storage yazımları
- Hap Bilgi storage tarafında debounced/idle persist zaten mevcuttu.
- `localBackend.write` bazı App-level state değişimlerinde doğrudan localStorage yazıyordu. Büyük stats/history/solved arrays etkileşim sırasında ana thread’i kısa süre kilitleyebilir.

### 7. Popup/dropdown konumlandırma
- Katalog/branş menüsü gibi popup pozisyon güncellemeleri scroll/resize sırasında doğrudan tetiklenebiliyordu. RAF ile gruplanması daha güvenli.

## Build sonucu
- `npm install --no-audit --no-fund`: başarılı.
- `npm run build`: başarılı.
- Build uyarısı: `case-bank` ve `GlossaryTooltip` chunkları hâlâ büyük. Bu beklenen bir uyarıdır; veri/glossary içeriği bilinçli olarak silinmedi veya kısaltılmadı.

## Bilinçli olarak dokunulmayan alanlar
- Tıbbi vaka verileri, doğru cevaplar, seçenekler, feedbackler ve glossary data içerikleri değiştirilmedi.
- Glossary sistemi kapatılmadı.
- Premium cursor ve custom scrollbar korunarak optimize edildi.
- TUS/KOMİTE modlarının ana akışı ve UI kimliği korunmaya çalışıldı.
- Büyük data lazy-loading refactoru bu geçişte zorlanmadı; çünkü App-level vaka seçimi ve demo/solved index akışına yüksek kırılma riski taşıyordu.
