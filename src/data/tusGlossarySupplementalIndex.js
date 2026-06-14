// KlinikIQ supplemental TUS glossary expansion.
// Adds additional high-yield terms while keeping preview/pre-answer explanations neutral.

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
  return `supplemental-${foldTerm(term).replace(/[^a-z0-9]+/giu, '-').replace(/^-|-$/g, '')}`;
}

const SUPPLEMENTAL_TUS_GLOSSARY_SEEDS = [
  {
    "term": "BNP",
    "aliases": [
      "NT-proBNP",
      "brain natriuretic peptide"
    ],
    "category": "Laboratuvar",
    "previewDefinition": "Ventrikül duvar gerilimi arttığında yükselen natriüretik peptid belirtecidir.",
    "preAnswerSafeDefinition": "Ventrikül duvar gerilimi arttığında yükselen natriüretik peptid belirtecidir.",
    "shortDefinition": "Ventrikül duvar gerilimi arttığında yükselen natriüretik peptid belirtecidir.",
    "detailedExplanation": "Ventrikül duvar gerilimi arttığında yükselen natriüretik peptid belirtecidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Dispne ayırıcı tanısında kalp yetmezliği lehine destekleyici olabilir; tek başına tanı koydurmaz.",
    "tusPearl": "Dispne ayırıcı tanısında kalp yetmezliği lehine destekleyici olabilir; tek başına tanı koydurmaz.",
    "differentialPoint": "KOAH/PE gibi pulmoner nedenler de dispne yapar; BNP klinik ve görüntüleme ile birlikte yorumlanır.",
    "clinicalRelevance": "Dispne ayırıcı tanısında kalp yetmezliği lehine destekleyici olabilir; tek başına tanı koydurmaz.",
    "mechanism": "",
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "BNP",
      "NT-proBNP",
      "brain natriuretic peptide",
      "Laboratuvar"
    ]
  },
  {
    "term": "Laktat",
    "aliases": [
      "serum laktat",
      "lactic acid"
    ],
    "category": "Laboratuvar",
    "previewDefinition": "Doku hipoperfüzyonu veya anaerobik metabolizma artışıyla yükselebilen metabolittir.",
    "preAnswerSafeDefinition": "Doku hipoperfüzyonu veya anaerobik metabolizma artışıyla yükselebilen metabolittir.",
    "shortDefinition": "Doku hipoperfüzyonu veya anaerobik metabolizma artışıyla yükselebilen metabolittir.",
    "detailedExplanation": "Doku hipoperfüzyonu veya anaerobik metabolizma artışıyla yükselebilen metabolittir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Sepsis ve şokta laktat yüksekliği doku perfüzyon bozukluğunu ve prognozu gösterir.",
    "tusPearl": "Sepsis ve şokta laktat yüksekliği doku perfüzyon bozukluğunu ve prognozu gösterir.",
    "differentialPoint": "Metformin ilişkili laktik asidoz gibi toksik/metabolik nedenler de olabilir.",
    "clinicalRelevance": "Sepsis ve şokta laktat yüksekliği doku perfüzyon bozukluğunu ve prognozu gösterir.",
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
      "Laktat",
      "serum laktat",
      "lactic acid",
      "Laboratuvar"
    ]
  },
  {
    "term": "Prokalsitonin",
    "aliases": [
      "PCT",
      "procalcitonin"
    ],
    "category": "Laboratuvar",
    "previewDefinition": "Bakteriyel enfeksiyon ve sistemik inflamasyonda yükselebilen biyobelirteçtir.",
    "preAnswerSafeDefinition": "Bakteriyel enfeksiyon ve sistemik inflamasyonda yükselebilen biyobelirteçtir.",
    "shortDefinition": "Bakteriyel enfeksiyon ve sistemik inflamasyonda yükselebilen biyobelirteçtir.",
    "detailedExplanation": "Bakteriyel enfeksiyon ve sistemik inflamasyonda yükselebilen biyobelirteçtir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Antibiyotik kararında yardımcı olabilir; klinik değerlendirmenin yerine geçmez.",
    "tusPearl": "Antibiyotik kararında yardımcı olabilir; klinik değerlendirmenin yerine geçmez.",
    "differentialPoint": "Viral enfeksiyonlarda genellikle daha düşük kalma eğilimindedir ancak mutlak ayırıcı değildir.",
    "clinicalRelevance": "Antibiyotik kararında yardımcı olabilir; klinik değerlendirmenin yerine geçmez.",
    "mechanism": "",
    "relatedBranches": [
      "infectious-diseases",
      "internal-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Prokalsitonin",
      "PCT",
      "procalcitonin",
      "Laboratuvar"
    ]
  },
  {
    "term": "CRP",
    "aliases": [
      "C-reaktif protein",
      "C reactive protein"
    ],
    "category": "Laboratuvar",
    "previewDefinition": "İnflamasyonla yükselen akut faz reaktanıdır.",
    "preAnswerSafeDefinition": "İnflamasyonla yükselen akut faz reaktanıdır.",
    "shortDefinition": "İnflamasyonla yükselen akut faz reaktanıdır.",
    "detailedExplanation": "İnflamasyonla yükselen akut faz reaktanıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Enfeksiyon, romatolojik hastalık ve inflamasyon takibinde kullanılır; özgül değildir.",
    "tusPearl": "Enfeksiyon, romatolojik hastalık ve inflamasyon takibinde kullanılır; özgül değildir.",
    "differentialPoint": "Prokalsitonin bakteriyel enfeksiyon ayrımında daha yardımcı olabilir.",
    "clinicalRelevance": "Enfeksiyon, romatolojik hastalık ve inflamasyon takibinde kullanılır; özgül değildir.",
    "mechanism": "",
    "relatedBranches": [
      "internal-medicine",
      "infectious-diseases"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "CRP",
      "C-reaktif protein",
      "C reactive protein",
      "Laboratuvar"
    ]
  },
  {
    "term": "ESR",
    "aliases": [
      "sedimantasyon",
      "eritrosit sedimentasyon hızı"
    ],
    "category": "Laboratuvar",
    "previewDefinition": "Eritrosit sedimentasyon hızı inflamasyon göstergesi olarak kullanılan nonspesifik testtir.",
    "preAnswerSafeDefinition": "Eritrosit sedimentasyon hızı inflamasyon göstergesi olarak kullanılan nonspesifik testtir.",
    "shortDefinition": "Eritrosit sedimentasyon hızı inflamasyon göstergesi olarak kullanılan nonspesifik testtir.",
    "detailedExplanation": "Eritrosit sedimentasyon hızı inflamasyon göstergesi olarak kullanılan nonspesifik testtir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Dev hücreli arterit ve polimiyalji romatikada yüksek ESR klasik ipucudur.",
    "tusPearl": "Dev hücreli arterit ve polimiyalji romatikada yüksek ESR klasik ipucudur.",
    "differentialPoint": "CRP daha hızlı değişebilir; ESR yaş/anemi gibi durumlardan etkilenebilir.",
    "clinicalRelevance": "Dev hücreli arterit ve polimiyalji romatikada yüksek ESR klasik ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "rheumatology",
      "internal-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "ESR",
      "sedimantasyon",
      "eritrosit sedimentasyon hızı",
      "Laboratuvar"
    ]
  },
  {
    "term": "Ferritin",
    "aliases": [
      "serum ferritin"
    ],
    "category": "Laboratuvar",
    "previewDefinition": "Demir depolarını yansıtan ve akut faz reaktanı olarak da yükselebilen proteindir.",
    "preAnswerSafeDefinition": "Demir depolarını yansıtan ve akut faz reaktanı olarak da yükselebilen proteindir.",
    "shortDefinition": "Demir depolarını yansıtan ve akut faz reaktanı olarak da yükselebilen proteindir.",
    "detailedExplanation": "Demir depolarını yansıtan ve akut faz reaktanı olarak da yükselebilen proteindir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Düşük ferritin demir eksikliğini güçlü destekler.",
    "tusPearl": "Düşük ferritin demir eksikliğini güçlü destekler.",
    "differentialPoint": "Kronik inflamasyonda ferritin normal/yüksek olabilir; transferrin saturasyonu ile birlikte yorumlanır.",
    "clinicalRelevance": "Düşük ferritin demir eksikliğini güçlü destekler.",
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
      "Ferritin",
      "serum ferritin",
      "Laboratuvar"
    ]
  },
  {
    "term": "Transferrin saturasyonu",
    "aliases": [
      "TSAT",
      "transferrin saturation"
    ],
    "category": "Laboratuvar",
    "previewDefinition": "Serum demirinin transferrin bağlama kapasitesine oranıdır.",
    "preAnswerSafeDefinition": "Serum demirinin transferrin bağlama kapasitesine oranıdır.",
    "shortDefinition": "Serum demirinin transferrin bağlama kapasitesine oranıdır.",
    "detailedExplanation": "Serum demirinin transferrin bağlama kapasitesine oranıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Hemokromatoziste transferrin saturasyonu artışı yüksek değerli ipucudur.",
    "tusPearl": "Hemokromatoziste transferrin saturasyonu artışı yüksek değerli ipucudur.",
    "differentialPoint": "Demir eksikliğinde genellikle düşer.",
    "clinicalRelevance": "Hemokromatoziste transferrin saturasyonu artışı yüksek değerli ipucudur.",
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
      "Transferrin saturasyonu",
      "TSAT",
      "transferrin saturation",
      "Laboratuvar"
    ]
  },
  {
    "term": "Retikülosit",
    "aliases": [
      "reticulocyte"
    ],
    "category": "Hematoloji",
    "previewDefinition": "Kemik iliğinden yeni çıkmış genç eritrosittir.",
    "preAnswerSafeDefinition": "Kemik iliğinden yeni çıkmış genç eritrosittir.",
    "shortDefinition": "Kemik iliğinden yeni çıkmış genç eritrosittir.",
    "detailedExplanation": "Kemik iliğinden yeni çıkmış genç eritrosittir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Hemoliz veya kan kaybında retikülosit artışı beklenir; üretim kusurunda yanıt yetersizdir.",
    "tusPearl": "Hemoliz veya kan kaybında retikülosit artışı beklenir; üretim kusurunda yanıt yetersizdir.",
    "differentialPoint": "Demir/B12 eksikliğinde tedavi öncesi retikülosit yanıtı düşük olabilir.",
    "clinicalRelevance": "Hemoliz veya kan kaybında retikülosit artışı beklenir; üretim kusurunda yanıt yetersizdir.",
    "mechanism": "",
    "relatedBranches": [
      "hematology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Retikülosit",
      "reticulocyte",
      "Hematoloji"
    ]
  },
  {
    "term": "Haptoglobin",
    "aliases": [
      "haptoglobin"
    ],
    "category": "Laboratuvar",
    "previewDefinition": "Serbest hemoglobini bağlayan plazma proteinidir.",
    "preAnswerSafeDefinition": "Serbest hemoglobini bağlayan plazma proteinidir.",
    "shortDefinition": "Serbest hemoglobini bağlayan plazma proteinidir.",
    "detailedExplanation": "Serbest hemoglobini bağlayan plazma proteinidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "İntravasküler hemolizde haptoglobin düşer.",
    "tusPearl": "İntravasküler hemolizde haptoglobin düşer.",
    "differentialPoint": "Karaciğer hastalığı da haptoglobin düzeyini etkileyebilir; tek başına yorumlanmaz.",
    "clinicalRelevance": "İntravasküler hemolizde haptoglobin düşer.",
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
      "Haptoglobin",
      "haptoglobin",
      "Laboratuvar"
    ]
  },
  {
    "term": "LDH",
    "aliases": [
      "laktat dehidrogenaz"
    ],
    "category": "Laboratuvar",
    "previewDefinition": "Hücre hasarı ve hemolizde yükselebilen hücre içi enzimdir.",
    "preAnswerSafeDefinition": "Hücre hasarı ve hemolizde yükselebilen hücre içi enzimdir.",
    "shortDefinition": "Hücre hasarı ve hemolizde yükselebilen hücre içi enzimdir.",
    "detailedExplanation": "Hücre hasarı ve hemolizde yükselebilen hücre içi enzimdir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Hemolitik anemide LDH artışı indirekt bilirubin artışı ve haptoglobin düşüklüğüyle birlikte anlamlıdır.",
    "tusPearl": "Hemolitik anemide LDH artışı indirekt bilirubin artışı ve haptoglobin düşüklüğüyle birlikte anlamlıdır.",
    "differentialPoint": "Tek başına LDH yüksekliği özgül değildir.",
    "clinicalRelevance": "Hemolitik anemide LDH artışı indirekt bilirubin artışı ve haptoglobin düşüklüğüyle birlikte anlamlıdır.",
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
      "LDH",
      "laktat dehidrogenaz",
      "Laboratuvar"
    ]
  },
  {
    "term": "D-dimer",
    "aliases": [
      "D dimer"
    ],
    "category": "Laboratuvar",
    "previewDefinition": "Fibrin yıkım ürünüdür ve tromboz/fibrinoliz aktivasyonunu yansıtır.",
    "preAnswerSafeDefinition": "Fibrin yıkım ürünüdür ve tromboz/fibrinoliz aktivasyonunu yansıtır.",
    "shortDefinition": "Fibrin yıkım ürünüdür ve tromboz/fibrinoliz aktivasyonunu yansıtır.",
    "detailedExplanation": "Fibrin yıkım ürünüdür ve tromboz/fibrinoliz aktivasyonunu yansıtır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Düşük klinik olasılıkta negatif D-dimer PE/DVT dışlamada kullanılabilir.",
    "tusPearl": "Düşük klinik olasılıkta negatif D-dimer PE/DVT dışlamada kullanılabilir.",
    "differentialPoint": "Yüksek D-dimer enfeksiyon, gebelik, malignite ve cerrahi sonrası da görülebilir.",
    "clinicalRelevance": "Düşük klinik olasılıkta negatif D-dimer PE/DVT dışlamada kullanılabilir.",
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
      "D-dimer",
      "D dimer",
      "Laboratuvar"
    ]
  },
  {
    "term": "Fibrinojen",
    "aliases": [
      "fibrinogen"
    ],
    "category": "Koagülasyon",
    "previewDefinition": "Pıhtılaşma sisteminde fibrine dönüşen plazma proteinidir.",
    "preAnswerSafeDefinition": "Pıhtılaşma sisteminde fibrine dönüşen plazma proteinidir.",
    "shortDefinition": "Pıhtılaşma sisteminde fibrine dönüşen plazma proteinidir.",
    "detailedExplanation": "Pıhtılaşma sisteminde fibrine dönüşen plazma proteinidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "DIC’de tüketim nedeniyle fibrinojen düşebilir.",
    "tusPearl": "DIC’de tüketim nedeniyle fibrinojen düşebilir.",
    "differentialPoint": "Akut faz yanıtında fibrinojen yükselebilir; bağlam önemlidir.",
    "clinicalRelevance": "DIC’de tüketim nedeniyle fibrinojen düşebilir.",
    "mechanism": "",
    "relatedBranches": [
      "hematology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Fibrinojen",
      "fibrinogen",
      "Koagülasyon"
    ]
  },
  {
    "term": "aPTT",
    "aliases": [
      "activated partial thromboplastin time"
    ],
    "category": "Koagülasyon testi",
    "previewDefinition": "İntrinsik ve ortak koagülasyon yolunu değerlendiren testtir.",
    "preAnswerSafeDefinition": "İntrinsik ve ortak koagülasyon yolunu değerlendiren testtir.",
    "shortDefinition": "İntrinsik ve ortak koagülasyon yolunu değerlendiren testtir.",
    "detailedExplanation": "İntrinsik ve ortak koagülasyon yolunu değerlendiren testtir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Heparin takibi ve hemofili gibi intrinsik yol bozukluklarında değerlidir.",
    "tusPearl": "Heparin takibi ve hemofili gibi intrinsik yol bozukluklarında değerlidir.",
    "differentialPoint": "PT/INR ekstrinsik yol ve warfarin takibiyle daha ilişkilidir.",
    "clinicalRelevance": "Heparin takibi ve hemofili gibi intrinsik yol bozukluklarında değerlidir.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "pharmacology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "aPTT",
      "activated partial thromboplastin time",
      "Koagülasyon testi"
    ]
  },
  {
    "term": "PT/INR",
    "aliases": [
      "protrombin zamanı",
      "INR"
    ],
    "category": "Koagülasyon testi",
    "previewDefinition": "Ekstrinsik ve ortak koagülasyon yolunu değerlendiren testtir.",
    "preAnswerSafeDefinition": "Ekstrinsik ve ortak koagülasyon yolunu değerlendiren testtir.",
    "shortDefinition": "Ekstrinsik ve ortak koagülasyon yolunu değerlendiren testtir.",
    "detailedExplanation": "Ekstrinsik ve ortak koagülasyon yolunu değerlendiren testtir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Warfarin takibinde INR kullanılır; faktör VII etkisi nedeniyle erken uzayabilir.",
    "tusPearl": "Warfarin takibinde INR kullanılır; faktör VII etkisi nedeniyle erken uzayabilir.",
    "differentialPoint": "Heparin takibi klasik olarak aPTT ile yapılır.",
    "clinicalRelevance": "Warfarin takibinde INR kullanılır; faktör VII etkisi nedeniyle erken uzayabilir.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "pharmacology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "PT/INR",
      "protrombin zamanı",
      "INR",
      "Koagülasyon testi"
    ]
  },
  {
    "term": "HIT",
    "aliases": [
      "heparin induced thrombocytopenia",
      "heparin ilişkili trombositopeni"
    ],
    "category": "İlaç ilişkili hematoloji",
    "previewDefinition": "Heparin kullanımına bağlı PF4 antikorlarıyla gelişen trombositopeni ve tromboz riskidir.",
    "preAnswerSafeDefinition": "Heparin kullanımına bağlı PF4 antikorlarıyla gelişen trombositopeni ve tromboz riskidir.",
    "shortDefinition": "Heparin kullanımına bağlı PF4 antikorlarıyla gelişen trombositopeni ve tromboz riskidir.",
    "detailedExplanation": "Heparin kullanımına bağlı PF4 antikorlarıyla gelişen trombositopeni ve tromboz riskidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Heparin sonrası trombosit düşüşü + yeni tromboz HIT düşündürür; heparin kesilip alternatif antikoagülan verilir.",
    "tusPearl": "Heparin sonrası trombosit düşüşü + yeni tromboz HIT düşündürür; heparin kesilip alternatif antikoagülan verilir.",
    "differentialPoint": "ITP izole immün trombositopenidir; heparin maruziyeti şart değildir.",
    "clinicalRelevance": "Heparin sonrası trombosit düşüşü + yeni tromboz HIT düşündürür; heparin kesilip alternatif antikoagülan verilir.",
    "mechanism": "",
    "relatedBranches": [
      "hematology",
      "pharmacology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "HIT",
      "heparin induced thrombocytopenia",
      "heparin ilişkili trombositopeni",
      "İlaç ilişkili hematoloji"
    ]
  },
  {
    "term": "Beta hemoliz",
    "aliases": [
      "β hemoliz",
      "beta-hemolysis"
    ],
    "category": "Mikrobiyoloji",
    "previewDefinition": "Kanlı agarda eritrositlerin tam lizisiyle oluşan hemoliz paternidir.",
    "preAnswerSafeDefinition": "Kanlı agarda eritrositlerin tam lizisiyle oluşan hemoliz paternidir.",
    "shortDefinition": "Kanlı agarda eritrositlerin tam lizisiyle oluşan hemoliz paternidir.",
    "detailedExplanation": "Kanlı agarda eritrositlerin tam lizisiyle oluşan hemoliz paternidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "S. pyogenes ve S. agalactiae beta hemolitik streptokoklar arasında klasik olarak sorulur.",
    "tusPearl": "S. pyogenes ve S. agalactiae beta hemolitik streptokoklar arasında klasik olarak sorulur.",
    "differentialPoint": "Alfa hemoliz yeşilimsi kısmi hemolizdir.",
    "clinicalRelevance": "S. pyogenes ve S. agalactiae beta hemolitik streptokoklar arasında klasik olarak sorulur.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Beta hemoliz",
      "β hemoliz",
      "beta-hemolysis",
      "Mikrobiyoloji"
    ]
  },
  {
    "term": "Alfa hemoliz",
    "aliases": [
      "α hemoliz",
      "alpha-hemolysis"
    ],
    "category": "Mikrobiyoloji",
    "previewDefinition": "Kanlı agarda yeşilimsi kısmi hemoliz paternidir.",
    "preAnswerSafeDefinition": "Kanlı agarda yeşilimsi kısmi hemoliz paternidir.",
    "shortDefinition": "Kanlı agarda yeşilimsi kısmi hemoliz paternidir.",
    "detailedExplanation": "Kanlı agarda yeşilimsi kısmi hemoliz paternidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "S. pneumoniae ve viridans streptokoklar alfa hemolitik olarak ayırt edilir.",
    "tusPearl": "S. pneumoniae ve viridans streptokoklar alfa hemolitik olarak ayırt edilir.",
    "differentialPoint": "Beta hemoliz tam hemolizdir.",
    "clinicalRelevance": "S. pneumoniae ve viridans streptokoklar alfa hemolitik olarak ayırt edilir.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Alfa hemoliz",
      "α hemoliz",
      "alpha-hemolysis",
      "Mikrobiyoloji"
    ]
  },
  {
    "term": "Bacitracin duyarlılığı",
    "aliases": [
      "basitrasin duyarlılığı"
    ],
    "category": "Mikrobiyoloji testi",
    "previewDefinition": "Beta hemolitik streptokoklarda S. pyogenes ayrımında kullanılan test bilgisidir.",
    "preAnswerSafeDefinition": "Beta hemolitik streptokoklarda S. pyogenes ayrımında kullanılan test bilgisidir.",
    "shortDefinition": "Beta hemolitik streptokoklarda S. pyogenes ayrımında kullanılan test bilgisidir.",
    "detailedExplanation": "Beta hemolitik streptokoklarda S. pyogenes ayrımında kullanılan test bilgisidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "A grubu streptokok bacitracin duyarlı, PYR pozitif olarak klasik öğretilir.",
    "tusPearl": "A grubu streptokok bacitracin duyarlı, PYR pozitif olarak klasik öğretilir.",
    "differentialPoint": "S. agalactiae CAMP testi pozitifliğiyle ayrılır.",
    "clinicalRelevance": "A grubu streptokok bacitracin duyarlı, PYR pozitif olarak klasik öğretilir.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Bacitracin duyarlılığı",
      "basitrasin duyarlılığı",
      "Mikrobiyoloji testi"
    ]
  },
  {
    "term": "CAMP testi",
    "aliases": [
      "CAMP test"
    ],
    "category": "Mikrobiyoloji testi",
    "previewDefinition": "Streptococcus agalactiae tanımlamasında kullanılan hemoliz güçlenmesi testidir.",
    "preAnswerSafeDefinition": "Streptococcus agalactiae tanımlamasında kullanılan hemoliz güçlenmesi testidir.",
    "shortDefinition": "Streptococcus agalactiae tanımlamasında kullanılan hemoliz güçlenmesi testidir.",
    "detailedExplanation": "Streptococcus agalactiae tanımlamasında kullanılan hemoliz güçlenmesi testidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Gebelikte GBS taraması ve neonatal sepsis/menenjit bağlantısı yüksek verimlidir.",
    "tusPearl": "Gebelikte GBS taraması ve neonatal sepsis/menenjit bağlantısı yüksek verimlidir.",
    "differentialPoint": "S. pyogenes bacitracin duyarlılığı ve PYR pozitifliğiyle ayrılır.",
    "clinicalRelevance": "Gebelikte GBS taraması ve neonatal sepsis/menenjit bağlantısı yüksek verimlidir.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology",
      "pediatrics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "CAMP testi",
      "CAMP test",
      "Mikrobiyoloji testi"
    ]
  },
  {
    "term": "PYR testi",
    "aliases": [
      "PYR positive"
    ],
    "category": "Mikrobiyoloji testi",
    "previewDefinition": "Bazı streptokok ve enterokokların ayrımında kullanılan enzim testidir.",
    "preAnswerSafeDefinition": "Bazı streptokok ve enterokokların ayrımında kullanılan enzim testidir.",
    "shortDefinition": "Bazı streptokok ve enterokokların ayrımında kullanılan enzim testidir.",
    "detailedExplanation": "Bazı streptokok ve enterokokların ayrımında kullanılan enzim testidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "S. pyogenes ve enterokoklar PYR pozitifliğiyle klasik olarak hatırlanır.",
    "tusPearl": "S. pyogenes ve enterokoklar PYR pozitifliğiyle klasik olarak hatırlanır.",
    "differentialPoint": "S. agalactiae CAMP pozitifliğiyle ayrılır.",
    "clinicalRelevance": "S. pyogenes ve enterokoklar PYR pozitifliğiyle klasik olarak hatırlanır.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "PYR testi",
      "PYR positive",
      "Mikrobiyoloji testi"
    ]
  },
  {
    "term": "Indol testi",
    "aliases": [
      "indole test"
    ],
    "category": "Mikrobiyoloji testi",
    "previewDefinition": "Triptofandan indol oluşturma kapasitesini değerlendiren biyokimyasal testtir.",
    "preAnswerSafeDefinition": "Triptofandan indol oluşturma kapasitesini değerlendiren biyokimyasal testtir.",
    "shortDefinition": "Triptofandan indol oluşturma kapasitesini değerlendiren biyokimyasal testtir.",
    "detailedExplanation": "Triptofandan indol oluşturma kapasitesini değerlendiren biyokimyasal testtir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "E. coli indol pozitif, Klebsiella pneumoniae indol negatif klasik ayrımdır.",
    "tusPearl": "E. coli indol pozitif, Klebsiella pneumoniae indol negatif klasik ayrımdır.",
    "differentialPoint": "Laktoz fermentasyonu tek başına tür ayırımı için yeterli değildir.",
    "clinicalRelevance": "E. coli indol pozitif, Klebsiella pneumoniae indol negatif klasik ayrımdır.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Indol testi",
      "indole test",
      "Mikrobiyoloji testi"
    ]
  },
  {
    "term": "Laktoz fermentasyonu",
    "aliases": [
      "lactose fermentation"
    ],
    "category": "Mikrobiyoloji",
    "previewDefinition": "Enterik bakterilerin laktozu fermente edip etmediğini gösteren özellik/agar bulgusudur.",
    "preAnswerSafeDefinition": "Enterik bakterilerin laktozu fermente edip etmediğini gösteren özellik/agar bulgusudur.",
    "shortDefinition": "Enterik bakterilerin laktozu fermente edip etmediğini gösteren özellik/agar bulgusudur.",
    "detailedExplanation": "Enterik bakterilerin laktozu fermente edip etmediğini gösteren özellik/agar bulgusudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "MacConkey agarda E. coli ve Klebsiella laktoz fermenter; Salmonella/Shigella nonfermenter olarak öğretilir.",
    "tusPearl": "MacConkey agarda E. coli ve Klebsiella laktoz fermenter; Salmonella/Shigella nonfermenter olarak öğretilir.",
    "differentialPoint": "H2S üretimi Salmonella için ek ipucu olabilir.",
    "clinicalRelevance": "MacConkey agarda E. coli ve Klebsiella laktoz fermenter; Salmonella/Shigella nonfermenter olarak öğretilir.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Laktoz fermentasyonu",
      "lactose fermentation",
      "Mikrobiyoloji"
    ]
  },
  {
    "term": "Ureaz pozitifliği",
    "aliases": [
      "urease positive"
    ],
    "category": "Mikrobiyoloji",
    "previewDefinition": "Üreyi amonyağa parçalayan ureaz enzimi aktivitesidir.",
    "preAnswerSafeDefinition": "Üreyi amonyağa parçalayan ureaz enzimi aktivitesidir.",
    "shortDefinition": "Üreyi amonyağa parçalayan ureaz enzimi aktivitesidir.",
    "detailedExplanation": "Üreyi amonyağa parçalayan ureaz enzimi aktivitesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Proteus, Helicobacter pylori ve bazı Klebsiella türleri ureaz pozitifliğiyle hatırlanır.",
    "tusPearl": "Proteus, Helicobacter pylori ve bazı Klebsiella türleri ureaz pozitifliğiyle hatırlanır.",
    "differentialPoint": "Koagülaz testi stafilokok ayrımı içindir.",
    "clinicalRelevance": "Proteus, Helicobacter pylori ve bazı Klebsiella türleri ureaz pozitifliğiyle hatırlanır.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Ureaz pozitifliği",
      "urease positive",
      "Mikrobiyoloji"
    ]
  },
  {
    "term": "H2S üretimi",
    "aliases": [
      "hydrogen sulfide production"
    ],
    "category": "Mikrobiyoloji",
    "previewDefinition": "Bazı bakterilerin hidrojen sülfür üretmesiyle agar üzerinde siyahlaşma oluşmasıdır.",
    "preAnswerSafeDefinition": "Bazı bakterilerin hidrojen sülfür üretmesiyle agar üzerinde siyahlaşma oluşmasıdır.",
    "shortDefinition": "Bazı bakterilerin hidrojen sülfür üretmesiyle agar üzerinde siyahlaşma oluşmasıdır.",
    "detailedExplanation": "Bazı bakterilerin hidrojen sülfür üretmesiyle agar üzerinde siyahlaşma oluşmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Salmonella H2S üretimiyle Shigella’dan ayrımda klasik ipucu verir.",
    "tusPearl": "Salmonella H2S üretimiyle Shigella’dan ayrımda klasik ipucu verir.",
    "differentialPoint": "Laktoz fermentasyonu farklı bir metabolik özelliktir.",
    "clinicalRelevance": "Salmonella H2S üretimiyle Shigella’dan ayrımda klasik ipucu verir.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "H2S üretimi",
      "hydrogen sulfide production",
      "Mikrobiyoloji"
    ]
  },
  {
    "term": "Oksidaz pozitifliği",
    "aliases": [
      "oxidase positive"
    ],
    "category": "Mikrobiyoloji",
    "previewDefinition": "Sitokrom c oksidaz enzim aktivitesini gösteren testtir.",
    "preAnswerSafeDefinition": "Sitokrom c oksidaz enzim aktivitesini gösteren testtir.",
    "shortDefinition": "Sitokrom c oksidaz enzim aktivitesini gösteren testtir.",
    "detailedExplanation": "Sitokrom c oksidaz enzim aktivitesini gösteren testtir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Pseudomonas ve Neisseria oksidaz pozitifliğiyle hatırlanır.",
    "tusPearl": "Pseudomonas ve Neisseria oksidaz pozitifliğiyle hatırlanır.",
    "differentialPoint": "Enterobacterales çoğunlukla oksidaz negatiftir.",
    "clinicalRelevance": "Pseudomonas ve Neisseria oksidaz pozitifliğiyle hatırlanır.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Oksidaz pozitifliği",
      "oxidase positive",
      "Mikrobiyoloji"
    ]
  },
  {
    "term": "Biofilm",
    "aliases": [
      "biyofilm"
    ],
    "category": "Mikrobiyoloji",
    "previewDefinition": "Mikroorganizmaların yüzeye tutunup matriks içinde topluluk oluşturmasıdır.",
    "preAnswerSafeDefinition": "Mikroorganizmaların yüzeye tutunup matriks içinde topluluk oluşturmasıdır.",
    "shortDefinition": "Mikroorganizmaların yüzeye tutunup matriks içinde topluluk oluşturmasıdır.",
    "detailedExplanation": "Mikroorganizmaların yüzeye tutunup matriks içinde topluluk oluşturmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "S. epidermidis protez kateter enfeksiyonlarında biofilm nedeniyle önemlidir.",
    "tusPearl": "S. epidermidis protez kateter enfeksiyonlarında biofilm nedeniyle önemlidir.",
    "differentialPoint": "S. aureus daha virülan ve koagülaz pozitiftir.",
    "clinicalRelevance": "S. epidermidis protez kateter enfeksiyonlarında biofilm nedeniyle önemlidir.",
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
      "Biofilm",
      "biyofilm",
      "Mikrobiyoloji"
    ]
  },
  {
    "term": "Kapsül",
    "aliases": [
      "capsule"
    ],
    "category": "Mikrobiyoloji virülans",
    "previewDefinition": "Bakterinin fagositozdan kaçmasına yardım eden polisakkarit/protein yapı olabilir.",
    "preAnswerSafeDefinition": "Bakterinin fagositozdan kaçmasına yardım eden polisakkarit/protein yapı olabilir.",
    "shortDefinition": "Bakterinin fagositozdan kaçmasına yardım eden polisakkarit/protein yapı olabilir.",
    "detailedExplanation": "Bakterinin fagositozdan kaçmasına yardım eden polisakkarit/protein yapı olabilir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Kapsüllü bakteriler splenektomili hastada ciddi enfeksiyon riski oluşturur.",
    "tusPearl": "Kapsüllü bakteriler splenektomili hastada ciddi enfeksiyon riski oluşturur.",
    "differentialPoint": "Spor çevresel direnç yapısıdır; kapsül antiphagositik virülans faktörüdür.",
    "clinicalRelevance": "Kapsüllü bakteriler splenektomili hastada ciddi enfeksiyon riski oluşturur.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology",
      "immunology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Kapsül",
      "capsule",
      "Mikrobiyoloji virülans"
    ]
  },
  {
    "term": "Spor",
    "aliases": [
      "endospore"
    ],
    "category": "Mikrobiyoloji",
    "previewDefinition": "Bazı bakterilerin çevresel koşullara dirençli dormant formudur.",
    "preAnswerSafeDefinition": "Bazı bakterilerin çevresel koşullara dirençli dormant formudur.",
    "shortDefinition": "Bazı bakterilerin çevresel koşullara dirençli dormant formudur.",
    "detailedExplanation": "Bazı bakterilerin çevresel koşullara dirençli dormant formudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Bacillus ve Clostridium spor oluşturan Gram pozitif çomaklar olarak klasik sınıflanır.",
    "tusPearl": "Bacillus ve Clostridium spor oluşturan Gram pozitif çomaklar olarak klasik sınıflanır.",
    "differentialPoint": "Kapsül fagositozdan kaçışla ilişkilidir.",
    "clinicalRelevance": "Bacillus ve Clostridium spor oluşturan Gram pozitif çomaklar olarak klasik sınıflanır.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Spor",
      "endospore",
      "Mikrobiyoloji"
    ]
  },
  {
    "term": "IgA proteaz",
    "aliases": [
      "IgA protease"
    ],
    "category": "Mikrobiyoloji virülans",
    "previewDefinition": "Mukozal IgA’yı parçalayarak kolonizasyona katkı sağlayan enzimdir.",
    "preAnswerSafeDefinition": "Mukozal IgA’yı parçalayarak kolonizasyona katkı sağlayan enzimdir.",
    "shortDefinition": "Mukozal IgA’yı parçalayarak kolonizasyona katkı sağlayan enzimdir.",
    "detailedExplanation": "Mukozal IgA’yı parçalayarak kolonizasyona katkı sağlayan enzimdir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Neisseria, S. pneumoniae ve H. influenzae gibi mukozal patojenlerde klasik virülans faktörüdür.",
    "tusPearl": "Neisseria, S. pneumoniae ve H. influenzae gibi mukozal patojenlerde klasik virülans faktörüdür.",
    "differentialPoint": "Koagülaz S. aureus ayrımıyla ilişkilidir.",
    "clinicalRelevance": "Neisseria, S. pneumoniae ve H. influenzae gibi mukozal patojenlerde klasik virülans faktörüdür.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology",
      "immunology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "IgA proteaz",
      "IgA protease",
      "Mikrobiyoloji virülans"
    ]
  },
  {
    "term": "Endotoksin",
    "aliases": [
      "LPS",
      "lipid A"
    ],
    "category": "Mikrobiyoloji / İmmünoloji",
    "previewDefinition": "Gram negatif bakterilerin dış membranındaki lipopolisakkarit yapıdır.",
    "preAnswerSafeDefinition": "Gram negatif bakterilerin dış membranındaki lipopolisakkarit yapıdır.",
    "shortDefinition": "Gram negatif bakterilerin dış membranındaki lipopolisakkarit yapıdır.",
    "detailedExplanation": "Gram negatif bakterilerin dış membranındaki lipopolisakkarit yapıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Lipid A sepsis ve şokta güçlü inflamatuvar yanıtı tetikler.",
    "tusPearl": "Lipid A sepsis ve şokta güçlü inflamatuvar yanıtı tetikler.",
    "differentialPoint": "Ekzotoksinler genellikle salgılanan protein toksinleridir.",
    "clinicalRelevance": "Lipid A sepsis ve şokta güçlü inflamatuvar yanıtı tetikler.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology",
      "immunology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Endotoksin",
      "LPS",
      "lipid A",
      "Mikrobiyoloji / İmmünoloji"
    ]
  },
  {
    "term": "Ekzotoksin",
    "aliases": [
      "exotoxin"
    ],
    "category": "Mikrobiyoloji",
    "previewDefinition": "Bakteriler tarafından salgılanabilen protein toksinlerdir.",
    "preAnswerSafeDefinition": "Bakteriler tarafından salgılanabilen protein toksinlerdir.",
    "shortDefinition": "Bakteriler tarafından salgılanabilen protein toksinlerdir.",
    "detailedExplanation": "Bakteriler tarafından salgılanabilen protein toksinlerdir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Difteri, tetanoz, botulizm ve kolera toksinleri mekanizma sorularında sık gelir.",
    "tusPearl": "Difteri, tetanoz, botulizm ve kolera toksinleri mekanizma sorularında sık gelir.",
    "differentialPoint": "Endotoksin Gram negatif dış membran LPS bileşenidir.",
    "clinicalRelevance": "Difteri, tetanoz, botulizm ve kolera toksinleri mekanizma sorularında sık gelir.",
    "mechanism": "",
    "relatedBranches": [
      "microbiology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Ekzotoksin",
      "exotoxin",
      "Mikrobiyoloji"
    ]
  },
  {
    "term": "Toksik şok sendromu toksini",
    "aliases": [
      "TSST-1",
      "toxic shock syndrome toxin"
    ],
    "category": "Mikrobiyoloji toksini",
    "previewDefinition": "S. aureus’un süperantijen etkili toksinidir.",
    "preAnswerSafeDefinition": "S. aureus’un süperantijen etkili toksinidir.",
    "shortDefinition": "S. aureus’un süperantijen etkili toksinidir.",
    "detailedExplanation": "S. aureus’un süperantijen etkili toksinidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Ateş, hipotansiyon, yaygın döküntü ve çoklu organ etkilenimi toksik şok sendromunu düşündürür.",
    "tusPearl": "Ateş, hipotansiyon, yaygın döküntü ve çoklu organ etkilenimi toksik şok sendromunu düşündürür.",
    "differentialPoint": "Streptokokal toksik şokta invaziv GAS enfeksiyonu ve nekrotizan fasiit eşlik edebilir.",
    "clinicalRelevance": "Ateş, hipotansiyon, yaygın döküntü ve çoklu organ etkilenimi toksik şok sendromunu düşündürür.",
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
      "Toksik şok sendromu toksini",
      "TSST-1",
      "toxic shock syndrome toxin",
      "Mikrobiyoloji toksini"
    ]
  },
  {
    "term": "Süperantijen",
    "aliases": [
      "superantigen"
    ],
    "category": "İmmünoloji",
    "previewDefinition": "T hücre reseptörü ve MHC II’yi antijen özgüllüğü dışında çapraz bağlayarak yaygın T hücre aktivasyonu yapan moleküldür.",
    "preAnswerSafeDefinition": "T hücre reseptörü ve MHC II’yi antijen özgüllüğü dışında çapraz bağlayarak yaygın T hücre aktivasyonu yapan moleküldür.",
    "shortDefinition": "T hücre reseptörü ve MHC II’yi antijen özgüllüğü dışında çapraz bağlayarak yaygın T hücre aktivasyonu yapan moleküldür.",
    "detailedExplanation": "T hücre reseptörü ve MHC II’yi antijen özgüllüğü dışında çapraz bağlayarak yaygın T hücre aktivasyonu yapan moleküldür. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Toksik şok sendromu ve kızıl gibi tablolarda sitokin fırtınası mantığı sorulur.",
    "tusPearl": "Toksik şok sendromu ve kızıl gibi tablolarda sitokin fırtınası mantığı sorulur.",
    "differentialPoint": "Klasik antijen sunumunda sınırlı antijen özgül T hücre aktivasyonu olur.",
    "clinicalRelevance": "Toksik şok sendromu ve kızıl gibi tablolarda sitokin fırtınası mantığı sorulur.",
    "mechanism": "",
    "relatedBranches": [
      "immunology",
      "microbiology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Süperantijen",
      "superantigen",
      "İmmünoloji"
    ]
  },
  {
    "term": "Digoksin",
    "aliases": [
      "digoxin"
    ],
    "category": "Kardiyak glikozid",
    "previewDefinition": "Na/K ATPaz inhibisyonu ile inotropiyi artıran dar terapötik indeksli ilaçtır.",
    "preAnswerSafeDefinition": "Na/K ATPaz inhibisyonu ile inotropiyi artıran dar terapötik indeksli ilaçtır.",
    "shortDefinition": "Na/K ATPaz inhibisyonu ile inotropiyi artıran dar terapötik indeksli ilaçtır.",
    "detailedExplanation": "Na/K ATPaz inhibisyonu ile inotropiyi artıran dar terapötik indeksli ilaçtır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Sarı görme, aritmi ve hipokalemiyle toksisite riski digoksin için yüksek verimli bilgidir.",
    "tusPearl": "Sarı görme, aritmi ve hipokalemiyle toksisite riski digoksin için yüksek verimli bilgidir.",
    "differentialPoint": "Beta blokerler adrenerjik reseptör antagonizmasıyla etki eder.",
    "clinicalRelevance": "Sarı görme, aritmi ve hipokalemiyle toksisite riski digoksin için yüksek verimli bilgidir.",
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
      "Digoksin",
      "digoxin",
      "Kardiyak glikozid"
    ]
  },
  {
    "term": "Digoksin toksisitesi",
    "aliases": [
      "digitalis toxicity"
    ],
    "category": "Toksikoloji",
    "previewDefinition": "Digoksin düzeyi veya duyarlılığının artmasıyla aritmi ve gastrointestinal/nörolojik bulgular gelişmesidir.",
    "preAnswerSafeDefinition": "Digoksin düzeyi veya duyarlılığının artmasıyla aritmi ve gastrointestinal/nörolojik bulgular gelişmesidir.",
    "shortDefinition": "Digoksin düzeyi veya duyarlılığının artmasıyla aritmi ve gastrointestinal/nörolojik bulgular gelişmesidir.",
    "detailedExplanation": "Digoksin düzeyi veya duyarlılığının artmasıyla aritmi ve gastrointestinal/nörolojik bulgular gelişmesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Hipokalemi digoksin toksisitesini artırır; ciddi toksisitede digoksin-Fab kullanılabilir.",
    "tusPearl": "Hipokalemi digoksin toksisitesini artırır; ciddi toksisitede digoksin-Fab kullanılabilir.",
    "differentialPoint": "Hiperkalemi akut ağır toksisitede kötü prognostik olabilir.",
    "clinicalRelevance": "Hipokalemi digoksin toksisitesini artırır; ciddi toksisitede digoksin-Fab kullanılabilir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "emergency-medicine",
      "cardiovascular"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Digoksin toksisitesi",
      "digitalis toxicity",
      "Toksikoloji"
    ]
  },
  {
    "term": "Statin",
    "aliases": [
      "HMG-CoA redüktaz inhibitörü"
    ],
    "category": "İlaç grubu",
    "previewDefinition": "HMG-CoA redüktaz inhibitörü olarak kolesterol sentezini azaltan ilaç grubudur.",
    "preAnswerSafeDefinition": "HMG-CoA redüktaz inhibitörü olarak kolesterol sentezini azaltan ilaç grubudur.",
    "shortDefinition": "HMG-CoA redüktaz inhibitörü olarak kolesterol sentezini azaltan ilaç grubudur.",
    "detailedExplanation": "HMG-CoA redüktaz inhibitörü olarak kolesterol sentezini azaltan ilaç grubudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Miyopati/rabdomiyoliz ve karaciğer enzim takibi statinlerde klasik yan etki bilgisidir.",
    "tusPearl": "Miyopati/rabdomiyoliz ve karaciğer enzim takibi statinlerde klasik yan etki bilgisidir.",
    "differentialPoint": "Fibratlar trigliserid düşürmede daha öne çıkar.",
    "clinicalRelevance": "Miyopati/rabdomiyoliz ve karaciğer enzim takibi statinlerde klasik yan etki bilgisidir.",
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
      "Statin",
      "HMG-CoA redüktaz inhibitörü",
      "İlaç grubu"
    ]
  },
  {
    "term": "Fibrat",
    "aliases": [
      "fenofibrat",
      "gemfibrozil"
    ],
    "category": "İlaç grubu",
    "previewDefinition": "PPAR-alfa aktivasyonu ile trigliserid düzeylerini düşüren ilaç grubudur.",
    "preAnswerSafeDefinition": "PPAR-alfa aktivasyonu ile trigliserid düzeylerini düşüren ilaç grubudur.",
    "shortDefinition": "PPAR-alfa aktivasyonu ile trigliserid düzeylerini düşüren ilaç grubudur.",
    "detailedExplanation": "PPAR-alfa aktivasyonu ile trigliserid düzeylerini düşüren ilaç grubudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Hipertrigliseridemide pankreatit riskini azaltma bağlamında sorulabilir.",
    "tusPearl": "Hipertrigliseridemide pankreatit riskini azaltma bağlamında sorulabilir.",
    "differentialPoint": "Statinler LDL düşürmede temel ilaç grubudur.",
    "clinicalRelevance": "Hipertrigliseridemide pankreatit riskini azaltma bağlamında sorulabilir.",
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
      "Fibrat",
      "fenofibrat",
      "gemfibrozil",
      "İlaç grubu"
    ]
  },
  {
    "term": "Makrolid",
    "aliases": [
      "azitromisin",
      "klaritromisin",
      "erythromycin"
    ],
    "category": "Antibiyotik grubu",
    "previewDefinition": "50S ribozomal alt birimine bağlanarak protein sentezini inhibe eden antibiyotik grubudur.",
    "preAnswerSafeDefinition": "50S ribozomal alt birimine bağlanarak protein sentezini inhibe eden antibiyotik grubudur.",
    "shortDefinition": "50S ribozomal alt birimine bağlanarak protein sentezini inhibe eden antibiyotik grubudur.",
    "detailedExplanation": "50S ribozomal alt birimine bağlanarak protein sentezini inhibe eden antibiyotik grubudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Atipik pnömoni tedavisi, QT uzaması ve CYP etkileşimi yüksek verimli bilgilerdir.",
    "tusPearl": "Atipik pnömoni tedavisi, QT uzaması ve CYP etkileşimi yüksek verimli bilgilerdir.",
    "differentialPoint": "Aminoglikozidler 30S üzerinden etki eder ve nefro/ototoksisite yapabilir.",
    "clinicalRelevance": "Atipik pnömoni tedavisi, QT uzaması ve CYP etkileşimi yüksek verimli bilgilerdir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "infectious-diseases"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Makrolid",
      "azitromisin",
      "klaritromisin",
      "erythromycin",
      "Antibiyotik grubu"
    ]
  },
  {
    "term": "Aminoglikozid",
    "aliases": [
      "gentamisin",
      "amikasin",
      "streptomisin"
    ],
    "category": "Antibiyotik grubu",
    "previewDefinition": "30S ribozomal alt birime bağlanan bakterisidal antibiyotik grubudur.",
    "preAnswerSafeDefinition": "30S ribozomal alt birime bağlanan bakterisidal antibiyotik grubudur.",
    "shortDefinition": "30S ribozomal alt birime bağlanan bakterisidal antibiyotik grubudur.",
    "detailedExplanation": "30S ribozomal alt birime bağlanan bakterisidal antibiyotik grubudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Nefrotoksisite, ototoksisite ve aerob Gram negatif etkinlik klasik bilgilerdir.",
    "tusPearl": "Nefrotoksisite, ototoksisite ve aerob Gram negatif etkinlik klasik bilgilerdir.",
    "differentialPoint": "Makrolidler 50S üzerinden bakteriostatik etki gösterir.",
    "clinicalRelevance": "Nefrotoksisite, ototoksisite ve aerob Gram negatif etkinlik klasik bilgilerdir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "microbiology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Aminoglikozid",
      "gentamisin",
      "amikasin",
      "streptomisin",
      "Antibiyotik grubu"
    ]
  },
  {
    "term": "Florokinolon",
    "aliases": [
      "siprofloksasin",
      "levofloksasin",
      "fluoroquinolone"
    ],
    "category": "Antibiyotik grubu",
    "previewDefinition": "DNA giraz/topoizomeraz inhibisyonu yapan antibiyotik grubudur.",
    "preAnswerSafeDefinition": "DNA giraz/topoizomeraz inhibisyonu yapan antibiyotik grubudur.",
    "shortDefinition": "DNA giraz/topoizomeraz inhibisyonu yapan antibiyotik grubudur.",
    "detailedExplanation": "DNA giraz/topoizomeraz inhibisyonu yapan antibiyotik grubudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Tendinopati, QT uzaması ve çocuk/gebelikte kıkırdak toksisitesi uyarıları önemlidir.",
    "tusPearl": "Tendinopati, QT uzaması ve çocuk/gebelikte kıkırdak toksisitesi uyarıları önemlidir.",
    "differentialPoint": "Beta-laktamlar hücre duvarı sentezini hedefler.",
    "clinicalRelevance": "Tendinopati, QT uzaması ve çocuk/gebelikte kıkırdak toksisitesi uyarıları önemlidir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "infectious-diseases"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Florokinolon",
      "siprofloksasin",
      "levofloksasin",
      "fluoroquinolone",
      "Antibiyotik grubu"
    ]
  },
  {
    "term": "Beta-laktam antibiyotik",
    "aliases": [
      "beta lactam",
      "penisilin",
      "sefalosporin"
    ],
    "category": "Antibiyotik grubu",
    "previewDefinition": "Hücre duvarı peptidoglikan sentezini inhibe eden antibiyotik sınıfıdır.",
    "preAnswerSafeDefinition": "Hücre duvarı peptidoglikan sentezini inhibe eden antibiyotik sınıfıdır.",
    "shortDefinition": "Hücre duvarı peptidoglikan sentezini inhibe eden antibiyotik sınıfıdır.",
    "detailedExplanation": "Hücre duvarı peptidoglikan sentezini inhibe eden antibiyotik sınıfıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Penisilinler, sefalosporinler, karbapenemler ve monobaktamlar bu sınıftadır.",
    "tusPearl": "Penisilinler, sefalosporinler, karbapenemler ve monobaktamlar bu sınıftadır.",
    "differentialPoint": "Makrolidler protein sentezini hedefler.",
    "clinicalRelevance": "Penisilinler, sefalosporinler, karbapenemler ve monobaktamlar bu sınıftadır.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "microbiology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Beta-laktam antibiyotik",
      "beta lactam",
      "penisilin",
      "sefalosporin",
      "Antibiyotik grubu"
    ]
  },
  {
    "term": "Vankomisin",
    "aliases": [
      "vancomycin"
    ],
    "category": "Antibiyotik",
    "previewDefinition": "Gram pozitif bakterilerde hücre duvarı sentezini inhibe eden glikopeptiddir.",
    "preAnswerSafeDefinition": "Gram pozitif bakterilerde hücre duvarı sentezini inhibe eden glikopeptiddir.",
    "shortDefinition": "Gram pozitif bakterilerde hücre duvarı sentezini inhibe eden glikopeptiddir.",
    "detailedExplanation": "Gram pozitif bakterilerde hücre duvarı sentezini inhibe eden glikopeptiddir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "MRSA ve ciddi Gram pozitif enfeksiyonlarda kullanılır; red man sendromu ve nefrotoksisite önemlidir.",
    "tusPearl": "MRSA ve ciddi Gram pozitif enfeksiyonlarda kullanılır; red man sendromu ve nefrotoksisite önemlidir.",
    "differentialPoint": "Gram negatif dış membran nedeniyle vankomisin çoğu Gram negatifte etkisizdir.",
    "clinicalRelevance": "MRSA ve ciddi Gram pozitif enfeksiyonlarda kullanılır; red man sendromu ve nefrotoksisite önemlidir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "infectious-diseases"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Vankomisin",
      "vancomycin",
      "Antibiyotik"
    ]
  },
  {
    "term": "Metronidazol",
    "aliases": [
      "metronidazole"
    ],
    "category": "Antibiyotik / Antiprotozoal",
    "previewDefinition": "Anaerob bakteriler ve bazı protozoonlara etkili nitroimidazol türevidir.",
    "preAnswerSafeDefinition": "Anaerob bakteriler ve bazı protozoonlara etkili nitroimidazol türevidir.",
    "shortDefinition": "Anaerob bakteriler ve bazı protozoonlara etkili nitroimidazol türevidir.",
    "detailedExplanation": "Anaerob bakteriler ve bazı protozoonlara etkili nitroimidazol türevidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Anaerob enfeksiyon, C. difficile ve Giardia/Trichomonas bağlamında sık sorulur.",
    "tusPearl": "Anaerob enfeksiyon, C. difficile ve Giardia/Trichomonas bağlamında sık sorulur.",
    "differentialPoint": "Alkolle disülfiram benzeri reaksiyon uyarısı klasik bilgidir.",
    "clinicalRelevance": "Anaerob enfeksiyon, C. difficile ve Giardia/Trichomonas bağlamında sık sorulur.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "infectious-diseases"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Metronidazol",
      "metronidazole",
      "Antibiyotik / Antiprotozoal"
    ]
  },
  {
    "term": "İzoniazid",
    "aliases": [
      "INH",
      "isoniazid"
    ],
    "category": "Antitüberküloz ilaç",
    "previewDefinition": "Mikolik asit sentezini inhibe eden birinci basamak tüberküloz ilacıdır.",
    "preAnswerSafeDefinition": "Mikolik asit sentezini inhibe eden birinci basamak tüberküloz ilacıdır.",
    "shortDefinition": "Mikolik asit sentezini inhibe eden birinci basamak tüberküloz ilacıdır.",
    "detailedExplanation": "Mikolik asit sentezini inhibe eden birinci basamak tüberküloz ilacıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Periferik nöropatiyi önlemek için piridoksin eklenmesi klasik bilgidir.",
    "tusPearl": "Periferik nöropatiyi önlemek için piridoksin eklenmesi klasik bilgidir.",
    "differentialPoint": "Rifampisin güçlü CYP indükleyicidir ve turuncu vücut sıvıları yapabilir.",
    "clinicalRelevance": "Periferik nöropatiyi önlemek için piridoksin eklenmesi klasik bilgidir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "infectious-diseases"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "İzoniazid",
      "INH",
      "isoniazid",
      "Antitüberküloz ilaç"
    ]
  },
  {
    "term": "Rifampisin",
    "aliases": [
      "rifampin"
    ],
    "category": "Antitüberküloz ilaç",
    "previewDefinition": "DNA bağımlı RNA polimerazı inhibe eden antitüberküloz ajandır.",
    "preAnswerSafeDefinition": "DNA bağımlı RNA polimerazı inhibe eden antitüberküloz ajandır.",
    "shortDefinition": "DNA bağımlı RNA polimerazı inhibe eden antitüberküloz ajandır.",
    "detailedExplanation": "DNA bağımlı RNA polimerazı inhibe eden antitüberküloz ajandır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "CYP indüksiyonu ve turuncu vücut sıvıları rifampisin için klasik yan etki bilgisidir.",
    "tusPearl": "CYP indüksiyonu ve turuncu vücut sıvıları rifampisin için klasik yan etki bilgisidir.",
    "differentialPoint": "İzoniazid periferik nöropati ve hepatotoksisiteyle hatırlanır.",
    "clinicalRelevance": "CYP indüksiyonu ve turuncu vücut sıvıları rifampisin için klasik yan etki bilgisidir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "infectious-diseases"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Rifampisin",
      "rifampin",
      "Antitüberküloz ilaç"
    ]
  },
  {
    "term": "Etambutol",
    "aliases": [
      "ethambutol"
    ],
    "category": "Antitüberküloz ilaç",
    "previewDefinition": "Arabinogalaktan sentezini bozarak mikobakteri hücre duvarını etkileyen ilaçtır.",
    "preAnswerSafeDefinition": "Arabinogalaktan sentezini bozarak mikobakteri hücre duvarını etkileyen ilaçtır.",
    "shortDefinition": "Arabinogalaktan sentezini bozarak mikobakteri hücre duvarını etkileyen ilaçtır.",
    "detailedExplanation": "Arabinogalaktan sentezini bozarak mikobakteri hücre duvarını etkileyen ilaçtır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Optik nörit ve kırmızı-yeşil renk körlüğü etambutol için klasik yan etkidir.",
    "tusPearl": "Optik nörit ve kırmızı-yeşil renk körlüğü etambutol için klasik yan etkidir.",
    "differentialPoint": "Pirazinamid hiperürisemi ve hepatotoksisiteyle daha ilişkilidir.",
    "clinicalRelevance": "Optik nörit ve kırmızı-yeşil renk körlüğü etambutol için klasik yan etkidir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "infectious-diseases",
      "ophthalmology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Etambutol",
      "ethambutol",
      "Antitüberküloz ilaç"
    ]
  },
  {
    "term": "Pirazinamid",
    "aliases": [
      "pyrazinamide",
      "PZA"
    ],
    "category": "Antitüberküloz ilaç",
    "previewDefinition": "Asidik ortamda etkili antitüberküloz ilaçtır.",
    "preAnswerSafeDefinition": "Asidik ortamda etkili antitüberküloz ilaçtır.",
    "shortDefinition": "Asidik ortamda etkili antitüberküloz ilaçtır.",
    "detailedExplanation": "Asidik ortamda etkili antitüberküloz ilaçtır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Hiperürisemi ve hepatotoksisite pirazinamid için yüksek verimli yan etkilerdir.",
    "tusPearl": "Hiperürisemi ve hepatotoksisite pirazinamid için yüksek verimli yan etkilerdir.",
    "differentialPoint": "Etambutol optik nörit yapabilir.",
    "clinicalRelevance": "Hiperürisemi ve hepatotoksisite pirazinamid için yüksek verimli yan etkilerdir.",
    "mechanism": "",
    "relatedBranches": [
      "pharmacology",
      "infectious-diseases"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Pirazinamid",
      "pyrazinamide",
      "PZA",
      "Antitüberküloz ilaç"
    ]
  },
  {
    "term": "hCG",
    "aliases": [
      "beta-hCG",
      "human chorionic gonadotropin"
    ],
    "category": "Hormon / Laboratuvar",
    "previewDefinition": "Trofoblastlar tarafından üretilen ve gebelik testlerinde ölçülen hormondur.",
    "preAnswerSafeDefinition": "Trofoblastlar tarafından üretilen ve gebelik testlerinde ölçülen hormondur.",
    "shortDefinition": "Trofoblastlar tarafından üretilen ve gebelik testlerinde ölçülen hormondur.",
    "detailedExplanation": "Trofoblastlar tarafından üretilen ve gebelik testlerinde ölçülen hormondur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Ektopik gebelik ve mol gebelikte seri beta-hCG dinamiği tanısal süreçte önemlidir.",
    "tusPearl": "Ektopik gebelik ve mol gebelikte seri beta-hCG dinamiği tanısal süreçte önemlidir.",
    "differentialPoint": "Progesteron korpus luteum/gebelik desteğiyle ilişkilidir.",
    "clinicalRelevance": "Ektopik gebelik ve mol gebelikte seri beta-hCG dinamiği tanısal süreçte önemlidir.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics",
      "biochemistry"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "hCG",
      "beta-hCG",
      "human chorionic gonadotropin",
      "Hormon / Laboratuvar"
    ]
  },
  {
    "term": "Molar gebelik",
    "aliases": [
      "hidatidiform mole",
      "mola hidatiform"
    ],
    "category": "Obstetrik patoloji",
    "previewDefinition": "Anormal trofoblast proliferasyonu ve hidropik villuslarla seyreden gestasyonel trofoblastik hastalıktır.",
    "preAnswerSafeDefinition": "Anormal trofoblast proliferasyonu ve hidropik villuslarla seyreden gestasyonel trofoblastik hastalıktır.",
    "shortDefinition": "Anormal trofoblast proliferasyonu ve hidropik villuslarla seyreden gestasyonel trofoblastik hastalıktır.",
    "detailedExplanation": "Anormal trofoblast proliferasyonu ve hidropik villuslarla seyreden gestasyonel trofoblastik hastalıktır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Çok yüksek beta-hCG, üzüm tanesi görünümü ve kanama mol gebelik düşündürür.",
    "tusPearl": "Çok yüksek beta-hCG, üzüm tanesi görünümü ve kanama mol gebelik düşündürür.",
    "differentialPoint": "Ektopik gebelikte uterus dışında gebelik yerleşimi vardır.",
    "clinicalRelevance": "Çok yüksek beta-hCG, üzüm tanesi görünümü ve kanama mol gebelik düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics",
      "pathology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Molar gebelik",
      "hidatidiform mole",
      "mola hidatiform",
      "Obstetrik patoloji"
    ]
  },
  {
    "term": "Koryokarsinom",
    "aliases": [
      "choriocarcinoma"
    ],
    "category": "Onkoloji / Kadın doğum",
    "previewDefinition": "Trofoblastik dokudan gelişen malign tümördür.",
    "preAnswerSafeDefinition": "Trofoblastik dokudan gelişen malign tümördür.",
    "shortDefinition": "Trofoblastik dokudan gelişen malign tümördür.",
    "detailedExplanation": "Trofoblastik dokudan gelişen malign tümördür. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Gebelik sonrası yüksek beta-hCG ve erken hematojen yayılım koryokarsinom için önemlidir.",
    "tusPearl": "Gebelik sonrası yüksek beta-hCG ve erken hematojen yayılım koryokarsinom için önemlidir.",
    "differentialPoint": "Molar gebelik benign/prekürsör spektrumda olabilir; koryokarsinom malign davranır.",
    "clinicalRelevance": "Gebelik sonrası yüksek beta-hCG ve erken hematojen yayılım koryokarsinom için önemlidir.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics",
      "oncology",
      "pathology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Koryokarsinom",
      "choriocarcinoma",
      "Onkoloji / Kadın doğum"
    ]
  },
  {
    "term": "Endometriozis",
    "aliases": [
      "endometriosis"
    ],
    "category": "Jinekoloji",
    "previewDefinition": "Endometrial benzeri dokunun uterin kavite dışında bulunmasıdır.",
    "preAnswerSafeDefinition": "Endometrial benzeri dokunun uterin kavite dışında bulunmasıdır.",
    "shortDefinition": "Endometrial benzeri dokunun uterin kavite dışında bulunmasıdır.",
    "detailedExplanation": "Endometrial benzeri dokunun uterin kavite dışında bulunmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Siklik pelvik ağrı, dismenore, disparoni ve infertilite endometriozis düşündürür.",
    "tusPearl": "Siklik pelvik ağrı, dismenore, disparoni ve infertilite endometriozis düşündürür.",
    "differentialPoint": "Adenomyoziste endometrial doku myometrium içinde yerleşir ve uterus büyüyebilir.",
    "clinicalRelevance": "Siklik pelvik ağrı, dismenore, disparoni ve infertilite endometriozis düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "gynecology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Endometriozis",
      "endometriosis",
      "Jinekoloji"
    ]
  },
  {
    "term": "Adenomyozis",
    "aliases": [
      "adenomyosis"
    ],
    "category": "Jinekoloji",
    "previewDefinition": "Endometrial bez ve stromanın myometrium içinde bulunmasıdır.",
    "preAnswerSafeDefinition": "Endometrial bez ve stromanın myometrium içinde bulunmasıdır.",
    "shortDefinition": "Endometrial bez ve stromanın myometrium içinde bulunmasıdır.",
    "detailedExplanation": "Endometrial bez ve stromanın myometrium içinde bulunmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Multipar kadında ağrılı, yoğun adet kanaması ve diffüz büyümüş uterus adenomyozis düşündürür.",
    "tusPearl": "Multipar kadında ağrılı, yoğun adet kanaması ve diffüz büyümüş uterus adenomyozis düşündürür.",
    "differentialPoint": "Endometriozis uterin kavite dışı odaklarla ilişkilidir.",
    "clinicalRelevance": "Multipar kadında ağrılı, yoğun adet kanaması ve diffüz büyümüş uterus adenomyozis düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "gynecology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Adenomyozis",
      "adenomyosis",
      "Jinekoloji"
    ]
  },
  {
    "term": "Polikistik over sendromu",
    "aliases": [
      "PCOS",
      "polycystic ovary syndrome"
    ],
    "category": "Endokrin / Jinekoloji",
    "previewDefinition": "Hiperandrojenizm, ovulatuvar disfonksiyon ve polikistik over morfolojisiyle seyreden sendromdur.",
    "preAnswerSafeDefinition": "Hiperandrojenizm, ovulatuvar disfonksiyon ve polikistik over morfolojisiyle seyreden sendromdur.",
    "shortDefinition": "Hiperandrojenizm, ovulatuvar disfonksiyon ve polikistik over morfolojisiyle seyreden sendromdur.",
    "detailedExplanation": "Hiperandrojenizm, ovulatuvar disfonksiyon ve polikistik over morfolojisiyle seyreden sendromdur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Oligomenore + hirsutizm + insülin direnci PCOS için klasik sınav bağlantısıdır.",
    "tusPearl": "Oligomenore + hirsutizm + insülin direnci PCOS için klasik sınav bağlantısıdır.",
    "differentialPoint": "Konjenital adrenal hiperplazi ve Cushing hiperandrojenizm ayırıcı tanısına girer.",
    "clinicalRelevance": "Oligomenore + hirsutizm + insülin direnci PCOS için klasik sınav bağlantısıdır.",
    "mechanism": "",
    "relatedBranches": [
      "gynecology",
      "endocrinology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Polikistik over sendromu",
      "PCOS",
      "polycystic ovary syndrome",
      "Endokrin / Jinekoloji"
    ]
  },
  {
    "term": "Endometriyal hiperplazi",
    "aliases": [
      "endometrial hyperplasia"
    ],
    "category": "Jinekolojik patoloji",
    "previewDefinition": "Uzamış östrojen etkisine bağlı endometrium proliferasyonudur.",
    "preAnswerSafeDefinition": "Uzamış östrojen etkisine bağlı endometrium proliferasyonudur.",
    "shortDefinition": "Uzamış östrojen etkisine bağlı endometrium proliferasyonudur.",
    "detailedExplanation": "Uzamış östrojen etkisine bağlı endometrium proliferasyonudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Anovulasyon, obezite ve karşılanmamış östrojen endometriyal hiperplazi riskini artırır.",
    "tusPearl": "Anovulasyon, obezite ve karşılanmamış östrojen endometriyal hiperplazi riskini artırır.",
    "differentialPoint": "Endometrit enfeksiyöz/inflamatuvar süreçtir.",
    "clinicalRelevance": "Anovulasyon, obezite ve karşılanmamış östrojen endometriyal hiperplazi riskini artırır.",
    "mechanism": "",
    "relatedBranches": [
      "gynecology",
      "pathology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Endometriyal hiperplazi",
      "endometrial hyperplasia",
      "Jinekolojik patoloji"
    ]
  },
  {
    "term": "Turner sendromu",
    "aliases": [
      "45,X",
      "Turner syndrome"
    ],
    "category": "Genetik",
    "previewDefinition": "45,X veya mozaik karyotiple gonadal disgenez ve kısa boyla seyreden sendromdur.",
    "preAnswerSafeDefinition": "45,X veya mozaik karyotiple gonadal disgenez ve kısa boyla seyreden sendromdur.",
    "shortDefinition": "45,X veya mozaik karyotiple gonadal disgenez ve kısa boyla seyreden sendromdur.",
    "detailedExplanation": "45,X veya mozaik karyotiple gonadal disgenez ve kısa boyla seyreden sendromdur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Kısa boy, yele boyun, koarktasyon ve streak gonad Turner için klasik ipuçlarıdır.",
    "tusPearl": "Kısa boy, yele boyun, koarktasyon ve streak gonad Turner için klasik ipuçlarıdır.",
    "differentialPoint": "Klinefelter erkek fenotipinde hipogonadizm ve uzun boyla seyreder.",
    "clinicalRelevance": "Kısa boy, yele boyun, koarktasyon ve streak gonad Turner için klasik ipuçlarıdır.",
    "mechanism": "",
    "relatedBranches": [
      "genetics",
      "endocrinology",
      "pediatrics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Turner sendromu",
      "45,X",
      "Turner syndrome",
      "Genetik"
    ]
  },
  {
    "term": "Klinefelter sendromu",
    "aliases": [
      "47,XXY",
      "Klinefelter syndrome"
    ],
    "category": "Genetik",
    "previewDefinition": "47,XXY karyotipiyle erkek hipogonadizmi ve infertilite yapan sendromdur.",
    "preAnswerSafeDefinition": "47,XXY karyotipiyle erkek hipogonadizmi ve infertilite yapan sendromdur.",
    "shortDefinition": "47,XXY karyotipiyle erkek hipogonadizmi ve infertilite yapan sendromdur.",
    "detailedExplanation": "47,XXY karyotipiyle erkek hipogonadizmi ve infertilite yapan sendromdur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Uzun boy, küçük testis, jinekomasti ve azospermi Klinefelter düşündürür.",
    "tusPearl": "Uzun boy, küçük testis, jinekomasti ve azospermi Klinefelter düşündürür.",
    "differentialPoint": "Turner sendromu 45,X kadın fenotipiyle ilişkilidir.",
    "clinicalRelevance": "Uzun boy, küçük testis, jinekomasti ve azospermi Klinefelter düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "genetics",
      "endocrinology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Klinefelter sendromu",
      "47,XXY",
      "Klinefelter syndrome",
      "Genetik"
    ]
  },
  {
    "term": "Androjen duyarsızlık sendromu",
    "aliases": [
      "AIS",
      "testiküler feminizasyon"
    ],
    "category": "Genetik / Endokrin",
    "previewDefinition": "XY bireyde androjen reseptör direnci nedeniyle dış genital fenotipin kadın yönünde gelişmesidir.",
    "preAnswerSafeDefinition": "XY bireyde androjen reseptör direnci nedeniyle dış genital fenotipin kadın yönünde gelişmesidir.",
    "shortDefinition": "XY bireyde androjen reseptör direnci nedeniyle dış genital fenotipin kadın yönünde gelişmesidir.",
    "detailedExplanation": "XY bireyde androjen reseptör direnci nedeniyle dış genital fenotipin kadın yönünde gelişmesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Primer amenore + meme gelişimi + uterus yokluğu + XY karyotip AIS düşündürür.",
    "tusPearl": "Primer amenore + meme gelişimi + uterus yokluğu + XY karyotip AIS düşündürür.",
    "differentialPoint": "Müllerian agenezide karyotip 46,XX ve over fonksiyonu normaldir.",
    "clinicalRelevance": "Primer amenore + meme gelişimi + uterus yokluğu + XY karyotip AIS düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "genetics",
      "endocrinology",
      "gynecology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Androjen duyarsızlık sendromu",
      "AIS",
      "testiküler feminizasyon",
      "Genetik / Endokrin"
    ]
  },
  {
    "term": "Müllerian agenezi",
    "aliases": [
      "MRKH",
      "Mayer-Rokitansky-Küster-Hauser"
    ],
    "category": "Jinekoloji / Embriyoloji",
    "previewDefinition": "Müllerian kanal gelişim kusuruna bağlı uterus ve üst vajen yokluğu tablosudur.",
    "preAnswerSafeDefinition": "Müllerian kanal gelişim kusuruna bağlı uterus ve üst vajen yokluğu tablosudur.",
    "shortDefinition": "Müllerian kanal gelişim kusuruna bağlı uterus ve üst vajen yokluğu tablosudur.",
    "detailedExplanation": "Müllerian kanal gelişim kusuruna bağlı uterus ve üst vajen yokluğu tablosudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Primer amenore + normal sekonder seks karakterleri + 46,XX karyotip MRKH düşündürür.",
    "tusPearl": "Primer amenore + normal sekonder seks karakterleri + 46,XX karyotip MRKH düşündürür.",
    "differentialPoint": "Androjen duyarsızlıkta karyotip 46,XY’dir.",
    "clinicalRelevance": "Primer amenore + normal sekonder seks karakterleri + 46,XX karyotip MRKH düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "gynecology",
      "embryology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Müllerian agenezi",
      "MRKH",
      "Mayer-Rokitansky-Küster-Hauser",
      "Jinekoloji / Embriyoloji"
    ]
  },
  {
    "term": "Nöral tüp defekti",
    "aliases": [
      "NTD",
      "neural tube defect"
    ],
    "category": "Embriyoloji",
    "previewDefinition": "Nöral tüp kapanma kusuruna bağlı santral sinir sistemi malformasyonlarıdır.",
    "preAnswerSafeDefinition": "Nöral tüp kapanma kusuruna bağlı santral sinir sistemi malformasyonlarıdır.",
    "shortDefinition": "Nöral tüp kapanma kusuruna bağlı santral sinir sistemi malformasyonlarıdır.",
    "detailedExplanation": "Nöral tüp kapanma kusuruna bağlı santral sinir sistemi malformasyonlarıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Folat eksikliği ve maternal alfa-fetoprotein yüksekliği klasik bağlantılardır.",
    "tusPearl": "Folat eksikliği ve maternal alfa-fetoprotein yüksekliği klasik bağlantılardır.",
    "differentialPoint": "Down sendromunda nöral tüp kapanma kusuru değil kromozomal anöploidi vardır.",
    "clinicalRelevance": "Folat eksikliği ve maternal alfa-fetoprotein yüksekliği klasik bağlantılardır.",
    "mechanism": "",
    "relatedBranches": [
      "embryology",
      "pediatrics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Nöral tüp defekti",
      "NTD",
      "neural tube defect",
      "Embriyoloji"
    ]
  },
  {
    "term": "AFP",
    "aliases": [
      "alfa fetoprotein",
      "alpha-fetoprotein"
    ],
    "category": "Laboratuvar / Embriyoloji",
    "previewDefinition": "Fetal karaciğer ve yolk sac kaynaklı alfa-fetoproteindir.",
    "preAnswerSafeDefinition": "Fetal karaciğer ve yolk sac kaynaklı alfa-fetoproteindir.",
    "shortDefinition": "Fetal karaciğer ve yolk sac kaynaklı alfa-fetoproteindir.",
    "detailedExplanation": "Fetal karaciğer ve yolk sac kaynaklı alfa-fetoproteindir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Maternal serum AFP yüksekliği nöral tüp defekti; düşüklüğü Down sendromu taramasında ipucu olabilir.",
    "tusPearl": "Maternal serum AFP yüksekliği nöral tüp defekti; düşüklüğü Down sendromu taramasında ipucu olabilir.",
    "differentialPoint": "Beta-hCG trofoblast kaynaklı gebelik hormonudur.",
    "clinicalRelevance": "Maternal serum AFP yüksekliği nöral tüp defekti; düşüklüğü Down sendromu taramasında ipucu olabilir.",
    "mechanism": "",
    "relatedBranches": [
      "obstetrics",
      "embryology",
      "biochemistry"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "AFP",
      "alfa fetoprotein",
      "alpha-fetoprotein",
      "Laboratuvar / Embriyoloji"
    ]
  },
  {
    "term": "Duktus arteriozus",
    "aliases": [
      "ductus arteriosus"
    ],
    "category": "Fetal dolaşım",
    "previewDefinition": "Pulmoner arter ile aorta arasında fetal dolaşımda bulunan bağlantıdır.",
    "preAnswerSafeDefinition": "Pulmoner arter ile aorta arasında fetal dolaşımda bulunan bağlantıdır.",
    "shortDefinition": "Pulmoner arter ile aorta arasında fetal dolaşımda bulunan bağlantıdır.",
    "detailedExplanation": "Pulmoner arter ile aorta arasında fetal dolaşımda bulunan bağlantıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Prostaglandin E1 duktusu açık tutar; indometazin kapanmayı destekler.",
    "tusPearl": "Prostaglandin E1 duktusu açık tutar; indometazin kapanmayı destekler.",
    "differentialPoint": "Foramen ovale atriyumlar arası fetal geçiştir.",
    "clinicalRelevance": "Prostaglandin E1 duktusu açık tutar; indometazin kapanmayı destekler.",
    "mechanism": "",
    "relatedBranches": [
      "embryology",
      "pediatrics",
      "cardiovascular"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Duktus arteriozus",
      "ductus arteriosus",
      "Fetal dolaşım"
    ]
  },
  {
    "term": "Patent duktus arteriozus",
    "aliases": [
      "PDA",
      "patent ductus arteriosus"
    ],
    "category": "Konjenital kalp hastalığı",
    "previewDefinition": "Duktus arteriozusun doğum sonrası kapanmamasıyla oluşan sol-sağ şanttır.",
    "preAnswerSafeDefinition": "Duktus arteriozusun doğum sonrası kapanmamasıyla oluşan sol-sağ şanttır.",
    "shortDefinition": "Duktus arteriozusun doğum sonrası kapanmamasıyla oluşan sol-sağ şanttır.",
    "detailedExplanation": "Duktus arteriozusun doğum sonrası kapanmamasıyla oluşan sol-sağ şanttır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Sürekli makine üfürümü PDA için klasik oskültasyon ipucudur.",
    "tusPearl": "Sürekli makine üfürümü PDA için klasik oskültasyon ipucudur.",
    "differentialPoint": "VSD holosistolik üfürümle daha tipiktir.",
    "clinicalRelevance": "Sürekli makine üfürümü PDA için klasik oskültasyon ipucudur.",
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
      "Patent duktus arteriozus",
      "PDA",
      "patent ductus arteriosus",
      "Konjenital kalp hastalığı"
    ]
  },
  {
    "term": "Foramen ovale",
    "aliases": [
      "foramen ovale"
    ],
    "category": "Fetal dolaşım",
    "previewDefinition": "Fetal dönemde sağ atriyumdan sol atriyuma kan geçişini sağlayan açıklıktır.",
    "preAnswerSafeDefinition": "Fetal dönemde sağ atriyumdan sol atriyuma kan geçişini sağlayan açıklıktır.",
    "shortDefinition": "Fetal dönemde sağ atriyumdan sol atriyuma kan geçişini sağlayan açıklıktır.",
    "detailedExplanation": "Fetal dönemde sağ atriyumdan sol atriyuma kan geçişini sağlayan açıklıktır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Doğum sonrası sol atriyum basıncı artışıyla fonksiyonel kapanma beklenir.",
    "tusPearl": "Doğum sonrası sol atriyum basıncı artışıyla fonksiyonel kapanma beklenir.",
    "differentialPoint": "Duktus arteriozus pulmoner arter-aorta bağlantısıdır.",
    "clinicalRelevance": "Doğum sonrası sol atriyum basıncı artışıyla fonksiyonel kapanma beklenir.",
    "mechanism": "",
    "relatedBranches": [
      "embryology",
      "cardiovascular"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Foramen ovale",
      "foramen ovale",
      "Fetal dolaşım"
    ]
  },
  {
    "term": "VSD",
    "aliases": [
      "ventriküler septal defekt",
      "ventricular septal defect"
    ],
    "category": "Konjenital kalp hastalığı",
    "previewDefinition": "Ventriküller arası septum defektiyle oluşan sol-sağ şanttır.",
    "preAnswerSafeDefinition": "Ventriküller arası septum defektiyle oluşan sol-sağ şanttır.",
    "shortDefinition": "Ventriküller arası septum defektiyle oluşan sol-sağ şanttır.",
    "detailedExplanation": "Ventriküller arası septum defektiyle oluşan sol-sağ şanttır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "En sık konjenital kalp defektlerinden biridir; holosistolik üfürüm klasik bilgidir.",
    "tusPearl": "En sık konjenital kalp defektlerinden biridir; holosistolik üfürüm klasik bilgidir.",
    "differentialPoint": "ASD’de sabit geniş S2 çiftleşmesi öne çıkar.",
    "clinicalRelevance": "En sık konjenital kalp defektlerinden biridir; holosistolik üfürüm klasik bilgidir.",
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
      "VSD",
      "ventriküler septal defekt",
      "ventricular septal defect",
      "Konjenital kalp hastalığı"
    ]
  },
  {
    "term": "ASD",
    "aliases": [
      "atriyal septal defekt",
      "atrial septal defect"
    ],
    "category": "Konjenital kalp hastalığı",
    "previewDefinition": "Atriyumlar arası septum defektiyle oluşan sol-sağ şanttır.",
    "preAnswerSafeDefinition": "Atriyumlar arası septum defektiyle oluşan sol-sağ şanttır.",
    "shortDefinition": "Atriyumlar arası septum defektiyle oluşan sol-sağ şanttır.",
    "detailedExplanation": "Atriyumlar arası septum defektiyle oluşan sol-sağ şanttır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Sabit geniş S2 çiftleşmesi ASD için klasik oskültasyon ipucudur.",
    "tusPearl": "Sabit geniş S2 çiftleşmesi ASD için klasik oskültasyon ipucudur.",
    "differentialPoint": "VSD holosistolik üfürümle daha tipiktir.",
    "clinicalRelevance": "Sabit geniş S2 çiftleşmesi ASD için klasik oskültasyon ipucudur.",
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
      "ASD",
      "atriyal septal defekt",
      "atrial septal defect",
      "Konjenital kalp hastalığı"
    ]
  },
  {
    "term": "Broca alanı",
    "aliases": [
      "Broca area"
    ],
    "category": "Nöroanatomi",
    "previewDefinition": "Dominant frontal lobda motor konuşma üretimiyle ilişkili kortikal alandır.",
    "preAnswerSafeDefinition": "Dominant frontal lobda motor konuşma üretimiyle ilişkili kortikal alandır.",
    "shortDefinition": "Dominant frontal lobda motor konuşma üretimiyle ilişkili kortikal alandır.",
    "detailedExplanation": "Dominant frontal lobda motor konuşma üretimiyle ilişkili kortikal alandır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Akıcı olmayan konuşma ve anlama nispeten korunmuşsa Broca afazisi düşünülür.",
    "tusPearl": "Akıcı olmayan konuşma ve anlama nispeten korunmuşsa Broca afazisi düşünülür.",
    "differentialPoint": "Wernicke afazisinde konuşma akıcı ama anlamsız ve anlama bozuktur.",
    "clinicalRelevance": "Akıcı olmayan konuşma ve anlama nispeten korunmuşsa Broca afazisi düşünülür.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy",
      "neurology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Broca alanı",
      "Broca area",
      "Nöroanatomi"
    ]
  },
  {
    "term": "Wernicke alanı",
    "aliases": [
      "Wernicke area"
    ],
    "category": "Nöroanatomi",
    "previewDefinition": "Dominant temporal lobda dil anlama ile ilişkili kortikal alandır.",
    "preAnswerSafeDefinition": "Dominant temporal lobda dil anlama ile ilişkili kortikal alandır.",
    "shortDefinition": "Dominant temporal lobda dil anlama ile ilişkili kortikal alandır.",
    "detailedExplanation": "Dominant temporal lobda dil anlama ile ilişkili kortikal alandır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Akıcı ama anlamsız konuşma ve anlama bozukluğu Wernicke afazisini düşündürür.",
    "tusPearl": "Akıcı ama anlamsız konuşma ve anlama bozukluğu Wernicke afazisini düşündürür.",
    "differentialPoint": "Broca afazisinde konuşma akıcı değildir.",
    "clinicalRelevance": "Akıcı ama anlamsız konuşma ve anlama bozukluğu Wernicke afazisini düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy",
      "neurology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Wernicke alanı",
      "Wernicke area",
      "Nöroanatomi"
    ]
  },
  {
    "term": "Arkuat fasikül",
    "aliases": [
      "arcuate fasciculus"
    ],
    "category": "Nöroanatomi",
    "previewDefinition": "Broca ve Wernicke alanları arasında bağlantı sağlayan beyaz cevher traktıdır.",
    "preAnswerSafeDefinition": "Broca ve Wernicke alanları arasında bağlantı sağlayan beyaz cevher traktıdır.",
    "shortDefinition": "Broca ve Wernicke alanları arasında bağlantı sağlayan beyaz cevher traktıdır.",
    "detailedExplanation": "Broca ve Wernicke alanları arasında bağlantı sağlayan beyaz cevher traktıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Tekrarlama bozukluğu ile giden iletim afazisi arkuat fasikül lezyonuyla ilişkilidir.",
    "tusPearl": "Tekrarlama bozukluğu ile giden iletim afazisi arkuat fasikül lezyonuyla ilişkilidir.",
    "differentialPoint": "Broca lezyonu motor konuşmayı, Wernicke lezyonu anlamayı daha çok etkiler.",
    "clinicalRelevance": "Tekrarlama bozukluğu ile giden iletim afazisi arkuat fasikül lezyonuyla ilişkilidir.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy",
      "neurology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Arkuat fasikül",
      "arcuate fasciculus",
      "Nöroanatomi"
    ]
  },
  {
    "term": "İç kapsül",
    "aliases": [
      "internal capsule"
    ],
    "category": "Nöroanatomi",
    "previewDefinition": "Kortikospinal ve diğer projeksiyon liflerinin yoğun geçtiği beyaz cevher yapısıdır.",
    "preAnswerSafeDefinition": "Kortikospinal ve diğer projeksiyon liflerinin yoğun geçtiği beyaz cevher yapısıdır.",
    "shortDefinition": "Kortikospinal ve diğer projeksiyon liflerinin yoğun geçtiği beyaz cevher yapısıdır.",
    "detailedExplanation": "Kortikospinal ve diğer projeksiyon liflerinin yoğun geçtiği beyaz cevher yapısıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Laküner infarkt sonrası saf motor hemiparezi iç kapsül tutulumu için klasik ipucudur.",
    "tusPearl": "Laküner infarkt sonrası saf motor hemiparezi iç kapsül tutulumu için klasik ipucudur.",
    "differentialPoint": "Kortikal lezyonlarda afazi, ihmal veya kortikal bulgular eşlik edebilir.",
    "clinicalRelevance": "Laküner infarkt sonrası saf motor hemiparezi iç kapsül tutulumu için klasik ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy",
      "neurology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "İç kapsül",
      "internal capsule",
      "Nöroanatomi"
    ]
  },
  {
    "term": "Bazal ganglion",
    "aliases": [
      "basal ganglia"
    ],
    "category": "Nöroanatomi",
    "previewDefinition": "Hareketin başlatılması ve modülasyonunda rol alan subkortikal çekirdekler grubudur.",
    "preAnswerSafeDefinition": "Hareketin başlatılması ve modülasyonunda rol alan subkortikal çekirdekler grubudur.",
    "shortDefinition": "Hareketin başlatılması ve modülasyonunda rol alan subkortikal çekirdekler grubudur.",
    "detailedExplanation": "Hareketin başlatılması ve modülasyonunda rol alan subkortikal çekirdekler grubudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Parkinson, Huntington ve hemiballismus bazal ganglion devreleriyle ilişkilidir.",
    "tusPearl": "Parkinson, Huntington ve hemiballismus bazal ganglion devreleriyle ilişkilidir.",
    "differentialPoint": "Serebellum koordinasyon ve dengeyle daha doğrudan ilişkilidir.",
    "clinicalRelevance": "Parkinson, Huntington ve hemiballismus bazal ganglion devreleriyle ilişkilidir.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy",
      "neurology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Bazal ganglion",
      "basal ganglia",
      "Nöroanatomi"
    ]
  },
  {
    "term": "Serebellum",
    "aliases": [
      "cerebellum",
      "beyincik"
    ],
    "category": "Nöroanatomi",
    "previewDefinition": "Koordinasyon, denge ve motor öğrenmede rol alan arka fossa yapısıdır.",
    "preAnswerSafeDefinition": "Koordinasyon, denge ve motor öğrenmede rol alan arka fossa yapısıdır.",
    "shortDefinition": "Koordinasyon, denge ve motor öğrenmede rol alan arka fossa yapısıdır.",
    "detailedExplanation": "Koordinasyon, denge ve motor öğrenmede rol alan arka fossa yapısıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Ataksi, dismetri ve disdiadokokinezi serebellar tutulum düşündürür.",
    "tusPearl": "Ataksi, dismetri ve disdiadokokinezi serebellar tutulum düşündürür.",
    "differentialPoint": "Bazal ganglion hastalıkları daha çok hareket başlatma/istenmeyen hareketlerle seyreder.",
    "clinicalRelevance": "Ataksi, dismetri ve disdiadokokinezi serebellar tutulum düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy",
      "neurology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Serebellum",
      "cerebellum",
      "beyincik",
      "Nöroanatomi"
    ]
  },
  {
    "term": "Lateral medüller sendrom",
    "aliases": [
      "Wallenberg sendromu",
      "PICA sendromu"
    ],
    "category": "Beyin sapı sendromu",
    "previewDefinition": "PICA veya vertebral arter tutulumu ile gelişen Wallenberg sendromudur.",
    "preAnswerSafeDefinition": "PICA veya vertebral arter tutulumu ile gelişen Wallenberg sendromudur.",
    "shortDefinition": "PICA veya vertebral arter tutulumu ile gelişen Wallenberg sendromudur.",
    "detailedExplanation": "PICA veya vertebral arter tutulumu ile gelişen Wallenberg sendromudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Disfaji, ses kısıklığı, ipsilateral yüz duyu kaybı ve kontralateral vücut ağrı-sıcaklık kaybı klasik bulgulardır.",
    "tusPearl": "Disfaji, ses kısıklığı, ipsilateral yüz duyu kaybı ve kontralateral vücut ağrı-sıcaklık kaybı klasik bulgulardır.",
    "differentialPoint": "Medial medüller sendromda hipoglossal ve piramidal bulgular öne çıkar.",
    "clinicalRelevance": "Disfaji, ses kısıklığı, ipsilateral yüz duyu kaybı ve kontralateral vücut ağrı-sıcaklık kaybı klasik bulgulardır.",
    "mechanism": "",
    "relatedBranches": [
      "neurology",
      "anatomy"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Lateral medüller sendrom",
      "Wallenberg sendromu",
      "PICA sendromu",
      "Beyin sapı sendromu"
    ]
  },
  {
    "term": "Medial medüller sendrom",
    "aliases": [
      "Dejerine sendromu"
    ],
    "category": "Beyin sapı sendromu",
    "previewDefinition": "Anterior spinal arter tutulumu ile piramid, medial lemniskus ve hipoglossal liflerin etkilendiği sendromdur.",
    "preAnswerSafeDefinition": "Anterior spinal arter tutulumu ile piramid, medial lemniskus ve hipoglossal liflerin etkilendiği sendromdur.",
    "shortDefinition": "Anterior spinal arter tutulumu ile piramid, medial lemniskus ve hipoglossal liflerin etkilendiği sendromdur.",
    "detailedExplanation": "Anterior spinal arter tutulumu ile piramid, medial lemniskus ve hipoglossal liflerin etkilendiği sendromdur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Kontralateral hemiparezi, kontralateral vibrasyon/propriosepsiyon kaybı ve ipsilateral dil deviasyonu beklenir.",
    "tusPearl": "Kontralateral hemiparezi, kontralateral vibrasyon/propriosepsiyon kaybı ve ipsilateral dil deviasyonu beklenir.",
    "differentialPoint": "Lateral medüller sendromda nucleus ambiguus bulguları öne çıkar.",
    "clinicalRelevance": "Kontralateral hemiparezi, kontralateral vibrasyon/propriosepsiyon kaybı ve ipsilateral dil deviasyonu beklenir.",
    "mechanism": "",
    "relatedBranches": [
      "neurology",
      "anatomy"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Medial medüller sendrom",
      "Dejerine sendromu",
      "Beyin sapı sendromu"
    ]
  },
  {
    "term": "Brown-Séquard sendromu",
    "aliases": [
      "Brown Sequard"
    ],
    "category": "Omurilik sendromu",
    "previewDefinition": "Spinal kord hemiseksiyonu ile ipsilateral motor/propriosepsiyon kaybı ve kontralateral ağrı-sıcaklık kaybı oluşturur.",
    "preAnswerSafeDefinition": "Spinal kord hemiseksiyonu ile ipsilateral motor/propriosepsiyon kaybı ve kontralateral ağrı-sıcaklık kaybı oluşturur.",
    "shortDefinition": "Spinal kord hemiseksiyonu ile ipsilateral motor/propriosepsiyon kaybı ve kontralateral ağrı-sıcaklık kaybı oluşturur.",
    "detailedExplanation": "Spinal kord hemiseksiyonu ile ipsilateral motor/propriosepsiyon kaybı ve kontralateral ağrı-sıcaklık kaybı oluşturur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Duyu yollarının çaprazlanma seviyeleri bu sendromla sınanır.",
    "tusPearl": "Duyu yollarının çaprazlanma seviyeleri bu sendromla sınanır.",
    "differentialPoint": "Santral kord sendromunda üst ekstremite güçsüzlüğü daha belirgin olabilir.",
    "clinicalRelevance": "Duyu yollarının çaprazlanma seviyeleri bu sendromla sınanır.",
    "mechanism": "",
    "relatedBranches": [
      "neurology",
      "anatomy"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Brown-Séquard sendromu",
      "Brown Sequard",
      "Omurilik sendromu"
    ]
  },
  {
    "term": "Santral kord sendromu",
    "aliases": [
      "central cord syndrome"
    ],
    "category": "Omurilik sendromu",
    "previewDefinition": "Servikal kord merkezinin hasarıyla üst ekstremite güçsüzlüğünün alt ekstremiteden fazla olduğu tablodur.",
    "preAnswerSafeDefinition": "Servikal kord merkezinin hasarıyla üst ekstremite güçsüzlüğünün alt ekstremiteden fazla olduğu tablodur.",
    "shortDefinition": "Servikal kord merkezinin hasarıyla üst ekstremite güçsüzlüğünün alt ekstremiteden fazla olduğu tablodur.",
    "detailedExplanation": "Servikal kord merkezinin hasarıyla üst ekstremite güçsüzlüğünün alt ekstremiteden fazla olduğu tablodur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Yaşlıda hiperekstansiyon travması sonrası ellerde güçsüzlük klasik ipucudur.",
    "tusPearl": "Yaşlıda hiperekstansiyon travması sonrası ellerde güçsüzlük klasik ipucudur.",
    "differentialPoint": "Brown-Séquard hemikord paterniyle ayrılır.",
    "clinicalRelevance": "Yaşlıda hiperekstansiyon travması sonrası ellerde güçsüzlük klasik ipucudur.",
    "mechanism": "",
    "relatedBranches": [
      "neurology",
      "orthopedics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Santral kord sendromu",
      "central cord syndrome",
      "Omurilik sendromu"
    ]
  },
  {
    "term": "Cauda equina sendromu",
    "aliases": [
      "kauda ekina"
    ],
    "category": "Nöroşirürji acili",
    "previewDefinition": "Lumbosakral sinir köklerinin basısıyla gelişen acil nörolojik sendromdur.",
    "preAnswerSafeDefinition": "Lumbosakral sinir köklerinin basısıyla gelişen acil nörolojik sendromdur.",
    "shortDefinition": "Lumbosakral sinir köklerinin basısıyla gelişen acil nörolojik sendromdur.",
    "detailedExplanation": "Lumbosakral sinir köklerinin basısıyla gelişen acil nörolojik sendromdur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Eyer tarzı anestezi, mesane-barsak disfonksiyonu ve bilateral radiküler ağrı acil dekompresyon gerektirebilir.",
    "tusPearl": "Eyer tarzı anestezi, mesane-barsak disfonksiyonu ve bilateral radiküler ağrı acil dekompresyon gerektirebilir.",
    "differentialPoint": "Konus medullaris lezyonu daha erken sfinkter bulgularıyla ayrılabilir.",
    "clinicalRelevance": "Eyer tarzı anestezi, mesane-barsak disfonksiyonu ve bilateral radiküler ağrı acil dekompresyon gerektirebilir.",
    "mechanism": "",
    "relatedBranches": [
      "neurology",
      "orthopedics",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Cauda equina sendromu",
      "kauda ekina",
      "Nöroşirürji acili"
    ]
  },
  {
    "term": "Dermatom",
    "aliases": [
      "dermatome"
    ],
    "category": "Anatomi",
    "previewDefinition": "Belirli spinal sinir kökü tarafından innerve edilen deri alanıdır.",
    "preAnswerSafeDefinition": "Belirli spinal sinir kökü tarafından innerve edilen deri alanıdır.",
    "shortDefinition": "Belirli spinal sinir kökü tarafından innerve edilen deri alanıdır.",
    "detailedExplanation": "Belirli spinal sinir kökü tarafından innerve edilen deri alanıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Radikülopati ve zona dağılımı dermatom bilgisiyle yorumlanır.",
    "tusPearl": "Radikülopati ve zona dağılımı dermatom bilgisiyle yorumlanır.",
    "differentialPoint": "Periferik sinir lezyonu dermatomdan farklı dağılım gösterebilir.",
    "clinicalRelevance": "Radikülopati ve zona dağılımı dermatom bilgisiyle yorumlanır.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy",
      "neurology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Dermatom",
      "dermatome",
      "Anatomi"
    ]
  },
  {
    "term": "Miyotomi",
    "aliases": [
      "myotome"
    ],
    "category": "Anatomi",
    "previewDefinition": "Belirli spinal sinir kökünün innerve ettiği kas grubu/fonksiyon alanıdır.",
    "preAnswerSafeDefinition": "Belirli spinal sinir kökünün innerve ettiği kas grubu/fonksiyon alanıdır.",
    "shortDefinition": "Belirli spinal sinir kökünün innerve ettiği kas grubu/fonksiyon alanıdır.",
    "detailedExplanation": "Belirli spinal sinir kökünün innerve ettiği kas grubu/fonksiyon alanıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Kök lezyonlarında güç kaybı paternini yorumlamak için kullanılır.",
    "tusPearl": "Kök lezyonlarında güç kaybı paternini yorumlamak için kullanılır.",
    "differentialPoint": "Periferik sinir lezyonları tek sinir dağılımına uyar.",
    "clinicalRelevance": "Kök lezyonlarında güç kaybı paternini yorumlamak için kullanılır.",
    "mechanism": "",
    "relatedBranches": [
      "anatomy",
      "neurology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Miyotomi",
      "myotome",
      "Anatomi"
    ]
  },
  {
    "term": "Renin-anjiyotensin-aldosteron sistemi",
    "aliases": [
      "RAAS",
      "renin angiotensin aldosterone system"
    ],
    "category": "Fizyoloji",
    "previewDefinition": "Kan basıncı, sodyum dengesi ve ekstrasellüler hacmi düzenleyen hormonal sistemdir.",
    "preAnswerSafeDefinition": "Kan basıncı, sodyum dengesi ve ekstrasellüler hacmi düzenleyen hormonal sistemdir.",
    "shortDefinition": "Kan basıncı, sodyum dengesi ve ekstrasellüler hacmi düzenleyen hormonal sistemdir.",
    "detailedExplanation": "Kan basıncı, sodyum dengesi ve ekstrasellüler hacmi düzenleyen hormonal sistemdir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Renal perfüzyon azalması renin salınımını artırır; ACE inhibitörleri bu sistemi baskılar.",
    "tusPearl": "Renal perfüzyon azalması renin salınımını artırır; ACE inhibitörleri bu sistemi baskılar.",
    "differentialPoint": "ADH su dengesini daha doğrudan düzenler.",
    "clinicalRelevance": "Renal perfüzyon azalması renin salınımını artırır; ACE inhibitörleri bu sistemi baskılar.",
    "mechanism": "",
    "relatedBranches": [
      "physiology",
      "nephrology",
      "cardiovascular"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Renin-anjiyotensin-aldosteron sistemi",
      "RAAS",
      "renin angiotensin aldosterone system",
      "Fizyoloji"
    ]
  },
  {
    "term": "Starling kuvvetleri",
    "aliases": [
      "Starling forces"
    ],
    "category": "Fizyoloji",
    "previewDefinition": "Kapiller filtrasyon ve reabsorpsiyonu belirleyen hidrostatik ve onkotik basınç dengeleridir.",
    "preAnswerSafeDefinition": "Kapiller filtrasyon ve reabsorpsiyonu belirleyen hidrostatik ve onkotik basınç dengeleridir.",
    "shortDefinition": "Kapiller filtrasyon ve reabsorpsiyonu belirleyen hidrostatik ve onkotik basınç dengeleridir.",
    "detailedExplanation": "Kapiller filtrasyon ve reabsorpsiyonu belirleyen hidrostatik ve onkotik basınç dengeleridir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Ödem mekanizmalarını anlamada hidrostatik basınç artışı ve onkotik basınç azalması kritik ayrımdır.",
    "tusPearl": "Ödem mekanizmalarını anlamada hidrostatik basınç artışı ve onkotik basınç azalması kritik ayrımdır.",
    "differentialPoint": "Lenfatik tıkanma ayrı bir ödem mekanizmasıdır.",
    "clinicalRelevance": "Ödem mekanizmalarını anlamada hidrostatik basınç artışı ve onkotik basınç azalması kritik ayrımdır.",
    "mechanism": "",
    "relatedBranches": [
      "physiology",
      "cardiovascular"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Starling kuvvetleri",
      "Starling forces",
      "Fizyoloji"
    ]
  },
  {
    "term": "Frank-Starling mekanizması",
    "aliases": [
      "Frank Starling law"
    ],
    "category": "Kardiyovasküler fizyoloji",
    "previewDefinition": "Ventrikül dolumunun artmasıyla kas lif uzunluğu ve atım hacminin artmasıdır.",
    "preAnswerSafeDefinition": "Ventrikül dolumunun artmasıyla kas lif uzunluğu ve atım hacminin artmasıdır.",
    "shortDefinition": "Ventrikül dolumunun artmasıyla kas lif uzunluğu ve atım hacminin artmasıdır.",
    "detailedExplanation": "Ventrikül dolumunun artmasıyla kas lif uzunluğu ve atım hacminin artmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Preload-artmış kontraksiyon ilişkisi kalp yetmezliği fizyolojisinde temel kavramdır.",
    "tusPearl": "Preload-artmış kontraksiyon ilişkisi kalp yetmezliği fizyolojisinde temel kavramdır.",
    "differentialPoint": "Afterload artışı ejeksiyonu zorlaştırır.",
    "clinicalRelevance": "Preload-artmış kontraksiyon ilişkisi kalp yetmezliği fizyolojisinde temel kavramdır.",
    "mechanism": "",
    "relatedBranches": [
      "physiology",
      "cardiovascular"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Frank-Starling mekanizması",
      "Frank Starling law",
      "Kardiyovasküler fizyoloji"
    ]
  },
  {
    "term": "V/Q uyumsuzluğu",
    "aliases": [
      "ventilation perfusion mismatch",
      "VQ mismatch"
    ],
    "category": "Solunum fizyolojisi",
    "previewDefinition": "Ventilasyon ve perfüzyon oranının bölgesel olarak bozulmasıdır.",
    "preAnswerSafeDefinition": "Ventilasyon ve perfüzyon oranının bölgesel olarak bozulmasıdır.",
    "shortDefinition": "Ventilasyon ve perfüzyon oranının bölgesel olarak bozulmasıdır.",
    "detailedExplanation": "Ventilasyon ve perfüzyon oranının bölgesel olarak bozulmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Hipokseminin en sık mekanizmalarından biridir; oksijene yanıt genellikle şanttan daha iyidir.",
    "tusPearl": "Hipokseminin en sık mekanizmalarından biridir; oksijene yanıt genellikle şanttan daha iyidir.",
    "differentialPoint": "Şantta ventilasyon yok veya çok az olduğu için oksijen yanıtı sınırlıdır.",
    "clinicalRelevance": "Hipokseminin en sık mekanizmalarından biridir; oksijene yanıt genellikle şanttan daha iyidir.",
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
      "V/Q uyumsuzluğu",
      "ventilation perfusion mismatch",
      "VQ mismatch",
      "Solunum fizyolojisi"
    ]
  },
  {
    "term": "Şant",
    "aliases": [
      "pulmonary shunt"
    ],
    "category": "Solunum fizyolojisi",
    "previewDefinition": "Kan akımının yeterli ventilasyon almayan alveol bölgelerinden geçmesidir.",
    "preAnswerSafeDefinition": "Kan akımının yeterli ventilasyon almayan alveol bölgelerinden geçmesidir.",
    "shortDefinition": "Kan akımının yeterli ventilasyon almayan alveol bölgelerinden geçmesidir.",
    "detailedExplanation": "Kan akımının yeterli ventilasyon almayan alveol bölgelerinden geçmesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Oksijene zayıf yanıt veren hipoksemi şant mekanizmasını düşündürür.",
    "tusPearl": "Oksijene zayıf yanıt veren hipoksemi şant mekanizmasını düşündürür.",
    "differentialPoint": "V/Q uyumsuzluğu oksijenle daha belirgin düzelebilir.",
    "clinicalRelevance": "Oksijene zayıf yanıt veren hipoksemi şant mekanizmasını düşündürür.",
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
      "Şant",
      "pulmonary shunt",
      "Solunum fizyolojisi"
    ]
  },
  {
    "term": "Ölü boşluk",
    "aliases": [
      "dead space"
    ],
    "category": "Solunum fizyolojisi",
    "previewDefinition": "Ventile edilen ancak perfüzyonu yetersiz olan akciğer alanıdır.",
    "preAnswerSafeDefinition": "Ventile edilen ancak perfüzyonu yetersiz olan akciğer alanıdır.",
    "shortDefinition": "Ventile edilen ancak perfüzyonu yetersiz olan akciğer alanıdır.",
    "detailedExplanation": "Ventile edilen ancak perfüzyonu yetersiz olan akciğer alanıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Pulmoner embolide fizyolojik ölü boşluk artışı mantığı sorulabilir.",
    "tusPearl": "Pulmoner embolide fizyolojik ölü boşluk artışı mantığı sorulabilir.",
    "differentialPoint": "Şantta perfüzyon var, ventilasyon yetersizdir.",
    "clinicalRelevance": "Pulmoner embolide fizyolojik ölü boşluk artışı mantığı sorulabilir.",
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
      "Ölü boşluk",
      "dead space",
      "Solunum fizyolojisi"
    ]
  },
  {
    "term": "Bohr etkisi",
    "aliases": [
      "Bohr effect"
    ],
    "category": "Fizyoloji",
    "previewDefinition": "CO2 ve H+ artışının hemoglobinin oksijene afinitesini azaltmasıdır.",
    "preAnswerSafeDefinition": "CO2 ve H+ artışının hemoglobinin oksijene afinitesini azaltmasıdır.",
    "shortDefinition": "CO2 ve H+ artışının hemoglobinin oksijene afinitesini azaltmasıdır.",
    "detailedExplanation": "CO2 ve H+ artışının hemoglobinin oksijene afinitesini azaltmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Aktif dokuda oksijen salınımını kolaylaştırır.",
    "tusPearl": "Aktif dokuda oksijen salınımını kolaylaştırır.",
    "differentialPoint": "Haldane etkisi oksijenlenmenin CO2 taşıması üzerindeki etkisidir.",
    "clinicalRelevance": "Aktif dokuda oksijen salınımını kolaylaştırır.",
    "mechanism": "",
    "relatedBranches": [
      "physiology",
      "biochemistry"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Bohr etkisi",
      "Bohr effect",
      "Fizyoloji"
    ]
  },
  {
    "term": "Haldane etkisi",
    "aliases": [
      "Haldane effect"
    ],
    "category": "Fizyoloji",
    "previewDefinition": "Oksijenlenmiş hemoglobinin CO2 taşıma kapasitesinin azalmasıdır.",
    "preAnswerSafeDefinition": "Oksijenlenmiş hemoglobinin CO2 taşıma kapasitesinin azalmasıdır.",
    "shortDefinition": "Oksijenlenmiş hemoglobinin CO2 taşıma kapasitesinin azalmasıdır.",
    "detailedExplanation": "Oksijenlenmiş hemoglobinin CO2 taşıma kapasitesinin azalmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Akciğerde oksijenlenme CO2 salınımını kolaylaştırır.",
    "tusPearl": "Akciğerde oksijenlenme CO2 salınımını kolaylaştırır.",
    "differentialPoint": "Bohr etkisi CO2/H+ artışının oksijen salınımını artırmasıdır.",
    "clinicalRelevance": "Akciğerde oksijenlenme CO2 salınımını kolaylaştırır.",
    "mechanism": "",
    "relatedBranches": [
      "physiology",
      "biochemistry"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Haldane etkisi",
      "Haldane effect",
      "Fizyoloji"
    ]
  },
  {
    "term": "Obsesif kompulsif bozukluk",
    "aliases": [
      "OKB",
      "OCD"
    ],
    "category": "Psikiyatri",
    "previewDefinition": "İstenmeyen obsesyonlar ve bunları azaltmaya yönelik kompulsiyonlarla seyreden bozukluktur.",
    "preAnswerSafeDefinition": "İstenmeyen obsesyonlar ve bunları azaltmaya yönelik kompulsiyonlarla seyreden bozukluktur.",
    "shortDefinition": "İstenmeyen obsesyonlar ve bunları azaltmaya yönelik kompulsiyonlarla seyreden bozukluktur.",
    "detailedExplanation": "İstenmeyen obsesyonlar ve bunları azaltmaya yönelik kompulsiyonlarla seyreden bozukluktur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Ego-distonik tekrarlayıcı düşünce ve ritüeller OKB için tipiktir.",
    "tusPearl": "Ego-distonik tekrarlayıcı düşünce ve ritüeller OKB için tipiktir.",
    "differentialPoint": "Obsesif kompulsif kişilik bozukluğunda davranışlar daha ego-sintoniktir.",
    "clinicalRelevance": "Ego-distonik tekrarlayıcı düşünce ve ritüeller OKB için tipiktir.",
    "mechanism": "",
    "relatedBranches": [
      "psychiatry"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Obsesif kompulsif bozukluk",
      "OKB",
      "OCD",
      "Psikiyatri"
    ]
  },
  {
    "term": "Panik atak",
    "aliases": [
      "panic attack"
    ],
    "category": "Psikiyatri",
    "previewDefinition": "Dakikalar içinde zirve yapan yoğun korku ve otonom belirtiler atağıdır.",
    "preAnswerSafeDefinition": "Dakikalar içinde zirve yapan yoğun korku ve otonom belirtiler atağıdır.",
    "shortDefinition": "Dakikalar içinde zirve yapan yoğun korku ve otonom belirtiler atağıdır.",
    "detailedExplanation": "Dakikalar içinde zirve yapan yoğun korku ve otonom belirtiler atağıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Çarpıntı, terleme, nefes darlığı ve ölüm korkusu panik atakta tipiktir; organik nedenler dışlanır.",
    "tusPearl": "Çarpıntı, terleme, nefes darlığı ve ölüm korkusu panik atakta tipiktir; organik nedenler dışlanır.",
    "differentialPoint": "Yaygın anksiyete bozukluğu sürekli ve uzun süreli endişeyle seyreder.",
    "clinicalRelevance": "Çarpıntı, terleme, nefes darlığı ve ölüm korkusu panik atakta tipiktir; organik nedenler dışlanır.",
    "mechanism": "",
    "relatedBranches": [
      "psychiatry",
      "emergency-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Panik atak",
      "panic attack",
      "Psikiyatri"
    ]
  },
  {
    "term": "Somatik belirti bozukluğu",
    "aliases": [
      "somatic symptom disorder"
    ],
    "category": "Psikiyatri",
    "previewDefinition": "Bedensel belirtilere aşırı düşünce, kaygı ve davranış eşlik eden bozukluktur.",
    "preAnswerSafeDefinition": "Bedensel belirtilere aşırı düşünce, kaygı ve davranış eşlik eden bozukluktur.",
    "shortDefinition": "Bedensel belirtilere aşırı düşünce, kaygı ve davranış eşlik eden bozukluktur.",
    "detailedExplanation": "Bedensel belirtilere aşırı düşünce, kaygı ve davranış eşlik eden bozukluktur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Belirti varlığı önemlidir; hasta semptomları bilinçli üretmez.",
    "tusPearl": "Belirti varlığı önemlidir; hasta semptomları bilinçli üretmez.",
    "differentialPoint": "Yapay bozuklukta belirti üretme/hastalık rolü üstlenme davranışı vardır.",
    "clinicalRelevance": "Belirti varlığı önemlidir; hasta semptomları bilinçli üretmez.",
    "mechanism": "",
    "relatedBranches": [
      "psychiatry"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Somatik belirti bozukluğu",
      "somatic symptom disorder",
      "Psikiyatri"
    ]
  },
  {
    "term": "Konversiyon bozukluğu",
    "aliases": [
      "functional neurological symptom disorder"
    ],
    "category": "Psikiyatri / Nöroloji",
    "previewDefinition": "Nörolojik belirti benzeri semptomların yapısal nörolojik hastalıkla açıklanamamasıdır.",
    "preAnswerSafeDefinition": "Nörolojik belirti benzeri semptomların yapısal nörolojik hastalıkla açıklanamamasıdır.",
    "shortDefinition": "Nörolojik belirti benzeri semptomların yapısal nörolojik hastalıkla açıklanamamasıdır.",
    "detailedExplanation": "Nörolojik belirti benzeri semptomların yapısal nörolojik hastalıkla açıklanamamasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Stres sonrası güçsüzlük, nöbet benzeri atak veya duyu kaybı olabilir; bilinçli taklit değildir.",
    "tusPearl": "Stres sonrası güçsüzlük, nöbet benzeri atak veya duyu kaybı olabilir; bilinçli taklit değildir.",
    "differentialPoint": "Temaruzda dışsal kazanç için bilinçli semptom üretimi vardır.",
    "clinicalRelevance": "Stres sonrası güçsüzlük, nöbet benzeri atak veya duyu kaybı olabilir; bilinçli taklit değildir.",
    "mechanism": "",
    "relatedBranches": [
      "psychiatry",
      "neurology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Konversiyon bozukluğu",
      "functional neurological symptom disorder",
      "Psikiyatri / Nöroloji"
    ]
  },
  {
    "term": "Temaruz",
    "aliases": [
      "malingering"
    ],
    "category": "Psikiyatri / Adli",
    "previewDefinition": "Dışsal kazanç amacıyla bilinçli semptom üretimi veya abartılmasıdır.",
    "preAnswerSafeDefinition": "Dışsal kazanç amacıyla bilinçli semptom üretimi veya abartılmasıdır.",
    "shortDefinition": "Dışsal kazanç amacıyla bilinçli semptom üretimi veya abartılmasıdır.",
    "detailedExplanation": "Dışsal kazanç amacıyla bilinçli semptom üretimi veya abartılmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Askerlik, tazminat, ilaç veya cezadan kaçma gibi dışsal motivasyonlar aranır.",
    "tusPearl": "Askerlik, tazminat, ilaç veya cezadan kaçma gibi dışsal motivasyonlar aranır.",
    "differentialPoint": "Yapay bozuklukta temel motivasyon hasta rolünü üstlenmektir.",
    "clinicalRelevance": "Askerlik, tazminat, ilaç veya cezadan kaçma gibi dışsal motivasyonlar aranır.",
    "mechanism": "",
    "relatedBranches": [
      "psychiatry",
      "forensic-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Temaruz",
      "malingering",
      "Psikiyatri / Adli"
    ]
  },
  {
    "term": "Yapay bozukluk",
    "aliases": [
      "factitious disorder"
    ],
    "category": "Psikiyatri",
    "previewDefinition": "Dışsal belirgin kazanç olmadan hasta rolünü üstlenmek için belirti üretme durumudur.",
    "preAnswerSafeDefinition": "Dışsal belirgin kazanç olmadan hasta rolünü üstlenmek için belirti üretme durumudur.",
    "shortDefinition": "Dışsal belirgin kazanç olmadan hasta rolünü üstlenmek için belirti üretme durumudur.",
    "detailedExplanation": "Dışsal belirgin kazanç olmadan hasta rolünü üstlenmek için belirti üretme durumudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Motivasyon hasta rolüdür; semptom üretimi bilinçlidir.",
    "tusPearl": "Motivasyon hasta rolüdür; semptom üretimi bilinçlidir.",
    "differentialPoint": "Somatik belirti bozukluğunda bilinçli üretim yoktur.",
    "clinicalRelevance": "Motivasyon hasta rolüdür; semptom üretimi bilinçlidir.",
    "mechanism": "",
    "relatedBranches": [
      "psychiatry"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Yapay bozukluk",
      "factitious disorder",
      "Psikiyatri"
    ]
  },
  {
    "term": "Delüzyon",
    "aliases": [
      "sanrı",
      "delusion"
    ],
    "category": "Psikiyatri",
    "previewDefinition": "Aksine güçlü kanıta rağmen sürdürülen yanlış ve sarsılmaz inançtır.",
    "preAnswerSafeDefinition": "Aksine güçlü kanıta rağmen sürdürülen yanlış ve sarsılmaz inançtır.",
    "shortDefinition": "Aksine güçlü kanıta rağmen sürdürülen yanlış ve sarsılmaz inançtır.",
    "detailedExplanation": "Aksine güçlü kanıta rağmen sürdürülen yanlış ve sarsılmaz inançtır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Psikotik bozukluk değerlendirmesinde sanrı tipi ve işlev kaybı önemlidir.",
    "tusPearl": "Psikotik bozukluk değerlendirmesinde sanrı tipi ve işlev kaybı önemlidir.",
    "differentialPoint": "Obsesyon kişi tarafından çoğunlukla rahatsız edici ve anlamsız bulunabilir.",
    "clinicalRelevance": "Psikotik bozukluk değerlendirmesinde sanrı tipi ve işlev kaybı önemlidir.",
    "mechanism": "",
    "relatedBranches": [
      "psychiatry"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Delüzyon",
      "sanrı",
      "delusion",
      "Psikiyatri"
    ]
  },
  {
    "term": "Halüsinasyon",
    "aliases": [
      "hallucination",
      "varsanı"
    ],
    "category": "Psikiyatri",
    "previewDefinition": "Dış uyaran olmadan algı yaşantısı olmasıdır.",
    "preAnswerSafeDefinition": "Dış uyaran olmadan algı yaşantısı olmasıdır.",
    "shortDefinition": "Dış uyaran olmadan algı yaşantısı olmasıdır.",
    "detailedExplanation": "Dış uyaran olmadan algı yaşantısı olmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "İşitsel halüsinasyon şizofrenide sık; görsel halüsinasyon organik nedenleri daha çok düşündürebilir.",
    "tusPearl": "İşitsel halüsinasyon şizofrenide sık; görsel halüsinasyon organik nedenleri daha çok düşündürebilir.",
    "differentialPoint": "İllüzyon gerçek uyaranın yanlış yorumlanmasıdır.",
    "clinicalRelevance": "İşitsel halüsinasyon şizofrenide sık; görsel halüsinasyon organik nedenleri daha çok düşündürebilir.",
    "mechanism": "",
    "relatedBranches": [
      "psychiatry",
      "neurology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Halüsinasyon",
      "hallucination",
      "varsanı",
      "Psikiyatri"
    ]
  },
  {
    "term": "Aydınlatılmış onam",
    "aliases": [
      "informed consent",
      "bilgilendirilmiş onam"
    ],
    "category": "Tıp hukuku / Etik",
    "previewDefinition": "Hastanın önerilen girişimi anlayarak ve gönüllü biçimde kabul etmesidir.",
    "preAnswerSafeDefinition": "Hastanın önerilen girişimi anlayarak ve gönüllü biçimde kabul etmesidir.",
    "shortDefinition": "Hastanın önerilen girişimi anlayarak ve gönüllü biçimde kabul etmesidir.",
    "detailedExplanation": "Hastanın önerilen girişimi anlayarak ve gönüllü biçimde kabul etmesidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Risk, yarar, alternatif ve reddetme hakkı açıklanmalıdır.",
    "tusPearl": "Risk, yarar, alternatif ve reddetme hakkı açıklanmalıdır.",
    "differentialPoint": "Acil ve bilinç kapalı durumda zorunlu müdahalelerde onam istisnaları olabilir.",
    "clinicalRelevance": "Risk, yarar, alternatif ve reddetme hakkı açıklanmalıdır.",
    "mechanism": "",
    "relatedBranches": [
      "medical-law",
      "ethics"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Aydınlatılmış onam",
      "informed consent",
      "bilgilendirilmiş onam",
      "Tıp hukuku / Etik"
    ]
  },
  {
    "term": "Malpraktis",
    "aliases": [
      "malpractice"
    ],
    "category": "Tıp hukuku",
    "previewDefinition": "Sağlık hizmetinde standart uygulamadan sapma nedeniyle zarar doğmasıdır.",
    "preAnswerSafeDefinition": "Sağlık hizmetinde standart uygulamadan sapma nedeniyle zarar doğmasıdır.",
    "shortDefinition": "Sağlık hizmetinde standart uygulamadan sapma nedeniyle zarar doğmasıdır.",
    "detailedExplanation": "Sağlık hizmetinde standart uygulamadan sapma nedeniyle zarar doğmasıdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Kusur, zarar ve nedensellik bağı değerlendirilir.",
    "tusPearl": "Kusur, zarar ve nedensellik bağı değerlendirilir.",
    "differentialPoint": "Komplikasyon uygun standartlara rağmen gelişebilen istenmeyen sonuçtur.",
    "clinicalRelevance": "Kusur, zarar ve nedensellik bağı değerlendirilir.",
    "mechanism": "",
    "relatedBranches": [
      "medical-law"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Malpraktis",
      "malpractice",
      "Tıp hukuku"
    ]
  },
  {
    "term": "Komplikasyon",
    "aliases": [
      "complication"
    ],
    "category": "Tıbbi sonuç",
    "previewDefinition": "Doğru uygulamaya rağmen gelişebilen istenmeyen tıbbi durumdur.",
    "preAnswerSafeDefinition": "Doğru uygulamaya rağmen gelişebilen istenmeyen tıbbi durumdur.",
    "shortDefinition": "Doğru uygulamaya rağmen gelişebilen istenmeyen tıbbi durumdur.",
    "detailedExplanation": "Doğru uygulamaya rağmen gelişebilen istenmeyen tıbbi durumdur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Komplikasyon ile malpraktis ayrımı standart bakım ve öngörülebilirlik üzerinden yapılır.",
    "tusPearl": "Komplikasyon ile malpraktis ayrımı standart bakım ve öngörülebilirlik üzerinden yapılır.",
    "differentialPoint": "Malpraktiste kusurlu uygulama ve zarar ilişkisi aranır.",
    "clinicalRelevance": "Komplikasyon ile malpraktis ayrımı standart bakım ve öngörülebilirlik üzerinden yapılır.",
    "mechanism": "",
    "relatedBranches": [
      "medical-law",
      "clinical-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Komplikasyon",
      "complication",
      "Tıbbi sonuç"
    ]
  },
  {
    "term": "Tıbbi endikasyon",
    "aliases": [
      "medical indication"
    ],
    "category": "Klinik karar",
    "previewDefinition": "Bir tanı veya tedavi işleminin tıbben gerekli ve uygun olma durumudur.",
    "preAnswerSafeDefinition": "Bir tanı veya tedavi işleminin tıbben gerekli ve uygun olma durumudur.",
    "shortDefinition": "Bir tanı veya tedavi işleminin tıbben gerekli ve uygun olma durumudur.",
    "detailedExplanation": "Bir tanı veya tedavi işleminin tıbben gerekli ve uygun olma durumudur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Endikasyon yoksa girişim etik ve hukuki açıdan sorun oluşturabilir.",
    "tusPearl": "Endikasyon yoksa girişim etik ve hukuki açıdan sorun oluşturabilir.",
    "differentialPoint": "Kontrendikasyon işlemin yapılmaması gereken durumu ifade eder.",
    "clinicalRelevance": "Endikasyon yoksa girişim etik ve hukuki açıdan sorun oluşturabilir.",
    "mechanism": "",
    "relatedBranches": [
      "ethics",
      "clinical-medicine"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Tıbbi endikasyon",
      "medical indication",
      "Klinik karar"
    ]
  },
  {
    "term": "Kontrendikasyon",
    "aliases": [
      "contraindication"
    ],
    "category": "Klinik karar",
    "previewDefinition": "Bir girişim veya ilacın kullanılmaması gereken durumdur.",
    "preAnswerSafeDefinition": "Bir girişim veya ilacın kullanılmaması gereken durumdur.",
    "shortDefinition": "Bir girişim veya ilacın kullanılmaması gereken durumdur.",
    "detailedExplanation": "Bir girişim veya ilacın kullanılmaması gereken durumdur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Mutlak kontrendikasyon varsa işlem yapılmaz; relatif kontrendikasyonda risk-yarar değerlendirilir.",
    "tusPearl": "Mutlak kontrendikasyon varsa işlem yapılmaz; relatif kontrendikasyonda risk-yarar değerlendirilir.",
    "differentialPoint": "Endikasyon işlemin neden gerekli olduğunu ifade eder.",
    "clinicalRelevance": "Mutlak kontrendikasyon varsa işlem yapılmaz; relatif kontrendikasyonda risk-yarar değerlendirilir.",
    "mechanism": "",
    "relatedBranches": [
      "clinical-medicine",
      "pharmacology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Kontrendikasyon",
      "contraindication",
      "Klinik karar"
    ]
  },
  {
    "term": "CEA",
    "aliases": [
      "carcinoembryonic antigen"
    ],
    "category": "Tümör belirteci",
    "previewDefinition": "Kolorektal kanser izleminde kullanılan, özgüllüğü sınırlı tümör belirtecidir.",
    "preAnswerSafeDefinition": "Kolorektal kanser izleminde kullanılan, özgüllüğü sınırlı tümör belirtecidir.",
    "shortDefinition": "Kolorektal kanser izleminde kullanılan, özgüllüğü sınırlı tümör belirtecidir.",
    "detailedExplanation": "Kolorektal kanser izleminde kullanılan, özgüllüğü sınırlı tümör belirtecidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "CEA tarama testi değil, tedavi sonrası izlem ve nüks takibinde daha değerlidir.",
    "tusPearl": "CEA tarama testi değil, tedavi sonrası izlem ve nüks takibinde daha değerlidir.",
    "differentialPoint": "PSA prostat, CA-125 over kanseri bağlamında daha sık sorulur.",
    "clinicalRelevance": "CEA tarama testi değil, tedavi sonrası izlem ve nüks takibinde daha değerlidir.",
    "mechanism": "",
    "relatedBranches": [
      "oncology",
      "gastroenterology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "CEA",
      "carcinoembryonic antigen",
      "Tümör belirteci"
    ]
  },
  {
    "term": "CA-125",
    "aliases": [
      "CA125"
    ],
    "category": "Tümör belirteci",
    "previewDefinition": "Özellikle epitelyal over kanseri izleminde kullanılan tümör belirtecidir.",
    "preAnswerSafeDefinition": "Özellikle epitelyal over kanseri izleminde kullanılan tümör belirtecidir.",
    "shortDefinition": "Özellikle epitelyal over kanseri izleminde kullanılan tümör belirtecidir.",
    "detailedExplanation": "Özellikle epitelyal over kanseri izleminde kullanılan tümör belirtecidir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Postmenopozal adneksiyal kitlede CA-125 yüksekliği malignite şüphesini artırır.",
    "tusPearl": "Postmenopozal adneksiyal kitlede CA-125 yüksekliği malignite şüphesini artırır.",
    "differentialPoint": "Endometriozis gibi benign durumlarda da yükselebilir.",
    "clinicalRelevance": "Postmenopozal adneksiyal kitlede CA-125 yüksekliği malignite şüphesini artırır.",
    "mechanism": "",
    "relatedBranches": [
      "oncology",
      "gynecology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "CA-125",
      "CA125",
      "Tümör belirteci"
    ]
  },
  {
    "term": "PSA",
    "aliases": [
      "prostate specific antigen"
    ],
    "category": "Tümör belirteci",
    "previewDefinition": "Prostat dokusundan salgılanan serin proteazdır.",
    "preAnswerSafeDefinition": "Prostat dokusundan salgılanan serin proteazdır.",
    "shortDefinition": "Prostat dokusundan salgılanan serin proteazdır.",
    "detailedExplanation": "Prostat dokusundan salgılanan serin proteazdır. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Prostat kanseri tarama/izleminde kullanılır; BPH ve prostatit de PSA yükseltebilir.",
    "tusPearl": "Prostat kanseri tarama/izleminde kullanılır; BPH ve prostatit de PSA yükseltebilir.",
    "differentialPoint": "CEA kolorektal kanser izleminde daha ilişkilidir.",
    "clinicalRelevance": "Prostat kanseri tarama/izleminde kullanılır; BPH ve prostatit de PSA yükseltebilir.",
    "mechanism": "",
    "relatedBranches": [
      "urology",
      "oncology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "PSA",
      "prostate specific antigen",
      "Tümör belirteci"
    ]
  },
  {
    "term": "AFP tümör belirteci",
    "aliases": [
      "AFP marker",
      "alfa fetoprotein tümör"
    ],
    "category": "Tümör belirteci",
    "previewDefinition": "Hepatoselüler karsinom ve nonseminomatöz germ hücreli tümörlerde yükselebilen belirteçtir.",
    "preAnswerSafeDefinition": "Hepatoselüler karsinom ve nonseminomatöz germ hücreli tümörlerde yükselebilen belirteçtir.",
    "shortDefinition": "Hepatoselüler karsinom ve nonseminomatöz germ hücreli tümörlerde yükselebilen belirteçtir.",
    "detailedExplanation": "Hepatoselüler karsinom ve nonseminomatöz germ hücreli tümörlerde yükselebilen belirteçtir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Karaciğer sirozu zemininde kitle + AFP yüksekliği HCC düşündürür.",
    "tusPearl": "Karaciğer sirozu zemininde kitle + AFP yüksekliği HCC düşündürür.",
    "differentialPoint": "Seminomda AFP yükselmesi beklenmez.",
    "clinicalRelevance": "Karaciğer sirozu zemininde kitle + AFP yüksekliği HCC düşündürür.",
    "mechanism": "",
    "relatedBranches": [
      "oncology",
      "gastroenterology",
      "urology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "AFP tümör belirteci",
      "AFP marker",
      "alfa fetoprotein tümör",
      "Tümör belirteci"
    ]
  },
  {
    "term": "Beta-hCG tümör belirteci",
    "aliases": [
      "hCG marker"
    ],
    "category": "Tümör belirteci",
    "previewDefinition": "Trofoblastik hastalık ve bazı germ hücreli tümörlerde yükselebilen hormondur.",
    "preAnswerSafeDefinition": "Trofoblastik hastalık ve bazı germ hücreli tümörlerde yükselebilen hormondur.",
    "shortDefinition": "Trofoblastik hastalık ve bazı germ hücreli tümörlerde yükselebilen hormondur.",
    "detailedExplanation": "Trofoblastik hastalık ve bazı germ hücreli tümörlerde yükselebilen hormondur. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Koryokarsinom ve nonseminomatöz germ hücreli tümörlerde yüksek değerli belirteçtir.",
    "tusPearl": "Koryokarsinom ve nonseminomatöz germ hücreli tümörlerde yüksek değerli belirteçtir.",
    "differentialPoint": "Saf seminomda AFP beklenmez; beta-hCG bazen yükselebilir.",
    "clinicalRelevance": "Koryokarsinom ve nonseminomatöz germ hücreli tümörlerde yüksek değerli belirteçtir.",
    "mechanism": "",
    "relatedBranches": [
      "oncology",
      "obstetrics",
      "urology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "Beta-hCG tümör belirteci",
      "hCG marker",
      "Tümör belirteci"
    ]
  },
  {
    "term": "LDH tümör belirteci",
    "aliases": [
      "LDH marker"
    ],
    "category": "Tümör belirteci",
    "previewDefinition": "Hücre döngüsü ve tümör yüküyle ilişkili nonspesifik belirteçtir.",
    "preAnswerSafeDefinition": "Hücre döngüsü ve tümör yüküyle ilişkili nonspesifik belirteçtir.",
    "shortDefinition": "Hücre döngüsü ve tümör yüküyle ilişkili nonspesifik belirteçtir.",
    "detailedExplanation": "Hücre döngüsü ve tümör yüküyle ilişkili nonspesifik belirteçtir. Klinik bağlamla birlikte yorumlanmalıdır.",
    "postAnswerExpandedExplanation": "Lenfoma ve germ hücreli tümörlerde prognoz/tümör yükü açısından kullanılabilir.",
    "tusPearl": "Lenfoma ve germ hücreli tümörlerde prognoz/tümör yükü açısından kullanılabilir.",
    "differentialPoint": "Özgül tanı koydurucu değildir.",
    "clinicalRelevance": "Lenfoma ve germ hücreli tümörlerde prognoz/tümör yükü açısından kullanılabilir.",
    "mechanism": "",
    "relatedBranches": [
      "oncology",
      "hematology"
    ],
    "relatedTerms": [],
    "difficulty": "orta",
    "EnglishName": "",
    "abbreviation": "",
    "keywordsForSearch": [
      "LDH tümör belirteci",
      "LDH marker",
      "Tümör belirteci"
    ]
  }
];

export const TUS_GLOSSARY_SUPPLEMENTAL_TERMS = SUPPLEMENTAL_TUS_GLOSSARY_SEEDS.map((entry) => {
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
