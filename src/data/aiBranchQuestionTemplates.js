export const AI_BRANCH_TEMPLATE_SEEDS = [
  {
    "branchId": "tus-spot-olgular",
    "source": "branch-rule-template",
    "difficulty": "Orta-Zor",
    "questionType": "spot",
    "managementSteps": [],
    "seedId": "branch-peds-febrile-seizure-001",
    "title": "Ateş sonrası kısa nöbet",
    "relatedBranch": "Çocuk Sağlığı ve Hastalıkları",
    "learningTarget": "Basit febril konvülziyonun komplike nöbet ve menenjitten ayrılması",
    "correctConcept": "Basit febril konvülziyon",
    "demographics": "18 aylık çocuk",
    "setting": "Çocuk acil",
    "chiefComplaint": "Ateş sonrası kısa jeneralize nöbet",
    "stem": "Ateşi yükselen 18 aylık çocukta 3 dakika süren jeneralize tonik-klonik nöbet sonrası bilinç hızla normale döner. Ense sertliği ve fokal nörolojik bulgu yoktur",
    "exam": [
      "Genel durum toparlamış.",
      "Ense sertliği yok.",
      "Fokal nörolojik defisit yok."
    ],
    "vitals": {
      "TA": "88/54 mmHg",
      "Nabız": "132/dk",
      "Solunum": "28/dk",
      "SpO2": "%98",
      "Ateş": "38.8 °C"
    },
    "investigations": [
      {
        "id": "peds-febrile-clinical",
        "label": "Klinik nöbet değerlendirmesi",
        "type": "clinical",
        "priority": "essential",
        "summary": "Nöbet kısa, jeneralize ve tek epizod şeklindedir.",
        "findings": [
          "Fokal bulgu yok",
          "Meningeal irritasyon yok"
        ]
      }
    ],
    "question": "Bu tabloyu en iyi açıklayan seçenek hangisidir?",
    "options": [
      {
        "id": "A",
        "text": "Basit febril konvülziyon"
      },
      {
        "id": "B",
        "text": "Komplike febril konvülziyon"
      },
      {
        "id": "C",
        "text": "Menenjit ilişkili nöbet"
      },
      {
        "id": "D",
        "text": "Absans nöbet"
      },
      {
        "id": "E",
        "text": "İnfantil spazm"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Yaşa uygun aralıkta, ateşle ilişkili, kısa süren, jeneralize ve tek nöbet olması basit febril konvülziyon lehinedir. Fokal bulgu, uzun süre, tekrarlama veya meningeal irritasyon yoktur.",
    "wrongOptionFeedback": {
      "B": "Komplike febril konvülziyonda fokal özellik, 15 dakikadan uzun süre veya 24 saatte tekrarlama beklenir.",
      "C": "Menenjitte ense sertliği, bilinç bozukluğu veya toksik görünüm gibi ek bulgular beklenir.",
      "D": "Absans nöbet ateşle ilişkili jeneralize tonik-klonik nöbet şeklinde beklenmez.",
      "E": "İnfantil spazm kümeler halinde fleksör/ekstansör spazmlar ve gelişimsel sorunlarla ilişkilidir."
    },
    "evidenceChain": [
      "Yaş pediatrik febril nöbet aralığındadır",
      "Nöbet kısa ve jeneralizedir",
      "Fokal nörolojik bulgu yoktur",
      "Meningeal irritasyon bulgusu verilmemiştir"
    ],
    "examPearl": "Basit febril konvülziyon: 6 ay-5 yaş, jeneralize, 15 dakikadan kısa ve 24 saatte tekrarlamayan nöbettir.",
    "spotCategory": "AI Spot • Çocuk Sağlığı ve Hastalıkları",
    "patientIntro": {
      "presentation": "Ateş sonrası kısa jeneralize nöbet",
      "riskContext": [],
      "distinctiveClues": [
        "Ateş sonrası kısa jeneralize nöbet",
        "Ense sertliği yok",
        "TA: 88/54 mmHg"
      ],
      "historySummary": "Ateşi yükselen 18 aylık çocukta 3 dakika süren jeneralize tonik-klonik nöbet sonrası bilinç hızla normale döner. Ense sertliği ve fokal nörolojik bulgu yoktur."
    }
  },
  {
    "branchId": "tus-spot-olgular",
    "source": "branch-rule-template",
    "difficulty": "Orta-Zor",
    "questionType": "spot",
    "managementSteps": [],
    "seedId": "branch-peds-pyloric-stenosis-001",
    "title": "Süt çocuğunda fışkırır kusma",
    "relatedBranch": "Çocuk Sağlığı ve Hastalıkları",
    "learningTarget": "Hipertrofik pilor stenozunda kusma örüntüsü ve metabolik alkalozun tanınması",
    "correctConcept": "Hipertrofik pilor stenozu",
    "demographics": "5 haftalık erkek bebek",
    "setting": "Pediatri polikliniği",
    "chiefComplaint": "Beslenme sonrası fışkırır tarzda kusma",
    "stem": "5 haftalık erkek bebekte beslenme sonrası giderek artan safrasız fışkırır kusma, kilo alamama ve dehidratasyon bulguları vardır",
    "exam": [
      "Mukozalar kuru.",
      "Safralı kusma tariflenmez."
    ],
    "vitals": {
      "TA": "82/50 mmHg",
      "Nabız": "146/dk",
      "Solunum": "32/dk",
      "SpO2": "%98",
      "Ateş": "36.7 °C"
    },
    "investigations": [
      {
        "id": "peds-pyloric-electrolyte",
        "label": "Elektrolit ve kan gazı",
        "type": "lab",
        "priority": "essential",
        "summary": "Hipokloremik metabolik alkaloz örüntüsü izlenir.",
        "findings": [
          "Klor düşük",
          "pH yüksek",
          "Bikarbonat yüksek"
        ]
      },
      {
        "id": "field-placement-repair-movpjoge",
        "label": "Hedefli görüntüleme/laboratuvar",
        "type": "Imaging",
        "priority": "Useful",
        "summary": "Üst abdomende zeytin benzeri kitle palpe edilebilir.",
        "findings": [
          "Üst abdomende zeytin benzeri kitle palpe edilebilir"
        ]
      }
    ],
    "question": "Bu pediatrik tablo için en olası tanı hangisidir?",
    "options": [
      {
        "id": "A",
        "text": "Hipertrofik pilor stenozu"
      },
      {
        "id": "B",
        "text": "İntestinal malrotasyon ve volvulus"
      },
      {
        "id": "C",
        "text": "Gastroözofageal reflü"
      },
      {
        "id": "D",
        "text": "Nekrotizan enterokolit"
      },
      {
        "id": "E",
        "text": "Akut gastroenterit"
      }
    ],
    "correctAnswer": "A",
    "explanation": "2-8 haftalık bebekte safrasız fışkırır kusma, kilo alamama ve hipokloremik metabolik alkaloz hipertrofik pilor stenozu için tipiktir.",
    "wrongOptionFeedback": {
      "B": "Malrotasyon-volvulusta safralı kusma ve akut toksik tablo beklenir.",
      "C": "Reflü genellikle fışkırır progresif kusma ve belirgin alkaloz yapmaz.",
      "D": "NEK prematüre bebekte abdominal distansiyon, kanlı dışkı ve sistemik bulgularla beklenir.",
      "E": "Gastroenteritte ishal ve enfeksiyöz bulgular ön plandadır. Tipik alkaloz beklenmez."
    },
    "evidenceChain": [
      "Yaş aralığı pilor stenozu için tipiktir",
      "Kusma safrasız ve fışkırır tarzdadır",
      "Dehidratasyon ve kilo alamama vardır",
      "Hipokloremik metabolik alkaloz ayırt ettiricidir"
    ],
    "examPearl": "Hipertrofik pilor stenozu safrasız fışkırır kusma ve hipokloremik metabolik alkalozla TUS’ta klasikleşmiştir.",
    "spotCategory": "AI Spot • Çocuk Sağlığı ve Hastalıkları",
    "patientIntro": {
      "presentation": "Beslenme sonrası fışkırır tarzda kusma",
      "riskContext": [],
      "distinctiveClues": [
        "Beslenme sonrası fışkırır tarzda kusma",
        "Mukozalar kuru",
        "Üst abdomende zeytin benzeri kitle palpe edilebilir",
        "Klor düşük"
      ],
      "historySummary": "5 haftalık erkek bebekte beslenme sonrası giderek artan safrasız fışkırır kusma, kilo alamama ve dehidratasyon bulguları vardır."
    }
  },
  {
    "branchId": "tus-spot-olgular",
    "source": "branch-rule-template",
    "difficulty": "Orta-Zor",
    "questionType": "spot",
    "managementSteps": [],
    "seedId": "branch-obgyn-preeclampsia-001",
    "title": "Gebelikte hipertansiyon ve baş ağrısı",
    "relatedBranch": "Kadın Hastalıkları ve Doğum",
    "learningTarget": "Preeklampside hipertansiyon, proteinüri ve ağır bulguların ayırt edilmesi",
    "correctConcept": "Preeklampsi",
    "demographics": "31 yaş gebe kadın",
    "setting": "Antenatal değerlendirme",
    "chiefComplaint": "Baş ağrısı ve tansiyon yüksekliği",
    "stem": "32 haftalık gebe kadın baş ağrısı ve görmede bulanıklık nedeniyle değerlendirilir. Kan basıncı yüksek ve idrarda protein pozitiftir",
    "exam": [
      "Pretibial ödem.",
      "Sağ üst kadran hassasiyeti yok.",
      "Bilinç açık."
    ],
    "vitals": {
      "TA": "158/98 mmHg",
      "Nabız": "92/dk",
      "Solunum": "18/dk",
      "SpO2": "%98",
      "Ateş": "36.8 °C"
    },
    "investigations": [
      {
        "id": "obgyn-preeclampsia-urine",
        "label": "İdrar protein değerlendirmesi",
        "type": "lab",
        "priority": "essential",
        "summary": "Proteinüri pozitif saptanır.",
        "findings": [
          "Proteinüri mevcut",
          "Trombosit ağır düşüklükte değil"
        ]
      }
    ],
    "question": "Bu obstetrik tablo en çok hangi tanıyı destekler?",
    "options": [
      {
        "id": "A",
        "text": "Preeklampsi"
      },
      {
        "id": "B",
        "text": "Gestasyonel hipertansiyon"
      },
      {
        "id": "C",
        "text": "Kronik hipertansiyon"
      },
      {
        "id": "D",
        "text": "Eklampsi"
      },
      {
        "id": "E",
        "text": "HELLP sendromu"
      }
    ],
    "correctAnswer": "A",
    "explanation": "20. Gebelik haftasından sonra hipertansiyon ve proteinüri birlikteliği preeklampsi lehinedir. Nöbet olmadığı için eklampsi, hemoliz-karaciğer enzim yüksekliği-trombositopeni olmadığı için HELLP öncelikli değildir.",
    "wrongOptionFeedback": {
      "B": "Gestasyonel hipertansiyonda proteinüri veya hedef organ bulgusu beklenmez.",
      "C": "Kronik hipertansiyon gebelik öncesi veya 20. Haftadan önce başlar.",
      "D": "Eklampsi preeklampsi zemininde nöbet gelişmesidir. Nöbet verilmemiştir.",
      "E": "HELLP için hemoliz, yüksek karaciğer enzimleri ve düşük trombosit gerekir."
    },
    "evidenceChain": [
      "Gebelik 20. Haftadan sonradır",
      "Kan basıncı yüksek ölçülmüştür",
      "Proteinüri vardır",
      "Nöbet olmaması eklampsiyi dışlar"
    ],
    "examPearl": "Preeklampsi tanısında 20. Haftadan sonra hipertansiyon + proteinüri veya hedef organ bulgusu aranır.",
    "spotCategory": "AI Spot • Kadın Hastalıkları ve Doğum",
    "patientIntro": {
      "presentation": "Baş ağrısı ve tansiyon yüksekliği",
      "riskContext": [],
      "distinctiveClues": [
        "Baş ağrısı ve tansiyon yüksekliği",
        "Pretibial ödem",
        "Proteinüri pozitif saptanır",
        "TA: 158/98 mmHg"
      ],
      "historySummary": "32 haftalık gebe kadın baş ağrısı ve görmede bulanıklık nedeniyle değerlendirilir. Kan basıncı yüksek ve idrarda protein pozitiftir."
    }
  },
  {
    "branchId": "tus-spot-olgular",
    "source": "branch-rule-template",
    "difficulty": "Orta-Zor",
    "questionType": "spot",
    "managementSteps": [],
    "seedId": "branch-obgyn-endometriosis-001",
    "title": "Dismenore ve infertilite",
    "relatedBranch": "Kadın Hastalıkları ve Doğum",
    "learningTarget": "Endometrioziste siklik ağrı ve infertilite örüntüsünün tanınması",
    "correctConcept": "Endometriozis",
    "demographics": "28 yaş kadın",
    "setting": "Kadın doğum polikliniği",
    "chiefComplaint": "Kronik pelvik ağrı ve infertilite",
    "stem": "28 yaş kadın giderek artan dismenore, derin disparoni ve bir yıldır gebelik oluşmaması nedeniyle başvurur",
    "exam": [
      "Uterosakral ligamentlerde hassasiyet.",
      "Adneksiyal hassasiyet olabilir.",
      "Ateş veya akut batın bulgusu yok."
    ],
    "vitals": {
      "TA": "112/70 mmHg",
      "Nabız": "84/dk",
      "Solunum": "16/dk",
      "SpO2": "%99",
      "Ateş": "36.6 °C"
    },
    "investigations": [
      {
        "id": "obgyn-endo-usg",
        "label": "Pelvik ultrasonografi",
        "type": "ultrasound",
        "priority": "useful",
        "summary": "Endometrioma ile uyumlu homojen düşük eko içeren kistik görünüm izlenebilir.",
        "findings": [
          "Siklik ağrı ile uyumlu pelvik bulgu",
          "Akut enfeksiyon bulgusu yok"
        ]
      }
    ],
    "question": "Bu jinekolojik örüntü en çok hangi durumu düşündürür?",
    "options": [
      {
        "id": "A",
        "text": "Endometriozis"
      },
      {
        "id": "B",
        "text": "Pelvik inflamatuvar hastalık"
      },
      {
        "id": "C",
        "text": "Miyoma uteri"
      },
      {
        "id": "D",
        "text": "Polikistik over sendromu"
      },
      {
        "id": "E",
        "text": "Over torsiyonu"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Siklik pelvik ağrı, progresif dismenore, derin disparoni ve infertilite birlikteliği endometriozis için karakteristiktir.",
    "wrongOptionFeedback": {
      "B": "PID’de ateş, servikal hareket hassasiyeti ve enfeksiyon bulguları ön plandadır.",
      "C": "Miyom anormal uterin kanama ve bası semptomları yapabilir. Siklik disparoni-infertilite örüntüsü daha zayıftır.",
      "D": "PKOS oligo/anovülasyon ve hiperandrojenizmle beklenir.",
      "E": "Over torsiyonu ani şiddetli ağrı ve akut batın örüntüsündedir."
    },
    "evidenceChain": [
      "Ağrı siklik ve progresiftir",
      "Derin disparoni eşlik eder",
      "İnfertilite vardır",
      "Akut enfeksiyon veya torsiyon bulgusu yoktur"
    ],
    "examPearl": "Endometriozis TUS’ta dismenore + disparoni + infertilite üçlüsüyle sık sorulur.",
    "spotCategory": "AI Spot • Kadın Hastalıkları ve Doğum",
    "patientIntro": {
      "presentation": "Kronik pelvik ağrı ve infertilite",
      "riskContext": [],
      "distinctiveClues": [
        "Kronik pelvik ağrı ve infertilite",
        "Uterosakral ligamentlerde hassasiyet",
        "Endometrioma ile uyumlu homojen düşük eko içeren kistik görünüm izlenebilir",
        "TA: 112/70 mmHg"
      ],
      "historySummary": "28 yaş kadın giderek artan dismenore, derin disparoni ve bir yıldır gebelik oluşmaması nedeniyle başvurur."
    }
  },
  {
    "branchId": "tus-spot-olgular",
    "source": "branch-rule-template",
    "difficulty": "Orta-Zor",
    "questionType": "spot",
    "managementSteps": [],
    "seedId": "branch-physiology-baroreceptor-001",
    "title": "Ortostatik sempatik yanıt",
    "relatedBranch": "Fizyoloji",
    "learningTarget": "Baroreseptör refleksinde ayağa kalkınca sempatik aktivite artışının yorumlanması",
    "correctConcept": "Sempatik aktivite artışı ve vagal aktivite azalması",
    "demographics": "22 yaş sağlıklı gönüllü",
    "setting": "Fizyoloji laboratuvarı",
    "chiefComplaint": "Klinik değerlendirme gerektiren başvuru",
    "stem": "Sağlıklı gönüllü yatar pozisyondan ayağa kaldırıldığında venöz dönüş kısa süre azalır ve arter basıncı düşme eğilimi gösterir",
    "exam": [
      "Bilinç açık.",
      "Kardiyak oskültasyon doğal.",
      "Nörolojik defisit yok.",
      "Ayağa kalkma sonrası refleks yanıt."
    ],
    "vitals": {
      "TA": "112/70 mmHg",
      "Nabız": "96/dk",
      "Solunum": "16/dk",
      "SpO2": "%99",
      "Ateş": "36.6 °C"
    },
    "investigations": [
      {
        "id": "physio-baro",
        "label": "Refleks yanıt izlemi",
        "type": "physiology",
        "priority": "essential",
        "summary": "Kısa süreli basınç azalmasına karşı kalp hızı artar.",
        "findings": [
          "Baroreseptör deşarjı azalır",
          "Sempatik çıkış artar"
        ]
      }
    ],
    "question": "Bu fizyolojik durumda beklenen ana otonom yanıt hangisidir?",
    "options": [
      {
        "id": "A",
        "text": "Sempatik aktivite artışı ve vagal aktivite azalması"
      },
      {
        "id": "B",
        "text": "Sempatik aktivite azalması ve vagal aktivite artışı"
      },
      {
        "id": "C",
        "text": "Parasempatik aktivitenin izole artışı"
      },
      {
        "id": "D",
        "text": "Baroreseptör deşarjının artması"
      },
      {
        "id": "E",
        "text": "Kalp hızında refleks azalma"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Ayağa kalkınca venöz dönüş ve arter basıncı azalır. Baroreseptör deşarjı azalınca sempatik aktivite artar, vagal tonus azalır ve kalp hızı yükselir.",
    "wrongOptionFeedback": {
      "B": "Bu yanıt arter basıncı artınca beklenir. Ortostazda tersidir.",
      "C": "İzole parasempatik artış bradikardi yapar ve ortostatik kompansasyona uymaz.",
      "D": "Basınç azalınca baroreseptör deşarjı artmaz, azalır.",
      "E": "Ortostazda kalp hızı refleks olarak artar."
    },
    "evidenceChain": [
      "Ayağa kalkınca venöz dönüş azalır",
      "Arter basıncı düşme eğilimindedir",
      "Baroreseptör deşarjı azalır",
      "Sempatik aktivite kompansatuvar artar"
    ],
    "examPearl": "Baroreseptör refleksinde basınç düşerse sempatik artar, parasempatik azalır. Basınç artarsa bunun tersi olur.",
    "spotCategory": "AI Spot • Fizyoloji",
    "patientIntro": {
      "presentation": "Klinik değerlendirme gerektiren başvuru",
      "riskContext": [],
      "distinctiveClues": [
        "Klinik değerlendirme gerektiren başvuru",
        "Kardiyak oskültasyon doğal",
        "TA: 112/70 mmHg"
      ],
      "historySummary": "Sağlıklı gönüllü yatar pozisyondan ayağa kaldırıldığında venöz dönüş kısa süre azalır ve arter basıncı düşme eğilimi gösterir."
    }
  },
  {
    "branchId": "tus-spot-olgular",
    "source": "branch-rule-template",
    "difficulty": "Orta-Zor",
    "questionType": "spot",
    "managementSteps": [],
    "seedId": "branch-physiology-vq-001",
    "title": "Ventilasyon perfüzyon uyumsuzluğu",
    "relatedBranch": "Fizyoloji",
    "learningTarget": "Pulmoner embolide yüksek V/Q ve ölü boşluk ventilasyonunun ayırt edilmesi",
    "correctConcept": "Yüksek V/Q oranı ve alveoler ölü boşluk artışı",
    "demographics": "Fizyoloji pratiğinde değerlendirilen olgu",
    "setting": "Solunum fizyolojisi pratiği",
    "chiefComplaint": "Ani perfüzyon azalması sonrası gaz değişimi",
    "stem": "Bir akciğer bölgesinde ventilasyon korunurken perfüzyon belirgin azalır. Gaz değişimi etkinliği düşer",
    "exam": [
      "Solunum sayısı artmış olabilir.",
      "Oksijen satürasyonu düşme eğilimindedir.",
      "Kardiyak muayene belirleyici değildir."
    ],
    "vitals": {
      "TA": "116/74 mmHg",
      "Nabız": "104/dk",
      "Solunum": "24/dk",
      "SpO2": "%92",
      "Ateş": "36.8 °C"
    },
    "investigations": [
      {
        "id": "physio-vq",
        "label": "V/Q değerlendirmesi",
        "type": "physiology",
        "priority": "essential",
        "summary": "Ventilasyon korunurken perfüzyon azalması yüksek V/Q örüntüsüne yol açar.",
        "findings": [
          "Perfüzyon azalır",
          "Ölü boşluk etkisi artar"
        ]
      }
    ],
    "question": "Bu fizyoloji örüntüsü için en doğru ifade hangisidir?",
    "options": [
      {
        "id": "A",
        "text": "Yüksek V/Q oranı ve alveoler ölü boşluk artışı"
      },
      {
        "id": "B",
        "text": "Düşük V/Q oranı ve şant etkisi"
      },
      {
        "id": "C",
        "text": "Ventilasyonun tamamen durması"
      },
      {
        "id": "D",
        "text": "Difüzyon kapasitesinin izole artışı"
      },
      {
        "id": "E",
        "text": "Hipoventilasyona bağlı normal V/Q"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Perfüzyon azalırken ventilasyon korunursa ilgili bölgede V/Q oranı yükselir ve alveoler ölü boşluk etkisi artar.",
    "wrongOptionFeedback": {
      "B": "Düşük V/Q daha çok ventilasyon azalması veya şant benzeri durumlarda beklenir.",
      "C": "Ventilasyon tamamen durmamıştır. Sorun perfüzyon azalmasıdır.",
      "D": "Difüzyon kapasitesi izole artmaz.",
      "E": "Burada temel olay global hipoventilasyon değil bölgesel perfüzyon azalmasıdır."
    },
    "evidenceChain": [
      "Ventilasyon korunmuştur",
      "Perfüzyon azalmıştır",
      "Bu nedenle V/Q oranı yükselir",
      "Ölü boşluk ventilasyonu artar"
    ],
    "examPearl": "Pulmoner emboli fizyolojisinde perfüzyon azalır. V/Q yükselir ve alveoler ölü boşluk artar.",
    "spotCategory": "AI Spot • Fizyoloji",
    "patientIntro": {
      "presentation": "Ani perfüzyon azalması sonrası gaz değişimi",
      "riskContext": [],
      "distinctiveClues": [
        "Ani perfüzyon azalması sonrası gaz değişimi",
        "TA: 116/74 mmHg"
      ],
      "historySummary": "Bir akciğer bölgesinde ventilasyon korunurken perfüzyon belirgin azalır. Gaz değişimi etkinliği düşer."
    }
  },
  {
    "branchId": "tus-spot-olgular",
    "source": "branch-rule-template",
    "difficulty": "Orta-Zor",
    "questionType": "spot",
    "managementSteps": [],
    "seedId": "branch-histo-neural-crest-001",
    "title": "Nöral krest kökeni",
    "relatedBranch": "Histoloji ve Embriyoloji",
    "learningTarget": "Nöral krest hücrelerinden gelişen yapıların ayırt edilmesi",
    "correctConcept": "Adrenal medulla kromaffin hücreleri",
    "demographics": "Embriyoloji spot pratiğinde değerlendirilen olgu",
    "setting": "Embriyoloji TUS pratiği",
    "chiefComplaint": "Embriyolojik köken yorumu",
    "stem": "Embriyoloji pratiğinde sempatik zincir ganglionları ve melanositlerle aynı kökenden gelişen endokrin yapı sorulur",
    "exam": [
      "Klinik muayene değil embriyolojik köken bilgisi ölçülür.",
      "Nöral krest ilişkisi vurgulanır."
    ],
    "vitals": {
      "TA": "110/70 mmHg",
      "Nabız": "82/dk",
      "Solunum": "16/dk",
      "SpO2": "%99",
      "Ateş": "36.7 °C"
    },
    "investigations": [
      {
        "id": "histo-neural-crest",
        "label": "Embriyolojik köken ipucu",
        "type": "embryology",
        "priority": "essential",
        "summary": "Nöral krest kökenli hücre ailesi sorgulanır.",
        "findings": [
          "Melanositler ve periferik ganglionlar aynı köken ailesindedir"
        ]
      }
    ],
    "question": "Bu embriyolojik köken ailesine en uygun seçenek hangisidir?",
    "options": [
      {
        "id": "A",
        "text": "Adrenal medulla kromaffin hücreleri"
      },
      {
        "id": "B",
        "text": "Adrenal korteks zona glomeruloza hücreleri"
      },
      {
        "id": "C",
        "text": "Karaciğer hepatositleri"
      },
      {
        "id": "D",
        "text": "Pankreas ekzokrin asiner hücreleri"
      },
      {
        "id": "E",
        "text": "Tiroid follikül hücreleri"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Adrenal medulla kromaffin hücreleri nöral krest kökenlidir. Adrenal korteks mezoderm, hepatosit ve pankreas endoderm kökenlidir.",
    "wrongOptionFeedback": {
      "B": "Adrenal korteks mezoderm kökenlidir.",
      "C": "Hepatositler endoderm kökenlidir.",
      "D": "Pankreas ekzokrin hücreleri endoderm kökenlidir.",
      "E": "Tiroid follikül hücreleri endodermal farengeal taban kökenlidir."
    },
    "evidenceChain": [
      "Soru embriyolojik kökeni ölçer",
      "Nöral krest periferik ganglion ve melanositlerle ilişkilidir",
      "Adrenal medulla kromaffin hücreleri bu aileye dahildir",
      "Adrenal korteks farklı kökenden gelişir"
    ],
    "examPearl": "Nöral krest: Schwann hücreleri, melanositler, adrenal medulla, periferik ganglionlar ve kraniyofasiyal yapılarla ilişkilidir.",
    "spotCategory": "AI Spot • Histoloji ve Embriyoloji",
    "patientIntro": {
      "presentation": "Embriyolojik köken yorumu",
      "riskContext": [],
      "distinctiveClues": [
        "Embriyolojik köken yorumu",
        "Nöral krest ilişkisi vurgulanır",
        "TA: 110/70 mmHg"
      ],
      "historySummary": "Embriyoloji pratiğinde sempatik zincir ganglionları ve melanositlerle aynı kökenden gelişen endokrin yapı sorulur."
    }
  },
  {
    "branchId": "tus-spot-olgular",
    "source": "branch-rule-template",
    "difficulty": "Orta-Zor",
    "questionType": "spot",
    "managementSteps": [],
    "seedId": "branch-histo-thyroglossal-001",
    "title": "Orta hatta hareketli boyun kitlesi",
    "relatedBranch": "Histoloji ve Embriyoloji",
    "learningTarget": "Tiroglossal kanal kistinin embriyolojik kökeninin tanınması",
    "correctConcept": "Tiroglossal kanal kisti",
    "demographics": "Konjenital anomali nedeniyle değerlendirilen bebek",
    "setting": "Embriyoloji TUS pratiği",
    "chiefComplaint": "Dil çıkarma ile hareket eden orta hat boyun kitlesi",
    "stem": "Lezyon orta hattadır. Klinik kararı yönlendiren ana bulgudur. Bu nedenle Tiroglossal kanal kisti diğer seçeneklere göre daha güçlü açıklama sağlar",
    "exam": [
      "Dil çıkarma ile hareket belirgin.",
      "Lateral servikal lenfadenopati ön planda değil."
    ],
    "vitals": {
      "TA": "90/55 mmHg",
      "Nabız": "100/dk",
      "Solunum": "20/dk",
      "SpO2": "%99",
      "Ateş": "36.7 °C"
    },
    "investigations": [
      {
        "id": "histo-thyroglossal",
        "label": "Embriyolojik lokalizasyon",
        "type": "embryology",
        "priority": "essential",
        "summary": "Tiroid bezinin dil kökünden iniş yolunun kalıntısı düşünülür.",
        "findings": [
          "Orta hat lezyonu",
          "Yutkunma ve dil hareketiyle yer değiştirir"
        ]
      },
      {
        "id": "field-placement-repair-movpjoov",
        "label": "Hedefli görüntüleme/laboratuvar",
        "type": "Imaging",
        "priority": "Useful",
        "summary": "Orta hatta kistik lezyon.",
        "findings": [
          "Orta hatta kistik lezyon"
        ]
      }
    ],
    "question": "Bu embriyolojik örüntü en çok hangi duruma uyar?",
    "options": [
      {
        "id": "A",
        "text": "Tiroglossal kanal kisti"
      },
      {
        "id": "B",
        "text": "Brankial yarık kisti"
      },
      {
        "id": "C",
        "text": "Kistik higroma"
      },
      {
        "id": "D",
        "text": "Dermoid kist"
      },
      {
        "id": "E",
        "text": "Servikal lenfadenit"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Orta hatta yerleşen ve yutkunma/dil çıkarma ile hareket eden boyun kisti tiroglossal kanal kalıntısını düşündürür.",
    "wrongOptionFeedback": {
      "B": "Brankial yarık kisti genellikle lateral boyunda yerleşir.",
      "C": "Kistik higroma lenfatik malformasyondur ve posterior/lateral boyunda olabilir.",
      "D": "Dermoid kist orta hatta olabilir ancak dil hareketiyle tipik hareket beklenmez.",
      "E": "Lenfadenit inflamatuvar hassasiyet ve enfeksiyon bulgularıyla beklenir."
    },
    "evidenceChain": [
      "Lezyon orta hattadır",
      "Yutkunma ve dil çıkarma ile hareket eder",
      "Tiroid iniş yolu kalıntısı düşünülür",
      "Lateral yerleşim olmaması brankial kisti zayıflatır"
    ],
    "examPearl": "Tiroglossal kanal kisti orta hatta olur ve yutkunma/dil çıkarma ile hareket eder.",
    "spotCategory": "AI Spot • Histoloji ve Embriyoloji",
    "patientIntro": {
      "presentation": "Dil çıkarma ile hareket eden orta hat boyun kitlesi",
      "riskContext": [],
      "distinctiveClues": [
        "Dil çıkarma ile hareket eden orta hat boyun kitlesi",
        "Lateral servikal lenfadenopati ön planda değil",
        "Orta hatta kistik lezyon",
        "TA: 90/55 mmHg"
      ],
      "historySummary": "Lezyon orta hattadır. Klinik kararı yönlendiren ana bulgudur. Bu nedenle Tiroglossal kanal kisti diğer seçeneklere göre daha güçlü açıklama sağlar."
    }
  },
  {
    "branchId": "tus-spot-olgular",
    "source": "branch-rule-template",
    "difficulty": "Orta-Zor",
    "questionType": "spot",
    "managementSteps": [],
    "seedId": "branch-anatomy-radial-nerve-001",
    "title": "El bileği düşüklüğü",
    "relatedBranch": "Anatomi",
    "learningTarget": "Humerus cisim kırığında radial sinir lezyonunun motor bulgularla tanınması",
    "correctConcept": "Radial sinir hasarı",
    "demographics": "Travma sonrası değerlendirilen hasta",
    "setting": "Travma değerlendirmesi",
    "chiefComplaint": "Humerus kırığı sonrası el bileği ekstansiyon kaybı",
    "stem": "Humerus cisim kırığı sonrası hastada el bileğini ve parmakları ekstansiyona getirememe gelişir. Dorsal elde duyu azalması vardır",
    "exam": [
      "El bileği ekstansiyonu zayıf.",
      "Parmak ekstansiyonu zayıf.",
      "Dorsal el duyusunda azalma."
    ],
    "vitals": {
      "TA": "118/76 mmHg",
      "Nabız": "92/dk",
      "Solunum": "18/dk",
      "SpO2": "%99",
      "Ateş": "36.6 °C"
    },
    "investigations": [
      {
        "id": "anat-radial-localization",
        "label": "Anatomik lezyon lokalizasyonu",
        "type": "anatomy",
        "priority": "essential",
        "summary": "Humerus spiral oluğu komşuluğunda seyreden sinir etkilenmiş olabilir.",
        "findings": [
          "Ekstansör kas fonksiyon kaybı",
          "Dorsal el duyu etkilenimi"
        ]
      }
    ],
    "question": "Bu anatomik lezyonda en olası etkilenen yapı hangisidir?",
    "options": [
      {
        "id": "A",
        "text": "Radial sinir hasarı"
      },
      {
        "id": "B",
        "text": "Median sinir hasarı"
      },
      {
        "id": "C",
        "text": "Ulnar sinir hasarı"
      },
      {
        "id": "D",
        "text": "Muskülokütan sinir hasarı"
      },
      {
        "id": "E",
        "text": "Aksiller sinir hasarı"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Humerus cisim kırığında spiral oluk komşuluğundaki radial sinir etkilenebilir. El bileği/parmak ekstansiyon kaybı ve dorsal el duyu azalması beklenir.",
    "wrongOptionFeedback": {
      "B": "Median sinir daha çok önkol pronasyon, başparmak opposition ve lateral el duyusuyla ilişkilidir.",
      "C": "Ulnar sinir intrinsik el kasları ve medial el duyusu ile ilişkilidir.",
      "D": "Muskülokütan sinir dirsek fleksiyonu ve lateral önkol duyusuyla ilişkilidir.",
      "E": "Aksiller sinir deltoid fonksiyonu ve omuz lateral duyusuyla ilişkilidir."
    },
    "evidenceChain": [
      "Humerus cisim kırığı vardır",
      "El bileği ekstansiyonu etkilenmiştir",
      "Dorsal el duyusu azalmıştır",
      "Radial sinir spiral olukta risk altındadır"
    ],
    "examPearl": "Humerus shaft kırığı + wrist drop = radial sinir lezyonu klasik TUS eşleşmesidir.",
    "spotCategory": "AI Spot • Anatomi",
    "patientIntro": {
      "presentation": "Humerus kırığı sonrası el bileği ekstansiyon kaybı",
      "riskContext": [],
      "distinctiveClues": [
        "Humerus kırığı sonrası el bileği ekstansiyon kaybı",
        "TA: 118/76 mmHg"
      ],
      "historySummary": "Humerus cisim kırığı sonrası hastada el bileğini ve parmakları ekstansiyona getirememe gelişir. Dorsal elde duyu azalması vardır."
    }
  },
  {
    "branchId": "tus-spot-olgular",
    "source": "branch-rule-template",
    "difficulty": "Orta-Zor",
    "questionType": "spot",
    "managementSteps": [],
    "seedId": "branch-surgery-appendicitis-001",
    "title": "Göç eden sağ alt kadran ağrısı",
    "relatedBranch": "Genel Cerrahi",
    "learningTarget": "Akut apandisitte periumbilikal ağrının sağ alt kadrana göçünü tanımak",
    "correctConcept": "Akut apandisit",
    "demographics": "24 yaş erkek",
    "setting": "Genel cerrahi acil",
    "chiefComplaint": "Göç eden karın ağrısı",
    "stem": "Önce periumbilikal başlayan ağrı saatler içinde sağ alt kadrana yerleşir. İştahsızlık ve bulantı eşlik eder",
    "exam": [
      "McBurney noktasında hassasiyet.",
      "Rebound hafif pozitif.",
      "Yaygın defans yok."
    ],
    "vitals": {
      "TA": "116/72 mmHg",
      "Nabız": "98/dk",
      "Solunum": "18/dk",
      "SpO2": "%98",
      "Ateş": "37.9 °C"
    },
    "investigations": [
      {
        "id": "surgery-appendix",
        "label": "Cerrahi akut karın değerlendirmesi",
        "type": "clinical",
        "priority": "essential",
        "summary": "Lokalize sağ alt kadran hassasiyeti akut apandisit örüntüsünü destekler.",
        "findings": [
          "Göç eden ağrı",
          "Lokal periton irritasyonu"
        ]
      }
    ],
    "question": "Bu cerrahi akut karın örüntüsü için en olası tanı hangisidir?",
    "options": [
      {
        "id": "A",
        "text": "Akut apandisit"
      },
      {
        "id": "B",
        "text": "Akut kolesistit"
      },
      {
        "id": "C",
        "text": "Divertikülit"
      },
      {
        "id": "D",
        "text": "Renal kolik"
      },
      {
        "id": "E",
        "text": "Akut pankreatit"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Periumbilikal ağrının sağ alt kadrana göçü, iştahsızlık ve McBurney hassasiyeti akut apandisit için klasik örüntü oluşturur.",
    "wrongOptionFeedback": {
      "B": "Kolesistit sağ üst kadran ağrısı ve Murphy bulgusuyla beklenir.",
      "C": "Divertikülit daha çok sol alt kadran ağrısı yapar.",
      "D": "Renal kolikte yan ağrısı ve hematüri ön plandadır.",
      "E": "Pankreatit epigastrik sırta vuran ağrı ve enzim yüksekliğiyle beklenir."
    },
    "evidenceChain": [
      "Ağrı periumbilikal başlar",
      "Sağ alt kadrana göç eder",
      "İştahsızlık eşlik eder",
      "McBurney hassasiyeti vardır"
    ],
    "examPearl": "Akut apandisitte visseral periumbilikal ağrı parietal periton tutulunca sağ alt kadrana lokalize olur.",
    "spotCategory": "AI Spot • Genel Cerrahi",
    "patientIntro": {
      "presentation": "Göç eden karın ağrısı",
      "riskContext": [],
      "distinctiveClues": [
        "Göç eden karın ağrısı",
        "McBurney noktasında hassasiyet",
        "TA: 116/72 mmHg"
      ],
      "historySummary": "Önce periumbilikal başlayan ağrı saatler içinde sağ alt kadrana yerleşir. İştahsızlık ve bulantı eşlik eder."
    }
  },
  {
    "branchId": "tus-spot-olgular",
    "source": "branch-rule-template",
    "difficulty": "Orta-Zor",
    "questionType": "spot",
    "managementSteps": [],
    "seedId": "branch-minor-stroke-001",
    "title": "Ani konuşma bozukluğu",
    "relatedBranch": "Küçük Stajlar",
    "learningTarget": "Akut inmede ilk görüntüleme basamağının seçilmesi",
    "correctConcept": "Kontrastsız beyin BT",
    "demographics": "67 yaş kadın",
    "setting": "Acil servis",
    "chiefComplaint": "Ani konuşma bozukluğu ve sağ kol güçsüzlüğü",
    "stem": "Son 60 dakika içinde başlayan afazi ve sağ kol güçsüzlüğü olan hasta acil servise getirilir",
    "exam": [
      "Afazi mevcut.",
      "Sağ üst ekstremitede motor güç azalmış.",
      "Hipoglisemi dışlanmış."
    ],
    "vitals": {
      "TA": "168/94 mmHg",
      "Nabız": "88/dk",
      "Solunum": "18/dk",
      "SpO2": "%97",
      "Ateş": "36.8 °C"
    },
    "investigations": [
      {
        "id": "minor-stroke-glucose",
        "label": "Hızlı metabolik dışlama",
        "type": "lab",
        "priority": "essential",
        "summary": "Kapiller glukoz normal aralıktadır.",
        "findings": [
          "Hipoglisemi yok",
          "Akut nörolojik defisit devam ediyor"
        ]
      }
    ],
    "question": "Bu nöroloji acilinde ilk görüntüleme yaklaşımı hangisidir?",
    "options": [
      {
        "id": "A",
        "text": "Kontrastsız beyin BT"
      },
      {
        "id": "B",
        "text": "Elektif beyin MRG randevusu"
      },
      {
        "id": "C",
        "text": "Lomber ponksiyon"
      },
      {
        "id": "D",
        "text": "EEG"
      },
      {
        "id": "E",
        "text": "Servikal grafi"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Akut inme şüphesinde kanama dışlamak ve reperfüzyon kararını hızlandırmak için ilk görüntüleme kontrastsız beyin BT’dir.",
    "wrongOptionFeedback": {
      "B": "MRG yararlı olabilir ancak ilk acil dışlama basamağının gecikmesine yol açmamalıdır.",
      "C": "LP menenjit/subaraknoid kanama gibi farklı bağlamlarda düşünülür. Akut inmede ilk basamak değildir.",
      "D": "EEG nöbet/epilepsi değerlendirmesinde kullanılır.",
      "E": "Servikal grafi akut fokal nörolojik defisitin ilk değerlendirmesi değildir."
    },
    "evidenceChain": [
      "Defisit ani başlamıştır",
      "Semptom süresi reperfüzyon penceresine uyabilir",
      "Hipoglisemi dışlanmıştır",
      "Kanama dışlanmadan trombolitik karar verilmez"
    ],
    "examPearl": "Akut inmede ilk kritik görüntüleme kontrastsız beyin BT’dir. Amaç kanamayı hızlı dışlamaktır.",
    "spotCategory": "AI Spot • Küçük Stajlar",
    "patientIntro": {
      "presentation": "Ani konuşma bozukluğu ve sağ kol güçsüzlüğü",
      "riskContext": [],
      "distinctiveClues": [
        "Ani konuşma bozukluğu ve sağ kol güçsüzlüğü",
        "Kapiller glukoz normal aralıktadır",
        "TA: 168/94 mmHg"
      ],
      "historySummary": "Son 60 dakika içinde başlayan afazi ve sağ kol güçsüzlüğü olan hasta acil servise getirilir."
    }
  }
];
