# KlinikIQ V292 — Pop-up Üzerinde Pop-up Nested Glossary

## Özet
V291'de nested glossary kavramları aynı kart içinde drill-down mantığıyla içeriği değiştiriyordu. V292'de bu davranış kaldırıldı. Tooltip/toolbox içindeki güvenli nested terimler artık hover ile ayrı child pop-up olarak açılır; parent kart açık kalır. Child kart içindeki güvenli terimler de aynı şekilde ayrı pop-up olarak açılabilir.

## Değiştirilen dosyalar
- `src/components/GlossaryTooltip.jsx`
- `src/index.css`

## Ana teknik değişiklikler
- `GlossaryCard` içindeki breadcrumb/drill-down state davranışı kaldırıldı.
- Tooltip body içindeki nested `GlossaryText` artık `navigationMode="popover"` ile render edilir.
- Parent → child → grandchild pop-up zinciri portal tabanlı ayrı floating tooltipler üzerinden çalışır.
- `visitedEntryIds` her child karta aktarılır; aynı entry zincirde tekrar açılmaz.
- `safeNestedTerms` / `relatedTerms` tabanlı güvenli nested term seçimi korunur.
- Ambiguous/generic term guard ve pre-answer leak guard korunur.

## UI / layout değişiklikleri
- Tooltip genişliği 360px yerine daha esnek hale getirildi.
- Desktop için maksimum genişlik yaklaşık 520px'e çıkarıldı.
- Kart önce genişlikten faydalanır; scrollbar yalnızca viewport'a sığmayan uzun içerikte devreye girer.
- Nested pop-up'lar mümkünse parent kartın sağında, yer yoksa sol/alt fallback ile konumlanır.
- Portal ve z-index davranışı korunur; container clipping riski azaltılır.

## Korunan güvenlikler
- Yanlış entry fallback yok.
- Kısa akronim false-positive guard korunur.
- Ambiguous standalone terimler nested mode'da rastgele açılmaz.
- Pre-answer modda cevap sızdırma koruması korunur.
- Cycle detection `visitedEntryIds` ile devam eder.

## Beklenen davranış
- Parent tooltip açıkken nested term hover edilince child pop-up açılır.
- Parent kapanmadan child pop-up kullanılabilir.
- Child pop-up içinden grandchild açılabilir.
- Drill-down / aynı kart içinde içerik değişimi artık aktif değildir.
- Mobilde hover olmadığı için tap/click fallback korunur.

## Not
Tam Vite build çalıştırılamadı; zip içinde `node_modules` yoktur. `getGlossaryTerms()` import testi çalışır durumdadır.
