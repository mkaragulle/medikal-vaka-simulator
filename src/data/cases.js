// KlinikIQ vaka verisi: TUS odaklı, klinik karar verdirici ve objektif tetkik sonuçlarıyla yapılandırılmıştır.
// Not: ÖSYM/TUS soru metinleri kopyalanmamış; vakalar özgün eğitim senaryoları olarak yazılmıştır.

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
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Hastanın anksiyöz ve diaforetik olduğu izleniyor",
      "Kalp sesleri ritmik; belirgin ek ses veya üfürüm duyulmuyor",
      "Akciğer oskültasyonunda yaygın ral saptanmıyor",
      "Periferik nabızlar bilateral simetrik alınıyor",
      "Periferik nabızlar bilateral palpabl; belirgin periferik siyanoz veya soğukluk saptanmıyor."
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
        ],
        "priority": "useful",
        "rows": [
          [
            "12 derivasyon EKG",
            "V2-V5 derivasyonlarında belirgin ST segment elevasyonu, inferior derivasyonlarda karşılıklı ST segment depresyonu izleniyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
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
        ],
        "priority": "useful",
        "summary": "hs-Troponin I: 188 ng/L (Yüksek); CK-MB: 23 ng/mL (Yüksek) saptandı.",
        "findings": [
          "hs-Troponin I: 188 ng/L (Yüksek); CK-MB: 23 ng/mL (Yüksek) saptandı."
        ]
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
          "Soğuk terleme ve bulantı gibi otonom semptomlar akut koroner sendrom ihtimalini artırır.",
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
          "Ritim, kan basıncı ve oksijenizasyonu sürekli izle",
          "EKG’de anterior STEMI paterni olduğu için primer perkütan koroner girişim endikasyonu oluştu; biyobelirteç tekrarını bekleme gereksinimi yok. Acil reperfüzyon kararı EKG ile verildi. Merkez gecikmesi varsa fibrinolitik algoritma gündeme alınır."
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
    "stem": "Kontrolsüz hipertansiyon öyküsü bulunan hasta, ağrının aniden başladığını ve başlangıç anında maksimum şiddete ulaştığını ifade ediyor. Sağ üst ekstremiteden ölçülen kan basıncının sol üst ekstremiteye göre daha düşük olduğu, ağrıya senkop veya travmanın eşlik etmediği öğreniliyor. Ani maksimum şiddette ağrı, ekstremiteler arası nabız veya kan basıncı farkı ve yeni diyastolik üfürüm akut aort sendromu ihtimalini artırır. Ani maksimum şiddette ağrı, ekstremiteler arası nabız veya kan basıncı farkı ve yeni diyastolik üfürüm akut aort sendromu ihtimalini artırır.",
    "vitals": {
      "TA": "190/108 mmHg",
      "Nabız": "112/dk",
      "Solunum": "22/dk",
      "SpO2": "%97",
      "Ateş": "36.6 °C"
    },
    "exam": [
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Sağ radial nabız sol tarafa göre daha zayıf alınıyor",
      "Aort odağında yeni başlayan erken diyastolik üfürüm duyuluyor",
      "Fokal nörolojik defisit saptanmıyor",
      "Göğüs duvarında palpasyonla hassasiyet izlenmiyor",
      "Periferik nabızlar bilateral palpabl; belirgin periferik siyanoz veya soğukluk saptanmıyor."
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
        ],
        "priority": "useful",
        "rows": [
          [
            "Kontrastlı toraks BT anjiyografi",
            "Asendan aortadan başlayarak arkus düzeyine uzanan intimal flap ve gerçek-yalancı lümen ayrımı izleniyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "labs",
        "label": "Tam kan sayımı ve biyokimya paneli",
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
        ],
        "priority": "useful",
        "summary": "D-dimer: Yüksek (Yüksek) saptandı.",
        "findings": [
          "D-dimer: Yüksek (Yüksek) saptandı."
        ]
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
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Juguler venöz dolgunluk belirgin izleniyor",
      "Kalp sesleri derinden ve azalmış şiddette duyuluyor",
      "Pulsus paradoxus 16 mmHg olarak ölçülüyor",
      "Akciğer oskültasyonunda belirgin ral duyulmuyor",
      "Periferik nabızlar bilateral palpabl; belirgin periferik siyanoz veya soğukluk saptanmıyor."
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
        ],
        "priority": "useful",
        "rows": [
          [
            "Yatak başı transtorasik ekokardiyografi",
            "Geniş perikardiyal efüzyon, sağ atriyum ve sağ ventrikül diyastolik kollapsı, inferior vena kavada dilatasyon ve inspiratuvar kollaps azalması izleniyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "ecg",
        "label": "12 derivasyon EKG",
        "type": "ecg",
        "summary": "Sinüs taşikardisi, düşük voltajlı QRS kompleksleri ve elektriksel alternans izlendi.",
        "priority": "useful",
        "findings": [
          "Sinüs taşikardisi",
          "Düşük voltajlı QRS kompleksleri",
          "Elektriksel alternans paterni"
        ],
        "rows": [
          [
            "12 derivasyon EKG",
            "Sinüs taşikardisi, düşük voltaj ve elektriksel alternans",
            "Normal sinüs ritmi",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "labs",
        "label": "Tam kan sayımı ve biyokimya paneli",
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
        ],
        "priority": "useful",
        "summary": "Lökosit: 11.200/mm³ (Yüksek); hs-Troponin I: Hafif yüksek (Yüksek); CRP: 42 mg/L (Yüksek) saptandı.",
        "findings": [
          "Lökosit: 11.200/mm³ (Yüksek); hs-Troponin I: Hafif yüksek (Yüksek); CRP: 42 mg/L (Yüksek) saptandı."
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
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Bilateral bazal ve orta zonlara yayılan ince raller duyuluyor",
      "S3 gallop mevcut",
      "Pretibial +2 gode bırakan ödem saptanıyor",
      "Juguler venöz dolgunluk izleniyor",
      "Periferik nabızlar bilateral palpabl; belirgin periferik siyanoz veya soğukluk saptanmıyor."
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
        ],
        "priority": "useful",
        "rows": [
          [
            "Akciğer grafisi",
            "Kardiyomegali, pulmoner vasküler redistribüsyon, Kerley B çizgileri ve bilateral perihiler alveoler-interstisyel opasiteler izleniyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "labs",
        "label": "Tam kan sayımı ve biyokimya paneli",
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
        ],
        "priority": "useful",
        "summary": "NT-proBNP: 6.400 pg/mL (Yüksek); Sodyum: 132 mmol/L (Düşük); hs-Troponin I: Hafif yüksek (Yüksek) saptandı.",
        "findings": [
          "NT-proBNP: 6.400 pg/mL (Yüksek); Sodyum: 132 mmol/L (Düşük); hs-Troponin I: Hafif yüksek (Yüksek) saptandı."
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
        ],
        "priority": "useful",
        "summary": "pH: 7.47 (Yüksek); PaO2: 56 mmHg (Düşük); PaCO2: 31 mmHg (Düşük) saptandı.",
        "findings": [
          "pH: 7.47 (Yüksek); PaO2: 56 mmHg (Düşük); PaCO2: 31 mmHg (Düşük) saptandı."
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
      "Genel durum stabil; hasta uyanık, koopere ve belirgin akut toksik görünümde değil.",
      "Sol sternal kenarda sistolik ejeksiyon üfürümü duyuluyor",
      "Üfürüm Valsalva manevrası ve ayakta durma ile artıyor, çömelme ile azalıyor",
      "S4 duyulabiliyor",
      "Periferik siyanoz veya kalp yetersizliği bulgusu saptanmıyor",
      "Efor sonrası dinlenme halinde belirgin dispne veya akciğer ral bulgusu yok; periferik perfüzyon korunmuş."
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
        ],
        "priority": "useful",
        "rows": [
          [
            "Transtorasik ekokardiyografi",
            "Asimetrik septal hipertrofi, sistolik anterior mitral kapak hareketi ve dinamik sol ventrikül çıkış yolu gradiyenti saptanıyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "ecg",
        "label": "12 derivasyon EKG",
        "type": "ecg",
        "summary": "Sol ventrikül hipertrofisi voltaj kriterleri ve lateral derivasyonlarda repolarizasyon değişiklikleri izleniyor.",
        "priority": "useful",
        "findings": [
          "Sol ventrikül hipertrofisi voltaj kriterleri ve lateral derivasyonlarda repolarizasyon değişiklikleri izleniyor."
        ],
        "rows": [
          [
            "12 derivasyon EKG",
            "Sol ventrikül hipertrofisi voltaj kriterleri ve lateral derivasyonlarda repolarizasyon değişiklikleri izleniyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
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
          "Ailede ani kardiyak ölüm öyküsü kalıtsal kardiyomiyopati ihtimalini artırır.",
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
      "Genel durum orta-kötü; hasta halsiz, susuz ve yorgun görünümde, sorulara yavaş ancak uygun yanıt veriyor.",
      "Bilinç açık olmakla birlikte dikkat ve oryantasyon hafif dalgalı; belirgin fokal nörolojik defisit saptanmıyor.",
      "Mukozalar belirgin kuru, deri turgoru azalmış ve kapiller dolum zamanı hafif uzamış.",
      "Solunum derin ve hızlıdır; solunum paterni Kussmaul solunumu ile uyumludur. Nefeste aseton kokusu fark ediliyor.",
      "Kardiyak oskültasyonda taşikardi dışında ek ses veya üfürüm duyulmuyor; periferik nabızlar alınabiliyor.",
      "Abdomen yumuşak; yaygın hafif hassasiyet mevcut ancak defans, rebound veya akut batın bulgusu saptanmıyor."
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
        ],
        "priority": "useful",
        "summary": "pH: 7.18 (Düşük); HCO3-: 8 mmol/L (Düşük); Anyon açıklığı: 28 mmol/L (Yüksek) saptandı.",
        "findings": [
          "pH: 7.18 (Düşük); HCO3-: 8 mmol/L (Düşük); Anyon açıklığı: 28 mmol/L (Yüksek) saptandı."
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
        ],
        "priority": "useful",
        "summary": "Glukoz: Pozitif (Pozitif); Keton: Pozitif (Pozitif) saptandı.",
        "findings": [
          "Glukoz: Pozitif (Pozitif); Keton: Pozitif (Pozitif) saptandı."
        ]
      },
      {
        "id": "trigger-screening-dka",
        "label": "Tam kan sayımı ve kardiyak belirteç taraması",
        "type": "lab",
        "priority": "situational",
        "summary": "Belirgin lökositoz veya troponin yüksekliği saptanmadı; enfeksiyon ya da akut koroner sendrom tetikleyicisi ön planda değildir.",
        "findings": [
          "WBC 8.900/mm³",
          "Nötrofil oranı %66",
          "hs-Troponin I 8 ng/L"
        ],
        "rows": [
          [
            "WBC",
            "8.900/mm³",
            "4.000-10.000/mm³",
            "Normal"
          ],
          [
            "Nötrofil",
            "%66",
            "%40-70",
            "Normal"
          ],
          [
            "hs-Troponin I",
            "8 ng/L",
            "<34 ng/L",
            "Normal"
          ]
        ]
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
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Epigastriumda belirgin hassasiyet saptanıyor",
      "Defans minimal, rebound izlenmiyor",
      "Bağırsak sesleri azalmış",
      "Skleralarda belirgin ikter saptanmıyor",
      "Mukozalar hafif kuru; periferik perfüzyon korunmuş, soğuk ekstremite veya belirgin şok bulgusu yok."
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
        ],
        "priority": "useful",
        "summary": "Lipaz: 1.280 U/L (Yüksek); Amilaz: 410 U/L (Yüksek); ALT: 186 U/L (Yüksek) saptandı.",
        "findings": [
          "Lipaz: 1.280 U/L (Yüksek); Amilaz: 410 U/L (Yüksek); ALT: 186 U/L (Yüksek) saptandı."
        ]
      },
      {
        "id": "usg",
        "label": "Hepatobiliyer ultrasonografi",
        "type": "ultrasound",
        "summary": "Safra kesesinde çok sayıda milimetrik taş izleniyor; koledok belirgin dilate değildir.",
        "priority": "useful",
        "findings": [
          "Safra kesesinde çok sayıda milimetrik taş izleniyor; koledok belirgin dilate değildir."
        ],
        "rows": [
          [
            "Hepatobiliyer ultrasonografi",
            "Safra kesesinde çok sayıda milimetrik taş izleniyor; koledok belirgin dilate değildir.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "ct",
        "label": "Kontrastlı abdomen BT",
        "type": "ct",
        "summary": "Pankreas çevresi yağlı planlarda inflamasyon ve sınırlı peripankreatik sıvı koleksiyonu izleniyor.",
        "priority": "useful",
        "findings": [
          "Pankreas çevresi yağlı planlarda inflamasyon ve sınırlı peripankreatik sıvı koleksiyonu izleniyor."
        ],
        "rows": [
          [
            "Kontrastlı abdomen BT",
            "Pankreas çevresi yağlı planlarda inflamasyon ve sınırlı peripankreatik sıvı koleksiyonu izleniyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
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
              "MI ayırımı için EKG ve troponin değerlendirildi.",
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
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Hasta soluk, soğuk terli ve ortostatik semptomatik görünüyor",
      "Palmar eritem ve spider anjiyomlar izleniyor",
      "Splenomegali ve asit bulguları mevcut",
      "Rektal muayenede melena saptanıyor",
      "Mukozalar kuru, kapiller dolum hafif uzamış ve periferik nabızlar zayıf dolgunlukta alınıyor."
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
        ],
        "priority": "useful",
        "summary": "Hemoglobin: 7.8 g/dL (Düşük); Trombosit: 72.000/mm³ (Düşük); INR: 1.9 (Yüksek) saptandı.",
        "findings": [
          "Hemoglobin: 7.8 g/dL (Düşük); Trombosit: 72.000/mm³ (Düşük); INR: 1.9 (Yüksek) saptandı."
        ]
      },
      {
        "id": "endoscopy",
        "label": "Üst gastrointestinal sistem endoskopisi",
        "type": "endoscopy",
        "summary": "Distal özofagusta geniş variköz venler ve aktif kanama odağı izleniyor; endoskopik bant ligasyonu için uygundur.",
        "priority": "useful",
        "findings": [
          "Distal özofagusta geniş variköz venler ve aktif kanama odağı izleniyor; endoskopik bant ligasyonu için uygundur."
        ],
        "rows": [
          [
            "Üst gastrointestinal sistem endoskopisi",
            "Distal özofagusta geniş variköz venler ve aktif kanama odağı izleniyor; endoskopik bant ligasyonu için uygundur.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
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
          "Erken üst GİS endoskopisiyle bant ligasyonu uygula",
          "Hemodinamik instabilite ve Hb düşüklüğü nedeniyle iki geniş damar yolu, kan hazırlığı, oktreotid ve antibiyotik profilaksisi başlatıldı. Endoskopi öncesi resüsitasyon geciktirilmez. Siroz zemininde üst GIS kanama varis kanamasını düşündürür."
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
      "Genel durum stabil; hasta uyanık, koopere ve belirgin akut toksik görünümde değil.",
      "Konjonktival solukluk belirgin",
      "Koilonişi izleniyor",
      "Taşikardi dışında kardiyopulmoner patoloji saptanmıyor",
      "Hepatosplenomegali yok",
      "Premenopozal hastada jinekolojik kanama sık nedenlerden biridir; alarm bulgusu veya risk faktörü varsa gastrointestinal kanama da araştırılır."
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
        ],
        "priority": "useful",
        "summary": "Hemoglobin: 8.9 g/dL (Düşük); MCV: 66 fL (Düşük); RDW: %19 (Yüksek) saptandı.",
        "findings": [
          "Hemoglobin: 8.9 g/dL (Düşük); MCV: 66 fL (Düşük); RDW: %19 (Yüksek) saptandı."
        ]
      },
      {
        "id": "smear",
        "label": "Periferik yayma",
        "type": "microscopy",
        "summary": "Mikrositer ve hipokrom eritrositler, belirgin anizositoz ve poikilositoz izleniyor.",
        "priority": "useful",
        "findings": [
          "Mikrositer ve hipokrom eritrositler, belirgin anizositoz ve poikilositoz izleniyor."
        ],
        "rows": [
          [
            "Periferik yayma",
            "Mikrositer ve hipokrom eritrositler, belirgin anizositoz ve poikilositoz izleniyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
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
      "Genel durum stabil; hasta uyanık, koopere ve belirgin akut toksik görünümde değil.",
      "Dehidratasyon bulgusu belirgin değil",
      "Fokal nörolojik defisit saptanmıyor",
      "Kemik palpasyonunda yaygın olmayan hassasiyet mevcut",
      "Boyunda palpabl kitle saptanmıyor",
      "Mukozalar hafif kuru; proksimal kas gücü hafif azalmış, bilinç açık ve fokal nörolojik defisit yok."
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
        ],
        "priority": "useful",
        "summary": "Düzeltilmiş kalsiyum: 11.8 mg/dL (Yüksek); Fosfor: 2.1 mg/dL (Düşük); PTH: 146 pg/mL (Yüksek) saptandı.",
        "findings": [
          "Düzeltilmiş kalsiyum: 11.8 mg/dL (Yüksek); Fosfor: 2.1 mg/dL (Düşük); PTH: 146 pg/mL (Yüksek) saptandı."
        ]
      },
      {
        "id": "urine",
        "label": "24 saatlik idrar",
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
        ],
        "priority": "useful",
        "summary": "İdrar kalsiyumu: Yüksek (Yüksek) saptandı.",
        "findings": [
          "İdrar kalsiyumu: Yüksek (Yüksek) saptandı."
        ]
      },
      {
        "id": "imaging",
        "label": "Paratiroid lokalizasyon incelemesi",
        "type": "ultrasound",
        "summary": "Boyun ultrasonografisi/sestamibi korelasyonunda sağ inferior paratiroid lojunda fokal lezyon izlendi.",
        "priority": "useful",
        "findings": [
          "Lokalizasyon cerrahi planlamayı destekler.",
          "Tanı biyokimya ile konur; görüntüleme lokalizasyon içindir."
        ],
        "rows": [
          [
            "Sağ inferior paratiroid",
            "Fokal tutulum/lezyon",
            "Yok",
            "Patolojik"
          ],
          [
            "Tiroid nodülü",
            "Baskın değil",
            "Yok",
            "Geri planda"
          ]
        ]
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
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Bilinç açık, ancak ekspresif afazi belirgin",
      "Sağ üst ve alt ekstremitede santral tip güç kaybı saptanıyor",
      "Sağ santral fasiyal paralizi mevcut",
      "Sol tarafa bakış tercihi izleniyor",
      "Konuşma akıcılığı bozulmuş; sağ santral fasiyal parezi ve sağ tarafta piramidal güç kaybı izleniyor."
    ],
    "investigations": [
      {
        "id": "noncontrast-ct",
        "label": "Kontrastsız beyin BT",
        "type": "ct",
        "summary": "Akut intrakraniyal kanama saptanmıyor; erken iskemik değişiklikler açısından değerlendirme sınırlıdır.",
        "priority": "useful",
        "findings": [
          "Akut intrakraniyal kanama saptanmıyor; erken iskemik değişiklikler açısından değerlendirme sınırlıdır."
        ],
        "rows": [
          [
            "Kontrastsız beyin BT",
            "Akut intrakraniyal kanama saptanmıyor; erken iskemik değişiklikler açısından değerlendirme sınırlıdır.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "cta",
        "label": "BT anjiyografi",
        "type": "ct",
        "summary": "Sol orta serebral arter proksimal segmentinde damar dolum kesintisi izleniyor.",
        "priority": "useful",
        "findings": [
          "Sol orta serebral arter proksimal segmentinde damar dolum kesintisi izleniyor."
        ],
        "rows": [
          [
            "BT anjiyografi",
            "Sol orta serebral arter proksimal segmentinde damar dolum kesintisi izleniyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
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
        ],
        "priority": "useful",
        "summary": "Glukoz: 118 mg/dL (Yüksek) saptandı.",
        "findings": [
          "Glukoz: 118 mg/dL (Yüksek) saptandı."
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
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Ense sertliği mevcut",
      "Fotofobi belirgin",
      "Bilinç dalgalanması izleniyor",
      "Fokal motor defisit saptanmıyor",
      "Kraniyal sinir muayenesinde belirgin paralizi yok; ense sertliği ve fotofobi meningeal irritasyonu destekliyor."
    ],
    "investigations": [
      {
        "id": "ct",
        "label": "Kontrastsız beyin BT",
        "type": "ct",
        "summary": "Bazal sisternalarda ve sulkuslarda hiperdens kan ile uyumlu görünüm izleniyor.",
        "priority": "useful",
        "findings": [
          "Bazal sisternalarda ve sulkuslarda hiperdens kan ile uyumlu görünüm izleniyor."
        ],
        "rows": [
          [
            "Kontrastsız beyin BT",
            "Bazal sisternalarda ve sulkuslarda hiperdens kan ile uyumlu görünüm izleniyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "cta",
        "label": "BT anjiyografi",
        "type": "ct",
        "summary": "Anterior kommunikan arter düzeyinde sakküler anevrizma ile uyumlu odak görülüyor.",
        "priority": "useful",
        "findings": [
          "Anterior kommunikan arter düzeyinde sakküler anevrizma ile uyumlu odak görülüyor."
        ],
        "rows": [
          [
            "BT anjiyografi",
            "Anterior kommunikan arter düzeyinde sakküler anevrizma ile uyumlu odak görülüyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
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
        ],
        "priority": "useful",
        "summary": "Eritrosit: Yüksek (Yüksek); Ksantokromi: Pozitif (Pozitif); Açılış basıncı: Yüksek (Yüksek) saptandı.",
        "findings": [
          "Eritrosit: Yüksek (Yüksek); Ksantokromi: Pozitif (Pozitif); Açılış basıncı: Yüksek (Yüksek) saptandı."
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
              "Belirleyici bulgu paterni doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Bakteriyel menenjit": {
            "explanation": "Menenjit ateş ve ense sertliği yapar; fakat ani maksimum baş ağrısı ve BT’de kan SAH lehinedir.",
            "comparisonPoints": [
              "Belirleyici bulgu paterni doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Serebral venöz sinüs trombozu": {
            "explanation": "CVST baş ağrısı/nöbet yapabilir; ancak subaraknoid kan paterni ve anevrizma şüphesi bu olguda daha güçlüdür.",
            "comparisonPoints": [
              "Belirleyici bulgu paterni doğru tanı lehine daha güçlüdür.",
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
      "Genel durum stabil; hasta uyanık, koopere ve belirgin akut toksik görünümde değil.",
      "Sağ gözde rölatif afferent pupilla defekti izleniyor",
      "Sol bakışta sağ göz adduksiyon kısıtlılığı ve sol gözde abdüksiyon nistagmusu mevcut",
      "Hafif ataksi saptanıyor",
      "Kas gücü belirgin azalmamış",
      "Göz hareketlerinde ağrı ve internükleer oftalmopleji şüphesi mevcut; derin tendon refleksleri canlıdır."
    ],
    "investigations": [
      {
        "id": "mri",
        "label": "Beyin ve servikal spinal MR",
        "type": "mri",
        "summary": "Periventriküler, juxtakortikal ve infratentoryal bölgelerde demiyelinizan plaklarla uyumlu T2/FLAIR hiperintens lezyonlar izleniyor; bazı lezyonlarda kontrast tutulumu mevcut.",
        "priority": "useful",
        "findings": [
          "Periventriküler, juxtakortikal ve infratentoryal bölgelerde demiyelinizan plaklarla uyumlu T2/FLAIR hiperintens lezyonlar izleniyor; bazı lezyonlarda kontrast tutulumu mevcut."
        ],
        "rows": [
          [
            "Beyin ve servikal spinal MR",
            "Periventriküler, juxtakortikal ve infratentoryal bölgelerde demiyelinizan plaklarla uyumlu T2/FLAIR hiperintens lezyonlar izleniyor; bazı lezyonlarda kontrast tutulumu mevcut.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
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
        ],
        "priority": "useful",
        "summary": "Oligoklonal bant: Pozitif (Pozitif); IgG indeksi: Yüksek (Yüksek); Hücre sayısı: Hafif lenfositoz (Yüksek) saptandı.",
        "findings": [
          "Oligoklonal bant: Pozitif (Pozitif); IgG indeksi: Yüksek (Yüksek); Hücre sayısı: Hafif lenfositoz (Yüksek) saptandı."
        ]
      },
      {
        "id": "evoked",
        "label": "Görsel uyarılmış potansiyel",
        "type": "neurophysiology",
        "summary": "P100 latansında uzama saptanıyor.",
        "priority": "useful",
        "findings": [
          "P100 latansında uzama saptanıyor."
        ],
        "rows": [
          [
            "Görsel uyarılmış potansiyel",
            "P100 latansında uzama saptanıyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
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
              "Belirleyici bulgu paterni doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Beyin sapı tümörü": {
            "explanation": "Tümör progresif kitle etkisi yapar; çok odaklı demiyelinizan plaklar ve relaps öyküsü tümörü geri plana iter.",
            "comparisonPoints": [
              "Belirleyici bulgu paterni doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Vitamin B12 eksikliği": {
            "explanation": "B12 eksikliği miyelopati yapabilir; ancak optik nörit ve çok odaklı MR plakları MS lehinedir.",
            "comparisonPoints": [
              "Belirleyici bulgu paterni doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Akut dissemine ensefalomiyelit": {
            "explanation": "Akut dissemine ensefalomiyelit ayırıcı tanıda düşünülebilir; ancak mevcut öykü, muayene ve tetkik paterni Relapsing-remitting multipl skleroz lehinedir.",
            "comparisonPoints": [
              "Zamanlama ve tetikleyici farklıdır",
              "Objektif tetkik paterni doğru tanıyı destekler"
            ]
          },
          "Miyastenia gravis": {
            "explanation": "Miyastenia gravis ayırıcı tanıda düşünülebilir; ancak mevcut öykü, muayene ve tetkik paterni Relapsing-remitting multipl skleroz lehinedir.",
            "comparisonPoints": [
              "Zamanlama ve tetikleyici farklıdır",
              "Objektif tetkik paterni doğru tanıyı destekler"
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
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Postiktal uykuya eğilim mevcut",
      "Papilödem şüphesi izleniyor",
      "Sağ üst ekstremitede geçici güçsüzlük saptanıyor",
      "Ense sertliği belirgin değil",
      "Bilinç açık ancak letarjik; papilödem şüphesi ve hafif ense rahatsızlığı dışında belirgin lateralizan defisit yok."
    ],
    "investigations": [
      {
        "id": "mrv",
        "label": "Beyin MR venografi",
        "type": "mri",
        "summary": "Superior sagittal sinüs ve sağ transvers sinüste akım sinyali kaybı izleniyor.",
        "priority": "useful",
        "findings": [
          "Superior sagittal sinüs ve sağ transvers sinüste akım sinyali kaybı izleniyor."
        ],
        "rows": [
          [
            "Beyin MR venografi",
            "Superior sagittal sinüs ve sağ transvers sinüste akım sinyali kaybı izleniyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "ct",
        "label": "Kontrastsız beyin BT",
        "type": "ct",
        "summary": "Kortikal venöz konjesyon ve küçük hemorajik venöz enfarkt alanı ile uyumlu görünüm izleniyor.",
        "priority": "useful",
        "findings": [
          "Kortikal venöz konjesyon ve küçük hemorajik venöz enfarkt alanı ile uyumlu görünüm izleniyor."
        ],
        "rows": [
          [
            "Kontrastsız beyin BT",
            "Kortikal venöz konjesyon ve küçük hemorajik venöz enfarkt alanı ile uyumlu görünüm izleniyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "labs",
        "label": "Tam kan sayımı ve biyokimya paneli",
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
        ],
        "priority": "useful",
        "summary": "D-dimer: Yüksek (Yüksek) saptandı.",
        "findings": [
          "D-dimer: Yüksek (Yüksek) saptandı."
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
              "Belirleyici bulgu paterni doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Migren": {
            "explanation": "Migren baş ağrısı yapar; ancak nöbet ve venöz görüntüleme bulgusu migrenle açıklanmaz.",
            "comparisonPoints": [
              "Belirleyici bulgu paterni doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Eklampsi": {
            "explanation": "Eklampsi nöbet yapabilir; fakat venöz sinüs trombozu görüntüleme bulgusu tanıyı farklılaştırır.",
            "comparisonPoints": [
              "Belirleyici bulgu paterni doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Bakteriyel menenjit": {
            "explanation": "Bakteriyel menenjit ayırıcı tanıda düşünülebilir; ancak mevcut öykü, muayene ve tetkik paterni Serebral venöz sinüs trombozu lehinedir.",
            "comparisonPoints": [
              "Zamanlama ve tetikleyici farklıdır",
              "Objektif tetkik paterni doğru tanıyı destekler"
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
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Atak sırasında bacaklarını karnına çektiği izleniyor",
      "Sağ üst kadranda sosis şeklinde kitle palpasyonu şüpheli",
      "Rektal muayenede kanlı-mukuslu dışkı izleniyor",
      "Periton irritasyon bulgusu saptanmıyor",
      "Çocuk ataklar arasında soluk ve halsiz görünür; mukozalar hafif kuru, karın sağ üst kadranında palpabl kitle şüphesi vardır."
    ],
    "investigations": [
      {
        "id": "usg",
        "label": "Abdominal ultrasonografi",
        "type": "ultrasound",
        "summary": "Sağ alt kadranda transvers kesitte hedef işareti, longitudinal kesitte yalancı böbrek görünümü izleniyor.",
        "priority": "useful",
        "findings": [
          "Sağ alt kadranda transvers kesitte hedef işareti, longitudinal kesitte yalancı böbrek görünümü izleniyor."
        ],
        "rows": [
          [
            "Abdominal ultrasonografi",
            "Sağ alt kadranda transvers kesitte hedef işareti, longitudinal kesitte yalancı böbrek görünümü izleniyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "xray",
        "label": "Ayakta direkt karın grafisi",
        "type": "xray",
        "summary": "Ayakta direkt karın grafisinde hava-sıvı seviyeleri izlenir; serbest intraperitoneal hava saptanmaz.",
        "priority": "useful",
        "findings": [
          "Ayakta direkt karın grafisinde hava-sıvı seviyeleri izlenir; serbest intraperitoneal hava saptanmaz."
        ],
        "rows": [
          [
            "Ayakta direkt karın grafisi",
            "Ayakta direkt karın grafisinde hava-sıvı seviyeleri izlenir; serbest intraperitoneal hava saptanmaz.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "labs",
        "label": "Tam kan sayımı ve biyokimya paneli",
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
        ],
        "priority": "useful",
        "summary": "CRP: 8 mg/L (Yüksek) saptandı.",
        "findings": [
          "CRP: 8 mg/L (Yüksek) saptandı."
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
              "Belirleyici bulgu paterni doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Hipertrofik pilor stenozu": {
            "explanation": "Pilor stenozu safrasız fışkırır kusma yapar; kanlı dışkı ve target bulgusu beklenmez.",
            "comparisonPoints": [
              "Belirleyici bulgu paterni doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Midgut volvulusu": {
            "explanation": "Volvulus safralı kusma ve akut iskemi riskiyle gelir; USG target görünümü invajinasyonu öne çıkarır.",
            "comparisonPoints": [
              "Belirleyici bulgu paterni doğru tanı lehine daha güçlüdür.",
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
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Bebekte hafif dehidratasyon bulguları mevcut",
      "Üst abdomen palpasyonunda zeytin benzeri kitle şüpheli",
      "Beslenme sonrasında epigastriumda görünür peristaltizm izleniyor",
      "Batında distansiyon belirgin değil",
      "Bebek aç ve huzursuz görünümde; mukozalar kuru, fontanel hafif çökük ve beslenme sonrası görünür gastrik peristaltizm izleniyor."
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
        ],
        "priority": "useful",
        "summary": "pH: 7.52 (Yüksek); Klor: 86 mmol/L (Düşük); Potasyum: 3.0 mmol/L (Düşük) saptandı.",
        "findings": [
          "pH: 7.52 (Yüksek); Klor: 86 mmol/L (Düşük); Potasyum: 3.0 mmol/L (Düşük) saptandı."
        ]
      },
      {
        "id": "usg",
        "label": "Pilor ultrasonografisi",
        "type": "ultrasound",
        "summary": "Pilor kas kalınlığı ve kanal uzunluğu artmış; mide çıkışında geçiş kısıtlılığı ile uyumlu görünüm izleniyor.",
        "priority": "useful",
        "findings": [
          "Pilor kas kalınlığı ve kanal uzunluğu artmış; mide çıkışında geçiş kısıtlılığı ile uyumlu görünüm izleniyor."
        ],
        "rows": [
          [
            "Pilor ultrasonografisi",
            "Pilor kas kalınlığı ve kanal uzunluğu artmış; mide çıkışında geçiş kısıtlılığı ile uyumlu görünüm izleniyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
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
          "Stabilizasyon sonrası Ramstedt piloromiyotomi planla",
          "Hipokloremik metabolik alkaloz ve hipokalemi saptandığı için piloromiyotomi öncesi sıvı-elektrolit düzeltmesi yapıldı. Cerrahi stabilizasyon sonrası planlanır. Kusma kaynaklı elektrolit paterni tanıyı destekler."
        ],
        "learningOutcome": "Beş haftalık bebekte progresif safrasız fışkırır kusma, kilo alamama, hipokloremik metabolik alkaloz ve USG’de pilor kas kalınlaşması hipertrofik pilor stenozunu destekler.",
        "differentials": {
          "Gastroözofageal reflü": {
            "explanation": "Reflü kusma yapabilir; ancak fışkırır karakter, hipokloremik alkaloz ve USG bulgusu pilor stenozu lehinedir.",
            "comparisonPoints": [
              "Belirleyici bulgu paterni doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Midgut volvulusu": {
            "explanation": "Volvulus çoğunlukla safralı kusma ve acil iskemi riskiyle gelir; burada safrasız kusma ve pilor kalınlaşması vardır.",
            "comparisonPoints": [
              "Belirleyici bulgu paterni doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "İnek sütü protein alerjisi": {
            "explanation": "Alerji kusma ve dışkı değişikliği yapabilir; metabolik alkaloz ve pilor USG bulgusu beklenmez.",
            "comparisonPoints": [
              "Belirleyici bulgu paterni doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "İnvajinasyon": {
            "explanation": "İnvajinasyon ayırıcı tanıda düşünülebilir; ancak mevcut öykü, muayene ve tetkik paterni Hipertrofik pilor stenozu lehinedir.",
            "comparisonPoints": [
              "Zamanlama ve tetikleyici farklıdır",
              "Objektif tetkik paterni doğru tanıyı destekler"
            ]
          },
          "Duodenal atrezi": {
            "explanation": "Duodenal atrezi ayırıcı tanıda düşünülebilir; ancak mevcut öykü, muayene ve tetkik paterni Hipertrofik pilor stenozu lehinedir.",
            "comparisonPoints": [
              "Zamanlama ve tetikleyici farklıdır",
              "Objektif tetkik paterni doğru tanıyı destekler"
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
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Bilateral nonpürülan konjonktival hiperemi izleniyor",
      "Dudaklar kuru ve çatlak, dil çilek dili görünümünde",
      "El ve ayaklarda ödem ve eritem mevcut",
      "Tek taraflı servikal lenfadenopati saptanıyor",
      "Çocuk irritabl ve halsiz görünümde; avuç içi ve ayak tabanında eritem-ödem, dudaklarda kuruluk ve çatlama belirgin."
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
        ],
        "priority": "useful",
        "summary": "CRP: 96 mg/L (Yüksek); Sedimentasyon: 78 mm/saat (Yüksek); Trombosit: 520.000/mm³ (Yüksek) saptandı.",
        "findings": [
          "CRP: 96 mg/L (Yüksek); Sedimentasyon: 78 mm/saat (Yüksek); Trombosit: 520.000/mm³ (Yüksek) saptandı."
        ]
      },
      {
        "id": "echo",
        "label": "Ekokardiyografi",
        "type": "ultrasound",
        "summary": "Koroner arterlerde hafif ektazi izlendi; belirgin dev anevrizma veya ventrikül disfonksiyonu saptanmadı.",
        "priority": "useful",
        "findings": [
          "Koroner arterlerde hafif ektazi",
          "Dev anevrizma saptanmadı",
          "Sol ventrikül sistolik fonksiyonu korunmuş"
        ],
        "rows": [
          [
            "Koroner arterler",
            "Hafif ektazi",
            "Normal çap",
            "Patolojik"
          ],
          [
            "Sol ventrikül fonksiyonu",
            "Korunmuş",
            "Korunmuş",
            "Normal"
          ]
        ]
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
        ],
        "priority": "useful",
        "summary": "Lökosit: Pozitif (Pozitif) saptandı.",
        "findings": [
          "Lökosit: Pozitif (Pozitif) saptandı."
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
              "Belirleyici bulgu paterni doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Adenovirüs enfeksiyonu": {
            "explanation": "Adenovirüs konjonktivit yapabilir; fakat beş günden uzun ateş ve çoklu mukokutanöz kriterler Kawasaki’yi öne çıkarır.",
            "comparisonPoints": [
              "Belirleyici bulgu paterni doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Juvenil idiyopatik artrit": {
            "explanation": "Sistemik JIA ateş/döküntü yapabilir; ancak oral-ekstremite bulguları ve koroner risk Kawasaki için daha özgüldür.",
            "comparisonPoints": [
              "Belirleyici bulgu paterni doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Adenovirus enfeksiyonu": {
            "explanation": "Adenovirus enfeksiyonu ayırıcı tanıda düşünülebilir; ancak mevcut öykü, muayene ve tetkik paterni Kawasaki hastalığı lehinedir.",
            "comparisonPoints": [
              "Zamanlama ve tetikleyici farklıdır",
              "Objektif tetkik paterni doğru tanıyı destekler"
            ]
          },
          "Stevens-Johnson sendromu": {
            "explanation": "Stevens-Johnson sendromu ayırıcı tanıda düşünülebilir; ancak mevcut öykü, muayene ve tetkik paterni Kawasaki hastalığı lehinedir.",
            "comparisonPoints": [
              "Zamanlama ve tetikleyici farklıdır",
              "Objektif tetkik paterni doğru tanıyı destekler"
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
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Toksik görünüm belirgin",
      "Tripod pozisyonunda oturuyor",
      "İnspiratuvar stridor duyuluyor",
      "Orofarenks muayenesi havayolu ekibi hazır olmadan zorlanmıyor",
      "Çocuk salyasını yutmakta zorlanıyor, boynunu ekstansiyonda tutuyor ve havayolu obstrüksiyonunu artırmamak için orofarenks muayenesi zorlanmıyor."
    ],
    "investigations": [
      {
        "id": "neck-xray",
        "label": "Lateral boyun grafisi",
        "type": "xray",
        "summary": "Epiglotta ödem ile uyumlu başparmak bulgusu izlenebilir; inceleme hastanın havayolu güvenliği bozulmadan yapılmalıdır.",
        "priority": "useful",
        "findings": [
          "Epiglotta ödem ile uyumlu başparmak bulgusu izlenebilir; inceleme hastanın havayolu güvenliği bozulmadan yapılmalıdır."
        ],
        "rows": [
          [
            "Lateral boyun grafisi",
            "Epiglotta ödem ile uyumlu başparmak bulgusu izlenebilir; inceleme hastanın havayolu güvenliği bozulmadan yapılmalıdır.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "labs",
        "label": "Tam kan sayımı ve biyokimya paneli",
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
        ],
        "priority": "useful",
        "summary": "Lökosit: 18.600/mm³ (Yüksek); CRP: 112 mg/L (Yüksek) saptandı.",
        "findings": [
          "Lökosit: 18.600/mm³ (Yüksek); CRP: 112 mg/L (Yüksek) saptandı."
        ]
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
          "Geniş spektrumlu intravenöz antibiyotik başla",
          "Stridor, salya akması, tripod pozisyonu ve hipoksemi nedeniyle kontrollü havayolu güvenliği endikasyonu oluştu. Havayolu manipülasyonu deneyimli ekip ve kontrollü koşul gerektirir. Boğaz muayenesiyle ajitasyon yaratmak obstrüksiyonu artırabilir."
        ],
        "learningOutcome": "Toksik görünümlü çocukta yüksek ateş, disfaji, salya akması, muffled voice ve tripod pozisyonu akut epiglottiti düşündürür.",
        "differentials": {
          "Krup": {
            "explanation": "Krup stridor yapabilir; ancak salya akması, toksik görünüm ve tripod pozisyonu epiglottiti öne çıkarır.",
            "comparisonPoints": [
              "Belirleyici bulgu paterni doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Yabancı cisim aspirasyonu": {
            "explanation": "Yabancı cisim ani başlangıçlı öksürük/boğulma ile gelir; ateş ve toksik görünüm epiglottit lehinedir.",
            "comparisonPoints": [
              "Belirleyici bulgu paterni doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Retrofaringeal apse": {
            "explanation": "Apse disfaji yapabilir; ancak hızlı hava yolu tehdidi ve epiglottik klinik patern bu olguda daha belirgindir.",
            "comparisonPoints": [
              "Belirleyici bulgu paterni doğru tanı lehine daha güçlüdür.",
              "Seçeneğin beklenen tipik bulguları bu olguda baskın değildir.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Viral krup": {
            "explanation": "Viral krup ayırıcı tanıda düşünülebilir; ancak mevcut öykü, muayene ve tetkik paterni Akut epiglottit lehinedir.",
            "comparisonPoints": [
              "Zamanlama ve tetikleyici farklıdır",
              "Objektif tetkik paterni doğru tanıyı destekler"
            ]
          },
          "Peritonsiller apse": {
            "explanation": "Peritonsiller apse ayırıcı tanıda düşünülebilir; ancak mevcut öykü, muayene ve tetkik paterni Akut epiglottit lehinedir.",
            "comparisonPoints": [
              "Zamanlama ve tetikleyici farklıdır",
              "Objektif tetkik paterni doğru tanıyı destekler"
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
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "McBurney noktasında hassasiyet saptanıyor",
      "Rovsing bulgusu pozitif",
      "Hafif defans mevcut, yaygın rebound yok",
      "Psoas veya obturator irritasyon bulguları değerlendiriliyor",
      "Abdomen inspeksiyon, oskültasyon, palpasyon ve periton irritasyon bulguları açısından sistematik değerlendirildi."
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
        ],
        "priority": "useful",
        "summary": "Lökosit: 15.400/mm³ (Yüksek); Nötrofil: %84 (Yüksek); CRP: 38 mg/L (Yüksek) saptandı.",
        "findings": [
          "Lökosit: 15.400/mm³ (Yüksek); Nötrofil: %84 (Yüksek); CRP: 38 mg/L (Yüksek) saptandı."
        ]
      },
      {
        "id": "ct",
        "label": "Kontrastlı abdomen BT",
        "type": "ct",
        "summary": "Çapı artmış, duvarı kalınlaşmış apendiks ve çevre yağ dokuda inflamasyon izleniyor; apendikolit görülebilir.",
        "priority": "useful",
        "findings": [
          "Çapı artmış, duvarı kalınlaşmış apendiks ve çevre yağ dokuda inflamasyon izleniyor; apendikolit görülebilir."
        ],
        "rows": [
          [
            "Kontrastlı abdomen BT",
            "Çapı artmış, duvarı kalınlaşmış apendiks ve çevre yağ dokuda inflamasyon izleniyor; apendikolit görülebilir.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
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
        ],
        "priority": "useful",
        "summary": "İdrar tetkiki sonuçları referans aralığında/negatif saptandı.",
        "findings": [
          "İdrar tetkiki sonuçları referans aralığında/negatif saptandı."
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
          "Hemogram ve inflamasyon belirteçleri: Lökosit 15.400/mm³ saptandı.",
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
      "Genel durum orta; hasta ağrı nedeniyle huzursuz, bilinç açık ve koopere.",
      "Cilt ve skleralarda belirgin ikter yok; mukozalar hafif kuru.",
      "Kardiyopulmoner muayenede ek patolojik bulgu saptanmıyor.",
      "Abdomen inspeksiyonunda distansiyon yok; sağ üst kadranda belirgin palpasyon hassasiyeti mevcut.",
      "Derin inspirasyon sırasında sağ üst kadran palpasyonuyla ağrı nedeniyle inspirasyon kesiliyor; klinik Murphy bulgusu pozitiftir.",
      "Yaygın defans, rebound veya jeneralize peritonit bulgusu saptanmıyor."
    ],
    "investigations": [
      {
        "id": "usg",
        "label": "Sağ üst kadran ultrasonografisi",
        "type": "ultrasound",
        "summary": "Safra kesesinde taş, duvar kalınlaşması, perikolesistik sıvı ve prob basısı ile ağrı artışı izleniyor.",
        "priority": "useful",
        "findings": [
          "Safra kesesinde taş, duvar kalınlaşması, perikolesistik sıvı ve prob basısı ile ağrı artışı izleniyor."
        ],
        "rows": [
          [
            "Sağ üst kadran ultrasonografisi",
            "Safra kesesinde taş, duvar kalınlaşması, perikolesistik sıvı ve prob basısı ile ağrı artışı izleniyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "labs",
        "label": "Tam kan sayımı ve biyokimya paneli",
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
        ],
        "priority": "useful",
        "summary": "Lökosit: 14.800/mm³ (Yüksek); CRP: 68 mg/L (Yüksek); ALT: 46 U/L (Yüksek) saptandı.",
        "findings": [
          "Lökosit: 14.800/mm³ (Yüksek); CRP: 68 mg/L (Yüksek); ALT: 46 U/L (Yüksek) saptandı."
        ]
      },
      {
        "id": "hida-scan-cholecystitis",
        "label": "Hepatobiliyer sintigrafi",
        "type": "clinical",
        "priority": "situational",
        "summary": "Safra kesesi dolumu izlenmedi; bulgu sistik kanal obstrüksiyonu ve akut kolesistit ile uyumludur.",
        "findings": [
          "Safra kesesi dolumu izlenmedi",
          "Safra yollarında yaygın tıkanıklık paterni saptanmadı"
        ],
        "rows": [
          [
            "Safra kesesi dolumu",
            "İzlenmedi",
            "Dolum izlenir",
            "Pozitif"
          ],
          [
            "Ekstrahepatik safra yolu geçişi",
            "Korunmuş",
            "Korunmuş",
            "Normal"
          ]
        ]
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
          "Laboratuvar: Lökosit 14.800/mm³ saptandı."
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
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Karında belirgin distansiyon mevcut",
      "Bağırsak sesleri metalik ve artmış duyuluyor",
      "Yaygın defans veya rebound saptanmıyor",
      "İnguinal herni muayenesinde strangülasyon bulgusu yok",
      "Abdomen inspeksiyon, oskültasyon, palpasyon ve periton irritasyon bulguları açısından sistematik değerlendirildi."
    ],
    "investigations": [
      {
        "id": "xray",
        "label": "Ayakta direkt karın grafisi",
        "type": "xray",
        "summary": "Santral yerleşimli dilate ince bağırsak ansları ve çoklu hava-sıvı seviyeleri izleniyor.",
        "priority": "useful",
        "findings": [
          "Santral yerleşimli dilate ince bağırsak ansları ve çoklu hava-sıvı seviyeleri izleniyor."
        ],
        "rows": [
          [
            "Ayakta direkt karın grafisi",
            "Santral yerleşimli dilate ince bağırsak ansları ve çoklu hava-sıvı seviyeleri izleniyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "ct",
        "label": "Kontrastlı abdomen BT",
        "type": "ct",
        "summary": "İnce bağırsakta geçiş noktası ve proksimal dilatasyon izleniyor; kapalı ans veya iskemi bulgusu belirgin değildir.",
        "priority": "useful",
        "findings": [
          "İnce bağırsakta geçiş noktası ve proksimal dilatasyon izleniyor; kapalı ans veya iskemi bulgusu belirgin değildir."
        ],
        "rows": [
          [
            "Kontrastlı abdomen BT",
            "İnce bağırsakta geçiş noktası ve proksimal dilatasyon izleniyor; kapalı ans veya iskemi bulgusu belirgin değildir.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "labs",
        "label": "Tam kan sayımı ve biyokimya paneli",
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
        ],
        "priority": "useful",
        "summary": "Lökosit: 11.800/mm³ (Yüksek) saptandı.",
        "findings": [
          "Lökosit: 11.800/mm³ (Yüksek) saptandı."
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
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Hasta hareketsiz yatmayı tercih ediyor",
      "Karında tahta karın görünümünde rijidite mevcut",
      "Yaygın rebound hassasiyeti saptanıyor",
      "Bağırsak sesleri azalmış",
      "Abdomen inspeksiyon, oskültasyon, palpasyon ve periton irritasyon bulguları açısından sistematik değerlendirildi."
    ],
    "investigations": [
      {
        "id": "upright-xray",
        "label": "Ayakta akciğer/abdomen grafisi",
        "type": "xray",
        "summary": "Diyafram altında serbest hava ile uyumlu görünüm izleniyor.",
        "priority": "useful",
        "findings": [
          "Diyafram altında serbest hava ile uyumlu görünüm izleniyor."
        ],
        "rows": [
          [
            "Ayakta akciğer/abdomen grafisi",
            "Diyafram altında serbest hava ile uyumlu görünüm izleniyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "ct",
        "label": "Kontrastlı abdomen BT",
        "type": "ct",
        "summary": "Üst abdomende serbest hava ve sıvı; mide-duodenum komşuluğunda perforasyon odağı açısından şüpheli görünüm mevcut.",
        "priority": "useful",
        "findings": [
          "Üst abdomende serbest hava ve sıvı; mide-duodenum komşuluğunda perforasyon odağı açısından şüpheli görünüm mevcut."
        ],
        "rows": [
          [
            "Kontrastlı abdomen BT",
            "Üst abdomende serbest hava ve sıvı; mide-duodenum komşuluğunda perforasyon odağı açısından şüpheli görünüm mevcut.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "labs",
        "label": "Tam kan sayımı ve biyokimya paneli",
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
        ],
        "priority": "useful",
        "summary": "Lökosit: 16.200/mm³ (Yüksek); CRP: 54 mg/L (Yüksek); Laktat: 2.4 mmol/L (Yüksek) saptandı.",
        "findings": [
          "Lökosit: 16.200/mm³ (Yüksek); CRP: 54 mg/L (Yüksek); Laktat: 2.4 mmol/L (Yüksek) saptandı."
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
      "Genel durum orta; hasta ağrı nedeniyle hareket etmekten kaçınıyor, bilinç açık ve koopere.",
      "Ciltte solukluk veya belirgin dehidratasyon bulgusu yok; periferik dolaşım korunmuş.",
      "Kardiyopulmoner muayenede ek patolojik bulgu saptanmıyor.",
      "Abdomen hafif distandü; sol alt kadranda lokalize hassasiyet ve hafif defans mevcut.",
      "Yaygın rebound, tahta karın veya jeneralize peritonit bulgusu saptanmıyor.",
      "Rektal muayenede aktif kanama ya da ele gelen belirgin kitle izlenmiyor."
    ],
    "investigations": [
      {
        "id": "ct",
        "label": "Kontrastlı abdomen BT",
        "type": "ct",
        "summary": "Sigmoid kolonda divertiküller, segmental duvar kalınlaşması ve perikolik yağ dokuda inflamasyon izleniyor; apse veya serbest perforasyon saptanmıyor.",
        "priority": "useful",
        "findings": [
          "Sigmoid kolonda divertiküller, segmental duvar kalınlaşması ve perikolik yağ dokuda inflamasyon izleniyor; apse veya serbest perforasyon saptanmıyor."
        ],
        "rows": [
          [
            "Kontrastlı abdomen BT",
            "Sigmoid kolonda divertiküller, segmental duvar kalınlaşması ve perikolik yağ dokuda inflamasyon izleniyor; apse veya serbest perforasyon saptanmıyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "labs",
        "label": "Tam kan sayımı ve biyokimya paneli",
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
        ],
        "priority": "useful",
        "summary": "Lökosit: 13.900/mm³ (Yüksek); CRP: 82 mg/L (Yüksek) saptandı.",
        "findings": [
          "Lökosit: 13.900/mm³ (Yüksek); CRP: 82 mg/L (Yüksek) saptandı."
        ]
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
          "Laboratuvar: Lökosit 13.900/mm³ saptandı."
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
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Sağ hemitoraksta solunum sesleri belirgin azalmış",
      "Perküsyonda sağda hipersonorite mevcut",
      "Trakea orta hatta",
      "Hemodinamik instabilite saptanmıyor",
      "Solunum eforu hafif artmış; sağ hemitoraks ekspansiyonu azalmış, siyanoz veya bilinç değişikliği yok."
    ],
    "investigations": [
      {
        "id": "cxr",
        "label": "Akciğer grafisi",
        "type": "xray",
        "summary": "Sağ apikal-lateral plevral çizgi ve bu çizginin periferinde akciğer işaretlerinin kaybolduğu alan izleniyor; mediastinal şift yok.",
        "priority": "useful",
        "findings": [
          "Sağ apikal-lateral plevral çizgi ve bu çizginin periferinde akciğer işaretlerinin kaybolduğu alan izleniyor; mediastinal şift yok."
        ],
        "rows": [
          [
            "Akciğer grafisi",
            "Sağ apikal-lateral plevral çizgi ve bu çizginin periferinde akciğer işaretlerinin kaybolduğu alan izleniyor; mediastinal şift yok.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
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
        ],
        "priority": "useful",
        "summary": "PaO2: 72 mmHg (Düşük); PaCO2: 34 mmHg (Düşük) saptandı.",
        "findings": [
          "PaO2: 72 mmHg (Düşük); PaCO2: 34 mmHg (Düşük) saptandı."
        ]
      },
      {
        "id": "ct",
        "label": "Toraks BT",
        "type": "ct",
        "summary": "Tanı grafiyle konulabiliyorsa rutin gerekli değildir; altta yatan bül veya sekonder neden araştırılacaksa değerlendirilebilir.",
        "priority": "useful",
        "findings": [
          "Tanı grafiyle konulabiliyorsa rutin gerekli değildir; altta yatan bül veya sekonder neden araştırılacaksa değerlendirilebilir."
        ],
        "rows": [
          [
            "Toraks BT",
            "Tanı grafiyle konulabiliyorsa rutin gerekli değildir; altta yatan bül veya sekonder neden araştırılacaksa değerlendirilebilir.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
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
          "Kan gazı: pH 7.43 saptandı."
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
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Taşikardi mevcut",
      "Sağ baldır çevresi sol tarafa göre artmış ve palpasyonla hassas",
      "Akciğer oskültasyonunda belirgin fokal ral yok",
      "Hemoptizi ifade edilmiyor",
      "Hasta takipneik görünümde; yardımcı solunum kası kullanımı hafif, göğüs duvarı palpasyonuyla ağrı yeniden üretilemiyor."
    ],
    "investigations": [
      {
        "id": "ctpa",
        "label": "BT pulmoner anjiyografi",
        "type": "ct",
        "summary": "Sağ alt lob segmental pulmoner arter dalında kontrast dolum defekti izleniyor.",
        "priority": "useful",
        "findings": [
          "Sağ alt lob segmental pulmoner arter dalında kontrast dolum defekti izleniyor."
        ],
        "rows": [
          [
            "BT pulmoner anjiyografi",
            "Sağ alt lob segmental pulmoner arter dalında kontrast dolum defekti izleniyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
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
        ],
        "priority": "useful",
        "summary": "D-dimer: 2.400 ng/mL FEU (Yüksek) saptandı.",
        "findings": [
          "D-dimer: 2.400 ng/mL FEU (Yüksek) saptandı."
        ]
      },
      {
        "id": "leg-usg",
        "label": "Alt ekstremite venöz Doppler ultrasonografi",
        "type": "ultrasound",
        "summary": "Sağ popliteal ven düzeyinde kompresyonla kollabe olmayan trombüs ile uyumlu segment izleniyor.",
        "priority": "useful",
        "findings": [
          "Sağ popliteal ven düzeyinde kompresyonla kollabe olmayan trombüs ile uyumlu segment izleniyor."
        ],
        "rows": [
          [
            "Alt ekstremite venöz Doppler ultrasonografi",
            "Sağ popliteal ven düzeyinde kompresyonla kollabe olmayan trombüs ile uyumlu segment izleniyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
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
          "D-dimer: D-dimer 2.400 ng/mL FEU saptandı."
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
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Sağ alt zonda inspiratuvar raller duyuluyor",
      "Aynı bölgede bronşiyal solunum sesi ve matite mevcut",
      "Solunum sayısı artmış",
      "Konfüzyon saptanmıyor",
      "Solunum eforu hafif artmış; sağ alt hemitoraksta vokal fremitus artışı ve inspiratuvar ral belirgin."
    ],
    "investigations": [
      {
        "id": "cxr",
        "label": "Akciğer grafisi",
        "type": "xray",
        "summary": "Sağ alt lobda hava bronkogramı içeren konsolidasyon alanı izleniyor.",
        "priority": "useful",
        "findings": [
          "Sağ alt lobda hava bronkogramı içeren konsolidasyon alanı izleniyor."
        ],
        "rows": [
          [
            "Akciğer grafisi",
            "Sağ alt lobda hava bronkogramı içeren konsolidasyon alanı izleniyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "labs",
        "label": "Tam kan sayımı ve biyokimya paneli",
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
        ],
        "priority": "useful",
        "summary": "Lökosit: 16.700/mm³ (Yüksek); CRP: 132 mg/L (Yüksek) saptandı.",
        "findings": [
          "Lökosit: 16.700/mm³ (Yüksek); CRP: 132 mg/L (Yüksek) saptandı."
        ]
      },
      {
        "id": "culture",
        "label": "Mikrobiyolojik örnekleme",
        "type": "culture",
        "summary": "Ağır hastalık, yatış gereksinimi veya tedavi başarısızlığı varsa balgam Gram boyama/kültür ve kan kültürleri alınır.",
        "priority": "useful",
        "findings": [
          "Ağır hastalık, yatış gereksinimi veya tedavi başarısızlığı varsa balgam Gram boyama/kültür ve kan kültürleri alınır."
        ],
        "rows": [
          [
            "Mikrobiyolojik örnekleme",
            "Ağır hastalık, yatış gereksinimi veya tedavi başarısızlığı varsa balgam Gram boyama/kültür ve kan kültürleri alınır.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
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
          "Laboratuvar: Lökosit 16.700/mm³ saptandı."
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
      "Genel durum stabil; hasta uyanık, koopere ve belirgin akut toksik görünümde değil.",
      "Bilateral bazal inspiratuvar ince Velcro tipi raller duyuluyor",
      "Parmaklarda çomaklaşma mevcut",
      "Wheezing belirgin değil",
      "Periferik ödem saptanmıyor",
      "Hasta istirahatte rahat ancak konuşma sonrası hafif dispneik; bazallerde velcro benzeri ince inspiratuvar raller duyuluyor."
    ],
    "investigations": [
      {
        "id": "hrct",
        "label": "Yüksek çözünürlüklü toraks BT",
        "type": "ct",
        "summary": "Bazal ve subplevral ağırlıklı retikülasyon, traksiyon bronşektazisi ve bal peteği görünümü izleniyor.",
        "priority": "useful",
        "findings": [
          "Bazal ve subplevral ağırlıklı retikülasyon, traksiyon bronşektazisi ve bal peteği görünümü izleniyor."
        ],
        "rows": [
          [
            "Yüksek çözünürlüklü toraks BT",
            "Bazal ve subplevral ağırlıklı retikülasyon, traksiyon bronşektazisi ve bal peteği görünümü izleniyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
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
        ],
        "priority": "useful",
        "summary": "FVC: %62 beklenen (Düşük); DLCO: %48 beklenen (Düşük) saptandı.",
        "findings": [
          "FVC: %62 beklenen (Düşük); DLCO: %48 beklenen (Düşük) saptandı."
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
        ],
        "priority": "useful",
        "summary": "Sekonder neden taraması sonuçları referans aralığında/negatif saptandı.",
        "findings": [
          "Sekonder neden taraması sonuçları referans aralığında/negatif saptandı."
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
          "Solunum fonksiyon testi: FVC %62 beklenen saptandı."
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
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Yaygın ekspiratuvar ronküs ve wheezing duyuluyor",
      "Ekspirasyon süresi uzamış",
      "Yardımcı solunum kasları kullanılıyor",
      "Periferik siyanoz hafif düzeyde izleniyor",
      "Hasta öne eğilerek oturuyor; ekspirasyon uzamış, yardımcı solunum kası kullanımı ve yaygın wheezing belirgin."
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
        ],
        "priority": "useful",
        "summary": "pH: 7.31 (Düşük); PaCO2: 58 mmHg (Yüksek); PaO2: 55 mmHg (Düşük) saptandı.",
        "findings": [
          "pH: 7.31 (Düşük); PaCO2: 58 mmHg (Yüksek); PaO2: 55 mmHg (Düşük) saptandı."
        ]
      },
      {
        "id": "cxr",
        "label": "Akciğer grafisi",
        "type": "xray",
        "summary": "Hiperinflasyon bulguları izleniyor; belirgin yeni lobar konsolidasyon saptanmıyor.",
        "priority": "useful",
        "findings": [
          "Hiperinflasyon bulguları izleniyor; belirgin yeni lobar konsolidasyon saptanmıyor."
        ],
        "rows": [
          [
            "Akciğer grafisi",
            "Hiperinflasyon bulguları izleniyor; belirgin yeni lobar konsolidasyon saptanmıyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "labs",
        "label": "Tam kan sayımı ve biyokimya paneli",
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
        ],
        "priority": "useful",
        "summary": "Lökosit: 12.900/mm³ (Yüksek); CRP: 42 mg/L (Yüksek) saptandı.",
        "findings": [
          "Lökosit: 12.900/mm³ (Yüksek); CRP: 42 mg/L (Yüksek) saptandı."
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
          "Arter kan gazı: pH 7.31 saptandı.",
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
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Kaşektik görünüm ve hafif ateş mevcut",
      "Sağ üst zonda solunum sesleri azalmış ve raller duyuluyor",
      "Servikal lenfadenopati saptanmıyor",
      "Hepatosplenomegali yok",
      "Hasta zayıf ve gece terlemesine bağlı nemli görünümdedir; servikal lenf nodları küçük ve mobil palpabl, meningeal irritasyon yok."
    ],
    "investigations": [
      {
        "id": "cxr",
        "label": "Akciğer grafisi",
        "type": "xray",
        "summary": "Üst zon ağırlıklı infiltrasyon ve kavitasyon ile uyumlu görünüm izleniyor.",
        "priority": "useful",
        "findings": [
          "Üst zon ağırlıklı infiltrasyon ve kavitasyon ile uyumlu görünüm izleniyor."
        ],
        "rows": [
          [
            "Akciğer grafisi",
            "Üst zon ağırlıklı infiltrasyon ve kavitasyon ile uyumlu görünüm izleniyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "sputum",
        "label": "Balgam ARB ve moleküler inceleme",
        "type": "microscopy",
        "summary": "Balgam yaymasında aside dirençli basil görülüyor; nükleik asit amplifikasyon testi ve kültür ilaç duyarlılığı için gönderiliyor.",
        "priority": "useful",
        "findings": [
          "Balgam yaymasında aside dirençli basil görülüyor; nükleik asit amplifikasyon testi ve kültür ilaç duyarlılığı için gönderiliyor."
        ],
        "rows": [
          [
            "Balgam ARB ve moleküler inceleme",
            "Balgam yaymasında aside dirençli basil görülüyor; nükleik asit amplifikasyon testi ve kültür ilaç duyarlılığı için gönderiliyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "labs",
        "label": "Tam kan sayımı ve biyokimya paneli",
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
        ],
        "priority": "useful",
        "summary": "Sedimentasyon: 74 mm/saat (Yüksek) saptandı.",
        "findings": [
          "Sedimentasyon: 74 mm/saat (Yüksek) saptandı."
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
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Ateş yüksekliği ve belirgin halsizlik izleniyor",
      "Skleralarda hafif ikter mevcut",
      "Dalak palpasyonla ele geliyor",
      "Bilinç bulanıklığı saptanmıyor",
      "Ateş atağı sırasında titreme ve terleme belirgin; dalak palpabl, ense sertliği veya peteşiyal döküntü yok."
    ],
    "investigations": [
      {
        "id": "smear",
        "label": "Kalın damla ve ince yayma",
        "type": "microscopy",
        "summary": "Eritrositler içinde halka formları ve yüksek parazitemi izleniyor; bazı eritrositlerde birden fazla halka formu dikkati çekiyor.",
        "priority": "useful",
        "findings": [
          "Eritrositler içinde halka formları ve yüksek parazitemi izleniyor; bazı eritrositlerde birden fazla halka formu dikkati çekiyor."
        ],
        "rows": [
          [
            "Kalın damla ve ince yayma",
            "Eritrositler içinde halka formları ve yüksek parazitemi izleniyor; bazı eritrositlerde birden fazla halka formu dikkati çekiyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "labs",
        "label": "Tam kan sayımı ve biyokimya paneli",
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
        ],
        "priority": "useful",
        "summary": "Trombosit: 62.000/mm³ (Düşük); Hemoglobin: 10.9 g/dL (Düşük); Total bilirubin: 2.6 mg/dL (Yüksek) saptandı.",
        "findings": [
          "Trombosit: 62.000/mm³ (Düşük); Hemoglobin: 10.9 g/dL (Düşük); Total bilirubin: 2.6 mg/dL (Yüksek) saptandı."
        ]
      },
      {
        "id": "rapid",
        "label": "Hızlı antijen testi",
        "type": "lab",
        "summary": "Plasmodium antijen testi pozitif saptandı; mikroskopide intraeritrositer parazitler izlendi.",
        "priority": "useful",
        "findings": [
          "Plasmodium antijeni pozitif",
          "Mikroskopide intraeritrositer parazitler izlendi"
        ],
        "rows": [
          [
            "Plasmodium antijeni",
            "Pozitif",
            "Negatif",
            "Pozitif"
          ],
          [
            "Kalın damla mikroskopisi",
            "İntraeritrositer parazit izlendi",
            "Parazit izlenmez",
            "Pozitif"
          ]
        ]
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
          "Laboratuvar: Trombosit 62.000/mm³ saptandı."
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
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Ense sertliği ve fotofobi mevcut",
      "Alt ekstremitelerde basmakla solmayan peteşi ve purpuralar izleniyor",
      "Taşikardi ve sınırda hipotansiyon mevcut",
      "Bilinç dalgalanması gelişiyor",
      "Hasta toksik ve letarjik görünümde; ense sertliği, fotofobi ve basmakla solmayan peteşi-purpura birliktedir."
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
        ],
        "priority": "useful",
        "summary": "Açılış basıncı: Yüksek (Yüksek); Lökosit: 2.200/mm³ (Yüksek); Protein: 180 mg/dL (Yüksek) saptandı.",
        "findings": [
          "Açılış basıncı: Yüksek (Yüksek); Lökosit: 2.200/mm³ (Yüksek); Protein: 180 mg/dL (Yüksek) saptandı."
        ]
      },
      {
        "id": "gram",
        "label": "BOS Gram boyama",
        "type": "microscopy",
        "summary": "Polimorfonükleer lökositler içinde Gram negatif diplokoklar izleniyor.",
        "priority": "useful",
        "findings": [
          "Polimorfonükleer lökositler içinde Gram negatif diplokoklar izleniyor."
        ],
        "rows": [
          [
            "BOS Gram boyama",
            "Polimorfonükleer lökositler içinde Gram negatif diplokoklar izleniyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "culture",
        "label": "Kan kültürü",
        "type": "culture",
        "summary": "Antibiyotik öncesi alınır; ancak güçlü şüphede antibiyotik tedavisi kültür sonucu beklenmeden başlanır.",
        "priority": "useful",
        "findings": [
          "Antibiyotik öncesi alınır; ancak güçlü şüphede antibiyotik tedavisi kültür sonucu beklenmeden başlanır."
        ],
        "rows": [
          [
            "Kan kültürü",
            "Antibiyotik öncesi alınır; ancak güçlü şüphede antibiyotik tedavisi kültür sonucu beklenmeden başlanır.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
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
          "BOS incelemesi: Açılış basıncı Yüksek saptandı.",
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
      "Genel durum stabil; hasta uyanık, koopere ve belirgin akut toksik görünümde değil.",
      "Ateş yüksekliği mevcut",
      "Triküspit odakta yeni sistolik üfürüm duyuluyor",
      "Tırnak yatağında splinter hemoraji şüpheli",
      "Akciğerlerde dağınık raller duyuluyor",
      "Hasta subfebril ve halsiz görünümde; yeni sistolik üfürüm, splinter hemoraji şüphesi ve hafif splenomegali mevcuttur."
    ],
    "investigations": [
      {
        "id": "blood-culture",
        "label": "Kan kültürleri",
        "type": "culture",
        "summary": "Farklı venlerden alınan üç kan kültüründe metisiline duyarlı Staphylococcus aureus üremesi saptanıyor.",
        "priority": "useful",
        "findings": [
          "Farklı venlerden alınan üç kan kültüründe metisiline duyarlı Staphylococcus aureus üremesi saptanıyor."
        ],
        "rows": [
          [
            "Kan kültürleri",
            "Farklı venlerden alınan üç kan kültüründe metisiline duyarlı Staphylococcus aureus üremesi saptanıyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "echo",
        "label": "Transtorasik/Transözofageal ekokardiyografi",
        "type": "ultrasound",
        "summary": "Triküspit kapakta hareketli vejetasyon ile uyumlu kitle izleniyor.",
        "priority": "useful",
        "findings": [
          "Triküspit kapakta hareketli vejetasyon ile uyumlu kitle izleniyor."
        ],
        "rows": [
          [
            "Transtorasik/Transözofageal ekokardiyografi",
            "Triküspit kapakta hareketli vejetasyon ile uyumlu kitle izleniyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "ct",
        "label": "Toraks BT",
        "type": "ct",
        "summary": "Periferik yerleşimli, bazıları kaviter nodüler opasiteler septik pulmoner emboli ile uyumlu görünüm oluşturuyor.",
        "priority": "useful",
        "findings": [
          "Periferik yerleşimli, bazıları kaviter nodüler opasiteler septik pulmoner emboli ile uyumlu görünüm oluşturuyor."
        ],
        "rows": [
          [
            "Toraks BT",
            "Periferik yerleşimli, bazıları kaviter nodüler opasiteler septik pulmoner emboli ile uyumlu görünüm oluşturuyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
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
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "El bileği distal radius düzeyinde şiş ve hassas",
      "Çatal sırtı deformitesi izleniyor",
      "Parmak hareketleri ağrılı ancak korunmuş",
      "Median sinir duyu alanı, parmak kapiller dolumu ve radial-ulnar nabızlar muayenede korunmuş."
    ],
    "investigations": [
      {
        "id": "xray",
        "label": "El bileği direkt grafisi",
        "type": "xray",
        "summary": "Distal radius metafizinde kırık hattı, dorsal açılanma ve dorsal deplasman ile uyumlu görünüm izleniyor.",
        "priority": "useful",
        "findings": [
          "Distal radius metafizinde kırık hattı, dorsal açılanma ve dorsal deplasman ile uyumlu görünüm izleniyor."
        ],
        "rows": [
          [
            "El bileği direkt grafisi",
            "Distal radius metafizinde kırık hattı, dorsal açılanma ve dorsal deplasman ile uyumlu görünüm izleniyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "post-reduction-xray",
        "label": "Redüksiyon sonrası kontrol grafisi",
        "type": "xray",
        "priority": "useful",
        "summary": "Kontrol grafisinde dorsal angülasyon azaldı ve radial yükseklik kısmen düzeldi.",
        "findings": [
          "Kapalı redüksiyonun yeterliliği objektif olarak izlenir.",
          "Eklem içi belirgin basamaklanma saptanmadı."
        ],
        "rows": [
          [
            "Dorsal angülasyon",
            "5°",
            "<10°",
            "Objektif bulgu"
          ],
          [
            "Eklem içi basamaklanma",
            "Saptanmadı",
            "Saptanmamalı",
            "Negatif"
          ]
        ]
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
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Etkilenen ekstremite kısa ve dış rotasyonda duruyor",
      "Kalça hareketleri ağrılı ve kısıtlı",
      "Aksiyel yüklenmeyle ağrı artıyor",
      "Distal nabızlar ve duyu muayenesi korunmuş",
      "Kalça çevresinde açık yara veya belirgin hematom yok; distal motor-duyu muayenesi ve periferik dolaşım korunmuş."
    ],
    "investigations": [
      {
        "id": "xray",
        "label": "Pelvis ve kalça direkt grafisi",
        "type": "xray",
        "summary": "Femur boynu subkapital bölgesinde intrakapsüler kırık hattı ve deplasman ile uyumlu görünüm izleniyor.",
        "priority": "useful",
        "findings": [
          "Femur boynu subkapital bölgesinde intrakapsüler kırık hattı ve deplasman ile uyumlu görünüm izleniyor."
        ],
        "rows": [
          [
            "Pelvis ve kalça direkt grafisi",
            "Femur boynu subkapital bölgesinde intrakapsüler kırık hattı ve deplasman ile uyumlu görünüm izleniyor.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
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
        ],
        "priority": "useful",
        "summary": "Hemoglobin: 11.2 g/dL (Düşük) saptandı.",
        "findings": [
          "Hemoglobin: 11.2 g/dL (Düşük) saptandı."
        ]
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
        "Yaşlı ve deplase kırıklarda artroplasti seçenekleri sıklıkla tercih edilir."
      ],
      "nextStep": "Analjezi; immobilizasyon; cerrahi risk değerlendirmesi ve erken ortopedik cerrahi planlama.",
      "answerFeedback": {
        "diagnosisMeta": "Yaşlı hastada femur boyun kırığı",
        "whyCorrect": "Düşük enerjili düşme sonrası kalça ağrısı, yürüyememe, ekstremitede kısalık-dış rotasyon ve grafide subkapital intrakapsüler kırık femur boyun kırığı ile uyumludur.",
        "evidenceChain": [
          "Başvuru yakınması: Kalça ağrısı ve yürüyememe.",
          "Etkilenen ekstremite kısa ve dış rotasyonda duruyor.",
          "Pelvis ve kalça direkt grafisi: Femur boynu subkapital bölgesinde intrakapsüler kırık hattı ve deplasman ile uyumlu görünüm izleniyor.",
          "Preoperatif laboratuvar: Hemoglobin 11.2 g/dL saptandı."
        ],
        "pearls": [
          "Femur boyun kırıkları intrakapsüler olduğu için femur başı kanlanması açısından risklidir.",
          "Yaşlı ve deplase kırıklarda artroplasti seçenekleri sıklıkla tercih edilir."
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
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Anatomik enfiye çukurunda belirgin hassasiyet mevcut",
      "Başparmak aksiyel kompresyonu ağrılı",
      "El bileği ekstansiyonu ağrılı ve kısıtlı",
      "Nörovasküler muayene normal",
      "İlgili ekstremitede deformite, şişlik, lokal hassasiyet, aktif-pasif hareket ve fonksiyon kaybı değerlendirildi."
    ],
    "investigations": [
      {
        "id": "xray",
        "label": "Skafoid grafileri",
        "type": "xray",
        "summary": "İlk grafilerde kırık hattı seçilemeyebilir; özel skafoid projeksiyonları ve kontrol grafileri gerekebilir.",
        "priority": "useful",
        "findings": [
          "İlk grafilerde kırık hattı seçilemeyebilir; özel skafoid projeksiyonları ve kontrol grafileri gerekebilir."
        ],
        "rows": [
          [
            "Skafoid grafileri",
            "İlk grafilerde kırık hattı seçilemeyebilir; özel skafoid projeksiyonları ve kontrol grafileri gerekebilir.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "mri",
        "label": "El bileği MR",
        "type": "mri",
        "summary": "Klinik şüphe yüksekse erken dönemde okült skafoid kırığını göstermek için kullanılabilir.",
        "priority": "useful",
        "findings": [
          "Klinik şüphe yüksekse erken dönemde okült skafoid kırığını göstermek için kullanılabilir."
        ],
        "rows": [
          [
            "El bileği MR",
            "Klinik şüphe yüksekse erken dönemde okült skafoid kırığını göstermek için kullanılabilir.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
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
          "deplase kırıkta ortopedik cerrahi değerlendirme",
          "Anatomik enfiye çukuru hassasiyeti devam ettiği için ilk grafi negatif olsa da başparmak destekli kısa kol ateli uygulandı. Erken grafi skafoid kırığını atlayabilir. İmmobilizasyon avasküler nekroz riskini azaltır."
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
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Omuz konturu düzleşmiş, deltoid kabarıklığı kaybolmuş",
      "Kol hafif abduksiyon ve dış rotasyonda tutuluyor",
      "Humerus başı anterior-inferior yerleşimli palpe ediliyor",
      "Aksiller sinir duyu alanı ve distal nörovasküler durum muayenede korunmuş.",
      "Deltoid bölge duyusu, deltoid kas aktivasyonu ve distal kapiller dolum muayenede korunmuş."
    ],
    "investigations": [
      {
        "id": "xray",
        "label": "Omuz direkt grafisi",
        "type": "xray",
        "summary": "Humerus başı glenoid kaviteye göre anterior-inferior yer değiştirmiştir; belirgin eşlik eden kırık hattı izlenmez.",
        "priority": "useful",
        "findings": [
          "Humerus başı glenoid kaviteye göre anterior-inferior yer değiştirmiştir; belirgin eşlik eden kırık hattı izlenmez."
        ],
        "rows": [
          [
            "Omuz direkt grafisi",
            "Humerus başı glenoid kaviteye göre anterior-inferior yer değiştirmiştir; belirgin eşlik eden kırık hattı izlenmez.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "post-reduction",
        "label": "Redüksiyon sonrası kontrol",
        "type": "xray",
        "summary": "Başarılı redüksiyonun ve eşlik eden Hill-Sachs veya Bankart lezyonu gibi kemik yaralanmalarının değerlendirilmesi için kontrol grafisi çekilir.",
        "priority": "useful",
        "findings": [
          "Başarılı redüksiyonun ve eşlik eden Hill-Sachs veya Bankart lezyonu gibi kemik yaralanmalarının değerlendirilmesi için kontrol grafisi çekilir."
        ],
        "rows": [
          [
            "Redüksiyon sonrası kontrol",
            "Başarılı redüksiyonun ve eşlik eden Hill-Sachs veya Bankart lezyonu gibi kemik yaralanmalarının değerlendirilmesi için kontrol grafisi çekilir.",
            "Beklenen normal patern",
            "Tanıyı destekler"
          ]
        ]
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
        "Redüksiyon öncesi ve sonrası nörovasküler muayene kayıtlenmelidir."
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
          "Redüksiyon öncesi ve sonrası nörovasküler muayene kayıtlenmelidir."
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
  },
  {
    "id": "cardiovascular-electrical-injury-arrhythmia-001",
    "branchId": "quick-case",
    "title": "Elektrik çarpması sonrası monitörizasyon ve iş kazası kaydı",
    "difficulty": "Hızlı · İş kazası/acil",
    "clinicalFocus": "Elektrik yaralanmasında güvenli alan, ABC, EKG-monitörizasyon, yanık değerlendirmesi ve iş kazası/adli kayıt yaklaşımı",
    "demographics": "28 yaş erkek, elektrik teknisyeni",
    "setting": "Acil servis - iş kazası sonrası ilk değerlendirme",
    "chiefComplaint": "Elektrik kaynağından ayrılamama, kısa süreli bilinç bulanıklığı ve el yanığı",
    "stem": "28 yaşında elektrik teknisyeni 220 V alternatif akımla temas sonrası kısa süre elini çekemediğini, çarpıntı ve sağ elde yanık olduğunu söyler. Nemli zemin ve el-gövde hattı transtorasik akım riskini artırır. Bu kısa olguda amaç yalnız yanığı görmek değil, aritmi ve iş kazası yönetimini doğru önceliklendirmektir.",
    "vitals": {
      "TA": "118/74 mmHg",
      "Nabız": "124/dk, düzensiz",
      "Solunum": "20/dk",
      "SpO2": "%98",
      "Ateş": "36.7 °C"
    },
    "exam": [
      "Genel durum orta; hasta kaygılı ancak koopere, bilinç açık ve GKS 15.",
      "Sağ avuç içinde kuru, keskin sınırlı küçük elektrik giriş yanığı ve çevresinde hassasiyet vardır.",
      "Kardiyovasküler muayenede düzensiz taşikardi duyulur; belirgin üfürüm veya kalp yetmezliği bulgusu yoktur.",
      "Solunum sıkıntısı, yaygın ral veya wheezing saptanmaz.",
      "Sağ ön kolda kompartman sendromu lehine pasif germe ağrısı veya ileri ödem yoktur."
    ],
    "investigations": [
      {
        "id": "12-derivasyon-ekg-01",
        "label": "12 derivasyon EKG",
        "type": "ecg",
        "priority": "essential",
        "summary": "EKG’de sık ventriküler erken vurular izlendi; ST elevasyonu saptanmadı.",
        "findings": [
          "Ventriküler irritabilite elektrik maruziyetiyle uyumlu bulundu.",
          "ST elevasyonu olmaması akut transmural MI ihtimalini azaltır."
        ],
        "rows": [
          [
            "Ritim",
            "Düzensiz sinüs taşikardisi",
            "Sinüs ritmi",
            "Anormal"
          ],
          [
            "VEV",
            "Sık ventriküler erken vuru",
            "Yok/seyrek",
            "Patolojik"
          ],
          [
            "QTc",
            "430 ms",
            "<450 ms",
            "Normal"
          ]
        ]
      },
      {
        "id": "kardiyak-monitorizasyon-01",
        "label": "Kardiyak monitörizasyon",
        "type": "ecg",
        "priority": "essential",
        "summary": "Monitör izleminin ilk saatlerinde tekrarlayan VEV izlendi; VF/VT atağı saptanmadı.",
        "findings": [
          "Transtorasik akım şüphesinde geç aritmi açısından izlem sürdürülür.",
          "Hemodinami stabil kalmıştır."
        ],
        "rows": [
          [
            "İlk 2 saat ritim",
            "Tekrarlayan VEV",
            "Sürekli sinüs ritmi",
            "Anormal"
          ],
          [
            "VF/VT",
            "İzlenmedi",
            "Yok",
            "Sorun yok"
          ],
          [
            "Hemodinami",
            "Stabil",
            "Stabil",
            "Normal"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "Güvenli alan sağlandıktan sonra ABC, 12 derivasyon EKG, kardiyak monitörizasyon ve iş kazası/adli kayıt sürecini başlatmak",
      "options": [
        "Güvenli alan sağlandıktan sonra ABC, 12 derivasyon EKG, kardiyak monitörizasyon ve iş kazası/adli kayıt sürecini başlatmak",
        "Yalnız yüzeyel yanık pansumanı yapıp EKG istemeden taburcu etmek",
        "Adli/iş kazası kaydı için tıbbi monitörizasyonu ertelemek",
        "Troponin normal gelirse ritim izlemi olmadan riski dışlamak"
      ],
      "question": "Bu hastada en uygun ilk yönetim kararı hangisidir?",
      "questionTitle": "İlk yaklaşım sorusu",
      "explanation": "Alternatif akım ve transtorasik hat aritmi riskini artırır. Güvenli alan, ABC, EKG ve monitörizasyon tıbbi önceliktir; iş kazası/adli kayıt tıbbi bakımı geciktirmeden yürütülür.",
      "pearls": [
        "Alternatif akım tetanik kasılmayla temas süresini uzatabilir.",
        "Transtorasik akımda EKG ve ritim izlemi yanık boyutundan bağımsız olarak önemlidir.",
        "İş kazası kaydı tıbbi müdahalenin yerine geçmez; eş zamanlı yürütülür."
      ],
      "nextStep": "Güvenli alan sağlandıktan sonra ABC, 12 derivasyon EKG, kardiyak monitörizasyon ve iş kazası/adli kayıt sürecini başlatmak",
      "answerFeedback": {
        "diagnosisMeta": "Elektrik yaralanması · aritmi riski · iş kazası kaydı",
        "shortDiagnosisMeta": "Öğrenme çıktısı: elektrik yaralanmasında aritmi ve kayıt sorumluluğunu birlikte yönetme",
        "whyCorrect": "Bu seçenek hem yaşamı tehdit eden aritmi riskini hem de iş kazası/adli kayıt gereksinimini doğru sırayla karşılar.",
        "evidenceChain": [
          "Alternatif akım ve nemli zemin temas süresini ve akım geçişini artırır.",
          "El-gövde hattı transtorasik akım ihtimali taşır.",
          "Düzensiz taşikardi EKG/monitörizasyon gerektirir."
        ],
        "pearls": [
          "Yanık küçük olsa bile ritim riski küçük olmak zorunda değildir.",
          "Tıbbi stabilizasyon ve kayıt süreci eş zamanlıdır."
        ],
        "management": [
          "Güvenli alan ve ABC",
          "12 derivasyon EKG ve monitörizasyon",
          "Yanık/kompartman değerlendirmesi ve iş kazası kaydı"
        ],
        "learningOutcome": "Elektrik yaralanmasında ilk karar EKG-monitörizasyon güvenliği ve kayıt sorumluluğunu birlikte planlamaktır.",
        "differentials": {}
      }
    },
    "caseType": "quick",
    "managementSequence": {
      "enabled": false
    },
    "quickCategory": "Acil karar",
    "questionTitle": "İlk yaklaşım sorusu",
    "questionType": "next-step",
    "question": "Bu hastada en uygun ilk yönetim kararı hangisidir?"
  },
  {
    "id": "pulmonology-lightning-apnea-001",
    "branchId": "pulmonology",
    "title": "Fırtına sonrası bilinç kaybı ve solunum depresyonu ile getirilen genç hasta",
    "difficulty": "Zor · TUS düzeyi",
    "clinicalFocus": "Yıldırım mekanizması, yüzeyel akım, uzamış apne, kardiyolojik-nörolojik komplikasyon",
    "demographics": "19 yaş erkek, açık alanda futbol oynarken etkilenmiş",
    "setting": "Acil servis - fırtına sonrası çoklu yaralanma",
    "chiefComplaint": "Bilinç kaybı, geçici solunum durması ve deri lezyonları",
    "stem": "Fırtına sırasında açık alanda bulunan hasta yıldırım düşmesi sonrası yere yığılmıştır. İlk müdahale ekibi birkaç dakika solunumun yüzeyelleştiğini, ardından spontan solunumun döndüğünü bildirir. Gövdede ağ şeklinde eritematöz Lichtenberg benzeri izler ve yüzeyel yanıklar vardır. Solunum depresyonu ve geçici bilinç kaybı birlikte değerlendirildiğinde yıldırım ilişkili kardiyopulmoner etkilenme düşünülür.",
    "vitals": {
      "TA": "102/68 mmHg",
      "Nabız": "58/dk",
      "Solunum": "10/dk, düzensiz",
      "SpO2": "%91",
      "Ateş": "36.2 °C"
    },
    "exam": [
      "Genel durum orta-kötü; hasta başlangıçta konfüze, takipte uyanıklığı artıyor ve GKS 13’ten 15’e yükseliyor.",
      "Solunum yüzeyel ve düzensiz; havayolu desteği sonrası solunum eforu azalıyor ve periferik siyanoz geriliyor.",
      "Gövdede dallanan Lichtenberg benzeri eritematöz izler ve yüzeyel yanık alanları izleniyor; derin yanık, yaygın nekroz veya aktif kanama yok.",
      "Kardiyovasküler muayenede bradikardi eğilimi dışında kalp sesleri doğal; periferik perfüzyon korunmuş.",
      "Akciğer oskültasyonunda tek taraflı solunum azalması, yaygın ral veya belirgin bronkospazm saptanmıyor.",
      "Baş-boyun değerlendirmesinde timpan membran rüptürü yok; hasta geçici tinnitus ve işitme azalması tarifliyor.",
      "Nörolojik muayenede fokal motor defisit veya meningeal irritasyon bulgusu saptanmıyor.",
      "Solunum depresyonu klinik olarak belirgin; takipte uyanıklık artışıyla solunum ritmi düzenlenmeye başlıyor. Yaygın bronkospazm veya tek taraflı solunum sesi kaybı izlenmiyor."
    ],
    "investigations": [
      {
        "id": "ekg-ve-ritim-monitorizasyonu-02",
        "label": "EKG ve ritim monitörizasyonu",
        "type": "ecg",
        "priority": "essential",
        "summary": "EKG’de sinüs bradikardisi izlendi; malign aritmi ve ST elevasyonu saptanmadı.",
        "findings": [
          "Elektriksel etkilenme ritim izlemi gerektirir.",
          "Akut MI lehine EKG paterni yoktur."
        ],
        "rows": [
          [
            "Ritim",
            "Sinüs bradikardisi",
            "Sinüs ritmi",
            "Anormal"
          ],
          [
            "ST segment",
            "Elevasyon yok",
            "İzoelektrik",
            "Sorun yok"
          ],
          [
            "VT/VF",
            "İzlenmedi",
            "Yok",
            "Sorun yok"
          ]
        ]
      },
      {
        "id": "arter-kan-gazi-02",
        "label": "Arter kan gazı",
        "type": "lab",
        "priority": "useful",
        "summary": "Kan gazında hafif hipoksemi ve hafif laktat yüksekliği saptandı.",
        "findings": [
          "Hipoventilasyonun fizyolojik etkisi gösterilmiştir.",
          "Ağır metabolik asidoz yoktur."
        ],
        "rows": [
          [
            "PaO2",
            "62 mmHg",
            "80-100 mmHg",
            "Düşük"
          ],
          [
            "Laktat",
            "2.8 mmol/L",
            "<2 mmol/L",
            "Hafif yüksek"
          ],
          [
            "pH",
            "7.36",
            "7.35-7.45",
            "Normal"
          ]
        ]
      },
      {
        "id": "lightning-cardiac-muscle-lab",
        "label": "CK, troponin ve elektrolit paneli",
        "type": "lab",
        "priority": "useful",
        "summary": "CK hafif yüksek, troponin ve potasyum normal sınırlarda saptandı.",
        "findings": [
          "Derin kas hasarı sınırlı görünmektedir.",
          "Hiperkalemi veya miyokard nekrozu lehine erken biyobelirteç yoktur."
        ],
        "rows": [
          [
            "CK",
            "620 U/L",
            "<200 U/L",
            "Yüksek"
          ],
          [
            "Troponin I",
            "0.01 ng/mL",
            "<0.04 ng/mL",
            "Normal"
          ],
          [
            "Potasyum",
            "4.1 mmol/L",
            "3.5-5.1 mmol/L",
            "Normal"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "Uzamış apneye bağlı kardiyopulmoner arrest riski",
      "options": [
        "Uzamış apneye bağlı kardiyopulmoner arrest riski",
        "Akut miyokard infarktüsü",
        "Spontan tansiyon pnömotoraks",
        "Hiperpotasemiye bağlı ani ölüm"
      ],
      "explanation": "Yıldırım çarpmasında ani ölüm için sınavda en yüksek verimli nokta uzamış apnedir. Deride yanık, bilinç kaybı, nörolojik/işitsel etkilenme ve kalp-solunum durması birlikte düşünülür.",
      "pearls": [
        "Yıldırım akımı çoğu zaman yüzeyden geçer; deride yanık ve Lichtenberg figürleri görülebilir.",
        "Yıldırım sonrası ani ölümde en kritik mekanizma uzamış apnedir.",
        "Hayatta kalanlarda kardiyolojik ve nörolojik problemler aranmalıdır.",
        "Korunmada açık alan, tek ağaç, metal ve sudan uzak durmak temel bilgidir."
      ],
      "nextStep": "ABC stabilizasyonu, oksijen/ventilasyon desteği, EKG monitörizasyonu ve nörolojik-yaralanma taraması.",
      "answerFeedback": {
        "diagnosisMeta": "Fırtına + açık alan + yüzeyel yanık + bilinç kaybı + solunum depresyonu yıldırım çarpmasını destekler.",
        "whyCorrect": "Yıldırım çarpmasında ani ölüm için sınavda en yüksek verimli nokta uzamış apnedir. Deride yanık, bilinç kaybı, nörolojik/işitsel etkilenme ve kalp-solunum durması birlikte düşünülür.",
        "evidenceChain": [
          "Fırtına sırasında açık alanda maruziyet",
          "Lichtenberg benzeri deri lezyonları",
          "Geçici bilinç kaybı",
          "Solunum sayısında düşüklük ve hipoksemi"
        ],
        "pearls": [
          "Miyokard enfarktüsü şıkkı güçlü çeldirici olabilir; asıl mekanizma primer elektriksel/solunumsal etkidir.",
          "Yıldırım sonrası tüm hastalar ritim ve nörolojik açıdan izlenmelidir."
        ],
        "management": [
          "Güvenli alana taşı ve yıldırım riskinin sürdüğünü değerlendir — İkinci çarpma riski önlenir.",
          "ABC, oksijen, gerekirse ventilasyon/CPR — Uzamış apne ve arrest ölümcül olabilir.",
          "EKG ve monitörizasyon — Kalp-solunum sistemi etkilenebilir.",
          "Nörolojik, işitme ve göz muayenesi — yıldırım sonrası sekeller sistematik olarak taranır.",
          "Yanık ve travma taraması — Yüzeyel yanık ve sekonder düşme yaralanmaları yönetilir."
        ],
        "learningOutcome": "Yıldırım çarpmasında görünür yanıklar tanıyı desteklese de sınavda ölüm mekanizması kardiyopulmoner durma ve özellikle uzamış apne ile ilişkilidir.",
        "differentials": {
          "Akut miyokard infarktüsü": {
            "explanation": "Akut miyokard infarktüsü ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Uzamış apneye bağlı kardiyopulmoner arrest riski lehinedir.",
            "comparisonPoints": [
              "Akut miyokard infarktüsü için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Uzamış apneye bağlı kardiyopulmoner arrest riski tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Spontan tansiyon pnömotoraks": {
            "explanation": "Spontan tansiyon pnömotoraks ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Uzamış apneye bağlı kardiyopulmoner arrest riski lehinedir.",
            "comparisonPoints": [
              "Spontan tansiyon pnömotoraks için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Uzamış apneye bağlı kardiyopulmoner arrest riski tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Hiperpotasemiye bağlı ani ölüm": {
            "explanation": "Hiperpotasemiye bağlı ani ölüm ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Uzamış apneye bağlı kardiyopulmoner arrest riski lehinedir.",
            "comparisonPoints": [
              "Hiperpotasemiye bağlı ani ölüm için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Uzamış apneye bağlı kardiyopulmoner arrest riski tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "pediatrics-classic-galactosemia-001",
    "branchId": "pediatrics",
    "title": "Süt alımı sonrası uzamış sarılık ve kusma gelişen yenidoğan",
    "difficulty": "Orta · TUS düzeyi",
    "clinicalFocus": "Galaktoz metabolizması, GALT eksikliği, katarakt, karaciğer hasarı, sepsis riski",
    "demographics": "12 günlük kız bebek",
    "setting": "Pediatri/metabolizma polikliniği veya acil başvuru",
    "chiefComplaint": "Anne sütü sonrası kusma, sarılık ve emmeme",
    "stem": "Doğumdan sonra ilk günlerde iyi olan bebek, süt alımı arttıkça kusma, letarji, uzamış sarılık ve kilo alamama ile başvurur. Katarakt şüphesi ve hepatomegali vardır. Klinik zamanlama, galaktoz içeren süt alımı sonrası toksik metabolit birikimini düşündürür.",
    "vitals": {
      "TA": "74/46 mmHg",
      "Nabız": "168/dk",
      "Solunum": "44/dk",
      "SpO2": "%98",
      "Ateş": "37.2 °C"
    },
    "exam": [
      "Genel durum orta; yenidoğan letarjik, emme gücü azalmış ve beslenme sırasında çabuk yoruluyor.",
      "Cilt ve skleralarda belirgin sarılık izleniyor; mukozalar hafif kuru.",
      "Abdomen yumuşak; karaciğer sağ kostal ark altında 3 cm ele geliyor, belirgin splenomegali yok.",
      "Göz muayenesinde bilateral hafif lens opasitesi/katarakt şüphesi mevcut.",
      "Kardiyopulmoner muayenede ek patolojik bulgu saptanmıyor; sepsis odağı açısından belirgin cilt lezyonu yok.",
      "Nörolojik muayenede ense sertliği ve fokal defisit yok; tonus hafif azalmış."
    ],
    "investigations": [
      {
        "id": "kan-glukozu-bilirubin-ve-karaciger-enzimleri-03",
        "label": "Kan glukozu, bilirubin ve karaciğer enzimleri",
        "type": "lab",
        "priority": "essential",
        "summary": "Hipoglisemi, direkt bilirubin yüksekliği ve transaminaz artışı saptandı.",
        "findings": [
          "Karaciğer etkilenimi ve metabolik stres klasik galaktozemi ile uyumludur.",
          "Hipoglisemi acil düzeltilmelidir."
        ],
        "rows": [
          [
            "Glukoz",
            "56 mg/dL",
            "70-100 mg/dL",
            "Düşük"
          ],
          [
            "Direkt bilirubin",
            "2.4 mg/dL",
            "<0.3 mg/dL",
            "Yüksek"
          ],
          [
            "AST/ALT",
            "180/165 U/L",
            "<40 U/L",
            "Yüksek"
          ]
        ]
      },
      {
        "id": "galt-aktivitesi-ve-galaktoz-1-fosfat-03",
        "label": "GALT aktivitesi ve galaktoz-1-fosfat",
        "type": "lab",
        "priority": "essential",
        "summary": "GALT aktivitesi belirgin düşük; galaktoz-1-fosfat yüksek bulundu.",
        "findings": [
          "Enzim eksikliği tanıyı doğrudan destekler.",
          "Toksik metabolit birikimi karaciğer ve lens bulgularını açıklar."
        ],
        "rows": [
          [
            "GALT aktivitesi",
            "<10%",
            "Normal aktivite",
            "Düşük"
          ],
          [
            "Galaktoz-1-fosfat",
            "Yüksek",
            "Düşük/negatif",
            "Patolojik"
          ]
        ]
      },
      {
        "id": "idrarda-reduktan-madde-03",
        "label": "İdrarda redüktan madde",
        "type": "urine",
        "priority": "useful",
        "summary": "İdrarda redüktan madde pozitif saptandı.",
        "findings": [
          "Laktoz/galaktoz alımı sonrası idrarda şeker atılımı mevcuttur.",
          "Glukoz dışı redüktan şeker olasılığı güçlenir."
        ],
        "rows": [
          [
            "Redüktan madde",
            "Pozitif",
            "Negatif",
            "Patolojik"
          ],
          [
            "İdrar glukoz stripi",
            "Negatif",
            "Negatif",
            "Ayırıcı"
          ]
        ]
      },
      {
        "id": "galt-gen-analizi-ve-aile-taramasi-03",
        "label": "GALT gen analizi ve aile taraması",
        "type": "lab",
        "priority": "situational",
        "summary": "GALT gen analizi istendi; aile taraması için genetik danışmanlık planlandı.",
        "findings": [
          "Kesin moleküler doğrulama ve aile danışmanlığı sağlar.",
          "Acil diyet tedavisi test sonucunu beklememelidir."
        ],
        "rows": [
          [
            "GALT gen analizi",
            "Planlandı",
            "Gerektiğinde",
            "Beklemede"
          ],
          [
            "Aile taraması",
            "Önerildi",
            "Risk yoksa gerekmez",
            "Gerekli"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "Klasik galaktozemi",
      "options": [
        "Klasik galaktozemi",
        "Laktoz intoleransı",
        "Herediter fruktoz intoleransı",
        "Fenilketonüri"
      ],
      "explanation": "Olgu paterni Klasik galaktozemi ile uyumludur. Klinik zamanlama, hedef laboratuvar bulguları ve mekanizma birlikte değerlendirildiğinde bu tanı en güçlü seçenektir.",
      "pearls": [
        "Süt alımı sonrası yenidoğanda kusma, sarılık, hepatomegali ve katarakt galaktozemiyi düşündürür.",
        "Laktoz intoleransı daha çok intestinal semptomlarla gider; ağır karaciğer yetmezliği beklenmez.",
        "Tedavide laktoz/galaktoz kesilir.",
        "E. coli sepsisi klasik sınav ilişkisidir."
      ],
      "nextStep": "Laktoz/galaktoz içeren beslenmeyi kes, uygun formülaya geç, karaciğer ve sepsis açısından değerlendir.",
      "answerFeedback": {
        "diagnosisMeta": "Klasik galaktozemi: Klinik-biyokimyasal patern, ayırıcı tanı ve sınav vurguları ile uyumlu.",
        "whyCorrect": "Olgu paterni Klasik galaktozemi ile uyumludur. Klinik zamanlama, hedef laboratuvar bulguları ve biyokimyasal mekanizma birlikte değerlendirildiğinde bu tanı en güçlü seçenektir.",
        "evidenceChain": [
          "Olgu bulguları Klasik galaktozemi ile uyumlu",
          "Glukoz 56 mg/dL, direkt bilirubin yüksek, AST/ALT yüksek",
          "GALT aktivitesi düşük; galaktoz-1-fosfat yüksek",
          "Hedef mekanizma ve sınav ipuçları tabloyu destekler"
        ],
        "pearls": [
          "Acil metabolik, hematolojik veya organ yetmezliği bulgusu varsa önce stabilizasyon yapılır.",
          "Tanı testleri tedaviyi geciktirmemelidir.",
          "Diyet, replasman, substrat kısıtlaması veya hedef moleküler mekanizma yönetimi belirler."
        ],
        "management": [
          "Acil klinik stabilizasyon ve temel laboratuvar değerlendirmesi — Hipoglisemi, asidoz, anemi veya organ yetmezliği varsa mortalite yaratabilir.",
          "Sorumlu substrat/eksik vitamin veya hedef biyokimyasal bozukluğu düzelt — Patofizyolojik yükü azaltır.",
          "Spesifik metabolit, enzim, lipid veya genetik doğrulama yap — Kesin tanı ve aile danışmanlığı sağlar.",
          "Uzun dönem beslenme/metabolizma veya ilgili branş takibi planla — Komplikasyonları azaltır."
        ],
        "learningOutcome": "Metabolizma, vitamin, eser element ve lipoprotein tablolarında semptom paterni, sorumlu molekül/enzim ya da eksik besin ögesi ve temel yönetim birlikte okunmalıdır.",
        "differentials": {
          "Laktoz intoleransı": {
            "explanation": "Laktoz intoleransı ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Klasik galaktozemi lehinedir.",
            "comparisonPoints": [
              "Laktoz intoleransı için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Klasik galaktozemi tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Herediter fruktoz intoleransı": {
            "explanation": "Herediter fruktoz intoleransı ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Klasik galaktozemi lehinedir.",
            "comparisonPoints": [
              "Herediter fruktoz intoleransı için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Klasik galaktozemi tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Fenilketonüri": {
            "explanation": "Fenilketonüri ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Klasik galaktozemi lehinedir.",
            "comparisonPoints": [
              "Fenilketonüri için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Klasik galaktozemi tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "pediatrics-hereditary-fructose-intolerance-001",
    "branchId": "pediatrics",
    "title": "Ek gıda sonrası hipoglisemi atakları olan bebek",
    "difficulty": "Orta · TUS düzeyi",
    "clinicalFocus": "Fruktoz metabolizması, aldolaz B eksikliği, hipoglisemi, karaciğer etkilenimi",
    "demographics": "10 aylık erkek bebek",
    "setting": "Pediatri/metabolizma polikliniği veya acil başvuru",
    "chiefComplaint": "Meyve püresi sonrası kusma, terleme ve letarji",
    "stem": "Ek gıdaya geçişten sonra özellikle meyve suyu, meyve püresi ve tatlı gıdalarla kusma, solukluk, terleme ve uykuya meyil gelişmektedir. Anne, çocuğun tatlı gıdalardan kaçındığını fark etmiştir. Bu zamanlama fruktoz/sükroz/sorbitol alımıyla tetiklenen metabolik bloğu düşündürür.",
    "vitals": {
      "TA": "86/52 mmHg",
      "Nabız": "148/dk",
      "Solunum": "32/dk",
      "SpO2": "%99",
      "Ateş": "36.6 °C"
    },
    "exam": [
      "Genel durum orta; atak sırasında soluk, terli ve uykuya meyilli görünümde.",
      "Meyve püresi alımı sonrasında solukluk, terleme, irritabilite ve uykuya meyil belirginleşiyor; tatlı gıdalardan kaçınma öyküsü aile tarafından doğrulanıyor.",
      "Abdomen yumuşak; karaciğer sağ kostal ark altında 2 cm ele geliyor, asit veya peritonit bulgusu yok.",
      "Kapiller dolum yaklaşık 3 saniye; hafif dehidratasyon bulguları mevcut.",
      "Nörolojik muayenede atak sırasında uykuya meyil dışında kalıcı fokal defisit yok; uyarana yanıt alınabiliyor.",
      "Ateş, boğaz hiperemisi, meningeal irritasyon veya belirgin enfeksiyon odağı saptanmıyor."
    ],
    "investigations": [
      {
        "id": "kan-glukozu-ve-elektrolitler-04",
        "label": "Kan glukozu ve elektrolitler",
        "type": "lab",
        "priority": "essential",
        "summary": "Fruktoz alımı sonrası hipoglisemi ve hafif laktat yüksekliği saptandı.",
        "findings": [
          "Bulgu, fruktoz metabolizması bloğuna bağlı akut enerji yetersizliğiyle uyumludur.",
          "Böbrek fonksiyonlarında belirgin bozulma yoktur."
        ],
        "rows": [
          [
            "Glukoz",
            "42 mg/dL",
            "70-100 mg/dL",
            "Düşük"
          ],
          [
            "Laktat",
            "3.1 mmol/L",
            "<2 mmol/L",
            "Yüksek"
          ],
          [
            "Na/K",
            "Normal",
            "Normal",
            "Sorun yok"
          ]
        ]
      },
      {
        "id": "fruktoz-1-fosfat-aldob-degerlendirmesi-04",
        "label": "Fruktoz-1-fosfat ve ALDOB analizi",
        "type": "lab",
        "priority": "essential",
        "summary": "ALDOB ilişkili defekt şüphesi güçlü; fruktoz-1-fosfat birikimi ile uyumlu sonuç alındı.",
        "findings": [
          "Aldolaz B basamağındaki blok tanıyı destekler.",
          "Esansiyel fruktozüriye göre daha ağır metabolik tablo vardır."
        ],
        "rows": [
          [
            "Fruktoz-1-fosfat",
            "Yüksek",
            "Düşük",
            "Patolojik"
          ],
          [
            "ALDOB değerlendirmesi",
            "Defekt lehine",
            "Normal",
            "Patolojik"
          ]
        ]
      },
      {
        "id": "idrar-ketonu-ve-metabolik-asidoz-taramasi-04",
        "label": "İdrar ketonu ve metabolik asidoz taraması",
        "type": "urine",
        "priority": "useful",
        "summary": "İdrarda keton pozitifliği ve hafif metabolik asidoz izlendi.",
        "findings": [
          "Açlık/hipoglisemi yanıtı ketonüri oluşturabilir.",
          "Ağır ketoasidoz paterni yoktur."
        ],
        "rows": [
          [
            "İdrar ketonu",
            "Pozitif",
            "Negatif",
            "Patolojik"
          ],
          [
            "Bikarbonat",
            "19 mmol/L",
            "22-28 mmol/L",
            "Düşük"
          ]
        ]
      },
      {
        "id": "aldob-gen-analizi-04",
        "label": "ALDOB gen analizi",
        "type": "lab",
        "priority": "situational",
        "summary": "ALDOB geninde patojenik varyant saptandı.",
        "findings": [
          "Moleküler sonuç herediter fruktoz intoleransını doğrular.",
          "Fruktoz-sükroz-sorbitol kısıtlaması sürdürülür."
        ],
        "rows": [
          [
            "ALDOB varyantı",
            "Patojenik varyant",
            "Patojenik varyant yok",
            "Pozitif"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "Herediter fruktoz intoleransı",
      "options": [
        "Herediter fruktoz intoleransı",
        "Esansiyel fruktozüri",
        "Galaktozemi",
        "GSD Tip Ia"
      ],
      "explanation": "Olgu paterni Herediter fruktoz intoleransı ile uyumludur. Klinik zamanlama, hedef laboratuvar bulguları ve mekanizma birlikte değerlendirildiğinde bu tanı en güçlü seçenektir.",
      "pearls": [
        "Fruktoz alımı sonrası ciddi hipoglisemi HFI için tipiktir.",
        "Esansiyel fruktozüri genellikle benign seyreder.",
        "Sorumlu substratlar fruktoz, sükroz ve sorbitoldür.",
        "Diyetten çıkarma tedavinin temelidir."
      ],
      "nextStep": "Fruktoz, sükroz ve sorbitolü diyetten çıkar; hipoglisemiyi hızla düzelt.",
      "answerFeedback": {
        "diagnosisMeta": "Herediter fruktoz intoleransı: Klinik-biyokimyasal patern, ayırıcı tanı ve sınav vurguları ile uyumlu.",
        "whyCorrect": "Olgu paterni Herediter fruktoz intoleransı ile uyumludur. Klinik zamanlama, hedef laboratuvar bulguları ve biyokimyasal mekanizma birlikte değerlendirildiğinde bu tanı en güçlü seçenektir.",
        "evidenceChain": [
          "Olgu bulguları Herediter fruktoz intoleransı ile uyumlu",
          "Glukoz 42 mg/dL, laktat hafif yüksek, transaminazlar yüksek",
          "Aldolaz B defekti şüphesi; fruktoz-1-fosfat birikimi",
          "Hedef mekanizma ve sınav ipuçları tabloyu destekler"
        ],
        "pearls": [
          "Acil metabolik, hematolojik veya organ yetmezliği bulgusu varsa önce stabilizasyon yapılır.",
          "Tanı testleri tedaviyi geciktirmemelidir.",
          "Diyet, replasman, substrat kısıtlaması veya hedef moleküler mekanizma yönetimi belirler."
        ],
        "management": [
          "Acil klinik stabilizasyon ve temel laboratuvar değerlendirmesi — Hipoglisemi, asidoz, anemi veya organ yetmezliği varsa mortalite yaratabilir.",
          "Sorumlu substrat/eksik vitamin veya hedef biyokimyasal bozukluğu düzelt — Patofizyolojik yükü azaltır.",
          "Spesifik metabolit, enzim, lipid veya genetik doğrulama yap — Kesin tanı ve aile danışmanlığı sağlar.",
          "Uzun dönem beslenme/metabolizma veya ilgili branş takibi planla — Komplikasyonları azaltır."
        ],
        "learningOutcome": "Metabolizma, vitamin, eser element ve lipoprotein tablolarında semptom paterni, sorumlu molekül/enzim ya da eksik besin ögesi ve temel yönetim birlikte okunmalıdır.",
        "differentials": {
          "Esansiyel fruktozüri": {
            "explanation": "Esansiyel fruktozüri ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Herediter fruktoz intoleransı lehinedir.",
            "comparisonPoints": [
              "Esansiyel fruktozüri için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Herediter fruktoz intoleransı tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Galaktozemi": {
            "explanation": "Galaktozemi ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Herediter fruktoz intoleransı lehinedir.",
            "comparisonPoints": [
              "Galaktozemi için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Herediter fruktoz intoleransı tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "GSD Tip Ia": {
            "explanation": "GSD Tip Ia ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Herediter fruktoz intoleransı lehinedir.",
            "comparisonPoints": [
              "GSD Tip Ia için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Herediter fruktoz intoleransı tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "pediatrics-von-gierke-gsd-001",
    "branchId": "pediatrics",
    "title": "Kısa açlıkta nöbet ve belirgin hepatomegali gelişen çocuk",
    "difficulty": "Orta · TUS düzeyi",
    "clinicalFocus": "Glikojenoliz/glukoneogenez çıkış basamağı, glukoz-6-fosfataz eksikliği",
    "demographics": "2 yaş erkek çocuk",
    "setting": "Pediatri/metabolizma polikliniği veya acil başvuru",
    "chiefComplaint": "3-4 saat açlık sonrası terleme, nöbet ve karın şişliği",
    "stem": "Çocuk sabahları beslenme geciktiğinde terleme, irritabilite ve bazen nöbet geçirmektedir. Muayenede hepatomegali ve dolgun yanaklı “taş bebek yüzü” görünümü vardır. Açlık hipoglisemisi, hepatomegali, laktik asidoz ve hiperlipemi birlikte karaciğer tipi glikojen depo hastalığını düşündürür.",
    "vitals": {
      "TA": "88/54 mmHg",
      "Nabız": "132/dk",
      "Solunum": "28/dk",
      "SpO2": "%98",
      "Ateş": "36.7 °C"
    },
    "exam": [
      "Genel durum orta; çocuk açlık dönemlerinde irritabl, terli ve halsiz görünümde.",
      "Büyüme geriliği, dolgun yanaklı yüz görünümü ve karında belirgin distansiyon izleniyor.",
      "Mukozalar hafif kuru; ciltte ksantom, peteşi veya yaygın döküntü izlenmiyor.",
      "Abdomen yumuşak; karaciğer sağ kostal ark altında yaklaşık 5 cm ele geliyor, belirgin splenomegali yok.",
      "Kardiyopulmoner muayenede ek patolojik bulgu saptanmıyor.",
      "Nörolojik muayenede nöbet sonrası uykuya meyil dışında kalıcı fokal motor defisit veya meningeal irritasyon bulgusu saptanmıyor."
    ],
    "investigations": [
      {
        "id": "glukoz-laktat-trigliserid-ve-urik-asit-05",
        "label": "Glukoz, laktat, trigliserid ve ürik asit",
        "type": "lab",
        "priority": "essential",
        "summary": "Açlık hipoglisemisiyle birlikte laktat, trigliserid ve ürik asit yüksekliği saptandı.",
        "findings": [
          "Laboratuvar paterni glukoz-6-fosfataz defektini destekler.",
          "Hepatik glukoz çıkışı bozulmuştur."
        ],
        "rows": [
          [
            "Glukoz",
            "38 mg/dL",
            "70-100 mg/dL",
            "Düşük"
          ],
          [
            "Laktat",
            "5.6 mmol/L",
            "<2 mmol/L",
            "Yüksek"
          ],
          [
            "Trigliserid",
            "420 mg/dL",
            "<150 mg/dL",
            "Yüksek"
          ],
          [
            "Ürik asit",
            "8.2 mg/dL",
            "2-5.5 mg/dL",
            "Yüksek"
          ]
        ]
      },
      {
        "id": "glukoz-6-fosfataz-aktivitesi-05",
        "label": "Glukoz-6-fosfataz aktivitesi",
        "type": "lab",
        "priority": "essential",
        "summary": "Glukoz-6-fosfataz aktivitesi düşük bulundu.",
        "findings": [
          "Son ortak glukoz üretim basamağı etkilenmiştir.",
          "Açlıkta hipoglisemi ve hepatomegali bu defektle açıklanır."
        ],
        "rows": [
          [
            "G6Paz aktivitesi",
            "Düşük",
            "Normal",
            "Patolojik"
          ],
          [
            "Glukagon yanıtı",
            "Yetersiz glukoz artışı",
            "Artış beklenir",
            "Anormal"
          ]
        ]
      },
      {
        "id": "idrar-ketonu-ve-asidoz-degerlendirmesi-05",
        "label": "İdrar ketonu ve kan gazı",
        "type": "urine",
        "priority": "useful",
        "summary": "İdrarda keton değişken; kan gazında laktik asidoz izlendi.",
        "findings": [
          "Laktik asidoz Von Gierke için ayırt ettiricidir.",
          "Keton düzeyi tek başına tanıyı dışlamaz."
        ],
        "rows": [
          [
            "İdrar ketonu",
            "Hafif/ değişken",
            "Negatif-hafif",
            "Uyumlu"
          ],
          [
            "pH",
            "7.29",
            "7.35-7.45",
            "Düşük"
          ],
          [
            "Bikarbonat",
            "17 mmol/L",
            "22-28 mmol/L",
            "Düşük"
          ]
        ]
      },
      {
        "id": "g6pc-gen-analizi-05",
        "label": "G6PC gen analizi",
        "type": "lab",
        "priority": "situational",
        "summary": "G6PC geninde patojenik varyant saptandı.",
        "findings": [
          "Moleküler sonuç Von Gierke tanısını doğrular.",
          "Beslenme tedavisi genetik sonucu beklemeden başlatılır."
        ],
        "rows": [
          [
            "G6PC varyantı",
            "Patojenik varyant",
            "Patojenik varyant yok",
            "Pozitif"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "GSD Tip Ia - Von Gierke",
      "options": [
        "GSD Tip Ia - Von Gierke",
        "Pompe hastalığı",
        "McArdle hastalığı",
        "Herediter fruktoz intoleransı"
      ],
      "explanation": "Olgu paterni Glikojen depo hastalığı Tip Ia - Von Gierke ile uyumludur. Klinik zamanlama, hedef laboratuvar bulguları ve mekanizma birlikte değerlendirildiğinde bu tanı en güçlü seçenektir.",
      "pearls": [
        "Açlık hipoglisemisi + hepatomegali karaciğer tipi GSD düşündürür.",
        "Von Gierke: glukoz-6-fosfataz eksikliği.",
        "Laktik asidoz, hiperlipemi ve hiperürisemi eşlik edebilir.",
        "Sık beslenme/gece mısır nişastası yaklaşımı sınavda bilinir."
      ],
      "nextStep": "Hipoglisemiyi düzelt, uzun açlığı önle, sık karbonhidrat/mısır nişastası planla ve metabolizma uzmanına yönlendir.",
      "answerFeedback": {
        "diagnosisMeta": "Glikojen depo hastalığı Tip Ia - Von Gierke: Klinik-biyokimyasal patern, ayırıcı tanı ve sınav vurguları ile uyumlu.",
        "whyCorrect": "Olgu paterni Glikojen depo hastalığı Tip Ia - Von Gierke ile uyumludur. Klinik zamanlama, hedef laboratuvar bulguları ve biyokimyasal mekanizma birlikte değerlendirildiğinde bu tanı en güçlü seçenektir.",
        "evidenceChain": [
          "Olgu bulguları Glikojen depo hastalığı Tip Ia — Von Gierke ile uyumlu",
          "Glukoz 38 mg/dL, laktat yüksek, trigliserid yüksek, ürik asit yüksek",
          "Glukoz-6-fosfataz aktivitesi düşük",
          "Hedef mekanizma ve sınav ipuçları tabloyu destekler"
        ],
        "pearls": [
          "Acil metabolik, hematolojik veya organ yetmezliği bulgusu varsa önce stabilizasyon yapılır.",
          "Tanı testleri tedaviyi geciktirmemelidir.",
          "Diyet, replasman, substrat kısıtlaması veya hedef moleküler mekanizma yönetimi belirler."
        ],
        "management": [
          "Acil klinik stabilizasyon ve temel laboratuvar değerlendirmesi — Hipoglisemi, asidoz, anemi veya organ yetmezliği varsa mortalite yaratabilir.",
          "Sorumlu substrat/eksik vitamin veya hedef biyokimyasal bozukluğu düzelt — Patofizyolojik yükü azaltır.",
          "Spesifik metabolit, enzim, lipid veya genetik doğrulama yap — Kesin tanı ve aile danışmanlığı sağlar.",
          "Uzun dönem beslenme/metabolizma veya ilgili branş takibi planla — Komplikasyonları azaltır."
        ],
        "learningOutcome": "Metabolizma, vitamin, eser element ve lipoprotein tablolarında semptom paterni, sorumlu molekül/enzim ya da eksik besin ögesi ve temel yönetim birlikte okunmalıdır.",
        "differentials": {
          "Pompe hastalığı": {
            "explanation": "Pompe hastalığı ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni GSD Tip Ia - Von Gierke lehinedir.",
            "comparisonPoints": [
              "Pompe hastalığı için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri GSD Tip Ia - Von Gierke tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "McArdle hastalığı": {
            "explanation": "McArdle hastalığı ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni GSD Tip Ia - Von Gierke lehinedir.",
            "comparisonPoints": [
              "McArdle hastalığı için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri GSD Tip Ia - Von Gierke tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Herediter fruktoz intoleransı": {
            "explanation": "Herediter fruktoz intoleransı ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni GSD Tip Ia - Von Gierke lehinedir.",
            "comparisonPoints": [
              "Herediter fruktoz intoleransı için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri GSD Tip Ia - Von Gierke tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "pediatrics-phenylketonuria-001",
    "branchId": "pediatrics",
    "title": "Küf kokulu idrar ve gelişim geriliği olan bebek",
    "difficulty": "Orta · TUS düzeyi",
    "clinicalFocus": "Fenilalanin hidroksilaz eksikliği, nörotoksisite, yenidoğan taraması",
    "demographics": "4 aylık kız bebek",
    "setting": "Pediatri/metabolizma polikliniği veya acil başvuru",
    "chiefComplaint": "Gelişim geriliği, nöbet ve idrarda küf/küfemsi koku",
    "stem": "Aile bebeğin giderek daha huzursuz olduğunu, baş kontrolünün zayıf kaldığını ve bezinde küf benzeri koku fark ettiğini söyler. Açık ten, nöbet öyküsü ve gelişimsel gecikme fenilalanin metabolizması bozukluğu açısından yüksek klinik şüphe oluşturur.",
    "vitals": {
      "TA": "86/50 mmHg",
      "Nabız": "124/dk",
      "Solunum": "28/dk",
      "SpO2": "%99",
      "Ateş": "36.8 °C"
    },
    "exam": [
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Bezde küf benzeri belirgin koku fark ediliyor; cilt ve saç pigmentasyonu aileye göre açık görünümde.",
      "Açık ten ve saç rengi aileye göre belirgin açık",
      "Baş kontrolü gecikmiş, hafif aksiyal hipotoni var",
      "Ekzematöz deri lezyonları izleniyor",
      "Hepatomegali ve sarılık saptanmıyor"
    ],
    "investigations": [
      {
        "id": "plazma-fenilalanin-duzeyi-06",
        "label": "Plazma fenilalanin düzeyi",
        "type": "lab",
        "priority": "essential",
        "summary": "Plazma fenilalanin düzeyi belirgin yüksek bulundu.",
        "findings": [
          "Nörogelişimsel etkilenme riski yüksektir.",
          "Diyet tedavisi erken başlanmalıdır."
        ],
        "rows": [
          [
            "Fenilalanin",
            "22 mg/dL",
            "<2 mg/dL",
            "Yüksek"
          ],
          [
            "Klinik",
            "Küf kokulu idrar",
            "Yok",
            "Patolojik"
          ]
        ]
      },
      {
        "id": "tirozin-ve-fenilalanin-tirozin-orani-06",
        "label": "Tirozin ve fenilalanin/tirozin oranı",
        "type": "lab",
        "priority": "essential",
        "summary": "Tirozin düşük, fenilalanin/tirozin oranı yüksek saptandı.",
        "findings": [
          "Fenilalanin hidroksilaz yolunda blok düşündürür.",
          "Tirozin koşullu esansiyel hale gelir."
        ],
        "rows": [
          [
            "Tirozin",
            "Düşük",
            "Normal",
            "Düşük"
          ],
          [
            "Phe/Tyr oranı",
            "Yüksek",
            "Normal",
            "Patolojik"
          ]
        ]
      },
      {
        "id": "yenidogan-tarama-testi-tekrari-06",
        "label": "Yenidoğan tarama testi tekrarı",
        "type": "lab",
        "priority": "useful",
        "summary": "Yenidoğan tarama testi pozitif geldi; tekrar örnek tanıyı destekledi.",
        "findings": [
          "Tarama sonucu klinik şüpheyle uyumludur.",
          "Kesin değerlendirme tedaviyi geciktirmeden yapılır."
        ],
        "rows": [
          [
            "Tarama testi",
            "Pozitif",
            "Negatif",
            "Patolojik"
          ],
          [
            "Tekrar örnek",
            "Pozitif",
            "Negatif",
            "Patolojik"
          ]
        ]
      },
      {
        "id": "pah-bh4-iliskili-genetik-ve-kofaktor-degerlendirmesi-06",
        "label": "PAH gen analizi ve BH4 yanıt testi",
        "type": "lab",
        "priority": "situational",
        "summary": "PAH aktivitesi düşük, BH4 yanıt testi negatif saptandı.",
        "findings": [
          "Yüksek fenilalaninle birlikte PAH eksikliği klasik PKU ile uyumludur.",
          "BH4 yanıtının olmaması klasik diyet tedavisini öne çıkarır."
        ],
        "rows": [
          [
            "PAH aktivitesi",
            "%12",
            ">%50",
            "Düşük"
          ],
          [
            "BH4 yanıt testi",
            "Negatif",
            "Pozitif/negatif",
            "Negatif"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "Fenilketonüri",
      "options": [
        "Fenilketonüri",
        "Akçaağaç şurubu idrar hastalığı",
        "Alkaptonüri",
        "Albinizm"
      ],
      "explanation": "Olgu paterni Fenilketonüri ile uyumludur. Klinik zamanlama, hedef laboratuvar bulguları ve mekanizma birlikte değerlendirildiğinde bu tanı en güçlü seçenektir.",
      "pearls": [
        "PKU, aminoasit metabolizması bozuklukları içinde yüksek verimli ve erken tedavi gerektiren bir tablodur.",
        "Fenilalanin yüksekliği nörotoksiktir; tedavi erken başlamalıdır.",
        "Diyetle fenilalanin kısıtlaması ve tirozin desteği düşünülür.",
        "Yenidoğan taraması kritik önemdedir."
      ],
      "nextStep": "Fenilalanin kısıtlı diyet başla, tirozin desteğini planla, BH4 yanıtını/genetik tanıyı değerlendir.",
      "answerFeedback": {
        "diagnosisMeta": "Fenilketonüri: Klinik-biyokimyasal patern, ayırıcı tanı ve sınav vurguları ile uyumlu.",
        "whyCorrect": "Olgu paterni Fenilketonüri ile uyumludur. Klinik zamanlama, hedef laboratuvar bulguları ve biyokimyasal mekanizma birlikte değerlendirildiğinde bu tanı en güçlü seçenektir.",
        "evidenceChain": [
          "Olgu bulguları Fenilketonüri ile uyumlu",
          "Fenilalanin yüksek, tirozin düşük/normal",
          "Fenilalanin hidroksilaz aktivitesi düşük veya BH4 yolu değerlendirildi",
          "Hedef mekanizma ve sınav ipuçları tabloyu destekler"
        ],
        "pearls": [
          "Acil metabolik, hematolojik veya organ yetmezliği bulgusu varsa önce stabilizasyon yapılır.",
          "Tanı testleri tedaviyi geciktirmemelidir.",
          "Diyet, replasman, substrat kısıtlaması veya hedef moleküler mekanizma yönetimi belirler."
        ],
        "management": [
          "Acil klinik stabilizasyon ve temel laboratuvar değerlendirmesi — Hipoglisemi, asidoz, anemi veya organ yetmezliği varsa mortalite yaratabilir.",
          "Sorumlu substrat/eksik vitamin veya hedef biyokimyasal bozukluğu düzelt — Patofizyolojik yükü azaltır.",
          "Spesifik metabolit, enzim, lipid veya genetik doğrulama yap — Kesin tanı ve aile danışmanlığı sağlar.",
          "Uzun dönem beslenme/metabolizma veya ilgili branş takibi planla — Komplikasyonları azaltır."
        ],
        "learningOutcome": "Metabolizma, vitamin, eser element ve lipoprotein tablolarında semptom paterni, sorumlu molekül/enzim ya da eksik besin ögesi ve temel yönetim birlikte okunmalıdır.",
        "differentials": {
          "Akçaağaç şurubu idrar hastalığı": {
            "explanation": "Akçaağaç şurubu idrar hastalığı ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Fenilketonüri lehinedir.",
            "comparisonPoints": [
              "Akçaağaç şurubu idrar hastalığı için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Fenilketonüri tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Alkaptonüri": {
            "explanation": "Alkaptonüri ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Fenilketonüri lehinedir.",
            "comparisonPoints": [
              "Alkaptonüri için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Fenilketonüri tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Albinizm": {
            "explanation": "Albinizm ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Fenilketonüri lehinedir.",
            "comparisonPoints": [
              "Albinizm için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Fenilketonüri tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "pediatrics-maple-syrup-urine-disease-001",
    "branchId": "pediatrics",
    "title": "Tatlı kokulu idrar ve nörolojik kötüleşme ile başvuran yenidoğan",
    "difficulty": "Orta · TUS düzeyi",
    "clinicalFocus": "Dallı zincirli aminoasit katabolizması, BCKD eksikliği, lösin toksisitesi",
    "demographics": "8 günlük yenidoğan",
    "setting": "Pediatri/metabolizma polikliniği veya acil başvuru",
    "chiefComplaint": "Beslenememe, letarji, tiz ağlama ve idrarda tatlı koku",
    "stem": "Yenidoğan ilk günlerde normal görünmüş, ardından beslenme güçlüğü, kusma, letarji ve nörolojik kötüleşme gelişmiştir. İdrarda akçaağaç şurubu benzeri tatlı koku tariflenir. Erken dönemde nörotoksik dallı zincirli aminoasit birikimi akla gelir.",
    "vitals": {
      "TA": "68/42 mmHg",
      "Nabız": "172/dk",
      "Solunum": "46/dk",
      "SpO2": "%96",
      "Ateş": "36.4 °C"
    },
    "exam": [
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Yenidoğan letarjik ve emmesi zayıf",
      "Bezde tatlı/akçaağaç şurubu benzeri koku tarifleniyor",
      "Aksiyal hipotoniye intermittan ekstansör postür eşlik ediyor",
      "Fontanel bombeli değil, ense sertliği yok",
      "Dehidratasyon hafif düzeyde"
    ],
    "investigations": [
      {
        "id": "plazma-dalli-zincirli-aminoasitler-07",
        "label": "Plazma dallı zincirli aminoasitler",
        "type": "lab",
        "priority": "essential",
        "summary": "Lösin, izolösin ve valin düzeyleri belirgin yüksek bulundu.",
        "findings": [
          "Dallı zincirli aminoasit yıkımı bozulmuştur.",
          "Lösin yüksekliği nörotoksisiteyle ilişkilidir."
        ],
        "rows": [
          [
            "Lösin",
            "Belirgin yüksek",
            "Normal",
            "Patolojik"
          ],
          [
            "İzolösin",
            "Yüksek",
            "Normal",
            "Patolojik"
          ],
          [
            "Valin",
            "Yüksek",
            "Normal",
            "Patolojik"
          ]
        ]
      },
      {
        "id": "idrar-organik-asit-ketoasit-analizi-07",
        "label": "İdrar organik asit/ketoasit analizi",
        "type": "urine",
        "priority": "essential",
        "summary": "İdrarda dallı zincirli ketoasitler pozitif saptandı.",
        "findings": [
          "BCKD kompleksi defektini destekler.",
          "Tatlı kokulu idrar bulgusunu açıklar."
        ],
        "rows": [
          [
            "Ketoasitler",
            "Pozitif",
            "Negatif",
            "Patolojik"
          ],
          [
            "Koku",
            "Akçaağaç şurubu benzeri",
            "Yok",
            "Patolojik"
          ]
        ]
      },
      {
        "id": "kan-gazi-glukoz-ve-elektrolitler-07",
        "label": "Kan gazı, glukoz ve elektrolitler",
        "type": "lab",
        "priority": "useful",
        "summary": "Kan gazında metabolik asidoz ve hipoglisemiye eğilim izlendi.",
        "findings": [
          "Akut nörolojik kötüleşme metabolik kriz ile uyumludur.",
          "Elektrolitler yakın izlem gerektirir."
        ],
        "rows": [
          [
            "pH",
            "7.28",
            "7.35-7.45",
            "Düşük"
          ],
          [
            "Glukoz",
            "58 mg/dL",
            "70-100 mg/dL",
            "Düşük"
          ],
          [
            "Anyon açığı",
            "Yüksek",
            "Normal",
            "Patolojik"
          ]
        ]
      },
      {
        "id": "bckd-kompleks-genetik-testi-07",
        "label": "BCKD kompleks genetik testi",
        "type": "lab",
        "priority": "situational",
        "summary": "BCKD kompleks genleri için doğrulayıcı genetik test planlandı.",
        "findings": [
          "Tanı ve aile danışmanlığı için yer alır.",
          "Akut tedavi laboratuvar doğrulamasını beklememelidir."
        ],
        "rows": [
          [
            "BCKD gen analizi",
            "Planlandı",
            "Gerektiğinde",
            "Beklemede"
          ],
          [
            "Aile danışmanlığı",
            "Önerildi",
            "Risk yoksa gerekmez",
            "Gerekli"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "Akçaağaç şurubu idrar hastalığı",
      "options": [
        "Akçaağaç şurubu idrar hastalığı",
        "Fenilketonüri",
        "Galaktozemi",
        "Homosistinüri"
      ],
      "explanation": "Olgu paterni Akçaağaç şurubu idrar hastalığı ile uyumludur. Klinik zamanlama, hedef laboratuvar bulguları ve mekanizma birlikte değerlendirildiğinde bu tanı en güçlü seçenektir.",
      "pearls": [
        "Tatlı/akçaağaç şurubu kokusu + yenidoğan nörolojik kötüleşme MSUD için tipiktir.",
        "Leucine nörotoksisitesi acildir.",
        "Tedavide BCAA kısıtlaması ve akut dönemde toksik metabolit uzaklaştırılması düşünülür.",
        "Tiamin yanıtlı formlar olabilir."
      ],
      "nextStep": "Acil metabolik stabilizasyon, BCAA kısıtlaması, yüksek lösin varsa yoğun tedavi/diyaliz değerlendirmesi.",
      "answerFeedback": {
        "diagnosisMeta": "Akçaağaç şurubu idrar hastalığı: Klinik-biyokimyasal patern, ayırıcı tanı ve sınav vurguları ile uyumlu.",
        "whyCorrect": "Olgu paterni Akçaağaç şurubu idrar hastalığı ile uyumludur. Klinik zamanlama, hedef laboratuvar bulguları ve biyokimyasal mekanizma birlikte değerlendirildiğinde bu tanı en güçlü seçenektir.",
        "evidenceChain": [
          "Olgu bulguları Akçaağaç şurubu idrar hastalığı ile uyumlu",
          "Lösin, izolösin ve valin yüksek; metabolik asidoz",
          "BCKD kompleksi aktivitesi düşük",
          "Hedef mekanizma ve sınav ipuçları tabloyu destekler"
        ],
        "pearls": [
          "Acil metabolik, hematolojik veya organ yetmezliği bulgusu varsa önce stabilizasyon yapılır.",
          "Tanı testleri tedaviyi geciktirmemelidir.",
          "Diyet, replasman, substrat kısıtlaması veya hedef moleküler mekanizma yönetimi belirler."
        ],
        "management": [
          "Acil klinik stabilizasyon ve temel laboratuvar değerlendirmesi — Hipoglisemi, asidoz, anemi veya organ yetmezliği varsa mortalite yaratabilir.",
          "Sorumlu substrat/eksik vitamin veya hedef biyokimyasal bozukluğu düzelt — Patofizyolojik yükü azaltır.",
          "Spesifik metabolit, enzim, lipid veya genetik doğrulama yap — Kesin tanı ve aile danışmanlığı sağlar.",
          "Uzun dönem beslenme/metabolizma veya ilgili branş takibi planla — Komplikasyonları azaltır."
        ],
        "learningOutcome": "Metabolizma, vitamin, eser element ve lipoprotein tablolarında semptom paterni, sorumlu molekül/enzim ya da eksik besin ögesi ve temel yönetim birlikte okunmalıdır.",
        "differentials": {
          "Fenilketonüri": {
            "explanation": "Fenilketonüri ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Akçaağaç şurubu idrar hastalığı lehinedir.",
            "comparisonPoints": [
              "Fenilketonüri için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Akçaağaç şurubu idrar hastalığı tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Galaktozemi": {
            "explanation": "Galaktozemi ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Akçaağaç şurubu idrar hastalığı lehinedir.",
            "comparisonPoints": [
              "Galaktozemi için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Akçaağaç şurubu idrar hastalığı tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Homosistinüri": {
            "explanation": "Homosistinüri ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Akçaağaç şurubu idrar hastalığı lehinedir.",
            "comparisonPoints": [
              "Homosistinüri için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Akçaağaç şurubu idrar hastalığı tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "internal-medicine-alkaptonuria-001",
    "branchId": "internal-medicine",
    "title": "İdrarı bekleyince koyulaşan erişkinde eklem yakınmaları",
    "difficulty": "Orta · TUS düzeyi",
    "clinicalFocus": "Homogentisik asit oksidaz eksikliği, okronozis, koyu idrar, eklem tutulumu",
    "demographics": "35 yaş erkek",
    "setting": "Pediatri/metabolizma polikliniği veya acil başvuru",
    "chiefComplaint": "Bel ağrısı, büyük eklem ağrısı ve bekleyince siyahlaşan idrar",
    "stem": "Hasta yıllardır idrarının beklediğinde koyulaştığını, son yıllarda bel ve diz ağrılarının arttığını belirtir. Kulak kıkırdağında koyu pigmentasyon vardır. Bu klinik, tirozin katabolizması ara ürünü homogentisik asit birikimiyle uyumludur.",
    "vitals": {
      "TA": "126/78 mmHg",
      "Nabız": "78/dk",
      "Solunum": "16/dk",
      "SpO2": "%98",
      "Ateş": "36.6 °C"
    },
    "exam": [
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Sklera ve kulak kıkırdağında mavi-siyah pigmentasyon görülüyor",
      "Lomber omurga ve kalçada hareket kısıtlılığı var",
      "Dizlerde krepitasyon ve kronik ağrı mevcut",
      "Akut sıcak-kızarık eklem bulgusu yok",
      "Yürüyüş antalgik; lomber ekstansiyon ve kalça iç rotasyonu ağrılı ve kısıtlıdır."
    ],
    "investigations": [
      {
        "id": "idrarda-homogentisik-asit-08",
        "label": "İdrarda homogentisik asit",
        "type": "urine",
        "priority": "essential",
        "summary": "İdrarda homogentisik asit düzeyi yüksek bulundu.",
        "findings": [
          "Tirozin yıkım yolunda homogentizat oksidaz defekti desteklenir.",
          "Kronik okronozis ve artropati riskini açıklar."
        ],
        "rows": [
          [
            "Homogentisik asit",
            "Yüksek",
            "Düşük/negatif",
            "Patolojik"
          ]
        ]
      },
      {
        "id": "idrar-bekletme-alkalinizasyon-gozlemi-08",
        "label": "İdrar bekletme/alkalinizasyon gözlemi",
        "type": "urine",
        "priority": "essential",
        "summary": "Bekletilen idrar örneği koyu kahverengi-siyah renge döndü.",
        "findings": [
          "Oksidasyonla renk değişimi alkaptonüri için tipiktir.",
          "Basit gözlem tanısal şüpheyi güçlendirir."
        ],
        "rows": [
          [
            "İdrar rengi",
            "Bekletince siyahlaştı",
            "Değişmez",
            "Patolojik"
          ],
          [
            "Alkalinizasyon",
            "Koyulaşma arttı",
            "Değişmez",
            "Uyumlu"
          ]
        ]
      },
      {
        "id": "eklem-grafisi-08",
        "label": "Eklem grafisi",
        "type": "xray",
        "priority": "useful",
        "summary": "Eklem grafisinde dejeneratif artropati bulguları izlendi.",
        "findings": [
          "Kronik pigment birikimi eklem hasarıyla uyumludur.",
          "Akut enfeksiyöz artrit lehine bulgu yoktur."
        ],
        "rows": [
          [
            "Omurga/diz grafisi",
            "Dejeneratif değişiklik",
            "Yaşa uygun",
            "Patolojik"
          ],
          [
            "Erozyon",
            "Belirgin değil",
            "Yok",
            "Ayırıcı"
          ]
        ]
      },
      {
        "id": "hgd-gen-analizi-08",
        "label": "HGD gen analizi",
        "type": "lab",
        "priority": "situational",
        "summary": "HGD gen analizi için örnek gönderildi.",
        "findings": [
          "Moleküler doğrulama ve aile danışmanlığı sağlar.",
          "Tedavi semptom ve komplikasyon kontrolüne yöneliktir."
        ],
        "rows": [
          [
            "HGD analizi",
            "Planlandı",
            "Gerektiğinde",
            "Beklemede"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "Alkaptonüri",
      "options": [
        "Alkaptonüri",
        "Fenilketonüri",
        "Albinizm",
        "Tirozinemi Tip I"
      ],
      "explanation": "Olgu paterni Alkaptonüri ile uyumludur. Klinik zamanlama, hedef laboratuvar bulguları ve mekanizma birlikte değerlendirildiğinde bu tanı en güçlü seçenektir.",
      "pearls": [
        "Bekleyince koyulaşan idrar ve okronozis alkaptonüriyi düşündürür.",
        "Homogentisik asit oksidaz eksiktir.",
        "Erişkinde dejeneratif eklem hastalığı ile gelebilir.",
        "Klinik tanıda idrar bulgusu çok yüksek verimlidir."
      ],
      "nextStep": "Homogentisik asit düzeyini doğrula, eklem/kalp tutulumunu değerlendir, uzun dönem metabolizma-romatoloji izlemi planla.",
      "answerFeedback": {
        "diagnosisMeta": "Alkaptonüri: Klinik-biyokimyasal patern, ayırıcı tanı ve sınav vurguları ile uyumlu.",
        "whyCorrect": "Olgu paterni Alkaptonüri ile uyumludur. Klinik zamanlama, hedef laboratuvar bulguları ve biyokimyasal mekanizma birlikte değerlendirildiğinde bu tanı en güçlü seçenektir.",
        "evidenceChain": [
          "Olgu bulguları Alkaptonüri ile uyumlu",
          "Rutin biyokimya çoğunlukla stabil; inflamasyon yok",
          "Homogentisik asit oksidaz defekti",
          "Hedef mekanizma ve sınav ipuçları tabloyu destekler"
        ],
        "pearls": [
          "Acil metabolik, hematolojik veya organ yetmezliği bulgusu varsa önce stabilizasyon yapılır.",
          "Tanı testleri tedaviyi geciktirmemelidir.",
          "Diyet, replasman, substrat kısıtlaması veya hedef moleküler mekanizma yönetimi belirler."
        ],
        "management": [
          "Acil klinik stabilizasyon ve temel laboratuvar değerlendirmesi — Hipoglisemi, asidoz, anemi veya organ yetmezliği varsa mortalite yaratabilir.",
          "Sorumlu substrat/eksik vitamin veya hedef biyokimyasal bozukluğu düzelt — Patofizyolojik yükü azaltır.",
          "Spesifik metabolit, enzim, lipid veya genetik doğrulama yap — Kesin tanı ve aile danışmanlığı sağlar.",
          "Uzun dönem beslenme/metabolizma veya ilgili branş takibi planla — Komplikasyonları azaltır."
        ],
        "learningOutcome": "Metabolizma, vitamin, eser element ve lipoprotein tablolarında semptom paterni, sorumlu molekül/enzim ya da eksik besin ögesi ve temel yönetim birlikte okunmalıdır.",
        "differentials": {
          "Fenilketonüri": {
            "explanation": "Fenilketonüri ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Alkaptonüri lehinedir.",
            "comparisonPoints": [
              "Fenilketonüri için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Alkaptonüri tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Albinizm": {
            "explanation": "Albinizm ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Alkaptonüri lehinedir.",
            "comparisonPoints": [
              "Albinizm için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Alkaptonüri tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Tirozinemi Tip I": {
            "explanation": "Tirozinemi Tip I ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Alkaptonüri lehinedir.",
            "comparisonPoints": [
              "Tirozinemi Tip I için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Alkaptonüri tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "pediatrics-albinism-001",
    "branchId": "pediatrics",
    "title": "Fotofobi ve belirgin pigment azalması olan çocuk",
    "difficulty": "Orta · TUS düzeyi",
    "clinicalFocus": "Tirozinaz/melanin sentezi, pigmentasyon azlığı, göz bulguları",
    "demographics": "6 yaş kız çocuk",
    "setting": "Pediatri/metabolizma polikliniği veya acil başvuru",
    "chiefComplaint": "Güneşte yanma, açık renk saç-cilt ve görme sorunları",
    "stem": "Çocukta doğumdan beri cilt ve saç renginin belirgin açık olduğu, parlak ışıkta gözlerini kıstığı ve okulda tahtayı görmekte zorlandığı belirtilir. Nistagmus ve iris transillüminasyonu saptanır. Melanin sentezindeki bozukluk albinizm lehinedir.",
    "vitals": {
      "TA": "94/60 mmHg",
      "Nabız": "98/dk",
      "Solunum": "22/dk",
      "SpO2": "%99",
      "Ateş": "36.7 °C"
    },
    "exam": [
      "Genel durum iyi; çocuk fotofobi nedeniyle parlak ışıkta gözlerini kısmakta ve başını çevirmektedir.",
      "Cilt ve saçlarda yaygın pigment azalması izleniyor; güneş gören alanlarda aktinik hasar veya malignite şüphesi taşıyan lezyon yok.",
      "İris pigmentasyonu belirgin azalmış; horizontal nistagmus ve fiksasyon güçlüğü mevcut.",
      "Görme keskinliği yaşa göre düşük; şaşılık ve foveal hipoplaziyle uyumlu bulgular eşlik ediyor.",
      "Mukozal kanama, tekrarlayan ağır enfeksiyon veya nörolojik gelişim geriliği saptanmıyor.",
      "Abdomen muayenesinde hepatosplenomegali yok; kardiyopulmoner muayene doğal.",
      "Cilt, saç ve iriste yaygın pigment azalması; nistagmus izlendi. Melanin sentez bozukluğu belirgindir. Vitiligo gibi edinsel odaksal depigmentasyon paterni yoktur.",
      "Görme keskinliği düşük ve foveal hipoplazi ile uyumlu retina bulgusu izlendi. Oküler tutulum okülokütanöz albinizmi destekler. Fotofobi klinik tabloya eşlik eder."
    ],
    "investigations": [
      {
        "id": "tirozinaz-melanin-yolu-genetik-testi-09",
        "label": "Tirozinaz/melanin yolu genetik testi",
        "type": "lab",
        "priority": "useful",
        "summary": "Melanin yolu genleri için doğrulayıcı test planlandı.",
        "findings": [
          "Alt tip ayrımı ve aile danışmanlığı için yer alır.",
          "Klinik tanı muayene ile güçlüdür."
        ],
        "rows": [
          [
            "Tirozinaz yolu",
            "Genetik test planlandı",
            "Gerektiğinde",
            "Beklemede"
          ]
        ]
      },
      {
        "id": "visual-acuity-oct",
        "label": "Görme keskinliği ve optik koherens tomografi",
        "type": "clinical",
        "priority": "essential",
        "summary": "Görme keskinliği düşük ve OCT’de foveal hipoplazi ile uyumlu bulgu saptandı.",
        "findings": [
          "Foveal hipoplazi ve nistagmus okülokütanöz albinizmle uyumludur.",
          "Retinal kitle veya aktif inflamasyon izlenmedi."
        ],
        "rows": [
          [
            "Sağ göz görme keskinliği",
            "0.3",
            "Yaşa göre ≥0.8",
            "Düşük"
          ],
          [
            "Sol göz görme keskinliği",
            "0.4",
            "Yaşa göre ≥0.8",
            "Düşük"
          ],
          [
            "OCT fovea",
            "Foveal hipoplazi",
            "Normal foveal çukur",
            "Tanıyı destekler"
          ]
        ]
      },
      {
        "id": "albinism-cbc-platelet",
        "label": "Tam kan sayımı ve trombosit",
        "type": "lab",
        "priority": "useful",
        "summary": "Trombosit sayısı ve nötrofil düzeyi normal sınırlarda saptandı.",
        "findings": [
          "Ağır kanama diyatezi veya immün yetmezlik düşündüren laboratuvar bulgusu yoktur.",
          "Bu sonuç sendromik albinizm olasılığını azaltır."
        ],
        "rows": [
          [
            "Trombosit",
            "285.000/mm³",
            "150.000-450.000/mm³",
            "Normal"
          ],
          [
            "Nötrofil",
            "3.200/mm³",
            "1.500-8.000/mm³",
            "Normal"
          ],
          [
            "Hemoglobin",
            "12.6 g/dL",
            "11.5-15.5 g/dL",
            "Normal"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "Okülokütanöz albinizm",
      "options": [
        "Okülokütanöz albinizm",
        "Fenilketonüri",
        "Alkaptonüri",
        "Vitiligo"
      ],
      "explanation": "Olgu paterni Okülokütanöz albinizm ile uyumludur. Klinik zamanlama, hedef laboratuvar bulguları ve mekanizma birlikte değerlendirildiğinde bu tanı en güçlü seçenektir.",
      "pearls": [
        "Albinizmde pigmentasyon azlığı ve göz bulguları birlikte düşünülür.",
        "Melanin sentezi tirozin metabolizmasıyla ilişkilidir.",
        "Cilt kanseri ve güneş hasarı riski nedeniyle korunma önemlidir.",
        "PKU'da açık ten olabilir ama ağır pigment yokluğu ve oküler bulgular albinizmi destekler."
      ],
      "nextStep": "Güneşten korunma, dermatolojik takip ve oftalmolojik değerlendirme.",
      "answerFeedback": {
        "diagnosisMeta": "Okülokütanöz albinizm: Klinik-biyokimyasal patern, ayırıcı tanı ve sınav vurguları ile uyumlu.",
        "whyCorrect": "Olgu paterni Okülokütanöz albinizm ile uyumludur. Klinik zamanlama, hedef laboratuvar bulguları ve biyokimyasal mekanizma birlikte değerlendirildiğinde bu tanı en güçlü seçenektir.",
        "evidenceChain": [
          "Olgu bulguları Okülokütanöz albinizm ile uyumlu",
          "Biyokimya çoğunlukla normal",
          "Tirozinaz aktivitesi/genetik alt tip değerlendirildi",
          "Hedef mekanizma ve sınav ipuçları tabloyu destekler"
        ],
        "pearls": [
          "Acil metabolik, hematolojik veya organ yetmezliği bulgusu varsa önce stabilizasyon yapılır.",
          "Tanı testleri tedaviyi geciktirmemelidir.",
          "Diyet, replasman, substrat kısıtlaması veya hedef moleküler mekanizma yönetimi belirler."
        ],
        "management": [
          "Acil klinik stabilizasyon ve temel laboratuvar değerlendirmesi — Hipoglisemi, asidoz, anemi veya organ yetmezliği varsa mortalite yaratabilir.",
          "Sorumlu substrat/eksik vitamin veya hedef biyokimyasal bozukluğu düzelt — Patofizyolojik yükü azaltır.",
          "Spesifik metabolit, enzim, lipid veya genetik doğrulama yap — Kesin tanı ve aile danışmanlığı sağlar.",
          "Uzun dönem beslenme/metabolizma veya ilgili branş takibi planla — Komplikasyonları azaltır."
        ],
        "learningOutcome": "Metabolizma, vitamin, eser element ve lipoprotein tablolarında semptom paterni, sorumlu molekül/enzim ya da eksik besin ögesi ve temel yönetim birlikte okunmalıdır.",
        "differentials": {
          "Fenilketonüri": {
            "explanation": "Fenilketonüri ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Okülokütanöz albinizm lehinedir.",
            "comparisonPoints": [
              "Fenilketonüri için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Okülokütanöz albinizm tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Alkaptonüri": {
            "explanation": "Alkaptonüri ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Okülokütanöz albinizm lehinedir.",
            "comparisonPoints": [
              "Alkaptonüri için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Okülokütanöz albinizm tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Vitiligo": {
            "explanation": "Vitiligo ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Okülokütanöz albinizm lehinedir.",
            "comparisonPoints": [
              "Vitiligo için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Okülokütanöz albinizm tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "pediatrics-homocystinuria-001",
    "branchId": "pediatrics",
    "title": "Uzun boy, lens kayması ve tromboz öyküsü olan genç hasta",
    "difficulty": "Orta · TUS düzeyi",
    "clinicalFocus": "Metiyonin metabolizması, homosistein artışı, tromboz ve lens bulguları",
    "demographics": "14 yaş erkek",
    "setting": "Pediatri/metabolizma polikliniği veya acil başvuru",
    "chiefComplaint": "Görme bozukluğu, uzun boy-ince yapı ve bacakta şişlik",
    "stem": "Hasta uzun boylu ve ince yapılıdır; göz muayenesinde lens subluksasyonu saptanır. Sol bacakta ağrılı şişlik ile derin ven trombozu düşünülür. Bu kombinasyon homosistein artışı ve bağ dokusu/koagülasyon etkilenimini düşündürür.",
    "vitals": {
      "TA": "118/74 mmHg",
      "Nabız": "96/dk",
      "Solunum": "18/dk",
      "SpO2": "98%",
      "Ateş": "36.8 °C"
    },
    "exam": [
      "Genel durum iyi-orta; hasta uzun boylu, ince yapılı ve koopere.",
      "Ekstremiteler uzun, parmaklar ince ve araknodaktili görünümünde; pektus deformitesi izleniyor.",
      "Göz muayenesinde lens subluksasyonu inferonazal yönde tarifleniyor; konjonktival hiperemi yok.",
      "Sol baldırda hafif çevre artışı, palpasyonla hassasiyet ve yüzeyel venlerde dolgunluk mevcut; distal nabızlar alınabiliyor.",
      "Kardiyak oskültasyonda belirgin üfürüm duyulmuyor; akut kalp yetmezliği bulgusu saptanmıyor.",
      "Nörolojik muayenede bilinç açık, kraniyal sinirler doğal ve akut fokal defisit yok."
    ],
    "investigations": [
      {
        "id": "plazma-total-homosistein-ve-metiyonin-10",
        "label": "Plazma total homosistein ve metiyonin",
        "type": "lab",
        "priority": "essential",
        "summary": "Total homosistein ve metiyonin düzeyleri belirgin yüksek bulundu.",
        "findings": [
          "CBS eksikliği homosistein birikimiyle uyumludur.",
          "Tromboz eğilimi bu birikimle ilişkilidir."
        ],
        "rows": [
          [
            "Total homosistein",
            "Belirgin yüksek",
            "Normal",
            "Patolojik"
          ],
          [
            "Metiyonin",
            "Yüksek",
            "Normal",
            "Patolojik"
          ]
        ]
      },
      {
        "id": "cbs-genetik-testi-ve-b6-yaniti-10",
        "label": "CBS genetik testi ve B6 yanıtı",
        "type": "lab",
        "priority": "situational",
        "summary": "CBS gen analizi ve piridoksin yanıt testi planlandı.",
        "findings": [
          "B6 yanıtlı formlar tedavi yaklaşımını değiştirir.",
          "Genetik doğrulama aile danışmanlığı sağlar."
        ],
        "rows": [
          [
            "CBS analizi",
            "Planlandı",
            "Gerektiğinde",
            "Beklemede"
          ],
          [
            "B6 yanıtı",
            "Değerlendirilecek",
            "Gerektiğinde",
            "Beklemede"
          ]
        ]
      },
      {
        "id": "homocysteine-met-panel",
        "label": "Plazma homosistein ve metiyonin düzeyi",
        "type": "lab",
        "priority": "essential",
        "summary": "Plazma homosistein ve metiyonin düzeyleri belirgin yüksek saptandı.",
        "findings": [
          "Patern sistationin beta sentaz eksikliğini destekler.",
          "Marfan sendromunda homosistein yüksekliği beklenmez."
        ],
        "rows": [
          [
            "Total homosistein",
            "126 µmol/L",
            "5-15 µmol/L",
            "Yüksek"
          ],
          [
            "Metiyonin",
            "96 µmol/L",
            "10-45 µmol/L",
            "Yüksek"
          ],
          [
            "Vitamin B12",
            "520 pg/mL",
            "200-900 pg/mL",
            "Normal"
          ]
        ]
      },
      {
        "id": "venous-doppler-hcy",
        "label": "Alt ekstremite venöz Doppler USG",
        "type": "ultrasound",
        "priority": "useful",
        "summary": "Sol popliteal vende parsiyel trombüs izlendi.",
        "findings": [
          "Tromboz eğilimi homosistinüri için önemli klinik ipucudur.",
          "DVT varlığı akut antikoagülasyon kararını etkiler."
        ],
        "rows": [
          [
            "Sol popliteal ven",
            "Parsiyel trombüs",
            "Trombüs yok",
            "Pozitif"
          ],
          [
            "Kompresibilite",
            "Azalmış",
            "Tam kompresibl",
            "Patolojik"
          ]
        ]
      },
      {
        "id": "coagulation-panel-hcy",
        "label": "Koagülasyon paneli",
        "type": "lab",
        "priority": "situational",
        "summary": "PT, aPTT ve INR normal sınırlarda; tromboz eğilimi rutin koagülasyon testleriyle dışlanmaz.",
        "findings": [
          "INR 1.0",
          "PT 12.6 sn",
          "aPTT 30 sn"
        ],
        "rows": [
          [
            "INR",
            "1.0",
            "0.8-1.2",
            "Normal"
          ],
          [
            "PT",
            "12.6 sn",
            "11-14 sn",
            "Normal"
          ],
          [
            "aPTT",
            "30 sn",
            "25-35 sn",
            "Normal"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "Homosistinüri",
      "options": [
        "Homosistinüri",
        "Marfan sendromu",
        "Alkaptonüri",
        "Fenilketonüri"
      ],
      "explanation": "Olgu paterni Homosistinüri ile uyumludur. Klinik zamanlama, hedef laboratuvar bulguları ve mekanizma birlikte değerlendirildiğinde bu tanı en güçlü seçenektir.",
      "pearls": [
        "Lens subluksasyonu + tromboz eğilimi homosistinüri için yüksek verimlidir.",
        "Marfan ile karışır; tromboz homosistinüriyi destekler.",
        "B6, folat, B12 ve metiyonin kısıtlaması klinik tipe göre düşünülür.",
        "Homosistein endotel ve tromboz riskiyle ilişkilidir."
      ],
      "nextStep": "DVT yönetimini başlat, homosistein/metiyonin doğrula, vitamin yanıtı ve diyet planla.",
      "answerFeedback": {
        "diagnosisMeta": "Homosistinüri: Klinik-biyokimyasal patern, ayırıcı tanı ve sınav vurguları ile uyumlu.",
        "whyCorrect": "Olgu paterni Homosistinüri ile uyumludur. Klinik zamanlama, hedef laboratuvar bulguları ve biyokimyasal mekanizma birlikte değerlendirildiğinde bu tanı en güçlü seçenektir.",
        "evidenceChain": [
          "Olgu bulguları Homosistinüri ile uyumlu",
          "Total homosistein yüksek, metiyonin yüksek olabilir",
          "Sistationin beta sentaz defekti veya B12/folat yolu değerlendirildi",
          "Hedef mekanizma ve sınav ipuçları tabloyu destekler"
        ],
        "pearls": [
          "Acil metabolik, hematolojik veya organ yetmezliği bulgusu varsa önce stabilizasyon yapılır.",
          "Tanı testleri tedaviyi geciktirmemelidir.",
          "Diyet, replasman, substrat kısıtlaması veya hedef moleküler mekanizma yönetimi belirler."
        ],
        "management": [
          "Acil klinik stabilizasyon ve temel laboratuvar değerlendirmesi — Hipoglisemi, asidoz, anemi veya organ yetmezliği varsa mortalite yaratabilir.",
          "Sorumlu substrat/eksik vitamin veya hedef biyokimyasal bozukluğu düzelt — Patofizyolojik yükü azaltır.",
          "Spesifik metabolit, enzim, lipid veya genetik doğrulama yap — Kesin tanı ve aile danışmanlığı sağlar.",
          "Uzun dönem beslenme/metabolizma veya ilgili branş takibi planla — Komplikasyonları azaltır."
        ],
        "learningOutcome": "Metabolizma, vitamin, eser element ve lipoprotein tablolarında semptom paterni, sorumlu molekül/enzim ya da eksik besin ögesi ve temel yönetim birlikte okunmalıdır.",
        "differentials": {
          "Marfan sendromu": {
            "explanation": "Marfan sendromu ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Homosistinüri lehinedir.",
            "comparisonPoints": [
              "Marfan sendromu için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Homosistinüri tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Alkaptonüri": {
            "explanation": "Alkaptonüri ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Homosistinüri lehinedir.",
            "comparisonPoints": [
              "Alkaptonüri için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Homosistinüri tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Fenilketonüri": {
            "explanation": "Fenilketonüri ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Homosistinüri lehinedir.",
            "comparisonPoints": [
              "Fenilketonüri için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Homosistinüri tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "internal-medicine-pellagra-001",
    "branchId": "internal-medicine",
    "title": "Fotosensitif dermatit, diyare ve bilişsel yavaşlama ile başvuru",
    "difficulty": "Orta · TUS düzeyi",
    "clinicalFocus": "Vitamin B3 eksikliği, NAD/NADP, 3D triadı",
    "demographics": "47 yaş erkek, kronik alkol kullanımı ve kötü beslenme",
    "setting": "Pediatri/metabolizma polikliniği veya acil başvuru",
    "chiefComplaint": "Güneş gören alanlarda dermatit, ishal ve unutkanlık",
    "stem": "Hasta son aylarda çoğunlukla mısır ve karbonhidrat ağırlıklı beslendiğini; et, balık, yumurta ve süt ürünlerini çok az tükettiğini belirtir. Kronik ishal atakları nedeniyle kilo kaybı, halsizlik ve iştahsızlık gelişmiştir. Güneş gören alanlarda simetrik dermatit, oral mukozada glossit, kronik diyare ve bilişsel yavaşlama birlikte niasin eksikliğini düşündürür.",
    "vitals": {
      "TA": "108/68 mmHg",
      "Nabız": "104/dk",
      "Solunum": "18/dk",
      "SpO2": "%98",
      "Ateş": "37.0 °C"
    },
    "exam": [
      "Genel durum orta; hasta halsiz, kilo kaybetmiş ve dikkatini sürdürmekte zorlanıyor.",
      "Cilt muayenesinde yüz, boyun, el dorsumları ve ön kollarda güneş gören alanlarla sınırlı simetrik, keskin sınırlı, hiperpigmente ve hafif skuamlı dermatit izleniyor.",
      "Boyun çevresindeki lezyonlar kolye benzeri fotosensitif dağılım gösteriyor; vezikül, nekroz veya yaygın selülit bulgusu yok.",
      "Oral mukozada eritem, dilde parlak kırmızı görünüm ve papilla silinmesi mevcut.",
      "Abdomen yumuşak; yaygın hassasiyet, defans veya rebound saptanmıyor; kronik ishal öyküsüne rağmen akut batın bulgusu yok.",
      "Nörolojik muayenede fokal defisit yok; hasta irritabilite, unutkanlık ve konsantrasyon güçlüğü tarifliyor.",
      "Güneş gören alanlarda simetrik hiperpigmente dermatit izlendi. Fotosensitif dermatit pellagra için ayırt ettiricidir. İzole kontakt dermatit paterni değildir.",
      "Niasin/NAD eksikliğini destekleyen klinik ve beslenme paterni mevcuttur. Tedavi yanıtı klinik doğrulamaya katkı sağlar. Replasman geciktirilmemelidir."
    ],
    "investigations": [
      {
        "id": "temel-biyokimya-albumin-ve-elektrolitler-11",
        "label": "Temel biyokimya, albümin ve elektrolitler",
        "type": "lab",
        "priority": "essential",
        "summary": "Albümin düşük, elektrolitlerde hafif bozukluk izlendi.",
        "findings": [
          "Kronik beslenme yetersizliği laboratuvarla desteklenir.",
          "Ağır böbrek/karaciğer yetmezliği yoktur."
        ],
        "rows": [
          [
            "Albümin",
            "3.0 g/dL",
            "3.5-5.0 g/dL",
            "Düşük"
          ],
          [
            "Potasyum",
            "3.3 mmol/L",
            "3.5-5.1 mmol/L",
            "Düşük"
          ]
        ]
      },
      {
        "id": "niacin-metabolite",
        "label": "İdrar N1-metilnikotinamid düzeyi",
        "type": "lab",
        "priority": "essential",
        "summary": "İdrarda N1-metilnikotinamid atılımı belirgin düşük saptandı.",
        "findings": [
          "Düşük metabolit atılımı niasin eksikliğini destekler.",
          "Normal B12 ve TSH, bilişsel yavaşlama için alternatif metabolik nedenleri geri plana iter."
        ],
        "rows": [
          [
            "N1-metilnikotinamid",
            "0.4 mg/g kreatinin",
            ">1.5 mg/g kreatinin",
            "Düşük"
          ],
          [
            "Vitamin B12",
            "410 pg/mL",
            "200-900 pg/mL",
            "Normal"
          ],
          [
            "TSH",
            "2.1 mIU/L",
            "0.4-4.0 mIU/L",
            "Normal"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "Pellagra",
      "options": [
        "Pellagra",
        "Skorbüt",
        "Beriberi",
        "Raşitizm"
      ],
      "explanation": "Olgu paterni Niasin eksikliği - Pellagra ile uyumludur. Klinik zamanlama, hedef laboratuvar bulguları ve mekanizma birlikte değerlendirildiğinde bu tanı en güçlü seçenektir.",
      "pearls": [
        "Pellagra: dermatitis, diarrhea, dementia.",
        "Niasin B3 ve NAD/NADP ile ilişkilidir.",
        "Hartnup veya karsinoid gibi niasin azalmasına yol açan durumlar da düşünülür.",
        "Tedavi niasin replasmanı ve beslenme desteğidir."
      ],
      "nextStep": "Niasin replasmanı, sıvı-elektrolit desteği ve beslenme düzenlenmesi.",
      "answerFeedback": {
        "diagnosisMeta": "Niasin eksikliği - Pellagra: Klinik-biyokimyasal patern, ayırıcı tanı ve sınav vurguları ile uyumlu.",
        "whyCorrect": "Olgu paterni Niasin eksikliği - Pellagra ile uyumludur. Klinik zamanlama, hedef laboratuvar bulguları ve biyokimyasal mekanizma birlikte değerlendirildiğinde bu tanı en güçlü seçenektir.",
        "evidenceChain": [
          "Olgu bulguları Niasin eksikliği — Pellagra ile uyumlu",
          "Elektrolit bozukluğu ve malnütrisyon bulguları",
          "Niasin/NAD ilişkili eksiklik düşünülür",
          "Hedef mekanizma ve sınav ipuçları tabloyu destekler"
        ],
        "pearls": [
          "Acil metabolik, hematolojik veya organ yetmezliği bulgusu varsa önce stabilizasyon yapılır.",
          "Tanı testleri tedaviyi geciktirmemelidir.",
          "Diyet, replasman, substrat kısıtlaması veya hedef moleküler mekanizma yönetimi belirler."
        ],
        "management": [
          "Acil klinik stabilizasyon ve temel laboratuvar değerlendirmesi — Hipoglisemi, asidoz, anemi veya organ yetmezliği varsa mortalite yaratabilir.",
          "Sorumlu substrat/eksik vitamin veya hedef biyokimyasal bozukluğu düzelt — Patofizyolojik yükü azaltır.",
          "Spesifik metabolit, enzim, lipid veya genetik doğrulama yap — Kesin tanı ve aile danışmanlığı sağlar.",
          "Uzun dönem beslenme/metabolizma veya ilgili branş takibi planla — Komplikasyonları azaltır."
        ],
        "learningOutcome": "Metabolizma, vitamin, eser element ve lipoprotein tablolarında semptom paterni, sorumlu molekül/enzim ya da eksik besin ögesi ve temel yönetim birlikte okunmalıdır.",
        "differentials": {
          "Skorbüt": {
            "explanation": "Skorbüt ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Pellagra lehinedir.",
            "comparisonPoints": [
              "Skorbüt için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Pellagra tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Beriberi": {
            "explanation": "Beriberi ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Pellagra lehinedir.",
            "comparisonPoints": [
              "Beriberi için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Pellagra tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Raşitizm": {
            "explanation": "Raşitizm ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Pellagra lehinedir.",
            "comparisonPoints": [
              "Raşitizm için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Pellagra tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "internal-medicine-scurvy-001",
    "branchId": "internal-medicine",
    "title": "Diş eti kanaması ve yara iyileşme gecikmesi olan hasta",
    "difficulty": "Orta · TUS düzeyi",
    "clinicalFocus": "Kollajen hidroksilasyonu, kanama, yara iyileşmesi",
    "demographics": "62 yaş erkek, yalnız yaşıyor, taze sebze-meyve almıyor",
    "setting": "Pediatri/metabolizma polikliniği veya acil başvuru",
    "chiefComplaint": "Diş eti kanaması, morarma ve halsizlik",
    "stem": "Hasta uzun süredir taze sebze-meyve tüketmediğini, çoğunlukla hazır karbonhidrat ve çayla beslendiğini belirtir. Son haftalarda diş eti kanaması, kolay morarma, bacak ağrısı ve küçük yaraların geç kapanması gelişmiştir. Beslenme kısıtlılığı ile mukokutanöz kanama paterni C vitamini eksikliğini düşündürür. C vitamini eksikliğiyle uyumlu kısıtlı diyet ve mukokutanöz kanama bulguları saptandı. Diş eti kanaması ve perifoliküler kanama kollajen sentez bozukluğunu destekler. Trombositopeni temel açıklama değildir.",
    "vitals": {
      "TA": "110/70 mmHg",
      "Nabız": "92/dk",
      "Solunum": "18/dk",
      "SpO2": "%99",
      "Ateş": "36.7 °C"
    },
    "exam": [
      "Genel durum orta; hasta halsiz, soluk ve beslenme kısıtlılığına bağlı zayıf görünümde.",
      "Diş etlerinde şişlik, kolay kanama ve gingival hassasiyet mevcut; oral ülser veya pürülan akıntı yok.",
      "Alt ekstremitelerde perifoliküler peteşiler, ekimozlar ve tirbuşon kıllar izleniyor.",
      "Eski küçük travma alanlarında morarma belirgin; açık yara kenarında granülasyon zayıf ve iyileşme gecikmiş.",
      "Abdomen yumuşak, hepatosplenomegali yok; yaygın lenfadenopati saptanmıyor.",
      "Nörolojik muayenede fokal defisit yok; eklem hareketleri ağrı nedeniyle kısıtlı olabilir.",
      "Yara iyileşmesi gecikmiş ve kollajen zayıflığına bağlı ekimozlar izlendi. Kollajen hidroksilasyonu bozukluğu klinik bulgu verir. Vaskülit lehine sistemik kanıt yoktur."
    ],
    "investigations": [
      {
        "id": "plazma-askorbik-asit-duzeyi-12",
        "label": "Plazma askorbik asit düzeyi",
        "type": "lab",
        "priority": "essential",
        "summary": "Plazma askorbik asit düzeyi düşük bulundu.",
        "findings": [
          "Eksiklik biyokimyasal olarak desteklenmiştir.",
          "Replasman tedavisi beklenen düzelmeyi sağlar."
        ],
        "rows": [
          [
            "Askorbik asit",
            "Düşük",
            "Normal",
            "Düşük"
          ]
        ]
      },
      {
        "id": "hemogram-ve-demir-parametreleri-12",
        "label": "Hemogram ve demir parametreleri",
        "type": "lab",
        "priority": "useful",
        "summary": "Hemoglobin düşük; demir depolarında eşlik eden azalma izlendi.",
        "findings": [
          "Kronik kanama ve beslenme eksikliği anemiyi açıklayabilir.",
          "Lökositoz belirgin değildir."
        ],
        "rows": [
          [
            "Hemoglobin",
            "10.4 g/dL",
            "12-16 g/dL",
            "Düşük"
          ],
          [
            "Ferritin",
            "Düşük-normal",
            "Normal",
            "Sınırda"
          ]
        ]
      },
      {
        "id": "vitamin-c-level",
        "label": "Plazma askorbik asit düzeyi",
        "type": "lab",
        "priority": "essential",
        "summary": "Plazma askorbik asit düzeyi belirgin düşük saptandı.",
        "findings": [
          "Düşük askorbik asit düzeyi skorbüt tanısını destekler.",
          "Koagülasyon testlerinin normal olması primer koagülopatiyi geri plana iter."
        ],
        "rows": [
          [
            "Askorbik asit",
            "0.1 mg/dL",
            "0.4-1.5 mg/dL",
            "Düşük"
          ],
          [
            "PT",
            "12.4 sn",
            "11-14 sn",
            "Normal"
          ],
          [
            "aPTT",
            "31 sn",
            "25-35 sn",
            "Normal"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "Skorbüt",
      "options": [
        "Skorbüt",
        "Pellagra",
        "K vitamini eksikliği",
        "Hemofili A"
      ],
      "explanation": "Olgu paterni Vitamin C eksikliği - Skorbüt ile uyumludur. Klinik zamanlama, hedef laboratuvar bulguları ve mekanizma birlikte değerlendirildiğinde bu tanı en güçlü seçenektir.",
      "pearls": [
        "C vitamini kollajen hidroksilasyonu için gereklidir.",
        "Diş eti kanaması, perifoliküler kanama ve kötü yara iyileşmesi tipiktir.",
        "K vitamini eksikliği koagülasyon testleriyle ayrılır.",
        "Replasmanla klinik hızla düzelir."
      ],
      "nextStep": "Vitamin C replasmanı, beslenme desteği ve kanama/anemi değerlendirmesi.",
      "answerFeedback": {
        "diagnosisMeta": "Vitamin C eksikliği - Skorbüt: Klinik-biyokimyasal patern, ayırıcı tanı ve sınav vurguları ile uyumlu.",
        "whyCorrect": "Olgu paterni Vitamin C eksikliği - Skorbüt ile uyumludur. Klinik zamanlama, hedef laboratuvar bulguları ve biyokimyasal mekanizma birlikte değerlendirildiğinde bu tanı en güçlü seçenektir.",
        "evidenceChain": [
          "Olgu bulguları Vitamin C eksikliği — Skorbüt ile uyumlu",
          "Hafif anemi, CRP normal",
          "Askorbik asit eksikliği düşünülür",
          "Hedef mekanizma ve sınav ipuçları tabloyu destekler"
        ],
        "pearls": [
          "Acil metabolik, hematolojik veya organ yetmezliği bulgusu varsa önce stabilizasyon yapılır.",
          "Tanı testleri tedaviyi geciktirmemelidir.",
          "Diyet, replasman, substrat kısıtlaması veya hedef moleküler mekanizma yönetimi belirler."
        ],
        "management": [
          "Acil klinik stabilizasyon ve temel laboratuvar değerlendirmesi — Hipoglisemi, asidoz, anemi veya organ yetmezliği varsa mortalite yaratabilir.",
          "Sorumlu substrat/eksik vitamin veya hedef biyokimyasal bozukluğu düzelt — Patofizyolojik yükü azaltır.",
          "Spesifik metabolit, enzim, lipid veya genetik doğrulama yap — Kesin tanı ve aile danışmanlığı sağlar.",
          "Uzun dönem beslenme/metabolizma veya ilgili branş takibi planla — Komplikasyonları azaltır."
        ],
        "learningOutcome": "Metabolizma, vitamin, eser element ve lipoprotein tablolarında semptom paterni, sorumlu molekül/enzim ya da eksik besin ögesi ve temel yönetim birlikte okunmalıdır.",
        "differentials": {
          "Pellagra": {
            "explanation": "Pellagra ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Skorbüt lehinedir.",
            "comparisonPoints": [
              "Pellagra için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Skorbüt tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "K vitamini eksikliği": {
            "explanation": "K vitamini eksikliği ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Skorbüt lehinedir.",
            "comparisonPoints": [
              "K vitamini eksikliği için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Skorbüt tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Hemofili A": {
            "explanation": "Hemofili A ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Skorbüt lehinedir.",
            "comparisonPoints": [
              "Hemofili A için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Skorbüt tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "internal-medicine-hemochromatosis-001",
    "branchId": "internal-medicine",
    "title": "Karaciğer enzim yüksekliği, hiperpigmentasyon ve diyabet tablosu",
    "difficulty": "Orta · TUS düzeyi",
    "clinicalFocus": "Demir yüklenmesi, ferritin/transferrin satürasyonu, karaciğer-pankreas-kalp tutulumları",
    "demographics": "52 yaş erkek",
    "setting": "Pediatri/metabolizma polikliniği veya acil başvuru",
    "chiefComplaint": "Halsizlik, ciltte koyulaşma, diyabet ve karaciğer enzim yüksekliği",
    "stem": "Hastada uzun süredir halsizlik, eklem ağrısı, yeni tanı diyabet ve bronz renkli cilt görünümü vardır. Ferritin ve transferrin satürasyonu yüksek bulunur. Demir metabolizmasında aşırı birikim çoklu organ hasarı yapmaktadır.",
    "vitals": {
      "TA": "138/86 mmHg",
      "Nabız": "82/dk",
      "Solunum": "16/dk",
      "SpO2": "%98",
      "Ateş": "36.8 °C"
    },
    "exam": [
      "Genel durum iyi-orta; hasta kronik halsizlik ve eklem ağrısı tarifliyor.",
      "Ciltte özellikle yüz, el sırtı ve güneş gören alanlarda bronz-gri hiperpigmentasyon izleniyor.",
      "Abdomen muayenesinde karaciğer kenarı sağ kostal ark altında ele geliyor; asit veya belirgin splenomegali yok.",
      "Metakarpofalangeal eklemlerde hafif hassasiyet mevcut; aktif sinovit baskın değil.",
      "Kardiyak muayenede belirgin kalp yetmezliği bulgusu saptanmıyor.",
      "Nörolojik muayenede fokal defisit yok; diyabete bağlı periferik duyu azalması hafif düzeyde."
    ],
    "investigations": [
      {
        "id": "ferritin-ve-transferrin-saturasyonu-13",
        "label": "Ferritin ve transferrin satürasyonu",
        "type": "lab",
        "priority": "essential",
        "summary": "Ferritin ve transferrin satürasyonu belirgin yüksek bulundu.",
        "findings": [
          "Demir yüklenmesi tanıyı güçlü destekler.",
          "İzole inflamasyon ferritin yüksekliğini tek başına açıklamaz."
        ],
        "rows": [
          [
            "Ferritin",
            "980 ng/mL",
            "30-300 ng/mL",
            "Yüksek"
          ],
          [
            "Transferrin sat.",
            "72%",
            "20-45%",
            "Yüksek"
          ]
        ]
      },
      {
        "id": "karaciger-enzimleri-ve-glukoz-hba1c-13",
        "label": "Karaciğer enzimleri ve glukoz/HbA1c",
        "type": "lab",
        "priority": "essential",
        "summary": "ALT/AST yüksek, HbA1c diyabet aralığında saptandı.",
        "findings": [
          "Karaciğer ve pankreas tutulumu klinik tabloyu açıklar.",
          "Bronz diyabet paterni desteklenir."
        ],
        "rows": [
          [
            "ALT/AST",
            "96/88 U/L",
            "<40 U/L",
            "Yüksek"
          ],
          [
            "HbA1c",
            "8.1%",
            "<5.7%",
            "Yüksek"
          ]
        ]
      },
      {
        "id": "hfe-gen-analizi-13",
        "label": "HFE gen analizi",
        "type": "lab",
        "priority": "useful",
        "summary": "HFE gen analizi C282Y ilişkili mutasyon açısından pozitif bulundu.",
        "findings": [
          "Primer hemokromatozis doğrulanır.",
          "Aile taraması gerekir."
        ],
        "rows": [
          [
            "HFE C282Y",
            "Pozitif",
            "Negatif",
            "Patolojik"
          ],
          [
            "Aile taraması",
            "Önerildi",
            "Risk yoksa gerekmez",
            "Gerekli"
          ]
        ]
      },
      {
        "id": "karaciger-mr-ultrason-veya-elastografi-13",
        "label": "Karaciğer MR/ultrason veya elastografi",
        "type": "mri",
        "priority": "situational",
        "summary": "Karaciğer görüntülemede demir yüklenmesiyle uyumlu sinyal değişikliği izlendi.",
        "findings": [
          "Siroz ve fibrozis açısından takip gerekir.",
          "Kitle lehine belirgin bulgu yoktur."
        ],
        "rows": [
          [
            "Karaciğer MR",
            "Demir yükü lehine",
            "Normal sinyal",
            "Patolojik"
          ],
          [
            "Fokal kitle",
            "Saptanmadı",
            "Yok",
            "Sorun yok"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "Hemokromatozis",
      "options": [
        "Hemokromatozis",
        "Wilson hastalığı",
        "Demir eksikliği anemisi",
        "Menkes hastalığı"
      ],
      "explanation": "Olgu paterni Hemokromatozis ile uyumludur. Klinik zamanlama, hedef laboratuvar bulguları ve mekanizma birlikte değerlendirildiğinde bu tanı en güçlü seçenektir.",
      "pearls": [
        "Bronz cilt + diyabet + karaciğer tutulumu hemokromatozis klasiğidir.",
        "Ferritin ve transferrin satürasyonu tanıda önemlidir.",
        "Organ hasarı karaciğer, pankreas, kalp ve eklemlerde olabilir.",
        "Tedavide flebotomi/şelasyon mantığı düşünülür."
      ],
      "nextStep": "Ferritin-transferrin satürasyonu ile doğrula, HFE testi ve flebotomi planla; siroz/HCC açısından izle.",
      "answerFeedback": {
        "diagnosisMeta": "Hemokromatozis: Klinik-biyokimyasal patern, ayırıcı tanı ve sınav vurguları ile uyumlu.",
        "whyCorrect": "Olgu paterni Hemokromatozis ile uyumludur. Klinik zamanlama, hedef laboratuvar bulguları ve biyokimyasal mekanizma birlikte değerlendirildiğinde bu tanı en güçlü seçenektir.",
        "evidenceChain": [
          "Olgu bulguları Hemokromatozis ile uyumlu",
          "Ferritin yüksek, transferrin satürasyonu yüksek, AST/ALT yüksek",
          "HFE ilişkili demir yüklenmesi değerlendirildi",
          "Hedef mekanizma ve sınav ipuçları tabloyu destekler"
        ],
        "pearls": [
          "Acil metabolik, hematolojik veya organ yetmezliği bulgusu varsa önce stabilizasyon yapılır.",
          "Tanı testleri tedaviyi geciktirmemelidir.",
          "Diyet, replasman, substrat kısıtlaması veya hedef moleküler mekanizma yönetimi belirler."
        ],
        "management": [
          "Acil klinik stabilizasyon ve temel laboratuvar değerlendirmesi — Hipoglisemi, asidoz, anemi veya organ yetmezliği varsa mortalite yaratabilir.",
          "Sorumlu substrat/eksik vitamin veya hedef biyokimyasal bozukluğu düzelt — Patofizyolojik yükü azaltır.",
          "Spesifik metabolit, enzim, lipid veya genetik doğrulama yap — Kesin tanı ve aile danışmanlığı sağlar.",
          "Uzun dönem beslenme/metabolizma veya ilgili branş takibi planla — Komplikasyonları azaltır."
        ],
        "learningOutcome": "Metabolizma, vitamin, eser element ve lipoprotein tablolarında semptom paterni, sorumlu molekül/enzim ya da eksik besin ögesi ve temel yönetim birlikte okunmalıdır.",
        "differentials": {
          "Wilson hastalığı": {
            "explanation": "Wilson hastalığı ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Hemokromatozis lehinedir.",
            "comparisonPoints": [
              "Wilson hastalığı için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Hemokromatozis tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Demir eksikliği anemisi": {
            "explanation": "Demir eksikliği anemisi ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Hemokromatozis lehinedir.",
            "comparisonPoints": [
              "Demir eksikliği anemisi için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Hemokromatozis tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Menkes hastalığı": {
            "explanation": "Menkes hastalığı ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Hemokromatozis lehinedir.",
            "comparisonPoints": [
              "Menkes hastalığı için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Hemokromatozis tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "internal-medicine-familial-hypercholesterolemia-001",
    "branchId": "internal-medicine",
    "title": "Erken yaşta LDL yüksekliği ve tendon nodülleri olan hasta",
    "difficulty": "Orta · TUS düzeyi",
    "clinicalFocus": "LDL reseptör/ApoB yolu, yüksek LDL, ateroskleroz riski",
    "demographics": "17 yaş kız",
    "setting": "Pediatri/metabolizma polikliniği veya acil başvuru",
    "chiefComplaint": "Aşil tendonunda şişlik ve ailede erken MI öyküsü",
    "stem": "Genç hastada Aşil tendon ksantomları, total kolesterol ve LDL'de belirgin yükseklik ve babada 38 yaşında MI öyküsü vardır. Trigliserid normal sınırlardadır. Bu profil LDL temizlenme kusurunu düşündürür. Birinci derece akrabada erken koroner arter hastalığı öyküsü mevcut. Otozomal dominant kalıtım ihtimalini güçlendirir. Kaskad tarama gereklidir.",
    "vitals": {
      "TA": "130/82 mmHg",
      "Nabız": "76/dk",
      "Solunum": "16/dk",
      "SpO2": "%98",
      "Ateş": "36.5 °C"
    },
    "exam": [
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Bilateral Aşil tendonlarında ksantom nodülleri palpabl",
      "Kornea arkusu ve hafif ksantelazma izleniyor",
      "Eruptif ksantom yok, trigliseridemi lehine bulgu saptanmıyor",
      "Kalp oskültasyonunda üfürüm yok",
      "Periferik nabızlar simetrik alınıyor"
    ],
    "investigations": [
      {
        "id": "aclik-lipid-paneli-14",
        "label": "Açlık lipid paneli",
        "type": "lab",
        "priority": "essential",
        "summary": "LDL-kolesterol çok yüksek, trigliserid düzeyi belirgin yüksek değil.",
        "findings": [
          "İzole ağır LDL yüksekliği ailesel hiperkolesterolemiyi destekler.",
          "Sekonder dislipidemi nedenleri ayrıca dışlanmalıdır."
        ],
        "rows": [
          [
            "LDL-K",
            "285 mg/dL",
            "<100 mg/dL",
            "Çok yüksek"
          ],
          [
            "TG",
            "135 mg/dL",
            "<150 mg/dL",
            "Normal"
          ],
          [
            "Total kolesterol",
            "360 mg/dL",
            "<200 mg/dL",
            "Yüksek"
          ]
        ]
      },
      {
        "id": "ldlr-apob-pcsk9-genetik-testi-14",
        "label": "LDLR/APOB/PCSK9 genetik testi",
        "type": "lab",
        "priority": "useful",
        "summary": "LDLR/APOB/PCSK9 paneli için genetik doğrulama planlandı.",
        "findings": [
          "Tanıyı destekler ve aile taramasını yönlendirir.",
          "Negatif sonuç klinik tanıyı tamamen dışlamaz."
        ],
        "rows": [
          [
            "Genetik panel",
            "Planlandı",
            "Gerektiğinde",
            "Beklemede"
          ]
        ]
      },
      {
        "id": "kardiyovaskuler-risk-degerlendirmesi-14",
        "label": "12 derivasyon EKG",
        "type": "ecg",
        "priority": "situational",
        "summary": "EKG’de akut iskemi bulgusu saptanmadı; ritim sinüs ve ST-T segmentleri izoelektrik izlendi.",
        "findings": [
          "Akut koroner sendrom bulgusu yoktur.",
          "Uzun dönem aterosklerotik risk lipid paterniyle belirlenir."
        ],
        "rows": [
          [
            "Ritim",
            "Sinüs ritmi",
            "Sinüs ritmi",
            "Normal"
          ],
          [
            "ST elevasyonu",
            "Saptanmadı",
            "Saptanmamalı",
            "Negatif"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "Ailesel hiperkolesterolemi",
      "options": [
        "Ailesel hiperkolesterolemi",
        "Tangier hastalığı",
        "Abetalipoproteinemi",
        "LCAT eksikliği"
      ],
      "explanation": "Olgu paterni Ailesel hiperkolesterolemi - Tip IIa hiperlipoproteinemi ile uyumludur. Klinik zamanlama, hedef laboratuvar bulguları ve mekanizma birlikte değerlendirildiğinde bu tanı en güçlü seçenektir.",
      "pearls": [
        "Tendon ksantomu + yüksek LDL + erken koroner hastalık FH için tipiktir.",
        "Tip IIa: LDL yüksek, trigliserid genelde normaldir.",
        "ApoB-100/LDL reseptör ilişkisi sınavda sorulabilir.",
        "Erken agresif lipid düşürücü tedavi gerekir."
      ],
      "nextStep": "Lipid düşürücü tedavi, aile taraması ve kardiyovasküler risk yönetimi.",
      "answerFeedback": {
        "diagnosisMeta": "Ailesel hiperkolesterolemi - Tip IIa hiperlipoproteinemi: Klinik-biyokimyasal patern, ayırıcı tanı ve sınav vurguları ile uyumlu.",
        "whyCorrect": "Olgu paterni Ailesel hiperkolesterolemi - Tip IIa hiperlipoproteinemi ile uyumludur. Klinik zamanlama, hedef laboratuvar bulguları ve biyokimyasal mekanizma birlikte değerlendirildiğinde bu tanı en güçlü seçenektir.",
        "evidenceChain": [
          "Olgu bulguları Ailesel hiperkolesterolemi — Tip IIa hiperlipoproteinemi ile uyumlu",
          "Total kolesterol 360 mg/dL, LDL 285 mg/dL, TG normal",
          "LDL reseptör/ApoB/PCSK9 yolu değerlendirildi",
          "Hedef mekanizma ve sınav ipuçları tabloyu destekler"
        ],
        "pearls": [
          "Acil metabolik, hematolojik veya organ yetmezliği bulgusu varsa önce stabilizasyon yapılır.",
          "Tanı testleri tedaviyi geciktirmemelidir.",
          "Diyet, replasman, substrat kısıtlaması veya hedef moleküler mekanizma yönetimi belirler."
        ],
        "management": [
          "Acil klinik stabilizasyon ve temel laboratuvar değerlendirmesi — Hipoglisemi, asidoz, anemi veya organ yetmezliği varsa mortalite yaratabilir.",
          "Sorumlu substrat/eksik vitamin veya hedef biyokimyasal bozukluğu düzelt — Patofizyolojik yükü azaltır.",
          "Spesifik metabolit, enzim, lipid veya genetik doğrulama yap — Kesin tanı ve aile danışmanlığı sağlar.",
          "Uzun dönem beslenme/metabolizma veya ilgili branş takibi planla — Komplikasyonları azaltır."
        ],
        "learningOutcome": "Metabolizma, vitamin, eser element ve lipoprotein tablolarında semptom paterni, sorumlu molekül/enzim ya da eksik besin ögesi ve temel yönetim birlikte okunmalıdır.",
        "differentials": {
          "Tangier hastalığı": {
            "explanation": "Tangier hastalığı ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Ailesel hiperkolesterolemi lehinedir.",
            "comparisonPoints": [
              "Tangier hastalığı için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Ailesel hiperkolesterolemi tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Abetalipoproteinemi": {
            "explanation": "Abetalipoproteinemi ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Ailesel hiperkolesterolemi lehinedir.",
            "comparisonPoints": [
              "Abetalipoproteinemi için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Ailesel hiperkolesterolemi tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "LCAT eksikliği": {
            "explanation": "LCAT eksikliği ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Ailesel hiperkolesterolemi lehinedir.",
            "comparisonPoints": [
              "LCAT eksikliği için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Ailesel hiperkolesterolemi tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "internal-medicine-tangier-disease-001",
    "branchId": "internal-medicine",
    "title": "Turuncu tonsiller ve periferik nöropati ile başvuran genç hasta",
    "difficulty": "Orta · TUS düzeyi",
    "clinicalFocus": "ABCA1 defekti, HDL düşüklüğü, kolesterol efflux bozukluğu",
    "demographics": "12 yaş erkek",
    "setting": "Pediatri/metabolizma polikliniği veya acil başvuru",
    "chiefComplaint": "Büyümüş turuncu tonsiller ve periferik nöropati",
    "stem": "Çocukta belirgin turuncu tonsiller, hepatosplenomegali ve aralıklı ekstremite uyuşması vardır. Lipid profilinde HDL çok düşük, ApoA-I azalmış bulunur. Kolesterolün hücre dışına taşınmasında görevli ABCA1 defekti düşünülür.",
    "vitals": {
      "TA": "112/70 mmHg",
      "Nabız": "86/dk",
      "Solunum": "18/dk",
      "SpO2": "%99",
      "Ateş": "36.8 °C"
    },
    "exam": [
      "Genel durum iyi; hasta distal uyuşma ve yürüme sırasında dengesizlik tarifliyor.",
      "Orofaringeal muayenede tonsiller belirgin büyümüş ve turuncu-sarı renkte izleniyor.",
      "Periferik nörolojik muayenede eldiven-çorap tarzı duyu azalması ve derin tendon reflekslerinde azalma mevcut.",
      "Abdomen muayenesinde hafif hepatosplenomegali saptanıyor; asit yok.",
      "Ciltte ksantom belirgin değil; korneal arkus izlenmiyor.",
      "Kardiyopulmoner muayenede akut iskemi veya kalp yetmezliği bulgusu yok.",
      "Tonsiller büyük ve turuncu renkte izlendi. Kolesterol ester birikimi tanı için çok tipiktir. Akut tonsillit bulgusu ön planda değildir."
    ],
    "investigations": [
      {
        "id": "lipid-paneli-ve-hdl-duzeyi-15",
        "label": "Lipid paneli ve HDL düzeyi",
        "type": "lab",
        "priority": "essential",
        "summary": "HDL-kolesterol çok düşük; total kolesterol düşük-normal bulundu.",
        "findings": [
          "ABCA1 defektiyle uyumlu HDL oluşum bozukluğu vardır.",
          "Ailesel hiperkolesterolemiden ayrılır."
        ],
        "rows": [
          [
            "HDL-K",
            "8 mg/dL",
            ">40 mg/dL",
            "Çok düşük"
          ],
          [
            "LDL-K",
            "55 mg/dL",
            "<100 mg/dL",
            "Düşük-normal"
          ],
          [
            "TG",
            "210 mg/dL",
            "<150 mg/dL",
            "Yüksek"
          ]
        ]
      },
      {
        "id": "periferik-noropati-degerlendirmesi-15",
        "label": "Sinir ileti çalışması",
        "type": "neurophysiology",
        "priority": "useful",
        "summary": "Duyu sinir aksiyon potansiyellerinde belirgin amplitüd azalması saptandı.",
        "findings": [
          "Elektrofizyolojik patern periferik nöropatiyi objektif olarak destekler.",
          "Motor iletim belirgin korunmuştur."
        ],
        "rows": [
          [
            "Sural SNAP amplitüdü",
            "3 µV",
            ">6 µV",
            "Düşük"
          ],
          [
            "Median motor iletim hızı",
            "51 m/sn",
            ">50 m/sn",
            "Normal"
          ]
        ]
      },
      {
        "id": "abca1-gen-analizi-15",
        "label": "ABCA1 gen analizi",
        "type": "lab",
        "priority": "situational",
        "summary": "ABCA1 gen analizi için örnek gönderildi.",
        "findings": [
          "Moleküler doğrulama ve aile danışmanlığı sağlar.",
          "Lipid paneli tanısal şüpheyi güçlü destekler."
        ],
        "rows": [
          [
            "ABCA1 analizi",
            "Planlandı",
            "Gerektiğinde",
            "Beklemede"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "Tangier hastalığı",
      "options": [
        "Tangier hastalığı",
        "Ailesel hiperkolesterolemi",
        "LCAT eksikliği",
        "Abetalipoproteinemi"
      ],
      "explanation": "Olgu paterni Tangier hastalığı ile uyumludur. Klinik zamanlama, hedef laboratuvar bulguları ve mekanizma birlikte değerlendirildiğinde bu tanı en güçlü seçenektir.",
      "pearls": [
        "Turuncu tonsiller ve çok düşük HDL Tangier için ayırt ettiricidir.",
        "ABCA1 kolesterol efflux için gereklidir.",
        "ApoA-I ve HDL düzeyi belirgin düşüktür.",
        "Nöropati ve hepatosplenomegali eşlik edebilir."
      ],
      "nextStep": "Lipid profilini doğrula, ABCA1 genetik testi ve kardiyometabolik/nörolojik takip planla.",
      "answerFeedback": {
        "diagnosisMeta": "Tangier hastalığı: Klinik-biyokimyasal patern, ayırıcı tanı ve sınav vurguları ile uyumlu.",
        "whyCorrect": "Olgu paterni Tangier hastalığı ile uyumludur. Klinik zamanlama, hedef laboratuvar bulguları ve biyokimyasal mekanizma birlikte değerlendirildiğinde bu tanı en güçlü seçenektir.",
        "evidenceChain": [
          "Olgu bulguları Tangier hastalığı ile uyumlu",
          "HDL <5 mg/dL, ApoA-I düşük, LDL düşük/normal",
          "ABCA1 fonksiyon bozukluğu",
          "Hedef mekanizma ve sınav ipuçları tabloyu destekler"
        ],
        "pearls": [
          "Acil metabolik, hematolojik veya organ yetmezliği bulgusu varsa önce stabilizasyon yapılır.",
          "Tanı testleri tedaviyi geciktirmemelidir.",
          "Diyet, replasman, substrat kısıtlaması veya hedef moleküler mekanizma yönetimi belirler."
        ],
        "management": [
          "Acil klinik stabilizasyon ve temel laboratuvar değerlendirmesi — Hipoglisemi, asidoz, anemi veya organ yetmezliği varsa mortalite yaratabilir.",
          "Sorumlu substrat/eksik vitamin veya hedef biyokimyasal bozukluğu düzelt — Patofizyolojik yükü azaltır.",
          "Spesifik metabolit, enzim, lipid veya genetik doğrulama yap — Kesin tanı ve aile danışmanlığı sağlar.",
          "Uzun dönem beslenme/metabolizma veya ilgili branş takibi planla — Komplikasyonları azaltır."
        ],
        "learningOutcome": "Metabolizma, vitamin, eser element ve lipoprotein tablolarında semptom paterni, sorumlu molekül/enzim ya da eksik besin ögesi ve temel yönetim birlikte okunmalıdır.",
        "differentials": {
          "Ailesel hiperkolesterolemi": {
            "explanation": "Ailesel hiperkolesterolemi ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Tangier hastalığı lehinedir.",
            "comparisonPoints": [
              "Ailesel hiperkolesterolemi için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Tangier hastalığı tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "LCAT eksikliği": {
            "explanation": "LCAT eksikliği ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Tangier hastalığı lehinedir.",
            "comparisonPoints": [
              "LCAT eksikliği için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Tangier hastalığı tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Abetalipoproteinemi": {
            "explanation": "Abetalipoproteinemi ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Tangier hastalığı lehinedir.",
            "comparisonPoints": [
              "Abetalipoproteinemi için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Tangier hastalığı tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "internal-medicine-acute-radiation-syndrome-001",
    "branchId": "internal-medicine",
    "title": "Korunmasız radyasyon maruziyeti sonrası bulantı ve sitopeni",
    "difficulty": "Orta · TUS düzeyi",
    "clinicalFocus": "Kısa sürede yüksek doz, prodromal bulgular, kemik iliği baskılanması, cilt hasarı",
    "demographics": "34 yaş erkek, endüstriyel radyografi çalışanı",
    "setting": "Acil servis - radyasyon kazası sonrası",
    "chiefComplaint": "Maruziyetten saatler sonra bulantı, kusma, ishal ve ciltte eritem",
    "stem": "Hasta kapalı kaynakla çalışırken koruyucu prosedür bozulduktan yaklaşık 2 saat sonra bulantı, kusma, baş ağrısı, halsizlik ve yaygın yanma hissi geliştiğini ifade eder. Olaydan sonra kısa bir iyilik dönemi olsa da sağ elde lokal eritem ortaya çıkmış ve seri tam kan sayımlarında lenfosit düşüşü başlamıştır. Semptomların kısa sürede başlaması ve erken lenfopeni yüksek doz iyonizan radyasyon maruziyetini düşündürür. Maruziyet dakikalar-saatler içinde gelişen prodromal yakınmalarla uyumlu bulundu. Tüm vücut veya geniş alan maruziyeti olasılığı yüksektir. Dozimetri kayıtları doğrulama için istenir.",
    "vitals": {
      "TA": "96/60 mmHg",
      "Nabız": "118/dk",
      "Solunum": "22/dk",
      "SpO2": "97%",
      "Ateş": "37.8 C"
    },
    "exam": [
      "Genel durum orta; hasta huzursuz, halsiz ve bulantılı görünümde, bilinç açık ve oryantasyon tam.",
      "Sağ el dorsumunda keskin sınırlı eritem, hassasiyet ve hafif ödem izleniyor; bül, nekroz veya açık yara yok.",
      "Vücut yüzeyinde yaygın görünür partikül/kirlenme yok; mukozal yanık veya açık yara izlenmiyor.",
      "Ciltte yaygın peteşi, purpura veya aktif mukozal kanama izlenmiyor.",
      "Kardiyopulmoner muayenede ek patolojik bulgu saptanmıyor; akciğer sesleri doğal.",
      "Abdomen yumuşak; defans-rebound yok, hafif yaygın hassasiyet dışında akut batın bulgusu izlenmiyor.",
      "Nörolojik muayenede fokal defisit, ense sertliği veya nöbet bulgusu yok.",
      "Sağ elde lokal eritem ve hassasiyet belirgin; lezyon çevresinde bül, nekroz veya aktif kanama izlenmiyor. Sistemik etkilenim fizik muayeneyle değil seri laboratuvar ve dozimetriyle değerlendirilmelidir."
    ],
    "investigations": [
      {
        "id": "tam-kan-sayimi-seri-izlemi-16",
        "label": "Tam kan sayımı seri izlemi",
        "type": "lab",
        "priority": "essential",
        "summary": "Seri tam kan sayımında erken lenfopeni ve hafif trombosit düşüklüğü saptandı.",
        "findings": [
          "Hematopoietik etkilenme akut radyasyon sendromunu destekler.",
          "Erken ve hızlı lenfosit düşüşü hematopoetik etkilenmeyi destekler."
        ],
        "rows": [
          [
            "Lenfosit",
            "650/µL",
            "1000-4800/µL",
            "Düşük"
          ],
          [
            "Trombosit",
            "130.000/µL",
            "150.000-450.000/µL",
            "Düşük"
          ],
          [
            "Lökosit",
            "3.200/µL",
            "4.000-10.000/µL",
            "Düşük"
          ]
        ]
      },
      {
        "id": "elektrolit-bobrek-ve-karaciger-paneli-16",
        "label": "Elektrolit, böbrek ve karaciğer paneli",
        "type": "lab",
        "priority": "useful",
        "summary": "Elektrolitlerde hafif bozulma ve dehidratasyon bulguları saptandı; böbrek fonksiyonu korunmuş.",
        "findings": [
          "Kusma-ishal kaynaklı sıvı kaybı mevcuttur.",
          "Şu an belirgin renal yetmezlik izlenmemiştir."
        ],
        "rows": [
          [
            "Sodyum",
            "134 mmol/L",
            "135-145 mmol/L",
            "Hafif düşük"
          ],
          [
            "Kreatinin",
            "0.9 mg/dL",
            "0.6-1.2 mg/dL",
            "Normal"
          ],
          [
            "ALT/AST",
            "Hafif yüksek",
            "<40 U/L",
            "Hafif yüksek"
          ]
        ]
      },
      {
        "id": "radiation-dosimetry",
        "label": "Bireysel dozimetri kaydı",
        "type": "lab",
        "priority": "essential",
        "summary": "Dozimetri kaydında tüm vücut eşdeğer doz yaklaşık 2.6 Gy olarak hesaplandı.",
        "findings": [
          "Doz düzeyi hematopoetik akut radyasyon sendromu ile uyumludur.",
          "Prodromal yakınmaların erken başlaması anlamlı sistemik maruziyeti destekler."
        ],
        "rows": [
          [
            "Tahmini tüm vücut doz",
            "2.6 Gy",
            "<0.1 Gy",
            "Yüksek"
          ],
          [
            "Lokal el dozu",
            "6.5 Gy",
            "<0.1 Gy",
            "Yüksek"
          ]
        ]
      },
      {
        "id": "radiation-survey",
        "label": "Radyasyon survey metre ölçümü",
        "type": "lab",
        "priority": "useful",
        "summary": "Hasta yüzeyinde dış kontaminasyon düzeyi arka plan radyasyonuna yakın ölçüldü.",
        "findings": [
          "Dış kontaminasyon saptanmaması dekontaminasyon önceliğini azaltır.",
          "Lokal eritem, kontaminasyondan çok lokal radyasyon hasarıyla uyumludur."
        ],
        "rows": [
          [
            "Vücut yüzeyi sayım hızı",
            "0.12 µSv/saat",
            "0.05-0.20 µSv/saat",
            "Normal"
          ],
          [
            "Açık yara kontaminasyonu",
            "Saptanmadı",
            "Saptanmamalı",
            "Negatif"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "Akut radyasyon sendromu",
      "options": [
        "Akut radyasyon sendromu",
        "Kronik radyasyon sendromu",
        "Gıda zehirlenmesi",
        "Termal yanık"
      ],
      "explanation": "Kısa sürede yüksek doz maruziyet, prodromal bulantı-kusma-ishal, geçici iyilik dönemi ve kemik iliği baskılanması ARS lehinedir.",
      "pearls": [
        "ARS için kısa sürede yüksek doz ve büyük vücut bölümü maruziyeti gerekir.",
        "İlk belirtiler bulantı, kusma, baş ağrısı ve ishaldir.",
        "Hematopoietik hasar enfeksiyon ve iç kanama riskini artırır.",
        "Isı/kimyasal temas olmadan cilt yanığı radyasyon kazasını düşündürür."
      ],
      "nextStep": "Radyasyon güvenliği/dekontaminasyon, destek tedavisi, seri CBC ve enfeksiyon/kanama izlemi.",
      "answerFeedback": {
        "diagnosisMeta": "Akut yüksek doz + prodromal GIS + lenfopeni + cilt eritemi.",
        "whyCorrect": "Kısa sürede yüksek doz maruziyet, prodromal bulantı-kusma-ishal, geçici iyilik dönemi ve kemik iliği baskılanması ARS lehinedir.",
        "evidenceChain": [
          "Endüstriyel kaynakla kısa süreli yüksek doz maruziyet",
          "Saatler içinde bulantı-kusma-ishal",
          "Isı/kimyasal temas olmadan cilt eritemi",
          "Lenfosit düşüşü"
        ],
        "pearls": [
          "Geçici iyilik dönemi ARS'yi dışlamaz.",
          "Enfeksiyon ve iç kanama ölüm nedenleri arasındadır."
        ],
        "management": [
          "Radyasyon güvenliği, kontaminasyon değerlendirmesi ve ABC — Hasta ve ekip güvenliği sağlanır.",
          "Sıvı, antiemetik, elektrolit ve yanık/cilt bakımı — Destek tedavisi ilk basamaktır.",
          "Seri CBC ve enfeksiyon/kanama izlemi — Kemik iliği hasarı mortaliteyi belirler.",
          "G-CSF, antibiyotik, hematoloji/kemik iliği nakli değerlendirmesi — Ağır dozlarda gerekebilir."
        ],
        "learningOutcome": "Radyasyon sendromlarında zamanlama ayırıcıdır: ARS kısa sürede yüksek dozla; CRS uzun süre düşük dozla gelişir.",
        "differentials": {
          "Kronik radyasyon sendromu": {
            "explanation": "Kronik radyasyon sendromu ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Akut radyasyon sendromu lehinedir.",
            "comparisonPoints": [
              "Kronik radyasyon sendromu için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Akut radyasyon sendromu tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Gıda zehirlenmesi": {
            "explanation": "Gıda zehirlenmesi ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Akut radyasyon sendromu lehinedir.",
            "comparisonPoints": [
              "Gıda zehirlenmesi için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Akut radyasyon sendromu tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Termal yanık": {
            "explanation": "Termal yanık ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Akut radyasyon sendromu lehinedir.",
            "comparisonPoints": [
              "Termal yanık için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Akut radyasyon sendromu tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "internal-medicine-oxidative-stress-injury-001",
    "branchId": "internal-medicine",
    "title": "Bakla sonrası koyu idrar ve sarılık gelişen hasta",
    "difficulty": "Orta · TUS düzeyi",
    "clinicalFocus": "Oksidatif stres altında eritrosit hasarı, G6PD eksikliği ve akut hemoliz",
    "demographics": "22 yaş erkek",
    "setting": "Acil servis",
    "chiefComplaint": "Bakla yedikten sonra koyu idrar, halsizlik ve sararma",
    "stem": "Daha önce sağlıklı olan hasta, bakla tüketiminden 24 saat sonra halsizlik, bel ağrısı, sarılık ve çay renginde idrar yakınmalarıyla başvurur. Ateşi yoktur; enfeksiyon odağı saptanmaz. Oksidatif tetikleyici sonrası ani hemoliz ve periferik yayma bulguları G6PD eksikliğiyle uyumludur.",
    "vitals": {
      "TA": "108/66 mmHg",
      "Nabız": "118/dk",
      "Solunum": "20/dk",
      "SpO2": "%98",
      "Ateş": "36.9 °C"
    },
    "exam": [
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Skleralarda ikter belirgin",
      "Ciltte hafif solukluk ve sararma var",
      "Dalak büyüklüğü belirgin değil",
      "Kostovertebral açı hassasiyeti yok",
      "Nörolojik muayene doğal"
    ],
    "investigations": [
      {
        "id": "hemoliz-paneli-g6pd-001",
        "label": "Hemoliz paneli",
        "type": "lab",
        "priority": "essential",
        "summary": "İndirekt bilirubin ve LDH yüksek, haptoglobin düşük saptandı. Bulgular intravasküler hemolizle uyumludur.",
        "findings": [
          "İndirekt hiperbilirubinemi hemolizi destekler.",
          "Düşük haptoglobin dolaşım içi hemoglobini bağladığını gösterir."
        ],
        "rows": [
          [
            "Hemoglobin",
            "8.9 g/dL",
            "13.5-17.5 g/dL",
            "Düşük"
          ],
          [
            "İndirekt bilirubin",
            "4.2 mg/dL",
            "<1.0 mg/dL",
            "Yüksek"
          ],
          [
            "LDH",
            "920 U/L",
            "120-240 U/L",
            "Yüksek"
          ],
          [
            "Haptoglobin",
            "<10 mg/dL",
            "30-200 mg/dL",
            "Düşük"
          ]
        ]
      },
      {
        "id": "periferik-yayma-g6pd-001",
        "label": "Periferik yayma",
        "type": "microscopy",
        "priority": "essential",
        "summary": "Heinz cisimcikleri ve ısırılmış eritrositler görüldü. Bulgular oksidatif eritrosit hasarını destekler.",
        "findings": [
          "Bite cell görünümü dalakta hasarlı hemoglobinin temizlenmesiyle ilişkilidir.",
          "Sferosit baskınlığı olmadığı için herediter sferositoz geri plandadır."
        ],
        "rows": [
          [
            "Heinz cisimciği",
            "Pozitif",
            "Negatif",
            "Patolojik"
          ],
          [
            "Bite cell",
            "Belirgin",
            "Yok",
            "Patolojik"
          ],
          [
            "Şistosit",
            "Belirgin değil",
            "Yok/çok az",
            "Dışlayıcı"
          ]
        ]
      },
      {
        "id": "idrar-analizi-hemoglobinuri-001",
        "label": "İdrar analizi",
        "type": "urine",
        "priority": "useful",
        "summary": "İdrarda hemoglobin pozitif, eritrosit az saptandı. Bu patern hemoglobinüri ile uyumludur.",
        "findings": [
          "Koyu idrar hemolizle açıklanır.",
          "Çok sayıda eritrosit olmaması primer hematüriyi geri plana iter."
        ],
        "rows": [
          [
            "İdrar Hb",
            "Pozitif",
            "Negatif",
            "Patolojik"
          ],
          [
            "Eritrosit",
            "0-2/HPF",
            "0-3/HPF",
            "Normal"
          ],
          [
            "Keton",
            "Negatif",
            "Negatif",
            "Normal"
          ]
        ]
      },
      {
        "id": "g6pd-enzim-duzeyi-001",
        "label": "G6PD enzim düzeyi",
        "type": "lab",
        "priority": "situational",
        "summary": "Akut atak sonrası kontrol için G6PD düzeyi planlandı; erken dönemde sonuç yalancı normal olabilir.",
        "findings": [
          "Retikülositoz nedeniyle testin zamanlaması önemlidir.",
          "Aile danışmanlığı ve tetikleyici kaçınması planlanır."
        ],
        "rows": [
          [
            "G6PD aktivitesi",
            "Kontrolde düşük beklenir",
            "Normal aktivite",
            "Şüpheli"
          ],
          [
            "Retikülosit",
            "%7.8",
            "%0.5-2.5",
            "Yüksek"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "G6PD eksikliğine bağlı akut hemolitik kriz",
      "options": [
        "G6PD eksikliğine bağlı akut hemolitik kriz",
        "Herediter sferositoz",
        "Otoimmün hemolitik anemi",
        "Akut viral hepatit"
      ],
      "explanation": "Bakla gibi oksidatif tetikleyici sonrası ani sarılık, koyu idrar, indirekt bilirubin yüksekliği, düşük haptoglobin ve periferik yaymada Heinz cisimciği/bite cell görülmesi G6PD ilişkili hemolizi destekler.",
      "pearls": [
        "G6PD eksikliğinde oksidatif stres eritrositte hemolize yol açar.",
        "Heinz cisimcikleri ve bite cell yüksek verimli mikroskopi bulgularıdır.",
        "Akut atakta G6PD testi retikülositoz nedeniyle yalancı normal gelebilir."
      ],
      "nextStep": "Oksidatif tetikleyiciyi kes, hidrasyon ve böbrek izlemi sağla; ağır anemide eritrosit transfüzyonu değerlendir.",
      "answerFeedback": {
        "diagnosisMeta": "Oksidatif tetikleyici · intravasküler hemoliz · Heinz cisimciği/bite cell paterni",
        "whyCorrect": "Oksidatif maruziyet sonrası hemoliz bulguları ve periferik yayma paterni G6PD eksikliğini en güçlü seçenek yapar.",
        "evidenceChain": [
          "Bakla tüketiminden sonra semptom başlaması",
          "Koyu idrar ve sarılık",
          "İndirekt bilirubin yüksekliği ve haptoglobin düşüklüğü",
          "Heinz cisimciği ve bite cell görülmesi"
        ],
        "pearls": [
          "Sulfonamid, antimalaryal ve bakla atağı tetikleyebilir.",
          "Tedavide tetikleyiciden kaçınma ve destek yaklaşımı ön plandadır."
        ],
        "management": [
          "Tetikleyici ilacı/gıdayı kes ve oksidatif maruziyeti önle",
          "Hidrasyon, idrar çıkışı ve böbrek fonksiyonlarını izle",
          "Ağır semptomatik anemide eritrosit transfüzyonu değerlendir",
          "Atak düzeldikten sonra G6PD aktivitesini doğrula ve aile eğitimi ver"
        ],
        "learningOutcome": "Oksidatif stres başlığı, KlinikIQ’da en iyi G6PD ilişkili hemolitik kriz üzerinden; tetikleyici, hemoliz paneli ve yayma bulguları birlikte okutularak öğretilir.",
        "differentials": {
          "Herediter sferositoz": {
            "explanation": "Sferosit, aile öyküsü ve kronik ekstravasküler hemoliz beklenir; bu vakada oksidatif tetikleyici ve bite cell baskındır.",
            "comparisonPoints": [
              "Osmotik frajilite/EMA testi herediter sferositozda destekleyicidir",
              "Heinz cisimciği G6PD lehinedir"
            ]
          },
          "Otoimmün hemolitik anemi": {
            "explanation": "Direkt Coombs pozitifliği beklenir; bu vakada oksidatif tetikleyici ve yayma paterni daha belirleyicidir.",
            "comparisonPoints": [
              "Coombs testi otoimmün hemolizde pozitiftir",
              "Bite cell oksidatif hasarı destekler"
            ]
          },
          "Akut viral hepatit": {
            "explanation": "AST/ALT belirgin yüksekliği ve direkt bilirubin baskınlığı beklenir; bu vakada hemoliz biyobelirteçleri ön plandadır.",
            "comparisonPoints": [
              "Hepatit transaminaz baskın gider",
              "Hemoglobinüri ve düşük haptoglobin hemoliz lehinedir"
            ]
          }
        }
      }
    }
  },
  {
    "id": "cardiovascular-coagulative-necrosis-mi-001",
    "branchId": "cardiovascular",
    "title": "Uzamış göğüs ağrısı sonrası reperfüzyon gerektiren hasta",
    "difficulty": "Orta · TUS düzeyi",
    "clinicalFocus": "İskemik nekroz, miyokard infarktüsü, morfolojik nekroz tipi",
    "demographics": "55 yaş erkek",
    "setting": "Acil servis - göğüs ağrısı",
    "chiefComplaint": "1 saattir süren baskı tarzı göğüs ağrısı",
    "stem": "Hasta sol kola yayılan göğüs ağrısı, soğuk terleme ve bulantı ile başvurur. Anjiyografide LAD tam tıkanıklığı saptanır. Akut iskemik miyokard hasarı, katı organlarda beklenen nekroz paternini düşündüren klasik bir bulgu paterni oluşturur.",
    "vitals": {
      "TA": "138/86 mmHg",
      "Nabız": "102/dk",
      "Solunum": "20/dk",
      "SpO2": "%96",
      "Ateş": "36.8 °C"
    },
    "exam": [
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Hasta terli ve anksiyöz görünüyor",
      "Kalpte S4 duyuluyor, belirgin üfürüm yok",
      "Akciğer bazallerinde ral saptanmıyor",
      "Periferik nabızlar simetrik alınıyor",
      "Fokal nörolojik defisit yok"
    ],
    "investigations": [
      {
        "id": "12-derivasyon-ekg-18",
        "label": "12 derivasyon EKG",
        "type": "ecg",
        "priority": "essential",
        "summary": "EKG’de ardışık derivasyonlarda ST elevasyonu izlendi.",
        "findings": [
          "Akut transmural miyokard hasarı paternini destekler.",
          "Doku düzeyinde koagülasyon nekrozu beklenir."
        ],
        "rows": [
          [
            "ST segment",
            "Elevasyon",
            "İzoelektrik",
            "Patolojik"
          ],
          [
            "Resiprokal değişiklik",
            "Var",
            "Yok",
            "Destekleyici"
          ]
        ]
      },
      {
        "id": "troponin-ve-kardiyak-biyobelirtecler-18",
        "label": "Troponin ve kardiyak biyobelirteçler",
        "type": "lab",
        "priority": "essential",
        "summary": "Troponin belirgin yüksek ve yükselme eğiliminde bulundu.",
        "findings": [
          "Miyokard nekrozu biyobelirteçle desteklenir.",
          "İskemik doku hasarı güçlüdür."
        ],
        "rows": [
          [
            "Troponin I",
            "6.8 ng/mL",
            "<0.04 ng/mL",
            "Yüksek"
          ],
          [
            "CK-MB",
            "Yüksek",
            "Normal",
            "Yüksek"
          ]
        ]
      },
      {
        "id": "koroner-anjiyografi-18",
        "label": "Koroner anjiyografi",
        "type": "ct",
        "priority": "useful",
        "summary": "Koroner değerlendirmede LAD düzeyinde kritik tıkanıklık saptandı.",
        "findings": [
          "Nedensel koroner olay gösterilir.",
          "Reperfüzyon aciliyeti vardır."
        ],
        "rows": [
          [
            "Koroner akım",
            "LAD kritik tıkanıklık",
            "Açık damar",
            "Patolojik"
          ],
          [
            "TIMI akım",
            "Azalmış",
            "Normal",
            "Anormal"
          ]
        ]
      },
      {
        "id": "histoloji-nekroz-tipi-18",
        "label": "Histoloji/nekroz tipi",
        "type": "pathology",
        "priority": "situational",
        "summary": "Histolojik patern koagülasyon nekrozu ile uyumlu saptandı.",
        "findings": [
          "Miyokard enfarktüsünde klasik nekroz tipi budur.",
          "Likefaksiyon nekrozu beyin/apseyle daha ilişkilidir."
        ],
        "rows": [
          [
            "Nekroz tipi",
            "Koagülasyon",
            "Canlı doku",
            "Patolojik"
          ],
          [
            "Hücre konturu",
            "Korunmuş gölgeler",
            "Normal",
            "Uyumlu"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "Koagülasyon nekrozu",
      "options": [
        "Koagülasyon nekrozu",
        "Likefaksiyon nekrozu",
        "Kazeifikasyon nekrozu",
        "Yağ nekrozu"
      ],
      "explanation": "Miyokard ve böbrek gibi solid organlarda iskemi sonrası tipik nekroz koagülasyon nekrozudur. Beyin istisna olarak likefaksiyon nekrozu gösterir.",
      "pearls": [
        "MI -> koagülasyon nekrozu.",
        "Renal arter tıkanması -> koagülasyon nekrozu.",
        "Beyin infarktı -> likefaksiyon nekrozu.",
        "Tüberküloz granülomu -> kazeifikasyon nekrozu."
      ],
      "nextStep": "STEMI protokolü: aspirin/antitrombotik yaklaşım, acil PCI ve hemodinamik izlem.",
      "answerFeedback": {
        "diagnosisMeta": "İskemi + solid organ + MI = koagülasyon nekrozu. Alan Feedback",
        "whyCorrect": "Miyokard ve böbrek gibi solid organlarda iskemi sonrası tipik nekroz koagülasyon nekrozudur. Beyin istisna olarak likefaksiyon nekrozu gösterir.",
        "evidenceChain": [
          "Şiddetli göğüs ağrısı",
          "ST elevasyonu",
          "LAD tam tıkanıklığı",
          "Troponin yüksekliği"
        ],
        "pearls": [
          "Patoloji cevabı tedavi cevabından ayrıdır: tanı/tedavi PCI; morfolojik tip koagülasyon nekrozudur."
        ],
        "management": [
          "Acil EKG ve STEMI tanısı — Zaman miyokarddır.",
          "Acil revaskülarizasyon/PCI — İskemik alan kurtarılır.",
          "Antitrombotik ve destek tedavisi — Trombotik oklüzyon yönetilir.",
          "Patoloji korelasyonu: koagülasyon nekrozu — Sınav morfoloji bilgisidir."
        ],
        "learningOutcome": "Nekroz tiplerinde organ, iskemi/enfeksiyon mekanizması ve morfoloji birlikte eşleştirilmelidir.",
        "differentials": {
          "Likefaksiyon nekrozu": {
            "explanation": "Likefaksiyon nekrozu ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Koagülasyon nekrozu lehinedir.",
            "comparisonPoints": [
              "Likefaksiyon nekrozu için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Koagülasyon nekrozu tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Kazeifikasyon nekrozu": {
            "explanation": "Kazeifikasyon nekrozu ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Koagülasyon nekrozu lehinedir.",
            "comparisonPoints": [
              "Kazeifikasyon nekrozu için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Koagülasyon nekrozu tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Yağ nekrozu": {
            "explanation": "Yağ nekrozu ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Koagülasyon nekrozu lehinedir.",
            "comparisonPoints": [
              "Yağ nekrozu için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Koagülasyon nekrozu tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "neurology-liquefactive-necrosis-brain-001",
    "branchId": "neurology",
    "title": "Baş ağrısı ve ateş sonrası kaviter beyin lezyonu gelişen hasta",
    "difficulty": "Orta · TUS düzeyi",
    "clinicalFocus": "Beyin dokusunda enzimatik sindirim ve sıvılaşma",
    "demographics": "42 yaş erkek",
    "setting": "Nöroloji servisi",
    "chiefComplaint": "Ateş, baş ağrısı ve fokal nörolojik defisit",
    "stem": "Hasta sinüzit sonrası ateş, baş ağrısı, konfüzyon ve sağ kol güçsüzlüğü ile gelir. Beyin MR'ında halka tarzı kontrastlanan lezyon görülür. Beyin dokusunda enfeksiyon/iskemi sonrası likefaksiyon nekrozu beklenir.",
    "vitals": {
      "TA": "132/78 mmHg",
      "Nabız": "112/dk",
      "Solunum": "22/dk",
      "SpO2": "%96",
      "Ateş": "38.6 °C"
    },
    "exam": [
      "Genel durum stabil; hasta uyanık, koopere ve belirgin akut toksik görünümde değil.",
      "Hasta somnolandır, GKS 13",
      "Sol hemiparezi ve hafif fasiyal asimetri var",
      "Papil ödemi ve baş ağrısı intrakraniyal basınç artışını düşündürüyor",
      "Ense sertliği hafif pozitif",
      "Kronik tüberküloz bulgusu veya yaygın lenfadenopati yok"
    ],
    "investigations": [
      {
        "id": "beyin-bt-mr-19",
        "label": "Beyin BT/MR",
        "type": "mri",
        "priority": "essential",
        "summary": "Beyin görüntülemede kaviter, santrali sıvılaşmış lezyon izlendi.",
        "findings": [
          "Beyin dokusunda enzimatik sindirim ve likefaksiyon paterni desteklenir.",
          "Solid tümör görünümü ön planda değildir."
        ],
        "rows": [
          [
            "MR bulgusu",
            "Sıvılaşmış kaviter lezyon",
            "Normal",
            "Patolojik"
          ],
          [
            "Ödem",
            "Çevresel ödem var",
            "Yok",
            "Patolojik"
          ]
        ]
      },
      {
        "id": "hemogram-ve-inflamasyon-belirtecleri-19",
        "label": "Hemogram ve inflamasyon belirteçleri",
        "type": "lab",
        "priority": "essential",
        "summary": "Lökositoz ve CRP yüksekliği saptandı.",
        "findings": [
          "Enfeksiyöz süreç ve apse ihtimalini destekler.",
          "Steril dejeneratif süreç daha geri plandadır."
        ],
        "rows": [
          [
            "Lökosit",
            "15.800/µL",
            "4.000-10.000/µL",
            "Yüksek"
          ],
          [
            "CRP",
            "96 mg/L",
            "<5 mg/L",
            "Yüksek"
          ]
        ]
      },
      {
        "id": "aspirat-kulturu-19",
        "label": "Aspirat kültürü",
        "type": "culture",
        "priority": "useful",
        "summary": "Aspirat kültüründe bakteriyel etken üredi.",
        "findings": [
          "Apse tanısı mikrobiyolojik olarak desteklenir.",
          "Antibiyotik hedefe göre düzenlenir."
        ],
        "rows": [
          [
            "Kültür",
            "Bakteriyel üreme var",
            "Üreme yok",
            "Pozitif"
          ],
          [
            "Gram boyama",
            "Lökosit/bakteri var",
            "Yok",
            "Patolojik"
          ]
        ]
      },
      {
        "id": "patoloji-nekroz-degerlendirmesi-19",
        "label": "Patoloji/nekroz",
        "type": "pathology",
        "priority": "situational",
        "summary": "Patoloji örneğinde likefaksiyon nekrozu ve yoğun nötrofilik inflamasyon izlendi.",
        "findings": [
          "Beyin apsesiyle uyumlu nekroz tipi gösterilir.",
          "Kazeifiye granülom paterni değildir."
        ],
        "rows": [
          [
            "Nekroz tipi",
            "Likefaksiyon",
            "Yok",
            "Patolojik"
          ],
          [
            "İnflamasyon",
            "Nötrofil yoğun",
            "Yok",
            "Akut"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "Likefaksiyon nekrozu",
      "options": [
        "Likefaksiyon nekrozu",
        "Koagülasyon nekrozu",
        "Kazeifikasyon nekrozu",
        "Yağ nekrozu"
      ],
      "explanation": "Olgunun klinik paterni Likefaksiyon nekrozu ile en uyumludur. Ayırıcı tanıda benzer tablolar olsa da belirleyici bulgular doğru seçeneği destekler.",
      "pearls": [
        "Beyin infarktı ve apse likefaksiyon nekrozuyla ilişkilidir.",
        "Nötrofil enzimleri dokuyu sıvılaştırır.",
        "Solid organ iskemisi genelde koagülasyon nekrozu yapar."
      ],
      "nextStep": "Acil stabilizasyon gerektiren durum dışlandıktan sonra tanıyı doğrulayan temel test ve hedefe yönelik tedavi/yönetim başlatılır.",
      "answerFeedback": {
        "diagnosisMeta": "Likefaksiyon nekrozu için belirleyici klinik ve patolojik ipuçları.",
        "whyCorrect": "Olgunun klinik paterni Likefaksiyon nekrozu ile en uyumludur. Ayırıcı tanıda benzer tablolar olsa da belirleyici bulgular doğru seçeneği destekler.",
        "evidenceChain": [
          "Hasta sinüzit sonrası ateş, baş ağrısı, konfüzyon ve sağ kol güçsüzlüğü ile gelir",
          "Halka tarzı kontrastlanan apse",
          "Lökositoz ve CRP yüksek",
          "klinik mekanizma ile uyumlu ayırıcı tanı paterni"
        ],
        "pearls": [
          "Beyin infarktı ve apse likefaksiyon nekrozuyla ilişkilidir.",
          "Nötrofil enzimleri dokuyu sıvılaştırır."
        ],
        "management": [
          "Stabilizasyon ve öncelikli klinik karar — Acil risk yönetilir.",
          "Beyin MR istemi — Tanısal yön verir.",
          "CBC/CRP ile doğrulama — Ayırıcı tanı netleşir.",
          "Hedefe yönelik tedavi/izlem — Altta yatan mekanizma yönetilir."
        ],
        "learningOutcome": "Patoloji başlıklarında organ, etiyoloji ve morfolojik patern birlikte yorumlanmalıdır.",
        "differentials": {
          "Koagülasyon nekrozu": {
            "explanation": "Koagülasyon nekrozu ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Likefaksiyon nekrozu lehinedir.",
            "comparisonPoints": [
              "Koagülasyon nekrozu için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Likefaksiyon nekrozu tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Kazeifikasyon nekrozu": {
            "explanation": "Kazeifikasyon nekrozu ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Likefaksiyon nekrozu lehinedir.",
            "comparisonPoints": [
              "Kazeifikasyon nekrozu için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Likefaksiyon nekrozu tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Yağ nekrozu": {
            "explanation": "Yağ nekrozu ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Likefaksiyon nekrozu lehinedir.",
            "comparisonPoints": [
              "Yağ nekrozu için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Likefaksiyon nekrozu tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "infectious-diseases-caseating-granuloma-tb-001",
    "branchId": "infectious-diseases",
    "title": "Kronik öksürük, gece terlemesi ve granülomatöz akciğer bulguları",
    "difficulty": "Orta · TUS düzeyi",
    "clinicalFocus": "Kronik inflamasyon, epiteloid histiyosit, dev hücre, TB dışlama",
    "demographics": "31 yaş kadın",
    "setting": "Göğüs hastalıkları polikliniği",
    "chiefComplaint": "Gece terlemesi, kilo kaybı ve kronik öksürük",
    "stem": "Hastada üç aydır öksürük, gece terlemesi, kilo kaybı ve apikal infiltrasyon vardır. Biyopside epiteloid histiyositler, dev hücreler ve santral kazeifikasyon izlenir. Üst lob kavitesi ve kazeifikasyon birlikte tüberküloz ilişkili granülomatöz inflamasyonu güçlü düşündürür.",
    "vitals": {
      "TA": "118/72 mmHg",
      "Nabız": "104/dk",
      "Solunum": "22/dk",
      "SpO2": "%94",
      "Ateş": "38.1 °C"
    },
    "exam": [
      "Genel durum stabil; hasta uyanık, koopere ve belirgin akut toksik görünümde değil.",
      "Zayıf görünüm ve gece terlemesi öyküsü belirgin",
      "Sağ üst zonda solunum sesleri azalmış ve ince ral duyuluyor",
      "Servikal küçük lenf nodları palpabl",
      "Hemoptizi için balgamda çizgisel kan tarifleniyor",
      "Akut solunum yetmezliği bulgusu yok"
    ],
    "investigations": [
      {
        "id": "akciger-grafisi-veya-toraks-bt-20",
        "label": "Akciğer grafisi veya toraks BT",
        "type": "ct",
        "priority": "essential",
        "summary": "Akciğer görüntülemede üst lob ağırlıklı kaviter lezyonlar izlendi.",
        "findings": [
          "Reaktivasyon tüberkülozu paternini destekler.",
          "Basit viral bronşit görünümü değildir."
        ],
        "rows": [
          [
            "Akciğer grafisi/BT",
            "Üst lob kavite",
            "Normal",
            "Patolojik"
          ],
          [
            "Hiler bulgu",
            "Uyumlu değişiklik",
            "Yok",
            "Destekleyici"
          ]
        ]
      },
      {
        "id": "arb-boyama-tb-pcr-ve-kultur-20",
        "label": "ARB boyama, TB PCR ve kültür",
        "type": "culture",
        "priority": "essential",
        "summary": "ARB boyama ve TB PCR pozitif; kültür sonucu bekleniyor.",
        "findings": [
          "Mikobakteriyel enfeksiyon güçlü şekilde desteklenir.",
          "Kültür duyarlılık için önemlidir."
        ],
        "rows": [
          [
            "ARB boyama",
            "Pozitif",
            "Negatif",
            "Pozitif"
          ],
          [
            "TB PCR",
            "Pozitif",
            "Negatif",
            "Pozitif"
          ],
          [
            "Kültür",
            "Beklemede",
            "Üreme yok",
            "Beklemede"
          ]
        ]
      },
      {
        "id": "histopatoloji-20",
        "label": "Histopatoloji",
        "type": "pathology",
        "priority": "useful",
        "summary": "Biyopside kazeifiye granülomatöz inflamasyon izlendi.",
        "findings": [
          "Tüberküloz için klasik patoloji paternidir.",
          "Sarkoidozda genellikle non-kazeifiye granülom beklenir."
        ],
        "rows": [
          [
            "Granülom",
            "Kazeifiye",
            "Yok/non-kazeifiye",
            "Patolojik"
          ],
          [
            "Dev hücre",
            "Var",
            "Yok",
            "Destekleyici"
          ]
        ]
      },
      {
        "id": "igra-ppd-ve-temas-taramasi-20",
        "label": "IGRA/PPD ve temas taraması",
        "type": "lab",
        "priority": "situational",
        "summary": "IGRA pozitif; temaslı taraması başlatıldı.",
        "findings": [
          "Bağışıklık yanıtı enfeksiyonla uyumludur.",
          "Halk sağlığı açısından temaslı izlemi gerekir."
        ],
        "rows": [
          [
            "IGRA",
            "Pozitif",
            "Negatif",
            "Pozitif"
          ],
          [
            "Temaslı taraması",
            "Başlatıldı",
            "Gerektiğinde",
            "Gerekli"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "Tüberkülozla uyumlu kazeifiye granülom",
      "options": [
        "Tüberkülozla uyumlu kazeifiye granülom",
        "Sarkoidoz non-kazeifiye granülom",
        "Akut apse",
        "Fibrinoid nekroz"
      ],
      "explanation": "Olgunun klinik paterni Kazeifikasyon nekrozlu granülom ile en uyumludur. Ayırıcı tanıda benzer tablolar olsa da belirleyici bulgular doğru seçeneği destekler.",
      "pearls": [
        "TB kazeifiye granülomla klasik ilişkilidir.",
        "Sarkoidoz non-kazeifiye granülom yapar; kazeifikasyon çeldiricidir.",
        "Kronik inflamasyonda makrofaj, lenfosit ve plazma hücreleri öne çıkar."
      ],
      "nextStep": "Acil stabilizasyon gerektiren durum dışlandıktan sonra tanıyı doğrulayan temel test ve hedefe yönelik tedavi/yönetim başlatılır.",
      "answerFeedback": {
        "diagnosisMeta": "Kazeifikasyon nekrozlu granülom için belirleyici klinik ve patolojik ipuçları.",
        "whyCorrect": "Olgunun klinik paterni Kazeifikasyon nekrozlu granülom ile en uyumludur. Ayırıcı tanıda benzer tablolar olsa da belirleyici bulgular doğru seçeneği destekler.",
        "evidenceChain": [
          "Hastada üç aydır öksürük, gece terlemesi, kilo kaybı ve apikal infiltrasyon vardır",
          "Apikal infiltrasyon/kavite",
          "ARB pozitif olabilir",
          "klinik mekanizma ile uyumlu ayırıcı tanı paterni"
        ],
        "pearls": [
          "TB kazeifiye granülomla klasik ilişkilidir.",
          "Sarkoidoz non-kazeifiye granülom yapar; kazeifikasyon çeldiricidir."
        ],
        "management": [
          "Stabilizasyon ve öncelikli klinik karar — Acil risk yönetilir.",
          "Akciğer grafisi/BT istemi — Tanısal yön verir.",
          "ARB boyama/kültür ile doğrulama — Ayırıcı tanı netleşir.",
          "Hedefe yönelik tedavi/izlem — Altta yatan mekanizma yönetilir."
        ],
        "learningOutcome": "Patoloji başlıklarında organ, etiyoloji ve morfolojik patern birlikte yorumlanmalıdır.",
        "differentials": {
          "Sarkoidoz non-kazeifiye granülom": {
            "explanation": "Sarkoidoz non-kazeifiye granülom ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Tüberkülozla uyumlu kazeifiye granülom lehinedir.",
            "comparisonPoints": [
              "Sarkoidoz non-kazeifiye granülom için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Tüberkülozla uyumlu kazeifiye granülom tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Akut apse": {
            "explanation": "Akut apse ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Tüberkülozla uyumlu kazeifiye granülom lehinedir.",
            "comparisonPoints": [
              "Akut apse için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Tüberkülozla uyumlu kazeifiye granülom tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Fibrinoid nekroz": {
            "explanation": "Fibrinoid nekroz ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Tüberkülozla uyumlu kazeifiye granülom lehinedir.",
            "comparisonPoints": [
              "Fibrinoid nekroz için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Tüberkülozla uyumlu kazeifiye granülom tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "pulmonology-pulmonary-embolism-dvt-001",
    "branchId": "pulmonology",
    "title": "Bacak şişliği sonrası ani dispne ve hipoksemi gelişen hasta",
    "difficulty": "Orta · TUS düzeyi",
    "clinicalFocus": "Tromboz, emboli, infarkt ve şok riski",
    "demographics": "66 yaş kadın, kalça cerrahisi sonrası",
    "setting": "Acil servis",
    "chiefComplaint": "Ani nefes darlığı ve plöritik göğüs ağrısı",
    "stem": "Kalça protezi ameliyatından 7 gün sonra hasta ani dispne, taşikardi ve plöritik ağrı ile gelir. Sol baldırda şişlik vardır. Virchow triadı bağlamında staz ve endotel hasarı sonrası DVT kaynaklı pulmoner emboli düşünülür.",
    "vitals": {
      "TA": "104/66 mmHg",
      "Nabız": "124/dk",
      "Solunum": "30/dk",
      "SpO2": "%88",
      "Ateş": "36.9 °C"
    },
    "exam": [
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Hasta dispneik ve takipneik",
      "Sağ baldırda çap artışı, hassasiyet ve ısı artışı var",
      "Akciğer oskültasyonunda belirgin fokal ral, bronşiyal solunum sesi veya plevral frotman duyulmuyor.",
      "Juguler venöz dolgunluk hafif artmış",
      "Göğüs duvarı palpasyonuyla ağrı yeniden üretilemiyor"
    ],
    "investigations": [
      {
        "id": "d-dimer-ve-arter-kan-gazi-21",
        "label": "D-dimer ve arter kan gazı",
        "type": "lab",
        "priority": "essential",
        "summary": "D-dimer yüksek, kan gazında hipoksemi ve respiratuvar alkaloz izlendi.",
        "findings": [
          "Tromboemboli ihtimalini destekler.",
          "D-dimer tek başına kesin tanı değildir."
        ],
        "rows": [
          [
            "D-dimer",
            "3200 ng/mL",
            "<500 ng/mL",
            "Yüksek"
          ],
          [
            "PaO2",
            "58 mmHg",
            "80-100 mmHg",
            "Düşük"
          ],
          [
            "pCO2",
            "30 mmHg",
            "35-45 mmHg",
            "Düşük"
          ]
        ]
      },
      {
        "id": "bt-pulmoner-anjiyografi-21",
        "label": "BT pulmoner anjiyografi",
        "type": "ct",
        "priority": "essential",
        "summary": "BT pulmoner anjiyografide segmenter pulmoner arter dolum defekti saptandı.",
        "findings": [
          "Pulmoner emboli tanısı görüntüleme ile doğrulanır.",
          "Pnömoni veya pnömotoraks ana bulgu değildir."
        ],
        "rows": [
          [
            "BTPA",
            "Dolum defekti var",
            "Yok",
            "Pozitif"
          ],
          [
            "Emboli düzeyi",
            "Segmenter",
            "Yok",
            "Patolojik"
          ]
        ]
      },
      {
        "id": "alt-ekstremite-venoz-doppler-21",
        "label": "Alt ekstremite venöz Doppler",
        "type": "ultrasound",
        "priority": "useful",
        "summary": "Alt ekstremite Doppler’de popliteal vende trombüs izlendi.",
        "findings": [
          "DVT kaynağı gösterilmiştir.",
          "Bilateral yaygın ödemden farklı lokal venöz patoloji vardır."
        ],
        "rows": [
          [
            "Doppler",
            "Popliteal DVT",
            "Trombüs yok",
            "Pozitif"
          ],
          [
            "Kompresyon",
            "Komprese olmuyor",
            "Komprese olur",
            "Anormal"
          ]
        ]
      },
      {
        "id": "ekg-ve-ekokardiyografi-21",
        "label": "EKG ve ekokardiyografi",
        "type": "ecg",
        "priority": "situational",
        "summary": "EKG’de sinüs taşikardisi, ekokardiyografide hafif sağ kalp yüklenmesi izlendi.",
        "findings": [
          "Hemodinamik risk değerlendirmesine katkı sağlar.",
          "Masif emboli bulgusu belirgin değildir."
        ],
        "rows": [
          [
            "EKG",
            "Sinüs taşikardisi",
            "Normal ritim",
            "Anormal"
          ],
          [
            "EKO",
            "Hafif sağ yüklenme",
            "Normal",
            "Hafif patoloji"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "Pulmoner tromboemboli",
      "options": [
        "Pulmoner tromboemboli",
        "Pnömoni",
        "Spontan pnömotoraks",
        "Astım atağı"
      ],
      "explanation": "Olgunun klinik paterni Pulmoner tromboemboli ile en uyumludur. Ayırıcı tanıda benzer tablolar olsa da belirleyici bulgular doğru seçeneği destekler.",
      "pearls": [
        "Cerrahi/immobilizasyon sonrası ani dispne PE düşündürür.",
        "DVT en sık emboli kaynağıdır.",
        "Büyük emboli şok ve ani ölüme yol açabilir."
      ],
      "nextStep": "Acil stabilizasyon gerektiren durum dışlandıktan sonra tanıyı doğrulayan temel test ve hedefe yönelik tedavi/yönetim başlatılır.",
      "answerFeedback": {
        "diagnosisMeta": "Pulmoner tromboemboli için belirleyici klinik ve patolojik ipuçları.",
        "whyCorrect": "Olgunun klinik paterni Pulmoner tromboemboli ile en uyumludur. Ayırıcı tanıda benzer tablolar olsa da belirleyici bulgular doğru seçeneği destekler.",
        "evidenceChain": [
          "Kalça protezi ameliyatından 7 gün sonra hasta ani dispne, taşikardi ve plöritik ağrı ile gelir",
          "Yüksek",
          "Sağ pulmoner arter dalında dolum defekti",
          "klinik mekanizma ile uyumlu ayırıcı tanı paterni"
        ],
        "pearls": [
          "Cerrahi/immobilizasyon sonrası ani dispne PE düşündürür.",
          "DVT en sık emboli kaynağıdır."
        ],
        "management": [
          "Stabilizasyon ve öncelikli klinik karar — Acil risk yönetilir.",
          "D-dimer istemi — Tanısal yön verir.",
          "BT pulmoner anjiyografi ile doğrulama — Ayırıcı tanı netleşir.",
          "Hedefe yönelik tedavi/izlem — Altta yatan mekanizma yönetilir."
        ],
        "learningOutcome": "Patoloji başlıklarında organ, etiyoloji ve morfolojik patern birlikte yorumlanmalıdır.",
        "differentials": {
          "Pnömoni": {
            "explanation": "Pnömoni ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Pulmoner tromboemboli lehinedir.",
            "comparisonPoints": [
              "Pnömoni için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Pulmoner tromboemboli tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Spontan pnömotoraks": {
            "explanation": "Spontan pnömotoraks ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Pulmoner tromboemboli lehinedir.",
            "comparisonPoints": [
              "Spontan pnömotoraks için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Pulmoner tromboemboli tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Astım atağı": {
            "explanation": "Astım atağı ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Pulmoner tromboemboli lehinedir.",
            "comparisonPoints": [
              "Astım atağı için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Pulmoner tromboemboli tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "infectious-diseases-septic-shock-001",
    "branchId": "infectious-diseases",
    "title": "Ateş, hipotansiyon ve laktat yüksekliği ile acile getirilen hasta",
    "difficulty": "Orta · TUS düzeyi",
    "clinicalFocus": "Doku hipoperfüzyonu, laktat, inflamatuvar vazodilatasyon",
    "demographics": "70 yaş erkek",
    "setting": "Acil servis",
    "chiefComplaint": "Ateş, bilinç bulanıklığı ve tansiyon düşüklüğü",
    "stem": "Pnömoni odağı olan hasta ateş, taşikardi, hipotansiyon, soğuk ekstremite ve bilinç bulanıklığıyla gelir. Laktat yüksektir. Yakınları son saatlerde idrar miktarının belirgin azaldığını belirtir. Doku hipoperfüzyonu ve sistemik inflamatuvar yanıt şok tablosunu açıklar.",
    "vitals": {
      "TA": "78/46 mmHg",
      "Nabız": "132/dk",
      "Solunum": "30/dk",
      "SpO2": "%93",
      "Ateş": "39.2 °C"
    },
    "exam": [
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Hasta konfü ve toksik görünüyor",
      "Kapiller dolum 4 saniye, ekstremiteler soğuk ve benekli",
      "Sağ kostovertebral açı hassasiyeti belirgin",
      "Mukozalar kuru; hasta hipotansif şok görünümünde ve periferik perfüzyonu belirgin bozulmuş.",
      "Menenjit bulgusu ve yaygın döküntü yok"
    ],
    "investigations": [
      {
        "id": "laktat-ve-arter-kan-gazi-22",
        "label": "Laktat ve arter kan gazı",
        "type": "lab",
        "priority": "essential",
        "summary": "Laktat yüksek ve metabolik asidozla uyumlu kan gazı saptandı.",
        "findings": [
          "Doku hipoperfüzyonu vardır.",
          "Sıvı resüsitasyonu ve erken antibiyotik geciktirilmemelidir."
        ],
        "rows": [
          [
            "Laktat",
            "5.1 mmol/L",
            "<2 mmol/L",
            "Yüksek"
          ],
          [
            "pH",
            "7.28",
            "7.35-7.45",
            "Düşük"
          ],
          [
            "Bikarbonat",
            "16 mmol/L",
            "22-28 mmol/L",
            "Düşük"
          ]
        ]
      },
      {
        "id": "kan-kulturu-22",
        "label": "Kan kültürü",
        "type": "culture",
        "priority": "essential",
        "summary": "İki set kan kültürü alındı; sonuç bekleniyor.",
        "findings": [
          "Antibiyotik öncesi kültür hedefe yönelik tedavi sağlar.",
          "Tedavi kültür sonucunu beklememelidir."
        ],
        "rows": [
          [
            "Kan kültürü",
            "Alındı",
            "Alınmalı",
            "Beklemede"
          ],
          [
            "Üreme",
            "Beklemede",
            "Üreme yok",
            "Beklemede"
          ]
        ]
      },
      {
        "id": "hemogram-crp-ve-prokalsitonin-22",
        "label": "Hemogram, CRP ve prokalsitonin",
        "type": "lab",
        "priority": "useful",
        "summary": "Lökositoz, CRP ve prokalsitonin yüksekliği izlendi.",
        "findings": [
          "Bakteriyel enfeksiyon ve sistemik inflamasyon desteklenir.",
          "Tek başına odak göstermez."
        ],
        "rows": [
          [
            "Lökosit",
            "19.500/µL",
            "4.000-10.000/µL",
            "Yüksek"
          ],
          [
            "CRP",
            "180 mg/L",
            "<5 mg/L",
            "Yüksek"
          ],
          [
            "Prokalsitonin",
            "18 ng/mL",
            "<0.5 ng/mL",
            "Yüksek"
          ]
        ]
      },
      {
        "id": "odak-goruntuleme-22",
        "label": "Odak görüntüleme",
        "type": "xray",
        "priority": "situational",
        "summary": "Akciğer grafisinde sağ alt zon infiltrasyonu izlendi.",
        "findings": [
          "Olası enfeksiyon odağı pnömoni olarak değerlendirildi.",
          "Odak kontrolü ve antibiyotik seçimi buna göre planlanır."
        ],
        "rows": [
          [
            "Akciğer grafisi",
            "Sağ alt zon infiltrasyonu",
            "Doğal",
            "Patolojik"
          ],
          [
            "Plevral sıvı",
            "Belirgin değil",
            "Yok",
            "Sorun yok"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "Septik şok",
      "options": [
        "Septik şok",
        "Hipovolemik şok",
        "Anafilaktik şok",
        "Nörojenik şok"
      ],
      "explanation": "Olgunun klinik paterni Septik şok ile en uyumludur. Ayırıcı tanıda benzer tablolar olsa da belirleyici bulgular doğru seçeneği destekler.",
      "pearls": [
        "Şok doku hipoperfüzyonudur; laktat önemlidir.",
        "Sepsis + vazodilatasyon + kapiller kaçak septik şok mekanizmasını açıklar.",
        "İlk basamak sıvı, antibiyotik ve kaynak kontrolüdür."
      ],
      "nextStep": "Acil stabilizasyon gerektiren durum dışlandıktan sonra tanıyı doğrulayan temel test ve hedefe yönelik tedavi/yönetim başlatılır.",
      "answerFeedback": {
        "diagnosisMeta": "Septik şok için belirleyici klinik ve patolojik ipuçları.",
        "whyCorrect": "Olgunun klinik paterni Septik şok ile en uyumludur. Ayırıcı tanıda benzer tablolar olsa da belirleyici bulgular doğru seçeneği destekler.",
        "evidenceChain": [
          "Pnömoni odağı olan hasta ateş, taşikardi, hipotansiyon, soğuk ekstremite ve bilinç bulanıklığıyla gelir",
          "4.2 mmol/L",
          "Alındı",
          "klinik mekanizma ile uyumlu ayırıcı tanı paterni"
        ],
        "pearls": [
          "Şok doku hipoperfüzyonudur; laktat önemlidir.",
          "Sepsis + vazodilatasyon + kapiller kaçak septik şok mekanizmasını açıklar."
        ],
        "management": [
          "Stabilizasyon ve öncelikli klinik karar — Acil risk yönetilir.",
          "Laktat istemi — Tanısal yön verir.",
          "Kan kültürü ile doğrulama — Ayırıcı tanı netleşir.",
          "Hedefe yönelik tedavi/izlem — Altta yatan mekanizma yönetilir."
        ],
        "learningOutcome": "Patoloji başlıklarında organ, etiyoloji ve morfolojik patern birlikte yorumlanmalıdır.",
        "differentials": {
          "Hipovolemik şok": {
            "explanation": "Hipovolemik şok ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Septik şok lehinedir.",
            "comparisonPoints": [
              "Hipovolemik şok için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Septik şok tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Anafilaktik şok": {
            "explanation": "Anafilaktik şok ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Septik şok lehinedir.",
            "comparisonPoints": [
              "Anafilaktik şok için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Septik şok tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Nörojenik şok": {
            "explanation": "Nörojenik şok ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Septik şok lehinedir.",
            "comparisonPoints": [
              "Nörojenik şok için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Septik şok tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "internal-medicine-systemic-lupus-erythematosus-001",
    "branchId": "internal-medicine",
    "title": "Malar döküntü, proteinüri ve sistemik yakınmaları olan genç kadın",
    "difficulty": "Orta · TUS düzeyi",
    "clinicalFocus": "Otoantikorlar, immün kompleks, multisistem tutulum",
    "demographics": "24 yaş kadın",
    "setting": "Klinik/adli değerlendirme ortamı",
    "chiefComplaint": "Deri döküntüsü, fotosensitivite, eklem ağrısı ve köpüklü idrar",
    "stem": "Genç kadın hastada malar döküntü, oral aft, simetrik artralji ve proteinüri vardır. Anti-dsDNA ve ANA pozitifliği immün kompleks aracılı böbrek tutulumunu destekler. Multisistem tutulum ve böbrek bulgusu sistemik otoimmün hastalık lehinedir.",
    "vitals": {
      "TA": "148/92 mmHg",
      "Nabız": "96/dk",
      "Solunum": "18/dk",
      "SpO2": "%98",
      "Ateş": "37.6 °C"
    },
    "exam": [
      "Genel durum stabil; hasta uyanık, koopere ve belirgin akut toksik görünümde değil.",
      "Fotosensitif malar döküntü nazolabial olukları koruyor",
      "Ağız içinde ağrısız ülserler var",
      "El bileği ve MCP eklemlerinde simetrik hassasiyet mevcut",
      "Pretibial hafif ödem ve hipertansiyon böbrek tutulumunu düşündürüyor",
      "Siklik ağız kuruluğu ve parotis büyümesi baskın değil"
    ],
    "investigations": [
      {
        "id": "ana-anti-dsdna-ve-kompleman-duzeyleri-23",
        "label": "ANA, anti-dsDNA ve kompleman düzeyleri",
        "type": "lab",
        "priority": "essential",
        "summary": "ANA ve anti-dsDNA pozitif, kompleman düzeyleri düşük bulundu.",
        "findings": [
          "İmmün kompleks aktivitesi ve aktif SLE desteklenir.",
          "Böbrek tutulumu açısından risk yüksektir."
        ],
        "rows": [
          [
            "ANA",
            "Pozitif",
            "Negatif",
            "Pozitif"
          ],
          [
            "Anti-dsDNA",
            "Pozitif",
            "Negatif",
            "Pozitif"
          ],
          [
            "C3/C4",
            "Düşük",
            "Normal",
            "Düşük"
          ]
        ]
      },
      {
        "id": "tam-idrar-analizi-ve-proteinuri-23",
        "label": "Tam idrar analizi ve proteinüri",
        "type": "urine",
        "priority": "essential",
        "summary": "İdrarda proteinüri ve mikroskopik hematüri saptandı.",
        "findings": [
          "Lupus nefriti ihtimalini güçlendirir.",
          "Basit sistit için beklenen patern değildir."
        ],
        "rows": [
          [
            "Proteinüri",
            "1.8 g/gün",
            "<150 mg/gün",
            "Yüksek"
          ],
          [
            "Eritrosit",
            "Mikroskopik hematüri",
            "Yok",
            "Patolojik"
          ],
          [
            "Silendir",
            "Eritrosit silendiri olabilir",
            "Yok",
            "Destekleyici"
          ]
        ]
      },
      {
        "id": "hemogram-23",
        "label": "Hemogram",
        "type": "lab",
        "priority": "useful",
        "summary": "Hemogramda lenfopeni ve hafif anemi izlendi.",
        "findings": [
          "Sistemik otoimmün aktiviteyle uyumludur.",
          "İzole demir eksikliği tablonun tamamını açıklamaz."
        ],
        "rows": [
          [
            "Lenfosit",
            "800/µL",
            "1000-4800/µL",
            "Düşük"
          ],
          [
            "Hemoglobin",
            "10.8 g/dL",
            "12-16 g/dL",
            "Düşük"
          ]
        ]
      },
      {
        "id": "bobrek-biyopsisi-23",
        "label": "Böbrek biyopsisi",
        "type": "pathology",
        "priority": "situational",
        "summary": "Böbrek biyopsisi aktif immün kompleks glomerülonefriti göstermek için planlandı.",
        "findings": [
          "Tedavi yoğunluğu biyopsi sınıfına göre belirlenir.",
          "Her proteinüri olgusunda ilk basamak değildir; tutulum şiddetiyle seçilir."
        ],
        "rows": [
          [
            "Biyopsi",
            "Planlandı",
            "Endikasyona göre",
            "Beklemede"
          ],
          [
            "İmmün kompleks",
            "Beklenen bulgu",
            "Yok",
            "Şüpheli"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "Sistemik lupus eritematozus",
      "options": [
        "Sistemik lupus eritematozus",
        "Sjögren sendromu",
        "Romatoid artrit",
        "Sistemik skleroz"
      ],
      "explanation": "Olgu Sistemik lupus eritematozus için klasik olan belirleyici bulguları taşır. Yanlış seçenekler benzer sistem bulguları verebilir; ancak anahtar ipuçları doğru tanıyı öne çıkarır.",
      "pearls": [
        "SLE multisistem otoimmün hastalıktır.",
        "İmmün kompleks ve otoantikorlar hasarda rol oynar.",
        "Böbrek yetmezliği ve enfeksiyonlar önemli ölüm nedenleridir."
      ],
      "nextStep": "Önce güvenlik/stabilizasyon ve zorunlu klinik-adli/immünolojik kararlar; ardından tanı doğrulama ve hedefe yönelik tedavi/izlem.",
      "answerFeedback": {
        "diagnosisMeta": "Sistemik lupus eritematozus tanısını destekleyen klinik patern.",
        "whyCorrect": "Olgu Sistemik lupus eritematozus için klasik olan belirleyici bulguları taşır. Yanlış seçenekler benzer sistem bulguları verebilir; ancak anahtar ipuçları doğru tanıyı öne çıkarır. Alan Feedback",
        "evidenceChain": [
          "Genç kadın hastada malar döküntü, oral aft, simetrik artralji ve proteinüri vardır",
          "Pozitif",
          "Pozitif, yüksek titre",
          "Proteinüri ve eritrosit silendirleri"
        ],
        "pearls": [
          "SLE multisistem otoimmün hastalıktır.",
          "İmmün kompleks ve otoantikorlar hasarda rol oynar."
        ],
        "management": [
          "Acil güvenlik/stabilizasyon ve ön değerlendirme — Hastanın klinik/adli güvenliği sağlanır.",
          "ANA istemi — İlk tanısal dayanak oluşturulur.",
          "Anti-dsDNA ile tanıyı güçlendirme — Ayırıcı tanı daraltılır.",
          "Hedefe yönelik tedavi, izlem veya adli bildirim — Vakanın temel yönetim basamağı tamamlanır."
        ],
        "learningOutcome": "Öğrenci, öyküdeki risk faktörlerini somut muayene ve objektif tetkik bulgularıyla birleştirerek doğru tanı/yönetim kararına ulaşmalıdır.",
        "differentials": {
          "Sjögren sendromu": {
            "explanation": "Sjögren sendromu ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Sistemik lupus eritematozus lehinedir.",
            "comparisonPoints": [
              "Sjögren sendromu için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Sistemik lupus eritematozus tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Romatoid artrit": {
            "explanation": "Romatoid artrit ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Sistemik lupus eritematozus lehinedir.",
            "comparisonPoints": [
              "Romatoid artrit için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Sistemik lupus eritematozus tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Sistemik skleroz": {
            "explanation": "Sistemik skleroz ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Sistemik lupus eritematozus lehinedir.",
            "comparisonPoints": [
              "Sistemik skleroz için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Sistemik lupus eritematozus tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "internal-medicine-sjogren-syndrome-001",
    "branchId": "internal-medicine",
    "title": "Göz-ağız kuruluğu ve parotis büyümesi ile başvuru",
    "difficulty": "Orta · TUS düzeyi",
    "clinicalFocus": "Ekzokrin bez otoimmünitesi, sicca semptomları",
    "demographics": "46 yaş kadın",
    "setting": "Klinik/adli değerlendirme ortamı",
    "chiefComplaint": "Göz kuruluğu, ağız kuruluğu ve tekrarlayan diş çürükleri",
    "stem": "Hasta gözlerinde kum hissi, su içmeden kuru gıda yutamama ve parotis hassasiyeti tarifler. Schirmer testi azalmış, SSA/SSB pozitif bulunur. Objektif gözyaşı azalması ve otoantikor pozitifliği kuruluk sendromunu otoimmün kökenli düşündürür.",
    "vitals": {
      "TA": "116/72 mmHg",
      "Nabız": "82/dk",
      "Solunum": "16/dk",
      "SpO2": "%99",
      "Ateş": "36.8 °C"
    },
    "exam": [
      "Genel durum stabil; hasta uyanık, koopere ve belirgin akut toksik görünümde değil.",
      "Konjonktival kuruluk ve punktat keratit bulguları var",
      "Ağız mukozası kuru, dil fissürlü ve dental çürükler belirgin",
      "Parotis bezleri bilateral hafif büyümüş",
      "Artrit bulgusu hafif; belirgin sinovit yok",
      "Malar döküntü, fotosensitif deri lezyonu veya periferik ödem izlenmiyor.",
      "Korneal yüzeyde kurulukla uyumlu mat görünüm vardır; akut görme kaybı veya pürülan konjonktival akıntı saptanmıyor."
    ],
    "investigations": [
      {
        "id": "schirmer-testi-24",
        "label": "Schirmer testi",
        "type": "clinical",
        "priority": "essential",
        "summary": "Schirmer testinde 5 dakikada gözyaşı 3 mm ölçüldü; belirgin lakrimal hiposekresyon saptandı.",
        "findings": [
          "Objektif göz kuruluğu Sjögren sendromunu destekler.",
          "Konjonktival enfeksiyon bulgusu baskın değildir."
        ],
        "rows": [
          [
            "Schirmer testi",
            "3 mm/5 dk",
            ">10 mm/5 dk",
            "Düşük"
          ]
        ]
      },
      {
        "id": "anti-ro-ssa-ve-anti-la-ssb-24",
        "label": "Anti-Ro/SSA ve Anti-La/SSB",
        "type": "lab",
        "priority": "essential",
        "summary": "Anti-Ro/SSA pozitif, Anti-La/SSB pozitif saptandı.",
        "findings": [
          "Sjögren sendromu için serolojik destek vardır.",
          "İzole dehidratasyon bu otoantikorları açıklamaz."
        ],
        "rows": [
          [
            "Anti-Ro/SSA",
            "Pozitif",
            "Negatif",
            "Pozitif"
          ],
          [
            "Anti-La/SSB",
            "Pozitif",
            "Negatif",
            "Pozitif"
          ]
        ]
      },
      {
        "id": "tukuruk-bezi-ultrasonu-veya-biyopsisi-24",
        "label": "Tükürük bezi ultrasonu veya biyopsisi",
        "type": "pathology",
        "priority": "useful",
        "summary": "Minör tükürük bezi biyopsisinde fokal lenfositik sialadenit izlendi.",
        "findings": [
          "Tanısal sınıflamayı destekler.",
          "Akut bakteriyel sialadenit paterni değildir."
        ],
        "rows": [
          [
            "Biyopsi",
            "Fokal lenfositik sialadenit",
            "Normal",
            "Patolojik"
          ],
          [
            "Focus skoru",
            "Yüksek",
            "<1",
            "Patolojik"
          ]
        ]
      },
      {
        "id": "idrar-analizi-ayirici-24",
        "label": "İdrar analizi ve renal tutulum taraması",
        "type": "urine",
        "priority": "useful",
        "summary": "Proteinüri ve mikroskobik hematüri saptanmadı; renal tutulum açısından aktif bulgu izlenmedi.",
        "findings": [
          "Proteinüri veya hematüri olmaması lupus nefriti gibi renal tutulumla giden ayırıcı tanıları geri plana iter.",
          "Sjögren sendromunda tanıyı esas olarak sicca bulguları, Schirmer testi, otoantikorlar ve tükürük bezi değerlendirmesi destekler."
        ],
        "rows": [
          [
            "Proteinüri",
            "Saptanmadı",
            "Saptanmamalı",
            "Negatif"
          ],
          [
            "Mikroskobik hematüri",
            "Saptanmadı",
            "Saptanmamalı",
            "Negatif"
          ],
          [
            "Kreatinin",
            "Normal",
            "0.6-1.2 mg/dL",
            "Normal"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "Sjögren sendromu",
      "options": [
        "Sjögren sendromu",
        "SLE",
        "Romatoid artrit",
        "Hashimoto tiroiditi"
      ],
      "explanation": "Olgu Sjögren sendromu için klasik olan belirleyici bulguları taşır. Yanlış seçenekler benzer sistem bulguları verebilir; ancak anahtar ipuçları doğru tanıyı öne çıkarır.",
      "pearls": [
        "Sicca semptomları tanının kalbidir.",
        "Anti-SSA/SSB güçlü destek sağlar.",
        "Lenfoma riski uzun dönem izlemin parçasıdır."
      ],
      "nextStep": "Önce güvenlik/stabilizasyon ve zorunlu klinik-adli/immünolojik kararlar; ardından tanı doğrulama ve hedefe yönelik tedavi/izlem.",
      "answerFeedback": {
        "diagnosisMeta": "Sjögren sendromu tanısını destekleyen klinik patern.",
        "whyCorrect": "Olgu Sjögren sendromu için klasik olan belirleyici bulguları taşır. Yanlış seçenekler benzer sistem bulguları verebilir; ancak anahtar ipuçları doğru tanıyı öne çıkarır.",
        "evidenceChain": [
          "Hasta gözlerinde kum hissi, su içmeden kuru gıda yutamama ve parotis hassasiyeti tarifler",
          "Azalmış gözyaşı",
          "Pozitif",
          "Lenfositik infiltrasyon"
        ],
        "pearls": [
          "Sicca semptomları tanının kalbidir.",
          "Anti-SSA/SSB güçlü destek sağlar."
        ],
        "management": [
          "Acil güvenlik/stabilizasyon ve ön değerlendirme — Hastanın klinik/adli güvenliği sağlanır.",
          "Schirmer testi istemi — İlk tanısal dayanak oluşturulur.",
          "Anti-SSA/SSB ile tanıyı güçlendirme — Ayırıcı tanı daraltılır.",
          "Hedefe yönelik tedavi, izlem veya adli bildirim — Vakanın temel yönetim basamağı tamamlanır."
        ],
        "learningOutcome": "Öğrenci, öyküdeki risk faktörlerini somut muayene ve objektif tetkik bulgularıyla birleştirerek doğru tanı/yönetim kararına ulaşmalıdır.",
        "differentials": {
          "SLE": {
            "explanation": "SLE ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Sjögren sendromu lehinedir.",
            "comparisonPoints": [
              "SLE için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Sjögren sendromu tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Romatoid artrit": {
            "explanation": "Romatoid artrit ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Sjögren sendromu lehinedir.",
            "comparisonPoints": [
              "Romatoid artrit için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Sjögren sendromu tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Hashimoto tiroiditi": {
            "explanation": "Hashimoto tiroiditi ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Sjögren sendromu lehinedir.",
            "comparisonPoints": [
              "Hashimoto tiroiditi için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Sjögren sendromu tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "internal-medicine-rheumatoid-arthritis-001",
    "branchId": "internal-medicine",
    "title": "Sabah tutukluğu ve simetrik küçük eklem şişliği olan hasta",
    "difficulty": "Orta · TUS düzeyi",
    "clinicalFocus": "Kronik sinovit, pannus, simetrik küçük eklem tutulumu",
    "demographics": "38 yaş kadın",
    "setting": "Klinik/adli değerlendirme ortamı",
    "chiefComplaint": "El eklemlerinde şişlik, ağrı ve sabah tutukluğu",
    "stem": "Hasta 2 saati aşan sabah tutukluğu, MCP/PIP eklem şişliği ve simetrik ağrı ile gelir. RF ve anti-CCP pozitiftir. Kronik inflamatuvar sinovyal proliferasyon pannus oluşumuyla kıkırdak ve kemik hasarı yapar.",
    "vitals": {
      "TA": "122/76 mmHg",
      "Nabız": "88/dk",
      "Solunum": "16/dk",
      "SpO2": "%99",
      "Ateş": "37.1 °C"
    },
    "exam": [
      "Genel durum stabil; hasta uyanık, koopere ve belirgin akut toksik görünümde değil.",
      "MCP ve PIP eklemlerinde simetrik şişlik ve hassasiyet var",
      "Sabah tutukluğu 90 dakika sürüyor",
      "El bileklerinde sinovit ve hareket kısıtlılığı mevcut",
      "DIP tutulumu belirgin değil",
      "Döküntü, oral aft ve fotosensitivite saptanmıyor",
      "MCP/PIP eklemlerinde simetrik şişlik ve hassasiyet saptandı. Küçük eklem simetrisi RA için tipiktir. DIP baskın tutulum osteoartriti düşündürürdü."
    ],
    "investigations": [
      {
        "id": "rf-anti-ccp-esr-crp-25",
        "label": "RF, anti-CCP, ESR/CRP",
        "type": "lab",
        "priority": "essential",
        "summary": "Anti-CCP pozitif, RF pozitif ve inflamasyon belirteçleri yüksek bulundu.",
        "findings": [
          "Seropozitif RA güçlü şekilde desteklenir.",
          "Kristal artrit paterni daha geri plandadır."
        ],
        "rows": [
          [
            "Anti-CCP",
            "Pozitif",
            "Negatif",
            "Pozitif"
          ],
          [
            "RF",
            "Pozitif",
            "Negatif",
            "Pozitif"
          ],
          [
            "ESR/CRP",
            "Yüksek",
            "Normal",
            "Yüksek"
          ]
        ]
      },
      {
        "id": "el-bilek-grafisi-veya-ultrasonografi-25",
        "label": "El-bilek grafisi veya ultrasonografi",
        "type": "xray",
        "priority": "essential",
        "summary": "El-bilek görüntülemesinde sinovit ve erken eroziv değişiklikler izlendi.",
        "findings": [
          "Kronik inflamatuvar artrit desteklenir.",
          "Travmatik kırık saptanmadı."
        ],
        "rows": [
          [
            "USG/grafi",
            "Sinovit/erozyon",
            "Normal",
            "Patolojik"
          ],
          [
            "Kırık",
            "Yok",
            "Yok",
            "Sorun yok"
          ]
        ]
      },
      {
        "id": "dmard-oncesi-guvenlik-laboratuvari-25",
        "label": "DMARD öncesi güvenlik laboratuvarı",
        "type": "lab",
        "priority": "situational",
        "summary": "DMARD öncesi hemogram, karaciğer-böbrek testleri ve hepatit taraması istendi.",
        "findings": [
          "Tedavi güvenliği için başlangıç değerleri gerekir.",
          "Bu testler tanı koydurmaktan çok tedavi hazırlığı sağlar."
        ],
        "rows": [
          [
            "Hemogram",
            "Başlangıç için alındı",
            "Gerekli",
            "Tamamlandı"
          ],
          [
            "Hepatit taraması",
            "İstendi",
            "Tedavi öncesi",
            "Beklemede"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "Romatoid artrit",
      "options": [
        "Romatoid artrit",
        "Osteoartrit",
        "SLE artriti",
        "Gut"
      ],
      "explanation": "Olgu Romatoid artrit için klasik olan belirleyici bulguları taşır. Yanlış seçenekler benzer sistem bulguları verebilir; ancak anahtar ipuçları doğru tanıyı öne çıkarır.",
      "pearls": [
        "Simetrik küçük eklem tutulumu RA için tipiktir.",
        "Pannus destrüktif sinovyal proliferasyondur.",
        "Anti-CCP özgüllüğü yüksek bir belirteçtir."
      ],
      "nextStep": "Önce güvenlik/stabilizasyon ve zorunlu klinik-adli/immünolojik kararlar; ardından tanı doğrulama ve hedefe yönelik tedavi/izlem.",
      "answerFeedback": {
        "diagnosisMeta": "Romatoid artrit tanısını destekleyen klinik patern.",
        "whyCorrect": "Olgu Romatoid artrit için klasik olan belirleyici bulguları taşır. Yanlış seçenekler benzer sistem bulguları verebilir; ancak anahtar ipuçları doğru tanıyı öne çıkarır. Alan Feedback",
        "evidenceChain": [
          "Hasta 2 saati aşan sabah tutukluğu, MCP/PIP eklem şişliği ve simetrik ağrı ile gelir",
          "Pozitif",
          "Pozitif",
          "Erozif değişiklikler"
        ],
        "pearls": [
          "Simetrik küçük eklem tutulumu RA için tipiktir.",
          "Pannus destrüktif sinovyal proliferasyondur."
        ],
        "management": [
          "Acil güvenlik/stabilizasyon ve ön değerlendirme — Hastanın klinik/adli güvenliği sağlanır.",
          "RF istemi — İlk tanısal dayanak oluşturulur.",
          "Anti-CCP ile tanıyı güçlendirme — Ayırıcı tanı daraltılır.",
          "Hedefe yönelik tedavi, izlem veya adli bildirim — Vakanın temel yönetim basamağı tamamlanır."
        ],
        "learningOutcome": "Öğrenci, öyküdeki risk faktörlerini somut muayene ve objektif tetkik bulgularıyla birleştirerek doğru tanı/yönetim kararına ulaşmalıdır.",
        "differentials": {
          "Osteoartrit": {
            "explanation": "Osteoartrit ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Romatoid artrit lehinedir.",
            "comparisonPoints": [
              "Osteoartrit için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Romatoid artrit tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "SLE artriti": {
            "explanation": "SLE artriti ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Romatoid artrit lehinedir.",
            "comparisonPoints": [
              "SLE artriti için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Romatoid artrit tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "Gut": {
            "explanation": "Gut ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Romatoid artrit lehinedir.",
            "comparisonPoints": [
              "Gut için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Romatoid artrit tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "pediatrics-bruton-agammaglobulinemia-001",
    "branchId": "pediatrics",
    "title": "Anne antikoru azaldıktan sonra tekrarlayan enfeksiyonları başlayan bebek",
    "difficulty": "Orta · TUS düzeyi",
    "clinicalFocus": "BTK defekti, B hücre azalması, pyojenik enfeksiyon",
    "demographics": "7 aylık erkek bebek",
    "setting": "Klinik/adli değerlendirme ortamı",
    "chiefComplaint": "Tekrarlayan otitis media, sinüzit ve pnömoni",
    "stem": "Erkek bebek ilk 6 aydan sonra tekrarlayan bakteriyel solunum yolu enfeksiyonları geçirmeye başlamıştır. Serum immünoglobulinleri çok düşük, dolaşımda B hücreleri azdır; T hücre fonksiyonu korunmuştur. Anne kaynaklı antikorların azaldığı dönemde başlayan bakteriyel enfeksiyonlar humoral immün yetmezliği düşündürür. Aşı yanıtı zayıf ve tekrarlayan sinopulmoner enfeksiyon öyküsü mevcut. Antikor üretim kusuru fonksiyonel olarak gösterilir. Tekrarlayan viral enfeksiyonlardan çok bakteriyel enfeksiyonlar öndedir.",
    "vitals": {
      "TA": "84/50 mmHg",
      "Nabız": "136/dk",
      "Solunum": "32/dk",
      "SpO2": "%97",
      "Ateş": "38.4 °C"
    },
    "exam": [
      "Genel durum stabil; hasta uyanık, koopere ve belirgin akut toksik görünümde değil.",
      "Tonsiller belirgin küçük/izlenmiyor",
      "Servikal lenf nodları beklenenden az palpabl",
      "Bilateral otit bulguları ve burun akıntısı mevcut",
      "Akciğer bazallerinde kaba raller duyuluyor",
      "Döküntü veya kronik ishal bulgusu baskın değil"
    ],
    "investigations": [
      {
        "id": "serum-immunoglobulinleri-26",
        "label": "Serum immünoglobulinleri",
        "type": "lab",
        "priority": "essential",
        "summary": "IgG, IgA ve IgM düzeyleri belirgin düşük bulundu.",
        "findings": [
          "Humoral immün yetmezlik desteklenir.",
          "Anne IgG’sinin azaldığı dönem sonrası tablo belirginleşir."
        ],
        "rows": [
          [
            "IgG",
            "Düşük",
            "Yaşa uygun",
            "Düşük"
          ],
          [
            "IgA",
            "Düşük",
            "Yaşa uygun",
            "Düşük"
          ],
          [
            "IgM",
            "Düşük",
            "Yaşa uygun",
            "Düşük"
          ]
        ]
      },
      {
        "id": "b-hucre-akim-sitometrisi-26",
        "label": "B hücre akım sitometrisi",
        "type": "lab",
        "priority": "essential",
        "summary": "Akım sitometrisinde CD19+ B hücreleri belirgin azaldı.",
        "findings": [
          "B hücre maturasyon defekti Bruton agammaglobulinemisini destekler.",
          "T hücre yetmezliği baskın değildir."
        ],
        "rows": [
          [
            "CD19+ B hücre",
            "Çok düşük/yok",
            "Normal",
            "Düşük"
          ],
          [
            "T hücre sayısı",
            "Korunmuş",
            "Normal",
            "Uyumlu"
          ]
        ]
      },
      {
        "id": "btk-gen-analizi-26",
        "label": "BTK gen analizi",
        "type": "lab",
        "priority": "situational",
        "summary": "BTK gen analizi planlandı.",
        "findings": [
          "X’e bağlı kalıtım ve aile danışmanlığı için gereklidir.",
          "IVIG kararı klinik ve immünolojik bulgularla desteklenir."
        ],
        "rows": [
          [
            "BTK analizi",
            "Planlandı",
            "Gerektiğinde",
            "Beklemede"
          ]
        ]
      },
      {
        "id": "vaccine-antibody-titers",
        "label": "Aşıya özgü antikor titreleri",
        "type": "lab",
        "priority": "useful",
        "summary": "Tetanos ve pnömokok antikor titreleri koruyucu düzeyin altında saptandı.",
        "findings": [
          "Zayıf antikor yanıtı humoral immün yetmezliği destekler.",
          "T hücre aracılı ağır viral/fungal tablo baskın değildir."
        ],
        "rows": [
          [
            "Anti-tetanos IgG",
            "0.03 IU/mL",
            ">0.1 IU/mL",
            "Düşük"
          ],
          [
            "Pnömokok serotip antikorları",
            "Koruyucu değil",
            "Koruyucu",
            "Düşük"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "Bruton agammaglobulinemisi",
      "options": [
        "Bruton agammaglobulinemisi",
        "İzole IgA yetmezliği",
        "SCID",
        "CVID"
      ],
      "explanation": "Olgu X-linked agammaglobulinemi - Bruton için klasik olan belirleyici bulguları taşır. Yanlış seçenekler benzer sistem bulguları verebilir; ancak anahtar ipuçları doğru tanıyı öne çıkarır.",
      "pearls": [
        "İlk 6 ay maternal Ig nedeniyle korunabilir.",
        "Erkek bebek + rekürren pyojenik enfeksiyon + B hücre azlığı Bruton lehinedir.",
        "Tedavi IVIG replasmanıdır."
      ],
      "nextStep": "Önce güvenlik/stabilizasyon ve zorunlu klinik-adli/immünolojik kararlar; ardından tanı doğrulama ve hedefe yönelik tedavi/izlem.",
      "answerFeedback": {
        "diagnosisMeta": "X-linked agammaglobulinemi - Bruton tanısını destekleyen klinik patern. Alan Feedback",
        "whyCorrect": "Olgu X-linked agammaglobulinemi - Bruton için klasik olan belirleyici bulguları taşır. Yanlış seçenekler benzer sistem bulguları verebilir; ancak anahtar ipuçları doğru tanıyı öne çıkarır.",
        "evidenceChain": [
          "Erkek bebek ilk 6 aydan sonra tekrarlayan bakteriyel solunum yolu enfeksiyonları geçirmeye başlamıştır",
          "Çok düşük",
          "CD19+ B hücreleri düşük",
          "Yetersiz"
        ],
        "pearls": [
          "İlk 6 ay maternal Ig nedeniyle korunabilir.",
          "Erkek bebek + rekürren pyojenik enfeksiyon + B hücre azlığı Bruton lehinedir."
        ],
        "management": [
          "Acil güvenlik/stabilizasyon ve ön değerlendirme — Hastanın klinik/adli güvenliği sağlanır.",
          "IgG/IgA/IgM istemi — İlk tanısal dayanak oluşturulur.",
          "Flow sitometri ile tanıyı güçlendirme — Ayırıcı tanı daraltılır.",
          "Hedefe yönelik tedavi, izlem veya adli bildirim — Vakanın temel yönetim basamağı tamamlanır."
        ],
        "learningOutcome": "Öğrenci, öyküdeki risk faktörlerini somut muayene ve objektif tetkik bulgularıyla birleştirerek doğru tanı/yönetim kararına ulaşmalıdır.",
        "differentials": {
          "İzole IgA yetmezliği": {
            "explanation": "İzole IgA yetmezliği ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Bruton agammaglobulinemisi lehinedir.",
            "comparisonPoints": [
              "İzole IgA yetmezliği için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Bruton agammaglobulinemisi tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "SCID": {
            "explanation": "SCID ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Bruton agammaglobulinemisi lehinedir.",
            "comparisonPoints": [
              "SCID için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Bruton agammaglobulinemisi tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "CVID": {
            "explanation": "CVID ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni Bruton agammaglobulinemisi lehinedir.",
            "comparisonPoints": [
              "CVID için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri Bruton agammaglobulinemisi tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "infectious-diseases-hiv-aids-001",
    "branchId": "infectious-diseases",
    "title": "Kilo kaybı, fırsatçı enfeksiyon ve lenfopeni ile başvuru",
    "difficulty": "Orta · TUS düzeyi",
    "clinicalFocus": "CD4 T hücre kaybı, fırsatçı enfeksiyon, gp120/gp41/p24",
    "demographics": "36 yaş erkek",
    "setting": "Klinik/adli değerlendirme ortamı",
    "chiefComplaint": "Kilo kaybı, oral kandidiyazis ve kronik ateş",
    "stem": "Hasta kilo kaybı, gece terlemesi, oral kandidiyazis ve kronik diyare ile gelir. HIV Ag/Ab pozitif, viral yük yüksek, CD4 düşük saptanır. Klinik hücresel immünitenin çöküşünü gösterir.",
    "vitals": {
      "TA": "110/68 mmHg",
      "Nabız": "108/dk",
      "Solunum": "24/dk",
      "SpO2": "%90",
      "Ateş": "38.2 °C"
    },
    "exam": [
      "Genel durum stabil; hasta uyanık, koopere ve belirgin akut toksik görünümde değil.",
      "Ağız içinde yaygın beyaz plaklar kazımakla kanıyor",
      "Bilateral servikal ve aksiller lenfadenopati var",
      "Akciğerlerde bilateral ince raller duyuluyor",
      "Kilo kaybı ve gece terlemesi belirgin",
      "Meningeal irritasyon bulgusu yok"
    ],
    "investigations": [
      {
        "id": "hiv-ag-ab-testi-ve-hiv-rna-27",
        "label": "HIV Ag/Ab testi ve HIV RNA",
        "type": "lab",
        "priority": "essential",
        "summary": "HIV Ag/Ab testi reaktif, HIV RNA pozitif bulundu.",
        "findings": [
          "Aktif HIV enfeksiyonu doğrulanır.",
          "Yalancı pozitif tarama olasılığı RNA ile azalır."
        ],
        "rows": [
          [
            "HIV Ag/Ab",
            "Reaktif",
            "Non-reaktif",
            "Pozitif"
          ],
          [
            "HIV RNA",
            "Pozitif/yüksek",
            "Negatif",
            "Pozitif"
          ]
        ]
      },
      {
        "id": "cd4-t-lenfosit-sayimi-27",
        "label": "CD4 T lenfosit sayımı",
        "type": "lab",
        "priority": "essential",
        "summary": "CD4 T lenfosit sayısı belirgin düşük saptandı.",
        "findings": [
          "Fırsatçı enfeksiyon riski yüksektir.",
          "AIDS tanımına girebilecek immün baskılanma vardır."
        ],
        "rows": [
          [
            "CD4",
            "120/µL",
            ">500/µL",
            "Düşük"
          ],
          [
            "CD4 oranı",
            "Düşük",
            "Normal",
            "Düşük"
          ]
        ]
      },
      {
        "id": "firsatci-enfeksiyon-taramasi-27",
        "label": "Fırsatçı enfeksiyon taraması",
        "type": "xray",
        "priority": "useful",
        "summary": "Akciğer grafisinde bilateral interstisyel infiltrasyon izlendi.",
        "findings": [
          "Pneumocystis pnömonisi gibi fırsatçı enfeksiyonlar düşünülür.",
          "Lokal lobar pnömoni paterni baskın değildir."
        ],
        "rows": [
          [
            "Akciğer grafisi",
            "Bilateral interstisyel infiltrasyon",
            "Doğal",
            "Patolojik"
          ],
          [
            "Oksijen sat.",
            "Düşük-normal",
            ">94%",
            "İzlem"
          ]
        ]
      },
      {
        "id": "baslangic-tedavi-guvenlik-laboratuvari-27",
        "label": "ART öncesi böbrek-karaciğer ve hepatit paneli",
        "type": "lab",
        "priority": "situational",
        "summary": "ART öncesi böbrek-karaciğer fonksiyonu ve hepatit koenfeksiyon taraması istendi.",
        "findings": [
          "Tedavi seçimi ve güvenliği için gereklidir.",
          "Antiretroviral tedavi geciktirilmeden planlanmalıdır."
        ],
        "rows": [
          [
            "Kreatinin/ALT",
            "Başlangıç değeri alındı",
            "Gerekli",
            "Tamamlandı"
          ],
          [
            "HBV/HCV",
            "İstendi",
            "Tedavi öncesi",
            "Beklemede"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "HIV/AIDS",
      "options": [
        "HIV/AIDS",
        "Bruton agammaglobulinemisi",
        "İzole IgA yetmezliği",
        "SLE"
      ],
      "explanation": "Olgu HIV enfeksiyonu / AIDS için klasik olan belirleyici bulguları taşır. Yanlış seçenekler benzer sistem bulguları verebilir; ancak anahtar ipuçları doğru tanıyı öne çıkarır.",
      "pearls": [
        "HIV CD4 T hücrelerini hedefler.",
        "Düşük CD4 fırsatçı enfeksiyon riskini artırır.",
        "Viral yük tedavi yanıtında izlenir."
      ],
      "nextStep": "Önce güvenlik/stabilizasyon ve zorunlu klinik-adli/immünolojik kararlar; ardından tanı doğrulama ve hedefe yönelik tedavi/izlem.",
      "answerFeedback": {
        "diagnosisMeta": "HIV enfeksiyonu / AIDS tanısını destekleyen klinik patern.",
        "whyCorrect": "Olgu HIV enfeksiyonu / AIDS için klasik olan belirleyici bulguları taşır. Yanlış seçenekler benzer sistem bulguları verebilir; ancak anahtar ipuçları doğru tanıyı öne çıkarır. Alan Feedback",
        "evidenceChain": [
          "Hasta kilo kaybı, gece terlemesi, oral kandidiyazis ve kronik diyare ile gelir",
          "Pozitif",
          "Yüksek viral yük",
          "110/uL"
        ],
        "pearls": [
          "HIV CD4 T hücrelerini hedefler.",
          "Düşük CD4 fırsatçı enfeksiyon riskini artırır."
        ],
        "management": [
          "Acil güvenlik/stabilizasyon ve ön değerlendirme — Hastanın klinik/adli güvenliği sağlanır.",
          "HIV Ag/Ab istemi — İlk tanısal dayanak oluşturulur.",
          "HIV RNA ile tanıyı güçlendirme — Ayırıcı tanı daraltılır.",
          "Hedefe yönelik tedavi, izlem veya adli bildirim — Vakanın temel yönetim basamağı tamamlanır."
        ],
        "learningOutcome": "Öğrenci, öyküdeki risk faktörlerini somut muayene ve objektif tetkik bulgularıyla birleştirerek doğru tanı/yönetim kararına ulaşmalıdır.",
        "differentials": {
          "Bruton agammaglobulinemisi": {
            "explanation": "Bruton agammaglobulinemisi ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni HIV/AIDS lehinedir.",
            "comparisonPoints": [
              "Bruton agammaglobulinemisi için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri HIV/AIDS tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "İzole IgA yetmezliği": {
            "explanation": "İzole IgA yetmezliği ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni HIV/AIDS lehinedir.",
            "comparisonPoints": [
              "İzole IgA yetmezliği için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri HIV/AIDS tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          },
          "SLE": {
            "explanation": "SLE ayırıcı tanıda düşünülebilir; ancak zamanlama, muayene ve tetkik paterni HIV/AIDS lehinedir.",
            "comparisonPoints": [
              "SLE için beklenen baskın bulgular bu olguda ön planda değildir.",
              "Kanıt zinciri HIV/AIDS tanısını daha güçlü destekler.",
              "İlk yönetim doğru tanının aciliyetine göre planlanmalıdır."
            ]
          }
        }
      }
    }
  },
  {
    "id": "pediatrics-shaken-baby-syndrome-001",
    "branchId": "quick-case",
    "title": "Açıklanamayan morluk ve bilinç değişikliğinde çocuk istismarı yaklaşımı",
    "difficulty": "Hızlı · Adli pediatri",
    "clinicalFocus": "Çocuk istismarı şüphesinde stabilizasyon, koruma, kayıt, ilgili birimlere bildirim ve ayırıcı tanı dışlama",
    "demographics": "4 aylık erkek bebek",
    "setting": "Klinik/adli değerlendirme ortamı",
    "chiefComplaint": "Nöbet, letarji ve açıklanamayan morluklar",
    "stem": "4 aylık bebek nöbet ve letarjiyle getirilir. Bakıcı net travma öyküsü vermez; muayenede farklı yaşlarda ekimozlar ve öyküyle uyumsuz fizik bulgular vardır. Bu tablo yalnız tanısal bir problem değil, çocuk güvenliği ve yasal bildirim gerektiren tıbbi-adli bir durumdur.",
    "vitals": {
      "TA": "76/44 mmHg",
      "Nabız": "158/dk",
      "Solunum": "24/dk, düzensiz",
      "SpO2": "%94",
      "Ateş": "36.5 °C"
    },
    "exam": [
      "Genel durum kötü; bebek irritabl ve aralıklı letarjiktir, beslenmesi zayıftır.",
      "Ön fontanel hafif kabarık izlenir.",
      "Ciltte farklı yaşlarda ekimozlar görülür; açıklanan mekanizma muayene bulgularıyla uyumlu değildir.",
      "Fundoskopik değerlendirmede retinal kanama şüphesi vardır; göz hastalıkları konsültasyonu gerekir.",
      "Nörolojik muayenede bilinç dalgalanması ve nöbet sonrası letarji vardır."
    ],
    "investigations": [
      {
        "id": "kontrastsiz-beyin-bt-mr-28",
        "label": "Kontrastsız beyin BT/MR",
        "type": "ct",
        "priority": "essential",
        "summary": "Beyin görüntülemede subdural kanama izlendi.",
        "findings": [
          "İvmelenme-yavaşlama tipi travmayı destekler.",
          "Basit düşme öyküsüyle açıklanması zordur."
        ],
        "rows": [
          [
            "Beyin BT/MR",
            "Subdural kanama",
            "Yok",
            "Patolojik"
          ],
          [
            "Parankim ödemi",
            "Hafif",
            "Yok",
            "Patolojik"
          ]
        ]
      },
      {
        "id": "iskelet-survey-grafileri-28",
        "label": "İskelet survey grafileri",
        "type": "xray",
        "priority": "useful",
        "summary": "İskelet surveyde farklı iyileşme evrelerinde kostal/metafizer lezyonlar izlendi.",
        "findings": [
          "Tek seferlik kaza dışı travma ihtimalini güçlendirir.",
          "Kaza dışı travma açısından bildirim gerekir."
        ],
        "rows": [
          [
            "İskelet survey",
            "Farklı yaşta lezyonlar",
            "Yok",
            "Patolojik"
          ],
          [
            "Kostal lezyon",
            "Var",
            "Yok",
            "Patolojik"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "Bebeği stabilize ederken çocuk istismarı şüphesiyle koruma/adli bildirim ve ayrıntılı kayıt sürecini başlatmak",
      "options": [
        "Bebeği stabilize ederken çocuk istismarı şüphesiyle koruma/adli bildirim ve ayrıntılı kayıt sürecini başlatmak",
        "Bakıcı travma öyküsü vermediği için istismar olasılığını dışlamak",
        "Görüntüleme sonucu kesinleşene kadar çocuğu aynı bakım verenle taburcu etmek",
        "Önce yalnız antiepileptik verip sosyal/adli değerlendirmeyi poliklinik kontrolüne bırakmak"
      ],
      "question": "Bu durumda hekimin öncelikli sorumluluğu nedir?",
      "questionTitle": "Çocuk koruma kararı",
      "explanation": "Çocuk istismarı şüphesinde hekim önce tıbbi stabilizasyonu sağlar; ancak güvenlik, ayrıntılı kayıt, multidisipliner değerlendirme ve yasal bildirim ertelenmez. Öykü-bulgu uyumsuzluğu ve farklı yaşta ekimozlar güçlü alarm bulgularıdır.",
      "pearls": [
        "Öykü ile bulgu uyumsuzluğu istismar için kırmızı bayraktır.",
        "Çocuk güvenliği taburculuk kararından önce değerlendirilmelidir.",
        "Kanama diyatezi gibi ayırıcılar araştırılabilir; bu bildirim sorumluluğunu ortadan kaldırmaz."
      ],
      "nextStep": "Bebeği stabilize ederken çocuk istismarı şüphesiyle koruma/adli bildirim ve ayrıntılı kayıt sürecini başlatmak",
      "answerFeedback": {
        "diagnosisMeta": "Adli pediatri · çocuk istismarı şüphesi · güvenlik ve bildirim",
        "shortDiagnosisMeta": "Öğrenme çıktısı: istismar şüphesinde stabilizasyon ve bildirim birlikte yürütülür",
        "whyCorrect": "Bu seçenek bebeğin akut tıbbi güvenliğini ve çocuk koruma sorumluluğunu aynı anda karşılar; kesin tanıyı beklemek çocuğu yeniden risk altında bırakabilir.",
        "evidenceChain": [
          "Bebekte nöbet ve letarji vardır; önce stabilizasyon gerekir.",
          "Farklı yaşlarda ekimozlar ve açıklanamayan mekanizma istismar şüphesini artırır.",
          "Çocuk güvenliği ve kayıt sorumluluğu tıbbi değerlendirmenin parçasıdır."
        ],
        "pearls": [
          "Şüphe yeterlidir; kesin kanıt beklemek gerekmez.",
          "Ayrıntılı, objektif ve yargısız kayıt tutulmalıdır."
        ],
        "management": [
          "ABC ve nöbet yönetimi",
          "Çocuk koruma/adli bildirim",
          "Güvenli yatış ve multidisipliner değerlendirme"
        ],
        "learningOutcome": "Çocuk istismarı şüphesinde hekim stabilizasyon, güvenlik, kayıt ve bildirim yükümlülüklerini birlikte yürütür.",
        "differentials": {}
      }
    },
    "caseType": "quick",
    "managementSequence": {
      "enabled": false
    },
    "quickCategory": "Adli",
    "questionTitle": "Çocuk koruma kararı",
    "questionType": "forensic",
    "question": "Bu durumda hekimin öncelikli sorumluluğu nedir?"
  },
  {
    "id": "internal-medicine-sexual-assault-evidence-001",
    "branchId": "quick-case",
    "title": "Cinsel saldırı sonrası ilk tıbbi-adli yaklaşım",
    "difficulty": "Hızlı · Adli/etik",
    "clinicalFocus": "Cinsel saldırıda stabilizasyon, onam, mahremiyet, delil zinciri, gebelik/CYBE profilaksisi ve güvenli taburculuk planı",
    "demographics": "22 yaş kadın",
    "setting": "Klinik/adli değerlendirme ortamı",
    "chiefComplaint": "Saldırı sonrası ağrı, kaygı ve tıbbi değerlendirme isteği",
    "stem": "22 yaşında kadın hasta saldırıdan yaklaşık 8 saat sonra acile başvurur. Ağrı, yoğun kaygı ve ön kolda morluk tarifler; aktif kanama veya bilinç kaybı yoktur. Klinik amaç hem tıbbi güvenliği sağlamak hem de hastanın onamı ve mahremiyeti korunarak zaman duyarlı adli-tıbbi süreci doğru başlatmaktır.",
    "vitals": {
      "TA": "118/76 mmHg",
      "Nabız": "112/dk",
      "Solunum": "20/dk",
      "SpO2": "%99",
      "Ateş": "36.9 °C"
    },
    "exam": [
      "Genel durum orta; hasta kaygılı ve ağlamaklı, bilinç açık, koopere ve GKS 15.",
      "Boyun ve ön kolda farklı boyutlarda ekimozlar ile yüzeyel sıyrıklar izlenir; aktif dış kanama yoktur.",
      "Abdomen yumuşak; defans, rebound veya organ yaralanmasını düşündüren yaygın hassasiyet yoktur.",
      "Genital muayene yalnızca açık onam ve mahremiyet sağlandıktan sonra yapılmalıdır; aktif kanama veya hemodinamik instabilite izlenmez.",
      "Nörolojik muayenede fokal defisit veya akut intoksikasyon bulgusu yoktur."
    ],
    "investigations": [
      {
        "id": "gebelik-testi-sexual-assault-001",
        "label": "Gebelik testi",
        "type": "urine",
        "priority": "essential",
        "summary": "İdrar β-hCG negatif saptandı. Acil kontrasepsiyon zaman penceresi içinde planlandı.",
        "findings": [
          "Negatif sonuç mevcut gebeliği desteklemez.",
          "Saldırı sonrası gebelik riski için zamanında koruyucu yaklaşım gerekir."
        ],
        "rows": [
          [
            "İdrar β-hCG",
            "Negatif",
            "Negatif",
            "Normal"
          ],
          [
            "Son adet",
            "10 gün önce",
            "Düzenli",
            "Zamanlama uygun"
          ],
          [
            "Acil kontrasepsiyon",
            "Endike",
            "Risk yoksa gerekmez",
            "Gerekli"
          ]
        ]
      },
      {
        "id": "cybe-baslangic-paneli-001",
        "label": "CYBE başlangıç paneli",
        "type": "lab",
        "priority": "useful",
        "summary": "HIV Ag/Ab, HBsAg, anti-HCV ve sifiliz başlangıç testleri negatif geldi; profilaksi ve takip planlandı.",
        "findings": [
          "Negatif başlangıç testleri yeni bulaşı tamamen dışlamaz.",
          "HIV PEP kararı risk ve süreye göre verilir."
        ],
        "rows": [
          [
            "HIV Ag/Ab",
            "Negatif",
            "Negatif",
            "Başlangıç"
          ],
          [
            "HBsAg",
            "Negatif",
            "Negatif",
            "Başlangıç"
          ],
          [
            "Sifiliz serolojisi",
            "Negatif",
            "Negatif",
            "Başlangıç"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "Tıbbi stabilizasyonu sağlarken onam, mahremiyet, delil zinciri, profilaksi ve bildirim/kayıt sürecini başlatmak",
      "options": [
        "Tıbbi stabilizasyonu sağlarken onam, mahremiyet, delil zinciri, profilaksi ve bildirim/kayıt sürecini başlatmak",
        "Hastanın kaygısı baskın olduğu için yalnız psikiyatrik sedasyon yapıp taburcu etmek",
        "Adli süreç tamamlanana kadar tıbbi muayene ve tedaviyi ertelemek",
        "Hastanın beyanı tek başına yeterli olmadığı için kayıt ve örnekleme yapmamak"
      ],
      "question": "Bu olguda hekimin en uygun ilk tıbbi-adli yaklaşımı hangisidir?",
      "questionTitle": "Tıbbi-adli karar sorusu",
      "explanation": "Cinsel saldırı başvurusunda tıbbi stabilizasyon ve travma taraması önceliklidir; muayene ve örnekleme onam, mahremiyet ve delil zinciri korunarak yapılır. Gebelik ve CYBE profilaksisi zaman penceresinde değerlendirilir; adli süreç tıbbi bakımı geciktirmemelidir.",
      "pearls": [
        "Adli süreç tıbbi stabilizasyonu geciktirmez.",
        "Muayene ve örnekleme travma-duyarlı iletişim, mahremiyet ve onamla yürütülür.",
        "Negatif başlangıç CYBE testleri takip gereksinimini ortadan kaldırmaz."
      ],
      "nextStep": "Tıbbi stabilizasyonu sağlarken onam, mahremiyet, delil zinciri, profilaksi ve bildirim/kayıt sürecini başlatmak",
      "answerFeedback": {
        "diagnosisMeta": "Adli/etik yaklaşım · cinsel saldırı · onamlı örnekleme",
        "shortDiagnosisMeta": "Öğrenme çıktısı: cinsel saldırıda güvenli tıbbi-adli akışı kurma",
        "whyCorrect": "Bu seçenek tıbbi önceliği, hasta özerkliğini, mahremiyeti, zaman duyarlı profilaksi gereksinimini ve adli kayıt sorumluluğunu birlikte karşılar.",
        "evidenceChain": [
          "Hasta saldırıdan 8 saat sonra başvurmuştur; zaman duyarlı örnekleme ve profilaksi penceresi vardır.",
          "Aktif kanama ve bilinç kaybı olmaması stabil değerlendirme olanağı sağlar; bu durum adli kayıt gereksinimini ortadan kaldırmaz.",
          "Ekimoz ve sıyrıkların kayıt altına alınması gerekir."
        ],
        "pearls": [
          "Önce yaşamı tehdit eden yaralanma dışlanır.",
          "Adli süreç ve tıbbi bakım eş zamanlı yürütülür.",
          "Hasta güvenliği taburculuk kararının parçasıdır."
        ],
        "management": [
          "ABC ve travma taramasını yap",
          "Onam, mahremiyet ve delil zincirini sağla",
          "Gebelik/CYBE profilaksisi ve güvenli taburculuk planını düzenle"
        ],
        "learningOutcome": "Cinsel saldırı başvurusunda hekim tıbbi stabilizasyon, onamlı muayene, delil korunması, profilaksi ve güvenlik planını birlikte yürütür.",
        "differentials": {}
      }
    },
    "caseType": "quick",
    "managementSequence": {
      "enabled": false
    },
    "quickCategory": "Adli",
    "questionTitle": "Tıbbi-adli karar sorusu",
    "questionType": "forensic",
    "question": "Bu olguda hekimin en uygun ilk tıbbi-adli yaklaşımı hangisidir?"
  },
  {
    "id": "pulmonology-near-hanging-asphyxia-001",
    "branchId": "quick-case",
    "title": "Boyun basısı sonrası gecikmiş havayolu riski",
    "difficulty": "Hızlı · Acil/adli",
    "clinicalFocus": "Yakın ası/boğulma olgusunda ABC, servikal immobilizasyon, havayolu ödemi izlemi ve adli güvenlik yaklaşımı",
    "demographics": "31 yaş erkek",
    "setting": "Acil servis - resüsitasyon alanı",
    "chiefComplaint": "Boyun basısı sonrası bilinç bulanıklığı ve nefes darlığı",
    "stem": "Boyun basısı sonrası kısa süreli bilinç kaybı olan hasta acile getirilir. Ses kısıklığı, boyunda ligatür izi ve konfüzyon vardır. İlk karar tanı etiketinden çok havayolu güvenliği, servikal koruma, oksijenizasyon ve adli güvenlik sürecini doğru başlatmaktır.",
    "vitals": {
      "TA": "92/58 mmHg",
      "Nabız": "128/dk",
      "Solunum": "32/dk",
      "SpO2": "%86",
      "Ateş": "36.6 °C"
    },
    "exam": [
      "Genel durum orta-kötü; hasta konfüze ve ajitedir.",
      "Boyunda yatay ligatür izi, lokal hassasiyet ve hafif yumuşak doku şişliği izlenir.",
      "Ses kısıklığı vardır; belirgin stridor başlangıçta yoktur ancak havayolu ödemi açısından risklidir.",
      "Konjonktival peteşiler görülür.",
      "Servikal omurga hassasiyeti nedeniyle boyun hareketleri kısıtlanır ve immobilizasyon sürdürülür."
    ],
    "investigations": [
      {
        "id": "abg-near-hanging-001",
        "label": "Arter kan gazı",
        "type": "lab",
        "priority": "essential",
        "summary": "Hipoksemi, hafif respiratuvar asidoz ve laktat yüksekliği saptandı. Bulgular asfiksi sonrası doku hipoksisini destekler.",
        "findings": [
          "Oksijenizasyon bozukluğu acil havayolu kararını etkiler.",
          "Laktat yüksekliği hipoperfüzyon/hipoksi kanıtıdır."
        ],
        "rows": [
          [
            "PaO2",
            "54 mmHg",
            "80-100 mmHg",
            "Düşük"
          ],
          [
            "PaCO2",
            "50 mmHg",
            "35-45 mmHg",
            "Yüksek"
          ],
          [
            "pH",
            "7.28",
            "7.35-7.45",
            "Düşük"
          ],
          [
            "Laktat",
            "4.6 mmol/L",
            "<2 mmol/L",
            "Yüksek"
          ]
        ]
      },
      {
        "id": "boyun-bt-anjiyo-001",
        "label": "Boyun BT anjiyografi",
        "type": "ct",
        "priority": "essential",
        "summary": "Laringeal yumuşak doku ödemi izlendi; karotis/vertebral arter diseksiyonu saptanmadı.",
        "findings": [
          "Havayolu ödemi yakın izlem ve entübasyon hazırlığı gerektirir.",
          "Damar diseksiyonu izlenmemesi antikoagülasyon kararını değiştirir."
        ],
        "rows": [
          [
            "Laringeal ödem",
            "Var",
            "Yok",
            "Patolojik"
          ],
          [
            "Vasküler diseksiyon",
            "Yok",
            "Yok",
            "Dışlandı"
          ],
          [
            "Servikal kırık",
            "Yok",
            "Yok",
            "Dışlandı"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "ABC değerlendirmesi, yüksek akımlı oksijen, servikal immobilizasyon ve entübasyon hazırlığıyla yakın izlem başlatmak",
      "options": [
        "ABC değerlendirmesi, yüksek akımlı oksijen, servikal immobilizasyon ve entübasyon hazırlığıyla yakın izlem başlatmak",
        "Panik atak düşünerek kısa gözlem sonrası taburcu etmek",
        "Adli süreç tamamlanana kadar oksijen ve havayolu değerlendirmesini ertelemek",
        "Sadece boyun cilt lezyonuna pansuman yapıp poliklinik kontrolü vermek"
      ],
      "question": "Bu olguda ilk yapılması gereken en uygun yaklaşım hangisidir?",
      "questionTitle": "Acil yönetim sorusu",
      "explanation": "Boyun basısı sonrası havayolu ödemi gecikmeli kötüleşebilir. Bu nedenle ABC, oksijenizasyon, servikal immobilizasyon, entübasyon hazırlığı ve yakın izlem önceliklidir; adli süreç tıbbi müdahaleyi geciktirmez.",
      "pearls": [
        "Ses kısıklığı, stridor veya progresif boyun şişliği entübasyon eşiğini düşürür.",
        "Yakın ası/boğulma olgusunda başlangıç muayenesi iyi görünse bile gecikmiş havayolu ödemi gelişebilir.",
        "Servikal omurga ve boyun damar yaralanması seçilmiş olgularda değerlendirilir."
      ],
      "nextStep": "ABC değerlendirmesi, yüksek akımlı oksijen, servikal immobilizasyon ve entübasyon hazırlığıyla yakın izlem başlatmak",
      "answerFeedback": {
        "diagnosisMeta": "Acil/adli yaklaşım · boyun basısı · havayolu riski",
        "shortDiagnosisMeta": "Öğrenme çıktısı: boyun basısında gecikmiş havayolu riskini yönetme",
        "whyCorrect": "Mekanizma ve fizik bulgular gecikmiş havayolu riski oluşturur; en güvenli ilk yaklaşım oksijenizasyon, havayolu hazırlığı ve servikal korumadır.",
        "evidenceChain": [
          "Boyun basısı ve kısa bilinç kaybı öyküsü vardır.",
          "Ses kısıklığı ve ligatür izi havayolu/laringotrakeal risk düşündürür.",
          "Konfüzyon ve peteşi asfiksi mekanizmasını destekler."
        ],
        "pearls": [
          "Adli süreç tıbbi müdahaleyi geciktirmez.",
          "Havayolu bulguları dinamik olabilir; yakın izlem gerekir."
        ],
        "management": [
          "ABC ve oksijenizasyon",
          "Servikal immobilizasyon",
          "Entübasyon hazırlığı ve adli güvenlik bildirimi"
        ],
        "learningOutcome": "Yakın ası/boğulma olgusunda karar, tanıdan önce havayolu ve servikal güvenlik üzerinden verilir.",
        "differentials": {}
      }
    },
    "caseType": "quick",
    "managementSequence": {
      "enabled": false
    },
    "quickCategory": "Acil karar",
    "questionTitle": "Acil yönetim sorusu",
    "questionType": "next-step",
    "question": "Bu olguda ilk yapılması gereken en uygun yaklaşım hangisidir?"
  },
  {
    "id": "internal-medicine-azathioprine-tpmt-toxicity-001",
    "branchId": "internal-medicine",
    "title": "Standart doz immünsüpresan sonrası ateş ve pansitopeni gelişen hasta",
    "difficulty": "Orta · TUS düzeyi",
    "clinicalFocus": "TPMT/NUDT15 ilişkili azatioprin toksisitesi, pansitopeni ve kişiselleştirilmiş ilaç dozu",
    "demographics": "29 yaş kadın, inflamatuvar bağırsak hastalığı nedeniyle izlenen hasta",
    "setting": "Acil servis - ilaç toksisitesi değerlendirmesi",
    "chiefComplaint": "Azatioprin başlandıktan üç hafta sonra ateş, ağız yarası ve halsizlik",
    "stem": "İnflamatuvar bağırsak hastalığı için standart doz azatioprin başlanan hasta, üç hafta içinde ateş, belirgin halsizlik, oral ülser ve kolay morarma ile başvurur. Dozu önerildiği gibi kullandığını söyler; ailede benzer ilaç yanıtı öyküsü vardır. Ağır lökopeni ve trombositopeni, tiopürin metabolizmasını etkileyen farmakogenetik yatkınlığı düşündürür.",
    "vitals": {
      "TA": "96/60 mmHg",
      "Nabız": "122/dk",
      "Solunum": "22/dk",
      "SpO2": "%98",
      "Ateş": "38.7 °C"
    },
    "exam": [
      "Genel durum orta; hasta uyanık, koopere ve klinik yakınmasına uygun şekilde huzursuz görünümde.",
      "Oral mukozada ağrılı aftöz ülserler mevcut",
      "Bacaklarda yaygın ekimoz ve peteşiler izleniyor",
      "Karında peritonit bulgusu yok",
      "Akciğer oskültasyonunda belirgin odak saptanmıyor",
      "Lenfadenopati ve hepatosplenomegali belirgin değil"
    ],
    "investigations": [
      {
        "id": "cbc-azathioprine-001",
        "label": "Tam kan sayımı",
        "type": "lab",
        "priority": "essential",
        "summary": "Ağır nötropeni, anemi ve trombositopeni saptandı. Bulgular azatioprin ilişkili kemik iliği toksisitesiyle uyumludur.",
        "findings": [
          "Nötropenik ateş mortalite riski taşır.",
          "Trombositopeni kolay morarmayı açıklar."
        ],
        "rows": [
          [
            "WBC",
            "1.100/µL",
            "4.000-10.000/µL",
            "Düşük"
          ],
          [
            "Mutlak nötrofil",
            "280/µL",
            ">1500/µL",
            "Çok düşük"
          ],
          [
            "Hemoglobin",
            "9.4 g/dL",
            "12-16 g/dL",
            "Düşük"
          ],
          [
            "Trombosit",
            "42.000/µL",
            "150.000-450.000/µL",
            "Düşük"
          ]
        ]
      },
      {
        "id": "tpmt-nudt15-genotype-001",
        "label": "TPMT/NUDT15 genotipleme",
        "type": "lab",
        "priority": "essential",
        "summary": "TPMT düşük aktivite varyantı saptandı. Standart tiopürin dozu bu hastada toksik metabolit birikimine yol açmıştır.",
        "findings": [
          "Farmakogenetik sonuç beklenenden ağır toksisiteyi açıklar.",
          "Tedavi dozu ve ilaç seçimi değiştirilmelidir."
        ],
        "rows": [
          [
            "TPMT genotipi",
            "Düşük aktivite varyantı",
            "Normal aktivite",
            "Patolojik"
          ],
          [
            "NUDT15",
            "Normal",
            "Normal",
            "Normal"
          ],
          [
            "6-TGN düzeyi",
            "Yüksek",
            "Terapötik aralık",
            "Toksik"
          ]
        ]
      },
      {
        "id": "enfeksiyon-paneli-neutropenic-001",
        "label": "Kan kültürleri ve CRP",
        "type": "culture",
        "priority": "essential",
        "summary": "CRP yüksek, kan kültürleri ilk değerlendirmede üreme göstermedi.",
        "findings": [
          "Kültür sonucu beklenmeden nötropenik ateş protokolü başlatılır.",
          "Belirgin odak olmaması ağır nötropeni riskini azaltmaz."
        ],
        "rows": [
          [
            "CRP",
            "86 mg/L",
            "<5 mg/L",
            "Yüksek"
          ],
          [
            "Kan kültürü",
            "İlk 24 saatte üreme yok",
            "Üreme yok",
            "Negatif"
          ],
          [
            "Mutlak nötrofil",
            "220/mm³",
            ">1500/mm³",
            "Kritik düşük"
          ]
        ]
      },
      {
        "id": "karaciger-bobrek-azathioprine-001",
        "label": "Karaciğer ve böbrek fonksiyonları",
        "type": "lab",
        "priority": "useful",
        "summary": "Karaciğer ve böbrek fonksiyonlarında ağır yetmezlik saptanmadı; toksisite organ yetmezliğiyle açıklanmıyor.",
        "findings": [
          "Doz ayarı için organ fonksiyonları gözden geçirilir.",
          "Normal kreatinin, birikimin başlıca nedenini renal yetmezlikten uzaklaştırır."
        ],
        "rows": [
          [
            "Kreatinin",
            "0.8 mg/dL",
            "0.6-1.2 mg/dL",
            "Normal"
          ],
          [
            "ALT",
            "54 U/L",
            "<40 U/L",
            "Hafif yüksek"
          ],
          [
            "Total bilirubin",
            "0.9 mg/dL",
            "<1.2 mg/dL",
            "Normal"
          ]
        ]
      }
    ],
    "images": [],
    "diagnosis": {
      "correct": "TPMT düşük aktivitesine bağlı azatioprin toksisitesi",
      "options": [
        "TPMT düşük aktivitesine bağlı azatioprin toksisitesi",
        "IgE aracılı anafilaksi",
        "İlaç dozunu unutmaya bağlı tedavi başarısızlığı",
        "Akut viral üst solunum yolu enfeksiyonu"
      ],
      "explanation": "Standart doz azatioprin sonrası kısa sürede pansitopeni, nötropenik ateş ve TPMT düşük aktivite varyantı görülmesi farmakogenetik kaynaklı tiopürin toksisitesini destekler.",
      "pearls": [
        "TPMT veya NUDT15 düşük aktivitesi tiopürin toksisitesini artırır.",
        "Pansitopeni ve nötropenik ateş acil yönetim gerektirir.",
        "Farmakogenetik bilgi doz azaltma veya alternatif tedavi seçimini belirler."
      ],
      "nextStep": "Azatioprini kes, nötropenik ateşi ampirik geniş spektrumlu antibiyotikle yönet ve hematoloji/gastroenteroloji ile alternatif tedavi planla.",
      "answerFeedback": {
        "diagnosisMeta": "Tiopürin metabolizması · TPMT düşük aktivite · pansitopeni · nötropenik ateş",
        "whyCorrect": "Doz uyumu olmasına rağmen standart dozda ağır miyelosupresyon gelişmesi ve TPMT varyantının saptanması farmakogenetik toksisiteyi en güçlü tanı yapar.",
        "evidenceChain": [
          "Azatioprin başlanmasından sonra zaman uyumlu toksisite",
          "Ateş, oral ülser ve ekimoz",
          "Ağır nötropeni ve trombositopeni",
          "TPMT düşük aktivite varyantı ve yüksek 6-TGN düzeyi"
        ],
        "pearls": [
          "Nötropenik ateşte kültür sonucu beklenmez.",
          "Farmakogenetik testler bazı ilaçlarda önleyici güvenlik sağlar."
        ],
        "management": [
          "Azatioprini derhal kes",
          "Kan kültürü alıp nötropenik ateş protokolüne göre ampirik antibiyotik başla",
          "Kan sayımı ve kanama/enfeksiyon bulgularını yakın izle",
          "Farmakogenetik sonuca göre tiopürin dozundan kaçın veya alternatif tedavi seç"
        ],
        "learningOutcome": "Farmakogenetik vaka, soyut genetik bilgisini somut ilaç toksisitesi, laboratuvar bulgusu ve güvenli doz kararıyla klinik akıl yürütmeye çevirir.",
        "differentials": {
          "IgE aracılı anafilaksi": {
            "explanation": "Anafilakside dakikalar içinde ürtiker, bronkospazm ve hipotansiyon beklenir; bu vakada haftalar içinde pansitopeni gelişmiştir.",
            "comparisonPoints": [
              "Anafilaksi akut alerjik tablodur",
              "Pansitopeni farmakogenetik toksisite lehinedir"
            ]
          },
          "İlaç dozunu unutmaya bağlı tedavi başarısızlığı": {
            "explanation": "Doz unutma hastalık aktivitesini artırır; ağır nötropeni ve yüksek 6-TGN düzeyi beklenmez.",
            "comparisonPoints": [
              "Yüksek metabolit düzeyi toksisiteyi destekler",
              "Uyum sorunu pansitopeniyi açıklamaz"
            ]
          },
          "Akut viral üst solunum yolu enfeksiyonu": {
            "explanation": "Viral enfeksiyon ateş yapabilir; ancak ağır nötropeni, trombositopeni ve TPMT varyantı tabloyu açıklar.",
            "comparisonPoints": [
              "Viral tabloda bu düzeyde miyelosupresyon beklenmez",
              "Azatioprin ilişkili zamanlama belirleyicidir"
            ]
          }
        }
      }
    }
  },
  {
    "id": "quick-stab-wound-forensic-001",
    "branchId": "quick-case",
    "caseType": "quick",
    "quickCategory": "Adli",
    "title": "Kesici-delici yaralanmada adli bildirim kararı",
    "difficulty": "Hızlı · Adli",
    "clinicalFocus": "Kesici-delici yaralanmada tıbbi bakım ve adli bildirim birlikte yürütülür.",
    "demographics": "24 yaşında erkek",
    "setting": "Acil servis",
    "chiefComplaint": "Sağ ön kolda kesici-delici alet yarası",
    "stem": "Hasta sağ ön kolda kesici-delici alet yaralanmasıyla başvurur. Yaralanmanın kazara olduğunu söyler; ancak öykü tutarsızdır ve yara çizgisel-derindir. Bilinci açık, vital bulguları stabildir; aktif arteriyel kanama tariflenmez.",
    "vitals": {
      "TA": "122/78 mmHg",
      "Nabız": "88/dk",
      "Solunum": "16/dk",
      "SpO2": "%99",
      "Ateş": "36.6 °C"
    },
    "exam": [
      "Sağ ön kolda yaklaşık 4 cm uzunluğunda kesici-delici alet yarası izlenir.",
      "Distal nabızlar alınır, kapiller dolum normaldir.",
      "Duyu ve motor muayene korunmuştur; belirgin tendon kesisi bulgusu yoktur.",
      "Aktif arteriyel kanama veya hemodinamik instabilite saptanmaz."
    ],
    "investigations": [],
    "images": [],
    "managementSequence": {
      "enabled": false
    },
    "questionTitle": "Tıbbi-adli yaklaşım",
    "question": "Bu durumda hekimin en uygun yaklaşımı nedir?",
    "questionType": "forensic",
    "diagnosis": {
      "correct": "Tıbbi müdahaleyi yaparken adli olgu bildirimi ve uygun kayıt işlemlerini başlatmak",
      "options": [
        "Tıbbi müdahaleyi yaparken adli olgu bildirimi ve uygun kayıt işlemlerini başlatmak",
        "Yalnızca yara bakımını yapıp hastayı taburcu etmek",
        "Hastanın beyanını esas alarak adli bildirim yapmamak",
        "Adli süreç tamamlanana kadar tıbbi müdahaleyi ertelemek"
      ],
      "question": "Bu durumda hekimin en uygun yaklaşımı nedir?",
      "questionTitle": "Tıbbi-adli yaklaşım",
      "explanation": "Kesici-delici alet yaralanmaları adli olgu niteliği taşıyabilir. Hekim önce tıbbi stabilizasyonu ve yara bakımını sağlar; eş zamanlı olarak objektif kayıt ve adli bildirim yükümlülüğünü yerine getirir.",
      "pearls": [
        "Adli süreç tıbbi müdahaleyi geciktirmez.",
        "Yara lokalizasyonu, boyutu, nörovasküler durum ve hastanın beyanı objektif kaydedilmelidir."
      ],
      "nextStep": "Tıbbi müdahaleyi yaparken adli olgu bildirimi ve uygun kayıt işlemlerini başlatmak",
      "answerFeedback": {
        "diagnosisMeta": "Adli",
        "shortDiagnosisMeta": "Kesici-delici yaralanmada tıbbi bakım ve adli bildirim birlikte yürütülür.",
        "whyCorrect": "Kesici-delici alet yaralanmaları adli olgu niteliği taşıyabilir. Hekim önce tıbbi stabilizasyonu ve yara bakımını sağlar; eş zamanlı olarak objektif kayıt ve adli bildirim yükümlülüğünü yerine getirir.",
        "evidenceChain": [
          "Hasta sağ ön kolda kesici-delici alet yaralanmasıyla başvurur. Yaralanmanın kazara olduğunu söyler; ancak öykü tutarsızdır ve yara çizgisel-derindir. Bilinci açık, vital bulguları stabildir; aktif arteriyel kanama tariflenmez.",
          "Sağ ön kolda yaklaşık 4 cm uzunluğunda kesici-delici alet yarası izlenir.",
          "Distal nabızlar alınır, kapiller dolum normaldir."
        ],
        "pearls": [
          "Adli süreç tıbbi müdahaleyi geciktirmez.",
          "Yara lokalizasyonu, boyutu, nörovasküler durum ve hastanın beyanı objektif kaydedilmelidir."
        ],
        "management": [
          "Tıbbi müdahaleyi yaparken adli olgu bildirimi ve uygun kayıt işlemlerini başlatmak",
          "Kesici-delici yaralanmada tıbbi bakım ve adli bildirim birlikte yürütülür."
        ],
        "learningOutcome": "Kesici-delici yaralanmada tıbbi bakım ve adli bildirim birlikte yürütülür.",
        "differentials": {
          "Yalnızca yara bakımını yapıp hastayı taburcu etmek": {
            "explanation": "Yalnızca yara bakımını yapıp hastayı taburcu etmek bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Tıbbi müdahaleyi yaparken adli olgu bildirimi ve uygun kayıt işlemlerini başlatmak seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          },
          "Hastanın beyanını esas alarak adli bildirim yapmamak": {
            "explanation": "Hastanın beyanını esas alarak adli bildirim yapmamak bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Tıbbi müdahaleyi yaparken adli olgu bildirimi ve uygun kayıt işlemlerini başlatmak seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          },
          "Adli süreç tamamlanana kadar tıbbi müdahaleyi ertelemek": {
            "explanation": "Adli süreç tamamlanana kadar tıbbi müdahaleyi ertelemek bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Tıbbi müdahaleyi yaparken adli olgu bildirimi ve uygun kayıt işlemlerini başlatmak seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "quick-domestic-violence-001",
    "branchId": "quick-case",
    "caseType": "quick",
    "quickCategory": "Adli",
    "title": "Aile içi şiddet şüphesinde güvenlik ve kayıt yaklaşımı",
    "difficulty": "Hızlı · Adli",
    "clinicalFocus": "Şiddet şüphesinde hekim tıbbi değerlendirme, güvenlik planı ve kayıt sorumluluğunu birlikte ele alır.",
    "demographics": "34 yaşında kadın",
    "setting": "Acil servis",
    "chiefComplaint": "Yüz ve kol bölgesinde morluklar",
    "stem": "Hasta merdivenden düştüğünü söyler; ancak ekimozların yerleşimi ve farklı yaşta olması öyküyle uyumlu değildir. Yanındaki kişi tüm soruları hastanın yerine yanıtlamaya çalışır. Hasta yalnız kalınca evde güvende olmadığını ima eder.",
    "vitals": {
      "TA": "126/82 mmHg",
      "Nabız": "96/dk",
      "Solunum": "18/dk",
      "SpO2": "%98",
      "Ateş": "36.8 °C"
    },
    "exam": [
      "Yüz, üst kol ve ön kolda farklı renklerde ekimozlar görülür.",
      "Sol zigomatik bölgede hassasiyet vardır; aktif kanama yoktur.",
      "Bilinç açık, oryantasyon tamdır.",
      "Karın muayenesinde defans veya rebound yoktur."
    ],
    "investigations": [],
    "images": [],
    "managementSequence": {
      "enabled": false
    },
    "questionTitle": "Güvenlik kararı",
    "question": "Hastanın güvenliği ve tıbbi-adli süreç açısından en doğru adım hangisidir?",
    "questionType": "forensic",
    "diagnosis": {
      "correct": "Hastayı güvenli ve mahrem ortamda tek başına değerlendirmek, yaralanmaları objektif kaydetmek ve gerekli destek/bildirim sürecini başlatmak",
      "options": [
        "Hastayı güvenli ve mahrem ortamda tek başına değerlendirmek, yaralanmaları objektif kaydetmek ve gerekli destek/bildirim sürecini başlatmak",
        "Eşlik eden kişinin anlatımını yeterli kabul edip hastayı taburcu etmek",
        "Hasta açıkça şikâyetçi olmadıkça hiçbir kayıt tutmamak",
        "Yalnız analjezik verip sosyal risk değerlendirmesini yapmamak"
      ],
      "question": "Hastanın güvenliği ve tıbbi-adli süreç açısından en doğru adım hangisidir?",
      "questionTitle": "Güvenlik kararı",
      "explanation": "Aile içi şiddet şüphesinde mahrem görüşme, güvenlik değerlendirmesi, objektif kayıt ve ilgili destek mekanizmalarına yönlendirme temel basamaktır. Hastanın güvenliği klinik yönetimin parçasıdır.",
      "pearls": [
        "Öykü-bulgu uyumsuzluğu şiddet açısından kırmızı bayraktır.",
        "Mahrem görüşme yapılmadan güvenilir öykü alınamayabilir."
      ],
      "nextStep": "Hastayı güvenli ve mahrem ortamda tek başına değerlendirmek, yaralanmaları objektif kaydetmek ve gerekli destek/bildirim sürecini başlatmak",
      "answerFeedback": {
        "diagnosisMeta": "Adli",
        "shortDiagnosisMeta": "Şiddet şüphesinde hekim tıbbi değerlendirme, güvenlik planı ve kayıt sorumluluğunu birlikte ele alır.",
        "whyCorrect": "Aile içi şiddet şüphesinde mahrem görüşme, güvenlik değerlendirmesi, objektif kayıt ve ilgili destek mekanizmalarına yönlendirme temel basamaktır. Hastanın güvenliği klinik yönetimin parçasıdır.",
        "evidenceChain": [
          "Hasta merdivenden düştüğünü söyler; ancak ekimozların yerleşimi ve farklı yaşta olması öyküyle uyumlu değildir. Yanındaki kişi tüm soruları hastanın yerine yanıtlamaya çalışır. Hasta yalnız kalınca evde güvende olmadığını ima eder.",
          "Yüz, üst kol ve ön kolda farklı renklerde ekimozlar görülür.",
          "Sol zigomatik bölgede hassasiyet vardır; aktif kanama yoktur."
        ],
        "pearls": [
          "Öykü-bulgu uyumsuzluğu şiddet açısından kırmızı bayraktır.",
          "Mahrem görüşme yapılmadan güvenilir öykü alınamayabilir."
        ],
        "management": [
          "Hastayı güvenli ve mahrem ortamda tek başına değerlendirmek, yaralanmaları objektif kaydetmek ve gerekli destek/bildirim sürecini başlatmak",
          "Şiddet şüphesinde hekim tıbbi değerlendirme, güvenlik planı ve kayıt sorumluluğunu birlikte ele alır."
        ],
        "learningOutcome": "Şiddet şüphesinde hekim tıbbi değerlendirme, güvenlik planı ve kayıt sorumluluğunu birlikte ele alır.",
        "differentials": {
          "Eşlik eden kişinin anlatımını yeterli kabul edip hastayı taburcu etmek": {
            "explanation": "Eşlik eden kişinin anlatımını yeterli kabul edip hastayı taburcu etmek bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Hastayı güvenli ve mahrem ortamda tek başına değerlendirmek, yaralanmaları objektif kaydetmek ve gerekli destek/bildirim sürecini başlatmak seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          },
          "Hasta açıkça şikâyetçi olmadıkça hiçbir kayıt tutmamak": {
            "explanation": "Hasta açıkça şikâyetçi olmadıkça hiçbir kayıt tutmamak bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Hastayı güvenli ve mahrem ortamda tek başına değerlendirmek, yaralanmaları objektif kaydetmek ve gerekli destek/bildirim sürecini başlatmak seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          },
          "Yalnız analjezik verip sosyal risk değerlendirmesini yapmamak": {
            "explanation": "Yalnız analjezik verip sosyal risk değerlendirmesini yapmamak bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Hastayı güvenli ve mahrem ortamda tek başına değerlendirmek, yaralanmaları objektif kaydetmek ve gerekli destek/bildirim sürecini başlatmak seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "quick-unconscious-consent-001",
    "branchId": "quick-case",
    "caseType": "quick",
    "quickCategory": "Etik",
    "title": "Bilinci kapalı hastada acil müdahale ve onam",
    "difficulty": "Hızlı · Etik",
    "clinicalFocus": "Bilinci kapalı acil hastada varsayılan onamla hayat kurtarıcı müdahale yapılır.",
    "demographics": "62 yaşında erkek",
    "setting": "Acil servis",
    "chiefComplaint": "Bilinç kaybı ve solunum sıkıntısı",
    "stem": "Hasta bilinç kapalı ve solunum eforu artmış halde acile getirilir. Yakınlarına ulaşılamaz. Klinik tablo havayolu güvenliği açısından acil müdahale gerektirir.",
    "vitals": {
      "TA": "92/58 mmHg",
      "Nabız": "118/dk",
      "Solunum": "8/dk, yüzeyel",
      "SpO2": "%84",
      "Ateş": "36.4 °C"
    },
    "exam": [
      "Bilinç kapalıdır; ağrılı uyaranla inleme yanıtı vardır.",
      "Solunum yüzeyel ve yetersizdir; siyanoz eğilimi izlenir.",
      "Havayolu koruyucu refleksleri zayıftır.",
      "Periferik nabızlar hızlı ve zayıf alınır."
    ],
    "investigations": [],
    "images": [],
    "managementSequence": {
      "enabled": false
    },
    "questionTitle": "Etik/acil karar",
    "question": "Bu durumda hekimin en uygun etik ve klinik yaklaşımı nedir?",
    "questionType": "ethics",
    "diagnosis": {
      "correct": "Varsayılan onam ilkesiyle hayat kurtarıcı acil müdahaleyi başlatmak",
      "options": [
        "Varsayılan onam ilkesiyle hayat kurtarıcı acil müdahaleyi başlatmak",
        "Yakın onamı gelene kadar havayolu müdahalesini ertelemek",
        "Hastanın bilinci kapalı olduğu için hiçbir işlem yapmamak",
        "Sadece gözlem yapıp spontan düzelmeyi beklemek"
      ],
      "question": "Bu durumda hekimin en uygun etik ve klinik yaklaşımı nedir?",
      "questionTitle": "Etik/acil karar",
      "explanation": "Hayatı tehdit eden acil durumda hasta onam veremiyor ve yakınlarına ulaşılamıyorsa varsayılan onam kabul edilir. Hekim gerekli hayat kurtarıcı müdahaleyi geciktirmeden yapar.",
      "pearls": [
        "Acil ve hayatı tehdit eden durumda onam yokluğu tedaviyi geciktirmez.",
        "Müdahale tıbbi gereklilikle sınırlı ve kayıt altına alınmış olmalıdır."
      ],
      "nextStep": "Varsayılan onam ilkesiyle hayat kurtarıcı acil müdahaleyi başlatmak",
      "answerFeedback": {
        "diagnosisMeta": "Etik",
        "shortDiagnosisMeta": "Bilinci kapalı acil hastada varsayılan onamla hayat kurtarıcı müdahale yapılır.",
        "whyCorrect": "Hayatı tehdit eden acil durumda hasta onam veremiyor ve yakınlarına ulaşılamıyorsa varsayılan onam kabul edilir. Hekim gerekli hayat kurtarıcı müdahaleyi geciktirmeden yapar.",
        "evidenceChain": [
          "Hasta bilinç kapalı ve solunum eforu artmış halde acile getirilir. Yakınlarına ulaşılamaz. Klinik tablo havayolu güvenliği açısından acil müdahale gerektirir.",
          "Bilinç kapalıdır; ağrılı uyaranla inleme yanıtı vardır.",
          "Solunum yüzeyel ve yetersizdir; siyanoz eğilimi izlenir."
        ],
        "pearls": [
          "Acil ve hayatı tehdit eden durumda onam yokluğu tedaviyi geciktirmez.",
          "Müdahale tıbbi gereklilikle sınırlı ve kayıt altına alınmış olmalıdır."
        ],
        "management": [
          "Varsayılan onam ilkesiyle hayat kurtarıcı acil müdahaleyi başlatmak",
          "Bilinci kapalı acil hastada varsayılan onamla hayat kurtarıcı müdahale yapılır."
        ],
        "learningOutcome": "Bilinci kapalı acil hastada varsayılan onamla hayat kurtarıcı müdahale yapılır.",
        "differentials": {
          "Yakın onamı gelene kadar havayolu müdahalesini ertelemek": {
            "explanation": "Yakın onamı gelene kadar havayolu müdahalesini ertelemek bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Varsayılan onam ilkesiyle hayat kurtarıcı acil müdahaleyi başlatmak seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          },
          "Hastanın bilinci kapalı olduğu için hiçbir işlem yapmamak": {
            "explanation": "Hastanın bilinci kapalı olduğu için hiçbir işlem yapmamak bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Varsayılan onam ilkesiyle hayat kurtarıcı acil müdahaleyi başlatmak seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          },
          "Sadece gözlem yapıp spontan düzelmeyi beklemek": {
            "explanation": "Sadece gözlem yapıp spontan düzelmeyi beklemek bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Varsayılan onam ilkesiyle hayat kurtarıcı acil müdahaleyi başlatmak seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "quick-urticaria-angioedema-001",
    "branchId": "quick-case",
    "caseType": "quick",
    "quickCategory": "Klinik spot",
    "title": "Ani başlayan ürtiker ve hafif anjiyoödem",
    "difficulty": "Hızlı · Klinik spot",
    "clinicalFocus": "Ürtiker ile anafilaksi ayrımı solunum, dolaşım ve çoklu sistem tutulumu üzerinden yapılır.",
    "demographics": "19 yaşında kadın",
    "setting": "Acil servis",
    "chiefComplaint": "Yaygın kaşıntı ve dudakta şişlik",
    "stem": "Hasta fıstık içeren tatlı yedikten 20 dakika sonra yaygın kaşıntı, dudakta hafif şişlik ve gövdede kabarıklık gelişmesiyle başvurur. Nefes darlığı, bayılma veya karın ağrısı tariflemez.",
    "vitals": {
      "TA": "118/74 mmHg",
      "Nabız": "88/dk",
      "Solunum": "16/dk",
      "SpO2": "%99",
      "Ateş": "36.7 °C"
    },
    "exam": [
      "Genel durum iyi, bilinç açık ve konuşması rahattır.",
      "Gövde ve üst ekstremitelerde yaygın ürtikeryal plaklar izlenir.",
      "Dudaklarda hafif anjiyoödem vardır.",
      "Stridor, wheezing, hipotansiyon veya bilinç değişikliği saptanmaz."
    ],
    "investigations": [],
    "images": [],
    "managementSequence": {
      "enabled": false
    },
    "questionTitle": "İlk yaklaşım",
    "question": "Bu olguda en uygun ilk yaklaşım hangisidir?",
    "questionType": "management",
    "diagnosis": {
      "correct": "Oral antihistaminik ve yakın klinik izlem",
      "options": [
        "Oral antihistaminik ve yakın klinik izlem",
        "Hemen entübasyon",
        "Geniş spektrumlu antibiyotik",
        "Acil trombolitik tedavi"
      ],
      "question": "Bu olguda en uygun ilk yaklaşım hangisidir?",
      "questionTitle": "İlk yaklaşım",
      "explanation": "Tek sistemle sınırlı ürtiker ve hafif anjiyoödemde, solunum/dolaşım tutulumu yoksa antihistaminik ve izlem uygundur. Anafilaksi bulgusu gelişirse intramüsküler adrenalin öncelik kazanır.",
      "pearls": [
        "Hipotansiyon, wheezing, stridor veya çoklu sistem tutulumu varsa anafilaksi düşün ve IM adrenalin ver.",
        "Hafif izole ürtikerde gereksiz antibiyotik veya trombolitik yeri yoktur."
      ],
      "nextStep": "Oral antihistaminik ve yakın klinik izlem",
      "answerFeedback": {
        "diagnosisMeta": "Klinik spot",
        "shortDiagnosisMeta": "Ürtiker ile anafilaksi ayrımı solunum, dolaşım ve çoklu sistem tutulumu üzerinden yapılır.",
        "whyCorrect": "Tek sistemle sınırlı ürtiker ve hafif anjiyoödemde, solunum/dolaşım tutulumu yoksa antihistaminik ve izlem uygundur. Anafilaksi bulgusu gelişirse intramüsküler adrenalin öncelik kazanır.",
        "evidenceChain": [
          "Hasta fıstık içeren tatlı yedikten 20 dakika sonra yaygın kaşıntı, dudakta hafif şişlik ve gövdede kabarıklık gelişmesiyle başvurur. Nefes darlığı, bayılma veya karın ağrısı tariflemez.",
          "Genel durum iyi, bilinç açık ve konuşması rahattır.",
          "Gövde ve üst ekstremitelerde yaygın ürtikeryal plaklar izlenir."
        ],
        "pearls": [
          "Hipotansiyon, wheezing, stridor veya çoklu sistem tutulumu varsa anafilaksi düşün ve IM adrenalin ver.",
          "Hafif izole ürtikerde gereksiz antibiyotik veya trombolitik yeri yoktur."
        ],
        "management": [
          "Oral antihistaminik ve yakın klinik izlem",
          "Ürtiker ile anafilaksi ayrımı solunum, dolaşım ve çoklu sistem tutulumu üzerinden yapılır."
        ],
        "learningOutcome": "Ürtiker ile anafilaksi ayrımı solunum, dolaşım ve çoklu sistem tutulumu üzerinden yapılır.",
        "differentials": {
          "Hemen entübasyon": {
            "explanation": "Hemen entübasyon bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Oral antihistaminik ve yakın klinik izlem seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          },
          "Geniş spektrumlu antibiyotik": {
            "explanation": "Geniş spektrumlu antibiyotik bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Oral antihistaminik ve yakın klinik izlem seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          },
          "Acil trombolitik tedavi": {
            "explanation": "Acil trombolitik tedavi bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Oral antihistaminik ve yakın klinik izlem seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "quick-scarlet-fever-001",
    "branchId": "quick-case",
    "caseType": "quick",
    "quickCategory": "TUS spot",
    "title": "Ateşli çocukta zımpara kağıdı döküntüsü",
    "difficulty": "Hızlı · TUS spot",
    "clinicalFocus": "Kızıl hastalığının klasik döküntü paternini ve etkenini tanımak.",
    "demographics": "5 yaşında çocuk",
    "setting": "Çocuk acil",
    "chiefComplaint": "Ateş, boğaz ağrısı ve döküntü",
    "stem": "Çocuk 3 gündür ateş ve boğaz ağrısı sonrası gövdeden başlayan ince döküntü nedeniyle getirilir. Aile döküntünün dokunmakla pütürlü olduğunu söyler.",
    "vitals": {
      "TA": "Yaşa uygun",
      "Nabız": "112/dk",
      "Solunum": "22/dk",
      "SpO2": "%99",
      "Ateş": "38.7 °C"
    },
    "exam": [
      "Tonsiller hiperemi ve eksüda izlenir.",
      "Çilek dili görünümü vardır.",
      "Aksiller ve inguinal bölgelerde Pastia çizgileri seçilir.",
      "Döküntü zımpara kağıdı hissindedir."
    ],
    "investigations": [],
    "images": [],
    "managementSequence": {
      "enabled": false
    },
    "questionTitle": "TUS spot sorusu",
    "question": "Bu klinik tabloyu en iyi açıklayan etken hangisidir?",
    "questionType": "spot",
    "diagnosis": {
      "correct": "Streptococcus pyogenes",
      "options": [
        "Streptococcus pyogenes",
        "Parvovirus B19",
        "Varicella-zoster virus",
        "Measles virus"
      ],
      "question": "Bu klinik tabloyu en iyi açıklayan etken hangisidir?",
      "questionTitle": "TUS spot sorusu",
      "explanation": "Ateş, tonsillofarenjit, çilek dili, Pastia çizgileri ve zımpara kağıdı döküntüsü kızıl hastalığı düşündürür; etken A grubu beta-hemolitik Streptococcus pyogenes’tir.",
      "pearls": [
        "Kızılda Pastia çizgileri, çilek dili ve zımpara kağıdı döküntüsü ayırt ettiricidir.",
        "Tedavi komplikasyonları azaltmak için beta-laktam temellidir."
      ],
      "nextStep": "Streptococcus pyogenes",
      "answerFeedback": {
        "diagnosisMeta": "TUS spot",
        "shortDiagnosisMeta": "Kızıl hastalığının klasik döküntü paternini ve etkenini tanımak.",
        "whyCorrect": "Ateş, tonsillofarenjit, çilek dili, Pastia çizgileri ve zımpara kağıdı döküntüsü kızıl hastalığı düşündürür; etken A grubu beta-hemolitik Streptococcus pyogenes’tir.",
        "evidenceChain": [
          "Çocuk 3 gündür ateş ve boğaz ağrısı sonrası gövdeden başlayan ince döküntü nedeniyle getirilir. Aile döküntünün dokunmakla pütürlü olduğunu söyler.",
          "Tonsiller hiperemi ve eksüda izlenir.",
          "Çilek dili görünümü vardır."
        ],
        "pearls": [
          "Kızılda Pastia çizgileri, çilek dili ve zımpara kağıdı döküntüsü ayırt ettiricidir.",
          "Tedavi komplikasyonları azaltmak için beta-laktam temellidir."
        ],
        "management": [
          "Streptococcus pyogenes",
          "Kızıl hastalığının klasik döküntü paternini ve etkenini tanımak."
        ],
        "learningOutcome": "Kızıl hastalığının klasik döküntü paternini ve etkenini tanımak.",
        "differentials": {
          "Parvovirus B19": {
            "explanation": "Parvovirus B19 bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Streptococcus pyogenes seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          },
          "Varicella-zoster virus": {
            "explanation": "Varicella-zoster virus bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Streptococcus pyogenes seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          },
          "Measles virus": {
            "explanation": "Measles virus bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Streptococcus pyogenes seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "quick-needle-stick-exposure-001",
    "branchId": "quick-case",
    "caseType": "quick",
    "quickCategory": "Yönetim",
    "title": "Sağlık çalışanında iğne batması sonrası ilk yaklaşım",
    "difficulty": "Hızlı · Yönetim",
    "clinicalFocus": "Kesici-delici mesleki maruziyette yara bakımı, kayıt, seroloji ve profilaksi kararını basamaklandırmak.",
    "demographics": "27 yaşında intörn hekim",
    "setting": "Hastane acili",
    "chiefComplaint": "Kanlı iğne batması",
    "stem": "Hekim kan alma sonrası kullanılan iğnenin eldiveni delerek parmağına battığını söyler. Kaynak hastanın HIV/HBV/HCV durumu bilinmemektedir. Olay dakikalar önce olmuştur.",
    "vitals": {
      "TA": "Stabil",
      "Nabız": "Stabil",
      "Solunum": "Stabil",
      "SpO2": "Normal",
      "Ateş": "Ateş yok"
    },
    "exam": [
      "Parmak ucunda yüzeyel ponksiyon alanı vardır.",
      "Aktif kanama minimaldir.",
      "Motor ve duyu muayenesi normaldir.",
      "Yaygın doku kaybı veya derin tendon yaralanması bulgusu yoktur."
    ],
    "investigations": [
      {
        "id": "source-and-baseline-serology-quick",
        "label": "Kaynak ve başlangıç serolojisi",
        "type": "lab",
        "priority": "essential",
        "summary": "Kaynak hastadan HIV Ag/Ab, HBsAg ve anti-HCV; sağlık çalışanından başlangıç serolojileri istenir. Sonuçlar profilaksi ve takip planını belirler.",
        "rows": [
          [
            "Kaynak HIV Ag/Ab",
            "Acil çalışılıyor",
            "Negatif",
            "Risk değerlendirmesi"
          ],
          [
            "Kaynak HBsAg",
            "Acil çalışılıyor",
            "Negatif",
            "Risk değerlendirmesi"
          ],
          [
            "Çalışan anti-HBs",
            "Bilinmiyor",
            ">10 mIU/mL",
            "Bağışıklık değerlendirilecek"
          ]
        ]
      }
    ],
    "images": [],
    "managementSequence": {
      "enabled": false
    },
    "questionTitle": "Maruziyet yönetimi",
    "question": "Bu durumda en uygun ilk yaklaşım hangisidir?",
    "questionType": "management",
    "diagnosis": {
      "correct": "Yarayı su-sabunla temizleyip olayı kaydetmek, kaynak/çalışan serolojisini almak ve HIV PEP gereksinimini hemen değerlendirmek",
      "options": [
        "Yarayı su-sabunla temizleyip olayı kaydetmek, kaynak/çalışan serolojisini almak ve HIV PEP gereksinimini hemen değerlendirmek",
        "Yarayı kuvvetle sıkarak kanatmak ve başka işlem yapmamak",
        "Kaynak serolojileri sonuçlanana kadar tüm profilaksileri mutlaka ertelemek",
        "İğne batması küçük olduğu için kayıt ve takip yapmamak"
      ],
      "question": "Bu durumda en uygun ilk yaklaşım hangisidir?",
      "questionTitle": "Maruziyet yönetimi",
      "explanation": "İğne batmasında yara temizliği, olay kaydı, kaynak ve çalışan başlangıç serolojileri ile HIV/HBV/HCV risk değerlendirmesi yapılır. HIV PEP yüksek riskte gecikmeden değerlendirilmelidir.",
      "pearls": [
        "İğne batmasında yarayı travmatize edecek şekilde sıkmak önerilmez.",
        "HBV yaklaşımı çalışanın bağışıklık durumuna göre değişir."
      ],
      "nextStep": "Yarayı su-sabunla temizleyip olayı kaydetmek, kaynak/çalışan serolojisini almak ve HIV PEP gereksinimini hemen değerlendirmek",
      "answerFeedback": {
        "diagnosisMeta": "Yönetim",
        "shortDiagnosisMeta": "Kesici-delici mesleki maruziyette yara bakımı, kayıt, seroloji ve profilaksi kararını basamaklandırmak.",
        "whyCorrect": "İğne batmasında yara temizliği, olay kaydı, kaynak ve çalışan başlangıç serolojileri ile HIV/HBV/HCV risk değerlendirmesi yapılır. HIV PEP yüksek riskte gecikmeden değerlendirilmelidir.",
        "evidenceChain": [
          "Hekim kan alma sonrası kullanılan iğnenin eldiveni delerek parmağına battığını söyler. Kaynak hastanın HIV/HBV/HCV durumu bilinmemektedir. Olay dakikalar önce olmuştur.",
          "Parmak ucunda yüzeyel ponksiyon alanı vardır.",
          "Aktif kanama minimaldir."
        ],
        "pearls": [
          "İğne batmasında yarayı travmatize edecek şekilde sıkmak önerilmez.",
          "HBV yaklaşımı çalışanın bağışıklık durumuna göre değişir."
        ],
        "management": [
          "Yarayı su-sabunla temizleyip olayı kaydetmek, kaynak/çalışan serolojisini almak ve HIV PEP gereksinimini hemen değerlendirmek",
          "Kesici-delici mesleki maruziyette yara bakımı, kayıt, seroloji ve profilaksi kararını basamaklandırmak."
        ],
        "learningOutcome": "Kesici-delici mesleki maruziyette yara bakımı, kayıt, seroloji ve profilaksi kararını basamaklandırmak.",
        "differentials": {
          "Yarayı kuvvetle sıkarak kanatmak ve başka işlem yapmamak": {
            "explanation": "Yarayı kuvvetle sıkarak kanatmak ve başka işlem yapmamak bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Yarayı su-sabunla temizleyip olayı kaydetmek, kaynak/çalışan serolojisini almak ve HIV PEP gereksinimini hemen değerlendirmek seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          },
          "Kaynak serolojileri sonuçlanana kadar tüm profilaksileri mutlaka ertelemek": {
            "explanation": "Kaynak serolojileri sonuçlanana kadar tüm profilaksileri mutlaka ertelemek bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Yarayı su-sabunla temizleyip olayı kaydetmek, kaynak/çalışan serolojisini almak ve HIV PEP gereksinimini hemen değerlendirmek seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          },
          "İğne batması küçük olduğu için kayıt ve takip yapmamak": {
            "explanation": "İğne batması küçük olduğu için kayıt ve takip yapmamak bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Yarayı su-sabunla temizleyip olayı kaydetmek, kaynak/çalışan serolojisini almak ve HIV PEP gereksinimini hemen değerlendirmek seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "quick-carbon-monoxide-001",
    "branchId": "quick-case",
    "caseType": "quick",
    "quickCategory": "Acil karar",
    "title": "Soba sonrası baş ağrısı ve kiraz kırmızısı olmayan hipoksi şüphesi",
    "difficulty": "Hızlı · Acil karar",
    "clinicalFocus": "CO zehirlenmesinde nabız oksimetresine güvenmeden oksijen tedavisine başlama kararını vermek.",
    "demographics": "31 yaşında kadın",
    "setting": "Acil servis",
    "chiefComplaint": "Baş ağrısı, bulantı ve sersemlik",
    "stem": "Hasta kapalı ortamda soba yandıktan sonra baş ağrısı, bulantı ve sersemlik geliştiğini söyler. Aynı evdeki iki kişide de benzer yakınmalar vardır. Oda havasında nabız oksimetresi normal sınıra yakın görünmektedir.",
    "vitals": {
      "TA": "124/78 mmHg",
      "Nabız": "102/dk",
      "Solunum": "18/dk",
      "SpO2": "%98",
      "Ateş": "36.5 °C"
    },
    "exam": [
      "Bilinç açık ancak hasta halsiz ve sersem görünür.",
      "Deri rengi olağan; kiraz kırmızısı görünüm belirgin değildir.",
      "Nörolojik muayenede lateralizan defisit yoktur.",
      "Akciğer oskültasyonunda belirgin ral veya wheezing duyulmaz."
    ],
    "investigations": [
      {
        "id": "co-oximetry-quick",
        "label": "Ko-oksimetri",
        "type": "lab",
        "priority": "essential",
        "summary": "Karboksihemoglobin %18 saptandı; bulgu karbonmonoksit maruziyetini destekler.",
        "rows": [
          [
            "Karboksihemoglobin",
            "%18",
            "<%3",
            "Yüksek"
          ],
          [
            "Laktat",
            "2.1 mmol/L",
            "<2 mmol/L",
            "Sınırda"
          ]
        ]
      }
    ],
    "images": [],
    "managementSequence": {
      "enabled": false
    },
    "questionTitle": "Acil ilk tedavi",
    "question": "Bu klinik durumda ilk yapılması gereken işlem hangisidir?",
    "questionType": "management",
    "diagnosis": {
      "correct": "Hastayı ortamdan uzaklaştırıp yüksek akımlı %100 oksijen başlamak",
      "options": [
        "Hastayı ortamdan uzaklaştırıp yüksek akımlı %100 oksijen başlamak",
        "Nabız oksimetresi normal olduğu için taburcu etmek",
        "Önce geniş spektrumlu antibiyotik başlamak",
        "Sadece antiemetik verip evine göndermek"
      ],
      "question": "Bu klinik durumda ilk yapılması gereken işlem hangisidir?",
      "questionTitle": "Acil ilk tedavi",
      "explanation": "Karbonmonoksit zehirlenmesinde nabız oksimetresi yanıltıcı olabilir. Şüphede hastayı maruziyetten uzaklaştırmak ve %100 oksijen başlamak geciktirilmemelidir.",
      "pearls": [
        "CO zehirlenmesinde SpO₂ normal görünebilir.",
        "Aynı ortamda birden çok kişide benzer semptom olması güçlü ipucudur."
      ],
      "nextStep": "Hastayı ortamdan uzaklaştırıp yüksek akımlı %100 oksijen başlamak",
      "answerFeedback": {
        "diagnosisMeta": "Acil karar",
        "shortDiagnosisMeta": "CO zehirlenmesinde nabız oksimetresine güvenmeden oksijen tedavisine başlama kararını vermek.",
        "whyCorrect": "Karbonmonoksit zehirlenmesinde nabız oksimetresi yanıltıcı olabilir. Şüphede hastayı maruziyetten uzaklaştırmak ve %100 oksijen başlamak geciktirilmemelidir.",
        "evidenceChain": [
          "Hasta kapalı ortamda soba yandıktan sonra baş ağrısı, bulantı ve sersemlik geliştiğini söyler. Aynı evdeki iki kişide de benzer yakınmalar vardır. Oda havasında nabız oksimetresi normal sınıra yakın görünmektedir.",
          "Bilinç açık ancak hasta halsiz ve sersem görünür.",
          "Deri rengi olağan; kiraz kırmızısı görünüm belirgin değildir."
        ],
        "pearls": [
          "CO zehirlenmesinde SpO₂ normal görünebilir.",
          "Aynı ortamda birden çok kişide benzer semptom olması güçlü ipucudur."
        ],
        "management": [
          "Hastayı ortamdan uzaklaştırıp yüksek akımlı %100 oksijen başlamak",
          "CO zehirlenmesinde nabız oksimetresine güvenmeden oksijen tedavisine başlama kararını vermek."
        ],
        "learningOutcome": "CO zehirlenmesinde nabız oksimetresine güvenmeden oksijen tedavisine başlama kararını vermek.",
        "differentials": {
          "Nabız oksimetresi normal olduğu için taburcu etmek": {
            "explanation": "Nabız oksimetresi normal olduğu için taburcu etmek bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Hastayı ortamdan uzaklaştırıp yüksek akımlı %100 oksijen başlamak seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          },
          "Önce geniş spektrumlu antibiyotik başlamak": {
            "explanation": "Önce geniş spektrumlu antibiyotik başlamak bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Hastayı ortamdan uzaklaştırıp yüksek akımlı %100 oksijen başlamak seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          },
          "Sadece antiemetik verip evine göndermek": {
            "explanation": "Sadece antiemetik verip evine göndermek bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Hastayı ortamdan uzaklaştırıp yüksek akımlı %100 oksijen başlamak seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "quick-simple-febrile-seizure-001",
    "branchId": "quick-case",
    "caseType": "quick",
    "quickCategory": "Klinik spot",
    "title": "Basit febril nöbet sonrası aile bilgilendirmesi",
    "difficulty": "Hızlı · Klinik spot",
    "clinicalFocus": "Basit febril nöbet kriterlerini tanıyıp gereksiz ileri tetkikten kaçınmak.",
    "demographics": "18 aylık çocuk",
    "setting": "Çocuk acil",
    "chiefComplaint": "Ateş sırasında kısa nöbet",
    "stem": "Çocuk üst solunum yolu enfeksiyonu sırasında 2 dakika süren jeneralize tonik-klonik nöbet geçirmiştir. Nöbet kendiliğinden durmuştur; gün içinde tekrar etmemiştir. Gelişimi normaldir.",
    "vitals": {
      "TA": "Yaşa uygun",
      "Nabız": "126/dk",
      "Solunum": "24/dk",
      "SpO2": "%99",
      "Ateş": "38.8 °C"
    },
    "exam": [
      "Genel durum iyi, nöbet sonrası hızla normale dönmüştür.",
      "Ense sertliği yoktur.",
      "Fokal nörolojik defisit saptanmaz.",
      "Otoskopide hafif hiperemi dışında ağır sistemik bulgu yoktur."
    ],
    "investigations": [],
    "images": [],
    "managementSequence": {
      "enabled": false
    },
    "questionTitle": "Yönetim kararı",
    "question": "Bu olguda en uygun yaklaşım hangisidir?",
    "questionType": "management",
    "diagnosis": {
      "correct": "Basit febril nöbet olarak değerlendirip ateş odağını yönetmek ve aileyi bilgilendirmek",
      "options": [
        "Basit febril nöbet olarak değerlendirip ateş odağını yönetmek ve aileyi bilgilendirmek",
        "Her hastaya acil lomber ponksiyon yapmak",
        "Uzun süreli antiepileptik profilaksi başlamak",
        "Beyin tümörü düşünerek acil kraniyal MR istemek"
      ],
      "question": "Bu olguda en uygun yaklaşım hangisidir?",
      "questionTitle": "Yönetim kararı",
      "explanation": "6 ay-5 yaş arası, kısa süren, jeneralize, tek ve nörolojik muayenesi normal nöbet basit febril nöbetle uyumludur. Menenjit bulgusu veya kompleks özellik yoksa rutin ileri nörolojik tetkik gerekmez.",
      "pearls": [
        "Basit febril nöbet 15 dakikadan kısa, jeneralize ve 24 saatte tek nöbettir.",
        "Ense sertliği, toksik görünüm veya bilinçte kalıcı bozulma varsa yaklaşım değişir."
      ],
      "nextStep": "Basit febril nöbet olarak değerlendirip ateş odağını yönetmek ve aileyi bilgilendirmek",
      "answerFeedback": {
        "diagnosisMeta": "Klinik spot",
        "shortDiagnosisMeta": "Basit febril nöbet kriterlerini tanıyıp gereksiz ileri tetkikten kaçınmak.",
        "whyCorrect": "6 ay-5 yaş arası, kısa süren, jeneralize, tek ve nörolojik muayenesi normal nöbet basit febril nöbetle uyumludur. Menenjit bulgusu veya kompleks özellik yoksa rutin ileri nörolojik tetkik gerekmez.",
        "evidenceChain": [
          "Çocuk üst solunum yolu enfeksiyonu sırasında 2 dakika süren jeneralize tonik-klonik nöbet geçirmiştir. Nöbet kendiliğinden durmuştur; gün içinde tekrar etmemiştir. Gelişimi normaldir.",
          "Genel durum iyi, nöbet sonrası hızla normale dönmüştür.",
          "Ense sertliği yoktur."
        ],
        "pearls": [
          "Basit febril nöbet 15 dakikadan kısa, jeneralize ve 24 saatte tek nöbettir.",
          "Ense sertliği, toksik görünüm veya bilinçte kalıcı bozulma varsa yaklaşım değişir."
        ],
        "management": [
          "Basit febril nöbet olarak değerlendirip ateş odağını yönetmek ve aileyi bilgilendirmek",
          "Basit febril nöbet kriterlerini tanıyıp gereksiz ileri tetkikten kaçınmak."
        ],
        "learningOutcome": "Basit febril nöbet kriterlerini tanıyıp gereksiz ileri tetkikten kaçınmak.",
        "differentials": {
          "Her hastaya acil lomber ponksiyon yapmak": {
            "explanation": "Her hastaya acil lomber ponksiyon yapmak bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Basit febril nöbet olarak değerlendirip ateş odağını yönetmek ve aileyi bilgilendirmek seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          },
          "Uzun süreli antiepileptik profilaksi başlamak": {
            "explanation": "Uzun süreli antiepileptik profilaksi başlamak bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Basit febril nöbet olarak değerlendirip ateş odağını yönetmek ve aileyi bilgilendirmek seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          },
          "Beyin tümörü düşünerek acil kraniyal MR istemek": {
            "explanation": "Beyin tümörü düşünerek acil kraniyal MR istemek bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Basit febril nöbet olarak değerlendirip ateş odağını yönetmek ve aileyi bilgilendirmek seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "quick-scaphoid-xray-normal-001",
    "branchId": "quick-case",
    "caseType": "quick",
    "quickCategory": "Muayene odaklı",
    "title": "Grafisi normal el bileği travmasında skafoid şüphesi",
    "difficulty": "Hızlı · Muayene odaklı",
    "clinicalFocus": "Skafoid şüphesinde muayene bulgusunu grafiden daha öncelikli yorumlayıp immobilizasyon kararı vermek.",
    "demographics": "21 yaşında erkek",
    "setting": "Acil servis",
    "chiefComplaint": "Düşme sonrası el bileği ağrısı",
    "stem": "Hasta açık el üzerine düşme sonrası radial el bileği ağrısı tarifler. İlk direkt grafi normal raporlanmıştır; ancak ağrı devam etmektedir.",
    "vitals": {
      "TA": "118/76 mmHg",
      "Nabız": "82/dk",
      "Solunum": "16/dk",
      "SpO2": "%99",
      "Ateş": "36.5 °C"
    },
    "exam": [
      "Anatomik enfiye çukurunda belirgin hassasiyet vardır.",
      "Başparmak aksiyel yüklenmesi ağrıyı artırır.",
      "El bileğinde belirgin deformite yoktur.",
      "Distal nörovasküler muayene normaldir."
    ],
    "investigations": [
      {
        "id": "wrist-xray-quick",
        "label": "El bileği direkt grafisi",
        "type": "xray",
        "priority": "useful",
        "summary": "İlk grafide belirgin kırık hattı izlenmedi; klinik skafoid hassasiyeti devam ediyor.",
        "rows": [
          [
            "Skafoid kırık hattı",
            "İlk grafide izlenmedi",
            "Yok",
            "Klinik şüphe sürüyor"
          ]
        ]
      }
    ],
    "images": [],
    "managementSequence": {
      "enabled": false
    },
    "questionTitle": "Muayene odaklı karar",
    "question": "Bu durumda en uygun yönetim kararı nedir?",
    "questionType": "next-step",
    "diagnosis": {
      "correct": "Skafoid kırığı şüphesiyle immobilizasyon ve kontrol görüntüleme planlamak",
      "options": [
        "Skafoid kırığı şüphesiyle immobilizasyon ve kontrol görüntüleme planlamak",
        "Grafi normal olduğu için hemen temas sporuna dönüş vermek",
        "Antibiyotik başlamak",
        "Acil laparotomi hazırlamak"
      ],
      "question": "Bu durumda en uygun yönetim kararı nedir?",
      "questionTitle": "Muayene odaklı karar",
      "explanation": "Skafoid kırığı ilk grafide görünmeyebilir. Anatomik enfiye çukuru hassasiyeti varsa immobilizasyon ve kontrol grafi/MR/BT planı uygundur.",
      "pearls": [
        "Skafoid proksimal kutup kanlanması zayıf olduğu için avasküler nekroz riski önemlidir.",
        "Normal ilk grafi klinik şüpheyi dışlamaz."
      ],
      "nextStep": "Skafoid kırığı şüphesiyle immobilizasyon ve kontrol görüntüleme planlamak",
      "answerFeedback": {
        "diagnosisMeta": "Muayene odaklı",
        "shortDiagnosisMeta": "Skafoid şüphesinde muayene bulgusunu grafiden daha öncelikli yorumlayıp immobilizasyon kararı vermek.",
        "whyCorrect": "Skafoid kırığı ilk grafide görünmeyebilir. Anatomik enfiye çukuru hassasiyeti varsa immobilizasyon ve kontrol grafi/MR/BT planı uygundur.",
        "evidenceChain": [
          "Hasta açık el üzerine düşme sonrası radial el bileği ağrısı tarifler. İlk direkt grafi normal raporlanmıştır; ancak ağrı devam etmektedir.",
          "Anatomik enfiye çukurunda belirgin hassasiyet vardır.",
          "Başparmak aksiyel yüklenmesi ağrıyı artırır."
        ],
        "pearls": [
          "Skafoid proksimal kutup kanlanması zayıf olduğu için avasküler nekroz riski önemlidir.",
          "Normal ilk grafi klinik şüpheyi dışlamaz."
        ],
        "management": [
          "Skafoid kırığı şüphesiyle immobilizasyon ve kontrol görüntüleme planlamak",
          "Skafoid şüphesinde muayene bulgusunu grafiden daha öncelikli yorumlayıp immobilizasyon kararı vermek."
        ],
        "learningOutcome": "Skafoid şüphesinde muayene bulgusunu grafiden daha öncelikli yorumlayıp immobilizasyon kararı vermek.",
        "differentials": {
          "Grafi normal olduğu için hemen temas sporuna dönüş vermek": {
            "explanation": "Grafi normal olduğu için hemen temas sporuna dönüş vermek bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Skafoid kırığı şüphesiyle immobilizasyon ve kontrol görüntüleme planlamak seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          },
          "Antibiyotik başlamak": {
            "explanation": "Antibiyotik başlamak bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Skafoid kırığı şüphesiyle immobilizasyon ve kontrol görüntüleme planlamak seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          },
          "Acil laparotomi hazırlamak": {
            "explanation": "Acil laparotomi hazırlamak bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Skafoid kırığı şüphesiyle immobilizasyon ve kontrol görüntüleme planlamak seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "quick-epiglottitis-airway-001",
    "branchId": "quick-case",
    "caseType": "quick",
    "quickCategory": "Acil karar",
    "title": "Tripod pozisyonlu çocukta havayolu önceliği",
    "difficulty": "Hızlı · Acil karar",
    "clinicalFocus": "Epiglottit şüphesinde tanısal meraktan önce havayolu güvenliğini önceliklendirmek.",
    "demographics": "4 yaşında çocuk",
    "setting": "Çocuk acil",
    "chiefComplaint": "Ateş, disfaji ve salya akması",
    "stem": "Çocuk yüksek ateş, boğaz ağrısı, yutamama ve salya akmasıyla getirilir. Aile çocuğun oturur pozisyonda daha rahat nefes aldığını belirtir.",
    "vitals": {
      "TA": "Yaşa uygun",
      "Nabız": "138/dk",
      "Solunum": "34/dk",
      "SpO2": "%93",
      "Ateş": "39.2 °C"
    },
    "exam": [
      "Çocuk toksik görünür ve tripod pozisyonunda oturur.",
      "Salya akması belirgindir; yutkunmakta zorlanır.",
      "Ağız içi muayeneye direnç gösterir.",
      "İnspiratuvar stridor duyulur; hasta ajite edilmemelidir."
    ],
    "investigations": [],
    "images": [],
    "managementSequence": {
      "enabled": false
    },
    "questionTitle": "Havayolu kararı",
    "question": "Bu klinik durumda ilk yapılması gereken en uygun işlem hangisidir?",
    "questionType": "management",
    "diagnosis": {
      "correct": "Havayolunu güvenli ekip ve ortamda sağlamak; çocuğu ajite edecek boğaz muayenesinden kaçınmak",
      "options": [
        "Havayolunu güvenli ekip ve ortamda sağlamak; çocuğu ajite edecek boğaz muayenesinden kaçınmak",
        "Dil basacağıyla agresif farinks muayenesi yapmak",
        "Aileye evde takip önerip taburcu etmek",
        "Önce oral gıda alımını denetmek"
      ],
      "question": "Bu klinik durumda ilk yapılması gereken en uygun işlem hangisidir?",
      "questionTitle": "Havayolu kararı",
      "explanation": "Epiglottit şüphesinde ajitasyon ve agresif boğaz muayenesi tam havayolu obstrüksiyonunu tetikleyebilir. Öncelik güvenli havayolu yönetimidir.",
      "pearls": [
        "Tripod pozisyonu, salya akması ve toksik görünüm epiglottit açısından alarmdır.",
        "Boğaz muayenesi havayolu hazırlığı olmadan yapılmamalıdır."
      ],
      "nextStep": "Havayolunu güvenli ekip ve ortamda sağlamak; çocuğu ajite edecek boğaz muayenesinden kaçınmak",
      "answerFeedback": {
        "diagnosisMeta": "Acil karar",
        "shortDiagnosisMeta": "Epiglottit şüphesinde tanısal meraktan önce havayolu güvenliğini önceliklendirmek.",
        "whyCorrect": "Epiglottit şüphesinde ajitasyon ve agresif boğaz muayenesi tam havayolu obstrüksiyonunu tetikleyebilir. Öncelik güvenli havayolu yönetimidir.",
        "evidenceChain": [
          "Çocuk yüksek ateş, boğaz ağrısı, yutamama ve salya akmasıyla getirilir. Aile çocuğun oturur pozisyonda daha rahat nefes aldığını belirtir.",
          "Çocuk toksik görünür ve tripod pozisyonunda oturur.",
          "Salya akması belirgindir; yutkunmakta zorlanır."
        ],
        "pearls": [
          "Tripod pozisyonu, salya akması ve toksik görünüm epiglottit açısından alarmdır.",
          "Boğaz muayenesi havayolu hazırlığı olmadan yapılmamalıdır."
        ],
        "management": [
          "Havayolunu güvenli ekip ve ortamda sağlamak; çocuğu ajite edecek boğaz muayenesinden kaçınmak",
          "Epiglottit şüphesinde tanısal meraktan önce havayolu güvenliğini önceliklendirmek."
        ],
        "learningOutcome": "Epiglottit şüphesinde tanısal meraktan önce havayolu güvenliğini önceliklendirmek.",
        "differentials": {
          "Dil basacağıyla agresif farinks muayenesi yapmak": {
            "explanation": "Dil basacağıyla agresif farinks muayenesi yapmak bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Havayolunu güvenli ekip ve ortamda sağlamak; çocuğu ajite edecek boğaz muayenesinden kaçınmak seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          },
          "Aileye evde takip önerip taburcu etmek": {
            "explanation": "Aileye evde takip önerip taburcu etmek bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Havayolunu güvenli ekip ve ortamda sağlamak; çocuğu ajite edecek boğaz muayenesinden kaçınmak seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          },
          "Önce oral gıda alımını denetmek": {
            "explanation": "Önce oral gıda alımını denetmek bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası Havayolunu güvenli ekip ve ortamda sağlamak; çocuğu ajite edecek boğaz muayenesinden kaçınmak seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          }
        }
      }
    }
  },
  {
    "id": "quick-anaphylaxis-adrenaline-001",
    "branchId": "quick-case",
    "caseType": "quick",
    "quickCategory": "Acil karar",
    "title": "Çoklu sistem tutulumu olan alerjik reaksiyonda ilk tedavi",
    "difficulty": "Hızlı · Acil karar",
    "clinicalFocus": "Anafilaksi bulgularını tanıyıp ilk tedavi olarak IM adrenalini seçmek.",
    "demographics": "36 yaşında erkek",
    "setting": "Acil servis",
    "chiefComplaint": "Arı sokması sonrası nefes darlığı ve baygınlık hissi",
    "stem": "Hasta arı sokmasından 10 dakika sonra yaygın kaşıntı, dudak şişliği, nefes darlığı ve baygınlık hissi geliştirir.",
    "vitals": {
      "TA": "82/50 mmHg",
      "Nabız": "128/dk",
      "Solunum": "28/dk",
      "SpO2": "%91",
      "Ateş": "36.8 °C"
    },
    "exam": [
      "Hasta soluk, terli ve anksiyöz görünür.",
      "Yaygın ürtikeryal plaklar ve dudaklarda anjiyoödem vardır.",
      "Akciğer oskültasyonunda yaygın wheezing duyulur.",
      "Periferik nabızlar hızlı ve zayıftır; kapiller dolum gecikmiştir."
    ],
    "investigations": [],
    "images": [],
    "managementSequence": {
      "enabled": false
    },
    "questionTitle": "Acil tedavi sorusu",
    "question": "Bu olguda ilk verilmesi gereken tedavi hangisidir?",
    "questionType": "management",
    "diagnosis": {
      "correct": "İntramüsküler adrenalin",
      "options": [
        "İntramüsküler adrenalin",
        "Oral antihistaminik ile evde takip",
        "Geniş spektrumlu antibiyotik",
        "Acil tromboliz"
      ],
      "question": "Bu olguda ilk verilmesi gereken tedavi hangisidir?",
      "questionTitle": "Acil tedavi sorusu",
      "explanation": "Alerjen maruziyeti sonrası cilt bulgularına solunum ve dolaşım tutulumu eşlik ediyorsa anafilaksi vardır. İlk ve hayat kurtarıcı tedavi intramüsküler adrenalindir.",
      "pearls": [
        "Anafilakside antihistaminikler adrenalin yerine geçmez.",
        "Hipotansiyon veya wheezing varlığında IM adrenalin geciktirilmemelidir."
      ],
      "nextStep": "İntramüsküler adrenalin",
      "answerFeedback": {
        "diagnosisMeta": "Acil karar",
        "shortDiagnosisMeta": "Anafilaksi bulgularını tanıyıp ilk tedavi olarak IM adrenalini seçmek.",
        "whyCorrect": "Alerjen maruziyeti sonrası cilt bulgularına solunum ve dolaşım tutulumu eşlik ediyorsa anafilaksi vardır. İlk ve hayat kurtarıcı tedavi intramüsküler adrenalindir.",
        "evidenceChain": [
          "Hasta arı sokmasından 10 dakika sonra yaygın kaşıntı, dudak şişliği, nefes darlığı ve baygınlık hissi geliştirir.",
          "Hasta soluk, terli ve anksiyöz görünür.",
          "Yaygın ürtikeryal plaklar ve dudaklarda anjiyoödem vardır."
        ],
        "pearls": [
          "Anafilakside antihistaminikler adrenalin yerine geçmez.",
          "Hipotansiyon veya wheezing varlığında IM adrenalin geciktirilmemelidir."
        ],
        "management": [
          "İntramüsküler adrenalin",
          "Anafilaksi bulgularını tanıyıp ilk tedavi olarak IM adrenalini seçmek."
        ],
        "learningOutcome": "Anafilaksi bulgularını tanıyıp ilk tedavi olarak IM adrenalini seçmek.",
        "differentials": {
          "Oral antihistaminik ile evde takip": {
            "explanation": "Oral antihistaminik ile evde takip bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası İntramüsküler adrenalin seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          },
          "Geniş spektrumlu antibiyotik": {
            "explanation": "Geniş spektrumlu antibiyotik bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası İntramüsküler adrenalin seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
            ]
          },
          "Acil tromboliz": {
            "explanation": "Acil tromboliz bu kısa olguda güvenli ve öncelikli yaklaşım değildir; temel karar noktası İntramüsküler adrenalin seçeneğini destekler.",
            "comparisonPoints": [
              "Öncelik hasta güvenliği ve klinik aciliyet sırasıdır.",
              "Gereksiz tetkik veya gecikme bu formatta doğru karar değildir."
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
