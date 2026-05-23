# KlinikIQ V295 — Glossary Full Educational Mode Report

## Amaç
Pre-answer / post-answer ayrımı glossary içeriği için kaldırıldı. Glossary, tooltip, toolbox ve nested glossary kartları artık cevap durumuna göre kısaltılmış/nötr açıklama üretmez; her zaman tam öğretici içerik göstermeyi hedefler.

## Değiştirilen dosyalar

- `src/components/GlossaryTooltip.jsx`
- `reports/glossary-full-educational-mode-audit.md`
- `reports/glossary-full-educational-mode-audit.json`
- `reports/glossary-full-educational-mode-report.md`
- `scripts/audit-glossary-full-educational-mode.mjs`

## Kaldırılan pre/post kısıtları

- `preAnswer` modunda sadece `preAnswerSafeDefinition` gösterme davranışı kaldırıldı.
- `preAnswer` modunda `tusPearl` gizleme davranışı kaldırıldı.
- `preAnswer` modunda `differentialPoint` gizleme davranışı kaldırıldı.
- `preAnswer` modunda detay/klinik bağlam/mekanizma gizleme davranışı kaldırıldı.
- `preAnswer` modunda daha düşük glossary term limiti uygulama davranışı kaldırıldı.
- `answerLeakRisk === high` nedeniyle nested glossary candidate gizleme davranışı kaldırıldı.
- Trigger/popover `data-reveal-mode` değeri `fullEducational` olarak normalize edildi; pre-answer görsel/semantik ayrımının tooltip içeriğine etkisi kaldırıldı.

## Yeni content selection mantığı

Glossary kartı artık answer state’e bakmadan şu sırayla içerik kullanır:

1. `shortDefinition` / `previewDefinition` / `definition`
2. `postAnswerExpandedExplanation` / `postAnswerExplanation` / `detailedExplanation` / `longDefinition`
3. `tusPearl`
4. `differentialPoint`
5. `clinicalRelevance` / `clinicalContext`
6. `mechanism`
7. `relatedTerms` ve güvenli nested terms

`preAnswerSafeDefinition` yalnızca başka tanım yoksa fallback olarak kalır; ana render davranışını kısıtlamak için kullanılmaz.

## Nested glossary davranışı

- Nested glossary answer state’ten bağımsız hale getirildi.
- Popover-on-popover recursive nested sistem korunur.
- `visitedEntryIds`, cycle detection, deterministic entry binding, ambiguity/generic guard ve phrase-first matching korunur.
- Pre-answer state artık nested coverage’ı azaltmaz.

## answerLeakRisk kullanımı

`answerLeakRisk` artık glossary içeriğini gizleme/kısaltma amacıyla kullanılmaz. Veri alanı metadata olarak kalabilir, ancak render davranışında bilgi saklama mekanizması değildir.

## Audit sonucu

- Taranan glossary entry: 1543
- Eğitimsel definition field kontrolü: 12 alan
- Herhangi bir eğitimsel definition alanı olan entry: 1543
- Post-answer/detailed explanation içeren entry: 1084
- TUS pearl içeren entry: 1084
- Differential point içeren entry: 1063
- safeNestedTerms içeren entry: 286
- Pre-answer restriction pattern: 0
- Regression: PASS

## Regression sonuçları

- Pre-answer ve post-answer aynı glossary kart içeriğini kullanıyor: PASS
- TUS ipucu pre-answer’da gizlenmiyor: PASS
- Ayırıcı not pre-answer’da gizlenmiyor: PASS
- Detay/klinik bağlam/mekanizma pre-answer’da gizlenmiyor: PASS
- Nested glossary answerState’ten bağımsız: PASS
- Tooltip visual reveal mode `fullEducational`: PASS

## Kalan risk

Bazı legacy entry’lerde dedicated `postAnswerExplanation` / `detailedExplanation` yok; bu entry’lerde kart yine de `shortDefinition` ve varsa diğer alanlarla tam eğitim modunda render edilir. Bu içerikler filler auditinden geçmiş durumdadır; fakat ileride daha ayrıntılı açıklama istenirse ayrı bir content enrichment pass ile güçlendirilebilir.
