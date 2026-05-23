# KlinikIQ V283 — Context-safe nested glossary binding fix

## Kök sebep
Sorun tek bir kelime hatası değildi. Legacy glossary verilerinde bazı spesifik hastalık entry'lerinin alias listelerinde çok genel tıbbi kavramlar bulunuyordu. En kritik örnek: `ileus` entry'si içinde `obstrüksiyon` standalone alias olarak yer alıyordu. Bu nedenle tooltip içindeki astım açıklamasında geçen `obstrüksiyon` kelimesi bağlamdan koparak `İleus` entry'sine bağlanabiliyordu.

İkinci risk, tooltip kartı içindeki açıklama metinlerinin tekrar sınırsız `GlossaryText` ile işlenmesiydi. Normal vaka metni için faydalı olan nested glossary davranışı, tooltip açıklaması gibi bağlamı kısıtlı alanlarda genel kelimeleri yanlış spesifik entry'lere taşıyabiliyordu.

## Değiştirilen dosyalar
- `src/utils/glossary.js`
- `src/components/GlossaryTooltip.jsx`
- `src/data/tusGlossaryContextSafetyIndex.js`
- `scripts/audit-glossary-context-safety.mjs`

## Obstrüksiyon neden İleus'a gidiyordu?
Legacy `ileus` kaydında `obstrüksiyon` genel kelimesi alias olarak bulunuyordu. Matcher alias eşleşmesini doğru teknik zincirle yapıyordu; fakat alias tıbbi olarak fazla geniş olduğu için yanlış kavrama bağlanıyordu. Yani temel problem UI değil, bağlamsız alias sahipliğiydi.

## Alias/matcher düzeltmesi
`src/utils/glossary.js` içinde context-safety katmanı eklendi:

- `GENERIC_STANDALONE_ALIAS_SET` oluşturuldu.
- `obstrüksiyon`, `tıkanıklık`, `inflamasyon`, `yetmezlik`, `iskemi`, `nekroz`, `ödem`, `lezyon`, `darlık`, `bası`, `defisit`, `tutulum` gibi genel kelimeler spesifik hastalık entry'lerinden standalone alias olarak temizleniyor.
- Bu kelimeler yalnızca kendi genel kavram entry'leri varsa veya çok kelimeli bağlamlı phrase olarak geçiyorsa eşleşiyor.
- Duplicate normalized alias audit sonucu: `0`.
- Duplicate id audit sonucu: `0`.

## Yeni context-safe entry'ler
Yeni dosya: `src/data/tusGlossaryContextSafetyIndex.js`

Eklenen başlıca entry'ler:
- Obstrüksiyon
- Hava yolu obstrüksiyonu
- Bronş hiperreaktivitesi
- Bağırsak obstrüksiyonu
- Safra yolu obstrüksiyonu
- Mesane çıkım obstrüksiyonu

Bu yapı sayesinde:
- `obstrüksiyon` tek başına genel obstrüksiyon entry'sine gider.
- `hava yolu obstrüksiyonu` pulmoner patofizyoloji entry'sine gider.
- `bağırsak obstrüksiyonu` intestinal/ileus bağlamına gider.
- `safra yolu obstrüksiyonu` hepatobiliyer entry'ye gider.
- `mesane çıkım obstrüksiyonu` ürolojik entry'ye gider.
- `obstrüksiyon` artık tek başına `İleus` açıklaması açmaz.

## Nested tooltip davranışı nasıl güvenli hale getirildi?
`GlossaryCard` içinde açıklama metinleri artık varsayılan olarak yeniden `GlossaryText` ile işlenmiyor; düz text olarak render ediliyor. Normal vaka metni, soru kökü, seçenekler, feedbackler, hap kartlar ve katalog metinlerinde glossary çalışmaya devam eder. Ancak bir tooltip kartının içinde geçen genel kelimeler artık yeni tooltip açıp yanlış entry'ye bağlanmaz.

Bu bilinçli güvenlik tercihidir: yanlış nested tooltip göstermek, tooltip göstermemekten daha risklidir.

## Başlık-açıklama-entry bütünlüğü
Tooltip başlığı ve açıklaması hâlâ aynı `entry` objesinden gelir:

`highlightedText → matchedAlias → matchedEntry.id → displayTerm/canonicalTerm → matchedEntry definition`

`FloatingTooltip` key'i entry id + reveal mode üzerinden korunur; stale tooltip içeriği riskini azaltan mevcut yapı bozulmadı.

## Pre-answer / post-answer güvenliği
Pre-answer güvenlik katmanı korunmuştur. Cevap öncesinde `preAnswerSafeDefinition` kullanılır ve tedavi/tanı sızdırabilecek açıklamalar nötrleştirilir. Post-answer modda aynı doğru entry için TUS ipucu ve ayırıcı not görünmeye devam eder.

## Audit sonucu
`node scripts/audit-glossary-context-safety.mjs` sonucu:

- Toplam glossary entry: 1341
- Integrity issue: 0
- Duplicate normalized alias collision: 0
- `obstrüksiyon` owner: yalnızca `context-obstruction-general`
- `tıkanıklık` owner: yalnızca `context-obstruction-general`

## Regression kontrol listesi
Kontrol edilen beklenen davranışlar:

- `astım` → Astım açıklaması.
- Astım tooltip açıklamasındaki `obstrüksiyon` artık İleus tooltipi açmaz; tooltip içi nested glossary güvenlik nedeniyle kapalıdır.
- `obstrüksiyon` normal metinde genel Obstrüksiyon entry'sine gider.
- `hava yolu obstrüksiyonu` normal metinde Hava yolu obstrüksiyonu entry'sine gider.
- `bağırsak obstrüksiyonu` normal metinde Bağırsak obstrüksiyonu entry'sine gider.
- `safra yolu obstrüksiyonu` normal metinde hepatobiliyer obstrüksiyon entry'sine gider.
- `mesane çıkım obstrüksiyonu` normal metinde ürolojik obstrüksiyon entry'sine gider.
- `ileus` kendi açıklamasına gider; standalone `obstrüksiyon` ile eşleşmez.
- Duplicate alias collision yoktur.

## Manuel izleme gerektiren riskli kelimeler
Genel kavram olduğu için uzun vadede audit ile izlenmesi gereken kelimeler:
`inflamasyon`, `enfeksiyon`, `yetmezlik`, `iskemi`, `nekroz`, `ödem`, `lezyon`, `darlık`, `bası`, `defisit`, `tutulum`, `yanıt`, `kanama`, `perforasyon`, `torsiyon`.

Bu kelimeler spesifik hastalık entry'lerine standalone alias olarak bağlanmamalı; gerekli olduğunda bağlamlı phrase entry olarak eklenmelidir.
