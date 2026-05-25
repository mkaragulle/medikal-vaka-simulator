# KlinikIQ V373 Ek Performans Audit Raporu

## Kapsam
V372 optimizasyonları korunarak ikinci bir ince ayar turu yapıldı. Bu turda özellikle hâlâ hissedilebilecek mikro takılmalar için vaka listesi seçim renderı, vaka arama maliyeti, Hap Bilgi deck/list imzaları, glossary tooltip ölçüm döngüsü ve custom scrollbar mutation baskısı hedeflendi.

## Yeni tespitler

### 1. CaseList seçili kart renderı
V372'de `CaseListItem` memoize edilmişti; ancak her seçili vaka değişiminde tüm satırlara `selectedCaseId` prop'u gidiyordu. Bu prop her değiştiğinde memoized satırların tamamı yeniden karşılaştırma/render baskısı alıyordu. V373'te her satıra sadece kendi `selected` boolean değeri gönderildi. Böylece seçim değişiminde yalnızca eski seçili ve yeni seçili satırın görsel durumu değişir.

### 2. Alt vaka araması
`filterCasesBySearch` her aramada vaka objesini recursive gezip bütün metni normalize ediyordu. Bu özellikle büyük vaka objelerinde input yazarken veya filtre kullanırken UI thread üzerinde gereksiz maliyet oluşturabiliyordu. V373'te vaka objesi başına WeakMap tabanlı arama metadatası cache'i eklendi. Aynı vaka için title/keyword/question/fullText normalize işlemi tekrar yapılmıyor.

### 3. Bottom case search etkileşimi
Alt vaka araması doğrudan input state'iyle filtreleniyordu. V373'te `useDeferredValue` ile arama filtreleme düşük öncelikli hâle getirildi. Kullanıcının yazma tepkisi ve input hissi daha akıcı kalır.

### 4. Aktif branch case üyelik kontrolü
Bazı kontrollerde `activeBranchCasePool.some(...)` kullanılıyordu. V373'te aktif vaka havuzu için memoized `Set` oluşturuldu ve üyelik kontrolleri O(1) hâle getirildi.

### 5. Hap Bilgi çalışma ekranı
Deck/session yenileme imzası `filteredCards.map(id).join('|')` ile tüm listeyi stringe çeviriyordu. V373'te bu maliyet; uzunluk, ilk/orta/son id, filtreler ve ilgili Set boyutlarıyla oluşturulan daha hafif bir imzaya indirildi. Ayrıca `sessionCards` içinde tekrar tekrar oluşturulan filtered id set ayrı memoize edildi.

### 6. Glossary tooltip konumlandırma
Tooltip açılışında aynı frame içinde gereksiz iki ayrı `requestAnimationFrame(updatePosition)` çağrısı vardı. V373'te tek RAF ile yetinildi; tooltip davranışı korunurken açılış ölçüm maliyeti azaltıldı. Split cache boyutu 600'den 900'e çıkarıldı; sık tekrar eden eğitim metinlerinde parse tekrarları daha fazla cache'te kalır.

### 7. Custom scrollbar mutation baskısı
Custom scrollbar MutationObserver tüm body altında `class` ve `style` değişimlerini de izliyordu. Bu, React class güncellemeleri ve scroll/hover durumlarında gereksiz callback baskısı yaratabiliyordu. V373'te observer daha dar attribute listesine indirildi; structural childList, open/hidden/aria-expanded ve data-scrollable sinyalleri takip edilmeye devam eder. Resize/scroll/pointer fallbackleri korunmuştur.

## Build sonucu
- `npm install --no-audit --no-fund`: başarılı.
- `npm run build`: başarılı.
- Büyük chunk uyarıları devam ediyor: `case-bank` ve `GlossaryTooltip`. Bu beklenen durumdur; tıbbi veri ve glossary içeriği kısaltılmadı/silinmedi.

## Korunan alanlar
- Tıbbi vaka/soru/cevap/feedback/glossary data içerikleri değiştirilmedi.
- Custom cursor ve custom scrollbar kaldırılmadı.
- Glossary sistemi kapatılmadı.
- TUS, KOMİTE, Hap Bilgi ve Kataloglarım akışı korunmuştur.
- Dark/light mode ve premium UI görünümü korunmuştur.
