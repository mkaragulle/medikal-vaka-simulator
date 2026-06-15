// V332 — Major disease + core jargon glossary additions from V331 Batch 7 audit.
// Source: glossary-v331-major-disease-jargon-gap-batch7(1).json
// Accepted entries were filtered against the active V331 glossary exact/alias set.
// Duplicates and alias collisions were skipped; short acronym entries keep case-sensitive display.

export const TUS_GLOSSARY_V332_MAJOR_JARGON_BATCH7_TERMS = [
  {
    "id": "v332-major-jargon-batch7-ensefalit",
    "term": "Ensefalit",
    "aliases": [
      "Ensefalit",
      "beyin parankim enfeksiyonu"
    ],
    "normalizedTerm": "ensefalit",
    "TurkishName": "Ensefalit",
    "EnglishName": "",
    "category": "Nörolojik enfeksiyon acili",
    "subcategory": "Nörolojik enfeksiyon acili",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Bilinç değişikliği, nöbet ve ateşle birlikte düşünülen santral sinir sistemi inflamasyonudur.",
    "preAnswerSafeDefinition": "Bilinç değişikliği, nöbet ve ateşle birlikte düşünülen santral sinir sistemi inflamasyonudur.",
    "shortDefinition": "Beyin parankiminin enfeksiyöz veya immün aracılı inflamasyonudur; ateş, bilinç değişikliği, nöbet ve fokal bulgularla seyredebilir.",
    "definition": "Beyin parankiminin enfeksiyöz veya immün aracılı inflamasyonudur; ateş, bilinç değişikliği, nöbet ve fokal bulgularla seyredebilir.",
    "detailedExplanation": "Ensefalitte meningeal bulgulara ek olarak parankim tutulumu vardır; konfüzyon, davranış değişikliği, nöbet veya fokal nörolojik defisit beklenebilir. HSV ensefalitinde temporal lob tutulumu ve gecikmeden asiklovir başlanması TUS açısından kritiktir.",
    "postAnswerExplanation": "Ensefalitte meningeal bulgulara ek olarak parankim tutulumu vardır; konfüzyon, davranış değişikliği, nöbet veya fokal nörolojik defisit beklenebilir. HSV ensefalitinde temporal lob tutulumu ve gecikmeden asiklovir başlanması TUS açısından kritiktir.",
    "postAnswerExpandedExplanation": "Ensefalitte meningeal bulgulara ek olarak parankim tutulumu vardır; konfüzyon, davranış değişikliği, nöbet veya fokal nörolojik defisit beklenebilir. HSV ensefalitinde temporal lob tutulumu ve gecikmeden asiklovir başlanması TUS açısından kritiktir.",
    "tusPearl": "Ateş + bilinç değişikliği/nöbet + temporal lob tutulumu = HSV ensefaliti düşün; asiklovir geciktirilmez.",
    "examPearl": "Ateş + bilinç değişikliği/nöbet + temporal lob tutulumu = HSV ensefaliti düşün; asiklovir geciktirilmez.",
    "differentialPoint": "Menenjitte meningeal irritasyon baskınken ensefalitte parankimal bulgular ve bilinç değişikliği daha belirgindir.",
    "clinicalRelevance": "Ensefalitte meningeal bulgulara ek olarak parankim tutulumu vardır; konfüzyon, davranış değişikliği, nöbet veya fokal nörolojik defisit beklenebilir. HSV ensefalitinde temporal lob tutulumu ve gecikmeden asiklovir başlanması TUS açısından kritiktir.",
    "safeNestedTerms": [
      "HSV ensefaliti",
      "Asiklovir",
      "Temporal lob",
      "Bilinç değişikliği",
      "Nöbet"
    ],
    "relatedTerms": [
      "HSV ensefaliti",
      "Asiklovir",
      "Temporal lob",
      "Bilinç değişikliği",
      "Nöbet"
    ],
    "matchingPriority": 96,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "medium",
    "ambiguityRisk": "low",
    "priority": "P0",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryV330UltraDeepBatch5And6Index.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 9,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "asında retinit ve baykuş gözü inklüzyonlarıyla en uyumlu etkendir. , Herpes simplex virus tip 1 : Herpes simplex virus tip 1 oral lezyon ve ensefalit yapabilir; baykuş gözü inklüzyonları CMV için daha tipiktir. , Varicella-zoster virus : Varicella-zoster virus"
      },
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "ı artmış olabilir. , difficulty : orta , branchId : minor-rotations , subject : Küçük Stajlar , topic : HSV ensefaliti , mainQuestion : Ateş, davranış değişikliği, nöbet ve temporal lob tutulumu hangi ensefaliti düşündürür? , mainAnswer : HSV ensefaliti. , exp"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-hbv",
    "term": "HBV",
    "aliases": [
      "HBV",
      "hepatit B virüsü"
    ],
    "normalizedTerm": "hbv",
    "TurkishName": "HBV",
    "EnglishName": "",
    "category": "Viroloji",
    "subcategory": "Viroloji",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Seroloji ve karaciğer inflamasyonu ile değerlendirilen hepatit virüsüdür.",
    "preAnswerSafeDefinition": "Seroloji ve karaciğer inflamasyonu ile değerlendirilen hepatit virüsüdür.",
    "shortDefinition": "Hepatit B virüsü; kısmen çift sarmallı DNA genomu ve reverse transkriptaz kullanımı olan hepatotropik virüstür.",
    "definition": "Hepatit B virüsü; kısmen çift sarmallı DNA genomu ve reverse transkriptaz kullanımı olan hepatotropik virüstür.",
    "detailedExplanation": "HBV’de HBsAg aktif enfeksiyon/taşıyıcılığı, anti-HBs bağışıklığı, anti-HBc IgM akut enfeksiyonu, anti-HBc IgG geçirilmiş veya kronik teması gösterir. Pencere döneminde HBsAg kaybolmuş, anti-HBs henüz oluşmamış olabilir; anti-HBc IgM ayırt ettiricidir.",
    "postAnswerExplanation": "HBV’de HBsAg aktif enfeksiyon/taşıyıcılığı, anti-HBs bağışıklığı, anti-HBc IgM akut enfeksiyonu, anti-HBc IgG geçirilmiş veya kronik teması gösterir. Pencere döneminde HBsAg kaybolmuş, anti-HBs henüz oluşmamış olabilir; anti-HBc IgM ayırt ettiricidir.",
    "postAnswerExpandedExplanation": "HBV’de HBsAg aktif enfeksiyon/taşıyıcılığı, anti-HBs bağışıklığı, anti-HBc IgM akut enfeksiyonu, anti-HBc IgG geçirilmiş veya kronik teması gösterir. Pencere döneminde HBsAg kaybolmuş, anti-HBs henüz oluşmamış olabilir; anti-HBc IgM ayırt ettiricidir.",
    "tusPearl": "HBsAg pozitifliği aktif HBV; anti-HBs pozitifliği bağışıklık; anti-HBc IgM akut/pencere dönemi ipucudur.",
    "examPearl": "HBsAg pozitifliği aktif HBV; anti-HBs pozitifliği bağışıklık; anti-HBc IgM akut/pencere dönemi ipucudur.",
    "differentialPoint": "HAV fekal-oral ve akut; HCV kronikleşme eğilimi yüksek; HBV’de serolojik panel ayrımı çok önemlidir.",
    "clinicalRelevance": "HBV’de HBsAg aktif enfeksiyon/taşıyıcılığı, anti-HBs bağışıklığı, anti-HBc IgM akut enfeksiyonu, anti-HBc IgG geçirilmiş veya kronik teması gösterir. Pencere döneminde HBsAg kaybolmuş, anti-HBs henüz oluşmamış olabilir; anti-HBc IgM ayırt ettiricidir.",
    "safeNestedTerms": [
      "HBsAg",
      "Anti-HBc",
      "HBV DNA",
      "Pencere dönemi",
      "Reverse transkriptaz"
    ],
    "relatedTerms": [
      "HBsAg",
      "Anti-HBc",
      "HBV DNA",
      "Pencere dönemi",
      "Reverse transkriptaz"
    ],
    "matchingPriority": 78,
    "standaloneSafe": true,
    "caseSensitiveDisplay": true,
    "answerLeakRisk": "low",
    "ambiguityRisk": "medium",
    "priority": "P1",
    "recommendation": "addNewEntryWithAliasGuard",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/tusQuestionArchive.js",
    "sourceFiles": [
      "src/data/tusQuestionArchive.js",
      "src/data/cases.js",
      "src/data/cases.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryContextualPhraseIndex.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 172,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/tusQuestionArchive.js",
        "text": "AV IgG negatif; HBsAg negatif; Anti-HBc IgM negatif; Anti-HCV negatif. , findings : Anti-HAV IgM pozitif , HBV akut enfeksiyon göstergeleri negatif , HCV taraması negatif , question : Bu serolojik patern en çok hangi tabloyu destekler? , options : id : A , tex"
      },
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "ti-HAV IgG negatif, HBsAg negatif, Anti-HBc IgM negatif, Anti-HCV negatif. , findings : HAV IgM saptanır , HBV akut belirteçleri negatif , HCV taraması negatif , question : Bu serolojik patern en güçlü olarak hangi sonucu destekler? , options : id : A , text :"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-hipotiroidi",
    "term": "Hipotiroidi",
    "aliases": [
      "Hipotiroidi",
      "tiroid hormon eksikliği"
    ],
    "normalizedTerm": "hipotiroidi",
    "TurkishName": "Hipotiroidi",
    "EnglishName": "",
    "category": "Endokrin hastalık",
    "subcategory": "Endokrin hastalık",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "TSH ve serbest T4 ile değerlendirilen tiroid hormon yetersizliği durumudur.",
    "preAnswerSafeDefinition": "TSH ve serbest T4 ile değerlendirilen tiroid hormon yetersizliği durumudur.",
    "shortDefinition": "Tiroid hormon etkisinin azalmasıyla metabolik yavaşlama oluşturan endokrin tablodur.",
    "definition": "Tiroid hormon etkisinin azalmasıyla metabolik yavaşlama oluşturan endokrin tablodur.",
    "detailedExplanation": "Primer hipotiroidide tiroid bezi yetersizdir; TSH yüksek, serbest T4 düşük beklenir. Halsizlik, kilo alma, soğuk intoleransı, kabızlık, bradikardi ve kuru cilt tipiktir; yenidoğanda tedavi gecikirse nörogelişim etkilenebilir.",
    "postAnswerExplanation": "Primer hipotiroidide tiroid bezi yetersizdir; TSH yüksek, serbest T4 düşük beklenir. Halsizlik, kilo alma, soğuk intoleransı, kabızlık, bradikardi ve kuru cilt tipiktir; yenidoğanda tedavi gecikirse nörogelişim etkilenebilir.",
    "postAnswerExpandedExplanation": "Primer hipotiroidide tiroid bezi yetersizdir; TSH yüksek, serbest T4 düşük beklenir. Halsizlik, kilo alma, soğuk intoleransı, kabızlık, bradikardi ve kuru cilt tipiktir; yenidoğanda tedavi gecikirse nörogelişim etkilenebilir.",
    "tusPearl": "TSH yüksek + serbest T4 düşük = primer hipotiroidi; yenidoğan taramasında TSH yüksekliği kaçırılmamalıdır.",
    "examPearl": "TSH yüksek + serbest T4 düşük = primer hipotiroidi; yenidoğan taramasında TSH yüksekliği kaçırılmamalıdır.",
    "differentialPoint": "Santral hipotiroidide TSH uygunsuz düşük/normal olabilir; primerde TSH yükselir.",
    "clinicalRelevance": "Primer hipotiroidide tiroid bezi yetersizdir; TSH yüksek, serbest T4 düşük beklenir. Halsizlik, kilo alma, soğuk intoleransı, kabızlık, bradikardi ve kuru cilt tipiktir; yenidoğanda tedavi gecikirse nörogelişim etkilenebilir.",
    "safeNestedTerms": [
      "TSH",
      "Serbest T4",
      "Levotiroksin",
      "Konjenital hipotiroidi",
      "Hashimoto tiroiditi"
    ],
    "relatedTerms": [
      "TSH",
      "Serbest T4",
      "Levotiroksin",
      "Konjenital hipotiroidi",
      "Hashimoto tiroiditi"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "medium",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryCaseDerivedIndex.js",
      "src/data/tusGlossaryCandidateAuditIndex.js",
      "src/data/tusGlossaryV300SupplementalIndex.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 140,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "büyüyen agresif kitle yapar; bu sitolojik nükleer patern papiller karsinom lehinedir. , Hashimoto tiroiditi : Hashimoto tiroiditi otoimmün hipotiroidi ve lenfositik infiltrasyonla seyreder; mikrokalsifikasyonlu nodül ve papiller nükleer özellikler beklenmez. ,"
      },
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "tyum nefrojenik DI ve tiroidle karışır. , extraQuestion : Lityumun klasik endokrin yan etkilerinden biri nedir? , extraAnswer : Hipotiroidi. , difficulty : orta , branchId : medical-pharmacology , subject : Tıbbi Farmakoloji , topic : Metformin , mainQuestion "
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-atipik-pnomoni",
    "term": "Atipik pnömoni",
    "aliases": [
      "Atipik pnömoni",
      "atipik zatürre"
    ],
    "normalizedTerm": "atipik pnomoni",
    "TurkishName": "Atipik pnömoni",
    "EnglishName": "",
    "category": "Enfeksiyon / pulmonoloji",
    "subcategory": "Enfeksiyon",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Solunum yolu enfeksiyonunda klasik bakteriyel pnömoniden farklı klinik-radyolojik patern oluşturabilir.",
    "preAnswerSafeDefinition": "Solunum yolu enfeksiyonunda klasik bakteriyel pnömoniden farklı klinik-radyolojik patern oluşturabilir.",
    "shortDefinition": "Klasik lobar konsolidasyon yerine daha sinsi klinik ve interstisyel/radyolojik bulgularla seyreden pnömoni grubudur.",
    "definition": "Klasik lobar konsolidasyon yerine daha sinsi klinik ve interstisyel/radyolojik bulgularla seyreden pnömoni grubudur.",
    "detailedExplanation": "Mycoplasma, Chlamydophila ve Legionella gibi etkenlerde kuru öksürük, baş ağrısı, sistemik yakınmalar ve daha az belirgin oskültasyon bulgusu görülebilir. Beta-laktamlar hücre duvarı olmayan/atipik etkenlerde yetersiz kalabilir; makrolid veya doksisiklin düşünülür.",
    "postAnswerExplanation": "Mycoplasma, Chlamydophila ve Legionella gibi etkenlerde kuru öksürük, baş ağrısı, sistemik yakınmalar ve daha az belirgin oskültasyon bulgusu görülebilir. Beta-laktamlar hücre duvarı olmayan/atipik etkenlerde yetersiz kalabilir; makrolid veya doksisiklin düşünülür.",
    "postAnswerExpandedExplanation": "Mycoplasma, Chlamydophila ve Legionella gibi etkenlerde kuru öksürük, baş ağrısı, sistemik yakınmalar ve daha az belirgin oskültasyon bulgusu görülebilir. Beta-laktamlar hücre duvarı olmayan/atipik etkenlerde yetersiz kalabilir; makrolid veya doksisiklin düşünülür.",
    "tusPearl": "Sinsi pnömoni + kuru öksürük + ekstrapulmoner bulgu = atipik etkenleri düşün.",
    "examPearl": "Sinsi pnömoni + kuru öksürük + ekstrapulmoner bulgu = atipik etkenleri düşün.",
    "differentialPoint": "Tipik pnömonide yüksek ateş, pürülan balgam ve lobar konsolidasyon daha baskındır.",
    "clinicalRelevance": "Mycoplasma, Chlamydophila ve Legionella gibi etkenlerde kuru öksürük, baş ağrısı, sistemik yakınmalar ve daha az belirgin oskültasyon bulgusu görülebilir. Beta-laktamlar hücre duvarı olmayan/atipik etkenlerde yetersiz kalabilir; makrolid veya doksisiklin düşünülür.",
    "safeNestedTerms": [
      "Mycoplasma pneumoniae",
      "Legionella pneumophila",
      "Makrolid",
      "İnterstisyel infiltrat",
      "Pürülan balgam"
    ],
    "relatedTerms": [
      "Mycoplasma pneumoniae",
      "Legionella pneumophila",
      "Makrolid",
      "İnterstisyel infiltrat",
      "Pürülan balgam"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossarySupplementalIndex.js",
      "src/data/tusGlossaryClinicalBranchDeepIndex.js",
      "src/data/tusGlossaryV319TeachableIndex.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 101,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "w-083-atipik-pnomoni-ve-hiponatremi , branchId : medical-microbiology , caseType : standard , relatedBranch : Tıbbi Mikrobiyoloji , title : Atipik pnömoni ve hiponatremi , difficulty : Kolay , clinicalFocus : Klinik ve laboratuvar ipuçlarından etkeni belirleme"
      },
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "emi, karaciğer enzim yüksekliği ve klima öyküsü hangi etkeni düşündürür? , mainAnswer : Legionella pneumophila. , explanation : Atipik pnömoni, gastrointestinal bulgu, hiponatremi ve su sistemi/klima maruziyeti birlikteliği Legionella lehinedir. , keywords : k"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-aspirin",
    "term": "Aspirin",
    "aliases": [
      "Aspirin",
      "asetilsalisilik asit"
    ],
    "normalizedTerm": "aspirin",
    "TurkishName": "Aspirin",
    "EnglishName": "",
    "category": "Antiagregan / NSAİİ",
    "subcategory": "Antiagregan",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Trombosit fonksiyonu, inflamasyon ve bazı toksikoloji tablolarıyla ilişkili sık kullanılan ilaçtır.",
    "preAnswerSafeDefinition": "Trombosit fonksiyonu, inflamasyon ve bazı toksikoloji tablolarıyla ilişkili sık kullanılan ilaçtır.",
    "shortDefinition": "Siklooksijenaz enzimini geri dönüşsüz inhibe eden; düşük dozda antiagregan, yüksek dozda analjezik/antiinflamatuvar etkili ilaçtır.",
    "definition": "Siklooksijenaz enzimini geri dönüşsüz inhibe eden; düşük dozda antiagregan, yüksek dozda analjezik/antiinflamatuvar etkili ilaçtır.",
    "detailedExplanation": "Aspirin trombositlerde TXA2 sentezini azaltarak antiagregan etki yapar. Toksisitede erken respiratuvar alkaloz, sonra yüksek anyon açıklıklı metabolik asidoz görülebilir; çocuklarda viral enfeksiyon sırasında Reye sendromu riski nedeniyle sakınılır.",
    "postAnswerExplanation": "Aspirin trombositlerde TXA2 sentezini azaltarak antiagregan etki yapar. Toksisitede erken respiratuvar alkaloz, sonra yüksek anyon açıklıklı metabolik asidoz görülebilir; çocuklarda viral enfeksiyon sırasında Reye sendromu riski nedeniyle sakınılır.",
    "postAnswerExpandedExplanation": "Aspirin trombositlerde TXA2 sentezini azaltarak antiagregan etki yapar. Toksisitede erken respiratuvar alkaloz, sonra yüksek anyon açıklıklı metabolik asidoz görülebilir; çocuklarda viral enfeksiyon sırasında Reye sendromu riski nedeniyle sakınılır.",
    "tusPearl": "Salisilat toksisitesi = tinnitus/hiperventilasyon + solunumsal alkaloz ve metabolik asidoz kombinasyonu.",
    "examPearl": "Salisilat toksisitesi = tinnitus/hiperventilasyon + solunumsal alkaloz ve metabolik asidoz kombinasyonu.",
    "differentialPoint": "Klopidogrel P2Y12 inhibisyonu yapar; aspirin COX-1 üzerinden TXA2 azalmasıyla ayrılır.",
    "clinicalRelevance": "Aspirin trombositlerde TXA2 sentezini azaltarak antiagregan etki yapar. Toksisitede erken respiratuvar alkaloz, sonra yüksek anyon açıklıklı metabolik asidoz görülebilir; çocuklarda viral enfeksiyon sırasında Reye sendromu riski nedeniyle sakınılır.",
    "safeNestedTerms": [
      "COX inhibisyonu",
      "TXA2",
      "Salisilat toksisitesi",
      "Reye sendromu",
      "Antiagregan"
    ],
    "relatedTerms": [
      "COX inhibisyonu",
      "TXA2",
      "Salisilat toksisitesi",
      "Reye sendromu",
      "Antiagregan"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/cases.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryIndex.js",
      "src/data/tusGlossaryExpandedIndex.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 78,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "get : Kawasaki hastalığında uzamış ateş, mukokutanöz bulgular ve IVIG zamanlaması , correctConcept : Kawasaki hastalığı için IVIG ve aspirin başlamak , demographics : 4 yaş kız çocuk , setting : Pediatri polikliniği , chiefComplaint : Beş gündür ateş ve dökünt"
      },
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "erden hangisidir? , questionType : treatment , answerTarget : treatment , diagnosis : correct : Nitrogliserin , options : Nitrogliserin , Aspirin , Heparin , Klopidogrel , Atropin , question : Bu hastada başlangıç yönetiminde kaçınılması gereken ilaç aşağıdaki"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-protamin-sulfat",
    "term": "Protamin sülfat",
    "aliases": [
      "Protamin sülfat",
      "protamine"
    ],
    "normalizedTerm": "protamin sulfat",
    "TurkishName": "Protamin sülfat",
    "EnglishName": "",
    "category": "Antidot",
    "subcategory": "Antidot",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Antikoagülan etkisinin geri çevrilmesiyle ilişkili antidot kavramıdır.",
    "preAnswerSafeDefinition": "Antikoagülan etkisinin geri çevrilmesiyle ilişkili antidot kavramıdır.",
    "shortDefinition": "Heparini iyonik bağlanma ile nötralize eden antidottur.",
    "definition": "Heparini iyonik bağlanma ile nötralize eden antidottur.",
    "detailedExplanation": "Protamin sülfat özellikle unfractionated heparin etkisini hızlı geri çevirmek için kullanılır; düşük molekül ağırlıklı heparinde etkisi daha sınırlıdır. Aşırı dozunda hipotansiyon veya anafilaktoid reaksiyon görülebilir.",
    "postAnswerExplanation": "Protamin sülfat özellikle unfractionated heparin etkisini hızlı geri çevirmek için kullanılır; düşük molekül ağırlıklı heparinde etkisi daha sınırlıdır. Aşırı dozunda hipotansiyon veya anafilaktoid reaksiyon görülebilir.",
    "postAnswerExpandedExplanation": "Protamin sülfat özellikle unfractionated heparin etkisini hızlı geri çevirmek için kullanılır; düşük molekül ağırlıklı heparinde etkisi daha sınırlıdır. Aşırı dozunda hipotansiyon veya anafilaktoid reaksiyon görülebilir.",
    "tusPearl": "Heparin kanamasında antidot protamin sülfattır; warfarinde vitamin K/PCC düşünülür.",
    "examPearl": "Heparin kanamasında antidot protamin sülfattır; warfarinde vitamin K/PCC düşünülür.",
    "differentialPoint": "Protamin heparini; vitamin K warfarini; idarucizumab dabigatranı geri çevirir.",
    "clinicalRelevance": "Protamin sülfat özellikle unfractionated heparin etkisini hızlı geri çevirmek için kullanılır; düşük molekül ağırlıklı heparinde etkisi daha sınırlıdır. Aşırı dozunda hipotansiyon veya anafilaktoid reaksiyon görülebilir.",
    "safeNestedTerms": [
      "Heparin",
      "Antikoagülan",
      "Kanama",
      "Vitamin K",
      "PCC"
    ],
    "relatedTerms": [
      "Heparin",
      "Antikoagülan",
      "Kanama",
      "Vitamin K",
      "PCC"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryExpandedIndex.js",
      "src/data/tusGlossaryV330UltraDeepBatch5And6Index.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 75,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "e düşük doz oral K vitamini verilmesi ve ayaktan izlem , İntravenöz K vitamini ve dört faktörlü protrombin kompleks konsantresi verilmesi , Protamin sülfat verilmesi , Asetilsalisilik asit eklenmesi , question : Bu hastada warfarin etkisini acilen geri çevirme"
      },
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "oji , topic : Heparin antidotu , mainQuestion : Heparin etkisini geri çevirmek için hangi ajan kullanılır? , mainAnswer : Protamin sülfat. , explanation : Pozitif yüklü protamin negatif yüklü heparini bağlar. , keywords : heparin; protamin; aPTT; antidot , tra"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-endoskopi",
    "term": "Endoskopi",
    "aliases": [
      "Endoskopi",
      "üst GIS endoskopisi"
    ],
    "normalizedTerm": "endoskopi",
    "TurkishName": "Endoskopi",
    "EnglishName": "",
    "category": "Girişim / tanı",
    "subcategory": "Girişim",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Gastrointestinal sistem gibi lümenli yapılarda tanı ve tedavi amacıyla kullanılan görüntüleme-girişim yöntemidir.",
    "preAnswerSafeDefinition": "Gastrointestinal sistem gibi lümenli yapılarda tanı ve tedavi amacıyla kullanılan görüntüleme-girişim yöntemidir.",
    "shortDefinition": "Lümenli organların kamera ile doğrudan görüntülenmesini ve gerektiğinde biyopsi/tedavi yapılmasını sağlayan girişimdir.",
    "definition": "Lümenli organların kamera ile doğrudan görüntülenmesini ve gerektiğinde biyopsi/tedavi yapılmasını sağlayan girişimdir.",
    "detailedExplanation": "Üst gastrointestinal kanamada endoskopi hem kanama odağını gösterir hem de hemostaz sağlayabilir. Disfaji, kanama, ülser, varis ve malignite şüphesinde klinik stabilite ve aciliyet belirleyicidir.",
    "postAnswerExplanation": "Üst gastrointestinal kanamada endoskopi hem kanama odağını gösterir hem de hemostaz sağlayabilir. Disfaji, kanama, ülser, varis ve malignite şüphesinde klinik stabilite ve aciliyet belirleyicidir.",
    "postAnswerExpandedExplanation": "Üst gastrointestinal kanamada endoskopi hem kanama odağını gösterir hem de hemostaz sağlayabilir. Disfaji, kanama, ülser, varis ve malignite şüphesinde klinik stabilite ve aciliyet belirleyicidir.",
    "tusPearl": "Üst GIS kanamada resüsitasyon sonrası erken endoskopi tanı ve tedaviyi birlikte sağlar.",
    "examPearl": "Üst GIS kanamada resüsitasyon sonrası erken endoskopi tanı ve tedaviyi birlikte sağlar.",
    "differentialPoint": "BT anatomik yayılımı; endoskopi mukozayı ve aktif kanama odağını doğrudan değerlendirir.",
    "clinicalRelevance": "Üst gastrointestinal kanamada endoskopi hem kanama odağını gösterir hem de hemostaz sağlayabilir. Disfaji, kanama, ülser, varis ve malignite şüphesinde klinik stabilite ve aciliyet belirleyicidir.",
    "safeNestedTerms": [
      "Üst gastrointestinal kanama",
      "Biyopsi",
      "Varis kanaması",
      "Peptik ülser",
      "Hemostaz"
    ],
    "relatedTerms": [
      "Üst gastrointestinal kanama",
      "Biyopsi",
      "Varis kanaması",
      "Peptik ülser",
      "Hemostaz"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryCaseDerivedIndex.js",
      "src/data/tusGlossaryClinicalBranchDeepIndex.js",
      "src/data/tusGlossaryV304ExtraIndex.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 74,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "n uygun kaynak kontrol yaklaşımı aşağıdakilerden hangisidir? , questionType : treatment , answerTarget : treatment , diagnosis : correct : Endoskopik retrograd kolanjiyopankreatografi ile safra yolu drenajı , options : Elektif kolesistektomi için poliklinik ta"
      },
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "n : Altmış yaşında yeni başlayan dispepside ilk değerlendirme için hangi yaklaşım daha uygundur? , mainAnswer : Üst gastrointestinal endoskopi. , explanation : İleri yaşta yeni başlayan dispepsi alarm bulgusu kabul edilir ve endoskopi ile değerlendirilir. , ke"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-levotiroksin",
    "term": "Levotiroksin",
    "aliases": [
      "Levotiroksin",
      "T4"
    ],
    "normalizedTerm": "levotiroksin",
    "TurkishName": "Levotiroksin",
    "EnglishName": "",
    "category": "Tiroid hormon tedavisi",
    "subcategory": "Tiroid hormon tedavisi",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Tiroid hormon eksikliğinde replasman amacıyla kullanılan tedavidir.",
    "preAnswerSafeDefinition": "Tiroid hormon eksikliğinde replasman amacıyla kullanılan tedavidir.",
    "shortDefinition": "Sentetik T4 preparatıdır; hipotiroidi tedavisinde tiroid hormon replasmanı sağlar.",
    "definition": "Sentetik T4 preparatıdır; hipotiroidi tedavisinde tiroid hormon replasmanı sağlar.",
    "detailedExplanation": "Levotiroksin primer hipotiroidide TSH hedeflenerek titree edilir. Yaşlı veya koroner hastalık riski olanlarda düşük doz başlanır; demir, kalsiyum ve bazı gıdalar emilimi azaltabilir.",
    "postAnswerExplanation": "Levotiroksin primer hipotiroidide TSH hedeflenerek titree edilir. Yaşlı veya koroner hastalık riski olanlarda düşük doz başlanır; demir, kalsiyum ve bazı gıdalar emilimi azaltabilir.",
    "postAnswerExpandedExplanation": "Levotiroksin primer hipotiroidide TSH hedeflenerek titree edilir. Yaşlı veya koroner hastalık riski olanlarda düşük doz başlanır; demir, kalsiyum ve bazı gıdalar emilimi azaltabilir.",
    "tusPearl": "Hipotiroidi tedavisi levotiroksindir; yaşlı/koroner hastada düşük dozla başla.",
    "examPearl": "Hipotiroidi tedavisi levotiroksindir; yaşlı/koroner hastada düşük dozla başla.",
    "differentialPoint": "Metimazol/PTU hipertiroidide hormon sentezini azaltır; levotiroksin hormon replasmanıdır.",
    "clinicalRelevance": "Levotiroksin primer hipotiroidide TSH hedeflenerek titree edilir. Yaşlı veya koroner hastalık riski olanlarda düşük doz başlanır; demir, kalsiyum ve bazı gıdalar emilimi azaltabilir.",
    "safeNestedTerms": [
      "Hipotiroidi",
      "TSH",
      "Serbest T4",
      "Hashimoto tiroiditi",
      "Koroner arter hastalığı"
    ],
    "relatedTerms": [
      "Hipotiroidi",
      "TSH",
      "Serbest T4",
      "Hashimoto tiroiditi",
      "Koroner arter hastalığı"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryCaseDerivedIndex.js",
      "src/data/tusGlossaryV321DeepHighYieldBatch4Index.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 66,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "onik sıvı replasmanı , options : Sadece oral tuz tabletleri ve ayaktan takip , Hipertonik salin infüzyonu ve sıvı kısıtlaması , Yüksek doz levotiroksin başlanması , Potasyum tutucu diüretik verilmesi , İntravenöz hidrokortizon ve izotonik sıvı replasmanı , que"
      },
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "makroglossi ve kabızlık hangi endokrin tabloyu düşündürür? , mainAnswer : Konjenital hipotiroidi. , explanation : Erken tanı ve levotiroksin nörogelişim için kritiktir. , keywords : uzamış sarılık; makroglossi; kabızlık; hipotoni , trap : Down sendromu hipoton"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-oksitosin",
    "term": "Oksitosin",
    "aliases": [
      "Oksitosin"
    ],
    "normalizedTerm": "oksitosin",
    "TurkishName": "Oksitosin",
    "EnglishName": "",
    "category": "Obstetrik ilaç",
    "subcategory": "Obstetrik ilaç",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Uterin kontraksiyon ve obstetrik yönetimle ilişkili ilaç/hormon kavramıdır.",
    "preAnswerSafeDefinition": "Uterin kontraksiyon ve obstetrik yönetimle ilişkili ilaç/hormon kavramıdır.",
    "shortDefinition": "Uterus kasılmasını artıran ve doğum indüksiyonu ile postpartum kanama yönetiminde kullanılan uterotonik hormondur.",
    "definition": "Uterus kasılmasını artıran ve doğum indüksiyonu ile postpartum kanama yönetiminde kullanılan uterotonik hormondur.",
    "detailedExplanation": "Oksitosin doğum indüksiyonu, eylem augmentasyonu ve uterin atoniye bağlı postpartum kanamada kullanılır. Aşırı doz uterin hiperstimülasyon ve fetal distres oluşturabilir.",
    "postAnswerExplanation": "Oksitosin doğum indüksiyonu, eylem augmentasyonu ve uterin atoniye bağlı postpartum kanamada kullanılır. Aşırı doz uterin hiperstimülasyon ve fetal distres oluşturabilir.",
    "postAnswerExpandedExplanation": "Oksitosin doğum indüksiyonu, eylem augmentasyonu ve uterin atoniye bağlı postpartum kanamada kullanılır. Aşırı doz uterin hiperstimülasyon ve fetal distres oluşturabilir.",
    "tusPearl": "Postpartum kanamada uterin atoni varsa ilk uterotonik yaklaşım oksitosindir.",
    "examPearl": "Postpartum kanamada uterin atoni varsa ilk uterotonik yaklaşım oksitosindir.",
    "differentialPoint": "Magnezyum sülfat tokoliz değil preeklampsi/eclampsia nöbet profilaksisinde öne çıkar; oksitosin kontraksiyon artırır.",
    "clinicalRelevance": "Oksitosin doğum indüksiyonu, eylem augmentasyonu ve uterin atoniye bağlı postpartum kanamada kullanılır. Aşırı doz uterin hiperstimülasyon ve fetal distres oluşturabilir.",
    "safeNestedTerms": [
      "Postpartum kanama",
      "Uterin atoni",
      "Uterin hiperstimülasyon",
      "Fetal distres",
      "Doğum indüksiyonu"
    ],
    "relatedTerms": [
      "Postpartum kanama",
      "Uterin atoni",
      "Uterin hiperstimülasyon",
      "Fetal distres",
      "Doğum indüksiyonu"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryV319TeachableIndex.js",
      "src/data/tusGlossaryV330UltraDeepBatch5And6Index.js",
      "src/utils/clinicalScientificAccuracyGate.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 63,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "aşım aşağıdakilerden hangisidir? , questionType : treatment , answerTarget : first_step , diagnosis : correct : Uterin masaj ve intravenöz oksitosin uygulaması , options : Uterin masaj ve intravenöz oksitosin uygulaması , Acil histerektomi yapılması , Sadece e"
      },
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "eni uterin atonidir; ilk yaklaşım uterin masaj ve uterotonik tedavidir. , keywords : postpartum kanama; yumuşak uterus; uterin atoni; oksitosin , trap : Travma kaynaklı kanamada uterus sert/toparlanmış olabilir; yumuşak uterus atoni lehinedir. , extraQuestion "
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": [
      "uterotonik"
    ]
  },
  {
    "id": "v332-major-jargon-batch7-streptococcus-pneumoniae",
    "term": "Streptococcus pneumoniae",
    "aliases": [
      "Streptococcus pneumoniae",
      "pnömokok"
    ],
    "normalizedTerm": "streptococcus pneumoniae",
    "TurkishName": "Streptococcus pneumoniae",
    "EnglishName": "",
    "category": "Mikrobiyoloji etkeni",
    "subcategory": "Mikrobiyoloji etkeni",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Kapsül ve solunum yolu enfeksiyonlarıyla ilişkilendirilen bakteriyel etkendir.",
    "preAnswerSafeDefinition": "Kapsül ve solunum yolu enfeksiyonlarıyla ilişkilendirilen bakteriyel etkendir.",
    "shortDefinition": "Kapsüllü, alfa-hemolitik, lancet şekilli Gram pozitif diplokoktur; pnömoni, otitis media, sinüzit ve menenjit yapabilir.",
    "definition": "Kapsüllü, alfa-hemolitik, lancet şekilli Gram pozitif diplokoktur; pnömoni, otitis media, sinüzit ve menenjit yapabilir.",
    "detailedExplanation": "Pnömokok kapsülü virülansın temelidir; aspleni ve kompleman/opsonizasyon bozukluklarında risk artar. Lobar pnömoni, menenjit ve otitis media TUS’ta sık bağlanır.",
    "postAnswerExplanation": "Pnömokok kapsülü virülansın temelidir; aspleni ve kompleman/opsonizasyon bozukluklarında risk artar. Lobar pnömoni, menenjit ve otitis media TUS’ta sık bağlanır.",
    "postAnswerExpandedExplanation": "Pnömokok kapsülü virülansın temelidir; aspleni ve kompleman/opsonizasyon bozukluklarında risk artar. Lobar pnömoni, menenjit ve otitis media TUS’ta sık bağlanır.",
    "tusPearl": "Kapsüllü bakteri + pnömoni/menenjit/otitis = Streptococcus pneumoniae güçlü adaydır.",
    "examPearl": "Kapsüllü bakteri + pnömoni/menenjit/otitis = Streptococcus pneumoniae güçlü adaydır.",
    "differentialPoint": "H. influenzae küçük çocuklarda otitis/epiglottit; Neisseria meningitidis peteşi-meningokoksemi ile ayrılır.",
    "clinicalRelevance": "Pnömokok kapsülü virülansın temelidir; aspleni ve kompleman/opsonizasyon bozukluklarında risk artar. Lobar pnömoni, menenjit ve otitis media TUS’ta sık bağlanır.",
    "safeNestedTerms": [
      "Kapsüllü bakteri",
      "Pnömoni",
      "Menenjit",
      "Aspleni",
      "Opsonizasyon"
    ],
    "relatedTerms": [
      "Kapsüllü bakteri",
      "Pnömoni",
      "Menenjit",
      "Aspleni",
      "Opsonizasyon"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/aiTopicPools.js",
    "sourceFiles": [
      "src/data/aiTopicPools.js",
      "src/data/cases.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryExpandedIndex.js",
      "src/data/tusGlossaryContentCoverageIndex.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 60,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/aiTopicPools.js",
        "text": "'Anaerop enfeksiyonlar', 'Hepatit serolojileri', 'HIV fırsatçı enfeksiyonları', 'Tüberküloz tanı testleri', 'Meningokok profilaksisi', 'Streptococcus pneumoniae virülansı', 'Staphylococcus aureus toksinleri', 'Clostridioides difficile yaklaşımı', 'Paraziter en"
      },
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "şağıdakilerden hangisidir? , questionType : pathogen , answerTarget : pathogen , diagnosis : correct : Neisseria meningitidis , options : Streptococcus pneumoniae , Neisseria meningitidis , Haemophilus influenzae tip b , Listeria monocytogenes , Staphylococcus"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-aktif-komur",
    "term": "Aktif kömür",
    "aliases": [
      "Aktif kömür",
      "activated charcoal"
    ],
    "normalizedTerm": "aktif komur",
    "TurkishName": "Aktif kömür",
    "EnglishName": "",
    "category": "Toksikoloji tedavisi",
    "subcategory": "Toksikoloji tedavisi",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Zehirlenme yönetiminde seçilmiş durumlarda kullanılan gastrointestinal dekontaminasyon yöntemidir.",
    "preAnswerSafeDefinition": "Zehirlenme yönetiminde seçilmiş durumlarda kullanılan gastrointestinal dekontaminasyon yöntemidir.",
    "shortDefinition": "Gastrointestinal sistemde bazı toksinleri adsorbe ederek sistemik emilimi azaltan dekontaminasyon ajanıdır.",
    "definition": "Gastrointestinal sistemde bazı toksinleri adsorbe ederek sistemik emilimi azaltan dekontaminasyon ajanıdır.",
    "detailedExplanation": "Aktif kömür en çok ilk saatlerde ve hava yolu güvenliği sağlanmış hastada değerlidir. Demir, lityum, alkol ve kostik maddelerde etkisi sınırlı/uygunsuzdur; aspirasyon riski önemlidir.",
    "postAnswerExplanation": "Aktif kömür en çok ilk saatlerde ve hava yolu güvenliği sağlanmış hastada değerlidir. Demir, lityum, alkol ve kostik maddelerde etkisi sınırlı/uygunsuzdur; aspirasyon riski önemlidir.",
    "postAnswerExpandedExplanation": "Aktif kömür en çok ilk saatlerde ve hava yolu güvenliği sağlanmış hastada değerlidir. Demir, lityum, alkol ve kostik maddelerde etkisi sınırlı/uygunsuzdur; aspirasyon riski önemlidir.",
    "tusPearl": "Aktif kömür her zehirlenmeye verilmez; madde, zaman ve hava yolu güvenliği sorgulanır.",
    "examPearl": "Aktif kömür her zehirlenmeye verilmez; madde, zaman ve hava yolu güvenliği sorgulanır.",
    "differentialPoint": "Gastrik lavaj nadir seçilmiş olgular içindir; aktif kömür adsorpsiyonla çalışır.",
    "clinicalRelevance": "Aktif kömür en çok ilk saatlerde ve hava yolu güvenliği sağlanmış hastada değerlidir. Demir, lityum, alkol ve kostik maddelerde etkisi sınırlı/uygunsuzdur; aspirasyon riski önemlidir.",
    "safeNestedTerms": [
      "Zehirlenme",
      "Aspirasyon riski",
      "Demir zehirlenmesi",
      "Lityum",
      "Dekontaminasyon"
    ],
    "relatedTerms": [
      "Zehirlenme",
      "Aspirasyon riski",
      "Demir zehirlenmesi",
      "Lityum",
      "Dekontaminasyon"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryCaseDerivedIndex.js",
      "src/data/tusGlossaryClinicalBranchDeepIndex.js",
      "src/data/tusGlossaryV319TeachableIndex.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 52,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "lmesi , options : İntravenöz sodyum bikarbonat verilmesi , Flumazenil verilmesi , Nalokson verilmesi , Beta bloker verilmesi , Sadece oral aktif kömür verilerek taburculuk , question : Bu hastada en uygun spesifik acil tedavi aşağıdakilerden hangisidir? , expl"
      },
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "yon depolarını yenileyerek toksik NAPQI metabolitini detoksifiye eder. , keywords : parasetamol; NAPQI; glutatyon; NAC , trap : Aktif kömür erken dönemde yararlı olabilir ama özgül antidot NAC’dir. , extraQuestion : Parasetamol toksisitesinde hepatotoksik meta"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-haemophilus-influenzae",
    "term": "Haemophilus influenzae",
    "aliases": [
      "Haemophilus influenzae",
      "H. influenzae"
    ],
    "normalizedTerm": "haemophilus influenzae",
    "TurkishName": "Haemophilus influenzae",
    "EnglishName": "",
    "category": "Mikrobiyoloji etkeni",
    "subcategory": "Mikrobiyoloji etkeni",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Solunum yolu ve invaziv pediatrik enfeksiyonlarla ilişkilendirilen bakteriyel etkendir.",
    "preAnswerSafeDefinition": "Solunum yolu ve invaziv pediatrik enfeksiyonlarla ilişkilendirilen bakteriyel etkendir.",
    "shortDefinition": "Gram negatif kokobasil; kapsüllü tip b suşları menenjit, epiglottit ve invaziv enfeksiyonlarla ilişkilidir.",
    "definition": "Gram negatif kokobasil; kapsüllü tip b suşları menenjit, epiglottit ve invaziv enfeksiyonlarla ilişkilidir.",
    "detailedExplanation": "H. influenzae tip b kapsülüne karşı aşılama invaziv hastalığı azaltır. Epiglottit, otitis media, sinüzit ve menenjit TUS’ta sık bağlanır; faktör X ve V gereksinimi klasik mikrobiyoloji bilgisidir.",
    "postAnswerExplanation": "H. influenzae tip b kapsülüne karşı aşılama invaziv hastalığı azaltır. Epiglottit, otitis media, sinüzit ve menenjit TUS’ta sık bağlanır; faktör X ve V gereksinimi klasik mikrobiyoloji bilgisidir.",
    "postAnswerExpandedExplanation": "H. influenzae tip b kapsülüne karşı aşılama invaziv hastalığı azaltır. Epiglottit, otitis media, sinüzit ve menenjit TUS’ta sık bağlanır; faktör X ve V gereksinimi klasik mikrobiyoloji bilgisidir.",
    "tusPearl": "Küçük çocukta epiglottit/menenjit + Hib aşı bilgisi = H. influenzae düşün.",
    "examPearl": "Küçük çocukta epiglottit/menenjit + Hib aşı bilgisi = H. influenzae düşün.",
    "differentialPoint": "Strep pneumoniae lancet diplokok; H. influenzae küçük Gram negatif kokobasil ve X/V faktör gereksinimiyle ayrılır.",
    "clinicalRelevance": "H. influenzae tip b kapsülüne karşı aşılama invaziv hastalığı azaltır. Epiglottit, otitis media, sinüzit ve menenjit TUS’ta sık bağlanır; faktör X ve V gereksinimi klasik mikrobiyoloji bilgisidir.",
    "safeNestedTerms": [
      "Epiglottit",
      "Hib aşısı",
      "Menenjit",
      "Faktör X ve V",
      "Gram negatif kokobasil"
    ],
    "relatedTerms": [
      "Epiglottit",
      "Hib aşısı",
      "Menenjit",
      "Faktör X ve V",
      "Gram negatif kokobasil"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryCaseDerivedIndex.js",
      "src/utils/pearlCardContent.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 51,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": ", answerTarget : pathogen , diagnosis : correct : Neisseria meningitidis , options : Streptococcus pneumoniae , Neisseria meningitidis , Haemophilus influenzae tip b , Listeria monocytogenes , Staphylococcus aureus , question : Bu klinik tabloya en olası neden"
      },
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "influenzae tip b , mainQuestion : Epiglottit ve kapsüllü gram negatif kokobasil denince hangi etken akla gelir? , mainAnswer : Haemophilus influenzae tip b. , explanation : Aşısız çocukta epiglottit ve menenjit klasik klinik bilgidir. , keywords : epiglottit; "
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-candida-albicans",
    "term": "Candida albicans",
    "aliases": [
      "Candida albicans",
      "Candida"
    ],
    "normalizedTerm": "candida albicans",
    "TurkishName": "Candida albicans",
    "EnglishName": "",
    "category": "Mikoloji etkeni",
    "subcategory": "Mikoloji etkeni",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Mukozal veya fırsatçı mantar enfeksiyonlarıyla ilişkili etkendir.",
    "preAnswerSafeDefinition": "Mukozal veya fırsatçı mantar enfeksiyonlarıyla ilişkili etkendir.",
    "shortDefinition": "Maya formu ve psödohif oluşturabilen fırsatçı mantardır; mukokutanöz kandidiyazis ve invaziv kandidemi yapabilir.",
    "definition": "Maya formu ve psödohif oluşturabilen fırsatçı mantardır; mukokutanöz kandidiyazis ve invaziv kandidemi yapabilir.",
    "detailedExplanation": "Candida albicans germ tüp testi pozitifliğiyle klasik olarak öğretilir. Diyabet, antibiyotik kullanımı, immünsüpresyon, kateter ve yoğun bakım invaziv enfeksiyon riskini artırır.",
    "postAnswerExplanation": "Candida albicans germ tüp testi pozitifliğiyle klasik olarak öğretilir. Diyabet, antibiyotik kullanımı, immünsüpresyon, kateter ve yoğun bakım invaziv enfeksiyon riskini artırır.",
    "postAnswerExpandedExplanation": "Candida albicans germ tüp testi pozitifliğiyle klasik olarak öğretilir. Diyabet, antibiyotik kullanımı, immünsüpresyon, kateter ve yoğun bakım invaziv enfeksiyon riskini artırır.",
    "tusPearl": "Pamukçuk/vajinit + immünsüpresyon veya antibiyotik öyküsü = Candida albicans düşün.",
    "examPearl": "Pamukçuk/vajinit + immünsüpresyon veya antibiyotik öyküsü = Candida albicans düşün.",
    "differentialPoint": "Aspergillus septalı hif ve invaziv pulmoner hastalık; Candida maya/psödohif ve kateter ilişkili kandidemi ile ayrılır.",
    "clinicalRelevance": "Candida albicans germ tüp testi pozitifliğiyle klasik olarak öğretilir. Diyabet, antibiyotik kullanımı, immünsüpresyon, kateter ve yoğun bakım invaziv enfeksiyon riskini artırır.",
    "safeNestedTerms": [
      "Germ tüp testi",
      "Psödohif",
      "Kandidemi",
      "Diyabet",
      "Fırsatçı enfeksiyon"
    ],
    "relatedTerms": [
      "Germ tüp testi",
      "Psödohif",
      "Kandidemi",
      "Diyabet",
      "Fırsatçı enfeksiyon"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryV319TeachableIndex.js",
      "src/data/tusGlossaryV330UltraDeepBatch5And6Index.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 50,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "correct : Staphylococcus aureus , options : Staphylococcus aureus , Streptococcus viridans , Enterococcus faecalis , Coxiella burnetii , Candida albicans , question : Bu hastada en olası etken mikroorganizma aşağıdakilerden hangisidir? , explanation : Damar iç"
      },
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "pic : Candida germ tüp testi , mainQuestion : Germ tüp testi pozitifliği en çok hangi Candida türünü destekler? , mainAnswer : Candida albicans. , explanation : Candida albicans serumda germ tüp oluşturabilir ve mukokutanöz enfeksiyonlarda sık görülür. , keywo"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-peptik-ulser-hastaligi",
    "term": "Peptik ülser hastalığı",
    "aliases": [
      "Peptik ülser hastalığı",
      "peptik ülser"
    ],
    "normalizedTerm": "peptik ulser hastaligi",
    "TurkishName": "Peptik ülser hastalığı",
    "EnglishName": "",
    "category": "Gastroenteroloji",
    "subcategory": "Gastroenteroloji",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Epigastrik ağrı, kanama veya perforasyonla ilişkili üst gastrointestinal hastalıktır.",
    "preAnswerSafeDefinition": "Epigastrik ağrı, kanama veya perforasyonla ilişkili üst gastrointestinal hastalıktır.",
    "shortDefinition": "Mide veya duodenum mukozasında asit-pepsin hasarıyla gelişen ülseratif hastalıktır.",
    "definition": "Mide veya duodenum mukozasında asit-pepsin hasarıyla gelişen ülseratif hastalıktır.",
    "detailedExplanation": "Peptik ülserin en sık nedenleri H. pylori ve NSAİİ kullanımıdır. Komplikasyonlar üst GIS kanama, perforasyon ve gastrik çıkış obstrüksiyonudur; tedavide PPI ve H. pylori eradikasyonu önemlidir.",
    "postAnswerExplanation": "Peptik ülserin en sık nedenleri H. pylori ve NSAİİ kullanımıdır. Komplikasyonlar üst GIS kanama, perforasyon ve gastrik çıkış obstrüksiyonudur; tedavide PPI ve H. pylori eradikasyonu önemlidir.",
    "postAnswerExpandedExplanation": "Peptik ülserin en sık nedenleri H. pylori ve NSAİİ kullanımıdır. Komplikasyonlar üst GIS kanama, perforasyon ve gastrik çıkış obstrüksiyonudur; tedavide PPI ve H. pylori eradikasyonu önemlidir.",
    "tusPearl": "Peptik ülserde alarm bulgusu/kanama/perforasyon varsa yaklaşım acilleşir; H. pylori ve NSAİİ mutlaka sorgulanır.",
    "examPearl": "Peptik ülserde alarm bulgusu/kanama/perforasyon varsa yaklaşım acilleşir; H. pylori ve NSAİİ mutlaka sorgulanır.",
    "differentialPoint": "Gastritte yaygın mukozal inflamasyon; peptik ülserde daha derin mukozal defekt vardır.",
    "clinicalRelevance": "Peptik ülserin en sık nedenleri H. pylori ve NSAİİ kullanımıdır. Komplikasyonlar üst GIS kanama, perforasyon ve gastrik çıkış obstrüksiyonudur; tedavide PPI ve H. pylori eradikasyonu önemlidir.",
    "safeNestedTerms": [
      "H. pylori",
      "NSAİİ",
      "Proton pompa inhibitörü",
      "Üst gastrointestinal kanama",
      "Perfore peptik ülser"
    ],
    "relatedTerms": [
      "H. pylori",
      "NSAİİ",
      "Proton pompa inhibitörü",
      "Üst gastrointestinal kanama",
      "Perfore peptik ülser"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/aiTopicPools.js",
    "sourceFiles": [
      "src/data/aiTopicPools.js",
      "src/data/cases.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryDefinitionQualityIndex.js",
      "src/data/tusGlossaryV320QualityBatch3Index.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 49,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/aiTopicPools.js",
        "text": "'Akut apandisit', 'Akut kolesistit', 'Kolanjit Charcot triadı', 'Pankreatit komplikasyonları', 'İnce bağırsak obstrüksiyonu', 'Perfore peptik ülser', 'Travma primer değerlendirme', 'Hemotoraks ve pnömotoraks', 'Kompartman sendromu', 'Yanık sıvı resüsitasyonu',"
      },
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "s , answerTarget : diagnosis , diagnosis : correct : Akut kolesistit , options : Akut kolesistit , Akut viral hepatit , Akut pankreatit , Peptik ülser perforasyonu , Akut apandisit , question : Bu hastada en olası tanı aşağıdakilerden hangisidir? , explanation"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-tiroid-nodulu",
    "term": "Tiroid nodülü",
    "aliases": [
      "Tiroid nodülü",
      "tiroid nodulu"
    ],
    "normalizedTerm": "tiroid nodulu",
    "TurkishName": "Tiroid nodülü",
    "EnglishName": "",
    "category": "Endokrin / patoloji",
    "subcategory": "Endokrin",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Tiroid bezinde malignite riski, hormon durumu ve ultrason bulgularıyla değerlendirilen fokal oluşumdur.",
    "preAnswerSafeDefinition": "Tiroid bezinde malignite riski, hormon durumu ve ultrason bulgularıyla değerlendirilen fokal oluşumdur.",
    "shortDefinition": "Tiroid bezinde palpasyon veya görüntüleme ile saptanan fokal lezyondur.",
    "definition": "Tiroid bezinde palpasyon veya görüntüleme ile saptanan fokal lezyondur.",
    "detailedExplanation": "Tiroid nodülünde ilk değerlendirme TSH ve ultrason risk özellikleridir. TSH düşükse sintigrafiyle sıcak nodül araştırılır; şüpheli USG bulguları veya uygun boyutta nodül varsa ince iğne aspirasyon biyopsisi yapılır.",
    "postAnswerExplanation": "Tiroid nodülünde ilk değerlendirme TSH ve ultrason risk özellikleridir. TSH düşükse sintigrafiyle sıcak nodül araştırılır; şüpheli USG bulguları veya uygun boyutta nodül varsa ince iğne aspirasyon biyopsisi yapılır.",
    "postAnswerExpandedExplanation": "Tiroid nodülünde ilk değerlendirme TSH ve ultrason risk özellikleridir. TSH düşükse sintigrafiyle sıcak nodül araştırılır; şüpheli USG bulguları veya uygun boyutta nodül varsa ince iğne aspirasyon biyopsisi yapılır.",
    "tusPearl": "Tiroid nodülü + düşük TSH = önce sintigrafi; şüpheli soğuk/USG bulgusu = İİAB.",
    "examPearl": "Tiroid nodülü + düşük TSH = önce sintigrafi; şüpheli soğuk/USG bulgusu = İİAB.",
    "differentialPoint": "Sıcak nodüller çoğunlukla benign; hipoekoik, mikrokalsifikasyonlu, düzensiz sınırlı nodüller malignite açısından risklidir.",
    "clinicalRelevance": "Tiroid nodülünde ilk değerlendirme TSH ve ultrason risk özellikleridir. TSH düşükse sintigrafiyle sıcak nodül araştırılır; şüpheli USG bulguları veya uygun boyutta nodül varsa ince iğne aspirasyon biyopsisi yapılır.",
    "safeNestedTerms": [
      "TSH",
      "İnce iğne aspirasyon biyopsisi",
      "Tiroid ultrasonografisi",
      "Sintigrafi",
      "Medüller tiroid karsinomu"
    ],
    "relatedTerms": [
      "TSH",
      "İnce iğne aspirasyon biyopsisi",
      "Tiroid ultrasonografisi",
      "Sintigrafi",
      "Medüller tiroid karsinomu"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryV304ExtraIndex.js",
      "src/data/tusGlossaryV319TeachableIndex.js",
      "src/data/tusGlossaryV330UltraDeepBatch5And6Index.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 47,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "roid-nodulu , branchId : medical-pathology , caseType : standard , relatedBranch : Tıbbi Patoloji , title : Servikal lenf nodu ile saptanan tiroid nodülü , difficulty : Orta , clinicalFocus : Klinik ve morfolojik bulguları patolojik paternle ilişkilendirme. , "
      },
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "rculation basamağında. , difficulty : orta , branchId : general-surgery , subject : Genel Cerrahi , topic : Tiroid nodülü , mainQuestion : Tiroid nodülünde malignite riskini değerlendirmede temel ilk görüntüleme hangisidir? , mainAnswer : Tiroid ultrasonografi"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-hpv",
    "term": "HPV",
    "aliases": [
      "HPV",
      "human papillomavirus"
    ],
    "normalizedTerm": "hpv",
    "TurkishName": "HPV",
    "EnglishName": "",
    "category": "Viroloji",
    "subcategory": "Viroloji",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Epitelyal enfeksiyon ve servikal kanser taramasıyla ilişkili virüstür.",
    "preAnswerSafeDefinition": "Epitelyal enfeksiyon ve servikal kanser taramasıyla ilişkili virüstür.",
    "shortDefinition": "Çift sarmallı DNA virüsüdür; serviks kanseri, genital siğil ve anogenital/orofaringeal malignitelerle ilişkilidir.",
    "definition": "Çift sarmallı DNA virüsüdür; serviks kanseri, genital siğil ve anogenital/orofaringeal malignitelerle ilişkilidir.",
    "detailedExplanation": "Yüksek riskli HPV tipleri özellikle 16 ve 18, E6/E7 onkoproteinleri üzerinden p53 ve Rb yollarını bozar. HPV testi ve Pap smear serviks kanseri taramasında kullanılır; aşı koruyucudur.",
    "postAnswerExplanation": "Yüksek riskli HPV tipleri özellikle 16 ve 18, E6/E7 onkoproteinleri üzerinden p53 ve Rb yollarını bozar. HPV testi ve Pap smear serviks kanseri taramasında kullanılır; aşı koruyucudur.",
    "postAnswerExpandedExplanation": "Yüksek riskli HPV tipleri özellikle 16 ve 18, E6/E7 onkoproteinleri üzerinden p53 ve Rb yollarını bozar. HPV testi ve Pap smear serviks kanseri taramasında kullanılır; aşı koruyucudur.",
    "tusPearl": "HPV 16/18 yüksek risk; E6 p53, E7 Rb baskılanmasıyla servikal karsinogenez yapar.",
    "examPearl": "HPV 16/18 yüksek risk; E6 p53, E7 Rb baskılanmasıyla servikal karsinogenez yapar.",
    "differentialPoint": "Düşük riskli HPV 6/11 kondilomla; yüksek riskli 16/18 maligniteyle ilişkilidir.",
    "clinicalRelevance": "Yüksek riskli HPV tipleri özellikle 16 ve 18, E6/E7 onkoproteinleri üzerinden p53 ve Rb yollarını bozar. HPV testi ve Pap smear serviks kanseri taramasında kullanılır; aşı koruyucudur.",
    "safeNestedTerms": [
      "Serviks kanseri",
      "Pap smear",
      "E6/E7",
      "Kondilom",
      "HPV aşısı"
    ],
    "relatedTerms": [
      "Serviks kanseri",
      "Pap smear",
      "E6/E7",
      "Kondilom",
      "HPV aşısı"
    ],
    "matchingPriority": 78,
    "standaloneSafe": true,
    "caseSensitiveDisplay": true,
    "answerLeakRisk": "low",
    "ambiguityRisk": "medium",
    "priority": "P1",
    "recommendation": "addNewEntryWithAliasGuard",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryV330UltraDeepBatch5And6Index.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 46,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "dometrioid biyopsi bulgusuyla en uyumlu tanıdır. , Servikal skuamöz hücreli karsinom : Servikal skuamöz hücreli karsinom servikal lezyon ve HPV ilişkisiyle düşünülür; bu olguda endometrial kalınlaşma ve endometrioid biyopsi vardır. , Over disgerminomu : Over d"
      },
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "ct : Kadın Hastalıkları ve Doğum , topic : Serviks kanseri taraması , mainQuestion : Serviks kanseri taramasında yüksek riskli HPV testinin önemi nedir? , mainAnswer : Onkojenik HPV enfeksiyonunu saptaması. , explanation : Persistan yüksek riskli HPV enfeksiyo"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-klopidogrel",
    "term": "Klopidogrel",
    "aliases": [
      "Klopidogrel",
      "clopidogrel"
    ],
    "normalizedTerm": "klopidogrel",
    "TurkishName": "Klopidogrel",
    "EnglishName": "",
    "category": "Antiagregan",
    "subcategory": "Antiagregan",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Trombosit fonksiyonu ve koroner/stent yönetimiyle ilişkili antiagregan tedavidir.",
    "preAnswerSafeDefinition": "Trombosit fonksiyonu ve koroner/stent yönetimiyle ilişkili antiagregan tedavidir.",
    "shortDefinition": "P2Y12 ADP reseptörünü inhibe ederek trombosit aktivasyonunu azaltan antiagregan ilaçtır.",
    "definition": "P2Y12 ADP reseptörünü inhibe ederek trombosit aktivasyonunu azaltan antiagregan ilaçtır.",
    "detailedExplanation": "Klopidogrel aspirinle birlikte çift antiagregan tedavide kullanılır. Prodrug olduğu için CYP2C19 aktivasyonu önemlidir; kanama riski ve cerrahi öncesi kesilme zamanı klinik kararı etkiler.",
    "postAnswerExplanation": "Klopidogrel aspirinle birlikte çift antiagregan tedavide kullanılır. Prodrug olduğu için CYP2C19 aktivasyonu önemlidir; kanama riski ve cerrahi öncesi kesilme zamanı klinik kararı etkiler.",
    "postAnswerExpandedExplanation": "Klopidogrel aspirinle birlikte çift antiagregan tedavide kullanılır. Prodrug olduğu için CYP2C19 aktivasyonu önemlidir; kanama riski ve cerrahi öncesi kesilme zamanı klinik kararı etkiler.",
    "tusPearl": "Stent sonrası DAPT = aspirin + P2Y12 inhibitörü; klopidogrel P2Y12 üzerinden etki eder.",
    "examPearl": "Stent sonrası DAPT = aspirin + P2Y12 inhibitörü; klopidogrel P2Y12 üzerinden etki eder.",
    "differentialPoint": "Aspirin COX-1/TXA2 yolunu; klopidogrel ADP-P2Y12 yolunu inhibe eder.",
    "clinicalRelevance": "Klopidogrel aspirinle birlikte çift antiagregan tedavide kullanılır. Prodrug olduğu için CYP2C19 aktivasyonu önemlidir; kanama riski ve cerrahi öncesi kesilme zamanı klinik kararı etkiler.",
    "safeNestedTerms": [
      "P2Y12",
      "Antiagregan",
      "Stent trombozu",
      "Aspirin",
      "CYP2C19"
    ],
    "relatedTerms": [
      "P2Y12",
      "Antiagregan",
      "Stent trombozu",
      "Aspirin",
      "CYP2C19"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryV319TeachableIndex.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 44,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "questionType : treatment , answerTarget : treatment , diagnosis : correct : Nitrogliserin , options : Nitrogliserin , Aspirin , Heparin , Klopidogrel , Atropin , question : Bu hastada başlangıç yönetiminde kaçınılması gereken ilaç aşağıdakilerden hangisidir? ,"
      },
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "z; etki trombosit ömrü boyunca sürer. , keywords : aspirin , COX , TXA2 , trombosit , trap : Klopidogrel P2Y12 ADP reseptörünü inhibe eder. , extraQuestion : Vaka kökünde aspirin, COX ve TXA2 birlikte verilirse hangi mekanizma, enzim veya molekül öncelikle düş"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-legionella-pneumophila",
    "term": "Legionella pneumophila",
    "aliases": [
      "Legionella pneumophila",
      "Legionella"
    ],
    "normalizedTerm": "legionella pneumophila",
    "TurkishName": "Legionella pneumophila",
    "EnglishName": "",
    "category": "Mikrobiyoloji etkeni",
    "subcategory": "Mikrobiyoloji etkeni",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Atipik pnömoni ve su kaynaklı salgınlarla ilişkilendirilen enfeksiyon etkenidir.",
    "preAnswerSafeDefinition": "Atipik pnömoni ve su kaynaklı salgınlarla ilişkilendirilen enfeksiyon etkenidir.",
    "shortDefinition": "Su kaynaklı bulaşabilen, atipik pnömoni ve gastrointestinal/nörolojik bulgularla ilişkilendirilen Gram negatif bakteridir.",
    "definition": "Su kaynaklı bulaşabilen, atipik pnömoni ve gastrointestinal/nörolojik bulgularla ilişkilendirilen Gram negatif bakteridir.",
    "detailedExplanation": "Legionella makrofaj içinde çoğalır; ağır pnömoni, hiponatremi, ishal ve konfüzyon ipucu olabilir. Tanıda idrar antijen testi kullanılır; makrolid veya florokinolon tedavisi düşünülür.",
    "postAnswerExplanation": "Legionella makrofaj içinde çoğalır; ağır pnömoni, hiponatremi, ishal ve konfüzyon ipucu olabilir. Tanıda idrar antijen testi kullanılır; makrolid veya florokinolon tedavisi düşünülür.",
    "postAnswerExpandedExplanation": "Legionella makrofaj içinde çoğalır; ağır pnömoni, hiponatremi, ishal ve konfüzyon ipucu olabilir. Tanıda idrar antijen testi kullanılır; makrolid veya florokinolon tedavisi düşünülür.",
    "tusPearl": "Pnömoni + hiponatremi + ishal/konfüzyon + otel/klima-su maruziyeti = Legionella.",
    "examPearl": "Pnömoni + hiponatremi + ishal/konfüzyon + otel/klima-su maruziyeti = Legionella.",
    "differentialPoint": "Mycoplasma daha genç hastada hafif atipik pnömoni; Legionella daha ağır sistemik tablo ve hiponatremiyle ayrılır.",
    "clinicalRelevance": "Legionella makrofaj içinde çoğalır; ağır pnömoni, hiponatremi, ishal ve konfüzyon ipucu olabilir. Tanıda idrar antijen testi kullanılır; makrolid veya florokinolon tedavisi düşünülür.",
    "safeNestedTerms": [
      "Atipik pnömoni",
      "Hiponatremi",
      "İdrar antijen testi",
      "Makrolid",
      "Florokinolon"
    ],
    "relatedTerms": [
      "Atipik pnömoni",
      "Hiponatremi",
      "İdrar antijen testi",
      "Makrolid",
      "Florokinolon"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusPearlCards.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 39,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "en olası neden olan mikroorganizma aşağıdakilerden hangisidir? , questionType : pathogen , answerTarget : pathogen , diagnosis : correct : Legionella pneumophila , options : Streptococcus pneumoniae , Legionella pneumophila , Mycoplasma pneumoniae , Chlamydia "
      },
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "mainQuestion : Pnömoniyle birlikte hiponatremi, karaciğer enzim yüksekliği ve klima öyküsü hangi etkeni düşündürür? , mainAnswer : Legionella pneumophila. , explanation : Atipik pnömoni, gastrointestinal bulgu, hiponatremi ve su sistemi/klima maruziyeti birlik"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-toxoplasma-gondii",
    "term": "Toxoplasma gondii",
    "aliases": [
      "Toxoplasma gondii",
      "Toxoplasma"
    ],
    "normalizedTerm": "toxoplasma gondii",
    "TurkishName": "Toxoplasma gondii",
    "EnglishName": "",
    "category": "Parazitoloji etkeni",
    "subcategory": "Parazitoloji etkeni",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Konjenital enfeksiyon, göz tutulumu ve immünsüpresyonda santral sinir sistemi lezyonlarıyla ilişkilidir.",
    "preAnswerSafeDefinition": "Konjenital enfeksiyon, göz tutulumu ve immünsüpresyonda santral sinir sistemi lezyonlarıyla ilişkilidir.",
    "shortDefinition": "Kedi dışkısı veya az pişmiş etle bulaşabilen, konjenital enfeksiyon ve immünsüpresyonda ensefalit yapabilen protozoondur.",
    "definition": "Kedi dışkısı veya az pişmiş etle bulaşabilen, konjenital enfeksiyon ve immünsüpresyonda ensefalit yapabilen protozoondur.",
    "detailedExplanation": "Konjenital toksoplazmada koryoretinit, hidrosefali ve diffüz intrakraniyal kalsifikasyon klasik üçlüdür. AIDS’te ring-enhancing beyin lezyonları ve ensefalit tablosu görülebilir.",
    "postAnswerExplanation": "Konjenital toksoplazmada koryoretinit, hidrosefali ve diffüz intrakraniyal kalsifikasyon klasik üçlüdür. AIDS’te ring-enhancing beyin lezyonları ve ensefalit tablosu görülebilir.",
    "postAnswerExpandedExplanation": "Konjenital toksoplazmada koryoretinit, hidrosefali ve diffüz intrakraniyal kalsifikasyon klasik üçlüdür. AIDS’te ring-enhancing beyin lezyonları ve ensefalit tablosu görülebilir.",
    "tusPearl": "Konjenital toksoplazma = koryoretinit + hidrosefali + diffüz kalsifikasyon.",
    "examPearl": "Konjenital toksoplazma = koryoretinit + hidrosefali + diffüz kalsifikasyon.",
    "differentialPoint": "CMV konjenital enfeksiyonda periventriküler kalsifikasyon ve sensorinöral işitme kaybı daha tipiktir.",
    "clinicalRelevance": "Konjenital toksoplazmada koryoretinit, hidrosefali ve diffüz intrakraniyal kalsifikasyon klasik üçlüdür. AIDS’te ring-enhancing beyin lezyonları ve ensefalit tablosu görülebilir.",
    "safeNestedTerms": [
      "Koryoretinit",
      "Konjenital enfeksiyon",
      "Hidrosefali",
      "Ring-enhancing lezyon",
      "CMV"
    ],
    "relatedTerms": [
      "Koryoretinit",
      "Konjenital enfeksiyon",
      "Hidrosefali",
      "Ring-enhancing lezyon",
      "CMV"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusPearlCards.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 39,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "tabloya en olası neden olan etken aşağıdakilerden hangisidir? , questionType : pathogen , answerTarget : pathogen , diagnosis : correct : Toxoplasma gondii , options : Cytomegalovirus , Toxoplasma gondii , Rubella virus , Treponema pallidum , Listeria monocyto"
      },
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "iti , mainQuestion : AIDS hastasında halka şeklinde kontrastlanan beyin lezyonları hangi enfeksiyonu düşündürür? , mainAnswer : Toxoplasma gondii ensefaliti. , explanation : Toxoplasma latent enfeksiyonun reaktivasyonu ile çoklu beyin lezyonları yapabilir. , k"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-neisseria-meningitidis",
    "term": "Neisseria meningitidis",
    "aliases": [
      "Neisseria meningitidis",
      "meningokok"
    ],
    "normalizedTerm": "neisseria meningitidis",
    "TurkishName": "Neisseria meningitidis",
    "EnglishName": "",
    "category": "Mikrobiyoloji etkeni",
    "subcategory": "Mikrobiyoloji etkeni",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Menenjit ve invaziv sepsis tablolarıyla ilişkilendirilen kapsüllü bakteridir.",
    "preAnswerSafeDefinition": "Menenjit ve invaziv sepsis tablolarıyla ilişkilendirilen kapsüllü bakteridir.",
    "shortDefinition": "Kapsüllü Gram negatif diplokoktur; menenjit, meningokoksemi ve peteşiyal döküntü ile ilişkilidir.",
    "definition": "Kapsüllü Gram negatif diplokoktur; menenjit, meningokoksemi ve peteşiyal döküntü ile ilişkilidir.",
    "detailedExplanation": "Meningokok nazofarenkste taşınabilir ve damlacıkla bulaşır. Peteşi/purpura, hızlı sepsis, adrenal hemoraji ve yakın temas profilaksisi TUS’ta önemlidir.",
    "postAnswerExplanation": "Meningokok nazofarenkste taşınabilir ve damlacıkla bulaşır. Peteşi/purpura, hızlı sepsis, adrenal hemoraji ve yakın temas profilaksisi TUS’ta önemlidir.",
    "postAnswerExpandedExplanation": "Meningokok nazofarenkste taşınabilir ve damlacıkla bulaşır. Peteşi/purpura, hızlı sepsis, adrenal hemoraji ve yakın temas profilaksisi TUS’ta önemlidir.",
    "tusPearl": "Menenjit + peteşi/purpura + hızlı şok = meningokoksemi düşün.",
    "examPearl": "Menenjit + peteşi/purpura + hızlı şok = meningokoksemi düşün.",
    "differentialPoint": "S. pneumoniae de menenjit yapar; peteşiyal döküntü ve yakın temas profilaksisi Neisseria meningitidis lehinedir.",
    "clinicalRelevance": "Meningokok nazofarenkste taşınabilir ve damlacıkla bulaşır. Peteşi/purpura, hızlı sepsis, adrenal hemoraji ve yakın temas profilaksisi TUS’ta önemlidir.",
    "safeNestedTerms": [
      "Menenjit",
      "Peteşi",
      "Meningokoksemi",
      "Kapsüllü bakteri",
      "Kemoprofilaksi"
    ],
    "relatedTerms": [
      "Menenjit",
      "Peteşi",
      "Meningokoksemi",
      "Kapsüllü bakteri",
      "Kemoprofilaksi"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryExpandedIndex.js",
      "src/utils/glossary.js",
      "src/utils/pearlCardContent.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 38,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "en olası neden olan mikroorganizma aşağıdakilerden hangisidir? , questionType : pathogen , answerTarget : pathogen , diagnosis : correct : Neisseria meningitidis , options : Streptococcus pneumoniae , Neisseria meningitidis , Haemophilus influenzae tip b , Lis"
      },
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "tör V ve X. , difficulty : orta , branchId : medical-microbiology , subject : Tıbbi Mikrobiyoloji , topic : Neisseria meningitidis , mainQuestion : Peteşiyal döküntü ve meningokoksemi hangi bakteriyi düşündürür? , mainAnswer : Neisseria meningitidis. , explana"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-hcv",
    "term": "HCV",
    "aliases": [
      "HCV",
      "hepatit C virüsü"
    ],
    "normalizedTerm": "hcv",
    "TurkishName": "HCV",
    "EnglishName": "",
    "category": "Viroloji",
    "subcategory": "Viroloji",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Kronik karaciğer hastalığı ve hepatit serolojisiyle değerlendirilen virüstür.",
    "preAnswerSafeDefinition": "Kronik karaciğer hastalığı ve hepatit serolojisiyle değerlendirilen virüstür.",
    "shortDefinition": "Hepatit C virüsü; kronik hepatit, siroz ve hepatoselüler karsinom riskiyle ilişkili RNA virüsüdür.",
    "definition": "Hepatit C virüsü; kronik hepatit, siroz ve hepatoselüler karsinom riskiyle ilişkili RNA virüsüdür.",
    "detailedExplanation": "HCV çoğu hastada kronikleşebilir; anti-HCV tarama, HCV RNA aktif enfeksiyon değerlendirmesinde kullanılır. Kan yoluyla bulaş ve ekstrahepatik bulgular TUS’ta önemlidir.",
    "postAnswerExplanation": "HCV çoğu hastada kronikleşebilir; anti-HCV tarama, HCV RNA aktif enfeksiyon değerlendirmesinde kullanılır. Kan yoluyla bulaş ve ekstrahepatik bulgular TUS’ta önemlidir.",
    "postAnswerExpandedExplanation": "HCV çoğu hastada kronikleşebilir; anti-HCV tarama, HCV RNA aktif enfeksiyon değerlendirmesinde kullanılır. Kan yoluyla bulaş ve ekstrahepatik bulgular TUS’ta önemlidir.",
    "tusPearl": "Anti-HCV pozitifliği temas/tarama; HCV RNA aktif viremi için daha doğrudan göstergedir.",
    "examPearl": "Anti-HCV pozitifliği temas/tarama; HCV RNA aktif viremi için daha doğrudan göstergedir.",
    "differentialPoint": "HBV serolojisi HBsAg/anti-HBc/anti-HBs ile yorumlanır; HCV’de RNA aktif enfeksiyon açısından kritik olabilir.",
    "clinicalRelevance": "HCV çoğu hastada kronikleşebilir; anti-HCV tarama, HCV RNA aktif enfeksiyon değerlendirmesinde kullanılır. Kan yoluyla bulaş ve ekstrahepatik bulgular TUS’ta önemlidir.",
    "safeNestedTerms": [
      "HCV RNA",
      "Kronik hepatit",
      "Siroz",
      "Hepatoselüler karsinom",
      "Ekstrahepatik bulgu"
    ],
    "relatedTerms": [
      "HCV RNA",
      "Kronik hepatit",
      "Siroz",
      "Hepatoselüler karsinom",
      "Ekstrahepatik bulgu"
    ],
    "matchingPriority": 78,
    "standaloneSafe": true,
    "caseSensitiveDisplay": true,
    "answerLeakRisk": "low",
    "ambiguityRisk": "medium",
    "priority": "P1",
    "recommendation": "addNewEntryWithAliasGuard",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/tusQuestionArchive.js",
    "sourceFiles": [
      "src/data/tusQuestionArchive.js",
      "src/data/cases.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryCandidateAuditIndex.js",
      "src/data/tusGlossaryV319TeachableIndex.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 36,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/tusQuestionArchive.js",
        "text": "priority : essential , summary : Anti-HAV IgM pozitif; Anti-HAV IgG negatif; HBsAg negatif; Anti-HBc IgM negatif; Anti-HCV negatif. , findings : Anti-HAV IgM pozitif , HBV akut enfeksiyon göstergeleri negatif , HCV taraması negatif , question : Bu serolojik pa"
      },
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "priority : essential , summary : Anti-HAV IgM pozitif, Anti-HAV IgG negatif, HBsAg negatif, Anti-HBc IgM negatif, Anti-HCV negatif. , findings : HAV IgM saptanır , HBV akut belirteçleri negatif , HCV taraması negatif , question : Bu serolojik patern en güçlü o"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-over-kanseri",
    "term": "Over kanseri",
    "aliases": [
      "Over kanseri",
      "over karsinomu"
    ],
    "normalizedTerm": "over kanseri",
    "TurkishName": "Over kanseri",
    "EnglishName": "",
    "category": "Jinekolojik onkoloji",
    "subcategory": "Jinekolojik onkoloji",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Jinekolojik malignite ve adneksiyal kitle değerlendirmesiyle ilişkili hastalıktır.",
    "preAnswerSafeDefinition": "Jinekolojik malignite ve adneksiyal kitle değerlendirmesiyle ilişkili hastalıktır.",
    "shortDefinition": "Overden kaynaklanan, sıklıkla geç bulgu veren ve karın şişliği/asit gibi belirtilerle ortaya çıkabilen jinekolojik malignitedir.",
    "definition": "Overden kaynaklanan, sıklıkla geç bulgu veren ve karın şişliği/asit gibi belirtilerle ortaya çıkabilen jinekolojik malignitedir.",
    "detailedExplanation": "Epitelyal over kanseri en sık gruptur; CA-125 takipte kullanılabilir ama tek başına tarama testi değildir. BRCA mutasyonları, aile öyküsü ve postmenopozal adneksiyal kitle risk açısından önemlidir.",
    "postAnswerExplanation": "Epitelyal over kanseri en sık gruptur; CA-125 takipte kullanılabilir ama tek başına tarama testi değildir. BRCA mutasyonları, aile öyküsü ve postmenopozal adneksiyal kitle risk açısından önemlidir.",
    "postAnswerExpandedExplanation": "Epitelyal over kanseri en sık gruptur; CA-125 takipte kullanılabilir ama tek başına tarama testi değildir. BRCA mutasyonları, aile öyküsü ve postmenopozal adneksiyal kitle risk açısından önemlidir.",
    "tusPearl": "Postmenopozal adneksiyal kitle + asit/CA-125 yüksekliği = over malignitesi açısından uyarıcıdır.",
    "examPearl": "Postmenopozal adneksiyal kitle + asit/CA-125 yüksekliği = over malignitesi açısından uyarıcıdır.",
    "differentialPoint": "Fonksiyonel kistler premenopozal ve benign seyirli olabilir; kompleks solid kitle/asit malignite lehinedir.",
    "clinicalRelevance": "Epitelyal over kanseri en sık gruptur; CA-125 takipte kullanılabilir ama tek başına tarama testi değildir. BRCA mutasyonları, aile öyküsü ve postmenopozal adneksiyal kitle risk açısından önemlidir.",
    "safeNestedTerms": [
      "CA-125",
      "Adneksiyal kitle",
      "BRCA",
      "Asit",
      "Epitelyal over kanseri"
    ],
    "relatedTerms": [
      "CA-125",
      "Adneksiyal kitle",
      "BRCA",
      "Asit",
      "Epitelyal over kanseri"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusGlossarySupplementalIndex.js",
      "src/data/tusGlossaryClinicalBranchDeepIndex.js"
    ],
    "sourceArea": "Klinik Branş Seç / TUS Spot Olgular",
    "occurrenceCount": 35,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "S seçki sorusu , setting : Klinik Branş Seç / TUS Spot Olgular , chiefComplaint : Endometriozis zemininde gelişme olasılığı artan epitelyal over kanseri alt tipleri aşağıdakilerin hangisinde birlikte verilmiştir? , stem : Endometriozis zemininde gelişme olasıl"
      },
      {
        "sourceFilePath": "src/data/tusGlossarySupplementalIndex.js",
        "text": "tusPearl : CEA tarama testi değil, tedavi sonrası izlem ve nüks takibinde daha değerlidir. , differentialPoint : PSA prostat, CA-125 over kanseri bağlamında daha sık sorulur. , clinicalRelevance : CEA tarama testi değil, tedavi sonrası izlem ve nüks takibinde "
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-miyokardit",
    "term": "Miyokardit",
    "aliases": [
      "Miyokardit",
      "kalp kası iltihabı"
    ],
    "normalizedTerm": "miyokardit",
    "TurkishName": "Miyokardit",
    "EnglishName": "",
    "category": "Kardiyoloji",
    "subcategory": "Kardiyoloji",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Kalp kası inflamasyonu ve troponin/ritim bozukluğu ile ilişkili klinik tablodur.",
    "preAnswerSafeDefinition": "Kalp kası inflamasyonu ve troponin/ritim bozukluğu ile ilişkili klinik tablodur.",
    "shortDefinition": "Miyokardın inflamasyonudur; viral enfeksiyon sonrası göğüs ağrısı, aritmi veya kalp yetmezliğiyle seyredebilir.",
    "definition": "Miyokardın inflamasyonudur; viral enfeksiyon sonrası göğüs ağrısı, aritmi veya kalp yetmezliğiyle seyredebilir.",
    "detailedExplanation": "Miyokarditte troponin yükselebilir, EKG değişiklikleri ve ventriküler disfonksiyon görülebilir. Viral etkenler sık olup klinik spektrum asemptomatikten fulminan kalp yetmezliğine kadar uzanır.",
    "postAnswerExplanation": "Miyokarditte troponin yükselebilir, EKG değişiklikleri ve ventriküler disfonksiyon görülebilir. Viral etkenler sık olup klinik spektrum asemptomatikten fulminan kalp yetmezliğine kadar uzanır.",
    "postAnswerExpandedExplanation": "Miyokarditte troponin yükselebilir, EKG değişiklikleri ve ventriküler disfonksiyon görülebilir. Viral etkenler sık olup klinik spektrum asemptomatikten fulminan kalp yetmezliğine kadar uzanır.",
    "tusPearl": "Viral prodrom + göğüs ağrısı/troponin + global disfonksiyon = miyokardit düşün.",
    "examPearl": "Viral prodrom + göğüs ağrısı/troponin + global disfonksiyon = miyokardit düşün.",
    "differentialPoint": "Miyokard infarktüsünde koroner tıkanma/iskemi; miyokarditte inflamasyon ve sıklıkla viral öykü ön plandadır.",
    "clinicalRelevance": "Miyokarditte troponin yükselebilir, EKG değişiklikleri ve ventriküler disfonksiyon görülebilir. Viral etkenler sık olup klinik spektrum asemptomatikten fulminan kalp yetmezliğine kadar uzanır.",
    "safeNestedTerms": [
      "Troponin",
      "Kalp yetmezliği",
      "Aritmi",
      "Viral enfeksiyon",
      "Ekokardiyografi"
    ],
    "relatedTerms": [
      "Troponin",
      "Kalp yetmezliği",
      "Aritmi",
      "Viral enfeksiyon",
      "Ekokardiyografi"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/pdfPediatricArrhythmiaCases.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryExpandedIndex.js",
      "src/data/tusGlossaryContextualPhraseIndex.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 33,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "bu olguda PCR boğmaca etkenini göstermektedir. , Corynebacterium diphtheriae : Corynebacterium diphtheriae farenkste psödomembran ve toksik miyokardit gibi bulgularla seyreder; paroksismal öksürük nöbetleri tipik değildir. , Mycoplasma pneumoniae : Mycoplasma "
      },
      {
        "sourceFilePath": "src/data/pdfPediatricArrhythmiaCases.js",
        "text": "dikardisi/sinüs aritmisi , options : Yaşa göre benign sinüs bradikardisi/sinüs aritmisi , Edinsel tam AV blok , Miyokardit , Lyme karditi , Uzun QT sendromu , question : Bu çocukta en olası ritim yorumu hangisidir? , learningOutcome : Asemptomatik, perfüzyonu "
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-glukagon",
    "term": "Glukagon",
    "aliases": [
      "Glukagon",
      "glucagon"
    ],
    "normalizedTerm": "glukagon",
    "TurkishName": "Glukagon",
    "EnglishName": "",
    "category": "Antidot / hormon",
    "subcategory": "Antidot",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Glukoz homeostazı ve bazı toksikoloji tedavileriyle ilişkili hormondur.",
    "preAnswerSafeDefinition": "Glukoz homeostazı ve bazı toksikoloji tedavileriyle ilişkili hormondur.",
    "shortDefinition": "Hepatik glikojenoliz ve glukoneogenezi artıran; hipoglisemi ve beta bloker/kalsiyum kanal blokeri toksisitesinde kullanılan hormondur.",
    "definition": "Hepatik glikojenoliz ve glukoneogenezi artıran; hipoglisemi ve beta bloker/kalsiyum kanal blokeri toksisitesinde kullanılan hormondur.",
    "detailedExplanation": "Glukagon insüline karşı düzenleyici hormondur; acil hipoglisemide glikoz yoksa kullanılabilir. Beta bloker toksisitesinde cAMP artırarak kardiyak kontraktiliteyi destekler.",
    "postAnswerExplanation": "Glukagon insüline karşı düzenleyici hormondur; acil hipoglisemide glikoz yoksa kullanılabilir. Beta bloker toksisitesinde cAMP artırarak kardiyak kontraktiliteyi destekler.",
    "postAnswerExpandedExplanation": "Glukagon insüline karşı düzenleyici hormondur; acil hipoglisemide glikoz yoksa kullanılabilir. Beta bloker toksisitesinde cAMP artırarak kardiyak kontraktiliteyi destekler.",
    "tusPearl": "Beta bloker toksisitesinde glukagon; hipoglisemide hızlı glukoz desteği düşün.",
    "examPearl": "Beta bloker toksisitesinde glukagon; hipoglisemide hızlı glukoz desteği düşün.",
    "differentialPoint": "İnsülin glukozu düşürür; glukagon hepatik glukoz çıkışını artırır.",
    "clinicalRelevance": "Glukagon insüline karşı düzenleyici hormondur; acil hipoglisemide glikoz yoksa kullanılabilir. Beta bloker toksisitesinde cAMP artırarak kardiyak kontraktiliteyi destekler.",
    "safeNestedTerms": [
      "Hipoglisemi",
      "Beta bloker toksisitesi",
      "Glikojenoliz",
      "cAMP",
      "İnsülin"
    ],
    "relatedTerms": [
      "Hipoglisemi",
      "Beta bloker toksisitesi",
      "Glikojenoliz",
      "cAMP",
      "İnsülin"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryCandidateAuditIndex.js",
      "src/data/tusGlossaryV319TeachableIndex.js",
      "src/utils/clinicalScientificAccuracyGate.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 28,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "l , clinicalFocus : Bulguların altında yatan mekanizmayı neden-sonuç ilişkisiyle ayırt etme. , learningTarget : Beta bloker zehirlenmesinde glukagonun etki mekanizmasını açıklayabilme , demographics : 52 yaşında kadın hasta , setting : Acil servis , chiefCompl"
      },
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "itesi , mainQuestion : Beta bloker zehirlenmesinde hipoglisemi ve bradikardi varsa özgül tedavide ne kullanılır? , mainAnswer : Glukagon. , explanation : Glukagon beta reseptörden bağımsız cAMP artırarak kardiyak inotropi/ kronotropiyi destekler. , keywords : "
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-pelvik-inflamatuar-hastalik",
    "term": "Pelvik inflamatuar hastalık",
    "aliases": [
      "Pelvik inflamatuar hastalık",
      "PID"
    ],
    "normalizedTerm": "pelvik inflamatuar hastalik",
    "TurkishName": "Pelvik inflamatuar hastalık",
    "EnglishName": "",
    "category": "Jinekolojik enfeksiyon",
    "subcategory": "Jinekolojik enfeksiyon",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Pelvik ağrı, servikal hareket hassasiyeti ve cinsel yolla bulaşan enfeksiyonlarla ilişkilidir.",
    "preAnswerSafeDefinition": "Pelvik ağrı, servikal hareket hassasiyeti ve cinsel yolla bulaşan enfeksiyonlarla ilişkilidir.",
    "shortDefinition": "Üst genital sistemin çoğunlukla cinsel yolla bulaşan etkenlerle gelişen enfeksiyöz inflamasyonudur.",
    "definition": "Üst genital sistemin çoğunlukla cinsel yolla bulaşan etkenlerle gelişen enfeksiyöz inflamasyonudur.",
    "detailedExplanation": "PID çoğunlukla Chlamydia trachomatis ve Neisseria gonorrhoeae ile ilişkilidir. Tedavi gecikirse infertilite, ektopik gebelik ve tubo-ovaryan apse riski artar.",
    "postAnswerExplanation": "PID çoğunlukla Chlamydia trachomatis ve Neisseria gonorrhoeae ile ilişkilidir. Tedavi gecikirse infertilite, ektopik gebelik ve tubo-ovaryan apse riski artar.",
    "postAnswerExpandedExplanation": "PID çoğunlukla Chlamydia trachomatis ve Neisseria gonorrhoeae ile ilişkilidir. Tedavi gecikirse infertilite, ektopik gebelik ve tubo-ovaryan apse riski artar.",
    "tusPearl": "Pelvik ağrı + servikal hareket hassasiyeti + ateş/akıntı = PID düşün; tedaviyi geciktirme.",
    "examPearl": "Pelvik ağrı + servikal hareket hassasiyeti + ateş/akıntı = PID düşün; tedaviyi geciktirme.",
    "differentialPoint": "Ektopik gebelikte β-hCG/USG; over torsiyonunda ani tek taraflı ağrı ve cerrahi aciliyet öne çıkar.",
    "clinicalRelevance": "PID çoğunlukla Chlamydia trachomatis ve Neisseria gonorrhoeae ile ilişkilidir. Tedavi gecikirse infertilite, ektopik gebelik ve tubo-ovaryan apse riski artar.",
    "safeNestedTerms": [
      "Servikal hareket hassasiyeti",
      "Neisseria gonorrhoeae",
      "Chlamydia trachomatis",
      "Tubo-ovaryan apse",
      "Ektopik gebelik"
    ],
    "relatedTerms": [
      "Servikal hareket hassasiyeti",
      "Neisseria gonorrhoeae",
      "Chlamydia trachomatis",
      "Tubo-ovaryan apse",
      "Ektopik gebelik"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/aiBranchQuestionTemplates.js",
    "sourceFiles": [
      "src/data/aiBranchQuestionTemplates.js",
      "src/data/cases.js",
      "src/data/cases.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryV321DeepHighYieldBatch4Index.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 27,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/aiBranchQuestionTemplates.js",
        "text": "esif dismenore, derin disparoni ve infertilite birlikteliği endometriozis için karakteristiktir. , wrongOptionFeedback : B : PID’de ateş, servikal hareket hassasiyeti ve enfeksiyon bulguları ön plandadır. , C : Miyom anormal uterin kanama ve bası semptomları y"
      },
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "elenme ile risk artmıştır. , C : Molar gebelikte çok yüksek beta-hCG ve üzüm salkımı benzeri uterin görünüm beklenir. , D : PID ateş, pürülan akıntı ve enfeksiyon bulgularıyla daha olasıdır; amenore ve beta-hCG pozitifliği yön değiştirir. , E : Torsiyonda ani "
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-ehec",
    "term": "EHEC",
    "aliases": [
      "EHEC",
      "enterohemorajik E. coli"
    ],
    "normalizedTerm": "ehec",
    "TurkishName": "EHEC",
    "EnglishName": "",
    "category": "Mikrobiyoloji / toksin",
    "subcategory": "Mikrobiyoloji",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Kanlı ishal ve toksin aracılı komplikasyonlarla ilişkilendirilen E. coli patotipidir.",
    "preAnswerSafeDefinition": "Kanlı ishal ve toksin aracılı komplikasyonlarla ilişkilendirilen E. coli patotipidir.",
    "shortDefinition": "Shiga benzeri toksin üreten enterohemorajik E. coli; kanlı ishal ve HÜS riskiyle ilişkilidir.",
    "definition": "Shiga benzeri toksin üreten enterohemorajik E. coli; kanlı ishal ve HÜS riskiyle ilişkilidir.",
    "detailedExplanation": "EHEC genellikle az pişmiş etle bulaşır; antibiyotik ve antimotilite ajanları HÜS riskini artırabileceği için dikkatli olunmalıdır. Shiga toksin endotel hasarı yapar.",
    "postAnswerExplanation": "EHEC genellikle az pişmiş etle bulaşır; antibiyotik ve antimotilite ajanları HÜS riskini artırabileceği için dikkatli olunmalıdır. Shiga toksin endotel hasarı yapar.",
    "postAnswerExpandedExplanation": "EHEC genellikle az pişmiş etle bulaşır; antibiyotik ve antimotilite ajanları HÜS riskini artırabileceği için dikkatli olunmalıdır. Shiga toksin endotel hasarı yapar.",
    "tusPearl": "Kanlı ishal + HÜS riski = EHEC; antibiyotik tuzağına dikkat.",
    "examPearl": "Kanlı ishal + HÜS riski = EHEC; antibiyotik tuzağına dikkat.",
    "differentialPoint": "ETEC sulu seyahat ishali yapar; EHEC kanlı ishal ve HÜS ile ayrılır.",
    "clinicalRelevance": "EHEC genellikle az pişmiş etle bulaşır; antibiyotik ve antimotilite ajanları HÜS riskini artırabileceği için dikkatli olunmalıdır. Shiga toksin endotel hasarı yapar.",
    "safeNestedTerms": [
      "Shiga toksin",
      "HÜS",
      "Kanlı ishal",
      "E. coli",
      "Antibiyotik tuzağı"
    ],
    "relatedTerms": [
      "Shiga toksin",
      "HÜS",
      "Kanlı ishal",
      "E. coli",
      "Antibiyotik tuzağı"
    ],
    "matchingPriority": 78,
    "standaloneSafe": true,
    "caseSensitiveDisplay": true,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/tusPearlCards.js",
    "sourceFiles": [
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryV330UltraDeepBatch5And6Index.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 26,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "Shigella. , difficulty : orta , branchId : medical-microbiology , subject : Tıbbi Mikrobiyoloji , topic : EHEC tedavi tuzağı , mainQuestion : Kanlı ishal ve HUS riski olan EHEC enfeksiyonunda antibiyotik kullanımından neden kaçınılır? , mainAnswer : Shiga toks"
      },
      {
        "sourceFilePath": "src/data/tusGlossaryV330UltraDeepBatch5And6Index.js",
        "text": "aşım veya temel klinik dil açısından öğretici değeri yüksek. , droppedAliases : , id : v330-ultradeep-batch5-6-ehec-tedavi-tuzagi , term : EHEC tedavi tuzağı , aliases : EHEC tedavi tuzağı , normalizedTerm : ehec tedavi tuzagi , TurkishName : EHEC tedavi tuzağ"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-etec",
    "term": "ETEC",
    "aliases": [
      "ETEC",
      "enterotoksijenik E. coli"
    ],
    "normalizedTerm": "etec",
    "TurkishName": "ETEC",
    "EnglishName": "",
    "category": "Mikrobiyoloji / toksin",
    "subcategory": "Mikrobiyoloji",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Sulu ishal ve seyahat öyküsüyle ilişkilendirilen E. coli patotipidir.",
    "preAnswerSafeDefinition": "Sulu ishal ve seyahat öyküsüyle ilişkilendirilen E. coli patotipidir.",
    "shortDefinition": "Isıya duyarlı ve/veya ısıya dirençli enterotoksinlerle sulu seyahat ishali yapan E. coli patotipidir.",
    "definition": "Isıya duyarlı ve/veya ısıya dirençli enterotoksinlerle sulu seyahat ishali yapan E. coli patotipidir.",
    "detailedExplanation": "ETEC toksinleri intestinal sekresyonu artırır; inflamatuvar invazyon baskın değildir. Klinik genellikle sulu ishaldir; kanlı dışkı ve HÜS beklenmez.",
    "postAnswerExplanation": "ETEC toksinleri intestinal sekresyonu artırır; inflamatuvar invazyon baskın değildir. Klinik genellikle sulu ishaldir; kanlı dışkı ve HÜS beklenmez.",
    "postAnswerExpandedExplanation": "ETEC toksinleri intestinal sekresyonu artırır; inflamatuvar invazyon baskın değildir. Klinik genellikle sulu ishaldir; kanlı dışkı ve HÜS beklenmez.",
    "tusPearl": "Seyahat sonrası sulu ishal = ETEC; kanlı ishal/HÜS = EHEC düşün.",
    "examPearl": "Seyahat sonrası sulu ishal = ETEC; kanlı ishal/HÜS = EHEC düşün.",
    "differentialPoint": "EIEC invaziv dizanteri; EHEC kanlı ishal/HÜS; ETEC toksinle sulu ishal yapar.",
    "clinicalRelevance": "ETEC toksinleri intestinal sekresyonu artırır; inflamatuvar invazyon baskın değildir. Klinik genellikle sulu ishaldir; kanlı dışkı ve HÜS beklenmez.",
    "safeNestedTerms": [
      "Seyahat ishali",
      "Enterotoksin",
      "Sulu ishal",
      "EHEC",
      "E. coli"
    ],
    "relatedTerms": [
      "Seyahat ishali",
      "Enterotoksin",
      "Sulu ishal",
      "EHEC",
      "E. coli"
    ],
    "matchingPriority": 78,
    "standaloneSafe": true,
    "caseSensitiveDisplay": true,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryV330UltraDeepBatch5And6Index.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 25,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "inleri esas olarak sitoskeletal düzeni bozar. , C : Yanlıştır. Adenilat siklaz aktivasyonu ve cAMP artışı kolera toksini veya ısıya duyarlı ETEC toksini için tipiktir. C. difficile toksinleri cAMP üzerinden değil Rho GTPaz inaktivasyonu üzerinden etki eder. , "
      },
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "ri tablosu oluşturur. , keywords : Shigella , dizanteri , tenesmus , düşük inokulum , trap : ETEC invazyon yapmadan sulu gezgin ishali oluşturur. , extraQuestion : Vaka kökünde dizanteri, tenesmus ve düşük inokulum birlikte verilirse hangi tanı öncelikle düşün"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-metimazol",
    "term": "Metimazol",
    "aliases": [
      "Metimazol",
      "methimazole"
    ],
    "normalizedTerm": "metimazol",
    "TurkishName": "Metimazol",
    "EnglishName": "",
    "category": "Antitiroid ilaç",
    "subcategory": "Antitiroid ilaç",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Hipertiroidi tedavisinde hormon sentezini azaltan ilaçtır.",
    "preAnswerSafeDefinition": "Hipertiroidi tedavisinde hormon sentezini azaltan ilaçtır.",
    "shortDefinition": "Tiroid peroksidazı inhibe ederek tiroid hormon sentezini azaltan antitiroid ilaçtır.",
    "definition": "Tiroid peroksidazı inhibe ederek tiroid hormon sentezini azaltan antitiroid ilaçtır.",
    "detailedExplanation": "Metimazol Graves hastalığında sık kullanılır; agranülositoz ve teratojenite önemli yan etkilerdir. Gebeliğin ilk trimesterinde genellikle PTU tercih edilir.",
    "postAnswerExplanation": "Metimazol Graves hastalığında sık kullanılır; agranülositoz ve teratojenite önemli yan etkilerdir. Gebeliğin ilk trimesterinde genellikle PTU tercih edilir.",
    "postAnswerExpandedExplanation": "Metimazol Graves hastalığında sık kullanılır; agranülositoz ve teratojenite önemli yan etkilerdir. Gebeliğin ilk trimesterinde genellikle PTU tercih edilir.",
    "tusPearl": "Metimazol agranülositoz yapabilir; ateş-boğaz ağrısında nötropeni sorgulanır.",
    "examPearl": "Metimazol agranülositoz yapabilir; ateş-boğaz ağrısında nötropeni sorgulanır.",
    "differentialPoint": "PTU ayrıca periferik T4-T3 dönüşümünü azaltır ve ilk trimester/tiroid fırtınasında öne çıkar.",
    "clinicalRelevance": "Metimazol Graves hastalığında sık kullanılır; agranülositoz ve teratojenite önemli yan etkilerdir. Gebeliğin ilk trimesterinde genellikle PTU tercih edilir.",
    "safeNestedTerms": [
      "Graves hastalığı",
      "Tiroid peroksidaz",
      "Agranülositoz",
      "Propiltiyourasil",
      "Hipertiroidi"
    ],
    "relatedTerms": [
      "Graves hastalığı",
      "Tiroid peroksidaz",
      "Agranülositoz",
      "Propiltiyourasil",
      "Hipertiroidi"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/tusPearlCards.js",
    "sourceFiles": [
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryV319TeachableIndex.js",
      "src/utils/clinicalScientificAccuracyGate.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 24,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "k ketoasidoz. , difficulty : orta , branchId : medical-pharmacology , subject : Tıbbi Farmakoloji , topic : Metimazol yan etkisi , mainQuestion : Metimazol kullanan hastada ateş ve boğaz ağrısı gelişirse hangi ciddi yan etki düşünülmelidir? , mainAnswer : Agra"
      },
      {
        "sourceFilePath": "src/data/tusGlossaryV319TeachableIndex.js",
        "text": "karar mantığı, mekanizma, ayırıcı tanı veya güvenli nested zincir açısından öğretici değeri var. , id : v319-teachable-metimazol-agranulositozu , term : Metimazol agranülositozu , aliases : Metimazol agranülositozu , metimazole agranulocytosis , antitiroid ila"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-migren",
    "term": "Migren",
    "aliases": [
      "Migren",
      "migraine"
    ],
    "normalizedTerm": "migren",
    "TurkishName": "Migren",
    "EnglishName": "",
    "category": "Nöroloji",
    "subcategory": "Nöroloji",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Ataklar halinde gelen primer baş ağrısı bozukluğudur.",
    "preAnswerSafeDefinition": "Ataklar halinde gelen primer baş ağrısı bozukluğudur.",
    "shortDefinition": "Tekrarlayan, sıklıkla unilateral ve zonklayıcı baş ağrısı ataklarıyla; fotofobi, fonofobi, bulantı veya aura ile seyredebilir.",
    "definition": "Tekrarlayan, sıklıkla unilateral ve zonklayıcı baş ağrısı ataklarıyla; fotofobi, fonofobi, bulantı veya aura ile seyredebilir.",
    "detailedExplanation": "Migren tanısı kliniktir; nörolojik defisit, ani başlangıç veya sistemik bulgular sekonder baş ağrısı açısından uyarıcıdır. Akut tedavide NSAİİ/triptanlar; profilakside beta bloker, topiramat gibi seçenekler düşünülebilir.",
    "postAnswerExplanation": "Migren tanısı kliniktir; nörolojik defisit, ani başlangıç veya sistemik bulgular sekonder baş ağrısı açısından uyarıcıdır. Akut tedavide NSAİİ/triptanlar; profilakside beta bloker, topiramat gibi seçenekler düşünülebilir.",
    "postAnswerExpandedExplanation": "Migren tanısı kliniktir; nörolojik defisit, ani başlangıç veya sistemik bulgular sekonder baş ağrısı açısından uyarıcıdır. Akut tedavide NSAİİ/triptanlar; profilakside beta bloker, topiramat gibi seçenekler düşünülebilir.",
    "tusPearl": "Migren sorusunda aura, fotofobi-fonofobi ve tetikleyiciler; kırmızı bayrak varsa sekonder nedenler önemlidir.",
    "examPearl": "Migren sorusunda aura, fotofobi-fonofobi ve tetikleyiciler; kırmızı bayrak varsa sekonder nedenler önemlidir.",
    "differentialPoint": "Küme baş ağrısı otonom bulgulu kısa şiddetli ataklar; gerilim tipi baş ağrısı bilateral baskı tarzındadır.",
    "clinicalRelevance": "Migren tanısı kliniktir; nörolojik defisit, ani başlangıç veya sistemik bulgular sekonder baş ağrısı açısından uyarıcıdır. Akut tedavide NSAİİ/triptanlar; profilakside beta bloker, topiramat gibi seçenekler düşünülebilir.",
    "safeNestedTerms": [
      "Aura",
      "Triptan",
      "Fotofobi",
      "Sekonder baş ağrısı",
      "Küme baş ağrısı"
    ],
    "relatedTerms": [
      "Aura",
      "Triptan",
      "Fotofobi",
      "Sekonder baş ağrısı",
      "Küme baş ağrısı"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/cases.js"
    ],
    "sourceArea": "Klinik Branş Seç / TUS Spot Olgular",
    "occurrenceCount": 24,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "options : id : A , text : Kontrastsız beyin BT istemek , id : B , text : Migren tedavisi verip taburcu etmek , id : C , text : Elektif EEG planlamak , id : D , text : Sinüzit için antibiyotik başlamak , id : E ,"
      },
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "tedavi ağrıyı azaltabilir fakat arteriyel inflamasyonu yeterince baskılayarak görme kaybını önlemez. , Triptan tedavisi başlamak : Triptan migren atağında kullanılabilir; çene kladikasyonu, temporal arter hassasiyeti ve yüksek sedimentasyonla uyumlu bu vasküli"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-hav",
    "term": "HAV",
    "aliases": [
      "HAV",
      "hepatit A virüsü"
    ],
    "normalizedTerm": "hav",
    "TurkishName": "HAV",
    "EnglishName": "",
    "category": "Viroloji",
    "subcategory": "Viroloji",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Akut hepatit serolojisi ve fekal-oral bulaşla ilişkilendirilen virüstür.",
    "preAnswerSafeDefinition": "Akut hepatit serolojisi ve fekal-oral bulaşla ilişkilendirilen virüstür.",
    "shortDefinition": "Fekal-oral bulaşan, çoğunlukla akut ve kronikleşmeyen hepatit yapan RNA virüsüdür.",
    "definition": "Fekal-oral bulaşan, çoğunlukla akut ve kronikleşmeyen hepatit yapan RNA virüsüdür.",
    "detailedExplanation": "Akut HAV enfeksiyonunda anti-HAV IgM pozitifliği beklenir. Kronik taşıyıcılık yapmaz; hijyen, kontamine gıda-su ve aşılama bilgisi önemlidir.",
    "postAnswerExplanation": "Akut HAV enfeksiyonunda anti-HAV IgM pozitifliği beklenir. Kronik taşıyıcılık yapmaz; hijyen, kontamine gıda-su ve aşılama bilgisi önemlidir.",
    "postAnswerExpandedExplanation": "Akut HAV enfeksiyonunda anti-HAV IgM pozitifliği beklenir. Kronik taşıyıcılık yapmaz; hijyen, kontamine gıda-su ve aşılama bilgisi önemlidir.",
    "tusPearl": "Anti-HAV IgM akut hepatit A’yı destekler; HAV kronikleşmez.",
    "examPearl": "Anti-HAV IgM akut hepatit A’yı destekler; HAV kronikleşmez.",
    "differentialPoint": "HBV/HCV kan ve cinsel temasla da bulaşabilir; HCV kronikleşme eğilimiyle ayrılır.",
    "clinicalRelevance": "Akut HAV enfeksiyonunda anti-HAV IgM pozitifliği beklenir. Kronik taşıyıcılık yapmaz; hijyen, kontamine gıda-su ve aşılama bilgisi önemlidir.",
    "safeNestedTerms": [
      "Anti-HAV IgM",
      "Akut hepatit",
      "Fekal-oral bulaş",
      "Aşı",
      "HBV"
    ],
    "relatedTerms": [
      "Anti-HAV IgM",
      "Akut hepatit",
      "Fekal-oral bulaş",
      "Aşı",
      "HBV"
    ],
    "matchingPriority": 78,
    "standaloneSafe": true,
    "caseSensitiveDisplay": true,
    "answerLeakRisk": "low",
    "ambiguityRisk": "medium",
    "priority": "P1",
    "recommendation": "addNewEntryWithAliasGuard",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/tusQuestionArchive.js",
    "sourceFiles": [
      "src/data/tusQuestionArchive.js",
      "src/data/cases.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryV319TeachableIndex.js",
      "src/utils/tusSpotNarrative.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 23,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/tusQuestionArchive.js",
        "text": "export const TUS_STATIC_QUESTION_RECORDS = seedId : tus-hav-serology-pattern-001 , title : Sarılık ve viral seroloji paterni , relatedBranch : Tıbbi Mikrobiyoloji , branchId : tus-spot-olgular , spotCategory : TUS Spot • Mikrobiyoloji , difficulty : Orta-Zor , lear"
      },
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "nthetic-template-bank , difficulty : Orta-Zor , questionType : spot , managementSteps : , seedId : synthetic-micro-hav-variant-001 , title : Akut hepatit paneli yorumu , relatedBranch : Tıbbi Mikrobiyoloji , learningTarget : HAV IgM ve IgG paterninin akut enfe"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-neisseria-gonorrhoeae",
    "term": "Neisseria gonorrhoeae",
    "aliases": [
      "Neisseria gonorrhoeae",
      "gonokok"
    ],
    "normalizedTerm": "neisseria gonorrhoeae",
    "TurkishName": "Neisseria gonorrhoeae",
    "EnglishName": "",
    "category": "Mikrobiyoloji etkeni",
    "subcategory": "Mikrobiyoloji etkeni",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Cinsel yolla bulaşan ürogenital enfeksiyonlarla ilişkili bakteriyel etkendir.",
    "preAnswerSafeDefinition": "Cinsel yolla bulaşan ürogenital enfeksiyonlarla ilişkili bakteriyel etkendir.",
    "shortDefinition": "Gram negatif diplokoktur; üretrit, servisit, PID, dissemine enfeksiyon ve neonatal konjonktivit yapabilir.",
    "definition": "Gram negatif diplokoktur; üretrit, servisit, PID, dissemine enfeksiyon ve neonatal konjonktivit yapabilir.",
    "detailedExplanation": "Gonokok nötrofiller içinde Gram negatif diplokok olarak görülebilir. Seftriakson temelli tedavi ve eş zamanlı klamidya kapsaması klinik pratikte önemlidir.",
    "postAnswerExplanation": "Gonokok nötrofiller içinde Gram negatif diplokok olarak görülebilir. Seftriakson temelli tedavi ve eş zamanlı klamidya kapsaması klinik pratikte önemlidir.",
    "postAnswerExpandedExplanation": "Gonokok nötrofiller içinde Gram negatif diplokok olarak görülebilir. Seftriakson temelli tedavi ve eş zamanlı klamidya kapsaması klinik pratikte önemlidir.",
    "tusPearl": "Pürülan üretrit/servisit + Gram negatif diplokok = Neisseria gonorrhoeae.",
    "examPearl": "Pürülan üretrit/servisit + Gram negatif diplokok = Neisseria gonorrhoeae.",
    "differentialPoint": "Chlamydia daha sinsi mukopürülan akıntı yapabilir; gonokok daha pürülan ve hızlı semptomludur.",
    "clinicalRelevance": "Gonokok nötrofiller içinde Gram negatif diplokok olarak görülebilir. Seftriakson temelli tedavi ve eş zamanlı klamidya kapsaması klinik pratikte önemlidir.",
    "safeNestedTerms": [
      "Üretrit",
      "Servisit",
      "Pelvik inflamatuar hastalık",
      "Seftriakson",
      "Gram negatif diplokok"
    ],
    "relatedTerms": [
      "Üretrit",
      "Servisit",
      "Pelvik inflamatuar hastalık",
      "Seftriakson",
      "Gram negatif diplokok"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js"
    ],
    "sourceArea": "Klinik Branş Seç / TUS Spot Olgular",
    "occurrenceCount": 23,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "correct : Legionella pneumophila , options : Legionella pneumophila , Streptococcus pyogenes , Bordetella pertussis , Clostridium tetani , Neisseria gonorrhoeae , question : Bu klinik tabloya en olası neden olan mikroorganizma aşağıdakilerden hangisidir? , exp"
      },
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "Neisseria gonorrhoeae terimi bu kaynak dosyada geçmektedir; raw kaynak metinde biçimsel kaçış/JSON sıkıştırması nedeniyle bağlam otomatik kısaltılmıştır."
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-norepinefrin",
    "term": "Norepinefrin",
    "aliases": [
      "Norepinefrin",
      "noradrenalin"
    ],
    "normalizedTerm": "norepinefrin",
    "TurkishName": "Norepinefrin",
    "EnglishName": "",
    "category": "Vazopressör",
    "subcategory": "Vazopressör",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Şok yönetiminde damar tonusunu artıran vazopressör ajandır.",
    "preAnswerSafeDefinition": "Şok yönetiminde damar tonusunu artıran vazopressör ajandır.",
    "shortDefinition": "Alfa-1 baskın vazokonstriktör etkisiyle septik ve vazodilatör şokta ilk tercih vazopressörlerden biridir.",
    "definition": "Alfa-1 baskın vazokonstriktör etkisiyle septik ve vazodilatör şokta ilk tercih vazopressörlerden biridir.",
    "detailedExplanation": "Norepinefrin sistemik vasküler direnci artırarak MAP’i yükseltir; septik şokta yeterli sıvı resüsitasyonu sonrası tercih edilir. Ekstravazasyon ve periferik iskemi riski izlenir.",
    "postAnswerExplanation": "Norepinefrin sistemik vasküler direnci artırarak MAP’i yükseltir; septik şokta yeterli sıvı resüsitasyonu sonrası tercih edilir. Ekstravazasyon ve periferik iskemi riski izlenir.",
    "postAnswerExpandedExplanation": "Norepinefrin sistemik vasküler direnci artırarak MAP’i yükseltir; septik şokta yeterli sıvı resüsitasyonu sonrası tercih edilir. Ekstravazasyon ve periferik iskemi riski izlenir.",
    "tusPearl": "Septik şokta sıvıdan sonra vazopressör gerekiyorsa norepinefrin ilk tercihtir.",
    "examPearl": "Septik şokta sıvıdan sonra vazopressör gerekiyorsa norepinefrin ilk tercihtir.",
    "differentialPoint": "Dobutamin inotropi artırır; norepinefrin vazokonstriksiyonla basınç desteği sağlar.",
    "clinicalRelevance": "Norepinefrin sistemik vasküler direnci artırarak MAP’i yükseltir; septik şokta yeterli sıvı resüsitasyonu sonrası tercih edilir. Ekstravazasyon ve periferik iskemi riski izlenir.",
    "safeNestedTerms": [
      "Septik şok",
      "Vazopressör",
      "MAP",
      "Alfa-1 reseptör",
      "Dobutamin"
    ],
    "relatedTerms": [
      "Septik şok",
      "Vazopressör",
      "MAP",
      "Alfa-1 reseptör",
      "Dobutamin"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusPearlCards.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 23,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "terleri sırasıyla aşağıdakilerden hangisidir? , questionType : mechanism , answerTarget : mechanism , diagnosis : correct : Asetilkolin ve norepinefrin , options : Asetilkolin ve norepinefrin , Norepinefrin ve asetilkolin , Dopamin ve serotonin , GABA ve gluta"
      },
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "tibiyotik ve sıvı geciktirilmemelidir. , extraQuestion : Sepsiste ilk tercih vazopressör genellikle hangisidir? , extraAnswer : Norepinefrin. , difficulty : orta , branchId : internal-medicine , subject : İç Hastalıkları , topic : Yüksek riskli pulmoner emboli"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-epilepsi",
    "term": "Epilepsi",
    "aliases": [
      "Epilepsi",
      "nöbet hastalığı"
    ],
    "normalizedTerm": "epilepsi",
    "TurkishName": "Epilepsi",
    "EnglishName": "",
    "category": "Nöroloji",
    "subcategory": "Nöroloji",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Nöbet tekrarı ve EEG/klinik özelliklerle değerlendirilen nörolojik hastalıktır.",
    "preAnswerSafeDefinition": "Nöbet tekrarı ve EEG/klinik özelliklerle değerlendirilen nörolojik hastalıktır.",
    "shortDefinition": "Tekrarlayan provoke edilmemiş nöbetlere yatkınlıkla tanımlanan kronik nörolojik hastalıktır.",
    "definition": "Tekrarlayan provoke edilmemiş nöbetlere yatkınlıkla tanımlanan kronik nörolojik hastalıktır.",
    "detailedExplanation": "Epilepsi tanısında nöbet tipi, tetikleyici, bilinç değişikliği, EEG ve görüntüleme birlikte değerlendirilir. Akut semptomatik nöbetler epilepsi tanısından ayrılmalıdır.",
    "postAnswerExplanation": "Epilepsi tanısında nöbet tipi, tetikleyici, bilinç değişikliği, EEG ve görüntüleme birlikte değerlendirilir. Akut semptomatik nöbetler epilepsi tanısından ayrılmalıdır.",
    "postAnswerExpandedExplanation": "Epilepsi tanısında nöbet tipi, tetikleyici, bilinç değişikliği, EEG ve görüntüleme birlikte değerlendirilir. Akut semptomatik nöbetler epilepsi tanısından ayrılmalıdır.",
    "tusPearl": "İlk nöbette provoke eden nedenleri dışla; tekrarlayan provoke edilmemiş nöbet epilepsi lehinedir.",
    "examPearl": "İlk nöbette provoke eden nedenleri dışla; tekrarlayan provoke edilmemiş nöbet epilepsi lehinedir.",
    "differentialPoint": "Senkop kısa süreli perfüzyon kaybıdır; epileptik nöbette postiktal dönem, dil ısırma ve tonik-klonik aktivite ipucu olabilir.",
    "clinicalRelevance": "Epilepsi tanısında nöbet tipi, tetikleyici, bilinç değişikliği, EEG ve görüntüleme birlikte değerlendirilir. Akut semptomatik nöbetler epilepsi tanısından ayrılmalıdır.",
    "safeNestedTerms": [
      "Nöbet",
      "EEG",
      "Postiktal dönem",
      "Status epileptikus",
      "Antiepileptik"
    ],
    "relatedTerms": [
      "Nöbet",
      "EEG",
      "Postiktal dönem",
      "Status epileptikus",
      "Antiepileptik"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/pdfPediatricArrhythmiaCases.js",
      "src/data/tusGlossaryExpandedIndex.js",
      "src/data/tusGlossaryClinicalBranchDeepIndex.js",
      "src/data/tusGlossaryDefinitionQualityIndex.js"
    ],
    "sourceArea": "Klinik Branş Seç / TUS Spot Olgular",
    "occurrenceCount": 21,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "daşları hastanın son saatlerde uyuşturucu madde kullandığını ve giderek uykuya meyilli hale geldiğini belirtiyor. Travma, ateş veya bilinen epilepsi öyküsü tariflenmiyor. , patientIntro : profile : 27 yaşında erkek hasta, acil serviste değerlendiriliyor. , pre"
      },
      {
        "sourceFilePath": "src/data/pdfPediatricArrhythmiaCases.js",
        "text": "kir , options : Isı/dehidratasyonla ilişkili egzersiz senkopu; kardiyak kırmızı bayrakların dışlanması gerekir , Kesin epilepsi tanısı , Panik atak , Asemptomatik WPW tanısı , Bakteriyel sepsis , question : Bu olguda en uygun değerlendirme yorumu hangisidir? ,"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-albuminuri",
    "term": "Albuminüri",
    "aliases": [
      "Albuminüri",
      "albüminüri"
    ],
    "normalizedTerm": "albuminuri",
    "TurkishName": "Albuminüri",
    "EnglishName": "",
    "category": "Nefroloji laboratuvarı",
    "subcategory": "Nefroloji laboratuvarı",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "İdrar protein içeriği ve böbrek hasarıyla ilişkili laboratuvar bulgusudur.",
    "preAnswerSafeDefinition": "İdrar protein içeriği ve böbrek hasarıyla ilişkili laboratuvar bulgusudur.",
    "shortDefinition": "İdrarda albumin atılımının artmasıdır; glomerüler hasar ve kronik böbrek hastalığı riskini gösterebilir.",
    "definition": "İdrarda albumin atılımının artmasıdır; glomerüler hasar ve kronik böbrek hastalığı riskini gösterebilir.",
    "detailedExplanation": "Albuminüri özellikle diyabetik nefropati ve hipertansif böbrek hastalığında erken hasar göstergesidir. Albümin/kreatinin oranı tarama ve takipte kullanılır.",
    "postAnswerExplanation": "Albuminüri özellikle diyabetik nefropati ve hipertansif böbrek hastalığında erken hasar göstergesidir. Albümin/kreatinin oranı tarama ve takipte kullanılır.",
    "postAnswerExpandedExplanation": "Albuminüri özellikle diyabetik nefropati ve hipertansif böbrek hastalığında erken hasar göstergesidir. Albümin/kreatinin oranı tarama ve takipte kullanılır.",
    "tusPearl": "Diyabette albuminüri erken nefropati ve kardiyovasküler risk göstergesidir.",
    "examPearl": "Diyabette albuminüri erken nefropati ve kardiyovasküler risk göstergesidir.",
    "differentialPoint": "Hematüri nefritik hasarı; albuminüri/proteinüri glomerüler geçirgenlik artışını düşündürür.",
    "clinicalRelevance": "Albuminüri özellikle diyabetik nefropati ve hipertansif böbrek hastalığında erken hasar göstergesidir. Albümin/kreatinin oranı tarama ve takipte kullanılır.",
    "safeNestedTerms": [
      "Proteinüri",
      "Diyabetik nefropati",
      "Albümin/kreatinin oranı",
      "Glomerül",
      "Kronik böbrek hastalığı"
    ],
    "relatedTerms": [
      "Proteinüri",
      "Diyabetik nefropati",
      "Albümin/kreatinin oranı",
      "Glomerül",
      "Kronik böbrek hastalığı"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryIndex.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 16,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "num yolu enfeksiyonuyla eş zamanlı hematüri yapabilir; pulmoner hemoraji tipik değildir. , Diyabetik nefropati : Diyabetik nefropati kronik albuminüri ve glomerülosklerozla seyreder; akut hemoptizi-glomerülonefrit paternini açıklamaz. , answerFeedback : summar"
      },
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "estion : Çocukta nefrotik sendromun en sık nedeni nedir? , mainAnswer : Minimal değişiklik hastalığı. , explanation : Selektif albuminüri ve steroid yanıtı klasik pediatrik nefrotik sendrom bilgisidir. , keywords : çocuk; nefrotik sendrom; steroid yanıtı; podo"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-sferosit",
    "term": "Sferosit",
    "aliases": [
      "Sferosit",
      "spherocyte"
    ],
    "normalizedTerm": "sferosit",
    "TurkishName": "Sferosit",
    "EnglishName": "",
    "category": "Hematoloji morfolojisi",
    "subcategory": "Hematoloji morfolojisi",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Periferik yaymada hemoliz paternini yorumlamaya yardım eden eritrosit morfolojisidir.",
    "preAnswerSafeDefinition": "Periferik yaymada hemoliz paternini yorumlamaya yardım eden eritrosit morfolojisidir.",
    "shortDefinition": "Merkezi solukluğu azalmış, küresel eritrosittir; herediter sferositoz ve sıcak otoimmün hemolitik anemide görülebilir.",
    "definition": "Merkezi solukluğu azalmış, küresel eritrosittir; herediter sferositoz ve sıcak otoimmün hemolitik anemide görülebilir.",
    "detailedExplanation": "Sferositler dalakta daha kolay yıkılır ve ekstravasküler hemolize yol açabilir. Herediter sferositozda osmotik frajilite artışı; sıcak OİHA’da direkt Coombs pozitifliği ayırıcıdır.",
    "postAnswerExplanation": "Sferositler dalakta daha kolay yıkılır ve ekstravasküler hemolize yol açabilir. Herediter sferositozda osmotik frajilite artışı; sıcak OİHA’da direkt Coombs pozitifliği ayırıcıdır.",
    "postAnswerExpandedExplanation": "Sferositler dalakta daha kolay yıkılır ve ekstravasküler hemolize yol açabilir. Herediter sferositozda osmotik frajilite artışı; sıcak OİHA’da direkt Coombs pozitifliği ayırıcıdır.",
    "tusPearl": "Sferosit + splenomegali/hemoliz; Coombs negatifse herediter sferositoz, pozitifse sıcak OİHA düşün.",
    "examPearl": "Sferosit + splenomegali/hemoliz; Coombs negatifse herediter sferositoz, pozitifse sıcak OİHA düşün.",
    "differentialPoint": "Şistosit mekanik intravasküler hemolizi; sferosit ekstravasküler hemolizi destekler.",
    "clinicalRelevance": "Sferositler dalakta daha kolay yıkılır ve ekstravasküler hemolize yol açabilir. Herediter sferositozda osmotik frajilite artışı; sıcak OİHA’da direkt Coombs pozitifliği ayırıcıdır.",
    "safeNestedTerms": [
      "Herediter sferositoz",
      "Direkt Coombs testi",
      "Sıcak otoimmün hemolitik anemi",
      "Hemoliz",
      "Şistosit"
    ],
    "relatedTerms": [
      "Herediter sferositoz",
      "Direkt Coombs testi",
      "Sıcak otoimmün hemolitik anemi",
      "Hemoliz",
      "Şistosit"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusGlossaryCaseDerivedIndex.js",
      "src/data/tusGlossaryClinicalBranchDeepIndex.js",
      "src/data/tusGlossaryContextualPhraseIndex.js",
      "src/data/tusGlossaryV321DeepHighYieldBatch4Index.js"
    ],
    "sourceArea": "Klinik Branş Seç / TUS Spot Olgular",
    "occurrenceCount": 16,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "yok olması , Anne sütündeki maddelere bağlı geç başlangıçlı enterohepatik dolaşım artışı , Eritrosit membran protein kusuruna bağlı kronik sferosit yıkımı , question : Bu bebekte sarılığın temel mekanizması aşağıdakilerden hangisidir? , explanation : İlk 24-48"
      },
      {
        "sourceFilePath": "src/data/tusGlossaryCaseDerivedIndex.js",
        "text": "litik anemi lehinedir. , tusPearl : Şistosit + trombositopeni mikroanjiyopatik hemolitik anemi lehinedir. , differentialPoint : Sferosit daha çok herediter sferositoz/otoimmün hemolizi düşündürür. , clinicalRelevance : Şistosit + trombositopeni mikroanjiyopati"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-anti-tpo",
    "term": "Anti-TPO",
    "aliases": [
      "Anti-TPO",
      "tiroid peroksidaz antikoru"
    ],
    "normalizedTerm": "anti-tpo",
    "TurkishName": "Anti-TPO",
    "EnglishName": "",
    "category": "Otoantikor",
    "subcategory": "Otoantikor",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Otoimmün tiroid hastalığı değerlendirmesinde kullanılan antikordur.",
    "preAnswerSafeDefinition": "Otoimmün tiroid hastalığı değerlendirmesinde kullanılan antikordur.",
    "shortDefinition": "Tiroid peroksidaz enzimine karşı gelişen otoantikordur; Hashimoto tiroiditi ve otoimmün tiroid hastalıklarıyla ilişkilidir.",
    "definition": "Tiroid peroksidaz enzimine karşı gelişen otoantikordur; Hashimoto tiroiditi ve otoimmün tiroid hastalıklarıyla ilişkilidir.",
    "detailedExplanation": "Anti-TPO pozitifliği Hashimoto tiroiditinde sık görülür; Graves hastalığında da pozitif olabilir. Tanı TSH/serbest T4 ve klinikle birlikte yorumlanır.",
    "postAnswerExplanation": "Anti-TPO pozitifliği Hashimoto tiroiditinde sık görülür; Graves hastalığında da pozitif olabilir. Tanı TSH/serbest T4 ve klinikle birlikte yorumlanır.",
    "postAnswerExpandedExplanation": "Anti-TPO pozitifliği Hashimoto tiroiditinde sık görülür; Graves hastalığında da pozitif olabilir. Tanı TSH/serbest T4 ve klinikle birlikte yorumlanır.",
    "tusPearl": "Hipotiroidi + anti-TPO pozitifliği = Hashimoto tiroiditi lehine güçlü ipucu.",
    "examPearl": "Hipotiroidi + anti-TPO pozitifliği = Hashimoto tiroiditi lehine güçlü ipucu.",
    "differentialPoint": "TRAb Graves için daha özgüldür; anti-TPO otoimmün tiroiditleri destekler.",
    "clinicalRelevance": "Anti-TPO pozitifliği Hashimoto tiroiditinde sık görülür; Graves hastalığında da pozitif olabilir. Tanı TSH/serbest T4 ve klinikle birlikte yorumlanır.",
    "safeNestedTerms": [
      "Hashimoto tiroiditi",
      "TSH",
      "Serbest T4",
      "Graves hastalığı",
      "TRAb"
    ],
    "relatedTerms": [
      "Hashimoto tiroiditi",
      "TSH",
      "Serbest T4",
      "Graves hastalığı",
      "TRAb"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": true,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusGlossaryExpandedIndex.js",
      "src/data/tusGlossaryNestedClinicalIndex.js"
    ],
    "sourceArea": "Klinik Branş Seç / TUS Spot Olgular",
    "occurrenceCount": 15,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "tonin yüksekliği , id : C , text : Papiller yapı baskınlığı — BRAF mutasyonunun zorunlu varlığı , id : D , text : Lenfoid doku kökeni — anti-TPO antikoru yüksekliği , id : E , text : Anaplastik dönüşüm — düşük dereceli benign seyir , correctAnswer : B , correc"
      },
      {
        "sourceFilePath": "src/data/tusGlossaryExpandedIndex.js",
        "text": "yıkımıyla hipotiroidiye yol açabilen kronik tiroidittir. Klinik bağlamla birlikte yorumlanmalıdır. , postAnswerExpandedExplanation : Anti-TPO pozitifliği ve ağrısız guatr Hashimoto için tipiktir. , tusPearl : Anti-TPO pozitifliği ve ağrısız guatr Hashimoto içi"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-cha2ds2-vasc",
    "term": "CHA2DS2-VASc",
    "aliases": [
      "CHA2DS2-VASc",
      "AF inme riski skoru"
    ],
    "normalizedTerm": "cha2ds2-vasc",
    "TurkishName": "CHA2DS2-VASc",
    "EnglishName": "",
    "category": "Klinik skor",
    "subcategory": "Klinik skor",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Atriyal fibrilasyon hastasında antikoagülasyon kararını destekleyen risk skorudur.",
    "preAnswerSafeDefinition": "Atriyal fibrilasyon hastasında antikoagülasyon kararını destekleyen risk skorudur.",
    "shortDefinition": "Atriyal fibrilasyonda inme riskini tahmin etmek için kullanılan klinik skordur.",
    "definition": "Atriyal fibrilasyonda inme riskini tahmin etmek için kullanılan klinik skordur.",
    "detailedExplanation": "CHA2DS2-VASc kalp yetmezliği, hipertansiyon, yaş, diyabet, inme/TIA öyküsü, vasküler hastalık ve cinsiyet gibi değişkenleri içerir. Skor arttıkça oral antikoagülasyon yararı artar.",
    "postAnswerExplanation": "CHA2DS2-VASc kalp yetmezliği, hipertansiyon, yaş, diyabet, inme/TIA öyküsü, vasküler hastalık ve cinsiyet gibi değişkenleri içerir. Skor arttıkça oral antikoagülasyon yararı artar.",
    "postAnswerExpandedExplanation": "CHA2DS2-VASc kalp yetmezliği, hipertansiyon, yaş, diyabet, inme/TIA öyküsü, vasküler hastalık ve cinsiyet gibi değişkenleri içerir. Skor arttıkça oral antikoagülasyon yararı artar.",
    "tusPearl": "AF’de antikoagülasyon kararı için inme riski CHA2DS2-VASc, kanama riski ayrıca değerlendirilir.",
    "examPearl": "AF’de antikoagülasyon kararı için inme riski CHA2DS2-VASc, kanama riski ayrıca değerlendirilir.",
    "differentialPoint": "HAS-BLED kanama riskini; CHA2DS2-VASc tromboemboli riskini değerlendirir.",
    "clinicalRelevance": "CHA2DS2-VASc kalp yetmezliği, hipertansiyon, yaş, diyabet, inme/TIA öyküsü, vasküler hastalık ve cinsiyet gibi değişkenleri içerir. Skor arttıkça oral antikoagülasyon yararı artar.",
    "safeNestedTerms": [
      "Atriyal fibrilasyon",
      "Antikoagülasyon",
      "İnme riski",
      "HAS-BLED",
      "TIA"
    ],
    "relatedTerms": [
      "Atriyal fibrilasyon",
      "Antikoagülasyon",
      "İnme riski",
      "HAS-BLED",
      "TIA"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": true,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/tusPearlCards.js",
    "sourceFiles": [
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryV330UltraDeepBatch5And6Index.js",
      "src/utils/clinicalScientificAccuracyGate.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 15,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "fibrilasyonda inme riski , mainQuestion : Atriyal fibrilasyonda antikoagülasyon kararında hangi skor kullanılır? , mainAnswer : CHA2DS2-VASc skoru. , explanation : Skor inme riskini tahmin ederek antikoagülasyon kararını destekler. , keywords : atriyal fibrila"
      },
      {
        "sourceFilePath": "src/data/tusGlossaryV330UltraDeepBatch5And6Index.js",
        "text": "mında soru çözme / ayırıcı tanı / mekanizma öğrenimi sağlar. , droppedAliases : , id : v330-ultradeep-batch5-6-cha2ds2-vasc-skoru , term : CHA2DS2-VASc skoru , aliases : CHA2DS2-VASc skoru , normalizedTerm : cha2ds2-vasc skoru , TurkishName : CHA2DS2-VASc skor"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-aspergillus-fumigatus",
    "term": "Aspergillus fumigatus",
    "aliases": [
      "Aspergillus fumigatus",
      "Aspergillus"
    ],
    "normalizedTerm": "aspergillus fumigatus",
    "TurkishName": "Aspergillus fumigatus",
    "EnglishName": "",
    "category": "Mikoloji etkeni",
    "subcategory": "Mikoloji etkeni",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Fırsatçı küf enfeksiyonları ve akciğer tutulumuyla ilişkili mantar etkenidir.",
    "preAnswerSafeDefinition": "Fırsatçı küf enfeksiyonları ve akciğer tutulumuyla ilişkili mantar etkenidir.",
    "shortDefinition": "Septalı hifleri dar açılı dallanan küf mantarıdır; immünsüpresyonda invaziv akciğer hastalığı yapabilir.",
    "definition": "Septalı hifleri dar açılı dallanan küf mantarıdır; immünsüpresyonda invaziv akciğer hastalığı yapabilir.",
    "detailedExplanation": "Aspergillus fumigatus nötropeni ve transplant gibi immünsüpresif durumlarda invaziv hastalık yapabilir; hemoptizi ve damar invazyonu önemlidir. ABPA astım/kistik fibrozis zemininde hipersensitivite tablosudur.",
    "postAnswerExplanation": "Aspergillus fumigatus nötropeni ve transplant gibi immünsüpresif durumlarda invaziv hastalık yapabilir; hemoptizi ve damar invazyonu önemlidir. ABPA astım/kistik fibrozis zemininde hipersensitivite tablosudur.",
    "postAnswerExpandedExplanation": "Aspergillus fumigatus nötropeni ve transplant gibi immünsüpresif durumlarda invaziv hastalık yapabilir; hemoptizi ve damar invazyonu önemlidir. ABPA astım/kistik fibrozis zemininde hipersensitivite tablosudur.",
    "tusPearl": "Nötropeni + hemoptizi + akciğerde halo bulgusu = invaziv aspergilloz düşün.",
    "examPearl": "Nötropeni + hemoptizi + akciğerde halo bulgusu = invaziv aspergilloz düşün.",
    "differentialPoint": "Mucor geniş, aseptalı ve dik açıya yakın hiflerle; Aspergillus septalı dar açılı hiflerle ayrılır.",
    "clinicalRelevance": "Aspergillus fumigatus nötropeni ve transplant gibi immünsüpresif durumlarda invaziv hastalık yapabilir; hemoptizi ve damar invazyonu önemlidir. ABPA astım/kistik fibrozis zemininde hipersensitivite tablosudur.",
    "safeNestedTerms": [
      "Nötropeni",
      "İnvaziv aspergilloz",
      "Septalı hif",
      "ABPA",
      "Hemoptizi"
    ],
    "relatedTerms": [
      "Nötropeni",
      "İnvaziv aspergilloz",
      "Septalı hif",
      "ABPA",
      "Hemoptizi"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusGlossaryV319TeachableIndex.js"
    ],
    "sourceArea": "Klinik Branş Seç / TUS Spot Olgular",
    "occurrenceCount": 14,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "thogen , answerTarget : pathogen , diagnosis : correct : Cryptococcus neoformans , options : Cryptococcus neoformans , Candida albicans , Aspergillus fumigatus , Histoplasma capsulatum , Mucor türleri , question : Bu klinik tabloya en olası neden olan mikroorg"
      },
      {
        "sourceFilePath": "src/data/tusGlossaryV319TeachableIndex.js",
        "text": "xtExamples : da albicans\\ :\\ Candida albicans silinebilir oral plak, psödohif ve pozitif germ tüp testiyle en uyumlu etkendir.\\ ,\\ Aspergillus fumigatus\\ :\\ Aspergillus fumigatus septalı hiflerle invaziv akciğer enfeksiyonu yapabilir; oral psödohifli plak için"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-gestasyonel-diyabet",
    "term": "Gestasyonel diyabet",
    "aliases": [
      "Gestasyonel diyabet",
      "gebelik diyabeti"
    ],
    "normalizedTerm": "gestasyonel diyabet",
    "TurkishName": "Gestasyonel diyabet",
    "EnglishName": "",
    "category": "Obstetri / endokrin",
    "subcategory": "Obstetri",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Gebelikte glukoz metabolizması ve fetal-maternal risklerle ilişkili diyabet tablosudur.",
    "preAnswerSafeDefinition": "Gebelikte glukoz metabolizması ve fetal-maternal risklerle ilişkili diyabet tablosudur.",
    "shortDefinition": "Gebelikte başlayan veya ilk kez gebelikte tanınan glukoz intoleransıdır.",
    "definition": "Gebelikte başlayan veya ilk kez gebelikte tanınan glukoz intoleransıdır.",
    "detailedExplanation": "Gestasyonel diyabet makrozomi, doğum travması, neonatal hipoglisemi ve ileride tip 2 diyabet riskini artırır. Tarama genellikle 24–28. haftalarda oral glukoz testleriyle yapılır.",
    "postAnswerExplanation": "Gestasyonel diyabet makrozomi, doğum travması, neonatal hipoglisemi ve ileride tip 2 diyabet riskini artırır. Tarama genellikle 24–28. haftalarda oral glukoz testleriyle yapılır.",
    "postAnswerExpandedExplanation": "Gestasyonel diyabet makrozomi, doğum travması, neonatal hipoglisemi ve ileride tip 2 diyabet riskini artırır. Tarama genellikle 24–28. haftalarda oral glukoz testleriyle yapılır.",
    "tusPearl": "Gebelikte hiperglisemi = makrozomi ve neonatal hipoglisemi riskini düşün.",
    "examPearl": "Gebelikte hiperglisemi = makrozomi ve neonatal hipoglisemi riskini düşün.",
    "differentialPoint": "Pregestasyonel diyabet organogenez döneminde konjenital anomali riskini daha çok artırır.",
    "clinicalRelevance": "Gestasyonel diyabet makrozomi, doğum travması, neonatal hipoglisemi ve ileride tip 2 diyabet riskini artırır. Tarama genellikle 24–28. haftalarda oral glukoz testleriyle yapılır.",
    "safeNestedTerms": [
      "Makrozomi",
      "Neonatal hipoglisemi",
      "Oral glukoz tolerans testi",
      "Tip 2 diyabet",
      "Gebelik"
    ],
    "relatedTerms": [
      "Makrozomi",
      "Neonatal hipoglisemi",
      "Oral glukoz tolerans testi",
      "Tip 2 diyabet",
      "Gebelik"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/aiTopicPools.js",
    "sourceFiles": [
      "src/data/aiTopicPools.js",
      "src/data/cases.js",
      "src/data/tusGlossaryV321DeepHighYieldBatch4Index.js"
    ],
    "sourceArea": "Klinik Branş Seç / TUS Spot Olgular",
    "occurrenceCount": 14,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/aiTopicPools.js",
        "text": "ampsi ve eklampsi', 'Plasenta previa-ablatio ayrımı', 'Postpartum kanama yaklaşımı', 'Omuz distosisi', 'Rh uygunsuzluğu profilaksisi', 'Gestasyonel diyabet taraması', 'Pelvik inflamatuvar hastalık', 'Over torsiyonu', 'Endometriozis', 'PCOS tanı kriterleri', 'S"
      },
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "fComplaint : Vajinal doğum sırasında fetal baş çıktıktan sonra omuzların ilerlememesi nedeniyle acil obstetrik müdahale gerekiyor. , stem : Gestasyonel diyabet öyküsü vardır ve ultrasonografide fetüsün iri olduğu belirtilmiştir. Doğum eylemi vajinal olarak ile"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-haptoglobin-dusuklugu",
    "term": "Haptoglobin düşüklüğü",
    "aliases": [
      "Haptoglobin düşüklüğü",
      "düşük haptoglobin"
    ],
    "normalizedTerm": "haptoglobin dusuklugu",
    "TurkishName": "Haptoglobin düşüklüğü",
    "EnglishName": "",
    "category": "Hemoliz jargonu",
    "subcategory": "Hemoliz jargonu",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Hemoliz değerlendirmesinde kullanılan laboratuvar bulgusudur.",
    "preAnswerSafeDefinition": "Hemoliz değerlendirmesinde kullanılan laboratuvar bulgusudur.",
    "shortDefinition": "Serbest hemoglobini bağlayan haptoglobinin azalmasıdır; özellikle intravasküler hemolizi destekler.",
    "definition": "Serbest hemoglobini bağlayan haptoglobinin azalmasıdır; özellikle intravasküler hemolizi destekler.",
    "detailedExplanation": "Hemolizde serbest hemoglobin haptoglobine bağlanır ve kompleks temizlendiği için haptoglobin düşer. LDH ve indirekt bilirubin artışı, retikülositoz ve hemoglobinüriyle birlikte yorumlanır.",
    "postAnswerExplanation": "Hemolizde serbest hemoglobin haptoglobine bağlanır ve kompleks temizlendiği için haptoglobin düşer. LDH ve indirekt bilirubin artışı, retikülositoz ve hemoglobinüriyle birlikte yorumlanır.",
    "postAnswerExpandedExplanation": "Hemolizde serbest hemoglobin haptoglobine bağlanır ve kompleks temizlendiği için haptoglobin düşer. LDH ve indirekt bilirubin artışı, retikülositoz ve hemoglobinüriyle birlikte yorumlanır.",
    "tusPearl": "LDH↑ + indirekt bilirubin↑ + haptoglobin↓ + retikülositoz = hemoliz paterni.",
    "examPearl": "LDH↑ + indirekt bilirubin↑ + haptoglobin↓ + retikülositoz = hemoliz paterni.",
    "differentialPoint": "Kan kaybında retikülositoz olabilir ama haptoglobin düşüklüğü hemolizi daha çok destekler.",
    "clinicalRelevance": "Hemolizde serbest hemoglobin haptoglobine bağlanır ve kompleks temizlendiği için haptoglobin düşer. LDH ve indirekt bilirubin artışı, retikülositoz ve hemoglobinüriyle birlikte yorumlanır.",
    "safeNestedTerms": [
      "Hemoliz",
      "LDH",
      "İndirekt bilirubin",
      "Retikülositoz",
      "Hemoglobinüri"
    ],
    "relatedTerms": [
      "Hemoliz",
      "LDH",
      "İndirekt bilirubin",
      "Retikülositoz",
      "Hemoglobinüri"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/tusGlossaryExpandedIndex.js",
    "sourceFiles": [
      "src/data/tusGlossaryExpandedIndex.js",
      "src/data/tusGlossaryCaseDerivedIndex.js",
      "src/data/tusGlossaryContextualPhraseIndex.js",
      "src/data/tusGlossaryNestedCoverageIndex.js",
      "src/data/tusGlossaryContentCoverageIndex.js"
    ],
    "sourceArea": "Glossary body / nested terms",
    "occurrenceCount": 13,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/tusGlossaryExpandedIndex.js",
        "text": ". Klinik bağlamla birlikte yorumlanmalıdır. , postAnswerExpandedExplanation : Retikülositoz, LDH artışı, indirekt bilirubin artışı ve haptoglobin düşüklüğü hemolizi destekler. , tusPearl : Retikülositoz, LDH artışı, indirekt bilirubin artışı ve haptoglobin düş"
      },
      {
        "sourceFilePath": "src/data/tusGlossaryCaseDerivedIndex.js",
        "text": "erden geçen eritrositlerin mekanik parçalanmasıyla gelişen intravasküler hemolizdir. Şistosit, LDH yüksekliği, indirekt bilirubin artışı ve haptoglobin düşüklüğü beklenir. , tusPearl : Şistosit, LDH yüksekliği, indirekt bilirubin artışı ve haptoglobin düşüklüğ"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-epididimit",
    "term": "Epididimit",
    "aliases": [
      "Epididimit",
      "epididimoorşit"
    ],
    "normalizedTerm": "epididimit",
    "TurkishName": "Epididimit",
    "EnglishName": "",
    "category": "Üroloji / enfeksiyon",
    "subcategory": "Üroloji",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Akut skrotal ağrı ayırıcı tanısında değerlendirilen enfeksiyöz/inflamatuvar tablodur.",
    "preAnswerSafeDefinition": "Akut skrotal ağrı ayırıcı tanısında değerlendirilen enfeksiyöz/inflamatuvar tablodur.",
    "shortDefinition": "Epididimin inflamasyonudur; skrotal ağrı, hassasiyet ve bazen üriner/cinsel yolla bulaşan enfeksiyonla ilişkilidir.",
    "definition": "Epididimin inflamasyonudur; skrotal ağrı, hassasiyet ve bazen üriner/cinsel yolla bulaşan enfeksiyonla ilişkilidir.",
    "detailedExplanation": "Epididimitte ağrı genellikle daha kademeli başlar; Prehn bulgusu ve kremaster refleksi torsiyon ayırımında tek başına güvenilir değildir. Torsiyon şüphesi varsa görüntüleme/cerrahi geciktirilmemelidir.",
    "postAnswerExplanation": "Epididimitte ağrı genellikle daha kademeli başlar; Prehn bulgusu ve kremaster refleksi torsiyon ayırımında tek başına güvenilir değildir. Torsiyon şüphesi varsa görüntüleme/cerrahi geciktirilmemelidir.",
    "postAnswerExpandedExplanation": "Epididimitte ağrı genellikle daha kademeli başlar; Prehn bulgusu ve kremaster refleksi torsiyon ayırımında tek başına güvenilir değildir. Torsiyon şüphesi varsa görüntüleme/cerrahi geciktirilmemelidir.",
    "tusPearl": "Akut skrotumda önce torsiyonu dışla; epididimit daha kademeli ağrı ve enfeksiyon bulgularıyla gelir.",
    "examPearl": "Akut skrotumda önce torsiyonu dışla; epididimit daha kademeli ağrı ve enfeksiyon bulgularıyla gelir.",
    "differentialPoint": "Testis torsiyonu ani şiddetli ağrı ve zaman kritik iskemi; epididimit enfeksiyon/inflamasyon paternidir.",
    "clinicalRelevance": "Epididimitte ağrı genellikle daha kademeli başlar; Prehn bulgusu ve kremaster refleksi torsiyon ayırımında tek başına güvenilir değildir. Torsiyon şüphesi varsa görüntüleme/cerrahi geciktirilmemelidir.",
    "safeNestedTerms": [
      "Akut skrotum",
      "Testis torsiyonu",
      "Prehn bulgusu",
      "Kremaster refleksi",
      "Neisseria gonorrhoeae"
    ],
    "relatedTerms": [
      "Akut skrotum",
      "Testis torsiyonu",
      "Prehn bulgusu",
      "Kremaster refleksi",
      "Neisseria gonorrhoeae"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusGlossaryContextualPhraseIndex.js",
      "src/data/tusGlossaryRecursiveNestedIndex.js"
    ],
    "sourceArea": "Klinik Branş Seç / TUS Spot Olgular",
    "occurrenceCount": 12,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "s torsiyonunda testis canlılığını korumak için doğru acil yaklaşımdır. , Oral antibiyotik başlanıp 48 saat sonra kontrol : Oral antibiyotik epididimitte düşünülebilir ancak ani torsiyon bulguları olan hastada cerrahiyi geciktirir. , Ağrı kesici verilerek evde "
      },
      {
        "sourceFilePath": "src/data/tusGlossaryContextualPhraseIndex.js",
        "text": "ağrı, şişlik, hematom, enfeksiyon veya fıtık nüksü değerlendirilmelidir. , differentialPoint : Skrotal ağrı eşlik ediyorsa torsiyon, epididimit, inkarsere herni ve postoperatif komplikasyonlar ayrılmalıdır. , clinicalContext : , clinicalRelevance : , mechanism"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-hsv",
    "term": "HSV",
    "aliases": [
      "HSV",
      "herpes simplex virus"
    ],
    "normalizedTerm": "hsv",
    "TurkishName": "HSV",
    "EnglishName": "",
    "category": "Viroloji",
    "subcategory": "Viroloji",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Veziküler lezyonlar ve santral sinir sistemi enfeksiyonu ile ilişkilendirilen herpes virüsüdür.",
    "preAnswerSafeDefinition": "Veziküler lezyonlar ve santral sinir sistemi enfeksiyonu ile ilişkilendirilen herpes virüsüdür.",
    "shortDefinition": "Herpes simplex virüs; mukokutanöz lezyon, genital herpes ve HSV-1 ensefalitiyle ilişkilidir.",
    "definition": "Herpes simplex virüs; mukokutanöz lezyon, genital herpes ve HSV-1 ensefalitiyle ilişkilidir.",
    "detailedExplanation": "HSV latent kalabilir ve reaktivasyon yapabilir. HSV-1 temporal lob ensefaliti, HSV-2 genital lezyon ve neonatal herpes açısından klasik sınav bağlantılarıdır; tedavide asiklovir kullanılır.",
    "postAnswerExplanation": "HSV latent kalabilir ve reaktivasyon yapabilir. HSV-1 temporal lob ensefaliti, HSV-2 genital lezyon ve neonatal herpes açısından klasik sınav bağlantılarıdır; tedavide asiklovir kullanılır.",
    "postAnswerExpandedExplanation": "HSV latent kalabilir ve reaktivasyon yapabilir. HSV-1 temporal lob ensefaliti, HSV-2 genital lezyon ve neonatal herpes açısından klasik sınav bağlantılarıdır; tedavide asiklovir kullanılır.",
    "tusPearl": "Temporal lob ensefaliti + nöbet/bilinç değişikliği = HSV; asiklovir erken başlanır.",
    "examPearl": "Temporal lob ensefaliti + nöbet/bilinç değişikliği = HSV; asiklovir erken başlanır.",
    "differentialPoint": "VZV dermatomal veziküler döküntü; CMV baykuş gözü inklüzyonları ve immünsüpresyonla ayrılır.",
    "clinicalRelevance": "HSV latent kalabilir ve reaktivasyon yapabilir. HSV-1 temporal lob ensefaliti, HSV-2 genital lezyon ve neonatal herpes açısından klasik sınav bağlantılarıdır; tedavide asiklovir kullanılır.",
    "safeNestedTerms": [
      "HSV ensefaliti",
      "Asiklovir",
      "Temporal lob",
      "Genital herpes",
      "Neonatal herpes"
    ],
    "relatedTerms": [
      "HSV ensefaliti",
      "Asiklovir",
      "Temporal lob",
      "Genital herpes",
      "Neonatal herpes"
    ],
    "matchingPriority": 78,
    "standaloneSafe": true,
    "caseSensitiveDisplay": true,
    "answerLeakRisk": "low",
    "ambiguityRisk": "medium",
    "priority": "P1",
    "recommendation": "addNewEntryWithAliasGuard",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/tusPearlCards.js",
    "sourceFiles": [
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryExpandedIndex.js",
      "src/data/tusGlossaryContextualPhraseIndex.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 12,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "oranı artmış olabilir. , difficulty : orta , branchId : minor-rotations , subject : Küçük Stajlar , topic : HSV ensefaliti , mainQuestion : Ateş, davranış değişikliği, nöbet ve temporal lob tutulumu hangi ensefaliti düşündürür? , mainAnswer : HSV ensefaliti. ,"
      },
      {
        "sourceFilePath": "src/data/tusGlossaryExpandedIndex.js",
        "text": "zeri lezyonlarla seyreden hipersensitivite reaksiyonudur. Klinik bağlamla birlikte yorumlanmalıdır. , postAnswerExpandedExplanation : HSV ve bazı ilaçlarla ilişkilidir; hedef lezyon ifadesi ayırıcıdır. , tusPearl : HSV ve bazı ilaçlarla ilişkilidir; hedef lezy"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-klebsiella-pneumoniae",
    "term": "Klebsiella pneumoniae",
    "aliases": [
      "Klebsiella pneumoniae",
      "Klebsiella"
    ],
    "normalizedTerm": "klebsiella pneumoniae",
    "TurkishName": "Klebsiella pneumoniae",
    "EnglishName": "",
    "category": "Mikrobiyoloji etkeni",
    "subcategory": "Mikrobiyoloji etkeni",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Kapsüllü Gram negatif bakteri ve nozokomiyal/toplum kaynaklı enfeksiyonlarla ilişkili etkendir.",
    "preAnswerSafeDefinition": "Kapsüllü Gram negatif bakteri ve nozokomiyal/toplum kaynaklı enfeksiyonlarla ilişkili etkendir.",
    "shortDefinition": "Kapsüllü Gram negatif basil; pnömoni, UTI ve karaciğer apsesiyle ilişkilendirilebilir.",
    "definition": "Kapsüllü Gram negatif basil; pnömoni, UTI ve karaciğer apsesiyle ilişkilendirilebilir.",
    "detailedExplanation": "Klebsiella kalın kapsülü nedeniyle mukoid koloni yapar; alkolizm/diyabet zemininde nekrotizan pnömoni ve koyu kıvamlı balgam klasik anlatılır. ESBL/karbapenemaz direnci klinikte önemlidir.",
    "postAnswerExplanation": "Klebsiella kalın kapsülü nedeniyle mukoid koloni yapar; alkolizm/diyabet zemininde nekrotizan pnömoni ve koyu kıvamlı balgam klasik anlatılır. ESBL/karbapenemaz direnci klinikte önemlidir.",
    "postAnswerExpandedExplanation": "Klebsiella kalın kapsülü nedeniyle mukoid koloni yapar; alkolizm/diyabet zemininde nekrotizan pnömoni ve koyu kıvamlı balgam klasik anlatılır. ESBL/karbapenemaz direnci klinikte önemlidir.",
    "tusPearl": "Kapsüllü Gram negatif basil + mukoid koloni + alkolik hastada pnömoni = Klebsiella düşün.",
    "examPearl": "Kapsüllü Gram negatif basil + mukoid koloni + alkolik hastada pnömoni = Klebsiella düşün.",
    "differentialPoint": "S. pneumoniae Gram pozitif diplokok; Klebsiella Gram negatif basil ve belirgin kapsül ile ayrılır.",
    "clinicalRelevance": "Klebsiella kalın kapsülü nedeniyle mukoid koloni yapar; alkolizm/diyabet zemininde nekrotizan pnömoni ve koyu kıvamlı balgam klasik anlatılır. ESBL/karbapenemaz direnci klinikte önemlidir.",
    "safeNestedTerms": [
      "Kapsül",
      "Gram negatif basil",
      "ESBL",
      "Pnömoni",
      "Diyabet"
    ],
    "relatedTerms": [
      "Kapsül",
      "Gram negatif basil",
      "ESBL",
      "Pnömoni",
      "Diyabet"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusGlossarySupplementalIndex.js"
    ],
    "sourceArea": "Klinik Branş Seç / TUS Spot Olgular",
    "occurrenceCount": 11,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "rect : Legionella pneumophila , options : Streptococcus pneumoniae , Legionella pneumophila , Mycoplasma pneumoniae , Chlamydia psittaci , Klebsiella pneumoniae , question : Bu klinik tabloya en olası neden olan mikroorganizma aşağıdakilerden hangisidir? , exp"
      },
      {
        "sourceFilePath": "src/data/tusGlossarySupplementalIndex.js",
        "text": "eğerlendiren biyokimyasal testtir. Klinik bağlamla birlikte yorumlanmalıdır. , postAnswerExpandedExplanation : E. coli indol pozitif, Klebsiella pneumoniae indol negatif klasik ayrımdır. , tusPearl : E. coli indol pozitif, Klebsiella pneumoniae indol negatif k"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-kizamik",
    "term": "Kızamık",
    "aliases": [
      "Kızamık",
      "measles"
    ],
    "normalizedTerm": "kizamik",
    "TurkishName": "Kızamık",
    "EnglishName": "",
    "category": "Pediatrik enfeksiyon",
    "subcategory": "Pediatrik enfeksiyon",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Aşıyla önlenebilen, döküntülü viral çocukluk çağı enfeksiyonudur.",
    "preAnswerSafeDefinition": "Aşıyla önlenebilen, döküntülü viral çocukluk çağı enfeksiyonudur.",
    "shortDefinition": "Morbillivirusun neden olduğu; ateş, öksürük, konjonktivit, Koplik lekeleri ve makülopapüler döküntüyle seyreden enfeksiyondur.",
    "definition": "Morbillivirusun neden olduğu; ateş, öksürük, konjonktivit, Koplik lekeleri ve makülopapüler döküntüyle seyreden enfeksiyondur.",
    "detailedExplanation": "Kızamık yüksek bulaştırıcılığa sahiptir; Koplik lekeleri ve sefalo-kaudal yayılan döküntü tipiktir. Komplikasyonlar pnömoni, otitis media, ensefalit ve geç SSPE olabilir.",
    "postAnswerExplanation": "Kızamık yüksek bulaştırıcılığa sahiptir; Koplik lekeleri ve sefalo-kaudal yayılan döküntü tipiktir. Komplikasyonlar pnömoni, otitis media, ensefalit ve geç SSPE olabilir.",
    "postAnswerExpandedExplanation": "Kızamık yüksek bulaştırıcılığa sahiptir; Koplik lekeleri ve sefalo-kaudal yayılan döküntü tipiktir. Komplikasyonlar pnömoni, otitis media, ensefalit ve geç SSPE olabilir.",
    "tusPearl": "Koplik lekesi + 3C (cough, coryza, conjunctivitis) + makülopapüler döküntü = kızamık.",
    "examPearl": "Koplik lekesi + 3C (cough, coryza, conjunctivitis) + makülopapüler döküntü = kızamık.",
    "differentialPoint": "Kızamıkçıkta postauriküler LAP; suçiçeğinde farklı evrelerde veziküller görülür.",
    "clinicalRelevance": "Kızamık yüksek bulaştırıcılığa sahiptir; Koplik lekeleri ve sefalo-kaudal yayılan döküntü tipiktir. Komplikasyonlar pnömoni, otitis media, ensefalit ve geç SSPE olabilir.",
    "safeNestedTerms": [
      "Koplik lekesi",
      "MMR aşısı",
      "SSPE",
      "Makülopapüler döküntü",
      "Konjonktivit"
    ],
    "relatedTerms": [
      "Koplik lekesi",
      "MMR aşısı",
      "SSPE",
      "Makülopapüler döküntü",
      "Konjonktivit"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/cases.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryExpandedIndex.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 11,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "id : A , text : Kawasaki hastalığı için IVIG ve aspirin başlamak , id : B , text : Kızamık için yalnız izolasyon ve A vitamini vermek , id : C , text : Streptokok tonsilliti için tek doz penisilin vermek , id : D , text : Anafilaksi için intramüsküler adrena"
      },
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "stionType : diagnosis , answerTarget : diagnosis , diagnosis : correct : IgA vasküliti , options : IgA vasküliti , İmmün trombositopeni , Kızamık , İlaç ürtikeri , Akut lenfadenit , question : Bu çocukta en olası tanı aşağıdakilerden hangisidir? , explanation "
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-hipernatremi",
    "term": "Hipernatremi",
    "aliases": [
      "Hipernatremi",
      "yüksek sodyum"
    ],
    "normalizedTerm": "hipernatremi",
    "TurkishName": "Hipernatremi",
    "EnglishName": "",
    "category": "Elektrolit bozukluğu",
    "subcategory": "Elektrolit bozukluğu",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Serum sodyumu ve su dengesiyle ilişkili elektrolit bozukluğudur.",
    "preAnswerSafeDefinition": "Serum sodyumu ve su dengesiyle ilişkili elektrolit bozukluğudur.",
    "shortDefinition": "Serum sodyum düzeyinin artmasıdır; çoğunlukla su kaybı veya hipertonik sodyum yüküyle ilişkilidir.",
    "definition": "Serum sodyum düzeyinin artmasıdır; çoğunlukla su kaybı veya hipertonik sodyum yüküyle ilişkilidir.",
    "detailedExplanation": "Hipernatremi hücre dışı osmolaliteyi artırarak beyin hücrelerinden su çekilmesine ve nörolojik bulgulara yol açabilir. Düzeltme yavaş yapılmalıdır; hızlı düzeltme beyin ödemi riski taşır.",
    "postAnswerExplanation": "Hipernatremi hücre dışı osmolaliteyi artırarak beyin hücrelerinden su çekilmesine ve nörolojik bulgulara yol açabilir. Düzeltme yavaş yapılmalıdır; hızlı düzeltme beyin ödemi riski taşır.",
    "postAnswerExpandedExplanation": "Hipernatremi hücre dışı osmolaliteyi artırarak beyin hücrelerinden su çekilmesine ve nörolojik bulgulara yol açabilir. Düzeltme yavaş yapılmalıdır; hızlı düzeltme beyin ödemi riski taşır.",
    "tusPearl": "Hipernatremide asıl sorun çoğu zaman su eksikliğidir; düzeltme hızına dikkat et.",
    "examPearl": "Hipernatremide asıl sorun çoğu zaman su eksikliğidir; düzeltme hızına dikkat et.",
    "differentialPoint": "Hiponatremi hücre içine su girişi ve beyin ödemi; hipernatremi hücrelerden su çıkışıyla nörolojik bulgu yapar.",
    "clinicalRelevance": "Hipernatremi hücre dışı osmolaliteyi artırarak beyin hücrelerinden su çekilmesine ve nörolojik bulgulara yol açabilir. Düzeltme yavaş yapılmalıdır; hızlı düzeltme beyin ödemi riski taşır.",
    "safeNestedTerms": [
      "Osmolalite",
      "Dehidratasyon",
      "Diabetes insipidus",
      "Sodyum",
      "Beyin ödemi"
    ],
    "relatedTerms": [
      "Osmolalite",
      "Dehidratasyon",
      "Diabetes insipidus",
      "Sodyum",
      "Beyin ödemi"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusGlossaryExpandedIndex.js",
      "src/data/tusGlossaryV321DeepHighYieldBatch4Index.js"
    ],
    "sourceArea": "Klinik Branş Seç / TUS Spot Olgular",
    "occurrenceCount": 10,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "enezi beklenir; tuz kaybettiren kriz ve virilizasyon tipik değildir. , Santral diyabetes insipidus : Santral diyabetes insipidus poliüri ve hipernatremi yapar; hiperkalemi ve virilizasyon açıklanamaz. , Hipofosfatazik raşitizm : Hipofosfatazik raşitizm kemik m"
      },
      {
        "sourceFilePath": "src/data/tusGlossaryExpandedIndex.js",
        "text": "atremi + yüksek idrar ozmolalitesi + idrar sodyum yüksekliği SIADH düşündürür. , differentialPoint : Diabetes insipidusta su kaybı ve hipernatremi eğilimi beklenir. , clinicalRelevance : Övolemik hiponatremi + yüksek idrar ozmolalitesi + idrar sodyum yüksekliğ"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-fena",
    "term": "FeNa",
    "aliases": [
      "FeNa",
      "fraksiyone sodyum atılımı"
    ],
    "normalizedTerm": "fena",
    "TurkishName": "FeNa",
    "EnglishName": "",
    "category": "Nefroloji indeksi",
    "subcategory": "Nefroloji indeksi",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Akut böbrek hasarında prerenal-intrinsik ayrımına yardımcı olan idrar indeksidir.",
    "preAnswerSafeDefinition": "Akut böbrek hasarında prerenal-intrinsik ayrımına yardımcı olan idrar indeksidir.",
    "shortDefinition": "Filtre edilen sodyumun yüzde kaçının idrarla atıldığını gösteren fraksiyone sodyum atılımı indeksidir.",
    "definition": "Filtre edilen sodyumun yüzde kaçının idrarla atıldığını gösteren fraksiyone sodyum atılımı indeksidir.",
    "detailedExplanation": "FeNa prerenal azotemide genellikle düşüktür; akut tübüler nekrozda artabilir. Diüretik kullanımı sonucu yanıltabilir; bu durumda FeÜre gibi alternatifler değerlendirilebilir.",
    "postAnswerExplanation": "FeNa prerenal azotemide genellikle düşüktür; akut tübüler nekrozda artabilir. Diüretik kullanımı sonucu yanıltabilir; bu durumda FeÜre gibi alternatifler değerlendirilebilir.",
    "postAnswerExpandedExplanation": "FeNa prerenal azotemide genellikle düşüktür; akut tübüler nekrozda artabilir. Diüretik kullanımı sonucu yanıltabilir; bu durumda FeÜre gibi alternatifler değerlendirilebilir.",
    "tusPearl": "Prerenal AKI’de FeNa düşük; ATN’de genellikle yüksektir, diüretik varsa dikkat.",
    "examPearl": "Prerenal AKI’de FeNa düşük; ATN’de genellikle yüksektir, diüretik varsa dikkat.",
    "differentialPoint": "FeNa sodyum işlenmesini; BUN/kreatinin oranı perfüzyon ve üre geri emilimini yansıtır.",
    "clinicalRelevance": "FeNa prerenal azotemide genellikle düşüktür; akut tübüler nekrozda artabilir. Diüretik kullanımı sonucu yanıltabilir; bu durumda FeÜre gibi alternatifler değerlendirilebilir.",
    "safeNestedTerms": [
      "Akut böbrek hasarı",
      "Prerenal azotemi",
      "Akut tübüler nekroz",
      "BUN/kreatinin oranı",
      "Diüretik"
    ],
    "relatedTerms": [
      "Akut böbrek hasarı",
      "Prerenal azotemi",
      "Akut tübüler nekroz",
      "BUN/kreatinin oranı",
      "Diüretik"
    ],
    "matchingPriority": 82,
    "standaloneSafe": false,
    "caseSensitiveDisplay": true,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusGlossaryExpandedIndex.js"
    ],
    "sourceArea": "Klinik Branş Seç / TUS Spot Olgular",
    "occurrenceCount": 9,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": ": Bebek, kusma, kilo kaybı, halsizlik ve dış genital yapı farklılığı nedeniyle getiriliyor. , stem : Doğumdan sonra ilk günlerde emmesinin fena olmadığı ancak son iki gündür kusma, beslenememe ve uykuya eğilim geliştiği öğreniliyor. Aile bebeğin bezinde idrar "
      },
      {
        "sourceFilePath": "src/data/tusGlossaryExpandedIndex.js",
        "text": "ağlı kreatinin/üre artışıdır. Klinik bağlamla birlikte yorumlanmalıdır. , postAnswerExpandedExplanation : BUN/kreatinin oranı yüksek, FeNa düşük ve idrar sodyumu düşük olması prerenal tabloyu destekler. , tusPearl : BUN/kreatinin oranı yüksek, FeNa düşük ve id"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-akciger-kanseri",
    "term": "Akciğer kanseri",
    "aliases": [
      "Akciğer kanseri",
      "bronş kanseri"
    ],
    "normalizedTerm": "akciger kanseri",
    "TurkishName": "Akciğer kanseri",
    "EnglishName": "",
    "category": "Onkoloji / pulmonoloji",
    "subcategory": "Onkoloji",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Solunum semptomları, sigara öyküsü, görüntüleme ve histolojiyle değerlendirilen malignitedir.",
    "preAnswerSafeDefinition": "Solunum semptomları, sigara öyküsü, görüntüleme ve histolojiyle değerlendirilen malignitedir.",
    "shortDefinition": "Akciğer dokusu veya bronş epitelinden kaynaklanan maligniteleri kapsayan hastalık grubudur.",
    "definition": "Akciğer dokusu veya bronş epitelinden kaynaklanan maligniteleri kapsayan hastalık grubudur.",
    "detailedExplanation": "Akciğer kanserinde küçük hücreli ve küçük hücreli dışı ayrımı tedavi ve prognozu etkiler. Paraneoplastik sendromlar, hemoptizi, kilo kaybı ve sigara öyküsü sınav ipuçlarıdır.",
    "postAnswerExplanation": "Akciğer kanserinde küçük hücreli ve küçük hücreli dışı ayrımı tedavi ve prognozu etkiler. Paraneoplastik sendromlar, hemoptizi, kilo kaybı ve sigara öyküsü sınav ipuçlarıdır.",
    "postAnswerExpandedExplanation": "Akciğer kanserinde küçük hücreli ve küçük hücreli dışı ayrımı tedavi ve prognozu etkiler. Paraneoplastik sendromlar, hemoptizi, kilo kaybı ve sigara öyküsü sınav ipuçlarıdır.",
    "tusPearl": "Santral kitle + SIADH/Cushing = küçük hücreli; hiperkalsemi = skuamöz hücreli akciğer kanseri düşün.",
    "examPearl": "Santral kitle + SIADH/Cushing = küçük hücreli; hiperkalsemi = skuamöz hücreli akciğer kanseri düşün.",
    "differentialPoint": "Pnömoni enfeksiyon ve tedavi yanıtıyla; malignite persistan kitle, kilo kaybı ve hemoptiziyle ayrılır.",
    "clinicalRelevance": "Akciğer kanserinde küçük hücreli ve küçük hücreli dışı ayrımı tedavi ve prognozu etkiler. Paraneoplastik sendromlar, hemoptizi, kilo kaybı ve sigara öyküsü sınav ipuçlarıdır.",
    "safeNestedTerms": [
      "Küçük hücreli akciğer kanseri",
      "Paraneoplastik sendrom",
      "Hemoptizi",
      "Sigara",
      "PTHrP"
    ],
    "relatedTerms": [
      "Küçük hücreli akciğer kanseri",
      "Paraneoplastik sendrom",
      "Hemoptizi",
      "Sigara",
      "PTHrP"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/tusPearlCards.js",
    "sourceFiles": [
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryExpandedIndex.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 8,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "ect : Tıbbi Patoloji , topic : Akciğer skuamöz karsinom , mainQuestion : Santral yerleşim ve PTHrP ilişkili hiperkalsemi hangi akciğer kanseriyle klasikleşir? , mainAnswer : Skuamöz hücreli karsinom. , explanation : Sigara ilişkili, keratin incileri ve interse"
      },
      {
        "sourceFilePath": "src/data/tusGlossaryExpandedIndex.js",
        "text": "ağlamla birlikte yorumlanmalıdır. , postAnswerExpandedExplanation : Proksimal güçsüzlük + kullanım sonrası güç artışı + küçük hücreli akciğer kanseri ilişkisi önemlidir. , tusPearl : Proksimal güçsüzlük + kullanım sonrası güç artışı + küçük hücreli akciğer kan"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-kalsiyum-kanal-blokeri",
    "term": "Kalsiyum kanal blokeri",
    "aliases": [
      "Kalsiyum kanal blokeri",
      "CCB"
    ],
    "normalizedTerm": "kalsiyum kanal blokeri",
    "TurkishName": "Kalsiyum kanal blokeri",
    "EnglishName": "",
    "category": "Farmakoloji",
    "subcategory": "Farmakoloji",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Hipertansiyon, aritmi veya toksikoloji yönetimiyle ilişkili ilaç grubudur.",
    "preAnswerSafeDefinition": "Hipertansiyon, aritmi veya toksikoloji yönetimiyle ilişkili ilaç grubudur.",
    "shortDefinition": "L tipi kalsiyum kanallarını inhibe ederek damar düz kası ve/veya kalp iletim-kontraktilitesini etkileyen ilaç grubudur.",
    "definition": "L tipi kalsiyum kanallarını inhibe ederek damar düz kası ve/veya kalp iletim-kontraktilitesini etkileyen ilaç grubudur.",
    "detailedExplanation": "Dihidropiridinler daha çok vazodilatasyon yaparken verapamil/diltiazem kalp hızını ve AV iletimi azaltır. Toksisitede hipotansiyon, bradikardi ve hiperglisemi görülebilir; yüksek doz insülin-euglisemi tedavisi önemlidir.",
    "postAnswerExplanation": "Dihidropiridinler daha çok vazodilatasyon yaparken verapamil/diltiazem kalp hızını ve AV iletimi azaltır. Toksisitede hipotansiyon, bradikardi ve hiperglisemi görülebilir; yüksek doz insülin-euglisemi tedavisi önemlidir.",
    "postAnswerExpandedExplanation": "Dihidropiridinler daha çok vazodilatasyon yaparken verapamil/diltiazem kalp hızını ve AV iletimi azaltır. Toksisitede hipotansiyon, bradikardi ve hiperglisemi görülebilir; yüksek doz insülin-euglisemi tedavisi önemlidir.",
    "tusPearl": "CCB toksisitesi = bradikardi/hipotansiyon + hiperglisemi; yüksek doz insülin-euglisemi tedavisi akılda olmalı.",
    "examPearl": "CCB toksisitesi = bradikardi/hipotansiyon + hiperglisemi; yüksek doz insülin-euglisemi tedavisi akılda olmalı.",
    "differentialPoint": "Beta bloker toksisitesi hipoglisemi eğilimi yapabilir; CCB toksisitesinde hiperglisemi daha tipiktir.",
    "clinicalRelevance": "Dihidropiridinler daha çok vazodilatasyon yaparken verapamil/diltiazem kalp hızını ve AV iletimi azaltır. Toksisitede hipotansiyon, bradikardi ve hiperglisemi görülebilir; yüksek doz insülin-euglisemi tedavisi önemlidir.",
    "safeNestedTerms": [
      "Verapamil",
      "Diltiazem",
      "Hipotansiyon",
      "Yüksek doz insülin-euglisemi tedavisi",
      "Bradikardi"
    ],
    "relatedTerms": [
      "Verapamil",
      "Diltiazem",
      "Hipotansiyon",
      "Yüksek doz insülin-euglisemi tedavisi",
      "Bradikardi"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/pdfPediatricArrhythmiaCases.js",
    "sourceFiles": [
      "src/data/pdfPediatricArrhythmiaCases.js",
      "src/data/tusGlossaryV319TeachableIndex.js"
    ],
    "sourceArea": "Klinik Branş Seç / TUS Spot / Hap Kart",
    "occurrenceCount": 8,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/pdfPediatricArrhythmiaCases.js",
        "text": "kalbin hızlı atması atakları yaşıyor. Bugün kalp hızı 220/dk iken acile getiriliyor ve damar yolu açılırken ritim kendiliğinden sonlanıyor. Kalsiyum kanal blokerine rağmen ataklar sürüyor ve ilaç belirgin kabızlık yapıyor. , vitals : TA : 104/64 mmHg , Nabız :"
      },
      {
        "sourceFilePath": "src/data/tusGlossaryV319TeachableIndex.js",
        "text": ": long-tail teachable candidate , sourceLayer : V319 teachable glossary quality filter , previewDefinition : Beta bloker veya kalsiyum kanal blokeri zehirlenmesinde miyokard enerji kullanımını desteklemek için verilen insülin-glukoz tedavisidir. , preAnswerSaf"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-serviks-kanseri",
    "term": "Serviks kanseri",
    "aliases": [
      "Serviks kanseri",
      "rahim ağzı kanseri"
    ],
    "normalizedTerm": "serviks kanseri",
    "TurkishName": "Serviks kanseri",
    "EnglishName": "",
    "category": "Jinekolojik onkoloji",
    "subcategory": "Jinekolojik onkoloji",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "HPV ilişkisi ve tarama testleriyle değerlendirilen jinekolojik kanserdir.",
    "preAnswerSafeDefinition": "HPV ilişkisi ve tarama testleriyle değerlendirilen jinekolojik kanserdir.",
    "shortDefinition": "Serviks epitelinden kaynaklanan, çoğunlukla yüksek riskli HPV enfeksiyonuyla ilişkili jinekolojik malignitedir.",
    "definition": "Serviks epitelinden kaynaklanan, çoğunlukla yüksek riskli HPV enfeksiyonuyla ilişkili jinekolojik malignitedir.",
    "detailedExplanation": "Serviks kanseri gelişiminde HPV 16/18 ve E6/E7 onkoproteinleri önemlidir. Pap smear ve HPV testi taramada, kolposkopi-biyopsi tanıda kullanılır; aşılama koruyucudur.",
    "postAnswerExplanation": "Serviks kanseri gelişiminde HPV 16/18 ve E6/E7 onkoproteinleri önemlidir. Pap smear ve HPV testi taramada, kolposkopi-biyopsi tanıda kullanılır; aşılama koruyucudur.",
    "postAnswerExpandedExplanation": "Serviks kanseri gelişiminde HPV 16/18 ve E6/E7 onkoproteinleri önemlidir. Pap smear ve HPV testi taramada, kolposkopi-biyopsi tanıda kullanılır; aşılama koruyucudur.",
    "tusPearl": "Serviks kanserinde HPV 16/18, Pap smear/HPV testi ve kolposkopi bağlantısını bil.",
    "examPearl": "Serviks kanserinde HPV 16/18, Pap smear/HPV testi ve kolposkopi bağlantısını bil.",
    "differentialPoint": "Endometrium kanseri postmenopozal kanama ve endometrial biyopsiyle; serviks kanseri HPV ve servikal tarama ile öne çıkar.",
    "clinicalRelevance": "Serviks kanseri gelişiminde HPV 16/18 ve E6/E7 onkoproteinleri önemlidir. Pap smear ve HPV testi taramada, kolposkopi-biyopsi tanıda kullanılır; aşılama koruyucudur.",
    "safeNestedTerms": [
      "HPV",
      "Pap smear",
      "Kolposkopi",
      "E6/E7",
      "Servikal intraepitelyal neoplazi"
    ],
    "relatedTerms": [
      "HPV",
      "Pap smear",
      "Kolposkopi",
      "E6/E7",
      "Servikal intraepitelyal neoplazi"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/aiTopicPools.js",
    "sourceFiles": [
      "src/data/aiTopicPools.js",
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryV321DeepHighYieldBatch4Index.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 8,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/aiTopicPools.js",
        "text": "filaksisi', 'Gestasyonel diyabet taraması', 'Pelvik inflamatuvar hastalık', 'Over torsiyonu', 'Endometriozis', 'PCOS tanı kriterleri', 'Serviks kanseri taraması', , 'minor-rotations': 'Akut iskemik inme tromboliz', 'Subaraknoid kanama', 'Guillain-Barré sendrom"
      },
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "azı yapabilir. , keywords : koryokarsinom , hematojen metastaz , akciğer , beta-hCG , trap : Serviks kanserinde lenfatik yayılım daha ön plandadır. , extraQuestion : Vaka kökünde koryokarsinom, akciğer ve beta-hCG birlikte verilirse hangi komplikasyon veya kli"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-wolff-parkinson-white-sendromu",
    "term": "Wolff-Parkinson-White sendromu",
    "aliases": [
      "Wolff-Parkinson-White sendromu",
      "WPW"
    ],
    "normalizedTerm": "wolff-parkinson-white sendromu",
    "TurkishName": "Wolff-Parkinson-White sendromu",
    "EnglishName": "",
    "category": "Aritmi jargonu",
    "subcategory": "Aritmi jargonu",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Aksesuar yol ve taşiaritmi riskiyle ilişkili EKG/aritmi sendromudur.",
    "preAnswerSafeDefinition": "Aksesuar yol ve taşiaritmi riskiyle ilişkili EKG/aritmi sendromudur.",
    "shortDefinition": "Aksesuar yol nedeniyle ventriküllerin erken uyarıldığı, kısa PR ve delta dalgasıyla karakterize preeksitasyon sendromudur.",
    "definition": "Aksesuar yol nedeniyle ventriküllerin erken uyarıldığı, kısa PR ve delta dalgasıyla karakterize preeksitasyon sendromudur.",
    "detailedExplanation": "WPW’de AV nodu bypass eden aksesuar yol nedeniyle delta dalgası oluşur. Atriyal fibrilasyon eşlik ederse AV nod blokerleri riskli olabilir; geniş düzensiz taşikardide dikkat gerekir.",
    "postAnswerExplanation": "WPW’de AV nodu bypass eden aksesuar yol nedeniyle delta dalgası oluşur. Atriyal fibrilasyon eşlik ederse AV nod blokerleri riskli olabilir; geniş düzensiz taşikardide dikkat gerekir.",
    "postAnswerExpandedExplanation": "WPW’de AV nodu bypass eden aksesuar yol nedeniyle delta dalgası oluşur. Atriyal fibrilasyon eşlik ederse AV nod blokerleri riskli olabilir; geniş düzensiz taşikardide dikkat gerekir.",
    "tusPearl": "Kısa PR + delta dalgası = WPW; AF + WPW’de AV nod blokerlerinden kaçın.",
    "examPearl": "Kısa PR + delta dalgası = WPW; AF + WPW’de AV nod blokerlerinden kaçın.",
    "differentialPoint": "AVNRT AV nod reentry; WPW aksesuar yol ve preeksitasyon bulgularıyla ayrılır.",
    "clinicalRelevance": "WPW’de AV nodu bypass eden aksesuar yol nedeniyle delta dalgası oluşur. Atriyal fibrilasyon eşlik ederse AV nod blokerleri riskli olabilir; geniş düzensiz taşikardide dikkat gerekir.",
    "safeNestedTerms": [
      "Delta dalgası",
      "Kısa PR",
      "Aksesuar yol",
      "Atriyal fibrilasyon",
      "Ablasyon"
    ],
    "relatedTerms": [
      "Delta dalgası",
      "Kısa PR",
      "Aksesuar yol",
      "Atriyal fibrilasyon",
      "Ablasyon"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/pdfPediatricArrhythmiaCases.js",
    "sourceFiles": [
      "src/data/pdfPediatricArrhythmiaCases.js"
    ],
    "sourceArea": "Klinik Branş Seç / TUS Spot / Hap Kart",
    "occurrenceCount": 8,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/pdfPediatricArrhythmiaCases.js",
        "text": "Kanalopati , Hipertrofik kardiyomiyopati , CPVT , Proband , id : pdf-peds-arrhythmia-asymptomatic-wpw-013 , branchId : pediatrics , title : Asemptomatik çocukta EKG’de ventriküler preeksitasyon , type : Klasik vaka , demographics : 7 yaşında erkek çocuk , sett"
      },
      {
        "sourceFilePath": "src/data/pdfPediatricArrhythmiaCases.js",
        "text": "WPW terimi bu kaynak dosyada geçmektedir; raw kaynak metinde biçimsel kaçış/JSON sıkıştırması nedeniyle bağlam otomatik kısaltılmıştır."
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-akut-perikardit",
    "term": "Akut perikardit",
    "aliases": [
      "Akut perikardit",
      "perikardit"
    ],
    "normalizedTerm": "akut perikardit",
    "TurkishName": "Akut perikardit",
    "EnglishName": "",
    "category": "Kardiyoloji",
    "subcategory": "Kardiyoloji",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Göğüs ağrısı ve perikard inflamasyonuyla ilişkili klinik tablodur.",
    "preAnswerSafeDefinition": "Göğüs ağrısı ve perikard inflamasyonuyla ilişkili klinik tablodur.",
    "shortDefinition": "Perikardın akut inflamasyonudur; pozisyonla değişen göğüs ağrısı, perikardiyal sürtünme sesi ve yaygın ST elevasyonu yapabilir.",
    "definition": "Perikardın akut inflamasyonudur; pozisyonla değişen göğüs ağrısı, perikardiyal sürtünme sesi ve yaygın ST elevasyonu yapabilir.",
    "detailedExplanation": "Akut perikarditte ağrı öne eğilmekle azalabilir, sırtüstü artabilir. EKG’de yaygın konkav ST elevasyonu ve PR depresyonu görülebilir; tamponad bulguları aciliyet yaratır.",
    "postAnswerExplanation": "Akut perikarditte ağrı öne eğilmekle azalabilir, sırtüstü artabilir. EKG’de yaygın konkav ST elevasyonu ve PR depresyonu görülebilir; tamponad bulguları aciliyet yaratır.",
    "postAnswerExpandedExplanation": "Akut perikarditte ağrı öne eğilmekle azalabilir, sırtüstü artabilir. EKG’de yaygın konkav ST elevasyonu ve PR depresyonu görülebilir; tamponad bulguları aciliyet yaratır.",
    "tusPearl": "Yaygın ST elevasyonu + PR depresyonu + öne eğilmekle rahatlayan ağrı = akut perikardit.",
    "examPearl": "Yaygın ST elevasyonu + PR depresyonu + öne eğilmekle rahatlayan ağrı = akut perikardit.",
    "differentialPoint": "STEMI’de bölgesel ST elevasyonu ve koroner dağılım; perikarditte yaygın ST değişikliği beklenir.",
    "clinicalRelevance": "Akut perikarditte ağrı öne eğilmekle azalabilir, sırtüstü artabilir. EKG’de yaygın konkav ST elevasyonu ve PR depresyonu görülebilir; tamponad bulguları aciliyet yaratır.",
    "safeNestedTerms": [
      "Perikardiyal sürtünme sesi",
      "PR depresyonu",
      "ST elevasyonu",
      "Kardiyak tamponad",
      "NSAİİ"
    ],
    "relatedTerms": [
      "Perikardiyal sürtünme sesi",
      "PR depresyonu",
      "ST elevasyonu",
      "Kardiyak tamponad",
      "NSAİİ"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/tusGlossaryExpandedIndex.js",
    "sourceFiles": [
      "src/data/tusGlossaryExpandedIndex.js",
      "src/data/tusGlossaryCandidateAuditIndex.js",
      "src/utils/displayText.js"
    ],
    "sourceArea": "Klinik Branş Seç / TUS Spot / Hap Kart",
    "occurrenceCount": 7,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/tusGlossaryExpandedIndex.js",
        "text": "Uyumlu klinikte komşu derivasyonlarda ST elevasyonu STEMI kabul edilerek reperfüzyon penceresi değerlendirilir. , differentialPoint : Perikarditte yaygın konkav ST elevasyonu ve PR depresyonu daha tipiktir; STEMI bölgesel damar dağılımı gösterir. , clinicalRel"
      },
      {
        "sourceFilePath": "src/data/tusGlossaryCandidateAuditIndex.js",
        "text": "ion : Böbrek fonksiyon kaybı ve metabolik atık birikimiyle ilişkili klinik kavramdır. , postAnswerExplanation : Üremik ensefalopati, perikardit, bulantı, kaşıntı ve kanama eğilimi gibi sistemik bulgular oluşturabilir. , tusPearl : Üremik perikardit veya ensefa"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-bun-kreatinin-orani",
    "term": "BUN/kreatinin oranı",
    "aliases": [
      "BUN/kreatinin oranı",
      "BUN kreatinin oranı"
    ],
    "normalizedTerm": "bun/kreatinin orani",
    "TurkishName": "BUN/kreatinin oranı",
    "EnglishName": "",
    "category": "Nefroloji laboratuvarı",
    "subcategory": "Nefroloji laboratuvarı",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Böbrek fonksiyonu ve volüm/perfüzyon durumunu yorumlamaya yardımcı laboratuvar oranıdır.",
    "preAnswerSafeDefinition": "Böbrek fonksiyonu ve volüm/perfüzyon durumunu yorumlamaya yardımcı laboratuvar oranıdır.",
    "shortDefinition": "Kan üre azotu ile kreatinin arasındaki oran olup prerenal azotemi ve renal perfüzyon değerlendirmesinde yardımcıdır.",
    "definition": "Kan üre azotu ile kreatinin arasındaki oran olup prerenal azotemi ve renal perfüzyon değerlendirmesinde yardımcıdır.",
    "detailedExplanation": "Prerenal azotemide üre geri emilimi arttığı için BUN/kreatinin oranı yükselebilir. Gastrointestinal kanama ve yüksek protein katabolizması da BUN’u artırabilir.",
    "postAnswerExplanation": "Prerenal azotemide üre geri emilimi arttığı için BUN/kreatinin oranı yükselebilir. Gastrointestinal kanama ve yüksek protein katabolizması da BUN’u artırabilir.",
    "postAnswerExpandedExplanation": "Prerenal azotemide üre geri emilimi arttığı için BUN/kreatinin oranı yükselebilir. Gastrointestinal kanama ve yüksek protein katabolizması da BUN’u artırabilir.",
    "tusPearl": "AKI’de BUN/kreatinin yüksekliği prerenal nedenleri destekleyebilir; tek başına tanı koydurmaz.",
    "examPearl": "AKI’de BUN/kreatinin yüksekliği prerenal nedenleri destekleyebilir; tek başına tanı koydurmaz.",
    "differentialPoint": "FeNa idrar sodyum işlenmesini; BUN/kreatinin oranı üre geri emilimi ve perfüzyonu yansıtır.",
    "clinicalRelevance": "Prerenal azotemide üre geri emilimi arttığı için BUN/kreatinin oranı yükselebilir. Gastrointestinal kanama ve yüksek protein katabolizması da BUN’u artırabilir.",
    "safeNestedTerms": [
      "Akut böbrek hasarı",
      "Prerenal azotemi",
      "FeNa",
      "Dehidratasyon",
      "Gastrointestinal kanama"
    ],
    "relatedTerms": [
      "Akut böbrek hasarı",
      "Prerenal azotemi",
      "FeNa",
      "Dehidratasyon",
      "Gastrointestinal kanama"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/tusGlossaryExpandedIndex.js",
    "sourceFiles": [
      "src/data/tusGlossaryExpandedIndex.js",
      "src/data/tusGlossaryClinicalBranchDeepIndex.js",
      "src/data/tusGlossaryContentCoverageIndex.js"
    ],
    "sourceArea": "Glossary body / nested terms",
    "occurrenceCount": 7,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/tusGlossaryExpandedIndex.js",
        "text": "Renal perfüzyon azalmasına bağlı kreatinin/üre artışıdır. Klinik bağlamla birlikte yorumlanmalıdır. , postAnswerExpandedExplanation : BUN/kreatinin oranı yüksek, FeNa düşük ve idrar sodyumu düşük olması prerenal tabloyu destekler. , tusPearl : BUN/kreatinin or"
      },
      {
        "sourceFilePath": "src/data/tusGlossaryClinicalBranchDeepIndex.js",
        "text": "tAnswerExpandedExplanation : Protein metabolizması sonucu oluşan ürenin kandaki azot karşılığını gösteren parametredir. Prerenal azotemide BUN/kreatinin oranı artabilir. , tusPearl : Prerenal azotemide BUN/kreatinin oranı artabilir. , differentialPoint : Kreat"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-propiltiyourasil",
    "term": "Propiltiyourasil",
    "aliases": [
      "Propiltiyourasil",
      "PTU"
    ],
    "normalizedTerm": "propiltiyourasil",
    "TurkishName": "Propiltiyourasil",
    "EnglishName": "",
    "category": "Antitiroid ilaç",
    "subcategory": "Antitiroid ilaç",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Hipertiroidi ve tiroid fırtınası yönetiminde kullanılan antitiroid ilaçtır.",
    "preAnswerSafeDefinition": "Hipertiroidi ve tiroid fırtınası yönetiminde kullanılan antitiroid ilaçtır.",
    "shortDefinition": "Tiroid hormon sentezini ve periferik T4’ten T3’e dönüşümü azaltan antitiroid ilaçtır.",
    "definition": "Tiroid hormon sentezini ve periferik T4’ten T3’e dönüşümü azaltan antitiroid ilaçtır.",
    "detailedExplanation": "PTU tiroid peroksidazı inhibe eder ve periferik T4-T3 dönüşümünü azaltır. İlk trimester gebelikte ve tiroid fırtınasında tercih edilebilir; hepatotoksisite riski önemlidir.",
    "postAnswerExplanation": "PTU tiroid peroksidazı inhibe eder ve periferik T4-T3 dönüşümünü azaltır. İlk trimester gebelikte ve tiroid fırtınasında tercih edilebilir; hepatotoksisite riski önemlidir.",
    "postAnswerExpandedExplanation": "PTU tiroid peroksidazı inhibe eder ve periferik T4-T3 dönüşümünü azaltır. İlk trimester gebelikte ve tiroid fırtınasında tercih edilebilir; hepatotoksisite riski önemlidir.",
    "tusPearl": "Tiroid fırtınasında beta bloker + PTU/metimazol + iyot sıralamasına dikkat; PTU T4-T3 dönüşümünü de azaltır.",
    "examPearl": "Tiroid fırtınasında beta bloker + PTU/metimazol + iyot sıralamasına dikkat; PTU T4-T3 dönüşümünü de azaltır.",
    "differentialPoint": "Metimazol genelde tercih edilir; PTU ilk trimester ve tiroid fırtınası bağlamında öne çıkar.",
    "clinicalRelevance": "PTU tiroid peroksidazı inhibe eder ve periferik T4-T3 dönüşümünü azaltır. İlk trimester gebelikte ve tiroid fırtınasında tercih edilebilir; hepatotoksisite riski önemlidir.",
    "safeNestedTerms": [
      "Tiroid fırtınası",
      "Metimazol",
      "T4-T3 dönüşümü",
      "Hepatotoksisite",
      "Graves hastalığı"
    ],
    "relatedTerms": [
      "Tiroid fırtınası",
      "Metimazol",
      "T4-T3 dönüşümü",
      "Hepatotoksisite",
      "Graves hastalığı"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/tusGlossaryV319TeachableIndex.js",
    "sourceFiles": [
      "src/data/tusGlossaryV319TeachableIndex.js",
      "src/utils/clinicalScientificAccuracyGate.js"
    ],
    "sourceArea": "Klinik Branş Seç / TUS Spot / Hap Kart",
    "occurrenceCount": 7,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/tusGlossaryV319TeachableIndex.js",
        "text": "on : Metimazol tedavisi sırasında gelişebilen ciddi nötropeni/agranülositoz komplikasyonudur. , detailedExplanation : Metimazol veya propiltiyourasil kullanan hastada ateş ve boğaz ağrısı gelişirse agranülositoz düşünülmeli ve kan sayımı değerlendirilmelidir. "
      },
      {
        "sourceFilePath": "src/utils/clinicalScientificAccuracyGate.js",
        "text": "k\\s+kriz|tiroid\\s+firtinasi|thyroid\\s+storm/.test(text) && hasExplicitManagementIntent(question)) if (!/beta\\s*bloker|propranolol|ptu|propiltiyourasil|metimazol|iyot|lugol|steroid|hidrokortizon/.test(correct)) return errors: 'thyroid-adrenal-rule: tirotoksik k"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-sucicegi",
    "term": "Suçiçeği",
    "aliases": [
      "Suçiçeği",
      "varisella"
    ],
    "normalizedTerm": "sucicegi",
    "TurkishName": "Suçiçeği",
    "EnglishName": "",
    "category": "Pediatrik enfeksiyon",
    "subcategory": "Pediatrik enfeksiyon",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Döküntülü çocukluk çağı enfeksiyonu ve VZV ile ilişkili klinik tablodur.",
    "preAnswerSafeDefinition": "Döküntülü çocukluk çağı enfeksiyonu ve VZV ile ilişkili klinik tablodur.",
    "shortDefinition": "Varicella-zoster virüsünün primer enfeksiyonudur; farklı evrelerde veziküler döküntülerle seyreder.",
    "definition": "Varicella-zoster virüsünün primer enfeksiyonudur; farklı evrelerde veziküler döküntülerle seyreder.",
    "detailedExplanation": "Suçiçeğinde makül, papül, vezikül ve kabuklanma aynı anda görülebilir. Erişkinde ve immünsüpresyonda daha ağır seyreder; reaktivasyonu zona oluşturur.",
    "postAnswerExplanation": "Suçiçeğinde makül, papül, vezikül ve kabuklanma aynı anda görülebilir. Erişkinde ve immünsüpresyonda daha ağır seyreder; reaktivasyonu zona oluşturur.",
    "postAnswerExpandedExplanation": "Suçiçeğinde makül, papül, vezikül ve kabuklanma aynı anda görülebilir. Erişkinde ve immünsüpresyonda daha ağır seyreder; reaktivasyonu zona oluşturur.",
    "tusPearl": "Farklı evrelerde kaşıntılı veziküler döküntü = suçiçeği.",
    "examPearl": "Farklı evrelerde kaşıntılı veziküler döküntü = suçiçeği.",
    "differentialPoint": "Kızamık makülopapüler ve Koplik lekeli; suçiçeği veziküler ve farklı evreli döküntülerle ayrılır.",
    "clinicalRelevance": "Suçiçeğinde makül, papül, vezikül ve kabuklanma aynı anda görülebilir. Erişkinde ve immünsüpresyonda daha ağır seyreder; reaktivasyonu zona oluşturur.",
    "safeNestedTerms": [
      "VZV",
      "Zona",
      "Veziküler döküntü",
      "Kızamık",
      "Aşı"
    ],
    "relatedTerms": [
      "VZV",
      "Zona",
      "Veziküler döküntü",
      "Kızamık",
      "Aşı"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusPearlCards.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 7,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "edeniyle başvuruyor. , stem : Döküntünün tek taraflı başladığı, yanma tarzında ağrı ve gözde kızarıklık eşlik ettiği öğreniliyor. Daha önce suçiçeği geçirmiştir. , patientIntro : profile : 67 yaşında kadın hasta, acil serviste göz hastalıkları açısından değerl"
      },
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "logy , subject : Tıbbi Mikrobiyoloji , topic : Varicella neonatal profilaksi , mainQuestion : Doğuma yakın dönemde annede suçiçeği döküntüsü gelişirse yenidoğana ne verilmelidir? , mainAnswer : Varicella-zoster immünoglobulini. , explanation : Doğum çevresinde"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-alzheimer-hastaligi",
    "term": "Alzheimer hastalığı",
    "aliases": [
      "Alzheimer hastalığı",
      "Alzheimer"
    ],
    "normalizedTerm": "alzheimer hastaligi",
    "TurkishName": "Alzheimer hastalığı",
    "EnglishName": "",
    "category": "Nörodejeneratif hastalık",
    "subcategory": "Nörodejeneratif hastalık",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Demans ve ilerleyici bilişsel kayıpla ilişkili nörodejeneratif hastalıktır.",
    "preAnswerSafeDefinition": "Demans ve ilerleyici bilişsel kayıpla ilişkili nörodejeneratif hastalıktır.",
    "shortDefinition": "İlerleyici epizodik bellek kaybı ve bilişsel bozulmayla seyreden nörodejeneratif demans nedenidir.",
    "definition": "İlerleyici epizodik bellek kaybı ve bilişsel bozulmayla seyreden nörodejeneratif demans nedenidir.",
    "detailedExplanation": "Alzheimer hastalığında beta-amiloid plaklar ve tau nörofibriler yumakları klasik patolojik bulgulardır. Erken dönemde yeni bilgi öğrenme/bellek etkilenir; ilerleyen evrede işlevsellik bozulur.",
    "postAnswerExplanation": "Alzheimer hastalığında beta-amiloid plaklar ve tau nörofibriler yumakları klasik patolojik bulgulardır. Erken dönemde yeni bilgi öğrenme/bellek etkilenir; ilerleyen evrede işlevsellik bozulur.",
    "postAnswerExpandedExplanation": "Alzheimer hastalığında beta-amiloid plaklar ve tau nörofibriler yumakları klasik patolojik bulgulardır. Erken dönemde yeni bilgi öğrenme/bellek etkilenir; ilerleyen evrede işlevsellik bozulur.",
    "tusPearl": "Yaşlıda sinsi ilerleyen bellek kaybı + günlük yaşam işlev kaybı = Alzheimer demansı düşün.",
    "examPearl": "Yaşlıda sinsi ilerleyen bellek kaybı + günlük yaşam işlev kaybı = Alzheimer demansı düşün.",
    "differentialPoint": "Vasküler demans basamaklı kötüleşme ve fokal bulgularla; Alzheimer sinsi progresyonla ayrılır.",
    "clinicalRelevance": "Alzheimer hastalığında beta-amiloid plaklar ve tau nörofibriler yumakları klasik patolojik bulgulardır. Erken dönemde yeni bilgi öğrenme/bellek etkilenir; ilerleyen evrede işlevsellik bozulur.",
    "safeNestedTerms": [
      "Demans",
      "Beta-amiloid",
      "Tau",
      "Hafıza kaybı",
      "Vasküler demans"
    ],
    "relatedTerms": [
      "Demans",
      "Beta-amiloid",
      "Tau",
      "Hafıza kaybı",
      "Vasküler demans"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "medium",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/tusPearlCards.js",
    "sourceFiles": [
      "src/data/tusPearlCards.js",
      "src/data/tusGlossaryExpandedIndex.js",
      "src/data/tusGlossaryClinicalBranchDeepIndex.js",
      "src/utils/glossary.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 6,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "keywords : geriatrik depresyon , psödodemans , ipucuyla hatırlama , motivasyon kaybı , trap : Alzheimer hastalığında ipucuyla hatırlama da giderek bozulur. , extraQuestion : Vaka kökünde psödodemans, ipucuyla hatırlama ve motivasyon kaybı birlikte verilirse ha"
      },
      {
        "sourceFilePath": "src/data/tusGlossaryExpandedIndex.js",
        "text": "nlük yaşamı etkileyen ilerleyici bilişsel işlev kaybıdır. Klinik bağlamla birlikte yorumlanmalıdır. , postAnswerExpandedExplanation : Alzheimer’da erken epizodik bellek kaybı; Lewy cisimcikli demansta görsel halüsinasyon/parkinsonizm öne çıkar. , tusPearl : Al"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-hba1c",
    "term": "HbA1c",
    "aliases": [
      "HbA1c",
      "glikozile hemoglobin"
    ],
    "normalizedTerm": "hba1c",
    "TurkishName": "HbA1c",
    "EnglishName": "",
    "category": "Endokrin laboratuvarı",
    "subcategory": "Endokrin laboratuvarı",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Diyabet tanı ve takip sürecinde kullanılan uzun dönem glisemi göstergesidir.",
    "preAnswerSafeDefinition": "Diyabet tanı ve takip sürecinde kullanılan uzun dönem glisemi göstergesidir.",
    "shortDefinition": "Hemoglobinin glikozillenmiş formudur; son yaklaşık 2–3 aylık ortalama glisemiyi yansıtır.",
    "definition": "Hemoglobinin glikozillenmiş formudur; son yaklaşık 2–3 aylık ortalama glisemiyi yansıtır.",
    "detailedExplanation": "HbA1c eritrosit ömrüne bağlıdır; hemolitik anemi, kan transfüzyonu veya bazı hemoglobinopatiler sonucu etkileyebilir. Diyabet kontrolünü değerlendirirken akut glukoz değerlerinden farklı zaman ölçeğini yansıtır.",
    "postAnswerExplanation": "HbA1c eritrosit ömrüne bağlıdır; hemolitik anemi, kan transfüzyonu veya bazı hemoglobinopatiler sonucu etkileyebilir. Diyabet kontrolünü değerlendirirken akut glukoz değerlerinden farklı zaman ölçeğini yansıtır.",
    "postAnswerExpandedExplanation": "HbA1c eritrosit ömrüne bağlıdır; hemolitik anemi, kan transfüzyonu veya bazı hemoglobinopatiler sonucu etkileyebilir. Diyabet kontrolünü değerlendirirken akut glukoz değerlerinden farklı zaman ölçeğini yansıtır.",
    "tusPearl": "HbA1c kronik glisemiyi gösterir; akut hiperglisemi/hipoglisemiyi tek başına açıklamaz.",
    "examPearl": "HbA1c kronik glisemiyi gösterir; akut hiperglisemi/hipoglisemiyi tek başına açıklamaz.",
    "differentialPoint": "Açlık glukozu anlık/erken durumu; HbA1c uzun dönem ortalamayı gösterir.",
    "clinicalRelevance": "HbA1c eritrosit ömrüne bağlıdır; hemolitik anemi, kan transfüzyonu veya bazı hemoglobinopatiler sonucu etkileyebilir. Diyabet kontrolünü değerlendirirken akut glukoz değerlerinden farklı zaman ölçeğini yansıtır.",
    "safeNestedTerms": [
      "Diyabet",
      "Hiperglisemi",
      "Eritrosit ömrü",
      "Açlık glukozu",
      "Gestasyonel diyabet"
    ],
    "relatedTerms": [
      "Diyabet",
      "Hiperglisemi",
      "Eritrosit ömrü",
      "Açlık glukozu",
      "Gestasyonel diyabet"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": true,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/tusGlossaryV321DeepHighYieldBatch4Index.js",
    "sourceFiles": [
      "src/data/tusGlossaryV321DeepHighYieldBatch4Index.js",
      "src/utils/clinicalValueFormatters.js",
      "src/components/CasePlayer.jsx"
    ],
    "sourceArea": "Klinik Branş Seç / TUS Spot / Hap Kart",
    "occurrenceCount": 6,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/tusGlossaryV321DeepHighYieldBatch4Index.js",
        "text": "hes : endocrinology , relatedTerms : İnsülin direnci , Hiperglisemi , Metabolik sendrom , HbA1c , safeNestedTerms : İnsülin direnci , Hiperglisemi , Metabolik sendrom , HbA1c , difficulty : P1 , answerLeakRisk : low , qualityScore : 93, matchingPriority : 96, "
      },
      {
        "sourceFilePath": "src/utils/clinicalValueFormatters.js",
        "text": "dL','' , 'Serum beta-hCG', 'beta-hcg','β-hcg','serum beta-hcg' ,'mIU/mL','Negatif veya <5 mIU/mL','2.400 mIU/mL','','<5 mIU/mL','' , 'HbA1c', 'hba1c','hbA1c' ,'%','<%5.7','%8.1','','%5.3','' , 'Proteinüri', 'proteinüri','proteinuri' ,'mg/gün','<150 mg/gün','1."
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-influenza",
    "term": "Influenza",
    "aliases": [
      "Influenza",
      "grip virüsü"
    ],
    "normalizedTerm": "influenza",
    "TurkishName": "Influenza",
    "EnglishName": "",
    "category": "Viroloji",
    "subcategory": "Viroloji",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Ateş, miyalji ve solunum semptomlarıyla seyreden viral enfeksiyondur.",
    "preAnswerSafeDefinition": "Ateş, miyalji ve solunum semptomlarıyla seyreden viral enfeksiyondur.",
    "shortDefinition": "Orthomyxoviridae ailesinden segmentli RNA virüslerinin yaptığı akut solunum yolu enfeksiyonudur.",
    "definition": "Orthomyxoviridae ailesinden segmentli RNA virüslerinin yaptığı akut solunum yolu enfeksiyonudur.",
    "detailedExplanation": "Influenza antijenik drift nedeniyle mevsimsel salgın yapar; antijenik shift pandemiye yol açabilir. Yaşlı, gebe, kronik hastalığı olan veya immünsüprese kişilerde komplikasyon riski artar.",
    "postAnswerExplanation": "Influenza antijenik drift nedeniyle mevsimsel salgın yapar; antijenik shift pandemiye yol açabilir. Yaşlı, gebe, kronik hastalığı olan veya immünsüprese kişilerde komplikasyon riski artar.",
    "postAnswerExpandedExplanation": "Influenza antijenik drift nedeniyle mevsimsel salgın yapar; antijenik shift pandemiye yol açabilir. Yaşlı, gebe, kronik hastalığı olan veya immünsüprese kişilerde komplikasyon riski artar.",
    "tusPearl": "Ani ateş + miyalji + öksürük = influenza; risk grubunda erken oseltamivir düşünülebilir.",
    "examPearl": "Ani ateş + miyalji + öksürük = influenza; risk grubunda erken oseltamivir düşünülebilir.",
    "differentialPoint": "Soğuk algınlığı daha hafif ve afebrildir; influenza sistemik miyalji/ateşle daha belirgindir.",
    "clinicalRelevance": "Influenza antijenik drift nedeniyle mevsimsel salgın yapar; antijenik shift pandemiye yol açabilir. Yaşlı, gebe, kronik hastalığı olan veya immünsüprese kişilerde komplikasyon riski artar.",
    "safeNestedTerms": [
      "Antijenik drift",
      "Antijenik shift",
      "Oseltamivir",
      "Pnömoni",
      "Aşı"
    ],
    "relatedTerms": [
      "Antijenik drift",
      "Antijenik shift",
      "Oseltamivir",
      "Pnömoni",
      "Aşı"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js"
    ],
    "sourceArea": "Klinik Branş Seç / TUS Spot Olgular",
    "occurrenceCount": 6,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "get : pathogen , diagnosis : correct : Neisseria meningitidis , options : Streptococcus pneumoniae , Neisseria meningitidis , Haemophilus influenzae tip b , Listeria monocytogenes , Staphylococcus aureus , question : Bu klinik tabloya en olası neden olan mikro"
      },
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "Influenza terimi bu kaynak dosyada geçmektedir; raw kaynak metinde biçimsel kaçış/JSON sıkıştırması nedeniyle bağlam otomatik kısaltılmıştır."
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-piyelonefrit",
    "term": "Piyelonefrit",
    "aliases": [
      "Piyelonefrit",
      "üst üriner sistem enfeksiyonu"
    ],
    "normalizedTerm": "piyelonefrit",
    "TurkishName": "Piyelonefrit",
    "EnglishName": "",
    "category": "Enfeksiyon / nefroloji",
    "subcategory": "Enfeksiyon",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Üst üriner sistem enfeksiyonu ve sistemik bulgularla ilişkili klinik tablodur.",
    "preAnswerSafeDefinition": "Üst üriner sistem enfeksiyonu ve sistemik bulgularla ilişkili klinik tablodur.",
    "shortDefinition": "Böbrek parankimi ve renal pelvisin enfeksiyonudur; ateş, yan ağrısı ve piyüri ile seyreder.",
    "definition": "Böbrek parankimi ve renal pelvisin enfeksiyonudur; ateş, yan ağrısı ve piyüri ile seyreder.",
    "detailedExplanation": "Piyelonefritte ateş, kostovertebral açı hassasiyeti, lökositüri ve bakteriüri beklenebilir. Gebelik, erkek cinsiyet, obstrüksiyon veya sepsis bulgusu komplike enfeksiyon yaklaşımı gerektirir.",
    "postAnswerExplanation": "Piyelonefritte ateş, kostovertebral açı hassasiyeti, lökositüri ve bakteriüri beklenebilir. Gebelik, erkek cinsiyet, obstrüksiyon veya sepsis bulgusu komplike enfeksiyon yaklaşımı gerektirir.",
    "postAnswerExpandedExplanation": "Piyelonefritte ateş, kostovertebral açı hassasiyeti, lökositüri ve bakteriüri beklenebilir. Gebelik, erkek cinsiyet, obstrüksiyon veya sepsis bulgusu komplike enfeksiyon yaklaşımı gerektirir.",
    "tusPearl": "Ateş + yan ağrısı + CVA hassasiyeti + piyüri = piyelonefrit.",
    "examPearl": "Ateş + yan ağrısı + CVA hassasiyeti + piyüri = piyelonefrit.",
    "differentialPoint": "Sistit alt üriner semptomlarla sınırlıdır; piyelonefritte ateş ve flank ağrısı öne çıkar.",
    "clinicalRelevance": "Piyelonefritte ateş, kostovertebral açı hassasiyeti, lökositüri ve bakteriüri beklenebilir. Gebelik, erkek cinsiyet, obstrüksiyon veya sepsis bulgusu komplike enfeksiyon yaklaşımı gerektirir.",
    "safeNestedTerms": [
      "Kostovertebral açı hassasiyeti",
      "Lökositüri",
      "Üriner sistem enfeksiyonu",
      "E. coli",
      "Sepsis"
    ],
    "relatedTerms": [
      "Kostovertebral açı hassasiyeti",
      "Lökositüri",
      "Üriner sistem enfeksiyonu",
      "E. coli",
      "Sepsis"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/tusGlossaryContextualPhraseIndex.js",
    "sourceFiles": [
      "src/data/tusGlossaryContextualPhraseIndex.js",
      "src/data/tusGlossaryV300SupplementalIndex.js"
    ],
    "sourceArea": "Glossary body / nested terms",
    "occurrenceCount": 6,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/tusGlossaryContextualPhraseIndex.js",
        "text": "nition : Alt kaburga-vertebra birleşim bölgesinde perküsyonla ağrı alınmasıdır. , postAnswerExplanation : Ateş ve piyüriyle birlikte piyelonefrit lehine önemli bulgudur. , postAnswerExpandedExplanation : Ateş ve piyüriyle birlikte piyelonefrit lehine önemli bu"
      },
      {
        "sourceFilePath": "src/data/tusGlossaryV300SupplementalIndex.js",
        "text": "ledExplanation : Akut sistitte dizüri, sık idrara çıkma, urgency ve suprapubik ağrı tipiktir; ateş ve kostovertebral açı hassasiyeti varsa piyelonefrit düşünülür. İdrar tahlili ve kültür klinik bağlama göre kullanılır. , postAnswerExplanation : Akut sistitte d"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-prostat-kanseri",
    "term": "Prostat kanseri",
    "aliases": [
      "Prostat kanseri",
      "prostat karsinomu"
    ],
    "normalizedTerm": "prostat kanseri",
    "TurkishName": "Prostat kanseri",
    "EnglishName": "",
    "category": "Üroloji / onkoloji",
    "subcategory": "Üroloji",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "PSA, rektal muayene ve biyopsi ile değerlendirilen prostat malignitesidir.",
    "preAnswerSafeDefinition": "PSA, rektal muayene ve biyopsi ile değerlendirilen prostat malignitesidir.",
    "shortDefinition": "Prostat bezinden kaynaklanan, sıklıkla adenokarsinom tipinde görülen erkek ürogenital malignitesidir.",
    "definition": "Prostat bezinden kaynaklanan, sıklıkla adenokarsinom tipinde görülen erkek ürogenital malignitesidir.",
    "detailedExplanation": "Prostat kanseri periferik zon kaynaklı olabilir ve kemik metastazı osteoblastik patern gösterebilir. PSA tarama/takipte kullanılır ancak tek başına tanı koydurmaz.",
    "postAnswerExplanation": "Prostat kanseri periferik zon kaynaklı olabilir ve kemik metastazı osteoblastik patern gösterebilir. PSA tarama/takipte kullanılır ancak tek başına tanı koydurmaz.",
    "postAnswerExpandedExplanation": "Prostat kanseri periferik zon kaynaklı olabilir ve kemik metastazı osteoblastik patern gösterebilir. PSA tarama/takipte kullanılır ancak tek başına tanı koydurmaz.",
    "tusPearl": "Yaşlı erkekte PSA yüksekliği + sert nodüler prostat = prostat kanseri açısından biyopsi değerlendirmesi.",
    "examPearl": "Yaşlı erkekte PSA yüksekliği + sert nodüler prostat = prostat kanseri açısından biyopsi değerlendirmesi.",
    "differentialPoint": "BPH geçiş zonunda büyür ve idrar semptomu yapar; prostat kanseri periferik zon ve sert nodül ile öne çıkar.",
    "clinicalRelevance": "Prostat kanseri periferik zon kaynaklı olabilir ve kemik metastazı osteoblastik patern gösterebilir. PSA tarama/takipte kullanılır ancak tek başına tanı koydurmaz.",
    "safeNestedTerms": [
      "PSA",
      "BPH",
      "Osteoblastik metastaz",
      "Rektal tuşe",
      "Adenokarsinom"
    ],
    "relatedTerms": [
      "PSA",
      "BPH",
      "Osteoblastik metastaz",
      "Rektal tuşe",
      "Adenokarsinom"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/tusGlossarySupplementalIndex.js",
    "sourceFiles": [
      "src/data/tusGlossarySupplementalIndex.js",
      "src/data/tusGlossaryV321DeepHighYieldBatch4Index.js"
    ],
    "sourceArea": "Glossary body / nested terms",
    "occurrenceCount": 6,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/tusGlossarySupplementalIndex.js",
        "text": "nation : Prostat dokusundan salgılanan serin proteazdır. Klinik bağlamla birlikte yorumlanmalıdır. , postAnswerExpandedExplanation : Prostat kanseri tarama/izleminde kullanılır; BPH ve prostatit de PSA yükseltebilir. , tusPearl : Prostat kanseri tarama/izlemin"
      },
      {
        "sourceFilePath": "src/data/tusGlossaryV321DeepHighYieldBatch4Index.js",
        "text": "nsiyon yapabilir. Alfa-1 bloker ve 5-alfa redüktaz inhibitörü mekanizmaları TUS açısından önemlidir. , tusPearl : BPH transizyon zon; prostat kanseri periferal zon ile klasik ayrılır. , differentialPoint : Prostat kanseri genellikle periferik zondan çıkar; BPH"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-atriyal-flutter",
    "term": "Atriyal flutter",
    "aliases": [
      "Atriyal flutter",
      "flutter"
    ],
    "normalizedTerm": "atriyal flutter",
    "TurkishName": "Atriyal flutter",
    "EnglishName": "",
    "category": "Aritmi",
    "subcategory": "Aritmi",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Düzenli atriyal taşiaritmi ve AV iletim oranıyla yorumlanan ritim bozukluğudur.",
    "preAnswerSafeDefinition": "Düzenli atriyal taşiaritmi ve AV iletim oranıyla yorumlanan ritim bozukluğudur.",
    "shortDefinition": "Atriyumda makro-reentry mekanizmasıyla gelişen düzenli atriyal taşiaritmidir; EKG’de testere dişi dalgalar görülebilir.",
    "definition": "Atriyumda makro-reentry mekanizmasıyla gelişen düzenli atriyal taşiaritmidir; EKG’de testere dişi dalgalar görülebilir.",
    "detailedExplanation": "Atriyal flutterda atriyal hız genellikle çok yüksektir ve AV blok oranına göre ventrikül hızı belirlenir. İnme riski atriyal fibrilasyona benzer şekilde antikoagülasyon açısından değerlendirilir.",
    "postAnswerExplanation": "Atriyal flutterda atriyal hız genellikle çok yüksektir ve AV blok oranına göre ventrikül hızı belirlenir. İnme riski atriyal fibrilasyona benzer şekilde antikoagülasyon açısından değerlendirilir.",
    "postAnswerExpandedExplanation": "Atriyal flutterda atriyal hız genellikle çok yüksektir ve AV blok oranına göre ventrikül hızı belirlenir. İnme riski atriyal fibrilasyona benzer şekilde antikoagülasyon açısından değerlendirilir.",
    "tusPearl": "Testere dişi flutter dalgaları + düzenli taşikardi = atriyal flutter.",
    "examPearl": "Testere dişi flutter dalgaları + düzenli taşikardi = atriyal flutter.",
    "differentialPoint": "Atriyal fibrilasyon düzensiz düzensiz ritim; flutter daha düzenli ve sawtooth dalgalarla ayrılır.",
    "clinicalRelevance": "Atriyal flutterda atriyal hız genellikle çok yüksektir ve AV blok oranına göre ventrikül hızı belirlenir. İnme riski atriyal fibrilasyona benzer şekilde antikoagülasyon açısından değerlendirilir.",
    "safeNestedTerms": [
      "Atriyal fibrilasyon",
      "AV blok",
      "CHA2DS2-VASc",
      "Senkronize kardiyoversiyon",
      "EKG"
    ],
    "relatedTerms": [
      "Atriyal fibrilasyon",
      "AV blok",
      "CHA2DS2-VASc",
      "Senkronize kardiyoversiyon",
      "EKG"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/pdfPediatricArrhythmiaCases.js",
    "sourceFiles": [
      "src/data/pdfPediatricArrhythmiaCases.js",
      "src/data/tusGlossaryCandidateAuditIndex.js"
    ],
    "sourceArea": "Klinik Branş Seç / TUS Spot / Hap Kart",
    "occurrenceCount": 5,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/pdfPediatricArrhythmiaCases.js",
        "text": "Kalp ritmi düzenli ve hızlı duyuluyor. , Üfürüm yok. , Hepatomegali ve siyanoz saptanmıyor. , correct : Yenidoğan atriyal flutterı , options : Yenidoğan atriyal flutterı , Dehidratasyona bağlı sinüs taşikardisi , Otomatik ektopik atriyal taşikardi , Ventriküle"
      },
      {
        "sourceFilePath": "src/data/tusGlossaryCandidateAuditIndex.js",
        "text": "rdisi ve QRS genişlemesi izlendi. , Sinüs taşikardisinde hız beslenme, ağlama, ateş veya sıvı durumuyla değişir; burada sabit hız ve atriyal flutter dalgaları vardır. , candidateAudit : candidateTerm : Sinüs Taşikardi , recommendation : addNewEntry , confidenc"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-ppd",
    "term": "PPD",
    "aliases": [
      "PPD",
      "tüberkülin deri testi"
    ],
    "normalizedTerm": "ppd",
    "TurkishName": "PPD",
    "EnglishName": "",
    "category": "Tüberküloz testi",
    "subcategory": "Tüberküloz testi",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Tüberküloz maruziyetini immün yanıt üzerinden değerlendiren deri testidir.",
    "preAnswerSafeDefinition": "Tüberküloz maruziyetini immün yanıt üzerinden değerlendiren deri testidir.",
    "shortDefinition": "Tüberküloza karşı gecikmiş tip aşırı duyarlılık yanıtını ölçen tüberkülin deri testidir.",
    "definition": "Tüberküloza karşı gecikmiş tip aşırı duyarlılık yanıtını ölçen tüberkülin deri testidir.",
    "detailedExplanation": "PPD pozitifliği enfeksiyon temasını destekler ancak aktif hastalık tanısı koydurmaz. BCG aşısı ve immünsüpresyon yorumda önemlidir; IGRA alternatif testtir.",
    "postAnswerExplanation": "PPD pozitifliği enfeksiyon temasını destekler ancak aktif hastalık tanısı koydurmaz. BCG aşısı ve immünsüpresyon yorumda önemlidir; IGRA alternatif testtir.",
    "postAnswerExpandedExplanation": "PPD pozitifliği enfeksiyon temasını destekler ancak aktif hastalık tanısı koydurmaz. BCG aşısı ve immünsüpresyon yorumda önemlidir; IGRA alternatif testtir.",
    "tusPearl": "PPD latent TB taramasında kullanılır; aktif TB için klinik, görüntüleme ve mikrobiyolojik kanıt gerekir.",
    "examPearl": "PPD latent TB taramasında kullanılır; aktif TB için klinik, görüntüleme ve mikrobiyolojik kanıt gerekir.",
    "differentialPoint": "IGRA BCG’den daha az etkilenir; PPD deri endürasyonu üzerinden yorumlanır.",
    "clinicalRelevance": "PPD pozitifliği enfeksiyon temasını destekler ancak aktif hastalık tanısı koydurmaz. BCG aşısı ve immünsüpresyon yorumda önemlidir; IGRA alternatif testtir.",
    "safeNestedTerms": [
      "Tüberküloz",
      "Latent TB",
      "BCG",
      "IGRA",
      "Tip IV hipersensitivite"
    ],
    "relatedTerms": [
      "Tüberküloz",
      "Latent TB",
      "BCG",
      "IGRA",
      "Tip IV hipersensitivite"
    ],
    "matchingPriority": 78,
    "standaloneSafe": true,
    "caseSensitiveDisplay": true,
    "answerLeakRisk": "low",
    "ambiguityRisk": "medium",
    "priority": "P1",
    "recommendation": "addNewEntryWithAliasGuard",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js",
      "src/data/tusGlossaryContentCoverageIndex.js"
    ],
    "sourceArea": "Klinik Branş Seç / TUS Spot Olgular",
    "occurrenceCount": 5,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "leri antijenle karşılaştıktan sonra sitokin salınımı, makrofaj aktivasyonu ve/veya sitotoksik hücre yanıtı üzerinden doku hasarı oluşturur. Tüberkülin deri testi, kontakt dermatit, granülomatöz inflamasyon ve bazı ilaç reaksiyonları bu mekanizma ile anlaşılır."
      },
      {
        "sourceFilePath": "src/data/tusGlossaryContentCoverageIndex.js",
        "text": "gory : İmmünoloji / hipersensitivite , shortDefinition : T hücre aracılı gecikmiş tip aşırı duyarlılık reaksiyonudur. , tusPearl : Tüberkülin deri testi ve kontakt dermatit Tip IV mekanizma örnekleridir. , differentialPoint : Tip I IgE aracılı hızlıdır; Tip IV"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-apgar-skoru",
    "term": "APGAR skoru",
    "aliases": [
      "APGAR skoru",
      "Apgar"
    ],
    "normalizedTerm": "apgar skoru",
    "TurkishName": "APGAR skoru",
    "EnglishName": "",
    "category": "Yenidoğan skoru",
    "subcategory": "Yenidoğan skoru",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Yenidoğanın doğum sonrası kısa dönem klinik durumunu değerlendiren skordur.",
    "preAnswerSafeDefinition": "Yenidoğanın doğum sonrası kısa dönem klinik durumunu değerlendiren skordur.",
    "shortDefinition": "Yenidoğanın doğum sonrası adaptasyonunu kalp hızı, solunum, tonus, refleks yanıt ve renk üzerinden değerlendiren skordur.",
    "definition": "Yenidoğanın doğum sonrası adaptasyonunu kalp hızı, solunum, tonus, refleks yanıt ve renk üzerinden değerlendiren skordur.",
    "detailedExplanation": "APGAR skoru 1. ve 5. dakikada değerlendirilir; resüsitasyon ihtiyacını klinikle birlikte gösterir. Uzun dönem nörolojik prognozu tek başına belirlemez.",
    "postAnswerExplanation": "APGAR skoru 1. ve 5. dakikada değerlendirilir; resüsitasyon ihtiyacını klinikle birlikte gösterir. Uzun dönem nörolojik prognozu tek başına belirlemez.",
    "postAnswerExpandedExplanation": "APGAR skoru 1. ve 5. dakikada değerlendirilir; resüsitasyon ihtiyacını klinikle birlikte gösterir. Uzun dönem nörolojik prognozu tek başına belirlemez.",
    "tusPearl": "APGAR = Appearance, Pulse, Grimace, Activity, Respiration; 1. ve 5. dakika değerlendirmesi.",
    "examPearl": "APGAR = Appearance, Pulse, Grimace, Activity, Respiration; 1. ve 5. dakika değerlendirmesi.",
    "differentialPoint": "APGAR doğum sonrası adaptasyonu; gestasyon yaşı veya doğum ağırlığı prematürite/SGA değerlendirmesini gösterir.",
    "clinicalRelevance": "APGAR skoru 1. ve 5. dakikada değerlendirilir; resüsitasyon ihtiyacını klinikle birlikte gösterir. Uzun dönem nörolojik prognozu tek başına belirlemez.",
    "safeNestedTerms": [
      "Yenidoğan resüsitasyonu",
      "Solunum",
      "Kalp hızı",
      "Tonus",
      "Prematürite"
    ],
    "relatedTerms": [
      "Yenidoğan resüsitasyonu",
      "Solunum",
      "Kalp hızı",
      "Tonus",
      "Prematürite"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": true,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/utils/clinicalStaticQualityReview.js",
    "sourceFiles": [
      "src/utils/clinicalStaticQualityReview.js",
      "src/utils/clinicalScientificAccuracyGate.js"
    ],
    "sourceArea": "TUS soru kayıtları / konu havuzları",
    "occurrenceCount": 3,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/utils/clinicalStaticQualityReview.js",
        "text": "poksik|iskemik|asfiksi|term|near term|ensefalopati/.test(bundle)) return 'Term veya near-term yenidoğan', 'Asfiksi kanıtı ve düşük Apgar öyküsü', 'Orta-ağır ensefalopati bulguları', 'İlk 6 saatte nöroprotektif yaklaşım gereksinimi' ; if (/bruton|pyojenik|b huc"
      },
      {
        "sourceFilePath": "src/utils/clinicalScientificAccuracyGate.js",
        "text": "değerlendirilir/iu, ; const SCORE_NAMES = 'PESI', 'Wells', 'CURB-65', 'CHA₂DS₂-VASc', 'CHA2DS2-VASc', 'HAS-BLED', 'Child-Pugh', 'MELD', 'APGAR', 'Bishop', 'Centor', 'Alvarado', 'Glasgow', 'Ranson' ; function normalizeTR(text = '') return normalizeQuestionText("
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-hemofili-a",
    "term": "Hemofili A",
    "aliases": [
      "Hemofili A",
      "faktör VIII eksikliği"
    ],
    "normalizedTerm": "hemofili a",
    "TurkishName": "Hemofili A",
    "EnglishName": "",
    "category": "Koagülasyon bozukluğu",
    "subcategory": "Koagülasyon bozukluğu",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Eklem içi kanama ve uzamış aPTT ile ilişkili kalıtsal koagülasyon bozukluğudur.",
    "preAnswerSafeDefinition": "Eklem içi kanama ve uzamış aPTT ile ilişkili kalıtsal koagülasyon bozukluğudur.",
    "shortDefinition": "Faktör VIII eksikliğiyle gelişen X’e bağlı resesif koagülasyon bozukluğudur.",
    "definition": "Faktör VIII eksikliğiyle gelişen X’e bağlı resesif koagülasyon bozukluğudur.",
    "detailedExplanation": "Hemofili A’da derin doku ve eklem kanamaları tipiktir; PT normal, aPTT uzamış beklenir. Tedavide faktör VIII replasmanı veya uygun olgularda desmopressin kullanılabilir.",
    "postAnswerExplanation": "Hemofili A’da derin doku ve eklem kanamaları tipiktir; PT normal, aPTT uzamış beklenir. Tedavide faktör VIII replasmanı veya uygun olgularda desmopressin kullanılabilir.",
    "postAnswerExpandedExplanation": "Hemofili A’da derin doku ve eklem kanamaları tipiktir; PT normal, aPTT uzamış beklenir. Tedavide faktör VIII replasmanı veya uygun olgularda desmopressin kullanılabilir.",
    "tusPearl": "Erkek çocuk + hemartroz + aPTT uzaması + normal trombosit/PT = Hemofili A düşün.",
    "examPearl": "Erkek çocuk + hemartroz + aPTT uzaması + normal trombosit/PT = Hemofili A düşün.",
    "differentialPoint": "Von Willebrand hastalığında mukozal kanama ve trombosit adezyon bozukluğu daha belirgindir.",
    "clinicalRelevance": "Hemofili A’da derin doku ve eklem kanamaları tipiktir; PT normal, aPTT uzamış beklenir. Tedavide faktör VIII replasmanı veya uygun olgularda desmopressin kullanılabilir.",
    "safeNestedTerms": [
      "Faktör VIII",
      "aPTT",
      "Hemartroz",
      "X’e bağlı resesif",
      "Desmopressin"
    ],
    "relatedTerms": [
      "Faktör VIII",
      "aPTT",
      "Hemartroz",
      "X’e bağlı resesif",
      "Desmopressin"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js"
    ],
    "sourceArea": "Klinik Branş Seç / TUS Spot Olgular",
    "occurrenceCount": 3,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "iagnosis , diagnosis : correct : Trombotik trombositopenik purpura , options : İmmün trombositopeni , Trombotik trombositopenik purpura , Hemofili A , Demir eksikliği anemisi , Akut lenfoblastik lösemi , question : Bu hastada en olası tanı aşağıdakilerden hang"
      },
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "Hemofili A terimi bu kaynak dosyada geçmektedir; raw kaynak metinde biçimsel kaçış/JSON sıkıştırması nedeniyle bağlam otomatik kısaltılmıştır."
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-vzv",
    "term": "VZV",
    "aliases": [
      "VZV",
      "varicella zoster virus"
    ],
    "normalizedTerm": "vzv",
    "TurkishName": "VZV",
    "EnglishName": "",
    "category": "Viroloji",
    "subcategory": "Viroloji",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Veziküler döküntü ve latent/re-aktive olabilen herpes virüs enfeksiyonlarıyla ilişkilidir.",
    "preAnswerSafeDefinition": "Veziküler döküntü ve latent/re-aktive olabilen herpes virüs enfeksiyonlarıyla ilişkilidir.",
    "shortDefinition": "Varicella-zoster virüs; primer enfeksiyonda suçiçeği, reaktivasyonda zona yapan herpes virüstür.",
    "definition": "Varicella-zoster virüs; primer enfeksiyonda suçiçeği, reaktivasyonda zona yapan herpes virüstür.",
    "detailedExplanation": "VZV dorsal kök ganglionlarında latent kalır. Primer enfeksiyon suçiçeği, reaktivasyon dermatomal ağrılı veziküler döküntü yani zona oluşturur.",
    "postAnswerExplanation": "VZV dorsal kök ganglionlarında latent kalır. Primer enfeksiyon suçiçeği, reaktivasyon dermatomal ağrılı veziküler döküntü yani zona oluşturur.",
    "postAnswerExpandedExplanation": "VZV dorsal kök ganglionlarında latent kalır. Primer enfeksiyon suçiçeği, reaktivasyon dermatomal ağrılı veziküler döküntü yani zona oluşturur.",
    "tusPearl": "Dermatomal ağrılı veziküler döküntü = zona; etken VZV’dir.",
    "examPearl": "Dermatomal ağrılı veziküler döküntü = zona; etken VZV’dir.",
    "differentialPoint": "HSV oral/genital lezyon ve temporal ensefalit; VZV suçiçeği-zona spektrumu ile ayrılır.",
    "clinicalRelevance": "VZV dorsal kök ganglionlarında latent kalır. Primer enfeksiyon suçiçeği, reaktivasyon dermatomal ağrılı veziküler döküntü yani zona oluşturur.",
    "safeNestedTerms": [
      "Suçiçeği",
      "Zona",
      "Dorsal kök ganglionu",
      "Veziküler döküntü",
      "Asiklovir"
    ],
    "relatedTerms": [
      "Suçiçeği",
      "Zona",
      "Dorsal kök ganglionu",
      "Veziküler döküntü",
      "Asiklovir"
    ],
    "matchingPriority": 78,
    "standaloneSafe": true,
    "caseSensitiveDisplay": true,
    "answerLeakRisk": "low",
    "ambiguityRisk": "medium",
    "priority": "P1",
    "recommendation": "addNewEntryWithAliasGuard",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/tusGlossaryContextualPhraseIndex.js",
    "sourceFiles": [
      "src/data/tusGlossaryContextualPhraseIndex.js"
    ],
    "sourceArea": "Glossary body / nested terms",
    "occurrenceCount": 3,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/tusGlossaryContextualPhraseIndex.js",
        "text": "kalan enfeksiyonun bağışıklık baskılanması veya uygun koşullarda yeniden aktifleşmesidir. , postAnswerExplanation : Tüberküloz, HSV, VZV ve CMV reaktivasyonu immünsüpresyonda önemlidir. , postAnswerExpandedExplanation : Tüberküloz, HSV, VZV ve CMV reaktivasyon"
      },
      {
        "sourceFilePath": "src/data/tusGlossaryContextualPhraseIndex.js",
        "text": "VZV terimi bu kaynak dosyada geçmektedir; raw kaynak metinde biçimsel kaçış/JSON sıkıştırması nedeniyle bağlam otomatik kısaltılmıştır."
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-ure-dongusu-defekti",
    "term": "Üre döngüsü defekti",
    "aliases": [
      "Üre döngüsü defekti",
      "üre siklusu defekti"
    ],
    "normalizedTerm": "ure dongusu defekti",
    "TurkishName": "Üre döngüsü defekti",
    "EnglishName": "",
    "category": "Metabolik hastalık",
    "subcategory": "Metabolik hastalık",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Hiperamonyemi ve nörolojik bulgularla ilişkili metabolik hastalık grubudur.",
    "preAnswerSafeDefinition": "Hiperamonyemi ve nörolojik bulgularla ilişkili metabolik hastalık grubudur.",
    "shortDefinition": "Amonyağın üreye dönüştürülmesindeki enzim bozukluklarıyla hiperamonyemi yapan kalıtsal metabolik hastalık grubudur.",
    "definition": "Amonyağın üreye dönüştürülmesindeki enzim bozukluklarıyla hiperamonyemi yapan kalıtsal metabolik hastalık grubudur.",
    "detailedExplanation": "Üre döngüsü defektlerinde protein alımı veya katabolizma sonrası kusma, letarji, ensefalopati ve respiratuvar alkaloz görülebilir. Orotik asit yüksekliği OTC eksikliği açısından ipucu olabilir.",
    "postAnswerExplanation": "Üre döngüsü defektlerinde protein alımı veya katabolizma sonrası kusma, letarji, ensefalopati ve respiratuvar alkaloz görülebilir. Orotik asit yüksekliği OTC eksikliği açısından ipucu olabilir.",
    "postAnswerExpandedExplanation": "Üre döngüsü defektlerinde protein alımı veya katabolizma sonrası kusma, letarji, ensefalopati ve respiratuvar alkaloz görülebilir. Orotik asit yüksekliği OTC eksikliği açısından ipucu olabilir.",
    "tusPearl": "Yenidoğanda letarji + hiperamonyemi + normal glukoz/keton = üre döngüsü defekti düşün.",
    "examPearl": "Yenidoğanda letarji + hiperamonyemi + normal glukoz/keton = üre döngüsü defekti düşün.",
    "differentialPoint": "Organik asidemilerde metabolik asidoz/ketoz daha belirgin; üre döngüsünde respiratuvar alkaloz görülebilir.",
    "clinicalRelevance": "Üre döngüsü defektlerinde protein alımı veya katabolizma sonrası kusma, letarji, ensefalopati ve respiratuvar alkaloz görülebilir. Orotik asit yüksekliği OTC eksikliği açısından ipucu olabilir.",
    "safeNestedTerms": [
      "Hiperamonyemi",
      "Orotik asidüri",
      "OTC eksikliği",
      "Respiratuvar alkaloz",
      "Protein katabolizması"
    ],
    "relatedTerms": [
      "Hiperamonyemi",
      "Orotik asidüri",
      "OTC eksikliği",
      "Respiratuvar alkaloz",
      "Protein katabolizması"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "medium",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/cases.js",
    "sourceFiles": [
      "src/data/cases.js"
    ],
    "sourceArea": "Klinik Branş Seç / TUS Spot Olgular",
    "occurrenceCount": 3,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "anda protein alımı sonrası ağır hiperammonemi, normal glukoz ve yüksek idrar orotik asit ornitin transkarbamilaz eksikliğini düşündürür. Bu üre döngüsü defektinde karbamoil fosfat mitokondride birikir ve pirimidin sentez yoluna kayarak orotik asidi artırır. , "
      },
      {
        "sourceFilePath": "src/data/cases.js",
        "text": "Üre döngüsü defekti terimi bu kaynak dosyada geçmektedir; raw kaynak metinde biçimsel kaçış/JSON sıkıştırması nedeniyle bağlam otomatik kısaltılmıştır."
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-bishop-skoru",
    "term": "Bishop skoru",
    "aliases": [
      "Bishop skoru",
      "Bishop"
    ],
    "normalizedTerm": "bishop skoru",
    "TurkishName": "Bishop skoru",
    "EnglishName": "",
    "category": "Obstetrik skor",
    "subcategory": "Obstetrik skor",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Doğum indüksiyonu öncesi serviks uygunluğunu değerlendiren obstetrik skordur.",
    "preAnswerSafeDefinition": "Doğum indüksiyonu öncesi serviks uygunluğunu değerlendiren obstetrik skordur.",
    "shortDefinition": "Servikal açıklık, silinme, kıvam, pozisyon ve fetal baş seviyesine göre doğum indüksiyonu başarısını öngören skordur.",
    "definition": "Servikal açıklık, silinme, kıvam, pozisyon ve fetal baş seviyesine göre doğum indüksiyonu başarısını öngören skordur.",
    "detailedExplanation": "Yüksek Bishop skoru indüksiyon başarısının daha olası olduğunu gösterir. Düşük skor varsa servikal olgunlaştırma stratejileri gerekebilir.",
    "postAnswerExplanation": "Yüksek Bishop skoru indüksiyon başarısının daha olası olduğunu gösterir. Düşük skor varsa servikal olgunlaştırma stratejileri gerekebilir.",
    "postAnswerExpandedExplanation": "Yüksek Bishop skoru indüksiyon başarısının daha olası olduğunu gösterir. Düşük skor varsa servikal olgunlaştırma stratejileri gerekebilir.",
    "tusPearl": "İndüksiyon sorusunda serviks uygunluğu için Bishop skorunu düşün.",
    "examPearl": "İndüksiyon sorusunda serviks uygunluğu için Bishop skorunu düşün.",
    "differentialPoint": "APGAR yenidoğan durumunu; Bishop doğum indüksiyonu öncesi servikal olgunluğu değerlendirir.",
    "clinicalRelevance": "Yüksek Bishop skoru indüksiyon başarısının daha olası olduğunu gösterir. Düşük skor varsa servikal olgunlaştırma stratejileri gerekebilir.",
    "safeNestedTerms": [
      "Doğum indüksiyonu",
      "Servikal olgunlaşma",
      "Oksitosin",
      "Prostaglandin",
      "Gebelik"
    ],
    "relatedTerms": [
      "Doğum indüksiyonu",
      "Servikal olgunlaşma",
      "Oksitosin",
      "Prostaglandin",
      "Gebelik"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/utils/clinicalScientificAccuracyGate.js",
    "sourceFiles": [
      "src/utils/clinicalScientificAccuracyGate.js"
    ],
    "sourceArea": "Klinik Branş Seç / TUS Spot / Hap Kart",
    "occurrenceCount": 2,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/utils/clinicalScientificAccuracyGate.js",
        "text": "irilir/iu, ; const SCORE_NAMES = 'PESI', 'Wells', 'CURB-65', 'CHA₂DS₂-VASc', 'CHA2DS2-VASc', 'HAS-BLED', 'Child-Pugh', 'MELD', 'APGAR', 'Bishop', 'Centor', 'Alvarado', 'Glasgow', 'Ranson' ; function normalizeTR(text = '') return normalizeQuestionText(toPlainTe"
      },
      {
        "sourceFilePath": "src/utils/clinicalScientificAccuracyGate.js",
        "text": "Bishop terimi bu kaynak dosyada geçmektedir; raw kaynak metinde biçimsel kaçış/JSON sıkıştırması nedeniyle bağlam otomatik kısaltılmıştır."
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-rpr",
    "term": "RPR",
    "aliases": [
      "RPR",
      "rapid plasma reagin"
    ],
    "normalizedTerm": "rpr",
    "TurkishName": "RPR",
    "EnglishName": "",
    "category": "Serolojik test",
    "subcategory": "Serolojik test",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Sifiliz tarama ve tedavi yanıtı izleminde kullanılan serolojik testtir.",
    "preAnswerSafeDefinition": "Sifiliz tarama ve tedavi yanıtı izleminde kullanılan serolojik testtir.",
    "shortDefinition": "Sifiliz taramasında kullanılan non-treponemal serolojik testtir; hastalık aktivitesi ve tedavi yanıtı takibinde kullanılabilir.",
    "definition": "Sifiliz taramasında kullanılan non-treponemal serolojik testtir; hastalık aktivitesi ve tedavi yanıtı takibinde kullanılabilir.",
    "detailedExplanation": "RPR yalancı pozitif olabilir; pozitif sonuç treponemal testle doğrulanır. Titre düşüşü tedavi yanıtını izlemek için değerlidir.",
    "postAnswerExplanation": "RPR yalancı pozitif olabilir; pozitif sonuç treponemal testle doğrulanır. Titre düşüşü tedavi yanıtını izlemek için değerlidir.",
    "postAnswerExpandedExplanation": "RPR yalancı pozitif olabilir; pozitif sonuç treponemal testle doğrulanır. Titre düşüşü tedavi yanıtını izlemek için değerlidir.",
    "tusPearl": "Sifilizde RPR/VDRL tarama ve takip; treponemal testler doğrulama için kullanılır.",
    "examPearl": "Sifilizde RPR/VDRL tarama ve takip; treponemal testler doğrulama için kullanılır.",
    "differentialPoint": "Treponemal testler genellikle ömür boyu pozitif kalabilir; RPR titresi aktivite/takipte daha kullanışlıdır.",
    "clinicalRelevance": "RPR yalancı pozitif olabilir; pozitif sonuç treponemal testle doğrulanır. Titre düşüşü tedavi yanıtını izlemek için değerlidir.",
    "safeNestedTerms": [
      "Sifiliz",
      "VDRL",
      "Treponemal test",
      "Penisilin",
      "Kongenital sifiliz"
    ],
    "relatedTerms": [
      "Sifiliz",
      "VDRL",
      "Treponemal test",
      "Penisilin",
      "Kongenital sifiliz"
    ],
    "matchingPriority": 78,
    "standaloneSafe": true,
    "caseSensitiveDisplay": true,
    "answerLeakRisk": "low",
    "ambiguityRisk": "medium",
    "priority": "P1",
    "recommendation": "addNewEntryWithAliasGuard",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/utils/tusSpotNarrative.js",
    "sourceFiles": [
      "src/utils/tusSpotNarrative.js",
      "src/utils/clinicalValueFormatters.js"
    ],
    "sourceArea": "TUS soru kayıtları / konu havuzları",
    "occurrenceCount": 2,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/utils/tusSpotNarrative.js",
        "text": "_PATTERN = /^(?:HBsAg|Anti-HBs|Anti-HBc(?:\\s+IgM)?|HBeAg|Anti-HBe|HBV\\s*DNA|Anti-HAV\\s*IgM|Anti-HCV|HCV\\s*RNA|HIV(?:\\s*Ag\\/Ab|\\s*RNA)?|VDRL|RPR|ANA|Anti-dsDNA|Anti-Sm|C3|C4|IgG|IgM|IgA)$/iu; const LAB_PARAM_PATTERN = /^(?:Lökosit|Lokosit|WBC|CRP|pH|HCO₃|HCO3|L"
      },
      {
        "sourceFilePath": "src/utils/clinicalValueFormatters.js",
        "text": "ction qualitativeReference(parameter = '') if (/kültür|kultur|üreme/i.test(parameter)) return 'Üreme olmamalı'; if (/anti-|hbsag|hiv|vdrl|rpr|pcr|antijen|antikor|seroloji|coombs|nitrit|keton|protein|kan/i.test(parameter)) return 'Negatif'; if (/yayma|mikroskop"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-transozofageal-ekokardiyografi",
    "term": "Transözofageal ekokardiyografi",
    "aliases": [
      "Transözofageal ekokardiyografi",
      "TEE"
    ],
    "normalizedTerm": "transozofageal ekokardiyografi",
    "TurkishName": "Transözofageal ekokardiyografi",
    "EnglishName": "",
    "category": "Görüntüleme",
    "subcategory": "Görüntüleme",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Kalp yapılarını daha ayrıntılı değerlendirmek için kullanılan ileri ekokardiyografi yöntemidir.",
    "preAnswerSafeDefinition": "Kalp yapılarını daha ayrıntılı değerlendirmek için kullanılan ileri ekokardiyografi yöntemidir.",
    "shortDefinition": "Özofagustan yapılan ultrasonografik kalp görüntülemesidir; kapak, sol atriyal apendiks ve endokardit değerlendirmesinde duyarlıdır.",
    "definition": "Özofagustan yapılan ultrasonografik kalp görüntülemesidir; kapak, sol atriyal apendiks ve endokardit değerlendirmesinde duyarlıdır.",
    "detailedExplanation": "TEE özellikle infektif endokardit ve protez kapak değerlendirmesinde transtorasik ekoya göre daha duyarlı olabilir. Kardiyoversiyon öncesi sol atriyal apendiks trombüsü araştırmada da kullanılır.",
    "postAnswerExplanation": "TEE özellikle infektif endokardit ve protez kapak değerlendirmesinde transtorasik ekoya göre daha duyarlı olabilir. Kardiyoversiyon öncesi sol atriyal apendiks trombüsü araştırmada da kullanılır.",
    "postAnswerExpandedExplanation": "TEE özellikle infektif endokardit ve protez kapak değerlendirmesinde transtorasik ekoya göre daha duyarlı olabilir. Kardiyoversiyon öncesi sol atriyal apendiks trombüsü araştırmada da kullanılır.",
    "tusPearl": "Endokardit şüphesi yüksek ama TTE negatifse TEE düşün.",
    "examPearl": "Endokardit şüphesi yüksek ama TTE negatifse TEE düşün.",
    "differentialPoint": "TTE noninvaziv ilk testtir; TEE daha invaziv ama bazı kapak/trombüs/vejetasyonlarda daha duyarlıdır.",
    "clinicalRelevance": "TEE özellikle infektif endokardit ve protez kapak değerlendirmesinde transtorasik ekoya göre daha duyarlı olabilir. Kardiyoversiyon öncesi sol atriyal apendiks trombüsü araştırmada da kullanılır.",
    "safeNestedTerms": [
      "İnfektif endokardit",
      "Vejetasyon",
      "TTE",
      "Sol atriyal apendiks",
      "Kardiyoversiyon"
    ],
    "relatedTerms": [
      "İnfektif endokardit",
      "Vejetasyon",
      "TTE",
      "Sol atriyal apendiks",
      "Kardiyoversiyon"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/pdfPediatricArrhythmiaCases.js",
    "sourceFiles": [
      "src/data/pdfPediatricArrhythmiaCases.js"
    ],
    "sourceArea": "Klinik Branş Seç / TUS Spot / Hap Kart",
    "occurrenceCount": 2,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/pdfPediatricArrhythmiaCases.js",
        "text": "Minimal , Sinüste değişkenlik beklenir , Reentran patern , name : Transözofageal ekokardiyografi , type : Imaging , why : Aritmi süresi >48 saat veya bilinmiyorsa kardiyoversiyon öncesi trombüs dışlamak için istenir. , result : Atriyal trombüs açısından değerl"
      },
      {
        "sourceFilePath": "src/data/pdfPediatricArrhythmiaCases.js",
        "text": "Transözofageal ekokardiyografi terimi bu kaynak dosyada geçmektedir; raw kaynak metinde biçimsel kaçış/JSON sıkıştırması nedeniyle bağlam otomatik kısaltılmıştır."
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-vdrl",
    "term": "VDRL",
    "aliases": [
      "VDRL",
      "sifiliz tarama testi"
    ],
    "normalizedTerm": "vdrl",
    "TurkishName": "VDRL",
    "EnglishName": "",
    "category": "Serolojik test",
    "subcategory": "Serolojik test",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Sifiliz değerlendirmesinde kullanılan non-treponemal serolojik testtir.",
    "preAnswerSafeDefinition": "Sifiliz değerlendirmesinde kullanılan non-treponemal serolojik testtir.",
    "shortDefinition": "Sifiliz taramasında ve tedavi yanıtı izleminde kullanılan non-treponemal testtir.",
    "definition": "Sifiliz taramasında ve tedavi yanıtı izleminde kullanılan non-treponemal testtir.",
    "detailedExplanation": "VDRL özellikle nörosifiliz değerlendirmesinde BOS’ta anlamlı olabilir; serumda RPR ile benzer tarama/takip mantığı taşır. Pozitiflik treponemal testle doğrulanır.",
    "postAnswerExplanation": "VDRL özellikle nörosifiliz değerlendirmesinde BOS’ta anlamlı olabilir; serumda RPR ile benzer tarama/takip mantığı taşır. Pozitiflik treponemal testle doğrulanır.",
    "postAnswerExpandedExplanation": "VDRL özellikle nörosifiliz değerlendirmesinde BOS’ta anlamlı olabilir; serumda RPR ile benzer tarama/takip mantığı taşır. Pozitiflik treponemal testle doğrulanır.",
    "tusPearl": "VDRL/RPR non-treponemal; pozitiflik treponemal testle doğrulanır ve titre takip edilir.",
    "examPearl": "VDRL/RPR non-treponemal; pozitiflik treponemal testle doğrulanır ve titre takip edilir.",
    "differentialPoint": "FTA-ABS/TPPA treponemal doğrulama; VDRL/RPR aktivite-tedavi takibinde değerlidir.",
    "clinicalRelevance": "VDRL özellikle nörosifiliz değerlendirmesinde BOS’ta anlamlı olabilir; serumda RPR ile benzer tarama/takip mantığı taşır. Pozitiflik treponemal testle doğrulanır.",
    "safeNestedTerms": [
      "Sifiliz",
      "RPR",
      "Treponemal test",
      "Nörosifiliz",
      "BOS"
    ],
    "relatedTerms": [
      "Sifiliz",
      "RPR",
      "Treponemal test",
      "Nörosifiliz",
      "BOS"
    ],
    "matchingPriority": 78,
    "standaloneSafe": true,
    "caseSensitiveDisplay": true,
    "answerLeakRisk": "low",
    "ambiguityRisk": "medium",
    "priority": "P1",
    "recommendation": "addNewEntryWithAliasGuard",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/utils/tusSpotNarrative.js",
    "sourceFiles": [
      "src/utils/tusSpotNarrative.js",
      "src/utils/clinicalValueFormatters.js"
    ],
    "sourceArea": "TUS soru kayıtları / konu havuzları",
    "occurrenceCount": 2,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/utils/tusSpotNarrative.js",
        "text": "PARAM_PATTERN = /^(?:HBsAg|Anti-HBs|Anti-HBc(?:\\s+IgM)?|HBeAg|Anti-HBe|HBV\\s*DNA|Anti-HAV\\s*IgM|Anti-HCV|HCV\\s*RNA|HIV(?:\\s*Ag\\/Ab|\\s*RNA)?|VDRL|RPR|ANA|Anti-dsDNA|Anti-Sm|C3|C4|IgG|IgM|IgA)$/iu; const LAB_PARAM_PATTERN = /^(?:Lökosit|Lokosit|WBC|CRP|pH|HCO₃|H"
      },
      {
        "sourceFilePath": "src/utils/clinicalValueFormatters.js",
        "text": "function qualitativeReference(parameter = '') if (/kültür|kultur|üreme/i.test(parameter)) return 'Üreme olmamalı'; if (/anti-|hbsag|hiv|vdrl|rpr|pcr|antijen|antikor|seroloji|coombs|nitrit|keton|protein|kan/i.test(parameter)) return 'Negatif'; if (/yayma|mikros"
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-mitral-yetmezlik",
    "term": "Mitral yetmezlik",
    "aliases": [
      "Mitral yetmezlik",
      "mitral regürjitasyon"
    ],
    "normalizedTerm": "mitral yetmezlik",
    "TurkishName": "Mitral yetmezlik",
    "EnglishName": "",
    "category": "Kapak hastalığı",
    "subcategory": "Kapak hastalığı",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Sistolik üfürüm ve kapak kapanma bozukluğuyla ilişkili kalp kapak hastalığıdır.",
    "preAnswerSafeDefinition": "Sistolik üfürüm ve kapak kapanma bozukluğuyla ilişkili kalp kapak hastalığıdır.",
    "shortDefinition": "Sistol sırasında sol ventrikülden sol atriyuma kan kaçışıyla karakterize mitral kapak hastalığıdır.",
    "definition": "Sistol sırasında sol ventrikülden sol atriyuma kan kaçışıyla karakterize mitral kapak hastalığıdır.",
    "detailedExplanation": "Mitral yetmezlikte holosistolik üfürüm apeksde duyulur ve aksillaya yayılabilir. Akut MY pulmoner ödem yapabilir; kronik MY’de sol atriyum/ventrikül dilatasyonu gelişir.",
    "postAnswerExplanation": "Mitral yetmezlikte holosistolik üfürüm apeksde duyulur ve aksillaya yayılabilir. Akut MY pulmoner ödem yapabilir; kronik MY’de sol atriyum/ventrikül dilatasyonu gelişir.",
    "postAnswerExpandedExplanation": "Mitral yetmezlikte holosistolik üfürüm apeksde duyulur ve aksillaya yayılabilir. Akut MY pulmoner ödem yapabilir; kronik MY’de sol atriyum/ventrikül dilatasyonu gelişir.",
    "tusPearl": "Apeksde holosistolik üfürüm + aksillaya yayılım = mitral yetmezlik.",
    "examPearl": "Apeksde holosistolik üfürüm + aksillaya yayılım = mitral yetmezlik.",
    "differentialPoint": "Mitral stenoz diyastolik rulman; mitral yetmezlik holosistolik üfürümle ayrılır.",
    "clinicalRelevance": "Mitral yetmezlikte holosistolik üfürüm apeksde duyulur ve aksillaya yayılabilir. Akut MY pulmoner ödem yapabilir; kronik MY’de sol atriyum/ventrikül dilatasyonu gelişir.",
    "safeNestedTerms": [
      "Holosistolik üfürüm",
      "Apeks",
      "Pulmoner ödem",
      "Ekokardiyografi",
      "Mitral kapak"
    ],
    "relatedTerms": [
      "Holosistolik üfürüm",
      "Apeks",
      "Pulmoner ödem",
      "Ekokardiyografi",
      "Mitral kapak"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/tusGlossaryContentCoverageIndex.js",
    "sourceFiles": [
      "src/data/tusGlossaryContentCoverageIndex.js"
    ],
    "sourceArea": "Glossary body / nested terms",
    "occurrenceCount": 1,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/tusGlossaryContentCoverageIndex.js",
        "text": "bi çıkış yolu lezyonlarında tipiktir. , aliases : holosistolik üfürüm , pansistolik üfürüm , safeNestedTerms : Mitral yetmezlik , Triküspit yetmezlik , VSD , relatedBranches : Kardiyoloji , matchingPriority : 220, sourceTextExamples : Holosistolik üfürüm ), ma"
      },
      {
        "sourceFilePath": "src/data/tusGlossaryContentCoverageIndex.js",
        "text": "Mitral yetmezlik terimi bu kaynak dosyada geçmektedir; raw kaynak metinde biçimsel kaçış/JSON sıkıştırması nedeniyle bağlam otomatik kısaltılmıştır."
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-nefrolitiazis",
    "term": "Nefrolitiazis",
    "aliases": [
      "Nefrolitiazis",
      "böbrek taşı"
    ],
    "normalizedTerm": "nefrolitiazis",
    "TurkishName": "Nefrolitiazis",
    "EnglishName": "",
    "category": "Üroloji",
    "subcategory": "Üroloji",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "Yan ağrısı ve üriner taş hastalığıyla ilişkili ürolojik tablodur.",
    "preAnswerSafeDefinition": "Yan ağrısı ve üriner taş hastalığıyla ilişkili ürolojik tablodur.",
    "shortDefinition": "Üriner sistemde taş oluşumudur; renal kolik, hematüri ve obstrüksiyonla seyredebilir.",
    "definition": "Üriner sistemde taş oluşumudur; renal kolik, hematüri ve obstrüksiyonla seyredebilir.",
    "detailedExplanation": "Nefrolitiaziste kolik tarzda flank ağrısı kasığa yayılabilir; mikroskopik hematüri sık görülür. Taş tipi, idrar pH’si ve metabolik riskler tedavi/önlemi etkiler.",
    "postAnswerExplanation": "Nefrolitiaziste kolik tarzda flank ağrısı kasığa yayılabilir; mikroskopik hematüri sık görülür. Taş tipi, idrar pH’si ve metabolik riskler tedavi/önlemi etkiler.",
    "postAnswerExpandedExplanation": "Nefrolitiaziste kolik tarzda flank ağrısı kasığa yayılabilir; mikroskopik hematüri sık görülür. Taş tipi, idrar pH’si ve metabolik riskler tedavi/önlemi etkiler.",
    "tusPearl": "Kolik flank ağrısı + hematuri = nefrolitiazis düşün; ateş/obstrüksiyon varsa acilleşir.",
    "examPearl": "Kolik flank ağrısı + hematuri = nefrolitiazis düşün; ateş/obstrüksiyon varsa acilleşir.",
    "differentialPoint": "Piyelonefritte ateş ve enfeksiyon bulguları; taşta kolik ağrı ve hematüri daha baskındır.",
    "clinicalRelevance": "Nefrolitiaziste kolik tarzda flank ağrısı kasığa yayılabilir; mikroskopik hematüri sık görülür. Taş tipi, idrar pH’si ve metabolik riskler tedavi/önlemi etkiler.",
    "safeNestedTerms": [
      "Renal kolik",
      "Hematüri",
      "Kalsiyum oksalat kristalleri",
      "Hidronefroz",
      "Üreter taşı"
    ],
    "relatedTerms": [
      "Renal kolik",
      "Hematüri",
      "Kalsiyum oksalat kristalleri",
      "Hidronefroz",
      "Üreter taşı"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/utils/glossary.js",
    "sourceFiles": [
      "src/utils/glossary.js"
    ],
    "sourceArea": "Klinik Branş Seç / TUS Spot / Hap Kart",
    "occurrenceCount": 1,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/utils/glossary.js",
        "text": "ary-hyperparathyroidism-001 , term : Nefrolitiyazis , aliases : Nefrolitiyazis , definition : Böbrek taşı hastalığıdır; hiperkalsemi ve hiperparatiroidi ile ilişkili olabilir. , category : İç Hastalıkları , priority : Yüksek/Orta , mode : teachingOnly, related"
      },
      {
        "sourceFilePath": "src/utils/glossary.js",
        "text": "böbrek taşı terimi bu kaynak dosyada geçmektedir; raw kaynak metinde biçimsel kaçış/JSON sıkıştırması nedeniyle bağlam otomatik kısaltılmıştır."
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  },
  {
    "id": "v332-major-jargon-batch7-trastuzumab",
    "term": "Trastuzumab",
    "aliases": [
      "Trastuzumab",
      "anti-HER2"
    ],
    "normalizedTerm": "trastuzumab",
    "TurkishName": "Trastuzumab",
    "EnglishName": "",
    "category": "Hedefe yönelik tedavi",
    "subcategory": "Hedefe yönelik tedavi",
    "sourceLayer": "V332 major disease + jargon gap batch 7",
    "previewDefinition": "HER2 pozitif tümörlerde kullanılan hedefe yönelik tedavidir.",
    "preAnswerSafeDefinition": "HER2 pozitif tümörlerde kullanılan hedefe yönelik tedavidir.",
    "shortDefinition": "HER2/neu reseptörünü hedefleyen monoklonal antikordur; HER2 pozitif meme ve bazı mide kanserlerinde kullanılır.",
    "definition": "HER2/neu reseptörünü hedefleyen monoklonal antikordur; HER2 pozitif meme ve bazı mide kanserlerinde kullanılır.",
    "detailedExplanation": "Trastuzumab HER2 sinyalini hedefler; en önemli yan etkilerden biri kardiyotoksisitedir. Tedavi öncesi ve sırasında sol ventrikül fonksiyonu izlenir.",
    "postAnswerExplanation": "Trastuzumab HER2 sinyalini hedefler; en önemli yan etkilerden biri kardiyotoksisitedir. Tedavi öncesi ve sırasında sol ventrikül fonksiyonu izlenir.",
    "postAnswerExpandedExplanation": "Trastuzumab HER2 sinyalini hedefler; en önemli yan etkilerden biri kardiyotoksisitedir. Tedavi öncesi ve sırasında sol ventrikül fonksiyonu izlenir.",
    "tusPearl": "HER2 pozitif meme kanseri + trastuzumab; kardiyotoksisite izlemini unutma.",
    "examPearl": "HER2 pozitif meme kanseri + trastuzumab; kardiyotoksisite izlemini unutma.",
    "differentialPoint": "Tamoksifen hormon reseptörü pozitif hastalıkta; trastuzumab HER2 pozitif hastalıkta hedefe yöneliktir.",
    "clinicalRelevance": "Trastuzumab HER2 sinyalini hedefler; en önemli yan etkilerden biri kardiyotoksisitedir. Tedavi öncesi ve sırasında sol ventrikül fonksiyonu izlenir.",
    "safeNestedTerms": [
      "HER2",
      "Meme kanseri",
      "Kardiyotoksisite",
      "Monoklonal antikor",
      "Ekokardiyografi"
    ],
    "relatedTerms": [
      "HER2",
      "Meme kanseri",
      "Kardiyotoksisite",
      "Monoklonal antikor",
      "Ekokardiyografi"
    ],
    "matchingPriority": 82,
    "standaloneSafe": true,
    "caseSensitiveDisplay": false,
    "answerLeakRisk": "low",
    "ambiguityRisk": "low",
    "priority": "P1",
    "recommendation": "addNewEntry",
    "existingGlossaryStatus": "missingInActiveV331GlossaryExactAlias",
    "sourceFilePath": "src/data/tusPearlCards.js",
    "sourceFiles": [
      "src/data/tusPearlCards.js"
    ],
    "sourceArea": "Hap Kartlar / Kataloglarım",
    "occurrenceCount": 1,
    "reasonForRecommendation": "V331 aktif glossary term/alias setinde exact karşılığı yok; proje metinlerinde geçiyor ve TUS karar mantığı, hastalık tanıma, laboratuvar yorumu veya tedavi güvenliği açısından öğretici değer taşıyor.",
    "sourceTextExamples": [
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": ". , keywords : sistemik skleroz , dijital ülser , iloprost , Raynaud , trap : Erlotinib veya trastuzumab dijital iskemi tedavisinin parçası değildir. , extraQuestion : Vaka kökünde sistemik skleroz, dijital ülser ve Raynaud birlikte verilirse hangi tanı önceli"
      },
      {
        "sourceFilePath": "src/data/tusPearlCards.js",
        "text": "Trastuzumab terimi bu kaynak dosyada geçmektedir; raw kaynak metinde biçimsel kaçış/JSON sıkıştırması nedeniyle bağlam otomatik kısaltılmıştır."
      }
    ],
    "notes": "Batch 7 kalite filtresiyle eklenmiştir; geniş/çakışan aliaslar temizlenmiştir.",
    "droppedAliases": []
  }
];
