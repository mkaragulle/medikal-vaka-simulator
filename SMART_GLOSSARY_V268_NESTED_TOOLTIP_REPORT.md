# KlinikIQ Smart Glossary V268 - Nested Tooltip Update

## Amaç
Bu güncelleme, glossary kartlarının içindeki bilimsel/klinik terimlerin de tekrar glossary olarak açılabilmesini sağlar. Örneğin **Graves hastalığı** kartındaki **Ekzoftalmi**, **pretibial miksödem**, **TSH reseptörü**, **TRAb**, **otoantikor** gibi kavramlar artık kart içinde de işaretlenebilir ve kendi küçük preview kartlarını açabilir.

## Değiştirilen / eklenen dosyalar

1. `src/components/GlossaryTooltip.jsx`
   - `GlossaryCard` içindeki kısa tanım, TUS ipucu, ayırıcı not, mekanizma, klinik değer ve detay metinleri artık düz string olarak değil, yeniden `GlossaryText` ile render edilir.
   - Böylece tooltip içindeki terminolojik kavramlar da ikinci/üçüncü seviye glossary kartı açabilir.
   - Sabit bir nesting-depth limiti konmadı; sistem teorik olarak zincir şeklinde devam edebilir.
   - Ancak aynı terimin kendi kartı içinde tekrar linklenmesi ve dairesel A→B→A döngüsü engellendi.
   - Parent tooltip, child tooltip açıldığında hemen kapanmasın diye portal/click-away davranışı güncellendi.
   - Nested tooltip’ler sibling portal olarak render edildiği için parent tooltip’in dışına taşsa bile container clipping problemi oluşmaz.

2. `src/data/tusGlossaryNestedClinicalIndex.js`
   - Tooltip metinlerinde sık geçen ama önceki glossary katmanında eksik kalabilen yüksek değerli kavramlar eklendi.
   - Örnek yeni terimler: `Ekzoftalmi`, `Pretibial miksödem`, `TRAb`, `TSH reseptörü`, `Otoantikor`, `Hipertiroidi`, `Toksik multinodüler guatr`, `Oftalmopati`, `Membran stabilizasyonu`, `İnsülin-glukoz`, `Anyon gap`, `Bikarbonat`, `Na+/K+-ATPaz`, `Beta-2 agonist`, `Glikozaminoglikan`, `Fibroblast`, `cAMP`, `PKA`.

3. `src/utils/glossary.js`
   - Yeni nested clinical glossary index merkezi `getGlossaryTerms()` akışına bağlandı.
   - Güncel ana glossary kayıt sayısı: **909**.

## Nested tooltip davranışı

- Ana metindeki bir terime hover/click yapılınca ilk glossary kartı açılır.
- Bu kartın içindeki açıklama metinlerinde başka glossary terimi varsa o kelime de işaretlenir.
- Kullanıcı bu iç terime hover/click yaptığında ikinci glossary kartı açılır.
- İkinci kartın içindeki başka terimler de aynı sistemle çalışır.
- Sabit bir derinlik sınırı yoktur.
- Yalnızca aynı terimin kendi içinde tekrar açılması ve dairesel tooltip zinciri engellenir.

## Cevap sızdırma güvenliği

- Pre-answer modda nested kartlar da yalnızca `preAnswerSafeDefinition` / nötr tanım gösterir.
- TUS ipucu, ayırıcı not, mekanizma ve klinik değer alanları post-answer modda açılır.
- Böylece tooltip içinde açılan ikinci/üçüncü seviye kartlar da soru çözmeden önce cevabı ele vermez.

## Tekrar metin kontrolü

- Kart içinde aynı cümle hem `tusPearl`, hem `clinicalRelevance`, hem de `postAnswerExpandedExplanation` alanında varsa artık UI’da gereksiz tekrar gösterilmez.
- Örneğin Graves kartındaki “Ekzoftalmi ve pretibial miksödem...” cümlesi birden fazla alanda varsa kart bunu daha temiz gösterir.

## Test edilmesi gereken ekranlar

1. Klinik Branş Seç vaka ekranı
2. TUS Spot Olgular
3. Diğer Olgular
4. Zamanlı Sınav Oluştur
5. Hap kart ön/arka yüzleri
6. AI Ders Anlatımı
7. AI Soruları
8. Komite modu ders içerikleri
9. Mobilde tap/click davranışı
10. Tooltip içinden tooltip açma: Graves hastalığı → Ekzoftalmi → Glikozaminoglikan gibi zincirler

## Teknik kontrol

- `getGlossaryTerms()` import testi çalıştı.
- Toplam glossary term sayısı **909** olarak doğrulandı.
- `GlossaryTooltip.jsx` JSX syntax kontrolü TypeScript transpile kontrolüyle yapıldı ve hata alınmadı.
