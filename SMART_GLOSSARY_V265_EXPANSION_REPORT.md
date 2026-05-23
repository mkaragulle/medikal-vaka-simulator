# KlinikIQ Smart Glossary V265 kalite/genişletme raporu

Bu güncelleme V264 üzerindeki glossary sistemini bozmadan genişletir. Amaç yalnızca kelime sayısını artırmak değil; TUS açısından anlamlı, bilimsel, terminolojik ve cevap sızdırma riski kontrol edilmiş kavramları eklemektir.

## Yapılan ana değişiklikler

1. Yeni dosya eklendi: `src/data/tusGlossaryExpandedIndex.js`
2. `src/utils/glossary.js` içinde yeni expanded TUS glossary katmanı merkezi sisteme bağlandı.
3. Eski glossary kayıtları silinmedi; ancak aynı terim için yeni curated kayıt varsa yeni zengin kayıt önce geldiği için eski kısa açıklama yerine zengin kayıt kullanılır.
4. Çok genel ve UI kalabalığı oluşturabilecek bazı düşük sinyal alias/kavramlar filtreye eklendi.
5. Yeni kayıtlarda pre-answer alanları nötr bırakıldı; TUS ipucu ve ayırıcı notlar post-answer görünümde kullanılacak şekilde ayrıldı.

## Eklenen yeni curated terim sayısı

- Yeni expanded curated kayıt: **244**
- Yeni supplemental curated kayıt: **105**
- Toplam yeni curated kayıt: **349**

## Kalite yaklaşımı

Her yeni kayıt şu mantıkla yazıldı:

- `previewDefinition` / `preAnswerSafeDefinition`: cevap sızdırmayan nötr kısa tanım
- `tusPearl`: yalnızca cevap sonrası gösterilecek soru çözdürücü nokta
- `differentialPoint`: kısa tanımın tekrarı olmayan ayırıcı tanı/karşılaştırma notu
- `category`: terminolojik sınıf
- `aliases`: Türkçe/İngilizce/kısaltma varyasyonları
- `relatedBranches`: ilgili eğitim/branş bağlamı

## Yeni terim kapsamı

Yeni katman kardiyoloji, acil, pulmonoloji, nefroloji, asit-baz, endokrinoloji, gastroenteroloji, enfeksiyon, mikrobiyoloji, nöroloji, hematoloji, pediatri, kadın doğum, romatoloji, dermatoloji, farmakoloji, toksikoloji, patoloji, genetik, biyokimya, cerrahi, ortopedi, göz, KBB, psikiyatri ve biyoistatistik alanlarını kapsar.

## Pre-answer / post-answer güvenliği

Pre-answer aşamasında sistem yalnızca `preAnswerSafeDefinition` veya `previewDefinition` gösterir. `tusPearl`, `differentialPoint`, `mechanism` ve geniş açıklamalar cevap sonrası görünür. Böylece “terimi açıklarken doğru cevabı verme” problemi azaltılır.

## Test edilmesi gereken ekranlar

- Klinik Branş Seç vaka ekranı
- TUS Spot Olgular
- Diğer Olgular
- Zamanlı Sınav Oluştur
- Soru kökü / seçenekler / cevap sonrası feedback
- Klinik/Bilimsel gerekçe
- Kanıt zinciri
- Sınav notu
- Hap kart ön ve arka yüzleri
- AI Ders Anlatımı
- Komite modu ders ve soru çıktıları

## İleride genişletme planı

Yeni terim eklemek için `src/data/tusGlossaryExpandedIndex.js` içindeki seed yapısına kayıt eklemek yeterlidir. Her kayıt için en az `term`, `category`, `previewDefinition`, `tusPearl`, `differentialPoint`, `aliases` ve `relatedBranches` girilmelidir. Çok temel kelimeler yerine çok kelimeli, TUS değeri yüksek ve ayırıcı tanı yaptıran kavramlar tercih edilmelidir.


## V265 doğrulama sayımı

Node import/syntax kontrolü sonrası merkezi `getGlossaryTerms()` çıktısı:

- Advanced zengin kayıt: **23**
- Expanded curated kayıt: **244**
- Supplemental curated kayıt: **105**
- Eski/global kayıtlar korundu: **514**
- Merge sonrası benzersiz aktif ana glossary terimi: **814**
- Zengin veri alanlarına sahip aktif kayıt: **358**
- Toplam alias/eşleşme etiketi: **3419**
- Normalize benzersiz alias/eşleşme etiketi: **1878**

Bu sayı, V264’teki 534 ana terime göre yaklaşık %52 daha geniş bir aktif ana terim kapsamı sağlar. Alias kapsamı da 1993 seviyesinden 3419 seviyesine çıkarıldı.

## Kontrol edilen kalite başlıkları

- Yeni eklenen 349 kaydın tamamında `term`, `category`, `previewDefinition`, `preAnswerSafeDefinition`, `tusPearl` ve `differentialPoint` alanları kontrol edildi.
- Pre-answer alanlarında doğrudan tanı/tedavi cevabı sızdıracak TUS ipuçları kullanılmadı.
- Post-answer alanlarında TUS ipucu ve ayırıcı notlar kısa tanımın tekrarı olmayacak şekilde yazıldı.
- Çok genel kelimeler için düşük sinyal filtresi genişletildi.
- Eski kayıtlar silinmedi; aynı terim yeni zengin katmanda varsa yeni kayıt önceliklendirildi.
