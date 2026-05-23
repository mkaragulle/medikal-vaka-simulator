# KlinikIQ V281 — Glossary / Tooltip Binding Integrity Fix

## Kök sebep
Bazı eski glossary kayıtlarında gerçek eş anlamlı olmayan bağlam ipuçları `aliases` içine alınmıştı. Örneğin `Eozinofil` kaydında `astım` gibi başka bir kavrama ait ifade alias olarak duruyordu. Matcher alias → entry eşleşmesini deterministic seçse bile, yanlış alias doğru kavramın üzerine bind edildiği için tooltip başlığı/açıklaması farklı kavrama ait görünebiliyordu.

## Değiştirilen dosyalar
- `src/utils/glossary.js`
- `src/components/GlossaryTooltip.jsx`
- `src/data/tusGlossaryBindingCorrectionsIndex.js`
- `scripts/audit-glossary-integrity.mjs`

## Yapılan düzeltme
- Yeni curated binding correction layer eklendi: `Astım`, `Eozinofil`, `Alerji`, `Paraziter enfeksiyon` gibi kavramlar kendi canonical entry’sine bağlandı.
- `buildNormalizedGlossary()` sonrası alias integrity pass eklendi.
- Context clue niteliğindeki alias’lar tooltip bind kaynağı olmaktan çıkarıldı.
- Normalized alias aynı anda birden fazla entry’ye gidiyorsa tek bir canonical owner seçilecek hale getirildi.
- Eğer bir alias başka bir entry’nin canonical term’üyse, o alias artık yanlış entry altında tutulmuyor.
- Tooltip trigger’a `data-glossary-entry-id` ve `data-glossary-entry-term` eklendi; başlık/açıklama aynı entry id üzerinden render ediliyor.
- React key yapısı entry id içerecek şekilde güncellendi; hover geçişlerinde stale tooltip içeriği riski azaltıldı.

## Audit sonucu
`node scripts/audit-glossary-integrity.mjs` kontrolünde:
- Toplam entry: 1335
- Duplicate normalized alias collision: 0
- Duplicate id: 0
- Eksik/kısa tanım: 0

## Doğrulanan örnekler
- `astım` → Astım açıklaması
- `eozinofil` → Eozinofil açıklaması
- `alerji` → Alerji açıklaması
- `parazit` → Paraziter enfeksiyon açıklaması
- `hiperkalemi` → Hiperkalemi açıklaması
- `Doppler ultrasonografi` → Görüntüleme tetkiki açıklaması
- `aktif elevasyon` → Fonksiyonel muayene açıklaması
- `sağ inguinal insizyon` → Cerrahi/anatomik ifade açıklaması
- `defans` → Fizik muayene bulgusu açıklaması

## Pre-answer / post-answer
Mevcut pre-answer/post-answer ayrımı korunmuştur. Bu güncelleme cevap sızdırma mantığını değiştirmez; yalnızca term → doğru entry → doğru başlık/açıklama bütünlüğünü güçlendirir.
