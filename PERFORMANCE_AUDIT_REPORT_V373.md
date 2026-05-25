# KlinikIQ V373 Performance Audit Report

## Amaç
Bu ek geçiş V372 üzerine küçük, kontrollü ve GitHub'a güvenli performans iyileştirmeleri uygular. Büyük mimari değişiklik, tıbbi içerik değişikliği, glossary kapatma, custom cursor veya custom scrollbar kaldırma yapılmamıştır.

## Ek tespitler

### 1. Scroll sırasında global `*` CSS maliyeti
V372 performans paketinde scroll/resize anında `html.ki-performance-mode.ki-is-scrolling *` benzeri global selector ile tüm DOM elemanlarına transition/animation müdahalesi yapılıyordu. Bu niyet olarak doğru olsa da büyük KlinikIQ sayfalarında scroll sırasında style recalculation maliyetini artırabilir.

### 2. Alt olgu araması recursive text toplama maliyeti
Branş içindeki alt olgu aramasında her aramada vaka objesi içinde recursive text toplama yapılabiliyordu. Bu işlem yalnızca gerçek arama olduğunda çalışmalı; boş aramada veya normal vaka gezintisinde index oluşturulmamalıdır.

### 3. Yanıt işaretleme hissi
Normal çalışma modunda yanıt işaretlendiğinde local feedback'in görünmesi ile App seviyesindeki stats/solved/wrong-answer güncellemeleri aynı event içinde tetikleniyordu. Bu, bazı makinelerde seçenek işaretleme sonrası kısa bir gecikme hissi yaratabilir.

### 4. Custom scrollbar stil yazımları
Scrollbar güncellemesinde aynı inline style değerleri tekrar tekrar yazılabiliyordu. Bu davranış küçük görünse de scroll sırasında gereksiz style invalidation yaratabilir.

### 5. Custom cursor hedef kontrolü
Cursor pointermove sırasında custom scrollbar hedefini `closest()` ile tekrar tekrar kontrol ediyordu. Hedef element değişmediği sürece bu kontrolün cache'lenmesi yeterlidir.

### 6. GitHub yükleme riski
Build ve dependency klasörlerinin zip içine girmesi GitHub yüklemesini yavaşlatabilir veya gereksiz dosya kalabalığı yaratabilir. Paket temiz kaynak zip olarak hazırlanmalıdır.

## Korunan davranışlar
- TUS/KOMİTE akışı korunmuştur.
- Vaka, soru, doğru cevap, feedback, glossary ve kart verileri değiştirilmemiştir.
- Custom cursor ve custom scrollbar korunmuştur.
- Glossary sistemi kapatılmamıştır.
- Dark/light mode tasarımı değiştirilmemiştir.
- Premium görünüm normal durumda korunmuştur.
