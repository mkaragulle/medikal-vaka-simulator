# KlinikIQ Smart Glossary V275 — Klinik Branş Seç Derin Kapsam ve Pre/Post Answer Düzeltmesi

## Amaç
Bu güncelleme, Hap Bilgi kartlarında daha iyi çalışan glossary deneyiminin Klinik Branş Seç, TUS Spot Olgular, vaka öyküsü, muayene, tetkik, soru kökü, seçenek ve feedback alanlarında da aynı kaliteye yaklaşması için yapıldı. Odak, rastgele kelime kalabalığı değil; hastalık, bulgu, laboratuvar, görüntüleme, moleküler mekanizma, anatomi, farmakoloji, mikrobiyoloji, patoloji ve biyoistatistik kavramlarının TUS değeriyle işaretlenmesidir.

## Tarama ve kapsam kontrolü
- `src/data/cases.js` içindeki 568 kayıt tarandı.
- İncelenen alanlar: title, listTitle, cardTitle, clinicalFocus, learningTarget, chiefComplaint, stem, patientIntro, exam, investigations, result rows, question, options, explanation, answerFeedback, evidenceChain, optionComparison, pearls.
- Alan bazlı coverage kontrolünde özellikle seçenekler, feedback, tetkik etiketleri ve açıklama metinlerindeki eksikler hedeflendi.

## Değiştirilen dosyalar
1. `src/data/tusGlossaryClinicalBranchDeepIndex.js`
   - Yeni curated clinical-branch glossary katmanı eklendi.
   - 256 yeni yüksek değerli klinik/TUS terimi eklendi.

2. `src/utils/glossary.js`
   - Yeni `TUS_GLOSSARY_CLINICAL_BRANCH_DEEP_TERMS` import edildi.
   - Bu kaynak `STATIC_GLOSSARY_SOURCES` içinde en öne alındı; aynı terimin eski kısa kaydı varsa yeni daha kaliteli kayıt öncelik alır.

3. `src/components/GlossaryTooltip.jsx`
   - Varsayılan term yoğunluğu kontrollü şekilde artırıldı.
   - Pre-answer cevap sızdırma filtresi güçlendirildi.
   - Pre-answer kart içeriğinde “ilk tedavi / en olası tanı / tipik bulgu / düşündürür / uygulanmalıdır” gibi doğrudan cevap yönlendirebilecek ifadeler yakalanırsa otomatik nötr tanıma düşürülür.
   - Post-answer modda TUS ipucu, ayırıcı not, mekanizma ve detaylar görünmeye devam eder.

4. `src/components/CasePlayer.jsx`
   - Klinik Branş Seç vaka ekranında lokal cevaplandı state’i eklendi.
   - Kullanıcı yanıtı değerlendirdiği anda öykü, muayene ve tetkik alanları da post-answer glossary moduna geçebilir.
   - `InvestigationPanel` ve `ManagementSequencePanel` içine `glossaryRevealMode` geçirildi.
   - Klinik vaka metinlerinde kontrollü glossary yoğunluğu artırıldı.

5. `src/components/InvestigationPanel.jsx`
   - Tetkik başlıkları, sonuçları, yorumları, referans/not alanları artık parent `glossaryRevealMode` ile çalışır.
   - Önceden bu alanlar post-answer sonrasında bile `preAnswer` modunda kalabiliyordu; bu düzeltildi.

6. `src/components/ManagementSequencePanel.jsx`
   - Parent post-answer modunu alacak şekilde güncellendi.
   - Yönetim paneli kendi sıralama kontrolü sonrası da post-answer modunu korur.

7. `src/components/DiagnosisQuiz.jsx`
   - Soru kökü ve seçeneklerde makul glossary yoğunluğu artırıldı.
   - Özellikle seçeneklerde hastalık/ilaç/sinir/mikroorganizma isimlerinin daha görünür yakalanması hedeflendi.

8. `src/components/AnswerFeedbackPanel.jsx`
   - Feedback alanlarında post-answer modu açıkça geçirildi.
   - Daha önce bir AI spot TUS ipucu alanında glossary bilinçli/yanlışlıkla kapalıydı; tekrar aktif edildi.

9. `src/components/CaseList.jsx`
   - Diğer Olgular / vaka kart başlıklarında glossary yoğunluğu hafif artırıldı.

## Güncel glossary sayısı
- V274 ana terim sayısı: 1021
- V275 ana terim sayısı: 1190
- Yeni clinical-branch deep dosyasındaki kayıt sayısı: 256
- Birleştirme sonrası bazı kayıtlar mevcut terimlerle merge edildiği için net benzersiz artış: 169

## Eklenen örnek terim grupları
- Acil / tedavi: anjiyoödem, laringeal ödem, hava yolu ödemi, membran stabilizasyonu, insülin-glukoz tedavisi, sodyum bikarbonat, hemodiyaliz, iğne dekompresyonu.
- Laboratuvar / tetkik: tam kan sayımı, hemoglobin, trombosit sayısı, beyaz küre sayısı, mutlak nötrofil sayısı, periferik yayma, serum kreatinin, BUN, direkt/indirekt bilirubin, serum lipaz, CK.
- Metabolizma / moleküler: GALT, MSUD, BCKD, 17-OHP, 21-hidroksilaz eksikliği, G6PD, NADPH, glutatyon, PDH, TPP, lipoik asit, CPT-I, malonil-KoA, PFK-1, HPRT, CBS.
- Mikrobiyoloji: Bordetella pertussis, pertussis toksini, kolera toksini, C. difficile, toksin A/B, C. tetani, tetanospazmin, Listeria, aktin kuyruğu, Protein A, IgA proteaz, Cryptococcus, H. pylori, üreaz, Pseudomonas, aljinat, biyofilm.
- Patoloji: granülomatöz inflamasyon, Langhans dev hücresi, fibrinoid nekroz, osteoid üretimi, psammoma cisimcikleri, Orphan Annie eye nükleusu, amiloid, elma yeşili çift kırılma.
- Kadın doğum: preeklampsi, ağır özellikli preeklampsi, magnezyum sülfat, eklampsi, ablatio plasenta, ektopik gebelik, metotreksat, komplet mol, β-hCG, RhD immünoglobulin, omuz distosisi, McRoberts manevrası.
- Anatomi: nervus medianus, ulnaris, radialis, axillaris, facialis, accessorius, hypoglossus, glossopharyngeus, pudendus, thoracicus longus, laryngeus recurrens/superior, sinus cavernosus, Kiesselbach pleksusu.
- Biyoistatistik: NNT, ARR, RR, odds ratio, duyarlılık, özgüllük, PPV, NPV, Tip I hata, intention-to-treat, karıştırıcı değişken, saldırı hızı.

## Pre-answer / post-answer düzeltmesi
- Pre-answer: cevap sızdırma riski taşıyan ifadeler nötralize edilir. Örneğin “ilk tedavidir”, “en olası tanıdır”, “tipik bulgudur”, “düşündürür” gibi yönlendirici ifadeler cevap öncesi gösterilmez.
- Post-answer: aynı kavram kartı genişleyerek TUS ipucu, ayırıcı not ve detaylı açıklama gösterebilir.
- Klinik Branş Seç ana vaka ekranında cevap verildikten sonra sadece quiz feedback değil, vaka metni/tetkik alanları da post-answer modunu alabilir.
- Strict exam modunda cevap açıklaması blok sonuna saklandığı için pre-answer koruması korunur.

## Coverage kontrol özeti
Basit alias tabanlı coverage kontrolünde V274 → V275 karşılaştırması:
- Terim sayısı: 1021 → 1190
- Seçenek alanlarında glossary yakalanan metin: 1049/2840 → 1267/2840
- Feedback optionComparison açıklamalarında ortalama eşleşme: 1.30 → 1.58
- Stem alanlarında ortalama eşleşme: 0.59 → 0.77
- Tetkik label alanlarında glossary yakalanan metin: 278/648 → 427/648
- Tetkik row alanlarında glossary yakalanan metin: 633/2592 → 824/2592

Not: “Bu hastada en olası tanı nedir?” gibi generic soru cümlelerinin glossary almaması bilinçli olarak normaldir; amaç tüm cümleleri değil anlamlı tıbbi kavramları işaretlemektir.

## Test edilmesi gereken ekranlar
1. Klinik Branş Seç → standart vaka → öykü, muayene, tetkik, soru kökü, seçenekler.
2. Aynı vakada cevap verilmeden önce tooltip: sadece nötr tanım görünmeli.
3. Cevap sonrası aynı terim: TUS ipucu ve ayırıcı not görünmeli.
4. TUS Spot Olgular → soru kökü + seçenekler + feedback.
5. Diğer Olgular kart başlıkları.
6. Tetkik sonucu açılan panellerde pre/post geçişi.
7. Yönetim sırası paneli.
8. Hap Bilgi kartları: mevcut iyi görünüm bozulmamalı.
9. Nested tooltip zinciri: önceki sibling close düzeltmesi korunmalı.

## Genişletme planı
Yeni terimler bundan sonra `src/data/tusGlossaryClinicalBranchDeepIndex.js` veya ilgili domain index dosyalarına eklenebilir. Aynı terimi yeniden eklemek yerine mevcut kaydın alias, TUS ipucu ve ayırıcı not alanı zenginleştirilmeli. Düşük TUS değeri olan günlük kelimeler glossary’e alınmamalıdır.
