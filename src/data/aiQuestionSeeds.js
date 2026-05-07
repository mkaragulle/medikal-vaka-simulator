export const AI_QUESTION_SEEDS = [
  {
    "seedId": "ai-hav-serology-pattern-001",
    "title": "Sarılık ve viral seroloji örüntüsü",
    "relatedBranch": "Tıbbi Mikrobiyoloji",
    "branchId": "tus-spot-olgular",
    "spotCategory": "AI Spot • Mikrobiyoloji",
    "difficulty": "Orta-Zor",
    "learningTarget": "Akut hepatit A serolojisinin geçirilmiş enfeksiyon ve hepatit B/C örüntülerinden ayrılması",
    "demographics": "22 yaş erkek",
    "setting": "Acil başvuru",
    "chiefComplaint": "Sarılık, halsizlik ve iştahsızlık",
    "stem": "Üç gündür halsizlik, bulantı ve koyu renkli idrar yakınması olan genç erişkinde skleralarda ikter izlenir. Yakın zamanda kalabalık bir yurtta gastroenterit benzeri yakınmaları olan arkadaşları olduğu öğrenilir",
    "exam": [
      "Skleralarda ikter.",
      "Karaciğer palpasyonda hafif hassas.",
      "Periton irritasyonu yok."
    ],
    "vitals": {
      "TA": "118/74 mmHg",
      "Nabız": "86/dk",
      "Solunum": "16/dk",
      "SpO2": "%98",
      "Ateş": "37.7 °C"
    },
    "investigations": [
      {
        "id": "ai-hav-liver-panel",
        "label": "Karaciğer enzimleri",
        "type": "lab",
        "priority": "useful",
        "summary": "alt 1180 U/L, AST 910 U/L, total bilirubin 5.1 mg/dL, ALP hafif yüksek.",
        "findings": [
          "alt ve AST belirgin yüksek",
          "Bilirubin yüksekliği hepatoselüler örüntüyle birlikte"
        ]
      },
      {
        "id": "ai-hav-serology",
        "label": "Viral hepatit serolojisi",
        "type": "lab",
        "priority": "essential",
        "summary": "Anti-HAV IgM pozitif. Anti-HAV IgG negatif. HBsAg negatif. Anti-HBc IgM negatif. Anti-HCV negatif.",
        "findings": [
          "Anti-HAV IgM pozitif",
          "HBV akut enfeksiyon göstergeleri negatif",
          "HCV taraması negatif"
        ]
      }
    ],
    "question": "Bu serolojik örüntü en çok hangi tabloyu destekler?",
    "options": [
      {
        "id": "A",
        "text": "Akut hepatit A"
      },
      {
        "id": "B",
        "text": "Geçirilmiş hepatit A bağışıklığı"
      },
      {
        "id": "C",
        "text": "Akut hepatit B"
      },
      {
        "id": "D",
        "text": "Kronik hepatit C"
      },
      {
        "id": "E",
        "text": "Aşı sonrası hepatit B bağışıklığı"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Anti-HAV IgM pozitifliği yakın dönem hepatit A enfeksiyonunu gösterir. Anti-HAV IgG’nin negatif olması geçirilmiş bağışıklıktan çok erken/akut dönemi destekler. HBV ve HCV göstergelerinin negatifliği diğer viral hepatit örüntülerini zayıflatır.",
    "wrongOptionFeedback": {
      "B": "Geçirilmiş hepatit A bağışıklığında beklenen örüntü Anti-HAV IgG pozitifliği ve IgM negatifliğidir. Burada IgM pozitiftir.",
      "C": "Akut hepatit B için HBsAg ve özellikle Anti-HBc IgM pozitifliği beklenir. Bu olguda ikisi de negatif verilmiştir.",
      "D": "Kronik hepatit C genellikle Anti-HCV ve/veya HCV RNA pozitifliğiyle desteklenir. Tarama negatif verilmiştir.",
      "E": "Aşı sonrası hepatit B bağışıklığında Anti-HBs pozitifliği beklenir. Mevcut örüntü HAV IgM üzerinden yorumlanmalıdır."
    },
    "evidenceChain": [
      "Akut hepatoselüler enzim örüntüsü vardır",
      "Anti-HAV IgM pozitifliği yakın dönem HAV enfeksiyonunu destekler",
      "HBsAg ve Anti-HBc IgM negatifliği akut HBV olasılığını azaltır",
      "Anti-HCV negatifliği HCV lehine bir serolojik destek bırakmaz"
    ],
    "examPearl": "TUS’ta Anti-HAV IgM akut enfeksiyon. Anti-HAV IgG geçirilmiş enfeksiyon veya bağışıklık göstergesidir.",
    "patientIntro": {
      "presentation": "Sarılık, halsizlik ve iştahsızlık",
      "riskContext": [],
      "distinctiveClues": [
        "Sarılık, halsizlik ve iştahsızlık",
        "alt 1180 U/L, AST 910 U/L, total bilirubin 5.1 mg/dL, ALP hafif yüksek",
        "TA: 118/74 mmHg"
      ],
      "historySummary": "Üç gündür halsizlik, bulantı ve koyu renkli idrar yakınması olan genç erişkinde skleralarda ikter izlenir. Yakın zamanda kalabalık bir yurtta gastroenterit benzeri yakınmaları olan arkadaşları olduğu öğrenilir."
    }
  },
  {
    "seedId": "ai-organophosphate-antidote-001",
    "title": "Kolinerjik toksidrom ve antidot seçimi",
    "relatedBranch": "Tıbbi Farmakoloji",
    "branchId": "tus-spot-olgular",
    "spotCategory": "AI Spot • Farmakoloji",
    "difficulty": "Zor",
    "learningTarget": "Organofosfat zehirlenmesinde muskarinik bulgular ve reaktivasyon tedavisinin birlikte düşünülmesi",
    "demographics": "48 yaş erkek",
    "setting": "Acil servis",
    "chiefComplaint": "Terleme, salivasyon ve nefes darlığı",
    "stem": "Tarım ilacı uygulamasından sonra bulantı, karın krampları, yoğun terleme ve sekresyon artışı gelişen hastada miyozis ve bronkore dikkat çeker",
    "exam": [
      "Bilateral hışıltılı solunum ve bronş sekresyonları artmış.",
      "Pupiller belirgin miyotik.",
      "Kas fasikülasyonları izleniyor."
    ],
    "vitals": {
      "TA": "104/66 mmHg",
      "Nabız": "54/dk",
      "Solunum": "24/dk",
      "SpO2": "%92",
      "Ateş": "36.8 °C"
    },
    "investigations": [
      {
        "id": "ai-op-cholinesterase",
        "label": "Kolinesteraz aktivitesi",
        "type": "toxicology",
        "priority": "essential",
        "summary": "Eritrosit asetilkolinesteraz aktivitesi belirgin düşük.",
        "findings": [
          "Kolinesteraz aktivitesi baskılanmış",
          "Klinik kolinerjik tabloyla uyumlu objektif toksikoloji verisi"
        ]
      }
    ],
    "question": "Bu tabloda özgül antidotal yaklaşım için en uygun seçenek hangisidir?",
    "options": [
      {
        "id": "A",
        "text": "Atropin + pralidoksim"
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
        "text": "N-asetilsistein"
      },
      {
        "id": "E",
        "text": "Fomepizol"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Organofosfatlar asetilkolinesterazı inhibe ederek muskarinik, nikotinik ve santral bulgular oluşturur. Atropin muskarinik etkileri antagonize eder. Pralidoksim erken dönemde fosforile enzimi reaktive ederek özellikle nikotinik bulgulara katkı sağlar.",
    "wrongOptionFeedback": {
      "B": "Nalokson opioid toksisitesinde solunum depresyonu ve miyozis için düşünülür. Burada sekresyon artışı, bronkore ve fasikülasyonlar kolinerjik toksidromu destekler.",
      "C": "Flumazenil benzodiazepin etkisini geri çevirir. Organofosfat kaynaklı asetilkolinesteraz inhibisyonunu düzeltmez.",
      "D": "N-asetilsistein parasetamol toksisitesinde kullanılır. Kolinerjik bulguları hedeflemez.",
      "E": "Fomepizol metanol/etilen glikol zehirlenmesinde kullanılır. Bu olgunun toksidromu farklıdır."
    },
    "evidenceChain": [
      "Tarım ilacı maruziyeti organofosfat olasılığını artırır",
      "Miyozis, bronkore, salivasyon ve bradikardi muskarinik aşırı uyarıyı gösterir",
      "Fasikülasyonlar nikotinik tutulum lehinedir",
      "Kolinesteraz aktivitesinin düşük olması mekanizmayı destekler"
    ],
    "examPearl": "Organofosfat zehirlenmesinde atropin sekresyonlar kuruyana kadar titre edilir. Pralidoksim enzim aging gelişmeden erken verilmelidir.",
    "patientIntro": {
      "presentation": "Terleme, salivasyon ve nefes darlığı",
      "riskContext": [],
      "distinctiveClues": [
        "Terleme, salivasyon ve nefes darlığı",
        "Bilateral hışıltılı solunum ve bronş sekresyonları artmış",
        "TA: 104/66 mmHg"
      ],
      "historySummary": "Tarım ilacı uygulamasından sonra bulantı, karın krampları, yoğun terleme ve sekresyon artışı gelişen hastada miyozis ve bronkore dikkat çeker."
    }
  },
  {
    "seedId": "ai-msud-biochemistry-001",
    "title": "Yenidoğanda beslenme sonrası nörolojik kötüleşme",
    "relatedBranch": "Tıbbi Biyokimya",
    "branchId": "tus-spot-olgular",
    "spotCategory": "AI Spot • Biyokimya",
    "difficulty": "Orta-Zor",
    "learningTarget": "Dallı zincirli aminoasit metabolizma bozukluklarının enzim düzeyinde tanınması",
    "demographics": "10 günlük yenidoğan",
    "setting": "Yenidoğan servisi",
    "chiefComplaint": "Beslenme güçlüğü ve letarji",
    "stem": "Doğumdan sonra ilk günleri olağan seyreden bebekte beslenmenin artmasıyla kusma, letarji ve tonus değişikliği gelişir. Aile idrarda tatlımsı-keskin bir koku fark ettiğini söyler",
    "exam": [
      "Letarjik görünüm.",
      "Emme zayıf.",
      "Aralıklı distonik postürlenme."
    ],
    "vitals": {
      "TA": "70/42 mmHg",
      "Nabız": "146/dk",
      "Solunum": "38/dk",
      "SpO2": "%97",
      "Ateş": "36.9 °C"
    },
    "investigations": [
      {
        "id": "ai-msud-aa-profile",
        "label": "Plazma aminoasit profili",
        "type": "lab",
        "priority": "essential",
        "summary": "Lösin, izolösin ve valin düzeyleri belirgin yüksek. Alloisolösin saptanıyor.",
        "findings": [
          "Dallı zincirli aminoasitler yüksek",
          "Alloisolösin varlığı ayırt ettirici"
        ]
      }
    ],
    "question": "Bu tablo en olası olarak hangi enzim kompleksindeki bozuklukla ilişkilidir?",
    "options": [
      {
        "id": "A",
        "text": "Dallı zincirli alfa-ketoasit dehidrogenaz kompleksi"
      },
      {
        "id": "B",
        "text": "Fenilalanin hidroksilaz"
      },
      {
        "id": "C",
        "text": "Homogentizat oksidaz"
      },
      {
        "id": "D",
        "text": "Propionil-CoA karboksilaz"
      },
      {
        "id": "E",
        "text": "Ornitin transkarbamilaz"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Lösin, izolösin ve valin artışı ile alloisolösin varlığı maple syrup urine disease için tipiktir. Bu hastalık dallı zincirli alfa-ketoasit dehidrogenaz kompleks defektinden kaynaklanır.",
    "wrongOptionFeedback": {
      "B": "Fenilalanin hidroksilaz eksikliği fenilketonüriye yol açar. Fenilalanin yüksekliği ve küf/fare kokusu beklenir.",
      "C": "Homogentizat oksidaz eksikliği alkaptonüri ile ilişkilidir. Yenidoğanda lösin-valin-izolösin artışı beklenen ana bulgu değildir.",
      "D": "Propionil-CoA karboksilaz eksikliği organik asidemi yapabilir. Ancak alloisolösin ve belirgin dallı zincirli aminoasit örüntüsü MSUD lehinedir.",
      "E": "Ornitin transkarbamilaz eksikliği üre döngüsü bozukluğudur. Ağır hiperamonyemi ön planda beklenir."
    },
    "evidenceChain": [
      "Semptomlar protein alımı arttıktan sonra başlar",
      "Tatlımsı idrar kokusu dallı zincirli aminoasit bozukluğunu düşündürür",
      "Lösin, izolösin ve valin yüksekliği aynı metabolik yola işaret eder",
      "Alloisolösin MSUD için güçlü ayırt ettirici veridir"
    ],
    "examPearl": "MSUD’de toksisite özellikle lösin birikimiyle nörolojik bulgu yapar. Enzim defekti BCKD kompleksidir.",
    "patientIntro": {
      "presentation": "Beslenme güçlüğü ve letarji",
      "riskContext": [],
      "distinctiveClues": [
        "Beslenme güçlüğü ve letarji",
        "TA: 70/42 mmHg"
      ],
      "historySummary": "Doğumdan sonra ilk günleri olağan seyreden bebekte beslenmenin artmasıyla kusma, letarji ve tonus değişikliği gelişir. Aile idrarda tatlımsı-keskin bir koku fark ettiğini söyler."
    }
  },
  {
    "seedId": "ai-adrenal-insufficiency-001",
    "title": "Hiperpigmentasyon ve elektrolit örüntüsü",
    "relatedBranch": "İç Hastalıkları",
    "branchId": "tus-spot-olgular",
    "spotCategory": "AI Spot • Dahiliye",
    "difficulty": "Orta-Zor",
    "learningTarget": "Primer ve sekonder adrenal yetmezlik ayrımında ACTH ve mineralokortikoid bulgularının kullanılması",
    "demographics": "34 yaş kadın",
    "setting": "Dahiliye polikliniği",
    "chiefComplaint": "Halsizlik, kilo kaybı ve baş dönmesi",
    "stem": "Son aylarda halsizlik, tuz isteği, kilo kaybı ve ayağa kalkınca baş dönmesi tarifleyen hastada cilt kıvrımlarında belirgin koyulaşma fark edilir",
    "exam": [
      "Avuç içi çizgilerinde hiperpigmentasyon.",
      "Ortostatik hipotansiyon.",
      "Mukozalarda hafif hiperpigmente alanlar."
    ],
    "vitals": {
      "TA": "92/58 mmHg",
      "Nabız": "104/dk",
      "Solunum": "17/dk",
      "SpO2": "%98",
      "Ateş": "36.6 °C"
    },
    "investigations": [
      {
        "id": "ai-adrenal-electrolyte",
        "label": "Elektrolit paneli",
        "type": "lab",
        "priority": "essential",
        "summary": "Sodyum 128 mmol/L, potasyum 5.8 mmol/L, glukoz 68 mg/dL.",
        "findings": [
          "Hiponatremi",
          "Hiperkalemi",
          "Düşük-normal glukoz"
        ]
      },
      {
        "id": "ai-adrenal-hormone",
        "label": "Sabah kortizol-ACTH",
        "type": "lab",
        "priority": "essential",
        "summary": "Sabah kortizol düşük. ACTH belirgin yüksek.",
        "findings": [
          "Kortizol düşük",
          "ACTH yüksek"
        ]
      }
    ],
    "question": "Bu bulgular en çok hangi durumu destekler?",
    "options": [
      {
        "id": "A",
        "text": "Primer adrenal yetmezlik"
      },
      {
        "id": "B",
        "text": "Sekonder adrenal yetmezlik"
      },
      {
        "id": "C",
        "text": "Cushing hastalığı"
      },
      {
        "id": "D",
        "text": "Primer hiperaldosteronizm"
      },
      {
        "id": "E",
        "text": "Uygunsuz ADH sendromu"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Düşük kortizol ile birlikte ACTH’nin yüksek olması adrenal bez düzeyinde yetmezliği düşündürür. Hiperpigmentasyon yüksek ACTH/POMC türevleriyle, hiperkalemi ise mineralokortikoid eksikliğiyle açıklanır.",
    "wrongOptionFeedback": {
      "B": "Sekonder adrenal yetmezlikte ACTH düşük veya uygunsuz normal beklenir. Hiperpigmentasyon ve belirgin hiperkalemi daha az beklenir.",
      "C": "Cushing hastalığında kortizol fazlalığı ve ACTH bağımlı hiperkortizolizm beklenir. Burada kortizol düşüktür.",
      "D": "Primer hiperaldosteronizm hipertansiyon ve hipokalemi yapar. Bu olguda hipotansiyon ve hiperkalemi vardır.",
      "E": "Uygunsuz ADH sendromu hiponatremi yapabilir ancak hiperkalemi, yüksek ACTH ve düşük kortizol örüntüsünü açıklamaz."
    },
    "evidenceChain": [
      "Ortostatik hipotansiyon ve tuz isteği mineralokortikoid eksikliğini düşündürür",
      "Hiperpigmentasyon yüksek ACTH etkisini destekler",
      "Hiponatremi ve hiperkalemi birlikte adrenal yetmezlik lehinedir",
      "Düşük kortizol-yüksek ACTH primer düzeyi gösterir"
    ],
    "examPearl": "Primer adrenal yetmezlikte kortizol düşük, ACTH yüksek, aldosteron eksikliği nedeniyle hiperkalemi beklenir.",
    "patientIntro": {
      "presentation": "Halsizlik, kilo kaybı ve baş dönmesi",
      "riskContext": [],
      "distinctiveClues": [
        "Halsizlik, kilo kaybı ve baş dönmesi",
        "Sodyum 128 mmol/L, potasyum 5.8 mmol/L, glukoz 68 mg/dL",
        "TA: 92/58 mmHg"
      ],
      "historySummary": "Son aylarda halsizlik, tuz isteği, kilo kaybı ve ayağa kalkınca baş dönmesi tarifleyen hastada cilt kıvrımlarında belirgin koyulaşma fark edilir."
    }
  },
  {
    "seedId": "ai-croup-treatment-001",
    "title": "Çocukta inspiratuvar stridor",
    "relatedBranch": "Çocuk Sağlığı ve Hastalıkları",
    "branchId": "tus-spot-olgular",
    "spotCategory": "AI Spot • Pediatri",
    "difficulty": "Orta",
    "learningTarget": "Krup tedavisinde klinik şiddete göre steroid ve nebulize epinefrin kullanımının seçilmesi",
    "demographics": "2 yaş erkek çocuk",
    "setting": "Çocuk acil",
    "chiefComplaint": "Havlar tarzda öksürük ve ses kısıklığı",
    "stem": "Gece başlayan havlar tarzda öksürük, ses kısıklığı ve inspiratuvar stridor nedeniyle getirilen çocukta salya akması yoktur. Aşıları yaşına uygundur",
    "exam": [
      "İstirahatte hafif inspiratuvar stridor.",
      "Havlar tarzda öksürük.",
      "Orofarenkste belirgin membran veya salya akması yok."
    ],
    "vitals": {
      "TA": "92/58 mmHg",
      "Nabız": "124/dk",
      "Solunum": "30/dk",
      "SpO2": "%96",
      "Ateş": "37.8 °C"
    },
    "investigations": [
      {
        "id": "ai-croup-clinical",
        "label": "Klinik üst hava yolu değerlendirmesi",
        "type": "clinical",
        "priority": "essential",
        "summary": "Toksik görünüm yok. Tripod pozisyonu ve salya akması izlenmiyor.",
        "findings": [
          "Üst hava yolu obstrüksiyonu hafif-orta düzeyde",
          "Epiglotit lehine toksik görünüm yok"
        ]
      }
    ],
    "question": "Bu klinik tablo için en uygun ilk tedavi yaklaşımı hangisidir?",
    "options": [
      {
        "id": "A",
        "text": "Deksametazon + nebulize epinefrin"
      },
      {
        "id": "B",
        "text": "Acil entübasyon + geniş spektrum antibiyotik"
      },
      {
        "id": "C",
        "text": "Beta-2 agonist nebülizasyonu"
      },
      {
        "id": "D",
        "text": "Antitoksin + eritromisin"
      },
      {
        "id": "E",
        "text": "Heimlich manevrası"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Havlar tarzda öksürük, ses kısıklığı ve stridor viral krup lehinedir. İstirahatte stridor varsa steroid tedavisine ek olarak hızlı semptom rahatlaması için nebulize epinefrin uygundur.",
    "wrongOptionFeedback": {
      "B": "Acil entübasyon ve antibiyotik epiglotit gibi toksik, salya akması olan ciddi tablo için düşünülür. Burada tipik krup bulguları baskındır.",
      "C": "Beta-2 agonistler alt hava yolu bronkospazmında yararlıdır. Krup temel olarak subglottik üst hava yolu ödemidir.",
      "D": "Antitoksin ve eritromisin difteri için düşünülür. Membran ve aşı eksikliği gibi destekleyici ipuçları yoktur.",
      "E": "Heimlich yabancı cisim aspirasyonunda akut boğulma/ani hava yolu tıkanması için uygundur. Burada viral prodromlu krup örüntüsü vardır."
    },
    "evidenceChain": [
      "Havlar tarzda öksürük ve ses kısıklığı krup örüntüsüdir",
      "Salya akması ve toksik görünüm olmaması epiglotiti zayıflatır",
      "İstirahatte stridor hastalığın hafifin üzerinde olduğunu gösterir",
      "Steroid ödemi azaltır, nebulize epinefrin hızlı geçici rahatlama sağlar"
    ],
    "examPearl": "Krup tedavisinde tüm şiddetlerde steroid verilir. İstirahatte stridor varsa nebulize epinefrin eklenir.",
    "patientIntro": {
      "presentation": "Havlar tarzda öksürük ve ses kısıklığı",
      "riskContext": [],
      "distinctiveClues": [
        "Havlar tarzda öksürük ve ses kısıklığı",
        "İstirahatte hafif inspiratuvar stridor",
        "TA: 92/58 mmHg"
      ],
      "historySummary": "Gece başlayan havlar tarzda öksürük, ses kısıklığı ve inspiratuvar stridor nedeniyle getirilen çocukta salya akması yoktur. Aşıları yaşına uygundur."
    }
  },
  {
    "seedId": "ai-ectopic-pregnancy-001",
    "title": "Erken gebelikte ağrı ve kanama",
    "relatedBranch": "Kadın Hastalıkları ve Doğum",
    "branchId": "tus-spot-olgular",
    "spotCategory": "AI Spot • Kadın Doğum",
    "difficulty": "Orta-Zor",
    "learningTarget": "Erken gebelik kanamasında beta-hCG ve transvajinal USG yorumunun kullanılması",
    "demographics": "29 yaş kadın",
    "setting": "Jinekoloji acil",
    "chiefComplaint": "Alt karın ağrısı ve vajinal lekelenme",
    "stem": "Son adet tarihine göre yaklaşık 6 haftalık gebelik olasılığı olan hastada tek taraflı alt karın ağrısı ve vajinal lekelenme vardır. Hemodinamik olarak stabildir",
    "exam": [
      "Sol adneksiyal hassasiyet.",
      "Servikal hareket hassasiyeti hafif.",
      "Batında yaygın defans yok."
    ],
    "vitals": {
      "TA": "112/70 mmHg",
      "Nabız": "96/dk",
      "Solunum": "18/dk",
      "SpO2": "%99",
      "Ateş": "36.7 °C"
    },
    "investigations": [
      {
        "id": "ai-ectopic-bhcg",
        "label": "Serum beta-hCG",
        "type": "lab",
        "priority": "essential",
        "summary": "Beta-hCG 2400 mIU/mL.",
        "findings": [
          "Gebelik testi pozitif aralıkta",
          "Değer transvajinal USG ile birlikte yorumlanmalıdır"
        ]
      },
      {
        "id": "ai-ectopic-tvus",
        "label": "Transvajinal ultrasonografi",
        "type": "ultrasound",
        "priority": "essential",
        "summary": "Uterin kavitede gestasyonel kese izlenmiyor. Sol adneksiyal bölgede 2.1 cm heterojen yapı ve az miktarda serbest sıvı izleniyor.",
        "findings": [
          "İntrauterin kese izlenmiyor",
          "Adneksiyal heterojen yapı mevcut",
          "Az serbest sıvı var"
        ]
      }
    ],
    "question": "Bu veriler en çok hangi tanısal olasılığı destekler?",
    "options": [
      {
        "id": "A",
        "text": "Ektopik gebelik"
      },
      {
        "id": "B",
        "text": "Tam abortus"
      },
      {
        "id": "C",
        "text": "Molar gebelik"
      },
      {
        "id": "D",
        "text": "Rüptüre korpus luteum kisti"
      },
      {
        "id": "E",
        "text": "Normal intrauterin gebelik"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Beta-hCG düzeyi transvajinal USG ile intrauterin kese beklenebilecek aralıktayken uterin kavitede kese görülmemesi ve adneksiyal yapı saptanması ektopik gebeliği destekler.",
    "wrongOptionFeedback": {
      "B": "Tam abortusta uterin kavite boş olabilir. Ancak adneksiyal kitle ve beta-hCG bağlamında ektopik gebelik daha önceliklidir.",
      "C": "Molar gebelikte çok yüksek beta-hCG ve uterusta molar doku görünümü beklenir. Bu veriler verilmemiştir.",
      "D": "Korpus luteum kisti ağrı ve serbest sıvı yapabilir. Fakat pozitif gebelik, boş uterus ve adneksiyal yapı birlikte ektopik gebeliği önceliklendirir.",
      "E": "Normal intrauterin gebelikte bu beta-hCG aralığında transvajinal USG’de uterin kese beklenir. Burada görülmemektedir."
    },
    "evidenceChain": [
      "Gebelik olasılığı serum beta-hCG ile desteklenmiştir",
      "Uterin kavitede kese görülmemesi normal intrauterin gebeliği zayıflatır",
      "Adneksiyal yapı ve serbest sıvı ektopik lokalizasyonu destekler",
      "Hasta stabil olsa da rüptür riski nedeniyle bu olasılık önceliklidir"
    ],
    "examPearl": "Erken gebelikte beta-hCG anlamlı düzeydeyken intrauterin kese görülmemesi ektopik gebelik açısından kırmızı bayraktır.",
    "patientIntro": {
      "presentation": "Alt karın ağrısı ve vajinal lekelenme",
      "riskContext": [],
      "distinctiveClues": [
        "Alt karın ağrısı ve vajinal lekelenme",
        "Sol adneksiyal hassasiyet",
        "Değer transvajinal USG ile birlikte yorumlanmalıdır",
        "TA: 112/70 mmHg"
      ],
      "historySummary": "Son adet tarihine göre yaklaşık 6 haftalık gebelik olasılığı olan hastada tek taraflı alt karın ağrısı ve vajinal lekelenme vardır. Hemodinamik olarak stabildir."
    }
  }
];
