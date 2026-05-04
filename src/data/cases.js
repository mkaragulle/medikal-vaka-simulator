// MedSim Pro vaka verisi: TUS'a yakın ama tamamen özgün klinik dil optimizasyonu.
// Not: ÖSYM/TUS soru metinleri kopyalanmamış; yalnızca klinik yoğunluk, terminoloji ve karar verdirici soru kurgusu referans alınmıştır.

export const cases = [
  {
    "id": "cv-anterior-stemi-001",
    "branchId": "cardiovascular",
    "title": "Retrosternal baskı tarzında göğüs ağrısı ve acil EKG bulguları",
    "difficulty": "Acil · TUS düzeyi",
    "clinicalFocus": "Akut koroner sendromda iskemik ağrı paterni, ardışık derivasyon analizi ve reperfüzyon endikasyonu",
    "demographics": "58 yaşında erkek",
    "setting": "Acil servis",
    "chiefComplaint": "Kırk beş dakikadır devam eden retrosternal baskı tarzında göğüs ağrısı",
    "stem": "Hipertansiyon, dislipidemi ve 35 paket-yıl sigara öyküsü olan hasta; istirahat sırasında başlayan, sol kola ve mandibulaya yayılan, soğuk terleme ve bulantının eşlik ettiği göğüs ağrısı nedeniyle acil servise başvuruyor. Sublingual nitrat uygulanmasına rağmen ağrısında belirgin gerileme olmadığı öğreniliyor.",
    "vitals": {
      "TA": "152/94 mmHg",
      "Nabız": "106/dk",
      "Solunum": "20/dk",
      "SpO2": "%95",
      "Ateş": "36.7 °C"
    },
    "exam": [
      "Hastanın anksiyöz ve diaforetik olduğu izleniyor",
      "Kalp sesleri ritmik; belirgin ek ses veya üfürüm duyulmuyor",
      "Akciğer oskültasyonunda yaygın ral saptanmıyor",
      "Periferik nabızlar bilateral simetrik alınıyor"
    ],
    "investigations": [
      {
        "id": "ecg",
        "label": "12 derivasyon EKG",
        "type": "ecg",
        "summary": "V2-V5 derivasyonlarında belirgin ST segment elevasyonu, inferior derivasyonlarda karşılıklı ST segment depresyonu izleniyor.",
        "findings": [
          "Aynı koroner sulama alanını gösteren ardışık derivasyonlarda ST elevasyonu acil reperfüzyon gerektiren bir paterndir.",
          "Resiprokal ST depresyonu akut transmural iskemi lehine ek kanıt sağlar."
        ]
      },
      {
        "id": "markers",
        "label": "Kardiyak biyobelirteçler",
        "type": "lab",
        "rows": [
          [
            "hs-Troponin I",
            "188 ng/L",
            "<34 ng/L",
            "Yüksek"
          ],
          [
            "CK-MB",
            "23 ng/mL",
            "<5 ng/mL",
            "Yüksek"
          ],
          [
            "Kreatinin",
            "0.9 mg/dL",
            "0.6-1.2 mg/dL",
            "Referans içinde"
          ]
        ]
      },
      {
        "id": "initial-management",
        "label": "Acil tedavi kararı",
        "type": "management",
        "summary": "EKG ile tanısal patern saptandığında biyobelirteç tekrarını beklemeden primer perkütan koroner girişim için kateter laboratuvarı aktivasyonu planlanır; merkez gecikmesi öngörülüyorsa fibrinolitik tedavi algoritması değerlendirilir."
      }
    ],
    "images": [
      {
        "title": "12 derivasyon EKG",
        "caption": "Prekordiyal derivasyonlarda belirgin repolarizasyon değişiklikleri ve karşılıklı değişiklikler izlenir.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/AMI%20anterior%20(CardioNetworks%20ECGpedia).png",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:AMI_anterior_(CardioNetworks_ECGpedia).png",
        "sourceName": "",
        "license": "CC BY-SA",
        "modality": "ecg",
        "relatedFinding": "Anterior derivasyonlarda ST elevasyonu"
      }
    ],
    "diagnosis": {
      "correct": "Anterior ST elevasyonlu miyokart enfarktüsü",
      "options": [
        "Anterior ST elevasyonlu miyokart enfarktüsü",
        "Akut perikardit",
        "Non-ST elevasyonlu miyokart enfarktüsü",
        "Pulmoner emboli"
      ],
      "explanation": "İskemik karakterde göğüs ağrısı ile ardışık anterior derivasyonlarda ST elevasyonunun birlikte bulunması akut koroner oklüzyon paternini oluşturur; bu tabloda tedavi kararı troponin tekrarını beklemeden EKG üzerinden verilir.",
      "pearls": [
        "ST elevasyonlu miyokart enfarktüsünde karar verdirici ilk veri 12 derivasyon EKG’dir.",
        "Troponin negatif veya erken dönemde sınırda olsa bile tipik ST elevasyonu reperfüzyon kararını geciktirmez.",
        "Yaygın konkav ST elevasyonu ve PR depresyonu perikardit lehinedir; lokalize ST elevasyonu ve resiprokal depresyon oklüzyon lehinedir."
      ],
      "nextStep": "Kateter laboratuvarını primer perkütan koroner girişim için aktive et; Aspirin, P2Y12 inhibitörü ve antikoagülasyonu başla; Ritim, kan basıncı ve oksijenizasyonu sürekli izle.",
      "answerFeedback": {
        "diagnosisMeta": "Akut koroner sendrom · anterior duvar iskemisi · acil reperfüzyon",
        "whyCorrect": "İskemik karakterde göğüs ağrısı ile ardışık anterior derivasyonlarda ST elevasyonunun birlikte bulunması akut koroner oklüzyon paternini oluşturur; bu tabloda tedavi kararı troponin tekrarını beklemeden EKG üzerinden verilir.",
        "evidenceChain": [
          "Retrosternal baskı tarzında ağrının sol kola ve mandibulaya yayılması iskemik ağrı lehinedir.",
          "Soğuk terleme ve bulantı gibi otonom semptomlar akut koroner sendrom olasılığını artırır.",
          "V2–V5 derivasyonlarında ST segment elevasyonu anterior duvar tutulumunu gösterir.",
          "İnferior derivasyonlardaki resiprokal ST depresyonu akut oklüzyon lehine ek kanıttır."
        ],
        "pearls": [
          "ST elevasyonlu miyokart enfarktüsünde karar verdirici ilk veri 12 derivasyon EKG’dir.",
          "Troponin negatif veya erken dönemde sınırda olsa bile tipik ST elevasyonu reperfüzyon kararını geciktirmez.",
          "Yaygın konkav ST elevasyonu ve PR depresyonu perikardit lehinedir; lokalize ST elevasyonu ve resiprokal depresyon oklüzyon lehinedir."
        ],
        "management": [
          "Kateter laboratuvarını primer perkütan koroner girişim için aktive et",
          "Aspirin, P2Y12 inhibitörü ve antikoagülasyonu başla",
          "Ritim, kan basıncı ve oksijenizasyonu sürekli izle"
        ],
        "learningOutcome": "Anterior STEMI’de tanı-tedavi zamanını belirleyen veri EKG paternidir.",
        "differentials": {
          "Akut perikardit": {
            "explanation": "Perikardit göğüs ağrısı ve ST değişikliğiyle karışabilir; ancak bu olguda ağrının iskemik karakteri, lokalize anterior ST elevasyonu ve resiprokal depresyon akut koroner oklüzyonu öne çıkarır.",
            "comparisonPoints": [
              "Perikarditte ST elevasyonu daha yaygın ve konkav morfolojidedir.",
              "PR depresyonu perikardit lehine beklenir; burada belirleyici bulgu resiprokal ST depresyonudur.",
              "Perikarditte reperfüzyon algoritması değil antiinflamatuvar yaklaşım düşünülür."
            ]
          },
          "Non-ST elevasyonlu miyokart enfarktüsü": {
            "explanation": "NSTEMI akut koroner sendrom spektrumundadır; ancak ST elevasyonunun ardışık derivasyonlarda bulunması tanıyı STEMI düzeyine taşır.",
            "comparisonPoints": [
              "NSTEMI’de ST elevasyonu kalıcı ve lokalize değildir.",
              "Bu olguda EKG, acil reperfüzyon endikasyonu yaratır.",
              "Biyobelirteç yüksekliği STEMI kararını destekler ancak kararın ön koşulu değildir."
            ]
          },
          "Pulmoner emboli": {
            "explanation": "Pulmoner emboli akut göğüs ağrısı ve dispne yapabilir; ancak bu olguda tipik iskemik ağrı ve anterior ST elevasyonu ön plandadır.",
            "comparisonPoints": [
              "Pulmoner embolide plöritik ağrı, hipoksemi ve sağ kalp yüklenmesi bulguları daha beklenir.",
              "V2–V5 ST elevasyonu pulmoner emboli için tipik başlangıç paterni değildir.",
              "İlk tedavi antikoagülasyon/reperfüzyon risk sınıflamasıdır; burada koroner reperfüzyon önceliklidir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "cv-aortic-dissection-001",
    "branchId": "cardiovascular",
    "title": "Ani başlayan yırtılır tarzda torasik ağrı ve nabız asimetrisi",
    "difficulty": "Acil · Kritik ayırıcı tanı",
    "clinicalFocus": "Akut aort sendromunda ağrı karakteri, nabız-tansiyon farkı, aort kapak yetmezliği ve BT anjiyografi bulgularının yorumu",
    "demographics": "64 yaşında erkek",
    "setting": "Acil servis",
    "chiefComplaint": "Sırta yayılan ani başlangıçlı çok şiddetli göğüs ağrısı",
    "stem": "Kontrolsüz hipertansiyon öyküsü bulunan hasta, ağrının aniden başladığını ve başlangıç anında maksimum şiddete ulaştığını ifade ediyor. Sağ üst ekstremiteden ölçülen kan basıncının sol üst ekstremiteye göre daha düşük olduğu, ağrıya senkop veya travmanın eşlik etmediği öğreniliyor.",
    "vitals": {
      "TA": "190/108 mmHg",
      "Nabız": "112/dk",
      "Solunum": "22/dk",
      "SpO2": "%97",
      "Ateş": "36.6 °C"
    },
    "exam": [
      "Sağ radial nabız sol tarafa göre daha zayıf alınıyor",
      "Aort odağında yeni başlayan erken diyastolik üfürüm duyuluyor",
      "Fokal nörolojik defisit saptanmıyor",
      "Göğüs duvarında palpasyonla hassasiyet izlenmiyor"
    ],
    "investigations": [
      {
        "id": "cta",
        "label": "Kontrastlı toraks BT anjiyografi",
        "type": "ct",
        "summary": "Asendan aortadan başlayarak arkus düzeyine uzanan intimal flap ve gerçek-yalancı lümen ayrımı izleniyor.",
        "findings": [
          "Asendan aort tutulumu cerrahi yaklaşım gerektiren tip A paternini düşündürür.",
          "Aort kapak yetmezliği veya perikardiyal efüzyon varlığı aciliyeti artırır."
        ]
      },
      {
        "id": "labs",
        "label": "Başlangıç laboratuvarı",
        "type": "lab",
        "rows": [
          [
            "D-dimer",
            "Yüksek",
            "Yaşa göre değişir",
            "Yüksek"
          ],
          [
            "hs-Troponin I",
            "Sınırda",
            "<34 ng/L",
            "Sınırda"
          ],
          [
            "Hemoglobin",
            "13.8 g/dL",
            "13.5-17.5 g/dL",
            "Referans içinde"
          ]
        ]
      },
      {
        "id": "risk",
        "label": "Klinik risk ipuçları",
        "type": "clinical",
        "summary": "Ani maksimum şiddette ağrı, ekstremiteler arası nabız veya kan basıncı farkı ve yeni diyastolik üfürüm akut aort sendromu olasılığını artırır."
      }
    ],
    "images": [
      {
        "title": "Toraks BT",
        "caption": "İntimal flap ile gerçek ve yalancı lümen ayrımı akut aort diseksiyonunu destekler.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/DissectionCT.png",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:DissectionCT.png",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "ct",
        "relatedFinding": "İntimal flap ve çift lümen görünümü"
      }
    ],
    "diagnosis": {
      "correct": "Stanford tip A aort diseksiyonu",
      "options": [
        "Stanford tip A aort diseksiyonu",
        "Akut anterior ST elevasyonlu miyokart enfarktüsü",
        "Spontan pnömotoraks",
        "Özofagus perforasyonu"
      ],
      "explanation": "Ani başlayan ve başlangıçta maksimum şiddete ulaşan göğüs-sırt ağrısına nabız/kan basıncı asimetrisi, yeni diyastolik üfürüm ve BT anjiyografide asendan aort intimal flapinin eşlik etmesi Stanford tip A aort diseksiyonunu destekler.",
      "pearls": [
        "Tip A diseksiyonda kardiyovasküler cerrahi konsültasyonu geciktirilmez.",
        "Vazodilatör verilmeden önce beta-blokaj ile kalp hızı ve dP/dt azaltılmalıdır.",
        "Diseksiyon dışlanmadan antikoagülasyon veya trombolitik tedavi ciddi risk taşır."
      ],
      "nextStep": "Acil kardiyovasküler cerrahi konsültasyonu iste; İntravenöz beta-bloker ile kalp hızını kontrol et; Sistolik kan basıncını kontrollü biçimde düşür ve organ perfüzyonunu izle.",
      "answerFeedback": {
        "diagnosisMeta": "Akut aort sendromu · asendan aort tutulumu · cerrahi acil",
        "whyCorrect": "Ani başlayan ve başlangıçta maksimum şiddete ulaşan göğüs-sırt ağrısına nabız/kan basıncı asimetrisi, yeni diyastolik üfürüm ve BT anjiyografide asendan aort intimal flapinin eşlik etmesi Stanford tip A aort diseksiyonunu destekler.",
        "evidenceChain": [
          "Kontrolsüz hipertansiyon akut aort sendromu için temel risk faktörüdür.",
          "Yırtılır tarzda ağrının sırta yayılması ve ani maksimum şiddete ulaşması diseksiyon lehinedir.",
          "Üst ekstremiteler arası nabız veya kan basıncı farkı dallanma tutulumu düşündürür.",
          "Asendan aortta intimal flap görülmesi Stanford tip A sınıflamasını belirler."
        ],
        "pearls": [
          "Tip A diseksiyonda kardiyovasküler cerrahi konsültasyonu geciktirilmez.",
          "Vazodilatör verilmeden önce beta-blokaj ile kalp hızı ve dP/dt azaltılmalıdır.",
          "Diseksiyon dışlanmadan antikoagülasyon veya trombolitik tedavi ciddi risk taşır."
        ],
        "management": [
          "Acil kardiyovasküler cerrahi konsültasyonu iste",
          "İntravenöz beta-bloker ile kalp hızını kontrol et",
          "Sistolik kan basıncını kontrollü biçimde düşür ve organ perfüzyonunu izle"
        ],
        "learningOutcome": "Ani yırtılır ağrı + nabız farkı + intimal flap kombinasyonu tip A diseksiyon için karar verdiricidir.",
        "differentials": {
          "Akut anterior ST elevasyonlu miyokart enfarktüsü": {
            "explanation": "STEMI göğüs ağrısı yapar; ancak bu olguda ağrının yırtılır karakteri, nabız asimetrisi ve BT anjiyografik flap koroner oklüzyondan çok diseksiyonu gösterir.",
            "comparisonPoints": [
              "STEMI’de nabız/kan basıncı asimetrisi beklenen temel bulgu değildir.",
              "Yeni aort yetmezliği üfürümü tip A diseksiyon lehinedir.",
              "Antikoagülasyon kararı diseksiyon dışlanmadan verilmemelidir."
            ]
          },
          "Spontan pnömotoraks": {
            "explanation": "Pnömotoraks ani plöritik ağrı ve dispneyle gelir; fakat nabız asimetrisi, diyastolik üfürüm ve aort intimal flapi bu tanıyı geri plana iter.",
            "comparisonPoints": [
              "Pnömotoraksta tek taraflı solunum sesi azalması ve grafide plevral çizgi beklenir.",
              "Sırta yayılan yırtılır ağrı aort patolojisi açısından daha değerlidir.",
              "BT anjiyografi bulgusu doğrudan aort diseksiyonunu gösterir."
            ]
          },
          "Özofagus perforasyonu": {
            "explanation": "Özofagus perforasyonu şiddetli torasik ağrı yapabilir; ancak kusma sonrası başlangıç, mediastinal hava ve sepsis bulguları yerine vasküler bulgular ön plandadır.",
            "comparisonPoints": [
              "Boerhaave sendromunda kusma sonrası ağrı ve mediastinal amfizem beklenir.",
              "Ekstremite nabız farkı özofagus perforasyonuyla açıklanmaz.",
              "Asendan aort tutulumunun görülmesi cerrahi aort acilini düşündürür."
            ]
          }
        }
      }
    }
  },
  {
    "id": "cv-tamponade-001",
    "branchId": "cardiovascular",
    "title": "Hipotansiyon, juguler venöz dolgunluk ve kalp seslerinde derinden gelme",
    "difficulty": "Acil · Yatak başı tanı",
    "clinicalFocus": "Perikardiyal efüzyonun tamponad fizyolojisine ilerlemesi, pulsus paradoxus ve yatak başı ekokardiyografi bulguları",
    "demographics": "46 yaşında kadın",
    "setting": "Acil servis",
    "chiefComplaint": "Giderek artan nefes darlığı ve göğüste basınç hissi",
    "stem": "Bir hafta önce viral üst solunum yolu enfeksiyonu geçirdiği öğrenilen hasta, progresif dispne, halsizlik ve presenkop yakınmalarıyla acil servise getiriliyor. Oturur pozisyonda kısmi rahatlama olduğunu, eforla yakınmalarının belirgin arttığını ifade ediyor.",
    "vitals": {
      "TA": "84/56 mmHg",
      "Nabız": "128/dk",
      "Solunum": "28/dk",
      "SpO2": "%93",
      "Ateş": "37.3 °C"
    },
    "exam": [
      "Juguler venöz dolgunluk belirgin izleniyor",
      "Kalp sesleri derinden ve azalmış şiddette duyuluyor",
      "Pulsus paradoxus 16 mmHg olarak ölçülüyor",
      "Akciğer oskültasyonunda belirgin ral duyulmuyor"
    ],
    "investigations": [
      {
        "id": "echo",
        "label": "Yatak başı transtorasik ekokardiyografi",
        "type": "ultrasound",
        "summary": "Geniş perikardiyal efüzyon, sağ atriyum ve sağ ventrikül diyastolik kollapsı, inferior vena kavada dilatasyon ve inspiratuvar kollaps azalması izleniyor.",
        "findings": [
          "Diyastolik sağ kalp kollapsı tamponad fizyolojisini gösteren kritik bulgudur.",
          "Dilate ve kollabe olmayan IVC artmış intraperikardiyal basınçla uyumludur."
        ]
      },
      {
        "id": "ecg",
        "label": "12 derivasyon EKG",
        "type": "ecg",
        "summary": "Sinüs taşikardisi ve düşük voltajlı QRS kompleksleri izleniyor; elektriksel alternans açısından seri değerlendirme yapılabilir."
      },
      {
        "id": "labs",
        "label": "Laboratuvar",
        "type": "lab",
        "rows": [
          [
            "Lökosit",
            "11.200/mm³",
            "4.000-10.000/mm³",
            "Yüksek"
          ],
          [
            "hs-Troponin I",
            "Hafif yüksek",
            "<34 ng/L",
            "Yüksek"
          ],
          [
            "CRP",
            "42 mg/L",
            "<5 mg/L",
            "Yüksek"
          ]
        ]
      }
    ],
    "images": [
      {
        "title": "Kardiyak ultrason görüntüsü",
        "caption": "Kalp çevresindeki sıvı birikimi tamponad fizyolojisine ilerleyebilir; tanı yatak başı eko ile desteklenir.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/PericardialeffusionUS.PNG",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:PericardialeffusionUS.PNG",
        "sourceName": "",
        "license": "CC BY-SA",
        "modality": "ultrasound",
        "relatedFinding": "Perikardiyal sıvı ve sağ kalp basısı"
      }
    ],
    "diagnosis": {
      "correct": "Kardiyak tamponad",
      "options": [
        "Kardiyak tamponad",
        "Akut kardiyojenik pulmoner ödem",
        "Tansiyon pnömotoraks",
        "Septik şok"
      ],
      "explanation": "Hipotansiyon, juguler venöz dolgunluk, kalp seslerinde azalma, pulsus paradoxus ve ekokardiyografide sağ kalp diyastolik kollapsı birlikte kardiyak tamponad fizyolojisini gösterir.",
      "pearls": [
        "Tamponadda en kritik bulgu efüzyon hacminden çok hemodinamik etkidir.",
        "Pozitif basınçlı ventilasyon venöz dönüşü azaltarak tabloyu ağırlaştırabilir.",
        "Hemodinamik instabil tamponadda drenaj tanısal testlerden daha önceliklidir."
      ],
      "nextStep": "Monitörizasyon ve geniş damar yolu sağla; Hemodinamik instabilite varsa acil perikardiyosentez yap; Altta yatan perikardiyal efüzyon nedenini stabilizasyon sonrası araştır.",
      "answerFeedback": {
        "diagnosisMeta": "Obstrüktif şok · perikardiyal basınç artışı · acil drenaj",
        "whyCorrect": "Hipotansiyon, juguler venöz dolgunluk, kalp seslerinde azalma, pulsus paradoxus ve ekokardiyografide sağ kalp diyastolik kollapsı birlikte kardiyak tamponad fizyolojisini gösterir.",
        "evidenceChain": [
          "Progresif dispne ve presenkop hemodinamik etkilenmeyi düşündürür.",
          "Juguler venöz dolgunluk ve akciğerlerin görece temiz olması obstrüktif paterni destekler.",
          "Pulsus paradoxus intratorasik basınç değişimlerine duyarlı düşük dolum durumunu gösterir.",
          "Sağ atriyum/sağ ventrikül diyastolik kollapsı ekokardiyografik olarak tamponad lehinedir."
        ],
        "pearls": [
          "Tamponadda en kritik bulgu efüzyon hacminden çok hemodinamik etkidir.",
          "Pozitif basınçlı ventilasyon venöz dönüşü azaltarak tabloyu ağırlaştırabilir.",
          "Hemodinamik instabil tamponadda drenaj tanısal testlerden daha önceliklidir."
        ],
        "management": [
          "Monitörizasyon ve geniş damar yolu sağla",
          "Hemodinamik instabilite varsa acil perikardiyosentez yap",
          "Altta yatan perikardiyal efüzyon nedenini stabilizasyon sonrası araştır"
        ],
        "learningOutcome": "Tamponad tanısında klinik şok paterni ekokardiyografik sağ kalp kollapsı ile birleştirilmelidir.",
        "differentials": {
          "Akut kardiyojenik pulmoner ödem": {
            "explanation": "Pulmoner ödem dispne yapar; ancak bu olguda akciğer alanlarının belirgin temiz olması, venöz dolgunluk ve sağ kalp kollapsı tamponadı öne çıkarır.",
            "comparisonPoints": [
              "Pulmoner ödemde yaygın raller ve oksijenizasyon bozukluğu daha baskındır.",
              "Pulsus paradoxus ve kalp seslerinde derinden gelme tamponad için daha değerlidir.",
              "Ekokardiyografide diyastolik sağ kalp kollapsı pulmoner ödemle açıklanmaz."
            ]
          },
          "Tansiyon pnömotoraks": {
            "explanation": "Tansiyon pnömotoraks da obstrüktif şok yapabilir; ancak tek taraflı solunum sesi kaybı ve trakeal deviasyon yerine perikardiyal efüzyon bulguları vardır.",
            "comparisonPoints": [
              "Tansiyon pnömotoraksta acil iğne dekompresyonu gerekir.",
              "Bu olguda akciğer muayenesi belirgin pnömotoraks paterni göstermemektedir.",
              "Ekokardiyografik efüzyon ve sağ kalp kollapsı tamponad lehinedir."
            ]
          },
          "Septik şok": {
            "explanation": "Septik şok hipotansiyon yapabilir; ancak ateş, enfeksiyon odağı ve vazodilatatuvar şok bulguları yerine perikardiyal basınç artışı bulguları belirleyicidir.",
            "comparisonPoints": [
              "Septik şokta periferik vazodilatasyon ve enfeksiyon belirteçleri ön plandadır.",
              "Juguler venöz dolgunluk ve pulsus paradoxus obstrüktif şok lehinedir.",
              "Tedavide antibiyotik değil acil drenaj önceliklidir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "cv-pulmonary-edema-001",
    "branchId": "cardiovascular",
    "title": "Akut dispne, ortopne ve yaygın bilateral raller",
    "difficulty": "Orta · Kardiyopulmoner acil",
    "clinicalFocus": "Akut dispnede volüm yüklenmesi, hipoksemi, akciğer grafisi ve natriüretik peptid yorumu",
    "demographics": "72 yaşında kadın",
    "setting": "Acil servis",
    "chiefComplaint": "Gece artan nefes darlığı, ortopne ve pembe köpüklü balgam",
    "stem": "Azalmış ejeksiyon fraksiyonlu kalp yetersizliği ve geçirilmiş miyokart enfarktüsü öyküsü olan hasta, üç gündür artan bacak ödemi, ortopne ve paroksismal noktürnal dispne ifade ediyor. Son günlerde tuz alımının arttığı ve diüretik tedavisini düzensiz kullandığı öğreniliyor.",
    "vitals": {
      "TA": "168/96 mmHg",
      "Nabız": "118/dk",
      "Solunum": "30/dk",
      "SpO2": "%86 oda havası",
      "Ateş": "36.8 °C"
    },
    "exam": [
      "Bilateral bazal ve orta zonlara yayılan ince raller duyuluyor",
      "S3 gallop mevcut",
      "Pretibial +2 gode bırakan ödem saptanıyor",
      "Juguler venöz dolgunluk izleniyor"
    ],
    "investigations": [
      {
        "id": "cxr",
        "label": "Akciğer grafisi",
        "type": "xray",
        "summary": "Kardiyomegali, pulmoner vasküler redistribüsyon, Kerley B çizgileri ve bilateral perihiler alveoler-interstisyel opasiteler izleniyor.",
        "findings": [
          "Perihiler alveoler opasiteler ve interstisyel çizgilenme hidrostatik pulmoner ödem ile uyumludur.",
          "Plevral efüzyon kardiyojenik ödem tablosuna eşlik edebilir."
        ]
      },
      {
        "id": "labs",
        "label": "Laboratuvar",
        "type": "lab",
        "rows": [
          [
            "NT-proBNP",
            "6.400 pg/mL",
            "Yaşa göre değişir",
            "Yüksek"
          ],
          [
            "Sodyum",
            "132 mmol/L",
            "135-145 mmol/L",
            "Düşük"
          ],
          [
            "hs-Troponin I",
            "Hafif yüksek",
            "<34 ng/L",
            "Yüksek"
          ]
        ]
      },
      {
        "id": "abg",
        "label": "Arter kan gazı",
        "type": "lab",
        "rows": [
          [
            "pH",
            "7.47",
            "7.35-7.45",
            "Yüksek"
          ],
          [
            "PaO2",
            "56 mmHg",
            "80-100 mmHg",
            "Düşük"
          ],
          [
            "PaCO2",
            "31 mmHg",
            "35-45 mmHg",
            "Düşük"
          ]
        ]
      }
    ],
    "images": [
      {
        "title": "Akciğer grafisi",
        "caption": "İnterstisyel ve alveoler ödem bulguları akut dekompanse kalp yetersizliğini destekler.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Pulmonary%20oedema.jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Pulmonary_oedema.jpg",
        "sourceName": "",
        "license": "CC BY-SA",
        "modality": "xray",
        "relatedFinding": "Kerley B çizgileri ve alveoler ödem"
      }
    ],
    "diagnosis": {
      "correct": "Akut dekompanse kalp yetersizliğine bağlı kardiyojenik pulmoner ödem",
      "options": [
        "Akut dekompanse kalp yetersizliğine bağlı kardiyojenik pulmoner ödem",
        "Akut astım atağı",
        "Pulmoner emboli",
        "Toplum kökenli pnömoni"
      ],
      "explanation": "Ortopne, paroksismal noktürnal dispne, S3, juguler venöz dolgunluk, bilateral raller, yüksek NT-proBNP ve grafide kardiyomegali/perihiler ödem birlikteliği kardiyojenik pulmoner ödemi destekler.",
      "pearls": [
        "Hipertansif akut pulmoner ödemde noninvaziv ventilasyon ve vazodilatör tedavi erken yarar sağlayabilir.",
        "Fokal konsolidasyon ve yüksek ateş yoksa pnömoni daha geri plandadır.",
        "Tedavi oksijenizasyon, preload/afterload azaltılması ve diürez üzerine kurulur."
      ],
      "nextStep": "Oksijen veya noninvaziv ventilasyon ile solunumu destekle; İntravenöz loop diüretiği başla; Kan basıncı uygunsa vazodilatör tedavi ve tetikleyici neden değerlendirmesi yap.",
      "answerFeedback": {
        "diagnosisMeta": "Akut kalp yetersizliği · alveoler ödem · oksijenizasyon önceliği",
        "whyCorrect": "Ortopne, paroksismal noktürnal dispne, S3, juguler venöz dolgunluk, bilateral raller, yüksek NT-proBNP ve grafide kardiyomegali/perihiler ödem birlikteliği kardiyojenik pulmoner ödemi destekler.",
        "evidenceChain": [
          "Gece artan dispne ve ortopne sol kalp dolum basıncı artışını düşündürür.",
          "S3 ve juguler venöz dolgunluk konjestif kalp yetersizliği lehinedir.",
          "Bilateral yaygın raller alveoler/interstisyel ödemle uyumludur.",
          "NT-proBNP yüksekliği ve perihiler ödem paterni kardiyojenik kökeni güçlendirir."
        ],
        "pearls": [
          "Hipertansif akut pulmoner ödemde noninvaziv ventilasyon ve vazodilatör tedavi erken yarar sağlayabilir.",
          "Fokal konsolidasyon ve yüksek ateş yoksa pnömoni daha geri plandadır.",
          "Tedavi oksijenizasyon, preload/afterload azaltılması ve diürez üzerine kurulur."
        ],
        "management": [
          "Oksijen veya noninvaziv ventilasyon ile solunumu destekle",
          "İntravenöz loop diüretiği başla",
          "Kan basıncı uygunsa vazodilatör tedavi ve tetikleyici neden değerlendirmesi yap"
        ],
        "learningOutcome": "Akut kardiyojenik ödemde semptom paterni, S3/JVD ve grafi-laboratuvar uyumu birlikte okunmalıdır.",
        "differentials": {
          "Akut astım atağı": {
            "explanation": "Astım hışıltı ve dispne yapabilir; ancak ortopne, S3, juguler venöz dolgunluk ve kardiyomegali astımdan çok kardiyojenik ödem lehinedir.",
            "comparisonPoints": [
              "Astımda belirgin wheezing ve hava hapsi beklenir.",
              "S3 ve NT-proBNP yüksekliği kalp yetersizliğini destekler.",
              "Tedavi yalnız bronkodilatör değil diürez ve ventilasyon desteği gerektirir."
            ]
          },
          "Pulmoner emboli": {
            "explanation": "Pulmoner emboli ani dispne ve plöritik ağrı ile gelir; bu olguda konjestif semptomlar ve bilateral ödem paterni daha güçlüdür.",
            "comparisonPoints": [
              "PE’de D-dimer/BT pulmoner anjiyografi karar verdirici olabilir.",
              "Perihiler ödem ve kardiyomegali PE için tipik değildir.",
              "Ortopne ve S3 kardiyojenik basınç artışını düşündürür."
            ]
          },
          "Toplum kökenli pnömoni": {
            "explanation": "Pnömoni ateş ve balgamla gelebilir; ancak fokal konsolidasyon, belirgin ateş ve enfeksiyon odağı yerine konjesyon bulguları ön plandadır.",
            "comparisonPoints": [
              "Pnömonide lober konsolidasyon ve enfeksiyon belirteçleri beklenir.",
              "Bilateral raller, S3 ve yüksek NT-proBNP kardiyojenik ödem lehinedir.",
              "İlk yönetim antibiyotik yerine oksijenizasyon ve diürezdir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "cv-hocm-001",
    "branchId": "cardiovascular",
    "title": "Genç sporcuda eforla senkop ve manevra ile değişen sistolik üfürüm",
    "difficulty": "Orta-zor · Kardiyomiyopati",
    "clinicalFocus": "Eforla ilişkili senkopta aile öyküsü, dinamik çıkış yolu obstrüksiyonu ve ani kardiyak ölüm riski",
    "demographics": "22 yaşında erkek",
    "setting": "Spor hekimliği / Kardiyoloji",
    "chiefComplaint": "Basketbol antrenmanı sırasında gelişen kısa süreli senkop",
    "stem": "Yirmi iki yaşındaki erkek hasta son aylarda eforla çarpıntı, göğüste sıkışma ve presenkop yakınmaları olduğunu ifade ediyor. Aile öyküsünde genç yaşta açıklanamayan ani kardiyak ölüm bulunduğu öğreniliyor.",
    "vitals": {
      "TA": "118/72 mmHg",
      "Nabız": "88/dk",
      "Solunum": "14/dk",
      "SpO2": "%99",
      "Ateş": "36.5 °C"
    },
    "exam": [
      "Sol sternal kenarda sistolik ejeksiyon üfürümü duyuluyor",
      "Üfürüm Valsalva manevrası ve ayakta durma ile artıyor, çömelme ile azalıyor",
      "S4 duyulabiliyor",
      "Periferik siyanoz veya kalp yetersizliği bulgusu saptanmıyor"
    ],
    "investigations": [
      {
        "id": "echo",
        "label": "Transtorasik ekokardiyografi",
        "type": "ultrasound",
        "summary": "Asimetrik septal hipertrofi, sistolik anterior mitral kapak hareketi ve dinamik sol ventrikül çıkış yolu gradiyenti saptanıyor.",
        "findings": [
          "Septal kalınlık artışı ve dinamik gradiyent obstrüktif kardiyomiyopati lehinedir.",
          "Preload azalması obstrüksiyonu artırarak üfürüm şiddetini artırır."
        ]
      },
      {
        "id": "ecg",
        "label": "12 derivasyon EKG",
        "type": "ecg",
        "summary": "Sol ventrikül hipertrofisi voltaj kriterleri ve lateral derivasyonlarda repolarizasyon değişiklikleri izleniyor."
      },
      {
        "id": "risk",
        "label": "Ani ölüm risk değerlendirmesi",
        "type": "clinical",
        "summary": "Ailede ani kardiyak ölüm, açıklanamayan senkop, belirgin septal hipertrofi ve ritim bozukluğu varlığı implante edilebilir kardiyoverter defibrilatör açısından değerlendirilmelidir."
      }
    ],
    "images": [
      {
        "title": "Ekokardiyografi ölçümü",
        "caption": "Dinamik çıkış yolu obstrüksiyonu egzersizle senkop ve sistolik üfürümün temel mekanizmasını açıklar.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Hypertrophic%20Cardiomyopathy%20-%20Intraventricular%20Pressure%20Tracing.png",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Hypertrophic_Cardiomyopathy_-_Intraventricular_Pressure_Tracing.png",
        "sourceName": "",
        "license": "CC BY-SA",
        "modality": "lab",
        "relatedFinding": "Dinamik sol ventrikül çıkış yolu gradiyenti"
      }
    ],
    "diagnosis": {
      "correct": "Hipertrofik obstrüktif kardiyomiyopati",
      "options": [
        "Hipertrofik obstrüktif kardiyomiyopati",
        "Aort kapak darlığı",
        "Vazovagal senkop",
        "Atriyal septal defekt"
      ],
      "explanation": "Genç sporcuda eforla senkop, ailede ani ölüm öyküsü, Valsalva ile artan sistolik üfürüm ve ekokardiyografide asimetrik septal hipertrofi hipertrofik obstrüktif kardiyomiyopati için tipik bir örüntüdür.",
      "pearls": [
        "Preload azaltan manevralar HOCM üfürümünü artırır.",
        "Aort darlığında üfürüm karotislere yayılır ve çoğu zaman çömelme ile artar.",
        "Ani ölüm risk değerlendirmesi yalnız semptomla değil aile öyküsü, aritmi ve duvar kalınlığıyla yapılır."
      ],
      "nextStep": "Yoğun rekabetçi egzersizi kısıtla; Beta-bloker tedavi ve ritim riski değerlendirmesi yap; Aile taraması ve ICD endikasyonunu klinik risk skoruna göre belirle.",
      "answerFeedback": {
        "diagnosisMeta": "Dinamik LV çıkış yolu obstrüksiyonu · genç atlet · ani ölüm riski",
        "whyCorrect": "Genç sporcuda eforla senkop, ailede ani ölüm öyküsü, Valsalva ile artan sistolik üfürüm ve ekokardiyografide asimetrik septal hipertrofi hipertrofik obstrüktif kardiyomiyopati için tipik bir örüntüdür.",
        "evidenceChain": [
          "Efor sırasında senkop dinamik obstrüksiyon veya malign aritmi açısından uyarıcıdır.",
          "Ailede ani kardiyak ölüm öyküsü kalıtsal kardiyomiyopati olasılığını artırır.",
          "Valsalva ile üfürüm artışı preload azalınca obstrüksiyonun arttığını gösterir.",
          "Asimetrik septal hipertrofi ekokardiyografik olarak tanıyı destekler."
        ],
        "pearls": [
          "Preload azaltan manevralar HOCM üfürümünü artırır.",
          "Aort darlığında üfürüm karotislere yayılır ve çoğu zaman çömelme ile artar.",
          "Ani ölüm risk değerlendirmesi yalnız semptomla değil aile öyküsü, aritmi ve duvar kalınlığıyla yapılır."
        ],
        "management": [
          "Yoğun rekabetçi egzersizi kısıtla",
          "Beta-bloker tedavi ve ritim riski değerlendirmesi yap",
          "Aile taraması ve ICD endikasyonunu klinik risk skoruna göre belirle"
        ],
        "learningOutcome": "Genç atlet senkobunda manevra ile değişen üfürüm ve aile öyküsü HOCM açısından kritik ipucudur.",
        "differentials": {
          "Aort kapak darlığı": {
            "explanation": "Aort darlığı sistolik üfürüm yapar; ancak genç yaş, Valsalva ile artış ve asimetrik septal hipertrofi HOCM lehinedir.",
            "comparisonPoints": [
              "Aort darlığında üfürüm genellikle karotislere yayılır.",
              "Valsalva HOCM’de üfürümü artırırken aort darlığında çoğunlukla azaltır.",
              "Ekokardiyografide kapak darlığı yerine septal hipertrofi belirleyicidir."
            ]
          },
          "Vazovagal senkop": {
            "explanation": "Vazovagal senkop sık görülür; ancak efor sırasında gelişmesi, ailede ani ölüm ve patolojik üfürüm kardiyak nedeni öne çıkarır.",
            "comparisonPoints": [
              "Vazovagal senkopta prodrom ve tetikleyici durumsal faktörler beklenir.",
              "Efor senkobu benign kabul edilmez.",
              "Ekokardiyografik yapısal kalp hastalığı HOCM lehinedir."
            ]
          },
          "Atriyal septal defekt": {
            "explanation": "ASD üfürüm ve efor yakınması yapabilir; ancak sabit S2 çiftleşmesi ve sağ kalp yüklenmesi yerine dinamik obstrüksiyon bulguları vardır.",
            "comparisonPoints": [
              "ASD’de sabit çift S2 beklenir.",
              "Valsalva ile artan üfürüm ASD için tipik değildir.",
              "Asimetrik septal hipertrofi ASD ile açıklanmaz."
            ]
          }
        }
      }
    }
  },
  {
    "id": "im-dka-001",
    "branchId": "internal-medicine",
    "title": "Tip 1 diyabetli hastada kusma, Kussmaul solunumu ve anyon açıklı metabolik asidoz",
    "difficulty": "Acil · Endokrinoloji",
    "clinicalFocus": "Diyabetik ketoasidozda sıvı açığı, potasyum dengesi, ketonemi ve insülin tedavi sırası",
    "demographics": "19 yaşında kadın",
    "setting": "Acil servis",
    "chiefComplaint": "Kusma, karın ağrısı ve derin-hızlı solunum",
    "stem": "Tip 1 diyabet tanısıyla izlenen hasta, son iki gündür insülin dozlarını atladığını ifade ediyor. Poliüri, polidipsi, halsizlik, bulantı-kusma ve yaygın karın ağrısı yakınmaları olduğu öğreniliyor.",
    "vitals": {
      "TA": "96/60 mmHg",
      "Nabız": "124/dk",
      "Solunum": "30/dk Kussmaul",
      "SpO2": "%98",
      "Ateş": "37.1 °C"
    },
    "exam": [
      "Mukozalar kuru, deri turgoru azalmış",
      "Solunum derin ve hızlı; Kussmaul solunumu ile uyumlu",
      "Nefeste aseton kokusu hissediliyor",
      "Karında yaygın hassasiyet mevcut, defans veya rebound saptanmıyor"
    ],
    "investigations": [
      {
        "id": "blood-gas",
        "label": "Arter kan gazı ve metabolik panel",
        "type": "lab",
        "rows": [
          [
            "pH",
            "7.18",
            "7.35-7.45",
            "Düşük"
          ],
          [
            "HCO3-",
            "8 mmol/L",
            "22-26 mmol/L",
            "Düşük"
          ],
          [
            "Anyon açıklığı",
            "28 mmol/L",
            "8-12 mmol/L",
            "Yüksek"
          ],
          [
            "Glukoz",
            "486 mg/dL",
            "70-100 mg/dL",
            "Yüksek"
          ],
          [
            "Beta-hidroksibutirat",
            "6.2 mmol/L",
            "<0.6 mmol/L",
            "Yüksek"
          ],
          [
            "Potasyum",
            "5.4 mmol/L",
            "3.5-5.1 mmol/L",
            "Yüksek"
          ]
        ]
      },
      {
        "id": "urine",
        "label": "İdrar tetkiki",
        "type": "urine",
        "rows": [
          [
            "Glukoz",
            "Pozitif",
            "Negatif",
            "Pozitif"
          ],
          [
            "Keton",
            "Pozitif",
            "Negatif",
            "Pozitif"
          ],
          [
            "Lökosit/nitrit",
            "Negatif",
            "Negatif",
            "Negatif"
          ]
        ]
      },
      {
        "id": "trigger",
        "label": "Tetikleyici neden araştırması",
        "type": "clinical",
        "summary": "Glukoz 412 mg/dL, keton pozitif; lökosit ve troponin ölçümlerinde eşlik eden tetikleyici lehine belirgin ek bulgu saptanmaz."
      }
    ],
    "images": [
      {
        "title": "Metabolik asidoz şeması",
        "caption": "İnsülin eksikliği lipoliz, ketogenez ve yüksek anyon açıklı metabolik asidoza yol açar.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Diabetic%20Ketoacidosis.png",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Diabetic_Ketoacidosis.png",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "lab",
        "relatedFinding": "Ketogenez ve metabolik asidoz"
      }
    ],
    "diagnosis": {
      "correct": "Diyabetik ketoasidoz",
      "options": [
        "Diyabetik ketoasidoz",
        "Hiperozmolar hiperglisemik durum",
        "Akut apandisit",
        "Laktik asidoz"
      ],
      "explanation": "Tip 1 diyabet öyküsünde kusma, karın ağrısı ve Kussmaul solunumuna hiperglisemi, ketonemi, düşük pH, düşük bikarbonat ve artmış anyon açıklığının eşlik etmesi diyabetik ketoasidoz tanısını destekler.",
      "pearls": [
        "DKA tedavisinde ilk basamak izotonik sıvı replasmanıdır.",
        "İnsülin başlamadan önce potasyum düzeyi güvenli aralıkta olmalıdır.",
        "Asidoz düzelirken hipoglisemi ve hipokalemi açısından yakın izlem gerekir."
      ],
      "nextStep": "İzotonik sıvı replasmanına başla; Serum potasyumuna göre replasman planla; İntravenöz düzenli insülin infüzyonu ve tetikleyici neden tedavisi uygula.",
      "answerFeedback": {
        "diagnosisMeta": "Hiperglisemik kriz · ketozis · yüksek anyon açıklı metabolik asidoz",
        "whyCorrect": "Tip 1 diyabet öyküsünde kusma, karın ağrısı ve Kussmaul solunumuna hiperglisemi, ketonemi, düşük pH, düşük bikarbonat ve artmış anyon açıklığının eşlik etmesi diyabetik ketoasidoz tanısını destekler.",
        "evidenceChain": [
          "Kussmaul solunumu metabolik asidoza solunumsal kompansasyonu gösterir.",
          "Beta-hidroksibutirat yüksekliği keton üretiminin baskın olduğunu gösterir.",
          "Düşük pH ve bikarbonat artmış anyon açıklı metabolik asidozla uyumludur.",
          "Serum potasyumu yüksek görünse bile total vücut potasyumu genellikle azalmıştır."
        ],
        "pearls": [
          "DKA tedavisinde ilk basamak izotonik sıvı replasmanıdır.",
          "İnsülin başlamadan önce potasyum düzeyi güvenli aralıkta olmalıdır.",
          "Asidoz düzelirken hipoglisemi ve hipokalemi açısından yakın izlem gerekir."
        ],
        "management": [
          "İzotonik sıvı replasmanına başla",
          "Serum potasyumuna göre replasman planla",
          "İntravenöz düzenli insülin infüzyonu ve tetikleyici neden tedavisi uygula"
        ],
        "learningOutcome": "DKA tanısı glukozdan çok ketozis + anyon açıklı asidoz kombinasyonuyla kurulur.",
        "differentials": {
          "Hiperozmolar hiperglisemik durum": {
            "explanation": "HHS hiperglisemik krizdir; ancak belirgin ketozis, düşük pH ve Kussmaul solunumu DKA lehinedir.",
            "comparisonPoints": [
              "HHS’de ketozis ve asidoz genellikle hafif ya da yoktur.",
              "DKA daha çok tip 1 diyabet ve hızlı başlangıçla ilişkilidir.",
              "Tedavide sıvı ortak olsa da insülin/potasyum izlemi DKA’da daha kritik hale gelir."
            ]
          },
          "Akut apandisit": {
            "explanation": "Karın ağrısı ve kusma apandisiti düşündürebilir; ancak metabolik asidoz, ketonemi ve Kussmaul solunumu primer cerrahi patolojiden çok DKA’yı gösterir.",
            "comparisonPoints": [
              "Apandisitte lokalize sağ alt kadran bulguları beklenir.",
              "DKA karın ağrısını taklit edebilir.",
              "İlk tedavi cerrahi değil metabolik stabilizasyondur."
            ]
          },
          "Laktik asidoz": {
            "explanation": "Laktik asidoz yüksek anyon açıklı asidoz yapabilir; ancak belirgin ketonemi ve tip 1 diyabet bağlamı DKA lehinedir.",
            "comparisonPoints": [
              "Laktik asidozda laktat yüksekliği ana belirleyicidir.",
              "DKA’da beta-hidroksibutirat baskın ketondur.",
              "Tedavi insülin ve sıvı-protokolüne dayanır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "im-acute-pancreatitis-001",
    "branchId": "internal-medicine",
    "title": "Sırta yayılan epigastrik ağrı ve pankreatik enzim yüksekliği",
    "difficulty": "Orta · Gastroenteroloji",
    "clinicalFocus": "Akut pankreatitte klinik tanı kriterleri, biliyer etiyoloji göstergeleri ve erken destek tedavisi",
    "demographics": "48 yaşında erkek",
    "setting": "Acil servis",
    "chiefComplaint": "Sırta yayılan şiddetli epigastrik ağrı",
    "stem": "Hasta ağrının yağlı yemek sonrasında başladığını, kuşak tarzında sırta yayıldığını ve öne eğilmekle kısmen azaldığını ifade ediyor. Bulantı ve tekrarlayan kusma yakınmaları mevcut.",
    "vitals": {
      "TA": "108/68 mmHg",
      "Nabız": "112/dk",
      "Solunum": "22/dk",
      "SpO2": "%96",
      "Ateş": "37.8 °C"
    },
    "exam": [
      "Epigastriumda belirgin hassasiyet saptanıyor",
      "Defans minimal, rebound izlenmiyor",
      "Bağırsak sesleri azalmış",
      "Skleralarda belirgin ikter saptanmıyor"
    ],
    "investigations": [
      {
        "id": "labs",
        "label": "Pankreatit laboratuvarı",
        "type": "lab",
        "rows": [
          [
            "Lipaz",
            "1.280 U/L",
            "<60 U/L",
            "Yüksek"
          ],
          [
            "Amilaz",
            "410 U/L",
            "<100 U/L",
            "Yüksek"
          ],
          [
            "ALT",
            "186 U/L",
            "<41 U/L",
            "Yüksek"
          ],
          [
            "Kalsiyum",
            "8.0 mg/dL",
            "8.5-10.5 mg/dL",
            "Düşük"
          ]
        ]
      },
      {
        "id": "usg",
        "label": "Hepatobiliyer ultrasonografi",
        "type": "ultrasound",
        "summary": "Safra kesesinde çok sayıda milimetrik taş izleniyor; koledok belirgin dilate değildir."
      },
      {
        "id": "ct",
        "label": "Kontrastlı abdomen BT",
        "type": "ct",
        "summary": "Pankreas çevresi yağlı planlarda inflamasyon ve sınırlı peripankreatik sıvı koleksiyonu izleniyor."
      }
    ],
    "images": [
      {
        "title": "Abdominal BT",
        "caption": "Peripankreatik yağlı dokuda inflamatuvar değişiklikler ve sınırlı sıvı izlenir; organize koleksiyon saptanmaz.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Akute%20exsudative%20Pankreatitis%20-%20CT%20axial.jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Akute_exsudative_Pankreatitis_-_CT_axial.jpg",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "ct",
        "relatedFinding": "Peripankreatik inflamasyon"
      }
    ],
    "diagnosis": {
      "correct": "Akut biliyer pankreatit",
      "options": [
        "Akut biliyer pankreatit",
        "Perfore peptik ülser",
        "Akut inferior miyokart enfarktüsü",
        "Mezenter iskemi"
      ],
      "explanation": "Sırta yayılan epigastrik ağrıya lipazın üst sınırın üç katından fazla yükselmesi ve görüntüleme bulgularının eşlik etmesi akut pankreatit tanısını karşılar; ALT yüksekliği ve safra taşı biliyer nedeni öne çıkarır.",
      "pearls": [
        "Akut pankreatit tanısı için ağrı, enzim yüksekliği ve görüntülemeden ikisinin bulunması yeterlidir.",
        "Biliyer pankreatitte kolesistektomi aynı yatışta planlanmalıdır.",
        "ERCP kolanjit veya devam eden biliyer obstrüksiyon varlığında öncelik kazanır."
      ],
      "nextStep": "Erken intravenöz sıvı ve analjezi başla; Oral alımı klinik toleransa göre düzenle; Biliyer neden için aynı yatışta kolesistektomi planla.",
      "answerFeedback": {
        "diagnosisMeta": "Akut pankreatit · biliyer etiyoloji · erken destek tedavisi",
        "whyCorrect": "Sırta yayılan epigastrik ağrıya lipazın üst sınırın üç katından fazla yükselmesi ve görüntüleme bulgularının eşlik etmesi akut pankreatit tanısını karşılar; ALT yüksekliği ve safra taşı biliyer nedeni öne çıkarır.",
        "evidenceChain": [
          "Epigastrik ağrının sırta yayılması pankreatik ağrı paterniyle uyumludur.",
          "Lipaz yüksekliği pankreatit tanısında amilaza göre daha özgül kabul edilir.",
          "Safra kesesi taşı ve ALT yüksekliği biliyer etiyolojiyi destekler.",
          "Kolanjit veya persistan obstrüksiyon yoksa acil ERCP her hastada ilk basamak değildir."
        ],
        "pearls": [
          "Akut pankreatit tanısı için ağrı, enzim yüksekliği ve görüntülemeden ikisinin bulunması yeterlidir.",
          "Biliyer pankreatitte kolesistektomi aynı yatışta planlanmalıdır.",
          "ERCP kolanjit veya devam eden biliyer obstrüksiyon varlığında öncelik kazanır."
        ],
        "management": [
          "Erken intravenöz sıvı ve analjezi başla",
          "Oral alımı klinik toleransa göre düzenle",
          "Biliyer neden için aynı yatışta kolesistektomi planla"
        ],
        "learningOutcome": "Akut pankreatitte tanı kriterleri ve biliyer etiyoloji işaretleri ayrı ayrı değerlendirilmelidir.",
        "differentials": {
          "Perfore peptik ülser": {
            "explanation": "Perfore ülser ani şiddetli karın ağrısı yapabilir; ancak pankreatik enzim yüksekliği ve safra taşı-biliyer bulgular pankreatiti öne çıkarır.",
            "comparisonPoints": [
              "Perforasyonda subdiyafragmatik serbest hava beklenir.",
              "Pankreatitte ağrı tipik olarak sırta yayılır.",
              "İlk yaklaşım cerrahi eksplorasyon değil destek tedavisi ve etiyoloji yönetimidir."
            ]
          },
          "Akut inferior miyokart enfarktüsü": {
            "explanation": "İnferior MI epigastrik ağrı ve bulantıyla gelebilir; ancak lipaz yüksekliği ve pankreatit görüntüleme bulguları abdominal nedeni destekler.",
            "comparisonPoints": [
              "MI ayırımı için EKG ve troponin değerlendirilir.",
              "Bu olguda biliyer taş varlığı etiyolojik ipucudur.",
              "Ağrı-görüntüleme-enzim üçlüsü pankreatit tanısını güçlendirir."
            ]
          },
          "Mezenter iskemi": {
            "explanation": "Mezenter iskemi şiddetli karın ağrısı yapabilir; ancak vasküler risk, laktat yüksekliği ve bağırsak iskemi bulguları yerine pankreatik kriterler ön plandadır.",
            "comparisonPoints": [
              "Mezenter iskemide ağrı muayene bulgusuna göre orantısız olabilir.",
              "BT anjiyografi ve laktat daha belirleyicidir.",
              "Safra taşı ve lipaz yüksekliği biliyer pankreatit lehinedir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "im-variceal-bleeding-001",
    "branchId": "internal-medicine",
    "title": "Sirozlu hastada hematemez, melena ve hipovolemik bulgular",
    "difficulty": "Acil · Gastrointestinal kanama",
    "clinicalFocus": "Portal hipertansiyon zemininde üst gastrointestinal kanama, resüsitasyon, vasoaktif tedavi ve endoskopik bant ligasyonu",
    "demographics": "55 yaşında erkek",
    "setting": "Acil servis",
    "chiefComplaint": "Bol miktarda kan kusma ve baş dönmesi",
    "stem": "Alkole bağlı siroz tanısıyla izlenen hasta ani başlayan hematemez ve melena nedeniyle acil servise getiriliyor. Daha önce asit nedeniyle tedavi aldığı, son günlerde halsizlik ve iştahsızlığının arttığı öğreniliyor.",
    "vitals": {
      "TA": "88/54 mmHg",
      "Nabız": "132/dk",
      "Solunum": "24/dk",
      "SpO2": "%96",
      "Ateş": "36.9 °C"
    },
    "exam": [
      "Hasta soluk, soğuk terli ve ortostatik semptomatik görünüyor",
      "Palmar eritem ve spider anjiyomlar izleniyor",
      "Splenomegali ve asit bulguları mevcut",
      "Rektal muayenede melena saptanıyor"
    ],
    "investigations": [
      {
        "id": "cbc",
        "label": "Hemogram ve koagülasyon",
        "type": "lab",
        "rows": [
          [
            "Hemoglobin",
            "7.8 g/dL",
            "13.5-17.5 g/dL",
            "Düşük"
          ],
          [
            "Trombosit",
            "72.000/mm³",
            "150.000-400.000/mm³",
            "Düşük"
          ],
          [
            "INR",
            "1.9",
            "0.8-1.2",
            "Yüksek"
          ]
        ]
      },
      {
        "id": "endoscopy",
        "label": "Üst gastrointestinal sistem endoskopisi",
        "type": "endoscopy",
        "summary": "Distal özofagusta geniş variköz venler ve aktif kanama odağı izleniyor; endoskopik bant ligasyonu için uygundur."
      },
      {
        "id": "initial",
        "label": "Acil yaklaşım",
        "type": "management",
        "summary": "İki geniş damar yolu, eritrosit süspansiyonu hazırlığı, vasoaktif tedavi ve antibiyotik profilaksisi endoskopi öncesi başlatılır."
      }
    ],
    "images": [
      {
        "title": "Üst gastrointestinal endoskopi",
        "caption": "Aktif varis kanaması portal hipertansiyon zemininde masif hematemezin önemli nedenidir.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Bleeding%20esophageal%20varices.png",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Bleeding_esophageal_varices.png",
        "sourceName": "",
        "license": "CC BY-SA",
        "modality": "endoscopy",
        "relatedFinding": "Kanayan özofageal varis"
      }
    ],
    "diagnosis": {
      "correct": "Özofagus varis kanaması",
      "options": [
        "Özofagus varis kanaması",
        "Mallory-Weiss yırtığı",
        "Eroziv gastrit",
        "Kolon divertikül kanaması"
      ],
      "explanation": "Siroz ve portal hipertansiyon bulguları olan hastada masif hematemez, melena, hipovolemik bulgular ve endoskopide aktif özofageal varis kanaması izlenmesi tanıyı doğrudan destekler.",
      "pearls": [
        "Varis kanamasında antibiyotik profilaksisi enfeksiyon ve mortaliteyi azaltır.",
        "Vazoaktif tedavi endoskopi beklenirken başlanır.",
        "Aşırı transfüzyon portal basıncı artırabileceği için hedef hemoglobin genellikle kısıtlı tutulur."
      ],
      "nextStep": "Havayolu ve dolaşımı stabilize et; Vazoaktif tedavi ve seftriakson profilaksisi başla; Erken üst GİS endoskopisiyle bant ligasyonu uygula.",
      "answerFeedback": {
        "diagnosisMeta": "Portal hipertansiyon · üst GİS kanama · endoskopik tedavi",
        "whyCorrect": "Siroz ve portal hipertansiyon bulguları olan hastada masif hematemez, melena, hipovolemik bulgular ve endoskopide aktif özofageal varis kanaması izlenmesi tanıyı doğrudan destekler.",
        "evidenceChain": [
          "Siroz öyküsü varis kanaması için temel risk bağlamını oluşturur.",
          "Hematemez ve melena üst gastrointestinal kanama lehinedir.",
          "Hipotansiyon/taşikardi kanama şiddetini gösterir.",
          "Endoskopide distal özofageal varislerden aktif kanama görülmesi tanısaldır."
        ],
        "pearls": [
          "Varis kanamasında antibiyotik profilaksisi enfeksiyon ve mortaliteyi azaltır.",
          "Vazoaktif tedavi endoskopi beklenirken başlanır.",
          "Aşırı transfüzyon portal basıncı artırabileceği için hedef hemoglobin genellikle kısıtlı tutulur."
        ],
        "management": [
          "Havayolu ve dolaşımı stabilize et",
          "Vazoaktif tedavi ve seftriakson profilaksisi başla",
          "Erken üst GİS endoskopisiyle bant ligasyonu uygula"
        ],
        "learningOutcome": "Sirozlu hastada masif hematemez varis kanaması kabul edilerek resüsitasyon + vazoaktif tedavi + endoskopi üçlüsü planlanır.",
        "differentials": {
          "Mallory-Weiss yırtığı": {
            "explanation": "Mallory-Weiss hematemez yapabilir; ancak genellikle kusma/öğürme sonrası mukozal yırtık olur, portal hipertansiyon ve büyük varis paterni beklenmez.",
            "comparisonPoints": [
              "Bu olguda siroz ve varis doğrudan risk oluşturur.",
              "Endoskopide aktif varis kanaması görülmesi Mallory-Weiss’i dışlar.",
              "Tedavi bant ligasyonu ve vazoaktif tedavidir."
            ]
          },
          "Eroziv gastrit": {
            "explanation": "Eroziv gastrit üst GİS kanaması yapabilir; ancak masif kanama ve endoskopik varis kaynağı bu seçeneği geri plana iter.",
            "comparisonPoints": [
              "Eroziv gastritte yaygın mukozal erozyon beklenir.",
              "Portal hipertansiyon bulguları varis kanamasını öne çıkarır.",
              "Seftriakson ve vazoaktif ajan kullanımı varis kanamasına özgü önem taşır."
            ]
          },
          "Kolon divertikül kanaması": {
            "explanation": "Divertikül kanaması alt GİS kanamasıdır ve genellikle hematokezya ile gelir; hematemez bu tanıya uymaz.",
            "comparisonPoints": [
              "Hematemez üst GİS kaynağını gösterir.",
              "Melena üst GİS kanama ile uyumludur.",
              "Endoskopik bulgu özofageal varis kanamasını göstermektedir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "im-iron-deficiency-anemia-001",
    "branchId": "internal-medicine",
    "title": "Mikrositer-hipokrom anemi ve pika yakınması",
    "difficulty": "Temel-orta · Hematoloji",
    "clinicalFocus": "Demir eksikliği anemisinde eritrosit indeksleri, demir çalışmaları ve kanama kaynağı araştırması",
    "demographics": "42 yaşında kadın",
    "setting": "Dahiliye polikliniği",
    "chiefComplaint": "Halsizlik, eforla nefes darlığı ve buz yeme isteği",
    "stem": "Hasta son altı aydır giderek artan yorgunluk, saç dökülmesi, çarpıntı ve pika yakınmaları olduğunu ifade ediyor. Menstrüasyonlarının uzun sürdüğü ve kanama miktarının arttığı öğreniliyor.",
    "vitals": {
      "TA": "110/70 mmHg",
      "Nabız": "96/dk",
      "Solunum": "16/dk",
      "SpO2": "%98",
      "Ateş": "36.5 °C"
    },
    "exam": [
      "Konjonktival solukluk belirgin",
      "Koilonişi izleniyor",
      "Taşikardi dışında kardiyopulmoner patoloji saptanmıyor",
      "Hepatosplenomegali yok"
    ],
    "investigations": [
      {
        "id": "cbc",
        "label": "Hemogram ve demir çalışmaları",
        "type": "lab",
        "rows": [
          [
            "Hemoglobin",
            "8.9 g/dL",
            "12-16 g/dL",
            "Düşük"
          ],
          [
            "MCV",
            "66 fL",
            "80-100 fL",
            "Düşük"
          ],
          [
            "RDW",
            "%19",
            "%11.5-14.5",
            "Yüksek"
          ],
          [
            "Ferritin",
            "6 ng/mL",
            "15-150 ng/mL",
            "Düşük"
          ],
          [
            "Total demir bağlama kapasitesi",
            "Yüksek",
            "Değişken",
            "Yüksek"
          ]
        ]
      },
      {
        "id": "smear",
        "label": "Periferik yayma",
        "type": "microscopy",
        "summary": "Mikrositer ve hipokrom eritrositler, belirgin anizositoz ve poikilositoz izleniyor."
      },
      {
        "id": "etiology",
        "label": "Etiyoloji değerlendirmesi",
        "type": "clinical",
        "summary": "Premenopozal hastada jinekolojik kanama sık nedenlerden biridir; alarm bulgusu veya risk faktörü varsa gastrointestinal kanama da araştırılır."
      }
    ],
    "images": [
      {
        "title": "Periferik yayma",
        "caption": "Mikrositoz ve hipokromi eritrosit indeksleriyle birlikte demir eksikliğini destekler.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Iron%20deficiency%20anemia%20blood%20film.jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Iron_deficiency_anemia_blood_film.jpg",
        "sourceName": "",
        "license": "CC BY-SA",
        "modality": "microscopy",
        "relatedFinding": "Mikrositer hipokrom eritrositler"
      }
    ],
    "diagnosis": {
      "correct": "Demir eksikliği anemisi",
      "options": [
        "Demir eksikliği anemisi",
        "Beta talasemi taşıyıcılığı",
        "Kronik hastalık anemisi",
        "Megaloblastik anemi"
      ],
      "explanation": "Mikrositoz, hipokromi, yüksek RDW, düşük ferritin ve yüksek total demir bağlama kapasitesi demir eksikliği anemisiyle uyumludur; erişkinde kronik kan kaybı kaynağı mutlaka araştırılmalıdır.",
      "pearls": [
        "Talasemi taşıyıcılığında eritrosit sayısı görece yüksek olabilir ve RDW çoğu zaman belirgin artmaz.",
        "Kronik hastalık anemisinde ferritin normal/yüksek, TDBK düşük olabilir.",
        "Erişkin erkek ve postmenopozal kadında gastrointestinal kanama dışlanmalıdır."
      ],
      "nextStep": "Kanama kaynağı açısından gastrointestinal değerlendirme planla; Oral veya gerekli ise intravenöz demir replasmanı başla; Retikülosit ve hemoglobin yanıtını takip et.",
      "answerFeedback": {
        "diagnosisMeta": "Mikrositer anemi · düşük ferritin · kronik kan kaybı araştırması",
        "whyCorrect": "Mikrositoz, hipokromi, yüksek RDW, düşük ferritin ve yüksek total demir bağlama kapasitesi demir eksikliği anemisiyle uyumludur; erişkinde kronik kan kaybı kaynağı mutlaka araştırılmalıdır.",
        "evidenceChain": [
          "Pika yakınması demir eksikliğinde sık görülen destekleyici semptomdur.",
          "Düşük ferritin demir depolarının azaldığını gösterir.",
          "Yüksek TDBK transferrin artışını ve demir eksikliğini destekler.",
          "RDW yüksekliği farklı boyutta eritrositlerin arttığını gösterir."
        ],
        "pearls": [
          "Talasemi taşıyıcılığında eritrosit sayısı görece yüksek olabilir ve RDW çoğu zaman belirgin artmaz.",
          "Kronik hastalık anemisinde ferritin normal/yüksek, TDBK düşük olabilir.",
          "Erişkin erkek ve postmenopozal kadında gastrointestinal kanama dışlanmalıdır."
        ],
        "management": [
          "Kanama kaynağı açısından gastrointestinal değerlendirme planla",
          "Oral veya gerekli ise intravenöz demir replasmanı başla",
          "Retikülosit ve hemoglobin yanıtını takip et"
        ],
        "learningOutcome": "Demir eksikliği tanısında ferritin ve TDBK paterni, mikrositozdan daha karar verdirici olabilir.",
        "differentials": {
          "Beta talasemi taşıyıcılığı": {
            "explanation": "Talasemi mikrositoz yapar; ancak düşük ferritin, yüksek TDBK ve pika demir eksikliğini daha olası kılar.",
            "comparisonPoints": [
              "Talasemide eritrosit sayısı mikrositoza rağmen yüksek olabilir.",
              "RDW demir eksikliğinde daha belirgin artma eğilimindedir.",
              "Ferritin düşüklüğü talasemi taşıyıcılığını açıklamaz."
            ]
          },
          "Kronik hastalık anemisi": {
            "explanation": "Kronik inflamasyon anemisi mikrositer olabilir; ancak ferritin düşüklüğü ve TDBK yüksekliği klasik demir eksikliği yönündedir.",
            "comparisonPoints": [
              "Kronik hastalık anemisinde ferritin inflamasyon nedeniyle normal veya yüksek olabilir.",
              "TDBK genellikle düşüktür veya normaldir.",
              "Pika ve belirgin depo demiri azalması demir eksikliğini destekler."
            ]
          },
          "Megaloblastik anemi": {
            "explanation": "Megaloblastik anemi makrositozla seyreder; burada mikrositer-hipokrom patern ve demir çalışmaları farklı bir mekanizma gösterir.",
            "comparisonPoints": [
              "B12/folat eksikliğinde MCV artışı beklenir.",
              "Hipersegmentasyon gibi megaloblastik bulgular ön planda değildir.",
              "Tedavi demir replasmanı ve kanama kaynağı araştırmasıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "im-primary-hyperparathyroidism-001",
    "branchId": "internal-medicine",
    "title": "Hiperkalsemi, nefrolitiyazis ve uygunsuz yüksek PTH",
    "difficulty": "Orta · Endokrinoloji",
    "clinicalFocus": "Hiperkalsemi ayırıcı tanısında PTH yorumu, fosfor düzeyi, hiperkalsiüri ve cerrahi endikasyonlar",
    "demographics": "60 yaşında kadın",
    "setting": "Dahiliye polikliniği",
    "chiefComplaint": "Tekrarlayan böbrek taşı, kabızlık ve halsizlik",
    "stem": "Hasta son bir yıl içinde iki kez renal kolik atağı geçirdiğini ifade ediyor. Kabızlık, yaygın kemik ağrısı, halsizlik ve hafif depresif duygu durum yakınmaları olduğu öğreniliyor.",
    "vitals": {
      "TA": "136/82 mmHg",
      "Nabız": "82/dk",
      "Solunum": "14/dk",
      "SpO2": "%98",
      "Ateş": "36.6 °C"
    },
    "exam": [
      "Dehidratasyon bulgusu belirgin değil",
      "Fokal nörolojik defisit saptanmıyor",
      "Kemik palpasyonunda yaygın olmayan hassasiyet mevcut",
      "Boyunda palpabl kitle saptanmıyor"
    ],
    "investigations": [
      {
        "id": "chemistry",
        "label": "Kalsiyum-PTH profili",
        "type": "lab",
        "rows": [
          [
            "Düzeltilmiş kalsiyum",
            "11.8 mg/dL",
            "8.5-10.5 mg/dL",
            "Yüksek"
          ],
          [
            "Fosfor",
            "2.1 mg/dL",
            "2.5-4.5 mg/dL",
            "Düşük"
          ],
          [
            "PTH",
            "146 pg/mL",
            "15-65 pg/mL",
            "Yüksek"
          ],
          [
            "25-OH D vitamini",
            "28 ng/mL",
            "20-50 ng/mL",
            "Referans içinde"
          ]
        ]
      },
      {
        "id": "urine",
        "label": "24 saatlik idrar değerlendirmesi",
        "type": "lab",
        "rows": [
          [
            "İdrar kalsiyumu",
            "Yüksek",
            "Değişken",
            "Yüksek"
          ],
          [
            "Kreatinin klirensi",
            "Normal",
            "Yaşa göre",
            "Referans içinde"
          ]
        ]
      },
      {
        "id": "imaging",
        "label": "Paratiroid lokalizasyon incelemesi",
        "type": "nuclear",
        "summary": "Sestamibi görüntülemede inferior paratiroid lojunda fokal tutulum artışı izlenir."
      }
    ],
    "images": [
      {
        "title": "Histoloji preparatı",
        "caption": "Primer hiperparatiroidinin sık nedeni paratiroid adenomudur; tanı öncelikle biyokimyasal paternle konur.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Parathyroid%20adenoma%2C%20mixed%20type%20--%20very%20high%20mag.jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Parathyroid_adenoma%2C_mixed_type_--_very_high_mag.jpg",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "pathology",
        "relatedFinding": "Paratiroid adenom dokusu"
      }
    ],
    "diagnosis": {
      "correct": "Primer hiperparatiroidi",
      "options": [
        "Primer hiperparatiroidi",
        "Maligniteye bağlı hiperkalsemi",
        "Ailesel hipokalsiürik hiperkalsemi",
        "D vitamini intoksikasyonu"
      ],
      "explanation": "Hiperkalsemiye rağmen PTH düzeyinin baskılanmamış ve yüksek kalması PTH aracılı hiperkalsemiyi gösterir; nefrolitiyazis, hiperkalsiüri ve hipofosfatemi primer hiperparatiroidiyi destekler.",
      "pearls": [
        "Sestamibi sintigrafisi tanı koydurmaz; preoperatif lokalizasyon içindir.",
        "Ailesel hipokalsiürik hiperkalsemide idrar kalsiyumu düşük olur.",
        "Semptomatik taş öyküsü cerrahi değerlendirme için güçlü endikasyondur."
      ],
      "nextStep": "Cerrahi endikasyonları değerlendir; Paratiroid lokalizasyonu için uygun görüntüleme planla; Hidrasyon, böbrek fonksiyonu ve kemik mineral yoğunluğunu izle.",
      "answerFeedback": {
        "diagnosisMeta": "PTH aracılı hiperkalsemi · nefrolitiyazis · cerrahi endikasyon değerlendirmesi",
        "whyCorrect": "Hiperkalsemiye rağmen PTH düzeyinin baskılanmamış ve yüksek kalması PTH aracılı hiperkalsemiyi gösterir; nefrolitiyazis, hiperkalsiüri ve hipofosfatemi primer hiperparatiroidiyi destekler.",
        "evidenceChain": [
          "Tekrarlayan böbrek taşı hiperkalsiürinin klinik sonucudur.",
          "Serum kalsiyumu yüksekken PTH’nin yüksek olması uygunsuzdur.",
          "Hipofosfatemi PTH etkisiyle renal fosfat atılımını düşündürür.",
          "Maligniteye bağlı hiperkalsemide PTH genellikle baskılı beklenir."
        ],
        "pearls": [
          "Sestamibi sintigrafisi tanı koydurmaz; preoperatif lokalizasyon içindir.",
          "Ailesel hipokalsiürik hiperkalsemide idrar kalsiyumu düşük olur.",
          "Semptomatik taş öyküsü cerrahi değerlendirme için güçlü endikasyondur."
        ],
        "management": [
          "Cerrahi endikasyonları değerlendir",
          "Paratiroid lokalizasyonu için uygun görüntüleme planla",
          "Hidrasyon, böbrek fonksiyonu ve kemik mineral yoğunluğunu izle"
        ],
        "learningOutcome": "Hiperkalsemide ilk ayrım PTH baskılı mı, uygunsuz yüksek mi sorusudur.",
        "differentials": {
          "Maligniteye bağlı hiperkalsemi": {
            "explanation": "Malignite hiperkalsemi yapabilir; ancak PTH’nin yüksek olması maligniteye bağlı PTHrP aracılı hiperkalsemiden çok primer hiperparatiroidiyi gösterir.",
            "comparisonPoints": [
              "Malignite hiperkalsemisinde PTH baskılı beklenir.",
              "Hipofosfatemi ve nefrolitiyazis PTH etkisini destekler.",
              "Tedavi yaklaşımı paratiroid odaklıdır."
            ]
          },
          "Ailesel hipokalsiürik hiperkalsemi": {
            "explanation": "FHH hiperkalsemi ve normal/yüksek PTH yapabilir; ancak idrar kalsiyumunun yüksek olması ve taş öyküsü primer hiperparatiroidiyi öne çıkarır.",
            "comparisonPoints": [
              "FHH’de idrar kalsiyumu düşük beklenir.",
              "FHH genellikle benign ve cerrahi gerektirmeyen bir tablodur.",
              "Nefrolitiyazis primer hiperparatiroidide daha anlamlıdır."
            ]
          },
          "D vitamini intoksikasyonu": {
            "explanation": "D vitamini intoksikasyonu hiperkalsemi yapar; ancak PTH bu durumda baskılanmalıdır.",
            "comparisonPoints": [
              "D vitamini fazlalığında fosfat yüksekliği görülebilir.",
              "PTH yüksekliği PTH aracılı etiyolojiye yönlendirir.",
              "Nefrolitiyazis ve hiperkalsiüri PTH fazlalığıyla uyumludur."
            ]
          }
        }
      }
    }
  },
  {
    "id": "neuro-mca-stroke-001",
    "branchId": "neurology",
    "title": "Ani afazi, sağ hemiparezi ve akut inme değerlendirmesi",
    "difficulty": "Acil · Nöroloji",
    "clinicalFocus": "Akut iskemik inmede son sağlıklı görülme zamanı, damar sulama alanı lokalizasyonu ve reperfüzyon uygunluğu",
    "demographics": "70 yaşında erkek",
    "setting": "İnme merkezi acili",
    "chiefComplaint": "Konuşma bozukluğu ve sağ taraf güçsüzlüğü",
    "stem": "Hasta yakınları, hastanın 70 dakika önce son kez normal görüldüğünü; ardından ani konuşma bozukluğu, sağ kol ve bacakta güç kaybı ve bakış deviasyonu geliştiğini belirtiyor. Antikoagülan kullanım öyküsü olmadığı öğreniliyor.",
    "vitals": {
      "TA": "172/96 mmHg",
      "Nabız": "92/dk düzensiz",
      "Solunum": "18/dk",
      "SpO2": "%97",
      "Ateş": "36.8 °C"
    },
    "exam": [
      "Bilinç açık, ancak ekspresif afazi belirgin",
      "Sağ üst ve alt ekstremitede santral tip güç kaybı saptanıyor",
      "Sağ santral fasiyal paralizi mevcut",
      "Sol tarafa bakış tercihi izleniyor"
    ],
    "investigations": [
      {
        "id": "noncontrast-ct",
        "label": "Kontrastsız beyin BT",
        "type": "ct",
        "summary": "Akut intrakraniyal kanama saptanmıyor; erken iskemik değişiklikler açısından değerlendirme sınırlıdır."
      },
      {
        "id": "cta",
        "label": "BT anjiyografi",
        "type": "ct",
        "summary": "Sol orta serebral arter proksimal segmentinde damar dolum kesintisi izleniyor."
      },
      {
        "id": "labs",
        "label": "Acil laboratuvar",
        "type": "lab",
        "rows": [
          [
            "Glukoz",
            "118 mg/dL",
            "70-100 mg/dL",
            "Yüksek"
          ],
          [
            "Trombosit",
            "240.000/mm³",
            "150.000-400.000/mm³",
            "Referans içinde"
          ],
          [
            "INR",
            "1.0",
            "0.8-1.2",
            "Referans içinde"
          ]
        ]
      }
    ],
    "images": [
      {
        "title": "Kraniyal BT",
        "caption": "MCA sulama alanındaki hipodansite ve kortikal tutulum vasküler lokalizasyonu destekler.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/CT%20Brain%20MCA%20Infarct.jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:CT_Brain_MCA_Infarct.jpg",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "ct",
        "relatedFinding": "MCA sulama alanı enfarktı"
      }
    ],
    "diagnosis": {
      "correct": "Sol orta serebral arter oklüzyonuna bağlı akut iskemik inme",
      "options": [
        "Sol orta serebral arter oklüzyonuna bağlı akut iskemik inme",
        "Todd paralizisi",
        "İntraserebral hemoraji",
        "Migren aurası"
      ],
      "explanation": "Ani afazi ve sağ hemiparezi ile BT anjiyografide sol orta serebral arter oklüzyonunun birlikte bulunması akut iskemik inme tanısını destekler; tedavi kararı son sağlıklı görülme zamanı ve görüntüleme ile şekillenir.",
      "pearls": [
        "Son sağlıklı görülme zamanı tromboliz ve trombektomi kararında kritiktir.",
        "Kontrastsız BT kanamayı dışlamak için ilk basamaktır.",
        "Glukoz bozukluğu inme taklitçisi olabileceği için hızlı değerlendirilmelidir."
      ],
      "nextStep": "Kontrastsız beyin BT ile kanamayı dışla; Uygunsa intravenöz tromboliz değerlendir; Büyük damar oklüzyonunda mekanik trombektomi algoritmasına geç.",
      "answerFeedback": {
        "diagnosisMeta": "Akut inme · büyük damar oklüzyonu · reperfüzyon penceresi",
        "whyCorrect": "Ani başlayan afazi ve sağ hemiparezi kortikal damar sulama alanına uyan fokal nörolojik defisit oluşturur. Kanamanın dışlanması ve BT anjiyografide büyük damar oklüzyonunun gösterilmesi iskemik inme tanısını destekler.",
        "evidenceChain": [
          "Ani başlayan konuşma bozukluğu ve sağ taraf güçsüzlüğü fokal nörolojik defisit tablosu oluşturur.",
          "Ekspresif afazi dominant hemisfer kortikal tutulumuyla uyumludur.",
          "Kontrastsız beyin BT’de kanama saptanmaması hemorajiyi geri plana iter.",
          "BT anjiyografide sol MCA proksimal segmentinde dolum kesintisi büyük damar oklüzyonunu gösterir."
        ],
        "pearls": [
          "Son sağlıklı görülme zamanı reperfüzyon kararının temel belirleyicisidir.",
          "Hipoglisemi ve elektrolit bozuklukları inme taklitçisi olabilir.",
          "Kanama dışlandıktan sonra damar oklüzyonu reperfüzyon stratejisini belirler."
        ],
        "management": [
          "Son sağlıklı görülme zamanını netleştir",
          "Kontrendikasyon yoksa intravenöz tromboliz uygunluğunu değerlendir",
          "Büyük damar oklüzyonu varsa mekanik trombektomi algoritmasını başlat"
        ],
        "missingTests": [
          "Parmak ucu glukoz ve temel elektrolitler",
          "Kontrastsız beyin BT",
          "BT anjiyografi"
        ],
        "idealTestSequence": [
          "Parmak ucu glukoz ve temel elektrolitler",
          "Kontrastsız beyin BT",
          "BT anjiyografi",
          "Reperfüzyon uygunluğu değerlendirmesi"
        ],
        "learningOutcome": "Ani afazi ve sağ hemiparezi ile BT anjiyografide sol orta serebral arter oklüzyonunun birlikte bulunması akut iskemik inme tanısını destekler.",
        "differentials": {
          "Todd paralizisi": {
            "explanation": "Todd paralizisi nöbet sonrasında geçici güçsüzlük yapabilir. Bu olguda nöbet öyküsünün olmaması, kortikal bulguların damar alanıyla uyumlu olması ve BT anjiyografide oklüzyon saptanması iskemik inmeyi öne çıkarır.",
            "comparisonPoints": [
              "Nöbet sonrası postiktal dönem tariflenmemiştir.",
              "Afazi ve hemiparezi sol hemisfer damar dağılımına uyar.",
              "BT anjiyografide büyük damar oklüzyonu gösterilmiştir."
            ]
          },
          "İntraserebral hemoraji": {
            "explanation": "İntraserebral hemoraji akut fokal nörolojik defisit tablosunda ayırıcı tanıda düşünülür. Ancak kontrastsız BT’de kanama saptanmaması ve damar görüntülemede büyük damar oklüzyonunun gösterilmesi iskemik süreç lehinedir.",
            "comparisonPoints": [
              "Hemoraji akut nörolojik defisit ile başvurabilir.",
              "Kontrastsız BT’de kanama saptanmaması hemorajiyi geri plana iter.",
              "BT anjiyografide sol MCA oklüzyonunun gösterilmesi iskemik süreci destekler.",
              "Yönetim bu nedenle reperfüzyon uygunluğunun değerlendirilmesine yönelir."
            ]
          },
          "Migren aurası": {
            "explanation": "Migren aurası geçici ve genellikle kademeli ilerleyen nörolojik semptomlarla gidebilir. Bu olguda ani başlangıçlı afazi, hemiparezi ve BT anjiyografide damar oklüzyonu saptanması vasküler acil tabloyu destekler.",
            "comparisonPoints": [
              "Semptom başlangıcı ani ve fokal defisit belirgindir.",
              "Kalıcı motor defisit migren aurası için tipik değildir.",
              "Damar görüntülemede oklüzyon gösterilmiştir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "neuro-sah-001",
    "branchId": "neurology",
    "title": "Ani başlangıçlı en şiddetli baş ağrısı ve meningeal irritasyon",
    "difficulty": "Acil · Nörovasküler",
    "clinicalFocus": "Thunderclap baş ağrısında subaraknoid kanama, kontrastsız BT, lomber ponksiyon ve anevrizma araştırması",
    "demographics": "52 yaşında kadın",
    "setting": "Acil servis",
    "chiefComplaint": "Saniyeler içinde maksimum şiddete ulaşan baş ağrısı",
    "stem": "Hasta baş ağrısının aniden başladığını, daha önce yaşadığı baş ağrılarından tamamen farklı olduğunu ve saniyeler içinde en yüksek şiddete ulaştığını ifade ediyor. Kusma ve fotofobi eşlik ediyor; polikistik böbrek hastalığı öyküsü mevcut.",
    "vitals": {
      "TA": "178/102 mmHg",
      "Nabız": "98/dk",
      "Solunum": "18/dk",
      "SpO2": "%98",
      "Ateş": "36.9 °C"
    },
    "exam": [
      "Ense sertliği mevcut",
      "Fotofobi belirgin",
      "Bilinç dalgalanması izleniyor",
      "Fokal motor defisit saptanmıyor"
    ],
    "investigations": [
      {
        "id": "ct",
        "label": "Kontrastsız beyin BT",
        "type": "ct",
        "summary": "Bazal sisternalarda ve sulkuslarda hiperdens kan ile uyumlu görünüm izleniyor."
      },
      {
        "id": "cta",
        "label": "BT anjiyografi",
        "type": "ct",
        "summary": "Anterior kommunikan arter düzeyinde sakküler anevrizma ile uyumlu odak görülüyor."
      },
      {
        "id": "csf",
        "label": "BOS incelemesi",
        "type": "lab",
        "rows": [
          [
            "Eritrosit",
            "Yüksek",
            "Yok",
            "Yüksek"
          ],
          [
            "Ksantokromi",
            "Pozitif",
            "Negatif",
            "Pozitif"
          ],
          [
            "Açılış basıncı",
            "Yüksek",
            "Değişken",
            "Yüksek"
          ]
        ]
      }
    ],
    "images": [
      {
        "title": "Kraniyal BT",
        "caption": "Bazal sisternalarda hiperdens kan ani gök gürültüsü baş ağrısı ile birlikte SAH lehinedir.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/CT%20scan%20-%20subarachnoid%20hemorrhage.jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:CT_scan_-_subarachnoid_hemorrhage.jpg",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "ct",
        "relatedFinding": "Bazal sisternalarda subaraknoid kan"
      }
    ],
    "diagnosis": {
      "correct": "Anevrizmal subaraknoid kanama",
      "options": [
        "Anevrizmal subaraknoid kanama",
        "Migren atağı",
        "Bakteriyel menenjit",
        "Serebral venöz sinüs trombozu"
      ],
      "explanation": "Saniyeler içinde maksimum şiddete ulaşan baş ağrısı, meningeal irritasyon ve kontrastsız BT’de subaraknoid kan paterninin görülmesi anevrizmal subaraknoid kanama ile uyumludur.",
      "pearls": [
        "Ani en şiddetli baş ağrısı aksi kanıtlanana kadar SAH kabul edilmelidir.",
        "BT negatif ancak şüphe yüksekse BOS değerlendirmesi veya vasküler görüntüleme gerekir.",
        "Rebleeding ve vazospazm riski erken yönetimi belirler."
      ],
      "nextStep": "Nöroşirürji ve girişimsel nöroradyoloji konsültasyonu iste; Anevrizma için BT anjiyografi veya DSA planla; Kan basıncı, ağrı ve vazospazm profilaksisini yönet.",
      "answerFeedback": {
        "diagnosisMeta": "Subaraknoid kanama · thunderclap baş ağrısı · anevrizma araştırması",
        "whyCorrect": "Saniyeler içinde maksimum şiddete ulaşan baş ağrısı, meningeal irritasyon ve kontrastsız BT’de subaraknoid kan paterninin görülmesi anevrizmal subaraknoid kanama ile uyumludur.",
        "evidenceChain": [
          "Thunderclap baş ağrısı SAH için klasik alarm bulgusudur.",
          "Ense sertliği meningeal irritasyonu gösterir.",
          "Erken kontrastsız BT subaraknoid kanı gösterebilir.",
          "Anevrizma odağı kesin tedavi planını belirler."
        ],
        "pearls": [
          "Ani en şiddetli baş ağrısı aksi kanıtlanana kadar SAH kabul edilmelidir.",
          "BT negatif ancak şüphe yüksekse BOS değerlendirmesi veya vasküler görüntüleme gerekir.",
          "Rebleeding ve vazospazm riski erken yönetimi belirler."
        ],
        "management": [
          "Nöroşirürji ve girişimsel nöroradyoloji konsültasyonu iste",
          "Anevrizma için BT anjiyografi veya DSA planla",
          "Kan basıncı, ağrı ve vazospazm profilaksisini yönet"
        ],
        "learningOutcome": "Saniyeler içinde maksimum şiddete ulaşan baş ağrısı, meningeal irritasyon ve kontrastsız BT’de subaraknoid kan paterninin görülmesi anevrizmal subaraknoid kanama ile uyumludur.",
        "differentials": {
          "Migren atağı": {
            "explanation": "Migren şiddetli baş ağrısı yapabilir; ancak thunderclap başlangıç ve meningeal bulgular SAH lehinedir.",
            "comparisonPoints": [
              "Belirleyici klinik bağlam doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Bakteriyel menenjit": {
            "explanation": "Menenjit ateş ve ense sertliği yapar; fakat ani maksimum baş ağrısı ve BT’de kan SAH lehinedir.",
            "comparisonPoints": [
              "Belirleyici klinik bağlam doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Serebral venöz sinüs trombozu": {
            "explanation": "CVST baş ağrısı/nöbet yapabilir; ancak subaraknoid kan paterni ve anevrizma şüphesi bu olguda daha güçlüdür.",
            "comparisonPoints": [
              "Belirleyici klinik bağlam doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "neuro-ms-001",
    "branchId": "neurology",
    "title": "Optik nörit öyküsü, diplopi ve demiyelinizan plaklar",
    "difficulty": "Orta · Demiyelinizan hastalık",
    "clinicalFocus": "Zaman ve mekanda yayılım, optik nörit, internükleer oftalmopleji ve BOS oligoklonal bant yorumu",
    "demographics": "29 yaşında kadın",
    "setting": "Nöroloji polikliniği",
    "chiefComplaint": "Sağ gözde bulanık görme öyküsü ve yeni başlayan çift görme",
    "stem": "Hasta sekiz ay önce kendiliğinden düzelen ağrılı sağ görme azalması atağı geçirdiğini, şimdi ise horizontal diplopi, dengesizlik ve kısa süreli uyuşmalar yaşadığını ifade ediyor.",
    "vitals": {
      "TA": "118/74 mmHg",
      "Nabız": "78/dk",
      "Solunum": "14/dk",
      "SpO2": "%99",
      "Ateş": "36.6 °C"
    },
    "exam": [
      "Sağ gözde rölatif afferent pupilla defekti izleniyor",
      "Sol bakışta sağ göz adduksiyon kısıtlılığı ve sol gözde abdüksiyon nistagmusu mevcut",
      "Hafif ataksi saptanıyor",
      "Kas gücü belirgin azalmamış"
    ],
    "investigations": [
      {
        "id": "mri",
        "label": "Beyin ve servikal spinal MR",
        "type": "mri",
        "summary": "Periventriküler, juxtakortikal ve infratentoryal bölgelerde demiyelinizan plaklarla uyumlu T2/FLAIR hiperintens lezyonlar izleniyor; bazı lezyonlarda kontrast tutulumu mevcut."
      },
      {
        "id": "csf",
        "label": "BOS incelemesi",
        "type": "lab",
        "rows": [
          [
            "Oligoklonal bant",
            "Pozitif",
            "Negatif",
            "Pozitif"
          ],
          [
            "IgG indeksi",
            "Yüksek",
            "<0.7",
            "Yüksek"
          ],
          [
            "Hücre sayısı",
            "Hafif lenfositoz",
            "0-5/mm³",
            "Yüksek"
          ]
        ]
      },
      {
        "id": "evoked",
        "label": "Görsel uyarılmış potansiyel",
        "type": "neurophysiology",
        "summary": "P100 latansında uzama saptanıyor."
      }
    ],
    "images": [
      {
        "title": "Kraniyal MR",
        "caption": "Periventriküler demiyelinizan plakların ventriküllere dik uzanımı MS için tipik görüntüleme ipucudur.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Axial%20MRI%20scans%20of%20a%20person%20with%20multiple%20sclerosis%20(30208218503).jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Axial_MRI_scans_of_a_person_with_multiple_sclerosis_(30208218503).jpg",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "mri",
        "relatedFinding": "Periventriküler demiyelinizan plaklar"
      }
    ],
    "diagnosis": {
      "correct": "Relapsing-remitting multipl skleroz",
      "options": [
        "Relapsing-remitting multipl skleroz",
        "Nöromiyelitis optika spektrum bozukluğu",
        "Akut dissemine ensefalomiyelit",
        "Miyastenia gravis"
      ],
      "explanation": "Optik nörit öyküsü, yeni diplopi/duyu bulguları ve MR’da farklı bölgelerde demiyelinizan plakların bulunması relapsing-remitting multipl sklerozu destekler.",
      "pearls": [
        "MS tanısı tek MR lezyonuyla değil klinik-MR yayılım mantığıyla kurulur.",
        "Nöromiyelitis optika ve MOG ilişkili hastalıklar ayırıcı tanıda düşünülmelidir.",
        "Akut relapsta yüksek doz steroid semptom süresini kısaltabilir."
      ],
      "nextStep": "Aktif relaps için yüksek doz intravenöz metilprednizolon değerlendir; MR ve BOS bulgularıyla tanısal ölçütleri tamamla; Hastalık modifiye edici tedavi seçeneklerini planla.",
      "answerFeedback": {
        "diagnosisMeta": "Santral demiyelinizasyon · zamanda ve mekânda yayılım · relaps paterni",
        "whyCorrect": "Optik nörit öyküsü, yeni diplopi/duyu bulguları ve MR’da farklı bölgelerde demiyelinizan plakların bulunması relapsing-remitting multipl sklerozu destekler.",
        "evidenceChain": [
          "Önceden optik nörit geçirilmesi zamanda yayılım ipucudur.",
          "Diplopi beyin sapı tutulumu düşündürür.",
          "MR’da periventriküler ve infratentorial plaklar mekânda yayılımı destekler.",
          "BOS oligoklonal bant pozitifliği tanıyı güçlendirebilir."
        ],
        "pearls": [
          "MS tanısı tek MR lezyonuyla değil klinik-MR yayılım mantığıyla kurulur.",
          "Nöromiyelitis optika ve MOG ilişkili hastalıklar ayırıcı tanıda düşünülmelidir.",
          "Akut relapsta yüksek doz steroid semptom süresini kısaltabilir."
        ],
        "management": [
          "Aktif relaps için yüksek doz intravenöz metilprednizolon değerlendir",
          "MR ve BOS bulgularıyla tanısal ölçütleri tamamla",
          "Hastalık modifiye edici tedavi seçeneklerini planla"
        ],
        "learningOutcome": "Optik nörit öyküsü, yeni diplopi/duyu bulguları ve MR’da farklı bölgelerde demiyelinizan plakların bulunması relapsing-remitting multipl sklerozu destekler.",
        "differentials": {
          "Nöromiyelitis optika spektrum bozukluğu": {
            "explanation": "NMO optik nörit ve miyelit yapabilir; ancak tipik MS plak dağılımı ve klinik relaps paterni bu olguda MS’i öne çıkarır.",
            "comparisonPoints": [
              "Belirleyici klinik bağlam doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Beyin sapı tümörü": {
            "explanation": "Tümör progresif kitle etkisi yapar; çok odaklı demiyelinizan plaklar ve relaps öyküsü tümörü geri plana iter.",
            "comparisonPoints": [
              "Belirleyici klinik bağlam doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Vitamin B12 eksikliği": {
            "explanation": "B12 eksikliği miyelopati yapabilir; ancak optik nörit ve çok odaklı MR plakları MS lehinedir.",
            "comparisonPoints": [
              "Belirleyici klinik bağlam doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "neuro-cvst-001",
    "branchId": "neurology",
    "title": "Lohusalık döneminde progresif baş ağrısı ve nöbet",
    "difficulty": "Acil · Nörovasküler",
    "clinicalFocus": "Serebral venöz sinüs trombozunda postpartum risk, intrakraniyal basınç bulguları ve MR venografi",
    "demographics": "31 yaşında kadın",
    "setting": "Acil servis",
    "chiefComplaint": "Şiddetli baş ağrısı ve ilk kez gelişen jeneralize nöbet",
    "stem": "Doğumdan on gün sonra başlayan ve giderek artan baş ağrısı olan hasta, jeneralize tonik-klonik nöbet sonrasında acil servise getiriliyor. Lohusalık döneminde sıvı alımının azaldığı ve uzun süre yatakta kaldığı öğreniliyor.",
    "vitals": {
      "TA": "142/88 mmHg",
      "Nabız": "96/dk",
      "Solunum": "18/dk",
      "SpO2": "%98",
      "Ateş": "36.7 °C"
    },
    "exam": [
      "Postiktal uykuya eğilim mevcut",
      "Papilödem şüphesi izleniyor",
      "Sağ üst ekstremitede geçici güçsüzlük saptanıyor",
      "Ense sertliği belirgin değil"
    ],
    "investigations": [
      {
        "id": "mrv",
        "label": "Beyin MR venografi",
        "type": "mri",
        "summary": "Superior sagittal sinüs ve sağ transvers sinüste akım sinyali kaybı izleniyor."
      },
      {
        "id": "ct",
        "label": "Kontrastsız beyin BT",
        "type": "ct",
        "summary": "Kortikal venöz konjesyon ve küçük hemorajik venöz enfarkt alanı ile uyumlu görünüm izleniyor."
      },
      {
        "id": "labs",
        "label": "Laboratuvar",
        "type": "lab",
        "rows": [
          [
            "D-dimer",
            "Yüksek",
            "<500 ng/mL FEU",
            "Yüksek"
          ],
          [
            "Trombosit",
            "260.000/mm³",
            "150.000-400.000/mm³",
            "Referans içinde"
          ],
          [
            "INR",
            "1.0",
            "0.8-1.2",
            "Referans içinde"
          ]
        ]
      }
    ],
    "images": [
      {
        "title": "Kraniyal MR venografi",
        "caption": "Transvers sinüste akım kaybı ve dolum defekti postpartum baş ağrısı-nöbet tablosunu açıklar.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Sinusthrombose%20rechts%20Sinus%20transversalis%2076W%20-%20MR%20-%20001.jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Sinusthrombose_rechts_Sinus_transversalis_76W_-_MR_-_001.jpg",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "mri",
        "relatedFinding": "Transvers sinüs trombozu"
      }
    ],
    "diagnosis": {
      "correct": "Serebral venöz sinüs trombozu",
      "options": [
        "Serebral venöz sinüs trombozu",
        "Anevrizmal subaraknoid kanama",
        "Eklampsi",
        "Bakteriyel menenjit"
      ],
      "explanation": "Lohusalık döneminde progresif baş ağrısı, nöbet ve venöz görüntülemede sinüs dolum defekti serebral venöz sinüs trombozunu destekler.",
      "pearls": [
        "CVST’de hemorajik lezyon olsa bile antikoagülasyon çoğu durumda temel tedavidir.",
        "Genç kadınlarda gebelik/lohusalık ve trombofili öyküsü mutlaka sorgulanır.",
        "Baş ağrısı + nöbet birlikteliği venöz patolojiyi akla getirmelidir."
      ],
      "nextStep": "MR venografi ile tanıyı doğrula; Kontrendikasyon yoksa antikoagülasyon başla; Nöbet ve intrakraniyal basınç yönetimini planla.",
      "answerFeedback": {
        "diagnosisMeta": "Serebral venöz tromboz · lohusalık · baş ağrısı ve nöbet",
        "whyCorrect": "Lohusalık döneminde progresif baş ağrısı, nöbet ve venöz görüntülemede sinüs dolum defekti serebral venöz sinüs trombozunu destekler.",
        "evidenceChain": [
          "Lohusalık hiperkoagülabilite için güçlü risk dönemidir.",
          "Baş ağrısının progresif seyri venöz basınç artışıyla uyumludur.",
          "Nöbet kortikal venöz tutulumda sık görülebilir.",
          "MR venografi sinüs trombozunu doğrudan gösterir."
        ],
        "pearls": [
          "CVST’de hemorajik lezyon olsa bile antikoagülasyon çoğu durumda temel tedavidir.",
          "Genç kadınlarda gebelik/lohusalık ve trombofili öyküsü mutlaka sorgulanır.",
          "Baş ağrısı + nöbet birlikteliği venöz patolojiyi akla getirmelidir."
        ],
        "management": [
          "MR venografi ile tanıyı doğrula",
          "Kontrendikasyon yoksa antikoagülasyon başla",
          "Nöbet ve intrakraniyal basınç yönetimini planla"
        ],
        "learningOutcome": "Lohusalık döneminde progresif baş ağrısı, nöbet ve venöz görüntülemede sinüs dolum defekti serebral venöz sinüs trombozunu destekler.",
        "differentials": {
          "Anevrizmal subaraknoid kanama": {
            "explanation": "SAH thunderclap baş ağrısı yapar; bu olguda lohusalık, progresif baş ağrısı ve venöz sinüs dolum defekti CVST lehinedir.",
            "comparisonPoints": [
              "Belirleyici klinik bağlam doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Migren": {
            "explanation": "Migren baş ağrısı yapar; ancak nöbet ve venöz görüntüleme bulgusu migrenle açıklanmaz.",
            "comparisonPoints": [
              "Belirleyici klinik bağlam doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Eklampsi": {
            "explanation": "Eklampsi nöbet yapabilir; fakat venöz sinüs trombozu görüntüleme bulgusu tanıyı farklılaştırır.",
            "comparisonPoints": [
              "Belirleyici klinik bağlam doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "ped-intussusception-001",
    "branchId": "pediatrics",
    "title": "Süt çocuğunda kolik tarzda ağlama atakları ve kanlı-mukuslu dışkılama",
    "difficulty": "Orta · Pediatrik cerrahi",
    "clinicalFocus": "İnvajinasyonda paroksismal ağrı, hedef görünümü, redüksiyon yaklaşımı ve cerrahi uyarı bulguları",
    "demographics": "9 aylık erkek bebek",
    "setting": "Çocuk acil",
    "chiefComplaint": "Ataklar halinde ağlama ve bacaklarını karnına çekme",
    "stem": "Dokuz aylık bebek, birkaç dakikalık huzursuzluk ve şiddetli ağlama atakları sonrasında kısa süreli sakinleşme dönemleri göstermektedir. Son dışkısında mukus ve kan karışımı fark edildiği, aralarda kusma olduğu öğreniliyor.",
    "vitals": {
      "TA": "86/52 mmHg",
      "Nabız": "148/dk",
      "Solunum": "30/dk",
      "SpO2": "%98",
      "Ateş": "37.5 °C"
    },
    "exam": [
      "Atak sırasında bacaklarını karnına çektiği izleniyor",
      "Sağ üst kadranda sosis şeklinde kitle palpasyonu şüpheli",
      "Rektal muayenede kanlı-mukuslu dışkı izleniyor",
      "Periton irritasyon bulgusu saptanmıyor"
    ],
    "investigations": [
      {
        "id": "usg",
        "label": "Abdominal ultrasonografi",
        "type": "ultrasound",
        "summary": "Sağ alt kadranda transvers kesitte hedef işareti, longitudinal kesitte yalancı böbrek görünümü izleniyor."
      },
      {
        "id": "xray",
        "label": "Ayakta direkt karın grafisi",
        "type": "xray",
        "summary": "Ayakta direkt karın grafisinde hava-sıvı seviyeleri izlenir; serbest intraperitoneal hava saptanmaz."
      },
      {
        "id": "labs",
        "label": "Laboratuvar",
        "type": "lab",
        "rows": [
          [
            "Lökosit",
            "13.200/mm³",
            "5.000-15.000/mm³",
            "Referans içinde"
          ],
          [
            "Hemoglobin",
            "11.8 g/dL",
            "10.5-13.5 g/dL",
            "Referans içinde"
          ],
          [
            "CRP",
            "8 mg/L",
            "<5 mg/L",
            "Yüksek"
          ]
        ]
      }
    ],
    "images": [
      {
        "title": "Abdominal ultrasonografi",
        "caption": "Ultrasonda konsantrik halka görünümü ileoçekal invajinasyon için tipiktir.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Intussusception%20on%20ultrasound.jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Intussusception_on_ultrasound.jpg",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "ultrasound",
        "relatedFinding": "Target sign"
      }
    ],
    "diagnosis": {
      "correct": "İleoçekal invajinasyon",
      "options": [
        "İleoçekal invajinasyon",
        "Hipertrofik pilor stenozu",
        "Akut gastroenterit",
        "Midgut volvulusu"
      ],
      "explanation": "Süt çocuğunda kolik tarzda ağlama atakları, kusma, kanlı-mukuslu dışkılama ve USG’de target/pseudokidney görünümü ileoçekal invajinasyonu destekler.",
      "pearls": [
        "İnvajinasyon en sık ileoçekal bölgede görülür.",
        "Peritonit veya perforasyon varsa cerrahi yaklaşım gerekir.",
        "Dışkıda kan olmaması tanıyı dışlamaz."
      ],
      "nextStep": "Sıvı resüsitasyonu ve analjezi sağla; USG ile tanıyı destekle; Peritonit yoksa pnömatik veya hidrostatik redüksiyon uygula.",
      "answerFeedback": {
        "diagnosisMeta": "Pediatrik akut batın · invajinasyon · redüksiyon önceliği",
        "whyCorrect": "Süt çocuğunda kolik tarzda ağlama atakları, kusma, kanlı-mukuslu dışkılama ve USG’de target/pseudokidney görünümü ileoçekal invajinasyonu destekler.",
        "evidenceChain": [
          "Ağlama ataklarının aralıklı olması kolik tarzda obstrüksiyonu düşündürür.",
          "Kanlı-mukuslu dışkı invajinasyon için klasik ipucudur.",
          "USG hedef bulgusu tanısal değeri yüksek bir bulgudur.",
          "Peritonit yoksa pnömatik/hidrostatik redüksiyon ilk tedavi olabilir."
        ],
        "pearls": [
          "İnvajinasyon en sık ileoçekal bölgede görülür.",
          "Peritonit veya perforasyon varsa cerrahi yaklaşım gerekir.",
          "Dışkıda kan olmaması tanıyı dışlamaz."
        ],
        "management": [
          "Sıvı resüsitasyonu ve analjezi sağla",
          "USG ile tanıyı destekle",
          "Peritonit yoksa pnömatik veya hidrostatik redüksiyon uygula"
        ],
        "learningOutcome": "Süt çocuğunda kolik tarzda ağlama atakları, kusma, kanlı-mukuslu dışkılama ve USG’de target/pseudokidney görünümü ileoçekal invajinasyonu destekler.",
        "differentials": {
          "Akut gastroenterit": {
            "explanation": "Gastroenterit kusma/ishal yapabilir; ancak kolik ağlama atakları ve hedef görünümü invajinasyon lehinedir.",
            "comparisonPoints": [
              "Belirleyici klinik bağlam doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Hipertrofik pilor stenozu": {
            "explanation": "Pilor stenozu safrasız fışkırır kusma yapar; kanlı dışkı ve target bulgusu beklenmez.",
            "comparisonPoints": [
              "Belirleyici klinik bağlam doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Midgut volvulusu": {
            "explanation": "Volvulus safralı kusma ve akut iskemi riskiyle gelir; USG target görünümü invajinasyonu öne çıkarır.",
            "comparisonPoints": [
              "Belirleyici klinik bağlam doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "ped-pyloric-stenosis-001",
    "branchId": "pediatrics",
    "title": "Beş haftalık bebekte safrasız fışkırır tarzda kusma ve hipokloremik alkaloz",
    "difficulty": "Temel-orta · Pediatrik cerrahi",
    "clinicalFocus": "Hipertrofik pilor stenozunda kusma paterni, elektrolit bozukluğu ve ultrasonografik ölçütler",
    "demographics": "5 haftalık erkek bebek",
    "setting": "Çocuk acil",
    "chiefComplaint": "Beslenme sonrası fışkırır tarzda kusma",
    "stem": "Beş haftalık erkek bebek son bir haftadır her beslenmeden kısa süre sonra safrasız ve fışkırır tarzda kusuyor. Kusma sonrasında tekrar emmek istediği, kilo alımının azaldığı ve bez sayısının düştüğü öğreniliyor.",
    "vitals": {
      "TA": "82/48 mmHg",
      "Nabız": "156/dk",
      "Solunum": "32/dk",
      "SpO2": "%99",
      "Ateş": "36.8 °C"
    },
    "exam": [
      "Bebekte hafif dehidratasyon bulguları mevcut",
      "Üst abdomen palpasyonunda zeytin benzeri kitle şüpheli",
      "Beslenme sonrasında epigastriumda görünür peristaltizm izleniyor",
      "Batında distansiyon belirgin değil"
    ],
    "investigations": [
      {
        "id": "electrolytes",
        "label": "Elektrolit ve kan gazı",
        "type": "lab",
        "rows": [
          [
            "pH",
            "7.52",
            "7.35-7.45",
            "Yüksek"
          ],
          [
            "Klor",
            "86 mmol/L",
            "98-107 mmol/L",
            "Düşük"
          ],
          [
            "Potasyum",
            "3.0 mmol/L",
            "3.5-5.1 mmol/L",
            "Düşük"
          ],
          [
            "HCO3-",
            "34 mmol/L",
            "22-26 mmol/L",
            "Yüksek"
          ]
        ]
      },
      {
        "id": "usg",
        "label": "Pilor ultrasonografisi",
        "type": "ultrasound",
        "summary": "Pilor kas kalınlığı ve kanal uzunluğu artmış; mide çıkışında geçiş kısıtlılığı ile uyumlu görünüm izleniyor."
      },
      {
        "id": "management",
        "label": "Tedavi öncesi hazırlık",
        "type": "management",
        "summary": "Cerrahi öncesinde sıvı ve elektrolit bozukluklarının düzeltilmesi gerekir; piloromiyotomi stabilizasyon sonrası yapılır."
      }
    ],
    "images": [
      {
        "title": "Pilor ultrasonografisi",
        "caption": "Kalınlaşmış pilor kası ve uzamış kanal safrasız fışkırır kusmayı açıklar.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/PyloricStenosisUS.jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:PyloricStenosisUS.jpg",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "ultrasound",
        "relatedFinding": "Kalınlaşmış pilor kası"
      }
    ],
    "diagnosis": {
      "correct": "Hipertrofik pilor stenozu",
      "options": [
        "Hipertrofik pilor stenozu",
        "Gastroözofageal reflü",
        "İnvajinasyon",
        "Duodenal atrezi"
      ],
      "explanation": "Beş haftalık bebekte progresif safrasız fışkırır kusma, kilo alamama, hipokloremik metabolik alkaloz ve USG’de pilor kas kalınlaşması hipertrofik pilor stenozunu destekler.",
      "pearls": [
        "Cerrahi öncesi sıvı-elektrolit düzeltilmelidir.",
        "Safralı kusma distal obstrüksiyon alarmıdır.",
        "Piloromiyotomi kesin tedavi basamağıdır."
      ],
      "nextStep": "Dehidratasyon ve elektrolit bozukluğunu düzelt; Abdominal USG ile tanıyı doğrula; Stabilizasyon sonrası Ramstedt piloromiyotomi planla.",
      "answerFeedback": {
        "diagnosisMeta": "Yenidoğan/süt çocuğu cerrahisi · safrasız kusma · hipokloremik alkaloz",
        "whyCorrect": "Beş haftalık bebekte progresif safrasız fışkırır kusma, kilo alamama, hipokloremik metabolik alkaloz ve USG’de pilor kas kalınlaşması hipertrofik pilor stenozunu destekler.",
        "evidenceChain": [
          "Safrasız fışkırır kusma pilor çıkış obstrüksiyonunu düşündürür.",
          "Hipokloremi ve metabolik alkaloz mide asidi kaybını yansıtır.",
          "Yaş aralığı klasik pilor stenozu dönemine uyar.",
          "USG’de pilor kası kalınlığı ve kanal uzunluğu tanıyı destekler."
        ],
        "pearls": [
          "Cerrahi öncesi sıvı-elektrolit düzeltilmelidir.",
          "Safralı kusma distal obstrüksiyon alarmıdır.",
          "Piloromiyotomi kesin tedavi basamağıdır."
        ],
        "management": [
          "Dehidratasyon ve elektrolit bozukluğunu düzelt",
          "Abdominal USG ile tanıyı doğrula",
          "Stabilizasyon sonrası Ramstedt piloromiyotomi planla"
        ],
        "learningOutcome": "Beş haftalık bebekte progresif safrasız fışkırır kusma, kilo alamama, hipokloremik metabolik alkaloz ve USG’de pilor kas kalınlaşması hipertrofik pilor stenozunu destekler.",
        "differentials": {
          "Gastroözofageal reflü": {
            "explanation": "Reflü kusma yapabilir; ancak fışkırır karakter, hipokloremik alkaloz ve USG bulgusu pilor stenozu lehinedir.",
            "comparisonPoints": [
              "Belirleyici klinik bağlam doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Midgut volvulusu": {
            "explanation": "Volvulus çoğunlukla safralı kusma ve acil iskemi riskiyle gelir; burada safrasız kusma ve pilor kalınlaşması vardır.",
            "comparisonPoints": [
              "Belirleyici klinik bağlam doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "İnek sütü protein alerjisi": {
            "explanation": "Alerji kusma ve dışkı değişikliği yapabilir; metabolik alkaloz ve pilor USG bulgusu beklenmez.",
            "comparisonPoints": [
              "Belirleyici klinik bağlam doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "ped-kawasaki-001",
    "branchId": "pediatrics",
    "title": "Beş günden uzun süren ateş ve mukokutanöz inflamasyon bulguları",
    "difficulty": "Orta · Pediatrik kardiyoloji",
    "clinicalFocus": "Kawasaki hastalığında klinik kriterler, koroner arter komplikasyonları ve IVIG zamanı",
    "demographics": "3 yaşında kız çocuk",
    "setting": "Çocuk acil / pediatri servisi",
    "chiefComplaint": "Altı gündür düşmeyen ateş ve döküntü",
    "stem": "Üç yaşındaki çocuk, antibiyotik tedavisine rağmen devam eden yüksek ateş nedeniyle getiriliyor. Ateşe bilateral göz kızarıklığı, dudaklarda çatlama, gövdede döküntü ve el-ayaklarda şişlik eşlik ediyor.",
    "vitals": {
      "TA": "92/58 mmHg",
      "Nabız": "132/dk",
      "Solunum": "24/dk",
      "SpO2": "%99",
      "Ateş": "39.1 °C"
    },
    "exam": [
      "Bilateral nonpürülan konjonktival hiperemi izleniyor",
      "Dudaklar kuru ve çatlak, dil çilek dili görünümünde",
      "El ve ayaklarda ödem ve eritem mevcut",
      "Tek taraflı servikal lenfadenopati saptanıyor"
    ],
    "investigations": [
      {
        "id": "labs",
        "label": "İnflamasyon ve hematolojik değerlendirme",
        "type": "lab",
        "rows": [
          [
            "CRP",
            "96 mg/L",
            "<5 mg/L",
            "Yüksek"
          ],
          [
            "Sedimentasyon",
            "78 mm/saat",
            "<20 mm/saat",
            "Yüksek"
          ],
          [
            "Trombosit",
            "520.000/mm³",
            "150.000-400.000/mm³",
            "Yüksek"
          ],
          [
            "ALT",
            "Hafif yüksek",
            "<41 U/L",
            "Yüksek"
          ]
        ]
      },
      {
        "id": "echo",
        "label": "Ekokardiyografi",
        "type": "ultrasound",
        "summary": "Koroner arter ektazisi veya anevrizma açısından başlangıç değerlendirmesi yapılır; erken dönemde normal olabilir."
      },
      {
        "id": "urine",
        "label": "İdrar tetkiki",
        "type": "urine",
        "rows": [
          [
            "Lökosit",
            "Pozitif",
            "Negatif",
            "Pozitif"
          ],
          [
            "Nitrit",
            "Negatif",
            "Negatif",
            "Negatif"
          ],
          [
            "Kültür",
            "Üreme yok",
            "Üreme yok",
            "Referans içinde"
          ]
        ]
      }
    ],
    "images": [
      {
        "title": "Oral mukoza bulgusu",
        "caption": "Çilek dili ve çatlamış dudaklar uzamış ateşle birlikte Kawasaki klinik yorumu destekler.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Kawasaki%20symptoms%20B.jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Kawasaki_symptoms_B.jpg",
        "sourceName": "",
        "license": "CC BY",
        "modality": "clinical",
        "relatedFinding": "Çilek dili ve fissüre dudaklar"
      }
    ],
    "diagnosis": {
      "correct": "Kawasaki hastalığı",
      "options": [
        "Kawasaki hastalığı",
        "Kızıl",
        "Adenovirus enfeksiyonu",
        "Stevens-Johnson sendromu"
      ],
      "explanation": "Beş günden uzun süren ateşe konjonktivit, oral mukozal değişiklik, ekstremite bulguları, döküntü ve lenfadenopatinin eşlik etmesi Kawasaki hastalığı tanısını destekler.",
      "pearls": [
        "Tedavi gecikirse koroner anevrizma riski artar.",
        "Eksik Kawasaki özellikle küçük çocuklarda akılda tutulmalıdır.",
        "IVIG ve aspirin tedavisi inflamasyonu ve koroner riski azaltır."
      ],
      "nextStep": "Ekokardiyografi ile koroner arterleri değerlendir; IVIG tedavisini başla; Aspirin tedavisini hastalık fazına göre düzenle.",
      "answerFeedback": {
        "diagnosisMeta": "Vaskülit · uzamış ateş · koroner arter riski",
        "whyCorrect": "Beş günden uzun süren ateşe konjonktivit, oral mukozal değişiklik, ekstremite bulguları, döküntü ve lenfadenopatinin eşlik etmesi Kawasaki hastalığı tanısını destekler.",
        "evidenceChain": [
          "Ateşin beş günü aşması Kawasaki için temel koşuldur.",
          "Nonpürülan konjonktivit ve çilek dili mukokutanöz inflamasyonu gösterir.",
          "El-ayak ödemi/deskuamasyon vaskülitik süreci destekler.",
          "Koroner arter tutulumu erken tedavi gerektirir."
        ],
        "pearls": [
          "Tedavi gecikirse koroner anevrizma riski artar.",
          "Eksik Kawasaki özellikle küçük çocuklarda akılda tutulmalıdır.",
          "IVIG ve aspirin tedavisi inflamasyonu ve koroner riski azaltır."
        ],
        "management": [
          "Ekokardiyografi ile koroner arterleri değerlendir",
          "IVIG tedavisini başla",
          "Aspirin tedavisini hastalık fazına göre düzenle"
        ],
        "learningOutcome": "Beş günden uzun süren ateşe konjonktivit, oral mukozal değişiklik, ekstremite bulguları, döküntü ve lenfadenopatinin eşlik etmesi Kawasaki hastalığı tanısını destekler.",
        "differentials": {
          "Kızıl": {
            "explanation": "Kızıl ateş ve döküntü yapar; ancak nonpürülan konjonktivit, ekstremite değişiklikleri ve koroner risk Kawasaki lehinedir.",
            "comparisonPoints": [
              "Belirleyici klinik bağlam doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Adenovirüs enfeksiyonu": {
            "explanation": "Adenovirüs konjonktivit yapabilir; fakat beş günden uzun ateş ve çoklu mukokutanöz kriterler Kawasaki’yi öne çıkarır.",
            "comparisonPoints": [
              "Belirleyici klinik bağlam doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Juvenil idiyopatik artrit": {
            "explanation": "Sistemik JIA ateş/döküntü yapabilir; ancak oral-ekstremite bulguları ve koroner risk Kawasaki için daha özgüldür.",
            "comparisonPoints": [
              "Belirleyici klinik bağlam doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "ped-epiglottitis-001",
    "branchId": "pediatrics",
    "title": "Toksik görünümlü çocukta salya akması, disfaji ve tripod pozisyonu",
    "difficulty": "Acil · Havayolu",
    "clinicalFocus": "Akut epiglottitte havayolu güvenliği, lateral boyun grafisi ve muayene sırasında risk yönetimi",
    "demographics": "6 yaşında erkek çocuk",
    "setting": "Çocuk acil",
    "chiefComplaint": "Yutamama, salya akması ve solunum sıkıntısı",
    "stem": "Aşıları eksik olduğu öğrenilen altı yaşındaki çocuk, ani başlayan yüksek ateş, şiddetli boğaz ağrısı, yutamama ve boğuk ses nedeniyle getiriliyor. Muayene sırasında öne eğilerek oturduğu ve salyasını yutamadığı izleniyor.",
    "vitals": {
      "TA": "94/60 mmHg",
      "Nabız": "148/dk",
      "Solunum": "34/dk",
      "SpO2": "%91",
      "Ateş": "39.4 °C"
    },
    "exam": [
      "Toksik görünüm belirgin",
      "Tripod pozisyonunda oturuyor",
      "İnspiratuvar stridor duyuluyor",
      "Orofarenks muayenesi havayolu ekibi hazır olmadan zorlanmıyor"
    ],
    "investigations": [
      {
        "id": "neck-xray",
        "label": "Lateral boyun grafisi",
        "type": "xray",
        "summary": "Epiglotta ödem ile uyumlu başparmak bulgusu izlenebilir; inceleme hastanın havayolu güvenliği bozulmadan yapılmalıdır."
      },
      {
        "id": "labs",
        "label": "Laboratuvar",
        "type": "lab",
        "rows": [
          [
            "Lökosit",
            "18.600/mm³",
            "4.000-10.000/mm³",
            "Yüksek"
          ],
          [
            "CRP",
            "112 mg/L",
            "<5 mg/L",
            "Yüksek"
          ],
          [
            "Kan kültürü",
            "Alındı",
            "—",
            "Kayıt altına alındı"
          ]
        ]
      },
      {
        "id": "airway",
        "label": "Havayolu planı",
        "type": "management",
        "summary": "Havayolu obstrüksiyonu riski nedeniyle entübasyon hazırlığı deneyimli ekip tarafından kontrollü koşullarda yapılır."
      }
    ],
    "images": [
      {
        "title": "Boyun lateral grafisi",
        "caption": "Lateral boyun grafisinde kalınlaşmış epiglot üst havayolu obstrüksiyonu riskini gösterir.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Epiglottitis.jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Epiglottitis.jpg",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "xray",
        "relatedFinding": "Thumb sign"
      }
    ],
    "diagnosis": {
      "correct": "Akut epiglottit",
      "options": [
        "Akut epiglottit",
        "Viral krup",
        "Peritonsiller apse",
        "Yabancı cisim aspirasyonu"
      ],
      "explanation": "Toksik görünümlü çocukta yüksek ateş, disfaji, salya akması, muffled voice ve tripod pozisyonu akut epiglottiti düşündürür; hava yolu güvenliği tanısal işlemlerden önce gelir.",
      "pearls": [
        "Epiglottitte ajitasyon ve gereksiz manipülasyon obstrüksiyonu artırabilir.",
        "Krup genellikle havlar tarzda öksürük ve daha yavaş başlangıç gösterir.",
        "Hava yolu güvenliği sağlanmadan görüntüleme öncelik değildir."
      ],
      "nextStep": "Hastayı sakin tut ve hava yolu ekibini çağır; Kontrollü ortamda entübasyon hazırlığı yap; Geniş spektrumlu intravenöz antibiyotik başla.",
      "answerFeedback": {
        "diagnosisMeta": "Üst hava yolu acili · toksik görünüm · entübasyon hazırlığı",
        "whyCorrect": "Toksik görünümlü çocukta yüksek ateş, disfaji, salya akması, muffled voice ve tripod pozisyonu akut epiglottiti düşündürür; hava yolu güvenliği tanısal işlemlerden önce gelir.",
        "evidenceChain": [
          "Salya akması ve yutamama supraglottik obstrüksiyon lehinedir.",
          "Tripod pozisyonu hava yolu açıklığını koruma çabasıdır.",
          "Toksik görünüm bakteriyel ağır enfeksiyonu destekler.",
          "Boğaz muayenesi hava yolunu provoke edebileceği için dikkatle planlanmalıdır."
        ],
        "pearls": [
          "Epiglottitte ajitasyon ve gereksiz manipülasyon obstrüksiyonu artırabilir.",
          "Krup genellikle havlar tarzda öksürük ve daha yavaş başlangıç gösterir.",
          "Hava yolu güvenliği sağlanmadan görüntüleme öncelik değildir."
        ],
        "management": [
          "Hastayı sakin tut ve hava yolu ekibini çağır",
          "Kontrollü ortamda entübasyon hazırlığı yap",
          "Geniş spektrumlu intravenöz antibiyotik başla"
        ],
        "learningOutcome": "Toksik görünümlü çocukta yüksek ateş, disfaji, salya akması, muffled voice ve tripod pozisyonu akut epiglottiti düşündürür.",
        "differentials": {
          "Krup": {
            "explanation": "Krup stridor yapabilir; ancak salya akması, toksik görünüm ve tripod pozisyonu epiglottiti öne çıkarır.",
            "comparisonPoints": [
              "Belirleyici klinik bağlam doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Yabancı cisim aspirasyonu": {
            "explanation": "Yabancı cisim ani başlangıçlı öksürük/boğulma ile gelir; ateş ve toksik görünüm epiglottit lehinedir.",
            "comparisonPoints": [
              "Belirleyici klinik bağlam doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Retrofaringeal apse": {
            "explanation": "Apse disfaji yapabilir; ancak hızlı hava yolu tehdidi ve epiglottik klinik patern bu olguda daha belirgindir.",
            "comparisonPoints": [
              "Belirleyici klinik bağlam doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "surg-appendicitis-001",
    "branchId": "general-surgery",
    "title": "Periumbilikal başlayıp sağ alt kadrana göç eden abdominal ağrı",
    "difficulty": "Temel-orta · Genel cerrahi",
    "clinicalFocus": "Akut apandisitte ağrı migrasyonu, peritoneal irritasyon bulguları ve görüntüleme seçimi",
    "demographics": "24 yaşında erkek",
    "setting": "Acil servis",
    "chiefComplaint": "Sağ alt kadran ağrısı ve iştahsızlık",
    "stem": "Yirmi dört yaşındaki erkek hasta, 12 saat önce periumbilikal başlayan ağrının giderek sağ alt kadrana lokalize olduğunu ifade ediyor. Bulantı, iştahsızlık ve düşük dereceli ateş yakınmaları mevcut.",
    "vitals": {
      "TA": "118/72 mmHg",
      "Nabız": "102/dk",
      "Solunum": "18/dk",
      "SpO2": "%99",
      "Ateş": "37.9 °C"
    },
    "exam": [
      "McBurney noktasında hassasiyet saptanıyor",
      "Rovsing bulgusu pozitif",
      "Hafif defans mevcut, yaygın rebound yok",
      "Psoas veya obturator irritasyon bulguları değerlendiriliyor"
    ],
    "investigations": [
      {
        "id": "labs",
        "label": "Hemogram ve inflamasyon belirteçleri",
        "type": "lab",
        "rows": [
          [
            "Lökosit",
            "15.400/mm³",
            "4.000-10.000/mm³",
            "Yüksek"
          ],
          [
            "Nötrofil",
            "%84",
            "%40-70",
            "Yüksek"
          ],
          [
            "CRP",
            "38 mg/L",
            "<5 mg/L",
            "Yüksek"
          ]
        ]
      },
      {
        "id": "ct",
        "label": "Kontrastlı abdomen BT",
        "type": "ct",
        "summary": "Çapı artmış, duvarı kalınlaşmış apendiks ve çevre yağ dokuda inflamasyon izleniyor; apendikolit görülebilir."
      },
      {
        "id": "urine",
        "label": "İdrar tetkiki",
        "type": "urine",
        "rows": [
          [
            "Lökosit",
            "Negatif",
            "Negatif",
            "Negatif"
          ],
          [
            "Nitrit",
            "Negatif",
            "Negatif",
            "Negatif"
          ],
          [
            "Eritrosit",
            "Eser",
            "Negatif",
            "Sınırda"
          ]
        ]
      }
    ],
    "images": [
      {
        "title": "Abdominal BT",
        "caption": "Dilate apendiks ve çevresel yağlı plan inflamasyonu cerrahi doğru yanıtı açıklar.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/CT%20scan%20of%20the%20abdomen%20showing%20acute%20appendicitis.jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:CT_scan_of_the_abdomen_showing_acute_appendicitis.jpg",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "ct",
        "relatedFinding": "Dilate inflame apendiks"
      }
    ],
    "diagnosis": {
      "correct": "Akut apandisit",
      "options": [
        "Akut apandisit",
        "Meckel divertiküliti",
        "Üreter taşı",
        "Akut gastroenterit"
      ],
      "explanation": "Periumbilikal başlayıp sağ alt kadrana göç eden ağrı, iştahsızlık, nötrofilik lökositoz ve BT’de inflame apendiks görünümü akut apandisit ile uyumludur.",
      "pearls": [
        "Erken dönemde ağrı visseral; parietal periton irritasyonu gelişince sağ alt kadrana lokalizedir.",
        "İdrar tetkikinde hafif eritrosit görülebilse de tipik klinik tablo apandisit lehinedir."
      ],
      "nextStep": "Genel cerrahi değerlendirmesi; uygun antibiyotik ve laparoskopik apendektomi planlanması.",
      "answerFeedback": {
        "diagnosisMeta": "Akut apandisitte ağrı migrasyonu",
        "whyCorrect": "Periumbilikal başlayıp sağ alt kadrana göç eden ağrı, iştahsızlık, nötrofilik lökositoz ve BT’de inflame apendiks görünümü akut apandisit ile uyumludur.",
        "evidenceChain": [
          "Başvuru yakınması: Sağ alt kadran ağrısı ve iştahsızlık.",
          "McBurney noktasında hassasiyet saptanıyor.",
          "Hemogram ve inflamasyon belirteçleri: Lökosit 15.400/mm³ olarak değerlendirilir.",
          "Kontrastlı abdomen BT: Çapı artmış, duvarı kalınlaşmış apendiks ve çevre yağ dokuda inflamasyon izleniyor; apendikolit görülebilir."
        ],
        "pearls": [
          "Erken dönemde ağrı visseral; parietal periton irritasyonu gelişince sağ alt kadrana lokalizedir.",
          "İdrar tetkikinde hafif eritrosit görülebilse de tipik klinik tablo apandisit lehinedir."
        ],
        "management": [
          "Genel cerrahi değerlendirmesi",
          "uygun antibiyotik ve laparoskopik apendektomi planlanması"
        ],
        "learningOutcome": "Akut apandisit tanısında kritik nokta, tek bir bulgudan çok paternin bütününü yorumlamaktır.",
        "differentials": {
          "Meckel divertiküliti": {
            "explanation": "Meckel divertiküliti ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Akut apandisit lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Meckel divertiküliti için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Akut apandisit tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Üreter taşı": {
            "explanation": "Üreter taşı ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Akut apandisit lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Üreter taşı için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Akut apandisit tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Akut gastroenterit": {
            "explanation": "Akut gastroenterit ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Akut apandisit lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Akut gastroenterit için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Akut apandisit tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "surg-cholecystitis-001",
    "branchId": "general-surgery",
    "title": "Sağ üst kadran ağrısı, ateş ve ultrasonografik Murphy bulgusu",
    "difficulty": "Orta · Genel cerrahi",
    "clinicalFocus": "Akut taşlı kolesistitte biliyer kolikten ayrım, ultrasonografi bulguları ve erken kolesistektomi",
    "demographics": "47 yaşında kadın",
    "setting": "Acil servis",
    "chiefComplaint": "Yağlı yemek sonrasında başlayan sağ üst kadran ağrısı",
    "stem": "Kırk yedi yaşındaki kadın hasta, 18 saattir devam eden sağ üst kadran ağrısı, bulantı ve ateş yakınmalarıyla başvuruyor. Daha önce kendiliğinden düzelen kısa süreli biliyer kolik atakları olduğu öğreniliyor.",
    "vitals": {
      "TA": "126/78 mmHg",
      "Nabız": "104/dk",
      "Solunum": "18/dk",
      "SpO2": "%98",
      "Ateş": "38.2 °C"
    },
    "exam": [
      "Sağ üst kadranda hassasiyet mevcut",
      "Klinik Murphy bulgusu pozitif",
      "Skleralarda belirgin ikter saptanmıyor",
      "Peritoneal irritasyon yaygın değil"
    ],
    "investigations": [
      {
        "id": "usg",
        "label": "Sağ üst kadran ultrasonografisi",
        "type": "ultrasound",
        "summary": "Safra kesesinde taş, duvar kalınlaşması, perikolesistik sıvı ve prob basısı ile ağrı artışı izleniyor."
      },
      {
        "id": "labs",
        "label": "Laboratuvar",
        "type": "lab",
        "rows": [
          [
            "Lökosit",
            "14.800/mm³",
            "4.000-10.000/mm³",
            "Yüksek"
          ],
          [
            "CRP",
            "68 mg/L",
            "<5 mg/L",
            "Yüksek"
          ],
          [
            "Total bilirubin",
            "1.1 mg/dL",
            "0.2-1.2 mg/dL",
            "Referans içinde"
          ],
          [
            "ALT",
            "46 U/L",
            "<41 U/L",
            "Yüksek"
          ]
        ]
      },
      {
        "id": "hbs",
        "label": "Hepatobiliyer sintigrafi",
        "type": "nuclear",
        "summary": "Ultrasonografi tanısal değilse sistik kanal obstrüksiyonunu göstermek için kullanılabilir."
      }
    ],
    "images": [
      {
        "title": "Sağ üst kadran ultrasonografisi",
        "caption": "Taş, duvar kalınlaşması ve perikolesistik sıvı akut kolesistiti destekler.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Ultrasonography%20of%20cholecystitis.jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Ultrasonography_of_cholecystitis.jpg",
        "sourceName": "",
        "license": "CC0",
        "modality": "ultrasound",
        "relatedFinding": "Safra kesesi duvar kalınlaşması ve taş"
      }
    ],
    "diagnosis": {
      "correct": "Akut taşlı kolesistit",
      "options": [
        "Akut taşlı kolesistit",
        "Koledokolitiazis",
        "Akut pankreatit",
        "Peptik ülser hastalığı"
      ],
      "explanation": "Süreklilik gösteren sağ üst kadran ağrısı, ateş, lökositoz, Murphy bulgusu ve ultrasonografide taş ile duvar kalınlaşması akut taşlı kolesistit lehinedir.",
      "pearls": [
        "Biliyer kolikte ağrı genellikle daha kısa sürer ve inflamasyon bulguları belirgin değildir.",
        "Belirgin sarılık ve koledok dilatasyonu koledokolitiazis açısından ileri değerlendirme gerektirir."
      ],
      "nextStep": "Sıvı; analjezi; gram negatif ve anaeropları kapsayan antibiyotik ve erken laparoskopik kolesistektomi.",
      "answerFeedback": {
        "diagnosisMeta": "Akut taşlı kolesistitte biliyer kolikten ayrım",
        "whyCorrect": "Süreklilik gösteren sağ üst kadran ağrısı, ateş, lökositoz, Murphy bulgusu ve ultrasonografide taş ile duvar kalınlaşması akut taşlı kolesistit lehinedir.",
        "evidenceChain": [
          "Başvuru yakınması: Yağlı yemek sonrasında başlayan sağ üst kadran ağrısı.",
          "Sağ üst kadranda hassasiyet mevcut.",
          "Sağ üst kadran ultrasonografisi: Safra kesesinde taş, duvar kalınlaşması, perikolesistik sıvı ve prob basısı ile ağrı artışı izleniyor.",
          "Laboratuvar: Lökosit 14.800/mm³ olarak değerlendirilir."
        ],
        "pearls": [
          "Biliyer kolikte ağrı genellikle daha kısa sürer ve inflamasyon bulguları belirgin değildir.",
          "Belirgin sarılık ve koledok dilatasyonu koledokolitiazis açısından ileri değerlendirme gerektirir."
        ],
        "management": [
          "Sıvı",
          "analjezi",
          "gram negatif ve anaeropları kapsayan antibiyotik ve erken laparoskopik kolesistektomi"
        ],
        "learningOutcome": "Akut taşlı kolesistit tanısında kritik nokta, tek bir bulgudan çok paternin bütününü yorumlamaktır.",
        "differentials": {
          "Koledokolitiazis": {
            "explanation": "Koledokolitiazis ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Akut taşlı kolesistit lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Koledokolitiazis için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Akut taşlı kolesistit tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Akut pankreatit": {
            "explanation": "Akut pankreatit ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Akut taşlı kolesistit lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Akut pankreatit için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Akut taşlı kolesistit tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Peptik ülser hastalığı": {
            "explanation": "Peptik ülser hastalığı ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Akut taşlı kolesistit lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Peptik ülser hastalığı için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Akut taşlı kolesistit tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "surg-sbo-001",
    "branchId": "general-surgery",
    "title": "Geçirilmiş abdominal cerrahi sonrası kusma, distansiyon ve obstipasyon",
    "difficulty": "Orta · Akut batın",
    "clinicalFocus": "İnce bağırsak obstrüksiyonunda adezyon öyküsü, hava-sıvı seviyeleri, strangülasyon bulguları ve konservatif/cerrahi karar",
    "demographics": "63 yaşında erkek",
    "setting": "Acil servis",
    "chiefComplaint": "Karında şişlik, kusma ve gaz-gaita çıkaramama",
    "stem": "Daha önce kolon cerrahisi geçirmiş olan hasta, son 24 saattir kolik tarzda karın ağrısı, tekrarlayan kusma ve obstipasyon yakınmaları olduğunu ifade ediyor. Ateş veya belirgin dışkıda kan ifade etmiyor.",
    "vitals": {
      "TA": "104/66 mmHg",
      "Nabız": "116/dk",
      "Solunum": "20/dk",
      "SpO2": "%97",
      "Ateş": "37.4 °C"
    },
    "exam": [
      "Karında belirgin distansiyon mevcut",
      "Bağırsak sesleri metalik ve artmış duyuluyor",
      "Yaygın defans veya rebound saptanmıyor",
      "İnguinal herni muayenesinde strangülasyon bulgusu yok"
    ],
    "investigations": [
      {
        "id": "xray",
        "label": "Ayakta direkt karın grafisi",
        "type": "xray",
        "summary": "Santral yerleşimli dilate ince bağırsak ansları ve çoklu hava-sıvı seviyeleri izleniyor."
      },
      {
        "id": "ct",
        "label": "Kontrastlı abdomen BT",
        "type": "ct",
        "summary": "İnce bağırsakta geçiş noktası ve proksimal dilatasyon izleniyor; kapalı ans veya iskemi bulgusu belirgin değildir."
      },
      {
        "id": "labs",
        "label": "Laboratuvar",
        "type": "lab",
        "rows": [
          [
            "Lökosit",
            "11.800/mm³",
            "4.000-10.000/mm³",
            "Yüksek"
          ],
          [
            "Laktat",
            "1.6 mmol/L",
            "<2.0 mmol/L",
            "Referans içinde"
          ],
          [
            "Kreatinin",
            "1.1 mg/dL",
            "0.6-1.2 mg/dL",
            "Referans içinde"
          ]
        ]
      }
    ],
    "images": [
      {
        "title": "Ayakta direkt batın grafisi",
        "caption": "Çoklu hava-sıvı seviyeleri ve dilate ince barsak ansları mekanik obstrüksiyonu destekler.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Upright%20X-ray%20demonstrating%20small%20bowel%20obstruction.jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Upright_X-ray_demonstrating_small_bowel_obstruction.jpg",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "xray",
        "relatedFinding": "Dilate anslar ve hava-sıvı seviyeleri"
      }
    ],
    "diagnosis": {
      "correct": "Adezyona bağlı ince bağırsak obstrüksiyonu",
      "options": [
        "Adezyona bağlı ince bağırsak obstrüksiyonu",
        "Paralitik ileus",
        "Sigmoid volvulus",
        "Akut mezenter iskemi"
      ],
      "explanation": "Geçirilmiş abdominal cerrahi öyküsü, kolik ağrı, kusma, distansiyon, obstipasyon ve BT’de geçiş noktası adezyona bağlı mekanik ince bağırsak obstrüksiyonunu düşündürür.",
      "pearls": [
        "Ateş, lökositozun belirgin artması, sürekli ağrı, peritonit veya laktat yüksekliği strangülasyon/iskemi açısından uyarıcıdır.",
        "Paralitik ileusta belirgin mekanik geçiş noktası beklenmez."
      ],
      "nextStep": "Nazogastrik dekompresyon; intravenöz sıvı-elektrolit tedavisi; seri karın muayenesi.",
      "answerFeedback": {
        "diagnosisMeta": "İnce bağırsak obstrüksiyonunda adezyon öyküsü",
        "whyCorrect": "Geçirilmiş abdominal cerrahi öyküsü, kolik ağrı, kusma, distansiyon, obstipasyon ve BT’de geçiş noktası adezyona bağlı mekanik ince bağırsak obstrüksiyonunu düşündürür.",
        "evidenceChain": [
          "Başvuru yakınması: Karında şişlik, kusma ve gaz-gaita çıkaramama.",
          "Karında belirgin distansiyon mevcut.",
          "Ayakta direkt karın grafisi: Santral yerleşimli dilate ince bağırsak ansları ve çoklu hava-sıvı seviyeleri izleniyor.",
          "Kontrastlı abdomen BT: İnce bağırsakta geçiş noktası ve proksimal dilatasyon izleniyor; kapalı ans veya iskemi bulgusu belirgin değildir."
        ],
        "pearls": [
          "Ateş, lökositozun belirgin artması, sürekli ağrı, peritonit veya laktat yüksekliği strangülasyon/iskemi açısından uyarıcıdır.",
          "Paralitik ileusta belirgin mekanik geçiş noktası beklenmez."
        ],
        "management": [
          "Nazogastrik dekompresyon",
          "intravenöz sıvı-elektrolit tedavisi",
          "seri karın muayenesi"
        ],
        "learningOutcome": "Adezyona bağlı ince bağırsak obstrüksiyonu tanısında kritik nokta, tek bir bulgudan çok paternin bütününü yorumlamaktır.",
        "differentials": {
          "Paralitik ileus": {
            "explanation": "Paralitik ileus ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Adezyona bağlı ince bağırsak obstrüksiyonu lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Paralitik ileus için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Adezyona bağlı ince bağırsak obstrüksiyonu tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Sigmoid volvulus": {
            "explanation": "Sigmoid volvulus ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Adezyona bağlı ince bağırsak obstrüksiyonu lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Sigmoid volvulus için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Adezyona bağlı ince bağırsak obstrüksiyonu tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Akut mezenter iskemi": {
            "explanation": "Akut mezenter iskemi ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Adezyona bağlı ince bağırsak obstrüksiyonu lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Akut mezenter iskemi için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Adezyona bağlı ince bağırsak obstrüksiyonu tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "surg-pneumoperitoneum-001",
    "branchId": "general-surgery",
    "title": "Ani başlayan yaygın karın ağrısı ve subdiyafragmatik serbest hava",
    "difficulty": "Acil · Perforasyon",
    "clinicalFocus": "Perfore peptik ülserde ani ağrı, peritonit bulguları, ayakta grafi ve acil cerrahi yaklaşım",
    "demographics": "57 yaşında erkek",
    "setting": "Acil servis",
    "chiefComplaint": "Ani başlayan çok şiddetli epigastrik ağrı",
    "stem": "NSAİİ kullanım öyküsü olan hasta, epigastriumda aniden başlayan ağrının kısa sürede tüm karna yayıldığını ifade ediyor. Ağrı hareketle ve öksürmekle artıyor; bulantı eşlik ediyor.",
    "vitals": {
      "TA": "96/58 mmHg",
      "Nabız": "122/dk",
      "Solunum": "24/dk",
      "SpO2": "%96",
      "Ateş": "38.0 °C"
    },
    "exam": [
      "Hasta hareketsiz yatmayı tercih ediyor",
      "Karında tahta karın görünümünde rijidite mevcut",
      "Yaygın rebound hassasiyeti saptanıyor",
      "Bağırsak sesleri azalmış"
    ],
    "investigations": [
      {
        "id": "upright-xray",
        "label": "Ayakta akciğer/abdomen grafisi",
        "type": "xray",
        "summary": "Diyafram altında serbest hava ile uyumlu görünüm izleniyor."
      },
      {
        "id": "ct",
        "label": "Kontrastlı abdomen BT",
        "type": "ct",
        "summary": "Üst abdomende serbest hava ve sıvı; mide-duodenum komşuluğunda perforasyon odağı açısından şüpheli görünüm mevcut."
      },
      {
        "id": "labs",
        "label": "Laboratuvar",
        "type": "lab",
        "rows": [
          [
            "Lökosit",
            "16.200/mm³",
            "4.000-10.000/mm³",
            "Yüksek"
          ],
          [
            "CRP",
            "54 mg/L",
            "<5 mg/L",
            "Yüksek"
          ],
          [
            "Laktat",
            "2.4 mmol/L",
            "<2.0 mmol/L",
            "Yüksek"
          ]
        ]
      }
    ],
    "images": [
      {
        "title": "Ayakta direkt grafi",
        "caption": "Diyafram altında serbest hava gastrointestinal perforasyon için kritik radyolojik bulgudur.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Pneumoperitoneum.jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Pneumoperitoneum.jpg",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "xray",
        "relatedFinding": "Subdiyafragmatik serbest hava"
      }
    ],
    "diagnosis": {
      "correct": "Perfore peptik ülser",
      "options": [
        "Perfore peptik ülser",
        "Akut pankreatit",
        "Akut kolesistit",
        "Renal kolik"
      ],
      "explanation": "Ani başlayan epigastrik ağrı, yaygın peritonit bulguları ve diyafram altında serbest hava perforasyon lehinedir; NSAİİ öyküsü peptik ülser perforasyonunu destekler.",
      "pearls": [
        "Serbest hava saptanması perforasyon açısından cerrahi aciliyeti gösterir.",
        "Peritonit bulguları olan hastada gereksiz gecikme mortaliteyi artırır."
      ],
      "nextStep": "Oral alımın kesilmesi; geniş damar yolu; sıvı resüsitasyonu.",
      "answerFeedback": {
        "diagnosisMeta": "Perfore peptik ülserde ani ağrı",
        "whyCorrect": "Ani başlayan epigastrik ağrı, yaygın peritonit bulguları ve diyafram altında serbest hava perforasyon lehinedir; NSAİİ öyküsü peptik ülser perforasyonunu destekler.",
        "evidenceChain": [
          "Başvuru yakınması: Ani başlayan çok şiddetli epigastrik ağrı.",
          "Hasta hareketsiz yatmayı tercih ediyor.",
          "Ayakta akciğer/abdomen grafisi: Diyafram altında serbest hava ile uyumlu görünüm izleniyor.",
          "Kontrastlı abdomen BT: Üst abdomende serbest hava ve sıvı; mide-duodenum komşuluğunda perforasyon odağı açısından şüpheli görünüm mevcut."
        ],
        "pearls": [
          "Serbest hava saptanması perforasyon açısından cerrahi aciliyeti gösterir.",
          "Peritonit bulguları olan hastada gereksiz gecikme mortaliteyi artırır."
        ],
        "management": [
          "Oral alımın kesilmesi",
          "geniş damar yolu",
          "sıvı resüsitasyonu"
        ],
        "learningOutcome": "Perfore peptik ülser tanısında kritik nokta, tek bir bulgudan çok paternin bütününü yorumlamaktır.",
        "differentials": {
          "Akut pankreatit": {
            "explanation": "Akut pankreatit ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Perfore peptik ülser lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Akut pankreatit için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Perfore peptik ülser tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Akut kolesistit": {
            "explanation": "Akut kolesistit ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Perfore peptik ülser lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Akut kolesistit için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Perfore peptik ülser tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Renal kolik": {
            "explanation": "Renal kolik ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Perfore peptik ülser lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Renal kolik için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Perfore peptik ülser tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "surg-diverticulitis-001",
    "branchId": "general-surgery",
    "title": "Yaşlı hastada sol alt kadran ağrısı, ateş ve perikolik inflamasyon",
    "difficulty": "Orta · Kolorektal cerrahi",
    "clinicalFocus": "Akut sigmoid divertikülitte lokalize ağrı, BT bulguları, komplikasyon taraması ve tedavi seçimi",
    "demographics": "68 yaşında kadın",
    "setting": "Acil servis",
    "chiefComplaint": "Sol alt kadranda ağrı ve ateş",
    "stem": "Altmış sekiz yaşındaki kadın hasta iki gündür sol alt kadranda giderek artan ağrı, kabızlık ve düşük dereceli ateş olduğunu ifade ediyor. Daha önce kolonoskopide divertikülozis saptandığı öğreniliyor.",
    "vitals": {
      "TA": "128/78 mmHg",
      "Nabız": "98/dk",
      "Solunum": "18/dk",
      "SpO2": "%98",
      "Ateş": "38.1 °C"
    },
    "exam": [
      "Sol alt kadranda lokalize hassasiyet mevcut",
      "Hafif defans saptanıyor, yaygın rebound yok",
      "Rektal muayenede aktif kanama izlenmiyor",
      "Hemodinamik olarak stabil"
    ],
    "investigations": [
      {
        "id": "ct",
        "label": "Kontrastlı abdomen BT",
        "type": "ct",
        "summary": "Sigmoid kolonda divertiküller, segmental duvar kalınlaşması ve perikolik yağ dokuda inflamasyon izleniyor; apse veya serbest perforasyon saptanmıyor."
      },
      {
        "id": "labs",
        "label": "Laboratuvar",
        "type": "lab",
        "rows": [
          [
            "Lökosit",
            "13.900/mm³",
            "4.000-10.000/mm³",
            "Yüksek"
          ],
          [
            "CRP",
            "82 mg/L",
            "<5 mg/L",
            "Yüksek"
          ],
          [
            "Kreatinin",
            "0.8 mg/dL",
            "0.6-1.2 mg/dL",
            "Referans içinde"
          ]
        ]
      },
      {
        "id": "colonoscopy",
        "label": "Kolonoskopi zamanlaması",
        "type": "clinical",
        "summary": "Akut dönemde perforasyon riski nedeniyle kolonoskopi yapılmaz; iyileşme sonrası malignite ayrımı için planlanabilir."
      }
    ],
    "images": [
      {
        "title": "Abdominal BT",
        "caption": "Segmental kolon duvar kalınlaşması ve perikolik yağlı plan inflamasyonu divertiküliti destekler.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Diverticulitis.png",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Diverticulitis.png",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "ct",
        "relatedFinding": "Perikolik inflamasyon ve divertiküller"
      }
    ],
    "diagnosis": {
      "correct": "Komplike olmayan akut sigmoid divertikülit",
      "options": [
        "Komplike olmayan akut sigmoid divertikülit",
        "İskemik kolit",
        "Kolon kanseri perforasyonu",
        "Akut apandisit"
      ],
      "explanation": "Sol alt kadran ağrısı, ateş, lökositoz ve BT’de sigmoid divertikül çevresinde inflamasyon, apse veya serbest perforasyon olmadan akut komplike olmayan divertikülit ile uyumludur.",
      "pearls": [
        "BT hem tanıyı destekler hem de apse/perforasyon gibi komplikasyonları ayırt eder.",
        "Akut inflamasyon döneminde kolonoskopiden kaçınılır."
      ],
      "nextStep": "Klinik şiddete göre oral veya intravenöz antibiyotik; sıvı desteği ve yakın izlem; komplikasyon gelişirse drenaj veya cerrahi değerlendirme.",
      "answerFeedback": {
        "diagnosisMeta": "Akut sigmoid divertikülitte lokalize ağrı",
        "whyCorrect": "Sol alt kadran ağrısı, ateş, lökositoz ve BT’de sigmoid divertikül çevresinde inflamasyon, apse veya serbest perforasyon olmadan akut komplike olmayan divertikülit ile uyumludur.",
        "evidenceChain": [
          "Başvuru yakınması: Sol alt kadranda ağrı ve ateş.",
          "Sol alt kadranda lokalize hassasiyet mevcut.",
          "Kontrastlı abdomen BT: Sigmoid kolonda divertiküller, segmental duvar kalınlaşması ve perikolik yağ dokuda inflamasyon izleniyor; apse veya serbest perforasyon saptanmıyor.",
          "Laboratuvar: Lökosit 13.900/mm³ olarak değerlendirilir."
        ],
        "pearls": [
          "BT hem tanıyı destekler hem de apse/perforasyon gibi komplikasyonları ayırt eder.",
          "Akut inflamasyon döneminde kolonoskopiden kaçınılır."
        ],
        "management": [
          "Klinik şiddete göre oral veya intravenöz antibiyotik",
          "sıvı desteği ve yakın izlem",
          "komplikasyon gelişirse drenaj veya cerrahi değerlendirme"
        ],
        "learningOutcome": "Komplike olmayan akut sigmoid divertikülit tanısında kritik nokta, tek bir bulgudan çok paternin bütününü yorumlamaktır.",
        "differentials": {
          "İskemik kolit": {
            "explanation": "İskemik kolit ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Komplike olmayan akut sigmoid divertikülit lehine daha tutarlıdır.",
            "comparisonPoints": [
              "İskemik kolit için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Komplike olmayan akut sigmoid divertikülit tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Kolon kanseri perforasyonu": {
            "explanation": "Kolon kanseri perforasyonu ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Komplike olmayan akut sigmoid divertikülit lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Kolon kanseri perforasyonu için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Komplike olmayan akut sigmoid divertikülit tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Akut apandisit": {
            "explanation": "Akut apandisit ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Komplike olmayan akut sigmoid divertikülit lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Akut apandisit için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Komplike olmayan akut sigmoid divertikülit tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "pulm-pneumothorax-001",
    "branchId": "pulmonology",
    "title": "Uzun boylu genç erkekte ani plöritik ağrı ve tek taraflı solunum sesi azalması",
    "difficulty": "Acil · Plevral hastalık",
    "clinicalFocus": "Primer spontan pnömotoraksta klinik bulgular, grafide plevral çizgi ve gerilim bulgularının ayırımı",
    "demographics": "23 yaşında uzun boylu zayıf erkek",
    "setting": "Acil servis",
    "chiefComplaint": "Ani sağ göğüs ağrısı ve nefes darlığı",
    "stem": "Uzun boylu ve zayıf yapılı 23 yaşındaki erkek hasta, istirahat sırasında aniden başlayan batıcı sağ göğüs ağrısı ve nefes darlığı nedeniyle başvuruyor. Travma, ateş veya balgam öyküsü yoktur.",
    "vitals": {
      "TA": "118/70 mmHg",
      "Nabız": "112/dk",
      "Solunum": "26/dk",
      "SpO2": "%91",
      "Ateş": "36.7 °C"
    },
    "exam": [
      "Sağ hemitoraksta solunum sesleri belirgin azalmış",
      "Perküsyonda sağda hipersonorite mevcut",
      "Trakea orta hatta",
      "Hemodinamik instabilite saptanmıyor"
    ],
    "investigations": [
      {
        "id": "cxr",
        "label": "Akciğer grafisi",
        "type": "xray",
        "summary": "Sağ apikal-lateral plevral çizgi ve bu çizginin periferinde akciğer işaretlerinin kaybolduğu alan izleniyor; mediastinal şift yok."
      },
      {
        "id": "abg",
        "label": "Kan gazı",
        "type": "lab",
        "rows": [
          [
            "pH",
            "7.43",
            "7.35-7.45",
            "Referans içinde"
          ],
          [
            "PaO2",
            "72 mmHg",
            "80-100 mmHg",
            "Düşük"
          ],
          [
            "PaCO2",
            "34 mmHg",
            "35-45 mmHg",
            "Düşük"
          ]
        ]
      },
      {
        "id": "ct",
        "label": "Toraks BT",
        "type": "ct",
        "summary": "Tanı grafiyle konulabiliyorsa rutin gerekli değildir; altta yatan bül veya sekonder neden araştırılacaksa değerlendirilebilir."
      }
    ],
    "images": [
      {
        "title": "Akciğer grafisi",
        "caption": "Plevral çizgi ve periferik akciğer işaretlerinin kaybı pnömotoraksı gösterir.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Chest%20X-ray%20of%20pneumothorax.png",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Chest_X-ray_of_pneumothorax.png",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "xray",
        "relatedFinding": "Plevral çizgi ve kollabe akciğer"
      }
    ],
    "diagnosis": {
      "correct": "Primer spontan pnömotoraks",
      "options": [
        "Primer spontan pnömotoraks",
        "Pulmoner emboli",
        "Lobar pnömoni",
        "Plevral efüzyon"
      ],
      "explanation": "Genç, uzun-zayıf erkek hastada travmasız ani plöritik ağrı, tek taraflı solunum sesi azalması, hipersonorite ve grafide plevral çizgi primer spontan pnömotoraksı destekler.",
      "pearls": [
        "Hipotansiyon, trakeal deviasyon ve belirgin solunum sıkıntısı gerilim pnömotoraksı düşündürür ve acil dekompresyon gerektirir.",
        "Küçük ve stabil pnömotoraksta oksijen ve gözlem yeterli olabilir."
      ],
      "nextStep": "Pnömotoraks boyutu ve semptom şiddetine göre oksijen-gözlem; aspirasyon veya tüp torakostomi kararı.",
      "answerFeedback": {
        "diagnosisMeta": "Primer spontan pnömotoraksta klinik bulgular",
        "whyCorrect": "Genç, uzun-zayıf erkek hastada travmasız ani plöritik ağrı, tek taraflı solunum sesi azalması, hipersonorite ve grafide plevral çizgi primer spontan pnömotoraksı destekler.",
        "evidenceChain": [
          "Başvuru yakınması: Ani sağ göğüs ağrısı ve nefes darlığı.",
          "Sağ hemitoraksta solunum sesleri belirgin azalmış.",
          "Akciğer grafisi: Sağ apikal-lateral plevral çizgi ve bu çizginin periferinde akciğer işaretlerinin kaybolduğu alan izleniyor; mediastinal şift yok.",
          "Kan gazı: pH 7.43 olarak değerlendirilir."
        ],
        "pearls": [
          "Hipotansiyon, trakeal deviasyon ve belirgin solunum sıkıntısı gerilim pnömotoraksı düşündürür ve acil dekompresyon gerektirir.",
          "Küçük ve stabil pnömotoraksta oksijen ve gözlem yeterli olabilir."
        ],
        "management": [
          "Pnömotoraks boyutu ve semptom şiddetine göre oksijen-gözlem",
          "aspirasyon veya tüp torakostomi kararı"
        ],
        "learningOutcome": "Primer spontan pnömotoraks tanısında kritik nokta, tek bir bulgudan çok paternin bütününü yorumlamaktır.",
        "differentials": {
          "Pulmoner emboli": {
            "explanation": "Pulmoner emboli ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Primer spontan pnömotoraks lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Pulmoner emboli için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Primer spontan pnömotoraks tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Lobar pnömoni": {
            "explanation": "Lobar pnömoni ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Primer spontan pnömotoraks lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Lobar pnömoni için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Primer spontan pnömotoraks tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Plevral efüzyon": {
            "explanation": "Plevral efüzyon ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Primer spontan pnömotoraks lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Plevral efüzyon için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Primer spontan pnömotoraks tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "pulm-pe-001",
    "branchId": "pulmonology",
    "title": "Risk faktörü olan hastada ani dispne, plöritik ağrı ve taşikardi",
    "difficulty": "Acil · Tromboemboli",
    "clinicalFocus": "Pulmoner embolide klinik olasılık, D-dimer kullanımı, BT pulmoner anjiyografi ve sağ kalp yüklenmesi",
    "demographics": "36 yaşında kadın",
    "setting": "Acil servis",
    "chiefComplaint": "Ani nefes darlığı ve batıcı göğüs ağrısı",
    "stem": "Otuz altı yaşındaki kadın hasta, iki gün önce uzun süreli uçuş yaptığını ve oral kontraseptif kullandığını belirtiyor. Ani başlayan nefes darlığına sağ yan ağrısı, çarpıntı ve sağ baldırda ağrı-şişlik eşlik ediyor.",
    "vitals": {
      "TA": "112/70 mmHg",
      "Nabız": "124/dk",
      "Solunum": "28/dk",
      "SpO2": "%89",
      "Ateş": "37.2 °C"
    },
    "exam": [
      "Taşikardi mevcut",
      "Sağ baldır çevresi sol tarafa göre artmış ve palpasyonla hassas",
      "Akciğer oskültasyonunda belirgin fokal ral yok",
      "Hemoptizi ifade edilmiyor"
    ],
    "investigations": [
      {
        "id": "ctpa",
        "label": "BT pulmoner anjiyografi",
        "type": "ct",
        "summary": "Sağ alt lob segmental pulmoner arter dalında kontrast dolum defekti izleniyor."
      },
      {
        "id": "d-dimer",
        "label": "D-dimer",
        "type": "lab",
        "rows": [
          [
            "D-dimer",
            "2.400 ng/mL FEU",
            "<500 ng/mL FEU",
            "Yüksek"
          ],
          [
            "Troponin",
            "Normal",
            "<34 ng/L",
            "Referans içinde"
          ],
          [
            "BNP",
            "Sınırda",
            "Yaşa göre değişir",
            "Sınırda"
          ]
        ]
      },
      {
        "id": "leg-usg",
        "label": "Alt ekstremite venöz Doppler ultrasonografi",
        "type": "ultrasound",
        "summary": "Sağ popliteal ven düzeyinde kompresyonla kollabe olmayan trombüs ile uyumlu segment izleniyor."
      }
    ],
    "images": [
      {
        "title": "BT pulmoner anjiyografi",
        "caption": "Pulmoner arter dallarındaki dolum defektleri akut tromboemboliyi destekler.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Pulmonary%20embolism.jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Pulmonary_embolism.jpg",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "ct",
        "relatedFinding": "Pulmoner arter dolum defekti"
      }
    ],
    "diagnosis": {
      "correct": "Akut pulmoner emboli",
      "options": [
        "Akut pulmoner emboli",
        "Primer spontan pnömotoraks",
        "Akut koroner sendrom",
        "Panik atak"
      ],
      "explanation": "Uzun uçuş ve oral kontraseptif kullanımı gibi tromboemboli riskleri, ani dispne, plöritik ağrı, taşikardi, D-dimer yüksekliği ve BT pulmoner anjiyografide dolum defekti pulmoner emboli ile uyumludur.",
      "pearls": [
        "D-dimer düşük klinik olasılıkta dışlama amacıyla daha değerlidir; yüksek olasılıkta doğrudan görüntüleme gerekir.",
        "Hemodinamik instabilite varsa masif emboli ve trombolitik tedavi açısından değerlendirme yapılır."
      ],
      "nextStep": "Risk sınıflaması sonrası antikoagülasyon başlanması; hipotansiyon veya sağ ventrikül yetmezliği varsa reperfüzyon tedavisinin değerlendirilmesi.",
      "answerFeedback": {
        "diagnosisMeta": "Pulmoner embolide klinik olasılık",
        "whyCorrect": "Uzun uçuş ve oral kontraseptif kullanımı gibi tromboemboli riskleri, ani dispne, plöritik ağrı, taşikardi, D-dimer yüksekliği ve BT pulmoner anjiyografide dolum defekti pulmoner emboli ile uyumludur.",
        "evidenceChain": [
          "Başvuru yakınması: Ani nefes darlığı ve batıcı göğüs ağrısı.",
          "Taşikardi mevcut.",
          "BT pulmoner anjiyografi: Sağ alt lob segmental pulmoner arter dalında kontrast dolum defekti izleniyor.",
          "D-dimer: D-dimer 2.400 ng/mL FEU olarak değerlendirilir."
        ],
        "pearls": [
          "D-dimer düşük klinik olasılıkta dışlama amacıyla daha değerlidir; yüksek olasılıkta doğrudan görüntüleme gerekir.",
          "Hemodinamik instabilite varsa masif emboli ve trombolitik tedavi açısından değerlendirme yapılır."
        ],
        "management": [
          "Risk sınıflaması sonrası antikoagülasyon başlanması",
          "hipotansiyon veya sağ ventrikül yetmezliği varsa reperfüzyon tedavisinin değerlendirilmesi"
        ],
        "learningOutcome": "Akut pulmoner emboli tanısında kritik nokta, tek bir bulgudan çok paternin bütününü yorumlamaktır.",
        "differentials": {
          "Primer spontan pnömotoraks": {
            "explanation": "Primer spontan pnömotoraks ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Akut pulmoner emboli lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Primer spontan pnömotoraks için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Akut pulmoner emboli tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Akut koroner sendrom": {
            "explanation": "Akut koroner sendrom ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Akut pulmoner emboli lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Akut koroner sendrom için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Akut pulmoner emboli tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Panik atak": {
            "explanation": "Panik atak ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Akut pulmoner emboli lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Panik atak için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Akut pulmoner emboli tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "pulm-pneumonia-001",
    "branchId": "pulmonology",
    "title": "Ateş, pürülan balgam ve lobar konsolidasyon",
    "difficulty": "Temel-orta · Enfeksiyon/pulmonoloji",
    "clinicalFocus": "Toplum kökenli pnömonide klinik-radyolojik tanı, ağırlık skoru ve ampirik tedavi seçimi",
    "demographics": "67 yaşında erkek",
    "setting": "Acil servis",
    "chiefComplaint": "Öksürük, ateş ve nefes almakla artan yan ağrısı",
    "stem": "KOAH öyküsü olan 67 yaşındaki erkek hasta, üç gündür ateş, titreme, pürülan balgam ve sağ yan ağrısı olduğunu ifade ediyor. Yakın zamanda hastane yatışı veya antibiyotik kullanımı olmadığı öğreniliyor.",
    "vitals": {
      "TA": "104/64 mmHg",
      "Nabız": "112/dk",
      "Solunum": "28/dk",
      "SpO2": "%90",
      "Ateş": "38.8 °C"
    },
    "exam": [
      "Sağ alt zonda inspiratuvar raller duyuluyor",
      "Aynı bölgede bronşiyal solunum sesi ve matite mevcut",
      "Solunum sayısı artmış",
      "Konfüzyon saptanmıyor"
    ],
    "investigations": [
      {
        "id": "cxr",
        "label": "Akciğer grafisi",
        "type": "xray",
        "summary": "Sağ alt lobda hava bronkogramı içeren konsolidasyon alanı izleniyor."
      },
      {
        "id": "labs",
        "label": "Laboratuvar",
        "type": "lab",
        "rows": [
          [
            "Lökosit",
            "16.700/mm³",
            "4.000-10.000/mm³",
            "Yüksek"
          ],
          [
            "CRP",
            "132 mg/L",
            "<5 mg/L",
            "Yüksek"
          ],
          [
            "Üre",
            "42 mg/dL",
            "17-43 mg/dL",
            "Referans içinde"
          ]
        ]
      },
      {
        "id": "culture",
        "label": "Mikrobiyolojik örnekleme",
        "type": "culture",
        "summary": "Ağır hastalık, yatış gereksinimi veya tedavi başarısızlığı varsa balgam Gram boyama/kültür ve kan kültürleri alınır."
      }
    ],
    "images": [
      {
        "title": "Akciğer grafisi",
        "caption": "Lokalize konsolidasyon ve hava bronkogramları bakteriyel pnömoni lehinedir.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/X-ray%20of%20lobar%20pneumonia.jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:X-ray_of_lobar_pneumonia.jpg",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "xray",
        "relatedFinding": "Lobar konsolidasyon"
      }
    ],
    "diagnosis": {
      "correct": "Toplum kökenli lobar pnömoni",
      "options": [
        "Toplum kökenli lobar pnömoni",
        "Pulmoner emboli",
        "Akut KOAH alevlenmesi",
        "Tüberküloz"
      ],
      "explanation": "Ateş, titreme, pürülan balgam, plöritik ağrı, fokal oskültasyon bulguları ve grafide hava bronkogramlı lobar konsolidasyon toplum kökenli pnömoniyi destekler.",
      "pearls": [
        "CURB-65 gibi skorlar yatış kararında yardımcıdır; tanıyı tek başına koydurmaz.",
        "KOAH alevlenmesinde enfeksiyon bulguları olabilir; ancak lobar konsolidasyon pnömoni lehinedir."
      ],
      "nextStep": "Hastalık şiddeti ve komorbiditelere göre ampirik antibiyotik tedavisi; oksijen gereksinimi ve yatış kararının değerlendirilmesi.",
      "answerFeedback": {
        "diagnosisMeta": "Toplum kökenli pnömonide klinik-radyolojik tanı",
        "whyCorrect": "Ateş, titreme, pürülan balgam, plöritik ağrı, fokal oskültasyon bulguları ve grafide hava bronkogramlı lobar konsolidasyon toplum kökenli pnömoniyi destekler.",
        "evidenceChain": [
          "Başvuru yakınması: Öksürük, ateş ve nefes almakla artan yan ağrısı.",
          "Sağ alt zonda inspiratuvar raller duyuluyor.",
          "Akciğer grafisi: Sağ alt lobda hava bronkogramı içeren konsolidasyon alanı izleniyor.",
          "Laboratuvar: Lökosit 16.700/mm³ olarak değerlendirilir."
        ],
        "pearls": [
          "CURB-65 gibi skorlar yatış kararında yardımcıdır; tanıyı tek başına koydurmaz.",
          "KOAH alevlenmesinde enfeksiyon bulguları olabilir; ancak lobar konsolidasyon pnömoni lehinedir."
        ],
        "management": [
          "Hastalık şiddeti ve komorbiditelere göre ampirik antibiyotik tedavisi",
          "oksijen gereksinimi ve yatış kararının değerlendirilmesi"
        ],
        "learningOutcome": "Toplum kökenli lobar pnömoni tanısında kritik nokta, tek bir bulgudan çok paternin bütününü yorumlamaktır.",
        "differentials": {
          "Pulmoner emboli": {
            "explanation": "Pulmoner emboli ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Toplum kökenli lobar pnömoni lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Pulmoner emboli için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Toplum kökenli lobar pnömoni tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Akut KOAH alevlenmesi": {
            "explanation": "Akut KOAH alevlenmesi ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Toplum kökenli lobar pnömoni lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Akut KOAH alevlenmesi için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Toplum kökenli lobar pnömoni tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Tüberküloz": {
            "explanation": "Tüberküloz ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Toplum kökenli lobar pnömoni lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Tüberküloz için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Toplum kökenli lobar pnömoni tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "pulm-ipf-uip-001",
    "branchId": "pulmonology",
    "title": "Aylar içinde artan efor dispnesi, kuru öksürük ve bazal ince raller",
    "difficulty": "Orta-zor · İnterstisyel akciğer hastalığı",
    "clinicalFocus": "Fibrotik interstisyel akciğer hastalığı şüphesinde yüksek çözünürlüklü BT paterni, restriktif fizyoloji ve sekonder nedenlerin dışlanması",
    "demographics": "69 yaşında erkek",
    "setting": "Göğüs hastalıkları polikliniği",
    "chiefComplaint": "Aylar içinde artan efor dispnesi ve kuru öksürük",
    "stem": "Altmış dokuz yaşındaki erkek hasta, son bir yılda merdiven çıkarken belirginleşen nefes darlığı ve kuru öksürük yakınmaları olduğunu ifade ediyor. Bağ dokusu hastalığını düşündüren eklem şişliği, Raynaud fenomeni veya belirgin çevresel maruziyet ifade etmiyor.",
    "vitals": {
      "TA": "128/76 mmHg",
      "Nabız": "88/dk",
      "Solunum": "20/dk",
      "SpO2": "%92 eforla düşüyor",
      "Ateş": "36.6 °C"
    },
    "exam": [
      "Bilateral bazal inspiratuvar ince Velcro tipi raller duyuluyor",
      "Parmaklarda çomaklaşma mevcut",
      "Wheezing belirgin değil",
      "Periferik ödem saptanmıyor"
    ],
    "investigations": [
      {
        "id": "hrct",
        "label": "Yüksek çözünürlüklü toraks BT",
        "type": "ct",
        "summary": "Bazal ve subplevral ağırlıklı retikülasyon, traksiyon bronşektazisi ve bal peteği görünümü izleniyor."
      },
      {
        "id": "pft",
        "label": "Solunum fonksiyon testi",
        "type": "lab",
        "rows": [
          [
            "FVC",
            "%62 beklenen",
            ">80",
            "Düşük"
          ],
          [
            "FEV1/FVC",
            "%86",
            ">70",
            "Referans içinde"
          ],
          [
            "DLCO",
            "%48 beklenen",
            ">80",
            "Düşük"
          ]
        ]
      },
      {
        "id": "autoimmune",
        "label": "Sekonder neden taraması",
        "type": "lab",
        "rows": [
          [
            "ANA",
            "Negatif",
            "Negatif",
            "Negatif"
          ],
          [
            "RF/anti-CCP",
            "Negatif",
            "Negatif",
            "Negatif"
          ],
          [
            "Eozinofil",
            "Normal",
            "Değişken",
            "Referans içinde"
          ]
        ]
      }
    ],
    "images": [
      {
        "title": "Akciğer histopatoloji preparatı",
        "caption": "Fibrotik heterojenite ve bal peteği alanları UIP paternini destekler.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/UIP%20(Usual%20interstitial%20pneumonia).jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:UIP_(Usual_interstitial_pneumonia).jpg",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "pathology",
        "relatedFinding": "UIP fibrotik patern"
      }
    ],
    "diagnosis": {
      "correct": "İdiyopatik pulmoner fibrozis",
      "options": [
        "İdiyopatik pulmoner fibrozis",
        "Sarkoidoz",
        "KOAH",
        "Kronik hipersensitivite pnömonisi"
      ],
      "explanation": "İleri yaş, progresif kuru öksürük ve dispne, bazal Velcro tipi raller, restriktif solunum fonksiyon paterni, düşük DLCO ve HRCT’de bazal-subplevral UIP paterni idiyopatik pulmoner fibrozisi destekler.",
      "pearls": [
        "UIP paterni; subplevral-bazal retikülasyon, traksiyon bronşektazisi ve bal peteği ile karakterizedir.",
        "Sekonder nedenler ve bağ dokusu hastalıkları dışlanmadan idiyopatik tanısı konulmamalıdır."
      ],
      "nextStep": "Multidisipliner değerlendirme; antifibrotik tedavi seçenekleri; oksijen gereksinimi ve uygun hastada transplantasyon değerlendirmesi.",
      "answerFeedback": {
        "diagnosisMeta": "Fibrotik interstisyel akciğer hastalığı şüphesinde yüksek çözünürlüklü BT paterni",
        "whyCorrect": "İleri yaş, progresif kuru öksürük ve dispne, bazal Velcro tipi raller, restriktif solunum fonksiyon paterni, düşük DLCO ve HRCT’de bazal-subplevral UIP paterni idiyopatik pulmoner fibrozisi destekler.",
        "evidenceChain": [
          "Başvuru yakınması: Aylar içinde artan efor dispnesi ve kuru öksürük.",
          "Bilateral bazal inspiratuvar ince Velcro tipi raller duyuluyor.",
          "Yüksek çözünürlüklü toraks BT: Bazal ve subplevral ağırlıklı retikülasyon, traksiyon bronşektazisi ve bal peteği görünümü izleniyor.",
          "Solunum fonksiyon testi: FVC %62 beklenen olarak değerlendirilir."
        ],
        "pearls": [
          "UIP paterni; subplevral-bazal retikülasyon, traksiyon bronşektazisi ve bal peteği ile karakterizedir.",
          "Sekonder nedenler ve bağ dokusu hastalıkları dışlanmadan idiyopatik tanısı konulmamalıdır."
        ],
        "management": [
          "Multidisipliner değerlendirme",
          "antifibrotik tedavi seçenekleri",
          "oksijen gereksinimi ve uygun hastada transplantasyon değerlendirmesi"
        ],
        "learningOutcome": "İdiyopatik pulmoner fibrozis tanısında kritik nokta, tek bir bulgudan çok paternin bütününü yorumlamaktır.",
        "differentials": {
          "Sarkoidoz": {
            "explanation": "Sarkoidoz ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni İdiyopatik pulmoner fibrozis lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Sarkoidoz için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü İdiyopatik pulmoner fibrozis tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "KOAH": {
            "explanation": "KOAH ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni İdiyopatik pulmoner fibrozis lehine daha tutarlıdır.",
            "comparisonPoints": [
              "KOAH için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü İdiyopatik pulmoner fibrozis tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Kronik hipersensitivite pnömonisi": {
            "explanation": "Kronik hipersensitivite pnömonisi ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni İdiyopatik pulmoner fibrozis lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Kronik hipersensitivite pnömonisi için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü İdiyopatik pulmoner fibrozis tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "pulm-copd-exacerbation-001",
    "branchId": "pulmonology",
    "title": "KOAH hastasında dispne, balgam pürülansı ve hiperkapnik solunum yetmezliği",
    "difficulty": "Orta · Obstrüktif akciğer hastalığı",
    "clinicalFocus": "KOAH alevlenmesinde Anthonisen bulguları, kan gazı yorumu, bronkodilatör ve noninvaziv ventilasyon endikasyonu",
    "demographics": "66 yaşında erkek",
    "setting": "Acil servis",
    "chiefComplaint": "Artan nefes darlığı ve balgam miktarı",
    "stem": "Ağır sigara öyküsü ve KOAH tanısı olan hasta, üç gündür dispnesinin arttığını, balgam miktarı ve pürülansında belirgin artış olduğunu ifade ediyor. Evde kullandığı inhaler tedaviyle rahatlamadığı öğreniliyor.",
    "vitals": {
      "TA": "136/78 mmHg",
      "Nabız": "118/dk",
      "Solunum": "32/dk",
      "SpO2": "%84 oda havası",
      "Ateş": "37.6 °C"
    },
    "exam": [
      "Yaygın ekspiratuvar ronküs ve wheezing duyuluyor",
      "Ekspirasyon süresi uzamış",
      "Yardımcı solunum kasları kullanılıyor",
      "Periferik siyanoz hafif düzeyde izleniyor"
    ],
    "investigations": [
      {
        "id": "abg",
        "label": "Arter kan gazı",
        "type": "lab",
        "rows": [
          [
            "pH",
            "7.31",
            "7.35-7.45",
            "Düşük"
          ],
          [
            "PaCO2",
            "58 mmHg",
            "35-45 mmHg",
            "Yüksek"
          ],
          [
            "PaO2",
            "55 mmHg",
            "80-100 mmHg",
            "Düşük"
          ],
          [
            "HCO3-",
            "29 mmol/L",
            "22-26 mmol/L",
            "Yüksek"
          ]
        ]
      },
      {
        "id": "cxr",
        "label": "Akciğer grafisi",
        "type": "xray",
        "summary": "Hiperinflasyon bulguları izleniyor; belirgin yeni lobar konsolidasyon saptanmıyor."
      },
      {
        "id": "labs",
        "label": "Laboratuvar",
        "type": "lab",
        "rows": [
          [
            "Lökosit",
            "12.900/mm³",
            "4.000-10.000/mm³",
            "Yüksek"
          ],
          [
            "CRP",
            "42 mg/L",
            "<5 mg/L",
            "Yüksek"
          ],
          [
            "Eozinofil",
            "%2",
            "%0-5",
            "Referans içinde"
          ]
        ]
      }
    ],
    "images": [
      {
        "title": "Akciğer grafisi",
        "caption": "Diyafram düzleşmesi ve artmış akciğer volümü kronik hava hapsini destekler.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Copd%202010.jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Copd_2010.jpg",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "xray",
        "relatedFinding": "Hiperinflasyon ve diyafram düzleşmesi"
      }
    ],
    "diagnosis": {
      "correct": "Akut KOAH alevlenmesi",
      "options": [
        "Akut KOAH alevlenmesi",
        "Kardiyojenik pulmoner ödem",
        "Pulmoner emboli",
        "Pnömotoraks"
      ],
      "explanation": "Bilinen KOAH hastasında dispne artışı, balgam miktarı ve pürülansında artış, yaygın wheezing ve hiperkapnik asidoz akut KOAH alevlenmesini destekler.",
      "pearls": [
        "pH düşüklüğü ve PaCO2 yüksekliği noninvaziv ventilasyon gereksinimini düşündürür.",
        "Kontrollü oksijen hedefi genellikle SpO2 %88-92 aralığıdır."
      ],
      "nextStep": "Kısa etkili bronkodilatörler; sistemik kortikosteroid; uygun endikasyonda antibiyotik.",
      "answerFeedback": {
        "diagnosisMeta": "KOAH alevlenmesinde Anthonisen bulguları",
        "whyCorrect": "Bilinen KOAH hastasında dispne artışı, balgam miktarı ve pürülansında artış, yaygın wheezing ve hiperkapnik asidoz akut KOAH alevlenmesini destekler.",
        "evidenceChain": [
          "Başvuru yakınması: Artan nefes darlığı ve balgam miktarı.",
          "Yaygın ekspiratuvar ronküs ve wheezing duyuluyor.",
          "Arter kan gazı: pH 7.31 olarak değerlendirilir.",
          "Akciğer grafisi: Hiperinflasyon bulguları izleniyor; belirgin yeni lobar konsolidasyon saptanmıyor."
        ],
        "pearls": [
          "pH düşüklüğü ve PaCO2 yüksekliği noninvaziv ventilasyon gereksinimini düşündürür.",
          "Kontrollü oksijen hedefi genellikle SpO2 %88-92 aralığıdır."
        ],
        "management": [
          "Kısa etkili bronkodilatörler",
          "sistemik kortikosteroid",
          "uygun endikasyonda antibiyotik"
        ],
        "learningOutcome": "Akut KOAH alevlenmesi tanısında kritik nokta, tek bir bulgudan çok paternin bütününü yorumlamaktır.",
        "differentials": {
          "Kardiyojenik pulmoner ödem": {
            "explanation": "Kardiyojenik pulmoner ödem ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Akut KOAH alevlenmesi lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Kardiyojenik pulmoner ödem için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Akut KOAH alevlenmesi tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Pulmoner emboli": {
            "explanation": "Pulmoner emboli ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Akut KOAH alevlenmesi lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Pulmoner emboli için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Akut KOAH alevlenmesi tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Pnömotoraks": {
            "explanation": "Pnömotoraks ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Akut KOAH alevlenmesi lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Pnömotoraks için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Akut KOAH alevlenmesi tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "inf-tuberculosis-001",
    "branchId": "infectious-diseases",
    "title": "Uzamış öksürük, gece terlemesi ve apikal kaviter lezyon",
    "difficulty": "Orta · Enfeksiyon hastalıkları",
    "clinicalFocus": "Pulmoner tüberkülozda kronik semptomlar, ARB yayma, kültür/moleküler test ve temaslı değerlendirmesi",
    "demographics": "44 yaşında erkek",
    "setting": "Enfeksiyon hastalıkları / Acil",
    "chiefComplaint": "Üç haftadan uzun süren öksürük ve kilo kaybı",
    "stem": "Kırk dört yaşındaki erkek hasta, gece terlemesi, iştahsızlık, 6 kg kilo kaybı ve aralıklı hemoptizi yakınmaları olduğunu ifade ediyor. Kalabalık yaşam koşulu ve daha önce tedavi almamış tüberküloz temas öyküsü bulunuyor.",
    "vitals": {
      "TA": "118/72 mmHg",
      "Nabız": "96/dk",
      "Solunum": "20/dk",
      "SpO2": "%94",
      "Ateş": "37.9 °C"
    },
    "exam": [
      "Kaşektik görünüm ve hafif ateş mevcut",
      "Sağ üst zonda solunum sesleri azalmış ve raller duyuluyor",
      "Servikal lenfadenopati saptanmıyor",
      "Hepatosplenomegali yok"
    ],
    "investigations": [
      {
        "id": "cxr",
        "label": "Akciğer grafisi",
        "type": "xray",
        "summary": "Üst zon ağırlıklı infiltrasyon ve kavitasyon ile uyumlu görünüm izleniyor."
      },
      {
        "id": "sputum",
        "label": "Balgam ARB ve moleküler inceleme",
        "type": "microscopy",
        "summary": "Balgam yaymasında aside dirençli basil görülüyor; nükleik asit amplifikasyon testi ve kültür ilaç duyarlılığı için gönderiliyor."
      },
      {
        "id": "labs",
        "label": "Laboratuvar",
        "type": "lab",
        "rows": [
          [
            "Lökosit",
            "9.800/mm³",
            "4.000-10.000/mm³",
            "Referans içinde"
          ],
          [
            "Sedimentasyon",
            "74 mm/saat",
            "<20 mm/saat",
            "Yüksek"
          ],
          [
            "HIV testi",
            "Negatif",
            "Negatif",
            "Negatif"
          ]
        ]
      }
    ],
    "images": [
      {
        "title": "Akciğer grafisi",
        "caption": "Üst lob/apikal kaviter tutulum reaktivasyon tüberkülozu için tipik bir radyolojik ipucudur.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Tuberculosis-x-ray-1.jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Tuberculosis-x-ray-1.jpg",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "xray",
        "relatedFinding": "Apikal kaviter infiltrasyon"
      }
    ],
    "diagnosis": {
      "correct": "Reaktivasyon pulmoner tüberküloz",
      "options": [
        "Reaktivasyon pulmoner tüberküloz",
        "Toplum kökenli pnömoni",
        "Akciğer absesi",
        "Pulmoner aspergilloz"
      ],
      "explanation": "Üç haftadan uzun öksürük, kilo kaybı, gece terlemesi, hemoptizi, apikal kaviter lezyon ve balgamda aside dirençli basil saptanması reaktivasyon pulmoner tüberkülozu destekler.",
      "pearls": [
        "Bulaştırıcılık açısından solunum izolasyonu ve temaslı taraması önemlidir.",
        "Kültür ve ilaç duyarlılığı tedavi yönetimi için gereklidir; ancak güçlü klinik ve mikrobiyolojik kanıt varsa tedavi geciktirilmemelidir."
      ],
      "nextStep": "Solunum izolasyonu; balgam kültürü/duyarlılık testleri ve standart dörtlü antitüberküloz tedavinin başlanması.",
      "answerFeedback": {
        "diagnosisMeta": "Pulmoner tüberkülozda kronik semptomlar",
        "whyCorrect": "Üç haftadan uzun öksürük, kilo kaybı, gece terlemesi, hemoptizi, apikal kaviter lezyon ve balgamda aside dirençli basil saptanması reaktivasyon pulmoner tüberkülozu destekler.",
        "evidenceChain": [
          "Başvuru yakınması: Üç haftadan uzun süren öksürük ve kilo kaybı.",
          "Kaşektik görünüm ve hafif ateş mevcut.",
          "Akciğer grafisi: Üst zon ağırlıklı infiltrasyon ve kavitasyon ile uyumlu görünüm izleniyor.",
          "Balgam ARB ve moleküler inceleme: Balgam yaymasında aside dirençli basil görülüyor; nükleik asit amplifikasyon testi ve kültür ilaç duyarlılığı için gönderiliyor."
        ],
        "pearls": [
          "Bulaştırıcılık açısından solunum izolasyonu ve temaslı taraması önemlidir.",
          "Kültür ve ilaç duyarlılığı tedavi yönetimi için gereklidir; ancak güçlü klinik ve mikrobiyolojik kanıt varsa tedavi geciktirilmemelidir."
        ],
        "management": [
          "Solunum izolasyonu",
          "balgam kültürü/duyarlılık testleri ve standart dörtlü antitüberküloz tedavinin başlanması"
        ],
        "learningOutcome": "Reaktivasyon pulmoner tüberküloz tanısında kritik nokta, tek bir bulgudan çok paternin bütününü yorumlamaktır.",
        "differentials": {
          "Toplum kökenli pnömoni": {
            "explanation": "Toplum kökenli pnömoni ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Reaktivasyon pulmoner tüberküloz lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Toplum kökenli pnömoni için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Reaktivasyon pulmoner tüberküloz tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Akciğer absesi": {
            "explanation": "Akciğer absesi ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Reaktivasyon pulmoner tüberküloz lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Akciğer absesi için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Reaktivasyon pulmoner tüberküloz tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Pulmoner aspergilloz": {
            "explanation": "Pulmoner aspergilloz ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Reaktivasyon pulmoner tüberküloz lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Pulmoner aspergilloz için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Reaktivasyon pulmoner tüberküloz tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "inf-malaria-001",
    "branchId": "infectious-diseases",
    "title": "Endemik bölge dönüşü ateş, trombositopeni ve intraeritrositer parazitler",
    "difficulty": "Orta · Seyahat enfeksiyonu",
    "clinicalFocus": "Sıtmada seyahat öyküsü, kalın damla-ince yayma, falciparum ağır hastalık riski ve acil tedavi",
    "demographics": "32 yaşında erkek",
    "setting": "Acil servis / Enfeksiyon",
    "chiefComplaint": "Titreme ile yükselen ateş ve yaygın halsizlik",
    "stem": "Otuz iki yaşındaki erkek hasta iki hafta önce Batı Afrika’dan döndüğünü ve kemoprofilaksi kullanmadığını belirtiyor. Ateş ataklarına baş ağrısı, miyalji, bulantı ve koyu renkli idrar eşlik ediyor.",
    "vitals": {
      "TA": "102/64 mmHg",
      "Nabız": "118/dk",
      "Solunum": "22/dk",
      "SpO2": "%97",
      "Ateş": "39.5 °C"
    },
    "exam": [
      "Ateş yüksekliği ve belirgin halsizlik izleniyor",
      "Skleralarda hafif ikter mevcut",
      "Dalak palpasyonla ele geliyor",
      "Bilinç bulanıklığı saptanmıyor"
    ],
    "investigations": [
      {
        "id": "smear",
        "label": "Kalın damla ve ince yayma",
        "type": "microscopy",
        "summary": "Eritrositler içinde halka formları ve yüksek parazitemi izleniyor; bazı eritrositlerde birden fazla halka formu dikkati çekiyor."
      },
      {
        "id": "labs",
        "label": "Laboratuvar",
        "type": "lab",
        "rows": [
          [
            "Trombosit",
            "62.000/mm³",
            "150.000-400.000/mm³",
            "Düşük"
          ],
          [
            "Hemoglobin",
            "10.9 g/dL",
            "13.5-17.5 g/dL",
            "Düşük"
          ],
          [
            "Total bilirubin",
            "2.6 mg/dL",
            "0.2-1.2 mg/dL",
            "Yüksek"
          ],
          [
            "Kreatinin",
            "1.1 mg/dL",
            "0.6-1.2 mg/dL",
            "Referans içinde"
          ]
        ]
      },
      {
        "id": "rapid",
        "label": "Hızlı antijen testi",
        "type": "lab",
        "summary": "Plasmodium antijen testi pozitif; tür ayrımı ve parazitemi için mikroskopik değerlendirme ile birlikte yorumlanır."
      }
    ],
    "images": [
      {
        "title": "Periferik yayma",
        "caption": "İnce yaymada eritrosit içi ring formları falciparum sıtması klinik yorumu destekler.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Malaria%20falciparum%20ring%20forms.jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Malaria_falciparum_ring_forms.jpg",
        "sourceName": "",
        "license": "CC BY-SA",
        "modality": "microscopy",
        "relatedFinding": "İntraeritrositer ring formları"
      }
    ],
    "diagnosis": {
      "correct": "Plasmodium falciparum sıtması",
      "options": [
        "Plasmodium falciparum sıtması",
        "Dengue ateşi",
        "Leptospiroz",
        "Tifo"
      ],
      "explanation": "Endemik bölge dönüşü ateş, kemoprofilaksi almama, trombositopeni, hemoliz bulguları ve yaymada çoklu halka formları ile yüksek parazitemi Plasmodium falciparum sıtmasını düşündürür.",
      "pearls": [
        "Falciparum sıtması hızla ağır hastalığa ilerleyebilir; tedavi geciktirilmemelidir.",
        "Tek negatif yayma tanıyı dışlamaz; şüphe sürerse tekrarlı yayma gerekir."
      ],
      "nextStep": "Hastalık ağırlığına göre artemisinin temelli tedavi; ağır sıtmada intravenöz artesunat ve organ yetmezliği izlemi.",
      "answerFeedback": {
        "diagnosisMeta": "Sıtmada seyahat öyküsü",
        "whyCorrect": "Endemik bölge dönüşü ateş, kemoprofilaksi almama, trombositopeni, hemoliz bulguları ve yaymada çoklu halka formları ile yüksek parazitemi Plasmodium falciparum sıtmasını düşündürür.",
        "evidenceChain": [
          "Başvuru yakınması: Titreme ile yükselen ateş ve yaygın halsizlik.",
          "Ateş yüksekliği ve belirgin halsizlik izleniyor.",
          "Kalın damla ve ince yayma: Eritrositler içinde halka formları ve yüksek parazitemi izleniyor; bazı eritrositlerde birden fazla halka formu dikkati çekiyor.",
          "Laboratuvar: Trombosit 62.000/mm³ olarak değerlendirilir."
        ],
        "pearls": [
          "Falciparum sıtması hızla ağır hastalığa ilerleyebilir; tedavi geciktirilmemelidir.",
          "Tek negatif yayma tanıyı dışlamaz; şüphe sürerse tekrarlı yayma gerekir."
        ],
        "management": [
          "Hastalık ağırlığına göre artemisinin temelli tedavi",
          "ağır sıtmada intravenöz artesunat ve organ yetmezliği izlemi"
        ],
        "learningOutcome": "Plasmodium falciparum sıtması tanısında kritik nokta, tek bir bulgudan çok paternin bütününü yorumlamaktır.",
        "differentials": {
          "Dengue ateşi": {
            "explanation": "Dengue ateşi ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Plasmodium falciparum sıtması lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Dengue ateşi için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Plasmodium falciparum sıtması tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Leptospiroz": {
            "explanation": "Leptospiroz ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Plasmodium falciparum sıtması lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Leptospiroz için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Plasmodium falciparum sıtması tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Tifo": {
            "explanation": "Tifo ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Plasmodium falciparum sıtması lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Tifo için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Plasmodium falciparum sıtması tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "inf-meningococcemia-001",
    "branchId": "infectious-diseases",
    "title": "Yurt öğrencisinde ateş, ense sertliği ve peteşiyal-purpural döküntü",
    "difficulty": "Acil · Menenjit/sepsis",
    "clinicalFocus": "Meningokok menenjitinde sepsis bulguları, BOS Gram boyama, izolasyon ve profilaksi",
    "demographics": "18 yaşında üniversite öğrencisi",
    "setting": "Acil servis",
    "chiefComplaint": "Yüksek ateş, şiddetli baş ağrısı ve döküntü",
    "stem": "Yurtta kalan 18 yaşındaki öğrenci ani başlayan yüksek ateş, şiddetli baş ağrısı, kusma ve bacaklarda mor döküntüler nedeniyle acil servise getiriliyor. Yakın temaslıları olduğu öğreniliyor.",
    "vitals": {
      "TA": "88/52 mmHg",
      "Nabız": "136/dk",
      "Solunum": "26/dk",
      "SpO2": "%95",
      "Ateş": "39.7 °C"
    },
    "exam": [
      "Ense sertliği ve fotofobi mevcut",
      "Alt ekstremitelerde basmakla solmayan peteşi ve purpuralar izleniyor",
      "Taşikardi ve sınırda hipotansiyon mevcut",
      "Bilinç dalgalanması gelişiyor"
    ],
    "investigations": [
      {
        "id": "csf",
        "label": "BOS incelemesi",
        "type": "lab",
        "rows": [
          [
            "Açılış basıncı",
            "Yüksek",
            "Değişken",
            "Yüksek"
          ],
          [
            "Lökosit",
            "2.200/mm³",
            "0-5/mm³",
            "Yüksek"
          ],
          [
            "Protein",
            "180 mg/dL",
            "15-45 mg/dL",
            "Yüksek"
          ],
          [
            "Glukoz",
            "24 mg/dL",
            ">45 mg/dL",
            "Düşük"
          ]
        ]
      },
      {
        "id": "gram",
        "label": "BOS Gram boyama",
        "type": "microscopy",
        "summary": "Polimorfonükleer lökositler içinde Gram negatif diplokoklar izleniyor."
      },
      {
        "id": "culture",
        "label": "Kan kültürü",
        "type": "culture",
        "summary": "Antibiyotik öncesi alınır; ancak klinik olarak güçlü şüphede antibiyotik tedavisi kültür sonucu beklenmeden başlanır."
      }
    ],
    "images": [
      {
        "title": "BOS Gram boyama",
        "caption": "Gram negatif diplokokların görülmesi meningokok menenjiti için güçlü mikrobiyolojik ipucudur.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Neisseria%20meningitidis%20CSF%20Gram%201000.jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Neisseria_meningitidis_CSF_Gram_1000.jpg",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "microscopy",
        "relatedFinding": "Gram negatif diplokoklar"
      }
    ],
    "diagnosis": {
      "correct": "Meningokok menenjiti ve meningokoksemi",
      "options": [
        "Meningokok menenjiti ve meningokoksemi",
        "Viral menenjit",
        "Pnömokok menenjiti",
        "Toksik şok sendromu"
      ],
      "explanation": "Ani ateş, meningeal irritasyon, basmakla solmayan peteşiyal-purpural döküntü ve BOS Gram boyamada Gram negatif diplokok görülmesi meningokok menenjiti/meningokoksemi ile uyumludur.",
      "pearls": [
        "Tedavi antibiyotik öncesi örnekleme ideal olsa da geciktirilmemelidir.",
        "Yakın temaslılara kemoprofilaksi verilmesi gerekir."
      ],
      "nextStep": "Damlacık izolasyonu; acil seftriakson/sefotaksim tedavisi; sepsis yönetimi ve temaslı profilaksisi.",
      "answerFeedback": {
        "diagnosisMeta": "Meningokok menenjitinde sepsis bulguları",
        "whyCorrect": "Ani ateş, meningeal irritasyon, basmakla solmayan peteşiyal-purpural döküntü ve BOS Gram boyamada Gram negatif diplokok görülmesi meningokok menenjiti/meningokoksemi ile uyumludur.",
        "evidenceChain": [
          "Başvuru yakınması: Yüksek ateş, şiddetli baş ağrısı ve döküntü.",
          "Ense sertliği ve fotofobi mevcut.",
          "BOS incelemesi: Açılış basıncı Yüksek olarak değerlendirilir.",
          "BOS Gram boyama: Polimorfonükleer lökositler içinde Gram negatif diplokoklar izleniyor."
        ],
        "pearls": [
          "Tedavi antibiyotik öncesi örnekleme ideal olsa da geciktirilmemelidir.",
          "Yakın temaslılara kemoprofilaksi verilmesi gerekir."
        ],
        "management": [
          "Damlacık izolasyonu",
          "acil seftriakson/sefotaksim tedavisi",
          "sepsis yönetimi ve temaslı profilaksisi"
        ],
        "learningOutcome": "Meningokok menenjiti ve meningokoksemi tanısında kritik nokta, tek bir bulgudan çok paternin bütününü yorumlamaktır.",
        "differentials": {
          "Viral menenjit": {
            "explanation": "Viral menenjit ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Meningokok menenjiti ve meningokoksemi lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Viral menenjit için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Meningokok menenjiti ve meningokoksemi tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Pnömokok menenjiti": {
            "explanation": "Pnömokok menenjiti ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Meningokok menenjiti ve meningokoksemi lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Pnömokok menenjiti için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Meningokok menenjiti ve meningokoksemi tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Toksik şok sendromu": {
            "explanation": "Toksik şok sendromu ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Meningokok menenjiti ve meningokoksemi lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Toksik şok sendromu için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Meningokok menenjiti ve meningokoksemi tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "inf-endocarditis-001",
    "branchId": "infectious-diseases",
    "title": "İntravenöz madde kullanımı öyküsünde uzamış ateş ve yeni üfürüm",
    "difficulty": "Orta-zor · Kardiyoenfeksiyon",
    "clinicalFocus": "İnfektif endokarditte Duke kriterleri, kan kültürü, ekokardiyografi ve sağ kalp tutulumunda septik pulmoner emboli",
    "demographics": "38 yaşında erkek",
    "setting": "Enfeksiyon hastalıkları servisi",
    "chiefComplaint": "İki haftadır ateş, halsizlik ve gece terlemesi",
    "stem": "İntravenöz madde kullanımı öyküsü olan hasta, ateş, gece terlemesi, iştahsızlık ve son günlerde gelişen nefes darlığı yakınmalarıyla başvuruyor. Göğüs ağrısı ve öksürük de ifade ediyor.",
    "vitals": {
      "TA": "118/70 mmHg",
      "Nabız": "108/dk",
      "Solunum": "20/dk",
      "SpO2": "%94",
      "Ateş": "38.6 °C"
    },
    "exam": [
      "Ateş yüksekliği mevcut",
      "Triküspit odakta yeni sistolik üfürüm duyuluyor",
      "Tırnak yatağında splinter hemoraji şüpheli",
      "Akciğerlerde dağınık raller duyuluyor"
    ],
    "investigations": [
      {
        "id": "blood-culture",
        "label": "Kan kültürleri",
        "type": "culture",
        "summary": "Farklı venlerden alınan üç kan kültüründe metisiline duyarlı Staphylococcus aureus üremesi saptanıyor."
      },
      {
        "id": "echo",
        "label": "Transtorasik/Transözofageal ekokardiyografi",
        "type": "ultrasound",
        "summary": "Triküspit kapakta hareketli vejetasyon ile uyumlu kitle izleniyor."
      },
      {
        "id": "ct",
        "label": "Toraks BT",
        "type": "ct",
        "summary": "Periferik yerleşimli, bazıları kaviter nodüler opasiteler septik pulmoner emboli ile uyumlu görünüm oluşturuyor."
      }
    ],
    "images": [
      {
        "title": "Ekokardiyografi görüntüsü",
        "caption": "Kapak üzerindeki vejetasyon bakteriyemi ve embolik komplikasyonların kaynağıdır.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Gross%20pathology%20of%20vegetation%20of%20infective%20endocarditis%2C%20annotated.jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Gross_pathology_of_vegetation_of_infective_endocarditis%2C_annotated.jpg",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "pathology",
        "relatedFinding": "Kapak vejetasyonu"
      }
    ],
    "diagnosis": {
      "correct": "Staphylococcus aureus ilişkili sağ kalp infektif endokarditi",
      "options": [
        "Staphylococcus aureus ilişkili sağ kalp infektif endokarditi",
        "Akut romatizmal ateş",
        "Viral miyokardit",
        "Toplum kökenli pnömoni"
      ],
      "explanation": "İntravenöz madde kullanımı, uzamış ateş, yeni triküspit üfürüm, tekrarlayan kan kültürlerinde Staphylococcus aureus üremesi ve ekokardiyografide vejetasyon sağ kalp infektif endokarditini destekler.",
      "pearls": [
        "S. aureus intravenöz madde kullanıcılarında akut sağ kalp endokarditinin sık etkenlerindendir.",
        "Sağ kalp tutulumunda septik pulmoner emboliler görülebilir."
      ],
      "nextStep": "Antibiyotik duyarlılığına göre intravenöz antistafilokokal tedavi; komplikasyon ve cerrahi endikasyonların değerlendirilmesi.",
      "answerFeedback": {
        "diagnosisMeta": "İnfektif endokarditte Duke kriterleri",
        "whyCorrect": "İntravenöz madde kullanımı, uzamış ateş, yeni triküspit üfürüm, tekrarlayan kan kültürlerinde Staphylococcus aureus üremesi ve ekokardiyografide vejetasyon sağ kalp infektif endokarditini destekler.",
        "evidenceChain": [
          "Başvuru yakınması: İki haftadır ateş, halsizlik ve gece terlemesi.",
          "Ateş yüksekliği mevcut.",
          "Kan kültürleri: Farklı venlerden alınan üç kan kültüründe metisiline duyarlı Staphylococcus aureus üremesi saptanıyor.",
          "Transtorasik/Transözofageal ekokardiyografi: Triküspit kapakta hareketli vejetasyon ile uyumlu kitle izleniyor."
        ],
        "pearls": [
          "S. aureus intravenöz madde kullanıcılarında akut sağ kalp endokarditinin sık etkenlerindendir.",
          "Sağ kalp tutulumunda septik pulmoner emboliler görülebilir."
        ],
        "management": [
          "Antibiyotik duyarlılığına göre intravenöz antistafilokokal tedavi",
          "komplikasyon ve cerrahi endikasyonların değerlendirilmesi"
        ],
        "learningOutcome": "Staphylococcus aureus ilişkili sağ kalp infektif endokarditi tanısında kritik nokta, tek bir bulgudan çok paternin bütününü yorumlamaktır.",
        "differentials": {
          "Akut romatizmal ateş": {
            "explanation": "Akut romatizmal ateş ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Staphylococcus aureus ilişkili sağ kalp infektif endokarditi lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Akut romatizmal ateş için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Staphylococcus aureus ilişkili sağ kalp infektif endokarditi tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Viral miyokardit": {
            "explanation": "Viral miyokardit ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Staphylococcus aureus ilişkili sağ kalp infektif endokarditi lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Viral miyokardit için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Staphylococcus aureus ilişkili sağ kalp infektif endokarditi tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Toplum kökenli pnömoni": {
            "explanation": "Toplum kökenli pnömoni ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Staphylococcus aureus ilişkili sağ kalp infektif endokarditi lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Toplum kökenli pnömoni için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Staphylococcus aureus ilişkili sağ kalp infektif endokarditi tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "ortho-colles-001",
    "branchId": "orthopedics",
    "title": "Açık el üzerine düşme sonrası çatal sırtı deformitesi",
    "difficulty": "Temel · Ortopedi travma",
    "clinicalFocus": "Distal radius kırığında travma mekanizması, deformite, nörovasküler muayene ve redüksiyon sonrası kontrol",
    "demographics": "67 yaşında kadın",
    "setting": "Acil servis",
    "chiefComplaint": "Düşme sonrası el bileğinde ağrı ve şekil bozukluğu",
    "stem": "Osteoporoz öyküsü olan 67 yaşındaki kadın hasta, avuç içi yere bakacak şekilde açık el üzerine düştükten sonra el bileğinde ağrı, şişlik ve şekil bozukluğu geliştiğini ifade ediyor.",
    "vitals": {
      "TA": "132/78 mmHg",
      "Nabız": "88/dk",
      "Solunum": "16/dk",
      "SpO2": "%98",
      "Ateş": "36.6 °C"
    },
    "exam": [
      "El bileği distal radius düzeyinde şiş ve hassas",
      "Çatal sırtı deformitesi izleniyor",
      "Parmak hareketleri ağrılı ancak korunmuş",
      "Median sinir duyusu ve radial-ulnar nabızlar değerlendirilerek kayıt altına alınıyor"
    ],
    "investigations": [
      {
        "id": "xray",
        "label": "El bileği direkt grafisi",
        "type": "xray",
        "summary": "Distal radius metafizinde kırık hattı, dorsal açılanma ve dorsal deplasman ile uyumlu görünüm izleniyor."
      },
      {
        "id": "neurovascular",
        "label": "Nörovasküler değerlendirme",
        "type": "clinical",
        "summary": "Redüksiyon öncesi ve sonrası median sinir fonksiyonu, kapiller dolum ve radial/ulnar nabızlar değerlendirilmelidir."
      },
      {
        "id": "bone",
        "label": "Osteoporoz değerlendirmesi",
        "type": "clinical",
        "summary": "Düşük enerjili fragilite kırığı nedeniyle osteoporoz ve düşme riski açısından ileri değerlendirme planlanır."
      }
    ],
    "images": [
      {
        "title": "El bileği grafisi",
        "caption": "Distal radius kırığında dorsal angulasyon klasik “dinner fork” deformitesine yol açar.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Colles'%20Fracture%20of%20Radius.jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Colles'_Fracture_of_Radius.jpg",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "xray",
        "relatedFinding": "Dorsal açılanmalı distal radius kırığı"
      }
    ],
    "diagnosis": {
      "correct": "Colles tipi distal radius kırığı",
      "options": [
        "Colles tipi distal radius kırığı",
        "Smith kırığı",
        "Skafoid kırığı",
        "Barton kırığı"
      ],
      "explanation": "Açık el üzerine düşme sonrası distal radius kırığına dorsal açılanma/deplasman ve çatal sırtı deformitesinin eşlik etmesi Colles kırığı ile uyumludur.",
      "pearls": [
        "Smith kırığında distal fragman volar yöne deplase olur.",
        "Distal radius kırıklarında median sinir basısı açısından nörovasküler muayene önemlidir."
      ],
      "nextStep": "Analjezi; kapalı redüksiyon ve immobilizasyon; instabil veya eklem içi kırıkta ortopedik cerrahi değerlendirme.",
      "answerFeedback": {
        "diagnosisMeta": "Distal radius kırığında travma mekanizması",
        "whyCorrect": "Açık el üzerine düşme sonrası distal radius kırığına dorsal açılanma/deplasman ve çatal sırtı deformitesinin eşlik etmesi Colles kırığı ile uyumludur.",
        "evidenceChain": [
          "Başvuru yakınması: Düşme sonrası el bileğinde ağrı ve şekil bozukluğu.",
          "El bileği distal radius düzeyinde şiş ve hassas.",
          "El bileği direkt grafisi: Distal radius metafizinde kırık hattı, dorsal açılanma ve dorsal deplasman ile uyumlu görünüm izleniyor.",
          "Nörovasküler değerlendirme: Redüksiyon öncesi ve sonrası median sinir fonksiyonu, kapiller dolum ve radial/ulnar nabızlar değerlendirilmelidir."
        ],
        "pearls": [
          "Smith kırığında distal fragman volar yöne deplase olur.",
          "Distal radius kırıklarında median sinir basısı açısından nörovasküler muayene önemlidir."
        ],
        "management": [
          "Analjezi",
          "kapalı redüksiyon ve immobilizasyon",
          "instabil veya eklem içi kırıkta ortopedik cerrahi değerlendirme"
        ],
        "learningOutcome": "Colles tipi distal radius kırığı tanısında kritik nokta, tek bir bulgudan çok paternin bütününü yorumlamaktır.",
        "differentials": {
          "Smith kırığı": {
            "explanation": "Smith kırığı ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Colles tipi distal radius kırığı lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Smith kırığı için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Colles tipi distal radius kırığı tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Skafoid kırığı": {
            "explanation": "Skafoid kırığı ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Colles tipi distal radius kırığı lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Skafoid kırığı için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Colles tipi distal radius kırığı tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Barton kırığı": {
            "explanation": "Barton kırığı ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Colles tipi distal radius kırığı lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Barton kırığı için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Colles tipi distal radius kırığı tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "ortho-femoral-neck-001",
    "branchId": "orthopedics",
    "title": "Düşük enerjili düşme sonrası kalça ağrısı, kısalık ve dış rotasyon",
    "difficulty": "Temel-orta · Ortopedik acil",
    "clinicalFocus": "Yaşlı hastada femur boyun kırığı, intrakapsüler kırık riski, avasküler nekroz ve cerrahi seçenekler",
    "demographics": "78 yaşında kadın",
    "setting": "Acil servis",
    "chiefComplaint": "Kalça ağrısı ve yürüyememe",
    "stem": "Yetmiş sekiz yaşındaki kadın hasta, ev içinde düşük enerjili düşme sonrasında ayağa kalkamadığını ve kalça ağrısının belirgin olduğunu ifade ediyor. Osteoporoz ve hipertansiyon öyküsü mevcut.",
    "vitals": {
      "TA": "138/80 mmHg",
      "Nabız": "94/dk",
      "Solunum": "18/dk",
      "SpO2": "%97",
      "Ateş": "36.7 °C"
    },
    "exam": [
      "Etkilenen ekstremite kısa ve dış rotasyonda duruyor",
      "Kalça hareketleri ağrılı ve kısıtlı",
      "Aksiyel yüklenmeyle ağrı artıyor",
      "Distal nabızlar ve duyu muayenesi korunmuş"
    ],
    "investigations": [
      {
        "id": "xray",
        "label": "Pelvis ve kalça direkt grafisi",
        "type": "xray",
        "summary": "Femur boynu subkapital bölgesinde intrakapsüler kırık hattı ve deplasman ile uyumlu görünüm izleniyor."
      },
      {
        "id": "labs",
        "label": "Preoperatif laboratuvar",
        "type": "lab",
        "rows": [
          [
            "Hemoglobin",
            "11.2 g/dL",
            "12-16 g/dL",
            "Düşük"
          ],
          [
            "Kreatinin",
            "0.9 mg/dL",
            "0.6-1.2 mg/dL",
            "Referans içinde"
          ],
          [
            "INR",
            "1.0",
            "0.8-1.2",
            "Referans içinde"
          ]
        ]
      },
      {
        "id": "risk",
        "label": "Komplikasyon değerlendirmesi",
        "type": "clinical",
        "summary": "İntrakapsüler kırıklarda femur başı kanlanması bozulabileceğinden avasküler nekroz ve kaynamama riski dikkate alınır."
      }
    ],
    "images": [
      {
        "title": "Kalça grafisi",
        "caption": "Direkt grafide femur boynunda kırık hattı ve impaksiyon yaşlı hastada acil ortopedik değerlendirme gerektirir.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/X-ray%20of%20mildly%20compressed%20hip%20fracture.jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:X-ray_of_mildly_compressed_hip_fracture.jpg",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "xray",
        "relatedFinding": "Femur boynunda kırık hattı"
      }
    ],
    "diagnosis": {
      "correct": "Subkapital intrakapsüler femur boyun kırığı",
      "options": [
        "Subkapital intrakapsüler femur boyun kırığı",
        "İntertrokanterik femur kırığı",
        "Kalça çıkığı",
        "Pubis kolu kırığı"
      ],
      "explanation": "Düşük enerjili düşme sonrası kalça ağrısı, yürüyememe, ekstremitede kısalık-dış rotasyon ve grafide subkapital intrakapsüler kırık femur boyun kırığı ile uyumludur.",
      "pearls": [
        "Femur boyun kırıkları intrakapsüler olduğu için femur başı kanlanması açısından risklidir.",
        "Yaşlı ve deplase kırıklarda artroplasti seçenekleri sıklıkla değerlendirilir."
      ],
      "nextStep": "Analjezi; immobilizasyon; cerrahi risk değerlendirmesi ve erken ortopedik cerrahi planlama.",
      "answerFeedback": {
        "diagnosisMeta": "Yaşlı hastada femur boyun kırığı",
        "whyCorrect": "Düşük enerjili düşme sonrası kalça ağrısı, yürüyememe, ekstremitede kısalık-dış rotasyon ve grafide subkapital intrakapsüler kırık femur boyun kırığı ile uyumludur.",
        "evidenceChain": [
          "Başvuru yakınması: Kalça ağrısı ve yürüyememe.",
          "Etkilenen ekstremite kısa ve dış rotasyonda duruyor.",
          "Pelvis ve kalça direkt grafisi: Femur boynu subkapital bölgesinde intrakapsüler kırık hattı ve deplasman ile uyumlu görünüm izleniyor.",
          "Preoperatif laboratuvar: Hemoglobin 11.2 g/dL olarak değerlendirilir."
        ],
        "pearls": [
          "Femur boyun kırıkları intrakapsüler olduğu için femur başı kanlanması açısından risklidir.",
          "Yaşlı ve deplase kırıklarda artroplasti seçenekleri sıklıkla değerlendirilir."
        ],
        "management": [
          "Analjezi",
          "immobilizasyon",
          "cerrahi risk değerlendirmesi ve erken ortopedik cerrahi planlama"
        ],
        "learningOutcome": "Subkapital intrakapsüler femur boyun kırığı tanısında kritik nokta, tek bir bulgudan çok paternin bütününü yorumlamaktır.",
        "differentials": {
          "İntertrokanterik femur kırığı": {
            "explanation": "İntertrokanterik femur kırığı ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Subkapital intrakapsüler femur boyun kırığı lehine daha tutarlıdır.",
            "comparisonPoints": [
              "İntertrokanterik femur kırığı için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Subkapital intrakapsüler femur boyun kırığı tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Kalça çıkığı": {
            "explanation": "Kalça çıkığı ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Subkapital intrakapsüler femur boyun kırığı lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Kalça çıkığı için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Subkapital intrakapsüler femur boyun kırığı tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Pubis kolu kırığı": {
            "explanation": "Pubis kolu kırığı ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Subkapital intrakapsüler femur boyun kırığı lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Pubis kolu kırığı için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Subkapital intrakapsüler femur boyun kırığı tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "ortho-scaphoid-001",
    "branchId": "orthopedics",
    "title": "El bileği travması sonrası anatomik enfiye çukuru hassasiyeti",
    "difficulty": "Temel-orta · Ortopedi travma",
    "clinicalFocus": "Skafoid kırığında ilk grafi normal olabilirliği, immobilizasyon ve avasküler nekroz riski",
    "demographics": "26 yaşında erkek",
    "setting": "Acil servis",
    "chiefComplaint": "Düşme sonrası radial taraflı el bileği ağrısı",
    "stem": "Yirmi altı yaşındaki erkek hasta, kaykaydan açık el üzerine düştükten sonra el bileğinin radial tarafında ağrı geliştiğini ifade ediyor. İlk başvuru grafisinde belirgin kırık hattı izlenmediği halde ağrısı devam ediyor.",
    "vitals": {
      "TA": "122/76 mmHg",
      "Nabız": "82/dk",
      "Solunum": "14/dk",
      "SpO2": "%99",
      "Ateş": "36.5 °C"
    },
    "exam": [
      "Anatomik enfiye çukurunda belirgin hassasiyet mevcut",
      "Başparmak aksiyel kompresyonu ağrılı",
      "El bileği ekstansiyonu ağrılı ve kısıtlı",
      "Nörovasküler muayene normal"
    ],
    "investigations": [
      {
        "id": "xray",
        "label": "Skafoid grafileri",
        "type": "xray",
        "summary": "İlk grafilerde kırık hattı seçilemeyebilir; özel skafoid projeksiyonları ve kontrol grafileri gerekebilir."
      },
      {
        "id": "mri",
        "label": "El bileği MR",
        "type": "mri",
        "summary": "Klinik şüphe yüksekse erken dönemde okült skafoid kırığını göstermek için kullanılabilir."
      },
      {
        "id": "immobilization",
        "label": "İlk yaklaşım",
        "type": "management",
        "summary": "Klinik şüphe yüksek olduğunda görüntüleme negatif olsa bile başparmak destekli kısa kol ateli ile immobilizasyon uygulanır."
      }
    ],
    "images": [
      {
        "title": "El bileği grafisi",
        "caption": "Skafoid belindeki kırık hattı başlangıç grafilerinde silik olabilir; klinik hassasiyet önemlidir.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/X-ray%20of%20scaphoid%20fracture.png",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:X-ray_of_scaphoid_fracture.png",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "xray",
        "relatedFinding": "Skafoid waist kırığı"
      }
    ],
    "diagnosis": {
      "correct": "Skafoid kırığı",
      "options": [
        "Skafoid kırığı",
        "Distal radius kırığı",
        "De Quervain tenosinoviti",
        "Triangüler fibrokartilaj kompleks yaralanması"
      ],
      "explanation": "Açık el üzerine düşme sonrası anatomik enfiye çukuru hassasiyeti ve başparmak aksiyel yüklenme ağrısı, ilk grafi normal olsa bile skafoid kırığı açısından yüksek şüphe oluşturur.",
      "pearls": [
        "Skafoidin proksimal kutbu retrograd kanlandığı için avasküler nekroz riski taşır.",
        "Negatif ilk grafi skafoid kırığını dışlamaz."
      ],
      "nextStep": "Başparmak destekli immobilizasyon; erken MR veya 10-14 gün sonra kontrol grafisi; deplase kırıkta ortopedik cerrahi değerlendirme.",
      "answerFeedback": {
        "diagnosisMeta": "Skafoid kırığında ilk grafi normal olabilirliği",
        "whyCorrect": "Açık el üzerine düşme sonrası anatomik enfiye çukuru hassasiyeti ve başparmak aksiyel yüklenme ağrısı, ilk grafi normal olsa bile skafoid kırığı açısından yüksek şüphe oluşturur.",
        "evidenceChain": [
          "Başvuru yakınması: Düşme sonrası radial taraflı el bileği ağrısı.",
          "Anatomik enfiye çukurunda belirgin hassasiyet mevcut.",
          "Skafoid grafileri: İlk grafilerde kırık hattı seçilemeyebilir; özel skafoid projeksiyonları ve kontrol grafileri gerekebilir.",
          "El bileği MR: Klinik şüphe yüksekse erken dönemde okült skafoid kırığını göstermek için kullanılabilir."
        ],
        "pearls": [
          "Skafoidin proksimal kutbu retrograd kanlandığı için avasküler nekroz riski taşır.",
          "Negatif ilk grafi skafoid kırığını dışlamaz."
        ],
        "management": [
          "Başparmak destekli immobilizasyon",
          "erken MR veya 10-14 gün sonra kontrol grafisi",
          "deplase kırıkta ortopedik cerrahi değerlendirme"
        ],
        "learningOutcome": "Skafoid kırığı tanısında kritik nokta, tek bir bulgudan çok paternin bütününü yorumlamaktır.",
        "differentials": {
          "Distal radius kırığı": {
            "explanation": "Distal radius kırığı ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Skafoid kırığı lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Distal radius kırığı için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Skafoid kırığı tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "De Quervain tenosinoviti": {
            "explanation": "De Quervain tenosinoviti ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Skafoid kırığı lehine daha tutarlıdır.",
            "comparisonPoints": [
              "De Quervain tenosinoviti için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Skafoid kırığı tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Triangüler fibrokartilaj kompleks yaralanması": {
            "explanation": "Triangüler fibrokartilaj kompleks yaralanması ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Skafoid kırığı lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Triangüler fibrokartilaj kompleks yaralanması için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Skafoid kırığı tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "ortho-shoulder-dislocation-001",
    "branchId": "orthopedics",
    "title": "Travma sonrası omuz kontur kaybı ve hareket kısıtlılığı",
    "difficulty": "Temel-orta · Ortopedi travma",
    "clinicalFocus": "Travmatik omuz yaralanmasında mekanizma, deformite, aksiller sinir muayenesi ve redüksiyon sonrası görüntüleme",
    "demographics": "21 yaşında erkek",
    "setting": "Acil servis",
    "chiefComplaint": "Omuzda şiddetli ağrı ve hareket ettirememe",
    "stem": "Yirmi bir yaşındaki erkek hasta, basketbol oynarken kolu abduksiyon ve dış rotasyondayken düşmesi sonrası omuzunda ani ağrı ve hareket kısıtlılığı geliştiğini ifade ediyor.",
    "vitals": {
      "TA": "124/78 mmHg",
      "Nabız": "90/dk",
      "Solunum": "16/dk",
      "SpO2": "%99",
      "Ateş": "36.6 °C"
    },
    "exam": [
      "Omuz konturu düzleşmiş, deltoid kabarıklığı kaybolmuş",
      "Kol hafif abduksiyon ve dış rotasyonda tutuluyor",
      "Humerus başı anterior-inferior yerleşimli palpe ediliyor",
      "Aksiller sinir duyusu ve distal nörovasküler durum redüksiyon öncesi değerlendiriliyor"
    ],
    "investigations": [
      {
        "id": "xray",
        "label": "Omuz direkt grafisi",
        "type": "xray",
        "summary": "Humerus başı glenoid kaviteye göre anterior-inferior yer değiştirmiştir; belirgin eşlik eden kırık hattı izlenmez."
      },
      {
        "id": "neurovascular",
        "label": "Nörovasküler muayene",
        "type": "clinical",
        "summary": "Deltoid bölge duyusu, deltoid kas fonksiyonu ve distal dolaşım redüksiyon öncesi ve sonrası kayıt altına alınır."
      },
      {
        "id": "post-reduction",
        "label": "Redüksiyon sonrası kontrol",
        "type": "xray",
        "summary": "Başarılı redüksiyonun ve eşlik eden Hill-Sachs veya Bankart lezyonu gibi kemik yaralanmalarının değerlendirilmesi için kontrol grafisi çekilir."
      }
    ],
    "images": [
      {
        "title": "Omuz grafisi",
        "caption": "Humerus başının glenoide göre anterior-inferior yer değiştirmesi en sık omuz çıkığı tipidir.",
        "imageUrl": "https://commons.wikimedia.org/wiki/Special:FilePath/Shoulder%20dislocation%2C%20anteroposterior%20before%20reduction.jpg",
        "sourceUrl": "https://commons.wikimedia.org/wiki/File:Shoulder_dislocation%2C_anteroposterior_before_reduction.jpg",
        "sourceName": "",
        "license": "open access / license review recommended",
        "modality": "xray",
        "relatedFinding": "Anterior-inferior humerus başı yer değiştirmesi"
      }
    ],
    "diagnosis": {
      "correct": "Anterior glenohumeral çıkık",
      "options": [
        "Anterior glenohumeral çıkık",
        "Akromioklaviküler ayrışma",
        "Proksimal humerus kırığı",
        "Rotator manşet yırtığı"
      ],
      "explanation": "Abduksiyon-dış rotasyon mekanizması, omuz konturunun kaybolması, kolun abduksiyon/dış rotasyonda tutulması ve grafide humerus başının anterior-inferior yerleşimi anterior glenohumeral çıkığı destekler.",
      "pearls": [
        "Anterior omuz çıkığında aksiller sinir yaralanması özellikle sorgulanmalıdır.",
        "Redüksiyon öncesi ve sonrası nörovasküler muayene belgelenmelidir."
      ],
      "nextStep": "Analjezi/sedasyon altında kapalı redüksiyon; redüksiyon sonrası kontrol grafisi ve immobilizasyon-rehabilitasyon planı.",
      "answerFeedback": {
        "diagnosisMeta": "Travmatik omuz yaralanmasında mekanizma",
        "whyCorrect": "Abduksiyon-dış rotasyon mekanizması, omuz konturunun kaybolması, kolun abduksiyon/dış rotasyonda tutulması ve grafide humerus başının anterior-inferior yerleşimi anterior glenohumeral çıkığı destekler.",
        "evidenceChain": [
          "Başvuru yakınması: Omuzda şiddetli ağrı ve hareket ettirememe.",
          "Omuz konturu düzleşmiş, deltoid kabarıklığı kaybolmuş.",
          "Omuz direkt grafisi: Humerus başı glenoid kaviteye göre anterior-inferior yer değiştirmiştir; belirgin eşlik eden kırık hattı izlenmez.",
          "Nörovasküler muayene: Deltoid bölge duyusu, deltoid kas fonksiyonu ve distal dolaşım redüksiyon öncesi ve sonrası kayıt altına alınır."
        ],
        "pearls": [
          "Anterior omuz çıkığında aksiller sinir yaralanması özellikle sorgulanmalıdır.",
          "Redüksiyon öncesi ve sonrası nörovasküler muayene belgelenmelidir."
        ],
        "management": [
          "Analjezi/sedasyon altında kapalı redüksiyon",
          "redüksiyon sonrası kontrol grafisi ve immobilizasyon-rehabilitasyon planı"
        ],
        "learningOutcome": "Anterior glenohumeral çıkık tanısında kritik nokta, tek bir bulgudan çok paternin bütününü yorumlamaktır.",
        "differentials": {
          "Akromioklaviküler ayrışma": {
            "explanation": "Akromioklaviküler ayrışma ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Anterior glenohumeral çıkık lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Akromioklaviküler ayrışma için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Anterior glenohumeral çıkık tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Proksimal humerus kırığı": {
            "explanation": "Proksimal humerus kırığı ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Anterior glenohumeral çıkık lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Proksimal humerus kırığı için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Anterior glenohumeral çıkık tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          },
          "Rotator manşet yırtığı": {
            "explanation": "Rotator manşet yırtığı ayırıcı tanıda düşünülebilir; ancak bu olguda başvuru zamanı, muayene bulguları ve tetkik paterni Anterior glenohumeral çıkık lehine daha tutarlıdır.",
            "comparisonPoints": [
              "Rotator manşet yırtığı için beklenen karar verdirici bulgular bu olguda baskın değildir.",
              "Olgunun ana tetkik ve klinik örüntüsü Anterior glenohumeral çıkık tanısını daha güçlü destekler.",
              "İlk yönetim seçilen alternatiften farklı bir aciliyet ve tedavi hattı gerektirir."
            ]
          }
        }
      }
    }
  }
];

export function getCasesByBranch(branchId) {
  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);
}

export function getCaseById(id) {
  return cases.find((clinicalCase) => clinicalCase.id === id);
}
