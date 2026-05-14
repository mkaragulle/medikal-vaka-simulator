# KlinikIQ KOMİTE Source Isolation Update

Bu ZIP içinde KOMİTE bölümündeki kaynak karışma problemi için hem prompt hem de teknik kaynak doğrulama katmanı güncellendi.

## Yapılan ana değişiklikler

1. `api/prompts/komiteGlobalEducationalPrompt.js`
   - Kullanıcının verdiği yeni global KOMİTE educational prompt uygulandı.
   - Prompt, current active material session/sourceManifest dışındaki eski dosya, cache, localStorage, previous workspace ve generated output kullanımını açıkça yasaklıyor.
   - Ders anlatımı, soru üretimi ve hap kart üretimi için kaynak izolasyonu, kalite, bilimsel güvenilirlik ve Türkçe akademik dil standartları genişletildi.

2. `src/components/KomiteModeWorkspace.jsx`
   - Her yeni materyal yüklemesi için bağımsız `sourceSessionId`, `uploadBatchId`, dosya ID’leri ve kaynak parmak izi üretimi güçlendirildi.
   - AI isteklerinden önce aktif materyale ait `sourceManifest` oluşturuluyor.
   - AI payload’larına `sourceManifest` ve `sourceFingerprint` birlikte gönderiliyor.
   - Aktif kaynak oturumu doğrulanamazsa AI isteği durduruluyor; eski materyalden çıktı üretme riski azaltıldı.
   - Fetch isteklerine `Cache-Control: no-store`, `cache: 'no-store'` ve `X-KlinikIQ-Source-Fingerprint` eklendi.

3. `api/lib/komite-ai-common.js`
   - Server tarafında `verifyCurrentSourceManifest` eklendi.
   - AI endpoint’leri, gelen `sourceManifest` ile `sourceFingerprint` ve aktif materyal dosya sayısını kontrol ediyor.
   - Uyuşmazlık varsa endpoint 409 döndürerek eski/yanlış kaynakla üretimi engelliyor.

4. AI endpointleri
   - `api/analyze-uploaded-material.js`
   - `api/generate-lesson.js`
   - `api/generate-material-questions.js`
   - `api/generate-material-flashcards.js`

   Bu dosyalar artık source manifest doğrulaması yapıyor ve prompt builder’lara güncel `sourceManifest` gönderiyor.

5. Prompt builder dosyaları
   - `api/prompts/analyzeUploadedMaterialPrompt.js`
   - `api/prompts/generateLessonPrompt.js`
   - `api/prompts/generateMaterialQuestionsPrompt.js`
   - `api/prompts/generateFlashcardsPrompt.js`

   Her üretim tipi artık current active sourceManifest bilgisini prompt içine açıkça yerleştiriyor.

## Kontrol

- Server-side API dosyaları Node import testiyle kontrol edildi.
- `KomiteModeWorkspace.jsx` esbuild ile JSX syntax/bundle parse kontrolünden geçirildi.

## Beklenen sonuç

Yeni bir kullanıcı oturumunda veya yeni materyal yükleme akışında AI artık önceki session/workspace/cache/localStorage kaynaklarını prompt veya API seviyesinde geçerli kaynak gibi kullanmamalıdır. Aynı current upload request içinde birden fazla dosya varsa birlikte değerlendirilir; önceki yüklemelerdeki dosyalar ise sadece kütüphanede durur, yeni üretime otomatik karışmaz.
