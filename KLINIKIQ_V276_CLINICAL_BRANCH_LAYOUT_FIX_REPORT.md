# KlinikIQ V276 — Klinik Branş Seç Profile / Option Layout Fix

## Amaç
Bu güncelleme yalnızca Klinik Branş Seç vaka/olgu ekranlarındaki iki UI yerleşim problemini düzeltir. Soru içerikleri, seçenek metinleri, feedbackler, vaka verileri ve glossary verileri değiştirilmedi.

## Düzeltilen problemler

### 1. Profil metninde kelime ortasından kırılma
`PROFİL` kartındaki hasta profili metninde `acil` gibi kısa Türkçe kelimelerin `ac / il` şeklinde bölünmesine neden olan agresif kırma davranışları override edildi.

Uygulanan teknik çözüm:
- Profil kartındaki text container için `word-break: normal` güçlendirildi.
- `overflow-wrap: normal` ve `hyphens: none` ile kelime ortası kırma engellendi.
- `summary-detail-copy` ve `summary-profile-copy` alanlarında `min-width: 0`, `max-width: 100%`, `white-space: normal` güvenli şekilde tanımlandı.
- Profil kartının mevcut premium border/radius/spacing yapısı korunarak yalnızca metin akışı düzeltildi.

### 2. Seçenek metninin sağdaki radio/seçim dairesinin altına girmesi
Seçenek kartları güvenli üç kolonlu grid yapısıyla sabitlendi.

Uygulanan teknik çözüm:
- Seçenek kartlarında `grid-template-columns: letter / text / radio` mantığı netleştirildi.
- Sol seçenek harfi, orta metin, sağ radio/status alanı ayrı grid kolonlarına alındı.
- Radio/status icon için `position: static` ve sabit kolon genişliği uygulandı.
- Option text alanına `min-width: 0`, doğal satır kırma ve `overflow-wrap: break-word` eklendi.
- Sağdaki radio indicator metnin üstüne binmeyecek şekilde ayrı kolonda tutuldu.
- Mobilde kolon genişlikleri küçültülerek A-E hizalaması korundu.

## Değiştirilen dosya
- `src/styles/klinikiq-refine.css`

## Değiştirilmeyenler
- `src/data/cases.js` ve diğer vaka/soru veri dosyaları değiştirilmedi.
- Soru kökü, seçenekler, feedback, kanıt zinciri ve açıklama metinleri değiştirilmedi.
- Glossary sistemi ve tooltip davranışı değiştirilmedi.
- Klinik Branş Seç ana akışı, seçili/doğru/yanlış state davranışları korunmuştur.

## Test edilmesi gereken ekranlar
1. Klinik Branş Seç → herhangi bir vaka → `PROFİL` kartı.
2. Profil örneği: `24 yaşında kadın hasta, acil serviste değerlendiriliyor.`
3. Klinik Branş Seç → seçenekler A-E.
4. Uzun seçenek örneği: `Oral antibiyotik verilip poliklinik kontrolü önerilmesi`.
5. Seçili seçenek, doğru seçenek ve yanlış seçenek state'leri.
6. Mobil / tablet / desktop kırılımları.
7. TUS Spot Olgular içindeki seçenek kartları.
