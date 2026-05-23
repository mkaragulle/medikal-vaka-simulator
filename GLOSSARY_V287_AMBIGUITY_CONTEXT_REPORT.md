# KlinikIQ V287 — Ambiguity-Safe / Context-Aware Glossary Audit Report

## 1. Kök sebep
Önceki güvenlik katmanları duplicate alias ve bazı generic alias risklerini azaltmıştı; ancak sistem hâlâ homonym/çok anlamlı yüzey formları için yeterince bağlam duyarlı değildi. `asit`, `direnç`, `blok`, `elevasyon`, `darlık`, `ödem`, `kültür`, `perforasyon`, `torsiyon` gibi kelimeler tek başına geçtiğinde birden fazla tıbbi kavrama gidebilir. Bu nedenle yalnızca normalized alias eşleşmesi yapmak, bazı bağlamlarda doğru görünen ama kavramsal olarak yanlış tooltip üretme riski yaratıyordu.

## 2. Değiştirilen dosyalar
- `src/utils/glossary.js`
- `src/components/GlossaryTooltip.jsx`
- `src/data/tusGlossaryAmbiguitySafetyIndex.js` yeni eklendi
- `scripts/audit-glossary-ambiguity-context.mjs` yeni eklendi
- `GLOSSARY_V287_AMBIGUITY_CONTEXT_AUDIT.json` yeni üretildi
- `GLOSSARY_V287_AMBIGUITY_CONTEXT_REPORT.md` yeni eklendi

## 3. “Asit” gibi çok anlamlı terimler neden yanlış açıklamaya gidiyordu?
Legacy glossary içinde `asit` canonical entry’si peritoneal sıvı birikimi anlamında kullanılıyordu ve `asit` standalone alias olarak kalıyordu. Böylece `asit-baz dengesi`, `laktik asit`, `ürik asit`, `folik asit`, `yağ asidi` gibi kimyasal/biyokimyasal bağlamlarda bile sistem ascites açıklamasına gidebiliyordu. V287’de `Asit` genel kimyasal/biyokimyasal concept olarak ayrıldı; `Peritoneal asit / Ascites` ise yalnızca `karında asit`, `asit sıvısı`, `asit analizi`, `SAAG`, `parasentez sıvısı` gibi bağlamlı phrase alias’larla çalışır.

## 4. Ambiguous alias / context-required / phrase-only sonuçları
Audit sonucu:
- Toplam glossary entry: 1414
- Toplam alias/eşleşme etiketi: 4588
- Taranan source dosyası: 82
- Taranan proje metin kaynağı: 69
- Ambiguous alias satırı: 19
- Context-required alias satırı: 24
- Phrase-only alias satırı: 177
- Disabled standalone alias satırı: 2
- Duplicate id: 0
- Duplicate canonical term: 0
- Duplicate normalized alias collision: 0
- Generic alias → spesifik yanlış entry riski: 0
- Missing term candidate after patch: 0
- Regression: 28 / 28 geçti

Not: Audit 3 düşük riskli kısa lowercase klinik token (`üre`, `ral`, `pus`) raporladı. Bunlar acronym false-positive değil; gerçek kısa klinik terimler olduğu için otomatik silinmedi ve manuel watch-list olarak bırakıldı.

## 5. Eklenen yeni bağlamlı glossary words
V287 ile 43 yeni ambiguity/context-safe entry eklendi. Öne çıkanlar:
- Asit
- Peritoneal asit / Ascites
- Asit-baz dengesi
- Laktik asit
- Ürik asit
- Folik asit
- Yağ asidi
- Nükleik asit
- Safra asidi
- Mide asidi
- Direnç
- İnsülin direnci
- Antibiyotik direnci
- Vasküler direnç
- Blok
- AV blok
- Dal bloğu
- Sinir bloğu
- Elevasyon
- ST depresyonu
- Depresyon
- Kültür
- Kan kültürü
- İdrar kültürü
- Boğaz kültürü
- Darlık
- Mitral darlık
- Aort darlığı
- Spinal kanal darlığı
- Hava yolu darlığı
- Ödem
- Periferik ödem
- Pulmoner ödem
- Serebral ödem
- Kontrast tutulumu
- Organ tutulumu
- Perforasyon
- GIS perforasyonu
- Timpanik membran perforasyonu
- Torsiyon
- Over torsiyonu
- Granülom
- Non-kazeifiye granülom

## 6. Phrase-first matching nasıl uygulandı?
Mevcut matcher’da uzun alias’lar zaten önce sıralanıyordu; V287’de bunu ambiguity-safe veri modeliyle güçlendirdik. Yeni phrase entry’lerin `matchingPriority` değerleri yüksek tutuldu. Böylece `laktik asit`, `asit-baz dengesi`, `karında asit`, `AV blok`, `sinir bloğu`, `mitral darlık`, `pulmoner ödem` gibi çok kelimeli ifadeler, içlerindeki tek kelimelik ambiguous alias’lardan önce yakalanır. Generic tek kelimeler ise bağlam/phrase yoksa spesifik hastalığa düşmez.

## 7. Context-aware disambiguation nasıl çalışıyor?
`GlossaryTooltip.jsx` içindeki match resolver artık alias match sonrasında entry bağlam kurallarını da kontrol eder:
- `contextRequired`
- `phraseOnly`
- `disabledAsStandaloneAlias`
- `allowedContextKeywords`
- `blockedContextKeywords`
- `requiredCoTerms`
- `standaloneSafe`
- `ambiguityGroup`

Eşleşme çevresindeki yaklaşık 90 karakterlik bağlam normalize edilerek kontrol edilir. Bağlam izin vermiyorsa entry seçilmez. Sistem emin değilse yakın/ilk entry’ye fallback yapmaz.

## 8. Tooltip / toolbox nested ambiguity güvenliği
Nested glossary tamamen kapatılmadı. V286’daki balanced nested yapı korundu; V287’de tooltip/toolbox body içinde ambiguous standalone kelimelerin linklenmesi daha sıkı hale getirildi. Bir nested candidate generic veya context-sensitive ise tek kelime olarak ancak `allowNestedStandalone === true` ile açıkça izin verilirse çalışır. Çok kelimeli safeNested phrase’ler çalışmaya devam eder. `maxNestedDepth = 1` korunur.

## 9. Pre-answer / post-answer güvenliği
Mevcut pre-answer leakage neutralizer korundu. Tanı/tedavi cevabını açıkça sızdırabilecek `ilk tedavi`, `en uygun yaklaşım`, `tanı koydurur`, `verilmelidir`, `uygulanmalıdır` gibi ifadeler pre-answer tanımlarda nötralize edilmeye devam eder. Post-answer modda TUS ipucu, ayırıcı not ve expanded explanation korunur.

## 10. Regression test sonuçları
Audit scriptinde şu örnekler doğrulandı:
- `karında asit` → Peritoneal asit / Ascites
- `asit sıvısı` → Peritoneal asit / Ascites
- `asit-baz dengesi` → Asit-baz dengesi
- `laktik asit` → Laktik asit
- `ürik asit` → Ürik asit
- `folik asit` → Folik asit
- `yağ asidi` → Yağ asidi
- `nükleik asit` → Nükleik asit
- `safra asidi` → Safra asidi
- `mide asidi` → Mide asidi
- `asit` → generic Asit entry / context-required; matcher bağlam yoksa spesifik ascites’e düşmez
- `ST elevasyonu` → ST elevasyonu
- `aktif elevasyon` → Aktif elevasyon
- `insülin direnci` → İnsülin direnci
- `antibiyotik direnci` → Antibiyotik direnci
- `vasküler direnç` → Vasküler direnç
- `AV blok` → AV blok
- `sinir bloğu` → Sinir bloğu
- `kan kültürü` → Kan kültürü
- `idrar kültürü` → İdrar kültürü
- `ST depresyonu` → ST depresyonu
- `depresyon` → Depresyon
- `mitral darlık` → Mitral darlık
- `spinal kanal darlığı` → Spinal kanal darlığı
- `pulmoner ödem` → Pulmoner ödem
- `kontrast tutulumu` → Kontrast tutulumu
- `GIS perforasyonu` → GIS perforasyonu
- `over torsiyonu` → Over torsiyonu

## 11. Kalan manuel inceleme gereken riskler
- Legacy `category: Genel` kayıtları uzun vadede editoryal olarak daha iyi kategorilere ayrılmalı.
- `üre`, `ral`, `pus` gibi kısa ama gerçek klinik terimler düşük riskli watch-list’te tutuldu.
- İleride yeni glossary dosyası import edilirse, tek kelimelik ambiguous alias’lar aynı audit scriptinden geçirilmelidir.
- Vite build çalıştırılamadı; ortamda `vite` bulunmadığı için `npm run build` `vite: not found` ile durdu. Node import/syntax ve audit kontrolleri çalıştı.
