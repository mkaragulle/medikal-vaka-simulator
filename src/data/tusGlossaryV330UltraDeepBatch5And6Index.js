// V330 — Ultra-deep glossary additions from V317 Batch 5 and foundation Batch 6 candidate audits.
// Sources: glossary-v317-ultradeep-quality-batch5(3).json and glossary-v317-foundation-major-gap-batch6(1).json
// Accepted entries were filtered against the V329 active glossary aliases, de-duplicated, and broad low-signal symptoms were excluded or context-guarded.

export const TUS_GLOSSARY_V330_ULTRADEEP_BATCH5_6_TERMS = [
  {
    "id": "v330-ultradeep-batch5-6-abdominal-aort-anevrizma-rupturu",
    "term": "Abdominal aort anevrizma rüptürü",
    "aliases": [
      "Abdominal aort anevrizma rüptürü",
      "rüptüre AAA",
      "AAA rüptürü"
    ],
    "normalizedTerm": "abdominal aort anevrizma rupturu",
    "TurkishName": "Abdominal aort anevrizma rüptürü",
    "EnglishName": "",
    "category": "Majör hastalık / vasküler acil",
    "subcategory": "vasküler acil",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Ani karın/sırt ağrısı ve şokla seyredebilien aort kaynaklı kanama acilidir.",
    "preAnswerSafeDefinition": "Ani karın/sırt ağrısı ve şokla seyredebilien aort kaynaklı kanama acilidir.",
    "shortDefinition": "Abdominal aort anevrizmasının yırtılarak retroperitoneal veya intraperitoneal kanamaya neden olmasıdır.",
    "definition": "Abdominal aort anevrizmasının yırtılarak retroperitoneal veya intraperitoneal kanamaya neden olmasıdır.",
    "detailedExplanation": "Yaşlı hastada ani karın veya bel ağrısı, hipotansiyon ve pulsatil abdominal kitle üçlüsü klasik ipucudur; stabil olmayan hastada görüntüleme beklemek ölümcül gecikme yaratabilir.",
    "postAnswerExplanation": "Yaşlı hastada ani karın veya bel ağrısı, hipotansiyon ve pulsatil abdominal kitle üçlüsü klasik ipucudur; stabil olmayan hastada görüntüleme beklemek ölümcül gecikme yaratabilir.",
    "postAnswerExpandedExplanation": "Yaşlı hastada ani karın veya bel ağrısı, hipotansiyon ve pulsatil abdominal kitle üçlüsü klasik ipucudur; stabil olmayan hastada görüntüleme beklemek ölümcül gecikme yaratabilir.",
    "tusPearl": "Şok + sırt/karın ağrısı + pulsatil kitle = rüptüre AAA düşün.",
    "differentialPoint": "",
    "clinicalRelevance": "Şok + sırt/karın ağrısı + pulsatil kitle = rüptüre AAA düşün.",
    "mechanism": "",
    "relatedBranches": [
      "surgery",
      "emergency"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Abdominal aort anevrizma rüptürü",
      "rüptüre AAA",
      "AAA rüptürü"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-adenozin-ve-svt",
    "term": "Adenozin ve SVT",
    "aliases": [
      "Adenozin ve SVT"
    ],
    "normalizedTerm": "adenozin ve svt",
    "TurkishName": "Adenozin ve SVT",
    "EnglishName": "",
    "category": "Farmakoloji / Tedavi / Toksikoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "preAnswerSafeDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "shortDefinition": "Adenozin AV nod iletimini geçici olarak bloke eder.",
    "definition": "Adenozin AV nod iletimini geçici olarak bloke eder.",
    "detailedExplanation": "Adenozin ve SVT Adenozin AV nod iletimini geçici olarak bloke eder.",
    "postAnswerExplanation": "Adenozin ve SVT Adenozin AV nod iletimini geçici olarak bloke eder.",
    "postAnswerExpandedExplanation": "Adenozin ve SVT Adenozin AV nod iletimini geçici olarak bloke eder.",
    "tusPearl": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "differentialPoint": "Benzer ilaçlardan ayrım, etki hedefi ve spesifik toksisite/antidot ilişkisidir.",
    "clinicalRelevance": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology"
    ],
    "relatedTerms": [
      "yan etki",
      "antidot"
    ],
    "safeNestedTerms": [
      "yan etki",
      "antidot"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "low",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "Adenozin ve SVT",
      "yan etki",
      "antidot"
    ],
    "sourceTextExamples": [
      "Stabil çocuk SVT’de vagal manevra sonrası ilk ilaç adenozindir; instabilite varsa senkronize kardiyoversiyon gerekir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve farmakoloji / tedavi / toksikoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-akut-hipertansif-akciger-odemi",
    "term": "Akut hipertansif akciğer ödemi",
    "aliases": [
      "Akut hipertansif akciğer ödemi"
    ],
    "normalizedTerm": "akut hipertansif akciger odemi",
    "TurkishName": "Akut hipertansif akciğer ödemi",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Hipertansif akciğer ödeminde afterload düşürülmesi hızlı hemodinamik rahatlama sağlar.",
    "definition": "Hipertansif akciğer ödeminde afterload düşürülmesi hızlı hemodinamik rahatlama sağlar.",
    "detailedExplanation": "Akut hipertansif akciğer ödemi Hipertansif akciğer ödeminde afterload düşürülmesi hızlı hemodinamik rahatlama sağlar.",
    "postAnswerExplanation": "Akut hipertansif akciğer ödemi Hipertansif akciğer ödeminde afterload düşürülmesi hızlı hemodinamik rahatlama sağlar.",
    "postAnswerExpandedExplanation": "Akut hipertansif akciğer ödemi Hipertansif akciğer ödeminde afterload düşürülmesi hızlı hemodinamik rahatlama sağlar.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "cardiology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P0",
    "answerLeakRisk": "low",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Akut hipertansif akciğer ödemi"
    ],
    "sourceTextExamples": [
      "Akut hipertansif akciğer ödemi",
      "Akut hipertansif akciğer ödemi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-akut-karaciger-yetmezligi",
    "term": "Akut karaciğer yetmezliği",
    "aliases": [
      "Akut karaciğer yetmezliği",
      "fulminan hepatik yetmezlik"
    ],
    "normalizedTerm": "akut karaciger yetmezligi",
    "TurkishName": "Akut karaciğer yetmezliği",
    "EnglishName": "",
    "category": "Majör hastalık / gastro-hepatoloji acil",
    "subcategory": "gastro-hepatoloji acil",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Karaciğerin detoksifikasyon ve sentez fonksiyonlarının akut bozulmasını ifade eder.",
    "preAnswerSafeDefinition": "Karaciğerin detoksifikasyon ve sentez fonksiyonlarının akut bozulmasını ifade eder.",
    "shortDefinition": "Önceden karaciğer hastalığı olmayan kişide hızlı gelişen hepatoselüler yetmezlik, koagülopati ve ensefalopati tablosudur.",
    "definition": "Önceden karaciğer hastalığı olmayan kişide hızlı gelişen hepatoselüler yetmezlik, koagülopati ve ensefalopati tablosudur.",
    "detailedExplanation": "INR uzaması ve hepatik ensefalopati ayırıcıdır; parasetamol toksisitesi gibi nedenlerde antidot ve transplant değerlendirmesi zaman kritiktir.",
    "postAnswerExplanation": "INR uzaması ve hepatik ensefalopati ayırıcıdır; parasetamol toksisitesi gibi nedenlerde antidot ve transplant değerlendirmesi zaman kritiktir.",
    "postAnswerExpandedExplanation": "INR uzaması ve hepatik ensefalopati ayırıcıdır; parasetamol toksisitesi gibi nedenlerde antidot ve transplant değerlendirmesi zaman kritiktir.",
    "tusPearl": "Akut hepatit + INR uzaması + ensefalopati = akut karaciğer yetmezliği.",
    "differentialPoint": "",
    "clinicalRelevance": "Akut hepatit + INR uzaması + ensefalopati = akut karaciğer yetmezliği.",
    "mechanism": "",
    "relatedBranches": [
      "gastroenterology",
      "surgery",
      "emergency"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Akut karaciğer yetmezliği",
      "fulminan hepatik yetmezlik"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 0,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-akut-mezenterik-iskemi",
    "term": "Akut mezenterik iskemi",
    "aliases": [
      "Akut mezenterik iskemi",
      "mezenter iskemi",
      "mesenteric ischemia"
    ],
    "normalizedTerm": "akut mezenterik iskemi",
    "TurkishName": "Akut mezenterik iskemi",
    "EnglishName": "",
    "category": "Majör hastalık / genel cerrahi acil",
    "subcategory": "genel cerrahi acil",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Bağırsak perfüzyonunun akut bozulduğu ve acil tanı gerektiren karın ağrısı nedenidir.",
    "preAnswerSafeDefinition": "Bağırsak perfüzyonunun akut bozulduğu ve acil tanı gerektiren karın ağrısı nedenidir.",
    "shortDefinition": "Bağırsak kan akımının akut azalması sonucu gelişen, erken dönemde bulguları sinsi ama mortalitesi yüksek iskemik tablodur.",
    "definition": "Bağırsak kan akımının akut azalması sonucu gelişen, erken dönemde bulguları sinsi ama mortalitesi yüksek iskemik tablodur.",
    "detailedExplanation": "Muayene bulgusuna göre orantısız şiddetli karın ağrısı, atriyal fibrilasyon öyküsü veya laktat artışı ipucudur; gecikirse transmural nekroz ve perforasyon gelişir.",
    "postAnswerExplanation": "Muayene bulgusuna göre orantısız şiddetli karın ağrısı, atriyal fibrilasyon öyküsü veya laktat artışı ipucudur; gecikirse transmural nekroz ve perforasyon gelişir.",
    "postAnswerExpandedExplanation": "Muayene bulgusuna göre orantısız şiddetli karın ağrısı, atriyal fibrilasyon öyküsü veya laktat artışı ipucudur; gecikirse transmural nekroz ve perforasyon gelişir.",
    "tusPearl": "Orantısız karın ağrısı + AF/emboli riski = akut mezenterik iskemi.",
    "differentialPoint": "",
    "clinicalRelevance": "Orantısız karın ağrısı + AF/emboli riski = akut mezenterik iskemi.",
    "mechanism": "",
    "relatedBranches": [
      "surgery",
      "emergency"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Akut mezenterik iskemi",
      "mezenter iskemi",
      "mesenteric ischemia"
    ],
    "sourceTextExamples": [
      "Akut mezenter iskemi şüphesinde en uygun tanısal görüntülemeyi seçebilme",
      "Atriyal fibrilasyonu olan hastada ani başlayan, fizik muayene bulgularına göre orantısız şiddetli karın ağrısı ve laktat yüksekliği akut mezenter iskemi şüphesini doğurur."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 43,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-alkol-dehidrogenaz-inhibisyonu",
    "term": "Alkol dehidrogenaz inhibisyonu",
    "aliases": [
      "Alkol dehidrogenaz inhibisyonu"
    ],
    "normalizedTerm": "alkol dehidrogenaz inhibisyonu",
    "TurkishName": "Alkol dehidrogenaz inhibisyonu",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": ", metanolün formik asit gibi toksik metabolitlere dönüşmesini engellediği için fomepizolün temel mekanizmasıdır.",
    "definition": ", metanolün formik asit gibi toksik metabolitlere dönüşmesini engellediği için fomepizolün temel mekanizmasıdır.",
    "detailedExplanation": "Alkol dehidrogenaz inhibisyonu, metanolün formik asit gibi toksik metabolitlere dönüşmesini engellediği için fomepizolün temel mekanizmasıdır. Kaynağı belirsiz alkol alımı sonrası görme bozukluğu, yüksek anyon açıklı metabolik asidoz ve artmış osmolar açıklık metanol zehirlenmesini düşündürür. Fomepizol, alkol dehidrogenazı inhibe ederek metanolün toksik metabolitleri olan formaldehit ve formik aside dönüşmesini...",
    "postAnswerExplanation": "Alkol dehidrogenaz inhibisyonu, metanolün formik asit gibi toksik metabolitlere dönüşmesini engellediği için fomepizolün temel mekanizmasıdır. Kaynağı belirsiz alkol alımı sonrası görme bozukluğu, yüksek anyon açıklı metabolik asidoz ve artmış osmolar açıklık metanol zehirlenmesini düşündürür. Fomepizol, alkol dehidrogenazı inhibe ederek metanolün toksik metabolitleri olan formaldehit ve formik aside dönüşmesini...",
    "postAnswerExpandedExplanation": "Alkol dehidrogenaz inhibisyonu, metanolün formik asit gibi toksik metabolitlere dönüşmesini engellediği için fomepizolün temel mekanizmasıdır. Kaynağı belirsiz alkol alımı sonrası görme bozukluğu, yüksek anyon açıklı metabolik asidoz ve artmış osmolar açıklık metanol zehirlenmesini düşündürür. Fomepizol, alkol dehidrogenazı inhibe ederek metanolün toksik metabolitleri olan formaldehit ve formik aside dönüşmesini...",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P0",
    "answerLeakRisk": "low",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Alkol dehidrogenaz inhibisyonu"
    ],
    "sourceTextExamples": [
      "Alkol dehidrogenaz inhibisyonu, metanolün formik asit gibi toksik metabolitlere dönüşmesini engellediği için fomepizolün temel mekanizmasıdır.",
      "Alkol dehidrogenaz inhibisyonu, metanolün formik asit gibi toksik metabolitlere dönüşmesini engellediği için fomepizolün temel mekanizmasıdır."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot feedback içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-asit-sivisi-pmn-esigi",
    "term": "Asit sıvısı PMN eşiği",
    "aliases": [
      "Asit sıvısı PMN eşiği"
    ],
    "normalizedTerm": "asit sivisi pmn esigi",
    "TurkishName": "Asit sıvısı PMN eşiği",
    "EnglishName": "",
    "category": "İç Hastalıkları / Klinik Karar",
    "subcategory": "Tanısal test / karar eşiği",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Asit sıvısında nötrofil eşiğiyle enfeksiyon olasılığını değerlendiren klinik karar noktasıdır.",
    "preAnswerSafeDefinition": "Asit sıvısında nötrofil eşiğiyle enfeksiyon olasılığını değerlendiren klinik karar noktasıdır.",
    "shortDefinition": "Asit sıvısında PMN sayısının 250/mm3 ve üzerinde olması spontan bakteriyel peritonit lehine kritik tanısal eşiği ifade eder.",
    "definition": "Asit sıvısında PMN sayısının 250/mm3 ve üzerinde olması spontan bakteriyel peritonit lehine kritik tanısal eşiği ifade eder.",
    "detailedExplanation": "Sirozlu hastada ateş, karın ağrısı veya ensefalopati varsa parasentez yapılır; PMN >=250/mm3 ise kültür beklenmeden tedavi başlanır.",
    "postAnswerExplanation": "Sirozlu hastada ateş, karın ağrısı veya ensefalopati varsa parasentez yapılır; PMN >=250/mm3 ise kültür beklenmeden tedavi başlanır.",
    "postAnswerExpandedExplanation": "Sirozlu hastada ateş, karın ağrısı veya ensefalopati varsa parasentez yapılır; PMN >=250/mm3 ise kültür beklenmeden tedavi başlanır.",
    "tusPearl": "Asit PMN >=250/mm3 = SBP düşün, antibiyotiği geciktirme.",
    "differentialPoint": "Benzer semptom yapan durumdan farkı, spesifik mekanizma/laboratuvar paterninin birlikte verilmesidir.",
    "clinicalRelevance": "Asit PMN >=250/mm3 = SBP düşün, antibiyotiği geciktirme.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P0",
    "answerLeakRisk": "low",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "Asit sıvısı PMN eşiği"
    ],
    "sourceTextExamples": [
      "Asit sıvısı PMN eşiği",
      "Asit sıvısı PMN eşiği"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve i̇ç hastalıkları / klinik karar bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-aclik-sonrasi-hipoglisemik-atak",
    "term": "Açlık sonrası hipoglisemik atak",
    "aliases": [
      "Açlık sonrası hipoglisemik atak"
    ],
    "normalizedTerm": "aclik sonrasi hipoglisemik atak",
    "TurkishName": "Açlık sonrası hipoglisemik atak",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Uzun açlık veya enfeksiyon sonrası gelişen hipoketotik hipoglisemi ve orta zincirli açil-karnitin artışı MCAD eksikliğini düşündürür.",
    "definition": "Uzun açlık veya enfeksiyon sonrası gelişen hipoketotik hipoglisemi ve orta zincirli açil-karnitin artışı MCAD eksikliğini düşündürür.",
    "detailedExplanation": "Açlık sonrası hipoglisemik atak Uzun açlık veya enfeksiyon sonrası gelişen hipoketotik hipoglisemi ve orta zincirli açil-karnitin artışı MCAD eksikliğini düşündürür. Orta zincirli yağ asitlerinin beta-oksidasyonu bozulduğunda açlıkta enerji ve asetil-CoA üretimi azalır; ketogenez yetersiz kalır ve glukoneogenez desteklenemez.",
    "postAnswerExplanation": "Açlık sonrası hipoglisemik atak Uzun açlık veya enfeksiyon sonrası gelişen hipoketotik hipoglisemi ve orta zincirli açil-karnitin artışı MCAD eksikliğini düşündürür. Orta zincirli yağ asitlerinin beta-oksidasyonu bozulduğunda açlıkta enerji ve asetil-CoA üretimi azalır; ketogenez yetersiz kalır ve glukoneogenez desteklenemez.",
    "postAnswerExpandedExplanation": "Açlık sonrası hipoglisemik atak Uzun açlık veya enfeksiyon sonrası gelişen hipoketotik hipoglisemi ve orta zincirli açil-karnitin artışı MCAD eksikliğini düşündürür. Orta zincirli yağ asitlerinin beta-oksidasyonu bozulduğunda açlıkta enerji ve asetil-CoA üretimi azalır; ketogenez yetersiz kalır ve glukoneogenez desteklenemez.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [
      "hipoglisemi"
    ],
    "safeNestedTerms": [
      "hipoglisemi"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "low",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Açlık sonrası hipoglisemik atak",
      "hipoglisemi"
    ],
    "sourceTextExamples": [
      "Açlık sonrası hipoglisemik atak",
      "Açlık sonrası hipoglisemik atak"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-cha2ds2-vasc-skoru",
    "term": "CHA2DS2-VASc skoru",
    "aliases": [
      "CHA2DS2-VASc skoru"
    ],
    "normalizedTerm": "cha2ds2-vasc skoru",
    "TurkishName": "CHA2DS2-VASc skoru",
    "EnglishName": "",
    "category": "İç Hastalıkları / Klinik Karar",
    "subcategory": "Tanısal test / karar eşiği",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Atriyal fibrilasyonda inme riskini ve antikoagülasyon gerekliliğini değerlendiren skordur.",
    "preAnswerSafeDefinition": "Atriyal fibrilasyonda inme riskini ve antikoagülasyon gerekliliğini değerlendiren skordur.",
    "shortDefinition": "CHA2DS2-VASc, atriyal fibrilasyonda tromboembolik inme riskini tahmin ederek antikoagülasyon kararını yönlendiren skordur.",
    "definition": "CHA2DS2-VASc, atriyal fibrilasyonda tromboembolik inme riskini tahmin ederek antikoagülasyon kararını yönlendiren skordur.",
    "detailedExplanation": "Skor; kalp yetmezliği, hipertansiyon, yaş, diyabet, inme/TIA, damar hastalığı ve cinsiyet faktörlerini birlikte değerlendirir.",
    "postAnswerExplanation": "Skor; kalp yetmezliği, hipertansiyon, yaş, diyabet, inme/TIA, damar hastalığı ve cinsiyet faktörlerini birlikte değerlendirir.",
    "postAnswerExpandedExplanation": "Skor; kalp yetmezliği, hipertansiyon, yaş, diyabet, inme/TIA, damar hastalığı ve cinsiyet faktörlerini birlikte değerlendirir.",
    "tusPearl": "AF sorusunda “antikoagülasyon gerekir mi?” sorusu çoğu kez CHA2DS2-VASc ile çözülür.",
    "differentialPoint": "Benzer semptom yapan durumdan farkı, spesifik mekanizma/laboratuvar paterninin birlikte verilmesidir.",
    "clinicalRelevance": "AF sorusunda “antikoagülasyon gerekir mi?” sorusu çoğu kez CHA2DS2-VASc ile çözülür.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P0",
    "answerLeakRisk": "low",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "CHA2DS2-VASc skoru"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve i̇ç hastalıkları / klinik karar bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-derin-ven-trombozu",
    "term": "Derin ven trombozu",
    "aliases": [
      "Derin ven trombozu"
    ],
    "normalizedTerm": "derin ven trombozu",
    "TurkishName": "Derin ven trombozu",
    "EnglishName": "",
    "category": "Majör hastalık / vasküler hastalık",
    "subcategory": "vasküler hastalık",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Bacakta venöz tromboz gelişmesini ifade eden klinik kavramdır.",
    "preAnswerSafeDefinition": "Bacakta venöz tromboz gelişmesini ifade eden klinik kavramdır.",
    "shortDefinition": "Derin venlerde trombüs oluşumudur ve pulmoner embolinin önemli kaynağıdır.",
    "definition": "Derin venlerde trombüs oluşumudur ve pulmoner embolinin önemli kaynağıdır.",
    "detailedExplanation": "Tek taraflı bacak şişliği-ağrısı, immobilizasyon, kanser, gebelik veya cerrahi öyküsü DVT lehinedir; risk, PE’ye embolizasyon olasılığı nedeniyle önemlidir.",
    "postAnswerExplanation": "Tek taraflı bacak şişliği-ağrısı, immobilizasyon, kanser, gebelik veya cerrahi öyküsü DVT lehinedir; risk, PE’ye embolizasyon olasılığı nedeniyle önemlidir.",
    "postAnswerExpandedExplanation": "Tek taraflı bacak şişliği-ağrısı, immobilizasyon, kanser, gebelik veya cerrahi öyküsü DVT lehinedir; risk, PE’ye embolizasyon olasılığı nedeniyle önemlidir.",
    "tusPearl": "DVT + dispne/göğüs ağrısı gelişirse PE düşün.",
    "differentialPoint": "",
    "clinicalRelevance": "DVT + dispne/göğüs ağrısı gelişirse PE düşün.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Derin ven trombozu"
    ],
    "sourceTextExamples": [
      "Ailesi, hastanın okul başarısında zorlandığını ve son yıllarda boyunun akranlarına göre belirgin uzadığını belirtiyor. Daha önce travma olmadan derin ven trombozu geçirdiği öğreniliyor.",
      "Ailesi, hastanın okul başarısında zorlandığını ve son yıllarda boyunun akranlarına göre belirgin uzadığını belirtiyor. Daha önce travma olmadan derin ven trombozu geçirdiği öğreniliyor."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 34,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "promoteRelatedTermToEntry",
      "existingGlossaryStatus": "relatedOrNestedOnly",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Terim relatedTerms/safeNestedTerms içinde yakalanmış; fakat kullanıcı tooltipte doğrudan öğrenebileceği bağımsız kavram hâline getirilmeli.",
      "droppedAliases": [
        {
          "alias": "DVT",
          "reason": "unsafe-short-or-low-signal-alias"
        }
      ]
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-distributif-sok",
    "term": "Distributif şok",
    "aliases": [
      "Distributif şok",
      "distributive shock"
    ],
    "normalizedTerm": "distributif sok",
    "TurkishName": "Distributif şok",
    "EnglishName": "",
    "category": "Majör hastalık / hemodinami",
    "subcategory": "hemodinami",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Periferik vasküler tonusun azalmasına bağlı dolaşım yetmezliği paternidir.",
    "preAnswerSafeDefinition": "Periferik vasküler tonusun azalmasına bağlı dolaşım yetmezliği paternidir.",
    "shortDefinition": "Sistemik vazodilatasyon ve göreceli damar içi hacim yetersizliğiyle gelişen şok tipidir.",
    "definition": "Sistemik vazodilatasyon ve göreceli damar içi hacim yetersizliğiyle gelişen şok tipidir.",
    "detailedExplanation": "Sepsis, anafilaksi ve nörojenik şok distributif şok başlıklarıdır; periferik direnç düşer, tedavi nedene göre antibiyotik/epinefrin/sıvı-vazopressör şeklinde değişir.",
    "postAnswerExplanation": "Sepsis, anafilaksi ve nörojenik şok distributif şok başlıklarıdır; periferik direnç düşer, tedavi nedene göre antibiyotik/epinefrin/sıvı-vazopressör şeklinde değişir.",
    "postAnswerExpandedExplanation": "Sepsis, anafilaksi ve nörojenik şok distributif şok başlıklarıdır; periferik direnç düşer, tedavi nedene göre antibiyotik/epinefrin/sıvı-vazopressör şeklinde değişir.",
    "tusPearl": "Sıcak ekstremite + hipotansiyon = distributif şok olasılığını artırır.",
    "differentialPoint": "",
    "clinicalRelevance": "Sıcak ekstremite + hipotansiyon = distributif şok olasılığını artırır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Distributif şok",
      "distributive shock"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 0,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-ehec-tedavi-tuzagi",
    "term": "EHEC tedavi tuzağı",
    "aliases": [
      "EHEC tedavi tuzağı"
    ],
    "normalizedTerm": "ehec tedavi tuzagi",
    "TurkishName": "EHEC tedavi tuzağı",
    "EnglishName": "",
    "category": "Mikrobiyoloji / Enfeksiyon",
    "subcategory": "Tedavi kararı",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Kanlı ishal + HUS riski bağlamında tedaviyi dikkatli seçtiren EHEC paternidir.",
    "preAnswerSafeDefinition": "Kanlı ishal + HUS riski bağlamında tedaviyi dikkatli seçtiren EHEC paternidir.",
    "shortDefinition": "EHEC enfeksiyonunda antibiyotik ve antimotilite kullanımı Shiga toksin salınımı/HUS riskini artırabileceği için sınav tuzağıdır.",
    "definition": "EHEC enfeksiyonunda antibiyotik ve antimotilite kullanımı Shiga toksin salınımı/HUS riskini artırabileceği için sınav tuzağıdır.",
    "detailedExplanation": "EHEC’de destek tedavisi esastır; antibiyotik verilmesi her zaman doğru değildir ve HUS riskini artırma mantığıyla çeldirici olur.",
    "postAnswerExplanation": "EHEC’de destek tedavisi esastır; antibiyotik verilmesi her zaman doğru değildir ve HUS riskini artırma mantığıyla çeldirici olur.",
    "postAnswerExpandedExplanation": "EHEC’de destek tedavisi esastır; antibiyotik verilmesi her zaman doğru değildir ve HUS riskini artırma mantığıyla çeldirici olur.",
    "tusPearl": "EHEC + kanlı ishal sorusunda antibiyotik refleksi tehlikeli çeldiricidir.",
    "differentialPoint": "Benzer semptom yapan durumdan farkı, spesifik mekanizma/laboratuvar paterninin birlikte verilmesidir.",
    "clinicalRelevance": "EHEC + kanlı ishal sorusunda antibiyotik refleksi tehlikeli çeldiricidir.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology",
      "pharmacology"
    ],
    "relatedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "safeNestedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "low",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "EHEC tedavi tuzağı",
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve mikrobiyoloji / enfeksiyon bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-femoral-kilif",
    "term": "Femoral kılıf",
    "aliases": [
      "Femoral kılıf"
    ],
    "normalizedTerm": "femoral kilif",
    "TurkishName": "Femoral kılıf",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "İnguinal ligamentin altında ve pubik tüberkülün lateralinde yerleşen ağrılı, redükte edilemeyen kitle femoral herniyi düşündürür.",
    "definition": "İnguinal ligamentin altında ve pubik tüberkülün lateralinde yerleşen ağrılı, redükte edilemeyen kitle femoral herniyi düşündürür.",
    "detailedExplanation": "İnguinal ligamentin altında ve pubik tüberkülün lateralinde yerleşen ağrılı, redükte edilemeyen kitle femoral herniyi düşündürür. Femoral kanal femoral kılıfın medial kompartmanıdır; kanalın lateralinde femoral ven bulunur. Dar femoral halka nedeniyle strangülasyon riski yüksektir. İnguinal ligamentin altında ve pubik tüberkülün lateralinde yerleşen ağrılı, redükte edilemeyen kitle femoral herniyi düşündürür....",
    "postAnswerExplanation": "İnguinal ligamentin altında ve pubik tüberkülün lateralinde yerleşen ağrılı, redükte edilemeyen kitle femoral herniyi düşündürür. Femoral kanal femoral kılıfın medial kompartmanıdır; kanalın lateralinde femoral ven bulunur. Dar femoral halka nedeniyle strangülasyon riski yüksektir. İnguinal ligamentin altında ve pubik tüberkülün lateralinde yerleşen ağrılı, redükte edilemeyen kitle femoral herniyi düşündürür....",
    "postAnswerExpandedExplanation": "İnguinal ligamentin altında ve pubik tüberkülün lateralinde yerleşen ağrılı, redükte edilemeyen kitle femoral herniyi düşündürür. Femoral kanal femoral kılıfın medial kompartmanıdır; kanalın lateralinde femoral ven bulunur. Dar femoral halka nedeniyle strangülasyon riski yüksektir. İnguinal ligamentin altında ve pubik tüberkülün lateralinde yerleşen ağrılı, redükte edilemeyen kitle femoral herniyi düşündürür....",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "safeNestedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "low",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Femoral kılıf",
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "sourceTextExamples": [
      "İnguinal ligamentin altında ve pubik tüberkülün lateralinde yerleşen ağrılı, redükte edilemeyen kitle femoral herniyi düşündürür. Femoral kanal femoral kılıfın medial kompartmanıdır; kanalın lateralinde femoral ven bulunur.",
      "İnguinal ligamentin altında ve pubik tüberkülün lateralinde yerleşen ağrılı, redükte edilemeyen kitle femoral herniyi düşündürür. Femoral kanal femoral kılıfın medial kompartmanıdır; kanalın lateralinde femoral ven bulunur."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 49,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-fournier-gangreni",
    "term": "Fournier gangreni",
    "aliases": [
      "Fournier gangreni"
    ],
    "normalizedTerm": "fournier gangreni",
    "TurkishName": "Fournier gangreni",
    "EnglishName": "",
    "category": "Majör hastalık / cerrahi-enfeksiyon acili",
    "subcategory": "cerrahi-enfeksiyon acili",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Genital/perineal nekrotizan yumuşak doku enfeksiyonunu ifade eder.",
    "preAnswerSafeDefinition": "Genital/perineal nekrotizan yumuşak doku enfeksiyonunu ifade eder.",
    "shortDefinition": "Perineal-genital bölgede gelişen nekrotizan fasiit formudur.",
    "definition": "Perineal-genital bölgede gelişen nekrotizan fasiit formudur.",
    "detailedExplanation": "Diyabetik veya immünsüprese hastada perineal ağrı, toksisite ve krepitasyon varsa acil geniş debridman ve geniş spektrumlu antibiyotik gerekir.",
    "postAnswerExplanation": "Diyabetik veya immünsüprese hastada perineal ağrı, toksisite ve krepitasyon varsa acil geniş debridman ve geniş spektrumlu antibiyotik gerekir.",
    "postAnswerExpandedExplanation": "Diyabetik veya immünsüprese hastada perineal ağrı, toksisite ve krepitasyon varsa acil geniş debridman ve geniş spektrumlu antibiyotik gerekir.",
    "tusPearl": "Perineal nekrotizan enfeksiyon = Fournier; tedavi acil debridmandır.",
    "differentialPoint": "",
    "clinicalRelevance": "Perineal nekrotizan enfeksiyon = Fournier; tedavi acil debridmandır.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology",
      "surgery",
      "emergency"
    ],
    "relatedTerms": [
      "Etken",
      "Tanı testi",
      "Ampirik tedavi"
    ],
    "safeNestedTerms": [
      "Etken",
      "Tanı testi",
      "Ampirik tedavi"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Fournier gangreni",
      "Etken",
      "Tanı testi",
      "Ampirik tedavi"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 3,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-hbv-pencere-donemi-serolojisi",
    "term": "HBV pencere dönemi serolojisi",
    "aliases": [
      "HBV pencere dönemi serolojisi"
    ],
    "normalizedTerm": "hbv pencere donemi serolojisi",
    "TurkishName": "HBV pencere dönemi serolojisi",
    "EnglishName": "",
    "category": "Mikrobiyoloji / Enfeksiyon",
    "subcategory": "Seroloji / otoantikor",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "HBsAg ve anti-HBs negatifken anti-HBc IgM pozitifliği akut HBV lehinedir.",
    "preAnswerSafeDefinition": "HBsAg ve anti-HBs negatifken anti-HBc IgM pozitifliği akut HBV lehinedir.",
    "shortDefinition": "HBV pencere dönemi, HBsAg kaybolup anti-HBs henüz oluşmadan anti-HBc IgM pozitifliğinin tanısal olduğu ara dönemdir.",
    "definition": "HBV pencere dönemi, HBsAg kaybolup anti-HBs henüz oluşmadan anti-HBc IgM pozitifliğinin tanısal olduğu ara dönemdir.",
    "detailedExplanation": "HBV sorularında pencere dönemi, yanlışlıkla “geçirilmiş enfeksiyon” sanılmamalıdır; aktif/akut enfeksiyonu yakalayan belirteç anti-HBc IgM’dir.",
    "postAnswerExplanation": "HBV sorularında pencere dönemi, yanlışlıkla “geçirilmiş enfeksiyon” sanılmamalıdır; aktif/akut enfeksiyonu yakalayan belirteç anti-HBc IgM’dir.",
    "postAnswerExpandedExplanation": "HBV sorularında pencere dönemi, yanlışlıkla “geçirilmiş enfeksiyon” sanılmamalıdır; aktif/akut enfeksiyonu yakalayan belirteç anti-HBc IgM’dir.",
    "tusPearl": "HBsAg(-), anti-HBs(-), anti-HBc IgM(+) = pencere dönemi.",
    "differentialPoint": "Benzer semptom yapan durumdan farkı, spesifik mekanizma/laboratuvar paterninin birlikte verilmesidir.",
    "clinicalRelevance": "HBsAg(-), anti-HBs(-), anti-HBc IgM(+) = pencere dönemi.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "seroloji"
    ],
    "safeNestedTerms": [
      "seroloji"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "low",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "HBV pencere dönemi serolojisi",
      "seroloji"
    ],
    "sourceTextExamples": [
      "HBV serolojisinde pencere dönemi, yüzey antijeninin saptanamaz hâle geldiği ancak koruyucu anti-HBs antikorunun henüz ölçülebilir düzeye ulaşmadığı aralıktır. Bu aralıkta HBsAg negatif, anti-HBs negatif olabilir; bu nedenle bu iki belirtece bakmak tanıyı kaçırabilir.",
      "HBV serolojisinde pencere dönemi, yüzey antijeninin saptanamaz hâle geldiği ancak koruyucu anti-HBs antikorunun henüz ölçülebilir düzeye ulaşmadığı aralıktır. Bu aralıkta HBsAg negatif, anti-HBs negatif olabilir; bu nedenle bu iki belirtece bakmak tanıyı kaçırabilir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 4,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve mikrobiyoloji / enfeksiyon bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-koryoamniyonit-yaklasimi",
    "term": "Koryoamniyonit yaklaşımı",
    "aliases": [
      "Koryoamniyonit yaklaşımı"
    ],
    "normalizedTerm": "koryoamniyonit yaklasimi",
    "TurkishName": "Koryoamniyonit yaklaşımı",
    "EnglishName": "",
    "category": "Kadın Hastalıkları ve Doğum",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Gebelik veya jinekolojik klinik karar bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Gebelik veya jinekolojik klinik karar bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Koryoamniyonit maternal ve fetal enfeksiyon riskini artırır; gebeliği sürdürmek uygun değildir.",
    "definition": "Koryoamniyonit maternal ve fetal enfeksiyon riskini artırır; gebeliği sürdürmek uygun değildir.",
    "detailedExplanation": "Koryoamniyonit yaklaşımı Koryoamniyonit maternal ve fetal enfeksiyon riskini artırır; gebeliği sürdürmek uygun değildir.",
    "postAnswerExplanation": "Koryoamniyonit yaklaşımı Koryoamniyonit maternal ve fetal enfeksiyon riskini artırır; gebeliği sürdürmek uygun değildir.",
    "postAnswerExpandedExplanation": "Koryoamniyonit yaklaşımı Koryoamniyonit maternal ve fetal enfeksiyon riskini artırır; gebeliği sürdürmek uygun değildir.",
    "tusPearl": "Kadın doğum sorularında gebelik haftası, kanama tipi, enfeksiyon bulgusu ve fetal risk yönetimi birlikte değerlendirilir.",
    "differentialPoint": "Ayırıcı nokta, stabilite, gebelik haftası, kanama/ağrı karakteri ve anne-fetus önceliğidir.",
    "clinicalRelevance": "Kadın doğum sorularında gebelik haftası, kanama tipi, enfeksiyon bulgusu ve fetal risk yönetimi birlikte değerlendirilir.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Koryoamniyonit yaklaşımı"
    ],
    "sourceTextExamples": [
      "Koryoamniyonit yaklaşımı",
      "Koryoamniyonit yaklaşımı"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve kadın hastalıkları ve doğum bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-kritik-aort-koarktasyonu",
    "term": "Kritik aort koarktasyonu",
    "aliases": [
      "Kritik aort koarktasyonu"
    ],
    "normalizedTerm": "kritik aort koarktasyonu",
    "TurkishName": "Kritik aort koarktasyonu",
    "EnglishName": "",
    "category": "Pediatri",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Pediatrik yaş grubunda kullanılan klinik tanı veya yönetim paternidir.",
    "preAnswerSafeDefinition": "Pediatrik yaş grubunda kullanılan klinik tanı veya yönetim paternidir.",
    "shortDefinition": "Duktus kapanması sonrası alt vücut perfüzyonu bozulur.",
    "definition": "Duktus kapanması sonrası alt vücut perfüzyonu bozulur.",
    "detailedExplanation": "Kritik aort koarktasyonu Duktus kapanması sonrası alt vücut perfüzyonu bozulur.",
    "postAnswerExplanation": "Kritik aort koarktasyonu Duktus kapanması sonrası alt vücut perfüzyonu bozulur.",
    "postAnswerExpandedExplanation": "Kritik aort koarktasyonu Duktus kapanması sonrası alt vücut perfüzyonu bozulur.",
    "tusPearl": "Pediatride yaş, doğum öyküsü, beslenme, aşı/immünite ve acil solunum-dolaşım riski soruyu belirler.",
    "differentialPoint": "Erişkin yaklaşımından farkı yaşa özgü eşikler, congenital nedenler ve hızlı kötüleşme riskidir.",
    "clinicalRelevance": "Pediatride yaş, doğum öyküsü, beslenme, aşı/immünite ve acil solunum-dolaşım riski soruyu belirler.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedTerms": [
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "safeNestedTerms": [
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "low",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Kritik aort koarktasyonu",
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "sourceTextExamples": [
      "Kritik aort koarktasyonu",
      "Kritik aort koarktasyonu."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 3,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve pediatri bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-linezolid-iliskili-trombositopeni-ve-serotonin-sendromu-riski",
    "term": "Linezolid ilişkili trombositopeni ve serotonin sendromu riski",
    "aliases": [
      "Linezolid ilişkili trombositopeni ve serotonin sendromu riski"
    ],
    "normalizedTerm": "linezolid iliskili trombositopeni ve serotonin sendromu riski",
    "TurkishName": "Linezolid ilişkili trombositopeni ve serotonin sendromu riski",
    "EnglishName": "",
    "category": "Farmakoloji / Tedavi / Toksikoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "preAnswerSafeDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "shortDefinition": "Linezolid protein sentezinin erken basamağını inhibe eder ve uzun kullanımda kemik iliği baskılanması, özellikle trombositopeni yapabilir.",
    "definition": "Linezolid protein sentezinin erken basamağını inhibe eder ve uzun kullanımda kemik iliği baskılanması, özellikle trombositopeni yapabilir.",
    "detailedExplanation": "Linezolid protein sentezinin erken basamağını inhibe eder ve uzun kullanımda kemik iliği baskılanması, özellikle trombositopeni yapabilir. DNA giraz/topoizomeraz inhibisyonu florokinolonların mekanizmasıdır; bu nedenle linezolid için yanlış eşleştirmedir. Linezolid oksazolidinon grubu olup 50S ribozomal alt birim üzerinden başlangıç kompleksinin oluşumunu engeller; DNA giraz inhibisyonu florokinolonlara aittir. DNA...",
    "postAnswerExplanation": "Linezolid protein sentezinin erken basamağını inhibe eder ve uzun kullanımda kemik iliği baskılanması, özellikle trombositopeni yapabilir. DNA giraz/topoizomeraz inhibisyonu florokinolonların mekanizmasıdır; bu nedenle linezolid için yanlış eşleştirmedir. Linezolid oksazolidinon grubu olup 50S ribozomal alt birim üzerinden başlangıç kompleksinin oluşumunu engeller; DNA giraz inhibisyonu florokinolonlara aittir. DNA...",
    "postAnswerExpandedExplanation": "Linezolid protein sentezinin erken basamağını inhibe eder ve uzun kullanımda kemik iliği baskılanması, özellikle trombositopeni yapabilir. DNA giraz/topoizomeraz inhibisyonu florokinolonların mekanizmasıdır; bu nedenle linezolid için yanlış eşleştirmedir. Linezolid oksazolidinon grubu olup 50S ribozomal alt birim üzerinden başlangıç kompleksinin oluşumunu engeller; DNA giraz inhibisyonu florokinolonlara aittir. DNA...",
    "tusPearl": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "differentialPoint": "Benzer ilaçlardan ayrım, etki hedefi ve spesifik toksisite/antidot ilişkisidir.",
    "clinicalRelevance": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology"
    ],
    "relatedTerms": [
      "yan etki",
      "antidot"
    ],
    "safeNestedTerms": [
      "yan etki",
      "antidot"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "low",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Linezolid ilişkili trombositopeni ve serotonin sendromu riski",
      "yan etki",
      "antidot"
    ],
    "sourceTextExamples": [
      "Linezolid protein sentezinin erken basamağını inhibe eder ve uzun kullanımda kemik iliği baskılanması, özellikle trombositopeni yapabilir. DNA giraz/topoizomeraz inhibisyonu florokinolonların mekanizmasıdır; bu nedenle linezolid için yanlış eşleştirmedir.",
      "Linezolid = 50S başlangıç kompleksi inhibisyonu + trombositopeni + serotonin sendromu riski; DNA giraz florokinolon ipucudur."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve farmakoloji / tedavi / toksikoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-masif-hemotoraks",
    "term": "Masif hemotoraks",
    "aliases": [
      "Masif hemotoraks"
    ],
    "normalizedTerm": "masif hemotoraks",
    "TurkishName": "Masif hemotoraks",
    "EnglishName": "",
    "category": "Cerrahi / Acil",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Cerrahi aciliyet veya girişim planlamasıyla ilişkili güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Cerrahi aciliyet veya girişim planlamasıyla ilişkili güvenli bir kavramdır.",
    "shortDefinition": "Masif veya devam eden kanama büyük damar ya da akciğer yaralanmasını düşündürür.",
    "definition": "Masif veya devam eden kanama büyük damar ya da akciğer yaralanmasını düşündürür.",
    "detailedExplanation": "Masif hemotoraks Masif veya devam eden kanama büyük damar ya da akciğer yaralanmasını düşündürür.",
    "postAnswerExplanation": "Masif hemotoraks Masif veya devam eden kanama büyük damar ya da akciğer yaralanmasını düşündürür.",
    "postAnswerExpandedExplanation": "Masif hemotoraks Masif veya devam eden kanama büyük damar ya da akciğer yaralanmasını düşündürür.",
    "tusPearl": "Cerrahi sorularda peritonit, iskemi, kanama, hava yolu/solunum ve hemodinamik instabilite karar önceliğini değiştirir.",
    "differentialPoint": "Ayırıcı nokta, konservatif izlem mi yoksa acil girişim mi gerektiğidir.",
    "clinicalRelevance": "Cerrahi sorularda peritonit, iskemi, kanama, hava yolu/solunum ve hemodinamik instabilite karar önceliğini değiştirir.",
    "mechanism": "",
    "relatedBranches": [
      "surgery",
      "emergency"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P0",
    "answerLeakRisk": "low",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Masif hemotoraks"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 3,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve cerrahi / acil bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-miksodem-komasi",
    "term": "Miksödem koması",
    "aliases": [
      "Miksödem koması",
      "myxedema coma"
    ],
    "normalizedTerm": "miksodem komasi",
    "TurkishName": "Miksödem koması",
    "EnglishName": "",
    "category": "Majör hastalık / endokrin acil",
    "subcategory": "endokrin acil",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "İleri hipotiroidi zemininde metabolik yavaşlama ve bilinç bozukluğu yapan kritik tablodur.",
    "preAnswerSafeDefinition": "İleri hipotiroidi zemininde metabolik yavaşlama ve bilinç bozukluğu yapan kritik tablodur.",
    "shortDefinition": "Ağır hipotiroidinin hipotermi, bradikardi, hipoventilasyon ve bilinç bozukluğuyla seyreden acil formudur.",
    "definition": "Ağır hipotiroidinin hipotermi, bradikardi, hipoventilasyon ve bilinç bozukluğuyla seyreden acil formudur.",
    "detailedExplanation": "Hipotermi, hiponatremi, hipoventilasyon ve bradikardi birlikteyse sepsis veya ilaç intoksikasyonu yanında miksödem koması düşünülmelidir; stres doz steroid de akılda tutulur.",
    "postAnswerExplanation": "Hipotermi, hiponatremi, hipoventilasyon ve bradikardi birlikteyse sepsis veya ilaç intoksikasyonu yanında miksödem koması düşünülmelidir; stres doz steroid de akılda tutulur.",
    "postAnswerExpandedExplanation": "Hipotermi, hiponatremi, hipoventilasyon ve bradikardi birlikteyse sepsis veya ilaç intoksikasyonu yanında miksödem koması düşünülmelidir; stres doz steroid de akılda tutulur.",
    "tusPearl": "Hipotiroidi + hipotermi + bradikardi + bilinç bozukluğu = miksödem koması.",
    "differentialPoint": "",
    "clinicalRelevance": "Hipotiroidi + hipotermi + bradikardi + bilinç bozukluğu = miksödem koması.",
    "mechanism": "",
    "relatedBranches": [
      "endocrinology",
      "surgery",
      "emergency"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Miksödem koması",
      "myxedema coma"
    ],
    "sourceTextExamples": [
      "Hipotiroidide miksödem koması"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 4,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-obstruktif-sok",
    "term": "Obstrüktif şok",
    "aliases": [
      "Obstrüktif şok",
      "obstructive shock"
    ],
    "normalizedTerm": "obstruktif sok",
    "TurkishName": "Obstrüktif şok",
    "EnglishName": "",
    "category": "Majör hastalık / hemodinami",
    "subcategory": "hemodinami",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Dolaşımın mekanik engel nedeniyle bozulduğu şok paternidir.",
    "preAnswerSafeDefinition": "Dolaşımın mekanik engel nedeniyle bozulduğu şok paternidir.",
    "shortDefinition": "Kalp dolumunu veya çıkışını mekanik olarak engelleyen nedenlerle gelişen şok tipidir.",
    "definition": "Kalp dolumunu veya çıkışını mekanik olarak engelleyen nedenlerle gelişen şok tipidir.",
    "detailedExplanation": "Tansiyon pnömotoraks, kardiyak tamponad ve masif pulmoner emboli klasik nedenlerdir; sıvı/vasopressör tek başına engeli ortadan kaldırmaz.",
    "postAnswerExplanation": "Tansiyon pnömotoraks, kardiyak tamponad ve masif pulmoner emboli klasik nedenlerdir; sıvı/vasopressör tek başına engeli ortadan kaldırmaz.",
    "postAnswerExpandedExplanation": "Tansiyon pnömotoraks, kardiyak tamponad ve masif pulmoner emboli klasik nedenlerdir; sıvı/vasopressör tek başına engeli ortadan kaldırmaz.",
    "tusPearl": "Şok + mekanik engel bulgusu = tamponad/PE/tansiyon pnömotoraksı dışla.",
    "differentialPoint": "",
    "clinicalRelevance": "Şok + mekanik engel bulgusu = tamponad/PE/tansiyon pnömotoraksı dışla.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Obstrüktif şok",
      "obstructive shock"
    ],
    "sourceTextExamples": [
      "Oral antibiyotik travmaya bağlı akut hava kaçağı ve obstrüktif şok fizyolojisini tedavi etmez.",
      "Oral antibiyotik travmaya bağlı akut hava kaçağı ve obstrüktif şok fizyolojisini tedavi etmez."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 27,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-ovaryan-torsiyon",
    "term": "Ovaryan torsiyon",
    "aliases": [
      "Ovaryan torsiyon",
      "over torsiyonu",
      "adnexal torsiyon"
    ],
    "normalizedTerm": "ovaryan torsiyon",
    "TurkishName": "Ovaryan torsiyon",
    "EnglishName": "",
    "category": "Majör hastalık / jinekolojik acil",
    "subcategory": "jinekolojik acil",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Ani unilateral pelvik ağrı ve bulantı-kusma ile giden jinekolojik iskemi acilidir.",
    "preAnswerSafeDefinition": "Ani unilateral pelvik ağrı ve bulantı-kusma ile giden jinekolojik iskemi acilidir.",
    "shortDefinition": "Overin vasküler pedikülü etrafında dönerek venöz/arteriyel akımı bozmasıdır.",
    "definition": "Overin vasküler pedikülü etrafında dönerek venöz/arteriyel akımı bozmasıdır.",
    "detailedExplanation": "Doppler akım normal olsa bile torsiyon dışlanmaz; klinik şüphe yüksekse cerrahi değerlendirme gerekir.",
    "postAnswerExplanation": "Doppler akım normal olsa bile torsiyon dışlanmaz; klinik şüphe yüksekse cerrahi değerlendirme gerekir.",
    "postAnswerExpandedExplanation": "Doppler akım normal olsa bile torsiyon dışlanmaz; klinik şüphe yüksekse cerrahi değerlendirme gerekir.",
    "tusPearl": "Ani tek taraflı pelvik ağrı + over kisti/gebelik = torsiyon düşün.",
    "differentialPoint": "",
    "clinicalRelevance": "Ani tek taraflı pelvik ağrı + over kisti/gebelik = torsiyon düşün.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology",
      "surgery",
      "emergency"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Ovaryan torsiyon",
      "over torsiyonu",
      "adnexal torsiyon"
    ],
    "sourceTextExamples": [
      "Over torsiyonunda ani pelvik ağrı ve Doppler bulgularıyla acil cerrahi yaklaşımı seçebilme",
      "Over torsiyonunu destekler."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 43,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-pprom-yonetimi",
    "term": "PPROM yönetimi",
    "aliases": [
      "PPROM yönetimi"
    ],
    "normalizedTerm": "pprom yonetimi",
    "TurkishName": "PPROM yönetimi",
    "EnglishName": "",
    "category": "Kadın Hastalıkları ve Doğum",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Gebelik veya jinekolojik klinik karar bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Gebelik veya jinekolojik klinik karar bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Histerektomi PPROM yönetiminde yeri olmayan radikal bir işlemdir.",
    "definition": "Histerektomi PPROM yönetiminde yeri olmayan radikal bir işlemdir.",
    "detailedExplanation": "Histerektomi PPROM yönetiminde yeri olmayan radikal bir işlemdir. 31. haftada preterm erken membran rüptürü olan ve enfeksiyon-fetal distres bulgusu olmayan hastada bekleme yaklaşımı uygulanır. Yatış, antenatal kortikosteroid, latans antibiyotiği ve anne-fetus izlemi gerekir; dijital muayeneden kaçınılır.",
    "postAnswerExplanation": "Histerektomi PPROM yönetiminde yeri olmayan radikal bir işlemdir. 31. haftada preterm erken membran rüptürü olan ve enfeksiyon-fetal distres bulgusu olmayan hastada bekleme yaklaşımı uygulanır. Yatış, antenatal kortikosteroid, latans antibiyotiği ve anne-fetus izlemi gerekir; dijital muayeneden kaçınılır.",
    "postAnswerExpandedExplanation": "Histerektomi PPROM yönetiminde yeri olmayan radikal bir işlemdir. 31. haftada preterm erken membran rüptürü olan ve enfeksiyon-fetal distres bulgusu olmayan hastada bekleme yaklaşımı uygulanır. Yatış, antenatal kortikosteroid, latans antibiyotiği ve anne-fetus izlemi gerekir; dijital muayeneden kaçınılır.",
    "tusPearl": "Kadın doğum sorularında gebelik haftası, kanama tipi, enfeksiyon bulgusu ve fetal risk yönetimi birlikte değerlendirilir.",
    "differentialPoint": "Ayırıcı nokta, stabilite, gebelik haftası, kanama/ağrı karakteri ve anne-fetus önceliğidir.",
    "clinicalRelevance": "Kadın doğum sorularında gebelik haftası, kanama tipi, enfeksiyon bulgusu ve fetal risk yönetimi birlikte değerlendirilir.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "PPROM yönetimi"
    ],
    "sourceTextExamples": [
      "Histerektomi PPROM yönetiminde yeri olmayan radikal bir işlemdir.",
      "Histerektomi PPROM yönetiminde yeri olmayan radikal bir işlemdir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 4,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot feedback içinde geçiyor ve kadın hastalıkları ve doğum bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-parkland-formulu",
    "term": "Parkland formülü",
    "aliases": [
      "Parkland formülü"
    ],
    "normalizedTerm": "parkland formulu",
    "TurkishName": "Parkland formülü",
    "EnglishName": "",
    "category": "Cerrahi / Acil",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Cerrahi aciliyet veya girişim planlamasıyla ilişkili güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Cerrahi aciliyet veya girişim planlamasıyla ilişkili güvenli bir kavramdır.",
    "shortDefinition": "Kristalloid gereksinimi vücut ağırlığı ve yanık yüzdesine göre hesaplanır.",
    "definition": "Kristalloid gereksinimi vücut ağırlığı ve yanık yüzdesine göre hesaplanır.",
    "detailedExplanation": "Parkland formülü. Kristalloid gereksinimi vücut ağırlığı ve yanık yüzdesine göre hesaplanır.",
    "postAnswerExplanation": "Parkland formülü. Kristalloid gereksinimi vücut ağırlığı ve yanık yüzdesine göre hesaplanır.",
    "postAnswerExpandedExplanation": "Parkland formülü. Kristalloid gereksinimi vücut ağırlığı ve yanık yüzdesine göre hesaplanır.",
    "tusPearl": "Cerrahi sorularda peritonit, iskemi, kanama, hava yolu/solunum ve hemodinamik instabilite karar önceliğini değiştirir.",
    "differentialPoint": "Ayırıcı nokta, konservatif izlem mi yoksa acil girişim mi gerektiğidir.",
    "clinicalRelevance": "Cerrahi sorularda peritonit, iskemi, kanama, hava yolu/solunum ve hemodinamik instabilite karar önceliğini değiştirir.",
    "mechanism": "",
    "relatedBranches": [
      "surgery",
      "emergency"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P0",
    "answerLeakRisk": "low",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Parkland formülü"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve cerrahi / acil bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-perfore-viskus",
    "term": "Perfore viskus",
    "aliases": [
      "Perfore viskus",
      "viskus perforasyonu",
      "içi boş organ perforasyonu"
    ],
    "normalizedTerm": "perfore viskus",
    "TurkishName": "Perfore viskus",
    "EnglishName": "",
    "category": "Majör hastalık / genel cerrahi acil",
    "subcategory": "genel cerrahi acil",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "İçi boş organ delinmesine bağlı akut peritonit tablosunu ifade eder.",
    "preAnswerSafeDefinition": "İçi boş organ delinmesine bağlı akut peritonit tablosunu ifade eder.",
    "shortDefinition": "Mide, bağırsak veya başka içi boş organ duvarının delinerek periton boşluğuna içerik kaçırmasıdır.",
    "definition": "Mide, bağırsak veya başka içi boş organ duvarının delinerek periton boşluğuna içerik kaçırmasıdır.",
    "detailedExplanation": "Ani başlayan şiddetli karın ağrısı, defans/rijidite ve ayakta direkt grafide diyafram altı serbest hava perforasyon lehinedir; konservatif yaklaşım çoğu ağır tabloda yeterli değildir.",
    "postAnswerExplanation": "Ani başlayan şiddetli karın ağrısı, defans/rijidite ve ayakta direkt grafide diyafram altı serbest hava perforasyon lehinedir; konservatif yaklaşım çoğu ağır tabloda yeterli değildir.",
    "postAnswerExpandedExplanation": "Ani başlayan şiddetli karın ağrısı, defans/rijidite ve ayakta direkt grafide diyafram altı serbest hava perforasyon lehinedir; konservatif yaklaşım çoğu ağır tabloda yeterli değildir.",
    "tusPearl": "Akut batın + serbest hava = perfore viskus.",
    "differentialPoint": "",
    "clinicalRelevance": "Akut batın + serbest hava = perfore viskus.",
    "mechanism": "",
    "relatedBranches": [
      "surgery",
      "emergency"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Perfore viskus",
      "viskus perforasyonu",
      "içi boş organ perforasyonu"
    ],
    "sourceTextExamples": [
      "Tahta karın ve serbest hava içi boş organ perforasyonudur; acil cerrahi gerekir.",
      "Tahta karın ve serbest hava içi boş organ perforasyonudur; acil cerrahi gerekir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 5,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-plasenta-akreata-spektrumu",
    "term": "Plasenta akreata spektrumu",
    "aliases": [
      "Plasenta akreata spektrumu"
    ],
    "normalizedTerm": "plasenta akreata spektrumu",
    "TurkishName": "Plasenta akreata spektrumu",
    "EnglishName": "",
    "category": "Kadın Hastalıkları ve Doğum",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Gebelik veya jinekolojik klinik karar bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Gebelik veya jinekolojik klinik karar bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Uterin skar alanında desidua bozukluğu plasentanın invaziv tutunmasına yol açabilir.",
    "definition": "Uterin skar alanında desidua bozukluğu plasentanın invaziv tutunmasına yol açabilir.",
    "detailedExplanation": "Plasenta akreata spektrumu. Uterin skar alanında desidua bozukluğu plasentanın invaziv tutunmasına yol açabilir.",
    "postAnswerExplanation": "Plasenta akreata spektrumu. Uterin skar alanında desidua bozukluğu plasentanın invaziv tutunmasına yol açabilir.",
    "postAnswerExpandedExplanation": "Plasenta akreata spektrumu. Uterin skar alanında desidua bozukluğu plasentanın invaziv tutunmasına yol açabilir.",
    "tusPearl": "Kadın doğum sorularında gebelik haftası, kanama tipi, enfeksiyon bulgusu ve fetal risk yönetimi birlikte değerlendirilir.",
    "differentialPoint": "Ayırıcı nokta, stabilite, gebelik haftası, kanama/ağrı karakteri ve anne-fetus önceliğidir.",
    "clinicalRelevance": "Kadın doğum sorularında gebelik haftası, kanama tipi, enfeksiyon bulgusu ve fetal risk yönetimi birlikte değerlendirilir.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P0",
    "answerLeakRisk": "low",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Plasenta akreata spektrumu"
    ],
    "sourceTextExamples": [
      "Plasenta akreata spektrumu.",
      "Plasenta akreata spektrumu."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve kadın hastalıkları ve doğum bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-popliteal-arter-yaralanmasi",
    "term": "Popliteal arter yaralanması",
    "aliases": [
      "Popliteal arter yaralanması"
    ],
    "normalizedTerm": "popliteal arter yaralanmasi",
    "TurkishName": "Popliteal arter yaralanması",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Anatomik ilişki",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Popliteal arter diz arkasında sabit seyri nedeniyle diz çıkıklarında gerilme ve yırtılma riski taşır.",
    "definition": "Popliteal arter diz arkasında sabit seyri nedeniyle diz çıkıklarında gerilme ve yırtılma riski taşır.",
    "detailedExplanation": "Popliteal arter yaralanması Popliteal arter diz arkasında sabit seyri nedeniyle diz çıkıklarında gerilme ve yırtılma riski taşır.",
    "postAnswerExplanation": "Popliteal arter yaralanması Popliteal arter diz arkasında sabit seyri nedeniyle diz çıkıklarında gerilme ve yırtılma riski taşır.",
    "postAnswerExpandedExplanation": "Popliteal arter yaralanması Popliteal arter diz arkasında sabit seyri nedeniyle diz çıkıklarında gerilme ve yırtılma riski taşır.",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "safeNestedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "low",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Popliteal arter yaralanması",
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "sourceTextExamples": [
      "Popliteal arter yaralanması",
      "Popliteal arter yaralanması."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 3,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-postpartum-kanama",
    "term": "Postpartum kanama",
    "aliases": [
      "Postpartum kanama",
      "doğum sonu kanama",
      "postpartum hemoraji"
    ],
    "normalizedTerm": "postpartum kanama",
    "TurkishName": "Postpartum kanama",
    "EnglishName": "",
    "category": "Majör hastalık / obstetrik acil",
    "subcategory": "obstetrik acil",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Doğum sonrası aşırı kanama ve hemodinamik bozulma riskini ifade eder.",
    "preAnswerSafeDefinition": "Doğum sonrası aşırı kanama ve hemodinamik bozulma riskini ifade eder.",
    "shortDefinition": "Doğumdan sonra aşırı kan kaybıyla seyreden ve maternal mortalitenin önemli nedenlerinden biri olan obstetrik acildir.",
    "definition": "Doğumdan sonra aşırı kan kaybıyla seyreden ve maternal mortalitenin önemli nedenlerinden biri olan obstetrik acildir.",
    "detailedExplanation": "En sık neden uterin atonidir; ilk yaklaşım uterin masaj ve oksitosindir, yanıt yoksa balon tamponad/cerrahi seçenekler düşünülür.",
    "postAnswerExplanation": "En sık neden uterin atonidir; ilk yaklaşım uterin masaj ve oksitosindir, yanıt yoksa balon tamponad/cerrahi seçenekler düşünülür.",
    "postAnswerExpandedExplanation": "En sık neden uterin atonidir; ilk yaklaşım uterin masaj ve oksitosindir, yanıt yoksa balon tamponad/cerrahi seçenekler düşünülür.",
    "tusPearl": "Postpartum kanama sorusunda önce uterin atoni ve oksitosin-masaj sırası sorgulanır.",
    "differentialPoint": "",
    "clinicalRelevance": "Postpartum kanama sorusunda önce uterin atoni ve oksitosin-masaj sırası sorgulanır.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology",
      "surgery",
      "emergency"
    ],
    "relatedTerms": [
      "Hipovolemik şok",
      "Hemodinamik stabilizasyon",
      "Transfüzyon",
      "Koagülopati"
    ],
    "safeNestedTerms": [
      "Hipovolemik şok",
      "Hemodinamik stabilizasyon",
      "Transfüzyon",
      "Koagülopati"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Postpartum kanama",
      "doğum sonu kanama",
      "postpartum hemoraji",
      "Hipovolemik şok",
      "Hemodinamik stabilizasyon",
      "Transfüzyon",
      "Koagülopati"
    ],
    "sourceTextExamples": [
      "Postpartum kanamada uterin atoniye yönelik ilk tedavi basamağını seçebilme",
      "Postpartum kanamada gevşek ve yumuşak uterus varsa ilk yaklaşım uterin masaj ve oksitosindir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 29,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "promoteRelatedTermToEntry",
      "existingGlossaryStatus": "relatedOrNestedOnly",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Terim relatedTerms/safeNestedTerms içinde yakalanmış; fakat kullanıcı tooltipte doğrudan öğrenebileceği bağımsız kavram hâline getirilmeli.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-pterion-travmasi",
    "term": "Pterion travması",
    "aliases": [
      "Pterion travması"
    ],
    "normalizedTerm": "pterion travmasi",
    "TurkishName": "Pterion travması",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Sinus sagittalis superior venöz sinüstür ve orta hatta seyreder; pterion travmasıyla ilişkili tipik damar değildir.",
    "definition": "Sinus sagittalis superior venöz sinüstür ve orta hatta seyreder; pterion travmasıyla ilişkili tipik damar değildir.",
    "detailedExplanation": "Sinus sagittalis superior venöz sinüstür ve orta hatta seyreder; pterion travmasıyla ilişkili tipik damar değildir. Pterion bölgesi ince kemik yapısı nedeniyle travmada kırılabilir ve hemen altında seyreden arteria meningea media yaralanabilir. Arteriyel kanama dura ile kafatası arasında bikonveks epidural hematom oluşturur.",
    "postAnswerExplanation": "Sinus sagittalis superior venöz sinüstür ve orta hatta seyreder; pterion travmasıyla ilişkili tipik damar değildir. Pterion bölgesi ince kemik yapısı nedeniyle travmada kırılabilir ve hemen altında seyreden arteria meningea media yaralanabilir. Arteriyel kanama dura ile kafatası arasında bikonveks epidural hematom oluşturur.",
    "postAnswerExpandedExplanation": "Sinus sagittalis superior venöz sinüstür ve orta hatta seyreder; pterion travmasıyla ilişkili tipik damar değildir. Pterion bölgesi ince kemik yapısı nedeniyle travmada kırılabilir ve hemen altında seyreden arteria meningea media yaralanabilir. Arteriyel kanama dura ile kafatası arasında bikonveks epidural hematom oluşturur.",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "safeNestedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "low",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Pterion travması",
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "sourceTextExamples": [
      "Sinus sagittalis superior venöz sinüstür ve orta hatta seyreder; pterion travmasıyla ilişkili tipik damar değildir.",
      "Sinus sagittalis superior venöz sinüstür ve orta hatta seyreder; pterion travmasıyla ilişkili tipik damar değildir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 3,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot feedback içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-sglt2-inhibitoru-riski",
    "term": "SGLT2 inhibitörü riski",
    "aliases": [
      "SGLT2 inhibitörü riski"
    ],
    "normalizedTerm": "sglt2 inhibitoru riski",
    "TurkishName": "SGLT2 inhibitörü riski",
    "EnglishName": "",
    "category": "Farmakoloji / Tedavi / Toksikoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "SGLT2 inhibitörleriyle ilişkili ketoasidoz riskini anlatan farmakolojik güvenlik paternidir.",
    "preAnswerSafeDefinition": "SGLT2 inhibitörleriyle ilişkili ketoasidoz riskini anlatan farmakolojik güvenlik paternidir.",
    "shortDefinition": "SGLT2 inhibitörleri glukozüri ve ketogenez eğilimi üzerinden öglisemik diyabetik ketoasidoz riskini artırabilir.",
    "definition": "SGLT2 inhibitörleri glukozüri ve ketogenez eğilimi üzerinden öglisemik diyabetik ketoasidoz riskini artırabilir.",
    "detailedExplanation": "Glukoz çok yüksek görünmese bile ketonemi/asidoz varsa SGLT2 inhibitörü kullanan hastada öglisemik DKA düşünülmelidir.",
    "postAnswerExplanation": "Glukoz çok yüksek görünmese bile ketonemi/asidoz varsa SGLT2 inhibitörü kullanan hastada öglisemik DKA düşünülmelidir.",
    "postAnswerExpandedExplanation": "Glukoz çok yüksek görünmese bile ketonemi/asidoz varsa SGLT2 inhibitörü kullanan hastada öglisemik DKA düşünülmelidir.",
    "tusPearl": "SGLT2 + asidoz/keton = glukoz normal olsa bile DKA dışlanmaz.",
    "differentialPoint": "Benzer semptom yapan durumdan farkı, spesifik mekanizma/laboratuvar paterninin birlikte verilmesidir.",
    "clinicalRelevance": "SGLT2 + asidoz/keton = glukoz normal olsa bile DKA dışlanmaz.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology"
    ],
    "relatedTerms": [
      "yan etki",
      "antidot"
    ],
    "safeNestedTerms": [
      "yan etki",
      "antidot"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "low",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "SGLT2 inhibitörü riski",
      "yan etki",
      "antidot"
    ],
    "sourceTextExamples": [
      "SGLT2 inhibitörü riski",
      "SGLT2 inhibitörü riski"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve farmakoloji / tedavi / toksikoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-solunum-yetmezligi",
    "term": "Solunum yetmezliği",
    "aliases": [
      "Solunum yetmezliği",
      "respiratuvar yetmezlik",
      "respiratory failure"
    ],
    "normalizedTerm": "solunum yetmezligi",
    "TurkishName": "Solunum yetmezliği",
    "EnglishName": "",
    "category": "Majör hastalık / acil",
    "subcategory": "acil",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Gaz değişiminin bozulduğunu gösteren üst klinik kavramdır.",
    "preAnswerSafeDefinition": "Gaz değişiminin bozulduğunu gösteren üst klinik kavramdır.",
    "shortDefinition": "Oksijenlenme veya karbondioksit atılımının yetersiz kaldığı klinik tablodur.",
    "definition": "Oksijenlenme veya karbondioksit atılımının yetersiz kaldığı klinik tablodur.",
    "detailedExplanation": "Tip 1 hipoksemik yetmezlikte PaO2 düşer; Tip 2 hiperkapnik yetmezlikte PaCO2 yükselir. Bu ayrım oksijen, ventilasyon ve altta yatan neden yaklaşımını değiştirir.",
    "postAnswerExplanation": "Tip 1 hipoksemik yetmezlikte PaO2 düşer; Tip 2 hiperkapnik yetmezlikte PaCO2 yükselir. Bu ayrım oksijen, ventilasyon ve altta yatan neden yaklaşımını değiştirir.",
    "postAnswerExpandedExplanation": "Tip 1 hipoksemik yetmezlikte PaO2 düşer; Tip 2 hiperkapnik yetmezlikte PaCO2 yükselir. Bu ayrım oksijen, ventilasyon ve altta yatan neden yaklaşımını değiştirir.",
    "tusPearl": "PaO2 düşük = oksijenlenme; PaCO2 yüksek = ventilasyon problemi düşün.",
    "differentialPoint": "",
    "clinicalRelevance": "PaO2 düşük = oksijenlenme; PaCO2 yüksek = ventilasyon problemi düşün.",
    "mechanism": "",
    "relatedBranches": [
      "surgery",
      "emergency"
    ],
    "relatedTerms": [
      "PaO2",
      "PaCO2",
      "Hipoksemi",
      "Ventilasyon"
    ],
    "safeNestedTerms": [
      "PaO2",
      "PaCO2",
      "Hipoksemi",
      "Ventilasyon"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Solunum yetmezliği",
      "respiratuvar yetmezlik",
      "respiratory failure",
      "PaO2",
      "PaCO2",
      "Hipoksemi",
      "Ventilasyon"
    ],
    "sourceTextExamples": [
      "Antibiyotik bakteriyel enfeksiyon kanıtı yoksa rutin değildir; bronkodilatör tedavinin geciktirilmesi solunum yetmezliği riskini artırır.",
      "Antibiyotik bakteriyel enfeksiyon kanıtı yoksa rutin değildir; bronkodilatör tedavinin geciktirilmesi solunum yetmezliği riskini artırır."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 15,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-staphylococcus-aureus-toksik-sok-sendromu",
    "term": "Staphylococcus aureus toksik şok sendromu",
    "aliases": [
      "Staphylococcus aureus toksik şok sendromu"
    ],
    "normalizedTerm": "staphylococcus aureus toksik sok sendromu",
    "TurkishName": "Staphylococcus aureus toksik şok sendromu",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "TSST-1 süperantijen gibi davranır ve yaygın sitokin salınımı oluşturur.",
    "definition": "TSST-1 süperantijen gibi davranır ve yaygın sitokin salınımı oluşturur.",
    "detailedExplanation": "Staphylococcus aureus toksik şok sendromu. TSST-1 süperantijen gibi davranır ve yaygın sitokin salınımı oluşturur.",
    "postAnswerExplanation": "Staphylococcus aureus toksik şok sendromu. TSST-1 süperantijen gibi davranır ve yaygın sitokin salınımı oluşturur.",
    "postAnswerExpandedExplanation": "Staphylococcus aureus toksik şok sendromu. TSST-1 süperantijen gibi davranır ve yaygın sitokin salınımı oluşturur.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [
      "şok"
    ],
    "safeNestedTerms": [
      "şok"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "low",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Staphylococcus aureus toksik şok sendromu",
      "şok"
    ],
    "sourceTextExamples": [
      "Staphylococcus aureus toksik şok sendromu.",
      "Staphylococcus aureus toksik şok sendromu."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-trali",
    "term": "TRALI",
    "aliases": [
      "TRALI"
    ],
    "normalizedTerm": "trali",
    "TurkishName": "TRALI",
    "EnglishName": "",
    "category": "İç Hastalıkları / Klinik Karar",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Transfüzyon sonrası akut solunum yetmezliği yapan nonkardiyojenik akciğer hasarıdır.",
    "preAnswerSafeDefinition": "Transfüzyon sonrası akut solunum yetmezliği yapan nonkardiyojenik akciğer hasarıdır.",
    "shortDefinition": "TRALI, transfüzyondan sonraki ilk saatlerde gelişen akut hipoksemi ve nonkardiyojenik pulmoner ödem tablosudur.",
    "definition": "TRALI, transfüzyondan sonraki ilk saatlerde gelişen akut hipoksemi ve nonkardiyojenik pulmoner ödem tablosudur.",
    "detailedExplanation": "TACO’dan farklı olarak primer problem hacim yükü değil, donör antikorları ve inflamatuvar akciğer hasarıdır.",
    "postAnswerExplanation": "TACO’dan farklı olarak primer problem hacim yükü değil, donör antikorları ve inflamatuvar akciğer hasarıdır.",
    "postAnswerExpandedExplanation": "TACO’dan farklı olarak primer problem hacim yükü değil, donör antikorları ve inflamatuvar akciğer hasarıdır.",
    "tusPearl": "Transfüzyon + akut hipoksemi + pulmoner infiltrasyon = TRALI/TACO ayrımı sorulur.",
    "differentialPoint": "Benzer semptom yapan durumdan farkı, spesifik mekanizma/laboratuvar paterninin birlikte verilmesidir.",
    "clinicalRelevance": "Transfüzyon + akut hipoksemi + pulmoner infiltrasyon = TRALI/TACO ayrımı sorulur.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P0",
    "answerLeakRisk": "low",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "TRALI"
    ],
    "sourceTextExamples": [
      "Protamin sülfat heparini nötralize eder; parasetamol kaynaklı hepatoselüler hasarı önlemez.",
      "Protamin sülfat heparini nötralize eder; parasetamol kaynaklı hepatoselüler hasarı önlemez."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 59,
      "confidenceScore": "high",
      "ambiguityRisk": "medium",
      "answerLeakRisk": "low",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot feedback içinde geçiyor ve i̇ç hastalıkları / klinik karar bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-terapotik-hipotermi",
    "term": "Terapötik hipotermi",
    "aliases": [
      "Terapötik hipotermi"
    ],
    "normalizedTerm": "terapotik hipotermi",
    "TurkishName": "Terapötik hipotermi",
    "EnglishName": "",
    "category": "Pediatri",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Pediatrik yaş grubunda kullanılan klinik tanı veya yönetim paternidir.",
    "preAnswerSafeDefinition": "Pediatrik yaş grubunda kullanılan klinik tanı veya yönetim paternidir.",
    "shortDefinition": "Pediatrik yaş grubunda kullanılan klinik tanı veya yönetim paternidir.",
    "definition": "Pediatrik yaş grubunda kullanılan klinik tanı veya yönetim paternidir.",
    "detailedExplanation": "İlk 6 saat içinde terapötik hipotermi. Uygun term veya near-term yenidoğanda perinatal asfiksi sonrası orta-ağır HİE saptanırsa nöroprotektif hipotermi zaman penceresi kaçırılmamalıdır.",
    "postAnswerExplanation": "İlk 6 saat içinde terapötik hipotermi. Uygun term veya near-term yenidoğanda perinatal asfiksi sonrası orta-ağır HİE saptanırsa nöroprotektif hipotermi zaman penceresi kaçırılmamalıdır.",
    "postAnswerExpandedExplanation": "İlk 6 saat içinde terapötik hipotermi. Uygun term veya near-term yenidoğanda perinatal asfiksi sonrası orta-ağır HİE saptanırsa nöroprotektif hipotermi zaman penceresi kaçırılmamalıdır.",
    "tusPearl": "Pediatride yaş, doğum öyküsü, beslenme, aşı/immünite ve acil solunum-dolaşım riski soruyu belirler.",
    "differentialPoint": "Erişkin yaklaşımından farkı yaşa özgü eşikler, congenital nedenler ve hızlı kötüleşme riskidir.",
    "clinicalRelevance": "Pediatride yaş, doğum öyküsü, beslenme, aşı/immünite ve acil solunum-dolaşım riski soruyu belirler.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedTerms": [
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "safeNestedTerms": [
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "low",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Terapötik hipotermi",
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "sourceTextExamples": [
      "İlk 6 saat içinde terapötik hipotermi.",
      "Terapötik hipotermi için kritik başlangıç penceresi kaç saattir?"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve pediatri bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-tiroid-firtinasi",
    "term": "Tiroid fırtınası",
    "aliases": [
      "Tiroid fırtınası",
      "thyroid storm",
      "tirotoksik kriz"
    ],
    "normalizedTerm": "tiroid firtinasi",
    "TurkishName": "Tiroid fırtınası",
    "EnglishName": "",
    "category": "Majör hastalık / endokrin acil",
    "subcategory": "endokrin acil",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Ağır hipertiroidi bulgularının sistemik dekompansasyonla birleştiği acil tablodur.",
    "preAnswerSafeDefinition": "Ağır hipertiroidi bulgularının sistemik dekompansasyonla birleştiği acil tablodur.",
    "shortDefinition": "Ağır tirotoksikozun ateş, taşikardi, ajitasyon ve organ disfonksiyonuyla seyreden yaşamı tehdit eden formudur.",
    "definition": "Ağır tirotoksikozun ateş, taşikardi, ajitasyon ve organ disfonksiyonuyla seyreden yaşamı tehdit eden formudur.",
    "detailedExplanation": "Tedavi sırası önemlidir: beta bloker, tionamid, ardından iyot ve destek tedavisi; iyot tionamidden önce verilirse hormon sentezi için substrat sağlayabilir.",
    "postAnswerExplanation": "Tedavi sırası önemlidir: beta bloker, tionamid, ardından iyot ve destek tedavisi; iyot tionamidden önce verilirse hormon sentezi için substrat sağlayabilir.",
    "postAnswerExpandedExplanation": "Tedavi sırası önemlidir: beta bloker, tionamid, ardından iyot ve destek tedavisi; iyot tionamidden önce verilirse hormon sentezi için substrat sağlayabilir.",
    "tusPearl": "Hipertiroidi + ateş + belirgin taşikardi/ajitasyon = tiroid fırtınası; tedavi sırası sorulur.",
    "differentialPoint": "",
    "clinicalRelevance": "Hipertiroidi + ateş + belirgin taşikardi/ajitasyon = tiroid fırtınası; tedavi sırası sorulur.",
    "mechanism": "",
    "relatedBranches": [
      "endocrinology",
      "surgery",
      "emergency"
    ],
    "relatedTerms": [
      "TSH",
      "T4",
      "Beta bloker",
      "Tionamid"
    ],
    "safeNestedTerms": [
      "TSH",
      "T4",
      "Beta bloker",
      "Tionamid"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Tiroid fırtınası",
      "thyroid storm",
      "tirotoksik kriz",
      "TSH",
      "T4",
      "Beta bloker",
      "Tionamid"
    ],
    "sourceTextExamples": [
      "Tiroid fırtınasında antitiroid ilaç olarak PTU’nun ek avantajı nedir?"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 6,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-yabanci-cisim-aspirasyonu",
    "term": "Yabancı cisim aspirasyonu",
    "aliases": [
      "Yabancı cisim aspirasyonu"
    ],
    "normalizedTerm": "yabanci cisim aspirasyonu",
    "TurkishName": "Yabancı cisim aspirasyonu",
    "EnglishName": "",
    "category": "Pediatri",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Pediatrik yaş grubunda kullanılan klinik tanı veya yönetim paternidir.",
    "preAnswerSafeDefinition": "Pediatrik yaş grubunda kullanılan klinik tanı veya yönetim paternidir.",
    "shortDefinition": "Pediatrik yaş grubunda kullanılan klinik tanı veya yönetim paternidir.",
    "definition": "Pediatrik yaş grubunda kullanılan klinik tanı veya yönetim paternidir.",
    "detailedExplanation": "Çocukta yabancı cisim aspirasyonunda klinik bulgularla uygun tanısal-terapötik yaklaşımı seçebilme Kuruyemiş yerken ani öksürük ve morarma atağı, sonrasında tek taraflı azalmış solunum sesi, lokalize hışıltı ve hava hapsi yabancı cisim aspirasyonunu düşündürür. Şüphe güçlü olduğunda tanısal ve terapötik yaklaşım rijit bronkoskopi ile yabancı cismin çıkarılmasıdır.",
    "postAnswerExplanation": "Çocukta yabancı cisim aspirasyonunda klinik bulgularla uygun tanısal-terapötik yaklaşımı seçebilme Kuruyemiş yerken ani öksürük ve morarma atağı, sonrasında tek taraflı azalmış solunum sesi, lokalize hışıltı ve hava hapsi yabancı cisim aspirasyonunu düşündürür. Şüphe güçlü olduğunda tanısal ve terapötik yaklaşım rijit bronkoskopi ile yabancı cismin çıkarılmasıdır.",
    "postAnswerExpandedExplanation": "Çocukta yabancı cisim aspirasyonunda klinik bulgularla uygun tanısal-terapötik yaklaşımı seçebilme Kuruyemiş yerken ani öksürük ve morarma atağı, sonrasında tek taraflı azalmış solunum sesi, lokalize hışıltı ve hava hapsi yabancı cisim aspirasyonunu düşündürür. Şüphe güçlü olduğunda tanısal ve terapötik yaklaşım rijit bronkoskopi ile yabancı cismin çıkarılmasıdır.",
    "tusPearl": "Pediatride yaş, doğum öyküsü, beslenme, aşı/immünite ve acil solunum-dolaşım riski soruyu belirler.",
    "differentialPoint": "Erişkin yaklaşımından farkı yaşa özgü eşikler, congenital nedenler ve hızlı kötüleşme riskidir.",
    "clinicalRelevance": "Pediatride yaş, doğum öyküsü, beslenme, aşı/immünite ve acil solunum-dolaşım riski soruyu belirler.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedTerms": [
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "safeNestedTerms": [
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "low",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Yabancı cisim aspirasyonu",
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "sourceTextExamples": [
      "Çocukta yabancı cisim aspirasyonunda klinik bulgularla uygun tanısal-terapötik yaklaşımı seçebilme",
      "Kuruyemiş yerken ani öksürük ve morarma atağı, sonrasında tek taraflı azalmış solunum sesi, lokalize hışıltı ve hava hapsi yabancı cisim aspirasyonunu düşündürür. Şüphe güçlü olduğunda tanısal ve terapötik yaklaşım rijit bronkoskopi ile yabancı cismin çıkarılmasıdır."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 33,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve pediatri bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-yuz-venleri-ve-kavernoz-sinus",
    "term": "Yüz venleri ve kavernöz sinüs",
    "aliases": [
      "Yüz venleri ve kavernöz sinüs"
    ],
    "normalizedTerm": "yuz venleri ve kavernoz sinus",
    "TurkishName": "Yüz venleri ve kavernöz sinüs",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Anatomik ilişki",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Kapakçıksız venöz bağlantılar enfeksiyonun retrograd yayılımına izin verebilir.",
    "definition": "Kapakçıksız venöz bağlantılar enfeksiyonun retrograd yayılımına izin verebilir.",
    "detailedExplanation": "Yüz venleri ve kavernöz sinüs Kapakçıksız venöz bağlantılar enfeksiyonun retrograd yayılımına izin verebilir.",
    "postAnswerExplanation": "Yüz venleri ve kavernöz sinüs Kapakçıksız venöz bağlantılar enfeksiyonun retrograd yayılımına izin verebilir.",
    "postAnswerExpandedExplanation": "Yüz venleri ve kavernöz sinüs Kapakçıksız venöz bağlantılar enfeksiyonun retrograd yayılımına izin verebilir.",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "safeNestedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "low",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Yüz venleri ve kavernöz sinüs",
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "sourceTextExamples": [
      "Yüz venleri ve kavernöz sinüs",
      "Kavernöz sinüs patolojisinde nervus abducens etkilenimini göz hareketi bulgusuyla ilişkilendirebilme"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-oglisemik-diyabetik-ketoasidoz",
    "term": "Öglisemik diyabetik ketoasidoz",
    "aliases": [
      "Öglisemik diyabetik ketoasidoz"
    ],
    "normalizedTerm": "oglisemik diyabetik ketoasidoz",
    "TurkishName": "Öglisemik diyabetik ketoasidoz",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "İdrarla glukoz kaybı ve insülin ihtiyacının azalması ketogenezi maskeleyebilir.",
    "definition": "İdrarla glukoz kaybı ve insülin ihtiyacının azalması ketogenezi maskeleyebilir.",
    "detailedExplanation": "Öglisemik diyabetik ketoasidoz. İdrarla glukoz kaybı ve insülin ihtiyacının azalması ketogenezi maskeleyebilir.",
    "postAnswerExplanation": "Öglisemik diyabetik ketoasidoz. İdrarla glukoz kaybı ve insülin ihtiyacının azalması ketogenezi maskeleyebilir.",
    "postAnswerExpandedExplanation": "Öglisemik diyabetik ketoasidoz. İdrarla glukoz kaybı ve insülin ihtiyacının azalması ketogenezi maskeleyebilir.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "endocrinology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P0",
    "answerLeakRisk": "low",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Öglisemik diyabetik ketoasidoz"
    ],
    "sourceTextExamples": [
      "Öglisemik diyabetik ketoasidoz.",
      "Öglisemik diyabetik ketoasidoz."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-inme",
    "term": "İnme",
    "aliases": [
      "İnme",
      "stroke",
      "serebrovasküler olay"
    ],
    "normalizedTerm": "inme",
    "TurkishName": "İnme",
    "EnglishName": "",
    "category": "Majör hastalık / nöroloji",
    "subcategory": "nöroloji",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "İnme; iskemik inme ve hemorajik inme ayrımını başlatan geniş klinik başlıktır.",
    "preAnswerSafeDefinition": "İnme; iskemik inme ve hemorajik inme ayrımını başlatan geniş klinik başlıktır.",
    "shortDefinition": "Ani fokal nörolojik defisit oluşturan beyin damar olaylarını kapsayan üst terimdir.",
    "definition": "Ani fokal nörolojik defisit oluşturan beyin damar olaylarını kapsayan üst terimdir.",
    "detailedExplanation": "Vaka içinde yüz-kol-bacak güçsüzlüğü, afazi, hemianopsi veya ani bilinç değişikliği varsa ilk ayrım kanama mı iskemi mi sorusudur; bu nedenle görüntüleme öncesi trombolitik verilmez.",
    "postAnswerExplanation": "Vaka içinde yüz-kol-bacak güçsüzlüğü, afazi, hemianopsi veya ani bilinç değişikliği varsa ilk ayrım kanama mı iskemi mi sorusudur; bu nedenle görüntüleme öncesi trombolitik verilmez.",
    "postAnswerExpandedExplanation": "Vaka içinde yüz-kol-bacak güçsüzlüğü, afazi, hemianopsi veya ani bilinç değişikliği varsa ilk ayrım kanama mı iskemi mi sorusudur; bu nedenle görüntüleme öncesi trombolitik verilmez.",
    "tusPearl": "Ani fokal defisit + zaman penceresi = önce kontrastsız beyin BT, sonra reperfüzyon uygunluğu.",
    "differentialPoint": "",
    "clinicalRelevance": "Ani fokal defisit + zaman penceresi = önce kontrastsız beyin BT, sonra reperfüzyon uygunluğu.",
    "mechanism": "",
    "relatedBranches": [
      "neurology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 104,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "İnme",
      "stroke",
      "serebrovasküler olay"
    ],
    "sourceTextExamples": [
      "İnme taklitlerinden biri dışlanmıştır.",
      "İnme taklitlerinden biri dışlanmıştır."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 45,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-abo-hemolitik-hastalik",
    "term": "ABO hemolitik hastalık",
    "aliases": [
      "ABO hemolitik hastalık"
    ],
    "normalizedTerm": "abo hemolitik hastalik",
    "TurkishName": "ABO hemolitik hastalık",
    "EnglishName": "",
    "category": "Kadın Hastalıkları ve Doğum",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Gebelik veya jinekolojik klinik karar bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Gebelik veya jinekolojik klinik karar bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Maternal IgG anti-A veya anti-B antikorları yenidoğanda hemoliz yapabilir.",
    "definition": "Maternal IgG anti-A veya anti-B antikorları yenidoğanda hemoliz yapabilir.",
    "detailedExplanation": "ABO hemolitik hastalık Maternal IgG anti-A veya anti-B antikorları yenidoğanda hemoliz yapabilir.",
    "postAnswerExplanation": "ABO hemolitik hastalık Maternal IgG anti-A veya anti-B antikorları yenidoğanda hemoliz yapabilir.",
    "postAnswerExpandedExplanation": "ABO hemolitik hastalık Maternal IgG anti-A veya anti-B antikorları yenidoğanda hemoliz yapabilir.",
    "tusPearl": "Kadın doğum sorularında gebelik haftası, kanama tipi, enfeksiyon bulgusu ve fetal risk yönetimi birlikte değerlendirilir.",
    "differentialPoint": "Ayırıcı nokta, stabilite, gebelik haftası, kanama/ağrı karakteri ve anne-fetus önceliğidir.",
    "clinicalRelevance": "Kadın doğum sorularında gebelik haftası, kanama tipi, enfeksiyon bulgusu ve fetal risk yönetimi birlikte değerlendirilir.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "ABO hemolitik hastalık"
    ],
    "sourceTextExamples": [
      "ABO hemolitik hastalık",
      "ABO hemolitik hastalık"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve kadın hastalıkları ve doğum bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-akalazya-manometrisi",
    "term": "Akalazya manometrisi",
    "aliases": [
      "Akalazya manometrisi"
    ],
    "normalizedTerm": "akalazya manometrisi",
    "TurkishName": "Akalazya manometrisi",
    "EnglishName": "",
    "category": "İç Hastalıkları / Klinik Karar",
    "subcategory": "Tanısal test / karar eşiği",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Akalazyada aperistaltizm ve alt özofagus sfinkter relaksasyon bozukluğu manometride gösterilir.",
    "definition": "Akalazyada aperistaltizm ve alt özofagus sfinkter relaksasyon bozukluğu manometride gösterilir.",
    "detailedExplanation": "Akalazya manometrisi Akalazyada aperistaltizm ve alt özofagus sfinkter relaksasyon bozukluğu manometride gösterilir.",
    "postAnswerExplanation": "Akalazya manometrisi Akalazyada aperistaltizm ve alt özofagus sfinkter relaksasyon bozukluğu manometride gösterilir.",
    "postAnswerExpandedExplanation": "Akalazya manometrisi Akalazyada aperistaltizm ve alt özofagus sfinkter relaksasyon bozukluğu manometride gösterilir.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Akalazya manometrisi"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve i̇ç hastalıkları / klinik karar bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-akut-ekstremite-iskemisi",
    "term": "Akut ekstremite iskemisi",
    "aliases": [
      "Akut ekstremite iskemisi",
      "akut arter tıkanıklığı",
      "acute limb ischemia"
    ],
    "normalizedTerm": "akut ekstremite iskemisi",
    "TurkishName": "Akut ekstremite iskemisi",
    "EnglishName": "",
    "category": "Majör hastalık / vasküler acil",
    "subcategory": "vasküler acil",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Ani ekstremite perfüzyon kaybını ifade eder.",
    "preAnswerSafeDefinition": "Ani ekstremite perfüzyon kaybını ifade eder.",
    "shortDefinition": "Ekstremite arter akımının ani kesilmesiyle gelişen ağrılı iskemi tablosudur.",
    "definition": "Ekstremite arter akımının ani kesilmesiyle gelişen ağrılı iskemi tablosudur.",
    "detailedExplanation": "6P bulguları: pain, pallor, pulselessness, paresthesia, paralysis, poikilothermia; AF embolisi önemli nedendir.",
    "postAnswerExplanation": "6P bulguları: pain, pallor, pulselessness, paresthesia, paralysis, poikilothermia; AF embolisi önemli nedendir.",
    "postAnswerExpandedExplanation": "6P bulguları: pain, pallor, pulselessness, paresthesia, paralysis, poikilothermia; AF embolisi önemli nedendir.",
    "tusPearl": "Ani ağrılı soğuk nabızsız ekstremite = akut arteriyel tıkanıklık.",
    "differentialPoint": "",
    "clinicalRelevance": "Ani ağrılı soğuk nabızsız ekstremite = akut arteriyel tıkanıklık.",
    "mechanism": "",
    "relatedBranches": [
      "surgery",
      "emergency"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Akut ekstremite iskemisi",
      "akut arter tıkanıklığı",
      "acute limb ischemia"
    ],
    "sourceTextExamples": [
      "Akut ekstremite iskemisinde klinik bulgularla acil revaskülarizasyon gereksinimini belirleyebilme",
      "Atriyal fibrilasyonu olan hastada ani başlayan ekstremite ağrısı, solukluk, soğukluk, nabız kaybı, duyu ve motor etkilenme akut ekstremite iskemisini düşündürür."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 21,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-akut-losemi",
    "term": "Akut lösemi",
    "aliases": [
      "Akut lösemi"
    ],
    "normalizedTerm": "akut losemi",
    "TurkishName": "Akut lösemi",
    "EnglishName": "",
    "category": "Majör hastalık / hematoloji",
    "subcategory": "hematoloji",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Blast artışı ve kemik iliği yetmezliğiyle ilişkili hematolojik malignitedir.",
    "preAnswerSafeDefinition": "Blast artışı ve kemik iliği yetmezliğiyle ilişkili hematolojik malignitedir.",
    "shortDefinition": "Kemik iliğinde blast artışıyla seyreden, sitopeni ve enfeksiyon/kanama bulguları yapabilen malign hematolojik hastalıktır.",
    "definition": "Kemik iliğinde blast artışıyla seyreden, sitopeni ve enfeksiyon/kanama bulguları yapabilen malign hematolojik hastalıktır.",
    "detailedExplanation": "Ateş, enfeksiyon, kanama, anemi ve blast görülmesi akut lösemi düşündürür; kronik lösemiden daha hızlı ve ağır seyirlidir.",
    "postAnswerExplanation": "Ateş, enfeksiyon, kanama, anemi ve blast görülmesi akut lösemi düşündürür; kronik lösemiden daha hızlı ve ağır seyirlidir.",
    "postAnswerExpandedExplanation": "Ateş, enfeksiyon, kanama, anemi ve blast görülmesi akut lösemi düşündürür; kronik lösemiden daha hızlı ve ağır seyirlidir.",
    "tusPearl": "Blast + pansitopeni = akut lösemi olasılığını artırır.",
    "differentialPoint": "",
    "clinicalRelevance": "Blast + pansitopeni = akut lösemi olasılığını artırır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Akut lösemi"
    ],
    "sourceTextExamples": [
      "Akut lösemi açısından uyarıcıdır.",
      "Akut lösemi açısından uyarıcıdır."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 6,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-akut-miyeloid-losemi",
    "term": "Akut miyeloid lösemi",
    "aliases": [
      "Akut miyeloid lösemi"
    ],
    "normalizedTerm": "akut miyeloid losemi",
    "TurkishName": "Akut miyeloid lösemi",
    "EnglishName": "",
    "category": "Majör hastalık / hematoloji",
    "subcategory": "hematoloji",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Erişkinde sık akut lösemi formunu ifade eder.",
    "preAnswerSafeDefinition": "Erişkinde sık akut lösemi formunu ifade eder.",
    "shortDefinition": "Miyeloid seri blastlarının artışıyla seyreden akut lösemi tipidir.",
    "definition": "Miyeloid seri blastlarının artışıyla seyreden akut lösemi tipidir.",
    "detailedExplanation": "Auer rod, MPO pozitifliği ve özellikle APL alt tipinde DIC riski TUS için değerlidir.",
    "postAnswerExplanation": "Auer rod, MPO pozitifliği ve özellikle APL alt tipinde DIC riski TUS için değerlidir.",
    "postAnswerExpandedExplanation": "Auer rod, MPO pozitifliği ve özellikle APL alt tipinde DIC riski TUS için değerlidir.",
    "tusPearl": "Auer rod/MPO pozitif = AML lehine.",
    "differentialPoint": "",
    "clinicalRelevance": "Auer rod/MPO pozitif = AML lehine.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Akut miyeloid lösemi"
    ],
    "sourceTextExamples": [
      "Lokalize cerrahi patoloji açısından anlamlıdır.",
      "Lokalize cerrahi patoloji açısından anlamlıdır."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 799,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": [
        {
          "alias": "AML",
          "reason": "unsafe-short-or-low-signal-alias"
        }
      ]
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-akut-otitis-media",
    "term": "Akut otitis media",
    "aliases": [
      "Akut otitis media",
      "orta kulak iltihabı"
    ],
    "normalizedTerm": "akut otitis media",
    "TurkishName": "Akut otitis media",
    "EnglishName": "",
    "category": "Majör hastalık / KBB-pediatri",
    "subcategory": "KBB-pediatri",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Kulak ağrısı ve timpan membran bulgularıyla giden sık pediatrik enfeksiyondur.",
    "preAnswerSafeDefinition": "Kulak ağrısı ve timpan membran bulgularıyla giden sık pediatrik enfeksiyondur.",
    "shortDefinition": "Orta kulakta akut enfeksiyon/inflamasyon tablosudur.",
    "definition": "Orta kulakta akut enfeksiyon/inflamasyon tablosudur.",
    "detailedExplanation": "Pnömatik otoskopide azalmış hareket, bombelik ve eritem tanıda değerlidir; dış kulak yolu ağrısından otitis externa ayrılır.",
    "postAnswerExplanation": "Pnömatik otoskopide azalmış hareket, bombelik ve eritem tanıda değerlidir; dış kulak yolu ağrısından otitis externa ayrılır.",
    "postAnswerExpandedExplanation": "Pnömatik otoskopide azalmış hareket, bombelik ve eritem tanıda değerlidir; dış kulak yolu ağrısından otitis externa ayrılır.",
    "tusPearl": "Kulak ağrısı + bombeli timpan membran = akut otitis media.",
    "differentialPoint": "",
    "clinicalRelevance": "Kulak ağrısı + bombeli timpan membran = akut otitis media.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Akut otitis media",
      "orta kulak iltihabı"
    ],
    "sourceTextExamples": [
      "Akut otitis media komplikasyonu olan mastoiditte acil yaklaşımı seçebilme",
      "Akut otitis media sonrası ateş, mastoid bölgede eritem-şişlik-hassasiyet ve aurikulanın öne itilmesi akut mastoiditi düşündürür."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 24,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-amiodaron-toksisitesi",
    "term": "Amiodaron toksisitesi",
    "aliases": [
      "Amiodaron toksisitesi"
    ],
    "normalizedTerm": "amiodaron toksisitesi",
    "TurkishName": "Amiodaron toksisitesi",
    "EnglishName": "",
    "category": "Farmakoloji / Tedavi / Toksikoloji",
    "subcategory": "Toksin / toksisite",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "preAnswerSafeDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "shortDefinition": "Amiodaron çok dokuda birikir; akciğer, tiroid, karaciğer ve kornea yan etkileri izlenebilir.",
    "definition": "Amiodaron çok dokuda birikir; akciğer, tiroid, karaciğer ve kornea yan etkileri izlenebilir.",
    "detailedExplanation": "Amiodaron toksisitesi Amiodaron çok dokuda birikir; akciğer, tiroid, karaciğer ve kornea yan etkileri izlenebilir.",
    "postAnswerExplanation": "Amiodaron toksisitesi Amiodaron çok dokuda birikir; akciğer, tiroid, karaciğer ve kornea yan etkileri izlenebilir.",
    "postAnswerExpandedExplanation": "Amiodaron toksisitesi Amiodaron çok dokuda birikir; akciğer, tiroid, karaciğer ve kornea yan etkileri izlenebilir.",
    "tusPearl": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "differentialPoint": "Benzer ilaçlardan ayrım, etki hedefi ve spesifik toksisite/antidot ilişkisidir.",
    "clinicalRelevance": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology"
    ],
    "relatedTerms": [
      "yan etki",
      "antidot"
    ],
    "safeNestedTerms": [
      "yan etki",
      "antidot"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Amiodaron toksisitesi",
      "yan etki",
      "antidot"
    ],
    "sourceTextExamples": [
      "Amiodaron toksisitesi",
      "Amiodaron toksisitesi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve farmakoloji / tedavi / toksikoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-andexanet-alfa",
    "term": "Andexanet alfa",
    "aliases": [
      "Andexanet alfa"
    ],
    "normalizedTerm": "andexanet alfa",
    "TurkishName": "Andexanet alfa",
    "EnglishName": "",
    "category": "Farmakoloji / Tedavi / Toksikoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "preAnswerSafeDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "shortDefinition": "Faktör Xa inhibitörleri için andexanet alfa düşünülür.",
    "definition": "Faktör Xa inhibitörleri için andexanet alfa düşünülür.",
    "detailedExplanation": "Faktör Xa inhibitörleri için andexanet alfa düşünülür. Dabigatran direkt trombin inhibitörüdür; idarucizumab ilacı bağlayarak etkisini nötralize eder.",
    "postAnswerExplanation": "Faktör Xa inhibitörleri için andexanet alfa düşünülür. Dabigatran direkt trombin inhibitörüdür; idarucizumab ilacı bağlayarak etkisini nötralize eder.",
    "postAnswerExpandedExplanation": "Faktör Xa inhibitörleri için andexanet alfa düşünülür. Dabigatran direkt trombin inhibitörüdür; idarucizumab ilacı bağlayarak etkisini nötralize eder.",
    "tusPearl": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "differentialPoint": "Benzer ilaçlardan ayrım, etki hedefi ve spesifik toksisite/antidot ilişkisidir.",
    "clinicalRelevance": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology"
    ],
    "relatedTerms": [
      "yan etki",
      "antidot"
    ],
    "safeNestedTerms": [
      "yan etki",
      "antidot"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Andexanet alfa",
      "yan etki",
      "antidot"
    ],
    "sourceTextExamples": [
      "Faktör Xa inhibitörleri için andexanet alfa düşünülür."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve farmakoloji / tedavi / toksikoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-anne-sutu-sariligi",
    "term": "Anne sütü sarılığı",
    "aliases": [
      "Anne sütü sarılığı"
    ],
    "normalizedTerm": "anne sutu sariligi",
    "TurkishName": "Anne sütü sarılığı",
    "EnglishName": "",
    "category": "Pediatri",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Pediatrik yaş grubunda kullanılan klinik tanı veya yönetim paternidir.",
    "preAnswerSafeDefinition": "Pediatrik yaş grubunda kullanılan klinik tanı veya yönetim paternidir.",
    "shortDefinition": "genellikle daha geç dönemde belirginleşir ve pozitif direkt antiglobulin testiyle açıklanmaz.",
    "definition": "genellikle daha geç dönemde belirginleşir ve pozitif direkt antiglobulin testiyle açıklanmaz.",
    "detailedExplanation": "Anne sütü sarılığı genellikle daha geç dönemde belirginleşir ve pozitif direkt antiglobulin testiyle açıklanmaz. İlk 24-48 saatte belirginleşen indirekt bilirubin artışı, anne-bebek ABO uyumsuzluğu ve direkt antiglobulin testinin pozitif olması immün aracılı hemolizi düşündürür. Maternal immünoglobulin G antikorları plasentayı geçerek yenidoğan eritrositlerine bağlanır ve bilirubin yükünü artıran hemolize yol açar.",
    "postAnswerExplanation": "Anne sütü sarılığı genellikle daha geç dönemde belirginleşir ve pozitif direkt antiglobulin testiyle açıklanmaz. İlk 24-48 saatte belirginleşen indirekt bilirubin artışı, anne-bebek ABO uyumsuzluğu ve direkt antiglobulin testinin pozitif olması immün aracılı hemolizi düşündürür. Maternal immünoglobulin G antikorları plasentayı geçerek yenidoğan eritrositlerine bağlanır ve bilirubin yükünü artıran hemolize yol açar.",
    "postAnswerExpandedExplanation": "Anne sütü sarılığı genellikle daha geç dönemde belirginleşir ve pozitif direkt antiglobulin testiyle açıklanmaz. İlk 24-48 saatte belirginleşen indirekt bilirubin artışı, anne-bebek ABO uyumsuzluğu ve direkt antiglobulin testinin pozitif olması immün aracılı hemolizi düşündürür. Maternal immünoglobulin G antikorları plasentayı geçerek yenidoğan eritrositlerine bağlanır ve bilirubin yükünü artıran hemolize yol açar.",
    "tusPearl": "Pediatride yaş, doğum öyküsü, beslenme, aşı/immünite ve acil solunum-dolaşım riski soruyu belirler.",
    "differentialPoint": "Erişkin yaklaşımından farkı yaşa özgü eşikler, congenital nedenler ve hızlı kötüleşme riskidir.",
    "clinicalRelevance": "Pediatride yaş, doğum öyküsü, beslenme, aşı/immünite ve acil solunum-dolaşım riski soruyu belirler.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedTerms": [
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "safeNestedTerms": [
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Anne sütü sarılığı",
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "sourceTextExamples": [
      "Anne sütü sarılığı genellikle daha geç dönemde belirginleşir ve pozitif direkt antiglobulin testiyle açıklanmaz.",
      "Anne sütü sarılığı genellikle daha geç dönemde belirginleşir ve pozitif direkt antiglobulin testiyle açıklanmaz."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 11,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot feedback içinde geçiyor ve pediatri bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-asetazolamid-kullanimi",
    "term": "Asetazolamid kullanımı",
    "aliases": [
      "Asetazolamid kullanımı"
    ],
    "normalizedTerm": "asetazolamid kullanimi",
    "TurkishName": "Asetazolamid kullanımı",
    "EnglishName": "",
    "category": "Farmakoloji / Tedavi / Toksikoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "preAnswerSafeDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "shortDefinition": "Bikarbonat geri emilimi azalır ve hafif metabolik asidoz ventilasyonu uyarabilir.",
    "definition": "Bikarbonat geri emilimi azalır ve hafif metabolik asidoz ventilasyonu uyarabilir.",
    "detailedExplanation": "Asetazolamid kullanımı Bikarbonat geri emilimi azalır ve hafif metabolik asidoz ventilasyonu uyarabilir.",
    "postAnswerExplanation": "Asetazolamid kullanımı Bikarbonat geri emilimi azalır ve hafif metabolik asidoz ventilasyonu uyarabilir.",
    "postAnswerExpandedExplanation": "Asetazolamid kullanımı Bikarbonat geri emilimi azalır ve hafif metabolik asidoz ventilasyonu uyarabilir.",
    "tusPearl": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "differentialPoint": "Benzer ilaçlardan ayrım, etki hedefi ve spesifik toksisite/antidot ilişkisidir.",
    "clinicalRelevance": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology"
    ],
    "relatedTerms": [
      "yan etki",
      "antidot"
    ],
    "safeNestedTerms": [
      "yan etki",
      "antidot"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Asetazolamid kullanımı",
      "yan etki",
      "antidot"
    ],
    "sourceTextExamples": [
      "Asetazolamid kullanımı",
      "Asetazolamid kullanımı"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve farmakoloji / tedavi / toksikoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-agrisiz-ucuncu-trimester-kanamasi",
    "term": "Ağrısız üçüncü trimester kanaması",
    "aliases": [
      "Ağrısız üçüncü trimester kanaması"
    ],
    "normalizedTerm": "agrisiz ucuncu trimester kanamasi",
    "TurkishName": "Ağrısız üçüncü trimester kanaması",
    "EnglishName": "",
    "category": "Kadın Hastalıkları ve Doğum",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Gebelik veya jinekolojik klinik karar bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Gebelik veya jinekolojik klinik karar bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Plasenta previada ağrısız üçüncü trimester kanamasını tanıyıp vajinal muayeneden kaçınmayı seçebilme Üçüncü trimesterde ağrısız parlak kırmızı vajinal kanama, yumuşak-hassasiyetsiz uterus ve geçirilmiş sezaryen öyküsü plasenta previayı düşündürür.",
    "definition": "Plasenta previada ağrısız üçüncü trimester kanamasını tanıyıp vajinal muayeneden kaçınmayı seçebilme Üçüncü trimesterde ağrısız parlak kırmızı vajinal kanama, yumuşak-hassasiyetsiz uterus ve geçirilmiş sezaryen öyküsü plasenta previayı düşündürür.",
    "detailedExplanation": "Plasenta previada ağrısız üçüncü trimester kanamasını tanıyıp vajinal muayeneden kaçınmayı seçebilme Üçüncü trimesterde ağrısız parlak kırmızı vajinal kanama, yumuşak-hassasiyetsiz uterus ve geçirilmiş sezaryen öyküsü plasenta previayı düşündürür. Plasenta previa dışlanmadan dijital vajinal muayene yapılması masif kanamayı tetikleyebilir; ilk değerlendirme ultrasonografiyle plasenta yerleşimini belirlemektir.",
    "postAnswerExplanation": "Plasenta previada ağrısız üçüncü trimester kanamasını tanıyıp vajinal muayeneden kaçınmayı seçebilme Üçüncü trimesterde ağrısız parlak kırmızı vajinal kanama, yumuşak-hassasiyetsiz uterus ve geçirilmiş sezaryen öyküsü plasenta previayı düşündürür. Plasenta previa dışlanmadan dijital vajinal muayene yapılması masif kanamayı tetikleyebilir; ilk değerlendirme ultrasonografiyle plasenta yerleşimini belirlemektir.",
    "postAnswerExpandedExplanation": "Plasenta previada ağrısız üçüncü trimester kanamasını tanıyıp vajinal muayeneden kaçınmayı seçebilme Üçüncü trimesterde ağrısız parlak kırmızı vajinal kanama, yumuşak-hassasiyetsiz uterus ve geçirilmiş sezaryen öyküsü plasenta previayı düşündürür. Plasenta previa dışlanmadan dijital vajinal muayene yapılması masif kanamayı tetikleyebilir; ilk değerlendirme ultrasonografiyle plasenta yerleşimini belirlemektir.",
    "tusPearl": "Kadın doğum sorularında gebelik haftası, kanama tipi, enfeksiyon bulgusu ve fetal risk yönetimi birlikte değerlendirilir.",
    "differentialPoint": "Ayırıcı nokta, stabilite, gebelik haftası, kanama/ağrı karakteri ve anne-fetus önceliğidir.",
    "clinicalRelevance": "Kadın doğum sorularında gebelik haftası, kanama tipi, enfeksiyon bulgusu ve fetal risk yönetimi birlikte değerlendirilir.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Ağrısız üçüncü trimester kanaması"
    ],
    "sourceTextExamples": [
      "Plasenta previada ağrısız üçüncü trimester kanamasını tanıyıp vajinal muayeneden kaçınmayı seçebilme",
      "Plasenta previada ağrısız üçüncü trimester kanamasını tanıyıp vajinal muayeneden kaçınmayı seçebilme"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 6,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve kadın hastalıkları ve doğum bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-bi-rads-4-yaklasimi",
    "term": "BI-RADS 4 yaklaşımı",
    "aliases": [
      "BI-RADS 4 yaklaşımı"
    ],
    "normalizedTerm": "bi-rads 4 yaklasimi",
    "TurkishName": "BI-RADS 4 yaklaşımı",
    "EnglishName": "",
    "category": "Cerrahi / Acil",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Cerrahi aciliyet veya girişim planlamasıyla ilişkili güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Cerrahi aciliyet veya girişim planlamasıyla ilişkili güvenli bir kavramdır.",
    "shortDefinition": "BI-RADS 4 şüpheli lezyondur; histolojik doğrulama gerekir.",
    "definition": "BI-RADS 4 şüpheli lezyondur; histolojik doğrulama gerekir.",
    "detailedExplanation": "BI-RADS 4 yaklaşımı BI-RADS 4 şüpheli lezyondur; histolojik doğrulama gerekir.",
    "postAnswerExplanation": "BI-RADS 4 yaklaşımı BI-RADS 4 şüpheli lezyondur; histolojik doğrulama gerekir.",
    "postAnswerExpandedExplanation": "BI-RADS 4 yaklaşımı BI-RADS 4 şüpheli lezyondur; histolojik doğrulama gerekir.",
    "tusPearl": "Cerrahi sorularda peritonit, iskemi, kanama, hava yolu/solunum ve hemodinamik instabilite karar önceliğini değiştirir.",
    "differentialPoint": "Ayırıcı nokta, konservatif izlem mi yoksa acil girişim mi gerektiğidir.",
    "clinicalRelevance": "Cerrahi sorularda peritonit, iskemi, kanama, hava yolu/solunum ve hemodinamik instabilite karar önceliğini değiştirir.",
    "mechanism": "",
    "relatedBranches": [
      "surgery",
      "emergency"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "BI-RADS 4 yaklaşımı"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve cerrahi / acil bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-bacillus-anthracis",
    "term": "Bacillus anthracis",
    "aliases": [
      "Bacillus anthracis"
    ],
    "normalizedTerm": "bacillus anthracis",
    "TurkishName": "Bacillus anthracis",
    "EnglishName": "",
    "category": "Mikrobiyoloji / Enfeksiyon",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "preAnswerSafeDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "shortDefinition": "Kirli penetran yara sonrası trismus, risus sardonicus ve uyarıyla artan kas spazmları tetanosu düşündürür.",
    "definition": "Kirli penetran yara sonrası trismus, risus sardonicus ve uyarıyla artan kas spazmları tetanosu düşündürür.",
    "detailedExplanation": "Bacillus anthracis Kirli penetran yara sonrası trismus, risus sardonicus ve uyarıyla artan kas spazmları tetanosu düşündürür. Clostridium tetani tetanospazmin toksiniyle inhibitör nörotransmiter salınımını engeller ve kaslarda rijidite-spazm oluşturur.",
    "postAnswerExplanation": "Bacillus anthracis Kirli penetran yara sonrası trismus, risus sardonicus ve uyarıyla artan kas spazmları tetanosu düşündürür. Clostridium tetani tetanospazmin toksiniyle inhibitör nörotransmiter salınımını engeller ve kaslarda rijidite-spazm oluşturur.",
    "postAnswerExpandedExplanation": "Bacillus anthracis Kirli penetran yara sonrası trismus, risus sardonicus ve uyarıyla artan kas spazmları tetanosu düşündürür. Clostridium tetani tetanospazmin toksiniyle inhibitör nörotransmiter salınımını engeller ve kaslarda rijidite-spazm oluşturur.",
    "tusPearl": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "differentialPoint": "Benzer etkenlerden ayrım; toksin tipi, klinik tablo, özel tanı testi veya antibiyotik tuzağıdır.",
    "clinicalRelevance": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology",
      "surgery",
      "emergency"
    ],
    "relatedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "safeNestedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Bacillus anthracis",
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "sourceTextExamples": [
      "Bacillus anthracis eskar veya ağır sistemik enfeksiyonla ilişkilidir; tetanik spazm kliniği beklenmez."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 19,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve mikrobiyoloji / enfeksiyon bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-bakteriyel-pnomoni",
    "term": "Bakteriyel pnömoni",
    "aliases": [
      "Bakteriyel pnömoni",
      "pnömoni"
    ],
    "normalizedTerm": "bakteriyel pnomoni",
    "TurkishName": "Bakteriyel pnömoni",
    "EnglishName": "",
    "category": "Majör hastalık / enfeksiyon",
    "subcategory": "enfeksiyon",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Ateş, öksürük, balgam ve infiltrasyonla ilişkili alt solunum yolu enfeksiyonudur.",
    "preAnswerSafeDefinition": "Ateş, öksürük, balgam ve infiltrasyonla ilişkili alt solunum yolu enfeksiyonudur.",
    "shortDefinition": "Akciğer parankiminin bakteriyel enfeksiyonudur.",
    "definition": "Akciğer parankiminin bakteriyel enfeksiyonudur.",
    "detailedExplanation": "Lober konsolidasyon, pürülan balgam ve yüksek CRP/lökositoz tipik bakteriyel paterndir; viral pnömoniden klinik ve radyolojik paternle ayrılır.",
    "postAnswerExplanation": "Lober konsolidasyon, pürülan balgam ve yüksek CRP/lökositoz tipik bakteriyel paterndir; viral pnömoniden klinik ve radyolojik paternle ayrılır.",
    "postAnswerExpandedExplanation": "Lober konsolidasyon, pürülan balgam ve yüksek CRP/lökositoz tipik bakteriyel paterndir; viral pnömoniden klinik ve radyolojik paternle ayrılır.",
    "tusPearl": "Ateş + pürülan balgam + lober infiltrasyon = bakteriyel pnömoni.",
    "differentialPoint": "",
    "clinicalRelevance": "Ateş + pürülan balgam + lober infiltrasyon = bakteriyel pnömoni.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "Etken",
      "Tanı testi",
      "Ampirik tedavi"
    ],
    "safeNestedTerms": [
      "Etken",
      "Tanı testi",
      "Ampirik tedavi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Bakteriyel pnömoni",
      "pnömoni",
      "Etken",
      "Tanı testi",
      "Ampirik tedavi"
    ],
    "sourceTextExamples": [
      "Pnömoni nedeniyle son 8 gündür geniş spektrumlu antibiyotik kullandığı öğreniliyor. Son 24 saatte 8 kez sulu dışkılama, kramp tarzında karın ağrısı ve iştahsızlık tarifliyor. Kanlı dışkılama belirtmiyor.",
      "Pnömoni nedeniyle son 8 gündür geniş spektrumlu antibiyotik kullandığı öğreniliyor. Son 24 saatte 8 kez sulu dışkılama, kramp tarzında karın ağrısı ve iştahsızlık tarifliyor. Kanlı dışkılama belirtmiyor."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 214,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-barrett-metaplazisi",
    "term": "Barrett metaplazisi",
    "aliases": [
      "Barrett metaplazisi"
    ],
    "normalizedTerm": "barrett metaplazisi",
    "TurkishName": "Barrett metaplazisi",
    "EnglishName": "",
    "category": "İç Hastalıkları / Klinik Karar",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Kolon nöroendokrin tümörü Barrett metaplazisinin beklenen malign dönüşüm yolu değildir.",
    "definition": "Kolon nöroendokrin tümörü Barrett metaplazisinin beklenen malign dönüşüm yolu değildir.",
    "detailedExplanation": "Kolon nöroendokrin tümörü Barrett metaplazisinin beklenen malign dönüşüm yolu değildir. Uzun süreli gastroözofageal reflü distal özofagusta intestinal metaplaziye yol açabilir. Goblet hücreli intestinal metaplazi Barrett özofagusudur ve özofagus adenokarsinomu riskini artırır.",
    "postAnswerExplanation": "Kolon nöroendokrin tümörü Barrett metaplazisinin beklenen malign dönüşüm yolu değildir. Uzun süreli gastroözofageal reflü distal özofagusta intestinal metaplaziye yol açabilir. Goblet hücreli intestinal metaplazi Barrett özofagusudur ve özofagus adenokarsinomu riskini artırır.",
    "postAnswerExpandedExplanation": "Kolon nöroendokrin tümörü Barrett metaplazisinin beklenen malign dönüşüm yolu değildir. Uzun süreli gastroözofageal reflü distal özofagusta intestinal metaplaziye yol açabilir. Goblet hücreli intestinal metaplazi Barrett özofagusudur ve özofagus adenokarsinomu riskini artırır.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Barrett metaplazisi"
    ],
    "sourceTextExamples": [
      "Kolon nöroendokrin tümörü Barrett metaplazisinin beklenen malign dönüşüm yolu değildir.",
      "Kolon nöroendokrin tümörü Barrett metaplazisinin beklenen malign dönüşüm yolu değildir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 4,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot feedback içinde geçiyor ve i̇ç hastalıkları / klinik karar bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-bell-paralizisi",
    "term": "Bell paralizisi",
    "aliases": [
      "Bell paralizisi",
      "fasiyal paralizi",
      "periferik fasiyal paralizi"
    ],
    "normalizedTerm": "bell paralizisi",
    "TurkishName": "Bell paralizisi",
    "EnglishName": "",
    "category": "Majör hastalık / nöroloji",
    "subcategory": "nöroloji",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Alın dahil tüm yüz yarısında güçsüzlük yapan periferik fasiyal sinir tutulumudur.",
    "preAnswerSafeDefinition": "Alın dahil tüm yüz yarısında güçsüzlük yapan periferik fasiyal sinir tutulumudur.",
    "shortDefinition": "Fasiyal sinirin periferik tutulumuna bağlı tek taraflı yüz felcidir.",
    "definition": "Fasiyal sinirin periferik tutulumuna bağlı tek taraflı yüz felcidir.",
    "detailedExplanation": "Alın kırıştıramama periferik lezyon lehinedir; santral lezyonda alın genellikle korunur.",
    "postAnswerExplanation": "Alın kırıştıramama periferik lezyon lehinedir; santral lezyonda alın genellikle korunur.",
    "postAnswerExpandedExplanation": "Alın kırıştıramama periferik lezyon lehinedir; santral lezyonda alın genellikle korunur.",
    "tusPearl": "Yüz felcinde alın tutulumu periferik/santral ayrımını verir.",
    "differentialPoint": "",
    "clinicalRelevance": "Yüz felcinde alın tutulumu periferik/santral ayrımını verir.",
    "mechanism": "",
    "relatedBranches": [
      "neurology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Bell paralizisi",
      "fasiyal paralizi",
      "periferik fasiyal paralizi"
    ],
    "sourceTextExamples": [
      "Sağ yüzde santral fasiyal paralizi, sağ üst ve alt ekstremitede belirgin motor güç kaybı mevcuttur.",
      "Periferik fasiyal paraliziyi alın tutulumu ve göz kapatma kaybıyla santral lezyondan ayırt edebilme"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 30,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-biliyer-atrezi",
    "term": "Biliyer atrezi",
    "aliases": [
      "Biliyer atrezi"
    ],
    "normalizedTerm": "biliyer atrezi",
    "TurkishName": "Biliyer atrezi",
    "EnglishName": "",
    "category": "Pediatri",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Pediatrik yaş grubunda kullanılan klinik tanı veya yönetim paternidir.",
    "preAnswerSafeDefinition": "Pediatrik yaş grubunda kullanılan klinik tanı veya yönetim paternidir.",
    "shortDefinition": "de direkt hiperbilirubinemi, akolik dışkı ve erken cerrahi yönlendirmeyi tanıyabilme Uzamış sarılıkta direkt bilirubin yüksekliği, akolik dışkı, koyu idrar, hepatomegali ve barsağa safra geçişinin olmaması biliyer atreziyi düşündürür.",
    "definition": "de direkt hiperbilirubinemi, akolik dışkı ve erken cerrahi yönlendirmeyi tanıyabilme Uzamış sarılıkta direkt bilirubin yüksekliği, akolik dışkı, koyu idrar, hepatomegali ve barsağa safra geçişinin olmaması biliyer atreziyi düşündürür.",
    "detailedExplanation": "Biliyer atrezide direkt hiperbilirubinemi, akolik dışkı ve erken cerrahi yönlendirmeyi tanıyabilme Uzamış sarılıkta direkt bilirubin yüksekliği, akolik dışkı, koyu idrar, hepatomegali ve barsağa safra geçişinin olmaması biliyer atreziyi düşündürür. Erken tanı ve Kasai portoenterostomisi için hızlı cerrahi yönlendirme prognoz açısından kritiktir.",
    "postAnswerExplanation": "Biliyer atrezide direkt hiperbilirubinemi, akolik dışkı ve erken cerrahi yönlendirmeyi tanıyabilme Uzamış sarılıkta direkt bilirubin yüksekliği, akolik dışkı, koyu idrar, hepatomegali ve barsağa safra geçişinin olmaması biliyer atreziyi düşündürür. Erken tanı ve Kasai portoenterostomisi için hızlı cerrahi yönlendirme prognoz açısından kritiktir.",
    "postAnswerExpandedExplanation": "Biliyer atrezide direkt hiperbilirubinemi, akolik dışkı ve erken cerrahi yönlendirmeyi tanıyabilme Uzamış sarılıkta direkt bilirubin yüksekliği, akolik dışkı, koyu idrar, hepatomegali ve barsağa safra geçişinin olmaması biliyer atreziyi düşündürür. Erken tanı ve Kasai portoenterostomisi için hızlı cerrahi yönlendirme prognoz açısından kritiktir.",
    "tusPearl": "Pediatride yaş, doğum öyküsü, beslenme, aşı/immünite ve acil solunum-dolaşım riski soruyu belirler.",
    "differentialPoint": "Erişkin yaklaşımından farkı yaşa özgü eşikler, congenital nedenler ve hızlı kötüleşme riskidir.",
    "clinicalRelevance": "Pediatride yaş, doğum öyküsü, beslenme, aşı/immünite ve acil solunum-dolaşım riski soruyu belirler.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedTerms": [
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "safeNestedTerms": [
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Biliyer atrezi",
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "sourceTextExamples": [
      "Biliyer atrezide direkt hiperbilirubinemi, akolik dışkı ve erken cerrahi yönlendirmeyi tanıyabilme"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 17,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve pediatri bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-botulinum-toksini",
    "term": "Botulinum toksini",
    "aliases": [
      "Botulinum toksini"
    ],
    "normalizedTerm": "botulinum toksini",
    "TurkishName": "Botulinum toksini",
    "EnglishName": "",
    "category": "Mikrobiyoloji / Enfeksiyon",
    "subcategory": "Toksin / toksisite",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "preAnswerSafeDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "shortDefinition": "Nöromüsküler kavşakta asetilkolin salınımının engellenmesi botulinum toksini etkisidir; yanık yarasındaki bu etkenin toksiniyle uyumlu değildir.",
    "definition": "Nöromüsküler kavşakta asetilkolin salınımının engellenmesi botulinum toksini etkisidir; yanık yarasındaki bu etkenin toksiniyle uyumlu değildir.",
    "detailedExplanation": "Nöromüsküler kavşakta asetilkolin salınımının engellenmesi botulinum toksini etkisidir; yanık yarasındaki bu etkenin toksiniyle uyumlu değildir. Yanık yarasında mavi-yeşil pigmentli, oksidaz pozitif, non-laktoz fermenter gram-negatif basil Pseudomonas aeruginosa için tipiktir. Bu etkenin Exotoxin A toksini elongasyon faktörü-2’yi ADP-ribozilleyerek protein sentezini inhibe eder ve hücre hasarına yol açar.",
    "postAnswerExplanation": "Nöromüsküler kavşakta asetilkolin salınımının engellenmesi botulinum toksini etkisidir; yanık yarasındaki bu etkenin toksiniyle uyumlu değildir. Yanık yarasında mavi-yeşil pigmentli, oksidaz pozitif, non-laktoz fermenter gram-negatif basil Pseudomonas aeruginosa için tipiktir. Bu etkenin Exotoxin A toksini elongasyon faktörü-2’yi ADP-ribozilleyerek protein sentezini inhibe eder ve hücre hasarına yol açar.",
    "postAnswerExpandedExplanation": "Nöromüsküler kavşakta asetilkolin salınımının engellenmesi botulinum toksini etkisidir; yanık yarasındaki bu etkenin toksiniyle uyumlu değildir. Yanık yarasında mavi-yeşil pigmentli, oksidaz pozitif, non-laktoz fermenter gram-negatif basil Pseudomonas aeruginosa için tipiktir. Bu etkenin Exotoxin A toksini elongasyon faktörü-2’yi ADP-ribozilleyerek protein sentezini inhibe eder ve hücre hasarına yol açar.",
    "tusPearl": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "differentialPoint": "Benzer etkenlerden ayrım; toksin tipi, klinik tablo, özel tanı testi veya antibiyotik tuzağıdır.",
    "clinicalRelevance": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "safeNestedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Botulinum toksini",
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "sourceTextExamples": [
      "Nöromüsküler kavşakta asetilkolin salınımının engellenmesi botulinum toksini etkisidir; yanık yarasındaki bu etkenin toksiniyle uyumlu değildir.",
      "Nöromüsküler kavşakta asetilkolin salınımının engellenmesi botulinum toksini etkisidir; yanık yarasındaki bu etkenin toksiniyle uyumlu değildir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 13,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot feedback içinde geçiyor ve mikrobiyoloji / enfeksiyon bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-bogmaca",
    "term": "Boğmaca",
    "aliases": [
      "Boğmaca",
      "pertussis",
      "Bordetella pertussis"
    ],
    "normalizedTerm": "bogmaca",
    "TurkishName": "Boğmaca",
    "EnglishName": "",
    "category": "Majör hastalık / enfeksiyon-pediatri",
    "subcategory": "enfeksiyon-pediatri",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Uzamış nöbet tarzı öksürük yapan solunum yolu enfeksiyonudur.",
    "preAnswerSafeDefinition": "Uzamış nöbet tarzı öksürük yapan solunum yolu enfeksiyonudur.",
    "shortDefinition": "Paroksismal öksürük nöbetleriyle seyreden Bordetella pertussis enfeksiyonudur.",
    "definition": "Paroksismal öksürük nöbetleriyle seyreden Bordetella pertussis enfeksiyonudur.",
    "detailedExplanation": "İnspiratuvar whoop, posttussif kusma ve lenfositoz ipuçlarıdır; bebeklerde apneyle gelebilir.",
    "postAnswerExplanation": "İnspiratuvar whoop, posttussif kusma ve lenfositoz ipuçlarıdır; bebeklerde apneyle gelebilir.",
    "postAnswerExpandedExplanation": "İnspiratuvar whoop, posttussif kusma ve lenfositoz ipuçlarıdır; bebeklerde apneyle gelebilir.",
    "tusPearl": "Paroksismal öksürük + posttussif kusma = boğmaca.",
    "differentialPoint": "",
    "clinicalRelevance": "Paroksismal öksürük + posttussif kusma = boğmaca.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics",
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "Etken",
      "Tanı testi",
      "Ampirik tedavi"
    ],
    "safeNestedTerms": [
      "Etken",
      "Tanı testi",
      "Ampirik tedavi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Boğmaca",
      "pertussis",
      "Bordetella pertussis",
      "Etken",
      "Tanı testi",
      "Ampirik tedavi"
    ],
    "sourceTextExamples": [
      "Boğmaca etkenini klinik özellik ve toksin mekanizmasıyla ilişkilendirebilme",
      "Boğmaca toksinine bağlı lenfosit yanıtını destekler."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 200,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-campylobacter-jejuni",
    "term": "Campylobacter jejuni",
    "aliases": [
      "Campylobacter jejuni"
    ],
    "normalizedTerm": "campylobacter jejuni",
    "TurkishName": "Campylobacter jejuni",
    "EnglishName": "",
    "category": "Mikrobiyoloji / Enfeksiyon",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "preAnswerSafeDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "shortDefinition": "Duodenal ülser ve pozitif üre nefes testi Helicobacter pylori enfeksiyonunu düşündürür.",
    "definition": "Duodenal ülser ve pozitif üre nefes testi Helicobacter pylori enfeksiyonunu düşündürür.",
    "detailedExplanation": "Campylobacter jejuni Duodenal ülser ve pozitif üre nefes testi Helicobacter pylori enfeksiyonunu düşündürür. Bu bakteri üreaz üretimiyle mide asidik ortamında amonyak oluşturarak yaşamını sürdürür ve peptik ülser patogenezine katkı sağlar.",
    "postAnswerExplanation": "Campylobacter jejuni Duodenal ülser ve pozitif üre nefes testi Helicobacter pylori enfeksiyonunu düşündürür. Bu bakteri üreaz üretimiyle mide asidik ortamında amonyak oluşturarak yaşamını sürdürür ve peptik ülser patogenezine katkı sağlar.",
    "postAnswerExpandedExplanation": "Campylobacter jejuni Duodenal ülser ve pozitif üre nefes testi Helicobacter pylori enfeksiyonunu düşündürür. Bu bakteri üreaz üretimiyle mide asidik ortamında amonyak oluşturarak yaşamını sürdürür ve peptik ülser patogenezine katkı sağlar.",
    "tusPearl": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "differentialPoint": "Benzer etkenlerden ayrım; toksin tipi, klinik tablo, özel tanı testi veya antibiyotik tuzağıdır.",
    "clinicalRelevance": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "safeNestedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Campylobacter jejuni",
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "sourceTextExamples": [
      "Campylobacter jejuni inflamatuvar ishal ve karın ağrısıyla ilişkilidir; üre nefes testi pozitifliği yapmaz."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 31,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve mikrobiyoloji / enfeksiyon bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-candida-germ-tup-testi",
    "term": "Candida germ tüp testi",
    "aliases": [
      "Candida germ tüp testi"
    ],
    "normalizedTerm": "candida germ tup testi",
    "TurkishName": "Candida germ tüp testi",
    "EnglishName": "",
    "category": "Mikrobiyoloji / Enfeksiyon",
    "subcategory": "Tanısal test / karar eşiği",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "preAnswerSafeDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "shortDefinition": "Candida albicans serumda germ tüp oluşturabilir ve mukokutanöz enfeksiyonlarda sık görülür.",
    "definition": "Candida albicans serumda germ tüp oluşturabilir ve mukokutanöz enfeksiyonlarda sık görülür.",
    "detailedExplanation": "Candida germ tüp testi Candida albicans serumda germ tüp oluşturabilir ve mukokutanöz enfeksiyonlarda sık görülür.",
    "postAnswerExplanation": "Candida germ tüp testi Candida albicans serumda germ tüp oluşturabilir ve mukokutanöz enfeksiyonlarda sık görülür.",
    "postAnswerExpandedExplanation": "Candida germ tüp testi Candida albicans serumda germ tüp oluşturabilir ve mukokutanöz enfeksiyonlarda sık görülür.",
    "tusPearl": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "differentialPoint": "Benzer etkenlerden ayrım; toksin tipi, klinik tablo, özel tanı testi veya antibiyotik tuzağıdır.",
    "clinicalRelevance": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "safeNestedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Candida germ tüp testi",
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "sourceTextExamples": [
      "Candida germ tüp testi",
      "Candida germ tüp testi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve mikrobiyoloji / enfeksiyon bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-chlamydia-trachomatis-yenidogan-pnomonisi",
    "term": "Chlamydia trachomatis yenidoğan pnömonisi",
    "aliases": [
      "Chlamydia trachomatis yenidoğan pnömonisi"
    ],
    "normalizedTerm": "chlamydia trachomatis yenidogan pnomonisi",
    "TurkishName": "Chlamydia trachomatis yenidoğan pnömonisi",
    "EnglishName": "",
    "category": "Mikrobiyoloji / Enfeksiyon",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "preAnswerSafeDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "shortDefinition": "Doğum kanalından bulaşabilir; bilateral konjonktivit ve pnömoni yapabilir.",
    "definition": "Doğum kanalından bulaşabilir; bilateral konjonktivit ve pnömoni yapabilir.",
    "detailedExplanation": "Chlamydia trachomatis yenidoğan pnömonisi Doğum kanalından bulaşabilir; bilateral konjonktivit ve pnömoni yapabilir.",
    "postAnswerExplanation": "Chlamydia trachomatis yenidoğan pnömonisi Doğum kanalından bulaşabilir; bilateral konjonktivit ve pnömoni yapabilir.",
    "postAnswerExpandedExplanation": "Chlamydia trachomatis yenidoğan pnömonisi Doğum kanalından bulaşabilir; bilateral konjonktivit ve pnömoni yapabilir.",
    "tusPearl": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "differentialPoint": "Benzer etkenlerden ayrım; toksin tipi, klinik tablo, özel tanı testi veya antibiyotik tuzağıdır.",
    "clinicalRelevance": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics",
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "safeNestedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Chlamydia trachomatis yenidoğan pnömonisi",
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "sourceTextExamples": [
      "Chlamydia trachomatis yenidoğan pnömonisi",
      "Chlamydia trachomatis yenidoğan pnömonisi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve mikrobiyoloji / enfeksiyon bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-clostridium-botulinum",
    "term": "Clostridium botulinum",
    "aliases": [
      "Clostridium botulinum"
    ],
    "normalizedTerm": "clostridium botulinum",
    "TurkishName": "Clostridium botulinum",
    "EnglishName": "",
    "category": "Mikrobiyoloji / Enfeksiyon",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "preAnswerSafeDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "shortDefinition": "Kirli penetran yara sonrası trismus, risus sardonicus ve uyarıyla artan kas spazmları tetanosu düşündürür.",
    "definition": "Kirli penetran yara sonrası trismus, risus sardonicus ve uyarıyla artan kas spazmları tetanosu düşündürür.",
    "detailedExplanation": "Clostridium botulinum Kirli penetran yara sonrası trismus, risus sardonicus ve uyarıyla artan kas spazmları tetanosu düşündürür. Clostridium tetani tetanospazmin toksiniyle inhibitör nörotransmiter salınımını engeller ve kaslarda rijidite-spazm oluşturur.",
    "postAnswerExplanation": "Clostridium botulinum Kirli penetran yara sonrası trismus, risus sardonicus ve uyarıyla artan kas spazmları tetanosu düşündürür. Clostridium tetani tetanospazmin toksiniyle inhibitör nörotransmiter salınımını engeller ve kaslarda rijidite-spazm oluşturur.",
    "postAnswerExpandedExplanation": "Clostridium botulinum Kirli penetran yara sonrası trismus, risus sardonicus ve uyarıyla artan kas spazmları tetanosu düşündürür. Clostridium tetani tetanospazmin toksiniyle inhibitör nörotransmiter salınımını engeller ve kaslarda rijidite-spazm oluşturur.",
    "tusPearl": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "differentialPoint": "Benzer etkenlerden ayrım; toksin tipi, klinik tablo, özel tanı testi veya antibiyotik tuzağıdır.",
    "clinicalRelevance": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "safeNestedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Clostridium botulinum",
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "sourceTextExamples": [
      "Clostridium botulinum",
      "Clostridium botulinum gevşek paralizi ve kraniyal sinir bulguları yapar; bu hastada spastik kasılmalar baskındır."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 9,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve mikrobiyoloji / enfeksiyon bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-clostridium-perfringens",
    "term": "Clostridium perfringens",
    "aliases": [
      "Clostridium perfringens"
    ],
    "normalizedTerm": "clostridium perfringens",
    "TurkishName": "Clostridium perfringens",
    "EnglishName": "",
    "category": "Mikrobiyoloji / Enfeksiyon",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "preAnswerSafeDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "shortDefinition": "Yanık yarasında mavi-yeşil pigmentli kötü kokulu akıntı ve oksidaz pozitif nonfermentatif gram-negatif basil üremesi Pseudomonas aeruginosa enfeksiyonunu düşündürür.",
    "definition": "Yanık yarasında mavi-yeşil pigmentli kötü kokulu akıntı ve oksidaz pozitif nonfermentatif gram-negatif basil üremesi Pseudomonas aeruginosa enfeksiyonunu düşündürür.",
    "detailedExplanation": "Clostridium perfringens Yanık yarasında mavi-yeşil pigmentli kötü kokulu akıntı ve oksidaz pozitif nonfermentatif gram-negatif basil üremesi Pseudomonas aeruginosa enfeksiyonunu düşündürür. Bu etken yanık ve hastane ilişkili enfeksiyonlarda önemlidir.",
    "postAnswerExplanation": "Clostridium perfringens Yanık yarasında mavi-yeşil pigmentli kötü kokulu akıntı ve oksidaz pozitif nonfermentatif gram-negatif basil üremesi Pseudomonas aeruginosa enfeksiyonunu düşündürür. Bu etken yanık ve hastane ilişkili enfeksiyonlarda önemlidir.",
    "postAnswerExpandedExplanation": "Clostridium perfringens Yanık yarasında mavi-yeşil pigmentli kötü kokulu akıntı ve oksidaz pozitif nonfermentatif gram-negatif basil üremesi Pseudomonas aeruginosa enfeksiyonunu düşündürür. Bu etken yanık ve hastane ilişkili enfeksiyonlarda önemlidir.",
    "tusPearl": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "differentialPoint": "Benzer etkenlerden ayrım; toksin tipi, klinik tablo, özel tanı testi veya antibiyotik tuzağıdır.",
    "clinicalRelevance": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "safeNestedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Clostridium perfringens",
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "sourceTextExamples": [
      "Clostridium perfringens",
      "Clostridium perfringens anaerob gram-pozitif basil olup gazlı gangrenle ilişkilidir; mavi-yeşil pigment tipik değildir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 14,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve mikrobiyoloji / enfeksiyon bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-corynebacterium-diphtheriae",
    "term": "Corynebacterium diphtheriae",
    "aliases": [
      "Corynebacterium diphtheriae"
    ],
    "normalizedTerm": "corynebacterium diphtheriae",
    "TurkishName": "Corynebacterium diphtheriae",
    "EnglishName": "",
    "category": "Mikrobiyoloji / Enfeksiyon",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "preAnswerSafeDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "shortDefinition": "Eksik aşılı süt çocuğunda paroksismal öksürük, öksürük sonrası kusma, siyanoz ve belirgin lenfositoz boğmacayı düşündürür.",
    "definition": "Eksik aşılı süt çocuğunda paroksismal öksürük, öksürük sonrası kusma, siyanoz ve belirgin lenfositoz boğmacayı düşündürür.",
    "detailedExplanation": "Corynebacterium diphtheriae Eksik aşılı süt çocuğunda paroksismal öksürük, öksürük sonrası kusma, siyanoz ve belirgin lenfositoz boğmacayı düşündürür. Bordetella pertussis solunum epitelinde toksin aracılı etki yapar; pertussis toksini G inhibitör proteini ADP-ribozilleyerek adenilat siklaz aktivitesini artırır.",
    "postAnswerExplanation": "Corynebacterium diphtheriae Eksik aşılı süt çocuğunda paroksismal öksürük, öksürük sonrası kusma, siyanoz ve belirgin lenfositoz boğmacayı düşündürür. Bordetella pertussis solunum epitelinde toksin aracılı etki yapar; pertussis toksini G inhibitör proteini ADP-ribozilleyerek adenilat siklaz aktivitesini artırır.",
    "postAnswerExpandedExplanation": "Corynebacterium diphtheriae Eksik aşılı süt çocuğunda paroksismal öksürük, öksürük sonrası kusma, siyanoz ve belirgin lenfositoz boğmacayı düşündürür. Bordetella pertussis solunum epitelinde toksin aracılı etki yapar; pertussis toksini G inhibitör proteini ADP-ribozilleyerek adenilat siklaz aktivitesini artırır.",
    "tusPearl": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "differentialPoint": "Benzer etkenlerden ayrım; toksin tipi, klinik tablo, özel tanı testi veya antibiyotik tuzağıdır.",
    "clinicalRelevance": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "safeNestedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Corynebacterium diphtheriae",
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "sourceTextExamples": [
      "Corynebacterium diphtheriae",
      "Corynebacterium diphtheriae farenkste psödomembran ve toksik miyokardit gibi bulgularla seyreder; paroksismal öksürük nöbetleri tipik değildir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 13,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve mikrobiyoloji / enfeksiyon bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-difteri-toksini",
    "term": "Difteri toksini",
    "aliases": [
      "Difteri toksini"
    ],
    "normalizedTerm": "difteri toksini",
    "TurkishName": "Difteri toksini",
    "EnglishName": "",
    "category": "Mikrobiyoloji / Enfeksiyon",
    "subcategory": "Toksin / toksisite",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "preAnswerSafeDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "shortDefinition": "Pseudomonas aeruginosa Exotoxin A, difteri toksinine benzer şekilde elongasyon faktörü-2 üzerinden protein sentezini inhibe eder.",
    "definition": "Pseudomonas aeruginosa Exotoxin A, difteri toksinine benzer şekilde elongasyon faktörü-2 üzerinden protein sentezini inhibe eder.",
    "detailedExplanation": "Pseudomonas aeruginosa Exotoxin A, difteri toksinine benzer şekilde elongasyon faktörü-2 üzerinden protein sentezini inhibe eder. Yanık yarasında mavi-yeşil pigmentli, oksidaz pozitif, non-laktoz fermenter gram-negatif basil Pseudomonas aeruginosa için tipiktir. Bu etkenin Exotoxin A toksini elongasyon faktörü-2’yi ADP-ribozilleyerek protein sentezini inhibe eder ve hücre hasarına yol açar.",
    "postAnswerExplanation": "Pseudomonas aeruginosa Exotoxin A, difteri toksinine benzer şekilde elongasyon faktörü-2 üzerinden protein sentezini inhibe eder. Yanık yarasında mavi-yeşil pigmentli, oksidaz pozitif, non-laktoz fermenter gram-negatif basil Pseudomonas aeruginosa için tipiktir. Bu etkenin Exotoxin A toksini elongasyon faktörü-2’yi ADP-ribozilleyerek protein sentezini inhibe eder ve hücre hasarına yol açar.",
    "postAnswerExpandedExplanation": "Pseudomonas aeruginosa Exotoxin A, difteri toksinine benzer şekilde elongasyon faktörü-2 üzerinden protein sentezini inhibe eder. Yanık yarasında mavi-yeşil pigmentli, oksidaz pozitif, non-laktoz fermenter gram-negatif basil Pseudomonas aeruginosa için tipiktir. Bu etkenin Exotoxin A toksini elongasyon faktörü-2’yi ADP-ribozilleyerek protein sentezini inhibe eder ve hücre hasarına yol açar.",
    "tusPearl": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "differentialPoint": "Benzer etkenlerden ayrım; toksin tipi, klinik tablo, özel tanı testi veya antibiyotik tuzağıdır.",
    "clinicalRelevance": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "safeNestedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Difteri toksini",
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "sourceTextExamples": [
      "Pseudomonas aeruginosa Exotoxin A, difteri toksinine benzer şekilde elongasyon faktörü-2 üzerinden protein sentezini inhibe eder.",
      "Pseudomonas aeruginosa Exotoxin A, difteri toksinine benzer şekilde elongasyon faktörü-2 üzerinden protein sentezini inhibe eder."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 22,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve mikrobiyoloji / enfeksiyon bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-digoksin-immun-fab-antikoru",
    "term": "Digoksin immün Fab antikoru",
    "aliases": [
      "Digoksin immün Fab antikoru"
    ],
    "normalizedTerm": "digoksin immun fab antikoru",
    "TurkishName": "Digoksin immün Fab antikoru",
    "EnglishName": "",
    "category": "Farmakoloji / Tedavi / Toksikoloji",
    "subcategory": "Seroloji / otoantikor",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "preAnswerSafeDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "shortDefinition": "Bulantı, renk görme bozukluğu, bradiaritmi, ventriküler ektopiler, yüksek digoksin düzeyi ve hiperkalemi digoksin toksisitesini düşündürür.",
    "definition": "Bulantı, renk görme bozukluğu, bradiaritmi, ventriküler ektopiler, yüksek digoksin düzeyi ve hiperkalemi digoksin toksisitesini düşündürür.",
    "detailedExplanation": "Digoksin immün Fab antikoru Bulantı, renk görme bozukluğu, bradiaritmi, ventriküler ektopiler, yüksek digoksin düzeyi ve hiperkalemi digoksin toksisitesini düşündürür. Ciddi aritmi veya hiperkalemi varlığında spesifik tedavi digoksini bağlayan immün Fab antikorudur.",
    "postAnswerExplanation": "Digoksin immün Fab antikoru Bulantı, renk görme bozukluğu, bradiaritmi, ventriküler ektopiler, yüksek digoksin düzeyi ve hiperkalemi digoksin toksisitesini düşündürür. Ciddi aritmi veya hiperkalemi varlığında spesifik tedavi digoksini bağlayan immün Fab antikorudur.",
    "postAnswerExpandedExplanation": "Digoksin immün Fab antikoru Bulantı, renk görme bozukluğu, bradiaritmi, ventriküler ektopiler, yüksek digoksin düzeyi ve hiperkalemi digoksin toksisitesini düşündürür. Ciddi aritmi veya hiperkalemi varlığında spesifik tedavi digoksini bağlayan immün Fab antikorudur.",
    "tusPearl": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "differentialPoint": "Benzer ilaçlardan ayrım, etki hedefi ve spesifik toksisite/antidot ilişkisidir.",
    "clinicalRelevance": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "rheumatology",
      "immunology"
    ],
    "relatedTerms": [
      "antikor"
    ],
    "safeNestedTerms": [
      "antikor"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Digoksin immün Fab antikoru",
      "antikor"
    ],
    "sourceTextExamples": [
      "Digoksin immün Fab antikoru",
      "Digoksin immün Fab antikoru"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 7,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve farmakoloji / tedavi / toksikoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-diskeratozis-konjenita",
    "term": "Diskeratozis konjenita",
    "aliases": [
      "Diskeratozis konjenita"
    ],
    "normalizedTerm": "diskeratozis konjenita",
    "TurkishName": "Diskeratozis konjenita",
    "EnglishName": "",
    "category": "Pediatri",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Pediatrik yaş grubunda kullanılan klinik tanı veya yönetim paternidir.",
    "preAnswerSafeDefinition": "Pediatrik yaş grubunda kullanılan klinik tanı veya yönetim paternidir.",
    "shortDefinition": "Telomer biyolojisi bozukluğu mukokutanöz bulgular ve kemik iliği yetmezliği yapabilir.",
    "definition": "Telomer biyolojisi bozukluğu mukokutanöz bulgular ve kemik iliği yetmezliği yapabilir.",
    "detailedExplanation": "Diskeratozis konjenita Telomer biyolojisi bozukluğu mukokutanöz bulgular ve kemik iliği yetmezliği yapabilir.",
    "postAnswerExplanation": "Diskeratozis konjenita Telomer biyolojisi bozukluğu mukokutanöz bulgular ve kemik iliği yetmezliği yapabilir.",
    "postAnswerExpandedExplanation": "Diskeratozis konjenita Telomer biyolojisi bozukluğu mukokutanöz bulgular ve kemik iliği yetmezliği yapabilir.",
    "tusPearl": "Pediatride yaş, doğum öyküsü, beslenme, aşı/immünite ve acil solunum-dolaşım riski soruyu belirler.",
    "differentialPoint": "Erişkin yaklaşımından farkı yaşa özgü eşikler, congenital nedenler ve hızlı kötüleşme riskidir.",
    "clinicalRelevance": "Pediatride yaş, doğum öyküsü, beslenme, aşı/immünite ve acil solunum-dolaşım riski soruyu belirler.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedTerms": [
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "safeNestedTerms": [
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Diskeratozis konjenita",
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "sourceTextExamples": [
      "Diskeratozis konjenita",
      "Diskeratozis konjenita."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 4,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve pediatri bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-doksisiklin-ve-rifampisin",
    "term": "Doksisiklin ve rifampisin",
    "aliases": [
      "Doksisiklin ve rifampisin"
    ],
    "normalizedTerm": "doksisiklin ve rifampisin",
    "TurkishName": "Doksisiklin ve rifampisin",
    "EnglishName": "",
    "category": "Farmakoloji / Tedavi / Toksikoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "preAnswerSafeDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "shortDefinition": "Brucella intraselüler yerleşim gösterebildiği için kombine ve hücre içine etkili tedavi tercih edilir.",
    "definition": "Brucella intraselüler yerleşim gösterebildiği için kombine ve hücre içine etkili tedavi tercih edilir.",
    "detailedExplanation": "Doksisiklin ve rifampisin. Brucella intraselüler yerleşim gösterebildiği için kombine ve hücre içine etkili tedavi tercih edilir.",
    "postAnswerExplanation": "Doksisiklin ve rifampisin. Brucella intraselüler yerleşim gösterebildiği için kombine ve hücre içine etkili tedavi tercih edilir.",
    "postAnswerExpandedExplanation": "Doksisiklin ve rifampisin. Brucella intraselüler yerleşim gösterebildiği için kombine ve hücre içine etkili tedavi tercih edilir.",
    "tusPearl": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "differentialPoint": "Benzer ilaçlardan ayrım, etki hedefi ve spesifik toksisite/antidot ilişkisidir.",
    "clinicalRelevance": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology"
    ],
    "relatedTerms": [
      "yan etki",
      "antidot"
    ],
    "safeNestedTerms": [
      "yan etki",
      "antidot"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Doksisiklin ve rifampisin",
      "yan etki",
      "antidot"
    ],
    "sourceTextExamples": [
      "Doksisiklin ve rifampisin.",
      "Doksisiklin ve rifampisin."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addAsAlias",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve farmakoloji / tedavi / toksikoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-doksorubisin-kardiyotoksisitesi",
    "term": "Doksorubisin kardiyotoksisitesi",
    "aliases": [
      "Doksorubisin kardiyotoksisitesi"
    ],
    "normalizedTerm": "doksorubisin kardiyotoksisitesi",
    "TurkishName": "Doksorubisin kardiyotoksisitesi",
    "EnglishName": "",
    "category": "Farmakoloji / Tedavi / Toksikoloji",
    "subcategory": "Toksin / toksisite",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "preAnswerSafeDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "shortDefinition": "Serbest radikal hasarı ve demir ilişkili mekanizmalar kardiyotoksisiteye katkı sağlar.",
    "definition": "Serbest radikal hasarı ve demir ilişkili mekanizmalar kardiyotoksisiteye katkı sağlar.",
    "detailedExplanation": "Doksorubisin kardiyotoksisitesi Serbest radikal hasarı ve demir ilişkili mekanizmalar kardiyotoksisiteye katkı sağlar.",
    "postAnswerExplanation": "Doksorubisin kardiyotoksisitesi Serbest radikal hasarı ve demir ilişkili mekanizmalar kardiyotoksisiteye katkı sağlar.",
    "postAnswerExpandedExplanation": "Doksorubisin kardiyotoksisitesi Serbest radikal hasarı ve demir ilişkili mekanizmalar kardiyotoksisiteye katkı sağlar.",
    "tusPearl": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "differentialPoint": "Benzer ilaçlardan ayrım, etki hedefi ve spesifik toksisite/antidot ilişkisidir.",
    "clinicalRelevance": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology"
    ],
    "relatedTerms": [
      "yan etki",
      "antidot"
    ],
    "safeNestedTerms": [
      "yan etki",
      "antidot"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Doksorubisin kardiyotoksisitesi",
      "yan etki",
      "antidot"
    ],
    "sourceTextExamples": [
      "Doksorubisin kardiyotoksisitesi",
      "Doksorubisin kardiyotoksisitesi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve farmakoloji / tedavi / toksikoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-etec-gezgin-ishali",
    "term": "ETEC gezgin ishali",
    "aliases": [
      "ETEC gezgin ishali"
    ],
    "normalizedTerm": "etec gezgin ishali",
    "TurkishName": "ETEC gezgin ishali",
    "EnglishName": "",
    "category": "Mikrobiyoloji / Enfeksiyon",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "preAnswerSafeDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "shortDefinition": "ETEC ısıya duyarlı ve ısıya dayanıklı toksinlerle sekretuvar ishal yapar.",
    "definition": "ETEC ısıya duyarlı ve ısıya dayanıklı toksinlerle sekretuvar ishal yapar.",
    "detailedExplanation": "ETEC gezgin ishali ETEC ısıya duyarlı ve ısıya dayanıklı toksinlerle sekretuvar ishal yapar.",
    "postAnswerExplanation": "ETEC gezgin ishali ETEC ısıya duyarlı ve ısıya dayanıklı toksinlerle sekretuvar ishal yapar.",
    "postAnswerExpandedExplanation": "ETEC gezgin ishali ETEC ısıya duyarlı ve ısıya dayanıklı toksinlerle sekretuvar ishal yapar.",
    "tusPearl": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "differentialPoint": "Benzer etkenlerden ayrım; toksin tipi, klinik tablo, özel tanı testi veya antibiyotik tuzağıdır.",
    "clinicalRelevance": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "safeNestedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "ETEC gezgin ishali",
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "sourceTextExamples": [
      "Vaka kökünde ETEC, gezgin ishali ve sulu dışkı birlikte verilirse hangi tanı öncelikle düşünülür?"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve mikrobiyoloji / enfeksiyon bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-echinococcus-granulosus",
    "term": "Echinococcus granulosus",
    "aliases": [
      "Echinococcus granulosus"
    ],
    "normalizedTerm": "echinococcus granulosus",
    "TurkishName": "Echinococcus granulosus",
    "EnglishName": "",
    "category": "Mikrobiyoloji / Enfeksiyon",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "preAnswerSafeDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "shortDefinition": "enfeksiyonunu hidatik kist ve köpek-koyun döngüsüyle tanıyabilme Köpek-koyun döngüsüyle ilişkili kırsal maruziyet, karaciğerde kız veziküllü kistik lezyon ve pozitif seroloji kistik ekinokokkozisi düşündürür.",
    "definition": "enfeksiyonunu hidatik kist ve köpek-koyun döngüsüyle tanıyabilme Köpek-koyun döngüsüyle ilişkili kırsal maruziyet, karaciğerde kız veziküllü kistik lezyon ve pozitif seroloji kistik ekinokokkozisi düşündürür.",
    "detailedExplanation": "Echinococcus granulosus enfeksiyonunu hidatik kist ve köpek-koyun döngüsüyle tanıyabilme Köpek-koyun döngüsüyle ilişkili kırsal maruziyet, karaciğerde kız veziküllü kistik lezyon ve pozitif seroloji kistik ekinokokkozisi düşündürür. Etken Echinococcus granulosus’tur.",
    "postAnswerExplanation": "Echinococcus granulosus enfeksiyonunu hidatik kist ve köpek-koyun döngüsüyle tanıyabilme Köpek-koyun döngüsüyle ilişkili kırsal maruziyet, karaciğerde kız veziküllü kistik lezyon ve pozitif seroloji kistik ekinokokkozisi düşündürür. Etken Echinococcus granulosus’tur.",
    "postAnswerExpandedExplanation": "Echinococcus granulosus enfeksiyonunu hidatik kist ve köpek-koyun döngüsüyle tanıyabilme Köpek-koyun döngüsüyle ilişkili kırsal maruziyet, karaciğerde kız veziküllü kistik lezyon ve pozitif seroloji kistik ekinokokkozisi düşündürür. Etken Echinococcus granulosus’tur.",
    "tusPearl": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "differentialPoint": "Benzer etkenlerden ayrım; toksin tipi, klinik tablo, özel tanı testi veya antibiyotik tuzağıdır.",
    "clinicalRelevance": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "safeNestedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Echinococcus granulosus",
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "sourceTextExamples": [
      "Echinococcus granulosus enfeksiyonunu hidatik kist ve köpek-koyun döngüsüyle tanıyabilme",
      "Echinococcus granulosus"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 16,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve mikrobiyoloji / enfeksiyon bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-ektopik-gebelik-metotreksat",
    "term": "Ektopik gebelik metotreksat",
    "aliases": [
      "Ektopik gebelik metotreksat"
    ],
    "normalizedTerm": "ektopik gebelik metotreksat",
    "TurkishName": "Ektopik gebelik metotreksat",
    "EnglishName": "",
    "category": "Kadın Hastalıkları ve Doğum",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Gebelik veya jinekolojik klinik karar bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Gebelik veya jinekolojik klinik karar bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Metotreksat trofoblast proliferasyonunu durdurur; stabil ve uygun hastalarda seçilir.",
    "definition": "Metotreksat trofoblast proliferasyonunu durdurur; stabil ve uygun hastalarda seçilir.",
    "detailedExplanation": "Ektopik gebelik metotreksat Metotreksat trofoblast proliferasyonunu durdurur; stabil ve uygun hastalarda seçilir.",
    "postAnswerExplanation": "Ektopik gebelik metotreksat Metotreksat trofoblast proliferasyonunu durdurur; stabil ve uygun hastalarda seçilir.",
    "postAnswerExpandedExplanation": "Ektopik gebelik metotreksat Metotreksat trofoblast proliferasyonunu durdurur; stabil ve uygun hastalarda seçilir.",
    "tusPearl": "Kadın doğum sorularında gebelik haftası, kanama tipi, enfeksiyon bulgusu ve fetal risk yönetimi birlikte değerlendirilir.",
    "differentialPoint": "Ayırıcı nokta, stabilite, gebelik haftası, kanama/ağrı karakteri ve anne-fetus önceliğidir.",
    "clinicalRelevance": "Kadın doğum sorularında gebelik haftası, kanama tipi, enfeksiyon bulgusu ve fetal risk yönetimi birlikte değerlendirilir.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Ektopik gebelik metotreksat"
    ],
    "sourceTextExamples": [
      "Ektopik gebelik metotreksat",
      "Metotreksat ektopik gebelik gibi seçilmiş durumlarda kullanılır; preterm membran rüptürü yönetiminde yeri yoktur."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve kadın hastalıkları ve doğum bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-epiglottit",
    "term": "Epiglottit",
    "aliases": [
      "Epiglottit",
      "epiglottitis"
    ],
    "normalizedTerm": "epiglottit",
    "TurkishName": "Epiglottit",
    "EnglishName": "",
    "category": "Majör hastalık / pediatrik KBB acili",
    "subcategory": "pediatrik KBB acili",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Çocukta yüksek ateş, salya akması ve tripod pozisyonuyla giden hava yolu acilidir.",
    "preAnswerSafeDefinition": "Çocukta yüksek ateş, salya akması ve tripod pozisyonuyla giden hava yolu acilidir.",
    "shortDefinition": "Epiglotun akut inflamasyonu ile hava yolu tıkanıklığı riski oluşturan acil tablodur.",
    "definition": "Epiglotun akut inflamasyonu ile hava yolu tıkanıklığı riski oluşturan acil tablodur.",
    "detailedExplanation": "Ağız içi muayene provokasyonu laringospazm riski taşır; hava yolu güvenliği önceliklidir.",
    "postAnswerExplanation": "Ağız içi muayene provokasyonu laringospazm riski taşır; hava yolu güvenliği önceliklidir.",
    "postAnswerExpandedExplanation": "Ağız içi muayene provokasyonu laringospazm riski taşır; hava yolu güvenliği önceliklidir.",
    "tusPearl": "Salya + tripod + toksik görünüm = epiglottit; boğaz muayenesinde dikkat.",
    "differentialPoint": "",
    "clinicalRelevance": "Salya + tripod + toksik görünüm = epiglottit; boğaz muayenesinde dikkat.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics",
      "surgery",
      "emergency"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Epiglottit",
      "epiglottitis"
    ],
    "sourceTextExamples": [
      "Epiglottit şüphesinde güvenli ilk yaklaşımı belirleyebilme",
      "Yüksek ateş, toksik görünüm, salya akışı, tripod pozisyonu ve inspiratuvar stridor epiglottit açısından yüksek riskli hava yolu tablosudur."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 69,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-etambutol-toksisitesi",
    "term": "Etambutol toksisitesi",
    "aliases": [
      "Etambutol toksisitesi"
    ],
    "normalizedTerm": "etambutol toksisitesi",
    "TurkishName": "Etambutol toksisitesi",
    "EnglishName": "",
    "category": "Farmakoloji / Tedavi / Toksikoloji",
    "subcategory": "Toksin / toksisite",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "preAnswerSafeDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "shortDefinition": "Renk görme bozukluğu ve görme keskinliği azalması gelişebilir.",
    "definition": "Renk görme bozukluğu ve görme keskinliği azalması gelişebilir.",
    "detailedExplanation": "Etambutol toksisitesi Renk görme bozukluğu ve görme keskinliği azalması gelişebilir.",
    "postAnswerExplanation": "Etambutol toksisitesi Renk görme bozukluğu ve görme keskinliği azalması gelişebilir.",
    "postAnswerExpandedExplanation": "Etambutol toksisitesi Renk görme bozukluğu ve görme keskinliği azalması gelişebilir.",
    "tusPearl": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "differentialPoint": "Benzer ilaçlardan ayrım, etki hedefi ve spesifik toksisite/antidot ilişkisidir.",
    "clinicalRelevance": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology"
    ],
    "relatedTerms": [
      "yan etki",
      "antidot"
    ],
    "safeNestedTerms": [
      "yan etki",
      "antidot"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Etambutol toksisitesi",
      "yan etki",
      "antidot"
    ],
    "sourceTextExamples": [
      "Etambutol toksisitesi",
      "Etambutol toksisitesi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve farmakoloji / tedavi / toksikoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-fallot-tetralojisi-comelme",
    "term": "Fallot tetralojisi çömelme",
    "aliases": [
      "Fallot tetralojisi çömelme"
    ],
    "normalizedTerm": "fallot tetralojisi comelme",
    "TurkishName": "Fallot tetralojisi çömelme",
    "EnglishName": "",
    "category": "Pediatri",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Pediatrik yaş grubunda kullanılan klinik tanı veya yönetim paternidir.",
    "preAnswerSafeDefinition": "Pediatrik yaş grubunda kullanılan klinik tanı veya yönetim paternidir.",
    "shortDefinition": "Çömelme sistemik vasküler direnci artırarak sağdan sola şantı azaltabilir.",
    "definition": "Çömelme sistemik vasküler direnci artırarak sağdan sola şantı azaltabilir.",
    "detailedExplanation": "Fallot tetralojisi çömelme Çömelme sistemik vasküler direnci artırarak sağdan sola şantı azaltabilir.",
    "postAnswerExplanation": "Fallot tetralojisi çömelme Çömelme sistemik vasküler direnci artırarak sağdan sola şantı azaltabilir.",
    "postAnswerExpandedExplanation": "Fallot tetralojisi çömelme Çömelme sistemik vasküler direnci artırarak sağdan sola şantı azaltabilir.",
    "tusPearl": "Pediatride yaş, doğum öyküsü, beslenme, aşı/immünite ve acil solunum-dolaşım riski soruyu belirler.",
    "differentialPoint": "Erişkin yaklaşımından farkı yaşa özgü eşikler, congenital nedenler ve hızlı kötüleşme riskidir.",
    "clinicalRelevance": "Pediatride yaş, doğum öyküsü, beslenme, aşı/immünite ve acil solunum-dolaşım riski soruyu belirler.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedTerms": [
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "safeNestedTerms": [
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Fallot tetralojisi çömelme",
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "sourceTextExamples": [
      "Fallot tetralojisi çömelme",
      "Fallot tetralojisi çömelme"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve pediatri bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-feokromositomada-ameliyat-oncesi-blokaj",
    "term": "Feokromositomada ameliyat öncesi blokaj",
    "aliases": [
      "Feokromositomada ameliyat öncesi blokaj"
    ],
    "normalizedTerm": "feokromositomada ameliyat oncesi blokaj",
    "TurkishName": "Feokromositomada ameliyat öncesi blokaj",
    "EnglishName": "",
    "category": "Cerrahi / Acil",
    "subcategory": "Tedavi kararı",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Cerrahi aciliyet veya girişim planlamasıyla ilişkili güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Cerrahi aciliyet veya girişim planlamasıyla ilişkili güvenli bir kavramdır.",
    "shortDefinition": "Önce alfa blokaj yapılmadan beta blokaj verilmesi hipertansif krizi ağırlaştırabilir.",
    "definition": "Önce alfa blokaj yapılmadan beta blokaj verilmesi hipertansif krizi ağırlaştırabilir.",
    "detailedExplanation": "Feokromositomada ameliyat öncesi blokaj Önce alfa blokaj yapılmadan beta blokaj verilmesi hipertansif krizi ağırlaştırabilir.",
    "postAnswerExplanation": "Feokromositomada ameliyat öncesi blokaj Önce alfa blokaj yapılmadan beta blokaj verilmesi hipertansif krizi ağırlaştırabilir.",
    "postAnswerExpandedExplanation": "Feokromositomada ameliyat öncesi blokaj Önce alfa blokaj yapılmadan beta blokaj verilmesi hipertansif krizi ağırlaştırabilir.",
    "tusPearl": "Cerrahi sorularda peritonit, iskemi, kanama, hava yolu/solunum ve hemodinamik instabilite karar önceliğini değiştirir.",
    "differentialPoint": "Ayırıcı nokta, konservatif izlem mi yoksa acil girişim mi gerektiğidir.",
    "clinicalRelevance": "Cerrahi sorularda peritonit, iskemi, kanama, hava yolu/solunum ve hemodinamik instabilite karar önceliğini değiştirir.",
    "mechanism": "",
    "relatedBranches": [
      "surgery",
      "emergency"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Feokromositomada ameliyat öncesi blokaj"
    ],
    "sourceTextExamples": [
      "Feokromositomada ameliyat öncesi blokaj",
      "Feokromositomada ameliyat öncesi blokaj"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve cerrahi / acil bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-flail-chest",
    "term": "Flail chest",
    "aliases": [
      "Flail chest"
    ],
    "normalizedTerm": "flail chest",
    "TurkishName": "Flail chest",
    "EnglishName": "",
    "category": "Cerrahi / Acil",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Cerrahi aciliyet veya girişim planlamasıyla ilişkili güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Cerrahi aciliyet veya girişim planlamasıyla ilişkili güvenli bir kavramdır.",
    "shortDefinition": "Göğüs duvarı segmenti ventilasyon sırasında ters hareket eder ve pulmoner kontüzyon eşlik edebilir.",
    "definition": "Göğüs duvarı segmenti ventilasyon sırasında ters hareket eder ve pulmoner kontüzyon eşlik edebilir.",
    "detailedExplanation": "Flail chest Göğüs duvarı segmenti ventilasyon sırasında ters hareket eder ve pulmoner kontüzyon eşlik edebilir.",
    "postAnswerExplanation": "Flail chest Göğüs duvarı segmenti ventilasyon sırasında ters hareket eder ve pulmoner kontüzyon eşlik edebilir.",
    "postAnswerExpandedExplanation": "Flail chest Göğüs duvarı segmenti ventilasyon sırasında ters hareket eder ve pulmoner kontüzyon eşlik edebilir.",
    "tusPearl": "Cerrahi sorularda peritonit, iskemi, kanama, hava yolu/solunum ve hemodinamik instabilite karar önceliğini değiştirir.",
    "differentialPoint": "Ayırıcı nokta, konservatif izlem mi yoksa acil girişim mi gerektiğidir.",
    "clinicalRelevance": "Cerrahi sorularda peritonit, iskemi, kanama, hava yolu/solunum ve hemodinamik instabilite karar önceliğini değiştirir.",
    "mechanism": "",
    "relatedBranches": [
      "surgery",
      "emergency"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Flail chest"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 4,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve cerrahi / acil bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-florokinolon-yan-etkisi",
    "term": "Florokinolon yan etkisi",
    "aliases": [
      "Florokinolon yan etkisi"
    ],
    "normalizedTerm": "florokinolon yan etkisi",
    "TurkishName": "Florokinolon yan etkisi",
    "EnglishName": "",
    "category": "Farmakoloji / Tedavi / Toksikoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "preAnswerSafeDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "shortDefinition": "Kollajen yapılar üzerinde toksik etki özellikle yaşlılarda ve steroid kullananlarda önemlidir.",
    "definition": "Kollajen yapılar üzerinde toksik etki özellikle yaşlılarda ve steroid kullananlarda önemlidir.",
    "detailedExplanation": "Florokinolon yan etkisi Kollajen yapılar üzerinde toksik etki özellikle yaşlılarda ve steroid kullananlarda önemlidir.",
    "postAnswerExplanation": "Florokinolon yan etkisi Kollajen yapılar üzerinde toksik etki özellikle yaşlılarda ve steroid kullananlarda önemlidir.",
    "postAnswerExpandedExplanation": "Florokinolon yan etkisi Kollajen yapılar üzerinde toksik etki özellikle yaşlılarda ve steroid kullananlarda önemlidir.",
    "tusPearl": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "differentialPoint": "Benzer ilaçlardan ayrım, etki hedefi ve spesifik toksisite/antidot ilişkisidir.",
    "clinicalRelevance": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology"
    ],
    "relatedTerms": [
      "yan etki",
      "antidot"
    ],
    "safeNestedTerms": [
      "yan etki",
      "antidot"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Florokinolon yan etkisi",
      "yan etki",
      "antidot"
    ],
    "sourceTextExamples": [
      "Florokinolon yan etkisi",
      "Florokinolon yan etkisi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addAsSafeNestedTerm",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve farmakoloji / tedavi / toksikoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-folikuler-tiroid-neoplazisi",
    "term": "Foliküler tiroid neoplazisi",
    "aliases": [
      "Foliküler tiroid neoplazisi"
    ],
    "normalizedTerm": "folikuler tiroid neoplazisi",
    "TurkishName": "Foliküler tiroid neoplazisi",
    "EnglishName": "",
    "category": "Cerrahi / Acil",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Cerrahi aciliyet veya girişim planlamasıyla ilişkili güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Cerrahi aciliyet veya girişim planlamasıyla ilişkili güvenli bir kavramdır.",
    "shortDefinition": "İİAB foliküler mimariyi gösterir ancak invazyonu güvenilir biçimde değerlendiremez.",
    "definition": "İİAB foliküler mimariyi gösterir ancak invazyonu güvenilir biçimde değerlendiremez.",
    "detailedExplanation": "Foliküler tiroid neoplazisi İİAB foliküler mimariyi gösterir ancak invazyonu güvenilir biçimde değerlendiremez.",
    "postAnswerExplanation": "Foliküler tiroid neoplazisi İİAB foliküler mimariyi gösterir ancak invazyonu güvenilir biçimde değerlendiremez.",
    "postAnswerExpandedExplanation": "Foliküler tiroid neoplazisi İİAB foliküler mimariyi gösterir ancak invazyonu güvenilir biçimde değerlendiremez.",
    "tusPearl": "Cerrahi sorularda peritonit, iskemi, kanama, hava yolu/solunum ve hemodinamik instabilite karar önceliğini değiştirir.",
    "differentialPoint": "Ayırıcı nokta, konservatif izlem mi yoksa acil girişim mi gerektiğidir.",
    "clinicalRelevance": "Cerrahi sorularda peritonit, iskemi, kanama, hava yolu/solunum ve hemodinamik instabilite karar önceliğini değiştirir.",
    "mechanism": "",
    "relatedBranches": [
      "endocrinology",
      "surgery",
      "emergency"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Foliküler tiroid neoplazisi"
    ],
    "sourceTextExamples": [
      "Foliküler tiroid neoplazisi",
      "Foliküler tiroid neoplazisi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve cerrahi / acil bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-glp-1-reseptor-agonistleri",
    "term": "GLP-1 reseptör agonistleri",
    "aliases": [
      "GLP-1 reseptör agonistleri"
    ],
    "normalizedTerm": "glp-1 reseptor agonistleri",
    "TurkishName": "GLP-1 reseptör agonistleri",
    "EnglishName": "",
    "category": "Farmakoloji / Tedavi / Toksikoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "preAnswerSafeDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "shortDefinition": "Ayrıca mide boşalmasını yavaşlatır ve iştahı azaltabilir.",
    "definition": "Ayrıca mide boşalmasını yavaşlatır ve iştahı azaltabilir.",
    "detailedExplanation": "GLP-1 reseptör agonistleri Ayrıca mide boşalmasını yavaşlatır ve iştahı azaltabilir.",
    "postAnswerExplanation": "GLP-1 reseptör agonistleri Ayrıca mide boşalmasını yavaşlatır ve iştahı azaltabilir.",
    "postAnswerExpandedExplanation": "GLP-1 reseptör agonistleri Ayrıca mide boşalmasını yavaşlatır ve iştahı azaltabilir.",
    "tusPearl": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "differentialPoint": "Benzer ilaçlardan ayrım, etki hedefi ve spesifik toksisite/antidot ilişkisidir.",
    "clinicalRelevance": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology"
    ],
    "relatedTerms": [
      "yan etki",
      "antidot"
    ],
    "safeNestedTerms": [
      "yan etki",
      "antidot"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "GLP-1 reseptör agonistleri",
      "yan etki",
      "antidot"
    ],
    "sourceTextExamples": [
      "GLP-1 reseptör agonistleri",
      "GLP-1 reseptör agonistleri glisemiyi hangi temel mekanizmalarla düşürür?"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve farmakoloji / tedavi / toksikoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-grup-b-streptokok-profilaksisi",
    "term": "Grup B streptokok profilaksisi",
    "aliases": [
      "Grup B streptokok profilaksisi"
    ],
    "normalizedTerm": "grup b streptokok profilaksisi",
    "TurkishName": "Grup B streptokok profilaksisi",
    "EnglishName": "",
    "category": "Kadın Hastalıkları ve Doğum",
    "subcategory": "Tedavi kararı",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Gebelik veya jinekolojik klinik karar bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Gebelik veya jinekolojik klinik karar bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "İntrapartum antibiyotik yenidoğan erken GBS hastalığı riskini azaltır.",
    "definition": "İntrapartum antibiyotik yenidoğan erken GBS hastalığı riskini azaltır.",
    "detailedExplanation": "Grup B streptokok profilaksisi İntrapartum antibiyotik yenidoğan erken GBS hastalığı riskini azaltır.",
    "postAnswerExplanation": "Grup B streptokok profilaksisi İntrapartum antibiyotik yenidoğan erken GBS hastalığı riskini azaltır.",
    "postAnswerExpandedExplanation": "Grup B streptokok profilaksisi İntrapartum antibiyotik yenidoğan erken GBS hastalığı riskini azaltır.",
    "tusPearl": "Kadın doğum sorularında gebelik haftası, kanama tipi, enfeksiyon bulgusu ve fetal risk yönetimi birlikte değerlendirilir.",
    "differentialPoint": "Ayırıcı nokta, stabilite, gebelik haftası, kanama/ağrı karakteri ve anne-fetus önceliğidir.",
    "clinicalRelevance": "Kadın doğum sorularında gebelik haftası, kanama tipi, enfeksiyon bulgusu ve fetal risk yönetimi birlikte değerlendirilir.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Grup B streptokok profilaksisi"
    ],
    "sourceTextExamples": [
      "Grup B streptokok profilaksisi",
      "Grup B streptokok profilaksisi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve kadın hastalıkları ve doğum bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-helicobacter-pylori-ureaz",
    "term": "Helicobacter pylori üreaz",
    "aliases": [
      "Helicobacter pylori üreaz"
    ],
    "normalizedTerm": "helicobacter pylori ureaz",
    "TurkishName": "Helicobacter pylori üreaz",
    "EnglishName": "",
    "category": "Mikrobiyoloji / Enfeksiyon",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "preAnswerSafeDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "shortDefinition": "pozitiftir ve duodenal ülserle güçlü ilişkilidir.",
    "definition": "pozitiftir ve duodenal ülserle güçlü ilişkilidir.",
    "detailedExplanation": "Helicobacter pylori üreaz pozitiftir ve duodenal ülserle güçlü ilişkilidir. Duodenal ülser ve pozitif üre nefes testi Helicobacter pylori enfeksiyonunu düşündürür. Bu bakteri üreaz üretimiyle mide asidik ortamında amonyak oluşturarak yaşamını sürdürür ve peptik ülser patogenezine katkı sağlar.",
    "postAnswerExplanation": "Helicobacter pylori üreaz pozitiftir ve duodenal ülserle güçlü ilişkilidir. Duodenal ülser ve pozitif üre nefes testi Helicobacter pylori enfeksiyonunu düşündürür. Bu bakteri üreaz üretimiyle mide asidik ortamında amonyak oluşturarak yaşamını sürdürür ve peptik ülser patogenezine katkı sağlar.",
    "postAnswerExpandedExplanation": "Helicobacter pylori üreaz pozitiftir ve duodenal ülserle güçlü ilişkilidir. Duodenal ülser ve pozitif üre nefes testi Helicobacter pylori enfeksiyonunu düşündürür. Bu bakteri üreaz üretimiyle mide asidik ortamında amonyak oluşturarak yaşamını sürdürür ve peptik ülser patogenezine katkı sağlar.",
    "tusPearl": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "differentialPoint": "Benzer etkenlerden ayrım; toksin tipi, klinik tablo, özel tanı testi veya antibiyotik tuzağıdır.",
    "clinicalRelevance": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "safeNestedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Helicobacter pylori üreaz",
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "sourceTextExamples": [
      "Helicobacter pylori üreaz pozitiftir ve duodenal ülserle güçlü ilişkilidir.",
      "Helicobacter pylori üreaz pozitifliği ve duodenal ülserle en uyumlu mikroorganizmadır."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 9,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve mikrobiyoloji / enfeksiyon bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-hidralazin-lupus-benzeri-sendrom",
    "term": "Hidralazin lupus benzeri sendrom",
    "aliases": [
      "Hidralazin lupus benzeri sendrom"
    ],
    "normalizedTerm": "hidralazin lupus benzeri sendrom",
    "TurkishName": "Hidralazin lupus benzeri sendrom",
    "EnglishName": "",
    "category": "Farmakoloji / Tedavi / Toksikoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "preAnswerSafeDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "shortDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "definition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "detailedExplanation": "Hidralazin lupus benzeri sendromla daha çok ilişkilidir. Güçlü arterioler vazodilatör olan minoksidil kıllanma artışı yapabilir.",
    "postAnswerExplanation": "Hidralazin lupus benzeri sendromla daha çok ilişkilidir. Güçlü arterioler vazodilatör olan minoksidil kıllanma artışı yapabilir.",
    "postAnswerExpandedExplanation": "Hidralazin lupus benzeri sendromla daha çok ilişkilidir. Güçlü arterioler vazodilatör olan minoksidil kıllanma artışı yapabilir.",
    "tusPearl": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "differentialPoint": "Benzer ilaçlardan ayrım, etki hedefi ve spesifik toksisite/antidot ilişkisidir.",
    "clinicalRelevance": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology"
    ],
    "relatedTerms": [
      "yan etki",
      "antidot"
    ],
    "safeNestedTerms": [
      "yan etki",
      "antidot"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Hidralazin lupus benzeri sendrom",
      "yan etki",
      "antidot"
    ],
    "sourceTextExamples": [
      "Hidralazin lupus benzeri sendromla daha çok ilişkilidir.",
      "Hidralazin lupus benzeri sendromla daha çok ilişkilidir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve farmakoloji / tedavi / toksikoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-hiperemezis-gravidarum",
    "term": "Hiperemezis gravidarum",
    "aliases": [
      "Hiperemezis gravidarum"
    ],
    "normalizedTerm": "hiperemezis gravidarum",
    "TurkishName": "Hiperemezis gravidarum",
    "EnglishName": "",
    "category": "Kadın Hastalıkları ve Doğum",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Gebelik veya jinekolojik klinik karar bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Gebelik veya jinekolojik klinik karar bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Ağır kusma dehidratasyon ve ketozise yol açabilir.",
    "definition": "Ağır kusma dehidratasyon ve ketozise yol açabilir.",
    "detailedExplanation": "Hiperemezis gravidarum Ağır kusma dehidratasyon ve ketozise yol açabilir.",
    "postAnswerExplanation": "Hiperemezis gravidarum Ağır kusma dehidratasyon ve ketozise yol açabilir.",
    "postAnswerExpandedExplanation": "Hiperemezis gravidarum Ağır kusma dehidratasyon ve ketozise yol açabilir.",
    "tusPearl": "Kadın doğum sorularında gebelik haftası, kanama tipi, enfeksiyon bulgusu ve fetal risk yönetimi birlikte değerlendirilir.",
    "differentialPoint": "Ayırıcı nokta, stabilite, gebelik haftası, kanama/ağrı karakteri ve anne-fetus önceliğidir.",
    "clinicalRelevance": "Kadın doğum sorularında gebelik haftası, kanama tipi, enfeksiyon bulgusu ve fetal risk yönetimi birlikte değerlendirilir.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Hiperemezis gravidarum"
    ],
    "sourceTextExamples": [
      "Hiperemezis gravidarum",
      "Hiperemezis gravidarum."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 4,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve kadın hastalıkları ve doğum bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-hipertansif-acil",
    "term": "Hipertansif acil",
    "aliases": [
      "Hipertansif acil",
      "hypertensive emergency"
    ],
    "normalizedTerm": "hipertansif acil",
    "TurkishName": "Hipertansif acil",
    "EnglishName": "",
    "category": "Majör hastalık / kardiyoloji-acil",
    "subcategory": "kardiyoloji-acil",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Kan basıncı yüksekliğinin organ hasarıyla birleştiği acil tablodur.",
    "preAnswerSafeDefinition": "Kan basıncı yüksekliğinin organ hasarıyla birleştiği acil tablodur.",
    "shortDefinition": "Ciddi kan basıncı yüksekliğiyle birlikte akut hedef organ hasarının bulunduğu durumdur.",
    "definition": "Ciddi kan basıncı yüksekliğiyle birlikte akut hedef organ hasarının bulunduğu durumdur.",
    "detailedExplanation": "Sadece sayı değil; ensefalopati, aort diseksiyonu, akciğer ödemi, AKI veya retinal bulgu varsa acildir ve kontrollü IV tedavi gerektirir.",
    "postAnswerExplanation": "Sadece sayı değil; ensefalopati, aort diseksiyonu, akciğer ödemi, AKI veya retinal bulgu varsa acildir ve kontrollü IV tedavi gerektirir.",
    "postAnswerExpandedExplanation": "Sadece sayı değil; ensefalopati, aort diseksiyonu, akciğer ödemi, AKI veya retinal bulgu varsa acildir ve kontrollü IV tedavi gerektirir.",
    "tusPearl": "Hipertansiyon + hedef organ hasarı = hipertansif acil.",
    "differentialPoint": "",
    "clinicalRelevance": "Hipertansiyon + hedef organ hasarı = hipertansif acil.",
    "mechanism": "",
    "relatedBranches": [
      "cardiology",
      "surgery",
      "emergency"
    ],
    "relatedTerms": [
      "EKG",
      "Troponin",
      "Hemodinami"
    ],
    "safeNestedTerms": [
      "EKG",
      "Troponin",
      "Hemodinami"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Hipertansif acil",
      "hypertensive emergency",
      "EKG",
      "Troponin",
      "Hemodinami"
    ],
    "sourceTextExamples": [
      "Çocukta hipertansif acilde hedef organ bulgularıyla intravenöz tedavi gereksinimini seçebilme",
      "Çok yüksek kan basıncıyla birlikte baş ağrısı, kusma, görme bulanıklığı ve papil ödemi şüphesi hipertansif acili düşündürür. Tedavide yoğun izlem altında intravenöz antihipertansiflerle kan basıncı kontrollü şekilde düşürülür; ani aşırı düşüş perfüzyonu bozabilir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 13,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-hipertansif-oncelik",
    "term": "Hipertansif öncelik",
    "aliases": [
      "Hipertansif öncelik",
      "hypertensive urgency"
    ],
    "normalizedTerm": "hipertansif oncelik",
    "TurkishName": "Hipertansif öncelik",
    "EnglishName": "",
    "category": "Majör hastalık / kardiyoloji-acil",
    "subcategory": "kardiyoloji-acil",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Yüksek tansiyonun organ hasarı olmadan yönetildiği daha kontrollü tablodur.",
    "preAnswerSafeDefinition": "Yüksek tansiyonun organ hasarı olmadan yönetildiği daha kontrollü tablodur.",
    "shortDefinition": "Ciddi kan basıncı yüksekliği olup akut hedef organ hasarı bulunmayan durumdur.",
    "definition": "Ciddi kan basıncı yüksekliği olup akut hedef organ hasarı bulunmayan durumdur.",
    "detailedExplanation": "Hipertansif acilden farkı hedef organ hasarı olmamasıdır; hızlı agresif IV düşürme zarar verebilir.",
    "postAnswerExplanation": "Hipertansif acilden farkı hedef organ hasarı olmamasıdır; hızlı agresif IV düşürme zarar verebilir.",
    "postAnswerExpandedExplanation": "Hipertansif acilden farkı hedef organ hasarı olmamasıdır; hızlı agresif IV düşürme zarar verebilir.",
    "tusPearl": "Tansiyon yüksek ama organ hasarı yoksa acil IV düşürme gerekmez.",
    "differentialPoint": "",
    "clinicalRelevance": "Tansiyon yüksek ama organ hasarı yoksa acil IV düşürme gerekmez.",
    "mechanism": "",
    "relatedBranches": [
      "cardiology",
      "surgery",
      "emergency"
    ],
    "relatedTerms": [
      "EKG",
      "Troponin",
      "Hemodinami"
    ],
    "safeNestedTerms": [
      "EKG",
      "Troponin",
      "Hemodinami"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Hipertansif öncelik",
      "hypertensive urgency",
      "EKG",
      "Troponin",
      "Hemodinami"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 0,
      "confidenceScore": "low",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-hipotonik-ovolemik-hiponatremi",
    "term": "Hipotonik övolemik hiponatremi",
    "aliases": [
      "Hipotonik övolemik hiponatremi"
    ],
    "normalizedTerm": "hipotonik ovolemik hiponatremi",
    "TurkishName": "Hipotonik övolemik hiponatremi",
    "EnglishName": "",
    "category": "İç Hastalıkları / Klinik Karar",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "SIADH tipik olarak hipotonik övolemik hiponatremi oluşturur; serum osmolalitesi düşüktür, idrar ise ADH etkisi nedeniyle uygunsuz biçimde konsantredir.",
    "definition": "SIADH tipik olarak hipotonik övolemik hiponatremi oluşturur; serum osmolalitesi düşüktür, idrar ise ADH etkisi nedeniyle uygunsuz biçimde konsantredir.",
    "detailedExplanation": "SIADH tipik olarak hipotonik övolemik hiponatremi oluşturur; serum osmolalitesi düşüktür, idrar ise ADH etkisi nedeniyle uygunsuz biçimde konsantredir. SIADH’de serum osmolalitesinin artması beklenmez; tersine hiponatremiye bağlı düşük serum osmolalitesi tipiktir. İdrar osmolalitesi ve idrar sodyumu uygunsuz yüksek kalabilir; hipourisemi de SIADH lehine destekleyici olabilir. SIADH tipik olarak hipotonik övolemik...",
    "postAnswerExplanation": "SIADH tipik olarak hipotonik övolemik hiponatremi oluşturur; serum osmolalitesi düşüktür, idrar ise ADH etkisi nedeniyle uygunsuz biçimde konsantredir. SIADH’de serum osmolalitesinin artması beklenmez; tersine hiponatremiye bağlı düşük serum osmolalitesi tipiktir. İdrar osmolalitesi ve idrar sodyumu uygunsuz yüksek kalabilir; hipourisemi de SIADH lehine destekleyici olabilir. SIADH tipik olarak hipotonik övolemik...",
    "postAnswerExpandedExplanation": "SIADH tipik olarak hipotonik övolemik hiponatremi oluşturur; serum osmolalitesi düşüktür, idrar ise ADH etkisi nedeniyle uygunsuz biçimde konsantredir. SIADH’de serum osmolalitesinin artması beklenmez; tersine hiponatremiye bağlı düşük serum osmolalitesi tipiktir. İdrar osmolalitesi ve idrar sodyumu uygunsuz yüksek kalabilir; hipourisemi de SIADH lehine destekleyici olabilir. SIADH tipik olarak hipotonik övolemik...",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [
      "hiponatremi"
    ],
    "safeNestedTerms": [
      "hiponatremi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Hipotonik övolemik hiponatremi",
      "hiponatremi"
    ],
    "sourceTextExamples": [
      "SIADH tipik olarak hipotonik övolemik hiponatremi oluşturur; serum osmolalitesi düşüktür, idrar ise ADH etkisi nedeniyle uygunsuz biçimde konsantredir.",
      "SIADH tipik olarak hipotonik övolemik hiponatremi oluşturur; serum osmolalitesi düşüktür, idrar ise ADH etkisi nedeniyle uygunsuz biçimde konsantredir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 11,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve i̇ç hastalıkları / klinik karar bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-igf-1-duzeyi",
    "term": "IGF-1 düzeyi",
    "aliases": [
      "IGF-1 düzeyi"
    ],
    "normalizedTerm": "igf-1 duzeyi",
    "TurkishName": "IGF-1 düzeyi",
    "EnglishName": "",
    "category": "İç Hastalıkları / Klinik Karar",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "IGF-1 gün içinde daha stabildir ve büyüme hormonu fazlalığını yansıtır.",
    "definition": "IGF-1 gün içinde daha stabildir ve büyüme hormonu fazlalığını yansıtır.",
    "detailedExplanation": "IGF-1 düzeyi. IGF-1 gün içinde daha stabildir ve büyüme hormonu fazlalığını yansıtır.",
    "postAnswerExplanation": "IGF-1 düzeyi. IGF-1 gün içinde daha stabildir ve büyüme hormonu fazlalığını yansıtır.",
    "postAnswerExpandedExplanation": "IGF-1 düzeyi. IGF-1 gün içinde daha stabildir ve büyüme hormonu fazlalığını yansıtır.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "IGF-1 düzeyi"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve i̇ç hastalıkları / klinik karar bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-kll-tanisi",
    "term": "KLL tanısı",
    "aliases": [
      "KLL tanısı"
    ],
    "normalizedTerm": "kll tanisi",
    "TurkishName": "KLL tanısı",
    "EnglishName": "",
    "category": "İç Hastalıkları / Klinik Karar",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "KLL olgun görünümlü klonal B lenfositlerin saptanmasıyla tanınır.",
    "definition": "KLL olgun görünümlü klonal B lenfositlerin saptanmasıyla tanınır.",
    "detailedExplanation": "KLL tanısı KLL olgun görünümlü klonal B lenfositlerin saptanmasıyla tanınır.",
    "postAnswerExplanation": "KLL tanısı KLL olgun görünümlü klonal B lenfositlerin saptanmasıyla tanınır.",
    "postAnswerExpandedExplanation": "KLL tanısı KLL olgun görünümlü klonal B lenfositlerin saptanmasıyla tanınır.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "KLL tanısı"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve i̇ç hastalıkları / klinik karar bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-kavernoz-sinus-trombozu",
    "term": "Kavernöz sinüs trombozu",
    "aliases": [
      "Kavernöz sinüs trombozu",
      "cavernous sinus thrombosis"
    ],
    "normalizedTerm": "kavernoz sinus trombozu",
    "TurkishName": "Kavernöz sinüs trombozu",
    "EnglishName": "",
    "category": "Majör hastalık / nöroloji-enfeksiyon acil",
    "subcategory": "nöroloji-enfeksiyon acil",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Yüz/orbita enfeksiyonunun intrakraniyal venöz komplikasyonudur.",
    "preAnswerSafeDefinition": "Yüz/orbita enfeksiyonunun intrakraniyal venöz komplikasyonudur.",
    "shortDefinition": "Kavernöz sinüste tromboz ve enfeksiyonla seyreden, kraniyal sinir bulguları yapabilen ciddi tablodur.",
    "definition": "Kavernöz sinüste tromboz ve enfeksiyonla seyreden, kraniyal sinir bulguları yapabilen ciddi tablodur.",
    "detailedExplanation": "Fasiyal enfeksiyon sonrası ateş, proptozis, oftalmopleji ve CN III/IV/V1/V2/VI bulguları ipucudur.",
    "postAnswerExplanation": "Fasiyal enfeksiyon sonrası ateş, proptozis, oftalmopleji ve CN III/IV/V1/V2/VI bulguları ipucudur.",
    "postAnswerExpandedExplanation": "Fasiyal enfeksiyon sonrası ateş, proptozis, oftalmopleji ve CN III/IV/V1/V2/VI bulguları ipucudur.",
    "tusPearl": "Yüz enfeksiyonu + oftalmopleji/proptozis = kavernöz sinüs trombozu.",
    "differentialPoint": "",
    "clinicalRelevance": "Yüz enfeksiyonu + oftalmopleji/proptozis = kavernöz sinüs trombozu.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology",
      "hematology",
      "oncology",
      "neurology",
      "surgery",
      "emergency"
    ],
    "relatedTerms": [
      "Etken",
      "Tanı testi",
      "Ampirik tedavi"
    ],
    "safeNestedTerms": [
      "Etken",
      "Tanı testi",
      "Ampirik tedavi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Kavernöz sinüs trombozu",
      "cavernous sinus thrombosis",
      "Etken",
      "Tanı testi",
      "Ampirik tedavi"
    ],
    "sourceTextExamples": [
      "Kavernöz sinüs trombozunda sinüs içinden geçen kraniyal sinirler etkilenebilir. Abdusens siniri, musculus rectus lateralis kasını innerve eder; bu sinirin hasarı ipsilateral gözde abduksiyon kaybı ve horizontal diplopi oluşturur.",
      "Kavernöz sinüs trombozunda sinüs içinden geçen kraniyal sinirler etkilenebilir. Abdusens siniri, musculus rectus lateralis kasını innerve eder; bu sinirin hasarı ipsilateral gözde abduksiyon kaybı ve horizontal diplopi oluşturur."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 9,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-koanal-atrezi",
    "term": "Koanal atrezi",
    "aliases": [
      "Koanal atrezi"
    ],
    "normalizedTerm": "koanal atrezi",
    "TurkishName": "Koanal atrezi",
    "EnglishName": "",
    "category": "Pediatri",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Pediatrik yaş grubunda kullanılan klinik tanı veya yönetim paternidir.",
    "preAnswerSafeDefinition": "Pediatrik yaş grubunda kullanılan klinik tanı veya yönetim paternidir.",
    "shortDefinition": "özellikle beslenmeyle artan siyanoz ve burundan sonda geçememe ile ayrılır.",
    "definition": "özellikle beslenmeyle artan siyanoz ve burundan sonda geçememe ile ayrılır.",
    "detailedExplanation": "Koanal atrezi özellikle beslenmeyle artan siyanoz ve burundan sonda geçememe ile ayrılır. Supraglottik yapıların gevşekliği inspirasyonda kollapsa neden olur.",
    "postAnswerExplanation": "Koanal atrezi özellikle beslenmeyle artan siyanoz ve burundan sonda geçememe ile ayrılır. Supraglottik yapıların gevşekliği inspirasyonda kollapsa neden olur.",
    "postAnswerExpandedExplanation": "Koanal atrezi özellikle beslenmeyle artan siyanoz ve burundan sonda geçememe ile ayrılır. Supraglottik yapıların gevşekliği inspirasyonda kollapsa neden olur.",
    "tusPearl": "Pediatride yaş, doğum öyküsü, beslenme, aşı/immünite ve acil solunum-dolaşım riski soruyu belirler.",
    "differentialPoint": "Erişkin yaklaşımından farkı yaşa özgü eşikler, congenital nedenler ve hızlı kötüleşme riskidir.",
    "clinicalRelevance": "Pediatride yaş, doğum öyküsü, beslenme, aşı/immünite ve acil solunum-dolaşım riski soruyu belirler.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedTerms": [
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "safeNestedTerms": [
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Koanal atrezi",
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "sourceTextExamples": [
      "Koanal atrezi özellikle beslenmeyle artan siyanoz ve burundan sonda geçememe ile ayrılır."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve pediatri bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-kolon-kanseri",
    "term": "Kolon kanseri",
    "aliases": [
      "Kolon kanseri",
      "kolorektal kanser",
      "kolorektal karsinom"
    ],
    "normalizedTerm": "kolon kanseri",
    "TurkishName": "Kolon kanseri",
    "EnglishName": "",
    "category": "Majör hastalık / onkoloji",
    "subcategory": "onkoloji",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Gastrointestinal kanama, anemi veya dışkılama değişikliğiyle ilişkilendirilen malignite başlığıdır.",
    "preAnswerSafeDefinition": "Gastrointestinal kanama, anemi veya dışkılama değişikliğiyle ilişkilendirilen malignite başlığıdır.",
    "shortDefinition": "Kolon veya rektum mukozasından gelişen malign tümördür.",
    "definition": "Kolon veya rektum mukozasından gelişen malign tümördür.",
    "detailedExplanation": "Sağ kolon kanseri demir eksikliği anemisi, sol kolon kanseri obstrüksiyon/dışkı çapında incelme ile daha çok sorulur.",
    "postAnswerExplanation": "Sağ kolon kanseri demir eksikliği anemisi, sol kolon kanseri obstrüksiyon/dışkı çapında incelme ile daha çok sorulur.",
    "postAnswerExpandedExplanation": "Sağ kolon kanseri demir eksikliği anemisi, sol kolon kanseri obstrüksiyon/dışkı çapında incelme ile daha çok sorulur.",
    "tusPearl": "Yaşlı + demir eksikliği anemisi = GİS malignite dışlanmalı.",
    "differentialPoint": "",
    "clinicalRelevance": "Yaşlı + demir eksikliği anemisi = GİS malignite dışlanmalı.",
    "mechanism": "",
    "relatedBranches": [
      "gastroenterology",
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Kolon kanseri",
      "kolorektal kanser",
      "kolorektal karsinom"
    ],
    "sourceTextExamples": [
      "Kolorektal kanser biyobelirteçleri",
      "Metastatik kolorektal kanserde anti-EGFR tedavi planlanırken hangi mutasyonlar özellikle değerlendirilir?"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 26,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-koryokarsinom-yayilimi",
    "term": "Koryokarsinom yayılımı",
    "aliases": [
      "Koryokarsinom yayılımı"
    ],
    "normalizedTerm": "koryokarsinom yayilimi",
    "TurkishName": "Koryokarsinom yayılımı",
    "EnglishName": "",
    "category": "Kadın Hastalıkları ve Doğum",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Gebelik veya jinekolojik klinik karar bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Gebelik veya jinekolojik klinik karar bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Trofoblastik tümörler erken kan damar invazyonu ve özellikle akciğer metastazı yapabilir.",
    "definition": "Trofoblastik tümörler erken kan damar invazyonu ve özellikle akciğer metastazı yapabilir.",
    "detailedExplanation": "Koryokarsinom yayılımı Trofoblastik tümörler erken kan damar invazyonu ve özellikle akciğer metastazı yapabilir.",
    "postAnswerExplanation": "Koryokarsinom yayılımı Trofoblastik tümörler erken kan damar invazyonu ve özellikle akciğer metastazı yapabilir.",
    "postAnswerExpandedExplanation": "Koryokarsinom yayılımı Trofoblastik tümörler erken kan damar invazyonu ve özellikle akciğer metastazı yapabilir.",
    "tusPearl": "Kadın doğum sorularında gebelik haftası, kanama tipi, enfeksiyon bulgusu ve fetal risk yönetimi birlikte değerlendirilir.",
    "differentialPoint": "Ayırıcı nokta, stabilite, gebelik haftası, kanama/ağrı karakteri ve anne-fetus önceliğidir.",
    "clinicalRelevance": "Kadın doğum sorularında gebelik haftası, kanama tipi, enfeksiyon bulgusu ve fetal risk yönetimi birlikte değerlendirilir.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Koryokarsinom yayılımı"
    ],
    "sourceTextExamples": [
      "Koryokarsinom yayılımı",
      "Koryokarsinom yayılımı"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve kadın hastalıkları ve doğum bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-kronik-miyeloid-losemi",
    "term": "Kronik miyeloid lösemi",
    "aliases": [
      "Kronik miyeloid lösemi"
    ],
    "normalizedTerm": "kronik miyeloid losemi",
    "TurkishName": "Kronik miyeloid lösemi",
    "EnglishName": "",
    "category": "Majör hastalık / hematoloji",
    "subcategory": "hematoloji",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Philadelphia kromozomu ile ilişkili kronik lösemi tipidir.",
    "preAnswerSafeDefinition": "Philadelphia kromozomu ile ilişkili kronik lösemi tipidir.",
    "shortDefinition": "BCR-ABL füzyonu ve granülositik seri artışıyla karakterize miyeloproliferatif neoplazidir.",
    "definition": "BCR-ABL füzyonu ve granülositik seri artışıyla karakterize miyeloproliferatif neoplazidir.",
    "detailedExplanation": "Lökositoz, bazofili ve splenomegali ipuçlarıdır; hedef tedavi tirozin kinaz inhibitörüdür.",
    "postAnswerExplanation": "Lökositoz, bazofili ve splenomegali ipuçlarıdır; hedef tedavi tirozin kinaz inhibitörüdür.",
    "postAnswerExpandedExplanation": "Lökositoz, bazofili ve splenomegali ipuçlarıdır; hedef tedavi tirozin kinaz inhibitörüdür.",
    "tusPearl": "BCR-ABL + splenomegali + bazofili = KML.",
    "differentialPoint": "",
    "clinicalRelevance": "BCR-ABL + splenomegali + bazofili = KML.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Kronik miyeloid lösemi"
    ],
    "sourceTextExamples": [
      "Kronik miyeloid lösemi",
      "Kronik miyeloid lösemi lökositoz ve BCR-ABL füzyonuyla ilişkilidir; Reed-Sternberg hücreli nodal patern değildir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 8,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": [
        {
          "alias": "KML",
          "reason": "unsafe-short-or-low-signal-alias"
        },
        {
          "alias": "CML",
          "reason": "unsafe-short-or-low-signal-alias"
        }
      ]
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-kuduz",
    "term": "Kuduz",
    "aliases": [
      "Kuduz",
      "rabies"
    ],
    "normalizedTerm": "kuduz",
    "TurkishName": "Kuduz",
    "EnglishName": "",
    "category": "Majör hastalık / enfeksiyon",
    "subcategory": "enfeksiyon",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hayvan ısırığı sonrası profilaksi kararı gerektiren ölümcül viral hastalıktır.",
    "preAnswerSafeDefinition": "Hayvan ısırığı sonrası profilaksi kararı gerektiren ölümcül viral hastalıktır.",
    "shortDefinition": "Rabies virüsünün MSS tutulumu ile fatal ensefalit yaptığı zoonotik enfeksiyondur.",
    "definition": "Rabies virüsünün MSS tutulumu ile fatal ensefalit yaptığı zoonotik enfeksiyondur.",
    "detailedExplanation": "Semptom başladıktan sonra mortalite çok yüksektir; bu nedenle temas sonrası yara temizliği, aşı ve gerekirse immünglobulin kritiktir.",
    "postAnswerExplanation": "Semptom başladıktan sonra mortalite çok yüksektir; bu nedenle temas sonrası yara temizliği, aşı ve gerekirse immünglobulin kritiktir.",
    "postAnswerExpandedExplanation": "Semptom başladıktan sonra mortalite çok yüksektir; bu nedenle temas sonrası yara temizliği, aşı ve gerekirse immünglobulin kritiktir.",
    "tusPearl": "Kuduzda tedavi değil temas sonrası profilaksi hayat kurtarır.",
    "differentialPoint": "",
    "clinicalRelevance": "Kuduzda tedavi değil temas sonrası profilaksi hayat kurtarır.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "Etken",
      "Tanı testi",
      "Ampirik tedavi"
    ],
    "safeNestedTerms": [
      "Etken",
      "Tanı testi",
      "Ampirik tedavi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Kuduz",
      "rabies",
      "Etken",
      "Tanı testi",
      "Ampirik tedavi"
    ],
    "sourceTextExamples": [
      "Kuduzda temas öyküsü ve Negri cisimcikleriyle etkeni tanıyabilme",
      "Kuduz enfeksiyonunu destekler."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 34,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-laringomalazi",
    "term": "Laringomalazi",
    "aliases": [
      "Laringomalazi"
    ],
    "normalizedTerm": "laringomalazi",
    "TurkishName": "Laringomalazi",
    "EnglishName": "",
    "category": "Pediatri",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Pediatrik yaş grubunda kullanılan klinik tanı veya yönetim paternidir.",
    "preAnswerSafeDefinition": "Pediatrik yaş grubunda kullanılan klinik tanı veya yönetim paternidir.",
    "shortDefinition": "Üst hava yolunda laringomalaziye bağlı inspiratuvar kollaps Doğru cevap A’dır.",
    "definition": "Üst hava yolunda laringomalaziye bağlı inspiratuvar kollaps Doğru cevap A’dır.",
    "detailedExplanation": "Üst hava yolunda laringomalaziye bağlı inspiratuvar kollaps Doğru cevap A’dır. Yenidoğan respiratuvar distres sendromunda temel sorun surfaktan yetersizliğidir. Surfaktan azalınca alveollerde yüzey gerilimi artar, özellikle ekspirasyon sonunda alveoller kollabe olur ve akciğer kompliyansı düşer. Prematürite en önemli risk faktörüdür çünkü tip II pnömosit gelişimi ve surfaktan üretimi yetersizdir. Antenatal...",
    "postAnswerExplanation": "Üst hava yolunda laringomalaziye bağlı inspiratuvar kollaps Doğru cevap A’dır. Yenidoğan respiratuvar distres sendromunda temel sorun surfaktan yetersizliğidir. Surfaktan azalınca alveollerde yüzey gerilimi artar, özellikle ekspirasyon sonunda alveoller kollabe olur ve akciğer kompliyansı düşer. Prematürite en önemli risk faktörüdür çünkü tip II pnömosit gelişimi ve surfaktan üretimi yetersizdir. Antenatal...",
    "postAnswerExpandedExplanation": "Üst hava yolunda laringomalaziye bağlı inspiratuvar kollaps Doğru cevap A’dır. Yenidoğan respiratuvar distres sendromunda temel sorun surfaktan yetersizliğidir. Surfaktan azalınca alveollerde yüzey gerilimi artar, özellikle ekspirasyon sonunda alveoller kollabe olur ve akciğer kompliyansı düşer. Prematürite en önemli risk faktörüdür çünkü tip II pnömosit gelişimi ve surfaktan üretimi yetersizdir. Antenatal...",
    "tusPearl": "Pediatride yaş, doğum öyküsü, beslenme, aşı/immünite ve acil solunum-dolaşım riski soruyu belirler.",
    "differentialPoint": "Erişkin yaklaşımından farkı yaşa özgü eşikler, congenital nedenler ve hızlı kötüleşme riskidir.",
    "clinicalRelevance": "Pediatride yaş, doğum öyküsü, beslenme, aşı/immünite ve acil solunum-dolaşım riski soruyu belirler.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedTerms": [
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "safeNestedTerms": [
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Laringomalazi",
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "sourceTextExamples": [
      "Üst hava yolunda laringomalaziye bağlı inspiratuvar kollaps",
      "Yanlıştır. Laringomalazi üst hava yolu kollapsı ve stridorla ilişkili olabilir. Prematüre RDS’nin temel mekanizması surfaktan eksikliğidir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 12,
      "confidenceScore": "high",
      "ambiguityRisk": "medium",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve pediatri bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-legionella-idrar-antijeni",
    "term": "Legionella idrar antijeni",
    "aliases": [
      "Legionella idrar antijeni"
    ],
    "normalizedTerm": "legionella idrar antijeni",
    "TurkishName": "Legionella idrar antijeni",
    "EnglishName": "",
    "category": "Mikrobiyoloji / Enfeksiyon",
    "subcategory": "Seroloji / otoantikor",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "preAnswerSafeDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "shortDefinition": "Legionella su sistemlerinden aerosol yoluyla bulaşır ve idrar antijeniyle tanınabilir.",
    "definition": "Legionella su sistemlerinden aerosol yoluyla bulaşır ve idrar antijeniyle tanınabilir.",
    "detailedExplanation": "Legionella idrar antijeni Legionella su sistemlerinden aerosol yoluyla bulaşır ve idrar antijeniyle tanınabilir.",
    "postAnswerExplanation": "Legionella idrar antijeni Legionella su sistemlerinden aerosol yoluyla bulaşır ve idrar antijeniyle tanınabilir.",
    "postAnswerExpandedExplanation": "Legionella idrar antijeni Legionella su sistemlerinden aerosol yoluyla bulaşır ve idrar antijeniyle tanınabilir.",
    "tusPearl": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "differentialPoint": "Benzer etkenlerden ayrım; toksin tipi, klinik tablo, özel tanı testi veya antibiyotik tuzağıdır.",
    "clinicalRelevance": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "nephrology",
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "antijen"
    ],
    "safeNestedTerms": [
      "antijen"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Legionella idrar antijeni",
      "antijen"
    ],
    "sourceTextExamples": [
      "Legionella idrar antijeni",
      "Legionella idrar antijeni"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve mikrobiyoloji / enfeksiyon bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-loop-diuretik-toksisitesi",
    "term": "Loop diüretik toksisitesi",
    "aliases": [
      "Loop diüretik toksisitesi"
    ],
    "normalizedTerm": "loop diuretik toksisitesi",
    "TurkishName": "Loop diüretik toksisitesi",
    "EnglishName": "",
    "category": "Farmakoloji / Tedavi / Toksikoloji",
    "subcategory": "Toksin / toksisite",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "preAnswerSafeDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "shortDefinition": "Loop diüretikler Na-K-2Cl kotransporterini inhibe eder ve yüksek dozda ototoksisite yapabilir.",
    "definition": "Loop diüretikler Na-K-2Cl kotransporterini inhibe eder ve yüksek dozda ototoksisite yapabilir.",
    "detailedExplanation": "Loop diüretik toksisitesi Loop diüretikler Na-K-2Cl kotransporterini inhibe eder ve yüksek dozda ototoksisite yapabilir.",
    "postAnswerExplanation": "Loop diüretik toksisitesi Loop diüretikler Na-K-2Cl kotransporterini inhibe eder ve yüksek dozda ototoksisite yapabilir.",
    "postAnswerExpandedExplanation": "Loop diüretik toksisitesi Loop diüretikler Na-K-2Cl kotransporterini inhibe eder ve yüksek dozda ototoksisite yapabilir.",
    "tusPearl": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "differentialPoint": "Benzer ilaçlardan ayrım, etki hedefi ve spesifik toksisite/antidot ilişkisidir.",
    "clinicalRelevance": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology"
    ],
    "relatedTerms": [
      "yan etki",
      "antidot"
    ],
    "safeNestedTerms": [
      "yan etki",
      "antidot"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Loop diüretik toksisitesi",
      "yan etki",
      "antidot"
    ],
    "sourceTextExamples": [
      "Loop diüretik toksisitesi",
      "Loop diüretik toksisitesi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve farmakoloji / tedavi / toksikoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-makrozomi",
    "term": "Makrozomi",
    "aliases": [
      "Makrozomi",
      "fetal makrozomi"
    ],
    "normalizedTerm": "makrozomi",
    "TurkishName": "Makrozomi",
    "EnglishName": "",
    "category": "Majör hastalık / obstetri-pediatri",
    "subcategory": "obstetri-pediatri",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "İri bebek durumunu ve doğum komplikasyon riskini ifade eder.",
    "preAnswerSafeDefinition": "İri bebek durumunu ve doğum komplikasyon riskini ifade eder.",
    "shortDefinition": "Fetal doğum ağırlığının beklenenden belirgin yüksek olmasıdır.",
    "definition": "Fetal doğum ağırlığının beklenenden belirgin yüksek olmasıdır.",
    "detailedExplanation": "Gestasyonel diyabetle ilişkilidir; omuz distosisi ve doğum travması riskini artırır.",
    "postAnswerExplanation": "Gestasyonel diyabetle ilişkilidir; omuz distosisi ve doğum travması riskini artırır.",
    "postAnswerExpandedExplanation": "Gestasyonel diyabetle ilişkilidir; omuz distosisi ve doğum travması riskini artırır.",
    "tusPearl": "Diyabetik anne + iri bebek = makrozomi/omuz distosisi riski.",
    "differentialPoint": "",
    "clinicalRelevance": "Diyabetik anne + iri bebek = makrozomi/omuz distosisi riski.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology",
      "pediatrics"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Makrozomi",
      "fetal makrozomi"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 0,
      "confidenceScore": "low",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-mannitol-kontrendikasyonu",
    "term": "Mannitol kontrendikasyonu",
    "aliases": [
      "Mannitol kontrendikasyonu"
    ],
    "normalizedTerm": "mannitol kontrendikasyonu",
    "TurkishName": "Mannitol kontrendikasyonu",
    "EnglishName": "",
    "category": "Farmakoloji / Tedavi / Toksikoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "preAnswerSafeDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "shortDefinition": "Osmotik yük intravasküler hacmi artırarak konjesyonu artırabilir.",
    "definition": "Osmotik yük intravasküler hacmi artırarak konjesyonu artırabilir.",
    "detailedExplanation": "Mannitol kontrendikasyonu Osmotik yük intravasküler hacmi artırarak konjesyonu artırabilir.",
    "postAnswerExplanation": "Mannitol kontrendikasyonu Osmotik yük intravasküler hacmi artırarak konjesyonu artırabilir.",
    "postAnswerExpandedExplanation": "Mannitol kontrendikasyonu Osmotik yük intravasküler hacmi artırarak konjesyonu artırabilir.",
    "tusPearl": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "differentialPoint": "Benzer ilaçlardan ayrım, etki hedefi ve spesifik toksisite/antidot ilişkisidir.",
    "clinicalRelevance": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology"
    ],
    "relatedTerms": [
      "yan etki",
      "antidot"
    ],
    "safeNestedTerms": [
      "yan etki",
      "antidot"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Mannitol kontrendikasyonu",
      "yan etki",
      "antidot"
    ],
    "sourceTextExamples": [
      "Mannitol kontrendikasyonu",
      "Mannitol kontrendikasyonu"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve farmakoloji / tedavi / toksikoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-metoklopramid-d2-antagonizmasi",
    "term": "Metoklopramid D2 antagonizması",
    "aliases": [
      "Metoklopramid D2 antagonizması"
    ],
    "normalizedTerm": "metoklopramid d2 antagonizmasi",
    "TurkishName": "Metoklopramid D2 antagonizması",
    "EnglishName": "",
    "category": "Farmakoloji / Tedavi / Toksikoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "preAnswerSafeDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "shortDefinition": "Metoklopramid antiemetik ve prokinetik etkisini temel olarak D2 antagonizması üzerinden gösterir.",
    "definition": "Metoklopramid antiemetik ve prokinetik etkisini temel olarak D2 antagonizması üzerinden gösterir.",
    "detailedExplanation": "Metoklopramid antiemetik ve prokinetik etkisini temel olarak D2 antagonizması üzerinden gösterir. H1 blokajı dimenhidrinat gibi antihistaminiklerle, NK1 antagonizması aprepitantla, selektif 5-HT3 antagonizması ise ondansetron gibi ilaçlarla ilişkilidir. Metoklopramid başlıca dopamin D2 reseptör antagonisti olarak kemoreseptör tetik bölgesinde antiemetik etki gösterir; enterik düzeyde kolinerjik aktiviteyi...",
    "postAnswerExplanation": "Metoklopramid antiemetik ve prokinetik etkisini temel olarak D2 antagonizması üzerinden gösterir. H1 blokajı dimenhidrinat gibi antihistaminiklerle, NK1 antagonizması aprepitantla, selektif 5-HT3 antagonizması ise ondansetron gibi ilaçlarla ilişkilidir. Metoklopramid başlıca dopamin D2 reseptör antagonisti olarak kemoreseptör tetik bölgesinde antiemetik etki gösterir; enterik düzeyde kolinerjik aktiviteyi...",
    "postAnswerExpandedExplanation": "Metoklopramid antiemetik ve prokinetik etkisini temel olarak D2 antagonizması üzerinden gösterir. H1 blokajı dimenhidrinat gibi antihistaminiklerle, NK1 antagonizması aprepitantla, selektif 5-HT3 antagonizması ise ondansetron gibi ilaçlarla ilişkilidir. Metoklopramid başlıca dopamin D2 reseptör antagonisti olarak kemoreseptör tetik bölgesinde antiemetik etki gösterir; enterik düzeyde kolinerjik aktiviteyi...",
    "tusPearl": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "differentialPoint": "Benzer ilaçlardan ayrım, etki hedefi ve spesifik toksisite/antidot ilişkisidir.",
    "clinicalRelevance": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology"
    ],
    "relatedTerms": [
      "yan etki",
      "antidot"
    ],
    "safeNestedTerms": [
      "yan etki",
      "antidot"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Metoklopramid D2 antagonizması",
      "yan etki",
      "antidot"
    ],
    "sourceTextExamples": [
      "Metoklopramid antiemetik ve prokinetik etkisini temel olarak D2 antagonizması üzerinden gösterir. H1 blokajı dimenhidrinat gibi antihistaminiklerle, NK1 antagonizması aprepitantla, selektif 5-HT3 antagonizması ise ondansetron gibi ilaçlarla ilişkilidir.",
      "Metoklopramid sorularında ana ayrım “D2 antagonizması + prokinetik etki + ekstrapiramidal yan etki riski” üçlüsüdür."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve farmakoloji / tedavi / toksikoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-minoksidil-yan-etkisi",
    "term": "Minoksidil yan etkisi",
    "aliases": [
      "Minoksidil yan etkisi"
    ],
    "normalizedTerm": "minoksidil yan etkisi",
    "TurkishName": "Minoksidil yan etkisi",
    "EnglishName": "",
    "category": "Farmakoloji / Tedavi / Toksikoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "preAnswerSafeDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "shortDefinition": "Güçlü arterioler vazodilatör olan minoksidil kıllanma artışı yapabilir.",
    "definition": "Güçlü arterioler vazodilatör olan minoksidil kıllanma artışı yapabilir.",
    "detailedExplanation": "Minoksidil yan etkisi Güçlü arterioler vazodilatör olan minoksidil kıllanma artışı yapabilir.",
    "postAnswerExplanation": "Minoksidil yan etkisi Güçlü arterioler vazodilatör olan minoksidil kıllanma artışı yapabilir.",
    "postAnswerExpandedExplanation": "Minoksidil yan etkisi Güçlü arterioler vazodilatör olan minoksidil kıllanma artışı yapabilir.",
    "tusPearl": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "differentialPoint": "Benzer ilaçlardan ayrım, etki hedefi ve spesifik toksisite/antidot ilişkisidir.",
    "clinicalRelevance": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology"
    ],
    "relatedTerms": [
      "yan etki",
      "antidot"
    ],
    "safeNestedTerms": [
      "yan etki",
      "antidot"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Minoksidil yan etkisi",
      "yan etki",
      "antidot"
    ],
    "sourceTextExamples": [
      "Minoksidil yan etkisi",
      "Minoksidil yan etkisi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addAsSafeNestedTerm",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve farmakoloji / tedavi / toksikoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-mol-gebelik",
    "term": "Mol gebelik",
    "aliases": [
      "Mol gebelik"
    ],
    "normalizedTerm": "mol gebelik",
    "TurkishName": "Mol gebelik",
    "EnglishName": "",
    "category": "Kadın Hastalıkları ve Doğum",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Gebelik veya jinekolojik klinik karar bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Gebelik veya jinekolojik klinik karar bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Gestasyonel trofoblastik hastalıkların tanı ve tedavi sonrası takibinde beta-hCG düzeyleri kullanılır.",
    "definition": "Gestasyonel trofoblastik hastalıkların tanı ve tedavi sonrası takibinde beta-hCG düzeyleri kullanılır.",
    "detailedExplanation": "Gestasyonel trofoblastik hastalıkların tanı ve tedavi sonrası takibinde beta-hCG düzeyleri kullanılır. CA-125 over epitel tümörleriyle, AFP germ hücreli tümörler ve hepatoselüler karsinomla, CEA gastrointestinal malignitelerle daha çok ilişkilidir. Gestasyonel trofoblastik hastalıklar trofoblastik dokudan kaynaklandığı için izlemde seri beta-hCG ölçümü temel belirteçtir. Beta-hCG trofoblastik doku aktivitesini...",
    "postAnswerExplanation": "Gestasyonel trofoblastik hastalıkların tanı ve tedavi sonrası takibinde beta-hCG düzeyleri kullanılır. CA-125 over epitel tümörleriyle, AFP germ hücreli tümörler ve hepatoselüler karsinomla, CEA gastrointestinal malignitelerle daha çok ilişkilidir. Gestasyonel trofoblastik hastalıklar trofoblastik dokudan kaynaklandığı için izlemde seri beta-hCG ölçümü temel belirteçtir. Beta-hCG trofoblastik doku aktivitesini...",
    "postAnswerExpandedExplanation": "Gestasyonel trofoblastik hastalıkların tanı ve tedavi sonrası takibinde beta-hCG düzeyleri kullanılır. CA-125 over epitel tümörleriyle, AFP germ hücreli tümörler ve hepatoselüler karsinomla, CEA gastrointestinal malignitelerle daha çok ilişkilidir. Gestasyonel trofoblastik hastalıklar trofoblastik dokudan kaynaklandığı için izlemde seri beta-hCG ölçümü temel belirteçtir. Beta-hCG trofoblastik doku aktivitesini...",
    "tusPearl": "Kadın doğum sorularında gebelik haftası, kanama tipi, enfeksiyon bulgusu ve fetal risk yönetimi birlikte değerlendirilir.",
    "differentialPoint": "Ayırıcı nokta, stabilite, gebelik haftası, kanama/ağrı karakteri ve anne-fetus önceliğidir.",
    "clinicalRelevance": "Kadın doğum sorularında gebelik haftası, kanama tipi, enfeksiyon bulgusu ve fetal risk yönetimi birlikte değerlendirilir.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Mol gebelik"
    ],
    "sourceTextExamples": [
      "Gestasyonel trofoblastik hastalıkların tanı ve tedavi sonrası takibinde beta-hCG düzeyleri kullanılır. CA-125 over epitel tümörleriyle, AFP germ hücreli tümörler ve hepatoselüler karsinomla, CEA gastrointestinal malignitelerle daha çok ilişkilidir.",
      "Mol gebelik ve gestasyonel trofoblastik neoplazi takibinde seri beta-hCG düşüş paterni kritik sınav bilgisidir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 18,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve kadın hastalıkları ve doğum bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-multipl-miyelom",
    "term": "Multipl miyelom",
    "aliases": [
      "Multipl miyelom",
      "multiple myeloma"
    ],
    "normalizedTerm": "multipl miyelom",
    "TurkishName": "Multipl miyelom",
    "EnglishName": "",
    "category": "Majör hastalık / hematoloji",
    "subcategory": "hematoloji",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Kemik ağrısı, anemi, böbrek bozukluğu ve hiperkalsemiyle ilişkili plazma hücre hastalığıdır.",
    "preAnswerSafeDefinition": "Kemik ağrısı, anemi, böbrek bozukluğu ve hiperkalsemiyle ilişkili plazma hücre hastalığıdır.",
    "shortDefinition": "Plazma hücre proliferasyonu ve monoklonal protein üretimiyle seyreden malignitedir.",
    "definition": "Plazma hücre proliferasyonu ve monoklonal protein üretimiyle seyreden malignitedir.",
    "detailedExplanation": "CRAB bulguları ve serum/idrarda monoklonal protein tanısal düşünceyi yönlendirir.",
    "postAnswerExplanation": "CRAB bulguları ve serum/idrarda monoklonal protein tanısal düşünceyi yönlendirir.",
    "postAnswerExpandedExplanation": "CRAB bulguları ve serum/idrarda monoklonal protein tanısal düşünceyi yönlendirir.",
    "tusPearl": "CRAB + M proteini = multipl miyelom.",
    "differentialPoint": "",
    "clinicalRelevance": "CRAB + M proteini = multipl miyelom.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Multipl miyelom",
      "multiple myeloma"
    ],
    "sourceTextExamples": [
      "Multipl miyelom yaşlılarda litik kemik lezyonları ve plazma hücre proliferasyonuyla seyreder."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 21,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "promoteRelatedTermToEntry",
      "existingGlossaryStatus": "relatedOrNestedOnly",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Terim relatedTerms/safeNestedTerms içinde yakalanmış; fakat kullanıcı tooltipte doğrudan öğrenebileceği bağımsız kavram hâline getirilmeli.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-myastenik-kriz",
    "term": "Myastenik kriz",
    "aliases": [
      "Myastenik kriz",
      "miyastenik kriz"
    ],
    "normalizedTerm": "myastenik kriz",
    "TurkishName": "Myastenik kriz",
    "EnglishName": "",
    "category": "Majör hastalık / nöroloji acil",
    "subcategory": "nöroloji acil",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Nöromüsküler kavşak hastalığının solunum yetmezliği riski taşıyan ağırlaşmasıdır.",
    "preAnswerSafeDefinition": "Nöromüsküler kavşak hastalığının solunum yetmezliği riski taşıyan ağırlaşmasıdır.",
    "shortDefinition": "Myastenia gravis hastasında solunum veya yutma kaslarının ciddi güçsüzlüğe ilerlediği acil durumdur.",
    "definition": "Myastenia gravis hastasında solunum veya yutma kaslarının ciddi güçsüzlüğe ilerlediği acil durumdur.",
    "detailedExplanation": "Ptosis/diplopi zemininde dispne, disfaji veya düşük vital kapasite varsa yoğun bakım ve IVIG/plazmaferez gündeme gelir.",
    "postAnswerExplanation": "Ptosis/diplopi zemininde dispne, disfaji veya düşük vital kapasite varsa yoğun bakım ve IVIG/plazmaferez gündeme gelir.",
    "postAnswerExpandedExplanation": "Ptosis/diplopi zemininde dispne, disfaji veya düşük vital kapasite varsa yoğun bakım ve IVIG/plazmaferez gündeme gelir.",
    "tusPearl": "MG + solunum/yutma güçlüğü = myastenik kriz.",
    "differentialPoint": "",
    "clinicalRelevance": "MG + solunum/yutma güçlüğü = myastenik kriz.",
    "mechanism": "",
    "relatedBranches": [
      "neurology",
      "surgery",
      "emergency"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Myastenik kriz",
      "miyastenik kriz"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 0,
      "confidenceScore": "low",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-nefrotik-sendromda-antitrombin-iii-kaybi",
    "term": "Nefrotik sendromda antitrombin III kaybı",
    "aliases": [
      "Nefrotik sendromda antitrombin III kaybı"
    ],
    "normalizedTerm": "nefrotik sendromda antitrombin iii kaybi",
    "TurkishName": "Nefrotik sendromda antitrombin III kaybı",
    "EnglishName": "",
    "category": "İç Hastalıkları / Klinik Karar",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Nefrotik sendromda antitrombin kaybı ve hiperkoagülabilite tromboz riskini artırır.",
    "definition": "Nefrotik sendromda antitrombin kaybı ve hiperkoagülabilite tromboz riskini artırır.",
    "detailedExplanation": "Nefrotik sendromda antitrombin kaybı ve hiperkoagülabilite tromboz riskini artırır. Minimal değişiklik hastalığı çocukta sık olsa da renal ven trombozu klasik olarak membranözle anılır.",
    "postAnswerExplanation": "Nefrotik sendromda antitrombin kaybı ve hiperkoagülabilite tromboz riskini artırır. Minimal değişiklik hastalığı çocukta sık olsa da renal ven trombozu klasik olarak membranözle anılır.",
    "postAnswerExpandedExplanation": "Nefrotik sendromda antitrombin kaybı ve hiperkoagülabilite tromboz riskini artırır. Minimal değişiklik hastalığı çocukta sık olsa da renal ven trombozu klasik olarak membranözle anılır.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [
      "nefrotik sendrom"
    ],
    "safeNestedTerms": [
      "nefrotik sendrom"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "Nefrotik sendromda antitrombin III kaybı",
      "nefrotik sendrom"
    ],
    "sourceTextExamples": [
      "Nefrotik sendromda antitrombin kaybı ve hiperkoagülabilite tromboz riskini artırır."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve i̇ç hastalıkları / klinik karar bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-nefrotik-sendromda-hiperlipidemi-ve-tromboz-egilimi",
    "term": "Nefrotik sendromda hiperlipidemi ve tromboz eğilimi",
    "aliases": [
      "Nefrotik sendromda hiperlipidemi ve tromboz eğilimi"
    ],
    "normalizedTerm": "nefrotik sendromda hiperlipidemi ve tromboz egilimi",
    "TurkishName": "Nefrotik sendromda hiperlipidemi ve tromboz eğilimi",
    "EnglishName": "",
    "category": "İç Hastalıkları / Klinik Karar",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Tromboz eğilimi olan ergen Uzun ince vücut yapısı, lens subluksasyonu, tromboz eğilimi, yüksek homosistein ve yüksek metiyonin, transsülfürasyon yolunda cystathionine beta-synthase eksikliğini düşündürür.",
    "definition": "Tromboz eğilimi olan ergen Uzun ince vücut yapısı, lens subluksasyonu, tromboz eğilimi, yüksek homosistein ve yüksek metiyonin, transsülfürasyon yolunda cystathionine beta-synthase eksikliğini düşündürür.",
    "detailedExplanation": "Tromboz eğilimi olan ergen Uzun ince vücut yapısı, lens subluksasyonu, tromboz eğilimi, yüksek homosistein ve yüksek metiyonin, transsülfürasyon yolunda cystathionine beta-synthase eksikliğini düşündürür. Bu defekt homosisteinin sisteine dönüşümünü bozar ve damar endoteli üzerinde pro-trombotik etki oluşturur.",
    "postAnswerExplanation": "Tromboz eğilimi olan ergen Uzun ince vücut yapısı, lens subluksasyonu, tromboz eğilimi, yüksek homosistein ve yüksek metiyonin, transsülfürasyon yolunda cystathionine beta-synthase eksikliğini düşündürür. Bu defekt homosisteinin sisteine dönüşümünü bozar ve damar endoteli üzerinde pro-trombotik etki oluşturur.",
    "postAnswerExpandedExplanation": "Tromboz eğilimi olan ergen Uzun ince vücut yapısı, lens subluksasyonu, tromboz eğilimi, yüksek homosistein ve yüksek metiyonin, transsülfürasyon yolunda cystathionine beta-synthase eksikliğini düşündürür. Bu defekt homosisteinin sisteine dönüşümünü bozar ve damar endoteli üzerinde pro-trombotik etki oluşturur.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [
      "tromboz",
      "nefrotik sendrom"
    ],
    "safeNestedTerms": [
      "tromboz",
      "nefrotik sendrom"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Nefrotik sendromda hiperlipidemi ve tromboz eğilimi",
      "tromboz",
      "nefrotik sendrom"
    ],
    "sourceTextExamples": [
      "Tromboz eğilimi olan ergen",
      "Uzun ince vücut yapısı, lens subluksasyonu, tromboz eğilimi, yüksek homosistein ve yüksek metiyonin, transsülfürasyon yolunda cystathionine beta-synthase eksikliğini düşündürür."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve i̇ç hastalıkları / klinik karar bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-nitrat-mekanizmasi",
    "term": "Nitrat mekanizması",
    "aliases": [
      "Nitrat mekanizması"
    ],
    "normalizedTerm": "nitrat mekanizmasi",
    "TurkishName": "Nitrat mekanizması",
    "EnglishName": "",
    "category": "Farmakoloji / Tedavi / Toksikoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "preAnswerSafeDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "shortDefinition": "Nitrik oksit guanilat siklazı aktive eder ve cGMP aracılığıyla düz kas gevşer.",
    "definition": "Nitrik oksit guanilat siklazı aktive eder ve cGMP aracılığıyla düz kas gevşer.",
    "detailedExplanation": "Nitrat mekanizması Nitrik oksit guanilat siklazı aktive eder ve cGMP aracılığıyla düz kas gevşer.",
    "postAnswerExplanation": "Nitrat mekanizması Nitrik oksit guanilat siklazı aktive eder ve cGMP aracılığıyla düz kas gevşer.",
    "postAnswerExpandedExplanation": "Nitrat mekanizması Nitrik oksit guanilat siklazı aktive eder ve cGMP aracılığıyla düz kas gevşer.",
    "tusPearl": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "differentialPoint": "Benzer ilaçlardan ayrım, etki hedefi ve spesifik toksisite/antidot ilişkisidir.",
    "clinicalRelevance": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology"
    ],
    "relatedTerms": [
      "yan etki",
      "antidot"
    ],
    "safeNestedTerms": [
      "yan etki",
      "antidot"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Nitrat mekanizması",
      "yan etki",
      "antidot"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve farmakoloji / tedavi / toksikoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-pankreas-adenokarsinomu",
    "term": "Pankreas adenokarsinomu",
    "aliases": [
      "Pankreas adenokarsinomu",
      "pankreas kanseri"
    ],
    "normalizedTerm": "pankreas adenokarsinomu",
    "TurkishName": "Pankreas adenokarsinomu",
    "EnglishName": "",
    "category": "Majör hastalık / onkoloji",
    "subcategory": "onkoloji",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Pankreas kaynaklı ciddi malign hastalığı ifade eder.",
    "preAnswerSafeDefinition": "Pankreas kaynaklı ciddi malign hastalığı ifade eder.",
    "shortDefinition": "Pankreasın çoğunlukla duktal epitelinden gelişen, kilo kaybı ve ağrısız sarılıkla seyredebilien malignitesidir.",
    "definition": "Pankreasın çoğunlukla duktal epitelinden gelişen, kilo kaybı ve ağrısız sarılıkla seyredebilien malignitesidir.",
    "detailedExplanation": "Painless jaundice, kilo kaybı ve Courvoisier bulgusu baş bölgesi tümörünü düşündürür; akut hepatit gibi ağrılı/inflamatuvar tablolardan ayrılır.",
    "postAnswerExplanation": "Painless jaundice, kilo kaybı ve Courvoisier bulgusu baş bölgesi tümörünü düşündürür; akut hepatit gibi ağrılı/inflamatuvar tablolardan ayrılır.",
    "postAnswerExpandedExplanation": "Painless jaundice, kilo kaybı ve Courvoisier bulgusu baş bölgesi tümörünü düşündürür; akut hepatit gibi ağrılı/inflamatuvar tablolardan ayrılır.",
    "tusPearl": "Ağrısız sarılık + kilo kaybı = pankreas başı kanseri düşün.",
    "differentialPoint": "",
    "clinicalRelevance": "Ağrısız sarılık + kilo kaybı = pankreas başı kanseri düşün.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Pankreas adenokarsinomu",
      "pankreas kanseri"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 0,
      "confidenceScore": "low",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-perianal-apse",
    "term": "Perianal apse",
    "aliases": [
      "Perianal apse"
    ],
    "normalizedTerm": "perianal apse",
    "TurkishName": "Perianal apse",
    "EnglishName": "",
    "category": "Cerrahi / Acil",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Cerrahi aciliyet veya girişim planlamasıyla ilişkili güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Cerrahi aciliyet veya girişim planlamasıyla ilişkili güvenli bir kavramdır.",
    "shortDefinition": "Kabızlık ve sert dışkılama sonrası dışkılama sırasında cam kesiği tarzında ağrı, tuvalet kâğıdında parlak kırmızı kan ve posterior orta hatta lineer yırtık akut anal fissür için tipiktir.",
    "definition": "Kabızlık ve sert dışkılama sonrası dışkılama sırasında cam kesiği tarzında ağrı, tuvalet kâğıdında parlak kırmızı kan ve posterior orta hatta lineer yırtık akut anal fissür için tipiktir.",
    "detailedExplanation": "Perianal apse Kabızlık ve sert dışkılama sonrası dışkılama sırasında cam kesiği tarzında ağrı, tuvalet kâğıdında parlak kırmızı kan ve posterior orta hatta lineer yırtık akut anal fissür için tipiktir. Perianal apse veya maligniteyi düşündürecek fluktuasyon, sistemik belirti ya da kilo kaybı verilmemiştir.",
    "postAnswerExplanation": "Perianal apse Kabızlık ve sert dışkılama sonrası dışkılama sırasında cam kesiği tarzında ağrı, tuvalet kâğıdında parlak kırmızı kan ve posterior orta hatta lineer yırtık akut anal fissür için tipiktir. Perianal apse veya maligniteyi düşündürecek fluktuasyon, sistemik belirti ya da kilo kaybı verilmemiştir.",
    "postAnswerExpandedExplanation": "Perianal apse Kabızlık ve sert dışkılama sonrası dışkılama sırasında cam kesiği tarzında ağrı, tuvalet kâğıdında parlak kırmızı kan ve posterior orta hatta lineer yırtık akut anal fissür için tipiktir. Perianal apse veya maligniteyi düşündürecek fluktuasyon, sistemik belirti ya da kilo kaybı verilmemiştir.",
    "tusPearl": "Cerrahi sorularda peritonit, iskemi, kanama, hava yolu/solunum ve hemodinamik instabilite karar önceliğini değiştirir.",
    "differentialPoint": "Ayırıcı nokta, konservatif izlem mi yoksa acil girişim mi gerektiğidir.",
    "clinicalRelevance": "Cerrahi sorularda peritonit, iskemi, kanama, hava yolu/solunum ve hemodinamik instabilite karar önceliğini değiştirir.",
    "mechanism": "",
    "relatedBranches": [
      "surgery",
      "emergency"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Perianal apse"
    ],
    "sourceTextExamples": [
      "Kabızlık ve sert dışkılama sonrası dışkılama sırasında cam kesiği tarzında ağrı, tuvalet kâğıdında parlak kırmızı kan ve posterior orta hatta lineer yırtık akut anal fissür için tipiktir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 11,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve cerrahi / acil bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-pilonidal-sinus",
    "term": "Pilonidal sinüs",
    "aliases": [
      "Pilonidal sinüs"
    ],
    "normalizedTerm": "pilonidal sinus",
    "TurkishName": "Pilonidal sinüs",
    "EnglishName": "",
    "category": "Cerrahi / Acil",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Cerrahi aciliyet veya girişim planlamasıyla ilişkili güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Cerrahi aciliyet veya girişim planlamasıyla ilişkili güvenli bir kavramdır.",
    "shortDefinition": "Dışkılama sırasında cam kesiği tarzında şiddetli ağrı, az miktarda parlak kanama, kabızlık öyküsü ve posterior orta hatta lineer yırtık anal fissür için tipiktir.",
    "definition": "Dışkılama sırasında cam kesiği tarzında şiddetli ağrı, az miktarda parlak kanama, kabızlık öyküsü ve posterior orta hatta lineer yırtık anal fissür için tipiktir.",
    "detailedExplanation": "Pilonidal sinüs Dışkılama sırasında cam kesiği tarzında şiddetli ağrı, az miktarda parlak kanama, kabızlık öyküsü ve posterior orta hatta lineer yırtık anal fissür için tipiktir. İç hemoroid kanaması genellikle ağrısızdır.",
    "postAnswerExplanation": "Pilonidal sinüs Dışkılama sırasında cam kesiği tarzında şiddetli ağrı, az miktarda parlak kanama, kabızlık öyküsü ve posterior orta hatta lineer yırtık anal fissür için tipiktir. İç hemoroid kanaması genellikle ağrısızdır.",
    "postAnswerExpandedExplanation": "Pilonidal sinüs Dışkılama sırasında cam kesiği tarzında şiddetli ağrı, az miktarda parlak kanama, kabızlık öyküsü ve posterior orta hatta lineer yırtık anal fissür için tipiktir. İç hemoroid kanaması genellikle ağrısızdır.",
    "tusPearl": "Cerrahi sorularda peritonit, iskemi, kanama, hava yolu/solunum ve hemodinamik instabilite karar önceliğini değiştirir.",
    "differentialPoint": "Ayırıcı nokta, konservatif izlem mi yoksa acil girişim mi gerektiğidir.",
    "clinicalRelevance": "Cerrahi sorularda peritonit, iskemi, kanama, hava yolu/solunum ve hemodinamik instabilite karar önceliğini değiştirir.",
    "mechanism": "",
    "relatedBranches": [
      "surgery",
      "emergency"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Pilonidal sinüs"
    ],
    "sourceTextExamples": [
      "Pilonidal sinüs sakrokoksigeal bölgede akıntılı sinüs veya apseyle ilişkilidir; anal kanal yırtığı değildir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 4,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve cerrahi / acil bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-pirazinamid-yan-etkisi",
    "term": "Pirazinamid yan etkisi",
    "aliases": [
      "Pirazinamid yan etkisi"
    ],
    "normalizedTerm": "pirazinamid yan etkisi",
    "TurkishName": "Pirazinamid yan etkisi",
    "EnglishName": "",
    "category": "Farmakoloji / Tedavi / Toksikoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "preAnswerSafeDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "shortDefinition": "Ürik asit atılımını azaltabilir ve gut benzeri yakınmaları tetikleyebilir.",
    "definition": "Ürik asit atılımını azaltabilir ve gut benzeri yakınmaları tetikleyebilir.",
    "detailedExplanation": "Pirazinamid yan etkisi Ürik asit atılımını azaltabilir ve gut benzeri yakınmaları tetikleyebilir.",
    "postAnswerExplanation": "Pirazinamid yan etkisi Ürik asit atılımını azaltabilir ve gut benzeri yakınmaları tetikleyebilir.",
    "postAnswerExpandedExplanation": "Pirazinamid yan etkisi Ürik asit atılımını azaltabilir ve gut benzeri yakınmaları tetikleyebilir.",
    "tusPearl": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "differentialPoint": "Benzer ilaçlardan ayrım, etki hedefi ve spesifik toksisite/antidot ilişkisidir.",
    "clinicalRelevance": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology"
    ],
    "relatedTerms": [
      "yan etki",
      "antidot"
    ],
    "safeNestedTerms": [
      "yan etki",
      "antidot"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Pirazinamid yan etkisi",
      "yan etki",
      "antidot"
    ],
    "sourceTextExamples": [
      "Pirazinamid yan etkisi",
      "Pirazinamid yan etkisi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addAsSafeNestedTerm",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve farmakoloji / tedavi / toksikoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-plazma-serbest-metanefrin",
    "term": "Plazma serbest metanefrin",
    "aliases": [
      "Plazma serbest metanefrin"
    ],
    "normalizedTerm": "plazma serbest metanefrin",
    "TurkishName": "Plazma serbest metanefrin",
    "EnglishName": "",
    "category": "İç Hastalıkları / Klinik Karar",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "definition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "detailedExplanation": "Plazma serbest metanefrin düzeyi. Katekolamin metabolitleri feokromositoma taramasında duyarlı belirteçlerdir.",
    "postAnswerExplanation": "Plazma serbest metanefrin düzeyi. Katekolamin metabolitleri feokromositoma taramasında duyarlı belirteçlerdir.",
    "postAnswerExpandedExplanation": "Plazma serbest metanefrin düzeyi. Katekolamin metabolitleri feokromositoma taramasında duyarlı belirteçlerdir.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Plazma serbest metanefrin"
    ],
    "sourceTextExamples": [
      "Plazma serbest metanefrin düzeyi.",
      "Plazma serbest metanefrin düzeyi."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve i̇ç hastalıkları / klinik karar bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-pneumocystis-jirovecii",
    "term": "Pneumocystis jirovecii",
    "aliases": [
      "Pneumocystis jirovecii"
    ],
    "normalizedTerm": "pneumocystis jirovecii",
    "TurkishName": "Pneumocystis jirovecii",
    "EnglishName": "",
    "category": "Mikrobiyoloji / Enfeksiyon",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "preAnswerSafeDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "shortDefinition": "Antibiyotik kullanımı ve diyabet zemininde silinebilir oral beyaz plaklar kandidiyazisi düşündürür.",
    "definition": "Antibiyotik kullanımı ve diyabet zemininde silinebilir oral beyaz plaklar kandidiyazisi düşündürür.",
    "detailedExplanation": "Pneumocystis jirovecii Antibiyotik kullanımı ve diyabet zemininde silinebilir oral beyaz plaklar kandidiyazisi düşündürür. KOH incelemesinde maya ve psödohif görülmesi, germ tüp testinin pozitif olması Candida albicans lehinedir.",
    "postAnswerExplanation": "Pneumocystis jirovecii Antibiyotik kullanımı ve diyabet zemininde silinebilir oral beyaz plaklar kandidiyazisi düşündürür. KOH incelemesinde maya ve psödohif görülmesi, germ tüp testinin pozitif olması Candida albicans lehinedir.",
    "postAnswerExpandedExplanation": "Pneumocystis jirovecii Antibiyotik kullanımı ve diyabet zemininde silinebilir oral beyaz plaklar kandidiyazisi düşündürür. KOH incelemesinde maya ve psödohif görülmesi, germ tüp testinin pozitif olması Candida albicans lehinedir.",
    "tusPearl": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "differentialPoint": "Benzer etkenlerden ayrım; toksin tipi, klinik tablo, özel tanı testi veya antibiyotik tuzağıdır.",
    "clinicalRelevance": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "safeNestedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Pneumocystis jirovecii",
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "sourceTextExamples": [
      "Pneumocystis jirovecii",
      "Pneumocystis jirovecii immünsüprese hastalarda pnömoni yapar; oral silinebilir plak ve germ tüp testiyle uyumlu değildir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve mikrobiyoloji / enfeksiyon bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-preterm-dogum",
    "term": "Preterm doğum",
    "aliases": [
      "Preterm doğum",
      "erken doğum"
    ],
    "normalizedTerm": "preterm dogum",
    "TurkishName": "Preterm doğum",
    "EnglishName": "",
    "category": "Majör hastalık / obstetri",
    "subcategory": "obstetri",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Erken gebelik haftasında doğum riski veya eylemini ifade eder.",
    "preAnswerSafeDefinition": "Erken gebelik haftasında doğum riski veya eylemini ifade eder.",
    "shortDefinition": "37. gebelik haftasından önce doğumun gerçekleşmesi veya doğum eyleminin başlamasıdır.",
    "definition": "37. gebelik haftasından önce doğumun gerçekleşmesi veya doğum eyleminin başlamasıdır.",
    "detailedExplanation": "Servikal değişiklikle birlikte düzenli kontraksiyon varsa preterm eylem düşünülür; steroid, tokoliz ve MgSO4 kararları gebelik haftasına bağlıdır.",
    "postAnswerExplanation": "Servikal değişiklikle birlikte düzenli kontraksiyon varsa preterm eylem düşünülür; steroid, tokoliz ve MgSO4 kararları gebelik haftasına bağlıdır.",
    "postAnswerExpandedExplanation": "Servikal değişiklikle birlikte düzenli kontraksiyon varsa preterm eylem düşünülür; steroid, tokoliz ve MgSO4 kararları gebelik haftasına bağlıdır.",
    "tusPearl": "Preterm eylem sorusunda gebelik haftası tedaviyi belirler.",
    "differentialPoint": "",
    "clinicalRelevance": "Preterm eylem sorusunda gebelik haftası tedaviyi belirler.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Preterm doğum",
      "erken doğum"
    ],
    "sourceTextExamples": [
      "Anne erken membran rüptürü olmadan spontan erken doğum yapmıştır. Antenatal steroid uygulamasının tamamlanamadığı öğreniliyor. Doğum ağırlığı gebelik haftasına uygundur.",
      "Anne erken membran rüptürü olmadan spontan erken doğum yapmıştır. Antenatal steroid uygulamasının tamamlanamadığı öğreniliyor. Doğum ağırlığı gebelik haftasına uygundur."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 7,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-prolaktinoma-hook-etkisi",
    "term": "Prolaktinoma hook etkisi",
    "aliases": [
      "Prolaktinoma hook etkisi"
    ],
    "normalizedTerm": "prolaktinoma hook etkisi",
    "TurkishName": "Prolaktinoma hook etkisi",
    "EnglishName": "",
    "category": "İç Hastalıkları / Klinik Karar",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Çok yüksek antijen düzeyinde laboratuvar sonucunun olduğundan düşük ölçülebileceğini anlatan tuzak kavramdır.",
    "preAnswerSafeDefinition": "Çok yüksek antijen düzeyinde laboratuvar sonucunun olduğundan düşük ölçülebileceğini anlatan tuzak kavramdır.",
    "shortDefinition": "Hook etkisi, çok yüksek prolaktin düzeylerinde immünoassay doyumu nedeniyle ölçümün yalancı düşük çıkabilmesidir.",
    "definition": "Hook etkisi, çok yüksek prolaktin düzeylerinde immünoassay doyumu nedeniyle ölçümün yalancı düşük çıkabilmesidir.",
    "detailedExplanation": "Büyük hipofiz adenomu ve beklenenden düşük prolaktin varsa serum dilüe edilerek yeniden ölçüm düşünülür.",
    "postAnswerExplanation": "Büyük hipofiz adenomu ve beklenenden düşük prolaktin varsa serum dilüe edilerek yeniden ölçüm düşünülür.",
    "postAnswerExpandedExplanation": "Büyük hipofiz adenomu ve beklenenden düşük prolaktin varsa serum dilüe edilerek yeniden ölçüm düşünülür.",
    "tusPearl": "Makroadenom + düşük/uyumsuz prolaktin = hook effect tuzağı.",
    "differentialPoint": "Benzer semptom yapan durumdan farkı, spesifik mekanizma/laboratuvar paterninin birlikte verilmesidir.",
    "clinicalRelevance": "Makroadenom + düşük/uyumsuz prolaktin = hook effect tuzağı.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Prolaktinoma hook etkisi"
    ],
    "sourceTextExamples": [
      "Prolaktinoma hook etkisi",
      "Prolaktinoma hook etkisi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addAsSafeNestedTerm",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve i̇ç hastalıkları / klinik karar bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-rh-immun-globulin",
    "term": "Rh immün globulin",
    "aliases": [
      "Rh immün globulin"
    ],
    "normalizedTerm": "rh immun globulin",
    "TurkishName": "Rh immün globulin",
    "EnglishName": "",
    "category": "Kadın Hastalıkları ve Doğum",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Gebelik veya jinekolojik klinik karar bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Gebelik veya jinekolojik klinik karar bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Anti-D fetal Rh pozitif eritrositlere karşı maternal alloimmünizasyonu önler.",
    "definition": "Anti-D fetal Rh pozitif eritrositlere karşı maternal alloimmünizasyonu önler.",
    "detailedExplanation": "Rh immün globulin Anti-D fetal Rh pozitif eritrositlere karşı maternal alloimmünizasyonu önler.",
    "postAnswerExplanation": "Rh immün globulin Anti-D fetal Rh pozitif eritrositlere karşı maternal alloimmünizasyonu önler.",
    "postAnswerExpandedExplanation": "Rh immün globulin Anti-D fetal Rh pozitif eritrositlere karşı maternal alloimmünizasyonu önler.",
    "tusPearl": "Kadın doğum sorularında gebelik haftası, kanama tipi, enfeksiyon bulgusu ve fetal risk yönetimi birlikte değerlendirilir.",
    "differentialPoint": "Ayırıcı nokta, stabilite, gebelik haftası, kanama/ağrı karakteri ve anne-fetus önceliğidir.",
    "clinicalRelevance": "Kadın doğum sorularında gebelik haftası, kanama tipi, enfeksiyon bulgusu ve fetal risk yönetimi birlikte değerlendirilir.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Rh immün globulin"
    ],
    "sourceTextExamples": [
      "Yüksek doz intravenöz immünglobulin"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve kadın hastalıkları ve doğum bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-rokuronyum-vekuronyum-enkapsulasyonu",
    "term": "Rokuronyum/vekuronyum enkapsülasyonu",
    "aliases": [
      "Rokuronyum/vekuronyum enkapsülasyonu"
    ],
    "normalizedTerm": "rokuronyum/vekuronyum enkapsulasyonu",
    "TurkishName": "Rokuronyum/vekuronyum enkapsülasyonu",
    "EnglishName": "",
    "category": "Farmakoloji / Tedavi / Toksikoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "preAnswerSafeDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "shortDefinition": "Rokuronyum aminosteroid yapılı nondepolarizan nöromüsküler blokördür ve sugammadeks tarafından bağlanarak etkisi hızlı biçimde geri çevrilebilir.",
    "definition": "Rokuronyum aminosteroid yapılı nondepolarizan nöromüsküler blokördür ve sugammadeks tarafından bağlanarak etkisi hızlı biçimde geri çevrilebilir.",
    "detailedExplanation": "Rokuronyum aminosteroid yapılı nondepolarizan nöromüsküler blokördür ve sugammadeks tarafından bağlanarak etkisi hızlı biçimde geri çevrilebilir. Süksinilkolin depolarizan blokördür; sisatrakuryum ve atrasuryum ise benzilizokinolinyum grubundadır ve sugammadeksin temel hedefleri değildir. Sugammadeks, siklodekstrin yapılı bir ajandır ve aminosteroid nondepolarizan nöromüsküler blokörleri özellikle rokuronyum ve...",
    "postAnswerExplanation": "Rokuronyum aminosteroid yapılı nondepolarizan nöromüsküler blokördür ve sugammadeks tarafından bağlanarak etkisi hızlı biçimde geri çevrilebilir. Süksinilkolin depolarizan blokördür; sisatrakuryum ve atrasuryum ise benzilizokinolinyum grubundadır ve sugammadeksin temel hedefleri değildir. Sugammadeks, siklodekstrin yapılı bir ajandır ve aminosteroid nondepolarizan nöromüsküler blokörleri özellikle rokuronyum ve...",
    "postAnswerExpandedExplanation": "Rokuronyum aminosteroid yapılı nondepolarizan nöromüsküler blokördür ve sugammadeks tarafından bağlanarak etkisi hızlı biçimde geri çevrilebilir. Süksinilkolin depolarizan blokördür; sisatrakuryum ve atrasuryum ise benzilizokinolinyum grubundadır ve sugammadeksin temel hedefleri değildir. Sugammadeks, siklodekstrin yapılı bir ajandır ve aminosteroid nondepolarizan nöromüsküler blokörleri özellikle rokuronyum ve...",
    "tusPearl": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "differentialPoint": "Benzer ilaçlardan ayrım, etki hedefi ve spesifik toksisite/antidot ilişkisidir.",
    "clinicalRelevance": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology"
    ],
    "relatedTerms": [
      "yan etki",
      "antidot"
    ],
    "safeNestedTerms": [
      "yan etki",
      "antidot"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Rokuronyum/vekuronyum enkapsülasyonu",
      "yan etki",
      "antidot"
    ],
    "sourceTextExamples": [
      "Rokuronyum aminosteroid yapılı nondepolarizan nöromüsküler blokördür ve sugammadeks tarafından bağlanarak etkisi hızlı biçimde geri çevrilebilir.",
      "Sugammadeks sorularında ana ayrım asetilkolinesteraz inhibisyonu değil, rokuronyum/vekuronyumun doğrudan enkapsülasyonudur."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve farmakoloji / tedavi / toksikoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-shigella-dizanterisi",
    "term": "Shigella dizanterisi",
    "aliases": [
      "Shigella dizanterisi"
    ],
    "normalizedTerm": "shigella dizanterisi",
    "TurkishName": "Shigella dizanterisi",
    "EnglishName": "",
    "category": "Mikrobiyoloji / Enfeksiyon",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "preAnswerSafeDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "shortDefinition": "Shigella kolonik mukozayı invaze eder ve inflamatuvar dizanteri tablosu oluşturur.",
    "definition": "Shigella kolonik mukozayı invaze eder ve inflamatuvar dizanteri tablosu oluşturur.",
    "detailedExplanation": "Shigella dizanterisi Shigella kolonik mukozayı invaze eder ve inflamatuvar dizanteri tablosu oluşturur.",
    "postAnswerExplanation": "Shigella dizanterisi Shigella kolonik mukozayı invaze eder ve inflamatuvar dizanteri tablosu oluşturur.",
    "postAnswerExpandedExplanation": "Shigella dizanterisi Shigella kolonik mukozayı invaze eder ve inflamatuvar dizanteri tablosu oluşturur.",
    "tusPearl": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "differentialPoint": "Benzer etkenlerden ayrım; toksin tipi, klinik tablo, özel tanı testi veya antibiyotik tuzağıdır.",
    "clinicalRelevance": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "safeNestedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Shigella dizanterisi",
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "sourceTextExamples": [
      "Shigella dizanterisinde antibiyotik bazı durumlarda kullanılabilir; EHEC yaklaşımı ayrıdır."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve mikrobiyoloji / enfeksiyon bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-sisplatin-toksisitesi",
    "term": "Sisplatin toksisitesi",
    "aliases": [
      "Sisplatin toksisitesi"
    ],
    "normalizedTerm": "sisplatin toksisitesi",
    "TurkishName": "Sisplatin toksisitesi",
    "EnglishName": "",
    "category": "Farmakoloji / Tedavi / Toksikoloji",
    "subcategory": "Toksin / toksisite",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "preAnswerSafeDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "shortDefinition": "Platin bileşikleri böbrek tübülleri ve işitme sistemi üzerinde toksik etki gösterebilir.",
    "definition": "Platin bileşikleri böbrek tübülleri ve işitme sistemi üzerinde toksik etki gösterebilir.",
    "detailedExplanation": "Sisplatin toksisitesi Platin bileşikleri böbrek tübülleri ve işitme sistemi üzerinde toksik etki gösterebilir.",
    "postAnswerExplanation": "Sisplatin toksisitesi Platin bileşikleri böbrek tübülleri ve işitme sistemi üzerinde toksik etki gösterebilir.",
    "postAnswerExpandedExplanation": "Sisplatin toksisitesi Platin bileşikleri böbrek tübülleri ve işitme sistemi üzerinde toksik etki gösterebilir.",
    "tusPearl": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "differentialPoint": "Benzer ilaçlardan ayrım, etki hedefi ve spesifik toksisite/antidot ilişkisidir.",
    "clinicalRelevance": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology"
    ],
    "relatedTerms": [
      "yan etki",
      "antidot"
    ],
    "safeNestedTerms": [
      "yan etki",
      "antidot"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Sisplatin toksisitesi",
      "yan etki",
      "antidot"
    ],
    "sourceTextExamples": [
      "Sisplatin toksisitesi",
      "Sisplatin toksisitesi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve farmakoloji / tedavi / toksikoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-skleroderma-renal-kriz",
    "term": "Skleroderma renal kriz",
    "aliases": [
      "Skleroderma renal kriz",
      "skleroderma böbrek krizi"
    ],
    "normalizedTerm": "skleroderma renal kriz",
    "TurkishName": "Skleroderma renal kriz",
    "EnglishName": "",
    "category": "Majör hastalık / romatoloji-nefroloji acil",
    "subcategory": "romatoloji-nefroloji acil",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Sistemik skleroz zemininde hipertansif renal acil tablosudur.",
    "preAnswerSafeDefinition": "Sistemik skleroz zemininde hipertansif renal acil tablosudur.",
    "shortDefinition": "Sistemik sklerozda ani ağır hipertansiyon ve böbrek yetmezliğiyle seyreden acil komplikasyondur.",
    "definition": "Sistemik sklerozda ani ağır hipertansiyon ve böbrek yetmezliğiyle seyreden acil komplikasyondur.",
    "detailedExplanation": "Tedavide ACE inhibitörü kullanımı klasik ayırıcı noktadır; yüksek doz steroid risk artırabilir.",
    "postAnswerExplanation": "Tedavide ACE inhibitörü kullanımı klasik ayırıcı noktadır; yüksek doz steroid risk artırabilir.",
    "postAnswerExpandedExplanation": "Tedavide ACE inhibitörü kullanımı klasik ayırıcı noktadır; yüksek doz steroid risk artırabilir.",
    "tusPearl": "Sistemik skleroz + ani hipertansiyon/AKI = renal kriz.",
    "differentialPoint": "",
    "clinicalRelevance": "Sistemik skleroz + ani hipertansiyon/AKI = renal kriz.",
    "mechanism": "",
    "relatedBranches": [
      "nephrology",
      "rheumatology",
      "immunology",
      "surgery",
      "emergency"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Skleroderma renal kriz",
      "skleroderma böbrek krizi"
    ],
    "sourceTextExamples": [
      "Skleroderma renal kriz",
      "Skleroderma renal krizinde renin-anjiyotensin sistemi aktivasyonu belirgindir; ACE inhibitörü prognozu iyileştirir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 5,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-streptococcus-agalactiae",
    "term": "Streptococcus agalactiae",
    "aliases": [
      "Streptococcus agalactiae"
    ],
    "normalizedTerm": "streptococcus agalactiae",
    "TurkishName": "Streptococcus agalactiae",
    "EnglishName": "",
    "category": "Mikrobiyoloji / Enfeksiyon",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "preAnswerSafeDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "shortDefinition": "İmmünsüprese hastada akciğer enfeksiyonu ile beyin apsesi birlikteliği ve zayıf aside dirençli dallanan filamentli bakteriler Nocardia enfeksiyonunu düşündürür.",
    "definition": "İmmünsüprese hastada akciğer enfeksiyonu ile beyin apsesi birlikteliği ve zayıf aside dirençli dallanan filamentli bakteriler Nocardia enfeksiyonunu düşündürür.",
    "detailedExplanation": "Streptococcus agalactiae İmmünsüprese hastada akciğer enfeksiyonu ile beyin apsesi birlikteliği ve zayıf aside dirençli dallanan filamentli bakteriler Nocardia enfeksiyonunu düşündürür. Nocardia aerobiktir ve dissemine hastalık yapabilir.",
    "postAnswerExplanation": "Streptococcus agalactiae İmmünsüprese hastada akciğer enfeksiyonu ile beyin apsesi birlikteliği ve zayıf aside dirençli dallanan filamentli bakteriler Nocardia enfeksiyonunu düşündürür. Nocardia aerobiktir ve dissemine hastalık yapabilir.",
    "postAnswerExpandedExplanation": "Streptococcus agalactiae İmmünsüprese hastada akciğer enfeksiyonu ile beyin apsesi birlikteliği ve zayıf aside dirençli dallanan filamentli bakteriler Nocardia enfeksiyonunu düşündürür. Nocardia aerobiktir ve dissemine hastalık yapabilir.",
    "tusPearl": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "differentialPoint": "Benzer etkenlerden ayrım; toksin tipi, klinik tablo, özel tanı testi veya antibiyotik tuzağıdır.",
    "clinicalRelevance": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "safeNestedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Streptococcus agalactiae",
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "sourceTextExamples": [
      "Streptococcus agalactiae",
      "Streptococcus agalactiae yenidoğan enfeksiyonlarıyla ilişkilidir; zayıf aside dirençli filamentli bakteri değildir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 7,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve mikrobiyoloji / enfeksiyon bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-streptococcus-pyogenes",
    "term": "Streptococcus pyogenes",
    "aliases": [
      "Streptococcus pyogenes"
    ],
    "normalizedTerm": "streptococcus pyogenes",
    "TurkishName": "Streptococcus pyogenes",
    "EnglishName": "",
    "category": "Mikrobiyoloji / Enfeksiyon",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "preAnswerSafeDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "shortDefinition": "Hasarlı doğal kapak, dental işlem sonrası subakut ateşli seyir ve kan kültüründe viridans grup streptokok üremesi subakut enfektif endokardit için tipiktir.",
    "definition": "Hasarlı doğal kapak, dental işlem sonrası subakut ateşli seyir ve kan kültüründe viridans grup streptokok üremesi subakut enfektif endokardit için tipiktir.",
    "detailedExplanation": "Streptococcus pyogenes Hasarlı doğal kapak, dental işlem sonrası subakut ateşli seyir ve kan kültüründe viridans grup streptokok üremesi subakut enfektif endokardit için tipiktir. Streptococcus viridans ağız florasından geçici bakteriyemiyle kapak yüzeyine tutunabilir.",
    "postAnswerExplanation": "Streptococcus pyogenes Hasarlı doğal kapak, dental işlem sonrası subakut ateşli seyir ve kan kültüründe viridans grup streptokok üremesi subakut enfektif endokardit için tipiktir. Streptococcus viridans ağız florasından geçici bakteriyemiyle kapak yüzeyine tutunabilir.",
    "postAnswerExpandedExplanation": "Streptococcus pyogenes Hasarlı doğal kapak, dental işlem sonrası subakut ateşli seyir ve kan kültüründe viridans grup streptokok üremesi subakut enfektif endokardit için tipiktir. Streptococcus viridans ağız florasından geçici bakteriyemiyle kapak yüzeyine tutunabilir.",
    "tusPearl": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "differentialPoint": "Benzer etkenlerden ayrım; toksin tipi, klinik tablo, özel tanı testi veya antibiyotik tuzağıdır.",
    "clinicalRelevance": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "safeNestedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Streptococcus pyogenes",
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "sourceTextExamples": [
      "Streptococcus pyogenes",
      "Streptococcus pyogenes farenjit ve yumuşak doku enfeksiyonlarında önemlidir ancak dental işlem sonrası subakut kapak enfeksiyonunun klasik etkeni değildir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 29,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve mikrobiyoloji / enfeksiyon bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-subglottik-stenoz",
    "term": "Subglottik stenoz",
    "aliases": [
      "Subglottik stenoz"
    ],
    "normalizedTerm": "subglottik stenoz",
    "TurkishName": "Subglottik stenoz",
    "EnglishName": "",
    "category": "Pediatri",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Pediatrik yaş grubunda kullanılan klinik tanı veya yönetim paternidir.",
    "preAnswerSafeDefinition": "Pediatrik yaş grubunda kullanılan klinik tanı veya yönetim paternidir.",
    "shortDefinition": "Entübasyon travması subglottik bölgede skar ve daralma oluşturabilir.",
    "definition": "Entübasyon travması subglottik bölgede skar ve daralma oluşturabilir.",
    "detailedExplanation": "Subglottik stenoz Entübasyon travması subglottik bölgede skar ve daralma oluşturabilir.",
    "postAnswerExplanation": "Subglottik stenoz Entübasyon travması subglottik bölgede skar ve daralma oluşturabilir.",
    "postAnswerExpandedExplanation": "Subglottik stenoz Entübasyon travması subglottik bölgede skar ve daralma oluşturabilir.",
    "tusPearl": "Pediatride yaş, doğum öyküsü, beslenme, aşı/immünite ve acil solunum-dolaşım riski soruyu belirler.",
    "differentialPoint": "Erişkin yaklaşımından farkı yaşa özgü eşikler, congenital nedenler ve hızlı kötüleşme riskidir.",
    "clinicalRelevance": "Pediatride yaş, doğum öyküsü, beslenme, aşı/immünite ve acil solunum-dolaşım riski soruyu belirler.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedTerms": [
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "safeNestedTerms": [
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Subglottik stenoz",
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 4,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve pediatri bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-tetanoz",
    "term": "Tetanoz",
    "aliases": [
      "Tetanoz",
      "tetanus"
    ],
    "normalizedTerm": "tetanoz",
    "TurkishName": "Tetanoz",
    "EnglishName": "",
    "category": "Majör hastalık / enfeksiyon",
    "subcategory": "enfeksiyon",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Kirli yara sonrası trismus ve kas spazmlarıyla giden toksin aracılı hastalıktır.",
    "preAnswerSafeDefinition": "Kirli yara sonrası trismus ve kas spazmlarıyla giden toksin aracılı hastalıktır.",
    "shortDefinition": "Clostridium tetani toksiniyle inhibitör nörotransmitter salınımının bozulduğu spastik paralizi tablosudur.",
    "definition": "Clostridium tetani toksiniyle inhibitör nörotransmitter salınımının bozulduğu spastik paralizi tablosudur.",
    "detailedExplanation": "Tetanospazmin GABA/glisin salınımını azaltır; tedavi yara bakımı, immünglobulin, metronidazol ve destek tedavisini içerir.",
    "postAnswerExplanation": "Tetanospazmin GABA/glisin salınımını azaltır; tedavi yara bakımı, immünglobulin, metronidazol ve destek tedavisini içerir.",
    "postAnswerExpandedExplanation": "Tetanospazmin GABA/glisin salınımını azaltır; tedavi yara bakımı, immünglobulin, metronidazol ve destek tedavisini içerir.",
    "tusPearl": "Kirli yara + trismus = tetanoz.",
    "differentialPoint": "",
    "clinicalRelevance": "Kirli yara + trismus = tetanoz.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "Etken",
      "Tanı testi",
      "Ampirik tedavi"
    ],
    "safeNestedTerms": [
      "Etken",
      "Tanı testi",
      "Ampirik tedavi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Tetanoz",
      "tetanus",
      "Etken",
      "Tanı testi",
      "Ampirik tedavi"
    ],
    "sourceTextExamples": [
      "Tetanoz toksininin sinaptik inhibitör nörotransmitter salınımı üzerindeki etkisini açıklayabilme",
      "Kirli derin yara sonrası trismus ve uyarıyla artan yaygın kas spazmları tetanoz tablosunu düşündürür."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 49,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-toxoplasma-ensefaliti",
    "term": "Toxoplasma ensefaliti",
    "aliases": [
      "Toxoplasma ensefaliti"
    ],
    "normalizedTerm": "toxoplasma ensefaliti",
    "TurkishName": "Toxoplasma ensefaliti",
    "EnglishName": "",
    "category": "Mikrobiyoloji / Enfeksiyon",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "preAnswerSafeDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "shortDefinition": "Toxoplasma latent enfeksiyonun reaktivasyonu ile çoklu beyin lezyonları yapabilir.",
    "definition": "Toxoplasma latent enfeksiyonun reaktivasyonu ile çoklu beyin lezyonları yapabilir.",
    "detailedExplanation": "Toxoplasma ensefaliti Toxoplasma latent enfeksiyonun reaktivasyonu ile çoklu beyin lezyonları yapabilir.",
    "postAnswerExplanation": "Toxoplasma ensefaliti Toxoplasma latent enfeksiyonun reaktivasyonu ile çoklu beyin lezyonları yapabilir.",
    "postAnswerExpandedExplanation": "Toxoplasma ensefaliti Toxoplasma latent enfeksiyonun reaktivasyonu ile çoklu beyin lezyonları yapabilir.",
    "tusPearl": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "differentialPoint": "Benzer etkenlerden ayrım; toksin tipi, klinik tablo, özel tanı testi veya antibiyotik tuzağıdır.",
    "clinicalRelevance": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "safeNestedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Toxoplasma ensefaliti",
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "sourceTextExamples": [
      "Toxoplasma ensefaliti",
      "Toxoplasma ensefaliti"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve mikrobiyoloji / enfeksiyon bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-travmada-peritonit",
    "term": "Travmada peritonit",
    "aliases": [
      "Travmada peritonit"
    ],
    "normalizedTerm": "travmada peritonit",
    "TurkishName": "Travmada peritonit",
    "EnglishName": "",
    "category": "Cerrahi / Acil",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Cerrahi aciliyet veya girişim planlamasıyla ilişkili güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Cerrahi aciliyet veya girişim planlamasıyla ilişkili güvenli bir kavramdır.",
    "shortDefinition": "Hemodinamik instabilite ve peritonit görüntüleme beklemeden cerrahi eksplorasyon gerektirir.",
    "definition": "Hemodinamik instabilite ve peritonit görüntüleme beklemeden cerrahi eksplorasyon gerektirir.",
    "detailedExplanation": "Travmada peritonit Hemodinamik instabilite ve peritonit görüntüleme beklemeden cerrahi eksplorasyon gerektirir.",
    "postAnswerExplanation": "Travmada peritonit Hemodinamik instabilite ve peritonit görüntüleme beklemeden cerrahi eksplorasyon gerektirir.",
    "postAnswerExpandedExplanation": "Travmada peritonit Hemodinamik instabilite ve peritonit görüntüleme beklemeden cerrahi eksplorasyon gerektirir.",
    "tusPearl": "Cerrahi sorularda peritonit, iskemi, kanama, hava yolu/solunum ve hemodinamik instabilite karar önceliğini değiştirir.",
    "differentialPoint": "Ayırıcı nokta, konservatif izlem mi yoksa acil girişim mi gerektiğidir.",
    "clinicalRelevance": "Cerrahi sorularda peritonit, iskemi, kanama, hava yolu/solunum ve hemodinamik instabilite karar önceliğini değiştirir.",
    "mechanism": "",
    "relatedBranches": [
      "surgery",
      "emergency"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Travmada peritonit"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve cerrahi / acil bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-trigeminal-nevralji",
    "term": "Trigeminal nevralji",
    "aliases": [
      "Trigeminal nevralji",
      "trigeminal neuralgia"
    ],
    "normalizedTerm": "trigeminal nevralji",
    "TurkishName": "Trigeminal nevralji",
    "EnglishName": "",
    "category": "Majör hastalık / nöroloji",
    "subcategory": "nöroloji",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Yüzde paroksismal nöropatik ağrı yapan nörolojik tablodur.",
    "preAnswerSafeDefinition": "Yüzde paroksismal nöropatik ağrı yapan nörolojik tablodur.",
    "shortDefinition": "Trigeminal sinir dağılımında kısa, elektrik çarpması tarzında yüz ağrısı ataklarıdır.",
    "definition": "Trigeminal sinir dağılımında kısa, elektrik çarpması tarzında yüz ağrısı ataklarıdır.",
    "detailedExplanation": "Dokunma, çiğneme veya diş fırçalama tetikleyebilir; karbamazepin klasik tedavidir.",
    "postAnswerExplanation": "Dokunma, çiğneme veya diş fırçalama tetikleyebilir; karbamazepin klasik tedavidir.",
    "postAnswerExpandedExplanation": "Dokunma, çiğneme veya diş fırçalama tetikleyebilir; karbamazepin klasik tedavidir.",
    "tusPearl": "Elektrik çarpar tarzda yüz ağrısı = trigeminal nevralji.",
    "differentialPoint": "",
    "clinicalRelevance": "Elektrik çarpar tarzda yüz ağrısı = trigeminal nevralji.",
    "mechanism": "",
    "relatedBranches": [
      "neurology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Trigeminal nevralji",
      "trigeminal neuralgia"
    ],
    "sourceTextExamples": [
      "Trigeminal nevralji kısa süreli şiddetli yüz ağrısı yapar; mimik kas güçsüzlüğü oluşturmaz."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 4,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-uterin-ruptur",
    "term": "Uterin rüptür",
    "aliases": [
      "Uterin rüptür",
      "rahim yırtılması"
    ],
    "normalizedTerm": "uterin ruptur",
    "TurkishName": "Uterin rüptür",
    "EnglishName": "",
    "category": "Majör hastalık / obstetrik acil",
    "subcategory": "obstetrik acil",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anne ve fetus için hayatı tehdit eden obstetrik acil durumdur.",
    "preAnswerSafeDefinition": "Anne ve fetus için hayatı tehdit eden obstetrik acil durumdur.",
    "shortDefinition": "Uterus duvarının gebelik veya doğum sırasında yırtılmasıdır.",
    "definition": "Uterus duvarının gebelik veya doğum sırasında yırtılmasıdır.",
    "detailedExplanation": "Önceki sezaryen, ani karın ağrısı, fetal distres ve kontraksiyonların kaybolması ipuçlarıdır.",
    "postAnswerExplanation": "Önceki sezaryen, ani karın ağrısı, fetal distres ve kontraksiyonların kaybolması ipuçlarıdır.",
    "postAnswerExpandedExplanation": "Önceki sezaryen, ani karın ağrısı, fetal distres ve kontraksiyonların kaybolması ipuçlarıdır.",
    "tusPearl": "VBAC + ani ağrı/fetal distres = uterin rüptür düşün.",
    "differentialPoint": "",
    "clinicalRelevance": "VBAC + ani ağrı/fetal distres = uterin rüptür düşün.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology",
      "surgery",
      "emergency"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Uterin rüptür",
      "rahim yırtılması"
    ],
    "sourceTextExamples": [
      "Fundal bası anterior omzu daha da sıkıştırabilir ve uterin rüptür ile fetal yaralanma riskini artırdığı için uygun değildir.",
      "Fundal bası anterior omzu daha da sıkıştırabilir ve uterin rüptür ile fetal yaralanma riskini artırdığı için uygun değildir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 7,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-varicella-zoster-immunoglobulini",
    "term": "Varicella-zoster immünoglobulini",
    "aliases": [
      "Varicella-zoster immünoglobulini"
    ],
    "normalizedTerm": "varicella-zoster immunoglobulini",
    "TurkishName": "Varicella-zoster immünoglobulini",
    "EnglishName": "",
    "category": "Mikrobiyoloji / Enfeksiyon",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "preAnswerSafeDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "shortDefinition": "Doğum çevresindeki maternal varisella yenidoğanda ağır enfeksiyon riski taşır.",
    "definition": "Doğum çevresindeki maternal varisella yenidoğanda ağır enfeksiyon riski taşır.",
    "detailedExplanation": "Varicella-zoster immünoglobulini. Doğum çevresindeki maternal varisella yenidoğanda ağır enfeksiyon riski taşır.",
    "postAnswerExplanation": "Varicella-zoster immünoglobulini. Doğum çevresindeki maternal varisella yenidoğanda ağır enfeksiyon riski taşır.",
    "postAnswerExpandedExplanation": "Varicella-zoster immünoglobulini. Doğum çevresindeki maternal varisella yenidoğanda ağır enfeksiyon riski taşır.",
    "tusPearl": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "differentialPoint": "Benzer etkenlerden ayrım; toksin tipi, klinik tablo, özel tanı testi veya antibiyotik tuzağıdır.",
    "clinicalRelevance": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "safeNestedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Varicella-zoster immünoglobulini",
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "sourceTextExamples": [
      "Varicella-zoster immünoglobulini.",
      "Varicella-zoster immünoglobulini."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve mikrobiyoloji / enfeksiyon bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-vinkristin-toksisitesi",
    "term": "Vinkristin toksisitesi",
    "aliases": [
      "Vinkristin toksisitesi"
    ],
    "normalizedTerm": "vinkristin toksisitesi",
    "TurkishName": "Vinkristin toksisitesi",
    "EnglishName": "",
    "category": "Farmakoloji / Tedavi / Toksikoloji",
    "subcategory": "Toksin / toksisite",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "preAnswerSafeDefinition": "İlaç etkisi, yan etki, antidot veya güvenlik kararıyla ilişkili klinik farmakoloji terimidir.",
    "shortDefinition": "Mikrotübül dinamiğini bozması aksonal taşınmayı etkiler.",
    "definition": "Mikrotübül dinamiğini bozması aksonal taşınmayı etkiler.",
    "detailedExplanation": "Vinkristin toksisitesi Mikrotübül dinamiğini bozması aksonal taşınmayı etkiler.",
    "postAnswerExplanation": "Vinkristin toksisitesi Mikrotübül dinamiğini bozması aksonal taşınmayı etkiler.",
    "postAnswerExpandedExplanation": "Vinkristin toksisitesi Mikrotübül dinamiğini bozması aksonal taşınmayı etkiler.",
    "tusPearl": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "differentialPoint": "Benzer ilaçlardan ayrım, etki hedefi ve spesifik toksisite/antidot ilişkisidir.",
    "clinicalRelevance": "Farmakoloji sorusunda ilaç adını değil; hedef molekül, beklenen yarar, hayatı tehdit eden yan etki ve antidotu eşleştir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology"
    ],
    "relatedTerms": [
      "yan etki",
      "antidot"
    ],
    "safeNestedTerms": [
      "yan etki",
      "antidot"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Vinkristin toksisitesi",
      "yan etki",
      "antidot"
    ],
    "sourceTextExamples": [
      "Vinkristin toksisitesi",
      "Vinkristin toksisitesi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve farmakoloji / tedavi / toksikoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-x-bagli-adrenolokodistrofi",
    "term": "X bağlı adrenolökodistrofi",
    "aliases": [
      "X bağlı adrenolökodistrofi"
    ],
    "normalizedTerm": "x bagli adrenolokodistrofi",
    "TurkishName": "X bağlı adrenolökodistrofi",
    "EnglishName": "",
    "category": "Pediatri",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Pediatrik yaş grubunda kullanılan klinik tanı veya yönetim paternidir.",
    "preAnswerSafeDefinition": "Pediatrik yaş grubunda kullanılan klinik tanı veya yönetim paternidir.",
    "shortDefinition": "Peroksizomal beta oksidasyon bozukluğu beyaz cevher ve adrenal korteksi etkiler.",
    "definition": "Peroksizomal beta oksidasyon bozukluğu beyaz cevher ve adrenal korteksi etkiler.",
    "detailedExplanation": "X bağlı adrenolökodistrofi Peroksizomal beta oksidasyon bozukluğu beyaz cevher ve adrenal korteksi etkiler.",
    "postAnswerExplanation": "X bağlı adrenolökodistrofi Peroksizomal beta oksidasyon bozukluğu beyaz cevher ve adrenal korteksi etkiler.",
    "postAnswerExpandedExplanation": "X bağlı adrenolökodistrofi Peroksizomal beta oksidasyon bozukluğu beyaz cevher ve adrenal korteksi etkiler.",
    "tusPearl": "Pediatride yaş, doğum öyküsü, beslenme, aşı/immünite ve acil solunum-dolaşım riski soruyu belirler.",
    "differentialPoint": "Erişkin yaklaşımından farkı yaşa özgü eşikler, congenital nedenler ve hızlı kötüleşme riskidir.",
    "clinicalRelevance": "Pediatride yaş, doğum öyküsü, beslenme, aşı/immünite ve acil solunum-dolaşım riski soruyu belirler.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedTerms": [
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "safeNestedTerms": [
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "X bağlı adrenolökodistrofi",
      "yenidoğan/çocuk ipucu",
      "acil yaklaşım"
    ],
    "sourceTextExamples": [
      "X bağlı adrenolökodistrofi",
      "X bağlı adrenolökodistrofi."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 3,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve pediatri bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-yenidogan-sepsisi",
    "term": "Yenidoğan sepsisi",
    "aliases": [
      "Yenidoğan sepsisi",
      "neonatal sepsis"
    ],
    "normalizedTerm": "yenidogan sepsisi",
    "TurkishName": "Yenidoğan sepsisi",
    "EnglishName": "",
    "category": "Majör hastalık / pediatri-enfeksiyon",
    "subcategory": "pediatri-enfeksiyon",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Yenidoğanda ateş, hipotermi, beslenme bozukluğu veya letarjiyle gelebilen enfeksiyon acilidir.",
    "preAnswerSafeDefinition": "Yenidoğanda ateş, hipotermi, beslenme bozukluğu veya letarjiyle gelebilen enfeksiyon acilidir.",
    "shortDefinition": "Yenidoğanda sistemik enfeksiyon ve organ disfonksiyonu riskiyle seyreden ciddi tablodur.",
    "definition": "Yenidoğanda sistemik enfeksiyon ve organ disfonksiyonu riskiyle seyreden ciddi tablodur.",
    "detailedExplanation": "Erken başlangıçlı sepsiste GBS ve E. coli önemlidir; yenidoğanda bulgular silik olabilir ve ampirik tedavi geciktirilmez.",
    "postAnswerExplanation": "Erken başlangıçlı sepsiste GBS ve E. coli önemlidir; yenidoğanda bulgular silik olabilir ve ampirik tedavi geciktirilmez.",
    "postAnswerExpandedExplanation": "Erken başlangıçlı sepsiste GBS ve E. coli önemlidir; yenidoğanda bulgular silik olabilir ve ampirik tedavi geciktirilmez.",
    "tusPearl": "Yenidoğan + letarji/beslenememe/ısı instabilitesi = sepsis düşün.",
    "differentialPoint": "",
    "clinicalRelevance": "Yenidoğan + letarji/beslenememe/ısı instabilitesi = sepsis düşün.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics",
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "Etken",
      "Tanı testi",
      "Ampirik tedavi"
    ],
    "safeNestedTerms": [
      "Etken",
      "Tanı testi",
      "Ampirik tedavi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Yenidoğan sepsisi",
      "neonatal sepsis",
      "Etken",
      "Tanı testi",
      "Ampirik tedavi"
    ],
    "sourceTextExamples": [
      "Yenidoğan sepsisinde klinik bulgularla ampirik antibiyotik başlanmasını seçebilme",
      "Yenidoğan sepsisinde ateş şart değildir; hipotermi ve beslenme bozulması da acil ampirik antibiyotik gerektirir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 33,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-yersinia-enterocolitica",
    "term": "Yersinia enterocolitica",
    "aliases": [
      "Yersinia enterocolitica"
    ],
    "normalizedTerm": "yersinia enterocolitica",
    "TurkishName": "Yersinia enterocolitica",
    "EnglishName": "",
    "category": "Mikrobiyoloji / Enfeksiyon",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "preAnswerSafeDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "shortDefinition": "Deferoksamin siderofor gibi davranarak Yersinia büyümesini kolaylaştırabilir.",
    "definition": "Deferoksamin siderofor gibi davranarak Yersinia büyümesini kolaylaştırabilir.",
    "detailedExplanation": "Yersinia enterocolitica. Deferoksamin siderofor gibi davranarak Yersinia büyümesini kolaylaştırabilir.",
    "postAnswerExplanation": "Yersinia enterocolitica. Deferoksamin siderofor gibi davranarak Yersinia büyümesini kolaylaştırabilir.",
    "postAnswerExpandedExplanation": "Yersinia enterocolitica. Deferoksamin siderofor gibi davranarak Yersinia büyümesini kolaylaştırabilir.",
    "tusPearl": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "differentialPoint": "Benzer etkenlerden ayrım; toksin tipi, klinik tablo, özel tanı testi veya antibiyotik tuzağıdır.",
    "clinicalRelevance": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "safeNestedTerms": [
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Yersinia enterocolitica",
      "etken",
      "tanı testi",
      "ampirik tedavi"
    ],
    "sourceTextExamples": [
      "Yersinia enterocolitica.",
      "Yersinia enterocolitica."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve mikrobiyoloji / enfeksiyon bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-yuksek-idrar-sodyumu",
    "term": "Yüksek idrar sodyumu",
    "aliases": [
      "Yüksek idrar sodyumu"
    ],
    "normalizedTerm": "yuksek idrar sodyumu",
    "TurkishName": "Yüksek idrar sodyumu",
    "EnglishName": "",
    "category": "İç Hastalıkları / Klinik Karar",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Övolemik hiponatremi, yüksek idrar ozmolalitesi ve yüksek idrar sodyumu ne düşündürür?",
    "definition": "Övolemik hiponatremi, yüksek idrar ozmolalitesi ve yüksek idrar sodyumu ne düşündürür?",
    "detailedExplanation": "Övolemik hiponatremi, yüksek idrar ozmolalitesi ve yüksek idrar sodyumu ne düşündürür? ADH uygunsuz yüksekliğine bağlı serbest su tutulumu vardır.",
    "postAnswerExplanation": "Övolemik hiponatremi, yüksek idrar ozmolalitesi ve yüksek idrar sodyumu ne düşündürür? ADH uygunsuz yüksekliğine bağlı serbest su tutulumu vardır.",
    "postAnswerExpandedExplanation": "Övolemik hiponatremi, yüksek idrar ozmolalitesi ve yüksek idrar sodyumu ne düşündürür? ADH uygunsuz yüksekliğine bağlı serbest su tutulumu vardır.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "nephrology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Yüksek idrar sodyumu"
    ],
    "sourceTextExamples": [
      "Övolemik hiponatremi, yüksek idrar ozmolalitesi ve yüksek idrar sodyumu ne düşündürür?",
      "Övolemik hiponatremi, yüksek idrar ozmolalitesi ve yüksek idrar sodyumu ne düşündürür?"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve i̇ç hastalıkları / klinik karar bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-idrar-legionella-antijen-testi",
    "term": "İdrar Legionella antijen testi",
    "aliases": [
      "İdrar Legionella antijen testi"
    ],
    "normalizedTerm": "idrar legionella antijen testi",
    "TurkishName": "İdrar Legionella antijen testi",
    "EnglishName": "",
    "category": "Mikrobiyoloji / Enfeksiyon",
    "subcategory": "Seroloji / otoantikor",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "preAnswerSafeDefinition": "Bir enfeksiyon etkeni, toksin, tanı testi veya profilaksi ilişkisini ifade eder.",
    "shortDefinition": "Atipik pnömoni, gastrointestinal bulgu, hiponatremi ve su sistemi/klima maruziyeti birlikteliği Legionella lehinedir.",
    "definition": "Atipik pnömoni, gastrointestinal bulgu, hiponatremi ve su sistemi/klima maruziyeti birlikteliği Legionella lehinedir.",
    "detailedExplanation": "İdrar Legionella antijen testi. Atipik pnömoni, gastrointestinal bulgu, hiponatremi ve su sistemi/klima maruziyeti birlikteliği Legionella lehinedir.",
    "postAnswerExplanation": "İdrar Legionella antijen testi. Atipik pnömoni, gastrointestinal bulgu, hiponatremi ve su sistemi/klima maruziyeti birlikteliği Legionella lehinedir.",
    "postAnswerExpandedExplanation": "İdrar Legionella antijen testi. Atipik pnömoni, gastrointestinal bulgu, hiponatremi ve su sistemi/klima maruziyeti birlikteliği Legionella lehinedir.",
    "tusPearl": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "differentialPoint": "Benzer etkenlerden ayrım; toksin tipi, klinik tablo, özel tanı testi veya antibiyotik tuzağıdır.",
    "clinicalRelevance": "Mikrobiyoloji sorularında etken adı tek başına değil; toksin, rezervuar, klinik sendrom ve test ilişkisiyle hatırlanmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "antijen"
    ],
    "safeNestedTerms": [
      "antijen"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "İdrar Legionella antijen testi",
      "antijen"
    ],
    "sourceTextExamples": [
      "İdrar Legionella antijen testi.",
      "İdrar Legionella antijen testi."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve mikrobiyoloji / enfeksiyon bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-intrauterin-gelisme-geriligi",
    "term": "İntrauterin gelişme geriliği",
    "aliases": [
      "İntrauterin gelişme geriliği",
      "IUGR",
      "fetal growth restriction"
    ],
    "normalizedTerm": "intrauterin gelisme geriligi",
    "TurkishName": "İntrauterin gelişme geriliği",
    "EnglishName": "",
    "category": "Majör hastalık / obstetri",
    "subcategory": "obstetri",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Fetal büyüme kısıtlılığını ifade eden obstetrik kavramdır.",
    "preAnswerSafeDefinition": "Fetal büyüme kısıtlılığını ifade eden obstetrik kavramdır.",
    "shortDefinition": "Fetal büyümenin gebelik yaşına göre beklenenden geri olmasıdır.",
    "definition": "Fetal büyümenin gebelik yaşına göre beklenenden geri olmasıdır.",
    "detailedExplanation": "Plasental yetmezlik, hipertansiyon ve sigara önemli nedenlerdir; simetrik/asimetrik ayrımı etioloji için ipucu verir.",
    "postAnswerExplanation": "Plasental yetmezlik, hipertansiyon ve sigara önemli nedenlerdir; simetrik/asimetrik ayrımı etioloji için ipucu verir.",
    "postAnswerExpandedExplanation": "Plasental yetmezlik, hipertansiyon ve sigara önemli nedenlerdir; simetrik/asimetrik ayrımı etioloji için ipucu verir.",
    "tusPearl": "Hipertansif gebelik + küçük fetus = IUGR/FGR düşün.",
    "differentialPoint": "",
    "clinicalRelevance": "Hipertansif gebelik + küçük fetus = IUGR/FGR düşün.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "İntrauterin gelişme geriliği",
      "IUGR",
      "fetal growth restriction"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 0,
      "confidenceScore": "low",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "",
      "reasonForRecommendation": "Mevcut aktif glossary’de canonical entry olarak bulunmuyor; TUS karar mantığı, acil yaklaşım veya temel klinik dil açısından öğretici değeri yüksek.",
      "droppedAliases": [
        {
          "alias": "FGR",
          "reason": "unsafe-short-or-low-signal-alias"
        }
      ]
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-asd-sabit-cift-s2",
    "term": "ASD sabit çift S2",
    "aliases": [
      "ASD sabit çift S2"
    ],
    "normalizedTerm": "asd sabit cift s2",
    "TurkishName": "ASD sabit çift S2",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Sol-sağ atriyal şant sağ kalp hacim yükü ve pulmoner akım artışı oluşturur.",
    "definition": "Sol-sağ atriyal şant sağ kalp hacim yükü ve pulmoner akım artışı oluşturur.",
    "detailedExplanation": "ASD sabit çift S2 Sol-sağ atriyal şant sağ kalp hacim yükü ve pulmoner akım artışı oluşturur.",
    "postAnswerExplanation": "ASD sabit çift S2 Sol-sağ atriyal şant sağ kalp hacim yükü ve pulmoner akım artışı oluşturur.",
    "postAnswerExpandedExplanation": "ASD sabit çift S2 Sol-sağ atriyal şant sağ kalp hacim yükü ve pulmoner akım artışı oluşturur.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "ASD sabit çift S2"
    ],
    "sourceTextExamples": [
      "Vaka kökünde ASD, sabit çift S2 ve sağ kalp dilatasyonu birlikte verilirse hangi tanı öncelikle düşünülür?"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 2,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-atp7a-kusuru",
    "term": "ATP7A kusuru",
    "aliases": [
      "ATP7A kusuru"
    ],
    "normalizedTerm": "atp7a kusuru",
    "TurkishName": "ATP7A kusuru",
    "EnglishName": "",
    "category": "Biyokimya / Genetik / Metabolizma",
    "subcategory": "Enzim/genetik defekt",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "shortDefinition": "ATP7A kusuru, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "definition": "ATP7A kusuru, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "detailedExplanation": "ATP7A kusuru. Menkes hastalığında bağırsaktan bakır taşınması bozulur; bakır bağımlı enzimler etkilenir.",
    "postAnswerExplanation": "ATP7A kusuru. Menkes hastalığında bağırsaktan bakır taşınması bozulur; bakır bağımlı enzimler etkilenir.",
    "postAnswerExpandedExplanation": "ATP7A kusuru. Menkes hastalığında bağırsaktan bakır taşınması bozulur; bakır bağımlı enzimler etkilenir.",
    "tusPearl": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "differentialPoint": "Benzer metabolik hastalıklardan ayrım, hangi metabolitin biriktiği ve atağı neyin tetiklediği üzerinden yapılır.",
    "clinicalRelevance": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "genetics"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "ATP7A kusuru"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 3,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve biyokimya / genetik / metabolizma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-atp7b-kusuru",
    "term": "ATP7B kusuru",
    "aliases": [
      "ATP7B kusuru"
    ],
    "normalizedTerm": "atp7b kusuru",
    "TurkishName": "ATP7B kusuru",
    "EnglishName": "",
    "category": "Biyokimya / Genetik / Metabolizma",
    "subcategory": "Enzim/genetik defekt",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "shortDefinition": "ATP7B kusuru, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "definition": "ATP7B kusuru, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "detailedExplanation": "Wilson hastalığı ATP7B kusuruyla karaciğer ve bazal ganglionlarda bakır birikimi yapar. Menkes hastalığında bağırsaktan bakır taşınması bozulur; bakır bağımlı enzimler etkilenir.",
    "postAnswerExplanation": "Wilson hastalığı ATP7B kusuruyla karaciğer ve bazal ganglionlarda bakır birikimi yapar. Menkes hastalığında bağırsaktan bakır taşınması bozulur; bakır bağımlı enzimler etkilenir.",
    "postAnswerExpandedExplanation": "Wilson hastalığı ATP7B kusuruyla karaciğer ve bazal ganglionlarda bakır birikimi yapar. Menkes hastalığında bağırsaktan bakır taşınması bozulur; bakır bağımlı enzimler etkilenir.",
    "tusPearl": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "differentialPoint": "Benzer metabolik hastalıklardan ayrım, hangi metabolitin biriktiği ve atağı neyin tetiklediği üzerinden yapılır.",
    "clinicalRelevance": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "genetics"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "ATP7B kusuru"
    ],
    "sourceTextExamples": [
      "Wilson hastalığı ATP7B kusuruyla karaciğer ve bazal ganglionlarda bakır birikimi yapar."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 3,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve biyokimya / genetik / metabolizma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-adrenal-medulla-kokeni",
    "term": "Adrenal medulla kökeni",
    "aliases": [
      "Adrenal medulla kökeni"
    ],
    "normalizedTerm": "adrenal medulla kokeni",
    "TurkishName": "Adrenal medulla kökeni",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Endoderm gastrointestinal ve solunum epiteli gibi yapılara katkı verir; adrenal medulla kökeni değildir.",
    "definition": "Endoderm gastrointestinal ve solunum epiteli gibi yapılara katkı verir; adrenal medulla kökeni değildir.",
    "detailedExplanation": "Endoderm gastrointestinal ve solunum epiteli gibi yapılara katkı verir; adrenal medulla kökeni değildir. Adrenal medulla kromaffin hücreleri modifiye postganglionik sempatik nöronlar gibi davranır ve nöral krest kökenlidir. Katekolamin salgılamaları bu sempatoadrenal kökenle uyumludur.",
    "postAnswerExplanation": "Endoderm gastrointestinal ve solunum epiteli gibi yapılara katkı verir; adrenal medulla kökeni değildir. Adrenal medulla kromaffin hücreleri modifiye postganglionik sempatik nöronlar gibi davranır ve nöral krest kökenlidir. Katekolamin salgılamaları bu sempatoadrenal kökenle uyumludur.",
    "postAnswerExpandedExplanation": "Endoderm gastrointestinal ve solunum epiteli gibi yapılara katkı verir; adrenal medulla kökeni değildir. Adrenal medulla kromaffin hücreleri modifiye postganglionik sempatik nöronlar gibi davranır ve nöral krest kökenlidir. Katekolamin salgılamaları bu sempatoadrenal kökenle uyumludur.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "nephrology",
      "endocrinology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Adrenal medulla kökeni"
    ],
    "sourceTextExamples": [
      "Endoderm gastrointestinal ve solunum epiteli gibi yapılara katkı verir; adrenal medulla kökeni değildir.",
      "Yüzey ektodermi epidermis ve bazı duyu epitellerine katkı verir; adrenal medulla kökeni değildir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 7,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot feedback içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-akciger-kompliyansi",
    "term": "Akciğer kompliyansı",
    "aliases": [
      "Akciğer kompliyansı"
    ],
    "normalizedTerm": "akciger kompliyansi",
    "TurkishName": "Akciğer kompliyansı",
    "EnglishName": "",
    "category": "Fizyoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Vücut fonksiyonlarının düzenlenmesiyle ilişkili fizyolojik bir ilişkiyi ifade eder.",
    "preAnswerSafeDefinition": "Vücut fonksiyonlarının düzenlenmesiyle ilişkili fizyolojik bir ilişkiyi ifade eder.",
    "shortDefinition": "Amfizemde akciğer kompliyansı artışını elastik recoil azalmasıyla ilişkilendirebilme Amfizemde alveoler duvar yıkımı elastik recoil gücünü azaltır.",
    "definition": "Amfizemde akciğer kompliyansı artışını elastik recoil azalmasıyla ilişkilendirebilme Amfizemde alveoler duvar yıkımı elastik recoil gücünü azaltır.",
    "detailedExplanation": "Amfizemde akciğer kompliyansı artışını elastik recoil azalmasıyla ilişkilendirebilme Amfizemde alveoler duvar yıkımı elastik recoil gücünü azaltır. Akciğerler daha kolay genişler, kompliyans artar; ancak ekspiryumda hava yolları kollabe olma eğilimi gösterir ve hava hapsi gelişir.",
    "postAnswerExplanation": "Amfizemde akciğer kompliyansı artışını elastik recoil azalmasıyla ilişkilendirebilme Amfizemde alveoler duvar yıkımı elastik recoil gücünü azaltır. Akciğerler daha kolay genişler, kompliyans artar; ancak ekspiryumda hava yolları kollabe olma eğilimi gösterir ve hava hapsi gelişir.",
    "postAnswerExpandedExplanation": "Amfizemde akciğer kompliyansı artışını elastik recoil azalmasıyla ilişkilendirebilme Amfizemde alveoler duvar yıkımı elastik recoil gücünü azaltır. Akciğerler daha kolay genişler, kompliyans artar; ancak ekspiryumda hava yolları kollabe olma eğilimi gösterir ve hava hapsi gelişir.",
    "tusPearl": "Fizyoloji sorusunda yönü kaçırma: değişken artınca hangi kompansasyonun devreye girdiği sorulur.",
    "differentialPoint": "Ayırıcı nokta, primer değişken ile kompansatuvar yanıtın birbirine karıştırılmamasıdır.",
    "clinicalRelevance": "Fizyoloji sorusunda yönü kaçırma: değişken artınca hangi kompansasyonun devreye girdiği sorulur.",
    "mechanism": "",
    "relatedBranches": [
      "physiology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Akciğer kompliyansı"
    ],
    "sourceTextExamples": [
      "Amfizemde akciğer kompliyansı artışını elastik recoil azalmasıyla ilişkilendirebilme",
      "Akciğer kompliyansının artması ve elastik recoil azalması"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 37,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve fizyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-akut-hucresel-rejeksiyon",
    "term": "Akut hücresel rejeksiyon",
    "aliases": [
      "Akut hücresel rejeksiyon"
    ],
    "normalizedTerm": "akut hucresel rejeksiyon",
    "TurkishName": "Akut hücresel rejeksiyon",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Akut hücresel rejeksiyon, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "Akut hücresel rejeksiyon, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "Akut hücresel rejeksiyon genellikle günler-haftalar içinde T hücre aracılı gelişir. Alıcıda önceden var olan anti-donör antikorlar kompleman aktivasyonu ve tromboza yol açar.",
    "postAnswerExplanation": "Akut hücresel rejeksiyon genellikle günler-haftalar içinde T hücre aracılı gelişir. Alıcıda önceden var olan anti-donör antikorlar kompleman aktivasyonu ve tromboza yol açar.",
    "postAnswerExpandedExplanation": "Akut hücresel rejeksiyon genellikle günler-haftalar içinde T hücre aracılı gelişir. Alıcıda önceden var olan anti-donör antikorlar kompleman aktivasyonu ve tromboza yol açar.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Akut hücresel rejeksiyon"
    ],
    "sourceTextExamples": [
      "Akut hücresel rejeksiyon genellikle günler-haftalar içinde T hücre aracılı gelişir.",
      "Akut hücresel rejeksiyon"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 4,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-akut-intermittan-porfiri",
    "term": "Akut intermittan porfiri",
    "aliases": [
      "Akut intermittan porfiri"
    ],
    "normalizedTerm": "akut intermittan porfiri",
    "TurkishName": "Akut intermittan porfiri",
    "EnglishName": "",
    "category": "Biyokimya / Genetik / Metabolizma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Akut intermittan porfiri, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "definition": "Akut intermittan porfiri, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "detailedExplanation": "Akut intermittan porfiri Hem sentezinde erken basamak bozulur; ALA ve PBG artışı nörovisseral ataklara yol açar.",
    "postAnswerExplanation": "Akut intermittan porfiri Hem sentezinde erken basamak bozulur; ALA ve PBG artışı nörovisseral ataklara yol açar.",
    "postAnswerExpandedExplanation": "Akut intermittan porfiri Hem sentezinde erken basamak bozulur; ALA ve PBG artışı nörovisseral ataklara yol açar.",
    "tusPearl": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "differentialPoint": "Benzer metabolik hastalıklardan ayrım, hangi metabolitin biriktiği ve atağı neyin tetiklediği üzerinden yapılır.",
    "clinicalRelevance": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "genetics"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Akut intermittan porfiri"
    ],
    "sourceTextExamples": [
      "Akut intermittan porfiri",
      "akut intermittan porfiri"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 4,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve biyokimya / genetik / metabolizma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-alfa-interkale-hucre",
    "term": "Alfa interkale hücre",
    "aliases": [
      "Alfa interkale hücre"
    ],
    "normalizedTerm": "alfa interkale hucre",
    "TurkishName": "Alfa interkale hücre",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Distal renal tübüler asidozda alfa interkale hücrelerin H+ sekresyonu bozulur; idrar pH’si yeterince düşürülemez.",
    "definition": "Distal renal tübüler asidozda alfa interkale hücrelerin H+ sekresyonu bozulur; idrar pH’si yeterince düşürülemez.",
    "detailedExplanation": "Distal renal tübüler asidozda alfa interkale hücrelerin H+ sekresyonu bozulur; idrar pH’si yeterince düşürülemez. Normal anyon açıklıklı metabolik asidoz, hipokalemi eğilimi, nefrolitiyazis ve nefrokalsinozis görülebilir. Doğru cevap A’dır. Distal RTA’da sorun distal nefronda hidrojen iyonu sekresyonunun yetersiz olmasıdır. Böbrek asit yükünü idrara atamaz ve idrar pH’si metabolik asidoza rağmen uygunsuz yüksek...",
    "postAnswerExplanation": "Distal renal tübüler asidozda alfa interkale hücrelerin H+ sekresyonu bozulur; idrar pH’si yeterince düşürülemez. Normal anyon açıklıklı metabolik asidoz, hipokalemi eğilimi, nefrolitiyazis ve nefrokalsinozis görülebilir. Doğru cevap A’dır. Distal RTA’da sorun distal nefronda hidrojen iyonu sekresyonunun yetersiz olmasıdır. Böbrek asit yükünü idrara atamaz ve idrar pH’si metabolik asidoza rağmen uygunsuz yüksek...",
    "postAnswerExpandedExplanation": "Distal renal tübüler asidozda alfa interkale hücrelerin H+ sekresyonu bozulur; idrar pH’si yeterince düşürülemez. Normal anyon açıklıklı metabolik asidoz, hipokalemi eğilimi, nefrolitiyazis ve nefrokalsinozis görülebilir. Doğru cevap A’dır. Distal RTA’da sorun distal nefronda hidrojen iyonu sekresyonunun yetersiz olmasıdır. Böbrek asit yükünü idrara atamaz ve idrar pH’si metabolik asidoza rağmen uygunsuz yüksek...",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "safeNestedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Alfa interkale hücre",
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "sourceTextExamples": [
      "Distal renal tübüler asidozda alfa interkale hücrelerin H+ sekresyonu bozulur; idrar pH’si yeterince düşürülemez. Normal anyon açıklıklı metabolik asidoz, hipokalemi eğilimi, nefrolitiyazis ve nefrokalsinozis görülebilir.",
      "Distal renal tübüler asidozda alfa interkale hücrelerin H+ sekresyonu bozulur; idrar pH’si yeterince düşürülemez. Normal anyon açıklıklı metabolik asidoz, hipokalemi eğilimi, nefrolitiyazis ve nefrokalsinozis görülebilir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 11,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-alfa-1-antitripsin-hepatosit-protein-birikimi",
    "term": "Alfa-1 antitripsin hepatosit protein birikimi",
    "aliases": [
      "Alfa-1 antitripsin hepatosit protein birikimi"
    ],
    "normalizedTerm": "alfa-1 antitripsin hepatosit protein birikimi",
    "TurkishName": "Alfa-1 antitripsin hepatosit protein birikimi",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "definition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "detailedExplanation": "Yanlıştır. Alfa-1 antitripsin mutasyonu hepatositlerde yanlış katlanmış protein birikimi ve akciğerde elastaz hasarı ile ilişkilidir. Wilson mekanizması değildir. Doğru cevap A’dır. ATP7B hepatositlerde bakırın safra yoluyla atılımı ve aposeruloplazmine bağlanması için gereklidir. Bu protein bozulduğunda bakır karaciğerde birikir, daha sonra dolaşıma ve diğer dokulara geçerek nöropsikiyatrik bulgular, karaciğer...",
    "postAnswerExplanation": "Yanlıştır. Alfa-1 antitripsin mutasyonu hepatositlerde yanlış katlanmış protein birikimi ve akciğerde elastaz hasarı ile ilişkilidir. Wilson mekanizması değildir. Doğru cevap A’dır. ATP7B hepatositlerde bakırın safra yoluyla atılımı ve aposeruloplazmine bağlanması için gereklidir. Bu protein bozulduğunda bakır karaciğerde birikir, daha sonra dolaşıma ve diğer dokulara geçerek nöropsikiyatrik bulgular, karaciğer...",
    "postAnswerExpandedExplanation": "Yanlıştır. Alfa-1 antitripsin mutasyonu hepatositlerde yanlış katlanmış protein birikimi ve akciğerde elastaz hasarı ile ilişkilidir. Wilson mekanizması değildir. Doğru cevap A’dır. ATP7B hepatositlerde bakırın safra yoluyla atılımı ve aposeruloplazmine bağlanması için gereklidir. Bu protein bozulduğunda bakır karaciğerde birikir, daha sonra dolaşıma ve diğer dokulara geçerek nöropsikiyatrik bulgular, karaciğer...",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Alfa-1 antitripsin hepatosit protein birikimi"
    ],
    "sourceTextExamples": [
      "Yanlıştır. Alfa-1 antitripsin mutasyonu hepatositlerde yanlış katlanmış protein birikimi ve akciğerde elastaz hasarı ile ilişkilidir. Wilson mekanizması değildir.",
      "Yanlıştır. Alfa-1 antitripsin mutasyonu hepatositlerde yanlış katlanmış protein birikimi ve akciğerde elastaz hasarı ile ilişkilidir. Wilson mekanizması değildir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-alfa-1-antitripsin-ve-notrofil-elastaz-dengesi",
    "term": "Alfa-1 antitripsin ve nötrofil elastaz dengesi",
    "aliases": [
      "Alfa-1 antitripsin ve nötrofil elastaz dengesi"
    ],
    "normalizedTerm": "alfa-1 antitripsin ve notrofil elastaz dengesi",
    "TurkishName": "Alfa-1 antitripsin ve nötrofil elastaz dengesi",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Alfa-1 antitripsin fazlalığı nedeniyle elastaz aktivitesinin tamamen baskılanması Doğru cevap A’dır.",
    "definition": "Alfa-1 antitripsin fazlalığı nedeniyle elastaz aktivitesinin tamamen baskılanması Doğru cevap A’dır.",
    "detailedExplanation": "Alfa-1 antitripsin fazlalığı nedeniyle elastaz aktivitesinin tamamen baskılanması Doğru cevap A’dır. CFTR proteini epitel hücrelerinde klor ve bikarbonat taşınmasında görev alır. Solunum yollarında CFTR fonksiyon bozukluğu klor sekresyonunu azaltır ve ENaC aracılı sodyum geri emilimini artırarak suyun lümenden çekilmesine neden olur. Sonuçta hava yolu yüzey sıvısı azalır, mukus dehidrate ve viskoz hâle gelir. Bu...",
    "postAnswerExplanation": "Alfa-1 antitripsin fazlalığı nedeniyle elastaz aktivitesinin tamamen baskılanması Doğru cevap A’dır. CFTR proteini epitel hücrelerinde klor ve bikarbonat taşınmasında görev alır. Solunum yollarında CFTR fonksiyon bozukluğu klor sekresyonunu azaltır ve ENaC aracılı sodyum geri emilimini artırarak suyun lümenden çekilmesine neden olur. Sonuçta hava yolu yüzey sıvısı azalır, mukus dehidrate ve viskoz hâle gelir. Bu...",
    "postAnswerExpandedExplanation": "Alfa-1 antitripsin fazlalığı nedeniyle elastaz aktivitesinin tamamen baskılanması Doğru cevap A’dır. CFTR proteini epitel hücrelerinde klor ve bikarbonat taşınmasında görev alır. Solunum yollarında CFTR fonksiyon bozukluğu klor sekresyonunu azaltır ve ENaC aracılı sodyum geri emilimini artırarak suyun lümenden çekilmesine neden olur. Sonuçta hava yolu yüzey sıvısı azalır, mukus dehidrate ve viskoz hâle gelir. Bu...",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Alfa-1 antitripsin ve nötrofil elastaz dengesi"
    ],
    "sourceTextExamples": [
      "Alfa-1 antitripsin fazlalığı nedeniyle elastaz aktivitesinin tamamen baskılanması",
      "Alfa-1 antitripsin fazlalığı nedeniyle elastaz aktivitesinin tamamen baskılanması"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-antimitokondriyal-antikor-ve-primer-biliyer-kolanjit",
    "term": "Antimitokondriyal antikor ve primer biliyer kolanjit",
    "aliases": [
      "Antimitokondriyal antikor ve primer biliyer kolanjit"
    ],
    "normalizedTerm": "antimitokondriyal antikor ve primer biliyer kolanjit",
    "TurkishName": "Antimitokondriyal antikor ve primer biliyer kolanjit",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Seroloji / otoantikor",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Primer biliyer kolanjit küçük intrahepatik safra kanallarını tutan otoimmün kolestatik hastalıktır ve en karakteristik serolojik belirteci antimitokondriyal antikordur.",
    "definition": "Primer biliyer kolanjit küçük intrahepatik safra kanallarını tutan otoimmün kolestatik hastalıktır ve en karakteristik serolojik belirteci antimitokondriyal antikordur.",
    "detailedExplanation": "Primer biliyer kolanjit küçük intrahepatik safra kanallarını tutan otoimmün kolestatik hastalıktır ve en karakteristik serolojik belirteci antimitokondriyal antikordur. Antimitokondriyal antikor özellikle PBC ile güçlü ilişkilidir. Anti-düz kas antikoru otoimmün hepatitte, anti-LKM1 tip 2 otoimmün hepatitte, p-ANCA ise primer sklerozan kolanjit ve inflamatuvar bağırsak hastalığı bağlamında daha çok düşünülür. Primer...",
    "postAnswerExplanation": "Primer biliyer kolanjit küçük intrahepatik safra kanallarını tutan otoimmün kolestatik hastalıktır ve en karakteristik serolojik belirteci antimitokondriyal antikordur. Antimitokondriyal antikor özellikle PBC ile güçlü ilişkilidir. Anti-düz kas antikoru otoimmün hepatitte, anti-LKM1 tip 2 otoimmün hepatitte, p-ANCA ise primer sklerozan kolanjit ve inflamatuvar bağırsak hastalığı bağlamında daha çok düşünülür. Primer...",
    "postAnswerExpandedExplanation": "Primer biliyer kolanjit küçük intrahepatik safra kanallarını tutan otoimmün kolestatik hastalıktır ve en karakteristik serolojik belirteci antimitokondriyal antikordur. Antimitokondriyal antikor özellikle PBC ile güçlü ilişkilidir. Anti-düz kas antikoru otoimmün hepatitte, anti-LKM1 tip 2 otoimmün hepatitte, p-ANCA ise primer sklerozan kolanjit ve inflamatuvar bağırsak hastalığı bağlamında daha çok düşünülür. Primer...",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "rheumatology",
      "immunology"
    ],
    "relatedTerms": [
      "antikor"
    ],
    "safeNestedTerms": [
      "antikor"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Antimitokondriyal antikor ve primer biliyer kolanjit",
      "antikor"
    ],
    "sourceTextExamples": [
      "Primer biliyer kolanjit küçük intrahepatik safra kanallarını tutan otoimmün kolestatik hastalıktır ve en karakteristik serolojik belirteci antimitokondriyal antikordur.",
      "Primer biliyer kolanjit küçük intrahepatik safra kanallarını tutan otoimmün kolestatik hastalıktır ve en karakteristik serolojik belirteci antimitokondriyal antikordur."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-aplastik-anemi-iligi",
    "term": "Aplastik anemi iliği",
    "aliases": [
      "Aplastik anemi iliği"
    ],
    "normalizedTerm": "aplastik anemi iligi",
    "TurkishName": "Aplastik anemi iliği",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Aplastik anemi iliği, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "Aplastik anemi iliği, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "Aplastik anemi iliği Hematopoietik kök hücre hasarı tüm serilerde azalmaya neden olur.",
    "postAnswerExplanation": "Aplastik anemi iliği Hematopoietik kök hücre hasarı tüm serilerde azalmaya neden olur.",
    "postAnswerExpandedExplanation": "Aplastik anemi iliği Hematopoietik kök hücre hasarı tüm serilerde azalmaya neden olur.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Aplastik anemi iliği"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-arter-kan-gazi-ko-oksimetri",
    "term": "Arter kan gazı ko-oksimetri",
    "aliases": [
      "Arter kan gazı ko-oksimetri"
    ],
    "normalizedTerm": "arter kan gazi ko-oksimetri",
    "TurkishName": "Arter kan gazı ko-oksimetri",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Anatomik ilişki",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Kapalı ortamda jeneratör maruziyeti, normal pulse oksimetreye rağmen nörolojik bulgular ve yüksek karboksihemoglobin karbonmonoksit zehirlenmesini gösterir.",
    "definition": "Kapalı ortamda jeneratör maruziyeti, normal pulse oksimetreye rağmen nörolojik bulgular ve yüksek karboksihemoglobin karbonmonoksit zehirlenmesini gösterir.",
    "detailedExplanation": "Arter kan gazı ko-oksimetri Kapalı ortamda jeneratör maruziyeti, normal pulse oksimetreye rağmen nörolojik bulgular ve yüksek karboksihemoglobin karbonmonoksit zehirlenmesini gösterir. Karbonmonoksit hemoglobine yüksek afiniteli bağlanarak oksijen taşıma kapasitesini azaltır ve kalan oksijen bağlanma bölgelerinin afinitesini artırarak oksijen-hemoglobin ayrışma eğrisini sola kaydırır; dokulara oksijen bırakılması...",
    "postAnswerExplanation": "Arter kan gazı ko-oksimetri Kapalı ortamda jeneratör maruziyeti, normal pulse oksimetreye rağmen nörolojik bulgular ve yüksek karboksihemoglobin karbonmonoksit zehirlenmesini gösterir. Karbonmonoksit hemoglobine yüksek afiniteli bağlanarak oksijen taşıma kapasitesini azaltır ve kalan oksijen bağlanma bölgelerinin afinitesini artırarak oksijen-hemoglobin ayrışma eğrisini sola kaydırır; dokulara oksijen bırakılması...",
    "postAnswerExpandedExplanation": "Arter kan gazı ko-oksimetri Kapalı ortamda jeneratör maruziyeti, normal pulse oksimetreye rağmen nörolojik bulgular ve yüksek karboksihemoglobin karbonmonoksit zehirlenmesini gösterir. Karbonmonoksit hemoglobine yüksek afiniteli bağlanarak oksijen taşıma kapasitesini azaltır ve kalan oksijen bağlanma bölgelerinin afinitesini artırarak oksijen-hemoglobin ayrışma eğrisini sola kaydırır; dokulara oksijen bırakılması...",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "safeNestedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Arter kan gazı ko-oksimetri",
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "sourceTextExamples": [
      "Arter kan gazı ko-oksimetri",
      "Arter kan gazı ko-oksimetri"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 6,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-aschoff-cisimcigi",
    "term": "Aschoff cisimciği",
    "aliases": [
      "Aschoff cisimciği"
    ],
    "normalizedTerm": "aschoff cisimcigi",
    "TurkishName": "Aschoff cisimciği",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Aschoff cisimciği, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "Aschoff cisimciği, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "Akut romatizmal ateşte Aschoff cisimciğini ve pankardit riskini tanıyabilme Tedavi edilmemiş grup A streptokok farenjiti sonrası gelişen gezici poliartrit ve kardit akut romatizmal ateşi düşündürür. Kalpte Anitschkow hücreleri içeren Aschoff cisimcikleri karakteristik lezyondur.",
    "postAnswerExplanation": "Akut romatizmal ateşte Aschoff cisimciğini ve pankardit riskini tanıyabilme Tedavi edilmemiş grup A streptokok farenjiti sonrası gelişen gezici poliartrit ve kardit akut romatizmal ateşi düşündürür. Kalpte Anitschkow hücreleri içeren Aschoff cisimcikleri karakteristik lezyondur.",
    "postAnswerExpandedExplanation": "Akut romatizmal ateşte Aschoff cisimciğini ve pankardit riskini tanıyabilme Tedavi edilmemiş grup A streptokok farenjiti sonrası gelişen gezici poliartrit ve kardit akut romatizmal ateşi düşündürür. Kalpte Anitschkow hücreleri içeren Aschoff cisimcikleri karakteristik lezyondur.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Aschoff cisimciği"
    ],
    "sourceTextExamples": [
      "Akut romatizmal ateşte Aschoff cisimciğini ve pankardit riskini tanıyabilme"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 12,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-asetilkolin-reseptor-antikoru",
    "term": "Asetilkolin reseptör antikoru",
    "aliases": [
      "Asetilkolin reseptör antikoru"
    ],
    "normalizedTerm": "asetilkolin reseptor antikoru",
    "TurkishName": "Asetilkolin reseptör antikoru",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Seroloji / otoantikor",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Dalgalanan oküler ve proksimal kas güçsüzlüğü, dinlenmeyle düzelme, dekrement yanıt ve asetilkolin reseptör antikor pozitifliği miyastenia gravis ile uyumludur.",
    "definition": "Dalgalanan oküler ve proksimal kas güçsüzlüğü, dinlenmeyle düzelme, dekrement yanıt ve asetilkolin reseptör antikor pozitifliği miyastenia gravis ile uyumludur.",
    "detailedExplanation": "Asetilkolin reseptör antikoru Dalgalanan oküler ve proksimal kas güçsüzlüğü, dinlenmeyle düzelme, dekrement yanıt ve asetilkolin reseptör antikor pozitifliği miyastenia gravis ile uyumludur. Temel mekanizma postsinaptik nikotinik asetilkolin reseptörlerinin otoantikorlarla hedeflenmesi ve nöromüsküler iletimin azalmasıdır.",
    "postAnswerExplanation": "Asetilkolin reseptör antikoru Dalgalanan oküler ve proksimal kas güçsüzlüğü, dinlenmeyle düzelme, dekrement yanıt ve asetilkolin reseptör antikor pozitifliği miyastenia gravis ile uyumludur. Temel mekanizma postsinaptik nikotinik asetilkolin reseptörlerinin otoantikorlarla hedeflenmesi ve nöromüsküler iletimin azalmasıdır.",
    "postAnswerExpandedExplanation": "Asetilkolin reseptör antikoru Dalgalanan oküler ve proksimal kas güçsüzlüğü, dinlenmeyle düzelme, dekrement yanıt ve asetilkolin reseptör antikor pozitifliği miyastenia gravis ile uyumludur. Temel mekanizma postsinaptik nikotinik asetilkolin reseptörlerinin otoantikorlarla hedeflenmesi ve nöromüsküler iletimin azalmasıdır.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "rheumatology",
      "immunology"
    ],
    "relatedTerms": [
      "antikor"
    ],
    "safeNestedTerms": [
      "antikor"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Asetilkolin reseptör antikoru",
      "antikor"
    ],
    "sourceTextExamples": [
      "Asetilkolin reseptör antikoru",
      "Asetilkolin reseptör antikoru"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 29,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-baroreseptor-refleksi",
    "term": "Baroreseptör refleksi",
    "aliases": [
      "Baroreseptör refleksi"
    ],
    "normalizedTerm": "baroreseptor refleksi",
    "TurkishName": "Baroreseptör refleksi",
    "EnglishName": "",
    "category": "Fizyoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Vücut fonksiyonlarının düzenlenmesiyle ilişkili fizyolojik bir ilişkiyi ifade eder.",
    "preAnswerSafeDefinition": "Vücut fonksiyonlarının düzenlenmesiyle ilişkili fizyolojik bir ilişkiyi ifade eder.",
    "shortDefinition": "Akut kan kaybında baroreseptör refleksinin kardiyovasküler yanıtlarını açıklayabilme Akut kan kaybı arteriyel basıncı azaltır ve karotis sinüs ile aortik ark baroreseptörlerinin gerilimini düşürür.",
    "definition": "Akut kan kaybında baroreseptör refleksinin kardiyovasküler yanıtlarını açıklayabilme Akut kan kaybı arteriyel basıncı azaltır ve karotis sinüs ile aortik ark baroreseptörlerinin gerilimini düşürür.",
    "detailedExplanation": "Akut kan kaybında baroreseptör refleksinin kardiyovasküler yanıtlarını açıklayabilme Akut kan kaybı arteriyel basıncı azaltır ve karotis sinüs ile aortik ark baroreseptörlerinin gerilimini düşürür. Baroreseptör ateşlemesi azalınca medüller merkezler sempatik çıkışı artırır, parasempatik tonusu azaltır; taşikardi, kontraktilite artışı ve periferik vazokonstriksiyon gelişerek kan basıncı desteklenir.",
    "postAnswerExplanation": "Akut kan kaybında baroreseptör refleksinin kardiyovasküler yanıtlarını açıklayabilme Akut kan kaybı arteriyel basıncı azaltır ve karotis sinüs ile aortik ark baroreseptörlerinin gerilimini düşürür. Baroreseptör ateşlemesi azalınca medüller merkezler sempatik çıkışı artırır, parasempatik tonusu azaltır; taşikardi, kontraktilite artışı ve periferik vazokonstriksiyon gelişerek kan basıncı desteklenir.",
    "postAnswerExpandedExplanation": "Akut kan kaybında baroreseptör refleksinin kardiyovasküler yanıtlarını açıklayabilme Akut kan kaybı arteriyel basıncı azaltır ve karotis sinüs ile aortik ark baroreseptörlerinin gerilimini düşürür. Baroreseptör ateşlemesi azalınca medüller merkezler sempatik çıkışı artırır, parasempatik tonusu azaltır; taşikardi, kontraktilite artışı ve periferik vazokonstriksiyon gelişerek kan basıncı desteklenir.",
    "tusPearl": "Fizyoloji sorusunda yönü kaçırma: değişken artınca hangi kompansasyonun devreye girdiği sorulur.",
    "differentialPoint": "Ayırıcı nokta, primer değişken ile kompansatuvar yanıtın birbirine karıştırılmamasıdır.",
    "clinicalRelevance": "Fizyoloji sorusunda yönü kaçırma: değişken artınca hangi kompansasyonun devreye girdiği sorulur.",
    "mechanism": "",
    "relatedBranches": [
      "physiology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Baroreseptör refleksi"
    ],
    "sourceTextExamples": [
      "Akut kan kaybında baroreseptör refleksinin kardiyovasküler yanıtlarını açıklayabilme",
      "Akut kan kaybında baroreseptör refleksinin kardiyovasküler yanıtlarını açıklayabilme"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 10,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve fizyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-benign-fruktozuri",
    "term": "Benign fruktozüri",
    "aliases": [
      "Benign fruktozüri"
    ],
    "normalizedTerm": "benign fruktozuri",
    "TurkishName": "Benign fruktozüri",
    "EnglishName": "",
    "category": "Biyokimya / Genetik / Metabolizma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Benign fruktozüri, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "definition": "Benign fruktozüri, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "detailedExplanation": "Fruktokinaz eksikliği benign esansiyel fruktozüriye yol açar; glukoz-6-fosfataz eksikliği von Gierke hastalığıdır. Galaktoz-1-fosfat üridiltransferaz eksikliği klasik galaktozemidir ve fruktoz-1-fosfat birikimini açıklamaz. Kalıtsal fruktoz intoleransı aldolaz B eksikliğine bağlıdır; fruktoz-1-fosfat parçalanamaz, inorganik fosfat ve ATP azalır, glukoneogenez/glikojenoliz baskılanarak hipoglisemi gelişir....",
    "postAnswerExplanation": "Fruktokinaz eksikliği benign esansiyel fruktozüriye yol açar; glukoz-6-fosfataz eksikliği von Gierke hastalığıdır. Galaktoz-1-fosfat üridiltransferaz eksikliği klasik galaktozemidir ve fruktoz-1-fosfat birikimini açıklamaz. Kalıtsal fruktoz intoleransı aldolaz B eksikliğine bağlıdır; fruktoz-1-fosfat parçalanamaz, inorganik fosfat ve ATP azalır, glukoneogenez/glikojenoliz baskılanarak hipoglisemi gelişir....",
    "postAnswerExpandedExplanation": "Fruktokinaz eksikliği benign esansiyel fruktozüriye yol açar; glukoz-6-fosfataz eksikliği von Gierke hastalığıdır. Galaktoz-1-fosfat üridiltransferaz eksikliği klasik galaktozemidir ve fruktoz-1-fosfat birikimini açıklamaz. Kalıtsal fruktoz intoleransı aldolaz B eksikliğine bağlıdır; fruktoz-1-fosfat parçalanamaz, inorganik fosfat ve ATP azalır, glukoneogenez/glikojenoliz baskılanarak hipoglisemi gelişir....",
    "tusPearl": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "differentialPoint": "Benzer metabolik hastalıklardan ayrım, hangi metabolitin biriktiği ve atağı neyin tetiklediği üzerinden yapılır.",
    "clinicalRelevance": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "genetics"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Benign fruktozüri"
    ],
    "sourceTextExamples": [
      "Fruktokinaz eksikliği benign esansiyel fruktozüriye yol açar; glukoz-6-fosfataz eksikliği von Gierke hastalığıdır. Galaktoz-1-fosfat üridiltransferaz eksikliği klasik galaktozemidir ve fruktoz-1-fosfat birikimini açıklamaz.",
      "Fruktoz metabolizmasında “aldolaz B = ciddi hipoglisemi/hepatotoksisite”, “fruktokinaz = benign fruktozüri” ayrımı yüksek verimlidir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 11,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve biyokimya / genetik / metabolizma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-branched-chain-alpha-ketoacid-dehydrogenase-kompleks-eksikligi",
    "term": "Branched-chain alpha-ketoacid dehydrogenase kompleks eksikliği",
    "aliases": [
      "Branched-chain alpha-ketoacid dehydrogenase kompleks eksikliği"
    ],
    "normalizedTerm": "branched-chain alpha-ketoacid dehydrogenase kompleks eksikligi",
    "TurkishName": "Branched-chain alpha-ketoacid dehydrogenase kompleks eksikliği",
    "EnglishName": "",
    "category": "Biyokimya / Genetik / Metabolizma",
    "subcategory": "Enzim/genetik defekt",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Branched-chain alpha-ketoacid dehydrogenase kompleks eksikliği, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "definition": "Branched-chain alpha-ketoacid dehydrogenase kompleks eksikliği, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "detailedExplanation": "Branched-chain alpha-ketoacid dehydrogenase kompleks eksikliği Yenidoğanda beslenme bozukluğu, letarji, nörolojik bulgular, tatlımsı idrar kokusu ve lösin-izolösin-valin artışı akçaağaç şurubu idrar hastalığını düşündürür. Temel defekt dallı zincirli alfa-ketoasit dehidrogenaz kompleksindedir; dallı zincirli amino asitler ve ketoasitleri birikir.",
    "postAnswerExplanation": "Branched-chain alpha-ketoacid dehydrogenase kompleks eksikliği Yenidoğanda beslenme bozukluğu, letarji, nörolojik bulgular, tatlımsı idrar kokusu ve lösin-izolösin-valin artışı akçaağaç şurubu idrar hastalığını düşündürür. Temel defekt dallı zincirli alfa-ketoasit dehidrogenaz kompleksindedir; dallı zincirli amino asitler ve ketoasitleri birikir.",
    "postAnswerExpandedExplanation": "Branched-chain alpha-ketoacid dehydrogenase kompleks eksikliği Yenidoğanda beslenme bozukluğu, letarji, nörolojik bulgular, tatlımsı idrar kokusu ve lösin-izolösin-valin artışı akçaağaç şurubu idrar hastalığını düşündürür. Temel defekt dallı zincirli alfa-ketoasit dehidrogenaz kompleksindedir; dallı zincirli amino asitler ve ketoasitleri birikir.",
    "tusPearl": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "differentialPoint": "Benzer metabolik hastalıklardan ayrım, hangi metabolitin biriktiği ve atağı neyin tetiklediği üzerinden yapılır.",
    "clinicalRelevance": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "genetics"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Branched-chain alpha-ketoacid dehydrogenase kompleks eksikliği"
    ],
    "sourceTextExamples": [
      "Branched-chain alpha-ketoacid dehydrogenase kompleks eksikliği",
      "Branched-chain alpha-ketoacid dehydrogenase kompleks eksikliği"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 7,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve biyokimya / genetik / metabolizma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-burkitt-lenfoma",
    "term": "Burkitt lenfoma",
    "aliases": [
      "Burkitt lenfoma"
    ],
    "normalizedTerm": "burkitt lenfoma",
    "TurkishName": "Burkitt lenfoma",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Burkitt lenfoma, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "Burkitt lenfoma, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "Burkitt lenfoma Ağrısız servikal lenfadenopati, B semptomları ve biyopside Reed-Sternberg hücreleri Hodgkin lenfomayı düşündürür. Reed-Sternberg hücreleri klasik olarak CD15 ve CD30 pozitif olabilir.",
    "postAnswerExplanation": "Burkitt lenfoma Ağrısız servikal lenfadenopati, B semptomları ve biyopside Reed-Sternberg hücreleri Hodgkin lenfomayı düşündürür. Reed-Sternberg hücreleri klasik olarak CD15 ve CD30 pozitif olabilir.",
    "postAnswerExpandedExplanation": "Burkitt lenfoma Ağrısız servikal lenfadenopati, B semptomları ve biyopside Reed-Sternberg hücreleri Hodgkin lenfomayı düşündürür. Reed-Sternberg hücreleri klasik olarak CD15 ve CD30 pozitif olabilir.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Burkitt lenfoma"
    ],
    "sourceTextExamples": [
      "Burkitt lenfomada yıldızlı gökyüzü görünümü ve MYC ilişkisi beklenir; Reed-Sternberg hücresi klasik değildir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 8,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-ccr5-cxcr4-koreseptorleri",
    "term": "CCR5/CXCR4 koreseptörleri",
    "aliases": [
      "CCR5/CXCR4 koreseptörleri"
    ],
    "normalizedTerm": "ccr5/cxcr4 koreseptorleri",
    "TurkishName": "CCR5/CXCR4 koreseptörleri",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "HIV gp120, CD4 molekülüne bağlandıktan sonra CCR5 veya CXCR4 koreseptörlerinden yararlanabilir Doğru cevap A’dır.",
    "definition": "HIV gp120, CD4 molekülüne bağlandıktan sonra CCR5 veya CXCR4 koreseptörlerinden yararlanabilir Doğru cevap A’dır.",
    "detailedExplanation": "HIV gp120, CD4 molekülüne bağlandıktan sonra CCR5 veya CXCR4 koreseptörlerinden yararlanabilir Doğru cevap A’dır. HIV’in hedef hücreye girişi CD4 molekülü ile başlar; gp120-CD4 etkileşimi sonrası virüs CCR5 veya CXCR4 koreseptörlerinden birini kullanarak giriş sürecini ilerletir. CCR5 kullanımı erken enfeksiyon ve makrofaj-tropik suşlarla, CXCR4 kullanımı ise daha çok T hücre tropizmiyle ilişkilendirilir. gp41 viral...",
    "postAnswerExplanation": "HIV gp120, CD4 molekülüne bağlandıktan sonra CCR5 veya CXCR4 koreseptörlerinden yararlanabilir Doğru cevap A’dır. HIV’in hedef hücreye girişi CD4 molekülü ile başlar; gp120-CD4 etkileşimi sonrası virüs CCR5 veya CXCR4 koreseptörlerinden birini kullanarak giriş sürecini ilerletir. CCR5 kullanımı erken enfeksiyon ve makrofaj-tropik suşlarla, CXCR4 kullanımı ise daha çok T hücre tropizmiyle ilişkilendirilir. gp41 viral...",
    "postAnswerExpandedExplanation": "HIV gp120, CD4 molekülüne bağlandıktan sonra CCR5 veya CXCR4 koreseptörlerinden yararlanabilir Doğru cevap A’dır. HIV’in hedef hücreye girişi CD4 molekülü ile başlar; gp120-CD4 etkileşimi sonrası virüs CCR5 veya CXCR4 koreseptörlerinden birini kullanarak giriş sürecini ilerletir. CCR5 kullanımı erken enfeksiyon ve makrofaj-tropik suşlarla, CXCR4 kullanımı ise daha çok T hücre tropizmiyle ilişkilendirilir. gp41 viral...",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "CCR5/CXCR4 koreseptörleri"
    ],
    "sourceTextExamples": [
      "HIV gp120, CD4 molekülüne bağlandıktan sonra CCR5 veya CXCR4 koreseptörlerinden yararlanabilir",
      "HIV gp120, CD4 molekülüne bağlandıktan sonra CCR5 veya CXCR4 koreseptörlerinden yararlanabilir"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-cd15-ve-cd30-pozitifligi",
    "term": "CD15 ve CD30 pozitifliği",
    "aliases": [
      "CD15 ve CD30 pozitifliği"
    ],
    "normalizedTerm": "cd15 ve cd30 pozitifligi",
    "TurkishName": "CD15 ve CD30 pozitifliği",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "CD15 ve CD30 pozitifliği, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "CD15 ve CD30 pozitifliği, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "Büyük atipik hücrelerde CD15 ve CD30 pozitifliği saptandı. Genç erişkinde ağrısız servikal lenfadenopati, B semptomları, karışık inflamatuvar zeminde iki çekirdekli belirgin nükleollü büyük hücreler ve CD15-CD30 pozitifliği klasik Hodgkin lenfomayı destekler. Bu tümör için karakteristik hücre Reed-Sternberg hücresidir.",
    "postAnswerExplanation": "Büyük atipik hücrelerde CD15 ve CD30 pozitifliği saptandı. Genç erişkinde ağrısız servikal lenfadenopati, B semptomları, karışık inflamatuvar zeminde iki çekirdekli belirgin nükleollü büyük hücreler ve CD15-CD30 pozitifliği klasik Hodgkin lenfomayı destekler. Bu tümör için karakteristik hücre Reed-Sternberg hücresidir.",
    "postAnswerExpandedExplanation": "Büyük atipik hücrelerde CD15 ve CD30 pozitifliği saptandı. Genç erişkinde ağrısız servikal lenfadenopati, B semptomları, karışık inflamatuvar zeminde iki çekirdekli belirgin nükleollü büyük hücreler ve CD15-CD30 pozitifliği klasik Hodgkin lenfomayı destekler. Bu tümör için karakteristik hücre Reed-Sternberg hücresidir.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "CD15 ve CD30 pozitifliği"
    ],
    "sourceTextExamples": [
      "Büyük atipik hücrelerde CD15 ve CD30 pozitifliği saptandı.",
      "Büyük atipik hücrelerde CD15 ve CD30 pozitifliği saptandı."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-cps1-nags-eksikligi-paterni",
    "term": "CPS1/NAGS eksikliği paterni",
    "aliases": [
      "CPS1/NAGS eksikliği paterni"
    ],
    "normalizedTerm": "cps1/nags eksikligi paterni",
    "TurkishName": "CPS1/NAGS eksikliği paterni",
    "EnglishName": "",
    "category": "Biyokimya / Genetik / Metabolizma",
    "subcategory": "Tanısal test / karar eşiği",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "shortDefinition": "CPS1/NAGS eksikliği paterni, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "definition": "CPS1/NAGS eksikliği paterni, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "detailedExplanation": "OTC eksikliğinde mitokondride biriken karbamoil fosfat pirimidin sentezine yönelir ve orotik asit artar. CPS1 eksikliğinde karbamoil fosfat oluşumu azaldığı için orotik asit artışı beklenmez. Doğru cevap C’dir. Hem OTC eksikliği hem de CPS1 eksikliği hiperamonyemiye yol açabilir; bu nedenle amonyak artışı ayırıcı değildir. OTC eksikliğinde karbamoil fosfat üretimi devam eder ancak ornitinle sitrülin oluşturma...",
    "postAnswerExplanation": "OTC eksikliğinde mitokondride biriken karbamoil fosfat pirimidin sentezine yönelir ve orotik asit artar. CPS1 eksikliğinde karbamoil fosfat oluşumu azaldığı için orotik asit artışı beklenmez. Doğru cevap C’dir. Hem OTC eksikliği hem de CPS1 eksikliği hiperamonyemiye yol açabilir; bu nedenle amonyak artışı ayırıcı değildir. OTC eksikliğinde karbamoil fosfat üretimi devam eder ancak ornitinle sitrülin oluşturma...",
    "postAnswerExpandedExplanation": "OTC eksikliğinde mitokondride biriken karbamoil fosfat pirimidin sentezine yönelir ve orotik asit artar. CPS1 eksikliğinde karbamoil fosfat oluşumu azaldığı için orotik asit artışı beklenmez. Doğru cevap C’dir. Hem OTC eksikliği hem de CPS1 eksikliği hiperamonyemiye yol açabilir; bu nedenle amonyak artışı ayırıcı değildir. OTC eksikliğinde karbamoil fosfat üretimi devam eder ancak ornitinle sitrülin oluşturma...",
    "tusPearl": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "differentialPoint": "Benzer metabolik hastalıklardan ayrım, hangi metabolitin biriktiği ve atağı neyin tetiklediği üzerinden yapılır.",
    "clinicalRelevance": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "genetics"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "CPS1/NAGS eksikliği paterni"
    ],
    "sourceTextExamples": [
      "OTC eksikliğinde mitokondride biriken karbamoil fosfat pirimidin sentezine yönelir ve orotik asit artar. CPS1 eksikliğinde karbamoil fosfat oluşumu azaldığı için orotik asit artışı beklenmez.",
      "OTC eksikliğinde mitokondride biriken karbamoil fosfat pirimidin sentezine yönelir ve orotik asit artar. CPS1 eksikliğinde karbamoil fosfat oluşumu azaldığı için orotik asit artışı beklenmez."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve biyokimya / genetik / metabolizma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-dic-laboratuvar-paterni",
    "term": "DIC laboratuvar paterni",
    "aliases": [
      "DIC laboratuvar paterni"
    ],
    "normalizedTerm": "dic laboratuvar paterni",
    "TurkishName": "DIC laboratuvar paterni",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Tanısal test / karar eşiği",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "DIC laboratuvar paterni, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "DIC laboratuvar paterni, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "DIC laboratuvar paterni Koagülasyon faktörleri ve trombositler tüketilir; fibrin yıkım ürünleri artar.",
    "postAnswerExplanation": "DIC laboratuvar paterni Koagülasyon faktörleri ve trombositler tüketilir; fibrin yıkım ürünleri artar.",
    "postAnswerExpandedExplanation": "DIC laboratuvar paterni Koagülasyon faktörleri ve trombositler tüketilir; fibrin yıkım ürünleri artar.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "DIC laboratuvar paterni"
    ],
    "sourceTextExamples": [
      "DIC laboratuvar paterni",
      "DIC laboratuvar paterni"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-dlco-azalmasi",
    "term": "DLCO azalması",
    "aliases": [
      "DLCO azalması"
    ],
    "normalizedTerm": "dlco azalmasi",
    "TurkishName": "DLCO azalması",
    "EnglishName": "",
    "category": "Fizyoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Vücut fonksiyonlarının düzenlenmesiyle ilişkili fizyolojik bir ilişkiyi ifade eder.",
    "preAnswerSafeDefinition": "Vücut fonksiyonlarının düzenlenmesiyle ilişkili fizyolojik bir ilişkiyi ifade eder.",
    "shortDefinition": "Alveoler septa yıkımı difüzyon için kullanılabilir yüzeyi azaltır.",
    "definition": "Alveoler septa yıkımı difüzyon için kullanılabilir yüzeyi azaltır.",
    "detailedExplanation": "DLCO azalması Alveoler septa yıkımı difüzyon için kullanılabilir yüzeyi azaltır.",
    "postAnswerExplanation": "DLCO azalması Alveoler septa yıkımı difüzyon için kullanılabilir yüzeyi azaltır.",
    "postAnswerExpandedExplanation": "DLCO azalması Alveoler septa yıkımı difüzyon için kullanılabilir yüzeyi azaltır.",
    "tusPearl": "Fizyoloji sorusunda yönü kaçırma: değişken artınca hangi kompansasyonun devreye girdiği sorulur.",
    "differentialPoint": "Ayırıcı nokta, primer değişken ile kompansatuvar yanıtın birbirine karıştırılmamasıdır.",
    "clinicalRelevance": "Fizyoloji sorusunda yönü kaçırma: değişken artınca hangi kompansasyonun devreye girdiği sorulur.",
    "mechanism": "",
    "relatedBranches": [
      "physiology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "DLCO azalması"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve fizyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-demir-eksikligi-anemisi-ayirimi",
    "term": "Demir eksikliği anemisi ayırımı",
    "aliases": [
      "Demir eksikliği anemisi ayırımı"
    ],
    "normalizedTerm": "demir eksikligi anemisi ayirimi",
    "TurkishName": "Demir eksikliği anemisi ayırımı",
    "EnglishName": "",
    "category": "Biyokimya / Genetik / Metabolizma",
    "subcategory": "Enzim/genetik defekt",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Demir eksikliği anemisi ayırımı, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "definition": "Demir eksikliği anemisi ayırımı, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "detailedExplanation": "Demir eksikliği anemisi ayırımı Ferritin demir depolarını yansıtır; demir eksikliğinde depo azalır.",
    "postAnswerExplanation": "Demir eksikliği anemisi ayırımı Ferritin demir depolarını yansıtır; demir eksikliğinde depo azalır.",
    "postAnswerExpandedExplanation": "Demir eksikliği anemisi ayırımı Ferritin demir depolarını yansıtır; demir eksikliğinde depo azalır.",
    "tusPearl": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "differentialPoint": "Benzer metabolik hastalıklardan ayrım, hangi metabolitin biriktiği ve atağı neyin tetiklediği üzerinden yapılır.",
    "clinicalRelevance": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology",
      "biochemistry",
      "genetics"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Demir eksikliği anemisi ayırımı"
    ],
    "sourceTextExamples": [
      "Demir eksikliği anemisi ayırımı",
      "Demir eksikliği anemisi ayırımı"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve biyokimya / genetik / metabolizma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-e2f-baskisinin-kalkmasi",
    "term": "E2F baskısının kalkması",
    "aliases": [
      "E2F baskısının kalkması"
    ],
    "normalizedTerm": "e2f baskisinin kalkmasi",
    "TurkishName": "E2F baskısının kalkması",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Rb-E2F ekseni hücre döngüsü kontrolünün klasik G1-S kapısıdır.",
    "definition": "Rb-E2F ekseni hücre döngüsü kontrolünün klasik G1-S kapısıdır.",
    "detailedExplanation": "Rb-E2F ekseni hücre döngüsü kontrolünün klasik G1-S kapısıdır. NF-κB inflamasyon ve sağkalım sinyalleriyle, STAT3 sitokin/büyüme faktörü sinyaliyle, SMAD4 ise TGF-β yoluyla ilişkilidir; Rb’nin doğrudan bağlayıp baskıladığı temel faktör E2F’dir. Hipofosforile Rb, E2F transkripsiyon faktörünü baskılar; Rb’nin fosforilasyonu veya kaybı E2F’yi serbestleştirerek S fazı genlerinin ekspresyonunu artırır. Rb’nin klasik...",
    "postAnswerExplanation": "Rb-E2F ekseni hücre döngüsü kontrolünün klasik G1-S kapısıdır. NF-κB inflamasyon ve sağkalım sinyalleriyle, STAT3 sitokin/büyüme faktörü sinyaliyle, SMAD4 ise TGF-β yoluyla ilişkilidir; Rb’nin doğrudan bağlayıp baskıladığı temel faktör E2F’dir. Hipofosforile Rb, E2F transkripsiyon faktörünü baskılar; Rb’nin fosforilasyonu veya kaybı E2F’yi serbestleştirerek S fazı genlerinin ekspresyonunu artırır. Rb’nin klasik...",
    "postAnswerExpandedExplanation": "Rb-E2F ekseni hücre döngüsü kontrolünün klasik G1-S kapısıdır. NF-κB inflamasyon ve sağkalım sinyalleriyle, STAT3 sitokin/büyüme faktörü sinyaliyle, SMAD4 ise TGF-β yoluyla ilişkilidir; Rb’nin doğrudan bağlayıp baskıladığı temel faktör E2F’dir. Hipofosforile Rb, E2F transkripsiyon faktörünü baskılar; Rb’nin fosforilasyonu veya kaybı E2F’yi serbestleştirerek S fazı genlerinin ekspresyonunu artırır. Rb’nin klasik...",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "E2F baskısının kalkması"
    ],
    "sourceTextExamples": [
      "Rb-E2F ekseni hücre döngüsü kontrolünün klasik G1-S kapısıdır. NF-κB inflamasyon ve sağkalım sinyalleriyle, STAT3 sitokin/büyüme faktörü sinyaliyle, SMAD4 ise TGF-β yoluyla ilişkilidir; Rb’nin doğrudan bağlayıp baskıladığı temel faktör E2F’dir.",
      "Rb kaybı sorularında ana sonuç E2F baskısının kalkması ve S fazına geçişin kolaylaşmasıdır."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 11,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-eklem-aspirasyonu-ve-sinovyal-sivi-analizi",
    "term": "Eklem aspirasyonu ve sinovyal sıvı analizi",
    "aliases": [
      "Eklem aspirasyonu ve sinovyal sıvı analizi"
    ],
    "normalizedTerm": "eklem aspirasyonu ve sinovyal sivi analizi",
    "TurkishName": "Eklem aspirasyonu ve sinovyal sıvı analizi",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Ateş, akut tek eklem şişliği, sıcaklık artışı, hareketle şiddetli ağrı ve inflamatuvar belirteç yüksekliği septik artrit açısından acil değerlendirme gerektirir.",
    "definition": "Ateş, akut tek eklem şişliği, sıcaklık artışı, hareketle şiddetli ağrı ve inflamatuvar belirteç yüksekliği septik artrit açısından acil değerlendirme gerektirir.",
    "detailedExplanation": "Eklem aspirasyonu ve sinovyal sıvı analizi Ateş, akut tek eklem şişliği, sıcaklık artışı, hareketle şiddetli ağrı ve inflamatuvar belirteç yüksekliği septik artrit açısından acil değerlendirme gerektirir. Tanıyı kesinleştiren ve etken ile antibiyotik seçimini yönlendiren temel işlem eklem aspirasyonu ile sinovyal sıvının hücre sayımı, Gram boyama, kültür ve kristal açısından incelenmesidir.",
    "postAnswerExplanation": "Eklem aspirasyonu ve sinovyal sıvı analizi Ateş, akut tek eklem şişliği, sıcaklık artışı, hareketle şiddetli ağrı ve inflamatuvar belirteç yüksekliği septik artrit açısından acil değerlendirme gerektirir. Tanıyı kesinleştiren ve etken ile antibiyotik seçimini yönlendiren temel işlem eklem aspirasyonu ile sinovyal sıvının hücre sayımı, Gram boyama, kültür ve kristal açısından incelenmesidir.",
    "postAnswerExpandedExplanation": "Eklem aspirasyonu ve sinovyal sıvı analizi Ateş, akut tek eklem şişliği, sıcaklık artışı, hareketle şiddetli ağrı ve inflamatuvar belirteç yüksekliği septik artrit açısından acil değerlendirme gerektirir. Tanıyı kesinleştiren ve etken ile antibiyotik seçimini yönlendiren temel işlem eklem aspirasyonu ile sinovyal sıvının hücre sayımı, Gram boyama, kültür ve kristal açısından incelenmesidir.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Eklem aspirasyonu ve sinovyal sıvı analizi"
    ],
    "sourceTextExamples": [
      "Eklem aspirasyonu ve sinovyal sıvı analizi",
      "Eklem aspirasyonu ve sinovyal sıvı analizi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-endometrium-adenokarsinomu",
    "term": "Endometrium adenokarsinomu",
    "aliases": [
      "Endometrium adenokarsinomu"
    ],
    "normalizedTerm": "endometrium adenokarsinomu",
    "TurkishName": "Endometrium adenokarsinomu",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Postmenopozal vajinal kanama, obezite, hipertansiyon, diyabet ve nulliparite endometrium adenokarsinomu açısından risk oluşturur.",
    "definition": "Postmenopozal vajinal kanama, obezite, hipertansiyon, diyabet ve nulliparite endometrium adenokarsinomu açısından risk oluşturur.",
    "detailedExplanation": "Endometrium adenokarsinomu Postmenopozal vajinal kanama, obezite, hipertansiyon, diyabet ve nulliparite endometrium adenokarsinomu açısından risk oluşturur. Artmış endometrium kalınlığı ve biyopside invaziv endometrioid adenokarsinom tanıyı destekler; patogenezde karşılanmamış östrojen etkisi önemlidir.",
    "postAnswerExplanation": "Endometrium adenokarsinomu Postmenopozal vajinal kanama, obezite, hipertansiyon, diyabet ve nulliparite endometrium adenokarsinomu açısından risk oluşturur. Artmış endometrium kalınlığı ve biyopside invaziv endometrioid adenokarsinom tanıyı destekler; patogenezde karşılanmamış östrojen etkisi önemlidir.",
    "postAnswerExpandedExplanation": "Endometrium adenokarsinomu Postmenopozal vajinal kanama, obezite, hipertansiyon, diyabet ve nulliparite endometrium adenokarsinomu açısından risk oluşturur. Artmış endometrium kalınlığı ve biyopside invaziv endometrioid adenokarsinom tanıyı destekler; patogenezde karşılanmamış östrojen etkisi önemlidir.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Endometrium adenokarsinomu"
    ],
    "sourceTextExamples": [
      "Endometrium adenokarsinomu",
      "Endometrium adenokarsinomu"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 11,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-enfektif-endokardit-vejetasyonu",
    "term": "Enfektif endokardit vejetasyonu",
    "aliases": [
      "Enfektif endokardit vejetasyonu"
    ],
    "normalizedTerm": "enfektif endokardit vejetasyonu",
    "TurkishName": "Enfektif endokardit vejetasyonu",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Enfektif endokardit vejetasyonu, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "Enfektif endokardit vejetasyonu, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "Enfektif endokardit vejetasyonu Enfektif endokarditte fibrin, trombosit ve mikroorganizmalardan oluşan vejetasyonlar gelişir.",
    "postAnswerExplanation": "Enfektif endokardit vejetasyonu Enfektif endokarditte fibrin, trombosit ve mikroorganizmalardan oluşan vejetasyonlar gelişir.",
    "postAnswerExpandedExplanation": "Enfektif endokardit vejetasyonu Enfektif endokarditte fibrin, trombosit ve mikroorganizmalardan oluşan vejetasyonlar gelişir.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Enfektif endokardit vejetasyonu"
    ],
    "sourceTextExamples": [
      "Enfektif endokardit vejetasyonu",
      "Enfektif endokardit vejetasyonu"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-enterococcus-faecalis",
    "term": "Enterococcus faecalis",
    "aliases": [
      "Enterococcus faecalis"
    ],
    "normalizedTerm": "enterococcus faecalis",
    "TurkishName": "Enterococcus faecalis",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "İntravenöz madde kullanımı olan hastada ateş, triküspit vejetasyon, septik pulmoner emboli bulguları ve gram-pozitif kok kümeleri akut sağ kalp endokarditini düşündürür.",
    "definition": "İntravenöz madde kullanımı olan hastada ateş, triküspit vejetasyon, septik pulmoner emboli bulguları ve gram-pozitif kok kümeleri akut sağ kalp endokarditini düşündürür.",
    "detailedExplanation": "Enterococcus faecalis İntravenöz madde kullanımı olan hastada ateş, triküspit vejetasyon, septik pulmoner emboli bulguları ve gram-pozitif kok kümeleri akut sağ kalp endokarditini düşündürür. Bu klinik bağlamda en olası etken Staphylococcus aureus’tur.",
    "postAnswerExplanation": "Enterococcus faecalis İntravenöz madde kullanımı olan hastada ateş, triküspit vejetasyon, septik pulmoner emboli bulguları ve gram-pozitif kok kümeleri akut sağ kalp endokarditini düşündürür. Bu klinik bağlamda en olası etken Staphylococcus aureus’tur.",
    "postAnswerExpandedExplanation": "Enterococcus faecalis İntravenöz madde kullanımı olan hastada ateş, triküspit vejetasyon, septik pulmoner emboli bulguları ve gram-pozitif kok kümeleri akut sağ kalp endokarditini düşündürür. Bu klinik bağlamda en olası etken Staphylococcus aureus’tur.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Enterococcus faecalis"
    ],
    "sourceTextExamples": [
      "Enterococcus faecalis",
      "Enterococcus faecalis genitoüriner veya gastrointestinal girişim sonrası endokardit yapabilir; verilen risk profili ve Gram boyama paterni daha farklıdır."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 12,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-esansiyel-trombositemi",
    "term": "Esansiyel trombositemi",
    "aliases": [
      "Esansiyel trombositemi"
    ],
    "normalizedTerm": "esansiyel trombositemi",
    "TurkishName": "Esansiyel trombositemi",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Esansiyel trombositemi, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "Esansiyel trombositemi, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "Esansiyel trombositemi Miyeloproliferatif klonal süreç tromboz ve kanama riskini artırabilir.",
    "postAnswerExplanation": "Esansiyel trombositemi Miyeloproliferatif klonal süreç tromboz ve kanama riskini artırabilir.",
    "postAnswerExpandedExplanation": "Esansiyel trombositemi Miyeloproliferatif klonal süreç tromboz ve kanama riskini artırabilir.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Esansiyel trombositemi"
    ],
    "sourceTextExamples": [
      "Esansiyel trombositemi",
      "Esansiyel trombositemi."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 4,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-ewing-sarkomu",
    "term": "Ewing sarkomu",
    "aliases": [
      "Ewing sarkomu"
    ],
    "normalizedTerm": "ewing sarkomu",
    "TurkishName": "Ewing sarkomu",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Ewing sarkomu, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "Ewing sarkomu, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "Ewing sarkomu Ergende diz çevresi metafiz yerleşimli agresif kemik lezyonu, güneş ışını periost reaksiyonu, Codman üçgeni ve malign hücrelerce osteoid üretimi osteosarkomu düşündürür.",
    "postAnswerExplanation": "Ewing sarkomu Ergende diz çevresi metafiz yerleşimli agresif kemik lezyonu, güneş ışını periost reaksiyonu, Codman üçgeni ve malign hücrelerce osteoid üretimi osteosarkomu düşündürür.",
    "postAnswerExpandedExplanation": "Ewing sarkomu Ergende diz çevresi metafiz yerleşimli agresif kemik lezyonu, güneş ışını periost reaksiyonu, Codman üçgeni ve malign hücrelerce osteoid üretimi osteosarkomu düşündürür.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Ewing sarkomu"
    ],
    "sourceTextExamples": [
      "Ewing sarkomu daha çok diafiz yerleşimli küçük yuvarlak mavi hücreli tümör ve soğan zarı periost reaksiyonuyla ilişkilidir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 15,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-fetal-hemoglobin-oksijen-afinitesi",
    "term": "Fetal hemoglobin oksijen afinitesi",
    "aliases": [
      "Fetal hemoglobin oksijen afinitesi"
    ],
    "normalizedTerm": "fetal hemoglobin oksijen afinitesi",
    "TurkishName": "Fetal hemoglobin oksijen afinitesi",
    "EnglishName": "",
    "category": "Fizyoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Vücut fonksiyonlarının düzenlenmesiyle ilişkili fizyolojik bir ilişkiyi ifade eder.",
    "preAnswerSafeDefinition": "Vücut fonksiyonlarının düzenlenmesiyle ilişkili fizyolojik bir ilişkiyi ifade eder.",
    "shortDefinition": "Fetal hemoglobin 2,3-BPG etkisine daha dirençlidir ve oksijeni plasentadan daha iyi alır.",
    "definition": "Fetal hemoglobin 2,3-BPG etkisine daha dirençlidir ve oksijeni plasentadan daha iyi alır.",
    "detailedExplanation": "Fetal hemoglobin oksijen afinitesi Fetal hemoglobin 2,3-BPG etkisine daha dirençlidir ve oksijeni plasentadan daha iyi alır.",
    "postAnswerExplanation": "Fetal hemoglobin oksijen afinitesi Fetal hemoglobin 2,3-BPG etkisine daha dirençlidir ve oksijeni plasentadan daha iyi alır.",
    "postAnswerExpandedExplanation": "Fetal hemoglobin oksijen afinitesi Fetal hemoglobin 2,3-BPG etkisine daha dirençlidir ve oksijeni plasentadan daha iyi alır.",
    "tusPearl": "Fizyoloji sorusunda yönü kaçırma: değişken artınca hangi kompansasyonun devreye girdiği sorulur.",
    "differentialPoint": "Ayırıcı nokta, primer değişken ile kompansatuvar yanıtın birbirine karıştırılmamasıdır.",
    "clinicalRelevance": "Fizyoloji sorusunda yönü kaçırma: değişken artınca hangi kompansasyonun devreye girdiği sorulur.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology",
      "physiology"
    ],
    "relatedTerms": [
      "oksijen",
      "hemoglobin"
    ],
    "safeNestedTerms": [
      "oksijen",
      "hemoglobin"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Fetal hemoglobin oksijen afinitesi",
      "oksijen",
      "hemoglobin"
    ],
    "sourceTextExamples": [
      "Fetal hemoglobin oksijen afinitesi",
      "Fetal hemoglobin oksijen afinitesi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve fizyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-fibrillin-1-kusuru",
    "term": "Fibrillin-1 kusuru",
    "aliases": [
      "Fibrillin-1 kusuru"
    ],
    "normalizedTerm": "fibrillin-1 kusuru",
    "TurkishName": "Fibrillin-1 kusuru",
    "EnglishName": "",
    "category": "Biyokimya / Genetik / Metabolizma",
    "subcategory": "Enzim/genetik defekt",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Fibrillin-1 kusuru, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "definition": "Fibrillin-1 kusuru, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "detailedExplanation": "Fibrillin-1 kusuru. FBN1 mutasyonu elastik dokuların yapısını ve TGF-beta sinyalini etkiler.",
    "postAnswerExplanation": "Fibrillin-1 kusuru. FBN1 mutasyonu elastik dokuların yapısını ve TGF-beta sinyalini etkiler.",
    "postAnswerExpandedExplanation": "Fibrillin-1 kusuru. FBN1 mutasyonu elastik dokuların yapısını ve TGF-beta sinyalini etkiler.",
    "tusPearl": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "differentialPoint": "Benzer metabolik hastalıklardan ayrım, hangi metabolitin biriktiği ve atağı neyin tetiklediği üzerinden yapılır.",
    "clinicalRelevance": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "genetics"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Fibrillin-1 kusuru"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 2,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve biyokimya / genetik / metabolizma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-folikuler-lenfoma-translokasyonu",
    "term": "Foliküler lenfoma translokasyonu",
    "aliases": [
      "Foliküler lenfoma translokasyonu"
    ],
    "normalizedTerm": "folikuler lenfoma translokasyonu",
    "TurkishName": "Foliküler lenfoma translokasyonu",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Foliküler lenfoma translokasyonu, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "Foliküler lenfoma translokasyonu, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "Foliküler lenfoma translokasyonu BCL2 apoptozu azaltır ve germinal merkez B hücrelerinin birikmesine yol açar.",
    "postAnswerExplanation": "Foliküler lenfoma translokasyonu BCL2 apoptozu azaltır ve germinal merkez B hücrelerinin birikmesine yol açar.",
    "postAnswerExpandedExplanation": "Foliküler lenfoma translokasyonu BCL2 apoptozu azaltır ve germinal merkez B hücrelerinin birikmesine yol açar.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Foliküler lenfoma translokasyonu"
    ],
    "sourceTextExamples": [
      "Foliküler lenfoma translokasyonu",
      "Foliküler lenfoma translokasyonu"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-fruktoz-alimi-sonrasi-hipoglisemi",
    "term": "Fruktoz alımı sonrası hipoglisemi",
    "aliases": [
      "Fruktoz alımı sonrası hipoglisemi"
    ],
    "normalizedTerm": "fruktoz alimi sonrasi hipoglisemi",
    "TurkishName": "Fruktoz alımı sonrası hipoglisemi",
    "EnglishName": "",
    "category": "Biyokimya / Genetik / Metabolizma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Fruktoz alımı sonrası hipoglisemi, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "definition": "Fruktoz alımı sonrası hipoglisemi, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "detailedExplanation": "Aldolaz B eksikliği fruktoz alımı sonrası hipoglisemi ve hepatik hasar tablosunu açıklar. Fruktoz içeren gıdalarla başlayan kusma, hipoglisemi ve hepatik etkilenim herediter fruktoz intoleransını düşündürür. Aldolaz B eksikliğinde fruktoz-1-fosfat birikir, fosfat tuzaklanır ve glukoneogenez ile glikojenoliz bozulur.",
    "postAnswerExplanation": "Aldolaz B eksikliği fruktoz alımı sonrası hipoglisemi ve hepatik hasar tablosunu açıklar. Fruktoz içeren gıdalarla başlayan kusma, hipoglisemi ve hepatik etkilenim herediter fruktoz intoleransını düşündürür. Aldolaz B eksikliğinde fruktoz-1-fosfat birikir, fosfat tuzaklanır ve glukoneogenez ile glikojenoliz bozulur.",
    "postAnswerExpandedExplanation": "Aldolaz B eksikliği fruktoz alımı sonrası hipoglisemi ve hepatik hasar tablosunu açıklar. Fruktoz içeren gıdalarla başlayan kusma, hipoglisemi ve hepatik etkilenim herediter fruktoz intoleransını düşündürür. Aldolaz B eksikliğinde fruktoz-1-fosfat birikir, fosfat tuzaklanır ve glukoneogenez ile glikojenoliz bozulur.",
    "tusPearl": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "differentialPoint": "Benzer metabolik hastalıklardan ayrım, hangi metabolitin biriktiği ve atağı neyin tetiklediği üzerinden yapılır.",
    "clinicalRelevance": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "genetics"
    ],
    "relatedTerms": [
      "hipoglisemi"
    ],
    "safeNestedTerms": [
      "hipoglisemi"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Fruktoz alımı sonrası hipoglisemi",
      "hipoglisemi"
    ],
    "sourceTextExamples": [
      "Aldolaz B eksikliği fruktoz alımı sonrası hipoglisemi ve hepatik hasar tablosunu açıklar.",
      "Aldolaz B eksikliği fruktoz alımı sonrası hipoglisemi ve hepatik hasar tablosunu açıklar."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 8,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot feedback içinde geçiyor ve biyokimya / genetik / metabolizma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-gastrin-etkisi",
    "term": "Gastrin etkisi",
    "aliases": [
      "Gastrin etkisi"
    ],
    "normalizedTerm": "gastrin etkisi",
    "TurkishName": "Gastrin etkisi",
    "EnglishName": "",
    "category": "Fizyoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Vücut fonksiyonlarının düzenlenmesiyle ilişkili fizyolojik bir ilişkiyi ifade eder.",
    "preAnswerSafeDefinition": "Vücut fonksiyonlarının düzenlenmesiyle ilişkili fizyolojik bir ilişkiyi ifade eder.",
    "shortDefinition": "Gastrin histamin salınımını artırır ve parietal hücre HCl sekresyonunu güçlendirir.",
    "definition": "Gastrin histamin salınımını artırır ve parietal hücre HCl sekresyonunu güçlendirir.",
    "detailedExplanation": "Gastrin etkisi Gastrin histamin salınımını artırır ve parietal hücre HCl sekresyonunu güçlendirir.",
    "postAnswerExplanation": "Gastrin etkisi Gastrin histamin salınımını artırır ve parietal hücre HCl sekresyonunu güçlendirir.",
    "postAnswerExpandedExplanation": "Gastrin etkisi Gastrin histamin salınımını artırır ve parietal hücre HCl sekresyonunu güçlendirir.",
    "tusPearl": "Fizyoloji sorusunda yönü kaçırma: değişken artınca hangi kompansasyonun devreye girdiği sorulur.",
    "differentialPoint": "Ayırıcı nokta, primer değişken ile kompansatuvar yanıtın birbirine karıştırılmamasıdır.",
    "clinicalRelevance": "Fizyoloji sorusunda yönü kaçırma: değişken artınca hangi kompansasyonun devreye girdiği sorulur.",
    "mechanism": "",
    "relatedBranches": [
      "physiology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Gastrin etkisi"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addAsSafeNestedTerm",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve fizyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-gebeligin-intrahepatik-kolestazi",
    "term": "Gebeliğin intrahepatik kolestazı",
    "aliases": [
      "Gebeliğin intrahepatik kolestazı"
    ],
    "normalizedTerm": "gebeligin intrahepatik kolestazi",
    "TurkishName": "Gebeliğin intrahepatik kolestazı",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "nda kaşıntı ve safra asidi artışı daha belirgindir.",
    "definition": "nda kaşıntı ve safra asidi artışı daha belirgindir.",
    "detailedExplanation": "Gebeliğin intrahepatik kolestazında kaşıntı ve safra asidi artışı daha belirgindir. Mikroanjiyopatik hasar hemoliz ve karaciğer-trombosit bulgularını oluşturur.",
    "postAnswerExplanation": "Gebeliğin intrahepatik kolestazında kaşıntı ve safra asidi artışı daha belirgindir. Mikroanjiyopatik hasar hemoliz ve karaciğer-trombosit bulgularını oluşturur.",
    "postAnswerExpandedExplanation": "Gebeliğin intrahepatik kolestazında kaşıntı ve safra asidi artışı daha belirgindir. Mikroanjiyopatik hasar hemoliz ve karaciğer-trombosit bulgularını oluşturur.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Gebeliğin intrahepatik kolestazı"
    ],
    "sourceTextExamples": [
      "Gebeliğin intrahepatik kolestazında kaşıntı ve safra asidi artışı daha belirgindir.",
      "Gebeliğin intrahepatik kolestazı"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 4,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-glomeruler-bazal-membranda-spike-and-dome-gorunumu",
    "term": "Glomerüler bazal membranda spike and dome görünümü",
    "aliases": [
      "Glomerüler bazal membranda spike and dome görünümü"
    ],
    "normalizedTerm": "glomeruler bazal membranda spike and dome gorunumu",
    "TurkishName": "Glomerüler bazal membranda spike and dome görünümü",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Erişkinde nefrotik düzey proteinüri, hipoalbüminemi ve subepitelyal immün kompleks birikimleri membranöz nefropatiyi düşündürür.",
    "definition": "Erişkinde nefrotik düzey proteinüri, hipoalbüminemi ve subepitelyal immün kompleks birikimleri membranöz nefropatiyi düşündürür.",
    "detailedExplanation": "Glomerüler bazal membranda spike and dome görünümü Erişkinde nefrotik düzey proteinüri, hipoalbüminemi ve subepitelyal immün kompleks birikimleri membranöz nefropatiyi düşündürür. Bu hastalıkta glomerüler bazal membran immün kompleksler arasında yeni membran materyali oluşturur ve ışık mikroskobunda spike and dome görünümü beklenir.",
    "postAnswerExplanation": "Glomerüler bazal membranda spike and dome görünümü Erişkinde nefrotik düzey proteinüri, hipoalbüminemi ve subepitelyal immün kompleks birikimleri membranöz nefropatiyi düşündürür. Bu hastalıkta glomerüler bazal membran immün kompleksler arasında yeni membran materyali oluşturur ve ışık mikroskobunda spike and dome görünümü beklenir.",
    "postAnswerExpandedExplanation": "Glomerüler bazal membranda spike and dome görünümü Erişkinde nefrotik düzey proteinüri, hipoalbüminemi ve subepitelyal immün kompleks birikimleri membranöz nefropatiyi düşündürür. Bu hastalıkta glomerüler bazal membran immün kompleksler arasında yeni membran materyali oluşturur ve ışık mikroskobunda spike and dome görünümü beklenir.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "nephrology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Glomerüler bazal membranda spike and dome görünümü"
    ],
    "sourceTextExamples": [
      "Glomerüler bazal membranda spike and dome görünümü",
      "Glomerüler bazal membranda spike and dome görünümü"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-glukoz-tasima-maksimumu",
    "term": "Glukoz taşıma maksimumu",
    "aliases": [
      "Glukoz taşıma maksimumu"
    ],
    "normalizedTerm": "glukoz tasima maksimumu",
    "TurkishName": "Glukoz taşıma maksimumu",
    "EnglishName": "",
    "category": "Fizyoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Vücut fonksiyonlarının düzenlenmesiyle ilişkili fizyolojik bir ilişkiyi ifade eder.",
    "preAnswerSafeDefinition": "Vücut fonksiyonlarının düzenlenmesiyle ilişkili fizyolojik bir ilişkiyi ifade eder.",
    "shortDefinition": "Proksimal tübüldeki SGLT taşıyıcıları doyduğunda filtrelenen glukozun tamamı geri emilemez.",
    "definition": "Proksimal tübüldeki SGLT taşıyıcıları doyduğunda filtrelenen glukozun tamamı geri emilemez.",
    "detailedExplanation": "Glukoz taşıma maksimumu Proksimal tübüldeki SGLT taşıyıcıları doyduğunda filtrelenen glukozun tamamı geri emilemez.",
    "postAnswerExplanation": "Glukoz taşıma maksimumu Proksimal tübüldeki SGLT taşıyıcıları doyduğunda filtrelenen glukozun tamamı geri emilemez.",
    "postAnswerExpandedExplanation": "Glukoz taşıma maksimumu Proksimal tübüldeki SGLT taşıyıcıları doyduğunda filtrelenen glukozun tamamı geri emilemez.",
    "tusPearl": "Fizyoloji sorusunda yönü kaçırma: değişken artınca hangi kompansasyonun devreye girdiği sorulur.",
    "differentialPoint": "Ayırıcı nokta, primer değişken ile kompansatuvar yanıtın birbirine karıştırılmamasıdır.",
    "clinicalRelevance": "Fizyoloji sorusunda yönü kaçırma: değişken artınca hangi kompansasyonun devreye girdiği sorulur.",
    "mechanism": "",
    "relatedBranches": [
      "physiology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Glukoz taşıma maksimumu"
    ],
    "sourceTextExamples": [
      "Glukoz taşıma maksimumu",
      "Glukoz taşıma maksimumu"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve fizyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-glutatyon-tukenmesi",
    "term": "Glutatyon tükenmesi",
    "aliases": [
      "Glutatyon tükenmesi"
    ],
    "normalizedTerm": "glutatyon tukenmesi",
    "TurkishName": "Glutatyon tükenmesi",
    "EnglishName": "",
    "category": "Biyokimya / Genetik / Metabolizma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Glutatyon tükenmesi, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "definition": "Glutatyon tükenmesi, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "detailedExplanation": "Doğru cevap A’dır. Parasetamol normal dozlarda çoğunlukla glukuronidasyon ve sülfatlama ile metabolize edilir; küçük bir kısmı CYP aracılığıyla NAPQI’ye dönüşür. NAPQI normalde glutatyonla bağlanarak zararsız hâle getirilir. Aşırı dozda glutatyon depoları tükenir ve NAPQI hepatosit proteinlerine bağlanarak özellikle santral lobüler karaciğer hasarı oluşturur. N-asetilsistein glutatyon sentezi için sistein sağlar ve...",
    "postAnswerExplanation": "Doğru cevap A’dır. Parasetamol normal dozlarda çoğunlukla glukuronidasyon ve sülfatlama ile metabolize edilir; küçük bir kısmı CYP aracılığıyla NAPQI’ye dönüşür. NAPQI normalde glutatyonla bağlanarak zararsız hâle getirilir. Aşırı dozda glutatyon depoları tükenir ve NAPQI hepatosit proteinlerine bağlanarak özellikle santral lobüler karaciğer hasarı oluşturur. N-asetilsistein glutatyon sentezi için sistein sağlar ve...",
    "postAnswerExpandedExplanation": "Doğru cevap A’dır. Parasetamol normal dozlarda çoğunlukla glukuronidasyon ve sülfatlama ile metabolize edilir; küçük bir kısmı CYP aracılığıyla NAPQI’ye dönüşür. NAPQI normalde glutatyonla bağlanarak zararsız hâle getirilir. Aşırı dozda glutatyon depoları tükenir ve NAPQI hepatosit proteinlerine bağlanarak özellikle santral lobüler karaciğer hasarı oluşturur. N-asetilsistein glutatyon sentezi için sistein sağlar ve...",
    "tusPearl": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "differentialPoint": "Benzer metabolik hastalıklardan ayrım, hangi metabolitin biriktiği ve atağı neyin tetiklediği üzerinden yapılır.",
    "clinicalRelevance": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "genetics"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Glutatyon tükenmesi"
    ],
    "sourceTextExamples": [
      "Doğru cevap A’dır. Parasetamol normal dozlarda çoğunlukla glukuronidasyon ve sülfatlama ile metabolize edilir; küçük bir kısmı CYP aracılığıyla NAPQI’ye dönüşür. NAPQI normalde glutatyonla bağlanarak zararsız hâle getirilir.",
      "Parasetamol toksisitesi = NAPQI birikimi + glutatyon tükenmesi; antidot N-asetilsistein glutatyonu yeniler."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 11,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve biyokimya / genetik / metabolizma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-granuler-igg-ve-c3-birikimi",
    "term": "Granüler IgG ve C3 birikimi",
    "aliases": [
      "Granüler IgG ve C3 birikimi"
    ],
    "normalizedTerm": "granuler igg ve c3 birikimi",
    "TurkishName": "Granüler IgG ve C3 birikimi",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Granüler IgG ve C3 birikimi, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "Granüler IgG ve C3 birikimi, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "Kapiller duvar boyunca granüler IgG ve C3 birikimi izlendi. Erişkin nefrotik sendromunda glomerüler bazal membran kalınlaşması, subepitelyal immün kompleks birikimi, granüler IgG-C3 ve spike görünümü membranöz nefropatiyi düşündürür.",
    "postAnswerExplanation": "Kapiller duvar boyunca granüler IgG ve C3 birikimi izlendi. Erişkin nefrotik sendromunda glomerüler bazal membran kalınlaşması, subepitelyal immün kompleks birikimi, granüler IgG-C3 ve spike görünümü membranöz nefropatiyi düşündürür.",
    "postAnswerExpandedExplanation": "Kapiller duvar boyunca granüler IgG ve C3 birikimi izlendi. Erişkin nefrotik sendromunda glomerüler bazal membran kalınlaşması, subepitelyal immün kompleks birikimi, granüler IgG-C3 ve spike görünümü membranöz nefropatiyi düşündürür.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [
      "IgG",
      "C3"
    ],
    "safeNestedTerms": [
      "IgG",
      "C3"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Granüler IgG ve C3 birikimi",
      "IgG",
      "C3"
    ],
    "sourceTextExamples": [
      "Kapiller duvar boyunca granüler IgG ve C3 birikimi izlendi.",
      "Kapiller duvar boyunca granüler IgG ve C3 birikimi izlendi."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 8,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-granulom-yapisi",
    "term": "Granülom yapısı",
    "aliases": [
      "Granülom yapısı"
    ],
    "normalizedTerm": "granulom yapisi",
    "TurkishName": "Granülom yapısı",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Makrofajların epiteloid dönüşümü ve dev hücreler granülom morfolojisini oluşturur.",
    "definition": "Makrofajların epiteloid dönüşümü ve dev hücreler granülom morfolojisini oluşturur.",
    "detailedExplanation": "Granülom yapısı Makrofajların epiteloid dönüşümü ve dev hücreler granülom morfolojisini oluşturur.",
    "postAnswerExplanation": "Granülom yapısı Makrofajların epiteloid dönüşümü ve dev hücreler granülom morfolojisini oluşturur.",
    "postAnswerExpandedExplanation": "Granülom yapısı Makrofajların epiteloid dönüşümü ve dev hücreler granülom morfolojisini oluşturur.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Granülom yapısı"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-hbsag-negatif-anti-hbs-negatif-anti-hbc-igm-pozitifligi",
    "term": "HBsAg negatif anti-HBs negatif anti-HBc IgM pozitifliği",
    "aliases": [
      "HBsAg negatif anti-HBs negatif anti-HBc IgM pozitifliği"
    ],
    "normalizedTerm": "hbsag negatif anti-hbs negatif anti-hbc igm pozitifligi",
    "TurkishName": "HBsAg negatif anti-HBs negatif anti-HBc IgM pozitifliği",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "HBV serolojisinde pencere dönemi, yüzey antijeninin saptanamaz hâle geldiği ancak koruyucu anti-HBs antikorunun henüz ölçülebilir düzeye ulaşmadığı aralıktır.",
    "definition": "HBV serolojisinde pencere dönemi, yüzey antijeninin saptanamaz hâle geldiği ancak koruyucu anti-HBs antikorunun henüz ölçülebilir düzeye ulaşmadığı aralıktır.",
    "detailedExplanation": "HBV serolojisinde pencere dönemi, yüzey antijeninin saptanamaz hâle geldiği ancak koruyucu anti-HBs antikorunun henüz ölçülebilir düzeye ulaşmadığı aralıktır. Bu aralıkta HBsAg negatif, anti-HBs negatif olabilir; bu nedenle bu iki belirtece bakmak tanıyı kaçırabilir. Anti-HBc IgM ise akut veya yakın dönem HBV enfeksiyonunu gösterir ve pencere döneminde tanısal olarak en değerlidir. HBeAg viral replikasyon ve...",
    "postAnswerExplanation": "HBV serolojisinde pencere dönemi, yüzey antijeninin saptanamaz hâle geldiği ancak koruyucu anti-HBs antikorunun henüz ölçülebilir düzeye ulaşmadığı aralıktır. Bu aralıkta HBsAg negatif, anti-HBs negatif olabilir; bu nedenle bu iki belirtece bakmak tanıyı kaçırabilir. Anti-HBc IgM ise akut veya yakın dönem HBV enfeksiyonunu gösterir ve pencere döneminde tanısal olarak en değerlidir. HBeAg viral replikasyon ve...",
    "postAnswerExpandedExplanation": "HBV serolojisinde pencere dönemi, yüzey antijeninin saptanamaz hâle geldiği ancak koruyucu anti-HBs antikorunun henüz ölçülebilir düzeye ulaşmadığı aralıktır. Bu aralıkta HBsAg negatif, anti-HBs negatif olabilir; bu nedenle bu iki belirtece bakmak tanıyı kaçırabilir. Anti-HBc IgM ise akut veya yakın dönem HBV enfeksiyonunu gösterir ve pencere döneminde tanısal olarak en değerlidir. HBeAg viral replikasyon ve...",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [
      "IgM"
    ],
    "safeNestedTerms": [
      "IgM"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "HBsAg negatif anti-HBs negatif anti-HBc IgM pozitifliği",
      "IgM"
    ],
    "sourceTextExamples": [
      "HBV serolojisinde pencere dönemi, yüzey antijeninin saptanamaz hâle geldiği ancak koruyucu anti-HBs antikorunun henüz ölçülebilir düzeye ulaşmadığı aralıktır. Bu aralıkta HBsAg negatif, anti-HBs negatif olabilir; bu nedenle bu iki belirtece bakmak tanıyı kaçırabilir.",
      "HBV serolojisinde pencere dönemi, yüzey antijeninin saptanamaz hâle geldiği ancak koruyucu anti-HBs antikorunun henüz ölçülebilir düzeye ulaşmadığı aralıktır. Bu aralıkta HBsAg negatif, anti-HBs negatif olabilir; bu nedenle bu iki belirtece bakmak tanıyı kaçırabilir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-hematokezya",
    "term": "Hematokezya",
    "aliases": [
      "Hematokezya",
      "rektal kanama",
      "parlak kırmızı dışkılama"
    ],
    "normalizedTerm": "hematokezya",
    "TurkishName": "Hematokezya",
    "EnglishName": "",
    "category": "Temel bulgu / gastroenteroloji",
    "subcategory": "gastroenteroloji",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Alt GİS kanamasını düşündüren dışkılama bulgusudur.",
    "preAnswerSafeDefinition": "Alt GİS kanamasını düşündüren dışkılama bulgusudur.",
    "shortDefinition": "Rektumdan parlak kırmızı veya bordo kan gelmesidir.",
    "definition": "Rektumdan parlak kırmızı veya bordo kan gelmesidir.",
    "detailedExplanation": "Genellikle alt GİS kaynaklıdır; masif üst GİS kanamada da hematokezya olabilir, bu yüzden hemodinami önemlidir.",
    "postAnswerExplanation": "Genellikle alt GİS kaynaklıdır; masif üst GİS kanamada da hematokezya olabilir, bu yüzden hemodinami önemlidir.",
    "postAnswerExpandedExplanation": "Genellikle alt GİS kaynaklıdır; masif üst GİS kanamada da hematokezya olabilir, bu yüzden hemodinami önemlidir.",
    "tusPearl": "Hematokezya + hipotansiyon = masif kanama; üst kaynak da olabilir.",
    "differentialPoint": "",
    "clinicalRelevance": "Hematokezya + hipotansiyon = masif kanama; üst kaynak da olabilir.",
    "mechanism": "",
    "relatedBranches": [
      "gastroenterology"
    ],
    "relatedTerms": [
      "Kırmızı bayrak",
      "Klinik bağlam"
    ],
    "safeNestedTerms": [
      "Kırmızı bayrak",
      "Klinik bağlam"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Hematokezya",
      "rektal kanama",
      "parlak kırmızı dışkılama",
      "Kırmızı bayrak",
      "Klinik bağlam"
    ],
    "sourceTextExamples": [
      "Çocuk, tekrarlayan ağrısız koyu kırmızı rektal kanama nedeniyle başvuruyor.",
      "Çocuk, tekrarlayan ağrısız koyu kırmızı rektal kanama nedeniyle başvuruyor."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 19,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addFoundationEntryLowPriority",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Basit ama sık karşılaşılan klinik terminoloji; düşük matchingPriority ile, özellikle feedback ve açıklama alanlarında öğretici tooltip olarak kullanılmalı.",
      "droppedAliases": []
    },
    "contextRequired": true,
    "requiredCoTerms": [
      "Kırmızı bayrak",
      "Klinik bağlam"
    ],
    "standaloneSafe": false
  },
  {
    "id": "v330-ultradeep-batch5-6-herediter-hemokromatoz",
    "term": "Herediter hemokromatoz",
    "aliases": [
      "Herediter hemokromatoz"
    ],
    "normalizedTerm": "herediter hemokromatoz",
    "TurkishName": "Herediter hemokromatoz",
    "EnglishName": "",
    "category": "Biyokimya / Genetik / Metabolizma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Herediter hemokromatoz, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "definition": "Herediter hemokromatoz, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "detailedExplanation": "Herediter hemokromatozis laboratuvar paterni Doğru cevap A’dır. Herediter hemokromatoziste en sık HFE ilişkili hepcidin düzenleme bozukluğu sonucunda bağırsaktan demir emilimi artar. Plazmada demir yükü arttıkça transferrin satürasyonu yükselir; depo demiri arttığında ferritin de artar. Demir eksikliği anemisinde ise serum demiri ve ferritin azalır, total demir bağlama kapasitesi artar; bu patern hemokromatozisin...",
    "postAnswerExplanation": "Herediter hemokromatozis laboratuvar paterni Doğru cevap A’dır. Herediter hemokromatoziste en sık HFE ilişkili hepcidin düzenleme bozukluğu sonucunda bağırsaktan demir emilimi artar. Plazmada demir yükü arttıkça transferrin satürasyonu yükselir; depo demiri arttığında ferritin de artar. Demir eksikliği anemisinde ise serum demiri ve ferritin azalır, total demir bağlama kapasitesi artar; bu patern hemokromatozisin...",
    "postAnswerExpandedExplanation": "Herediter hemokromatozis laboratuvar paterni Doğru cevap A’dır. Herediter hemokromatoziste en sık HFE ilişkili hepcidin düzenleme bozukluğu sonucunda bağırsaktan demir emilimi artar. Plazmada demir yükü arttıkça transferrin satürasyonu yükselir; depo demiri arttığında ferritin de artar. Demir eksikliği anemisinde ise serum demiri ve ferritin azalır, total demir bağlama kapasitesi artar; bu patern hemokromatozisin...",
    "tusPearl": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "differentialPoint": "Benzer metabolik hastalıklardan ayrım, hangi metabolitin biriktiği ve atağı neyin tetiklediği üzerinden yapılır.",
    "clinicalRelevance": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "genetics"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Herediter hemokromatoz"
    ],
    "sourceTextExamples": [
      "Herediter hemokromatozis laboratuvar paterni",
      "Herediter hemokromatozis laboratuvar paterni"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 31,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve biyokimya / genetik / metabolizma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-hiperakut-greft-rejeksiyonu",
    "term": "Hiperakut greft rejeksiyonu",
    "aliases": [
      "Hiperakut greft rejeksiyonu"
    ],
    "normalizedTerm": "hiperakut greft rejeksiyonu",
    "TurkishName": "Hiperakut greft rejeksiyonu",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Hiperakut greft rejeksiyonu, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "Hiperakut greft rejeksiyonu, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "Hiperakut greft rejeksiyonu Alıcıda önceden var olan anti-donör antikorlar kompleman aktivasyonu ve tromboza yol açar.",
    "postAnswerExplanation": "Hiperakut greft rejeksiyonu Alıcıda önceden var olan anti-donör antikorlar kompleman aktivasyonu ve tromboza yol açar.",
    "postAnswerExpandedExplanation": "Hiperakut greft rejeksiyonu Alıcıda önceden var olan anti-donör antikorlar kompleman aktivasyonu ve tromboza yol açar.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Hiperakut greft rejeksiyonu"
    ],
    "sourceTextExamples": [
      "Hiperakut greft rejeksiyonu",
      "Hiperakut greft rejeksiyonu"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-hiperurisemi-plus-kendine-zarar-verme-davranisi",
    "term": "Hiperürisemi + kendine zarar verme davranışı",
    "aliases": [
      "Hiperürisemi + kendine zarar verme davranışı"
    ],
    "normalizedTerm": "hiperurisemi + kendine zarar verme davranisi",
    "TurkishName": "Hiperürisemi + kendine zarar verme davranışı",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Erkek çocukta nörogelişimsel bozukluk, kendine zarar verme davranışı, distoni, hiperürisemi ve ürat kristalleri Lesch-Nyhan sendromunu düşündürür.",
    "definition": "Erkek çocukta nörogelişimsel bozukluk, kendine zarar verme davranışı, distoni, hiperürisemi ve ürat kristalleri Lesch-Nyhan sendromunu düşündürür.",
    "detailedExplanation": "Erkek çocukta nörogelişimsel bozukluk, kendine zarar verme davranışı, distoni, hiperürisemi ve ürat kristalleri Lesch-Nyhan sendromunu düşündürür. Temel defekt purin kurtarma yolunda hipoksantin-guanin fosforiboziltransferaz eksikliğidir; bu durum purinlerin yıkıma gitmesini artırarak ürik asit üretimini yükseltir. Erkek çocukta nörogelişimsel bozukluk, kendine zarar verme davranışı, distoni, hiperürisemi ve ürat...",
    "postAnswerExplanation": "Erkek çocukta nörogelişimsel bozukluk, kendine zarar verme davranışı, distoni, hiperürisemi ve ürat kristalleri Lesch-Nyhan sendromunu düşündürür. Temel defekt purin kurtarma yolunda hipoksantin-guanin fosforiboziltransferaz eksikliğidir; bu durum purinlerin yıkıma gitmesini artırarak ürik asit üretimini yükseltir. Erkek çocukta nörogelişimsel bozukluk, kendine zarar verme davranışı, distoni, hiperürisemi ve ürat...",
    "postAnswerExpandedExplanation": "Erkek çocukta nörogelişimsel bozukluk, kendine zarar verme davranışı, distoni, hiperürisemi ve ürat kristalleri Lesch-Nyhan sendromunu düşündürür. Temel defekt purin kurtarma yolunda hipoksantin-guanin fosforiboziltransferaz eksikliğidir; bu durum purinlerin yıkıma gitmesini artırarak ürik asit üretimini yükseltir. Erkek çocukta nörogelişimsel bozukluk, kendine zarar verme davranışı, distoni, hiperürisemi ve ürat...",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Hiperürisemi + kendine zarar verme davranışı"
    ],
    "sourceTextExamples": [
      "Erkek çocukta nörogelişimsel bozukluk, kendine zarar verme davranışı, distoni, hiperürisemi ve ürat kristalleri Lesch-Nyhan sendromunu düşündürür.",
      "Lesch-Nyhan sendromu X’e bağlıdır; hipoksantin-guanin fosforiboziltransferaz eksikliği, hiperürisemi ve kendine zarar verme davranışıyla hatırlanır."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-hirschsprung-hastaligi-kokeni",
    "term": "Hirschsprung hastalığı kökeni",
    "aliases": [
      "Hirschsprung hastalığı kökeni"
    ],
    "normalizedTerm": "hirschsprung hastaligi kokeni",
    "TurkishName": "Hirschsprung hastalığı kökeni",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Enterik ganglionlar nöral krest kökenlidir; migrasyon bozulursa aganglionik segment gelişir.",
    "definition": "Enterik ganglionlar nöral krest kökenlidir; migrasyon bozulursa aganglionik segment gelişir.",
    "detailedExplanation": "Hirschsprung hastalığı kökeni Enterik ganglionlar nöral krest kökenlidir; migrasyon bozulursa aganglionik segment gelişir.",
    "postAnswerExplanation": "Hirschsprung hastalığı kökeni Enterik ganglionlar nöral krest kökenlidir; migrasyon bozulursa aganglionik segment gelişir.",
    "postAnswerExpandedExplanation": "Hirschsprung hastalığı kökeni Enterik ganglionlar nöral krest kökenlidir; migrasyon bozulursa aganglionik segment gelişir.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Hirschsprung hastalığı kökeni"
    ],
    "sourceTextExamples": [
      "Hirschsprung hastalığı kökeni",
      "Hirschsprung hastalığı kökeni"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-iga-nefropatisi-hematuri-zamani",
    "term": "IgA nefropatisi hematüri zamanı",
    "aliases": [
      "IgA nefropatisi hematüri zamanı"
    ],
    "normalizedTerm": "iga nefropatisi hematuri zamani",
    "TurkishName": "IgA nefropatisi hematüri zamanı",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "IgA nefropatisi hematüri zamanı, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "IgA nefropatisi hematüri zamanı, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "IgA nefropatisi hematüri zamanı Mezangial IgA birikimi sinfarenjit hematuri paterni oluşturabilir.",
    "postAnswerExplanation": "IgA nefropatisi hematüri zamanı Mezangial IgA birikimi sinfarenjit hematuri paterni oluşturabilir.",
    "postAnswerExpandedExplanation": "IgA nefropatisi hematüri zamanı Mezangial IgA birikimi sinfarenjit hematuri paterni oluşturabilir.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [
      "IgA"
    ],
    "safeNestedTerms": [
      "IgA"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "IgA nefropatisi hematüri zamanı",
      "IgA"
    ],
    "sourceTextExamples": [
      "IgA nefropatisi hematüri zamanı",
      "IgA nefropatisi hematüri zamanı"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-kras-ve-nras-mutasyonlari",
    "term": "KRAS ve NRAS mutasyonları",
    "aliases": [
      "KRAS ve NRAS mutasyonları"
    ],
    "normalizedTerm": "kras ve nras mutasyonlari",
    "TurkishName": "KRAS ve NRAS mutasyonları",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Enzim/genetik defekt",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "RAS mutasyonu varsa EGFR hedefli tedaviden beklenen yanıt azalır.",
    "definition": "RAS mutasyonu varsa EGFR hedefli tedaviden beklenen yanıt azalır.",
    "detailedExplanation": "KRAS ve NRAS mutasyonları. RAS mutasyonu varsa EGFR hedefli tedaviden beklenen yanıt azalır.",
    "postAnswerExplanation": "KRAS ve NRAS mutasyonları. RAS mutasyonu varsa EGFR hedefli tedaviden beklenen yanıt azalır.",
    "postAnswerExpandedExplanation": "KRAS ve NRAS mutasyonları. RAS mutasyonu varsa EGFR hedefli tedaviden beklenen yanıt azalır.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "KRAS ve NRAS mutasyonları"
    ],
    "sourceTextExamples": [
      "KRAS ve NRAS mutasyonları.",
      "KRAS ve NRAS mutasyonları."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 2,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-kapiller-starling-kuvvetleri",
    "term": "Kapiller Starling kuvvetleri",
    "aliases": [
      "Kapiller Starling kuvvetleri"
    ],
    "normalizedTerm": "kapiller starling kuvvetleri",
    "TurkishName": "Kapiller Starling kuvvetleri",
    "EnglishName": "",
    "category": "Fizyoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Vücut fonksiyonlarının düzenlenmesiyle ilişkili fizyolojik bir ilişkiyi ifade eder.",
    "preAnswerSafeDefinition": "Vücut fonksiyonlarının düzenlenmesiyle ilişkili fizyolojik bir ilişkiyi ifade eder.",
    "shortDefinition": "nde hidrostatik basınç artışına bağlı ödem mekanizmasını açıklayabilme Kalp yetmezliğinde venöz basınç artışı kapiller hidrostatik basıncı yükseltir.",
    "definition": "nde hidrostatik basınç artışına bağlı ödem mekanizmasını açıklayabilme Kalp yetmezliğinde venöz basınç artışı kapiller hidrostatik basıncı yükseltir.",
    "detailedExplanation": "Kapiller Starling kuvvetlerinde hidrostatik basınç artışına bağlı ödem mekanizmasını açıklayabilme Kalp yetmezliğinde venöz basınç artışı kapiller hidrostatik basıncı yükseltir. Bu durum sıvının interstisyuma geçişini artırır ve gode bırakan periferik ödem oluşur.",
    "postAnswerExplanation": "Kapiller Starling kuvvetlerinde hidrostatik basınç artışına bağlı ödem mekanizmasını açıklayabilme Kalp yetmezliğinde venöz basınç artışı kapiller hidrostatik basıncı yükseltir. Bu durum sıvının interstisyuma geçişini artırır ve gode bırakan periferik ödem oluşur.",
    "postAnswerExpandedExplanation": "Kapiller Starling kuvvetlerinde hidrostatik basınç artışına bağlı ödem mekanizmasını açıklayabilme Kalp yetmezliğinde venöz basınç artışı kapiller hidrostatik basıncı yükseltir. Bu durum sıvının interstisyuma geçişini artırır ve gode bırakan periferik ödem oluşur.",
    "tusPearl": "Fizyoloji sorusunda yönü kaçırma: değişken artınca hangi kompansasyonun devreye girdiği sorulur.",
    "differentialPoint": "Ayırıcı nokta, primer değişken ile kompansatuvar yanıtın birbirine karıştırılmamasıdır.",
    "clinicalRelevance": "Fizyoloji sorusunda yönü kaçırma: değişken artınca hangi kompansasyonun devreye girdiği sorulur.",
    "mechanism": "",
    "relatedBranches": [
      "physiology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Kapiller Starling kuvvetleri"
    ],
    "sourceTextExamples": [
      "Kapiller Starling kuvvetlerinde hidrostatik basınç artışına bağlı ödem mekanizmasını açıklayabilme",
      "Kapiller Starling kuvvetlerinde hidrostatik basınç artışına bağlı ödem mekanizmasını açıklayabilme"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 3,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve fizyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-karbondioksit-atilimi-ile-metabolik-asidoz-kompanzasyonu",
    "term": "Karbondioksit atılımı ile metabolik asidoz kompanzasyonu",
    "aliases": [
      "Karbondioksit atılımı ile metabolik asidoz kompanzasyonu"
    ],
    "normalizedTerm": "karbondioksit atilimi ile metabolik asidoz kompanzasyonu",
    "TurkishName": "Karbondioksit atılımı ile metabolik asidoz kompanzasyonu",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Bu hastada primer bozukluk düşük bikarbonatla seyreden metabolik asidozdur.",
    "definition": "Bu hastada primer bozukluk düşük bikarbonatla seyreden metabolik asidozdur.",
    "detailedExplanation": "Bu hastada primer bozukluk düşük bikarbonatla seyreden metabolik asidozdur. Periferik ve santral kemoreseptör yanıtları ventilasyonu artırır; karbondioksit atılımı artınca PaCO2 düşer ve Henderson-Hasselbalch ilişkisi üzerinden pH düşüşü kısmen kompanse edilir. Bu hastada primer bozukluk düşük bikarbonatla seyreden metabolik asidozdur. Periferik ve santral kemoreseptör yanıtları ventilasyonu artırır; karbondioksit...",
    "postAnswerExplanation": "Bu hastada primer bozukluk düşük bikarbonatla seyreden metabolik asidozdur. Periferik ve santral kemoreseptör yanıtları ventilasyonu artırır; karbondioksit atılımı artınca PaCO2 düşer ve Henderson-Hasselbalch ilişkisi üzerinden pH düşüşü kısmen kompanse edilir. Bu hastada primer bozukluk düşük bikarbonatla seyreden metabolik asidozdur. Periferik ve santral kemoreseptör yanıtları ventilasyonu artırır; karbondioksit...",
    "postAnswerExpandedExplanation": "Bu hastada primer bozukluk düşük bikarbonatla seyreden metabolik asidozdur. Periferik ve santral kemoreseptör yanıtları ventilasyonu artırır; karbondioksit atılımı artınca PaCO2 düşer ve Henderson-Hasselbalch ilişkisi üzerinden pH düşüşü kısmen kompanse edilir. Bu hastada primer bozukluk düşük bikarbonatla seyreden metabolik asidozdur. Periferik ve santral kemoreseptör yanıtları ventilasyonu artırır; karbondioksit...",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [
      "metabolik asidoz"
    ],
    "safeNestedTerms": [
      "metabolik asidoz"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Karbondioksit atılımı ile metabolik asidoz kompanzasyonu",
      "metabolik asidoz"
    ],
    "sourceTextExamples": [
      "Bu hastada primer bozukluk düşük bikarbonatla seyreden metabolik asidozdur. Periferik ve santral kemoreseptör yanıtları ventilasyonu artırır; karbondioksit atılımı artınca PaCO2 düşer ve Henderson-Hasselbalch ilişkisi üzerinden pH düşüşü kısmen kompanse edilir.",
      "Karbondioksit atılımının artması metabolik asidozda pH düşüşünü sınırlayan temel solunumsal kompanzasyondur."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-karbonmonoksit-zehirlenmesinde-sola-kaymis-oksijen-hemoglobin-egrisi",
    "term": "Karbonmonoksit zehirlenmesinde sola kaymış oksijen-hemoglobin eğrisi",
    "aliases": [
      "Karbonmonoksit zehirlenmesinde sola kaymış oksijen-hemoglobin eğrisi"
    ],
    "normalizedTerm": "karbonmonoksit zehirlenmesinde sola kaymis oksijen-hemoglobin egrisi",
    "TurkishName": "Karbonmonoksit zehirlenmesinde sola kaymış oksijen-hemoglobin eğrisi",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Toksin / toksisite",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Karbonmonoksit zehirlenmesinde oksijen-hemoglobin eğrisi değişimini açıklayabilme Kapalı ortamda jeneratör maruziyeti, normal pulse oksimetreye rağmen nörolojik bulgular ve yüksek karboksihemoglobin karbonmonoksit zehirlenmesini gösterir.",
    "definition": "Karbonmonoksit zehirlenmesinde oksijen-hemoglobin eğrisi değişimini açıklayabilme Kapalı ortamda jeneratör maruziyeti, normal pulse oksimetreye rağmen nörolojik bulgular ve yüksek karboksihemoglobin karbonmonoksit zehirlenmesini gösterir.",
    "detailedExplanation": "Karbonmonoksit zehirlenmesinde oksijen-hemoglobin eğrisi değişimini açıklayabilme Kapalı ortamda jeneratör maruziyeti, normal pulse oksimetreye rağmen nörolojik bulgular ve yüksek karboksihemoglobin karbonmonoksit zehirlenmesini gösterir. Karbonmonoksit hemoglobine yüksek afiniteli bağlanarak oksijen taşıma kapasitesini azaltır ve kalan oksijen bağlanma bölgelerinin afinitesini artırarak oksijen-hemoglobin ayrışma...",
    "postAnswerExplanation": "Karbonmonoksit zehirlenmesinde oksijen-hemoglobin eğrisi değişimini açıklayabilme Kapalı ortamda jeneratör maruziyeti, normal pulse oksimetreye rağmen nörolojik bulgular ve yüksek karboksihemoglobin karbonmonoksit zehirlenmesini gösterir. Karbonmonoksit hemoglobine yüksek afiniteli bağlanarak oksijen taşıma kapasitesini azaltır ve kalan oksijen bağlanma bölgelerinin afinitesini artırarak oksijen-hemoglobin ayrışma...",
    "postAnswerExpandedExplanation": "Karbonmonoksit zehirlenmesinde oksijen-hemoglobin eğrisi değişimini açıklayabilme Kapalı ortamda jeneratör maruziyeti, normal pulse oksimetreye rağmen nörolojik bulgular ve yüksek karboksihemoglobin karbonmonoksit zehirlenmesini gösterir. Karbonmonoksit hemoglobine yüksek afiniteli bağlanarak oksijen taşıma kapasitesini azaltır ve kalan oksijen bağlanma bölgelerinin afinitesini artırarak oksijen-hemoglobin ayrışma...",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [
      "oksijen",
      "hemoglobin"
    ],
    "safeNestedTerms": [
      "oksijen",
      "hemoglobin"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Karbonmonoksit zehirlenmesinde sola kaymış oksijen-hemoglobin eğrisi",
      "oksijen",
      "hemoglobin"
    ],
    "sourceTextExamples": [
      "Karbonmonoksit zehirlenmesinde oksijen-hemoglobin eğrisi değişimini açıklayabilme",
      "Karbonmonoksit zehirlenmesinde oksijen-hemoglobin eğrisi değişimini açıklayabilme"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 2,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-karnitin-palmitoiltransferaz-ii-eksikligi",
    "term": "Karnitin palmitoiltransferaz II eksikliği",
    "aliases": [
      "Karnitin palmitoiltransferaz II eksikliği"
    ],
    "normalizedTerm": "karnitin palmitoiltransferaz ii eksikligi",
    "TurkishName": "Karnitin palmitoiltransferaz II eksikliği",
    "EnglishName": "",
    "category": "Biyokimya / Genetik / Metabolizma",
    "subcategory": "Enzim/genetik defekt",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Karnitin palmitoiltransferaz II eksikliği, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "definition": "Karnitin palmitoiltransferaz II eksikliği, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "detailedExplanation": "Karnitin palmitoiltransferaz II eksikliği. Uzun zincirli yağ asitlerinin mitokondri içinde oksidasyonu bozulur.",
    "postAnswerExplanation": "Karnitin palmitoiltransferaz II eksikliği. Uzun zincirli yağ asitlerinin mitokondri içinde oksidasyonu bozulur.",
    "postAnswerExpandedExplanation": "Karnitin palmitoiltransferaz II eksikliği. Uzun zincirli yağ asitlerinin mitokondri içinde oksidasyonu bozulur.",
    "tusPearl": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "differentialPoint": "Benzer metabolik hastalıklardan ayrım, hangi metabolitin biriktiği ve atağı neyin tetiklediği üzerinden yapılır.",
    "clinicalRelevance": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "genetics"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "Karnitin palmitoiltransferaz II eksikliği"
    ],
    "sourceTextExamples": [
      "Karnitin palmitoiltransferaz II eksikliği.",
      "Karnitin palmitoiltransferaz II eksikliği."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 2,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve biyokimya / genetik / metabolizma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-karpal-tunel-icerigi",
    "term": "Karpal tünel içeriği",
    "aliases": [
      "Karpal tünel içeriği"
    ],
    "normalizedTerm": "karpal tunel icerigi",
    "TurkishName": "Karpal tünel içeriği",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "ni Guyon kanalı ve yüzeyel duyu dallarından ayırt edebilme Nervus medianus karpal tünel sendromunda basıya uğrayan temel sinirdir.",
    "definition": "ni Guyon kanalı ve yüzeyel duyu dallarından ayırt edebilme Nervus medianus karpal tünel sendromunda basıya uğrayan temel sinirdir.",
    "detailedExplanation": "Karpal tünel içeriğini Guyon kanalı ve yüzeyel duyu dallarından ayırt edebilme Nervus medianus karpal tünel sendromunda basıya uğrayan temel sinirdir. Nervus ulnaris karpal tünelden değil Guyon kanalından geçer; nervus medianus’un palmar dalı ise fleksör retinakulumun üzerinden geçtiği için karpal tünel basısında genellikle korunur. Karpal tünelden fleksör tendonlarla birlikte nervus medianus geçer; nervus ulnaris...",
    "postAnswerExplanation": "Karpal tünel içeriğini Guyon kanalı ve yüzeyel duyu dallarından ayırt edebilme Nervus medianus karpal tünel sendromunda basıya uğrayan temel sinirdir. Nervus ulnaris karpal tünelden değil Guyon kanalından geçer; nervus medianus’un palmar dalı ise fleksör retinakulumun üzerinden geçtiği için karpal tünel basısında genellikle korunur. Karpal tünelden fleksör tendonlarla birlikte nervus medianus geçer; nervus ulnaris...",
    "postAnswerExpandedExplanation": "Karpal tünel içeriğini Guyon kanalı ve yüzeyel duyu dallarından ayırt edebilme Nervus medianus karpal tünel sendromunda basıya uğrayan temel sinirdir. Nervus ulnaris karpal tünelden değil Guyon kanalından geçer; nervus medianus’un palmar dalı ise fleksör retinakulumun üzerinden geçtiği için karpal tünel basısında genellikle korunur. Karpal tünelden fleksör tendonlarla birlikte nervus medianus geçer; nervus ulnaris...",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "safeNestedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Karpal tünel içeriği",
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "sourceTextExamples": [
      "Karpal tünel içeriğini Guyon kanalı ve yüzeyel duyu dallarından ayırt edebilme",
      "Karpal tünel içeriğini Guyon kanalı ve yüzeyel duyu dallarından ayırt edebilme"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 38,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-kolesistokinin-etkisi",
    "term": "Kolesistokinin etkisi",
    "aliases": [
      "Kolesistokinin etkisi"
    ],
    "normalizedTerm": "kolesistokinin etkisi",
    "TurkishName": "Kolesistokinin etkisi",
    "EnglishName": "",
    "category": "Fizyoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Vücut fonksiyonlarının düzenlenmesiyle ilişkili fizyolojik bir ilişkiyi ifade eder.",
    "preAnswerSafeDefinition": "Vücut fonksiyonlarının düzenlenmesiyle ilişkili fizyolojik bir ilişkiyi ifade eder.",
    "shortDefinition": "CCK duodenal yağ ve aminoasitlere yanıt verir; safra kesesini kasar, Oddi sfinkterini gevşetir.",
    "definition": "CCK duodenal yağ ve aminoasitlere yanıt verir; safra kesesini kasar, Oddi sfinkterini gevşetir.",
    "detailedExplanation": "Kolesistokinin etkisi CCK duodenal yağ ve aminoasitlere yanıt verir; safra kesesini kasar, Oddi sfinkterini gevşetir.",
    "postAnswerExplanation": "Kolesistokinin etkisi CCK duodenal yağ ve aminoasitlere yanıt verir; safra kesesini kasar, Oddi sfinkterini gevşetir.",
    "postAnswerExpandedExplanation": "Kolesistokinin etkisi CCK duodenal yağ ve aminoasitlere yanıt verir; safra kesesini kasar, Oddi sfinkterini gevşetir.",
    "tusPearl": "Fizyoloji sorusunda yönü kaçırma: değişken artınca hangi kompansasyonun devreye girdiği sorulur.",
    "differentialPoint": "Ayırıcı nokta, primer değişken ile kompansatuvar yanıtın birbirine karıştırılmamasıdır.",
    "clinicalRelevance": "Fizyoloji sorusunda yönü kaçırma: değişken artınca hangi kompansasyonun devreye girdiği sorulur.",
    "mechanism": "",
    "relatedBranches": [
      "physiology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Kolesistokinin etkisi"
    ],
    "sourceTextExamples": [
      "Kolesistokinin etkisi",
      "Kolesistokinin etkisi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addAsSafeNestedTerm",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve fizyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-kolorektal-adenokarsinom",
    "term": "Kolorektal adenokarsinom",
    "aliases": [
      "Kolorektal adenokarsinom"
    ],
    "normalizedTerm": "kolorektal adenokarsinom",
    "TurkishName": "Kolorektal adenokarsinom",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "definition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "detailedExplanation": "Kolorektal adenokarsinomda sol kolon yerleşiminin klinik ve morfolojik özelliklerini tanıyabilme Yaşlı hastada dışkılama alışkanlığında değişiklik, dışkı çapında incelme, rektal kanama, kilo kaybı, anemi ve sigmoid kolonda lümeni daraltan halka şeklinde kitle kolorektal adenokarsinomu düşündürür. Biyopside atipik glandüler invaziv tümör varlığı tanıyı destekler.",
    "postAnswerExplanation": "Kolorektal adenokarsinomda sol kolon yerleşiminin klinik ve morfolojik özelliklerini tanıyabilme Yaşlı hastada dışkılama alışkanlığında değişiklik, dışkı çapında incelme, rektal kanama, kilo kaybı, anemi ve sigmoid kolonda lümeni daraltan halka şeklinde kitle kolorektal adenokarsinomu düşündürür. Biyopside atipik glandüler invaziv tümör varlığı tanıyı destekler.",
    "postAnswerExpandedExplanation": "Kolorektal adenokarsinomda sol kolon yerleşiminin klinik ve morfolojik özelliklerini tanıyabilme Yaşlı hastada dışkılama alışkanlığında değişiklik, dışkı çapında incelme, rektal kanama, kilo kaybı, anemi ve sigmoid kolonda lümeni daraltan halka şeklinde kitle kolorektal adenokarsinomu düşündürür. Biyopside atipik glandüler invaziv tümör varlığı tanıyı destekler.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Kolorektal adenokarsinom"
    ],
    "sourceTextExamples": [
      "Kolorektal adenokarsinomda sol kolon yerleşiminin klinik ve morfolojik özelliklerini tanıyabilme",
      "Kolorektal adenokarsinom"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 14,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-kompleks-febril-nobet",
    "term": "Kompleks febril nöbet",
    "aliases": [
      "Kompleks febril nöbet"
    ],
    "normalizedTerm": "kompleks febril nobet",
    "TurkishName": "Kompleks febril nöbet",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Fokal, uzamış veya tekrarlayan nöbet kompleks febril nöbettir.",
    "definition": "Fokal, uzamış veya tekrarlayan nöbet kompleks febril nöbettir.",
    "detailedExplanation": "Fokal, uzamış veya tekrarlayan nöbet kompleks febril nöbettir. 15 dakikadan kısa, 24 saatte tekrarlamayan ve fokal olmayan nöbettir.",
    "postAnswerExplanation": "Fokal, uzamış veya tekrarlayan nöbet kompleks febril nöbettir. 15 dakikadan kısa, 24 saatte tekrarlamayan ve fokal olmayan nöbettir.",
    "postAnswerExpandedExplanation": "Fokal, uzamış veya tekrarlayan nöbet kompleks febril nöbettir. 15 dakikadan kısa, 24 saatte tekrarlamayan ve fokal olmayan nöbettir.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Kompleks febril nöbet"
    ],
    "sourceTextExamples": [
      "Fokal, uzamış veya tekrarlayan nöbet kompleks febril nöbettir.",
      "Kompleks febril nöbet"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 4,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-kontrastli-kolon-grafisi",
    "term": "Kontrastlı kolon grafisi",
    "aliases": [
      "Kontrastlı kolon grafisi"
    ],
    "normalizedTerm": "kontrastli kolon grafisi",
    "TurkishName": "Kontrastlı kolon grafisi",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Yenidoğanda mekonyum çıkaramama, karın distansiyonu, distal dar segment ve rektal biyopside ganglion hücrelerinin yokluğu Hirschsprung hastalığını düşündürür.",
    "definition": "Yenidoğanda mekonyum çıkaramama, karın distansiyonu, distal dar segment ve rektal biyopside ganglion hücrelerinin yokluğu Hirschsprung hastalığını düşündürür.",
    "detailedExplanation": "Kontrastlı kolon grafisi Yenidoğanda mekonyum çıkaramama, karın distansiyonu, distal dar segment ve rektal biyopside ganglion hücrelerinin yokluğu Hirschsprung hastalığını düşündürür. Temel embriyolojik kusur nöral krest kökenli enterik ganglion hücrelerinin distal bağırsak segmentine göç edememesidir; aganglionik segment gevşeyemez ve fonksiyonel obstrüksiyon gelişir.",
    "postAnswerExplanation": "Kontrastlı kolon grafisi Yenidoğanda mekonyum çıkaramama, karın distansiyonu, distal dar segment ve rektal biyopside ganglion hücrelerinin yokluğu Hirschsprung hastalığını düşündürür. Temel embriyolojik kusur nöral krest kökenli enterik ganglion hücrelerinin distal bağırsak segmentine göç edememesidir; aganglionik segment gevşeyemez ve fonksiyonel obstrüksiyon gelişir.",
    "postAnswerExpandedExplanation": "Kontrastlı kolon grafisi Yenidoğanda mekonyum çıkaramama, karın distansiyonu, distal dar segment ve rektal biyopside ganglion hücrelerinin yokluğu Hirschsprung hastalığını düşündürür. Temel embriyolojik kusur nöral krest kökenli enterik ganglion hücrelerinin distal bağırsak segmentine göç edememesidir; aganglionik segment gevşeyemez ve fonksiyonel obstrüksiyon gelişir.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "gastroenterology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Kontrastlı kolon grafisi"
    ],
    "sourceTextExamples": [
      "Kontrastlı kolon grafisi",
      "Kontrastlı kolon grafisi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 12,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-kronik-greft-rejeksiyonu",
    "term": "Kronik greft rejeksiyonu",
    "aliases": [
      "Kronik greft rejeksiyonu"
    ],
    "normalizedTerm": "kronik greft rejeksiyonu",
    "TurkishName": "Kronik greft rejeksiyonu",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Kronik greft rejeksiyonu, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "Kronik greft rejeksiyonu, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "Kronik greft rejeksiyonu Uzun süreli immün hasar vasküler daralma ve fibrozisle greft işlevini bozar.",
    "postAnswerExplanation": "Kronik greft rejeksiyonu Uzun süreli immün hasar vasküler daralma ve fibrozisle greft işlevini bozar.",
    "postAnswerExpandedExplanation": "Kronik greft rejeksiyonu Uzun süreli immün hasar vasküler daralma ve fibrozisle greft işlevini bozar.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Kronik greft rejeksiyonu"
    ],
    "sourceTextExamples": [
      "Kronik greft rejeksiyonu",
      "Kronik greft rejeksiyonu"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-kronik-respiratuvar-asidozda-renal-kompanzasyon",
    "term": "Kronik respiratuvar asidozda renal kompanzasyon",
    "aliases": [
      "Kronik respiratuvar asidozda renal kompanzasyon"
    ],
    "normalizedTerm": "kronik respiratuvar asidozda renal kompanzasyon",
    "TurkishName": "Kronik respiratuvar asidozda renal kompanzasyon",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "mekanizmasını açıklayabilme Kronik karbondioksit retansiyonu respiratuvar asidoz oluşturur.",
    "definition": "mekanizmasını açıklayabilme Kronik karbondioksit retansiyonu respiratuvar asidoz oluşturur.",
    "detailedExplanation": "Kronik respiratuvar asidozda renal kompanzasyon mekanizmasını açıklayabilme Kronik karbondioksit retansiyonu respiratuvar asidoz oluşturur. Böbrekler zamanla hidrojen iyonu sekresyonunu ve amonyagenezi artırarak asit atılımını yükseltir; aynı süreç bikarbonat geri kazanımı ve yeni bikarbonat üretimiyle pH değerinin normale yaklaşmasını sağlar.",
    "postAnswerExplanation": "Kronik respiratuvar asidozda renal kompanzasyon mekanizmasını açıklayabilme Kronik karbondioksit retansiyonu respiratuvar asidoz oluşturur. Böbrekler zamanla hidrojen iyonu sekresyonunu ve amonyagenezi artırarak asit atılımını yükseltir; aynı süreç bikarbonat geri kazanımı ve yeni bikarbonat üretimiyle pH değerinin normale yaklaşmasını sağlar.",
    "postAnswerExpandedExplanation": "Kronik respiratuvar asidozda renal kompanzasyon mekanizmasını açıklayabilme Kronik karbondioksit retansiyonu respiratuvar asidoz oluşturur. Böbrekler zamanla hidrojen iyonu sekresyonunu ve amonyagenezi artırarak asit atılımını yükseltir; aynı süreç bikarbonat geri kazanımı ve yeni bikarbonat üretimiyle pH değerinin normale yaklaşmasını sağlar.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "nephrology"
    ],
    "relatedTerms": [
      "respiratuvar asidoz",
      "renal kompanzasyon"
    ],
    "safeNestedTerms": [
      "respiratuvar asidoz",
      "renal kompanzasyon"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Kronik respiratuvar asidozda renal kompanzasyon",
      "respiratuvar asidoz",
      "renal kompanzasyon"
    ],
    "sourceTextExamples": [
      "Kronik respiratuvar asidozda renal kompanzasyon mekanizmasını açıklayabilme",
      "Kronik respiratuvar asidozda renal kompanzasyon mekanizmasını açıklayabilme"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-lambert-eaton-sendromunda-presinaptik-kalsiyum-kanali-antikoru",
    "term": "Lambert-Eaton sendromunda presinaptik kalsiyum kanalı antikoru",
    "aliases": [
      "Lambert-Eaton sendromunda presinaptik kalsiyum kanalı antikoru"
    ],
    "normalizedTerm": "lambert-eaton sendromunda presinaptik kalsiyum kanali antikoru",
    "TurkishName": "Lambert-Eaton sendromunda presinaptik kalsiyum kanalı antikoru",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Seroloji / otoantikor",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Miyastenia graviste sorun postsinaptik asetilkolin reseptöründedir; Lambert-Eaton sendromunda ise presinaptik kalsiyum kanalı hedeflenir.",
    "definition": "Miyastenia graviste sorun postsinaptik asetilkolin reseptöründedir; Lambert-Eaton sendromunda ise presinaptik kalsiyum kanalı hedeflenir.",
    "detailedExplanation": "Miyastenia graviste sorun postsinaptik asetilkolin reseptöründedir; Lambert-Eaton sendromunda ise presinaptik kalsiyum kanalı hedeflenir. Dalgalanan oküler ve proksimal kas güçsüzlüğü, dinlenmeyle düzelme, dekrement yanıt ve asetilkolin reseptör antikor pozitifliği miyastenia gravis ile uyumludur. Temel mekanizma postsinaptik nikotinik asetilkolin reseptörlerinin otoantikorlarla hedeflenmesi ve nöromüsküler iletimin...",
    "postAnswerExplanation": "Miyastenia graviste sorun postsinaptik asetilkolin reseptöründedir; Lambert-Eaton sendromunda ise presinaptik kalsiyum kanalı hedeflenir. Dalgalanan oküler ve proksimal kas güçsüzlüğü, dinlenmeyle düzelme, dekrement yanıt ve asetilkolin reseptör antikor pozitifliği miyastenia gravis ile uyumludur. Temel mekanizma postsinaptik nikotinik asetilkolin reseptörlerinin otoantikorlarla hedeflenmesi ve nöromüsküler iletimin...",
    "postAnswerExpandedExplanation": "Miyastenia graviste sorun postsinaptik asetilkolin reseptöründedir; Lambert-Eaton sendromunda ise presinaptik kalsiyum kanalı hedeflenir. Dalgalanan oküler ve proksimal kas güçsüzlüğü, dinlenmeyle düzelme, dekrement yanıt ve asetilkolin reseptör antikor pozitifliği miyastenia gravis ile uyumludur. Temel mekanizma postsinaptik nikotinik asetilkolin reseptörlerinin otoantikorlarla hedeflenmesi ve nöromüsküler iletimin...",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy",
      "rheumatology",
      "immunology"
    ],
    "relatedTerms": [
      "antikor",
      "kalsiyum"
    ],
    "safeNestedTerms": [
      "antikor",
      "kalsiyum"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Lambert-Eaton sendromunda presinaptik kalsiyum kanalı antikoru",
      "antikor",
      "kalsiyum"
    ],
    "sourceTextExamples": [
      "Miyastenia graviste sorun postsinaptik asetilkolin reseptöründedir; Lambert-Eaton sendromunda ise presinaptik kalsiyum kanalı hedeflenir.",
      "Miyastenia graviste sorun postsinaptik asetilkolin reseptöründedir; Lambert-Eaton sendromunda ise presinaptik kalsiyum kanalı hedeflenir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-lenfodem",
    "term": "Lenfödem",
    "aliases": [
      "Lenfödem",
      "lymphedema"
    ],
    "normalizedTerm": "lenfodem",
    "TurkishName": "Lenfödem",
    "EnglishName": "",
    "category": "Temel bulgu / vasküler-lenfatik",
    "subcategory": "vasküler-lenfatik",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Lenfatik akım bozukluğuna bağlı ödemi ifade eder.",
    "preAnswerSafeDefinition": "Lenfatik akım bozukluğuna bağlı ödemi ifade eder.",
    "shortDefinition": "Lenf drenaj bozukluğuna bağlı kronik doku sıvı birikimidir.",
    "definition": "Lenf drenaj bozukluğuna bağlı kronik doku sıvı birikimidir.",
    "detailedExplanation": "Genellikle nonpitting, kronik ve deri kalınlaşmasıyla seyreder; venöz ödemden klinik paternle ayrılır.",
    "postAnswerExplanation": "Genellikle nonpitting, kronik ve deri kalınlaşmasıyla seyreder; venöz ödemden klinik paternle ayrılır.",
    "postAnswerExpandedExplanation": "Genellikle nonpitting, kronik ve deri kalınlaşmasıyla seyreder; venöz ödemden klinik paternle ayrılır.",
    "tusPearl": "Mastektomi/lenf nodu diseksiyonu sonrası tek taraflı kol şişliği = lenfödem.",
    "differentialPoint": "",
    "clinicalRelevance": "Mastektomi/lenf nodu diseksiyonu sonrası tek taraflı kol şişliği = lenfödem.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [
      "Kırmızı bayrak",
      "Klinik bağlam"
    ],
    "safeNestedTerms": [
      "Kırmızı bayrak",
      "Klinik bağlam"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Lenfödem",
      "lymphedema",
      "Kırmızı bayrak",
      "Klinik bağlam"
    ],
    "sourceTextExamples": [
      "Lenfödem yaygın ekstremite şişliği yapar; lokal redükte edilemeyen barsak içerikli kitle değildir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 9,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addFoundationEntryLowPriority",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Basit ama sık karşılaşılan klinik terminoloji; düşük matchingPriority ile, özellikle feedback ve açıklama alanlarında öğretici tooltip olarak kullanılmalı.",
      "droppedAliases": []
    },
    "contextRequired": true,
    "requiredCoTerms": [
      "Kırmızı bayrak",
      "Klinik bağlam"
    ],
    "standaloneSafe": false
  },
  {
    "id": "v330-ultradeep-batch5-6-lesch-nyhan-purin-salvage-kusuru",
    "term": "Lesch-Nyhan purin salvage kusuru",
    "aliases": [
      "Lesch-Nyhan purin salvage kusuru"
    ],
    "normalizedTerm": "lesch-nyhan purin salvage kusuru",
    "TurkishName": "Lesch-Nyhan purin salvage kusuru",
    "EnglishName": "",
    "category": "Biyokimya / Genetik / Metabolizma",
    "subcategory": "Enzim/genetik defekt",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Lesch-Nyhan purin salvage kusuru, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "definition": "Lesch-Nyhan purin salvage kusuru, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "detailedExplanation": "Doğru cevap A’dır. HGPRT enzimi hipoksantin ve guanini IMP ve GMP’ye dönüştüren pürin kurtarma yolunda görev alır. Enzim eksikliğinde pürin bazları yeniden kullanılamaz ve ürik aside yıkım artar. Aynı zamanda PRPP artışı ve IMP/GMP azalmasına bağlı negatif geri bildirim kaybı de novo pürin sentezini hızlandırır. Bu iki etki birlikte hiperürisemi, gut eğilimi ve nörolojik bulgularla giden Lesch-Nyhan tablosunu...",
    "postAnswerExplanation": "Doğru cevap A’dır. HGPRT enzimi hipoksantin ve guanini IMP ve GMP’ye dönüştüren pürin kurtarma yolunda görev alır. Enzim eksikliğinde pürin bazları yeniden kullanılamaz ve ürik aside yıkım artar. Aynı zamanda PRPP artışı ve IMP/GMP azalmasına bağlı negatif geri bildirim kaybı de novo pürin sentezini hızlandırır. Bu iki etki birlikte hiperürisemi, gut eğilimi ve nörolojik bulgularla giden Lesch-Nyhan tablosunu...",
    "postAnswerExpandedExplanation": "Doğru cevap A’dır. HGPRT enzimi hipoksantin ve guanini IMP ve GMP’ye dönüştüren pürin kurtarma yolunda görev alır. Enzim eksikliğinde pürin bazları yeniden kullanılamaz ve ürik aside yıkım artar. Aynı zamanda PRPP artışı ve IMP/GMP azalmasına bağlı negatif geri bildirim kaybı de novo pürin sentezini hızlandırır. Bu iki etki birlikte hiperürisemi, gut eğilimi ve nörolojik bulgularla giden Lesch-Nyhan tablosunu...",
    "tusPearl": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "differentialPoint": "Benzer metabolik hastalıklardan ayrım, hangi metabolitin biriktiği ve atağı neyin tetiklediği üzerinden yapılır.",
    "clinicalRelevance": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "genetics"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Lesch-Nyhan purin salvage kusuru"
    ],
    "sourceTextExamples": [
      "Doğru cevap A’dır. HGPRT enzimi hipoksantin ve guanini IMP ve GMP’ye dönüştüren pürin kurtarma yolunda görev alır. Enzim eksikliğinde pürin bazları yeniden kullanılamaz ve ürik aside yıkım artar.",
      "Lesch-Nyhan = HGPRT eksikliği + pürin salvage kusuru + hiperürisemi + nörolojik bulgular + kendine zarar verme davranışı."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve biyokimya / genetik / metabolizma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-leydig-hucresi-fonksiyonu",
    "term": "Leydig hücresi fonksiyonu",
    "aliases": [
      "Leydig hücresi fonksiyonu"
    ],
    "normalizedTerm": "leydig hucresi fonksiyonu",
    "TurkishName": "Leydig hücresi fonksiyonu",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Leydig hücreleri LH uyarısıyla testosteron sentezler.",
    "definition": "Leydig hücreleri LH uyarısıyla testosteron sentezler.",
    "detailedExplanation": "Leydig hücresi fonksiyonu Leydig hücreleri LH uyarısıyla testosteron sentezler.",
    "postAnswerExplanation": "Leydig hücresi fonksiyonu Leydig hücreleri LH uyarısıyla testosteron sentezler.",
    "postAnswerExpandedExplanation": "Leydig hücresi fonksiyonu Leydig hücreleri LH uyarısıyla testosteron sentezler.",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "safeNestedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Leydig hücresi fonksiyonu",
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "sourceTextExamples": [
      "Leydig hücresi fonksiyonu",
      "Leydig hücresi fonksiyonu"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-masif-proteinuri-plus-hipoalbuminemi-plus-odem",
    "term": "Masif proteinüri + hipoalbüminemi + ödem",
    "aliases": [
      "Masif proteinüri + hipoalbüminemi + ödem"
    ],
    "normalizedTerm": "masif proteinuri + hipoalbuminemi + odem",
    "TurkishName": "Masif proteinüri + hipoalbüminemi + ödem",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "definition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "detailedExplanation": "Doğru cevap A’dır. Nefrotik sendromun temel ekseni glomerüler protein kaybıdır. Albumin kaybı plazma onkotik basıncını düşürür ve interstisyel alana sıvı geçişini kolaylaştırarak ödem oluşturur. Karaciğer lipoprotein sentezini artırdığı için hiperlipidemi ve lipidüri görülebilir. Ayrıca antitrombin III gibi antikoagülan proteinlerin idrarla kaybı tromboz riskini artırabilir. Belirgin hematüri ve eritrosit...",
    "postAnswerExplanation": "Doğru cevap A’dır. Nefrotik sendromun temel ekseni glomerüler protein kaybıdır. Albumin kaybı plazma onkotik basıncını düşürür ve interstisyel alana sıvı geçişini kolaylaştırarak ödem oluşturur. Karaciğer lipoprotein sentezini artırdığı için hiperlipidemi ve lipidüri görülebilir. Ayrıca antitrombin III gibi antikoagülan proteinlerin idrarla kaybı tromboz riskini artırabilir. Belirgin hematüri ve eritrosit...",
    "postAnswerExpandedExplanation": "Doğru cevap A’dır. Nefrotik sendromun temel ekseni glomerüler protein kaybıdır. Albumin kaybı plazma onkotik basıncını düşürür ve interstisyel alana sıvı geçişini kolaylaştırarak ödem oluşturur. Karaciğer lipoprotein sentezini artırdığı için hiperlipidemi ve lipidüri görülebilir. Ayrıca antitrombin III gibi antikoagülan proteinlerin idrarla kaybı tromboz riskini artırabilir. Belirgin hematüri ve eritrosit...",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Masif proteinüri + hipoalbüminemi + ödem"
    ],
    "sourceTextExamples": [
      "Doğru cevap A’dır. Nefrotik sendromun temel ekseni glomerüler protein kaybıdır. Albumin kaybı plazma onkotik basıncını düşürür ve interstisyel alana sıvı geçişini kolaylaştırarak ödem oluşturur. Karaciğer lipoprotein sentezini artırdığı için hiperlipidemi ve lipidüri görülebilir.",
      "Nefrotik sendrom = masif proteinüri + hipoalbüminemi + ödem + hiperlipidemi; nefritik sendrom = hematüri + eritrosit silendiri + hipertansiyon/azotemi."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 11,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-megakaryosit-artisi",
    "term": "Megakaryosit artışı",
    "aliases": [
      "Megakaryosit artışı"
    ],
    "normalizedTerm": "megakaryosit artisi",
    "TurkishName": "Megakaryosit artışı",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Megakaryosit artışı, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "Megakaryosit artışı, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "Megakaryosit artışı. Periferik trombosit yıkımı arttığı için kemik iliği kompansatuvar megakaryosit artışı gösterebilir.",
    "postAnswerExplanation": "Megakaryosit artışı. Periferik trombosit yıkımı arttığı için kemik iliği kompansatuvar megakaryosit artışı gösterebilir.",
    "postAnswerExpandedExplanation": "Megakaryosit artışı. Periferik trombosit yıkımı arttığı için kemik iliği kompansatuvar megakaryosit artışı gösterebilir.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Megakaryosit artışı"
    ],
    "sourceTextExamples": [
      "Periferik trombosit yıkımı arttığı için kemik iliği kompansatuvar megakaryosit artışı gösterebilir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 4,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-megaloblastik-anemi-morfolojisi",
    "term": "Megaloblastik anemi morfolojisi",
    "aliases": [
      "Megaloblastik anemi morfolojisi"
    ],
    "normalizedTerm": "megaloblastik anemi morfolojisi",
    "TurkishName": "Megaloblastik anemi morfolojisi",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Megaloblastik anemi morfolojisi, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "Megaloblastik anemi morfolojisi, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "Megaloblastik anemi morfolojisi DNA sentez bozukluğu çekirdek-sitoplazma uyumsuzluğu ve hipersegmente nötrofil oluşturur.",
    "postAnswerExplanation": "Megaloblastik anemi morfolojisi DNA sentez bozukluğu çekirdek-sitoplazma uyumsuzluğu ve hipersegmente nötrofil oluşturur.",
    "postAnswerExpandedExplanation": "Megaloblastik anemi morfolojisi DNA sentez bozukluğu çekirdek-sitoplazma uyumsuzluğu ve hipersegmente nötrofil oluşturur.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Megaloblastik anemi morfolojisi"
    ],
    "sourceTextExamples": [
      "Megaloblastik anemi morfolojisi",
      "Megaloblastik anemi morfolojisi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-mezangial-iga-baskin-birikimi",
    "term": "Mezangial IgA baskın birikimi",
    "aliases": [
      "Mezangial IgA baskın birikimi"
    ],
    "normalizedTerm": "mezangial iga baskin birikimi",
    "TurkishName": "Mezangial IgA baskın birikimi",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Mezangial IgA baskın birikimi, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "Mezangial IgA baskın birikimi, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "Mezangial IgA baskın birikimi Streptokok farenjiti sonrası gelişen hematüri, periorbital ödem, hipertansiyon, düşük C3 ve yüksek antistreptolizin O titresi poststreptokoksik glomerülonefriti düşündürür. Bu immün kompleks aracılı nefritik tabloda elektron mikroskopisinde subepitelyal hump benzeri birikimler tipiktir.",
    "postAnswerExplanation": "Mezangial IgA baskın birikimi Streptokok farenjiti sonrası gelişen hematüri, periorbital ödem, hipertansiyon, düşük C3 ve yüksek antistreptolizin O titresi poststreptokoksik glomerülonefriti düşündürür. Bu immün kompleks aracılı nefritik tabloda elektron mikroskopisinde subepitelyal hump benzeri birikimler tipiktir.",
    "postAnswerExpandedExplanation": "Mezangial IgA baskın birikimi Streptokok farenjiti sonrası gelişen hematüri, periorbital ödem, hipertansiyon, düşük C3 ve yüksek antistreptolizin O titresi poststreptokoksik glomerülonefriti düşündürür. Bu immün kompleks aracılı nefritik tabloda elektron mikroskopisinde subepitelyal hump benzeri birikimler tipiktir.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [
      "IgA"
    ],
    "safeNestedTerms": [
      "IgA"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Mezangial IgA baskın birikimi",
      "IgA"
    ],
    "sourceTextExamples": [
      "Mezangial IgA baskın birikimi",
      "Mezangial IgA baskın birikimi IgA nefropatisinde beklenir ve genellikle enfeksiyonla eş zamanlı hematüri yapar; burada gecikmeli poststreptokoksik tablo vardır."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 4,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-mezonefrik-kanal-turevleri",
    "term": "Mezonefrik kanal türevleri",
    "aliases": [
      "Mezonefrik kanal türevleri"
    ],
    "normalizedTerm": "mezonefrik kanal turevleri",
    "TurkishName": "Mezonefrik kanal türevleri",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Anatomik ilişki",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Erkek iç genital yolları testosteron etkisiyle mezonefrik kanaldan gelişir.",
    "definition": "Erkek iç genital yolları testosteron etkisiyle mezonefrik kanaldan gelişir.",
    "detailedExplanation": "Mezonefrik kanal türevleri Erkek iç genital yolları testosteron etkisiyle mezonefrik kanaldan gelişir.",
    "postAnswerExplanation": "Mezonefrik kanal türevleri Erkek iç genital yolları testosteron etkisiyle mezonefrik kanaldan gelişir.",
    "postAnswerExpandedExplanation": "Mezonefrik kanal türevleri Erkek iç genital yolları testosteron etkisiyle mezonefrik kanaldan gelişir.",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "safeNestedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Mezonefrik kanal türevleri",
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "sourceTextExamples": [
      "Mezonefrik kanal türevleri",
      "Paramezonefrik kanal türevleri"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 2,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-mezotelyoma-iliskisi",
    "term": "Mezotelyoma ilişkisi",
    "aliases": [
      "Mezotelyoma ilişkisi"
    ],
    "normalizedTerm": "mezotelyoma iliskisi",
    "TurkishName": "Mezotelyoma ilişkisi",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Mezotelyoma ilişkisi, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "Mezotelyoma ilişkisi, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "Mezotelyoma ilişkisi Asbest lifleri plevrada kronik hasar ve malign dönüşüm riskini artırır.",
    "postAnswerExplanation": "Mezotelyoma ilişkisi Asbest lifleri plevrada kronik hasar ve malign dönüşüm riskini artırır.",
    "postAnswerExpandedExplanation": "Mezotelyoma ilişkisi Asbest lifleri plevrada kronik hasar ve malign dönüşüm riskini artırır.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Mezotelyoma ilişkisi"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-miyokart-infarkti-erken-nekroz",
    "term": "Miyokart infarktı erken nekroz",
    "aliases": [
      "Miyokart infarktı erken nekroz"
    ],
    "normalizedTerm": "miyokart infarkti erken nekroz",
    "TurkishName": "Miyokart infarktı erken nekroz",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Miyokart infarktı erken nekroz, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "Miyokart infarktı erken nekroz, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "Miyokart infarktı erken nekroz İskemik solid organ hasarında doku mimarisi başlangıçta korunarak protein denatürasyonu baskın olur.",
    "postAnswerExplanation": "Miyokart infarktı erken nekroz İskemik solid organ hasarında doku mimarisi başlangıçta korunarak protein denatürasyonu baskın olur.",
    "postAnswerExpandedExplanation": "Miyokart infarktı erken nekroz İskemik solid organ hasarında doku mimarisi başlangıçta korunarak protein denatürasyonu baskın olur.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Miyokart infarktı erken nekroz"
    ],
    "sourceTextExamples": [
      "Miyokart infarktı erken nekroz",
      "Miyokart infarktı erken nekroz"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-n-asetilsistein-ile-glutatyon-replenishment",
    "term": "N-asetilsistein ile glutatyon replenishment",
    "aliases": [
      "N-asetilsistein ile glutatyon replenishment"
    ],
    "normalizedTerm": "n-asetilsistein ile glutatyon replenishment",
    "TurkishName": "N-asetilsistein ile glutatyon replenishment",
    "EnglishName": "",
    "category": "Biyokimya / Genetik / Metabolizma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "shortDefinition": "N-asetilsistein ile glutatyon replenishment, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "definition": "N-asetilsistein ile glutatyon replenishment, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "detailedExplanation": "Yüksek doz parasetamol alımında toksik metabolit NAPQI glutatyon depoları tükendiğinde hepatoselüler hasar oluşturur. N-asetilsistein glutatyon prekürsörü olarak NAPQI detoksifikasyonunu artırır ve hepatotoksisiteyi önlemek için erken dönemde başlanmalıdır. Yüksek doz parasetamol alımında toksik metabolit NAPQI glutatyon depoları tükendiğinde hepatoselüler hasar oluşturur. N-asetilsistein glutatyon prekürsörü olarak...",
    "postAnswerExplanation": "Yüksek doz parasetamol alımında toksik metabolit NAPQI glutatyon depoları tükendiğinde hepatoselüler hasar oluşturur. N-asetilsistein glutatyon prekürsörü olarak NAPQI detoksifikasyonunu artırır ve hepatotoksisiteyi önlemek için erken dönemde başlanmalıdır. Yüksek doz parasetamol alımında toksik metabolit NAPQI glutatyon depoları tükendiğinde hepatoselüler hasar oluşturur. N-asetilsistein glutatyon prekürsörü olarak...",
    "postAnswerExpandedExplanation": "Yüksek doz parasetamol alımında toksik metabolit NAPQI glutatyon depoları tükendiğinde hepatoselüler hasar oluşturur. N-asetilsistein glutatyon prekürsörü olarak NAPQI detoksifikasyonunu artırır ve hepatotoksisiteyi önlemek için erken dönemde başlanmalıdır. Yüksek doz parasetamol alımında toksik metabolit NAPQI glutatyon depoları tükendiğinde hepatoselüler hasar oluşturur. N-asetilsistein glutatyon prekürsörü olarak...",
    "tusPearl": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "differentialPoint": "Benzer metabolik hastalıklardan ayrım, hangi metabolitin biriktiği ve atağı neyin tetiklediği üzerinden yapılır.",
    "clinicalRelevance": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "genetics"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "N-asetilsistein ile glutatyon replenishment"
    ],
    "sourceTextExamples": [
      "Yüksek doz parasetamol alımında toksik metabolit NAPQI glutatyon depoları tükendiğinde hepatoselüler hasar oluşturur. N-asetilsistein glutatyon prekürsörü olarak NAPQI detoksifikasyonunu artırır ve hepatotoksisiteyi önlemek için erken dönemde başlanmalıdır.",
      "Parasetamol toksisitesinde N-asetilsistein glutatyonu yenileyerek NAPQI detoksifikasyonunu sağlar."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve biyokimya / genetik / metabolizma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-napqi-birikimi",
    "term": "NAPQI birikimi",
    "aliases": [
      "NAPQI birikimi"
    ],
    "normalizedTerm": "napqi birikimi",
    "TurkishName": "NAPQI birikimi",
    "EnglishName": "",
    "category": "Biyokimya / Genetik / Metabolizma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "shortDefinition": "NAPQI birikimi, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "definition": "NAPQI birikimi, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "detailedExplanation": "Doğru cevap A’dır. Parasetamol normal dozlarda çoğunlukla glukuronidasyon ve sülfatlama ile metabolize edilir; küçük bir kısmı CYP aracılığıyla NAPQI’ye dönüşür. NAPQI normalde glutatyonla bağlanarak zararsız hâle getirilir. Aşırı dozda glutatyon depoları tükenir ve NAPQI hepatosit proteinlerine bağlanarak özellikle santral lobüler karaciğer hasarı oluşturur. N-asetilsistein glutatyon sentezi için sistein sağlar ve...",
    "postAnswerExplanation": "Doğru cevap A’dır. Parasetamol normal dozlarda çoğunlukla glukuronidasyon ve sülfatlama ile metabolize edilir; küçük bir kısmı CYP aracılığıyla NAPQI’ye dönüşür. NAPQI normalde glutatyonla bağlanarak zararsız hâle getirilir. Aşırı dozda glutatyon depoları tükenir ve NAPQI hepatosit proteinlerine bağlanarak özellikle santral lobüler karaciğer hasarı oluşturur. N-asetilsistein glutatyon sentezi için sistein sağlar ve...",
    "postAnswerExpandedExplanation": "Doğru cevap A’dır. Parasetamol normal dozlarda çoğunlukla glukuronidasyon ve sülfatlama ile metabolize edilir; küçük bir kısmı CYP aracılığıyla NAPQI’ye dönüşür. NAPQI normalde glutatyonla bağlanarak zararsız hâle getirilir. Aşırı dozda glutatyon depoları tükenir ve NAPQI hepatosit proteinlerine bağlanarak özellikle santral lobüler karaciğer hasarı oluşturur. N-asetilsistein glutatyon sentezi için sistein sağlar ve...",
    "tusPearl": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "differentialPoint": "Benzer metabolik hastalıklardan ayrım, hangi metabolitin biriktiği ve atağı neyin tetiklediği üzerinden yapılır.",
    "clinicalRelevance": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "genetics"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "NAPQI birikimi"
    ],
    "sourceTextExamples": [
      "Doğru cevap A’dır. Parasetamol normal dozlarda çoğunlukla glukuronidasyon ve sülfatlama ile metabolize edilir; küçük bir kısmı CYP aracılığıyla NAPQI’ye dönüşür. NAPQI normalde glutatyonla bağlanarak zararsız hâle getirilir.",
      "Parasetamol toksisitesi = NAPQI birikimi + glutatyon tükenmesi; antidot N-asetilsistein glutatyonu yeniler."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 11,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve biyokimya / genetik / metabolizma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-neonatal-varisella-riski",
    "term": "Neonatal varisella riski",
    "aliases": [
      "Neonatal varisella riski"
    ],
    "normalizedTerm": "neonatal varisella riski",
    "TurkishName": "Neonatal varisella riski",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Peripartum varisella ağır neonatal enfeksiyon riski taşır ve immünoglobulin gerekebilir.",
    "definition": "Peripartum varisella ağır neonatal enfeksiyon riski taşır ve immünoglobulin gerekebilir.",
    "detailedExplanation": "Neonatal varisella riski Peripartum varisella ağır neonatal enfeksiyon riski taşır ve immünoglobulin gerekebilir.",
    "postAnswerExplanation": "Neonatal varisella riski Peripartum varisella ağır neonatal enfeksiyon riski taşır ve immünoglobulin gerekebilir.",
    "postAnswerExpandedExplanation": "Neonatal varisella riski Peripartum varisella ağır neonatal enfeksiyon riski taşır ve immünoglobulin gerekebilir.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Neonatal varisella riski"
    ],
    "sourceTextExamples": [
      "Neonatal varisella riski",
      "Neonatal varisella riski"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-normal-basincli-hidrosefali",
    "term": "Normal basınçlı hidrosefali",
    "aliases": [
      "Normal basınçlı hidrosefali"
    ],
    "normalizedTerm": "normal basincli hidrosefali",
    "TurkishName": "Normal basınçlı hidrosefali",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Yüzün üst ve alt kısmını birlikte tutan tek taraflı fasiyal güçsüzlük periferik fasiyal paraliziyi düşündürür.",
    "definition": "Yüzün üst ve alt kısmını birlikte tutan tek taraflı fasiyal güçsüzlük periferik fasiyal paraliziyi düşündürür.",
    "detailedExplanation": "Normal basınçlı hidrosefali Yüzün üst ve alt kısmını birlikte tutan tek taraflı fasiyal güçsüzlük periferik fasiyal paraliziyi düşündürür. Santral üst motor nöron lezyonlarında alın çoğu kez korunur; bu hastada alın ve göz kapatma da etkilenmiştir.",
    "postAnswerExplanation": "Normal basınçlı hidrosefali Yüzün üst ve alt kısmını birlikte tutan tek taraflı fasiyal güçsüzlük periferik fasiyal paraliziyi düşündürür. Santral üst motor nöron lezyonlarında alın çoğu kez korunur; bu hastada alın ve göz kapatma da etkilenmiştir.",
    "postAnswerExpandedExplanation": "Normal basınçlı hidrosefali Yüzün üst ve alt kısmını birlikte tutan tek taraflı fasiyal güçsüzlük periferik fasiyal paraliziyi düşündürür. Santral üst motor nöron lezyonlarında alın çoğu kez korunur; bu hastada alın ve göz kapatma da etkilenmiştir.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Normal basınçlı hidrosefali"
    ],
    "sourceTextExamples": [
      "Normal basınçlı hidrosefali",
      "Normal basınçlı hidrosefali yürüme bozukluğu, idrar kaçırma ve bilişsel etkilenmeyle seyreder; akut yüz felci yapmaz."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 7,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-noral-tup-kaudal-kapanma-defekti",
    "term": "Nöral tüp kaudal kapanma defekti",
    "aliases": [
      "Nöral tüp kaudal kapanma defekti"
    ],
    "normalizedTerm": "noral tup kaudal kapanma defekti",
    "TurkishName": "Nöral tüp kaudal kapanma defekti",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Kaudal nöropor kapanma kusuru omurga arklarının ve nöral dokuların kapanma bozukluğuna yol açabilir.",
    "definition": "Kaudal nöropor kapanma kusuru omurga arklarının ve nöral dokuların kapanma bozukluğuna yol açabilir.",
    "detailedExplanation": "Nöral tüp kaudal kapanma defekti Kaudal nöropor kapanma kusuru omurga arklarının ve nöral dokuların kapanma bozukluğuna yol açabilir.",
    "postAnswerExplanation": "Nöral tüp kaudal kapanma defekti Kaudal nöropor kapanma kusuru omurga arklarının ve nöral dokuların kapanma bozukluğuna yol açabilir.",
    "postAnswerExpandedExplanation": "Nöral tüp kaudal kapanma defekti Kaudal nöropor kapanma kusuru omurga arklarının ve nöral dokuların kapanma bozukluğuna yol açabilir.",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "safeNestedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Nöral tüp kaudal kapanma defekti",
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "sourceTextExamples": [
      "Nöral tüp kaudal kapanma defekti",
      "Nöral tüp kaudal kapanma defekti"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-noroleptik-malign-sendrom",
    "term": "Nöroleptik malign sendrom",
    "aliases": [
      "Nöroleptik malign sendrom"
    ],
    "normalizedTerm": "noroleptik malign sendrom",
    "TurkishName": "Nöroleptik malign sendrom",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Dopamin agonisti nöroleptik malign sendromda düşünülebilir; bu olguda ilaç etkileşimi, ishal, hiperrefleksi ve klonus serotonerjik toksisiteyi destekler.",
    "definition": "Dopamin agonisti nöroleptik malign sendromda düşünülebilir; bu olguda ilaç etkileşimi, ishal, hiperrefleksi ve klonus serotonerjik toksisiteyi destekler.",
    "detailedExplanation": "Dopamin agonisti nöroleptik malign sendromda düşünülebilir; bu olguda ilaç etkileşimi, ishal, hiperrefleksi ve klonus serotonerjik toksisiteyi destekler. Selektif serotonin geri alım inhibitörü ile linezolid birlikteliği sonrası ajitasyon, otonom hiperaktivite, ishal, hiperrefleksi ve klonus serotonin fazlalığına bağlı toksisiteyi düşündürür. Tedavide sorumlu serotonerjik ilaçlar kesilir, destek tedavisi uygulanır...",
    "postAnswerExplanation": "Dopamin agonisti nöroleptik malign sendromda düşünülebilir; bu olguda ilaç etkileşimi, ishal, hiperrefleksi ve klonus serotonerjik toksisiteyi destekler. Selektif serotonin geri alım inhibitörü ile linezolid birlikteliği sonrası ajitasyon, otonom hiperaktivite, ishal, hiperrefleksi ve klonus serotonin fazlalığına bağlı toksisiteyi düşündürür. Tedavide sorumlu serotonerjik ilaçlar kesilir, destek tedavisi uygulanır...",
    "postAnswerExpandedExplanation": "Dopamin agonisti nöroleptik malign sendromda düşünülebilir; bu olguda ilaç etkileşimi, ishal, hiperrefleksi ve klonus serotonerjik toksisiteyi destekler. Selektif serotonin geri alım inhibitörü ile linezolid birlikteliği sonrası ajitasyon, otonom hiperaktivite, ishal, hiperrefleksi ve klonus serotonin fazlalığına bağlı toksisiteyi düşündürür. Tedavide sorumlu serotonerjik ilaçlar kesilir, destek tedavisi uygulanır...",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "neurology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Nöroleptik malign sendrom"
    ],
    "sourceTextExamples": [
      "Dopamin agonisti nöroleptik malign sendromda düşünülebilir; bu olguda ilaç etkileşimi, ishal, hiperrefleksi ve klonus serotonerjik toksisiteyi destekler.",
      "Dopamin agonisti nöroleptik malign sendromda düşünülebilir; bu olguda ilaç etkileşimi, ishal, hiperrefleksi ve klonus serotonerjik toksisiteyi destekler."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 16,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot feedback içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-omfalosel-ayrimi",
    "term": "Omfalosel ayrımı",
    "aliases": [
      "Omfalosel ayrımı"
    ],
    "normalizedTerm": "omfalosel ayrimi",
    "TurkishName": "Omfalosel ayrımı",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Omfaloselde herniye organlar periton ve amniyonla örtülüdür ve orta hatta yerleşir.",
    "definition": "Omfaloselde herniye organlar periton ve amniyonla örtülüdür ve orta hatta yerleşir.",
    "detailedExplanation": "Omfalosel ayrımı Omfaloselde herniye organlar periton ve amniyonla örtülüdür ve orta hatta yerleşir.",
    "postAnswerExplanation": "Omfalosel ayrımı Omfaloselde herniye organlar periton ve amniyonla örtülüdür ve orta hatta yerleşir.",
    "postAnswerExpandedExplanation": "Omfalosel ayrımı Omfaloselde herniye organlar periton ve amniyonla örtülüdür ve orta hatta yerleşir.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Omfalosel ayrımı"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-orbital-selulit",
    "term": "Orbital selülit",
    "aliases": [
      "Orbital selülit"
    ],
    "normalizedTerm": "orbital selulit",
    "TurkishName": "Orbital selülit",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Akut bakteriyel orbital selülitte proptoz ve göz hareket kısıtlılığıyla acil intravenöz antibiyotik gereksinimini seçebilme Sinüzit sonrası ateş, proptoz, göz hareket kısıtlılığı, kemozis ve postseptal inflamasyon orbital selüliti düşündürür.",
    "definition": "Akut bakteriyel orbital selülitte proptoz ve göz hareket kısıtlılığıyla acil intravenöz antibiyotik gereksinimini seçebilme Sinüzit sonrası ateş, proptoz, göz hareket kısıtlılığı, kemozis ve postseptal inflamasyon orbital selüliti düşündürür.",
    "detailedExplanation": "Akut bakteriyel orbital selülitte proptoz ve göz hareket kısıtlılığıyla acil intravenöz antibiyotik gereksinimini seçebilme Sinüzit sonrası ateş, proptoz, göz hareket kısıtlılığı, kemozis ve postseptal inflamasyon orbital selüliti düşündürür. Görmeyi ve intrakraniyal yayılımı tehdit eden bu tabloda hastaneye yatış, intravenöz antibiyotik ve multidisipliner izlem gerekir.",
    "postAnswerExplanation": "Akut bakteriyel orbital selülitte proptoz ve göz hareket kısıtlılığıyla acil intravenöz antibiyotik gereksinimini seçebilme Sinüzit sonrası ateş, proptoz, göz hareket kısıtlılığı, kemozis ve postseptal inflamasyon orbital selüliti düşündürür. Görmeyi ve intrakraniyal yayılımı tehdit eden bu tabloda hastaneye yatış, intravenöz antibiyotik ve multidisipliner izlem gerekir.",
    "postAnswerExpandedExplanation": "Akut bakteriyel orbital selülitte proptoz ve göz hareket kısıtlılığıyla acil intravenöz antibiyotik gereksinimini seçebilme Sinüzit sonrası ateş, proptoz, göz hareket kısıtlılığı, kemozis ve postseptal inflamasyon orbital selüliti düşündürür. Görmeyi ve intrakraniyal yayılımı tehdit eden bu tabloda hastaneye yatış, intravenöz antibiyotik ve multidisipliner izlem gerekir.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Orbital selülit"
    ],
    "sourceTextExamples": [
      "Akut bakteriyel orbital selülitte proptoz ve göz hareket kısıtlılığıyla acil intravenöz antibiyotik gereksinimini seçebilme",
      "Orbital selüliti destekler."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 21,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-otitis-eksterna",
    "term": "Otitis eksterna",
    "aliases": [
      "Otitis eksterna"
    ],
    "normalizedTerm": "otitis eksterna",
    "TurkishName": "Otitis eksterna",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "kulak kepçesi hareketiyle ağrı ve dış kanal hassasiyetiyle ayrılır.",
    "definition": "kulak kepçesi hareketiyle ağrı ve dış kanal hassasiyetiyle ayrılır.",
    "detailedExplanation": "Otitis eksterna kulak kepçesi hareketiyle ağrı ve dış kanal hassasiyetiyle ayrılır. En sık etkenler Streptococcus pneumoniae, H. influenzae ve Moraxella catarrhalis’tir.",
    "postAnswerExplanation": "Otitis eksterna kulak kepçesi hareketiyle ağrı ve dış kanal hassasiyetiyle ayrılır. En sık etkenler Streptococcus pneumoniae, H. influenzae ve Moraxella catarrhalis’tir.",
    "postAnswerExpandedExplanation": "Otitis eksterna kulak kepçesi hareketiyle ağrı ve dış kanal hassasiyetiyle ayrılır. En sık etkenler Streptococcus pneumoniae, H. influenzae ve Moraxella catarrhalis’tir.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Otitis eksterna"
    ],
    "sourceTextExamples": [
      "Otitis eksterna kulak kepçesi hareketiyle ağrı ve dış kanal hassasiyetiyle ayrılır."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-otoimmun-hemolitik-anemi-testi",
    "term": "Otoimmün hemolitik anemi testi",
    "aliases": [
      "Otoimmün hemolitik anemi testi"
    ],
    "normalizedTerm": "otoimmun hemolitik anemi testi",
    "TurkishName": "Otoimmün hemolitik anemi testi",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Tanısal test / karar eşiği",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Otoimmün hemolitik anemi testi, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "Otoimmün hemolitik anemi testi, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "Otoimmün hemolitik anemi testi Eritrosit yüzeyindeki antikor veya kompleman varlığı direkt antiglobulin testiyle saptanır.",
    "postAnswerExplanation": "Otoimmün hemolitik anemi testi Eritrosit yüzeyindeki antikor veya kompleman varlığı direkt antiglobulin testiyle saptanır.",
    "postAnswerExpandedExplanation": "Otoimmün hemolitik anemi testi Eritrosit yüzeyindeki antikor veya kompleman varlığı direkt antiglobulin testiyle saptanır.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology",
      "rheumatology",
      "immunology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Otoimmün hemolitik anemi testi"
    ],
    "sourceTextExamples": [
      "Otoimmün hemolitik anemi testi",
      "Otoimmün hemolitik anemi testi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-paramezonefrik-kanal-turevleri",
    "term": "Paramezonefrik kanal türevleri",
    "aliases": [
      "Paramezonefrik kanal türevleri"
    ],
    "normalizedTerm": "paramezonefrik kanal turevleri",
    "TurkishName": "Paramezonefrik kanal türevleri",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Anatomik ilişki",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Müller kanalı olarak da bilinen paramezonefrik kanal kadın iç genital sisteminin ana kaynağıdır.",
    "definition": "Müller kanalı olarak da bilinen paramezonefrik kanal kadın iç genital sisteminin ana kaynağıdır.",
    "detailedExplanation": "Paramezonefrik kanal türevleri Müller kanalı olarak da bilinen paramezonefrik kanal kadın iç genital sisteminin ana kaynağıdır.",
    "postAnswerExplanation": "Paramezonefrik kanal türevleri Müller kanalı olarak da bilinen paramezonefrik kanal kadın iç genital sisteminin ana kaynağıdır.",
    "postAnswerExpandedExplanation": "Paramezonefrik kanal türevleri Müller kanalı olarak da bilinen paramezonefrik kanal kadın iç genital sisteminin ana kaynağıdır.",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "safeNestedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Paramezonefrik kanal türevleri",
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "sourceTextExamples": [
      "Paramezonefrik kanal türevleri",
      "Paramezonefrik kanal türevleri"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-parathormon-bobrek-etkisi",
    "term": "Parathormon böbrek etkisi",
    "aliases": [
      "Parathormon böbrek etkisi"
    ],
    "normalizedTerm": "parathormon bobrek etkisi",
    "TurkishName": "Parathormon böbrek etkisi",
    "EnglishName": "",
    "category": "Fizyoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Vücut fonksiyonlarının düzenlenmesiyle ilişkili fizyolojik bir ilişkiyi ifade eder.",
    "preAnswerSafeDefinition": "Vücut fonksiyonlarının düzenlenmesiyle ilişkili fizyolojik bir ilişkiyi ifade eder.",
    "shortDefinition": "PTH proksimal tübülde fosfat geri emilimini azaltır ve serum fosfatını düşürme eğilimindedir.",
    "definition": "PTH proksimal tübülde fosfat geri emilimini azaltır ve serum fosfatını düşürme eğilimindedir.",
    "detailedExplanation": "Parathormon böbrek etkisi PTH proksimal tübülde fosfat geri emilimini azaltır ve serum fosfatını düşürme eğilimindedir.",
    "postAnswerExplanation": "Parathormon böbrek etkisi PTH proksimal tübülde fosfat geri emilimini azaltır ve serum fosfatını düşürme eğilimindedir.",
    "postAnswerExpandedExplanation": "Parathormon böbrek etkisi PTH proksimal tübülde fosfat geri emilimini azaltır ve serum fosfatını düşürme eğilimindedir.",
    "tusPearl": "Fizyoloji sorusunda yönü kaçırma: değişken artınca hangi kompansasyonun devreye girdiği sorulur.",
    "differentialPoint": "Ayırıcı nokta, primer değişken ile kompansatuvar yanıtın birbirine karıştırılmamasıdır.",
    "clinicalRelevance": "Fizyoloji sorusunda yönü kaçırma: değişken artınca hangi kompansasyonun devreye girdiği sorulur.",
    "mechanism": "",
    "relatedBranches": [
      "nephrology",
      "physiology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Parathormon böbrek etkisi"
    ],
    "sourceTextExamples": [
      "Parathormon böbrek etkisi",
      "Parathormon böbrek etkisi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addAsSafeNestedTerm",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve fizyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-peroksizom-biyogenez-bozuklugu",
    "term": "Peroksizom biyogenez bozukluğu",
    "aliases": [
      "Peroksizom biyogenez bozukluğu"
    ],
    "normalizedTerm": "peroksizom biyogenez bozuklugu",
    "TurkishName": "Peroksizom biyogenez bozukluğu",
    "EnglishName": "",
    "category": "Biyokimya / Genetik / Metabolizma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Peroksizom biyogenez bozukluğu, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "definition": "Peroksizom biyogenez bozukluğu, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "detailedExplanation": "Peroksizom biyogenez bozukluğu. Zellweger spektrumunda peroksizomal fonksiyon bozulur ve çok uzun zincirli yağ asitleri birikir.",
    "postAnswerExplanation": "Peroksizom biyogenez bozukluğu. Zellweger spektrumunda peroksizomal fonksiyon bozulur ve çok uzun zincirli yağ asitleri birikir.",
    "postAnswerExpandedExplanation": "Peroksizom biyogenez bozukluğu. Zellweger spektrumunda peroksizomal fonksiyon bozulur ve çok uzun zincirli yağ asitleri birikir.",
    "tusPearl": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "differentialPoint": "Benzer metabolik hastalıklardan ayrım, hangi metabolitin biriktiği ve atağı neyin tetiklediği üzerinden yapılır.",
    "clinicalRelevance": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "genetics"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Peroksizom biyogenez bozukluğu"
    ],
    "sourceTextExamples": [
      "Peroksizom biyogenez bozukluğu.",
      "Peroksizom biyogenez bozukluğu."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 3,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve biyokimya / genetik / metabolizma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-piruvat-karboksilaz-kofaktoru",
    "term": "Pirüvat karboksilaz kofaktörü",
    "aliases": [
      "Pirüvat karboksilaz kofaktörü"
    ],
    "normalizedTerm": "piruvat karboksilaz kofaktoru",
    "TurkishName": "Pirüvat karboksilaz kofaktörü",
    "EnglishName": "",
    "category": "Biyokimya / Genetik / Metabolizma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Pirüvat karboksilaz kofaktörü, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "definition": "Pirüvat karboksilaz kofaktörü, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "detailedExplanation": "Pirüvat karboksilaz kofaktörü Pirüvat karboksilaz glukoneogenezde pirüvatı oksaloasetata çevirir ve biotin bağımlıdır.",
    "postAnswerExplanation": "Pirüvat karboksilaz kofaktörü Pirüvat karboksilaz glukoneogenezde pirüvatı oksaloasetata çevirir ve biotin bağımlıdır.",
    "postAnswerExpandedExplanation": "Pirüvat karboksilaz kofaktörü Pirüvat karboksilaz glukoneogenezde pirüvatı oksaloasetata çevirir ve biotin bağımlıdır.",
    "tusPearl": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "differentialPoint": "Benzer metabolik hastalıklardan ayrım, hangi metabolitin biriktiği ve atağı neyin tetiklediği üzerinden yapılır.",
    "clinicalRelevance": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "genetics"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Pirüvat karboksilaz kofaktörü"
    ],
    "sourceTextExamples": [
      "Pirüvat karboksilaz kofaktörü",
      "Pirüvat karboksilaz kofaktörü"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve biyokimya / genetik / metabolizma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-polidipsi",
    "term": "Polidipsi",
    "aliases": [
      "Polidipsi",
      "çok su içme"
    ],
    "normalizedTerm": "polidipsi",
    "TurkishName": "Polidipsi",
    "EnglishName": "",
    "category": "Temel semptom / endokrin-nefroloji",
    "subcategory": "endokrin-nefroloji",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Sıvı alımının belirgin artmasını ifade eden temel yakınmadır.",
    "preAnswerSafeDefinition": "Sıvı alımının belirgin artmasını ifade eden temel yakınmadır.",
    "shortDefinition": "Aşırı susama ve sıvı alma isteğidir.",
    "definition": "Aşırı susama ve sıvı alma isteğidir.",
    "detailedExplanation": "Poliüriyle birlikte diyabetes mellitus veya diabetes insipidus ayrımı yapılır; glukoz, sodyum ve idrar ozmolalitesi karar verdirir.",
    "postAnswerExplanation": "Poliüriyle birlikte diyabetes mellitus veya diabetes insipidus ayrımı yapılır; glukoz, sodyum ve idrar ozmolalitesi karar verdirir.",
    "postAnswerExpandedExplanation": "Poliüriyle birlikte diyabetes mellitus veya diabetes insipidus ayrımı yapılır; glukoz, sodyum ve idrar ozmolalitesi karar verdirir.",
    "tusPearl": "Poliüri + polidipsi + hiperglisemi = DM; hipernatremi/düşük idrar ozmolalitesi = DI.",
    "differentialPoint": "",
    "clinicalRelevance": "Poliüri + polidipsi + hiperglisemi = DM; hipernatremi/düşük idrar ozmolalitesi = DI.",
    "mechanism": "",
    "relatedBranches": [
      "nephrology",
      "endocrinology"
    ],
    "relatedTerms": [
      "Kırmızı bayrak",
      "Klinik bağlam"
    ],
    "safeNestedTerms": [
      "Kırmızı bayrak",
      "Klinik bağlam"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Polidipsi",
      "çok su içme",
      "Kırmızı bayrak",
      "Klinik bağlam"
    ],
    "sourceTextExamples": [
      "Son iki haftadır çok su içme, sık idrara çıkma ve kilo kaybı olduğu, son 24 saatte bulantı ve kusmanın belirginleştiği öğreniliyor. Bilinen diyabet öyküsü yoktur.",
      "Son iki haftadır çok su içme, sık idrara çıkma ve kilo kaybı olduğu, son 24 saatte bulantı ve kusmanın belirginleştiği öğreniliyor. Bilinen diyabet öyküsü yoktur."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 25,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addFoundationEntryLowPriority",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Basit ama sık karşılaşılan klinik terminoloji; düşük matchingPriority ile, özellikle feedback ve açıklama alanlarında öğretici tooltip olarak kullanılmalı.",
      "droppedAliases": []
    },
    "contextRequired": true,
    "requiredCoTerms": [
      "Kırmızı bayrak",
      "Klinik bağlam"
    ],
    "standaloneSafe": false
  },
  {
    "id": "v330-ultradeep-batch5-6-polisitemia-vera",
    "term": "Polisitemia vera",
    "aliases": [
      "Polisitemia vera"
    ],
    "normalizedTerm": "polisitemia vera",
    "TurkishName": "Polisitemia vera",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Polisitemia vera, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "Polisitemia vera, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "Polisitemia vera Yoğun adet kanaması, pika, koilonişi, mikrositik anemi ve düşük ferritin demir eksikliği anemisini düşündürür. Ferritin demir depolarını yansıtır ve düşük olması tanıda güçlü destek sağlar.",
    "postAnswerExplanation": "Polisitemia vera Yoğun adet kanaması, pika, koilonişi, mikrositik anemi ve düşük ferritin demir eksikliği anemisini düşündürür. Ferritin demir depolarını yansıtır ve düşük olması tanıda güçlü destek sağlar.",
    "postAnswerExpandedExplanation": "Polisitemia vera Yoğun adet kanaması, pika, koilonişi, mikrositik anemi ve düşük ferritin demir eksikliği anemisini düşündürür. Ferritin demir depolarını yansıtır ve düşük olması tanıda güçlü destek sağlar.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Polisitemia vera"
    ],
    "sourceTextExamples": [
      "Polisitemia vera eritrosit kitlesi artışıyla seyreder; hemoglobin düşüklüğünü açıklamaz."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 8,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-porphyria-cutanea-tarda",
    "term": "Porphyria cutanea tarda",
    "aliases": [
      "Porphyria cutanea tarda"
    ],
    "normalizedTerm": "porphyria cutanea tarda",
    "TurkishName": "Porphyria cutanea tarda",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "daha çok fotosensitivite ve üroporfirinojen dekarboksilaz ile ilişkilidir.",
    "definition": "daha çok fotosensitivite ve üroporfirinojen dekarboksilaz ile ilişkilidir.",
    "detailedExplanation": "Porphyria cutanea tarda daha çok fotosensitivite ve üroporfirinojen dekarboksilaz ile ilişkilidir. Hem sentezinde erken basamak bozulur; ALA ve PBG artışı nörovisseral ataklara yol açar.",
    "postAnswerExplanation": "Porphyria cutanea tarda daha çok fotosensitivite ve üroporfirinojen dekarboksilaz ile ilişkilidir. Hem sentezinde erken basamak bozulur; ALA ve PBG artışı nörovisseral ataklara yol açar.",
    "postAnswerExpandedExplanation": "Porphyria cutanea tarda daha çok fotosensitivite ve üroporfirinojen dekarboksilaz ile ilişkilidir. Hem sentezinde erken basamak bozulur; ALA ve PBG artışı nörovisseral ataklara yol açar.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Porphyria cutanea tarda"
    ],
    "sourceTextExamples": [
      "Porphyria cutanea tarda daha çok fotosensitivite ve üroporfirinojen dekarboksilaz ile ilişkilidir.",
      "Porphyria cutanea tarda"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 4,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-poststreptokoksik-glomerulonefrit",
    "term": "Poststreptokoksik glomerülonefrit",
    "aliases": [
      "Poststreptokoksik glomerülonefrit"
    ],
    "normalizedTerm": "poststreptokoksik glomerulonefrit",
    "TurkishName": "Poststreptokoksik glomerülonefrit",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Poststreptokoksik glomerülonefrit, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "Poststreptokoksik glomerülonefrit, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "Poststreptokoksik glomerülonefritte nefritik sendrom ve immün kompleks paternini tanıyabilme Streptokok farenjiti sonrası gelişen hematüri, periorbital ödem, hipertansiyon, düşük C3 ve yüksek antistreptolizin O titresi poststreptokoksik glomerülonefriti düşündürür. Bu immün kompleks aracılı nefritik tabloda elektron mikroskopisinde subepitelyal hump benzeri birikimler tipiktir.",
    "postAnswerExplanation": "Poststreptokoksik glomerülonefritte nefritik sendrom ve immün kompleks paternini tanıyabilme Streptokok farenjiti sonrası gelişen hematüri, periorbital ödem, hipertansiyon, düşük C3 ve yüksek antistreptolizin O titresi poststreptokoksik glomerülonefriti düşündürür. Bu immün kompleks aracılı nefritik tabloda elektron mikroskopisinde subepitelyal hump benzeri birikimler tipiktir.",
    "postAnswerExpandedExplanation": "Poststreptokoksik glomerülonefritte nefritik sendrom ve immün kompleks paternini tanıyabilme Streptokok farenjiti sonrası gelişen hematüri, periorbital ödem, hipertansiyon, düşük C3 ve yüksek antistreptolizin O titresi poststreptokoksik glomerülonefriti düşündürür. Bu immün kompleks aracılı nefritik tabloda elektron mikroskopisinde subepitelyal hump benzeri birikimler tipiktir.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "nephrology",
      "hematology",
      "oncology"
    ],
    "relatedTerms": [
      "glomerülonefrit"
    ],
    "safeNestedTerms": [
      "glomerülonefrit"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Poststreptokoksik glomerülonefrit",
      "glomerülonefrit"
    ],
    "sourceTextExamples": [
      "Poststreptokoksik glomerülonefritte nefritik sendrom ve immün kompleks paternini tanıyabilme",
      "Streptokok farenjiti sonrası gelişen hematüri, periorbital ödem, hipertansiyon, düşük C3 ve yüksek antistreptolizin O titresi poststreptokoksik glomerülonefriti düşündürür."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 25,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-preseptal-selulit",
    "term": "Preseptal selülit",
    "aliases": [
      "Preseptal selülit"
    ],
    "normalizedTerm": "preseptal selulit",
    "TurkishName": "Preseptal selülit",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Orbital selülitte proptoz ve göz hareket kısıtlılığı preseptal selülitten ayırıcı ciddi bulgulardır.",
    "definition": "Orbital selülitte proptoz ve göz hareket kısıtlılığı preseptal selülitten ayırıcı ciddi bulgulardır.",
    "detailedExplanation": "Orbital selülitte proptoz ve göz hareket kısıtlılığı preseptal selülitten ayırıcı ciddi bulgulardır. Sinüzit sonrası ateş, proptoz, göz hareket kısıtlılığı, kemozis ve postseptal inflamasyon orbital selüliti düşündürür. Görmeyi ve intrakraniyal yayılımı tehdit eden bu tabloda hastaneye yatış, intravenöz antibiyotik ve multidisipliner izlem gerekir.",
    "postAnswerExplanation": "Orbital selülitte proptoz ve göz hareket kısıtlılığı preseptal selülitten ayırıcı ciddi bulgulardır. Sinüzit sonrası ateş, proptoz, göz hareket kısıtlılığı, kemozis ve postseptal inflamasyon orbital selüliti düşündürür. Görmeyi ve intrakraniyal yayılımı tehdit eden bu tabloda hastaneye yatış, intravenöz antibiyotik ve multidisipliner izlem gerekir.",
    "postAnswerExpandedExplanation": "Orbital selülitte proptoz ve göz hareket kısıtlılığı preseptal selülitten ayırıcı ciddi bulgulardır. Sinüzit sonrası ateş, proptoz, göz hareket kısıtlılığı, kemozis ve postseptal inflamasyon orbital selüliti düşündürür. Görmeyi ve intrakraniyal yayılımı tehdit eden bu tabloda hastaneye yatış, intravenöz antibiyotik ve multidisipliner izlem gerekir.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Preseptal selülit"
    ],
    "sourceTextExamples": [
      "Orbital selülitte proptoz ve göz hareket kısıtlılığı preseptal selülitten ayırıcı ciddi bulgulardır.",
      "Orbital selülitte proptoz ve göz hareket kısıtlılığı preseptal selülitten ayırıcı ciddi bulgulardır."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 2,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-presinaptik-kalsiyum-kanali-antikorlari",
    "term": "Presinaptik kalsiyum kanalı antikorları",
    "aliases": [
      "Presinaptik kalsiyum kanalı antikorları"
    ],
    "normalizedTerm": "presinaptik kalsiyum kanali antikorlari",
    "TurkishName": "Presinaptik kalsiyum kanalı antikorları",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Seroloji / otoantikor",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "definition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "detailedExplanation": "Yanlıştır. Presinaptik kalsiyum kanalı antikorları Lambert-Eaton sendromunda görülür. Bu tabloda egzersizle güçte geçici artış görülebilir. Doğru cevap A’dır. Myastenia graviste otoantikorlar postsinaptik asetilkolin reseptörlerini bloke edebilir, kompleman aracılı hasara yol açabilir ve reseptör sayısını azaltabilir. Sonuçta sinaptik iletim güvenlik faktörü düşer; tekrarlayan kullanımda kas güçsüzlüğü...",
    "postAnswerExplanation": "Yanlıştır. Presinaptik kalsiyum kanalı antikorları Lambert-Eaton sendromunda görülür. Bu tabloda egzersizle güçte geçici artış görülebilir. Doğru cevap A’dır. Myastenia graviste otoantikorlar postsinaptik asetilkolin reseptörlerini bloke edebilir, kompleman aracılı hasara yol açabilir ve reseptör sayısını azaltabilir. Sonuçta sinaptik iletim güvenlik faktörü düşer; tekrarlayan kullanımda kas güçsüzlüğü...",
    "postAnswerExpandedExplanation": "Yanlıştır. Presinaptik kalsiyum kanalı antikorları Lambert-Eaton sendromunda görülür. Bu tabloda egzersizle güçte geçici artış görülebilir. Doğru cevap A’dır. Myastenia graviste otoantikorlar postsinaptik asetilkolin reseptörlerini bloke edebilir, kompleman aracılı hasara yol açabilir ve reseptör sayısını azaltabilir. Sonuçta sinaptik iletim güvenlik faktörü düşer; tekrarlayan kullanımda kas güçsüzlüğü...",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy",
      "rheumatology",
      "immunology"
    ],
    "relatedTerms": [
      "antikor",
      "kalsiyum"
    ],
    "safeNestedTerms": [
      "antikor",
      "kalsiyum"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Presinaptik kalsiyum kanalı antikorları",
      "antikor",
      "kalsiyum"
    ],
    "sourceTextExamples": [
      "Yanlıştır. Presinaptik kalsiyum kanalı antikorları Lambert-Eaton sendromunda görülür. Bu tabloda egzersizle güçte geçici artış görülebilir.",
      "Yanlıştır. Presinaptik kalsiyum kanalı antikorları Lambert-Eaton sendromunda görülür. Bu tabloda egzersizle güçte geçici artış görülebilir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-primer-biliyer-kolanjitte-kolestatik-enzim-paterni",
    "term": "Primer biliyer kolanjitte kolestatik enzim paterni",
    "aliases": [
      "Primer biliyer kolanjitte kolestatik enzim paterni"
    ],
    "normalizedTerm": "primer biliyer kolanjitte kolestatik enzim paterni",
    "TurkishName": "Primer biliyer kolanjitte kolestatik enzim paterni",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Tanısal test / karar eşiği",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Primer biliyer kolanjitte kolestatik otoimmün karaciğer hastalığı ile karakteristi Antimitokondriyal antikor özellikle PBC ile güçlü ilişkilidir.",
    "definition": "Primer biliyer kolanjitte kolestatik otoimmün karaciğer hastalığı ile karakteristi Antimitokondriyal antikor özellikle PBC ile güçlü ilişkilidir.",
    "detailedExplanation": "Primer biliyer kolanjitte kolestatik otoimmün karaciğer hastalığı ile karakteristi Antimitokondriyal antikor özellikle PBC ile güçlü ilişkilidir. Anti-düz kas antikoru otoimmün hepatitte, anti-LKM1 tip 2 otoimmün hepatitte, p-ANCA ise primer sklerozan kolanjit ve inflamatuvar bağırsak hastalığı bağlamında daha çok düşünülür. Primer biliyer kolanjit küçük intrahepatik safra kanallarını tutan otoimmün kolestatik...",
    "postAnswerExplanation": "Primer biliyer kolanjitte kolestatik otoimmün karaciğer hastalığı ile karakteristi Antimitokondriyal antikor özellikle PBC ile güçlü ilişkilidir. Anti-düz kas antikoru otoimmün hepatitte, anti-LKM1 tip 2 otoimmün hepatitte, p-ANCA ise primer sklerozan kolanjit ve inflamatuvar bağırsak hastalığı bağlamında daha çok düşünülür. Primer biliyer kolanjit küçük intrahepatik safra kanallarını tutan otoimmün kolestatik...",
    "postAnswerExpandedExplanation": "Primer biliyer kolanjitte kolestatik otoimmün karaciğer hastalığı ile karakteristi Antimitokondriyal antikor özellikle PBC ile güçlü ilişkilidir. Anti-düz kas antikoru otoimmün hepatitte, anti-LKM1 tip 2 otoimmün hepatitte, p-ANCA ise primer sklerozan kolanjit ve inflamatuvar bağırsak hastalığı bağlamında daha çok düşünülür. Primer biliyer kolanjit küçük intrahepatik safra kanallarını tutan otoimmün kolestatik...",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Primer biliyer kolanjitte kolestatik enzim paterni"
    ],
    "sourceTextExamples": [
      "Primer biliyer kolanjitte kolestatik otoimmün karaciğer hastalığı ile karakteristi",
      "Primer biliyer kolanjitte kolestatik otoimmün karaciğer hastalığı ile karakteristi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 2,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-proksimal-tubul-organik-anyon-sekresyonu-inhibisyonu",
    "term": "Proksimal tübül organik anyon sekresyonu inhibisyonu",
    "aliases": [
      "Proksimal tübül organik anyon sekresyonu inhibisyonu"
    ],
    "normalizedTerm": "proksimal tubul organik anyon sekresyonu inhibisyonu",
    "TurkishName": "Proksimal tübül organik anyon sekresyonu inhibisyonu",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Probenesid renal eliminasyonu azaltır; penisilini metabolize etmez, glomerüler filtrasyonu artırmaz ve diüretik kotransporter blokajı üzerinden etki göstermez.",
    "definition": "Probenesid renal eliminasyonu azaltır; penisilini metabolize etmez, glomerüler filtrasyonu artırmaz ve diüretik kotransporter blokajı üzerinden etki göstermez.",
    "detailedExplanation": "Probenesid renal eliminasyonu azaltır; penisilini metabolize etmez, glomerüler filtrasyonu artırmaz ve diüretik kotransporter blokajı üzerinden etki göstermez. Probenesid proksimal tübüldeki organik anyon transport sistemini inhibe eder; penisilin gibi organik anyonların renal tübüler sekresyonu azalır ve plazma düzeyi/yarı ömrü artar. Seçilmelidir; probenesidin klasik etkisi proksimal tübül organik anyon...",
    "postAnswerExplanation": "Probenesid renal eliminasyonu azaltır; penisilini metabolize etmez, glomerüler filtrasyonu artırmaz ve diüretik kotransporter blokajı üzerinden etki göstermez. Probenesid proksimal tübüldeki organik anyon transport sistemini inhibe eder; penisilin gibi organik anyonların renal tübüler sekresyonu azalır ve plazma düzeyi/yarı ömrü artar. Seçilmelidir; probenesidin klasik etkisi proksimal tübül organik anyon...",
    "postAnswerExpandedExplanation": "Probenesid renal eliminasyonu azaltır; penisilini metabolize etmez, glomerüler filtrasyonu artırmaz ve diüretik kotransporter blokajı üzerinden etki göstermez. Probenesid proksimal tübüldeki organik anyon transport sistemini inhibe eder; penisilin gibi organik anyonların renal tübüler sekresyonu azalır ve plazma düzeyi/yarı ömrü artar. Seçilmelidir; probenesidin klasik etkisi proksimal tübül organik anyon...",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Proksimal tübül organik anyon sekresyonu inhibisyonu"
    ],
    "sourceTextExamples": [
      "Probenesid renal eliminasyonu azaltır; penisilini metabolize etmez, glomerüler filtrasyonu artırmaz ve diüretik kotransporter blokajı üzerinden etki göstermez.",
      "Probenesid sorularında ana ayrım, “proksimal tübül organik anyon sekresyonu inhibisyonu” bilgisidir; bu nedenle bazı beta-laktamların renal atılımını azaltır."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 11,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-purulan-balgam",
    "term": "Pürülan balgam",
    "aliases": [
      "Pürülan balgam",
      "irinli balgam"
    ],
    "normalizedTerm": "purulan balgam",
    "TurkishName": "Pürülan balgam",
    "EnglishName": "",
    "category": "Temel semptom / solunum-enfeksiyon",
    "subcategory": "solunum-enfeksiyon",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Balgamın irinli/inflamatuvar karakterde olmasını anlatır.",
    "preAnswerSafeDefinition": "Balgamın irinli/inflamatuvar karakterde olmasını anlatır.",
    "shortDefinition": "Nötrofil ve enfeksiyöz inflamasyon içeriği artmış balgamı ifade eder.",
    "definition": "Nötrofil ve enfeksiyöz inflamasyon içeriği artmış balgamı ifade eder.",
    "detailedExplanation": "Ateş ve infiltrasyonla birlikte bakteriyel pnömoni lehine değer kazanır; kronik bronşitte tek başına özgül değildir.",
    "postAnswerExplanation": "Ateş ve infiltrasyonla birlikte bakteriyel pnömoni lehine değer kazanır; kronik bronşitte tek başına özgül değildir.",
    "postAnswerExpandedExplanation": "Ateş ve infiltrasyonla birlikte bakteriyel pnömoni lehine değer kazanır; kronik bronşitte tek başına özgül değildir.",
    "tusPearl": "Pürülan balgam + lober infiltrasyon = bakteriyel pnömoni olasılığı artar.",
    "differentialPoint": "",
    "clinicalRelevance": "Pürülan balgam + lober infiltrasyon = bakteriyel pnömoni olasılığı artar.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "microbiology"
    ],
    "relatedTerms": [
      "Kırmızı bayrak",
      "Klinik bağlam"
    ],
    "safeNestedTerms": [
      "Kırmızı bayrak",
      "Klinik bağlam"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Pürülan balgam",
      "irinli balgam",
      "Kırmızı bayrak",
      "Klinik bağlam"
    ],
    "sourceTextExamples": [
      "Bol pürülan balgam + tekrarlayan enfeksiyon + tram-track görüntüsü bronşektaziyi düşündürür.",
      "Bol pürülan balgam + tekrarlayan enfeksiyon + tram-track görüntüsü bronşektaziyi düşündürür."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 4,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addFoundationEntryLowPriority",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusGlossaryExpandedIndex.js",
      "reasonForRecommendation": "Basit ama sık karşılaşılan klinik terminoloji; düşük matchingPriority ile, özellikle feedback ve açıklama alanlarında öğretici tooltip olarak kullanılmalı.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-retinoblastom-genetigi",
    "term": "Retinoblastom genetiği",
    "aliases": [
      "Retinoblastom genetiği"
    ],
    "normalizedTerm": "retinoblastom genetigi",
    "TurkishName": "Retinoblastom genetiği",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "RB1 kaybı G1/S hücre döngüsü kontrolünü bozar.",
    "definition": "RB1 kaybı G1/S hücre döngüsü kontrolünü bozar.",
    "detailedExplanation": "Retinoblastom genetiği RB1 kaybı G1/S hücre döngüsü kontrolünü bozar.",
    "postAnswerExplanation": "Retinoblastom genetiği RB1 kaybı G1/S hücre döngüsü kontrolünü bozar.",
    "postAnswerExpandedExplanation": "Retinoblastom genetiği RB1 kaybı G1/S hücre döngüsü kontrolünü bozar.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Retinoblastom genetiği"
    ],
    "sourceTextExamples": [
      "Retinoblastom genetiği",
      "Retinoblastom genetiği"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-retinoblastom-protein-kaybi",
    "term": "Retinoblastom protein kaybı",
    "aliases": [
      "Retinoblastom protein kaybı"
    ],
    "normalizedTerm": "retinoblastom protein kaybi",
    "TurkishName": "Retinoblastom protein kaybı",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "RB proteini G1 kontrol noktasının merkezi tümör baskılayıcılarından biridir.",
    "definition": "RB proteini G1 kontrol noktasının merkezi tümör baskılayıcılarından biridir.",
    "detailedExplanation": "RB proteini G1 kontrol noktasının merkezi tümör baskılayıcılarından biridir. Normalde hipofosforile RB, E2F’yi bağlayarak S fazına geçiş için gerekli genlerin transkripsiyonunu engeller. Siklin D-CDK4/6 aracılı fosforilasyon RB’yi inaktive eder ve E2F kontrollü biçimde serbestleşir. RB geninin kalıcı inaktivasyonunda ise hücre dışı büyüme sinyallerinden bağımsız olarak E2F aktivitesi artar; DNA sentezi programı...",
    "postAnswerExplanation": "RB proteini G1 kontrol noktasının merkezi tümör baskılayıcılarından biridir. Normalde hipofosforile RB, E2F’yi bağlayarak S fazına geçiş için gerekli genlerin transkripsiyonunu engeller. Siklin D-CDK4/6 aracılı fosforilasyon RB’yi inaktive eder ve E2F kontrollü biçimde serbestleşir. RB geninin kalıcı inaktivasyonunda ise hücre dışı büyüme sinyallerinden bağımsız olarak E2F aktivitesi artar; DNA sentezi programı...",
    "postAnswerExpandedExplanation": "RB proteini G1 kontrol noktasının merkezi tümör baskılayıcılarından biridir. Normalde hipofosforile RB, E2F’yi bağlayarak S fazına geçiş için gerekli genlerin transkripsiyonunu engeller. Siklin D-CDK4/6 aracılı fosforilasyon RB’yi inaktive eder ve E2F kontrollü biçimde serbestleşir. RB geninin kalıcı inaktivasyonunda ise hücre dışı büyüme sinyallerinden bağımsız olarak E2F aktivitesi artar; DNA sentezi programı...",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Retinoblastom protein kaybı"
    ],
    "sourceTextExamples": [
      "RB proteini G1 kontrol noktasının merkezi tümör baskılayıcılarından biridir. Normalde hipofosforile RB, E2F’yi bağlayarak S fazına geçiş için gerekli genlerin transkripsiyonunu engeller.",
      "RB proteini G1 kontrol noktasının merkezi tümör baskılayıcılarından biridir. Normalde hipofosforile RB, E2F’yi bağlayarak S fazına geçiş için gerekli genlerin transkripsiyonunu engeller."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 4,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-s-fazina-gecis-kolaylasmasi",
    "term": "S fazına geçiş kolaylaşması",
    "aliases": [
      "S fazına geçiş kolaylaşması"
    ],
    "normalizedTerm": "s fazina gecis kolaylasmasi",
    "TurkishName": "S fazına geçiş kolaylaşması",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Rb-E2F ekseni hücre döngüsü kontrolünün klasik G1-S kapısıdır.",
    "definition": "Rb-E2F ekseni hücre döngüsü kontrolünün klasik G1-S kapısıdır.",
    "detailedExplanation": "Rb-E2F ekseni hücre döngüsü kontrolünün klasik G1-S kapısıdır. NF-κB inflamasyon ve sağkalım sinyalleriyle, STAT3 sitokin/büyüme faktörü sinyaliyle, SMAD4 ise TGF-β yoluyla ilişkilidir; Rb’nin doğrudan bağlayıp baskıladığı temel faktör E2F’dir. Hipofosforile Rb, E2F transkripsiyon faktörünü baskılar; Rb’nin fosforilasyonu veya kaybı E2F’yi serbestleştirerek S fazı genlerinin ekspresyonunu artırır. Rb’nin klasik...",
    "postAnswerExplanation": "Rb-E2F ekseni hücre döngüsü kontrolünün klasik G1-S kapısıdır. NF-κB inflamasyon ve sağkalım sinyalleriyle, STAT3 sitokin/büyüme faktörü sinyaliyle, SMAD4 ise TGF-β yoluyla ilişkilidir; Rb’nin doğrudan bağlayıp baskıladığı temel faktör E2F’dir. Hipofosforile Rb, E2F transkripsiyon faktörünü baskılar; Rb’nin fosforilasyonu veya kaybı E2F’yi serbestleştirerek S fazı genlerinin ekspresyonunu artırır. Rb’nin klasik...",
    "postAnswerExpandedExplanation": "Rb-E2F ekseni hücre döngüsü kontrolünün klasik G1-S kapısıdır. NF-κB inflamasyon ve sağkalım sinyalleriyle, STAT3 sitokin/büyüme faktörü sinyaliyle, SMAD4 ise TGF-β yoluyla ilişkilidir; Rb’nin doğrudan bağlayıp baskıladığı temel faktör E2F’dir. Hipofosforile Rb, E2F transkripsiyon faktörünü baskılar; Rb’nin fosforilasyonu veya kaybı E2F’yi serbestleştirerek S fazı genlerinin ekspresyonunu artırır. Rb’nin klasik...",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "S fazına geçiş kolaylaşması"
    ],
    "sourceTextExamples": [
      "Rb-E2F ekseni hücre döngüsü kontrolünün klasik G1-S kapısıdır. NF-κB inflamasyon ve sağkalım sinyalleriyle, STAT3 sitokin/büyüme faktörü sinyaliyle, SMAD4 ise TGF-β yoluyla ilişkilidir; Rb’nin doğrudan bağlayıp baskıladığı temel faktör E2F’dir.",
      "Rb kaybı sorularında ana sonuç E2F baskısının kalkması ve S fazına geçişin kolaylaşmasıdır."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-sekretin-etkisi",
    "term": "Sekretin etkisi",
    "aliases": [
      "Sekretin etkisi"
    ],
    "normalizedTerm": "sekretin etkisi",
    "TurkishName": "Sekretin etkisi",
    "EnglishName": "",
    "category": "Fizyoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Vücut fonksiyonlarının düzenlenmesiyle ilişkili fizyolojik bir ilişkiyi ifade eder.",
    "preAnswerSafeDefinition": "Vücut fonksiyonlarının düzenlenmesiyle ilişkili fizyolojik bir ilişkiyi ifade eder.",
    "shortDefinition": "Sekretin pankreatik kanal hücrelerinden bikarbonat salınımını artırarak asidi nötralize eder.",
    "definition": "Sekretin pankreatik kanal hücrelerinden bikarbonat salınımını artırarak asidi nötralize eder.",
    "detailedExplanation": "Sekretin etkisi Sekretin pankreatik kanal hücrelerinden bikarbonat salınımını artırarak asidi nötralize eder.",
    "postAnswerExplanation": "Sekretin etkisi Sekretin pankreatik kanal hücrelerinden bikarbonat salınımını artırarak asidi nötralize eder.",
    "postAnswerExpandedExplanation": "Sekretin etkisi Sekretin pankreatik kanal hücrelerinden bikarbonat salınımını artırarak asidi nötralize eder.",
    "tusPearl": "Fizyoloji sorusunda yönü kaçırma: değişken artınca hangi kompansasyonun devreye girdiği sorulur.",
    "differentialPoint": "Ayırıcı nokta, primer değişken ile kompansatuvar yanıtın birbirine karıştırılmamasıdır.",
    "clinicalRelevance": "Fizyoloji sorusunda yönü kaçırma: değişken artınca hangi kompansasyonun devreye girdiği sorulur.",
    "mechanism": "",
    "relatedBranches": [
      "physiology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Sekretin etkisi"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addAsSafeNestedTerm",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve fizyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-sertoli-hucresi-bariyeri",
    "term": "Sertoli hücresi bariyeri",
    "aliases": [
      "Sertoli hücresi bariyeri"
    ],
    "normalizedTerm": "sertoli hucresi bariyeri",
    "TurkishName": "Sertoli hücresi bariyeri",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Sertoli hücreleri sıkı bağlantılarla spermatogenetik hücreleri immün sistemden ayırır.",
    "definition": "Sertoli hücreleri sıkı bağlantılarla spermatogenetik hücreleri immün sistemden ayırır.",
    "detailedExplanation": "Sertoli hücresi bariyeri Sertoli hücreleri sıkı bağlantılarla spermatogenetik hücreleri immün sistemden ayırır.",
    "postAnswerExplanation": "Sertoli hücresi bariyeri Sertoli hücreleri sıkı bağlantılarla spermatogenetik hücreleri immün sistemden ayırır.",
    "postAnswerExpandedExplanation": "Sertoli hücresi bariyeri Sertoli hücreleri sıkı bağlantılarla spermatogenetik hücreleri immün sistemden ayırır.",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "safeNestedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Sertoli hücresi bariyeri",
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "sourceTextExamples": [
      "Sertoli hücresi bariyeri",
      "Sertoli hücresi bariyeri"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-serum-triptaz-duzeyi",
    "term": "Serum triptaz düzeyi",
    "aliases": [
      "Serum triptaz düzeyi"
    ],
    "normalizedTerm": "serum triptaz duzeyi",
    "TurkishName": "Serum triptaz düzeyi",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Triptaz mast hücre aktivasyonunu gösterir; klinik acil tedavinin yerini tutmaz.",
    "definition": "Triptaz mast hücre aktivasyonunu gösterir; klinik acil tedavinin yerini tutmaz.",
    "detailedExplanation": "Serum triptaz düzeyi. Triptaz mast hücre aktivasyonunu gösterir; klinik acil tedavinin yerini tutmaz.",
    "postAnswerExplanation": "Serum triptaz düzeyi. Triptaz mast hücre aktivasyonunu gösterir; klinik acil tedavinin yerini tutmaz.",
    "postAnswerExpandedExplanation": "Serum triptaz düzeyi. Triptaz mast hücre aktivasyonunu gösterir; klinik acil tedavinin yerini tutmaz.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Serum triptaz düzeyi"
    ],
    "sourceTextExamples": [
      "Serum triptaz düzeyi.",
      "Serum triptaz düzeyi."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 2,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-servikal-skuamoz-hucreli-karsinom",
    "term": "Servikal skuamöz hücreli karsinom",
    "aliases": [
      "Servikal skuamöz hücreli karsinom"
    ],
    "normalizedTerm": "servikal skuamoz hucreli karsinom",
    "TurkishName": "Servikal skuamöz hücreli karsinom",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Servikal skuamöz hücreli karsinom, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "Servikal skuamöz hücreli karsinom, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "Servikal skuamöz hücreli karsinom Postmenopozal vajinal kanama, obezite, hipertansiyon, diyabet ve nulliparite endometrium adenokarsinomu açısından risk oluşturur. Artmış endometrium kalınlığı ve biyopside invaziv endometrioid adenokarsinom tanıyı destekler; patogenezde karşılanmamış östrojen etkisi önemlidir.",
    "postAnswerExplanation": "Servikal skuamöz hücreli karsinom Postmenopozal vajinal kanama, obezite, hipertansiyon, diyabet ve nulliparite endometrium adenokarsinomu açısından risk oluşturur. Artmış endometrium kalınlığı ve biyopside invaziv endometrioid adenokarsinom tanıyı destekler; patogenezde karşılanmamış östrojen etkisi önemlidir.",
    "postAnswerExpandedExplanation": "Servikal skuamöz hücreli karsinom Postmenopozal vajinal kanama, obezite, hipertansiyon, diyabet ve nulliparite endometrium adenokarsinomu açısından risk oluşturur. Artmış endometrium kalınlığı ve biyopside invaziv endometrioid adenokarsinom tanıyı destekler; patogenezde karşılanmamış östrojen etkisi önemlidir.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Servikal skuamöz hücreli karsinom"
    ],
    "sourceTextExamples": [
      "Servikal skuamöz hücreli karsinom",
      "Servikal skuamöz hücreli karsinom servikal lezyon ve HPV ilişkisiyle düşünülür; bu olguda endometrial kalınlaşma ve endometrioid biyopsi vardır."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 4,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-silikozis",
    "term": "Silikozis",
    "aliases": [
      "Silikozis"
    ],
    "normalizedTerm": "silikozis",
    "TurkishName": "Silikozis",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Silikozis, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "Silikozis, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "Silikozis Silika maruziyeti üst lob fibrozisi ve tüberküloz riskinde artışla ilişkilidir.",
    "postAnswerExplanation": "Silikozis Silika maruziyeti üst lob fibrozisi ve tüberküloz riskinde artışla ilişkilidir.",
    "postAnswerExpandedExplanation": "Silikozis Silika maruziyeti üst lob fibrozisi ve tüberküloz riskinde artışla ilişkilidir.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Silikozis"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 4,
      "confidenceScore": "medium",
      "ambiguityRisk": "medium",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-sol-varikosel-anatomisi",
    "term": "Sol varikosel anatomisi",
    "aliases": [
      "Sol varikosel anatomisi"
    ],
    "normalizedTerm": "sol varikosel anatomisi",
    "TurkishName": "Sol varikosel anatomisi",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Sol testiküler ven önce sol renal vene açılır; bu anatomik drenaj basınç artışına yatkınlık oluşturur.",
    "definition": "Sol testiküler ven önce sol renal vene açılır; bu anatomik drenaj basınç artışına yatkınlık oluşturur.",
    "detailedExplanation": "Sol varikosel anatomisi Sol testiküler ven önce sol renal vene açılır; bu anatomik drenaj basınç artışına yatkınlık oluşturur.",
    "postAnswerExplanation": "Sol varikosel anatomisi Sol testiküler ven önce sol renal vene açılır; bu anatomik drenaj basınç artışına yatkınlık oluşturur.",
    "postAnswerExpandedExplanation": "Sol varikosel anatomisi Sol testiküler ven önce sol renal vene açılır; bu anatomik drenaj basınç artışına yatkınlık oluşturur.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Sol varikosel anatomisi"
    ],
    "sourceTextExamples": [
      "Sol varikosel anatomisi",
      "Sol varikosel anatomisi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-soguk-nodul",
    "term": "Soğuk nodül",
    "aliases": [
      "Soğuk nodül"
    ],
    "normalizedTerm": "soguk nodul",
    "TurkishName": "Soğuk nodül",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Tiroid sintigrafisi düşük TSH varsa sıcak-soğuk nodül ayrımı için kullanılır; her nodülde ilk test değildir.",
    "definition": "Tiroid sintigrafisi düşük TSH varsa sıcak-soğuk nodül ayrımı için kullanılır; her nodülde ilk test değildir.",
    "detailedExplanation": "Tiroid sintigrafisi düşük TSH varsa sıcak-soğuk nodül ayrımı için kullanılır; her nodülde ilk test değildir. USG özelliklerine göre ince iğne aspirasyon kararı verilir.",
    "postAnswerExplanation": "Tiroid sintigrafisi düşük TSH varsa sıcak-soğuk nodül ayrımı için kullanılır; her nodülde ilk test değildir. USG özelliklerine göre ince iğne aspirasyon kararı verilir.",
    "postAnswerExpandedExplanation": "Tiroid sintigrafisi düşük TSH varsa sıcak-soğuk nodül ayrımı için kullanılır; her nodülde ilk test değildir. USG özelliklerine göre ince iğne aspirasyon kararı verilir.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Soğuk nodül"
    ],
    "sourceTextExamples": [
      "Tiroid sintigrafisi düşük TSH varsa sıcak-soğuk nodül ayrımı için kullanılır; her nodülde ilk test değildir.",
      "Tiroid sintigrafisi düşük TSH varsa sıcak-soğuk nodül ayrımı için kullanılır; her nodülde ilk test değildir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-subepidermal-gergin-bul",
    "term": "Subepidermal gergin bül",
    "aliases": [
      "Subepidermal gergin bül"
    ],
    "normalizedTerm": "subepidermal gergin bul",
    "TurkishName": "Subepidermal gergin bül",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Subepidermal gergin bül, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "Subepidermal gergin bül, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "Doğru cevap A’dır. Pemfigus vulgariste desmoglein 1 ve/veya desmoglein 3’e karşı IgG otoantikorları keratinositler arası adezyonu bozar; buna akantoliz denir. Bül intraepidermaldir, sıklıkla flasid karakterdedir ve mukozal tutulum görülebilir. Büllöz pemfigoidde hedef hemidesmozomal proteinlerdir; dermoepidermal bileşke etkilenir ve subepidermal, daha gergin büller oluşur. Bu nedenle desmozom-hemidesmozom,...",
    "postAnswerExplanation": "Doğru cevap A’dır. Pemfigus vulgariste desmoglein 1 ve/veya desmoglein 3’e karşı IgG otoantikorları keratinositler arası adezyonu bozar; buna akantoliz denir. Bül intraepidermaldir, sıklıkla flasid karakterdedir ve mukozal tutulum görülebilir. Büllöz pemfigoidde hedef hemidesmozomal proteinlerdir; dermoepidermal bileşke etkilenir ve subepidermal, daha gergin büller oluşur. Bu nedenle desmozom-hemidesmozom,...",
    "postAnswerExpandedExplanation": "Doğru cevap A’dır. Pemfigus vulgariste desmoglein 1 ve/veya desmoglein 3’e karşı IgG otoantikorları keratinositler arası adezyonu bozar; buna akantoliz denir. Bül intraepidermaldir, sıklıkla flasid karakterdedir ve mukozal tutulum görülebilir. Büllöz pemfigoidde hedef hemidesmozomal proteinlerdir; dermoepidermal bileşke etkilenir ve subepidermal, daha gergin büller oluşur. Bu nedenle desmozom-hemidesmozom,...",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Subepidermal gergin bül"
    ],
    "sourceTextExamples": [
      "Doğru cevap A’dır. Pemfigus vulgariste desmoglein 1 ve/veya desmoglein 3’e karşı IgG otoantikorları keratinositler arası adezyonu bozar; buna akantoliz denir. Bül intraepidermaldir, sıklıkla flasid karakterdedir ve mukozal tutulum görülebilir.",
      "Pemfigus vulgaris = desmoglein/desmozom + intraepidermal flasid bül + mukozal tutulum; büllöz pemfigoid = hemidesmozom + subepidermal gergin bül."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 11,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-superior-gluteal-sinir-hasari",
    "term": "Superior gluteal sinir hasarı",
    "aliases": [
      "Superior gluteal sinir hasarı"
    ],
    "normalizedTerm": "superior gluteal sinir hasari",
    "TurkishName": "Superior gluteal sinir hasarı",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Anatomik ilişki",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Trendelenburg bulgusunu superior gluteal sinir hasarıyla ilişkilendirebilme Tek ayak duruşunda karşı pelvisin düşmesi Trendelenburg bulgusudur ve stance tarafındaki kalça abduktorlarının yetersizliğini gösterir.",
    "definition": "Trendelenburg bulgusunu superior gluteal sinir hasarıyla ilişkilendirebilme Tek ayak duruşunda karşı pelvisin düşmesi Trendelenburg bulgusudur ve stance tarafındaki kalça abduktorlarının yetersizliğini gösterir.",
    "detailedExplanation": "Trendelenburg bulgusunu superior gluteal sinir hasarıyla ilişkilendirebilme Tek ayak duruşunda karşı pelvisin düşmesi Trendelenburg bulgusudur ve stance tarafındaki kalça abduktorlarının yetersizliğini gösterir. Musculus gluteus medius ve musculus gluteus minimus kaslarını nervus gluteus superior innerve eder; bu sinirin hasarı kalça stabilitesini bozar.",
    "postAnswerExplanation": "Trendelenburg bulgusunu superior gluteal sinir hasarıyla ilişkilendirebilme Tek ayak duruşunda karşı pelvisin düşmesi Trendelenburg bulgusudur ve stance tarafındaki kalça abduktorlarının yetersizliğini gösterir. Musculus gluteus medius ve musculus gluteus minimus kaslarını nervus gluteus superior innerve eder; bu sinirin hasarı kalça stabilitesini bozar.",
    "postAnswerExpandedExplanation": "Trendelenburg bulgusunu superior gluteal sinir hasarıyla ilişkilendirebilme Tek ayak duruşunda karşı pelvisin düşmesi Trendelenburg bulgusudur ve stance tarafındaki kalça abduktorlarının yetersizliğini gösterir. Musculus gluteus medius ve musculus gluteus minimus kaslarını nervus gluteus superior innerve eder; bu sinirin hasarı kalça stabilitesini bozar.",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "neurology",
      "anatomy"
    ],
    "relatedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "safeNestedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Superior gluteal sinir hasarı",
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "sourceTextExamples": [
      "Trendelenburg bulgusunu superior gluteal sinir hasarıyla ilişkilendirebilme",
      "Trendelenburg bulgusunu superior gluteal sinir hasarıyla ilişkilendirebilme"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-superior-mezenterik-arter-alani",
    "term": "Süperior mezenterik arter alanı",
    "aliases": [
      "Süperior mezenterik arter alanı"
    ],
    "normalizedTerm": "superior mezenterik arter alani",
    "TurkishName": "Süperior mezenterik arter alanı",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Anatomik ilişki",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Süperior mezenterik arter midgut türevlerini besleyen ana damardır.",
    "definition": "Süperior mezenterik arter midgut türevlerini besleyen ana damardır.",
    "detailedExplanation": "Süperior mezenterik arter alanı Süperior mezenterik arter midgut türevlerini besleyen ana damardır.",
    "postAnswerExplanation": "Süperior mezenterik arter alanı Süperior mezenterik arter midgut türevlerini besleyen ana damardır.",
    "postAnswerExpandedExplanation": "Süperior mezenterik arter alanı Süperior mezenterik arter midgut türevlerini besleyen ana damardır.",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "safeNestedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Süperior mezenterik arter alanı",
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "sourceTextExamples": [
      "Süperior mezenterik arter alanı",
      "Süperior mezenterik arter alanı"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-sicak-nodul",
    "term": "Sıcak nodül",
    "aliases": [
      "Sıcak nodül"
    ],
    "normalizedTerm": "sicak nodul",
    "TurkishName": "Sıcak nodül",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Tiroid sintigrafisi düşük TSH varsa sıcak-soğuk nodül ayrımı için kullanılır; her nodülde ilk test değildir.",
    "definition": "Tiroid sintigrafisi düşük TSH varsa sıcak-soğuk nodül ayrımı için kullanılır; her nodülde ilk test değildir.",
    "detailedExplanation": "Tiroid sintigrafisi düşük TSH varsa sıcak-soğuk nodül ayrımı için kullanılır; her nodülde ilk test değildir. USG özelliklerine göre ince iğne aspirasyon kararı verilir.",
    "postAnswerExplanation": "Tiroid sintigrafisi düşük TSH varsa sıcak-soğuk nodül ayrımı için kullanılır; her nodülde ilk test değildir. USG özelliklerine göre ince iğne aspirasyon kararı verilir.",
    "postAnswerExpandedExplanation": "Tiroid sintigrafisi düşük TSH varsa sıcak-soğuk nodül ayrımı için kullanılır; her nodülde ilk test değildir. USG özelliklerine göre ince iğne aspirasyon kararı verilir.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Sıcak nodül"
    ],
    "sourceTextExamples": [
      "Tiroid sintigrafisi düşük TSH varsa sıcak-soğuk nodül ayrımı için kullanılır; her nodülde ilk test değildir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-ttp-patogenezi",
    "term": "TTP patogenezi",
    "aliases": [
      "TTP patogenezi"
    ],
    "normalizedTerm": "ttp patogenezi",
    "TurkishName": "TTP patogenezi",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "TTP patogenezi, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "TTP patogenezi, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "TTP patogenezi VWF multimerleri parçalanamaz ve mikrotrombüs oluşumu artar.",
    "postAnswerExplanation": "TTP patogenezi VWF multimerleri parçalanamaz ve mikrotrombüs oluşumu artar.",
    "postAnswerExpandedExplanation": "TTP patogenezi VWF multimerleri parçalanamaz ve mikrotrombüs oluşumu artar.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "TTP patogenezi"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-tasipne",
    "term": "Taşipne",
    "aliases": [
      "Taşipne",
      "tachypnea"
    ],
    "normalizedTerm": "tasipne",
    "TurkishName": "Taşipne",
    "EnglishName": "",
    "category": "Temel bulgu / solunum-acil",
    "subcategory": "solunum-acil",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hızlı solunumu ifade eden temel vital bulgudur.",
    "preAnswerSafeDefinition": "Hızlı solunumu ifade eden temel vital bulgudur.",
    "shortDefinition": "Solunum sayısının yaşa göre artmasıdır.",
    "definition": "Solunum sayısının yaşa göre artmasıdır.",
    "detailedExplanation": "Hipoksi, metabolik asidoz, sepsis, pulmoner emboli veya ağrı ile ilişkili olabilir; sadece akciğer hastalığı anlamına gelmez.",
    "postAnswerExplanation": "Hipoksi, metabolik asidoz, sepsis, pulmoner emboli veya ağrı ile ilişkili olabilir; sadece akciğer hastalığı anlamına gelmez.",
    "postAnswerExpandedExplanation": "Hipoksi, metabolik asidoz, sepsis, pulmoner emboli veya ağrı ile ilişkili olabilir; sadece akciğer hastalığı anlamına gelmez.",
    "tusPearl": "Taşipne metabolik asidoz kompanzasyonu da olabilir.",
    "differentialPoint": "",
    "clinicalRelevance": "Taşipne metabolik asidoz kompanzasyonu da olabilir.",
    "mechanism": "",
    "relatedBranches": [
      "surgery",
      "emergency"
    ],
    "relatedTerms": [
      "Kırmızı bayrak",
      "Klinik bağlam"
    ],
    "safeNestedTerms": [
      "Kırmızı bayrak",
      "Klinik bağlam"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Taşipne",
      "tachypnea",
      "Kırmızı bayrak",
      "Klinik bağlam"
    ],
    "sourceTextExamples": [
      "2 yaş altı bebekte hışıltı, taşipne ve viral üst solunum yolu öyküsü en çok neyi düşündürür?",
      "2 yaş altı; RSV; hışıltı; taşipne"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch6-foundation-major-gap",
      "occurrenceCount": 6,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addFoundationEntryLowPriority",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Basit ama sık karşılaşılan klinik terminoloji; düşük matchingPriority ile, özellikle feedback ve açıklama alanlarında öğretici tooltip olarak kullanılmalı.",
      "droppedAliases": []
    },
    "contextRequired": true,
    "requiredCoTerms": [
      "Kırmızı bayrak",
      "Klinik bağlam"
    ],
    "standaloneSafe": false
  },
  {
    "id": "v330-ultradeep-batch5-6-tekrarlayan-sinir-uyarim-testi",
    "term": "Tekrarlayan sinir uyarım testi",
    "aliases": [
      "Tekrarlayan sinir uyarım testi"
    ],
    "normalizedTerm": "tekrarlayan sinir uyarim testi",
    "TurkishName": "Tekrarlayan sinir uyarım testi",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Tanısal test / karar eşiği",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Dalgalanan oküler ve proksimal kas güçsüzlüğü, dinlenmeyle düzelme, dekrement yanıt ve asetilkolin reseptör antikor pozitifliği miyastenia gravis ile uyumludur.",
    "definition": "Dalgalanan oküler ve proksimal kas güçsüzlüğü, dinlenmeyle düzelme, dekrement yanıt ve asetilkolin reseptör antikor pozitifliği miyastenia gravis ile uyumludur.",
    "detailedExplanation": "Tekrarlayan sinir uyarım testi Dalgalanan oküler ve proksimal kas güçsüzlüğü, dinlenmeyle düzelme, dekrement yanıt ve asetilkolin reseptör antikor pozitifliği miyastenia gravis ile uyumludur. Temel mekanizma postsinaptik nikotinik asetilkolin reseptörlerinin otoantikorlarla hedeflenmesi ve nöromüsküler iletimin azalmasıdır.",
    "postAnswerExplanation": "Tekrarlayan sinir uyarım testi Dalgalanan oküler ve proksimal kas güçsüzlüğü, dinlenmeyle düzelme, dekrement yanıt ve asetilkolin reseptör antikor pozitifliği miyastenia gravis ile uyumludur. Temel mekanizma postsinaptik nikotinik asetilkolin reseptörlerinin otoantikorlarla hedeflenmesi ve nöromüsküler iletimin azalmasıdır.",
    "postAnswerExpandedExplanation": "Tekrarlayan sinir uyarım testi Dalgalanan oküler ve proksimal kas güçsüzlüğü, dinlenmeyle düzelme, dekrement yanıt ve asetilkolin reseptör antikor pozitifliği miyastenia gravis ile uyumludur. Temel mekanizma postsinaptik nikotinik asetilkolin reseptörlerinin otoantikorlarla hedeflenmesi ve nöromüsküler iletimin azalmasıdır.",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "neurology",
      "anatomy"
    ],
    "relatedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "safeNestedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Tekrarlayan sinir uyarım testi",
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "sourceTextExamples": [
      "Tekrarlayan sinir uyarım testi",
      "Tekrarlayan sinir uyarım testi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 6,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-tip-i-kollajen-kusuru",
    "term": "Tip I kollajen kusuru",
    "aliases": [
      "Tip I kollajen kusuru"
    ],
    "normalizedTerm": "tip i kollajen kusuru",
    "TurkishName": "Tip I kollajen kusuru",
    "EnglishName": "",
    "category": "Biyokimya / Genetik / Metabolizma",
    "subcategory": "Enzim/genetik defekt",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Metabolik yolak, enzim defekti veya kalıtım ilişkisiyle kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Tip I kollajen kusuru, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "definition": "Tip I kollajen kusuru, enzim/kofaktör/genetik defekt ile biriken veya azalan metabolitin eşleştirilmesini sağlayan biyokimyasal kavramdır.",
    "detailedExplanation": "Tip I kollajen kusuru. Osteogenezis imperfektada kemik matriksinin ana kollajeni etkilenir.",
    "postAnswerExplanation": "Tip I kollajen kusuru. Osteogenezis imperfektada kemik matriksinin ana kollajeni etkilenir.",
    "postAnswerExpandedExplanation": "Tip I kollajen kusuru. Osteogenezis imperfektada kemik matriksinin ana kollajeni etkilenir.",
    "tusPearl": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "differentialPoint": "Benzer metabolik hastalıklardan ayrım, hangi metabolitin biriktiği ve atağı neyin tetiklediği üzerinden yapılır.",
    "clinicalRelevance": "Metabolizma sorusunda ipucu genellikle substrat birikimi, ürün azalması, açlık/fruktoz/protein alımı sonrası tablo veya kalıtım tipidir.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "genetics"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Tip I kollajen kusuru"
    ],
    "sourceTextExamples": [
      "Tip I kollajen kusuru.",
      "Tip I kollajen kusuru."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 2,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve biyokimya / genetik / metabolizma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-tip-ii-pnomosit-lameller-cisimcikler",
    "term": "Tip II pnömosit lameller cisimcikler",
    "aliases": [
      "Tip II pnömosit lameller cisimcikler"
    ],
    "normalizedTerm": "tip ii pnomosit lameller cisimcikler",
    "TurkishName": "Tip II pnömosit lameller cisimcikler",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Tip II pnömositler surfaktan sentezler ve alveoler epitelin yenilenmesinde progenitör rol oynar.",
    "definition": "Tip II pnömositler surfaktan sentezler ve alveoler epitelin yenilenmesinde progenitör rol oynar.",
    "detailedExplanation": "Tip II pnömosit lameller cisimcikler Tip II pnömositler surfaktan sentezler ve alveoler epitelin yenilenmesinde progenitör rol oynar.",
    "postAnswerExplanation": "Tip II pnömosit lameller cisimcikler Tip II pnömositler surfaktan sentezler ve alveoler epitelin yenilenmesinde progenitör rol oynar.",
    "postAnswerExpandedExplanation": "Tip II pnömosit lameller cisimcikler Tip II pnömositler surfaktan sentezler ve alveoler epitelin yenilenmesinde progenitör rol oynar.",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "safeNestedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "Tip II pnömosit lameller cisimcikler",
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "sourceTextExamples": [
      "Tip II pnömosit lameller cisimcikler",
      "Tip II pnömosit lameller cisimcikler"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-tiroid-ince-igne-aspirasyon-biyopsisi",
    "term": "Tiroid ince iğne aspirasyon biyopsisi",
    "aliases": [
      "Tiroid ince iğne aspirasyon biyopsisi"
    ],
    "normalizedTerm": "tiroid ince igne aspirasyon biyopsisi",
    "TurkishName": "Tiroid ince iğne aspirasyon biyopsisi",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Tiroid nodülünde malignite şüphesinde ince iğne aspirasyon biyopsisini seçebilme Sert düzensiz tiroid nodülü, mikrokalsifikasyon, hipoekojenite, radyasyon ve aile öyküsü malignite riskini artırır.",
    "definition": "Tiroid nodülünde malignite şüphesinde ince iğne aspirasyon biyopsisini seçebilme Sert düzensiz tiroid nodülü, mikrokalsifikasyon, hipoekojenite, radyasyon ve aile öyküsü malignite riskini artırır.",
    "detailedExplanation": "Tiroid nodülünde malignite şüphesinde ince iğne aspirasyon biyopsisini seçebilme Sert düzensiz tiroid nodülü, mikrokalsifikasyon, hipoekojenite, radyasyon ve aile öyküsü malignite riskini artırır. Uygun boyut ve şüpheli ultrason özellikleri varlığında tanısal yaklaşım ultrason eşliğinde ince iğne aspirasyon biyopsisidir.",
    "postAnswerExplanation": "Tiroid nodülünde malignite şüphesinde ince iğne aspirasyon biyopsisini seçebilme Sert düzensiz tiroid nodülü, mikrokalsifikasyon, hipoekojenite, radyasyon ve aile öyküsü malignite riskini artırır. Uygun boyut ve şüpheli ultrason özellikleri varlığında tanısal yaklaşım ultrason eşliğinde ince iğne aspirasyon biyopsisidir.",
    "postAnswerExpandedExplanation": "Tiroid nodülünde malignite şüphesinde ince iğne aspirasyon biyopsisini seçebilme Sert düzensiz tiroid nodülü, mikrokalsifikasyon, hipoekojenite, radyasyon ve aile öyküsü malignite riskini artırır. Uygun boyut ve şüpheli ultrason özellikleri varlığında tanısal yaklaşım ultrason eşliğinde ince iğne aspirasyon biyopsisidir.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "endocrinology"
    ],
    "relatedTerms": [
      "biyopsi"
    ],
    "safeNestedTerms": [
      "biyopsi"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Tiroid ince iğne aspirasyon biyopsisi",
      "biyopsi"
    ],
    "sourceTextExamples": [
      "Tiroid nodülünde malignite şüphesinde ince iğne aspirasyon biyopsisini seçebilme",
      "Sert düzensiz tiroid nodülü, mikrokalsifikasyon, hipoekojenite, radyasyon ve aile öyküsü malignite riskini artırır. Uygun boyut ve şüpheli ultrason özellikleri varlığında tanısal yaklaşım ultrason eşliğinde ince iğne aspirasyon biyopsisidir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-tiroid-sintigrafisi",
    "term": "Tiroid sintigrafisi",
    "aliases": [
      "Tiroid sintigrafisi"
    ],
    "normalizedTerm": "tiroid sintigrafisi",
    "TurkishName": "Tiroid sintigrafisi",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "düşük TSH varsa sıcak-soğuk nodül ayrımı için kullanılır; her nodülde ilk test değildir.",
    "definition": "düşük TSH varsa sıcak-soğuk nodül ayrımı için kullanılır; her nodülde ilk test değildir.",
    "detailedExplanation": "Tiroid sintigrafisi düşük TSH varsa sıcak-soğuk nodül ayrımı için kullanılır; her nodülde ilk test değildir. USG özelliklerine göre ince iğne aspirasyon kararı verilir.",
    "postAnswerExplanation": "Tiroid sintigrafisi düşük TSH varsa sıcak-soğuk nodül ayrımı için kullanılır; her nodülde ilk test değildir. USG özelliklerine göre ince iğne aspirasyon kararı verilir.",
    "postAnswerExpandedExplanation": "Tiroid sintigrafisi düşük TSH varsa sıcak-soğuk nodül ayrımı için kullanılır; her nodülde ilk test değildir. USG özelliklerine göre ince iğne aspirasyon kararı verilir.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "endocrinology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Tiroid sintigrafisi"
    ],
    "sourceTextExamples": [
      "Tiroid sintigrafisi düşük TSH varsa sıcak-soğuk nodül ayrımı için kullanılır; her nodülde ilk test değildir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 2,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-trismus",
    "term": "Trismus",
    "aliases": [
      "Trismus"
    ],
    "normalizedTerm": "trismus",
    "TurkishName": "Trismus",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": ", risus sardonicus görünümü ve uyarıyla artan yaygın kas spazmları izlenir.",
    "definition": ", risus sardonicus görünümü ve uyarıyla artan yaygın kas spazmları izlenir.",
    "detailedExplanation": "Trismus, risus sardonicus görünümü ve uyarıyla artan yaygın kas spazmları izlenir. Kirli derin yara sonrası trismus ve uyarıyla artan yaygın kas spazmları tetanoz tablosunu düşündürür. Tetanospazmin merkezi sinir sisteminde inhibitör internöronlara taşınır ve gama-aminobütirik asit ile glisin salınımını engelleyerek motor nöronların kontrolsüz aktivasyonuna yol açar.",
    "postAnswerExplanation": "Trismus, risus sardonicus görünümü ve uyarıyla artan yaygın kas spazmları izlenir. Kirli derin yara sonrası trismus ve uyarıyla artan yaygın kas spazmları tetanoz tablosunu düşündürür. Tetanospazmin merkezi sinir sisteminde inhibitör internöronlara taşınır ve gama-aminobütirik asit ile glisin salınımını engelleyerek motor nöronların kontrolsüz aktivasyonuna yol açar.",
    "postAnswerExpandedExplanation": "Trismus, risus sardonicus görünümü ve uyarıyla artan yaygın kas spazmları izlenir. Kirli derin yara sonrası trismus ve uyarıyla artan yaygın kas spazmları tetanoz tablosunu düşündürür. Tetanospazmin merkezi sinir sisteminde inhibitör internöronlara taşınır ve gama-aminobütirik asit ile glisin salınımını engelleyerek motor nöronların kontrolsüz aktivasyonuna yol açar.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Trismus"
    ],
    "sourceTextExamples": [
      "Trismus, risus sardonicus görünümü ve uyarıyla artan yaygın kas spazmları izlenir.",
      "Kirli derin yara sonrası trismus ve uyarıyla artan yaygın kas spazmları tetanoz tablosunu düşündürür."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 30,
      "confidenceScore": "medium",
      "ambiguityRisk": "medium",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-truncus-coeliacus",
    "term": "Truncus coeliacus",
    "aliases": [
      "Truncus coeliacus"
    ],
    "normalizedTerm": "truncus coeliacus",
    "TurkishName": "Truncus coeliacus",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "dalları Truncus coeliacus foregut organlarını besler ve gastrik, splenik, hepatik arter dallarını verir.",
    "definition": "dalları Truncus coeliacus foregut organlarını besler ve gastrik, splenik, hepatik arter dallarını verir.",
    "detailedExplanation": "Truncus coeliacus dalları Truncus coeliacus foregut organlarını besler ve gastrik, splenik, hepatik arter dallarını verir.",
    "postAnswerExplanation": "Truncus coeliacus dalları Truncus coeliacus foregut organlarını besler ve gastrik, splenik, hepatik arter dallarını verir.",
    "postAnswerExpandedExplanation": "Truncus coeliacus dalları Truncus coeliacus foregut organlarını besler ve gastrik, splenik, hepatik arter dallarını verir.",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "safeNestedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Truncus coeliacus",
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "sourceTextExamples": [
      "Truncus coeliacus dalları"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 4,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-truncus-coeliacus-dallari",
    "term": "Truncus coeliacus dalları",
    "aliases": [
      "Truncus coeliacus dalları"
    ],
    "normalizedTerm": "truncus coeliacus dallari",
    "TurkishName": "Truncus coeliacus dalları",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Truncus coeliacus foregut organlarını besler ve gastrik, splenik, hepatik arter dallarını verir.",
    "definition": "Truncus coeliacus foregut organlarını besler ve gastrik, splenik, hepatik arter dallarını verir.",
    "detailedExplanation": "Truncus coeliacus dalları Truncus coeliacus foregut organlarını besler ve gastrik, splenik, hepatik arter dallarını verir.",
    "postAnswerExplanation": "Truncus coeliacus dalları Truncus coeliacus foregut organlarını besler ve gastrik, splenik, hepatik arter dallarını verir.",
    "postAnswerExpandedExplanation": "Truncus coeliacus dalları Truncus coeliacus foregut organlarını besler ve gastrik, splenik, hepatik arter dallarını verir.",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "safeNestedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Truncus coeliacus dalları",
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "sourceTextExamples": [
      "Truncus coeliacus dalları",
      "Truncus coeliacus dalları"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-uterin-masaj-plus-intravenoz-oksitosin",
    "term": "Uterin masaj + intravenöz oksitosin",
    "aliases": [
      "Uterin masaj + intravenöz oksitosin"
    ],
    "normalizedTerm": "uterin masaj + intravenoz oksitosin",
    "TurkishName": "Uterin masaj + intravenöz oksitosin",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Anatomik ilişki",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Uterin masaj ve intravenöz oksitosin uygulaması Doğum sonrası yoğun kanama, yumuşak ve gevşek uterus fundusu ile belirgin laserasyon olmaması uterin atoniyi düşündürür.",
    "definition": "Uterin masaj ve intravenöz oksitosin uygulaması Doğum sonrası yoğun kanama, yumuşak ve gevşek uterus fundusu ile belirgin laserasyon olmaması uterin atoniyi düşündürür.",
    "detailedExplanation": "Uterin masaj ve intravenöz oksitosin uygulaması Doğum sonrası yoğun kanama, yumuşak ve gevşek uterus fundusu ile belirgin laserasyon olmaması uterin atoniyi düşündürür. İlk tedavi uterusun kasılmasını sağlamak için uterin masaj ve oksitosindir; kan replasmanı destekleyici olabilir ancak kanamanın kaynağını düzeltmez.",
    "postAnswerExplanation": "Uterin masaj ve intravenöz oksitosin uygulaması Doğum sonrası yoğun kanama, yumuşak ve gevşek uterus fundusu ile belirgin laserasyon olmaması uterin atoniyi düşündürür. İlk tedavi uterusun kasılmasını sağlamak için uterin masaj ve oksitosindir; kan replasmanı destekleyici olabilir ancak kanamanın kaynağını düzeltmez.",
    "postAnswerExpandedExplanation": "Uterin masaj ve intravenöz oksitosin uygulaması Doğum sonrası yoğun kanama, yumuşak ve gevşek uterus fundusu ile belirgin laserasyon olmaması uterin atoniyi düşündürür. İlk tedavi uterusun kasılmasını sağlamak için uterin masaj ve oksitosindir; kan replasmanı destekleyici olabilir ancak kanamanın kaynağını düzeltmez.",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology",
      "anatomy"
    ],
    "relatedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "safeNestedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Uterin masaj + intravenöz oksitosin",
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "sourceTextExamples": [
      "Uterin masaj ve intravenöz oksitosin uygulaması",
      "Uterin masaj ve intravenöz oksitosin uygulaması"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-vena-saphena-magna",
    "term": "Vena saphena magna",
    "aliases": [
      "Vena saphena magna"
    ],
    "normalizedTerm": "vena saphena magna",
    "TurkishName": "Vena saphena magna",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Anatomik ilişki",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "lokalizasyonu Safen ven medial malleol önünden geçer; bu sabit nokta venöz erişim ve greft sorularında kullanılır.",
    "definition": "lokalizasyonu Safen ven medial malleol önünden geçer; bu sabit nokta venöz erişim ve greft sorularında kullanılır.",
    "detailedExplanation": "vena saphena magna lokalizasyonu Safen ven medial malleol önünden geçer; bu sabit nokta venöz erişim ve greft sorularında kullanılır.",
    "postAnswerExplanation": "vena saphena magna lokalizasyonu Safen ven medial malleol önünden geçer; bu sabit nokta venöz erişim ve greft sorularında kullanılır.",
    "postAnswerExpandedExplanation": "vena saphena magna lokalizasyonu Safen ven medial malleol önünden geçer; bu sabit nokta venöz erişim ve greft sorularında kullanılır.",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "safeNestedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Vena saphena magna",
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "sourceTextExamples": [
      "vena saphena magna lokalizasyonu",
      "vena saphena magna acil damar yolu için ayak bileğinde hangi anatomik noktada aranır?"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 3,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-villus-atrofisi-plus-kript-hiperplazisi-plus-intraepitelyal-lenfosit-artisi",
    "term": "Villus atrofisi + kript hiperplazisi + intraepitelyal lenfosit artışı",
    "aliases": [
      "Villus atrofisi + kript hiperplazisi + intraepitelyal lenfosit artışı"
    ],
    "normalizedTerm": "villus atrofisi + kript hiperplazisi + intraepitelyal lenfosit artisi",
    "TurkishName": "Villus atrofisi + kript hiperplazisi + intraepitelyal lenfosit artışı",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Villus atrofisi, kript hiperplazisi ve intraepitelyal lenfosit artışı Kronik ishal, malabsorpsiyon, demir eksikliği, glutenle ilişkili yakınmalar ve anti-doku transglutaminaz IgA pozitifliği çölyak hastalığını destekler.",
    "definition": "Villus atrofisi, kript hiperplazisi ve intraepitelyal lenfosit artışı Kronik ishal, malabsorpsiyon, demir eksikliği, glutenle ilişkili yakınmalar ve anti-doku transglutaminaz IgA pozitifliği çölyak hastalığını destekler.",
    "detailedExplanation": "Villus atrofisi, kript hiperplazisi ve intraepitelyal lenfosit artışı Kronik ishal, malabsorpsiyon, demir eksikliği, glutenle ilişkili yakınmalar ve anti-doku transglutaminaz IgA pozitifliği çölyak hastalığını destekler. Bu tabloda duodenum biyopsisinde villus atrofisi, kript hiperplazisi ve intraepitelyal lenfosit artışı beklenir.",
    "postAnswerExplanation": "Villus atrofisi, kript hiperplazisi ve intraepitelyal lenfosit artışı Kronik ishal, malabsorpsiyon, demir eksikliği, glutenle ilişkili yakınmalar ve anti-doku transglutaminaz IgA pozitifliği çölyak hastalığını destekler. Bu tabloda duodenum biyopsisinde villus atrofisi, kript hiperplazisi ve intraepitelyal lenfosit artışı beklenir.",
    "postAnswerExpandedExplanation": "Villus atrofisi, kript hiperplazisi ve intraepitelyal lenfosit artışı Kronik ishal, malabsorpsiyon, demir eksikliği, glutenle ilişkili yakınmalar ve anti-doku transglutaminaz IgA pozitifliği çölyak hastalığını destekler. Bu tabloda duodenum biyopsisinde villus atrofisi, kript hiperplazisi ve intraepitelyal lenfosit artışı beklenir.",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "safeNestedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Villus atrofisi + kript hiperplazisi + intraepitelyal lenfosit artışı",
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "sourceTextExamples": [
      "Villus atrofisi, kript hiperplazisi ve intraepitelyal lenfosit artışı",
      "Villus atrofisi, kript hiperplazisi ve intraepitelyal lenfosit artışı"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-wernicke-korsakoff-anatomisi",
    "term": "Wernicke-Korsakoff anatomisi",
    "aliases": [
      "Wernicke-Korsakoff anatomisi"
    ],
    "normalizedTerm": "wernicke-korsakoff anatomisi",
    "TurkishName": "Wernicke-Korsakoff anatomisi",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Tiamin eksikliği limbik bellek devrelerini etkiler ve Korsakoff sendromuna yol açabilir.",
    "definition": "Tiamin eksikliği limbik bellek devrelerini etkiler ve Korsakoff sendromuna yol açabilir.",
    "detailedExplanation": "Wernicke-Korsakoff anatomisi Tiamin eksikliği limbik bellek devrelerini etkiler ve Korsakoff sendromuna yol açabilir.",
    "postAnswerExplanation": "Wernicke-Korsakoff anatomisi Tiamin eksikliği limbik bellek devrelerini etkiler ve Korsakoff sendromuna yol açabilir.",
    "postAnswerExpandedExplanation": "Wernicke-Korsakoff anatomisi Tiamin eksikliği limbik bellek devrelerini etkiler ve Korsakoff sendromuna yol açabilir.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Wernicke-Korsakoff anatomisi"
    ],
    "sourceTextExamples": [
      "Wernicke-Korsakoff anatomisi",
      "Wernicke-Korsakoff anatomisi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-wilms-tumoru",
    "term": "Wilms tümörü",
    "aliases": [
      "Wilms tümörü"
    ],
    "normalizedTerm": "wilms tumoru",
    "TurkishName": "Wilms tümörü",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Wilms tümörü, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "Wilms tümörü, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "Wilms tümörü Ağrısız hematüri, renal kortikal solid kitle ve berrak sitoplazmalı hücrelerin ince vasküler ağla ayrılmış yuvalar oluşturması clear cell renal cell carcinoma için tipiktir. Bu tümör erişkinlerde en sık renal kortikal malignitelerden biridir ve sigara öyküsü risk faktörleri arasındadır.",
    "postAnswerExplanation": "Wilms tümörü Ağrısız hematüri, renal kortikal solid kitle ve berrak sitoplazmalı hücrelerin ince vasküler ağla ayrılmış yuvalar oluşturması clear cell renal cell carcinoma için tipiktir. Bu tümör erişkinlerde en sık renal kortikal malignitelerden biridir ve sigara öyküsü risk faktörleri arasındadır.",
    "postAnswerExpandedExplanation": "Wilms tümörü Ağrısız hematüri, renal kortikal solid kitle ve berrak sitoplazmalı hücrelerin ince vasküler ağla ayrılmış yuvalar oluşturması clear cell renal cell carcinoma için tipiktir. Bu tümör erişkinlerde en sık renal kortikal malignitelerden biridir ve sigara öyküsü risk faktörleri arasındadır.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Wilms tümörü"
    ],
    "sourceTextExamples": [
      "Wilms tümörü çocukluk çağının renal tümörüdür; bu erişkin hastanın histolojik paterni ve yaşı ile uyumlu değildir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 7,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-xla-dusuk-b-hucresi-ve-dusuk-immunoglobulin-paterni",
    "term": "XLA düşük B hücresi ve düşük immünoglobulin paterni",
    "aliases": [
      "XLA düşük B hücresi ve düşük immünoglobulin paterni"
    ],
    "normalizedTerm": "xla dusuk b hucresi ve dusuk immunoglobulin paterni",
    "TurkishName": "XLA düşük B hücresi ve düşük immünoglobulin paterni",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Tanısal test / karar eşiği",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Doğru eşleştirme BTK mutasyonu ile pre-B hücre maturasyon bloğudur.",
    "definition": "Doğru eşleştirme BTK mutasyonu ile pre-B hücre maturasyon bloğudur.",
    "detailedExplanation": "Doğru eşleştirme BTK mutasyonu ile pre-B hücre maturasyon bloğudur. IL2RG ağır kombine immün yetmezlik, WAS küçük trombositli ekzema-immün yetmezlik tablosu, AIRE otoimmün poliendokrinopati, CYBB ise kronik granülomatöz hastalık ile ilişkilidir. X’e bağlı agammaglobulinemi Bruton tirozin kinaz (BTK) mutasyonuna bağlıdır; pre-B hücre maturasyonu durur, periferik olgun B hücreleri ve tüm immünoglobulin düzeyleri...",
    "postAnswerExplanation": "Doğru eşleştirme BTK mutasyonu ile pre-B hücre maturasyon bloğudur. IL2RG ağır kombine immün yetmezlik, WAS küçük trombositli ekzema-immün yetmezlik tablosu, AIRE otoimmün poliendokrinopati, CYBB ise kronik granülomatöz hastalık ile ilişkilidir. X’e bağlı agammaglobulinemi Bruton tirozin kinaz (BTK) mutasyonuna bağlıdır; pre-B hücre maturasyonu durur, periferik olgun B hücreleri ve tüm immünoglobulin düzeyleri...",
    "postAnswerExpandedExplanation": "Doğru eşleştirme BTK mutasyonu ile pre-B hücre maturasyon bloğudur. IL2RG ağır kombine immün yetmezlik, WAS küçük trombositli ekzema-immün yetmezlik tablosu, AIRE otoimmün poliendokrinopati, CYBB ise kronik granülomatöz hastalık ile ilişkilidir. X’e bağlı agammaglobulinemi Bruton tirozin kinaz (BTK) mutasyonuna bağlıdır; pre-B hücre maturasyonu durur, periferik olgun B hücreleri ve tüm immünoglobulin düzeyleri...",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "XLA düşük B hücresi ve düşük immünoglobulin paterni"
    ],
    "sourceTextExamples": [
      "Doğru eşleştirme BTK mutasyonu ile pre-B hücre maturasyon bloğudur. IL2RG ağır kombine immün yetmezlik, WAS küçük trombositli ekzema-immün yetmezlik tablosu, AIRE otoimmün poliendokrinopati, CYBB ise kronik granülomatöz hastalık ile ilişkilidir.",
      "Doğru eşleştirme BTK mutasyonu ile pre-B hücre maturasyon bloğudur. IL2RG ağır kombine immün yetmezlik, WAS küçük trombositli ekzema-immün yetmezlik tablosu, AIRE otoimmün poliendokrinopati, CYBB ise kronik granülomatöz hastalık ile ilişkilidir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 4,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-yalanci-cok-katli-silli-prizmatik-epitel",
    "term": "Yalancı çok katlı silli prizmatik epitel",
    "aliases": [
      "Yalancı çok katlı silli prizmatik epitel"
    ],
    "normalizedTerm": "yalanci cok katli silli prizmatik epitel",
    "TurkishName": "Yalancı çok katlı silli prizmatik epitel",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "definition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "detailedExplanation": "Yalancı çok katlı silli prizmatik epitel ve goblet hücreleri izlendi. Nazal kavite ve iletici hava yollarının tipik epiteli yalancı çok katlı silli prizmatik epitel olup goblet hücreleri içerir. Bu yapı mukus üretimi ve mukosiliyer temizleme için özelleşmiştir ve respiratuvar epitel olarak adlandırılır.",
    "postAnswerExplanation": "Yalancı çok katlı silli prizmatik epitel ve goblet hücreleri izlendi. Nazal kavite ve iletici hava yollarının tipik epiteli yalancı çok katlı silli prizmatik epitel olup goblet hücreleri içerir. Bu yapı mukus üretimi ve mukosiliyer temizleme için özelleşmiştir ve respiratuvar epitel olarak adlandırılır.",
    "postAnswerExpandedExplanation": "Yalancı çok katlı silli prizmatik epitel ve goblet hücreleri izlendi. Nazal kavite ve iletici hava yollarının tipik epiteli yalancı çok katlı silli prizmatik epitel olup goblet hücreleri içerir. Bu yapı mukus üretimi ve mukosiliyer temizleme için özelleşmiştir ve respiratuvar epitel olarak adlandırılır.",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "safeNestedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Yalancı çok katlı silli prizmatik epitel",
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "sourceTextExamples": [
      "Yalancı çok katlı silli prizmatik epitel ve goblet hücreleri izlendi.",
      "Yalancı çok katlı silli prizmatik epitel ve goblet hücreleri izlendi."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 18,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-yuksek-duyarlilik-ve-yanlis-negatiflik-iliskisi",
    "term": "Yüksek duyarlılık ve yanlış negatiflik ilişkisi",
    "aliases": [
      "Yüksek duyarlılık ve yanlış negatiflik ilişkisi"
    ],
    "normalizedTerm": "yuksek duyarlilik ve yanlis negatiflik iliskisi",
    "TurkishName": "Yüksek duyarlılık ve yanlış negatiflik ilişkisi",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Duyarlılığı yüksek testte yanlış negatiflik azalır ve negatif sonuç hastalık olasılığını düşürür.",
    "definition": "Duyarlılığı yüksek testte yanlış negatiflik azalır ve negatif sonuç hastalık olasılığını düşürür.",
    "detailedExplanation": "Duyarlılığı yüksek testte yanlış negatiflik azalır ve negatif sonuç hastalık olasılığını düşürür. Pozitif sonucu kesinleştirme daha çok yüksek özgüllükle ilişkilidir; pozitif prediktif değer ise prevalanstan etkilenir ve duyarlılık artışı özgüllüğün zorunlu olarak artması anlamına gelmez. Yüksek duyarlılığa sahip test hastalığı olan kişileri yakalama kapasitesi yüksek olan testtir; bu nedenle negatif sonuç hastalığı...",
    "postAnswerExplanation": "Duyarlılığı yüksek testte yanlış negatiflik azalır ve negatif sonuç hastalık olasılığını düşürür. Pozitif sonucu kesinleştirme daha çok yüksek özgüllükle ilişkilidir; pozitif prediktif değer ise prevalanstan etkilenir ve duyarlılık artışı özgüllüğün zorunlu olarak artması anlamına gelmez. Yüksek duyarlılığa sahip test hastalığı olan kişileri yakalama kapasitesi yüksek olan testtir; bu nedenle negatif sonuç hastalığı...",
    "postAnswerExpandedExplanation": "Duyarlılığı yüksek testte yanlış negatiflik azalır ve negatif sonuç hastalık olasılığını düşürür. Pozitif sonucu kesinleştirme daha çok yüksek özgüllükle ilişkilidir; pozitif prediktif değer ise prevalanstan etkilenir ve duyarlılık artışı özgüllüğün zorunlu olarak artması anlamına gelmez. Yüksek duyarlılığa sahip test hastalığı olan kişileri yakalama kapasitesi yüksek olan testtir; bu nedenle negatif sonuç hastalığı...",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Yüksek duyarlılık ve yanlış negatiflik ilişkisi"
    ],
    "sourceTextExamples": [
      "Duyarlılığı yüksek testte yanlış negatiflik azalır ve negatif sonuç hastalık olasılığını düşürür.",
      "Duyarlılığı yüksek testte yanlış negatiflik azalır ve negatif sonuç hastalık olasılığını düşürür."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-yuz-venlerinde-kapakciklarin-olmamasi",
    "term": "Yüz venlerinde kapakçıkların olmaması",
    "aliases": [
      "Yüz venlerinde kapakçıkların olmaması"
    ],
    "normalizedTerm": "yuz venlerinde kapakciklarin olmamasi",
    "TurkishName": "Yüz venlerinde kapakçıkların olmaması",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Anatomik ilişki",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "definition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "detailedExplanation": "Yüz venlerinde kapakçıkların olmaması ve oftalmik venlerle bağlantı. Kapakçıksız venöz bağlantılar enfeksiyonun retrograd yayılımına izin verebilir.",
    "postAnswerExplanation": "Yüz venlerinde kapakçıkların olmaması ve oftalmik venlerle bağlantı. Kapakçıksız venöz bağlantılar enfeksiyonun retrograd yayılımına izin verebilir.",
    "postAnswerExpandedExplanation": "Yüz venlerinde kapakçıkların olmaması ve oftalmik venlerle bağlantı. Kapakçıksız venöz bağlantılar enfeksiyonun retrograd yayılımına izin verebilir.",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "safeNestedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Yüz venlerinde kapakçıkların olmaması",
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "sourceTextExamples": [
      "Yüz venlerinde kapakçıkların olmaması ve oftalmik venlerle bağlantı.",
      "Yüz venlerinde kapakçıkların olmaması ve oftalmik venlerle bağlantı."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 2,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-ust-gastrointestinal-kontrastli-grafi",
    "term": "Üst gastrointestinal kontrastlı grafi",
    "aliases": [
      "Üst gastrointestinal kontrastlı grafi"
    ],
    "normalizedTerm": "ust gastrointestinal kontrastli grafi",
    "TurkishName": "Üst gastrointestinal kontrastlı grafi",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Tanısal test / karar eşiği",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Yenidoğanda safralı kusma ve üst gastrointestinal grafide duodenojejunal bileşkenin anormal yerleşimi midgut malrotasyonunu düşündürür.",
    "definition": "Yenidoğanda safralı kusma ve üst gastrointestinal grafide duodenojejunal bileşkenin anormal yerleşimi midgut malrotasyonunu düşündürür.",
    "detailedExplanation": "Üst gastrointestinal kontrastlı grafi Yenidoğanda safralı kusma ve üst gastrointestinal grafide duodenojejunal bileşkenin anormal yerleşimi midgut malrotasyonunu düşündürür. Normalde midgut fizyolojik herniasyon sırasında ve karın boşluğuna dönerken superior mezenterik arter etrafında toplam 270 derece saat yönünün tersine rotasyon yapar; bu süreç tamamlanmazsa volvulus riski gelişir.",
    "postAnswerExplanation": "Üst gastrointestinal kontrastlı grafi Yenidoğanda safralı kusma ve üst gastrointestinal grafide duodenojejunal bileşkenin anormal yerleşimi midgut malrotasyonunu düşündürür. Normalde midgut fizyolojik herniasyon sırasında ve karın boşluğuna dönerken superior mezenterik arter etrafında toplam 270 derece saat yönünün tersine rotasyon yapar; bu süreç tamamlanmazsa volvulus riski gelişir.",
    "postAnswerExpandedExplanation": "Üst gastrointestinal kontrastlı grafi Yenidoğanda safralı kusma ve üst gastrointestinal grafide duodenojejunal bileşkenin anormal yerleşimi midgut malrotasyonunu düşündürür. Normalde midgut fizyolojik herniasyon sırasında ve karın boşluğuna dönerken superior mezenterik arter etrafında toplam 270 derece saat yönünün tersine rotasyon yapar; bu süreç tamamlanmazsa volvulus riski gelişir.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "gastroenterology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Üst gastrointestinal kontrastlı grafi"
    ],
    "sourceTextExamples": [
      "Üst gastrointestinal kontrastlı grafi",
      "Üst gastrointestinal kontrastlı grafi"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 6,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-ucuncu-ve-dorduncu-faringeal-poslar",
    "term": "Üçüncü ve dördüncü faringeal poşlar",
    "aliases": [
      "Üçüncü ve dördüncü faringeal poşlar"
    ],
    "normalizedTerm": "ucuncu ve dorduncu faringeal poslar",
    "TurkishName": "Üçüncü ve dördüncü faringeal poşlar",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "ın gelişememesi Beslenmeyle öksürük ve siyanoz, ağızda köpüklü sekresyon, nazogastrik sondanın ilerlememesi ve batında gaz bulunması özofagus atrezisi ile distal trakeoözofageal fistülü düşündürür.",
    "definition": "ın gelişememesi Beslenmeyle öksürük ve siyanoz, ağızda köpüklü sekresyon, nazogastrik sondanın ilerlememesi ve batında gaz bulunması özofagus atrezisi ile distal trakeoözofageal fistülü düşündürür.",
    "detailedExplanation": "Üçüncü ve dördüncü faringeal poşların gelişememesi Beslenmeyle öksürük ve siyanoz, ağızda köpüklü sekresyon, nazogastrik sondanın ilerlememesi ve batında gaz bulunması özofagus atrezisi ile distal trakeoözofageal fistülü düşündürür. Bu anomalinin temelinde ön bağırsağın ventral respiratuvar divertikül ve dorsal özofagus olarak ayrılmasındaki trakeoözofageal septasyon kusuru yer alır.",
    "postAnswerExplanation": "Üçüncü ve dördüncü faringeal poşların gelişememesi Beslenmeyle öksürük ve siyanoz, ağızda köpüklü sekresyon, nazogastrik sondanın ilerlememesi ve batında gaz bulunması özofagus atrezisi ile distal trakeoözofageal fistülü düşündürür. Bu anomalinin temelinde ön bağırsağın ventral respiratuvar divertikül ve dorsal özofagus olarak ayrılmasındaki trakeoözofageal septasyon kusuru yer alır.",
    "postAnswerExpandedExplanation": "Üçüncü ve dördüncü faringeal poşların gelişememesi Beslenmeyle öksürük ve siyanoz, ağızda köpüklü sekresyon, nazogastrik sondanın ilerlememesi ve batında gaz bulunması özofagus atrezisi ile distal trakeoözofageal fistülü düşündürür. Bu anomalinin temelinde ön bağırsağın ventral respiratuvar divertikül ve dorsal özofagus olarak ayrılmasındaki trakeoözofageal septasyon kusuru yer alır.",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "safeNestedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Üçüncü ve dördüncü faringeal poşlar",
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "sourceTextExamples": [
      "Üçüncü ve dördüncü faringeal poşların gelişememesi",
      "Hipokalsemi, T hücre azlığı, tekrarlayan enfeksiyon, konotrunkal kalp anomalisi ve yüz bulguları DiGeorge sendromunu düşündürür. Temel embriyolojik sorun üçüncü ve dördüncü faringeal poşların gelişim kusurudur; timus ve paratiroid hipoplazisi gelişir."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 7,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-idarucizumab",
    "term": "İdarucizumab",
    "aliases": [
      "İdarucizumab"
    ],
    "normalizedTerm": "idarucizumab",
    "TurkishName": "İdarucizumab",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "Dabigatran direkt trombin inhibitörüdür; idarucizumab ilacı bağlayarak etkisini nötralize eder.",
    "definition": "Dabigatran direkt trombin inhibitörüdür; idarucizumab ilacı bağlayarak etkisini nötralize eder.",
    "detailedExplanation": "İdarucizumab. Dabigatran direkt trombin inhibitörüdür; idarucizumab ilacı bağlayarak etkisini nötralize eder.",
    "postAnswerExplanation": "İdarucizumab. Dabigatran direkt trombin inhibitörüdür; idarucizumab ilacı bağlayarak etkisini nötralize eder.",
    "postAnswerExpandedExplanation": "İdarucizumab. Dabigatran direkt trombin inhibitörüdür; idarucizumab ilacı bağlayarak etkisini nötralize eder.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "İdarucizumab"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 2,
      "confidenceScore": "medium",
      "ambiguityRisk": "medium",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-inferior-mezenterik-arter-alani",
    "term": "İnferior mezenterik arter alanı",
    "aliases": [
      "İnferior mezenterik arter alanı"
    ],
    "normalizedTerm": "inferior mezenterik arter alani",
    "TurkishName": "İnferior mezenterik arter alanı",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Anatomik ilişki",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "İnferior mezenterik arter hindgut türevlerini besler.",
    "definition": "İnferior mezenterik arter hindgut türevlerini besler.",
    "detailedExplanation": "İnferior mezenterik arter alanı İnferior mezenterik arter hindgut türevlerini besler.",
    "postAnswerExplanation": "İnferior mezenterik arter alanı İnferior mezenterik arter hindgut türevlerini besler.",
    "postAnswerExpandedExplanation": "İnferior mezenterik arter alanı İnferior mezenterik arter hindgut türevlerini besler.",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "safeNestedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "İnferior mezenterik arter alanı",
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "sourceTextExamples": [
      "İnferior mezenterik arter alanı",
      "İnferior mezenterik arter alanı"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-insulin-ve-potasyum-kaymasi",
    "term": "İnsülin ve potasyum kayması",
    "aliases": [
      "İnsülin ve potasyum kayması"
    ],
    "normalizedTerm": "insulin ve potasyum kaymasi",
    "TurkishName": "İnsülin ve potasyum kayması",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "İnsülin Na/K-ATPaz aktivitesini artırır ve potasyumun hücre içine girmesini kolaylaştırır.",
    "definition": "İnsülin Na/K-ATPaz aktivitesini artırır ve potasyumun hücre içine girmesini kolaylaştırır.",
    "detailedExplanation": "İnsülin ve potasyum kayması İnsülin Na/K-ATPaz aktivitesini artırır ve potasyumun hücre içine girmesini kolaylaştırır.",
    "postAnswerExplanation": "İnsülin ve potasyum kayması İnsülin Na/K-ATPaz aktivitesini artırır ve potasyumun hücre içine girmesini kolaylaştırır.",
    "postAnswerExpandedExplanation": "İnsülin ve potasyum kayması İnsülin Na/K-ATPaz aktivitesini artırır ve potasyumun hücre içine girmesini kolaylaştırır.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [
      "potasyum"
    ],
    "safeNestedTerms": [
      "potasyum"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "İnsülin ve potasyum kayması",
      "potasyum"
    ],
    "sourceTextExamples": [
      "İnsülin ve potasyum kayması",
      "Bu hastada ağır potasyum yüksekliğiyle birlikte EKG değişiklikleri vardır. İlk amaç serum potasyumunu hemen düşürmekten önce miyokard hücre membranını stabilize etmektir; bu nedenle ilk tedavi intravenöz kalsiyum glukonattır."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-intraepidermal-akantoliz",
    "term": "İntraepidermal akantoliz",
    "aliases": [
      "İntraepidermal akantoliz"
    ],
    "normalizedTerm": "intraepidermal akantoliz",
    "TurkishName": "İntraepidermal akantoliz",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "İntraepidermal akantoliz, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "İntraepidermal akantoliz, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "Suprabazal akantoliz ve intraepidermal bül oluşumu izlendi. Ağrılı oral erozyonlar, gevşek büller, pozitif epidermal ayrılma bulgusu, suprabazal akantoliz ve hücreler arası IgG birikimi pemfigus vulgaris ile uyumludur. Bu hastalıkta otoantikorlar desmozomal adezyon proteinlerinden özellikle desmoglein 3’e yönelir.",
    "postAnswerExplanation": "Suprabazal akantoliz ve intraepidermal bül oluşumu izlendi. Ağrılı oral erozyonlar, gevşek büller, pozitif epidermal ayrılma bulgusu, suprabazal akantoliz ve hücreler arası IgG birikimi pemfigus vulgaris ile uyumludur. Bu hastalıkta otoantikorlar desmozomal adezyon proteinlerinden özellikle desmoglein 3’e yönelir.",
    "postAnswerExpandedExplanation": "Suprabazal akantoliz ve intraepidermal bül oluşumu izlendi. Ağrılı oral erozyonlar, gevşek büller, pozitif epidermal ayrılma bulgusu, suprabazal akantoliz ve hücreler arası IgG birikimi pemfigus vulgaris ile uyumludur. Bu hastalıkta otoantikorlar desmozomal adezyon proteinlerinden özellikle desmoglein 3’e yönelir.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "İntraepidermal akantoliz"
    ],
    "sourceTextExamples": [
      "Suprabazal akantoliz ve intraepidermal bül oluşumu izlendi.",
      "Suprabazal akantoliz ve intraepidermal bül oluşumu izlendi."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-intravenoz-klindamisin-ve-gentamisin",
    "term": "İntravenöz klindamisin ve gentamisin",
    "aliases": [
      "İntravenöz klindamisin ve gentamisin"
    ],
    "normalizedTerm": "intravenoz klindamisin ve gentamisin",
    "TurkishName": "İntravenöz klindamisin ve gentamisin",
    "EnglishName": "",
    "category": "Anatomi / Histoloji / Embriyoloji",
    "subcategory": "Anatomik ilişki",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Anatomik lokalizasyon veya yapı-komşuluk ilişkisini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "Sezaryen, uzamış membran rüptürü, postpartum ateş, uterin hassasiyet ve kötü kokulu loşi postpartum endometriti düşündürür.",
    "definition": "Sezaryen, uzamış membran rüptürü, postpartum ateş, uterin hassasiyet ve kötü kokulu loşi postpartum endometriti düşündürür.",
    "detailedExplanation": "İntravenöz klindamisin ve gentamisin Sezaryen, uzamış membran rüptürü, postpartum ateş, uterin hassasiyet ve kötü kokulu loşi postpartum endometriti düşündürür. Tedavide polimikrobiyal aerob-anaerob florayı kapsayan intravenöz geniş spektrumlu antibiyotik gerekir; klasik başlangıç rejimi klindamisin ve gentamisindir.",
    "postAnswerExplanation": "İntravenöz klindamisin ve gentamisin Sezaryen, uzamış membran rüptürü, postpartum ateş, uterin hassasiyet ve kötü kokulu loşi postpartum endometriti düşündürür. Tedavide polimikrobiyal aerob-anaerob florayı kapsayan intravenöz geniş spektrumlu antibiyotik gerekir; klasik başlangıç rejimi klindamisin ve gentamisindir.",
    "postAnswerExpandedExplanation": "İntravenöz klindamisin ve gentamisin Sezaryen, uzamış membran rüptürü, postpartum ateş, uterin hassasiyet ve kötü kokulu loşi postpartum endometriti düşündürür. Tedavide polimikrobiyal aerob-anaerob florayı kapsayan intravenöz geniş spektrumlu antibiyotik gerekir; klasik başlangıç rejimi klindamisin ve gentamisindir.",
    "tusPearl": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "differentialPoint": "Benzer anatomik yapılardan ayırıcı nokta, etkilediği organ alanı veya yaralanınca verdiği klinik bulgudur.",
    "clinicalRelevance": "Anatomi sorularında terimi yalnız ezberleme; hasar bulgusu, damar/sinir komşuluğu ve cerrahi risk ile birlikte düşün.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "safeNestedTerms": [
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "İntravenöz klindamisin ve gentamisin",
      "anatomik komşuluk",
      "klinik hasar paterni"
    ],
    "sourceTextExamples": [
      "İntravenöz klindamisin ve gentamisin",
      "İntravenöz klindamisin ve gentamisin"
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 7,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addAsAlias",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve anatomi / histoloji / embriyoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-invaziv-duktal-karsinom",
    "term": "İnvaziv duktal karsinom",
    "aliases": [
      "İnvaziv duktal karsinom"
    ],
    "normalizedTerm": "invaziv duktal karsinom",
    "TurkishName": "İnvaziv duktal karsinom",
    "EnglishName": "",
    "category": "Patoloji / Hematoloji / Onkoloji",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Hücre, doku, immün birikim veya malignite paternini ifade eden güvenli bir kavramdır.",
    "shortDefinition": "İnvaziv duktal karsinom, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "definition": "İnvaziv duktal karsinom, histolojik/laboratuvar patern ile hastalık eşleştirmesini öğreten patoloji-hematoloji kavramıdır.",
    "detailedExplanation": "İnvaziv duktal karsinom saptandı. Erken evre ve klinik nod negatif meme kanserinde aksiller evreleme için sentinel lenf nodu biyopsisi tercih edilir. Böylece gereksiz aksiller diseksiyonun lenfödem gibi morbiditeleri azaltılabilir.",
    "postAnswerExplanation": "İnvaziv duktal karsinom saptandı. Erken evre ve klinik nod negatif meme kanserinde aksiller evreleme için sentinel lenf nodu biyopsisi tercih edilir. Böylece gereksiz aksiller diseksiyonun lenfödem gibi morbiditeleri azaltılabilir.",
    "postAnswerExpandedExplanation": "İnvaziv duktal karsinom saptandı. Erken evre ve klinik nod negatif meme kanserinde aksiller evreleme için sentinel lenf nodu biyopsisi tercih edilir. Böylece gereksiz aksiller diseksiyonun lenfödem gibi morbiditeleri azaltılabilir.",
    "tusPearl": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "differentialPoint": "Benzer hastalıklardan ayrım, hücre tipi, boyanma paterni, genetik değişiklik veya eşlik eden klinik bulgudur.",
    "clinicalRelevance": "Patoloji sorusunda morfoloji + immünfenotip + klinik bağlam birlikte okunmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "oncology"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "İnvaziv duktal karsinom"
    ],
    "sourceTextExamples": [
      "İnvaziv duktal karsinom saptandı.",
      "İnvaziv duktal karsinom saptandı."
    ],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 5,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Klinik Branş Seç / TUS Spot Olgular içinde geçiyor ve patoloji / hematoloji / onkoloji bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  },
  {
    "id": "v330-ultradeep-batch5-6-izoniazid-ve-b6",
    "term": "İzoniazid ve B6",
    "aliases": [
      "İzoniazid ve B6"
    ],
    "normalizedTerm": "izoniazid ve b6",
    "TurkishName": "İzoniazid ve B6",
    "EnglishName": "",
    "category": "TUS Klinik Pattern / Karma",
    "subcategory": "Klinik pattern",
    "sourceLayer": "V330 ultra-deep glossary batch 5 + foundation batch 6",
    "previewDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "preAnswerSafeDefinition": "Klinik karar veya ayırıcı tanı bağlamında kullanılan güvenli bir kavramdır.",
    "shortDefinition": "İzoniazid B6 metabolizmasını etkileyerek nöropati riskini artırır.",
    "definition": "İzoniazid B6 metabolizmasını etkileyerek nöropati riskini artırır.",
    "detailedExplanation": "İzoniazid ve B6 İzoniazid B6 metabolizmasını etkileyerek nöropati riskini artırır.",
    "postAnswerExplanation": "İzoniazid ve B6 İzoniazid B6 metabolizmasını etkileyerek nöropati riskini artırır.",
    "postAnswerExpandedExplanation": "İzoniazid ve B6 İzoniazid B6 metabolizmasını etkileyerek nöropati riskini artırır.",
    "tusPearl": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "differentialPoint": "Ayırıcı nokta, aynı bulguyu yapan alternatif nedenlerden hangi ek ipucuyla ayrıldığıdır.",
    "clinicalRelevance": "Bu terimde amaç kelimeyi değil; hangi bulgu ile hangi kararın bağlandığını hatırlamaktır.",
    "mechanism": "",
    "relatedBranches": [
      "general-medicine"
    ],
    "relatedTerms": [],
    "safeNestedTerms": [],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "İzoniazid ve B6"
    ],
    "sourceTextExamples": [],
    "sourceCandidate": {
      "sourceBatch": "batch5-ultradeep",
      "occurrenceCount": 1,
      "confidenceScore": "medium",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusPearlCards.js",
      "reasonForRecommendation": "Önceki raporlarda exact aday olarak bulunmadı; V317 metinlerinde Hap Kartlar / Kataloglarım içinde geçiyor ve tus klinik pattern / karma bağlamında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar.",
      "droppedAliases": []
    }
  }
];
