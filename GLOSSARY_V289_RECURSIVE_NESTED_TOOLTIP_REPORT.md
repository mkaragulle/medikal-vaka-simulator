# KlinikIQ V289 — Recursive Nested Glossary / Concept Drill-Down Report

## Kapsam
Bu sürüm, V288 üzerine kurulmuştur. Amaç tooltip/toolbox içindeki glossary bağlantılarını tekrar öğretici hale getirirken, `maxNestedDepth = 1` sınırlamasını kaldırmak ve kontrollü çok katmanlı kavram zinciri oluşturmaktır.

## Değiştirilen dosyalar
- `src/components/GlossaryTooltip.jsx`
- `src/index.css`
- `src/utils/glossary.js`
- `src/data/tusGlossaryRecursiveNestedIndex.js`
- `scripts/audit-glossary-recursive-nested.mjs`
- `GLOSSARY_V289_RECURSIVE_NESTED_AUDIT.json`

## Ana teknik değişiklikler
1. `TOOLTIP_BODY_MAX_NESTED_DEPTH` değeri 1'den 5'e çıkarıldı.
2. Tooltip içi nested glossary artık stacked popover zinciri yerine aynı kart içinde drill-down mantığıyla çalışır.
3. `GlossaryCard` artık kendi içinde `entryPath` tutar ve breadcrumb/geri davranışı sunar.
4. Nested term tıklandığında yeni popover açmak yerine aynı kart ilgili entry içeriğine geçer.
5. `visitedEntryIds` ve `entryPathContains()` ile cycle detection eklendi.
6. Zincirde daha önce açılmış entry tekrar açılamaz.
7. `buildSafeNestedTermPool()` artık `currentDepth`, `maxDepth` ve `visitedEntryIds` parametrelerini dikkate alır.
8. Tooltip/toolbox body içinde nested term seçimi hâlâ `safeNestedTerms` / `relatedTerms` önceliklidir.
9. Ambiguous/generic standalone terim guard'ları korunur.
10. Pre-answer answer-leak guard korunur.

## UI davranışı
- Tooltip içinde güvenli nested term tıklanınca aynı kart yeni kavrama geçer.
- Kartın üstünde breadcrumb görünür.
- `Geri` butonu önceki kavrama döner.
- Breadcrumb içindeki önceki kavramlara tıklanabilir.
- maxDepth'e ulaşıldığında yeni link üretilmez ve kullanıcıya küçük bir güvenlik notu gösterilir.
- Mobilde tek kart/drill-down davranışı popover yığını oluşmasını engeller.

## Yeni / güçlendirilmiş recursive chain layer
Yeni dosya: `src/data/tusGlossaryRecursiveNestedIndex.js`

Bu layer 18 kayıt içerir. Bunların bir kısmı yeni canonical entry, bir kısmı mevcut canonical entry'leri daha yüksek öncelikli ve daha zengin `safeNestedTerms` ile override eder.

Örnek güçlendirilen zincirler:
- Astım → Bronş hiperreaktivitesi → Bronkokonstriksiyon → Hava yolu direnci
- Hiperkalemi → Membran stabilizasyonu → İntravenöz kalsiyum glukonat → Kardiyak miyosit membranı
- Testis torsiyonu → Akut skrotum → Doppler ultrasonografi → Testiküler kan akımı
- Diyabetik ketoasidoz → Anion gap metabolik asidoz → Keton cisimleri → Beta-hidroksibütirat

## Audit sonucu
- Aktif glossary entry: 1480
- Alias / eşleşme etiketi: 4900
- Taranan source dosyası: 84
- `safeNestedTerms` içeren entry: 192
- Toplam safe nested link: 489
- Varsayılan maxDepth: 5
- Recursive regression: 8 / 8 geçti

## Uyarılar
Audit, bazı eski `safeNestedTerms` değerlerinde çözümlenemeyen veya runtime'da generic guard ile engellenecek manuel kalite adayları buldu. Bunlar kullanıcıya yanlış tooltip olarak gösterilmez; unresolved link'ler matcher'a girmediği için sessizce yok sayılır, generic tek kelime riskleri ise runtime guard ile engellenir.

## Build notu
`npm run build` çalıştırılamadı; zip içinde `node_modules` bulunmadığı için `vite: not found` hatası alındı. JSX syntax kontrolü TypeScript transpileModule ile yapıldı ve `src/components/GlossaryTooltip.jsx` için syntax hatası görülmedi. `getGlossaryTerms()` import testi ve recursive audit script başarıyla çalıştı.
