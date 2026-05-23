# KlinikIQ V279 — PROFİL Layout + GlossaryText Word Integrity Fix

## Kök sebep
PROFİL alanındaki problem iki ayrı kaynaktan oluşuyordu:

1. **Layout kökü:** Klinik Branş Seç vaka ekranındaki hasta özeti grid’i eski CSS katmanlarında hâlâ `span 4 / span 8`, `auto-fit`, `minmax(320px, 1fr)` gibi farklı kurallarla yönetiliyordu. Bu nedenle PROFİL kartı bazı genişliklerde BAŞVURU ve HASTA ÖYKÜSÜ kadar geniş davranmıyor, dar kolona sıkışıyordu.

2. **GlossaryText segmentasyon kökü:** `splitByGlossary()` kısa acronym/prefix eşleşmelerinde geçersiz suffix veya geçersiz entry durumunda yalnızca `baseValue` kadar ilerliyordu. Bu, `acil` → `ac` + `il` veya `erkek` → `erk` + `ek` gibi yapay span parçalanmaları oluşturabiliyordu. Görseldeki kelime ortası kırılmanın kritik nedeni buydu.

## Değiştirilen dosyalar
- `src/components/GlossaryTooltip.jsx`
- `src/index.css`
- `src/styles/klinikiq-refine.css`

## PROFİL kartı neden dar kalıyordu ve nasıl düzeltildi?
Eski hasta özeti grid kuralları birden fazla CSS katmanında tekrarlandığı için PROFİL bazı ekranlarda dar kolon olarak kalabiliyordu. V279’da Klinik Branş Seç scope’u altında canonical layout eklendi:

- Hasta özeti grid’i tek kolon yapıldı: `grid-template-columns: minmax(0, 1fr)`
- `summary-detail-card--profile`, `summary-detail-card--presentation` ve `patient-summary-story-block.unified-history-block` full width yapıldı.
- Grid child’ları için `grid-column: 1 / -1`, `width: 100%`, `max-width: 100%`, `min-width: 0` uygulandı.
- Böylece PROFİL, BAŞVURU ve HASTA ÖYKÜSÜ aynı iç genişlik ve hizaya alındı.

## “acil” ve “erkek” kırılması hangi mekanizmadan kaynaklanıyordu?
`GlossaryText` kısa alias/acronym adaylarını regex ile yakalarken, geçersiz suffix veya case-sensitive acronym reddi sonrasında kelimenin yalnızca prefix kısmı plain text olarak bırakılıyordu. Bu normal Türkçe kelimeleri birden fazla inline span’a bölüyor ve profil alanında yapay kırılma fırsatı oluşturuyordu.

## GlossaryText matcher’da ne değiştirildi?
`splitByGlossary()` artık geçersiz veya resolve edilemeyen eşleşmelerde tüm tüketilen kelimeyi tek plain text segment olarak koruyor.

- `visibleValue = baseValue + suffixValue` mantığı kullanıldı.
- Entry yoksa veya suffix geçersizse `baseValue` değil, tüm `visibleValue` düz text olarak ekleniyor.
- `lastIndex`, `baseEnd` yerine tüm tüketilen kelimenin sonuna (`fullTermEnd`) taşınıyor.
- `ERK` gibi kısa uppercase acronym’ler lowercase `erkek` içinde tooltip adayı olsa bile kelimeyi artık parçalamıyor.

## CSS çakışmaları nasıl bastırıldı?
`index.css` ve `klinikiq-refine.css` içinde aynı canonical V279 safety layer yer aldı. Bunun nedeni deployment/import sırasına göre bu iki dosyadan herhangi birinin sonradan yüklenebilmesi. Scope yalnızca `.clinical-case.qbank-case` olduğu için diğer ekranlara global zarar vermez.

Profil metni ve glossary segmentleri için:

- `word-break: normal`
- `overflow-wrap: normal`
- `hyphens: none`
- `white-space: normal`
- `.glossary-text-flow`, `.glossary-plain-segment`, `.smart-glossary-term` için `display: inline`

uygulandı.

## Doğrulanan test metinleri
Aşağıdaki regression metinlerinde textContent birebir korundu:

- `19 yaşında kadın hasta, tip 1 diyabet öyküsüyle acil serviste değerlendiriliyor.`
- `62 yaşında erkek hasta, göğüs hastalıkları polikliniğinde değerlendiriliyor.`
- `ERK aktivasyonu MAPK yolunda proliferasyon yanıtını artırır.`
- `Acil serviste değerlendiriliyor.`

Beklenen davranış:

- `acil` artık `ac / il` şeklinde bölünmez.
- `erkek` artık `erk / ek` şeklinde bölünmez.
- Gerçek uppercase `ERK` geçtiğinde glossary çalışmaya devam eder.

## Regresyon riski
Düzeltme Klinik Branş Seç / qbank case hasta özeti scope’una alındı. Seçenek kartlarındaki radio/text overlap düzeltmesine dokunulmadı. Glossary sistemi genel olarak korunur; sadece geçersiz prefix/acronym match’lerin kelimeyi bölmesi engellenir.
