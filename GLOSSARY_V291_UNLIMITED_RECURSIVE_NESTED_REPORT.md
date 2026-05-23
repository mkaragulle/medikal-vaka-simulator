# KlinikIQ V291 — Unlimited Recursive Nested Glossary Update

## Amaç
V290 sürümündeki `maxNestedDepth = 5` yaklaşımı kaldırıldı. Nested glossary artık yapay bir sayısal derinlik sınırıyla durdurulmaz. Kavram zinciri, güvenli ve deterministik kaldığı sürece devam edebilir.

## Yeni güvenlik modeli
Derinlik artık sabit sayı ile değil şu guard'larla kontrol edilir:

- `visitedEntryIds` / `entryPath` ile cycle detection
- Aynı entry'nin aynı zincirde tekrar açılmasını engelleme
- `safeNestedTerms` ve `relatedTerms` önceliği
- Ambiguous / generic standalone terim engeli
- Pre-answer cevap sızdırma guard'ı
- Kart başına sınırlı nested term gösterimi (`maxNestedChildren` / `TOOLTIP_BODY_MAX_NESTED_TERMS`)
- Deterministic entry binding
- Hover drill-down + breadcrumb/geri davranışı

## Runtime değişikliği
`TOOLTIP_BODY_MAX_NESTED_DEPTH` artık `Number.POSITIVE_INFINITY` olarak tanımlıdır. Bu değer pratikte yapay derinlik limiti koymaz. Kod hâlâ opsiyonel finite override'ı destekler; ancak varsayılan KlinikIQ davranışı unlimited recursive nested glossary'dir.

## Korunan davranışlar
- Desktop'ta nested term hover ile açılır.
- Mobil/touch'ta tap fallback korunur.
- Breadcrumb ve geri davranışı korunur.
- Aynı entry zincirde tekrar açılmaz.
- Ambiguous/generic kelimeler yanlış spesifik entry'ye gitmez.
- Normal metin glossary coverage'ı düşürülmedi.
- Pre-answer/post-answer güvenliği korunur.

## Değiştirilen dosyalar
- `src/components/GlossaryTooltip.jsx`
- `scripts/audit-glossary-hover-recursive-nested.mjs`
- `scripts/audit-glossary-recursive-nested.mjs`
- `scripts/audit-glossary-unlimited-recursive-nested.mjs`
- `GLOSSARY_V291_UNLIMITED_RECURSIVE_NESTED_AUDIT.json`

## Audit özeti
- Aktif glossary entry: 1480
- Alias/eşleşme etiketi: 4900
- Yapay numeric depth cap: yok
- Varsayılan nested depth: unlimited
- safeNestedTerms içeren entry: 192
- Toplam güvenli nested link: 489
- Regression: 7 / 7 geçti

## Not
Sonsuz döngüye izin verilmedi. “Sınırsız” davranış, aynı entry'nin tekrar tekrar açılması anlamına gelmez; yalnızca zincirin 5 gibi yapay bir sayıda durdurulmadığı anlamına gelir. Güvenlik cycle detection, safeNestedTerms ve ambiguity guard üzerinden sağlanır.
