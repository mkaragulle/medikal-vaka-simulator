# KlinikIQ Türkçe Tıbbi Metin Standardı Düzeltme Raporu

## Kapsam

Bu geçişte KlinikIQ içindeki gömülü vaka verileri, AI soru seed/template verileri, synthetic fallback şablonları ve AI kalite kontrol hattı Türkçe tıbbi editoryal standart açısından düzenlendi.

## Uygulanan editoryal standart

- Kart başlığı metin içinde tekrar edilmez. Örneğin `Sınav incisi | ...`, `Ayırıcı nokta: ...`, `Karar verdirici ipucu: ...` gibi tekrarlar temizlenir.
- Gereksiz `|`, fazla `:`, gereksiz `;` ve şablon hissi veren tire kullanımı azaltılır.
- Metinler doğal Türkçe cümleye çevrilir.
- AI/generator kokan cümleler yerine doğrudan klinik bilgi yazılır.
- Cümleler yarım bırakılmaz.
- Yanlış seçenek açıklamaları “benzer başlıklarda düşünülebilir” gibi boş kalıplar yerine olguya dayalı kısa gerekçeyle verilir.
- İngilizce terimler yalnızca Türkçe tıp kullanımında yerleşikse korunur. Gereksiz İngilizce terimler Türkçeleştirilir.

## Türkçeleştirilen ve normalize edilen terimler

- `wheezing` → `hışıltılı solunum`
- `airway` → `hava yolu`
- `rash` → `döküntü`
- `screening` → `tarama`
- `follow-up` → `izlem`
- `management` → `yönetim`
- `trigger` → `tetikleyici`
- `muffled voice` → `boğuk ses`
- `Nursemaid elbow` → `radius başı subluksasyonu`
- `target / pseudokidney` → `hedef / psödoböbrek görünümü`
- `pattern / patern` → bağlama göre `bulgu örüntüsü`, `klinik tablo`, `seroloji yorumu` veya `tetkik yorumu`

## Temizlenen sorunlu kalıplar

- `Sınav incisi | ...`
- `Ayırıcı nokta: ...`
- `Karar verdirici ipucu: ...`
- `Destekleyici kanıt: ...`
- `Mekanizma: ...`
- `Ana patern: ...`
- `benzer seçenekleri ayıran ana patern olarak hatırlanmalıdır`
- `doğru seçenek verilen öğrenme hedefiyle uyumludur`
- `soru patern yorumlama becerisini ölçer`
- `verilen öğrenme hedefi`
- `yanıt ekseni`
- `benzer başlıklarda düşünülebilir`
- `temel bulgunün`
- `Bu nedenle en iyi yanıt.`

## AI generated metinler için eklenen kalite kuralları

`src/utils/editorialQuality.js` içinde AI üretim hattı ve gömülü vaka QA süreci için kalıcı yardımcılar eklendi veya genişletildi:

- `normalizeMedicalTurkish(text)`
- `removeRepeatedSectionLabel(text, sectionTitle)`
- `removeUnnecessaryColonUsage(text)`
- `replaceUnnecessaryEnglishTerms(text)`
- `detectTemplateLanguage(text)`
- `detectBrokenSentence(text)`
- `repairEditorialQuality(text)`
- `validateFeedbackTextQuality(text)`
- `validateGeneratedCaseText(caseItem)`

Bu kurallar `aiQuestionQualityGate`, `validateAIQuestion` ve `aiQuestionGenerator` akışında çalışacak şekilde bağlandı.

## Kontrol sonuçları

- Gömülü vaka sayısı: 132
- Taranan kullanıcıya görünür string: 19.815
- Bloklanan editoryal kalıp kalıntısı: 0
- Gömülü vaka validasyon hatası: 0
- Gömülü vaka validasyon uyarısı: 0
- AI branch smoke testi: 12/12 üretim başarılı
- AI smoke testinde bloklanan editoryal kalıp: 0

## Build durumu

JavaScript module/syntax kontrolleri geçti. Bu çalışma ortamında `node_modules` bulunmadığı ve `npm install` tamamlanamadığı için `npm run build` komutu `vite: not found` hatasıyla başlamadan durdu. Yerelde `npm install` tamamlandıktan sonra `npm run build` tekrar çalıştırılmalıdır.
