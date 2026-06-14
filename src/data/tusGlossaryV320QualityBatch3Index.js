// V320 — Quality-preserved glossary additions from V317 Batch 3 candidate audit.
// Source: glossary-v317-quality-preserved-batch3(1).json
// Accepted entries are exact-missing, teachable, and filtered against the V319 active glossary aliases.
// Keep this layer data-only; matching behavior stays centralized in src/utils/glossary.js.

export const TUS_GLOSSARY_V320_QUALITY_BATCH3_TERMS = [
  {
    "id": "v320-quality-batch3-vasa-previa",
    "term": "Vasa previa",
    "aliases": [
      "vasa previya",
      "vasa previa",
      "Vasa previa"
    ],
    "normalizedTerm": "vasa previa",
    "TurkishName": "Vasa previa",
    "EnglishName": "",
    "category": "Kadın doğum / obstetrik acil",
    "subcategory": "Plasental damar anomalisi",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Fetal damarların plasenta veya kordon koruması olmadan internal os yakınından geçmesiyle membran rüptüründe fetal kanamaya yol açabilen acil obstetrik tablodur.",
    "preAnswerSafeDefinition": "Vasa previa, gebelik veya fetal değerlendirme bağlamında klinik karar ve risk yorumuyla ilişkili tıbbi kavramdır.",
    "shortDefinition": "Fetal damarların plasenta veya kordon koruması olmadan internal os yakınından geçmesiyle membran rüptüründe fetal kanamaya yol açabilen acil obstetrik tablodur.",
    "definition": "Fetal damarların plasenta veya kordon koruması olmadan internal os yakınından geçmesiyle membran rüptüründe fetal kanamaya yol açabilen acil obstetrik tablodur.",
    "detailedExplanation": "Vasa previada kanama maternal değil fetal kaynaklı olabilir; bu nedenle membran rüptürü sonrası ağrısız kanama ve fetal bradikardi birlikteyse hızlı doğum kararı kritik hale gelir.",
    "postAnswerExplanation": "Vasa previada kanama maternal değil fetal kaynaklı olabilir; bu nedenle membran rüptürü sonrası ağrısız kanama ve fetal bradikardi birlikteyse hızlı doğum kararı kritik hale gelir.",
    "postAnswerExpandedExplanation": "Vasa previada kanama maternal değil fetal kaynaklı olabilir; bu nedenle membran rüptürü sonrası ağrısız kanama ve fetal bradikardi birlikteyse hızlı doğum kararı kritik hale gelir.",
    "tusPearl": "Membran rüptürü + ağrısız parlak kanama + fetal bradikardi = vasa previa için çok yüksek değerli ipucu.",
    "differentialPoint": "Plasenta previada kanama maternal plasental yataktan gelir; vasa previada fetal damar yırtıldığı için fetal distres daha erken ve dramatiktir.",
    "clinicalRelevance": "Membran rüptürü + ağrısız parlak kanama + fetal bradikardi = vasa previa için çok yüksek değerli ipucu.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology"
    ],
    "relatedTerms": [
      "Fetal bradikardi",
      "Akut fetal kan kaybı",
      "Acil doğum",
      "Üçüncü trimester kanama"
    ],
    "safeNestedTerms": [
      "Fetal bradikardi",
      "Akut fetal kan kaybı",
      "Acil doğum",
      "Üçüncü trimester kanama"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "high",
    "qualityScore": 96,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Üçüncü trimester kanama",
      "Akut fetal kan kaybı",
      "Fetal bradikardi",
      "vasa previya",
      "vasa previa",
      "Vasa previa",
      "Acil doğum"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Vasa previa' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "src/data/tusPearlCards.js içinde 'Vasa previa' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 11,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "high",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 24
    }
  },
  {
    "id": "v320-quality-batch3-akut-fetal-kan-kaybi",
    "term": "Akut fetal kan kaybı",
    "aliases": [
      "Akut fetal kan kaybı"
    ],
    "normalizedTerm": "akut fetal kan kaybi",
    "TurkishName": "Akut fetal kan kaybı",
    "EnglishName": "",
    "category": "Kadın doğum / fetal acil",
    "subcategory": "Fetal hemodinamik bozulma",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Fetal dolaşımdan kısa sürede anlamlı kan kaybı gelişmesiyle fetal hipoksi, bradikardi ve acil doğum ihtiyacı doğuran durumdur.",
    "preAnswerSafeDefinition": "Akut fetal kan kaybı, gebelik veya fetal değerlendirme bağlamında klinik karar ve risk yorumuyla ilişkili tıbbi kavramdır.",
    "shortDefinition": "Fetal dolaşımdan kısa sürede anlamlı kan kaybı gelişmesiyle fetal hipoksi, bradikardi ve acil doğum ihtiyacı doğuran durumdur.",
    "definition": "Fetal dolaşımdan kısa sürede anlamlı kan kaybı gelişmesiyle fetal hipoksi, bradikardi ve acil doğum ihtiyacı doğuran durumdur.",
    "detailedExplanation": "Akut fetal kan kaybı maternal vital bulgular normal olsa bile fetal monitörizasyonda bradikardi/distres ile kendini gösterebilir. Vasa previa bu mantığın en öğretici örneklerindendir.",
    "postAnswerExplanation": "Akut fetal kan kaybı maternal vital bulgular normal olsa bile fetal monitörizasyonda bradikardi/distres ile kendini gösterebilir. Vasa previa bu mantığın en öğretici örneklerindendir.",
    "postAnswerExpandedExplanation": "Akut fetal kan kaybı maternal vital bulgular normal olsa bile fetal monitörizasyonda bradikardi/distres ile kendini gösterebilir. Vasa previa bu mantığın en öğretici örneklerindendir.",
    "tusPearl": "Kanamanın kime ait olduğu önemlidir: fetal kaynaklı kanama az hacimde bile fetal bradikardi yapabilir.",
    "differentialPoint": "Ablasyo plasentada ağrı ve uterin hassasiyet; vasa previada ağrısız kanama ve fetal bradikardi daha tipiktir.",
    "clinicalRelevance": "Kanamanın kime ait olduğu önemlidir: fetal kaynaklı kanama az hacimde bile fetal bradikardi yapabilir.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology"
    ],
    "relatedTerms": [
      "Vasa previa",
      "Fetal bradikardi",
      "Acil doğum",
      "Fetal distres"
    ],
    "safeNestedTerms": [
      "Vasa previa",
      "Fetal bradikardi",
      "Acil doğum",
      "Fetal distres"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Akut fetal kan kaybı",
      "Fetal bradikardi",
      "Fetal distres",
      "Vasa previa",
      "Acil doğum"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Akut fetal kan kaybı' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "Kadın doğum / fetal izlem\",  \"subcategory\": \"Kadın doğum / fetal izlem\",  \"shortDefinition\": \"Fetal kalp hızının beklenen aralığın altına düşmesidir ve fetal hipoksi veya akut fetal kan kaybı gibi durumlarda görülebilir.\",  \"preAnswerSafeDefinition\": \"Fetal kalp hızı izlemiyle ilişkili yavaşlama bulgusudur.\",  \"postAnswerExplanation\": \"Vasa previa, ablasyo plasenta, uterin hiperstimülasyon veya fetal distres..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addAsSafeNestedTerm",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js, src/data/tusGlossaryCandidateAuditIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-acil-dogum",
    "term": "Acil doğum",
    "aliases": [
      "Acil doğum"
    ],
    "normalizedTerm": "acil dogum",
    "TurkishName": "Acil doğum",
    "EnglishName": "",
    "category": "Kadın doğum / acil karar",
    "subcategory": "Obstetrik yönetim",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Anne veya fetüs açısından beklemenin ciddi zarar oluşturduğu durumlarda doğumun hızlandırılması gereken klinik karardır.",
    "preAnswerSafeDefinition": "Acil doğum, gebelik veya fetal değerlendirme bağlamında klinik karar ve risk yorumuyla ilişkili tıbbi kavramdır.",
    "shortDefinition": "Anne veya fetüs açısından beklemenin ciddi zarar oluşturduğu durumlarda doğumun hızlandırılması gereken klinik karardır.",
    "definition": "Anne veya fetüs açısından beklemenin ciddi zarar oluşturduğu durumlarda doğumun hızlandırılması gereken klinik karardır.",
    "detailedExplanation": "Acil doğum kararı tanı etiketi değil, maternal-fetal risk dengesine verilen yönetim yanıtıdır. Fetal distres, uterin rüptür, vasa previa veya ağır ablasyo gibi tablolarda süre belirleyicidir.",
    "postAnswerExplanation": "Acil doğum kararı tanı etiketi değil, maternal-fetal risk dengesine verilen yönetim yanıtıdır. Fetal distres, uterin rüptür, vasa previa veya ağır ablasyo gibi tablolarda süre belirleyicidir.",
    "postAnswerExpandedExplanation": "Acil doğum kararı tanı etiketi değil, maternal-fetal risk dengesine verilen yönetim yanıtıdır. Fetal distres, uterin rüptür, vasa previa veya ağır ablasyo gibi tablolarda süre belirleyicidir.",
    "tusPearl": "TUS’ta “ilk yaklaşım” ile “definitif/acil doğum” ayrımını iyi oku; hemodinamik stabilizasyon ve doğum kararı aynı zincirin farklı basamakları olabilir.",
    "differentialPoint": "Elektif doğum planlı risk yönetimidir; acil doğum ise devam eden hipoksi/kanama/ruptür riskine yanıt olarak seçilir.",
    "clinicalRelevance": "TUS’ta “ilk yaklaşım” ile “definitif/acil doğum” ayrımını iyi oku; hemodinamik stabilizasyon ve doğum kararı aynı zincirin farklı basamakları olabilir.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology"
    ],
    "relatedTerms": [
      "Fetal distres",
      "Vasa previa",
      "Uteroplasental perfüzyon",
      "Geç deselerasyon"
    ],
    "safeNestedTerms": [
      "Fetal distres",
      "Vasa previa",
      "Uteroplasental perfüzyon",
      "Geç deselerasyon"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "medium",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Uteroplasental perfüzyon",
      "Geç deselerasyon",
      "Fetal distres",
      "Vasa previa",
      "Acil doğum"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Acil doğum' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "src/data/pdfPediatricArrhythmiaCases.js içinde 'Acil doğum' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 3,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P1",
      "recommendation": "addAsSafeNestedTerm",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js, src/data/pdfPediatricArrhythmiaCases.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-ucuncu-trimester-kanama",
    "term": "Üçüncü trimester kanama",
    "aliases": [
      "Üçüncü trimester kanama"
    ],
    "normalizedTerm": "ucuncu trimester kanama",
    "TurkishName": "Üçüncü trimester kanama",
    "EnglishName": "",
    "category": "Kadın doğum / obstetrik kanama",
    "subcategory": "Gebelikte kanama paterni",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Gebeliğin son trimesterinde ortaya çıkan ve plasenta previa, ablasyo plasenta, vasa previa gibi acilleri düşündüren kanama paternidir.",
    "preAnswerSafeDefinition": "Gebeliğin son trimesterinde ortaya çıkan ve plasenta previa, ablasyo plasenta, vasa previa gibi acilleri düşündüren kanama paternidir.",
    "shortDefinition": "Gebeliğin son trimesterinde ortaya çıkan ve plasenta previa, ablasyo plasenta, vasa previa gibi acilleri düşündüren kanama paternidir.",
    "definition": "Gebeliğin son trimesterinde ortaya çıkan ve plasenta previa, ablasyo plasenta, vasa previa gibi acilleri düşündüren kanama paternidir.",
    "detailedExplanation": "Üçüncü trimester kanamada ağrı, uterus tonusu, fetal kalp hızı ve kanamanın karakteri ayırıcı tanının temelini oluşturur. Vajinal muayene plasenta previa dışlanmadan riskli olabilir.",
    "postAnswerExplanation": "Üçüncü trimester kanamada ağrı, uterus tonusu, fetal kalp hızı ve kanamanın karakteri ayırıcı tanının temelini oluşturur. Vajinal muayene plasenta previa dışlanmadan riskli olabilir.",
    "postAnswerExpandedExplanation": "Üçüncü trimester kanamada ağrı, uterus tonusu, fetal kalp hızı ve kanamanın karakteri ayırıcı tanının temelini oluşturur. Vajinal muayene plasenta previa dışlanmadan riskli olabilir.",
    "tusPearl": "Ağrısız kanama plasenta previa/vasa previa; ağrılı kanama ve hassas uterus ablasyo plasenta lehinedir.",
    "differentialPoint": "Ablasyo plasenta ağrılı ve uterus hassasiyetli; plasenta previa çoğunlukla ağrısız; vasa previa fetal bradikardiyle öne çıkar.",
    "clinicalRelevance": "Ağrısız kanama plasenta previa/vasa previa; ağrılı kanama ve hassas uterus ablasyo plasenta lehinedir.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology"
    ],
    "relatedTerms": [
      "Plasenta previa",
      "Ablasyo plasenta",
      "Vasa previa",
      "Fetal bradikardi"
    ],
    "safeNestedTerms": [
      "Plasenta previa",
      "Ablasyo plasenta",
      "Vasa previa",
      "Fetal bradikardi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Üçüncü trimester kanama",
      "Ablasyo plasenta",
      "Fetal bradikardi",
      "Plasenta previa",
      "Vasa previa"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Üçüncü trimester kanama' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "src/data/tusPearlCards.js içinde 'Üçüncü trimester kanama' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 5,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-gec-deselerasyon",
    "term": "Geç deselerasyon",
    "aliases": [
      "Geç deselerasyon"
    ],
    "normalizedTerm": "gec deselerasyon",
    "TurkishName": "Geç deselerasyon",
    "EnglishName": "",
    "category": "Kadın doğum / fetal monitörizasyon",
    "subcategory": "Fetal kalp hızı paterni",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Uterin kontraksiyondan sonra başlayan ve kontraksiyon pikinden sonra en düşük noktasına ulaşan fetal kalp hızı yavaşlamasıdır.",
    "preAnswerSafeDefinition": "Uterin kontraksiyondan sonra başlayan ve kontraksiyon pikinden sonra en düşük noktasına ulaşan fetal kalp hızı yavaşlamasıdır.",
    "shortDefinition": "Uterin kontraksiyondan sonra başlayan ve kontraksiyon pikinden sonra en düşük noktasına ulaşan fetal kalp hızı yavaşlamasıdır.",
    "definition": "Uterin kontraksiyondan sonra başlayan ve kontraksiyon pikinden sonra en düşük noktasına ulaşan fetal kalp hızı yavaşlamasıdır.",
    "detailedExplanation": "Geç deselerasyon uteroplasental yetmezlik ve fetal hipoksiyle ilişkilidir. Tekrarlayan geç deselerasyonlar fetal rezervin azaldığını ve intrauterin resüsitasyon veya doğum kararını gerektirebileceğini gösterir.",
    "postAnswerExplanation": "Geç deselerasyon uteroplasental yetmezlik ve fetal hipoksiyle ilişkilidir. Tekrarlayan geç deselerasyonlar fetal rezervin azaldığını ve intrauterin resüsitasyon veya doğum kararını gerektirebileceğini gösterir.",
    "postAnswerExpandedExplanation": "Geç deselerasyon uteroplasental yetmezlik ve fetal hipoksiyle ilişkilidir. Tekrarlayan geç deselerasyonlar fetal rezervin azaldığını ve intrauterin resüsitasyon veya doğum kararını gerektirebileceğini gösterir.",
    "tusPearl": "Geç deselerasyon = uteroplasental yetmezlik/hipoksi; değişken deselerasyon = kordon basısı mantığıyla ayrılır.",
    "differentialPoint": "Erken deselerasyon baş basısı ve benignlik eğilimindedir; geç deselerasyon plasental perfüzyon sorunudur.",
    "clinicalRelevance": "Geç deselerasyon = uteroplasental yetmezlik/hipoksi; değişken deselerasyon = kordon basısı mantığıyla ayrılır.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology"
    ],
    "relatedTerms": [
      "Uteroplasental perfüzyon",
      "Fetal hipoksi",
      "Acil doğum",
      "Fetal bradikardi"
    ],
    "safeNestedTerms": [
      "Uteroplasental perfüzyon",
      "Fetal hipoksi",
      "Acil doğum",
      "Fetal bradikardi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Uteroplasental perfüzyon",
      "Fetal bradikardi",
      "Geç deselerasyon",
      "Fetal hipoksi",
      "Acil doğum"
    ],
    "sourceTextExamples": [
      "yilik halinin temel göstergelerindendir.\",  \"postAnswerExpandedExplanation\": \"Fetüsün kalp atım hızını ifade eder ve intrapartum fetal iyilik halinin temel göstergelerindendir. Geç deselerasyon uteroplasental yetmezlik/hipoksi açısından önemlidir.\",  \"tusPearl\": \"Geç deselerasyon uteroplasental yetmezlik/hipoksi açısından önemlidir.\",  \"differentialPoint\": \"Erken deselerasyon baş basısı ile daha benign olabilir.\", ...",
      "alp atım hızını ifade eder ve intrapartum fetal iyilik halinin temel göstergelerindendir. Geç deselerasyon uteroplasental yetmezlik/hipoksi açısından önemlidir.\",  \"tusPearl\": \"Geç deselerasyon uteroplasental yetmezlik/hipoksi açısından önemlidir.\",  \"differentialPoint\": \"Erken deselerasyon baş basısı ile daha benign olabilir.\",  \"clinicalRelevance\": \"Geç deselerasyon uteroplasental yetmezlik/hipoksi açısından..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusGlossaryCaseDerivedIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-uteroplasental-perfuzyon",
    "term": "Uteroplasental perfüzyon",
    "aliases": [
      "Uteroplasental perfüzyon"
    ],
    "normalizedTerm": "uteroplasental perfuzyon",
    "TurkishName": "Uteroplasental perfüzyon",
    "EnglishName": "",
    "category": "Kadın doğum / fizyoloji",
    "subcategory": "Plasental kanlanma",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Maternal uterin dolaşımdan plasentaya oksijen ve besin taşınmasını sağlayan kan akımıdır.",
    "preAnswerSafeDefinition": "Maternal uterin dolaşımdan plasentaya oksijen ve besin taşınmasını sağlayan kan akımıdır.",
    "shortDefinition": "Maternal uterin dolaşımdan plasentaya oksijen ve besin taşınmasını sağlayan kan akımıdır.",
    "definition": "Maternal uterin dolaşımdan plasentaya oksijen ve besin taşınmasını sağlayan kan akımıdır.",
    "detailedExplanation": "Uteroplasental perfüzyon bozulduğunda fetal oksijenlenme azalır; geç deselerasyon, büyüme kısıtlılığı veya fetal distres gelişebilir. Hipotansiyon, uterin hiperstimülasyon ve plasental patolojiler bu akımı azaltabilir.",
    "postAnswerExplanation": "Uteroplasental perfüzyon bozulduğunda fetal oksijenlenme azalır; geç deselerasyon, büyüme kısıtlılığı veya fetal distres gelişebilir. Hipotansiyon, uterin hiperstimülasyon ve plasental patolojiler bu akımı azaltabilir.",
    "postAnswerExpandedExplanation": "Uteroplasental perfüzyon bozulduğunda fetal oksijenlenme azalır; geç deselerasyon, büyüme kısıtlılığı veya fetal distres gelişebilir. Hipotansiyon, uterin hiperstimülasyon ve plasental patolojiler bu akımı azaltabilir.",
    "tusPearl": "Geç deselerasyonun temel mantığı fetal kalpten önce plasental perfüzyon problemidir.",
    "differentialPoint": "Kordon basısı değişken deselerasyon yaparken uteroplasental yetmezlik geç deselerasyon yapar.",
    "clinicalRelevance": "Geç deselerasyonun temel mantığı fetal kalpten önce plasental perfüzyon problemidir.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology"
    ],
    "relatedTerms": [
      "Geç deselerasyon",
      "Fetal hipoksi",
      "Plasental yetmezlik",
      "Uterin hiperstimülasyon"
    ],
    "safeNestedTerms": [
      "Geç deselerasyon",
      "Fetal hipoksi",
      "Plasental yetmezlik",
      "Uterin hiperstimülasyon"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Uteroplasental perfüzyon",
      "Uterin hiperstimülasyon",
      "Plasental yetmezlik",
      "Geç deselerasyon",
      "Fetal hipoksi"
    ],
    "sourceTextExamples": [
      "on\": \"Gebeliğin geç döneminde plasentanın uterusa tutunmasıyla ilgili kanama ve fetal-maternal risk oluşturan obstetrik tablodur.\",  \"postAnswerExplanation\": \"Plasental ayrılma uteroplasental perfüzyonu bozar; hipertansiyon, travma ve kokain risk faktörleri arasındadır. Ağrılı kanama ve hassas/sert uterus tipiktir.\",  \"tusPearl\": \"Ağrılı vajinal kanama + uterus hassasiyeti/sertliği ablatio plasentayı; ağrısız kanama...",
      "src/data/tusGlossaryDefinitionQualityIndex.js dosyasında 'Uteroplasental perfüzyon' relatedTerms/safeNestedTerms/candidate-audit bağlamında geçiyor; aktif exact glossary entry olmadan öğretici ilişkili kavram olarak kaldığı saptandı."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "partialMatch",
      "sourceFilePath": "src/data/tusGlossaryDefinitionQualityIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-diskriminatuvar-zon",
    "term": "Diskriminatuvar zon",
    "aliases": [
      "Diskriminatuvar zon"
    ],
    "normalizedTerm": "diskriminatuvar zon",
    "TurkishName": "Diskriminatuvar zon",
    "EnglishName": "",
    "category": "Kadın doğum / erken gebelik",
    "subcategory": "β-hCG eşiği",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Transvajinal ultrasonda intrauterin gebelik kesesinin beklenmesi gereken β-hCG düzeyi aralığıdır.",
    "preAnswerSafeDefinition": "Diskriminatuvar zon, gebelik veya fetal değerlendirme bağlamında klinik karar ve risk yorumuyla ilişkili tıbbi kavramdır.",
    "shortDefinition": "Transvajinal ultrasonda intrauterin gebelik kesesinin beklenmesi gereken β-hCG düzeyi aralığıdır.",
    "definition": "Transvajinal ultrasonda intrauterin gebelik kesesinin beklenmesi gereken β-hCG düzeyi aralığıdır.",
    "detailedExplanation": "Diskriminatuvar zon üzerinde β-hCG varken uterusta gebelik kesesi görülmemesi ektopik gebelik olasılığını artırır. Tek ölçüm yerine seri β-hCG ve klinik stabilite birlikte yorumlanmalıdır.",
    "postAnswerExplanation": "Diskriminatuvar zon üzerinde β-hCG varken uterusta gebelik kesesi görülmemesi ektopik gebelik olasılığını artırır. Tek ölçüm yerine seri β-hCG ve klinik stabilite birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Diskriminatuvar zon üzerinde β-hCG varken uterusta gebelik kesesi görülmemesi ektopik gebelik olasılığını artırır. Tek ölçüm yerine seri β-hCG ve klinik stabilite birlikte yorumlanmalıdır.",
    "tusPearl": "β-hCG diskriminatuvar zon üzerinde + intrauterin kese yok = ektopik gebelik alarmı.",
    "differentialPoint": "Düşük β-hCG’de kese görülmemesi ektopi kanıtı değildir; diskriminatuvar zon üzerinde yorum değeri artar.",
    "clinicalRelevance": "β-hCG diskriminatuvar zon üzerinde + intrauterin kese yok = ektopik gebelik alarmı.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology"
    ],
    "relatedTerms": [
      "Seri β-hCG",
      "Rüptüre ektopik gebelik",
      "Transvajinal ultrasonografi",
      "Pelvik ağrı"
    ],
    "safeNestedTerms": [
      "Seri β-hCG",
      "Rüptüre ektopik gebelik",
      "Transvajinal ultrasonografi",
      "Pelvik ağrı"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Transvajinal ultrasonografi",
      "Rüptüre ektopik gebelik",
      "Diskriminatuvar zon",
      "Pelvik ağrı",
      "Seri β-hCG"
    ],
    "sourceTextExamples": [
      "lendiren ultrasonografidir.\",  \"postAnswerExpandedExplanation\": \"Pelvik organları ve erken gebeliği vajinal probla yüksek çözünürlükle değerlendiren ultrasonografidir. Beta-hCG diskriminatuvar zon üzerinde iken intrauterin gebelik görülmemesi ektopik gebelik lehinedir.\",  \"tusPearl\": \"Beta-hCG diskriminatuvar zon üzerinde iken intrauterin gebelik görülmemesi ektopik gebelik lehinedir.\",  \"differentialPoint\":...",
      "sek çözünürlükle değerlendiren ultrasonografidir. Beta-hCG diskriminatuvar zon üzerinde iken intrauterin gebelik görülmemesi ektopik gebelik lehinedir.\",  \"tusPearl\": \"Beta-hCG diskriminatuvar zon üzerinde iken intrauterin gebelik görülmemesi ektopik gebelik lehinedir.\",  \"differentialPoint\": \"Abdominal USG erken gebelikte daha az duyarlı olabilir.\",  \"clinicalRelevance\": \"Beta-hCG diskriminatuvar zon üzerinde iken..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusGlossaryCaseDerivedIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 24
    }
  },
  {
    "id": "v320-quality-batch3-seri-hcg",
    "term": "Seri β-hCG",
    "aliases": [
      "seri beta-hCG",
      "seri β-hCG",
      "Seri β-hCG"
    ],
    "normalizedTerm": "seri -hcg",
    "TurkishName": "Seri β-hCG",
    "EnglishName": "",
    "category": "Kadın doğum / erken gebelik",
    "subcategory": "Laboratuvar izlem paterni",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Erken gebelikte β-hCG düzeyinin zamana göre değişimini izleyerek canlı intrauterin gebelik, düşük veya ektopik gebelik olasılığını değerlendirme yaklaşımıdır.",
    "preAnswerSafeDefinition": "Erken gebelikte β-hCG düzeyinin zamana göre değişimini izleyerek canlı intrauterin gebelik, düşük veya ektopik gebelik olasılığını değerlendirme yaklaşımıdır.",
    "shortDefinition": "Erken gebelikte β-hCG düzeyinin zamana göre değişimini izleyerek canlı intrauterin gebelik, düşük veya ektopik gebelik olasılığını değerlendirme yaklaşımıdır.",
    "definition": "Erken gebelikte β-hCG düzeyinin zamana göre değişimini izleyerek canlı intrauterin gebelik, düşük veya ektopik gebelik olasılığını değerlendirme yaklaşımıdır.",
    "detailedExplanation": "Seri β-hCG tek bir değerden daha öğreticidir; beklenen artış olmaması ektopik gebelik veya başarısız gebelik lehine olabilir. Ultrason ve klinik stabiliteyle birlikte yorumlanmalıdır.",
    "postAnswerExplanation": "Seri β-hCG tek bir değerden daha öğreticidir; beklenen artış olmaması ektopik gebelik veya başarısız gebelik lehine olabilir. Ultrason ve klinik stabiliteyle birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Seri β-hCG tek bir değerden daha öğreticidir; beklenen artış olmaması ektopik gebelik veya başarısız gebelik lehine olabilir. Ultrason ve klinik stabiliteyle birlikte yorumlanmalıdır.",
    "tusPearl": "Erken gebelik sorularında tek β-hCG değil, trend + USG + hemodinami birlikte okunur.",
    "differentialPoint": "Normal yükseliş canlı intrauterin gebelikle uyumlu olabilir; plato veya yetersiz artış ektopik/başarısız gebelik olasılığını artırır.",
    "clinicalRelevance": "Erken gebelik sorularında tek β-hCG değil, trend + USG + hemodinami birlikte okunur.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology"
    ],
    "relatedTerms": [
      "Diskriminatuvar zon",
      "Ektopik gebelik",
      "Transvajinal ultrasonografi",
      "Rüptüre ektopik gebelik"
    ],
    "safeNestedTerms": [
      "Diskriminatuvar zon",
      "Ektopik gebelik",
      "Transvajinal ultrasonografi",
      "Rüptüre ektopik gebelik"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "Transvajinal ultrasonografi",
      "Rüptüre ektopik gebelik",
      "Diskriminatuvar zon",
      "Ektopik gebelik",
      "seri beta-hCG",
      "seri β-hCG",
      "Seri β-hCG"
    ],
    "sourceTextExamples": [
      "removed-safe-bank-source içinde 'Seri β-hCG' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "src/data/cases.js içinde 'Seri β-hCG' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 19,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "removed-safe-bank-source, src/data/cases.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-rupture-ektopik-gebelik",
    "term": "Rüptüre ektopik gebelik",
    "aliases": [
      "Rüptüre ektopik gebelik"
    ],
    "normalizedTerm": "rupture ektopik gebelik",
    "TurkishName": "Rüptüre ektopik gebelik",
    "EnglishName": "",
    "category": "Kadın doğum / acil",
    "subcategory": "Ektopik gebelik komplikasyonu",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Ektopik gebeliğin yırtılarak intraperitoneal kanama ve hemodinamik instabiliteye yol açmasıdır.",
    "preAnswerSafeDefinition": "Rüptüre ektopik gebelik, gebelik veya fetal değerlendirme bağlamında klinik karar ve risk yorumuyla ilişkili tıbbi kavramdır.",
    "shortDefinition": "Ektopik gebeliğin yırtılarak intraperitoneal kanama ve hemodinamik instabiliteye yol açmasıdır.",
    "definition": "Ektopik gebeliğin yırtılarak intraperitoneal kanama ve hemodinamik instabiliteye yol açmasıdır.",
    "detailedExplanation": "Rüptüre ektopik gebelikte ani karın ağrısı, omuz ağrısı, senkop veya hipotansiyon görülebilir. Stabil olmayan hastada metotreksat değil acil cerrahi yaklaşım düşünülür.",
    "postAnswerExplanation": "Rüptüre ektopik gebelikte ani karın ağrısı, omuz ağrısı, senkop veya hipotansiyon görülebilir. Stabil olmayan hastada metotreksat değil acil cerrahi yaklaşım düşünülür.",
    "postAnswerExpandedExplanation": "Rüptüre ektopik gebelikte ani karın ağrısı, omuz ağrısı, senkop veya hipotansiyon görülebilir. Stabil olmayan hastada metotreksat değil acil cerrahi yaklaşım düşünülür.",
    "tusPearl": "Ektopik gebelik + hipotansiyon/periton bulgusu = rüptür; medikal tedavi değil acil cerrahi.",
    "differentialPoint": "Stabil, küçük ve uygun β-hCG düzeyli ektopik gebelikte metotreksat düşünülebilir; rüptürde cerrahi önceliklidir.",
    "clinicalRelevance": "Ektopik gebelik + hipotansiyon/periton bulgusu = rüptür; medikal tedavi değil acil cerrahi.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology"
    ],
    "relatedTerms": [
      "Ektopik gebelik",
      "İntraperitoneal kanama",
      "Diskriminatuvar zon",
      "Seri β-hCG"
    ],
    "safeNestedTerms": [
      "Ektopik gebelik",
      "İntraperitoneal kanama",
      "Diskriminatuvar zon",
      "Seri β-hCG"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Rüptüre ektopik gebelik",
      "İntraperitoneal kanama",
      "Diskriminatuvar zon",
      "Ektopik gebelik",
      "Seri β-hCG"
    ],
    "sourceTextExamples": [
      "removed-static-seed-source içinde 'Rüptüre ektopik gebelik' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "removed-safe-bank-source içinde 'Rüptüre ektopik gebelik' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 24,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "removed-static-seed-source, removed-safe-bank-source",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 24
    }
  },
  {
    "id": "v320-quality-batch3-streak-gonad",
    "term": "Streak gonad",
    "aliases": [
      "Streak gonad"
    ],
    "normalizedTerm": "streak gonad",
    "TurkishName": "Streak gonad",
    "EnglishName": "",
    "category": "Endokrinoloji / gelişimsel gonad",
    "subcategory": "Gonadal disgenezis bulgusu",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Fonksiyonel over/testis dokusu yerine fibröz, gelişmemiş gonad dokusunun bulunmasıdır.",
    "preAnswerSafeDefinition": "Fonksiyonel over/testis dokusu yerine fibröz, gelişmemiş gonad dokusunun bulunmasıdır.",
    "shortDefinition": "Fonksiyonel over/testis dokusu yerine fibröz, gelişmemiş gonad dokusunun bulunmasıdır.",
    "definition": "Fonksiyonel over/testis dokusu yerine fibröz, gelişmemiş gonad dokusunun bulunmasıdır.",
    "detailedExplanation": "Streak gonad özellikle gonadal disgenezilerde östrojen eksikliği, primer amenore ve puberte gelişim bozukluğu ile ilişkilidir. Y kromozomu materyali varsa gonadoblastom riski nedeniyle klinik önemi artar.",
    "postAnswerExplanation": "Streak gonad özellikle gonadal disgenezilerde östrojen eksikliği, primer amenore ve puberte gelişim bozukluğu ile ilişkilidir. Y kromozomu materyali varsa gonadoblastom riski nedeniyle klinik önemi artar.",
    "postAnswerExpandedExplanation": "Streak gonad özellikle gonadal disgenezilerde östrojen eksikliği, primer amenore ve puberte gelişim bozukluğu ile ilişkilidir. Y kromozomu materyali varsa gonadoblastom riski nedeniyle klinik önemi artar.",
    "tusPearl": "Primer amenore + kısa boy/webbed neck veya yüksek FSH = gonadal disgenezis/streak gonad düşün.",
    "differentialPoint": "MRKH’de over fonksiyonu ve sekonder seks karakterleri normaldir; streak gonadda gonadal hormon üretimi bozulur.",
    "clinicalRelevance": "Primer amenore + kısa boy/webbed neck veya yüksek FSH = gonadal disgenezis/streak gonad düşün.",
    "mechanism": "",
    "relatedBranches": [
      "medical-biochemistry"
    ],
    "relatedTerms": [
      "Gonadal disgenezis",
      "Primer amenore",
      "46,XY DSD",
      "FSH yüksekliği"
    ],
    "safeNestedTerms": [
      "Gonadal disgenezis",
      "Primer amenore",
      "46,XY DSD",
      "FSH yüksekliği"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Gonadal disgenezis",
      "FSH yüksekliği",
      "Primer amenore",
      "Streak gonad",
      "46,XY DSD"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Streak gonad' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "ryotiple gonadal disgenez ve kısa boyla seyreden sendromdur. Klinik bağlamla birlikte yorumlanmalıdır.\",  \"postAnswerExpandedExplanation\": \"Kısa boy, yele boyun, koarktasyon ve streak gonad Turner için klasik ipuçlarıdır.\",  \"tusPearl\": \"Kısa boy, yele boyun, koarktasyon ve streak gonad Turner için klasik ipuçlarıdır.\",  \"differentialPoint\": \"Klinefelter erkek fenotipinde hipogonadizm ve uzun boyla seyreder.\", ..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 3,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js, src/data/tusGlossarySupplementalIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-turtle-sign",
    "term": "Turtle sign",
    "aliases": [
      "kaplumbağa bulgusu",
      "turtle sign",
      "Turtle sign"
    ],
    "normalizedTerm": "turtle sign",
    "TurkishName": "Turtle sign",
    "EnglishName": "",
    "category": "Kadın doğum / doğum acili",
    "subcategory": "Omuz distosisi bulgusu",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Fetal baş çıktıktan sonra perineye geri çekiliyormuş gibi görünmesiyle omuz distosisini düşündüren doğum bulgusudur.",
    "preAnswerSafeDefinition": "Fetal baş çıktıktan sonra perineye geri çekiliyormuş gibi görünmesiyle omuz distosisini düşündüren doğum bulgusudur.",
    "shortDefinition": "Fetal baş çıktıktan sonra perineye geri çekiliyormuş gibi görünmesiyle omuz distosisini düşündüren doğum bulgusudur.",
    "definition": "Fetal baş çıktıktan sonra perineye geri çekiliyormuş gibi görünmesiyle omuz distosisini düşündüren doğum bulgusudur.",
    "detailedExplanation": "Turtle sign anterior omzun pubik simfiz arkasında takıldığını düşündürür. Fundal bası yapılmamalı; McRoberts manevrası ve suprapubik bası gibi omuz distosisi manevraları tercih edilir.",
    "postAnswerExplanation": "Turtle sign anterior omzun pubik simfiz arkasında takıldığını düşündürür. Fundal bası yapılmamalı; McRoberts manevrası ve suprapubik bası gibi omuz distosisi manevraları tercih edilir.",
    "postAnswerExpandedExplanation": "Turtle sign anterior omzun pubik simfiz arkasında takıldığını düşündürür. Fundal bası yapılmamalı; McRoberts manevrası ve suprapubik bası gibi omuz distosisi manevraları tercih edilir.",
    "tusPearl": "Baş çıktı, geri çekiliyor gibi duruyor = omuz distosisi; fundal bası kontrendikedir.",
    "differentialPoint": "Fundal bası omzu daha çok sıkıştırabilir; suprapubik bası anterior omzu serbestleştirmeye yöneliktir.",
    "clinicalRelevance": "Baş çıktı, geri çekiliyor gibi duruyor = omuz distosisi; fundal bası kontrendikedir.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology"
    ],
    "relatedTerms": [
      "Omuz distosisi",
      "Fundal bası",
      "McRoberts manevrası",
      "Suprapubik bası"
    ],
    "safeNestedTerms": [
      "Omuz distosisi",
      "Fundal bası",
      "McRoberts manevrası",
      "Suprapubik bası"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "McRoberts manevrası",
      "kaplumbağa bulgusu",
      "Suprapubik bası",
      "Omuz distosisi",
      "Fundal bası",
      "turtle sign",
      "Turtle sign"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Turtle sign' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "src/data/tusPearlCards.js içinde 'Turtle sign' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 5,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-fundal-basi",
    "term": "Fundal bası",
    "aliases": [
      "Fundal bası"
    ],
    "normalizedTerm": "fundal basi",
    "TurkishName": "Fundal bası",
    "EnglishName": "",
    "category": "Kadın doğum / doğum manevrası",
    "subcategory": "Riskli obstetrik müdahale",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Uterus fundusundan aşağı doğru bası uygulanmasıdır; omuz distosisinde önerilmez ve impaksiyonu artırabilir.",
    "preAnswerSafeDefinition": "Uterus fundusundan aşağı doğru bası uygulanmasıdır; omuz distosisinde önerilmez ve impaksiyonu artırabilir.",
    "shortDefinition": "Uterus fundusundan aşağı doğru bası uygulanmasıdır; omuz distosisinde önerilmez ve impaksiyonu artırabilir.",
    "definition": "Uterus fundusundan aşağı doğru bası uygulanmasıdır; omuz distosisinde önerilmez ve impaksiyonu artırabilir.",
    "detailedExplanation": "Fundal bası özellikle omuz distosisinde fetal omzu daha fazla pubik simfize sıkıştırarak brakiyal pleksus hasarı ve uterin/fetal komplikasyon riskini artırabilir.",
    "postAnswerExplanation": "Fundal bası özellikle omuz distosisinde fetal omzu daha fazla pubik simfize sıkıştırarak brakiyal pleksus hasarı ve uterin/fetal komplikasyon riskini artırabilir.",
    "postAnswerExpandedExplanation": "Fundal bası özellikle omuz distosisinde fetal omzu daha fazla pubik simfize sıkıştırarak brakiyal pleksus hasarı ve uterin/fetal komplikasyon riskini artırabilir.",
    "tusPearl": "Omuz distosisinde fundal bası yapma; McRoberts + suprapubik bası daha doğru yaklaşımdır.",
    "differentialPoint": "Suprapubik bası omzu döndürmeyi hedefler; fundal bası bebeği aşağı iterek sıkışmayı artırabilir.",
    "clinicalRelevance": "Omuz distosisinde fundal bası yapma; McRoberts + suprapubik bası daha doğru yaklaşımdır.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology"
    ],
    "relatedTerms": [
      "Omuz distosisi",
      "Turtle sign",
      "Suprapubik bası",
      "Brakiyal pleksus hasarı"
    ],
    "safeNestedTerms": [
      "Omuz distosisi",
      "Turtle sign",
      "Suprapubik bası",
      "Brakiyal pleksus hasarı"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Brakiyal pleksus hasarı",
      "Suprapubik bası",
      "Omuz distosisi",
      "Fundal bası",
      "Turtle sign"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Fundal bası' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "kula kırılması kurtarıcı/son seçenek niteliğindedir. Omuz distosisinde ilk yaklaşım yardım çağırma, traksiyonu bırakma ve McRoberts manevrasıdır; sıklıkla suprapubik bası eklenir. Fundal bası omuz sıkışmasını artırabileceği için önerilmez. Doğru cevaptır; omuz distosisinde ilk uygulanacak temel manevra McRoberts manevrasıdır. TUS açısından ayırıcı nokta: Omuz distosisinde “fundal bası” çeldiricisine dikkat edilir;..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 6,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-vagal-manevra",
    "term": "Vagal manevra",
    "aliases": [
      "Vagal manevra"
    ],
    "normalizedTerm": "vagal manevra",
    "TurkishName": "Vagal manevra",
    "EnglishName": "",
    "category": "Kardiyoloji / ritim yönetimi",
    "subcategory": "AV nod yavaşlatıcı manevra",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Vagus tonusunu artırarak AV nod iletimini geçici yavaşlatan nonfarmakolojik ritim müdahalesidir.",
    "preAnswerSafeDefinition": "Vagus tonusunu artırarak AV nod iletimini geçici yavaşlatan nonfarmakolojik ritim müdahalesidir.",
    "shortDefinition": "Vagus tonusunu artırarak AV nod iletimini geçici yavaşlatan nonfarmakolojik ritim müdahalesidir.",
    "definition": "Vagus tonusunu artırarak AV nod iletimini geçici yavaşlatan nonfarmakolojik ritim müdahalesidir.",
    "detailedExplanation": "Vagal manevra düzenli dar QRS supraventriküler taşikardide tanı ve tedavi amacıyla kullanılabilir. Hemodinamik instabilite varsa manevra beklemek yerine senkronize kardiyoversiyon gerekir.",
    "postAnswerExplanation": "Vagal manevra düzenli dar QRS supraventriküler taşikardide tanı ve tedavi amacıyla kullanılabilir. Hemodinamik instabilite varsa manevra beklemek yerine senkronize kardiyoversiyon gerekir.",
    "postAnswerExpandedExplanation": "Vagal manevra düzenli dar QRS supraventriküler taşikardide tanı ve tedavi amacıyla kullanılabilir. Hemodinamik instabilite varsa manevra beklemek yerine senkronize kardiyoversiyon gerekir.",
    "tusPearl": "Stabil düzenli dar QRS taşikardi = vagal manevra/adenozin; instabil taşikardi = senkronize kardiyoversiyon.",
    "differentialPoint": "Vagal manevra AV nod bağımlı ritimleri sonlandırabilir; ventriküler taşikardiyi tedavi etmez.",
    "clinicalRelevance": "Stabil düzenli dar QRS taşikardi = vagal manevra/adenozin; instabil taşikardi = senkronize kardiyoversiyon.",
    "mechanism": "",
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedTerms": [
      "Dar QRS taşikardi",
      "AV nod",
      "Adenozin",
      "Senkronize kardiyoversiyon"
    ],
    "safeNestedTerms": [
      "Dar QRS taşikardi",
      "AV nod",
      "Adenozin",
      "Senkronize kardiyoversiyon"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Senkronize kardiyoversiyon",
      "Dar QRS taşikardi",
      "Vagal manevra",
      "Adenozin",
      "AV nod"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Vagal manevra' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "src/data/pdfPediatricArrhythmiaCases.js içinde 'Vagal manevra' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 5,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js, src/data/pdfPediatricArrhythmiaCases.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-senkronize-kardiyoversiyon",
    "term": "Senkronize kardiyoversiyon",
    "aliases": [
      "Senkronize kardiyoversiyon"
    ],
    "normalizedTerm": "senkronize kardiyoversiyon",
    "TurkishName": "Senkronize kardiyoversiyon",
    "EnglishName": "",
    "category": "Kardiyoloji / acil ritim yönetimi",
    "subcategory": "Elektriksel tedavi",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "QRS kompleksiyle senkronize elektrik şoku vererek organize fakat instabil taşiaritmiyi sonlandırma yöntemidir.",
    "preAnswerSafeDefinition": "Senkronize kardiyoversiyon, acil klinik değerlendirmede mekanizma, risk veya yönetim basamağıyla ilişkili kavramdır.",
    "shortDefinition": "QRS kompleksiyle senkronize elektrik şoku vererek organize fakat instabil taşiaritmiyi sonlandırma yöntemidir.",
    "definition": "QRS kompleksiyle senkronize elektrik şoku vererek organize fakat instabil taşiaritmiyi sonlandırma yöntemidir.",
    "detailedExplanation": "Senkronizasyon R-on-T fenomenini azaltır; nabızlı ama instabil SVT, atriyal fibrilasyon/flutter veya monomorfik VT’de tercih edilir. Nabızsız ritimlerde defibrilasyon algoritması uygulanır.",
    "postAnswerExplanation": "Senkronizasyon R-on-T fenomenini azaltır; nabızlı ama instabil SVT, atriyal fibrilasyon/flutter veya monomorfik VT’de tercih edilir. Nabızsız ritimlerde defibrilasyon algoritması uygulanır.",
    "postAnswerExpandedExplanation": "Senkronizasyon R-on-T fenomenini azaltır; nabızlı ama instabil SVT, atriyal fibrilasyon/flutter veya monomorfik VT’de tercih edilir. Nabızsız ritimlerde defibrilasyon algoritması uygulanır.",
    "tusPearl": "Nabız var + instabil taşikardi = senkronize kardiyoversiyon; nabız yok = defibrilasyon/CPR algoritması.",
    "differentialPoint": "Defibrilasyon senkronize değildir ve VF/nabızsız VT içindir; senkronize kardiyoversiyon nabızlı instabil taşiaritmidedir.",
    "clinicalRelevance": "Nabız var + instabil taşikardi = senkronize kardiyoversiyon; nabız yok = defibrilasyon/CPR algoritması.",
    "mechanism": "",
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedTerms": [
      "Geniş QRS taşikardi",
      "Dar QRS taşikardi",
      "Defibrilasyon",
      "Hemodinamik instabilite"
    ],
    "safeNestedTerms": [
      "Geniş QRS taşikardi",
      "Dar QRS taşikardi",
      "Defibrilasyon",
      "Hemodinamik instabilite"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Senkronize kardiyoversiyon",
      "Hemodinamik instabilite",
      "Geniş QRS taşikardi",
      "Dar QRS taşikardi",
      "Defibrilasyon"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Senkronize kardiyoversiyon' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "src/data/pdfPediatricArrhythmiaCases.js içinde 'Senkronize kardiyoversiyon' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 9,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js, src/data/pdfPediatricArrhythmiaCases.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 24
    }
  },
  {
    "id": "v320-quality-batch3-u-dalgasi",
    "term": "U dalgası",
    "aliases": [
      "U dalgası"
    ],
    "normalizedTerm": "u dalgasi",
    "TurkishName": "U dalgası",
    "EnglishName": "",
    "category": "Kardiyoloji / EKG",
    "subcategory": "Hipokalemi bulgusu",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "T dalgasından sonra görülebilen küçük dalgadır; belirginleşmesi özellikle hipokalemiyle ilişkilidir.",
    "preAnswerSafeDefinition": "T dalgasından sonra görülebilen küçük dalgadır; belirginleşmesi özellikle hipokalemiyle ilişkilidir.",
    "shortDefinition": "T dalgasından sonra görülebilen küçük dalgadır; belirginleşmesi özellikle hipokalemiyle ilişkilidir.",
    "definition": "T dalgasından sonra görülebilen küçük dalgadır; belirginleşmesi özellikle hipokalemiyle ilişkilidir.",
    "detailedExplanation": "Hipokalemide repolarizasyon uzar, T dalgası düzleşebilir, ST depresyonu ve belirgin U dalgası görülebilir. Bu bulgu aritmi riski açısından elektrolit yorumunu güçlendirir.",
    "postAnswerExplanation": "Hipokalemide repolarizasyon uzar, T dalgası düzleşebilir, ST depresyonu ve belirgin U dalgası görülebilir. Bu bulgu aritmi riski açısından elektrolit yorumunu güçlendirir.",
    "postAnswerExpandedExplanation": "Hipokalemide repolarizasyon uzar, T dalgası düzleşebilir, ST depresyonu ve belirgin U dalgası görülebilir. Bu bulgu aritmi riski açısından elektrolit yorumunu güçlendirir.",
    "tusPearl": "Hipokalemi EKG’sinde belirgin U dalgası klasik ipucudur.",
    "differentialPoint": "Hiperkalemide sivri T ve QRS genişlemesi beklenirken hipokalemide U dalgası/T düzleşmesi öne çıkar.",
    "clinicalRelevance": "Hipokalemi EKG’sinde belirgin U dalgası klasik ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedTerms": [
      "Hipokalemi",
      "ST depresyonu",
      "QT/QU uzaması",
      "Aritmi riski"
    ],
    "safeNestedTerms": [
      "Hipokalemi",
      "ST depresyonu",
      "QT/QU uzaması",
      "Aritmi riski"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "QT/QU uzaması",
      "ST depresyonu",
      "Aritmi riski",
      "Hipokalemi",
      "U dalgası"
    ],
    "sourceTextExamples": [
      "azalmasıyla ilişkili elektrolit bozukluğudur.\",  \"postAnswerExplanation\": \"Kusma, diüretik, hiperaldosteronizm ve hücre içine potasyum kayması hipokalemiye yol açabilir; EKG’de U dalgası görülebilir.\",  \"tusPearl\": \"Hipertansiyon + hipokalemi metabolik alkaloz hiperaldosteronizmi düşündürebilir.\",  \"differentialPoint\": \"Hiperkalemi sivri T/QRS genişlemesi; hipokalemi U dalgası ve kas güçsüzlüğü ile ayrılır.\", ...",
      "src/data/tusGlossaryCandidateAuditIndex.js dosyasında 'U dalgası' relatedTerms/safeNestedTerms/candidate-audit bağlamında geçiyor; aktif exact glossary entry olmadan öğretici ilişkili kavram olarak kaldığı saptandı."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "partialMatch",
      "sourceFilePath": "src/data/tusGlossaryCandidateAuditIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-pr-uzamasi",
    "term": "PR uzaması",
    "aliases": [
      "PR uzaması"
    ],
    "normalizedTerm": "pr uzamasi",
    "TurkishName": "PR uzaması",
    "EnglishName": "",
    "category": "Kardiyoloji / EKG",
    "subcategory": "AV iletim gecikmesi",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "PR intervalinin uzaması AV nod veya His-Purkinje iletiminde gecikmeyi gösterir.",
    "preAnswerSafeDefinition": "PR intervalinin uzaması AV nod veya His-Purkinje iletiminde gecikmeyi gösterir.",
    "shortDefinition": "PR intervalinin uzaması AV nod veya His-Purkinje iletiminde gecikmeyi gösterir.",
    "definition": "PR intervalinin uzaması AV nod veya His-Purkinje iletiminde gecikmeyi gösterir.",
    "detailedExplanation": "PR uzaması birinci derece AV blokta temel EKG bulgusudur. İlaçlar, inferior MI, miyokardit veya elektrolit bozuklukları AV iletimi yavaşlatabilir.",
    "postAnswerExplanation": "PR uzaması birinci derece AV blokta temel EKG bulgusudur. İlaçlar, inferior MI, miyokardit veya elektrolit bozuklukları AV iletimi yavaşlatabilir.",
    "postAnswerExpandedExplanation": "PR uzaması birinci derece AV blokta temel EKG bulgusudur. İlaçlar, inferior MI, miyokardit veya elektrolit bozuklukları AV iletimi yavaşlatabilir.",
    "tusPearl": "PR uzaması = AV iletim gecikmesi; her PR uzaması yüksek derece blok anlamına gelmez.",
    "differentialPoint": "Birinci derece AV blokta her P dalgası QRS ile iletilir; Mobitz tiplerde düşen QRS kompleksleri görülür.",
    "clinicalRelevance": "PR uzaması = AV iletim gecikmesi; her PR uzaması yüksek derece blok anlamına gelmez.",
    "mechanism": "",
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedTerms": [
      "AV blok",
      "P dalgası",
      "AV nod",
      "İletim bloğu"
    ],
    "safeNestedTerms": [
      "AV blok",
      "P dalgası",
      "AV nod",
      "İletim bloğu"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "İletim bloğu",
      "PR uzaması",
      "P dalgası",
      "AV blok",
      "AV nod"
    ],
    "sourceTextExamples": [
      "src/data/pdfPediatricArrhythmiaCases.js içinde 'PR uzaması' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "ve serum elektrolitleriyle birlikte yorumlanmalıdır.\",  \"postAnswerExpandedExplanation\": \"Hiperkalemi bağlamında sivri T dalgası erken EKG bulgusu olabilir; daha ileri tabloda PR uzaması, QRS genişlemesi ve aritmi riski artar.\",  \"tusPearl\": \"Hiperkalemi + EKG değişikliği varsa ilk yaklaşım membran stabilizasyonu için intravenöz kalsiyum glukonattır.\",  \"differentialPoint\": \"İnsülin-glukoz potasyumu hücre içine..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 6,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/pdfPediatricArrhythmiaCases.js, src/data/tusGlossaryIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-genis-qrs-tasikardi",
    "term": "Geniş QRS taşikardi",
    "aliases": [
      "Geniş QRS taşikardi"
    ],
    "normalizedTerm": "genis qrs tasikardi",
    "TurkishName": "Geniş QRS taşikardi",
    "EnglishName": "",
    "category": "Kardiyoloji / acil ritim",
    "subcategory": "Aritmi sınıflaması",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "QRS kompleksinin geniş olduğu hızlı ritimdir; aksi kanıtlanana kadar ventriküler taşikardi gibi yönetilmesi güvenlidir.",
    "preAnswerSafeDefinition": "Geniş QRS taşikardi, acil klinik değerlendirmede mekanizma, risk veya yönetim basamağıyla ilişkili kavramdır.",
    "shortDefinition": "QRS kompleksinin geniş olduğu hızlı ritimdir; aksi kanıtlanana kadar ventriküler taşikardi gibi yönetilmesi güvenlidir.",
    "definition": "QRS kompleksinin geniş olduğu hızlı ritimdir; aksi kanıtlanana kadar ventriküler taşikardi gibi yönetilmesi güvenlidir.",
    "detailedExplanation": "Geniş QRS taşikardi VT, aberan iletili SVT veya preeksitasyon ilişkili ritimler nedeniyle oluşabilir. Hemodinamik instabilite varsa senkronize kardiyoversiyon önceliklidir.",
    "postAnswerExplanation": "Geniş QRS taşikardi VT, aberan iletili SVT veya preeksitasyon ilişkili ritimler nedeniyle oluşabilir. Hemodinamik instabilite varsa senkronize kardiyoversiyon önceliklidir.",
    "postAnswerExpandedExplanation": "Geniş QRS taşikardi VT, aberan iletili SVT veya preeksitasyon ilişkili ritimler nedeniyle oluşabilir. Hemodinamik instabilite varsa senkronize kardiyoversiyon önceliklidir.",
    "tusPearl": "Geniş QRS taşikardi sınavda güvenli yaklaşım: VT kabul et, instabilse senkronize kardiyoversiyon.",
    "differentialPoint": "Dar QRS genellikle supraventriküler kökeni; geniş QRS ventriküler köken/aberansi olasılığını düşündürür.",
    "clinicalRelevance": "Geniş QRS taşikardi sınavda güvenli yaklaşım: VT kabul et, instabilse senkronize kardiyoversiyon.",
    "mechanism": "",
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedTerms": [
      "Ventriküler taşikardi",
      "Senkronize kardiyoversiyon",
      "QRS genişlemesi",
      "Hemodinamik instabilite"
    ],
    "safeNestedTerms": [
      "Ventriküler taşikardi",
      "Senkronize kardiyoversiyon",
      "QRS genişlemesi",
      "Hemodinamik instabilite"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "Senkronize kardiyoversiyon",
      "Hemodinamik instabilite",
      "Ventriküler taşikardi",
      "Geniş QRS taşikardi",
      "QRS genişlemesi"
    ],
    "sourceTextExamples": [
      "i taşiaritmi kavramıdır.\",  \"postAnswerExplanation\": \"Yapısal kalp hastalığı veya iskemi zemininde görülebilir; stabilite ve nabız varlığı yönetimi belirler.\",  \"tusPearl\": \"Geniş QRS taşikardide aksi kanıtlanana kadar ventriküler taşikardi düşünülür.\",  \"differentialPoint\": \"SVT genellikle dar QRS’dir; aberansi varsa ayrım klinik olarak önemlidir.\",  \"clinicalContext\": \"Yapısal kalp hastalığı veya iskemi zemininde...",
      "src/data/tusGlossaryCandidateAuditIndex.js dosyasında 'Geniş QRS taşikardi' relatedTerms/safeNestedTerms/candidate-audit bağlamında geçiyor; aktif exact glossary entry olmadan öğretici ilişkili kavram olarak kaldığı saptandı."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "partialMatch",
      "sourceFilePath": "src/data/tusGlossaryCandidateAuditIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 24
    }
  },
  {
    "id": "v320-quality-batch3-yuksek-v-q-ve-alveoler-olu-bosluk-artisi",
    "term": "Yüksek V/Q ve alveoler ölü boşluk artışı",
    "aliases": [
      "Yüksek V/Q ve alveoler ölü boşluk artışı"
    ],
    "normalizedTerm": "yuksek v/q ve alveoler olu bosluk artisi",
    "TurkishName": "Yüksek V/Q ve alveoler ölü boşluk artışı",
    "EnglishName": "",
    "category": "Göğüs hastalıkları / fizyoloji",
    "subcategory": "Pulmoner emboli gaz değişimi",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Ventilasyonu süren ancak perfüzyonu azalan alveollerde V/Q oranının yükselmesi ve fizyolojik ölü boşluğun artmasıdır.",
    "preAnswerSafeDefinition": "Ventilasyonu süren ancak perfüzyonu azalan alveollerde V/Q oranının yükselmesi ve fizyolojik ölü boşluğun artmasıdır.",
    "shortDefinition": "Ventilasyonu süren ancak perfüzyonu azalan alveollerde V/Q oranının yükselmesi ve fizyolojik ölü boşluğun artmasıdır.",
    "definition": "Ventilasyonu süren ancak perfüzyonu azalan alveollerde V/Q oranının yükselmesi ve fizyolojik ölü boşluğun artmasıdır.",
    "detailedExplanation": "Pulmoner embolide tıkalı damar segmenti ventilasyon almaya devam eder fakat perfüzyon azalır; bu nedenle yüksek V/Q, ölü boşluk ventilasyonu ve hipoksemi gelişebilir.",
    "postAnswerExplanation": "Pulmoner embolide tıkalı damar segmenti ventilasyon almaya devam eder fakat perfüzyon azalır; bu nedenle yüksek V/Q, ölü boşluk ventilasyonu ve hipoksemi gelişebilir.",
    "postAnswerExpandedExplanation": "Pulmoner embolide tıkalı damar segmenti ventilasyon almaya devam eder fakat perfüzyon azalır; bu nedenle yüksek V/Q, ölü boşluk ventilasyonu ve hipoksemi gelişebilir.",
    "tusPearl": "PE’de temel gaz değişim mantığı düşük V/Q değil, perfüzyon kaybına bağlı yüksek V/Q/ölü boşluk artışıdır.",
    "differentialPoint": "Pnömoni/atelektazide düşük V/Q veya şant; pulmoner embolide yüksek V/Q ve ölü boşluk ön plandadır.",
    "clinicalRelevance": "PE’de temel gaz değişim mantığı düşük V/Q değil, perfüzyon kaybına bağlı yüksek V/Q/ölü boşluk artışıdır.",
    "mechanism": "",
    "relatedBranches": [
      "pulmonology"
    ],
    "relatedTerms": [
      "Pulmoner emboli",
      "Ölü boşluk ventilasyonu",
      "Hipoksemi",
      "V/Q oranı"
    ],
    "safeNestedTerms": [
      "Pulmoner emboli",
      "Ölü boşluk ventilasyonu",
      "Hipoksemi",
      "V/Q oranı"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "Yüksek V/Q ve alveoler ölü boşluk artışı",
      "Ölü boşluk ventilasyonu",
      "Pulmoner emboli",
      "Hipoksemi",
      "V/Q oranı"
    ],
    "sourceTextExamples": [
      "removed-branch-template-source içinde 'Yüksek V/Q ve alveoler ölü boşluk artışı' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "removed-safe-bank-source içinde 'Yüksek V/Q ve alveoler ölü boşluk artışı' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 9,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "removed-branch-template-source, removed-safe-bank-source",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-tup-torakostomi",
    "term": "Tüp torakostomi",
    "aliases": [
      "Tüp torakostomi"
    ],
    "normalizedTerm": "tup torakostomi",
    "TurkishName": "Tüp torakostomi",
    "EnglishName": "",
    "category": "Göğüs cerrahisi / acil girişim",
    "subcategory": "Plevral drenaj işlemi",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Plevral boşluğa tüp yerleştirilerek hava, kan veya sıvının drene edilmesini sağlayan girişimdir.",
    "preAnswerSafeDefinition": "Tüp torakostomi, acil klinik değerlendirmede mekanizma, risk veya yönetim basamağıyla ilişkili kavramdır.",
    "shortDefinition": "Plevral boşluğa tüp yerleştirilerek hava, kan veya sıvının drene edilmesini sağlayan girişimdir.",
    "definition": "Plevral boşluğa tüp yerleştirilerek hava, kan veya sıvının drene edilmesini sağlayan girişimdir.",
    "detailedExplanation": "Tansiyon pnömotoraks iğne dekompresyonu ile acil rahatlatılır; ardından kalıcı drenaj için tüp torakostomi gerekir. Hemotoraks ve büyük plevral koleksiyonlarda da drenaj sağlar.",
    "postAnswerExplanation": "Tansiyon pnömotoraks iğne dekompresyonu ile acil rahatlatılır; ardından kalıcı drenaj için tüp torakostomi gerekir. Hemotoraks ve büyük plevral koleksiyonlarda da drenaj sağlar.",
    "postAnswerExpandedExplanation": "Tansiyon pnömotoraks iğne dekompresyonu ile acil rahatlatılır; ardından kalıcı drenaj için tüp torakostomi gerekir. Hemotoraks ve büyük plevral koleksiyonlarda da drenaj sağlar.",
    "tusPearl": "Tansiyon pnömotoraksta önce acil dekompresyon, ardından tüp torakostomi ile kesin drenaj.",
    "differentialPoint": "Torasentez tanısal/terapötik iğne boşaltmadır; tüp torakostomi sürekli drenaj sağlar.",
    "clinicalRelevance": "Tansiyon pnömotoraksta önce acil dekompresyon, ardından tüp torakostomi ile kesin drenaj.",
    "mechanism": "",
    "relatedBranches": [
      "general-surgery",
      "pulmonology"
    ],
    "relatedTerms": [
      "Plevral boşluk",
      "Tansiyon pnömotoraks",
      "Mediastinal kayma",
      "Hemotoraks"
    ],
    "safeNestedTerms": [
      "Plevral boşluk",
      "Tansiyon pnömotoraks",
      "Mediastinal kayma",
      "Hemotoraks"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Tansiyon pnömotoraks",
      "Mediastinal kayma",
      "Tüp torakostomi",
      "Plevral boşluk",
      "Hemotoraks"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Tüp torakostomi' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "strüktif şok gelişimiyle sonuçlanabilir. Bu nedenle tanı klinik olarak düşünülür düşünülmez radyolojik doğrulama beklenmemelidir. Acil iğne dekompresyonu basıncı azaltır; ardından tüp torakostomi ile kalıcı hava drenajı sağlanır. Görüntüleme beklemek veya yalnız izlem yapmak yaşamı tehdit eden gecikmeye neden olabilir. Bronkoskopi, antibiyotik veya abdominal BT bu acil fizyolojik problemi..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 12,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 24
    }
  },
  {
    "id": "v320-quality-batch3-mediastinal-kayma",
    "term": "Mediastinal kayma",
    "aliases": [
      "Mediastinal kayma"
    ],
    "normalizedTerm": "mediastinal kayma",
    "TurkishName": "Mediastinal kayma",
    "EnglishName": "",
    "category": "Göğüs hastalıkları / görüntüleme",
    "subcategory": "Basınç etkisi bulgusu",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Mediasten yapılarının toraks içi basınç veya hacim değişikliği nedeniyle karşı tarafa veya aynı tarafa yer değiştirmesidir.",
    "preAnswerSafeDefinition": "Mediasten yapılarının toraks içi basınç veya hacim değişikliği nedeniyle karşı tarafa veya aynı tarafa yer değiştirmesidir.",
    "shortDefinition": "Mediasten yapılarının toraks içi basınç veya hacim değişikliği nedeniyle karşı tarafa veya aynı tarafa yer değiştirmesidir.",
    "definition": "Mediasten yapılarının toraks içi basınç veya hacim değişikliği nedeniyle karşı tarafa veya aynı tarafa yer değiştirmesidir.",
    "detailedExplanation": "Tansiyon pnömotoraksta artan intraplevral basınç mediasteni karşı tarafa iter ve venöz dönüşü azaltır. Atelektazide ise hacim kaybı mediasteni lezyon tarafına çekebilir.",
    "postAnswerExplanation": "Tansiyon pnömotoraksta artan intraplevral basınç mediasteni karşı tarafa iter ve venöz dönüşü azaltır. Atelektazide ise hacim kaybı mediasteni lezyon tarafına çekebilir.",
    "postAnswerExpandedExplanation": "Tansiyon pnömotoraksta artan intraplevral basınç mediasteni karşı tarafa iter ve venöz dönüşü azaltır. Atelektazide ise hacim kaybı mediasteni lezyon tarafına çekebilir.",
    "tusPearl": "Mediastinal kaymanın yönü ayırıcı tanıda değerlidir: basınç artışı iter, hacim kaybı çeker.",
    "differentialPoint": "Tansiyon pnömotoraks karşı tarafa iter; atelektazi lezyon tarafına çeker.",
    "clinicalRelevance": "Mediastinal kaymanın yönü ayırıcı tanıda değerlidir: basınç artışı iter, hacim kaybı çeker.",
    "mechanism": "",
    "relatedBranches": [
      "pulmonology"
    ],
    "relatedTerms": [
      "Tansiyon pnömotoraks",
      "Atelektazi",
      "Plevral basınç",
      "Venöz dönüş"
    ],
    "safeNestedTerms": [
      "Tansiyon pnömotoraks",
      "Atelektazi",
      "Plevral basınç",
      "Venöz dönüş"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Tansiyon pnömotoraks",
      "Mediastinal kayma",
      "Plevral basınç",
      "Venöz dönüş",
      "Atelektazi"
    ],
    "sourceTextExamples": [
      "raks\",  \"EnglishName\": \"\",  \"LatinName\": \"\",  \"abbreviation\": \"\",  \"category\": \"Acil / Pulmonoloji\",  \"shortDefinition\": \"Plevral boşlukta basınçlı hava birikimiyle mediastinal kayma ve obstrüktif şok yapabilen acil tablodur.\",  \"previewDefinition\": \"Plevral boşlukta basınçlı hava birikimiyle mediastinal kayma ve obstrüktif şok yapabilen acil tablodur.\",  \"preAnswerSafeDefinition\": \"Tansiyon pnömotoraks, klinik...",
      "n\": \"Plevral boşlukta basınçlı hava birikimiyle mediastinal kayma ve obstrüktif şok yapabilen acil tablodur.\",  \"previewDefinition\": \"Plevral boşlukta basınçlı hava birikimiyle mediastinal kayma ve obstrüktif şok yapabilen acil tablodur.\",  \"preAnswerSafeDefinition\": \"Tansiyon pnömotoraks, klinik yönetim veya tıbbi mekanizma bağlamında kullanılan yüksek değerli bir kavramdır.\",  \"detailedExplanation\": \"Plevral..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusGlossaryClinicalBranchDeepIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-plevral-bosluk",
    "term": "Plevral boşluk",
    "aliases": [
      "Plevral boşluk"
    ],
    "normalizedTerm": "plevral bosluk",
    "TurkishName": "Plevral boşluk",
    "EnglishName": "",
    "category": "Anatomi / solunum sistemi",
    "subcategory": "Seröz boşluk",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Visseral ve pariyetal plevra arasında yer alan, normalde az miktarda sıvı içeren potansiyel boşluktur.",
    "preAnswerSafeDefinition": "Visseral ve pariyetal plevra arasında yer alan, normalde az miktarda sıvı içeren potansiyel boşluktur.",
    "shortDefinition": "Visseral ve pariyetal plevra arasında yer alan, normalde az miktarda sıvı içeren potansiyel boşluktur.",
    "definition": "Visseral ve pariyetal plevra arasında yer alan, normalde az miktarda sıvı içeren potansiyel boşluktur.",
    "detailedExplanation": "Plevral boşluğa hava girerse pnömotoraks, sıvı girerse plevral efüzyon, kan girerse hemotoraks gelişir. Negatif basınç akciğerin ekspansiyonunu sürdürmeye yardım eder.",
    "postAnswerExplanation": "Plevral boşluğa hava girerse pnömotoraks, sıvı girerse plevral efüzyon, kan girerse hemotoraks gelişir. Negatif basınç akciğerin ekspansiyonunu sürdürmeye yardım eder.",
    "postAnswerExpandedExplanation": "Plevral boşluğa hava girerse pnömotoraks, sıvı girerse plevral efüzyon, kan girerse hemotoraks gelişir. Negatif basınç akciğerin ekspansiyonunu sürdürmeye yardım eder.",
    "tusPearl": "Plevral boşluk patolojilerinde ana mantık: hava/sıvı/kan akciğer ekspansiyonunu bozar.",
    "differentialPoint": "Alveoler boşluk akciğer parankimi içindedir; plevral boşluk akciğer dışındaki seröz aralıktır.",
    "clinicalRelevance": "Plevral boşluk patolojilerinde ana mantık: hava/sıvı/kan akciğer ekspansiyonunu bozar.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy",
      "pulmonology"
    ],
    "relatedTerms": [
      "Plevral basınç",
      "Pnömotoraks",
      "Plevral efüzyon",
      "Tüp torakostomi"
    ],
    "safeNestedTerms": [
      "Plevral basınç",
      "Pnömotoraks",
      "Plevral efüzyon",
      "Tüp torakostomi"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Plevral efüzyon",
      "Tüp torakostomi",
      "Plevral basınç",
      "Plevral boşluk",
      "Pnömotoraks"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Plevral boşluk' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "rax\",  \"Pulmonoloji\"  ]  },  {  \"term\": \"Tansiyon pnömotoraks\",  \"aliases\": [  \"tension pneumothorax\"  ],  \"category\": \"Acil\",  \"previewDefinition\": \"Plevral boşlukta basınç artışıyla mediastinal şift ve hemodinamik bozulma oluşturan pnömotorakstır.\",  \"preAnswerSafeDefinition\": \"Plevral boşlukta basınç artışıyla mediastinal şift ve hemodinamik bozulma oluşturan pnömotorakstır.\",  \"shortDefinition\": \"Plevral boşluk"
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 5,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js, src/data/tusGlossaryExpandedIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 18
    }
  },
  {
    "id": "v320-quality-batch3-plevral-basinc",
    "term": "Plevral basınç",
    "aliases": [
      "Plevral basınç"
    ],
    "normalizedTerm": "plevral basinc",
    "TurkishName": "Plevral basınç",
    "EnglishName": "",
    "category": "Solunum fizyolojisi",
    "subcategory": "İntraplevral basınç",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Plevral boşluk içindeki basınçtır; normalde atmosfer basıncından daha negatiftir ve akciğer ekspansiyonuna katkı sağlar.",
    "preAnswerSafeDefinition": "Plevral boşluk içindeki basınçtır; normalde atmosfer basıncından daha negatiftir ve akciğer ekspansiyonuna katkı sağlar.",
    "shortDefinition": "Plevral boşluk içindeki basınçtır; normalde atmosfer basıncından daha negatiftir ve akciğer ekspansiyonuna katkı sağlar.",
    "definition": "Plevral boşluk içindeki basınçtır; normalde atmosfer basıncından daha negatiftir ve akciğer ekspansiyonuna katkı sağlar.",
    "detailedExplanation": "Negatif plevral basınç kaybolduğunda akciğer kollabe olabilir. Tansiyon pnömotoraksta plevral basınç artarak mediastinal kayma ve dolaşım bozukluğu oluşturur.",
    "postAnswerExplanation": "Negatif plevral basınç kaybolduğunda akciğer kollabe olabilir. Tansiyon pnömotoraksta plevral basınç artarak mediastinal kayma ve dolaşım bozukluğu oluşturur.",
    "postAnswerExpandedExplanation": "Negatif plevral basınç kaybolduğunda akciğer kollabe olabilir. Tansiyon pnömotoraksta plevral basınç artarak mediastinal kayma ve dolaşım bozukluğu oluşturur.",
    "tusPearl": "Pnömotoraks mantığı: plevral negatif basınç kaybı → akciğer kollapsı.",
    "differentialPoint": "Transpulmoner basınç alveol ile plevra arasındaki farktır; plevral basınç tek başına boşluk basıncını ifade eder.",
    "clinicalRelevance": "Pnömotoraks mantığı: plevral negatif basınç kaybı → akciğer kollapsı.",
    "mechanism": "",
    "relatedBranches": [
      "pulmonology"
    ],
    "relatedTerms": [
      "Pnömotoraks",
      "Transpulmoner basınç",
      "Mediastinal kayma",
      "Akciğer kollapsı"
    ],
    "safeNestedTerms": [
      "Pnömotoraks",
      "Transpulmoner basınç",
      "Mediastinal kayma",
      "Akciğer kollapsı"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Transpulmoner basınç",
      "Mediastinal kayma",
      "Akciğer kollapsı",
      "Plevral basınç",
      "Pnömotoraks"
    ],
    "sourceTextExamples": [
      "ortDefinition\": \"Plevral boşlukta basınçlı hava birikimiyle venöz dönüşü azaltıp mediastinal kayma ve obstrüktif şok oluşturabilen acil tablodur.\",  \"preAnswerSafeDefinition\": \"Plevral basınç artışı ve dolaşım-solunum bozulması riski taşıyan yaşamı tehdit eden toraks acilidir.\",  \"postAnswerExplanation\": \"Tek yönlü hava kaçağı intratorasik basıncı artırır; hipotansiyon, juguler ven dolgunluğu, solunum sıkıntısı ve...",
      "shortDefinition\": \"Tansiyon pnömotoraksta plevral basıncı hızla azaltmak için göğüs duvarından iğne veya kateterle hava boşaltma girişimidir.\",  \"preAnswerSafeDefinition\": \"Plevral basınç artışına bağlı akut solunum-dolaşım bozukluğunu geçici olarak rahatlatmaya yönelik acil girişimdir.\",  \"postAnswerExplanation\": \"İğne dekompresyonu hızlı rahatlama sağlar ancak kalıcı tedavi genellikle tüp torakostomidir; klinik..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusGlossaryDefinitionQualityIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 18
    }
  },
  {
    "id": "v320-quality-batch3-hava-sivi-seviyesi",
    "term": "Hava-sıvı seviyesi",
    "aliases": [
      "Hava-sıvı seviyesi"
    ],
    "normalizedTerm": "hava-sivi seviyesi",
    "TurkishName": "Hava-sıvı seviyesi",
    "EnglishName": "",
    "category": "Görüntüleme / radyoloji",
    "subcategory": "Grafi bulgusu",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Görüntülemede aynı boşluk içinde hava ve sıvının yatay sınır oluşturacak şekilde birlikte görülmesidir.",
    "preAnswerSafeDefinition": "Görüntülemede aynı boşluk içinde hava ve sıvının yatay sınır oluşturacak şekilde birlikte görülmesidir.",
    "shortDefinition": "Görüntülemede aynı boşluk içinde hava ve sıvının yatay sınır oluşturacak şekilde birlikte görülmesidir.",
    "definition": "Görüntülemede aynı boşluk içinde hava ve sıvının yatay sınır oluşturacak şekilde birlikte görülmesidir.",
    "detailedExplanation": "Hava-sıvı seviyesi apse, obstrüksiyon, hidropnömotoraks veya bazı kaviter akciğer lezyonlarında görülebilir. Tek başına tanı koydurmaz, anatomik yerleşim ve klinik bağlamla yorumlanır.",
    "postAnswerExplanation": "Hava-sıvı seviyesi apse, obstrüksiyon, hidropnömotoraks veya bazı kaviter akciğer lezyonlarında görülebilir. Tek başına tanı koydurmaz, anatomik yerleşim ve klinik bağlamla yorumlanır.",
    "postAnswerExpandedExplanation": "Hava-sıvı seviyesi apse, obstrüksiyon, hidropnömotoraks veya bazı kaviter akciğer lezyonlarında görülebilir. Tek başına tanı koydurmaz, anatomik yerleşim ve klinik bağlamla yorumlanır.",
    "tusPearl": "Hava-sıvı seviyesi “boşluk + sıvı + gaz” varlığını gösterir; bağlam tanıyı belirler.",
    "differentialPoint": "Barsakta hava-sıvı seviyesi obstrüksiyon; akciğerde kavite/apse; plevrada hidropnömotoraks düşündürebilir.",
    "clinicalRelevance": "Hava-sıvı seviyesi “boşluk + sıvı + gaz” varlığını gösterir; bağlam tanıyı belirler.",
    "mechanism": "",
    "relatedBranches": [],
    "relatedTerms": [
      "Obstrüksiyon",
      "Apse",
      "Hidropnömotoraks",
      "Kavite"
    ],
    "safeNestedTerms": [
      "Obstrüksiyon",
      "Apse",
      "Hidropnömotoraks",
      "Kavite"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Hava-sıvı seviyesi",
      "Hidropnömotoraks",
      "Obstrüksiyon",
      "Kavite",
      "Apse"
    ],
    "sourceTextExamples": [
      "src/data/tusGlossaryV304ExtraIndex.js dosyasında 'Hava-sıvı seviyesi' relatedTerms/safeNestedTerms/candidate-audit bağlamında geçiyor; aktif exact glossary entry olmadan öğretici ilişkili kavram olarak kaldığı saptandı.",
      "ed\": true,  \"caseSensitiveDisplay\": false,  \"keywordsForSearch\": [  \"Ayakta direkt karın grafisi\",  \"ayakta karın grafisi\",  \"upright abdominal x-ray\",  \"Hava-sıvı seviyesi\",  \"Serbest hava\",  \"İleus\",  \"Perforasyon\"  ],  \"sourceTextExamples\": [  \"Ayakta direkt karın grafisi\",  \"Ayakta direkt karın grafisi perforasyon veya obstrüksiyon bulgusu gösterebilir ancak mezenterik damar tıkanıklığını güven"
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "partialMatch",
      "sourceFilePath": "src/data/tusGlossaryV304ExtraIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-kus-gagasi-gorunumu",
    "term": "Kuş gagası görünümü",
    "aliases": [
      "Kuş gagası görünümü"
    ],
    "normalizedTerm": "kus gagasi gorunumu",
    "TurkishName": "Kuş gagası görünümü",
    "EnglishName": "",
    "category": "Gastroenteroloji / radyoloji",
    "subcategory": "Akalazya görüntüleme bulgusu",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Özofagus distalinde düzgün daralma ve proksimal genişleme ile akalazyayı düşündüren baryum grafi bulgusudur.",
    "preAnswerSafeDefinition": "Özofagus distalinde düzgün daralma ve proksimal genişleme ile akalazyayı düşündüren baryum grafi bulgusudur.",
    "shortDefinition": "Özofagus distalinde düzgün daralma ve proksimal genişleme ile akalazyayı düşündüren baryum grafi bulgusudur.",
    "definition": "Özofagus distalinde düzgün daralma ve proksimal genişleme ile akalazyayı düşündüren baryum grafi bulgusudur.",
    "detailedExplanation": "Akalazyada alt özofagus sfinkteri gevşeyemez ve aperistaltizm gelişir; baryum grafide kuş gagası görünümü oluşur. Disfaji hem katı hem sıvılara karşı olabilir.",
    "postAnswerExplanation": "Akalazyada alt özofagus sfinkteri gevşeyemez ve aperistaltizm gelişir; baryum grafide kuş gagası görünümü oluşur. Disfaji hem katı hem sıvılara karşı olabilir.",
    "postAnswerExpandedExplanation": "Akalazyada alt özofagus sfinkteri gevşeyemez ve aperistaltizm gelişir; baryum grafide kuş gagası görünümü oluşur. Disfaji hem katı hem sıvılara karşı olabilir.",
    "tusPearl": "Katı+sıvı disfaji + kuş gagası görünümü = akalazya lehine yüksek değerli ipucu.",
    "differentialPoint": "Özofagus kanserinde progresif katıdan sıvıya disfaji; akalazyada başlangıçtan katı ve sıvı disfajisi beklenebilir.",
    "clinicalRelevance": "Katı+sıvı disfaji + kuş gagası görünümü = akalazya lehine yüksek değerli ipucu.",
    "mechanism": "",
    "relatedBranches": [
      "general-surgery"
    ],
    "relatedTerms": [
      "Akalazya",
      "Alt özofagus sfinkteri",
      "Disfaji",
      "Baryum grafi"
    ],
    "safeNestedTerms": [
      "Akalazya",
      "Alt özofagus sfinkteri",
      "Disfaji",
      "Baryum grafi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Alt özofagus sfinkteri",
      "Kuş gagası görünümü",
      "Baryum grafi",
      "Akalazya",
      "Disfaji"
    ],
    "sourceTextExamples": [
      "src/data/tusPearlCards.js içinde 'Kuş gagası görünümü' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "jik incelemedir.\",  \"definition\": \"Baryum kontrastla özofagus lümeni, pasajı ve motilitesinin değerlendirildiği radyolojik incelemedir.\",  \"detailedExplanation\": \"Akalazyada kuş gagası görünümü, divertikül veya striktür gibi yapısal sorunlar baryumlu grafide görülebilir. Endoskopi mukozal değerlendirme için tamamlayıcıdır.\",  \"postAnswerExplanation\": \"Akalazyada kuş gagası görünümü, divertikül veya striktür gibi..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusGlossaryV304ExtraIndex.js, src/data/tusPearlCards.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-serum-protein-elektroforezi",
    "term": "Serum protein elektroforezi",
    "aliases": [
      "Serum protein elektroforezi"
    ],
    "normalizedTerm": "serum protein elektroforezi",
    "TurkishName": "Serum protein elektroforezi",
    "EnglishName": "",
    "category": "Hematoloji / laboratuvar",
    "subcategory": "Monoklonal protein testi",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Serum protein fraksiyonlarını ayırarak monoklonal immünoglobulin artışını saptamaya yarayan laboratuvar testidir.",
    "preAnswerSafeDefinition": "Serum protein fraksiyonlarını ayırarak monoklonal immünoglobulin artışını saptamaya yarayan laboratuvar testidir.",
    "shortDefinition": "Serum protein fraksiyonlarını ayırarak monoklonal immünoglobulin artışını saptamaya yarayan laboratuvar testidir.",
    "definition": "Serum protein fraksiyonlarını ayırarak monoklonal immünoglobulin artışını saptamaya yarayan laboratuvar testidir.",
    "detailedExplanation": "Multipl miyelomda serum protein elektroforezinde M-spike görülebilir. CRAB bulguları ve serum/idrarda monoklonal protein araştırması birlikte değerlendirilir.",
    "postAnswerExplanation": "Multipl miyelomda serum protein elektroforezinde M-spike görülebilir. CRAB bulguları ve serum/idrarda monoklonal protein araştırması birlikte değerlendirilir.",
    "postAnswerExpandedExplanation": "Multipl miyelomda serum protein elektroforezinde M-spike görülebilir. CRAB bulguları ve serum/idrarda monoklonal protein araştırması birlikte değerlendirilir.",
    "tusPearl": "Kemik ağrısı + anemi/hiperkalsemi/böbrek bozukluğu + M-spike = multipl miyelom düşün.",
    "differentialPoint": "Poliklonal artış inflamasyon/enfeksiyonla ilişkili olabilir; monoklonal pik plazma hücre diskrazisini düşündürür.",
    "clinicalRelevance": "Kemik ağrısı + anemi/hiperkalsemi/böbrek bozukluğu + M-spike = multipl miyelom düşün.",
    "mechanism": "",
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedTerms": [
      "M proteini",
      "CRAB bulguları",
      "Multipl miyelom",
      "İmmünoglobulin"
    ],
    "safeNestedTerms": [
      "M proteini",
      "CRAB bulguları",
      "Multipl miyelom",
      "İmmünoglobulin"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Serum protein elektroforezi",
      "Multipl miyelom",
      "CRAB bulguları",
      "İmmünoglobulin",
      "M proteini"
    ],
    "sourceTextExamples": [
      "hafif zincir proteinidir.\",  \"definition\": \"Tek bir plazma hücresi klonundan kaynaklanan monoklonal immünoglobulin veya hafif zincir proteinidir.\",  \"detailedExplanation\": \"Serum protein elektroforezinde M spike, multipl miyelom veya MGUS gibi monoklonal gammopatileri düşündürür. Anemi, kemik lezyonu, hiperkalsemi ve böbrek hasarı miyelom lehinedir.\",  \"postAnswerExplanation\": \"Serum protein elektroforezinde M...",
      "M spike, multipl miyelom veya MGUS gibi monoklonal gammopatileri düşündürür. Anemi, kemik lezyonu, hiperkalsemi ve böbrek hasarı miyelom lehinedir.\",  \"postAnswerExplanation\": \"Serum protein elektroforezinde M spike, multipl miyelom veya MGUS gibi monoklonal gammopatileri düşündürür. Anemi, kemik lezyonu, hiperkalsemi ve böbrek hasarı miyelom lehinedir.\",  \"postAnswerExpandedExplanation\": \"Serum protein..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusGlossaryV304ExtraIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-crab-bulgulari",
    "term": "CRAB bulguları",
    "aliases": [
      "CRAB bulguları"
    ],
    "normalizedTerm": "crab bulgulari",
    "TurkishName": "CRAB bulguları",
    "EnglishName": "",
    "category": "Hematoloji / plazma hücre hastalıkları",
    "subcategory": "Multipl miyelom organ hasarı",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Multipl miyelomda organ hasarını gösteren hiperkalsemi, renal yetmezlik, anemi ve kemik lezyonları kısaltmasıdır.",
    "preAnswerSafeDefinition": "Multipl miyelomda organ hasarını gösteren hiperkalsemi, renal yetmezlik, anemi ve kemik lezyonları kısaltmasıdır.",
    "shortDefinition": "Multipl miyelomda organ hasarını gösteren hiperkalsemi, renal yetmezlik, anemi ve kemik lezyonları kısaltmasıdır.",
    "definition": "Multipl miyelomda organ hasarını gösteren hiperkalsemi, renal yetmezlik, anemi ve kemik lezyonları kısaltmasıdır.",
    "detailedExplanation": "CRAB bulguları plazma hücre proliferasyonunun klinik önemini ve tedavi gerekliliğini gösterir. Monoklonal protein varlığıyla birlikte miyelom tanısal düşüncesini güçlendirir.",
    "postAnswerExplanation": "CRAB bulguları plazma hücre proliferasyonunun klinik önemini ve tedavi gerekliliğini gösterir. Monoklonal protein varlığıyla birlikte miyelom tanısal düşüncesini güçlendirir.",
    "postAnswerExpandedExplanation": "CRAB bulguları plazma hücre proliferasyonunun klinik önemini ve tedavi gerekliliğini gösterir. Monoklonal protein varlığıyla birlikte miyelom tanısal düşüncesini güçlendirir.",
    "tusPearl": "CRAB = Calcium high, Renal failure, Anemia, Bone lesions; miyelom sorularında ana organ hasarı setidir.",
    "differentialPoint": "MGUS’ta monoklonal protein olabilir ama CRAB organ hasarı beklenmez.",
    "clinicalRelevance": "CRAB = Calcium high, Renal failure, Anemia, Bone lesions; miyelom sorularında ana organ hasarı setidir.",
    "mechanism": "",
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedTerms": [
      "Multipl miyelom",
      "M proteini",
      "Serum protein elektroforezi",
      "Hiperkalsemi"
    ],
    "safeNestedTerms": [
      "Multipl miyelom",
      "M proteini",
      "Serum protein elektroforezi",
      "Hiperkalsemi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "Serum protein elektroforezi",
      "Multipl miyelom",
      "CRAB bulguları",
      "Hiperkalsemi",
      "M proteini"
    ],
    "sourceTextExamples": [
      "M spike, multipl miyelom veya MGUS gibi monoklonal gammopatileri düşündürür. Anemi, kemik lezyonu, hiperkalsemi ve böbrek hasarı miyelom lehinedir.\",  \"tusPearl\": \"M proteini + CRAB bulguları multipl miyelom için yüksek değerli ipucudur.\",  \"differentialPoint\": \"Poliklonal gammopati yaygın immün aktivasyonu; M proteini klonal plazma hücre proliferasyonunu gösterir.\",  \"clinicalRelevance\": \"M proteini + CRAB...",
      "src/data/tusGlossaryV304ExtraIndex.js dosyasında 'CRAB bulguları' relatedTerms/safeNestedTerms/candidate-audit bağlamında geçiyor; aktif exact glossary entry olmadan öğretici ilişkili kavram olarak kaldığı saptandı."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "partialMatch",
      "sourceFilePath": "src/data/tusGlossaryV304ExtraIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-b-semptomlari",
    "term": "B semptomları",
    "aliases": [
      "B semptomları"
    ],
    "normalizedTerm": "b semptomlari",
    "TurkishName": "B semptomları",
    "EnglishName": "",
    "category": "Hematoloji / lenfoma",
    "subcategory": "Sistemik lenfoma semptomları",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Açıklanamayan ateş, gece terlemesi ve kilo kaybından oluşan sistemik semptom grubudur.",
    "preAnswerSafeDefinition": "Açıklanamayan ateş, gece terlemesi ve kilo kaybından oluşan sistemik semptom grubudur.",
    "shortDefinition": "Açıklanamayan ateş, gece terlemesi ve kilo kaybından oluşan sistemik semptom grubudur.",
    "definition": "Açıklanamayan ateş, gece terlemesi ve kilo kaybından oluşan sistemik semptom grubudur.",
    "detailedExplanation": "B semptomları lenfoma evreleme ve prognozunda önemlidir. Enfeksiyon ve inflamatuvar hastalıklar da benzer semptomlar yapabileceği için lenf nodu özellikleri ve patolojiyle birlikte değerlendirilir.",
    "postAnswerExplanation": "B semptomları lenfoma evreleme ve prognozunda önemlidir. Enfeksiyon ve inflamatuvar hastalıklar da benzer semptomlar yapabileceği için lenf nodu özellikleri ve patolojiyle birlikte değerlendirilir.",
    "postAnswerExpandedExplanation": "B semptomları lenfoma evreleme ve prognozunda önemlidir. Enfeksiyon ve inflamatuvar hastalıklar da benzer semptomlar yapabileceği için lenf nodu özellikleri ve patolojiyle birlikte değerlendirilir.",
    "tusPearl": "Lenfoma sorusunda ateş + gece terlemesi + kilo kaybı B semptomlarıdır ve evre/prognoz bilgisidir.",
    "differentialPoint": "Reaktif lenfadenopatide sistemik B semptomları beklenmeyebilir; malign lenfomada kalıcı ve açıklanamayan semptomlar önemlidir.",
    "clinicalRelevance": "Lenfoma sorusunda ateş + gece terlemesi + kilo kaybı B semptomlarıdır ve evre/prognoz bilgisidir.",
    "mechanism": "",
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedTerms": [
      "Hodgkin lenfoma",
      "Lenfadenopati",
      "Gece terlemesi",
      "Kilo kaybı"
    ],
    "safeNestedTerms": [
      "Hodgkin lenfoma",
      "Lenfadenopati",
      "Gece terlemesi",
      "Kilo kaybı"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Hodgkin lenfoma",
      "Gece terlemesi",
      "B semptomları",
      "Lenfadenopati",
      "Kilo kaybı"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'B semptomları' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "ısal değeri olan büyük B hücre kökenli atipik hücrelerdir. İmmünfenotip ve klinik bağlamla birlikte değerlendirilir.\",  \"postAnswerExpandedExplanation\": \"Ağrısız lenfadenopati, B semptomları ve Reed-Sternberg hücresi birlikteliği Hodgkin lenfoma lehine güçlü ipucudur.\",  \"tusPearl\": \"Reed-Sternberg hücresi klasik Hodgkin lenfomanın histolojik anahtar bulgusudur.\",  \"differentialPoint\": \"Non-Hodgkin lenfomalar..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 3,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js, src/data/tusGlossaryIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-pthrp",
    "term": "PTHrP",
    "aliases": [
      "PTHrP"
    ],
    "normalizedTerm": "pthrp",
    "TurkishName": "PTHrP",
    "EnglishName": "",
    "category": "Endokrinoloji / paraneoplastik mekanizma",
    "subcategory": "Humoral hiperkalsemi mediatörü",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Paratiroid hormon ilişkili peptid; bazı malignitelerde PTH benzeri etkiyle hiperkalsemi oluşturur.",
    "preAnswerSafeDefinition": "Paratiroid hormon ilişkili peptid; bazı malignitelerde PTH benzeri etkiyle hiperkalsemi oluşturur.",
    "shortDefinition": "Paratiroid hormon ilişkili peptid; bazı malignitelerde PTH benzeri etkiyle hiperkalsemi oluşturur.",
    "definition": "Paratiroid hormon ilişkili peptid; bazı malignitelerde PTH benzeri etkiyle hiperkalsemi oluşturur.",
    "detailedExplanation": "PTHrP osteoklast aktivitesini ve renal kalsiyum geri emilimini artırarak hiperkalsemi yapabilir. PTH baskılı, kalsiyum yüksek bir tabloda malignite ilişkili humoral hiperkalsemi düşünülür.",
    "postAnswerExplanation": "PTHrP osteoklast aktivitesini ve renal kalsiyum geri emilimini artırarak hiperkalsemi yapabilir. PTH baskılı, kalsiyum yüksek bir tabloda malignite ilişkili humoral hiperkalsemi düşünülür.",
    "postAnswerExpandedExplanation": "PTHrP osteoklast aktivitesini ve renal kalsiyum geri emilimini artırarak hiperkalsemi yapabilir. PTH baskılı, kalsiyum yüksek bir tabloda malignite ilişkili humoral hiperkalsemi düşünülür.",
    "tusPearl": "Hiperkalsemi + düşük PTH + malignite = PTHrP aracılı hiperkalsemi akla gelir.",
    "differentialPoint": "Primer hiperparatiroidizmde PTH yüksek/uygunsuz normaldir; PTHrP hiperkalsemisinde PTH baskılanır.",
    "clinicalRelevance": "Hiperkalsemi + düşük PTH + malignite = PTHrP aracılı hiperkalsemi akla gelir.",
    "mechanism": "",
    "relatedBranches": [
      "medical-biochemistry"
    ],
    "relatedTerms": [
      "Hiperkalsemi",
      "Paraneoplastik sendrom",
      "PTH",
      "Skuamöz hücreli karsinom"
    ],
    "safeNestedTerms": [
      "Hiperkalsemi",
      "Paraneoplastik sendrom",
      "PTH",
      "Skuamöz hücreli karsinom"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "Skuamöz hücreli karsinom",
      "Paraneoplastik sendrom",
      "Hiperkalsemi",
      "PTHrP",
      "PTH"
    ],
    "sourceTextExamples": [
      "src/data/tusPearlCards.js içinde 'PTHrP' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "triad olsa da çoğu insidental saptanır.\",  \"detailedExplanation\": \"Renal hücreli karsinom paraneoplastik sendromlar yapabilir: EPO artışıyla polisitemi, reninle hipertansiyon, PTHrP ile hiperkalsemi görülebilir. VHL ilişkisi ve berrak hücreli tip önemlidir.\",  \"postAnswerExplanation\": \"Renal hücreli karsinom paraneoplastik sendromlar yapabilir: EPO artışıyla polisitemi, reninle hipertansiyon, PTHrP ile hiperkalsemi..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusGlossaryV304ExtraIndex.js, src/data/tusPearlCards.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-paraneoplastik-sendrom",
    "term": "Paraneoplastik sendrom",
    "aliases": [
      "Paraneoplastik sendrom"
    ],
    "normalizedTerm": "paraneoplastik sendrom",
    "TurkishName": "Paraneoplastik sendrom",
    "EnglishName": "",
    "category": "Onkoloji / sistemik etki",
    "subcategory": "Tümör ilişkili uzak etki",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Tümörün lokal invazyon veya metastazından bağımsız, hormon/immün mekanizmalarla oluşturduğu sistemik klinik tablodur.",
    "preAnswerSafeDefinition": "Tümörün lokal invazyon veya metastazından bağımsız, hormon/immün mekanizmalarla oluşturduğu sistemik klinik tablodur.",
    "shortDefinition": "Tümörün lokal invazyon veya metastazından bağımsız, hormon/immün mekanizmalarla oluşturduğu sistemik klinik tablodur.",
    "definition": "Tümörün lokal invazyon veya metastazından bağımsız, hormon/immün mekanizmalarla oluşturduğu sistemik klinik tablodur.",
    "detailedExplanation": "Paraneoplastik sendromlar malignitenin ilk ipucu olabilir; hiperkalsemi, uygunsuz ADH, Cushing benzeri tablo veya nörolojik sendromlar görülebilir. Tümör yükünden bağımsız gelişebilir.",
    "postAnswerExplanation": "Paraneoplastik sendromlar malignitenin ilk ipucu olabilir; hiperkalsemi, uygunsuz ADH, Cushing benzeri tablo veya nörolojik sendromlar görülebilir. Tümör yükünden bağımsız gelişebilir.",
    "postAnswerExpandedExplanation": "Paraneoplastik sendromlar malignitenin ilk ipucu olabilir; hiperkalsemi, uygunsuz ADH, Cushing benzeri tablo veya nörolojik sendromlar görülebilir. Tümör yükünden bağımsız gelişebilir.",
    "tusPearl": "Kanser sorusunda uzak sistemik bulgu varsa paraneoplastik mekanizmayı düşün.",
    "differentialPoint": "Metastaz organ tutulumu ile bulgu yapar; paraneoplastik sendrom tümör ürünleri veya immün yanıtla uzak etki oluşturur.",
    "clinicalRelevance": "Kanser sorusunda uzak sistemik bulgu varsa paraneoplastik mekanizmayı düşün.",
    "mechanism": "",
    "relatedBranches": [],
    "relatedTerms": [
      "PTHrP",
      "SIADH",
      "Ektopik ACTH",
      "Malignite"
    ],
    "safeNestedTerms": [
      "PTHrP",
      "SIADH",
      "Ektopik ACTH",
      "Malignite"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Paraneoplastik sendrom",
      "Ektopik ACTH",
      "Malignite",
      "PTHrP",
      "SIADH"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Paraneoplastik sendrom' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "src/data/tusPearlCards.js içinde 'Paraneoplastik sendrom' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 3,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-topoizomeraz-iv",
    "term": "Topoizomeraz IV",
    "aliases": [
      "Topoizomeraz IV"
    ],
    "normalizedTerm": "topoizomeraz iv",
    "TurkishName": "Topoizomeraz IV",
    "EnglishName": "",
    "category": "Mikrobiyoloji / antibiyotik hedefi",
    "subcategory": "Kinolon hedef enzimi",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Bakteriyel DNA replikasyonu sırasında kardeş kromozomların ayrılmasına katkı sağlayan topoizomeraz enzimidir.",
    "preAnswerSafeDefinition": "Bakteriyel DNA replikasyonu sırasında kardeş kromozomların ayrılmasına katkı sağlayan topoizomeraz enzimidir.",
    "shortDefinition": "Bakteriyel DNA replikasyonu sırasında kardeş kromozomların ayrılmasına katkı sağlayan topoizomeraz enzimidir.",
    "definition": "Bakteriyel DNA replikasyonu sırasında kardeş kromozomların ayrılmasına katkı sağlayan topoizomeraz enzimidir.",
    "detailedExplanation": "Florokinolonlar DNA giraz ve topoizomeraz IV inhibisyonu üzerinden bakterisidal etki gösterir. Gram pozitiflerde topoizomeraz IV hedefi daha belirgin vurgulanabilir.",
    "postAnswerExplanation": "Florokinolonlar DNA giraz ve topoizomeraz IV inhibisyonu üzerinden bakterisidal etki gösterir. Gram pozitiflerde topoizomeraz IV hedefi daha belirgin vurgulanabilir.",
    "postAnswerExpandedExplanation": "Florokinolonlar DNA giraz ve topoizomeraz IV inhibisyonu üzerinden bakterisidal etki gösterir. Gram pozitiflerde topoizomeraz IV hedefi daha belirgin vurgulanabilir.",
    "tusPearl": "Kinolonlar DNA sentezini DNA giraz/topoizomeraz IV üzerinden bozar.",
    "differentialPoint": "Rifampisin RNA polimerazı; kinolonlar topoizomerazları hedefler.",
    "clinicalRelevance": "Kinolonlar DNA sentezini DNA giraz/topoizomeraz IV üzerinden bozar.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedTerms": [
      "DNA giraz inhibisyonu",
      "Florokinolon",
      "Bakterisidal etki",
      "DNA replikasyonu"
    ],
    "safeNestedTerms": [
      "DNA giraz inhibisyonu",
      "Florokinolon",
      "Bakterisidal etki",
      "DNA replikasyonu"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "DNA giraz inhibisyonu",
      "Bakterisidal etki",
      "DNA replikasyonu",
      "Topoizomeraz IV",
      "Florokinolon"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Topoizomeraz IV' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "Linezolid 23S rRNA içeren 50S alt birim üzerinden 70S başlangıç kompleksinin oluşumunu engeller. Tetrasiklinler 30S üzerinden A bölgesine tRNA girişini, florokinolonlar DNA giraz/topoizomeraz IV'ü, vankomisin ise D-Ala-D-Ala ucunu hedefler. Bu nedenle seçenekler arasında linezolide özgü mekanizma C'dir. Linezolid, oksazolidinon grubundadır ve 50S ribozomal alt birime bağlanarak protein sentezinin başlangıç..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 3,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-50s-ribozomal-alt-birim",
    "term": "50S ribozomal alt birim",
    "aliases": [
      "50S ribozomal alt birim"
    ],
    "normalizedTerm": "50s ribozomal alt birim",
    "TurkishName": "50S ribozomal alt birim",
    "EnglishName": "",
    "category": "Mikrobiyoloji / antibiyotik hedefi",
    "subcategory": "Protein sentezi hedefi",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Bakteriyel ribozomun büyük alt birimidir ve birçok antibiyotik sınıfının protein sentezi hedefidir.",
    "preAnswerSafeDefinition": "Bakteriyel ribozomun büyük alt birimidir ve birçok antibiyotik sınıfının protein sentezi hedefidir.",
    "shortDefinition": "Bakteriyel ribozomun büyük alt birimidir ve birçok antibiyotik sınıfının protein sentezi hedefidir.",
    "definition": "Bakteriyel ribozomun büyük alt birimidir ve birçok antibiyotik sınıfının protein sentezi hedefidir.",
    "detailedExplanation": "Makrolidler, klindamisin, kloramfenikol, linezolid ve streptograminler 50S ribozomal alt birim üzerinden protein sentezini bozar. 30S hedefli ilaçlardan ayrımı TUS’ta sık sorulur.",
    "postAnswerExplanation": "Makrolidler, klindamisin, kloramfenikol, linezolid ve streptograminler 50S ribozomal alt birim üzerinden protein sentezini bozar. 30S hedefli ilaçlardan ayrımı TUS’ta sık sorulur.",
    "postAnswerExpandedExplanation": "Makrolidler, klindamisin, kloramfenikol, linezolid ve streptograminler 50S ribozomal alt birim üzerinden protein sentezini bozar. 30S hedefli ilaçlardan ayrımı TUS’ta sık sorulur.",
    "tusPearl": "Makrolid/klindamisin/kloramfenikol/linezolid = 50S; tetrasiklin/aminoglikozid = 30S.",
    "differentialPoint": "30S ilaçları aminoasil-tRNA bağlanması veya okuma hatası; 50S ilaçları translokasyon/peptidil transferaz gibi basamakları etkiler.",
    "clinicalRelevance": "Makrolid/klindamisin/kloramfenikol/linezolid = 50S; tetrasiklin/aminoglikozid = 30S.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedTerms": [
      "Makrolid",
      "Klindamisin",
      "Kloramfenikol",
      "Linezolid"
    ],
    "safeNestedTerms": [
      "Makrolid",
      "Klindamisin",
      "Kloramfenikol",
      "Linezolid"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "50S ribozomal alt birim",
      "Kloramfenikol",
      "Klindamisin",
      "Linezolid",
      "Makrolid"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde '50S ribozomal alt birim' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "e trombositopeni yapabilir. DNA giraz/topoizomeraz inhibisyonu florokinolonların mekanizmasıdır; bu nedenle linezolid için yanlış eşleştirmedir. Linezolid oksazolidinon grubu olup 50S ribozomal alt birim üzerinden başlangıç kompleksinin oluşumunu engeller; DNA giraz inhibisyonu florokinolonlara aittir. DNA giraz inhibisyonu florokinolonlara aittir; linezolid bu yolla etki göstermez, bu nedenle yanlış ifade budur...."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 9,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-folinik-asit",
    "term": "Folinik asit",
    "aliases": [
      "Folinik asit"
    ],
    "normalizedTerm": "folinik asit",
    "TurkishName": "Folinik asit",
    "EnglishName": "",
    "category": "Farmakoloji / antidot-destek",
    "subcategory": "Leucovorin kurtarma",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Tetrahidrofolatın aktif türevi olarak folat yolunu bypass edebilen ve metotreksat toksisitesinde kurtarma amacıyla kullanılan bileşiktir.",
    "preAnswerSafeDefinition": "Tetrahidrofolatın aktif türevi olarak folat yolunu bypass edebilen ve metotreksat toksisitesinde kurtarma amacıyla kullanılan bileşiktir.",
    "shortDefinition": "Tetrahidrofolatın aktif türevi olarak folat yolunu bypass edebilen ve metotreksat toksisitesinde kurtarma amacıyla kullanılan bileşiktir.",
    "definition": "Tetrahidrofolatın aktif türevi olarak folat yolunu bypass edebilen ve metotreksat toksisitesinde kurtarma amacıyla kullanılan bileşiktir.",
    "detailedExplanation": "Folinik asit, dihidrofolat redüktaz inhibisyonu sonrası hücrelere aktif folat sağlayarak normal dokuları korur. Metotreksat tedavisinde leucovorin rescue mantığını açıklar.",
    "postAnswerExplanation": "Folinik asit, dihidrofolat redüktaz inhibisyonu sonrası hücrelere aktif folat sağlayarak normal dokuları korur. Metotreksat tedavisinde leucovorin rescue mantığını açıklar.",
    "postAnswerExpandedExplanation": "Folinik asit, dihidrofolat redüktaz inhibisyonu sonrası hücrelere aktif folat sağlayarak normal dokuları korur. Metotreksat tedavisinde leucovorin rescue mantığını açıklar.",
    "tusPearl": "Metotreksat toksisitesi/kurtarma = folinik asit; trimetoprim-pirimetamin folat yolunu mikroorganizma düzeyinde etkiler.",
    "differentialPoint": "Folik asit indirgenmeye ihtiyaç duyar; folinik asit daha downstream aktif formdur.",
    "clinicalRelevance": "Metotreksat toksisitesi/kurtarma = folinik asit; trimetoprim-pirimetamin folat yolunu mikroorganizma düzeyinde etkiler.",
    "mechanism": "",
    "relatedBranches": [],
    "relatedTerms": [
      "Metotreksat",
      "Dihidrofolat redüktaz",
      "Folat metabolizması",
      "Leucovorin"
    ],
    "safeNestedTerms": [
      "Metotreksat",
      "Dihidrofolat redüktaz",
      "Folat metabolizması",
      "Leucovorin"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Dihidrofolat redüktaz",
      "Folat metabolizması",
      "Folinik asit",
      "Metotreksat",
      "Leucovorin"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Folinik asit' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "src/data/tusPearlCards.js içinde 'Folinik asit' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 3,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-folat-metabolizmasi",
    "term": "Folat metabolizması",
    "aliases": [
      "Folat metabolizması"
    ],
    "normalizedTerm": "folat metabolizmasi",
    "TurkishName": "Folat metabolizması",
    "EnglishName": "",
    "category": "Biyokimya / tek karbon metabolizması",
    "subcategory": "DNA sentezi ve metilasyon",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Tek karbon transferleri, timidilat/pürin sentezi ve metilasyon reaksiyonlarıyla ilişkili metabolik yoldur.",
    "preAnswerSafeDefinition": "Tek karbon transferleri, timidilat/pürin sentezi ve metilasyon reaksiyonlarıyla ilişkili metabolik yoldur.",
    "shortDefinition": "Tek karbon transferleri, timidilat/pürin sentezi ve metilasyon reaksiyonlarıyla ilişkili metabolik yoldur.",
    "definition": "Tek karbon transferleri, timidilat/pürin sentezi ve metilasyon reaksiyonlarıyla ilişkili metabolik yoldur.",
    "detailedExplanation": "Folat eksikliği DNA sentezini bozarak megaloblastik anemi yapar; B12 eksikliği de folat tuzağı üzerinden benzer hematolojik tablo oluşturabilir. Nöral tüp defekti riskiyle de ilişkilidir.",
    "postAnswerExplanation": "Folat eksikliği DNA sentezini bozarak megaloblastik anemi yapar; B12 eksikliği de folat tuzağı üzerinden benzer hematolojik tablo oluşturabilir. Nöral tüp defekti riskiyle de ilişkilidir.",
    "postAnswerExpandedExplanation": "Folat eksikliği DNA sentezini bozarak megaloblastik anemi yapar; B12 eksikliği de folat tuzağı üzerinden benzer hematolojik tablo oluşturabilir. Nöral tüp defekti riskiyle de ilişkilidir.",
    "tusPearl": "Megaloblastik anemi + hipersegmente nötrofil = folat/B12 eksikliği; nörolojik bulgu B12 lehine ayırır.",
    "differentialPoint": "Folat eksikliğinde MMA artmaz; B12 eksikliğinde homosistein ve MMA artabilir.",
    "clinicalRelevance": "Megaloblastik anemi + hipersegmente nötrofil = folat/B12 eksikliği; nörolojik bulgu B12 lehine ayırır.",
    "mechanism": "",
    "relatedBranches": [
      "medical-biochemistry"
    ],
    "relatedTerms": [
      "Folat eksikliği",
      "B12 eksikliği",
      "DNA sentezi",
      "Homosistein artışı"
    ],
    "safeNestedTerms": [
      "Folat eksikliği",
      "B12 eksikliği",
      "DNA sentezi",
      "Homosistein artışı"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Folat metabolizması",
      "Homosistein artışı",
      "Folat eksikliği",
      "B12 eksikliği",
      "DNA sentezi"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Folat metabolizması' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "previewDefinition\": \"Dihidrofolatın tetrahidrofolata dönüşümünü azaltarak DNA sentezi için tek karbon aktarımını kısıtlayan mekanizmadır.\",  \"preAnswerSafeDefinition\": \"Folat metabolizması ve DNA senteziyle ilişkili farmakolojik mekanizmadır.\",  \"shortDefinition\": \"Dihidrofolatın tetrahidrofolata dönüşümünü azaltarak DNA sentezi için tek karbon aktarımını kısıtlayan mekanizmadır.\",  \"definition\": \"Dihidrofolatın..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js, src/data/tusGlossaryV304ExtraIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-vitamin-k-epoksit-reduktaz-inhibisyonu",
    "term": "Vitamin K epoksit redüktaz inhibisyonu",
    "aliases": [
      "Vitamin K epoksit redüktaz inhibisyonu"
    ],
    "normalizedTerm": "vitamin k epoksit reduktaz inhibisyonu",
    "TurkishName": "Vitamin K epoksit redüktaz inhibisyonu",
    "EnglishName": "",
    "category": "Farmakoloji / antikoagülan mekanizma",
    "subcategory": "Warfarin hedefi",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Warfarinin vitamin K döngüsünü bloke ederek II, VII, IX, X ve protein C/S aktivasyonunu azaltma mekanizmasıdır.",
    "preAnswerSafeDefinition": "Warfarinin vitamin K döngüsünü bloke ederek II, VII, IX, X ve protein C/S aktivasyonunu azaltma mekanizmasıdır.",
    "shortDefinition": "Warfarinin vitamin K döngüsünü bloke ederek II, VII, IX, X ve protein C/S aktivasyonunu azaltma mekanizmasıdır.",
    "definition": "Warfarinin vitamin K döngüsünü bloke ederek II, VII, IX, X ve protein C/S aktivasyonunu azaltma mekanizmasıdır.",
    "detailedExplanation": "Vitamin K epoksit redüktaz inhibisyonu gamma-karboksilasyonu azaltır; böylece pıhtılaşma faktörleri işlevsel hale gelemez. Başlangıçta protein C düşüşü nedeniyle geçici hiperkoagülabilite riski vardır.",
    "postAnswerExplanation": "Vitamin K epoksit redüktaz inhibisyonu gamma-karboksilasyonu azaltır; böylece pıhtılaşma faktörleri işlevsel hale gelemez. Başlangıçta protein C düşüşü nedeniyle geçici hiperkoagülabilite riski vardır.",
    "postAnswerExpandedExplanation": "Vitamin K epoksit redüktaz inhibisyonu gamma-karboksilasyonu azaltır; böylece pıhtılaşma faktörleri işlevsel hale gelemez. Başlangıçta protein C düşüşü nedeniyle geçici hiperkoagülabilite riski vardır.",
    "tusPearl": "Warfarin = vitamin K epoksit redüktaz inhibisyonu; etkisi INR ile izlenir.",
    "differentialPoint": "Heparin antitrombin üzerinden hızlı etki eder; warfarin yeni faktör sentezini etkilediği için gecikmeli etkilidir.",
    "clinicalRelevance": "Warfarin = vitamin K epoksit redüktaz inhibisyonu; etkisi INR ile izlenir.",
    "mechanism": "",
    "relatedBranches": [],
    "relatedTerms": [
      "Warfarin",
      "INR",
      "Protein C",
      "Gamma-karboksilasyon"
    ],
    "safeNestedTerms": [
      "Warfarin",
      "INR",
      "Protein C",
      "Gamma-karboksilasyon"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Vitamin K epoksit redüktaz inhibisyonu",
      "Gamma-karboksilasyon",
      "Protein C",
      "Warfarin",
      "INR"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Vitamin K epoksit redüktaz inhibisyonu' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "src/data/tusPearlCards.js içinde 'Vitamin K epoksit redüktaz inhibisyonu' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 6,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-statin-toksisitesi",
    "term": "Statin toksisitesi",
    "aliases": [
      "Statin toksisitesi"
    ],
    "normalizedTerm": "statin toksisitesi",
    "TurkishName": "Statin toksisitesi",
    "EnglishName": "",
    "category": "Farmakoloji / yan etki",
    "subcategory": "Miyopati-rabdomiyoliz riski",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Statin kullanımıyla ilişkili kas toksisitesi spektrumudur; miyaljiden rabdomiyolize kadar değişebilir.",
    "preAnswerSafeDefinition": "Statin kullanımıyla ilişkili kas toksisitesi spektrumudur; miyaljiden rabdomiyolize kadar değişebilir.",
    "shortDefinition": "Statin kullanımıyla ilişkili kas toksisitesi spektrumudur; miyaljiden rabdomiyolize kadar değişebilir.",
    "definition": "Statin kullanımıyla ilişkili kas toksisitesi spektrumudur; miyaljiden rabdomiyolize kadar değişebilir.",
    "detailedExplanation": "CYP3A4 inhibitörleri veya yüksek doz statinler miyopati/rabdomiyoliz riskini artırır. CK yüksekliği, kas ağrısı ve koyu idrar klinik uyarı bulgularıdır.",
    "postAnswerExplanation": "CYP3A4 inhibitörleri veya yüksek doz statinler miyopati/rabdomiyoliz riskini artırır. CK yüksekliği, kas ağrısı ve koyu idrar klinik uyarı bulgularıdır.",
    "postAnswerExpandedExplanation": "CYP3A4 inhibitörleri veya yüksek doz statinler miyopati/rabdomiyoliz riskini artırır. CK yüksekliği, kas ağrısı ve koyu idrar klinik uyarı bulgularıdır.",
    "tusPearl": "Statin + makrolid/azol gibi CYP inhibitörü = miyopati/rabdomiyoliz riski artar.",
    "differentialPoint": "Basit miyaljide CK normal olabilir; rabdomiyolizde CK belirgin yüksek ve böbrek hasarı riski vardır.",
    "clinicalRelevance": "Statin + makrolid/azol gibi CYP inhibitörü = miyopati/rabdomiyoliz riski artar.",
    "mechanism": "",
    "relatedBranches": [],
    "relatedTerms": [
      "Rabdomiyoliz",
      "CK yüksekliği",
      "CYP3A4 inhibitörü",
      "Miyopati"
    ],
    "safeNestedTerms": [
      "Rabdomiyoliz",
      "CK yüksekliği",
      "CYP3A4 inhibitörü",
      "Miyopati"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Statin toksisitesi",
      "CYP3A4 inhibitörü",
      "CK yüksekliği",
      "Rabdomiyoliz",
      "Miyopati"
    ],
    "sourceTextExamples": [
      "src/data/tusPearlCards.js içinde 'Statin toksisitesi' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "src/data/tusGlossaryV304ExtraIndex.js dosyasında 'Statin toksisitesi' relatedTerms/safeNestedTerms/candidate-audit bağlamında geçiyor; aktif exact glossary entry olmadan öğretici ilişkili kavram olarak kaldığı saptandı."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "partialMatch",
      "sourceFilePath": "src/data/tusGlossaryV304ExtraIndex.js, src/data/tusPearlCards.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-rabdomiyoliz",
    "term": "Rabdomiyoliz",
    "aliases": [
      "Rabdomiyoliz"
    ],
    "normalizedTerm": "rabdomiyoliz",
    "TurkishName": "Rabdomiyoliz",
    "EnglishName": "",
    "category": "Dahiliye / kas yıkımı",
    "subcategory": "Miyoglobinüri ve AKI riski",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "İskelet kası yıkımıyla CK ve miyoglobin salınması; akut böbrek hasarı ve elektrolit bozukluğu riski oluşturan tablodur.",
    "preAnswerSafeDefinition": "İskelet kası yıkımıyla CK ve miyoglobin salınması; akut böbrek hasarı ve elektrolit bozukluğu riski oluşturan tablodur.",
    "shortDefinition": "İskelet kası yıkımıyla CK ve miyoglobin salınması; akut böbrek hasarı ve elektrolit bozukluğu riski oluşturan tablodur.",
    "definition": "İskelet kası yıkımıyla CK ve miyoglobin salınması; akut böbrek hasarı ve elektrolit bozukluğu riski oluşturan tablodur.",
    "detailedExplanation": "Rabdomiyolizde kas ağrısı, güçsüzlük, koyu renk idrar, CK yüksekliği ve hiperkalemi görülebilir. Tedavide böbrek perfüzyonunu korumak için agresif sıvı önemlidir.",
    "postAnswerExplanation": "Rabdomiyolizde kas ağrısı, güçsüzlük, koyu renk idrar, CK yüksekliği ve hiperkalemi görülebilir. Tedavide böbrek perfüzyonunu korumak için agresif sıvı önemlidir.",
    "postAnswerExpandedExplanation": "Rabdomiyolizde kas ağrısı, güçsüzlük, koyu renk idrar, CK yüksekliği ve hiperkalemi görülebilir. Tedavide böbrek perfüzyonunu korumak için agresif sıvı önemlidir.",
    "tusPearl": "Kas yıkımı + koyu idrar + CK yüksekliği = rabdomiyoliz; hiperkalemi açısından izle.",
    "differentialPoint": "Hemolizde hemoglobinüri; rabdomiyolizde miyoglobinüri ve CK yüksekliği ön plandadır.",
    "clinicalRelevance": "Kas yıkımı + koyu idrar + CK yüksekliği = rabdomiyoliz; hiperkalemi açısından izle.",
    "mechanism": "",
    "relatedBranches": [],
    "relatedTerms": [
      "CK yüksekliği",
      "Miyoglobinüri",
      "Akut böbrek hasarı",
      "Hiperkalemi"
    ],
    "safeNestedTerms": [
      "CK yüksekliği",
      "Miyoglobinüri",
      "Akut böbrek hasarı",
      "Hiperkalemi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Akut böbrek hasarı",
      "CK yüksekliği",
      "Miyoglobinüri",
      "Rabdomiyoliz",
      "Hiperkalemi"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Rabdomiyoliz' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "src/data/tusPearlCards.js içinde 'Rabdomiyoliz' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 6,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-ter-kloruru",
    "term": "Ter klorürü",
    "aliases": [
      "Ter klorürü"
    ],
    "normalizedTerm": "ter kloruru",
    "TurkishName": "Ter klorürü",
    "EnglishName": "",
    "category": "Pediatri / tanısal test",
    "subcategory": "Kistik fibrozis testi",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Ter testinde ölçülen klorür düzeyidir; yüksekliği kistik fibrozis tanısını destekler.",
    "preAnswerSafeDefinition": "Ter testinde ölçülen klorür düzeyidir; yüksekliği kistik fibrozis tanısını destekler.",
    "shortDefinition": "Ter testinde ölçülen klorür düzeyidir; yüksekliği kistik fibrozis tanısını destekler.",
    "definition": "Ter testinde ölçülen klorür düzeyidir; yüksekliği kistik fibrozis tanısını destekler.",
    "detailedExplanation": "CFTR bozukluğunda ter bezlerinde klorür geri emilimi azalır ve ter klorürü yükselir. Klinik olarak kronik sinopulmoner enfeksiyon, pankreatik yetmezlik ve steatore ile ilişkilidir.",
    "postAnswerExplanation": "CFTR bozukluğunda ter bezlerinde klorür geri emilimi azalır ve ter klorürü yükselir. Klinik olarak kronik sinopulmoner enfeksiyon, pankreatik yetmezlik ve steatore ile ilişkilidir.",
    "postAnswerExpandedExplanation": "CFTR bozukluğunda ter bezlerinde klorür geri emilimi azalır ve ter klorürü yükselir. Klinik olarak kronik sinopulmoner enfeksiyon, pankreatik yetmezlik ve steatore ile ilişkilidir.",
    "tusPearl": "Tekrarlayan akciğer enfeksiyonu + steatore + yüksek ter klorürü = kistik fibrozis.",
    "differentialPoint": "Primer siliyer diskinezide ter klorürü normaldir; kistik fibroziste CFTR kaynaklı yüksek beklenir.",
    "clinicalRelevance": "Tekrarlayan akciğer enfeksiyonu + steatore + yüksek ter klorürü = kistik fibrozis.",
    "mechanism": "",
    "relatedBranches": [],
    "relatedTerms": [
      "Kistik fibrozis",
      "CFTR",
      "Steatore",
      "Sinopulmoner enfeksiyon"
    ],
    "safeNestedTerms": [
      "Kistik fibrozis",
      "CFTR",
      "Steatore",
      "Sinopulmoner enfeksiyon"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Sinopulmoner enfeksiyon",
      "Kistik fibrozis",
      "Ter klorürü",
      "Steatore",
      "CFTR"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Ter klorürü' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "ozis veya kronik pankreatitte yağlı dışkı, kilo alamama ve yağda eriyen vitamin eksiklikleriyle birliktedir.\",  \"tusPearl\": \"Tekrarlayan akciğer enfeksiyonu + steatore + yüksek ter klorürü kistik fibrozis bağlamında önemlidir.\",  \"differentialPoint\": \"Endokrin pankreas yetmezliği glukoz metabolizmasını; ekzokrin yetmezlik sindirimi etkiler.\",  \"clinicalContext\": \"Kistik fibrozis veya kronik pankreatitte yağlı dışkı,..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js, src/data/tusGlossaryCandidateAuditIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-kistik-fibrozis",
    "term": "Kistik fibrozis",
    "aliases": [
      "Kistik fibrozis"
    ],
    "normalizedTerm": "kistik fibrozis",
    "TurkishName": "Kistik fibrozis",
    "EnglishName": "",
    "category": "Pediatri / genetik hastalık",
    "subcategory": "CFTR kanal hastalığı",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "CFTR klor kanal bozukluğu nedeniyle viskoz sekresyon, kronik akciğer enfeksiyonu ve pankreatik yetmezlik yapan otozomal resesif hastalıktır.",
    "preAnswerSafeDefinition": "CFTR klor kanal bozukluğu nedeniyle viskoz sekresyon, kronik akciğer enfeksiyonu ve pankreatik yetmezlik yapan otozomal resesif hastalıktır.",
    "shortDefinition": "CFTR klor kanal bozukluğu nedeniyle viskoz sekresyon, kronik akciğer enfeksiyonu ve pankreatik yetmezlik yapan otozomal resesif hastalıktır.",
    "definition": "CFTR klor kanal bozukluğu nedeniyle viskoz sekresyon, kronik akciğer enfeksiyonu ve pankreatik yetmezlik yapan otozomal resesif hastalıktır.",
    "detailedExplanation": "Kistik fibroziste klor transportu bozulur; havayolu sekresyonları koyulaşır, bronşiektazi ve Pseudomonas enfeksiyonları gelişebilir. Pankreatik enzim yetersizliği steatore yapar.",
    "postAnswerExplanation": "Kistik fibroziste klor transportu bozulur; havayolu sekresyonları koyulaşır, bronşiektazi ve Pseudomonas enfeksiyonları gelişebilir. Pankreatik enzim yetersizliği steatore yapar.",
    "postAnswerExpandedExplanation": "Kistik fibroziste klor transportu bozulur; havayolu sekresyonları koyulaşır, bronşiektazi ve Pseudomonas enfeksiyonları gelişebilir. Pankreatik enzim yetersizliği steatore yapar.",
    "tusPearl": "Kronik sinopulmoner enfeksiyon + steatore + yüksek ter klorürü = kistik fibrozis.",
    "differentialPoint": "Primer siliyer diskinezi infertilite/situs inversusla ilişkilidir; kistik fibroziste pankreatik yetmezlik ve yüksek ter klorürü öne çıkar.",
    "clinicalRelevance": "Kronik sinopulmoner enfeksiyon + steatore + yüksek ter klorürü = kistik fibrozis.",
    "mechanism": "",
    "relatedBranches": [],
    "relatedTerms": [
      "CFTR",
      "Ter klorürü",
      "Pseudomonas",
      "Pankreatik yetmezlik"
    ],
    "safeNestedTerms": [
      "CFTR",
      "Ter klorürü",
      "Pseudomonas",
      "Pankreatik yetmezlik"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Pankreatik yetmezlik",
      "Kistik fibrozis",
      "Pseudomonas",
      "Ter klorürü",
      "CFTR"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Kistik fibrozis' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "bozar, tekrarlayan enfeksiyonlara ve bronşektazi gelişimine zemin hazırlar. Diğer seçenekler alfa-1 antitripsin eksikliği, surfaktan veya oksijen taşıma fizyolojisiyle ilgilidir. Kistik fibrozis CFTR klor kanalındaki bozukluk nedeniyle epitel iyon ve su taşınmasını etkiler. Hava yollarında klor sekresyonu bozulur, sodyum ve su geri emilimi artar; epitel yüzey sıvısı azalır ve koyu, yapışkan sekresyonlar oluşur. TUS..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 7,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-anti-duz-kas-antikoru",
    "term": "Anti-düz kas antikoru",
    "aliases": [
      "Anti-düz kas antikoru"
    ],
    "normalizedTerm": "anti-duz kas antikoru",
    "TurkishName": "Anti-düz kas antikoru",
    "EnglishName": "",
    "category": "Hepatoloji / otoimmün belirteç",
    "subcategory": "Tip 1 otoimmün hepatit belirteci",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Otoimmün hepatitte özellikle tip 1 formu destekleyen otoantikor belirtecidir.",
    "preAnswerSafeDefinition": "Otoimmün hepatitte özellikle tip 1 formu destekleyen otoantikor belirtecidir.",
    "shortDefinition": "Otoimmün hepatitte özellikle tip 1 formu destekleyen otoantikor belirtecidir.",
    "definition": "Otoimmün hepatitte özellikle tip 1 formu destekleyen otoantikor belirtecidir.",
    "detailedExplanation": "Anti-düz kas antikoru ANA ve IgG yüksekliğiyle birlikte tip 1 otoimmün hepatit lehine güçlü ipucu sağlar. Primer biliyer kolanjitten AMA/kolestatik patern ile ayrılır.",
    "postAnswerExplanation": "Anti-düz kas antikoru ANA ve IgG yüksekliğiyle birlikte tip 1 otoimmün hepatit lehine güçlü ipucu sağlar. Primer biliyer kolanjitten AMA/kolestatik patern ile ayrılır.",
    "postAnswerExpandedExplanation": "Anti-düz kas antikoru ANA ve IgG yüksekliğiyle birlikte tip 1 otoimmün hepatit lehine güçlü ipucu sağlar. Primer biliyer kolanjitten AMA/kolestatik patern ile ayrılır.",
    "tusPearl": "ANA + anti-SMA + IgG yüksekliği = tip 1 otoimmün hepatit lehine.",
    "differentialPoint": "AMA + ALP yüksekliği primer biliyer kolanjit; anti-SMA + transaminaz/IgG yüksekliği otoimmün hepatit lehinedir.",
    "clinicalRelevance": "ANA + anti-SMA + IgG yüksekliği = tip 1 otoimmün hepatit lehine.",
    "mechanism": "",
    "relatedBranches": [],
    "relatedTerms": [
      "Otoimmün hepatit",
      "IgG yüksekliği",
      "ANA",
      "Anti-mitokondriyal antikor"
    ],
    "safeNestedTerms": [
      "Otoimmün hepatit",
      "IgG yüksekliği",
      "ANA",
      "Anti-mitokondriyal antikor"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Anti-mitokondriyal antikor",
      "Anti-düz kas antikoru",
      "Otoimmün hepatit",
      "IgG yüksekliği",
      "ANA"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Anti-düz kas antikoru' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "ha çok tip 2 otoimmün hepatiti, anti-PLA2R primer membranöz nefropatiyi, anti-HBc IgM ise akut hepatit B enfeksiyonunu düşündürür. Tip 1 otoimmün hepatit en sık formdur ve ANA ile anti-düz kas antikoru pozitifliğiyle ilişkilidir; sıklıkla hipergammaglobulinemi/IgG yüksekliği eşlik eder. Doğru cevaptır; tip 1 otoimmün hepatit için ANA ve anti-düz kas antikoru en klasik serolojik kombinasyondur. TUS açısından ayırıcı..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-igg-yuksekligi",
    "term": "IgG yüksekliği",
    "aliases": [
      "IgG yüksekliği"
    ],
    "normalizedTerm": "igg yuksekligi",
    "TurkishName": "IgG yüksekliği",
    "EnglishName": "",
    "category": "Hepatoloji / immünoloji laboratuvarı",
    "subcategory": "Otoimmün hepatit ipucu",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Serum IgG düzeyinin artmasıdır; otoimmün hepatitte tipik laboratuvar destek bulgusudur.",
    "preAnswerSafeDefinition": "Serum IgG düzeyinin artmasıdır; otoimmün hepatitte tipik laboratuvar destek bulgusudur.",
    "shortDefinition": "Serum IgG düzeyinin artmasıdır; otoimmün hepatitte tipik laboratuvar destek bulgusudur.",
    "definition": "Serum IgG düzeyinin artmasıdır; otoimmün hepatitte tipik laboratuvar destek bulgusudur.",
    "detailedExplanation": "Otoimmün hepatitte poliklonal IgG artışı hepatoselüler inflamasyon ve otoimmün aktiviteyi destekler. Kolestatik enzim yüksekliği ve AMA ise primer biliyer kolanjit yönünü güçlendirir.",
    "postAnswerExplanation": "Otoimmün hepatitte poliklonal IgG artışı hepatoselüler inflamasyon ve otoimmün aktiviteyi destekler. Kolestatik enzim yüksekliği ve AMA ise primer biliyer kolanjit yönünü güçlendirir.",
    "postAnswerExpandedExplanation": "Otoimmün hepatitte poliklonal IgG artışı hepatoselüler inflamasyon ve otoimmün aktiviteyi destekler. Kolestatik enzim yüksekliği ve AMA ise primer biliyer kolanjit yönünü güçlendirir.",
    "tusPearl": "Transaminaz yüksekliği + ANA/anti-SMA + IgG yüksekliği = otoimmün hepatit.",
    "differentialPoint": "IgM yüksekliği ve AMA primer biliyer kolanjitte daha tipiktir; IgG yüksekliği otoimmün hepatiti destekler.",
    "clinicalRelevance": "Transaminaz yüksekliği + ANA/anti-SMA + IgG yüksekliği = otoimmün hepatit.",
    "mechanism": "",
    "relatedBranches": [
      "immunology"
    ],
    "relatedTerms": [
      "Otoimmün hepatit",
      "Anti-düz kas antikoru",
      "ANA",
      "Primer biliyer kolanjit"
    ],
    "safeNestedTerms": [
      "Otoimmün hepatit",
      "Anti-düz kas antikoru",
      "ANA",
      "Primer biliyer kolanjit"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Primer biliyer kolanjit",
      "Anti-düz kas antikoru",
      "Otoimmün hepatit",
      "IgG yüksekliği",
      "ANA"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'IgG yüksekliği' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "IgM ise akut hepatit B enfeksiyonunu düşündürür. Tip 1 otoimmün hepatit en sık formdur ve ANA ile anti-düz kas antikoru pozitifliğiyle ilişkilidir; sıklıkla hipergammaglobulinemi/IgG yüksekliği eşlik eder. Doğru cevaptır; tip 1 otoimmün hepatit için ANA ve anti-düz kas antikoru en klasik serolojik kombinasyondur. TUS açısından ayırıcı nokta: Otoimmün hepatit sorularında tip 1 = ANA/anti-SMA; tip 2 = anti-LKM-1..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-hbv-dna",
    "term": "HBV DNA",
    "aliases": [
      "HBV DNA"
    ],
    "normalizedTerm": "hbv dna",
    "TurkishName": "HBV DNA",
    "EnglishName": "",
    "category": "Enfeksiyon hastalıkları / viroloji",
    "subcategory": "Hepatit B viral replikasyon testi",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Hepatit B virüsünün kanda ölçülen genetik materyali; viral replikasyon düzeyini gösterir.",
    "preAnswerSafeDefinition": "Hepatit B virüsünün kanda ölçülen genetik materyali; viral replikasyon düzeyini gösterir.",
    "shortDefinition": "Hepatit B virüsünün kanda ölçülen genetik materyali; viral replikasyon düzeyini gösterir.",
    "definition": "Hepatit B virüsünün kanda ölçülen genetik materyali; viral replikasyon düzeyini gösterir.",
    "detailedExplanation": "HBV DNA tedavi kararı, bulaştırıcılık ve antiviral yanıt izlemi açısından kullanılır. Serolojik belirteçlerle birlikte yorumlanır; tek başına akut/kronik ayrımı yapmaz.",
    "postAnswerExplanation": "HBV DNA tedavi kararı, bulaştırıcılık ve antiviral yanıt izlemi açısından kullanılır. Serolojik belirteçlerle birlikte yorumlanır; tek başına akut/kronik ayrımı yapmaz.",
    "postAnswerExpandedExplanation": "HBV DNA tedavi kararı, bulaştırıcılık ve antiviral yanıt izlemi açısından kullanılır. Serolojik belirteçlerle birlikte yorumlanır; tek başına akut/kronik ayrımı yapmaz.",
    "tusPearl": "HBV’de replikasyon yükü ve tedavi takibinde HBV DNA önemlidir.",
    "differentialPoint": "HBsAg enfeksiyon varlığını, anti-HBc IgM akutluğu, HBV DNA viral yükü/replikasyonu gösterir.",
    "clinicalRelevance": "HBV’de replikasyon yükü ve tedavi takibinde HBV DNA önemlidir.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedTerms": [
      "HBsAg",
      "Anti-HBc IgM",
      "Viral yük",
      "Kronik hepatit B"
    ],
    "safeNestedTerms": [
      "HBsAg",
      "Anti-HBc IgM",
      "Viral yük",
      "Kronik hepatit B"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "Kronik hepatit B",
      "Anti-HBc IgM",
      "Viral yük",
      "HBV DNA",
      "HBsAg"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'HBV DNA' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "src/data/tusGlossaryCandidateAuditIndex.js dosyasında 'HBV DNA' relatedTerms/safeNestedTerms/candidate-audit bağlamında geçiyor; aktif exact glossary entry olmadan öğretici ilişkili kavram olarak kaldığı saptandı."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 4,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "partialMatch",
      "sourceFilePath": "src/data/cases.js, src/data/tusGlossaryCandidateAuditIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-viral-yuk",
    "term": "Viral yük",
    "aliases": [
      "Viral yük"
    ],
    "normalizedTerm": "viral yuk",
    "TurkishName": "Viral yük",
    "EnglishName": "",
    "category": "Enfeksiyon hastalıkları / viroloji",
    "subcategory": "Kantitatif viral ölçüm",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Kandaki viral genetik materyal miktarını gösteren kantitatif ölçümdür.",
    "preAnswerSafeDefinition": "Kandaki viral genetik materyal miktarını gösteren kantitatif ölçümdür.",
    "shortDefinition": "Kandaki viral genetik materyal miktarını gösteren kantitatif ölçümdür.",
    "definition": "Kandaki viral genetik materyal miktarını gösteren kantitatif ölçümdür.",
    "detailedExplanation": "Viral yük HIV, HBV ve HCV gibi enfeksiyonlarda hastalık aktivitesi, bulaştırıcılık ve tedavi yanıtını izlemek için kullanılır. Antikor testleriyle aynı şeyi ölçmez.",
    "postAnswerExplanation": "Viral yük HIV, HBV ve HCV gibi enfeksiyonlarda hastalık aktivitesi, bulaştırıcılık ve tedavi yanıtını izlemek için kullanılır. Antikor testleriyle aynı şeyi ölçmez.",
    "postAnswerExpandedExplanation": "Viral yük HIV, HBV ve HCV gibi enfeksiyonlarda hastalık aktivitesi, bulaştırıcılık ve tedavi yanıtını izlemek için kullanılır. Antikor testleriyle aynı şeyi ölçmez.",
    "tusPearl": "Tedavi yanıtı izleminde viral yük azalması beklenir; seroloji her zaman aktif replikasyonu göstermez.",
    "differentialPoint": "Antikor maruziyet/immün yanıtı gösterir; viral yük aktif replikasyon miktarını gösterir.",
    "clinicalRelevance": "Tedavi yanıtı izleminde viral yük azalması beklenir; seroloji her zaman aktif replikasyonu göstermez.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedTerms": [
      "HBV DNA",
      "HIV RNA",
      "PCR",
      "Antiviral tedavi"
    ],
    "safeNestedTerms": [
      "HBV DNA",
      "HIV RNA",
      "PCR",
      "Antiviral tedavi"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Antiviral tedavi",
      "Viral yük",
      "HBV DNA",
      "HIV RNA",
      "PCR"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Viral yük' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "arlığını saptayan moleküler tanı yöntemidir.\",  \"preAnswerSafeDefinition\": \"Nükleik asit temelli tanısal çoğaltma yöntemidir.\",  \"postAnswerExplanation\": \"Enfeksiyon tanısı, viral yük, genetik mutasyon ve patojen saptamada kullanılır; kontaminasyon ve klinik bağlam birlikte değerlendirilmelidir.\",  \"tusPearl\": \"PCR canlı mikroorganizma varlığını değil hedef genetik materyali gösterir.\",  \"differentialPoint\": \"Kültür..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js, src/data/tusGlossaryCandidateAuditIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-mikolik-asit",
    "term": "Mikolik asit",
    "aliases": [
      "Mikolik asit"
    ],
    "normalizedTerm": "mikolik asit",
    "TurkishName": "Mikolik asit",
    "EnglishName": "",
    "category": "Mikrobiyoloji / bakteri hücre duvarı",
    "subcategory": "Asit-fastlık nedeni",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Mycobacterium türlerinin hücre duvarında bulunan uzun zincirli yağ asididir ve aside dirençli boyanmanın temel nedenidir.",
    "preAnswerSafeDefinition": "Mycobacterium türlerinin hücre duvarında bulunan uzun zincirli yağ asididir ve aside dirençli boyanmanın temel nedenidir.",
    "shortDefinition": "Mycobacterium türlerinin hücre duvarında bulunan uzun zincirli yağ asididir ve aside dirençli boyanmanın temel nedenidir.",
    "definition": "Mycobacterium türlerinin hücre duvarında bulunan uzun zincirli yağ asididir ve aside dirençli boyanmanın temel nedenidir.",
    "detailedExplanation": "Mikolik asit zengin hücre duvarı hidrofobik ve dayanıklıdır; Ziehl-Neelsen ile aside dirençli basil görünümü oluşur. Tüberküloz patogenezinde ve tanısında önemlidir.",
    "postAnswerExplanation": "Mikolik asit zengin hücre duvarı hidrofobik ve dayanıklıdır; Ziehl-Neelsen ile aside dirençli basil görünümü oluşur. Tüberküloz patogenezinde ve tanısında önemlidir.",
    "postAnswerExpandedExplanation": "Mikolik asit zengin hücre duvarı hidrofobik ve dayanıklıdır; Ziehl-Neelsen ile aside dirençli basil görünümü oluşur. Tüberküloz patogenezinde ve tanısında önemlidir.",
    "tusPearl": "Asit-fast basil mantığı = mikolik asitli hücre duvarı.",
    "differentialPoint": "Gram boyama Mycobacterium için yetersiz olabilir; asit-fast boyama mikolik asit nedeniyle kullanılır.",
    "clinicalRelevance": "Asit-fast basil mantığı = mikolik asitli hücre duvarı.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedTerms": [
      "Mycobacterium tuberculosis",
      "Aside dirençli basil",
      "Ziehl-Neelsen",
      "Kazeöz nekroz"
    ],
    "safeNestedTerms": [
      "Mycobacterium tuberculosis",
      "Aside dirençli basil",
      "Ziehl-Neelsen",
      "Kazeöz nekroz"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Mycobacterium tuberculosis",
      "Aside dirençli basil",
      "Kazeöz nekroz",
      "Ziehl-Neelsen",
      "Mikolik asit"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Mikolik asit' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "ik / Antiprotozoal\"  ]  },  {  \"term\": \"İzoniazid\",  \"aliases\": [  \"INH\",  \"isoniazid\"  ],  \"category\": \"Antitüberküloz ilaç\",  \"previewDefinition\": \"Mikolik asit sentezini inhibe eden birinci basamak tüberküloz ilacıdır.\",  \"preAnswerSafeDefinition\": \"Mikolik asit sentezini inhibe eden birinci basamak tüberküloz ilacıdır.\",  \"shortDefinition\": \"Mikolik asit sentezini inhibe eden birinci basamak tüberküloz ilacıd"
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 3,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js, src/data/tusGlossarySupplementalIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-rolatif-bradikardi",
    "term": "Rölatif bradikardi",
    "aliases": [
      "Rölatif bradikardi"
    ],
    "normalizedTerm": "rolatif bradikardi",
    "TurkishName": "Rölatif bradikardi",
    "EnglishName": "",
    "category": "Enfeksiyon hastalıkları / vital bulgu",
    "subcategory": "Ateşe göre düşük nabız",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Ateş derecesine göre beklenenden daha düşük kalp hızı görülmesidir.",
    "preAnswerSafeDefinition": "Ateş derecesine göre beklenenden daha düşük kalp hızı görülmesidir.",
    "shortDefinition": "Ateş derecesine göre beklenenden daha düşük kalp hızı görülmesidir.",
    "definition": "Ateş derecesine göre beklenenden daha düşük kalp hızı görülmesidir.",
    "detailedExplanation": "Rölatif bradikardi tifo, bazı atipik enfeksiyonlar ve ilaç/otonom yanıt durumlarında görülebilir. Ateş-nabız uyumsuzluğu klinik ipucu sağlar ama tek başına tanı koydurmaz.",
    "postAnswerExplanation": "Rölatif bradikardi tifo, bazı atipik enfeksiyonlar ve ilaç/otonom yanıt durumlarında görülebilir. Ateş-nabız uyumsuzluğu klinik ipucu sağlar ama tek başına tanı koydurmaz.",
    "postAnswerExpandedExplanation": "Rölatif bradikardi tifo, bazı atipik enfeksiyonlar ve ilaç/otonom yanıt durumlarında görülebilir. Ateş-nabız uyumsuzluğu klinik ipucu sağlar ama tek başına tanı koydurmaz.",
    "tusPearl": "Yüksek ateşe rağmen nabız beklenenden düşükse rölatif bradikardi kavramını düşün.",
    "differentialPoint": "Normal ateş yanıtında nabız artar; rölatif bradikardide bu artış beklenenden azdır.",
    "clinicalRelevance": "Yüksek ateşe rağmen nabız beklenenden düşükse rölatif bradikardi kavramını düşün.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedTerms": [
      "Salmonella Typhi",
      "Tifo",
      "Ateş",
      "Vital bulgu"
    ],
    "safeNestedTerms": [
      "Salmonella Typhi",
      "Tifo",
      "Ateş",
      "Vital bulgu"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Rölatif bradikardi",
      "Salmonella Typhi",
      "Vital bulgu",
      "Ateş",
      "Tifo"
    ],
    "sourceTextExamples": [
      "Tifo/paratifo gibi enterik ateş tablolarında klasik olarak basamaklı ateş paterni öğretici bir ipucu olarak kullanılır.\",  \"tusPearl\": \"Basamaklı ateş + karın yakınmaları + rölatif bradikardi enterik ateşi düşündürebilir.\",  \"differentialPoint\": \"Malaryada periyodik ateş paternleri, brusellozda dalgalı ateş anlatımı daha tipiktir.\",  \"clinicalRelevance\": \"Enfeksiyon sorularında ateş paterniyle etken/hastalık...",
      "src/data/tusGlossaryIndex.js dosyasında 'Rölatif bradikardi' relatedTerms/safeNestedTerms/candidate-audit bağlamında geçiyor; aktif exact glossary entry olmadan öğretici ilişkili kavram olarak kaldığı saptandı."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "partialMatch",
      "sourceFilePath": "src/data/tusGlossaryIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-salmonella-typhi",
    "term": "Salmonella Typhi",
    "aliases": [
      "Salmonella Typhi"
    ],
    "normalizedTerm": "salmonella typhi",
    "TurkishName": "Salmonella Typhi",
    "EnglishName": "",
    "category": "Mikrobiyoloji / bakteriyel etken",
    "subcategory": "Tifo etkeni",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Tifo ateşine neden olan insan rezervuarlı Salmonella serotipidir.",
    "preAnswerSafeDefinition": "Tifo ateşine neden olan insan rezervuarlı Salmonella serotipidir.",
    "shortDefinition": "Tifo ateşine neden olan insan rezervuarlı Salmonella serotipidir.",
    "definition": "Tifo ateşine neden olan insan rezervuarlı Salmonella serotipidir.",
    "detailedExplanation": "Salmonella Typhi makrofajlar içinde yaşayabilir, sistemik yayılım ve enterik ateş tablosu oluşturabilir. Rölatif bradikardi, karın bulguları ve rose spot gibi ipuçlarıyla sorulabilir.",
    "postAnswerExplanation": "Salmonella Typhi makrofajlar içinde yaşayabilir, sistemik yayılım ve enterik ateş tablosu oluşturabilir. Rölatif bradikardi, karın bulguları ve rose spot gibi ipuçlarıyla sorulabilir.",
    "postAnswerExpandedExplanation": "Salmonella Typhi makrofajlar içinde yaşayabilir, sistemik yayılım ve enterik ateş tablosu oluşturabilir. Rölatif bradikardi, karın bulguları ve rose spot gibi ipuçlarıyla sorulabilir.",
    "tusPearl": "Enterik ateş + rölatif bradikardi + seyahat/temas öyküsü = Salmonella Typhi akla gelir.",
    "differentialPoint": "Non-tifoidal Salmonella daha çok gastroenterit yapar; S. Typhi sistemik enterik ateşle ilişkilidir.",
    "clinicalRelevance": "Enterik ateş + rölatif bradikardi + seyahat/temas öyküsü = Salmonella Typhi akla gelir.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedTerms": [
      "Tifo",
      "Rölatif bradikardi",
      "Makrofaj",
      "Kan kültürü"
    ],
    "safeNestedTerms": [
      "Tifo",
      "Rölatif bradikardi",
      "Makrofaj",
      "Kan kültürü"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Rölatif bradikardi",
      "Salmonella Typhi",
      "Kan kültürü",
      "Makrofaj",
      "Tifo"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Salmonella Typhi' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "sitesini artıran biyofilm matriksinin önemli bileşenidir. Protein A Staphylococcus aureus, M proteini Streptococcus pyogenes, poliglutamat kapsül Bacillus anthracis ve Vi antijeni Salmonella Typhi ile ilişkilidir. Pseudomonas aeruginosa’da alginat yapısındaki ekzopolisakkarit mukoid fenotip ve biyofilm oluşumuyla ilişkilidir; kronik kolonizasyonu kolaylaştırır. Alginat Pseudomonas aeruginosa’nın mukoid biyofilm..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 3,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-staphylococcus-epidermidis",
    "term": "Staphylococcus epidermidis",
    "aliases": [
      "Staphylococcus epidermidis"
    ],
    "normalizedTerm": "staphylococcus epidermidis",
    "TurkishName": "Staphylococcus epidermidis",
    "EnglishName": "",
    "category": "Mikrobiyoloji / fırsatçı etken",
    "subcategory": "Koagülaz negatif stafilokok",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Deri florasında bulunan, biyofilm oluşturarak kateter ve protez enfeksiyonlarına yol açabilen koagülaz negatif stafilokoktur.",
    "preAnswerSafeDefinition": "Deri florasında bulunan, biyofilm oluşturarak kateter ve protez enfeksiyonlarına yol açabilen koagülaz negatif stafilokoktur.",
    "shortDefinition": "Deri florasında bulunan, biyofilm oluşturarak kateter ve protez enfeksiyonlarına yol açabilen koagülaz negatif stafilokoktur.",
    "definition": "Deri florasında bulunan, biyofilm oluşturarak kateter ve protez enfeksiyonlarına yol açabilen koagülaz negatif stafilokoktur.",
    "detailedExplanation": "S. epidermidis yabancı cisim yüzeylerinde biyofilm oluşturur; kateter, protez kapak veya eklem protezi enfeksiyonlarında önemlidir. Novobiyosine duyarlı olması S. saprophyticus’tan ayrımda kullanılır.",
    "postAnswerExplanation": "S. epidermidis yabancı cisim yüzeylerinde biyofilm oluşturur; kateter, protez kapak veya eklem protezi enfeksiyonlarında önemlidir. Novobiyosine duyarlı olması S. saprophyticus’tan ayrımda kullanılır.",
    "postAnswerExpandedExplanation": "S. epidermidis yabancı cisim yüzeylerinde biyofilm oluşturur; kateter, protez kapak veya eklem protezi enfeksiyonlarında önemlidir. Novobiyosine duyarlı olması S. saprophyticus’tan ayrımda kullanılır.",
    "tusPearl": "Protez/kateter + biyofilm + koagülaz negatif stafilokok = S. epidermidis.",
    "differentialPoint": "S. aureus koagülaz pozitiftir ve daha virülandır; S. epidermidis yabancı cisim/biyofilm enfeksiyonlarıyla öne çıkar.",
    "clinicalRelevance": "Protez/kateter + biyofilm + koagülaz negatif stafilokok = S. epidermidis.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedTerms": [
      "Biyofilm",
      "Kateter enfeksiyonu",
      "Koagülaz negatif",
      "Protez kapak"
    ],
    "safeNestedTerms": [
      "Biyofilm",
      "Kateter enfeksiyonu",
      "Koagülaz negatif",
      "Protez kapak"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Staphylococcus epidermidis",
      "Kateter enfeksiyonu",
      "Koagülaz negatif",
      "Protez kapak",
      "Biyofilm"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Staphylococcus epidermidis' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "src/data/tusPearlCards.js içinde 'Staphylococcus epidermidis' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 4,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-nekrotizan-fasiit",
    "term": "Nekrotizan fasiit",
    "aliases": [
      "Nekrotizan fasiit"
    ],
    "normalizedTerm": "nekrotizan fasiit",
    "TurkishName": "Nekrotizan fasiit",
    "EnglishName": "",
    "category": "Acil / enfeksiyon",
    "subcategory": "Yumuşak doku acili",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Fasya boyunca hızla ilerleyen, doku nekrozu ve sepsis riski yüksek yumuşak doku enfeksiyonudur.",
    "preAnswerSafeDefinition": "Nekrotizan fasiit, acil klinik değerlendirmede mekanizma, risk veya yönetim basamağıyla ilişkili kavramdır.",
    "shortDefinition": "Fasya boyunca hızla ilerleyen, doku nekrozu ve sepsis riski yüksek yumuşak doku enfeksiyonudur.",
    "definition": "Fasya boyunca hızla ilerleyen, doku nekrozu ve sepsis riski yüksek yumuşak doku enfeksiyonudur.",
    "detailedExplanation": "Nekrotizan fasiitte ağrının muayene bulgusuna göre orantısız şiddetli olması, toksik görünüm, krepitasyon veya büller uyarıcıdır. Erken geniş spektrum antibiyotik ve acil cerrahi debridman gerekir.",
    "postAnswerExplanation": "Nekrotizan fasiitte ağrının muayene bulgusuna göre orantısız şiddetli olması, toksik görünüm, krepitasyon veya büller uyarıcıdır. Erken geniş spektrum antibiyotik ve acil cerrahi debridman gerekir.",
    "postAnswerExpandedExplanation": "Nekrotizan fasiitte ağrının muayene bulgusuna göre orantısız şiddetli olması, toksik görünüm, krepitasyon veya büller uyarıcıdır. Erken geniş spektrum antibiyotik ve acil cerrahi debridman gerekir.",
    "tusPearl": "Orantısız şiddetli ağrı + hızla ilerleyen yumuşak doku enfeksiyonu = nekrotizan fasiit; cerrahi geciktirilmez.",
    "differentialPoint": "Selülitte antibiyotik yeterli olabilir; nekrotizan fasiitte cerrahi debridman hayat kurtarıcıdır.",
    "clinicalRelevance": "Orantısız şiddetli ağrı + hızla ilerleyen yumuşak doku enfeksiyonu = nekrotizan fasiit; cerrahi geciktirilmez.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedTerms": [
      "Orantısız şiddetli ağrı",
      "Cerrahi debridman",
      "Sepsis",
      "Krepitasyon"
    ],
    "safeNestedTerms": [
      "Orantısız şiddetli ağrı",
      "Cerrahi debridman",
      "Sepsis",
      "Krepitasyon"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Orantısız şiddetli ağrı",
      "Cerrahi debridman",
      "Nekrotizan fasiit",
      "Krepitasyon",
      "Sepsis"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Nekrotizan fasiit' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "src/data/tusPearlCards.js içinde 'Nekrotizan fasiit' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 4,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js, src/data/tusPearlCards.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 24
    }
  },
  {
    "id": "v320-quality-batch3-kolinerjik-toksidrom",
    "term": "Kolinerjik toksidrom",
    "aliases": [
      "Kolinerjik toksidrom"
    ],
    "normalizedTerm": "kolinerjik toksidrom",
    "TurkishName": "Kolinerjik toksidrom",
    "EnglishName": "",
    "category": "Toksikoloji / otonom sendrom",
    "subcategory": "Asetilkolin fazlalığı tablosu",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Muskarinik ve nikotinik aşırı uyarılmaya bağlı salivasyon, bronkore, bradikardi, diyare, miyozis ve kas fasikülasyonlarıyla seyreden toksidromdur.",
    "preAnswerSafeDefinition": "Kolinerjik toksidrom, acil klinik değerlendirmede mekanizma, risk veya yönetim basamağıyla ilişkili kavramdır.",
    "shortDefinition": "Muskarinik ve nikotinik aşırı uyarılmaya bağlı salivasyon, bronkore, bradikardi, diyare, miyozis ve kas fasikülasyonlarıyla seyreden toksidromdur.",
    "definition": "Muskarinik ve nikotinik aşırı uyarılmaya bağlı salivasyon, bronkore, bradikardi, diyare, miyozis ve kas fasikülasyonlarıyla seyreden toksidromdur.",
    "detailedExplanation": "Organofosfat zehirlenmesinde asetilkolinesteraz inhibisyonu kolinerjik toksidrom yapar. Atropin muskarinik bulguları, pralidoksim ise erken dönemde enzim reaktivasyonunu hedefler.",
    "postAnswerExplanation": "Organofosfat zehirlenmesinde asetilkolinesteraz inhibisyonu kolinerjik toksidrom yapar. Atropin muskarinik bulguları, pralidoksim ise erken dönemde enzim reaktivasyonunu hedefler.",
    "postAnswerExpandedExplanation": "Organofosfat zehirlenmesinde asetilkolinesteraz inhibisyonu kolinerjik toksidrom yapar. Atropin muskarinik bulguları, pralidoksim ise erken dönemde enzim reaktivasyonunu hedefler.",
    "tusPearl": "SLUDGE/DUMBELS + bronkore/bradikardi = kolinerjik toksidrom; solunum sekresyonu ölümcül olabilir.",
    "differentialPoint": "Antikolinerjik toksidromda kuru deri, midriyazis ve üriner retansiyon; kolinerjikte ıslak/sekresyonlu tablo beklenir.",
    "clinicalRelevance": "SLUDGE/DUMBELS + bronkore/bradikardi = kolinerjik toksidrom; solunum sekresyonu ölümcül olabilir.",
    "mechanism": "",
    "relatedBranches": [
      "emergency-medicine"
    ],
    "relatedTerms": [
      "Asetilkolinesteraz inhibisyonu",
      "Atropin",
      "Pralidoksim",
      "Bronkore"
    ],
    "safeNestedTerms": [
      "Asetilkolinesteraz inhibisyonu",
      "Atropin",
      "Pralidoksim",
      "Bronkore"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Asetilkolinesteraz inhibisyonu",
      "Kolinerjik toksidrom",
      "Pralidoksim",
      "Bronkore",
      "Atropin"
    ],
    "sourceTextExamples": [
      "removed-static-seed-source içinde 'Kolinerjik toksidrom' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "src/data/cases.js içinde 'Kolinerjik toksidrom' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 5,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "removed-static-seed-source, src/data/cases.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 24
    }
  },
  {
    "id": "v320-quality-batch3-tca-toksisitesi",
    "term": "TCA toksisitesi",
    "aliases": [
      "TCA toksisitesi"
    ],
    "normalizedTerm": "tca toksisitesi",
    "TurkishName": "TCA toksisitesi",
    "EnglishName": "",
    "category": "Toksikoloji / kardiyotoksisite",
    "subcategory": "Sodyum kanal blokajı",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Trisiklik antidepresan zehirlenmesinde antikolinerjik etki, nöbet, hipotansiyon ve sodyum kanal blokajına bağlı QRS genişlemesiyle seyreden toksisite tablosudur.",
    "preAnswerSafeDefinition": "TCA toksisitesi, acil klinik değerlendirmede mekanizma, risk veya yönetim basamağıyla ilişkili kavramdır.",
    "shortDefinition": "Trisiklik antidepresan zehirlenmesinde antikolinerjik etki, nöbet, hipotansiyon ve sodyum kanal blokajına bağlı QRS genişlemesiyle seyreden toksisite tablosudur.",
    "definition": "Trisiklik antidepresan zehirlenmesinde antikolinerjik etki, nöbet, hipotansiyon ve sodyum kanal blokajına bağlı QRS genişlemesiyle seyreden toksisite tablosudur.",
    "detailedExplanation": "TCA toksisitesinde geniş QRS ventriküler aritmi riskini gösterir; tedavide sodyum bikarbonat kardiyak membran etkisini azaltır. Antikolinerjik bulgular tanıya destek olur.",
    "postAnswerExplanation": "TCA toksisitesinde geniş QRS ventriküler aritmi riskini gösterir; tedavide sodyum bikarbonat kardiyak membran etkisini azaltır. Antikolinerjik bulgular tanıya destek olur.",
    "postAnswerExpandedExplanation": "TCA toksisitesinde geniş QRS ventriküler aritmi riskini gösterir; tedavide sodyum bikarbonat kardiyak membran etkisini azaltır. Antikolinerjik bulgular tanıya destek olur.",
    "tusPearl": "TCA zehirlenmesi + QRS genişliği = sodyum bikarbonat düşün.",
    "differentialPoint": "SSRI aşırı alımı daha çok serotonin sendromu riskini artırır; TCA belirgin kardiyotoksisite/QRS genişliği yapar.",
    "clinicalRelevance": "TCA zehirlenmesi + QRS genişliği = sodyum bikarbonat düşün.",
    "mechanism": "",
    "relatedBranches": [
      "emergency-medicine"
    ],
    "relatedTerms": [
      "QRS genişlemesi",
      "Sodyum bikarbonat",
      "Antikolinerjik bulgular",
      "Ventriküler aritmi"
    ],
    "safeNestedTerms": [
      "QRS genişlemesi",
      "Sodyum bikarbonat",
      "Antikolinerjik bulgular",
      "Ventriküler aritmi"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "Antikolinerjik bulgular",
      "Ventriküler aritmi",
      "Sodyum bikarbonat",
      "QRS genişlemesi",
      "TCA toksisitesi"
    ],
    "sourceTextExamples": [
      "r EKG ipucudur.\",  \"tusPearl\": \"TCA zehirlenmesinde QRS genişlemesi varsa intravenöz sodyum bikarbonat düşünülür.\",  \"differentialPoint\": \"Hiperkalemide membran toksisitesi; TCA toksisitesinde hızlı sodyum kanal blokajı ön plandadır.\",  \"clinicalRelevance\": \"Toksikoloji, elektrolit bozukluğu ve aritmi sorularında acil tedavi seçimini belirler.\",  \"mechanism\": \"Miyokard veya iletim sistemindeki depolarizasyon...",
      "src/data/tusGlossaryIndex.js dosyasında 'TCA toksisitesi' relatedTerms/safeNestedTerms/candidate-audit bağlamında geçiyor; aktif exact glossary entry olmadan öğretici ilişkili kavram olarak kaldığı saptandı."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 3,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "partialMatch",
      "sourceFilePath": "src/data/tusGlossaryIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 24
    }
  },
  {
    "id": "v320-quality-batch3-opioid-toksisitesi",
    "term": "Opioid toksisitesi",
    "aliases": [
      "Opioid toksisitesi"
    ],
    "normalizedTerm": "opioid toksisitesi",
    "TurkishName": "Opioid toksisitesi",
    "EnglishName": "",
    "category": "Toksikoloji / solunum depresyonu",
    "subcategory": "Miyozis ve hipoventilasyon",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Opioid aşırı etkisine bağlı bilinç depresyonu, solunum depresyonu ve miyozis ile seyreden zehirlenme tablosudur.",
    "preAnswerSafeDefinition": "Opioid toksisitesi, acil klinik değerlendirmede mekanizma, risk veya yönetim basamağıyla ilişkili kavramdır.",
    "shortDefinition": "Opioid aşırı etkisine bağlı bilinç depresyonu, solunum depresyonu ve miyozis ile seyreden zehirlenme tablosudur.",
    "definition": "Opioid aşırı etkisine bağlı bilinç depresyonu, solunum depresyonu ve miyozis ile seyreden zehirlenme tablosudur.",
    "detailedExplanation": "Opioid toksisitesinde ölüm nedeni çoğunlukla solunum depresyonudur. Nalokson antagonist tedavidir ancak kısa etkili olduğu için yeniden sedasyon açısından izlem gerekir.",
    "postAnswerExplanation": "Opioid toksisitesinde ölüm nedeni çoğunlukla solunum depresyonudur. Nalokson antagonist tedavidir ancak kısa etkili olduğu için yeniden sedasyon açısından izlem gerekir.",
    "postAnswerExpandedExplanation": "Opioid toksisitesinde ölüm nedeni çoğunlukla solunum depresyonudur. Nalokson antagonist tedavidir ancak kısa etkili olduğu için yeniden sedasyon açısından izlem gerekir.",
    "tusPearl": "Koma + miyozis + solunum depresyonu = opioid toksisitesi; nalokson düşün.",
    "differentialPoint": "Benzodiazepin zehirlenmesinde solunum depresyonu daha hafif olabilir; belirgin miyozis opioid lehinedir.",
    "clinicalRelevance": "Koma + miyozis + solunum depresyonu = opioid toksisitesi; nalokson düşün.",
    "mechanism": "",
    "relatedBranches": [
      "emergency-medicine",
      "pulmonology"
    ],
    "relatedTerms": [
      "Nalokson",
      "Solunum depresyonu",
      "Miyozis",
      "Bilinç depresyonu"
    ],
    "safeNestedTerms": [
      "Nalokson",
      "Solunum depresyonu",
      "Miyozis",
      "Bilinç depresyonu"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Opioid toksisitesi",
      "Solunum depresyonu",
      "Bilinç depresyonu",
      "Nalokson",
      "Miyozis"
    ],
    "sourceTextExamples": [
      "removed-static-seed-source içinde 'Opioid toksisitesi' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "removed-safe-bank-source içinde 'Opioid toksisitesi' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 9,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "removed-static-seed-source, removed-safe-bank-source",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 24
    }
  },
  {
    "id": "v320-quality-batch3-toksik-alkol",
    "term": "Toksik alkol",
    "aliases": [
      "Toksik alkol"
    ],
    "normalizedTerm": "toksik alkol",
    "TurkishName": "Toksik alkol",
    "EnglishName": "",
    "category": "Toksikoloji / metabolik asidoz",
    "subcategory": "Metanol-etilen glikol grubu",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Metanol veya etilen glikol gibi metabolitleriyle yüksek anyon gap metabolik asidoz ve organ toksisitesi yapabilen alkol grubudur.",
    "preAnswerSafeDefinition": "Metanol veya etilen glikol gibi metabolitleriyle yüksek anyon gap metabolik asidoz ve organ toksisitesi yapabilen alkol grubudur.",
    "shortDefinition": "Metanol veya etilen glikol gibi metabolitleriyle yüksek anyon gap metabolik asidoz ve organ toksisitesi yapabilen alkol grubudur.",
    "definition": "Metanol veya etilen glikol gibi metabolitleriyle yüksek anyon gap metabolik asidoz ve organ toksisitesi yapabilen alkol grubudur.",
    "detailedExplanation": "Toksik alkollerde osmolar gap erken, anyon gap metabolik asidoz geç dönemde belirginleşebilir. Metanol görme toksisitesi, etilen glikol kalsiyum oksalat kristalleriyle ilişkilidir.",
    "postAnswerExplanation": "Toksik alkollerde osmolar gap erken, anyon gap metabolik asidoz geç dönemde belirginleşebilir. Metanol görme toksisitesi, etilen glikol kalsiyum oksalat kristalleriyle ilişkilidir.",
    "postAnswerExpandedExplanation": "Toksik alkollerde osmolar gap erken, anyon gap metabolik asidoz geç dönemde belirginleşebilir. Metanol görme toksisitesi, etilen glikol kalsiyum oksalat kristalleriyle ilişkilidir.",
    "tusPearl": "Yüksek anion gap + osmolar gap + görme bulgusu/kristalüri = toksik alkol düşün.",
    "differentialPoint": "Etanol intoksikasyonu sedasyon yapar; toksik alkoller metabolik asidoz ve organ hasarıyla ayrılır.",
    "clinicalRelevance": "Yüksek anion gap + osmolar gap + görme bulgusu/kristalüri = toksik alkol düşün.",
    "mechanism": "",
    "relatedBranches": [
      "emergency-medicine"
    ],
    "relatedTerms": [
      "Metanol",
      "Etilen glikol",
      "Osmolar gap",
      "Anion gap metabolik asidoz"
    ],
    "safeNestedTerms": [
      "Metanol",
      "Etilen glikol",
      "Osmolar gap",
      "Anion gap metabolik asidoz"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Anion gap metabolik asidoz",
      "Etilen glikol",
      "Toksik alkol",
      "Osmolar gap",
      "Metanol"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Toksik alkol' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "ledExplanation\": \"Yüksek anyon gap metabolik asidozda laktat, keton, üremik toksin veya toksik alım gibi ölçülmeyen anyonlar artar.\",  \"tusPearl\": \"DKA, laktik asidoz, üremi ve toksik alkoller yüksek anyon gap metabolik asidoz nedenleridir.\",  \"differentialPoint\": \"Normal anyon gap asidoz daha çok bikarbonat kaybı veya renal tübüler asidoz ile ilişkilidir.\",  \"clinicalRelevance\": \"Metabolik asidozun nedenini hızlı..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 4,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js, src/data/tusGlossaryNestedClinicalIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-akut-faz-reaktani",
    "term": "Akut faz reaktanı",
    "aliases": [
      "Akut faz reaktanı"
    ],
    "normalizedTerm": "akut faz reaktani",
    "TurkishName": "Akut faz reaktanı",
    "EnglishName": "",
    "category": "İmmünoloji / inflamasyon laboratuvarı",
    "subcategory": "İnflamasyon belirteci",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "İnflamasyon sırasında özellikle IL-6 etkisiyle karaciğerde sentezi artan veya azalan plazma proteinleridir.",
    "preAnswerSafeDefinition": "İnflamasyon sırasında özellikle IL-6 etkisiyle karaciğerde sentezi artan veya azalan plazma proteinleridir.",
    "shortDefinition": "İnflamasyon sırasında özellikle IL-6 etkisiyle karaciğerde sentezi artan veya azalan plazma proteinleridir.",
    "definition": "İnflamasyon sırasında özellikle IL-6 etkisiyle karaciğerde sentezi artan veya azalan plazma proteinleridir.",
    "detailedExplanation": "CRP, fibrinojen, ferritin gibi pozitif akut faz reaktanları inflamasyonda artar; albumin negatif akut faz reaktanıdır. Spesifik tanı koydurmaz ama inflamasyon aktivitesini destekler.",
    "postAnswerExplanation": "CRP, fibrinojen, ferritin gibi pozitif akut faz reaktanları inflamasyonda artar; albumin negatif akut faz reaktanıdır. Spesifik tanı koydurmaz ama inflamasyon aktivitesini destekler.",
    "postAnswerExpandedExplanation": "CRP, fibrinojen, ferritin gibi pozitif akut faz reaktanları inflamasyonda artar; albumin negatif akut faz reaktanıdır. Spesifik tanı koydurmaz ama inflamasyon aktivitesini destekler.",
    "tusPearl": "CRP hızlı değişen akut faz reaktanıdır; ESR daha yavaş ve birçok faktörden etkilenir.",
    "differentialPoint": "Akut faz reaktanı inflamasyon varlığını destekler; etken veya kesin tanı göstermez.",
    "clinicalRelevance": "CRP hızlı değişen akut faz reaktanıdır; ESR daha yavaş ve birçok faktörden etkilenir.",
    "mechanism": "",
    "relatedBranches": [],
    "relatedTerms": [
      "CRP",
      "ESR",
      "IL-6",
      "Ferritin"
    ],
    "safeNestedTerms": [
      "CRP",
      "ESR",
      "IL-6",
      "Ferritin"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Akut faz reaktanı",
      "Ferritin",
      "IL-6",
      "CRP",
      "ESR"
    ],
    "sourceTextExamples": [
      "term\": \"CRP\",  \"aliases\": [  \"C-reaktif protein\",  \"C reactive protein\"  ],  \"category\": \"Laboratuvar\",  \"previewDefinition\": \"İnflamasyonla yükselen akut faz reaktanıdır.\",  \"preAnswerSafeDefinition\": \"İnflamasyonla yükselen akut faz reaktanıdır.\",  \"shortDefinition\": \"İnflamasyonla yükselen akut faz reaktanıdır.\",  \"detailedExplanation\": \"İnflamasyonla yükselen akut faz reaktanıdır. Klinik bağlamla birlikte yorum",
      "tive protein\"  ],  \"category\": \"Laboratuvar\",  \"previewDefinition\": \"İnflamasyonla yükselen akut faz reaktanıdır.\",  \"preAnswerSafeDefinition\": \"İnflamasyonla yükselen akut faz reaktanıdır.\",  \"shortDefinition\": \"İnflamasyonla yükselen akut faz reaktanıdır.\",  \"detailedExplanation\": \"İnflamasyonla yükselen akut faz reaktanıdır. Klinik bağlamla birlikte yorumlanmalıdır.\",  \"postAnswerExpandedExplanation\":..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 3,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusGlossarySupplementalIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 18
    }
  },
  {
    "id": "v320-quality-batch3-p-degeri",
    "term": "p değeri",
    "aliases": [
      "p değeri",
      "p-değeri",
      "p value"
    ],
    "normalizedTerm": "p degeri",
    "TurkishName": "p değeri",
    "EnglishName": "",
    "category": "Biyoistatistik / epidemiyoloji",
    "subcategory": "İstatistiksel anlamlılık ölçüsü",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Null hipotez doğru kabul edildiğinde gözlenen veya daha uç bir sonucun elde edilme olasılığıdır.",
    "preAnswerSafeDefinition": "Null hipotez doğru kabul edildiğinde gözlenen veya daha uç bir sonucun elde edilme olasılığıdır.",
    "shortDefinition": "Null hipotez doğru kabul edildiğinde gözlenen veya daha uç bir sonucun elde edilme olasılığıdır.",
    "definition": "Null hipotez doğru kabul edildiğinde gözlenen veya daha uç bir sonucun elde edilme olasılığıdır.",
    "detailedExplanation": "p değeri etkinin büyüklüğünü veya klinik önemini göstermez; yalnızca istatistiksel uyumsuzluk derecesini ifade eder. Örneklem büyüklüğü p değerini güçlü biçimde etkiler.",
    "postAnswerExplanation": "p değeri etkinin büyüklüğünü veya klinik önemini göstermez; yalnızca istatistiksel uyumsuzluk derecesini ifade eder. Örneklem büyüklüğü p değerini güçlü biçimde etkiler.",
    "postAnswerExpandedExplanation": "p değeri etkinin büyüklüğünü veya klinik önemini göstermez; yalnızca istatistiksel uyumsuzluk derecesini ifade eder. Örneklem büyüklüğü p değerini güçlü biçimde etkiler.",
    "tusPearl": "p<0,05 klinik olarak önemli demek değildir; klinik önem için etki büyüklüğü ve güven aralığına bakılır.",
    "differentialPoint": "p değeri anlamlılığı; güven aralığı belirsizliği; etki ölçütü klinik büyüklüğü anlatır.",
    "clinicalRelevance": "p<0,05 klinik olarak önemli demek değildir; klinik önem için etki büyüklüğü ve güven aralığına bakılır.",
    "mechanism": "",
    "relatedBranches": [
      "public-health"
    ],
    "relatedTerms": [
      "Güven aralığı",
      "Null hipotez",
      "Test gücü",
      "Etki büyüklüğü"
    ],
    "safeNestedTerms": [
      "Güven aralığı",
      "Null hipotez",
      "Test gücü",
      "Etki büyüklüğü"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Etki büyüklüğü",
      "Güven aralığı",
      "Null hipotez",
      "Test gücü",
      "p değeri",
      "p-değeri",
      "p value"
    ],
    "sourceTextExamples": [
      "dExplanation\": \"Gerçekte doğru olan sıfır hipotezinin reddedilmesi hatasıdır.\",  \"postAnswerExpandedExplanation\": \"Gerçekte doğru olan sıfır hipotezinin reddedilmesi hatasıdır. p değeri eşiği Tip I hata olasılığıyla ilişkilidir.\",  \"tusPearl\": \"p değeri eşiği Tip I hata olasılığıyla ilişkilidir.\",  \"differentialPoint\": \"Tip II hata yanlış negatifliktir; Tip I hata yanlış pozitifliktir.\",  \"clinicalRelevance\": \"p...",
      "sıdır.\",  \"postAnswerExpandedExplanation\": \"Gerçekte doğru olan sıfır hipotezinin reddedilmesi hatasıdır. p değeri eşiği Tip I hata olasılığıyla ilişkilidir.\",  \"tusPearl\": \"p değeri eşiği Tip I hata olasılığıyla ilişkilidir.\",  \"differentialPoint\": \"Tip II hata yanlış negatifliktir; Tip I hata yanlış pozitifliktir.\",  \"clinicalRelevance\": \"p değeri eşiği Tip I hata olasılığıyla ilişkilidir.\",  \"mechanism\": \"\", ..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/tusGlossaryClinicalBranchDeepIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-test-gucu",
    "term": "Test gücü",
    "aliases": [
      "istatistiksel güç",
      "Test gücü",
      "power"
    ],
    "normalizedTerm": "test gucu",
    "TurkishName": "Test gücü",
    "EnglishName": "",
    "category": "Biyoistatistik / epidemiyoloji",
    "subcategory": "Power",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Gerçek bir fark veya etki varsa çalışmanın bunu istatistiksel olarak saptayabilme olasılığıdır.",
    "preAnswerSafeDefinition": "Gerçek bir fark veya etki varsa çalışmanın bunu istatistiksel olarak saptayabilme olasılığıdır.",
    "shortDefinition": "Gerçek bir fark veya etki varsa çalışmanın bunu istatistiksel olarak saptayabilme olasılığıdır.",
    "definition": "Gerçek bir fark veya etki varsa çalışmanın bunu istatistiksel olarak saptayabilme olasılığıdır.",
    "detailedExplanation": "Test gücü 1-beta olarak ifade edilir; örneklem büyüklüğü, etki büyüklüğü ve alfa düzeyiyle ilişkilidir. Düşük güç yalancı negatif sonuç riskini artırır.",
    "postAnswerExplanation": "Test gücü 1-beta olarak ifade edilir; örneklem büyüklüğü, etki büyüklüğü ve alfa düzeyiyle ilişkilidir. Düşük güç yalancı negatif sonuç riskini artırır.",
    "postAnswerExpandedExplanation": "Test gücü 1-beta olarak ifade edilir; örneklem büyüklüğü, etki büyüklüğü ve alfa düzeyiyle ilişkilidir. Düşük güç yalancı negatif sonuç riskini artırır.",
    "tusPearl": "Düşük test gücü = Tip II hata riski artar.",
    "differentialPoint": "Alfa Tip I hata olasılığıdır; beta Tip II hata; güç ise 1-beta’dır.",
    "clinicalRelevance": "Düşük test gücü = Tip II hata riski artar.",
    "mechanism": "",
    "relatedBranches": [
      "public-health"
    ],
    "relatedTerms": [
      "Tip II hata",
      "Örneklem büyüklüğü",
      "p değeri",
      "Güven aralığı"
    ],
    "safeNestedTerms": [
      "Tip II hata",
      "Örneklem büyüklüğü",
      "p değeri",
      "Güven aralığı"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Örneklem büyüklüğü",
      "istatistiksel güç",
      "Güven aralığı",
      "Tip II hata",
      "Test gücü",
      "p değeri",
      "power"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Test gücü' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "src/data/tusGlossaryContentCoverageIndex.js dosyasında 'Test gücü' relatedTerms/safeNestedTerms/candidate-audit bağlamında geçiyor; aktif exact glossary entry olmadan öğretici ilişkili kavram olarak kaldığı saptandı."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "partialMatch",
      "sourceFilePath": "src/data/cases.js, src/data/tusGlossaryContentCoverageIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-kohort-calismasi",
    "term": "Kohort çalışması",
    "aliases": [
      "Kohort çalışması"
    ],
    "normalizedTerm": "kohort calismasi",
    "TurkishName": "Kohort çalışması",
    "EnglishName": "",
    "category": "Epidemiyoloji / çalışma tasarımı",
    "subcategory": "Maruziyet-temelli izlem",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Maruziyet durumuna göre grupların izlenerek hastalık/sonuç gelişiminin karşılaştırıldığı gözlemsel çalışma tasarımıdır.",
    "preAnswerSafeDefinition": "Maruziyet durumuna göre grupların izlenerek hastalık/sonuç gelişiminin karşılaştırıldığı gözlemsel çalışma tasarımıdır.",
    "shortDefinition": "Maruziyet durumuna göre grupların izlenerek hastalık/sonuç gelişiminin karşılaştırıldığı gözlemsel çalışma tasarımıdır.",
    "definition": "Maruziyet durumuna göre grupların izlenerek hastalık/sonuç gelişiminin karşılaştırıldığı gözlemsel çalışma tasarımıdır.",
    "detailedExplanation": "Kohort çalışması insidans ve relatif risk hesaplamaya uygundur. Nadir maruziyetler için güçlüdür; nadir hastalıklarda vaka-kontrol daha verimli olabilir.",
    "postAnswerExplanation": "Kohort çalışması insidans ve relatif risk hesaplamaya uygundur. Nadir maruziyetler için güçlüdür; nadir hastalıklarda vaka-kontrol daha verimli olabilir.",
    "postAnswerExpandedExplanation": "Kohort çalışması insidans ve relatif risk hesaplamaya uygundur. Nadir maruziyetler için güçlüdür; nadir hastalıklarda vaka-kontrol daha verimli olabilir.",
    "tusPearl": "Maruziyetten sonuca izlem = kohort; sonuçtan geçmiş maruziyete bakma = vaka-kontrol.",
    "differentialPoint": "Kesitsel çalışma aynı anda ölçüm yapar; kohort zamansal izlem içerir.",
    "clinicalRelevance": "Maruziyetten sonuca izlem = kohort; sonuçtan geçmiş maruziyete bakma = vaka-kontrol.",
    "mechanism": "",
    "relatedBranches": [
      "public-health"
    ],
    "relatedTerms": [
      "Relatif risk",
      "İnsidans",
      "Maruziyet",
      "Vaka-kontrol çalışması"
    ],
    "safeNestedTerms": [
      "Relatif risk",
      "İnsidans",
      "Maruziyet",
      "Vaka-kontrol çalışması"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Vaka-kontrol çalışması",
      "Kohort çalışması",
      "Relatif risk",
      "Maruziyet",
      "İnsidans"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Kohort çalışması' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "src/data/tusGlossaryContentCoverageIndex.js dosyasında 'Kohort çalışması' relatedTerms/safeNestedTerms/candidate-audit bağlamında geçiyor; aktif exact glossary entry olmadan öğretici ilişkili kavram olarak kaldığı saptandı."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "partialMatch",
      "sourceFilePath": "src/data/cases.js, src/data/tusGlossaryContentCoverageIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-dusuk-nnt",
    "term": "Düşük NNT",
    "aliases": [
      "Düşük NNT"
    ],
    "normalizedTerm": "dusuk nnt",
    "TurkishName": "Düşük NNT",
    "EnglishName": "",
    "category": "Epidemiyoloji / klinik etki",
    "subcategory": "Tedavi faydasının büyüklüğü",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Bir ek yararlı sonuç elde etmek için tedavi edilmesi gereken hasta sayısının düşük olmasıdır; pratik tedavi etkisinin güçlü olduğunu gösterir.",
    "preAnswerSafeDefinition": "Bir ek yararlı sonuç elde etmek için tedavi edilmesi gereken hasta sayısının düşük olmasıdır; pratik tedavi etkisinin güçlü olduğunu gösterir.",
    "shortDefinition": "Bir ek yararlı sonuç elde etmek için tedavi edilmesi gereken hasta sayısının düşük olmasıdır; pratik tedavi etkisinin güçlü olduğunu gösterir.",
    "definition": "Bir ek yararlı sonuç elde etmek için tedavi edilmesi gereken hasta sayısının düşük olmasıdır; pratik tedavi etkisinin güçlü olduğunu gösterir.",
    "detailedExplanation": "NNT mutlak risk azalmasının tersidir. NNT ne kadar düşükse tedavinin klinik faydası o kadar büyüktür; fakat zarar, maliyet ve hasta profiliyle birlikte yorumlanmalıdır.",
    "postAnswerExplanation": "NNT mutlak risk azalmasının tersidir. NNT ne kadar düşükse tedavinin klinik faydası o kadar büyüktür; fakat zarar, maliyet ve hasta profiliyle birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "NNT mutlak risk azalmasının tersidir. NNT ne kadar düşükse tedavinin klinik faydası o kadar büyüktür; fakat zarar, maliyet ve hasta profiliyle birlikte yorumlanmalıdır.",
    "tusPearl": "NNT = 1 / mutlak risk azalması; düşük NNT daha güçlü klinik fayda demektir.",
    "differentialPoint": "Relatif risk azalması büyük görünebilir; NNT mutlak faydayı daha somut gösterir.",
    "clinicalRelevance": "NNT = 1 / mutlak risk azalması; düşük NNT daha güçlü klinik fayda demektir.",
    "mechanism": "",
    "relatedBranches": [
      "public-health"
    ],
    "relatedTerms": [
      "Mutlak risk azalması",
      "Relatif risk azalması",
      "Tedavi etkisi",
      "Klinik anlamlılık"
    ],
    "safeNestedTerms": [
      "Mutlak risk azalması",
      "Relatif risk azalması",
      "Tedavi etkisi",
      "Klinik anlamlılık"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "Relatif risk azalması",
      "Mutlak risk azalması",
      "Klinik anlamlılık",
      "Tedavi etkisi",
      "Düşük NNT"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Düşük NNT' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "postAnswerExpandedExplanation\": \"Bir ek olumlu sonuç elde etmek veya bir kötü sonucu önlemek için tedavi edilmesi gereken hasta sayısıdır. NNT = 1 / mutlak risk azalmasıdır; düşük NNT daha güçlü pratik etki gösterir.\",  \"tusPearl\": \"NNT = 1 / mutlak risk azalmasıdır; düşük NNT daha güçlü pratik etki gösterir.\",  \"differentialPoint\": \"Rölatif risk etki oranını; NNT klinik hasta sayısı karşılığını verir.\", ..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js, src/data/tusGlossaryClinicalBranchDeepIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-orotik-asiduri",
    "term": "Orotik asidüri",
    "aliases": [
      "Orotik asidüri"
    ],
    "normalizedTerm": "orotik asiduri",
    "TurkishName": "Orotik asidüri",
    "EnglishName": "",
    "category": "Biyokimya / üre döngüsü-pirimidin",
    "subcategory": "İdrarda orotik asit artışı",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "İdrarda orotik asit atılımının artmasıdır; OTC eksikliği ve bazı pirimidin sentez bozukluklarında ayırıcı ipucudur.",
    "preAnswerSafeDefinition": "İdrarda orotik asit atılımının artmasıdır; OTC eksikliği ve bazı pirimidin sentez bozukluklarında ayırıcı ipucudur.",
    "shortDefinition": "İdrarda orotik asit atılımının artmasıdır; OTC eksikliği ve bazı pirimidin sentez bozukluklarında ayırıcı ipucudur.",
    "definition": "İdrarda orotik asit atılımının artmasıdır; OTC eksikliği ve bazı pirimidin sentez bozukluklarında ayırıcı ipucudur.",
    "detailedExplanation": "OTC eksikliğinde mitokondride biriken karbamoil fosfat sitozolde pirimidin sentezine kayar ve orotik asidüri gelişir. CPS1/NAGS eksikliğinde hiperamonyemi olur ama orotik asit artışı beklenmez.",
    "postAnswerExplanation": "OTC eksikliğinde mitokondride biriken karbamoil fosfat sitozolde pirimidin sentezine kayar ve orotik asidüri gelişir. CPS1/NAGS eksikliğinde hiperamonyemi olur ama orotik asit artışı beklenmez.",
    "postAnswerExpandedExplanation": "OTC eksikliğinde mitokondride biriken karbamoil fosfat sitozolde pirimidin sentezine kayar ve orotik asidüri gelişir. CPS1/NAGS eksikliğinde hiperamonyemi olur ama orotik asit artışı beklenmez.",
    "tusPearl": "Hiperamonyemi + yüksek orotik asit = OTC eksikliği; hiperamonyemi + normal/düşük orotik asit = CPS1/NAGS.",
    "differentialPoint": "OTC üre döngüsü defektidir; orotik asidüri pirimidin yoluna taşan karbamoil fosfatın izidir.",
    "clinicalRelevance": "Hiperamonyemi + yüksek orotik asit = OTC eksikliği; hiperamonyemi + normal/düşük orotik asit = CPS1/NAGS.",
    "mechanism": "",
    "relatedBranches": [
      "medical-biochemistry"
    ],
    "relatedTerms": [
      "OTC eksikliği",
      "Hiperamonyemi",
      "Üre döngüsü",
      "Karbamoil fosfat"
    ],
    "safeNestedTerms": [
      "OTC eksikliği",
      "Hiperamonyemi",
      "Üre döngüsü",
      "Karbamoil fosfat"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Karbamoil fosfat",
      "Orotik asidüri",
      "Hiperamonyemi",
      "OTC eksikliği",
      "Üre döngüsü"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Orotik asidüri' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "lik pirimidin sentezine kaçar ve orotik asit artışına neden olur. CPS1 eksikliğinde ise karbamoil fosfat sentezinin ilk basamağı bozuk olduğu için bu substrat birikimi ve belirgin orotik asidüri beklenmez. OTC eksikliğinde mitokondride biriken karbamoil fosfat pirimidin sentezine yönelir ve orotik asit artar. CPS1 eksikliğinde karbamoil fosfat oluşumu azaldığı için orotik asit artışı beklenmez. TUS açısından ayırıcı..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 3,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-hiperamonyemi-plus-yuksek-idrar-orotik-asit",
    "term": "Hiperamonyemi + yüksek idrar orotik asit",
    "aliases": [
      "Hiperamonyemi + yüksek idrar orotik asit"
    ],
    "normalizedTerm": "hiperamonyemi + yuksek idrar orotik asit",
    "TurkishName": "Hiperamonyemi + yüksek idrar orotik asit",
    "EnglishName": "",
    "category": "Biyokimya / üre döngüsü",
    "subcategory": "OTC eksikliği paterni",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Amonyak yüksekliğiyle birlikte idrar orotik asidinin artması; özellikle ornitin transkarbamilaz eksikliğini düşündüren biyokimyasal paternidir.",
    "preAnswerSafeDefinition": "Hiperamonyemi + yüksek idrar orotik asit, tek başına değil; klinik bağlam, eşlik eden veriler ve karar sorusuyla birlikte yorumlanan ölçüm/kavramdır.",
    "shortDefinition": "Amonyak yüksekliğiyle birlikte idrar orotik asidinin artması; özellikle ornitin transkarbamilaz eksikliğini düşündüren biyokimyasal paternidir.",
    "definition": "Amonyak yüksekliğiyle birlikte idrar orotik asidinin artması; özellikle ornitin transkarbamilaz eksikliğini düşündüren biyokimyasal paternidir.",
    "detailedExplanation": "OTC eksikliğinde karbamoil fosfat üre döngüsünde ilerleyemez ve pirimidin sentezine kayarak orotik asidi artırır. Bu patern CPS1 eksikliğinden ayrımda çok öğreticidir.",
    "postAnswerExplanation": "OTC eksikliğinde karbamoil fosfat üre döngüsünde ilerleyemez ve pirimidin sentezine kayarak orotik asidi artırır. Bu patern CPS1 eksikliğinden ayrımda çok öğreticidir.",
    "postAnswerExpandedExplanation": "OTC eksikliğinde karbamoil fosfat üre döngüsünde ilerleyemez ve pirimidin sentezine kayarak orotik asidi artırır. Bu patern CPS1 eksikliğinden ayrımda çok öğreticidir.",
    "tusPearl": "Erkek yenidoğan + hiperamonyemi + yüksek idrar orotik asit = OTC eksikliği.",
    "differentialPoint": "CPS1/NAGS eksikliğinde hiperamonyemi vardır ama orotik asit artışı beklenmez; OTC’de artar.",
    "clinicalRelevance": "Erkek yenidoğan + hiperamonyemi + yüksek idrar orotik asit = OTC eksikliği.",
    "mechanism": "",
    "relatedBranches": [
      "medical-biochemistry"
    ],
    "relatedTerms": [
      "OTC eksikliği",
      "Orotik asidüri",
      "Üre döngüsü",
      "CPS1 eksikliği"
    ],
    "safeNestedTerms": [
      "OTC eksikliği",
      "Orotik asidüri",
      "Üre döngüsü",
      "CPS1 eksikliği"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Hiperamonyemi + yüksek idrar orotik asit",
      "CPS1 eksikliği",
      "Orotik asidüri",
      "OTC eksikliği",
      "Üre döngüsü"
    ],
    "sourceTextExamples": [
      "removed-static-seed-source içinde 'Hiperamonyemi + yüksek idrar orotik asit' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "removed-safe-bank-source içinde 'Hiperamonyemi + yüksek idrar orotik asit' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 15,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "removed-static-seed-source, removed-safe-bank-source",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 24
    }
  },
  {
    "id": "v320-quality-batch3-cystathionine-beta-synthase-eksikligi",
    "term": "Cystathionine beta-synthase eksikliği",
    "aliases": [
      "Cystathionine beta-synthase eksikliği",
      "sistationin beta-sentaz eksikliği",
      "CBS eksikliği"
    ],
    "normalizedTerm": "cystathionine beta-synthase eksikligi",
    "TurkishName": "Cystathionine beta-synthase eksikliği",
    "EnglishName": "",
    "category": "Biyokimya / aminoasit metabolizması",
    "subcategory": "Homosistinüri nedeni",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Homosisteini sistationine dönüştüren B6 bağımlı enzimin eksikliğiyle klasik homosistinüri oluşturan defekttir.",
    "preAnswerSafeDefinition": "Homosisteini sistationine dönüştüren B6 bağımlı enzimin eksikliğiyle klasik homosistinüri oluşturan defekttir.",
    "shortDefinition": "Homosisteini sistationine dönüştüren B6 bağımlı enzimin eksikliğiyle klasik homosistinüri oluşturan defekttir.",
    "definition": "Homosisteini sistationine dönüştüren B6 bağımlı enzimin eksikliğiyle klasik homosistinüri oluşturan defekttir.",
    "detailedExplanation": "CBS eksikliğinde homosistein ve metiyonin artar; lens subluksasyonu, tromboz eğilimi, marfanoid habitus ve gelişimsel sorunlar görülebilir. B6 yanıtlı formlar olabilir.",
    "postAnswerExplanation": "CBS eksikliğinde homosistein ve metiyonin artar; lens subluksasyonu, tromboz eğilimi, marfanoid habitus ve gelişimsel sorunlar görülebilir. B6 yanıtlı formlar olabilir.",
    "postAnswerExpandedExplanation": "CBS eksikliğinde homosistein ve metiyonin artar; lens subluksasyonu, tromboz eğilimi, marfanoid habitus ve gelişimsel sorunlar görülebilir. B6 yanıtlı formlar olabilir.",
    "tusPearl": "Lens subluksasyonu + tromboz + yüksek homosistein/metiyonin = CBS eksikliği.",
    "differentialPoint": "Marfan’da tromboz ve yüksek homosistein beklenmez; homosistinüride tromboemboli belirgindir.",
    "clinicalRelevance": "Lens subluksasyonu + tromboz + yüksek homosistein/metiyonin = CBS eksikliği.",
    "mechanism": "",
    "relatedBranches": [
      "medical-biochemistry"
    ],
    "relatedTerms": [
      "Homosistein yüksekliği",
      "Lens subluksasyonu",
      "Tromboz",
      "Metiyonin yüksekliği"
    ],
    "safeNestedTerms": [
      "Homosistein yüksekliği",
      "Lens subluksasyonu",
      "Tromboz",
      "Metiyonin yüksekliği"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "Cystathionine beta-synthase eksikliği",
      "sistationin beta-sentaz eksikliği",
      "Homosistein yüksekliği",
      "Metiyonin yüksekliği",
      "Lens subluksasyonu",
      "CBS eksikliği",
      "Tromboz"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'Cystathionine beta-synthase eksikliği' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "id\": \"clinical-branch-deep-sistationin-beta-sentaz\",  \"term\": \"Sistationin beta-sentaz\",  \"aliases\": [  \"Sistationin beta-sentaz\",  \"CBS\",  \"cystathionine beta-synthase\"  ],  \"TurkishName\": \"Sistationin beta-sentaz\",  \"EnglishName\": \"\",  \"LatinName\": \"\",  \"abbreviation\": \"\",  \"category\": \"Metabolizma\",  \"shortDefinition\": \"Homosisteini sistationine dönüştüren B6 bağımlı enzimdir.\",  \"previewDefinition"
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 9,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js, src/data/tusGlossaryClinicalBranchDeepIndex.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-homosistein-yuksekligi-plus-lens-subluksasyonu",
    "term": "Homosistein yüksekliği + lens subluksasyonu",
    "aliases": [
      "Homosistein yüksekliği + lens subluksasyonu"
    ],
    "normalizedTerm": "homosistein yuksekligi + lens subluksasyonu",
    "TurkishName": "Homosistein yüksekliği + lens subluksasyonu",
    "EnglishName": "",
    "category": "Biyokimya / klinik patern",
    "subcategory": "Homosistinüri ipucu",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Homosistinüriyi düşündüren, vasküler tromboz riskiyle birlikte yorumlanan metabolik klinik paternidir.",
    "preAnswerSafeDefinition": "Homosistinüriyi düşündüren, vasküler tromboz riskiyle birlikte yorumlanan metabolik klinik paternidir.",
    "shortDefinition": "Homosistinüriyi düşündüren, vasküler tromboz riskiyle birlikte yorumlanan metabolik klinik paternidir.",
    "definition": "Homosistinüriyi düşündüren, vasküler tromboz riskiyle birlikte yorumlanan metabolik klinik paternidir.",
    "detailedExplanation": "Homosistein yüksekliği endotel hasarı ve tromboz eğilimi oluşturur; lens subluksasyonu ve marfanoid vücut yapısıyla birlikte CBS eksikliğini düşündürür.",
    "postAnswerExplanation": "Homosistein yüksekliği endotel hasarı ve tromboz eğilimi oluşturur; lens subluksasyonu ve marfanoid vücut yapısıyla birlikte CBS eksikliğini düşündürür.",
    "postAnswerExpandedExplanation": "Homosistein yüksekliği endotel hasarı ve tromboz eğilimi oluşturur; lens subluksasyonu ve marfanoid vücut yapısıyla birlikte CBS eksikliğini düşündürür.",
    "tusPearl": "Marfanoid görünüm + lens subluksasyonu + tromboz = homosistinüri lehine.",
    "differentialPoint": "Marfan’da lens genellikle yukarı-dışa; homosistinüride aşağı-içe subluksasyon klasik olarak öğretilir.",
    "clinicalRelevance": "Marfanoid görünüm + lens subluksasyonu + tromboz = homosistinüri lehine.",
    "mechanism": "",
    "relatedBranches": [
      "medical-biochemistry"
    ],
    "relatedTerms": [
      "Cystathionine beta-synthase eksikliği",
      "Homosistinüri",
      "Tromboz",
      "Lens subluksasyonu"
    ],
    "safeNestedTerms": [
      "Cystathionine beta-synthase eksikliği",
      "Homosistinüri",
      "Tromboz",
      "Lens subluksasyonu"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Homosistein yüksekliği + lens subluksasyonu",
      "Cystathionine beta-synthase eksikliği",
      "Lens subluksasyonu",
      "Homosistinüri",
      "Tromboz"
    ],
    "sourceTextExamples": [
      "V317 içinde aktif glossary ilişkili kavram havuzu ve eğitim metinleri bağlamında aday olarak işaretlendi; kısa örnek otomatik ayrıştırılamadı."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addAsSafeNestedTerm",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/*",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-17-hidroksiprogesteron-yuksekligi",
    "term": "17-hidroksiprogesteron yüksekliği",
    "aliases": [
      "17-hidroksiprogesteron yüksekliği"
    ],
    "normalizedTerm": "17-hidroksiprogesteron yuksekligi",
    "TurkishName": "17-hidroksiprogesteron yüksekliği",
    "EnglishName": "",
    "category": "Endokrinoloji / adrenal steroidogenez",
    "subcategory": "21-hidroksilaz eksikliği göstergesi",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Adrenal steroid sentezinde 21-hidroksilaz eksikliğinde biriken prekürsörün yüksek saptanmasıdır.",
    "preAnswerSafeDefinition": "Adrenal steroid sentezinde 21-hidroksilaz eksikliğinde biriken prekürsörün yüksek saptanmasıdır.",
    "shortDefinition": "Adrenal steroid sentezinde 21-hidroksilaz eksikliğinde biriken prekürsörün yüksek saptanmasıdır.",
    "definition": "Adrenal steroid sentezinde 21-hidroksilaz eksikliğinde biriken prekürsörün yüksek saptanmasıdır.",
    "detailedExplanation": "21-hidroksilaz eksikliğinde kortizol ve aldosteron sentezi azalırken prekürsörler androjen yoluna kayar; 17-hidroksiprogesteron yüksekliği tanısal ipucudur.",
    "postAnswerExplanation": "21-hidroksilaz eksikliğinde kortizol ve aldosteron sentezi azalırken prekürsörler androjen yoluna kayar; 17-hidroksiprogesteron yüksekliği tanısal ipucudur.",
    "postAnswerExpandedExplanation": "21-hidroksilaz eksikliğinde kortizol ve aldosteron sentezi azalırken prekürsörler androjen yoluna kayar; 17-hidroksiprogesteron yüksekliği tanısal ipucudur.",
    "tusPearl": "Virilizasyon/tuz kaybı + yüksek 17-hidroksiprogesteron = 21-hidroksilaz eksikliği.",
    "differentialPoint": "11β-hidroksilaz eksikliğinde hipertansiyon; 21-hidroksilazda tuz kaybı/hipotansiyon daha beklenir.",
    "clinicalRelevance": "Virilizasyon/tuz kaybı + yüksek 17-hidroksiprogesteron = 21-hidroksilaz eksikliği.",
    "mechanism": "",
    "relatedBranches": [
      "medical-biochemistry"
    ],
    "relatedTerms": [
      "21-hidroksilaz eksikliği",
      "Konjenital adrenal hiperplazi",
      "Virilizasyon",
      "Tuz kaybı"
    ],
    "safeNestedTerms": [
      "21-hidroksilaz eksikliği",
      "Konjenital adrenal hiperplazi",
      "Virilizasyon",
      "Tuz kaybı"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "17-hidroksiprogesteron yüksekliği",
      "Konjenital adrenal hiperplazi",
      "21-hidroksilaz eksikliği",
      "Virilizasyon",
      "Tuz kaybı"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde '17-hidroksiprogesteron yüksekliği' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "len 17-hidroksiprogesteron en tipik laboratuvar bulgusudur; kortizol ve aldosteron yükselmez, metanefrin feokromositoma değerlendirmesiyle ilişkilidir. 21-hidroksilaz eksikliğinde 17-hidroksiprogesteron kortizol yolunda ilerleyemez ve birikir; bu nedenle yenidoğan taraması ve tanısal değerlendirmede temel belirteçtir. 21-hidroksilaz basamağı bloke olduğunda biriken temel prekürsördür; taramada en önemli belirteçtir...."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 3,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-noral-tup-kokenli-gliya",
    "term": "Nöral tüp kökenli gliya",
    "aliases": [
      "Nöral tüp kökenli gliya"
    ],
    "normalizedTerm": "noral tup kokenli gliya",
    "TurkishName": "Nöral tüp kökenli gliya",
    "EnglishName": "",
    "category": "Embriyoloji / nöroanatomi",
    "subcategory": "MSS gliya kökeni",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Merkezi sinir sistemi glia hücrelerinin önemli kısmının nöral tüpten geliştiğini ifade eden embriyolojik kavramdır.",
    "preAnswerSafeDefinition": "Merkezi sinir sistemi glia hücrelerinin önemli kısmının nöral tüpten geliştiğini ifade eden embriyolojik kavramdır.",
    "shortDefinition": "Merkezi sinir sistemi glia hücrelerinin önemli kısmının nöral tüpten geliştiğini ifade eden embriyolojik kavramdır.",
    "definition": "Merkezi sinir sistemi glia hücrelerinin önemli kısmının nöral tüpten geliştiğini ifade eden embriyolojik kavramdır.",
    "detailedExplanation": "Oligodendrosit ve astrosit gibi MSS gliaları nöral tüp kökenliyken Schwann hücresi ve melanosit nöral krest kökenlidir. Bu ayrım embriyoloji sorularında sık çeldirici olur.",
    "postAnswerExplanation": "Oligodendrosit ve astrosit gibi MSS gliaları nöral tüp kökenliyken Schwann hücresi ve melanosit nöral krest kökenlidir. Bu ayrım embriyoloji sorularında sık çeldirici olur.",
    "postAnswerExpandedExplanation": "Oligodendrosit ve astrosit gibi MSS gliaları nöral tüp kökenliyken Schwann hücresi ve melanosit nöral krest kökenlidir. Bu ayrım embriyoloji sorularında sık çeldirici olur.",
    "tusPearl": "Oligodendrosit/astrosit = nöral tüp; Schwann/melanosit/adrenal medulla = nöral krest.",
    "differentialPoint": "MSS miyelini oligodendrosit; periferik miyelin Schwann hücresi tarafından yapılır.",
    "clinicalRelevance": "Oligodendrosit/astrosit = nöral tüp; Schwann/melanosit/adrenal medulla = nöral krest.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [
      "Oligodendrosit",
      "Astrosit",
      "Schwann hücresi",
      "Nöral krest"
    ],
    "safeNestedTerms": [
      "Oligodendrosit",
      "Astrosit",
      "Schwann hücresi",
      "Nöral krest"
    ],
    "difficulty": "P2",
    "answerLeakRisk": "low",
    "qualityScore": 86,
    "matchingPriority": 90,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Nöral tüp kökenli gliya",
      "Schwann hücresi",
      "Oligodendrosit",
      "Nöral krest",
      "Astrosit"
    ],
    "sourceTextExamples": [
      "V317 içinde aktif glossary ilişkili kavram havuzu ve eğitim metinleri bağlamında aday olarak işaretlendi; kısa örnek otomatik ayrıştırılamadı."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P2",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/*",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 18
    }
  },
  {
    "id": "v320-quality-batch3-kavernoz-sinus-lateral-duvar-anatomisi",
    "term": "Kavernöz sinüs lateral duvar anatomisi",
    "aliases": [
      "Kavernöz sinüs lateral duvar anatomisi"
    ],
    "normalizedTerm": "kavernoz sinus lateral duvar anatomisi",
    "TurkishName": "Kavernöz sinüs lateral duvar anatomisi",
    "EnglishName": "",
    "category": "Anatomi / nöroanatomi",
    "subcategory": "Kranial sinir ilişkisi",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Kavernöz sinüs lateral duvarında III, IV, V1 ve V2 sinirlerinin; sinüs içinde ise internal karotis ve VI sinirin seyrettiği anatomik ilişkidir.",
    "preAnswerSafeDefinition": "Kavernöz sinüs lateral duvarında III, IV, V1 ve V2 sinirlerinin; sinüs içinde ise internal karotis ve VI sinirin seyrettiği anatomik ilişkidir.",
    "shortDefinition": "Kavernöz sinüs lateral duvarında III, IV, V1 ve V2 sinirlerinin; sinüs içinde ise internal karotis ve VI sinirin seyrettiği anatomik ilişkidir.",
    "definition": "Kavernöz sinüs lateral duvarında III, IV, V1 ve V2 sinirlerinin; sinüs içinde ise internal karotis ve VI sinirin seyrettiği anatomik ilişkidir.",
    "detailedExplanation": "Kavernöz sinüs patolojilerinde abducens siniri internal karotise yakın ve sinüs içinde olduğu için erken etkilenebilir. Bu ilişki oftalmopleji ve trigeminal duyu bulgularını yorumlatır.",
    "postAnswerExplanation": "Kavernöz sinüs patolojilerinde abducens siniri internal karotise yakın ve sinüs içinde olduğu için erken etkilenebilir. Bu ilişki oftalmopleji ve trigeminal duyu bulgularını yorumlatır.",
    "postAnswerExpandedExplanation": "Kavernöz sinüs patolojilerinde abducens siniri internal karotise yakın ve sinüs içinde olduğu için erken etkilenebilir. Bu ilişki oftalmopleji ve trigeminal duyu bulgularını yorumlatır.",
    "tusPearl": "Kavernöz sinüste VI sinir sinüs içinde; III, IV, V1, V2 lateral duvarda seyreder.",
    "differentialPoint": "Superior orbital fissür sendromuyla karışabilir; kavernöz sinüs internal karotis ve venöz yapı ilişkisiyle ayrılır.",
    "clinicalRelevance": "Kavernöz sinüste VI sinir sinüs içinde; III, IV, V1, V2 lateral duvarda seyreder.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy"
    ],
    "relatedTerms": [
      "Abducens siniri",
      "Internal karotis arter",
      "V1",
      "V2"
    ],
    "safeNestedTerms": [
      "Abducens siniri",
      "Internal karotis arter",
      "V1",
      "V2"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Kavernöz sinüs lateral duvar anatomisi",
      "Internal karotis arter",
      "Abducens siniri",
      "V1",
      "V2"
    ],
    "sourceTextExamples": [
      "V317 içinde aktif glossary ilişkili kavram havuzu ve eğitim metinleri bağlamında aday olarak işaretlendi; kısa örnek otomatik ayrıştırılamadı."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/*",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-endometrioma",
    "term": "Endometrioma",
    "aliases": [
      "Endometrioma"
    ],
    "normalizedTerm": "endometrioma",
    "TurkishName": "Endometrioma",
    "EnglishName": "",
    "category": "Kadın doğum / jinekolojik kist",
    "subcategory": "Endometriozis ilişkili over kisti",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Over içinde endometriozis odağının oluşturduğu, eski kan içeriği nedeniyle “çikolata kisti” olarak bilinen kistik lezyondur.",
    "preAnswerSafeDefinition": "Over içinde endometriozis odağının oluşturduğu, eski kan içeriği nedeniyle “çikolata kisti” olarak bilinen kistik lezyondur.",
    "shortDefinition": "Over içinde endometriozis odağının oluşturduğu, eski kan içeriği nedeniyle “çikolata kisti” olarak bilinen kistik lezyondur.",
    "definition": "Over içinde endometriozis odağının oluşturduğu, eski kan içeriği nedeniyle “çikolata kisti” olarak bilinen kistik lezyondur.",
    "detailedExplanation": "Endometrioma dismenore, kronik pelvik ağrı ve infertiliteyle ilişkili olabilir. Ultrasonografide homojen düşük eko içerikli kist görünümü öğretici bir ipucudur.",
    "postAnswerExplanation": "Endometrioma dismenore, kronik pelvik ağrı ve infertiliteyle ilişkili olabilir. Ultrasonografide homojen düşük eko içerikli kist görünümü öğretici bir ipucudur.",
    "postAnswerExpandedExplanation": "Endometrioma dismenore, kronik pelvik ağrı ve infertiliteyle ilişkili olabilir. Ultrasonografide homojen düşük eko içerikli kist görünümü öğretici bir ipucudur.",
    "tusPearl": "Dismenore + infertilite + homojen düşük eko over kisti = endometrioma düşün.",
    "differentialPoint": "Fonksiyonel kistler siklusla değişebilir; endometrioma endometriozis kliniği ve tipik ultrason görünümüyle ayrılır.",
    "clinicalRelevance": "Dismenore + infertilite + homojen düşük eko over kisti = endometrioma düşün.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology"
    ],
    "relatedTerms": [
      "Endometriozis",
      "Dismenore",
      "İnfertilite",
      "Over kisti"
    ],
    "safeNestedTerms": [
      "Endometriozis",
      "Dismenore",
      "İnfertilite",
      "Over kisti"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Endometriozis",
      "Endometrioma",
      "İnfertilite",
      "Over kisti",
      "Dismenore"
    ],
    "sourceTextExamples": [
      "removed-branch-template-source içinde 'Endometrioma' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "src/data/cases.js içinde 'Endometrioma' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 3,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "removed-branch-template-source, src/data/cases.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-palm-coein-siniflamasi",
    "term": "PALM-COEIN sınıflaması",
    "aliases": [
      "PALM-COEIN sınıflaması"
    ],
    "normalizedTerm": "palm-coein siniflamasi",
    "TurkishName": "PALM-COEIN sınıflaması",
    "EnglishName": "",
    "category": "Kadın doğum / anormal uterin kanama",
    "subcategory": "AUB nedenleri sınıflaması",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Anormal uterin kanama nedenlerini yapısal PALM ve yapısal olmayan COEIN gruplarına ayıran sınıflamadır.",
    "preAnswerSafeDefinition": "Anormal uterin kanama nedenlerini yapısal PALM ve yapısal olmayan COEIN gruplarına ayıran sınıflamadır.",
    "shortDefinition": "Anormal uterin kanama nedenlerini yapısal PALM ve yapısal olmayan COEIN gruplarına ayıran sınıflamadır.",
    "definition": "Anormal uterin kanama nedenlerini yapısal PALM ve yapısal olmayan COEIN gruplarına ayıran sınıflamadır.",
    "detailedExplanation": "PALM: polip, adenomyozis, leiomyom, malignite/hiperplazi; COEIN: koagülopati, ovulatuvar disfonksiyon, endometrial, iatrojenik ve sınıflanmamış nedenleri içerir.",
    "postAnswerExplanation": "PALM: polip, adenomyozis, leiomyom, malignite/hiperplazi; COEIN: koagülopati, ovulatuvar disfonksiyon, endometrial, iatrojenik ve sınıflanmamış nedenleri içerir.",
    "postAnswerExpandedExplanation": "PALM: polip, adenomyozis, leiomyom, malignite/hiperplazi; COEIN: koagülopati, ovulatuvar disfonksiyon, endometrial, iatrojenik ve sınıflanmamış nedenleri içerir.",
    "tusPearl": "PALM yapısal; COEIN yapısal olmayan AUB nedenleridir.",
    "differentialPoint": "Leiomyom/polip görüntüleme ile yapısal neden; ovulatuvar disfonksiyon hormonal/döngüsel neden olarak ayrılır.",
    "clinicalRelevance": "PALM yapısal; COEIN yapısal olmayan AUB nedenleridir.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics-gynecology"
    ],
    "relatedTerms": [
      "Anormal uterin kanama",
      "Leiomyom",
      "Koagülopati",
      "Ovulatuvar disfonksiyon"
    ],
    "safeNestedTerms": [
      "Anormal uterin kanama",
      "Leiomyom",
      "Koagülopati",
      "Ovulatuvar disfonksiyon"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": true,
    "keywordsForSearch": [
      "Ovulatuvar disfonksiyon",
      "PALM-COEIN sınıflaması",
      "Anormal uterin kanama",
      "Koagülopati",
      "Leiomyom"
    ],
    "sourceTextExamples": [
      "src/data/cases.js içinde 'PALM-COEIN sınıflaması' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "zis, leiomyom, malignite/hiperplazi. Ovulatuvar disfonksiyon ise hormonal/işlevsel bir bozukluktur ve COEIN grubunun “O” bileşenidir. Bu nedenle yapısal nedenler içinde yer almaz. PALM-COEIN sınıflamasında PALM grubu yapısal nedenleri; polip, adenomyozis, leiomyom, malignite/hiperplaziyi ifade eder. COEIN grubu ise yapısal olmayan nedenleri; koagülopati, ovulatuvar disfonksiyon, endometriyal nedenler, iyatrojenik..."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 3,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/cases.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-perfore-peptik-ulser",
    "term": "Perfore peptik ülser",
    "aliases": [
      "Perfore peptik ülser"
    ],
    "normalizedTerm": "perfore peptik ulser",
    "TurkishName": "Perfore peptik ülser",
    "EnglishName": "",
    "category": "Genel cerrahi / akut batın",
    "subcategory": "Peritonit nedeni",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Peptik ülserin mide veya duodenum duvarını tam kat geçerek serbest perforasyon ve peritonit oluşturmasıdır.",
    "preAnswerSafeDefinition": "Peptik ülserin mide veya duodenum duvarını tam kat geçerek serbest perforasyon ve peritonit oluşturmasıdır.",
    "shortDefinition": "Peptik ülserin mide veya duodenum duvarını tam kat geçerek serbest perforasyon ve peritonit oluşturmasıdır.",
    "definition": "Peptik ülserin mide veya duodenum duvarını tam kat geçerek serbest perforasyon ve peritonit oluşturmasıdır.",
    "detailedExplanation": "Perfore peptik ülserde ani başlayan şiddetli epigastrik ağrı, tahta karın/peritonit ve diyafram altında serbest hava görülebilir. Resüsitasyon, antibiyotik ve acil cerrahi değerlendirme gerekir.",
    "postAnswerExplanation": "Perfore peptik ülserde ani başlayan şiddetli epigastrik ağrı, tahta karın/peritonit ve diyafram altında serbest hava görülebilir. Resüsitasyon, antibiyotik ve acil cerrahi değerlendirme gerekir.",
    "postAnswerExpandedExplanation": "Perfore peptik ülserde ani başlayan şiddetli epigastrik ağrı, tahta karın/peritonit ve diyafram altında serbest hava görülebilir. Resüsitasyon, antibiyotik ve acil cerrahi değerlendirme gerekir.",
    "tusPearl": "Ani epigastrik ağrı + yaygın peritonit + serbest hava = perfore peptik ülser.",
    "differentialPoint": "Pankreatitte amilaz/lipaz ve sırta vuran ağrı; perforasyonda peritonit ve serbest hava ön plandadır.",
    "clinicalRelevance": "Ani epigastrik ağrı + yaygın peritonit + serbest hava = perfore peptik ülser.",
    "mechanism": "",
    "relatedBranches": [
      "general-surgery"
    ],
    "relatedTerms": [
      "Peritonit bulguları",
      "Serbest hava",
      "Akut batın",
      "Acil cerrahi"
    ],
    "safeNestedTerms": [
      "Peritonit bulguları",
      "Serbest hava",
      "Akut batın",
      "Acil cerrahi"
    ],
    "difficulty": "P0",
    "answerLeakRisk": "medium",
    "qualityScore": 96,
    "matchingPriority": 98,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Perfore peptik ülser",
      "Peritonit bulguları",
      "Acil cerrahi",
      "Serbest hava",
      "Akut batın"
    ],
    "sourceTextExamples": [
      "pirik yaklaşım',  ],  'general-surgery': [  'Akut apandisit', 'Akut kolesistit', 'Kolanjit Charcot triadı', 'Pankreatit komplikasyonları',  'İnce bağırsak obstrüksiyonu', 'Perfore peptik ülser', 'Travma primer değerlendirme', 'Hemotoraks ve pnömotoraks',  'Kompartman sendromu', 'Yanık sıvı resüsitasyonu', 'Meme kitlesi yaklaşımı', 'Kolorektal kanser taraması',  ],  'obstetrics-gynecology': [  'Ektopik gebelik',...",
      "src/data/cases.js içinde 'Perfore peptik ülser' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 2,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "medium",
      "priority": "P0",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "removed-topic-pool-source, src/data/cases.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 24
    }
  },
  {
    "id": "v320-quality-batch3-zenker-divertikulu",
    "term": "Zenker divertikülü",
    "aliases": [
      "Zenker divertikülü"
    ],
    "normalizedTerm": "zenker divertikulu",
    "TurkishName": "Zenker divertikülü",
    "EnglishName": "",
    "category": "Gastroenteroloji / özofagus",
    "subcategory": "Faringoözofageal divertikül",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Kriko-faringeal bölgede gelişen pulsiyon divertikülüdür; disfaji, regürjitasyon, halitozis ve aspirasyonla ilişkilidir.",
    "preAnswerSafeDefinition": "Kriko-faringeal bölgede gelişen pulsiyon divertikülüdür; disfaji, regürjitasyon, halitozis ve aspirasyonla ilişkilidir.",
    "shortDefinition": "Kriko-faringeal bölgede gelişen pulsiyon divertikülüdür; disfaji, regürjitasyon, halitozis ve aspirasyonla ilişkilidir.",
    "definition": "Kriko-faringeal bölgede gelişen pulsiyon divertikülüdür; disfaji, regürjitasyon, halitozis ve aspirasyonla ilişkilidir.",
    "detailedExplanation": "Zenker divertikülünde yutulan gıda divertikül içinde birikerek halitozis, gece regürjitasyonu ve aspirasyon yapabilir. Yaşlı hastada orofaringeal disfaji paterninde düşünülür.",
    "postAnswerExplanation": "Zenker divertikülünde yutulan gıda divertikül içinde birikerek halitozis, gece regürjitasyonu ve aspirasyon yapabilir. Yaşlı hastada orofaringeal disfaji paterninde düşünülür.",
    "postAnswerExpandedExplanation": "Zenker divertikülünde yutulan gıda divertikül içinde birikerek halitozis, gece regürjitasyonu ve aspirasyon yapabilir. Yaşlı hastada orofaringeal disfaji paterninde düşünülür.",
    "tusPearl": "Yaşlı hasta + disfaji + halitozis + regürjitasyon = Zenker divertikülü.",
    "differentialPoint": "Akalazyada LES gevşeme bozukluğu ve kuş gagası; Zenker’de faringoözofageal poş ve halitozis/regürjitasyon öne çıkar.",
    "clinicalRelevance": "Yaşlı hasta + disfaji + halitozis + regürjitasyon = Zenker divertikülü.",
    "mechanism": "",
    "relatedBranches": [
      "general-surgery"
    ],
    "relatedTerms": [
      "Disfaji",
      "Halitozis",
      "Regürjitasyon",
      "Aspirasyon"
    ],
    "safeNestedTerms": [
      "Disfaji",
      "Halitozis",
      "Regürjitasyon",
      "Aspirasyon"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Zenker divertikülü",
      "Regürjitasyon",
      "Aspirasyon",
      "Halitozis",
      "Disfaji"
    ],
    "sourceTextExamples": [
      "V317 içinde aktif glossary ilişkili kavram havuzu ve eğitim metinleri bağlamında aday olarak işaretlendi; kısa örnek otomatik ayrıştırılamadı."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 1,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addNewEntry",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "src/data/*",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  },
  {
    "id": "v320-quality-batch3-disfaji-plus-halitozis-plus-regurjitasyon",
    "term": "Disfaji + halitozis + regürjitasyon",
    "aliases": [
      "Disfaji + halitozis + regürjitasyon"
    ],
    "normalizedTerm": "disfaji + halitozis + regurjitasyon",
    "TurkishName": "Disfaji + halitozis + regürjitasyon",
    "EnglishName": "",
    "category": "Gastroenteroloji / klinik patern",
    "subcategory": "Zenker patern ipucu",
    "sourceLayer": "V320 quality-preserved glossary batch 3",
    "previewDefinition": "Özellikle Zenker divertikülünü düşündüren, gıda birikimi ve geri kaçışla açıklanan semptom kombinasyonudur.",
    "preAnswerSafeDefinition": "Özellikle Zenker divertikülünü düşündüren, gıda birikimi ve geri kaçışla açıklanan semptom kombinasyonudur.",
    "shortDefinition": "Özellikle Zenker divertikülünü düşündüren, gıda birikimi ve geri kaçışla açıklanan semptom kombinasyonudur.",
    "definition": "Özellikle Zenker divertikülünü düşündüren, gıda birikimi ve geri kaçışla açıklanan semptom kombinasyonudur.",
    "detailedExplanation": "Bu üçlü, özofagus lümeninden çok faringoözofageal poş içinde gıda birikimine işaret eder. Aspirasyon riski ve yaşlı hasta bağlamı tanısal değeri artırır.",
    "postAnswerExplanation": "Bu üçlü, özofagus lümeninden çok faringoözofageal poş içinde gıda birikimine işaret eder. Aspirasyon riski ve yaşlı hasta bağlamı tanısal değeri artırır.",
    "postAnswerExpandedExplanation": "Bu üçlü, özofagus lümeninden çok faringoözofageal poş içinde gıda birikimine işaret eder. Aspirasyon riski ve yaşlı hasta bağlamı tanısal değeri artırır.",
    "tusPearl": "Disfajiye halitozis ve regürjitasyon eşlik ediyorsa Zenker divertikülü güçlü çeldirici/cevap olabilir.",
    "differentialPoint": "Akalazya katı-sıvı disfajisi yapar; belirgin halitozis ve poş regürjitasyonu Zenker lehinedir.",
    "clinicalRelevance": "Disfajiye halitozis ve regürjitasyon eşlik ediyorsa Zenker divertikülü güçlü çeldirici/cevap olabilir.",
    "mechanism": "",
    "relatedBranches": [
      "general-surgery"
    ],
    "relatedTerms": [
      "Zenker divertikülü",
      "Aspirasyon",
      "Orofaringeal disfaji",
      "Regürjitasyon"
    ],
    "safeNestedTerms": [
      "Zenker divertikülü",
      "Aspirasyon",
      "Orofaringeal disfaji",
      "Regürjitasyon"
    ],
    "difficulty": "P1",
    "answerLeakRisk": "low",
    "qualityScore": 92,
    "matchingPriority": 95,
    "nestedGlossaryAllowed": true,
    "caseSensitiveDisplay": false,
    "keywordsForSearch": [
      "Disfaji + halitozis + regürjitasyon",
      "Orofaringeal disfaji",
      "Zenker divertikülü",
      "Regürjitasyon",
      "Aspirasyon"
    ],
    "sourceTextExamples": [
      "removed-safe-bank-source içinde 'Disfaji + halitozis + regürjitasyon' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi.",
      "src/data/cases.js içinde 'Disfaji + halitozis + regürjitasyon' klinik olgu, seçenek, açıklama, seed veya evidenceChain bağlamında geçiyor; minified/JS kaynak notu raporda sadeleştirildi."
    ],
    "sourceCandidate": {
      "sourceBatch": "v317-quality-preserved-batch3",
      "occurrenceCount": 9,
      "confidenceScore": "high",
      "ambiguityRisk": "low",
      "answerLeakRisk": "low",
      "priority": "P1",
      "recommendation": "addAsSafeNestedTerm",
      "existingGlossaryStatus": "missing",
      "sourceFilePath": "removed-safe-bank-source, src/data/cases.js",
      "reasonForRecommendation": "Aktif glossary exact entry olarak yok; ancak V317 içindeki nested/related term havuzu veya eğitim metinleri içinde klinik karar, mekanizma, tetkik yorumu ya da ayırıcı tanı değeri taşıyor.",
      "qualityScoreFromAudit": 21
    }
  }
];
