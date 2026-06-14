// V293 — Glossary Candidate Audit integration layer.
// Source: glossary-candidate-audit-v2-teaching.json. Candidates were filtered; noisy/ambiguous items were not blindly imported.
export const TUS_GLOSSARY_CANDIDATE_AUDIT_TERMS = [
  {
    "id": "candidate-audit-v293-adrenal-yetmezligi",
    "canonicalTerm": "Adrenal Yetmezliği",
    "displayTerm": "Adrenal Yetmezliği",
    "term": "Adrenal Yetmezliği",
    "aliases": [
      "Adrenal Yetmezliği",
      "primer adrenal yetmezlik",
      "Addison hastalığı",
      "adrenal insufficiency"
    ],
    "category": "Hastalık / endokrinoloji",
    "subcategory": "Hastalık / endokrinoloji",
    "shortDefinition": "Adrenal korteks hormonlarının yetersizliğiyle kortizol eksikliği ve stres yanıtı bozulması oluşturan klinik tablodur.",
    "preAnswerSafeDefinition": "Adrenal hormon üretimi ve stres yanıtıyla ilişkili endokrin yetmezlik kavramıdır.",
    "postAnswerExplanation": "Primer adrenal yetmezlikte kortizol düşer, ACTH artar; aldosteron eksikliği hiponatremi, hiperkalemi ve ortostatik hipotansiyon yapabilir.",
    "tusPearl": "Hiperpigmentasyon + hiponatremi + hiperkalemi + düşük kortizol/yüksek ACTH primer adrenal yetmezliği düşündürür.",
    "differentialPoint": "Sekonder adrenal yetmezlikte ACTH yetersizdir; hiperpigmentasyon ve belirgin hiperkalemi daha az beklenir.",
    "clinicalContext": "Primer adrenal yetmezlikte kortizol düşer, ACTH artar; aldosteron eksikliği hiponatremi, hiperkalemi ve ortostatik hipotansiyon yapabilir.",
    "mechanism": "",
    "relatedTerms": [
      "Primer adrenal yetmezlik",
      "Kortizol eksikliği",
      "ACTH",
      "Hiponatremi",
      "Hiperkalemi"
    ],
    "safeNestedTerms": [
      "Primer adrenal yetmezlik",
      "Kortizol eksikliği",
      "ACTH",
      "Hiponatremi",
      "Hiperkalemi"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 260,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "high",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Halsizlik, kilo kaybı, ortostatik yakınmalar, tuz isteği, hiperpigmentasyon, hiponatremi, hiperkalemi, düşük kortizol ve yüksek ACTH primer adrenal yetmezliği destekler. Primer düzeyde adrenal korteks yetersiz olduğun...",
      "Düşük kortizol, yüksek ACTH, hiponatremi, hiperkalemi, ortostatik hipotansiyon ve tuz isteği primer adrenal yetmezliği düşündürür. Kortizol eksikliği negatif geri bildirimi azaltır ve ACTH ile aynı öncül olan proopiom..."
    ],
    "candidateAudit": {
      "candidateTerm": "Adrenal Yetmezliği",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 15,
      "sourceArea": "Klinik Branş Seç, TUS Spot Olgular, Klinik Branş Seç / TUS Spot Olgular",
      "sourceFilePath": "src/data/cases.js, src/data/tusGlossaryCaseDerivedIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-primer-adrenal-yetmezlik",
    "canonicalTerm": "Primer Adrenal Yetmezlik",
    "displayTerm": "Primer Adrenal Yetmezlik",
    "term": "Primer Adrenal Yetmezlik",
    "aliases": [
      "Primer Adrenal Yetmezlik",
      "primer adrenal yetmezliği",
      "Addison hastalığı"
    ],
    "category": "Hastalık / endokrinoloji",
    "subcategory": "Hastalık / endokrinoloji",
    "shortDefinition": "Adrenal bez düzeyindeki yetersizlik nedeniyle kortizol ve sıklıkla aldosteron eksikliğinin geliştiği adrenal yetmezlik tipidir.",
    "preAnswerSafeDefinition": "Adrenal bez kaynaklı hormon üretim bozukluğunu ifade eden endokrin klinik tablodur.",
    "postAnswerExplanation": "ACTH yüksekliği ve hiperpigmentasyon primer düzeyi; hiperkalemi ve tuz isteği mineralokortikoid eksikliğini destekler.",
    "tusPearl": "Primer adrenal yetmezlikte ACTH yüksekliği ve hiperpigmentasyon beklenir.",
    "differentialPoint": "Sekonder yetmezlikte aldosteron genellikle korunur; hiperkalemi daha az belirgindir.",
    "clinicalContext": "ACTH yüksekliği ve hiperpigmentasyon primer düzeyi; hiperkalemi ve tuz isteği mineralokortikoid eksikliğini destekler.",
    "mechanism": "",
    "relatedTerms": [
      "Adrenal Yetmezliği",
      "ACTH",
      "Aldosteron",
      "Hiperkalemi"
    ],
    "safeNestedTerms": [
      "Adrenal Yetmezliği",
      "ACTH",
      "Aldosteron",
      "Hiperkalemi"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 275,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Primer Adrenal Yetmezlik"
    ],
    "candidateAudit": {
      "candidateTerm": "Primer Adrenal Yetmezlik",
      "recommendation": "manual-curated-from-audit",
      "confidenceScore": "manual",
      "occurrenceCount": 0,
      "sourceArea": "Glossary Candidate Audit",
      "sourceFilePath": ""
    }
  },
  {
    "id": "candidate-audit-v293-sekonder-adrenal-yetmezlik",
    "canonicalTerm": "Sekonder Adrenal Yetmezlik",
    "displayTerm": "Sekonder Adrenal Yetmezlik",
    "term": "Sekonder Adrenal Yetmezlik",
    "aliases": [
      "Sekonder Adrenal Yetmezlik",
      "sekonder adrenal yetmezliği"
    ],
    "category": "Hastalık / endokrinoloji",
    "subcategory": "Hastalık / endokrinoloji",
    "shortDefinition": "Hipofiz veya hipotalamus kaynaklı ACTH uyarısının azalmasıyla kortizol üretiminin düşmesidir.",
    "preAnswerSafeDefinition": "ACTH uyarısı ve kortizol üretimi arasındaki aks bozukluğunu anlatan endokrin yetmezlik kavramıdır.",
    "postAnswerExplanation": "ACTH düşük veya uygunsuz normaldir; aldosteron çoğunlukla korunduğu için hiperkalemi ve hiperpigmentasyon primer yetmezliğe göre daha azdır.",
    "tusPearl": "ACTH düşük/yetersiz + hiperpigmentasyon yokluğu sekonder adrenal yetmezliği destekler.",
    "differentialPoint": "Primer yetmezlikte ACTH yüksektir; sekonderde ACTH yetersizdir.",
    "clinicalContext": "ACTH düşük veya uygunsuz normaldir; aldosteron çoğunlukla korunduğu için hiperkalemi ve hiperpigmentasyon primer yetmezliğe göre daha azdır.",
    "mechanism": "",
    "relatedTerms": [
      "Adrenal Yetmezliği",
      "ACTH",
      "Kortizol eksikliği"
    ],
    "safeNestedTerms": [
      "Adrenal Yetmezliği",
      "ACTH",
      "Kortizol eksikliği"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 240,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Sekonder Adrenal Yetmezlik"
    ],
    "candidateAudit": {
      "candidateTerm": "Sekonder Adrenal Yetmezlik",
      "recommendation": "manual-curated-from-audit",
      "confidenceScore": "manual",
      "occurrenceCount": 0,
      "sourceArea": "Glossary Candidate Audit",
      "sourceFilePath": ""
    }
  },
  {
    "id": "candidate-audit-v293-kortizol-eksikligi",
    "canonicalTerm": "Kortizol eksikliği",
    "displayTerm": "Kortizol eksikliği",
    "term": "Kortizol eksikliği",
    "aliases": [
      "Kortizol eksikliği",
      "düşük kortizol"
    ],
    "category": "Laboratuvar / endokrinoloji",
    "subcategory": "Laboratuvar / endokrinoloji",
    "shortDefinition": "Glukokortikoid etkilerin azalmasıyla stres yanıtı, glukoz homeostazı ve damar tonusunun bozulmasıdır.",
    "preAnswerSafeDefinition": "Kortizol düzeyi ve stres yanıtıyla ilişkili hormonal eksiklik kavramıdır.",
    "postAnswerExplanation": "Adrenal yetmezlikte halsizlik, hipotansiyon, hipoglisemi ve stres durumunda adrenal kriz riski oluşturabilir.",
    "tusPearl": "Adrenal kriz şüphesinde kortizol eksikliği klinik olarak acil önem taşır.",
    "differentialPoint": "Aldosteron eksikliği özellikle hiperkalemi ve tuz kaybıyla ayrılır.",
    "clinicalContext": "Adrenal yetmezlikte halsizlik, hipotansiyon, hipoglisemi ve stres durumunda adrenal kriz riski oluşturabilir.",
    "mechanism": "",
    "relatedTerms": [
      "Adrenal Yetmezliği",
      "ACTH",
      "Hipoglisemi"
    ],
    "safeNestedTerms": [
      "Adrenal Yetmezliği",
      "ACTH",
      "Hipoglisemi"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 230,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Kortizol eksikliğinin metabolik etkisini destekler.",
      "Düşük kortizol, yüksek ACTH, hiponatremi, hiperkalemi, ortostatik hipotansiyon ve tuz isteği primer adrenal yetmezliği düşündürür. Kortizol eksikliği negatif geri bildirimi azaltır ve ACTH ile aynı öncül olan proopiom..."
    ],
    "candidateAudit": {
      "candidateTerm": "Kortizol Eksikliği",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 14,
      "sourceArea": "Klinik Branş Seç, TUS Spot Olgular, Glossary data / tooltip",
      "sourceFilePath": "src/data/cases.js, src/data/tusGlossaryExpandedIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-karaciger-yetmezligi",
    "canonicalTerm": "Karaciğer Yetmezliği",
    "displayTerm": "Karaciğer Yetmezliği",
    "term": "Karaciğer Yetmezliği",
    "aliases": [
      "Karaciğer Yetmezliği",
      "hepatik yetmezlik",
      "acute liver failure",
      "liver failure"
    ],
    "category": "Hastalık / hepatoloji",
    "subcategory": "Hastalık / hepatoloji",
    "shortDefinition": "Karaciğerin sentetik, metabolik ve detoksifikasyon fonksiyonlarının bozulmasıyla gelişen ciddi klinik tablodur.",
    "preAnswerSafeDefinition": "Karaciğer sentez ve detoksifikasyon görevlerinin bozulmasını ifade eden klinik kavramdır.",
    "postAnswerExplanation": "PT/INR uzaması sentez fonksiyon kaybını, ensefalopati detoksifikasyon bozukluğunu gösterir; yenidoğanda metabolik hastalıklar da neden olabilir.",
    "tusPearl": "PT/INR karaciğer yetmezliğinde transaminazdan daha doğrudan fonksiyon göstergesidir.",
    "differentialPoint": "Hepatit hasarı gösterir; karaciğer yetmezliği fonksiyon kaybını ifade eder.",
    "clinicalContext": "PT/INR uzaması sentez fonksiyon kaybını, ensefalopati detoksifikasyon bozukluğunu gösterir; yenidoğanda metabolik hastalıklar da neden olabilir.",
    "mechanism": "",
    "relatedTerms": [
      "Koagülopati",
      "Hepatik ensefalopati",
      "Bilirubin",
      "Albumin"
    ],
    "safeNestedTerms": [
      "Koagülopati",
      "Hepatik ensefalopati",
      "Bilirubin",
      "Albumin"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 255,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "low",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Galactose-1-phosphate uridyltransferase eksikliği klasik galaktozemiye yol açar; yenidoğan döneminde karaciğer yetmezliği, katarakt ve beslenme intoleransı beklenir.",
      "Klasik galaktozemide erken dönemde laktoz kesilmezse karaciğer yetmezliği, katarakt ve sepsis riski gelişebilir."
    ],
    "candidateAudit": {
      "candidateTerm": "Karaciğer Yetmezliği",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 12,
      "sourceArea": "Glossary data / tooltip, Klinik Branş Seç, Klinik Branş Seç / TUS Spot Olgular",
      "sourceFilePath": "src/data/cases.js, src/data/tusGlossaryContentCoverageIndex.js, src/data/tusGlossaryExpandedIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-pankreatik-ekzokrin-yetmezlik",
    "canonicalTerm": "Pankreatik Ekzokrin Yetmezlik",
    "displayTerm": "Pankreatik Ekzokrin Yetmezlik",
    "term": "Pankreatik Ekzokrin Yetmezlik",
    "aliases": [
      "Pankreatik Ekzokrin Yetmezlik",
      "pankreatik ekzokrin yetmezliği",
      "ekzokrin yetmezliği",
      "pankreas yetmezliği"
    ],
    "category": "Hastalık / gastroenteroloji",
    "subcategory": "Hastalık / gastroenteroloji",
    "shortDefinition": "Pankreasın sindirim enzimlerini yeterli salgılayamamasıyla yağ malabsorpsiyonu ve steatore oluşturan tablodur.",
    "preAnswerSafeDefinition": "Pankreatik sindirim enzimi üretimi veya salınımıyla ilişkili yetersizlik kavramıdır.",
    "postAnswerExplanation": "Kistik fibrozis veya kronik pankreatitte yağlı dışkı, kilo alamama ve yağda eriyen vitamin eksiklikleriyle birliktedir.",
    "tusPearl": "Tekrarlayan akciğer enfeksiyonu + steatore + yüksek ter klorürü kistik fibrozis bağlamında önemlidir.",
    "differentialPoint": "Endokrin pankreas yetmezliği glukoz metabolizmasını; ekzokrin yetmezlik sindirimi etkiler.",
    "clinicalContext": "Kistik fibrozis veya kronik pankreatitte yağlı dışkı, kilo alamama ve yağda eriyen vitamin eksiklikleriyle birliktedir.",
    "mechanism": "",
    "relatedTerms": [
      "Kistik fibrozis",
      "Steatore",
      "Ter klorürü",
      "Malabsorpsiyon"
    ],
    "safeNestedTerms": [
      "Kistik fibrozis",
      "Steatore",
      "Ter klorürü",
      "Malabsorpsiyon"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 250,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Pankreatik Ekzokrin Yetmezlik"
    ],
    "candidateAudit": {
      "candidateTerm": "Pankreatik Ekzokrin Yetmezlik",
      "recommendation": "manual-curated-from-audit",
      "confidenceScore": "manual",
      "occurrenceCount": 0,
      "sourceArea": "Glossary Candidate Audit",
      "sourceFilePath": ""
    }
  },
  {
    "id": "candidate-audit-v293-prematur-over-yetmezligi",
    "canonicalTerm": "Prematür Over Yetmezliği",
    "displayTerm": "Prematür Over Yetmezliği",
    "term": "Prematür Over Yetmezliği",
    "aliases": [
      "Prematür Over Yetmezliği",
      "primer over yetmezliği",
      "over yetmezliği",
      "premature ovarian insufficiency"
    ],
    "category": "Hastalık / kadın doğum",
    "subcategory": "Hastalık / kadın doğum",
    "shortDefinition": "Over fonksiyonlarının 40 yaşından önce azalmasıyla amenore, östrojen eksikliği ve FSH yüksekliği oluşturan tablodur.",
    "preAnswerSafeDefinition": "Erken yaşta over fonksiyon kaybı ve gonadotropin yanıtıyla ilişkili klinik kavramdır.",
    "postAnswerExplanation": "Primer amenore/sekonder amenore, infertilite ve hipoöstrojenizm bulgularıyla gelebilir; Turner sendromu ve otoimmün nedenler ayırıcı tanıdadır.",
    "tusPearl": "Amenore + FSH yüksekliği over kaynaklı yetmezliği destekler.",
    "differentialPoint": "Hipotalamik amenorede FSH/LH düşük veya uygunsuz normal olabilir.",
    "clinicalContext": "Primer amenore/sekonder amenore, infertilite ve hipoöstrojenizm bulgularıyla gelebilir; Turner sendromu ve otoimmün nedenler ayırıcı tanıdadır.",
    "mechanism": "",
    "relatedTerms": [
      "Amenore",
      "FSH",
      "Streak gonad",
      "Turner sendromu"
    ],
    "safeNestedTerms": [
      "Amenore",
      "FSH",
      "Streak gonad",
      "Turner sendromu"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 245,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "high",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Prematür over yetmezliği.",
      "Prematür over yetmezliği, amenore ve FSH yüksek birlikte görüldüğünde öncelikli ilişki Prematür over yetmezliği yönündedir."
    ],
    "candidateAudit": {
      "candidateTerm": "Prematür Over Yetmezliği",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 5,
      "sourceArea": "Hap Kartlar / Kataloglarım",
      "sourceFilePath": "src/data/tusPearlCards.js"
    }
  },
  {
    "id": "candidate-audit-v293-pankreas-yetmezligi",
    "canonicalTerm": "Pankreas Yetmezliği",
    "displayTerm": "Pankreas Yetmezliği",
    "term": "Pankreas Yetmezliği",
    "aliases": [
      "Pankreas Yetmezliği"
    ],
    "category": "Hastalık / gastroenteroloji",
    "subcategory": "Hastalık / gastroenteroloji",
    "shortDefinition": "Pankreasın ekzokrin sindirim veya endokrin metabolik işlevlerinde yetersizlik gelişmesini ifade eden geniş klinik kavramdır.",
    "preAnswerSafeDefinition": "Pankreas fonksiyon kaybını anlatan klinik kavramdır; bağlamına göre ekzokrin veya endokrin etkilenme değerlendirilir.",
    "postAnswerExplanation": "Kistik fibrozis bağlamında çoğunlukla ekzokrin pankreas yetmezliği, tekrarlayan akciğer enfeksiyonu ve steatore ile birlikte sorgulanır.",
    "tusPearl": "Pankreas yetmezliği bağlamı ekzokrin malabsorpsiyon mu endokrin glukoz bozukluğu mu ayırt edilmelidir.",
    "differentialPoint": "Ekzokrin yetmezlik steatore; endokrin yetmezlik hiperglisemi/diabetes mellitus ile öne çıkar.",
    "clinicalContext": "Kistik fibrozis bağlamında çoğunlukla ekzokrin pankreas yetmezliği, tekrarlayan akciğer enfeksiyonu ve steatore ile birlikte sorgulanır.",
    "mechanism": "",
    "relatedTerms": [
      "Pankreatik Ekzokrin Yetmezlik",
      "Steatore",
      "Kistik fibrozis"
    ],
    "safeNestedTerms": [
      "Pankreatik Ekzokrin Yetmezlik",
      "Steatore",
      "Kistik fibrozis"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 210,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "high",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Tekrarlayan akciğer enfeksiyonu ve pankreas yetmezliği hangi hastalığı düşündürür?",
      "terde klor yüksek; pankreas yetmezliği; bronşiektazi; mekonium ileus"
    ],
    "candidateAudit": {
      "candidateTerm": "Pankreas Yetmezliği",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 6,
      "sourceArea": "Hap Kartlar / Kataloglarım",
      "sourceFilePath": "src/data/tusPearlCards.js"
    }
  },
  {
    "id": "candidate-audit-v293-iga",
    "canonicalTerm": "IgA",
    "displayTerm": "IgA",
    "term": "IgA",
    "aliases": [
      "IgA",
      "immünoglobulin A",
      "sIgA"
    ],
    "category": "İmmünoloji / immünoglobulin",
    "subcategory": "İmmünoloji / immünoglobulin",
    "shortDefinition": "Mukozal yüzeylerde baskın bulunan, solunum ve gastrointestinal mukozada lokal bağışıklığa katkı sağlayan immünoglobulin sınıfıdır.",
    "preAnswerSafeDefinition": "Mukozal bağışıklıkta görevli immünoglobulin sınıfıdır.",
    "postAnswerExplanation": "Sekretuar IgA mukoza savunmasında önemlidir; selektif IgA eksikliği tekrarlayan mukozal enfeksiyon ve transfüzyon reaksiyonu riskiyle ilişkilidir.",
    "tusPearl": "Mukoza savunması ve anne sütü bağışıklığında IgA öne çıkar.",
    "differentialPoint": "IgG serumda en fazla ve plasentadan geçen; IgM primer yanıtta erken yükselen sınıftır.",
    "clinicalContext": "Sekretuar IgA mukoza savunmasında önemlidir; selektif IgA eksikliği tekrarlayan mukozal enfeksiyon ve transfüzyon reaksiyonu riskiyle ilişkilidir.",
    "mechanism": "",
    "relatedTerms": [
      "Selektif IgA Eksikliği",
      "Mukozal bağışıklık",
      "IgG",
      "IgM"
    ],
    "safeNestedTerms": [
      "Selektif IgA Eksikliği",
      "Mukozal bağışıklık",
      "IgG",
      "IgM"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 240,
    "isMultiWordTerm": false,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": true,
    "contextRequired": false,
    "phraseOnly": false,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "IgA nefropatisi",
      "IgA nefropatisi üst solunum yolu enfeksiyonunu izleyen hematüriyle öne çıkar."
    ],
    "candidateAudit": {
      "candidateTerm": "IgA",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 182,
      "sourceArea": "TUS Spot Olgular, Klinik Branş Seç, Hap Kartlar / Kataloglarım",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js, src/data/tusGlossaryClinicalBranchDeepIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-igg",
    "canonicalTerm": "IgG",
    "displayTerm": "IgG",
    "term": "IgG",
    "aliases": [
      "IgG",
      "immünoglobulin G"
    ],
    "category": "İmmünoloji / immünoglobulin",
    "subcategory": "İmmünoloji / immünoglobulin",
    "shortDefinition": "Serumda en fazla bulunan ve plasentadan geçebilen immünoglobulin sınıfıdır.",
    "preAnswerSafeDefinition": "Sistemik humoral bağışıklıkta önemli immünoglobulin sınıfıdır.",
    "postAnswerExplanation": "Opsonizasyon, kompleman aktivasyonu ve geç dönem/sekonder immün yanıtta önemlidir; yenidoğana pasif bağışıklık sağlar.",
    "tusPearl": "Plasentadan geçen ana immünoglobulin IgG’dir.",
    "differentialPoint": "IgM primer yanıtta erken; IgA mukozal yüzeylerde baskındır.",
    "clinicalContext": "Opsonizasyon, kompleman aktivasyonu ve geç dönem/sekonder immün yanıtta önemlidir; yenidoğana pasif bağışıklık sağlar.",
    "mechanism": "",
    "relatedTerms": [
      "Opsonizasyon",
      "Kompleman aktivasyonu",
      "IgM",
      "IgA"
    ],
    "safeNestedTerms": [
      "Opsonizasyon",
      "Kompleman aktivasyonu",
      "IgM",
      "IgA"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 235,
    "isMultiWordTerm": false,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": true,
    "contextRequired": false,
    "phraseOnly": false,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Anti-HAV IgM pozitif; Anti-HAV IgG negatif; HBsAg negatif; Anti-HBc IgM negatif; Anti-HCV negatif.",
      "Anti-HAV IgM pozitifliği yakın dönem hepatit A enfeksiyonunu gösterir. Anti-HAV IgG’nin negatif olması geçirilmiş bağışıklıktan çok erken/akut dönemi destekler; HBV ve HCV göstergelerinin negatifliği diğer viral hepat..."
    ],
    "candidateAudit": {
      "candidateTerm": "IgG",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 130,
      "sourceArea": "TUS Spot Olgular, Klinik Branş Seç, Hap Kartlar / Kataloglarım",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js, src/data/tusGlossaryClinicalBranchDeepIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-igm",
    "canonicalTerm": "IgM",
    "displayTerm": "IgM",
    "term": "IgM",
    "aliases": [
      "IgM",
      "immünoglobulin M"
    ],
    "category": "İmmünoloji / immünoglobulin",
    "subcategory": "İmmünoloji / immünoglobulin",
    "shortDefinition": "Primer immün yanıtta erken yükselen, pentamer yapılı ve komplemanı güçlü aktive eden immünoglobulindir.",
    "preAnswerSafeDefinition": "Erken humoral yanıtla ilişkili immünoglobulin sınıfıdır.",
    "postAnswerExplanation": "Akut enfeksiyon serolojisinde IgM pozitifliği yakın dönem yanıtı destekleyebilir; pentamer yapısı aviditeyi artırır.",
    "tusPearl": "Akut enfeksiyon serolojisinde IgM erken yanıt göstergesidir.",
    "differentialPoint": "IgG daha geç/kalıcı yanıtı ve geçirilmiş bağışıklığı düşündürür.",
    "clinicalContext": "Akut enfeksiyon serolojisinde IgM pozitifliği yakın dönem yanıtı destekleyebilir; pentamer yapısı aviditeyi artırır.",
    "mechanism": "",
    "relatedTerms": [
      "Kompleman aktivasyonu",
      "IgG",
      "Primer immün yanıt"
    ],
    "safeNestedTerms": [
      "Kompleman aktivasyonu",
      "IgG",
      "Primer immün yanıt"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 235,
    "isMultiWordTerm": false,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": true,
    "contextRequired": false,
    "phraseOnly": false,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Anti-HAV IgM pozitif; Anti-HAV IgG negatif; HBsAg negatif; Anti-HBc IgM negatif; Anti-HCV negatif.",
      "Anti-HAV IgM pozitifliği yakın dönem hepatit A enfeksiyonunu gösterir. Anti-HAV IgG’nin negatif olması geçirilmiş bağışıklıktan çok erken/akut dönemi destekler; HBV ve HCV göstergelerinin negatifliği diğer viral hepat..."
    ],
    "candidateAudit": {
      "candidateTerm": "IgM",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 92,
      "sourceArea": "TUS Spot Olgular, Hap Kartlar / Kataloglarım, Diğer eğitim metni",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js, removed-static-seed-source"
    }
  },
  {
    "id": "candidate-audit-v293-selektif-iga-eksikligi",
    "canonicalTerm": "Selektif IgA Eksikliği",
    "displayTerm": "Selektif IgA Eksikliği",
    "term": "Selektif IgA Eksikliği",
    "aliases": [
      "Selektif IgA Eksikliği",
      "IgA eksikliği"
    ],
    "category": "İmmünoloji / primer immün yetmezlik",
    "subcategory": "İmmünoloji / primer immün yetmezlik",
    "shortDefinition": "Serum IgA düzeyinin düşük olduğu, mukozal enfeksiyon ve bazı otoimmün tablolarla ilişkili primer immün yetmezliktir.",
    "preAnswerSafeDefinition": "Mukozal antikor yanıtındaki eksiklikle ilişkili immün yetmezlik kavramıdır.",
    "postAnswerExplanation": "Tekrarlayan sinopulmoner/GİS enfeksiyonlar, atopi ve transfüzyon reaksiyonu riskiyle gelebilir; IgG/IgM genellikle korunur.",
    "tusPearl": "En sık primer immün yetmezliklerden biridir ve IgA düşüklüğüyle ayırt edilir.",
    "differentialPoint": "CVID’de birden fazla immünoglobulin sınıfı azalabilir.",
    "clinicalContext": "Tekrarlayan sinopulmoner/GİS enfeksiyonlar, atopi ve transfüzyon reaksiyonu riskiyle gelebilir; IgG/IgM genellikle korunur.",
    "mechanism": "",
    "relatedTerms": [
      "IgA",
      "Sinopulmoner enfeksiyon",
      "Transfüzyon reaksiyonu"
    ],
    "safeNestedTerms": [
      "IgA",
      "Sinopulmoner enfeksiyon",
      "Transfüzyon reaksiyonu"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 245,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Selektif IgA eksikliği",
      "Selektif IgA eksikliği enfeksiyon ve otoimmüniteyle ilişkili olabilir ancak CFTR ilişkili ter klorür yüksekliğini açıklamaz."
    ],
    "candidateAudit": {
      "candidateTerm": "Selektif IgA Eksikliği",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 5,
      "sourceArea": "Hap Kartlar / Kataloglarım, Klinik Branş Seç",
      "sourceFilePath": "src/data/tusPearlCards.js, src/data/cases.js"
    }
  },
  {
    "id": "candidate-audit-v293-tsh",
    "canonicalTerm": "TSH",
    "displayTerm": "TSH",
    "term": "TSH",
    "aliases": [
      "TSH",
      "tiroid stimülan hormon",
      "thyroid stimulating hormone"
    ],
    "category": "Laboratuvar / endokrinoloji",
    "subcategory": "Laboratuvar / endokrinoloji",
    "shortDefinition": "Hipofizden salgılanan ve tiroid hormon sentezini uyaran tiroid stimülan hormondur.",
    "preAnswerSafeDefinition": "Tiroid aksının laboratuvar değerlendirmesinde kullanılan hipofizer hormondur.",
    "postAnswerExplanation": "Primer hipotiroidide TSH yüksek, primer hipertiroidide TSH düşüktür; serbest T4 ile birlikte yorumlanır.",
    "tusPearl": "Tiroid fonksiyon taramasında ilk basamak TSH’dır; T4 ile aks düzeyi ayırt edilir.",
    "differentialPoint": "Santral hipotiroidide TSH düşük veya uygunsuz normal olabilir.",
    "clinicalContext": "Primer hipotiroidide TSH yüksek, primer hipertiroidide TSH düşüktür; serbest T4 ile birlikte yorumlanır.",
    "mechanism": "",
    "relatedTerms": [
      "Serbest T4",
      "Hipotiroidi",
      "Hipertiroidi"
    ],
    "safeNestedTerms": [
      "Serbest T4",
      "Hipotiroidi",
      "Hipertiroidi"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 235,
    "isMultiWordTerm": false,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": true,
    "contextRequired": false,
    "phraseOnly": false,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "TSH",
      "Konjenital hipotiroidiyi düşük serbest T4 ve yüksek TSH ile tanıyıp erken tedavinin önemini açıklayabilme"
    ],
    "candidateAudit": {
      "candidateTerm": "TSH",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 62,
      "sourceArea": "TUS Spot Olgular, Hap Kartlar / Kataloglarım, Glossary data / tooltip",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js, src/data/tusGlossaryNestedClinicalIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-pth",
    "canonicalTerm": "PTH",
    "displayTerm": "PTH",
    "term": "PTH",
    "aliases": [
      "PTH",
      "parathormon",
      "paratiroid hormon"
    ],
    "category": "Laboratuvar / endokrinoloji",
    "subcategory": "Laboratuvar / endokrinoloji",
    "shortDefinition": "Paratiroid bezinden salınan, kalsiyum-fosfor dengesini kemik, böbrek ve vitamin D üzerinden düzenleyen hormondur.",
    "preAnswerSafeDefinition": "Kalsiyum-fosfor homeostazını değerlendirmede kullanılan hormonal parametredir.",
    "postAnswerExplanation": "PTH kalsiyumu artırır, fosfat atılımını artırır ve vitamin D aktivasyonunu destekler; hiper/hipoparatiroidi ayrımında kullanılır.",
    "tusPearl": "Kalsiyum bozukluklarında PTH düzeyi primer/sekonder neden ayrımında anahtar olabilir.",
    "differentialPoint": "PTH yüksekliği her zaman primer hiperparatiroidi değildir; D vitamini eksikliğinde sekonder artabilir.",
    "clinicalContext": "PTH kalsiyumu artırır, fosfat atılımını artırır ve vitamin D aktivasyonunu destekler; hiper/hipoparatiroidi ayrımında kullanılır.",
    "mechanism": "",
    "relatedTerms": [
      "Hipokalsemi",
      "Hiperkalsemi",
      "D vitamini"
    ],
    "safeNestedTerms": [
      "Hipokalsemi",
      "Hiperkalsemi",
      "D vitamini"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 235,
    "isMultiWordTerm": false,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": true,
    "contextRequired": false,
    "phraseOnly": false,
    "answerLeakRisk": "low",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "PTH",
      "PTH dışı hiperkalsemi nedenini destekler."
    ],
    "candidateAudit": {
      "candidateTerm": "PTH",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 45,
      "sourceArea": "TUS Spot Olgular, Hap Kartlar / Kataloglarım, Klinik Branş Seç",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js, src/data/tusGlossaryExpandedIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-hbsag",
    "canonicalTerm": "HBsAg",
    "displayTerm": "HBsAg",
    "term": "HBsAg",
    "aliases": [
      "HBsAg",
      "hepatit B yüzey antijeni",
      "HBs antijeni"
    ],
    "category": "Mikrobiyoloji / seroloji",
    "subcategory": "Mikrobiyoloji / seroloji",
    "shortDefinition": "Hepatit B virüsünün yüzey antijenidir ve aktif HBV enfeksiyonu veya taşıyıcılığın temel göstergesidir.",
    "preAnswerSafeDefinition": "Hepatit B enfeksiyon durumunu değerlendiren serolojik belirteçtir.",
    "postAnswerExplanation": "HBsAg pozitifliği mevcut enfeksiyonu gösterir; anti-HBs bağışıklığı, anti-HBc geçirilmiş/aktif temas bilgisini destekler.",
    "tusPearl": "HBsAg pozitifliği aktif enfeksiyon/taşıyıcılık için temel serolojik ipucudur.",
    "differentialPoint": "Anti-HBs aşı veya geçirilmiş enfeksiyon sonrası bağışıklığı gösterir.",
    "clinicalContext": "HBsAg pozitifliği mevcut enfeksiyonu gösterir; anti-HBs bağışıklığı, anti-HBc geçirilmiş/aktif temas bilgisini destekler.",
    "mechanism": "",
    "relatedTerms": [
      "HBeAg",
      "Anti-HBs",
      "HBV"
    ],
    "safeNestedTerms": [
      "HBeAg",
      "Anti-HBs",
      "HBV"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 245,
    "isMultiWordTerm": false,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": true,
    "contextRequired": false,
    "phraseOnly": false,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Anti-HAV IgM pozitif; Anti-HAV IgG negatif; HBsAg negatif; Anti-HBc IgM negatif; Anti-HCV negatif.",
      "Akut hepatit B için HBsAg ve özellikle Anti-HBc IgM pozitifliği beklenir; bu olguda ikisi de negatif verilmiştir."
    ],
    "candidateAudit": {
      "candidateTerm": "HBsAg",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 35,
      "sourceArea": "TUS Spot Olgular, Diğer eğitim metni, Glossary data / tooltip",
      "sourceFilePath": "src/data/cases.js, src/data/tusGlossaryContextualPhraseIndex.js, src/data/tusPearlCards.js"
    }
  },
  {
    "id": "candidate-audit-v293-hbeag",
    "canonicalTerm": "HBeAg",
    "displayTerm": "HBeAg",
    "term": "HBeAg",
    "aliases": [
      "HBeAg",
      "hepatit B e antijeni"
    ],
    "category": "Mikrobiyoloji / seroloji",
    "subcategory": "Mikrobiyoloji / seroloji",
    "shortDefinition": "Hepatit B virüs replikasyonu ve bulaştırıcılığıyla ilişkili serolojik belirteçtir.",
    "preAnswerSafeDefinition": "HBV replikasyon aktivitesini değerlendirmede kullanılan serolojik marker’dır.",
    "postAnswerExplanation": "HBeAg pozitifliği yüksek viral replikasyon ve bulaştırıcılık ile ilişkilidir; anti-HBe serokonversiyonu aktivitenin azalmasını destekleyebilir.",
    "tusPearl": "HBsAg enfeksiyon varlığını, HBeAg replikasyon/bulaştırıcılık düzeyini düşündürür.",
    "differentialPoint": "HBeAg negatif kronik hepatit B de prekor mutantlarla görülebilir.",
    "clinicalContext": "HBeAg pozitifliği yüksek viral replikasyon ve bulaştırıcılık ile ilişkilidir; anti-HBe serokonversiyonu aktivitenin azalmasını destekleyebilir.",
    "mechanism": "",
    "relatedTerms": [
      "HBsAg",
      "HBV DNA",
      "Anti-HBe"
    ],
    "safeNestedTerms": [
      "HBsAg",
      "HBV DNA",
      "Anti-HBe"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 230,
    "isMultiWordTerm": false,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": true,
    "contextRequired": false,
    "phraseOnly": false,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "HBeAg",
      "HBV serolojisinde pencere dönemi, yüzey antijeninin saptanamaz hâle geldiği ancak koruyucu anti-HBs antikorunun henüz ölçülebilir düzeye ulaşmadığı aralıktır. Bu aralıkta HBsAg negatif, anti-HBs negatif olabilir; bu n..."
    ],
    "candidateAudit": {
      "candidateTerm": "HBeAg",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 5,
      "sourceArea": "TUS Spot Olgular",
      "sourceFilePath": "src/data/cases.js"
    }
  },
  {
    "id": "candidate-audit-v293-pcr",
    "canonicalTerm": "PCR",
    "displayTerm": "PCR",
    "term": "PCR",
    "aliases": [
      "PCR",
      "polimeraz zincir reaksiyonu",
      "polymerase chain reaction"
    ],
    "category": "Moleküler tanı",
    "subcategory": "Moleküler tanı",
    "shortDefinition": "Hedef nükleik asit dizisini çoğaltarak mikroorganizma veya genetik materyal varlığını saptayan moleküler tanı yöntemidir.",
    "preAnswerSafeDefinition": "Nükleik asit temelli tanısal çoğaltma yöntemidir.",
    "postAnswerExplanation": "Enfeksiyon tanısı, viral yük, genetik mutasyon ve patojen saptamada kullanılır; kontaminasyon ve klinik bağlam birlikte değerlendirilmelidir.",
    "tusPearl": "PCR canlı mikroorganizma varlığını değil hedef genetik materyali gösterir.",
    "differentialPoint": "Kültür canlı üreme kanıtı sağlar; PCR daha hızlı nükleik asit kanıtı verir.",
    "clinicalContext": "Enfeksiyon tanısı, viral yük, genetik mutasyon ve patojen saptamada kullanılır; kontaminasyon ve klinik bağlam birlikte değerlendirilmelidir.",
    "mechanism": "",
    "relatedTerms": [
      "Nükleik asit",
      "Kültür",
      "Viral yük"
    ],
    "safeNestedTerms": [
      "Nükleik asit",
      "Kültür",
      "Viral yük"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 235,
    "isMultiWordTerm": false,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": true,
    "contextRequired": false,
    "phraseOnly": false,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Nazofarengeal PCR",
      "Bordetella pertussis eksik aşılı bebekte paroksismal öksürük, posttussif kusma, lenfositoz ve pozitif PCR ile en uyumlu etkendir."
    ],
    "candidateAudit": {
      "candidateTerm": "PCR",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 34,
      "sourceArea": "Klinik Branş Seç, TUS Spot Olgular, Glossary data / tooltip",
      "sourceFilePath": "src/data/cases.js, src/data/tusGlossaryClinicalBranchDeepIndex.js, src/data/tusGlossaryGlobalQualityIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-usg",
    "canonicalTerm": "USG",
    "displayTerm": "USG",
    "term": "USG",
    "aliases": [
      "USG",
      "ultrasonografi",
      "ultrason",
      "sonografi"
    ],
    "category": "Görüntüleme",
    "subcategory": "Görüntüleme",
    "shortDefinition": "Ses dalgalarıyla gerçek zamanlı görüntüleme sağlayan, radyasyon içermeyen ultrasonografik tetkiktir.",
    "preAnswerSafeDefinition": "Radyasyon içermeyen sonografik görüntüleme yöntemidir.",
    "postAnswerExplanation": "Abdomen, obstetri, tiroid, skrotum ve acil değerlendirmelerde sık kullanılır; Doppler ile akım bilgisi eklenebilir.",
    "tusPearl": "Akut skrotumda Doppler USG kan akımını değerlendirmede önemlidir.",
    "differentialPoint": "BT anatomik kesitsel görüntüleme sağlar; USG kullanıcı ve pencere bağımlıdır.",
    "clinicalContext": "Abdomen, obstetri, tiroid, skrotum ve acil değerlendirmelerde sık kullanılır; Doppler ile akım bilgisi eklenebilir.",
    "mechanism": "",
    "relatedTerms": [
      "Doppler ultrasonografi",
      "Skrotal ultrasonografi",
      "Kontrastlı BT"
    ],
    "safeNestedTerms": [
      "Doppler ultrasonografi",
      "Skrotal ultrasonografi",
      "Kontrastlı BT"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 220,
    "isMultiWordTerm": false,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": true,
    "contextRequired": false,
    "phraseOnly": false,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Erken gebelik kanamasında beta-hCG ve transvajinal USG yorumunun kullanılması",
      "Beta-hCG düzeyi transvajinal USG ile intrauterin kese beklenebilecek aralıktayken uterin kavitede kese görülmemesi ve adneksiyal yapı saptanması ektopik gebeliği destekler."
    ],
    "candidateAudit": {
      "candidateTerm": "USG",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 43,
      "sourceArea": "Hap Kartlar / Kataloglarım, Klinik Branş Seç / TUS Spot Olgular, Glossary data / tooltip",
      "sourceFilePath": "src/data/tusPearlCards.js, src/data/tusGlossaryCaseDerivedIndex.js, src/data/tusGlossaryContextualPhraseIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-mr-kolanjiyografi",
    "canonicalTerm": "MR Kolanjiyografi",
    "displayTerm": "MR Kolanjiyografi",
    "term": "MR Kolanjiyografi",
    "aliases": [
      "MR Kolanjiyografi",
      "MRCP",
      "manyetik rezonans kolanjiyografi"
    ],
    "category": "Görüntüleme / hepatobiliyer",
    "subcategory": "Görüntüleme / hepatobiliyer",
    "shortDefinition": "Safra yollarını invaziv olmayan şekilde MR tekniğiyle değerlendiren görüntüleme yöntemidir.",
    "preAnswerSafeDefinition": "Safra yolu anatomisi ve tıkanıklık değerlendirmesinde kullanılan MR temelli tetkiktir.",
    "postAnswerExplanation": "Koledok taşı, biliyer darlık ve kolanjit/kolestaz bağlamında ERCP öncesi tanısal değerlendirmeye katkı sağlar.",
    "tusPearl": "MRCP tanısaldır; ERCP hem tanı hem tedavi amaçlı girişim sağlayabilir.",
    "differentialPoint": "ERCP invaziv ve terapötik olabilir; MRCP noninvaziv görüntülemedir.",
    "clinicalContext": "Koledok taşı, biliyer darlık ve kolanjit/kolestaz bağlamında ERCP öncesi tanısal değerlendirmeye katkı sağlar.",
    "mechanism": "",
    "relatedTerms": [
      "Kolestaz",
      "Koledok taşı",
      "ERCP"
    ],
    "safeNestedTerms": [
      "Kolestaz",
      "Koledok taşı",
      "ERCP"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 245,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "MR kolanjiyografi.",
      "Ülseratif kolit; ALP yüksek; kaşıntı; MR kolanjiyografi birlikte görüldüğünde öncelikli ilişki Primer sklerozan kolanjit yönündedir."
    ],
    "candidateAudit": {
      "candidateTerm": "MR Kolanjiyografi",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 5,
      "sourceArea": "Hap Kartlar / Kataloglarım",
      "sourceFilePath": "src/data/tusPearlCards.js"
    }
  },
  {
    "id": "candidate-audit-v293-serum-afp",
    "canonicalTerm": "Serum AFP",
    "displayTerm": "Serum AFP",
    "term": "Serum AFP",
    "aliases": [
      "Serum AFP",
      "AFP",
      "alfa fetoprotein",
      "alfa-fetoprotein"
    ],
    "category": "Laboratuvar / tümör belirteci",
    "subcategory": "Laboratuvar / tümör belirteci",
    "shortDefinition": "Alfa-fetoprotein düzeyinin serumda ölçülmesidir; hepatoselüler karsinom ve bazı germ hücreli tümörlerde yükselebilir.",
    "preAnswerSafeDefinition": "Tümör belirteci ve fetal protein düzeyi değerlendirmesiyle ilişkili laboratuvar kavramıdır.",
    "postAnswerExplanation": "Siroz veya kronik hepatit zemininde AFP artışı hepatoselüler karsinom şüphesini destekleyebilir; tek başına tanı koydurmaz.",
    "tusPearl": "AFP, hepatoselüler karsinom ve yolk sac tümörü bağlamında yüksek değerli marker’dır.",
    "differentialPoint": "β-hCG daha çok trofoblastik ve bazı germ hücreli tümörlerle ilişkilidir.",
    "clinicalContext": "Siroz veya kronik hepatit zemininde AFP artışı hepatoselüler karsinom şüphesini destekleyebilir; tek başına tanı koydurmaz.",
    "mechanism": "",
    "relatedTerms": [
      "Hepatoselüler karsinom",
      "Germ hücreli tümör",
      "β-hCG"
    ],
    "safeNestedTerms": [
      "Hepatoselüler karsinom",
      "Germ hücreli tümör",
      "β-hCG"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 230,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Nöral tüp defektleri erken embriyogenezde nöral tüp kapanmasının bozulmasıyla oluşur. Folat eksikliği önemli risk faktörüdür; perikonsepsiyonel folik asit desteği riski azaltır ve açık defektlerde maternal serum AFP a...",
      "Doğru cevap E’dir çünkü nöral tüp defektleri postnatal dönemde D vitamini eksikliğine bağlı oluşan hastalıklar değildir. Nöral tüp gebeliğin çok erken döneminde kapanır; bu nedenle risk azaltıcı folat desteğinin gebel..."
    ],
    "candidateAudit": {
      "candidateTerm": "Serum AFP",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 15,
      "sourceArea": "TUS Spot Olgular, Klinik Branş Seç / TUS Spot Olgular, Glossary data / tooltip",
      "sourceFilePath": "src/data/cases.js, src/data/tusGlossaryCaseDerivedIndex.js, src/data/tusGlossarySupplementalIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-ggt",
    "canonicalTerm": "GGT",
    "displayTerm": "GGT",
    "term": "GGT",
    "aliases": [
      "GGT",
      "gama glutamil transferaz",
      "gamma-GT",
      "γ-GT"
    ],
    "category": "Laboratuvar / hepatobiliyer",
    "subcategory": "Laboratuvar / hepatobiliyer",
    "shortDefinition": "Safra yolu ve hepatobiliyer sistem etkilenmesinde yükselebilen gama-glutamil transferaz enzimidir.",
    "preAnswerSafeDefinition": "Kolestaz ve hepatobiliyer enzim paterni yorumunda kullanılan laboratuvar parametresidir.",
    "postAnswerExplanation": "ALP yüksekliğinin hepatobiliyer kaynaklı olup olmadığını desteklemede kullanılır; alkol ve ilaçlarla da yükselebilir.",
    "tusPearl": "ALP + GGT birlikte yüksekse kolestatik/hepatobiliyer kaynak daha olasıdır.",
    "differentialPoint": "Kemik kaynaklı ALP yüksekliğinde GGT genellikle eşlik etmez.",
    "clinicalContext": "ALP yüksekliğinin hepatobiliyer kaynaklı olup olmadığını desteklemede kullanılır; alkol ve ilaçlarla da yükselebilir.",
    "mechanism": "",
    "relatedTerms": [
      "ALP/GGT yüksekliği",
      "Kolestaz",
      "Transaminaz yüksekliği"
    ],
    "safeNestedTerms": [
      "ALP/GGT yüksekliği",
      "Kolestaz",
      "Transaminaz yüksekliği"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 230,
    "isMultiWordTerm": false,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": true,
    "contextRequired": false,
    "phraseOnly": false,
    "answerLeakRisk": "low",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Safra yolu epitel hasarı/kolestaz ve kemik yapımıyla ilişkili enzimdir. ALP + GGT yüksekliği kolestatik paterni destekler.",
      "ALP + GGT yüksekliği kolestatik paterni destekler."
    ],
    "candidateAudit": {
      "candidateTerm": "GGT",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 17,
      "sourceArea": "Glossary data / tooltip, Hap Kartlar / Kataloglarım, Klinik Branş Seç / TUS Spot Olgular",
      "sourceFilePath": "src/data/tusPearlCards.js, src/data/tusGlossaryCaseDerivedIndex.js, src/data/tusGlossaryContextualPhraseIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-c3-c4-dusuklugu",
    "canonicalTerm": "C3/C4 Düşüklüğü",
    "displayTerm": "C3/C4 Düşüklüğü",
    "term": "C3/C4 Düşüklüğü",
    "aliases": [
      "C3/C4 Düşüklüğü",
      "düşük C3",
      "düşük C4",
      "kompleman düşüklüğü",
      "C3 düşüklüğü"
    ],
    "category": "Laboratuvar / immünoloji",
    "subcategory": "Laboratuvar / immünoloji",
    "shortDefinition": "Kompleman bileşenlerinin azalmasıdır; immün kompleks tüketimi veya kompleman aktivasyonunu düşündürebilir.",
    "preAnswerSafeDefinition": "Kompleman sistemi aktivitesiyle ilişkili laboratuvar bulgusudur.",
    "postAnswerExplanation": "SLE, poststreptokoksik glomerülonefrit ve bazı vaskülit/nefrit tablolarında düşük kompleman ayırıcı tanıya katkı sağlar.",
    "tusPearl": "Düşük C3/C4 immün kompleks aracılı süreçleri destekleyebilir.",
    "differentialPoint": "ANCA vaskülitlerinde kompleman genellikle belirgin düşük olmayabilir.",
    "clinicalContext": "SLE, poststreptokoksik glomerülonefrit ve bazı vaskülit/nefrit tablolarında düşük kompleman ayırıcı tanıya katkı sağlar.",
    "mechanism": "",
    "relatedTerms": [
      "Kompleman C3",
      "SLE",
      "Glomerülonefrit"
    ],
    "safeNestedTerms": [
      "Kompleman C3",
      "SLE",
      "Glomerülonefrit"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 235,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "SLE aktivitesinde anti-dsDNA artışı ve kompleman C3/C4 düşüklüğü, özellikle nefrit aktivitesi açısından izlemde değerlidir.",
      "Anti-dsDNA düzeyindeki artış ve C3/C4 tüketimi SLE hastalık aktivitesiyle, özellikle lupus nefritiyle ilişkilidir. Anti-Sm tanısal olarak özgül olabilir ancak aktivite izleminde bu çift kadar dinamik değildir; diğer s..."
    ],
    "candidateAudit": {
      "candidateTerm": "C3/C4 Düşüklüğü",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 17,
      "sourceArea": "TUS Spot Olgular, Hap Kartlar / Kataloglarım, Glossary data / tooltip",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js, src/data/tusGlossaryClinicalBranchDeepIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-direkt-bilirubin-yuksekligi",
    "canonicalTerm": "Direkt bilirubin yüksekliği",
    "displayTerm": "Direkt bilirubin yüksekliği",
    "term": "Direkt bilirubin yüksekliği",
    "aliases": [
      "Direkt bilirubin yüksekliği",
      "direkt hiperbilirubinemi",
      "konjuge hiperbilirubinemi"
    ],
    "category": "Laboratuvar / hepatobiliyer",
    "subcategory": "Laboratuvar / hepatobiliyer",
    "shortDefinition": "Konjuge bilirubinin serumda artmasıdır; kolestaz, hepatoselüler atılım bozukluğu veya safra yolu tıkanıklığını düşündürebilir.",
    "preAnswerSafeDefinition": "Bilirubin fraksiyonlarının yorumunda kullanılan hepatobiliyer laboratuvar bulgusudur.",
    "postAnswerExplanation": "Direkt hiperbilirubinemi ALP/GGT yüksekliğiyle birlikte kolestatik paterni destekler.",
    "tusPearl": "Açık renk dışkı + koyu idrar + direkt bilirubin yüksekliği kolestaz lehinedir.",
    "differentialPoint": "İndirekt hiperbilirubinemi hemoliz veya konjugasyon bozukluklarıyla ilişkilidir.",
    "clinicalContext": "Direkt hiperbilirubinemi ALP/GGT yüksekliğiyle birlikte kolestatik paterni destekler.",
    "mechanism": "",
    "relatedTerms": [
      "Kolestaz",
      "ALP/GGT yüksekliği",
      "İndirekt hiperbilirubinemi"
    ],
    "safeNestedTerms": [
      "Kolestaz",
      "ALP/GGT yüksekliği",
      "İndirekt hiperbilirubinemi"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 235,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "low",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "ABO hemolizi indirekt bilirubin artışı yapar; direkt bilirubin yüksekliği ve akolik dışkı tipik değildir."
    ],
    "candidateAudit": {
      "candidateTerm": "Direkt Bilirubin Yüksekliği",
      "recommendation": "mergeWithExisting",
      "confidenceScore": "medium",
      "occurrenceCount": 1,
      "sourceArea": "Klinik Branş Seç",
      "sourceFilePath": "src/data/cases.js"
    }
  },
  {
    "id": "candidate-audit-v293-hipokalemi",
    "canonicalTerm": "Hipokalemi",
    "displayTerm": "Hipokalemi",
    "term": "Hipokalemi",
    "aliases": [
      "Hipokalemi",
      "düşük potasyum",
      "hipopotasemi"
    ],
    "category": "Laboratuvar / elektrolit",
    "subcategory": "Laboratuvar / elektrolit",
    "shortDefinition": "Serum potasyumunun düşmesiyle kas güçsüzlüğü, ileus ve aritmi eğilimi oluşturabilen elektrolit bozukluğudur.",
    "preAnswerSafeDefinition": "Serum potasyum düzeyinin azalmasıyla ilişkili elektrolit bozukluğudur.",
    "postAnswerExplanation": "Kusma, diüretik, hiperaldosteronizm ve hücre içine potasyum kayması hipokalemiye yol açabilir; EKG’de U dalgası görülebilir.",
    "tusPearl": "Hipertansiyon + hipokalemi metabolik alkaloz hiperaldosteronizmi düşündürebilir.",
    "differentialPoint": "Hiperkalemi sivri T/QRS genişlemesi; hipokalemi U dalgası ve kas güçsüzlüğü ile ayrılır.",
    "clinicalContext": "Kusma, diüretik, hiperaldosteronizm ve hücre içine potasyum kayması hipokalemiye yol açabilir; EKG’de U dalgası görülebilir.",
    "mechanism": "",
    "relatedTerms": [
      "Metabolik alkaloz",
      "U dalgası",
      "Aldosteron"
    ],
    "safeNestedTerms": [
      "Metabolik alkaloz",
      "U dalgası",
      "Aldosteron"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 240,
    "isMultiWordTerm": false,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": true,
    "contextRequired": false,
    "phraseOnly": false,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Primer hiperaldosteronizm hipertansiyon ve hipokalemi yapar; bu olguda hipotansiyon ve hiperkalemi vardır.",
      "Diyabetik ketoasidozda hipokalemi varlığında insülin tedavisinin zamanlamasını belirleyebilme"
    ],
    "candidateAudit": {
      "candidateTerm": "Hipokalemi",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 97,
      "sourceArea": "TUS Spot Olgular, Klinik Branş Seç, Glossary data / tooltip",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js, src/data/tusGlossaryExpandedIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-metabolik-alkaloz",
    "canonicalTerm": "Metabolik Alkaloz",
    "displayTerm": "Metabolik Alkaloz",
    "term": "Metabolik Alkaloz",
    "aliases": [
      "Metabolik Alkaloz"
    ],
    "category": "Asit-baz bozukluğu",
    "subcategory": "Asit-baz bozukluğu",
    "shortDefinition": "Primer bikarbonat artışı veya hidrojen iyonu kaybıyla gelişen pH yüksekliği tablosudur.",
    "preAnswerSafeDefinition": "Bikarbonat artışı veya asit kaybıyla ilişkili metabolik asit-baz bozukluğudur.",
    "postAnswerExplanation": "Kusma, diüretikler, mineralokortikoid fazlalığı ve hacim kaybı sık nedenlerdir; klor yanıtlı/yanıtsız ayrım yapılabilir.",
    "tusPearl": "Hipokalemi metabolik alkalozu sürdürebilir ve hiperaldosteronizm ipucu olabilir.",
    "differentialPoint": "Metabolik asidozda bikarbonat azalır; metabolik alkalozda artar.",
    "clinicalContext": "Kusma, diüretikler, mineralokortikoid fazlalığı ve hacim kaybı sık nedenlerdir; klor yanıtlı/yanıtsız ayrım yapılabilir.",
    "mechanism": "",
    "relatedTerms": [
      "Hipokalemi",
      "Kusma",
      "Diüretik"
    ],
    "safeNestedTerms": [
      "Hipokalemi",
      "Kusma",
      "Diüretik"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 240,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Hipokloremik metabolik alkaloz paterni izlenir.",
      "2-8 haftalık bebekte safrasız fışkırır kusma, kilo alamama ve hipokloremik metabolik alkaloz hipertrofik pilor stenozu için tipiktir."
    ],
    "candidateAudit": {
      "candidateTerm": "Metabolik Alkaloz",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 64,
      "sourceArea": "Hap Kartlar / Kataloglarım, Klinik Branş Seç, TUS Spot Olgular",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js, src/data/tusGlossaryExpandedIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-hipokalemik-metabolik-alkaloz",
    "canonicalTerm": "Hipokalemik Metabolik Alkaloz",
    "displayTerm": "Hipokalemik Metabolik Alkaloz",
    "term": "Hipokalemik Metabolik Alkaloz",
    "aliases": [
      "Hipokalemik Metabolik Alkaloz",
      "hipokalemi metabolik alkaloz",
      "hipertansiyon hipokalemi metabolik alkaloz"
    ],
    "category": "Asit-baz / elektrolit",
    "subcategory": "Asit-baz / elektrolit",
    "shortDefinition": "Hipokalemi ile birlikte metabolik alkalozun görüldüğü, kusma, diüretik veya mineralokortikoid fazlalığıyla ilişkili laboratuvar paternidir.",
    "preAnswerSafeDefinition": "Potasyum düşüklüğü ve metabolik alkaloz birlikteliğini ifade eden elektrolit-asit baz paternidir.",
    "postAnswerExplanation": "Hipertansiyon eşlik ediyorsa primer hiperaldosteronizm; normotansif hastada kusma/diüretik veya Bartter-Gitelman spektrumu düşünülür.",
    "tusPearl": "Hipertansiyon + hipokalemik metabolik alkaloz aldosteron fazlalığı için yüksek değerli ipucudur.",
    "differentialPoint": "DKA gibi metabolik asidoz tablolarından pH/HCO₃⁻ yönüyle ayrılır.",
    "clinicalContext": "Hipertansiyon eşlik ediyorsa primer hiperaldosteronizm; normotansif hastada kusma/diüretik veya Bartter-Gitelman spektrumu düşünülür.",
    "mechanism": "",
    "relatedTerms": [
      "Hipokalemi",
      "Metabolik Alkaloz",
      "Aldosteron"
    ],
    "safeNestedTerms": [
      "Hipokalemi",
      "Metabolik Alkaloz",
      "Aldosteron"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 255,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Hipokloremik, hipokalemik metabolik alkaloz."
    ],
    "candidateAudit": {
      "candidateTerm": "Hipokalemik Metabolik Alkaloz",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 5,
      "sourceArea": "Hap Kartlar / Kataloglarım",
      "sourceFilePath": "src/data/tusPearlCards.js"
    }
  },
  {
    "id": "candidate-audit-v293-hipoksemi",
    "canonicalTerm": "Hipoksemi",
    "displayTerm": "Hipoksemi",
    "term": "Hipoksemi",
    "aliases": [
      "Hipoksemi",
      "düşük PaO2",
      "arteriyel hipoksemi"
    ],
    "category": "Laboratuvar / solunum",
    "subcategory": "Laboratuvar / solunum",
    "shortDefinition": "Arteriyel kandaki oksijen düzeyinin düşmesidir.",
    "preAnswerSafeDefinition": "Oksijenlenme durumunu gösteren arteriyel kan parametresiyle ilişkili kavramdır.",
    "postAnswerExplanation": "V/Q uyumsuzluğu, şant, hipoventilasyon, difüzyon bozukluğu ve düşük FiO₂ hipoksemi yapabilir.",
    "tusPearl": "Hipoksemi pulse oksimetre ve arter kan gazı ile klinik bağlama göre değerlendirilir.",
    "differentialPoint": "Hipoksi dokuda oksijen yetersizliğini; hipoksemi kanda oksijen düşüklüğünü ifade eder.",
    "clinicalContext": "V/Q uyumsuzluğu, şant, hipoventilasyon, difüzyon bozukluğu ve düşük FiO₂ hipoksemi yapabilir.",
    "mechanism": "",
    "relatedTerms": [
      "Ventilasyon-perfüzyon uyumsuzluğu",
      "Arter kan gazı",
      "Hipoksi"
    ],
    "safeNestedTerms": [
      "Ventilasyon-perfüzyon uyumsuzluğu",
      "Arter kan gazı",
      "Hipoksi"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 235,
    "isMultiWordTerm": false,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": true,
    "contextRequired": false,
    "phraseOnly": false,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Süt çocuğunda viral üst solunum yolu bulgularını izleyen hışıltılı solunum ve çekilme bronşiolit lehinedir. İlk yaklaşım destek tedavisidir; hipoksemi varsa oksijen, beslenme azalmışsa hidrasyon ve sekresyon kontrolü ...",
      "Entübasyon apne, belirgin solunum yetmezliği veya ağır hipoksemi varsa gerekir; bu olguda önce destek tedavisi uygundur."
    ],
    "candidateAudit": {
      "candidateTerm": "Hipoksemi",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 60,
      "sourceArea": "Klinik Branş Seç, Hap Kartlar / Kataloglarım, Glossary data / tooltip",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js, src/data/tusGlossaryCaseDerivedIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-hiperamonyemi",
    "canonicalTerm": "Hiperamonyemi",
    "displayTerm": "Hiperamonyemi",
    "term": "Hiperamonyemi",
    "aliases": [
      "Hiperamonyemi",
      "hiperammonemi",
      "yüksek amonyak",
      "amonyak yüksekliği"
    ],
    "category": "Laboratuvar / metabolizma",
    "subcategory": "Laboratuvar / metabolizma",
    "shortDefinition": "Amonyağın detoksifiye edilememesi veya üre döngüsü bozukluğu nedeniyle kanda artmasıdır.",
    "preAnswerSafeDefinition": "Amonyak metabolizması ve nörotoksisiteyle ilişkili biyokimyasal bozukluktur.",
    "postAnswerExplanation": "Üre döngüsü bozukluğu, karaciğer yetmezliği veya valproat kullanımı ensefalopati ve kusma ile gelebilir.",
    "tusPearl": "Yenidoğanda letarji/kusma + solunumsal alkaloz + hiperamonyemi üre döngüsü bozukluğunu düşündürür.",
    "differentialPoint": "Organik asidemilerde genellikle metabolik asidoz eşlik edebilir.",
    "clinicalContext": "Üre döngüsü bozukluğu, karaciğer yetmezliği veya valproat kullanımı ensefalopati ve kusma ile gelebilir.",
    "mechanism": "",
    "relatedTerms": [
      "Üre döngüsü bozukluğu",
      "Karaciğer Yetmezliği",
      "Hepatik ensefalopati"
    ],
    "safeNestedTerms": [
      "Üre döngüsü bozukluğu",
      "Karaciğer Yetmezliği",
      "Hepatik ensefalopati"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 245,
    "isMultiWordTerm": false,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": true,
    "contextRequired": false,
    "phraseOnly": false,
    "answerLeakRisk": "low",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Ornitin transkarbamilaz eksikliği üre döngüsü bozukluğudur; ağır hiperamonyemi ön planda beklenir.",
      "OTC defekti üre döngüsü bozukluğudur; hiperamonyemi ön plandadır."
    ],
    "candidateAudit": {
      "candidateTerm": "Hiperamonyemi",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 54,
      "sourceArea": "Hap Kartlar / Kataloglarım, Glossary data / tooltip, TUS Spot Olgular",
      "sourceFilePath": "src/data/tusPearlCards.js, src/data/cases.js, src/data/tusGlossaryCaseDerivedIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-retikulositoz",
    "canonicalTerm": "Retikülositoz",
    "displayTerm": "Retikülositoz",
    "term": "Retikülositoz",
    "aliases": [
      "Retikülositoz",
      "retikülosit artışı",
      "retikülosit yüksekliği"
    ],
    "category": "Laboratuvar / hematoloji",
    "subcategory": "Laboratuvar / hematoloji",
    "shortDefinition": "Kemik iliğinin eritrosit üretimini artırdığını gösteren genç eritrosit artışıdır.",
    "preAnswerSafeDefinition": "Eritropoez yanıtını yansıtan hematolojik laboratuvar bulgusudur.",
    "postAnswerExplanation": "Hemoliz veya akut kan kaybında retikülositoz beklenir; kemik iliği yetmezliğinde retikülosit yanıtı yetersiz kalır.",
    "tusPearl": "Anemide retikülosit yüksekliği kayıp/yıkımı, düşüklüğü üretim bozukluğunu düşündürür.",
    "differentialPoint": "Retikülosit sayısı tek başına değil anemi derecesine göre düzeltilerek yorumlanmalıdır.",
    "clinicalContext": "Hemoliz veya akut kan kaybında retikülositoz beklenir; kemik iliği yetmezliğinde retikülosit yanıtı yetersiz kalır.",
    "mechanism": "",
    "relatedTerms": [
      "Retikülosit sayısı",
      "Hemoliz",
      "Kemik iliği yetmezliği"
    ],
    "safeNestedTerms": [
      "Retikülosit sayısı",
      "Hemoliz",
      "Kemik iliği yetmezliği"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 235,
    "isMultiWordTerm": false,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": true,
    "contextRequired": false,
    "phraseOnly": false,
    "answerLeakRisk": "low",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Akut hemolitik anemide sarılık, LDH artışı ve retikülositoz beklenir; düşük ferritin temel bulgu değildir.",
      "LDH ve indirekt bilirubin artışı, haptoglobin düşüklüğü ve retikülositoz hemolizi destekler."
    ],
    "candidateAudit": {
      "candidateTerm": "Retikülositoz",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 15,
      "sourceArea": "Glossary data / tooltip, Hap Kartlar / Kataloglarım, Klinik Branş Seç",
      "sourceFilePath": "src/data/tusPearlCards.js, src/data/tusGlossaryContextualPhraseIndex.js, src/data/tusGlossaryExpandedIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-uremi",
    "canonicalTerm": "Üremi",
    "displayTerm": "Üremi",
    "term": "Üremi",
    "aliases": [
      "Üremi",
      "üremik tablo"
    ],
    "category": "Hastalık / nefroloji",
    "subcategory": "Hastalık / nefroloji",
    "shortDefinition": "Böbrek yetmezliğinde azotlu atıkların birikmesiyle gelişen sistemik toksik klinik tablodur.",
    "preAnswerSafeDefinition": "Böbrek fonksiyon kaybı ve metabolik atık birikimiyle ilişkili klinik kavramdır.",
    "postAnswerExplanation": "Üremik ensefalopati, perikardit, bulantı, kaşıntı ve kanama eğilimi gibi sistemik bulgular oluşturabilir.",
    "tusPearl": "Üremik perikardit veya ensefalopati diyaliz endikasyonu olabilir.",
    "differentialPoint": "Azotemi laboratuvar artışı; üremi klinik semptomatik tabloyu ifade eder.",
    "clinicalContext": "Üremik ensefalopati, perikardit, bulantı, kaşıntı ve kanama eğilimi gibi sistemik bulgular oluşturabilir.",
    "mechanism": "",
    "relatedTerms": [
      "BUN",
      "Serum kreatinin",
      "Hemodiyaliz"
    ],
    "safeNestedTerms": [
      "BUN",
      "Serum kreatinin",
      "Hemodiyaliz"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 235,
    "isMultiWordTerm": false,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": true,
    "contextRequired": false,
    "phraseOnly": false,
    "answerLeakRisk": "low",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Primer bikarbonat azalması veya asit yükü artışı ile pH düşüklüğü oluşturan asit-baz bozukluğudur. DKA, laktik asidoz, üremi ve toksinler yüksek anion gap metabolik asidoz nedenleridir.",
      "DKA, laktik asidoz, üremi ve toksinler yüksek anion gap metabolik asidoz nedenleridir."
    ],
    "candidateAudit": {
      "candidateTerm": "Üremi",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 12,
      "sourceArea": "Glossary data / tooltip, Klinik Branş Seç / TUS Spot Olgular",
      "sourceFilePath": "src/data/tusGlossaryCaseDerivedIndex.js, src/data/tusGlossaryClinicalBranchDeepIndex.js, src/data/tusGlossaryExpandedIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-gastroenterit",
    "canonicalTerm": "Gastroenterit",
    "displayTerm": "Gastroenterit",
    "term": "Gastroenterit",
    "aliases": [
      "Gastroenterit",
      "akut gastroenterit"
    ],
    "category": "Hastalık / gastroenteroloji",
    "subcategory": "Hastalık / gastroenteroloji",
    "shortDefinition": "Mide ve bağırsak sisteminin çoğunlukla enfeksiyöz inflamasyonudur; ishal, kusma ve dehidratasyonla seyreder.",
    "preAnswerSafeDefinition": "Gastrointestinal enfeksiyon/inflamasyonla ilişkili klinik tabloyu ifade eder.",
    "postAnswerExplanation": "Çocuklarda dehidratasyon derecesi ve oral rehidratasyon ihtiyacı yönetimde temel belirleyicidir.",
    "tusPearl": "Akut ishalde dehidratasyon bulguları tedavi kararını yönlendirir.",
    "differentialPoint": "Kanlı ishal/invaziv bulgu dizanteri veya inflamatuvar etiyolojiyi düşündürür.",
    "clinicalContext": "Çocuklarda dehidratasyon derecesi ve oral rehidratasyon ihtiyacı yönetimde temel belirleyicidir.",
    "mechanism": "",
    "relatedTerms": [
      "Dehidratasyon",
      "Oral rehidratasyon",
      "İshal"
    ],
    "safeNestedTerms": [
      "Dehidratasyon",
      "Oral rehidratasyon",
      "İshal"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 230,
    "isMultiWordTerm": false,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": true,
    "contextRequired": false,
    "phraseOnly": false,
    "answerLeakRisk": "high",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Akut gastroenterit",
      "Üç gündür halsizlik, bulantı ve koyu renkli idrar yakınması olan genç erişkinde skleralarda ikter izlenir. Yakın zamanda kalabalık bir yurtta gastroenterit benzeri yakınmaları olan arkadaşları olduğu öğrenilir."
    ],
    "candidateAudit": {
      "candidateTerm": "Gastroenterit",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 19,
      "sourceArea": "Klinik Branş Seç, Hap Kartlar / Kataloglarım, Branş/kategori",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js, removed-branch-template-source"
    }
  },
  {
    "id": "candidate-audit-v293-gastrit",
    "canonicalTerm": "Gastrit",
    "displayTerm": "Gastrit",
    "term": "Gastrit",
    "aliases": [
      "Gastrit",
      "mide mukozası inflamasyonu"
    ],
    "category": "Hastalık / gastroenteroloji",
    "subcategory": "Hastalık / gastroenteroloji",
    "shortDefinition": "Mide mukozasının inflamasyonudur; H. pylori, NSAİİ, alkol ve stres ilişkili mukozal hasar sık nedenlerdir.",
    "preAnswerSafeDefinition": "Mide mukozası inflamasyonu veya irritasyonu ile ilişkili klinik kavramdır.",
    "postAnswerExplanation": "Epigastrik ağrı, dispepsi ve kanama riskiyle gelebilir; etiyolojiye göre H. pylori eradikasyonu veya asit baskılama gerekebilir.",
    "tusPearl": "NSAİİ + epigastrik yakınma gastrit/ülser riskini artırır.",
    "differentialPoint": "Peptik ülserde mukozal defekt daha derindir; gastrit mukozal inflamasyondur.",
    "clinicalContext": "Epigastrik ağrı, dispepsi ve kanama riskiyle gelebilir; etiyolojiye göre H. pylori eradikasyonu veya asit baskılama gerekebilir.",
    "mechanism": "",
    "relatedTerms": [
      "H. pylori",
      "NSAİİ",
      "Epigastrik ağrı"
    ],
    "safeNestedTerms": [
      "H. pylori",
      "NSAİİ",
      "Epigastrik ağrı"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 230,
    "isMultiWordTerm": false,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": true,
    "contextRequired": false,
    "phraseOnly": false,
    "answerLeakRisk": "high",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Uzun süren gastrit sonrası metaplazi",
      "Kronik aktif gastrit, glandüler atrofi ve intestinal metaplazi izlendi."
    ],
    "candidateAudit": {
      "candidateTerm": "Gastrit",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 17,
      "sourceArea": "Klinik Branş Seç, Glossary data / tooltip",
      "sourceFilePath": "src/data/cases.js, src/data/tusGlossaryClinicalBranchDeepIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-kolesistit",
    "canonicalTerm": "Kolesistit",
    "displayTerm": "Kolesistit",
    "term": "Kolesistit",
    "aliases": [
      "Kolesistit",
      "akut kolesistit"
    ],
    "category": "Hastalık / hepatobiliyer",
    "subcategory": "Hastalık / hepatobiliyer",
    "shortDefinition": "Safra kesesi inflamasyonudur; çoğunlukla sistik kanalın taşla tıkanması sonrası gelişir.",
    "preAnswerSafeDefinition": "Safra kesesi inflamasyonunu ifade eden klinik tablodur.",
    "postAnswerExplanation": "Sağ üst kadran ağrısı, ateş, lökositoz ve Murphy bulgusu ile gelebilir; ultrasonografi ilk değerlendirmede önemlidir.",
    "tusPearl": "Ateş + sağ üst kadran ağrısı + Murphy bulgusu akut kolesistiti destekler.",
    "differentialPoint": "Biliyer kolikte inflamasyon/ateş/lökositoz beklenmez.",
    "clinicalContext": "Sağ üst kadran ağrısı, ateş, lökositoz ve Murphy bulgusu ile gelebilir; ultrasonografi ilk değerlendirmede önemlidir.",
    "mechanism": "",
    "relatedTerms": [
      "Murphy bulgusu",
      "Safra taşı",
      "Ultrasonografi"
    ],
    "safeNestedTerms": [
      "Murphy bulgusu",
      "Safra taşı",
      "Ultrasonografi"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 240,
    "isMultiWordTerm": false,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": true,
    "contextRequired": false,
    "phraseOnly": false,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Akut kolesistit",
      "Kolesistit sağ üst kadran ağrısı ve Murphy bulgusuyla beklenir."
    ],
    "candidateAudit": {
      "candidateTerm": "Kolesistit",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 40,
      "sourceArea": "Glossary data / tooltip, Klinik Branş Seç, Hap Kartlar / Kataloglarım",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js, src/data/tusGlossaryContextualPhraseIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-akut-kolesistit",
    "canonicalTerm": "Akut Kolesistit",
    "displayTerm": "Akut Kolesistit",
    "term": "Akut Kolesistit",
    "aliases": [
      "Akut Kolesistit",
      "akut safra kesesi iltihabı"
    ],
    "category": "Hastalık / hepatobiliyer",
    "subcategory": "Hastalık / hepatobiliyer",
    "shortDefinition": "Safra kesesinin akut inflamasyonudur; genellikle sistik kanal taş obstrüksiyonu ile ilişkilidir.",
    "preAnswerSafeDefinition": "Safra kesesinin akut inflamatuvar klinik tablosudur.",
    "postAnswerExplanation": "Sağ üst kadran ağrısı, ateş, lökositoz ve ultrasonografik duvar kalınlaşması/kolelitiazis bulguları beklenebilir.",
    "tusPearl": "Murphy bulgusu ve ateş biliyer kolikten akut kolesistite geçişi düşündürür.",
    "differentialPoint": "Kolanjitte safra yolu enfeksiyonu ve Charcot triadı ön plandadır.",
    "clinicalContext": "Sağ üst kadran ağrısı, ateş, lökositoz ve ultrasonografik duvar kalınlaşması/kolelitiazis bulguları beklenebilir.",
    "mechanism": "",
    "relatedTerms": [
      "Kolesistit",
      "Murphy bulgusu",
      "Kolelitiazis"
    ],
    "safeNestedTerms": [
      "Kolesistit",
      "Murphy bulgusu",
      "Kolelitiazis"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 250,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Akut kolesistit",
      "Safra taşı ağrısına ateş, lökositoz ve ultrasonografide duvar kalınlaşması eklenirse akut kolesistit düşünülür."
    ],
    "candidateAudit": {
      "candidateTerm": "Akut Kolesistit",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 31,
      "sourceArea": "Klinik Branş Seç, Glossary data / tooltip, Hap Kartlar / Kataloglarım",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js, src/data/tusGlossaryContextualPhraseIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-psodomembranoz-kolit",
    "canonicalTerm": "Psödomembranöz Kolit",
    "displayTerm": "Psödomembranöz Kolit",
    "term": "Psödomembranöz Kolit",
    "aliases": [
      "Psödomembranöz Kolit",
      "C. difficile koliti",
      "antibiyotik ilişkili kolit"
    ],
    "category": "Hastalık / enfeksiyon",
    "subcategory": "Hastalık / enfeksiyon",
    "shortDefinition": "Antibiyotik sonrası Clostridioides difficile toksinleriyle gelişen sulu ishal ve psödomembranlarla seyreden kolittir.",
    "preAnswerSafeDefinition": "Antibiyotik ilişkili kolon inflamasyonunu anlatan enfeksiyöz klinik tablodur.",
    "postAnswerExplanation": "Geniş spektrumlu antibiyotik kullanımı sonrası kötü kokulu/sulu ishal ve lökositoz C. difficile kolitini düşündürür.",
    "tusPearl": "Antibiyotik sonrası ishalde C. difficile toksini yüksek değerli ayırıcı tanıdır.",
    "differentialPoint": "Viral gastroenterit genellikle antibiyotik öyküsü ve psödomembranla ilişkili değildir.",
    "clinicalContext": "Geniş spektrumlu antibiyotik kullanımı sonrası kötü kokulu/sulu ishal ve lökositoz C. difficile kolitini düşündürür.",
    "mechanism": "",
    "relatedTerms": [
      "C. difficile toksinleri",
      "Antibiyotik ilişkili ishal",
      "Psödomembran"
    ],
    "safeNestedTerms": [
      "C. difficile toksinleri",
      "Antibiyotik ilişkili ishal",
      "Psödomembran"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 255,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "high",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Clostridioides difficile antibiyotik sonrası psödomembranöz kolit yapar; duodenal ülser paternini açıklamaz.",
      "Psödomembranöz kolit lehinedir."
    ],
    "candidateAudit": {
      "candidateTerm": "Psödomembranöz Kolit",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 14,
      "sourceArea": "TUS Spot Olgular, Glossary data / tooltip, Klinik Branş Seç",
      "sourceFilePath": "src/data/cases.js, src/data/tusGlossaryClinicalBranchDeepIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-psodomembran",
    "canonicalTerm": "Psödomembran",
    "displayTerm": "Psödomembran",
    "term": "Psödomembran",
    "aliases": [
      "Psödomembran",
      "psödomembranöz"
    ],
    "category": "Patoloji / enfeksiyon",
    "subcategory": "Patoloji / enfeksiyon",
    "shortDefinition": "Mukozal yüzeyde fibrin, nekrotik hücre artıkları ve inflamatuvar eksüdanın oluşturduğu yalancı membran görünümüdür.",
    "preAnswerSafeDefinition": "Mukozal inflamasyon ve nekrotik eksüda ile ilişkili patolojik görünüm kavramıdır.",
    "postAnswerExplanation": "C. difficile koliti ve difteri gibi tablolarda psödomembran kavramı sınavlarda ayırıcı özellik olarak kullanılabilir.",
    "tusPearl": "Psödomembranöz kolit teriminde C. difficile toksinleri ve antibiyotik öyküsü birlikte sorgulanır.",
    "differentialPoint": "Gerçek anatomik membran değil, inflamatuvar eksüda tabakasıdır.",
    "clinicalContext": "C. difficile koliti ve difteri gibi tablolarda psödomembran kavramı sınavlarda ayırıcı özellik olarak kullanılabilir.",
    "mechanism": "",
    "relatedTerms": [
      "Psödomembranöz Kolit",
      "C. difficile toksinleri"
    ],
    "safeNestedTerms": [
      "Psödomembranöz Kolit",
      "C. difficile toksinleri"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 220,
    "isMultiWordTerm": false,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": true,
    "contextRequired": false,
    "phraseOnly": false,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Psödomembran"
    ],
    "candidateAudit": {
      "candidateTerm": "Psödomembran",
      "recommendation": "manual-curated-from-audit",
      "confidenceScore": "manual",
      "occurrenceCount": 0,
      "sourceArea": "Glossary Candidate Audit",
      "sourceFilePath": ""
    }
  },
  {
    "id": "candidate-audit-v293-bronkoskopi",
    "canonicalTerm": "Bronkoskopi",
    "displayTerm": "Bronkoskopi",
    "term": "Bronkoskopi",
    "aliases": [
      "Bronkoskopi",
      "bronkoskopik değerlendirme"
    ],
    "category": "İşlem / pulmonoloji",
    "subcategory": "İşlem / pulmonoloji",
    "shortDefinition": "Hava yollarının endoskopik olarak değerlendirilmesi, örnekleme veya terapötik girişim yapılmasını sağlayan işlemdir.",
    "preAnswerSafeDefinition": "Hava yolu lümeninin doğrudan incelenmesine yönelik endoskopik işlemdir.",
    "postAnswerExplanation": "Yabancı cisim aspirasyonu, hemoptizi, tümör, enfeksiyon örneklemesi ve hava yolu obstrüksiyonu değerlendirmesinde kullanılabilir.",
    "tusPearl": "Çocukta ani öksürük/tek taraflı wheezing yabancı cisim ve bronkoskopi gereksinimini düşündürebilir.",
    "differentialPoint": "BT görüntüleme sağlar; bronkoskopi doğrudan görme ve girişim imkânı verir.",
    "clinicalContext": "Yabancı cisim aspirasyonu, hemoptizi, tümör, enfeksiyon örneklemesi ve hava yolu obstrüksiyonu değerlendirmesinde kullanılabilir.",
    "mechanism": "",
    "relatedTerms": [
      "Hava yolu obstrüksiyonu",
      "Hemoptizi",
      "Yabancı cisim aspirasyonu"
    ],
    "safeNestedTerms": [
      "Hava yolu obstrüksiyonu",
      "Hemoptizi",
      "Yabancı cisim aspirasyonu"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 235,
    "isMultiWordTerm": false,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": true,
    "contextRequired": false,
    "phraseOnly": false,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Rijit bronkoskopi ile yabancı cismin çıkarılması",
      "Kuruyemiş yerken ani öksürük ve morarma atağı, sonrasında tek taraflı azalmış solunum sesi, lokalize hışıltı ve hava hapsi yabancı cisim aspirasyonunu düşündürür. Şüphe güçlü olduğunda tanısal ve terapötik yaklaşım ri..."
    ],
    "candidateAudit": {
      "candidateTerm": "Bronkoskopi",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 20,
      "sourceArea": "Klinik Branş Seç, TUS Spot Olgular",
      "sourceFilePath": "src/data/cases.js"
    }
  },
  {
    "id": "candidate-audit-v293-tiroidektomi",
    "canonicalTerm": "Tiroidektomi",
    "displayTerm": "Tiroidektomi",
    "term": "Tiroidektomi",
    "aliases": [
      "Tiroidektomi",
      "tiroid cerrahisi"
    ],
    "category": "Cerrahi işlem / endokrin cerrahi",
    "subcategory": "Cerrahi işlem / endokrin cerrahi",
    "shortDefinition": "Tiroid bezinin parsiyel veya total cerrahi çıkarılmasıdır.",
    "preAnswerSafeDefinition": "Tiroid bezine yönelik cerrahi rezeksiyon işlemidir.",
    "postAnswerExplanation": "Tiroid malignitesi, büyük guatr, seçilmiş hipertiroidi veya bası semptomlarında uygulanabilir; rekürren laringeal sinir ve hipoparatiroidi komplikasyonları önemlidir.",
    "tusPearl": "Tiroidektomi sonrası ses kısıklığı rekürren laringeal sinir hasarını düşündürür.",
    "differentialPoint": "Radyoaktif iyot cerrahi değildir; tiroidektomi anatomik çıkarma işlemidir.",
    "clinicalContext": "Tiroid malignitesi, büyük guatr, seçilmiş hipertiroidi veya bası semptomlarında uygulanabilir; rekürren laringeal sinir ve hipoparatiroidi komplikasyonları önemlidir.",
    "mechanism": "",
    "relatedTerms": [
      "Nervus laryngeus recurrens lezyonu",
      "Hipokalsemi",
      "Paratiroid"
    ],
    "safeNestedTerms": [
      "Nervus laryngeus recurrens lezyonu",
      "Hipokalsemi",
      "Paratiroid"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 235,
    "isMultiWordTerm": false,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": true,
    "contextRequired": false,
    "phraseOnly": false,
    "answerLeakRisk": "low",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Tiroidektomi sonrası ses kısıklığında hasarlanan siniri belirleyebilme",
      "Multinodüler guatr nedeniyle total tiroidektomi yapıldığı, ameliyattan önce ses kısıklığı olmadığı öğreniliyor. Yutma güçlüğü veya ağız köşesinde kayma tariflemiyor."
    ],
    "candidateAudit": {
      "candidateTerm": "Tiroidektomi",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 20,
      "sourceArea": "Klinik Branş Seç, Glossary data / tooltip",
      "sourceFilePath": "src/data/cases.js, src/data/tusGlossaryExpandedIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-histerektomi",
    "canonicalTerm": "Histerektomi",
    "displayTerm": "Histerektomi",
    "term": "Histerektomi",
    "aliases": [
      "Histerektomi",
      "uterus çıkarılması"
    ],
    "category": "Cerrahi işlem / jinekoloji",
    "subcategory": "Cerrahi işlem / jinekoloji",
    "shortDefinition": "Uterusun cerrahi olarak çıkarılmasıdır.",
    "preAnswerSafeDefinition": "Uterusa yönelik cerrahi çıkarma işlemidir.",
    "postAnswerExplanation": "Obstetrik kanama, malignite, miyom veya refrakter benign hastalıklarda uygulanabilir; fertiliteyi sonlandırır.",
    "tusPearl": "Kontrol edilemeyen postpartum kanamada histerektomi hayat kurtarıcı olabilir.",
    "differentialPoint": "Myomektomi uterusu korur; histerektomi uterusu çıkarır.",
    "clinicalContext": "Obstetrik kanama, malignite, miyom veya refrakter benign hastalıklarda uygulanabilir; fertiliteyi sonlandırır.",
    "mechanism": "",
    "relatedTerms": [
      "Postpartum kanama",
      "Uterus",
      "Cerrahi eksplorasyon"
    ],
    "safeNestedTerms": [
      "Postpartum kanama",
      "Uterus",
      "Cerrahi eksplorasyon"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 220,
    "isMultiWordTerm": false,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": true,
    "contextRequired": false,
    "phraseOnly": false,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Acil histerektomi yapılması",
      "Acil histerektomi hayatı tehdit eden ve konservatif tedavilere yanıtsız kanamalarda düşünülür; ilk basamak değildir."
    ],
    "candidateAudit": {
      "candidateTerm": "Histerektomi",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 16,
      "sourceArea": "Klinik Branş Seç",
      "sourceFilePath": "src/data/cases.js"
    }
  },
  {
    "id": "candidate-audit-v293-kolesistektomi",
    "canonicalTerm": "Kolesistektomi",
    "displayTerm": "Kolesistektomi",
    "term": "Kolesistektomi",
    "aliases": [
      "Kolesistektomi",
      "laparoskopik kolesistektomi"
    ],
    "category": "Cerrahi işlem / genel cerrahi",
    "subcategory": "Cerrahi işlem / genel cerrahi",
    "shortDefinition": "Safra kesesinin cerrahi olarak çıkarılmasıdır.",
    "preAnswerSafeDefinition": "Safra kesesine yönelik cerrahi çıkarma işlemidir.",
    "postAnswerExplanation": "Semptomatik kolelitiazis ve akut kolesistit yönetiminde laparoskopik yaklaşım sık kullanılır.",
    "tusPearl": "Akut kolesistit sonrası uygun zamanda kolesistektomi nüks ve komplikasyonu azaltır.",
    "differentialPoint": "ERCP safra yolu taşında girişimsel endoskopidir; kolesistektomi safra kesesini çıkarır.",
    "clinicalContext": "Semptomatik kolelitiazis ve akut kolesistit yönetiminde laparoskopik yaklaşım sık kullanılır.",
    "mechanism": "",
    "relatedTerms": [
      "Akut Kolesistit",
      "Kolelitiazis",
      "Laparoskopi"
    ],
    "safeNestedTerms": [
      "Akut Kolesistit",
      "Kolelitiazis",
      "Laparoskopi"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 235,
    "isMultiWordTerm": false,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": true,
    "contextRequired": false,
    "phraseOnly": false,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Elektif kolesistektomi için poliklinik takibi",
      "Elektif kolesistektomi akut enfekte obstrüksiyonu hemen çözmez ve sepsis riski olan hastada kaynak kontrolünü geciktirir."
    ],
    "candidateAudit": {
      "candidateTerm": "Kolesistektomi",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 11,
      "sourceArea": "Klinik Branş Seç",
      "sourceFilePath": "src/data/cases.js"
    }
  },
  {
    "id": "candidate-audit-v293-akut-hepatit",
    "canonicalTerm": "Akut Hepatit",
    "displayTerm": "Akut Hepatit",
    "term": "Akut Hepatit",
    "aliases": [
      "Akut Hepatit",
      "akut karaciğer inflamasyonu"
    ],
    "category": "Hastalık / hepatoloji",
    "subcategory": "Hastalık / hepatoloji",
    "shortDefinition": "Hepatosit hasarıyla transaminaz yüksekliği, halsizlik, bulantı ve sarılık oluşturabilen akut karaciğer inflamasyonudur.",
    "preAnswerSafeDefinition": "Karaciğer hücre hasarı ve akut inflamasyonla ilişkili klinik tablodur.",
    "postAnswerExplanation": "Viral, toksik, iskemik veya otoimmün nedenlerle gelişebilir; AST/ALT yüksekliği hepatoselüler paterni destekler.",
    "tusPearl": "Belirgin transaminaz yüksekliği akut hepatoselüler hasar için önemlidir.",
    "differentialPoint": "Kolestazda ALP/GGT ve direkt bilirubin daha baskın olabilir.",
    "clinicalContext": "Viral, toksik, iskemik veya otoimmün nedenlerle gelişebilir; AST/ALT yüksekliği hepatoselüler paterni destekler.",
    "mechanism": "",
    "relatedTerms": [
      "Transaminaz yüksekliği",
      "HBsAg",
      "Karaciğer Yetmezliği"
    ],
    "safeNestedTerms": [
      "Transaminaz yüksekliği",
      "HBsAg",
      "Karaciğer Yetmezliği"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 225,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "low",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Akut hepatit A serolojisinin geçirilmiş enfeksiyon ve hepatit B/C paternlerinden ayrılması",
      "Akut hepatit A"
    ],
    "candidateAudit": {
      "candidateTerm": "Akut Hepatit",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 16,
      "sourceArea": "Diğer eğitim metni, Hap Kartlar / Kataloglarım, TUS Spot Olgular",
      "sourceFilePath": "src/data/tusPearlCards.js, removed-static-seed-source, removed-safe-bank-source"
    }
  },
  {
    "id": "candidate-audit-v293-granulomatoz-polianjiit",
    "canonicalTerm": "Granülomatoz Polianjiit",
    "displayTerm": "Granülomatoz Polianjiit",
    "term": "Granülomatoz Polianjiit",
    "aliases": [
      "Granülomatoz Polianjiit",
      "GPA",
      "Wegener granülomatozu",
      "granulomatosis with polyangiitis"
    ],
    "category": "Hastalık / romatoloji",
    "subcategory": "Hastalık / romatoloji",
    "shortDefinition": "Üst-alt solunum yolu ve böbreği tutabilen, nekrotizan granülomatöz ANCA ilişkili vaskülittir.",
    "preAnswerSafeDefinition": "Granülomatöz inflamasyon ve küçük damar vaskülitiyle ilişkili sistemik hastalıktır.",
    "postAnswerExplanation": "Sinüzit/otit, akciğer nodülü/kavite, hemoptizi ve hızlı ilerleyen glomerülonefrit birlikteliğiyle sorgulanabilir.",
    "tusPearl": "Üst solunum + akciğer + böbrek tutulumu GPA için klasik üçlüdür.",
    "differentialPoint": "Mikroskopik polianjiitte granülomatöz üst solunum yolu tutulumu daha azdır.",
    "clinicalContext": "Sinüzit/otit, akciğer nodülü/kavite, hemoptizi ve hızlı ilerleyen glomerülonefrit birlikteliğiyle sorgulanabilir.",
    "mechanism": "",
    "relatedTerms": [
      "ANCA",
      "Glomerülonefrit",
      "Hemoptizi"
    ],
    "safeNestedTerms": [
      "ANCA",
      "Glomerülonefrit",
      "Hemoptizi"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 255,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "high",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Granülomatoz polianjiit klasik olarak proteinaz-3 hedefli c-ANCA pozitifliği ile ilişkilidir; mikroskopik polianjiit ve EGPA daha çok MPO-ANCA/p-ANCA ile ilişkilendirilebilir, PAN ise tipik olarak ANCA ilişkili değildir.",
      "Granülomatoz polianjiit - PR3-ANCA/c-ANCA"
    ],
    "candidateAudit": {
      "candidateTerm": "Granülomatoz Polianjiit",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 28,
      "sourceArea": "TUS Spot Olgular",
      "sourceFilePath": "src/data/cases.js"
    }
  },
  {
    "id": "candidate-audit-v293-akut-mastoidit",
    "canonicalTerm": "Akut Mastoidit",
    "displayTerm": "Akut Mastoidit",
    "term": "Akut Mastoidit",
    "aliases": [
      "Akut Mastoidit",
      "mastoidit"
    ],
    "category": "Hastalık / KBB",
    "subcategory": "Hastalık / KBB",
    "shortDefinition": "Otitis media sonrası mastoid hava hücrelerinin akut enfeksiyonu ve inflamasyonudur.",
    "preAnswerSafeDefinition": "Orta kulak enfeksiyonu komplikasyonu olarak mastoid bölge inflamasyonunu ifade eder.",
    "postAnswerExplanation": "Kulak arkası şişlik, hassasiyet, kepçe kulakta dışa itilme ve ateşle gelebilir; intrakraniyal komplikasyon riski önemlidir.",
    "tusPearl": "Otitis media sonrası postauriküler şişlik mastoiditi düşündürür.",
    "differentialPoint": "Basit otitte mastoid bölgede belirgin şişlik ve kulak kepçesi itilmesi beklenmez.",
    "clinicalContext": "Kulak arkası şişlik, hassasiyet, kepçe kulakta dışa itilme ve ateşle gelebilir; intrakraniyal komplikasyon riski önemlidir.",
    "mechanism": "",
    "relatedTerms": [
      "Otitis media",
      "Postauriküler şişlik",
      "Menenjit"
    ],
    "safeNestedTerms": [
      "Otitis media",
      "Postauriküler şişlik",
      "Menenjit"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 230,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "low",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Akut mastoidit komplikasyonunu destekler."
    ],
    "candidateAudit": {
      "candidateTerm": "Akut Mastoidit",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 5,
      "sourceArea": "Klinik Branş Seç",
      "sourceFilePath": "src/data/cases.js"
    }
  },
  {
    "id": "candidate-audit-v293-hartnup-hastaligi",
    "canonicalTerm": "Hartnup Hastalığı",
    "displayTerm": "Hartnup Hastalığı",
    "term": "Hartnup Hastalığı",
    "aliases": [
      "Hartnup Hastalığı",
      "Hartnup"
    ],
    "category": "Hastalık / metabolizma",
    "subcategory": "Hastalık / metabolizma",
    "shortDefinition": "Nötral aminoasit transport bozukluğu nedeniyle triptofan emiliminin azaldığı, pellagra benzeri döküntü ve ataksi yapabilen kalıtsal hastalıktır.",
    "preAnswerSafeDefinition": "Aminoasit transportu ve triptofan metabolizmasıyla ilişkili kalıtsal metabolik hastalıktır.",
    "postAnswerExplanation": "Fotosensitif dermatit, ataksi ve nöropsikiyatrik bulgularla gelebilir; niasin eksikliği benzeri tablo oluşturur.",
    "tusPearl": "Pellagra benzeri tablo + nötral aminoasit transport bozukluğu Hartnup hastalığını düşündürür.",
    "differentialPoint": "Sistinüri dibazik aminoasit taşlarıyla ayrılır.",
    "clinicalContext": "Fotosensitif dermatit, ataksi ve nöropsikiyatrik bulgularla gelebilir; niasin eksikliği benzeri tablo oluşturur.",
    "mechanism": "",
    "relatedTerms": [
      "Triptofan",
      "Niasin",
      "Pellagra"
    ],
    "safeNestedTerms": [
      "Triptofan",
      "Niasin",
      "Pellagra"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 245,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "high",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Hartnup hastalığında nötral aminoasit taşıyıcı bozukluğunu pellagra benzeri bulgularla ilişkilendirebilme",
      "Hartnup hastalığını destekler."
    ],
    "candidateAudit": {
      "candidateTerm": "Hartnup Hastalığı",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 5,
      "sourceArea": "Klinik Branş Seç",
      "sourceFilePath": "src/data/cases.js"
    }
  },
  {
    "id": "candidate-audit-v293-nocardia-asteroides-kompleksi",
    "canonicalTerm": "Nocardia asteroides Kompleksi",
    "displayTerm": "Nocardia asteroides Kompleksi",
    "term": "Nocardia asteroides Kompleksi",
    "aliases": [
      "Nocardia asteroides Kompleksi",
      "Nocardia",
      "Nocardia asteroides"
    ],
    "category": "Mikrobiyoloji / bakteri",
    "subcategory": "Mikrobiyoloji / bakteri",
    "shortDefinition": "Zayıf aside dirençli, dallanan filamentöz Gram pozitif bakteri grubudur; immünsüprese hastada pulmoner ve santral sinir sistemi enfeksiyonu yapabilir.",
    "preAnswerSafeDefinition": "Fırsatçı enfeksiyon bağlamında önem taşıyan filamentöz bakteri kompleksidir.",
    "postAnswerExplanation": "Toprak kaynaklı inhalasyon sonrası akciğer hastalığı ve beyin apsesi riskiyle sorgulanabilir; sulfonamid tedavisi klasik bilgidir.",
    "tusPearl": "Zayıf aside dirençli dallanan filamentöz bakteri Nocardia’yı düşündürür.",
    "differentialPoint": "Actinomyces anaerobik ve aside dirençli değildir.",
    "clinicalContext": "Toprak kaynaklı inhalasyon sonrası akciğer hastalığı ve beyin apsesi riskiyle sorgulanabilir; sulfonamid tedavisi klasik bilgidir.",
    "mechanism": "",
    "relatedTerms": [
      "Aside dirençli basil",
      "Fırsatçı enfeksiyon",
      "Beyin apsesi"
    ],
    "safeNestedTerms": [
      "Aside dirençli basil",
      "Fırsatçı enfeksiyon",
      "Beyin apsesi"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 245,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Nocardia asteroides kompleksi",
      "Nocardia asteroides kompleksi immünsüpresyon, akciğer-beyin tutulumu ve zayıf aside dirençli dallanan filamentli yapı ile en uyumlu etkendir."
    ],
    "candidateAudit": {
      "candidateTerm": "Nocardia Asteroides Kompleksi",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 5,
      "sourceArea": "Klinik Branş Seç",
      "sourceFilePath": "src/data/cases.js"
    }
  },
  {
    "id": "candidate-audit-v293-serum-hastaligi",
    "canonicalTerm": "Serum Hastalığı",
    "displayTerm": "Serum Hastalığı",
    "term": "Serum Hastalığı",
    "aliases": [
      "Serum Hastalığı",
      "serum sickness"
    ],
    "category": "İmmünoloji / aşırı duyarlılık",
    "subcategory": "İmmünoloji / aşırı duyarlılık",
    "shortDefinition": "Dolaşan immün komplekslerin dokularda birikmesiyle gelişen tip III aşırı duyarlılık reaksiyonudur.",
    "preAnswerSafeDefinition": "İmmün kompleks aracılı sistemik reaksiyon kavramıdır.",
    "postAnswerExplanation": "Ateş, ürtiker/döküntü, artralji ve lenfadenopati ile ilaç veya yabancı protein maruziyeti sonrası görülebilir.",
    "tusPearl": "İlaç/yabancı serum sonrası ateş + döküntü + artralji tip III reaksiyon ipucudur.",
    "differentialPoint": "Tip I reaksiyon hızlı IgE-mast hücre aracılıdır; serum hastalığı immün kompleks aracılıdır.",
    "clinicalContext": "Ateş, ürtiker/döküntü, artralji ve lenfadenopati ile ilaç veya yabancı protein maruziyeti sonrası görülebilir.",
    "mechanism": "",
    "relatedTerms": [
      "Tip III aşırı duyarlılık",
      "İmmün kompleks birikimi",
      "Kompleman aktivasyonu"
    ],
    "safeNestedTerms": [
      "Tip III aşırı duyarlılık",
      "İmmün kompleks birikimi",
      "Kompleman aktivasyonu"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 245,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "low",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Yanlıştır. Antijen-antikor komplekslerinin çökmesi ve kompleman aktivasyonu Tip III aşırı duyarlılıktır. Serum hastalığı, bazı vaskülitler ve poststreptokokal glomerülonefrit bu mantıkla düşünülür.",
      "Dolaşımdaki immün komplekslerin dokuda birikmesiyle gelişen inflamatuvar hasar tipidir. SLE, serum hastalığı ve poststreptokokal glomerülonefrit Tip III mantığıyla sorulabilir."
    ],
    "candidateAudit": {
      "candidateTerm": "Serum Hastalığı",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 5,
      "sourceArea": "Glossary data / tooltip, TUS Spot Olgular",
      "sourceFilePath": "src/data/tusGlossaryContentCoverageIndex.js, src/data/cases.js"
    }
  },
  {
    "id": "candidate-audit-v293-yapisal-kalp-hastaligi",
    "canonicalTerm": "Yapısal Kalp Hastalığı",
    "displayTerm": "Yapısal Kalp Hastalığı",
    "term": "Yapısal Kalp Hastalığı",
    "aliases": [
      "Yapısal Kalp Hastalığı",
      "structural heart disease"
    ],
    "category": "Kardiyoloji / klinik kavram",
    "subcategory": "Kardiyoloji / klinik kavram",
    "shortDefinition": "Kalbin kapak, miyokard, doğumsal yapı veya odacıklarında anatomik/fonksiyonel bozukluk bulunmasını ifade eder.",
    "preAnswerSafeDefinition": "Ritim ve hemodinamik risk değerlendirmesinde kullanılan kardiyak yapı kavramıdır.",
    "postAnswerExplanation": "Aritmi riskinde ve tedavi seçiminde yapısal kalp hastalığı varlığı prognoz ve ani ölüm riskini etkileyebilir.",
    "tusPearl": "Ventriküler aritmi değerlendirmesinde yapısal kalp hastalığı varlığı kritik risk belirleyicisidir.",
    "differentialPoint": "İzole fonksiyonel çarpıntı yapısal patoloji olmadan da görülebilir.",
    "clinicalContext": "Aritmi riskinde ve tedavi seçiminde yapısal kalp hastalığı varlığı prognoz ve ani ölüm riskini etkileyebilir.",
    "mechanism": "",
    "relatedTerms": [
      "Ventriküler Taşikardi",
      "Ekokardiyografi",
      "Kardiyomiyopati"
    ],
    "safeNestedTerms": [
      "Ventriküler Taşikardi",
      "Ekokardiyografi",
      "Kardiyomiyopati"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 220,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "high",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Yapısal kalp hastalığı ve ventrikül fonksiyonunu değerlendirmek için istenir.",
      "Yapısal kalp hastalığı ve ventrikül disfonksiyonu saptanmaz."
    ],
    "candidateAudit": {
      "candidateTerm": "Yapısal Kalp Hastalığı",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 5,
      "sourceArea": "Klinik Branş Seç / TUS Spot Olgular",
      "sourceFilePath": "src/data/pdfPediatricArrhythmiaCases.js"
    }
  },
  {
    "id": "candidate-audit-v293-sinus-ritmi",
    "canonicalTerm": "Sinüs Ritmi",
    "displayTerm": "Sinüs Ritmi",
    "term": "Sinüs Ritmi",
    "aliases": [
      "Sinüs Ritmi",
      "normal sinüs ritmi",
      "sinus rhythm"
    ],
    "category": "EKG / ritim",
    "subcategory": "EKG / ritim",
    "shortDefinition": "Kalp ritminin sinoatriyal düğüm kaynaklı olduğunu gösteren düzenli P dalgası-QRS ilişkisiyle tanımlanan ritimdir.",
    "preAnswerSafeDefinition": "Kalbin fizyolojik uyarı merkezinden çıktığını gösteren EKG ritim kavramıdır.",
    "postAnswerExplanation": "Her QRS öncesinde uygun P dalgası ve düzenli PR ilişkisi beklenir; hız normal aralıktaysa normal sinüs ritmi denir.",
    "tusPearl": "Sinüs ritmi düzenli P-QRS ilişkisiyle tanınır.",
    "differentialPoint": "Atrial fibrilasyonda düzenli P dalgası ve ritim yoktur.",
    "clinicalContext": "Her QRS öncesinde uygun P dalgası ve düzenli PR ilişkisi beklenir; hız normal aralıktaysa normal sinüs ritmi denir.",
    "mechanism": "",
    "relatedTerms": [
      "P dalgası",
      "QRS kompleksi",
      "Sinüs Taşikardi"
    ],
    "safeNestedTerms": [
      "P dalgası",
      "QRS kompleksi",
      "Sinüs Taşikardi"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 235,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "high",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Bradikardinin sinüs ritmi, AV blok veya uzun QT ilişkisini ayırt etmek için istenir.",
      "Normal sinüs ritmi düşünülerek hiçbir kayıt alınmaması"
    ],
    "candidateAudit": {
      "candidateTerm": "Sinüs Ritmi",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 31,
      "sourceArea": "Klinik Branş Seç / TUS Spot Olgular, Utility / validation / toolbox logic",
      "sourceFilePath": "src/data/pdfPediatricArrhythmiaCases.js, src/utils/investigationOrders.js"
    }
  },
  {
    "id": "candidate-audit-v293-sinus-tasikardi",
    "canonicalTerm": "Sinüs Taşikardi",
    "displayTerm": "Sinüs Taşikardi",
    "term": "Sinüs Taşikardi",
    "aliases": [
      "Sinüs Taşikardi",
      "sinüs taşikardisi"
    ],
    "category": "EKG / ritim",
    "subcategory": "EKG / ritim",
    "shortDefinition": "SA düğüm kaynaklı düzenli ritmin dakikada 100’ün üzerine çıkmasıdır.",
    "preAnswerSafeDefinition": "Sinüs düğümü kaynaklı hızlı ama düzenli ritim kavramıdır.",
    "postAnswerExplanation": "Ateş, ağrı, anemi, hipovolemi, hipoksi veya anksiyete gibi altta yatan nedenlere fizyolojik yanıt olabilir.",
    "tusPearl": "Sinüs taşikardide tedavi çoğunlukla altta yatan nedeni düzeltmeye yöneliktir.",
    "differentialPoint": "SVT genellikle ani başlar ve çok daha hızlı/düzenli dar QRS taşikardidir.",
    "clinicalContext": "Ateş, ağrı, anemi, hipovolemi, hipoksi veya anksiyete gibi altta yatan nedenlere fizyolojik yanıt olabilir.",
    "mechanism": "",
    "relatedTerms": [
      "Sinüs Ritmi",
      "Hipovolemi",
      "Hipoksemi"
    ],
    "safeNestedTerms": [
      "Sinüs Ritmi",
      "Hipovolemi",
      "Hipoksemi"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 235,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "high",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Sinüs taşikardisi ve QRS genişlemesi izlendi.",
      "Sinüs taşikardisinde hız beslenme, ağlama, ateş veya sıvı durumuyla değişir; burada sabit hız ve atriyal flutter dalgaları vardır."
    ],
    "candidateAudit": {
      "candidateTerm": "Sinüs Taşikardi",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 18,
      "sourceArea": "Klinik Branş Seç / TUS Spot Olgular, Klinik Branş Seç, Utility / validation / toolbox logic",
      "sourceFilePath": "src/data/pdfPediatricArrhythmiaCases.js, src/data/cases.js, src/utils/investigationOrders.js"
    }
  },
  {
    "id": "candidate-audit-v293-sinus-bradikardi",
    "canonicalTerm": "Sinüs Bradikardi",
    "displayTerm": "Sinüs Bradikardi",
    "term": "Sinüs Bradikardi",
    "aliases": [
      "Sinüs Bradikardi",
      "sinüs bradikardisi"
    ],
    "category": "EKG / ritim",
    "subcategory": "EKG / ritim",
    "shortDefinition": "SA düğüm kaynaklı düzenli ritmin yaşa göre düşük hızda olmasıdır.",
    "preAnswerSafeDefinition": "Sinüs düğümü kaynaklı yavaş ritim kavramıdır.",
    "postAnswerExplanation": "Uyku, atletik durum, hipotermi, ilaçlar veya hipoksi gibi bağlamlarda görülebilir; semptom/hemodinami önemlidir.",
    "tusPearl": "Bradikardide hemodinamik instabilite varsa acil yaklaşım gerekir.",
    "differentialPoint": "AV blokta iletim bozukluğu ön plandadır; sinüs bradikardide kaynak sinüs düğümüdür.",
    "clinicalContext": "Uyku, atletik durum, hipotermi, ilaçlar veya hipoksi gibi bağlamlarda görülebilir; semptom/hemodinami önemlidir.",
    "mechanism": "",
    "relatedTerms": [
      "Bradikardi",
      "AV blok",
      "Hipotermi"
    ],
    "safeNestedTerms": [
      "Bradikardi",
      "AV blok",
      "Hipotermi"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 230,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "high",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Sinüs bradikardisi izlendi.",
      "Sinüs bradikardisi çoğu kez altta yatan solunum duraklaması, maternal ilaç veya hipotermi gibi bir bağlamın işaretidir."
    ],
    "candidateAudit": {
      "candidateTerm": "Sinüs Bradikardi",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 4,
      "sourceArea": "Klinik Branş Seç / TUS Spot Olgular, Klinik Branş Seç",
      "sourceFilePath": "src/data/pdfPediatricArrhythmiaCases.js, src/data/cases.js"
    }
  },
  {
    "id": "candidate-audit-v293-supraventrikuler-tasikardi",
    "canonicalTerm": "Supraventriküler Taşikardi",
    "displayTerm": "Supraventriküler Taşikardi",
    "term": "Supraventriküler Taşikardi",
    "aliases": [
      "Supraventriküler Taşikardi",
      "SVT"
    ],
    "category": "EKG / ritim",
    "subcategory": "EKG / ritim",
    "shortDefinition": "Ventrikül üstü odak veya reentry mekanizmasıyla gelişen genellikle dar QRS hızlı ritimdir.",
    "preAnswerSafeDefinition": "Ventrikül üstü kaynaklı hızlı ritim bozukluğu kavramıdır.",
    "postAnswerExplanation": "Ani başlangıç-sonlanma, çarpıntı ve düzenli dar QRS taşikardi paterni tipiktir; vagal manevra/adenozin bilgisi sınav değeri taşır.",
    "tusPearl": "Düzenli dar QRS taşikardide SVT düşünülür.",
    "differentialPoint": "Ventriküler taşikardi genellikle geniş QRS ve daha yüksek risk taşır.",
    "clinicalContext": "Ani başlangıç-sonlanma, çarpıntı ve düzenli dar QRS taşikardi paterni tipiktir; vagal manevra/adenozin bilgisi sınav değeri taşır.",
    "mechanism": "",
    "relatedTerms": [
      "Dar QRS taşikardi",
      "Adenozin",
      "Vagal manevra"
    ],
    "safeNestedTerms": [
      "Dar QRS taşikardi",
      "Adenozin",
      "Vagal manevra"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 240,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "low",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Supraventriküler taşikardi ile uyumludur.",
      "Supraventriküler taşikardi yüksek ve çoğunlukla sabit hızla seyreder; burada sorun taşikardi değil stabil bradikardidir."
    ],
    "candidateAudit": {
      "candidateTerm": "Supraventriküler Taşikardi",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 8,
      "sourceArea": "Klinik Branş Seç, Klinik Branş Seç / TUS Spot Olgular",
      "sourceFilePath": "src/data/cases.js, src/data/pdfPediatricArrhythmiaCases.js"
    }
  },
  {
    "id": "candidate-audit-v293-ventrikuler-tasikardi",
    "canonicalTerm": "Ventriküler Taşikardi",
    "displayTerm": "Ventriküler Taşikardi",
    "term": "Ventriküler Taşikardi",
    "aliases": [
      "Ventriküler Taşikardi",
      "VT"
    ],
    "category": "EKG / ritim",
    "subcategory": "EKG / ritim",
    "shortDefinition": "Ventrikül kaynaklı hızlı ritimdir; geniş QRS ve hemodinamik bozulma riskiyle ilişkilidir.",
    "preAnswerSafeDefinition": "Ventriküler kaynaklı ciddi taşiaritmi kavramıdır.",
    "postAnswerExplanation": "Yapısal kalp hastalığı veya iskemi zemininde görülebilir; stabilite ve nabız varlığı yönetimi belirler.",
    "tusPearl": "Geniş QRS taşikardide aksi kanıtlanana kadar ventriküler taşikardi düşünülür.",
    "differentialPoint": "SVT genellikle dar QRS’dir; aberansi varsa ayrım klinik olarak önemlidir.",
    "clinicalContext": "Yapısal kalp hastalığı veya iskemi zemininde görülebilir; stabilite ve nabız varlığı yönetimi belirler.",
    "mechanism": "",
    "relatedTerms": [
      "Geniş QRS taşikardi",
      "Yapısal Kalp Hastalığı",
      "Hemodinamik instabilite"
    ],
    "safeNestedTerms": [
      "Geniş QRS taşikardi",
      "Yapısal Kalp Hastalığı",
      "Hemodinamik instabilite"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 245,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "high",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Monitör alarmı kesin ventriküler taşikardi kabul edilip amiodaron başlanması",
      "Ventriküler taşikardi sürdürülebilir geniş kompleks ritim ve klinik etkilenme ile düşünülür; bu olguda aralıklı erken atımlar ve olası artefakt vardır."
    ],
    "candidateAudit": {
      "candidateTerm": "Ventriküler Taşikardi",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 13,
      "sourceArea": "Klinik Branş Seç / TUS Spot Olgular, Glossary data / tooltip",
      "sourceFilePath": "src/data/pdfPediatricArrhythmiaCases.js, src/data/tusGlossaryExpandedIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-fetal-bradikardi",
    "canonicalTerm": "Fetal Bradikardi",
    "displayTerm": "Fetal Bradikardi",
    "term": "Fetal Bradikardi",
    "aliases": [
      "Fetal Bradikardi",
      "fetal bradikardisi"
    ],
    "category": "Kadın doğum / fetal izlem",
    "subcategory": "Kadın doğum / fetal izlem",
    "shortDefinition": "Fetal kalp hızının beklenen aralığın altına düşmesidir ve fetal hipoksi veya akut fetal kan kaybı gibi durumlarda görülebilir.",
    "preAnswerSafeDefinition": "Fetal kalp hızı izlemiyle ilişkili yavaşlama bulgusudur.",
    "postAnswerExplanation": "Vasa previa, ablasyo plasenta, uterin hiperstimülasyon veya fetal distres bağlamında acil doğum kararını etkileyebilir.",
    "tusPearl": "Membran rüptürü sonrası ağrısız kanama + fetal bradikardi vasa previa açısından kritiktir.",
    "differentialPoint": "Maternal nabızla karıştırılmamalı; fetal monitörizasyon bağlamı önemlidir.",
    "clinicalContext": "Vasa previa, ablasyo plasenta, uterin hiperstimülasyon veya fetal distres bağlamında acil doğum kararını etkileyebilir.",
    "mechanism": "",
    "relatedTerms": [
      "Vasa previa",
      "Fetal distres",
      "Acil doğum"
    ],
    "safeNestedTerms": [
      "Vasa previa",
      "Fetal distres",
      "Acil doğum"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 245,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "high",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Membran rüptürü sonrası ağrısız parlak kanama ile birlikte fetal bradikardi gelişmesi vasa previayı düşündürür. Korunmasız fetal damarların yırtılması fetal kan kaybına yol açtığı için acil doğum planlanmalıdır.",
      "Vasa previada kanama maternal değil fetal kaynaklıdır; fetal bradikardi belirgin uyarıcıdır."
    ],
    "candidateAudit": {
      "candidateTerm": "Fetal Bradikardi",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 9,
      "sourceArea": "Klinik Branş Seç, Hap Kartlar / Kataloglarım, Klinik Branş Seç / TUS Spot Olgular",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js, src/data/pdfPediatricArrhythmiaCases.js"
    }
  },
  {
    "id": "candidate-audit-v293-nervus-laryngeus-recurrens-lezyonu",
    "canonicalTerm": "Nervus laryngeus recurrens lezyonu",
    "displayTerm": "Nervus laryngeus recurrens lezyonu",
    "term": "Nervus laryngeus recurrens lezyonu",
    "aliases": [
      "Nervus laryngeus recurrens lezyonu",
      "rekürren laringeal sinir lezyonu",
      "laryngeus recurrens lezyonu"
    ],
    "category": "Anatomi / periferik sinir",
    "subcategory": "Anatomi / periferik sinir",
    "shortDefinition": "Rekürren laringeal sinirin hasarıdır; ses kısıklığı ve vokal kord paralizisiyle klinik önem kazanır.",
    "preAnswerSafeDefinition": "Larenks motor innervasyonu ile ilişkili sinir hasarı kavramıdır.",
    "postAnswerExplanation": "Tiroid cerrahisi sonrası ses kısıklığı gelişmesi rekürren laringeal sinir yaralanmasını düşündürür.",
    "tusPearl": "Tiroidektomi sonrası ses kısıklığı bu sinir lezyonu için klasik ipucudur.",
    "differentialPoint": "Superior laringeal sinir hasarında yüksek tonlu ses ve krikotiroid kas etkilenir.",
    "clinicalContext": "Tiroid cerrahisi sonrası ses kısıklığı gelişmesi rekürren laringeal sinir yaralanmasını düşündürür.",
    "mechanism": "",
    "relatedTerms": [
      "Tiroidektomi",
      "Vokal kord paralizisi",
      "Ses kısıklığı"
    ],
    "safeNestedTerms": [
      "Tiroidektomi",
      "Vokal kord paralizisi",
      "Ses kısıklığı"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 260,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Nervus laryngeus recurrens lezyonu"
    ],
    "candidateAudit": {
      "candidateTerm": "Nervus laryngeus recurrens lezyonu",
      "recommendation": "manual-curated-from-audit",
      "confidenceScore": "manual",
      "occurrenceCount": 0,
      "sourceArea": "Glossary Candidate Audit",
      "sourceFilePath": ""
    }
  },
  {
    "id": "candidate-audit-v293-vokal-kord-paralizisi",
    "canonicalTerm": "Vokal kord paralizisi",
    "displayTerm": "Vokal kord paralizisi",
    "term": "Vokal kord paralizisi",
    "aliases": [
      "Vokal kord paralizisi"
    ],
    "category": "KBB / muayene bulgusu",
    "subcategory": "KBB / muayene bulgusu",
    "shortDefinition": "Vokal kord hareketinin sinirsel veya mekanik nedenle azalması ya da kaybolmasıdır.",
    "preAnswerSafeDefinition": "Ses üretimi ve larenks hareketiyle ilişkili klinik bulgudur.",
    "postAnswerExplanation": "Rekürren laringeal sinir hasarında tek taraflı vokal kord paralizisi ve ses kısıklığı görülebilir.",
    "tusPearl": "Tiroid cerrahisi sonrası vokal kord paralizisi rekürren sinir hasarını düşündürür.",
    "differentialPoint": "Krikotiroid kas/superior laringeal sinir hasarı daha çok sesin tizliğini etkiler.",
    "clinicalContext": "Rekürren laringeal sinir hasarında tek taraflı vokal kord paralizisi ve ses kısıklığı görülebilir.",
    "mechanism": "",
    "relatedTerms": [
      "Nervus laryngeus recurrens lezyonu",
      "Ses kısıklığı",
      "Tiroidektomi"
    ],
    "safeNestedTerms": [
      "Nervus laryngeus recurrens lezyonu",
      "Ses kısıklığı",
      "Tiroidektomi"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 235,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Vokal kord paralizisi"
    ],
    "candidateAudit": {
      "candidateTerm": "Vokal kord paralizisi",
      "recommendation": "manual-curated-from-audit",
      "confidenceScore": "manual",
      "occurrenceCount": 0,
      "sourceArea": "Glossary Candidate Audit",
      "sourceFilePath": ""
    }
  },
  {
    "id": "candidate-audit-v293-servikal-lenfadenopati",
    "canonicalTerm": "Servikal Lenfadenopati",
    "displayTerm": "Servikal Lenfadenopati",
    "term": "Servikal Lenfadenopati",
    "aliases": [
      "Servikal Lenfadenopati",
      "boyunda lenfadenopati",
      "servikal LAP"
    ],
    "category": "Fizik muayene / baş-boyun",
    "subcategory": "Fizik muayene / baş-boyun",
    "shortDefinition": "Boyun bölgesindeki lenf nodlarının büyümesidir; enfeksiyon, malignite veya inflamatuvar nedenlerle görülebilir.",
    "preAnswerSafeDefinition": "Servikal lenf nodu büyümesini ifade eden muayene bulgusudur.",
    "postAnswerExplanation": "Ağrılı-hareketli nod enfeksiyon, sert-fikse nod malignite açısından daha uyarıcıdır; süre ve sistemik bulgular önemlidir.",
    "tusPearl": "Persistan sert servikal lenfadenopati malignite açısından değerlendirilmelidir.",
    "differentialPoint": "Lenfanjit çizgisel inflamasyonu; lenfadenopati nod büyümesini ifade eder.",
    "clinicalContext": "Ağrılı-hareketli nod enfeksiyon, sert-fikse nod malignite açısından daha uyarıcıdır; süre ve sistemik bulgular önemlidir.",
    "mechanism": "",
    "relatedTerms": [
      "Lenf nodu",
      "Tüberküloz",
      "Lenfoma"
    ],
    "safeNestedTerms": [
      "Lenf nodu",
      "Tüberküloz",
      "Lenfoma"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 225,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Lateral servikal lenfadenopati ön planda değil",
      "Beş gündür yüksek ateşi olan çocukta bilateral nonpürülan konjonktivit, çatlamış dudaklar, yaygın döküntü ve servikal lenfadenopati saptanır. Odak enfeksiyon bulgusu belirgin değildir."
    ],
    "candidateAudit": {
      "candidateTerm": "Servikal Lenfadenopati",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 36,
      "sourceArea": "Klinik Branş Seç, TUS Spot Olgular, Diğer eğitim metni",
      "sourceFilePath": "src/data/cases.js, removed-safe-bank-source, removed-branch-template-source"
    }
  },
  {
    "id": "candidate-audit-v293-spinal-kord-lezyonu",
    "canonicalTerm": "Spinal kord lezyonu",
    "displayTerm": "Spinal kord lezyonu",
    "term": "Spinal kord lezyonu",
    "aliases": [
      "Spinal kord lezyonu",
      "omurilik lezyonu"
    ],
    "category": "Nöroloji / lokalizasyon",
    "subcategory": "Nöroloji / lokalizasyon",
    "shortDefinition": "Omurilik düzeyinde motor, duyusal ve otonomik yolları etkileyen hasar veya patolojidir.",
    "preAnswerSafeDefinition": "Omurilik anatomik lokalizasyonuna bağlı nörolojik defisit kavramıdır.",
    "postAnswerExplanation": "Duyusal seviye, bilateral motor bulgu ve sfinkter etkilenmesi spinal kord düzeyini düşündürür.",
    "tusPearl": "Duyusal seviye spinal kord lezyonu için yüksek değerli lokalizasyon ipucudur.",
    "differentialPoint": "Periferik nöropatide dermatomal seviye ve sfinkter bulgusu beklenmez.",
    "clinicalContext": "Duyusal seviye, bilateral motor bulgu ve sfinkter etkilenmesi spinal kord düzeyini düşündürür.",
    "mechanism": "",
    "relatedTerms": [
      "Duyusal seviye",
      "Motor defisit",
      "Sfinkter disfonksiyonu"
    ],
    "safeNestedTerms": [
      "Duyusal seviye",
      "Motor defisit",
      "Sfinkter disfonksiyonu"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 240,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "low",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Duyusal seviye spinal kord lezyonu veya basısı için önemli lokalizasyon bulgusudur."
    ],
    "candidateAudit": {
      "candidateTerm": "Spinal Kord Lezyonu",
      "recommendation": "mergeWithExisting",
      "confidenceScore": "medium",
      "occurrenceCount": 2,
      "sourceArea": "Glossary data / tooltip",
      "sourceFilePath": "src/data/tusGlossaryContextualPhraseIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-konus-medullaris-lezyonu",
    "canonicalTerm": "Konus medullaris lezyonu",
    "displayTerm": "Konus medullaris lezyonu",
    "term": "Konus medullaris lezyonu",
    "aliases": [
      "Konus medullaris lezyonu",
      "konus medullaris sendromu"
    ],
    "category": "Nöroloji / spinal lokalizasyon",
    "subcategory": "Nöroloji / spinal lokalizasyon",
    "shortDefinition": "Omuriliğin distal konus bölgesini etkileyen, erken sfinkter ve simetrik alt ekstremite bulguları yapabilen lezyondur.",
    "preAnswerSafeDefinition": "Distal spinal kord lokalizasyonuyla ilişkili nörolojik lezyon kavramıdır.",
    "postAnswerExplanation": "Konus medullaris lezyonunda mesane-barsak disfonksiyonu erken olabilir; kauda equina daha asimetrik radiküler ağrı ile ayrılabilir.",
    "tusPearl": "Erken sfinkter disfonksiyonu konus medullaris tutulumunu destekler.",
    "differentialPoint": "Kauda equina periferik kök tutulumudur; konus medullaris spinal kordun son kısmıdır.",
    "clinicalContext": "Konus medullaris lezyonunda mesane-barsak disfonksiyonu erken olabilir; kauda equina daha asimetrik radiküler ağrı ile ayrılabilir.",
    "mechanism": "",
    "relatedTerms": [
      "Kauda equina sendromu",
      "Sfinkter disfonksiyonu",
      "Duyusal seviye"
    ],
    "safeNestedTerms": [
      "Kauda equina sendromu",
      "Sfinkter disfonksiyonu",
      "Duyusal seviye"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 245,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "low",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Konus medullaris lezyonu daha erken sfinkter bulgularıyla ayrılabilir."
    ],
    "candidateAudit": {
      "candidateTerm": "Konus Medullaris Lezyonu",
      "recommendation": "addAsSafeNestedTerm",
      "confidenceScore": "medium",
      "occurrenceCount": 1,
      "sourceArea": "Glossary data / tooltip",
      "sourceFilePath": "src/data/tusGlossarySupplementalIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-kemik-iligi-yetmezligi",
    "canonicalTerm": "Kemik iliği yetmezliği",
    "displayTerm": "Kemik iliği yetmezliği",
    "term": "Kemik iliği yetmezliği",
    "aliases": [
      "Kemik iliği yetmezliği",
      "iliği yetmezliği"
    ],
    "category": "Hematoloji / klinik tablo",
    "subcategory": "Hematoloji / klinik tablo",
    "shortDefinition": "Kemik iliğinin yeterli kan hücresi üretememesiyle sitopeniler oluşturan tablodur.",
    "preAnswerSafeDefinition": "Hematopoetik üretim yetersizliğini anlatan klinik kavramdır.",
    "postAnswerExplanation": "Pansitopeni, enfeksiyon eğilimi, kanama ve anemi bulguları görülebilir; lösemi, aplastik anemi ve infiltratif süreçler ayırıcı tanıdadır.",
    "tusPearl": "Anemide retikülosit yanıtının yetersizliği üretim bozukluğunu destekler.",
    "differentialPoint": "Hemolizde üretim artarsa retikülositoz beklenir.",
    "clinicalContext": "Pansitopeni, enfeksiyon eğilimi, kanama ve anemi bulguları görülebilir; lösemi, aplastik anemi ve infiltratif süreçler ayırıcı tanıdadır.",
    "mechanism": "",
    "relatedTerms": [
      "Retikülositoz",
      "Pansitopeni",
      "Blast"
    ],
    "safeNestedTerms": [
      "Retikülositoz",
      "Pansitopeni",
      "Blast"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 245,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "high",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Akut lenfoblastik lösemiyi kemik iliği yetmezliği, organomegali ve blast varlığıyla tanıyabilme",
      "Talassemi taşıyıcılığı mikrositozla seyreder; akut blastlı kemik iliği yetmezliği tablosunu açıklamaz."
    ],
    "candidateAudit": {
      "candidateTerm": "Kemik Iliği Yetmezliği",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 4,
      "sourceArea": "Klinik Branş Seç, Hap Kartlar / Kataloglarım",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js"
    }
  },
  {
    "id": "candidate-audit-v293-b12-eksikligi",
    "canonicalTerm": "B12 Eksikliği",
    "displayTerm": "B12 Eksikliği",
    "term": "B12 Eksikliği",
    "aliases": [
      "B12 Eksikliği",
      "vitamin B12 eksikliği",
      "kobalamin eksikliği"
    ],
    "category": "Vitamin / hematoloji",
    "subcategory": "Vitamin / hematoloji",
    "shortDefinition": "DNA sentezi bozukluğu nedeniyle megaloblastik anemi ve nörolojik tutulum oluşturabilen kobalamin eksikliğidir.",
    "preAnswerSafeDefinition": "Hematopoez ve sinir sistemiyle ilişkili vitamin eksikliği kavramıdır.",
    "postAnswerExplanation": "Makrositoz, hipersegmente nötrofil, glossit ve posterior kolon/lateral kortikospinal trakt tutulumuyla gelebilir.",
    "tusPearl": "B12 eksikliğinde nörolojik bulgu folat eksikliğinden ayırıcıdır.",
    "differentialPoint": "Folat eksikliğinde nörolojik tutulum beklenmez.",
    "clinicalContext": "Makrositoz, hipersegmente nötrofil, glossit ve posterior kolon/lateral kortikospinal trakt tutulumuyla gelebilir.",
    "mechanism": "",
    "relatedTerms": [
      "Megaloblastik anemi",
      "Nörolojik tutulum",
      "Folik asit"
    ],
    "safeNestedTerms": [
      "Megaloblastik anemi",
      "Nörolojik tutulum",
      "Folik asit"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 240,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Vitamin B12 eksikliği anemisi",
      "Vitamin B12 eksikliği genellikle makrositik anemi ve nörolojik bulgularla seyreder; bu hastada MCV düşüktür."
    ],
    "candidateAudit": {
      "candidateTerm": "B12 Eksikliği",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 44,
      "sourceArea": "Hap Kartlar / Kataloglarım, TUS Spot Olgular, Glossary data / tooltip",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js, src/data/tusGlossaryClinicalBranchDeepIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-d-vitamini-eksikligi",
    "canonicalTerm": "D Vitamini Eksikliği",
    "displayTerm": "D Vitamini Eksikliği",
    "term": "D Vitamini Eksikliği",
    "aliases": [
      "D Vitamini Eksikliği",
      "vitamin D eksikliği"
    ],
    "category": "Vitamin / metabolizma",
    "subcategory": "Vitamin / metabolizma",
    "shortDefinition": "Kalsiyum-fosfor homeostazını bozarak çocukta raşitizm, erişkinde osteomalazi ve sekonder hiperparatiroidi oluşturabilen eksikliktir.",
    "preAnswerSafeDefinition": "Kemik mineralizasyonu ve kalsiyum metabolizmasıyla ilişkili vitamin eksikliğidir.",
    "postAnswerExplanation": "Düşük D vitamini PTH artışı, hipokalsemi/hipofosfatemi eğilimi ve kemik mineralizasyon bozukluğu yapabilir.",
    "tusPearl": "Çocukta raşitizm, erişkinde osteomalazi D vitamini eksikliğiyle ilişkilidir.",
    "differentialPoint": "Hipoparatiroidide PTH düşükken D vitamini eksikliğinde PTH sekonder artabilir.",
    "clinicalContext": "Düşük D vitamini PTH artışı, hipokalsemi/hipofosfatemi eğilimi ve kemik mineralizasyon bozukluğu yapabilir.",
    "mechanism": "",
    "relatedTerms": [
      "PTH",
      "Hipokalsemi",
      "Raşitizm"
    ],
    "safeNestedTerms": [
      "PTH",
      "Hipokalsemi",
      "Raşitizm"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 235,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "D vitamini eksikliği raşitizminde mineralizasyon bozukluğu bulgularını klinik ve laboratuvarla tanıyabilme",
      "D vitamini eksikliğini destekler."
    ],
    "candidateAudit": {
      "candidateTerm": "D Vitamini Eksikliği",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 12,
      "sourceArea": "Klinik Branş Seç, TUS Spot Olgular",
      "sourceFilePath": "src/data/cases.js"
    }
  },
  {
    "id": "candidate-audit-v293-alfa-1-antitripsin-eksikligi",
    "canonicalTerm": "Alfa-1 Antitripsin Eksikliği",
    "displayTerm": "Alfa-1 Antitripsin Eksikliği",
    "term": "Alfa-1 Antitripsin Eksikliği",
    "aliases": [
      "Alfa-1 Antitripsin Eksikliği",
      "A1AT eksikliği",
      "alfa 1 antitripsin eksikliği"
    ],
    "category": "Genetik / pulmonoloji-hepatoloji",
    "subcategory": "Genetik / pulmonoloji-hepatoloji",
    "shortDefinition": "Nötrofil elastaz aktivitesinin kontrolsüz kalmasıyla erken panasinüler amfizem ve karaciğer hastalığı yapabilen kalıtsal hastalıktır.",
    "preAnswerSafeDefinition": "Proteaz-antiproteaz dengesiyle ilişkili genetik hastalık kavramıdır.",
    "postAnswerExplanation": "Genç yaşta bazal panasinüler amfizem ve karaciğer sirozu birlikteliği alfa-1 antitripsin eksikliğini düşündürür.",
    "tusPearl": "Erken amfizem + karaciğer tutulumu bu eksiklik için klasik ipucudur.",
    "differentialPoint": "Sigara ilişkili KOAH daha çok sentriasiner amfizem ve üst lob ağırlığıyla ilişkilidir.",
    "clinicalContext": "Genç yaşta bazal panasinüler amfizem ve karaciğer sirozu birlikteliği alfa-1 antitripsin eksikliğini düşündürür.",
    "mechanism": "",
    "relatedTerms": [
      "Panasinüler amfizem",
      "Karaciğer Yetmezliği",
      "Nötrofil elastaz"
    ],
    "safeNestedTerms": [
      "Panasinüler amfizem",
      "Karaciğer Yetmezliği",
      "Nötrofil elastaz"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 245,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Yanlıştır. Alfa-1 antitripsin fazlalığı kistik fibrozis mekanizması değildir. Alfa-1 antitripsin eksikliği panasinir amfizem ve karaciğer hastalığı ile ilişkilidir.",
      "Alfa-1 antitripsin eksikliği"
    ],
    "candidateAudit": {
      "candidateTerm": "Alfa-1 Antitripsin Eksikliği",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 21,
      "sourceArea": "TUS Spot Olgular, Hap Kartlar / Kataloglarım",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js"
    }
  },
  {
    "id": "candidate-audit-v293-tiamin-eksikligi",
    "canonicalTerm": "Tiamin Eksikliği",
    "displayTerm": "Tiamin Eksikliği",
    "term": "Tiamin Eksikliği",
    "aliases": [
      "Tiamin Eksikliği",
      "vitamin B1 eksikliği",
      "B1 eksikliği"
    ],
    "category": "Vitamin / metabolizma",
    "subcategory": "Vitamin / metabolizma",
    "shortDefinition": "Tiamin eksikliği karbonhidrat metabolizmasını ve sinir sistemi fonksiyonunu bozarak beriberi veya Wernicke ensefalopatisi yapabilir.",
    "preAnswerSafeDefinition": "Enerji metabolizması ve nörolojik fonksiyonla ilişkili vitamin eksikliği kavramıdır.",
    "postAnswerExplanation": "Alkol kullanım bozukluğu veya malnütrisyon bağlamında konfüzyon, oftalmopleji ve ataksi Wernicke ensefalopatisini düşündürür.",
    "tusPearl": "Glukoz verilmeden önce tiamin verilmesi Wernicke riskinde önemlidir.",
    "differentialPoint": "B12 eksikliği megaloblastik anemi ve posterior kolon tutulumuyla ayrılır.",
    "clinicalContext": "Alkol kullanım bozukluğu veya malnütrisyon bağlamında konfüzyon, oftalmopleji ve ataksi Wernicke ensefalopatisini düşündürür.",
    "mechanism": "",
    "relatedTerms": [
      "Wernicke ensefalopatisi",
      "Piruvat dehidrogenaz",
      "Laktik asit"
    ],
    "safeNestedTerms": [
      "Wernicke ensefalopatisi",
      "Piruvat dehidrogenaz",
      "Laktik asit"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 240,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "low",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Pirüvat dehidrogenaz ve alfa-ketoglutarat dehidrogenaz gibi enzimlerde kullanılan B1 vitamini türevi kofaktördür. Tiamin eksikliğinde oksidatif dekarboksilasyon bozulur, laktat artabilir.",
      "Tiamin eksikliğinde oksidatif dekarboksilasyon bozulur, laktat artabilir."
    ],
    "candidateAudit": {
      "candidateTerm": "Tiamin Eksikliği",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 15,
      "sourceArea": "Glossary data / tooltip, Hap Kartlar / Kataloglarım",
      "sourceFilePath": "src/data/tusGlossaryExpandedIndex.js, src/data/tusPearlCards.js, src/data/tusGlossaryClinicalBranchDeepIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-biotinidaz-eksikligi",
    "canonicalTerm": "Biotinidaz Eksikliği",
    "displayTerm": "Biotinidaz Eksikliği",
    "term": "Biotinidaz Eksikliği",
    "aliases": [
      "Biotinidaz Eksikliği"
    ],
    "category": "Metabolik hastalık / biyokimya",
    "subcategory": "Metabolik hastalık / biyokimya",
    "shortDefinition": "Biotinin geri kazanımını bozan, nöbet, dermatit, alopesi ve gelişim geriliği yapabilen kalıtsal metabolik hastalıktır.",
    "preAnswerSafeDefinition": "Biotin metabolizmasıyla ilişkili yenidoğan tarama hastalığıdır.",
    "postAnswerExplanation": "Erken tanı ve biotin replasmanı ile nörolojik hasar önlenebilir.",
    "tusPearl": "Nöbet + dermatit + alopesi biyotinidaz eksikliği için ipucu olabilir.",
    "differentialPoint": "Fenilketonüride fenilalanin birikimi ve hipopigmentasyon daha belirgindir.",
    "clinicalContext": "Erken tanı ve biotin replasmanı ile nörolojik hasar önlenebilir.",
    "mechanism": "",
    "relatedTerms": [
      "Biotin",
      "Yenidoğan taraması",
      "Nöbet"
    ],
    "safeNestedTerms": [
      "Biotin",
      "Yenidoğan taraması",
      "Nöbet"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 235,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Biotinidaz eksikliği.",
      "Çinko eksikliği dermatit yapabilir ancak nöbet ve biyotin yanıtı biotinidaz eksikliğini destekler."
    ],
    "candidateAudit": {
      "candidateTerm": "Biotinidaz Eksikliği",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 5,
      "sourceArea": "Hap Kartlar / Kataloglarım",
      "sourceFilePath": "src/data/tusPearlCards.js"
    }
  },
  {
    "id": "candidate-audit-v293-fruktoz-1-6-bisfosfataz-eksikligi",
    "canonicalTerm": "Fruktoz-1,6-bisfosfataz Eksikliği",
    "displayTerm": "Fruktoz-1,6-bisfosfataz Eksikliği",
    "term": "Fruktoz-1,6-bisfosfataz Eksikliği",
    "aliases": [
      "Fruktoz-1,6-bisfosfataz Eksikliği",
      "fruktoz 1,6 bisfosfataz eksikliği",
      "F1,6BPaz eksikliği",
      "6-bisfosfataz eksikliği"
    ],
    "category": "Metabolik hastalık / biyokimya",
    "subcategory": "Metabolik hastalık / biyokimya",
    "shortDefinition": "Glukoneogenez basamağı bozukluğu nedeniyle açlıkta hipoglisemi ve laktik asidoz yapabilen kalıtsal enzim eksikliğidir.",
    "preAnswerSafeDefinition": "Glukoneogenez yoluyla ilişkili metabolik enzim eksikliğidir.",
    "postAnswerExplanation": "Uzamış açlık veya enfeksiyon sonrası hipoglisemi, laktik asidoz ve ketozis görülebilir.",
    "tusPearl": "Açlıkla tetiklenen hipoglisemi + laktik asidoz glukoneogenez defektini düşündürür.",
    "differentialPoint": "Glikojen depo hastalıklarında hepatomegali ve glikojen yıkım bozukluğu öne çıkabilir.",
    "clinicalContext": "Uzamış açlık veya enfeksiyon sonrası hipoglisemi, laktik asidoz ve ketozis görülebilir.",
    "mechanism": "",
    "relatedTerms": [
      "Glukoneogenez",
      "Hipoglisemi",
      "Laktik asit"
    ],
    "safeNestedTerms": [
      "Glukoneogenez",
      "Hipoglisemi",
      "Laktik asit"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 245,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Fruktoz-1,6-bisfosfataz Eksikliği"
    ],
    "candidateAudit": {
      "candidateTerm": "Fruktoz-1,6-bisfosfataz Eksikliği",
      "recommendation": "manual-curated-from-audit",
      "confidenceScore": "manual",
      "occurrenceCount": 0,
      "sourceArea": "Glossary Candidate Audit",
      "sourceFilePath": ""
    }
  },
  {
    "id": "candidate-audit-v293-kas-glikojen-fosforilaz-eksikligi",
    "canonicalTerm": "Kas Glikojen Fosforilaz Eksikliği",
    "displayTerm": "Kas Glikojen Fosforilaz Eksikliği",
    "term": "Kas Glikojen Fosforilaz Eksikliği",
    "aliases": [
      "Kas Glikojen Fosforilaz Eksikliği",
      "McArdle hastalığı",
      "myophosphorylase eksikliği"
    ],
    "category": "Metabolik hastalık / biyokimya",
    "subcategory": "Metabolik hastalık / biyokimya",
    "shortDefinition": "İskelet kasında glikojen yıkımının bozulduğu McArdle hastalığıdır; egzersiz intoleransı ve miyoglobinüri yapabilir.",
    "preAnswerSafeDefinition": "Kas glikojen metabolizmasıyla ilişkili enzim eksikliği kavramıdır.",
    "postAnswerExplanation": "Egzersizle kas ağrısı, kramplar ve second-wind fenomeni klasik bilgidir.",
    "tusPearl": "Second-wind fenomeni McArdle hastalığı için yüksek değerli ipucudur.",
    "differentialPoint": "CPT-II eksikliği uzun süreli egzersiz/açlıkla yağ asidi oksidasyonu üzerinden ayrılır.",
    "clinicalContext": "Egzersizle kas ağrısı, kramplar ve second-wind fenomeni klasik bilgidir.",
    "mechanism": "",
    "relatedTerms": [
      "Glikojen yıkımı",
      "Egzersiz intoleransı",
      "Miyoglobinüri"
    ],
    "safeNestedTerms": [
      "Glikojen yıkımı",
      "Egzersiz intoleransı",
      "Miyoglobinüri"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 245,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "low",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Kas glikojen fosforilaz eksikliği egzersiz intoleransı ve kas kramplarıyla seyreder; karaciğer kaynaklı açlık hipoglisemisini açıklamaz.",
      "Yanlıştır. Kas glikojen fosforilaz eksikliği McArdle hastalığıyla ilişkilidir. Bu tabloda egzersiz intoleransı ve kas krampları öne çıkar; Von Gierke’nin temel mekanizması değildir."
    ],
    "candidateAudit": {
      "candidateTerm": "Kas Glikojen Fosforilaz Eksikliği",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 6,
      "sourceArea": "Hap Kartlar / Kataloglarım, TUS Spot Olgular, Klinik Branş Seç",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js"
    }
  },
  {
    "id": "candidate-audit-v293-intravenoz-dekstroz",
    "canonicalTerm": "İntravenöz Dekstroz",
    "displayTerm": "İntravenöz Dekstroz",
    "term": "İntravenöz Dekstroz",
    "aliases": [
      "İntravenöz Dekstroz",
      "IV dekstroz",
      "dekstroz infüzyonu",
      "intravenöz glukoz"
    ],
    "category": "Tedavi / acil",
    "subcategory": "Tedavi / acil",
    "shortDefinition": "Ağır veya oral alımı güvenli olmayan hipoglisemide kan glukozunu hızlı yükseltmek için kullanılan parenteral glukoz tedavisidir.",
    "preAnswerSafeDefinition": "Glukoz düzeyini hızlı düzeltmek için damar yoluyla verilen dekstroz tedavisidir.",
    "postAnswerExplanation": "Bilinç değişikliği veya ağır semptomlu hipoglisemide oral karbonhidrat yerine IV dekstroz gerekebilir.",
    "tusPearl": "Bilinç bozukluğu olan hipoglisemide parenteral glukoz yaklaşımı önemlidir.",
    "differentialPoint": "Glukagon damar yolu yoksa alternatif olabilir; dekstroz doğrudan glukoz sağlar.",
    "clinicalContext": "Bilinç değişikliği veya ağır semptomlu hipoglisemide oral karbonhidrat yerine IV dekstroz gerekebilir.",
    "mechanism": "",
    "relatedTerms": [
      "Hipoglisemi",
      "Glukoz",
      "Tiamin Eksikliği"
    ],
    "safeNestedTerms": [
      "Hipoglisemi",
      "Glukoz",
      "Tiamin Eksikliği"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 245,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "high",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "İntravenöz dekstroz bolusu uygulanması",
      "Nöbet sonrası bilinç etkilenimi olan çocukta kapiller glukozun 32 mg/dL saptanması semptomatik ciddi hipoglisemiyi gösterir. Bilinci tam açık olmayan hastada oral alım aspirasyon riski taşır; ilk tedavi intravenöz dek..."
    ],
    "candidateAudit": {
      "candidateTerm": "İntravenöz Dekstroz",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 18,
      "sourceArea": "Klinik Branş Seç, Hap Kartlar / Kataloglarım",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js"
    }
  },
  {
    "id": "candidate-audit-v293-hipovolemi",
    "canonicalTerm": "Hipovolemi",
    "displayTerm": "Hipovolemi",
    "term": "Hipovolemi",
    "aliases": [
      "Hipovolemi",
      "volüm kaybı",
      "hacim kaybı"
    ],
    "category": "Genel klinik kavram",
    "subcategory": "Genel klinik kavram",
    "shortDefinition": "Damar içi efektif hacmin azalmasıdır; taşikardi, hipotansiyon ve doku hipoperfüzyonu oluşturabilir.",
    "preAnswerSafeDefinition": "Dolaşımdaki efektif hacim azalmasını ifade eden hemodinamik kavramdır.",
    "postAnswerExplanation": "Kanama, sıvı kaybı, kusma/ishal veya üçüncü boşluk kaybı hipovolemiye yol açabilir; prerenal azotemiyle ilişkilidir.",
    "tusPearl": "Prerenal azotemide hipovolemi ve böbrek perfüzyon azalması birlikte düşünülür.",
    "differentialPoint": "Hipervolemi ödem/konjesyonla seyreder; hipovolemi hacim kaybıdır.",
    "clinicalContext": "Kanama, sıvı kaybı, kusma/ishal veya üçüncü boşluk kaybı hipovolemiye yol açabilir; prerenal azotemiyle ilişkilidir.",
    "mechanism": "",
    "relatedTerms": [
      "Prerenal azotemi",
      "Şok",
      "Taşikardi"
    ],
    "safeNestedTerms": [
      "Prerenal azotemi",
      "Şok",
      "Taşikardi"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 225,
    "isMultiWordTerm": false,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": true,
    "contextRequired": false,
    "phraseOnly": false,
    "answerLeakRisk": "low",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Mukozaların nemli olması ve ödem olmaması belirgin hipovolemi veya hipervolemi lehine değildir.",
      "Hipovolemi ve şiddet riski açısından önemlidir."
    ],
    "candidateAudit": {
      "candidateTerm": "Hipovolemi",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 21,
      "sourceArea": "Klinik Branş Seç, Glossary data / tooltip, TUS Spot Olgular",
      "sourceFilePath": "src/data/cases.js, src/data/tusGlossaryContentCoverageIndex.js, src/utils/glossary.js"
    }
  },
  {
    "id": "candidate-audit-v293-hiperlipidemi",
    "canonicalTerm": "Hiperlipidemi",
    "displayTerm": "Hiperlipidemi",
    "term": "Hiperlipidemi",
    "aliases": [
      "Hiperlipidemi",
      "dislipidemi"
    ],
    "category": "Laboratuvar / metabolizma",
    "subcategory": "Laboratuvar / metabolizma",
    "shortDefinition": "Serum lipid düzeylerinin artmasıdır; ateroskleroz ve pankreatit riskiyle ilişkilidir.",
    "preAnswerSafeDefinition": "Lipid metabolizması ve kardiyovasküler riskle ilişkili laboratuvar kavramıdır.",
    "postAnswerExplanation": "LDL yüksekliği ateroskleroz riskini, çok yüksek trigliserid akut pankreatit riskini artırabilir.",
    "tusPearl": "LDL ateroskleroz; çok yüksek trigliserid pankreatit açısından önemlidir.",
    "differentialPoint": "Hiperkolesterolemi ve hipertrigliseridemi alt tipleri farklı riskler taşır.",
    "clinicalContext": "LDL yüksekliği ateroskleroz riskini, çok yüksek trigliserid akut pankreatit riskini artırabilir.",
    "mechanism": "",
    "relatedTerms": [
      "LDL",
      "Trigliserid",
      "Ateroskleroz"
    ],
    "safeNestedTerms": [
      "LDL",
      "Trigliserid",
      "Ateroskleroz"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 220,
    "isMultiWordTerm": false,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": true,
    "contextRequired": false,
    "phraseOnly": false,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Nefrotik sendrom glomerüler filtrasyon bariyerinde protein geçirgenliğinin artmasıyla gelişir. Masif proteinüri hipoalbüminemiye, plazma onkotik basıncında azalmaya ve ödem oluşumuna yol açar; hiperlipidemi ve tromboz...",
      "Hiperlipidemi nefrotik sendromda beklenmeyen bir bulgudur"
    ],
    "candidateAudit": {
      "candidateTerm": "Hiperlipidemi",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 28,
      "sourceArea": "TUS Spot Olgular, Glossary data / tooltip, Klinik Branş Seç / TUS Spot Olgular",
      "sourceFilePath": "src/data/cases.js, src/data/tusGlossaryCaseDerivedIndex.js, src/data/tusGlossaryClinicalBranchDeepIndex.js"
    }
  },
  {
    "id": "candidate-audit-v293-hiperinsulinemi",
    "canonicalTerm": "Hiperinsülinemi",
    "displayTerm": "Hiperinsülinemi",
    "term": "Hiperinsülinemi",
    "aliases": [
      "Hiperinsülinemi",
      "yüksek insülin"
    ],
    "category": "Laboratuvar / endokrinoloji",
    "subcategory": "Laboratuvar / endokrinoloji",
    "shortDefinition": "Kanda insülin düzeyinin artmasıdır; insülin direnci veya insülinoma gibi durumlarla ilişkili olabilir.",
    "preAnswerSafeDefinition": "İnsülin salınımı veya etkisiyle ilişkili hormonal laboratuvar kavramıdır.",
    "postAnswerExplanation": "İnsülin direncinde kompansatuvar hiperinsülinemi gelişebilir; hipoglisemiyle birlikteliği insülinoma/ekzojen insülin ayrımı gerektirir.",
    "tusPearl": "Hipoglisemi sırasında yüksek insülin, C-peptid ile birlikte yorumlanır.",
    "differentialPoint": "Ekzojen insülinde C-peptid düşük; endojen hiperinsülinizmde yüksek olabilir.",
    "clinicalContext": "İnsülin direncinde kompansatuvar hiperinsülinemi gelişebilir; hipoglisemiyle birlikteliği insülinoma/ekzojen insülin ayrımı gerektirir.",
    "mechanism": "",
    "relatedTerms": [
      "İnsülin direnci",
      "C-peptid",
      "Hipoglisemi"
    ],
    "safeNestedTerms": [
      "İnsülin direnci",
      "C-peptid",
      "Hipoglisemi"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 225,
    "isMultiWordTerm": false,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": true,
    "contextRequired": false,
    "phraseOnly": false,
    "answerLeakRisk": "high",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "Diyabetik anne bebeklerinde fetal hiperinsülinemi nedeniyle erken neonatal hipoglisemi gelişebilir. Titreme ve emme zayıflığı gibi semptomlarla birlikte belirgin düşük glukoz varsa intravenöz dekstroz tedavisi gecikti...",
      "PCOS’ta insülin direnci ve hiperinsülinemi over teka hücrelerinde androjen sentezini artırabilir ve karaciğerde SHBG üretimini azaltarak serbest androjen düzeyini yükseltebilir. LH baskınlığı da teka hücresi androjen ..."
    ],
    "candidateAudit": {
      "candidateTerm": "Hiperinsülinemi",
      "recommendation": "addNewEntry",
      "confidenceScore": "high",
      "occurrenceCount": 16,
      "sourceArea": "TUS Spot Olgular, Klinik Branş Seç",
      "sourceFilePath": "src/data/cases.js"
    }
  },
  {
    "id": "candidate-audit-v293-mr-difuzyon-kisitliligi",
    "canonicalTerm": "MR difüzyon kısıtlılığı",
    "displayTerm": "MR difüzyon kısıtlılığı",
    "term": "MR difüzyon kısıtlılığı",
    "aliases": [
      "MR difüzyon kısıtlılığı",
      "DWI kısıtlılığı",
      "difüzyon kısıtlılığı"
    ],
    "category": "Görüntüleme / nöroloji",
    "subcategory": "Görüntüleme / nöroloji",
    "shortDefinition": "MR difüzyon görüntülemede su hareketinin kısıtlanmasıdır; akut iskemi ve bazı hücresel lezyonlarda görülebilir.",
    "preAnswerSafeDefinition": "Difüzyon ağırlıklı MR’da doku su hareketini değerlendiren görüntüleme bulgusudur.",
    "postAnswerExplanation": "Akut iskemik inmede erken dönemde difüzyon kısıtlılığı yüksek değer taşır.",
    "tusPearl": "Ani nörolojik defisitte difüzyon kısıtlılığı akut iskemiyi destekler.",
    "differentialPoint": "T2/FLAIR değişiklikleri zamanla gelişebilir; DWI erken iskemiye duyarlıdır.",
    "clinicalContext": "Akut iskemik inmede erken dönemde difüzyon kısıtlılığı yüksek değer taşır.",
    "mechanism": "",
    "relatedTerms": [
      "Akut iskemik inme",
      "MR",
      "İskemi"
    ],
    "safeNestedTerms": [
      "Akut iskemik inme",
      "MR",
      "İskemi"
    ],
    "unsafeNestedTerms": [],
    "relatedBranches": [],
    "matchingPriority": 240,
    "isMultiWordTerm": true,
    "isGenericConcept": false,
    "isContextSensitive": false,
    "standaloneSafe": false,
    "contextRequired": false,
    "phraseOnly": true,
    "answerLeakRisk": "medium",
    "nestedGlossaryAllowed": true,
    "sourceTextExamples": [
      "MR difüzyon kısıtlılığı"
    ],
    "candidateAudit": {
      "candidateTerm": "MR difüzyon kısıtlılığı",
      "recommendation": "manual-curated-from-audit",
      "confidenceScore": "manual",
      "occurrenceCount": 0,
      "sourceArea": "Glossary Candidate Audit",
      "sourceFilePath": ""
    }
  }
];
