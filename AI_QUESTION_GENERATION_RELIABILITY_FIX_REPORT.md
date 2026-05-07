# KlinikIQ AI Soru Üretim Güvenilirliği Düzeltme Raporu

## Kök neden
Önceki sürümde `validateGeneratedCaseText` teknik metadata alanlarını da kullanıcıya gösterilen metin gibi tarıyordu. Bu nedenle `local-template-generator`, `ai-spot-v3-independent-generator` ve `AI Spot • ...` gibi görünmeyen teknik değerler meta/generator dili olarak işaretleniyor, geçerli adaylar kalite kapısında reddediliyordu. Ayrıca duplicate kontrolü aynı doğru cevabı veya aynı seçenek kümesini farklı soru açılarında da fazla agresif biçimde tekrar sayabiliyordu. Local üretim hattı başarısız olduğunda branch-specific sentetik fallback yeterince güçlü olmadığı için kullanıcı hata ekranına erken düşüyordu.

## Uygulanan çözüm
- Metadata ve teknik alanlar editoryal metin validasyonundan çıkarıldı.
- Pediatriye özgü sunum düzeltmeleri yalnızca pediatri sorularına uygulanacak şekilde sınırlandı.
- `buildBranchAwareStem` içindeki yapay/meta cümleler doğal klinik cümlelere çevrildi.
- Retry hattı üç aşamalı hale getirildi: primary mutated seed, repair and seed mutation, local synthetic template fallback.
- Seed mutation her denemede soru açısı, stem cümlesi, klinik varyant ve content signature üretecek şekilde güçlendirildi.
- Duplicate kontrolü dengelendi. Aynı hastalık veya aynı doğru cevap tek başına tekrar sayılmıyor; artık stem, soru kökü, seçenek seti ve birleşik metin benzerliği birlikte değerlendiriliyor.
- Gömülü vakalar direkt fallback olarak gösterilmiyor. Gömülü vakalar yalnızca konsept/öğrenme hedefi seed’i olarak kullanılıyor.
- Branch-specific local synthetic fallback bankası eklendi.
- Error state metni teknik ifadelerden arındırıldı.
- Loading state metni kalite kontrol sürecini daha anlaşılır açıklayacak şekilde güncellendi.
- Dev mode için `klinikiq-ai-debug=1` localStorage anahtarıyla açılabilen debug log hattı eklendi.

## Yeni üretim sırası
1. Normal local/remote aday üretimi
2. Editoryal repair
3. Quality gate
4. Duplicate/novelty kontrolü
5. Seed mutation ile yeni deneme
6. Repair + seed mutation aşaması
7. Branch-specific local synthetic template fallback
8. Yalnızca `random` modunda geniş sentetik fallback
9. Tüm yollar başarısızsa error state

## Test özeti
- Aynı branşta 50 ardışık soru testi: 50/50 başarılı, 0 hata, 0 contentSignature tekrarı.
- Her branşta 5 soru testi: 12 branş x 5 = 60/60 başarılı, 0 hata, 0 branch mismatch.
- JS module import/syntax testleri geçti.
- `npm install` bu ortamda zaman aşımına uğradığı için Vite build burada tamamlanamadı. `npm run build` Vite bulunamadığı için çalışmadı. Yerelde `npm install` sonrası build alınmalıdır.
