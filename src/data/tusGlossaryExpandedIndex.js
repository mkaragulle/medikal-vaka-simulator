// KlinikIQ expanded TUS glossary layer.
// This file is intentionally curated: high-yield scientific terms only.
// The preview/pre-answer fields stay neutral; exam-solving pearls are rendered only after answer submission.

function foldTerm(value = '') {
  return String(value)
    .replace(/İ/g, 'i')
    .replace(/I/g, 'ı')
    .toLocaleLowerCase('tr')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}+/.-]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function idForTerm(term = '') {
  return `expanded-${foldTerm(term).replace(/[^a-z0-9]+/giu, '-').replace(/^-|-$/g, '')}`;
}

const EXPANDED_TUS_GLOSSARY_SEEDS = [
  {
    "term": "Akut koroner sendrom",
    "aliases": [
      "AKS",
      "acute coronary syndrome",
      "unstable angina",
      "NSTEMI",
      "STEMI"
    ],
    "category": "Kardiyoloji",
    "previewDefinition": "Koroner kan akımının akut azalmasıyla gelişen miyokard iskemisi spektrumudur.",
    "preAnswerSafeDefinition": "Koroner kan akımının akut azalmasıyla gelişen miyokard iskemisi spektrumudur.",
    "shortDefinition": "Koroner kan akımının akut azalmasıyla gelişen miyokard iskemisi spektrumudur.",
    "detailedExplanation": "Koroner kan akımının akut azalmasıyla gelişen miyokard iskemisi spektrumudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "ST elevasyonlu tabloda acil reperfüzyon; NSTEMI/unstable anginada risk sınıflaması ve antitrombotik yaklaşım öne çıkar.",
    "tusPearl": "ST elevasyonlu tabloda acil reperfüzyon; NSTEMI/unstable anginada risk sınıflaması ve antitrombotik yaklaşım öne çıkar.",
    "differentialPoint": "Stabil anginada eforla gelen ve dinlenmeyle geçen ağrı beklenir; AKS’de yeni, istirahatte veya progresif ağrı daha tipiktir.",
    "clinicalRelevance": "ST elevasyonlu tabloda acil reperfüzyon; NSTEMI/unstable anginada risk sınıflaması ve antitrombotik yaklaşım öne çıkar.",
    "mechanism": "",
    "relatedBranches": [
      "cardiovascular",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Akut koroner sendrom",
      "AKS",
      "acute coronary syndrome",
      "unstable angina",
      "NSTEMI",
      "STEMI",
      "Kardiyoloji"
    ]
  },
  {
    "term": "ST elevasyonu",
    "aliases": [
      "ST elevation",
      "STEMI bulgusu"
    ],
    "category": "EKG bulgusu",
    "previewDefinition": "EKG’de ST segmentinin izoelektrik hattın üzerine yükselmesidir.",
    "preAnswerSafeDefinition": "EKG’de ST segmentinin izoelektrik hattın üzerine yükselmesidir.",
    "shortDefinition": "EKG’de ST segmentinin izoelektrik hattın üzerine yükselmesidir.",
    "detailedExplanation": "EKG’de ST segmentinin izoelektrik hattın üzerine yükselmesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Uyumlu klinikte komşu derivasyonlarda ST elevasyonu STEMI kabul edilerek reperfüzyon penceresi değerlendirilir.",
    "tusPearl": "Uyumlu klinikte komşu derivasyonlarda ST elevasyonu STEMI kabul edilerek reperfüzyon penceresi değerlendirilir.",
    "differentialPoint": "Perikarditte yaygın konkav ST elevasyonu ve PR depresyonu daha tipiktir; STEMI bölgesel damar dağılımı gösterir.",
    "clinicalRelevance": "Uyumlu klinikte komşu derivasyonlarda ST elevasyonu STEMI kabul edilerek reperfüzyon penceresi değerlendirilir.",
    "mechanism": "",
    "relatedBranches": [
      "cardiovascular",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "ST elevasyonu",
      "ST elevation",
      "STEMI bulgusu",
      "EKG bulgusu"
    ]
  },
  {
    "term": "ST depresyonu",
    "aliases": [
      "ST depression"
    ],
    "category": "EKG bulgusu",
    "previewDefinition": "ST segmentinin izoelektrik hattın altında izlenmesidir.",
    "preAnswerSafeDefinition": "ST segmentinin izoelektrik hattın altında izlenmesidir.",
    "shortDefinition": "ST segmentinin izoelektrik hattın altında izlenmesidir.",
    "detailedExplanation": "ST segmentinin izoelektrik hattın altında izlenmesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Subendokardiyal iskemi, NSTEMI veya karşılıklı değişiklik bağlamında yüksek değerli EKG bulgusudur.",
    "tusPearl": "Subendokardiyal iskemi, NSTEMI veya karşılıklı değişiklik bağlamında yüksek değerli EKG bulgusudur.",
    "differentialPoint": "Digoksin etkisi ve ventrikül hipertrofisi de ST depresyonu yapabilir; klinik bağlam ayırıcıdır.",
    "clinicalRelevance": "Subendokardiyal iskemi, NSTEMI veya karşılıklı değişiklik bağlamında yüksek değerli EKG bulgusudur.",
    "mechanism": "",
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "ST depresyonu",
      "ST depression",
      "EKG bulgusu"
    ]
  },
  {
    "term": "Troponin",
    "aliases": [
      "kardiyak troponin",
      "troponin I",
      "troponin T"
    ],
    "category": "Laboratuvar",
    "previewDefinition": "Miyokard hasarında kana salınan kardiyak protein belirtecidir.",
    "preAnswerSafeDefinition": "Miyokard hasarında kana salınan kardiyak protein belirtecidir.",
    "shortDefinition": "Miyokard hasarında kana salınan kardiyak protein belirtecidir.",
    "detailedExplanation": "Miyokard hasarında kana salınan kardiyak protein belirtecidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Troponin yüksekliği miyokard nekrozunu gösterir; unstable anginada tipik olarak yükselmez.",
    "tusPearl": "Troponin yüksekliği miyokard nekrozunu gösterir; unstable anginada tipik olarak yükselmez.",
    "differentialPoint": "Böbrek yetmezliği, miyokardit ve sepsis de troponin yüksekliği yapabilir; tek başına damar tıkanıklığı demek değildir.",
    "clinicalRelevance": "Troponin yüksekliği miyokard nekrozunu gösterir; unstable anginada tipik olarak yükselmez.",
    "mechanism": "",
    "relatedBranches": [
      "cardiovascular",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Troponin",
      "kardiyak troponin",
      "troponin I",
      "troponin T",
      "Laboratuvar"
    ]
  },
  {
    "term": "Aort diseksiyonu",
    "aliases": [
      "aortic dissection",
      "diseksiyon"
    ],
    "category": "Vasküler acil",
    "previewDefinition": "Aort intimasında yırtık sonrası kanın damar duvarı tabakaları arasında ilerlemesidir.",
    "preAnswerSafeDefinition": "Aort intimasında yırtık sonrası kanın damar duvarı tabakaları arasında ilerlemesidir.",
    "shortDefinition": "Aort intimasında yırtık sonrası kanın damar duvarı tabakaları arasında ilerlemesidir.",
    "detailedExplanation": "Aort intimasında yırtık sonrası kanın damar duvarı tabakaları arasında ilerlemesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Yırtılır tarzda göğüs/sırt ağrısı + nabız/tansiyon farkı + mediasten genişliği diseksiyonu düşündürür.",
    "tusPearl": "Yırtılır tarzda göğüs/sırt ağrısı + nabız/tansiyon farkı + mediasten genişliği diseksiyonu düşündürür.",
    "differentialPoint": "Pulmoner embolide dispne ve hipoksemi; STEMI’de lokalize ST değişikliği ve troponin paterni daha öne çıkar.",
    "clinicalRelevance": "Yırtılır tarzda göğüs/sırt ağrısı + nabız/tansiyon farkı + mediasten genişliği diseksiyonu düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "cardiovascular",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Aort diseksiyonu",
      "aortic dissection",
      "diseksiyon",
      "Vasküler acil"
    ]
  },
  {
    "term": "Kardiyak tamponad",
    "aliases": [
      "tamponad",
      "cardiac tamponade",
      "Beck triadı"
    ],
    "category": "Kardiyoloji",
    "previewDefinition": "Perikard boşluğunda basınç artışıyla kalp doluşunun kısıtlanmasıdır.",
    "preAnswerSafeDefinition": "Perikard boşluğunda basınç artışıyla kalp doluşunun kısıtlanmasıdır.",
    "shortDefinition": "Perikard boşluğunda basınç artışıyla kalp doluşunun kısıtlanmasıdır.",
    "detailedExplanation": "Perikard boşluğunda basınç artışıyla kalp doluşunun kısıtlanmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Beck triadı: hipotansiyon, juguler venöz dolgunluk ve kalp seslerinde derinden gelme.",
    "tusPearl": "Beck triadı: hipotansiyon, juguler venöz dolgunluk ve kalp seslerinde derinden gelme.",
    "differentialPoint": "Tansiyon pnömotoraksta trakea deviasyonu ve tek taraflı solunum sesi azalması beklenir.",
    "clinicalRelevance": "Beck triadı: hipotansiyon, juguler venöz dolgunluk ve kalp seslerinde derinden gelme.",
    "mechanism": "",
    "relatedBranches": [
      "cardiovascular",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Kardiyak tamponad",
      "tamponad",
      "cardiac tamponade",
      "Beck triadı",
      "Kardiyoloji"
    ]
  },
  {
    "term": "Pulsus paradoxus",
    "aliases": [
      "paradoks nabız",
      "pulsus paradoksus"
    ],
    "category": "Fizik muayene bulgusu",
    "previewDefinition": "İnspirasyonda sistolik kan basıncının belirgin düşmesidir.",
    "preAnswerSafeDefinition": "İnspirasyonda sistolik kan basıncının belirgin düşmesidir.",
    "shortDefinition": "İnspirasyonda sistolik kan basıncının belirgin düşmesidir.",
    "detailedExplanation": "İnspirasyonda sistolik kan basıncının belirgin düşmesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Kardiyak tamponad ve ağır astımda sınav değeri yüksektir.",
    "tusPearl": "Kardiyak tamponad ve ağır astımda sınav değeri yüksektir.",
    "differentialPoint": "Kussmaul bulgusu inspirasyonda juguler venöz basıncın artmasıdır; pulsus paradoxus kan basıncı değişimidir.",
    "clinicalRelevance": "Kardiyak tamponad ve ağır astımda sınav değeri yüksektir.",
    "mechanism": "",
    "relatedBranches": [
      "cardiovascular",
      "pulmonology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Pulsus paradoxus",
      "paradoks nabız",
      "pulsus paradoksus",
      "Fizik muayene bulgusu"
    ]
  },
  {
    "term": "Kussmaul bulgusu",
    "aliases": [
      "Kussmaul sign"
    ],
    "category": "Fizik muayene bulgusu",
    "previewDefinition": "İnspirasyonla juguler venöz dolgunluğun azalmak yerine artmasıdır.",
    "preAnswerSafeDefinition": "İnspirasyonla juguler venöz dolgunluğun azalmak yerine artmasıdır.",
    "shortDefinition": "İnspirasyonla juguler venöz dolgunluğun azalmak yerine artmasıdır.",
    "detailedExplanation": "İnspirasyonla juguler venöz dolgunluğun azalmak yerine artmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Konstriktif perikardit ve restriktif kardiyomiyopati ayrımında klasik ipucudur.",
    "tusPearl": "Konstriktif perikardit ve restriktif kardiyomiyopati ayrımında klasik ipucudur.",
    "differentialPoint": "Pulsus paradoxus sistolik basınç düşüşüdür; Kussmaul venöz dolgunluk bulgusudur.",
    "clinicalRelevance": "Konstriktif perikardit ve restriktif kardiyomiyopati ayrımında klasik ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Kussmaul bulgusu",
      "Kussmaul sign",
      "Fizik muayene bulgusu"
    ]
  },
  {
    "term": "Atriyal fibrilasyon",
    "aliases": [
      "AF",
      "atrial fibrillation",
      "düzensiz düzensiz ritim"
    ],
    "category": "Aritmi",
    "previewDefinition": "Düzensiz atriyal elektriksel aktiviteye bağlı düzensiz-düzensiz ritimdir.",
    "preAnswerSafeDefinition": "Düzensiz atriyal elektriksel aktiviteye bağlı düzensiz-düzensiz ritimdir.",
    "shortDefinition": "Düzensiz atriyal elektriksel aktiviteye bağlı düzensiz-düzensiz ritimdir.",
    "detailedExplanation": "Düzensiz atriyal elektriksel aktiviteye bağlı düzensiz-düzensiz ritimdir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Düzensiz-düzensiz nabız + P dalgası yokluğu AF için temel EKG mantığıdır.",
    "tusPearl": "Düzensiz-düzensiz nabız + P dalgası yokluğu AF için temel EKG mantığıdır.",
    "differentialPoint": "Atriyal flutterda testere dişi F dalgaları daha tipiktir.",
    "clinicalRelevance": "Düzensiz-düzensiz nabız + P dalgası yokluğu AF için temel EKG mantığıdır.",
    "mechanism": "",
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Atriyal fibrilasyon",
      "AF",
      "atrial fibrillation",
      "düzensiz düzensiz ritim",
      "Aritmi"
    ]
  },
  {
    "term": "Torsades de pointes",
    "aliases": [
      "torsades",
      "polimorfik VT"
    ],
    "category": "Aritmi",
    "previewDefinition": "Uzamış QT zemininde gelişen polimorfik ventriküler taşikardi formudur.",
    "preAnswerSafeDefinition": "Uzamış QT zemininde gelişen polimorfik ventriküler taşikardi formudur.",
    "shortDefinition": "Uzamış QT zemininde gelişen polimorfik ventriküler taşikardi formudur.",
    "detailedExplanation": "Uzamış QT zemininde gelişen polimorfik ventriküler taşikardi formudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Torsades tedavisinde magnezyum sülfat yüksek verimli sınav bilgisidir.",
    "tusPearl": "Torsades tedavisinde magnezyum sülfat yüksek verimli sınav bilgisidir.",
    "differentialPoint": "Monomorfik VT genellikle yapısal kalp hastalığıyla ilişkilidir; torsades QT uzamasıyla ilişkilidir.",
    "clinicalRelevance": "Torsades tedavisinde magnezyum sülfat yüksek verimli sınav bilgisidir.",
    "mechanism": "",
    "relatedBranches": [
      "cardiovascular",
      "emergency-medicine",
      "pharmacology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Torsades de pointes",
      "torsades",
      "polimorfik VT",
      "Aritmi"
    ]
  },
  {
    "term": "QT uzaması",
    "aliases": [
      "long QT",
      "QT prolongation"
    ],
    "category": "EKG bulgusu",
    "previewDefinition": "Ventriküler repolarizasyon süresinin uzamasıyla ilişkili EKG bulgusudur.",
    "preAnswerSafeDefinition": "Ventriküler repolarizasyon süresinin uzamasıyla ilişkili EKG bulgusudur.",
    "shortDefinition": "Ventriküler repolarizasyon süresinin uzamasıyla ilişkili EKG bulgusudur.",
    "detailedExplanation": "Ventriküler repolarizasyon süresinin uzamasıyla ilişkili EKG bulgusudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Makrolid, florokinolon, antipsikotik ve antiaritmikler torsades riskini artırabilir.",
    "tusPearl": "Makrolid, florokinolon, antipsikotik ve antiaritmikler torsades riskini artırabilir.",
    "differentialPoint": "QRS genişlemesi depolarizasyon gecikmesini; QT uzaması repolarizasyon süresi artışını ifade eder.",
    "clinicalRelevance": "Makrolid, florokinolon, antipsikotik ve antiaritmikler torsades riskini artırabilir.",
    "mechanism": "",
    "relatedBranches": [
      "cardiovascular",
      "pharmacology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "QT uzaması",
      "long QT",
      "QT prolongation",
      "EKG bulgusu"
    ]
  },
  {
    "term": "AV blok",
    "aliases": [
      "atriyoventriküler blok",
      "heart block"
    ],
    "category": "İleti bozukluğu",
    "previewDefinition": "Atriyoventriküler düğüm veya iletim sisteminde ileti gecikmesi ya da kesilmesidir.",
    "preAnswerSafeDefinition": "Atriyoventriküler düğüm veya iletim sisteminde ileti gecikmesi ya da kesilmesidir.",
    "shortDefinition": "Atriyoventriküler düğüm veya iletim sisteminde ileti gecikmesi ya da kesilmesidir.",
    "detailedExplanation": "Atriyoventriküler düğüm veya iletim sisteminde ileti gecikmesi ya da kesilmesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Mobitz II ve üçüncü derece AV blok pacemaker gereksinimi açısından daha ciddidir.",
    "tusPearl": "Mobitz II ve üçüncü derece AV blok pacemaker gereksinimi açısından daha ciddidir.",
    "differentialPoint": "Mobitz I’de PR giderek uzar; Mobitz II’de PR sabitken QRS düşer.",
    "clinicalRelevance": "Mobitz II ve üçüncü derece AV blok pacemaker gereksinimi açısından daha ciddidir.",
    "mechanism": "",
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "AV blok",
      "atriyoventriküler blok",
      "heart block",
      "İleti bozukluğu"
    ]
  },
  {
    "term": "Hipertrofik obstrüktif kardiyomiyopati",
    "aliases": [
      "HOCM",
      "hipertrofik kardiyomiyopati"
    ],
    "category": "Kardiyomiyopati",
    "previewDefinition": "Septal hipertrofi ve dinamik sol ventrikül çıkış yolu obstrüksiyonu ile karakterizedir.",
    "preAnswerSafeDefinition": "Septal hipertrofi ve dinamik sol ventrikül çıkış yolu obstrüksiyonu ile karakterizedir.",
    "shortDefinition": "Septal hipertrofi ve dinamik sol ventrikül çıkış yolu obstrüksiyonu ile karakterizedir.",
    "detailedExplanation": "Septal hipertrofi ve dinamik sol ventrikül çıkış yolu obstrüksiyonu ile karakterizedir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Genç atlet ani ölümü + sistolik üfürüm + Valsalva ile artış HOCM için klasik ipucudur.",
    "tusPearl": "Genç atlet ani ölümü + sistolik üfürüm + Valsalva ile artış HOCM için klasik ipucudur.",
    "differentialPoint": "Aort darlığında üfürüm Valsalva ile azalır; HOCM’de obstrüksiyon arttığı için artabilir.",
    "clinicalRelevance": "Genç atlet ani ölümü + sistolik üfürüm + Valsalva ile artış HOCM için klasik ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Hipertrofik obstrüktif kardiyomiyopati",
      "HOCM",
      "hipertrofik kardiyomiyopati",
      "Kardiyomiyopati"
    ]
  },
  {
    "term": "Aort stenozu",
    "aliases": [
      "aort darlığı",
      "aortic stenosis"
    ],
    "category": "Kapak hastalığı",
    "previewDefinition": "Aort kapağı darlığına bağlı sol ventrikül çıkışının zorlaşmasıdır.",
    "preAnswerSafeDefinition": "Aort kapağı darlığına bağlı sol ventrikül çıkışının zorlaşmasıdır.",
    "shortDefinition": "Aort kapağı darlığına bağlı sol ventrikül çıkışının zorlaşmasıdır.",
    "detailedExplanation": "Aort kapağı darlığına bağlı sol ventrikül çıkışının zorlaşmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Efor senkopu, anjina ve dispne triadı ileri aort stenozunu düşündürür.",
    "tusPearl": "Efor senkopu, anjina ve dispne triadı ileri aort stenozunu düşündürür.",
    "differentialPoint": "HOCM’de Valsalva üfürümü artırır; aort stenozunda genellikle azaltır.",
    "clinicalRelevance": "Efor senkopu, anjina ve dispne triadı ileri aort stenozunu düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Aort stenozu",
      "aort darlığı",
      "aortic stenosis",
      "Kapak hastalığı"
    ]
  },
  {
    "term": "Mitral stenoz",
    "aliases": [
      "mitral darlık",
      "opening snap"
    ],
    "category": "Kapak hastalığı",
    "previewDefinition": "Mitral kapak darlığına bağlı sol atriyum basıncının artmasıdır.",
    "preAnswerSafeDefinition": "Mitral kapak darlığına bağlı sol atriyum basıncının artmasıdır.",
    "shortDefinition": "Mitral kapak darlığına bağlı sol atriyum basıncının artmasıdır.",
    "detailedExplanation": "Mitral kapak darlığına bağlı sol atriyum basıncının artmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Romatizmal kalp hastalığı öyküsü + opening snap + diyastolik rulman klasik ipucudur.",
    "tusPearl": "Romatizmal kalp hastalığı öyküsü + opening snap + diyastolik rulman klasik ipucudur.",
    "differentialPoint": "Mitral yetmezlikte holosistolik üfürüm beklenir; mitral stenoz diyastoliktir.",
    "clinicalRelevance": "Romatizmal kalp hastalığı öyküsü + opening snap + diyastolik rulman klasik ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Mitral stenoz",
      "mitral darlık",
      "opening snap",
      "Kapak hastalığı"
    ]
  },
  {
    "term": "Janeway lezyonları",
    "aliases": [
      "Janeway lesion"
    ],
    "category": "Dermatolojik bulgu",
    "previewDefinition": "Enfektif endokarditte görülebilen ağrısız palmoplantar maküler lezyonlardır.",
    "preAnswerSafeDefinition": "Enfektif endokarditte görülebilen ağrısız palmoplantar maküler lezyonlardır.",
    "shortDefinition": "Enfektif endokarditte görülebilen ağrısız palmoplantar maküler lezyonlardır.",
    "detailedExplanation": "Enfektif endokarditte görülebilen ağrısız palmoplantar maküler lezyonlardır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Endokarditte Janeway ağrısız, Osler nodülleri ağrılıdır.",
    "tusPearl": "Endokarditte Janeway ağrısız, Osler nodülleri ağrılıdır.",
    "differentialPoint": "Osler nodülü immün kompleks ilişkili ağrılı nodüldür; Janeway daha çok septik emboliyle ilişkilidir.",
    "clinicalRelevance": "Endokarditte Janeway ağrısız, Osler nodülleri ağrılıdır.",
    "mechanism": "",
    "relatedBranches": [
      "cardiovascular",
      "infectious-diseases"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Janeway lezyonları",
      "Janeway lesion",
      "Dermatolojik bulgu"
    ]
  },
  {
    "term": "Osler nodülleri",
    "aliases": [
      "Osler nodes"
    ],
    "category": "Dermatolojik bulgu",
    "previewDefinition": "Enfektif endokarditte görülebilen ağrılı parmak ucu nodülleridir.",
    "preAnswerSafeDefinition": "Enfektif endokarditte görülebilen ağrılı parmak ucu nodülleridir.",
    "shortDefinition": "Enfektif endokarditte görülebilen ağrılı parmak ucu nodülleridir.",
    "detailedExplanation": "Enfektif endokarditte görülebilen ağrılı parmak ucu nodülleridir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Ağrılı Osler nodülü ile ağrısız Janeway lezyonunu ayırmak TUS için değerlidir.",
    "tusPearl": "Ağrılı Osler nodülü ile ağrısız Janeway lezyonunu ayırmak TUS için değerlidir.",
    "differentialPoint": "Janeway lezyonları palmoplantar ve ağrısızdır.",
    "clinicalRelevance": "Ağrılı Osler nodülü ile ağrısız Janeway lezyonunu ayırmak TUS için değerlidir.",
    "mechanism": "",
    "relatedBranches": [
      "cardiovascular",
      "infectious-diseases"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Osler nodülleri",
      "Osler nodes",
      "Dermatolojik bulgu"
    ]
  },
  {
    "term": "Roth lekeleri",
    "aliases": [
      "Roth spots"
    ],
    "category": "Göz bulgusu",
    "previewDefinition": "Retinada soluk merkezli hemorajik lezyonlardır.",
    "preAnswerSafeDefinition": "Retinada soluk merkezli hemorajik lezyonlardır.",
    "shortDefinition": "Retinada soluk merkezli hemorajik lezyonlardır.",
    "detailedExplanation": "Retinada soluk merkezli hemorajik lezyonlardır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Endokardit, lösemi ve anemi bağlamında görülebilir; tek başına tanı koydurmaz.",
    "tusPearl": "Endokardit, lösemi ve anemi bağlamında görülebilir; tek başına tanı koydurmaz.",
    "differentialPoint": "Pamuk atığı eksüdalar diyabet/hipertansiyon retinopatisinde daha farklı bağlamdadır.",
    "clinicalRelevance": "Endokardit, lösemi ve anemi bağlamında görülebilir; tek başına tanı koydurmaz.",
    "mechanism": "",
    "relatedBranches": [
      "cardiovascular",
      "ophthalmology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Roth lekeleri",
      "Roth spots",
      "Göz bulgusu"
    ]
  },
  {
    "term": "Eisenmenger sendromu",
    "aliases": [
      "Eisenmenger"
    ],
    "category": "Konjenital kalp hastalığı",
    "previewDefinition": "Uzun süreli sol-sağ şantın pulmoner hipertansiyonla sağ-sol şanta dönmesidir.",
    "preAnswerSafeDefinition": "Uzun süreli sol-sağ şantın pulmoner hipertansiyonla sağ-sol şanta dönmesidir.",
    "shortDefinition": "Uzun süreli sol-sağ şantın pulmoner hipertansiyonla sağ-sol şanta dönmesidir.",
    "detailedExplanation": "Uzun süreli sol-sağ şantın pulmoner hipertansiyonla sağ-sol şanta dönmesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Siyanoz gelişmiş Eisenmenger tablosunda şant kapatma kontrendike olabilir.",
    "tusPearl": "Siyanoz gelişmiş Eisenmenger tablosunda şant kapatma kontrendike olabilir.",
    "differentialPoint": "Başlangıçta asiyanotik şantlar zamanla siyanoza dönebilir.",
    "clinicalRelevance": "Siyanoz gelişmiş Eisenmenger tablosunda şant kapatma kontrendike olabilir.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics",
      "cardiovascular"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Eisenmenger sendromu",
      "Eisenmenger",
      "Konjenital kalp hastalığı"
    ]
  },
  {
    "term": "Fallot tetralojisi",
    "aliases": [
      "TOF",
      "tetralogy of Fallot"
    ],
    "category": "Konjenital kalp hastalığı",
    "previewDefinition": "VSD, pulmoner stenoz, overriding aorta ve sağ ventrikül hipertrofisiyle seyreden siyanotik kalp hastalığıdır.",
    "preAnswerSafeDefinition": "VSD, pulmoner stenoz, overriding aorta ve sağ ventrikül hipertrofisiyle seyreden siyanotik kalp hastalığıdır.",
    "shortDefinition": "VSD, pulmoner stenoz, overriding aorta ve sağ ventrikül hipertrofisiyle seyreden siyanotik kalp hastalığıdır.",
    "detailedExplanation": "VSD, pulmoner stenoz, overriding aorta ve sağ ventrikül hipertrofisiyle seyreden siyanotik kalp hastalığıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Çömelme ile semptom rahatlaması Fallot tetralojisi için klasik ipucudur.",
    "tusPearl": "Çömelme ile semptom rahatlaması Fallot tetralojisi için klasik ipucudur.",
    "differentialPoint": "Transpozisyonda prostaglandin E1 ile duktus açıklığı hayati olabilir.",
    "clinicalRelevance": "Çömelme ile semptom rahatlaması Fallot tetralojisi için klasik ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics",
      "cardiovascular"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Fallot tetralojisi",
      "TOF",
      "tetralogy of Fallot",
      "Konjenital kalp hastalığı"
    ]
  },
  {
    "term": "Pulmoner emboli",
    "aliases": [
      "PE",
      "pulmonary embolism"
    ],
    "category": "Pulmonoloji",
    "previewDefinition": "Venöz trombüsün pulmoner arter yatağını tıkamasıyla gelişen akut tablodur.",
    "preAnswerSafeDefinition": "Venöz trombüsün pulmoner arter yatağını tıkamasıyla gelişen akut tablodur.",
    "shortDefinition": "Venöz trombüsün pulmoner arter yatağını tıkamasıyla gelişen akut tablodur.",
    "detailedExplanation": "Venöz trombüsün pulmoner arter yatağını tıkamasıyla gelişen akut tablodur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Ani dispne, plöritik göğüs ağrısı, taşikardi ve DVT öyküsü PE için güçlü ipuçlarıdır.",
    "tusPearl": "Ani dispne, plöritik göğüs ağrısı, taşikardi ve DVT öyküsü PE için güçlü ipuçlarıdır.",
    "differentialPoint": "Pnömotoraksta tek taraflı solunum sesi azalması; pnömonide ateş ve konsolidasyon bulguları daha baskındır.",
    "clinicalRelevance": "Ani dispne, plöritik göğüs ağrısı, taşikardi ve DVT öyküsü PE için güçlü ipuçlarıdır.",
    "mechanism": "",
    "relatedBranches": [
      "pulmonology",
      "emergency-medicine",
      "cardiovascular"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Pulmoner emboli",
      "PE",
      "pulmonary embolism",
      "Pulmonoloji"
    ]
  },
  {
    "term": "Pnömotoraks",
    "aliases": [
      "pneumothorax"
    ],
    "category": "Pulmonoloji",
    "previewDefinition": "Plevral boşluğa hava girmesiyle akciğerin kısmen veya tamamen kollabe olmasıdır.",
    "preAnswerSafeDefinition": "Plevral boşluğa hava girmesiyle akciğerin kısmen veya tamamen kollabe olmasıdır.",
    "shortDefinition": "Plevral boşluğa hava girmesiyle akciğerin kısmen veya tamamen kollabe olmasıdır.",
    "detailedExplanation": "Plevral boşluğa hava girmesiyle akciğerin kısmen veya tamamen kollabe olmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Ani tek taraflı plöritik ağrı + solunum sesi azalması pnömotoraks düşündürür.",
    "tusPearl": "Ani tek taraflı plöritik ağrı + solunum sesi azalması pnömotoraks düşündürür.",
    "differentialPoint": "Tansiyon pnömotoraksta hipotansiyon, trakea deviasyonu ve acil iğne dekompresyonu öne çıkar.",
    "clinicalRelevance": "Ani tek taraflı plöritik ağrı + solunum sesi azalması pnömotoraks düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "pulmonology",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Pnömotoraks",
      "pneumothorax",
      "Pulmonoloji"
    ]
  },
  {
    "term": "Tansiyon pnömotoraks",
    "aliases": [
      "tension pneumothorax"
    ],
    "category": "Acil",
    "previewDefinition": "Plevral boşlukta basınç artışıyla mediastinal şift ve hemodinamik bozulma oluşturan pnömotorakstır.",
    "preAnswerSafeDefinition": "Plevral boşlukta basınç artışıyla mediastinal şift ve hemodinamik bozulma oluşturan pnömotorakstır.",
    "shortDefinition": "Plevral boşlukta basınç artışıyla mediastinal şift ve hemodinamik bozulma oluşturan pnömotorakstır.",
    "detailedExplanation": "Plevral boşlukta basınç artışıyla mediastinal şift ve hemodinamik bozulma oluşturan pnömotorakstır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Şok bulguları varsa görüntüleme beklenmeden iğne dekompresyonu yapılır.",
    "tusPearl": "Şok bulguları varsa görüntüleme beklenmeden iğne dekompresyonu yapılır.",
    "differentialPoint": "Basit pnömotoraksta hemodinami daha stabildir; tansiyon pnömotoraks acil girişim gerektirir.",
    "clinicalRelevance": "Şok bulguları varsa görüntüleme beklenmeden iğne dekompresyonu yapılır.",
    "mechanism": "",
    "relatedBranches": [
      "pulmonology",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Tansiyon pnömotoraks",
      "tension pneumothorax",
      "Acil"
    ]
  },
  {
    "term": "KOAH alevlenmesi",
    "aliases": [
      "COPD exacerbation",
      "KOAH atağı"
    ],
    "category": "Pulmonoloji",
    "previewDefinition": "KOAH hastasında dispne, öksürük veya balgamda akut kötüleşmedir.",
    "preAnswerSafeDefinition": "KOAH hastasında dispne, öksürük veya balgamda akut kötüleşmedir.",
    "shortDefinition": "KOAH hastasında dispne, öksürük veya balgamda akut kötüleşmedir.",
    "detailedExplanation": "KOAH hastasında dispne, öksürük veya balgamda akut kötüleşmedir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Artmış balgam pürülanlığı ve dispne antibiyotik/steroid kararında TUS değeri taşır.",
    "tusPearl": "Artmış balgam pürülanlığı ve dispne antibiyotik/steroid kararında TUS değeri taşır.",
    "differentialPoint": "Astım genellikle reversibl bronkokonstriksiyon; KOAH kalıcı hava akımı kısıtlılığı ile seyreder.",
    "clinicalRelevance": "Artmış balgam pürülanlığı ve dispne antibiyotik/steroid kararında TUS değeri taşır.",
    "mechanism": "",
    "relatedBranches": [
      "pulmonology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "KOAH alevlenmesi",
      "COPD exacerbation",
      "KOAH atağı",
      "Pulmonoloji"
    ]
  },
  {
    "term": "Astım alevlenmesi",
    "aliases": [
      "astım atağı",
      "status asthmaticus"
    ],
    "category": "Pulmonoloji",
    "previewDefinition": "Bronş hiperreaktivitesine bağlı hava yolu daralmasının akut kötüleşmesidir.",
    "preAnswerSafeDefinition": "Bronş hiperreaktivitesine bağlı hava yolu daralmasının akut kötüleşmesidir.",
    "shortDefinition": "Bronş hiperreaktivitesine bağlı hava yolu daralmasının akut kötüleşmesidir.",
    "detailedExplanation": "Bronş hiperreaktivitesine bağlı hava yolu daralmasının akut kötüleşmesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Sessiz akciğer ve yorgunluk ağır astım atağında kötü prognostik bulgulardır.",
    "tusPearl": "Sessiz akciğer ve yorgunluk ağır astım atağında kötü prognostik bulgulardır.",
    "differentialPoint": "KOAH genellikle sigara ve kronik kalıcı obstrüksiyonla ilişkilidir.",
    "clinicalRelevance": "Sessiz akciğer ve yorgunluk ağır astım atağında kötü prognostik bulgulardır.",
    "mechanism": "",
    "relatedBranches": [
      "pulmonology",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Astım alevlenmesi",
      "astım atağı",
      "status asthmaticus",
      "Pulmonoloji"
    ]
  },
  {
    "term": "Wheezing",
    "aliases": [
      "hışıltı",
      "wheez"
    ],
    "category": "Solunum bulgusu",
    "previewDefinition": "Daralmış hava yollarından geçen havanın oluşturduğu müzikal ekspiryum sesidir.",
    "preAnswerSafeDefinition": "Daralmış hava yollarından geçen havanın oluşturduğu müzikal ekspiryum sesidir.",
    "shortDefinition": "Daralmış hava yollarından geçen havanın oluşturduğu müzikal ekspiryum sesidir.",
    "detailedExplanation": "Daralmış hava yollarından geçen havanın oluşturduğu müzikal ekspiryum sesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Astım/KOAH alevlenmesi düşünülür; ancak yabancı cisim ve anafilaksi de wheezing yapabilir.",
    "tusPearl": "Astım/KOAH alevlenmesi düşünülür; ancak yabancı cisim ve anafilaksi de wheezing yapabilir.",
    "differentialPoint": "Stridor üst hava yolu obstrüksiyonunu, wheezing alt hava yolu daralmasını düşündürür.",
    "clinicalRelevance": "Astım/KOAH alevlenmesi düşünülür; ancak yabancı cisim ve anafilaksi de wheezing yapabilir.",
    "mechanism": "",
    "relatedBranches": [
      "pulmonology",
      "pediatrics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Wheezing",
      "hışıltı",
      "wheez",
      "Solunum bulgusu"
    ]
  },
  {
    "term": "Stridor",
    "aliases": [
      "stridor sesi"
    ],
    "category": "Solunum bulgusu",
    "previewDefinition": "Üst hava yolu obstrüksiyonunda duyulan kaba, yüksek perdeli solunum sesidir.",
    "preAnswerSafeDefinition": "Üst hava yolu obstrüksiyonunda duyulan kaba, yüksek perdeli solunum sesidir.",
    "shortDefinition": "Üst hava yolu obstrüksiyonunda duyulan kaba, yüksek perdeli solunum sesidir.",
    "detailedExplanation": "Üst hava yolu obstrüksiyonunda duyulan kaba, yüksek perdeli solunum sesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Çocukta ani stridor yabancı cisim; toksik görünüm ve salya epiglotit açısından uyarıcıdır.",
    "tusPearl": "Çocukta ani stridor yabancı cisim; toksik görünüm ve salya epiglotit açısından uyarıcıdır.",
    "differentialPoint": "Wheezing daha çok alt hava yolu daralmasıdır.",
    "clinicalRelevance": "Çocukta ani stridor yabancı cisim; toksik görünüm ve salya epiglotit açısından uyarıcıdır.",
    "mechanism": "",
    "relatedBranches": [
      "pulmonology",
      "pediatrics",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Stridor",
      "stridor sesi",
      "Solunum bulgusu"
    ]
  },
  {
    "term": "Bronşektazi",
    "aliases": [
      "bronchiectasis"
    ],
    "category": "Pulmonoloji",
    "previewDefinition": "Bronşların kalıcı dilatasyonu ve kronik enfeksiyon/inflamasyonla seyreden hastalıktır.",
    "preAnswerSafeDefinition": "Bronşların kalıcı dilatasyonu ve kronik enfeksiyon/inflamasyonla seyreden hastalıktır.",
    "shortDefinition": "Bronşların kalıcı dilatasyonu ve kronik enfeksiyon/inflamasyonla seyreden hastalıktır.",
    "detailedExplanation": "Bronşların kalıcı dilatasyonu ve kronik enfeksiyon/inflamasyonla seyreden hastalıktır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Bol pürülan balgam + tekrarlayan enfeksiyon + tram-track görüntüsü bronşektaziyi düşündürür.",
    "tusPearl": "Bol pürülan balgam + tekrarlayan enfeksiyon + tram-track görüntüsü bronşektaziyi düşündürür.",
    "differentialPoint": "KOAH’ta primer sorun kalıcı hava akımı kısıtlılığıdır; bronşektazide kronik pürülan balgam baskındır.",
    "clinicalRelevance": "Bol pürülan balgam + tekrarlayan enfeksiyon + tram-track görüntüsü bronşektaziyi düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "pulmonology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Bronşektazi",
      "bronchiectasis",
      "Pulmonoloji"
    ]
  },
  {
    "term": "Sarkoidoz",
    "aliases": [
      "sarcoidosis",
      "nonkazeifiye granülom"
    ],
    "category": "Granülomatöz hastalık",
    "previewDefinition": "Nonkazeifiye granülomlarla seyreden multisistemik inflamatuvar hastalıktır.",
    "preAnswerSafeDefinition": "Nonkazeifiye granülomlarla seyreden multisistemik inflamatuvar hastalıktır.",
    "shortDefinition": "Nonkazeifiye granülomlarla seyreden multisistemik inflamatuvar hastalıktır.",
    "detailedExplanation": "Nonkazeifiye granülomlarla seyreden multisistemik inflamatuvar hastalıktır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Bilateral hiler lenfadenopati + eritema nodozum + hiperkalsemi sarkoidoz ipucudur.",
    "tusPearl": "Bilateral hiler lenfadenopati + eritema nodozum + hiperkalsemi sarkoidoz ipucudur.",
    "differentialPoint": "Tüberküloz kazeifiye granülomla daha tipiktir.",
    "clinicalRelevance": "Bilateral hiler lenfadenopati + eritema nodozum + hiperkalsemi sarkoidoz ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "pulmonology",
      "rheumatology",
      "pathology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Sarkoidoz",
      "sarcoidosis",
      "nonkazeifiye granülom",
      "Granülomatöz hastalık"
    ]
  },
  {
    "term": "Kazeifiye granülom",
    "aliases": [
      "caseating granuloma",
      "caseous granuloma"
    ],
    "category": "Patoloji",
    "previewDefinition": "Merkezinde peynirsi nekroz bulunan granülomatöz inflamasyon paternidir.",
    "preAnswerSafeDefinition": "Merkezinde peynirsi nekroz bulunan granülomatöz inflamasyon paternidir.",
    "shortDefinition": "Merkezinde peynirsi nekroz bulunan granülomatöz inflamasyon paternidir.",
    "detailedExplanation": "Merkezinde peynirsi nekroz bulunan granülomatöz inflamasyon paternidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Tüberküloz ve bazı fungal enfeksiyonlar için klasik patoloji ipucudur.",
    "tusPearl": "Tüberküloz ve bazı fungal enfeksiyonlar için klasik patoloji ipucudur.",
    "differentialPoint": "Sarkoidozda tipik granülom nonkazeifiyedir.",
    "clinicalRelevance": "Tüberküloz ve bazı fungal enfeksiyonlar için klasik patoloji ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "pathology",
      "infectious-diseases"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Kazeifiye granülom",
      "caseating granuloma",
      "caseous granuloma",
      "Patoloji"
    ]
  },
  {
    "term": "Restriktif akciğer hastalığı",
    "aliases": [
      "restriktif patern",
      "restrictive lung disease"
    ],
    "category": "Pulmoner fizyoloji",
    "previewDefinition": "Akciğer hacimlerinde azalma ve kompliyansta düşme ile seyreden solunum paterni grubudur.",
    "preAnswerSafeDefinition": "Akciğer hacimlerinde azalma ve kompliyansta düşme ile seyreden solunum paterni grubudur.",
    "shortDefinition": "Akciğer hacimlerinde azalma ve kompliyansta düşme ile seyreden solunum paterni grubudur.",
    "detailedExplanation": "Akciğer hacimlerinde azalma ve kompliyansta düşme ile seyreden solunum paterni grubudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "FVC azalır, FEV1/FVC oranı genellikle normal veya artmış bulunur.",
    "tusPearl": "FVC azalır, FEV1/FVC oranı genellikle normal veya artmış bulunur.",
    "differentialPoint": "Obstrüktif hastalıkta FEV1/FVC düşer.",
    "clinicalRelevance": "FVC azalır, FEV1/FVC oranı genellikle normal veya artmış bulunur.",
    "mechanism": "",
    "relatedBranches": [
      "pulmonology",
      "physiology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Restriktif akciğer hastalığı",
      "restriktif patern",
      "restrictive lung disease",
      "Pulmoner fizyoloji"
    ]
  },
  {
    "term": "Obstrüktif akciğer hastalığı",
    "aliases": [
      "obstrüktif patern",
      "obstructive lung disease"
    ],
    "category": "Pulmoner fizyoloji",
    "previewDefinition": "Hava akımında kısıtlanma ve ekspiryum güçlüğü ile seyreden hastalık grubudur.",
    "preAnswerSafeDefinition": "Hava akımında kısıtlanma ve ekspiryum güçlüğü ile seyreden hastalık grubudur.",
    "shortDefinition": "Hava akımında kısıtlanma ve ekspiryum güçlüğü ile seyreden hastalık grubudur.",
    "detailedExplanation": "Hava akımında kısıtlanma ve ekspiryum güçlüğü ile seyreden hastalık grubudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "FEV1/FVC oranının düşmesi obstrüktif paterni destekler.",
    "tusPearl": "FEV1/FVC oranının düşmesi obstrüktif paterni destekler.",
    "differentialPoint": "Restriktif paternde hacimler azalır; oran normal/artan olabilir.",
    "clinicalRelevance": "FEV1/FVC oranının düşmesi obstrüktif paterni destekler.",
    "mechanism": "",
    "relatedBranches": [
      "pulmonology",
      "physiology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Obstrüktif akciğer hastalığı",
      "obstrüktif patern",
      "obstructive lung disease",
      "Pulmoner fizyoloji"
    ]
  },
  {
    "term": "ARDS",
    "aliases": [
      "akut respiratuvar distres sendromu",
      "acute respiratory distress syndrome"
    ],
    "category": "Acil / Yoğun bakım",
    "previewDefinition": "Yaygın alveolokapiller hasara bağlı akut hipoksemik solunum yetmezliğidir.",
    "preAnswerSafeDefinition": "Yaygın alveolokapiller hasara bağlı akut hipoksemik solunum yetmezliğidir.",
    "shortDefinition": "Yaygın alveolokapiller hasara bağlı akut hipoksemik solunum yetmezliğidir.",
    "detailedExplanation": "Yaygın alveolokapiller hasara bağlı akut hipoksemik solunum yetmezliğidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "PaO2/FiO2 düşüklüğü + bilateral infiltratlar + kardiyak dışı ödem ARDS mantığıdır.",
    "tusPearl": "PaO2/FiO2 düşüklüğü + bilateral infiltratlar + kardiyak dışı ödem ARDS mantığıdır.",
    "differentialPoint": "Kardiyojenik pulmoner ödemde sol kalp yetmezliği bulguları daha baskındır.",
    "clinicalRelevance": "PaO2/FiO2 düşüklüğü + bilateral infiltratlar + kardiyak dışı ödem ARDS mantığıdır.",
    "mechanism": "",
    "relatedBranches": [
      "pulmonology",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "ARDS",
      "akut respiratuvar distres sendromu",
      "acute respiratory distress syndrome",
      "Acil / Yoğun bakım"
    ]
  },
  {
    "term": "Horner sendromu",
    "aliases": [
      "Horner triadı"
    ],
    "category": "Nörolojik bulgu",
    "previewDefinition": "Ptosis, miyozis ve anhidroz triadıyla seyreden sempatik yolak lezyonudur.",
    "preAnswerSafeDefinition": "Ptosis, miyozis ve anhidroz triadıyla seyreden sempatik yolak lezyonudur.",
    "shortDefinition": "Ptosis, miyozis ve anhidroz triadıyla seyreden sempatik yolak lezyonudur.",
    "detailedExplanation": "Ptosis, miyozis ve anhidroz triadıyla seyreden sempatik yolak lezyonudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Pancoast tümörü + omuz/kol ağrısı + Horner sendromu klasik TUS bağlantısıdır.",
    "tusPearl": "Pancoast tümörü + omuz/kol ağrısı + Horner sendromu klasik TUS bağlantısıdır.",
    "differentialPoint": "Okülomotor palside genellikle midriyazis ve göz hareket kısıtlılığı beklenir.",
    "clinicalRelevance": "Pancoast tümörü + omuz/kol ağrısı + Horner sendromu klasik TUS bağlantısıdır.",
    "mechanism": "",
    "relatedBranches": [
      "neurology",
      "pulmonology",
      "ophthalmology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Horner sendromu",
      "Horner triadı",
      "Nörolojik bulgu"
    ]
  },
  {
    "term": "Hiponatremi",
    "aliases": [
      "hyponatremia",
      "düşük sodyum"
    ],
    "category": "Elektrolit bozukluğu",
    "previewDefinition": "Serum sodyum düzeyinin düşmesidir.",
    "preAnswerSafeDefinition": "Serum sodyum düzeyinin düşmesidir.",
    "shortDefinition": "Serum sodyum düzeyinin düşmesidir.",
    "detailedExplanation": "Serum sodyum düzeyinin düşmesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Nörolojik semptomlu ağır hiponatremide hipertonik salin yaklaşımı sınav değeri taşır.",
    "tusPearl": "Nörolojik semptomlu ağır hiponatremide hipertonik salin yaklaşımı sınav değeri taşır.",
    "differentialPoint": "Psödohiponatremi hiperlipidemi/hiperproteinemi gibi ölçüm etkileriyle oluşabilir.",
    "clinicalRelevance": "Nörolojik semptomlu ağır hiponatremide hipertonik salin yaklaşımı sınav değeri taşır.",
    "mechanism": "",
    "relatedBranches": [
      "internal-medicine",
      "nephrology",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Hiponatremi",
      "hyponatremia",
      "düşük sodyum",
      "Elektrolit bozukluğu"
    ]
  },
  {
    "term": "SIADH",
    "aliases": [
      "uygunsuz ADH sendromu",
      "syndrome of inappropriate ADH"
    ],
    "category": "Endokrin / Elektrolit",
    "previewDefinition": "Uygunsuz ADH salınımına bağlı su tutulumu ve hiponatremi tablosudur.",
    "preAnswerSafeDefinition": "Uygunsuz ADH salınımına bağlı su tutulumu ve hiponatremi tablosudur.",
    "shortDefinition": "Uygunsuz ADH salınımına bağlı su tutulumu ve hiponatremi tablosudur.",
    "detailedExplanation": "Uygunsuz ADH salınımına bağlı su tutulumu ve hiponatremi tablosudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Övolemik hiponatremi + yüksek idrar ozmolalitesi + idrar sodyum yüksekliği SIADH düşündürür.",
    "tusPearl": "Övolemik hiponatremi + yüksek idrar ozmolalitesi + idrar sodyum yüksekliği SIADH düşündürür.",
    "differentialPoint": "Diabetes insipidusta su kaybı ve hipernatremi eğilimi beklenir.",
    "clinicalRelevance": "Övolemik hiponatremi + yüksek idrar ozmolalitesi + idrar sodyum yüksekliği SIADH düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "endocrinology",
      "nephrology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "SIADH",
      "uygunsuz ADH sendromu",
      "syndrome of inappropriate ADH",
      "Endokrin / Elektrolit"
    ]
  },
  {
    "term": "Diabetes insipidus",
    "aliases": [
      "DI",
      "diabetes insipidüs"
    ],
    "category": "Endokrin / Nefroloji",
    "previewDefinition": "ADH eksikliği veya ADH yanıt bozukluğu nedeniyle poliüri ve polidipsiyle seyreden tablodur.",
    "preAnswerSafeDefinition": "ADH eksikliği veya ADH yanıt bozukluğu nedeniyle poliüri ve polidipsiyle seyreden tablodur.",
    "shortDefinition": "ADH eksikliği veya ADH yanıt bozukluğu nedeniyle poliüri ve polidipsiyle seyreden tablodur.",
    "detailedExplanation": "ADH eksikliği veya ADH yanıt bozukluğu nedeniyle poliüri ve polidipsiyle seyreden tablodur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Santral DI desmopressine yanıt verir; nefrojenik DI yanıt vermez.",
    "tusPearl": "Santral DI desmopressine yanıt verir; nefrojenik DI yanıt vermez.",
    "differentialPoint": "Primer polidipside temel sorun aşırı su alımıdır.",
    "clinicalRelevance": "Santral DI desmopressine yanıt verir; nefrojenik DI yanıt vermez.",
    "mechanism": "",
    "relatedBranches": [
      "endocrinology",
      "nephrology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Diabetes insipidus",
      "DI",
      "diabetes insipidüs",
      "Endokrin / Nefroloji"
    ]
  },
  {
    "term": "Nefrojenik diabetes insipidus",
    "aliases": [
      "nefrojenik DI"
    ],
    "category": "Nefroloji",
    "previewDefinition": "Böbreğin ADH’ye yanıt verememesi nedeniyle gelişen diabetes insipidus tipidir.",
    "preAnswerSafeDefinition": "Böbreğin ADH’ye yanıt verememesi nedeniyle gelişen diabetes insipidus tipidir.",
    "shortDefinition": "Böbreğin ADH’ye yanıt verememesi nedeniyle gelişen diabetes insipidus tipidir.",
    "detailedExplanation": "Böbreğin ADH’ye yanıt verememesi nedeniyle gelişen diabetes insipidus tipidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Lityum kullanımı nefrojenik DI için klasik ilaç ilişkili ipucudur.",
    "tusPearl": "Lityum kullanımı nefrojenik DI için klasik ilaç ilişkili ipucudur.",
    "differentialPoint": "Santral DI’de ADH eksikliği vardır ve desmopressin yanıtı beklenir.",
    "clinicalRelevance": "Lityum kullanımı nefrojenik DI için klasik ilaç ilişkili ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "nephrology",
      "endocrinology",
      "pharmacology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Nefrojenik diabetes insipidus",
      "nefrojenik DI",
      "Nefroloji"
    ]
  },
  {
    "term": "Santral diabetes insipidus",
    "aliases": [
      "santral DI"
    ],
    "category": "Endokrinoloji",
    "previewDefinition": "ADH sentez veya salınım eksikliğiyle gelişen diabetes insipidus tipidir.",
    "preAnswerSafeDefinition": "ADH sentez veya salınım eksikliğiyle gelişen diabetes insipidus tipidir.",
    "shortDefinition": "ADH sentez veya salınım eksikliğiyle gelişen diabetes insipidus tipidir.",
    "detailedExplanation": "ADH sentez veya salınım eksikliğiyle gelişen diabetes insipidus tipidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Desmopressin sonrası idrar ozmolalitesinin artması santral DI lehinedir.",
    "tusPearl": "Desmopressin sonrası idrar ozmolalitesinin artması santral DI lehinedir.",
    "differentialPoint": "Nefrojenik DI’de böbrek yanıtı bozulduğu için desmopressin etkisi sınırlıdır.",
    "clinicalRelevance": "Desmopressin sonrası idrar ozmolalitesinin artması santral DI lehinedir.",
    "mechanism": "",
    "relatedBranches": [
      "endocrinology",
      "nephrology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Santral diabetes insipidus",
      "santral DI",
      "Endokrinoloji"
    ]
  },
  {
    "term": "Nefrotik sendrom",
    "aliases": [
      "nephrotic syndrome"
    ],
    "category": "Nefroloji",
    "previewDefinition": "Masif proteinüri, hipoalbuminemi, ödem ve hiperlipidemi ile seyreden glomerüler sendromdur.",
    "preAnswerSafeDefinition": "Masif proteinüri, hipoalbuminemi, ödem ve hiperlipidemi ile seyreden glomerüler sendromdur.",
    "shortDefinition": "Masif proteinüri, hipoalbuminemi, ödem ve hiperlipidemi ile seyreden glomerüler sendromdur.",
    "detailedExplanation": "Masif proteinüri, hipoalbuminemi, ödem ve hiperlipidemi ile seyreden glomerüler sendromdur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Çocukta en sık neden minimal değişiklik hastalığıdır; erişkinde membranöz nefropati önemli nedenlerdendir.",
    "tusPearl": "Çocukta en sık neden minimal değişiklik hastalığıdır; erişkinde membranöz nefropati önemli nedenlerdendir.",
    "differentialPoint": "Nefritik sendromda hematüri, hipertansiyon ve azotemi daha baskındır.",
    "clinicalRelevance": "Çocukta en sık neden minimal değişiklik hastalığıdır; erişkinde membranöz nefropati önemli nedenlerdendir.",
    "mechanism": "",
    "relatedBranches": [
      "nephrology",
      "pediatrics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Nefrotik sendrom",
      "nephrotic syndrome",
      "Nefroloji"
    ]
  },
  {
    "term": "Nefritik sendrom",
    "aliases": [
      "nephritic syndrome"
    ],
    "category": "Nefroloji",
    "previewDefinition": "Glomerüler inflamasyona bağlı hematüri, hipertansiyon, ödem ve böbrek fonksiyon bozukluğu tablosudur.",
    "preAnswerSafeDefinition": "Glomerüler inflamasyona bağlı hematüri, hipertansiyon, ödem ve böbrek fonksiyon bozukluğu tablosudur.",
    "shortDefinition": "Glomerüler inflamasyona bağlı hematüri, hipertansiyon, ödem ve böbrek fonksiyon bozukluğu tablosudur.",
    "detailedExplanation": "Glomerüler inflamasyona bağlı hematüri, hipertansiyon, ödem ve böbrek fonksiyon bozukluğu tablosudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Kola rengi idrar ve eritrosit silendirleri nefritik sendrom için yüksek değerli ipucudur.",
    "tusPearl": "Kola rengi idrar ve eritrosit silendirleri nefritik sendrom için yüksek değerli ipucudur.",
    "differentialPoint": "Nefrotik sendromda masif proteinüri ve hipoalbuminemi baskındır.",
    "clinicalRelevance": "Kola rengi idrar ve eritrosit silendirleri nefritik sendrom için yüksek değerli ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "nephrology",
      "pediatrics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Nefritik sendrom",
      "nephritic syndrome",
      "Nefroloji"
    ]
  },
  {
    "term": "Minimal değişiklik hastalığı",
    "aliases": [
      "minimal change disease",
      "MCD"
    ],
    "category": "Nefroloji",
    "previewDefinition": "Çocuklarda nefrotik sendromun en sık nedeni olan podosit hastalığıdır.",
    "preAnswerSafeDefinition": "Çocuklarda nefrotik sendromun en sık nedeni olan podosit hastalığıdır.",
    "shortDefinition": "Çocuklarda nefrotik sendromun en sık nedeni olan podosit hastalığıdır.",
    "detailedExplanation": "Çocuklarda nefrotik sendromun en sık nedeni olan podosit hastalığıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Işık mikroskopisi normal, elektron mikroskopisinde foot process effacement klasik bilgidir.",
    "tusPearl": "Işık mikroskopisi normal, elektron mikroskopisinde foot process effacement klasik bilgidir.",
    "differentialPoint": "FSGS daha çok steroid dirençli nefrotik sendromla ilişkilidir.",
    "clinicalRelevance": "Işık mikroskopisi normal, elektron mikroskopisinde foot process effacement klasik bilgidir.",
    "mechanism": "",
    "relatedBranches": [
      "nephrology",
      "pediatrics",
      "pathology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Minimal değişiklik hastalığı",
      "minimal change disease",
      "MCD",
      "Nefroloji"
    ]
  },
  {
    "term": "Membranöz nefropati",
    "aliases": [
      "membranous nephropathy"
    ],
    "category": "Nefroloji",
    "previewDefinition": "Glomerüler bazal membranda immün kompleks birikimiyle seyreden nefrotik sendrom nedenidir.",
    "preAnswerSafeDefinition": "Glomerüler bazal membranda immün kompleks birikimiyle seyreden nefrotik sendrom nedenidir.",
    "shortDefinition": "Glomerüler bazal membranda immün kompleks birikimiyle seyreden nefrotik sendrom nedenidir.",
    "detailedExplanation": "Glomerüler bazal membranda immün kompleks birikimiyle seyreden nefrotik sendrom nedenidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Erişkinde nefrotik sendrom + malignite/NSAİİ/hepatit B ilişkisi membranöz nefropatiyi düşündürebilir.",
    "tusPearl": "Erişkinde nefrotik sendrom + malignite/NSAİİ/hepatit B ilişkisi membranöz nefropatiyi düşündürebilir.",
    "differentialPoint": "Minimal değişiklik daha çok çocuk ve steroid yanıtıyla ilişkilidir.",
    "clinicalRelevance": "Erişkinde nefrotik sendrom + malignite/NSAİİ/hepatit B ilişkisi membranöz nefropatiyi düşündürebilir.",
    "mechanism": "",
    "relatedBranches": [
      "nephrology",
      "pathology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Membranöz nefropati",
      "membranous nephropathy",
      "Nefroloji"
    ]
  },
  {
    "term": "IgA nefropatisi",
    "aliases": [
      "Berger hastalığı",
      "IgA nephropathy"
    ],
    "category": "Nefroloji",
    "previewDefinition": "Mezangial IgA birikimiyle seyreden glomerülonefrittir.",
    "preAnswerSafeDefinition": "Mezangial IgA birikimiyle seyreden glomerülonefrittir.",
    "shortDefinition": "Mezangial IgA birikimiyle seyreden glomerülonefrittir.",
    "detailedExplanation": "Mezangial IgA birikimiyle seyreden glomerülonefrittir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Üst solunum yolu enfeksiyonundan kısa süre sonra hematüri IgA nefropatisi için tipiktir.",
    "tusPearl": "Üst solunum yolu enfeksiyonundan kısa süre sonra hematüri IgA nefropatisi için tipiktir.",
    "differentialPoint": "Poststreptokokal GN genellikle enfeksiyondan haftalar sonra gelişir.",
    "clinicalRelevance": "Üst solunum yolu enfeksiyonundan kısa süre sonra hematüri IgA nefropatisi için tipiktir.",
    "mechanism": "",
    "relatedBranches": [
      "nephrology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "IgA nefropatisi",
      "Berger hastalığı",
      "IgA nephropathy",
      "Nefroloji"
    ]
  },
  {
    "term": "Poststreptokokal glomerülonefrit",
    "aliases": [
      "PSGN",
      "poststreptococcal GN"
    ],
    "category": "Nefroloji",
    "previewDefinition": "Streptokok enfeksiyonu sonrası immün kompleks aracılı nefritik tablodur.",
    "preAnswerSafeDefinition": "Streptokok enfeksiyonu sonrası immün kompleks aracılı nefritik tablodur.",
    "shortDefinition": "Streptokok enfeksiyonu sonrası immün kompleks aracılı nefritik tablodur.",
    "detailedExplanation": "Streptokok enfeksiyonu sonrası immün kompleks aracılı nefritik tablodur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Boğaz/cilt enfeksiyonundan haftalar sonra hematüri + düşük C3 klasik ipucudur.",
    "tusPearl": "Boğaz/cilt enfeksiyonundan haftalar sonra hematüri + düşük C3 klasik ipucudur.",
    "differentialPoint": "IgA nefropatisinde hematüri enfeksiyonla daha eş zamanlıdır.",
    "clinicalRelevance": "Boğaz/cilt enfeksiyonundan haftalar sonra hematüri + düşük C3 klasik ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "nephrology",
      "pediatrics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Poststreptokokal glomerülonefrit",
      "PSGN",
      "poststreptococcal GN",
      "Nefroloji"
    ]
  },
  {
    "term": "Eritrosit silendiri",
    "aliases": [
      "RBC cast",
      "alyuvar silendiri"
    ],
    "category": "İdrar mikroskopisi",
    "previewDefinition": "İdrarda eritrositlerin silendir yapısı içinde görülmesidir.",
    "preAnswerSafeDefinition": "İdrarda eritrositlerin silendir yapısı içinde görülmesidir.",
    "shortDefinition": "İdrarda eritrositlerin silendir yapısı içinde görülmesidir.",
    "detailedExplanation": "İdrarda eritrositlerin silendir yapısı içinde görülmesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Glomerüler kaynaklı hematüriyi destekleyen çok yüksek değerli bulgudur.",
    "tusPearl": "Glomerüler kaynaklı hematüriyi destekleyen çok yüksek değerli bulgudur.",
    "differentialPoint": "Alt üriner sistem kanamasında eritrosit olabilir ama eritrosit silendiri beklenmez.",
    "clinicalRelevance": "Glomerüler kaynaklı hematüriyi destekleyen çok yüksek değerli bulgudur.",
    "mechanism": "",
    "relatedBranches": [
      "nephrology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Eritrosit silendiri",
      "RBC cast",
      "alyuvar silendiri",
      "İdrar mikroskopisi"
    ]
  },
  {
    "term": "Granüler silendir",
    "aliases": [
      "muddy brown cast",
      "kahverengi silendir"
    ],
    "category": "İdrar mikroskopisi",
    "previewDefinition": "Tübüler hücre/debris kaynaklı granüler görünümde silendirdir.",
    "preAnswerSafeDefinition": "Tübüler hücre/debris kaynaklı granüler görünümde silendirdir.",
    "shortDefinition": "Tübüler hücre/debris kaynaklı granüler görünümde silendirdir.",
    "detailedExplanation": "Tübüler hücre/debris kaynaklı granüler görünümde silendirdir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Akut tübüler nekrozda çamurumsu kahverengi granüler silendir tipiktir.",
    "tusPearl": "Akut tübüler nekrozda çamurumsu kahverengi granüler silendir tipiktir.",
    "differentialPoint": "Eritrosit silendiri glomerülonefriti daha çok destekler.",
    "clinicalRelevance": "Akut tübüler nekrozda çamurumsu kahverengi granüler silendir tipiktir.",
    "mechanism": "",
    "relatedBranches": [
      "nephrology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Granüler silendir",
      "muddy brown cast",
      "kahverengi silendir",
      "İdrar mikroskopisi"
    ]
  },
  {
    "term": "Prerenal azotemi",
    "aliases": [
      "prerenal böbrek yetmezliği"
    ],
    "category": "Nefroloji",
    "previewDefinition": "Renal perfüzyon azalmasına bağlı kreatinin/üre artışıdır.",
    "preAnswerSafeDefinition": "Renal perfüzyon azalmasına bağlı kreatinin/üre artışıdır.",
    "shortDefinition": "Renal perfüzyon azalmasına bağlı kreatinin/üre artışıdır.",
    "detailedExplanation": "Renal perfüzyon azalmasına bağlı kreatinin/üre artışıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "BUN/kreatinin oranı yüksek, FeNa düşük ve idrar sodyumu düşük olması prerenal tabloyu destekler.",
    "tusPearl": "BUN/kreatinin oranı yüksek, FeNa düşük ve idrar sodyumu düşük olması prerenal tabloyu destekler.",
    "differentialPoint": "ATN’de tübüler hasar nedeniyle FeNa genellikle yükselir.",
    "clinicalRelevance": "BUN/kreatinin oranı yüksek, FeNa düşük ve idrar sodyumu düşük olması prerenal tabloyu destekler.",
    "mechanism": "",
    "relatedBranches": [
      "nephrology",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Prerenal azotemi",
      "prerenal böbrek yetmezliği",
      "Nefroloji"
    ]
  },
  {
    "term": "Akut tübüler nekroz",
    "aliases": [
      "ATN",
      "acute tubular necrosis"
    ],
    "category": "Nefroloji",
    "previewDefinition": "İskemik veya toksik tübüler hasara bağlı akut böbrek hasarıdır.",
    "preAnswerSafeDefinition": "İskemik veya toksik tübüler hasara bağlı akut böbrek hasarıdır.",
    "shortDefinition": "İskemik veya toksik tübüler hasara bağlı akut böbrek hasarıdır.",
    "detailedExplanation": "İskemik veya toksik tübüler hasara bağlı akut böbrek hasarıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Muddy brown cast + FeNa yüksekliği ATN lehinedir.",
    "tusPearl": "Muddy brown cast + FeNa yüksekliği ATN lehinedir.",
    "differentialPoint": "Prerenal azotemide tübül sağlam olduğu için sodyum tutulumu artar.",
    "clinicalRelevance": "Muddy brown cast + FeNa yüksekliği ATN lehinedir.",
    "mechanism": "",
    "relatedBranches": [
      "nephrology",
      "pathology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Akut tübüler nekroz",
      "ATN",
      "acute tubular necrosis",
      "Nefroloji"
    ]
  },
  {
    "term": "Renal tübüler asidoz",
    "aliases": [
      "RTA",
      "renal tubular acidosis"
    ],
    "category": "Asit-baz bozukluğu",
    "previewDefinition": "Böbreğin asit atılımı veya bikarbonat geri emilim kusuruna bağlı normal anion gap asidozdur.",
    "preAnswerSafeDefinition": "Böbreğin asit atılımı veya bikarbonat geri emilim kusuruna bağlı normal anion gap asidozdur.",
    "shortDefinition": "Böbreğin asit atılımı veya bikarbonat geri emilim kusuruna bağlı normal anion gap asidozdur.",
    "detailedExplanation": "Böbreğin asit atılımı veya bikarbonat geri emilim kusuruna bağlı normal anion gap asidozdur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Normal anion gap metabolik asidozda RTA ve gastrointestinal bikarbonat kaybı ayırıcı tanıya alınır.",
    "tusPearl": "Normal anion gap metabolik asidozda RTA ve gastrointestinal bikarbonat kaybı ayırıcı tanıya alınır.",
    "differentialPoint": "DKA ve laktik asidoz yüksek anion gap asidoz yapar.",
    "clinicalRelevance": "Normal anion gap metabolik asidozda RTA ve gastrointestinal bikarbonat kaybı ayırıcı tanıya alınır.",
    "mechanism": "",
    "relatedBranches": [
      "nephrology",
      "internal-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Renal tübüler asidoz",
      "RTA",
      "renal tubular acidosis",
      "Asit-baz bozukluğu"
    ]
  },
  {
    "term": "Anion gap",
    "aliases": [
      "anyon açığı",
      "anion gap"
    ],
    "category": "Asit-baz",
    "previewDefinition": "Serumda ölçülmeyen anyon yükünü dolaylı hesaplayan değerdir.",
    "preAnswerSafeDefinition": "Serumda ölçülmeyen anyon yükünü dolaylı hesaplayan değerdir.",
    "shortDefinition": "Serumda ölçülmeyen anyon yükünü dolaylı hesaplayan değerdir.",
    "detailedExplanation": "Serumda ölçülmeyen anyon yükünü dolaylı hesaplayan değerdir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Yüksek anion gap DKA, laktik asidoz, üremi ve toksik alımlar için ipucudur.",
    "tusPearl": "Yüksek anion gap DKA, laktik asidoz, üremi ve toksik alımlar için ipucudur.",
    "differentialPoint": "Normal anion gap asidozda bikarbonat kaybı veya RTA düşünülür.",
    "clinicalRelevance": "Yüksek anion gap DKA, laktik asidoz, üremi ve toksik alımlar için ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "nephrology",
      "biochemistry",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Anion gap",
      "anyon açığı",
      "anion gap",
      "Asit-baz"
    ]
  },
  {
    "term": "Osmolar gap",
    "aliases": [
      "osmolal gap",
      "osmolar açıklık"
    ],
    "category": "Toksikoloji",
    "previewDefinition": "Ölçülen ve hesaplanan serum osmolalitesi arasındaki farktır.",
    "preAnswerSafeDefinition": "Ölçülen ve hesaplanan serum osmolalitesi arasındaki farktır.",
    "shortDefinition": "Ölçülen ve hesaplanan serum osmolalitesi arasındaki farktır.",
    "detailedExplanation": "Ölçülen ve hesaplanan serum osmolalitesi arasındaki farktır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Metanol ve etilen glikol zehirlenmesinde osmolar gap yüksekliği kritik ipucudur.",
    "tusPearl": "Metanol ve etilen glikol zehirlenmesinde osmolar gap yüksekliği kritik ipucudur.",
    "differentialPoint": "Anion gap asidoz geç dönemde belirginleşebilir; erken dönemde osmolar gap öne çıkabilir.",
    "clinicalRelevance": "Metanol ve etilen glikol zehirlenmesinde osmolar gap yüksekliği kritik ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "emergency-medicine",
      "biochemistry"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Osmolar gap",
      "osmolal gap",
      "osmolar açıklık",
      "Toksikoloji"
    ]
  },
  {
    "term": "Diyabetik ketoasidoz",
    "aliases": [
      "DKA",
      "diabetic ketoacidosis"
    ],
    "category": "Endokrin acil",
    "previewDefinition": "İnsülin eksikliğiyle ketogenez, hiperglisemi ve yüksek anion gap asidoz gelişmesidir.",
    "preAnswerSafeDefinition": "İnsülin eksikliğiyle ketogenez, hiperglisemi ve yüksek anion gap asidoz gelişmesidir.",
    "shortDefinition": "İnsülin eksikliğiyle ketogenez, hiperglisemi ve yüksek anion gap asidoz gelişmesidir.",
    "detailedExplanation": "İnsülin eksikliğiyle ketogenez, hiperglisemi ve yüksek anion gap asidoz gelişmesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "DKA’da sıvı tedavisi ilk basamaktır; potasyuma göre insülin zamanlaması belirlenir.",
    "tusPearl": "DKA’da sıvı tedavisi ilk basamaktır; potasyuma göre insülin zamanlaması belirlenir.",
    "differentialPoint": "HHS’de ketoz/asidoz daha hafif, hiperozmolarite daha belirgindir.",
    "clinicalRelevance": "DKA’da sıvı tedavisi ilk basamaktır; potasyuma göre insülin zamanlaması belirlenir.",
    "mechanism": "",
    "relatedBranches": [
      "endocrinology",
      "emergency-medicine",
      "biochemistry"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Diyabetik ketoasidoz",
      "DKA",
      "diabetic ketoacidosis",
      "Endokrin acil"
    ]
  },
  {
    "term": "Hiperozmolar hiperglisemik durum",
    "aliases": [
      "HHS",
      "hiperozmolar koma"
    ],
    "category": "Endokrin acil",
    "previewDefinition": "Belirgin hiperglisemi ve hiperozmolariteyle seyreden, ketozun sınırlı olduğu diyabetik acildir.",
    "preAnswerSafeDefinition": "Belirgin hiperglisemi ve hiperozmolariteyle seyreden, ketozun sınırlı olduğu diyabetik acildir.",
    "shortDefinition": "Belirgin hiperglisemi ve hiperozmolariteyle seyreden, ketozun sınırlı olduğu diyabetik acildir.",
    "detailedExplanation": "Belirgin hiperglisemi ve hiperozmolariteyle seyreden, ketozun sınırlı olduğu diyabetik acildir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Yaşlı tip 2 diyabet hastasında ciddi dehidratasyon + çok yüksek glukoz HHS düşündürür.",
    "tusPearl": "Yaşlı tip 2 diyabet hastasında ciddi dehidratasyon + çok yüksek glukoz HHS düşündürür.",
    "differentialPoint": "DKA’da ketonemi ve asidoz daha baskındır.",
    "clinicalRelevance": "Yaşlı tip 2 diyabet hastasında ciddi dehidratasyon + çok yüksek glukoz HHS düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "endocrinology",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Hiperozmolar hiperglisemik durum",
      "HHS",
      "hiperozmolar koma",
      "Endokrin acil"
    ]
  },
  {
    "term": "Adrenal kriz",
    "aliases": [
      "addison krizi",
      "adrenal insufficiency crisis"
    ],
    "category": "Endokrin acil",
    "previewDefinition": "Kortizol eksikliğine bağlı hipotansiyon, hipoglisemi ve elektrolit bozukluğu ile seyreden acildir.",
    "preAnswerSafeDefinition": "Kortizol eksikliğine bağlı hipotansiyon, hipoglisemi ve elektrolit bozukluğu ile seyreden acildir.",
    "shortDefinition": "Kortizol eksikliğine bağlı hipotansiyon, hipoglisemi ve elektrolit bozukluğu ile seyreden acildir.",
    "detailedExplanation": "Kortizol eksikliğine bağlı hipotansiyon, hipoglisemi ve elektrolit bozukluğu ile seyreden acildir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Şok + hiponatremi + hiperkalemi + steroid öyküsü adrenal kriz düşündürür; hidrokortizon geciktirilmemelidir.",
    "tusPearl": "Şok + hiponatremi + hiperkalemi + steroid öyküsü adrenal kriz düşündürür; hidrokortizon geciktirilmemelidir.",
    "differentialPoint": "Sepsiste ateş ve enfeksiyon odağı daha baskın olabilir; ikisi birlikte de görülebilir.",
    "clinicalRelevance": "Şok + hiponatremi + hiperkalemi + steroid öyküsü adrenal kriz düşündürür; hidrokortizon geciktirilmemelidir.",
    "mechanism": "",
    "relatedBranches": [
      "endocrinology",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Adrenal kriz",
      "addison krizi",
      "adrenal insufficiency crisis",
      "Endokrin acil"
    ]
  },
  {
    "term": "Cushing sendromu",
    "aliases": [
      "Cushing syndrome",
      "hiperkortizolizm"
    ],
    "category": "Endokrinoloji",
    "previewDefinition": "Kronik glukokortikoid fazlalığına bağlı metabolik ve fenotipik değişikliklerdir.",
    "preAnswerSafeDefinition": "Kronik glukokortikoid fazlalığına bağlı metabolik ve fenotipik değişikliklerdir.",
    "shortDefinition": "Kronik glukokortikoid fazlalığına bağlı metabolik ve fenotipik değişikliklerdir.",
    "detailedExplanation": "Kronik glukokortikoid fazlalığına bağlı metabolik ve fenotipik değişikliklerdir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Santral obezite, mor stria, proksimal kas güçsüzlüğü ve hipertansiyon Cushing ipuçlarıdır.",
    "tusPearl": "Santral obezite, mor stria, proksimal kas güçsüzlüğü ve hipertansiyon Cushing ipuçlarıdır.",
    "differentialPoint": "Metabolik sendromda mor stria ve proksimal miyopati beklenmez.",
    "clinicalRelevance": "Santral obezite, mor stria, proksimal kas güçsüzlüğü ve hipertansiyon Cushing ipuçlarıdır.",
    "mechanism": "",
    "relatedBranches": [
      "endocrinology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Cushing sendromu",
      "Cushing syndrome",
      "hiperkortizolizm",
      "Endokrinoloji"
    ]
  },
  {
    "term": "Addison hastalığı",
    "aliases": [
      "primer adrenal yetmezlik",
      "Addison disease"
    ],
    "category": "Endokrinoloji",
    "previewDefinition": "Primer adrenal yetmezliğe bağlı kortizol ve aldosteron eksikliğidir.",
    "preAnswerSafeDefinition": "Primer adrenal yetmezliğe bağlı kortizol ve aldosteron eksikliğidir.",
    "shortDefinition": "Primer adrenal yetmezliğe bağlı kortizol ve aldosteron eksikliğidir.",
    "detailedExplanation": "Primer adrenal yetmezliğe bağlı kortizol ve aldosteron eksikliğidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Hiperpigmentasyon + hiponatremi + hiperkalemi primer adrenal yetmezlik için yüksek değerli ipucudur.",
    "tusPearl": "Hiperpigmentasyon + hiponatremi + hiperkalemi primer adrenal yetmezlik için yüksek değerli ipucudur.",
    "differentialPoint": "Sekonder adrenal yetmezlikte aldosteron genellikle korunur; hiperkalemi daha az beklenir.",
    "clinicalRelevance": "Hiperpigmentasyon + hiponatremi + hiperkalemi primer adrenal yetmezlik için yüksek değerli ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "endocrinology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Addison hastalığı",
      "primer adrenal yetmezlik",
      "Addison disease",
      "Endokrinoloji"
    ]
  },
  {
    "term": "Graves hastalığı",
    "aliases": [
      "Graves",
      "Basedow",
      "Graves disease"
    ],
    "category": "Endokrinoloji",
    "previewDefinition": "TSH reseptörünü uyaran otoantikorlarla gelişen hipertiroidi nedenidir.",
    "preAnswerSafeDefinition": "TSH reseptörünü uyaran otoantikorlarla gelişen hipertiroidi nedenidir.",
    "shortDefinition": "TSH reseptörünü uyaran otoantikorlarla gelişen hipertiroidi nedenidir.",
    "detailedExplanation": "TSH reseptörünü uyaran otoantikorlarla gelişen hipertiroidi nedenidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Ekzoftalmi ve pretibial miksödem Graves için ayırıcı değeri yüksek bulgulardır.",
    "tusPearl": "Ekzoftalmi ve pretibial miksödem Graves için ayırıcı değeri yüksek bulgulardır.",
    "differentialPoint": "Toksik multinodüler guatrda oftalmopati beklenmez.",
    "clinicalRelevance": "Ekzoftalmi ve pretibial miksödem Graves için ayırıcı değeri yüksek bulgulardır.",
    "mechanism": "",
    "relatedBranches": [
      "endocrinology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Graves hastalığı",
      "Basedow",
      "Graves disease",
      "Endokrinoloji"
    ]
  },
  {
    "term": "Hashimoto tiroiditi",
    "aliases": [
      "Hashimoto thyroiditis",
      "kronik otoimmün tiroidit"
    ],
    "category": "Endokrinoloji",
    "previewDefinition": "Otoimmün tiroid yıkımıyla hipotiroidiye yol açabilen kronik tiroidittir.",
    "preAnswerSafeDefinition": "Otoimmün tiroid yıkımıyla hipotiroidiye yol açabilen kronik tiroidittir.",
    "shortDefinition": "Otoimmün tiroid yıkımıyla hipotiroidiye yol açabilen kronik tiroidittir.",
    "detailedExplanation": "Otoimmün tiroid yıkımıyla hipotiroidiye yol açabilen kronik tiroidittir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Anti-TPO pozitifliği ve ağrısız guatr Hashimoto için tipiktir.",
    "tusPearl": "Anti-TPO pozitifliği ve ağrısız guatr Hashimoto için tipiktir.",
    "differentialPoint": "Subakut tiroidit genellikle ağrılıdır ve viral prodrom sonrası gelişir.",
    "clinicalRelevance": "Anti-TPO pozitifliği ve ağrısız guatr Hashimoto için tipiktir.",
    "mechanism": "",
    "relatedBranches": [
      "endocrinology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Hashimoto tiroiditi",
      "Hashimoto thyroiditis",
      "kronik otoimmün tiroidit",
      "Endokrinoloji"
    ]
  },
  {
    "term": "Subakut tiroidit",
    "aliases": [
      "De Quervain tiroiditi"
    ],
    "category": "Endokrinoloji",
    "previewDefinition": "Viral enfeksiyon sonrası ağrılı tiroid büyümesi ve geçici tirotoksikozla seyredebilir.",
    "preAnswerSafeDefinition": "Viral enfeksiyon sonrası ağrılı tiroid büyümesi ve geçici tirotoksikozla seyredebilir.",
    "shortDefinition": "Viral enfeksiyon sonrası ağrılı tiroid büyümesi ve geçici tirotoksikozla seyredebilir.",
    "detailedExplanation": "Viral enfeksiyon sonrası ağrılı tiroid büyümesi ve geçici tirotoksikozla seyredebilir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Ağrılı tiroid + yüksek ESR + düşük radyoiyot uptake subakut tiroidit için klasik bilgidir.",
    "tusPearl": "Ağrılı tiroid + yüksek ESR + düşük radyoiyot uptake subakut tiroidit için klasik bilgidir.",
    "differentialPoint": "Graves’te uptake artar ve oftalmopati olabilir.",
    "clinicalRelevance": "Ağrılı tiroid + yüksek ESR + düşük radyoiyot uptake subakut tiroidit için klasik bilgidir.",
    "mechanism": "",
    "relatedBranches": [
      "endocrinology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Subakut tiroidit",
      "De Quervain tiroiditi",
      "Endokrinoloji"
    ]
  },
  {
    "term": "Feokromositoma",
    "aliases": [
      "pheochromocytoma"
    ],
    "category": "Endokrinoloji",
    "previewDefinition": "Katekolamin salgılayan adrenal medulla veya paraganglion tümörüdür.",
    "preAnswerSafeDefinition": "Katekolamin salgılayan adrenal medulla veya paraganglion tümörüdür.",
    "shortDefinition": "Katekolamin salgılayan adrenal medulla veya paraganglion tümörüdür.",
    "detailedExplanation": "Katekolamin salgılayan adrenal medulla veya paraganglion tümörüdür. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Episodik baş ağrısı, terleme, çarpıntı ve hipertansiyon triadı feokromositoma düşündürür.",
    "tusPearl": "Episodik baş ağrısı, terleme, çarpıntı ve hipertansiyon triadı feokromositoma düşündürür.",
    "differentialPoint": "Tedavide alfa blokaj beta blokajdan önce verilmelidir.",
    "clinicalRelevance": "Episodik baş ağrısı, terleme, çarpıntı ve hipertansiyon triadı feokromositoma düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "endocrinology",
      "cardiovascular"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Feokromositoma",
      "pheochromocytoma",
      "Endokrinoloji"
    ]
  },
  {
    "term": "Primer hiperaldosteronizm",
    "aliases": [
      "Conn sendromu",
      "Conn syndrome"
    ],
    "category": "Endokrinoloji",
    "previewDefinition": "Aldosteron fazlalığına bağlı hipertansiyon ve hipokalemi ile seyreden tablodur.",
    "preAnswerSafeDefinition": "Aldosteron fazlalığına bağlı hipertansiyon ve hipokalemi ile seyreden tablodur.",
    "shortDefinition": "Aldosteron fazlalığına bağlı hipertansiyon ve hipokalemi ile seyreden tablodur.",
    "detailedExplanation": "Aldosteron fazlalığına bağlı hipertansiyon ve hipokalemi ile seyreden tablodur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Hipertansiyon + hipokalemi + düşük renin primer hiperaldosteronizm için ipucudur.",
    "tusPearl": "Hipertansiyon + hipokalemi + düşük renin primer hiperaldosteronizm için ipucudur.",
    "differentialPoint": "Sekonder hiperaldosteronizmde renin de genellikle yüksektir.",
    "clinicalRelevance": "Hipertansiyon + hipokalemi + düşük renin primer hiperaldosteronizm için ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "endocrinology",
      "nephrology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Primer hiperaldosteronizm",
      "Conn sendromu",
      "Conn syndrome",
      "Endokrinoloji"
    ]
  },
  {
    "term": "Akromegali",
    "aliases": [
      "acromegaly"
    ],
    "category": "Endokrinoloji",
    "previewDefinition": "Erişkinde büyüme hormonu/IGF-1 fazlalığına bağlı akral büyüme tablosudur.",
    "preAnswerSafeDefinition": "Erişkinde büyüme hormonu/IGF-1 fazlalığına bağlı akral büyüme tablosudur.",
    "shortDefinition": "Erişkinde büyüme hormonu/IGF-1 fazlalığına bağlı akral büyüme tablosudur.",
    "detailedExplanation": "Erişkinde büyüme hormonu/IGF-1 fazlalığına bağlı akral büyüme tablosudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "IGF-1 yüksekliği ve oral glukozla GH baskılanmaması tanıda değerlidir.",
    "tusPearl": "IGF-1 yüksekliği ve oral glukozla GH baskılanmaması tanıda değerlidir.",
    "differentialPoint": "Gigantizm epifiz kapanmadan önce GH fazlalığıyla oluşur.",
    "clinicalRelevance": "IGF-1 yüksekliği ve oral glukozla GH baskılanmaması tanıda değerlidir.",
    "mechanism": "",
    "relatedBranches": [
      "endocrinology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Akromegali",
      "acromegaly",
      "Endokrinoloji"
    ]
  },
  {
    "term": "MEN 1",
    "aliases": [
      "multiple endocrine neoplasia type 1",
      "Wermer sendromu"
    ],
    "category": "Endokrin genetik",
    "previewDefinition": "Paratiroid, pankreatik endokrin tümör ve hipofiz tümörleriyle ilişkili sendromdur.",
    "preAnswerSafeDefinition": "Paratiroid, pankreatik endokrin tümör ve hipofiz tümörleriyle ilişkili sendromdur.",
    "shortDefinition": "Paratiroid, pankreatik endokrin tümör ve hipofiz tümörleriyle ilişkili sendromdur.",
    "detailedExplanation": "Paratiroid, pankreatik endokrin tümör ve hipofiz tümörleriyle ilişkili sendromdur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "“3P” mantığı: parathyroid, pancreatic, pituitary.",
    "tusPearl": "“3P” mantığı: parathyroid, pancreatic, pituitary.",
    "differentialPoint": "MEN2’de medüller tiroid kanseri ve feokromositoma öne çıkar.",
    "clinicalRelevance": "“3P” mantığı: parathyroid, pancreatic, pituitary.",
    "mechanism": "",
    "relatedBranches": [
      "endocrinology",
      "genetics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "MEN 1",
      "multiple endocrine neoplasia type 1",
      "Wermer sendromu",
      "Endokrin genetik"
    ]
  },
  {
    "term": "MEN 2",
    "aliases": [
      "MEN2",
      "multiple endocrine neoplasia type 2"
    ],
    "category": "Endokrin genetik",
    "previewDefinition": "Medüller tiroid kanseri, feokromositoma ve paratiroid hastalığıyla ilişkili sendrom grubudur.",
    "preAnswerSafeDefinition": "Medüller tiroid kanseri, feokromositoma ve paratiroid hastalığıyla ilişkili sendrom grubudur.",
    "shortDefinition": "Medüller tiroid kanseri, feokromositoma ve paratiroid hastalığıyla ilişkili sendrom grubudur.",
    "detailedExplanation": "Medüller tiroid kanseri, feokromositoma ve paratiroid hastalığıyla ilişkili sendrom grubudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "RET mutasyonu ve medüller tiroid kanseri MEN2 için yüksek değerli bilgidir.",
    "tusPearl": "RET mutasyonu ve medüller tiroid kanseri MEN2 için yüksek değerli bilgidir.",
    "differentialPoint": "MEN1’de pankreas ve hipofiz tümörleri daha baskındır.",
    "clinicalRelevance": "RET mutasyonu ve medüller tiroid kanseri MEN2 için yüksek değerli bilgidir.",
    "mechanism": "",
    "relatedBranches": [
      "endocrinology",
      "genetics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "MEN 2",
      "MEN2",
      "multiple endocrine neoplasia type 2",
      "Endokrin genetik"
    ]
  },
  {
    "term": "Hipoparatiroidi",
    "aliases": [
      "hypoparathyroidism"
    ],
    "category": "Endokrinoloji",
    "previewDefinition": "PTH eksikliğine bağlı hipokalsemi ve hiperfosfatemi tablosudur.",
    "preAnswerSafeDefinition": "PTH eksikliğine bağlı hipokalsemi ve hiperfosfatemi tablosudur.",
    "shortDefinition": "PTH eksikliğine bağlı hipokalsemi ve hiperfosfatemi tablosudur.",
    "detailedExplanation": "PTH eksikliğine bağlı hipokalsemi ve hiperfosfatemi tablosudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Tiroidektomi sonrası perioral uyuşma, tetani ve Chvostek/Trousseau bulguları hipokalsemi düşündürür.",
    "tusPearl": "Tiroidektomi sonrası perioral uyuşma, tetani ve Chvostek/Trousseau bulguları hipokalsemi düşündürür.",
    "differentialPoint": "Psödohipoparatiroidide PTH yüksek olabilir; hedef organ direnci vardır.",
    "clinicalRelevance": "Tiroidektomi sonrası perioral uyuşma, tetani ve Chvostek/Trousseau bulguları hipokalsemi düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "endocrinology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Hipoparatiroidi",
      "hypoparathyroidism",
      "Endokrinoloji"
    ]
  },
  {
    "term": "Hiperkalsemi",
    "aliases": [
      "hypercalcemia",
      "yüksek kalsiyum"
    ],
    "category": "Elektrolit bozukluğu",
    "previewDefinition": "Serum kalsiyum düzeyinin artmasıdır.",
    "preAnswerSafeDefinition": "Serum kalsiyum düzeyinin artmasıdır.",
    "shortDefinition": "Serum kalsiyum düzeyinin artmasıdır.",
    "detailedExplanation": "Serum kalsiyum düzeyinin artmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Primer hiperparatiroidi ve malignite hiperkalseminin en sık/önemli nedenleri arasındadır.",
    "tusPearl": "Primer hiperparatiroidi ve malignite hiperkalseminin en sık/önemli nedenleri arasındadır.",
    "differentialPoint": "Hipokalsemide tetani ve QT uzaması; hiperkalsemide taş, kemik ağrısı ve kabızlık öne çıkabilir.",
    "clinicalRelevance": "Primer hiperparatiroidi ve malignite hiperkalseminin en sık/önemli nedenleri arasındadır.",
    "mechanism": "",
    "relatedBranches": [
      "endocrinology",
      "nephrology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Hiperkalsemi",
      "hypercalcemia",
      "yüksek kalsiyum",
      "Elektrolit bozukluğu"
    ]
  },
  {
    "term": "Akut pankreatit",
    "aliases": [
      "acute pancreatitis",
      "pankreatit"
    ],
    "category": "Gastroenteroloji",
    "previewDefinition": "Pankreasın akut inflamasyonu ve enzim aktivasyonu ile seyreden tablodur.",
    "preAnswerSafeDefinition": "Pankreasın akut inflamasyonu ve enzim aktivasyonu ile seyreden tablodur.",
    "shortDefinition": "Pankreasın akut inflamasyonu ve enzim aktivasyonu ile seyreden tablodur.",
    "detailedExplanation": "Pankreasın akut inflamasyonu ve enzim aktivasyonu ile seyreden tablodur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Epigastrik sırta vuran ağrı + lipaz yüksekliği akut pankreatit için klasik ipucudur.",
    "tusPearl": "Epigastrik sırta vuran ağrı + lipaz yüksekliği akut pankreatit için klasik ipucudur.",
    "differentialPoint": "Kolesistit sağ üst kadran ağrısı ve Murphy pozitifliğiyle daha tipiktir.",
    "clinicalRelevance": "Epigastrik sırta vuran ağrı + lipaz yüksekliği akut pankreatit için klasik ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "gastroenterology",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Akut pankreatit",
      "acute pancreatitis",
      "pankreatit",
      "Gastroenteroloji"
    ]
  },
  {
    "term": "Ranson kriterleri",
    "aliases": [
      "Ranson score"
    ],
    "category": "Skorlama",
    "previewDefinition": "Akut pankreatitte prognozu değerlendirmek için kullanılan klinik/laboratuvar kriterleridir.",
    "preAnswerSafeDefinition": "Akut pankreatitte prognozu değerlendirmek için kullanılan klinik/laboratuvar kriterleridir.",
    "shortDefinition": "Akut pankreatitte prognozu değerlendirmek için kullanılan klinik/laboratuvar kriterleridir.",
    "detailedExplanation": "Akut pankreatitte prognozu değerlendirmek için kullanılan klinik/laboratuvar kriterleridir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Pankreatitte şiddet değerlendirmesi tedavi yeri ve izlem yoğunluğunu belirler.",
    "tusPearl": "Pankreatitte şiddet değerlendirmesi tedavi yeri ve izlem yoğunluğunu belirler.",
    "differentialPoint": "Tanı koydurucu değil, prognoz belirleyicidir.",
    "clinicalRelevance": "Pankreatitte şiddet değerlendirmesi tedavi yeri ve izlem yoğunluğunu belirler.",
    "mechanism": "",
    "relatedBranches": [
      "gastroenterology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Ranson kriterleri",
      "Ranson score",
      "Skorlama"
    ]
  },
  {
    "term": "Charcot triadı",
    "aliases": [
      "Charcot triad"
    ],
    "category": "Hepatobiliyer bulgu",
    "previewDefinition": "Ateş, sarılık ve sağ üst kadran ağrısı triadıdır.",
    "preAnswerSafeDefinition": "Ateş, sarılık ve sağ üst kadran ağrısı triadıdır.",
    "shortDefinition": "Ateş, sarılık ve sağ üst kadran ağrısı triadıdır.",
    "detailedExplanation": "Ateş, sarılık ve sağ üst kadran ağrısı triadıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Akut kolanjit için klasik triaddır; hipotansiyon ve bilinç değişikliği eklenirse Reynolds pentadı oluşur.",
    "tusPearl": "Akut kolanjit için klasik triaddır; hipotansiyon ve bilinç değişikliği eklenirse Reynolds pentadı oluşur.",
    "differentialPoint": "Kolesistitte sarılık belirgin olmayabilir; Murphy bulgusu öne çıkar.",
    "clinicalRelevance": "Akut kolanjit için klasik triaddır; hipotansiyon ve bilinç değişikliği eklenirse Reynolds pentadı oluşur.",
    "mechanism": "",
    "relatedBranches": [
      "gastroenterology",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Charcot triadı",
      "Charcot triad",
      "Hepatobiliyer bulgu"
    ]
  },
  {
    "term": "Reynolds pentadı",
    "aliases": [
      "Reynolds pentad"
    ],
    "category": "Hepatobiliyer bulgu",
    "previewDefinition": "Charcot triadına hipotansiyon ve bilinç değişikliği eklenmesidir.",
    "preAnswerSafeDefinition": "Charcot triadına hipotansiyon ve bilinç değişikliği eklenmesidir.",
    "shortDefinition": "Charcot triadına hipotansiyon ve bilinç değişikliği eklenmesidir.",
    "detailedExplanation": "Charcot triadına hipotansiyon ve bilinç değişikliği eklenmesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Şiddetli akut kolanjit ve sepsis riskini düşündürür; drenaj gereksinimi öne çıkar.",
    "tusPearl": "Şiddetli akut kolanjit ve sepsis riskini düşündürür; drenaj gereksinimi öne çıkar.",
    "differentialPoint": "Basit biliyer kolikte sistemik toksisite beklenmez.",
    "clinicalRelevance": "Şiddetli akut kolanjit ve sepsis riskini düşündürür; drenaj gereksinimi öne çıkar.",
    "mechanism": "",
    "relatedBranches": [
      "gastroenterology",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Reynolds pentadı",
      "Reynolds pentad",
      "Hepatobiliyer bulgu"
    ]
  },
  {
    "term": "Murphy bulgusu",
    "aliases": [
      "Murphy sign"
    ],
    "category": "Fizik muayene bulgusu",
    "previewDefinition": "Sağ üst kadran palpasyonunda inspirasyonun ağrı nedeniyle durmasıdır.",
    "preAnswerSafeDefinition": "Sağ üst kadran palpasyonunda inspirasyonun ağrı nedeniyle durmasıdır.",
    "shortDefinition": "Sağ üst kadran palpasyonunda inspirasyonun ağrı nedeniyle durmasıdır.",
    "detailedExplanation": "Sağ üst kadran palpasyonunda inspirasyonun ağrı nedeniyle durmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Akut kolesistit için yüksek değerli fizik muayene ipucudur.",
    "tusPearl": "Akut kolesistit için yüksek değerli fizik muayene ipucudur.",
    "differentialPoint": "Kolanjitte ateş-sarılık kombinasyonu daha baskındır.",
    "clinicalRelevance": "Akut kolesistit için yüksek değerli fizik muayene ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "gastroenterology",
      "surgery"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Murphy bulgusu",
      "Murphy sign",
      "Fizik muayene bulgusu"
    ]
  },
  {
    "term": "Courvoisier bulgusu",
    "aliases": [
      "Courvoisier sign"
    ],
    "category": "Fizik muayene bulgusu",
    "previewDefinition": "Ağrısız sarılık ve palpe edilebilir safra kesesi birlikteliğidir.",
    "preAnswerSafeDefinition": "Ağrısız sarılık ve palpe edilebilir safra kesesi birlikteliğidir.",
    "shortDefinition": "Ağrısız sarılık ve palpe edilebilir safra kesesi birlikteliğidir.",
    "detailedExplanation": "Ağrısız sarılık ve palpe edilebilir safra kesesi birlikteliğidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Pankreas başı kanseri gibi malign distal obstrüksiyonu düşündürür.",
    "tusPearl": "Pankreas başı kanseri gibi malign distal obstrüksiyonu düşündürür.",
    "differentialPoint": "Koledok taşı genellikle ağrılıdır ve safra kesesi kronik inflamasyonla küçülebilir.",
    "clinicalRelevance": "Pankreas başı kanseri gibi malign distal obstrüksiyonu düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "gastroenterology",
      "surgery"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Courvoisier bulgusu",
      "Courvoisier sign",
      "Fizik muayene bulgusu"
    ]
  },
  {
    "term": "AST/ALT oranı",
    "aliases": [
      "De Ritis oranı",
      "AST ALT ratio"
    ],
    "category": "Laboratuvar",
    "previewDefinition": "Aminotransferazlar arasındaki göreli yüksekliği yorumlayan karaciğer hasarı göstergesidir.",
    "preAnswerSafeDefinition": "Aminotransferazlar arasındaki göreli yüksekliği yorumlayan karaciğer hasarı göstergesidir.",
    "shortDefinition": "Aminotransferazlar arasındaki göreli yüksekliği yorumlayan karaciğer hasarı göstergesidir.",
    "detailedExplanation": "Aminotransferazlar arasındaki göreli yüksekliği yorumlayan karaciğer hasarı göstergesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "AST/ALT >2 alkolik hepatit lehine klasik sınav ipucudur.",
    "tusPearl": "AST/ALT >2 alkolik hepatit lehine klasik sınav ipucudur.",
    "differentialPoint": "Viral hepatitte ALT genellikle AST’den daha belirgin yükselebilir.",
    "clinicalRelevance": "AST/ALT >2 alkolik hepatit lehine klasik sınav ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "gastroenterology",
      "biochemistry"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "AST/ALT oranı",
      "De Ritis oranı",
      "AST ALT ratio",
      "Laboratuvar"
    ]
  },
  {
    "term": "İndirekt hiperbilirubinemi",
    "aliases": [
      "unkonjuge hiperbilirubinemi",
      "unconjugated hyperbilirubinemia"
    ],
    "category": "Laboratuvar",
    "previewDefinition": "Konjuge edilmemiş bilirubinin artmasıdır.",
    "preAnswerSafeDefinition": "Konjuge edilmemiş bilirubinin artmasıdır.",
    "shortDefinition": "Konjuge edilmemiş bilirubinin artmasıdır.",
    "detailedExplanation": "Konjuge edilmemiş bilirubinin artmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Hemoliz, Gilbert sendromu ve yenidoğan fizyolojik sarılığı indirekt bilirubin artışı yapar.",
    "tusPearl": "Hemoliz, Gilbert sendromu ve yenidoğan fizyolojik sarılığı indirekt bilirubin artışı yapar.",
    "differentialPoint": "Direkt hiperbilirubinemi kolestaz veya hepatoselüler ekskresyon bozukluğu ile daha ilişkilidir.",
    "clinicalRelevance": "Hemoliz, Gilbert sendromu ve yenidoğan fizyolojik sarılığı indirekt bilirubin artışı yapar.",
    "mechanism": "",
    "relatedBranches": [
      "gastroenterology",
      "pediatrics",
      "biochemistry"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "İndirekt hiperbilirubinemi",
      "unkonjuge hiperbilirubinemi",
      "unconjugated hyperbilirubinemia",
      "Laboratuvar"
    ]
  },
  {
    "term": "Direkt hiperbilirubinemi",
    "aliases": [
      "konjuge hiperbilirubinemi",
      "conjugated hyperbilirubinemia"
    ],
    "category": "Laboratuvar",
    "previewDefinition": "Konjuge bilirubinin serumda artmasıdır.",
    "preAnswerSafeDefinition": "Konjuge bilirubinin serumda artmasıdır.",
    "shortDefinition": "Konjuge bilirubinin serumda artmasıdır.",
    "detailedExplanation": "Konjuge bilirubinin serumda artmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Kolestaz, safra yolu obstrüksiyonu ve hepatoselüler ekskresyon bozukluklarında düşünülür.",
    "tusPearl": "Kolestaz, safra yolu obstrüksiyonu ve hepatoselüler ekskresyon bozukluklarında düşünülür.",
    "differentialPoint": "İndirekt bilirubin artışı daha çok hemoliz veya konjugasyon kusurunu düşündürür.",
    "clinicalRelevance": "Kolestaz, safra yolu obstrüksiyonu ve hepatoselüler ekskresyon bozukluklarında düşünülür.",
    "mechanism": "",
    "relatedBranches": [
      "gastroenterology",
      "biochemistry"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Direkt hiperbilirubinemi",
      "konjuge hiperbilirubinemi",
      "conjugated hyperbilirubinemia",
      "Laboratuvar"
    ]
  },
  {
    "term": "Gilbert sendromu",
    "aliases": [
      "Gilbert disease"
    ],
    "category": "Biyokimya / Hepatoloji",
    "previewDefinition": "UGT aktivitesinde hafif azalma nedeniyle aralıklı indirekt hiperbilirubinemi yapan benign durumdur.",
    "preAnswerSafeDefinition": "UGT aktivitesinde hafif azalma nedeniyle aralıklı indirekt hiperbilirubinemi yapan benign durumdur.",
    "shortDefinition": "UGT aktivitesinde hafif azalma nedeniyle aralıklı indirekt hiperbilirubinemi yapan benign durumdur.",
    "detailedExplanation": "UGT aktivitesinde hafif azalma nedeniyle aralıklı indirekt hiperbilirubinemi yapan benign durumdur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Açlık, stres veya hastalık sonrası hafif indirekt bilirubin artışı Gilbert için tipiktir.",
    "tusPearl": "Açlık, stres veya hastalık sonrası hafif indirekt bilirubin artışı Gilbert için tipiktir.",
    "differentialPoint": "Crigler-Najjar daha ağır UGT eksikliğiyle seyreder.",
    "clinicalRelevance": "Açlık, stres veya hastalık sonrası hafif indirekt bilirubin artışı Gilbert için tipiktir.",
    "mechanism": "",
    "relatedBranches": [
      "gastroenterology",
      "biochemistry"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Gilbert sendromu",
      "Gilbert disease",
      "Biyokimya / Hepatoloji"
    ]
  },
  {
    "term": "Wilson hastalığı",
    "aliases": [
      "Wilson disease",
      "hepatolentiküler dejenerasyon"
    ],
    "category": "Metabolik hastalık",
    "previewDefinition": "Bakır metabolizması bozukluğuna bağlı karaciğer, nörolojik ve psikiyatrik bulgularla seyreden hastalıktır.",
    "preAnswerSafeDefinition": "Bakır metabolizması bozukluğuna bağlı karaciğer, nörolojik ve psikiyatrik bulgularla seyreden hastalıktır.",
    "shortDefinition": "Bakır metabolizması bozukluğuna bağlı karaciğer, nörolojik ve psikiyatrik bulgularla seyreden hastalıktır.",
    "detailedExplanation": "Bakır metabolizması bozukluğuna bağlı karaciğer, nörolojik ve psikiyatrik bulgularla seyreden hastalıktır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Genç hastada karaciğer hastalığı + nöropsikiyatrik bulgu + Kayser-Fleischer halkası Wilson düşündürür.",
    "tusPearl": "Genç hastada karaciğer hastalığı + nöropsikiyatrik bulgu + Kayser-Fleischer halkası Wilson düşündürür.",
    "differentialPoint": "Hemokromatoziste demir birikimi ve transferrin saturasyonu artışı öne çıkar.",
    "clinicalRelevance": "Genç hastada karaciğer hastalığı + nöropsikiyatrik bulgu + Kayser-Fleischer halkası Wilson düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "gastroenterology",
      "neurology",
      "genetics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Wilson hastalığı",
      "Wilson disease",
      "hepatolentiküler dejenerasyon",
      "Metabolik hastalık"
    ]
  },
  {
    "term": "Kayser-Fleischer halkası",
    "aliases": [
      "KF halkası",
      "Kayser Fleischer ring"
    ],
    "category": "Göz bulgusu",
    "previewDefinition": "Kornea Descemet membranında bakır birikimine bağlı halka görünümüdür.",
    "preAnswerSafeDefinition": "Kornea Descemet membranında bakır birikimine bağlı halka görünümüdür.",
    "shortDefinition": "Kornea Descemet membranında bakır birikimine bağlı halka görünümüdür.",
    "detailedExplanation": "Kornea Descemet membranında bakır birikimine bağlı halka görünümüdür. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Wilson hastalığında nörolojik bulgularla birlikte çok değerli bir ipucudur.",
    "tusPearl": "Wilson hastalığında nörolojik bulgularla birlikte çok değerli bir ipucudur.",
    "differentialPoint": "Fleischer halkası keratokonusta görülen farklı bir bulgudur.",
    "clinicalRelevance": "Wilson hastalığında nörolojik bulgularla birlikte çok değerli bir ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "ophthalmology",
      "gastroenterology",
      "neurology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Kayser-Fleischer halkası",
      "KF halkası",
      "Kayser Fleischer ring",
      "Göz bulgusu"
    ]
  },
  {
    "term": "Hemokromatozis",
    "aliases": [
      "hemochromatosis",
      "bronz diyabet"
    ],
    "category": "Metabolik hastalık",
    "previewDefinition": "Demir birikimine bağlı karaciğer, pankreas, kalp ve cilt tutulumuyla seyreden hastalıktır.",
    "preAnswerSafeDefinition": "Demir birikimine bağlı karaciğer, pankreas, kalp ve cilt tutulumuyla seyreden hastalıktır.",
    "shortDefinition": "Demir birikimine bağlı karaciğer, pankreas, kalp ve cilt tutulumuyla seyreden hastalıktır.",
    "detailedExplanation": "Demir birikimine bağlı karaciğer, pankreas, kalp ve cilt tutulumuyla seyreden hastalıktır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Bronz diyabet, karaciğer hastalığı ve transferrin saturasyonu yüksekliği hemokromatozis düşündürür.",
    "tusPearl": "Bronz diyabet, karaciğer hastalığı ve transferrin saturasyonu yüksekliği hemokromatozis düşündürür.",
    "differentialPoint": "Wilson bakır birikimiyle ilişkilidir.",
    "clinicalRelevance": "Bronz diyabet, karaciğer hastalığı ve transferrin saturasyonu yüksekliği hemokromatozis düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "gastroenterology",
      "endocrinology",
      "genetics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Hemokromatozis",
      "hemochromatosis",
      "bronz diyabet",
      "Metabolik hastalık"
    ]
  },
  {
    "term": "Portal hipertansiyon",
    "aliases": [
      "portal hypertension"
    ],
    "category": "Hepatoloji",
    "previewDefinition": "Portal venöz basıncın artmasıyla gelişen klinik sendromdur.",
    "preAnswerSafeDefinition": "Portal venöz basıncın artmasıyla gelişen klinik sendromdur.",
    "shortDefinition": "Portal venöz basıncın artmasıyla gelişen klinik sendromdur.",
    "detailedExplanation": "Portal venöz basıncın artmasıyla gelişen klinik sendromdur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Splenomegali, özofagus varisi ve asit siroz ilişkili portal hipertansiyonu düşündürür.",
    "tusPearl": "Splenomegali, özofagus varisi ve asit siroz ilişkili portal hipertansiyonu düşündürür.",
    "differentialPoint": "Sağ kalp yetmezliği de hepatik konjesyon yapabilir; varis paterni bağlamla ayrılır.",
    "clinicalRelevance": "Splenomegali, özofagus varisi ve asit siroz ilişkili portal hipertansiyonu düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "gastroenterology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Portal hipertansiyon",
      "portal hypertension",
      "Hepatoloji"
    ]
  },
  {
    "term": "Spontan bakteriyel peritonit",
    "aliases": [
      "SBP",
      "spontaneous bacterial peritonitis"
    ],
    "category": "Hepatoloji / Enfeksiyon",
    "previewDefinition": "Sirotik asit sıvısının belirgin intraabdominal kaynak olmadan enfekte olmasıdır.",
    "preAnswerSafeDefinition": "Sirotik asit sıvısının belirgin intraabdominal kaynak olmadan enfekte olmasıdır.",
    "shortDefinition": "Sirotik asit sıvısının belirgin intraabdominal kaynak olmadan enfekte olmasıdır.",
    "detailedExplanation": "Sirotik asit sıvısının belirgin intraabdominal kaynak olmadan enfekte olmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Asitte PMN ≥250/mm³ SBP tanısı için yüksek değerli eşiktir.",
    "tusPearl": "Asitte PMN ≥250/mm³ SBP tanısı için yüksek değerli eşiktir.",
    "differentialPoint": "Sekonder peritonitte perforasyon/cerrahi odak düşünülür.",
    "clinicalRelevance": "Asitte PMN ≥250/mm³ SBP tanısı için yüksek değerli eşiktir.",
    "mechanism": "",
    "relatedBranches": [
      "gastroenterology",
      "infectious-diseases"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Spontan bakteriyel peritonit",
      "SBP",
      "spontaneous bacterial peritonitis",
      "Hepatoloji / Enfeksiyon"
    ]
  },
  {
    "term": "Hepatik ensefalopati",
    "aliases": [
      "hepatic encephalopathy",
      "asteriksis"
    ],
    "category": "Hepatoloji",
    "previewDefinition": "Karaciğer yetmezliği veya portosistemik şant nedeniyle nöropsikiyatrik bozukluk gelişmesidir.",
    "preAnswerSafeDefinition": "Karaciğer yetmezliği veya portosistemik şant nedeniyle nöropsikiyatrik bozukluk gelişmesidir.",
    "shortDefinition": "Karaciğer yetmezliği veya portosistemik şant nedeniyle nöropsikiyatrik bozukluk gelişmesidir.",
    "detailedExplanation": "Karaciğer yetmezliği veya portosistemik şant nedeniyle nöropsikiyatrik bozukluk gelişmesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Asteriksis ve bilinç değişikliği siroz hastasında hepatik ensefalopatiyi düşündürür.",
    "tusPearl": "Asteriksis ve bilinç değişikliği siroz hastasında hepatik ensefalopatiyi düşündürür.",
    "differentialPoint": "Wernicke ensefalopatisinde oftalmopleji, ataksi ve konfüzyon triadı öne çıkar.",
    "clinicalRelevance": "Asteriksis ve bilinç değişikliği siroz hastasında hepatik ensefalopatiyi düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "gastroenterology",
      "neurology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Hepatik ensefalopati",
      "hepatic encephalopathy",
      "asteriksis",
      "Hepatoloji"
    ]
  },
  {
    "term": "Sepsis",
    "aliases": [
      "septisemi"
    ],
    "category": "Enfeksiyon acili",
    "previewDefinition": "Enfeksiyona karşı düzensiz konak yanıtı nedeniyle organ disfonksiyonu gelişmesidir.",
    "preAnswerSafeDefinition": "Enfeksiyona karşı düzensiz konak yanıtı nedeniyle organ disfonksiyonu gelişmesidir.",
    "shortDefinition": "Enfeksiyona karşı düzensiz konak yanıtı nedeniyle organ disfonksiyonu gelişmesidir.",
    "detailedExplanation": "Enfeksiyona karşı düzensiz konak yanıtı nedeniyle organ disfonksiyonu gelişmesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Hipotansiyon, laktat yüksekliği ve organ disfonksiyonu septik şok açısından hızlı değerlendirilir.",
    "tusPearl": "Hipotansiyon, laktat yüksekliği ve organ disfonksiyonu septik şok açısından hızlı değerlendirilir.",
    "differentialPoint": "SIRS enfeksiyon dışı nedenlerle de olabilir; sepsiste enfeksiyon kaynaklı organ disfonksiyonu vardır.",
    "clinicalRelevance": "Hipotansiyon, laktat yüksekliği ve organ disfonksiyonu septik şok açısından hızlı değerlendirilir.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Sepsis",
      "septisemi",
      "Enfeksiyon acili"
    ]
  },
  {
    "term": "Septik şok",
    "aliases": [
      "septic shock"
    ],
    "category": "Enfeksiyon acili",
    "previewDefinition": "Sepsise bağlı dolaşım ve hücresel/metabolik bozuklukla mortalite riski yüksek tablodur.",
    "preAnswerSafeDefinition": "Sepsise bağlı dolaşım ve hücresel/metabolik bozuklukla mortalite riski yüksek tablodur.",
    "shortDefinition": "Sepsise bağlı dolaşım ve hücresel/metabolik bozuklukla mortalite riski yüksek tablodur.",
    "detailedExplanation": "Sepsise bağlı dolaşım ve hücresel/metabolik bozuklukla mortalite riski yüksek tablodur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Sıvıya rağmen hipotansiyon veya vazopressör ihtiyacı + laktat yüksekliği septik şok düşündürür.",
    "tusPearl": "Sıvıya rağmen hipotansiyon veya vazopressör ihtiyacı + laktat yüksekliği septik şok düşündürür.",
    "differentialPoint": "Hipovolemik şokta primer neden sıvı/kan kaybıdır.",
    "clinicalRelevance": "Sıvıya rağmen hipotansiyon veya vazopressör ihtiyacı + laktat yüksekliği septik şok düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Septik şok",
      "septic shock",
      "Enfeksiyon acili"
    ]
  },
  {
    "term": "Meningokoksemi",
    "aliases": [
      "meningococcemia"
    ],
    "category": "Enfeksiyon acili",
    "previewDefinition": "Neisseria meningitidis bakteriyemisine bağlı ağır sistemik enfeksiyondur.",
    "preAnswerSafeDefinition": "Neisseria meningitidis bakteriyemisine bağlı ağır sistemik enfeksiyondur.",
    "shortDefinition": "Neisseria meningitidis bakteriyemisine bağlı ağır sistemik enfeksiyondur.",
    "detailedExplanation": "Neisseria meningitidis bakteriyemisine bağlı ağır sistemik enfeksiyondur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Ateş + peteşi/purpura + ense sertliği meningokoksemi/menenjit açısından acildir.",
    "tusPearl": "Ateş + peteşi/purpura + ense sertliği meningokoksemi/menenjit açısından acildir.",
    "differentialPoint": "ITP’de hasta genellikle toksik görünmez ve ateş/menenjit bulguları beklenmez.",
    "clinicalRelevance": "Ateş + peteşi/purpura + ense sertliği meningokoksemi/menenjit açısından acildir.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "pediatrics",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Meningokoksemi",
      "meningococcemia",
      "Enfeksiyon acili"
    ]
  },
  {
    "term": "Ense sertliği",
    "aliases": [
      "neck stiffness",
      "nuchal rigidity"
    ],
    "category": "Fizik muayene bulgusu",
    "previewDefinition": "Boyun fleksiyonunda ağrı ve direnç ile meningeal irritasyonu düşündüren bulgudur.",
    "preAnswerSafeDefinition": "Boyun fleksiyonunda ağrı ve direnç ile meningeal irritasyonu düşündüren bulgudur.",
    "shortDefinition": "Boyun fleksiyonunda ağrı ve direnç ile meningeal irritasyonu düşündüren bulgudur.",
    "detailedExplanation": "Boyun fleksiyonunda ağrı ve direnç ile meningeal irritasyonu düşündüren bulgudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Ateş, baş ağrısı ve bilinç değişikliğiyle birlikte menenjit şüphesini artırır.",
    "tusPearl": "Ateş, baş ağrısı ve bilinç değişikliğiyle birlikte menenjit şüphesini artırır.",
    "differentialPoint": "Subaraknoid kanamada da ense sertliği olabilir; ani şiddetli baş ağrısı ayırıcıdır.",
    "clinicalRelevance": "Ateş, baş ağrısı ve bilinç değişikliğiyle birlikte menenjit şüphesini artırır.",
    "mechanism": "",
    "relatedBranches": [
      "neurology",
      "infectious-diseases"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Ense sertliği",
      "neck stiffness",
      "nuchal rigidity",
      "Fizik muayene bulgusu"
    ]
  },
  {
    "term": "Brudzinski bulgusu",
    "aliases": [
      "Brudzinski sign"
    ],
    "category": "Fizik muayene bulgusu",
    "previewDefinition": "Boyun fleksiyonu sırasında kalça/diz fleksiyonu gelişmesiyle meningeal irritasyonu düşündürür.",
    "preAnswerSafeDefinition": "Boyun fleksiyonu sırasında kalça/diz fleksiyonu gelişmesiyle meningeal irritasyonu düşündürür.",
    "shortDefinition": "Boyun fleksiyonu sırasında kalça/diz fleksiyonu gelişmesiyle meningeal irritasyonu düşündürür.",
    "detailedExplanation": "Boyun fleksiyonu sırasında kalça/diz fleksiyonu gelişmesiyle meningeal irritasyonu düşündürür. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Menenjit sorularında Kernig ile birlikte klasik fizik muayene bulgusudur.",
    "tusPearl": "Menenjit sorularında Kernig ile birlikte klasik fizik muayene bulgusudur.",
    "differentialPoint": "Duyarlılığı sınırlıdır; yokluğu menenjiti dışlamaz.",
    "clinicalRelevance": "Menenjit sorularında Kernig ile birlikte klasik fizik muayene bulgusudur.",
    "mechanism": "",
    "relatedBranches": [
      "neurology",
      "infectious-diseases"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Brudzinski bulgusu",
      "Brudzinski sign",
      "Fizik muayene bulgusu"
    ]
  },
  {
    "term": "Kernig bulgusu",
    "aliases": [
      "Kernig sign"
    ],
    "category": "Fizik muayene bulgusu",
    "previewDefinition": "Kalça fleksiyondayken diz ekstansiyonunda ağrı/direnç olmasıdır.",
    "preAnswerSafeDefinition": "Kalça fleksiyondayken diz ekstansiyonunda ağrı/direnç olmasıdır.",
    "shortDefinition": "Kalça fleksiyondayken diz ekstansiyonunda ağrı/direnç olmasıdır.",
    "detailedExplanation": "Kalça fleksiyondayken diz ekstansiyonunda ağrı/direnç olmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Meningeal irritasyon bulgusu olarak menenjit ve subaraknoid kanamada sorulabilir.",
    "tusPearl": "Meningeal irritasyon bulgusu olarak menenjit ve subaraknoid kanamada sorulabilir.",
    "differentialPoint": "Tek başına tanı koydurmaz; klinik bağlam ve BOS bulguları gerekir.",
    "clinicalRelevance": "Meningeal irritasyon bulgusu olarak menenjit ve subaraknoid kanamada sorulabilir.",
    "mechanism": "",
    "relatedBranches": [
      "neurology",
      "infectious-diseases"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Kernig bulgusu",
      "Kernig sign",
      "Fizik muayene bulgusu"
    ]
  },
  {
    "term": "Gram pozitif kok",
    "aliases": [
      "Gram-positive cocci",
      "GPK"
    ],
    "category": "Mikrobiyoloji",
    "previewDefinition": "Gram boyamada mor renkli yuvarlak bakterileri ifade eder.",
    "preAnswerSafeDefinition": "Gram boyamada mor renkli yuvarlak bakterileri ifade eder.",
    "shortDefinition": "Gram boyamada mor renkli yuvarlak bakterileri ifade eder.",
    "detailedExplanation": "Gram boyamada mor renkli yuvarlak bakterileri ifade eder. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Kümelenme stafilokok, zincir/diplokok streptokok/enterokok yönünde düşünülür.",
    "tusPearl": "Kümelenme stafilokok, zincir/diplokok streptokok/enterokok yönünde düşünülür.",
    "differentialPoint": "Gram negatif koklar Neisseria gibi farklı etkenleri düşündürür.",
    "clinicalRelevance": "Kümelenme stafilokok, zincir/diplokok streptokok/enterokok yönünde düşünülür.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology",
      "infectious-diseases"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Gram pozitif kok",
      "Gram-positive cocci",
      "GPK",
      "Mikrobiyoloji"
    ]
  },
  {
    "term": "Koagülaz",
    "aliases": [
      "coagulase"
    ],
    "category": "Mikrobiyoloji testi",
    "previewDefinition": "Staphylococcus aureus’u koagülaz negatif stafilokoklardan ayırmada kullanılan enzim/testtir.",
    "preAnswerSafeDefinition": "Staphylococcus aureus’u koagülaz negatif stafilokoklardan ayırmada kullanılan enzim/testtir.",
    "shortDefinition": "Staphylococcus aureus’u koagülaz negatif stafilokoklardan ayırmada kullanılan enzim/testtir.",
    "detailedExplanation": "Staphylococcus aureus’u koagülaz negatif stafilokoklardan ayırmada kullanılan enzim/testtir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Koagülaz pozitif stafilokok denince S. aureus düşünülür.",
    "tusPearl": "Koagülaz pozitif stafilokok denince S. aureus düşünülür.",
    "differentialPoint": "S. epidermidis ve S. saprophyticus koagülaz negatiftir.",
    "clinicalRelevance": "Koagülaz pozitif stafilokok denince S. aureus düşünülür.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Koagülaz",
      "coagulase",
      "Mikrobiyoloji testi"
    ]
  },
  {
    "term": "Katalaz",
    "aliases": [
      "catalase"
    ],
    "category": "Mikrobiyoloji testi",
    "previewDefinition": "Hidrojen peroksidi su ve oksijene parçalayan enzimdir.",
    "preAnswerSafeDefinition": "Hidrojen peroksidi su ve oksijene parçalayan enzimdir.",
    "shortDefinition": "Hidrojen peroksidi su ve oksijene parçalayan enzimdir.",
    "detailedExplanation": "Hidrojen peroksidi su ve oksijene parçalayan enzimdir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Stafilokoklar katalaz pozitif, streptokoklar katalaz negatiftir.",
    "tusPearl": "Stafilokoklar katalaz pozitif, streptokoklar katalaz negatiftir.",
    "differentialPoint": "Koagülaz testi stafilokok türlerini ayırmada kullanılır.",
    "clinicalRelevance": "Stafilokoklar katalaz pozitif, streptokoklar katalaz negatiftir.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Katalaz",
      "catalase",
      "Mikrobiyoloji testi"
    ]
  },
  {
    "term": "Optokin duyarlılığı",
    "aliases": [
      "optochin sensitivity"
    ],
    "category": "Mikrobiyoloji testi",
    "previewDefinition": "Streptococcus pneumoniae tanımlamasında kullanılan antibiyotik duyarlılık testidir.",
    "preAnswerSafeDefinition": "Streptococcus pneumoniae tanımlamasında kullanılan antibiyotik duyarlılık testidir.",
    "shortDefinition": "Streptococcus pneumoniae tanımlamasında kullanılan antibiyotik duyarlılık testidir.",
    "detailedExplanation": "Streptococcus pneumoniae tanımlamasında kullanılan antibiyotik duyarlılık testidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Alfa hemolitik, optokin duyarlı, safra erirliği pozitif diplokok S. pneumoniae lehinedir.",
    "tusPearl": "Alfa hemolitik, optokin duyarlı, safra erirliği pozitif diplokok S. pneumoniae lehinedir.",
    "differentialPoint": "Viridans streptokoklar optokin dirençlidir.",
    "clinicalRelevance": "Alfa hemolitik, optokin duyarlı, safra erirliği pozitif diplokok S. pneumoniae lehinedir.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Optokin duyarlılığı",
      "optochin sensitivity",
      "Mikrobiyoloji testi"
    ]
  },
  {
    "term": "Safra erirliği",
    "aliases": [
      "bile solubility"
    ],
    "category": "Mikrobiyoloji testi",
    "previewDefinition": "Streptococcus pneumoniae’nin safra tuzlarıyla lizise uğrama özelliğidir.",
    "preAnswerSafeDefinition": "Streptococcus pneumoniae’nin safra tuzlarıyla lizise uğrama özelliğidir.",
    "shortDefinition": "Streptococcus pneumoniae’nin safra tuzlarıyla lizise uğrama özelliğidir.",
    "detailedExplanation": "Streptococcus pneumoniae’nin safra tuzlarıyla lizise uğrama özelliğidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Optokin duyarlılığıyla birlikte S. pneumoniae ayrımında kullanılır.",
    "tusPearl": "Optokin duyarlılığıyla birlikte S. pneumoniae ayrımında kullanılır.",
    "differentialPoint": "Viridans streptokoklar tipik olarak safra erirliği negatif ve optokin dirençlidir.",
    "clinicalRelevance": "Optokin duyarlılığıyla birlikte S. pneumoniae ayrımında kullanılır.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Safra erirliği",
      "bile solubility",
      "Mikrobiyoloji testi"
    ]
  },
  {
    "term": "Quellung reaksiyonu",
    "aliases": [
      "Quellung reaction"
    ],
    "category": "Mikrobiyoloji testi",
    "previewDefinition": "Kapsüllü bakterilerde kapsül şişmesini gösteren serolojik reaksiyondur.",
    "preAnswerSafeDefinition": "Kapsüllü bakterilerde kapsül şişmesini gösteren serolojik reaksiyondur.",
    "shortDefinition": "Kapsüllü bakterilerde kapsül şişmesini gösteren serolojik reaksiyondur.",
    "detailedExplanation": "Kapsüllü bakterilerde kapsül şişmesini gösteren serolojik reaksiyondur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "S. pneumoniae kapsül tiplemesinde klasik bilgi olarak sorulabilir.",
    "tusPearl": "S. pneumoniae kapsül tiplemesinde klasik bilgi olarak sorulabilir.",
    "differentialPoint": "Gram boyama bakteri morfolojisini gösterir; kapsül serotipini göstermez.",
    "clinicalRelevance": "S. pneumoniae kapsül tiplemesinde klasik bilgi olarak sorulabilir.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Quellung reaksiyonu",
      "Quellung reaction",
      "Mikrobiyoloji testi"
    ]
  },
  {
    "term": "Aside dirençli basil",
    "aliases": [
      "ARB",
      "acid-fast bacillus",
      "AFB"
    ],
    "category": "Mikrobiyoloji",
    "previewDefinition": "Özel boyalarla asit-alkole dirençli kalan mikobakteri morfolojisidir.",
    "preAnswerSafeDefinition": "Özel boyalarla asit-alkole dirençli kalan mikobakteri morfolojisidir.",
    "shortDefinition": "Özel boyalarla asit-alkole dirençli kalan mikobakteri morfolojisidir.",
    "detailedExplanation": "Özel boyalarla asit-alkole dirençli kalan mikobakteri morfolojisidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Tüberkülozda Ziehl-Neelsen ile aside dirençli basil görülmesi klasik bilgidir.",
    "tusPearl": "Tüberkülozda Ziehl-Neelsen ile aside dirençli basil görülmesi klasik bilgidir.",
    "differentialPoint": "Gram boyama mikobakteriler için yeterli değildir.",
    "clinicalRelevance": "Tüberkülozda Ziehl-Neelsen ile aside dirençli basil görülmesi klasik bilgidir.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology",
      "infectious-diseases"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Aside dirençli basil",
      "ARB",
      "acid-fast bacillus",
      "AFB",
      "Mikrobiyoloji"
    ]
  },
  {
    "term": "Ziehl-Neelsen boyası",
    "aliases": [
      "EZN boyası",
      "acid-fast stain"
    ],
    "category": "Mikrobiyoloji testi",
    "previewDefinition": "Aside dirençli basilleri göstermek için kullanılan özel boyadır.",
    "preAnswerSafeDefinition": "Aside dirençli basilleri göstermek için kullanılan özel boyadır.",
    "shortDefinition": "Aside dirençli basilleri göstermek için kullanılan özel boyadır.",
    "detailedExplanation": "Aside dirençli basilleri göstermek için kullanılan özel boyadır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Mikobakteri şüphesinde klasik boyama yöntemi olarak sorulur.",
    "tusPearl": "Mikobakteri şüphesinde klasik boyama yöntemi olarak sorulur.",
    "differentialPoint": "Giemsa daha çok parazit/kan yayması bağlamında kullanılır.",
    "clinicalRelevance": "Mikobakteri şüphesinde klasik boyama yöntemi olarak sorulur.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Ziehl-Neelsen boyası",
      "EZN boyası",
      "acid-fast stain",
      "Mikrobiyoloji testi"
    ]
  },
  {
    "term": "Giemsa boyası",
    "aliases": [
      "Giemsa stain"
    ],
    "category": "Mikrobiyoloji / Patoloji",
    "previewDefinition": "Kan parazitleri ve bazı hücresel ayrıntıları göstermek için kullanılan boyadır.",
    "preAnswerSafeDefinition": "Kan parazitleri ve bazı hücresel ayrıntıları göstermek için kullanılan boyadır.",
    "shortDefinition": "Kan parazitleri ve bazı hücresel ayrıntıları göstermek için kullanılan boyadır.",
    "detailedExplanation": "Kan parazitleri ve bazı hücresel ayrıntıları göstermek için kullanılan boyadır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Sıtma ve Leishmania amastigotları gibi etkenlerde klasik boyama bilgisidir.",
    "tusPearl": "Sıtma ve Leishmania amastigotları gibi etkenlerde klasik boyama bilgisidir.",
    "differentialPoint": "Ziehl-Neelsen mikobakteriler içindir.",
    "clinicalRelevance": "Sıtma ve Leishmania amastigotları gibi etkenlerde klasik boyama bilgisidir.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology",
      "pathology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Giemsa boyası",
      "Giemsa stain",
      "Mikrobiyoloji / Patoloji"
    ]
  },
  {
    "term": "Step-ladder fever",
    "aliases": [
      "basamaklı ateş",
      "step ladder fever"
    ],
    "category": "Enfeksiyon bulgusu",
    "previewDefinition": "Ateşin günler içinde basamaklı yükselmesi paternidir.",
    "preAnswerSafeDefinition": "Ateşin günler içinde basamaklı yükselmesi paternidir.",
    "shortDefinition": "Ateşin günler içinde basamaklı yükselmesi paternidir.",
    "detailedExplanation": "Ateşin günler içinde basamaklı yükselmesi paternidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Tifo ateşi için klasik klinik ipucudur.",
    "tusPearl": "Tifo ateşi için klasik klinik ipucudur.",
    "differentialPoint": "Sıtma ateşi periyodik paroksizmlerle daha tipik olabilir.",
    "clinicalRelevance": "Tifo ateşi için klasik klinik ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Step-ladder fever",
      "basamaklı ateş",
      "step ladder fever",
      "Enfeksiyon bulgusu"
    ]
  },
  {
    "term": "Rose spot",
    "aliases": [
      "gül lekesi"
    ],
    "category": "Dermatolojik bulgu",
    "previewDefinition": "Tifo ateşinde gövdede görülebilen soluk pembe makülopapüler döküntüdür.",
    "preAnswerSafeDefinition": "Tifo ateşinde gövdede görülebilen soluk pembe makülopapüler döküntüdür.",
    "shortDefinition": "Tifo ateşinde gövdede görülebilen soluk pembe makülopapüler döküntüdür.",
    "detailedExplanation": "Tifo ateşinde gövdede görülebilen soluk pembe makülopapüler döküntüdür. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Step-ladder fever ile birlikte Salmonella Typhi’yi düşündürür.",
    "tusPearl": "Step-ladder fever ile birlikte Salmonella Typhi’yi düşündürür.",
    "differentialPoint": "Meningokoksemide peteşi/purpura daha acil ve farklı görünümdedir.",
    "clinicalRelevance": "Step-ladder fever ile birlikte Salmonella Typhi’yi düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "dermatology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Rose spot",
      "gül lekesi",
      "Dermatolojik bulgu"
    ]
  },
  {
    "term": "Pseudomembranöz kolit",
    "aliases": [
      "C. difficile koliti",
      "pseudomembranous colitis"
    ],
    "category": "Enfeksiyon / Gastroenteroloji",
    "previewDefinition": "Clostridioides difficile toksinlerine bağlı antibiyotik ilişkili kolittir.",
    "preAnswerSafeDefinition": "Clostridioides difficile toksinlerine bağlı antibiyotik ilişkili kolittir.",
    "shortDefinition": "Clostridioides difficile toksinlerine bağlı antibiyotik ilişkili kolittir.",
    "detailedExplanation": "Clostridioides difficile toksinlerine bağlı antibiyotik ilişkili kolittir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Antibiyotik sonrası sulu ishal + psödomembran C. difficile düşündürür.",
    "tusPearl": "Antibiyotik sonrası sulu ishal + psödomembran C. difficile düşündürür.",
    "differentialPoint": "İnvaziv bakteriyel dizanteride kanlı ishal ve ateş daha baskın olabilir.",
    "clinicalRelevance": "Antibiyotik sonrası sulu ishal + psödomembran C. difficile düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "gastroenterology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Pseudomembranöz kolit",
      "C. difficile koliti",
      "pseudomembranous colitis",
      "Enfeksiyon / Gastroenteroloji"
    ]
  },
  {
    "term": "Toksin A/B",
    "aliases": [
      "C difficile toxin",
      "Clostridioides difficile toksini"
    ],
    "category": "Mikrobiyoloji",
    "previewDefinition": "Clostridioides difficile’nin kolon mukozasında hasar oluşturan toksinleridir.",
    "preAnswerSafeDefinition": "Clostridioides difficile’nin kolon mukozasında hasar oluşturan toksinleridir.",
    "shortDefinition": "Clostridioides difficile’nin kolon mukozasında hasar oluşturan toksinleridir.",
    "detailedExplanation": "Clostridioides difficile’nin kolon mukozasında hasar oluşturan toksinleridir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "C. difficile tanısında toksin veya NAAT testleri klinik bağlamla yorumlanır.",
    "tusPearl": "C. difficile tanısında toksin veya NAAT testleri klinik bağlamla yorumlanır.",
    "differentialPoint": "Toksin negatif kolonizasyon tek başına hastalık anlamına gelmeyebilir.",
    "clinicalRelevance": "C. difficile tanısında toksin veya NAAT testleri klinik bağlamla yorumlanır.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology",
      "infectious-diseases"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Toksin A/B",
      "C difficile toxin",
      "Clostridioides difficile toksini",
      "Mikrobiyoloji"
    ]
  },
  {
    "term": "ESBL",
    "aliases": [
      "extended spectrum beta-lactamase"
    ],
    "category": "Mikrobiyoloji direnç",
    "previewDefinition": "Genişlemiş spektrumlu beta-laktamaz üreten bakterileri ifade eder.",
    "preAnswerSafeDefinition": "Genişlemiş spektrumlu beta-laktamaz üreten bakterileri ifade eder.",
    "shortDefinition": "Genişlemiş spektrumlu beta-laktamaz üreten bakterileri ifade eder.",
    "detailedExplanation": "Genişlemiş spektrumlu beta-laktamaz üreten bakterileri ifade eder. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "ESBL üreten Enterobacterales ciddi enfeksiyonda karbapenem gereksinimi doğurabilir.",
    "tusPearl": "ESBL üreten Enterobacterales ciddi enfeksiyonda karbapenem gereksinimi doğurabilir.",
    "differentialPoint": "AmpC ve karbapenemaz direnç mekanizmaları farklıdır.",
    "clinicalRelevance": "ESBL üreten Enterobacterales ciddi enfeksiyonda karbapenem gereksinimi doğurabilir.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology",
      "infectious-diseases",
      "pharmacology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "ESBL",
      "extended spectrum beta-lactamase",
      "Mikrobiyoloji direnç"
    ]
  },
  {
    "term": "MRSA",
    "aliases": [
      "metisiline dirençli S. aureus"
    ],
    "category": "Mikrobiyoloji direnç",
    "previewDefinition": "Metisiline dirençli Staphylococcus aureus suşlarını ifade eder.",
    "preAnswerSafeDefinition": "Metisiline dirençli Staphylococcus aureus suşlarını ifade eder.",
    "shortDefinition": "Metisiline dirençli Staphylococcus aureus suşlarını ifade eder.",
    "detailedExplanation": "Metisiline dirençli Staphylococcus aureus suşlarını ifade eder. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "MRSA şüphesinde beta-laktam seçimi değişir; vankomisin/linezolid gibi seçenekler gündeme gelir.",
    "tusPearl": "MRSA şüphesinde beta-laktam seçimi değişir; vankomisin/linezolid gibi seçenekler gündeme gelir.",
    "differentialPoint": "MSSA’da nafsilin/oksasilin/cefazolin daha uygun olabilir.",
    "clinicalRelevance": "MRSA şüphesinde beta-laktam seçimi değişir; vankomisin/linezolid gibi seçenekler gündeme gelir.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology",
      "infectious-diseases",
      "pharmacology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "MRSA",
      "metisiline dirençli S. aureus",
      "Mikrobiyoloji direnç"
    ]
  },
  {
    "term": "İskemik inme",
    "aliases": [
      "ischemic stroke",
      "serebral iskemi"
    ],
    "category": "Nöroloji acili",
    "previewDefinition": "Serebral damar tıkanıklığına bağlı akut fokal nörolojik defisittir.",
    "preAnswerSafeDefinition": "Serebral damar tıkanıklığına bağlı akut fokal nörolojik defisittir.",
    "shortDefinition": "Serebral damar tıkanıklığına bağlı akut fokal nörolojik defisittir.",
    "detailedExplanation": "Serebral damar tıkanıklığına bağlı akut fokal nörolojik defisittir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Akut fokal defisitte ilk kritik basamak kanamayı dışlamak için beyin görüntülemesidir.",
    "tusPearl": "Akut fokal defisitte ilk kritik basamak kanamayı dışlamak için beyin görüntülemesidir.",
    "differentialPoint": "Hemorajik inmede ani baş ağrısı ve kanama bulgusu öne çıkabilir; tromboliz kontrendikedir.",
    "clinicalRelevance": "Akut fokal defisitte ilk kritik basamak kanamayı dışlamak için beyin görüntülemesidir.",
    "mechanism": "",
    "relatedBranches": [
      "neurology",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "İskemik inme",
      "ischemic stroke",
      "serebral iskemi",
      "Nöroloji acili"
    ]
  },
  {
    "term": "Hemorajik inme",
    "aliases": [
      "intrakraniyal kanama",
      "hemorrhagic stroke"
    ],
    "category": "Nöroloji acili",
    "previewDefinition": "Beyin parankimi veya subaraknoid alana kanama ile gelişen inme tipidir.",
    "preAnswerSafeDefinition": "Beyin parankimi veya subaraknoid alana kanama ile gelişen inme tipidir.",
    "shortDefinition": "Beyin parankimi veya subaraknoid alana kanama ile gelişen inme tipidir.",
    "detailedExplanation": "Beyin parankimi veya subaraknoid alana kanama ile gelişen inme tipidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Ani şiddetli baş ağrısı, kusma ve bilinç değişikliği kanamayı düşündürür.",
    "tusPearl": "Ani şiddetli baş ağrısı, kusma ve bilinç değişikliği kanamayı düşündürür.",
    "differentialPoint": "İskemik inmede tromboliz düşünülmeden önce kanama dışlanmalıdır.",
    "clinicalRelevance": "Ani şiddetli baş ağrısı, kusma ve bilinç değişikliği kanamayı düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "neurology",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Hemorajik inme",
      "intrakraniyal kanama",
      "hemorrhagic stroke",
      "Nöroloji acili"
    ]
  },
  {
    "term": "Subaraknoid kanama",
    "aliases": [
      "SAH",
      "subarachnoid hemorrhage"
    ],
    "category": "Nöroloji acili",
    "previewDefinition": "Subaraknoid aralığa kanama gelişmesiyle ortaya çıkan acil tablodur.",
    "preAnswerSafeDefinition": "Subaraknoid aralığa kanama gelişmesiyle ortaya çıkan acil tablodur.",
    "shortDefinition": "Subaraknoid aralığa kanama gelişmesiyle ortaya çıkan acil tablodur.",
    "detailedExplanation": "Subaraknoid aralığa kanama gelişmesiyle ortaya çıkan acil tablodur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Hayatının en şiddetli baş ağrısı + ense sertliği SAH için klasik ipucudur.",
    "tusPearl": "Hayatının en şiddetli baş ağrısı + ense sertliği SAH için klasik ipucudur.",
    "differentialPoint": "Menenjitte ateş ve enfeksiyon bulguları daha belirgin olabilir.",
    "clinicalRelevance": "Hayatının en şiddetli baş ağrısı + ense sertliği SAH için klasik ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "neurology",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Subaraknoid kanama",
      "SAH",
      "subarachnoid hemorrhage",
      "Nöroloji acili"
    ]
  },
  {
    "term": "Status epileptikus",
    "aliases": [
      "status epilepticus"
    ],
    "category": "Nöroloji acili",
    "previewDefinition": "Uzamış veya tekrarlayan nöbetlerle bilinç düzelmeden süren epileptik acildir.",
    "preAnswerSafeDefinition": "Uzamış veya tekrarlayan nöbetlerle bilinç düzelmeden süren epileptik acildir.",
    "shortDefinition": "Uzamış veya tekrarlayan nöbetlerle bilinç düzelmeden süren epileptik acildir.",
    "detailedExplanation": "Uzamış veya tekrarlayan nöbetlerle bilinç düzelmeden süren epileptik acildir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "İlk tedavi benzodiazepindir; altta yatan glukoz/elektrolit gibi nedenler eş zamanlı değerlendirilir.",
    "tusPearl": "İlk tedavi benzodiazepindir; altta yatan glukoz/elektrolit gibi nedenler eş zamanlı değerlendirilir.",
    "differentialPoint": "Profilaktik antiepileptik seçimi akut nöbet durdurma basamağından farklıdır.",
    "clinicalRelevance": "İlk tedavi benzodiazepindir; altta yatan glukoz/elektrolit gibi nedenler eş zamanlı değerlendirilir.",
    "mechanism": "",
    "relatedBranches": [
      "neurology",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Status epileptikus",
      "status epilepticus",
      "Nöroloji acili"
    ]
  },
  {
    "term": "Todd paralizisi",
    "aliases": [
      "Todd paresis"
    ],
    "category": "Nöroloji",
    "previewDefinition": "Nöbet sonrası geçici fokal güçsüzlük gelişmesidir.",
    "preAnswerSafeDefinition": "Nöbet sonrası geçici fokal güçsüzlük gelişmesidir.",
    "shortDefinition": "Nöbet sonrası geçici fokal güçsüzlük gelişmesidir.",
    "detailedExplanation": "Nöbet sonrası geçici fokal güçsüzlük gelişmesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Nöbet öyküsü sonrası geçici hemiparezi inme taklidi yapabilir.",
    "tusPearl": "Nöbet öyküsü sonrası geçici hemiparezi inme taklidi yapabilir.",
    "differentialPoint": "Akut inme dışlanmadan güvenli kabul edilmemelidir.",
    "clinicalRelevance": "Nöbet öyküsü sonrası geçici hemiparezi inme taklidi yapabilir.",
    "mechanism": "",
    "relatedBranches": [
      "neurology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Todd paralizisi",
      "Todd paresis",
      "Nöroloji"
    ]
  },
  {
    "term": "Wernicke ensefalopatisi",
    "aliases": [
      "Wernicke",
      "B1 eksikliği ensefalopatisi"
    ],
    "category": "Nöroloji / Vitamin",
    "previewDefinition": "Tiamin eksikliğine bağlı konfüzyon, ataksi ve oftalmopleji triadıyla seyreden acildir.",
    "preAnswerSafeDefinition": "Tiamin eksikliğine bağlı konfüzyon, ataksi ve oftalmopleji triadıyla seyreden acildir.",
    "shortDefinition": "Tiamin eksikliğine bağlı konfüzyon, ataksi ve oftalmopleji triadıyla seyreden acildir.",
    "detailedExplanation": "Tiamin eksikliğine bağlı konfüzyon, ataksi ve oftalmopleji triadıyla seyreden acildir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Alkol kullanım bozukluğu veya malnütrisyonlu hastada glukozdan önce tiamin verilmesi kritik bilgidir.",
    "tusPearl": "Alkol kullanım bozukluğu veya malnütrisyonlu hastada glukozdan önce tiamin verilmesi kritik bilgidir.",
    "differentialPoint": "Korsakoff sendromu kronik amnestik tabloyu ifade eder.",
    "clinicalRelevance": "Alkol kullanım bozukluğu veya malnütrisyonlu hastada glukozdan önce tiamin verilmesi kritik bilgidir.",
    "mechanism": "",
    "relatedBranches": [
      "neurology",
      "internal-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Wernicke ensefalopatisi",
      "Wernicke",
      "B1 eksikliği ensefalopatisi",
      "Nöroloji / Vitamin"
    ]
  },
  {
    "term": "Korsakoff sendromu",
    "aliases": [
      "Korsakoff psychosis"
    ],
    "category": "Nöroloji / Psikiyatri",
    "previewDefinition": "Tiamin eksikliğine bağlı kalıcı hafıza bozukluğu ve konfabulasyonla seyreden tablodur.",
    "preAnswerSafeDefinition": "Tiamin eksikliğine bağlı kalıcı hafıza bozukluğu ve konfabulasyonla seyreden tablodur.",
    "shortDefinition": "Tiamin eksikliğine bağlı kalıcı hafıza bozukluğu ve konfabulasyonla seyreden tablodur.",
    "detailedExplanation": "Tiamin eksikliğine bağlı kalıcı hafıza bozukluğu ve konfabulasyonla seyreden tablodur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Wernicke akut ve geri döndürülebilir olabilir; Korsakoff kronik amnestik sekel olarak düşünülür.",
    "tusPearl": "Wernicke akut ve geri döndürülebilir olabilir; Korsakoff kronik amnestik sekel olarak düşünülür.",
    "differentialPoint": "Deliryum dalgalı bilinç bozukluğuyla ayrılır.",
    "clinicalRelevance": "Wernicke akut ve geri döndürülebilir olabilir; Korsakoff kronik amnestik sekel olarak düşünülür.",
    "mechanism": "",
    "relatedBranches": [
      "neurology",
      "psychiatry"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Korsakoff sendromu",
      "Korsakoff psychosis",
      "Nöroloji / Psikiyatri"
    ]
  },
  {
    "term": "Guillain-Barré sendromu",
    "aliases": [
      "GBS",
      "acute inflammatory demyelinating polyneuropathy"
    ],
    "category": "Nöroloji",
    "previewDefinition": "Akut immün aracılı poliradikülonöropati olup yükselen güçsüzlükle seyreder.",
    "preAnswerSafeDefinition": "Akut immün aracılı poliradikülonöropati olup yükselen güçsüzlükle seyreder.",
    "shortDefinition": "Akut immün aracılı poliradikülonöropati olup yükselen güçsüzlükle seyreder.",
    "detailedExplanation": "Akut immün aracılı poliradikülonöropati olup yükselen güçsüzlükle seyreder. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Arefleksi + yükselen paralizi + enfeksiyon sonrası öykü GBS düşündürür; solunum kapasitesi izlenir.",
    "tusPearl": "Arefleksi + yükselen paralizi + enfeksiyon sonrası öykü GBS düşündürür; solunum kapasitesi izlenir.",
    "differentialPoint": "Myastenia gravis dalgalanan kas güçsüzlüğüyle seyreder ve duyu etkilenmez.",
    "clinicalRelevance": "Arefleksi + yükselen paralizi + enfeksiyon sonrası öykü GBS düşündürür; solunum kapasitesi izlenir.",
    "mechanism": "",
    "relatedBranches": [
      "neurology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Guillain-Barré sendromu",
      "GBS",
      "acute inflammatory demyelinating polyneuropathy",
      "Nöroloji"
    ]
  },
  {
    "term": "Myastenia gravis",
    "aliases": [
      "MG",
      "myasthenia gravis"
    ],
    "category": "Nöromüsküler hastalık",
    "previewDefinition": "Nöromüsküler kavşakta asetilkolin reseptörlerine karşı otoimmün hastalıktır.",
    "preAnswerSafeDefinition": "Nöromüsküler kavşakta asetilkolin reseptörlerine karşı otoimmün hastalıktır.",
    "shortDefinition": "Nöromüsküler kavşakta asetilkolin reseptörlerine karşı otoimmün hastalıktır.",
    "detailedExplanation": "Nöromüsküler kavşakta asetilkolin reseptörlerine karşı otoimmün hastalıktır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Gün içinde artan pitozis/diplopi ve istirahatle düzelme myastenia için klasik ipucudur.",
    "tusPearl": "Gün içinde artan pitozis/diplopi ve istirahatle düzelme myastenia için klasik ipucudur.",
    "differentialPoint": "Lambert-Eaton’da güç kullanım ile artabilir ve otonom bulgular daha belirgindir.",
    "clinicalRelevance": "Gün içinde artan pitozis/diplopi ve istirahatle düzelme myastenia için klasik ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "neurology",
      "immunology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Myastenia gravis",
      "MG",
      "myasthenia gravis",
      "Nöromüsküler hastalık"
    ]
  },
  {
    "term": "Lambert-Eaton sendromu",
    "aliases": [
      "LEMS"
    ],
    "category": "Paraneoplastik nöroloji",
    "previewDefinition": "Presinaptik voltaj kapılı kalsiyum kanallarına karşı antikorlarla gelişen nöromüsküler kavşak hastalığıdır.",
    "preAnswerSafeDefinition": "Presinaptik voltaj kapılı kalsiyum kanallarına karşı antikorlarla gelişen nöromüsküler kavşak hastalığıdır.",
    "shortDefinition": "Presinaptik voltaj kapılı kalsiyum kanallarına karşı antikorlarla gelişen nöromüsküler kavşak hastalığıdır.",
    "detailedExplanation": "Presinaptik voltaj kapılı kalsiyum kanallarına karşı antikorlarla gelişen nöromüsküler kavşak hastalığıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Proksimal güçsüzlük + kullanım sonrası güç artışı + küçük hücreli akciğer kanseri ilişkisi önemlidir.",
    "tusPearl": "Proksimal güçsüzlük + kullanım sonrası güç artışı + küçük hücreli akciğer kanseri ilişkisi önemlidir.",
    "differentialPoint": "Myastenia graviste postsinaptik ACh reseptörü hedeflenir ve yorgunlukla kötüleşme tipiktir.",
    "clinicalRelevance": "Proksimal güçsüzlük + kullanım sonrası güç artışı + küçük hücreli akciğer kanseri ilişkisi önemlidir.",
    "mechanism": "",
    "relatedBranches": [
      "neurology",
      "oncology",
      "pulmonology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Lambert-Eaton sendromu",
      "LEMS",
      "Paraneoplastik nöroloji"
    ]
  },
  {
    "term": "Parkinson hastalığı",
    "aliases": [
      "Parkinson disease"
    ],
    "category": "Nöroloji",
    "previewDefinition": "Substantia nigra dopaminerjik nöron kaybıyla seyreden hareket bozukluğudur.",
    "preAnswerSafeDefinition": "Substantia nigra dopaminerjik nöron kaybıyla seyreden hareket bozukluğudur.",
    "shortDefinition": "Substantia nigra dopaminerjik nöron kaybıyla seyreden hareket bozukluğudur.",
    "detailedExplanation": "Substantia nigra dopaminerjik nöron kaybıyla seyreden hareket bozukluğudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Bradikinezi, rijidite, istirahat tremoru ve postural instabilite klasik dörtlemedir.",
    "tusPearl": "Bradikinezi, rijidite, istirahat tremoru ve postural instabilite klasik dörtlemedir.",
    "differentialPoint": "Esansiyel tremor hareketle artar; Parkinson tremoru istirahatte daha belirgindir.",
    "clinicalRelevance": "Bradikinezi, rijidite, istirahat tremoru ve postural instabilite klasik dörtlemedir.",
    "mechanism": "",
    "relatedBranches": [
      "neurology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Parkinson hastalığı",
      "Parkinson disease",
      "Nöroloji"
    ]
  },
  {
    "term": "Huntington hastalığı",
    "aliases": [
      "Huntington chorea"
    ],
    "category": "Nöroloji genetik",
    "previewDefinition": "CAG tekrar artışıyla gelişen otozomal dominant nörodejeneratif hastalıktır.",
    "preAnswerSafeDefinition": "CAG tekrar artışıyla gelişen otozomal dominant nörodejeneratif hastalıktır.",
    "shortDefinition": "CAG tekrar artışıyla gelişen otozomal dominant nörodejeneratif hastalıktır.",
    "detailedExplanation": "CAG tekrar artışıyla gelişen otozomal dominant nörodejeneratif hastalıktır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Kore, psikiyatrik bulgular ve demans Huntington için klasik triaddır.",
    "tusPearl": "Kore, psikiyatrik bulgular ve demans Huntington için klasik triaddır.",
    "differentialPoint": "Wilson hastalığı gençte hareket bozukluğu yapabilir ama bakır metabolizması bulguları vardır.",
    "clinicalRelevance": "Kore, psikiyatrik bulgular ve demans Huntington için klasik triaddır.",
    "mechanism": "",
    "relatedBranches": [
      "neurology",
      "genetics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Huntington hastalığı",
      "Huntington chorea",
      "Nöroloji genetik"
    ]
  },
  {
    "term": "Multiple skleroz",
    "aliases": [
      "MS",
      "multiple sclerosis"
    ],
    "category": "Nöroloji",
    "previewDefinition": "Santral sinir sisteminde demiyelinizan otoimmün hastalıktır.",
    "preAnswerSafeDefinition": "Santral sinir sisteminde demiyelinizan otoimmün hastalıktır.",
    "shortDefinition": "Santral sinir sisteminde demiyelinizan otoimmün hastalıktır.",
    "detailedExplanation": "Santral sinir sisteminde demiyelinizan otoimmün hastalıktır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Zaman ve mekânda yayılım MS tanı mantığının temelidir.",
    "tusPearl": "Zaman ve mekânda yayılım MS tanı mantığının temelidir.",
    "differentialPoint": "Guillain-Barré periferik sinir sistemini tutar.",
    "clinicalRelevance": "Zaman ve mekânda yayılım MS tanı mantığının temelidir.",
    "mechanism": "",
    "relatedBranches": [
      "neurology",
      "immunology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Multiple skleroz",
      "MS",
      "multiple sclerosis",
      "Nöroloji"
    ]
  },
  {
    "term": "Optik nörit",
    "aliases": [
      "optic neuritis"
    ],
    "category": "Nörooftalmoloji",
    "previewDefinition": "Optik sinir inflamasyonuna bağlı ağrılı görme kaybıdır.",
    "preAnswerSafeDefinition": "Optik sinir inflamasyonuna bağlı ağrılı görme kaybıdır.",
    "shortDefinition": "Optik sinir inflamasyonuna bağlı ağrılı görme kaybıdır.",
    "detailedExplanation": "Optik sinir inflamasyonuna bağlı ağrılı görme kaybıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Genç kadında ağrılı görme kaybı ve MS ilişkisi yüksek değerli ipucudur.",
    "tusPearl": "Genç kadında ağrılı görme kaybı ve MS ilişkisi yüksek değerli ipucudur.",
    "differentialPoint": "Retina dekolmanında ışık çakmaları ve perde inmesi daha tipiktir.",
    "clinicalRelevance": "Genç kadında ağrılı görme kaybı ve MS ilişkisi yüksek değerli ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "neurology",
      "ophthalmology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Optik nörit",
      "optic neuritis",
      "Nörooftalmoloji"
    ]
  },
  {
    "term": "Mikrositer anemi",
    "aliases": [
      "microcytic anemia",
      "MCV düşük anemi"
    ],
    "category": "Hematoloji",
    "previewDefinition": "MCV düşüklüğüyle seyreden anemi grubudur.",
    "preAnswerSafeDefinition": "MCV düşüklüğüyle seyreden anemi grubudur.",
    "shortDefinition": "MCV düşüklüğüyle seyreden anemi grubudur.",
    "detailedExplanation": "MCV düşüklüğüyle seyreden anemi grubudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Demir eksikliği, talasemi ve kronik hastalık anemisi ayırıcı tanıda düşünülür.",
    "tusPearl": "Demir eksikliği, talasemi ve kronik hastalık anemisi ayırıcı tanıda düşünülür.",
    "differentialPoint": "Makrositer anemide B12/folat eksikliği ve alkol/karaciğer hastalığı öne çıkar.",
    "clinicalRelevance": "Demir eksikliği, talasemi ve kronik hastalık anemisi ayırıcı tanıda düşünülür.",
    "mechanism": "",
    "relatedBranches": [
      "hematology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Mikrositer anemi",
      "microcytic anemia",
      "MCV düşük anemi",
      "Hematoloji"
    ]
  },
  {
    "term": "Demir eksikliği anemisi",
    "aliases": [
      "iron deficiency anemia"
    ],
    "category": "Hematoloji",
    "previewDefinition": "Demir depolarının azalmasına bağlı hemoglobin sentez bozukluğu ve mikrositer anemidir.",
    "preAnswerSafeDefinition": "Demir depolarının azalmasına bağlı hemoglobin sentez bozukluğu ve mikrositer anemidir.",
    "shortDefinition": "Demir depolarının azalmasına bağlı hemoglobin sentez bozukluğu ve mikrositer anemidir.",
    "detailedExplanation": "Demir depolarının azalmasına bağlı hemoglobin sentez bozukluğu ve mikrositer anemidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Ferritin düşüklüğü demir eksikliği için en değerli laboratuvar ipucudur.",
    "tusPearl": "Ferritin düşüklüğü demir eksikliği için en değerli laboratuvar ipucudur.",
    "differentialPoint": "Talasemide RBC sayısı göreceli yüksek olabilir ve ferritin düşük olmak zorunda değildir.",
    "clinicalRelevance": "Ferritin düşüklüğü demir eksikliği için en değerli laboratuvar ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "gastroenterology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Demir eksikliği anemisi",
      "iron deficiency anemia",
      "Hematoloji"
    ]
  },
  {
    "term": "Talasemi",
    "aliases": [
      "thalassemia"
    ],
    "category": "Hematoloji genetik",
    "previewDefinition": "Globin zincir sentezinde genetik azalmaya bağlı mikrositer hemolitik anemidir.",
    "preAnswerSafeDefinition": "Globin zincir sentezinde genetik azalmaya bağlı mikrositer hemolitik anemidir.",
    "shortDefinition": "Globin zincir sentezinde genetik azalmaya bağlı mikrositer hemolitik anemidir.",
    "detailedExplanation": "Globin zincir sentezinde genetik azalmaya bağlı mikrositer hemolitik anemidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Mikrositozun anemiye göre belirgin olması ve aile/etnik öykü talasemiyi düşündürür.",
    "tusPearl": "Mikrositozun anemiye göre belirgin olması ve aile/etnik öykü talasemiyi düşündürür.",
    "differentialPoint": "Demir eksikliğinde ferritin düşük ve RDW genellikle artmıştır.",
    "clinicalRelevance": "Mikrositozun anemiye göre belirgin olması ve aile/etnik öykü talasemiyi düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "genetics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Talasemi",
      "thalassemia",
      "Hematoloji genetik"
    ]
  },
  {
    "term": "Megaloblastik anemi",
    "aliases": [
      "megaloblastic anemia",
      "hipersegmente nötrofil"
    ],
    "category": "Hematoloji",
    "previewDefinition": "DNA sentez bozukluğuna bağlı makrositer anemi ve hipersegmente nötrofillerle seyreden tablodur.",
    "preAnswerSafeDefinition": "DNA sentez bozukluğuna bağlı makrositer anemi ve hipersegmente nötrofillerle seyreden tablodur.",
    "shortDefinition": "DNA sentez bozukluğuna bağlı makrositer anemi ve hipersegmente nötrofillerle seyreden tablodur.",
    "detailedExplanation": "DNA sentez bozukluğuna bağlı makrositer anemi ve hipersegmente nötrofillerle seyreden tablodur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "B12 ve folat eksikliği megaloblastik aneminin temel nedenleridir.",
    "tusPearl": "B12 ve folat eksikliği megaloblastik aneminin temel nedenleridir.",
    "differentialPoint": "B12 eksikliğinde nörolojik bulgu beklenebilir; folat eksikliğinde beklenmez.",
    "clinicalRelevance": "B12 ve folat eksikliği megaloblastik aneminin temel nedenleridir.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "biochemistry"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Megaloblastik anemi",
      "megaloblastic anemia",
      "hipersegmente nötrofil",
      "Hematoloji"
    ]
  },
  {
    "term": "Pernisiyöz anemi",
    "aliases": [
      "pernicious anemia"
    ],
    "category": "Hematoloji / Otoimmün",
    "previewDefinition": "İntrinsik faktör eksikliğine bağlı B12 emilim bozukluğudur.",
    "preAnswerSafeDefinition": "İntrinsik faktör eksikliğine bağlı B12 emilim bozukluğudur.",
    "shortDefinition": "İntrinsik faktör eksikliğine bağlı B12 emilim bozukluğudur.",
    "detailedExplanation": "İntrinsik faktör eksikliğine bağlı B12 emilim bozukluğudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Anti-intrinsik faktör antikoru ve nörolojik bulgulu makrositer anemi pernisiyöz anemi düşündürür.",
    "tusPearl": "Anti-intrinsik faktör antikoru ve nörolojik bulgulu makrositer anemi pernisiyöz anemi düşündürür.",
    "differentialPoint": "Folat eksikliği nörolojik bulgu yapmaz.",
    "clinicalRelevance": "Anti-intrinsik faktör antikoru ve nörolojik bulgulu makrositer anemi pernisiyöz anemi düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "gastroenterology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Pernisiyöz anemi",
      "pernicious anemia",
      "Hematoloji / Otoimmün"
    ]
  },
  {
    "term": "Hemolitik anemi",
    "aliases": [
      "hemolysis",
      "hemoliz"
    ],
    "category": "Hematoloji",
    "previewDefinition": "Eritrosit yıkımının artmasıyla gelişen anemi grubudur.",
    "preAnswerSafeDefinition": "Eritrosit yıkımının artmasıyla gelişen anemi grubudur.",
    "shortDefinition": "Eritrosit yıkımının artmasıyla gelişen anemi grubudur.",
    "detailedExplanation": "Eritrosit yıkımının artmasıyla gelişen anemi grubudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Retikülositoz, LDH artışı, indirekt bilirubin artışı ve haptoglobin düşüklüğü hemolizi destekler.",
    "tusPearl": "Retikülositoz, LDH artışı, indirekt bilirubin artışı ve haptoglobin düşüklüğü hemolizi destekler.",
    "differentialPoint": "Üretim azlığı anemilerinde retikülosit yanıtı yetersizdir.",
    "clinicalRelevance": "Retikülositoz, LDH artışı, indirekt bilirubin artışı ve haptoglobin düşüklüğü hemolizi destekler.",
    "mechanism": "",
    "relatedBranches": [
      "hematology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Hemolitik anemi",
      "hemolysis",
      "hemoliz",
      "Hematoloji"
    ]
  },
  {
    "term": "G6PD eksikliği",
    "aliases": [
      "glukoz-6-fosfat dehidrogenaz eksikliği",
      "favizm"
    ],
    "category": "Hematoloji / Enzimopati",
    "previewDefinition": "Oksidatif stresle hemolize yol açan X’e bağlı enzim eksikliğidir.",
    "preAnswerSafeDefinition": "Oksidatif stresle hemolize yol açan X’e bağlı enzim eksikliğidir.",
    "shortDefinition": "Oksidatif stresle hemolize yol açan X’e bağlı enzim eksikliğidir.",
    "detailedExplanation": "Oksidatif stresle hemolize yol açan X’e bağlı enzim eksikliğidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Bakla, sülfonamid veya enfeksiyon sonrası hemoliz + Heinz cisimcikleri G6PD düşündürür.",
    "tusPearl": "Bakla, sülfonamid veya enfeksiyon sonrası hemoliz + Heinz cisimcikleri G6PD düşündürür.",
    "differentialPoint": "Otoimmün hemolizde direkt Coombs pozitifliği beklenir.",
    "clinicalRelevance": "Bakla, sülfonamid veya enfeksiyon sonrası hemoliz + Heinz cisimcikleri G6PD düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "biochemistry"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "G6PD eksikliği",
      "glukoz-6-fosfat dehidrogenaz eksikliği",
      "favizm",
      "Hematoloji / Enzimopati"
    ]
  },
  {
    "term": "Orak hücre hastalığı",
    "aliases": [
      "sickle cell disease",
      "HbS"
    ],
    "category": "Hematoloji genetik",
    "previewDefinition": "HbS polimerizasyonuna bağlı vazooklüzif kriz ve hemolizle seyreden hastalıktır.",
    "preAnswerSafeDefinition": "HbS polimerizasyonuna bağlı vazooklüzif kriz ve hemolizle seyreden hastalıktır.",
    "shortDefinition": "HbS polimerizasyonuna bağlı vazooklüzif kriz ve hemolizle seyreden hastalıktır.",
    "detailedExplanation": "HbS polimerizasyonuna bağlı vazooklüzif kriz ve hemolizle seyreden hastalıktır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Ağrılı kriz, autosplenektomi ve enfeksiyon riski orak hücre için yüksek değerli bilgilerdir.",
    "tusPearl": "Ağrılı kriz, autosplenektomi ve enfeksiyon riski orak hücre için yüksek değerli bilgilerdir.",
    "differentialPoint": "Talasemide globin zincir sentez azalması ön plandadır.",
    "clinicalRelevance": "Ağrılı kriz, autosplenektomi ve enfeksiyon riski orak hücre için yüksek değerli bilgilerdir.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "genetics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Orak hücre hastalığı",
      "sickle cell disease",
      "HbS",
      "Hematoloji genetik"
    ]
  },
  {
    "term": "TTP",
    "aliases": [
      "trombotik trombositopenik purpura",
      "ADAMTS13"
    ],
    "category": "Hematolojik acil",
    "previewDefinition": "ADAMTS13 eksikliği/inhibisyonu ile mikrotrombüslere bağlı trombotik mikroanjiyopatidir.",
    "preAnswerSafeDefinition": "ADAMTS13 eksikliği/inhibisyonu ile mikrotrombüslere bağlı trombotik mikroanjiyopatidir.",
    "shortDefinition": "ADAMTS13 eksikliği/inhibisyonu ile mikrotrombüslere bağlı trombotik mikroanjiyopatidir.",
    "detailedExplanation": "ADAMTS13 eksikliği/inhibisyonu ile mikrotrombüslere bağlı trombotik mikroanjiyopatidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Trombositopeni + mikroanjiyopatik hemolitik anemi + nörolojik/renal bulgu TTP düşündürür.",
    "tusPearl": "Trombositopeni + mikroanjiyopatik hemolitik anemi + nörolojik/renal bulgu TTP düşündürür.",
    "differentialPoint": "ITP’de izole trombositopeni ve hemoliz beklenmez.",
    "clinicalRelevance": "Trombositopeni + mikroanjiyopatik hemolitik anemi + nörolojik/renal bulgu TTP düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "TTP",
      "trombotik trombositopenik purpura",
      "ADAMTS13",
      "Hematolojik acil"
    ]
  },
  {
    "term": "HUS",
    "aliases": [
      "hemolitik üremik sendrom",
      "hemolytic uremic syndrome"
    ],
    "category": "Hematoloji / Nefroloji",
    "previewDefinition": "Hemolitik anemi, trombositopeni ve akut böbrek hasarı ile seyreden mikroanjiyopatidir.",
    "preAnswerSafeDefinition": "Hemolitik anemi, trombositopeni ve akut böbrek hasarı ile seyreden mikroanjiyopatidir.",
    "shortDefinition": "Hemolitik anemi, trombositopeni ve akut böbrek hasarı ile seyreden mikroanjiyopatidir.",
    "detailedExplanation": "Hemolitik anemi, trombositopeni ve akut böbrek hasarı ile seyreden mikroanjiyopatidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Çocukta kanlı ishal sonrası böbrek yetmezliği HUS için klasik ipucudur.",
    "tusPearl": "Çocukta kanlı ishal sonrası böbrek yetmezliği HUS için klasik ipucudur.",
    "differentialPoint": "TTP’de nörolojik bulgular ve ADAMTS13 ilişkisi daha öne çıkar.",
    "clinicalRelevance": "Çocukta kanlı ishal sonrası böbrek yetmezliği HUS için klasik ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "nephrology",
      "pediatrics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "HUS",
      "hemolitik üremik sendrom",
      "hemolytic uremic syndrome",
      "Hematoloji / Nefroloji"
    ]
  },
  {
    "term": "ITP",
    "aliases": [
      "immün trombositopenik purpura"
    ],
    "category": "Hematoloji",
    "previewDefinition": "Otoimmün trombosit yıkımına bağlı izole trombositopenidir.",
    "preAnswerSafeDefinition": "Otoimmün trombosit yıkımına bağlı izole trombositopenidir.",
    "shortDefinition": "Otoimmün trombosit yıkımına bağlı izole trombositopenidir.",
    "detailedExplanation": "Otoimmün trombosit yıkımına bağlı izole trombositopenidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Çocukta viral enfeksiyon sonrası peteşi ve izole trombositopeni ITP düşündürür.",
    "tusPearl": "Çocukta viral enfeksiyon sonrası peteşi ve izole trombositopeni ITP düşündürür.",
    "differentialPoint": "TTP/HUS’ta hemoliz ve organ tutulum bulguları beklenir.",
    "clinicalRelevance": "Çocukta viral enfeksiyon sonrası peteşi ve izole trombositopeni ITP düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "pediatrics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "ITP",
      "immün trombositopenik purpura",
      "Hematoloji"
    ]
  },
  {
    "term": "DIC",
    "aliases": [
      "dissemine intravasküler koagülasyon"
    ],
    "category": "Hematolojik acil",
    "previewDefinition": "Yaygın pıhtılaşma aktivasyonu ve tüketim koagülopatisiyle seyreden tablodur.",
    "preAnswerSafeDefinition": "Yaygın pıhtılaşma aktivasyonu ve tüketim koagülopatisiyle seyreden tablodur.",
    "shortDefinition": "Yaygın pıhtılaşma aktivasyonu ve tüketim koagülopatisiyle seyreden tablodur.",
    "detailedExplanation": "Yaygın pıhtılaşma aktivasyonu ve tüketim koagülopatisiyle seyreden tablodur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "PT/aPTT uzaması, fibrinojen düşüklüğü, D-dimer yüksekliği DIC için tipiktir.",
    "tusPearl": "PT/aPTT uzaması, fibrinojen düşüklüğü, D-dimer yüksekliği DIC için tipiktir.",
    "differentialPoint": "ITP’de koagülasyon testleri genellikle normaldir.",
    "clinicalRelevance": "PT/aPTT uzaması, fibrinojen düşüklüğü, D-dimer yüksekliği DIC için tipiktir.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "DIC",
      "dissemine intravasküler koagülasyon",
      "Hematolojik acil"
    ]
  },
  {
    "term": "Reed-Sternberg hücresi",
    "aliases": [
      "Reed Sternberg cell",
      "baykuş gözü hücresi"
    ],
    "category": "Patoloji / Hematoloji",
    "previewDefinition": "Hodgkin lenfomada görülen çift çekirdekli büyük tümör hücresidir.",
    "preAnswerSafeDefinition": "Hodgkin lenfomada görülen çift çekirdekli büyük tümör hücresidir.",
    "shortDefinition": "Hodgkin lenfomada görülen çift çekirdekli büyük tümör hücresidir.",
    "detailedExplanation": "Hodgkin lenfomada görülen çift çekirdekli büyük tümör hücresidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Baykuş gözü görünümü Hodgkin lenfoma için klasik patoloji ipucudur.",
    "tusPearl": "Baykuş gözü görünümü Hodgkin lenfoma için klasik patoloji ipucudur.",
    "differentialPoint": "Non-Hodgkin lenfomalarda tipik Reed-Sternberg hücresi beklenmez.",
    "clinicalRelevance": "Baykuş gözü görünümü Hodgkin lenfoma için klasik patoloji ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "pathology",
      "hematology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Reed-Sternberg hücresi",
      "Reed Sternberg cell",
      "baykuş gözü hücresi",
      "Patoloji / Hematoloji"
    ]
  },
  {
    "term": "Auer rod",
    "aliases": [
      "Auer çubuğu"
    ],
    "category": "Hematoloji",
    "previewDefinition": "Akut miyeloid lösemi blastlarında görülebilen azurofilik sitoplazmik çubuk yapıdır.",
    "preAnswerSafeDefinition": "Akut miyeloid lösemi blastlarında görülebilen azurofilik sitoplazmik çubuk yapıdır.",
    "shortDefinition": "Akut miyeloid lösemi blastlarında görülebilen azurofilik sitoplazmik çubuk yapıdır.",
    "detailedExplanation": "Akut miyeloid lösemi blastlarında görülebilen azurofilik sitoplazmik çubuk yapıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Auer rod AML lehine güçlü morfolojik ipucudur.",
    "tusPearl": "Auer rod AML lehine güçlü morfolojik ipucudur.",
    "differentialPoint": "ALL’de lenfoblast fenotipi ve TdT pozitifliği daha öne çıkar.",
    "clinicalRelevance": "Auer rod AML lehine güçlü morfolojik ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "pathology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Auer rod",
      "Auer çubuğu",
      "Hematoloji"
    ]
  },
  {
    "term": "Philadelphia kromozomu",
    "aliases": [
      "BCR-ABL",
      "t(9;22)"
    ],
    "category": "Genetik / Hematoloji",
    "previewDefinition": "t(9;22) sonucu BCR-ABL füzyonunun oluşmasıdır.",
    "preAnswerSafeDefinition": "t(9;22) sonucu BCR-ABL füzyonunun oluşmasıdır.",
    "shortDefinition": "t(9;22) sonucu BCR-ABL füzyonunun oluşmasıdır.",
    "detailedExplanation": "t(9;22) sonucu BCR-ABL füzyonunun oluşmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "CML için klasik sitogenetik bulgudur; tirozin kinaz inhibitörleri hedefe yönelik tedavidir.",
    "tusPearl": "CML için klasik sitogenetik bulgudur; tirozin kinaz inhibitörleri hedefe yönelik tedavidir.",
    "differentialPoint": "AML’de farklı translokasyonlar ve Auer rod gibi bulgular öne çıkabilir.",
    "clinicalRelevance": "CML için klasik sitogenetik bulgudur; tirozin kinaz inhibitörleri hedefe yönelik tedavidir.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "genetics",
      "oncology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Philadelphia kromozomu",
      "BCR-ABL",
      "t(9;22)",
      "Genetik / Hematoloji"
    ]
  },
  {
    "term": "Reye sendromu",
    "aliases": [
      "Reye syndrome"
    ],
    "category": "Pediatri",
    "previewDefinition": "Viral enfeksiyon sırasında aspirin kullanımıyla ilişkili akut ensefalopati ve karaciğer disfonksiyonudur.",
    "preAnswerSafeDefinition": "Viral enfeksiyon sırasında aspirin kullanımıyla ilişkili akut ensefalopati ve karaciğer disfonksiyonudur.",
    "shortDefinition": "Viral enfeksiyon sırasında aspirin kullanımıyla ilişkili akut ensefalopati ve karaciğer disfonksiyonudur.",
    "detailedExplanation": "Viral enfeksiyon sırasında aspirin kullanımıyla ilişkili akut ensefalopati ve karaciğer disfonksiyonudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Çocukta aspirin sonrası kusma, bilinç değişikliği ve karaciğer bulguları Reye sendromunu düşündürür.",
    "tusPearl": "Çocukta aspirin sonrası kusma, bilinç değişikliği ve karaciğer bulguları Reye sendromunu düşündürür.",
    "differentialPoint": "Viral hepatitte primer karaciğer inflamasyonu; Reye’de mitokondriyal disfonksiyon ve ensefalopati öne çıkar.",
    "clinicalRelevance": "Çocukta aspirin sonrası kusma, bilinç değişikliği ve karaciğer bulguları Reye sendromunu düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics",
      "pharmacology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Reye sendromu",
      "Reye syndrome",
      "Pediatri"
    ]
  },
  {
    "term": "Kawasaki hastalığı",
    "aliases": [
      "mukokutanöz lenf nodu sendromu",
      "Kawasaki disease"
    ],
    "category": "Pediatri / Vaskülit",
    "previewDefinition": "Çocuklarda orta boy damar vasküliti olup koroner arter komplikasyonu yapabilir.",
    "preAnswerSafeDefinition": "Çocuklarda orta boy damar vasküliti olup koroner arter komplikasyonu yapabilir.",
    "shortDefinition": "Çocuklarda orta boy damar vasküliti olup koroner arter komplikasyonu yapabilir.",
    "detailedExplanation": "Çocuklarda orta boy damar vasküliti olup koroner arter komplikasyonu yapabilir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Beş günden uzun ateş + konjonktivit + ağız/dil değişikliği + döküntü + ekstremite değişikliği Kawasaki düşündürür.",
    "tusPearl": "Beş günden uzun ateş + konjonktivit + ağız/dil değişikliği + döküntü + ekstremite değişikliği Kawasaki düşündürür.",
    "differentialPoint": "Kızamıkta öksürük-koryza-konjunktivit ve Koplik lekeleri öne çıkar.",
    "clinicalRelevance": "Beş günden uzun ateş + konjonktivit + ağız/dil değişikliği + döküntü + ekstremite değişikliği Kawasaki düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics",
      "rheumatology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Kawasaki hastalığı",
      "mukokutanöz lenf nodu sendromu",
      "Kawasaki disease",
      "Pediatri / Vaskülit"
    ]
  },
  {
    "term": "Çilek dili",
    "aliases": [
      "strawberry tongue"
    ],
    "category": "Fizik muayene bulgusu",
    "previewDefinition": "Dil papillalarının belirginleşmesiyle kırmızı çilek görünümüdür.",
    "preAnswerSafeDefinition": "Dil papillalarının belirginleşmesiyle kırmızı çilek görünümüdür.",
    "shortDefinition": "Dil papillalarının belirginleşmesiyle kırmızı çilek görünümüdür.",
    "detailedExplanation": "Dil papillalarının belirginleşmesiyle kırmızı çilek görünümüdür. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Kawasaki ve kızıl hastalığında ayırıcı tanıya giren klasik bulgudur.",
    "tusPearl": "Kawasaki ve kızıl hastalığında ayırıcı tanıya giren klasik bulgudur.",
    "differentialPoint": "Koplik lekesi kızamıkta bukkal mukozada görülür.",
    "clinicalRelevance": "Kawasaki ve kızıl hastalığında ayırıcı tanıya giren klasik bulgudur.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics",
      "infectious-diseases"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Çilek dili",
      "strawberry tongue",
      "Fizik muayene bulgusu"
    ]
  },
  {
    "term": "Koplik lekeleri",
    "aliases": [
      "Koplik spots"
    ],
    "category": "Fizik muayene bulgusu",
    "previewDefinition": "Kızamıkta bukkal mukozada görülen küçük beyaz lezyonlardır.",
    "preAnswerSafeDefinition": "Kızamıkta bukkal mukozada görülen küçük beyaz lezyonlardır.",
    "shortDefinition": "Kızamıkta bukkal mukozada görülen küçük beyaz lezyonlardır.",
    "detailedExplanation": "Kızamıkta bukkal mukozada görülen küçük beyaz lezyonlardır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Öksürük, koryza, konjonktivit ve Koplik lekeleri kızamık için klasik kombinasyondur.",
    "tusPearl": "Öksürük, koryza, konjonktivit ve Koplik lekeleri kızamık için klasik kombinasyondur.",
    "differentialPoint": "Forchheimer lekeleri kızamıkçıkta görülebilir.",
    "clinicalRelevance": "Öksürük, koryza, konjonktivit ve Koplik lekeleri kızamık için klasik kombinasyondur.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics",
      "infectious-diseases"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Koplik lekeleri",
      "Koplik spots",
      "Fizik muayene bulgusu"
    ]
  },
  {
    "term": "Epiglotit",
    "aliases": [
      "epiglottitis"
    ],
    "category": "Pediatrik acil",
    "previewDefinition": "Supraglottik yapıların akut inflamasyonu nedeniyle hava yolu tıkanıklığı riski oluşturan tablodur.",
    "preAnswerSafeDefinition": "Supraglottik yapıların akut inflamasyonu nedeniyle hava yolu tıkanıklığı riski oluşturan tablodur.",
    "shortDefinition": "Supraglottik yapıların akut inflamasyonu nedeniyle hava yolu tıkanıklığı riski oluşturan tablodur.",
    "detailedExplanation": "Supraglottik yapıların akut inflamasyonu nedeniyle hava yolu tıkanıklığı riski oluşturan tablodur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Toksik çocuk + salya akması + tripod pozisyonu epiglotit açısından acildir.",
    "tusPearl": "Toksik çocuk + salya akması + tripod pozisyonu epiglotit açısından acildir.",
    "differentialPoint": "Krupta havlar tarzda öksürük ve subglottik daralma daha tipiktir.",
    "clinicalRelevance": "Toksik çocuk + salya akması + tripod pozisyonu epiglotit açısından acildir.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Epiglotit",
      "epiglottitis",
      "Pediatrik acil"
    ]
  },
  {
    "term": "Krup",
    "aliases": [
      "laringotrakeit",
      "croup"
    ],
    "category": "Pediatri",
    "previewDefinition": "Viral laringotrakeit olup havlar tarzda öksürük ve inspiratuvar stridorla seyreder.",
    "preAnswerSafeDefinition": "Viral laringotrakeit olup havlar tarzda öksürük ve inspiratuvar stridorla seyreder.",
    "shortDefinition": "Viral laringotrakeit olup havlar tarzda öksürük ve inspiratuvar stridorla seyreder.",
    "detailedExplanation": "Viral laringotrakeit olup havlar tarzda öksürük ve inspiratuvar stridorla seyreder. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Steeple sign ve havlar tarzda öksürük krup için klasik ipucudur.",
    "tusPearl": "Steeple sign ve havlar tarzda öksürük krup için klasik ipucudur.",
    "differentialPoint": "Epiglotitte toksik görünüm ve salya akması daha belirgindir.",
    "clinicalRelevance": "Steeple sign ve havlar tarzda öksürük krup için klasik ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics",
      "pulmonology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Krup",
      "laringotrakeit",
      "croup",
      "Pediatri"
    ]
  },
  {
    "term": "Bronşiolit",
    "aliases": [
      "bronchiolitis",
      "RSV bronşioliti"
    ],
    "category": "Pediatri / Pulmonoloji",
    "previewDefinition": "Bebeklerde küçük hava yollarının viral enfeksiyonla inflamasyonudur.",
    "preAnswerSafeDefinition": "Bebeklerde küçük hava yollarının viral enfeksiyonla inflamasyonudur.",
    "shortDefinition": "Bebeklerde küçük hava yollarının viral enfeksiyonla inflamasyonudur.",
    "detailedExplanation": "Bebeklerde küçük hava yollarının viral enfeksiyonla inflamasyonudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "RSV sonrası wheezing ve takipne bronşiolit için tipiktir.",
    "tusPearl": "RSV sonrası wheezing ve takipne bronşiolit için tipiktir.",
    "differentialPoint": "Astım daha büyük çocukta tekrarlayan reversibl bronkospazmla düşünülür.",
    "clinicalRelevance": "RSV sonrası wheezing ve takipne bronşiolit için tipiktir.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics",
      "pulmonology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Bronşiolit",
      "bronchiolitis",
      "RSV bronşioliti",
      "Pediatri / Pulmonoloji"
    ]
  },
  {
    "term": "Nekrotizan enterokolit",
    "aliases": [
      "NEC",
      "necrotizing enterocolitis"
    ],
    "category": "Neonatoloji",
    "previewDefinition": "Prematürelerde intestinal inflamasyon ve nekrozla seyreden ciddi tablodur.",
    "preAnswerSafeDefinition": "Prematürelerde intestinal inflamasyon ve nekrozla seyreden ciddi tablodur.",
    "shortDefinition": "Prematürelerde intestinal inflamasyon ve nekrozla seyreden ciddi tablodur.",
    "detailedExplanation": "Prematürelerde intestinal inflamasyon ve nekrozla seyreden ciddi tablodur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Prematüre + beslenme intoleransı + abdominal distansiyon + pneumatosis intestinalis NEC düşündürür.",
    "tusPearl": "Prematüre + beslenme intoleransı + abdominal distansiyon + pneumatosis intestinalis NEC düşündürür.",
    "differentialPoint": "Hirschsprung hastalığında mekonyum çıkaramama ve geç distansiyon öne çıkar.",
    "clinicalRelevance": "Prematüre + beslenme intoleransı + abdominal distansiyon + pneumatosis intestinalis NEC düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics",
      "surgery"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Nekrotizan enterokolit",
      "NEC",
      "necrotizing enterocolitis",
      "Neonatoloji"
    ]
  },
  {
    "term": "Pneumatosis intestinalis",
    "aliases": [
      "intestinal pneumatosis"
    ],
    "category": "Radyoloji bulgusu",
    "previewDefinition": "Bağırsak duvarı içinde gaz görülmesidir.",
    "preAnswerSafeDefinition": "Bağırsak duvarı içinde gaz görülmesidir.",
    "shortDefinition": "Bağırsak duvarı içinde gaz görülmesidir.",
    "detailedExplanation": "Bağırsak duvarı içinde gaz görülmesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Prematüre bebekte NEC için klasik görüntüleme bulgusudur.",
    "tusPearl": "Prematüre bebekte NEC için klasik görüntüleme bulgusudur.",
    "differentialPoint": "Serbest hava perforasyonu düşündürür ve daha ileri acil tablodur.",
    "clinicalRelevance": "Prematüre bebekte NEC için klasik görüntüleme bulgusudur.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics",
      "radiology",
      "surgery"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Pneumatosis intestinalis",
      "intestinal pneumatosis",
      "Radyoloji bulgusu"
    ]
  },
  {
    "term": "Hipertrofik pilor stenozu",
    "aliases": [
      "pyloric stenosis"
    ],
    "category": "Pediatrik cerrahi",
    "previewDefinition": "Pilor kas hipertrofisine bağlı mide çıkış obstrüksiyonudur.",
    "preAnswerSafeDefinition": "Pilor kas hipertrofisine bağlı mide çıkış obstrüksiyonudur.",
    "shortDefinition": "Pilor kas hipertrofisine bağlı mide çıkış obstrüksiyonudur.",
    "detailedExplanation": "Pilor kas hipertrofisine bağlı mide çıkış obstrüksiyonudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "2-8 haftalık bebekte projektil safrasız kusma + hipokloremik metabolik alkaloz klasik ipucudur.",
    "tusPearl": "2-8 haftalık bebekte projektil safrasız kusma + hipokloremik metabolik alkaloz klasik ipucudur.",
    "differentialPoint": "Bilious kusma malrotasyon/volvulus gibi distal obstrüksiyonu düşündürür.",
    "clinicalRelevance": "2-8 haftalık bebekte projektil safrasız kusma + hipokloremik metabolik alkaloz klasik ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics",
      "surgery"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Hipertrofik pilor stenozu",
      "pyloric stenosis",
      "Pediatrik cerrahi"
    ]
  },
  {
    "term": "İnvajinasyon",
    "aliases": [
      "intussusception"
    ],
    "category": "Pediatrik cerrahi",
    "previewDefinition": "Bağırsak segmentinin distal segmente teleskopik olarak girmesidir.",
    "preAnswerSafeDefinition": "Bağırsak segmentinin distal segmente teleskopik olarak girmesidir.",
    "shortDefinition": "Bağırsak segmentinin distal segmente teleskopik olarak girmesidir.",
    "detailedExplanation": "Bağırsak segmentinin distal segmente teleskopik olarak girmesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Aralıklı karın ağrısı + çilek jölesi dışkı + hedef işareti invajinasyon düşündürür.",
    "tusPearl": "Aralıklı karın ağrısı + çilek jölesi dışkı + hedef işareti invajinasyon düşündürür.",
    "differentialPoint": "Volvulusta bilious kusma ve hızlı iskemi riski daha öne çıkar.",
    "clinicalRelevance": "Aralıklı karın ağrısı + çilek jölesi dışkı + hedef işareti invajinasyon düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics",
      "surgery",
      "radiology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "İnvajinasyon",
      "intussusception",
      "Pediatrik cerrahi"
    ]
  },
  {
    "term": "Hirschsprung hastalığı",
    "aliases": [
      "aganglionik megakolon",
      "Hirschsprung disease"
    ],
    "category": "Pediatrik cerrahi",
    "previewDefinition": "Distal bağırsakta ganglion hücresi yokluğuna bağlı fonksiyonel obstrüksiyondur.",
    "preAnswerSafeDefinition": "Distal bağırsakta ganglion hücresi yokluğuna bağlı fonksiyonel obstrüksiyondur.",
    "shortDefinition": "Distal bağırsakta ganglion hücresi yokluğuna bağlı fonksiyonel obstrüksiyondur.",
    "detailedExplanation": "Distal bağırsakta ganglion hücresi yokluğuna bağlı fonksiyonel obstrüksiyondur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Mekonyum çıkaramama + abdominal distansiyon Hirschsprung için klasik ipucudur.",
    "tusPearl": "Mekonyum çıkaramama + abdominal distansiyon Hirschsprung için klasik ipucudur.",
    "differentialPoint": "Kistik fibroziste mekonyum ileusu olabilir; ter testi ve pulmoner bulgular ayırıcıdır.",
    "clinicalRelevance": "Mekonyum çıkaramama + abdominal distansiyon Hirschsprung için klasik ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics",
      "surgery"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Hirschsprung hastalığı",
      "aganglionik megakolon",
      "Hirschsprung disease",
      "Pediatrik cerrahi"
    ]
  },
  {
    "term": "Preeklampsi",
    "aliases": [
      "preeclampsia"
    ],
    "category": "Kadın doğum",
    "previewDefinition": "Gebeliğin ikinci yarısında hipertansiyon ve organ disfonksiyonu/proteinüriyle seyreden tablodur.",
    "preAnswerSafeDefinition": "Gebeliğin ikinci yarısında hipertansiyon ve organ disfonksiyonu/proteinüriyle seyreden tablodur.",
    "shortDefinition": "Gebeliğin ikinci yarısında hipertansiyon ve organ disfonksiyonu/proteinüriyle seyreden tablodur.",
    "detailedExplanation": "Gebeliğin ikinci yarısında hipertansiyon ve organ disfonksiyonu/proteinüriyle seyreden tablodur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "20. haftadan sonra hipertansiyon + proteinüri preeklampsi için temel sınav bilgisidir.",
    "tusPearl": "20. haftadan sonra hipertansiyon + proteinüri preeklampsi için temel sınav bilgisidir.",
    "differentialPoint": "Gestasyonel hipertansiyonda proteinüri veya ağır organ bulguları yoktur.",
    "clinicalRelevance": "20. haftadan sonra hipertansiyon + proteinüri preeklampsi için temel sınav bilgisidir.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Preeklampsi",
      "preeclampsia",
      "Kadın doğum"
    ]
  },
  {
    "term": "Eklampsi",
    "aliases": [
      "eclampsia"
    ],
    "category": "Kadın doğum acili",
    "previewDefinition": "Preeklampsi zemininde nöbet gelişmesidir.",
    "preAnswerSafeDefinition": "Preeklampsi zemininde nöbet gelişmesidir.",
    "shortDefinition": "Preeklampsi zemininde nöbet gelişmesidir.",
    "detailedExplanation": "Preeklampsi zemininde nöbet gelişmesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Gebede nöbet + hipertansiyon eklampsi kabul edilip magnezyum sülfat yaklaşımı düşünülür.",
    "tusPearl": "Gebede nöbet + hipertansiyon eklampsi kabul edilip magnezyum sülfat yaklaşımı düşünülür.",
    "differentialPoint": "Epilepsi öyküsü olsa bile preeklampsi bulguları varsa eklampsi dışlanmamalıdır.",
    "clinicalRelevance": "Gebede nöbet + hipertansiyon eklampsi kabul edilip magnezyum sülfat yaklaşımı düşünülür.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Eklampsi",
      "eclampsia",
      "Kadın doğum acili"
    ]
  },
  {
    "term": "HELLP sendromu",
    "aliases": [
      "HELLP"
    ],
    "category": "Kadın doğum acili",
    "previewDefinition": "Hemoliz, karaciğer enzim yüksekliği ve trombositopeni ile seyreden gebelik komplikasyonudur.",
    "preAnswerSafeDefinition": "Hemoliz, karaciğer enzim yüksekliği ve trombositopeni ile seyreden gebelik komplikasyonudur.",
    "shortDefinition": "Hemoliz, karaciğer enzim yüksekliği ve trombositopeni ile seyreden gebelik komplikasyonudur.",
    "detailedExplanation": "Hemoliz, karaciğer enzim yüksekliği ve trombositopeni ile seyreden gebelik komplikasyonudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Sağ üst kadran ağrısı + trombositopeni + AST/ALT yüksekliği HELLP düşündürür.",
    "tusPearl": "Sağ üst kadran ağrısı + trombositopeni + AST/ALT yüksekliği HELLP düşündürür.",
    "differentialPoint": "Akut yağlı karaciğer hipoglisemi ve koagülopatiyle daha farklı seyredebilir.",
    "clinicalRelevance": "Sağ üst kadran ağrısı + trombositopeni + AST/ALT yüksekliği HELLP düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics",
      "hematology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "HELLP sendromu",
      "HELLP",
      "Kadın doğum acili"
    ]
  },
  {
    "term": "Plasenta previa",
    "aliases": [
      "placenta previa"
    ],
    "category": "Kadın doğum",
    "previewDefinition": "Plasentanın internal os üzerine veya yakınına yerleşmesidir.",
    "preAnswerSafeDefinition": "Plasentanın internal os üzerine veya yakınına yerleşmesidir.",
    "shortDefinition": "Plasentanın internal os üzerine veya yakınına yerleşmesidir.",
    "detailedExplanation": "Plasentanın internal os üzerine veya yakınına yerleşmesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Ağrısız üçüncü trimester kanaması plasenta previa için klasik ipucudur.",
    "tusPearl": "Ağrısız üçüncü trimester kanaması plasenta previa için klasik ipucudur.",
    "differentialPoint": "Abruptio plasentae ağrılı kanama ve uterin hassasiyetle daha tipiktir.",
    "clinicalRelevance": "Ağrısız üçüncü trimester kanaması plasenta previa için klasik ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Plasenta previa",
      "placenta previa",
      "Kadın doğum"
    ]
  },
  {
    "term": "Abruptio plasentae",
    "aliases": [
      "plasenta dekolmanı",
      "placental abruption"
    ],
    "category": "Kadın doğum acili",
    "previewDefinition": "Normal yerleşimli plasentanın doğumdan önce ayrılmasıdır.",
    "preAnswerSafeDefinition": "Normal yerleşimli plasentanın doğumdan önce ayrılmasıdır.",
    "shortDefinition": "Normal yerleşimli plasentanın doğumdan önce ayrılmasıdır.",
    "detailedExplanation": "Normal yerleşimli plasentanın doğumdan önce ayrılmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Ağrılı vajinal kanama + uterin hassasiyet + fetal distres abruption düşündürür.",
    "tusPearl": "Ağrılı vajinal kanama + uterin hassasiyet + fetal distres abruption düşündürür.",
    "differentialPoint": "Plasenta previa genellikle ağrısız kanamayla seyreder.",
    "clinicalRelevance": "Ağrılı vajinal kanama + uterin hassasiyet + fetal distres abruption düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Abruptio plasentae",
      "plasenta dekolmanı",
      "placental abruption",
      "Kadın doğum acili"
    ]
  },
  {
    "term": "Ektopik gebelik",
    "aliases": [
      "ectopic pregnancy",
      "dış gebelik"
    ],
    "category": "Kadın doğum acili",
    "previewDefinition": "Gebeliğin uterin kavite dışında yerleşmesidir.",
    "preAnswerSafeDefinition": "Gebeliğin uterin kavite dışında yerleşmesidir.",
    "shortDefinition": "Gebeliğin uterin kavite dışında yerleşmesidir.",
    "detailedExplanation": "Gebeliğin uterin kavite dışında yerleşmesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Amenore + vajinal kanama + tek taraflı pelvik ağrı ektopik gebelik düşündürür.",
    "tusPearl": "Amenore + vajinal kanama + tek taraflı pelvik ağrı ektopik gebelik düşündürür.",
    "differentialPoint": "Spontan abortusta gebelik uterin kavitededir; hemodinamik tablo farklılaşabilir.",
    "clinicalRelevance": "Amenore + vajinal kanama + tek taraflı pelvik ağrı ektopik gebelik düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Ektopik gebelik",
      "ectopic pregnancy",
      "dış gebelik",
      "Kadın doğum acili"
    ]
  },
  {
    "term": "Omuz distosisi",
    "aliases": [
      "shoulder dystocia"
    ],
    "category": "Obstetrik acil",
    "previewDefinition": "Doğumda fetal omuzların pelviste takılmasıdır.",
    "preAnswerSafeDefinition": "Doğumda fetal omuzların pelviste takılmasıdır.",
    "shortDefinition": "Doğumda fetal omuzların pelviste takılmasıdır.",
    "detailedExplanation": "Doğumda fetal omuzların pelviste takılmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "McRoberts manevrası ilk basamak klasik bilgidir.",
    "tusPearl": "McRoberts manevrası ilk basamak klasik bilgidir.",
    "differentialPoint": "Makat geliş farklı bir doğum mekaniği problemidir.",
    "clinicalRelevance": "McRoberts manevrası ilk basamak klasik bilgidir.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Omuz distosisi",
      "shoulder dystocia",
      "Obstetrik acil"
    ]
  },
  {
    "term": "Rh uygunsuzluğu",
    "aliases": [
      "Rh incompatibility",
      "eritroblastozis fetalis"
    ],
    "category": "Neonatoloji / Obstetrik",
    "previewDefinition": "Rh negatif annenin Rh pozitif fetüse karşı alloimmünizasyon geliştirmesidir.",
    "preAnswerSafeDefinition": "Rh negatif annenin Rh pozitif fetüse karşı alloimmünizasyon geliştirmesidir.",
    "shortDefinition": "Rh negatif annenin Rh pozitif fetüse karşı alloimmünizasyon geliştirmesidir.",
    "detailedExplanation": "Rh negatif annenin Rh pozitif fetüse karşı alloimmünizasyon geliştirmesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Rh immün globulin profilaksisi duyarlanmayı önler; indirekt Coombs taramada kullanılır.",
    "tusPearl": "Rh immün globulin profilaksisi duyarlanmayı önler; indirekt Coombs taramada kullanılır.",
    "differentialPoint": "ABO uygunsuzluğu genellikle daha hafif seyredebilir.",
    "clinicalRelevance": "Rh immün globulin profilaksisi duyarlanmayı önler; indirekt Coombs taramada kullanılır.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics",
      "pediatrics",
      "hematology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Rh uygunsuzluğu",
      "Rh incompatibility",
      "eritroblastozis fetalis",
      "Neonatoloji / Obstetrik"
    ]
  },
  {
    "term": "Sistemik lupus eritematozus",
    "aliases": [
      "SLE",
      "lupus"
    ],
    "category": "Romatoloji",
    "previewDefinition": "Çok sistemli otoimmün hastalık olup immün kompleks aracılı doku hasarı yapabilir.",
    "preAnswerSafeDefinition": "Çok sistemli otoimmün hastalık olup immün kompleks aracılı doku hasarı yapabilir.",
    "shortDefinition": "Çok sistemli otoimmün hastalık olup immün kompleks aracılı doku hasarı yapabilir.",
    "detailedExplanation": "Çok sistemli otoimmün hastalık olup immün kompleks aracılı doku hasarı yapabilir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Malar döküntü, fotosensitivite, artrit, nefrit ve anti-dsDNA/anti-Sm SLE için değerlidir.",
    "tusPearl": "Malar döküntü, fotosensitivite, artrit, nefrit ve anti-dsDNA/anti-Sm SLE için değerlidir.",
    "differentialPoint": "Romatoid artritte simetrik küçük eklem artriti ve anti-CCP daha öne çıkar.",
    "clinicalRelevance": "Malar döküntü, fotosensitivite, artrit, nefrit ve anti-dsDNA/anti-Sm SLE için değerlidir.",
    "mechanism": "",
    "relatedBranches": [
      "rheumatology",
      "nephrology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Sistemik lupus eritematozus",
      "SLE",
      "lupus",
      "Romatoloji"
    ]
  },
  {
    "term": "Anti-dsDNA",
    "aliases": [
      "anti double stranded DNA"
    ],
    "category": "Otoantikor",
    "previewDefinition": "Çift sarmallı DNA’ya karşı gelişen otoantikordur.",
    "preAnswerSafeDefinition": "Çift sarmallı DNA’ya karşı gelişen otoantikordur.",
    "shortDefinition": "Çift sarmallı DNA’ya karşı gelişen otoantikordur.",
    "detailedExplanation": "Çift sarmallı DNA’ya karşı gelişen otoantikordur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "SLE aktivitesi ve lupus nefritiyle ilişkisi yüksek değerli bilgidir.",
    "tusPearl": "SLE aktivitesi ve lupus nefritiyle ilişkisi yüksek değerli bilgidir.",
    "differentialPoint": "Anti-Sm daha spesifiktir ancak aktivite takibinde anti-dsDNA öne çıkar.",
    "clinicalRelevance": "SLE aktivitesi ve lupus nefritiyle ilişkisi yüksek değerli bilgidir.",
    "mechanism": "",
    "relatedBranches": [
      "rheumatology",
      "immunology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Anti-dsDNA",
      "anti double stranded DNA",
      "Otoantikor"
    ]
  },
  {
    "term": "Anti-CCP",
    "aliases": [
      "ACPA"
    ],
    "category": "Otoantikor",
    "previewDefinition": "Siklik sitrülinlenmiş peptide karşı gelişen otoantikordur.",
    "preAnswerSafeDefinition": "Siklik sitrülinlenmiş peptide karşı gelişen otoantikordur.",
    "shortDefinition": "Siklik sitrülinlenmiş peptide karşı gelişen otoantikordur.",
    "detailedExplanation": "Siklik sitrülinlenmiş peptide karşı gelişen otoantikordur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Romatoid artrit için yüksek spesifiteye sahiptir ve eroziv hastalıkla ilişkilidir.",
    "tusPearl": "Romatoid artrit için yüksek spesifiteye sahiptir ve eroziv hastalıkla ilişkilidir.",
    "differentialPoint": "RF daha az spesifik olup farklı hastalıklarda da pozitifleşebilir.",
    "clinicalRelevance": "Romatoid artrit için yüksek spesifiteye sahiptir ve eroziv hastalıkla ilişkilidir.",
    "mechanism": "",
    "relatedBranches": [
      "rheumatology",
      "immunology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Anti-CCP",
      "ACPA",
      "Otoantikor"
    ]
  },
  {
    "term": "Romatoid artrit",
    "aliases": [
      "RA",
      "rheumatoid arthritis"
    ],
    "category": "Romatoloji",
    "previewDefinition": "Simetrik küçük eklem poliartriti ve kronik sinovit ile seyreden otoimmün hastalıktır.",
    "preAnswerSafeDefinition": "Simetrik küçük eklem poliartriti ve kronik sinovit ile seyreden otoimmün hastalıktır.",
    "shortDefinition": "Simetrik küçük eklem poliartriti ve kronik sinovit ile seyreden otoimmün hastalıktır.",
    "detailedExplanation": "Simetrik küçük eklem poliartriti ve kronik sinovit ile seyreden otoimmün hastalıktır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Sabah tutukluğu, MCP/PIP tutulumu ve anti-CCP pozitifliği RA için tipiktir.",
    "tusPearl": "Sabah tutukluğu, MCP/PIP tutulumu ve anti-CCP pozitifliği RA için tipiktir.",
    "differentialPoint": "Osteoartritte DIP tutulumu ve mekanik ağrı daha baskındır.",
    "clinicalRelevance": "Sabah tutukluğu, MCP/PIP tutulumu ve anti-CCP pozitifliği RA için tipiktir.",
    "mechanism": "",
    "relatedBranches": [
      "rheumatology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Romatoid artrit",
      "RA",
      "rheumatoid arthritis",
      "Romatoloji"
    ]
  },
  {
    "term": "Ankilozan spondilit",
    "aliases": [
      "AS",
      "ankylosing spondylitis"
    ],
    "category": "Romatoloji",
    "previewDefinition": "Sakroiliit ve inflamatuvar bel ağrısıyla seyreden seronegatif spondiloartrittir.",
    "preAnswerSafeDefinition": "Sakroiliit ve inflamatuvar bel ağrısıyla seyreden seronegatif spondiloartrittir.",
    "shortDefinition": "Sakroiliit ve inflamatuvar bel ağrısıyla seyreden seronegatif spondiloartrittir.",
    "detailedExplanation": "Sakroiliit ve inflamatuvar bel ağrısıyla seyreden seronegatif spondiloartrittir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Genç erkekte sabah tutukluğu ve egzersizle düzelen bel ağrısı AS düşündürür.",
    "tusPearl": "Genç erkekte sabah tutukluğu ve egzersizle düzelen bel ağrısı AS düşündürür.",
    "differentialPoint": "Mekanik bel ağrısı istirahatle düzelir, egzersizle artabilir.",
    "clinicalRelevance": "Genç erkekte sabah tutukluğu ve egzersizle düzelen bel ağrısı AS düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "rheumatology",
      "orthopedics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Ankilozan spondilit",
      "AS",
      "ankylosing spondylitis",
      "Romatoloji"
    ]
  },
  {
    "term": "Behçet hastalığı",
    "aliases": [
      "Behçet disease"
    ],
    "category": "Romatoloji",
    "previewDefinition": "Tekrarlayan oral/genital ülserler ve üveit ile seyreden sistemik vaskülittir.",
    "preAnswerSafeDefinition": "Tekrarlayan oral/genital ülserler ve üveit ile seyreden sistemik vaskülittir.",
    "shortDefinition": "Tekrarlayan oral/genital ülserler ve üveit ile seyreden sistemik vaskülittir.",
    "detailedExplanation": "Tekrarlayan oral/genital ülserler ve üveit ile seyreden sistemik vaskülittir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Oral aft + genital ülser + üveit Behçet için klasik triaddır.",
    "tusPearl": "Oral aft + genital ülser + üveit Behçet için klasik triaddır.",
    "differentialPoint": "Crohn hastalığında gastrointestinal tutulum ve perianal hastalık daha baskın olabilir.",
    "clinicalRelevance": "Oral aft + genital ülser + üveit Behçet için klasik triaddır.",
    "mechanism": "",
    "relatedBranches": [
      "rheumatology",
      "dermatology",
      "ophthalmology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Behçet hastalığı",
      "Behçet disease",
      "Romatoloji"
    ]
  },
  {
    "term": "Henoch-Schönlein purpurası",
    "aliases": [
      "IgA vasküliti",
      "HSP"
    ],
    "category": "Vaskülit",
    "previewDefinition": "IgA aracılı küçük damar vaskülitidir.",
    "preAnswerSafeDefinition": "IgA aracılı küçük damar vaskülitidir.",
    "shortDefinition": "IgA aracılı küçük damar vaskülitidir.",
    "detailedExplanation": "IgA aracılı küçük damar vaskülitidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Çocukta palpabl purpura + karın ağrısı + artralji + renal bulgu IgA vasküliti düşündürür.",
    "tusPearl": "Çocukta palpabl purpura + karın ağrısı + artralji + renal bulgu IgA vasküliti düşündürür.",
    "differentialPoint": "ITP’de izole trombositopeni vardır; vaskülitik karın/renal bulgular beklenmez.",
    "clinicalRelevance": "Çocukta palpabl purpura + karın ağrısı + artralji + renal bulgu IgA vasküliti düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "pediatrics",
      "rheumatology",
      "nephrology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Henoch-Schönlein purpurası",
      "IgA vasküliti",
      "HSP",
      "Vaskülit"
    ]
  },
  {
    "term": "Dev hücreli arterit",
    "aliases": [
      "temporal arterit",
      "giant cell arteritis"
    ],
    "category": "Vaskülit",
    "previewDefinition": "Yaşlılarda temporal arter tutulumu ve görme kaybı riskiyle seyreden büyük damar vaskülitidir.",
    "preAnswerSafeDefinition": "Yaşlılarda temporal arter tutulumu ve görme kaybı riskiyle seyreden büyük damar vaskülitidir.",
    "shortDefinition": "Yaşlılarda temporal arter tutulumu ve görme kaybı riskiyle seyreden büyük damar vaskülitidir.",
    "detailedExplanation": "Yaşlılarda temporal arter tutulumu ve görme kaybı riskiyle seyreden büyük damar vaskülitidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Yeni baş ağrısı + çene kladikasyonu + yüksek ESR acil steroid gerektirebilir.",
    "tusPearl": "Yeni baş ağrısı + çene kladikasyonu + yüksek ESR acil steroid gerektirebilir.",
    "differentialPoint": "Takayasu arteriti genç kadınlarda nabızsızlıkla daha tipiktir.",
    "clinicalRelevance": "Yeni baş ağrısı + çene kladikasyonu + yüksek ESR acil steroid gerektirebilir.",
    "mechanism": "",
    "relatedBranches": [
      "rheumatology",
      "ophthalmology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Dev hücreli arterit",
      "temporal arterit",
      "giant cell arteritis",
      "Vaskülit"
    ]
  },
  {
    "term": "Takayasu arteriti",
    "aliases": [
      "nabızsız hastalık",
      "Takayasu"
    ],
    "category": "Vaskülit",
    "previewDefinition": "Aort ve büyük dallarını tutan granülomatöz büyük damar vaskülitidir.",
    "preAnswerSafeDefinition": "Aort ve büyük dallarını tutan granülomatöz büyük damar vaskülitidir.",
    "shortDefinition": "Aort ve büyük dallarını tutan granülomatöz büyük damar vaskülitidir.",
    "detailedExplanation": "Aort ve büyük dallarını tutan granülomatöz büyük damar vaskülitidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Genç kadında ekstremite nabız farkı ve kan basıncı farkı Takayasu düşündürür.",
    "tusPearl": "Genç kadında ekstremite nabız farkı ve kan basıncı farkı Takayasu düşündürür.",
    "differentialPoint": "Dev hücreli arterit daha yaşlı hastada temporal arter bulgularıyla seyreder.",
    "clinicalRelevance": "Genç kadında ekstremite nabız farkı ve kan basıncı farkı Takayasu düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "rheumatology",
      "cardiovascular"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Takayasu arteriti",
      "nabızsız hastalık",
      "Takayasu",
      "Vaskülit"
    ]
  },
  {
    "term": "Perioral dermatit",
    "aliases": [
      "periorificial dermatitis"
    ],
    "category": "Dermatoloji",
    "previewDefinition": "Ağız çevresinde papülopüstüler döküntülerle seyreden inflamatuvar dermatozdur.",
    "preAnswerSafeDefinition": "Ağız çevresinde papülopüstüler döküntülerle seyreden inflamatuvar dermatozdur.",
    "shortDefinition": "Ağız çevresinde papülopüstüler döküntülerle seyreden inflamatuvar dermatozdur.",
    "detailedExplanation": "Ağız çevresinde papülopüstüler döküntülerle seyreden inflamatuvar dermatozdur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Topikal steroid kullanımı sonrası perioral papüller perioral dermatit düşündürür.",
    "tusPearl": "Topikal steroid kullanımı sonrası perioral papüller perioral dermatit düşündürür.",
    "differentialPoint": "Akne komedonlarla; rozasea santral yüzde eritem ve flushing ile ayrılır.",
    "clinicalRelevance": "Topikal steroid kullanımı sonrası perioral papüller perioral dermatit düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "dermatology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Perioral dermatit",
      "periorificial dermatitis",
      "Dermatoloji"
    ]
  },
  {
    "term": "Eritema nodozum",
    "aliases": [
      "erythema nodosum"
    ],
    "category": "Dermatoloji",
    "previewDefinition": "Özellikle pretibial bölgede ağrılı subkutan nodüllerle seyreden pannikülittir.",
    "preAnswerSafeDefinition": "Özellikle pretibial bölgede ağrılı subkutan nodüllerle seyreden pannikülittir.",
    "shortDefinition": "Özellikle pretibial bölgede ağrılı subkutan nodüllerle seyreden pannikülittir.",
    "detailedExplanation": "Özellikle pretibial bölgede ağrılı subkutan nodüllerle seyreden pannikülittir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Sarkoidoz, streptokok enfeksiyonu, tüberküloz ve inflamatuvar bağırsak hastalığı ilişkisi TUS değeri taşır.",
    "tusPearl": "Sarkoidoz, streptokok enfeksiyonu, tüberküloz ve inflamatuvar bağırsak hastalığı ilişkisi TUS değeri taşır.",
    "differentialPoint": "Eritema multiforme hedef lezyonlarla ayrılır.",
    "clinicalRelevance": "Sarkoidoz, streptokok enfeksiyonu, tüberküloz ve inflamatuvar bağırsak hastalığı ilişkisi TUS değeri taşır.",
    "mechanism": "",
    "relatedBranches": [
      "dermatology",
      "rheumatology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Eritema nodozum",
      "erythema nodosum",
      "Dermatoloji"
    ]
  },
  {
    "term": "Eritema multiforme",
    "aliases": [
      "target lesion",
      "hedef lezyon"
    ],
    "category": "Dermatoloji",
    "previewDefinition": "Hedef benzeri lezyonlarla seyreden hipersensitivite reaksiyonudur.",
    "preAnswerSafeDefinition": "Hedef benzeri lezyonlarla seyreden hipersensitivite reaksiyonudur.",
    "shortDefinition": "Hedef benzeri lezyonlarla seyreden hipersensitivite reaksiyonudur.",
    "detailedExplanation": "Hedef benzeri lezyonlarla seyreden hipersensitivite reaksiyonudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "HSV ve bazı ilaçlarla ilişkilidir; hedef lezyon ifadesi ayırıcıdır.",
    "tusPearl": "HSV ve bazı ilaçlarla ilişkilidir; hedef lezyon ifadesi ayırıcıdır.",
    "differentialPoint": "Eritema nodozum ağrılı subkutan nodüllerle seyreder.",
    "clinicalRelevance": "HSV ve bazı ilaçlarla ilişkilidir; hedef lezyon ifadesi ayırıcıdır.",
    "mechanism": "",
    "relatedBranches": [
      "dermatology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Eritema multiforme",
      "target lesion",
      "hedef lezyon",
      "Dermatoloji"
    ]
  },
  {
    "term": "Nikolsky bulgusu",
    "aliases": [
      "Nikolsky sign"
    ],
    "category": "Dermatoloji bulgusu",
    "previewDefinition": "Hafif lateral basınçla epidermisin ayrılmasıdır.",
    "preAnswerSafeDefinition": "Hafif lateral basınçla epidermisin ayrılmasıdır.",
    "shortDefinition": "Hafif lateral basınçla epidermisin ayrılmasıdır.",
    "detailedExplanation": "Hafif lateral basınçla epidermisin ayrılmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Pemfigus vulgaris ve toksik epidermal nekrolizis gibi ciddi büllöz hastalıklarda sorulur.",
    "tusPearl": "Pemfigus vulgaris ve toksik epidermal nekrolizis gibi ciddi büllöz hastalıklarda sorulur.",
    "differentialPoint": "Büllöz pemfigoidde Nikolsky genellikle negatiftir.",
    "clinicalRelevance": "Pemfigus vulgaris ve toksik epidermal nekrolizis gibi ciddi büllöz hastalıklarda sorulur.",
    "mechanism": "",
    "relatedBranches": [
      "dermatology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Nikolsky bulgusu",
      "Nikolsky sign",
      "Dermatoloji bulgusu"
    ]
  },
  {
    "term": "Pemfigus vulgaris",
    "aliases": [
      "pemphigus vulgaris"
    ],
    "category": "Dermatoloji",
    "previewDefinition": "Desmogleinlere karşı otoantikorlarla intraepidermal bül oluşturan hastalıktır.",
    "preAnswerSafeDefinition": "Desmogleinlere karşı otoantikorlarla intraepidermal bül oluşturan hastalıktır.",
    "shortDefinition": "Desmogleinlere karşı otoantikorlarla intraepidermal bül oluşturan hastalıktır.",
    "detailedExplanation": "Desmogleinlere karşı otoantikorlarla intraepidermal bül oluşturan hastalıktır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Ağız mukozası tutulumu ve Nikolsky pozitifliği pemfigus vulgaris lehinedir.",
    "tusPearl": "Ağız mukozası tutulumu ve Nikolsky pozitifliği pemfigus vulgaris lehinedir.",
    "differentialPoint": "Büllöz pemfigoid subepidermal gergin büller ve yaşlı hasta ile ayrılır.",
    "clinicalRelevance": "Ağız mukozası tutulumu ve Nikolsky pozitifliği pemfigus vulgaris lehinedir.",
    "mechanism": "",
    "relatedBranches": [
      "dermatology",
      "immunology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Pemfigus vulgaris",
      "pemphigus vulgaris",
      "Dermatoloji"
    ]
  },
  {
    "term": "Büllöz pemfigoid",
    "aliases": [
      "bullous pemphigoid"
    ],
    "category": "Dermatoloji",
    "previewDefinition": "Hemidesmozomlara karşı otoantikorlarla subepidermal gergin büller oluşturan hastalıktır.",
    "preAnswerSafeDefinition": "Hemidesmozomlara karşı otoantikorlarla subepidermal gergin büller oluşturan hastalıktır.",
    "shortDefinition": "Hemidesmozomlara karşı otoantikorlarla subepidermal gergin büller oluşturan hastalıktır.",
    "detailedExplanation": "Hemidesmozomlara karşı otoantikorlarla subepidermal gergin büller oluşturan hastalıktır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Yaşlı hastada gergin bül ve mukozanın genellikle korunması büllöz pemfigoid düşündürür.",
    "tusPearl": "Yaşlı hastada gergin bül ve mukozanın genellikle korunması büllöz pemfigoid düşündürür.",
    "differentialPoint": "Pemfigus vulgariste gevşek büller ve mukozal tutulum daha tipiktir.",
    "clinicalRelevance": "Yaşlı hastada gergin bül ve mukozanın genellikle korunması büllöz pemfigoid düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "dermatology",
      "immunology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Büllöz pemfigoid",
      "bullous pemphigoid",
      "Dermatoloji"
    ]
  },
  {
    "term": "Nalokson",
    "aliases": [
      "naloxone"
    ],
    "category": "Antidot",
    "previewDefinition": "Opioid reseptör antagonistidir ve opioid toksisitesinde solunum depresyonunu geri çevirebilir.",
    "preAnswerSafeDefinition": "Opioid reseptör antagonistidir ve opioid toksisitesinde solunum depresyonunu geri çevirebilir.",
    "shortDefinition": "Opioid reseptör antagonistidir ve opioid toksisitesinde solunum depresyonunu geri çevirebilir.",
    "detailedExplanation": "Opioid reseptör antagonistidir ve opioid toksisitesinde solunum depresyonunu geri çevirebilir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Miyozis + solunum depresyonu + bilinç baskılanması opioid toksidromu; nalokson antidotudur.",
    "tusPearl": "Miyozis + solunum depresyonu + bilinç baskılanması opioid toksidromu; nalokson antidotudur.",
    "differentialPoint": "Benzodiazepin toksisitesinde flumazenil teoriktir ancak nöbet riski nedeniyle dikkat gerektirir.",
    "clinicalRelevance": "Miyozis + solunum depresyonu + bilinç baskılanması opioid toksidromu; nalokson antidotudur.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Nalokson",
      "naloxone",
      "Antidot"
    ]
  },
  {
    "term": "Flumazenil",
    "aliases": [
      "flumazenil"
    ],
    "category": "Antidot",
    "previewDefinition": "Benzodiazepin reseptör antagonistidir.",
    "preAnswerSafeDefinition": "Benzodiazepin reseptör antagonistidir.",
    "shortDefinition": "Benzodiazepin reseptör antagonistidir.",
    "detailedExplanation": "Benzodiazepin reseptör antagonistidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Seçilmiş benzodiazepin toksisitesinde kullanılabilir; kronik kullanıcı veya miks alımda nöbet riski önemlidir.",
    "tusPearl": "Seçilmiş benzodiazepin toksisitesinde kullanılabilir; kronik kullanıcı veya miks alımda nöbet riski önemlidir.",
    "differentialPoint": "Opioid toksisitesinde antidot naloksondur.",
    "clinicalRelevance": "Seçilmiş benzodiazepin toksisitesinde kullanılabilir; kronik kullanıcı veya miks alımda nöbet riski önemlidir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Flumazenil",
      "flumazenil",
      "Antidot"
    ]
  },
  {
    "term": "Atropin",
    "aliases": [
      "atropine"
    ],
    "category": "Antidot / İlaç",
    "previewDefinition": "Muskarinik asetilkolin reseptör antagonistidir.",
    "preAnswerSafeDefinition": "Muskarinik asetilkolin reseptör antagonistidir.",
    "shortDefinition": "Muskarinik asetilkolin reseptör antagonistidir.",
    "detailedExplanation": "Muskarinik asetilkolin reseptör antagonistidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Organofosfat zehirlenmesinde muskarinik bulguları düzeltmek için atropin kullanılır.",
    "tusPearl": "Organofosfat zehirlenmesinde muskarinik bulguları düzeltmek için atropin kullanılır.",
    "differentialPoint": "Pralidoksim asetilkolinesterazı reaktive etmeyi hedefler.",
    "clinicalRelevance": "Organofosfat zehirlenmesinde muskarinik bulguları düzeltmek için atropin kullanılır.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Atropin",
      "atropine",
      "Antidot / İlaç"
    ]
  },
  {
    "term": "Pralidoksim",
    "aliases": [
      "2-PAM",
      "pralidoxime"
    ],
    "category": "Antidot",
    "previewDefinition": "Organofosfat ile inhibe edilen asetilkolinesterazı reaktive etmeye yardımcı oksimdir.",
    "preAnswerSafeDefinition": "Organofosfat ile inhibe edilen asetilkolinesterazı reaktive etmeye yardımcı oksimdir.",
    "shortDefinition": "Organofosfat ile inhibe edilen asetilkolinesterazı reaktive etmeye yardımcı oksimdir.",
    "detailedExplanation": "Organofosfat ile inhibe edilen asetilkolinesterazı reaktive etmeye yardımcı oksimdir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Organofosfat zehirlenmesinde atropinle birlikte erken pralidoksim verilebilir.",
    "tusPearl": "Organofosfat zehirlenmesinde atropinle birlikte erken pralidoksim verilebilir.",
    "differentialPoint": "Atropin muskarinik semptomları kontrol eder; pralidoksim enzim düzeyinde etki eder.",
    "clinicalRelevance": "Organofosfat zehirlenmesinde atropinle birlikte erken pralidoksim verilebilir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Pralidoksim",
      "2-PAM",
      "pralidoxime",
      "Antidot"
    ]
  },
  {
    "term": "N-asetilsistein",
    "aliases": [
      "NAC",
      "acetylcysteine"
    ],
    "category": "Antidot",
    "previewDefinition": "Glutatyon prekürsörü olarak parasetamol toksisitesinde kullanılan antidottur.",
    "preAnswerSafeDefinition": "Glutatyon prekürsörü olarak parasetamol toksisitesinde kullanılan antidottur.",
    "shortDefinition": "Glutatyon prekürsörü olarak parasetamol toksisitesinde kullanılan antidottur.",
    "detailedExplanation": "Glutatyon prekürsörü olarak parasetamol toksisitesinde kullanılan antidottur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Parasetamol alımında zaman-doz nomogramı ve erken NAC tedavisi karaciğer hasarını önler.",
    "tusPearl": "Parasetamol alımında zaman-doz nomogramı ve erken NAC tedavisi karaciğer hasarını önler.",
    "differentialPoint": "Opioid toksisitesinde nalokson kullanılır.",
    "clinicalRelevance": "Parasetamol alımında zaman-doz nomogramı ve erken NAC tedavisi karaciğer hasarını önler.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "emergency-medicine",
      "gastroenterology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "N-asetilsistein",
      "NAC",
      "acetylcysteine",
      "Antidot"
    ]
  },
  {
    "term": "Fomepizol",
    "aliases": [
      "fomepizole"
    ],
    "category": "Antidot",
    "previewDefinition": "Alkol dehidrogenaz inhibitörüdür.",
    "preAnswerSafeDefinition": "Alkol dehidrogenaz inhibitörüdür.",
    "shortDefinition": "Alkol dehidrogenaz inhibitörüdür.",
    "detailedExplanation": "Alkol dehidrogenaz inhibitörüdür. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Metanol ve etilen glikol zehirlenmesinde toksik metabolit oluşumunu azaltır.",
    "tusPearl": "Metanol ve etilen glikol zehirlenmesinde toksik metabolit oluşumunu azaltır.",
    "differentialPoint": "NAC parasetamol; nalokson opioid toksisitesi içindir.",
    "clinicalRelevance": "Metanol ve etilen glikol zehirlenmesinde toksik metabolit oluşumunu azaltır.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Fomepizol",
      "fomepizole",
      "Antidot"
    ]
  },
  {
    "term": "Sodyum bikarbonat",
    "aliases": [
      "NaHCO3",
      "bicarbonate"
    ],
    "category": "Acil tedavi",
    "previewDefinition": "Asidoz veya sodyum kanal blokajı durumlarında kullanılan alkalinizan ajandır.",
    "preAnswerSafeDefinition": "Asidoz veya sodyum kanal blokajı durumlarında kullanılan alkalinizan ajandır.",
    "shortDefinition": "Asidoz veya sodyum kanal blokajı durumlarında kullanılan alkalinizan ajandır.",
    "detailedExplanation": "Asidoz veya sodyum kanal blokajı durumlarında kullanılan alkalinizan ajandır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "TCA toksisitesinde QRS genişlemesi varsa sodyum bikarbonat yüksek verimli tedavi bilgisidir.",
    "tusPearl": "TCA toksisitesinde QRS genişlemesi varsa sodyum bikarbonat yüksek verimli tedavi bilgisidir.",
    "differentialPoint": "Hiperkalemide EKG değişikliği varsa ilk membran stabilizasyonu kalsiyumdur.",
    "clinicalRelevance": "TCA toksisitesinde QRS genişlemesi varsa sodyum bikarbonat yüksek verimli tedavi bilgisidir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "emergency-medicine",
      "biochemistry"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Sodyum bikarbonat",
      "NaHCO3",
      "bicarbonate",
      "Acil tedavi"
    ]
  },
  {
    "term": "İntramüsküler epinefrin",
    "aliases": [
      "IM epinefrin",
      "intramuscular epinephrine",
      "adrenalin"
    ],
    "category": "Acil tedavi",
    "previewDefinition": "Anafilakside ilk basamak olarak kas içine uygulanan adrenerjik agonist tedavidir.",
    "preAnswerSafeDefinition": "Anafilakside ilk basamak olarak kas içine uygulanan adrenerjik agonist tedavidir.",
    "shortDefinition": "Anafilakside ilk basamak olarak kas içine uygulanan adrenerjik agonist tedavidir.",
    "detailedExplanation": "Anafilakside ilk basamak olarak kas içine uygulanan adrenerjik agonist tedavidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Anafilakside ilk ve hayat kurtarıcı tedavi IM epinefrindir; antihistaminik destek tedavisidir.",
    "tusPearl": "Anafilakside ilk ve hayat kurtarıcı tedavi IM epinefrindir; antihistaminik destek tedavisidir.",
    "differentialPoint": "Astım atağında temel tedavi bronkodilatördür; anafilakside sistemik alerjik bulgular belirleyicidir.",
    "clinicalRelevance": "Anafilakside ilk ve hayat kurtarıcı tedavi IM epinefrindir; antihistaminik destek tedavisidir.",
    "mechanism": "",
    "relatedBranches": [
      "emergency-medicine",
      "pharmacology",
      "immunology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "İntramüsküler epinefrin",
      "IM epinefrin",
      "intramuscular epinephrine",
      "adrenalin",
      "Acil tedavi"
    ]
  },
  {
    "term": "Adenozin",
    "aliases": [
      "adenosine"
    ],
    "category": "Antiaritmik",
    "previewDefinition": "AV nod üzerinden geçici ileti blokajı oluşturan kısa etkili ilaçtır.",
    "preAnswerSafeDefinition": "AV nod üzerinden geçici ileti blokajı oluşturan kısa etkili ilaçtır.",
    "shortDefinition": "AV nod üzerinden geçici ileti blokajı oluşturan kısa etkili ilaçtır.",
    "detailedExplanation": "AV nod üzerinden geçici ileti blokajı oluşturan kısa etkili ilaçtır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Düzenli dar QRS taşikardide vagal manevra sonrası adenozin düşünülebilir.",
    "tusPearl": "Düzenli dar QRS taşikardide vagal manevra sonrası adenozin düşünülebilir.",
    "differentialPoint": "Düzensiz geniş kompleks taşikardide adenozin uygun olmayabilir.",
    "clinicalRelevance": "Düzenli dar QRS taşikardide vagal manevra sonrası adenozin düşünülebilir.",
    "mechanism": "",
    "relatedBranches": [
      "cardiovascular",
      "pharmacology",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Adenozin",
      "adenosine",
      "Antiaritmik"
    ]
  },
  {
    "term": "Amiodaron",
    "aliases": [
      "amiodarone"
    ],
    "category": "Antiaritmik",
    "previewDefinition": "Birden çok iyon kanalını etkileyen sınıf III ağırlıklı antiaritmiktir.",
    "preAnswerSafeDefinition": "Birden çok iyon kanalını etkileyen sınıf III ağırlıklı antiaritmiktir.",
    "shortDefinition": "Birden çok iyon kanalını etkileyen sınıf III ağırlıklı antiaritmiktir.",
    "detailedExplanation": "Birden çok iyon kanalını etkileyen sınıf III ağırlıklı antiaritmiktir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Ventriküler aritmilerde kullanımı ve tiroid/akciğer toksisitesi sınav değeri taşır.",
    "tusPearl": "Ventriküler aritmilerde kullanımı ve tiroid/akciğer toksisitesi sınav değeri taşır.",
    "differentialPoint": "Adenozin AV nod bağımlı düzenli dar QRS taşikardilerde kısa etkili seçenektir.",
    "clinicalRelevance": "Ventriküler aritmilerde kullanımı ve tiroid/akciğer toksisitesi sınav değeri taşır.",
    "mechanism": "",
    "relatedBranches": [
      "cardiovascular",
      "pharmacology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Amiodaron",
      "amiodarone",
      "Antiaritmik"
    ]
  },
  {
    "term": "Beta bloker",
    "aliases": [
      "beta blocker",
      "β bloker"
    ],
    "category": "İlaç grubu",
    "previewDefinition": "Beta adrenerjik reseptörleri antagonize eden ilaç grubudur.",
    "preAnswerSafeDefinition": "Beta adrenerjik reseptörleri antagonize eden ilaç grubudur.",
    "shortDefinition": "Beta adrenerjik reseptörleri antagonize eden ilaç grubudur.",
    "detailedExplanation": "Beta adrenerjik reseptörleri antagonize eden ilaç grubudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Kalp yetmezliği, aritmi, hipertansiyon ve tirotoksikoz semptom kontrolünde sık sorulur.",
    "tusPearl": "Kalp yetmezliği, aritmi, hipertansiyon ve tirotoksikoz semptom kontrolünde sık sorulur.",
    "differentialPoint": "Astım/KOAH’da nonselektif beta bloker bronkospazm riskini artırabilir.",
    "clinicalRelevance": "Kalp yetmezliği, aritmi, hipertansiyon ve tirotoksikoz semptom kontrolünde sık sorulur.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "cardiovascular"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Beta bloker",
      "beta blocker",
      "β bloker",
      "İlaç grubu"
    ]
  },
  {
    "term": "ACE inhibitörü",
    "aliases": [
      "ACE inhibitor",
      "ACEİ"
    ],
    "category": "İlaç grubu",
    "previewDefinition": "Anjiyotensin dönüştürücü enzimi inhibe ederek RAAS aktivitesini azaltır.",
    "preAnswerSafeDefinition": "Anjiyotensin dönüştürücü enzimi inhibe ederek RAAS aktivitesini azaltır.",
    "shortDefinition": "Anjiyotensin dönüştürücü enzimi inhibe ederek RAAS aktivitesini azaltır.",
    "detailedExplanation": "Anjiyotensin dönüştürücü enzimi inhibe ederek RAAS aktivitesini azaltır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Kuru öksürük, hiperkalemi, gebelikte kontrendikasyon ve renal arter stenozu uyarıları yüksek verimlidir.",
    "tusPearl": "Kuru öksürük, hiperkalemi, gebelikte kontrendikasyon ve renal arter stenozu uyarıları yüksek verimlidir.",
    "differentialPoint": "ARB bradikinin artışı yapmadığı için öksürük daha az beklenir.",
    "clinicalRelevance": "Kuru öksürük, hiperkalemi, gebelikte kontrendikasyon ve renal arter stenozu uyarıları yüksek verimlidir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "cardiovascular",
      "nephrology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "ACE inhibitörü",
      "ACE inhibitor",
      "ACEİ",
      "İlaç grubu"
    ]
  },
  {
    "term": "ARB",
    "aliases": [
      "anjiyotensin reseptör blokeri",
      "sartan"
    ],
    "category": "İlaç grubu",
    "previewDefinition": "Anjiyotensin II tip 1 reseptörünü bloke eden antihipertansif ilaç grubudur.",
    "preAnswerSafeDefinition": "Anjiyotensin II tip 1 reseptörünü bloke eden antihipertansif ilaç grubudur.",
    "shortDefinition": "Anjiyotensin II tip 1 reseptörünü bloke eden antihipertansif ilaç grubudur.",
    "detailedExplanation": "Anjiyotensin II tip 1 reseptörünü bloke eden antihipertansif ilaç grubudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "ACE inhibitörü öksürüğünde alternatif olabilir; gebelikte kontrendikedir.",
    "tusPearl": "ACE inhibitörü öksürüğünde alternatif olabilir; gebelikte kontrendikedir.",
    "differentialPoint": "ACE inhibitörü bradikinin artışıyla öksürük/anjiyoödem yapabilir.",
    "clinicalRelevance": "ACE inhibitörü öksürüğünde alternatif olabilir; gebelikte kontrendikedir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "cardiovascular",
      "nephrology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "ARB",
      "anjiyotensin reseptör blokeri",
      "sartan",
      "İlaç grubu"
    ]
  },
  {
    "term": "Loop diüretik",
    "aliases": [
      "furosemid",
      "loop diuretic"
    ],
    "category": "İlaç grubu",
    "previewDefinition": "Henle kulpunun çıkan kalın kolunda Na-K-2Cl kotransporterını inhibe eder.",
    "preAnswerSafeDefinition": "Henle kulpunun çıkan kalın kolunda Na-K-2Cl kotransporterını inhibe eder.",
    "shortDefinition": "Henle kulpunun çıkan kalın kolunda Na-K-2Cl kotransporterını inhibe eder.",
    "detailedExplanation": "Henle kulpunun çıkan kalın kolunda Na-K-2Cl kotransporterını inhibe eder. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Hipokalemi, metabolik alkaloz, ototoksisite ve sulfa ilişkisi sınav değeri taşır.",
    "tusPearl": "Hipokalemi, metabolik alkaloz, ototoksisite ve sulfa ilişkisi sınav değeri taşır.",
    "differentialPoint": "Tiyazidler distal tübülde Na-Cl kotransporterını inhibe eder ve hiperkalsemi yapabilir.",
    "clinicalRelevance": "Hipokalemi, metabolik alkaloz, ototoksisite ve sulfa ilişkisi sınav değeri taşır.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "nephrology",
      "cardiovascular"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Loop diüretik",
      "furosemid",
      "loop diuretic",
      "İlaç grubu"
    ]
  },
  {
    "term": "Tiyazid diüretik",
    "aliases": [
      "thiazide",
      "hidroklorotiyazid"
    ],
    "category": "İlaç grubu",
    "previewDefinition": "Distal tübülde Na-Cl kotransporterını inhibe eden diüretik gruptur.",
    "preAnswerSafeDefinition": "Distal tübülde Na-Cl kotransporterını inhibe eden diüretik gruptur.",
    "shortDefinition": "Distal tübülde Na-Cl kotransporterını inhibe eden diüretik gruptur.",
    "detailedExplanation": "Distal tübülde Na-Cl kotransporterını inhibe eden diüretik gruptur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Hipokalemi, hiponatremi, hiperglisemi, hiperürisemi ve hiperkalsemi yapabilir.",
    "tusPearl": "Hipokalemi, hiponatremi, hiperglisemi, hiperürisemi ve hiperkalsemi yapabilir.",
    "differentialPoint": "Loop diüretikler kalsiyum atılımını artırır.",
    "clinicalRelevance": "Hipokalemi, hiponatremi, hiperglisemi, hiperürisemi ve hiperkalsemi yapabilir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "nephrology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Tiyazid diüretik",
      "thiazide",
      "hidroklorotiyazid",
      "İlaç grubu"
    ]
  },
  {
    "term": "Spironolakton",
    "aliases": [
      "spironolactone"
    ],
    "category": "İlaç",
    "previewDefinition": "Aldosteron reseptör antagonisti potasyum tutucu diüretiktir.",
    "preAnswerSafeDefinition": "Aldosteron reseptör antagonisti potasyum tutucu diüretiktir.",
    "shortDefinition": "Aldosteron reseptör antagonisti potasyum tutucu diüretiktir.",
    "detailedExplanation": "Aldosteron reseptör antagonisti potasyum tutucu diüretiktir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Hiperaldosteronizm, kalp yetmezliği ve siroz asitinde kullanılır; hiperkalemi ve jinekomasti yapabilir.",
    "tusPearl": "Hiperaldosteronizm, kalp yetmezliği ve siroz asitinde kullanılır; hiperkalemi ve jinekomasti yapabilir.",
    "differentialPoint": "Eplerenon daha selektif olduğu için endokrin yan etkiler daha azdır.",
    "clinicalRelevance": "Hiperaldosteronizm, kalp yetmezliği ve siroz asitinde kullanılır; hiperkalemi ve jinekomasti yapabilir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "nephrology",
      "cardiovascular"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Spironolakton",
      "spironolactone",
      "İlaç"
    ]
  },
  {
    "term": "Metformin",
    "aliases": [
      "metformin"
    ],
    "category": "İlaç",
    "previewDefinition": "İnsülin duyarlılığını artıran ve hepatik glukoz üretimini azaltan antidiyabetiktir.",
    "preAnswerSafeDefinition": "İnsülin duyarlılığını artıran ve hepatik glukoz üretimini azaltan antidiyabetiktir.",
    "shortDefinition": "İnsülin duyarlılığını artıran ve hepatik glukoz üretimini azaltan antidiyabetiktir.",
    "detailedExplanation": "İnsülin duyarlılığını artıran ve hepatik glukoz üretimini azaltan antidiyabetiktir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Tip 2 diyabette ilk basamak; eGFR düşükse laktik asidoz riski nedeniyle dikkat gerekir.",
    "tusPearl": "Tip 2 diyabette ilk basamak; eGFR düşükse laktik asidoz riski nedeniyle dikkat gerekir.",
    "differentialPoint": "Sülfonilüreler insülin salınımını artırır ve hipoglisemi/kilo alımı yapabilir.",
    "clinicalRelevance": "Tip 2 diyabette ilk basamak; eGFR düşükse laktik asidoz riski nedeniyle dikkat gerekir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "endocrinology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Metformin",
      "metformin",
      "İlaç"
    ]
  },
  {
    "term": "SGLT2 inhibitörü",
    "aliases": [
      "gliflozin",
      "SGLT2 inhibitor"
    ],
    "category": "İlaç grubu",
    "previewDefinition": "Proksimal tübülde glukoz geri emilimini azaltan antidiyabetik ilaç grubudur.",
    "preAnswerSafeDefinition": "Proksimal tübülde glukoz geri emilimini azaltan antidiyabetik ilaç grubudur.",
    "shortDefinition": "Proksimal tübülde glukoz geri emilimini azaltan antidiyabetik ilaç grubudur.",
    "detailedExplanation": "Proksimal tübülde glukoz geri emilimini azaltan antidiyabetik ilaç grubudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Kalp yetmezliği ve böbrek koruyucu etkiler sınavda önemlidir; öglisemik DKA riski unutulmamalıdır.",
    "tusPearl": "Kalp yetmezliği ve böbrek koruyucu etkiler sınavda önemlidir; öglisemik DKA riski unutulmamalıdır.",
    "differentialPoint": "DPP-4 inhibitörleri inkretin yıkımını azaltır.",
    "clinicalRelevance": "Kalp yetmezliği ve böbrek koruyucu etkiler sınavda önemlidir; öglisemik DKA riski unutulmamalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "endocrinology",
      "nephrology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "SGLT2 inhibitörü",
      "gliflozin",
      "SGLT2 inhibitor",
      "İlaç grubu"
    ]
  },
  {
    "term": "GLP-1 reseptör agonisti",
    "aliases": [
      "GLP1 agonisti",
      "semaglutid"
    ],
    "category": "İlaç grubu",
    "previewDefinition": "İnkretin etkisini taklit ederek glukoz bağımlı insülin salınımını artıran ilaç grubudur.",
    "preAnswerSafeDefinition": "İnkretin etkisini taklit ederek glukoz bağımlı insülin salınımını artıran ilaç grubudur.",
    "shortDefinition": "İnkretin etkisini taklit ederek glukoz bağımlı insülin salınımını artıran ilaç grubudur.",
    "detailedExplanation": "İnkretin etkisini taklit ederek glukoz bağımlı insülin salınımını artıran ilaç grubudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Kilo kaybı etkisi ve gastrointestinal yan etkiler yüksek değerli bilgileridir.",
    "tusPearl": "Kilo kaybı etkisi ve gastrointestinal yan etkiler yüksek değerli bilgileridir.",
    "differentialPoint": "SGLT2 inhibitörleri glukozüri üzerinden etki eder.",
    "clinicalRelevance": "Kilo kaybı etkisi ve gastrointestinal yan etkiler yüksek değerli bilgileridir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "endocrinology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "GLP-1 reseptör agonisti",
      "GLP1 agonisti",
      "semaglutid",
      "İlaç grubu"
    ]
  },
  {
    "term": "Warfarin",
    "aliases": [
      "kumadin",
      "coumadin"
    ],
    "category": "Antikoagülan",
    "previewDefinition": "Vitamin K bağımlı pıhtılaşma faktörlerinin gama karboksilasyonunu azaltan oral antikoagülandır.",
    "preAnswerSafeDefinition": "Vitamin K bağımlı pıhtılaşma faktörlerinin gama karboksilasyonunu azaltan oral antikoagülandır.",
    "shortDefinition": "Vitamin K bağımlı pıhtılaşma faktörlerinin gama karboksilasyonunu azaltan oral antikoagülandır.",
    "detailedExplanation": "Vitamin K bağımlı pıhtılaşma faktörlerinin gama karboksilasyonunu azaltan oral antikoagülandır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "INR takibi, teratojenite ve hızlı başlangıçta heparin köprülemesi klasik sınav bilgileridir.",
    "tusPearl": "INR takibi, teratojenite ve hızlı başlangıçta heparin köprülemesi klasik sınav bilgileridir.",
    "differentialPoint": "Heparin antitrombin üzerinden hızlı etki eder.",
    "clinicalRelevance": "INR takibi, teratojenite ve hızlı başlangıçta heparin köprülemesi klasik sınav bilgileridir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "hematology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Warfarin",
      "kumadin",
      "coumadin",
      "Antikoagülan"
    ]
  },
  {
    "term": "Heparin",
    "aliases": [
      "unfractionated heparin",
      "UFH"
    ],
    "category": "Antikoagülan",
    "previewDefinition": "Antitrombin aktivitesini artırarak trombin ve faktör Xa etkisini azaltır.",
    "preAnswerSafeDefinition": "Antitrombin aktivitesini artırarak trombin ve faktör Xa etkisini azaltır.",
    "shortDefinition": "Antitrombin aktivitesini artırarak trombin ve faktör Xa etkisini azaltır.",
    "detailedExplanation": "Antitrombin aktivitesini artırarak trombin ve faktör Xa etkisini azaltır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "aPTT takibi, HIT riski ve protamin sülfat antidotu önemlidir.",
    "tusPearl": "aPTT takibi, HIT riski ve protamin sülfat antidotu önemlidir.",
    "differentialPoint": "Warfarin INR ile takip edilir ve vitamin K antagonizması yapar.",
    "clinicalRelevance": "aPTT takibi, HIT riski ve protamin sülfat antidotu önemlidir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "hematology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Heparin",
      "unfractionated heparin",
      "UFH",
      "Antikoagülan"
    ]
  },
  {
    "term": "Koagülatif nekroz",
    "aliases": [
      "coagulative necrosis"
    ],
    "category": "Patoloji",
    "previewDefinition": "Doku mimarisinin bir süre korunduğu protein denatürasyonu ağırlıklı nekroz tipidir.",
    "preAnswerSafeDefinition": "Doku mimarisinin bir süre korunduğu protein denatürasyonu ağırlıklı nekroz tipidir.",
    "shortDefinition": "Doku mimarisinin bir süre korunduğu protein denatürasyonu ağırlıklı nekroz tipidir.",
    "detailedExplanation": "Doku mimarisinin bir süre korunduğu protein denatürasyonu ağırlıklı nekroz tipidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Kalp, böbrek ve dalak infarktlarında koagülatif nekroz klasik bilgidir.",
    "tusPearl": "Kalp, böbrek ve dalak infarktlarında koagülatif nekroz klasik bilgidir.",
    "differentialPoint": "Beyin infarktında likefaktif nekroz görülür.",
    "clinicalRelevance": "Kalp, böbrek ve dalak infarktlarında koagülatif nekroz klasik bilgidir.",
    "mechanism": "",
    "relatedBranches": [
      "pathology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Koagülatif nekroz",
      "coagulative necrosis",
      "Patoloji"
    ]
  },
  {
    "term": "Likefaktif nekroz",
    "aliases": [
      "liquefactive necrosis"
    ],
    "category": "Patoloji",
    "previewDefinition": "Dokunun sıvılaşarak yıkıldığı nekroz tipidir.",
    "preAnswerSafeDefinition": "Dokunun sıvılaşarak yıkıldığı nekroz tipidir.",
    "shortDefinition": "Dokunun sıvılaşarak yıkıldığı nekroz tipidir.",
    "detailedExplanation": "Dokunun sıvılaşarak yıkıldığı nekroz tipidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Beyin infarktı ve apse likefaktif nekroz için klasik örneklerdir.",
    "tusPearl": "Beyin infarktı ve apse likefaktif nekroz için klasik örneklerdir.",
    "differentialPoint": "Kalp infarktı koagülatif nekrozla ilişkilidir.",
    "clinicalRelevance": "Beyin infarktı ve apse likefaktif nekroz için klasik örneklerdir.",
    "mechanism": "",
    "relatedBranches": [
      "pathology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Likefaktif nekroz",
      "liquefactive necrosis",
      "Patoloji"
    ]
  },
  {
    "term": "Kazeöz nekroz",
    "aliases": [
      "caseous necrosis"
    ],
    "category": "Patoloji",
    "previewDefinition": "Peynirsi görünümlü amorf nekrotik materyal içeren nekroz tipidir.",
    "preAnswerSafeDefinition": "Peynirsi görünümlü amorf nekrotik materyal içeren nekroz tipidir.",
    "shortDefinition": "Peynirsi görünümlü amorf nekrotik materyal içeren nekroz tipidir.",
    "detailedExplanation": "Peynirsi görünümlü amorf nekrotik materyal içeren nekroz tipidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Tüberküloz granülomlarında klasik olarak kazeöz nekroz sorulur.",
    "tusPearl": "Tüberküloz granülomlarında klasik olarak kazeöz nekroz sorulur.",
    "differentialPoint": "Sarkoidoz nonkazeifiye granülomla ayrılır.",
    "clinicalRelevance": "Tüberküloz granülomlarında klasik olarak kazeöz nekroz sorulur.",
    "mechanism": "",
    "relatedBranches": [
      "pathology",
      "infectious-diseases"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Kazeöz nekroz",
      "caseous necrosis",
      "Patoloji"
    ]
  },
  {
    "term": "Fibrinoid nekroz",
    "aliases": [
      "fibrinoid necrosis"
    ],
    "category": "Patoloji",
    "previewDefinition": "Damar duvarında immün kompleks ve fibrin benzeri materyal birikimiyle oluşan nekroz paternidir.",
    "preAnswerSafeDefinition": "Damar duvarında immün kompleks ve fibrin benzeri materyal birikimiyle oluşan nekroz paternidir.",
    "shortDefinition": "Damar duvarında immün kompleks ve fibrin benzeri materyal birikimiyle oluşan nekroz paternidir.",
    "detailedExplanation": "Damar duvarında immün kompleks ve fibrin benzeri materyal birikimiyle oluşan nekroz paternidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Vaskülit ve malign hipertansiyon bağlamında yüksek değerli patoloji terimidir.",
    "tusPearl": "Vaskülit ve malign hipertansiyon bağlamında yüksek değerli patoloji terimidir.",
    "differentialPoint": "Hyalin arteriyoloskleroz diyabet/hipertansiyonla ilişkilidir.",
    "clinicalRelevance": "Vaskülit ve malign hipertansiyon bağlamında yüksek değerli patoloji terimidir.",
    "mechanism": "",
    "relatedBranches": [
      "pathology",
      "rheumatology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Fibrinoid nekroz",
      "fibrinoid necrosis",
      "Patoloji"
    ]
  },
  {
    "term": "Apoptoz",
    "aliases": [
      "apoptosis"
    ],
    "category": "Hücre biyolojisi",
    "previewDefinition": "Programlı hücre ölümü olup inflamasyon oluşturmadan hücre kaybı sağlar.",
    "preAnswerSafeDefinition": "Programlı hücre ölümü olup inflamasyon oluşturmadan hücre kaybı sağlar.",
    "shortDefinition": "Programlı hücre ölümü olup inflamasyon oluşturmadan hücre kaybı sağlar.",
    "detailedExplanation": "Programlı hücre ölümü olup inflamasyon oluşturmadan hücre kaybı sağlar. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Caspase aktivasyonu ve hücre büzüşmesi apoptozun temel özellikleridir.",
    "tusPearl": "Caspase aktivasyonu ve hücre büzüşmesi apoptozun temel özellikleridir.",
    "differentialPoint": "Nekrozda membran bütünlüğü bozulur ve inflamasyon daha belirgindir.",
    "clinicalRelevance": "Caspase aktivasyonu ve hücre büzüşmesi apoptozun temel özellikleridir.",
    "mechanism": "",
    "relatedBranches": [
      "pathology",
      "cell-biology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Apoptoz",
      "apoptosis",
      "Hücre biyolojisi"
    ]
  },
  {
    "term": "Hücresel adaptasyon",
    "aliases": [
      "cellular adaptation"
    ],
    "category": "Patoloji",
    "previewDefinition": "Hücrenin stres veya uyarıya hipertrofi, hiperplazi, atrofi veya metaplazi ile yanıt vermesidir.",
    "preAnswerSafeDefinition": "Hücrenin stres veya uyarıya hipertrofi, hiperplazi, atrofi veya metaplazi ile yanıt vermesidir.",
    "shortDefinition": "Hücrenin stres veya uyarıya hipertrofi, hiperplazi, atrofi veya metaplazi ile yanıt vermesidir.",
    "detailedExplanation": "Hücrenin stres veya uyarıya hipertrofi, hiperplazi, atrofi veya metaplazi ile yanıt vermesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Metaplazi kronik irritasyona adaptasyondur fakat displaziye zemin hazırlayabilir.",
    "tusPearl": "Metaplazi kronik irritasyona adaptasyondur fakat displaziye zemin hazırlayabilir.",
    "differentialPoint": "Displazi prekanseröz atipi içerir; metaplazi olgun hücre tipi değişimidir.",
    "clinicalRelevance": "Metaplazi kronik irritasyona adaptasyondur fakat displaziye zemin hazırlayabilir.",
    "mechanism": "",
    "relatedBranches": [
      "pathology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Hücresel adaptasyon",
      "cellular adaptation",
      "Patoloji"
    ]
  },
  {
    "term": "Metaplazi",
    "aliases": [
      "metaplasia"
    ],
    "category": "Patoloji",
    "previewDefinition": "Bir olgun hücre tipinin başka bir olgun hücre tipine dönüşmesidir.",
    "preAnswerSafeDefinition": "Bir olgun hücre tipinin başka bir olgun hücre tipine dönüşmesidir.",
    "shortDefinition": "Bir olgun hücre tipinin başka bir olgun hücre tipine dönüşmesidir.",
    "detailedExplanation": "Bir olgun hücre tipinin başka bir olgun hücre tipine dönüşmesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Sigara içende bronş epitelinde skuamöz metaplazi klasik örnektir.",
    "tusPearl": "Sigara içende bronş epitelinde skuamöz metaplazi klasik örnektir.",
    "differentialPoint": "Displazi hücresel atipi ve düzensiz proliferasyon anlamına gelir.",
    "clinicalRelevance": "Sigara içende bronş epitelinde skuamöz metaplazi klasik örnektir.",
    "mechanism": "",
    "relatedBranches": [
      "pathology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Metaplazi",
      "metaplasia",
      "Patoloji"
    ]
  },
  {
    "term": "Displazi",
    "aliases": [
      "dysplasia"
    ],
    "category": "Patoloji",
    "previewDefinition": "Hücrelerde atipi, polarite kaybı ve düzensiz maturasyonla seyreden prekanseröz değişimdir.",
    "preAnswerSafeDefinition": "Hücrelerde atipi, polarite kaybı ve düzensiz maturasyonla seyreden prekanseröz değişimdir.",
    "shortDefinition": "Hücrelerde atipi, polarite kaybı ve düzensiz maturasyonla seyreden prekanseröz değişimdir.",
    "detailedExplanation": "Hücrelerde atipi, polarite kaybı ve düzensiz maturasyonla seyreden prekanseröz değişimdir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Servikal intraepitelyal neoplazi gibi prekanseröz lezyonlarda displazi mantığı sorulur.",
    "tusPearl": "Servikal intraepitelyal neoplazi gibi prekanseröz lezyonlarda displazi mantığı sorulur.",
    "differentialPoint": "Metaplazi tek başına atipi demek değildir.",
    "clinicalRelevance": "Servikal intraepitelyal neoplazi gibi prekanseröz lezyonlarda displazi mantığı sorulur.",
    "mechanism": "",
    "relatedBranches": [
      "pathology",
      "oncology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Displazi",
      "dysplasia",
      "Patoloji"
    ]
  },
  {
    "term": "Onkogen",
    "aliases": [
      "oncogene"
    ],
    "category": "Genetik / Onkoloji",
    "previewDefinition": "Aktive olduğunda hücre proliferasyonunu artıran gen sınıfıdır.",
    "preAnswerSafeDefinition": "Aktive olduğunda hücre proliferasyonunu artıran gen sınıfıdır.",
    "shortDefinition": "Aktive olduğunda hücre proliferasyonunu artıran gen sınıfıdır.",
    "detailedExplanation": "Aktive olduğunda hücre proliferasyonunu artıran gen sınıfıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Gain-of-function mutasyonları genellikle dominant hücresel etki gösterir.",
    "tusPearl": "Gain-of-function mutasyonları genellikle dominant hücresel etki gösterir.",
    "differentialPoint": "Tümör baskılayıcı genlerde iki vuruş kaybı mantığı daha tipiktir.",
    "clinicalRelevance": "Gain-of-function mutasyonları genellikle dominant hücresel etki gösterir.",
    "mechanism": "",
    "relatedBranches": [
      "genetics",
      "oncology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Onkogen",
      "oncogene",
      "Genetik / Onkoloji"
    ]
  },
  {
    "term": "Tümör baskılayıcı gen",
    "aliases": [
      "tumor suppressor gene"
    ],
    "category": "Genetik / Onkoloji",
    "previewDefinition": "Hücre proliferasyonunu sınırlayan, DNA onarımı veya apoptozu destekleyen gen grubudur.",
    "preAnswerSafeDefinition": "Hücre proliferasyonunu sınırlayan, DNA onarımı veya apoptozu destekleyen gen grubudur.",
    "shortDefinition": "Hücre proliferasyonunu sınırlayan, DNA onarımı veya apoptozu destekleyen gen grubudur.",
    "detailedExplanation": "Hücre proliferasyonunu sınırlayan, DNA onarımı veya apoptozu destekleyen gen grubudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "RB ve TP53 kaybı tümör baskılayıcı gen mantığının klasik örnekleridir.",
    "tusPearl": "RB ve TP53 kaybı tümör baskılayıcı gen mantığının klasik örnekleridir.",
    "differentialPoint": "Onkogen aktivasyonu genellikle fonksiyon kazanımıdır.",
    "clinicalRelevance": "RB ve TP53 kaybı tümör baskılayıcı gen mantığının klasik örnekleridir.",
    "mechanism": "",
    "relatedBranches": [
      "genetics",
      "oncology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Tümör baskılayıcı gen",
      "tumor suppressor gene",
      "Genetik / Onkoloji"
    ]
  },
  {
    "term": "p53",
    "aliases": [
      "TP53",
      "genomun bekçisi"
    ],
    "category": "Tümör baskılayıcı",
    "previewDefinition": "DNA hasarında hücre döngüsü durması, onarım veya apoptozu yöneten tümör baskılayıcı proteindir.",
    "preAnswerSafeDefinition": "DNA hasarında hücre döngüsü durması, onarım veya apoptozu yöneten tümör baskılayıcı proteindir.",
    "shortDefinition": "DNA hasarında hücre döngüsü durması, onarım veya apoptozu yöneten tümör baskılayıcı proteindir.",
    "detailedExplanation": "DNA hasarında hücre döngüsü durması, onarım veya apoptozu yöneten tümör baskılayıcı proteindir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "“Genomun bekçisi” olarak bilinir; Li-Fraumeni sendromuyla ilişkilidir.",
    "tusPearl": "“Genomun bekçisi” olarak bilinir; Li-Fraumeni sendromuyla ilişkilidir.",
    "differentialPoint": "RB G1/S geçişinde E2F kontrolüyle daha spesifik ilişkilidir.",
    "clinicalRelevance": "“Genomun bekçisi” olarak bilinir; Li-Fraumeni sendromuyla ilişkilidir.",
    "mechanism": "",
    "relatedBranches": [
      "genetics",
      "oncology",
      "cell-biology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "p53",
      "TP53",
      "genomun bekçisi",
      "Tümör baskılayıcı"
    ]
  },
  {
    "term": "RB proteini",
    "aliases": [
      "retinoblastoma protein",
      "RB1"
    ],
    "category": "Tümör baskılayıcı",
    "previewDefinition": "E2F transkripsiyon faktörünü baskılayarak G1/S geçişini kontrol eden proteindir.",
    "preAnswerSafeDefinition": "E2F transkripsiyon faktörünü baskılayarak G1/S geçişini kontrol eden proteindir.",
    "shortDefinition": "E2F transkripsiyon faktörünü baskılayarak G1/S geçişini kontrol eden proteindir.",
    "detailedExplanation": "E2F transkripsiyon faktörünü baskılayarak G1/S geçişini kontrol eden proteindir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Fosforilasyon RB’yi inaktive eder ve E2F serbestleşir.",
    "tusPearl": "Fosforilasyon RB’yi inaktive eder ve E2F serbestleşir.",
    "differentialPoint": "p53 DNA hasar yanıtı ve apoptozla daha güçlü ilişkilidir.",
    "clinicalRelevance": "Fosforilasyon RB’yi inaktive eder ve E2F serbestleşir.",
    "mechanism": "",
    "relatedBranches": [
      "genetics",
      "cell-biology",
      "oncology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "RB proteini",
      "retinoblastoma protein",
      "RB1",
      "Tümör baskılayıcı"
    ]
  },
  {
    "term": "Hardy-Weinberg dengesi",
    "aliases": [
      "Hardy Weinberg"
    ],
    "category": "Genetik",
    "previewDefinition": "Popülasyonda alel ve genotip frekanslarının belirli varsayımlarla sabit kalmasını ifade eder.",
    "preAnswerSafeDefinition": "Popülasyonda alel ve genotip frekanslarının belirli varsayımlarla sabit kalmasını ifade eder.",
    "shortDefinition": "Popülasyonda alel ve genotip frekanslarının belirli varsayımlarla sabit kalmasını ifade eder.",
    "detailedExplanation": "Popülasyonda alel ve genotip frekanslarının belirli varsayımlarla sabit kalmasını ifade eder. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Taşıyıcılık ve hastalık frekansı hesaplarında p² + 2pq + q² mantığı sorulur.",
    "tusPearl": "Taşıyıcılık ve hastalık frekansı hesaplarında p² + 2pq + q² mantığı sorulur.",
    "differentialPoint": "X’e bağlı hastalıklarda hesap yaklaşımı farklılaşabilir.",
    "clinicalRelevance": "Taşıyıcılık ve hastalık frekansı hesaplarında p² + 2pq + q² mantığı sorulur.",
    "mechanism": "",
    "relatedBranches": [
      "genetics",
      "biostatistics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Hardy-Weinberg dengesi",
      "Hardy Weinberg",
      "Genetik"
    ]
  },
  {
    "term": "Otozomal dominant kalıtım",
    "aliases": [
      "AD kalıtım",
      "autosomal dominant"
    ],
    "category": "Genetik",
    "previewDefinition": "Tek mutant alelin hastalık fenotipi oluşturabildiği kalıtım providerLabelidir.",
    "preAnswerSafeDefinition": "Tek mutant alelin hastalık fenotipi oluşturabildiği kalıtım providerLabelidir.",
    "shortDefinition": "Tek mutant alelin hastalık fenotipi oluşturabildiği kalıtım providerLabelidir.",
    "detailedExplanation": "Tek mutant alelin hastalık fenotipi oluşturabildiği kalıtım providerLabelidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Dikey geçiş ve her kuşakta etkilenmiş birey görülmesi AD kalıtım ipucudur.",
    "tusPearl": "Dikey geçiş ve her kuşakta etkilenmiş birey görülmesi AD kalıtım ipucudur.",
    "differentialPoint": "Otozomal resesifte ebeveynler genellikle taşıyıcıdır ve kardeşlerde kümelenme olabilir.",
    "clinicalRelevance": "Dikey geçiş ve her kuşakta etkilenmiş birey görülmesi AD kalıtım ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "genetics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Otozomal dominant kalıtım",
      "AD kalıtım",
      "autosomal dominant",
      "Genetik"
    ]
  },
  {
    "term": "Otozomal resesif kalıtım",
    "aliases": [
      "AR kalıtım",
      "autosomal recessive"
    ],
    "category": "Genetik",
    "previewDefinition": "Hastalık için iki mutant alelin gerektiği kalıtım providerLabelidir.",
    "preAnswerSafeDefinition": "Hastalık için iki mutant alelin gerektiği kalıtım providerLabelidir.",
    "shortDefinition": "Hastalık için iki mutant alelin gerektiği kalıtım providerLabelidir.",
    "detailedExplanation": "Hastalık için iki mutant alelin gerektiği kalıtım providerLabelidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Akraba evliliği ve sağlıklı taşıyıcı ebeveynlerden hasta çocuk AR kalıtımı destekler.",
    "tusPearl": "Akraba evliliği ve sağlıklı taşıyıcı ebeveynlerden hasta çocuk AR kalıtımı destekler.",
    "differentialPoint": "Otozomal dominantta dikey geçiş daha tipiktir.",
    "clinicalRelevance": "Akraba evliliği ve sağlıklı taşıyıcı ebeveynlerden hasta çocuk AR kalıtımı destekler.",
    "mechanism": "",
    "relatedBranches": [
      "genetics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Otozomal resesif kalıtım",
      "AR kalıtım",
      "autosomal recessive",
      "Genetik"
    ]
  },
  {
    "term": "X’e bağlı resesif kalıtım",
    "aliases": [
      "X-linked recessive",
      "X bağlı resesif"
    ],
    "category": "Genetik",
    "previewDefinition": "Mutasyonun X kromozomunda olduğu ve erkeklerde daha sık fenotip verdiği kalıtım providerLabelidir.",
    "preAnswerSafeDefinition": "Mutasyonun X kromozomunda olduğu ve erkeklerde daha sık fenotip verdiği kalıtım providerLabelidir.",
    "shortDefinition": "Mutasyonun X kromozomunda olduğu ve erkeklerde daha sık fenotip verdiği kalıtım providerLabelidir.",
    "detailedExplanation": "Mutasyonun X kromozomunda olduğu ve erkeklerde daha sık fenotip verdiği kalıtım providerLabelidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Hasta erkek, taşıyıcı anne ve erkekten erkeğe geçiş olmaması temel ipuçlarıdır.",
    "tusPearl": "Hasta erkek, taşıyıcı anne ve erkekten erkeğe geçiş olmaması temel ipuçlarıdır.",
    "differentialPoint": "Otozomal kalıtımda erkekten erkeğe geçiş görülebilir.",
    "clinicalRelevance": "Hasta erkek, taşıyıcı anne ve erkekten erkeğe geçiş olmaması temel ipuçlarıdır.",
    "mechanism": "",
    "relatedBranches": [
      "genetics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "X’e bağlı resesif kalıtım",
      "X-linked recessive",
      "X bağlı resesif",
      "Genetik"
    ]
  },
  {
    "term": "Mitokondriyal kalıtım",
    "aliases": [
      "maternal inheritance"
    ],
    "category": "Genetik",
    "previewDefinition": "Mitokondri DNA’sındaki mutasyonların anneden tüm çocuklara aktarılmasıdır.",
    "preAnswerSafeDefinition": "Mitokondri DNA’sındaki mutasyonların anneden tüm çocuklara aktarılmasıdır.",
    "shortDefinition": "Mitokondri DNA’sındaki mutasyonların anneden tüm çocuklara aktarılmasıdır.",
    "detailedExplanation": "Mitokondri DNA’sındaki mutasyonların anneden tüm çocuklara aktarılmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Etkilenmiş anne tüm çocuklarına mutasyonu aktarabilir; baba aktaramaz.",
    "tusPearl": "Etkilenmiş anne tüm çocuklarına mutasyonu aktarabilir; baba aktaramaz.",
    "differentialPoint": "X’e bağlı kalıtımda cinsiyet paterni farklıdır.",
    "clinicalRelevance": "Etkilenmiş anne tüm çocuklarına mutasyonu aktarabilir; baba aktaramaz.",
    "mechanism": "",
    "relatedBranches": [
      "genetics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Mitokondriyal kalıtım",
      "maternal inheritance",
      "Genetik"
    ]
  },
  {
    "term": "Üre döngüsü bozukluğu",
    "aliases": [
      "urea cycle disorder"
    ],
    "category": "Biyokimya",
    "previewDefinition": "Amonyak detoksifikasyonunun bozulduğu kalıtsal metabolizma hastalıkları grubudur.",
    "preAnswerSafeDefinition": "Amonyak detoksifikasyonunun bozulduğu kalıtsal metabolizma hastalıkları grubudur.",
    "shortDefinition": "Amonyak detoksifikasyonunun bozulduğu kalıtsal metabolizma hastalıkları grubudur.",
    "detailedExplanation": "Amonyak detoksifikasyonunun bozulduğu kalıtsal metabolizma hastalıkları grubudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Hiperamonyemi + respiratuvar alkaloz özellikle üre döngüsü bozukluğu için yüksek değerli ipucudur.",
    "tusPearl": "Hiperamonyemi + respiratuvar alkaloz özellikle üre döngüsü bozukluğu için yüksek değerli ipucudur.",
    "differentialPoint": "Organik asidemiler genellikle metabolik asidoz ve ketozla seyreder.",
    "clinicalRelevance": "Hiperamonyemi + respiratuvar alkaloz özellikle üre döngüsü bozukluğu için yüksek değerli ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "pediatrics",
      "genetics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Üre döngüsü bozukluğu",
      "urea cycle disorder",
      "Biyokimya"
    ]
  },
  {
    "term": "Ornitin transkarbamoilaz eksikliği",
    "aliases": [
      "OTC deficiency"
    ],
    "category": "Biyokimya",
    "previewDefinition": "X’e bağlı üre döngüsü bozukluğu olup karbamoil fosfat birikimiyle orotik asit artabilir.",
    "preAnswerSafeDefinition": "X’e bağlı üre döngüsü bozukluğu olup karbamoil fosfat birikimiyle orotik asit artabilir.",
    "shortDefinition": "X’e bağlı üre döngüsü bozukluğu olup karbamoil fosfat birikimiyle orotik asit artabilir.",
    "detailedExplanation": "X’e bağlı üre döngüsü bozukluğu olup karbamoil fosfat birikimiyle orotik asit artabilir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Hiperamonyemi + orotik asit artışı + BUN düşüklüğü OTC eksikliğini düşündürür.",
    "tusPearl": "Hiperamonyemi + orotik asit artışı + BUN düşüklüğü OTC eksikliğini düşündürür.",
    "differentialPoint": "Orotik asidüride hiperamonyemi beklenmez.",
    "clinicalRelevance": "Hiperamonyemi + orotik asit artışı + BUN düşüklüğü OTC eksikliğini düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "genetics",
      "pediatrics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Ornitin transkarbamoilaz eksikliği",
      "OTC deficiency",
      "Biyokimya"
    ]
  },
  {
    "term": "Fenilketonüri",
    "aliases": [
      "PKU",
      "phenylketonuria"
    ],
    "category": "Metabolik hastalık",
    "previewDefinition": "Fenilalanin hidroksilaz eksikliği veya BH4 kusuruna bağlı fenilalanin birikimidir.",
    "preAnswerSafeDefinition": "Fenilalanin hidroksilaz eksikliği veya BH4 kusuruna bağlı fenilalanin birikimidir.",
    "shortDefinition": "Fenilalanin hidroksilaz eksikliği veya BH4 kusuruna bağlı fenilalanin birikimidir.",
    "detailedExplanation": "Fenilalanin hidroksilaz eksikliği veya BH4 kusuruna bağlı fenilalanin birikimidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Tedavisiz bebekte açık ten, küf kokusu ve nörogelişim geriliği PKU düşündürür.",
    "tusPearl": "Tedavisiz bebekte açık ten, küf kokusu ve nörogelişim geriliği PKU düşündürür.",
    "differentialPoint": "MSUD’da akçaağaç şurubu kokusu ve dallı zincirli aminoasit metabolizması bozukluğu vardır.",
    "clinicalRelevance": "Tedavisiz bebekte açık ten, küf kokusu ve nörogelişim geriliği PKU düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "pediatrics",
      "genetics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Fenilketonüri",
      "PKU",
      "phenylketonuria",
      "Metabolik hastalık"
    ]
  },
  {
    "term": "Maple syrup urine disease",
    "aliases": [
      "MSUD",
      "akçaağaç şurubu idrar hastalığı"
    ],
    "category": "Metabolik hastalık",
    "previewDefinition": "Dallı zincirli alfa-ketoasit dehidrogenaz eksikliğine bağlı lösin/izolösin/valin metabolizma bozukluğudur.",
    "preAnswerSafeDefinition": "Dallı zincirli alfa-ketoasit dehidrogenaz eksikliğine bağlı lösin/izolösin/valin metabolizma bozukluğudur.",
    "shortDefinition": "Dallı zincirli alfa-ketoasit dehidrogenaz eksikliğine bağlı lösin/izolösin/valin metabolizma bozukluğudur.",
    "detailedExplanation": "Dallı zincirli alfa-ketoasit dehidrogenaz eksikliğine bağlı lösin/izolösin/valin metabolizma bozukluğudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Yenidoğanda beslenme bozukluğu, letarji ve akçaağaç şurubu kokusu MSUD için klasik ipucudur.",
    "tusPearl": "Yenidoğanda beslenme bozukluğu, letarji ve akçaağaç şurubu kokusu MSUD için klasik ipucudur.",
    "differentialPoint": "PKU’da fenilalanin metabolizması ve küf kokusu öne çıkar.",
    "clinicalRelevance": "Yenidoğanda beslenme bozukluğu, letarji ve akçaağaç şurubu kokusu MSUD için klasik ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "pediatrics",
      "genetics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Maple syrup urine disease",
      "MSUD",
      "akçaağaç şurubu idrar hastalığı",
      "Metabolik hastalık"
    ]
  },
  {
    "term": "Galaktozemi",
    "aliases": [
      "classic galactosemia",
      "GALT deficiency"
    ],
    "category": "Metabolik hastalık",
    "previewDefinition": "Galaktoz metabolizması enzim kusuruna bağlı karaciğer, katarakt ve sepsis riskiyle seyreden hastalıktır.",
    "preAnswerSafeDefinition": "Galaktoz metabolizması enzim kusuruna bağlı karaciğer, katarakt ve sepsis riskiyle seyreden hastalıktır.",
    "shortDefinition": "Galaktoz metabolizması enzim kusuruna bağlı karaciğer, katarakt ve sepsis riskiyle seyreden hastalıktır.",
    "detailedExplanation": "Galaktoz metabolizması enzim kusuruna bağlı karaciğer, katarakt ve sepsis riskiyle seyreden hastalıktır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Süt alımı sonrası kusma, sarılık, katarakt ve E. coli sepsisi galaktozemiyi düşündürür.",
    "tusPearl": "Süt alımı sonrası kusma, sarılık, katarakt ve E. coli sepsisi galaktozemiyi düşündürür.",
    "differentialPoint": "Herediter fruktoz intoleransı fruktoz/sükroz alımıyla belirginleşir.",
    "clinicalRelevance": "Süt alımı sonrası kusma, sarılık, katarakt ve E. coli sepsisi galaktozemiyi düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "pediatrics",
      "genetics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Galaktozemi",
      "classic galactosemia",
      "GALT deficiency",
      "Metabolik hastalık"
    ]
  },
  {
    "term": "Herediter fruktoz intoleransı",
    "aliases": [
      "aldolaz B eksikliği",
      "HFI"
    ],
    "category": "Metabolik hastalık",
    "previewDefinition": "Aldolaz B eksikliğine bağlı fruktoz-1-fosfat birikimiyle gelişen hastalıktır.",
    "preAnswerSafeDefinition": "Aldolaz B eksikliğine bağlı fruktoz-1-fosfat birikimiyle gelişen hastalıktır.",
    "shortDefinition": "Aldolaz B eksikliğine bağlı fruktoz-1-fosfat birikimiyle gelişen hastalıktır.",
    "detailedExplanation": "Aldolaz B eksikliğine bağlı fruktoz-1-fosfat birikimiyle gelişen hastalıktır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Meyve/mama sonrası hipoglisemi, kusma ve karaciğer bulguları HFI düşündürür.",
    "tusPearl": "Meyve/mama sonrası hipoglisemi, kusma ve karaciğer bulguları HFI düşündürür.",
    "differentialPoint": "Esansiyel fruktozüride benign fruktokinaz eksikliği vardır.",
    "clinicalRelevance": "Meyve/mama sonrası hipoglisemi, kusma ve karaciğer bulguları HFI düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "pediatrics",
      "genetics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Herediter fruktoz intoleransı",
      "aldolaz B eksikliği",
      "HFI",
      "Metabolik hastalık"
    ]
  },
  {
    "term": "Lizozomal depo hastalığı",
    "aliases": [
      "lysosomal storage disease"
    ],
    "category": "Metabolik hastalık",
    "previewDefinition": "Lizozomal enzim eksiklikleriyle substrat birikimi yapan hastalık grubudur.",
    "preAnswerSafeDefinition": "Lizozomal enzim eksiklikleriyle substrat birikimi yapan hastalık grubudur.",
    "shortDefinition": "Lizozomal enzim eksiklikleriyle substrat birikimi yapan hastalık grubudur.",
    "detailedExplanation": "Lizozomal enzim eksiklikleriyle substrat birikimi yapan hastalık grubudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Hepatosplenomegali, nörolojik gerilik ve kaba yüz görünümü depo hastalığı düşündürür.",
    "tusPearl": "Hepatosplenomegali, nörolojik gerilik ve kaba yüz görünümü depo hastalığı düşündürür.",
    "differentialPoint": "Peroksizomal hastalıklar farklı organel biyogenezi kusurlarıyla seyreder.",
    "clinicalRelevance": "Hepatosplenomegali, nörolojik gerilik ve kaba yüz görünümü depo hastalığı düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "genetics",
      "pediatrics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Lizozomal depo hastalığı",
      "lysosomal storage disease",
      "Metabolik hastalık"
    ]
  },
  {
    "term": "Gaucher hastalığı",
    "aliases": [
      "Gaucher disease"
    ],
    "category": "Lizozomal depo",
    "previewDefinition": "Glukoserebrozidaz eksikliğine bağlı makrofajlarda substrat birikimidir.",
    "preAnswerSafeDefinition": "Glukoserebrozidaz eksikliğine bağlı makrofajlarda substrat birikimidir.",
    "shortDefinition": "Glukoserebrozidaz eksikliğine bağlı makrofajlarda substrat birikimidir.",
    "detailedExplanation": "Glukoserebrozidaz eksikliğine bağlı makrofajlarda substrat birikimidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Hepatosplenomegali, kemik ağrısı ve buruşuk kağıt görünümlü makrofajlar Gaucher düşündürür.",
    "tusPearl": "Hepatosplenomegali, kemik ağrısı ve buruşuk kağıt görünümlü makrofajlar Gaucher düşündürür.",
    "differentialPoint": "Niemann-Pick’te sfingomiyelinaz eksikliği ve köpüksü hücreler öne çıkar.",
    "clinicalRelevance": "Hepatosplenomegali, kemik ağrısı ve buruşuk kağıt görünümlü makrofajlar Gaucher düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "genetics",
      "hematology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Gaucher hastalığı",
      "Gaucher disease",
      "Lizozomal depo"
    ]
  },
  {
    "term": "Tay-Sachs hastalığı",
    "aliases": [
      "Tay Sachs",
      "Hexosaminidase A"
    ],
    "category": "Lizozomal depo",
    "previewDefinition": "Hexosaminidaz A eksikliğine bağlı GM2 gangliozid birikimidir.",
    "preAnswerSafeDefinition": "Hexosaminidaz A eksikliğine bağlı GM2 gangliozid birikimidir.",
    "shortDefinition": "Hexosaminidaz A eksikliğine bağlı GM2 gangliozid birikimidir.",
    "detailedExplanation": "Hexosaminidaz A eksikliğine bağlı GM2 gangliozid birikimidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Nörodejenerasyon + cherry-red spot + hepatosplenomegali olmaması Tay-Sachs için tipiktir.",
    "tusPearl": "Nörodejenerasyon + cherry-red spot + hepatosplenomegali olmaması Tay-Sachs için tipiktir.",
    "differentialPoint": "Niemann-Pick’te hepatosplenomegali beklenebilir.",
    "clinicalRelevance": "Nörodejenerasyon + cherry-red spot + hepatosplenomegali olmaması Tay-Sachs için tipiktir.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "genetics",
      "pediatrics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Tay-Sachs hastalığı",
      "Tay Sachs",
      "Hexosaminidase A",
      "Lizozomal depo"
    ]
  },
  {
    "term": "Niemann-Pick hastalığı",
    "aliases": [
      "Niemann Pick"
    ],
    "category": "Lizozomal depo",
    "previewDefinition": "Sfingomiyelinaz eksikliği veya kolesterol taşınma kusuruyla seyreden depo hastalığıdır.",
    "preAnswerSafeDefinition": "Sfingomiyelinaz eksikliği veya kolesterol taşınma kusuruyla seyreden depo hastalığıdır.",
    "shortDefinition": "Sfingomiyelinaz eksikliği veya kolesterol taşınma kusuruyla seyreden depo hastalığıdır.",
    "detailedExplanation": "Sfingomiyelinaz eksikliği veya kolesterol taşınma kusuruyla seyreden depo hastalığıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Hepatosplenomegali + nörolojik gerilik + cherry-red spot Niemann-Pick düşündürebilir.",
    "tusPearl": "Hepatosplenomegali + nörolojik gerilik + cherry-red spot Niemann-Pick düşündürebilir.",
    "differentialPoint": "Tay-Sachs’ta hepatosplenomegali tipik değildir.",
    "clinicalRelevance": "Hepatosplenomegali + nörolojik gerilik + cherry-red spot Niemann-Pick düşündürebilir.",
    "mechanism": "",
    "relatedBranches": [
      "biochemistry",
      "genetics",
      "pediatrics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Niemann-Pick hastalığı",
      "Niemann Pick",
      "Lizozomal depo"
    ]
  },
  {
    "term": "Akut apandisit",
    "aliases": [
      "appendicitis"
    ],
    "category": "Genel cerrahi",
    "previewDefinition": "Apendiks lümen obstrüksiyonu sonrası inflamasyonla gelişen akut karın nedenidir.",
    "preAnswerSafeDefinition": "Apendiks lümen obstrüksiyonu sonrası inflamasyonla gelişen akut karın nedenidir.",
    "shortDefinition": "Apendiks lümen obstrüksiyonu sonrası inflamasyonla gelişen akut karın nedenidir.",
    "detailedExplanation": "Apendiks lümen obstrüksiyonu sonrası inflamasyonla gelişen akut karın nedenidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Periumblikal ağrının sağ alt kadrana göçü ve McBurney hassasiyeti klasik ipucudur.",
    "tusPearl": "Periumblikal ağrının sağ alt kadrana göçü ve McBurney hassasiyeti klasik ipucudur.",
    "differentialPoint": "Gastroenteritte yaygın kramp ve ishal daha baskın olabilir.",
    "clinicalRelevance": "Periumblikal ağrının sağ alt kadrana göçü ve McBurney hassasiyeti klasik ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "surgery",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Akut apandisit",
      "appendicitis",
      "Genel cerrahi"
    ]
  },
  {
    "term": "McBurney noktası",
    "aliases": [
      "McBurney point"
    ],
    "category": "Fizik muayene bulgusu",
    "previewDefinition": "Spina iliaca anterior superior ile umblikus hattının lateral üçte birinde yer alan hassasiyet noktasıdır.",
    "preAnswerSafeDefinition": "Spina iliaca anterior superior ile umblikus hattının lateral üçte birinde yer alan hassasiyet noktasıdır.",
    "shortDefinition": "Spina iliaca anterior superior ile umblikus hattının lateral üçte birinde yer alan hassasiyet noktasıdır.",
    "detailedExplanation": "Spina iliaca anterior superior ile umblikus hattının lateral üçte birinde yer alan hassasiyet noktasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Akut apandisit fizik muayenesinde klasik lokalizasyon bilgisidir.",
    "tusPearl": "Akut apandisit fizik muayenesinde klasik lokalizasyon bilgisidir.",
    "differentialPoint": "Murphy bulgusu sağ üst kadran/kolesistit ile ilişkilidir.",
    "clinicalRelevance": "Akut apandisit fizik muayenesinde klasik lokalizasyon bilgisidir.",
    "mechanism": "",
    "relatedBranches": [
      "surgery"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "McBurney noktası",
      "McBurney point",
      "Fizik muayene bulgusu"
    ]
  },
  {
    "term": "Rovsing bulgusu",
    "aliases": [
      "Rovsing sign"
    ],
    "category": "Fizik muayene bulgusu",
    "previewDefinition": "Sol alt kadrana basıyla sağ alt kadranda ağrı oluşmasıdır.",
    "preAnswerSafeDefinition": "Sol alt kadrana basıyla sağ alt kadranda ağrı oluşmasıdır.",
    "shortDefinition": "Sol alt kadrana basıyla sağ alt kadranda ağrı oluşmasıdır.",
    "detailedExplanation": "Sol alt kadrana basıyla sağ alt kadranda ağrı oluşmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Peritoneal irritasyon ve apandisit bağlamında sorulabilir.",
    "tusPearl": "Peritoneal irritasyon ve apandisit bağlamında sorulabilir.",
    "differentialPoint": "Murphy bulgusu kolesistit için daha spesifiktir.",
    "clinicalRelevance": "Peritoneal irritasyon ve apandisit bağlamında sorulabilir.",
    "mechanism": "",
    "relatedBranches": [
      "surgery"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Rovsing bulgusu",
      "Rovsing sign",
      "Fizik muayene bulgusu"
    ]
  },
  {
    "term": "İleus",
    "aliases": [
      "intestinal obstruction",
      "bağırsak tıkanıklığı"
    ],
    "category": "Genel cerrahi",
    "previewDefinition": "Bağırsak pasajının mekanik veya fonksiyonel olarak durmasıdır.",
    "preAnswerSafeDefinition": "Bağırsak pasajının mekanik veya fonksiyonel olarak durmasıdır.",
    "shortDefinition": "Bağırsak pasajının mekanik veya fonksiyonel olarak durmasıdır.",
    "detailedExplanation": "Bağırsak pasajının mekanik veya fonksiyonel olarak durmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Karın distansiyonu, kusma, gaz-gaita çıkaramama ve hava-sıvı seviyeleri ile düşünülür.",
    "tusPearl": "Karın distansiyonu, kusma, gaz-gaita çıkaramama ve hava-sıvı seviyeleri ile düşünülür.",
    "differentialPoint": "Paralitik ileusta mekanik geçiş noktası beklenmez.",
    "clinicalRelevance": "Karın distansiyonu, kusma, gaz-gaita çıkaramama ve hava-sıvı seviyeleri ile düşünülür.",
    "mechanism": "",
    "relatedBranches": [
      "surgery",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "İleus",
      "intestinal obstruction",
      "bağırsak tıkanıklığı",
      "Genel cerrahi"
    ]
  },
  {
    "term": "Volvulus",
    "aliases": [
      "volvulus"
    ],
    "category": "Genel cerrahi",
    "previewDefinition": "Bağırsak segmentinin mezenteri etrafında dönerek obstrüksiyon ve iskemi riski oluşturmasıdır.",
    "preAnswerSafeDefinition": "Bağırsak segmentinin mezenteri etrafında dönerek obstrüksiyon ve iskemi riski oluşturmasıdır.",
    "shortDefinition": "Bağırsak segmentinin mezenteri etrafında dönerek obstrüksiyon ve iskemi riski oluşturmasıdır.",
    "detailedExplanation": "Bağırsak segmentinin mezenteri etrafında dönerek obstrüksiyon ve iskemi riski oluşturmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Sigmoid volvulusta coffee-bean sign klasik radyolojik ipucudur.",
    "tusPearl": "Sigmoid volvulusta coffee-bean sign klasik radyolojik ipucudur.",
    "differentialPoint": "İnvajinasyon çocukta hedef işareti ve çilek jölesi dışkıyla daha tipiktir.",
    "clinicalRelevance": "Sigmoid volvulusta coffee-bean sign klasik radyolojik ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "surgery",
      "radiology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Volvulus",
      "volvulus",
      "Genel cerrahi"
    ]
  },
  {
    "term": "Akut mezenter iskemi",
    "aliases": [
      "mesenteric ischemia"
    ],
    "category": "Vasküler cerrahi",
    "previewDefinition": "Mezenterik kan akımının azalmasına bağlı bağırsak iskemisidir.",
    "preAnswerSafeDefinition": "Mezenterik kan akımının azalmasına bağlı bağırsak iskemisidir.",
    "shortDefinition": "Mezenterik kan akımının azalmasına bağlı bağırsak iskemisidir.",
    "detailedExplanation": "Mezenterik kan akımının azalmasına bağlı bağırsak iskemisidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Muayeneye göre çok şiddetli karın ağrısı ve AF öyküsü embolik mezenter iskemi düşündürür.",
    "tusPearl": "Muayeneye göre çok şiddetli karın ağrısı ve AF öyküsü embolik mezenter iskemi düşündürür.",
    "differentialPoint": "Gastroenteritte ağrı genellikle muayene ile daha uyumludur.",
    "clinicalRelevance": "Muayeneye göre çok şiddetli karın ağrısı ve AF öyküsü embolik mezenter iskemi düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "surgery",
      "cardiovascular",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Akut mezenter iskemi",
      "mesenteric ischemia",
      "Vasküler cerrahi"
    ]
  },
  {
    "term": "Kompartman sendromu",
    "aliases": [
      "compartment syndrome"
    ],
    "category": "Ortopedik acil",
    "previewDefinition": "Kapalı kas kompartmanında basınç artışıyla perfüzyonun bozulmasıdır.",
    "preAnswerSafeDefinition": "Kapalı kas kompartmanında basınç artışıyla perfüzyonun bozulmasıdır.",
    "shortDefinition": "Kapalı kas kompartmanında basınç artışıyla perfüzyonun bozulmasıdır.",
    "detailedExplanation": "Kapalı kas kompartmanında basınç artışıyla perfüzyonun bozulmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Pasif germe ile şiddetli ağrı erken ve kritik bulgudur; fasiyotomi gerekebilir.",
    "tusPearl": "Pasif germe ile şiddetli ağrı erken ve kritik bulgudur; fasiyotomi gerekebilir.",
    "differentialPoint": "Geç bulgu olan nabız kaybını beklemek tehlikelidir.",
    "clinicalRelevance": "Pasif germe ile şiddetli ağrı erken ve kritik bulgudur; fasiyotomi gerekebilir.",
    "mechanism": "",
    "relatedBranches": [
      "orthopedics",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Kompartman sendromu",
      "compartment syndrome",
      "Ortopedik acil"
    ]
  },
  {
    "term": "Yağ embolisi sendromu",
    "aliases": [
      "fat embolism syndrome"
    ],
    "category": "Ortopedi / Pulmonoloji",
    "previewDefinition": "Uzun kemik kırığı sonrası yağ globüllerine bağlı solunum, nörolojik ve peteşiyal bulgularla seyreder.",
    "preAnswerSafeDefinition": "Uzun kemik kırığı sonrası yağ globüllerine bağlı solunum, nörolojik ve peteşiyal bulgularla seyreder.",
    "shortDefinition": "Uzun kemik kırığı sonrası yağ globüllerine bağlı solunum, nörolojik ve peteşiyal bulgularla seyreder.",
    "detailedExplanation": "Uzun kemik kırığı sonrası yağ globüllerine bağlı solunum, nörolojik ve peteşiyal bulgularla seyreder. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Femur kırığı sonrası dispne, konfüzyon ve peteşi yağ embolisi düşündürür.",
    "tusPearl": "Femur kırığı sonrası dispne, konfüzyon ve peteşi yağ embolisi düşündürür.",
    "differentialPoint": "Pulmoner emboli genellikle DVT kaynaklı trombüsle ilişkilidir.",
    "clinicalRelevance": "Femur kırığı sonrası dispne, konfüzyon ve peteşi yağ embolisi düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "orthopedics",
      "pulmonology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Yağ embolisi sendromu",
      "fat embolism syndrome",
      "Ortopedi / Pulmonoloji"
    ]
  },
  {
    "term": "Avascular nekroz",
    "aliases": [
      "avasküler nekroz",
      "osteonecrosis"
    ],
    "category": "Ortopedi",
    "previewDefinition": "Kemik dokusunun kanlanma bozukluğu nedeniyle nekroze olmasıdır.",
    "preAnswerSafeDefinition": "Kemik dokusunun kanlanma bozukluğu nedeniyle nekroze olmasıdır.",
    "shortDefinition": "Kemik dokusunun kanlanma bozukluğu nedeniyle nekroze olmasıdır.",
    "detailedExplanation": "Kemik dokusunun kanlanma bozukluğu nedeniyle nekroze olmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Femur başı avasküler nekrozu steroid, alkol ve femur boyun kırığıyla ilişkilidir.",
    "tusPearl": "Femur başı avasküler nekrozu steroid, alkol ve femur boyun kırığıyla ilişkilidir.",
    "differentialPoint": "Osteomiyelit enfeksiyöz kemik inflamasyonudur.",
    "clinicalRelevance": "Femur başı avasküler nekrozu steroid, alkol ve femur boyun kırığıyla ilişkilidir.",
    "mechanism": "",
    "relatedBranches": [
      "orthopedics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Avascular nekroz",
      "avasküler nekroz",
      "osteonecrosis",
      "Ortopedi"
    ]
  },
  {
    "term": "Osteomiyelit",
    "aliases": [
      "osteomyelitis"
    ],
    "category": "Ortopedi / Enfeksiyon",
    "previewDefinition": "Kemik dokusunun enfeksiyöz inflamasyonudur.",
    "preAnswerSafeDefinition": "Kemik dokusunun enfeksiyöz inflamasyonudur.",
    "shortDefinition": "Kemik dokusunun enfeksiyöz inflamasyonudur.",
    "detailedExplanation": "Kemik dokusunun enfeksiyöz inflamasyonudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Çocukta metafiz tutulumu, ateş ve lokal ağrı osteomiyelit için klasik bilgidir.",
    "tusPearl": "Çocukta metafiz tutulumu, ateş ve lokal ağrı osteomiyelit için klasik bilgidir.",
    "differentialPoint": "Septik artritte eklem hareketi belirgin ağrılıdır ve acil drenaj gerekebilir.",
    "clinicalRelevance": "Çocukta metafiz tutulumu, ateş ve lokal ağrı osteomiyelit için klasik bilgidir.",
    "mechanism": "",
    "relatedBranches": [
      "orthopedics",
      "infectious-diseases"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Osteomiyelit",
      "osteomyelitis",
      "Ortopedi / Enfeksiyon"
    ]
  },
  {
    "term": "Septik artrit",
    "aliases": [
      "septic arthritis"
    ],
    "category": "Ortopedik acil",
    "previewDefinition": "Eklem boşluğunun enfeksiyonudur ve hızlı kıkırdak hasarı yapabilir.",
    "preAnswerSafeDefinition": "Eklem boşluğunun enfeksiyonudur ve hızlı kıkırdak hasarı yapabilir.",
    "shortDefinition": "Eklem boşluğunun enfeksiyonudur ve hızlı kıkırdak hasarı yapabilir.",
    "detailedExplanation": "Eklem boşluğunun enfeksiyonudur ve hızlı kıkırdak hasarı yapabilir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Ateş + tek eklemde şiddetli ağrı + pasif hareket kısıtlılığı septik artrit düşündürür.",
    "tusPearl": "Ateş + tek eklemde şiddetli ağrı + pasif hareket kısıtlılığı septik artrit düşündürür.",
    "differentialPoint": "Gut kristal artriti taklit edebilir; sinovyal sıvı analizi ayırıcıdır.",
    "clinicalRelevance": "Ateş + tek eklemde şiddetli ağrı + pasif hareket kısıtlılığı septik artrit düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "orthopedics",
      "infectious-diseases",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Septik artrit",
      "septic arthritis",
      "Ortopedik acil"
    ]
  },
  {
    "term": "Akut açı kapanması glokomu",
    "aliases": [
      "acute angle closure glaucoma"
    ],
    "category": "Göz acili",
    "previewDefinition": "Ön kamara açısının kapanmasıyla göz içi basıncının hızla artmasıdır.",
    "preAnswerSafeDefinition": "Ön kamara açısının kapanmasıyla göz içi basıncının hızla artmasıdır.",
    "shortDefinition": "Ön kamara açısının kapanmasıyla göz içi basıncının hızla artmasıdır.",
    "detailedExplanation": "Ön kamara açısının kapanmasıyla göz içi basıncının hızla artmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Ağrılı kırmızı göz + bulanık görme + halo + mid-dilate pupil acil glokom düşündürür.",
    "tusPearl": "Ağrılı kırmızı göz + bulanık görme + halo + mid-dilate pupil acil glokom düşündürür.",
    "differentialPoint": "Konjonktivitte görme kaybı ve sert göz beklenmez.",
    "clinicalRelevance": "Ağrılı kırmızı göz + bulanık görme + halo + mid-dilate pupil acil glokom düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "ophthalmology",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Akut açı kapanması glokomu",
      "acute angle closure glaucoma",
      "Göz acili"
    ]
  },
  {
    "term": "Retina dekolmanı",
    "aliases": [
      "retinal detachment"
    ],
    "category": "Göz acili",
    "previewDefinition": "Retinanın alttaki pigment epitelinden ayrılmasıdır.",
    "preAnswerSafeDefinition": "Retinanın alttaki pigment epitelinden ayrılmasıdır.",
    "shortDefinition": "Retinanın alttaki pigment epitelinden ayrılmasıdır.",
    "detailedExplanation": "Retinanın alttaki pigment epitelinden ayrılmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Işık çakması, uçuşan cisimler ve perde inmesi retina dekolmanı düşündürür.",
    "tusPearl": "Işık çakması, uçuşan cisimler ve perde inmesi retina dekolmanı düşündürür.",
    "differentialPoint": "Optik nöritte göz hareketiyle ağrı ve MS ilişkisi daha tipiktir.",
    "clinicalRelevance": "Işık çakması, uçuşan cisimler ve perde inmesi retina dekolmanı düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "ophthalmology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Retina dekolmanı",
      "retinal detachment",
      "Göz acili"
    ]
  },
  {
    "term": "Santral retinal arter tıkanıklığı",
    "aliases": [
      "CRAO",
      "central retinal artery occlusion"
    ],
    "category": "Göz acili",
    "previewDefinition": "Retinanın arteriyel kan akımının akut kesilmesiyle ani ağrısız görme kaybı yapar.",
    "preAnswerSafeDefinition": "Retinanın arteriyel kan akımının akut kesilmesiyle ani ağrısız görme kaybı yapar.",
    "shortDefinition": "Retinanın arteriyel kan akımının akut kesilmesiyle ani ağrısız görme kaybı yapar.",
    "detailedExplanation": "Retinanın arteriyel kan akımının akut kesilmesiyle ani ağrısız görme kaybı yapar. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Cherry-red spot ve ani ağrısız görme kaybı CRAO için klasik bilgidir.",
    "tusPearl": "Cherry-red spot ve ani ağrısız görme kaybı CRAO için klasik bilgidir.",
    "differentialPoint": "Retina dekolmanında perde inmesi ve fotopsi daha öne çıkar.",
    "clinicalRelevance": "Cherry-red spot ve ani ağrısız görme kaybı CRAO için klasik bilgidir.",
    "mechanism": "",
    "relatedBranches": [
      "ophthalmology",
      "cardiovascular"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Santral retinal arter tıkanıklığı",
      "CRAO",
      "central retinal artery occlusion",
      "Göz acili"
    ]
  },
  {
    "term": "Benign paroksismal pozisyonel vertigo",
    "aliases": [
      "BPPV"
    ],
    "category": "KBB / Nöroloji",
    "previewDefinition": "Otokonia yer değiştirmesine bağlı kısa süreli pozisyonel vertigo ataklarıdır.",
    "preAnswerSafeDefinition": "Otokonia yer değiştirmesine bağlı kısa süreli pozisyonel vertigo ataklarıdır.",
    "shortDefinition": "Otokonia yer değiştirmesine bağlı kısa süreli pozisyonel vertigo ataklarıdır.",
    "detailedExplanation": "Otokonia yer değiştirmesine bağlı kısa süreli pozisyonel vertigo ataklarıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Baş pozisyonuyla saniyeler süren vertigo ve Dix-Hallpike pozitifliği BPPV düşündürür.",
    "tusPearl": "Baş pozisyonuyla saniyeler süren vertigo ve Dix-Hallpike pozitifliği BPPV düşündürür.",
    "differentialPoint": "Vestibüler nöritte vertigo daha uzun sürer ve işitme kaybı beklenmez.",
    "clinicalRelevance": "Baş pozisyonuyla saniyeler süren vertigo ve Dix-Hallpike pozitifliği BPPV düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "ent",
      "neurology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Benign paroksismal pozisyonel vertigo",
      "BPPV",
      "KBB / Nöroloji"
    ]
  },
  {
    "term": "Meniere hastalığı",
    "aliases": [
      "Ménière disease"
    ],
    "category": "KBB",
    "previewDefinition": "Endolenfatik hidropsa bağlı epizodik vertigo, tinnitus ve dalgalanan işitme kaybıdır.",
    "preAnswerSafeDefinition": "Endolenfatik hidropsa bağlı epizodik vertigo, tinnitus ve dalgalanan işitme kaybıdır.",
    "shortDefinition": "Endolenfatik hidropsa bağlı epizodik vertigo, tinnitus ve dalgalanan işitme kaybıdır.",
    "detailedExplanation": "Endolenfatik hidropsa bağlı epizodik vertigo, tinnitus ve dalgalanan işitme kaybıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Vertigo + tinnitus + fluktuan işitme kaybı Meniere için klasik triaddır.",
    "tusPearl": "Vertigo + tinnitus + fluktuan işitme kaybı Meniere için klasik triaddır.",
    "differentialPoint": "BPPV’de işitme kaybı beklenmez ve ataklar kısa pozisyoneldir.",
    "clinicalRelevance": "Vertigo + tinnitus + fluktuan işitme kaybı Meniere için klasik triaddır.",
    "mechanism": "",
    "relatedBranches": [
      "ent",
      "neurology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Meniere hastalığı",
      "Ménière disease",
      "KBB"
    ]
  },
  {
    "term": "Deliryum",
    "aliases": [
      "delirium"
    ],
    "category": "Psikiyatri / Nöroloji",
    "previewDefinition": "Akut başlangıçlı, dalgalı seyirli dikkat ve bilinç bozukluğudur.",
    "preAnswerSafeDefinition": "Akut başlangıçlı, dalgalı seyirli dikkat ve bilinç bozukluğudur.",
    "shortDefinition": "Akut başlangıçlı, dalgalı seyirli dikkat ve bilinç bozukluğudur.",
    "detailedExplanation": "Akut başlangıçlı, dalgalı seyirli dikkat ve bilinç bozukluğudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Yaşlı hastada akut konfüzyonda enfeksiyon, ilaç, metabolik nedenler araştırılır.",
    "tusPearl": "Yaşlı hastada akut konfüzyonda enfeksiyon, ilaç, metabolik nedenler araştırılır.",
    "differentialPoint": "Demans kronik ve ilerleyici bilişsel bozuklukla seyreder.",
    "clinicalRelevance": "Yaşlı hastada akut konfüzyonda enfeksiyon, ilaç, metabolik nedenler araştırılır.",
    "mechanism": "",
    "relatedBranches": [
      "psychiatry",
      "neurology",
      "internal-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Deliryum",
      "delirium",
      "Psikiyatri / Nöroloji"
    ]
  },
  {
    "term": "Demans",
    "aliases": [
      "dementia"
    ],
    "category": "Nöropsikiyatri",
    "previewDefinition": "Günlük yaşamı etkileyen ilerleyici bilişsel işlev kaybıdır.",
    "preAnswerSafeDefinition": "Günlük yaşamı etkileyen ilerleyici bilişsel işlev kaybıdır.",
    "shortDefinition": "Günlük yaşamı etkileyen ilerleyici bilişsel işlev kaybıdır.",
    "detailedExplanation": "Günlük yaşamı etkileyen ilerleyici bilişsel işlev kaybıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Alzheimer’da erken epizodik bellek kaybı; Lewy cisimcikli demansta görsel halüsinasyon/parkinsonizm öne çıkar.",
    "tusPearl": "Alzheimer’da erken epizodik bellek kaybı; Lewy cisimcikli demansta görsel halüsinasyon/parkinsonizm öne çıkar.",
    "differentialPoint": "Deliryum akut ve dalgalı bilinç bozukluğudur.",
    "clinicalRelevance": "Alzheimer’da erken epizodik bellek kaybı; Lewy cisimcikli demansta görsel halüsinasyon/parkinsonizm öne çıkar.",
    "mechanism": "",
    "relatedBranches": [
      "neurology",
      "psychiatry"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Demans",
      "dementia",
      "Nöropsikiyatri"
    ]
  },
  {
    "term": "Major depresif bozukluk",
    "aliases": [
      "major depression",
      "MDD"
    ],
    "category": "Psikiyatri",
    "previewDefinition": "En az iki hafta süren depresif duygu durum veya ilgi kaybı ile seyreden sendromdur.",
    "preAnswerSafeDefinition": "En az iki hafta süren depresif duygu durum veya ilgi kaybı ile seyreden sendromdur.",
    "shortDefinition": "En az iki hafta süren depresif duygu durum veya ilgi kaybı ile seyreden sendromdur.",
    "detailedExplanation": "En az iki hafta süren depresif duygu durum veya ilgi kaybı ile seyreden sendromdur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "İntihar düşüncesi, psikotik özellik ve işlev kaybı mutlaka sorgulanır.",
    "tusPearl": "İntihar düşüncesi, psikotik özellik ve işlev kaybı mutlaka sorgulanır.",
    "differentialPoint": "Bipolar bozuklukta geçirilmiş mani/hipomani antidepresan planını değiştirir.",
    "clinicalRelevance": "İntihar düşüncesi, psikotik özellik ve işlev kaybı mutlaka sorgulanır.",
    "mechanism": "",
    "relatedBranches": [
      "psychiatry"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Major depresif bozukluk",
      "major depression",
      "MDD",
      "Psikiyatri"
    ]
  },
  {
    "term": "Bipolar bozukluk",
    "aliases": [
      "bipolar disorder"
    ],
    "category": "Psikiyatri",
    "previewDefinition": "Mani/hipomani ve depresyon dönemleriyle seyreden duygu durum bozukluğudur.",
    "preAnswerSafeDefinition": "Mani/hipomani ve depresyon dönemleriyle seyreden duygu durum bozukluğudur.",
    "shortDefinition": "Mani/hipomani ve depresyon dönemleriyle seyreden duygu durum bozukluğudur.",
    "detailedExplanation": "Mani/hipomani ve depresyon dönemleriyle seyreden duygu durum bozukluğudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Azalmış uyku ihtiyacı, grandiyözite ve taşkınlık mani için temel ipuçlarıdır.",
    "tusPearl": "Azalmış uyku ihtiyacı, grandiyözite ve taşkınlık mani için temel ipuçlarıdır.",
    "differentialPoint": "Tekrarlayan depresyonda mani öyküsü yoksa unipolar depresyon düşünülür.",
    "clinicalRelevance": "Azalmış uyku ihtiyacı, grandiyözite ve taşkınlık mani için temel ipuçlarıdır.",
    "mechanism": "",
    "relatedBranches": [
      "psychiatry"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Bipolar bozukluk",
      "bipolar disorder",
      "Psikiyatri"
    ]
  },
  {
    "term": "Duyarlılık",
    "aliases": [
      "sensitivite",
      "sensitivity"
    ],
    "category": "Biyoistatistik",
    "previewDefinition": "Hastalığı olanlar içinde testin pozitif çıkma olasılığıdır.",
    "preAnswerSafeDefinition": "Hastalığı olanlar içinde testin pozitif çıkma olasılığıdır.",
    "shortDefinition": "Hastalığı olanlar içinde testin pozitif çıkma olasılığıdır.",
    "detailedExplanation": "Hastalığı olanlar içinde testin pozitif çıkma olasılığıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Duyarlılığı yüksek test negatifse hastalığı dışlamada değerlidir.",
    "tusPearl": "Duyarlılığı yüksek test negatifse hastalığı dışlamada değerlidir.",
    "differentialPoint": "Özgüllük hastalığı olmayanlarda testin negatif çıkma olasılığıdır.",
    "clinicalRelevance": "Duyarlılığı yüksek test negatifse hastalığı dışlamada değerlidir.",
    "mechanism": "",
    "relatedBranches": [
      "biostatistics",
      "public-health"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Duyarlılık",
      "sensitivite",
      "sensitivity",
      "Biyoistatistik"
    ]
  },
  {
    "term": "Özgüllük",
    "aliases": [
      "spesifite",
      "specificity"
    ],
    "category": "Biyoistatistik",
    "previewDefinition": "Hastalığı olmayanlar içinde testin negatif çıkma olasılığıdır.",
    "preAnswerSafeDefinition": "Hastalığı olmayanlar içinde testin negatif çıkma olasılığıdır.",
    "shortDefinition": "Hastalığı olmayanlar içinde testin negatif çıkma olasılığıdır.",
    "detailedExplanation": "Hastalığı olmayanlar içinde testin negatif çıkma olasılığıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Özgüllüğü yüksek test pozitifse hastalığı doğrulamada değerlidir.",
    "tusPearl": "Özgüllüğü yüksek test pozitifse hastalığı doğrulamada değerlidir.",
    "differentialPoint": "Duyarlılık hastalığı olanları yakalama gücüdür.",
    "clinicalRelevance": "Özgüllüğü yüksek test pozitifse hastalığı doğrulamada değerlidir.",
    "mechanism": "",
    "relatedBranches": [
      "biostatistics",
      "public-health"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Özgüllük",
      "spesifite",
      "specificity",
      "Biyoistatistik"
    ]
  },
  {
    "term": "Pozitif prediktif değer",
    "aliases": [
      "PPV",
      "positive predictive value"
    ],
    "category": "Biyoistatistik",
    "previewDefinition": "Test pozitif olanlar içinde gerçekten hasta olanların oranıdır.",
    "preAnswerSafeDefinition": "Test pozitif olanlar içinde gerçekten hasta olanların oranıdır.",
    "shortDefinition": "Test pozitif olanlar içinde gerçekten hasta olanların oranıdır.",
    "detailedExplanation": "Test pozitif olanlar içinde gerçekten hasta olanların oranıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Prevalans arttıkça PPV artar.",
    "tusPearl": "Prevalans arttıkça PPV artar.",
    "differentialPoint": "Duyarlılık ve özgüllük testin intrinsik özellikleridir; PPV prevalanstan etkilenir.",
    "clinicalRelevance": "Prevalans arttıkça PPV artar.",
    "mechanism": "",
    "relatedBranches": [
      "biostatistics",
      "public-health"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Pozitif prediktif değer",
      "PPV",
      "positive predictive value",
      "Biyoistatistik"
    ]
  },
  {
    "term": "Negatif prediktif değer",
    "aliases": [
      "NPV",
      "negative predictive value"
    ],
    "category": "Biyoistatistik",
    "previewDefinition": "Test negatif olanlar içinde gerçekten hasta olmayanların oranıdır.",
    "preAnswerSafeDefinition": "Test negatif olanlar içinde gerçekten hasta olmayanların oranıdır.",
    "shortDefinition": "Test negatif olanlar içinde gerçekten hasta olmayanların oranıdır.",
    "detailedExplanation": "Test negatif olanlar içinde gerçekten hasta olmayanların oranıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Prevalans azaldıkça NPV artar.",
    "tusPearl": "Prevalans azaldıkça NPV artar.",
    "differentialPoint": "Özgüllük prevalanstan doğrudan etkilenmez.",
    "clinicalRelevance": "Prevalans azaldıkça NPV artar.",
    "mechanism": "",
    "relatedBranches": [
      "biostatistics",
      "public-health"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Negatif prediktif değer",
      "NPV",
      "negative predictive value",
      "Biyoistatistik"
    ]
  },
  {
    "term": "Odds ratio",
    "aliases": [
      "OR",
      "olasılık oranı"
    ],
    "category": "Biyoistatistik",
    "previewDefinition": "Olgu-kontrol çalışmalarında maruziyet ve hastalık ilişkisini gösteren oran ölçüsüdür.",
    "preAnswerSafeDefinition": "Olgu-kontrol çalışmalarında maruziyet ve hastalık ilişkisini gösteren oran ölçüsüdür.",
    "shortDefinition": "Olgu-kontrol çalışmalarında maruziyet ve hastalık ilişkisini gösteren oran ölçüsüdür.",
    "detailedExplanation": "Olgu-kontrol çalışmalarında maruziyet ve hastalık ilişkisini gösteren oran ölçüsüdür. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Nadir hastalık varsayımında odds ratio rölatif riske yaklaşabilir.",
    "tusPearl": "Nadir hastalık varsayımında odds ratio rölatif riske yaklaşabilir.",
    "differentialPoint": "Kohort çalışmalarında risk oranı doğrudan hesaplanabilir.",
    "clinicalRelevance": "Nadir hastalık varsayımında odds ratio rölatif riske yaklaşabilir.",
    "mechanism": "",
    "relatedBranches": [
      "biostatistics",
      "public-health"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Odds ratio",
      "OR",
      "olasılık oranı",
      "Biyoistatistik"
    ]
  },
  {
    "term": "Rölatif risk",
    "aliases": [
      "relative risk",
      "RR"
    ],
    "category": "Biyoistatistik",
    "previewDefinition": "Maruz kalanlarda hastalık riskinin maruz kalmayanlara oranıdır.",
    "preAnswerSafeDefinition": "Maruz kalanlarda hastalık riskinin maruz kalmayanlara oranıdır.",
    "shortDefinition": "Maruz kalanlarda hastalık riskinin maruz kalmayanlara oranıdır.",
    "detailedExplanation": "Maruz kalanlarda hastalık riskinin maruz kalmayanlara oranıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Kohort çalışmalarında doğrudan hesaplanır.",
    "tusPearl": "Kohort çalışmalarında doğrudan hesaplanır.",
    "differentialPoint": "Olgu-kontrol çalışmalarında genellikle odds ratio kullanılır.",
    "clinicalRelevance": "Kohort çalışmalarında doğrudan hesaplanır.",
    "mechanism": "",
    "relatedBranches": [
      "biostatistics",
      "public-health"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Rölatif risk",
      "relative risk",
      "RR",
      "Biyoistatistik"
    ]
  },
  {
    "term": "NNT",
    "aliases": [
      "number needed to treat"
    ],
    "category": "Biyoistatistik",
    "previewDefinition": "Bir olumsuz sonucu önlemek için tedavi edilmesi gereken hasta sayısıdır.",
    "preAnswerSafeDefinition": "Bir olumsuz sonucu önlemek için tedavi edilmesi gereken hasta sayısıdır.",
    "shortDefinition": "Bir olumsuz sonucu önlemek için tedavi edilmesi gereken hasta sayısıdır.",
    "detailedExplanation": "Bir olumsuz sonucu önlemek için tedavi edilmesi gereken hasta sayısıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Mutlak risk azalmasının tersidir.",
    "tusPearl": "Mutlak risk azalmasının tersidir.",
    "differentialPoint": "Rölatif risk azalması etkiyi olduğundan büyük gösterebilir; NNT klinik anlamı güçlendirir.",
    "clinicalRelevance": "Mutlak risk azalmasının tersidir.",
    "mechanism": "",
    "relatedBranches": [
      "biostatistics",
      "public-health"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "NNT",
      "number needed to treat",
      "Biyoistatistik"
    ]
  },
  {
    "term": "NNH",
    "aliases": [
      "number needed to harm"
    ],
    "category": "Biyoistatistik",
    "previewDefinition": "Bir zararlı sonucun ortaya çıkması için tedavi edilmesi gereken hasta sayısıdır.",
    "preAnswerSafeDefinition": "Bir zararlı sonucun ortaya çıkması için tedavi edilmesi gereken hasta sayısıdır.",
    "shortDefinition": "Bir zararlı sonucun ortaya çıkması için tedavi edilmesi gereken hasta sayısıdır.",
    "detailedExplanation": "Bir zararlı sonucun ortaya çıkması için tedavi edilmesi gereken hasta sayısıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Mutlak risk artışının tersidir.",
    "tusPearl": "Mutlak risk artışının tersidir.",
    "differentialPoint": "NNT yararı, NNH zararı ifade eder.",
    "clinicalRelevance": "Mutlak risk artışının tersidir.",
    "mechanism": "",
    "relatedBranches": [
      "biostatistics",
      "public-health"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "NNH",
      "number needed to harm",
      "Biyoistatistik"
    ]
  }
];

export const TUS_GLOSSARY_EXPANDED_TERMS = EXPANDED_TUS_GLOSSARY_SEEDS.map((entry) => {
  const aliases = Array.from(new Set([entry.term, ...(entry.aliases || [])].filter(Boolean)));
  const normalizedTerm = foldTerm(entry.normalizedTerm || entry.term);
  const previewDefinition = entry.previewDefinition || entry.shortDefinition || entry.preAnswerSafeDefinition || '';
  return {
    id: entry.id || idForTerm(entry.term),
    term: entry.term,
    aliases,
    normalizedTerm,
    TurkishName: entry.TurkishName || entry.term,
    EnglishName: entry.EnglishName || '',
    LatinName: entry.LatinName || '',
    abbreviation: entry.abbreviation || '',
    category: entry.category || 'TUS terminolojisi',
    shortDefinition: entry.shortDefinition || previewDefinition,
    previewDefinition,
    preAnswerSafeDefinition: entry.preAnswerSafeDefinition || previewDefinition,
    detailedExplanation: entry.detailedExplanation || entry.postAnswerExpandedExplanation || previewDefinition,
    postAnswerExpandedExplanation: entry.postAnswerExpandedExplanation || entry.detailedExplanation || '',
    tusPearl: entry.tusPearl || '',
    differentialPoint: entry.differentialPoint || '',
    clinicalRelevance: entry.clinicalRelevance || '',
    mechanism: entry.mechanism || '',
    relatedBranches: entry.relatedBranches || [],
    relatedTerms: entry.relatedTerms || [],
    relatedCases: entry.relatedCases || [],
    relatedQuestions: entry.relatedQuestions || [],
    relatedFlashcards: entry.relatedFlashcards || [],
    difficulty: entry.difficulty || 'orta',
    keywordsForSearch: Array.from(new Set([...(entry.keywordsForSearch || []), entry.term, ...(entry.aliases || [])].filter(Boolean))),
  };
});
