# KlinikIQ V286 — Balanced Nested Glossary / Toolbox Quality Fix

## Amaç
V285 güvenlik katmanında tooltip body içinde nested glossary fazla kapatılmıştı. V286 bu davranışı düzeltir: normal metinlerde glossary kapsamı korunur; tooltip/toolbox açıklamalarında ise yalnızca güvenli, ilişkili ve deterministic entry id ile çözülen kavramlar nested glossary olarak gösterilir. İkinci seviye tooltip body içinde yeni nested zincir üretilmez.

## 1. Taranan dosyalar
Ana dosyalar:
- `src/utils/glossary.js`
- `src/components/GlossaryTooltip.jsx`
- `src/data/tusGlossaryContextSafetyIndex.js`
- `src/data/tusGlossaryGlobalQualityIndex.js`
- `src/data/tusGlossaryBindingCorrectionsIndex.js`
- `src/data/tusGlossaryContextualPhraseIndex.js`
- `src/data/tusGlossaryClinicalBranchDeepIndex.js`
- `src/data/tusGlossaryCaseDerivedIndex.js`
- `src/data/tusGlossaryNestedClinicalIndex.js`
- `src/data/tusGlossaryScientificIndex.js`
- Klinik Branş Seç, TUS Spot, Hap Kart, Kataloglarım, Zamanlı Sınav ve Komite/AI ders ekranlarında `GlossaryText` kullanan componentler

Yeni audit scripti `src` altında 81 JS/JSX/JSON kaynağı, bunların 69’unu glossary dışı proje metni kaynağı olarak taradı.

## 2. Taranan glossary entry ve alias sayısı
- Aktif glossary entry: 1382
- Alias / eşleşme etiketi: 4457
- Duplicate id: 0
- Duplicate canonical term: 0
- Duplicate normalized alias collision: 0
- Generic alias → spesifik entry riski: 0
- Nested safe term orphan: 0

## 3. Kök sebep
Önceki sürüm yanlış nested eşleşmeleri önlemek için `contextMode="tooltip-body"` geldiğinde `splitByGlossary()` fonksiyonunu tamamen düz metne düşürüyordu. Bu güvenliydi fakat tooltip/toolbox içi öğretici kavram bağlantılarını gereğinden fazla azalttı. V286’da bu global kapatma kaldırıldı; yerine allowlist tabanlı, parent entry ilişkili ve max-depth kontrollü nested glossary mimarisi kuruldu.

## 4. Yeni üç modlu davranış
1. **Normal metin modu:** Vaka, soru kökü, seçenek, feedback, hap kart, katalog ve ders metinlerinde geniş glossary eşleşmesi çalışmaya devam eder.
2. **Tooltip/toolbox body modu:** Sadece parent entry’nin `safeNestedTerms` / `relatedTerms` listesindeki veya açıklamada geçen yüksek öncelikli çok kelimeli güvenli terimler işaretlenir.
3. **İkinci seviye nested modu:** Tooltip içinden açılan ikinci kartın body metninde tekrar glossary üretilmez. `maxNestedDepth = 1`.

## 5. Kod düzeyinde değişiklikler
### `src/components/GlossaryTooltip.jsx`
- `contextMode="tooltip-body"` için global kapatma kaldırıldı.
- `termsMode="only"` eklendi; tooltip body yalnızca güvenli term havuzuyla taranır, tüm global sözlükle değil.
- `buildSafeNestedTermPool()` eklendi.
- Parent entry’nin `safeNestedTerms` ve `relatedTerms` alanları öncelikli kullanılır.
- Parent ile aynı entry tekrar nested olmaz.
- Generic/context-sensitive terimler standalone olarak nested moda alınmaz.
- İkinci seviye tooltip body düz text kalır.
- Tooltip title/body aynı `matchedEntry` objesinden gelmeye devam eder.
- React key `entry.id + revealMode + contextMode` mantığını korur.

### `src/utils/glossary.js`
- Yeni nested coverage data layer import edildi.
- `safeNestedTerms` normalizeEntry içine alındı.
- `nestedGlossaryAllowed` default olarak `true`, explicit `false` ise kapalı olacak şekilde düzeltildi.
- Generic alias güvenlik katmanı korunmuştur.

### `src/data/tusGlossaryNestedCoverageIndex.js`
- Tooltip/toolbox içi güvenli nested coverage için yeni curated layer eklendi.
- Eksik veya zayıf olan yüksek değerli kavramlar eklendi/güçlendirildi.

### `src/index.css`
- Tooltip body içindeki nested glossary vurgusu daha hafif hale getirildi.
- Ana metin glossary vurgusu korunurken tooltip içi nested vurgular daha subtle görünecek şekilde ayrıldı.

## 6. Güvenli nested glossary nasıl çalışıyor?
Öncelik sırası:
1. Parent entry’nin `safeNestedTerms` listesinde açık bulunan phrase/term.
2. Parent entry’nin `relatedTerms` listesinde bulunan ve açıklamada gerçekten geçen term.
3. Açıklamada geçen, yüksek öncelikli ve çok kelimeli güvenli medikal phrase.
4. Generic concept yalnızca explicit ve güvenli ise; spesifik hastalığa fallback yoktur.
5. Tek kelimeli terimler yalnızca spesifik, conflict-free ve yeterli priority ile geçebilir.

## 7. Eklenen / güçlendirilen yeni glossary words
Yeni layer’da eklenen veya override edilerek safe nested ilişkisi verilen başlıca kavramlar:
- Astım
- Bronkokonstriksiyon
- Ekspiryum uzaması
- Eozinofilik inflamasyon
- Hiperkalemi
- Potasyumun hücre içine kaydırılması
- İntravenöz kalsiyum glukonat
- Membran stabilizasyonu
- Testis torsiyonu
- Testiküler kan akımı
- Otoimmün hemolitik anemi
- Hemoliz
- Direkt Coombs testi
- Aktif elevasyon
- Rotator manşet
- Nörolojik defisit
- Glomerüler filtrasyon yanıtı
- Efor dispnesi
- Derin hızlı solunum
- İnsülin dozlarını aksatma
- Abdüksiyon

## 8. Safe nested ilişkisi eklenen entry sayısı
Audit çıktısı:
- `safeNestedTerms` içeren entry: 21
- Toplam güvenli nested link: 83
- Max nested depth: 1
- Nested orphan: 0

## 9. Riskli generic term davranışı
Şu tip kelimeler tooltip body içinde standalone olarak spesifik hastalığa rastgele bağlanmaz:
- inflamasyon
- enfeksiyon
- yetmezlik
- obstrüksiyon
- darlık
- lezyon
- kültür
- rotasyon
- insizyon
- eksplorasyon
- defisit
- tutulum
- yanıt

Bunlar ya genel concept entry olarak güvenli bağlamda kullanılır ya da daha spesifik phrase yakalanır. Yanlış spesifik fallback yapılmaz.

## 10. Regression test sonuçları
Audit regression seti: 15 / 15 geçti.
Doğrulanan örnekler:
- Astım → Astım
- Eozinofil → Eozinofil
- İleus → İleus
- Hiperkalemi → Hiperkalemi
- Doppler ultrasonografi → Doppler ultrasonografi
- Aktif elevasyon → Aktif elevasyon
- Sağ inguinal insizyon → Sağ inguinal insizyon
- Glomerüler filtrasyon → Glomerüler filtrasyon hızı
- İntravenöz kalsiyum glukonat → İntravenöz kalsiyum glukonat
- Direkt Coombs testi → Direkt Coombs testi
- Bronkokonstriksiyon → Bronkokonstriksiyon
- Ekspiryum uzaması → Ekspiryum uzaması
- Testis torsiyonu → Testis torsiyonu
- Otoimmün hemolitik anemi → Otoimmün hemolitik anemi
- Potasyumun hücre içine kaydırılması → Potasyumun hücre içine kaydırılması

## 11. Pre-answer / post-answer güvenliği
- Mevcut pre-answer leakage neutralizer korundu.
- Pre-answer modda yüksek riskli tanı/tedavi ipuçları nötrleştirilmeye devam eder.
- Post-answer modda TUS ipucu, ayırıcı not ve detaylı açıklama gösterilir.
- Nested glossary restore edildi ama yalnızca güvenli term havuzuyla ve depth 1 sınırıyla çalışır.

## 12. Toolbox / tooltip binding güvenliği
- Tag/tooltip başlığı ve açıklaması aynı `entry.id` zincirinden gelir.
- Related term ana açıklama yerine geçmez.
- Ambiguous veya resolve edilemeyen term başka entry’ye fallback yapmaz.
- Tooltip body artık tüm global matcher’a açılmaz; yalnızca safe nested pool kullanır.

## 13. Audit script çıktısı
Yeni script:
- `scripts/audit-glossary-balanced-nested.mjs`

Üretilen rapor:
- `GLOSSARY_V286_BALANCED_NESTED_AUDIT.json`

Özet:
- Critical issue: 0
- Duplicate id: 0
- Duplicate canonical: 0
- Duplicate normalized alias: 0
- Generic alias risk: 0
- Nested orphan: 0
- Missing candidate after patch: 0

## 14. Kalan bilinen riskler
- Legacy glossary’de bazı eski `Genel` category kayıtları hâlâ manuel semantik kalite açısından zamanla iyileştirilebilir.
- Otomatik audit semantic kaliteyi tamamen insan editör gibi değerlendiremez; bu nedenle çok eski legacy açıklamalar için manuel tıbbi editör kontrolü önerilir.
- Tam Vite build çalıştırılamadı çünkü ortamda `vite` bulunmuyor; Node import/audit kontrolleri çalıştı.
