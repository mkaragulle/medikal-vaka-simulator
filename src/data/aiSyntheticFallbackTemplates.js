export const AI_SYNTHETIC_FALLBACK_SEEDS = [
  {
    "branchId": "tus-spot-olgular",
    "source": "synthetic-template-bank",
    "difficulty": "Orta-Zor",
    "questionType": "spot",
    "managementSteps": [],
    "seedId": "synthetic-peds-bronchiolitis-001",
    "title": "Süt çocuğunda hışıltılı solunum",
    "relatedBranch": "Çocuk Sağlığı ve Hastalıkları",
    "learningTarget": "Bronşiolitte destek tedavisi ve gereksiz bronkodilatör/antibiyotik ayrımı",
    "correctConcept": "Nazal aspirasyon, oksijen ve hidrasyon desteği",
    "demographics": "8 aylık erkek bebek",
    "setting": "Çocuk acil",
    "chiefComplaint": "Öksürük, hışıltı ve beslenmede azalma",
    "stem": "Üç gündür burun akıntısı ve öksürüğü olan 8 aylık bebekte takipne, subkostal çekilme ve yaygın hışıltılı solunum vardır. Ateş düşük derecelidir ve akciğer grafisinde fokal konsolidasyon saptanmaz.",
    "exam": [
      "Yaygın ekspiratuvar hışıltılı solunum",
      "Subkostal çekilme",
      "Dehidratasyon bulguları hafif"
    ],
    "vitals": {
      "TA": "86/52 mmHg",
      "Nabız": "138/dk",
      "Solunum": "44/dk",
      "SpO2": "%91",
      "Ateş": "37.8 °C"
    },
    "investigations": [
      {
        "id": "synthetic-bronchiolitis-oximetry",
        "label": "Pulse oksimetre",
        "type": "monitoring",
        "priority": "essential",
        "summary": "Oksijen satürasyonu %91 ölçülür.",
        "findings": [
          "Fokal konsolidasyon yok",
          "Hipoksemi sınırda belirgin"
        ]
      }
    ],
    "question": "Bu bebek için en uygun ilk yaklaşım hangisidir?",
    "options": [
      {
        "id": "A",
        "text": "Nazal aspirasyon, oksijen ve hidrasyon desteği"
      },
      {
        "id": "B",
        "text": "Rutin geniş spektrumlu antibiyotik başlamak"
      },
      {
        "id": "C",
        "text": "Her hastaya sistemik kortikosteroid vermek"
      },
      {
        "id": "D",
        "text": "Acil entübasyon ve mekanik ventilasyon"
      },
      {
        "id": "E",
        "text": "Antitüberküloz tedavi başlamak"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Süt çocuğunda viral üst solunum yolu bulgularını izleyen hışıltılı solunum ve çekilme bronşiolit lehinedir. İlk yaklaşım destek tedavisidir; hipoksemi varsa oksijen, beslenme azalmışsa hidrasyon ve sekresyon kontrolü öncelenir.",
    "wrongOptionFeedback": {
      "B": "Antibiyotik bakteriyel pnömoni veya sepsis bulgusu varsa düşünülür; fokal konsolidasyon ve toksik görünüm verilmemiştir.",
      "C": "Kortikosteroid bronşiolitte rutin ilk basamak değildir; astım atağı düşündüren daha büyük çocukta anlam kazanır.",
      "D": "Entübasyon apne, belirgin solunum yetmezliği veya ağır hipoksemi varsa gerekir; bu olguda önce destek tedavisi uygundur.",
      "E": "Tüberküloz kronik temas ve uzun süreli semptomlarla düşünülür; akut viral bronşiolit paternini açıklamaz."
    },
    "evidenceChain": [
      "Yaş bronşiolit için tipiktir.",
      "Üst solunum yolu bulgularını hışıltılı solunum izlemiştir.",
      "Subkostal çekilme solunum eforunu gösterir.",
      "Fokal konsolidasyon olmaması bakteriyel pnömoniyi zayıflatır."
    ],
    "examPearl": "Bronşiolitte temel tedavi destek tedavisidir; oksijen, hidrasyon ve nazal sekresyon kontrolü önceliklidir.",
    "spotCategory": "AI Spot • Çocuk Sağlığı ve Hastalıkları"
  },
  {
    "branchId": "tus-spot-olgular",
    "source": "synthetic-template-bank",
    "difficulty": "Orta-Zor",
    "questionType": "spot",
    "managementSteps": [],
    "seedId": "synthetic-peds-kawasaki-001",
    "title": "Uzamış ateş ve mukozal bulgular",
    "relatedBranch": "Çocuk Sağlığı ve Hastalıkları",
    "learningTarget": "Kawasaki hastalığında uzamış ateş, mukokutanöz bulgular ve IVIG zamanlaması",
    "correctConcept": "Kawasaki hastalığı için IVIG ve aspirin başlamak",
    "demographics": "4 yaş kız çocuk",
    "setting": "Pediatri polikliniği",
    "chiefComplaint": "Beş gündür ateş ve döküntü",
    "stem": "Beş gündür yüksek ateşi olan çocukta bilateral nonpürülan konjonktivit, çatlamış dudaklar, yaygın döküntü ve servikal lenfadenopati saptanır. Odak enfeksiyon bulgusu belirgin değildir.",
    "exam": [
      "Nonpürülan konjonktivit",
      "Çatlamış dudaklar",
      "Servikal lenfadenopati"
    ],
    "vitals": {
      "TA": "92/58 mmHg",
      "Nabız": "124/dk",
      "Solunum": "24/dk",
      "SpO2": "%98",
      "Ateş": "39.1 °C"
    },
    "investigations": [
      {
        "id": "synthetic-kawasaki-inflammatory",
        "label": "İnflamasyon belirteçleri",
        "type": "lab",
        "priority": "useful",
        "summary": "CRP: 92 mg/L (referans <5 mg/L; yüksek) mg/L (Yüksek). ESR: 78 mm/saat (Yüksek).",
        "findings": [
          "CRP: 92 mg/L (referans <5 mg/L; yüksek) mg/L (referans <5 mg/L) — Yüksek. Akut inflamatuvar yanıtı destekler.",
          "ESR: 78 mm/saat (referans <20 mm/saat) — Yüksek."
        ],
        "rows": [
          [
            "CRP",
            "92 mg/L",
            "<5 mg/L",
            "Yüksek"
          ],
          [
            "ESR",
            "78 mm/saat",
            "<20 mm/saat",
            "Yüksek"
          ]
        ]
      }
    ],
    "question": "Bu çocukta en uygun ilk tedavi yaklaşımı hangisidir?",
    "options": [
      {
        "id": "A",
        "text": "Kawasaki hastalığı için IVIG ve aspirin başlamak"
      },
      {
        "id": "B",
        "text": "Kızamık için yalnız izolasyon ve A vitamini vermek"
      },
      {
        "id": "C",
        "text": "Streptokok tonsilliti için tek doz penisilin vermek"
      },
      {
        "id": "D",
        "text": "Anafilaksi için intramüsküler adrenalin uygulamak"
      },
      {
        "id": "E",
        "text": "Juvenil idiopatik artrit için metotreksat başlamak"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Beş günden uzun ateş, nonpürülan konjonktivit, mukozal değişiklik, döküntü ve lenfadenopati Kawasaki hastalığını düşündürür. Koroner arter komplikasyonunu azaltmak için IVIG ve aspirin erken verilmelidir.",
    "wrongOptionFeedback": {
      "B": "Kızamıkta öksürük, koriza, Koplik lekeleri ve aşı öyküsü daha belirleyicidir; bu tabloda Kawasaki bulguları baskındır.",
      "C": "Streptokok tonsilliti tonsiller eksüda ve boğaz ağrısıyla beklenir; mukokutanöz çoklu bulguları açıklamaz.",
      "D": "Anafilakside ani ürtiker, bronkospazm veya hipotansiyon beklenir; beş günlük ateş paternine uymaz.",
      "E": "Juvenil idiopatik artrit kronik artrit ve sistemik bulgularla düşünülür; akut Kawasaki tedavisi geciktirilmemelidir."
    },
    "evidenceChain": [
      "Ateş beş günden uzun sürmüştür.",
      "Konjonktivit pürülan değildir.",
      "Dudak ve döküntü bulguları mukokutanöz tutulumu gösterir.",
      "Lenfadenopati Kawasaki kriterlerini destekler."
    ],
    "examPearl": "Kawasaki hastalığında en kritik sınav noktası koroner arter anevrizmasını önlemek için erken IVIG verilmesidir.",
    "spotCategory": "AI Spot • Çocuk Sağlığı ve Hastalıkları"
  },
  {
    "branchId": "tus-spot-olgular",
    "source": "synthetic-template-bank",
    "difficulty": "Orta-Zor",
    "questionType": "spot",
    "managementSteps": [],
    "seedId": "synthetic-internal-dka-001",
    "title": "Poliüri ve derin solunum",
    "relatedBranch": "İç Hastalıkları",
    "learningTarget": "Diyabetik ketoasidozda anyon açıklı metabolik asidoz ve ilk sıvı tedavisinin seçilmesi",
    "correctConcept": "İzotonik salin ile sıvı resüsitasyonu",
    "demographics": "23 yaş kadın",
    "setting": "Acil servis",
    "chiefComplaint": "Poliüri, karın ağrısı ve kusma",
    "stem": "Tip 1 diyabet öyküsü olan hastada kusma, karın ağrısı, poliüri ve Kussmaul solunumu vardır. Kapiller glukoz yüksektir ve hasta dehidrate görünür.",
    "exam": [
      "Mukozalar kuru",
      "Kussmaul solunumu",
      "Karında yaygın hassasiyet"
    ],
    "vitals": {
      "TA": "92/58 mmHg",
      "Nabız": "122/dk",
      "Solunum": "30/dk",
      "SpO2": "%98",
      "Ateş": "37.0 °C"
    },
    "investigations": [
      {
        "id": "synthetic-dka-gas",
        "label": "Kan gazı ve keton",
        "type": "lab",
        "priority": "essential",
        "summary": "Glukoz: 486 mg/dL (referans 70–100 mg/dL; yüksek) mg/dL (Yüksek). pH: 7.18 (referans 7.35–7.45; düşük) (Düşük).",
        "findings": [
          "Glukoz: 486 mg/dL (referans 70–100 mg/dL; yüksek) mg/dL (referans 70–100 mg/dL) — Yüksek. Glukoz sapması metabolik bozukluğu destekler.",
          "pH: 7.18 (referans 7.35–7.45; düşük) (referans 7.35–7.45) — Düşük."
        ],
        "rows": [
          [
            "Glukoz",
            "486 mg/dL",
            "70–100 mg/dL",
            "Yüksek"
          ],
          [
            "pH",
            "7.18",
            "7.35–7.45",
            "Düşük"
          ]
        ]
      }
    ],
    "question": "Bu hastada ilk tedavi basamağı hangisidir?",
    "options": [
      {
        "id": "A",
        "text": "İzotonik salin ile sıvı resüsitasyonu"
      },
      {
        "id": "B",
        "text": "Bikarbonatı rutin ve erken vermek"
      },
      {
        "id": "C",
        "text": "Sadece subkutan hızlı etkili insülin vermek"
      },
      {
        "id": "D",
        "text": "Potasyum sonucunu önemsemeden yüksek doz insülin başlamak"
      },
      {
        "id": "E",
        "text": "Oral sıvı ve ayaktan izlem önermek"
      }
    ],
    "correctAnswer": "A",
    "explanation": "DKA’da dehidratasyon ve dolaşım hacmi kaybı ön plandadır. İlk basamak izotonik salinle sıvı resüsitasyonudur; insülin ve potasyum yönetimi yakın izlemle devam eder.",
    "wrongOptionFeedback": {
      "B": "Bikarbonat çok ağır asidoz dışında rutin ilk basamak değildir; sıvı ve insülin tedavisi esastır.",
      "C": "Hafif olgular dışında tek başına subkutan insülin yeterli değildir; bu hastada dehidratasyon ve asidoz belirgindir.",
      "D": "İnsülin potasyumu hücre içine sokar; potasyum değerlendirilmeden başlanması aritmi riskini artırır.",
      "E": "Hipotansiyon, ketozis ve asidoz ayaktan izlem için uygun değildir."
    },
    "evidenceChain": [
      "Hiperglisemi belirgindir.",
      "Keton pozitifliği vardır.",
      "pH ve bikarbonat metabolik asidozu gösterir.",
      "Dehidratasyon sıvı tedavisini öncelikli kılar."
    ],
    "examPearl": "DKA’da ilk adım sıvıdır; insülin başlanmadan önce potasyum mutlaka değerlendirilir.",
    "spotCategory": "AI Spot • İç Hastalıkları"
  },
  {
    "branchId": "tus-spot-olgular",
    "source": "synthetic-template-bank",
    "difficulty": "Orta-Zor",
    "questionType": "spot",
    "managementSteps": [],
    "seedId": "synthetic-surgery-appendicitis-001",
    "title": "Sağ alt kadran ağrısı",
    "relatedBranch": "Genel Cerrahi",
    "learningTarget": "Akut apandisitte migratuvar ağrı, lokal hassasiyet ve cerrahi yaklaşımın tanınması",
    "correctConcept": "Akut apandisit",
    "demographics": "19 yaş erkek",
    "setting": "Genel cerrahi acil",
    "chiefComplaint": "Karın ağrısı ve iştahsızlık",
    "stem": "Periumblikal başlayan ağrı saatler içinde sağ alt kadrana yerleşir. Bulantı, iştahsızlık ve McBurney noktasında hassasiyet vardır.",
    "exam": [
      "Sağ alt kadranda lokal hassasiyet",
      "Rebound hafif pozitif",
      "Murphy bulgusu yok"
    ],
    "vitals": {
      "TA": "112/70 mmHg",
      "Nabız": "102/dk",
      "Solunum": "20/dk",
      "SpO2": "%98",
      "Ateş": "37.9 °C"
    },
    "investigations": [
      {
        "id": "synthetic-appendicitis-cbc",
        "label": "Tam kan sayımı ve CRP",
        "type": "lab",
        "priority": "useful",
        "summary": "Lökosit: 14.800/mm³ (referans 4.000–10.000/mm³; yüksek)/mm³ (Yüksek). CRP: 48 mg/L (referans <5 mg/L; yüksek) mg/L (Yüksek).",
        "findings": [
          "Lökosit: 14.800/mm³ (referans 4.000–10.000/mm³; yüksek)/mm³ (referans 4.000–10.000/mm³) — Yüksek. Nötrofil baskınlığı eşlik ediyorsa bakteriyel enfeksiyon lehine destekleyicidir.",
          "CRP: 48 mg/L (referans <5 mg/L; yüksek) mg/L (referans <5 mg/L) — Yüksek. Akut inflamatuvar yanıtı destekler."
        ],
        "rows": [
          [
            "Lökosit",
            "14.800/mm³",
            "4.000–10.000/mm³",
            "Yüksek"
          ],
          [
            "CRP",
            "48 mg/L",
            "<5 mg/L",
            "Yüksek"
          ]
        ]
      }
    ],
    "question": "Bu tablo en çok hangi tanıyı destekler?",
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
        "text": "Pankreatit"
      },
      {
        "id": "D",
        "text": "Renal kolik"
      },
      {
        "id": "E",
        "text": "Gastroözofageal reflü"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Periumblikal başlayıp sağ alt kadrana göç eden ağrı ve McBurney hassasiyeti akut apandisit için tipiktir. Lokal periton irritasyonu cerrahi değerlendirmeyi öncelikli kılar.",
    "wrongOptionFeedback": {
      "B": "Kolesistit sağ üst kadran ağrısı ve Murphy bulgusuyla beklenir; ağrının sağ alt kadrana göçü apandisiti destekler.",
      "C": "Pankreatit epigastrik kuşak tarzı ağrı ve lipaz yüksekliğiyle düşünülür.",
      "D": "Renal kolikte kostovertebral açı hassasiyeti ve hematüri daha belirgindir.",
      "E": "Reflü yanma ve regürjitasyonla seyreder; lokal periton bulgularını açıklamaz."
    },
    "evidenceChain": [
      "Ağrı periumblikal başlayıp sağ alt kadrana göç etmiştir.",
      "McBurney hassasiyeti vardır.",
      "Lökositoz inflamasyonu destekler.",
      "Murphy bulgusunun olmaması kolesistiti zayıflatır."
    ],
    "examPearl": "Apandisitte klasik ağrı göçü visseral periumblikal ağrıdan parietal sağ alt kadran ağrısına geçiştir.",
    "spotCategory": "AI Spot • Genel Cerrahi"
  },
  {
    "branchId": "tus-spot-olgular",
    "source": "synthetic-template-bank",
    "difficulty": "Orta-Zor",
    "questionType": "spot",
    "managementSteps": [],
    "seedId": "synthetic-pharm-acetaminophen-001",
    "title": "Parasetamol doz aşımı",
    "relatedBranch": "Tıbbi Farmakoloji",
    "learningTarget": "Parasetamol toksisitesinde N-asetilsistein endikasyonunun tanınması",
    "correctConcept": "N-asetilsistein",
    "demographics": "24 yaş kadın",
    "setting": "Acil toksikoloji değerlendirmesi",
    "chiefComplaint": "Çok sayıda ağrı kesici alımı",
    "stem": "Hasta sekiz saat önce yüksek doz parasetamol aldığını söyler. İlk değerlendirmede bulantı vardır, karaciğer enzimleri henüz belirgin yükselmemiştir.",
    "exam": [
      "Bilinç açık",
      "Karında belirgin periton bulgusu yok",
      "Vital bulgular stabil"
    ],
    "vitals": {
      "TA": "118/76 mmHg",
      "Nabız": "92/dk",
      "Solunum": "18/dk",
      "SpO2": "%99",
      "Ateş": "36.8 °C"
    },
    "investigations": [
      {
        "id": "synthetic-apap-level",
        "label": "Parasetamol düzeyi",
        "type": "toxicology",
        "priority": "essential",
        "summary": "Serum parasetamol düzeyi tedavi çizgisinin üzerindedir.",
        "findings": [
          "Alım zamanı belirlenmiştir",
          "Hepatotoksisite riski vardır"
        ]
      }
    ],
    "question": "Bu hastada özgül antidot olarak hangi tedavi verilmelidir?",
    "options": [
      {
        "id": "A",
        "text": "N-asetilsistein"
      },
      {
        "id": "B",
        "text": "Nalokson"
      },
      {
        "id": "C",
        "text": "Flumazenil"
      },
      {
        "id": "D",
        "text": "Atropin"
      },
      {
        "id": "E",
        "text": "Pralidoksim"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Parasetamol toksisitesinde N-asetilsistein glutatyon depolarını destekleyerek toksik metabolit NAPQI etkisini azaltır. Sekiz saatlik başvuruda tedavi geciktirilmemelidir.",
    "wrongOptionFeedback": {
      "B": "Nalokson opioid toksisitesinde solunum depresyonu için kullanılır; parasetamol metabolitini hedeflemez.",
      "C": "Flumazenil benzodiazepin etkisini geri çevirir; bu olgunun toksik mekanizması farklıdır.",
      "D": "Atropin muskarinik kolinerjik bulgular için kullanılır; parasetamol hepatotoksisitesinde antidot değildir.",
      "E": "Pralidoksim organofosfat zehirlenmesinde enzim reaktivasyonu için verilir."
    },
    "evidenceChain": [
      "Yüksek doz parasetamol alımı vardır.",
      "Alım zamanı tedavi kararında kullanılabilir.",
      "Düzey tedavi çizgisinin üzerindedir.",
      "Hepatotoksisite riski antidotu gerektirir."
    ],
    "examPearl": "Parasetamol zehirlenmesinde N-asetilsistein en etkili olarak ilk 8–10 saatte verilir.",
    "spotCategory": "AI Spot • Tıbbi Farmakoloji"
  },
  {
    "branchId": "tus-spot-olgular",
    "source": "synthetic-template-bank",
    "difficulty": "Orta-Zor",
    "questionType": "spot",
    "managementSteps": [],
    "seedId": "synthetic-micro-hav-variant-001",
    "title": "Akut hepatit paneli yorumu",
    "relatedBranch": "Tıbbi Mikrobiyoloji",
    "learningTarget": "HAV IgM ve IgG paterninin akut enfeksiyon ile geçirilmiş bağışıklıktan ayrılması",
    "correctConcept": "Akut hepatit A enfeksiyonu",
    "demographics": "28 yaş erkek",
    "setting": "Enfeksiyon hastalıkları değerlendirmesi",
    "chiefComplaint": "Sarılık ve koyu idrar",
    "stem": "Kısa süredir halsizlik, bulantı, koyu idrar ve skleral ikter gelişen hastada yakın çevrede benzer gastrointestinal yakınmalar bildirilir.",
    "exam": [
      "Skleral ikter",
      "Karaciğer hafif hassas",
      "Kronik karaciğer hastalığı stigmaları yok"
    ],
    "vitals": {
      "TA": "116/74 mmHg",
      "Nabız": "88/dk",
      "Solunum": "16/dk",
      "SpO2": "%98",
      "Ateş": "37.6 °C"
    },
    "investigations": [
      {
        "id": "synthetic-hav-panel",
        "label": "Viral hepatit paneli",
        "type": "serology",
        "priority": "essential",
        "summary": "Anti-HAV IgM pozitif, Anti-HAV IgG negatif, HBsAg negatif, Anti-HBc IgM negatif, Anti-HCV negatif.",
        "findings": [
          "HAV IgM saptanır",
          "HBV akut belirteçleri negatif",
          "HCV taraması negatif"
        ]
      }
    ],
    "question": "Bu serolojik patern en güçlü olarak hangi sonucu destekler?",
    "options": [
      {
        "id": "A",
        "text": "Akut hepatit A enfeksiyonu"
      },
      {
        "id": "B",
        "text": "Geçirilmiş hepatit A bağışıklığı"
      },
      {
        "id": "C",
        "text": "Akut hepatit B enfeksiyonu"
      },
      {
        "id": "D",
        "text": "Kronik hepatit C enfeksiyonu"
      },
      {
        "id": "E",
        "text": "Hepatit B aşı bağışıklığı"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Anti-HAV IgM pozitifliği yakın dönem HAV enfeksiyonunu destekler. HBV akut belirteçlerinin ve Anti-HCV’nin negatif olması diğer viral hepatit seçeneklerini zayıflatır.",
    "wrongOptionFeedback": {
      "B": "Geçirilmiş HAV bağışıklığında IgG pozitif, IgM negatif beklenir; burada IgM pozitiftir.",
      "C": "Akut HBV için HBsAg ve Anti-HBc IgM pozitifliği beklenir; ikisi de negatif verilmiştir.",
      "D": "Kronik HCV için Anti-HCV veya HCV RNA pozitifliği beklenir; tarama negatiftir.",
      "E": "HBV aşı bağışıklığı Anti-HBs ile değerlendirilir; mevcut panel HAV IgM üzerinden yön verir."
    },
    "evidenceChain": [
      "Akut sarılık ve koyu idrar vardır.",
      "Anti-HAV IgM pozitif bulunmuştur.",
      "HBV akut belirteçleri negatiftir.",
      "Anti-HCV negatifliği HCV olasılığını azaltır."
    ],
    "examPearl": "HAV’da IgM akut enfeksiyon, IgG geçirilmiş enfeksiyon veya bağışıklık göstergesidir.",
    "spotCategory": "AI Spot • Tıbbi Mikrobiyoloji"
  },
  {
    "branchId": "tus-spot-olgular",
    "source": "synthetic-template-bank",
    "difficulty": "Orta-Zor",
    "questionType": "spot",
    "managementSteps": [],
    "seedId": "synthetic-biochem-pku-001",
    "title": "Yenidoğan taramasında fenilalanin yüksekliği",
    "relatedBranch": "Tıbbi Biyokimya",
    "learningTarget": "Fenilketonüride fenilalanin hidroksilaz defekti ve diyet tedavisinin tanınması",
    "correctConcept": "Fenilalanin hidroksilaz defekti",
    "demographics": "12 günlük yenidoğan",
    "setting": "Metabolik tarama değerlendirmesi",
    "chiefComplaint": "Yenidoğan taramasında aminoasit yüksekliği",
    "stem": "Yenidoğan taramasında fenilalanin yüksek bulunur. Tedavisiz kalırsa nörogelişimsel gerilik ve açık ten-saç bulguları gelişebileceği anlatılır.",
    "exam": [
      "Yenidoğan genel durumu stabil",
      "Dismorfik belirgin bulgu yok",
      "Nörolojik muayene yaşına uygun"
    ],
    "vitals": {
      "TA": "72/44 mmHg",
      "Nabız": "138/dk",
      "Solunum": "38/dk",
      "SpO2": "%99",
      "Ateş": "36.8 °C"
    },
    "investigations": [
      {
        "id": "synthetic-pku-aa",
        "label": "Plazma aminoasit analizi",
        "type": "lab",
        "priority": "essential",
        "summary": "Fenilalanin belirgin yüksek, tirozin düşük-normal aralıktadır.",
        "findings": [
          "Fenilalanin artışı",
          "Erken diyet tedavisi gerekir"
        ]
      }
    ],
    "question": "Bu metabolik tablo en çok hangi enzim kusuruyla ilişkilidir?",
    "options": [
      {
        "id": "A",
        "text": "Fenilalanin hidroksilaz defekti"
      },
      {
        "id": "B",
        "text": "Branşlı zincir alfa-ketoasit dehidrogenaz defekti"
      },
      {
        "id": "C",
        "text": "Homogentizat oksidaz defekti"
      },
      {
        "id": "D",
        "text": "Galaktoz-1-fosfat üridiltransferaz defekti"
      },
      {
        "id": "E",
        "text": "Ornitin transkarbamilaz defekti"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Fenilalanin yüksekliği ve erken nörolojik hasar riski fenilketonüriyi düşündürür. Klasik neden fenilalanin hidroksilaz defektidir ve tedavi fenilalanin kısıtlı diyetle yapılır.",
    "wrongOptionFeedback": {
      "B": "Bu defekt akçaağaç şurubu idrar hastalığına yol açar; lösin, izolösin ve valin artışı beklenir.",
      "C": "Homogentizat oksidaz defekti alkaptonüri yapar; idrarın koyulaşması ve okronozisle ilişkilidir.",
      "D": "GALT defekti galaktozemiye neden olur; süt alımı sonrası sarılık, kusma ve katarakt beklenir.",
      "E": "OTC defekti üre döngüsü bozukluğudur; hiperamonyemi ön plandadır."
    },
    "evidenceChain": [
      "Taramada fenilalanin yüksektir.",
      "Tirozin göreceli düşük olabilir.",
      "Tedavisiz nörogelişimsel hasar riski vardır.",
      "Diyet tedavisi erken başlanmalıdır."
    ],
    "examPearl": "Fenilketonüride fenilalanin hidroksilaz defekti fenilalanin artışına ve tirozin azalmasına yol açar.",
    "spotCategory": "AI Spot • Tıbbi Biyokimya"
  },
  {
    "branchId": "tus-spot-olgular",
    "source": "synthetic-template-bank",
    "difficulty": "Orta-Zor",
    "questionType": "spot",
    "managementSteps": [],
    "seedId": "synthetic-physiology-vq-002",
    "title": "Ventilasyon korunurken perfüzyon azalması",
    "relatedBranch": "Fizyoloji",
    "learningTarget": "Pulmoner emboli fizyolojisinde yüksek V/Q ve alveoler ölü boşluk artışının tanınması",
    "correctConcept": "Yüksek V/Q ve alveoler ölü boşluk artışı",
    "demographics": "Fizyoloji pratiğinde değerlendirilen hasta",
    "setting": "Solunum fizyolojisi pratiği",
    "chiefComplaint": "Ani perfüzyon azalması sonrası gaz değişimi",
    "stem": "Bir akciğer bölgesinde ventilasyon devam ederken perfüzyon belirgin azalır. Bu bölgede gaz değişimine katılım düşer ve alveoler gaz arteriyel kana yeterince geçemez.",
    "exam": [
      "Takipne olabilir",
      "Oksijen satürasyonu düşebilir",
      "Fokal havalanma kaybı şart değildir"
    ],
    "vitals": {
      "TA": "118/76 mmHg",
      "Nabız": "106/dk",
      "Solunum": "26/dk",
      "SpO2": "%92",
      "Ateş": "36.7 °C"
    },
    "investigations": [
      {
        "id": "synthetic-vq-pattern",
        "label": "V/Q yorumu",
        "type": "physiology",
        "priority": "essential",
        "summary": "Ventilasyon korunurken perfüzyon azalması yüksek V/Q sonucunu oluşturur.",
        "findings": [
          "Perfüzyon düşüktür",
          "Ölü boşluk etkisi artar"
        ]
      }
    ],
    "question": "Bu durumda beklenen fizyolojik değişiklik hangisidir?",
    "options": [
      {
        "id": "A",
        "text": "Yüksek V/Q ve alveoler ölü boşluk artışı"
      },
      {
        "id": "B",
        "text": "Düşük V/Q ve şant etkisi"
      },
      {
        "id": "C",
        "text": "Tam ventilasyon kaybı"
      },
      {
        "id": "D",
        "text": "Difüzyon kapasitesinde izole artış"
      },
      {
        "id": "E",
        "text": "Normal V/Q ile hiperkapni"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Perfüzyon azalırken ventilasyon korunursa V/Q oranı yükselir. Bu durum alveoler ölü boşluk artışı şeklinde yorumlanır.",
    "wrongOptionFeedback": {
      "B": "Düşük V/Q ventilasyon azalması veya şant benzeri tabloda beklenir; burada perfüzyon azalması ön plandadır.",
      "C": "Ventilasyon tamamen kaybolmamıştır; sorun kan akımının azalmasıdır.",
      "D": "Difüzyon kapasitesi bu olayda izole artmaz.",
      "E": "Normal V/Q korunmaz; bölgesel perfüzyon kaybı oranı yükseltir."
    },
    "evidenceChain": [
      "Ventilasyon korunmuştur.",
      "Perfüzyon azalmıştır.",
      "V/Q oranı yükselir.",
      "Alveoler ölü boşluk etkisi artar."
    ],
    "examPearl": "Pulmoner embolide perfüzyon azalır; ventilasyon görece korunduğu için V/Q yükselir.",
    "spotCategory": "AI Spot • Fizyoloji"
  },
  {
    "branchId": "tus-spot-olgular",
    "source": "synthetic-template-bank",
    "difficulty": "Orta-Zor",
    "questionType": "spot",
    "managementSteps": [],
    "seedId": "synthetic-anatomy-radial-001",
    "title": "Humerus kırığı sonrası el bileği düşüklüğü",
    "relatedBranch": "Anatomi",
    "learningTarget": "Humerus cisim kırığında radial sinir hasarının motor bulgularla tanınması",
    "correctConcept": "Radial sinir",
    "demographics": "Travma sonrası değerlendirilen hasta",
    "setting": "Acil servis",
    "chiefComplaint": "Kol ağrısı ve el bileğini kaldıramama",
    "stem": "Humerus cisim kırığı sonrası hasta el bileğini ve parmaklarını ekstansiyona getiremez. Duyu kaybı el sırtının radial tarafında belirgindir.",
    "exam": [
      "El bileği ekstansiyonu zayıf",
      "Parmak ekstansiyonu zayıf",
      "El sırtı radial bölgede duyu azalır"
    ],
    "vitals": {
      "TA": "120/76 mmHg",
      "Nabız": "92/dk",
      "Solunum": "18/dk",
      "SpO2": "%99",
      "Ateş": "36.7 °C"
    },
    "investigations": [
      {
        "id": "synthetic-radial-xray",
        "label": "Humerus grafisi",
        "type": "imaging",
        "priority": "essential",
        "summary": "Humerus cisim kırığı izlenir.",
        "findings": [
          "Spiral oluk komşuluğu etkilenebilir",
          "Vasküler acil bulgu verilmemiştir"
        ]
      }
    ],
    "question": "Bu nörolojik bulgu en çok hangi sinirin hasarını düşündürür?",
    "options": [
      {
        "id": "A",
        "text": "Radial sinir"
      },
      {
        "id": "B",
        "text": "Median sinir"
      },
      {
        "id": "C",
        "text": "Ulnar sinir"
      },
      {
        "id": "D",
        "text": "Aksiller sinir"
      },
      {
        "id": "E",
        "text": "Muskülokütan sinir"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Humerus cisim kırığı radial siniri spiral oluk düzeyinde etkileyebilir. El bileği ve parmak ekstansiyon kaybı radial sinir hasarı için tipiktir.",
    "wrongOptionFeedback": {
      "B": "Median sinir lezyonunda tenar fonksiyon ve ilk üç parmak duyusu etkilenir; el bileği düşüklüğü tipik değildir.",
      "C": "Ulnar sinir lezyonu pençe el ve hipotenar/interosseöz zayıflık yapar.",
      "D": "Aksiller sinir deltoid zayıflığı ve lateral omuz duyu kaybıyla ilişkilidir.",
      "E": "Muskülokütan sinir dirsek fleksiyonu ve lateral ön kol duyusuyla ilişkilidir."
    },
    "evidenceChain": [
      "Humerus cisim kırığı vardır.",
      "El bileği ekstansiyonu kaybolmuştur.",
      "Parmak ekstansiyonu zayıftır.",
      "El sırtı radial duyusu etkilenmiştir."
    ],
    "examPearl": "Radial sinir humerus spiral oluğunda seyreder; hasarında wrist drop gelişir.",
    "spotCategory": "AI Spot • Anatomi"
  },
  {
    "branchId": "tus-spot-olgular",
    "source": "synthetic-template-bank",
    "difficulty": "Orta-Zor",
    "questionType": "spot",
    "managementSteps": [],
    "seedId": "synthetic-histo-thyroglossal-002",
    "title": "Dil hareketiyle oynayan orta hat kitle",
    "relatedBranch": "Histoloji ve Embriyoloji",
    "learningTarget": "Tiroglossal kanal kistinde orta hat yerleşim ve dil hareketiyle mobilitenin ayırt edilmesi",
    "correctConcept": "Tiroglossal kanal kisti",
    "demographics": "7 yaş çocuk",
    "setting": "Embriyoloji değerlendirmesi",
    "chiefComplaint": "Boyun orta hattında kistik kitle",
    "stem": "Boyun orta hattında yer alan kitle yutkunma ve dil çıkarma sırasında hareket eder. Lateral boyun yerleşimi veya akut enfeksiyon bulgusu ön planda değildir.",
    "exam": [
      "Orta hatta kistik kitle",
      "Dil çıkarma ile hareket eder",
      "Lateral servikal kitle yok"
    ],
    "vitals": {
      "TA": "92/58 mmHg",
      "Nabız": "96/dk",
      "Solunum": "18/dk",
      "SpO2": "%99",
      "Ateş": "36.8 °C"
    },
    "investigations": [
      {
        "id": "synthetic-thyroglossal-location",
        "label": "Embriyolojik lokalizasyon",
        "type": "embryology",
        "priority": "essential",
        "summary": "Tiroid iniş yolu kalıntısını düşündüren orta hat yerleşim vardır.",
        "findings": [
          "Orta hat yerleşim",
          "Dil hareketiyle mobilite"
        ]
      }
    ],
    "question": "Bu embriyolojik kalıntı en çok hangi duruma uyar?",
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
        "text": "Servikal lenfadenit"
      },
      {
        "id": "E",
        "text": "Dermoid kist"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Tiroglossal kanal kisti tiroid bezinin iniş yoluna ait kalıntıdır. Orta hat yerleşim ve dil çıkarma/yutkunma ile hareket etmesi klasik ipuçlarıdır.",
    "wrongOptionFeedback": {
      "B": "Brankial yarık kisti genellikle lateral boyunda yerleşir.",
      "C": "Kistik higroma lenfatik malformasyondur ve daha çok lateral/posterior boyunda beklenir.",
      "D": "Lenfadenit ağrı, ateş ve inflamasyon bulgularıyla düşünülür.",
      "E": "Dermoid kist orta hatta olabilir; ancak dil hareketiyle hareket etmesi tiroglossal kanal kisti kadar tipik değildir."
    },
    "evidenceChain": [
      "Kitle orta hattadır.",
      "Dil çıkarma ile hareket eder.",
      "Yutkunma sırasında mobilite vardır.",
      "Lateral yerleşim olmaması brankial kisti zayıflatır."
    ],
    "examPearl": "Tiroglossal kanal kisti orta hatta olur ve dil çıkarma ya da yutkunma ile hareket eder.",
    "spotCategory": "AI Spot • Histoloji ve Embriyoloji"
  },
  {
    "branchId": "tus-spot-olgular",
    "source": "synthetic-template-bank",
    "difficulty": "Orta-Zor",
    "questionType": "spot",
    "managementSteps": [],
    "seedId": "synthetic-path-nephrotic-001",
    "title": "Çocukta masif proteinüri",
    "relatedBranch": "Tıbbi Patoloji",
    "learningTarget": "Minimal değişiklik hastalığında çocuk nefrotik sendromu ve ışık mikroskopisinin normal olabilmesi",
    "correctConcept": "Minimal değişiklik hastalığı",
    "demographics": "6 yaş erkek çocuk",
    "setting": "Patoloji değerlendirmesi",
    "chiefComplaint": "Periorbital ödem ve köpüklü idrar",
    "stem": "Çocukta periorbital ödem, hipoalbüminemi ve masif proteinüri saptanır. Işık mikroskopisi belirgin değişiklik göstermeyebilir.",
    "exam": [
      "Periorbital ödem",
      "Pretibial ödem",
      "Hipertansiyon belirgin değil"
    ],
    "vitals": {
      "TA": "94/60 mmHg",
      "Nabız": "92/dk",
      "Solunum": "18/dk",
      "SpO2": "%99",
      "Ateş": "36.7 °C"
    },
    "investigations": [
      {
        "id": "synthetic-mcd-urine",
        "label": "İdrar ve albümin",
        "type": "lab",
        "priority": "essential",
        "summary": "Proteinüri: 4.000 mg/gün (Yüksek).",
        "findings": [
          "Proteinüri: 4.000 mg/gün (referans <150 mg/gün) — Yüksek."
        ],
        "rows": [
          [
            "Proteinüri",
            "4.000 mg/gün",
            "<150 mg/gün",
            "Yüksek"
          ]
        ]
      }
    ],
    "question": "Bu patolojik tablo en çok hangi hastalığı düşündürür?",
    "options": [
      {
        "id": "A",
        "text": "Minimal değişiklik hastalığı"
      },
      {
        "id": "B",
        "text": "Membranoproliferatif glomerülonefrit"
      },
      {
        "id": "C",
        "text": "Poststreptokokal glomerülonefrit"
      },
      {
        "id": "D",
        "text": "IgA nefropatisi"
      },
      {
        "id": "E",
        "text": "Goodpasture sendromu"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Çocukta nefrotik sendromun en sık nedeni minimal değişiklik hastalığıdır. Işık mikroskopisinin normal görünebilmesi ve hematürinin baskın olmaması bu tanıyı destekler.",
    "wrongOptionFeedback": {
      "B": "MPGN daha çok nefritik-nefrotik karışık tablo ve kompleman düşüklüğüyle beklenir.",
      "C": "Poststreptokokal GN hematüri, hipertansiyon ve düşük C3 ile tipik nefritik tablo oluşturur.",
      "D": "IgA nefropatisi üst solunum yolu enfeksiyonunu izleyen hematüriyle öne çıkar.",
      "E": "Goodpasture akciğer hemorajisi ve hızlı ilerleyen glomerülonefrit bulgularıyla düşünülür."
    },
    "evidenceChain": [
      "Hasta çocuk yaş grubundadır.",
      "Masif proteinüri ve hipoalbüminemi vardır.",
      "Hematüri baskın değildir.",
      "Işık mikroskopisi normal görünebilir."
    ],
    "examPearl": "Minimal değişiklik hastalığında ışık mikroskopisi normal olabilir; elektron mikroskopisinde podosit ayaksı çıkıntı silinmesi görülür.",
    "spotCategory": "AI Spot • Tıbbi Patoloji"
  },
  {
    "branchId": "tus-spot-olgular",
    "source": "synthetic-template-bank",
    "difficulty": "Orta-Zor",
    "questionType": "spot",
    "managementSteps": [],
    "seedId": "synthetic-obgyn-ectopic-001",
    "title": "Amenore sonrası tek taraflı ağrı",
    "relatedBranch": "Kadın Hastalıkları ve Doğum",
    "learningTarget": "Ektopik gebelikte beta-hCG ve transvajinal ultrason ilişkisinin yorumlanması",
    "correctConcept": "Ektopik gebelik",
    "demographics": "29 yaş kadın",
    "setting": "Jinekoloji acil",
    "chiefComplaint": "Amenore, vajinal lekelenme ve pelvik ağrı",
    "stem": "Altı haftalık amenore sonrası tek taraflı pelvik ağrı ve vajinal lekelenme gelişir. Transvajinal ultrasonda uterus içinde gebelik kesesi izlenmez.",
    "exam": [
      "Adneksiyal hassasiyet",
      "Servikal hareket hassasiyeti hafif",
      "Hemodinami stabil"
    ],
    "vitals": {
      "TA": "108/68 mmHg",
      "Nabız": "98/dk",
      "Solunum": "18/dk",
      "SpO2": "%99",
      "Ateş": "36.8 °C"
    },
    "investigations": [
      {
        "id": "synthetic-ectopic-hcg",
        "label": "β-hCG ve ultrason",
        "type": "lab-imaging",
        "priority": "essential",
        "summary": "β-hCG 2600 mIU/mL, transvajinal ultrasonda intrauterin kese izlenmez.",
        "findings": [
          "Adneksiyal hassasiyet vardır",
          "İntrauterin gebelik gösterilememiştir"
        ]
      }
    ],
    "question": "Bu tablo için en olası tanı hangisidir?",
    "options": [
      {
        "id": "A",
        "text": "Ektopik gebelik"
      },
      {
        "id": "B",
        "text": "Normal erken intrauterin gebelik"
      },
      {
        "id": "C",
        "text": "Molar gebelik"
      },
      {
        "id": "D",
        "text": "Pelvik inflamatuvar hastalık"
      },
      {
        "id": "E",
        "text": "Over torsiyonu"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Amenore, vajinal lekelenme, tek taraflı pelvik ağrı ve diskriminatuvar düzeye yakın beta-hCG’ye rağmen intrauterin kese izlenmemesi ektopik gebeliği düşündürür.",
    "wrongOptionFeedback": {
      "B": "Normal erken gebelikte beta-hCG düzeyi düşükken kese görülmeyebilir; burada ağrı ve lekelenme ile risk artmıştır.",
      "C": "Molar gebelikte çok yüksek beta-hCG ve üzüm salkımı benzeri uterin görünüm beklenir.",
      "D": "PID ateş, pürülan akıntı ve enfeksiyon bulgularıyla daha olasıdır; amenore ve beta-hCG pozitifliği yön değiştirir.",
      "E": "Torsiyonda ani şiddetli ağrı ve over kanlanma bulguları ön plandadır."
    },
    "evidenceChain": [
      "Amenore sonrası pelvik ağrı vardır.",
      "Vajinal lekelenme eşlik eder.",
      "β-hCG pozitiftir.",
      "Ultrasonda intrauterin kese izlenmez."
    ],
    "examPearl": "Ektopik gebelikte stabil hastada beta-hCG trendi ve transvajinal ultrason birlikte yorumlanır.",
    "spotCategory": "AI Spot • Kadın Hastalıkları ve Doğum"
  },
  {
    "branchId": "tus-spot-olgular",
    "source": "synthetic-template-bank",
    "difficulty": "Orta-Zor",
    "questionType": "spot",
    "managementSteps": [],
    "seedId": "synthetic-minor-subarachnoid-001",
    "title": "Ani başlayan en şiddetli baş ağrısı",
    "relatedBranch": "Küçük Stajlar",
    "learningTarget": "Subaraknoid kanamada thunderclap baş ağrısı ve ilk görüntüleme yaklaşımı",
    "correctConcept": "Kontrastsız beyin BT istemek",
    "demographics": "43 yaş kadın",
    "setting": "Acil servis",
    "chiefComplaint": "Ani ve çok şiddetli baş ağrısı",
    "stem": "Hasta hayatının en şiddetli baş ağrısının saniyeler içinde başladığını söyler. Ense sertliği ve kusma vardır, travma öyküsü yoktur.",
    "exam": [
      "Ense sertliği",
      "Fotofobi",
      "Fokal defisit belirgin değil"
    ],
    "vitals": {
      "TA": "156/92 mmHg",
      "Nabız": "104/dk",
      "Solunum": "20/dk",
      "SpO2": "%98",
      "Ateş": "36.9 °C"
    },
    "investigations": [
      {
        "id": "synthetic-sah-redflag",
        "label": "Nörolojik kırmızı bayrak",
        "type": "clinical",
        "priority": "essential",
        "summary": "Thunderclap başlangıç ve meningeal bulgular vardır.",
        "findings": [
          "Ani maksimum şiddet",
          "Ense sertliği"
        ]
      }
    ],
    "question": "Bu hastada en uygun ilk tanısal yaklaşım hangisidir?",
    "options": [
      {
        "id": "A",
        "text": "Kontrastsız beyin BT istemek"
      },
      {
        "id": "B",
        "text": "Migren tedavisi verip taburcu etmek"
      },
      {
        "id": "C",
        "text": "Elektif EEG planlamak"
      },
      {
        "id": "D",
        "text": "Sinüzit için antibiyotik başlamak"
      },
      {
        "id": "E",
        "text": "Gerilim tipi baş ağrısı olarak izlemek"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Thunderclap başlangıç, ense sertliği ve kusma subaraknoid kanama açısından kırmızı bayraktır. İlk tanısal yaklaşım acil kontrastsız beyin BT’dir.",
    "wrongOptionFeedback": {
      "B": "Migren tekrarlayıcı baş ağrısı öyküsüyle düşünülebilir; ani maksimum şiddet ve ense sertliği güvenli taburculuğa izin vermez.",
      "C": "EEG nöbet değerlendirmesinde kullanılabilir; bu olguda kanama dışlanmalıdır.",
      "D": "Sinüzitte ateş, yüz ağrısı ve nazal bulgular beklenir; thunderclap başlangıç tipik değildir.",
      "E": "Gerilim tipi baş ağrısı yavaş başlangıçlı ve hafif-orta şiddetlidir; meningeal bulgular beklenmez."
    },
    "evidenceChain": [
      "Ağrı saniyeler içinde maksimum şiddete ulaşmıştır.",
      "Ense sertliği vardır.",
      "Kusma eşlik eder.",
      "Travma olmaması spontan kanamayı dışlamaz."
    ],
    "examPearl": "Thunderclap baş ağrısında subaraknoid kanama dışlanana kadar benign baş ağrısı tanısı konmamalıdır.",
    "spotCategory": "AI Spot • Küçük Stajlar"
  }
];
