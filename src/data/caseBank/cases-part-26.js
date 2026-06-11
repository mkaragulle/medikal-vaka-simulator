export const rawCasesPart26 = [
  {
      "id": "v285-new-614-baski-tarzinda-gogus-agrisi",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Baskı tarzında göğüs ağrısı",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "ST elevasyonu olmayan ancak troponin ve EKG ile yüksek risk taşıyan akut koroner sendromda invaziv strateji zamanlamasını seçme.",
      "learningTarget": "İstirahat ağrısı, dinamik ST depresyonu ve yükselen troponin paterninde düşük riskli göğüs ağrısı algoritmasından ayrılıp antitrombotik tedavi ve erken invaziv değerlendirme kararını verebilme.",
      "demographics": "58 yaşında erkek hasta",
      "setting": "Acil servis",
      "chiefComplaint": "Hasta, istirahatte başlayan göğüs baskısı ve soğuk terleme nedeniyle acile getiriliyor.",
      "stem": "Hasta akşam yemeğinden yaklaşık bir saat sonra göğsünün ortasında baskı şeklinde bir ağrı başladığını ve ağrının sol kola yayıldığını anlatır. Ağrı merdiven çıkarken yaşadığı eski sıkışmalara göre daha uzun sürmüş, oturup dinlenmesine rağmen kırk dakikadan fazla devam etmiştir. Terleme ve hafif bulantı eşlik etmiş; kusma, senkop veya ateş tariflemez. Bilinen hipertansiyon ve tip 2 diyabet öyküsü vardır, günde bir paket sigara içtiğini söyler. Daha önce mide yanması olduğunu fakat bu kez ağrının yanma değil ağırlık gibi olduğunu ve antasit aldıktan sonra belirgin rahatlamadığını belirtir.",
      "patientIntro": {
        "profile": "58 yaşında erkek hasta, acil servis başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, istirahatte başlayan göğüs baskısı ve soğuk terleme nedeniyle acile getiriliyor.",
        "historySummary": "Hasta akşam yemeğinden yaklaşık bir saat sonra göğsünün ortasında baskı şeklinde bir ağrı başladığını ve ağrının sol kola yayıldığını anlatır. Ağrı merdiven çıkarken yaşadığı eski sıkışmalara göre daha uzun sürmüş, oturup dinlenmesine rağmen kırk dakikadan fazla devam etmiştir. Terleme ve hafif bulantı eşlik etmiş; kusma, senkop veya ateş tariflemez. Bilinen hipertansiyon ve tip 2 diyabet öyküsü vardır, günde bir paket sigara içtiğini söyler. Daha önce mide yanması olduğunu fakat bu kez ağrının yanma değil ağırlık gibi olduğunu ve antasit aldıktan sonra belirgin rahatlamadığını belirtir."
      },
      "vitals": {
        "TA": "146/88 mmHg",
        "Nabız": "96/dk",
        "Solunum": "20/dk",
        "SpO2": "%97, oda havasında",
        "Ateş": "36.7 °C",
        "Şok indeksi": "0.66; ekstremiteler sıcak, kapiller dolum 2 saniyenin altında"
      },
      "exam": [
        "Hasta huzursuz görünür ancak tam koopere ve oryantedir.",
        "Kalp sesleri ritmik, belirgin yeni üfürüm duyulmaz.",
        "Akciğerlerde ral yoktur; periferik ödem izlenmez.",
        "Göğüs duvarı palpasyonu ağrıyı belirgin artırmaz."
      ],
      "investigations": [
        {
          "id": "v285-new-614-baski-tarzinda-gogus-agrisi-ekg",
          "label": "12 derivasyon EKG",
          "title": "12 derivasyon EKG",
          "type": "cardiology",
          "priority": "essential",
          "subtype": "12 derivasyon EKG",
          "category": "cardiology",
          "testTypeCategory": "cardiology",
          "summary": "Sinüs ritmi vardır; lateral derivasyonlarda dinamik iskemi lehine ST segment değişikliği izlenir.",
          "clinicalMeaning": "Sinüs ritmi vardır; lateral derivasyonlarda dinamik iskemi lehine ST segment değişikliği izlenir.",
          "result": {
            "title": "12 derivasyon EKG",
            "summary": "Sinüs ritmi vardır; lateral derivasyonlarda dinamik iskemi lehine ST segment değişikliği izlenir.",
            "interpretation": "Sinüs ritmi vardır; lateral derivasyonlarda dinamik iskemi lehine ST segment değişikliği izlenir.",
            "values": [
              [
                "Ritim",
                "Sinüs ritmi, 96/dk",
                "60-100/dk",
                "Sınırda taşikardi"
              ],
              [
                "V4-V6 ST segmenti",
                "1-1.5 mm horizontal depresyon",
                "İzoelektrik hat",
                "Anormal"
              ],
              [
                "ST elevasyonu",
                "Yok",
                "Yok",
                "Fibrinoliz endikasyonu desteklenmiyor"
              ],
              [
                "Patolojik Q dalgası",
                "Yok",
                "Yok",
                "Eski geniş infarkt paterni yok"
              ]
            ],
            "rows": [
              [
                "Ritim",
                "Sinüs ritmi, 96/dk",
                "60-100/dk",
                "Sınırda taşikardi"
              ],
              [
                "V4-V6 ST segmenti",
                "1-1.5 mm horizontal depresyon",
                "İzoelektrik hat",
                "Anormal"
              ],
              [
                "ST elevasyonu",
                "Yok",
                "Yok",
                "Fibrinoliz endikasyonu desteklenmiyor"
              ],
              [
                "Patolojik Q dalgası",
                "Yok",
                "Yok",
                "Eski geniş infarkt paterni yok"
              ]
            ]
          }
        },
        {
          "id": "v285-new-614-baski-tarzinda-gogus-agrisi-troponin",
          "label": "Seri yüksek duyarlılıklı troponin",
          "title": "Seri yüksek duyarlılıklı troponin",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Seri yüksek duyarlılıklı troponin",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Biyobelirteçlerde dinamik yükselme vardır; akut miyokard hasarı desteklenir.",
          "clinicalMeaning": "Biyobelirteçlerde dinamik yükselme vardır; akut miyokard hasarı desteklenir.",
          "result": {
            "title": "Seri yüksek duyarlılıklı troponin",
            "summary": "Biyobelirteçlerde dinamik yükselme vardır; akut miyokard hasarı desteklenir.",
            "interpretation": "Biyobelirteçlerde dinamik yükselme vardır; akut miyokard hasarı desteklenir.",
            "values": [
              [
                "0. saat hs-troponin I",
                "78 ng/L",
                "<14 ng/L",
                "Yüksek"
              ],
              [
                "2. saat hs-troponin I",
                "142 ng/L",
                "<14 ng/L",
                "Artış var"
              ],
              [
                "CK-MB",
                "12 ng/mL",
                "<5 ng/mL",
                "Yüksek"
              ],
              [
                "Kreatinin",
                "0.94 mg/dL",
                "0.7-1.2 mg/dL",
                "Normal"
              ]
            ],
            "rows": [
              [
                "0. saat hs-troponin I",
                "78 ng/L",
                "<14 ng/L",
                "Yüksek"
              ],
              [
                "2. saat hs-troponin I",
                "142 ng/L",
                "<14 ng/L",
                "Artış var"
              ],
              [
                "CK-MB",
                "12 ng/mL",
                "<5 ng/mL",
                "Yüksek"
              ],
              [
                "Kreatinin",
                "0.94 mg/dL",
                "0.7-1.2 mg/dL",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v285-new-614-baski-tarzinda-gogus-agrisi-temel-panel",
          "label": "Temel laboratuvar ve risk verileri",
          "title": "Temel laboratuvar ve risk verileri",
          "type": "laboratory",
          "priority": "important",
          "subtype": "Temel laboratuvar ve risk verileri",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Kanama veya ağır böbrek yetmezliği bulgusu yoktur; glisemik ve lipid risk belirgindir.",
          "clinicalMeaning": "Kanama veya ağır böbrek yetmezliği bulgusu yoktur; glisemik ve lipid risk belirgindir.",
          "result": {
            "title": "Temel laboratuvar ve risk verileri",
            "summary": "Kanama veya ağır böbrek yetmezliği bulgusu yoktur; glisemik ve lipid risk belirgindir.",
            "interpretation": "Kanama veya ağır böbrek yetmezliği bulgusu yoktur; glisemik ve lipid risk belirgindir.",
            "values": [
              [
                "Hemoglobin",
                "14.2 g/dL",
                "13.5-17.5 g/dL",
                "Normal"
              ],
              [
                "Trombosit",
                "248.000/µL",
                "150.000-400.000/µL",
                "Normal"
              ],
              [
                "Glukoz",
                "226 mg/dL",
                "70-140 mg/dL",
                "Yüksek"
              ],
              [
                "LDL-kolesterol",
                "164 mg/dL",
                "<100 mg/dL",
                "Yüksek"
              ]
            ],
            "rows": [
              [
                "Hemoglobin",
                "14.2 g/dL",
                "13.5-17.5 g/dL",
                "Normal"
              ],
              [
                "Trombosit",
                "248.000/µL",
                "150.000-400.000/µL",
                "Normal"
              ],
              [
                "Glukoz",
                "226 mg/dL",
                "70-140 mg/dL",
                "Yüksek"
              ],
              [
                "LDL-kolesterol",
                "164 mg/dL",
                "<100 mg/dL",
                "Yüksek"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada ilk 24 saat içinde planlanması gereken en uygun yaklaşım aşağıdakilerden hangisidir?",
      "questionType": "management",
      "answerTarget": "Yüksek riskli akut koroner sendrom yönetimi",
      "diagnosis": {
        "correct": "Antitrombotik tedaviyle birlikte erken invaziv koroner anjiyografi planlanması",
        "options": [
          "Düşük riskli göğüs ağrısı kabul edilip ayaktan efor testi planlanması",
          "ST elevasyonu olmadığı için trombolitik tedaviyle reperfüzyon yapılması",
          "Troponin düşene kadar yalnız anti-iskemik ilaçlarla serviste gözlem yapılması",
          "Antitrombotik tedaviyle birlikte erken invaziv koroner anjiyografi planlanması",
          "Antitrombotikler ertelenip elektif BT koroner anjiyografi randevusu verilmesi"
        ],
        "question": "Bu hastada ilk 24 saat içinde planlanması gereken en uygun yaklaşım aşağıdakilerden hangisidir?",
        "explanation": "İstirahatte uzamış iskemik karakterli ağrı, dinamik ST depresyonu ve seri troponin yükselmesi yüksek riskli ST elevasyonsuz akut koroner sendrom paternidir. Bu durumda düşük riskli ayaktan test yaklaşımı veya fibrinoliz değil, antitrombotik/anti-iskemik tedavi altında erken invaziv koroner anjiyografi planlanmalıdır.",
        "pearls": [
          "ST elevasyonu yoksa fibrinoliz otomatik tedavi değildir.",
          "Troponin yükselişi ve dinamik ST depresyonu hastayı düşük riskli göğüs ağrısından çıkarır.",
          "Ağrının azalması akut koroner sendrom riskini ortadan kaldırmaz."
        ],
        "optionFeedback": {
          "Düşük riskli göğüs ağrısı kabul edilip ayaktan efor testi planlanması": "Ayaktan efor testi, tekrarlayan semptomu olmayan, EKG’si iskemi göstermeyen ve seri troponinleri negatif kalan düşük riskli hastada düşünülebilir. Bu vakada istirahatte uzun süren baskı tarzında ağrı, dinamik ST depresyonu ve yükselen yüksek duyarlılıklı troponin vardır; bu bulgular düşük riskli göğüs ağrısı yaklaşımından uzaklaştırır. Efor testi aktif iskemi ve biyobelirteç pozitifliği varken güvenli bir dışlama testi değildir; önce akut koroner sendrom yönetimi ve risk temelli invaziv değerlendirme gerekir.",
          "ST elevasyonu olmadığı için trombolitik tedaviyle reperfüzyon yapılması": "Trombolitik tedavi, zamanında primer perkütan girişime ulaşılamayan ST elevasyonlu miyokard infarktüsü gibi belirli reperfüzyon senaryolarında gündeme gelir. Bu hastada EKG’de ST elevasyonu yoktur; lateral derivasyonlarda ST depresyonu ve troponin artışı vardır. ST elevasyonu olmadan trombolitik vermek beklenen yararı sağlamaz ve gereksiz kanama riski yaratır. Bu nedenle yönetim fibrinoliz değil antitrombotik tedavi ve risk düzeyine göre erken koroner anatomiyi değerlendirmedir.",
          "Troponin düşene kadar yalnız anti-iskemik ilaçlarla serviste gözlem yapılması": "Anti-iskemik tedavi ağrıyı azaltabilir; ancak bu yaklaşım tek başına yüksek riskli akut koroner sendromu yönetmek için yeterli değildir. Ağrının azalması veya troponinin zamanla düşmesi koroner olayın klinik önemini ortadan kaldırmaz. Dinamik EKG değişikliği ve troponin yükselişi erken invaziv strateji gerektiren risk göstergeleridir. Sadece gözlem yapmak aktif koroner lezyonun saptanmasını ve revaskülarizasyon gereksiniminin değerlendirilmesini geciktirir.",
          "Antitrombotik tedaviyle birlikte erken invaziv koroner anjiyografi planlanması": "Bu seçenek en uygundur. Hastada istirahatte baskı tarzında göğüs ağrısı, lateral derivasyonlarda ST depresyonu ve seri ölçümlerde yükselen troponin vardır; bu kombinasyon yüksek riskli ST elevasyonsuz akut koroner sendrom yönetimini gerektirir. İlk yaklaşım aspirin temelli antiplatelet tedavi, uygun antikoagülasyon, anti-iskemik tedavi, statin ve monitorizasyonla birlikte erken invaziv koroner anjiyografi planlamaktır. Buradaki kritik ayrım, ST elevasyonu olmaması nedeniyle fibrinoliz değil; biyobelirteç ve EKG riski nedeniyle elektif gecikme yerine erken invaziv değerlendirme yapılmasıdır.",
          "Antitrombotikler ertelenip elektif BT koroner anjiyografi randevusu verilmesi": "BT koroner anjiyografi, düşük-orta riskli ve akut miyokard hasarı kanıtı olmayan seçilmiş hastalarda noninvaziv anatomik değerlendirme için kullanılabilir. Bu vakada troponin yükselmekte ve EKG’de dinamik iskemi bulgusu vardır; bu nedenle elektif randevu verilmesi ve antitrombotiklerin ertelenmesi riskli olur. Aktif kanama veya mutlak kontrendikasyon belirtilmemişken antitrombotik tedaviyi ertelemek koroner trombüs ilerlemesi ve miyokard hasarı riskini artırır."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "ST elevasyonsuz akut koroner sendromda risk; semptom, EKG değişikliği, troponin dinamiği ve klinik stabiliteyle belirlenir. Yüksek riskli hastada erken invaziv değerlendirme prognoz açısından önemlidir.",
      "examPearl": "İstirahat ağrısı + ST depresyonu + yükselen troponin gördüğünde ‘efor testi’ değil erken invaziv strateji düşün.",
      "whyCorrect": "Doğru seçenek, hastanın biyobelirteç ve EKG ile yüksek risk taşıdığını kabul ederek antitrombotik tedavi ve erken koroner anatomi değerlendirmesini birlikte hedefler.",
      "optionComparison": "Ayaktan efor testi ve BT koroner yaklaşımı düşük riskli hastalara, fibrinoliz ST elevasyonlu reperfüzyon senaryosuna, yalnız gözlem ise düşük riskli belirsiz ağrı tablolarına daha uygundur.",
      "evidenceChain": [
        "Uzamış istirahat ağrısı → düşük riskli stabil angina paterninden uzaklaşma.",
        "V4-V6 horizontal ST depresyonu → aktif subendokardiyal iskemi bulgusu.",
        "hs-troponin 78’den 142 ng/L’ye yükselme → dinamik miyokard hasarı.",
        "Hemodinamik stabilite ve ST elevasyonu olmaması → fibrinoliz yerine erken invaziv strateji."
      ],
      "whyWrong": {
        "Düşük riskli göğüs ağrısı kabul edilip ayaktan efor testi planlanması": "Ayaktan efor testi, tekrarlayan semptomu olmayan, EKG’si iskemi göstermeyen ve seri troponinleri negatif kalan düşük riskli hastada düşünülebilir. Bu vakada istirahatte uzun süren baskı tarzında ağrı, dinamik ST depresyonu ve yükselen yüksek duyarlılıklı troponin vardır; bu bulgular düşük riskli göğüs ağrısı yaklaşımından uzaklaştırır. Efor testi aktif iskemi ve biyobelirteç pozitifliği varken güvenli bir dışlama testi değildir; önce akut koroner sendrom yönetimi ve risk temelli invaziv değerlendirme gerekir.",
        "ST elevasyonu olmadığı için trombolitik tedaviyle reperfüzyon yapılması": "Trombolitik tedavi, zamanında primer perkütan girişime ulaşılamayan ST elevasyonlu miyokard infarktüsü gibi belirli reperfüzyon senaryolarında gündeme gelir. Bu hastada EKG’de ST elevasyonu yoktur; lateral derivasyonlarda ST depresyonu ve troponin artışı vardır. ST elevasyonu olmadan trombolitik vermek beklenen yararı sağlamaz ve gereksiz kanama riski yaratır. Bu nedenle yönetim fibrinoliz değil antitrombotik tedavi ve risk düzeyine göre erken koroner anatomiyi değerlendirmedir.",
        "Troponin düşene kadar yalnız anti-iskemik ilaçlarla serviste gözlem yapılması": "Anti-iskemik tedavi ağrıyı azaltabilir; ancak bu yaklaşım tek başına yüksek riskli akut koroner sendromu yönetmek için yeterli değildir. Ağrının azalması veya troponinin zamanla düşmesi koroner olayın klinik önemini ortadan kaldırmaz. Dinamik EKG değişikliği ve troponin yükselişi erken invaziv strateji gerektiren risk göstergeleridir. Sadece gözlem yapmak aktif koroner lezyonun saptanmasını ve revaskülarizasyon gereksiniminin değerlendirilmesini geciktirir.",
        "Antitrombotikler ertelenip elektif BT koroner anjiyografi randevusu verilmesi": "BT koroner anjiyografi, düşük-orta riskli ve akut miyokard hasarı kanıtı olmayan seçilmiş hastalarda noninvaziv anatomik değerlendirme için kullanılabilir. Bu vakada troponin yükselmekte ve EKG’de dinamik iskemi bulgusu vardır; bu nedenle elektif randevu verilmesi ve antitrombotiklerin ertelenmesi riskli olur. Aktif kanama veya mutlak kontrendikasyon belirtilmemişken antitrombotik tedaviyi ertelemek koroner trombüs ilerlemesi ve miyokard hasarı riskini artırır."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v285",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "feedbackAudit": "passed",
        "schemaReference": "v280-v284-render-safe-standard-cases"
      },
      "findings": [
        "İstirahat ağrısı ve terleme → akut koroner olay riski.",
        "ST depresyonu → yüksek riskli iskemi.",
        "Troponin dinamiği → akut miyokard hasarı."
      ],
      "images": []
    },
  {
      "id": "v285-new-615-siddetli-epigastrik-agri-ve-kusma",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Şiddetli epigastrik ağrı ve kusma",
      "difficulty": "Orta-Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Akut pankreatik inflamasyon düşündüren klinikte ilk destek tedavisini ve gereksiz antibiyotik/ERCP/parenteral beslenme tuzaklarını ayırt etme.",
      "learningTarget": "Karın ağrısı, lipaz yüksekliği, volüm kaybı ve biliyer obstrüksiyon dışlayıcı verileri birlikte yorumlayarak erken sıvı-analjezi temelli tedaviyi seçebilme.",
      "demographics": "46 yaşında erkek hasta",
      "setting": "Acil servis",
      "chiefComplaint": "Hasta, sırta vuran üst karın ağrısı ve tekrarlayan kusma nedeniyle acile başvuruyor.",
      "stem": "Hasta gece yarısından sonra göbek üstünde başlayan şiddetli ağrının giderek arttığını ve sırtına doğru yayıldığını anlatır. Ağrı uzanınca belirginleşmiş, öne eğilip oturduğunda biraz hafiflemiştir. Sabah iki kez safralı kusmuş, bu nedenle su içemediğini ve ağız kuruluğu hissettiğini söyler. Son iki gündür fazla alkol aldığını belirtir; daha önce safra taşı tanısı konmadığını, dışkıda siyahlık veya kan görmediğini ifade eder. Göğüs ağrısı, nefes darlığı veya yakın zamanda karın travması tariflemez.",
      "patientIntro": {
        "profile": "46 yaşında erkek hasta, acil servis başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, sırta vuran üst karın ağrısı ve tekrarlayan kusma nedeniyle acile başvuruyor.",
        "historySummary": "Hasta gece yarısından sonra göbek üstünde başlayan şiddetli ağrının giderek arttığını ve sırtına doğru yayıldığını anlatır. Ağrı uzanınca belirginleşmiş, öne eğilip oturduğunda biraz hafiflemiştir. Sabah iki kez safralı kusmuş, bu nedenle su içemediğini ve ağız kuruluğu hissettiğini söyler. Son iki gündür fazla alkol aldığını belirtir; daha önce safra taşı tanısı konmadığını, dışkıda siyahlık veya kan görmediğini ifade eder. Göğüs ağrısı, nefes darlığı veya yakın zamanda karın travması tariflemez."
      },
      "vitals": {
        "TA": "104/68 mmHg",
        "Nabız": "112/dk",
        "Solunum": "22/dk",
        "SpO2": "%96, oda havasında",
        "Ateş": "37.8 °C",
        "Şok indeksi": "1.07; ağız mukozası kuru, kapiller dolum 3 saniye"
      },
      "exam": [
        "Hasta ağrı nedeniyle öne eğilerek oturmayı tercih eder.",
        "Epigastriumda belirgin hassasiyet vardır; yaygın rijidite veya rebound yoktur.",
        "Skleralarda belirgin ikter izlenmez.",
        "Akciğer bazallerinde belirgin ral yoktur; kalp sesleri taşikardik ve ritmiktir."
      ],
      "investigations": [
        {
          "id": "v285-new-615-siddetli-epigastrik-agri-ve-kusma-pankreatik-enzim",
          "label": "Pankreatik enzimler ve inflamasyon",
          "title": "Pankreatik enzimler ve inflamasyon",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Pankreatik enzimler ve inflamasyon",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Lipaz belirgin yüksektir; lökositoz ve hemokonsantrasyon volüm kaybı ile uyumludur.",
          "clinicalMeaning": "Lipaz belirgin yüksektir; lökositoz ve hemokonsantrasyon volüm kaybı ile uyumludur.",
          "result": {
            "title": "Pankreatik enzimler ve inflamasyon",
            "summary": "Lipaz belirgin yüksektir; lökositoz ve hemokonsantrasyon volüm kaybı ile uyumludur.",
            "interpretation": "Lipaz belirgin yüksektir; lökositoz ve hemokonsantrasyon volüm kaybı ile uyumludur.",
            "values": [
              [
                "Lipaz",
                "1450 U/L",
                "<60 U/L",
                "Çok yüksek"
              ],
              [
                "Amilaz",
                "510 U/L",
                "30-110 U/L",
                "Yüksek"
              ],
              [
                "Lökosit",
                "15.800/µL",
                "4.000-10.000/µL",
                "Yüksek"
              ],
              [
                "Hematokrit",
                "48%",
                "40-50%",
                "Üst sınıra yakın"
              ]
            ],
            "rows": [
              [
                "Lipaz",
                "1450 U/L",
                "<60 U/L",
                "Çok yüksek"
              ],
              [
                "Amilaz",
                "510 U/L",
                "30-110 U/L",
                "Yüksek"
              ],
              [
                "Lökosit",
                "15.800/µL",
                "4.000-10.000/µL",
                "Yüksek"
              ],
              [
                "Hematokrit",
                "48%",
                "40-50%",
                "Üst sınıra yakın"
              ]
            ]
          }
        },
        {
          "id": "v285-new-615-siddetli-epigastrik-agri-ve-kusma-biyokimya",
          "label": "Biyokimya ve biliyer patern",
          "title": "Biyokimya ve biliyer patern",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Biyokimya ve biliyer patern",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Böbrek perfüzyonu ve elektrolitler izlem gerektirir; belirgin kolestaz paterni yoktur.",
          "clinicalMeaning": "Böbrek perfüzyonu ve elektrolitler izlem gerektirir; belirgin kolestaz paterni yoktur.",
          "result": {
            "title": "Biyokimya ve biliyer patern",
            "summary": "Böbrek perfüzyonu ve elektrolitler izlem gerektirir; belirgin kolestaz paterni yoktur.",
            "interpretation": "Böbrek perfüzyonu ve elektrolitler izlem gerektirir; belirgin kolestaz paterni yoktur.",
            "values": [
              [
                "BUN",
                "29 mg/dL",
                "7-20 mg/dL",
                "Yüksek"
              ],
              [
                "Kreatinin",
                "1.34 mg/dL",
                "0.7-1.2 mg/dL",
                "Hafif yüksek"
              ],
              [
                "AST / ALT",
                "82 / 74 U/L",
                "<40 U/L",
                "Hafif yüksek"
              ],
              [
                "Total bilirubin",
                "0.9 mg/dL",
                "0.2-1.2 mg/dL",
                "Normal"
              ],
              [
                "ALP",
                "94 U/L",
                "40-130 U/L",
                "Normal"
              ]
            ],
            "rows": [
              [
                "BUN",
                "29 mg/dL",
                "7-20 mg/dL",
                "Yüksek"
              ],
              [
                "Kreatinin",
                "1.34 mg/dL",
                "0.7-1.2 mg/dL",
                "Hafif yüksek"
              ],
              [
                "AST / ALT",
                "82 / 74 U/L",
                "<40 U/L",
                "Hafif yüksek"
              ],
              [
                "Total bilirubin",
                "0.9 mg/dL",
                "0.2-1.2 mg/dL",
                "Normal"
              ],
              [
                "ALP",
                "94 U/L",
                "40-130 U/L",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v285-new-615-siddetli-epigastrik-agri-ve-kusma-usg",
          "label": "Üst abdomen ultrasonografisi",
          "title": "Üst abdomen ultrasonografisi",
          "type": "imaging",
          "priority": "important",
          "subtype": "Üst abdomen ultrasonografisi",
          "category": "imaging",
          "testTypeCategory": "imaging",
          "summary": "Safra yolu dilatasyonu veya koledok taşı lehine belirgin bulgu yoktur.",
          "clinicalMeaning": "Safra yolu dilatasyonu veya koledok taşı lehine belirgin bulgu yoktur.",
          "result": {
            "title": "Üst abdomen ultrasonografisi",
            "summary": "Safra yolu dilatasyonu veya koledok taşı lehine belirgin bulgu yoktur.",
            "interpretation": "Safra yolu dilatasyonu veya koledok taşı lehine belirgin bulgu yoktur.",
            "values": [
              [
                "Safra kesesi",
                "Taş izlenmedi",
                "Taş yok",
                "Biliyer neden desteklenmiyor"
              ],
              [
                "Koledok çapı",
                "5 mm",
                "<6 mm",
                "Normal"
              ],
              [
                "Pankreas çevresi",
                "Hafif ödemli görünüm",
                "Normal görünüm",
                "İnflamasyonla uyumlu olabilir"
              ],
              [
                "Serbest sıvı",
                "Minimal peripankreatik",
                "Yok",
                "Hafif eşlikçi bulgu"
              ]
            ],
            "rows": [
              [
                "Safra kesesi",
                "Taş izlenmedi",
                "Taş yok",
                "Biliyer neden desteklenmiyor"
              ],
              [
                "Koledok çapı",
                "5 mm",
                "<6 mm",
                "Normal"
              ],
              [
                "Pankreas çevresi",
                "Hafif ödemli görünüm",
                "Normal görünüm",
                "İnflamasyonla uyumlu olabilir"
              ],
              [
                "Serbest sıvı",
                "Minimal peripankreatik",
                "Yok",
                "Hafif eşlikçi bulgu"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada ilk saatlerde en uygun tedavi yaklaşımı aşağıdakilerden hangisidir?",
      "questionType": "management",
      "answerTarget": "Akut pankreatik inflamasyonda erken destek tedavisi",
      "diagnosis": {
        "correct": "Erken dengeli kristalloid sıvı, güçlü analjezi ve yakın klinik-laboratuvar izlem başlanması",
        "options": [
          "Erken dengeli kristalloid sıvı, güçlü analjezi ve yakın klinik-laboratuvar izlem başlanması",
          "Steril nekroz olasılığına karşı ilk saatten profilaktik karbapenem başlanması",
          "Safra yolu obstrüksiyonu olmadan acil ERCP ile pankreatik kanal girişimi yapılması",
          "Ağrı kontrolü yerine sistemik kortikosteroid ve immünsüpresyon başlanması",
          "İlk haftada oral alım tamamen kesilip rutin total parenteral beslenme verilmesi"
        ],
        "question": "Bu hastada ilk saatlerde en uygun tedavi yaklaşımı aşağıdakilerden hangisidir?",
        "explanation": "Klinik öykü ve lipaz yüksekliği akut pankreatik inflamasyonu desteklerken kolanjit, belirgin biliyer obstrüksiyon veya enfekte nekroz bulgusu yoktur. Bu nedenle ilk saatlerde temel tedavi erken dengeli kristalloid sıvı, yeterli analjezi, antiemetik destek ve klinik-laboratuvar yakın izlemdir.",
        "pearls": [
          "Akut pankreatitte rutin profilaktik antibiyotik verilmez.",
          "ERCP sadece kolanjit veya devam eden biliyer obstrüksiyon varsa erken gündeme gelir.",
          "BUN/hematokrit/kreatinin volüm yanıtı ve ağırlaşma açısından takip edilir."
        ],
        "optionFeedback": {
          "Erken dengeli kristalloid sıvı, güçlü analjezi ve yakın klinik-laboratuvar izlem başlanması": "Bu seçenek en uygundur. Hastada sırta vuran şiddetli epigastrik ağrı, kusma ve lipazın normalin üç katından fazla yükselmesi akut pankreatik inflamasyonla uyumlu bir klinik-laboratuvar patern oluşturur. İlk tedavi, özellikle erken dönemde damar içi dengeli kristalloid sıvı resüsitasyonu, yeterli analjezi, antiemetik destek, oksijenasyon/perfüzyon izlemi ve BUN-kreatinin-hematokrit gibi volüm yanıt göstergelerinin takip edilmesidir. Antibiyotik, ERCP veya parenteral beslenme her hastaya rutin başlanmaz; klinik bağlam ve komplikasyon varlığına göre seçilir.",
          "Steril nekroz olasılığına karşı ilk saatten profilaktik karbapenem başlanması": "Profilaktik karbapenem yaklaşımı bu vaka için doğru klinik hedef değildir. Enfekte nekroz, kolanjit veya sepsis odağı gösterilmediği sürece ağır seyirli olabilecek pankreatik inflamasyonda bile rutin antibiyotik başlanması önerilmez. Bu hastada ateş hafif, bilirubin normal, safra yolu genişlemesi yok ve görüntüleme enfekte koleksiyon göstermemektedir. Gereksiz geniş spektrum antibiyotik direnç, mantar enfeksiyonu ve ilaç yan etkisi riskini artırır; asıl erken eksik bırakılmaması gereken basamak sıvı ve analjezidir.",
          "Safra yolu obstrüksiyonu olmadan acil ERCP ile pankreatik kanal girişimi yapılması": "ERCP akut pankreatitte her hastaya yapılacak bir ilk basamak değildir. Eşlik eden akut kolanjit, devam eden biliyer obstrüksiyon veya belirgin koledok taşı bulguları varsa erken ERCP düşünülür. Bu vakada bilirubin ve ALP normaldir, ultrasonografide safra yolu dilatasyonu yoktur ve öykü alkol kullanımıyla uyumludur. Bu nedenle kanal girişimi gereksiz işlem riski doğurur; başlangıç yaklaşımı konservatif destek ve yakın izlem olmalıdır.",
          "Ağrı kontrolü yerine sistemik kortikosteroid ve immünsüpresyon başlanması": "Sistemik kortikosteroid akut pankreatitin rutin ilk tedavisi değildir. Otoimmün pankreatit gibi özel bir tablo düşünülse bile tipik ani epigastrik ağrı, yüksek lipaz ve alkol kullanımı olan bu hasta için ilk saatlerde steroid vermek patogenezi hedeflemez. Ağrı kontrolünü ertelemek hastanın solunum eforunu, sempatik yanıtını ve klinik konforunu bozar. Ayrıca immünsüpresyon komplikasyonları maskeleyebilir.",
          "İlk haftada oral alım tamamen kesilip rutin total parenteral beslenme verilmesi": "Rutin total parenteral beslenme eski ve seçilmemiş hastalarda sakıncalı bir yaklaşımdır. Hafif-orta akut pankreatitte ağrı ve kusma kontrol altına alındıkça erken enteral/oral beslenmeye geçilebilir; ağır vakalarda da enteral yol mümkün olduğunda parenteral yola tercih edilir. Bu hastada barsak iskemi, mekanik obstrüksiyon veya uzun süre enteral beslenememe belirtilmemiştir. İlk haftada otomatik TPN enfeksiyon ve metabolik komplikasyon riskini artırır."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Akut pankreatitte erken dönemde morbiditeyi belirleyen önemli faktörlerden biri intravasküler volüm kaybı ve sistemik inflamatuvar yanıttır; tedavi seçilmemiş girişimlerden önce destek ve yakın izlemle başlar.",
      "examPearl": "Sırta vuran epigastrik ağrı + lipaz >3 kat + kolanjit/obstrüksiyon yoksa ilk cevap çoğu kez sıvı ve analjezidir, antibiyotik veya ERCP değildir.",
      "whyCorrect": "Doğru seçenek, hastanın hipovolemi bulgularını ve pankreatik enzim paternini hedefleyerek erken destek tedavisini başlatır; gereksiz invaziv veya antimikrobiyal tedaviden kaçınır.",
      "optionComparison": "Antibiyotik enfekte nekroz/kolanjit için, ERCP biliyer obstrüksiyon için, steroid özel otoimmün tablolar için, TPN ise enteral beslenemeyen seçilmiş hastalar için düşünülür.",
      "evidenceChain": [
        "Sırta vuran epigastrik ağrı ve pozisyonla kısmi rahatlama → pankreatik kökenli ağrı paterni.",
        "Lipaz 1450 U/L → pankreatik enzim yüksekliği belirgin.",
        "BUN ve kreatinin artışı, mukozal kuruluk → intravasküler volüm kaybı riski.",
        "Bilirubin/ALP normal ve koledok 5 mm → acil ERCP gerektiren obstrüksiyon desteklenmiyor."
      ],
      "whyWrong": {
        "Steril nekroz olasılığına karşı ilk saatten profilaktik karbapenem başlanması": "Profilaktik karbapenem yaklaşımı bu vaka için doğru klinik hedef değildir. Enfekte nekroz, kolanjit veya sepsis odağı gösterilmediği sürece ağır seyirli olabilecek pankreatik inflamasyonda bile rutin antibiyotik başlanması önerilmez. Bu hastada ateş hafif, bilirubin normal, safra yolu genişlemesi yok ve görüntüleme enfekte koleksiyon göstermemektedir. Gereksiz geniş spektrum antibiyotik direnç, mantar enfeksiyonu ve ilaç yan etkisi riskini artırır; asıl erken eksik bırakılmaması gereken basamak sıvı ve analjezidir.",
        "Safra yolu obstrüksiyonu olmadan acil ERCP ile pankreatik kanal girişimi yapılması": "ERCP akut pankreatitte her hastaya yapılacak bir ilk basamak değildir. Eşlik eden akut kolanjit, devam eden biliyer obstrüksiyon veya belirgin koledok taşı bulguları varsa erken ERCP düşünülür. Bu vakada bilirubin ve ALP normaldir, ultrasonografide safra yolu dilatasyonu yoktur ve öykü alkol kullanımıyla uyumludur. Bu nedenle kanal girişimi gereksiz işlem riski doğurur; başlangıç yaklaşımı konservatif destek ve yakın izlem olmalıdır.",
        "Ağrı kontrolü yerine sistemik kortikosteroid ve immünsüpresyon başlanması": "Sistemik kortikosteroid akut pankreatitin rutin ilk tedavisi değildir. Otoimmün pankreatit gibi özel bir tablo düşünülse bile tipik ani epigastrik ağrı, yüksek lipaz ve alkol kullanımı olan bu hasta için ilk saatlerde steroid vermek patogenezi hedeflemez. Ağrı kontrolünü ertelemek hastanın solunum eforunu, sempatik yanıtını ve klinik konforunu bozar. Ayrıca immünsüpresyon komplikasyonları maskeleyebilir.",
        "İlk haftada oral alım tamamen kesilip rutin total parenteral beslenme verilmesi": "Rutin total parenteral beslenme eski ve seçilmemiş hastalarda sakıncalı bir yaklaşımdır. Hafif-orta akut pankreatitte ağrı ve kusma kontrol altına alındıkça erken enteral/oral beslenmeye geçilebilir; ağır vakalarda da enteral yol mümkün olduğunda parenteral yola tercih edilir. Bu hastada barsak iskemi, mekanik obstrüksiyon veya uzun süre enteral beslenememe belirtilmemiştir. İlk haftada otomatik TPN enfeksiyon ve metabolik komplikasyon riskini artırır."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v285",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "feedbackAudit": "passed",
        "schemaReference": "v280-v284-render-safe-standard-cases"
      },
      "findings": [
        "Epigastrik ağrı + yüksek lipaz → akut pankreatik inflamasyon.",
        "Kusma + BUN yüksekliği → sıvı ihtiyacı.",
        "Kolestaz yokluğu → rutin acil ERCP dışı yaklaşım."
      ],
      "images": []
    },
  {
      "id": "v285-new-616-ates-oksuruk-ve-yan-agrisi",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Ateş, öksürük ve yan ağrısı",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Pnömoniyle ilişkili plevral sıvıda biyokimyasal ve ultrasonografik komplike efüzyon bulgularını tanıyıp drenaj kararını verme.",
      "learningTarget": "Plevral sıvı pH, glukoz, LDH ve lokülasyon verilerini antibiyotik tek başına mı yoksa drenajla birlikte mi sorusuna bağlayabilme.",
      "demographics": "66 yaşında kadın hasta",
      "setting": "Acil servis",
      "chiefComplaint": "Hasta, ateşli öksürükten sonra artan sağ yan ağrısı ve nefes darlığı ile başvuruyor.",
      "stem": "Hasta beş gündür sarı-yeşil balgamlı öksürdüğünü ve son iki gündür sağ yan tarafında nefes alınca bıçak saplanır gibi ağrı başladığını anlatır. Evde ateşi yükselmiş, parasetamol aldıktan sonra kısa süre rahatlamış fakat halsizliği ve nefes darlığı artmıştır. Diyabeti olduğunu, son günlerde iştahının azaldığını ve su içmekte zorlandığını söyler. Daha önce plevra sıvısı nedeniyle işlem yapılmamıştır; uzun yolculuk, baldır şişliği veya kan tükürme tariflemez. Bu sabah merdiven çıkarken normalden çok daha çabuk yorulunca yakınları tarafından acile getirilmiştir.",
      "patientIntro": {
        "profile": "66 yaşında kadın hasta, acil servis başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, ateşli öksürükten sonra artan sağ yan ağrısı ve nefes darlığı ile başvuruyor.",
        "historySummary": "Hasta beş gündür sarı-yeşil balgamlı öksürdüğünü ve son iki gündür sağ yan tarafında nefes alınca bıçak saplanır gibi ağrı başladığını anlatır. Evde ateşi yükselmiş, parasetamol aldıktan sonra kısa süre rahatlamış fakat halsizliği ve nefes darlığı artmıştır. Diyabeti olduğunu, son günlerde iştahının azaldığını ve su içmekte zorlandığını söyler. Daha önce plevra sıvısı nedeniyle işlem yapılmamıştır; uzun yolculuk, baldır şişliği veya kan tükürme tariflemez. Bu sabah merdiven çıkarken normalden çok daha çabuk yorulunca yakınları tarafından acile getirilmiştir."
      },
      "vitals": {
        "TA": "112/70 mmHg",
        "Nabız": "108/dk",
        "Solunum": "26/dk",
        "SpO2": "%91, oda havasında",
        "Ateş": "38.6 °C",
        "Şok indeksi": "0.96; periferik nabızlar alınır, kapiller dolum yaklaşık 3 saniye"
      },
      "exam": [
        "Sağ alt hemitoraksta perküsyonda matite ve solunum seslerinde azalma vardır.",
        "Sağ bazalde bronşiyal solunum ve ince raller duyulur.",
        "Boyun venöz dolgunluğu yoktur; pretibial ödem saptanmaz.",
        "Bacaklarda asimetrik şişlik veya derin ven hassasiyeti izlenmez."
      ],
      "investigations": [
        {
          "id": "v285-new-616-ates-oksuruk-ve-yan-agrisi-hemogram-crp",
          "label": "Hemogram ve inflamasyon belirteçleri",
          "title": "Hemogram ve inflamasyon belirteçleri",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Hemogram ve inflamasyon belirteçleri",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Nötrofil ağırlıklı lökositoz ve yüksek inflamasyon yanıtı vardır.",
          "clinicalMeaning": "Nötrofil ağırlıklı lökositoz ve yüksek inflamasyon yanıtı vardır.",
          "result": {
            "title": "Hemogram ve inflamasyon belirteçleri",
            "summary": "Nötrofil ağırlıklı lökositoz ve yüksek inflamasyon yanıtı vardır.",
            "interpretation": "Nötrofil ağırlıklı lökositoz ve yüksek inflamasyon yanıtı vardır.",
            "values": [
              [
                "Lökosit",
                "18.900/µL",
                "4.000-10.000/µL",
                "Yüksek"
              ],
              [
                "Nötrofil",
                "%88",
                "%40-70",
                "Yüksek"
              ],
              [
                "CRP",
                "236 mg/L",
                "<5 mg/L",
                "Çok yüksek"
              ],
              [
                "Prokalsitonin",
                "3.1 ng/mL",
                "<0.05 ng/mL",
                "Yüksek"
              ]
            ],
            "rows": [
              [
                "Lökosit",
                "18.900/µL",
                "4.000-10.000/µL",
                "Yüksek"
              ],
              [
                "Nötrofil",
                "%88",
                "%40-70",
                "Yüksek"
              ],
              [
                "CRP",
                "236 mg/L",
                "<5 mg/L",
                "Çok yüksek"
              ],
              [
                "Prokalsitonin",
                "3.1 ng/mL",
                "<0.05 ng/mL",
                "Yüksek"
              ]
            ]
          }
        },
        {
          "id": "v285-new-616-ates-oksuruk-ve-yan-agrisi-akciger-grafisi-usg",
          "label": "Akciğer grafisi ve toraks ultrasonografisi",
          "title": "Akciğer grafisi ve toraks ultrasonografisi",
          "type": "imaging",
          "priority": "essential",
          "subtype": "Akciğer grafisi ve toraks ultrasonografisi",
          "category": "imaging",
          "testTypeCategory": "imaging",
          "summary": "Konsolidasyonla birlikte septalı plevral sıvı izlenir.",
          "clinicalMeaning": "Konsolidasyonla birlikte septalı plevral sıvı izlenir.",
          "result": {
            "title": "Akciğer grafisi ve toraks ultrasonografisi",
            "summary": "Konsolidasyonla birlikte septalı plevral sıvı izlenir.",
            "interpretation": "Konsolidasyonla birlikte septalı plevral sıvı izlenir.",
            "values": [
              [
                "Akciğer grafisi",
                "Sağ alt zon konsolidasyon ve plevral opasite",
                "Normal havalanma",
                "Anormal"
              ],
              [
                "Toraks USG",
                "Yaklaşık 5 cm derinlikte septalı plevral sıvı",
                "Serbest sıvı yok",
                "Lokülasyon var"
              ],
              [
                "Mediastinal kayma",
                "Yok",
                "Yok",
                "Masif efüzyon değil"
              ],
              [
                "Pnömotoraks",
                "Yok",
                "Yok",
                "Drenaj öncesi bazal bilgi"
              ]
            ],
            "rows": [
              [
                "Akciğer grafisi",
                "Sağ alt zon konsolidasyon ve plevral opasite",
                "Normal havalanma",
                "Anormal"
              ],
              [
                "Toraks USG",
                "Yaklaşık 5 cm derinlikte septalı plevral sıvı",
                "Serbest sıvı yok",
                "Lokülasyon var"
              ],
              [
                "Mediastinal kayma",
                "Yok",
                "Yok",
                "Masif efüzyon değil"
              ],
              [
                "Pnömotoraks",
                "Yok",
                "Yok",
                "Drenaj öncesi bazal bilgi"
              ]
            ]
          }
        },
        {
          "id": "v285-new-616-ates-oksuruk-ve-yan-agrisi-plevra-sivisi",
          "label": "Tanısal torasentez sıvı analizi",
          "title": "Tanısal torasentez sıvı analizi",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Tanısal torasentez sıvı analizi",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Plevral sıvı biyokimyası komplike efüzyon için yüksek risklidir.",
          "clinicalMeaning": "Plevral sıvı biyokimyası komplike efüzyon için yüksek risklidir.",
          "result": {
            "title": "Tanısal torasentez sıvı analizi",
            "summary": "Plevral sıvı biyokimyası komplike efüzyon için yüksek risklidir.",
            "interpretation": "Plevral sıvı biyokimyası komplike efüzyon için yüksek risklidir.",
            "values": [
              [
                "Görünüm",
                "Bulanık sarı sıvı",
                "Berrak",
                "Anormal"
              ],
              [
                "pH",
                "7.12",
                ">7.20",
                "Düşük"
              ],
              [
                "Glukoz",
                "38 mg/dL",
                ">60 mg/dL",
                "Düşük"
              ],
              [
                "LDH",
                "1380 U/L",
                "Seruma göre düşük beklenir",
                "Çok yüksek"
              ],
              [
                "Hücre",
                "Nötrofil baskın",
                "Lenfosit/nötrofil klinik bağlama göre",
                "Akut inflamasyon"
              ]
            ],
            "rows": [
              [
                "Görünüm",
                "Bulanık sarı sıvı",
                "Berrak",
                "Anormal"
              ],
              [
                "pH",
                "7.12",
                ">7.20",
                "Düşük"
              ],
              [
                "Glukoz",
                "38 mg/dL",
                ">60 mg/dL",
                "Düşük"
              ],
              [
                "LDH",
                "1380 U/L",
                "Seruma göre düşük beklenir",
                "Çok yüksek"
              ],
              [
                "Hücre",
                "Nötrofil baskın",
                "Lenfosit/nötrofil klinik bağlama göre",
                "Akut inflamasyon"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada plevral sıvı sonucundan sonra en uygun yönetim aşağıdakilerden hangisidir?",
      "questionType": "management",
      "answerTarget": "Komplike parapnömonik efüzyonda drenaj kararı",
      "diagnosis": {
        "correct": "Uygun antibiyotikle birlikte tüp torakostomiyle plevral drenaj sağlanması",
        "options": [
          "Ağızdan antibiyotik verilerek ayaktan kontrol randevusu planlanması",
          "Tekrarlayan torasentezlerle izlem yapılıp drenajdan kaçınılması",
          "Pulmoner emboli kabul edilerek antibiyotik verilmeden antikoagülasyon başlanması",
          "Steroid ve bronkodilatör tedaviyle plevral inflamasyonun baskılanması",
          "Uygun antibiyotikle birlikte tüp torakostomiyle plevral drenaj sağlanması"
        ],
        "question": "Bu hastada plevral sıvı sonucundan sonra en uygun yönetim aşağıdakilerden hangisidir?",
        "explanation": "Pnömoniye eşlik eden septalı plevral efüzyonda plevral sıvı pH’ının 7.20’nin altında, glukozun düşük ve LDH’nin yüksek olması antibiyotik yanında drenaj gerektiren komplike plevral enfeksiyon paternidir. Bu nedenle uygun antibiyotik tedavisi tüp torakostomiyle kaynak kontrolüyle birleştirilmelidir.",
        "pearls": [
          "Plevral sıvı pH <7.20 drenaj kararı için güçlü bir uyarıdır.",
          "Düşük glukoz ve yüksek LDH komplike enfeksiyöz efüzyonu destekler.",
          "Septasyon varsa tek antibiyotikle izlem başarısız olabilir."
        ],
        "optionFeedback": {
          "Ağızdan antibiyotik verilerek ayaktan kontrol randevusu planlanması": "Ayaktan oral antibiyotik, küçük, serbest akışlı ve biyokimyasal olarak komplike olmayan parapnömonik efüzyonlarda düşünülebilir. Bu hastada nefes darlığı artmış, ultrasonografide septasyonlar izlenmiş ve plevra sıvısında pH düşük, glukoz düşük, LDH çok yüksektir. Bu patern antibiyotiğin tek başına yeterli olmayabileceğini ve plevral boşlukta organize enfeksiyon yükü bulunduğunu gösterir. Ayaktan izlem kaynak kontrolünü geciktirir.",
          "Tekrarlayan torasentezlerle izlem yapılıp drenajdan kaçınılması": "Tekrarlayan torasentez geçici boşaltma sağlayabilir; ancak septalı ve biyokimyasal olarak komplike plevral enfeksiyonda kalıcı drenaj ihtiyacı vardır. pH 7.12 ve glukoz 38 mg/dL plevral boşlukta yoğun metabolik aktivite ve bakteri/nötrofil yükünü gösterir. Bu durumda sadece aralıklı aspirasyonla izlemek sıvının yeniden birikmesine, lokülasyonun artmasına ve ampiyem gelişimine yol açabilir.",
          "Pulmoner emboli kabul edilerek antibiyotik verilmeden antikoagülasyon başlanması": "Plöritik ağrı pulmoner embolide de görülebilir; ancak bu hastada günlerdir süren ateşli öksürük, konsolidasyon, nötrofilik plevra sıvısı ve düşük pH/glukoz enfeksiyonla ilişkili plevral süreç lehinedir. Antibiyotik verilmeden antikoagülasyon başlamak hem enfeksiyon odağını tedavisiz bırakır hem de invaziv drenaj gereksinimi olan hastada kanama riskini artırabilir. Emboli kuşkusu ayrı verilerle desteklenirse ayrıca değerlendirilir; mevcut veriler kaynak kontrolünü öne çıkarır.",
          "Steroid ve bronkodilatör tedaviyle plevral inflamasyonun baskılanması": "Steroid ve bronkodilatör tedavi bronkospazm veya inflamatuvar bazı akciğer hastalıklarında işe yarayabilir; ancak burada temel sorun plevral boşlukta enfeksiyonla ilişkili sıvı birikimi ve lokülasyondur. Muayenede belirgin wheezing değil, matite ve solunum seslerinde azalma vardır. Steroid enfeksiyon bulgularını maskeleyebilir ve plevral boşluktaki düşük pH/glukoz problemini çözmez. Asıl tedavi antibiyotik ve drenajdır.",
          "Uygun antibiyotikle birlikte tüp torakostomiyle plevral drenaj sağlanması": "Bu seçenek en uygundur. Pnömoni bulgularına eşlik eden plevral sıvıda pH <7.20, glukoz düşüklüğü, çok yüksek LDH ve septasyonlar komplike parapnömonik efüzyon/plevral enfeksiyon lehinedir. Bu durumda antibiyotik tedavisi tek başına yeterli kabul edilmez; plevral boşlukta kaynak kontrolü için tüp torakostomi ile drenaj gerekir. Drenajın zamanında yapılması sepsisin uzamasını, lokülasyonun ilerlemesini ve cerrahi gereksinimi azaltabilir."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Plevral enfeksiyonda tedavi yalnız mikrobu öldürmekten ibaret değildir; plevral boşluktaki enfekte ve loküle sıvının drenajı kaynak kontrolünün temel parçasıdır.",
      "examPearl": "Pnömoni + plevral sıvı pH 7.12 + glukoz düşük + septasyon gördüğünde cevap antibiyotik + tüp drenajdır.",
      "whyCorrect": "Doğru seçenek, antibiyotikle sistemik enfeksiyonu ve tüp torakostomiyle plevral kaynak kontrolünü aynı anda hedefler.",
      "optionComparison": "Oral antibiyotik ve izlem basit efüzyonda, tekrarlayan torasentez seçilmiş sınırlı sıvıda, antikoagülasyon embolide, steroid-bronkodilatör ise bronkospazm/inflamatuvar hava yolu hastalığında daha anlamlıdır.",
      "evidenceChain": [
        "Ateşli balgamlı öksürük ve konsolidasyon → enfeksiyöz akciğer odağı.",
        "Yan ağrısı, matite ve solunum sesinde azalma → plevral tutulum.",
        "USG’de septalı sıvı → komplike/loküle plevral süreç.",
        "pH 7.12 ve glukoz 38 mg/dL → antibiyotik yanında drenaj gereksinimi."
      ],
      "whyWrong": {
        "Ağızdan antibiyotik verilerek ayaktan kontrol randevusu planlanması": "Ayaktan oral antibiyotik, küçük, serbest akışlı ve biyokimyasal olarak komplike olmayan parapnömonik efüzyonlarda düşünülebilir. Bu hastada nefes darlığı artmış, ultrasonografide septasyonlar izlenmiş ve plevra sıvısında pH düşük, glukoz düşük, LDH çok yüksektir. Bu patern antibiyotiğin tek başına yeterli olmayabileceğini ve plevral boşlukta organize enfeksiyon yükü bulunduğunu gösterir. Ayaktan izlem kaynak kontrolünü geciktirir.",
        "Tekrarlayan torasentezlerle izlem yapılıp drenajdan kaçınılması": "Tekrarlayan torasentez geçici boşaltma sağlayabilir; ancak septalı ve biyokimyasal olarak komplike plevral enfeksiyonda kalıcı drenaj ihtiyacı vardır. pH 7.12 ve glukoz 38 mg/dL plevral boşlukta yoğun metabolik aktivite ve bakteri/nötrofil yükünü gösterir. Bu durumda sadece aralıklı aspirasyonla izlemek sıvının yeniden birikmesine, lokülasyonun artmasına ve ampiyem gelişimine yol açabilir.",
        "Pulmoner emboli kabul edilerek antibiyotik verilmeden antikoagülasyon başlanması": "Plöritik ağrı pulmoner embolide de görülebilir; ancak bu hastada günlerdir süren ateşli öksürük, konsolidasyon, nötrofilik plevra sıvısı ve düşük pH/glukoz enfeksiyonla ilişkili plevral süreç lehinedir. Antibiyotik verilmeden antikoagülasyon başlamak hem enfeksiyon odağını tedavisiz bırakır hem de invaziv drenaj gereksinimi olan hastada kanama riskini artırabilir. Emboli kuşkusu ayrı verilerle desteklenirse ayrıca değerlendirilir; mevcut veriler kaynak kontrolünü öne çıkarır.",
        "Steroid ve bronkodilatör tedaviyle plevral inflamasyonun baskılanması": "Steroid ve bronkodilatör tedavi bronkospazm veya inflamatuvar bazı akciğer hastalıklarında işe yarayabilir; ancak burada temel sorun plevral boşlukta enfeksiyonla ilişkili sıvı birikimi ve lokülasyondur. Muayenede belirgin wheezing değil, matite ve solunum seslerinde azalma vardır. Steroid enfeksiyon bulgularını maskeleyebilir ve plevral boşluktaki düşük pH/glukoz problemini çözmez. Asıl tedavi antibiyotik ve drenajdır."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v285",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "feedbackAudit": "passed",
        "schemaReference": "v280-v284-render-safe-standard-cases"
      },
      "findings": [
        "Pnömoni bulguları + efüzyon → parapnömonik süreç.",
        "pH düşük/glukoz düşük → komplike efüzyon.",
        "Septasyon → drenaj ihtiyacı."
      ],
      "images": []
    },
  {
      "id": "v285-new-617-cay-rengi-idrar-ve-kas-agrisi",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Çay rengi idrar ve kas ağrısı",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Uzun süre immobilizasyon sonrası gelişen koyu idrar, CK yüksekliği ve akut böbrek etkileniminde pigment nefropatisi mekanizmasını tanıma.",
      "learningTarget": "Dipstick kan pozitifliği-mikroskopide eritrosit yokluğu, çok yüksek CK, hiperpotasemi ve kreatinin artışını miyoglobin aracılı tübüler hasarla ilişkilendirebilme.",
      "demographics": "72 yaşında erkek hasta",
      "setting": "Acil servis",
      "chiefComplaint": "Hasta, evde yerde kaldıktan sonra yaygın kas ağrısı ve koyu renkli idrar nedeniyle getiriliyor.",
      "stem": "Hasta gece banyoya giderken ayağının kaydığını ve kalçasının üzerine düştükten sonra uzun süre kalkamadığını anlatır. Sabah komşusu tarafından bulunduğunda yaklaşık sekiz saattir yerde olduğunu, özellikle uyluk ve omuz kaslarında ezilme tarzı ağrı hissettiğini söyler. Gün içinde idrarının çay rengine döndüğünü ve miktarının azaldığını fark etmiştir. Düzenli statin kullandığını belirtir; düşmeden önce ateş, yan ağrısı veya idrar yaparken yanma tariflemez. Bacağını hareket ettirebilmekte ancak kas ağrısı nedeniyle ayağa kalkmakta zorlanmaktadır.",
      "patientIntro": {
        "profile": "72 yaşında erkek hasta, acil servis başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, evde yerde kaldıktan sonra yaygın kas ağrısı ve koyu renkli idrar nedeniyle getiriliyor.",
        "historySummary": "Hasta gece banyoya giderken ayağının kaydığını ve kalçasının üzerine düştükten sonra uzun süre kalkamadığını anlatır. Sabah komşusu tarafından bulunduğunda yaklaşık sekiz saattir yerde olduğunu, özellikle uyluk ve omuz kaslarında ezilme tarzı ağrı hissettiğini söyler. Gün içinde idrarının çay rengine döndüğünü ve miktarının azaldığını fark etmiştir. Düzenli statin kullandığını belirtir; düşmeden önce ateş, yan ağrısı veya idrar yaparken yanma tariflemez. Bacağını hareket ettirebilmekte ancak kas ağrısı nedeniyle ayağa kalkmakta zorlanmaktadır."
      },
      "vitals": {
        "TA": "108/66 mmHg",
        "Nabız": "104/dk",
        "Solunum": "20/dk",
        "SpO2": "%95, oda havasında",
        "Ateş": "36.9 °C",
        "Şok indeksi": "0.96; mukozalar kuru, kapiller dolum 3 saniye"
      },
      "exam": [
        "Uyluk ve omuz kuşağı kaslarında yaygın palpasyon hassasiyeti vardır.",
        "Alt ekstremite distal nabızları alınır; belirgin kompartman gerginliği yoktur.",
        "Kostovertebral açı hassasiyeti saptanmaz.",
        "Ciltte basıya bağlı yüzeyel eritem alanları vardır; yaygın döküntü veya ürtiker yoktur."
      ],
      "investigations": [
        {
          "id": "v285-new-617-cay-rengi-idrar-ve-kas-agrisi-kas-enzimleri",
          "label": "Kas enzimleri ve elektrolitler",
          "title": "Kas enzimleri ve elektrolitler",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Kas enzimleri ve elektrolitler",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Kas yıkımı ve hücre içi iyon salınımı belirgindir.",
          "clinicalMeaning": "Kas yıkımı ve hücre içi iyon salınımı belirgindir.",
          "result": {
            "title": "Kas enzimleri ve elektrolitler",
            "summary": "Kas yıkımı ve hücre içi iyon salınımı belirgindir.",
            "interpretation": "Kas yıkımı ve hücre içi iyon salınımı belirgindir.",
            "values": [
              [
                "Kreatin kinaz",
                "34.600 U/L",
                "<200 U/L",
                "Çok yüksek"
              ],
              [
                "Potasyum",
                "5.9 mmol/L",
                "3.5-5.1 mmol/L",
                "Yüksek"
              ],
              [
                "Fosfor",
                "5.8 mg/dL",
                "2.5-4.5 mg/dL",
                "Yüksek"
              ],
              [
                "Kalsiyum",
                "7.7 mg/dL",
                "8.6-10.2 mg/dL",
                "Düşük"
              ]
            ],
            "rows": [
              [
                "Kreatin kinaz",
                "34.600 U/L",
                "<200 U/L",
                "Çok yüksek"
              ],
              [
                "Potasyum",
                "5.9 mmol/L",
                "3.5-5.1 mmol/L",
                "Yüksek"
              ],
              [
                "Fosfor",
                "5.8 mg/dL",
                "2.5-4.5 mg/dL",
                "Yüksek"
              ],
              [
                "Kalsiyum",
                "7.7 mg/dL",
                "8.6-10.2 mg/dL",
                "Düşük"
              ]
            ]
          }
        },
        {
          "id": "v285-new-617-cay-rengi-idrar-ve-kas-agrisi-renal-panel",
          "label": "Böbrek fonksiyonu ve asit-baz",
          "title": "Böbrek fonksiyonu ve asit-baz",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Böbrek fonksiyonu ve asit-baz",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Akut böbrek etkilenimi ve hafif metabolik asidoz vardır.",
          "clinicalMeaning": "Akut böbrek etkilenimi ve hafif metabolik asidoz vardır.",
          "result": {
            "title": "Böbrek fonksiyonu ve asit-baz",
            "summary": "Akut böbrek etkilenimi ve hafif metabolik asidoz vardır.",
            "interpretation": "Akut böbrek etkilenimi ve hafif metabolik asidoz vardır.",
            "values": [
              [
                "Kreatinin",
                "2.2 mg/dL",
                "0.7-1.2 mg/dL",
                "Yüksek"
              ],
              [
                "BUN",
                "42 mg/dL",
                "7-20 mg/dL",
                "Yüksek"
              ],
              [
                "HCO3-",
                "18 mmol/L",
                "22-26 mmol/L",
                "Düşük"
              ],
              [
                "Laktat",
                "1.8 mmol/L",
                "<2.0 mmol/L",
                "Normal sınıra yakın"
              ]
            ],
            "rows": [
              [
                "Kreatinin",
                "2.2 mg/dL",
                "0.7-1.2 mg/dL",
                "Yüksek"
              ],
              [
                "BUN",
                "42 mg/dL",
                "7-20 mg/dL",
                "Yüksek"
              ],
              [
                "HCO3-",
                "18 mmol/L",
                "22-26 mmol/L",
                "Düşük"
              ],
              [
                "Laktat",
                "1.8 mmol/L",
                "<2.0 mmol/L",
                "Normal sınıra yakın"
              ]
            ]
          }
        },
        {
          "id": "v285-new-617-cay-rengi-idrar-ve-kas-agrisi-idrar",
          "label": "Tam idrar tetkiki ve mikroskopi",
          "title": "Tam idrar tetkiki ve mikroskopi",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Tam idrar tetkiki ve mikroskopi",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Dipstick kan pozitifliği ile mikroskopide eritrosit azlığı pigment varlığını destekler.",
          "clinicalMeaning": "Dipstick kan pozitifliği ile mikroskopide eritrosit azlığı pigment varlığını destekler.",
          "result": {
            "title": "Tam idrar tetkiki ve mikroskopi",
            "summary": "Dipstick kan pozitifliği ile mikroskopide eritrosit azlığı pigment varlığını destekler.",
            "interpretation": "Dipstick kan pozitifliği ile mikroskopide eritrosit azlığı pigment varlığını destekler.",
            "values": [
              [
                "Dipstick kan",
                "3+",
                "Negatif",
                "Pozitif"
              ],
              [
                "Mikroskopide eritrosit",
                "0-2/hpf",
                "0-3/hpf",
                "Normal"
              ],
              [
                "Protein",
                "1+",
                "Negatif",
                "Hafif pozitif"
              ],
              [
                "Silendir",
                "Granüler silendirler",
                "Yok",
                "Tübüler hasar destekli"
              ]
            ],
            "rows": [
              [
                "Dipstick kan",
                "3+",
                "Negatif",
                "Pozitif"
              ],
              [
                "Mikroskopide eritrosit",
                "0-2/hpf",
                "0-3/hpf",
                "Normal"
              ],
              [
                "Protein",
                "1+",
                "Negatif",
                "Hafif pozitif"
              ],
              [
                "Silendir",
                "Granüler silendirler",
                "Yok",
                "Tübüler hasar destekli"
              ]
            ]
          }
        },
        {
          "id": "v285-new-617-cay-rengi-idrar-ve-kas-agrisi-renal-usg",
          "label": "Böbrek ultrasonografisi",
          "title": "Böbrek ultrasonografisi",
          "type": "imaging",
          "priority": "important",
          "subtype": "Böbrek ultrasonografisi",
          "category": "imaging",
          "testTypeCategory": "imaging",
          "summary": "Postrenal tıkanıklık lehine bulgu izlenmez.",
          "clinicalMeaning": "Postrenal tıkanıklık lehine bulgu izlenmez.",
          "result": {
            "title": "Böbrek ultrasonografisi",
            "summary": "Postrenal tıkanıklık lehine bulgu izlenmez.",
            "interpretation": "Postrenal tıkanıklık lehine bulgu izlenmez.",
            "values": [
              [
                "Hidronefroz",
                "Yok",
                "Yok",
                "Obstrüksiyon desteklenmiyor"
              ],
              [
                "Mesane rezidüsü",
                "60 mL",
                "<100 mL",
                "Belirgin retansiyon yok"
              ],
              [
                "Böbrek boyutları",
                "Normal sınırlarda",
                "Normal",
                "Kronik atrofi yok"
              ]
            ],
            "rows": [
              [
                "Hidronefroz",
                "Yok",
                "Yok",
                "Obstrüksiyon desteklenmiyor"
              ],
              [
                "Mesane rezidüsü",
                "60 mL",
                "<100 mL",
                "Belirgin retansiyon yok"
              ],
              [
                "Böbrek boyutları",
                "Normal sınırlarda",
                "Normal",
                "Kronik atrofi yok"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastadaki böbrek etkilenimini en iyi açıklayan süreç aşağıdakilerden hangisidir?",
      "questionType": "mechanism",
      "answerTarget": "Rabdomiyolize bağlı akut böbrek hasarı mekanizması",
      "diagnosis": {
        "correct": "Miyoglobin silendirleri ve oksidatif tübüler hasarla gelişen pigment nefropatisi",
        "options": [
          "Renal arter stenozuna bağlı kronik renal hipoperfüzyon",
          "Miyoglobin silendirleri ve oksidatif tübüler hasarla gelişen pigment nefropatisi",
          "Anti-GBM antikorlarıyla glomerüler bazal membran yıkımı",
          "Distal üreter taşına bağlı postrenal basınç artışı",
          "İlaç ilişkili eozinofilik akut interstisyel nefrit"
        ],
        "question": "Bu hastadaki böbrek etkilenimini en iyi açıklayan süreç aşağıdakilerden hangisidir?",
        "explanation": "Uzun süre yerde kalma sonrası yaygın kas ağrısı, çay rengi idrar, çok yüksek CK, hiperpotasemi ve dipstick kan pozitifliğiyle eritrosit yokluğu miyoglobinüriyi destekler. Miyoglobin tübüler çökelme, renal vazokonstriksiyon ve oksidatif toksisite üzerinden pigment nefropatisi/akut tübüler hasar oluşturur.",
        "pearls": [
          "Dipstick kan pozitif + mikroskopide eritrosit yoksa miyoglobin veya hemoglobin düşün.",
          "Rabdomiyolizde erken kristalloid sıvı ve potasyum izlemi hayatidir.",
          "CK yüksekliği tek başına değil böbrek fonksiyonu, idrar çıkışı ve elektrolitlerle birlikte değerlendirilir."
        ],
        "optionFeedback": {
          "Renal arter stenozuna bağlı kronik renal hipoperfüzyon": "Renal arter stenozu genellikle dirençli hipertansiyon, ACE inhibitörü/ARB sonrası kreatinin artışı, abdominal üfürüm veya asimetrik böbrek boyutu gibi ipuçlarıyla düşünülür. Bu vakada öykü uzun süre yerde kalma, yaygın kas ağrısı, koyu idrar ve çok yüksek CK etrafında şekillenmiştir. İdrar dipstick’inde kan pozitifken mikroskopide eritrosit olmaması hemoglobin/miyoglobin varlığını düşündürür; kronik renal hipoperfüzyon bu paterni açıklamaz.",
          "Miyoglobin silendirleri ve oksidatif tübüler hasarla gelişen pigment nefropatisi": "Bu seçenek en uygundur. Uzun süre immobil kalma sonrası kas hücreleri parçalanır; potasyum, fosfat, CK ve miyoglobin dolaşıma salınır. Miyoglobin özellikle hipovolemi ve asidik idrar ortamında tübüllerde çökelerek silendir oluşturabilir, renal vazokonstriksiyon ve oksidatif hasarla akut tübüler hasara yol açabilir. Dipstick kan pozitifliğiyle mikroskopide eritrosit görülmemesi de miyoglobinüri lehine klasik bir ayrımdır. Tedavide erken kristalloid sıvı resüsitasyonu ve hiperkalemi izlemi kritik önemdedir.",
          "Anti-GBM antikorlarıyla glomerüler bazal membran yıkımı": "Anti-GBM hastalığında hemoptizi, hızlı yükselen kreatinin, aktif idrar sedimenti, eritrosit silendirleri ve serolojik/immünfloresan bulgular beklenir. Bu hastada ana bulgular travma/immobilizasyon sonrası kas ağrısı, CK yüksekliği, hiperpotasemi ve miyoglobinüri paternidir. İdrar mikroskopisinde eritrosit silendirleri değil, dipstick-mikroskopi uyumsuzluğu ön plandadır. Bu nedenle glomerüler bazal membran yıkımı mevcut tabloyu açıklamada zayıftır.",
          "Distal üreter taşına bağlı postrenal basınç artışı": "Postrenal obstrüksiyon yan ağrısı, hidronefroz, idrar retansiyonu veya görüntülemede tıkanma bulgularıyla düşünülür. Üreter taşı idrarda gerçek eritrosit artışı yapabilir; dipstick kan pozitifliğiyle eritrosit yokluğu beklenen patern değildir. Bu vakada renal ultrasonografide hidronefroz olmaması ve CK’nin çok yüksek olması postrenal basınç artışını geri plana iter. Asıl sorun kas yıkımı ürünlerinin böbrek tübüllerine toksik etkisidir.",
          "İlaç ilişkili eozinofilik akut interstisyel nefrit": "Akut interstisyel nefrit genellikle yeni antibiyotik/NSAİİ/proton pompa inhibitörü kullanımı, ateş, döküntü, eozinofili, steril piyüri veya lökosit silendirleriyle ilişkilidir. Bu hastada yeni ilaç öyküsü değil uzun süre basıya maruz kalma ve yaygın kas ağrısı vardır. CK yüksekliği ve miyoglobinüri interstisyel alerjik inflamasyondan çok rabdomiyoliz kaynaklı tübüler hasarı destekler. Eozinofilik AİN bu laboratuvar paternini bütüncül açıklamaz."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Rabdomiyoliz kas hücre bütünlüğünün bozulmasıdır; böbrek hasarı doğrudan glomerüler immün saldırıdan çok miyoglobin ve hipovolemi aracılı tübüler hasar üzerinden gelişir.",
      "examPearl": "Çay rengi idrar + CK on binler + dipstick kan 3+ ama eritrosit yok = miyoglobinüriyi yakala.",
      "whyCorrect": "Doğru seçenek, kas yıkımı sonrası ortaya çıkan miyoglobinin tübüler düzeyde oluşturduğu pigment nefropatisini ve akut böbrek hasarını açıklar.",
      "optionComparison": "Renal arter stenozu kronik perfüzyon, anti-GBM glomerüler hasar, üreter taşı postrenal obstrüksiyon, AİN ise interstisyel immün reaksiyon mekanizmasıdır; hiçbiri CK-miyoglobin paternini bu kadar iyi açıklamaz.",
      "evidenceChain": [
        "Uzun süre yerde kalma ve kas ağrısı → kas basısı/yıkımı için güçlü öykü.",
        "CK 34.600 U/L → belirgin kas hücresi hasarı.",
        "Potasyum ve fosfor yüksekliği → hücre içi iyonların salınımı.",
        "Dipstick kan 3+ ancak eritrosit 0-2/hpf → miyoglobinüri lehine uyumsuzluk.",
        "Kreatinin yüksekliği ve granüler silendir → akut tübüler etkilenim."
      ],
      "whyWrong": {
        "Renal arter stenozuna bağlı kronik renal hipoperfüzyon": "Renal arter stenozu genellikle dirençli hipertansiyon, ACE inhibitörü/ARB sonrası kreatinin artışı, abdominal üfürüm veya asimetrik böbrek boyutu gibi ipuçlarıyla düşünülür. Bu vakada öykü uzun süre yerde kalma, yaygın kas ağrısı, koyu idrar ve çok yüksek CK etrafında şekillenmiştir. İdrar dipstick’inde kan pozitifken mikroskopide eritrosit olmaması hemoglobin/miyoglobin varlığını düşündürür; kronik renal hipoperfüzyon bu paterni açıklamaz.",
        "Anti-GBM antikorlarıyla glomerüler bazal membran yıkımı": "Anti-GBM hastalığında hemoptizi, hızlı yükselen kreatinin, aktif idrar sedimenti, eritrosit silendirleri ve serolojik/immünfloresan bulgular beklenir. Bu hastada ana bulgular travma/immobilizasyon sonrası kas ağrısı, CK yüksekliği, hiperpotasemi ve miyoglobinüri paternidir. İdrar mikroskopisinde eritrosit silendirleri değil, dipstick-mikroskopi uyumsuzluğu ön plandadır. Bu nedenle glomerüler bazal membran yıkımı mevcut tabloyu açıklamada zayıftır.",
        "Distal üreter taşına bağlı postrenal basınç artışı": "Postrenal obstrüksiyon yan ağrısı, hidronefroz, idrar retansiyonu veya görüntülemede tıkanma bulgularıyla düşünülür. Üreter taşı idrarda gerçek eritrosit artışı yapabilir; dipstick kan pozitifliğiyle eritrosit yokluğu beklenen patern değildir. Bu vakada renal ultrasonografide hidronefroz olmaması ve CK’nin çok yüksek olması postrenal basınç artışını geri plana iter. Asıl sorun kas yıkımı ürünlerinin böbrek tübüllerine toksik etkisidir.",
        "İlaç ilişkili eozinofilik akut interstisyel nefrit": "Akut interstisyel nefrit genellikle yeni antibiyotik/NSAİİ/proton pompa inhibitörü kullanımı, ateş, döküntü, eozinofili, steril piyüri veya lökosit silendirleriyle ilişkilidir. Bu hastada yeni ilaç öyküsü değil uzun süre basıya maruz kalma ve yaygın kas ağrısı vardır. CK yüksekliği ve miyoglobinüri interstisyel alerjik inflamasyondan çok rabdomiyoliz kaynaklı tübüler hasarı destekler. Eozinofilik AİN bu laboratuvar paternini bütüncül açıklamaz."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v285",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "feedbackAudit": "passed",
        "schemaReference": "v280-v284-render-safe-standard-cases"
      },
      "findings": [
        "İmmobilizasyon + kas ağrısı → rabdomiyoliz riski.",
        "CK çok yüksek → kas yıkımı.",
        "Dipstick/mikroskopi uyumsuzluğu → miyoglobinüri."
      ],
      "images": []
    },
  {
      "id": "v285-new-618-sol-ust-kadran-dolgunlugu-ve-lokositoz",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Sol üst kadran dolgunluğu ve lökositoz",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Kronik seyirli lökositoz, bazofili ve splenomegali paterninde temel moleküler olayı seçme.",
      "learningTarget": "Granülositik seri boyunca sola kayma, düşük blast oranı, bazofili ve splenomegaliyi BCR-ABL1 aracılı miyeloproliferasyonla ilişkilendirebilme.",
      "demographics": "52 yaşında kadın hasta",
      "setting": "Hematoloji polikliniği",
      "chiefComplaint": "Hasta, halsizlik ve sol üst karında dolgunluk hissi nedeniyle polikliniğe başvuruyor.",
      "stem": "Hasta son üç aydır çabuk yorulduğunu ve yemeklerden sonra erken doyduğunu anlatır. Sol kaburga altında dolgunluk hissi özellikle uzun süre oturunca belirginleşmiş, son haftalarda pantolon kemerini sıkı bağlamak istemediğini fark etmiştir. Ateş, gece terlemesi veya belirgin enfeksiyon odağı tariflemez; diş eti kanaması veya morarma fark etmemiştir. Daha önce bilinen hematolojik hastalığı yoktur ve yeni kortikosteroid kullanımı olmadığını söyler. Aile hekimi kontrolünde lökosit sayısı çok yüksek bulununca ileri değerlendirme için yönlendirilmiştir.",
      "patientIntro": {
        "profile": "52 yaşında kadın hasta, hematoloji polikliniği başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, halsizlik ve sol üst karında dolgunluk hissi nedeniyle polikliniğe başvuruyor.",
        "historySummary": "Hasta son üç aydır çabuk yorulduğunu ve yemeklerden sonra erken doyduğunu anlatır. Sol kaburga altında dolgunluk hissi özellikle uzun süre oturunca belirginleşmiş, son haftalarda pantolon kemerini sıkı bağlamak istemediğini fark etmiştir. Ateş, gece terlemesi veya belirgin enfeksiyon odağı tariflemez; diş eti kanaması veya morarma fark etmemiştir. Daha önce bilinen hematolojik hastalığı yoktur ve yeni kortikosteroid kullanımı olmadığını söyler. Aile hekimi kontrolünde lökosit sayısı çok yüksek bulununca ileri değerlendirme için yönlendirilmiştir."
      },
      "vitals": {
        "TA": "122/74 mmHg",
        "Nabız": "88/dk",
        "Solunum": "16/dk",
        "SpO2": "%98, oda havasında",
        "Ateş": "36.6 °C",
        "Şok indeksi": "0.72; genel perfüzyon iyi, akut toksik görünüm yok"
      },
      "exam": [
        "Dalak kot kavsinin yaklaşık 6 cm altında palpabl ve hafif hassastır.",
        "Yaygın ağrılı lenfadenopati saptanmaz.",
        "Peteşi, purpura veya mukozal kanama yoktur.",
        "Sternum palpasyonunda hafif hassasiyet tarifler."
      ],
      "investigations": [
        {
          "id": "v285-new-618-sol-ust-kadran-dolgunlugu-ve-lokositoz-hemogram",
          "label": "Hemogram ve diferansiyel lökosit sayımı",
          "title": "Hemogram ve diferansiyel lökosit sayımı",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Hemogram ve diferansiyel lökosit sayımı",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Çok belirgin lökositoz, bazofili ve trombositoz vardır; blast oranı akut lösemi düzeyinde değildir.",
          "clinicalMeaning": "Çok belirgin lökositoz, bazofili ve trombositoz vardır; blast oranı akut lösemi düzeyinde değildir.",
          "result": {
            "title": "Hemogram ve diferansiyel lökosit sayımı",
            "summary": "Çok belirgin lökositoz, bazofili ve trombositoz vardır; blast oranı akut lösemi düzeyinde değildir.",
            "interpretation": "Çok belirgin lökositoz, bazofili ve trombositoz vardır; blast oranı akut lösemi düzeyinde değildir.",
            "values": [
              [
                "Lökosit",
                "118.000/µL",
                "4.000-10.000/µL",
                "Çok yüksek"
              ],
              [
                "Hemoglobin",
                "10.9 g/dL",
                "12-16 g/dL",
                "Düşük"
              ],
              [
                "Trombosit",
                "642.000/µL",
                "150.000-400.000/µL",
                "Yüksek"
              ],
              [
                "Bazofil",
                "%8",
                "<%1",
                "Yüksek"
              ],
              [
                "Blast",
                "%2",
                "<%5",
                "Düşük oran"
              ]
            ],
            "rows": [
              [
                "Lökosit",
                "118.000/µL",
                "4.000-10.000/µL",
                "Çok yüksek"
              ],
              [
                "Hemoglobin",
                "10.9 g/dL",
                "12-16 g/dL",
                "Düşük"
              ],
              [
                "Trombosit",
                "642.000/µL",
                "150.000-400.000/µL",
                "Yüksek"
              ],
              [
                "Bazofil",
                "%8",
                "<%1",
                "Yüksek"
              ],
              [
                "Blast",
                "%2",
                "<%5",
                "Düşük oran"
              ]
            ]
          }
        },
        {
          "id": "v285-new-618-sol-ust-kadran-dolgunlugu-ve-lokositoz-periferik-yayma",
          "label": "Periferik yayma",
          "title": "Periferik yayma",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Periferik yayma",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Granülositik serinin farklı olgunlaşma basamakları dolaşımda izlenir.",
          "clinicalMeaning": "Granülositik serinin farklı olgunlaşma basamakları dolaşımda izlenir.",
          "result": {
            "title": "Periferik yayma",
            "summary": "Granülositik serinin farklı olgunlaşma basamakları dolaşımda izlenir.",
            "interpretation": "Granülositik serinin farklı olgunlaşma basamakları dolaşımda izlenir.",
            "values": [
              [
                "Miyelosit/metamiyelosit",
                "Belirgin artmış",
                "Yok/çok az",
                "Sola kayma"
              ],
              [
                "Segmentli nötrofil",
                "Artmış",
                "Normal aralık",
                "Granülositik proliferasyon"
              ],
              [
                "Bazofil/eozinofil",
                "Bazofili eşlik ediyor",
                "Belirgin değil",
                "Miyeloproliferatif ipucu"
              ],
              [
                "Auer çubuğu",
                "İzlenmedi",
                "Yok",
                "APL desteklenmiyor"
              ]
            ],
            "rows": [
              [
                "Miyelosit/metamiyelosit",
                "Belirgin artmış",
                "Yok/çok az",
                "Sola kayma"
              ],
              [
                "Segmentli nötrofil",
                "Artmış",
                "Normal aralık",
                "Granülositik proliferasyon"
              ],
              [
                "Bazofil/eozinofil",
                "Bazofili eşlik ediyor",
                "Belirgin değil",
                "Miyeloproliferatif ipucu"
              ],
              [
                "Auer çubuğu",
                "İzlenmedi",
                "Yok",
                "APL desteklenmiyor"
              ]
            ]
          }
        },
        {
          "id": "v285-new-618-sol-ust-kadran-dolgunlugu-ve-lokositoz-biyokimya",
          "label": "Hücre döngüsü ve metabolik yük göstergeleri",
          "title": "Hücre döngüsü ve metabolik yük göstergeleri",
          "type": "laboratory",
          "priority": "important",
          "subtype": "Hücre döngüsü ve metabolik yük göstergeleri",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Hücre dönüşüm yükü artmıştır; akut tümör lizis tablosu yoktur.",
          "clinicalMeaning": "Hücre dönüşüm yükü artmıştır; akut tümör lizis tablosu yoktur.",
          "result": {
            "title": "Hücre döngüsü ve metabolik yük göstergeleri",
            "summary": "Hücre dönüşüm yükü artmıştır; akut tümör lizis tablosu yoktur.",
            "interpretation": "Hücre dönüşüm yükü artmıştır; akut tümör lizis tablosu yoktur.",
            "values": [
              [
                "Ürik asit",
                "8.9 mg/dL",
                "2.5-6.8 mg/dL",
                "Yüksek"
              ],
              [
                "LDH",
                "690 U/L",
                "<250 U/L",
                "Yüksek"
              ],
              [
                "Kreatinin",
                "0.86 mg/dL",
                "0.6-1.1 mg/dL",
                "Normal"
              ],
              [
                "Lökosit alkalen fosfataz skoru",
                "Düşük",
                "Normal/yüksek",
                "Miyeloid klonal süreç lehine"
              ]
            ],
            "rows": [
              [
                "Ürik asit",
                "8.9 mg/dL",
                "2.5-6.8 mg/dL",
                "Yüksek"
              ],
              [
                "LDH",
                "690 U/L",
                "<250 U/L",
                "Yüksek"
              ],
              [
                "Kreatinin",
                "0.86 mg/dL",
                "0.6-1.1 mg/dL",
                "Normal"
              ],
              [
                "Lökosit alkalen fosfataz skoru",
                "Düşük",
                "Normal/yüksek",
                "Miyeloid klonal süreç lehine"
              ]
            ]
          }
        },
        {
          "id": "v285-new-618-sol-ust-kadran-dolgunlugu-ve-lokositoz-batin-usg",
          "label": "Abdomen ultrasonografisi",
          "title": "Abdomen ultrasonografisi",
          "type": "imaging",
          "priority": "important",
          "subtype": "Abdomen ultrasonografisi",
          "category": "imaging",
          "testTypeCategory": "imaging",
          "summary": "Splenomegali belirgindir; fokal dalak lezyonu izlenmez.",
          "clinicalMeaning": "Splenomegali belirgindir; fokal dalak lezyonu izlenmez.",
          "result": {
            "title": "Abdomen ultrasonografisi",
            "summary": "Splenomegali belirgindir; fokal dalak lezyonu izlenmez.",
            "interpretation": "Splenomegali belirgindir; fokal dalak lezyonu izlenmez.",
            "values": [
              [
                "Dalak uzun aks",
                "19 cm",
                "<12 cm",
                "Büyük"
              ],
              [
                "Karaciğer",
                "Hafif büyümüş",
                "Normal",
                "Eşlikçi olabilir"
              ],
              [
                "Fokal lezyon",
                "Yok",
                "Yok",
                "Kitle lehine değil"
              ]
            ],
            "rows": [
              [
                "Dalak uzun aks",
                "19 cm",
                "<12 cm",
                "Büyük"
              ],
              [
                "Karaciğer",
                "Hafif büyümüş",
                "Normal",
                "Eşlikçi olabilir"
              ],
              [
                "Fokal lezyon",
                "Yok",
                "Yok",
                "Kitle lehine değil"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastadaki klinik-laboratuvar paternini en iyi açıklayan temel moleküler olay aşağıdakilerden hangisidir?",
      "questionType": "mechanism",
      "answerTarget": "Miyeloproliferatif lökositozda temel moleküler mekanizma",
      "diagnosis": {
        "correct": "BCR-ABL1 füzyonuna bağlı konstitutif tirozin kinaz aktivitesi",
        "options": [
          "JAK2 V617F mutasyonuyla eritroid ve megakaryositik klonal proliferasyon",
          "PML-RARA füzyonuyla promiyelosit farklılaşmasının bloke olması",
          "BCR-ABL1 füzyonuna bağlı konstitutif tirozin kinaz aktivitesi",
          "BCL2 aşırı ekspresyonuyla germinal merkez B hücresinin apoptozdan kaçması",
          "CALR mutasyonuyla izole megakaryositik proliferasyon ve trombositoz"
        ],
        "question": "Bu hastadaki klinik-laboratuvar paternini en iyi açıklayan temel moleküler olay aşağıdakilerden hangisidir?",
        "explanation": "Masif lökositoz, granülositik seri boyunca sola kayma, bazofili, trombositoz ve splenomegali BCR-ABL1 ilişkili kronik miyeloid proliferasyon paternini destekler. Temel olay Philadelphia kromozomuna bağlı BCR-ABL1 füzyonu ve konstitutif tirozin kinaz aktivitesidir.",
        "pearls": [
          "CML için bazofili çok değerli bir ipucudur.",
          "Düşük blast oranı kronik faz lehinedir; Auer çubuğu/APL bulgusu beklenmez.",
          "Tanısal doğrulama BCR-ABL1 gösterimiyle yapılır."
        ],
        "optionFeedback": {
          "JAK2 V617F mutasyonuyla eritroid ve megakaryositik klonal proliferasyon": "JAK2 V617F mutasyonu polisitemia vera, esansiyel trombositemi ve primer miyelofibroz gibi BCR-ABL1 negatif miyeloproliferatif neoplazilerde tipik olabilir. Bu hastada belirgin lökositoz, granülositik seri boyunca sola kayma, bazofili ve masif splenomegali ön plandadır. Hemoglobin artışı değil hafif anemi vardır; trombositoz eşlik etse de tablo izole JAK2 ilişkili eritroid/megakaryositik proliferasyonla açıklanmaz. Ayırıcı noktada bazofili ve BCR-ABL1 ekseni önemlidir.",
          "PML-RARA füzyonuyla promiyelosit farklılaşmasının bloke olması": "PML-RARA füzyonu akut promiyelositik lösemiyle ilişkilidir ve tipik olarak promiyelosit baskınlığı, kanama/DIC riski ve akut lösemi kliniğiyle gündeme gelir. Bu vakada blast oranı düşük, granülositik serinin tüm olgunlaşma basamakları dolaşımda ve süreç daha kronik seyirlidir. Diş eti kanaması, yaygın purpura veya DIC laboratuvarı yoktur. Bu nedenle promiyelosit farklılaşma bloğu mevcut lökositoz paternini açıklamaz.",
          "BCR-ABL1 füzyonuna bağlı konstitutif tirozin kinaz aktivitesi": "Bu seçenek en uygundur. Belirgin lökositoz, bazofili, sola kaymış granülositik seri, trombositoz ve splenomegali kronik faz bir miyeloproliferatif tabloyu destekler. Bu paternin temel moleküler olayı Philadelphia kromozomuyla ilişkili BCR-ABL1 füzyonudur; oluşan konstitutif tirozin kinaz aktivitesi granülositik proliferasyonu ve splenik ekstramedüller hematopoezi tetikler. Tanı BCR-ABL1 gösterimiyle doğrulanır ve tedavi mantığı tirozin kinaz inhibisyonuna dayanır.",
          "BCL2 aşırı ekspresyonuyla germinal merkez B hücresinin apoptozdan kaçması": "BCL2 aşırı ekspresyonu t(14;18) ile foliküler lenfomada klasik bir mekanizmadır. Foliküler lenfomada genellikle ağrısız lenfadenopati ve lenfoid hücre proliferasyonu beklenir; periferik yaymada granülositik seri boyunca sola kayma ve bazofili ana patern değildir. Bu hastada belirgin splenomegali olabilir; ancak laboratuvar miyeloid seri proliferasyonunu göstermektedir. Apoptozdan kaçan germinal merkez B hücresi mekanizması bu tabloyu karşılamaz.",
          "CALR mutasyonuyla izole megakaryositik proliferasyon ve trombositoz": "CALR mutasyonları özellikle JAK2 negatif esansiyel trombositemi veya primer miyelofibrozda görülebilir. İzole veya baskın trombositoz, megakaryositik proliferasyon ve bazen splenomegali beklenebilir; ancak bu hastadaki temel bulgu dev lökositoz, bazofili ve olgunlaşan miyeloid seri artışıdır. Trombosit yüksekliği eşlikçi olabilir fakat ana süreci açıklamaz. Bu nedenle BCR-ABL1 dışı izole megakaryositik proliferasyon ikinci plandadır."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "BCR-ABL1 füzyonu tirozin kinazı sürekli aktif tutarak özellikle granülositik seride klonal proliferasyon yaratır; bu nedenle tanı ve tedavi mantığı moleküler hedefe dayanır.",
      "examPearl": "Lökosit 100 bin üstü + sola kayma + bazofili + splenomegali gördüğünde CML/BCR-ABL1 eksenini düşün.",
      "whyCorrect": "Doğru seçenek, hastadaki bazofili, olgunlaşan miyeloid seri artışı ve splenomegaliyi tek bir klonal tirozin kinaz aktivitesiyle açıklar.",
      "optionComparison": "JAK2/CALR BCR-ABL1 negatif MPN’leri, PML-RARA akut promiyelositik lösemiyi, BCL2 foliküler lenfomayı açıklar; bu vaka ise miyeloid seri boyunca olgunlaşma ve bazofiliyle BCR-ABL1 paternindedir.",
      "evidenceChain": [
        "Erken doyma ve palpabl dalak → splenomegaliye bağlı kitle etkisi.",
        "Lökosit 118.000/µL → belirgin miyeloid proliferasyon.",
        "Bazofil %8 → CML için ayırt ettirici ipucu.",
        "Blast %2 ve Auer çubuğu yokluğu → akut lösemi/APL paterninden uzaklaşma.",
        "Düşük LAP skoru → reaktif lökositozdan klonal sürece yönelme."
      ],
      "whyWrong": {
        "JAK2 V617F mutasyonuyla eritroid ve megakaryositik klonal proliferasyon": "JAK2 V617F mutasyonu polisitemia vera, esansiyel trombositemi ve primer miyelofibroz gibi BCR-ABL1 negatif miyeloproliferatif neoplazilerde tipik olabilir. Bu hastada belirgin lökositoz, granülositik seri boyunca sola kayma, bazofili ve masif splenomegali ön plandadır. Hemoglobin artışı değil hafif anemi vardır; trombositoz eşlik etse de tablo izole JAK2 ilişkili eritroid/megakaryositik proliferasyonla açıklanmaz. Ayırıcı noktada bazofili ve BCR-ABL1 ekseni önemlidir.",
        "PML-RARA füzyonuyla promiyelosit farklılaşmasının bloke olması": "PML-RARA füzyonu akut promiyelositik lösemiyle ilişkilidir ve tipik olarak promiyelosit baskınlığı, kanama/DIC riski ve akut lösemi kliniğiyle gündeme gelir. Bu vakada blast oranı düşük, granülositik serinin tüm olgunlaşma basamakları dolaşımda ve süreç daha kronik seyirlidir. Diş eti kanaması, yaygın purpura veya DIC laboratuvarı yoktur. Bu nedenle promiyelosit farklılaşma bloğu mevcut lökositoz paternini açıklamaz.",
        "BCL2 aşırı ekspresyonuyla germinal merkez B hücresinin apoptozdan kaçması": "BCL2 aşırı ekspresyonu t(14;18) ile foliküler lenfomada klasik bir mekanizmadır. Foliküler lenfomada genellikle ağrısız lenfadenopati ve lenfoid hücre proliferasyonu beklenir; periferik yaymada granülositik seri boyunca sola kayma ve bazofili ana patern değildir. Bu hastada belirgin splenomegali olabilir; ancak laboratuvar miyeloid seri proliferasyonunu göstermektedir. Apoptozdan kaçan germinal merkez B hücresi mekanizması bu tabloyu karşılamaz.",
        "CALR mutasyonuyla izole megakaryositik proliferasyon ve trombositoz": "CALR mutasyonları özellikle JAK2 negatif esansiyel trombositemi veya primer miyelofibrozda görülebilir. İzole veya baskın trombositoz, megakaryositik proliferasyon ve bazen splenomegali beklenebilir; ancak bu hastadaki temel bulgu dev lökositoz, bazofili ve olgunlaşan miyeloid seri artışıdır. Trombosit yüksekliği eşlikçi olabilir fakat ana süreci açıklamaz. Bu nedenle BCR-ABL1 dışı izole megakaryositik proliferasyon ikinci plandadır."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v285",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "feedbackAudit": "passed",
        "schemaReference": "v280-v284-render-safe-standard-cases"
      },
      "findings": [
        "Splenomegali + erken doyma → miyeloproliferatif süreç olasılığı.",
        "Bazofili → CML lehine güçlü ipucu.",
        "Düşük blast → kronik faz mantığı."
      ],
      "images": []
    },
  {
      "id": "v286-new-619-uykuya-meyil-ve-dalginlik",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Uykuya meyil ve dalgınlık",
      "difficulty": "hard",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Sirozlu hastada dalgalanan bilinç değişikliği, asteriksis, konstipasyon ve elektrolit bozukluğunu birlikte değerlendirerek akut yönetimde laktüloz ve tetikleyici düzeltme önceliğini seçme.",
      "learningTarget": "Hepatik ensefalopati atağında bağırsak azot yükü, tetikleyici faktör ve güvenli akut yaklaşım ilişkisini kurma.",
      "demographics": "62 yaşında erkek hasta",
      "setting": "Acil servis",
      "chiefComplaint": "Hasta yakını, son iki gündür artan dalgınlık ve gündüz uyuklama nedeniyle hastayı acile getiriyor.",
      "stem": "Hastanın eşi, iki gündür konuşurken cümlelerini yarım bıraktığını, gündüz sürekli uyuduğunu ve gece huzursuz dolaştığını anlatır. Hasta son bir haftadır dışkılamasının belirgin azaldığını ve karın şişliğinin arttığını söyler. Bilinen alkol dışı siroz öyküsü vardır; son günlerde ateş, yeni başlayan şiddetli karın ağrısı veya kanlı kusma tariflemez. Evde kullandığı diüretikleri aksatmadığını, fakat iştahı azaldığı için su ve yemek alımının düştüğünü belirtir. Daha önce benzer bir dalgınlık atağı yaşamış, ancak bu kez merdivenden inerken dengesini kaybedecek gibi olunca ailesi başvurmuştur.",
      "patientIntro": {
        "profile": "62 yaşında erkek hasta, acil servis başvurusunda değerlendiriliyor.",
        "presentation": "Hasta yakını, son iki gündür artan dalgınlık ve gündüz uyuklama nedeniyle hastayı acile getiriyor.",
        "historySummary": "Hastanın eşi, iki gündür konuşurken cümlelerini yarım bıraktığını, gündüz sürekli uyuduğunu ve gece huzursuz dolaştığını anlatır. Hasta son bir haftadır dışkılamasının belirgin azaldığını ve karın şişliğinin arttığını söyler. Bilinen alkol dışı siroz öyküsü vardır; son günlerde ateş, yeni başlayan şiddetli karın ağrısı veya kanlı kusma tariflemez. Evde kullandığı diüretikleri aksatmadığını, fakat iştahı azaldığı için su ve yemek alımının düştüğünü belirtir. Daha önce benzer bir dalgınlık atağı yaşamış, ancak bu kez merdivenden inerken dengesini kaybedecek gibi olunca ailesi başvurmuştur."
      },
      "vitals": {
        "TA": "104/66 mmHg",
        "Nabız": "92/dk",
        "Solunum": "18/dk",
        "SpO2": "%96, oda havasında",
        "Ateş": "36.8 °C",
        "Şok indeksi": "0.88; ekstremiteler ılık, kapiller dolum yaklaşık 2 saniye"
      },
      "exam": [
        "Hasta uykuya meyilli ancak seslenmekle gözlerini açıyor ve basit komutlara uyuyor.",
        "Elleri öne uzatıldığında belirgin flapping tremor izleniyor.",
        "Batın distandü; hafif yaygın hassasiyet var, defans veya rebound saptanmıyor.",
        "Skleralarda hafif ikter ve alt ekstremitelerde gode bırakan ödem mevcut."
      ],
      "investigations": [
        {
          "id": "v286-new-619-uykuya-meyil-ve-dalginlik-temel-laboratuvar",
          "label": "Temel laboratuvar ve elektrolitler",
          "title": "Temel laboratuvar ve elektrolitler",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Temel laboratuvar ve elektrolitler",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Hipokalemi ve hafif hiponatremi bilinç değişikliğini artırabilecek düzeltilebilir eşlikçilerdir.",
          "clinicalMeaning": "Hipokalemi ve hafif hiponatremi bilinç değişikliğini artırabilecek düzeltilebilir eşlikçilerdir.",
          "result": {
            "title": "Temel laboratuvar ve elektrolitler",
            "summary": "Hipokalemi ve hafif hiponatremi bilinç değişikliğini artırabilecek düzeltilebilir eşlikçilerdir.",
            "interpretation": "Hipokalemi ve hafif hiponatremi bilinç değişikliğini artırabilecek düzeltilebilir eşlikçilerdir.",
            "values": [
              [
                "Sodyum",
                "132 mmol/L",
                "135-145 mmol/L",
                "Hafif düşük"
              ],
              [
                "Potasyum",
                "3.0 mmol/L",
                "3.5-5.1 mmol/L",
                "Düşük"
              ],
              [
                "Kreatinin",
                "1.1 mg/dL",
                "0.7-1.2 mg/dL",
                "Bazale yakın"
              ],
              [
                "Glukoz",
                "94 mg/dL",
                "70-140 mg/dL",
                "Normal"
              ]
            ],
            "rows": [
              [
                "Sodyum",
                "132 mmol/L",
                "135-145 mmol/L",
                "Hafif düşük"
              ],
              [
                "Potasyum",
                "3.0 mmol/L",
                "3.5-5.1 mmol/L",
                "Düşük"
              ],
              [
                "Kreatinin",
                "1.1 mg/dL",
                "0.7-1.2 mg/dL",
                "Bazale yakın"
              ],
              [
                "Glukoz",
                "94 mg/dL",
                "70-140 mg/dL",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v286-new-619-uykuya-meyil-ve-dalginlik-karaciger-paneli",
          "label": "Karaciğer fonksiyon ve sentez paneli",
          "title": "Karaciğer fonksiyon ve sentez paneli",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Karaciğer fonksiyon ve sentez paneli",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Kronik karaciğer hastalığında sentez bozukluğu ve dekompansasyon bulguları vardır.",
          "clinicalMeaning": "Kronik karaciğer hastalığında sentez bozukluğu ve dekompansasyon bulguları vardır.",
          "result": {
            "title": "Karaciğer fonksiyon ve sentez paneli",
            "summary": "Kronik karaciğer hastalığında sentez bozukluğu ve dekompansasyon bulguları vardır.",
            "interpretation": "Kronik karaciğer hastalığında sentez bozukluğu ve dekompansasyon bulguları vardır.",
            "values": [
              [
                "Total bilirubin",
                "3.4 mg/dL",
                "0.2-1.2 mg/dL",
                "Yüksek"
              ],
              [
                "INR",
                "1.8",
                "0.8-1.2",
                "Uzamış"
              ],
              [
                "Albumin",
                "2.6 g/dL",
                "3.5-5.0 g/dL",
                "Düşük"
              ],
              [
                "AST/ALT",
                "74/42 U/L",
                "<40 U/L",
                "Hafif yüksek"
              ]
            ],
            "rows": [
              [
                "Total bilirubin",
                "3.4 mg/dL",
                "0.2-1.2 mg/dL",
                "Yüksek"
              ],
              [
                "INR",
                "1.8",
                "0.8-1.2",
                "Uzamış"
              ],
              [
                "Albumin",
                "2.6 g/dL",
                "3.5-5.0 g/dL",
                "Düşük"
              ],
              [
                "AST/ALT",
                "74/42 U/L",
                "<40 U/L",
                "Hafif yüksek"
              ]
            ]
          }
        },
        {
          "id": "v286-new-619-uykuya-meyil-ve-dalginlik-amonyak-ve-enfeksiyon",
          "label": "Amonyak ve enfeksiyon taraması",
          "title": "Amonyak ve enfeksiyon taraması",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Amonyak ve enfeksiyon taraması",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Amonyak yüksekliği klinikle birlikte anlamlıdır; asit nötrofil sayısı enfeksiyon eşiğinin altında kalır.",
          "clinicalMeaning": "Amonyak yüksekliği klinikle birlikte anlamlıdır; asit nötrofil sayısı enfeksiyon eşiğinin altında kalır.",
          "result": {
            "title": "Amonyak ve enfeksiyon taraması",
            "summary": "Amonyak yüksekliği klinikle birlikte anlamlıdır; asit nötrofil sayısı enfeksiyon eşiğinin altında kalır.",
            "interpretation": "Amonyak yüksekliği klinikle birlikte anlamlıdır; asit nötrofil sayısı enfeksiyon eşiğinin altında kalır.",
            "values": [
              [
                "Plazma amonyak",
                "98 µmol/L",
                "<35 µmol/L",
                "Yüksek"
              ],
              [
                "Lökosit",
                "7.800/µL",
                "4.000-10.000/µL",
                "Normal"
              ],
              [
                "CRP",
                "8 mg/L",
                "<5 mg/L",
                "Hafif yüksek"
              ],
              [
                "Asit PMN",
                "120 hücre/mm³",
                "<250 hücre/mm³",
                "Eşik altında"
              ]
            ],
            "rows": [
              [
                "Plazma amonyak",
                "98 µmol/L",
                "<35 µmol/L",
                "Yüksek"
              ],
              [
                "Lökosit",
                "7.800/µL",
                "4.000-10.000/µL",
                "Normal"
              ],
              [
                "CRP",
                "8 mg/L",
                "<5 mg/L",
                "Hafif yüksek"
              ],
              [
                "Asit PMN",
                "120 hücre/mm³",
                "<250 hücre/mm³",
                "Eşik altında"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada acil yönetimde öncelikli basamak aşağıdakilerden hangisidir?",
      "questionType": "management",
      "answerTarget": "Akut bilinç değişikliği olan sirozlu hastada ilk tedavi önceliği",
      "diagnosis": {
        "correct": "Laktülozla düzenli dışkılama sağlama ve tetikleyici faktörleri eş zamanlı düzeltme",
        "options": [
          "Yüksek doz benzodiazepin sedasyonu ve protein alımını tamamen kesme",
          "Laktülozla düzenli dışkılama sağlama ve tetikleyici faktörleri eş zamanlı düzeltme",
          "Rifaximin monoterapisiyle laktülozu tamamen erteleme",
          "Nörolojik görüntüleme sonuçlanana kadar bağırsak hedefli tedaviyi bekletme",
          "Asit tedavisi için diüretikleri artırıp oral sıvı kısıtlamasını derinleştirme"
        ],
        "question": "Bu hastada acil yönetimde öncelikli basamak aşağıdakilerden hangisidir?",
        "explanation": "Siroz zemininde uykuya meyil, gündüz-gece ritim bozulması, asteriksis, amonyak yüksekliği, konstipasyon ve hipokalemi birlikte değerlendirildiğinde yönetim bağırsak azot yükünü azaltmaya ve tetikleyici faktörleri düzeltmeye dayanır. Laktüloz titrasyonu, elektrolit düzeltimi ve enfeksiyon/Gİ kanama/dehidratasyon gibi nedenlerin eş zamanlı araştırılması güvenli ilk yaklaşımdır.",
        "pearls": [
          "Asteriksis klinik tanıda çok değerli bir muayene bulgusudur.",
          "Amonyak tek başına değil, klinik tabloyla birlikte yorumlanmalıdır.",
          "Kabızlık ve hipokalemi düzeltilebilir tetikleyicilerdir."
        ],
        "optionFeedback": {
          "Yüksek doz benzodiazepin sedasyonu ve protein alımını tamamen kesme": "Bu yaklaşım bu vaka için doğru klinik hedef değildir. Benzodiazepinler sirozlu hastada santral sinir sistemi depresyonunu artırarak bilinç bozukluğunu ağırlaştırabilir ve hepatik metabolizmanın azalması nedeniyle beklenenden uzun etki gösterebilir. Protein alımını tamamen kesmek de güncel yaklaşım değildir; malnütrisyon ve sarkopeni amonyak temizleme kapasitesini bozarak uzun vadede kötüleşmeye katkı sağlayabilir. Bu seçenek ancak ağır ajitasyonu olan seçilmiş hastada çok dikkatli sedasyon tartışmasına benzer görünür; fakat bu vakada asteriksis, konstipasyon, hipokalemi ve siroz zemini bağırsak kaynaklı azot yükünü azaltmaya ve tetikleyicileri düzeltmeye yöneltir.",
          "Laktülozla düzenli dışkılama sağlama ve tetikleyici faktörleri eş zamanlı düzeltme": "Bu seçenek en uygundur. Sirozlu hastada uykuya meyil, dikkat azalması, asteriksis, kabızlık öyküsü, hipokalemi ve amonyak yüksekliği birlikte değerlendirildiğinde ilk yönetim bağırsak lümenindeki azot yükünü azaltmak ve atağı tetikleyen nedenleri düzeltmektir. Laktüloz kolon pH’sını düşürerek amonyağın emilimini azaltır ve günde yaklaşık 2-3 yumuşak dışkı hedeflenir; hipokalemi, kabızlık, enfeksiyon, Gİ kanama, dehidratasyon ve sedatif kullanımı gibi tetikleyiciler eş zamanlı aranıp düzeltilmelidir. Rifaximin özellikle nükslerde veya laktüloza ek olarak değerli olabilir; ancak akut ilk basamakta laktüloz ve tetikleyici kontrolü temel karardır.",
          "Rifaximin monoterapisiyle laktülozu tamamen erteleme": "Rifaximin hepatik ensefalopati nükslerinin azaltılmasında ve laktüloza ek tedavide yararlı olabilir; fakat laktülozu tamamen erteleyen monoterapi yaklaşımı bu vaka için ilk ve en güçlü basamak değildir. Hastanın konstipasyonu ve hipokalemisi bağırsak azot yükünü artıran düzeltilebilir faktörlerdir; laktüloz bu patofizyolojiye doğrudan müdahale eder. Rifaximin yalnızca “antibiyotik verildi” mantığıyla seçilirse TUS düzeyinde kritik nokta kaçırılır: akut bilinç değişikliği olan sirozlu hastada laktüloz titrasyonu ve tetikleyici arama birlikte düşünülmelidir.",
          "Nörolojik görüntüleme sonuçlanana kadar bağırsak hedefli tedaviyi bekletme": "Yeni fokal nörolojik defisit, travma, antikoagülan kullanımı veya beklenmeyen koma derinliği varsa nörolojik görüntüleme gerekli olabilir; ancak bu gereklilik bağırsak hedefli tedaviyi otomatik olarak bekletmez. Bu hastada tablo günler içinde dalgalanan uyku hali, asteriksis ve siroz dekompansasyonu paternindedir; acil olarak geri döndürülebilir metabolik nedenlere müdahale edilmelidir. Görüntüleme düşünülse bile laktüloz ve tetikleyici düzeltme geciktirilmemelidir.",
          "Asit tedavisi için diüretikleri artırıp oral sıvı kısıtlamasını derinleştirme": "Diüretikleri artırmak bu hastada güvenli bir ilk yaklaşım değildir. Hipokalemi ve olası intravasküler volüm azalması hepatik ensefalopatiyi artırabilir; aşırı diürez böbrek perfüzyonunu bozarak azotemi ve ensefalopatiyi derinleştirebilir. Asit yönetimi ayrı bir başlıktır; fakat bilinç değişikliğiyle gelen sirozlu hastada önce ensefalopati atağını tetikleyen faktörler, elektrolit bozukluğu, enfeksiyon ve kabızlık düzeltilmelidir."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Hepatik ensefalopati yönetiminde amaç yalnızca amonyağı düşürmek değil, atağı başlatan kabızlık, enfeksiyon, kanama, sedatif ve elektrolit bozukluğu gibi nedenleri aynı anda düzeltmektir.",
      "examPearl": "Siroz + dalgalanan bilinç + asteriksis gördüğünde ilk refleks laktüloz ve tetikleyici aramadır; sedatif artırmak genellikle tuzaktır.",
      "whyCorrect": "Doğru seçenek, hastadaki klinik bilinç değişikliğini ve tetikleyici paternini aynı anda hedefler: laktüloz bağırsak azot yükünü azaltır, hipokalemi/kabızlık gibi nedenlerin düzeltilmesi nüks ve ağırlaşmayı önler.",
      "optionComparison": "Benzodiazepin ve diüretik artırma klinik kötüleşme riski taşır; rifaximin değerli olmakla birlikte çoğunlukla laktüloza ek/nüks önleme mantığındadır; görüntüleme gerektiğinde bile metabolik tedaviyi geciktirmez.",
      "evidenceChain": [
        "Siroz ve sentez bozukluğu → nörotoksin temizleme kapasitesinde azalma.",
        "Uykuya meyil ve gece huzursuzluğu → dalgalanan metabolik bilinç etkilenimi.",
        "Asteriksis → klinik ensefalopati lehine güçlü muayene bulgusu.",
        "Kabızlık ve hipokalemi → düzeltilebilir tetikleyici faktörler.",
        "Asit PMN <250/mm³ → bu verilerle SBP atağı ana yönetim hedefi değildir."
      ],
      "whyWrong": {
        "Yüksek doz benzodiazepin sedasyonu ve protein alımını tamamen kesme": "Bu yaklaşım bu vaka için doğru klinik hedef değildir. Benzodiazepinler sirozlu hastada santral sinir sistemi depresyonunu artırarak bilinç bozukluğunu ağırlaştırabilir ve hepatik metabolizmanın azalması nedeniyle beklenenden uzun etki gösterebilir. Protein alımını tamamen kesmek de güncel yaklaşım değildir; malnütrisyon ve sarkopeni amonyak temizleme kapasitesini bozarak uzun vadede kötüleşmeye katkı sağlayabilir. Bu seçenek ancak ağır ajitasyonu olan seçilmiş hastada çok dikkatli sedasyon tartışmasına benzer görünür; fakat bu vakada asteriksis, konstipasyon, hipokalemi ve siroz zemini bağırsak kaynaklı azot yükünü azaltmaya ve tetikleyicileri düzeltmeye yöneltir.",
        "Rifaximin monoterapisiyle laktülozu tamamen erteleme": "Rifaximin hepatik ensefalopati nükslerinin azaltılmasında ve laktüloza ek tedavide yararlı olabilir; fakat laktülozu tamamen erteleyen monoterapi yaklaşımı bu vaka için ilk ve en güçlü basamak değildir. Hastanın konstipasyonu ve hipokalemisi bağırsak azot yükünü artıran düzeltilebilir faktörlerdir; laktüloz bu patofizyolojiye doğrudan müdahale eder. Rifaximin yalnızca “antibiyotik verildi” mantığıyla seçilirse TUS düzeyinde kritik nokta kaçırılır: akut bilinç değişikliği olan sirozlu hastada laktüloz titrasyonu ve tetikleyici arama birlikte düşünülmelidir.",
        "Nörolojik görüntüleme sonuçlanana kadar bağırsak hedefli tedaviyi bekletme": "Yeni fokal nörolojik defisit, travma, antikoagülan kullanımı veya beklenmeyen koma derinliği varsa nörolojik görüntüleme gerekli olabilir; ancak bu gereklilik bağırsak hedefli tedaviyi otomatik olarak bekletmez. Bu hastada tablo günler içinde dalgalanan uyku hali, asteriksis ve siroz dekompansasyonu paternindedir; acil olarak geri döndürülebilir metabolik nedenlere müdahale edilmelidir. Görüntüleme düşünülse bile laktüloz ve tetikleyici düzeltme geciktirilmemelidir.",
        "Asit tedavisi için diüretikleri artırıp oral sıvı kısıtlamasını derinleştirme": "Diüretikleri artırmak bu hastada güvenli bir ilk yaklaşım değildir. Hipokalemi ve olası intravasküler volüm azalması hepatik ensefalopatiyi artırabilir; aşırı diürez böbrek perfüzyonunu bozarak azotemi ve ensefalopatiyi derinleştirebilir. Asit yönetimi ayrı bir başlıktır; fakat bilinç değişikliğiyle gelen sirozlu hastada önce ensefalopati atağını tetikleyen faktörler, elektrolit bozukluğu, enfeksiyon ve kabızlık düzeltilmelidir."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v286",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "feedbackAudit": "passed",
        "schemaReference": "v280-v285-render-safe-standard-cases"
      },
      "findings": [
        "Asteriksis ve uyku ritmi bozulması",
        "Konstipasyon ve hipokalemi tetikleyicisi",
        "Asit PMN eşiğin altında"
      ],
      "images": []
    },
  {
      "id": "v286-new-620-ates-balgam-ve-oksijen-dusuklugu",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Ateş, balgam ve oksijen düşüklüğü",
      "difficulty": "hard",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Toplum kökenli pnömonide hipoksemi, multilober infiltrasyon ve komorbiditeyi birlikte değerlendirerek yatış ve ampirik antibiyotik kararını verme.",
      "learningTarget": "Pnömonide tedavi yeri ve ampirik antibiyotik kapsamını hastanın klinik ağırlığıyla ilişkilendirme.",
      "demographics": "71 yaşında erkek hasta",
      "setting": "Acil servis",
      "chiefComplaint": "Hasta üç gündür artan öksürük, balgam ve nefes darlığı nedeniyle acile başvuruyor.",
      "stem": "Hasta üç gün önce titremeyle başlayan ateşten sonra sarı-yeşil balgam çıkarmaya başladığını anlatır. Son 24 saatte banyoya yürürken nefesinin kesildiğini ve evde konuşurken cümlelerini tamamlamakta zorlandığını söyler. Sağ göğüs yanında öksürmekle artan batıcı ağrı tarifler; kanlı balgam, uzun yolculuk veya bacakta tek taraflı şişlik fark etmemiştir. Tip 2 diyabet ve hipertansiyon nedeniyle ilaç kullanır; son üç ayda hastaneye yatış veya damar yoluyla antibiyotik alma öyküsü yoktur. Ateşi düşmeyip iştahı kesilince kızı tarafından acile getirilmiştir.",
      "patientIntro": {
        "profile": "71 yaşında erkek hasta, acil servis başvurusunda değerlendiriliyor.",
        "presentation": "Hasta üç gündür artan öksürük, balgam ve nefes darlığı nedeniyle acile başvuruyor.",
        "historySummary": "Hasta üç gün önce titremeyle başlayan ateşten sonra sarı-yeşil balgam çıkarmaya başladığını anlatır. Son 24 saatte banyoya yürürken nefesinin kesildiğini ve evde konuşurken cümlelerini tamamlamakta zorlandığını söyler. Sağ göğüs yanında öksürmekle artan batıcı ağrı tarifler; kanlı balgam, uzun yolculuk veya bacakta tek taraflı şişlik fark etmemiştir. Tip 2 diyabet ve hipertansiyon nedeniyle ilaç kullanır; son üç ayda hastaneye yatış veya damar yoluyla antibiyotik alma öyküsü yoktur. Ateşi düşmeyip iştahı kesilince kızı tarafından acile getirilmiştir."
      },
      "vitals": {
        "TA": "112/68 mmHg",
        "Nabız": "108/dk",
        "Solunum": "28/dk",
        "SpO2": "%89, oda havasında; nazal oksijenle %94",
        "Ateş": "38.7 °C",
        "Şok indeksi": "0.96; periferik nabızlar alınır, kapiller dolum 2-3 saniye"
      },
      "exam": [
        "Hasta konuşurken kısa cümlelerle yanıt veriyor, yardımcı solunum kaslarını hafif kullanıyor.",
        "Sağ alt-orta zonda inspiratuvar ral ve bronşiyal solunum sesi duyuluyor.",
        "Kalp sesleri taşikardik, belirgin yeni üfürüm yok.",
        "Sağ bacakta tek taraflı ödem veya baldır hassasiyeti izlenmiyor."
      ],
      "investigations": [
        {
          "id": "v286-new-620-ates-balgam-ve-oksijen-dusuklugu-hemogram-inflamasyon",
          "label": "Hemogram ve inflamasyon belirteçleri",
          "title": "Hemogram ve inflamasyon belirteçleri",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Hemogram ve inflamasyon belirteçleri",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Bakteriyel enfeksiyon lehine inflamatuvar yanıt belirgindir.",
          "clinicalMeaning": "Bakteriyel enfeksiyon lehine inflamatuvar yanıt belirgindir.",
          "result": {
            "title": "Hemogram ve inflamasyon belirteçleri",
            "summary": "Bakteriyel enfeksiyon lehine inflamatuvar yanıt belirgindir.",
            "interpretation": "Bakteriyel enfeksiyon lehine inflamatuvar yanıt belirgindir.",
            "values": [
              [
                "Lökosit",
                "17.600/µL",
                "4.000-10.000/µL",
                "Yüksek"
              ],
              [
                "Nötrofil",
                "%86",
                "%40-70",
                "Yüksek"
              ],
              [
                "CRP",
                "186 mg/L",
                "<5 mg/L",
                "Yüksek"
              ],
              [
                "Prokalsitonin",
                "1.8 ng/mL",
                "<0.1 ng/mL",
                "Yüksek"
              ]
            ],
            "rows": [
              [
                "Lökosit",
                "17.600/µL",
                "4.000-10.000/µL",
                "Yüksek"
              ],
              [
                "Nötrofil",
                "%86",
                "%40-70",
                "Yüksek"
              ],
              [
                "CRP",
                "186 mg/L",
                "<5 mg/L",
                "Yüksek"
              ],
              [
                "Prokalsitonin",
                "1.8 ng/mL",
                "<0.1 ng/mL",
                "Yüksek"
              ]
            ]
          }
        },
        {
          "id": "v286-new-620-ates-balgam-ve-oksijen-dusuklugu-kan-gazi",
          "label": "Arter kan gazı",
          "title": "Arter kan gazı",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Arter kan gazı",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Hipoksemi vardır; laktat belirgin doku hipoperfüzyonu düzeyinde değildir.",
          "clinicalMeaning": "Hipoksemi vardır; laktat belirgin doku hipoperfüzyonu düzeyinde değildir.",
          "result": {
            "title": "Arter kan gazı",
            "summary": "Hipoksemi vardır; laktat belirgin doku hipoperfüzyonu düzeyinde değildir.",
            "interpretation": "Hipoksemi vardır; laktat belirgin doku hipoperfüzyonu düzeyinde değildir.",
            "values": [
              [
                "pH",
                "7.45",
                "7.35-7.45",
                "Üst sınır"
              ],
              [
                "PaO2",
                "58 mmHg",
                "80-100 mmHg",
                "Düşük"
              ],
              [
                "PaCO2",
                "34 mmHg",
                "35-45 mmHg",
                "Hafif düşük"
              ],
              [
                "Laktat",
                "1.7 mmol/L",
                "<2 mmol/L",
                "Normal"
              ]
            ],
            "rows": [
              [
                "pH",
                "7.45",
                "7.35-7.45",
                "Üst sınır"
              ],
              [
                "PaO2",
                "58 mmHg",
                "80-100 mmHg",
                "Düşük"
              ],
              [
                "PaCO2",
                "34 mmHg",
                "35-45 mmHg",
                "Hafif düşük"
              ],
              [
                "Laktat",
                "1.7 mmol/L",
                "<2 mmol/L",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v286-new-620-ates-balgam-ve-oksijen-dusuklugu-akciger-grafisi",
          "label": "Akciğer grafisi",
          "title": "Akciğer grafisi",
          "type": "imaging",
          "priority": "essential",
          "subtype": "Akciğer grafisi",
          "category": "imaging",
          "testTypeCategory": "imaging",
          "summary": "Çok odaklı konsolidasyon/infiltrasyon klinik enfeksiyonla uyumludur.",
          "clinicalMeaning": "Çok odaklı konsolidasyon/infiltrasyon klinik enfeksiyonla uyumludur.",
          "result": {
            "title": "Akciğer grafisi",
            "summary": "Çok odaklı konsolidasyon/infiltrasyon klinik enfeksiyonla uyumludur.",
            "interpretation": "Çok odaklı konsolidasyon/infiltrasyon klinik enfeksiyonla uyumludur.",
            "values": [
              [
                "Sağ alt lob",
                "Konsolidasyon",
                "Beklenmez",
                "Patolojik"
              ],
              [
                "Sağ orta zon",
                "Yamalı infiltrasyon",
                "Beklenmez",
                "Patolojik"
              ],
              [
                "Plevral sıvı",
                "Belirgin yok",
                "Yok",
                "Acil drenaj bulgusu yok"
              ]
            ],
            "rows": [
              [
                "Sağ alt lob",
                "Konsolidasyon",
                "Beklenmez",
                "Patolojik"
              ],
              [
                "Sağ orta zon",
                "Yamalı infiltrasyon",
                "Beklenmez",
                "Patolojik"
              ],
              [
                "Plevral sıvı",
                "Belirgin yok",
                "Yok",
                "Acil drenaj bulgusu yok"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hasta için en uygun tedavi yeri ve ampirik başlangıç yaklaşımı aşağıdakilerden hangisidir?",
      "questionType": "management",
      "answerTarget": "Toplum kökenli pnömonide yatış ve ampirik tedavi kararı",
      "diagnosis": {
        "correct": "Hastaneye yatırarak oksijen desteği ve beta-laktam ile makrolid kombinasyonu başlama",
        "options": [
          "Eve gönderip yalnızca semptomatik tedavi ve kontrol önerme",
          "Ayaktan oral makrolid monoterapisi başlama",
          "Ayaktan oral amoksisilin-klavulanat verip oksijen izlemi yapmadan taburcu etme",
          "Pseudomonas ve MRSA kapsayacak geniş tedaviyi risk faktörü olmadan rutin başlama",
          "Hastaneye yatırarak oksijen desteği ve beta-laktam ile makrolid kombinasyonu başlama"
        ],
        "question": "Bu hasta için en uygun tedavi yeri ve ampirik başlangıç yaklaşımı aşağıdakilerden hangisidir?",
        "explanation": "Hipoksemi, taşipne, ileri yaş, diyabet ve multilober radyolojik tutulum ayaktan tedavi yerine hastane koşullarında oksijen ve ampirik antibiyotik gerektirir. MRSA/Pseudomonas risk faktörü verilmediği için rutin aşırı geniş kapsama gerekmez; tipik ve atipik etkenleri kapsayan beta-laktam + makrolid yaklaşımı uygundur.",
        "pearls": [
          "Oksijen satürasyonu tedavi yeri kararında kritik bir veridir.",
          "Ciddiyet geniş spektrum demek değildir; MRSA/Pseudomonas için özgül risk aranır.",
          "Multilober infiltrasyon ve hipoksemi ayaktan tedaviyi zayıflatır."
        ],
        "optionFeedback": {
          "Eve gönderip yalnızca semptomatik tedavi ve kontrol önerme": "Bu yaklaşım hastanın ciddiyetini hafife alır. İleri yaş, konfüzyona eğilim, solunum sayısının artması, oda havasında oksijen satürasyonunun düşük olması ve multilober infiltrasyon evde yalnız izlem için güvenli değildir. Toplum kökenli pnömonide karar yalnızca öksürük ve ateşin varlığına göre değil, oksijenasyon, komorbidite, vital bulgular ve radyolojik yaygınlıkla birlikte verilir. Bu hastada destek tedavisi tek başına yeterli değildir.",
          "Ayaktan oral makrolid monoterapisi başlama": "Makrolid monoterapisi ayaktan, düşük riskli ve lokal direnç koşulları uygun seçilmiş hastalarda düşünülebilir; fakat bu hasta hipoksemiktir ve radyolojik tutulum yaygındır. Ayrıca diyabet ve ileri yaş gibi riskler vardır. Monoterapi hem yatış gereksinimini hem de tipik pnömokok gibi etken kapsamasını yeterince karşılamaz. TUS düzeyinde çeldirici nokta, “atipik de olabilir” düşüncesiyle ağırlaşmış hastayı ayaktan dar tedaviye göndermemektir.",
          "Ayaktan oral amoksisilin-klavulanat verip oksijen izlemi yapmadan taburcu etme": "Oral amoksisilin-klavulanat bazı ayaktan pnömoni tablolarında uygun olabilir; ancak bu vakada oksijen satürasyonu düşüktür, solunum sayısı artmıştır ve multilober infiltrasyon vardır. Bu nedenle sadece oral antibiyotikle taburculuk güvenli değildir. Yatış ve oksijen desteği gereksinimi antibiyotik seçiminden bağımsız olarak değerlendirilmelidir. Klinik kararın anahtarı, hastalığın “tedavi edilebilir” olmasından çok nerede ve ne yoğunlukta tedavi edileceğidir.",
          "Pseudomonas ve MRSA kapsayacak geniş tedaviyi risk faktörü olmadan rutin başlama": "MRSA veya Pseudomonas kapsaması; önceki izolasyon, yakın zamanda hastane yatışı ve parenteral antibiyotik maruziyeti, yapısal akciğer hastalığı veya güçlü lokal riskler varsa düşünülür. Bu hastada ağırlaşmış toplum kökenli pnömoni vardır; fakat verilen veriler rutin anti-MRSA/anti-Pseudomonas tedavisini zorunlu kılmaz. Gereksiz geniş antibiyotik yan etki, direnç ve C. difficile riskini artırır. Geniş spektrum seçimi ciddiyetle değil, özgül risk faktörleriyle gerekçelendirilmelidir.",
          "Hastaneye yatırarak oksijen desteği ve beta-laktam ile makrolid kombinasyonu başlama": "Bu seçenek en uygundur. Hipoksemi, taşipne, yaş ve multilober infiltrasyon hastanın ayaktan değil hastane koşullarında yönetilmesini gerektirir. Hastanede yatan toplum kökenli pnömonide tipik ve atipik etkenleri kapsayacak beta-laktam + makrolid kombinasyonu sık kullanılan uygun bir rejimdir; oksijen desteği ve sıvı/hemodinami izlemi de tedavinin ayrılmaz parçasıdır. Bu seçenek hem tedavi yeri kararını hem de ampirik kapsama mantığını birlikte doğru kurar."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Toplum kökenli pnömonide antibiyotik seçimi tedavi yeri kararından ayrı düşünülemez; hipoksemi ve klinik ağırlık yatışı gerektirirken etken riski ampirik kapsama genişliğini belirler.",
      "examPearl": "Pnömonide “hangi antibiyotik?” kadar “hasta eve gidebilir mi?” sorusu da TUS düzeyinde ayırt ettiricidir.",
      "whyCorrect": "Doğru seçenek, hastanın hipoksemi ve radyolojik yaygınlığını dikkate alarak yatış kararı verir ve risk faktörü olmadan gereksiz anti-MRSA/anti-Pseudomonas genişletmesine gitmez.",
      "optionComparison": "Ayaktan seçenekler hipoksemi ve multilober tutulum nedeniyle yetersizdir; çok geniş kapsama ise özgül risk faktörü verilmeden antibiyotik stewardship açısından bu vaka için doğru klinik hedef değildir.",
      "evidenceChain": [
        "SpO2 %89 → oksijen desteği ve hastane izlemi gerektiren solunum etkilenimi.",
        "Solunum sayısı 28/dk → klinik ağırlık artışı.",
        "Lökositoz, nötrofili, yüksek CRP/prokalsitonin → bakteriyel pnömoni paternini destekleme.",
        "Multilober infiltrasyon → ayaktan basit tedavi için güvenli olmayan yaygınlık.",
        "Son 3 ayda hastane/parenteral antibiyotik yokluğu → rutin MRSA/Pseudomonas kapsamasını zayıflatma."
      ],
      "whyWrong": {
        "Eve gönderip yalnızca semptomatik tedavi ve kontrol önerme": "Bu yaklaşım hastanın ciddiyetini hafife alır. İleri yaş, konfüzyona eğilim, solunum sayısının artması, oda havasında oksijen satürasyonunun düşük olması ve multilober infiltrasyon evde yalnız izlem için güvenli değildir. Toplum kökenli pnömonide karar yalnızca öksürük ve ateşin varlığına göre değil, oksijenasyon, komorbidite, vital bulgular ve radyolojik yaygınlıkla birlikte verilir. Bu hastada destek tedavisi tek başına yeterli değildir.",
        "Ayaktan oral makrolid monoterapisi başlama": "Makrolid monoterapisi ayaktan, düşük riskli ve lokal direnç koşulları uygun seçilmiş hastalarda düşünülebilir; fakat bu hasta hipoksemiktir ve radyolojik tutulum yaygındır. Ayrıca diyabet ve ileri yaş gibi riskler vardır. Monoterapi hem yatış gereksinimini hem de tipik pnömokok gibi etken kapsamasını yeterince karşılamaz. TUS düzeyinde çeldirici nokta, “atipik de olabilir” düşüncesiyle ağırlaşmış hastayı ayaktan dar tedaviye göndermemektir.",
        "Ayaktan oral amoksisilin-klavulanat verip oksijen izlemi yapmadan taburcu etme": "Oral amoksisilin-klavulanat bazı ayaktan pnömoni tablolarında uygun olabilir; ancak bu vakada oksijen satürasyonu düşüktür, solunum sayısı artmıştır ve multilober infiltrasyon vardır. Bu nedenle sadece oral antibiyotikle taburculuk güvenli değildir. Yatış ve oksijen desteği gereksinimi antibiyotik seçiminden bağımsız olarak değerlendirilmelidir. Klinik kararın anahtarı, hastalığın “tedavi edilebilir” olmasından çok nerede ve ne yoğunlukta tedavi edileceğidir.",
        "Pseudomonas ve MRSA kapsayacak geniş tedaviyi risk faktörü olmadan rutin başlama": "MRSA veya Pseudomonas kapsaması; önceki izolasyon, yakın zamanda hastane yatışı ve parenteral antibiyotik maruziyeti, yapısal akciğer hastalığı veya güçlü lokal riskler varsa düşünülür. Bu hastada ağırlaşmış toplum kökenli pnömoni vardır; fakat verilen veriler rutin anti-MRSA/anti-Pseudomonas tedavisini zorunlu kılmaz. Gereksiz geniş antibiyotik yan etki, direnç ve C. difficile riskini artırır. Geniş spektrum seçimi ciddiyetle değil, özgül risk faktörleriyle gerekçelendirilmelidir."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v286",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "feedbackAudit": "passed",
        "schemaReference": "v280-v285-render-safe-standard-cases"
      },
      "findings": [
        "Hipoksemi",
        "Multilober infiltrasyon",
        "MRSA/Pseudomonas risk faktörü yokluğu"
      ],
      "images": []
    },
  {
      "id": "v286-new-621-yuzde-dolgunluk-ve-kolay-morarma",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Yüzde dolgunluk ve kolay morarma",
      "difficulty": "hard",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Santral kilo artışı, mor stria, proksimal güçsüzlük ve metabolik bozulmalarla gelen hastada Cushing sendromu tarama basamağını doğru sıralama.",
      "learningTarget": "Hiperkortizolizm şüphesinde tarama testi, kaynak ayrımı ve görüntüleme sırasını ayırt etme.",
      "demographics": "44 yaşında kadın hasta",
      "setting": "Endokrinoloji polikliniği",
      "chiefComplaint": "Hasta son bir yılda kilo artışı, kolay morarma ve merdiven çıkarken zorlanma nedeniyle başvuruyor.",
      "stem": "Hasta son bir yıl içinde özellikle gövdesinden kilo aldığını, yüzünün yuvarlaklaştığını ve eski pantolonlarının bel kısmından dar gelmeye başladığını anlatır. Merdiven çıkarken uyluklarında güçsüzlük hissettiğini, yerden kalkarken kollarından destek alma ihtiyacı duyduğunu söyler. Son aylarda kollarında küçük çarpmalarla büyük morluklar oluşmuş ve karın derisinde geniş mor çizgiler fark etmiştir. Hipertansiyon ilacı artırılmasına rağmen tansiyonlarının yüksek seyrettiğini, açlık şekerlerinin de bozulduğunu belirtir. Uzun süreli kortizon tableti, inhaler steroid veya eklem içi steroid enjeksiyonu kullanmadığını ifade eder; ateş, gece terlemesi veya istemsiz kilo kaybı tariflemez.",
      "patientIntro": {
        "profile": "44 yaşında kadın hasta, endokrinoloji polikliniği başvurusunda değerlendiriliyor.",
        "presentation": "Hasta son bir yılda kilo artışı, kolay morarma ve merdiven çıkarken zorlanma nedeniyle başvuruyor.",
        "historySummary": "Hasta son bir yıl içinde özellikle gövdesinden kilo aldığını, yüzünün yuvarlaklaştığını ve eski pantolonlarının bel kısmından dar gelmeye başladığını anlatır. Merdiven çıkarken uyluklarında güçsüzlük hissettiğini, yerden kalkarken kollarından destek alma ihtiyacı duyduğunu söyler. Son aylarda kollarında küçük çarpmalarla büyük morluklar oluşmuş ve karın derisinde geniş mor çizgiler fark etmiştir. Hipertansiyon ilacı artırılmasına rağmen tansiyonlarının yüksek seyrettiğini, açlık şekerlerinin de bozulduğunu belirtir. Uzun süreli kortizon tableti, inhaler steroid veya eklem içi steroid enjeksiyonu kullanmadığını ifade eder; ateş, gece terlemesi veya istemsiz kilo kaybı tariflemez."
      },
      "vitals": {
        "TA": "158/96 mmHg",
        "Nabız": "88/dk",
        "Solunum": "16/dk",
        "SpO2": "%98, oda havasında",
        "Ateş": "36.6 °C",
        "Şok indeksi": "0.56; periferik perfüzyon iyi, kapiller dolum <2 saniye"
      },
      "exam": [
        "Yüzde dolgunluk ve supraklaviküler yağlanma dikkat çekiyor.",
        "Karın cildinde geniş mor strialar ve ön kollarda ekimozlar izleniyor.",
        "Proksimal kas gücü kalça fleksiyonunda 4/5, distal kas gücü korunmuş.",
        "Tiroid muayenesinde belirgin guatr yok; pretibial ödem izlenmiyor."
      ],
      "investigations": [
        {
          "id": "v286-new-621-yuzde-dolgunluk-ve-kolay-morarma-metabolik-panel",
          "label": "Metabolik panel",
          "title": "Metabolik panel",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Metabolik panel",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Hiperglisemi ve hafif hipokalemi glukokortikoid fazlalığıyla birlikte görülebilecek metabolik bozulmalardır.",
          "clinicalMeaning": "Hiperglisemi ve hafif hipokalemi glukokortikoid fazlalığıyla birlikte görülebilecek metabolik bozulmalardır.",
          "result": {
            "title": "Metabolik panel",
            "summary": "Hiperglisemi ve hafif hipokalemi glukokortikoid fazlalığıyla birlikte görülebilecek metabolik bozulmalardır.",
            "interpretation": "Hiperglisemi ve hafif hipokalemi glukokortikoid fazlalığıyla birlikte görülebilecek metabolik bozulmalardır.",
            "values": [
              [
                "Açlık glukoz",
                "154 mg/dL",
                "70-100 mg/dL",
                "Yüksek"
              ],
              [
                "HbA1c",
                "7.2 %",
                "<5.7 %",
                "Yüksek"
              ],
              [
                "Potasyum",
                "3.4 mmol/L",
                "3.5-5.1 mmol/L",
                "Hafif düşük"
              ],
              [
                "Sodyum",
                "142 mmol/L",
                "135-145 mmol/L",
                "Normal"
              ]
            ],
            "rows": [
              [
                "Açlık glukoz",
                "154 mg/dL",
                "70-100 mg/dL",
                "Yüksek"
              ],
              [
                "HbA1c",
                "7.2 %",
                "<5.7 %",
                "Yüksek"
              ],
              [
                "Potasyum",
                "3.4 mmol/L",
                "3.5-5.1 mmol/L",
                "Hafif düşük"
              ],
              [
                "Sodyum",
                "142 mmol/L",
                "135-145 mmol/L",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v286-new-621-yuzde-dolgunluk-ve-kolay-morarma-hemogram-kemik",
          "label": "Hemogram ve kemik metabolizması",
          "title": "Hemogram ve kemik metabolizması",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Hemogram ve kemik metabolizması",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Lenfopeni ve metabolik bulgular klinik fenotiple birlikte değerlendirilir; tek başına tanısal değildir.",
          "clinicalMeaning": "Lenfopeni ve metabolik bulgular klinik fenotiple birlikte değerlendirilir; tek başına tanısal değildir.",
          "result": {
            "title": "Hemogram ve kemik metabolizması",
            "summary": "Lenfopeni ve metabolik bulgular klinik fenotiple birlikte değerlendirilir; tek başına tanısal değildir.",
            "interpretation": "Lenfopeni ve metabolik bulgular klinik fenotiple birlikte değerlendirilir; tek başına tanısal değildir.",
            "values": [
              [
                "Lökosit",
                "10.900/µL",
                "4.000-10.000/µL",
                "Hafif yüksek"
              ],
              [
                "Lenfosit",
                "900/µL",
                "1.000-4.000/µL",
                "Düşük"
              ],
              [
                "Kalsiyum",
                "9.4 mg/dL",
                "8.6-10.2 mg/dL",
                "Normal"
              ],
              [
                "25-OH D vitamini",
                "21 ng/mL",
                ">30 ng/mL",
                "Düşük"
              ]
            ],
            "rows": [
              [
                "Lökosit",
                "10.900/µL",
                "4.000-10.000/µL",
                "Hafif yüksek"
              ],
              [
                "Lenfosit",
                "900/µL",
                "1.000-4.000/µL",
                "Düşük"
              ],
              [
                "Kalsiyum",
                "9.4 mg/dL",
                "8.6-10.2 mg/dL",
                "Normal"
              ],
              [
                "25-OH D vitamini",
                "21 ng/mL",
                ">30 ng/mL",
                "Düşük"
              ]
            ]
          }
        },
        {
          "id": "v286-new-621-yuzde-dolgunluk-ve-kolay-morarma-tiroid-ve-kreatinin",
          "label": "Temel dışlayıcı laboratuvarlar",
          "title": "Temel dışlayıcı laboratuvarlar",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Temel dışlayıcı laboratuvarlar",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Tiroid aksı ve böbrek fonksiyonu bu yakınmaları açıklayacak belirgin patoloji göstermiyor.",
          "clinicalMeaning": "Tiroid aksı ve böbrek fonksiyonu bu yakınmaları açıklayacak belirgin patoloji göstermiyor.",
          "result": {
            "title": "Temel dışlayıcı laboratuvarlar",
            "summary": "Tiroid aksı ve böbrek fonksiyonu bu yakınmaları açıklayacak belirgin patoloji göstermiyor.",
            "interpretation": "Tiroid aksı ve böbrek fonksiyonu bu yakınmaları açıklayacak belirgin patoloji göstermiyor.",
            "values": [
              [
                "TSH",
                "1.8 mIU/L",
                "0.4-4.0 mIU/L",
                "Normal"
              ],
              [
                "Serbest T4",
                "1.1 ng/dL",
                "0.8-1.8 ng/dL",
                "Normal"
              ],
              [
                "Kreatinin",
                "0.8 mg/dL",
                "0.6-1.1 mg/dL",
                "Normal"
              ]
            ],
            "rows": [
              [
                "TSH",
                "1.8 mIU/L",
                "0.4-4.0 mIU/L",
                "Normal"
              ],
              [
                "Serbest T4",
                "1.1 ng/dL",
                "0.8-1.8 ng/dL",
                "Normal"
              ],
              [
                "Kreatinin",
                "0.8 mg/dL",
                "0.6-1.1 mg/dL",
                "Normal"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada tanısal süreçte en uygun ilk biyokimyasal yaklaşım aşağıdakilerden hangisidir?",
      "questionType": "diagnostic-step",
      "answerTarget": "Cushing sendromu taramasında ilk biyokimyasal test seçimi",
      "diagnosis": {
        "correct": "Gece geç saat tükürük kortizolü, 1 mg deksametazon baskılama testi veya 24 saatlik idrar serbest kortizolüyle hiperkortizolizmi taramak",
        "options": [
          "Tek bir sabah serum kortizolü ölçümüyle tanıyı dışlamak",
          "Öncelikle adrenal BT çekerek nodül varlığına göre karar vermek",
          "Gece geç saat tükürük kortizolü, 1 mg deksametazon baskılama testi veya 24 saatlik idrar serbest kortizolüyle hiperkortizolizmi taramak",
          "ACTH düzeyine bakmadan yüksek doz deksametazon baskılama testiyle kaynak lokalizasyonuna geçmek",
          "Aldosteron-renin oranıyla mineralokortikoid fazlalığını taramak"
        ],
        "question": "Bu hastada tanısal süreçte en uygun ilk biyokimyasal yaklaşım aşağıdakilerden hangisidir?",
        "explanation": "Klinik fenotip hiperkortizolizm için güçlüdür; ancak ilk adım görüntüleme değil biyokimyasal taramadır. Gece geç saat tükürük kortizolü, 1 mg deksametazon baskılama testi veya 24 saatlik idrar serbest kortizolü gibi testlerle kortizol fazlalığı gösterildikten sonra ACTH düzeyi ve görüntüleme ile kaynak ayrımı yapılır.",
        "pearls": [
          "Cushing kuşkusunda görüntüleme taramadan sonra gelir.",
          "Tek sabah kortizolü tarama için güvenilir değildir.",
          "Geniş mor stria ve proksimal kas güçsüzlüğü yüksek değerli fizik muayene ipuçlarıdır."
        ],
        "optionFeedback": {
          "Tek bir sabah serum kortizolü ölçümüyle tanıyı dışlamak": "Tek sabah kortizolü Cushing sendromu taraması için uygun bir dışlama testi değildir. Kortizol fizyolojik olarak sabah yüksek, gece düşük seyreder; Cushing’de önemli bozukluklardan biri bu diürnal ritmin kaybıdır. Bu nedenle rastgele veya tek sabah ölçümü klinik kuşkuyu güvenle azaltmaz. Sabah kortizol ölçümü daha çok adrenal yetmezlik ekseninde anlamlı olabilir; bu hastada ise kilo artışı, proksimal güçsüzlük, mor stria, kolay morarma ve diyabet/hipertansiyon kötüleşmesi hiperkortizolizmi düşündüren fenotiptir.",
          "Öncelikle adrenal BT çekerek nodül varlığına göre karar vermek": "Adrenal BT ile başlamak sık yapılan bir hatadır. Adrenal insidentalomalar toplumda görülebilir ve biyokimyasal hiperkortizolizm kanıtlanmadan görüntüleme yapmak yanlış pozitif yorumlara yol açabilir. Önce otonom kortizol fazlalığı güvenilir tarama testleriyle gösterilmeli, ardından ACTH bağımlı/bağımsız ayrımı ve lokalizasyon yapılmalıdır. Bu vakada fenotip güçlü olsa da doğru sıra biyokimyasal doğrulamadan sonra görüntülemedir.",
          "Gece geç saat tükürük kortizolü, 1 mg deksametazon baskılama testi veya 24 saatlik idrar serbest kortizolüyle hiperkortizolizmi taramak": "Bu seçenek en uygundur. Hastada santral kilo artışı, supraklaviküler dolgunluk, geniş mor strialar, kolay morarma, proksimal kas güçsüzlüğü, hiperglisemi ve dirençli hipertansiyon hiperkortizolizm açısından güçlü klinik kuşku yaratır. İlk aşamada amaç kortizol fazlalığını güvenilir tarama testlerinden biriyle göstermektir: gece geç saat tükürük kortizolü diürnal ritim kaybını, 1 mg deksametazon baskılama testi baskılanamayan kortizol sekresyonunu, 24 saatlik idrar serbest kortizolü ise toplam serbest kortizol yükünü değerlendirir. Biyokimyasal kanıt olmadan görüntüleme veya lokalizasyon testine geçilmez.",
          "ACTH düzeyine bakmadan yüksek doz deksametazon baskılama testiyle kaynak lokalizasyonuna geçmek": "Yüksek doz deksametazon baskılama testi kaynak ayrımı/lokalizasyon mantığında tarihsel olarak kullanılan ileri bir basamaktır; tarama testi değildir. Ayrıca ACTH düzeyi bilinmeden ACTH bağımlı ve bağımsız tablolar ayrıştırılamaz. Bu hastada ilk soru hiperkortizolizmin varlığıdır; kaynak ayrımı daha sonra gelir. Bu nedenle yüksek doz testle doğrudan lokalizasyona geçmek tanısal sıralamayı bozar.",
          "Aldosteron-renin oranıyla mineralokortikoid fazlalığını taramak": "Aldosteron-renin oranı primer aldosteronizm taramasında kullanılır; dirençli hipertansiyon ve hipokalemi varsa çok değerlidir. Ancak bu hastada ana fenotip mor stria, proksimal kas güçsüzlüğü, kolay morarma, santral kilo artışı ve hiperglisemiyle glukokortikoid fazlalığı yönündedir. Hipokalemi hafif eşlik edebilir ama tanısal hedef mineralokortikoid fazlalığı değil hiperkortizolizmdir. Bu nedenle aldosteron-renin oranı bu olgunun ilk tarama testi değildir."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Cushing sendromunda tanısal sıra fenotipik kuşku → biyokimyasal hiperkortizolizm kanıtı → ACTH bağımlı/bağımsız ayrımı → hedefli görüntüleme şeklindedir.",
      "examPearl": "Cushing sorusunda adrenal BT’yi erken seçmek klasik tuzaktır; önce kortizol fazlalığını kanıtla.",
      "whyCorrect": "Doğru seçenek, güçlü klinik kuşkuyu uygun tarama testlerine bağlar ve rastgele kortizol/görüntüleme ile tanısal sıralamanın bozulmasını önler.",
      "optionComparison": "Sabah kortizolü ve adrenal BT ilk basamak değildir; yüksek doz deksametazon kaynak ayrımı için ileri basamaktır; aldosteron-renin primer aldosteronizm içindir.",
      "evidenceChain": [
        "Santral kilo artışı ve yüzde dolgunluk → glukokortikoid fazlalığı fenotipi.",
        "Mor stria ve kolay morarma → protein katabolizması/cilt incelmesi ipucu.",
        "Proksimal kas güçsüzlüğü → steroid miyopatisi paternini destekleme.",
        "Hiperglisemi ve dirençli hipertansiyon → kortizolün metabolik-kardiyovasküler etkileri.",
        "Ekzojen steroid kullanımı olmaması → endojen hiperkortizolizm araştırmasını güçlendirme."
      ],
      "whyWrong": {
        "Tek bir sabah serum kortizolü ölçümüyle tanıyı dışlamak": "Tek sabah kortizolü Cushing sendromu taraması için uygun bir dışlama testi değildir. Kortizol fizyolojik olarak sabah yüksek, gece düşük seyreder; Cushing’de önemli bozukluklardan biri bu diürnal ritmin kaybıdır. Bu nedenle rastgele veya tek sabah ölçümü klinik kuşkuyu güvenle azaltmaz. Sabah kortizol ölçümü daha çok adrenal yetmezlik ekseninde anlamlı olabilir; bu hastada ise kilo artışı, proksimal güçsüzlük, mor stria, kolay morarma ve diyabet/hipertansiyon kötüleşmesi hiperkortizolizmi düşündüren fenotiptir.",
        "Öncelikle adrenal BT çekerek nodül varlığına göre karar vermek": "Adrenal BT ile başlamak sık yapılan bir hatadır. Adrenal insidentalomalar toplumda görülebilir ve biyokimyasal hiperkortizolizm kanıtlanmadan görüntüleme yapmak yanlış pozitif yorumlara yol açabilir. Önce otonom kortizol fazlalığı güvenilir tarama testleriyle gösterilmeli, ardından ACTH bağımlı/bağımsız ayrımı ve lokalizasyon yapılmalıdır. Bu vakada fenotip güçlü olsa da doğru sıra biyokimyasal doğrulamadan sonra görüntülemedir.",
        "ACTH düzeyine bakmadan yüksek doz deksametazon baskılama testiyle kaynak lokalizasyonuna geçmek": "Yüksek doz deksametazon baskılama testi kaynak ayrımı/lokalizasyon mantığında tarihsel olarak kullanılan ileri bir basamaktır; tarama testi değildir. Ayrıca ACTH düzeyi bilinmeden ACTH bağımlı ve bağımsız tablolar ayrıştırılamaz. Bu hastada ilk soru hiperkortizolizmin varlığıdır; kaynak ayrımı daha sonra gelir. Bu nedenle yüksek doz testle doğrudan lokalizasyona geçmek tanısal sıralamayı bozar.",
        "Aldosteron-renin oranıyla mineralokortikoid fazlalığını taramak": "Aldosteron-renin oranı primer aldosteronizm taramasında kullanılır; dirençli hipertansiyon ve hipokalemi varsa çok değerlidir. Ancak bu hastada ana fenotip mor stria, proksimal kas güçsüzlüğü, kolay morarma, santral kilo artışı ve hiperglisemiyle glukokortikoid fazlalığı yönündedir. Hipokalemi hafif eşlik edebilir ama tanısal hedef mineralokortikoid fazlalığı değil hiperkortizolizmdir. Bu nedenle aldosteron-renin oranı bu olgunun ilk tarama testi değildir."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v286",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "feedbackAudit": "passed",
        "schemaReference": "v280-v285-render-safe-standard-cases"
      },
      "findings": [
        "Mor stria",
        "Proksimal kas güçsüzlüğü",
        "Görüntüleme öncesi biyokimyasal tarama"
      ],
      "images": []
    },
  {
      "id": "v286-new-622-uyusma-ve-yururken-dengesizlik",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Uyuşma ve yürürken dengesizlik",
      "difficulty": "hard",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Makrositer anemi, hipersegmente nötrofil, nörolojik bulgu ve metabolit paternini birleştirerek B12 eksikliğinin mekanizmasını ayırt etme.",
      "learningTarget": "Megaloblastik anemi ayırıcı tanısında B12-folat-demir eksikliği ve hemoliz paternlerini karşılaştırma.",
      "demographics": "57 yaşında kadın hasta",
      "setting": "Dahiliye polikliniği",
      "chiefComplaint": "Hasta halsizlik, el-ayak uyuşması ve yürürken dengesizlik nedeniyle başvuruyor.",
      "stem": "Hasta birkaç aydır merdiven çıkarken çabuk yorulduğunu ve son haftalarda ayak tabanlarında karıncalanma başladığını anlatır. Karanlıkta yürürken dengesinin daha kolay bozulduğunu, evde halıya takılacak gibi olduğunu söyler. Uzun süredir metformin kullandığını ve yıllar önce mide şikâyetleri nedeniyle asit baskılayıcı ilaç başlandığını belirtir. Dışkısında siyahlaşma, belirgin adet kanaması veya taze kan görmemiştir. Son günlerde dilinde yanma ve iştahsızlık da eklenince aile hekiminden yönlendirilmiştir.",
      "patientIntro": {
        "profile": "57 yaşında kadın hasta, dahiliye polikliniği başvurusunda değerlendiriliyor.",
        "presentation": "Hasta halsizlik, el-ayak uyuşması ve yürürken dengesizlik nedeniyle başvuruyor.",
        "historySummary": "Hasta birkaç aydır merdiven çıkarken çabuk yorulduğunu ve son haftalarda ayak tabanlarında karıncalanma başladığını anlatır. Karanlıkta yürürken dengesinin daha kolay bozulduğunu, evde halıya takılacak gibi olduğunu söyler. Uzun süredir metformin kullandığını ve yıllar önce mide şikâyetleri nedeniyle asit baskılayıcı ilaç başlandığını belirtir. Dışkısında siyahlaşma, belirgin adet kanaması veya taze kan görmemiştir. Son günlerde dilinde yanma ve iştahsızlık da eklenince aile hekiminden yönlendirilmiştir."
      },
      "vitals": {
        "TA": "118/72 mmHg",
        "Nabız": "102/dk",
        "Solunum": "18/dk",
        "SpO2": "%98, oda havasında",
        "Ateş": "36.5 °C",
        "Şok indeksi": "0.86; kapiller dolum normal, belirgin ortostatik yakınma yok"
      },
      "exam": [
        "Hasta soluk görünür, skleralarda belirgin ikter yoktur.",
        "Dil yüzeyi düzgün ve hassastır.",
        "Alt ekstremitelerde vibrasyon duyusu azalmış, Romberg testi belirgin dengesizlikle pozitiftir.",
        "Karında organomegali saptanmaz; dışkı muayenesinde belirgin melena izlenmez."
      ],
      "investigations": [
        {
          "id": "v286-new-622-uyusma-ve-yururken-dengesizlik-hemogram-yayma",
          "label": "Hemogram ve periferik yayma",
          "title": "Hemogram ve periferik yayma",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Hemogram ve periferik yayma",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Makrositoz ve hipersegmente nötrofiller megaloblastik hematopoezi destekler.",
          "clinicalMeaning": "Makrositoz ve hipersegmente nötrofiller megaloblastik hematopoezi destekler.",
          "result": {
            "title": "Hemogram ve periferik yayma",
            "summary": "Makrositoz ve hipersegmente nötrofiller megaloblastik hematopoezi destekler.",
            "interpretation": "Makrositoz ve hipersegmente nötrofiller megaloblastik hematopoezi destekler.",
            "values": [
              [
                "Hemoglobin",
                "8.7 g/dL",
                "12-16 g/dL",
                "Düşük"
              ],
              [
                "MCV",
                "118 fL",
                "80-100 fL",
                "Yüksek"
              ],
              [
                "Lökosit",
                "3.200/µL",
                "4.000-10.000/µL",
                "Düşük"
              ],
              [
                "Trombosit",
                "126.000/µL",
                "150.000-400.000/µL",
                "Düşük"
              ],
              [
                "Yayma",
                "Makroovalosit + hipersegmente nötrofil",
                "Beklenmez",
                "Megaloblastik patern"
              ]
            ],
            "rows": [
              [
                "Hemoglobin",
                "8.7 g/dL",
                "12-16 g/dL",
                "Düşük"
              ],
              [
                "MCV",
                "118 fL",
                "80-100 fL",
                "Yüksek"
              ],
              [
                "Lökosit",
                "3.200/µL",
                "4.000-10.000/µL",
                "Düşük"
              ],
              [
                "Trombosit",
                "126.000/µL",
                "150.000-400.000/µL",
                "Düşük"
              ],
              [
                "Yayma",
                "Makroovalosit + hipersegmente nötrofil",
                "Beklenmez",
                "Megaloblastik patern"
              ]
            ]
          }
        },
        {
          "id": "v286-new-622-uyusma-ve-yururken-dengesizlik-vitamin-metabolit",
          "label": "Vitamin düzeyleri ve metabolitler",
          "title": "Vitamin düzeyleri ve metabolitler",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Vitamin düzeyleri ve metabolitler",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "B12 düşüklüğüne eşlik eden yüksek metilmalonik asit nörolojik bulgularla uyumludur.",
          "clinicalMeaning": "B12 düşüklüğüne eşlik eden yüksek metilmalonik asit nörolojik bulgularla uyumludur.",
          "result": {
            "title": "Vitamin düzeyleri ve metabolitler",
            "summary": "B12 düşüklüğüne eşlik eden yüksek metilmalonik asit nörolojik bulgularla uyumludur.",
            "interpretation": "B12 düşüklüğüne eşlik eden yüksek metilmalonik asit nörolojik bulgularla uyumludur.",
            "values": [
              [
                "Vitamin B12",
                "92 pg/mL",
                "200-900 pg/mL",
                "Düşük"
              ],
              [
                "Folat",
                "8.4 ng/mL",
                ">4 ng/mL",
                "Normal"
              ],
              [
                "Metilmalonik asit",
                "1.8 µmol/L",
                "<0.4 µmol/L",
                "Yüksek"
              ],
              [
                "Homosistein",
                "34 µmol/L",
                "<15 µmol/L",
                "Yüksek"
              ]
            ],
            "rows": [
              [
                "Vitamin B12",
                "92 pg/mL",
                "200-900 pg/mL",
                "Düşük"
              ],
              [
                "Folat",
                "8.4 ng/mL",
                ">4 ng/mL",
                "Normal"
              ],
              [
                "Metilmalonik asit",
                "1.8 µmol/L",
                "<0.4 µmol/L",
                "Yüksek"
              ],
              [
                "Homosistein",
                "34 µmol/L",
                "<15 µmol/L",
                "Yüksek"
              ]
            ]
          }
        },
        {
          "id": "v286-new-622-uyusma-ve-yururken-dengesizlik-hemoliz-demir",
          "label": "Hemoliz ve demir çalışmaları",
          "title": "Hemoliz ve demir çalışmaları",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Hemoliz ve demir çalışmaları",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "LDH yüksekliği etkisiz hematopoezle görülebilir; retikülosit yanıtı periferik hemoliz lehine değildir.",
          "clinicalMeaning": "LDH yüksekliği etkisiz hematopoezle görülebilir; retikülosit yanıtı periferik hemoliz lehine değildir.",
          "result": {
            "title": "Hemoliz ve demir çalışmaları",
            "summary": "LDH yüksekliği etkisiz hematopoezle görülebilir; retikülosit yanıtı periferik hemoliz lehine değildir.",
            "interpretation": "LDH yüksekliği etkisiz hematopoezle görülebilir; retikülosit yanıtı periferik hemoliz lehine değildir.",
            "values": [
              [
                "Retikülosit",
                "%0.6",
                "%0.5-2.5",
                "Yetersiz yanıt"
              ],
              [
                "Ferritin",
                "78 ng/mL",
                "15-150 ng/mL",
                "Normal"
              ],
              [
                "LDH",
                "620 U/L",
                "<250 U/L",
                "Yüksek"
              ],
              [
                "Direkt antiglobulin testi",
                "Negatif",
                "Negatif",
                "Hemoliz antikoru yok"
              ]
            ],
            "rows": [
              [
                "Retikülosit",
                "%0.6",
                "%0.5-2.5",
                "Yetersiz yanıt"
              ],
              [
                "Ferritin",
                "78 ng/mL",
                "15-150 ng/mL",
                "Normal"
              ],
              [
                "LDH",
                "620 U/L",
                "<250 U/L",
                "Yüksek"
              ],
              [
                "Direkt antiglobulin testi",
                "Negatif",
                "Negatif",
                "Hemoliz antikoru yok"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastadaki hematolojik ve nörolojik bulguları en iyi açıklayan süreç aşağıdakilerden hangisidir?",
      "questionType": "mechanism",
      "answerTarget": "Megaloblastik anemi ve nörolojik bulgu mekanizması",
      "diagnosis": {
        "correct": "Timidilat sentezinde aksama ve metilmalonil-CoA mutaz basamağında bozulma",
        "options": [
          "Timidilat sentezinde aksama ve metilmalonil-CoA mutaz basamağında bozulma",
          "Demir eksikliğine bağlı hem sentez azalması ve mikrositik eritropoez",
          "Timidilat sentezinde aksama ancak metilmalonil-CoA mutaz basamağının korunması",
          "Alfa globin zincir sentez azalmasına bağlı hedef hücreli mikrositoz",
          "Sıcak antikor aracılı ekstravasküler hemoliz ve retikülositoz"
        ],
        "question": "Bu hastadaki hematolojik ve nörolojik bulguları en iyi açıklayan süreç aşağıdakilerden hangisidir?",
        "explanation": "Makrositer anemi, hipersegmente nötrofiller, düşük B12, yüksek metilmalonik asit ve posterior kolon bulguları B12 eksikliğiyle açıklanır. Folat eksikliği megaloblastik anemi yapabilse de metilmalonik asit artışı ve nörolojik tutulum B12 lehinedir.",
        "pearls": [
          "B12 ve folat ikisi de homosisteini yükseltebilir.",
          "Metilmalonik asit artışı B12 eksikliğini folattan ayırmada değerlidir.",
          "Nörolojik bulgu varsa folat tek başına verilmeden B12 eksikliği düşünülmelidir."
        ],
        "optionFeedback": {
          "Timidilat sentezinde aksama ve metilmalonil-CoA mutaz basamağında bozulma": "Bu seçenek en uygundur. Makrositoz, hipersegmente nötrofiller, pansitopeniye eğilim, düşük B12 düzeyi, yüksek homosistein ve yüksek metilmalonik asit birlikte B12 eksikliğini destekler. B12 eksikliğinde timidilat/DNA sentezi bozulduğu için megaloblastik hematopoez gelişir; ayrıca metilmalonil-CoA mutaz basamağı etkilendiğinden metilmalonik asit yükselir ve posterior kolon/periferik sinir bulguları ortaya çıkabilir. Yürüme dengesizliği, vibrasyon azalması ve parestezi folat eksikliğinden çok B12 eksikliğini öne çıkarır.",
          "Demir eksikliğine bağlı hem sentez azalması ve mikrositik eritropoez": "Demir eksikliği en sık anemi nedenlerindendir ve halsizlik, çarpıntı, pika veya kronik kan kaybı öyküsüyle gelebilir; fakat tipik olarak MCV düşüktür, ferritin azalır ve hipersegmente nötrofil beklenmez. Bu hastada MCV 118 fL, B12 düşük, metilmalonik asit yüksek ve nörolojik bulgular vardır. Demir eksikliği nöropati ve posterior kolon bulgusunu açıklamaz. Bu nedenle hem sentez azalması mevcut paternin ana mekanizması değildir.",
          "Timidilat sentezinde aksama ancak metilmalonil-CoA mutaz basamağının korunması": "Folat eksikliği de megaloblastik anemi yapabilir ve homosistein düzeyini yükseltebilir; bu nedenle B12 eksikliğiyle karışır. Ancak folat eksikliğinde metilmalonik asit genellikle normaldir ve belirgin nörolojik bulgu beklenmez. Bu vakada parestezi, vibrasyon duyusunda azalma ve yürüme dengesizliği vardır; ayrıca B12 düzeyi düşüktür ve metilmalonik asit artmıştır. Folat eksikliğini seçmek, nörolojik bulguyu ve MMA bilgisini gözden kaçırmak olur.",
          "Alfa globin zincir sentez azalmasına bağlı hedef hücreli mikrositoz": "Alfa talasemi veya diğer talasemiler mikrositik, çoğu zaman hipokromik anemi ve hedef hücrelerle düşünülür. Genellikle MCV belirgin düşük, eritrosit sayısı göreceli yüksek olabilir; nörolojik bulgu beklenmez. Bu hastada makrositoz, hipersegmente nötrofil ve B12 metabolit bozukluğu vardır. Bu nedenle globin zincir sentez azalması doğru mekanizma değildir.",
          "Sıcak antikor aracılı ekstravasküler hemoliz ve retikülositoz": "Sıcak antikor aracılı hemolizde indirekt bilirubin ve LDH artabilir; ancak retikülositoz beklenir ve direkt antiglobulin testi pozitifliği ayırt ettiricidir. Bu hastada retikülosit yanıtı yetersizdir; çünkü sorun periferde yıkım değil kemik iliğinde etkisiz DNA sentezi ve olgunlaşma kusurudur. Koyu idrar, sferosit veya belirgin DAT pozitifliği verilmemiştir. Nörolojik bulgular da hemolizden çok B12 eksikliğini destekler."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "B12 eksikliği DNA sentez bozukluğu nedeniyle megaloblastik anemi, metilmalonik asit birikimi nedeniyle de nörolojik bulgular oluşturabilir.",
      "examPearl": "Makrositoz + hipersegmente nötrofil + nörolojik bulgu = B12; MMA artışı bu ayrımı güçlendirir.",
      "whyCorrect": "Doğru seçenek hem kemik iliği olgunlaşma kusurunu hem de nörolojik bulguyu tek mekanizma altında birleştirir.",
      "optionComparison": "Demir eksikliği ve talasemi mikrositoz yapar; folat eksikliği MMA ve nörolojik bulguyu açıklamaz; hemolizde retikülosit yanıtı beklenir.",
      "evidenceChain": [
        "MCV 118 fL ve makroovalosit → megaloblastik patern.",
        "Hipersegmente nötrofil → DNA sentez bozukluğu ipucu.",
        "B12 düşük, folat normal → B12 eksikliği yönünde ayrım.",
        "Metilmalonik asit yüksekliği → folat eksikliğinden ayrım.",
        "Vibrasyon azalması ve Romberg pozitifliği → nörolojik tutulum."
      ],
      "whyWrong": {
        "Demir eksikliğine bağlı hem sentez azalması ve mikrositik eritropoez": "Demir eksikliği en sık anemi nedenlerindendir ve halsizlik, çarpıntı, pika veya kronik kan kaybı öyküsüyle gelebilir; fakat tipik olarak MCV düşüktür, ferritin azalır ve hipersegmente nötrofil beklenmez. Bu hastada MCV 118 fL, B12 düşük, metilmalonik asit yüksek ve nörolojik bulgular vardır. Demir eksikliği nöropati ve posterior kolon bulgusunu açıklamaz. Bu nedenle hem sentez azalması mevcut paternin ana mekanizması değildir.",
        "Timidilat sentezinde aksama ancak metilmalonil-CoA mutaz basamağının korunması": "Folat eksikliği de megaloblastik anemi yapabilir ve homosistein düzeyini yükseltebilir; bu nedenle B12 eksikliğiyle karışır. Ancak folat eksikliğinde metilmalonik asit genellikle normaldir ve belirgin nörolojik bulgu beklenmez. Bu vakada parestezi, vibrasyon duyusunda azalma ve yürüme dengesizliği vardır; ayrıca B12 düzeyi düşüktür ve metilmalonik asit artmıştır. Folat eksikliğini seçmek, nörolojik bulguyu ve MMA bilgisini gözden kaçırmak olur.",
        "Alfa globin zincir sentez azalmasına bağlı hedef hücreli mikrositoz": "Alfa talasemi veya diğer talasemiler mikrositik, çoğu zaman hipokromik anemi ve hedef hücrelerle düşünülür. Genellikle MCV belirgin düşük, eritrosit sayısı göreceli yüksek olabilir; nörolojik bulgu beklenmez. Bu hastada makrositoz, hipersegmente nötrofil ve B12 metabolit bozukluğu vardır. Bu nedenle globin zincir sentez azalması doğru mekanizma değildir.",
        "Sıcak antikor aracılı ekstravasküler hemoliz ve retikülositoz": "Sıcak antikor aracılı hemolizde indirekt bilirubin ve LDH artabilir; ancak retikülositoz beklenir ve direkt antiglobulin testi pozitifliği ayırt ettiricidir. Bu hastada retikülosit yanıtı yetersizdir; çünkü sorun periferde yıkım değil kemik iliğinde etkisiz DNA sentezi ve olgunlaşma kusurudur. Koyu idrar, sferosit veya belirgin DAT pozitifliği verilmemiştir. Nörolojik bulgular da hemolizden çok B12 eksikliğini destekler."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v286",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "feedbackAudit": "passed",
        "schemaReference": "v280-v285-render-safe-standard-cases"
      },
      "findings": [
        "MMA yüksekliği",
        "Nörolojik bulgu",
        "Hipersegmente nötrofil"
      ],
      "images": []
    },
  {
      "id": "v286-new-623-yeni-ilac-sonrasi-dokuntu-ve-kreatinin-artisi",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Yeni ilaç sonrası döküntü ve kreatinin artışı",
      "difficulty": "hard",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Yeni ilaç maruziyeti sonrası ateş-döküntü-eozinofili, steril piyüri ve lökosit silendirleriyle akut interstisyel nefrit paternini tanıma.",
      "learningTarget": "Akut böbrek hasarında prerenal, ATN, glomerülonefrit, kolesterol embolisi ve interstisyel nefrit ayrımını sediment ve öyküyle yapma.",
      "demographics": "49 yaşında erkek hasta",
      "setting": "Nefroloji konsültasyonu",
      "chiefComplaint": "Hasta birkaç haftadır kullandığı mide ilacından sonra döküntü ve böbrek fonksiyon bozukluğu nedeniyle değerlendiriliyor.",
      "stem": "Hasta yaklaşık üç hafta önce reflü şikâyeti için yeni bir mide ilacı başlandığını, sonrasında gövdesinde kaşıntılı döküntüler fark ettiğini anlatır. Son birkaç gündür halsizlik ve iştahsızlık olmuş, aile hekimi kontrolünde kreatinin yüksekliği görülünce acile yönlendirilmiştir. İdrar yaparken yanma tariflemez; idrarında belirgin kan, taş düşürme veya kolik tarzda yan ağrısı olmamıştır. Yakın zamanda anjiyografi, damar girişimi ya da ağır kanama geçirmemiştir. Ateşi evde en fazla 37.8 °C ölçülmüş, tansiyon düşüklüğü veya bilinç bulanıklığı yaşamamıştır.",
      "patientIntro": {
        "profile": "49 yaşında erkek hasta, nefroloji konsültasyonu başvurusunda değerlendiriliyor.",
        "presentation": "Hasta birkaç haftadır kullandığı mide ilacından sonra döküntü ve böbrek fonksiyon bozukluğu nedeniyle değerlendiriliyor.",
        "historySummary": "Hasta yaklaşık üç hafta önce reflü şikâyeti için yeni bir mide ilacı başlandığını, sonrasında gövdesinde kaşıntılı döküntüler fark ettiğini anlatır. Son birkaç gündür halsizlik ve iştahsızlık olmuş, aile hekimi kontrolünde kreatinin yüksekliği görülünce acile yönlendirilmiştir. İdrar yaparken yanma tariflemez; idrarında belirgin kan, taş düşürme veya kolik tarzda yan ağrısı olmamıştır. Yakın zamanda anjiyografi, damar girişimi ya da ağır kanama geçirmemiştir. Ateşi evde en fazla 37.8 °C ölçülmüş, tansiyon düşüklüğü veya bilinç bulanıklığı yaşamamıştır."
      },
      "vitals": {
        "TA": "126/78 mmHg",
        "Nabız": "88/dk",
        "Solunum": "16/dk",
        "SpO2": "%98, oda havasında",
        "Ateş": "37.7 °C",
        "Şok indeksi": "0.70; ekstremiteler sıcak, kapiller dolum normal"
      },
      "exam": [
        "Gövde ve üst kollarda soluk eritemli makülopapüler döküntüler izleniyor.",
        "Batında hassasiyet yok; kostovertebral açı hassasiyeti saptanmıyor.",
        "Pretibial belirgin ödem yok; akciğer oskültasyonu doğal.",
        "Parmak uçlarında livedo, morarma veya periferik emboli bulgusu izlenmiyor."
      ],
      "investigations": [
        {
          "id": "v286-new-623-yeni-ilac-sonrasi-dokuntu-ve-kreatinin-artisi-bobrek-fonksiyon",
          "label": "Böbrek fonksiyon testleri ve elektrolitler",
          "title": "Böbrek fonksiyon testleri ve elektrolitler",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Böbrek fonksiyon testleri ve elektrolitler",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Akut böbrek fonksiyon bozukluğu vardır; ağır hiperkalemi veya şok bulgusu eşlik etmiyor.",
          "clinicalMeaning": "Akut böbrek fonksiyon bozukluğu vardır; ağır hiperkalemi veya şok bulgusu eşlik etmiyor.",
          "result": {
            "title": "Böbrek fonksiyon testleri ve elektrolitler",
            "summary": "Akut böbrek fonksiyon bozukluğu vardır; ağır hiperkalemi veya şok bulgusu eşlik etmiyor.",
            "interpretation": "Akut böbrek fonksiyon bozukluğu vardır; ağır hiperkalemi veya şok bulgusu eşlik etmiyor.",
            "values": [
              [
                "Kreatinin",
                "2.4 mg/dL",
                "0.7-1.2 mg/dL",
                "Yüksek"
              ],
              [
                "Üre",
                "54 mg/dL",
                "15-45 mg/dL",
                "Yüksek"
              ],
              [
                "Potasyum",
                "4.8 mmol/L",
                "3.5-5.1 mmol/L",
                "Normal-yüksek"
              ],
              [
                "Bikarbonat",
                "20 mmol/L",
                "22-28 mmol/L",
                "Hafif düşük"
              ]
            ],
            "rows": [
              [
                "Kreatinin",
                "2.4 mg/dL",
                "0.7-1.2 mg/dL",
                "Yüksek"
              ],
              [
                "Üre",
                "54 mg/dL",
                "15-45 mg/dL",
                "Yüksek"
              ],
              [
                "Potasyum",
                "4.8 mmol/L",
                "3.5-5.1 mmol/L",
                "Normal-yüksek"
              ],
              [
                "Bikarbonat",
                "20 mmol/L",
                "22-28 mmol/L",
                "Hafif düşük"
              ]
            ]
          }
        },
        {
          "id": "v286-new-623-yeni-ilac-sonrasi-dokuntu-ve-kreatinin-artisi-hemogram-eozinofil",
          "label": "Hemogram ve eozinofil sayısı",
          "title": "Hemogram ve eozinofil sayısı",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Hemogram ve eozinofil sayısı",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Eozinofili ilaç ilişkili hipersensitivite paternini destekler.",
          "clinicalMeaning": "Eozinofili ilaç ilişkili hipersensitivite paternini destekler.",
          "result": {
            "title": "Hemogram ve eozinofil sayısı",
            "summary": "Eozinofili ilaç ilişkili hipersensitivite paternini destekler.",
            "interpretation": "Eozinofili ilaç ilişkili hipersensitivite paternini destekler.",
            "values": [
              [
                "Lökosit",
                "9.900/µL",
                "4.000-10.000/µL",
                "Üst sınır"
              ],
              [
                "Eozinofil",
                "%9",
                "%0-5",
                "Yüksek"
              ],
              [
                "Hemoglobin",
                "13.6 g/dL",
                "13-17 g/dL",
                "Normal"
              ],
              [
                "Trombosit",
                "248.000/µL",
                "150.000-400.000/µL",
                "Normal"
              ]
            ],
            "rows": [
              [
                "Lökosit",
                "9.900/µL",
                "4.000-10.000/µL",
                "Üst sınır"
              ],
              [
                "Eozinofil",
                "%9",
                "%0-5",
                "Yüksek"
              ],
              [
                "Hemoglobin",
                "13.6 g/dL",
                "13-17 g/dL",
                "Normal"
              ],
              [
                "Trombosit",
                "248.000/µL",
                "150.000-400.000/µL",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v286-new-623-yeni-ilac-sonrasi-dokuntu-ve-kreatinin-artisi-idrar-sedimenti",
          "label": "Tam idrar tetkiki ve sediment",
          "title": "Tam idrar tetkiki ve sediment",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Tam idrar tetkiki ve sediment",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Steril piyüri ve lökosit silendiri interstisyel inflamasyon lehine önemli bulgulardır.",
          "clinicalMeaning": "Steril piyüri ve lökosit silendiri interstisyel inflamasyon lehine önemli bulgulardır.",
          "result": {
            "title": "Tam idrar tetkiki ve sediment",
            "summary": "Steril piyüri ve lökosit silendiri interstisyel inflamasyon lehine önemli bulgulardır.",
            "interpretation": "Steril piyüri ve lökosit silendiri interstisyel inflamasyon lehine önemli bulgulardır.",
            "values": [
              [
                "Protein",
                "1+",
                "Negatif/trace",
                "Hafif"
              ],
              [
                "Eritrosit",
                "2-3/hpf",
                "0-2/hpf",
                "Belirgin değil"
              ],
              [
                "Lökosit",
                "25-30/hpf",
                "0-5/hpf",
                "Yüksek"
              ],
              [
                "Lökosit silendiri",
                "Pozitif",
                "Negatif",
                "Patolojik"
              ],
              [
                "Nitrit",
                "Negatif",
                "Negatif",
                "Enfeksiyon lehine değil"
              ]
            ],
            "rows": [
              [
                "Protein",
                "1+",
                "Negatif/trace",
                "Hafif"
              ],
              [
                "Eritrosit",
                "2-3/hpf",
                "0-2/hpf",
                "Belirgin değil"
              ],
              [
                "Lökosit",
                "25-30/hpf",
                "0-5/hpf",
                "Yüksek"
              ],
              [
                "Lökosit silendiri",
                "Pozitif",
                "Negatif",
                "Patolojik"
              ],
              [
                "Nitrit",
                "Negatif",
                "Negatif",
                "Enfeksiyon lehine değil"
              ]
            ]
          }
        },
        {
          "id": "v286-new-623-yeni-ilac-sonrasi-dokuntu-ve-kreatinin-artisi-kompleman-kultur",
          "label": "Tamamlayıcı testler",
          "title": "Tamamlayıcı testler",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Tamamlayıcı testler",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Düşük komplemanlı nefrit, enfeksiyöz piyüri ve postrenal obstrüksiyon verileri desteklenmiyor.",
          "clinicalMeaning": "Düşük komplemanlı nefrit, enfeksiyöz piyüri ve postrenal obstrüksiyon verileri desteklenmiyor.",
          "result": {
            "title": "Tamamlayıcı testler",
            "summary": "Düşük komplemanlı nefrit, enfeksiyöz piyüri ve postrenal obstrüksiyon verileri desteklenmiyor.",
            "interpretation": "Düşük komplemanlı nefrit, enfeksiyöz piyüri ve postrenal obstrüksiyon verileri desteklenmiyor.",
            "values": [
              [
                "C3",
                "104 mg/dL",
                "90-180 mg/dL",
                "Normal"
              ],
              [
                "İdrar kültürü",
                "Üreme yok",
                "Üreme yok",
                "Steril"
              ],
              [
                "Renal USG",
                "Hidronefroz yok",
                "Yok",
                "Obstrüksiyon dışı"
              ]
            ],
            "rows": [
              [
                "C3",
                "104 mg/dL",
                "90-180 mg/dL",
                "Normal"
              ],
              [
                "İdrar kültürü",
                "Üreme yok",
                "Üreme yok",
                "Steril"
              ],
              [
                "Renal USG",
                "Hidronefroz yok",
                "Yok",
                "Obstrüksiyon dışı"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastadaki akut böbrek fonksiyon bozukluğunu en iyi açıklayan süreç aşağıdakilerden hangisidir?",
      "questionType": "diagnosis",
      "answerTarget": "İlaç sonrası akut böbrek hasarında patolojik süreç ayrımı",
      "diagnosis": {
        "correct": "İlaç ilişkili akut interstisyel nefrit",
        "options": [
          "İleri dehidratasyona bağlı prerenal azotemi",
          "Sepsis ilişkili akut tübüler nekroz",
          "Kolesterol embolilerine bağlı renal iskemi",
          "İlaç ilişkili akut interstisyel nefrit",
          "Poststreptokokal immün kompleks glomerülonefriti"
        ],
        "question": "Bu hastadaki akut böbrek fonksiyon bozukluğunu en iyi açıklayan süreç aşağıdakilerden hangisidir?",
        "explanation": "Yeni ilaç maruziyeti, döküntü, düşük dereceli ateş, eozinofili, steril piyüri ve lökosit silendirleri ilaç ilişkili akut interstisyel nefriti destekler. Prerenal azotemi, ATN, glomerülonefrit ve kolesterol embolisi belirli verilerle karışabilir; ancak bu vakada ilaç-zaman ilişkisi ve idrar sedimentinde interstisyel inflamasyon belirleyicidir.",
        "pearls": [
          "AIN’de klasik ateş-döküntü-eozinofili triadı her zaman tam olmayabilir.",
          "Steril piyüri ve lökosit silendiri önemli ayırıcı ipuçlarıdır.",
          "İlk adım sorumlu ilacı kesmek ve böbrek fonksiyonunu izlemektir."
        ],
        "optionFeedback": {
          "İleri dehidratasyona bağlı prerenal azotemi": "Prerenal azotemi hipovolemi, kanama, aşırı diürez veya düşük efektif dolaşım hacmiyle gelişir; BUN/kreatinin oranı belirgin artabilir ve idrar sodyumu düşük olabilir. Bu hastada ise yeni ilaç maruziyeti sonrası döküntü, ateş, eozinofili, steril piyüri ve lökosit silendirleri vardır. Bu bulgular prerenal mekanizmadan çok interstisyel inflamasyonu destekler. Hafif iştahsızlık veya sıvı azalması eşlik edebilse de ana patern yalnız volüm eksikliği değildir.",
          "Sepsis ilişkili akut tübüler nekroz": "Akut tübüler nekroz ağır sepsis, uzamış hipotansiyon, nefrotoksin veya iskemi sonrası granüler silendirlerle gündeme gelir. Bu vakada belirgin hipotansiyon, laktat yüksekliği veya septik tablo yoktur; ateş düşük derecelidir ve ilaç başlangıcından sonra döküntüyle birlikte gelişmiştir. İdrarda lökosit silendiri ve eozinofili tübüler nekrozdan çok interstisyel nefrit lehinedir. ATN doğru olsaydı çamurumsu granüler silendirler ve iskemik/nefrotoksik bağlam daha belirgin olurdu.",
          "Kolesterol embolilerine bağlı renal iskemi": "Kolesterol embolileri genellikle vasküler girişim, anjiyografi veya antikoagülasyon sonrası livedo retikülaris, mavi parmak, eozinofili ve böbrek fonksiyon bozukluğu ile gelişebilir. Bu hastada böyle bir damar girişimi veya periferik iskemik cilt bulgusu yoktur; öyküde proton pompa inhibitörü/antibiyotik gibi yeni ilaç maruziyeti ön plandadır. Eozinofili iki tabloda da görülebilir; ayırıcı nokta idrardaki lökosit silendiri ve ilaç-zaman ilişkisidir.",
          "İlaç ilişkili akut interstisyel nefrit": "Bu seçenek en uygundur. Yeni ilaç başlanmasından haftalar sonra gelişen kreatinin artışı, düşük dereceli ateş, makülopapüler döküntü, eozinofili, steril piyüri ve lökosit silendirleri ilaç ilişkili akut interstisyel nefrit paternini oluşturur. Klasik triad her hastada tam olmayabilir; bu nedenle idrar sedimentindeki inflamatuvar bulgular ve ilaç-zaman ilişkisi önemlidir. İlk yaklaşım sorumlu ilacın kesilmesi, böbrek fonksiyonunun izlenmesi ve düzelme olmazsa nefroloji değerlendirmesi/biopsi-steroid tartışmasıdır.",
          "Poststreptokokal immün kompleks glomerülonefriti": "Poststreptokokal glomerülonefrit genellikle boğaz veya cilt enfeksiyonundan sonra hematüri, eritrosit silendirleri, hipertansiyon, ödem ve düşük C3 ile gelir. Bu hastada yeni ilaç kullanımı sonrası döküntü, eozinofili ve steril piyüri ön plandadır; C3 normaldir ve eritrosit silendirleri verilmemiştir. Hafif proteinüri olabilir, fakat glomerüler nefrit paternini destekleyen bulgular yetersizdir. Bu nedenle immün kompleks glomerülonefriti doğru süreç değildir."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Akut interstisyel nefrit çoğunlukla ilaçlara karşı gecikmiş hipersensitivite yanıtıyla gelişir; öykü, eozinofili ve idrar sedimentindeki inflamatuvar bulgular tanısal yönlendiricidir.",
      "examPearl": "Yeni ilaç + döküntü + eozinofili + steril piyüri/lökosit silendiri gördüğünde AIN düşün.",
      "whyCorrect": "Doğru seçenek, hastadaki ilaç-zaman ilişkisini böbrek sedimentindeki lökosit baskın inflamasyonla birleştirir.",
      "optionComparison": "Prerenal azotemi volüm bulgusu ister; ATN granüler silendir/iskemi-nefrotoksin bağlamı ister; kolesterol embolisi damar girişimi ve periferik iskemi bulgusu ister; poststreptokokal GN düşük kompleman ve eritrosit silendiriyle beklenir.",
      "evidenceChain": [
        "Yeni mide ilacı sonrası 3 hafta → ilaç-zaman ilişkisi.",
        "Döküntü ve eozinofili → hipersensitivite paternini destekleme.",
        "Steril piyüri ve lökosit silendiri → interstisyel inflamasyon.",
        "C3 normal ve eritrosit silendiri yok → postenfeksiyöz GN zayıf.",
        "Damar girişimi/livedo yokluğu → kolesterol embolisi zayıf."
      ],
      "whyWrong": {
        "İleri dehidratasyona bağlı prerenal azotemi": "Prerenal azotemi hipovolemi, kanama, aşırı diürez veya düşük efektif dolaşım hacmiyle gelişir; BUN/kreatinin oranı belirgin artabilir ve idrar sodyumu düşük olabilir. Bu hastada ise yeni ilaç maruziyeti sonrası döküntü, ateş, eozinofili, steril piyüri ve lökosit silendirleri vardır. Bu bulgular prerenal mekanizmadan çok interstisyel inflamasyonu destekler. Hafif iştahsızlık veya sıvı azalması eşlik edebilse de ana patern yalnız volüm eksikliği değildir.",
        "Sepsis ilişkili akut tübüler nekroz": "Akut tübüler nekroz ağır sepsis, uzamış hipotansiyon, nefrotoksin veya iskemi sonrası granüler silendirlerle gündeme gelir. Bu vakada belirgin hipotansiyon, laktat yüksekliği veya septik tablo yoktur; ateş düşük derecelidir ve ilaç başlangıcından sonra döküntüyle birlikte gelişmiştir. İdrarda lökosit silendiri ve eozinofili tübüler nekrozdan çok interstisyel nefrit lehinedir. ATN doğru olsaydı çamurumsu granüler silendirler ve iskemik/nefrotoksik bağlam daha belirgin olurdu.",
        "Kolesterol embolilerine bağlı renal iskemi": "Kolesterol embolileri genellikle vasküler girişim, anjiyografi veya antikoagülasyon sonrası livedo retikülaris, mavi parmak, eozinofili ve böbrek fonksiyon bozukluğu ile gelişebilir. Bu hastada böyle bir damar girişimi veya periferik iskemik cilt bulgusu yoktur; öyküde proton pompa inhibitörü/antibiyotik gibi yeni ilaç maruziyeti ön plandadır. Eozinofili iki tabloda da görülebilir; ayırıcı nokta idrardaki lökosit silendiri ve ilaç-zaman ilişkisidir.",
        "Poststreptokokal immün kompleks glomerülonefriti": "Poststreptokokal glomerülonefrit genellikle boğaz veya cilt enfeksiyonundan sonra hematüri, eritrosit silendirleri, hipertansiyon, ödem ve düşük C3 ile gelir. Bu hastada yeni ilaç kullanımı sonrası döküntü, eozinofili ve steril piyüri ön plandadır; C3 normaldir ve eritrosit silendirleri verilmemiştir. Hafif proteinüri olabilir, fakat glomerüler nefrit paternini destekleyen bulgular yetersizdir. Bu nedenle immün kompleks glomerülonefriti doğru süreç değildir."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v286",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "feedbackAudit": "passed",
        "schemaReference": "v280-v285-render-safe-standard-cases"
      },
      "findings": [
        "İlaç-zaman ilişkisi",
        "Eozinofili",
        "Steril piyüri ve lökosit silendiri"
      ],
      "images": []
    },
  {
      "id": "v287-new-624-merdiven-cikarken-bayilma",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Merdiven çıkarken bayılma",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Eforla senkop ve göğüs baskısı olan yaşlı hastada muayene ve ekokardiyografi verileriyle semptomatik ciddi kapak darlığını tanıyıp prognozu değiştiren girişim kararını seçme.",
      "learningTarget": "Semptomatik ciddi aort kapak darlığında medikal semptom kontrolü ile kapak replasmanı endikasyonunu ayırma.",
      "demographics": "72 yaşında erkek hasta",
      "setting": "Kardiyoloji polikliniği",
      "chiefComplaint": "Hasta, merdiven çıkarken kısa süreli bayılma yaşadığı için kardiyoloji polikliniğine başvuruyor.",
      "stem": "Hasta son altı aydır yokuş çıkarken göğsünün ortasında baskı hissettiğini, son haftalarda aynı mesafeyi yürürken daha çabuk yorulduğunu anlatır. Üç gün önce apartman merdiveninde başı dönmüş, tutunamadan yere oturmuş ve birkaç saniye sonra kendine gelmiştir. Bayılma öncesinde çarpıntı hissetmediğini, olaydan sonra konuşmasında bozulma veya kol-bacak güçsüzlüğü olmadığını söyler. Uzun süredir hipertansiyon nedeniyle ilaç kullanır; ateş, yeni öksürük veya siyah dışkı tariflemez. Ailesi, son aylarda yürürken sık sık durup dinlenmek zorunda kaldığını fark ettiği için muayeneyi ertelememesini istemiştir.",
      "patientIntro": {
        "profile": "72 yaşında erkek hasta, kardiyoloji polikliniği başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, merdiven çıkarken kısa süreli bayılma yaşadığı için kardiyoloji polikliniğine başvuruyor.",
        "historySummary": "Hasta son altı aydır yokuş çıkarken göğsünün ortasında baskı hissettiğini, son haftalarda aynı mesafeyi yürürken daha çabuk yorulduğunu anlatır. Üç gün önce apartman merdiveninde başı dönmüş, tutunamadan yere oturmuş ve birkaç saniye sonra kendine gelmiştir. Bayılma öncesinde çarpıntı hissetmediğini, olaydan sonra konuşmasında bozulma veya kol-bacak güçsüzlüğü olmadığını söyler. Uzun süredir hipertansiyon nedeniyle ilaç kullanır; ateş, yeni öksürük veya siyah dışkı tariflemez. Ailesi, son aylarda yürürken sık sık durup dinlenmek zorunda kaldığını fark ettiği için muayeneyi ertelememesini istemiştir."
      },
      "vitals": {
        "TA": "118/70 mmHg",
        "Nabız": "78/dk, düzenli",
        "Solunum": "18/dk",
        "SpO2": "%97, oda havasında",
        "Ateş": "36.6 °C",
        "Şok indeksi": "0.66; ekstremiteler ılık, kapiller dolum 2 saniyenin altında"
      },
      "exam": [
        "Sağ ikinci interkostal aralıkta en belirgin, karotislere yayılan 3/6 sistolik ejeksiyon üfürümü duyuluyor.",
        "Karotis nabız yükselişi zayıf ve gecikmiş hissediliyor.",
        "Akciğer oskültasyonunda ral yok; periferik ödem izlenmiyor.",
        "Nörolojik muayenede fokal defisit saptanmıyor."
      ],
      "investigations": [
        {
          "id": "v287-new-624-merdiven-cikarken-bayilma-ekokardiyografi",
          "label": "Transtorasik ekokardiyografi",
          "title": "Transtorasik ekokardiyografi",
          "type": "cardiology",
          "priority": "essential",
          "subtype": "Transtorasik ekokardiyografi",
          "category": "cardiology",
          "testTypeCategory": "cardiology",
          "summary": "Sol ventrikül sistolik fonksiyonu korunurken kapak düzeyinde ileri basınç yükü vardır.",
          "clinicalMeaning": "Sol ventrikül sistolik fonksiyonu korunurken kapak düzeyinde ileri basınç yükü vardır.",
          "result": {
            "title": "Transtorasik ekokardiyografi",
            "summary": "Sol ventrikül sistolik fonksiyonu korunurken kapak düzeyinde ileri basınç yükü vardır.",
            "interpretation": "Sol ventrikül sistolik fonksiyonu korunurken kapak düzeyinde ileri basınç yükü vardır.",
            "values": [
              [
                "Aort kapak alanı",
                "0.7 cm²",
                ">1.5 cm²",
                "Belirgin dar"
              ],
              [
                "Ortalama transvalvüler gradiyent",
                "48 mmHg",
                "<20 mmHg",
                "Yüksek"
              ],
              [
                "Maksimum akım hızı",
                "4.3 m/sn",
                "<3.0 m/sn",
                "Yüksek"
              ],
              [
                "Sol ventrikül EF",
                "%55",
                ">%50",
                "Korunmuş"
              ]
            ],
            "rows": [
              [
                "Aort kapak alanı",
                "0.7 cm²",
                ">1.5 cm²",
                "Belirgin dar"
              ],
              [
                "Ortalama transvalvüler gradiyent",
                "48 mmHg",
                "<20 mmHg",
                "Yüksek"
              ],
              [
                "Maksimum akım hızı",
                "4.3 m/sn",
                "<3.0 m/sn",
                "Yüksek"
              ],
              [
                "Sol ventrikül EF",
                "%55",
                ">%50",
                "Korunmuş"
              ]
            ]
          }
        },
        {
          "id": "v287-new-624-merdiven-cikarken-bayilma-ekg-ve-biyobelirtecler",
          "label": "EKG ve kardiyak biyobelirteçler",
          "title": "EKG ve kardiyak biyobelirteçler",
          "type": "cardiology",
          "priority": "important",
          "subtype": "EKG ve kardiyak biyobelirteçler",
          "category": "cardiology",
          "testTypeCategory": "cardiology",
          "summary": "Akut transmural iskemi veya taşiaritmi gösteren bulgu yoktur; kronik basınç yükü işaretleri vardır.",
          "clinicalMeaning": "Akut transmural iskemi veya taşiaritmi gösteren bulgu yoktur; kronik basınç yükü işaretleri vardır.",
          "result": {
            "title": "EKG ve kardiyak biyobelirteçler",
            "summary": "Akut transmural iskemi veya taşiaritmi gösteren bulgu yoktur; kronik basınç yükü işaretleri vardır.",
            "interpretation": "Akut transmural iskemi veya taşiaritmi gösteren bulgu yoktur; kronik basınç yükü işaretleri vardır.",
            "values": [
              [
                "Ritim",
                "Sinüs ritmi, 78/dk",
                "60-100/dk",
                "Normal"
              ],
              [
                "ST elevasyonu",
                "Yok",
                "Yok",
                "Akut STEMI paterni yok"
              ],
              [
                "Sol ventrikül hipertrofisi voltajı",
                "Mevcut",
                "Yok",
                "Basınç yükü ile uyumlu"
              ],
              [
                "hs-troponin I",
                "11 ng/L",
                "<14 ng/L",
                "Normal"
              ]
            ],
            "rows": [
              [
                "Ritim",
                "Sinüs ritmi, 78/dk",
                "60-100/dk",
                "Normal"
              ],
              [
                "ST elevasyonu",
                "Yok",
                "Yok",
                "Akut STEMI paterni yok"
              ],
              [
                "Sol ventrikül hipertrofisi voltajı",
                "Mevcut",
                "Yok",
                "Basınç yükü ile uyumlu"
              ],
              [
                "hs-troponin I",
                "11 ng/L",
                "<14 ng/L",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v287-new-624-merdiven-cikarken-bayilma-temel-laboratuvar",
          "label": "Temel laboratuvar",
          "title": "Temel laboratuvar",
          "type": "laboratory",
          "priority": "important",
          "subtype": "Temel laboratuvar",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Anemi, enfeksiyon veya belirgin elektrolit bozukluğu senkop için ana açıklama oluşturmuyor.",
          "clinicalMeaning": "Anemi, enfeksiyon veya belirgin elektrolit bozukluğu senkop için ana açıklama oluşturmuyor.",
          "result": {
            "title": "Temel laboratuvar",
            "summary": "Anemi, enfeksiyon veya belirgin elektrolit bozukluğu senkop için ana açıklama oluşturmuyor.",
            "interpretation": "Anemi, enfeksiyon veya belirgin elektrolit bozukluğu senkop için ana açıklama oluşturmuyor.",
            "values": [
              [
                "Hemoglobin",
                "13.8 g/dL",
                "13.5-17.5 g/dL",
                "Normal"
              ],
              [
                "Sodyum",
                "139 mmol/L",
                "135-145 mmol/L",
                "Normal"
              ],
              [
                "Potasyum",
                "4.2 mmol/L",
                "3.5-5.1 mmol/L",
                "Normal"
              ],
              [
                "Kreatinin",
                "0.98 mg/dL",
                "0.7-1.2 mg/dL",
                "Normal"
              ]
            ],
            "rows": [
              [
                "Hemoglobin",
                "13.8 g/dL",
                "13.5-17.5 g/dL",
                "Normal"
              ],
              [
                "Sodyum",
                "139 mmol/L",
                "135-145 mmol/L",
                "Normal"
              ],
              [
                "Potasyum",
                "4.2 mmol/L",
                "3.5-5.1 mmol/L",
                "Normal"
              ],
              [
                "Kreatinin",
                "0.98 mg/dL",
                "0.7-1.2 mg/dL",
                "Normal"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada prognozu değiştiren en uygun yaklaşım aşağıdakilerden hangisidir?",
      "questionType": "management",
      "answerTarget": "Kapak hastalığı yönetimi",
      "diagnosis": {
        "correct": "Ciddi kapak darlığı için kapak replasmanı yönünden kalp takımı değerlendirmesi",
        "options": [
          "Beta bloker dozunu artırarak poliklinik izlemi planlama",
          "Sadece tuz kısıtlaması ve diüretik tedaviyle semptom kontrolü sağlama",
          "Asemptomatik kapak hastalığı gibi yıllık ekokardiyografi izlemi önerme",
          "Ciddi kapak darlığı için kapak replasmanı yönünden kalp takımı değerlendirmesi",
          "Antikoagülasyon başlayıp ritim kontrolü için elektif kardiyoversiyon planlama"
        ],
        "question": "Bu hastada prognozu değiştiren en uygun yaklaşım aşağıdakilerden hangisidir?",
        "explanation": "Eforla senkop ve angina benzeri yakınmalar, karotise yayılan sistolik üfürüm ve ekokardiyografide ileri darlık ölçümleri birlikte semptomatik ciddi kapak darlığını gösterir. Bu durumda mortaliteyi değiştiren yaklaşım medikal takip değil, cerrahi veya transkateter kapak replasmanı açısından kalp takımı değerlendirmesidir.",
        "pearls": [
          "Semptomatik ciddi kapak darlığında bekleme yaklaşımı bu vaka için doğru klinik hedef değildir.",
          "TAVR/SAVR seçimi yaş, cerrahi risk, anatomi ve eşlik eden hastalıklara göre yapılır.",
          "Diüretik ve vazodilatörler dikkatli kullanılmalı; temel tedavinin yerini almaz."
        ],
        "optionFeedback": {
          "Beta bloker dozunu artırarak poliklinik izlemi planlama": "Beta blokerler bazı taşiaritmi veya iskemik semptomlarda yararlı olabilir; ancak sabit çıkış yolu darlığı olan semptomatik ciddi kapak hastasında prognozu düzelten yaklaşım değildir. Bu vakada eforla senkop, karotise yayılan sistolik üfürüm, geç yükselen karotis nabzı ve ekokardiyografide ileri darlık verileri vardır. Kalp debisini artırma kapasitesi kısıtlı olduğu için yalnız nabız düşürmek veya antianginal ilaç artırmak semptomu maskeleyebilir ve hipotansiyon riskini artırabilir. Bu seçenek, hafif-orta kapak hastalığı veya eşlik eden kontrolsüz hipertansiyon bağlamında destekleyici olabilir; burada temel karar kapak girişimidir.",
          "Sadece tuz kısıtlaması ve diüretik tedaviyle semptom kontrolü sağlama": "Diüretik tedavi konjesyonu olan bazı kalp yetersizliği hastalarında semptomatik rahatlama sağlayabilir; fakat ciddi çıkış yolu darlığında fazla preload azaltılması senkop ve hipotansiyonu kötüleştirebilir. Bu hastada ana sorun sıvı yüklenmesinden çok eforla kardiyak output artışının kısıtlanmasıdır. Akciğerde belirgin ral ve yaygın ödem olmaması da tabloyu saf konjestif ataktan uzaklaştırır. Tuz kısıtlaması ve diüretik, kapak darlığının doğal seyrini değiştirmez.",
          "Asemptomatik kapak hastalığı gibi yıllık ekokardiyografi izlemi önerme": "Asemptomatik ciddi kapak hastalarında yakın takip ve belirli aralıklarla ekokardiyografi düşünülebilir; ancak bu hasta asemptomatik değildir. Eforla bayılma, göğüs baskısı ve belirgin darlık ölçümleri bekle-gör yaklaşımını uygun olmaktan çıkarır. Yıllık kontrol, semptom gelişmemiş ve ventrikül fonksiyonu korunmuş hastalarda tartışılabilir. Bu vakada semptomların başlaması mortalite riskinin arttığını ve girişim zamanının geldiğini gösterir.",
          "Ciddi kapak darlığı için kapak replasmanı yönünden kalp takımı değerlendirmesi": "Bu seçenek en uygundur. Eforla senkop ve göğüs baskısı olan hastada dar nabız basıncı, karotise yayılan sistolik ejeksiyon üfürümü, zayıf-geç karotis yükselmesi ve ekokardiyografide kapak alanı 0.7 cm², ortalama gradiyent 48 mmHg, Vmax 4.3 m/sn gibi ileri darlık verileri semptomatik ciddi aort kapak darlığı paternini oluşturur. Bu tabloda prognozu değiştiren tedavi medikal semptom baskılama değil, hastanın yaşına, cerrahi riskine, kapak anatomisine ve eşlik eden hastalıklarına göre SAVR/TAVR yönünden kalp takımı değerlendirmesidir. TUS mantığında eforla senkop + karotise yayılan sistolik üfürüm + ciddi ekokardiyografik darlık görüldüğünde bekleme değil kapak replasmanı düşünülür.",
          "Antikoagülasyon başlayıp ritim kontrolü için elektif kardiyoversiyon planlama": "Antikoagülasyon ve kardiyoversiyon atriyal fibrilasyon gibi ritim bozukluklarında gündeme gelir. Bu vakada nabız düzenli, EKG sinüs ritminde ve temel bulgular kapak çıkış yolu darlığını desteklemektedir. Aritmi efor dispnesi veya senkopa neden olabilir; fakat burada muayene ve ekokardiyografi ana mekanizmayı farklılaştırır. Gereksiz antikoagülasyon kanama riski oluşturur ve kapak darlığını tedavi etmez."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Semptomatik ciddi aort kapak darlığında efor senkopu, angina veya kalp yetersizliği ortaya çıktığında prognozu değiştiren tedavi kapak replasmanıdır.",
      "examPearl": "Eforla senkop + karotise yayılan sistolik üfürüm + kapak alanı <1 cm² gördüğünde medikal takip değil AVR/TAVR değerlendirmesi düşün.",
      "whyCorrect": "Bu hastada semptomların eforla ortaya çıkması ve ekokardiyografide ileri darlık ölçümleri, kapak replasmanı endikasyonunu destekler.",
      "optionComparison": "Medikal seçenekler semptomatik destek sağlayabilir ama ciddi sabit kapak obstrüksiyonunun doğal seyrini değiştirmez; ritim tedavisi ise EKG’de aritmi olmadığından hedef dışıdır.",
      "evidenceChain": [
        "Merdiven çıkarken senkop → eforla kardiyak output artışının kısıtlanması.",
        "Karotise yayılan sistolik üfürüm ve geç karotis yükselişi → çıkış yolu düzeyinde ciddi darlık.",
        "Kapak alanı 0.7 cm², gradiyent 48 mmHg → ileri hemodinamik darlık.",
        "EF korunmuş ve troponin normal → primer akut miyokard hasarı yerine kapak patolojisi baskın.",
        "Semptomatik ciddi darlık → kapak replasmanı yönünden değerlendirme gerekir."
      ],
      "whyWrong": {
        "Beta bloker dozunu artırarak poliklinik izlemi planlama": "Beta blokerler bazı taşiaritmi veya iskemik semptomlarda yararlı olabilir; ancak sabit çıkış yolu darlığı olan semptomatik ciddi kapak hastasında prognozu düzelten yaklaşım değildir. Bu vakada eforla senkop, karotise yayılan sistolik üfürüm, geç yükselen karotis nabzı ve ekokardiyografide ileri darlık verileri vardır. Kalp debisini artırma kapasitesi kısıtlı olduğu için yalnız nabız düşürmek veya antianginal ilaç artırmak semptomu maskeleyebilir ve hipotansiyon riskini artırabilir. Bu seçenek, hafif-orta kapak hastalığı veya eşlik eden kontrolsüz hipertansiyon bağlamında destekleyici olabilir; burada temel karar kapak girişimidir.",
        "Sadece tuz kısıtlaması ve diüretik tedaviyle semptom kontrolü sağlama": "Diüretik tedavi konjesyonu olan bazı kalp yetersizliği hastalarında semptomatik rahatlama sağlayabilir; fakat ciddi çıkış yolu darlığında fazla preload azaltılması senkop ve hipotansiyonu kötüleştirebilir. Bu hastada ana sorun sıvı yüklenmesinden çok eforla kardiyak output artışının kısıtlanmasıdır. Akciğerde belirgin ral ve yaygın ödem olmaması da tabloyu saf konjestif ataktan uzaklaştırır. Tuz kısıtlaması ve diüretik, kapak darlığının doğal seyrini değiştirmez.",
        "Asemptomatik kapak hastalığı gibi yıllık ekokardiyografi izlemi önerme": "Asemptomatik ciddi kapak hastalarında yakın takip ve belirli aralıklarla ekokardiyografi düşünülebilir; ancak bu hasta asemptomatik değildir. Eforla bayılma, göğüs baskısı ve belirgin darlık ölçümleri bekle-gör yaklaşımını uygun olmaktan çıkarır. Yıllık kontrol, semptom gelişmemiş ve ventrikül fonksiyonu korunmuş hastalarda tartışılabilir. Bu vakada semptomların başlaması mortalite riskinin arttığını ve girişim zamanının geldiğini gösterir.",
        "Antikoagülasyon başlayıp ritim kontrolü için elektif kardiyoversiyon planlama": "Antikoagülasyon ve kardiyoversiyon atriyal fibrilasyon gibi ritim bozukluklarında gündeme gelir. Bu vakada nabız düzenli, EKG sinüs ritminde ve temel bulgular kapak çıkış yolu darlığını desteklemektedir. Aritmi efor dispnesi veya senkopa neden olabilir; fakat burada muayene ve ekokardiyografi ana mekanizmayı farklılaştırır. Gereksiz antikoagülasyon kanama riski oluşturur ve kapak darlığını tedavi etmez."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v287",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V286 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v287-new-625-kilo-kaybi-ve-demir-eksikligi",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Kilo kaybı ve demir eksikliği",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Kronik ishal, şişkinlik, kilo kaybı ve demir-folat eksikliği olan genç erişkinde organik malabsorpsiyon nedenini laboratuvar ve serolojiyle ayırma.",
      "learningTarget": "Malabsorpsiyon paterninde çölyak hastalığını fonksiyonel bağırsak hastalığı, pankreatik yetmezlik, inflamatuvar barsak hastalığı ve paraziter kan kaybından ayırt etme.",
      "demographics": "29 yaşında kadın hasta",
      "setting": "Gastroenteroloji polikliniği",
      "chiefComplaint": "Hasta, aylardır süren şişkinlik, kilo kaybı ve halsizlik nedeniyle başvuruyor.",
      "stem": "Hasta yaklaşık sekiz aydır yemeklerden sonra karın şişkinliğinin arttığını ve dışkısının eskisine göre daha hacimli, kötü kokulu olduğunu anlatır. Son üç ayda iştahı çok azalmamasına rağmen dört kilo kaybetmiş, merdiven çıkarken çabuk yorulmaya başlamıştır. Dışkısında belirgin kan görmediğini, gece uykudan uyandıran şiddetli karın ağrısı olmadığını söyler. Kız kardeşinde otoimmün tiroid hastalığı vardır; hasta sık NSAİİ kullanmadığını ve son aylarda antibiyotik almadığını belirtir. Demir ilacı kullanmasına rağmen halsizliği geçmeyince aile hekimi tarafından gastroenterolojiye yönlendirilmiştir.",
      "patientIntro": {
        "profile": "29 yaşında kadın hasta, gastroenteroloji polikliniği başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, aylardır süren şişkinlik, kilo kaybı ve halsizlik nedeniyle başvuruyor.",
        "historySummary": "Hasta yaklaşık sekiz aydır yemeklerden sonra karın şişkinliğinin arttığını ve dışkısının eskisine göre daha hacimli, kötü kokulu olduğunu anlatır. Son üç ayda iştahı çok azalmamasına rağmen dört kilo kaybetmiş, merdiven çıkarken çabuk yorulmaya başlamıştır. Dışkısında belirgin kan görmediğini, gece uykudan uyandıran şiddetli karın ağrısı olmadığını söyler. Kız kardeşinde otoimmün tiroid hastalığı vardır; hasta sık NSAİİ kullanmadığını ve son aylarda antibiyotik almadığını belirtir. Demir ilacı kullanmasına rağmen halsizliği geçmeyince aile hekimi tarafından gastroenterolojiye yönlendirilmiştir."
      },
      "vitals": {
        "TA": "108/68 mmHg",
        "Nabız": "88/dk",
        "Solunum": "16/dk",
        "SpO2": "%98, oda havasında",
        "Ateş": "36.5 °C",
        "Şok indeksi": "0.81; ekstremiteler ılık, kapiller dolum yaklaşık 2 saniye"
      },
      "exam": [
        "Konjonktivalarda solukluk izleniyor.",
        "Batın yumuşak; yaygın hafif distansiyon var, defans veya rebound yok.",
        "Oral aft, perianal fistül ağzı veya belirgin cilt döküntüsü saptanmıyor.",
        "Tiroid palpasyonunda belirgin nodül veya hassasiyet yok."
      ],
      "investigations": [
        {
          "id": "v287-new-625-kilo-kaybi-ve-demir-eksikligi-tam-kan-ve-demir",
          "label": "Tam kan sayımı ve demir çalışmaları",
          "title": "Tam kan sayımı ve demir çalışmaları",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Tam kan sayımı ve demir çalışmaları",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Mikrositik demir eksikliği anemisi ve eşlik eden düşük depo demiri vardır.",
          "clinicalMeaning": "Mikrositik demir eksikliği anemisi ve eşlik eden düşük depo demiri vardır.",
          "result": {
            "title": "Tam kan sayımı ve demir çalışmaları",
            "summary": "Mikrositik demir eksikliği anemisi ve eşlik eden düşük depo demiri vardır.",
            "interpretation": "Mikrositik demir eksikliği anemisi ve eşlik eden düşük depo demiri vardır.",
            "values": [
              [
                "Hemoglobin",
                "9.8 g/dL",
                "12.0-16.0 g/dL",
                "Düşük"
              ],
              [
                "MCV",
                "72 fL",
                "80-96 fL",
                "Düşük"
              ],
              [
                "Ferritin",
                "8 ng/mL",
                "15-150 ng/mL",
                "Düşük"
              ],
              [
                "Transferrin satürasyonu",
                "%6",
                "%20-45",
                "Düşük"
              ]
            ],
            "rows": [
              [
                "Hemoglobin",
                "9.8 g/dL",
                "12.0-16.0 g/dL",
                "Düşük"
              ],
              [
                "MCV",
                "72 fL",
                "80-96 fL",
                "Düşük"
              ],
              [
                "Ferritin",
                "8 ng/mL",
                "15-150 ng/mL",
                "Düşük"
              ],
              [
                "Transferrin satürasyonu",
                "%6",
                "%20-45",
                "Düşük"
              ]
            ]
          }
        },
        {
          "id": "v287-new-625-kilo-kaybi-ve-demir-eksikligi-malabsorpsiyon-paneli",
          "label": "Malabsorpsiyon ve vitamin paneli",
          "title": "Malabsorpsiyon ve vitamin paneli",
          "type": "laboratory",
          "priority": "important",
          "subtype": "Malabsorpsiyon ve vitamin paneli",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Proksimal ince bağırsak emilim kusurunu destekleyen demir-folat etkilenimi vardır.",
          "clinicalMeaning": "Proksimal ince bağırsak emilim kusurunu destekleyen demir-folat etkilenimi vardır.",
          "result": {
            "title": "Malabsorpsiyon ve vitamin paneli",
            "summary": "Proksimal ince bağırsak emilim kusurunu destekleyen demir-folat etkilenimi vardır.",
            "interpretation": "Proksimal ince bağırsak emilim kusurunu destekleyen demir-folat etkilenimi vardır.",
            "values": [
              [
                "Folat",
                "2.1 ng/mL",
                ">4 ng/mL",
                "Düşük"
              ],
              [
                "Vitamin B12",
                "356 pg/mL",
                "200-900 pg/mL",
                "Normal"
              ],
              [
                "Albumin",
                "3.4 g/dL",
                "3.5-5.0 g/dL",
                "Sınırda düşük"
              ],
              [
                "CRP",
                "4 mg/L",
                "<5 mg/L",
                "Normal"
              ]
            ],
            "rows": [
              [
                "Folat",
                "2.1 ng/mL",
                ">4 ng/mL",
                "Düşük"
              ],
              [
                "Vitamin B12",
                "356 pg/mL",
                "200-900 pg/mL",
                "Normal"
              ],
              [
                "Albumin",
                "3.4 g/dL",
                "3.5-5.0 g/dL",
                "Sınırda düşük"
              ],
              [
                "CRP",
                "4 mg/L",
                "<5 mg/L",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v287-new-625-kilo-kaybi-ve-demir-eksikligi-seroloji",
          "label": "Otoimmün seroloji",
          "title": "Otoimmün seroloji",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Otoimmün seroloji",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Total IgA normal iken yüksek özgül IgA antikoru mukozal immün yanıtı destekler.",
          "clinicalMeaning": "Total IgA normal iken yüksek özgül IgA antikoru mukozal immün yanıtı destekler.",
          "result": {
            "title": "Otoimmün seroloji",
            "summary": "Total IgA normal iken yüksek özgül IgA antikoru mukozal immün yanıtı destekler.",
            "interpretation": "Total IgA normal iken yüksek özgül IgA antikoru mukozal immün yanıtı destekler.",
            "values": [
              [
                "Total IgA",
                "186 mg/dL",
                "70-400 mg/dL",
                "Normal"
              ],
              [
                "Doku transglutaminaz IgA",
                "96 U/mL",
                "<10 U/mL",
                "Yüksek"
              ],
              [
                "Anti-endomisyum IgA",
                "Pozitif",
                "Negatif",
                "Pozitif"
              ],
              [
                "Dışkıda gizli kan",
                "Negatif",
                "Negatif",
                "Negatif"
              ]
            ],
            "rows": [
              [
                "Total IgA",
                "186 mg/dL",
                "70-400 mg/dL",
                "Normal"
              ],
              [
                "Doku transglutaminaz IgA",
                "96 U/mL",
                "<10 U/mL",
                "Yüksek"
              ],
              [
                "Anti-endomisyum IgA",
                "Pozitif",
                "Negatif",
                "Pozitif"
              ],
              [
                "Dışkıda gizli kan",
                "Negatif",
                "Negatif",
                "Negatif"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastadaki anemi ve gastrointestinal yakınmaları en iyi açıklayan tanı aşağıdakilerden hangisidir?",
      "questionType": "diagnosis",
      "answerTarget": "Malabsorpsiyon tanısı",
      "diagnosis": {
        "correct": "Çölyak hastalığı",
        "options": [
          "İrritabl bağırsak sendromu",
          "Çölyak hastalığı",
          "Kronik pankreatik ekzokrin yetmezlik",
          "Crohn hastalığına bağlı terminal ileit",
          "Kancalı kurt enfestasyonu"
        ],
        "question": "Bu hastadaki anemi ve gastrointestinal yakınmaları en iyi açıklayan tanı aşağıdakilerden hangisidir?",
        "explanation": "Demir ve folat eksikliğiyle giden kronik malabsorpsiyon, total IgA normal iken belirgin yüksek tTG IgA/anti-endomisyum pozitifliği ile birlikte çölyak hastalığını destekler. Fonksiyonel hastalık, pankreatik yetmezlik, Crohn hastalığı ve paraziter kan kaybı belirli bulgularla karışabilir; ancak bu vakada seroloji ve eksiklik paterni en güçlü ayırıcı noktadır.",
        "pearls": [
          "Demir eksikliği genç kadında yalnız menstruasyonla açıklanmadan gastrointestinal kayıp/malabsorpsiyon açısından sorgulanmalıdır.",
          "Çölyakta seroloji gluten tüketimi devam ederken yapılmalıdır.",
          "Erişkinde pozitif seroloji genellikle duodenal biyopsi ile doğrulanır."
        ],
        "optionFeedback": {
          "İrritabl bağırsak sendromu": "İrritabl bağırsak sendromu karın ağrısı ve dışkılama alışkanlığı değişikliği yapabilir; ancak objektif malabsorpsiyon, kilo kaybı, demir eksikliği anemisi, folat düşüklüğü veya pozitif otoantikor paterni beklenmez. Bu hastada gece uyandıran ishal olmasa bile demir eksikliği, düşük ferritin ve serolojik bulgu organik hastalığı destekler. IBS tanısı alarm bulguları ve laboratuvar bozuklukları dışlandıktan sonra düşünülür. Bu nedenle yalnız fonksiyonel bağırsak hastalığı açıklaması yetersizdir.",
          "Çölyak hastalığı": "Bu seçenek en uygundur. Kronik şişkinlik, yağlı-kötü kokulu dışkılama, kilo kaybı, demir eksikliği, folat düşüklüğü ve total IgA normal iken belirgin yüksek doku transglutaminaz IgA düzeyi gluten ilişkili ince bağırsak mukozal hasarını destekler. Proksimal ince bağırsak tutulumu demir ve folat emilimini bozduğu için anemi bazen ishalden daha belirgin olabilir. Tanı yaklaşımında hasta gluten tüketirken seroloji değerlendirilir ve erişkinde çoğu durumda duodenal biyopsi ile mukozal hasar gösterilir; glutensiz diyete biyopsi/serolojik değerlendirme tamamlanmadan başlanması tanıyı zorlaştırabilir.",
          "Kronik pankreatik ekzokrin yetmezlik": "Kronik pankreatik ekzokrin yetmezlik steatore, kilo kaybı ve yağda eriyen vitamin eksiklikleri yapabilir; genellikle kronik pankreatit, alkol kullanımı, pankreas cerrahisi veya kistik fibrozis gibi bağlamlarla birliktedir. Bu hastada epigastrik kuşak tarzı ağrı, pankreatik kalsifikasyon veya fekal elastaz düşüklüğü verilmemiştir. Ayrıca demir-folat eksikliği ve yüksek tTG IgA pankreatik enzim eksikliğinden çok ince bağırsak mukozal hastalığını destekler. Pankreatik yetmezlikte dışkı yağlanması olabilir, fakat otoimmün seroloji pozitifliği beklenmez.",
          "Crohn hastalığına bağlı terminal ileit": "Crohn hastalığı terminal ileit yaptığında kronik karın ağrısı, ishal, kilo kaybı, perianal hastalık, ateş, CRP yüksekliği ve B12 eksikliği gibi bulgularla gelebilir. Bu vakada ağrı daha çok yemek sonrası şişkinlik şeklinde, CRP normal-sınıra yakın, B12 normal ve aile/serolojik patern gluten duyarlılığı yönündedir. Terminal ileum tutulumu demir eksikliği yapabilse de tTG IgA yüksekliği ve folat-demir paterninin ön planda olması çölyakla daha iyi uyumludur. Crohn doğru olsaydı inflamatuvar belirteçler, endoskopik ülserasyon veya transmural komplikasyon ipuçları beklenirdi.",
          "Kancalı kurt enfestasyonu": "Kancalı kurt enfestasyonu demir eksikliği anemisi yapabilir ve özellikle endemik bölge, çıplak ayak teması, eozinofili veya dışkıda parazit yumurtası ile desteklenir. Bu hastada belirgin eozinofili veya paraziter maruziyet öyküsü yoktur. İshal ve kilo kaybı eşlik edebilse de folat düşüklüğü ve yüksek tTG IgA paraziter kan kaybından çok ince bağırsak mukozal otoimmün hasarını işaret eder. Bu nedenle kancalı kurt olasılığı klinik bütünlüğü açıklamaz."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Çölyak hastalığı proksimal ince bağırsak mukozasını tutarak demir ve folat emilimini bozar; kronik ishal olmadan da demir eksikliğiyle gelebilir.",
      "examPearl": "Demir eksikliği + şişkinlik/steatore + tTG IgA yüksekliği gördüğünde çölyak hastalığını düşün; glutensiz diyete tanı tamamlanmadan başlamak serolojiyi ve biyopsiyi bozabilir.",
      "whyCorrect": "Bu hastada organik malabsorpsiyon bulguları ve çölyak serolojisi birlikte bulunduğu için fonksiyonel bağırsak hastalığı veya izole kan kaybı açıklaması yetersizdir.",
      "optionComparison": "IBS objektif eksiklik yapmaz; pankreatik yetmezlikte pankreas bağlamı beklenir; Crohn’da inflamatuvar/perianal bulgular daha belirgin olabilir; paraziter kan kaybı serolojik otoimmün paterni açıklamaz.",
      "evidenceChain": [
        "Kronik şişkinlik ve hacimli dışkı → emilim bozukluğu paternini destekleme.",
        "Ferritin 8 ng/mL ve düşük transferrin satürasyonu → gerçek demir eksikliği.",
        "Folat düşük, B12 normal → proksimal ince bağırsak tutulumu ile uyumlu patern.",
        "Total IgA normal ve tTG IgA yüksek → IgA eksikliğiyle yalancı negatiflik yok, özgül seroloji güçlü.",
        "Dışkıda gizli kan negatif ve CRP normal → aktif kanamalı/şiddetli inflamatuvar alternatifler zayıf."
      ],
      "whyWrong": {
        "İrritabl bağırsak sendromu": "İrritabl bağırsak sendromu karın ağrısı ve dışkılama alışkanlığı değişikliği yapabilir; ancak objektif malabsorpsiyon, kilo kaybı, demir eksikliği anemisi, folat düşüklüğü veya pozitif otoantikor paterni beklenmez. Bu hastada gece uyandıran ishal olmasa bile demir eksikliği, düşük ferritin ve serolojik bulgu organik hastalığı destekler. IBS tanısı alarm bulguları ve laboratuvar bozuklukları dışlandıktan sonra düşünülür. Bu nedenle yalnız fonksiyonel bağırsak hastalığı açıklaması yetersizdir.",
        "Kronik pankreatik ekzokrin yetmezlik": "Kronik pankreatik ekzokrin yetmezlik steatore, kilo kaybı ve yağda eriyen vitamin eksiklikleri yapabilir; genellikle kronik pankreatit, alkol kullanımı, pankreas cerrahisi veya kistik fibrozis gibi bağlamlarla birliktedir. Bu hastada epigastrik kuşak tarzı ağrı, pankreatik kalsifikasyon veya fekal elastaz düşüklüğü verilmemiştir. Ayrıca demir-folat eksikliği ve yüksek tTG IgA pankreatik enzim eksikliğinden çok ince bağırsak mukozal hastalığını destekler. Pankreatik yetmezlikte dışkı yağlanması olabilir, fakat otoimmün seroloji pozitifliği beklenmez.",
        "Crohn hastalığına bağlı terminal ileit": "Crohn hastalığı terminal ileit yaptığında kronik karın ağrısı, ishal, kilo kaybı, perianal hastalık, ateş, CRP yüksekliği ve B12 eksikliği gibi bulgularla gelebilir. Bu vakada ağrı daha çok yemek sonrası şişkinlik şeklinde, CRP normal-sınıra yakın, B12 normal ve aile/serolojik patern gluten duyarlılığı yönündedir. Terminal ileum tutulumu demir eksikliği yapabilse de tTG IgA yüksekliği ve folat-demir paterninin ön planda olması çölyakla daha iyi uyumludur. Crohn doğru olsaydı inflamatuvar belirteçler, endoskopik ülserasyon veya transmural komplikasyon ipuçları beklenirdi.",
        "Kancalı kurt enfestasyonu": "Kancalı kurt enfestasyonu demir eksikliği anemisi yapabilir ve özellikle endemik bölge, çıplak ayak teması, eozinofili veya dışkıda parazit yumurtası ile desteklenir. Bu hastada belirgin eozinofili veya paraziter maruziyet öyküsü yoktur. İshal ve kilo kaybı eşlik edebilse de folat düşüklüğü ve yüksek tTG IgA paraziter kan kaybından çok ince bağırsak mukozal otoimmün hasarını işaret eder. Bu nedenle kancalı kurt olasılığı klinik bütünlüğü açıklamaz."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v287",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V286 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v287-new-626-nefes-alirken-konusamama",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Nefes alırken konuşamama",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Ağır astım atağında sessiz akciğer, düşük PEF ve yükselen PaCO2 bulgularını yaklaşan solunum yetmezliği olarak yorumlayıp ileri destek kararını seçme.",
      "learningTarget": "Akut ağır astımda hipoksemi ve hiperkapni paterninin hafif bronkospazmdan farklı olarak ventilatuvar yetersizlik anlamına geldiğini kavrama.",
      "demographics": "34 yaşında kadın hasta",
      "setting": "Acil servis",
      "chiefComplaint": "Hasta, giderek artan nefes darlığı ve inhalerine rağmen rahatlayamama nedeniyle acile getiriliyor.",
      "stem": "Hasta sabaha karşı göğsünde sıkışma ve hırıltı ile uyandığını, kurtarıcı inhalerini birkaç kez kullandığını ancak rahatlamadığını anlatır. Acile gelirken cümle kurmakta zorlanmış, annesi konuşurken sık sık durup nefes aldığını fark etmiştir. Daha önce astım nedeniyle acile başvuruları olmuş, ancak son bir yıldır koruyucu inhalerini düzensiz kullandığını söyler. Sarı-yeşil balgam, ateş veya göğüste batıcı tek taraflı ağrı tariflemez. Evde kediyle temas sonrası şikâyetlerinin arttığını ve son iki gündür gece öksürüklerinin sıklaştığını belirtir.",
      "patientIntro": {
        "profile": "34 yaşında kadın hasta, acil servis başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, giderek artan nefes darlığı ve inhalerine rağmen rahatlayamama nedeniyle acile getiriliyor.",
        "historySummary": "Hasta sabaha karşı göğsünde sıkışma ve hırıltı ile uyandığını, kurtarıcı inhalerini birkaç kez kullandığını ancak rahatlamadığını anlatır. Acile gelirken cümle kurmakta zorlanmış, annesi konuşurken sık sık durup nefes aldığını fark etmiştir. Daha önce astım nedeniyle acile başvuruları olmuş, ancak son bir yıldır koruyucu inhalerini düzensiz kullandığını söyler. Sarı-yeşil balgam, ateş veya göğüste batıcı tek taraflı ağrı tariflemez. Evde kediyle temas sonrası şikâyetlerinin arttığını ve son iki gündür gece öksürüklerinin sıklaştığını belirtir."
      },
      "vitals": {
        "TA": "132/78 mmHg",
        "Nabız": "124/dk",
        "Solunum": "34/dk",
        "SpO2": "%88, oda havasında; %94, oksijenle",
        "Ateş": "36.9 °C",
        "Şok indeksi": "0.94; terli, konuşmakta zorlanıyor, kapiller dolum yaklaşık 2 saniye"
      },
      "exam": [
        "Hasta tek kelimelerle yanıt veriyor ve belirgin yardımcı solunum kası kullanıyor.",
        "Oskültasyonda yaygın ekspiryum uzaması var; bazı bazal alanlarda hava girişi belirgin azalmış.",
        "Siyanoz yok ancak hasta ajite ve yorulmuş görünümde.",
        "Kalp sesleri taşikardik, ek üfürüm duyulmuyor."
      ],
      "investigations": [
        {
          "id": "v287-new-626-nefes-alirken-konusamama-solunum-fonksiyon-olcumu",
          "label": "Tepe ekspiratuvar akım ölçümü",
          "title": "Tepe ekspiratuvar akım ölçümü",
          "type": "pulmonology",
          "priority": "essential",
          "subtype": "Tepe ekspiratuvar akım ölçümü",
          "category": "pulmonology",
          "testTypeCategory": "pulmonology",
          "summary": "Akım değeri beklenenin üçte birinin altındadır ve ağır obstrüksiyonla uyumludur.",
          "clinicalMeaning": "Akım değeri beklenenin üçte birinin altındadır ve ağır obstrüksiyonla uyumludur.",
          "result": {
            "title": "Tepe ekspiratuvar akım ölçümü",
            "summary": "Akım değeri beklenenin üçte birinin altındadır ve ağır obstrüksiyonla uyumludur.",
            "interpretation": "Akım değeri beklenenin üçte birinin altındadır ve ağır obstrüksiyonla uyumludur.",
            "values": [
              [
                "PEF",
                "110 L/dk",
                "Beklenen yaklaşık 420 L/dk",
                "%26"
              ],
              [
                "Bronkodilatör sonrası PEF",
                "125 L/dk",
                "Kişisel en iyiye yakın olmalı",
                "Yetersiz yanıt"
              ],
              [
                "Konuşma durumu",
                "Tek kelimeler",
                "Tam cümle",
                "Ağır kısıtlı"
              ],
              [
                "Yardımcı kas kullanımı",
                "Belirgin",
                "Yok",
                "Artmış solunum işi"
              ]
            ],
            "rows": [
              [
                "PEF",
                "110 L/dk",
                "Beklenen yaklaşık 420 L/dk",
                "%26"
              ],
              [
                "Bronkodilatör sonrası PEF",
                "125 L/dk",
                "Kişisel en iyiye yakın olmalı",
                "Yetersiz yanıt"
              ],
              [
                "Konuşma durumu",
                "Tek kelimeler",
                "Tam cümle",
                "Ağır kısıtlı"
              ],
              [
                "Yardımcı kas kullanımı",
                "Belirgin",
                "Yok",
                "Artmış solunum işi"
              ]
            ]
          }
        },
        {
          "id": "v287-new-626-nefes-alirken-konusamama-kan-gazi",
          "label": "Arter kan gazı",
          "title": "Arter kan gazı",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Arter kan gazı",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Hipoksemiye eşlik eden PaCO2 yüksekliği ventilatuvar yorgunluk açısından uyarıcıdır.",
          "clinicalMeaning": "Hipoksemiye eşlik eden PaCO2 yüksekliği ventilatuvar yorgunluk açısından uyarıcıdır.",
          "result": {
            "title": "Arter kan gazı",
            "summary": "Hipoksemiye eşlik eden PaCO2 yüksekliği ventilatuvar yorgunluk açısından uyarıcıdır.",
            "interpretation": "Hipoksemiye eşlik eden PaCO2 yüksekliği ventilatuvar yorgunluk açısından uyarıcıdır.",
            "values": [
              [
                "pH",
                "7.31",
                "7.35-7.45",
                "Düşük"
              ],
              [
                "PaCO2",
                "48 mmHg",
                "35-45 mmHg",
                "Yüksek"
              ],
              [
                "PaO2",
                "62 mmHg",
                "80-100 mmHg",
                "Düşük"
              ],
              [
                "HCO3",
                "23 mmol/L",
                "22-26 mmol/L",
                "Normal"
              ]
            ],
            "rows": [
              [
                "pH",
                "7.31",
                "7.35-7.45",
                "Düşük"
              ],
              [
                "PaCO2",
                "48 mmHg",
                "35-45 mmHg",
                "Yüksek"
              ],
              [
                "PaO2",
                "62 mmHg",
                "80-100 mmHg",
                "Düşük"
              ],
              [
                "HCO3",
                "23 mmol/L",
                "22-26 mmol/L",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v287-new-626-nefes-alirken-konusamama-akciger-grafisi",
          "label": "Akciğer grafisi",
          "title": "Akciğer grafisi",
          "type": "radiology",
          "priority": "important",
          "subtype": "Akciğer grafisi",
          "category": "radiology",
          "testTypeCategory": "radiology",
          "summary": "Belirgin pnömoni veya pnömotoraks bulgusu yoktur; hiperinflasyon izlenir.",
          "clinicalMeaning": "Belirgin pnömoni veya pnömotoraks bulgusu yoktur; hiperinflasyon izlenir.",
          "result": {
            "title": "Akciğer grafisi",
            "summary": "Belirgin pnömoni veya pnömotoraks bulgusu yoktur; hiperinflasyon izlenir.",
            "interpretation": "Belirgin pnömoni veya pnömotoraks bulgusu yoktur; hiperinflasyon izlenir.",
            "values": [
              [
                "Akciğer havalanması",
                "Artmış",
                "Normal",
                "Hiperinflasyon"
              ],
              [
                "Lobar konsolidasyon",
                "Yok",
                "Yok",
                "Pnömoni lehine değil"
              ],
              [
                "Pnömotoraks",
                "Yok",
                "Yok",
                "Saptanmadı"
              ],
              [
                "Kalp boyutu",
                "Normal",
                "Normal",
                "Kardiyomegali yok"
              ]
            ],
            "rows": [
              [
                "Akciğer havalanması",
                "Artmış",
                "Normal",
                "Hiperinflasyon"
              ],
              [
                "Lobar konsolidasyon",
                "Yok",
                "Yok",
                "Pnömoni lehine değil"
              ],
              [
                "Pnömotoraks",
                "Yok",
                "Yok",
                "Saptanmadı"
              ],
              [
                "Kalp boyutu",
                "Normal",
                "Normal",
                "Kardiyomegali yok"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada acil yönetimde öncelikli yaklaşım aşağıdakilerden hangisidir?",
      "questionType": "management",
      "answerTarget": "Ağır astım atağı yönetimi",
      "diagnosis": {
        "correct": "Yoğun bakım/anestezi desteğiyle ventilasyon hazırlığı ve agresif bronkodilatör tedavi",
        "options": [
          "Evde kısa etkili beta agonist inhalerle izlem önerme",
          "Antibiyotik başlayıp oksijen vermeden taburculuk planlama",
          "Sadece uzun etkili bronkodilatör ve inhaler steroid reçete etme",
          "Sedatif verip anksiyete atağı olarak gözlemleme",
          "Yoğun bakım/anestezi desteğiyle ventilasyon hazırlığı ve agresif bronkodilatör tedavi"
        ],
        "question": "Bu hastada acil yönetimde öncelikli yaklaşım aşağıdakilerden hangisidir?",
        "explanation": "Konuşamama, sessiz akciğer alanları, PEF düşüklüğü ve PaCO2 yüksekliği ağır astım atağında kötüleşme ve ventilatuvar yetersizlik riskini gösterir. İlk bronkodilatörlere rağmen düzelmeyen hastada oksijen, tekrarlayan bronkodilatörler, sistemik steroid, ek tedaviler ve yoğun bakım/anestezi desteğiyle hava yolu hazırlığı önceliklidir.",
        "pearls": [
          "Akut ağır astımda PaCO2’nin yükselmesi iyiye gidiş değil, yorgunluk işaretidir.",
          "Sessiz akciğer yaygın wheezingden daha tehlikeli olabilir.",
          "Kronik kontrol inhalerleri akut ventilasyon güvenliğinin yerini almaz."
        ],
        "optionFeedback": {
          "Evde kısa etkili beta agonist inhalerle izlem önerme": "Evde kısa etkili beta agonist kullanımı hafif ataklarda geçici rahatlama sağlayabilir; ancak konuşamama, yardımcı solunum kası kullanımı, sessiz akciğer alanları, düşük PEF ve yükselen PaCO2 olan hastada ev izlemi güvenli değildir. Bu bulgular solunum kas yorgunluğu ve yaklaşan ventilatuvar yetmezlik açısından uyarıcıdır. Hasta evde inhalerini defalarca kullanmış ancak rahatlamamıştır. Bu nedenle taburculuk değil monitörize acil tedavi ve ileri hava yolu hazırlığı gerekir.",
          "Antibiyotik başlayıp oksijen vermeden taburculuk planlama": "Antibiyotik astım atağının rutin ilk tedavisi değildir; yalnız bakteriyel pnömoni veya belirgin enfeksiyon kanıtı varsa düşünülür. Bu vakada temel sorun bronkospazm ve ventilatuvar yetmezliğe gidiştir; oksijen verilmeden taburculuk ağır hipoksemi riskini artırır. Ateşin olmaması ve akciğer grafisinde lobar konsolidasyon verilmemesi bakteriyel odağı desteklemez. Antibiyotik bronş düz kas obstrüksiyonunu ve hava hapsini düzeltmez.",
          "Sadece uzun etkili bronkodilatör ve inhaler steroid reçete etme": "Uzun etkili bronkodilatör ve inhaler steroidler kronik kontrol tedavisinde önemlidir; fakat akut ağır atakta tek başına yeterli ve hızlı değildir. Bu hasta cümle kuramayacak kadar dispneik, PEF çok düşük ve PaCO2 yükselmiştir. Akut tabloda oksijen, tekrarlayan/continü kısa etkili bronkodilatör, ipratropium, sistemik steroid, gerekirse IV magnezyum ve yoğun bakım hazırlığı gerekir. Kontrol tedavisi taburculuk planının parçası olabilir; acil öncelik değildir.",
          "Sedatif verip anksiyete atağı olarak gözlemleme": "Anksiyete dispneyi artırabilir; ancak sessiz akciğer, düşük PEF, hipoksemi ve yükselen PaCO2 objektif solunum yetmezliği bulgularıdır. Sedatif ilaçlar solunum sürücüsünü baskılayarak hipoventilasyonu kötüleştirebilir. Bu hastada panik atağına bağlamak tehlikeli bir gecikmeye neden olur. Klinik karar hastanın kaygı düzeyine değil, ventilasyon ve hava yolu obstrüksiyonu göstergelerine dayanmalıdır.",
          "Yoğun bakım/anestezi desteğiyle ventilasyon hazırlığı ve agresif bronkodilatör tedavi": "Bu seçenek en uygundur. Ağır astım atağında sessiz akciğer alanları, konuşamama, PEF’in beklenenin yaklaşık üçte birinin altında olması, hipoksemi ve özellikle PaCO2’nin normalleşmesi/yükselmesi solunum kas yorgunluğu ve yaklaşan ventilatuvar yetmezlik göstergesidir. Hasta ilk bronkodilatörlere rağmen düzelmiyorsa agresif bronkodilatör tedavi sürdürülürken yoğun bakım/anestezi desteği, yakın monitörizasyon ve gerektiğinde entübasyon hazırlığı yapılmalıdır. Sistemik steroidin etkisi saatler içinde başlar; bu arada ventilasyon güvenliği ertelenemez."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Akut astım atağında hipoksemiye rağmen PaCO2’nin normal veya yüksek olması solunum kas yorgunluğu ve yaklaşan solunum yetmezliği açısından kritik uyarıdır.",
      "examPearl": "Ağır astımda ‘wheezing azaldı’ diye rahatlama sanma; sessiz akciğer ve yükselen PaCO2 en tehlikeli ipuçlarındandır.",
      "whyCorrect": "Bu hastada objektif solunum yetmezliği bulguları ev tedavisi veya yalnız inhaler reçetesiyle yönetilemeyecek kadar ağırdır.",
      "optionComparison": "Hafif atakta SABA, kronik kontrolde ICS/LABA yararlı olabilir; ancak bu vakada hiperkapni ve sessiz akciğer nedeniyle acil ileri destek gerekir.",
      "evidenceChain": [
        "Tek kelimelerle konuşma ve yardımcı kas kullanımı → ağır solunum işi.",
        "PEF %26 ve bronkodilatöre zayıf yanıt → ciddi hava yolu obstrüksiyonu.",
        "PaO2 62 mmHg → hipoksemi.",
        "PaCO2 48 mmHg → ventilatuvar yorgunluk/kötüleşme işareti.",
        "Grafide pnömotoraks/konsolidasyon yok → primer acil sorun ağır bronkospazm."
      ],
      "whyWrong": {
        "Evde kısa etkili beta agonist inhalerle izlem önerme": "Evde kısa etkili beta agonist kullanımı hafif ataklarda geçici rahatlama sağlayabilir; ancak konuşamama, yardımcı solunum kası kullanımı, sessiz akciğer alanları, düşük PEF ve yükselen PaCO2 olan hastada ev izlemi güvenli değildir. Bu bulgular solunum kas yorgunluğu ve yaklaşan ventilatuvar yetmezlik açısından uyarıcıdır. Hasta evde inhalerini defalarca kullanmış ancak rahatlamamıştır. Bu nedenle taburculuk değil monitörize acil tedavi ve ileri hava yolu hazırlığı gerekir.",
        "Antibiyotik başlayıp oksijen vermeden taburculuk planlama": "Antibiyotik astım atağının rutin ilk tedavisi değildir; yalnız bakteriyel pnömoni veya belirgin enfeksiyon kanıtı varsa düşünülür. Bu vakada temel sorun bronkospazm ve ventilatuvar yetmezliğe gidiştir; oksijen verilmeden taburculuk ağır hipoksemi riskini artırır. Ateşin olmaması ve akciğer grafisinde lobar konsolidasyon verilmemesi bakteriyel odağı desteklemez. Antibiyotik bronş düz kas obstrüksiyonunu ve hava hapsini düzeltmez.",
        "Sadece uzun etkili bronkodilatör ve inhaler steroid reçete etme": "Uzun etkili bronkodilatör ve inhaler steroidler kronik kontrol tedavisinde önemlidir; fakat akut ağır atakta tek başına yeterli ve hızlı değildir. Bu hasta cümle kuramayacak kadar dispneik, PEF çok düşük ve PaCO2 yükselmiştir. Akut tabloda oksijen, tekrarlayan/continü kısa etkili bronkodilatör, ipratropium, sistemik steroid, gerekirse IV magnezyum ve yoğun bakım hazırlığı gerekir. Kontrol tedavisi taburculuk planının parçası olabilir; acil öncelik değildir.",
        "Sedatif verip anksiyete atağı olarak gözlemleme": "Anksiyete dispneyi artırabilir; ancak sessiz akciğer, düşük PEF, hipoksemi ve yükselen PaCO2 objektif solunum yetmezliği bulgularıdır. Sedatif ilaçlar solunum sürücüsünü baskılayarak hipoventilasyonu kötüleştirebilir. Bu hastada panik atağına bağlamak tehlikeli bir gecikmeye neden olur. Klinik karar hastanın kaygı düzeyine değil, ventilasyon ve hava yolu obstrüksiyonu göstergelerine dayanmalıdır."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v287",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V286 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v287-new-627-bacaklarda-sislik-ve-kopuklu-idrar",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Bacaklarda şişlik ve köpüklü idrar",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "SLE öyküsü olan hastada aktif idrar sedimenti, proteinüri ve kompleman-dsDNA paternini birlikte değerlendirerek böbrek biyopsisi kararını verme.",
      "learningTarget": "Lupus nefritinde seroloji ve idrar bulgularının biyopsi endikasyonunu nasıl belirlediğini kavrama.",
      "demographics": "24 yaşında kadın hasta",
      "setting": "Nefroloji-romatoloji konsültasyonu",
      "chiefComplaint": "Hasta, bacaklarında şişlik ve idrarında köpürme fark ettiği için polikliniğe başvuruyor.",
      "stem": "Hasta son üç haftadır sabahları yüzünde şişlik olduğunu, akşama doğru ayak bileklerinin belirginleştiğini anlatır. İdrarının eskisine göre daha köpüklü olduğunu ve son günlerde tansiyon ölçümlerinin yüksek çıktığını söyler. Bir yıldır eklem ağrıları ve fotosensitif döküntü nedeniyle takiptedir; ilaçlarını bazı haftalar aksattığını belirtir. Ateş, yan ağrısı, idrar yaparken yanma veya yakın zamanda boğaz enfeksiyonu tariflemez. Yeni başlamış antikoagülan kullanımı yoktur; ailesi kilo artışı ve göz çevresindeki şişliği fark edince randevusunu öne almıştır.",
      "patientIntro": {
        "profile": "24 yaşında kadın hasta, nefroloji-romatoloji konsültasyonu başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, bacaklarında şişlik ve idrarında köpürme fark ettiği için polikliniğe başvuruyor.",
        "historySummary": "Hasta son üç haftadır sabahları yüzünde şişlik olduğunu, akşama doğru ayak bileklerinin belirginleştiğini anlatır. İdrarının eskisine göre daha köpüklü olduğunu ve son günlerde tansiyon ölçümlerinin yüksek çıktığını söyler. Bir yıldır eklem ağrıları ve fotosensitif döküntü nedeniyle takiptedir; ilaçlarını bazı haftalar aksattığını belirtir. Ateş, yan ağrısı, idrar yaparken yanma veya yakın zamanda boğaz enfeksiyonu tariflemez. Yeni başlamış antikoagülan kullanımı yoktur; ailesi kilo artışı ve göz çevresindeki şişliği fark edince randevusunu öne almıştır."
      },
      "vitals": {
        "TA": "154/96 mmHg",
        "Nabız": "86/dk",
        "Solunum": "17/dk",
        "SpO2": "%98, oda havasında",
        "Ateş": "36.7 °C",
        "Şok indeksi": "0.56; ekstremiteler ılık, kapiller dolum 2 saniyenin altında"
      },
      "exam": [
        "Periorbital hafif ödem ve bilateral ayak bileklerinde gode bırakan ödem izleniyor.",
        "El sırtlarında eski hiperpigmente döküntü alanları ve hafif MCP hassasiyeti var.",
        "Kostovertebral açı hassasiyeti yok.",
        "Akciğer oskültasyonu doğal, belirgin ral yok."
      ],
      "investigations": [
        {
          "id": "v287-new-627-bacaklarda-sislik-ve-kopuklu-idrar-idrar-analizi",
          "label": "Tam idrar tetkiki ve sediment",
          "title": "Tam idrar tetkiki ve sediment",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Tam idrar tetkiki ve sediment",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Proteinüriye aktif glomerüler sediment eşlik eder.",
          "clinicalMeaning": "Proteinüriye aktif glomerüler sediment eşlik eder.",
          "result": {
            "title": "Tam idrar tetkiki ve sediment",
            "summary": "Proteinüriye aktif glomerüler sediment eşlik eder.",
            "interpretation": "Proteinüriye aktif glomerüler sediment eşlik eder.",
            "values": [
              [
                "Protein",
                "3+",
                "Negatif",
                "Yüksek"
              ],
              [
                "Eritrosit",
                "35-40/hpf",
                "0-3/hpf",
                "Yüksek"
              ],
              [
                "Eritrosit silendiri",
                "Mevcut",
                "Yok",
                "Glomerüler kaynak lehine"
              ],
              [
                "Lökosit esteraz/nitrit",
                "Negatif",
                "Negatif",
                "Bakteriyel İYE lehine değil"
              ]
            ],
            "rows": [
              [
                "Protein",
                "3+",
                "Negatif",
                "Yüksek"
              ],
              [
                "Eritrosit",
                "35-40/hpf",
                "0-3/hpf",
                "Yüksek"
              ],
              [
                "Eritrosit silendiri",
                "Mevcut",
                "Yok",
                "Glomerüler kaynak lehine"
              ],
              [
                "Lökosit esteraz/nitrit",
                "Negatif",
                "Negatif",
                "Bakteriyel İYE lehine değil"
              ]
            ]
          }
        },
        {
          "id": "v287-new-627-bacaklarda-sislik-ve-kopuklu-idrar-renal-panel",
          "label": "Renal fonksiyon ve proteinüri",
          "title": "Renal fonksiyon ve proteinüri",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Renal fonksiyon ve proteinüri",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Böbrek fonksiyonunda hafif bozulma ve anlamlı proteinüri vardır.",
          "clinicalMeaning": "Böbrek fonksiyonunda hafif bozulma ve anlamlı proteinüri vardır.",
          "result": {
            "title": "Renal fonksiyon ve proteinüri",
            "summary": "Böbrek fonksiyonunda hafif bozulma ve anlamlı proteinüri vardır.",
            "interpretation": "Böbrek fonksiyonunda hafif bozulma ve anlamlı proteinüri vardır.",
            "values": [
              [
                "Kreatinin",
                "1.4 mg/dL",
                "0.5-0.9 mg/dL",
                "Yüksek"
              ],
              [
                "eGFR",
                "54 mL/dk/1.73 m²",
                ">90",
                "Düşük"
              ],
              [
                "Spot protein/kreatinin oranı",
                "1.8 g/g",
                "<0.15 g/g",
                "Yüksek"
              ],
              [
                "Albumin",
                "3.0 g/dL",
                "3.5-5.0 g/dL",
                "Düşük"
              ]
            ],
            "rows": [
              [
                "Kreatinin",
                "1.4 mg/dL",
                "0.5-0.9 mg/dL",
                "Yüksek"
              ],
              [
                "eGFR",
                "54 mL/dk/1.73 m²",
                ">90",
                "Düşük"
              ],
              [
                "Spot protein/kreatinin oranı",
                "1.8 g/g",
                "<0.15 g/g",
                "Yüksek"
              ],
              [
                "Albumin",
                "3.0 g/dL",
                "3.5-5.0 g/dL",
                "Düşük"
              ]
            ]
          }
        },
        {
          "id": "v287-new-627-bacaklarda-sislik-ve-kopuklu-idrar-otoimmun-panel",
          "label": "Otoimmün aktivite paneli",
          "title": "Otoimmün aktivite paneli",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Otoimmün aktivite paneli",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Serolojik aktivite glomerüler tutulumla aynı yönde ilerler.",
          "clinicalMeaning": "Serolojik aktivite glomerüler tutulumla aynı yönde ilerler.",
          "result": {
            "title": "Otoimmün aktivite paneli",
            "summary": "Serolojik aktivite glomerüler tutulumla aynı yönde ilerler.",
            "interpretation": "Serolojik aktivite glomerüler tutulumla aynı yönde ilerler.",
            "values": [
              [
                "Anti-dsDNA",
                "156 IU/mL",
                "<30 IU/mL",
                "Yüksek"
              ],
              [
                "C3",
                "48 mg/dL",
                "90-180 mg/dL",
                "Düşük"
              ],
              [
                "C4",
                "7 mg/dL",
                "10-40 mg/dL",
                "Düşük"
              ],
              [
                "İdrar kültürü",
                "Üreme yok",
                "Üreme yok",
                "Enfeksiyon desteklenmiyor"
              ]
            ],
            "rows": [
              [
                "Anti-dsDNA",
                "156 IU/mL",
                "<30 IU/mL",
                "Yüksek"
              ],
              [
                "C3",
                "48 mg/dL",
                "90-180 mg/dL",
                "Düşük"
              ],
              [
                "C4",
                "7 mg/dL",
                "10-40 mg/dL",
                "Düşük"
              ],
              [
                "İdrar kültürü",
                "Üreme yok",
                "Üreme yok",
                "Enfeksiyon desteklenmiyor"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada tedavi planını doğru belirlemek için en uygun sonraki basamak aşağıdakilerden hangisidir?",
      "questionType": "management",
      "answerTarget": "Lupus nefriti değerlendirmesi",
      "diagnosis": {
        "correct": "Böbrek biyopsisi ile histolojik sınıflama yapılması",
        "options": [
          "Böbrek biyopsisi ile histolojik sınıflama yapılması",
          "Ampirik yüksek doz antibiyotik başlanması",
          "Proteinüri kaybolana kadar yalnız NSAİİ kullanılması",
          "Antikoagülasyon başlanıp trombofili paneli beklenmesi",
          "Glutensiz diyet başlanıp demir depolarının izlenmesi"
        ],
        "question": "Bu hastada tedavi planını doğru belirlemek için en uygun sonraki basamak aşağıdakilerden hangisidir?",
        "explanation": "SLE bağlamında anlamlı proteinüri, kreatinin artışı, eritrosit silendirleri ve düşük kompleman/anti-dsDNA yüksekliği aktif renal tutulumu destekler. Lupus nefritinde tedavi sınıfı histolojik sınıfa göre değiştiğinden böbrek biyopsisi tanı ve tedavi seçimi için kritik basamaktır.",
        "pearls": [
          "Aktif idrar sedimenti lupus nefritinde güçlü uyarıdır.",
          "Protein/kreatinin oranı >0.5 g/g ve/veya böbrek fonksiyon bozulması biyopsi gerekliliğini artırır.",
          "Sadece serolojiyle histolojik sınıf belirlenemez."
        ],
        "optionFeedback": {
          "Böbrek biyopsisi ile histolojik sınıflama yapılması": "Bu seçenek en uygundur. SLE öyküsü olan hastada yeni ödem, köpüklü idrar, hipertansiyon, protein/kreatinin oranının belirgin yüksek olması, hematüri, eritrosit silendirleri, düşük kompleman ve anti-dsDNA yüksekliği aktif böbrek tutulumunu destekler. Tedavi sınıfı ve yoğunluğu histolojik tipe göre değiştiği için böbrek biyopsisi tanısal ve tedavi yönlendirici değerdedir. Sadece serolojiyle proliferatif, membranöz veya mikst lezyon ayrımı güvenilir yapılamaz. Bu nedenle uygun hasta stabilizasyonu ve nefroloji/romatoloji koordinasyonuyla biyopsi planlanmalıdır.",
          "Ampirik yüksek doz antibiyotik başlanması": "Ampirik antibiyotik ateş, lökositoz, pyelonefrit veya sepsis bulgusu olan hastada düşünülebilir. Bu vakada idrar kültürü negatif, ateş yok ve bulgular enfeksiyondan çok immün aracılı glomerüler inflamasyon paternindedir. Gereksiz antibiyotik hem tanıyı geciktirir hem de ilaç yan etkisi oluşturabilir. Enfeksiyon dışlanmadan immünsüpresyon başlanmamalıdır; ancak mevcut veriler ilk basamağın antibiyotik değil renal tutulumun sınıflanması olduğunu gösterir.",
          "Proteinüri kaybolana kadar yalnız NSAİİ kullanılması": "NSAİİ eklem ağrısı veya serozit semptomlarında kısa süreli yarar sağlayabilir; ancak proteinüri, aktif idrar sedimenti ve kreatinin artışı olan hastada böbrek fonksiyonunu kötüleştirebilir. Bu hastada nefritik-nefrotik karışık böbrek tutulumu düşündüren veriler vardır; yalnız semptomatik ağrı kesici kullanımı hastalığın mekanizmasını hedeflemez. Ayrıca NSAİİ renal kan akımını azaltarak glomerüler filtrasyonu bozabilir. Bu nedenle uygun yaklaşım değildir.",
          "Antikoagülasyon başlanıp trombofili paneli beklenmesi": "Antifosfolipid sendromu SLE’de tromboz veya gebelik kaybıyla ilişkili olabilir; ancak bu hastanın ana bulgusu aktif idrar sedimenti ve proteinüridir. Renal ven trombozu veya tekrarlayan tromboz öyküsü verilmemiştir. Antikoagülasyon, glomerüler inflamasyonun histolojik sınıflamasını sağlamaz ve biyopsi planını kanama riski açısından zorlaştırabilir. Trombofili paneli bazı bağlamlarda istenebilir; fakat bu vakadaki öncelik lupus nefriti değerlendirmesidir.",
          "Glutensiz diyet başlanıp demir depolarının izlenmesi": "Glutensiz diyet çölyak hastalığında malabsorpsiyon ve demir eksikliği için kullanılır; bu vakadaki proteinüri, eritrosit silendiri, düşük C3/C4 ve anti-dsDNA yüksekliğini açıklamaz. Köpüklü idrar ve ödem gastrointestinal emilim bozukluğundan çok renal protein kaybını düşündürür. Demir izlemi burada ana sorun değildir. Bu seçenek tamamen farklı bir klinik mekanizmaya yöneliktir."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Lupus nefriti, SLE hastasında proteinüri ve aktif idrar sedimentinin ortaya çıkmasıyla düşünülür; immünsüpresif tedavi kararı histolojik sınıfa göre şekillenir.",
      "examPearl": "SLE + proteinüri + eritrosit silendiri + düşük kompleman gördüğünde tedaviyi ezbere başlama; böbrek biyopsisi sınıflamayı ve tedavi yoğunluğunu belirler.",
      "whyCorrect": "Bu hastada enfeksiyon bulgusu değil, aktif immün glomerüler tutulum paterni vardır; bu nedenle biyopsi tedavi kararını yönlendiren basamaktır.",
      "optionComparison": "Antibiyotik, NSAİİ, antikoagülasyon veya diyet bu vakadaki aktif glomerüler inflamasyonu sınıflamaz ve hedeflemez.",
      "evidenceChain": [
        "Köpüklü idrar ve ödem → klinik proteinüri göstergesi.",
        "Spot protein/kreatinin 1.8 g/g → anlamlı renal tutulum.",
        "Eritrosit silendiri → glomerüler kaynaklı aktif sediment.",
        "Düşük C3/C4 ve yüksek anti-dsDNA → SLE aktivitesiyle uyumlu.",
        "Kültür negatif ve ateş yok → enfeksiyon ana açıklama değil."
      ],
      "whyWrong": {
        "Ampirik yüksek doz antibiyotik başlanması": "Ampirik antibiyotik ateş, lökositoz, pyelonefrit veya sepsis bulgusu olan hastada düşünülebilir. Bu vakada idrar kültürü negatif, ateş yok ve bulgular enfeksiyondan çok immün aracılı glomerüler inflamasyon paternindedir. Gereksiz antibiyotik hem tanıyı geciktirir hem de ilaç yan etkisi oluşturabilir. Enfeksiyon dışlanmadan immünsüpresyon başlanmamalıdır; ancak mevcut veriler ilk basamağın antibiyotik değil renal tutulumun sınıflanması olduğunu gösterir.",
        "Proteinüri kaybolana kadar yalnız NSAİİ kullanılması": "NSAİİ eklem ağrısı veya serozit semptomlarında kısa süreli yarar sağlayabilir; ancak proteinüri, aktif idrar sedimenti ve kreatinin artışı olan hastada böbrek fonksiyonunu kötüleştirebilir. Bu hastada nefritik-nefrotik karışık böbrek tutulumu düşündüren veriler vardır; yalnız semptomatik ağrı kesici kullanımı hastalığın mekanizmasını hedeflemez. Ayrıca NSAİİ renal kan akımını azaltarak glomerüler filtrasyonu bozabilir. Bu nedenle uygun yaklaşım değildir.",
        "Antikoagülasyon başlanıp trombofili paneli beklenmesi": "Antifosfolipid sendromu SLE’de tromboz veya gebelik kaybıyla ilişkili olabilir; ancak bu hastanın ana bulgusu aktif idrar sedimenti ve proteinüridir. Renal ven trombozu veya tekrarlayan tromboz öyküsü verilmemiştir. Antikoagülasyon, glomerüler inflamasyonun histolojik sınıflamasını sağlamaz ve biyopsi planını kanama riski açısından zorlaştırabilir. Trombofili paneli bazı bağlamlarda istenebilir; fakat bu vakadaki öncelik lupus nefriti değerlendirmesidir.",
        "Glutensiz diyet başlanıp demir depolarının izlenmesi": "Glutensiz diyet çölyak hastalığında malabsorpsiyon ve demir eksikliği için kullanılır; bu vakadaki proteinüri, eritrosit silendiri, düşük C3/C4 ve anti-dsDNA yüksekliğini açıklamaz. Köpüklü idrar ve ödem gastrointestinal emilim bozukluğundan çok renal protein kaybını düşündürür. Demir izlemi burada ana sorun değildir. Bu seçenek tamamen farklı bir klinik mekanizmaya yöneliktir."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v287",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V286 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v287-new-628-kuru-oksuruk-ve-efor-dispnesi",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Kuru öksürük ve efor dispnesi",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "İleri hücresel immünsüpresyonu olan hastada subakut hipoksemik pnömoni paternini değerlendirerek PJP’de TMP-SMX ve steroid kararını seçme.",
      "learningTarget": "Pneumocystis pnömonisinde CD4 düşüklüğü, diffüz buzlu cam opasiteleri ve PaO2 eşiğinin tedaviye steroid eklenmesini nasıl belirlediğini kavrama.",
      "demographics": "37 yaşında erkek hasta",
      "setting": "Acil servis",
      "chiefComplaint": "Hasta, haftalardır artan kuru öksürük ve eforla nefes darlığı nedeniyle acile başvuruyor.",
      "stem": "Hasta üç haftadır kuru öksürüğünün olduğunu, son günlerde banyoya yürürken bile nefesinin kesildiğini anlatır. Ateşi bazı akşamlar yükselmiş ama balgam çıkaramadığını ve göğsünde tek taraflı batıcı ağrı olmadığını söyler. Yaklaşık bir yıldır kilo kaybettiğini, ağız içinde beyaz plaklar nedeniyle yemek yerken yanma hissettiğini belirtir. Daha önce HIV testi yaptırmadığını, düzenli ilaç kullanmadığını ve yakın zamanda hastaneye yatmadığını ifade eder. Evde kullandığı öksürük şuruplarıyla rahatlamayınca arkadaşının ısrarıyla acile gelmiştir.",
      "patientIntro": {
        "profile": "37 yaşında erkek hasta, acil servis başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, haftalardır artan kuru öksürük ve eforla nefes darlığı nedeniyle acile başvuruyor.",
        "historySummary": "Hasta üç haftadır kuru öksürüğünün olduğunu, son günlerde banyoya yürürken bile nefesinin kesildiğini anlatır. Ateşi bazı akşamlar yükselmiş ama balgam çıkaramadığını ve göğsünde tek taraflı batıcı ağrı olmadığını söyler. Yaklaşık bir yıldır kilo kaybettiğini, ağız içinde beyaz plaklar nedeniyle yemek yerken yanma hissettiğini belirtir. Daha önce HIV testi yaptırmadığını, düzenli ilaç kullanmadığını ve yakın zamanda hastaneye yatmadığını ifade eder. Evde kullandığı öksürük şuruplarıyla rahatlamayınca arkadaşının ısrarıyla acile gelmiştir."
      },
      "vitals": {
        "TA": "112/70 mmHg",
        "Nabız": "108/dk",
        "Solunum": "28/dk",
        "SpO2": "%86, oda havasında; %93, nazal oksijenle",
        "Ateş": "38.1 °C",
        "Şok indeksi": "0.96; konuşurken çabuk yoruluyor, kapiller dolum yaklaşık 2 saniye"
      },
      "exam": [
        "Oral mukozada kazınabilen beyaz plaklar izleniyor.",
        "Akciğerlerde yaygın ince inspiratuvar rallere ek olarak belirgin lokalize konsolidasyon bulgusu yok.",
        "Servikal bölgede küçük, hassas olmayan lenf nodları palpe ediliyor.",
        "Periferik ödem veya yeni kardiyak üfürüm saptanmıyor."
      ],
      "investigations": [
        {
          "id": "v287-new-628-kuru-oksuruk-ve-efor-dispnesi-kan-gazi",
          "label": "Arter kan gazı ve oksijenasyon",
          "title": "Arter kan gazı ve oksijenasyon",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Arter kan gazı ve oksijenasyon",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Oda havasında belirgin hipoksemi vardır ve alveolo-arteriyel gradiyent artmıştır.",
          "clinicalMeaning": "Oda havasında belirgin hipoksemi vardır ve alveolo-arteriyel gradiyent artmıştır.",
          "result": {
            "title": "Arter kan gazı ve oksijenasyon",
            "summary": "Oda havasında belirgin hipoksemi vardır ve alveolo-arteriyel gradiyent artmıştır.",
            "interpretation": "Oda havasında belirgin hipoksemi vardır ve alveolo-arteriyel gradiyent artmıştır.",
            "values": [
              [
                "pH",
                "7.46",
                "7.35-7.45",
                "Hafif yüksek"
              ],
              [
                "PaCO2",
                "31 mmHg",
                "35-45 mmHg",
                "Düşük"
              ],
              [
                "PaO2",
                "62 mmHg",
                "80-100 mmHg",
                "Düşük"
              ],
              [
                "A-a gradiyent",
                "48 mmHg",
                "<15-20 mmHg",
                "Yüksek"
              ]
            ],
            "rows": [
              [
                "pH",
                "7.46",
                "7.35-7.45",
                "Hafif yüksek"
              ],
              [
                "PaCO2",
                "31 mmHg",
                "35-45 mmHg",
                "Düşük"
              ],
              [
                "PaO2",
                "62 mmHg",
                "80-100 mmHg",
                "Düşük"
              ],
              [
                "A-a gradiyent",
                "48 mmHg",
                "<15-20 mmHg",
                "Yüksek"
              ]
            ]
          }
        },
        {
          "id": "v287-new-628-kuru-oksuruk-ve-efor-dispnesi-immunsupresyon",
          "label": "İmmün durum ve inflamasyon belirteçleri",
          "title": "İmmün durum ve inflamasyon belirteçleri",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "İmmün durum ve inflamasyon belirteçleri",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Hücresel immünsüpresyon ve opportunistik enfeksiyonla uyumlu destekleyici belirteçler vardır.",
          "clinicalMeaning": "Hücresel immünsüpresyon ve opportunistik enfeksiyonla uyumlu destekleyici belirteçler vardır.",
          "result": {
            "title": "İmmün durum ve inflamasyon belirteçleri",
            "summary": "Hücresel immünsüpresyon ve opportunistik enfeksiyonla uyumlu destekleyici belirteçler vardır.",
            "interpretation": "Hücresel immünsüpresyon ve opportunistik enfeksiyonla uyumlu destekleyici belirteçler vardır.",
            "values": [
              [
                "HIV Ag/Ab testi",
                "Pozitif",
                "Negatif",
                "Pozitif"
              ],
              [
                "CD4 sayısı",
                "86/µL",
                ">500/µL",
                "Düşük"
              ],
              [
                "LDH",
                "486 U/L",
                "<250 U/L",
                "Yüksek"
              ],
              [
                "Beta-D-glukan",
                "Pozitif",
                "Negatif",
                "Pozitif"
              ]
            ],
            "rows": [
              [
                "HIV Ag/Ab testi",
                "Pozitif",
                "Negatif",
                "Pozitif"
              ],
              [
                "CD4 sayısı",
                "86/µL",
                ">500/µL",
                "Düşük"
              ],
              [
                "LDH",
                "486 U/L",
                "<250 U/L",
                "Yüksek"
              ],
              [
                "Beta-D-glukan",
                "Pozitif",
                "Negatif",
                "Pozitif"
              ]
            ]
          }
        },
        {
          "id": "v287-new-628-kuru-oksuruk-ve-efor-dispnesi-toraks-bt",
          "label": "Toraks BT",
          "title": "Toraks BT",
          "type": "radiology",
          "priority": "essential",
          "subtype": "Toraks BT",
          "category": "radiology",
          "testTypeCategory": "radiology",
          "summary": "Her iki akciğerde yaygın alveoler-interstisyel tutulum paterni izlenir.",
          "clinicalMeaning": "Her iki akciğerde yaygın alveoler-interstisyel tutulum paterni izlenir.",
          "result": {
            "title": "Toraks BT",
            "summary": "Her iki akciğerde yaygın alveoler-interstisyel tutulum paterni izlenir.",
            "interpretation": "Her iki akciğerde yaygın alveoler-interstisyel tutulum paterni izlenir.",
            "values": [
              [
                "Parankim paterni",
                "Bilateral yaygın buzlu cam opasiteleri",
                "Yok",
                "Yaygın"
              ],
              [
                "Lobar konsolidasyon",
                "Belirgin değil",
                "Yok",
                "Tipik bakteriyel patern zayıf"
              ],
              [
                "Plevral efüzyon",
                "Yok",
                "Yok",
                "Eşlik etmiyor"
              ],
              [
                "Pulmoner emboli bulgusu",
                "Saptanmadı",
                "Yok",
                "Desteklenmiyor"
              ]
            ],
            "rows": [
              [
                "Parankim paterni",
                "Bilateral yaygın buzlu cam opasiteleri",
                "Yok",
                "Yaygın"
              ],
              [
                "Lobar konsolidasyon",
                "Belirgin değil",
                "Yok",
                "Tipik bakteriyel patern zayıf"
              ],
              [
                "Plevral efüzyon",
                "Yok",
                "Yok",
                "Eşlik etmiyor"
              ],
              [
                "Pulmoner emboli bulgusu",
                "Saptanmadı",
                "Yok",
                "Desteklenmiyor"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada en uygun antimikrobiyal ve destek tedavi yaklaşımı aşağıdakilerden hangisidir?",
      "questionType": "management",
      "answerTarget": "Opportunistik pnömoni tedavisi",
      "diagnosis": {
        "correct": "TMP-SMX tedavisine sistemik kortikosteroid eklenmesi",
        "options": [
          "Azitromisin monoterapisi ve ayaktan kontrol",
          "Oseltamivir monoterapisi ve ev izolasyonu",
          "TMP-SMX tedavisine sistemik kortikosteroid eklenmesi",
          "Sadece inhaler bronkodilatör ve oral antihistaminik başlanması",
          "Vorikonazol monoterapisi ve nötropeni profilaksisi"
        ],
        "question": "Bu hastada en uygun antimikrobiyal ve destek tedavi yaklaşımı aşağıdakilerden hangisidir?",
        "explanation": "CD4 düşüklüğü, oral kandidiyazis, subakut kuru öksürük, hipoksemi, yüksek LDH/beta-D-glukan ve bilateral buzlu cam opasiteleri PJP olasılığını güçlendirir. PaO2 <70 mmHg ve yüksek A-a gradiyent orta-ağır hastalığı gösterdiğinden TMP-SMX tedavisine sistemik kortikosteroid eklenmelidir.",
        "pearls": [
          "PJP genellikle subakut kuru öksürük ve efor dispnesiyle gelir.",
          "CD4 <200/µL önemli risk eşiğidir.",
          "PaO2 <70 mmHg veya A-a gradiyent ≥35 mmHg olduğunda steroid eklenmesi gerekir."
        ],
        "optionFeedback": {
          "Azitromisin monoterapisi ve ayaktan kontrol": "Azitromisin toplum kökenli pnömoninin bazı atipik etkenlerinde veya belirli kombinasyon rejimlerinde kullanılabilir; fakat bu hastanın subakut kuru öksürük, belirgin efor dispnesi, CD4 düşüklüğü, yüksek LDH, beta-D-glukan pozitifliği ve yaygın buzlu cam opasiteleriyle giden tablosunu tek başına açıklamaz. Ayrıca oda havasında PaO2 62 mmHg olması ayaktan izlem için bu vaka için doğru klinik hedef değildir. Makrolid monoterapisi PJP’nin temel tedavisi değildir. Bu seçenek hem etkeni hem de hipoksemi ciddiyetini gözden kaçırır.",
          "Oseltamivir monoterapisi ve ev izolasyonu": "Oseltamivir influenza için erken dönemde kullanılabilir; influenza ateş, miyalji ve üst solunum yolu semptomlarıyla daha akut başlayabilir. Bu vakada üç haftalık sinsi efor dispnesi, oral kandidiyazis, CD4 86/µL ve görüntülemede bilateral yaygın buzlu cam görünümü opportunistik pnömoniyi daha güçlü destekler. Influenza testi negatif verilmiş ve hipoksemi belirgindir. Oseltamivir monoterapisi ne PJP’ye etkilidir ne de hipoksemiye bağlı inflamatuvar hasarı azaltır.",
          "TMP-SMX tedavisine sistemik kortikosteroid eklenmesi": "Bu seçenek en uygundur. İleri immünsüpresyon bulguları olan hastada subakut kuru öksürük, efor dispnesi, yüksek LDH, beta-D-glukan pozitifliği ve bilateral buzlu cam opasiteleri Pneumocystis jirovecii pnömonisiyle uyumludur. Oda havasında PaO2 62 mmHg olması orta-ağır hastalık düzeyini gösterir; bu nedenle TMP-SMX temel tedavisine sistemik kortikosteroid eklenmesi gerekir. Kortikosteroidler antimikrobiyal tedavi sonrası gelişebilecek inflamatuvar kötüleşmeyi ve gaz değişim bozulmasını azaltmak için erken başlanır. TUS açısından CD4 <200 + kuru öksürük + buzlu cam + hipoksemi birlikteliği PJP ve hipoksemide steroid eklenmesini düşündürür.",
          "Sadece inhaler bronkodilatör ve oral antihistaminik başlanması": "Bronkodilatörler bronkospazmı olan hastada semptomatik rahatlama sağlayabilir; antihistaminikler alerjik rinit veya ürtiker için kullanılabilir. Bu vakada temel problem reversibl bronkospazm değil, opportunistik alveoler-interstisyel enfeksiyon ve gaz değişim bozukluğudur. Wheezing baskın değildir, hipoksemi ve BT bulguları parankimal süreci destekler. Bu yaklaşım enfeksiyonu tedavi etmez ve ciddi hipoksemiyi gözden kaçırır.",
          "Vorikonazol monoterapisi ve nötropeni profilaksisi": "Vorikonazol aspergilloz gibi küf enfeksiyonlarında kullanılır; nötropenik hematolojik malignite bağlamında daha sık gündeme gelir. Bu hastada belirgin nötropeni yok, temel risk ileri HIV ilişkili hücresel immünsüpresyondur. Buzlu cam opasiteleri aspergillus için spesifik değildir; PJP’de tipik olabilir. Vorikonazol PJP’nin standart tedavisi değildir ve gereksiz antifungal toksisite oluşturabilir."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Pneumocystis jirovecii pnömonisinde temel tedavi TMP-SMX’tir; hipoksemi belirginse erken sistemik kortikosteroid eklenir.",
      "examPearl": "CD4 <200 + kuru öksürük + buzlu cam + PaO2 <70: PJP tedavisi TMP-SMX + steroid.",
      "whyCorrect": "Bu hastada hem etken olasılığı hem de hipoksemi ciddiyeti tedaviyi belirler; yalnız standart pnömoni veya influenza tedavisi yeterli değildir.",
      "optionComparison": "Makrolid, oseltamivir, bronkodilatör veya vorikonazol farklı klinik bağlamlarda kullanılabilir; bu vakadaki CD4-düşük hipoksemik PJP paternini hedeflemez.",
      "evidenceChain": [
        "Üç haftalık kuru öksürük ve efor dispnesi → subakut opportunistik pnömoni seyri.",
        "Oral kandidiyazis ve CD4 86/µL → ileri hücresel immünsüpresyon.",
        "Bilateral buzlu cam opasiteleri → yaygın alveoler-interstisyel tutulum.",
        "PaO2 62 mmHg ve A-a 48 mmHg → orta-ağır hipoksemi.",
        "LDH ve beta-D-glukan yüksekliği → PJP lehine destekleyici veri."
      ],
      "whyWrong": {
        "Azitromisin monoterapisi ve ayaktan kontrol": "Azitromisin toplum kökenli pnömoninin bazı atipik etkenlerinde veya belirli kombinasyon rejimlerinde kullanılabilir; fakat bu hastanın subakut kuru öksürük, belirgin efor dispnesi, CD4 düşüklüğü, yüksek LDH, beta-D-glukan pozitifliği ve yaygın buzlu cam opasiteleriyle giden tablosunu tek başına açıklamaz. Ayrıca oda havasında PaO2 62 mmHg olması ayaktan izlem için bu vaka için doğru klinik hedef değildir. Makrolid monoterapisi PJP’nin temel tedavisi değildir. Bu seçenek hem etkeni hem de hipoksemi ciddiyetini gözden kaçırır.",
        "Oseltamivir monoterapisi ve ev izolasyonu": "Oseltamivir influenza için erken dönemde kullanılabilir; influenza ateş, miyalji ve üst solunum yolu semptomlarıyla daha akut başlayabilir. Bu vakada üç haftalık sinsi efor dispnesi, oral kandidiyazis, CD4 86/µL ve görüntülemede bilateral yaygın buzlu cam görünümü opportunistik pnömoniyi daha güçlü destekler. Influenza testi negatif verilmiş ve hipoksemi belirgindir. Oseltamivir monoterapisi ne PJP’ye etkilidir ne de hipoksemiye bağlı inflamatuvar hasarı azaltır.",
        "Sadece inhaler bronkodilatör ve oral antihistaminik başlanması": "Bronkodilatörler bronkospazmı olan hastada semptomatik rahatlama sağlayabilir; antihistaminikler alerjik rinit veya ürtiker için kullanılabilir. Bu vakada temel problem reversibl bronkospazm değil, opportunistik alveoler-interstisyel enfeksiyon ve gaz değişim bozukluğudur. Wheezing baskın değildir, hipoksemi ve BT bulguları parankimal süreci destekler. Bu yaklaşım enfeksiyonu tedavi etmez ve ciddi hipoksemiyi gözden kaçırır.",
        "Vorikonazol monoterapisi ve nötropeni profilaksisi": "Vorikonazol aspergilloz gibi küf enfeksiyonlarında kullanılır; nötropenik hematolojik malignite bağlamında daha sık gündeme gelir. Bu hastada belirgin nötropeni yok, temel risk ileri HIV ilişkili hücresel immünsüpresyondur. Buzlu cam opasiteleri aspergillus için spesifik değildir; PJP’de tipik olabilir. Vorikonazol PJP’nin standart tedavisi değildir ve gereksiz antifungal toksisite oluşturabilir."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v287",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V286 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v288-new-629-boyun-damarlarinda-belirginlesme-ve-nefes-darligi",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Boyun damarlarında belirginleşme ve nefes darlığı",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Perikardiyal sıvı ile gelen hemodinamik etkilenmiş hastada acil drenaj kararını, stabil perikardit veya kalp yetersizliği tedavisinden ayırma.",
      "learningTarget": "Tamponad fizyolojisinde preload bağımlılığı, sağ boşluk diyastolik çökmesi ve acil perikardiyal dekompresyon mantığını kavrama.",
      "demographics": "58 yaşında kadın hasta",
      "setting": "Acil servis",
      "chiefComplaint": "Hasta, son saatlerde nefes darlığının hızla artması ve sersemlik hissi nedeniyle acile getiriliyor.",
      "stem": "Hasta iki gündür göğsünün ortasında baskı ve huzursuzluk hissettiğini, sabah saatlerinden itibaren ise yatarken nefesinin daha da daraldığını anlatır. Son birkaç saatte ayağa kalkınca gözlerinin karardığını, konuşurken cümlelerini tamamlamakta zorlandığını söyler. Üç hafta önce viral üst solunum yolu enfeksiyonu geçirmiştir; o dönemden beri aralıklı göğüs rahatsızlığı olmuş ama bugün ilk kez bu kadar halsiz hissetmiştir. Evde ateş ölçmediğini, balgam çıkarmadığını ve bacaklarında tek taraflı şişlik fark etmediğini belirtir. Ailesi boyun damarlarının belirginleştiğini ve renginin solduğunu görünce beklemeden acile getirmiştir.",
      "patientIntro": {
        "profile": "58 yaşında kadın hasta, acil servis başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, son saatlerde nefes darlığının hızla artması ve sersemlik hissi nedeniyle acile getiriliyor.",
        "historySummary": "Hasta iki gündür göğsünün ortasında baskı ve huzursuzluk hissettiğini, sabah saatlerinden itibaren ise yatarken nefesinin daha da daraldığını anlatır. Son birkaç saatte ayağa kalkınca gözlerinin karardığını, konuşurken cümlelerini tamamlamakta zorlandığını söyler. Üç hafta önce viral üst solunum yolu enfeksiyonu geçirmiştir; o dönemden beri aralıklı göğüs rahatsızlığı olmuş ama bugün ilk kez bu kadar halsiz hissetmiştir. Evde ateş ölçmediğini, balgam çıkarmadığını ve bacaklarında tek taraflı şişlik fark etmediğini belirtir. Ailesi boyun damarlarının belirginleştiğini ve renginin solduğunu görünce beklemeden acile getirmiştir."
      },
      "vitals": {
        "TA": "86/58 mmHg",
        "Nabız": "124/dk",
        "Solunum": "26/dk",
        "SpO2": "%94, oda havasında",
        "Ateş": "37.2 °C",
        "Şok indeksi": "1.44; ekstremiteler soğuk, kapiller dolum 4 saniye"
      },
      "exam": [
        "Juguler ven dolgunluğu belirgin, hasta yarı oturur pozisyonda rahatlıyor.",
        "Kalp sesleri derinden ve azalmış duyuluyor; belirgin yeni üfürüm yok.",
        "Akciğer bazallerinde yaygın ral saptanmıyor.",
        "Periferik nabızlar zayıf, inspiryumla sistolik basınçta yaklaşık 14 mmHg düşüş ölçülüyor."
      ],
      "investigations": [
        {
          "id": "v288-new-629-boyun-damarlarinda-belirginlesme-ve-nefes-darligi-yatak-basi-eko",
          "label": "Yatak başı transtorasik ekokardiyografi",
          "title": "Yatak başı transtorasik ekokardiyografi",
          "type": "cardiology",
          "priority": "essential",
          "subtype": "Yatak başı transtorasik ekokardiyografi",
          "category": "cardiology",
          "testTypeCategory": "cardiology",
          "summary": "Perikardiyal sıvı ile birlikte sağ kalp dolumunu azaltan dinamik bulgular izlenir.",
          "clinicalMeaning": "Perikardiyal sıvı ile birlikte sağ kalp dolumunu azaltan dinamik bulgular izlenir.",
          "result": {
            "title": "Yatak başı transtorasik ekokardiyografi",
            "summary": "Perikardiyal sıvı ile birlikte sağ kalp dolumunu azaltan dinamik bulgular izlenir.",
            "interpretation": "Perikardiyal sıvı ile birlikte sağ kalp dolumunu azaltan dinamik bulgular izlenir.",
            "values": [
              [
                "Perikardiyal sıvı",
                "Sirkumferensiyel, en geniş 24 mm",
                "Yok/minimal",
                "Belirgin"
              ],
              [
                "Sağ atriyum hareketi",
                "Diyastolde içe çökme",
                "Yok",
                "Anormal"
              ],
              [
                "Sağ ventrikül serbest duvarı",
                "Erken diyastolik çökme",
                "Yok",
                "Anormal"
              ],
              [
                "İnferior vena kava",
                "Dilate, inspiratuvar kollaps < %20",
                "Normal kollaps > %50",
                "Yüksek sağ atriyal basınç"
              ]
            ],
            "rows": [
              [
                "Perikardiyal sıvı",
                "Sirkumferensiyel, en geniş 24 mm",
                "Yok/minimal",
                "Belirgin"
              ],
              [
                "Sağ atriyum hareketi",
                "Diyastolde içe çökme",
                "Yok",
                "Anormal"
              ],
              [
                "Sağ ventrikül serbest duvarı",
                "Erken diyastolik çökme",
                "Yok",
                "Anormal"
              ],
              [
                "İnferior vena kava",
                "Dilate, inspiratuvar kollaps < %20",
                "Normal kollaps > %50",
                "Yüksek sağ atriyal basınç"
              ]
            ]
          }
        },
        {
          "id": "v288-new-629-boyun-damarlarinda-belirginlesme-ve-nefes-darligi-ekg",
          "label": "EKG",
          "title": "EKG",
          "type": "cardiology",
          "priority": "important",
          "subtype": "EKG",
          "category": "cardiology",
          "testTypeCategory": "cardiology",
          "summary": "Yaygın düşük voltaj ve sinüs taşikardisi vardır; fokal transmural iskemi paterni yoktur.",
          "clinicalMeaning": "Yaygın düşük voltaj ve sinüs taşikardisi vardır; fokal transmural iskemi paterni yoktur.",
          "result": {
            "title": "EKG",
            "summary": "Yaygın düşük voltaj ve sinüs taşikardisi vardır; fokal transmural iskemi paterni yoktur.",
            "interpretation": "Yaygın düşük voltaj ve sinüs taşikardisi vardır; fokal transmural iskemi paterni yoktur.",
            "values": [
              [
                "Ritim",
                "Sinüs taşikardisi, 124/dk",
                "60-100/dk",
                "Yüksek"
              ],
              [
                "QRS voltajı",
                "Ekstremite derivasyonlarında düşük",
                "Normal",
                "Düşük"
              ],
              [
                "ST elevasyonu",
                "Bölgesel STEMI paterni yok",
                "Yok",
                "Yok"
              ],
              [
                "Elektriksel alternans",
                "Belirsiz/dalgalı QRS amplitüdü",
                "Yok",
                "Destekleyici"
              ]
            ],
            "rows": [
              [
                "Ritim",
                "Sinüs taşikardisi, 124/dk",
                "60-100/dk",
                "Yüksek"
              ],
              [
                "QRS voltajı",
                "Ekstremite derivasyonlarında düşük",
                "Normal",
                "Düşük"
              ],
              [
                "ST elevasyonu",
                "Bölgesel STEMI paterni yok",
                "Yok",
                "Yok"
              ],
              [
                "Elektriksel alternans",
                "Belirsiz/dalgalı QRS amplitüdü",
                "Yok",
                "Destekleyici"
              ]
            ]
          }
        },
        {
          "id": "v288-new-629-boyun-damarlarinda-belirginlesme-ve-nefes-darligi-temel-laboratuvar",
          "label": "Temel laboratuvar ve perfüzyon",
          "title": "Temel laboratuvar ve perfüzyon",
          "type": "laboratory",
          "priority": "important",
          "subtype": "Temel laboratuvar ve perfüzyon",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Doku perfüzyonunda bozulma başlarken belirgin enfeksiyöz şok paterni baskın değildir.",
          "clinicalMeaning": "Doku perfüzyonunda bozulma başlarken belirgin enfeksiyöz şok paterni baskın değildir.",
          "result": {
            "title": "Temel laboratuvar ve perfüzyon",
            "summary": "Doku perfüzyonunda bozulma başlarken belirgin enfeksiyöz şok paterni baskın değildir.",
            "interpretation": "Doku perfüzyonunda bozulma başlarken belirgin enfeksiyöz şok paterni baskın değildir.",
            "values": [
              [
                "Laktat",
                "3.1 mmol/L",
                "<2.0 mmol/L",
                "Yüksek"
              ],
              [
                "Hemoglobin",
                "12.6 g/dL",
                "12-16 g/dL",
                "Normal"
              ],
              [
                "Lökosit",
                "9.800/µL",
                "4.000-10.000/µL",
                "Üst sınıra yakın"
              ],
              [
                "Kreatinin",
                "1.05 mg/dL",
                "0.5-0.9 mg/dL",
                "Hafif yüksek"
              ]
            ],
            "rows": [
              [
                "Laktat",
                "3.1 mmol/L",
                "<2.0 mmol/L",
                "Yüksek"
              ],
              [
                "Hemoglobin",
                "12.6 g/dL",
                "12-16 g/dL",
                "Normal"
              ],
              [
                "Lökosit",
                "9.800/µL",
                "4.000-10.000/µL",
                "Üst sınıra yakın"
              ],
              [
                "Kreatinin",
                "1.05 mg/dL",
                "0.5-0.9 mg/dL",
                "Hafif yüksek"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada acil yönetimde öncelikli basamak aşağıdakilerden hangisidir?",
      "questionType": "management",
      "answerTarget": "Hemodinamik acil yaklaşım",
      "diagnosis": {
        "correct": "Acil hemodinamik destek eşliğinde perikardiyal sıvının boşaltılması",
        "options": [
          "Yüksek doz oral kolşisin ve NSAİİ ile ayaktan izlem",
          "Acil hemodinamik destek eşliğinde perikardiyal sıvının boşaltılması",
          "Beta bloker ve nitrat başlanarak efor kısıtlaması önerilmesi",
          "Furosemid infüzyonu ile agresif diürez uygulanması",
          "Elektif koroner anjiyografi randevusu verilerek taburculuk"
        ],
        "question": "Bu hastada acil yönetimde öncelikli basamak aşağıdakilerden hangisidir?",
        "explanation": "Hipotansiyon, taşikardi, juguler ven dolgunluğu, azalmış kalp sesleri, pulsus paradoksus ve ekokardiyografide sağ boşluk diyastolik çökmesi birlikte perikardiyal basınca bağlı kritik dolum kısıtlılığını gösterir. Bu durumda antiinflamatuvar veya diüretik tedaviyle beklemek yerine acil perikardiyal drenaj planlanmalıdır.",
        "pearls": [
          "Perikardiyal sıvıda hemodinamik bozulma varsa tedavi geciktirilmez.",
          "Preloadu azaltan ilaçlar dolum kısıtlılığını ağırlaştırabilir.",
          "Yatak başı ekokardiyografi acil karar için kritik anatomik ve dinamik bilgiyi verir."
        ],
        "optionFeedback": {
          "Yüksek doz oral kolşisin ve NSAİİ ile ayaktan izlem": "Kolşisin ve NSAİİ akut inflamatuvar perikarditte göğüs ağrısı ve nüks riskini azaltmak için kullanılabilir; ancak bu seçenek hemodinamik etkilenme bulguları olan hastada öncelikli yaklaşım değildir. Bu vakada hipotansiyon, taşikardi, juguler ven dolgunluğu, kalp seslerinde belirgin azalma, pulsus paradoksus ve ekokardiyografide sağ boşluk diyastolik çökmesi vardır. Bu bulgular sadece inflamasyonu baskılamayı değil, kalp dolumunu mekanik olarak rahatlatacak acil girişimi gerektirir. NSAİİ-kolşisin yaklaşımı stabil, tamponad bulgusu olmayan perikardit hastasında doğru olabilir; burada beklemek dolaşım bozukluğunu derinleştirir.",
          "Acil hemodinamik destek eşliğinde perikardiyal sıvının boşaltılması": "Bu seçenek en uygundur. Hastada dakikalar-saatler içinde artan nefes darlığı, hipotansiyon, taşikardi, boyun venlerinde belirginleşme, kalp seslerinde azalma ve inspiryumla sistolik basınç düşüşü vardır. Ekokardiyografide geniş perikardiyal sıvı, sağ atriyum/sağ ventrikül diyastolik çökmesi ve belirgin respiratuvar transmitral akım değişkenliği kalp dolumunun dıştan kısıtlandığını gösterir. Bu durumda sıvı resüsitasyonu ve vazopressör gerekirse geçici destek sağlayabilir; ancak esas tedavi perikardiyal basının acilen azaltılmasıdır. TUS mantığında hipotansiyon + JVD + boğuk kalp sesleri + ekoda sağ boşluk çökmesi görüldüğünde gecikmeden perikardiyosentez/perikardiyal drenaj düşünülür.",
          "Beta bloker ve nitrat başlanarak efor kısıtlaması önerilmesi": "Beta bloker ve nitratlar angina veya hipertansif koroner sendrom bağlamında seçilebilir; fakat burada ana sorun koroner vazospazm veya talep iskemisi değildir. Nitratlar venöz dönüşü azaltarak kalp dolumu zaten kısıtlı olan hastada hipotansiyonu kötüleştirebilir. EKG’de yaygın voltaj düşüklüğü ve ekokardiyografide perikardiyal sıvı-dolum kısıtlanması varken antianginal tedavi hedef dışıdır. Bu yaklaşım ancak stabil koroner arter hastalığı veya kontrollü hipertansiyon bağlamında anlamlı olurdu.",
          "Furosemid infüzyonu ile agresif diürez uygulanması": "Diürez konjestif kalp yetersizliğinde veya hacim fazlalığına bağlı pulmoner ödemde yararlı olabilir; fakat bu vakada temel patofizyoloji intraperikardiyal basınç artışı nedeniyle sağ kalp dolumunun azalmasıdır. Agresif diürez preloadu düşürerek kardiyak outputu daha da azaltabilir ve şoku ağırlaştırabilir. Akciğerde yaygın ral veya belirgin hacim fazlalığı yerine juguler ven dolgunluğu, dar nabız basıncı ve ekokardiyografik çökme bulguları ön plandadır. Bu nedenle furosemid ilk basamak değildir.",
          "Elektif koroner anjiyografi randevusu verilerek taburculuk": "Koroner anjiyografi akut koroner sendrom şüphesinde veya yüksek riskli iskemik bulgularda gündeme gelir. Bu hastanın ağrısı ve dispnesiyle birlikte dolaşım bulguları, EKG’de yaygın düşük voltaj ve ekokardiyografide perikardiyal sıvı/dolum bozukluğu vardır; taburculuk veya elektif randevu güvenli değildir. Koroner değerlendirme daha sonra gerekebilir; ancak ilk olarak yaşamı tehdit eden mekanik dolum kısıtlılığı giderilmelidir. Elektif yaklaşım hemodinamik riski gözden kaçırır."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Perikardiyal basınç kalp boşluklarının diyastolik dolumunu kısıtladığında dolaşım tedavisi mekanik dekompresyon gerektirir.",
      "examPearl": "Hipotansiyon + JVD + boğuk kalp sesleri + ekoda sağ boşluk çökmesi: stabil perikardit tedavisi değil acil drenaj.",
      "whyCorrect": "Bu hastada düşük debi ve sağ boşluk çökmesi mekanik dolum bozukluğuna bağlıdır; bu nedenle ilk hedef sıvının boşaltılmasıdır.",
      "optionComparison": "NSAİİ, beta bloker, diüretik veya elektif koroner değerlendirme farklı klinik bağlamlarda işe yarar; burada hemodinamik etkilenmeyi çözmez.",
      "evidenceChain": [
        "TA 86/58 ve nabız 124/dk → dolaşım kompansasyonu bozulmuş.",
        "JVD ve boğuk kalp sesleri → intraperikardiyal basınç etkisini destekler.",
        "Pulsus paradoksus 14 mmHg → inspiryumda sol kalp dolumunun belirgin azalması.",
        "Ekokardiyografide sağ boşluk çökmesi → kalp dolumu dıştan kısıtlanıyor.",
        "Akciğerde yaygın ral olmaması → primer hacim fazlalığına bağlı pulmoner ödemden uzaklaştırır."
      ],
      "whyWrong": {
        "Yüksek doz oral kolşisin ve NSAİİ ile ayaktan izlem": "Kolşisin ve NSAİİ akut inflamatuvar perikarditte göğüs ağrısı ve nüks riskini azaltmak için kullanılabilir; ancak bu seçenek hemodinamik etkilenme bulguları olan hastada öncelikli yaklaşım değildir. Bu vakada hipotansiyon, taşikardi, juguler ven dolgunluğu, kalp seslerinde belirgin azalma, pulsus paradoksus ve ekokardiyografide sağ boşluk diyastolik çökmesi vardır. Bu bulgular sadece inflamasyonu baskılamayı değil, kalp dolumunu mekanik olarak rahatlatacak acil girişimi gerektirir. NSAİİ-kolşisin yaklaşımı stabil, tamponad bulgusu olmayan perikardit hastasında doğru olabilir; burada beklemek dolaşım bozukluğunu derinleştirir.",
        "Beta bloker ve nitrat başlanarak efor kısıtlaması önerilmesi": "Beta bloker ve nitratlar angina veya hipertansif koroner sendrom bağlamında seçilebilir; fakat burada ana sorun koroner vazospazm veya talep iskemisi değildir. Nitratlar venöz dönüşü azaltarak kalp dolumu zaten kısıtlı olan hastada hipotansiyonu kötüleştirebilir. EKG’de yaygın voltaj düşüklüğü ve ekokardiyografide perikardiyal sıvı-dolum kısıtlanması varken antianginal tedavi hedef dışıdır. Bu yaklaşım ancak stabil koroner arter hastalığı veya kontrollü hipertansiyon bağlamında anlamlı olurdu.",
        "Furosemid infüzyonu ile agresif diürez uygulanması": "Diürez konjestif kalp yetersizliğinde veya hacim fazlalığına bağlı pulmoner ödemde yararlı olabilir; fakat bu vakada temel patofizyoloji intraperikardiyal basınç artışı nedeniyle sağ kalp dolumunun azalmasıdır. Agresif diürez preloadu düşürerek kardiyak outputu daha da azaltabilir ve şoku ağırlaştırabilir. Akciğerde yaygın ral veya belirgin hacim fazlalığı yerine juguler ven dolgunluğu, dar nabız basıncı ve ekokardiyografik çökme bulguları ön plandadır. Bu nedenle furosemid ilk basamak değildir.",
        "Elektif koroner anjiyografi randevusu verilerek taburculuk": "Koroner anjiyografi akut koroner sendrom şüphesinde veya yüksek riskli iskemik bulgularda gündeme gelir. Bu hastanın ağrısı ve dispnesiyle birlikte dolaşım bulguları, EKG’de yaygın düşük voltaj ve ekokardiyografide perikardiyal sıvı/dolum bozukluğu vardır; taburculuk veya elektif randevu güvenli değildir. Koroner değerlendirme daha sonra gerekebilir; ancak ilk olarak yaşamı tehdit eden mekanik dolum kısıtlılığı giderilmelidir. Elektif yaklaşım hemodinamik riski gözden kaçırır."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v288",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V287 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v288-new-630-makat-cevresinde-agri-ve-akinti",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Makat çevresinde ağrı ve akıntı",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Kronik inflamatuvar bağırsak hastalığı öyküsüne akut perianal apse bulguları eklendiğinde önce kaynak kontrolü yapılması gerektiğini ayırt etme.",
      "learningTarget": "Fistülizan Crohn hastalığında apsenin drenajı ve seton yaklaşımının biyolojik tedavi öncesindeki önemini kavrama.",
      "demographics": "29 yaşında erkek hasta",
      "setting": "Gastroenteroloji konsültasyonu",
      "chiefComplaint": "Hasta, makat çevresinde artan ağrı, ateş ve akıntı nedeniyle acil servisten gastroenterolojiye danışılıyor.",
      "stem": "Hasta altı aydır aralıklı karın krampları ve günde birkaç kez sulu dışkılama yaşadığını, son iki ayda pantolonlarının bol gelmeye başladığını anlatır. Bir haftadır makat çevresinde oturmakla artan zonklayıcı ağrı başlamış, son iki gündür iç çamaşırında kötü kokulu akıntı fark etmiştir. Tuvalet sonrası belirgin kanama olmadığını ama dışkılama sırasında yanma ve baskı hissettiğini söyler. Ailesinde inflamatuvar bağırsak hastalığı olan bir kuzeni vardır; yakın zamanda antibiyotik kullanmadığını ve deniz ürünü sonrası başlayan ani kusma yaşamadığını belirtir. Ağrı nedeniyle gece uyuyamayınca acile başvurmuştur.",
      "patientIntro": {
        "profile": "29 yaşında erkek hasta, gastroenteroloji konsültasyonu başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, makat çevresinde artan ağrı, ateş ve akıntı nedeniyle acil servisten gastroenterolojiye danışılıyor.",
        "historySummary": "Hasta altı aydır aralıklı karın krampları ve günde birkaç kez sulu dışkılama yaşadığını, son iki ayda pantolonlarının bol gelmeye başladığını anlatır. Bir haftadır makat çevresinde oturmakla artan zonklayıcı ağrı başlamış, son iki gündür iç çamaşırında kötü kokulu akıntı fark etmiştir. Tuvalet sonrası belirgin kanama olmadığını ama dışkılama sırasında yanma ve baskı hissettiğini söyler. Ailesinde inflamatuvar bağırsak hastalığı olan bir kuzeni vardır; yakın zamanda antibiyotik kullanmadığını ve deniz ürünü sonrası başlayan ani kusma yaşamadığını belirtir. Ağrı nedeniyle gece uyuyamayınca acile başvurmuştur."
      },
      "vitals": {
        "TA": "108/68 mmHg",
        "Nabız": "112/dk",
        "Solunum": "20/dk",
        "SpO2": "%98, oda havasında",
        "Ateş": "38.4 °C",
        "Şok indeksi": "1.04; mukozalar hafif kuru, kapiller dolum yaklaşık 2-3 saniye"
      },
      "exam": [
        "Perianal bölgede saat 7 hizasında hassas, kızarık ve fluktuasyon veren şişlik izleniyor.",
        "Aynı bölgede az miktarda pürülan akıntılı dış ağız görülüyor.",
        "Karında sağ alt kadranda hafif hassasiyet var; rebound veya defans yok.",
        "Oral aft benzeri küçük ülserler izleniyor."
      ],
      "investigations": [
        {
          "id": "v288-new-630-makat-cevresinde-agri-ve-akinti-inflamasyon",
          "label": "Tam kan ve inflamasyon belirteçleri",
          "title": "Tam kan ve inflamasyon belirteçleri",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Tam kan ve inflamasyon belirteçleri",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Sistemik inflamasyon ve enfekte koleksiyonla uyumlu belirteç yüksekliği vardır.",
          "clinicalMeaning": "Sistemik inflamasyon ve enfekte koleksiyonla uyumlu belirteç yüksekliği vardır.",
          "result": {
            "title": "Tam kan ve inflamasyon belirteçleri",
            "summary": "Sistemik inflamasyon ve enfekte koleksiyonla uyumlu belirteç yüksekliği vardır.",
            "interpretation": "Sistemik inflamasyon ve enfekte koleksiyonla uyumlu belirteç yüksekliği vardır.",
            "values": [
              [
                "Lökosit",
                "15.600/µL",
                "4.000-10.000/µL",
                "Yüksek"
              ],
              [
                "CRP",
                "96 mg/L",
                "<5 mg/L",
                "Yüksek"
              ],
              [
                "Hemoglobin",
                "10.9 g/dL",
                "13.5-17.5 g/dL",
                "Düşük"
              ],
              [
                "Albumin",
                "3.1 g/dL",
                "3.5-5.0 g/dL",
                "Düşük"
              ]
            ],
            "rows": [
              [
                "Lökosit",
                "15.600/µL",
                "4.000-10.000/µL",
                "Yüksek"
              ],
              [
                "CRP",
                "96 mg/L",
                "<5 mg/L",
                "Yüksek"
              ],
              [
                "Hemoglobin",
                "10.9 g/dL",
                "13.5-17.5 g/dL",
                "Düşük"
              ],
              [
                "Albumin",
                "3.1 g/dL",
                "3.5-5.0 g/dL",
                "Düşük"
              ]
            ]
          }
        },
        {
          "id": "v288-new-630-makat-cevresinde-agri-ve-akinti-mr-pelvis",
          "label": "Pelvik MR",
          "title": "Pelvik MR",
          "type": "radiology",
          "priority": "essential",
          "subtype": "Pelvik MR",
          "category": "radiology",
          "testTypeCategory": "radiology",
          "summary": "Perianal bölgede fistül traktı ile ilişkili sıvı koleksiyonu izlenir.",
          "clinicalMeaning": "Perianal bölgede fistül traktı ile ilişkili sıvı koleksiyonu izlenir.",
          "result": {
            "title": "Pelvik MR",
            "summary": "Perianal bölgede fistül traktı ile ilişkili sıvı koleksiyonu izlenir.",
            "interpretation": "Perianal bölgede fistül traktı ile ilişkili sıvı koleksiyonu izlenir.",
            "values": [
              [
                "İntersfinkterik koleksiyon",
                "2.8 x 1.6 cm",
                "Yok",
                "Mevcut"
              ],
              [
                "Fistül traktı",
                "Saat 7 hizasından cilde uzanıyor",
                "Yok",
                "Mevcut"
              ],
              [
                "Derin pelvik apse",
                "Saptanmadı",
                "Yok",
                "Yok"
              ],
              [
                "Rektal duvar kalınlaşması",
                "Hafif",
                "Yok",
                "Eşlik ediyor"
              ]
            ],
            "rows": [
              [
                "İntersfinkterik koleksiyon",
                "2.8 x 1.6 cm",
                "Yok",
                "Mevcut"
              ],
              [
                "Fistül traktı",
                "Saat 7 hizasından cilde uzanıyor",
                "Yok",
                "Mevcut"
              ],
              [
                "Derin pelvik apse",
                "Saptanmadı",
                "Yok",
                "Yok"
              ],
              [
                "Rektal duvar kalınlaşması",
                "Hafif",
                "Yok",
                "Eşlik ediyor"
              ]
            ]
          }
        },
        {
          "id": "v288-new-630-makat-cevresinde-agri-ve-akinti-diski-ve-demir",
          "label": "Dışkı ve beslenme/inflamasyon verileri",
          "title": "Dışkı ve beslenme/inflamasyon verileri",
          "type": "laboratory",
          "priority": "important",
          "subtype": "Dışkı ve beslenme/inflamasyon verileri",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Kronik inflamatuvar süreç ve demir eksikliğiyle uyumlu destekleyici bulgular vardır.",
          "clinicalMeaning": "Kronik inflamatuvar süreç ve demir eksikliğiyle uyumlu destekleyici bulgular vardır.",
          "result": {
            "title": "Dışkı ve beslenme/inflamasyon verileri",
            "summary": "Kronik inflamatuvar süreç ve demir eksikliğiyle uyumlu destekleyici bulgular vardır.",
            "interpretation": "Kronik inflamatuvar süreç ve demir eksikliğiyle uyumlu destekleyici bulgular vardır.",
            "values": [
              [
                "Fekal kalprotektin",
                "780 µg/g",
                "<50 µg/g",
                "Yüksek"
              ],
              [
                "Ferritin",
                "18 ng/mL",
                "30-400 ng/mL",
                "Düşük"
              ],
              [
                "Transferrin satürasyonu",
                "%9",
                "%20-50",
                "Düşük"
              ],
              [
                "Dışkı C. difficile toksini",
                "Negatif",
                "Negatif",
                "Negatif"
              ]
            ],
            "rows": [
              [
                "Fekal kalprotektin",
                "780 µg/g",
                "<50 µg/g",
                "Yüksek"
              ],
              [
                "Ferritin",
                "18 ng/mL",
                "30-400 ng/mL",
                "Düşük"
              ],
              [
                "Transferrin satürasyonu",
                "%9",
                "%20-50",
                "Düşük"
              ],
              [
                "Dışkı C. difficile toksini",
                "Negatif",
                "Negatif",
                "Negatif"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada ilk yönetim açısından en uygun yaklaşım aşağıdakilerden hangisidir?",
      "questionType": "management",
      "answerTarget": "Perianal Crohn acil yönetimi",
      "diagnosis": {
        "correct": "Perianal apsenin cerrahi drenajı ve seton değerlendirmesi sonrası ileri tedavi planlanması",
        "options": [
          "Sadece oral mesalazin başlanarak poliklinikte takip edilmesi",
          "Yüksek doz loperamid başlanarak ishali baskılama",
          "Kolonoskopi hazırlığı verilip apsenin gerilemesini bekleme",
          "Perianal apsenin cerrahi drenajı ve seton değerlendirmesi sonrası ileri tedavi planlanması",
          "Tek doz albendazol verilip dışkı parazit sonucu bekleme"
        ],
        "question": "Bu hastada ilk yönetim açısından en uygun yaklaşım aşağıdakilerden hangisidir?",
        "explanation": "Perianal ağrı, ateş, pürülan akıntı, fluktuasyon ve MR’da koleksiyon varlığı fistülize Crohn zemininde perianal apseyi gösterir. İleri immünmodülatör veya biyolojik tedavi düşünülse bile önce enfekte koleksiyonun drenajı ve uygun cerrahi değerlendirme gerekir.",
        "pearls": [
          "Perianal Crohn hastalığında apse varsa önce drenaj gerekir.",
          "Seton drenajı fistül traktında sürekli boşalımı sağlayarak medikal tedavinin etkinliğini artırabilir.",
          "Aktif apse varken yalnız biyolojik/immünsüpresif tedavi başlamak güvenli değildir."
        ],
        "optionFeedback": {
          "Sadece oral mesalazin başlanarak poliklinikte takip edilmesi": "Mesalazin hafif ülseratif kolit gibi bazı yüzeyel inflamatuvar bağırsak hastalığı fenotiplerinde kullanılabilir; ancak fistülize/perianal Crohn hastalığında tek başına yeterli değildir. Bu vakada makatta şiddetli ağrı, ateş, perianal şişlik ve MR pelviste koleksiyon vardır. Aktif apse varken yalnız antiinflamatuvar tablet başlanması kaynak kontrolünü sağlamaz ve sepsise ilerleme riskini artırır. Mesalazin, bu tablo için doğru ilk basamak değildir.",
          "Yüksek doz loperamid başlanarak ishali baskılama": "Loperamid fonksiyonel diyare veya seçilmiş inflamasyon dışı ishal tablolarında semptom azaltabilir; ancak aktif inflamasyon ve perianal enfeksiyon bulguları olan hastada risklidir. İshalin baskılanması ateş, karın ağrısı ve enfekte koleksiyon problemini çözmez. Ayrıca sistemik bulgusu olan inflamatuvar bağırsak hastalığında motiliteyi azaltmak toksik komplikasyon riskini artırabilir. Bu seçeneğin doğru olabilmesi için ateşsiz, enfeksiyon bulgusu olmayan, hafif semptomlu ve organik alarm bulgusu dışlanmış bir tablo gerekir.",
          "Kolonoskopi hazırlığı verilip apsenin gerilemesini bekleme": "Kolonoskopi Crohn hastalığının luminal tutulumunu değerlendirmede önemlidir; ancak ağrılı perianal apse ve ateş varken yalnız elektif kolonoskopi hazırlığıyla beklemek bu vaka için doğru klinik hedef değildir. Öncelik enfekte koleksiyonun boşaltılması ve sepsis riskinin azaltılmasıdır. Ayrıca kolonoskopi hazırlığı akut ağrılı, ateşli ve dehidratasyon riski olan hastada toleransı bozabilir. Luminal hastalık değerlendirmesi kaynak kontrolü ve klinik stabilizasyon sonrası planlanmalıdır.",
          "Perianal apsenin cerrahi drenajı ve seton değerlendirmesi sonrası ileri tedavi planlanması": "Bu seçenek en uygundur. Crohn ile uyumlu kronik ishal-kilo kaybı öyküsüne perianal ağrı, akıntı, ateş ve görüntülemede koleksiyon eşlik etmektedir. Perianal apse varlığında önce cerrahi drenaj ve fistül traktının uygun şekilde değerlendirilmesi gerekir; gerekirse seton drenajı ile sürekli boşalım sağlanır. Biyolojik tedavi veya immünsüpresif tedavi planlanacaksa kontrolsüz apse önce boşaltılmalıdır, çünkü yalnız medikal tedavi kapalı enfekte alanı sterilize etmeyebilir. TUS açısından perianal Crohn + fluktuasyon/apse = önce drenaj ve cerrahi-gastroenteroloji birlikte yönetimi bilgisidir.",
          "Tek doz albendazol verilip dışkı parazit sonucu bekleme": "Paraziter enfeksiyonlar kronik ishalin ayırıcı tanısında yer alabilir; ancak bu vakada perianal apse, fistül ağzı, yüksek CRP ve MR pelvis bulguları paraziter enfeksiyonla açıklanamaz. Tek doz albendazol, perianal koleksiyonu boşaltmaz ve Crohn ilişkili fistülize hastalığın tedavisi değildir. Dışkı testleri bazı olgularda eş zamanlı yapılabilir; fakat klinik aciliyet kaynak kontrolüdür. Bu seçenek gerçekçi ayırıcıyı yanlış önceliklendirir."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Fistülizan Crohn’da enfekte koleksiyon varlığı tedavi önceliğini değiştirir; önce kaynak kontrolü yapılmalıdır.",
      "examPearl": "Perianal ağrı + ateş + fluktuasyon + MR’da koleksiyon: mesalazin veya biyolojik bekleme değil drenaj/seton değerlendirmesi.",
      "whyCorrect": "Bu hastada kronik luminal hastalık verileri vardır; ancak akut karar perianal apsenin boşaltılmasıdır.",
      "optionComparison": "Semptom baskılama, elektif kolonoskopi, parazit tedavisi veya yalnız 5-ASA kaynak kontrolü sağlamaz.",
      "evidenceChain": [
        "Kronik ishal ve kilo kaybı → inflamatuvar bağırsak hastalığı zemini.",
        "Perianal fluktuasyon ve pürülan akıntı → lokal enfekte koleksiyon.",
        "Ateş, lökositoz ve CRP yüksekliği → sistemik inflamasyon.",
        "MR’da fistül traktı ve koleksiyon → cerrahi drenaj gerektiren anatomik bulgu.",
        "C. difficile negatifliği → antibiyotik ilişkili kolit ana açıklama değil."
      ],
      "whyWrong": {
        "Sadece oral mesalazin başlanarak poliklinikte takip edilmesi": "Mesalazin hafif ülseratif kolit gibi bazı yüzeyel inflamatuvar bağırsak hastalığı fenotiplerinde kullanılabilir; ancak fistülize/perianal Crohn hastalığında tek başına yeterli değildir. Bu vakada makatta şiddetli ağrı, ateş, perianal şişlik ve MR pelviste koleksiyon vardır. Aktif apse varken yalnız antiinflamatuvar tablet başlanması kaynak kontrolünü sağlamaz ve sepsise ilerleme riskini artırır. Mesalazin, bu tablo için doğru ilk basamak değildir.",
        "Yüksek doz loperamid başlanarak ishali baskılama": "Loperamid fonksiyonel diyare veya seçilmiş inflamasyon dışı ishal tablolarında semptom azaltabilir; ancak aktif inflamasyon ve perianal enfeksiyon bulguları olan hastada risklidir. İshalin baskılanması ateş, karın ağrısı ve enfekte koleksiyon problemini çözmez. Ayrıca sistemik bulgusu olan inflamatuvar bağırsak hastalığında motiliteyi azaltmak toksik komplikasyon riskini artırabilir. Bu seçeneğin doğru olabilmesi için ateşsiz, enfeksiyon bulgusu olmayan, hafif semptomlu ve organik alarm bulgusu dışlanmış bir tablo gerekir.",
        "Kolonoskopi hazırlığı verilip apsenin gerilemesini bekleme": "Kolonoskopi Crohn hastalığının luminal tutulumunu değerlendirmede önemlidir; ancak ağrılı perianal apse ve ateş varken yalnız elektif kolonoskopi hazırlığıyla beklemek bu vaka için doğru klinik hedef değildir. Öncelik enfekte koleksiyonun boşaltılması ve sepsis riskinin azaltılmasıdır. Ayrıca kolonoskopi hazırlığı akut ağrılı, ateşli ve dehidratasyon riski olan hastada toleransı bozabilir. Luminal hastalık değerlendirmesi kaynak kontrolü ve klinik stabilizasyon sonrası planlanmalıdır.",
        "Tek doz albendazol verilip dışkı parazit sonucu bekleme": "Paraziter enfeksiyonlar kronik ishalin ayırıcı tanısında yer alabilir; ancak bu vakada perianal apse, fistül ağzı, yüksek CRP ve MR pelvis bulguları paraziter enfeksiyonla açıklanamaz. Tek doz albendazol, perianal koleksiyonu boşaltmaz ve Crohn ilişkili fistülize hastalığın tedavisi değildir. Dışkı testleri bazı olgularda eş zamanlı yapılabilir; fakat klinik aciliyet kaynak kontrolüdür. Bu seçenek gerçekçi ayırıcıyı yanlış önceliklendirir."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v288",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V287 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v288-new-631-tekrarlayan-akciger-odemi-ve-direnc-tansiyon",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Tekrarlayan akciğer ödemi ve dirençli tansiyon",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Dirençli hipertansiyon ve flash pulmoner ödem paterninde renovasküler hastalık için ileri değerlendirme ve seçilmiş revaskülarizasyon kararını tanıma.",
      "learningTarget": "Renal perfüzyon azalmasının RAAS aktivasyonu, ACEi sonrası GFR düşüşü ve ani pulmoner ödem ile ilişkisini açıklama.",
      "demographics": "68 yaşında erkek hasta",
      "setting": "Nefroloji-kardiyoloji ortak değerlendirmesi",
      "chiefComplaint": "Hasta, kısa aralıklarla tekrarlayan nefes darlığı atakları ve kontrol edilemeyen tansiyon nedeniyle servise yatırılıyor.",
      "stem": "Hasta son iki ayda iki kez gece aniden nefessiz kalarak acile geldiğini, her seferinde oksijen ve damar yolundan verilen ilaçlarla rahatladığını anlatır. Evde tansiyonunun çoğu gün 180 mmHg üzerinde seyrettiğini, üç farklı ilacı düzenli kullanmasına rağmen ölçümlerin düşmediğini söyler. On gün önce başlanan yeni tansiyon ilacından sonra idrar miktarında hafif azalma ve halsizlik fark etmiştir. Göğüs ağrısı tariflemez; bacaklarında günler içinde yavaş yavaş artan yaygın ödemden çok, ani nefes darlığı atakları olduğunu belirtir. Uzun yıllardır sigara içmiş, periferik damar hastalığı nedeniyle daha önce bacak damarına stent takılmıştır.",
      "patientIntro": {
        "profile": "68 yaşında erkek hasta, nefroloji-kardiyoloji ortak değerlendirmesi başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, kısa aralıklarla tekrarlayan nefes darlığı atakları ve kontrol edilemeyen tansiyon nedeniyle servise yatırılıyor.",
        "historySummary": "Hasta son iki ayda iki kez gece aniden nefessiz kalarak acile geldiğini, her seferinde oksijen ve damar yolundan verilen ilaçlarla rahatladığını anlatır. Evde tansiyonunun çoğu gün 180 mmHg üzerinde seyrettiğini, üç farklı ilacı düzenli kullanmasına rağmen ölçümlerin düşmediğini söyler. On gün önce başlanan yeni tansiyon ilacından sonra idrar miktarında hafif azalma ve halsizlik fark etmiştir. Göğüs ağrısı tariflemez; bacaklarında günler içinde yavaş yavaş artan yaygın ödemden çok, ani nefes darlığı atakları olduğunu belirtir. Uzun yıllardır sigara içmiş, periferik damar hastalığı nedeniyle daha önce bacak damarına stent takılmıştır."
      },
      "vitals": {
        "TA": "188/96 mmHg",
        "Nabız": "104/dk",
        "Solunum": "24/dk",
        "SpO2": "%91, oda havasında; %96, oksijenle",
        "Ateş": "36.8 °C",
        "Şok indeksi": "0.55; ekstremiteler ılık, fakat solunum sıkıntısı belirgin"
      },
      "exam": [
        "Karında epigastriuma yakın bölgede sistolik üfürüm duyuluyor.",
        "Akciğer bazallerinde ince raller var; belirgin ateş veya pürülan balgam yok.",
        "Periferik nabızlar alt ekstremitelerde zayıf palpe ediliyor.",
        "Juguler ven dolgunluğu hafif; pretibial ödem 1+ düzeyinde."
      ],
      "investigations": [
        {
          "id": "v288-new-631-tekrarlayan-akciger-odemi-ve-direnc-tansiyon-renal-fonksiyon",
          "label": "Böbrek fonksiyonu ve ilaç sonrası değişim",
          "title": "Böbrek fonksiyonu ve ilaç sonrası değişim",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Böbrek fonksiyonu ve ilaç sonrası değişim",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Renin-anjiyotensin blokajı sonrası böbrek fonksiyonunda belirgin bozulma gelişmiştir.",
          "clinicalMeaning": "Renin-anjiyotensin blokajı sonrası böbrek fonksiyonunda belirgin bozulma gelişmiştir.",
          "result": {
            "title": "Böbrek fonksiyonu ve ilaç sonrası değişim",
            "summary": "Renin-anjiyotensin blokajı sonrası böbrek fonksiyonunda belirgin bozulma gelişmiştir.",
            "interpretation": "Renin-anjiyotensin blokajı sonrası böbrek fonksiyonunda belirgin bozulma gelişmiştir.",
            "values": [
              [
                "Bazal kreatinin",
                "1.2 mg/dL",
                "0.7-1.2 mg/dL",
                "Üst sınır"
              ],
              [
                "10 gün sonraki kreatinin",
                "1.8 mg/dL",
                "0.7-1.2 mg/dL",
                "Yüksek"
              ],
              [
                "eGFR",
                "38 mL/dk/1.73 m²",
                ">90",
                "Düşük"
              ],
              [
                "Potasyum",
                "4.7 mmol/L",
                "3.5-5.1 mmol/L",
                "Normal-yüksek"
              ]
            ],
            "rows": [
              [
                "Bazal kreatinin",
                "1.2 mg/dL",
                "0.7-1.2 mg/dL",
                "Üst sınır"
              ],
              [
                "10 gün sonraki kreatinin",
                "1.8 mg/dL",
                "0.7-1.2 mg/dL",
                "Yüksek"
              ],
              [
                "eGFR",
                "38 mL/dk/1.73 m²",
                ">90",
                "Düşük"
              ],
              [
                "Potasyum",
                "4.7 mmol/L",
                "3.5-5.1 mmol/L",
                "Normal-yüksek"
              ]
            ]
          }
        },
        {
          "id": "v288-new-631-tekrarlayan-akciger-odemi-ve-direnc-tansiyon-kardiyopulmoner",
          "label": "Akciğer grafisi ve kardiyak belirteçler",
          "title": "Akciğer grafisi ve kardiyak belirteçler",
          "type": "radiology",
          "priority": "important",
          "subtype": "Akciğer grafisi ve kardiyak belirteçler",
          "category": "radiology",
          "testTypeCategory": "radiology",
          "summary": "Ani hacim-basınç yüklenmesiyle uyumlu konjesyon vardır; akut transmural iskemi desteklenmiyor.",
          "clinicalMeaning": "Ani hacim-basınç yüklenmesiyle uyumlu konjesyon vardır; akut transmural iskemi desteklenmiyor.",
          "result": {
            "title": "Akciğer grafisi ve kardiyak belirteçler",
            "summary": "Ani hacim-basınç yüklenmesiyle uyumlu konjesyon vardır; akut transmural iskemi desteklenmiyor.",
            "interpretation": "Ani hacim-basınç yüklenmesiyle uyumlu konjesyon vardır; akut transmural iskemi desteklenmiyor.",
            "values": [
              [
                "Akciğer grafisi",
                "Bilateral perihiler konjesyon çizgileri",
                "Yok",
                "Mevcut"
              ],
              [
                "NT-proBNP",
                "1840 pg/mL",
                "<125 pg/mL",
                "Yüksek"
              ],
              [
                "hs-troponin I",
                "18 ng/L",
                "<14 ng/L",
                "Hafif yüksek"
              ],
              [
                "EKG",
                "Sol ventrikül hipertrofisi, ST elevasyonu yok",
                "ST elevasyonu yok",
                "Kronik basınç yükü"
              ]
            ],
            "rows": [
              [
                "Akciğer grafisi",
                "Bilateral perihiler konjesyon çizgileri",
                "Yok",
                "Mevcut"
              ],
              [
                "NT-proBNP",
                "1840 pg/mL",
                "<125 pg/mL",
                "Yüksek"
              ],
              [
                "hs-troponin I",
                "18 ng/L",
                "<14 ng/L",
                "Hafif yüksek"
              ],
              [
                "EKG",
                "Sol ventrikül hipertrofisi, ST elevasyonu yok",
                "ST elevasyonu yok",
                "Kronik basınç yükü"
              ]
            ]
          }
        },
        {
          "id": "v288-new-631-tekrarlayan-akciger-odemi-ve-direnc-tansiyon-renal-arter-doppler",
          "label": "Renal arter Doppler ultrasonografi",
          "title": "Renal arter Doppler ultrasonografi",
          "type": "vascular",
          "priority": "essential",
          "subtype": "Renal arter Doppler ultrasonografi",
          "category": "vascular",
          "testTypeCategory": "vascular",
          "summary": "Her iki renal arterde akım hızları belirgin artmıştır ve distal dalga formu gecikmiştir.",
          "clinicalMeaning": "Her iki renal arterde akım hızları belirgin artmıştır ve distal dalga formu gecikmiştir.",
          "result": {
            "title": "Renal arter Doppler ultrasonografi",
            "summary": "Her iki renal arterde akım hızları belirgin artmıştır ve distal dalga formu gecikmiştir.",
            "interpretation": "Her iki renal arterde akım hızları belirgin artmıştır ve distal dalga formu gecikmiştir.",
            "values": [
              [
                "Sağ renal arter pik sistolik hız",
                "330 cm/sn",
                "<180 cm/sn",
                "Yüksek"
              ],
              [
                "Sol renal arter pik sistolik hız",
                "310 cm/sn",
                "<180 cm/sn",
                "Yüksek"
              ],
              [
                "Renal-aortik hız oranı",
                "4.2",
                "<3.5",
                "Yüksek"
              ],
              [
                "İntrarenal tardus-parvus dalga",
                "Bilateral mevcut",
                "Yok",
                "Destekleyici"
              ]
            ],
            "rows": [
              [
                "Sağ renal arter pik sistolik hız",
                "330 cm/sn",
                "<180 cm/sn",
                "Yüksek"
              ],
              [
                "Sol renal arter pik sistolik hız",
                "310 cm/sn",
                "<180 cm/sn",
                "Yüksek"
              ],
              [
                "Renal-aortik hız oranı",
                "4.2",
                "<3.5",
                "Yüksek"
              ],
              [
                "İntrarenal tardus-parvus dalga",
                "Bilateral mevcut",
                "Yok",
                "Destekleyici"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada altta yatan süreci hedefleyen en uygun yaklaşım aşağıdakilerden hangisidir?",
      "questionType": "management",
      "answerTarget": "Renovasküler hastalık yönetimi",
      "diagnosis": {
        "correct": "Renovasküler hastalık için görüntüleme ve seçilmiş olguda revaskülarizasyon değerlendirmesi",
        "options": [
          "ACE inhibitörü dozunu artırıp kreatinin yükselmesini göz ardı etme",
          "Sadece tuzsuz diyet önerip altı ay sonra kontrol planlama",
          "Renovasküler hastalık için görüntüleme ve seçilmiş olguda revaskülarizasyon değerlendirmesi",
          "Primer aldosteronizm varmış gibi spironolakton monoterapisine geçme",
          "Feokromositoma krizini dışlamadan beta bloker monoterapisi başlama"
        ],
        "question": "Bu hastada altta yatan süreci hedefleyen en uygun yaklaşım aşağıdakilerden hangisidir?",
        "explanation": "Dirençli hipertansiyon, aterosklerotik damar hastalığı öyküsü, abdominal üfürüm, ACE inhibitörü sonrası kreatinin artışı ve tekrarlayan ani pulmoner konjesyon atakları yüksek riskli renovasküler hastalık fenotipini oluşturur. Bu durumda yalnız ilaç artırmak yerine renal arter anatomisi değerlendirilir ve seçilmiş olguda revaskülarizasyon gündeme alınır.",
        "pearls": [
          "ACEi/ARB sonrası kreatinin belirgin artışı bilateral renal arter darlığını düşündürebilir.",
          "Tekrarlayan flash pulmoner ödem yüksek riskli renovasküler hastalık fenotipidir.",
          "Revaskülarizasyon herkes için değil; seçilmiş klinik sendromlarda düşünülür."
        ],
        "optionFeedback": {
          "ACE inhibitörü dozunu artırıp kreatinin yükselmesini göz ardı etme": "ACE inhibitörleri birçok hipertansiyon ve proteinürik böbrek hastalığında yararlıdır; ancak bilateral renal arter darlığı veya tek fonksiyonel böbrek arter darlığında glomerüler filtrasyonu belirgin düşürebilir. Bu hastada ACE inhibitörü sonrası kreatininin %40’tan fazla artması, dirençli hipertansiyon ve tekrarlayan ani pulmoner ödem atakları renovasküler süreci destekler. Dozu artırmak böbrek perfüzyonunu daha da bozabilir. ACEi/ARB kullanımı tamamen yasak değildir; fakat bu klinik tabloda önce altta yatan renovasküler anatomi değerlendirilmelidir.",
          "Sadece tuzsuz diyet önerip altı ay sonra kontrol planlama": "Tuz kısıtlaması dirençli hipertansiyon ve kalp-böbrek hastalıklarında yardımcı olabilir; fakat burada tek başına ve altı ay bekleme şeklinde yaklaşım yetersizdir. Hasta kısa aralıklarla pulmoner ödem atağı geçirmiş, böbrek fonksiyonu ilaç sonrası bozulmuş ve abdominal üfürüm duyulmuştur. Bu bulgular yüksek riskli renovasküler fenotip düşündürür ve hızlı değerlendirme gerektirir. Yaşam tarzı önerisi destekleyici olabilir ama kararın merkezinde değildir.",
          "Renovasküler hastalık için görüntüleme ve seçilmiş olguda revaskülarizasyon değerlendirmesi": "Bu seçenek en uygundur. Dirençli hipertansiyon, abdominal üfürüm, iki kez ani akciğer ödemi atağı ve ACE inhibitörü başlandıktan sonra kreatininde belirgin artış renovasküler hipertansiyon/aterosklerotik renal arter darlığı açısından yüksek riskli bir paterndir. Bu durumda renal arter Doppler, BT/MR anjiyografi veya uygun görüntüleme ile anatomi değerlendirilir. Özellikle tekrarlayan flash pulmoner ödem, hızla bozulan böbrek fonksiyonu veya bilateral ciddi darlık kuşkusu olan olgularda revaskülarizasyon seçeneği nefroloji-kardiyoloji-girişimsel ekip tarafından tartışılır. TUS mantığında dirençli HT + ACEi sonrası kreatinin artışı + akciğer ödemi atakları renovasküler değerlendirmeyi seçtirir.",
          "Primer aldosteronizm varmış gibi spironolakton monoterapisine geçme": "Spironolakton primer aldosteronizmde ve dirençli hipertansiyonda etkili olabilir; ancak bu vakada hipokalemi baskın değildir ve plazma aldosteron-renin paternini destekleyen veri verilmemiştir. Ayrıca kreatinin yükselmişken mineralokortikoid reseptör antagonisti hiperkalemi riskini artırabilir. Primer aldosteronizm genellikle dirençli hipertansiyon ve hipokalemiyle gelir; flash pulmoner ödem ve ACEi sonrası belirgin kreatinin artışı renovasküler hastalık lehine daha ayırt edicidir. Bu seçenek olası bir başka nedeni tedavi ederken ana paterni kaçırır.",
          "Feokromositoma krizini dışlamadan beta bloker monoterapisi başlama": "Beta bloker monoterapisi çarpıntılı hipertansif ataklarda veya belirli kardiyak endikasyonlarda kullanılabilir; fakat feokromositomada alfa blokajsız beta blokaj hipertansiyonu kötüleştirebilir. Bu vakada paroksismal baş ağrısı-terleme-çarpıntı atağı verilmemiş, aksine abdominal üfürüm ve ACE inhibitörü sonrası böbrek fonksiyon bozulması vardır. Beta bloker tek başına renal arter darlığına bağlı basınç ve hacim dalgalanmalarını çözmez. Bu seçenek hem hedef dışı hem de bazı ayırıcı durumlarda riskli olabilir."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Renovasküler hipertansiyonda renal perfüzyon azalması RAAS aktivasyonunu artırır; bilateral ciddi darlıkta RAAS blokajı GFR’yi düşürebilir.",
      "examPearl": "Dirençli HT + abdominal üfürüm + ACEi sonrası kreatinin artışı + flash pulmoner ödem: renal arter darlığını araştır.",
      "whyCorrect": "Bu hastada ana problem yalnız esansiyel hipertansiyon değil, böbrek perfüzyonuna bağlı kardiyorenal dalgalanmadır.",
      "optionComparison": "Tuz kısıtlaması, ilaç artırma, spironolakton veya beta bloker bazı hastalarda yararlı olabilir; bu paternde önce renovasküler anatomi ve risk değerlendirilmelidir.",
      "evidenceChain": [
        "Üç ilaçla TA yüksekliği → dirençli hipertansiyon.",
        "ACEi sonrası kreatinin 1.2’den 1.8 mg/dL’ye yükselmesi → efferent arteriol bağımlı GFR azalması kuşkusu.",
        "Tekrarlayan ani pulmoner konjesyon → yüksek riskli renovasküler fenotip.",
        "Abdominal üfürüm ve periferik damar hastalığı → aterosklerotik damar yatağı desteği.",
        "Doppler hızlarının bilateral yüksek olması → anatomik darlık olasılığını güçlendirir."
      ],
      "whyWrong": {
        "ACE inhibitörü dozunu artırıp kreatinin yükselmesini göz ardı etme": "ACE inhibitörleri birçok hipertansiyon ve proteinürik böbrek hastalığında yararlıdır; ancak bilateral renal arter darlığı veya tek fonksiyonel böbrek arter darlığında glomerüler filtrasyonu belirgin düşürebilir. Bu hastada ACE inhibitörü sonrası kreatininin %40’tan fazla artması, dirençli hipertansiyon ve tekrarlayan ani pulmoner ödem atakları renovasküler süreci destekler. Dozu artırmak böbrek perfüzyonunu daha da bozabilir. ACEi/ARB kullanımı tamamen yasak değildir; fakat bu klinik tabloda önce altta yatan renovasküler anatomi değerlendirilmelidir.",
        "Sadece tuzsuz diyet önerip altı ay sonra kontrol planlama": "Tuz kısıtlaması dirençli hipertansiyon ve kalp-böbrek hastalıklarında yardımcı olabilir; fakat burada tek başına ve altı ay bekleme şeklinde yaklaşım yetersizdir. Hasta kısa aralıklarla pulmoner ödem atağı geçirmiş, böbrek fonksiyonu ilaç sonrası bozulmuş ve abdominal üfürüm duyulmuştur. Bu bulgular yüksek riskli renovasküler fenotip düşündürür ve hızlı değerlendirme gerektirir. Yaşam tarzı önerisi destekleyici olabilir ama kararın merkezinde değildir.",
        "Primer aldosteronizm varmış gibi spironolakton monoterapisine geçme": "Spironolakton primer aldosteronizmde ve dirençli hipertansiyonda etkili olabilir; ancak bu vakada hipokalemi baskın değildir ve plazma aldosteron-renin paternini destekleyen veri verilmemiştir. Ayrıca kreatinin yükselmişken mineralokortikoid reseptör antagonisti hiperkalemi riskini artırabilir. Primer aldosteronizm genellikle dirençli hipertansiyon ve hipokalemiyle gelir; flash pulmoner ödem ve ACEi sonrası belirgin kreatinin artışı renovasküler hastalık lehine daha ayırt edicidir. Bu seçenek olası bir başka nedeni tedavi ederken ana paterni kaçırır.",
        "Feokromositoma krizini dışlamadan beta bloker monoterapisi başlama": "Beta bloker monoterapisi çarpıntılı hipertansif ataklarda veya belirli kardiyak endikasyonlarda kullanılabilir; fakat feokromositomada alfa blokajsız beta blokaj hipertansiyonu kötüleştirebilir. Bu vakada paroksismal baş ağrısı-terleme-çarpıntı atağı verilmemiş, aksine abdominal üfürüm ve ACE inhibitörü sonrası böbrek fonksiyon bozulması vardır. Beta bloker tek başına renal arter darlığına bağlı basınç ve hacim dalgalanmalarını çözmez. Bu seçenek hem hedef dışı hem de bazı ayırıcı durumlarda riskli olabilir."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v288",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V287 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v288-new-632-susuzluk-kabizlik-ve-bilinclilikte-azalma",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Susuzluk, kabızlık ve bilinçlilikte azalma",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Ağır semptomatik hiperkalsemide mekanizmayı PTH/PTHrP verileriyle ayırıp acil sıvı-kalsitonin-antiresorptif tedavi kombinasyonunu seçme.",
      "learningTarget": "Malignite ilişkili hiperkalsemide dehidratasyon, böbrek etkilenimi, kısa QT ve hızlı/kalıcı tedavi basamaklarını kavrama.",
      "demographics": "64 yaşında erkek hasta",
      "setting": "Acil servis",
      "chiefComplaint": "Hasta, son günlerde artan halsizlik, kabızlık ve dalgınlık nedeniyle ailesi tarafından acile getiriliyor.",
      "stem": "Hasta son iki haftadır sürekli susadığını, geceleri birkaç kez idrara kalktığını ve üç gündür dışkılayamadığını anlatır. Ailesi son günlerde sorulara geç yanıt verdiğini, yemek yemeyi unuttuğunu ve evin içinde dengesiz yürüdüğünü fark etmiştir. Üç aydır devam eden öksürüğü ve istemsiz kilo kaybı vardır; son günlerde göğüs ağrısı veya kanlı balgam tariflemez. Daha önce böbrek taşı düşürmediğini, kalsiyum-D vitamini desteği kullanmadığını ve yeni tiroid ilacı almadığını belirtir. Dalgınlığı belirginleşince yakınları ambulans çağırmıştır.",
      "patientIntro": {
        "profile": "64 yaşında erkek hasta, acil servis başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, son günlerde artan halsizlik, kabızlık ve dalgınlık nedeniyle ailesi tarafından acile getiriliyor.",
        "historySummary": "Hasta son iki haftadır sürekli susadığını, geceleri birkaç kez idrara kalktığını ve üç gündür dışkılayamadığını anlatır. Ailesi son günlerde sorulara geç yanıt verdiğini, yemek yemeyi unuttuğunu ve evin içinde dengesiz yürüdüğünü fark etmiştir. Üç aydır devam eden öksürüğü ve istemsiz kilo kaybı vardır; son günlerde göğüs ağrısı veya kanlı balgam tariflemez. Daha önce böbrek taşı düşürmediğini, kalsiyum-D vitamini desteği kullanmadığını ve yeni tiroid ilacı almadığını belirtir. Dalgınlığı belirginleşince yakınları ambulans çağırmıştır."
      },
      "vitals": {
        "TA": "104/66 mmHg",
        "Nabız": "112/dk",
        "Solunum": "20/dk",
        "SpO2": "%95, oda havasında",
        "Ateş": "36.7 °C",
        "Şok indeksi": "1.08; mukozalar kuru, kapiller dolum 3 saniye"
      },
      "exam": [
        "Hasta uykuya eğilimli ama uyaranla gözlerini açıp kısa yanıt verebiliyor.",
        "Mukozalar belirgin kuru; cilt turgoru azalmış.",
        "Akciğer sağ üst zonda solunum sesleri hafif azalmış duyuluyor.",
        "Fokal nörolojik defisit veya ense sertliği saptanmıyor."
      ],
      "investigations": [
        {
          "id": "v288-new-632-susuzluk-kabizlik-ve-bilinclilikte-azalma-kalsiyum-paneli",
          "label": "Kalsiyum-fosfor ve böbrek paneli",
          "title": "Kalsiyum-fosfor ve böbrek paneli",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Kalsiyum-fosfor ve böbrek paneli",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Ağır hiperkalsemiye böbrek fonksiyon bozulması ve hacim açığı eşlik eder.",
          "clinicalMeaning": "Ağır hiperkalsemiye böbrek fonksiyon bozulması ve hacim açığı eşlik eder.",
          "result": {
            "title": "Kalsiyum-fosfor ve böbrek paneli",
            "summary": "Ağır hiperkalsemiye böbrek fonksiyon bozulması ve hacim açığı eşlik eder.",
            "interpretation": "Ağır hiperkalsemiye böbrek fonksiyon bozulması ve hacim açığı eşlik eder.",
            "values": [
              [
                "Total kalsiyum",
                "15.4 mg/dL",
                "8.5-10.5 mg/dL",
                "Çok yüksek"
              ],
              [
                "Albumin",
                "3.0 g/dL",
                "3.5-5.0 g/dL",
                "Düşük"
              ],
              [
                "Düzeltilmiş kalsiyum",
                "16.2 mg/dL",
                "8.5-10.5 mg/dL",
                "Çok yüksek"
              ],
              [
                "Kreatinin",
                "1.8 mg/dL",
                "0.7-1.2 mg/dL",
                "Yüksek"
              ],
              [
                "Fosfor",
                "2.1 mg/dL",
                "2.5-4.5 mg/dL",
                "Düşük"
              ]
            ],
            "rows": [
              [
                "Total kalsiyum",
                "15.4 mg/dL",
                "8.5-10.5 mg/dL",
                "Çok yüksek"
              ],
              [
                "Albumin",
                "3.0 g/dL",
                "3.5-5.0 g/dL",
                "Düşük"
              ],
              [
                "Düzeltilmiş kalsiyum",
                "16.2 mg/dL",
                "8.5-10.5 mg/dL",
                "Çok yüksek"
              ],
              [
                "Kreatinin",
                "1.8 mg/dL",
                "0.7-1.2 mg/dL",
                "Yüksek"
              ],
              [
                "Fosfor",
                "2.1 mg/dL",
                "2.5-4.5 mg/dL",
                "Düşük"
              ]
            ]
          }
        },
        {
          "id": "v288-new-632-susuzluk-kabizlik-ve-bilinclilikte-azalma-hormon-paneli",
          "label": "PTH ilişkili değerlendirme",
          "title": "PTH ilişkili değerlendirme",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "PTH ilişkili değerlendirme",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Kalsiyum yüksekliğine rağmen paratiroid hormon baskılanmıştır; paratiroid dışı mekanizma desteklenir.",
          "clinicalMeaning": "Kalsiyum yüksekliğine rağmen paratiroid hormon baskılanmıştır; paratiroid dışı mekanizma desteklenir.",
          "result": {
            "title": "PTH ilişkili değerlendirme",
            "summary": "Kalsiyum yüksekliğine rağmen paratiroid hormon baskılanmıştır; paratiroid dışı mekanizma desteklenir.",
            "interpretation": "Kalsiyum yüksekliğine rağmen paratiroid hormon baskılanmıştır; paratiroid dışı mekanizma desteklenir.",
            "values": [
              [
                "PTH",
                "6 pg/mL",
                "15-65 pg/mL",
                "Düşük"
              ],
              [
                "PTHrP",
                "8.4 pmol/L",
                "<2.0 pmol/L",
                "Yüksek"
              ],
              [
                "25-OH D vitamini",
                "24 ng/mL",
                "20-50 ng/mL",
                "Alt-normal"
              ],
              [
                "1,25-(OH)2 D",
                "28 pg/mL",
                "18-72 pg/mL",
                "Normal"
              ]
            ],
            "rows": [
              [
                "PTH",
                "6 pg/mL",
                "15-65 pg/mL",
                "Düşük"
              ],
              [
                "PTHrP",
                "8.4 pmol/L",
                "<2.0 pmol/L",
                "Yüksek"
              ],
              [
                "25-OH D vitamini",
                "24 ng/mL",
                "20-50 ng/mL",
                "Alt-normal"
              ],
              [
                "1,25-(OH)2 D",
                "28 pg/mL",
                "18-72 pg/mL",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v288-new-632-susuzluk-kabizlik-ve-bilinclilikte-azalma-ekg-ve-goruntuleme",
          "label": "EKG ve toraks görüntüleme",
          "title": "EKG ve toraks görüntüleme",
          "type": "cardiology",
          "priority": "important",
          "subtype": "EKG ve toraks görüntüleme",
          "category": "cardiology",
          "testTypeCategory": "cardiology",
          "summary": "Kalsiyum yüksekliğine bağlı repolarizasyon değişikliği ve akciğer kitlesi vardır.",
          "clinicalMeaning": "Kalsiyum yüksekliğine bağlı repolarizasyon değişikliği ve akciğer kitlesi vardır.",
          "result": {
            "title": "EKG ve toraks görüntüleme",
            "summary": "Kalsiyum yüksekliğine bağlı repolarizasyon değişikliği ve akciğer kitlesi vardır.",
            "interpretation": "Kalsiyum yüksekliğine bağlı repolarizasyon değişikliği ve akciğer kitlesi vardır.",
            "values": [
              [
                "QTc",
                "330 ms",
                "350-450 ms",
                "Kısa"
              ],
              [
                "Ritim",
                "Sinüs taşikardisi",
                "60-100/dk",
                "Yüksek"
              ],
              [
                "Toraks BT",
                "Sağ üst lobda 4.8 cm santral kitle",
                "Yok",
                "Kitle"
              ],
              [
                "Kemik metastaz bulgusu",
                "Torasik vertebrada litik odaklar",
                "Yok",
                "Mevcut"
              ]
            ],
            "rows": [
              [
                "QTc",
                "330 ms",
                "350-450 ms",
                "Kısa"
              ],
              [
                "Ritim",
                "Sinüs taşikardisi",
                "60-100/dk",
                "Yüksek"
              ],
              [
                "Toraks BT",
                "Sağ üst lobda 4.8 cm santral kitle",
                "Yok",
                "Kitle"
              ],
              [
                "Kemik metastaz bulgusu",
                "Torasik vertebrada litik odaklar",
                "Yok",
                "Mevcut"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada acil metabolik yönetimde en uygun başlangıç yaklaşımı aşağıdakilerden hangisidir?",
      "questionType": "management",
      "answerTarget": "Ağır hiperkalsemi tedavisi",
      "diagnosis": {
        "correct": "İzotonik sıvı desteğiyle birlikte kalsitonin ve intravenöz antiresorptif tedavi başlanması",
        "options": [
          "İzotonik sıvı desteğiyle birlikte kalsitonin ve intravenöz antiresorptif tedavi başlanması",
          "Kalsiyum karbonat ve D vitamini verilerek kemik ağrısını azaltma",
          "Sadece furosemid infüzyonu verip sıvı kısıtlaması yapma",
          "Acil paratiroidektomiye hazırlık için cerrahi konsültasyon isteme",
          "Oral fosfat bağlayıcı başlanarak ayaktan kontrol planlama"
        ],
        "question": "Bu hastada acil metabolik yönetimde en uygun başlangıç yaklaşımı aşağıdakilerden hangisidir?",
        "explanation": "Düzeltilmiş kalsiyumun 16.2 mg/dL olması, bilinç değişikliği, dehidratasyon, kısa QT ve PTH baskılanmasına karşın PTHrP yüksekliği ağır malignite ilişkili hiperkalsemi paternini oluşturur. Tedavi acildir: izotonik sıvı ile volüm restorasyonu, hızlı geçici etki için kalsitonin ve kalıcı etki için intravenöz antiresorptif tedavi gerekir.",
        "pearls": [
          "Ağır semptomatik hiperkalsemi hastanede acil tedavi gerektirir.",
          "Kalsitonin hızlı etki eder ama taşifilaksi nedeniyle kısa süre kullanılır.",
          "Bisfosfonat/denosumab daha geç başlar fakat daha kalıcı kalsiyum düşüşü sağlar."
        ],
        "optionFeedback": {
          "İzotonik sıvı desteğiyle birlikte kalsitonin ve intravenöz antiresorptif tedavi başlanması": "Bu seçenek en uygundur. Hastada susuzluk, kabızlık, konfüzyon, kısa QT ve düzeltilmiş kalsiyumun 15 mg/dL üzerinde olması ağır semptomatik hiperkalsemi düzeyini gösterir. İlk yaklaşım intravasküler volümü düzeltmek için izotonik sıvı verilmesi, hızlı ama geçici etki için kalsitonin eklenmesi ve daha kalıcı etki için intravenöz bisfosfonat ya da uygun durumda denosumab gibi antiresorptif tedavi başlanmasıdır. PTH baskılı ve PTHrP yüksek olduğundan paratiroid kaynaklı değil malignite ilişkili humoral mekanizma ön plandadır. TUS açısından Ca >14 mg/dL + nörolojik belirti = acil sıvı + kalsitonin + antiresorptif kombinasyonu düşünülür.",
          "Kalsiyum karbonat ve D vitamini verilerek kemik ağrısını azaltma": "Kalsiyum karbonat ve D vitamini osteoporoz veya hipokalsemi bağlamında kullanılabilir; ancak bu hastada serum kalsiyumu tehlikeli derecede yüksektir. Ek kalsiyum ve D vitamini verilmesi hiperkalsemiyi ağırlaştırabilir, böbrek fonksiyonunu bozabilir ve aritmi riskini artırabilir. Kemik ağrısı olsa bile laboratuvar tablosu önce kalsiyumu düşürmeyi gerektirir. Bu seçenek ancak kalsiyum düşüklüğü veya eksiklik tedavisi bağlamında doğru olurdu.",
          "Sadece furosemid infüzyonu verip sıvı kısıtlaması yapma": "Loop diüretikler geçmişte hiperkalsemi yönetiminde kullanılmış olsa da sıvı açığı düzeltilmeden furosemid verilmesi dehidratasyonu ve böbrek hasarını artırabilir. Bu vakada mukozalar kuru, üre/kreatinin yükselmiş ve idrar konsantrasyonu artmıştır; yani ilk gereksinim hacim restorasyonudur. Furosemid ancak yeterli hidrasyon sonrası belirgin hacim yüklenmesi gelişirse dikkatli düşünülebilir. Sadece diürez ve sıvı kısıtlaması ağır hiperkalsemide doğru başlangıç değildir.",
          "Acil paratiroidektomiye hazırlık için cerrahi konsültasyon isteme": "Acil paratiroidektomi primer hiperparatiroidiye bağlı belirli krizlerde gündeme gelebilir; fakat bu vakada PTH baskılıdır. PTHrP yüksekliği, akciğer kitlesi ve düzeltilmiş kalsiyumun çok yüksek olması malignite ilişkili humoral hiperkalsemi lehinedir. Cerrahi paratiroid yaklaşımı bu mekanizmayı hedeflemez. Öncelik kalsiyumun acil medikal düşürülmesi ve altta yatan malignitenin onkolojik değerlendirilmesidir.",
          "Oral fosfat bağlayıcı başlanarak ayaktan kontrol planlama": "Fosfat bağlayıcılar kronik böbrek hastalığında hiperfosfatemi yönetiminde kullanılır; ağır hiperkalseminin akut tedavisi değildir. Bu hastanın fosforu düşük-normal, kalsiyumu çok yüksek ve bilinç değişikliği vardır; ayaktan beklemek güvenli değildir. Oral tedavi yavaş ve hedef dışıdır. Ağır semptomatik hiperkalsemi hastanede izlem ve hızlı medikal müdahale gerektirir."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Malignite ilişkili hiperkalsemide PTH baskılıdır; PTHrP veya kemik metastazı üzerinden osteoklast aktivitesi ve renal kalsiyum geri emilimi artabilir.",
      "examPearl": "Ca >14 mg/dL + bilinç değişikliği: sıvı + kalsitonin + IV antiresorptif tedavi; kalsiyum vermek veya ayaktan izlem yok.",
      "whyCorrect": "Bu hastada dehidratasyon ve böbrek etkilenimi hiperkalsemiyi daha da sürdürebilir; bu yüzden ilk saatlerde volüm restorasyonu kritik önemdedir.",
      "optionComparison": "Kalsiyum-D vitamini, sıvı kısıtlamalı diürez, paratiroid cerrahisi veya fosfat bağlayıcı bu vakadaki mekanizmayı ve aciliyeti hedeflemez.",
      "evidenceChain": [
        "Susuzluk, poliüri, kabızlık ve dalgınlık → semptomatik hiperkalsemi bulguları.",
        "Düzeltilmiş kalsiyum 16.2 mg/dL → ağır düzey.",
        "PTH düşük, PTHrP yüksek → malignite ilişkili humoral mekanizma.",
        "Kısa QT → kalsiyum yüksekliğinin kardiyak etkisi.",
        "Kreatinin yüksek ve mukozalar kuru → hidrasyon tedavisini öncelikli kılar."
      ],
      "whyWrong": {
        "Kalsiyum karbonat ve D vitamini verilerek kemik ağrısını azaltma": "Kalsiyum karbonat ve D vitamini osteoporoz veya hipokalsemi bağlamında kullanılabilir; ancak bu hastada serum kalsiyumu tehlikeli derecede yüksektir. Ek kalsiyum ve D vitamini verilmesi hiperkalsemiyi ağırlaştırabilir, böbrek fonksiyonunu bozabilir ve aritmi riskini artırabilir. Kemik ağrısı olsa bile laboratuvar tablosu önce kalsiyumu düşürmeyi gerektirir. Bu seçenek ancak kalsiyum düşüklüğü veya eksiklik tedavisi bağlamında doğru olurdu.",
        "Sadece furosemid infüzyonu verip sıvı kısıtlaması yapma": "Loop diüretikler geçmişte hiperkalsemi yönetiminde kullanılmış olsa da sıvı açığı düzeltilmeden furosemid verilmesi dehidratasyonu ve böbrek hasarını artırabilir. Bu vakada mukozalar kuru, üre/kreatinin yükselmiş ve idrar konsantrasyonu artmıştır; yani ilk gereksinim hacim restorasyonudur. Furosemid ancak yeterli hidrasyon sonrası belirgin hacim yüklenmesi gelişirse dikkatli düşünülebilir. Sadece diürez ve sıvı kısıtlaması ağır hiperkalsemide doğru başlangıç değildir.",
        "Acil paratiroidektomiye hazırlık için cerrahi konsültasyon isteme": "Acil paratiroidektomi primer hiperparatiroidiye bağlı belirli krizlerde gündeme gelebilir; fakat bu vakada PTH baskılıdır. PTHrP yüksekliği, akciğer kitlesi ve düzeltilmiş kalsiyumun çok yüksek olması malignite ilişkili humoral hiperkalsemi lehinedir. Cerrahi paratiroid yaklaşımı bu mekanizmayı hedeflemez. Öncelik kalsiyumun acil medikal düşürülmesi ve altta yatan malignitenin onkolojik değerlendirilmesidir.",
        "Oral fosfat bağlayıcı başlanarak ayaktan kontrol planlama": "Fosfat bağlayıcılar kronik böbrek hastalığında hiperfosfatemi yönetiminde kullanılır; ağır hiperkalseminin akut tedavisi değildir. Bu hastanın fosforu düşük-normal, kalsiyumu çok yüksek ve bilinç değişikliği vardır; ayaktan beklemek güvenli değildir. Oral tedavi yavaş ve hedef dışıdır. Ağır semptomatik hiperkalsemi hastanede izlem ve hızlı medikal müdahale gerektirir."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v288",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V287 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v288-new-633-gorme-bulanikligi-ve-burun-kanamasi",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Görme bulanıklığı ve burun kanaması",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "IgM monoklonal gammapatisi olan hastada semptomatik hiperviskoziteyi tanıyıp plazmaferez önceliğini seçme.",
      "learningTarget": "Waldenström makroglobulinemisinde büyük intravasküler IgM yükünün mukozal kanama, görsel bulgu ve nörolojik semptom oluşturma mekanizmasını kavrama.",
      "demographics": "73 yaşında erkek hasta",
      "setting": "Hematoloji acil konsültasyonu",
      "chiefComplaint": "Hasta, görmede bulanıklık, tekrarlayan burun kanaması ve halsizlik nedeniyle acil servisten hematolojiye danışılıyor.",
      "stem": "Hasta son bir aydır yürürken çabuk yorulduğunu ve başında sürekli ağırlık hissettiğini anlatır. Son hafta gazete okurken harflerin dalgalandığını, iki kez de kendiliğinden başlayan burun kanamasının uzun sürdüğünü söyler. Kilo kaybı olduğunu ama dışkısında siyahlık veya idrarında kan fark etmediğini belirtir. Daha önce demir ilacı kullanmamış, kan sulandırıcı almamış ve yakın zamanda travma yaşamamıştır. Bu sabah görme bulanıklığı belirginleşip evin içinde dengesiz yürüyünce kızı tarafından acile getirilmiştir.",
      "patientIntro": {
        "profile": "73 yaşında erkek hasta, hematoloji acil konsültasyonu başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, görmede bulanıklık, tekrarlayan burun kanaması ve halsizlik nedeniyle acil servisten hematolojiye danışılıyor.",
        "historySummary": "Hasta son bir aydır yürürken çabuk yorulduğunu ve başında sürekli ağırlık hissettiğini anlatır. Son hafta gazete okurken harflerin dalgalandığını, iki kez de kendiliğinden başlayan burun kanamasının uzun sürdüğünü söyler. Kilo kaybı olduğunu ama dışkısında siyahlık veya idrarında kan fark etmediğini belirtir. Daha önce demir ilacı kullanmamış, kan sulandırıcı almamış ve yakın zamanda travma yaşamamıştır. Bu sabah görme bulanıklığı belirginleşip evin içinde dengesiz yürüyünce kızı tarafından acile getirilmiştir."
      },
      "vitals": {
        "TA": "132/76 mmHg",
        "Nabız": "96/dk",
        "Solunum": "18/dk",
        "SpO2": "%97, oda havasında",
        "Ateş": "36.9 °C",
        "Şok indeksi": "0.73; periferik perfüzyon korunmuş, ancak hasta sersem görünüyor"
      },
      "exam": [
        "Konjonktivalar soluk; aktif burun kanaması durmuş ancak nazal mukozada pıhtı izleniyor.",
        "Fundoskopide retinal venlerde dolgunluk ve segmental yavaş akım görünümü tarifleniyor.",
        "Servikal belirgin lenfadenopati yok; dalak kot altında 2 cm palpe ediliyor.",
        "Fokal motor defisit yok; hasta baş dönmesi tarifliyor."
      ],
      "investigations": [
        {
          "id": "v288-new-633-gorme-bulanikligi-ve-burun-kanamasi-tam-kan",
          "label": "Tam kan sayımı ve koagülasyon",
          "title": "Tam kan sayımı ve koagülasyon",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Tam kan sayımı ve koagülasyon",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Normositik anemi vardır; trombosit sayısı ağır kanama açıklayacak düzeyde düşük değildir.",
          "clinicalMeaning": "Normositik anemi vardır; trombosit sayısı ağır kanama açıklayacak düzeyde düşük değildir.",
          "result": {
            "title": "Tam kan sayımı ve koagülasyon",
            "summary": "Normositik anemi vardır; trombosit sayısı ağır kanama açıklayacak düzeyde düşük değildir.",
            "interpretation": "Normositik anemi vardır; trombosit sayısı ağır kanama açıklayacak düzeyde düşük değildir.",
            "values": [
              [
                "Hemoglobin",
                "8.7 g/dL",
                "13.5-17.5 g/dL",
                "Düşük"
              ],
              [
                "MCV",
                "91 fL",
                "80-100 fL",
                "Normal"
              ],
              [
                "Lökosit",
                "7.200/µL",
                "4.000-10.000/µL",
                "Normal"
              ],
              [
                "Trombosit",
                "146.000/µL",
                "150.000-400.000/µL",
                "Hafif düşük"
              ],
              [
                "PT/INR",
                "1.1",
                "0.8-1.2",
                "Normal"
              ]
            ],
            "rows": [
              [
                "Hemoglobin",
                "8.7 g/dL",
                "13.5-17.5 g/dL",
                "Düşük"
              ],
              [
                "MCV",
                "91 fL",
                "80-100 fL",
                "Normal"
              ],
              [
                "Lökosit",
                "7.200/µL",
                "4.000-10.000/µL",
                "Normal"
              ],
              [
                "Trombosit",
                "146.000/µL",
                "150.000-400.000/µL",
                "Hafif düşük"
              ],
              [
                "PT/INR",
                "1.1",
                "0.8-1.2",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v288-new-633-gorme-bulanikligi-ve-burun-kanamasi-protein-paneli",
          "label": "Serum protein ve immünglobulin incelemesi",
          "title": "Serum protein ve immünglobulin incelemesi",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Serum protein ve immünglobulin incelemesi",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "IgM ağırlıklı monoklonal protein yükü belirgindir.",
          "clinicalMeaning": "IgM ağırlıklı monoklonal protein yükü belirgindir.",
          "result": {
            "title": "Serum protein ve immünglobulin incelemesi",
            "summary": "IgM ağırlıklı monoklonal protein yükü belirgindir.",
            "interpretation": "IgM ağırlıklı monoklonal protein yükü belirgindir.",
            "values": [
              [
                "Total protein",
                "10.8 g/dL",
                "6.4-8.3 g/dL",
                "Yüksek"
              ],
              [
                "Albumin",
                "3.4 g/dL",
                "3.5-5.0 g/dL",
                "Hafif düşük"
              ],
              [
                "IgM",
                "5.900 mg/dL",
                "40-230 mg/dL",
                "Çok yüksek"
              ],
              [
                "Serum immünfiksasyon",
                "IgM kappa monoklonal bant",
                "Negatif",
                "Pozitif"
              ]
            ],
            "rows": [
              [
                "Total protein",
                "10.8 g/dL",
                "6.4-8.3 g/dL",
                "Yüksek"
              ],
              [
                "Albumin",
                "3.4 g/dL",
                "3.5-5.0 g/dL",
                "Hafif düşük"
              ],
              [
                "IgM",
                "5.900 mg/dL",
                "40-230 mg/dL",
                "Çok yüksek"
              ],
              [
                "Serum immünfiksasyon",
                "IgM kappa monoklonal bant",
                "Negatif",
                "Pozitif"
              ]
            ]
          }
        },
        {
          "id": "v288-new-633-gorme-bulanikligi-ve-burun-kanamasi-viskozite-ve-kemik-iligi",
          "label": "Viskozite ve kemik iliği verileri",
          "title": "Viskozite ve kemik iliği verileri",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Viskozite ve kemik iliği verileri",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Serum viskozitesi semptom oluşturabilecek aralıktadır ve lenfoplazmasitik infiltrasyonla uyumludur.",
          "clinicalMeaning": "Serum viskozitesi semptom oluşturabilecek aralıktadır ve lenfoplazmasitik infiltrasyonla uyumludur.",
          "result": {
            "title": "Viskozite ve kemik iliği verileri",
            "summary": "Serum viskozitesi semptom oluşturabilecek aralıktadır ve lenfoplazmasitik infiltrasyonla uyumludur.",
            "interpretation": "Serum viskozitesi semptom oluşturabilecek aralıktadır ve lenfoplazmasitik infiltrasyonla uyumludur.",
            "values": [
              [
                "Serum viskozitesi",
                "5.2 cP",
                "1.4-1.8 cP",
                "Yüksek"
              ],
              [
                "Beta-2 mikroglobulin",
                "5.1 mg/L",
                "<2.5 mg/L",
                "Yüksek"
              ],
              [
                "Kemik iliği aspirasyonu",
                "Lenfoplazmasitik infiltrasyon",
                "Yok",
                "Mevcut"
              ],
              [
                "MYD88 L265P",
                "Pozitif",
                "Negatif",
                "Pozitif"
              ]
            ],
            "rows": [
              [
                "Serum viskozitesi",
                "5.2 cP",
                "1.4-1.8 cP",
                "Yüksek"
              ],
              [
                "Beta-2 mikroglobulin",
                "5.1 mg/L",
                "<2.5 mg/L",
                "Yüksek"
              ],
              [
                "Kemik iliği aspirasyonu",
                "Lenfoplazmasitik infiltrasyon",
                "Yok",
                "Mevcut"
              ],
              [
                "MYD88 L265P",
                "Pozitif",
                "Negatif",
                "Pozitif"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada acil yönetimde öncelikli yaklaşım aşağıdakilerden hangisidir?",
      "questionType": "management",
      "answerTarget": "Hiperviskozite sendromu yönetimi",
      "diagnosis": {
        "correct": "Acil plazmaferez ile viskozitenin düşürülmesi ve ardından sistemik tedavi planlanması",
        "options": [
          "Demir replasmanı ve ayaktan hematoloji kontrolü",
          "Yalnız yüksek doz steroid başlanıp serum proteinleri izlenmesi",
          "Profilaktik trombosit transfüzyonu yapılıp rituksimab infüzyonuna hemen başlanması",
          "Eritrosit süspansiyonu ile hemoglobini hızla 12 g/dL üzerine çıkarma",
          "Acil plazmaferez ile viskozitenin düşürülmesi ve ardından sistemik tedavi planlanması"
        ],
        "question": "Bu hastada acil yönetimde öncelikli yaklaşım aşağıdakilerden hangisidir?",
        "explanation": "IgM çok yüksekliği, serum viskozitesinin artması, görme bulanıklığı, mukozal kanama ve baş dönmesi semptomatik hiperviskoziteyi gösterir. Acil yaklaşım dolaşımdaki IgM yükünü hızla azaltmak için plazmaferezdir; ardından altta yatan klonal hastalık için sistemik tedavi planlanır.",
        "pearls": [
          "IgM büyük ve intravasküler ağırlıklı olduğu için plazmaferez hızlı etkilidir.",
          "Plazmaferez klonu tedavi etmez; sistemik tedavi ayrıca gerekir.",
          "Semptomatik hiperviskozitede transfüzyon ve rituksimab zamanlaması dikkatli yapılmalıdır."
        ],
        "optionFeedback": {
          "Demir replasmanı ve ayaktan hematoloji kontrolü": "Demir replasmanı demir eksikliği anemisinde uygun olabilir; ancak bu hastanın anemisi hiperviskozite bulguları, belirgin IgM yüksekliği ve monoklonal proteinle birlikte değerlendirilmelidir. Ferritin ve MCV verileri demir eksikliğini ana mekanizma olarak desteklemiyor. Görme bulanıklığı, burun kanaması ve retinal venöz dolgunluk acil kan reolojisi sorununu gösterir. Ayaktan beklemek nörolojik veya görsel komplikasyon riskini artırır.",
          "Yalnız yüksek doz steroid başlanıp serum proteinleri izlenmesi": "Steroidler bazı hematolojik/immün süreçlerde kullanılabilir; ancak semptomatik hiperviskoziteyi dakikalar-saatler içinde güvenli şekilde çözmez. Serum IgM düzeyi ve viskozite çok yüksekken temel acil hedef dolaşımdaki büyük IgM moleküllerini hızla uzaklaştırmaktır. Yalnız steroid başlamak kanama, görme ve nörolojik belirtileri yeterince hızlı düzeltmeyebilir. Sistemik tedavi gerekir; fakat acil belirti kontrolünde plazmaferez öne çıkar.",
          "Profilaktik trombosit transfüzyonu yapılıp rituksimab infüzyonuna hemen başlanması": "Trombosit transfüzyonu ciddi trombositopeni veya aktif trombosit kaynaklı kanamada gerekli olabilir; ancak bu hastada trombosit sayısı ağır düşük değildir. Kanama mukozal olabilir fakat temel mekanizma trombosit eksikliğinden çok IgM ilişkili hiperviskozite ve hemostaz bozukluğudur. Rituksimab sistemik tedavide kullanılabilir; ancak bazı olgularda IgM flare ile viskoziteyi geçici artırabileceği için semptomatik hiperviskozite kontrol edilmeden hemen başlamak riskli olabilir. Bu nedenle önce plazmaferez düşünülür.",
          "Eritrosit süspansiyonu ile hemoglobini hızla 12 g/dL üzerine çıkarma": "Eritrosit süspansiyonu belirgin semptomatik anemide gerekebilir; fakat hiperviskozite varken gereksiz veya aşırı transfüzyon kan viskozitesini daha da artırabilir. Bu hastanın esas acil problemi Hb değerini hızla yükseltmekten çok IgM yüküne bağlı dolaşım ve mikrosirkülasyon bozukluğudur. Transfüzyon gerekiyorsa bile hiperviskozite kontrolü ve dikkatli hedeflerle planlanmalıdır. Hemoglobini 12 g/dL üzerine hızlı çıkarmak doğru öncelik değildir.",
          "Acil plazmaferez ile viskozitenin düşürülmesi ve ardından sistemik tedavi planlanması": "Bu seçenek en uygundur. Yaşlı hastada halsizlik, kilo kaybı, burun kanaması, baş ağrısı, görme bulanıklığı, retinal venöz dolgunluk, çok yüksek IgM ve artmış serum viskozitesi Waldenström makroglobulinemisine bağlı semptomatik hiperviskoziteyi düşündürür. IgM intravasküler alanda yoğun bulunduğu için plazmaferez hızlı klinik rahatlama sağlar. Plazmaferez altta yatan klonu ortadan kaldırmaz; bu nedenle semptomlar kontrol altına alınırken uygun sistemik tedavi de planlanır. TUS açısından IgM yüksekliği + hiperviskozite semptomları = önce plazmaferez bilgisidir."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Waldenström makroglobulinemisinde IgM artışı serum viskozitesini yükselterek retinal, nörolojik ve mukozal kanama belirtileri oluşturabilir.",
      "examPearl": "IgM yüksek + görme bulanıklığı/burun kanaması/serum viskozitesi yüksek: önce plazmaferez, sonra sistemik tedavi.",
      "whyCorrect": "Bu hastada trombosit eksikliği veya demir eksikliği değil, monoklonal IgM yüküne bağlı kan akışkanlığı bozukluğu acildir.",
      "optionComparison": "Demir, steroid, trombosit, rituksimab veya eritrosit transfüzyonu tek başına hiperviskoziteyi hızlı ve güvenli biçimde çözmez.",
      "evidenceChain": [
        "Görme bulanıklığı ve retinal venöz dolgunluk → hiperviskoziteye bağlı mikrosirkülasyon bozukluğu.",
        "Burun kanaması → mukozal hemostaz etkilenimi.",
        "IgM 5.900 mg/dL ve monoklonal bant → IgM ilişkili klonal süreç.",
        "Serum viskozitesi 5.2 cP → semptomatik eşiklerle uyumlu yüksek değer.",
        "Trombosit 146.000/µL ve INR normal → kanamayı ağır trombositopeni/koagülopati açıklamıyor."
      ],
      "whyWrong": {
        "Demir replasmanı ve ayaktan hematoloji kontrolü": "Demir replasmanı demir eksikliği anemisinde uygun olabilir; ancak bu hastanın anemisi hiperviskozite bulguları, belirgin IgM yüksekliği ve monoklonal proteinle birlikte değerlendirilmelidir. Ferritin ve MCV verileri demir eksikliğini ana mekanizma olarak desteklemiyor. Görme bulanıklığı, burun kanaması ve retinal venöz dolgunluk acil kan reolojisi sorununu gösterir. Ayaktan beklemek nörolojik veya görsel komplikasyon riskini artırır.",
        "Yalnız yüksek doz steroid başlanıp serum proteinleri izlenmesi": "Steroidler bazı hematolojik/immün süreçlerde kullanılabilir; ancak semptomatik hiperviskoziteyi dakikalar-saatler içinde güvenli şekilde çözmez. Serum IgM düzeyi ve viskozite çok yüksekken temel acil hedef dolaşımdaki büyük IgM moleküllerini hızla uzaklaştırmaktır. Yalnız steroid başlamak kanama, görme ve nörolojik belirtileri yeterince hızlı düzeltmeyebilir. Sistemik tedavi gerekir; fakat acil belirti kontrolünde plazmaferez öne çıkar.",
        "Profilaktik trombosit transfüzyonu yapılıp rituksimab infüzyonuna hemen başlanması": "Trombosit transfüzyonu ciddi trombositopeni veya aktif trombosit kaynaklı kanamada gerekli olabilir; ancak bu hastada trombosit sayısı ağır düşük değildir. Kanama mukozal olabilir fakat temel mekanizma trombosit eksikliğinden çok IgM ilişkili hiperviskozite ve hemostaz bozukluğudur. Rituksimab sistemik tedavide kullanılabilir; ancak bazı olgularda IgM flare ile viskoziteyi geçici artırabileceği için semptomatik hiperviskozite kontrol edilmeden hemen başlamak riskli olabilir. Bu nedenle önce plazmaferez düşünülür.",
        "Eritrosit süspansiyonu ile hemoglobini hızla 12 g/dL üzerine çıkarma": "Eritrosit süspansiyonu belirgin semptomatik anemide gerekebilir; fakat hiperviskozite varken gereksiz veya aşırı transfüzyon kan viskozitesini daha da artırabilir. Bu hastanın esas acil problemi Hb değerini hızla yükseltmekten çok IgM yüküne bağlı dolaşım ve mikrosirkülasyon bozukluğudur. Transfüzyon gerekiyorsa bile hiperviskozite kontrolü ve dikkatli hedeflerle planlanmalıdır. Hemoglobini 12 g/dL üzerine hızlı çıkarmak doğru öncelik değildir."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v288",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V287 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v289-new-634-eforla-gelen-bayilacak-gibi-olma",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Eforla gelen bayılacak gibi olma",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Eforla presenkop ve manevrayla değişen üfürümde dinamik çıkış yolu obstrüksiyonunu tanıyıp semptomatik ilk farmakolojik yaklaşımı seçme.",
      "learningTarget": "Obstrüktif hipertrofik kardiyomiyopatide preload/afterload azaltıcı ilaçların neden sakıncalı olabileceğini ve non-vazodilatör beta-bloker mantığını kavrama.",
      "demographics": "29 yaşında erkek hasta",
      "setting": "Kardiyoloji polikliniği",
      "chiefComplaint": "Hasta, merdiven çıkarken bayılacak gibi olma ve göğüste sıkışma hissi nedeniyle kardiyoloji polikliniğinde değerlendiriliyor.",
      "stem": "Hasta son altı aydır özellikle hızlı merdiven çıktığında göğsünün ortasında baskı ve başında boşalma hissi yaşadığını anlatır. Yakınmaları birkaç dakika dinlenince azalmakta, düz yolda yavaş yürürken belirginleşmemektedir. Son hafta halı saha maçında oyunu bırakmak zorunda kalmış, kısa süre çömelince kendini daha iyi hissettiğini söylemiştir. Babasının 40 yaşından önce uykuda ani kaybedildiğini, kendisinin bilinen hipertansiyon veya koroner hastalık tanısı olmadığını belirtir. Ateş, öksürük, bacak şişliği, uzun yolculuk, travma veya kokain/uyarıcı madde kullanımı tariflemez.",
      "patientIntro": {
        "profile": "29 yaşında erkek hasta, kardiyoloji polikliniği başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, merdiven çıkarken bayılacak gibi olma ve göğüste sıkışma hissi nedeniyle kardiyoloji polikliniğinde değerlendiriliyor.",
        "historySummary": "Hasta son altı aydır özellikle hızlı merdiven çıktığında göğsünün ortasında baskı ve başında boşalma hissi yaşadığını anlatır. Yakınmaları birkaç dakika dinlenince azalmakta, düz yolda yavaş yürürken belirginleşmemektedir. Son hafta halı saha maçında oyunu bırakmak zorunda kalmış, kısa süre çömelince kendini daha iyi hissettiğini söylemiştir. Babasının 40 yaşından önce uykuda ani kaybedildiğini, kendisinin bilinen hipertansiyon veya koroner hastalık tanısı olmadığını belirtir. Ateş, öksürük, bacak şişliği, uzun yolculuk, travma veya kokain/uyarıcı madde kullanımı tariflemez."
      },
      "vitals": {
        "TA": "118/72 mmHg",
        "Nabız": "88/dk",
        "Solunum": "16/dk",
        "SpO2": "%98, oda havasında",
        "Ateş": "36.7 °C",
        "Şok indeksi": "0.75; kapiller dolum <2 sn, istirahatte perfüzyon korunmuş"
      },
      "exam": [
        "Sol sternal kenarda sistolik ejeksiyon üfürümü duyuluyor; üfürüm Valsalva sırasında belirginleşiyor, çömelme ile azalıyor.",
        "Akciğer sesleri doğal, ral yok.",
        "Periferik ödem veya juguler venöz dolgunluk izlenmiyor.",
        "Nörolojik muayene doğal; senkop sonrası travma bulgusu yok."
      ],
      "investigations": [
        {
          "id": "v289-new-634-eforla-gelen-bayilacak-gibi-olma-kardiyak-belirtecler",
          "label": "Kardiyak belirteçler ve temel biyokimya",
          "title": "Kardiyak belirteçler ve temel biyokimya",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Kardiyak belirteçler ve temel biyokimya",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Akut miyokard nekrozunu destekleyen belirgin troponin yükselmesi yoktur.",
          "clinicalMeaning": "Akut miyokard nekrozunu destekleyen belirgin troponin yükselmesi yoktur.",
          "result": {
            "title": "Kardiyak belirteçler ve temel biyokimya",
            "summary": "Akut miyokard nekrozunu destekleyen belirgin troponin yükselmesi yoktur.",
            "interpretation": "Akut miyokard nekrozunu destekleyen belirgin troponin yükselmesi yoktur.",
            "values": [
              [
                "hs-troponin I",
                "8 ng/L",
                "<34 ng/L",
                "Normal"
              ],
              [
                "Kreatinin",
                "0.9 mg/dL",
                "0.7-1.2 mg/dL",
                "Normal"
              ],
              [
                "Potasyum",
                "4.2 mmol/L",
                "3.5-5.1 mmol/L",
                "Normal"
              ]
            ],
            "rows": [
              [
                "hs-troponin I",
                "8 ng/L",
                "<34 ng/L",
                "Normal"
              ],
              [
                "Kreatinin",
                "0.9 mg/dL",
                "0.7-1.2 mg/dL",
                "Normal"
              ],
              [
                "Potasyum",
                "4.2 mmol/L",
                "3.5-5.1 mmol/L",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v289-new-634-eforla-gelen-bayilacak-gibi-olma-ekg",
          "label": "EKG",
          "title": "EKG",
          "type": "cardiology",
          "priority": "important",
          "subtype": "EKG",
          "category": "cardiology",
          "testTypeCategory": "cardiology",
          "summary": "Sol ventrikül hipertrofisi voltaj kriterleri ve repolarizasyon değişiklikleri izleniyor; akut ST elevasyonu yok.",
          "clinicalMeaning": "Sol ventrikül hipertrofisi voltaj kriterleri ve repolarizasyon değişiklikleri izleniyor; akut ST elevasyonu yok.",
          "result": {
            "title": "EKG",
            "summary": "Sol ventrikül hipertrofisi voltaj kriterleri ve repolarizasyon değişiklikleri izleniyor; akut ST elevasyonu yok.",
            "interpretation": "Sol ventrikül hipertrofisi voltaj kriterleri ve repolarizasyon değişiklikleri izleniyor; akut ST elevasyonu yok.",
            "findings": [
              "Sinüs ritmi, hız 86/dk.",
              "V4-V6'da yüksek voltaj ve sekonder ST-T değişikliği.",
              "Akut transmural iskemi lehine ST elevasyonu yok."
            ]
          }
        },
        {
          "id": "v289-new-634-eforla-gelen-bayilacak-gibi-olma-eko",
          "label": "Transtorasik ekokardiyografi",
          "title": "Transtorasik ekokardiyografi",
          "type": "cardiology",
          "priority": "important",
          "subtype": "Transtorasik ekokardiyografi",
          "category": "cardiology",
          "testTypeCategory": "cardiology",
          "summary": "Asimetrik septal hipertrofi ve dinamik çıkış yolu gradiyenti saptanıyor.",
          "clinicalMeaning": "Asimetrik septal hipertrofi ve dinamik çıkış yolu gradiyenti saptanıyor.",
          "result": {
            "title": "Transtorasik ekokardiyografi",
            "summary": "Asimetrik septal hipertrofi ve dinamik çıkış yolu gradiyenti saptanıyor.",
            "interpretation": "Asimetrik septal hipertrofi ve dinamik çıkış yolu gradiyenti saptanıyor.",
            "findings": [
              "İnterventriküler septum 20 mm, posterior duvar 11 mm.",
              "Sistolik anterior mitral hareket mevcut.",
              "İstirahatte LVOT gradiyenti 54 mmHg, provokasyonla 78 mmHg.",
              "Sol ventrikül sistolik fonksiyonu korunmuş."
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada efor semptomlarını azaltmak için en uygun ilk farmakolojik yaklaşım aşağıdakilerden hangisidir?",
      "questionType": "treatment",
      "answerTarget": "Tedavi",
      "diagnosis": {
        "correct": "Non-vazodilatör beta-bloker başlanması ve preload azaltıcı ilaçlardan kaçınılması",
        "options": [
          "Dil altı nitrat ve yüksek doz loop diüretik başlanması",
          "ACE inhibitörü dozunun artırılması ve vazodilatör tedaviye geçilmesi",
          "Non-vazodilatör beta-bloker başlanması ve preload azaltıcı ilaçlardan kaçınılması",
          "Acil trombolitik tedavi verilmesi",
          "Sadece oral sıvı alımının artırılması ve kontrollü izlem yapılması"
        ],
        "question": "Bu hastada efor semptomlarını azaltmak için en uygun ilk farmakolojik yaklaşım aşağıdakilerden hangisidir?",
        "explanation": "Manevrayla değişen sistolik üfürüm, efor presenkopu, ailede erken ani ölüm ve ekokardiyografide SAM ile yüksek LVOT gradiyenti dinamik obstrüksiyon fizyolojisini gösterir. Semptomatik obstrüktif olguda ilk farmakolojik hedef kalp hızını ve kontraktiliteyi azaltmaktır; non-vazodilatör beta-bloker bu nedenle uygundur. Preload/afterload düşüren nitrat, aşırı diüretik veya güçlü vazodilatörler gradiyenti artırabilir.",
        "pearls": [
          "Valsalva ile artan, çömelmeyle azalan üfürüm dinamik obstrüksiyon lehinedir.",
          "Semptomatik obstrüktif hastada ilk farmakolojik yaklaşım genellikle non-vazodilatör beta-blokerdir.",
          "Preload/afterload azaltan ilaçlar obstrüksiyonu kötüleştirebilir."
        ],
        "optionFeedback": {
          "Dil altı nitrat ve yüksek doz loop diüretik başlanması": "Nitrat ve yüksek doz loop diüretik, konjestif kalp yetersizliği veya iskemik göğüs ağrısında bazı hastalarda kullanılabilir; ancak dinamik çıkış yolu obstrüksiyonu olan hastada preload ve afterload azalması gradiyenti artırabilir. Bu hastada eforla presenkop, sistolik üfürümün Valsalva ile artması ve ekokardiyografide belirgin dinamik gradiyent vardır. Böyle bir fizyolojide vazodilatasyon veya aşırı diürez ventrikül kavitesini küçültüp mitral kapağın septuma yaklaşmasını artırabilir. Bu nedenle semptomu azaltmak yerine presenkop/senkop riskini büyütebilir.",
          "ACE inhibitörü dozunun artırılması ve vazodilatör tedaviye geçilmesi": "ACE inhibitörleri hipertansiyon ve bazı kalp yetersizliği fenotiplerinde yararlıdır; fakat burada ana sorun sabit sistemik basınç yüksekliği değil, eforla artan dinamik sol ventrikül çıkış yolu obstrüksiyonudur. Vazodilatör etki afterloadu azaltarak bazı obstrüktif hastalarda gradiyenti belirginleştirebilir. Hastanın üfürümünün Valsalva ile artması ve ekoda SAM ile yüksek gradiyent bulunması, tedavide negatif inotropi ve kalp hızını azaltma hedefini öne çıkarır. Bu yüzden ACE inhibitörü artırımı ilk semptomatik farmakolojik tercih değildir.",
          "Non-vazodilatör beta-bloker başlanması ve preload azaltıcı ilaçlardan kaçınılması": "Bu seçenek en uygundur. Eforla gelen baş dönmesi, ailede ani ölüm öyküsü, Valsalva ile artan sistolik üfürüm ve ekokardiyografide septal hipertrofi-SAM-yüksek LVOT gradiyenti obstrüktif hipertrofik kardiyomiyopati fizyolojisini gösterir. Non-vazodilatör beta-blokerler kalp hızını ve kontraktiliteyi azaltarak dolum süresini uzatır, dinamik obstrüksiyonu ve efor semptomlarını azaltır. Aynı zamanda nitrat, güçlü vazodilatör ve gereksiz diüretik gibi preload/afterload düşüren ilaçlardan kaçınmak gerekir. TUS mantığında manevrayla artan üfürüm + efor presenkopu görüldüğünde tedavi hedefi obstrüksiyonu artırmamak ve negatif inotropi sağlamaktır.",
          "Acil trombolitik tedavi verilmesi": "Trombolitik tedavi STEMI veya uygun seçilmiş akut tromboembolik durumlarda düşünülür; bu hastada troponin normal, EKG’de akut ST elevasyonu yoktur ve klinik ağrıdan çok eforla presenkop ön plandadır. Üfürümün manevrayla değişmesi ve ekokardiyografide dinamik gradiyent bulunması trombotik koroner tıkanmadan farklı bir mekanizmaya işaret eder. Trombolitik vermek gereksiz kanama riski oluşturur ve obstrüksiyonu düzeltmez. Bu yüzden kategori olarak acil reperfüzyon değil, obstrüktif fizyolojiye yönelik semptom kontrolü gerekir.",
          "Sadece oral sıvı alımının artırılması ve kontrollü izlem yapılması": "Dehidratasyondan kaçınmak ve aşırı efordan uzak durmak destekleyici olarak önemlidir; ancak semptomatik hastada tek başına oral sıvı önerisi yeterli değildir. Bu hastada eforla presenkop, belirgin LVOT gradiyenti ve mitral kapak SAM bulgusu vardır; farmakolojik olarak kalp hızını ve kontraktiliteyi azaltan tedavi gerekir. Sadece izlem, özellikle ailede ani ölüm öyküsü ve semptom varlığında eksik yaklaşım olur. Destek önlemleri beta-bloker gibi temel semptom tedavisinin yerine geçmez."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Dinamik LVOT obstrüksiyonunda küçük ventrikül hacmi ve yüksek kontraktilite gradiyenti artırır; tedavi bu fizyolojiyi tersine çevirmeye yönelir.",
      "examPearl": "Valsalva ile artan sistolik üfürüm + efor presenkopu: nitrat/diüretikten kaçın, non-vazodilatör beta-bloker düşün.",
      "whyCorrect": "Ekokardiyografideki yüksek dinamik gradiyent ve SAM bulgusu semptomların mekanizmasını açıklar; beta-bloker bu mekanizmayı hedefler.",
      "optionComparison": "Vazodilatör/diüretik seçenekler gradiyenti artırabilir; trombolitik iskemik/trombotik acil için, yalnız izlem ise semptomatik olguda eksiktir.",
      "evidenceChain": [
        "Eforla presenkop → sabit istirahat yakınmasından çok dinamik hemodinamik bozulma.",
        "Valsalva ile artan üfürüm → hacim azalınca obstrüksiyonun belirginleşmesi.",
        "EKO'da SAM ve LVOT gradiyenti 54-78 mmHg → semptomatik dinamik çıkış yolu obstrüksiyonu.",
        "Troponin normal ve ST elevasyonu yok → akut trombotik MI lehine güçlü veri yok."
      ],
      "whyWrong": {
        "Dil altı nitrat ve yüksek doz loop diüretik başlanması": "Nitrat ve yüksek doz loop diüretik, konjestif kalp yetersizliği veya iskemik göğüs ağrısında bazı hastalarda kullanılabilir; ancak dinamik çıkış yolu obstrüksiyonu olan hastada preload ve afterload azalması gradiyenti artırabilir. Bu hastada eforla presenkop, sistolik üfürümün Valsalva ile artması ve ekokardiyografide belirgin dinamik gradiyent vardır. Böyle bir fizyolojide vazodilatasyon veya aşırı diürez ventrikül kavitesini küçültüp mitral kapağın septuma yaklaşmasını artırabilir. Bu nedenle semptomu azaltmak yerine presenkop/senkop riskini büyütebilir.",
        "ACE inhibitörü dozunun artırılması ve vazodilatör tedaviye geçilmesi": "ACE inhibitörleri hipertansiyon ve bazı kalp yetersizliği fenotiplerinde yararlıdır; fakat burada ana sorun sabit sistemik basınç yüksekliği değil, eforla artan dinamik sol ventrikül çıkış yolu obstrüksiyonudur. Vazodilatör etki afterloadu azaltarak bazı obstrüktif hastalarda gradiyenti belirginleştirebilir. Hastanın üfürümünün Valsalva ile artması ve ekoda SAM ile yüksek gradiyent bulunması, tedavide negatif inotropi ve kalp hızını azaltma hedefini öne çıkarır. Bu yüzden ACE inhibitörü artırımı ilk semptomatik farmakolojik tercih değildir.",
        "Acil trombolitik tedavi verilmesi": "Trombolitik tedavi STEMI veya uygun seçilmiş akut tromboembolik durumlarda düşünülür; bu hastada troponin normal, EKG’de akut ST elevasyonu yoktur ve klinik ağrıdan çok eforla presenkop ön plandadır. Üfürümün manevrayla değişmesi ve ekokardiyografide dinamik gradiyent bulunması trombotik koroner tıkanmadan farklı bir mekanizmaya işaret eder. Trombolitik vermek gereksiz kanama riski oluşturur ve obstrüksiyonu düzeltmez. Bu yüzden kategori olarak acil reperfüzyon değil, obstrüktif fizyolojiye yönelik semptom kontrolü gerekir.",
        "Sadece oral sıvı alımının artırılması ve kontrollü izlem yapılması": "Dehidratasyondan kaçınmak ve aşırı efordan uzak durmak destekleyici olarak önemlidir; ancak semptomatik hastada tek başına oral sıvı önerisi yeterli değildir. Bu hastada eforla presenkop, belirgin LVOT gradiyenti ve mitral kapak SAM bulgusu vardır; farmakolojik olarak kalp hızını ve kontraktiliteyi azaltan tedavi gerekir. Sadece izlem, özellikle ailede ani ölüm öyküsü ve semptom varlığında eksik yaklaşım olur. Destek önlemleri beta-bloker gibi temel semptom tedavisinin yerine geçmez."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v289",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V288 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v289-new-635-titreme-sarilik-ve-ders-basarisinda-dusus",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Titreme, sarılık ve ders başarısında düşüş",
      "difficulty": "Orta-Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Genç hastada karaciğer bozukluğu ve nöropsikiyatrik bulguları bakır metabolizması mekanizmasıyla ilişkilendirme.",
      "learningTarget": "Wilson hastalığında ATP7B bozukluğunun safra yoluyla bakır atılımını azaltarak hepatik ve nörolojik bulgu oluşturduğunu kavrama.",
      "demographics": "18 yaşında erkek hasta",
      "setting": "Gastroenteroloji polikliniği",
      "chiefComplaint": "Hasta, el titremesi, gözlerde sararma ve okul performansında belirgin düşüş nedeniyle ailesiyle birlikte değerlendiriliyor.",
      "stem": "Hasta son dört aydır yazı yazarken elinin titrediğini ve sınıfta not tutmakta zorlandığını anlatır. Annesi, eskiden sakin olan oğlunun son dönemde daha sinirli olduğunu, derslere ilgisinin azaldığını ve birkaç kez konuşmasının peltekleştiğini fark ettiğini söyler. Hasta iki haftadır göz aklarında sararma olduğunu, idrar renginin koyulaştığını ama ateş veya karın sağ üst kısmında şiddetli ağrı yaşamadığını belirtir. Alkol kullanmadığını, düzenli ilaç almadığını ve ailede genç yaşta açıklanamayan karaciğer hastalığı öyküsü bulunduğunu ekler. Dışkıda siyahlık, kanlı kusma veya yakın zamanda mantar/bitkisel ürün tüketimi tariflemez.",
      "patientIntro": {
        "profile": "18 yaşında erkek hasta, gastroenteroloji polikliniği başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, el titremesi, gözlerde sararma ve okul performansında belirgin düşüş nedeniyle ailesiyle birlikte değerlendiriliyor.",
        "historySummary": "Hasta son dört aydır yazı yazarken elinin titrediğini ve sınıfta not tutmakta zorlandığını anlatır. Annesi, eskiden sakin olan oğlunun son dönemde daha sinirli olduğunu, derslere ilgisinin azaldığını ve birkaç kez konuşmasının peltekleştiğini fark ettiğini söyler. Hasta iki haftadır göz aklarında sararma olduğunu, idrar renginin koyulaştığını ama ateş veya karın sağ üst kısmında şiddetli ağrı yaşamadığını belirtir. Alkol kullanmadığını, düzenli ilaç almadığını ve ailede genç yaşta açıklanamayan karaciğer hastalığı öyküsü bulunduğunu ekler. Dışkıda siyahlık, kanlı kusma veya yakın zamanda mantar/bitkisel ürün tüketimi tariflemez."
      },
      "vitals": {
        "TA": "112/68 mmHg",
        "Nabız": "84/dk",
        "Solunum": "16/dk",
        "SpO2": "%98, oda havasında",
        "Ateş": "36.8 °C",
        "Şok indeksi": "0.75; ekstremiteler sıcak, bilinç açık"
      },
      "exam": [
        "Skleralarda ikter mevcut; karında belirgin asit veya defans yok.",
        "Eller öne uzatıldığında ince tremor ve hafif dizartri izleniyor.",
        "Slit-lamp muayenesinde korneal periferde kahverengi-yeşil halka tarifleniyor.",
        "Hepatomegali hafif; dalak kot altında ele gelmiyor."
      ],
      "investigations": [
        {
          "id": "v289-new-635-titreme-sarilik-ve-ders-basarisinda-dusus-karaciger-paneli",
          "label": "Karaciğer paneli",
          "title": "Karaciğer paneli",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Karaciğer paneli",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Hepatoselüler ağırlıklı enzim yüksekliği ve hiperbilirubinemi mevcuttur.",
          "clinicalMeaning": "Hepatoselüler ağırlıklı enzim yüksekliği ve hiperbilirubinemi mevcuttur.",
          "result": {
            "title": "Karaciğer paneli",
            "summary": "Hepatoselüler ağırlıklı enzim yüksekliği ve hiperbilirubinemi mevcuttur.",
            "interpretation": "Hepatoselüler ağırlıklı enzim yüksekliği ve hiperbilirubinemi mevcuttur.",
            "values": [
              [
                "AST",
                "146 U/L",
                "<40 U/L",
                "Yüksek"
              ],
              [
                "ALT",
                "118 U/L",
                "<41 U/L",
                "Yüksek"
              ],
              [
                "Total bilirubin",
                "3.8 mg/dL",
                "0.2-1.2 mg/dL",
                "Yüksek"
              ],
              [
                "INR",
                "1.4",
                "0.8-1.2",
                "Hafif yüksek"
              ],
              [
                "Albumin",
                "3.6 g/dL",
                "3.5-5.2 g/dL",
                "Alt-normal"
              ]
            ],
            "rows": [
              [
                "AST",
                "146 U/L",
                "<40 U/L",
                "Yüksek"
              ],
              [
                "ALT",
                "118 U/L",
                "<41 U/L",
                "Yüksek"
              ],
              [
                "Total bilirubin",
                "3.8 mg/dL",
                "0.2-1.2 mg/dL",
                "Yüksek"
              ],
              [
                "INR",
                "1.4",
                "0.8-1.2",
                "Hafif yüksek"
              ],
              [
                "Albumin",
                "3.6 g/dL",
                "3.5-5.2 g/dL",
                "Alt-normal"
              ]
            ]
          }
        },
        {
          "id": "v289-new-635-titreme-sarilik-ve-ders-basarisinda-dusus-bakir-paneli",
          "label": "Bakır metabolizması testleri",
          "title": "Bakır metabolizması testleri",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Bakır metabolizması testleri",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Seruloplazmin düşüklüğü ve idrar bakır atılımında belirgin artış saptanıyor.",
          "clinicalMeaning": "Seruloplazmin düşüklüğü ve idrar bakır atılımında belirgin artış saptanıyor.",
          "result": {
            "title": "Bakır metabolizması testleri",
            "summary": "Seruloplazmin düşüklüğü ve idrar bakır atılımında belirgin artış saptanıyor.",
            "interpretation": "Seruloplazmin düşüklüğü ve idrar bakır atılımında belirgin artış saptanıyor.",
            "values": [
              [
                "Seruloplazmin",
                "9 mg/dL",
                "20-35 mg/dL",
                "Düşük"
              ],
              [
                "24 saatlik idrar bakırı",
                "184 µg/gün",
                "<40 µg/gün",
                "Yüksek"
              ],
              [
                "Serum bakır",
                "52 µg/dL",
                "70-140 µg/dL",
                "Düşük/bağlı fraksiyon az"
              ],
              [
                "Transferrin satürasyonu",
                "32%",
                "20-45%",
                "Normal"
              ]
            ],
            "rows": [
              [
                "Seruloplazmin",
                "9 mg/dL",
                "20-35 mg/dL",
                "Düşük"
              ],
              [
                "24 saatlik idrar bakırı",
                "184 µg/gün",
                "<40 µg/gün",
                "Yüksek"
              ],
              [
                "Serum bakır",
                "52 µg/dL",
                "70-140 µg/dL",
                "Düşük/bağlı fraksiyon az"
              ],
              [
                "Transferrin satürasyonu",
                "32%",
                "20-45%",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v289-new-635-titreme-sarilik-ve-ders-basarisinda-dusus-viral-seroloji",
          "label": "Viral hepatit serolojisi",
          "title": "Viral hepatit serolojisi",
          "type": "laboratory",
          "priority": "additional",
          "subtype": "Viral hepatit serolojisi",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Kronik hepatit B veya C lehine serolojik kanıt yoktur.",
          "clinicalMeaning": "Kronik hepatit B veya C lehine serolojik kanıt yoktur.",
          "result": {
            "title": "Viral hepatit serolojisi",
            "summary": "Kronik hepatit B veya C lehine serolojik kanıt yoktur.",
            "interpretation": "Kronik hepatit B veya C lehine serolojik kanıt yoktur.",
            "values": [
              [
                "HBsAg",
                "Negatif",
                "Negatif",
                "Normal"
              ],
              [
                "Anti-HCV",
                "Negatif",
                "Negatif",
                "Normal"
              ],
              [
                "Anti-HAV IgM",
                "Negatif",
                "Negatif",
                "Normal"
              ]
            ],
            "rows": [
              [
                "HBsAg",
                "Negatif",
                "Negatif",
                "Normal"
              ],
              [
                "Anti-HCV",
                "Negatif",
                "Negatif",
                "Normal"
              ],
              [
                "Anti-HAV IgM",
                "Negatif",
                "Negatif",
                "Normal"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastadaki klinik ve laboratuvar bulgularını en iyi açıklayan mekanizma aşağıdakilerden hangisidir?",
      "questionType": "mechanism",
      "answerTarget": "Mekanizma",
      "diagnosis": {
        "correct": "ATP7B bozukluğu sonucu bakırın safra ile atılımının azalması ve dokularda birikmesi",
        "options": [
          "Alfa-1 antitripsin proteininin hepatosit içinde yanlış katlanarak birikmesi",
          "HFE ilişkili hepsidin baskılanması sonucu bağırsaktan demir emiliminin artması",
          "Kronik hepatit B'ye bağlı immün aracılı hepatosit hasarı",
          "UGT1A1 aktivitesinin azalmasına bağlı indirekt bilirubin konjugasyon kusuru",
          "ATP7B bozukluğu sonucu bakırın safra ile atılımının azalması ve dokularda birikmesi"
        ],
        "question": "Bu hastadaki klinik ve laboratuvar bulgularını en iyi açıklayan mekanizma aşağıdakilerden hangisidir?",
        "explanation": "Genç yaşta karaciğer disfonksiyonu, nöropsikiyatrik değişiklik, tremor, Kayser-Fleischer halkası, düşük seruloplazmin ve yüksek idrar bakırı Wilson hastalığı mekanizmasını destekler. Temel sorun ATP7B ilişkili bakırın hepatositten safraya atılamaması ve seruloplazmine uygun yüklenememesidir; bakır dokularda birikerek hepatik ve nörolojik bulgular oluşturur.",
        "pearls": [
          "Genç hasta + karaciğer bulgusu + hareket/psikiyatrik değişiklik birlikte bakır metabolizması açısından sorgulanmalıdır.",
          "Seruloplazmin düşük, 24 saatlik idrar bakırı yüksek olduğunda Wilson hastalığı güçlenir.",
          "Kayser-Fleischer halkası nörolojik tutulumla birlikte klasik ayırt ettiricidir."
        ],
        "optionFeedback": {
          "Alfa-1 antitripsin proteininin hepatosit içinde yanlış katlanarak birikmesi": "Alfa-1 antitripsin eksikliğinde yanlış katlanan protein hepatositlerde birikebilir ve karaciğer-akciğer bulguları oluşturabilir; ancak bu seçenek bakır metabolizması bulgularını açıklamaz. Bu hastada genç yaş, davranış değişikliği, tremor, sarılık, düşük seruloplazmin ve çok yüksek 24 saatlik idrar bakırı birlikte değerlendirilmelidir. Alfa-1 antitripsin eksikliğinde Kayser-Fleischer halkası veya belirgin idrar bakır artışı beklenen temel bulgu değildir. Bu yüzden karaciğer hastalığı yapsa da vakadaki nöropsikiyatrik ve bakırla ilişkili örüntüyü karşılamaz.",
          "HFE ilişkili hepsidin baskılanması sonucu bağırsaktan demir emiliminin artması": "HFE ilişkili bozukluk herediter hemokromatoz mekanizmasını anlatır; bağırsaktan demir emilimi artar, transferrin satürasyonu ve ferritin yükselir. Bu olguda transferrin satürasyonu normaldir ve ayırt ettirici veriler düşük seruloplazmin, yüksek idrar bakırı ve nörolojik belirtilerdir. Hemokromatoz daha çok erişkin yaşta karaciğer hastalığı, diyabet, hiperpigmentasyon ve kardiyak tutulumla gündeme gelir. Titreme, okul başarısında düşüş ve korneal halka ile birlikte bakır metabolizması bozukluğu daha uygundur.",
          "Kronik hepatit B'ye bağlı immün aracılı hepatosit hasarı": "Kronik hepatit B immün aracılı hepatosit hasarı yapabilir ve transaminaz yüksekliği oluşturabilir; ancak bu hastada HBV serolojisi kronik enfeksiyon lehine değildir. Ayrıca tremor, davranış değişikliği, Kayser-Fleischer halkası ve idrar bakırı yüksekliği hepatit B mekanizmasıyla açıklanmaz. Viral hepatit seçenekleri sarılığı açıklayabilir gibi görünse de nöropsikiyatrik bulgular ve bakır testleri doğru mekanizmayı ayırt ettirir. Bu nedenle ana süreç viral sitotoksisite değil bakır taşınma/atılım bozukluğudur.",
          "UGT1A1 aktivitesinin azalmasına bağlı indirekt bilirubin konjugasyon kusuru": "UGT1A1 aktivite azalması Gilbert sendromu veya Crigler-Najjar spektrumunda indirekt bilirubin konjugasyon kusurunu ifade eder. Bu durum genellikle nörolojik tremor, düşük seruloplazmin, yüksek idrar bakırı veya korneal halka ile seyretmez. Ayrıca Gilbert sendromunda karaciğer enzimleri çoğunlukla normaldir ve ciddi sistemik tablo beklenmez. Bu hastada bilirubin yüksekliği daha geniş bir hepatik-bakır metabolizması sorununun parçasıdır.",
          "ATP7B bozukluğu sonucu bakırın safra ile atılımının azalması ve dokularda birikmesi": "Bu seçenek en uygundur. Genç hastada okul başarısında düşüş, davranış değişikliği, tremor, sarılık, Kayser-Fleischer halkası, düşük seruloplazmin ve artmış 24 saatlik idrar bakırı Wilson hastalığı mekanizmasını destekler. ATP7B bozukluğu hepatositten safraya bakır atılımını ve seruloplazmine bakır yüklenmesini bozar; bakır karaciğerde ve daha sonra beyin, kornea gibi dokularda birikir. TUS açısından genç hastada karaciğer hastalığı + nöropsikiyatrik bulgu + düşük seruloplazmin/yüksek idrar bakırı birlikteliği bakır atılım bozukluğunu düşündürür."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Wilson hastalığında ATP7B bozukluğu bakırın safra yoluyla atılımını azaltır; biriken bakır karaciğer, beyin ve korneada bulgu verir.",
      "examPearl": "Genç yaşta sarılık + tremor/davranış değişikliği + düşük seruloplazmin/yüksek idrar bakırı: ATP7B ve bakır atılım bozukluğunu düşün.",
      "whyCorrect": "Bakır metabolizması verileri ve nörolojik bulgular tek bir mekanizmada birleştiği için doğru cevap ATP7B ilişkili bakır birikimidir.",
      "optionComparison": "Diğer seçenekler karaciğer hastalığı yapabilse de bakır testleri, korneal halka ve nöropsikiyatrik belirtileri birlikte açıklamaz.",
      "evidenceChain": [
        "El titremesi ve davranış değişikliği → hepatik hastalığa eşlik eden nörolojik/psikiyatrik tutulum.",
        "Korneal halka → dokularda bakır birikimi lehine ayırt ettirici muayene bulgusu.",
        "Seruloplazmin 9 mg/dL → bakır bağlama/taşıma sisteminde belirgin bozulma.",
        "24 saatlik idrar bakırı 184 µg/gün → artmış bakır yükünü destekleyen biyokimyasal veri."
      ],
      "whyWrong": {
        "Alfa-1 antitripsin proteininin hepatosit içinde yanlış katlanarak birikmesi": "Alfa-1 antitripsin eksikliğinde yanlış katlanan protein hepatositlerde birikebilir ve karaciğer-akciğer bulguları oluşturabilir; ancak bu seçenek bakır metabolizması bulgularını açıklamaz. Bu hastada genç yaş, davranış değişikliği, tremor, sarılık, düşük seruloplazmin ve çok yüksek 24 saatlik idrar bakırı birlikte değerlendirilmelidir. Alfa-1 antitripsin eksikliğinde Kayser-Fleischer halkası veya belirgin idrar bakır artışı beklenen temel bulgu değildir. Bu yüzden karaciğer hastalığı yapsa da vakadaki nöropsikiyatrik ve bakırla ilişkili örüntüyü karşılamaz.",
        "HFE ilişkili hepsidin baskılanması sonucu bağırsaktan demir emiliminin artması": "HFE ilişkili bozukluk herediter hemokromatoz mekanizmasını anlatır; bağırsaktan demir emilimi artar, transferrin satürasyonu ve ferritin yükselir. Bu olguda transferrin satürasyonu normaldir ve ayırt ettirici veriler düşük seruloplazmin, yüksek idrar bakırı ve nörolojik belirtilerdir. Hemokromatoz daha çok erişkin yaşta karaciğer hastalığı, diyabet, hiperpigmentasyon ve kardiyak tutulumla gündeme gelir. Titreme, okul başarısında düşüş ve korneal halka ile birlikte bakır metabolizması bozukluğu daha uygundur.",
        "Kronik hepatit B'ye bağlı immün aracılı hepatosit hasarı": "Kronik hepatit B immün aracılı hepatosit hasarı yapabilir ve transaminaz yüksekliği oluşturabilir; ancak bu hastada HBV serolojisi kronik enfeksiyon lehine değildir. Ayrıca tremor, davranış değişikliği, Kayser-Fleischer halkası ve idrar bakırı yüksekliği hepatit B mekanizmasıyla açıklanmaz. Viral hepatit seçenekleri sarılığı açıklayabilir gibi görünse de nöropsikiyatrik bulgular ve bakır testleri doğru mekanizmayı ayırt ettirir. Bu nedenle ana süreç viral sitotoksisite değil bakır taşınma/atılım bozukluğudur.",
        "UGT1A1 aktivitesinin azalmasına bağlı indirekt bilirubin konjugasyon kusuru": "UGT1A1 aktivite azalması Gilbert sendromu veya Crigler-Najjar spektrumunda indirekt bilirubin konjugasyon kusurunu ifade eder. Bu durum genellikle nörolojik tremor, düşük seruloplazmin, yüksek idrar bakırı veya korneal halka ile seyretmez. Ayrıca Gilbert sendromunda karaciğer enzimleri çoğunlukla normaldir ve ciddi sistemik tablo beklenmez. Bu hastada bilirubin yüksekliği daha geniş bir hepatik-bakır metabolizması sorununun parçasıdır."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v289",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V288 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v289-new-636-ayak-bilegi-agrisi-ve-kuru-oksuruk",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Ayak bileği ağrısı ve kuru öksürük",
      "difficulty": "Orta-Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Akut eritema nodosum-artrit-bilateral hiler lenfadenopati paterninde organ tehdidi olmayan sarkoidoz yaklaşımını seçme.",
      "learningTarget": "Sarkoidozda her hastaya agresif immünsüpresyon gerekmediğini; akut iyi prognozlu fenotipte semptom kontrolü ve izlem yapılabileceğini kavrama.",
      "demographics": "34 yaşında kadın hasta",
      "setting": "Göğüs hastalıkları polikliniği",
      "chiefComplaint": "Hasta, iki haftadır süren kuru öksürük, ayak bileklerinde ağrı ve bacak ön yüzünde hassas kızarıklıklar nedeniyle başvuruyor.",
      "stem": "Hasta iki hafta önce hafif kırgınlık ve kuru öksürük başladığını, birkaç gün sonra iki ayak bileğinde yürürken artan ağrı ve şişlik fark ettiğini anlatır. Bacaklarının ön yüzünde dokunmakla acıyan kırmızı kabarıklıklar çıktığını, bu yüzden işe giderken merdiven inip çıkmakta zorlandığını söyler. Balgam, kanlı tükürük, gece terlemesi veya belirgin kilo kaybı tariflemez. Evde tüberküloz tanılı biri olmadığını, son dönemde antibiyotik kullanmadığını ve nefes darlığının yalnız hızlı yürüyünce hafif olduğunu belirtir. Gözde ağrı-kızarıklık, çarpıntı veya bayılma yaşamamıştır.",
      "patientIntro": {
        "profile": "34 yaşında kadın hasta, göğüs hastalıkları polikliniği başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, iki haftadır süren kuru öksürük, ayak bileklerinde ağrı ve bacak ön yüzünde hassas kızarıklıklar nedeniyle başvuruyor.",
        "historySummary": "Hasta iki hafta önce hafif kırgınlık ve kuru öksürük başladığını, birkaç gün sonra iki ayak bileğinde yürürken artan ağrı ve şişlik fark ettiğini anlatır. Bacaklarının ön yüzünde dokunmakla acıyan kırmızı kabarıklıklar çıktığını, bu yüzden işe giderken merdiven inip çıkmakta zorlandığını söyler. Balgam, kanlı tükürük, gece terlemesi veya belirgin kilo kaybı tariflemez. Evde tüberküloz tanılı biri olmadığını, son dönemde antibiyotik kullanmadığını ve nefes darlığının yalnız hızlı yürüyünce hafif olduğunu belirtir. Gözde ağrı-kızarıklık, çarpıntı veya bayılma yaşamamıştır."
      },
      "vitals": {
        "TA": "116/70 mmHg",
        "Nabız": "92/dk",
        "Solunum": "17/dk",
        "SpO2": "%98, oda havasında",
        "Ateş": "37.4 °C",
        "Şok indeksi": "0.79; periferik perfüzyon iyi, toksik görünüm yok"
      },
      "exam": [
        "Her iki pretibial bölgede hassas, eritemli nodüler lezyonlar izleniyor.",
        "Ayak bileklerinde hafif şişlik ve hareketle ağrı var; belirgin pürülan artrit bulgusu yok.",
        "Akciğer oskültasyonunda belirgin ral veya wheezing yok.",
        "Göz muayenesinde belirgin konjonktival kızarıklık veya görme azalması yok."
      ],
      "investigations": [
        {
          "id": "v289-new-636-ayak-bilegi-agrisi-ve-kuru-oksuruk-akciger-grafisi",
          "label": "Akciğer grafisi",
          "title": "Akciğer grafisi",
          "type": "imaging",
          "priority": "important",
          "subtype": "Akciğer grafisi",
          "category": "imaging",
          "testTypeCategory": "imaging",
          "summary": "Bilateral simetrik hiler dolgunluk izleniyor; belirgin lobar konsolidasyon yok.",
          "clinicalMeaning": "Bilateral simetrik hiler dolgunluk izleniyor; belirgin lobar konsolidasyon yok.",
          "result": {
            "title": "Akciğer grafisi",
            "summary": "Bilateral simetrik hiler dolgunluk izleniyor; belirgin lobar konsolidasyon yok.",
            "interpretation": "Bilateral simetrik hiler dolgunluk izleniyor; belirgin lobar konsolidasyon yok.",
            "findings": [
              "Her iki hiler bölgede simetrik lenfadenopati görünümü.",
              "Lobar konsolidasyon veya plevral efüzyon izlenmiyor."
            ]
          }
        },
        {
          "id": "v289-new-636-ayak-bilegi-agrisi-ve-kuru-oksuruk-inflamasyon",
          "label": "Temel laboratuvar ve inflamasyon",
          "title": "Temel laboratuvar ve inflamasyon",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Temel laboratuvar ve inflamasyon",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Hafif inflamatuvar yanıt var; ağır bakteriyel enfeksiyon paterninde değildir.",
          "clinicalMeaning": "Hafif inflamatuvar yanıt var; ağır bakteriyel enfeksiyon paterninde değildir.",
          "result": {
            "title": "Temel laboratuvar ve inflamasyon",
            "summary": "Hafif inflamatuvar yanıt var; ağır bakteriyel enfeksiyon paterninde değildir.",
            "interpretation": "Hafif inflamatuvar yanıt var; ağır bakteriyel enfeksiyon paterninde değildir.",
            "values": [
              [
                "Lökosit",
                "8.900/µL",
                "4.000-10.000/µL",
                "Normal"
              ],
              [
                "CRP",
                "18 mg/L",
                "<5 mg/L",
                "Hafif yüksek"
              ],
              [
                "Kalsiyum",
                "9.9 mg/dL",
                "8.6-10.2 mg/dL",
                "Normal"
              ],
              [
                "ACE",
                "72 U/L",
                "8-52 U/L",
                "Yüksek"
              ]
            ],
            "rows": [
              [
                "Lökosit",
                "8.900/µL",
                "4.000-10.000/µL",
                "Normal"
              ],
              [
                "CRP",
                "18 mg/L",
                "<5 mg/L",
                "Hafif yüksek"
              ],
              [
                "Kalsiyum",
                "9.9 mg/dL",
                "8.6-10.2 mg/dL",
                "Normal"
              ],
              [
                "ACE",
                "72 U/L",
                "8-52 U/L",
                "Yüksek"
              ]
            ]
          }
        },
        {
          "id": "v289-new-636-ayak-bilegi-agrisi-ve-kuru-oksuruk-tb-degerlendirme",
          "label": "Tüberküloz ön değerlendirmesi",
          "title": "Tüberküloz ön değerlendirmesi",
          "type": "laboratory",
          "priority": "additional",
          "subtype": "Tüberküloz ön değerlendirmesi",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Balgam veya mikrobiyolojik olarak aktif tüberkülozu destekleyen veri yok.",
          "clinicalMeaning": "Balgam veya mikrobiyolojik olarak aktif tüberkülozu destekleyen veri yok.",
          "result": {
            "title": "Tüberküloz ön değerlendirmesi",
            "summary": "Balgam veya mikrobiyolojik olarak aktif tüberkülozu destekleyen veri yok.",
            "interpretation": "Balgam veya mikrobiyolojik olarak aktif tüberkülozu destekleyen veri yok.",
            "values": [
              [
                "Balgam ARB yayma",
                "Negatif",
                "Negatif",
                "Normal"
              ],
              [
                "IGRA",
                "Negatif",
                "Negatif",
                "Normal"
              ]
            ],
            "rows": [
              [
                "Balgam ARB yayma",
                "Negatif",
                "Negatif",
                "Normal"
              ],
              [
                "IGRA",
                "Negatif",
                "Negatif",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v289-new-636-ayak-bilegi-agrisi-ve-kuru-oksuruk-sft",
          "label": "Solunum fonksiyon testi",
          "title": "Solunum fonksiyon testi",
          "type": "cardiology",
          "priority": "important",
          "subtype": "Solunum fonksiyon testi",
          "category": "cardiology",
          "testTypeCategory": "cardiology",
          "summary": "Solunum rezervi belirgin bozulmuş değildir.",
          "clinicalMeaning": "Solunum rezervi belirgin bozulmuş değildir.",
          "result": {
            "title": "Solunum fonksiyon testi",
            "summary": "Solunum rezervi belirgin bozulmuş değildir.",
            "interpretation": "Solunum rezervi belirgin bozulmuş değildir.",
            "findings": [
              "FEV1 %92 beklenen.",
              "FVC %95 beklenen.",
              "DLCO %88 beklenen."
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada başlangıç için en uygun yaklaşım aşağıdakilerden hangisidir?",
      "questionType": "management",
      "answerTarget": "Yaklaşım",
      "diagnosis": {
        "correct": "NSAİİ ile semptom kontrolü ve yakın klinik izlem yapılması",
        "options": [
          "Dört ilaçlı tüberküloz tedavisine başlanması",
          "NSAİİ ile semptom kontrolü ve yakın klinik izlem yapılması",
          "Yüksek doz sistemik steroid ve siklofosfamid kombinasyonu başlanması",
          "Acil geniş spektrumlu antibiyotik ve toraks drenajı yapılması",
          "İnhale beta-agonist ve oral antibiyotikle ayaktan bronşit tedavisi verilmesi"
        ],
        "question": "Bu hastada başlangıç için en uygun yaklaşım aşağıdakilerden hangisidir?",
        "explanation": "Eritema nodosum, ayak bileği artriti ve bilateral hiler lenfadenopati, organ tehdidi olmayan akut sarkoidoz fenotipini destekler. Hipoksemi, ciddi parankimal bozulma, kardiyak/nörolojik/göz tutulumu veya ağır sistemik hastalık olmadığı için başlangıçta NSAİİ ile semptom kontrolü ve yakın izlem uygundur.",
        "pearls": [
          "Akut sarkoidoz fenotipinde her zaman sistemik steroid gerekmez.",
          "Organ tehdidi yoksa destek tedavisi ve izlem yeterli olabilir.",
          "Tüberküloz ve lenfoma gibi alternatifler klinik ve temel testlerle dışlanmalıdır."
        ],
        "optionFeedback": {
          "Dört ilaçlı tüberküloz tedavisine başlanması": "Tüberküloz tedavisi kaviter lezyon, mikrobiyolojik kanıt, temas öyküsü veya uyumlu sistemik tablo olduğunda gündeme gelir. Bu hastada ateş yüksekliği hafif, balgam yok, AFB incelemeleri negatif ve grafide bilateral simetrik hiler lenfadenopati vardır. Eritema nodosum ve ayak bileği artritiyle birlikte bu örüntü aktif tüberkülozdan farklıdır. Gereksiz antitüberküloz tedavi toksisite ve direnç açısından sakıncalıdır.",
          "NSAİİ ile semptom kontrolü ve yakın klinik izlem yapılması": "Bu seçenek en uygundur. Genç kadında akut ayak bileği ağrısı/şişliği, eritema nodosum, kuru öksürük ve bilateral hiler lenfadenopati organ tehdidi olmayan akut sarkoidoz fenotipini düşündürür. Solunum fonksiyonu korunmuş, hipoksemi yok, kardiyak-nörolojik-göz tutulumu bulgusu verilmemiştir. Bu durumda başlangıçta NSAİİ ile semptom kontrolü ve yakın izlem yeterli olabilir; sistemik steroid organ tehdidi, progresif akciğer hastalığı veya ağır semptom varlığında düşünülür. TUS açısından Löfgren benzeri tablo genellikle iyi prognozlu ve destek tedavisiyle izlenebilen bir sarkoidoz sunumudur.",
          "Yüksek doz sistemik steroid ve siklofosfamid kombinasyonu başlanması": "Yüksek doz steroid ve siklofosfamid ağır organ tutulumlarında veya belirli vaskülitik/otoimmün acillerde kullanılabilir; bu olguda böyle bir organ tehdidi yoktur. Hipoksemi, ciddi parankimal progresyon, nörosarkoidoz, kardiyak iletim bozukluğu veya görme tehdidi verilmemiştir. Erken dönemde aşırı immünsüpresyon gereksiz enfeksiyon ve metabolik yan etki riskini artırır. Hafif-akut sarkoidoz fenotipinde basamaklı yaklaşım daha uygundur.",
          "Acil geniş spektrumlu antibiyotik ve toraks drenajı yapılması": "Torasik drenaj komplike plevral efüzyon, ampiyem veya pnömotoraks gibi durumlarda gerekir. Bu hastada plevral sıvı, lokülasyon, düşük pH veya ampiyem bulgusu yoktur; radyolojik bulgu simetrik hiler lenfadenopatidir. Geniş spektrumlu antibiyotik de bakteriyel pnömoni veya sepsis kanıtı olmadan ilk yaklaşım olmaz. Bu seçenek başka bir pulmoner enfeksiyon/plevral acil kategorisine aittir.",
          "İnhale beta-agonist ve oral antibiyotikle ayaktan bronşit tedavisi verilmesi": "Bronşit tedavisi öksürük için yüzeysel olarak akla gelebilir; ancak ayak bileği artriti, eritema nodosum ve bilateral hiler lenfadenopati basit bronşitten çok sistemik granülomatöz bir süreci düşündürür. İnhale beta-agonist wheezing/bronkokonstriksiyon baskınsa semptomatik yarar sağlayabilir; burada temel problem obstrüktif hava yolu atağı değildir. Oral antibiyotik de bakteriyel balgamlı enfeksiyon kanıtı olmadan gereksizdir. Bu nedenle klinik patern bronşit olarak kapatılmamalıdır."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Löfgren benzeri sarkoidoz sunumu genellikle iyi prognozludur; tedavi semptom şiddeti ve organ tehdidine göre basamaklandırılır.",
      "examPearl": "Eritema nodosum + ayak bileği artriti + bilateral hiler LAP: organ tehdidi yoksa NSAİİ/izlem ön plandadır.",
      "whyCorrect": "Vakadaki stabil oksijenasyon, korunmuş SFT ve organ tehdidi olmaması agresif tedavi yerine semptomatik yaklaşımı destekler.",
      "optionComparison": "Antitüberküloz, geniş antibiyotik, drenaj veya ağır immünsüpresyon; vakadaki stabil ve iyi prognozlu fenotipe göre gereksiz/aşırı kalır.",
      "evidenceChain": [
        "Eritema nodosum ve ayak bileği artriti → akut sistemik inflamatuvar fenotip.",
        "Bilateral simetrik hiler lenfadenopati → sarkoidoz paternini destekleyen görüntüleme.",
        "SpO2 %98 ve SFT korunmuş → ağır solunum yetmezliği yok.",
        "Göz/kardiyak/nörolojik yakınma yok → organ tehdidi bulgusu verilmemiş."
      ],
      "whyWrong": {
        "Dört ilaçlı tüberküloz tedavisine başlanması": "Tüberküloz tedavisi kaviter lezyon, mikrobiyolojik kanıt, temas öyküsü veya uyumlu sistemik tablo olduğunda gündeme gelir. Bu hastada ateş yüksekliği hafif, balgam yok, AFB incelemeleri negatif ve grafide bilateral simetrik hiler lenfadenopati vardır. Eritema nodosum ve ayak bileği artritiyle birlikte bu örüntü aktif tüberkülozdan farklıdır. Gereksiz antitüberküloz tedavi toksisite ve direnç açısından sakıncalıdır.",
        "Yüksek doz sistemik steroid ve siklofosfamid kombinasyonu başlanması": "Yüksek doz steroid ve siklofosfamid ağır organ tutulumlarında veya belirli vaskülitik/otoimmün acillerde kullanılabilir; bu olguda böyle bir organ tehdidi yoktur. Hipoksemi, ciddi parankimal progresyon, nörosarkoidoz, kardiyak iletim bozukluğu veya görme tehdidi verilmemiştir. Erken dönemde aşırı immünsüpresyon gereksiz enfeksiyon ve metabolik yan etki riskini artırır. Hafif-akut sarkoidoz fenotipinde basamaklı yaklaşım daha uygundur.",
        "Acil geniş spektrumlu antibiyotik ve toraks drenajı yapılması": "Torasik drenaj komplike plevral efüzyon, ampiyem veya pnömotoraks gibi durumlarda gerekir. Bu hastada plevral sıvı, lokülasyon, düşük pH veya ampiyem bulgusu yoktur; radyolojik bulgu simetrik hiler lenfadenopatidir. Geniş spektrumlu antibiyotik de bakteriyel pnömoni veya sepsis kanıtı olmadan ilk yaklaşım olmaz. Bu seçenek başka bir pulmoner enfeksiyon/plevral acil kategorisine aittir.",
        "İnhale beta-agonist ve oral antibiyotikle ayaktan bronşit tedavisi verilmesi": "Bronşit tedavisi öksürük için yüzeysel olarak akla gelebilir; ancak ayak bileği artriti, eritema nodosum ve bilateral hiler lenfadenopati basit bronşitten çok sistemik granülomatöz bir süreci düşündürür. İnhale beta-agonist wheezing/bronkokonstriksiyon baskınsa semptomatik yarar sağlayabilir; burada temel problem obstrüktif hava yolu atağı değildir. Oral antibiyotik de bakteriyel balgamlı enfeksiyon kanıtı olmadan gereksizdir. Bu nedenle klinik patern bronşit olarak kapatılmamalıdır."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v289",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V288 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v289-new-637-kopuklu-idrar-ve-goz-kapaklarinda-sislik",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Köpüklü idrar ve göz kapaklarında şişlik",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Erişkin nefrotik sendromda PLA2R pozitifliği, bland sediment ve sekonder neden yokluğunu birlikte yorumlayarak primer membranöz nefropatiyi seçme.",
      "learningTarget": "Membranöz nefropatide anti-PLA2R antikorunun primer hastalık lehine güçlü tanısal bağlam oluşturduğunu kavrama.",
      "demographics": "48 yaşında erkek hasta",
      "setting": "Nefroloji polikliniği",
      "chiefComplaint": "Hasta, sabahları göz kapaklarında şişlik ve idrarda köpürme nedeniyle nefroloji polikliniğine başvuruyor.",
      "stem": "Hasta son iki aydır sabah uyandığında göz kapaklarının şiş olduğunu, gün içinde ayakkabılarının sıkmaya başladığını anlatır. İdrarının belirgin köpürdüğünü fark etmiş, ancak idrar yaparken yanma veya ateş yaşamamıştır. Son dönemde kilo aldığını ama iştahının azalmadığını, kanlı idrar görmediğini ve bel ağrısı olmadığını söyler. Bilinen diyabeti yoktur; düzenli NSAİİ kullanmadığını, yeni bitkisel ürün başlamadığını ve ailesinde böbrek yetmezliği öyküsü bulunmadığını belirtir. Eklem ağrısı, ağız yarası, fotosensitivite veya döküntü tariflemez.",
      "patientIntro": {
        "profile": "48 yaşında erkek hasta, nefroloji polikliniği başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, sabahları göz kapaklarında şişlik ve idrarda köpürme nedeniyle nefroloji polikliniğine başvuruyor.",
        "historySummary": "Hasta son iki aydır sabah uyandığında göz kapaklarının şiş olduğunu, gün içinde ayakkabılarının sıkmaya başladığını anlatır. İdrarının belirgin köpürdüğünü fark etmiş, ancak idrar yaparken yanma veya ateş yaşamamıştır. Son dönemde kilo aldığını ama iştahının azalmadığını, kanlı idrar görmediğini ve bel ağrısı olmadığını söyler. Bilinen diyabeti yoktur; düzenli NSAİİ kullanmadığını, yeni bitkisel ürün başlamadığını ve ailesinde böbrek yetmezliği öyküsü bulunmadığını belirtir. Eklem ağrısı, ağız yarası, fotosensitivite veya döküntü tariflemez."
      },
      "vitals": {
        "TA": "132/82 mmHg",
        "Nabız": "78/dk",
        "Solunum": "15/dk",
        "SpO2": "%98, oda havasında",
        "Ateş": "36.6 °C",
        "Şok indeksi": "0.59; periferik perfüzyon iyi"
      },
      "exam": [
        "Periorbital ödem ve pretibial 2+ gode bırakan ödem izleniyor.",
        "Akciğer bazallerinde ral yok; belirgin dispne tariflemiyor.",
        "Karın yumuşak, asit belirgin değil.",
        "Ciltte purpura, malar döküntü veya ülser yok."
      ],
      "investigations": [
        {
          "id": "v289-new-637-kopuklu-idrar-ve-goz-kapaklarinda-sislik-idrar-protein",
          "label": "İdrar analizi ve proteinüri",
          "title": "İdrar analizi ve proteinüri",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "İdrar analizi ve proteinüri",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Nefrotik düzey proteinüri vardır; aktif nefritik sediment belirgin değildir.",
          "clinicalMeaning": "Nefrotik düzey proteinüri vardır; aktif nefritik sediment belirgin değildir.",
          "result": {
            "title": "İdrar analizi ve proteinüri",
            "summary": "Nefrotik düzey proteinüri vardır; aktif nefritik sediment belirgin değildir.",
            "interpretation": "Nefrotik düzey proteinüri vardır; aktif nefritik sediment belirgin değildir.",
            "values": [
              [
                "Tam idrar protein",
                "4+",
                "Negatif",
                "Yüksek"
              ],
              [
                "Eritrosit",
                "2/hpf",
                "0-3/hpf",
                "Normal"
              ],
              [
                "Eritrosit silendiri",
                "Yok",
                "Yok",
                "Normal"
              ],
              [
                "24 saatlik idrar proteini",
                "7.2 g/gün",
                "<150 mg/gün",
                "Çok yüksek"
              ]
            ],
            "rows": [
              [
                "Tam idrar protein",
                "4+",
                "Negatif",
                "Yüksek"
              ],
              [
                "Eritrosit",
                "2/hpf",
                "0-3/hpf",
                "Normal"
              ],
              [
                "Eritrosit silendiri",
                "Yok",
                "Yok",
                "Normal"
              ],
              [
                "24 saatlik idrar proteini",
                "7.2 g/gün",
                "<150 mg/gün",
                "Çok yüksek"
              ]
            ]
          }
        },
        {
          "id": "v289-new-637-kopuklu-idrar-ve-goz-kapaklarinda-sislik-kan-biyokimya",
          "label": "Serum biyokimyası",
          "title": "Serum biyokimyası",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Serum biyokimyası",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Hipoalbüminemi ve hiperlipidemi nefrotik paternle uyumludur.",
          "clinicalMeaning": "Hipoalbüminemi ve hiperlipidemi nefrotik paternle uyumludur.",
          "result": {
            "title": "Serum biyokimyası",
            "summary": "Hipoalbüminemi ve hiperlipidemi nefrotik paternle uyumludur.",
            "interpretation": "Hipoalbüminemi ve hiperlipidemi nefrotik paternle uyumludur.",
            "values": [
              [
                "Albumin",
                "2.1 g/dL",
                "3.5-5.2 g/dL",
                "Düşük"
              ],
              [
                "Total kolesterol",
                "318 mg/dL",
                "<200 mg/dL",
                "Yüksek"
              ],
              [
                "Kreatinin",
                "1.0 mg/dL",
                "0.7-1.2 mg/dL",
                "Normal"
              ],
              [
                "HbA1c",
                "5.4%",
                "<5.7%",
                "Normal"
              ]
            ],
            "rows": [
              [
                "Albumin",
                "2.1 g/dL",
                "3.5-5.2 g/dL",
                "Düşük"
              ],
              [
                "Total kolesterol",
                "318 mg/dL",
                "<200 mg/dL",
                "Yüksek"
              ],
              [
                "Kreatinin",
                "1.0 mg/dL",
                "0.7-1.2 mg/dL",
                "Normal"
              ],
              [
                "HbA1c",
                "5.4%",
                "<5.7%",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v289-new-637-kopuklu-idrar-ve-goz-kapaklarinda-sislik-seroloji",
          "label": "Otoimmün-serolojik panel",
          "title": "Otoimmün-serolojik panel",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Otoimmün-serolojik panel",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "PLA2R pozitifliği ve sekonder lupus bulgusu olmaması dikkat çekiyor.",
          "clinicalMeaning": "PLA2R pozitifliği ve sekonder lupus bulgusu olmaması dikkat çekiyor.",
          "result": {
            "title": "Otoimmün-serolojik panel",
            "summary": "PLA2R pozitifliği ve sekonder lupus bulgusu olmaması dikkat çekiyor.",
            "interpretation": "PLA2R pozitifliği ve sekonder lupus bulgusu olmaması dikkat çekiyor.",
            "values": [
              [
                "Anti-PLA2R",
                "Pozitif, 142 RU/mL",
                "<14 RU/mL",
                "Yüksek"
              ],
              [
                "C3",
                "104 mg/dL",
                "90-180 mg/dL",
                "Normal"
              ],
              [
                "C4",
                "28 mg/dL",
                "10-40 mg/dL",
                "Normal"
              ],
              [
                "ANA",
                "Negatif",
                "Negatif",
                "Normal"
              ],
              [
                "Anti-dsDNA",
                "Negatif",
                "Negatif",
                "Normal"
              ]
            ],
            "rows": [
              [
                "Anti-PLA2R",
                "Pozitif, 142 RU/mL",
                "<14 RU/mL",
                "Yüksek"
              ],
              [
                "C3",
                "104 mg/dL",
                "90-180 mg/dL",
                "Normal"
              ],
              [
                "C4",
                "28 mg/dL",
                "10-40 mg/dL",
                "Normal"
              ],
              [
                "ANA",
                "Negatif",
                "Negatif",
                "Normal"
              ],
              [
                "Anti-dsDNA",
                "Negatif",
                "Negatif",
                "Normal"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada en olası tanı aşağıdakilerden hangisidir?",
      "questionType": "diagnosis",
      "answerTarget": "Tanı",
      "diagnosis": {
        "correct": "Primer membranöz nefropati",
        "options": [
          "Minimal değişiklik hastalığı",
          "Fokal segmental glomerüloskleroz",
          "Diyabetik nefropati",
          "Primer membranöz nefropati",
          "Sınıf IV lupus nefriti"
        ],
        "question": "Bu hastada en olası tanı aşağıdakilerden hangisidir?",
        "explanation": "Nefrotik düzey proteinüri, hipoalbüminemi, ödem ve hiperlipidemi nefrotik sendromu gösterir. Erişkin hastada bland sediment ve belirgin anti-PLA2R pozitifliği primer membranöz nefropatiyi destekler. Normal komplemanlar ve negatif lupus serolojisi proliferatif lupus nefritini, diyabet öyküsünün olmaması diyabetik nefropatiyi geri plana iter.",
        "pearls": [
          "Erişkinde nefrotik sendrom ayırıcı tanısında membranöz nefropati önemli bir başlıktır.",
          "Anti-PLA2R pozitifliği primer membranöz nefropati için güçlü destek sağlar.",
          "Aktif sediment ve düşük kompleman yokluğu proliferatif lupus nefritini zayıflatır."
        ],
        "optionFeedback": {
          "Minimal değişiklik hastalığı": "Minimal değişiklik hastalığı erişkinde de nefrotik sendrom yapabilir; ancak genellikle idrar sedimenti belirgin aktif değildir ve anti-PLA2R pozitifliği beklenmez. Çocuklarda en sık nefrotik sendrom nedeni olması nedeniyle ezberden seçilmemelidir. Bu hastada erişkin yaş, belirgin albümin düşüklüğü, ağır proteinüri ve PLA2R antikor pozitifliği primer membranöz nefropati lehinedir. Minimal değişiklik hastalığında böbrek biyopsisi ışık mikroskobunda çoğu kez normal görünür, elektron mikroskobunda diffüz podosit ayak uzantısı silinmesi beklenir.",
          "Fokal segmental glomerüloskleroz": "FSGS erişkinde nefrotik sendromun önemli nedenlerinden biridir ve obezite, HIV, eroin kullanımı veya azalmış nefron kitlesi gibi durumlarla ilişkili olabilir. Ancak anti-PLA2R pozitifliği FSGS için tipik değildir. FSGS'de proteinüri sıklıkla nefrotik olabilir ama tanıyı destekleyen odak segmental skleroz ve uygun klinik bağlam gerekir. Bu vakada immunolojik belirteç ve klinik örüntü primer membranöz nefropatiye daha güçlü bağlanır.",
          "Diyabetik nefropati": "Diyabetik nefropati genellikle uzun süreli diyabet öyküsü, retinopati, albüminürinin yıllar içinde artması ve tipik kronik böbrek hastalığı seyriyle düşünülür. Bu hastada diyabet öyküsü ve retinopati yoktur; HbA1c normaldir. Proteinürinin kısa sürede belirginleşmesi ve anti-PLA2R pozitifliği diyabetik nefropatiden farklıdır. Bu nedenle sadece yaş ve ödem üzerinden diyabetik nefropati seçmek doğru olmaz.",
          "Primer membranöz nefropati": "Bu seçenek en uygundur. Erişkin hastada nefrotik düzey proteinüri, hipoalbüminemi, ödem, hiperlipidemi ve bland sediment nefrotik sendrom paternidir. Anti-PLA2R antikor pozitifliği primer membranöz nefropati için güçlü bir belirteçtir ve uygun klinikte tanıyı destekler. Komplemanların normal olması, ANA/anti-dsDNA negatifliği ve diyabet öyküsünün olmaması sekonder lupus/diyabetik nedenleri geri plana iter. TUS açısından erişkin nefrotik sendrom + PLA2R pozitifliği primer membranöz nefropati lehine güçlü ipucudur.",
          "Sınıf IV lupus nefriti": "Sınıf IV lupus nefriti proliferatif ve aktif idrar sedimentiyle seyretme eğilimindedir; hematüri, eritrosit silendirleri, düşük kompleman ve anti-dsDNA pozitifliği beklenebilir. Bu hastada komplemanlar normal, ANA/anti-dsDNA negatif ve belirgin eritrosit silendiri yoktur. Lupus nefriti nefrotik proteinüri yapabilir; fakat bu vakadaki PLA2R pozitifliği ve bland sediment primer membranöz nefropatiyi daha uygun kılar. SLE klinik bulguları verilmediği için bu seçenek daha zayıftır."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Primer membranöz nefropati erişkinde nefrotik sendromun önemli nedenidir; PLA2R antikoru tanısal ve izlemsel değere sahiptir.",
      "examPearl": "Erişkin nefrotik sendrom + anti-PLA2R pozitifliği + bland sediment: primer membranöz nefropatiyi düşün.",
      "whyCorrect": "Vakadaki serolojik belirteç ve idrar paterni doğru tanıyı diğer nefrotik sendrom nedenlerinden ayırır.",
      "optionComparison": "Minimal değişiklik ve FSGS proteinüri yapabilir; lupus aktif sediment/kompleman düşüklüğü, diyabetik nefropati ise uzun diyabet öyküsüyle beklenir.",
      "evidenceChain": [
        "Köpüklü idrar ve ödem → protein kaybına bağlı nefrotik klinik.",
        "Proteinüri 7.2 g/gün ve albumin 2.1 g/dL → nefrotik sendrom.",
        "Eritrosit silendiri yok → proliferatif nefritik sediment baskın değil.",
        "Anti-PLA2R 142 RU/mL → primer membranöz nefropati lehine güçlü veri.",
        "ANA/anti-dsDNA negatif ve kompleman normal → lupus nefriti olasılığı azalıyor."
      ],
      "whyWrong": {
        "Minimal değişiklik hastalığı": "Minimal değişiklik hastalığı erişkinde de nefrotik sendrom yapabilir; ancak genellikle idrar sedimenti belirgin aktif değildir ve anti-PLA2R pozitifliği beklenmez. Çocuklarda en sık nefrotik sendrom nedeni olması nedeniyle ezberden seçilmemelidir. Bu hastada erişkin yaş, belirgin albümin düşüklüğü, ağır proteinüri ve PLA2R antikor pozitifliği primer membranöz nefropati lehinedir. Minimal değişiklik hastalığında böbrek biyopsisi ışık mikroskobunda çoğu kez normal görünür, elektron mikroskobunda diffüz podosit ayak uzantısı silinmesi beklenir.",
        "Fokal segmental glomerüloskleroz": "FSGS erişkinde nefrotik sendromun önemli nedenlerinden biridir ve obezite, HIV, eroin kullanımı veya azalmış nefron kitlesi gibi durumlarla ilişkili olabilir. Ancak anti-PLA2R pozitifliği FSGS için tipik değildir. FSGS'de proteinüri sıklıkla nefrotik olabilir ama tanıyı destekleyen odak segmental skleroz ve uygun klinik bağlam gerekir. Bu vakada immunolojik belirteç ve klinik örüntü primer membranöz nefropatiye daha güçlü bağlanır.",
        "Diyabetik nefropati": "Diyabetik nefropati genellikle uzun süreli diyabet öyküsü, retinopati, albüminürinin yıllar içinde artması ve tipik kronik böbrek hastalığı seyriyle düşünülür. Bu hastada diyabet öyküsü ve retinopati yoktur; HbA1c normaldir. Proteinürinin kısa sürede belirginleşmesi ve anti-PLA2R pozitifliği diyabetik nefropatiden farklıdır. Bu nedenle sadece yaş ve ödem üzerinden diyabetik nefropati seçmek doğru olmaz.",
        "Sınıf IV lupus nefriti": "Sınıf IV lupus nefriti proliferatif ve aktif idrar sedimentiyle seyretme eğilimindedir; hematüri, eritrosit silendirleri, düşük kompleman ve anti-dsDNA pozitifliği beklenebilir. Bu hastada komplemanlar normal, ANA/anti-dsDNA negatif ve belirgin eritrosit silendiri yoktur. Lupus nefriti nefrotik proteinüri yapabilir; fakat bu vakadaki PLA2R pozitifliği ve bland sediment primer membranöz nefropatiyi daha uygun kılar. SLE klinik bulguları verilmediği için bu seçenek daha zayıftır."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v289",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V288 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v289-new-638-yuz-hatlari-kalinlasma-ve-yuzuklerin-daralmasi",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Yüz hatlarında kalınlaşma ve yüzüklerin daralması",
      "difficulty": "Orta-Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Akral büyüme, metabolik bozulma ve yumuşak doku bulgularında akromegali tarama testini doğru seçme.",
      "learningTarget": "Akromegalide rastgele GH yerine IGF-1 ile tarama yapıldığını; doğrulama ve görüntülemenin basamaklı ilerlediğini kavrama.",
      "demographics": "45 yaşında kadın hasta",
      "setting": "Endokrinoloji polikliniği",
      "chiefComplaint": "Hasta, yüzüklerinin dar gelmesi, ayakkabı numarasının büyümesi ve son dönemde artan horlama nedeniyle endokrinoloji polikliniğine başvuruyor.",
      "stem": "Hasta son üç yılda alyansını çıkaramadığını ve eski ayakkabılarının ayağını sıktığını anlatır. Eşi, yüz hatlarının giderek kabalaştığını ve geceleri horlamasının arttığını fark ettiğini söyler. Hasta son aylarda iki elinde uyuşma ile geceleri uyanmakta, kavanoz açarken güçsüzlük hissetmektedir. Baş ağrısı zaman zaman olmakta ancak ani görme kaybı veya çift görme tariflememektedir. Ailesinde benzer görünüm değişikliği olmadığını, uzun süreli steroid kullanmadığını ve yakın zamanda ciddi kilo kaybı yaşamadığını belirtir.",
      "patientIntro": {
        "profile": "45 yaşında kadın hasta, endokrinoloji polikliniği başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, yüzüklerinin dar gelmesi, ayakkabı numarasının büyümesi ve son dönemde artan horlama nedeniyle endokrinoloji polikliniğine başvuruyor.",
        "historySummary": "Hasta son üç yılda alyansını çıkaramadığını ve eski ayakkabılarının ayağını sıktığını anlatır. Eşi, yüz hatlarının giderek kabalaştığını ve geceleri horlamasının arttığını fark ettiğini söyler. Hasta son aylarda iki elinde uyuşma ile geceleri uyanmakta, kavanoz açarken güçsüzlük hissetmektedir. Baş ağrısı zaman zaman olmakta ancak ani görme kaybı veya çift görme tariflememektedir. Ailesinde benzer görünüm değişikliği olmadığını, uzun süreli steroid kullanmadığını ve yakın zamanda ciddi kilo kaybı yaşamadığını belirtir."
      },
      "vitals": {
        "TA": "148/88 mmHg",
        "Nabız": "82/dk",
        "Solunum": "16/dk",
        "SpO2": "%97, oda havasında",
        "Ateş": "36.6 °C",
        "Şok indeksi": "0.55; bilinç açık, perfüzyon iyi"
      },
      "exam": [
        "Frontal belirginleşme, mandibulada öne çıkıklık ve el-ayaklarda yumuşak doku kalınlaşması izleniyor.",
        "Bilateral Tinel testi pozitif; tenar atrofi yok.",
        "Tiroid muayenesinde belirgin nodül palpe edilmiyor.",
        "Görme alanı kaba muayenede belirgin defekt göstermiyor."
      ],
      "investigations": [
        {
          "id": "v289-new-638-yuz-hatlari-kalinlasma-ve-yuzuklerin-daralmasi-metabolik-panel",
          "label": "Metabolik panel",
          "title": "Metabolik panel",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Metabolik panel",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Glukoz metabolizması ve kan basıncıyla uyumlu metabolik eşlikçiler mevcuttur.",
          "clinicalMeaning": "Glukoz metabolizması ve kan basıncıyla uyumlu metabolik eşlikçiler mevcuttur.",
          "result": {
            "title": "Metabolik panel",
            "summary": "Glukoz metabolizması ve kan basıncıyla uyumlu metabolik eşlikçiler mevcuttur.",
            "interpretation": "Glukoz metabolizması ve kan basıncıyla uyumlu metabolik eşlikçiler mevcuttur.",
            "values": [
              [
                "Açlık glukozu",
                "132 mg/dL",
                "70-99 mg/dL",
                "Yüksek"
              ],
              [
                "HbA1c",
                "7.1%",
                "<5.7%",
                "Yüksek"
              ],
              [
                "Trigliserid",
                "214 mg/dL",
                "<150 mg/dL",
                "Yüksek"
              ],
              [
                "TSH",
                "1.8 mIU/L",
                "0.4-4.0 mIU/L",
                "Normal"
              ]
            ],
            "rows": [
              [
                "Açlık glukozu",
                "132 mg/dL",
                "70-99 mg/dL",
                "Yüksek"
              ],
              [
                "HbA1c",
                "7.1%",
                "<5.7%",
                "Yüksek"
              ],
              [
                "Trigliserid",
                "214 mg/dL",
                "<150 mg/dL",
                "Yüksek"
              ],
              [
                "TSH",
                "1.8 mIU/L",
                "0.4-4.0 mIU/L",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v289-new-638-yuz-hatlari-kalinlasma-ve-yuzuklerin-daralmasi-ekg",
          "label": "EKG",
          "title": "EKG",
          "type": "cardiology",
          "priority": "additional",
          "subtype": "EKG",
          "category": "cardiology",
          "testTypeCategory": "cardiology",
          "summary": "Hipertansiyona eşlik edebilecek sol ventrikül yüklenme bulguları hafiftir; akut iskemi yok.",
          "clinicalMeaning": "Hipertansiyona eşlik edebilecek sol ventrikül yüklenme bulguları hafiftir; akut iskemi yok.",
          "result": {
            "title": "EKG",
            "summary": "Hipertansiyona eşlik edebilecek sol ventrikül yüklenme bulguları hafiftir; akut iskemi yok.",
            "interpretation": "Hipertansiyona eşlik edebilecek sol ventrikül yüklenme bulguları hafiftir; akut iskemi yok.",
            "findings": [
              "Sinüs ritmi, hız 80/dk.",
              "Belirgin akut ST elevasyonu yok.",
              "Hafif sol ventrikül hipertrofisi voltajı mevcut."
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada tanısal değerlendirmede ilk biyokimyasal basamak aşağıdakilerden hangisidir?",
      "questionType": "diagnostic-step",
      "answerTarget": "Tanısal basamak",
      "diagnosis": {
        "correct": "Serum IGF-1 ölçümü ile biyokimyasal tarama yapılması",
        "options": [
          "Serum IGF-1 ölçümü ile biyokimyasal tarama yapılması",
          "Rastgele büyüme hormonu düzeyi bakılması",
          "Kontrastlı hipofiz MR'ının ilk ve tek tanısal basamak olarak yapılması",
          "1 mg deksametazon supresyon testi yapılması",
          "Prolaktin düzeyine göre dopamin agonisti başlanması"
        ],
        "question": "Bu hastada tanısal değerlendirmede ilk biyokimyasal basamak aşağıdakilerden hangisidir?",
        "explanation": "Akral büyüme, yüz hatlarında kalınlaşma, karpal tünel yakınması, horlama ve glukoz bozukluğu akromegali kuşkusunu artırır. İlk biyokimyasal tarama IGF-1 ölçümüdür; yüksekse oral glukoz yükleme testiyle GH supresyonunun olmaması doğrulanır ve sonrasında hipofiz MR ile kaynak araştırılır.",
        "pearls": [
          "IGF-1 GH fazlalığının daha stabil biyokimyasal göstergesidir.",
          "Rastgele GH pulsatif salınım nedeniyle güvenilir tarama testi değildir.",
          "MR biyokimyasal doğrulamadan sonra lokalizasyon için kullanılır."
        ],
        "optionFeedback": {
          "Serum IGF-1 ölçümü ile biyokimyasal tarama yapılması": "Bu seçenek en uygundur. Yüz hatlarında kalınlaşma, yüzük/ayakkabı numarası artışı, karpal tünel yakınması, horlama, hipertansiyon ve glukoz intoleransı akromegali klinik örüntüsünü destekler. İlk biyokimyasal tarama için IGF-1 uygundur çünkü gün içi dalgalanması rastgele GH'ye göre daha azdır ve kronik GH fazlalığının periferik etkisini yansıtır. IGF-1 yüksek bulunursa oral glukoz yükleme testinde GH supresyonunun olmamasıyla doğrulama, ardından hipofiz görüntülemesi planlanır. TUS açısından akromegalide ilk tarama IGF-1, rastgele GH değil bilgisidir.",
          "Rastgele büyüme hormonu düzeyi bakılması": "Rastgele GH düzeyi akromegali için güvenilir ilk tarama testi değildir; GH pulsatif salgılanır ve stres, uyku, egzersiz, glukoz durumu gibi faktörlerle değişebilir. Tek bir normal veya yüksek rastgele değer tanıyı güvenle dışlamaz ya da koydurmaz. Bu hastada klinik kuşku yüksek olduğunda daha stabil ve bütünleşik gösterge olan IGF-1 ile başlamak gerekir. GH supresyon testi doğrulama basamağında önemlidir, rastgele GH ise tek başına yeterli değildir.",
          "Kontrastlı hipofiz MR'ının ilk ve tek tanısal basamak olarak yapılması": "Hipofiz MR'ı biyokimyasal tanı desteklendikten sonra adenom lokalizasyonu ve cerrahi planlama için çok değerlidir; ancak ilk ve tek basamak değildir. Klinik olarak akromegali düşünülen bir hastada önce hormon fazlalığı biyokimyasal olarak gösterilmelidir. MR'da küçük insidental lezyonlar bulunabilir ve biyokimyasal doğrulama olmadan yanlış yönlendirebilir. Bu nedenle görüntüleme, IGF-1 ve doğrulama testleri sonrasında yapılmalıdır.",
          "1 mg deksametazon supresyon testi yapılması": "1 mg deksametazon supresyon testi Cushing sendromu taramasında kullanılır. Bu hastada kolay morarma veya mor stria gibi hiperkortizolizm ipuçları ön planda değildir; başlıca bulgular akral büyüme, yüz hatlarında kalınlaşma, karpal tünel ve metabolik komplikasyonlardır. Cushing ile akromegali bazı metabolik bulguları paylaşabilir; fakat soru ilk basamak akromegali taramasını hedefler. Bu nedenle deksametazon testi doğru biyokimyasal başlangıç değildir.",
          "Prolaktin düzeyine göre dopamin agonisti başlanması": "Prolaktin ölçümü hipofiz kitleleri ve hipogonadizm değerlendirmesinde yardımcı olabilir; bazı GH salgılayan adenomlarda prolaktin de yükselebilir. Ancak yalnız prolaktine bakıp dopamin agonisti başlamak, akromegalinin biyokimyasal tanısını atlar. Hastanın klinik bulguları GH/IGF-1 eksenini öncelikli kılar. Dopamin agonistleri seçilmiş olgularda tedavi seçenekleri arasında yer alabilir; fakat tanısal ilk basamak olarak bu vaka için doğru klinik hedef değildir."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Akromegali şüphesinde ilk tarama testi serum IGF-1 düzeyidir; doğrulama OGTT ile GH supresyonunun olmamasıdır.",
      "examPearl": "Akral büyüme + karpal tünel + diyabet/hipertansiyon: önce IGF-1, sonra OGTT ve MR.",
      "whyCorrect": "Hastanın klinik değişimi kronik GH/IGF-1 fazlalığını düşündürür; IGF-1 bu ekseni taramada en uygun ilk adımdır.",
      "optionComparison": "Rastgele GH güvenilir değildir, MR ilk ve tek basamak değildir, deksametazon Cushing için, prolaktin ise bu sorunun ana tanısal hedefi için yetersizdir.",
      "evidenceChain": [
        "Yüzük ve ayakkabı numarası artışı → akral yumuşak doku/kemik büyümesi.",
        "Karpal tünel yakınması → yumuşak doku kalınlaşmasına bağlı nöropati.",
        "Glukoz yüksekliği ve hipertansiyon → GH fazlalığının metabolik eşlikçileri.",
        "Görme alanı defekti olmaması → acil kitle basısı yok; önce biyokimyasal tarama yapılabilir."
      ],
      "whyWrong": {
        "Rastgele büyüme hormonu düzeyi bakılması": "Rastgele GH düzeyi akromegali için güvenilir ilk tarama testi değildir; GH pulsatif salgılanır ve stres, uyku, egzersiz, glukoz durumu gibi faktörlerle değişebilir. Tek bir normal veya yüksek rastgele değer tanıyı güvenle dışlamaz ya da koydurmaz. Bu hastada klinik kuşku yüksek olduğunda daha stabil ve bütünleşik gösterge olan IGF-1 ile başlamak gerekir. GH supresyon testi doğrulama basamağında önemlidir, rastgele GH ise tek başına yeterli değildir.",
        "Kontrastlı hipofiz MR'ının ilk ve tek tanısal basamak olarak yapılması": "Hipofiz MR'ı biyokimyasal tanı desteklendikten sonra adenom lokalizasyonu ve cerrahi planlama için çok değerlidir; ancak ilk ve tek basamak değildir. Klinik olarak akromegali düşünülen bir hastada önce hormon fazlalığı biyokimyasal olarak gösterilmelidir. MR'da küçük insidental lezyonlar bulunabilir ve biyokimyasal doğrulama olmadan yanlış yönlendirebilir. Bu nedenle görüntüleme, IGF-1 ve doğrulama testleri sonrasında yapılmalıdır.",
        "1 mg deksametazon supresyon testi yapılması": "1 mg deksametazon supresyon testi Cushing sendromu taramasında kullanılır. Bu hastada kolay morarma veya mor stria gibi hiperkortizolizm ipuçları ön planda değildir; başlıca bulgular akral büyüme, yüz hatlarında kalınlaşma, karpal tünel ve metabolik komplikasyonlardır. Cushing ile akromegali bazı metabolik bulguları paylaşabilir; fakat soru ilk basamak akromegali taramasını hedefler. Bu nedenle deksametazon testi doğru biyokimyasal başlangıç değildir.",
        "Prolaktin düzeyine göre dopamin agonisti başlanması": "Prolaktin ölçümü hipofiz kitleleri ve hipogonadizm değerlendirmesinde yardımcı olabilir; bazı GH salgılayan adenomlarda prolaktin de yükselebilir. Ancak yalnız prolaktine bakıp dopamin agonisti başlamak, akromegalinin biyokimyasal tanısını atlar. Hastanın klinik bulguları GH/IGF-1 eksenini öncelikli kılar. Dopamin agonistleri seçilmiş olgularda tedavi seçenekleri arasında yer alabilir; fakat tanısal ilk basamak olarak bu vaka için doğru klinik hedef değildir."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v289",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V288 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v290-new-639-ilac-sonrasi-carpinti-ve-bayilacak-gibi-olma",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "İlaç sonrası çarpıntı ve bayılacak gibi olma",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "QT uzatan ilaç ve hipokalemi zemininde gelişen polimorfik ventriküler ritim atağında akut tedavi önceliğini seçme.",
      "learningTarget": "Edinilmiş uzun QT paterninde magnezyum, tetikleyici ilacın kesilmesi ve potasyum düzeltmesinin neden öncelikli olduğunu kavrama.",
      "demographics": "47 yaşında kadın hasta",
      "setting": "Acil servis",
      "chiefComplaint": "Hasta, antibiyotik kullanımından sonra başlayan çarpıntı ve bayılacak gibi olma nedeniyle acil servise getiriliyor.",
      "stem": "Hasta iki gündür sinüzit için verilen antibiyotiği kullandığını, bu sabah kahvaltıdan sonra göğsünde ani çarpıntı ve başında boşalma hissi başladığını anlatır. Ataklar birkaç dakika sürmüş, biri sırasında sandalyeye oturmak zorunda kalmış ancak tamamen bilincini kaybetmemiştir. Son üç gündür iştahının az olduğunu ve hafif ishal nedeniyle az sıvı aldığını söyler. Daha önce düzenli çarpıntı atağı, bilinen yapısal kalp hastalığı veya ailede genç yaşta ani ölüm öyküsü tariflemez. Göğüs ağrısı, ateş, balgam, bacak şişliği veya uzun yolculuk öyküsü eşlik etmemiştir.",
      "patientIntro": {
        "profile": "47 yaşında kadın hasta, Acil servis başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, antibiyotik kullanımından sonra başlayan çarpıntı ve bayılacak gibi olma nedeniyle acil servise getiriliyor.",
        "historySummary": "Hasta iki gündür sinüzit için verilen antibiyotiği kullandığını, bu sabah kahvaltıdan sonra göğsünde ani çarpıntı ve başında boşalma hissi başladığını anlatır. Ataklar birkaç dakika sürmüş, biri sırasında sandalyeye oturmak zorunda kalmış ancak tamamen bilincini kaybetmemiştir. Son üç gündür iştahının az olduğunu ve hafif ishal nedeniyle az sıvı aldığını söyler. Daha önce düzenli çarpıntı atağı, bilinen yapısal kalp hastalığı veya ailede genç yaşta ani ölüm öyküsü tariflemez. Göğüs ağrısı, ateş, balgam, bacak şişliği veya uzun yolculuk öyküsü eşlik etmemiştir."
      },
      "vitals": {
        "TA": "112/70 mmHg",
        "Nabız": "108/dk, aralıklı düzensiz atımlar izleniyor",
        "Solunum": "18/dk",
        "SpO2": "%98, oda havasında",
        "Ateş": "36.8 °C",
        "Şok indeksi": "0.96; kapiller dolum <2 sn, ekstremiteler sıcak"
      },
      "exam": [
        "Genel durumu orta, konuşması açık ve oryante.",
        "Kalp oskültasyonunda aralıklı düzensiz ritim dışında belirgin üfürüm yok.",
        "Akciğer sesleri doğal, ral veya wheezing saptanmıyor.",
        "Periferik ödem yok; nörolojik muayenede lateralizan bulgu izlenmiyor."
      ],
      "investigations": [
        {
          "id": "v290-new-639-ilac-sonrasi-carpinti-ve-bayilacak-gibi-olma-elektrolitler",
          "label": "Elektrolitler ve temel biyokimya",
          "title": "Elektrolitler ve temel biyokimya",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Elektrolitler ve temel biyokimya",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Potasyum düşüklüğü repolarizasyon bozukluğu için düzeltilebilir tetikleyici oluşturur.",
          "clinicalMeaning": "Potasyum düşüklüğü repolarizasyon bozukluğu için düzeltilebilir tetikleyici oluşturur.",
          "result": {
            "title": "Elektrolitler ve temel biyokimya",
            "summary": "Potasyum düşüklüğü repolarizasyon bozukluğu için düzeltilebilir tetikleyici oluşturur.",
            "interpretation": "Potasyum düşüklüğü repolarizasyon bozukluğu için düzeltilebilir tetikleyici oluşturur.",
            "values": [
              [
                "Potasyum",
                "2.9 mmol/L",
                "3.5-5.1 mmol/L",
                "Düşük"
              ],
              [
                "Magnezyum",
                "1.7 mg/dL",
                "1.7-2.4 mg/dL",
                "Alt sınır"
              ],
              [
                "Kreatinin",
                "0.8 mg/dL",
                "0.6-1.1 mg/dL",
                "Normal"
              ],
              [
                "Kalsiyum",
                "9.1 mg/dL",
                "8.6-10.2 mg/dL",
                "Normal"
              ]
            ],
            "rows": [
              [
                "Potasyum",
                "2.9 mmol/L",
                "3.5-5.1 mmol/L",
                "Düşük"
              ],
              [
                "Magnezyum",
                "1.7 mg/dL",
                "1.7-2.4 mg/dL",
                "Alt sınır"
              ],
              [
                "Kreatinin",
                "0.8 mg/dL",
                "0.6-1.1 mg/dL",
                "Normal"
              ],
              [
                "Kalsiyum",
                "9.1 mg/dL",
                "8.6-10.2 mg/dL",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v290-new-639-ilac-sonrasi-carpinti-ve-bayilacak-gibi-olma-ekg",
          "label": "12 derivasyonlu EKG",
          "title": "12 derivasyonlu EKG",
          "type": "cardiology",
          "priority": "important",
          "subtype": "12 derivasyonlu EKG",
          "category": "cardiology",
          "testTypeCategory": "cardiology",
          "summary": "Belirgin QT uzaması ve ventriküler ektopiler izleniyor.",
          "clinicalMeaning": "Belirgin QT uzaması ve ventriküler ektopiler izleniyor.",
          "result": {
            "title": "12 derivasyonlu EKG",
            "summary": "Belirgin QT uzaması ve ventriküler ektopiler izleniyor.",
            "interpretation": "Belirgin QT uzaması ve ventriküler ektopiler izleniyor.",
            "findings": [
              "Sinüs taşikardisi, hız 106/dk.",
              "QTc 540 ms.",
              "Akut ST elevasyonu yok.",
              "Monitörde kısa süreli polimorfik geniş kompleks taşikardi atakları kaydediliyor."
            ]
          }
        },
        {
          "id": "v290-new-639-ilac-sonrasi-carpinti-ve-bayilacak-gibi-olma-kardiyak-belirtecler",
          "label": "Kardiyak belirteçler",
          "title": "Kardiyak belirteçler",
          "type": "laboratory",
          "priority": "important",
          "subtype": "Kardiyak belirteçler",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Akut miyokard nekrozunu destekleyen belirgin yükselme saptanmıyor.",
          "clinicalMeaning": "Akut miyokard nekrozunu destekleyen belirgin yükselme saptanmıyor.",
          "result": {
            "title": "Kardiyak belirteçler",
            "summary": "Akut miyokard nekrozunu destekleyen belirgin yükselme saptanmıyor.",
            "interpretation": "Akut miyokard nekrozunu destekleyen belirgin yükselme saptanmıyor.",
            "values": [
              [
                "hs-troponin I",
                "9 ng/L",
                "<34 ng/L",
                "Normal"
              ],
              [
                "CK-MB",
                "2.1 ng/mL",
                "<5 ng/mL",
                "Normal"
              ]
            ],
            "rows": [
              [
                "hs-troponin I",
                "9 ng/L",
                "<34 ng/L",
                "Normal"
              ],
              [
                "CK-MB",
                "2.1 ng/mL",
                "<5 ng/mL",
                "Normal"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada tekrarlayan ritim atağını önlemek için en uygun akut yaklaşım aşağıdakilerden hangisidir?",
      "questionType": "treatment",
      "answerTarget": "Acil tedavi",
      "diagnosis": {
        "correct": "İntravenöz magnezyum sülfat verilmesi, QT uzatan ilacın kesilmesi ve potasyumun düzeltilmesi",
        "options": [
          "Adenozin bolus uygulanması ve dar QRS taşikardi algoritmasına geçilmesi",
          "İntravenöz amiodaron yüklemesi yapılması ve QT süresinin izlenmesi",
          "İntravenöz magnezyum sülfat verilmesi, QT uzatan ilacın kesilmesi ve potasyumun düzeltilmesi",
          "Oral beta-bloker başlanıp ayaktan ritim Holter takibi planlanması",
          "Yüksek doz furosemid verilerek hızlı volüm azaltılması"
        ],
        "question": "Bu hastada tekrarlayan ritim atağını önlemek için en uygun akut yaklaşım aşağıdakilerden hangisidir?",
        "explanation": "Makrolid maruziyeti, hipokalemi, QTc uzaması ve polimorfik geniş kompleks ataklar edinilmiş uzun QT zemininde torsades fizyolojisini destekler. İlk yaklaşım QT uzatan ilacı kesmek, intravenöz magnezyum vermek ve potasyumu güvenli aralığa düzeltmektir. Hemodinamik kollaps gelişirse elektriksel tedavi gerekir; stabil tekrarlayan atakta ise repolarizasyon bozukluğunun düzeltilmesi ana hedeftir.",
        "pearls": [
          "QTc belirgin uzunsa ve ritim polimorfik geniş kompleks ise QT uzatan ilaçlar tekrar gözden geçirilir.",
          "Magnezyum torsades atağında serum düzeyi normal olsa bile kullanılabilir.",
          "Hipokalemi ve hipomagnezemi düzeltilmeden antiaritmik seçmek atakları artırabilir."
        ],
        "optionFeedback": {
          "Adenozin bolus uygulanması ve dar QRS taşikardi algoritmasına geçilmesi": "Adenozin, düzenli dar QRS supraventriküler taşikardilerde AV nodu geçici olarak bloke ederek tanı ve tedavi sağlayabilir. Bu hastada ritim şeridinde dar QRS düzenli taşikardi değil, QT uzaması zemininde kısa süreli polimorfik geniş kompleks ataklar vardır. Adenozin bu mekanizmayı düzeltmez; hatta tanı odağını yanlış yere çeker. TUS açısından geniş kompleks-polimorfik ritim ve belirgin QT uzaması görüldüğünde AV nodal taşikardi algoritmasından önce elektrolit ve repolarizasyon bozukluğu düşünülmelidir.",
          "İntravenöz amiodaron yüklemesi yapılması ve QT süresinin izlenmesi": "Amiodaron birçok geniş kompleks taşikardide kullanılabilen antiaritmiktir; ancak uzun QT zemininde gelişen polimorfik ventriküler taşikardi atağında uygun ilk seçenek değildir. Amiodaron QT süresini daha da uzatabilir ve repolarizasyon rezervi azalmış hastada yeni atakları kolaylaştırabilir. Bu vakada yakın dönemde makrolid kullanımı, hipokalemi ve QTc 540 ms olması ilaca/elektrolite bağlı uzun QT paternini öne çıkarır. Bu nedenle ritmi baskılamaya çalışırken QT’yi daha da uzatan ilaç seçmek hatalı olur.",
          "İntravenöz magnezyum sülfat verilmesi, QT uzatan ilacın kesilmesi ve potasyumun düzeltilmesi": "Bu seçenek en uygundur. Hastada makrolid kullanımı sonrası başlayan çarpıntı-bayılacak gibi olma, QTc 540 ms, hipokalemi ve monitörde kısa süreli polimorfik geniş kompleks ataklar edinilmiş uzun QT zemininde torsades de pointes fizyolojisini düşündürür. Akut yaklaşımda intravenöz magnezyum, QT uzatan ilacın kesilmesi ve potasyumun güvenli aralığa yükseltilmesi temel basamaklardır. Magnezyum serum magnezyumu normal olsa bile erken arddepolarizasyonları baskılayarak atak tekrarını azaltır. Hasta hemodinamik olarak çökerse elektriksel kardiyoversiyon/defibrilasyon gerekir; ancak burada tekrarlayan kısa atak ve stabil perfüzyon zemininde ilk hedef repolarizasyon bozukluğunu düzeltmektir.",
          "Oral beta-bloker başlanıp ayaktan ritim Holter takibi planlanması": "Beta-blokerler konjenital uzun QT sendromunda uzun dönem risk azaltmada önemli olabilir; fakat bu hasta akut serviste tekrarlayan polimorfik ataklarla gelmiştir. Sadece oral beta-bloker ve ayaktan Holter planlamak, mevcut elektrolit bozukluğunu ve QT uzatan ilaç etkisini düzeltmediği için yetersizdir. Ayrıca hipokalemi ve devam eden QT uzaması varken hastayı ayaktan izlemek güvenli değildir. Doğru yaklaşım akut repolarizasyon stabilizasyonu, tetikleyici ilacın kesilmesi ve elektrolit düzeltmesidir.",
          "Yüksek doz furosemid verilerek hızlı volüm azaltılması": "Furosemid volüm yüklenmesi veya pulmoner ödem gibi durumlarda yararlı olabilir; ancak bu hastada konjesyon bulgusu yoktur. Aksine loop diüretikler potasyum ve magnezyum kaybını artırarak uzun QT ve polimorfik ventriküler taşikardi riskini kötüleştirebilir. Vakanın ana problemi volüm fazlalığı değil, repolarizasyon bozukluğu ve hipokalemidir. Bu nedenle hızlı volüm azaltma ritim atağını düzeltmez, elektrolit zeminini daha riskli hale getirebilir."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Edinilmiş uzun QT sendromunda erken arddepolarizasyonlar polimorfik ventriküler taşikardiye yol açabilir; tedavi repolarizasyonu stabilize etmeye yönelir.",
      "examPearl": "Makrolid/antiemetik/antiaritmik + hipokalemi + QTc uzaması: torsades yönetiminde IV magnezyum ve elektrolit düzeltmesi ilk düşünülür.",
      "whyCorrect": "Doğru seçenek ritim atağının mekanizmasını, yani uzun QT ve elektrolit bozukluğuna bağlı erken arddepolarizasyonları hedefler.",
      "optionComparison": "Adenozin dar QRS düzenli SVT için, amiodaron birçok geniş kompleks taşikardi için, beta-bloker uzun dönem seçilmiş durumlar için düşünülebilir; bu vakada akut öncelik magnezyum ve tetikleyicilerin düzeltilmesidir.",
      "evidenceChain": [
        "Yeni QT uzatan ilaç kullanımı → edinilmiş repolarizasyon bozukluğu için risk.",
        "QTc 540 ms → uzun QT zeminini objektif olarak destekler.",
        "Potasyum 2.9 mmol/L → erken arddepolarizasyon ve ventriküler aritmi riskini artırır.",
        "Polimorfik geniş kompleks kısa ataklar → dar QRS SVT algoritmasından farklı akut yaklaşım gerektirir."
      ],
      "whyWrong": {
        "Adenozin bolus uygulanması ve dar QRS taşikardi algoritmasına geçilmesi": "Adenozin, düzenli dar QRS supraventriküler taşikardilerde AV nodu geçici olarak bloke ederek tanı ve tedavi sağlayabilir. Bu hastada ritim şeridinde dar QRS düzenli taşikardi değil, QT uzaması zemininde kısa süreli polimorfik geniş kompleks ataklar vardır. Adenozin bu mekanizmayı düzeltmez; hatta tanı odağını yanlış yere çeker. TUS açısından geniş kompleks-polimorfik ritim ve belirgin QT uzaması görüldüğünde AV nodal taşikardi algoritmasından önce elektrolit ve repolarizasyon bozukluğu düşünülmelidir.",
        "İntravenöz amiodaron yüklemesi yapılması ve QT süresinin izlenmesi": "Amiodaron birçok geniş kompleks taşikardide kullanılabilen antiaritmiktir; ancak uzun QT zemininde gelişen polimorfik ventriküler taşikardi atağında uygun ilk seçenek değildir. Amiodaron QT süresini daha da uzatabilir ve repolarizasyon rezervi azalmış hastada yeni atakları kolaylaştırabilir. Bu vakada yakın dönemde makrolid kullanımı, hipokalemi ve QTc 540 ms olması ilaca/elektrolite bağlı uzun QT paternini öne çıkarır. Bu nedenle ritmi baskılamaya çalışırken QT’yi daha da uzatan ilaç seçmek hatalı olur.",
        "Oral beta-bloker başlanıp ayaktan ritim Holter takibi planlanması": "Beta-blokerler konjenital uzun QT sendromunda uzun dönem risk azaltmada önemli olabilir; fakat bu hasta akut serviste tekrarlayan polimorfik ataklarla gelmiştir. Sadece oral beta-bloker ve ayaktan Holter planlamak, mevcut elektrolit bozukluğunu ve QT uzatan ilaç etkisini düzeltmediği için yetersizdir. Ayrıca hipokalemi ve devam eden QT uzaması varken hastayı ayaktan izlemek güvenli değildir. Doğru yaklaşım akut repolarizasyon stabilizasyonu, tetikleyici ilacın kesilmesi ve elektrolit düzeltmesidir.",
        "Yüksek doz furosemid verilerek hızlı volüm azaltılması": "Furosemid volüm yüklenmesi veya pulmoner ödem gibi durumlarda yararlı olabilir; ancak bu hastada konjesyon bulgusu yoktur. Aksine loop diüretikler potasyum ve magnezyum kaybını artırarak uzun QT ve polimorfik ventriküler taşikardi riskini kötüleştirebilir. Vakanın ana problemi volüm fazlalığı değil, repolarizasyon bozukluğu ve hipokalemidir. Bu nedenle hızlı volüm azaltma ritim atağını düzeltmez, elektrolit zeminini daha riskli hale getirebilir."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v290",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V289 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v290-new-640-kasinti-yorgunluk-ve-kolestatik-enzim-yuksekligi",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Kaşıntı, yorgunluk ve kolestatik enzim yüksekliği",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Kronik kolestatik laboratuvar paterninde ekstrahepatik obstrüksiyon dışlandıktan sonra primer biliyer kolanjit tedavi basamağını seçme.",
      "learningTarget": "ALP-GGT baskın yüksekliğin hepatoselüler patern veya mekanik tıkanıklıkla karıştırılmamasını ve UDCA yanıt izlemini kavrama.",
      "demographics": "52 yaşında kadın hasta",
      "setting": "Gastroenteroloji polikliniği",
      "chiefComplaint": "Hasta, aylardır süren kaşıntı ve gün içinde artan yorgunluk nedeniyle gastroenteroloji polikliniğine başvuruyor.",
      "stem": "Hasta yaklaşık sekiz aydır özellikle geceleri artan yaygın kaşıntı yaşadığını, son aylarda merdiven çıkınca daha çabuk yorulduğunu anlatır. Cildinde yeni döküntü olmadığını, kaşıntının sıcak duş sonrası belirginleştiğini söyler. Alkol kullanımı yoktur; düzenli bitkisel ürün veya yeni antibiyotik kullanmadığını belirtir. Son haftalarda idrar renginde hafif koyulaşma fark etmiş, ancak ateş, titreme, sağ üst kadranda ani şiddetli ağrı veya kilo kaybı tariflememiştir. Ailesinde benzer karaciğer hastalığı olmadığını, daha önce safra kesesi ameliyatı geçirmediğini söyler.",
      "patientIntro": {
        "profile": "52 yaşında kadın hasta, Gastroenteroloji polikliniği başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, aylardır süren kaşıntı ve gün içinde artan yorgunluk nedeniyle gastroenteroloji polikliniğine başvuruyor.",
        "historySummary": "Hasta yaklaşık sekiz aydır özellikle geceleri artan yaygın kaşıntı yaşadığını, son aylarda merdiven çıkınca daha çabuk yorulduğunu anlatır. Cildinde yeni döküntü olmadığını, kaşıntının sıcak duş sonrası belirginleştiğini söyler. Alkol kullanımı yoktur; düzenli bitkisel ürün veya yeni antibiyotik kullanmadığını belirtir. Son haftalarda idrar renginde hafif koyulaşma fark etmiş, ancak ateş, titreme, sağ üst kadranda ani şiddetli ağrı veya kilo kaybı tariflememiştir. Ailesinde benzer karaciğer hastalığı olmadığını, daha önce safra kesesi ameliyatı geçirmediğini söyler."
      },
      "vitals": {
        "TA": "124/76 mmHg",
        "Nabız": "82/dk",
        "Solunum": "15/dk",
        "SpO2": "%98, oda havasında",
        "Ateş": "36.6 °C",
        "Şok indeksi": "0.66; periferik perfüzyon iyi"
      },
      "exam": [
        "Skleralarda hafif ikterik görünüm var, ciltte ekskoriasyon izleri izleniyor.",
        "Karın yumuşak, sağ üst kadranda belirgin hassasiyet, defans veya rebound yok.",
        "Hepatosplenomegali belirgin değil, asit veya periferik ödem saptanmıyor.",
        "Asteriksis yok, bilinç açık."
      ],
      "investigations": [
        {
          "id": "v290-new-640-kasinti-yorgunluk-ve-kolestatik-enzim-yuksekligi-karaciger-testleri",
          "label": "Karaciğer biyokimyası",
          "title": "Karaciğer biyokimyası",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Karaciğer biyokimyası",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "ALP ve GGT baskın kolestatik patern vardır; transaminaz artışı daha sınırlıdır.",
          "clinicalMeaning": "ALP ve GGT baskın kolestatik patern vardır; transaminaz artışı daha sınırlıdır.",
          "result": {
            "title": "Karaciğer biyokimyası",
            "summary": "ALP ve GGT baskın kolestatik patern vardır; transaminaz artışı daha sınırlıdır.",
            "interpretation": "ALP ve GGT baskın kolestatik patern vardır; transaminaz artışı daha sınırlıdır.",
            "values": [
              [
                "ALP",
                "486 U/L",
                "35-104 U/L",
                "Yüksek"
              ],
              [
                "GGT",
                "392 U/L",
                "<40 U/L",
                "Yüksek"
              ],
              [
                "ALT",
                "68 U/L",
                "<35 U/L",
                "Hafif yüksek"
              ],
              [
                "AST",
                "59 U/L",
                "<35 U/L",
                "Hafif yüksek"
              ],
              [
                "Total bilirubin",
                "1.8 mg/dL",
                "0.2-1.2 mg/dL",
                "Hafif yüksek"
              ],
              [
                "Albumin",
                "4.0 g/dL",
                "3.5-5.2 g/dL",
                "Normal"
              ]
            ],
            "rows": [
              [
                "ALP",
                "486 U/L",
                "35-104 U/L",
                "Yüksek"
              ],
              [
                "GGT",
                "392 U/L",
                "<40 U/L",
                "Yüksek"
              ],
              [
                "ALT",
                "68 U/L",
                "<35 U/L",
                "Hafif yüksek"
              ],
              [
                "AST",
                "59 U/L",
                "<35 U/L",
                "Hafif yüksek"
              ],
              [
                "Total bilirubin",
                "1.8 mg/dL",
                "0.2-1.2 mg/dL",
                "Hafif yüksek"
              ],
              [
                "Albumin",
                "4.0 g/dL",
                "3.5-5.2 g/dL",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v290-new-640-kasinti-yorgunluk-ve-kolestatik-enzim-yuksekligi-otoimmun-seroloji",
          "label": "Otoimmün ve viral seroloji",
          "title": "Otoimmün ve viral seroloji",
          "type": "laboratory",
          "priority": "important",
          "subtype": "Otoimmün ve viral seroloji",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "AMA pozitifliği kolestatik paternle birlikte anlamlıdır; aktif viral hepatit lehine veri yoktur.",
          "clinicalMeaning": "AMA pozitifliği kolestatik paternle birlikte anlamlıdır; aktif viral hepatit lehine veri yoktur.",
          "result": {
            "title": "Otoimmün ve viral seroloji",
            "summary": "AMA pozitifliği kolestatik paternle birlikte anlamlıdır; aktif viral hepatit lehine veri yoktur.",
            "interpretation": "AMA pozitifliği kolestatik paternle birlikte anlamlıdır; aktif viral hepatit lehine veri yoktur.",
            "values": [
              [
                "AMA",
                "Pozitif, 1:320",
                "Negatif",
                "Pozitif"
              ],
              [
                "ANA",
                "1:80",
                "Negatif veya düşük titre",
                "Düşük titre"
              ],
              [
                "IgM",
                "420 mg/dL",
                "40-230 mg/dL",
                "Yüksek"
              ],
              [
                "HBsAg",
                "Negatif",
                "Negatif",
                "Negatif"
              ],
              [
                "Anti-HCV",
                "Negatif",
                "Negatif",
                "Negatif"
              ]
            ],
            "rows": [
              [
                "AMA",
                "Pozitif, 1:320",
                "Negatif",
                "Pozitif"
              ],
              [
                "ANA",
                "1:80",
                "Negatif veya düşük titre",
                "Düşük titre"
              ],
              [
                "IgM",
                "420 mg/dL",
                "40-230 mg/dL",
                "Yüksek"
              ],
              [
                "HBsAg",
                "Negatif",
                "Negatif",
                "Negatif"
              ],
              [
                "Anti-HCV",
                "Negatif",
                "Negatif",
                "Negatif"
              ]
            ]
          }
        },
        {
          "id": "v290-new-640-kasinti-yorgunluk-ve-kolestatik-enzim-yuksekligi-usg",
          "label": "Abdominal ultrasonografi",
          "title": "Abdominal ultrasonografi",
          "type": "imaging",
          "priority": "important",
          "subtype": "Abdominal ultrasonografi",
          "category": "imaging",
          "testTypeCategory": "imaging",
          "summary": "Safra yollarında belirgin genişleme saptanmıyor.",
          "clinicalMeaning": "Safra yollarında belirgin genişleme saptanmıyor.",
          "result": {
            "title": "Abdominal ultrasonografi",
            "summary": "Safra yollarında belirgin genişleme saptanmıyor.",
            "interpretation": "Safra yollarında belirgin genişleme saptanmıyor.",
            "findings": [
              "Safra kesesinde taş izlenmiyor.",
              "İntrahepatik ve ekstrahepatik safra yolları normal kalibrasyonda.",
              "Karaciğer parankim ekojenitesi hafif heterojen, kitle saptanmıyor."
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada hastalık seyrini hedefleyen en uygun ilk tedavi yaklaşımı aşağıdakilerden hangisidir?",
      "questionType": "treatment",
      "answerTarget": "Tedavi",
      "diagnosis": {
        "correct": "Ursodeoksikolik asit başlanması ve biyokimyasal yanıtın izlenmesi",
        "options": [
          "Yüksek doz prednizon ve azatioprin kombinasyonu başlanması",
          "Tenofovir veya entekavir ile antiviral tedavi başlanması",
          "ERCP ile ampirik sfinkterotomi yapılması",
          "Sadece kolestiramin verilerek karaciğer testlerinin izlemsiz bırakılması",
          "Ursodeoksikolik asit başlanması ve biyokimyasal yanıtın izlenmesi"
        ],
        "question": "Bu hastada hastalık seyrini hedefleyen en uygun ilk tedavi yaklaşımı aşağıdakilerden hangisidir?",
        "explanation": "Kronik kaşıntı-yorgunluk, ALP/GGT baskın kolestaz, AMA pozitifliği ve safra yolu dilatasyonunun olmaması primer biliyer kolanjit paternidir. Bu tabloda ilk basamak hastalık modifiye edici tedavi ursodeoksikolik asittir; biyokimyasal yanıt izlenir ve yetersiz yanıtta ikinci basamak ajanlar düşünülür. Kolestiramin pruritus için destek olabilir, fakat temel tedavinin yerine geçmez.",
        "pearls": [
          "Kolestatik patern her zaman taş veya darlık anlamına gelmez.",
          "AMA pozitifliği + ALP yüksekliği + tıkanıklık yokluğu primer biliyer kolanjit lehinedir.",
          "UDCA ilk basamak tedavidir; semptomatik kaşıntı tedavisi ayrıca planlanabilir."
        ],
        "optionFeedback": {
          "Yüksek doz prednizon ve azatioprin kombinasyonu başlanması": "Prednizon-azatioprin kombinasyonu otoimmün hepatitte klasik tedavi omurgasıdır; ancak otoimmün hepatitte genellikle belirgin hepatoselüler enzim yüksekliği, yüksek IgG ve SMA/ANA gibi bulgular ön plandadır. Bu hastada ALP-GGT baskın kolestatik patern, AMA pozitifliği ve safra yolu dilatasyonunun olmaması küçük intrahepatik safra kanalı hastalığını öne çıkarır. Steroid-azatioprin bu paternin ilk tedavisi değildir. Yanlış seçeneğin öğretici noktası, otoimmün karaciğer hastalıklarının aynı başlık altında karışabilmesine rağmen laboratuvar paterninin tedavi seçimini değiştirmesidir.",
          "Tenofovir veya entekavir ile antiviral tedavi başlanması": "Tenofovir veya entekavir kronik hepatit B tedavisinde kullanılır. Hepatit B’de HBsAg pozitifliği, HBV DNA düzeyi, ALT paterni ve fibrozis durumu tedavi kararında belirleyicidir. Bu vakada viral serolojiler aktif HBV lehine değildir; yakınma kaşıntı-yorgunluk şeklinde, laboratuvar ise kolestatik ağırlıklıdır. Bu nedenle antiviral tedavi, mevcut verilerin işaret ettiği hastalığın mekanizmasını hedeflemez.",
          "ERCP ile ampirik sfinkterotomi yapılması": "ERCP, koledok taşı, kolanjit veya darlığa bağlı ekstrahepatik obstrüksiyon düşünüldüğünde tanısal/terapötik değer taşır. Bu hastada ultrasonografide intra/ekstrahepatik safra yolu dilatasyonu yoktur, ateş ve sağ üst kadran akut ağrı yoktur, bilirubin de ağır obstrüksiyon düzeyinde değildir. Kolestatik enzim yüksekliği her zaman mekanik tıkanıklık anlamına gelmez. AMA pozitifliği ve tipik klinik tablo varken ampirik ERCP gereksiz invaziv girişim olur.",
          "Sadece kolestiramin verilerek karaciğer testlerinin izlemsiz bırakılması": "Kolestiramin pruritusu azaltmak için yararlı semptomatik tedavi olabilir; fakat altta yatan kolestatik hastalığın progresyonunu tek başına hedeflemez. Bu hastada kronik kaşıntı, yorgunluk, ALP-GGT yüksekliği, AMA pozitifliği ve görüntülemede tıkanıklık olmaması primer biliyer kolanjit paternini destekler. Sadece kaşıntıyı azaltıp karaciğer biyokimyasını ve tedavi yanıtını izlememek eksik yaklaşımdır. Kolestiramin gerektiğinde destek tedavisi olarak eklenebilir; temel hastalık modifiye edici ilk seçenek değildir.",
          "Ursodeoksikolik asit başlanması ve biyokimyasal yanıtın izlenmesi": "Bu seçenek en uygundur. Orta yaşlı kadında kronik kaşıntı-yorgunluk, ALP/GGT baskın kolestatik patern, AMA pozitifliği ve ultrasonografide safra yolu dilatasyonu olmaması primer biliyer kolanjit için tipik bir klinik-laboratuvar dizilimi oluşturur. Ursodeoksikolik asit ilk basamak tedavidir ve ALP/bilirubin gibi biyokimyasal yanıt parametreleriyle izlenir. Pruritus için ayrıca kolestiramin verilebilir; ancak temel hastalık tedavisinin yerine geçmez. TUS mantığında kolestatik patern + AMA pozitifliği + ekstrahepatik obstrüksiyon yokluğu görüldüğünde tedavi UDCA’dır."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Primer biliyer kolanjit küçük intrahepatik safra kanallarının otoimmün yıkımıyla kolestatik enzim yüksekliği ve pruritus oluşturur.",
      "examPearl": "Orta yaş kadın + kaşıntı + ALP/GGT yüksek + AMA pozitif + USG’de dilatasyon yok: UDCA düşün.",
      "whyCorrect": "Doğru seçenek altta yatan otoimmün kolestatik süreci hedefleyen ilk basamak tedaviyi seçer.",
      "optionComparison": "Steroid-azatioprin otoimmün hepatit, antiviral tedavi HBV, ERCP ekstrahepatik obstrüksiyon, kolestiramin ise pruritus desteği içindir; bu vakada temel tedavi UDCA’dır.",
      "evidenceChain": [
        "Gece artan kaşıntı ve yorgunluk → kronik kolestatik hastalık semptomları.",
        "ALP 486 U/L ve GGT 392 U/L → hepatoselülerden çok kolestatik patern.",
        "AMA 1:320 ve IgM yüksekliği → primer biliyer kolanjit lehine serolojik zemin.",
        "USG’de safra yolu dilatasyonu olmaması → mekanik tıkanıklık/ERCP önceliğini zayıflatır."
      ],
      "whyWrong": {
        "Yüksek doz prednizon ve azatioprin kombinasyonu başlanması": "Prednizon-azatioprin kombinasyonu otoimmün hepatitte klasik tedavi omurgasıdır; ancak otoimmün hepatitte genellikle belirgin hepatoselüler enzim yüksekliği, yüksek IgG ve SMA/ANA gibi bulgular ön plandadır. Bu hastada ALP-GGT baskın kolestatik patern, AMA pozitifliği ve safra yolu dilatasyonunun olmaması küçük intrahepatik safra kanalı hastalığını öne çıkarır. Steroid-azatioprin bu paternin ilk tedavisi değildir. Yanlış seçeneğin öğretici noktası, otoimmün karaciğer hastalıklarının aynı başlık altında karışabilmesine rağmen laboratuvar paterninin tedavi seçimini değiştirmesidir.",
        "Tenofovir veya entekavir ile antiviral tedavi başlanması": "Tenofovir veya entekavir kronik hepatit B tedavisinde kullanılır. Hepatit B’de HBsAg pozitifliği, HBV DNA düzeyi, ALT paterni ve fibrozis durumu tedavi kararında belirleyicidir. Bu vakada viral serolojiler aktif HBV lehine değildir; yakınma kaşıntı-yorgunluk şeklinde, laboratuvar ise kolestatik ağırlıklıdır. Bu nedenle antiviral tedavi, mevcut verilerin işaret ettiği hastalığın mekanizmasını hedeflemez.",
        "ERCP ile ampirik sfinkterotomi yapılması": "ERCP, koledok taşı, kolanjit veya darlığa bağlı ekstrahepatik obstrüksiyon düşünüldüğünde tanısal/terapötik değer taşır. Bu hastada ultrasonografide intra/ekstrahepatik safra yolu dilatasyonu yoktur, ateş ve sağ üst kadran akut ağrı yoktur, bilirubin de ağır obstrüksiyon düzeyinde değildir. Kolestatik enzim yüksekliği her zaman mekanik tıkanıklık anlamına gelmez. AMA pozitifliği ve tipik klinik tablo varken ampirik ERCP gereksiz invaziv girişim olur.",
        "Sadece kolestiramin verilerek karaciğer testlerinin izlemsiz bırakılması": "Kolestiramin pruritusu azaltmak için yararlı semptomatik tedavi olabilir; fakat altta yatan kolestatik hastalığın progresyonunu tek başına hedeflemez. Bu hastada kronik kaşıntı, yorgunluk, ALP-GGT yüksekliği, AMA pozitifliği ve görüntülemede tıkanıklık olmaması primer biliyer kolanjit paternini destekler. Sadece kaşıntıyı azaltıp karaciğer biyokimyasını ve tedavi yanıtını izlememek eksik yaklaşımdır. Kolestiramin gerektiğinde destek tedavisi olarak eklenebilir; temel hastalık modifiye edici ilk seçenek değildir."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v290",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V289 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v290-new-641-ust-solunum-yolu-sonrasi-kola-rengi-idrar",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Üst solunum yolu sonrası kola rengi idrar",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Mukozal enfeksiyonla yakın zamanlı makroskopik hematüride IgA nefropatisini postenfeksiyöz GN ve anti-GBM hastalığından ayırma.",
      "learningTarget": "Nefritik idrar sedimentinde zamanlama, kompleman düzeyi ve proteinüri şiddetinin ayırıcı tanıdaki değerini kavrama.",
      "demographics": "22 yaşında erkek hasta",
      "setting": "Nefroloji polikliniği",
      "chiefComplaint": "Hasta, boğaz ağrısının ardından fark ettiği koyu renkli idrar nedeniyle nefroloji polikliniğinde değerlendiriliyor.",
      "stem": "Hasta üç gündür boğaz ağrısı ve burun akıntısı yaşadığını, dün akşam idrar renginin kola gibi koyulaştığını fark ettiğini anlatır. İdrar yaparken yanma, taş düşürme öyküsü veya yan ağrısı tariflemez. Son bir yılda benzer şekilde üst solunum yolu enfeksiyonları sırasında iki kez kısa süreli idrar koyulaşması olduğunu, atakların birkaç gün içinde azaldığını söyler. Bacaklarında belirgin şişlik olmadığını, nefes darlığı veya kanlı balgam fark etmediğini belirtir. Düzenli ilaç kullanımı, NSAİİ aşırı kullanımı veya bilinen sistemik hastalığı yoktur.",
      "patientIntro": {
        "profile": "22 yaşında erkek hasta, Nefroloji polikliniği başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, boğaz ağrısının ardından fark ettiği koyu renkli idrar nedeniyle nefroloji polikliniğinde değerlendiriliyor.",
        "historySummary": "Hasta üç gündür boğaz ağrısı ve burun akıntısı yaşadığını, dün akşam idrar renginin kola gibi koyulaştığını fark ettiğini anlatır. İdrar yaparken yanma, taş düşürme öyküsü veya yan ağrısı tariflemez. Son bir yılda benzer şekilde üst solunum yolu enfeksiyonları sırasında iki kez kısa süreli idrar koyulaşması olduğunu, atakların birkaç gün içinde azaldığını söyler. Bacaklarında belirgin şişlik olmadığını, nefes darlığı veya kanlı balgam fark etmediğini belirtir. Düzenli ilaç kullanımı, NSAİİ aşırı kullanımı veya bilinen sistemik hastalığı yoktur."
      },
      "vitals": {
        "TA": "128/78 mmHg",
        "Nabız": "84/dk",
        "Solunum": "16/dk",
        "SpO2": "%99, oda havasında",
        "Ateş": "37.2 °C",
        "Şok indeksi": "0.66; kapiller dolum normal"
      },
      "exam": [
        "Genel durumu iyi, bilinç açık.",
        "Orofarenkste hafif hiperemi var, tonsillerde belirgin eksüda yok.",
        "Akciğer sesleri doğal, hemoptizi bulgusu yok.",
        "Pretibial ödem yok; kostovertebral açı hassasiyeti saptanmıyor."
      ],
      "investigations": [
        {
          "id": "v290-new-641-ust-solunum-yolu-sonrasi-kola-rengi-idrar-idrar",
          "label": "Tam idrar tetkiki ve sediment",
          "title": "Tam idrar tetkiki ve sediment",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Tam idrar tetkiki ve sediment",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Dismorfik eritrosit ve eritrosit silendiri glomerüler kaynaklı hematüriyi destekler.",
          "clinicalMeaning": "Dismorfik eritrosit ve eritrosit silendiri glomerüler kaynaklı hematüriyi destekler.",
          "result": {
            "title": "Tam idrar tetkiki ve sediment",
            "summary": "Dismorfik eritrosit ve eritrosit silendiri glomerüler kaynaklı hematüriyi destekler.",
            "interpretation": "Dismorfik eritrosit ve eritrosit silendiri glomerüler kaynaklı hematüriyi destekler.",
            "values": [
              [
                "Protein",
                "1+",
                "Negatif",
                "Hafif proteinüri"
              ],
              [
                "Eritrosit",
                ">50/HPF",
                "0-3/HPF",
                "Yüksek"
              ],
              [
                "Dismorfik eritrosit",
                "%45",
                "<%20",
                "Yüksek"
              ],
              [
                "Eritrosit silendiri",
                "Pozitif",
                "Negatif",
                "Pozitif"
              ],
              [
                "Lökosit esteraz",
                "Negatif",
                "Negatif",
                "Negatif"
              ]
            ],
            "rows": [
              [
                "Protein",
                "1+",
                "Negatif",
                "Hafif proteinüri"
              ],
              [
                "Eritrosit",
                ">50/HPF",
                "0-3/HPF",
                "Yüksek"
              ],
              [
                "Dismorfik eritrosit",
                "%45",
                "<%20",
                "Yüksek"
              ],
              [
                "Eritrosit silendiri",
                "Pozitif",
                "Negatif",
                "Pozitif"
              ],
              [
                "Lökosit esteraz",
                "Negatif",
                "Negatif",
                "Negatif"
              ]
            ]
          }
        },
        {
          "id": "v290-new-641-ust-solunum-yolu-sonrasi-kola-rengi-idrar-bobrek-kompleman",
          "label": "Böbrek fonksiyonu ve kompleman",
          "title": "Böbrek fonksiyonu ve kompleman",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Böbrek fonksiyonu ve kompleman",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Böbrek fonksiyonu büyük ölçüde korunmuş, kompleman düzeyleri düşmemiştir.",
          "clinicalMeaning": "Böbrek fonksiyonu büyük ölçüde korunmuş, kompleman düzeyleri düşmemiştir.",
          "result": {
            "title": "Böbrek fonksiyonu ve kompleman",
            "summary": "Böbrek fonksiyonu büyük ölçüde korunmuş, kompleman düzeyleri düşmemiştir.",
            "interpretation": "Böbrek fonksiyonu büyük ölçüde korunmuş, kompleman düzeyleri düşmemiştir.",
            "values": [
              [
                "Kreatinin",
                "1.1 mg/dL",
                "0.7-1.2 mg/dL",
                "Normal"
              ],
              [
                "eGFR",
                "92 mL/dk/1.73m²",
                ">90",
                "Normal"
              ],
              [
                "Protein/kreatinin oranı",
                "0.55 g/g",
                "<0.15 g/g",
                "Hafif-orta artış"
              ],
              [
                "C3",
                "112 mg/dL",
                "90-180 mg/dL",
                "Normal"
              ],
              [
                "C4",
                "28 mg/dL",
                "10-40 mg/dL",
                "Normal"
              ]
            ],
            "rows": [
              [
                "Kreatinin",
                "1.1 mg/dL",
                "0.7-1.2 mg/dL",
                "Normal"
              ],
              [
                "eGFR",
                "92 mL/dk/1.73m²",
                ">90",
                "Normal"
              ],
              [
                "Protein/kreatinin oranı",
                "0.55 g/g",
                "<0.15 g/g",
                "Hafif-orta artış"
              ],
              [
                "C3",
                "112 mg/dL",
                "90-180 mg/dL",
                "Normal"
              ],
              [
                "C4",
                "28 mg/dL",
                "10-40 mg/dL",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v290-new-641-ust-solunum-yolu-sonrasi-kola-rengi-idrar-seroloji",
          "label": "Serolojik değerlendirme",
          "title": "Serolojik değerlendirme",
          "type": "laboratory",
          "priority": "important",
          "subtype": "Serolojik değerlendirme",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Pulmoner-renal veya düşük komplemanlı sistemik süreç lehine güçlü veri yoktur.",
          "clinicalMeaning": "Pulmoner-renal veya düşük komplemanlı sistemik süreç lehine güçlü veri yoktur.",
          "result": {
            "title": "Serolojik değerlendirme",
            "summary": "Pulmoner-renal veya düşük komplemanlı sistemik süreç lehine güçlü veri yoktur.",
            "interpretation": "Pulmoner-renal veya düşük komplemanlı sistemik süreç lehine güçlü veri yoktur.",
            "values": [
              [
                "Anti-GBM",
                "Negatif",
                "Negatif",
                "Negatif"
              ],
              [
                "ANCA",
                "Negatif",
                "Negatif",
                "Negatif"
              ],
              [
                "ANA",
                "Negatif",
                "Negatif",
                "Negatif"
              ],
              [
                "ASO",
                "160 IU/mL",
                "<200 IU/mL",
                "Normal"
              ]
            ],
            "rows": [
              [
                "Anti-GBM",
                "Negatif",
                "Negatif",
                "Negatif"
              ],
              [
                "ANCA",
                "Negatif",
                "Negatif",
                "Negatif"
              ],
              [
                "ANA",
                "Negatif",
                "Negatif",
                "Negatif"
              ],
              [
                "ASO",
                "160 IU/mL",
                "<200 IU/mL",
                "Normal"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastadaki klinik-laboratuvar paternini en iyi açıklayan süreç aşağıdakilerden hangisidir?",
      "questionType": "mechanism",
      "answerTarget": "Mekanizma",
      "diagnosis": {
        "correct": "Mezangial IgA birikimiyle gelişen glomerüler immün yanıt",
        "options": [
          "Mezangial IgA birikimiyle gelişen glomerüler immün yanıt",
          "Glomerüler bazal membrana karşı lineer antikor birikimi",
          "Streptokok enfeksiyonundan haftalar sonra gelişen düşük komplemanlı immün kompleks nefriti",
          "Podosit ayak çıkıntılarının selektif kaybına bağlı saf albuminüri",
          "Ürik asit kristallerinin toplayıcı sistemde obstrüksiyon oluşturması"
        ],
        "question": "Bu hastadaki klinik-laboratuvar paternini en iyi açıklayan süreç aşağıdakilerden hangisidir?",
        "explanation": "Üst solunum yolu enfeksiyonuyla eş zamanlı makroskopik hematüri, normal kompleman ve glomerüler idrar sedimenti IgA nefropatisi için tipiktir. Poststreptokoksik GN’de hematüri enfeksiyondan haftalar sonra ve C3 düşüklüğüyle gelir; anti-GBM’de ise hızlı böbrek kaybı ve akciğer bulguları beklenebilir. Bu vakada mekanizma mezangial IgA birikimiyle ilişkili glomerüler immün yanıttır.",
        "pearls": [
          "Enfeksiyonla eş zamanlı hematüri IgA nefropatisi için klasik ipucudur.",
          "Normal kompleman poststreptokoksik GN olasılığını azaltır.",
          "Dismorfik eritrosit ve eritrosit silendiri hematürinin glomerüler kaynaklı olduğunu gösterir."
        ],
        "optionFeedback": {
          "Mezangial IgA birikimiyle gelişen glomerüler immün yanıt": "Bu seçenek en uygundur. Üst solunum yolu enfeksiyonuyla aynı günlerde başlayan makroskopik hematüri, normal kompleman düzeyi, hafif proteinüri ve dismorfik eritrosit/eritrosit silendirleri glomerüler kaynaklı hematüriyi gösterir. Zamanlama “senfarenjit” tarzındadır; yani enfeksiyondan haftalar sonra değil, mukozal enfeksiyonla yakın ilişkili olarak ortaya çıkar. Bu patern IgA nefropatisinde mezangial IgA1 ağırlıklı immün birikimiyle açıklanır. TUS ayrımı açısından poststreptokoksik GN’den en önemli fark zamanlama ve kompleman düzeyidir.",
          "Glomerüler bazal membrana karşı lineer antikor birikimi": "Glomerüler bazal membrana karşı lineer antikor birikimi anti-GBM hastalığının mekanizmasıdır. Bu tabloda hızlı kreatinin artışı, ağır nefritik sendrom ve sıklıkla alveoler kanama/hemoptizi gibi akciğer-böbrek birlikteliği aranır. Hastada hemoptizi yok, kreatinin normal sınıra yakın ve klinik üst solunum yolu enfeksiyonu ile eş zamanlı makroskopik hematüri şeklindedir. Bu nedenle lineer anti-GBM mekanizması bu vaka için daha az uygundur.",
          "Streptokok enfeksiyonundan haftalar sonra gelişen düşük komplemanlı immün kompleks nefriti": "Poststreptokoksik glomerülonefritte nefritik tablo genellikle boğaz enfeksiyonundan 1-3 hafta, deri enfeksiyonundan daha uzun süre sonra ortaya çıkar ve C3 düşüklüğü beklenir. Bu hastada hematüri boğaz ağrısı sürerken başlamış, C3 ve C4 normal bulunmuştur. Bu ayrım TUS’ta çok değerlidir: enfeksiyonla eş zamanlı hematüri IgA nefropatisini, gecikmiş hematüri ve düşük C3 postenfeksiyöz GN’yi destekler. Bu seçenek mekanizma olarak gerçekçi bir ayırıcı seçenektir; ancak zamanlama ve kompleman bulgularıyla desteklenmez.",
          "Podosit ayak çıkıntılarının selektif kaybına bağlı saf albuminüri": "Podosit ayak çıkıntılarının selektif kaybı minimal değişiklik hastalığının temel mekanizmasıdır. Bu durumda nefrotik sendrom, belirgin albuminüri, ödem ve genellikle aktif idrar sedimenti olmaması beklenir. Hastada ana bulgu makroskopik hematüri, dismorfik eritrosit ve eritrosit silendiridir; proteinüri nefrotik düzeyde değildir. Bu yüzden podosit kaynaklı saf nefrotik patern bu vakadaki aktif glomerüler hematüriyi açıklamaz.",
          "Ürik asit kristallerinin toplayıcı sistemde obstrüksiyon oluşturması": "Ürik asit kristallerine bağlı obstrüksiyon taş hastalığı veya tümör lizis gibi durumlarda düşünülebilir. Kolik tarzda yan ağrısı, kristalüri, hidronefroz veya belirgin akut obstrüktif böbrek hasarı beklenebilir. Bu hastada idrar mikroskobisinde dismorfik eritrosit ve eritrosit silendiri vardır; bu bulgular taş kaynaklı alt/üst üriner sistem kanamasından çok glomerüler kaynağı destekler. Bu nedenle kristal obstrüksiyonu ana mekanizma değildir."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "IgA nefropatisinde mukozal enfeksiyonları takiben galaktoz eksik IgA1 ilişkili immün kompleksler mezangiumda birikerek glomerüler hematüri oluşturur.",
      "examPearl": "Boğaz enfeksiyonuyla aynı anda kola rengi idrar + normal C3: IgA nefropatisi; haftalar sonra ve düşük C3: poststreptokoksik GN.",
      "whyCorrect": "Doğru seçenek zamanlama, kompleman ve sediment bulgularını tek mekanizmada birleştirir.",
      "optionComparison": "Anti-GBM lineer antikor ve pulmoner-renal tablo; poststreptokoksik GN gecikmiş düşük komplemanlı tablo; minimal değişiklik nefrotik tablo; ürik asit kristali obstrüktif/taş paternidir.",
      "evidenceChain": [
        "Boğaz ağrısı sürerken hematüri başlaması → senfarenjit zamanlama.",
        "Dismorfik eritrosit ve eritrosit silendiri → glomerüler kaynak.",
        "C3-C4 normal → düşük komplemanlı postenfeksiyöz GN daha zayıf.",
        "Hemoptizi ve hızlı kreatinin artışı olmaması → anti-GBM olasılığını azaltır."
      ],
      "whyWrong": {
        "Glomerüler bazal membrana karşı lineer antikor birikimi": "Glomerüler bazal membrana karşı lineer antikor birikimi anti-GBM hastalığının mekanizmasıdır. Bu tabloda hızlı kreatinin artışı, ağır nefritik sendrom ve sıklıkla alveoler kanama/hemoptizi gibi akciğer-böbrek birlikteliği aranır. Hastada hemoptizi yok, kreatinin normal sınıra yakın ve klinik üst solunum yolu enfeksiyonu ile eş zamanlı makroskopik hematüri şeklindedir. Bu nedenle lineer anti-GBM mekanizması bu vaka için daha az uygundur.",
        "Streptokok enfeksiyonundan haftalar sonra gelişen düşük komplemanlı immün kompleks nefriti": "Poststreptokoksik glomerülonefritte nefritik tablo genellikle boğaz enfeksiyonundan 1-3 hafta, deri enfeksiyonundan daha uzun süre sonra ortaya çıkar ve C3 düşüklüğü beklenir. Bu hastada hematüri boğaz ağrısı sürerken başlamış, C3 ve C4 normal bulunmuştur. Bu ayrım TUS’ta çok değerlidir: enfeksiyonla eş zamanlı hematüri IgA nefropatisini, gecikmiş hematüri ve düşük C3 postenfeksiyöz GN’yi destekler. Bu seçenek mekanizma olarak gerçekçi bir ayırıcı seçenektir; ancak zamanlama ve kompleman bulgularıyla desteklenmez.",
        "Podosit ayak çıkıntılarının selektif kaybına bağlı saf albuminüri": "Podosit ayak çıkıntılarının selektif kaybı minimal değişiklik hastalığının temel mekanizmasıdır. Bu durumda nefrotik sendrom, belirgin albuminüri, ödem ve genellikle aktif idrar sedimenti olmaması beklenir. Hastada ana bulgu makroskopik hematüri, dismorfik eritrosit ve eritrosit silendiridir; proteinüri nefrotik düzeyde değildir. Bu yüzden podosit kaynaklı saf nefrotik patern bu vakadaki aktif glomerüler hematüriyi açıklamaz.",
        "Ürik asit kristallerinin toplayıcı sistemde obstrüksiyon oluşturması": "Ürik asit kristallerine bağlı obstrüksiyon taş hastalığı veya tümör lizis gibi durumlarda düşünülebilir. Kolik tarzda yan ağrısı, kristalüri, hidronefroz veya belirgin akut obstrüktif böbrek hasarı beklenebilir. Bu hastada idrar mikroskobisinde dismorfik eritrosit ve eritrosit silendiri vardır; bu bulgular taş kaynaklı alt/üst üriner sistem kanamasından çok glomerüler kaynağı destekler. Bu nedenle kristal obstrüksiyonu ana mekanizma değildir."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v290",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V289 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v290-new-642-dis-eti-kanamasi-morarma-ve-lokopeni",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Diş eti kanaması, morarma ve lökosit anormalliği",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Kanama bulguları ve DIC benzeri laboratuvar paterniyle gelen akut promiyelositik lösemide tedaviyi geciktirmeme kararını verme.",
      "learningTarget": "APL şüphesinde ATRA’nın moleküler doğrulama beklenmeden başlanmasının kanama mortalitesi açısından önemini kavrama.",
      "demographics": "34 yaşında kadın hasta",
      "setting": "Hematoloji acil değerlendirme alanı",
      "chiefComplaint": "Hasta, diş eti kanaması ve son günlerde artan morluklar nedeniyle acil hematoloji değerlendirmesine alınıyor.",
      "stem": "Hasta bir haftadır diş fırçalarken kanamasının durmadığını, son üç gündür kollarında ve bacaklarında kendiliğinden morluklar çıktığını anlatır. Dün gece burun kanaması olmuş ve evde baskıyla ancak uzun sürede durmuş. Son haftalarda belirgin ateş veya kilo kaybı olmadığını, yeni bir kan sulandırıcı ilaç kullanmadığını söyler. Baş ağrısı, görme kaybı, göğüs ağrısı veya nefes darlığı eşlik etmemiştir. Daha önce benzer kanama atağı yaşamamıştır ve ailesinde bilinen kanama bozukluğu yoktur.",
      "patientIntro": {
        "profile": "34 yaşında kadın hasta, Hematoloji acil değerlendirme alanı başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, diş eti kanaması ve son günlerde artan morluklar nedeniyle acil hematoloji değerlendirmesine alınıyor.",
        "historySummary": "Hasta bir haftadır diş fırçalarken kanamasının durmadığını, son üç gündür kollarında ve bacaklarında kendiliğinden morluklar çıktığını anlatır. Dün gece burun kanaması olmuş ve evde baskıyla ancak uzun sürede durmuş. Son haftalarda belirgin ateş veya kilo kaybı olmadığını, yeni bir kan sulandırıcı ilaç kullanmadığını söyler. Baş ağrısı, görme kaybı, göğüs ağrısı veya nefes darlığı eşlik etmemiştir. Daha önce benzer kanama atağı yaşamamıştır ve ailesinde bilinen kanama bozukluğu yoktur."
      },
      "vitals": {
        "TA": "116/72 mmHg",
        "Nabız": "104/dk",
        "Solunum": "18/dk",
        "SpO2": "%98, oda havasında",
        "Ateş": "37.4 °C",
        "Şok indeksi": "0.90; ekstremiteler sıcak, kapiller dolum 2 sn"
      },
      "exam": [
        "Diş etlerinde sızıntı tarzında kanama ve yaygın ekimozlar izleniyor.",
        "Peteşiler özellikle alt ekstremitelerde belirgin.",
        "Lenf nodu büyümesi belirgin değil, dalak ucu ele gelmiyor.",
        "Nörolojik muayene doğal; aktif masif kanama bulgusu yok."
      ],
      "investigations": [
        {
          "id": "v290-new-642-dis-eti-kanamasi-morarma-ve-lokopeni-tam-kan",
          "label": "Tam kan sayımı",
          "title": "Tam kan sayımı",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Tam kan sayımı",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Sitopeni ve atipik hücre varlığı akut hematolojik süreç için uyarıcıdır.",
          "clinicalMeaning": "Sitopeni ve atipik hücre varlığı akut hematolojik süreç için uyarıcıdır.",
          "result": {
            "title": "Tam kan sayımı",
            "summary": "Sitopeni ve atipik hücre varlığı akut hematolojik süreç için uyarıcıdır.",
            "interpretation": "Sitopeni ve atipik hücre varlığı akut hematolojik süreç için uyarıcıdır.",
            "values": [
              [
                "Lökosit",
                "18.600/µL",
                "4.000-10.000/µL",
                "Yüksek"
              ],
              [
                "Hemoglobin",
                "9.2 g/dL",
                "12-16 g/dL",
                "Düşük"
              ],
              [
                "Trombosit",
                "28.000/µL",
                "150.000-400.000/µL",
                "Düşük"
              ],
              [
                "Mutlak nötrofil",
                "900/µL",
                ">1.500/µL",
                "Düşük"
              ]
            ],
            "rows": [
              [
                "Lökosit",
                "18.600/µL",
                "4.000-10.000/µL",
                "Yüksek"
              ],
              [
                "Hemoglobin",
                "9.2 g/dL",
                "12-16 g/dL",
                "Düşük"
              ],
              [
                "Trombosit",
                "28.000/µL",
                "150.000-400.000/µL",
                "Düşük"
              ],
              [
                "Mutlak nötrofil",
                "900/µL",
                ">1.500/µL",
                "Düşük"
              ]
            ]
          }
        },
        {
          "id": "v290-new-642-dis-eti-kanamasi-morarma-ve-lokopeni-koagulasyon",
          "label": "Koagülasyon paneli",
          "title": "Koagülasyon paneli",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Koagülasyon paneli",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Tüketim koagülopatisi ve fibrinoliz aktivasyonu ile uyumlu riskli patern vardır.",
          "clinicalMeaning": "Tüketim koagülopatisi ve fibrinoliz aktivasyonu ile uyumlu riskli patern vardır.",
          "result": {
            "title": "Koagülasyon paneli",
            "summary": "Tüketim koagülopatisi ve fibrinoliz aktivasyonu ile uyumlu riskli patern vardır.",
            "interpretation": "Tüketim koagülopatisi ve fibrinoliz aktivasyonu ile uyumlu riskli patern vardır.",
            "values": [
              [
                "PT/INR",
                "1.8",
                "0.8-1.2",
                "Uzamış"
              ],
              [
                "aPTT",
                "48 sn",
                "25-35 sn",
                "Uzamış"
              ],
              [
                "Fibrinojen",
                "92 mg/dL",
                "200-400 mg/dL",
                "Düşük"
              ],
              [
                "D-dimer",
                ">20.000 ng/mL",
                "<500 ng/mL",
                "Çok yüksek"
              ]
            ],
            "rows": [
              [
                "PT/INR",
                "1.8",
                "0.8-1.2",
                "Uzamış"
              ],
              [
                "aPTT",
                "48 sn",
                "25-35 sn",
                "Uzamış"
              ],
              [
                "Fibrinojen",
                "92 mg/dL",
                "200-400 mg/dL",
                "Düşük"
              ],
              [
                "D-dimer",
                ">20.000 ng/mL",
                "<500 ng/mL",
                "Çok yüksek"
              ]
            ]
          }
        },
        {
          "id": "v290-new-642-dis-eti-kanamasi-morarma-ve-lokopeni-periferik-yayma",
          "label": "Periferik yayma",
          "title": "Periferik yayma",
          "type": "hematology",
          "priority": "important",
          "subtype": "Periferik yayma",
          "category": "hematology",
          "testTypeCategory": "hematology",
          "summary": "Anormal granüllü promiyelosit ağırlıklı görünüm bildiriliyor.",
          "clinicalMeaning": "Anormal granüllü promiyelosit ağırlıklı görünüm bildiriliyor.",
          "result": {
            "title": "Periferik yayma",
            "summary": "Anormal granüllü promiyelosit ağırlıklı görünüm bildiriliyor.",
            "interpretation": "Anormal granüllü promiyelosit ağırlıklı görünüm bildiriliyor.",
            "findings": [
              "Çok sayıda granüllü promiyelosit benzeri hücre.",
              "Auer rod kümelenmeleri görülen hücreler mevcut.",
              "Şistosit belirginliği ön planda değil."
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada en uygun acil hematolojik yaklaşım aşağıdakilerden hangisidir?",
      "questionType": "treatment",
      "answerTarget": "Acil tedavi",
      "diagnosis": {
        "correct": "All-trans retinoik asidi koagülasyon desteğiyle birlikte hemen başlamak",
        "options": [
          "Kemik iliği biyopsi sonucunu bekleyip tedaviyi moleküler doğrulamadan sonra başlatmak",
          "Sadece trombosit süspansiyonu verip sitotoksik tedaviyi taburculuk kontrolüne bırakmak",
          "Lökoferez yapıp antikoagülan tedaviyle D-dimer yüksekliğini izlemek",
          "All-trans retinoik asidi koagülasyon desteğiyle birlikte hemen başlamak",
          "Yüksek doz metotreksat ve folinik asit kurtarma tedavisine geçmek"
        ],
        "question": "Bu hastada en uygun acil hematolojik yaklaşım aşağıdakilerden hangisidir?",
        "explanation": "Kanama bulguları, trombositopeni, düşük fibrinojen, yüksek D-dimer ve promiyelositik periferik yayma görünümü APL şüphesini doğurur. APL’de kanama mortalitesi nedeniyle ATRA moleküler doğrulama beklenmeden başlanmalı; eş zamanlı olarak trombosit ve fibrinojen hedeflerine yönelik yoğun koagülasyon desteği verilmelidir. Bu yaklaşım tanısal testlerin gönderilmesini engellemez, sadece tedavi gecikmesini önler.",
        "pearls": [
          "APL şüphesinde ATRA bekletilmez.",
          "Düşük fibrinojen + yüksek D-dimer + mukozal kanama DIC benzeri koagülopatiyi gösterir.",
          "Destek transfüzyonu gerekir ama hastalık spesifik tedavinin yerini tutmaz."
        ],
        "optionFeedback": {
          "Kemik iliği biyopsi sonucunu bekleyip tedaviyi moleküler doğrulamadan sonra başlatmak": "Lösemi alt tipini doğrulamak önemlidir; ancak bu klinik tabloda tedaviyi moleküler doğrulamaya kadar beklemek tehlikelidir. Diş eti kanaması, yaygın morarma, promiyelosit ağırlıklı periferik yayma, düşük fibrinojen ve yüksek D-dimer akut promiyelositik lösemiye eşlik eden ağır koagülopati riskini gösterir. APL’de erken ölümün en önemli nedeni kanamadır ve ATRA şüphe oluşur oluşmaz başlanmalıdır. Moleküler testler gönderilir, fakat tedavi geciktirilmez.",
          "Sadece trombosit süspansiyonu verip sitotoksik tedaviyi taburculuk kontrolüne bırakmak": "Trombosit desteği APL koagülopatisinde gereklidir; ancak tek başına yeterli değildir. Altta yatan promiyelosit farklılaşma blokajı devam ettiği sürece koagülopati ve kanama riski sürer. Bu hasta aktif mukozal kanama, düşük fibrinojen ve DIC benzeri laboratuvar paternine sahiptir; yalnız transfüzyonla taburculuk planlamak ciddi hata olur. Destek tedavisi ATRA ile birlikte yürütülmelidir.",
          "Lökoferez yapıp antikoagülan tedaviyle D-dimer yüksekliğini izlemek": "Lökoferez bazı hiperlökositoz durumlarında düşünülebilir; ancak APL’de koagülopati ve promiyelosit biyolojisi nedeniyle mekanik lökosit azaltma ilk ve tek çözüm değildir. Ayrıca D-dimer yüksekliği trombozdan çok tüketim koagülopatisi ve fibrinoliz aktivasyonunu yansıtır; antikoagülan başlamak aktif kanaması olan hastada bu vaka için doğru klinik hedef değildir. Bu hastanın önceliği farklılaşma tedavisi ve kan ürünleriyle koagülasyon desteğidir. Lökoferez seçeneği, APL’nin acil tedavi mantığını kaçırdığı için yanlıştır.",
          "All-trans retinoik asidi koagülasyon desteğiyle birlikte hemen başlamak": "Bu seçenek en uygundur. Mukozal kanama, ekimozlar, periferik yaymada promiyelosit ağırlığı, düşük fibrinojen, uzamış PT/aPTT ve yüksek D-dimer APL ile ilişkili koagülopatiyi güçlü biçimde destekler. ATRA, PML-RARA ilişkili farklılaşma blokajını hedefleyerek promiyelositlerin olgunlaşmasını sağlar ve kanama riskini azaltmaya yönelik hastalık spesifik acil tedavidir. Tanı için genetik testler gönderilir, fakat ATRA başlamak için sonuç beklenmez. Aynı anda trombosit, kriyopresipitat/taze donmuş plazma gibi desteklerle fibrinojen ve trombosit hedefleri korunur.",
          "Yüksek doz metotreksat ve folinik asit kurtarma tedavisine geçmek": "Yüksek doz metotreksat belirli lenfoid malignitelerde veya santral sinir sistemi tutulumu gibi özel durumlarda kullanılan bir rejimdir; APL’nin acil başlangıç tedavisi değildir. Bu hastada temel sorun folat metabolizması hedeflenerek çözülecek bir proliferasyon değil, PML-RARA aracılı farklılaşma blokajı ve buna eşlik eden ölümcül koagülopatidir. Metotreksat hem yanlış hastalık biyolojisini hedefler hem de kanama riski olan hastada gereksiz toksisite oluşturur. Doğru yaklaşım ATRA ve koagülasyon desteğidir."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "APL’de PML-RARA füzyonu promiyelosit farklılaşmasını durdurur; ATRA bu blokajı hedefleyerek olgunlaşmayı başlatır.",
      "examPearl": "Kanayan hasta + promiyelosit + düşük fibrinojen: genetik sonucu bekleme, ATRA + koagülasyon desteği düşün.",
      "whyCorrect": "Doğru seçenek hem hastalık biyolojisini hem de erken ölüm nedeni olan koagülopatiyi aynı anda hedefler.",
      "optionComparison": "Biyopsi/genetik beklemek geciktirir; sadece trombosit desteği eksiktir; lökoferez-antikoagülasyon yanlış önceliktir; metotreksat APL biyolojisini hedeflemez.",
      "evidenceChain": [
        "Diş eti ve burun kanaması → aktif mukozal kanama riski.",
        "Trombosit 28.000/µL ve fibrinojen 92 mg/dL → ciddi kanama zemini.",
        "D-dimer >20.000 ng/mL → fibrinoliz/tüketim koagülopatisi aktivasyonu.",
        "Promiyelosit ve Auer rod kümeleri → APL şüphesini tedavi başlatacak kadar güçlendirir."
      ],
      "whyWrong": {
        "Kemik iliği biyopsi sonucunu bekleyip tedaviyi moleküler doğrulamadan sonra başlatmak": "Lösemi alt tipini doğrulamak önemlidir; ancak bu klinik tabloda tedaviyi moleküler doğrulamaya kadar beklemek tehlikelidir. Diş eti kanaması, yaygın morarma, promiyelosit ağırlıklı periferik yayma, düşük fibrinojen ve yüksek D-dimer akut promiyelositik lösemiye eşlik eden ağır koagülopati riskini gösterir. APL’de erken ölümün en önemli nedeni kanamadır ve ATRA şüphe oluşur oluşmaz başlanmalıdır. Moleküler testler gönderilir, fakat tedavi geciktirilmez.",
        "Sadece trombosit süspansiyonu verip sitotoksik tedaviyi taburculuk kontrolüne bırakmak": "Trombosit desteği APL koagülopatisinde gereklidir; ancak tek başına yeterli değildir. Altta yatan promiyelosit farklılaşma blokajı devam ettiği sürece koagülopati ve kanama riski sürer. Bu hasta aktif mukozal kanama, düşük fibrinojen ve DIC benzeri laboratuvar paternine sahiptir; yalnız transfüzyonla taburculuk planlamak ciddi hata olur. Destek tedavisi ATRA ile birlikte yürütülmelidir.",
        "Lökoferez yapıp antikoagülan tedaviyle D-dimer yüksekliğini izlemek": "Lökoferez bazı hiperlökositoz durumlarında düşünülebilir; ancak APL’de koagülopati ve promiyelosit biyolojisi nedeniyle mekanik lökosit azaltma ilk ve tek çözüm değildir. Ayrıca D-dimer yüksekliği trombozdan çok tüketim koagülopatisi ve fibrinoliz aktivasyonunu yansıtır; antikoagülan başlamak aktif kanaması olan hastada bu vaka için doğru klinik hedef değildir. Bu hastanın önceliği farklılaşma tedavisi ve kan ürünleriyle koagülasyon desteğidir. Lökoferez seçeneği, APL’nin acil tedavi mantığını kaçırdığı için yanlıştır.",
        "Yüksek doz metotreksat ve folinik asit kurtarma tedavisine geçmek": "Yüksek doz metotreksat belirli lenfoid malignitelerde veya santral sinir sistemi tutulumu gibi özel durumlarda kullanılan bir rejimdir; APL’nin acil başlangıç tedavisi değildir. Bu hastada temel sorun folat metabolizması hedeflenerek çözülecek bir proliferasyon değil, PML-RARA aracılı farklılaşma blokajı ve buna eşlik eden ölümcül koagülopatidir. Metotreksat hem yanlış hastalık biyolojisini hedefler hem de kanama riski olan hastada gereksiz toksisite oluşturur. Doğru yaklaşım ATRA ve koagülasyon desteğidir."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v290",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V289 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v290-new-643-biyolojik-tedavi-oncesi-pozitif-tarama",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Biyolojik tedavi öncesi pozitif tarama testi",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Anti-TNF başlanacak hastada aktif hastalık bulgusu olmadan pozitif latent tüberküloz taramasını yönetme.",
      "learningTarget": "TNF-alfa blokajının granülom kontrolünü bozarak latent TB reaktivasyon riskini artırdığını ve tarama-önleyici tedavi mantığını kavrama.",
      "demographics": "41 yaşında erkek hasta",
      "setting": "Romatoloji polikliniği",
      "chiefComplaint": "Hasta, dirençli inflamatuvar bel ağrısı nedeniyle planlanan biyolojik tedavi öncesi tarama sonucuyla romatoloji polikliniğinde değerlendiriliyor.",
      "stem": "Hasta üç yıldır sabah tutukluğu ve gece artan bel ağrısı yaşadığını, NSAİİ ile yanıtının son aylarda azaldığını anlatır. Romatoloji ekibi anti-TNF tedavi planladığında yapılan tarama testinin pozitif çıktığını öğrenmiş ve bunun ne anlama geldiğini sormak için kontrole gelmiştir. Çocukluğunda aynı evde yaşayan dedesinin aylarca tüberküloz tedavisi aldığını hatırladığını söyler. Son aylarda ateş, gece terlemesi, istemsiz kilo kaybı, iki haftadan uzun öksürük veya kanlı balgam tariflemez. Daha önce tüberküloz tedavisi almadığını, karaciğer hastalığı veya düzenli alkol kullanımı olmadığını belirtir.",
      "patientIntro": {
        "profile": "41 yaşında erkek hasta, Romatoloji polikliniği başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, dirençli inflamatuvar bel ağrısı nedeniyle planlanan biyolojik tedavi öncesi tarama sonucuyla romatoloji polikliniğinde değerlendiriliyor.",
        "historySummary": "Hasta üç yıldır sabah tutukluğu ve gece artan bel ağrısı yaşadığını, NSAİİ ile yanıtının son aylarda azaldığını anlatır. Romatoloji ekibi anti-TNF tedavi planladığında yapılan tarama testinin pozitif çıktığını öğrenmiş ve bunun ne anlama geldiğini sormak için kontrole gelmiştir. Çocukluğunda aynı evde yaşayan dedesinin aylarca tüberküloz tedavisi aldığını hatırladığını söyler. Son aylarda ateş, gece terlemesi, istemsiz kilo kaybı, iki haftadan uzun öksürük veya kanlı balgam tariflemez. Daha önce tüberküloz tedavisi almadığını, karaciğer hastalığı veya düzenli alkol kullanımı olmadığını belirtir."
      },
      "vitals": {
        "TA": "122/74 mmHg",
        "Nabız": "78/dk",
        "Solunum": "15/dk",
        "SpO2": "%99, oda havasında",
        "Ateş": "36.5 °C",
        "Şok indeksi": "0.64; perfüzyon iyi"
      },
      "exam": [
        "Genel durumu iyi, kaşeksi veya toksik görünüm yok.",
        "Akciğer oskültasyonu doğal, ral veya kaviter hastalığı düşündüren lokal bulgu yok.",
        "Periferik lenfadenopati saptanmıyor.",
        "Sakroiliak hassasiyet mevcut; ciltte aktif enfeksiyon odağı yok."
      ],
      "investigations": [
        {
          "id": "v290-new-643-biyolojik-tedavi-oncesi-pozitif-tarama-tarama",
          "label": "Tüberküloz taraması",
          "title": "Tüberküloz taraması",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Tüberküloz taraması",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "IGRA pozitifliği immünolojik temas/enfeksiyon bulgusudur; aktif hastalık değerlendirmesiyle birlikte yorumlanır.",
          "clinicalMeaning": "IGRA pozitifliği immünolojik temas/enfeksiyon bulgusudur; aktif hastalık değerlendirmesiyle birlikte yorumlanır.",
          "result": {
            "title": "Tüberküloz taraması",
            "summary": "IGRA pozitifliği immünolojik temas/enfeksiyon bulgusudur; aktif hastalık değerlendirmesiyle birlikte yorumlanır.",
            "interpretation": "IGRA pozitifliği immünolojik temas/enfeksiyon bulgusudur; aktif hastalık değerlendirmesiyle birlikte yorumlanır.",
            "values": [
              [
                "IGRA",
                "Pozitif",
                "Negatif",
                "Pozitif"
              ],
              [
                "TST",
                "16 mm endürasyon",
                "Risk grubunda ≥10 mm pozitif kabul edilir",
                "Pozitif"
              ],
              [
                "CRP",
                "18 mg/L",
                "<5 mg/L",
                "Hafif yüksek"
              ],
              [
                "ALT",
                "24 U/L",
                "<45 U/L",
                "Normal"
              ]
            ],
            "rows": [
              [
                "IGRA",
                "Pozitif",
                "Negatif",
                "Pozitif"
              ],
              [
                "TST",
                "16 mm endürasyon",
                "Risk grubunda ≥10 mm pozitif kabul edilir",
                "Pozitif"
              ],
              [
                "CRP",
                "18 mg/L",
                "<5 mg/L",
                "Hafif yüksek"
              ],
              [
                "ALT",
                "24 U/L",
                "<45 U/L",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v290-new-643-biyolojik-tedavi-oncesi-pozitif-tarama-akciger-grafisi",
          "label": "Akciğer grafisi",
          "title": "Akciğer grafisi",
          "type": "imaging",
          "priority": "important",
          "subtype": "Akciğer grafisi",
          "category": "imaging",
          "testTypeCategory": "imaging",
          "summary": "Aktif pulmoner tüberkülozu destekleyen belirgin radyolojik bulgu yok.",
          "clinicalMeaning": "Aktif pulmoner tüberkülozu destekleyen belirgin radyolojik bulgu yok.",
          "result": {
            "title": "Akciğer grafisi",
            "summary": "Aktif pulmoner tüberkülozu destekleyen belirgin radyolojik bulgu yok.",
            "interpretation": "Aktif pulmoner tüberkülozu destekleyen belirgin radyolojik bulgu yok.",
            "findings": [
              "Akciğer alanları açık.",
              "Kavite, apikal infiltrasyon veya miliyer patern izlenmiyor.",
              "Hiler belirgin patolojik lenfadenopati saptanmıyor."
            ]
          }
        },
        {
          "id": "v290-new-643-biyolojik-tedavi-oncesi-pozitif-tarama-mikrobiyoloji",
          "label": "Mikrobiyolojik değerlendirme",
          "title": "Mikrobiyolojik değerlendirme",
          "type": "laboratory",
          "priority": "important",
          "subtype": "Mikrobiyolojik değerlendirme",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Aktif solunum yolu hastalığına ait balgam bulgusu yoktur; klinik aktif TB lehine değildir.",
          "clinicalMeaning": "Aktif solunum yolu hastalığına ait balgam bulgusu yoktur; klinik aktif TB lehine değildir.",
          "result": {
            "title": "Mikrobiyolojik değerlendirme",
            "summary": "Aktif solunum yolu hastalığına ait balgam bulgusu yoktur; klinik aktif TB lehine değildir.",
            "interpretation": "Aktif solunum yolu hastalığına ait balgam bulgusu yoktur; klinik aktif TB lehine değildir.",
            "values": [
              [
                "Balgam örneği",
                "Hasta balgam çıkaramıyor",
                "Uygun semptom varsa örneklenir",
                "Semptom yok"
              ],
              [
                "HIV Ag/Ab",
                "Negatif",
                "Negatif",
                "Negatif"
              ],
              [
                "HBsAg",
                "Negatif",
                "Negatif",
                "Negatif"
              ]
            ],
            "rows": [
              [
                "Balgam örneği",
                "Hasta balgam çıkaramıyor",
                "Uygun semptom varsa örneklenir",
                "Semptom yok"
              ],
              [
                "HIV Ag/Ab",
                "Negatif",
                "Negatif",
                "Negatif"
              ],
              [
                "HBsAg",
                "Negatif",
                "Negatif",
                "Negatif"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada anti-TNF tedavi öncesi en uygun yaklaşım aşağıdakilerden hangisidir?",
      "questionType": "management",
      "answerTarget": "Yönetim",
      "diagnosis": {
        "correct": "Aktif hastalık dışlandıktan sonra latent tüberküloz tedavisi başlamak ve biyolojik tedaviyi ertelemek",
        "options": [
          "Semptom olmadığı için anti-TNF tedaviyi aynı gün başlamak ve test sonucunu önemsememek",
          "Aktif hastalık dışlandıktan sonra latent tüberküloz tedavisi başlamak ve biyolojik tedaviyi ertelemek",
          "BCG aşısı yapıp anti-TNF tedaviyi aşıdan bir hafta sonra başlamak",
          "Dört ilaçlı aktif tüberküloz tedavisi başlamak ve balgam kültürü pozitifleşene kadar izolasyon uygulamak",
          "Tek doz geniş spektrumlu antibiyotik verip ateş gelişirse yeniden değerlendirmek"
        ],
        "question": "Bu hastada anti-TNF tedavi öncesi en uygun yaklaşım aşağıdakilerden hangisidir?",
        "explanation": "Anti-TNF tedavi latent tüberküloz reaktivasyonu açısından risklidir. Pozitif IGRA/TST ve temas öyküsü varken aktif hastalık bulguları yoksa önce aktif TB dışlanır, ardından latent tüberküloz tedavisi başlanır ve biyolojik tedavi uygun süre ertelenir. Aktif hastalık bulgusu olmadığı için doğrudan RIPE tedavisi gerekmez; fakat tarama pozitifliğini yok saymak da güvenli değildir.",
        "pearls": [
          "Anti-TNF öncesi latent TB taraması pozitifse aktif hastalık dışlanmalıdır.",
          "Grafi ve semptom yokluğu aktif hastalığı zayıflatır ama latent enfeksiyonu yok saydırmaz.",
          "Latent TB tedavisi reaktivasyon riskini azaltmak için biyolojik tedaviden önce planlanır."
        ],
        "optionFeedback": {
          "Semptom olmadığı için anti-TNF tedaviyi aynı gün başlamak ve test sonucunu önemsememek": "Semptom olmaması latent enfeksiyon riskini ortadan kaldırmaz. TNF-alfa, granülom bütünlüğü ve mikobakteri kontrolünde kritik rol oynar; anti-TNF tedavi latent enfeksiyonun aktif hastalığa ilerleme riskini artırabilir. Bu hastada IGRA pozitiftir ve akciğer grafisi aktif hastalık göstermese de riskli immünsupresyon planlanmaktadır. Test sonucunu yok sayarak aynı gün anti-TNF başlamak, ileride reaktivasyon riskini artıran hatalı yaklaşımdır.",
          "Aktif hastalık dışlandıktan sonra latent tüberküloz tedavisi başlamak ve biyolojik tedaviyi ertelemek": "Bu seçenek en uygundur. Anti-TNF başlanacak hastada IGRA pozitifliği, eski temas öyküsü ve aktif hastalık bulgularının olmaması latent tüberküloz enfeksiyonu ile uyumludur. Önce aktif tüberküloz semptom, akciğer grafisi ve gerektiğinde mikrobiyolojik incelemeyle dışlanır; ardından uygun latent TB tedavisi başlanır ve biyolojik tedavi güvenli zamanlama ile ertelenir. Amaç aktif hastalığı tedavi etmek değil, immünsupresyonla reaktivasyonu önlemektir. TUS açısından anti-TNF öncesi tarama pozitifse “semptomsuz, grafi normal” diye görmezden gelinmez.",
          "BCG aşısı yapıp anti-TNF tedaviyi aşıdan bir hafta sonra başlamak": "BCG aşısı erişkinde latent enfeksiyon tedavisi yerine geçmez ve anti-TNF öncesi reaktivasyon riskini ortadan kaldırmaz. Canlı aşıların immünsupresyon planlanan hastalarda zamanlaması ayrıca dikkat gerektirir. Bu hastada sorun korunma amaçlı aşı eksikliği değil, IGRA ile gösterilmiş immünolojik temas/enfeksiyon bulgusudur. Bu nedenle BCG yapmak doğru klinik hedef değildir.",
          "Dört ilaçlı aktif tüberküloz tedavisi başlamak ve balgam kültürü pozitifleşene kadar izolasyon uygulamak": "Dört ilaçlı aktif tüberküloz tedavisi; öksürük, ateş, gece terlemesi, kilo kaybı, radyolojik infiltrasyon/kavite veya mikrobiyolojik kanıt gibi aktif hastalık bulguları varsa gerekir. Bu hastada semptom yok, akciğer grafisi normal ve balgam çıkarma yakınması yoktur. Aktif hastalık dışlandıktan sonra tablo latent enfeksiyon yönetimine girer; gereksiz RIPE tedavisi toksisite ve yanlış sınıflama riski taşır. Ancak aktif hastalık şüphesi doğarsa yaklaşım değişir.",
          "Tek doz geniş spektrumlu antibiyotik verip ateş gelişirse yeniden değerlendirmek": "Geniş spektrumlu antibiyotikler bakteriyel enfeksiyonların ampirik tedavisinde kullanılabilir; latent tüberküloz enfeksiyonunu ortadan kaldırmaz. Ateş çıkmasını beklemek, anti-TNF öncesi önleyici strateji mantığına aykırıdır. Burada hedef aktif enfeksiyon tedavisi değil, immünsupresyon öncesi reaktivasyon riskinin azaltılmasıdır. Bu nedenle antibiyotik ve bekle-gör yaklaşımı bilimsel ve klinik olarak bu vaka için doğru klinik hedef değildir."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "TNF-alfa granülom organizasyonu ve mikobakteri kontrolünde önemlidir; TNF blokajı latent enfeksiyonun aktifleşme riskini artırır.",
      "examPearl": "Anti-TNF öncesi IGRA pozitif + grafi normal + semptom yok: aktif TB’yi dışla, latent TB tedavisini başla, biyolojik tedaviyi ertele.",
      "whyCorrect": "Doğru seçenek aktif ve latent enfeksiyon ayrımını yaparak reaktivasyon riskini önlemeye yönelir.",
      "optionComparison": "Aynı gün anti-TNF başlamak riski yok sayar; BCG latent enfeksiyonu tedavi etmez; RIPE aktif hastalık içindir; geniş spektrumlu antibiyotik latent TB’ye etkisizdir.",
      "evidenceChain": [
        "Anti-TNF planı → latent TB reaktivasyonu açısından yüksek riskli bağlam.",
        "IGRA ve TST pozitifliği → önceki mikobakteri teması/enfeksiyon olasılığı.",
        "Ateş, gece terlemesi, uzun öksürük ve grafi bulgusu olmaması → aktif pulmoner TB lehine güçlü veri yok.",
        "Karaciğer testlerinin normal olması → latent TB tedavisi planlamasında başlangıç güvenlik verisi sağlar."
      ],
      "whyWrong": {
        "Semptom olmadığı için anti-TNF tedaviyi aynı gün başlamak ve test sonucunu önemsememek": "Semptom olmaması latent enfeksiyon riskini ortadan kaldırmaz. TNF-alfa, granülom bütünlüğü ve mikobakteri kontrolünde kritik rol oynar; anti-TNF tedavi latent enfeksiyonun aktif hastalığa ilerleme riskini artırabilir. Bu hastada IGRA pozitiftir ve akciğer grafisi aktif hastalık göstermese de riskli immünsupresyon planlanmaktadır. Test sonucunu yok sayarak aynı gün anti-TNF başlamak, ileride reaktivasyon riskini artıran hatalı yaklaşımdır.",
        "BCG aşısı yapıp anti-TNF tedaviyi aşıdan bir hafta sonra başlamak": "BCG aşısı erişkinde latent enfeksiyon tedavisi yerine geçmez ve anti-TNF öncesi reaktivasyon riskini ortadan kaldırmaz. Canlı aşıların immünsupresyon planlanan hastalarda zamanlaması ayrıca dikkat gerektirir. Bu hastada sorun korunma amaçlı aşı eksikliği değil, IGRA ile gösterilmiş immünolojik temas/enfeksiyon bulgusudur. Bu nedenle BCG yapmak doğru klinik hedef değildir.",
        "Dört ilaçlı aktif tüberküloz tedavisi başlamak ve balgam kültürü pozitifleşene kadar izolasyon uygulamak": "Dört ilaçlı aktif tüberküloz tedavisi; öksürük, ateş, gece terlemesi, kilo kaybı, radyolojik infiltrasyon/kavite veya mikrobiyolojik kanıt gibi aktif hastalık bulguları varsa gerekir. Bu hastada semptom yok, akciğer grafisi normal ve balgam çıkarma yakınması yoktur. Aktif hastalık dışlandıktan sonra tablo latent enfeksiyon yönetimine girer; gereksiz RIPE tedavisi toksisite ve yanlış sınıflama riski taşır. Ancak aktif hastalık şüphesi doğarsa yaklaşım değişir.",
        "Tek doz geniş spektrumlu antibiyotik verip ateş gelişirse yeniden değerlendirmek": "Geniş spektrumlu antibiyotikler bakteriyel enfeksiyonların ampirik tedavisinde kullanılabilir; latent tüberküloz enfeksiyonunu ortadan kaldırmaz. Ateş çıkmasını beklemek, anti-TNF öncesi önleyici strateji mantığına aykırıdır. Burada hedef aktif enfeksiyon tedavisi değil, immünsupresyon öncesi reaktivasyon riskinin azaltılmasıdır. Bu nedenle antibiyotik ve bekle-gör yaklaşımı bilimsel ve klinik olarak bu vaka için doğru klinik hedef değildir."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v290",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V289 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v291-new-644-sabaha-karsi-gelen-gogus-sikismasi",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Sabaha karşı gelen göğüs sıkışması",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "İstirahatte gelen geçici ST elevasyonlu göğüs ağrısında kalıcı oklüzyon, stabil angina ve koroner vazospazm mekanizmalarını ayırma.",
      "learningTarget": "Vazospastik anginada geçici epikardiyal spazm, nitrat yanıtı ve geçici EKG değişikliklerinin klinik anlamını kavrama.",
      "demographics": "52 yaşında erkek hasta",
      "setting": "Acil servis",
      "chiefComplaint": "Hasta, sabaha karşı uykudan uyandıran göğüs sıkışması nedeniyle acil servise başvuruyor.",
      "stem": "Hasta son üç haftadır özellikle sabaha karşı göğsünün ortasında baskı tarzında bir sıkışma ile uyandığını anlatır. Ataklar genellikle 5-10 dakika sürmüş, evde kullandığı dil altı nitratla hızlıca azalmıştır. Gün içinde yürürken ya da merdiven çıkarken aynı ağrının düzenli olarak gelmediğini söyler. Uzun yıllardır sigara içmektedir; bilinen diyabeti yoktur ve daha önce kalp krizi geçirmemiştir. Bu geceki atakta soğuk terleme kısa süre eşlik etmiş, ağrı geçince tamamen rahatlamıştır. Ateş, balgam, bacak şişliği, uzun yolculuk veya göğüs ağrısının nefesle belirgin artması tariflemez.",
      "patientIntro": {
        "profile": "52 yaşında erkek hasta, Acil servis başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, sabaha karşı uykudan uyandıran göğüs sıkışması nedeniyle acil servise başvuruyor.",
        "historySummary": "Hasta son üç haftadır özellikle sabaha karşı göğsünün ortasında baskı tarzında bir sıkışma ile uyandığını anlatır. Ataklar genellikle 5-10 dakika sürmüş, evde kullandığı dil altı nitratla hızlıca azalmıştır. Gün içinde yürürken ya da merdiven çıkarken aynı ağrının düzenli olarak gelmediğini söyler. Uzun yıllardır sigara içmektedir; bilinen diyabeti yoktur ve daha önce kalp krizi geçirmemiştir. Bu geceki atakta soğuk terleme kısa süre eşlik etmiş, ağrı geçince tamamen rahatlamıştır. Ateş, balgam, bacak şişliği, uzun yolculuk veya göğüs ağrısının nefesle belirgin artması tariflemez."
      },
      "vitals": {
        "TA": "128/76 mmHg",
        "Nabız": "84/dk, düzenli",
        "Solunum": "17/dk",
        "SpO2": "%98, oda havasında",
        "Ateş": "36.7 °C",
        "Şok indeksi": "0.66; kapiller dolum <2 sn, periferik perfüzyon iyi"
      },
      "exam": [
        "Genel durumu iyi, konuşurken dispne yok.",
        "Kalp sesleri ritmik, belirgin üfürüm veya sürtünme sesi duyulmuyor.",
        "Akciğer sesleri doğal, ral veya wheezing yok.",
        "Alt ekstremitelerde ödem, hassasiyet veya asimetri izlenmiyor."
      ],
      "investigations": [
        {
          "id": "v291-new-644-sabaha-karsi-gelen-gogus-sikismasi-ekg",
          "label": "Ağrı sırasında ve ağrı geçtikten sonra EKG",
          "title": "Ağrı sırasında ve ağrı geçtikten sonra EKG",
          "type": "ecg",
          "priority": "essential",
          "subtype": "Ağrı sırasında ve ağrı geçtikten sonra EKG",
          "category": "ecg",
          "testTypeCategory": "ecg",
          "summary": "Geçici lokal ST değişikliği dinamik iskemi atağını destekler.",
          "clinicalMeaning": "Geçici lokal ST değişikliği dinamik iskemi atağını destekler.",
          "result": {
            "title": "Ağrı sırasında ve ağrı geçtikten sonra EKG",
            "summary": "Geçici lokal ST değişikliği dinamik iskemi atağını destekler.",
            "interpretation": "Geçici lokal ST değişikliği dinamik iskemi atağını destekler.",
            "values": [
              [
                "Ağrı sırasında EKG",
                "II, III, aVF’de 1-2 mm ST elevasyonu",
                "Beklenmez",
                "Geçici değişiklik"
              ],
              [
                "Ağrı geçtikten 20 dk sonra EKG",
                "ST segmentleri izoelektrik hatta dönmüş",
                "Normal",
                "Dinamik düzelme"
              ],
              [
                "Ritim",
                "Sinüs ritmi, 84/dk",
                "Sinüs ritmi",
                "Stabil"
              ]
            ],
            "rows": [
              [
                "Ağrı sırasında EKG",
                "II, III, aVF’de 1-2 mm ST elevasyonu",
                "Beklenmez",
                "Geçici değişiklik"
              ],
              [
                "Ağrı geçtikten 20 dk sonra EKG",
                "ST segmentleri izoelektrik hatta dönmüş",
                "Normal",
                "Dinamik düzelme"
              ],
              [
                "Ritim",
                "Sinüs ritmi, 84/dk",
                "Sinüs ritmi",
                "Stabil"
              ]
            ]
          }
        },
        {
          "id": "v291-new-644-sabaha-karsi-gelen-gogus-sikismasi-kardiyak-belirtecler",
          "label": "Seri kardiyak belirteçler",
          "title": "Seri kardiyak belirteçler",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Seri kardiyak belirteçler",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Troponin yükselmemesi kalıcı nekroz lehine güçlü veri vermez.",
          "clinicalMeaning": "Troponin yükselmemesi kalıcı nekroz lehine güçlü veri vermez.",
          "result": {
            "title": "Seri kardiyak belirteçler",
            "summary": "Troponin yükselmemesi kalıcı nekroz lehine güçlü veri vermez.",
            "interpretation": "Troponin yükselmemesi kalıcı nekroz lehine güçlü veri vermez.",
            "values": [
              [
                "hs-Troponin T 0. saat",
                "8 ng/L",
                "<14 ng/L",
                "Normal"
              ],
              [
                "hs-Troponin T 3. saat",
                "9 ng/L",
                "<14 ng/L",
                "Yükselme yok"
              ],
              [
                "CK-MB",
                "2.1 ng/mL",
                "<5 ng/mL",
                "Normal"
              ]
            ],
            "rows": [
              [
                "hs-Troponin T 0. saat",
                "8 ng/L",
                "<14 ng/L",
                "Normal"
              ],
              [
                "hs-Troponin T 3. saat",
                "9 ng/L",
                "<14 ng/L",
                "Yükselme yok"
              ],
              [
                "CK-MB",
                "2.1 ng/mL",
                "<5 ng/mL",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v291-new-644-sabaha-karsi-gelen-gogus-sikismasi-koroner-anji",
          "label": "Koroner anjiyografi özeti",
          "title": "Koroner anjiyografi özeti",
          "type": "imaging",
          "priority": "essential",
          "subtype": "Koroner anjiyografi özeti",
          "category": "imaging",
          "testTypeCategory": "imaging",
          "summary": "Kritik sabit darlık gösterilmemesi atak mekanizmasını yeniden düşündürür.",
          "clinicalMeaning": "Kritik sabit darlık gösterilmemesi atak mekanizmasını yeniden düşündürür.",
          "result": {
            "title": "Koroner anjiyografi özeti",
            "summary": "Kritik sabit darlık gösterilmemesi atak mekanizmasını yeniden düşündürür.",
            "interpretation": "Kritik sabit darlık gösterilmemesi atak mekanizmasını yeniden düşündürür.",
            "values": [
              [
                "Sol ana koroner",
                "Kritik darlık yok",
                "Beklenen: açık",
                "Normal"
              ],
              [
                "LAD/LCx/RCA",
                "%20’den az düzensizlikler",
                "Kritik darlık yok",
                "Obstrüktif olmayan"
              ],
              [
                "Sol ventrikül duvar hareketi",
                "Belirgin bölgesel kusur yok",
                "Normal",
                "Nekroz lehine değil"
              ]
            ],
            "rows": [
              [
                "Sol ana koroner",
                "Kritik darlık yok",
                "Beklenen: açık",
                "Normal"
              ],
              [
                "LAD/LCx/RCA",
                "%20’den az düzensizlikler",
                "Kritik darlık yok",
                "Obstrüktif olmayan"
              ],
              [
                "Sol ventrikül duvar hareketi",
                "Belirgin bölgesel kusur yok",
                "Normal",
                "Nekroz lehine değil"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastadaki ağrı ataklarını en iyi açıklayan mekanizma aşağıdakilerden hangisidir?",
      "questionType": "mechanism",
      "answerTarget": "Mekanizma",
      "diagnosis": {
        "correct": "Epikardiyal koroner arter düz kasında geçici vazospazm gelişmesi",
        "options": [
          "Epikardiyal koroner arter düz kasında geçici vazospazm gelişmesi",
          "Stabil aterosklerotik plak üzerinde kalıcı trombotik tıkanıklık oluşması",
          "Miyokard oksijen ihtiyacının yalnızca egzersizle sabit darlığı aşması",
          "Perikard yaprakları arasında inflamatuvar sürtünme ve pozisyonel ağrı oluşması",
          "Pulmoner arter dallarında akut tromboembolik akım kesilmesi"
        ],
        "question": "Bu hastadaki ağrı ataklarını en iyi açıklayan mekanizma aşağıdakilerden hangisidir?",
        "explanation": "Atakların istirahatte ve sabaha karşı gelmesi, nitratla hızla düzelmesi, geçici lokal ST elevasyonu ve seri troponinlerin negatif kalması kalıcı trombotik oklüzyondan çok geçici epikardiyal koroner vazospazm mekanizmasını destekler. Obstrüktif koroner darlık olmaması da klasik eforla tetiklenen sabit darlık mekanizmasını zayıflatır. Bu nedenle temel patofizyoloji koroner arter düz kasında geçici spazm ve buna bağlı geçici transmural iskemi paternidir.",
        "pearls": [
          "İstirahat/gece ağrısı koroner spazm için klasik ipucudur.",
          "Geçici ST elevasyonu ağrı geçince düzeliyorsa dinamik vazomotor mekanizma düşünülür.",
          "Sigara vazospastik angina için önemli tetikleyicilerden biridir."
        ],
        "optionFeedback": {
          "Epikardiyal koroner arter düz kasında geçici vazospazm gelişmesi": "Bu seçenek en uygundur. Hastanın ağrısının sabaha karşı istirahatte gelmesi, kısa sürmesi, nitratla hızla azalması ve ağrı sırasında geçici ST elevasyonu olup ağrı geçince EKG’nin normale dönmesi epikardiyal koroner vazospazm mekanizmasını destekler. Koroner anjiyografide kritik sabit darlık olmaması, troponinlerin negatif seyretmesi ve eforla düzenli tekrarlayan bir ağrı örüntüsünün olmaması da kalıcı trombotik tıkanıklık veya klasik stabil angina mekanizmasını zayıflatır. Bu patern vazospastik anginada görülür; tedavide kalsiyum kanal blokerleri ve nitratlar ön plandadır, sigara bırakılması kritik bir risk azaltıcı basamaktır.",
          "Stabil aterosklerotik plak üzerinde kalıcı trombotik tıkanıklık oluşması": "Kalıcı trombotik tıkanıklık akut miyokard infarktüsünde beklenir; uzun süren göğüs ağrısı, seri troponin yükselmesi ve çoğu zaman kalıcı ST değişikliği veya yeni duvar hareket kusuru ile gider. Bu hastada ağrı kısa ataklar halinde gelmekte, nitratla hızla azalmakta ve seri troponinlerde yükselme izlenmemektedir. Geçici ST elevasyonu trombozda da olabilir; ancak koroner anjiyografide kritik tıkanıklık olmaması ve değişikliklerin ağrı geçince kaybolması vazospazmı daha iyi açıklar. Bu nedenle burada mekanizma kalıcı plak trombozu değildir.",
          "Miyokard oksijen ihtiyacının yalnızca egzersizle sabit darlığı aşması": "Sabit koroner darlığa bağlı klasik stabil anginada ağrı çoğunlukla efor veya emosyonel stresle ortaya çıkar, dinlenme veya nitratla azalır; EKG değişiklikleri genellikle talep artışına bağlı iskemi sırasında görülür. Bu hastada yakınmalar özellikle istirahatte ve sabaha karşı gelmektedir; merdiven çıkarken düzenli ağrı tariflememesi bu mekanizmayı zayıflatır. Anjiyografide kritik sabit darlık olmaması da egzersizle sabit darlığın aşılması mekanizmasını desteklemez. TUS açısından istirahat-gece ağrısı + geçici ST elevasyonu + nitrat yanıtı koroner spazm lehinedir.",
          "Perikard yaprakları arasında inflamatuvar sürtünme ve pozisyonel ağrı oluşması": "Perikardit ağrısı genellikle keskin/plevritik karakterdedir, sırtüstü yatmakla artıp öne eğilmekle azalabilir; yaygın konkav ST elevasyonu ve PR depresyonu görülebilir. Bu hastanın ağrısı kısa süreli bası hissi şeklindedir, nitratla hızla geçmektedir ve EKG değişikliği lokalize/geçicidir. Perikardiyal sürtünme sesi, ateş veya viral prodrom gibi destekleyici veriler de yoktur. Bu nedenle pozisyonel perikardiyal inflamasyon mekanizması bu vakadaki atak paternini açıklamaz.",
          "Pulmoner arter dallarında akut tromboembolik akım kesilmesi": "Pulmoner embolide ani dispne, plöritik göğüs ağrısı, hipoksemi, taşikardi ve risk faktörü öyküsü beklenebilir. Bu hastada SpO2 normaldir, bacak şişliği veya immobilizasyon öyküsü yoktur ve ağrı nitratla hızla düzelmektedir. Geçici ST elevasyonu ve koroner spazmı düşündüren atak örüntüsü pulmoner arter tromboembolisiyle açıklanamaz. Pulmoner emboli bu klinik tabloda önemli bir çeldirici olsa da temel mekanizma değildir."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Vazospastik angina, obstrüktif plak olmadan geçici epikardiyal koroner spazm ile miyokard iskemisi oluşturabilir.",
      "examPearl": "Sabaha karşı istirahat ağrısı + geçici ST elevasyonu + nitrat yanıtı + negatif troponin: koroner vazospazmı düşün.",
      "whyCorrect": "Doğru seçenek, ağrının zamanlamasını, EKG’nin geçiciliğini ve anjiyografide sabit kritik darlık olmamasını tek mekanizmada birleştirir.",
      "optionComparison": "Trombotik tıkanıklık kalıcı nekroz verileriyle, stabil angina eforla, perikardit pozisyonel/plevritik ağrı ile, pulmoner emboli hipoksemi-dispne paternleriyle desteklenirdi.",
      "evidenceChain": [
        "Sabaha karşı istirahatte kısa ataklar → vazomotor tetiklenme lehine zamanlama.",
        "Nitratla hızlı düzelme → düz kas gevşemesiyle spazmın çözülmesini destekler.",
        "Geçici ST elevasyonu → kısa süreli transmural iskemi paternini gösterir.",
        "Seri troponin normal ve anjiyografide kritik darlık yok → kalıcı oklüzyon/infarkt olasılığını azaltır."
      ],
      "whyWrong": {
        "Stabil aterosklerotik plak üzerinde kalıcı trombotik tıkanıklık oluşması": "Kalıcı trombotik tıkanıklık akut miyokard infarktüsünde beklenir; uzun süren göğüs ağrısı, seri troponin yükselmesi ve çoğu zaman kalıcı ST değişikliği veya yeni duvar hareket kusuru ile gider. Bu hastada ağrı kısa ataklar halinde gelmekte, nitratla hızla azalmakta ve seri troponinlerde yükselme izlenmemektedir. Geçici ST elevasyonu trombozda da olabilir; ancak koroner anjiyografide kritik tıkanıklık olmaması ve değişikliklerin ağrı geçince kaybolması vazospazmı daha iyi açıklar. Bu nedenle burada mekanizma kalıcı plak trombozu değildir.",
        "Miyokard oksijen ihtiyacının yalnızca egzersizle sabit darlığı aşması": "Sabit koroner darlığa bağlı klasik stabil anginada ağrı çoğunlukla efor veya emosyonel stresle ortaya çıkar, dinlenme veya nitratla azalır; EKG değişiklikleri genellikle talep artışına bağlı iskemi sırasında görülür. Bu hastada yakınmalar özellikle istirahatte ve sabaha karşı gelmektedir; merdiven çıkarken düzenli ağrı tariflememesi bu mekanizmayı zayıflatır. Anjiyografide kritik sabit darlık olmaması da egzersizle sabit darlığın aşılması mekanizmasını desteklemez. TUS açısından istirahat-gece ağrısı + geçici ST elevasyonu + nitrat yanıtı koroner spazm lehinedir.",
        "Perikard yaprakları arasında inflamatuvar sürtünme ve pozisyonel ağrı oluşması": "Perikardit ağrısı genellikle keskin/plevritik karakterdedir, sırtüstü yatmakla artıp öne eğilmekle azalabilir; yaygın konkav ST elevasyonu ve PR depresyonu görülebilir. Bu hastanın ağrısı kısa süreli bası hissi şeklindedir, nitratla hızla geçmektedir ve EKG değişikliği lokalize/geçicidir. Perikardiyal sürtünme sesi, ateş veya viral prodrom gibi destekleyici veriler de yoktur. Bu nedenle pozisyonel perikardiyal inflamasyon mekanizması bu vakadaki atak paternini açıklamaz.",
        "Pulmoner arter dallarında akut tromboembolik akım kesilmesi": "Pulmoner embolide ani dispne, plöritik göğüs ağrısı, hipoksemi, taşikardi ve risk faktörü öyküsü beklenebilir. Bu hastada SpO2 normaldir, bacak şişliği veya immobilizasyon öyküsü yoktur ve ağrı nitratla hızla düzelmektedir. Geçici ST elevasyonu ve koroner spazmı düşündüren atak örüntüsü pulmoner arter tromboembolisiyle açıklanamaz. Pulmoner emboli bu klinik tabloda önemli bir çeldirici olsa da temel mekanizma değildir."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v291",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V290 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v291-new-645-yorgunluk-eklem-agrisi-ve-transaminaz-yuksekligi",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Yorgunluk, eklem ağrısı ve transaminaz yüksekliği",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Hepatoselüler patern, IgG yüksekliği ve otoantikor birlikteliğinde aktif otoimmün hepatitte tedavi hedefini belirleme.",
      "learningTarget": "Otoimmün hepatitte immün aracılı hepatosit hasarını, viral hepatit ve kolestatik hastalıklardan ayırarak kortikosteroid-azatioprin yaklaşımını kavrama.",
      "demographics": "34 yaşında kadın hasta",
      "setting": "Gastroenteroloji polikliniği",
      "chiefComplaint": "Hasta, giderek artan yorgunluk ve eklem ağrıları nedeniyle değerlendirilmek üzere başvuruyor.",
      "stem": "Hasta yaklaşık iki aydır iş çıkışında belirgin halsizlik yaşadığını, son haftalarda sabahları el bileklerinde ve dizlerinde tutukluk hissinin eklendiğini anlatır. Cildinde belirgin döküntü fark etmemiştir; ancak ara ara göz aklarında sararma olduğunu eşi söylemiştir. Daha önce benzer bir karaciğer problemi yaşamamış, düzenli alkol kullanmadığını ve bitkisel ürün almadığını belirtir. Ailesinde tiroid hastalığı olan bir kız kardeşi vardır. Ateş, titreme, sağ üst kadranda kolik tarzda ağrı, açık renk dışkı veya koyu idrar dönemleri belirgin değildir. Son altı ayda kan transfüzyonu, yeni dövme veya riskli temas öyküsü tariflemez.",
      "patientIntro": {
        "profile": "34 yaşında kadın hasta, Gastroenteroloji polikliniği başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, giderek artan yorgunluk ve eklem ağrıları nedeniyle değerlendirilmek üzere başvuruyor.",
        "historySummary": "Hasta yaklaşık iki aydır iş çıkışında belirgin halsizlik yaşadığını, son haftalarda sabahları el bileklerinde ve dizlerinde tutukluk hissinin eklendiğini anlatır. Cildinde belirgin döküntü fark etmemiştir; ancak ara ara göz aklarında sararma olduğunu eşi söylemiştir. Daha önce benzer bir karaciğer problemi yaşamamış, düzenli alkol kullanmadığını ve bitkisel ürün almadığını belirtir. Ailesinde tiroid hastalığı olan bir kız kardeşi vardır. Ateş, titreme, sağ üst kadranda kolik tarzda ağrı, açık renk dışkı veya koyu idrar dönemleri belirgin değildir. Son altı ayda kan transfüzyonu, yeni dövme veya riskli temas öyküsü tariflemez."
      },
      "vitals": {
        "TA": "116/72 mmHg",
        "Nabız": "82/dk, düzenli",
        "Solunum": "16/dk",
        "SpO2": "%99, oda havasında",
        "Ateş": "36.6 °C",
        "Şok indeksi": "0.71; kapiller dolum <2 sn, perfüzyon iyi"
      },
      "exam": [
        "Genel durumu iyi, bilinç açık ve kooperatif.",
        "Skleralarda hafif ikter dikkati çekiyor; belirgin kaşıntı ekskoriasyonu yok.",
        "Karında hafif hepatomegali dışında defans, rebound veya belirgin asit yok.",
        "Eklem muayenesinde belirgin deformite yok, hafif hassasiyet var."
      ],
      "investigations": [
        {
          "id": "v291-new-645-yorgunluk-eklem-agrisi-ve-transaminaz-yuksekligi-karaciger-testleri",
          "label": "Karaciğer biyokimyası",
          "title": "Karaciğer biyokimyası",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Karaciğer biyokimyası",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Baskın hepatoselüler enzim yüksekliği kolestatik obstrüksiyondan ayrılmalıdır.",
          "clinicalMeaning": "Baskın hepatoselüler enzim yüksekliği kolestatik obstrüksiyondan ayrılmalıdır.",
          "result": {
            "title": "Karaciğer biyokimyası",
            "summary": "Baskın hepatoselüler enzim yüksekliği kolestatik obstrüksiyondan ayrılmalıdır.",
            "interpretation": "Baskın hepatoselüler enzim yüksekliği kolestatik obstrüksiyondan ayrılmalıdır.",
            "values": [
              [
                "AST",
                "486 U/L",
                "<35 U/L",
                "Yüksek"
              ],
              [
                "ALT",
                "612 U/L",
                "<35 U/L",
                "Yüksek"
              ],
              [
                "ALP",
                "148 U/L",
                "35-105 U/L",
                "Hafif yüksek"
              ],
              [
                "Total bilirubin",
                "2.1 mg/dL",
                "0.2-1.2 mg/dL",
                "Yüksek"
              ],
              [
                "INR",
                "1.2",
                "0.8-1.2",
                "Sınırda"
              ]
            ],
            "rows": [
              [
                "AST",
                "486 U/L",
                "<35 U/L",
                "Yüksek"
              ],
              [
                "ALT",
                "612 U/L",
                "<35 U/L",
                "Yüksek"
              ],
              [
                "ALP",
                "148 U/L",
                "35-105 U/L",
                "Hafif yüksek"
              ],
              [
                "Total bilirubin",
                "2.1 mg/dL",
                "0.2-1.2 mg/dL",
                "Yüksek"
              ],
              [
                "INR",
                "1.2",
                "0.8-1.2",
                "Sınırda"
              ]
            ]
          }
        },
        {
          "id": "v291-new-645-yorgunluk-eklem-agrisi-ve-transaminaz-yuksekligi-otoimmun-seroloji",
          "label": "Otoimmün ve viral seroloji",
          "title": "Otoimmün ve viral seroloji",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Otoimmün ve viral seroloji",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "IgG ve otoantikor paterni immün aracılı hepatit lehine veri sağlar.",
          "clinicalMeaning": "IgG ve otoantikor paterni immün aracılı hepatit lehine veri sağlar.",
          "result": {
            "title": "Otoimmün ve viral seroloji",
            "summary": "IgG ve otoantikor paterni immün aracılı hepatit lehine veri sağlar.",
            "interpretation": "IgG ve otoantikor paterni immün aracılı hepatit lehine veri sağlar.",
            "values": [
              [
                "IgG",
                "2480 mg/dL",
                "700-1600 mg/dL",
                "Yüksek"
              ],
              [
                "ANA",
                "1/320 pozitif",
                "Negatif",
                "Pozitif"
              ],
              [
                "Anti-düz kas antikoru",
                "Pozitif",
                "Negatif",
                "Pozitif"
              ],
              [
                "AMA",
                "Negatif",
                "Negatif",
                "Negatif"
              ],
              [
                "HBsAg / anti-HCV",
                "Negatif / negatif",
                "Negatif",
                "Viral marker yok"
              ]
            ],
            "rows": [
              [
                "IgG",
                "2480 mg/dL",
                "700-1600 mg/dL",
                "Yüksek"
              ],
              [
                "ANA",
                "1/320 pozitif",
                "Negatif",
                "Pozitif"
              ],
              [
                "Anti-düz kas antikoru",
                "Pozitif",
                "Negatif",
                "Pozitif"
              ],
              [
                "AMA",
                "Negatif",
                "Negatif",
                "Negatif"
              ],
              [
                "HBsAg / anti-HCV",
                "Negatif / negatif",
                "Negatif",
                "Viral marker yok"
              ]
            ]
          }
        },
        {
          "id": "v291-new-645-yorgunluk-eklem-agrisi-ve-transaminaz-yuksekligi-biyopsi-usg",
          "label": "USG ve karaciğer biyopsisi",
          "title": "USG ve karaciğer biyopsisi",
          "type": "imaging",
          "priority": "essential",
          "subtype": "USG ve karaciğer biyopsisi",
          "category": "imaging",
          "testTypeCategory": "imaging",
          "summary": "Safra yolu obstrüksiyonu olmadan interface hepatit paterni gösterilmiştir.",
          "clinicalMeaning": "Safra yolu obstrüksiyonu olmadan interface hepatit paterni gösterilmiştir.",
          "result": {
            "title": "USG ve karaciğer biyopsisi",
            "summary": "Safra yolu obstrüksiyonu olmadan interface hepatit paterni gösterilmiştir.",
            "interpretation": "Safra yolu obstrüksiyonu olmadan interface hepatit paterni gösterilmiştir.",
            "values": [
              [
                "Abdominal USG",
                "Safra yollarında dilatasyon yok",
                "Dilatasyon yok",
                "Obstrüksiyon lehine değil"
              ],
              [
                "Karaciğer parankimi",
                "Hafif heterojen görünüm",
                "Homojen",
                "Nonspesifik"
              ],
              [
                "Biyopsi",
                "Interface hepatit ve plazma hücrelerinden zengin portal inflamasyon",
                "Beklenmez",
                "Aktif hepatit paterni"
              ]
            ],
            "rows": [
              [
                "Abdominal USG",
                "Safra yollarında dilatasyon yok",
                "Dilatasyon yok",
                "Obstrüksiyon lehine değil"
              ],
              [
                "Karaciğer parankimi",
                "Hafif heterojen görünüm",
                "Homojen",
                "Nonspesifik"
              ],
              [
                "Biyopsi",
                "Interface hepatit ve plazma hücrelerinden zengin portal inflamasyon",
                "Beklenmez",
                "Aktif hepatit paterni"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hasta için en uygun tedavi veya izlem basamağı aşağıdakilerden hangisidir?",
      "questionType": "treatment",
      "answerTarget": "Tedavi",
      "diagnosis": {
        "correct": "Kortikosteroid tedavi başlanması ve azatioprin ile steroid azaltıcı idame planlanması",
        "options": [
          "Alkol bırakma danışmanlığı dışında özgül tedavi vermeden izlem",
          "Tenofovir başlanması ve HBV DNA yanıtına göre izlem",
          "Ursodeoksikolik asit başlanması ve ALP yanıtının izlenmesi",
          "Kortikosteroid tedavi başlanması ve azatioprin ile steroid azaltıcı idame planlanması",
          "Geniş spektrumlu antibiyotik başlanması ve acil ERCP planlanması"
        ],
        "question": "Bu hasta için en uygun tedavi veya izlem basamağı aşağıdakilerden hangisidir?",
        "explanation": "Hastada viral serolojilerin negatif olması, hepatoselüler transaminaz yüksekliği, IgG artışı, ANA/SMA pozitifliği ve interface hepatit bulgusu aktif otoimmün hepatit paternini destekler. Bu durumda tedavi immün aracılı hepatosit hasarını baskılamaya yönelir; kortikosteroid başlanması ve azatioprinle steroid azaltıcı/idame planı temel yaklaşımdır. Biliyer obstrüksiyon, HBV veya primer biliyer kolanjit verileri baskın değildir.",
        "pearls": [
          "Otoimmün hepatitte baskın patern çoğu zaman AST/ALT yüksekliği ve IgG artışıdır.",
          "ANA ve SMA pozitifliği tanıyı destekler; viral hepatit dışlanmalıdır.",
          "Tedavi aktif inflamasyonu baskılamaya yöneliktir; yalnız izlem fibrozis riskini artırır."
        ],
        "optionFeedback": {
          "Alkol bırakma danışmanlığı dışında özgül tedavi vermeden izlem": "Alkol ilişkili karaciğer hastalığında alkol bırakma tedavinin merkezindedir; ancak bu hastanın öyküsünde belirgin alkol kullanımı yoktur ve laboratuvar paterni hepatoselülerdir. IgG yüksekliği, ANA/SMA pozitifliği, viral serolojilerin negatif olması ve biyopside interface hepatit/plazma hücreleri otoimmün hepatit lehinedir. Sadece yaşam tarzı danışmanlığı ile izlemek aktif inflamasyonu kontrol etmez ve fibrozis/siroz ilerlemesine izin verebilir. Bu nedenle bu vaka için özgül immünsüpresif tedavi gerekir.",
          "Tenofovir başlanması ve HBV DNA yanıtına göre izlem": "Tenofovir kronik hepatit B tedavisinde uygun olabilir; özellikle HBV DNA yüksekliği ve aktif hepatit bulguları varsa tercih edilir. Bu hastada HBsAg ve HBV DNA negatiftir; viral hepatit lehine veri verilmemiştir. Transaminaz yüksekliğini HBV kabul edip antiviral başlamak hem hedefi kaçırır hem de aktif otoimmün inflamasyonu tedavisiz bırakır. Yanlış seçenek, hepatoselüler enzim yüksekliği olan her hastayı viral hepatit gibi yönetme hatasına dayanır.",
          "Ursodeoksikolik asit başlanması ve ALP yanıtının izlenmesi": "Ursodeoksikolik asit primer biliyer kolanjitte, özellikle ALP/GGT yüksekliği ve AMA pozitifliği ile giden kolestatik paternde ilk basamak tedavidir. Bu hastada ALP hafif yüksek olsa da baskın patern AST/ALT yüksekliğidir; AMA negatif, IgG yüksek ve SMA/ANA pozitiftir. Bu nedenle primer kolestatik safra yolu hastalığından çok otoimmün hepatit paternine uyar. UDCA bu klinik hedef için ana tedavi değildir.",
          "Kortikosteroid tedavi başlanması ve azatioprin ile steroid azaltıcı idame planlanması": "Bu seçenek en uygundur. Aktif otoimmün hepatitte yüksek transaminazlar, IgG artışı, otoantikor pozitifliği ve interface hepatit bulgusu birlikte değerlendirilir. Tedavide kortikosteroid ile inflamasyon baskılanır; azatioprin genellikle steroid azaltıcı/idame stratejide kullanılır. Amaç yalnızca enzimleri düşürmek değil, immün aracılı hepatosit hasarını kontrol ederek fibrozis ilerlemesini önlemektir. TUS açısından genç/orta yaş kadın, otoimmün eşlikçiler, IgG yüksekliği ve hepatoselüler patern birlikte geldiğinde aktif otoimmün hepatit tedavisi düşünülür.",
          "Geniş spektrumlu antibiyotik başlanması ve acil ERCP planlanması": "Geniş spektrumlu antibiyotik ve acil ERCP, akut kolanjit veya obstrüktif biliyer sepsis gibi durumlarda gerekir; ateş, sağ üst kadran ağrısı, sarılık ve belirgin kolestaz/kanal dilatasyonu beklenir. Bu hastada ateş ve titreme yoktur, USG’de safra yolu dilatasyonu yoktur ve laboratuvar hepatoselüler baskındır. Antibiyotik-ERCP yaklaşımı doğru hastalık grubuna yönelik değildir. Bu seçenek, karaciğer test bozukluğunu mekanizmasını ayırmadan biliyer enfeksiyon gibi yönetme hatasını temsil eder."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Otoimmün hepatit, hücresel ve humoral immün yanıtla gelişen hepatosit hasarıdır; aktif hastalıkta immünsüpresyon prognozu değiştirir.",
      "examPearl": "AST/ALT yüksek + IgG yüksek + ANA/SMA pozitif + viral seroloji negatif: aktif otoimmün hepatitte steroid ± azatioprin düşün.",
      "whyCorrect": "Doğru seçenek hastadaki aktif immün hepatiti hedefler; viral, kolestatik veya enfeksiyöz obstrüktif hastalık tedavileri bu paternle uyumlu değildir.",
      "optionComparison": "Tenofovir HBV için, UDCA PBC için, ERCP-antibiyotik kolanjit için, yalnız izlem hafif/inaktif veya farklı etiyolojiler için anlamlı olabilir; bu vakada aktif otoimmün hepatit tedavisi gerekir.",
      "evidenceChain": [
        "AST/ALT belirgin yüksekliği → hepatoselüler hasar paternini gösterir.",
        "IgG yüksekliği ve ANA/SMA pozitifliği → otoimmün hepatit lehine immünolojik veri sağlar.",
        "HBsAg ve anti-HCV negatifliği → sık viral nedenleri zayıflatır.",
        "Interface hepatit ve plazma hücreleri → aktif otoimmün hepatit histolojisini destekler."
      ],
      "whyWrong": {
        "Alkol bırakma danışmanlığı dışında özgül tedavi vermeden izlem": "Alkol ilişkili karaciğer hastalığında alkol bırakma tedavinin merkezindedir; ancak bu hastanın öyküsünde belirgin alkol kullanımı yoktur ve laboratuvar paterni hepatoselülerdir. IgG yüksekliği, ANA/SMA pozitifliği, viral serolojilerin negatif olması ve biyopside interface hepatit/plazma hücreleri otoimmün hepatit lehinedir. Sadece yaşam tarzı danışmanlığı ile izlemek aktif inflamasyonu kontrol etmez ve fibrozis/siroz ilerlemesine izin verebilir. Bu nedenle bu vaka için özgül immünsüpresif tedavi gerekir.",
        "Tenofovir başlanması ve HBV DNA yanıtına göre izlem": "Tenofovir kronik hepatit B tedavisinde uygun olabilir; özellikle HBV DNA yüksekliği ve aktif hepatit bulguları varsa tercih edilir. Bu hastada HBsAg ve HBV DNA negatiftir; viral hepatit lehine veri verilmemiştir. Transaminaz yüksekliğini HBV kabul edip antiviral başlamak hem hedefi kaçırır hem de aktif otoimmün inflamasyonu tedavisiz bırakır. Yanlış seçenek, hepatoselüler enzim yüksekliği olan her hastayı viral hepatit gibi yönetme hatasına dayanır.",
        "Ursodeoksikolik asit başlanması ve ALP yanıtının izlenmesi": "Ursodeoksikolik asit primer biliyer kolanjitte, özellikle ALP/GGT yüksekliği ve AMA pozitifliği ile giden kolestatik paternde ilk basamak tedavidir. Bu hastada ALP hafif yüksek olsa da baskın patern AST/ALT yüksekliğidir; AMA negatif, IgG yüksek ve SMA/ANA pozitiftir. Bu nedenle primer kolestatik safra yolu hastalığından çok otoimmün hepatit paternine uyar. UDCA bu klinik hedef için ana tedavi değildir.",
        "Geniş spektrumlu antibiyotik başlanması ve acil ERCP planlanması": "Geniş spektrumlu antibiyotik ve acil ERCP, akut kolanjit veya obstrüktif biliyer sepsis gibi durumlarda gerekir; ateş, sağ üst kadran ağrısı, sarılık ve belirgin kolestaz/kanal dilatasyonu beklenir. Bu hastada ateş ve titreme yoktur, USG’de safra yolu dilatasyonu yoktur ve laboratuvar hepatoselüler baskındır. Antibiyotik-ERCP yaklaşımı doğru hastalık grubuna yönelik değildir. Bu seçenek, karaciğer test bozukluğunu mekanizmasını ayırmadan biliyer enfeksiyon gibi yönetme hatasını temsil eder."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v291",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V290 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v291-new-646-genc-yasta-inme-ve-tekrarlayan-gebelik-kaybi",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Genç yaşta inme ve tekrarlayan gebelik kaybı",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Kalıcı üçlü antifosfolipid antikor pozitifliği ve arteriyel trombozda uzun dönem antikoagülasyon seçimini belirleme.",
      "learningTarget": "Antifosfolipid sendromunda arteriyel olay ve üçlü pozitiflik varlığında DOAC yerine VKA temelli uzun dönem antikoagülasyon mantığını kavrama.",
      "demographics": "29 yaşında kadın hasta",
      "setting": "Nöroloji servisi - İç Hastalıkları konsültasyonu",
      "chiefComplaint": "Hasta, geçici konuşma bozukluğu ve sağ kolda güçsüzlük sonrası yatırıldığı serviste tromboz nedeni açısından değerlendiriliyor.",
      "stem": "Hasta sabah işe hazırlanırken kelimeleri toparlayamadığını ve sağ kolunda uyuşma-güçsüzlük başladığını, ailesinin fark etmesi üzerine acile geldiğini anlatır. Şikâyetleri ilk saat içinde azalmış ancak tamamen düzelmemiştir. Son yıllarda iki kez erken gebelik kaybı yaşadığını, bunlardan sonra ayrıntılı hematoloji değerlendirmesine gitmediğini söyler. Sigara içmez; bilinen hipertansiyon, diyabet veya kapak hastalığı yoktur. Son dönemde uzun yolculuk, travma, aktif kanser veya östrojen içeren ilaç kullanımı tariflemez. Ateş, döküntü, eklem şişliği veya belirgin enfeksiyon yakınması eşlik etmemiştir.",
      "patientIntro": {
        "profile": "29 yaşında kadın hasta, Nöroloji servisi - İç Hastalıkları konsültasyonu başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, geçici konuşma bozukluğu ve sağ kolda güçsüzlük sonrası yatırıldığı serviste tromboz nedeni açısından değerlendiriliyor.",
        "historySummary": "Hasta sabah işe hazırlanırken kelimeleri toparlayamadığını ve sağ kolunda uyuşma-güçsüzlük başladığını, ailesinin fark etmesi üzerine acile geldiğini anlatır. Şikâyetleri ilk saat içinde azalmış ancak tamamen düzelmemiştir. Son yıllarda iki kez erken gebelik kaybı yaşadığını, bunlardan sonra ayrıntılı hematoloji değerlendirmesine gitmediğini söyler. Sigara içmez; bilinen hipertansiyon, diyabet veya kapak hastalığı yoktur. Son dönemde uzun yolculuk, travma, aktif kanser veya östrojen içeren ilaç kullanımı tariflemez. Ateş, döküntü, eklem şişliği veya belirgin enfeksiyon yakınması eşlik etmemiştir."
      },
      "vitals": {
        "TA": "122/78 mmHg",
        "Nabız": "76/dk, düzenli",
        "Solunum": "16/dk",
        "SpO2": "%99, oda havasında",
        "Ateş": "36.5 °C",
        "Şok indeksi": "0.62; kapiller dolum <2 sn, ekstremiteler sıcak"
      },
      "exam": [
        "Genel durumu iyi, bilinç açık ve koopere.",
        "Konuşmada hafif akıcılık bozukluğu, sağ üst ekstremitede 4+/5 güç saptanıyor.",
        "Kalp oskültasyonunda üfürüm yok; ritim düzenli.",
        "Bacaklarda ödem, hassasiyet veya belirgin çap farkı izlenmiyor."
      ],
      "investigations": [
        {
          "id": "v291-new-646-genc-yasta-inme-ve-tekrarlayan-gebelik-kaybi-goruntuleme",
          "label": "Beyin görüntüleme ve damar değerlendirmesi",
          "title": "Beyin görüntüleme ve damar değerlendirmesi",
          "type": "imaging",
          "priority": "essential",
          "subtype": "Beyin görüntüleme ve damar değerlendirmesi",
          "category": "imaging",
          "testTypeCategory": "imaging",
          "summary": "Genç hastada kortikal iskemik odak arteriyel trombotik olayı objektifleştirir.",
          "clinicalMeaning": "Genç hastada kortikal iskemik odak arteriyel trombotik olayı objektifleştirir.",
          "result": {
            "title": "Beyin görüntüleme ve damar değerlendirmesi",
            "summary": "Genç hastada kortikal iskemik odak arteriyel trombotik olayı objektifleştirir.",
            "interpretation": "Genç hastada kortikal iskemik odak arteriyel trombotik olayı objektifleştirir.",
            "values": [
              [
                "Difüzyon MRG",
                "Sol frontal kortikal akut iskemik odak",
                "Beklenmez",
                "Akut iskemi"
              ],
              [
                "BT anjiyografi",
                "Büyük damar oklüzyonu yok",
                "Oklüzyon yok",
                "Tromboliz dışı karar"
              ],
              [
                "EKO",
                "Trombus/vejetasyon yok",
                "Beklenmez",
                "Kardiyoemboli lehine değil"
              ]
            ],
            "rows": [
              [
                "Difüzyon MRG",
                "Sol frontal kortikal akut iskemik odak",
                "Beklenmez",
                "Akut iskemi"
              ],
              [
                "BT anjiyografi",
                "Büyük damar oklüzyonu yok",
                "Oklüzyon yok",
                "Tromboliz dışı karar"
              ],
              [
                "EKO",
                "Trombus/vejetasyon yok",
                "Beklenmez",
                "Kardiyoemboli lehine değil"
              ]
            ]
          }
        },
        {
          "id": "v291-new-646-genc-yasta-inme-ve-tekrarlayan-gebelik-kaybi-apl-panel",
          "label": "Antifosfolipid antikor paneli",
          "title": "Antifosfolipid antikor paneli",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Antifosfolipid antikor paneli",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Kalıcı üçlü pozitiflik yüksek riskli APS profilini destekler.",
          "clinicalMeaning": "Kalıcı üçlü pozitiflik yüksek riskli APS profilini destekler.",
          "result": {
            "title": "Antifosfolipid antikor paneli",
            "summary": "Kalıcı üçlü pozitiflik yüksek riskli APS profilini destekler.",
            "interpretation": "Kalıcı üçlü pozitiflik yüksek riskli APS profilini destekler.",
            "values": [
              [
                "Lupus antikoagülanı",
                "Pozitif, 12 hafta sonra tekrar pozitif",
                "Negatif",
                "Kalıcı pozitif"
              ],
              [
                "Antikardiyolipin IgG",
                "82 GPL",
                "<20 GPL",
                "Yüksek"
              ],
              [
                "Anti-beta2 glikoprotein I IgG",
                "96 U/mL",
                "<20 U/mL",
                "Yüksek"
              ],
              [
                "Trombosit",
                "184 x10^9/L",
                "150-400 x10^9/L",
                "Normal"
              ]
            ],
            "rows": [
              [
                "Lupus antikoagülanı",
                "Pozitif, 12 hafta sonra tekrar pozitif",
                "Negatif",
                "Kalıcı pozitif"
              ],
              [
                "Antikardiyolipin IgG",
                "82 GPL",
                "<20 GPL",
                "Yüksek"
              ],
              [
                "Anti-beta2 glikoprotein I IgG",
                "96 U/mL",
                "<20 U/mL",
                "Yüksek"
              ],
              [
                "Trombosit",
                "184 x10^9/L",
                "150-400 x10^9/L",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v291-new-646-genc-yasta-inme-ve-tekrarlayan-gebelik-kaybi-temel-risk",
          "label": "Metabolik ve trombofili dışlama verileri",
          "title": "Metabolik ve trombofili dışlama verileri",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Metabolik ve trombofili dışlama verileri",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Genç yaş inme için sık eşlik eden riskler belirgin değildir.",
          "clinicalMeaning": "Genç yaş inme için sık eşlik eden riskler belirgin değildir.",
          "result": {
            "title": "Metabolik ve trombofili dışlama verileri",
            "summary": "Genç yaş inme için sık eşlik eden riskler belirgin değildir.",
            "interpretation": "Genç yaş inme için sık eşlik eden riskler belirgin değildir.",
            "values": [
              [
                "HbA1c",
                "5.2 %",
                "<5.7 %",
                "Normal"
              ],
              [
                "LDL-kolesterol",
                "96 mg/dL",
                "<100 mg/dL",
                "Hedefe yakın"
              ],
              [
                "Protein C/S antijen",
                "Normal",
                "Normal",
                "Eksiklik yok"
              ],
              [
                "D-dimer",
                "0.42 mg/L FEU",
                "<0.50 mg/L FEU",
                "Normal"
              ]
            ],
            "rows": [
              [
                "HbA1c",
                "5.2 %",
                "<5.7 %",
                "Normal"
              ],
              [
                "LDL-kolesterol",
                "96 mg/dL",
                "<100 mg/dL",
                "Hedefe yakın"
              ],
              [
                "Protein C/S antijen",
                "Normal",
                "Normal",
                "Eksiklik yok"
              ],
              [
                "D-dimer",
                "0.42 mg/L FEU",
                "<0.50 mg/L FEU",
                "Normal"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada uzun dönem tromboz nüksünü azaltmak için en uygun yaklaşım aşağıdakilerden hangisidir?",
      "questionType": "treatment",
      "answerTarget": "Uzun dönem antikoagülasyon",
      "diagnosis": {
        "correct": "Vitamin K antagonisti ile uzun dönem antikoagülasyon planlanması ve hedef INR’nin olaya göre düzenlenmesi",
        "options": [
          "Rivaroksaban başlanması ve INR izlemi gerekmeksizin uzun dönem devam edilmesi",
          "Vitamin K antagonisti ile uzun dönem antikoagülasyon planlanması ve hedef INR’nin olaya göre düzenlenmesi",
          "Sadece düşük doz aspirin verilmesi ve antikoagülasyondan kaçınılması",
          "Üç ay düşük molekül ağırlıklı heparin verildikten sonra tüm tedavinin kesilmesi",
          "Trombosit sayısı normal olduğu için antitrombotik tedavi verilmeden izlem yapılması"
        ],
        "question": "Bu hastada uzun dönem tromboz nüksünü azaltmak için en uygun yaklaşım aşağıdakilerden hangisidir?",
        "explanation": "Genç yaşta arteriyel tromboz, tekrarlayan gebelik kaybı öyküsü ve 12 hafta arayla kalıcı üçlü antifosfolipid antikor pozitifliği yüksek riskli antifosfolipid sendromunu destekler. Bu bağlamda uzun dönem antikoagülasyon VKA/warfarin temellidir; DOAC’lar özellikle üçlü pozitif ve arteriyel olaylı hastada uygun tercih değildir. Tedavi hedefi yalnız akut olayı değil, nüks trombozu önlemektir.",
        "pearls": [
          "APS tanısında klinik olay ve kalıcı laboratuvar pozitifliği birlikte değerlendirilir.",
          "Üçlü pozitiflik yüksek riskli profil kabul edilir.",
          "Arteriyel APS’de DOAC yerine VKA temelli tedavi TUS açısından kritik ayrımdır."
        ],
        "optionFeedback": {
          "Rivaroksaban başlanması ve INR izlemi gerekmeksizin uzun dönem devam edilmesi": "Doğrudan oral antikoagülanlar venöz tromboembolinin birçok formunda pratik olabilir; ancak yüksek riskli antifosfolipid sendromunda, özellikle üçlü antikor pozitifliği veya arteriyel olay varlığında tercih edilmez. Bu hastada genç yaşta iskemik inme, önceki gebelik kayıpları ve 12 hafta arayla kalıcı pozitif lupus antikoagülanı/antikardiyolipin/anti-beta2 glikoprotein I paterni vardır. Rivaroksaban gibi DOAC’lar bu risk profilinde trombotik nüks açısından sakıncalı kabul edilir. Bu nedenle INR izlemi gerektirmemesi burada avantaj değil, yanlış tedavi seçimine işaret eder.",
          "Vitamin K antagonisti ile uzun dönem antikoagülasyon planlanması ve hedef INR’nin olaya göre düzenlenmesi": "Bu seçenek en uygundur. Hasta arteriyel trombozla başvurmuş ve antifosfolipid antikorları 12 hafta arayla kalıcı olarak pozitif bulunmuştur; ayrıca gebelik kaybı öyküsü klinik bağlamı güçlendirir. Yüksek riskli APS’de uzun dönem antikoagülasyon genellikle vitamin K antagonistiyle yapılır; hedef INR ve aspirin eklenmesi arteriyel/venöz olay, kanama riski ve nüks durumuna göre düzenlenir. TUS açısından üçlü pozitif APS’de DOAC cazip görünse bile doğru uzun dönem strateji warfarin/VKA eksenindedir.",
          "Sadece düşük doz aspirin verilmesi ve antikoagülasyondan kaçınılması": "Düşük doz aspirin primer profilakside veya bazı obstetrik APS bağlamlarında gündeme gelebilir; fakat bu hasta artık arteriyel tromboz geçirmiştir. İskemik inme gibi trombotik olay sonrası yalnız aspirin vermek APS’ye bağlı nüks riskini yeterince azaltmaz. Üstelik üçlü antikor pozitifliği yüksek riskli profil anlamına gelir. Bu nedenle tek başına antiagregan tedavi bu vaka için yetersizdir; uzun dönem antikoagülasyon gerekir.",
          "Üç ay düşük molekül ağırlıklı heparin verildikten sonra tüm tedavinin kesilmesi": "Düşük molekül ağırlıklı heparin akut dönemde veya gebelikte önemli rol oynayabilir; ancak APS’ye bağlı kanıtlanmış trombotik olaydan sonra yalnız üç ay tedavi verip tamamen kesmek nüks riskini göz ardı eder. Bu hastada olay genç yaşta ve arteriyel niteliktedir; antikor pozitifliği kalıcıdır. Dolayısıyla geçici provokasyona bağlı sıradan venöz tromboz gibi kısa süreli tedaviyle yönetilemez. Uzun dönem strateji gerekir.",
          "Trombosit sayısı normal olduğu için antitrombotik tedavi verilmeden izlem yapılması": "APS’de tromboz riski trombosit sayısının normal olup olmamasıyla dışlanmaz. Hatta APS hastalarında trombositopeni olabilir; ancak tanı ve tedavi kararı trombotik/obstetrik olaylar ve antifosfolipid antikor kalıcılığı üzerinden verilir. Bu hastada akut iskemik olay vardır; antitrombotik tedavi vermemek ciddi nüks riskine yol açar. Normal trombosit sayısı tedavisiz izlem gerekçesi değildir."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Antifosfolipid sendromunda antikorlar trombosit-endotel-koagülasyon aktivasyonunu artırarak arteriyel ve venöz tromboza yol açabilir.",
      "examPearl": "Genç inme + gebelik kaybı + 12 hafta arayla üçlü aPL pozitifliği: APS’de uzun dönem VKA, DOAC değil.",
      "whyCorrect": "Doğru seçenek hastanın yüksek riskli APS profilini ve arteriyel tromboz öyküsünü doğrudan hedefler.",
      "optionComparison": "DOAC yüksek riskli APS’de sakıncalıdır; aspirin tek başına yetersizdir; kısa süreli LMWH ve tedavisiz izlem kalıcı nüks riskini karşılamaz.",
      "evidenceChain": [
        "Genç yaşta kortikal iskemik odak → alışılmış aterosklerotik riskler olmadan arteriyel tromboz.",
        "İki gebelik kaybı öyküsü → obstetrik APS bağlamını güçlendirir.",
        "Lupus antikoagülanı, antikardiyolipin ve anti-beta2GP1 pozitifliği → yüksek riskli üçlü pozitif profil.",
        "Pozitifliğin 12 hafta sonra sürmesi → geçici enfeksiyon ilişkili antikor yanıtından ayrılır."
      ],
      "whyWrong": {
        "Rivaroksaban başlanması ve INR izlemi gerekmeksizin uzun dönem devam edilmesi": "Doğrudan oral antikoagülanlar venöz tromboembolinin birçok formunda pratik olabilir; ancak yüksek riskli antifosfolipid sendromunda, özellikle üçlü antikor pozitifliği veya arteriyel olay varlığında tercih edilmez. Bu hastada genç yaşta iskemik inme, önceki gebelik kayıpları ve 12 hafta arayla kalıcı pozitif lupus antikoagülanı/antikardiyolipin/anti-beta2 glikoprotein I paterni vardır. Rivaroksaban gibi DOAC’lar bu risk profilinde trombotik nüks açısından sakıncalı kabul edilir. Bu nedenle INR izlemi gerektirmemesi burada avantaj değil, yanlış tedavi seçimine işaret eder.",
        "Sadece düşük doz aspirin verilmesi ve antikoagülasyondan kaçınılması": "Düşük doz aspirin primer profilakside veya bazı obstetrik APS bağlamlarında gündeme gelebilir; fakat bu hasta artık arteriyel tromboz geçirmiştir. İskemik inme gibi trombotik olay sonrası yalnız aspirin vermek APS’ye bağlı nüks riskini yeterince azaltmaz. Üstelik üçlü antikor pozitifliği yüksek riskli profil anlamına gelir. Bu nedenle tek başına antiagregan tedavi bu vaka için yetersizdir; uzun dönem antikoagülasyon gerekir.",
        "Üç ay düşük molekül ağırlıklı heparin verildikten sonra tüm tedavinin kesilmesi": "Düşük molekül ağırlıklı heparin akut dönemde veya gebelikte önemli rol oynayabilir; ancak APS’ye bağlı kanıtlanmış trombotik olaydan sonra yalnız üç ay tedavi verip tamamen kesmek nüks riskini göz ardı eder. Bu hastada olay genç yaşta ve arteriyel niteliktedir; antikor pozitifliği kalıcıdır. Dolayısıyla geçici provokasyona bağlı sıradan venöz tromboz gibi kısa süreli tedaviyle yönetilemez. Uzun dönem strateji gerekir.",
        "Trombosit sayısı normal olduğu için antitrombotik tedavi verilmeden izlem yapılması": "APS’de tromboz riski trombosit sayısının normal olup olmamasıyla dışlanmaz. Hatta APS hastalarında trombositopeni olabilir; ancak tanı ve tedavi kararı trombotik/obstetrik olaylar ve antifosfolipid antikor kalıcılığı üzerinden verilir. Bu hastada akut iskemik olay vardır; antitrombotik tedavi vermemek ciddi nüks riskine yol açar. Normal trombosit sayısı tedavisiz izlem gerekçesi değildir."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v291",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V290 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v291-new-647-cok-su-icme-ve-gece-idrara-kalkma",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Çok su içme ve gece idrara kalkma",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Hipernatremi ve düşük idrar osmolalitesi olan poliüride desmopressin yanıtına göre santral ve nefrojenik diabetes insipidusu ayırma.",
      "learningTarget": "Su dengesi bozukluklarında serum-idrar osmolalitesi ve desmopressin yanıtının mekanizma düzeyinde nasıl yorumlandığını kavrama.",
      "demographics": "38 yaşında erkek hasta",
      "setting": "Endokrinoloji polikliniği",
      "chiefComplaint": "Hasta, ameliyattan sonra başlayan aşırı susama ve gece sık idrara kalkma nedeniyle başvuruyor.",
      "stem": "Hasta üç hafta önce hipofiz bölgesindeki kitle için ameliyat olduğunu, taburculuktan birkaç gün sonra neredeyse sürekli su içme ihtiyacı başladığını anlatır. Geceleri 5-6 kez idrara kalktığını, idrar miktarının fazla ve renginin çok açık olduğunu söyler. İş yerinde su içemediği birkaç saatte ağzının kuruduğunu ve başının döndüğünü fark etmiştir. Daha önce diyabet tanısı yoktur; yeni ilaç olarak yalnız kısa süreli ağrı kesici kullandığını belirtir. İshal, kusma, ateş veya bilinç bulanıklığı yaşamamıştır. Ailesi son günlerde yanında sürekli su şişesi taşıdığını fark etmiştir.",
      "patientIntro": {
        "profile": "38 yaşında erkek hasta, Endokrinoloji polikliniği başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, ameliyattan sonra başlayan aşırı susama ve gece sık idrara kalkma nedeniyle başvuruyor.",
        "historySummary": "Hasta üç hafta önce hipofiz bölgesindeki kitle için ameliyat olduğunu, taburculuktan birkaç gün sonra neredeyse sürekli su içme ihtiyacı başladığını anlatır. Geceleri 5-6 kez idrara kalktığını, idrar miktarının fazla ve renginin çok açık olduğunu söyler. İş yerinde su içemediği birkaç saatte ağzının kuruduğunu ve başının döndüğünü fark etmiştir. Daha önce diyabet tanısı yoktur; yeni ilaç olarak yalnız kısa süreli ağrı kesici kullandığını belirtir. İshal, kusma, ateş veya bilinç bulanıklığı yaşamamıştır. Ailesi son günlerde yanında sürekli su şişesi taşıdığını fark etmiştir."
      },
      "vitals": {
        "TA": "108/68 mmHg",
        "Nabız": "94/dk, düzenli",
        "Solunum": "16/dk",
        "SpO2": "%99, oda havasında",
        "Ateş": "36.4 °C",
        "Şok indeksi": "0.87; mukozalar kuru, kapiller dolum yaklaşık 2 sn"
      },
      "exam": [
        "Genel durumu iyi, hafif susamış görünümde.",
        "Dil ve ağız mukozası kuru, cilt turgoru hafif azalmış.",
        "Nörolojik muayenede fokal defisit yok.",
        "Tiroid muayenesi ve kardiyopulmoner muayene olağan."
      ],
      "investigations": [
        {
          "id": "v291-new-647-cok-su-icme-ve-gece-idrara-kalkma-serum-idrar-osm",
          "label": "Serum ve idrar osmolalitesi",
          "title": "Serum ve idrar osmolalitesi",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Serum ve idrar osmolalitesi",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Hipertonik plazmaya rağmen idrarın seyreltik kalması su tutulumu yetersizliğini gösterir.",
          "clinicalMeaning": "Hipertonik plazmaya rağmen idrarın seyreltik kalması su tutulumu yetersizliğini gösterir.",
          "result": {
            "title": "Serum ve idrar osmolalitesi",
            "summary": "Hipertonik plazmaya rağmen idrarın seyreltik kalması su tutulumu yetersizliğini gösterir.",
            "interpretation": "Hipertonik plazmaya rağmen idrarın seyreltik kalması su tutulumu yetersizliğini gösterir.",
            "values": [
              [
                "Serum sodyumu",
                "150 mmol/L",
                "135-145 mmol/L",
                "Yüksek"
              ],
              [
                "Serum osmolalitesi",
                "309 mOsm/kg",
                "275-295 mOsm/kg",
                "Yüksek"
              ],
              [
                "İdrar osmolalitesi",
                "108 mOsm/kg",
                ">600 mOsm/kg beklenir",
                "Uygunsuz düşük"
              ],
              [
                "İdrar dansitesi",
                "1.002",
                "1.005-1.030",
                "Düşük"
              ]
            ],
            "rows": [
              [
                "Serum sodyumu",
                "150 mmol/L",
                "135-145 mmol/L",
                "Yüksek"
              ],
              [
                "Serum osmolalitesi",
                "309 mOsm/kg",
                "275-295 mOsm/kg",
                "Yüksek"
              ],
              [
                "İdrar osmolalitesi",
                "108 mOsm/kg",
                ">600 mOsm/kg beklenir",
                "Uygunsuz düşük"
              ],
              [
                "İdrar dansitesi",
                "1.002",
                "1.005-1.030",
                "Düşük"
              ]
            ]
          }
        },
        {
          "id": "v291-new-647-cok-su-icme-ve-gece-idrara-kalkma-metabolik",
          "label": "Temel metabolik testler",
          "title": "Temel metabolik testler",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Temel metabolik testler",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Ozmotik diürez ve sık elektrolit tetikleyicileri desteklenmiyor.",
          "clinicalMeaning": "Ozmotik diürez ve sık elektrolit tetikleyicileri desteklenmiyor.",
          "result": {
            "title": "Temel metabolik testler",
            "summary": "Ozmotik diürez ve sık elektrolit tetikleyicileri desteklenmiyor.",
            "interpretation": "Ozmotik diürez ve sık elektrolit tetikleyicileri desteklenmiyor.",
            "values": [
              [
                "Açlık glukozu",
                "92 mg/dL",
                "70-100 mg/dL",
                "Normal"
              ],
              [
                "Kalsiyum",
                "9.4 mg/dL",
                "8.6-10.2 mg/dL",
                "Normal"
              ],
              [
                "Potasyum",
                "4.1 mmol/L",
                "3.5-5.1 mmol/L",
                "Normal"
              ],
              [
                "Kreatinin",
                "0.9 mg/dL",
                "0.7-1.2 mg/dL",
                "Normal"
              ]
            ],
            "rows": [
              [
                "Açlık glukozu",
                "92 mg/dL",
                "70-100 mg/dL",
                "Normal"
              ],
              [
                "Kalsiyum",
                "9.4 mg/dL",
                "8.6-10.2 mg/dL",
                "Normal"
              ],
              [
                "Potasyum",
                "4.1 mmol/L",
                "3.5-5.1 mmol/L",
                "Normal"
              ],
              [
                "Kreatinin",
                "0.9 mg/dL",
                "0.7-1.2 mg/dL",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v291-new-647-cok-su-icme-ve-gece-idrara-kalkma-desmopressin",
          "label": "Desmopressin sonrası idrar yanıtı",
          "title": "Desmopressin sonrası idrar yanıtı",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Desmopressin sonrası idrar yanıtı",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Desmopressine belirgin yanıt böbreğin ADH sinyaline yanıt verebildiğini gösterir.",
          "clinicalMeaning": "Desmopressine belirgin yanıt böbreğin ADH sinyaline yanıt verebildiğini gösterir.",
          "result": {
            "title": "Desmopressin sonrası idrar yanıtı",
            "summary": "Desmopressine belirgin yanıt böbreğin ADH sinyaline yanıt verebildiğini gösterir.",
            "interpretation": "Desmopressine belirgin yanıt böbreğin ADH sinyaline yanıt verebildiğini gösterir.",
            "values": [
              [
                "İdrar osmolalitesi - başlangıç",
                "108 mOsm/kg",
                "Değişken",
                "Düşük"
              ],
              [
                "İdrar osmolalitesi - desmopressin sonrası",
                "515 mOsm/kg",
                "Belirgin artış beklenir",
                "Artmış"
              ],
              [
                "24 saat idrar hacmi",
                "7.2 L/gün",
                "<3 L/gün",
                "Yüksek"
              ]
            ],
            "rows": [
              [
                "İdrar osmolalitesi - başlangıç",
                "108 mOsm/kg",
                "Değişken",
                "Düşük"
              ],
              [
                "İdrar osmolalitesi - desmopressin sonrası",
                "515 mOsm/kg",
                "Belirgin artış beklenir",
                "Artmış"
              ],
              [
                "24 saat idrar hacmi",
                "7.2 L/gün",
                "<3 L/gün",
                "Yüksek"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastadaki poliüri ve laboratuvar paternini en iyi açıklayan süreç aşağıdakilerden hangisidir?",
      "questionType": "mechanism",
      "answerTarget": "Mekanizma",
      "diagnosis": {
        "correct": "Hipotalamo-hipofizer vazopressin salınımının yetersiz olması",
        "options": [
          "Böbrek toplayıcı kanallarında vazopressine direnç gelişmesi",
          "Ozmotik diüreze bağlı glukozla su kaybının artması",
          "Primer polidipsiye bağlı serum osmolalitesinin baskılanması",
          "Aldosteron fazlalığına bağlı distal sodyum tutulumu ve potasyum kaybı",
          "Hipotalamo-hipofizer vazopressin salınımının yetersiz olması"
        ],
        "question": "Bu hastadaki poliüri ve laboratuvar paternini en iyi açıklayan süreç aşağıdakilerden hangisidir?",
        "explanation": "Hipernatremi ve yüksek serum osmolalitesine rağmen idrarın seyreltik kalması ADH etkisinin yetersiz olduğunu gösterir. Desmopressin sonrası idrar osmolalitesinin belirgin artması toplayıcı kanalın hormona yanıt verebildiğini, sorunun renal direnç değil vazopressin eksikliği olduğunu destekler. Hipofiz cerrahisi öyküsüyle birlikte bu patern santral diabetes insipidus mekanizmasını en iyi açıklar.",
        "pearls": [
          "Santral DI’da desmopressin sonrası idrar osmolalitesi belirgin artar.",
          "Nefrojenik DI’da desmopressin yanıtı zayıftır.",
          "Primer polidipside serum sodyumu genellikle düşük veya düşük-normaldir."
        ],
        "optionFeedback": {
          "Böbrek toplayıcı kanallarında vazopressine direnç gelişmesi": "Vazopressine renal direnç nefrojenik diabetes insipidusu düşündürür; lityum kullanımı, hiperkalsemi veya kronik böbrek hastalığı gibi nedenlerle olabilir. Bu durumda desmopressin sonrası idrar osmolalitesinde belirgin artış beklenmez, çünkü böbrek ADH sinyaline yanıt veremez. Bu hastada desmopressin sonrası idrar osmolalitesinin belirgin yükselmesi toplayıcı kanalların yanıt verebildiğini gösterir. Bu nedenle direnç değil, hormon eksikliği mekanizması daha uygundur.",
          "Ozmotik diüreze bağlı glukozla su kaybının artması": "Ozmotik diürezde özellikle belirgin hiperglisemi veya mannitol gibi solüt yükleri idrarla su kaybını artırır; idrar osmolalitesi genellikle solüt nedeniyle yüksek olur. Bu hastada glukoz normaldir ve başlangıç idrar osmolalitesi çok düşüktür. Ayrıca desmopressin sonrası idrarın konsantre hale gelmesi ozmotik diürezden çok ADH eksikliğine işaret eder. Bu nedenle poliüriyi glukozla su kaybı mekanizması açıklamaz.",
          "Primer polidipsiye bağlı serum osmolalitesinin baskılanması": "Primer polidipside aşırı su alımı serum sodyumunu ve serum osmolalitesini düşük veya düşük-normal yapma eğilimindedir; su kısıtlamasıyla idrar konsantre olabilir. Bu hastada serum sodyumu ve serum osmolalitesi yüksektir; yani sorun yalnız fazla su içmek değil, serbest su kaybıdır. Gece uykudan uyandıran yoğun poliüri de primer davranışsal su içmeden çok diabetes insipidus lehinedir. Bu nedenle primer polidipsi mekanizması güvenli bir tercih değildir.",
          "Aldosteron fazlalığına bağlı distal sodyum tutulumu ve potasyum kaybı": "Aldosteron fazlalığı hipertansiyon, hipokalemi ve metabolik alkaloz ile ilişkilidir; poliüri bazen hipokalemiye sekonder olabilir. Bu hastada hipertansiyon ve belirgin hipokalemi yoktur; ana veri hipernatremi, yüksek serum osmolalitesi ve düşük idrar osmolalitesidir. Desmopressine güçlü yanıt aldosteron fazlalığıyla açıklanamaz. Bu seçenek farklı bir endokrin elektrolit bozukluğuna aittir.",
          "Hipotalamo-hipofizer vazopressin salınımının yetersiz olması": "Bu seçenek en uygundur. Hastada çok su içme, gece poliürisi, hipernatremi, yüksek serum osmolalitesi ve uygunsuz düşük idrar osmolalitesi vardır. Desmopressin sonrası idrar osmolalitesinin belirgin artması böbreğin vazopressine yanıt verebildiğini, temel sorunun vazopressin eksikliği olduğunu gösterir. Yakın dönem hipofiz cerrahisi öyküsü de santral diabetes insipidus için anatomik bağlam sağlar. TUS açısından desmopressin sonrası konsantrasyon artışı santral DI lehinedir."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "ADH eksikliğinde toplayıcı kanalda aquaporin-2 aracılı su geri emilimi azalır; serbest su kaybı hipernatremi ve seyreltik idrar oluşturur.",
      "examPearl": "Hipernatremi + yüksek serum osmolalitesi + düşük idrar osmolalitesi + desmopressinle belirgin artış: santral DI.",
      "whyCorrect": "Doğru seçenek yüksek plazma osmolalitesine rağmen idrarın seyreltik kalmasını ve desmopressine güçlü yanıtı tek mekanizmada açıklar.",
      "optionComparison": "Nefrojenik DI desmopressine dirençlidir; ozmotik diürezde idrar solütlüdür; primer polidipside serum osmolalitesi baskılanır; aldosteron fazlalığı farklı elektrolit/kan basıncı paterni verir.",
      "evidenceChain": [
        "Hipofiz cerrahisi sonrası başlangıç → ADH aksı hasarı için anatomik bağlam.",
        "Serum Na 150 ve osmolalite 309 → serbest su kaybı ile hipertonik durum.",
        "İdrar osmolalitesi 108 → hipertonik plazmaya uygunsuz seyreltik idrar.",
        "Desmopressin sonrası 515 mOsm/kg → böbrek yanıtı korunmuş, hormon eksikliği baskın."
      ],
      "whyWrong": {
        "Böbrek toplayıcı kanallarında vazopressine direnç gelişmesi": "Vazopressine renal direnç nefrojenik diabetes insipidusu düşündürür; lityum kullanımı, hiperkalsemi veya kronik böbrek hastalığı gibi nedenlerle olabilir. Bu durumda desmopressin sonrası idrar osmolalitesinde belirgin artış beklenmez, çünkü böbrek ADH sinyaline yanıt veremez. Bu hastada desmopressin sonrası idrar osmolalitesinin belirgin yükselmesi toplayıcı kanalların yanıt verebildiğini gösterir. Bu nedenle direnç değil, hormon eksikliği mekanizması daha uygundur.",
        "Ozmotik diüreze bağlı glukozla su kaybının artması": "Ozmotik diürezde özellikle belirgin hiperglisemi veya mannitol gibi solüt yükleri idrarla su kaybını artırır; idrar osmolalitesi genellikle solüt nedeniyle yüksek olur. Bu hastada glukoz normaldir ve başlangıç idrar osmolalitesi çok düşüktür. Ayrıca desmopressin sonrası idrarın konsantre hale gelmesi ozmotik diürezden çok ADH eksikliğine işaret eder. Bu nedenle poliüriyi glukozla su kaybı mekanizması açıklamaz.",
        "Primer polidipsiye bağlı serum osmolalitesinin baskılanması": "Primer polidipside aşırı su alımı serum sodyumunu ve serum osmolalitesini düşük veya düşük-normal yapma eğilimindedir; su kısıtlamasıyla idrar konsantre olabilir. Bu hastada serum sodyumu ve serum osmolalitesi yüksektir; yani sorun yalnız fazla su içmek değil, serbest su kaybıdır. Gece uykudan uyandıran yoğun poliüri de primer davranışsal su içmeden çok diabetes insipidus lehinedir. Bu nedenle primer polidipsi mekanizması güvenli bir tercih değildir.",
        "Aldosteron fazlalığına bağlı distal sodyum tutulumu ve potasyum kaybı": "Aldosteron fazlalığı hipertansiyon, hipokalemi ve metabolik alkaloz ile ilişkilidir; poliüri bazen hipokalemiye sekonder olabilir. Bu hastada hipertansiyon ve belirgin hipokalemi yoktur; ana veri hipernatremi, yüksek serum osmolalitesi ve düşük idrar osmolalitesidir. Desmopressine güçlü yanıt aldosteron fazlalığıyla açıklanamaz. Bu seçenek farklı bir endokrin elektrolit bozukluğuna aittir."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v291",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V290 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v291-new-648-yeni-baslayan-sakak-agrisi-ve-cene-yorulmasi",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Yeni başlayan şakak ağrısı ve çene yorulması",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Yeni başlangıçlı temporal baş ağrısı ve görsel semptomlarda dev hücreli arterit şüphesiyle tedaviyi geciktirmeme kararını verme.",
      "learningTarget": "Dev hücreli arteritte kalıcı görme kaybını önlemek için klinik şüphe yüksekse biyopsi beklenmeden glukokortikoid başlanması gerektiğini kavrama.",
      "demographics": "73 yaşında kadın hasta",
      "setting": "Acil servis",
      "chiefComplaint": "Hasta, yeni başlayan şakak ağrısı ve kısa süreli görme bulanıklığı nedeniyle acil servise başvuruyor.",
      "stem": "Hasta son on gündür sağ şakağında daha önce yaşamadığı zonklayıcı bir ağrı olduğunu, saçını tararken o bölgede hassasiyet hissettiğini anlatır. Son birkaç gündür yemek yerken çenesinin yorulduğunu ve lokmaları çiğnemek için ara vermek zorunda kaldığını söyler. Bu sabah sağ gözünde birkaç dakika süren perde inmiş gibi bulanıklık olmuş, düzeldikten sonra ailesi tarafından acile getirilmiştir. Daha önce migren atağı yaşamamıştır ve bu ağrı için aldığı basit ağrı kesiciler belirgin rahatlama sağlamamıştır. Ateş yüksekliği belirgin değildir; burun akıntısı, diş ağrısı veya yeni kafa travması tariflemez. Son haftalarda omuz ve kalça çevresinde sabah tutukluğu da olduğunu ekler.",
      "patientIntro": {
        "profile": "73 yaşında kadın hasta, Acil servis başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, yeni başlayan şakak ağrısı ve kısa süreli görme bulanıklığı nedeniyle acil servise başvuruyor.",
        "historySummary": "Hasta son on gündür sağ şakağında daha önce yaşamadığı zonklayıcı bir ağrı olduğunu, saçını tararken o bölgede hassasiyet hissettiğini anlatır. Son birkaç gündür yemek yerken çenesinin yorulduğunu ve lokmaları çiğnemek için ara vermek zorunda kaldığını söyler. Bu sabah sağ gözünde birkaç dakika süren perde inmiş gibi bulanıklık olmuş, düzeldikten sonra ailesi tarafından acile getirilmiştir. Daha önce migren atağı yaşamamıştır ve bu ağrı için aldığı basit ağrı kesiciler belirgin rahatlama sağlamamıştır. Ateş yüksekliği belirgin değildir; burun akıntısı, diş ağrısı veya yeni kafa travması tariflemez. Son haftalarda omuz ve kalça çevresinde sabah tutukluğu da olduğunu ekler."
      },
      "vitals": {
        "TA": "138/82 mmHg",
        "Nabız": "88/dk, düzenli",
        "Solunum": "16/dk",
        "SpO2": "%98, oda havasında",
        "Ateş": "37.2 °C",
        "Şok indeksi": "0.64; kapiller dolum <2 sn, periferik perfüzyon iyi"
      },
      "exam": [
        "Genel durumu iyi, ancak baş ağrısı nedeniyle huzursuz.",
        "Sağ temporal arter trasesinde hassasiyet ve nabızda azalma izleniyor.",
        "Nörolojik muayenede kalıcı lateralizan defisit yok; görme alanı muayenesi yatak başında şu an doğal.",
        "Omuz kuşağı hareketlerinde sabah tutukluğunu destekleyen hassasiyet var, eklemde belirgin şişlik yok."
      ],
      "investigations": [
        {
          "id": "v291-new-648-yeni-baslayan-sakak-agrisi-ve-cene-yorulmasi-inflamasyon",
          "label": "İnflamasyon belirteçleri",
          "title": "İnflamasyon belirteçleri",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "İnflamasyon belirteçleri",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Belirgin akut faz yüksekliği büyük damar vasküliti için destekleyici veri sağlar.",
          "clinicalMeaning": "Belirgin akut faz yüksekliği büyük damar vasküliti için destekleyici veri sağlar.",
          "result": {
            "title": "İnflamasyon belirteçleri",
            "summary": "Belirgin akut faz yüksekliği büyük damar vasküliti için destekleyici veri sağlar.",
            "interpretation": "Belirgin akut faz yüksekliği büyük damar vasküliti için destekleyici veri sağlar.",
            "values": [
              [
                "ESR",
                "92 mm/saat",
                "<30 mm/saat",
                "Yüksek"
              ],
              [
                "CRP",
                "86 mg/L",
                "<5 mg/L",
                "Yüksek"
              ],
              [
                "Hemoglobin",
                "10.9 g/dL",
                "12-16 g/dL",
                "Hafif düşük"
              ],
              [
                "Trombosit",
                "486 x10^9/L",
                "150-400 x10^9/L",
                "Yüksek"
              ]
            ],
            "rows": [
              [
                "ESR",
                "92 mm/saat",
                "<30 mm/saat",
                "Yüksek"
              ],
              [
                "CRP",
                "86 mg/L",
                "<5 mg/L",
                "Yüksek"
              ],
              [
                "Hemoglobin",
                "10.9 g/dL",
                "12-16 g/dL",
                "Hafif düşük"
              ],
              [
                "Trombosit",
                "486 x10^9/L",
                "150-400 x10^9/L",
                "Yüksek"
              ]
            ]
          }
        },
        {
          "id": "v291-new-648-yeni-baslayan-sakak-agrisi-ve-cene-yorulmasi-goz",
          "label": "Göz ve nörolojik değerlendirme",
          "title": "Göz ve nörolojik değerlendirme",
          "type": "clinical",
          "priority": "essential",
          "subtype": "Göz ve nörolojik değerlendirme",
          "category": "clinical",
          "testTypeCategory": "clinical",
          "summary": "Geçici monoküler görme yakınması iskemik komplikasyon açısından alarmdır.",
          "clinicalMeaning": "Geçici monoküler görme yakınması iskemik komplikasyon açısından alarmdır.",
          "result": {
            "title": "Göz ve nörolojik değerlendirme",
            "summary": "Geçici monoküler görme yakınması iskemik komplikasyon açısından alarmdır.",
            "interpretation": "Geçici monoküler görme yakınması iskemik komplikasyon açısından alarmdır.",
            "values": [
              [
                "Görme yakınması",
                "Sağ gözde dakikalar süren perde hissi",
                "Beklenmez",
                "Geçici iskemik semptom"
              ],
              [
                "Fundus - acil değerlendirme",
                "Belirgin kanama yok, optik disk sınırları korunmuş",
                "Normal olabilir",
                "Tedaviyi geciktirmez"
              ],
              [
                "Fokal nörolojik defisit",
                "Yok",
                "Yok",
                "İnme lehine değil"
              ]
            ],
            "rows": [
              [
                "Görme yakınması",
                "Sağ gözde dakikalar süren perde hissi",
                "Beklenmez",
                "Geçici iskemik semptom"
              ],
              [
                "Fundus - acil değerlendirme",
                "Belirgin kanama yok, optik disk sınırları korunmuş",
                "Normal olabilir",
                "Tedaviyi geciktirmez"
              ],
              [
                "Fokal nörolojik defisit",
                "Yok",
                "Yok",
                "İnme lehine değil"
              ]
            ]
          }
        },
        {
          "id": "v291-new-648-yeni-baslayan-sakak-agrisi-ve-cene-yorulmasi-temporal",
          "label": "Temporal arter değerlendirmesi",
          "title": "Temporal arter değerlendirmesi",
          "type": "imaging",
          "priority": "essential",
          "subtype": "Temporal arter değerlendirmesi",
          "category": "imaging",
          "testTypeCategory": "imaging",
          "summary": "Tanısal doğrulama planlanır ancak tedavi geciktirilmez.",
          "clinicalMeaning": "Tanısal doğrulama planlanır ancak tedavi geciktirilmez.",
          "result": {
            "title": "Temporal arter değerlendirmesi",
            "summary": "Tanısal doğrulama planlanır ancak tedavi geciktirilmez.",
            "interpretation": "Tanısal doğrulama planlanır ancak tedavi geciktirilmez.",
            "values": [
              [
                "Doppler USG",
                "Sağ temporal arterde duvar kalınlaşması/halo bulgusu şüphesi",
                "Beklenmez",
                "Vaskülit lehine"
              ],
              [
                "Temporal arter biyopsisi",
                "Planlandı, sonuç bekleniyor",
                "Tanısal örnek",
                "Tedaviyi bekletmez"
              ],
              [
                "Sinüs muayenesi",
                "Pürülan akıntı yok",
                "Yok",
                "Sinüzit lehine değil"
              ]
            ],
            "rows": [
              [
                "Doppler USG",
                "Sağ temporal arterde duvar kalınlaşması/halo bulgusu şüphesi",
                "Beklenmez",
                "Vaskülit lehine"
              ],
              [
                "Temporal arter biyopsisi",
                "Planlandı, sonuç bekleniyor",
                "Tanısal örnek",
                "Tedaviyi bekletmez"
              ],
              [
                "Sinüs muayenesi",
                "Pürülan akıntı yok",
                "Yok",
                "Sinüzit lehine değil"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada kalıcı görme kaybını önlemek için en uygun ilk yaklaşım aşağıdakilerden hangisidir?",
      "questionType": "treatment",
      "answerTarget": "Acil yaklaşım",
      "diagnosis": {
        "correct": "Yüksek doz glukokortikoid tedaviyi hemen başlamak ve temporal arter biyopsisini geciktirmeden planlamak",
        "options": [
          "Biyopsi sonucu çıkana kadar analjezik tedaviyle beklemek",
          "Migren profilaksisi başlamak ve görme yakınması olursa tekrar değerlendirmek",
          "Yüksek doz glukokortikoid tedaviyi hemen başlamak ve temporal arter biyopsisini geciktirmeden planlamak",
          "Geniş spektrumlu antibiyotik başlamak ve sinüzit yanıtına göre steroid düşünmek",
          "Antikoagülasyon başlamak ve embolik inme açısından ayaktan takip planlamak"
        ],
        "question": "Bu hastada kalıcı görme kaybını önlemek için en uygun ilk yaklaşım aşağıdakilerden hangisidir?",
        "explanation": "Yaşlı hastada yeni temporal baş ağrısı, çene klaudikasyonu, saçlı deri hassasiyeti, geçici monoküler görme bulanıklığı ve yüksek ESR/CRP dev hücreli arterit açısından yüksek klinik şüphe oluşturur. Kalıcı görme kaybı gelişebileceği için yüksek doz glukokortikoid tedavi tanısal biyopsi veya görüntüleme sonucunu beklemeden başlanmalıdır. Temporal arter biyopsisi tanısal destek için planlanır; ancak tedavi gecikirse iskemik komplikasyon riski artar.",
        "pearls": [
          "Yeni başlayan baş ağrısı 50 yaş üstünde alarm bulgusudur.",
          "Çene klaudikasyonu dev hücreli arterit için çok ayırt ettirici bir klinik ipucudur.",
          "Görme semptomu varsa steroid tedavisi biyopsi beklenmeden başlanır."
        ],
        "optionFeedback": {
          "Biyopsi sonucu çıkana kadar analjezik tedaviyle beklemek": "Temporal arter biyopsisi tanıyı desteklemek için değerlidir; ancak görme kaybı riski olan klinik tabloda tedaviyi biyopsi sonucuna kadar ertelemek doğru değildir. Bu hastada yeni başlayan temporal baş ağrısı, çene klaudikasyonu, geçici görme bulanıklığı ve çok yüksek inflamasyon belirteçleri vardır. Analjezik bekle-gör yaklaşımı arteriyel inflamasyonu baskılamaz ve kalıcı görme kaybını önlemez. Biyopsi planlanmalı, fakat steroid tedavisi geciktirilmemelidir.",
          "Migren profilaksisi başlamak ve görme yakınması olursa tekrar değerlendirmek": "Migren genellikle daha genç yaşlarda tekrarlayan ataklarla başlar; fotofobi, bulantı ve benzer geçmiş ataklar eşlik edebilir. Bu hastada 70 yaş üzerinde yeni başlayan lokalize temporal ağrı, saçlı deri hassasiyeti ve çiğnemekle çene yorulması vardır; bunlar migren profilaksisinden çok dev hücreli arterit açısından alarm bulgularıdır. Geçici görme bulanıklığı da beklemeyi değil acil tedaviyi gerektirir. Bu nedenle migren gibi yönetmek kalıcı iskemik komplikasyon riskini artırır.",
          "Yüksek doz glukokortikoid tedaviyi hemen başlamak ve temporal arter biyopsisini geciktirmeden planlamak": "Bu seçenek en uygundur. Yaşlı hastada yeni başlayan temporal baş ağrısı, çene klaudikasyonu, saçlı deri hassasiyeti, geçici görme bulanıklığı ve belirgin ESR/CRP yüksekliği dev hücreli arteriti düşündürür. En önemli acil hedef kalıcı görme kaybını önlemektir; bu nedenle yüksek doz glukokortikoid tedavi klinik şüphe kuvvetliyken hemen başlanır. Temporal arter biyopsisi veya görüntüleme tanıyı desteklemek için planlanır, ancak tedaviyi geciktirme gerekçesi olmaz. TUS açısından “biyopsi beklenmez” ayrımı kritiktir.",
          "Geniş spektrumlu antibiyotik başlamak ve sinüzit yanıtına göre steroid düşünmek": "Sinüzit baş ağrısı yapabilir; ateş, pürülan burun akıntısı, yüz ağrısı ve üst solunum yolu bulguları beklenebilir. Bu hastada ana ipuçları çene klaudikasyonu, temporal arter hassasiyeti ve geçici görme semptomudur. Geniş spektrumlu antibiyotik bu vaskülitik inflamasyonu tedavi etmez. Steroidi yalnız antibiyotik yanıtına bırakmak, göz iskemisi açısından tehlikeli gecikmeye yol açar.",
          "Antikoagülasyon başlamak ve embolik inme açısından ayaktan takip planlamak": "Embolik olaylarda akut nörolojik defisit, atriyal fibrilasyon veya kardiyak kaynak gibi veriler aranır; bu hastada temel problem baş ağrısı-çene klaudikasyonu-görme bulanıklığı-inflamasyon paternidir. Antikoagülasyon dev hücreli arteritteki granülomatöz arter inflamasyonunu kontrol etmez ve görme kaybını önlemez. Ayaktan takip de geçici görme semptomu olan hastada güvenli değildir. Doğru yaklaşım acil glukokortikoid ve tanısal doğrulama planıdır."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Dev hücreli arterit, orta-büyük arterlerde granülomatöz inflamasyonla lümen daralması ve iskemik komplikasyon oluşturabilir.",
      "examPearl": "Yaşlı hasta + yeni temporal baş ağrısı + çene klaudikasyonu + geçici görme kaybı: steroid hemen, biyopsi sonra/erken planlanır.",
      "whyCorrect": "Doğru seçenek, görme kaybı riskini azaltmak için tedaviyi tanısal doğrulama beklemeden başlatır.",
      "optionComparison": "Analjezik bekleme, migren profilaksisi, antibiyotik veya antikoagülasyon bu vaskülitik mekanizmayı ve acil göz iskemisi riskini hedeflemez.",
      "evidenceChain": [
        "73 yaş ve yeni baş ağrısı → primer migren yerine sekonder neden alarmı.",
        "Çene klaudikasyonu ve temporal arter hassasiyeti → kraniyal arter vasküliti lehine klinik veri.",
        "Geçici monoküler bulanıklık → yaklaşımı acil hale getiren iskemik uyarı.",
        "ESR/CRP yüksekliği ve trombositoz → aktif inflamatuvar süreç desteği."
      ],
      "whyWrong": {
        "Biyopsi sonucu çıkana kadar analjezik tedaviyle beklemek": "Temporal arter biyopsisi tanıyı desteklemek için değerlidir; ancak görme kaybı riski olan klinik tabloda tedaviyi biyopsi sonucuna kadar ertelemek doğru değildir. Bu hastada yeni başlayan temporal baş ağrısı, çene klaudikasyonu, geçici görme bulanıklığı ve çok yüksek inflamasyon belirteçleri vardır. Analjezik bekle-gör yaklaşımı arteriyel inflamasyonu baskılamaz ve kalıcı görme kaybını önlemez. Biyopsi planlanmalı, fakat steroid tedavisi geciktirilmemelidir.",
        "Migren profilaksisi başlamak ve görme yakınması olursa tekrar değerlendirmek": "Migren genellikle daha genç yaşlarda tekrarlayan ataklarla başlar; fotofobi, bulantı ve benzer geçmiş ataklar eşlik edebilir. Bu hastada 70 yaş üzerinde yeni başlayan lokalize temporal ağrı, saçlı deri hassasiyeti ve çiğnemekle çene yorulması vardır; bunlar migren profilaksisinden çok dev hücreli arterit açısından alarm bulgularıdır. Geçici görme bulanıklığı da beklemeyi değil acil tedaviyi gerektirir. Bu nedenle migren gibi yönetmek kalıcı iskemik komplikasyon riskini artırır.",
        "Geniş spektrumlu antibiyotik başlamak ve sinüzit yanıtına göre steroid düşünmek": "Sinüzit baş ağrısı yapabilir; ateş, pürülan burun akıntısı, yüz ağrısı ve üst solunum yolu bulguları beklenebilir. Bu hastada ana ipuçları çene klaudikasyonu, temporal arter hassasiyeti ve geçici görme semptomudur. Geniş spektrumlu antibiyotik bu vaskülitik inflamasyonu tedavi etmez. Steroidi yalnız antibiyotik yanıtına bırakmak, göz iskemisi açısından tehlikeli gecikmeye yol açar.",
        "Antikoagülasyon başlamak ve embolik inme açısından ayaktan takip planlamak": "Embolik olaylarda akut nörolojik defisit, atriyal fibrilasyon veya kardiyak kaynak gibi veriler aranır; bu hastada temel problem baş ağrısı-çene klaudikasyonu-görme bulanıklığı-inflamasyon paternidir. Antikoagülasyon dev hücreli arteritteki granülomatöz arter inflamasyonunu kontrol etmez ve görme kaybını önlemez. Ayaktan takip de geçici görme semptomu olan hastada güvenli değildir. Doğru yaklaşım acil glukokortikoid ve tanısal doğrulama planıdır."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v291",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V290 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v292-new-649-aniden-baslayan-carpinti-ve-bas-donmesi",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Aniden başlayan çarpıntı ve baş dönmesi",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Stabil düzenli dar QRS taşikardide AV nod bağımlı ritim olasılığını tanıyıp akut tedavi basamağını seçme.",
      "learningTarget": "Paroksismal supraventriküler taşikardide hemodinamik stabiliteye göre vagal manevra, adenozin ve kardiyoversiyon ayrımını kavrama.",
      "demographics": "28 yaşında kadın hasta",
      "setting": "Acil servis",
      "chiefComplaint": "Hasta, aniden başlayan hızlı çarpıntı ve baş dönmesi nedeniyle acil servise başvuruyor.",
      "stem": "Hasta iş yerinde otururken göğsünde bir anda kuş çırpınıyormuş gibi hızlı ve düzenli çarpıntı başladığını anlatır. Yakınması yaklaşık kırk dakikadır sürmektedir; birkaç kez derin nefes alıp beklemiş ama ritim kendiliğinden düzelmemiştir. Daha önce iki kez benzer atak yaşamış, biri birkaç dakika içinde kendiliğinden geçmiş, diğeri acile gitmeden önce sonlanmıştır. Bu kez baş dönmesi belirginleştiği için arkadaşları tarafından hastaneye getirilmiştir. Göğüs ağrısı, bayılma, ateş veya son günlerde ishal-kusma tariflemez. Bilinen kalp hastalığı yoktur; enerji içeceği tükettiğini ve son günlerde uykusuz kaldığını söyler.",
      "patientIntro": {
        "profile": "28 yaşında kadın hasta, Acil servis başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, aniden başlayan hızlı çarpıntı ve baş dönmesi nedeniyle acil servise başvuruyor.",
        "historySummary": "Hasta iş yerinde otururken göğsünde bir anda kuş çırpınıyormuş gibi hızlı ve düzenli çarpıntı başladığını anlatır. Yakınması yaklaşık kırk dakikadır sürmektedir; birkaç kez derin nefes alıp beklemiş ama ritim kendiliğinden düzelmemiştir. Daha önce iki kez benzer atak yaşamış, biri birkaç dakika içinde kendiliğinden geçmiş, diğeri acile gitmeden önce sonlanmıştır. Bu kez baş dönmesi belirginleştiği için arkadaşları tarafından hastaneye getirilmiştir. Göğüs ağrısı, bayılma, ateş veya son günlerde ishal-kusma tariflemez. Bilinen kalp hastalığı yoktur; enerji içeceği tükettiğini ve son günlerde uykusuz kaldığını söyler."
      },
      "vitals": {
        "TA": "118/74 mmHg",
        "Nabız": "186/dk, düzenli",
        "Solunum": "20/dk",
        "SpO2": "%99, oda havasında",
        "Ateş": "36.8 °C",
        "Şok indeksi": "1.57; kapiller dolum <2 sn, ekstremiteler sıcak"
      },
      "exam": [
        "Genel durumu iyi, konuşurken çarpıntı nedeniyle huzursuz.",
        "Kalp sesleri hızlı ve düzenli; yeni üfürüm duyulmuyor.",
        "Akciğer muayenesi doğal, ral veya wheezing yok.",
        "Boyun venöz dolgunluğu yok, periferik ödem izlenmiyor."
      ],
      "investigations": [
        {
          "id": "v292-new-649-aniden-baslayan-carpinti-ve-bas-donmesi-ekg",
          "label": "12 derivasyonlu EKG",
          "title": "12 derivasyonlu EKG",
          "type": "electrocardiography",
          "priority": "essential",
          "subtype": "EKG",
          "category": "cardiology",
          "testTypeCategory": "cardiology",
          "summary": "Düzenli dar kompleks hızlı ritim, AV nod bağımlı taşikardi olasılığını güçlendirir.",
          "clinicalMeaning": "Düzenli dar kompleks hızlı ritim, AV nod bağımlı taşikardi olasılığını güçlendirir.",
          "result": {
            "title": "12 derivasyonlu EKG",
            "summary": "Düzenli dar kompleks hızlı ritim, AV nod bağımlı taşikardi olasılığını güçlendirir.",
            "interpretation": "Düzenli dar kompleks hızlı ritim, AV nod bağımlı taşikardi olasılığını güçlendirir.",
            "values": [
              [
                "Ritim",
                "Düzenli dar QRS taşikardi",
                "Sinüs ritmi 60-100/dk",
                "Anormal"
              ],
              [
                "Ventrikül hızı",
                "186/dk",
                "60-100/dk",
                "Yüksek"
              ],
              [
                "QRS süresi",
                "82 ms",
                "<120 ms",
                "Dar"
              ],
              [
                "P dalgaları",
                "Net seçilemiyor; QRS sonrası küçük retrograd defleksiyonlar",
                "Sinüs P dalgası beklenir",
                "AV nod bağımlı ritmi destekler"
              ],
              [
                "ST-T",
                "Akut iskemik elevasyon yok",
                "ST elevasyonu olmamalı",
                "Acil iskemi lehine değil"
              ]
            ],
            "rows": [
              [
                "Ritim",
                "Düzenli dar QRS taşikardi",
                "Sinüs ritmi 60-100/dk",
                "Anormal"
              ],
              [
                "Ventrikül hızı",
                "186/dk",
                "60-100/dk",
                "Yüksek"
              ],
              [
                "QRS süresi",
                "82 ms",
                "<120 ms",
                "Dar"
              ],
              [
                "P dalgaları",
                "Net seçilemiyor; QRS sonrası küçük retrograd defleksiyonlar",
                "Sinüs P dalgası beklenir",
                "AV nod bağımlı ritmi destekler"
              ],
              [
                "ST-T",
                "Akut iskemik elevasyon yok",
                "ST elevasyonu olmamalı",
                "Acil iskemi lehine değil"
              ]
            ]
          }
        },
        {
          "id": "v292-new-649-aniden-baslayan-carpinti-ve-bas-donmesi-biyokimya",
          "label": "Temel biyokimya ve elektrolitler",
          "title": "Temel biyokimya ve elektrolitler",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Biyokimya",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Elektrolit bozukluğu saptanmaması taşikardinin akut ilaç/elektrolit tetikleyicisinden çok reentran ritimle ilişkili olabileceğini destekler.",
          "clinicalMeaning": "Elektrolit bozukluğu saptanmaması taşikardinin akut ilaç/elektrolit tetikleyicisinden çok reentran ritimle ilişkili olabileceğini destekler.",
          "result": {
            "title": "Temel biyokimya ve elektrolitler",
            "summary": "Elektrolit bozukluğu saptanmaması taşikardinin akut ilaç/elektrolit tetikleyicisinden çok reentran ritimle ilişkili olabileceğini destekler.",
            "interpretation": "Elektrolit bozukluğu saptanmaması taşikardinin akut ilaç/elektrolit tetikleyicisinden çok reentran ritimle ilişkili olabileceğini destekler.",
            "values": [
              [
                "Sodyum",
                "139 mmol/L",
                "135-145 mmol/L",
                "Normal"
              ],
              [
                "Potasyum",
                "4.1 mmol/L",
                "3.5-5.0 mmol/L",
                "Normal"
              ],
              [
                "Magnezyum",
                "1.9 mg/dL",
                "1.7-2.4 mg/dL",
                "Normal"
              ],
              [
                "Kreatinin",
                "0.72 mg/dL",
                "0.5-1.1 mg/dL",
                "Normal"
              ]
            ],
            "rows": [
              [
                "Sodyum",
                "139 mmol/L",
                "135-145 mmol/L",
                "Normal"
              ],
              [
                "Potasyum",
                "4.1 mmol/L",
                "3.5-5.0 mmol/L",
                "Normal"
              ],
              [
                "Magnezyum",
                "1.9 mg/dL",
                "1.7-2.4 mg/dL",
                "Normal"
              ],
              [
                "Kreatinin",
                "0.72 mg/dL",
                "0.5-1.1 mg/dL",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v292-new-649-aniden-baslayan-carpinti-ve-bas-donmesi-troponin",
          "label": "Kardiyak belirteç",
          "title": "Kardiyak belirteç",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Troponin",
          "category": "cardiology",
          "testTypeCategory": "cardiology",
          "summary": "Göğüs ağrısı olmayan genç hastada normal troponin, akut miyokard hasarı lehine güçlü veri sağlamaz.",
          "clinicalMeaning": "Göğüs ağrısı olmayan genç hastada normal troponin, akut miyokard hasarı lehine güçlü veri sağlamaz.",
          "result": {
            "title": "Kardiyak belirteç",
            "summary": "Göğüs ağrısı olmayan genç hastada normal troponin, akut miyokard hasarı lehine güçlü veri sağlamaz.",
            "interpretation": "Göğüs ağrısı olmayan genç hastada normal troponin, akut miyokard hasarı lehine güçlü veri sağlamaz.",
            "values": [
              [
                "Yüksek duyarlıklı troponin I",
                "7 ng/L",
                "<14 ng/L",
                "Normal"
              ]
            ],
            "rows": [
              [
                "Yüksek duyarlıklı troponin I",
                "7 ng/L",
                "<14 ng/L",
                "Normal"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada acil yönetimde en uygun ilk yaklaşım aşağıdakilerden hangisidir?",
      "questionType": "management",
      "answerTarget": "Stabil düzenli dar QRS taşikardide akut tedavi",
      "diagnosis": {
        "correct": "Vagal manevra sonrası hızlı intravenöz adenozin bolusu vermek",
        "options": [
          "Senkronize elektriksel kardiyoversiyon uygulamak",
          "Vagal manevra sonrası hızlı intravenöz adenozin bolusu vermek",
          "İntravenöz amiodaron infüzyonu başlamak",
          "Uzun etkili oral beta-bloker reçete edip ayaktan takip etmek",
          "Antikoagülasyon başlamak ve hız kontrolü için digoksin vermek"
        ],
        "question": "Bu hastada acil yönetimde en uygun ilk yaklaşım aşağıdakilerden hangisidir?",
        "explanation": "Düzenli dar QRS taşikardisi olan ve hemodinamik olarak stabil seyreden hastada AV nod bağımlı paroksismal supraventriküler taşikardi ön plandadır. Bu durumda önce vagal manevra denenir; başarısız olursa hızlı intravenöz adenozin AV nodu geçici bloke ederek ritmi sonlandırabilir. Hipotansiyon, şok, akut iskemik göğüs ağrısı veya bilinç bozukluğu gelişirse senkronize kardiyoversiyon öncelik kazanır.",
        "pearls": [
          "Stabil düzenli dar QRS taşikardide vagal manevra ve adenozin ilk akut basamaklardır.",
          "İnstabil taşikardide ilaç beklenmez; senkronize kardiyoversiyon yapılır.",
          "Düzensiz ritim yoksa AF antikoagülasyon-hız kontrol mantığına atlamak hatalıdır."
        ],
        "optionFeedback": {
          "Senkronize elektriksel kardiyoversiyon uygulamak": "Senkronize kardiyoversiyon, düzenli dar QRS taşikardisi olan hastada hipotansiyon, iskemik göğüs ağrısı, akut kalp yetersizliği, şok veya bilinç bozukluğu gibi hemodinamik instabilite varsa ilk seçenektir. Bu hastada çarpıntı ve baş dönmesi vardır ancak kan basıncı korunmuş, perfüzyon iyi ve göğüs ağrısı yoktur. Bu nedenle kardiyoversiyon şu an gereksiz invaziv bir ilk basamak olur. Hasta instabil hale gelirse aynı ritim için yaklaşım hemen değişir.",
          "Vagal manevra sonrası hızlı intravenöz adenozin bolusu vermek": "Bu seçenek en uygundur. EKG’de düzenli dar QRS taşikardisi, ani başlayıp ani sonlanan çarpıntı öyküsü ve belirgin P dalgasının seçilememesi AV nod bağımlı paroksismal supraventriküler taşikardi olasılığını güçlendirir. Hemodinamik olarak stabil hastada önce vagal manevra denenir; yanıt alınmazsa hızlı intravenöz adenozin AV nod iletimini geçici olarak bloke ederek ritmi sonlandırabilir veya altta yatan atriyal aktiviteyi görünür hale getirir. TUS açısından kritik ayrım, stabil düzenli dar kompleks taşikardide adenosinin; instabil hastada ise senkronize kardiyoversiyonun öncelikli olmasıdır.",
          "İntravenöz amiodaron infüzyonu başlamak": "Amiodaron geniş kompleks taşikardi, bazı ventriküler aritmiler veya seçilmiş atriyal ritim bozukluklarında kullanılabilir; ancak stabil, düzenli, dar QRS ve AV nod bağımlı taşikardi şüphesinde ilk basamak değildir. Bu hastada ritmin düzenli ve dar kompleks olması, ani başlangıç öyküsü ve yapısal instabilite bulgusu olmaması AVNRT/AVRT spektrumunu daha olası yapar. Amiodaron gereksiz ilaç yükü, hipotansiyon ve QT etkisi gibi riskler oluşturabilir. Öncelik vagal manevra ve adenozindir.",
          "Uzun etkili oral beta-bloker reçete edip ayaktan takip etmek": "Uzun etkili oral beta-blokerler tekrarlayan atakların önlenmesinde veya elektif takipte rol alabilir; ancak acile semptomatik hızlı taşikardi ile gelen hastada akut ritmi sonlandırmak için tek başına ayaktan reçete yeterli değildir. Bu hasta baş dönmesi ve 186/dk düzenli taşikardi ile başvurmuştur. Önce akut ritim kontrol edilmeli, daha sonra tetikleyici, nüks riski ve elektrofizyolojik ablasyon gereksinimi değerlendirilmelidir.",
          "Antikoagülasyon başlamak ve hız kontrolü için digoksin vermek": "Antikoagülasyon ve digoksin daha çok atriyal fibrilasyon/flutter gibi düzensiz atriyal ritimlerde hız kontrolü ve tromboemboli risk yönetimi bağlamında düşünülür. Bu hastanın ritmi düzenli dar QRS taşikardidir; EKG’de düzensiz RR aralıkları veya atriyal fibrilasyon paterni yoktur. Digoksin akut AVNRT sonlandırmada tercih edilen ilk ilaç değildir. Ayrıca gereksiz antikoagülasyon kanama riski oluşturur."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "AV nod bağımlı reentran taşikardiler ani başlayıp ani sonlanır; düzenli dar QRS taşikardi ve retrograd P ipuçları tipiktir.",
      "examPearl": "Stabil SVT: vagal manevra → adenozin; instabil SVT: senkronize kardiyoversiyon.",
      "whyCorrect": "Doğru seçenek, stabil düzenli dar QRS taşikardinin akut sonlandırılmasına yönelik en uygun basamakları içerir.",
      "optionComparison": "Kardiyoversiyon instabiliteye, amiodaron geniş kompleks/ventriküler ritimlere, antikoagülasyon ise AF gibi düzensiz atriyal ritimlere daha uygundur.",
      "evidenceChain": [
        "Ani başlangıç ve önceki benzer ataklar → paroksismal reentran taşikardi lehine öykü.",
        "Nabız 186/dk ama kan basıncı ve perfüzyon korunmuş → stabil taşikardi yaklaşımı.",
        "Dar QRS ve düzenli ritim → AV nod bağımlı SVT olasılığını artırır.",
        "Akut iskemi ve elektrolit bozukluğu verisi yok → adenozin öncesi temel güvenlik verileri destekleyici."
      ],
      "whyWrong": {
        "Senkronize elektriksel kardiyoversiyon uygulamak": "Senkronize kardiyoversiyon, düzenli dar QRS taşikardisi olan hastada hipotansiyon, iskemik göğüs ağrısı, akut kalp yetersizliği, şok veya bilinç bozukluğu gibi hemodinamik instabilite varsa ilk seçenektir. Bu hastada çarpıntı ve baş dönmesi vardır ancak kan basıncı korunmuş, perfüzyon iyi ve göğüs ağrısı yoktur. Bu nedenle kardiyoversiyon şu an gereksiz invaziv bir ilk basamak olur. Hasta instabil hale gelirse aynı ritim için yaklaşım hemen değişir.",
        "İntravenöz amiodaron infüzyonu başlamak": "Amiodaron geniş kompleks taşikardi, bazı ventriküler aritmiler veya seçilmiş atriyal ritim bozukluklarında kullanılabilir; ancak stabil, düzenli, dar QRS ve AV nod bağımlı taşikardi şüphesinde ilk basamak değildir. Bu hastada ritmin düzenli ve dar kompleks olması, ani başlangıç öyküsü ve yapısal instabilite bulgusu olmaması AVNRT/AVRT spektrumunu daha olası yapar. Amiodaron gereksiz ilaç yükü, hipotansiyon ve QT etkisi gibi riskler oluşturabilir. Öncelik vagal manevra ve adenozindir.",
        "Uzun etkili oral beta-bloker reçete edip ayaktan takip etmek": "Uzun etkili oral beta-blokerler tekrarlayan atakların önlenmesinde veya elektif takipte rol alabilir; ancak acile semptomatik hızlı taşikardi ile gelen hastada akut ritmi sonlandırmak için tek başına ayaktan reçete yeterli değildir. Bu hasta baş dönmesi ve 186/dk düzenli taşikardi ile başvurmuştur. Önce akut ritim kontrol edilmeli, daha sonra tetikleyici, nüks riski ve elektrofizyolojik ablasyon gereksinimi değerlendirilmelidir.",
        "Antikoagülasyon başlamak ve hız kontrolü için digoksin vermek": "Antikoagülasyon ve digoksin daha çok atriyal fibrilasyon/flutter gibi düzensiz atriyal ritimlerde hız kontrolü ve tromboemboli risk yönetimi bağlamında düşünülür. Bu hastanın ritmi düzenli dar QRS taşikardidir; EKG’de düzensiz RR aralıkları veya atriyal fibrilasyon paterni yoktur. Digoksin akut AVNRT sonlandırmada tercih edilen ilk ilaç değildir. Ayrıca gereksiz antikoagülasyon kanama riski oluşturur."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v292",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V291 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v292-new-650-sarilik-istahsizlik-ve-sag-ust-kadran-hassasiyeti",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Sarılık, iştahsızlık ve sağ üst kadran hassasiyeti",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Ağır alkol ilişkili hepatitte laboratuvar paternini, prognostik skoru ve steroid öncesi dışlanması gereken durumları birlikte değerlendirme.",
      "learningTarget": "Alkolik hepatitte AST/ALT paterni, INR-bilirubin temelli ağırlık değerlendirmesi ve seçilmiş hastada prednizolon kararını öğrenme.",
      "demographics": "46 yaşında erkek hasta",
      "setting": "Dahiliye servisi",
      "chiefComplaint": "Hasta, giderek artan sarılık ve iştahsızlık nedeniyle servise yatırılıyor.",
      "stem": "Hasta son üç haftadır iştahının belirgin azaldığını, yemek kokusuyla bulantısının arttığını ve gözlerindeki sarılığın ailesi tarafından fark edildiğini anlatır. Karnının sağ üst tarafında baskı tarzında rahatsızlık vardır; ağrı sırta kuşak tarzında yayılmamaktadır. Uzun süredir her gün alkol aldığını, son bir ayda iş kaybı sonrası miktarın arttığını söyler. Son günlerde koyu renk idrar fark etmiş, ancak kanlı kusma veya siyah dışkı tariflememiştir. Titreme ile yükselen ateş, yeni ilaç kullanımı veya yakın zamanda seyahat öyküsü yoktur. Daha önce karaciğer hastalığı tanısı konmamış, fakat son yılda kilo kaybı ve kaslarında erime olduğunu ailesi belirtmiştir.",
      "patientIntro": {
        "profile": "46 yaşında erkek hasta, Dahiliye servisi başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, giderek artan sarılık ve iştahsızlık nedeniyle servise yatırılıyor.",
        "historySummary": "Hasta son üç haftadır iştahının belirgin azaldığını, yemek kokusuyla bulantısının arttığını ve gözlerindeki sarılığın ailesi tarafından fark edildiğini anlatır. Karnının sağ üst tarafında baskı tarzında rahatsızlık vardır; ağrı sırta kuşak tarzında yayılmamaktadır. Uzun süredir her gün alkol aldığını, son bir ayda iş kaybı sonrası miktarın arttığını söyler. Son günlerde koyu renk idrar fark etmiş, ancak kanlı kusma veya siyah dışkı tariflememiştir. Titreme ile yükselen ateş, yeni ilaç kullanımı veya yakın zamanda seyahat öyküsü yoktur. Daha önce karaciğer hastalığı tanısı konmamış, fakat son yılda kilo kaybı ve kaslarında erime olduğunu ailesi belirtmiştir."
      },
      "vitals": {
        "TA": "106/68 mmHg",
        "Nabız": "104/dk, düzenli",
        "Solunum": "18/dk",
        "SpO2": "%97, oda havasında",
        "Ateş": "37.4 °C",
        "Şok indeksi": "0.98; kapiller dolum 2 sn, mukozalar hafif kuru"
      },
      "exam": [
        "Skleralar belirgin ikterik, hasta halsiz görünüyor.",
        "Karında sağ üst kadranda hassasiyet var; defans ve rebound yok.",
        "Karaciğer kenarı kot altında hassas palpe ediliyor, belirgin asit dalgası alınmıyor.",
        "Asteriksis yok, bilinç açık ve oryante."
      ],
      "investigations": [
        {
          "id": "v292-new-650-sarilik-istahsizlik-ve-sag-ust-kadran-hassasiyeti-karaciger-paneli",
          "label": "Karaciğer paneli ve koagülasyon",
          "title": "Karaciğer paneli ve koagülasyon",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Karaciğer fonksiyon testleri",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "AST/ALT oranı, belirgin bilirubin yüksekliği ve koagülasyon bozukluğu ağır hepatik inflamasyon paternini destekler.",
          "clinicalMeaning": "AST/ALT oranı, belirgin bilirubin yüksekliği ve koagülasyon bozukluğu ağır hepatik inflamasyon paternini destekler.",
          "result": {
            "title": "Karaciğer paneli ve koagülasyon",
            "summary": "AST/ALT oranı, belirgin bilirubin yüksekliği ve koagülasyon bozukluğu ağır hepatik inflamasyon paternini destekler.",
            "interpretation": "AST/ALT oranı, belirgin bilirubin yüksekliği ve koagülasyon bozukluğu ağır hepatik inflamasyon paternini destekler.",
            "values": [
              [
                "AST",
                "186 U/L",
                "<40 U/L",
                "Yüksek"
              ],
              [
                "ALT",
                "72 U/L",
                "<41 U/L",
                "Yüksek"
              ],
              [
                "AST/ALT oranı",
                "2.6",
                "<1 beklenir",
                "Alkol ilişkili patern lehine"
              ],
              [
                "Total bilirubin",
                "14.8 mg/dL",
                "0.2-1.2 mg/dL",
                "Yüksek"
              ],
              [
                "Direkt bilirubin",
                "9.6 mg/dL",
                "<0.3 mg/dL",
                "Yüksek"
              ],
              [
                "INR",
                "2.1",
                "0.8-1.2",
                "Uzamış"
              ],
              [
                "Albumin",
                "2.8 g/dL",
                "3.5-5.0 g/dL",
                "Düşük"
              ]
            ],
            "rows": [
              [
                "AST",
                "186 U/L",
                "<40 U/L",
                "Yüksek"
              ],
              [
                "ALT",
                "72 U/L",
                "<41 U/L",
                "Yüksek"
              ],
              [
                "AST/ALT oranı",
                "2.6",
                "<1 beklenir",
                "Alkol ilişkili patern lehine"
              ],
              [
                "Total bilirubin",
                "14.8 mg/dL",
                "0.2-1.2 mg/dL",
                "Yüksek"
              ],
              [
                "Direkt bilirubin",
                "9.6 mg/dL",
                "<0.3 mg/dL",
                "Yüksek"
              ],
              [
                "INR",
                "2.1",
                "0.8-1.2",
                "Uzamış"
              ],
              [
                "Albumin",
                "2.8 g/dL",
                "3.5-5.0 g/dL",
                "Düşük"
              ]
            ]
          }
        },
        {
          "id": "v292-new-650-sarilik-istahsizlik-ve-sag-ust-kadran-hassasiyeti-inflamasyon",
          "label": "Tam kan ve inflamasyon",
          "title": "Tam kan ve inflamasyon",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Hematoloji",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Lökositoz alkol ilişkili hepatitte inflamatuvar yanıtla görülebilir; aktif enfeksiyon açısından klinikle birlikte değerlendirilmelidir.",
          "clinicalMeaning": "Lökositoz alkol ilişkili hepatitte inflamatuvar yanıtla görülebilir; aktif enfeksiyon açısından klinikle birlikte değerlendirilmelidir.",
          "result": {
            "title": "Tam kan ve inflamasyon",
            "summary": "Lökositoz alkol ilişkili hepatitte inflamatuvar yanıtla görülebilir; aktif enfeksiyon açısından klinikle birlikte değerlendirilmelidir.",
            "interpretation": "Lökositoz alkol ilişkili hepatitte inflamatuvar yanıtla görülebilir; aktif enfeksiyon açısından klinikle birlikte değerlendirilmelidir.",
            "values": [
              [
                "Lökosit",
                "17.800/mm³",
                "4.000-10.000/mm³",
                "Yüksek"
              ],
              [
                "Hemoglobin",
                "11.2 g/dL",
                "13.5-17.5 g/dL",
                "Düşük"
              ],
              [
                "Trombosit",
                "156.000/mm³",
                "150.000-400.000/mm³",
                "Alt sınır"
              ],
              [
                "CRP",
                "21 mg/L",
                "<5 mg/L",
                "Yüksek"
              ]
            ],
            "rows": [
              [
                "Lökosit",
                "17.800/mm³",
                "4.000-10.000/mm³",
                "Yüksek"
              ],
              [
                "Hemoglobin",
                "11.2 g/dL",
                "13.5-17.5 g/dL",
                "Düşük"
              ],
              [
                "Trombosit",
                "156.000/mm³",
                "150.000-400.000/mm³",
                "Alt sınır"
              ],
              [
                "CRP",
                "21 mg/L",
                "<5 mg/L",
                "Yüksek"
              ]
            ]
          }
        },
        {
          "id": "v292-new-650-sarilik-istahsizlik-ve-sag-ust-kadran-hassasiyeti-skor",
          "label": "Prognostik skor",
          "title": "Prognostik skor",
          "type": "clinical_score",
          "priority": "essential",
          "subtype": "Klinik skor",
          "category": "score",
          "testTypeCategory": "score",
          "summary": "Skorlar hastalığın ağır seyirli olduğunu ve seçilmiş hastada steroid değerlendirmesi gerektiğini gösterir.",
          "clinicalMeaning": "Skorlar hastalığın ağır seyirli olduğunu ve seçilmiş hastada steroid değerlendirmesi gerektiğini gösterir.",
          "result": {
            "title": "Prognostik skor",
            "summary": "Skorlar hastalığın ağır seyirli olduğunu ve seçilmiş hastada steroid değerlendirmesi gerektiğini gösterir.",
            "interpretation": "Skorlar hastalığın ağır seyirli olduğunu ve seçilmiş hastada steroid değerlendirmesi gerektiğini gösterir.",
            "values": [
              [
                "Maddrey diskriminant fonksiyon",
                "46",
                "<32 düşük risk; ≥32 ağır hastalık",
                "Yüksek risk"
              ],
              [
                "MELD-Na",
                "25",
                "Daha yüksek skor daha kötü prognoz",
                "Yüksek risk"
              ]
            ],
            "rows": [
              [
                "Maddrey diskriminant fonksiyon",
                "46",
                "<32 düşük risk; ≥32 ağır hastalık",
                "Yüksek risk"
              ],
              [
                "MELD-Na",
                "25",
                "Daha yüksek skor daha kötü prognoz",
                "Yüksek risk"
              ]
            ]
          }
        },
        {
          "id": "v292-new-650-sarilik-istahsizlik-ve-sag-ust-kadran-hassasiyeti-usg",
          "label": "Abdominal ultrasonografi",
          "title": "Abdominal ultrasonografi",
          "type": "ultrasound",
          "priority": "essential",
          "subtype": "Görüntüleme",
          "category": "imaging",
          "testTypeCategory": "imaging",
          "summary": "Safra yolu tıkanıklığına ait belirgin görüntüleme bulgusu yoktur.",
          "clinicalMeaning": "Safra yolu tıkanıklığına ait belirgin görüntüleme bulgusu yoktur.",
          "result": {
            "title": "Abdominal ultrasonografi",
            "summary": "Safra yolu tıkanıklığına ait belirgin görüntüleme bulgusu yoktur.",
            "interpretation": "Safra yolu tıkanıklığına ait belirgin görüntüleme bulgusu yoktur.",
            "values": [
              [
                "Karaciğer",
                "Hafif büyümüş ve hiperekojen",
                "Homojen beklenir",
                "Yağlanma/alkol etkisi lehine"
              ],
              [
                "Safra yolları",
                "İntra/ekstrahepatik dilatasyon yok",
                "Dilatasyon olmamalı",
                "Obstrüksiyon lehine değil"
              ],
              [
                "Safra kesesi",
                "Taş izlenmedi",
                "Taş olmamalı",
                "Kolanjit kaynağı desteklenmiyor"
              ],
              [
                "Asit",
                "Minimal serbest sıvı",
                "Yok/minimal",
                "Belirgin gergin asit yok"
              ]
            ],
            "rows": [
              [
                "Karaciğer",
                "Hafif büyümüş ve hiperekojen",
                "Homojen beklenir",
                "Yağlanma/alkol etkisi lehine"
              ],
              [
                "Safra yolları",
                "İntra/ekstrahepatik dilatasyon yok",
                "Dilatasyon olmamalı",
                "Obstrüksiyon lehine değil"
              ],
              [
                "Safra kesesi",
                "Taş izlenmedi",
                "Taş olmamalı",
                "Kolanjit kaynağı desteklenmiyor"
              ],
              [
                "Asit",
                "Minimal serbest sıvı",
                "Yok/minimal",
                "Belirgin gergin asit yok"
              ]
            ]
          }
        },
        {
          "id": "v292-new-650-sarilik-istahsizlik-ve-sag-ust-kadran-hassasiyeti-enfeksiyon-tarama",
          "label": "Enfeksiyon ve kanama dışlama verileri",
          "title": "Enfeksiyon ve kanama dışlama verileri",
          "type": "clinical_assessment",
          "priority": "essential",
          "subtype": "Klinik güvenlik",
          "category": "clinical",
          "testTypeCategory": "clinical",
          "summary": "Steroid kararı öncesi enfeksiyon ve aktif kanama açısından güvenlik değerlendirmesi yapılmıştır.",
          "clinicalMeaning": "Steroid kararı öncesi enfeksiyon ve aktif kanama açısından güvenlik değerlendirmesi yapılmıştır.",
          "result": {
            "title": "Enfeksiyon ve kanama dışlama verileri",
            "summary": "Steroid kararı öncesi enfeksiyon ve aktif kanama açısından güvenlik değerlendirmesi yapılmıştır.",
            "interpretation": "Steroid kararı öncesi enfeksiyon ve aktif kanama açısından güvenlik değerlendirmesi yapılmıştır.",
            "values": [
              [
                "Kan kültürü",
                "İlk 24 saatte üreme yok",
                "Üreme olmamalı",
                "Aktif bakteriyemi desteklenmiyor"
              ],
              [
                "Akciğer grafisi",
                "Yeni infiltrasyon yok",
                "İnfiltrasyon olmamalı",
                "Pnömoni lehine değil"
              ],
              [
                "Dışkı rengi",
                "Melena tariflemiyor",
                "Melena olmamalı",
                "Aktif üst GİS kanama verisi yok"
              ]
            ],
            "rows": [
              [
                "Kan kültürü",
                "İlk 24 saatte üreme yok",
                "Üreme olmamalı",
                "Aktif bakteriyemi desteklenmiyor"
              ],
              [
                "Akciğer grafisi",
                "Yeni infiltrasyon yok",
                "İnfiltrasyon olmamalı",
                "Pnömoni lehine değil"
              ],
              [
                "Dışkı rengi",
                "Melena tariflemiyor",
                "Melena olmamalı",
                "Aktif üst GİS kanama verisi yok"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hasta için hastalık ağırlığı ve dışlama verileri dikkate alındığında en uygun tedavi yaklaşımı hangisidir?",
      "questionType": "treatment",
      "answerTarget": "Ağır alkol ilişkili hepatitte tedavi kararı",
      "diagnosis": {
        "correct": "Enfeksiyon ve gastrointestinal kanama dışlandıktan sonra prednizolon başlamak",
        "options": [
          "Acil ERCP ile safra yolu drenajı yapmak",
          "Ursodeoksikolik asit başlamak",
          "Sadece antibiyotik verip steroid tedavisinden kaçınmak",
          "Enfeksiyon ve gastrointestinal kanama dışlandıktan sonra prednizolon başlamak",
          "Acil karaciğer biyopsisi sonucu çıkana kadar özgül tedavi vermemek"
        ],
        "question": "Bu hasta için hastalık ağırlığı ve dışlama verileri dikkate alındığında en uygun tedavi yaklaşımı hangisidir?",
        "explanation": "Ağır alkol ilişkili hepatit; uzun süreli alkol kullanımı, sarılık, sağ üst kadran hassasiyeti, AST/ALT oranının genellikle 2’nin üzerinde olması, belirgin bilirubin yüksekliği ve koagülasyon bozukluğu ile düşünülür. Maddrey diskriminant fonksiyonunun 32’nin üzerinde olması ağır hastalığı gösterir. Aktif enfeksiyon, gastrointestinal kanama ve diğer kontrendikasyonlar dışlandıktan sonra prednizolon seçilmiş ağır olgularda düşünülebilir; destek tedavisi ve alkol kesilmesi vazgeçilmezdir.",
        "pearls": [
          "AST/ALT oranı >2 ve transaminazların çok aşırı yükselmemesi alkol ilişkili paterni destekler.",
          "Maddrey DF ≥32 ağır hastalık lehinedir.",
          "Steroid başlanmadan önce enfeksiyon ve aktif GİS kanama araştırılmalıdır."
        ],
        "optionFeedback": {
          "Acil ERCP ile safra yolu drenajı yapmak": "ERCP ile safra yolu drenajı, kolanjit veya tıkanmaya bağlı kolestazda kritik bir kaynak kontrol yöntemidir. Bu hastada sağ üst kadran hassasiyeti ve sarılık olsa da ultrasonografide safra yolları dilate değildir; ALP-GGT yüksekliği AST/ALT paterninin önüne geçmiş değildir ve öykü ağır alkol kullanımını destekler. Ateş veya hipotansiyon gibi kolanjit bulguları belirgin değildir. Bu nedenle ilk hedef safra yolu drenajı değil, ağır alkol ilişkili hepatitin destek ve seçilmiş antiinflamatuvar tedavisidir.",
          "Ursodeoksikolik asit başlamak": "Ursodeoksikolik asit primer biliyer kolanjitte kolestatik enzim yüksekliği, AMA pozitifliği ve kronik kaşıntı-yorgunluk paterniyle kullanılır. Bu hastada kısa sürede gelişen sarılık, sağ üst kadran hassasiyeti, AST/ALT oranının alkol lehine olması, lökositoz ve uzamış INR ön plandadır. AMA pozitifliği veya tipik kronik PBC paterni verilmemiştir. Bu yüzden ursodeoksikolik asit bu akut ağır hepatik inflamasyon tablosunu hedeflemez.",
          "Sadece antibiyotik verip steroid tedavisinden kaçınmak": "Ağır alkol ilişkili hepatitte enfeksiyon araştırması şarttır; çünkü steroid başlanacaksa aktif enfeksiyon, gastrointestinal kanama ve kontrolsüz sepsis dışlanmalıdır. Ancak bu hastada kültür ve görüntüleme verileri aktif enfeksiyon lehine değildir. Sadece antibiyotik verip steroid endikasyonunu görmezden gelmek, yüksek diskriminant fonksiyon ve INR uzaması olan hastada mortalite azaltıcı tedavi fırsatını kaçırabilir. Antibiyotik yalnız kanıtlı veya kuvvetle şüpheli enfeksiyon varsa uygun olur.",
          "Enfeksiyon ve gastrointestinal kanama dışlandıktan sonra prednizolon başlamak": "Bu seçenek en uygundur. Ağır alkol kullanımı, yeni gelişen sarılık, sağ üst kadran hassasiyeti, AST’nin ALT’den belirgin yüksek ama genellikle çok yüksek olmayan düzeyde olması, lökositoz ve INR uzaması alkol ilişkili ağır hepatiti destekler. Maddrey diskriminant fonksiyonunun 32’nin üzerinde olması veya MELD yüksekliği kötü prognozu gösterir. Aktif enfeksiyon, gastrointestinal kanama ve kontrolsüz böbrek yetmezliği dışlandıktan sonra prednizolon seçilmiş ağır olgularda düşünülür. Eş zamanlı alkol kesilmesi, beslenme desteği, tiamin ve komplikasyon izlemi temel destek basamaklarıdır.",
          "Acil karaciğer biyopsisi sonucu çıkana kadar özgül tedavi vermemek": "Karaciğer biyopsisi tanısal belirsizlikte veya alternatif nedenler güçlü olduğunda yardımcı olabilir; ancak tipik öykü-laboratuvar paterni ve ağır klinik skor varken tedaviyi biyopsi sonucuna kadar geciktirmek güvenli bir tercih değildir. Bu hastada alkol kullanım öyküsü açık, AST/ALT oranı karakteristik ve obstrüksiyon bulgusu yoktur. Ağır hastalık skorları tedavi kararını zaman duyarlı hale getirir. Biyopsi düşünülse bile destek tedavi ve uygun hastada steroid değerlendirmesi geciktirilmemelidir."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Alkol ilişkili ağır hepatitte karar yalnız tanıya değil, prognostik skor ve steroid kontrendikasyonlarının dışlanmasına dayanır.",
      "examPearl": "Alkolik hepatit + Maddrey DF ≥32 + enfeksiyon/kanama yok: seçilmiş hastada prednizolon düşün.",
      "whyCorrect": "Doğru seçenek, ağır hastalık skorunu ve steroid öncesi güvenlik taramasını birlikte dikkate alır.",
      "optionComparison": "ERCP obstrüksiyon/kolanjit için, ursodeoksikolik asit PBC için, biyopsiyi beklemek ise tipik ağır tabloda tedaviyi gereksiz geciktirebilir.",
      "evidenceChain": [
        "Yoğun alkol kullanımı ve yeni sarılık → alkol ilişkili hepatik inflamasyon için klinik bağlam.",
        "AST 186, ALT 72 ve AST/ALT 2.6 → alkol ilişkili transaminaz paterni.",
        "Bilirubin 14.8 mg/dL ve INR 2.1 → ağır sentetik ve kolestatik etkilenim.",
        "Maddrey DF 46 → yüksek riskli ağır hastalık.",
        "Safra yolu dilatasyonu ve aktif enfeksiyon verisi yok → ERCP/antibiyotik yerine seçilmiş steroid değerlendirmesi."
      ],
      "whyWrong": {
        "Acil ERCP ile safra yolu drenajı yapmak": "ERCP ile safra yolu drenajı, kolanjit veya tıkanmaya bağlı kolestazda kritik bir kaynak kontrol yöntemidir. Bu hastada sağ üst kadran hassasiyeti ve sarılık olsa da ultrasonografide safra yolları dilate değildir; ALP-GGT yüksekliği AST/ALT paterninin önüne geçmiş değildir ve öykü ağır alkol kullanımını destekler. Ateş veya hipotansiyon gibi kolanjit bulguları belirgin değildir. Bu nedenle ilk hedef safra yolu drenajı değil, ağır alkol ilişkili hepatitin destek ve seçilmiş antiinflamatuvar tedavisidir.",
        "Ursodeoksikolik asit başlamak": "Ursodeoksikolik asit primer biliyer kolanjitte kolestatik enzim yüksekliği, AMA pozitifliği ve kronik kaşıntı-yorgunluk paterniyle kullanılır. Bu hastada kısa sürede gelişen sarılık, sağ üst kadran hassasiyeti, AST/ALT oranının alkol lehine olması, lökositoz ve uzamış INR ön plandadır. AMA pozitifliği veya tipik kronik PBC paterni verilmemiştir. Bu yüzden ursodeoksikolik asit bu akut ağır hepatik inflamasyon tablosunu hedeflemez.",
        "Sadece antibiyotik verip steroid tedavisinden kaçınmak": "Ağır alkol ilişkili hepatitte enfeksiyon araştırması şarttır; çünkü steroid başlanacaksa aktif enfeksiyon, gastrointestinal kanama ve kontrolsüz sepsis dışlanmalıdır. Ancak bu hastada kültür ve görüntüleme verileri aktif enfeksiyon lehine değildir. Sadece antibiyotik verip steroid endikasyonunu görmezden gelmek, yüksek diskriminant fonksiyon ve INR uzaması olan hastada mortalite azaltıcı tedavi fırsatını kaçırabilir. Antibiyotik yalnız kanıtlı veya kuvvetle şüpheli enfeksiyon varsa uygun olur.",
        "Acil karaciğer biyopsisi sonucu çıkana kadar özgül tedavi vermemek": "Karaciğer biyopsisi tanısal belirsizlikte veya alternatif nedenler güçlü olduğunda yardımcı olabilir; ancak tipik öykü-laboratuvar paterni ve ağır klinik skor varken tedaviyi biyopsi sonucuna kadar geciktirmek güvenli bir tercih değildir. Bu hastada alkol kullanım öyküsü açık, AST/ALT oranı karakteristik ve obstrüksiyon bulgusu yoktur. Ağır hastalık skorları tedavi kararını zaman duyarlı hale getirir. Biyopsi düşünülse bile destek tedavi ve uygun hastada steroid değerlendirmesi geciktirilmemelidir."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v292",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V291 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v292-new-651-kas-gucsuzlugu-ve-tekrarlayan-bobrek-tasi",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Kas güçsüzlüğü ve tekrarlayan böbrek taşı",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Hipokalemik normal anyon açıklıklı metabolik asidozda idrar pH’sını yorumlayarak distal renal tübüler asidoz mekanizmasını ayırt etme.",
      "learningTarget": "Distal RTA’da toplayıcı kanal asitleştirme kusuru, hipokalemi ve taş oluşumu ilişkisini kavrama.",
      "demographics": "39 yaşında kadın hasta",
      "setting": "Nefroloji polikliniği",
      "chiefComplaint": "Hasta, bacaklarda güçsüzlük ve tekrarlayan böbrek taşı öyküsü nedeniyle değerlendiriliyor.",
      "stem": "Hasta son iki gündür merdiven çıkarken bacaklarının boşaldığını ve özellikle baldırlarında halsizlik hissettiğini anlatır. Son beş yılda üç kez böbrek taşı düşürdüğünü, son taş atağında yan ağrısı dışında ateş veya idrarda kötü koku olmadığını söyler. Ağız kuruluğu nedeniyle yanında sürekli su taşıdığını, gözlerinde batma için sık sık suni gözyaşı kullandığını belirtir. Son haftalarda ishal, kusma veya yoğun laksatif kullanımı olmamıştır. Yeni tansiyon ilacı veya idrar söktürücü başlamamıştır. Ailesi, son günlerde yürürken daha çabuk yorulduğu için polikliniğe gelmesini istemiştir.",
      "patientIntro": {
        "profile": "39 yaşında kadın hasta, Nefroloji polikliniği başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, bacaklarda güçsüzlük ve tekrarlayan böbrek taşı öyküsü nedeniyle değerlendiriliyor.",
        "historySummary": "Hasta son iki gündür merdiven çıkarken bacaklarının boşaldığını ve özellikle baldırlarında halsizlik hissettiğini anlatır. Son beş yılda üç kez böbrek taşı düşürdüğünü, son taş atağında yan ağrısı dışında ateş veya idrarda kötü koku olmadığını söyler. Ağız kuruluğu nedeniyle yanında sürekli su taşıdığını, gözlerinde batma için sık sık suni gözyaşı kullandığını belirtir. Son haftalarda ishal, kusma veya yoğun laksatif kullanımı olmamıştır. Yeni tansiyon ilacı veya idrar söktürücü başlamamıştır. Ailesi, son günlerde yürürken daha çabuk yorulduğu için polikliniğe gelmesini istemiştir."
      },
      "vitals": {
        "TA": "112/70 mmHg",
        "Nabız": "86/dk, düzenli",
        "Solunum": "19/dk",
        "SpO2": "%98, oda havasında",
        "Ateş": "36.7 °C",
        "Şok indeksi": "0.77; kapiller dolum <2 sn, periferik perfüzyon iyi"
      },
      "exam": [
        "Bilinç açık, dehidratasyon belirgin değil.",
        "Proksimal alt ekstremite kas gücü 4/5, derin tendon refleksleri simetrik.",
        "Ağız mukozası kuru, parotislerde hafif hassasiyet var.",
        "Kostovertebral açı hassasiyeti yok, karın muayenesi doğal."
      ],
      "investigations": [
        {
          "id": "v292-new-651-kas-gucsuzlugu-ve-tekrarlayan-bobrek-tasi-kan-gazi",
          "label": "Venöz kan gazı ve elektrolitler",
          "title": "Venöz kan gazı ve elektrolitler",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Kan gazı",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Normal anyon açıklıklı hiperkloremik metabolik asidoz ve belirgin hipokalemi vardır.",
          "clinicalMeaning": "Normal anyon açıklıklı hiperkloremik metabolik asidoz ve belirgin hipokalemi vardır.",
          "result": {
            "title": "Venöz kan gazı ve elektrolitler",
            "summary": "Normal anyon açıklıklı hiperkloremik metabolik asidoz ve belirgin hipokalemi vardır.",
            "interpretation": "Normal anyon açıklıklı hiperkloremik metabolik asidoz ve belirgin hipokalemi vardır.",
            "values": [
              [
                "pH",
                "7.29",
                "7.35-7.45",
                "Asidemi"
              ],
              [
                "HCO3-",
                "15 mmol/L",
                "22-26 mmol/L",
                "Düşük"
              ],
              [
                "pCO2",
                "32 mmHg",
                "35-45 mmHg",
                "Kompansatuvar düşük"
              ],
              [
                "Sodyum",
                "140 mmol/L",
                "135-145 mmol/L",
                "Normal"
              ],
              [
                "Klor",
                "113 mmol/L",
                "98-107 mmol/L",
                "Yüksek"
              ],
              [
                "Potasyum",
                "2.7 mmol/L",
                "3.5-5.0 mmol/L",
                "Düşük"
              ],
              [
                "Anyon açığı",
                "12 mmol/L",
                "8-12 mmol/L",
                "Normal"
              ]
            ],
            "rows": [
              [
                "pH",
                "7.29",
                "7.35-7.45",
                "Asidemi"
              ],
              [
                "HCO3-",
                "15 mmol/L",
                "22-26 mmol/L",
                "Düşük"
              ],
              [
                "pCO2",
                "32 mmHg",
                "35-45 mmHg",
                "Kompansatuvar düşük"
              ],
              [
                "Sodyum",
                "140 mmol/L",
                "135-145 mmol/L",
                "Normal"
              ],
              [
                "Klor",
                "113 mmol/L",
                "98-107 mmol/L",
                "Yüksek"
              ],
              [
                "Potasyum",
                "2.7 mmol/L",
                "3.5-5.0 mmol/L",
                "Düşük"
              ],
              [
                "Anyon açığı",
                "12 mmol/L",
                "8-12 mmol/L",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v292-new-651-kas-gucsuzlugu-ve-tekrarlayan-bobrek-tasi-idrar",
          "label": "İdrar analizi",
          "title": "İdrar analizi",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "İdrar",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Sistemik asidoza rağmen idrarın asitleştirilememesi distal asitleştirme kusurunu destekler.",
          "clinicalMeaning": "Sistemik asidoza rağmen idrarın asitleştirilememesi distal asitleştirme kusurunu destekler.",
          "result": {
            "title": "İdrar analizi",
            "summary": "Sistemik asidoza rağmen idrarın asitleştirilememesi distal asitleştirme kusurunu destekler.",
            "interpretation": "Sistemik asidoza rağmen idrarın asitleştirilememesi distal asitleştirme kusurunu destekler.",
            "values": [
              [
                "İdrar pH",
                "6.4",
                "Sistemik asidozda <5.3 beklenir",
                "Uygunsuz yüksek"
              ],
              [
                "İdrar dansitesi",
                "1.015",
                "1.005-1.030",
                "Normal"
              ],
              [
                "Protein",
                "Negatif",
                "Negatif",
                "Normal"
              ],
              [
                "Glukoz",
                "Negatif",
                "Negatif",
                "Proksimal yaygın kayıp lehine değil"
              ],
              [
                "Sediment",
                "Kristal izleri, aktif silendir yok",
                "Aktif sediment beklenmez",
                "Taş riskiyle uyumlu"
              ]
            ],
            "rows": [
              [
                "İdrar pH",
                "6.4",
                "Sistemik asidozda <5.3 beklenir",
                "Uygunsuz yüksek"
              ],
              [
                "İdrar dansitesi",
                "1.015",
                "1.005-1.030",
                "Normal"
              ],
              [
                "Protein",
                "Negatif",
                "Negatif",
                "Normal"
              ],
              [
                "Glukoz",
                "Negatif",
                "Negatif",
                "Proksimal yaygın kayıp lehine değil"
              ],
              [
                "Sediment",
                "Kristal izleri, aktif silendir yok",
                "Aktif sediment beklenmez",
                "Taş riskiyle uyumlu"
              ]
            ]
          }
        },
        {
          "id": "v292-new-651-kas-gucsuzlugu-ve-tekrarlayan-bobrek-tasi-seroloji",
          "label": "Otoimmün tarama",
          "title": "Otoimmün tarama",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Seroloji",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Sicca yakınmalarıyla birlikte Sjögren ilişkili renal tübüler etkilenimi destekleyen otoimmün zemin vardır.",
          "clinicalMeaning": "Sicca yakınmalarıyla birlikte Sjögren ilişkili renal tübüler etkilenimi destekleyen otoimmün zemin vardır.",
          "result": {
            "title": "Otoimmün tarama",
            "summary": "Sicca yakınmalarıyla birlikte Sjögren ilişkili renal tübüler etkilenimi destekleyen otoimmün zemin vardır.",
            "interpretation": "Sicca yakınmalarıyla birlikte Sjögren ilişkili renal tübüler etkilenimi destekleyen otoimmün zemin vardır.",
            "values": [
              [
                "ANA",
                "Pozitif 1/320",
                "Negatif",
                "Pozitif"
              ],
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
              ],
              [
                "CRP",
                "3 mg/L",
                "<5 mg/L",
                "Normal"
              ]
            ],
            "rows": [
              [
                "ANA",
                "Pozitif 1/320",
                "Negatif",
                "Pozitif"
              ],
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
              ],
              [
                "CRP",
                "3 mg/L",
                "<5 mg/L",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v292-new-651-kas-gucsuzlugu-ve-tekrarlayan-bobrek-tasi-ultrason",
          "label": "Üriner sistem ultrasonografisi",
          "title": "Üriner sistem ultrasonografisi",
          "type": "ultrasound",
          "priority": "essential",
          "subtype": "Görüntüleme",
          "category": "imaging",
          "testTypeCategory": "imaging",
          "summary": "Tekrarlayan taş öyküsünü destekleyen medüller kalsifikasyon eğilimi vardır.",
          "clinicalMeaning": "Tekrarlayan taş öyküsünü destekleyen medüller kalsifikasyon eğilimi vardır.",
          "result": {
            "title": "Üriner sistem ultrasonografisi",
            "summary": "Tekrarlayan taş öyküsünü destekleyen medüller kalsifikasyon eğilimi vardır.",
            "interpretation": "Tekrarlayan taş öyküsünü destekleyen medüller kalsifikasyon eğilimi vardır.",
            "values": [
              [
                "Böbrek boyutları",
                "Normal",
                "Normal",
                "Kronik ileri atrofi yok"
              ],
              [
                "Nefrokalsinozis",
                "Medüller hafif ekojenite artışı",
                "Yok",
                "Taş eğilimiyle uyumlu"
              ],
              [
                "Hidronefroz",
                "Yok",
                "Yok",
                "Akut obstrüksiyon yok"
              ]
            ],
            "rows": [
              [
                "Böbrek boyutları",
                "Normal",
                "Normal",
                "Kronik ileri atrofi yok"
              ],
              [
                "Nefrokalsinozis",
                "Medüller hafif ekojenite artışı",
                "Yok",
                "Taş eğilimiyle uyumlu"
              ],
              [
                "Hidronefroz",
                "Yok",
                "Yok",
                "Akut obstrüksiyon yok"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastadaki asit-baz ve taş eğilimini en iyi açıklayan mekanizma aşağıdakilerden hangisidir?",
      "questionType": "mechanism",
      "answerTarget": "Distal renal tübüler asidoz mekanizması",
      "diagnosis": {
        "correct": "Toplayıcı kanalda hidrojen iyonu sekresyonunun bozulması",
        "options": [
          "Proksimal tübülde bikarbonat geri emiliminin yaygın bozulması",
          "Aldosteron eksikliğine bağlı potasyum atılımının azalması",
          "Gastrointestinal bikarbonat kaybına bağlı kompansatuvar idrar asitleşmesi",
          "Laktat artışına bağlı yüksek anyon açıklıklı metabolik asidoz",
          "Toplayıcı kanalda hidrojen iyonu sekresyonunun bozulması"
        ],
        "question": "Bu hastadaki asit-baz ve taş eğilimini en iyi açıklayan mekanizma aşağıdakilerden hangisidir?",
        "explanation": "Bu hastada normal anyon açıklıklı hiperkloremik metabolik asidoz, hipokalemi ve sistemik asidoza rağmen uygunsuz yüksek idrar pH’sı vardır. Sicca semptomları ve SSA/SSB pozitifliği Sjögren zeminini destekler. Distal RTA’da toplayıcı kanal alfa-interkale hücrelerinin hidrojen iyonu sekresyonu bozulur; idrar asitleştirilemez, hipokalemi gelişebilir ve alkalin idrar kalsiyum fosfat taşlarına yatkınlık yaratır.",
        "pearls": [
          "Normal anyon açıklıklı metabolik asidozda idrar pH’sı ayırıcıdır.",
          "Asidoz sırasında idrar pH’sının yüksek kalması distal asitleştirme kusurunu düşündürür.",
          "Distal RTA hipokalemi ve kalsiyum fosfat taşlarıyla birlikte olabilir."
        ],
        "optionFeedback": {
          "Proksimal tübülde bikarbonat geri emiliminin yaygın bozulması": "Proksimal tübül bikarbonat geri emilim bozukluğu tip 2 renal tübüler asidozda görülür ve Fanconi sendromu eşlik ederse glukozüri, fosfatüri, aminoasidüri ve hipofosfatemi gibi yaygın proksimal tübül kayıpları beklenir. Bu hastada idrar glukozu negatif, fosfor belirgin düşük değil ve temel bulgu hipokalemik normal anyon açıklıklı asidoza rağmen idrar pH’sının yüksek kalmasıdır. Ayrıca nefrolitiazis distal RTA’da daha tipiktir. Bu nedenle mekanizma proksimal bikarbonat kaybından çok distal asitleştirme kusurudur.",
          "Aldosteron eksikliğine bağlı potasyum atılımının azalması": "Aldosteron eksikliği veya etkisizliği tip 4 renal tübüler asidozla ilişkilidir ve en belirgin bulgu hiperkalemidir. Bu hastada potasyum belirgin düşüktür; kas güçsüzlüğü de hipokalemiyle uyumludur. Tip 4 RTA’da idrar pH’sı değişken olabilir ve nefrolitiazis tipik ayırıcı bulgu değildir. Sjögren bağlamı ve yüksek idrar pH’sı distal RTA lehinedir.",
          "Gastrointestinal bikarbonat kaybına bağlı kompansatuvar idrar asitleşmesi": "İshal gibi gastrointestinal bikarbonat kayıplarında normal anyon açıklıklı metabolik asidoz oluşabilir; ancak böbrek yanıtı idrarı asitleştirmek, yani idrar pH’sını düşürmektir. Bu hastanın ishal öyküsü yoktur ve sistemik asidoza rağmen idrar pH’sı 6.4 olarak uygunsuz yüksek kalmıştır. Bu, böbreğin distal asit sekresyonunda kusur olduğunu gösterir. Dolayısıyla sadece gastrointestinal kayıp mekanizması vaka verileriyle uyuşmaz.",
          "Laktat artışına bağlı yüksek anyon açıklıklı metabolik asidoz": "Laktik asidoz yüksek anyon açıklıklı metabolik asidoz yapar; şok, hipoksi, sepsis veya doku perfüzyon bozukluğu gibi bağlamlar beklenir. Bu hastada anyon açıklığı normal, laktat normal ve perfüzyon iyi verilmiştir. Hipokalemi, alkalin idrar ve nefrolitiazis laktik asidozla açıklanamaz. Bu seçenek asit-baz paternini yanlış sınıflandırır.",
          "Toplayıcı kanalda hidrojen iyonu sekresyonunun bozulması": "Bu seçenek en uygundur. Sjögren sendromu gibi otoimmün hastalıklarda distal renal tübüler asidoz gelişebilir; alfa-interkale hücre düzeyinde hidrojen iyonu sekresyonu bozulur. Bu nedenle hasta metabolik asidozdayken bile idrar yeterince asitleştirilemez ve idrar pH’sı uygunsuz yüksek kalır. Hipokalemi kas güçsüzlüğü yapabilir; kronik alkalin idrar ve hipositratüri de kalsiyum fosfat taşlarına zemin hazırlar. Normal anyon açıklıklı hiperkloremik asidoz + hipokalemi + yüksek idrar pH’sı distal RTA için klasik ayırt ettirici üçlüdür."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Distal RTA’da sorun asit üretimi değil, toplayıcı kanaldan hidrojen iyonu atılamamasıdır.",
      "examPearl": "NAGMA + hipokalemi + idrar pH >5.3 + taş öyküsü: distal RTA düşün.",
      "whyCorrect": "Doğru seçenek, sistemik asidoza rağmen idrarın alkalin kalmasını ve taş eğilimini aynı mekanizmayla açıklar.",
      "optionComparison": "Proksimal RTA’da Fanconi bulguları, tip 4 RTA’da hiperkalemi, ishalde düşük idrar pH’sı, laktik asidozda yüksek anyon açıklığı beklenir.",
      "evidenceChain": [
        "Bacak güçsüzlüğü ve K 2.7 mmol/L → hipokaleminin klinik yansıması.",
        "pH 7.29, HCO3 15 ve anyon açığı normal → normal anyon açıklıklı metabolik asidoz.",
        "Klor yüksekliği → hiperkloremik patern.",
        "İdrar pH 6.4 → asidoza rağmen uygunsuz alkalin idrar.",
        "Sjögren serolojisi ve sicca öyküsü → otoimmün distal tübül etkilenimi için bağlam."
      ],
      "whyWrong": {
        "Proksimal tübülde bikarbonat geri emiliminin yaygın bozulması": "Proksimal tübül bikarbonat geri emilim bozukluğu tip 2 renal tübüler asidozda görülür ve Fanconi sendromu eşlik ederse glukozüri, fosfatüri, aminoasidüri ve hipofosfatemi gibi yaygın proksimal tübül kayıpları beklenir. Bu hastada idrar glukozu negatif, fosfor belirgin düşük değil ve temel bulgu hipokalemik normal anyon açıklıklı asidoza rağmen idrar pH’sının yüksek kalmasıdır. Ayrıca nefrolitiazis distal RTA’da daha tipiktir. Bu nedenle mekanizma proksimal bikarbonat kaybından çok distal asitleştirme kusurudur.",
        "Aldosteron eksikliğine bağlı potasyum atılımının azalması": "Aldosteron eksikliği veya etkisizliği tip 4 renal tübüler asidozla ilişkilidir ve en belirgin bulgu hiperkalemidir. Bu hastada potasyum belirgin düşüktür; kas güçsüzlüğü de hipokalemiyle uyumludur. Tip 4 RTA’da idrar pH’sı değişken olabilir ve nefrolitiazis tipik ayırıcı bulgu değildir. Sjögren bağlamı ve yüksek idrar pH’sı distal RTA lehinedir.",
        "Gastrointestinal bikarbonat kaybına bağlı kompansatuvar idrar asitleşmesi": "İshal gibi gastrointestinal bikarbonat kayıplarında normal anyon açıklıklı metabolik asidoz oluşabilir; ancak böbrek yanıtı idrarı asitleştirmek, yani idrar pH’sını düşürmektir. Bu hastanın ishal öyküsü yoktur ve sistemik asidoza rağmen idrar pH’sı 6.4 olarak uygunsuz yüksek kalmıştır. Bu, böbreğin distal asit sekresyonunda kusur olduğunu gösterir. Dolayısıyla sadece gastrointestinal kayıp mekanizması vaka verileriyle uyuşmaz.",
        "Laktat artışına bağlı yüksek anyon açıklıklı metabolik asidoz": "Laktik asidoz yüksek anyon açıklıklı metabolik asidoz yapar; şok, hipoksi, sepsis veya doku perfüzyon bozukluğu gibi bağlamlar beklenir. Bu hastada anyon açıklığı normal, laktat normal ve perfüzyon iyi verilmiştir. Hipokalemi, alkalin idrar ve nefrolitiazis laktik asidozla açıklanamaz. Bu seçenek asit-baz paternini yanlış sınıflandırır."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v292",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V291 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v292-new-652-merdiven-cikmada-zorlanma-ve-morumsu-goz-kapagi",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Merdiven çıkmada zorlanma ve morumsu göz kapağı",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Erişkin başlangıçlı inflamatuvar miyopatide karakteristik deri-kas bulgularını tanıyıp malignite taraması gerekliliğini ayırt etme.",
      "learningTarget": "Dermatomiyozitte proksimal kas güçsüzlüğü, CK yüksekliği, tipik döküntüler ve kanser ilişkili risk değerlendirmesini öğrenme.",
      "demographics": "56 yaşında kadın hasta",
      "setting": "Romatoloji polikliniği",
      "chiefComplaint": "Hasta, giderek artan kas güçsüzlüğü ve göz kapaklarında morumsu renk değişikliği nedeniyle başvuruyor.",
      "stem": "Hasta son iki aydır merdiven çıkarken bacaklarının eskisi kadar güçlü olmadığını ve saçını kuruturken kollarını yukarıda tutmakta zorlandığını anlatır. Ağrıdan çok güçsüzlük tarifler; sabah tutukluğu kısa sürmektedir. Son haftalarda göz kapaklarında morumsu renk değişikliği ve el sırtındaki eklem çıkıntılarında kabarık döküntüler fark etmiştir. Güneşe çıktığında döküntülerin belirginleştiğini söyler. Ateş, ishal veya yeni ilaç kullanımı tariflemez; idrar renginde koyulaşma fark etmemiştir. Son altı ayda istemsiz birkaç kilo verdiğini, bunu iştahsızlığa bağladığını belirtir.",
      "patientIntro": {
        "profile": "56 yaşında kadın hasta, Romatoloji polikliniği başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, giderek artan kas güçsüzlüğü ve göz kapaklarında morumsu renk değişikliği nedeniyle başvuruyor.",
        "historySummary": "Hasta son iki aydır merdiven çıkarken bacaklarının eskisi kadar güçlü olmadığını ve saçını kuruturken kollarını yukarıda tutmakta zorlandığını anlatır. Ağrıdan çok güçsüzlük tarifler; sabah tutukluğu kısa sürmektedir. Son haftalarda göz kapaklarında morumsu renk değişikliği ve el sırtındaki eklem çıkıntılarında kabarık döküntüler fark etmiştir. Güneşe çıktığında döküntülerin belirginleştiğini söyler. Ateş, ishal veya yeni ilaç kullanımı tariflemez; idrar renginde koyulaşma fark etmemiştir. Son altı ayda istemsiz birkaç kilo verdiğini, bunu iştahsızlığa bağladığını belirtir."
      },
      "vitals": {
        "TA": "124/78 mmHg",
        "Nabız": "92/dk, düzenli",
        "Solunum": "17/dk",
        "SpO2": "%98, oda havasında",
        "Ateş": "36.9 °C",
        "Şok indeksi": "0.74; kapiller dolum <2 sn, periferik perfüzyon iyi"
      },
      "exam": [
        "Omuz ve kalça kuşağında simetrik proksimal kas gücü 4/5.",
        "Göz kapaklarında heliotrop görünüm; MCP ve PIP ekstansör yüzlerinde Gottron benzeri kabarıklıklar var.",
        "Distal kas gücü korunmuş, duyu muayenesi doğal.",
        "Akciğer oskültasyonunda belirgin ral yok, yutma güçlüğü tariflemiyor."
      ],
      "investigations": [
        {
          "id": "v292-new-652-merdiven-cikmada-zorlanma-ve-morumsu-goz-kapagi-kas-enzimleri",
          "label": "Kas enzimleri",
          "title": "Kas enzimleri",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Kas enzimleri",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Kas kaynaklı enzim yüksekliği aktif miyopatik süreci destekler.",
          "clinicalMeaning": "Kas kaynaklı enzim yüksekliği aktif miyopatik süreci destekler.",
          "result": {
            "title": "Kas enzimleri",
            "summary": "Kas kaynaklı enzim yüksekliği aktif miyopatik süreci destekler.",
            "interpretation": "Kas kaynaklı enzim yüksekliği aktif miyopatik süreci destekler.",
            "values": [
              [
                "CK",
                "3.860 U/L",
                "<170 U/L",
                "Belirgin yüksek"
              ],
              [
                "Aldolaz",
                "18 U/L",
                "<7.6 U/L",
                "Yüksek"
              ],
              [
                "LDH",
                "520 U/L",
                "<250 U/L",
                "Yüksek"
              ],
              [
                "AST",
                "104 U/L",
                "<40 U/L",
                "Yüksek"
              ],
              [
                "ALT",
                "68 U/L",
                "<41 U/L",
                "Yüksek"
              ]
            ],
            "rows": [
              [
                "CK",
                "3.860 U/L",
                "<170 U/L",
                "Belirgin yüksek"
              ],
              [
                "Aldolaz",
                "18 U/L",
                "<7.6 U/L",
                "Yüksek"
              ],
              [
                "LDH",
                "520 U/L",
                "<250 U/L",
                "Yüksek"
              ],
              [
                "AST",
                "104 U/L",
                "<40 U/L",
                "Yüksek"
              ],
              [
                "ALT",
                "68 U/L",
                "<41 U/L",
                "Yüksek"
              ]
            ]
          }
        },
        {
          "id": "v292-new-652-merdiven-cikmada-zorlanma-ve-morumsu-goz-kapagi-otoantikor",
          "label": "Miyozit ilişkili otoantikorlar",
          "title": "Miyozit ilişkili otoantikorlar",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Seroloji",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Miyozit alt tipini ve kanser ilişkili risk değerlendirmesini etkileyebilecek serolojik veri vardır.",
          "clinicalMeaning": "Miyozit alt tipini ve kanser ilişkili risk değerlendirmesini etkileyebilecek serolojik veri vardır.",
          "result": {
            "title": "Miyozit ilişkili otoantikorlar",
            "summary": "Miyozit alt tipini ve kanser ilişkili risk değerlendirmesini etkileyebilecek serolojik veri vardır.",
            "interpretation": "Miyozit alt tipini ve kanser ilişkili risk değerlendirmesini etkileyebilecek serolojik veri vardır.",
            "values": [
              [
                "ANA",
                "Pozitif 1/160",
                "Negatif",
                "Pozitif"
              ],
              [
                "Anti-TIF1-γ",
                "Pozitif",
                "Negatif",
                "Pozitif"
              ],
              [
                "Anti-Jo-1",
                "Negatif",
                "Negatif",
                "Negatif"
              ],
              [
                "CRP",
                "14 mg/L",
                "<5 mg/L",
                "Hafif yüksek"
              ]
            ],
            "rows": [
              [
                "ANA",
                "Pozitif 1/160",
                "Negatif",
                "Pozitif"
              ],
              [
                "Anti-TIF1-γ",
                "Pozitif",
                "Negatif",
                "Pozitif"
              ],
              [
                "Anti-Jo-1",
                "Negatif",
                "Negatif",
                "Negatif"
              ],
              [
                "CRP",
                "14 mg/L",
                "<5 mg/L",
                "Hafif yüksek"
              ]
            ]
          }
        },
        {
          "id": "v292-new-652-merdiven-cikmada-zorlanma-ve-morumsu-goz-kapagi-hemogram-biyokimya",
          "label": "Temel laboratuvar",
          "title": "Temel laboratuvar",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Laboratuvar",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Tiroid hastalığı veya böbrek yetmezliği güçsüzlük için baskın alternatif açıklama sağlamaz.",
          "clinicalMeaning": "Tiroid hastalığı veya böbrek yetmezliği güçsüzlük için baskın alternatif açıklama sağlamaz.",
          "result": {
            "title": "Temel laboratuvar",
            "summary": "Tiroid hastalığı veya böbrek yetmezliği güçsüzlük için baskın alternatif açıklama sağlamaz.",
            "interpretation": "Tiroid hastalığı veya böbrek yetmezliği güçsüzlük için baskın alternatif açıklama sağlamaz.",
            "values": [
              [
                "Hemoglobin",
                "11.6 g/dL",
                "12-16 g/dL",
                "Hafif düşük"
              ],
              [
                "Lökosit",
                "6.900/mm³",
                "4.000-10.000/mm³",
                "Normal"
              ],
              [
                "Kreatinin",
                "0.80 mg/dL",
                "0.5-1.1 mg/dL",
                "Normal"
              ],
              [
                "TSH",
                "2.1 mIU/L",
                "0.4-4.0 mIU/L",
                "Normal"
              ]
            ],
            "rows": [
              [
                "Hemoglobin",
                "11.6 g/dL",
                "12-16 g/dL",
                "Hafif düşük"
              ],
              [
                "Lökosit",
                "6.900/mm³",
                "4.000-10.000/mm³",
                "Normal"
              ],
              [
                "Kreatinin",
                "0.80 mg/dL",
                "0.5-1.1 mg/dL",
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
        },
        {
          "id": "v292-new-652-merdiven-cikmada-zorlanma-ve-morumsu-goz-kapagi-akciger",
          "label": "Akciğer değerlendirmesi",
          "title": "Akciğer değerlendirmesi",
          "type": "imaging",
          "priority": "essential",
          "subtype": "Görüntüleme",
          "category": "pulmonary",
          "testTypeCategory": "pulmonary",
          "summary": "Başlangıçta belirgin akciğer tutulumu lehine güçlü veri yoktur; yine de klinik izlemi gerekir.",
          "clinicalMeaning": "Başlangıçta belirgin akciğer tutulumu lehine güçlü veri yoktur; yine de klinik izlemi gerekir.",
          "result": {
            "title": "Akciğer değerlendirmesi",
            "summary": "Başlangıçta belirgin akciğer tutulumu lehine güçlü veri yoktur; yine de klinik izlemi gerekir.",
            "interpretation": "Başlangıçta belirgin akciğer tutulumu lehine güçlü veri yoktur; yine de klinik izlemi gerekir.",
            "values": [
              [
                "Akciğer grafisi",
                "Belirgin infiltrasyon yok",
                "İnfiltrasyon olmamalı",
                "Akut pnömoni yok"
              ],
              [
                "Solunum fonksiyonu",
                "FVC %88",
                "%80-120",
                "Belirgin restriksiyon yok"
              ]
            ],
            "rows": [
              [
                "Akciğer grafisi",
                "Belirgin infiltrasyon yok",
                "İnfiltrasyon olmamalı",
                "Akut pnömoni yok"
              ],
              [
                "Solunum fonksiyonu",
                "FVC %88",
                "%80-120",
                "Belirgin restriksiyon yok"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada tanısal ve tedavi planı yapılırken özellikle atlanmaması gereken ek yaklaşım aşağıdakilerden hangisidir?",
      "questionType": "clinical_decision",
      "answerTarget": "Dermatomiyozitte malignite taraması",
      "diagnosis": {
        "correct": "Yaşa ve riske uygun kapsamlı malignite taraması yapmak",
        "options": [
          "Yaşa ve riske uygun kapsamlı malignite taraması yapmak",
          "Sadece topikal steroid verip kas enzimlerini izlememek",
          "Kolşisin başlamak ve ürik asit düzeyine göre tedaviyi düzenlemek",
          "Kas gücü düzelene kadar tüm görüntülemeleri ertelemek",
          "Yalnız antiinflamatuvar ağrı kesiciyle poliklinik kontrolü planlamak"
        ],
        "question": "Bu hastada tanısal ve tedavi planı yapılırken özellikle atlanmaması gereken ek yaklaşım aşağıdakilerden hangisidir?",
        "explanation": "Proksimal simetrik güçsüzlük, CK yüksekliği, heliotrop döküntü ve Gottron papülleri dermatomiyozit ile uyumludur. Erişkin başlangıçlı dermatomiyozitte malignite birlikteliği riski artabileceğinden, özellikle risk artırıcı klinik/serolojik özellikler varsa yaşa ve cinsiyete uygun kanser taraması sistematik olarak planlanmalıdır. Bu değerlendirme kas hastalığının tedavisini geciktirmez; tersine tanı anındaki bütüncül yönetimin parçasıdır.",
        "pearls": [
          "Heliotrop döküntü ve Gottron papülleri dermatomiyozit için güçlü klinik ipuçlarıdır.",
          "Proksimal kas güçsüzlüğü ve CK yüksekliği aktif inflamatuvar miyopatiyi destekler.",
          "Erişkin başlangıçlı dermatomiyozitte malignite taraması yönetimin parçasıdır."
        ],
        "optionFeedback": {
          "Yaşa ve riske uygun kapsamlı malignite taraması yapmak": "Bu seçenek en uygundur. Proksimal kas güçsüzlüğü, CK yüksekliği, heliotrop döküntü ve Gottron papülleri dermatomiyozit spektrumunu destekler. Erişkin başlangıçlı dermatomiyozitte özellikle bazı otoantikor ve klinik özelliklerle malignite riski artabilir; bu nedenle tanı ve immünsüpresif tedavi planı yapılırken yaşa, cinsiyete ve risk profiline uygun kapsamlı kanser taraması ihmal edilmemelidir. Tarama, kas hastalığı tedavisinin yerine geçmez; ancak eş zamanlı ve sistematik değerlendirilmesi gereken prognoz belirleyici bir adımdır.",
          "Sadece topikal steroid verip kas enzimlerini izlememek": "Topikal steroid cilt lezyonlarında semptomatik fayda sağlayabilir; ancak bu hastanın temel problemi yalnız dermatolojik değildir. Merdiven çıkmada zorlanma, saç tararken kolları kaldıramama ve CK yüksekliği aktif inflamatuvar miyopatiyi gösterir. Kas enzimlerini, kas gücünü, akciğer tutulumunu ve sistemik riskleri izlememek hastalığın ciddiyetini hafife almak olur. Dermatomiyozit tedavisi sistemik değerlendirme ve çoğu zaman immünsüpresif yaklaşım gerektirir.",
          "Kolşisin başlamak ve ürik asit düzeyine göre tedaviyi düzenlemek": "Kolşisin ve ürik asit yaklaşımı kristal artrit/gut bağlamında düşünülür. Bu hastada akut monoartrit, podagra, ürat kristalleri veya tipik sinovyal sıvı bulguları yoktur. Ana bulgular simetrik proksimal kas güçsüzlüğü, karakteristik deri döküntüleri ve belirgin CK yüksekliğidir. Bu nedenle gut tedavisine yönelmek hem tanıyı hem de malignite ve akciğer tutulumu gibi kritik değerlendirmeleri geciktirir.",
          "Kas gücü düzelene kadar tüm görüntülemeleri ertelemek": "Kas gücü düzelene kadar malignite taramasını veya sistemik değerlendirmeyi ertelemek güvenli bir tercih değildir. Erişkin başlangıçlı dermatomiyozitte kanser birlikteliği tanı çevresindeki dönemde saptanabilir ve erken yakalanması yönetimi değiştirir. Ayrıca interstisyel akciğer hastalığı gibi tutulumlar da başlangıçta değerlendirilmelidir. Tedavi başlandıktan sonra düzelmeyi beklemek, eşlik eden ciddi hastalıkların tanısını geciktirebilir.",
          "Yalnız antiinflamatuvar ağrı kesiciyle poliklinik kontrolü planlamak": "NSAİİ tarzı ağrı kesiciler kas ağrısı veya artraljiyi geçici azaltabilir; ancak inflamatuvar miyopatinin kas yıkımını, güçsüzlüğünü ve sistemik risklerini tedavi etmez. Bu hastada ağrıdan çok fonksiyon kaybı ve objektif CK yüksekliği vardır. Poliklinik kontrolüyle geçiştirmek, disfaji, solunum kası/akciğer tutulumu ve malignite birlikteliği gibi önemli risklerin atlanmasına neden olabilir. Yönetim kapsamlı ve sistematik olmalıdır."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Dermatomiyozit yalnız kas-deri hastalığı gibi görülmemeli; erişkinde malignite ve akciğer tutulumu gibi sistemik riskler aranmalıdır.",
      "examPearl": "Dermatomiyozit + erişkin başlangıç: tedavinin yanında malignite taramasını unutma.",
      "whyCorrect": "Doğru seçenek, dermatomiyozitin erişkin hastadaki sistemik riskini ve tanı anında tarama gerekliliğini hedefler.",
      "optionComparison": "Topikal tedavi, kolşisin, NSAİİ veya taramayı erteleme yaklaşımları bu hastadaki kas enzim yüksekliği ve malignite ilişkili riski karşılamaz.",
      "evidenceChain": [
        "Merdiven çıkma ve kolları kaldırmada zorlanma → proksimal kas güçsüzlüğü.",
        "Heliotrop döküntü ve Gottron papülleri → dermatomiyozit lehine deri bulguları.",
        "CK 3.860 U/L ve aldolaz yüksekliği → aktif kas inflamasyonu/yıkımı.",
        "Erişkin başlangıç ve anti-TIF1-γ pozitifliği → malignite değerlendirmesini ön plana çıkaran risk bağlamı."
      ],
      "whyWrong": {
        "Sadece topikal steroid verip kas enzimlerini izlememek": "Topikal steroid cilt lezyonlarında semptomatik fayda sağlayabilir; ancak bu hastanın temel problemi yalnız dermatolojik değildir. Merdiven çıkmada zorlanma, saç tararken kolları kaldıramama ve CK yüksekliği aktif inflamatuvar miyopatiyi gösterir. Kas enzimlerini, kas gücünü, akciğer tutulumunu ve sistemik riskleri izlememek hastalığın ciddiyetini hafife almak olur. Dermatomiyozit tedavisi sistemik değerlendirme ve çoğu zaman immünsüpresif yaklaşım gerektirir.",
        "Kolşisin başlamak ve ürik asit düzeyine göre tedaviyi düzenlemek": "Kolşisin ve ürik asit yaklaşımı kristal artrit/gut bağlamında düşünülür. Bu hastada akut monoartrit, podagra, ürat kristalleri veya tipik sinovyal sıvı bulguları yoktur. Ana bulgular simetrik proksimal kas güçsüzlüğü, karakteristik deri döküntüleri ve belirgin CK yüksekliğidir. Bu nedenle gut tedavisine yönelmek hem tanıyı hem de malignite ve akciğer tutulumu gibi kritik değerlendirmeleri geciktirir.",
        "Kas gücü düzelene kadar tüm görüntülemeleri ertelemek": "Kas gücü düzelene kadar malignite taramasını veya sistemik değerlendirmeyi ertelemek güvenli bir tercih değildir. Erişkin başlangıçlı dermatomiyozitte kanser birlikteliği tanı çevresindeki dönemde saptanabilir ve erken yakalanması yönetimi değiştirir. Ayrıca interstisyel akciğer hastalığı gibi tutulumlar da başlangıçta değerlendirilmelidir. Tedavi başlandıktan sonra düzelmeyi beklemek, eşlik eden ciddi hastalıkların tanısını geciktirebilir.",
        "Yalnız antiinflamatuvar ağrı kesiciyle poliklinik kontrolü planlamak": "NSAİİ tarzı ağrı kesiciler kas ağrısı veya artraljiyi geçici azaltabilir; ancak inflamatuvar miyopatinin kas yıkımını, güçsüzlüğünü ve sistemik risklerini tedavi etmez. Bu hastada ağrıdan çok fonksiyon kaybı ve objektif CK yüksekliği vardır. Poliklinik kontrolüyle geçiştirmek, disfaji, solunum kası/akciğer tutulumu ve malignite birlikteliği gibi önemli risklerin atlanmasına neden olabilir. Yönetim kapsamlı ve sistematik olmalıdır."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v292",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V291 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v292-new-653-burun-kanamasi-ve-petesi",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Burun kanaması ve peteşi",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "İzole ağır trombositopenide ITP paternini TTP, DIC ve HIT gibi acillerden ayırarak ilk tedavi yaklaşımını seçme.",
      "learningTarget": "İmmün trombositopenide mukozal kanama ve çok düşük trombosit varlığında kortikosteroid-IVIG yaklaşımını öğrenme.",
      "demographics": "34 yaşında kadın hasta",
      "setting": "Acil servis",
      "chiefComplaint": "Hasta, durmayan burun kanaması ve bacaklarda yeni çıkan kırmızı döküntüler nedeniyle acile başvuruyor.",
      "stem": "Hasta sabah dişlerini fırçalarken diş etlerinin normalden uzun kanadığını, öğleden sonra da burnundan gelen kanamanın peçeteyle baskıya rağmen tekrar başladığını anlatır. Son üç gündür bacaklarında iğne ucu gibi kırmızı noktalar fark etmiştir. İki hafta önce kendiliğinden geçen boğaz ağrısı ve halsizlik yaşamış, antibiyotik kullanmamıştır. Ateş, kilo kaybı, gece terlemesi veya kemik ağrısı tariflemez. Yeni heparin kullanımı, hastane yatışı ya da bacakta şişlik-ağrı öyküsü yoktur. Ailesi kanama uzayınca kendisini acile getirmiştir.",
      "patientIntro": {
        "profile": "34 yaşında kadın hasta, Acil servis başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, durmayan burun kanaması ve bacaklarda yeni çıkan kırmızı döküntüler nedeniyle acile başvuruyor.",
        "historySummary": "Hasta sabah dişlerini fırçalarken diş etlerinin normalden uzun kanadığını, öğleden sonra da burnundan gelen kanamanın peçeteyle baskıya rağmen tekrar başladığını anlatır. Son üç gündür bacaklarında iğne ucu gibi kırmızı noktalar fark etmiştir. İki hafta önce kendiliğinden geçen boğaz ağrısı ve halsizlik yaşamış, antibiyotik kullanmamıştır. Ateş, kilo kaybı, gece terlemesi veya kemik ağrısı tariflemez. Yeni heparin kullanımı, hastane yatışı ya da bacakta şişlik-ağrı öyküsü yoktur. Ailesi kanama uzayınca kendisini acile getirmiştir."
      },
      "vitals": {
        "TA": "116/72 mmHg",
        "Nabız": "96/dk, düzenli",
        "Solunum": "18/dk",
        "SpO2": "%99, oda havasında",
        "Ateş": "36.9 °C",
        "Şok indeksi": "0.83; kapiller dolum <2 sn, periferik perfüzyon iyi"
      },
      "exam": [
        "Bilinç açık, aktif masif kanama yok ancak burun mukozasında sızıntı tarzı kanama izleniyor.",
        "Alt ekstremitelerde yaygın peteşiler var, palpabl purpura yok.",
        "Hepatosplenomegali saptanmıyor, lenfadenopati yok.",
        "Nörolojik muayene doğal, karın muayenesinde hassasiyet yok."
      ],
      "investigations": [
        {
          "id": "v292-new-653-burun-kanamasi-ve-petesi-hemogram",
          "label": "Tam kan sayımı",
          "title": "Tam kan sayımı",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Hematoloji",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "İzole ve ağır trombositopeni, üretim baskısından çok periferik yıkım paternini destekler.",
          "clinicalMeaning": "İzole ve ağır trombositopeni, üretim baskısından çok periferik yıkım paternini destekler.",
          "result": {
            "title": "Tam kan sayımı",
            "summary": "İzole ve ağır trombositopeni, üretim baskısından çok periferik yıkım paternini destekler.",
            "interpretation": "İzole ve ağır trombositopeni, üretim baskısından çok periferik yıkım paternini destekler.",
            "values": [
              [
                "Hemoglobin",
                "12.8 g/dL",
                "12-16 g/dL",
                "Normal"
              ],
              [
                "Lökosit",
                "6.200/mm³",
                "4.000-10.000/mm³",
                "Normal"
              ],
              [
                "Trombosit",
                "7.000/mm³",
                "150.000-400.000/mm³",
                "Çok düşük"
              ],
              [
                "MPV",
                "12.8 fL",
                "7.5-11.5 fL",
                "Yüksek"
              ]
            ],
            "rows": [
              [
                "Hemoglobin",
                "12.8 g/dL",
                "12-16 g/dL",
                "Normal"
              ],
              [
                "Lökosit",
                "6.200/mm³",
                "4.000-10.000/mm³",
                "Normal"
              ],
              [
                "Trombosit",
                "7.000/mm³",
                "150.000-400.000/mm³",
                "Çok düşük"
              ],
              [
                "MPV",
                "12.8 fL",
                "7.5-11.5 fL",
                "Yüksek"
              ]
            ]
          }
        },
        {
          "id": "v292-new-653-burun-kanamasi-ve-petesi-koagulasyon",
          "label": "Koagülasyon ve hemoliz paneli",
          "title": "Koagülasyon ve hemoliz paneli",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Koagülasyon",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "DIC, belirgin mikroanjiyopatik hemoliz ve böbrek etkilenimi lehine güçlü veri yoktur.",
          "clinicalMeaning": "DIC, belirgin mikroanjiyopatik hemoliz ve böbrek etkilenimi lehine güçlü veri yoktur.",
          "result": {
            "title": "Koagülasyon ve hemoliz paneli",
            "summary": "DIC, belirgin mikroanjiyopatik hemoliz ve böbrek etkilenimi lehine güçlü veri yoktur.",
            "interpretation": "DIC, belirgin mikroanjiyopatik hemoliz ve böbrek etkilenimi lehine güçlü veri yoktur.",
            "values": [
              [
                "PT/INR",
                "1.0",
                "0.8-1.2",
                "Normal"
              ],
              [
                "aPTT",
                "29 sn",
                "25-35 sn",
                "Normal"
              ],
              [
                "Fibrinojen",
                "310 mg/dL",
                "200-400 mg/dL",
                "Normal"
              ],
              [
                "D-dimer",
                "320 ng/mL",
                "<500 ng/mL",
                "Normal"
              ],
              [
                "LDH",
                "210 U/L",
                "<250 U/L",
                "Normal"
              ],
              [
                "Kreatinin",
                "0.74 mg/dL",
                "0.5-1.1 mg/dL",
                "Normal"
              ]
            ],
            "rows": [
              [
                "PT/INR",
                "1.0",
                "0.8-1.2",
                "Normal"
              ],
              [
                "aPTT",
                "29 sn",
                "25-35 sn",
                "Normal"
              ],
              [
                "Fibrinojen",
                "310 mg/dL",
                "200-400 mg/dL",
                "Normal"
              ],
              [
                "D-dimer",
                "320 ng/mL",
                "<500 ng/mL",
                "Normal"
              ],
              [
                "LDH",
                "210 U/L",
                "<250 U/L",
                "Normal"
              ],
              [
                "Kreatinin",
                "0.74 mg/dL",
                "0.5-1.1 mg/dL",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v292-new-653-burun-kanamasi-ve-petesi-yayma",
          "label": "Periferik yayma",
          "title": "Periferik yayma",
          "type": "microscopy",
          "priority": "essential",
          "subtype": "Morfoloji",
          "category": "hematology",
          "testTypeCategory": "hematology",
          "summary": "Yayma, izole trombositopeni ile uyumlu olup TTP ve lösemi lehine bulgu göstermiyor.",
          "clinicalMeaning": "Yayma, izole trombositopeni ile uyumlu olup TTP ve lösemi lehine bulgu göstermiyor.",
          "result": {
            "title": "Periferik yayma",
            "summary": "Yayma, izole trombositopeni ile uyumlu olup TTP ve lösemi lehine bulgu göstermiyor.",
            "interpretation": "Yayma, izole trombositopeni ile uyumlu olup TTP ve lösemi lehine bulgu göstermiyor.",
            "values": [
              [
                "Trombositler",
                "Çok azalmış; yer yer büyük trombositler",
                "Yeterli sayıda olmalı",
                "Periferik yıkım yanıtını destekler"
              ],
              [
                "Şistosit",
                "Görülmedi",
                "Yok",
                "TTP/MAHA lehine değil"
              ],
              [
                "Blast",
                "Görülmedi",
                "Yok",
                "Akut lösemi lehine değil"
              ],
              [
                "Eritrosit morfolojisi",
                "Belirgin fragmantasyon yok",
                "Fragmantasyon olmamalı",
                "MAHA desteklenmiyor"
              ]
            ],
            "rows": [
              [
                "Trombositler",
                "Çok azalmış; yer yer büyük trombositler",
                "Yeterli sayıda olmalı",
                "Periferik yıkım yanıtını destekler"
              ],
              [
                "Şistosit",
                "Görülmedi",
                "Yok",
                "TTP/MAHA lehine değil"
              ],
              [
                "Blast",
                "Görülmedi",
                "Yok",
                "Akut lösemi lehine değil"
              ],
              [
                "Eritrosit morfolojisi",
                "Belirgin fragmantasyon yok",
                "Fragmantasyon olmamalı",
                "MAHA desteklenmiyor"
              ]
            ]
          }
        },
        {
          "id": "v292-new-653-burun-kanamasi-ve-petesi-viral-tarama",
          "label": "İkincil neden taraması",
          "title": "İkincil neden taraması",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Seroloji",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Sekonder trombositopeni nedenleri açısından başlangıç taramasında pozitiflik saptanmamıştır.",
          "clinicalMeaning": "Sekonder trombositopeni nedenleri açısından başlangıç taramasında pozitiflik saptanmamıştır.",
          "result": {
            "title": "İkincil neden taraması",
            "summary": "Sekonder trombositopeni nedenleri açısından başlangıç taramasında pozitiflik saptanmamıştır.",
            "interpretation": "Sekonder trombositopeni nedenleri açısından başlangıç taramasında pozitiflik saptanmamıştır.",
            "values": [
              [
                "HIV Ag/Ab",
                "Negatif",
                "Negatif",
                "Negatif"
              ],
              [
                "HCV Ab",
                "Negatif",
                "Negatif",
                "Negatif"
              ],
              [
                "Gebelik testi",
                "Negatif",
                "Negatif",
                "Negatif"
              ]
            ],
            "rows": [
              [
                "HIV Ag/Ab",
                "Negatif",
                "Negatif",
                "Negatif"
              ],
              [
                "HCV Ab",
                "Negatif",
                "Negatif",
                "Negatif"
              ],
              [
                "Gebelik testi",
                "Negatif",
                "Negatif",
                "Negatif"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada en uygun ilk tedavi yaklaşımı aşağıdakilerden hangisidir?",
      "questionType": "treatment",
      "answerTarget": "Kanamalı ağır immün trombositopenide ilk tedavi",
      "diagnosis": {
        "correct": "Kısa süreli yüksek doz kortikosteroid başlamak ve hızlı trombosit artışı için IVIG eklemek",
        "options": [
          "Trombosit transfüzyonu tek başına verip altta yatan süreci izlemlemek",
          "Plazma değişimi başlatmak ve ADAMTS13 sonucunu beklemeden TTP gibi yönetmek",
          "Kısa süreli yüksek doz kortikosteroid başlamak ve hızlı trombosit artışı için IVIG eklemek",
          "Heparin dışı antikoagülan başlamak ve tromboz gelişimini izlemek",
          "Acil splenektomi planlamak"
        ],
        "question": "Bu hastada en uygun ilk tedavi yaklaşımı aşağıdakilerden hangisidir?",
        "explanation": "Bu hastada izole ağır trombositopeni, peteşi ve mukozal kanama vardır. PT/aPTT ve fibrinojenin normal olması DIC’i, şistosit ve böbrek/nörolojik bulgu olmaması TTP’yi, heparin maruziyeti olmaması HIT’i geri plana iter. Kanamalı ve trombosit sayısı çok düşük yeni tanı ITP’de kısa süreli kortikosteroid başlanır; hızlı trombosit artışı gereken mukozal kanamalı hastada IVIG eklenebilir.",
        "pearls": [
          "ITP bir dışlama tanısıdır; izole trombositopeni ve periferik yayma önemlidir.",
          "Şistosit yokluğu TTP/MAHA ayrımında kritiktir.",
          "Belirgin mukozal kanama ve trombosit <10.000/mm³ yalnız izlem için güvenli bir tercih değildir."
        ],
        "optionFeedback": {
          "Trombosit transfüzyonu tek başına verip altta yatan süreci izlemlemek": "Trombosit transfüzyonu hayatı tehdit eden kanama veya acil girişim gereksinimi gibi durumlarda destek olarak kullanılabilir; ancak immün trombositopenide verilen trombositler dolaşımdaki antikor aracılı yıkıma hızla uğrayabilir. Bu hastada ciddi mukozal kanama ve çok düşük trombosit sayısı vardır; altta yatan immün süreci baskılamadan yalnız transfüzyon yapmak kalıcı yanıt sağlamaz. Ayrıca intrakraniyal kanama veya hemodinamik şok verilmediğinden transfüzyon tek başına doğru ilk yönetim değildir.",
          "Plazma değişimi başlatmak ve ADAMTS13 sonucunu beklemeden TTP gibi yönetmek": "Plazma değişimi TTP şüphesinde hayat kurtarıcıdır; mikroanjiyopatik hemolitik anemi, şistositler, nörolojik dalgalanma, böbrek etkilenimi ve genellikle normal koagülasyon testleriyle birlikte düşünülür. Bu hastada periferik yaymada şistosit yok, LDH belirgin hemoliz düzeyinde değil, kreatinin normal ve anemi derin değildir. İzole ağır trombositopeni, peteşi ve mukozal kanama ITP lehinedir. Bu nedenle TTP gibi plazma değişimi başlamak vaka verileriyle uyumsuzdur.",
          "Kısa süreli yüksek doz kortikosteroid başlamak ve hızlı trombosit artışı için IVIG eklemek": "Bu seçenek en uygundur. İzole ağır trombositopeni, peteşi, mukozal kanama, normal PT/aPTT, normal fibrinojen, şistosit yokluğu ve kemik iliği baskılanmasını düşündüren lökopeni/anemi olmaması immün trombositopeniyi destekler. Belirgin mukozal kanama ve trombositin 10.000/mm³ altında olması yalnız izlem için güvenli değildir. Kısa süreli kortikosteroid antikor aracılı yıkımı azaltır; IVIG ise hızlı trombosit artışı gereken kanamalı hastada eklenebilir. Uzun süreli steroid veya erken splenektomi ilk basamak değildir.",
          "Heparin dışı antikoagülan başlamak ve tromboz gelişimini izlemek": "Heparin dışı antikoagülanlar heparin ilişkili trombositopenide veya trombozla seyreden özel durumlarda kullanılır. Bu hastada heparin maruziyeti, tromboz, platelet düşüş zamanlaması veya 4T skoru bağlamı yoktur. Sorun kanama bulguları ve izole ağır trombositopenidir; antikoagülasyon kanamayı artırabilir. HIT yönetimini ITP ile karıştırmak tehlikeli olur.",
          "Acil splenektomi planlamak": "Splenektomi ITP’de seçilmiş kronik, dirençli olgularda düşünülebilir; yeni tanı alan ve ilk başvurusunda mukozal kanamayla gelen hastada acil ilk basamak değildir. Önce kortikosteroid ve gerektiğinde IVIG ile hızlı güvenli trombosit yanıtı hedeflenir. Splenektomi cerrahi risk, enfeksiyon riski ve kalıcı tedavi niteliği nedeniyle başlangıçta tercih edilmez. Bu hastada tanı ve ilk medikal tedavi önceliklidir."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "ITP’de temel mekanizma antikor aracılı trombosit yıkımıdır; tedavi yıkımı azaltmalı ve gerekirse hızlı trombosit artışı sağlamalıdır.",
      "examPearl": "İzole trombositopeni + peteşi/mukozal kanama + normal PT/aPTT + şistosit yok: ITP düşün.",
      "whyCorrect": "Doğru seçenek, kanamalı ağır ITP’de hem immün yıkımı baskılar hem de hızlı trombosit yanıtı hedefler.",
      "optionComparison": "Trombosit transfüzyonu tek başına yetersiz, plazma değişimi TTP için, antikoagülasyon HIT/tromboz için, splenektomi ise dirençli kronik ITP için uygundur.",
      "evidenceChain": [
        "Peteşi ve mukozal kanama → trombosit tipi kanama paterni.",
        "Trombosit 7.000/mm³, Hb ve lökosit normal → izole ağır trombositopeni.",
        "PT/aPTT, fibrinojen ve D-dimer normal → DIC lehine değil.",
        "Şistosit yok, kreatinin ve nörolojik muayene normal → TTP daha geri planda.",
        "Heparin maruziyeti yok → HIT yaklaşımı uygun değil."
      ],
      "whyWrong": {
        "Trombosit transfüzyonu tek başına verip altta yatan süreci izlemlemek": "Trombosit transfüzyonu hayatı tehdit eden kanama veya acil girişim gereksinimi gibi durumlarda destek olarak kullanılabilir; ancak immün trombositopenide verilen trombositler dolaşımdaki antikor aracılı yıkıma hızla uğrayabilir. Bu hastada ciddi mukozal kanama ve çok düşük trombosit sayısı vardır; altta yatan immün süreci baskılamadan yalnız transfüzyon yapmak kalıcı yanıt sağlamaz. Ayrıca intrakraniyal kanama veya hemodinamik şok verilmediğinden transfüzyon tek başına doğru ilk yönetim değildir.",
        "Plazma değişimi başlatmak ve ADAMTS13 sonucunu beklemeden TTP gibi yönetmek": "Plazma değişimi TTP şüphesinde hayat kurtarıcıdır; mikroanjiyopatik hemolitik anemi, şistositler, nörolojik dalgalanma, böbrek etkilenimi ve genellikle normal koagülasyon testleriyle birlikte düşünülür. Bu hastada periferik yaymada şistosit yok, LDH belirgin hemoliz düzeyinde değil, kreatinin normal ve anemi derin değildir. İzole ağır trombositopeni, peteşi ve mukozal kanama ITP lehinedir. Bu nedenle TTP gibi plazma değişimi başlamak vaka verileriyle uyumsuzdur.",
        "Heparin dışı antikoagülan başlamak ve tromboz gelişimini izlemek": "Heparin dışı antikoagülanlar heparin ilişkili trombositopenide veya trombozla seyreden özel durumlarda kullanılır. Bu hastada heparin maruziyeti, tromboz, platelet düşüş zamanlaması veya 4T skoru bağlamı yoktur. Sorun kanama bulguları ve izole ağır trombositopenidir; antikoagülasyon kanamayı artırabilir. HIT yönetimini ITP ile karıştırmak tehlikeli olur.",
        "Acil splenektomi planlamak": "Splenektomi ITP’de seçilmiş kronik, dirençli olgularda düşünülebilir; yeni tanı alan ve ilk başvurusunda mukozal kanamayla gelen hastada acil ilk basamak değildir. Önce kortikosteroid ve gerektiğinde IVIG ile hızlı güvenli trombosit yanıtı hedeflenir. Splenektomi cerrahi risk, enfeksiyon riski ve kalıcı tedavi niteliği nedeniyle başlangıçta tercih edilmez. Bu hastada tanı ve ilk medikal tedavi önceliklidir."
      },
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v292",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V291 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v293-new-654-yavas-nabiz-ve-bayilma",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Yavaş nabız ve bayılma",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Semptomatik ileri iletim bozukluğunda hemodinamik etkilenimi tanıyıp atropine güvenmeden acil pacing yaklaşımını seçme.",
      "learningTarget": "Düşük ventrikül kaçış ritmi ve senkopla gelen ileri bradikardide acil yönetimin transkütan/geçici pacing ve kalıcı pacemaker değerlendirmesi olduğunu öğrenme.",
      "demographics": "76 yaşında erkek hasta",
      "setting": "Acil servis",
      "chiefComplaint": "Hasta, evde kısa süreli bayılma ve belirgin halsizlik nedeniyle acile getiriliyor.",
      "stem": "Hasta sabah banyodan çıktıktan sonra gözlerinin karardığını ve birkaç saniye yere çöktüğünü anlatır. Son iki haftadır merdiven çıkarken eskisine göre daha çabuk yorulduğunu, bugün ise baş dönmesinin dinlenmekle tam geçmediğini söyler. Göğüs ağrısı tariflemez; son günlerde ateş, ishal veya kusma yaşamamıştır. Hipertansiyon için düzenli amlodipin kullanır, beta bloker veya digoksin kullanmadığını belirtir. Daha önce benzer bayılma atağı olmamıştır. Yakını, bayılma sırasında nöbet benzeri kasılma veya idrar kaçırma fark etmediğini söyler.",
      "patientIntro": {
        "profile": "76 yaşında erkek hasta, Acil servis başvurusunda değerlendiriliyor.",
        "presentation": "Hasta, evde kısa süreli bayılma ve belirgin halsizlik nedeniyle acile getiriliyor.",
        "historySummary": "Hasta sabah banyodan çıktıktan sonra gözlerinin karardığını ve birkaç saniye yere çöktüğünü anlatır. Son iki haftadır merdiven çıkarken eskisine göre daha çabuk yorulduğunu, bugün ise baş dönmesinin dinlenmekle tam geçmediğini söyler. Göğüs ağrısı tariflemez; son günlerde ateş, ishal veya kusma yaşamamıştır. Hipertansiyon için düzenli amlodipin kullanır, beta bloker veya digoksin kullanmadığını belirtir. Daha önce benzer bayılma atağı olmamıştır. Yakını, bayılma sırasında nöbet benzeri kasılma veya idrar kaçırma fark etmediğini söyler."
      },
      "vitals": {
        "TA": "88/54 mmHg",
        "Nabız": "34/dk, düzenli yavaş",
        "Solunum": "20/dk",
        "SpO2": "%96, oda havasında",
        "Ateş": "36.6 °C",
        "Şok indeksi": "0.39; ekstremiteler soğuk, kapiller dolum 3 sn"
      },
      "exam": [
        "Bilinç açık ancak hasta belirgin halsiz ve baş dönmesi tarifliyor.",
        "Kalp sesleri yavaş ve düzenli, belirgin üfürüm duyulmuyor.",
        "Akciğer oskültasyonunda yaygın ral yok, periferik ödem saptanmıyor.",
        "Nörolojik muayenede lateralizan bulgu yok."
      ],
      "investigations": [
        {
          "id": "v293-new-654-yavas-nabiz-ve-bayilma-ekg",
          "label": "12 derivasyonlu EKG",
          "title": "12 derivasyonlu EKG",
          "type": "ecg",
          "priority": "essential",
          "subtype": "Elektrokardiyografi",
          "category": "cardiology",
          "testTypeCategory": "cardiology",
          "summary": "Atriyal aktivite ile ventrikül yanıtı birbirinden bağımsızdır; geniş ve yavaş kaçış ritmi hemodinamik açıdan güvenli değildir.",
          "clinicalMeaning": "Atriyal aktivite ile ventrikül yanıtı birbirinden bağımsızdır; geniş ve yavaş kaçış ritmi hemodinamik açıdan güvenli değildir.",
          "result": {
            "title": "12 derivasyonlu EKG",
            "summary": "Atriyal aktivite ile ventrikül yanıtı birbirinden bağımsızdır; geniş ve yavaş kaçış ritmi hemodinamik açıdan güvenli değildir.",
            "interpretation": "Atriyal aktivite ile ventrikül yanıtı birbirinden bağımsızdır; geniş ve yavaş kaçış ritmi hemodinamik açıdan güvenli değildir.",
            "values": [
              [
                "Atriyal hız",
                "82/dk",
                "60-100/dk",
                "Sinüs aktivitesi"
              ],
              [
                "Ventrikül hızı",
                "34/dk",
                "60-100/dk",
                "Çok yavaş"
              ],
              [
                "P dalgası-QRS ilişkisi",
                "Düzenli P dalgaları QRS komplekslerinden bağımsız",
                "1:1 ilişki beklenir",
                "AV dissosiasyon"
              ],
              [
                "QRS süresi",
                "148 ms",
                "<120 ms",
                "Geniş kaçış ritmi"
              ],
              [
                "ST elevasyonu",
                "Yok",
                "Yok",
                "Akut STEMI bulgusu yok"
              ]
            ],
            "rows": [
              [
                "Atriyal hız",
                "82/dk",
                "60-100/dk",
                "Sinüs aktivitesi"
              ],
              [
                "Ventrikül hızı",
                "34/dk",
                "60-100/dk",
                "Çok yavaş"
              ],
              [
                "P dalgası-QRS ilişkisi",
                "Düzenli P dalgaları QRS komplekslerinden bağımsız",
                "1:1 ilişki beklenir",
                "AV dissosiasyon"
              ],
              [
                "QRS süresi",
                "148 ms",
                "<120 ms",
                "Geniş kaçış ritmi"
              ],
              [
                "ST elevasyonu",
                "Yok",
                "Yok",
                "Akut STEMI bulgusu yok"
              ]
            ]
          }
        },
        {
          "id": "v293-new-654-yavas-nabiz-ve-bayilma-laboratuvar",
          "label": "Temel laboratuvar ve geri döndürülebilir nedenler",
          "title": "Temel laboratuvar ve geri döndürülebilir nedenler",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Biyokimya",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Elektrolit, tiroid ve akut miyokard hasarı açısından belirgin düzeltilebilir tetikleyici gösterilmemektedir.",
          "clinicalMeaning": "Elektrolit, tiroid ve akut miyokard hasarı açısından belirgin düzeltilebilir tetikleyici gösterilmemektedir.",
          "result": {
            "title": "Temel laboratuvar ve geri döndürülebilir nedenler",
            "summary": "Elektrolit, tiroid ve akut miyokard hasarı açısından belirgin düzeltilebilir tetikleyici gösterilmemektedir.",
            "interpretation": "Elektrolit, tiroid ve akut miyokard hasarı açısından belirgin düzeltilebilir tetikleyici gösterilmemektedir.",
            "values": [
              [
                "Potasyum",
                "4.3 mmol/L",
                "3.5-5.1 mmol/L",
                "Normal"
              ],
              [
                "Magnezyum",
                "1.9 mg/dL",
                "1.7-2.4 mg/dL",
                "Normal"
              ],
              [
                "Kreatinin",
                "0.98 mg/dL",
                "0.7-1.3 mg/dL",
                "Normal"
              ],
              [
                "TSH",
                "2.1 mIU/L",
                "0.4-4.0 mIU/L",
                "Normal"
              ],
              [
                "Troponin I",
                "0.012 ng/mL",
                "<0.04 ng/mL",
                "Negatif"
              ]
            ],
            "rows": [
              [
                "Potasyum",
                "4.3 mmol/L",
                "3.5-5.1 mmol/L",
                "Normal"
              ],
              [
                "Magnezyum",
                "1.9 mg/dL",
                "1.7-2.4 mg/dL",
                "Normal"
              ],
              [
                "Kreatinin",
                "0.98 mg/dL",
                "0.7-1.3 mg/dL",
                "Normal"
              ],
              [
                "TSH",
                "2.1 mIU/L",
                "0.4-4.0 mIU/L",
                "Normal"
              ],
              [
                "Troponin I",
                "0.012 ng/mL",
                "<0.04 ng/mL",
                "Negatif"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada acil yönetimde en uygun yaklaşım aşağıdakilerden hangisidir?",
      "questionType": "Acil yönetim",
      "answerTarget": "Semptomatik ileri bradikardide pacing önceliği",
      "diagnosis": {
        "correct": "Transkütan pacing başlatıp geçici transvenöz pacing ve kalıcı pacemaker değerlendirmesi planlamak",
        "options": [
          "IV metoprolol vererek ventrikül hızını kontrol altına almak",
          "Sadece seri troponin takibiyle gözlem ünitesinde izlemek",
          "Oral amlodipin dozunu artırıp hipertansiyon polikliniğine yönlendirmek",
          "Transkütan pacing başlatıp geçici transvenöz pacing ve kalıcı pacemaker değerlendirmesi planlamak",
          "Yalnız IV sıvı verip EKG normalleşene kadar beklemek"
        ],
        "question": "Bu hastada acil yönetimde en uygun yaklaşım aşağıdakilerden hangisidir?",
        "explanation": "Hasta senkop, hipotansiyon, soğuk ekstremite ve geniş kaçış ritimli ileri AV ileti bozukluğu ile başvurmuştur. Bu tablo hemodinamik olarak anlamlı bradikardi kabul edilir; geri döndürülebilir elektrolit, tiroid, ilaç veya akut STEMI bulgusu da belirgin değildir. Atropin infranodal ve geniş QRS kaçışlı olgularda güvenilir olmayabilir; zaman kaybetmeden transkütan pacing başlatılıp geçici transvenöz pacing ve kalıcı pacemaker gereksinimi değerlendirilmelidir.",
        "pearls": [
          "Senkop, hipotansiyon ve yavaş geniş kaçış ritmi bradikardinin hemodinamik olarak anlamlı olduğunu gösterir.",
          "Geniş QRS kaçış ritmi infranodal düzey lehine olabilir ve atropin yanıtı güvenilir değildir.",
          "Düzeltilebilir neden yoksa kalıcı pacemaker planı düşünülür."
        ],
        "optionFeedback": {
          "IV metoprolol vererek ventrikül hızını kontrol altına almak": "Bu yaklaşım tehlikelidir. Metoprolol AV nod ve iletim sistemi üzerinden hızı daha da düşürebilir; hasta zaten ventrikül hızı 34/dk olan semptomatik ileri bradikardi tablosundadır. Beta blokerler hızlı ventrikül yanıtlı taşiaritmilerde hız kontrolü için düşünülebilir, ancak burada problem hızlı ritim değil düşük kaçış ritmi ve dolaşım yetersizliğidir. Bu seçenek seçilirse senkop, hipotansiyon ve perfüzyon bozukluğu ağırlaşabilir.",
          "Sadece seri troponin takibiyle gözlem ünitesinde izlemek": "Seri troponin, göğüs ağrısı veya miyokard iskemisi şüphesi olan hastalarda yararlı olabilir; ancak bu hastada acil karar ritim ve perfüzyon üzerinden verilmelidir. Troponin negatifliği de iletim bozukluğunun ciddiyetini ortadan kaldırmaz. Senkop ve hipotansiyon varken yalnız gözlem yapmak, pacing gerektiren bradikardiyi geciktirir. Gözlem ancak hasta stabilse ve ciddi ritim bozukluğu yoksa makul olabilir.",
          "Oral amlodipin dozunu artırıp hipertansiyon polikliniğine yönlendirmek": "Bu seçenek vaka verileriyle uyuşmaz. Hasta hipotansif ve bradikardiktir; sorun hipertansiyon kontrolü değildir. Amlodipin genellikle belirgin AV blok yapmaz, ancak doz artırımı bu acil ritim problemine çözüm sağlamaz. Poliklinik yönlendirmesi, senkop ve hemodinamik etkilenimi olan hastada güvenli değildir.",
          "Transkütan pacing başlatıp geçici transvenöz pacing ve kalıcı pacemaker değerlendirmesi planlamak": "Bu seçenek en uygundur. EKG’de P dalgaları ile QRS komplekslerinin bağımsız olması, çok yavaş geniş kaçış ritmi, hipotansiyon ve soğuk ekstremiteler ciddi bradikardinin dolaşımı bozduğunu gösterir. Böyle bir hastada atropin denenebilir ancak özellikle geniş QRS/infranodal olasılıkta zaman kaybettirmemelidir; transkütan pacing köprü tedavidir, geçici transvenöz pacing daha güvenilir stabilizasyon sağlar. Geri döndürülebilir neden saptanmadığında kalıcı pacemaker gereksinimi kardiyoloji tarafından değerlendirilmelidir.",
          "Yalnız IV sıvı verip EKG normalleşene kadar beklemek": "Sıvı desteği bazı hipotansiyon nedenlerinde geçici fayda sağlayabilir; fakat bu hastada temel hemodinamik sorun yetersiz kalp hızıdır. Sıvı, ileri iletim bozukluğunu düzeltmez ve kaçış ritmini güvenli hale getirmez. Ventrikül hızı 34/dk iken beklemek, tekrarlayan senkop veya kardiyak arrest riskini artırır. Sıvı destekleyici olabilir ancak pacing yerine geçmez."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Semptomatik ileri bradikardide tedavi kararı yalnız ritim adından değil, perfüzyon bulgularından verilir. Hipotansiyon, senkop, soğuk ekstremite veya bilinç değişikliği varsa acil pacing düşünülür.",
      "examPearl": "Geniş QRS kaçışlı tam AV blokta “atropin verip beklemek” tuzak olabilir; hemodinamik etkilenim varsa pacing önceliklidir.",
      "whyCorrect": "Hasta semptomatik, hipotansif ve EKG’de atriyoventriküler dissosiasyonla yavaş geniş kaçış ritmine sahiptir. Bu zincir acil pacing gereksinimini destekler.",
      "optionComparison": "Hız kontrol ilaçları taşiaritmide; gözlem stabil ve düşük riskli hastada; sıvı ise destek tedavisinde kullanılabilir. Bu vakada esas problem dolaşımı bozan bradikardidir.",
      "evidenceChain": [
        "Senkop ve devam eden baş dönmesi → ritim bozukluğunun semptomatik olduğunu gösterir.",
        "TA 88/54 mmHg ve soğuk ekstremite → bradikardinin perfüzyonu bozduğunu gösterir.",
        "Ventrikül hızı 34/dk ve geniş kaçış ritmi → güvenli spontan ventrikül yanıtı olmadığını gösterir.",
        "Elektrolit, TSH ve troponin normal → belirgin hızlı düzeltilebilir tetikleyici saptanmamıştır."
      ],
      "whyWrong": {},
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v293",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V292 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v293-new-655-yutma-guclugu-ve-gece-regurjitasyon",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Yutma güçlüğü ve gece regürjitasyon",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Katı ve sıvı gıdalara birlikte disfaji ile gelen hastada motilite bozukluğu paternini tanıyıp en tanısal testi seçme.",
      "learningTarget": "Akalazya benzeri motilite bozukluklarında endoskopi ile yapısal neden dışlandıktan sonra yüksek çözünürlüklü özofagus manometrisinin tanısal rolünü öğrenme.",
      "demographics": "42 yaşında erkek hasta",
      "setting": "Gastroenteroloji polikliniği",
      "chiefComplaint": "Hasta, birkaç aydır artan yutma güçlüğü ve geceleri ağza yemek gelmesi nedeniyle başvuruyor.",
      "stem": "Hasta yaklaşık altı aydır hem ekmek-et gibi katı yiyecekleri hem de su içerken lokmanın göğüs arkasında takıldığını anlatır. Başlangıçta aralıklı olan yakınması son iki ayda neredeyse her öğünde olmuştur. Geceleri yastığına sindirilmemiş gıda geldiğini, bu nedenle öksürerek uyandığını söyler. Mide yanması için aldığı antasitlerden belirgin fayda görmemiştir. Sigara içmez; ailesinde özofagus kanseri öyküsü yoktur. Son aylarda iştahı iyi olmasına rağmen yemek süresi uzadığı için 4 kg kaybettiğini belirtir.",
      "patientIntro": {
        "profile": "42 yaşında erkek hasta, Gastroenteroloji polikliniğinde değerlendiriliyor.",
        "presentation": "Hasta, birkaç aydır artan yutma güçlüğü ve geceleri ağza yemek gelmesi nedeniyle başvuruyor.",
        "historySummary": "Hasta yaklaşık altı aydır hem ekmek-et gibi katı yiyecekleri hem de su içerken lokmanın göğüs arkasında takıldığını anlatır. Başlangıçta aralıklı olan yakınması son iki ayda neredeyse her öğünde olmuştur. Geceleri yastığına sindirilmemiş gıda geldiğini, bu nedenle öksürerek uyandığını söyler. Mide yanması için aldığı antasitlerden belirgin fayda görmemiştir. Sigara içmez; ailesinde özofagus kanseri öyküsü yoktur. Son aylarda iştahı iyi olmasına rağmen yemek süresi uzadığı için 4 kg kaybettiğini belirtir."
      },
      "vitals": {
        "TA": "122/76 mmHg",
        "Nabız": "82/dk, düzenli",
        "Solunum": "16/dk",
        "SpO2": "%98, oda havasında",
        "Ateş": "36.7 °C",
        "Şok indeksi": "0.67; kapiller dolum <2 sn, perfüzyon iyi"
      },
      "exam": [
        "Genel durumu iyi, belirgin dehidratasyon yok.",
        "Orofarenks muayenesinde kitle, ülser veya belirgin nörolojik yutma bozukluğu bulgusu yok.",
        "Akciğer oskültasyonunda ral duyulmuyor.",
        "Karın muayenesi doğal, lenfadenopati saptanmıyor."
      ],
      "investigations": [
        {
          "id": "v293-new-655-yutma-guclugu-ve-gece-regurjitasyon-endoskopi",
          "label": "Üst gastrointestinal endoskopi",
          "title": "Üst gastrointestinal endoskopi",
          "type": "imaging",
          "priority": "essential",
          "subtype": "Endoskopi",
          "category": "imaging",
          "testTypeCategory": "imaging",
          "summary": "Yapısal tıkanıklık veya kitle saptanmadan özofagusta staz ve distal geçiş direnci görülmektedir.",
          "clinicalMeaning": "Yapısal tıkanıklık veya kitle saptanmadan özofagusta staz ve distal geçiş direnci görülmektedir.",
          "result": {
            "title": "Üst gastrointestinal endoskopi",
            "summary": "Yapısal tıkanıklık veya kitle saptanmadan özofagusta staz ve distal geçiş direnci görülmektedir.",
            "interpretation": "Yapısal tıkanıklık veya kitle saptanmadan özofagusta staz ve distal geçiş direnci görülmektedir.",
            "values": [
              [
                "Özofagus lümeni",
                "Genişlemiş, sıvı ve gıda artığı izleniyor",
                "Temiz lümen beklenir",
                "Staz bulgusu"
              ],
              [
                "Mukoza",
                "Kitle veya ülser izlenmiyor",
                "Lezyon yok",
                "Yapısal malign obstrüksiyon lehine değil"
              ],
              [
                "Gastroözofageal geçiş",
                "Endoskop hafif dirençle geçiyor",
                "Rahat geçiş beklenir",
                "Fonksiyonel çıkış direnci"
              ],
              [
                "Mide-duodenum",
                "Belirgin patoloji yok",
                "Normal",
                "Eşlik eden ülseratif neden yok"
              ]
            ],
            "rows": [
              [
                "Özofagus lümeni",
                "Genişlemiş, sıvı ve gıda artığı izleniyor",
                "Temiz lümen beklenir",
                "Staz bulgusu"
              ],
              [
                "Mukoza",
                "Kitle veya ülser izlenmiyor",
                "Lezyon yok",
                "Yapısal malign obstrüksiyon lehine değil"
              ],
              [
                "Gastroözofageal geçiş",
                "Endoskop hafif dirençle geçiyor",
                "Rahat geçiş beklenir",
                "Fonksiyonel çıkış direnci"
              ],
              [
                "Mide-duodenum",
                "Belirgin patoloji yok",
                "Normal",
                "Eşlik eden ülseratif neden yok"
              ]
            ]
          }
        },
        {
          "id": "v293-new-655-yutma-guclugu-ve-gece-regurjitasyon-baryum",
          "label": "Baryumlu özofagus grafisi",
          "title": "Baryumlu özofagus grafisi",
          "type": "imaging",
          "priority": "essential",
          "subtype": "Radyoloji",
          "category": "imaging",
          "testTypeCategory": "imaging",
          "summary": "Grafi motilite bozukluğu lehine ipuçları verir, ancak fizyolojik tanımlama için basınç ölçümü gerekir.",
          "clinicalMeaning": "Grafi motilite bozukluğu lehine ipuçları verir, ancak fizyolojik tanımlama için basınç ölçümü gerekir.",
          "result": {
            "title": "Baryumlu özofagus grafisi",
            "summary": "Grafi motilite bozukluğu lehine ipuçları verir, ancak fizyolojik tanımlama için basınç ölçümü gerekir.",
            "interpretation": "Grafi motilite bozukluğu lehine ipuçları verir, ancak fizyolojik tanımlama için basınç ölçümü gerekir.",
            "values": [
              [
                "Özofagus çapı",
                "Proksimal genişleme",
                "Normal kalibrasyon",
                "Staz ile birlikte genişleme"
              ],
              [
                "Distal uç",
                "Düzgün daralma",
                "Düzgün geçiş beklenir",
                "Konik daralma paterni"
              ],
              [
                "Peristaltizm",
                "Belirgin itici dalga izlenmiyor",
                "Düzenli peristaltizm beklenir",
                "Motilite kusuru"
              ],
              [
                "Aspirasyon bulgusu",
                "Grafide akut aspirasyon izlenmiyor",
                "Yok",
                "Komplikasyon saptanmadı"
              ]
            ],
            "rows": [
              [
                "Özofagus çapı",
                "Proksimal genişleme",
                "Normal kalibrasyon",
                "Staz ile birlikte genişleme"
              ],
              [
                "Distal uç",
                "Düzgün daralma",
                "Düzgün geçiş beklenir",
                "Konik daralma paterni"
              ],
              [
                "Peristaltizm",
                "Belirgin itici dalga izlenmiyor",
                "Düzenli peristaltizm beklenir",
                "Motilite kusuru"
              ],
              [
                "Aspirasyon bulgusu",
                "Grafide akut aspirasyon izlenmiyor",
                "Yok",
                "Komplikasyon saptanmadı"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada tanıyı kesinleştirmek için en uygun test aşağıdakilerden hangisidir?",
      "questionType": "Tanısal yaklaşım",
      "answerTarget": "Özofagus motilite bozukluğunda doğrulayıcı test",
      "diagnosis": {
        "correct": "Yüksek çözünürlüklü özofagus manometrisi",
        "options": [
          "Yüksek çözünürlüklü özofagus manometrisi",
          "Serum gastrin düzeyi ölçümü",
          "Dışkıda gizli kan testi",
          "24 saatlik idrar 5-HIAA ölçümü",
          "Karın ultrasonografisi ile safra kesesi değerlendirmesi"
        ],
        "question": "Bu hastada tanıyı kesinleştirmek için en uygun test aşağıdakilerden hangisidir?",
        "explanation": "Hastada hem katı hem sıvılara disfaji, sindirilmemiş gıda regürjitasyonu, antasitlere yanıtsızlık ve endoskopide kitle olmadan özofageal staz vardır. Baryumlu grafi motilite bozukluğu yönünde güçlü ipucu verse de kesin fizyolojik tanı alt özofagus sfinkter gevşemesi ve peristaltizm paterninin ölçülmesiyle konur. Bu nedenle yüksek çözünürlüklü özofagus manometrisi en uygun doğrulayıcı testtir.",
        "pearls": [
          "Katı ve sıvılara birlikte disfaji mekanik darlıktan çok motilite bozukluğunu düşündürür.",
          "Endoskopi öncelikle kitle, striktür ve mukozal patolojiyi dışlar.",
          "Motilite bozukluklarında kesin fizyolojik sınıflama manometri ile yapılır."
        ],
        "optionFeedback": {
          "Yüksek çözünürlüklü özofagus manometrisi": "Bu seçenek en uygundur. Hastanın hem katı hem sıvılara disfajisi, geceleri sindirilmemiş gıda regürjitasyonu, endoskopide kitle olmaması ve baryumlu grafide distal düzgün daralma ile peristaltik aktivite kaybı motilite bozukluğu paternini oluşturur. Manometri, alt özofagus sfinkterinin gevşeme kusurunu ve özofagus gövdesindeki peristaltizm kaybını doğrudan gösterir; ayrıca alt tip ayrımı yaparak tedavi planını etkiler. Endoskopi ve baryumlu grafi önemli basamaklardır ama kesin fizyolojik tanı için yeterli değildir.",
          "Serum gastrin düzeyi ölçümü": "Serum gastrin ölçümü Zollinger-Ellison sendromu gibi aşırı asit üretimiyle seyreden durumlarda anlamlıdır. Bu sendromda dirençli peptik ülser, ciddi reflü, ishal veya gastrik asit hipersekresyonu beklenir. Bu hastanın temel yakınması katı-sıvı disfajisi ve sindirilmemiş gıda regürjitasyonudur; endoskopide ülseratif hastalık değil staz ve distal geçiş direnci görülmüştür. Gastrin ölçümü bu paternin tanısını doğrulamaz.",
          "Dışkıda gizli kan testi": "Dışkıda gizli kan testi demir eksikliği anemisi, kolon kanseri taraması veya açıklanamayan kronik kan kaybı değerlendirmesinde kullanılır. Hastada melena, hematokezya, demir eksikliği veya alt gastrointestinal kanama bulgusu yoktur. Kilo kaybı alarm kabul edilse de endoskopi kitleyi dışlamış ve klinik patern motilite bozukluğuna yönelmiştir. Bu test yutma güçlüğünün mekanizmasını açıklamaz.",
          "24 saatlik idrar 5-HIAA ölçümü": "İdrar 5-HIAA ölçümü serotonin salgılayan nöroendokrin tümörlerde; flushing, sulu ishal, bronkospazm ve sağ kalp kapak tutulumuyla ilişkili kliniklerde kullanılır. Bu hastada ataklar halinde kızarma, kronik sulu ishal veya karsinoid sendrom bulguları yoktur. Özofagus stazı ve katı-sıvı disfajisi 5-HIAA ile açıklanamaz. Bu seçenek kategori olarak tanısal test olsa da vaka hedefiyle ilişkili değildir.",
          "Karın ultrasonografisi ile safra kesesi değerlendirmesi": "Karın ultrasonografisi sağ üst kadran ağrısı, kolestatik enzim yüksekliği veya safra taşı komplikasyonları için uygundur. Bu hastada ağrı safra koliği şeklinde değildir; ana sorun lokmanın göğüs arkasında takılması ve regürjitasyondur. Safra kesesi görüntülemesi özofagus peristaltizmini veya alt sfinkter gevşemesini değerlendirmez. Bu nedenle doğru tanıyı doğrulayan test değildir."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Katı ve sıvı gıdalara eş zamanlı disfaji motilite bozukluğu için yüksek değerli ipucudur. Endoskopi yapısal nedenleri dışladıktan sonra manometri tanıyı kesinleştirir.",
      "examPearl": "Akalazya benzeri tabloda “kuş gagası” ipucu verir; kesin tanı manometridir.",
      "whyCorrect": "Vaka verileri mekanik kitle olmadan özofagus stazı ve peristaltik bozukluk yönündedir; bunu kesinleştiren test yüksek çözünürlüklü manometridir.",
      "optionComparison": "Gastrin, 5-HIAA ve dışkıda gizli kan farklı sendromların testleridir; ultrason hepatobiliyer yakınmalarda kullanılır. Bu vakada fizyolojik özofagus basınç değerlendirmesi gerekir.",
      "evidenceChain": [
        "Katı ve sıvılara birlikte disfaji → mekanik darlıktan çok motilite bozukluğu lehinedir.",
        "Geceleri sindirilmemiş gıda regürjitasyonu → özofagusta staz olduğunu gösterir.",
        "Endoskopide kitle/striktür yok → yapısal obstrüksiyon olasılığı azalır.",
        "Baryumlu grafide distal düzgün daralma ve peristaltizm kaybı → manometrik doğrulama gerektirir."
      ],
      "whyWrong": {},
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v293",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V292 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v293-new-656-sirozlu-hastada-kreatinin-artisi-ve-az-idrar",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Sirozlu hastada kreatinin artışı ve az idrar",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Dekompanse karaciğer hastalığında enfeksiyon veya yapısal böbrek hastalığı olmadan gelişen fonksiyonel böbrek yetmezliğinde uygun tedavi yaklaşımını seçme.",
      "learningTarget": "Siroz zemininde prerenal yanıt vermeyen AKI paterninde albumin ve vazokonstriktör tedavi mantığını öğrenme.",
      "demographics": "59 yaşında erkek hasta",
      "setting": "Dahiliye servisi",
      "chiefComplaint": "Hasta, karında şişlik artışı ve son iki gündür idrar miktarında azalma nedeniyle yatırılıyor.",
      "stem": "Hasta son bir haftada karnının belirgin gerildiğini, ayakkabılarının ayağını sıktığını ve yürürken daha çabuk yorulduğunu anlatır. İki gündür idrarının azaldığını, buna rağmen bol su içmeye çalıştığını söyler. Bilinen alkol ilişkili karaciğer hastalığı vardır; son günlerde NSAİİ kullanmadığını, kan kusma veya siyah dışkı fark etmediğini belirtir. Ateş, titreme veya yeni başlayan karın ağrısı tariflemez. Evde aldığı diüretikleri iştahsızlık nedeniyle düzensiz kullanmıştır. Yakını, hastanın bilincinde belirgin dalgalanma olmadığını söyler.",
      "patientIntro": {
        "profile": "59 yaşında erkek hasta, Dahiliye servisinde değerlendiriliyor.",
        "presentation": "Hasta, karında şişlik artışı ve son iki gündür idrar miktarında azalma nedeniyle yatırılıyor.",
        "historySummary": "Hasta son bir haftada karnının belirgin gerildiğini, ayakkabılarının ayağını sıktığını ve yürürken daha çabuk yorulduğunu anlatır. İki gündür idrarının azaldığını, buna rağmen bol su içmeye çalıştığını söyler. Bilinen alkol ilişkili karaciğer hastalığı vardır; son günlerde NSAİİ kullanmadığını, kan kusma veya siyah dışkı fark etmediğini belirtir. Ateş, titreme veya yeni başlayan karın ağrısı tariflemez. Evde aldığı diüretikleri iştahsızlık nedeniyle düzensiz kullanmıştır. Yakını, hastanın bilincinde belirgin dalgalanma olmadığını söyler."
      },
      "vitals": {
        "TA": "94/58 mmHg",
        "Nabız": "102/dk, düzenli",
        "Solunum": "18/dk",
        "SpO2": "%97, oda havasında",
        "Ateş": "36.8 °C",
        "Şok indeksi": "1.09; kapiller dolum 2-3 sn, periferik perfüzyon sınırda"
      },
      "exam": [
        "Skleralarda hafif ikter var, hasta koopere ve oryante.",
        "Karında belirgin asit mevcut, defans veya rebound yok.",
        "Pretibial ödem bilateral +2 düzeyinde.",
        "Akciğer oskültasyonu belirgin ral olmadan doğal, asteriksis saptanmıyor."
      ],
      "investigations": [
        {
          "id": "v293-new-656-sirozlu-hastada-kreatinin-artisi-ve-az-idrar-biyokimya",
          "label": "Böbrek ve karaciğer fonksiyonları",
          "title": "Böbrek ve karaciğer fonksiyonları",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Biyokimya",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Dekompanse karaciğer hastalığı zemininde hızlı kreatinin artışı ve dolaşım etkilenimi vardır.",
          "clinicalMeaning": "Dekompanse karaciğer hastalığı zemininde hızlı kreatinin artışı ve dolaşım etkilenimi vardır.",
          "result": {
            "title": "Böbrek ve karaciğer fonksiyonları",
            "summary": "Dekompanse karaciğer hastalığı zemininde hızlı kreatinin artışı ve dolaşım etkilenimi vardır.",
            "interpretation": "Dekompanse karaciğer hastalığı zemininde hızlı kreatinin artışı ve dolaşım etkilenimi vardır.",
            "values": [
              [
                "Kreatinin",
                "2.3 mg/dL",
                "0.7-1.3 mg/dL",
                "Artmış; bazal 0.9 mg/dL"
              ],
              [
                "Üre",
                "62 mg/dL",
                "15-45 mg/dL",
                "Yüksek"
              ],
              [
                "Sodyum",
                "128 mmol/L",
                "135-145 mmol/L",
                "Düşük"
              ],
              [
                "Total bilirubin",
                "4.1 mg/dL",
                "<1.2 mg/dL",
                "Yüksek"
              ],
              [
                "INR",
                "1.8",
                "0.8-1.2",
                "Yüksek"
              ],
              [
                "Albumin",
                "2.4 g/dL",
                "3.5-5.0 g/dL",
                "Düşük"
              ]
            ],
            "rows": [
              [
                "Kreatinin",
                "2.3 mg/dL",
                "0.7-1.3 mg/dL",
                "Artmış; bazal 0.9 mg/dL"
              ],
              [
                "Üre",
                "62 mg/dL",
                "15-45 mg/dL",
                "Yüksek"
              ],
              [
                "Sodyum",
                "128 mmol/L",
                "135-145 mmol/L",
                "Düşük"
              ],
              [
                "Total bilirubin",
                "4.1 mg/dL",
                "<1.2 mg/dL",
                "Yüksek"
              ],
              [
                "INR",
                "1.8",
                "0.8-1.2",
                "Yüksek"
              ],
              [
                "Albumin",
                "2.4 g/dL",
                "3.5-5.0 g/dL",
                "Düşük"
              ]
            ]
          }
        },
        {
          "id": "v293-new-656-sirozlu-hastada-kreatinin-artisi-ve-az-idrar-idrar",
          "label": "İdrar incelemesi ve renal ultrason",
          "title": "İdrar incelemesi ve renal ultrason",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Nefroloji",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Aktif sediment, ağır proteinüri veya obstrüksiyon gösterilmemektedir.",
          "clinicalMeaning": "Aktif sediment, ağır proteinüri veya obstrüksiyon gösterilmemektedir.",
          "result": {
            "title": "İdrar incelemesi ve renal ultrason",
            "summary": "Aktif sediment, ağır proteinüri veya obstrüksiyon gösterilmemektedir.",
            "interpretation": "Aktif sediment, ağır proteinüri veya obstrüksiyon gösterilmemektedir.",
            "values": [
              [
                "İdrar protein",
                "Negatif/iz",
                "Negatif",
                "Belirgin proteinüri yok"
              ],
              [
                "İdrar eritrosit",
                "0-1/hpf",
                "0-3/hpf",
                "Normal"
              ],
              [
                "Granüler silendir",
                "Yok",
                "Yok",
                "Tübüler nekroz lehine değil"
              ],
              [
                "İdrar sodyumu",
                "8 mmol/L",
                "Değişken; düşük olabilir",
                "Sodyum tutulumu belirgin"
              ],
              [
                "Renal USG",
                "Hidronefroz yok, böbrek boyutları korunmuş",
                "Obstrüksiyon yok",
                "Postrenal neden dışlanıyor"
              ]
            ],
            "rows": [
              [
                "İdrar protein",
                "Negatif/iz",
                "Negatif",
                "Belirgin proteinüri yok"
              ],
              [
                "İdrar eritrosit",
                "0-1/hpf",
                "0-3/hpf",
                "Normal"
              ],
              [
                "Granüler silendir",
                "Yok",
                "Yok",
                "Tübüler nekroz lehine değil"
              ],
              [
                "İdrar sodyumu",
                "8 mmol/L",
                "Değişken; düşük olabilir",
                "Sodyum tutulumu belirgin"
              ],
              [
                "Renal USG",
                "Hidronefroz yok, böbrek boyutları korunmuş",
                "Obstrüksiyon yok",
                "Postrenal neden dışlanıyor"
              ]
            ]
          }
        },
        {
          "id": "v293-new-656-sirozlu-hastada-kreatinin-artisi-ve-az-idrar-asit",
          "label": "Asit sıvısı analizi ve albumin yanıtı",
          "title": "Asit sıvısı analizi ve albumin yanıtı",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Gastroenteroloji",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Enfeksiyon gösterilmemiştir ve albuminle belirgin böbrek fonksiyon düzelmesi olmamıştır.",
          "clinicalMeaning": "Enfeksiyon gösterilmemiştir ve albuminle belirgin böbrek fonksiyon düzelmesi olmamıştır.",
          "result": {
            "title": "Asit sıvısı analizi ve albumin yanıtı",
            "summary": "Enfeksiyon gösterilmemiştir ve albuminle belirgin böbrek fonksiyon düzelmesi olmamıştır.",
            "interpretation": "Enfeksiyon gösterilmemiştir ve albuminle belirgin böbrek fonksiyon düzelmesi olmamıştır.",
            "values": [
              [
                "Asit PMN",
                "86/mm³",
                "<250/mm³",
                "Düşük"
              ],
              [
                "Asit kültürü",
                "Üreme yok",
                "Üreme yok",
                "Negatif"
              ],
              [
                "48 saat albumin sonrası kreatinin",
                "2.4 mg/dL",
                "Düşüş beklenir",
                "Düzelme yok"
              ],
              [
                "Son 48 saatte idrar çıkışı",
                "420 mL/gün",
                ">800-1000 mL/gün",
                "Azalmış"
              ]
            ],
            "rows": [
              [
                "Asit PMN",
                "86/mm³",
                "<250/mm³",
                "Düşük"
              ],
              [
                "Asit kültürü",
                "Üreme yok",
                "Üreme yok",
                "Negatif"
              ],
              [
                "48 saat albumin sonrası kreatinin",
                "2.4 mg/dL",
                "Düşüş beklenir",
                "Düzelme yok"
              ],
              [
                "Son 48 saatte idrar çıkışı",
                "420 mL/gün",
                ">800-1000 mL/gün",
                "Azalmış"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada böbrek fonksiyonunu düzeltmeye yönelik en uygun tedavi yaklaşımı aşağıdakilerden hangisidir?",
      "questionType": "Tedavi/izlem",
      "answerTarget": "Siroz ilişkili fonksiyonel AKI tedavisi",
      "diagnosis": {
        "correct": "Albumin ile birlikte vazokonstriktör tedavi başlamak ve karaciğer nakli açısından değerlendirmek",
        "options": [
          "Yüksek doz furosemid infüzyonu ile agresif diürez sağlamak",
          "NSAİİ başlanarak renal prostaglandin etkisini artırmak",
          "Sadece oral sıvı alımını artırıp kreatinini poliklinikte izlemek",
          "Geniş spektrumlu antibiyotikle spontan peritonit tedavisi verip diğer tedavileri ertelemek",
          "Albumin ile birlikte vazokonstriktör tedavi başlamak ve karaciğer nakli açısından değerlendirmek"
        ],
        "question": "Bu hastada böbrek fonksiyonunu düzeltmeye yönelik en uygun tedavi yaklaşımı aşağıdakilerden hangisidir?",
        "explanation": "Dekompanse sirozlu hastada hızlı kreatinin artışı, düşük idrar sodyumu, aktif idrar sedimenti olmaması, obstrüksiyonun dışlanması, asit sıvısında enfeksiyon bulgusu olmaması ve albuminle düzelmeme fonksiyonel renal vazokonstriksiyon paternini destekler. Böyle bir tabloda diüretik artırmak veya beklemek güvenli bir tercih değildir. Albumin ile birlikte sistemik/splanchnik dolaşımı hedefleyen vazokonstriktör tedavi başlanmalı ve altta yatan ileri karaciğer hastalığı nedeniyle nakil uygunluğu değerlendirilmelidir.",
        "pearls": [
          "Sirozda AKI değerlendirilirken enfeksiyon, kanama, nefrotoksin, obstrüksiyon ve aktif sediment aranır.",
          "Albuminle düzelmeyen, düşük idrar sodyumlu ve bland sedimentli tablo fonksiyonel renal vazokonstriksiyon lehinedir.",
          "Tedavi albumin + vazokonstriktör ve karaciğer nakli değerlendirmesidir."
        ],
        "optionFeedback": {
          "Yüksek doz furosemid infüzyonu ile agresif diürez sağlamak": "Bu seçenek güvenli bir tercih değildir. Hastada asit ve ödem bulunsa da asıl sorun hızla artan kreatinin ve azalan efektif arteriyel dolaşımdır. Yüksek doz loop diüretik böbrek perfüzyonunu daha da bozabilir, hiponatremiyi ağırlaştırabilir ve kreatinin artışını hızlandırabilir. Diüretikler asit yönetiminde seçilmiş stabil hastalarda kullanılır; albuminle düzelmeyen AKI geliştiğinde artırılmaları değil genellikle kesilmeleri veya azaltılmaları gerekir.",
          "NSAİİ başlanarak renal prostaglandin etkisini artırmak": "Bu ifade farmakolojik olarak yanlıştır ve hasta için zararlıdır. NSAİİ’ler renal prostaglandin sentezini inhibe ederek afferent arteriyol vazokonstriksiyonuna ve GFR düşüşüne yol açabilir. Sirozlu, efektif dolaşımı düşük ve böbrek fonksiyonu bozulan hastalarda NSAİİ kullanımı özellikle risklidir. Hastanın öyküsünde NSAİİ kullanmaması önemli bir negatif bulgudur; tedavi olarak başlanması doğru değildir.",
          "Sadece oral sıvı alımını artırıp kreatinini poliklinikte izlemek": "Bu yaklaşım hastanın ciddiyetini hafife alır. Kreatinin bazal 0.9’dan 2.3-2.4 mg/dL’ye yükselmiş, idrar çıkışı azalmış ve hipotansiyon/perfüzyon bozukluğu vardır. Oral sıvı artırmak, sirozda asit ve hiponatremiyi kötüleştirebilir; ayrıca albumin denemesine yanıt alınmamıştır. Bu tablo poliklinik takibine bırakılacak bir durum değil, hastane içinde aktif tedavi ve transplant uygunluğu gerektiren ileri dekompansasyondur.",
          "Geniş spektrumlu antibiyotikle spontan peritonit tedavisi verip diğer tedavileri ertelemek": "Spontan bakteriyel peritonit sirozlu hastada AKI’yi tetikleyebilir ve asit PMN ≥250/mm³ olduğunda acil antibiyotik gerekir. Bu vakada asit PMN 86/mm³ ve kültür negatif verilmiştir; ateş ve karın ağrısı da yoktur. Elbette enfeksiyon gelişirse tedavi edilmelidir, ancak mevcut veriler antibiyotikle açıklanacak bir peritonit göstermemektedir. Böbrek fonksiyonunu hedefleyen albumin-vazokonstriktör yaklaşımını ertelemek doğru değildir.",
          "Albumin ile birlikte vazokonstriktör tedavi başlamak ve karaciğer nakli açısından değerlendirmek": "Bu seçenek en uygundur. Dekompanse siroz, hızlı kreatinin artışı, düşük idrar sodyumu, bland idrar sedimenti, obstrüksiyonun dışlanması ve albuminle düzelmeme fonksiyonel renal vazokonstriksiyon tablosunu destekler. Albumin intravasküler efektif hacmi destekler; vazokonstriktör tedavi splanchnik vazodilatasyonu azaltıp renal perfüzyonu iyileştirmeyi hedefler. Bu durum altta yatan ileri karaciğer hastalığının bir komplikasyonu olduğundan kalıcı çözüm açısından karaciğer nakli uygunluğu da değerlendirilmelidir."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Sirozda albuminle düzelmeyen AKI, aktif sediment ve obstrüksiyon yoksa fonksiyonel renal vazokonstriksiyon paternine işaret eder. Tedavi albumin + vazokonstriktör ve transplant değerlendirmesidir.",
      "examPearl": "Siroz + bland sediment + düşük idrar sodyumu + albumin yanıtsız AKI: diüretik artırma değil albumin-vazokonstriktör düşün.",
      "whyCorrect": "Vaka zinciri siroz zemininde enfeksiyon, obstrüksiyon ve glomerüler hastalık olmadan gelişen albumin yanıtsız AKI paternini gösterir.",
      "optionComparison": "Diüretik ve NSAİİ renal perfüzyonu bozabilir; antibiyotik ancak SBP kanıtında; yalnız oral sıvı ise bu ciddiyette yetersizdir.",
      "evidenceChain": [
        "Dekompanse siroz ve asit → renal perfüzyonu etkileyen sistemik dolaşım zemini vardır.",
        "Kreatinin bazale göre belirgin artmış ve idrar çıkışı azalmış → AKI klinik olarak anlamlıdır.",
        "Aktif idrar sedimenti/proteinüri ve hidronefroz yok → yapısal renal ve postrenal nedenler zayıflar.",
        "Asit PMN düşük ve kültür negatif → spontan peritonit bu tabloyu açıklamıyor.",
        "Albumin sonrası kreatinin düzelmemiş → yalnız hipovolemiyle açıklamak yeterli değildir."
      ],
      "whyWrong": {},
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v293",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V292 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v293-new-657-bas-agrisi-kizariklik-ve-kasinti",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Baş ağrısı, kızarıklık ve kaşıntı",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Eritrositoz, düşük eritropoietin ve JAK2 pozitifliği ile miyeloproliferatif neoplaziyi tanıyıp tromboz riskine göre tedaviyi seçme.",
      "learningTarget": "Polisitemia verada hematokrit hedefi, aspirin, flebotomi ve yüksek riskte sitoredüktif tedavi mantığını öğrenme.",
      "demographics": "67 yaşında erkek hasta",
      "setting": "Hematoloji polikliniği",
      "chiefComplaint": "Hasta, son aylarda artan baş ağrısı, yüzde kızarma ve banyodan sonra kaşıntı nedeniyle başvuruyor.",
      "stem": "Hasta yaklaşık dört aydır başında dolgunluk hissi ve özellikle sıcak duş sonrası tüm vücudunda kaşıntı yaşadığını anlatır. Son haftalarda yüzünün daha kırmızı göründüğünü, merdiven çıkarken zaman zaman kulaklarında uğultu olduğunu söyler. Sigara kullanmaz ve bilinen kronik akciğer hastalığı yoktur. Geçen yıl geçirdiği geçici iskemik atak nedeniyle kısa süre hastanede izlendiğini belirtir. Ateş, gece terlemesi veya belirgin kilo kaybı tariflemez. Eşlik eden kanama, melena ya da yakın zamanda yüksek rakımda bulunma öyküsü yoktur.",
      "patientIntro": {
        "profile": "67 yaşında erkek hasta, Hematoloji polikliniğinde değerlendiriliyor.",
        "presentation": "Hasta, son aylarda artan baş ağrısı, yüzde kızarma ve banyodan sonra kaşıntı nedeniyle başvuruyor.",
        "historySummary": "Hasta yaklaşık dört aydır başında dolgunluk hissi ve özellikle sıcak duş sonrası tüm vücudunda kaşıntı yaşadığını anlatır. Son haftalarda yüzünün daha kırmızı göründüğünü, merdiven çıkarken zaman zaman kulaklarında uğultu olduğunu söyler. Sigara kullanmaz ve bilinen kronik akciğer hastalığı yoktur. Geçen yıl geçirdiği geçici iskemik atak nedeniyle kısa süre hastanede izlendiğini belirtir. Ateş, gece terlemesi veya belirgin kilo kaybı tariflemez. Eşlik eden kanama, melena ya da yakın zamanda yüksek rakımda bulunma öyküsü yoktur."
      },
      "vitals": {
        "TA": "146/84 mmHg",
        "Nabız": "88/dk, düzenli",
        "Solunum": "16/dk",
        "SpO2": "%98, oda havasında",
        "Ateş": "36.5 °C",
        "Şok indeksi": "0.60; kapiller dolum <2 sn, perfüzyon iyi"
      },
      "exam": [
        "Yüzde plethorik görünüm var, siyanoz yok.",
        "Dalak kot altında 2 cm ele geliyor, hassas değil.",
        "Akciğer muayenesi doğal, çomak parmak saptanmıyor.",
        "Nörolojik muayenede akut defisit yok."
      ],
      "investigations": [
        {
          "id": "v293-new-657-bas-agrisi-kizariklik-ve-kasinti-hemogram",
          "label": "Tam kan sayımı",
          "title": "Tam kan sayımı",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Hematoloji",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Yalnız eritrosit artışı değil, diğer miyeloid serilerde de artış vardır.",
          "clinicalMeaning": "Yalnız eritrosit artışı değil, diğer miyeloid serilerde de artış vardır.",
          "result": {
            "title": "Tam kan sayımı",
            "summary": "Yalnız eritrosit artışı değil, diğer miyeloid serilerde de artış vardır.",
            "interpretation": "Yalnız eritrosit artışı değil, diğer miyeloid serilerde de artış vardır.",
            "values": [
              [
                "Hemoglobin",
                "19.1 g/dL",
                "13.5-17.5 g/dL",
                "Yüksek"
              ],
              [
                "Hematokrit",
                "%58",
                "%41-53",
                "Yüksek"
              ],
              [
                "Lökosit",
                "13.800/mm³",
                "4.000-10.000/mm³",
                "Yüksek"
              ],
              [
                "Trombosit",
                "612.000/mm³",
                "150.000-400.000/mm³",
                "Yüksek"
              ],
              [
                "MCV",
                "83 fL",
                "80-96 fL",
                "Normal"
              ]
            ],
            "rows": [
              [
                "Hemoglobin",
                "19.1 g/dL",
                "13.5-17.5 g/dL",
                "Yüksek"
              ],
              [
                "Hematokrit",
                "%58",
                "%41-53",
                "Yüksek"
              ],
              [
                "Lökosit",
                "13.800/mm³",
                "4.000-10.000/mm³",
                "Yüksek"
              ],
              [
                "Trombosit",
                "612.000/mm³",
                "150.000-400.000/mm³",
                "Yüksek"
              ],
              [
                "MCV",
                "83 fL",
                "80-96 fL",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v293-new-657-bas-agrisi-kizariklik-ve-kasinti-eritropoietin-jak2",
          "label": "Eritropoietin ve moleküler değerlendirme",
          "title": "Eritropoietin ve moleküler değerlendirme",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Moleküler hematoloji",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Sekonder hipoksik eritrositoz lehine veri yok; düşük EPO ve JAK2 pozitifliği klonal süreci destekler.",
          "clinicalMeaning": "Sekonder hipoksik eritrositoz lehine veri yok; düşük EPO ve JAK2 pozitifliği klonal süreci destekler.",
          "result": {
            "title": "Eritropoietin ve moleküler değerlendirme",
            "summary": "Sekonder hipoksik eritrositoz lehine veri yok; düşük EPO ve JAK2 pozitifliği klonal süreci destekler.",
            "interpretation": "Sekonder hipoksik eritrositoz lehine veri yok; düşük EPO ve JAK2 pozitifliği klonal süreci destekler.",
            "values": [
              [
                "Serum eritropoietin",
                "1.8 mIU/mL",
                "4-24 mIU/mL",
                "Düşük"
              ],
              [
                "JAK2 V617F",
                "Pozitif",
                "Negatif",
                "Klonal miyeloproliferasyon lehine"
              ],
              [
                "Oksijen satürasyonu",
                "%98",
                ">94",
                "Hipoksi yok"
              ],
              [
                "Karboxihemoglobin",
                "%1.2",
                "<%3",
                "Sigara/CO etkisi yok"
              ],
              [
                "Ferritin",
                "34 ng/mL",
                "30-400 ng/mL",
                "Alt sınıra yakın"
              ]
            ],
            "rows": [
              [
                "Serum eritropoietin",
                "1.8 mIU/mL",
                "4-24 mIU/mL",
                "Düşük"
              ],
              [
                "JAK2 V617F",
                "Pozitif",
                "Negatif",
                "Klonal miyeloproliferasyon lehine"
              ],
              [
                "Oksijen satürasyonu",
                "%98",
                ">94",
                "Hipoksi yok"
              ],
              [
                "Karboxihemoglobin",
                "%1.2",
                "<%3",
                "Sigara/CO etkisi yok"
              ],
              [
                "Ferritin",
                "34 ng/mL",
                "30-400 ng/mL",
                "Alt sınıra yakın"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hasta için en uygun başlangıç tedavi stratejisi aşağıdakilerden hangisidir?",
      "questionType": "Tedavi/izlem",
      "answerTarget": "Yüksek riskli klonal eritrositoz tedavisi",
      "diagnosis": {
        "correct": "Hematokriti <%45 hedefleyen flebotomi, düşük doz aspirin ve hidroksiüre başlamak",
        "options": [
          "Yalnız demir replasmanı verip eritrosit sayısının normale dönmesini beklemek",
          "Hematokriti <%45 hedefleyen flebotomi, düşük doz aspirin ve hidroksiüre başlamak",
          "Uzun süreli oral antikoagülasyon verip flebotomiden kaçınmak",
          "Geniş spektrumlu antibiyotik başlayıp lökosit yüksekliğini enfeksiyon gibi izlemek",
          "Trombosit sayısı normale dönene kadar yüksek doz kortikosteroid vermek"
        ],
        "question": "Bu hasta için en uygun başlangıç tedavi stratejisi aşağıdakilerden hangisidir?",
        "explanation": "Hastada aquajenik kaşıntı, plethore, splenomegali, panmiyeloz, düşük eritropoietin ve JAK2 pozitifliği klonal eritrositoz paternini destekler. Yaşın 60’ın üzerinde olması ve geçirilmiş geçici iskemik atak tromboz açısından yüksek riskli kategoriye sokar. Tedavide hematokriti <%45 hedefleyen flebotomi ve düşük doz aspirin temel yaklaşımdır; yüksek risk nedeniyle sitoredüktif tedavi olarak hidroksiüre eklenmelidir.",
        "pearls": [
          "Düşük EPO + JAK2 pozitif eritrositoz sekonder hipoksi kaynaklı eritrositozdan ayrılır.",
          "Tromboz riski yaş >60 veya tromboz öyküsü ile artar.",
          "Hematokrit hedefi <%45 trombotik komplikasyonları azaltmak için kritiktir."
        ],
        "optionFeedback": {
          "Yalnız demir replasmanı verip eritrosit sayısının normale dönmesini beklemek": "Bu seçenek yanlıştır. Ferritin alt sınıra yakın olsa bile hastanın ana problemi demir eksikliği anemisi değil belirgin eritrositoz ve panmiyelozdur. Demir replasmanı kontrolsüz verilirse eritropoezi artırıp hematokriti daha da yükseltebilir. Bu hastada baş ağrısı, plethore, aquajenik kaşıntı, düşük EPO ve JAK2 pozitifliği klonal bir süreci destekler; tedavi tromboz riskini azaltmaya yönelmelidir.",
          "Hematokriti <%45 hedefleyen flebotomi, düşük doz aspirin ve hidroksiüre başlamak": "Bu seçenek en uygundur. Hasta 67 yaşındadır ve daha önce geçici iskemik atak geçirmiştir; bu iki özellik yüksek tromboz riski anlamına gelir. Hematokritin <%45’e düşürülmesi kan viskozitesini ve trombotik riski azaltır, düşük doz aspirin mikrovasküler ve arteriyel olay riskine karşı kullanılır. Yüksek riskli hastada hidroksiüre gibi sitoredüktif tedavi eklenmesi trombosit/lökosit fazlalığını ve tromboz riskini kontrol etmeye yardımcı olur.",
          "Uzun süreli oral antikoagülasyon verip flebotomiden kaçınmak": "Antikoagülasyon belirli tromboz olaylarının tedavisinde gerekebilir; ancak bu hastanın temel tedavi hedefi yüksek hematokriti düşürmek ve klonal miyeloproliferasyonu kontrol etmektir. Flebotomiden kaçınmak kan viskozitesini yüksek bırakır ve baş ağrısı, mikrovasküler yakınmalar ile tromboz riskini azaltmaz. Antikoagülasyonun rutin olarak flebotomi/aspirin/sitoredüksiyon yerine geçmesi doğru değildir; ayrıca kanama riskini artırabilir.",
          "Geniş spektrumlu antibiyotik başlayıp lökosit yüksekliğini enfeksiyon gibi izlemek": "Lökositoz enfeksiyonda görülebilir; ancak bu hastada ateş, odak bulgusu, CRP/prokalsitonin verisi veya sepsis kliniği yoktur. Lökosit artışına trombositoz ve eritrositoz eşlik etmesi panmiyeloz paternini gösterir. JAK2 pozitifliği ve düşük EPO enfeksiyöz reaksiyondan çok klonal miyeloproliferatif süreci destekler. Antibiyotik tedavisi tromboz riskini veya yüksek hematokriti düzeltmez.",
          "Trombosit sayısı normale dönene kadar yüksek doz kortikosteroid vermek": "Kortikosteroidler immün trombositopeni, otoimmün hemoliz veya bazı inflamatuvar durumlarda kullanılabilir; ancak bu hastada trombosit düşük değil yüksektir. Trombosit artışı klonal miyeloproliferasyonun parçasıdır ve steroidle hedeflenmez. Steroid kullanımı hipertansiyon, glukoz bozukluğu ve enfeksiyon riskini artırabilir. Bu tabloda sitoredüksiyon, flebotomi ve aspirin esas tedavi stratejisidir."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Polisitemia verada hedef hematokrit <%45’tir. Yaş >60 veya tromboz öyküsü varsa hasta yüksek risklidir ve flebotomi/aspirine sitoredüktif tedavi eklenir.",
      "examPearl": "Aquajenik kaşıntı + plethore + düşük EPO + JAK2 pozitifliği: sekonder eritrositoz değil klonal miyeloproliferasyon düşün.",
      "whyCorrect": "Yaş ve TIA öyküsü yüksek riskli klonal eritrositoz tedavisinde hidroksiüre eklenmesini destekler.",
      "optionComparison": "Demir, antibiyotik, steroid veya yalnız antikoagülasyon temel patofizyolojiyi ve tromboz riskini uygun şekilde hedeflemez.",
      "evidenceChain": [
        "Sıcak duş sonrası kaşıntı ve plethorik görünüm → klonal eritrositozda mikrovasküler/mediatör ilişkili yakınmaları destekler.",
        "Hemoglobin/hematokrit yüksekliği + lökositoz + trombositoz → panmiyeloz paternidir.",
        "Düşük EPO ve JAK2 pozitifliği → sekonder hipoksik eritrositozdan ayrımı güçlendirir.",
        "Yaş 67 ve TIA öyküsü → yüksek tromboz riski nedeniyle sitoredüktif tedavi endikasyonudur."
      ],
      "whyWrong": {},
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v293",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V292 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v293-new-658-adet-duzensizligi-ve-sut-gelmesi",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Adet düzensizliği ve süt gelmesi",
      "difficulty": "Zor",
      "difficultyTag": "TUS+",
      "clinicalFocus": "Hiperprolaktinemi semptomları olan hastada gebelik, tiroid ve ilaç nedenlerini dışlayıp dopamin agonisti tedavisini seçme.",
      "learningTarget": "Prolaktin yüksekliği ve hipofiz lezyonu olan stabil hastada ilk basamak tedavinin genellikle kabergolin gibi dopamin agonisti olduğunu öğrenme.",
      "demographics": "29 yaşında kadın hasta",
      "setting": "Endokrinoloji polikliniği",
      "chiefComplaint": "Hasta, adetlerinin seyrekleşmesi ve memeden süt gelmesi nedeniyle başvuruyor.",
      "stem": "Hasta son sekiz aydır adetlerinin iki-üç ayda bir geldiğini ve son haftalarda sütyeninde beyaz akıntı lekeleri fark ettiğini anlatır. Baş ağrıları hafif ve aralıklıdır; görme alanında belirgin kayıp, çift görme veya ani şiddetli baş ağrısı tariflemez. Gebelik testi evde negatif çıkmıştır ve doğum yapmamıştır. Antipsikotik, metoklopramid veya opioid kullanmadığını söyler. Kilo alımı, belirgin üşüme veya kabızlık yakınması yoktur. Bu durum çocuk sahibi olma planı yaptığı için kendisini kaygılandırmıştır.",
      "patientIntro": {
        "profile": "29 yaşında kadın hasta, Endokrinoloji polikliniğinde değerlendiriliyor.",
        "presentation": "Hasta, adetlerinin seyrekleşmesi ve memeden süt gelmesi nedeniyle başvuruyor.",
        "historySummary": "Hasta son sekiz aydır adetlerinin iki-üç ayda bir geldiğini ve son haftalarda sütyeninde beyaz akıntı lekeleri fark ettiğini anlatır. Baş ağrıları hafif ve aralıklıdır; görme alanında belirgin kayıp, çift görme veya ani şiddetli baş ağrısı tariflemez. Gebelik testi evde negatif çıkmıştır ve doğum yapmamıştır. Antipsikotik, metoklopramid veya opioid kullanmadığını söyler. Kilo alımı, belirgin üşüme veya kabızlık yakınması yoktur. Bu durum çocuk sahibi olma planı yaptığı için kendisini kaygılandırmıştır."
      },
      "vitals": {
        "TA": "112/70 mmHg",
        "Nabız": "78/dk, düzenli",
        "Solunum": "15/dk",
        "SpO2": "%99, oda havasında",
        "Ateş": "36.6 °C",
        "Şok indeksi": "0.70; kapiller dolum <2 sn, perfüzyon iyi"
      },
      "exam": [
        "Genel durumu iyi, bilinç açık ve oryante.",
        "Meme muayenesinde spontan olmayan bilateral süt benzeri akıntı gözleniyor, kitle palpe edilmiyor.",
        "Görme alanı kaba konfrontasyon muayenesinde doğal.",
        "Tiroid muayenesinde guatr veya hassasiyet yok."
      ],
      "investigations": [
        {
          "id": "v293-new-658-adet-duzensizligi-ve-sut-gelmesi-hormon",
          "label": "Gebelik, tiroid ve prolaktin değerlendirmesi",
          "title": "Gebelik, tiroid ve prolaktin değerlendirmesi",
          "type": "laboratory",
          "priority": "essential",
          "subtype": "Endokrinoloji",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Gebelik, belirgin hipotiroidi ve böbrek yetmezliği hiperprolaktinemiyi açıklamıyor.",
          "clinicalMeaning": "Gebelik, belirgin hipotiroidi ve böbrek yetmezliği hiperprolaktinemiyi açıklamıyor.",
          "result": {
            "title": "Gebelik, tiroid ve prolaktin değerlendirmesi",
            "summary": "Gebelik, belirgin hipotiroidi ve böbrek yetmezliği hiperprolaktinemiyi açıklamıyor.",
            "interpretation": "Gebelik, belirgin hipotiroidi ve böbrek yetmezliği hiperprolaktinemiyi açıklamıyor.",
            "values": [
              [
                "β-hCG",
                "Negatif",
                "Negatif",
                "Gebelik yok"
              ],
              [
                "Prolaktin",
                "184 ng/mL",
                "<25 ng/mL",
                "Belirgin yüksek"
              ],
              [
                "TSH",
                "1.7 mIU/L",
                "0.4-4.0 mIU/L",
                "Normal"
              ],
              [
                "Serbest T4",
                "1.1 ng/dL",
                "0.8-1.8 ng/dL",
                "Normal"
              ],
              [
                "Kreatinin",
                "0.72 mg/dL",
                "0.5-1.1 mg/dL",
                "Normal"
              ]
            ],
            "rows": [
              [
                "β-hCG",
                "Negatif",
                "Negatif",
                "Gebelik yok"
              ],
              [
                "Prolaktin",
                "184 ng/mL",
                "<25 ng/mL",
                "Belirgin yüksek"
              ],
              [
                "TSH",
                "1.7 mIU/L",
                "0.4-4.0 mIU/L",
                "Normal"
              ],
              [
                "Serbest T4",
                "1.1 ng/dL",
                "0.8-1.8 ng/dL",
                "Normal"
              ],
              [
                "Kreatinin",
                "0.72 mg/dL",
                "0.5-1.1 mg/dL",
                "Normal"
              ]
            ]
          }
        },
        {
          "id": "v293-new-658-adet-duzensizligi-ve-sut-gelmesi-mr",
          "label": "Hipofiz MR",
          "title": "Hipofiz MR",
          "type": "imaging",
          "priority": "essential",
          "subtype": "Radyoloji",
          "category": "imaging",
          "testTypeCategory": "imaging",
          "summary": "Lezyon saptanmıştır ancak optik kiazma basısı veya akut apopleksi bulgusu yoktur.",
          "clinicalMeaning": "Lezyon saptanmıştır ancak optik kiazma basısı veya akut apopleksi bulgusu yoktur.",
          "result": {
            "title": "Hipofiz MR",
            "summary": "Lezyon saptanmıştır ancak optik kiazma basısı veya akut apopleksi bulgusu yoktur.",
            "interpretation": "Lezyon saptanmıştır ancak optik kiazma basısı veya akut apopleksi bulgusu yoktur.",
            "values": [
              [
                "Hipofiz lezyonu",
                "11 mm sağ lateral adenom ile uyumlu görünüm",
                "Kitle yok",
                "Makroadenom boyutunda"
              ],
              [
                "Optik kiazma basısı",
                "Yok",
                "Yok",
                "Acil bası bulgusu yok"
              ],
              [
                "Kavernöz sinüs invazyonu",
                "Yok",
                "Yok",
                "Yayılım izlenmiyor"
              ],
              [
                "Hemorrhaji/apopleksi",
                "Yok",
                "Yok",
                "Acil cerrahi bulgusu yok"
              ]
            ],
            "rows": [
              [
                "Hipofiz lezyonu",
                "11 mm sağ lateral adenom ile uyumlu görünüm",
                "Kitle yok",
                "Makroadenom boyutunda"
              ],
              [
                "Optik kiazma basısı",
                "Yok",
                "Yok",
                "Acil bası bulgusu yok"
              ],
              [
                "Kavernöz sinüs invazyonu",
                "Yok",
                "Yok",
                "Yayılım izlenmiyor"
              ],
              [
                "Hemorrhaji/apopleksi",
                "Yok",
                "Yok",
                "Acil cerrahi bulgusu yok"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hasta için en uygun ilk tedavi yaklaşımı aşağıdakilerden hangisidir?",
      "questionType": "Tedavi/izlem",
      "answerTarget": "Semptomatik hiperprolaktinemi tedavisi",
      "diagnosis": {
        "correct": "Kabergolin gibi dopamin agonisti başlamak ve prolaktin ile tümör yanıtını izlemek",
        "options": [
          "Acil transsfenoidal cerrahi planlamak",
          "Levotiroksin başlayıp prolaktin kontrolünü ertelemek",
          "Kabergolin gibi dopamin agonisti başlamak ve prolaktin ile tümör yanıtını izlemek",
          "Yalnız kombine oral kontraseptif verip hipofiz görüntülemesini önemsiz kabul etmek",
          "Geniş spektrumlu antibiyotik başlayıp hipofiz apsesi gibi izlemek"
        ],
        "question": "Bu hasta için en uygun ilk tedavi yaklaşımı aşağıdakilerden hangisidir?",
        "explanation": "Hastada oligomenore, galaktore, belirgin prolaktin yüksekliği ve hipofiz MR’da küçük makroadenom boyutunda lezyon vardır. Gebelik, hipotiroidi, böbrek yetmezliği ve ilaç kullanımı öykü/laboratuvarla dışlanmıştır. Optik kiazma basısı veya apopleksi bulgusu olmadığından ilk basamak tedavi dopamin agonistidir; kabergolin prolaktini düşürür, gonadal aksı düzeltebilir ve tümör boyutunu küçültebilir.",
        "pearls": [
          "Hiperprolaktinemide gebelik, hipotiroidi, ilaçlar ve böbrek yetmezliği dışlanmalıdır.",
          "Stabil prolaktinomada ilk tedavi dopamin agonistidir.",
          "Acil cerrahi genellikle apopleksi, ciddi/progresif görme kaybı veya ilaç yanıtsızlığı gibi durumlarda düşünülür."
        ],
        "optionFeedback": {
          "Acil transsfenoidal cerrahi planlamak": "Cerrahi, prolaktinomalarda bazı durumlarda gerekli olabilir; özellikle dopamin agonistine direnç veya intolerans, progresif görme kaybı, apopleksi ya da acil bası bulguları varsa düşünülür. Bu hastada optik kiazma basısı, görme alanı kaybı veya apopleksi bulgusu verilmemiştir. Prolaktin belirgin yüksek ve klinik stabil olduğundan ilk yaklaşım medikal tedavidir. Cerrahiyi ilk basamak yapmak gereksiz invaziv ve tedavi sıralaması açısından hatalıdır.",
          "Levotiroksin başlayıp prolaktin kontrolünü ertelemek": "Primer hipotiroidide TRH artışı prolaktini yükseltebilir ve levotiroksin tedavisi prolaktini düzeltebilir. Ancak bu hastanın TSH ve serbest T4 değerleri normaldir; hipotiroidiye ait belirgin klinik bulgu da yoktur. Bu nedenle levotiroksin başlanması hem gereksizdir hem de gerçek hiperprolaktinemi nedeninin tedavisini geciktirir. Hipotiroidi dışlandıktan sonra prolaktin yüksekliği hipofiz lezyonuyla birlikte ele alınmalıdır.",
          "Kabergolin gibi dopamin agonisti başlamak ve prolaktin ile tümör yanıtını izlemek": "Bu seçenek en uygundur. Oligomenore ve galaktore semptomları, prolaktin yüksekliği ve hipofiz MR’da lezyon varlığı semptomatik prolaktin salgılayan adenom paternini oluşturur. Kabergolin dopamin D2 reseptör etkisiyle prolaktin sekresyonunu baskılar, adet düzenini ve fertiliteyi düzeltebilir, çoğu hastada tümör boyutunu küçültür. Tedavi sırasında prolaktin düzeyi, semptomlar ve gerektiğinde MR ile tümör yanıtı izlenmelidir.",
          "Yalnız kombine oral kontraseptif verip hipofiz görüntülemesini önemsiz kabul etmek": "Oral kontraseptifler bazı adet düzensizliklerinde siklus kontrolü sağlayabilir; ancak bu hastada adet düzensizliği hiperprolaktinemi ve hipofiz lezyonu ile ilişkilidir. Yalnız semptomu maskelemek prolaktin yüksekliğini ve tümör biyolojisini tedavi etmez. Ayrıca hasta çocuk sahibi olmayı planladığını belirtmiştir; gonadal aksı düzeltmek ve prolaktini düşürmek daha hedefe yöneliktir. Hipofiz lezyonunu önemsiz kabul etmek doğru değildir.",
          "Geniş spektrumlu antibiyotik başlayıp hipofiz apsesi gibi izlemek": "Hipofiz apsesi nadirdir ve genellikle ateş, baş ağrısı, meningeal bulgular, görme bozukluğu veya sistemik enfeksiyon bulgularıyla gündeme gelir. Bu hastada ateş yok, inflamatuvar/invaziv süreç bulgusu verilmemiş ve MR bulgusu adenomla uyumludur. Antibiyotik prolaktin yüksekliğini veya galaktore-oligomenoreyi düzeltmez. Bu seçenek enfeksiyon odaklı ama vaka verileriyle desteklenmeyen bir yaklaşımdır."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Prolaktin yüksekliği değerlendirilirken gebelik, hipotiroidi, ilaçlar ve böbrek yetmezliği dışlanır. Stabil prolaktinomada dopamin agonisti birinci basamaktır.",
      "examPearl": "Galaktore + oligomenore + çok yüksek prolaktin: önce sekonder nedenleri dışla, stabil lezyonda kabergolin düşün.",
      "whyCorrect": "Gebelik, tiroid ve ilaç nedenleri dışlandıktan sonra semptomatik prolaktin yüksekliği ve bası bulgusu olmayan hipofiz lezyonu dopamin agonisti tedaviye uygundur.",
      "optionComparison": "Cerrahi acil bası/apopleksi veya ilaç yanıtsızlığında; levotiroksin hipotiroidide; antibiyotik enfeksiyonda; oral kontraseptif ise bu temel mekanizmayı tedavi etmez.",
      "evidenceChain": [
        "Oligomenore ve galaktore → prolaktin fazlalığının klinik etkisini gösterir.",
        "Prolaktin 184 ng/mL → belirgin hiperprolaktinemi vardır.",
        "β-hCG, TSH, serbest T4 ve kreatinin normal → sık sekonder nedenler dışlanmıştır.",
        "MR’da 11 mm lezyon ve kiazma basısı yok → stabil prolaktinoma için medikal tedavi ön plandadır."
      ],
      "whyWrong": {},
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v293",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V292 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v294-new-659-yirtilir-tarzda-agri-ve-kol-basinc-farki",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Yırtılır tarzda ağrı ve kol basınç farkı",
      "difficulty": "Zor",
      "difficultyTag": "TUS düzeyi",
      "clinicalFocus": "Ani başlayan göğüs-sırt ağrısı, nabız/basınç asimetrisi ve kontrastlı BT bulgusunu birlikte yorumlayarak acil aort sendromunda doğru medikal önceliği seçme.",
      "learningTarget": "Aort duvar stresini azaltmada beta-blokerin vazodilatörden önce geldiğini ve çıkan aorta tutulumu varsa cerrahi ekip uyarısının geciktirilmemesi gerektiğini ayırt edebilme.",
      "demographics": "61 yaşında erkek hasta",
      "setting": "Acil servis",
      "chiefComplaint": "Hasta, ani başlayan göğüs ve sırt ağrısı nedeniyle acil serviste değerlendiriliyor.",
      "stem": "Hasta sabah evden çıkmaya hazırlanırken göğsünün ortasında aniden başlayan, kısa sürede iki kürek kemiği arasına yayılan çok şiddetli bir ağrı hissettiğini anlatır. Ağrıyı daha önceki reflü yakınmalarına benzetmediğini, oturmakla ya da antasit almakla belirgin rahatlamadığını söyler. Uzun süredir hipertansiyonu vardır; son haftalarda ilaçlarını düzensiz kullandığını ve o sabah tansiyonunun yüksek olduğunu fark ettiğini belirtir. Ağrı başladıktan sonra terlemiş, sol kolunda güçsüzlük değil ama soğukluk hissi olduğunu söylemiştir. Ateş, öksürük, travma, kanlı balgam veya yakın zamanda uzun yolculuk öyküsü yoktur.",
      "patientIntro": {
        "profile": "61 yaşında erkek hasta, acil servis başvurusu sonrası değerlendiriliyor.",
        "presentation": "Hasta, ani başlayan göğüs ve sırt ağrısı nedeniyle acil serviste değerlendiriliyor.",
        "historySummary": "Hasta sabah evden çıkmaya hazırlanırken göğsünün ortasında aniden başlayan, kısa sürede iki kürek kemiği arasına yayılan çok şiddetli bir ağrı hissettiğini anlatır. Ağrıyı daha önceki reflü yakınmalarına benzetmediğini, oturmakla ya da antasit almakla belirgin rahatlamadığını söyler. Uzun süredir hipertansiyonu vardır; son haftalarda ilaçlarını düzensiz kullandığını ve o sabah tansiyonunun yüksek olduğunu fark ettiğini belirtir. Ağrı başladıktan sonra terlemiş, sol kolunda güçsüzlük değil ama soğukluk hissi olduğunu söylemiştir. Ateş, öksürük, travma, kanlı balgam veya yakın zamanda uzun yolculuk öyküsü yoktur."
      },
      "vitals": {
        "TA": "Sağ kol 198/104 mmHg, sol kol 164/92 mmHg",
        "Nabız": "112/dk",
        "Solunum": "22/dk",
        "SpO2": "%96, oda havasında",
        "Ateş": "36.8 °C",
        "Şok indeksi": "0.57 - perfüzyon şimdilik korunmuş"
      },
      "exam": [
        "Hasta ağrılı ve terli görünümdedir; sorulara kooperatif yanıt verir.",
        "Sağ radial nabız sola göre daha dolgun alınır; kapiller dolum sağ elde 2 saniye, sol elde yaklaşık 3 saniyedir.",
        "Akciğer oskültasyonunda belirgin ral veya wheezing yoktur.",
        "Kalp oskültasyonunda sol sternal kenarda hafif erken diyastolik üfürüm duyulur; fokal nörolojik defisit saptanmaz."
      ],
      "investigations": [
        {
          "id": "v294-new-659-yirtilir-tarzda-agri-ve-kol-basinc-farki-vital-basinc-farki",
          "label": "Hedefe yönelik vital ve periferik nabız değerlendirmesi",
          "title": "Hedefe yönelik vital ve periferik nabız değerlendirmesi",
          "orderLabel": "Hedefe yönelik vital ve periferik nabız değerlendirmesi",
          "type": "clinical",
          "priority": "essential",
          "subtype": "Hedefe yönelik vital ve periferik nabız değerlendirmesi",
          "category": "clinicalAssessment",
          "testTypeCategory": "clinicalAssessment",
          "summary": "İki üst ekstremite arasında belirgin basınç farkı ve nabız asimetrisi vardır; bu bulgu akut vasküler acil olasılığını yükseltir.",
          "clinicalMeaning": "İki üst ekstremite arasında belirgin basınç farkı ve nabız asimetrisi vardır; bu bulgu akut vasküler acil olasılığını yükseltir.",
          "result": {
            "title": "Hedefe yönelik vital ve periferik nabız değerlendirmesi",
            "summary": "İki üst ekstremite arasında belirgin basınç farkı ve nabız asimetrisi vardır; bu bulgu akut vasküler acil olasılığını yükseltir.",
            "interpretation": "İki üst ekstremite arasında belirgin basınç farkı ve nabız asimetrisi vardır; bu bulgu akut vasküler acil olasılığını yükseltir.",
            "values": [
              [
                "Sağ kol kan basıncı",
                "198/104 mmHg",
                "",
                "Belirgin hipertansiyon"
              ],
              [
                "Sol kol kan basıncı",
                "164/92 mmHg",
                "",
                "İki kol arasında >20 mmHg sistolik fark"
              ],
              [
                "Radial nabız",
                "Sağ daha dolgun, sol zayıf",
                "",
                "Periferik akım asimetrisi"
              ],
              [
                "Nörolojik muayene",
                "Fokal defisit yok",
                "",
                "Eşlik eden belirgin nörolojik kayıp saptanmadı"
              ]
            ]
          }
        },
        {
          "id": "v294-new-659-yirtilir-tarzda-agri-ve-kol-basinc-farki-ekg-ve-kardiyak-belirtecler",
          "label": "EKG ve kardiyak belirteçler",
          "title": "EKG ve kardiyak belirteçler",
          "orderLabel": "EKG ve kardiyak belirteçler",
          "type": "cardiology",
          "priority": "essential",
          "subtype": "EKG ve kardiyak belirteçler",
          "category": "cardiacTest",
          "testTypeCategory": "cardiacTest",
          "summary": "EKG transmural koroner oklüzyon lehine değildir; kardiyak belirteç sınırda olduğundan ağrının tek başına koroner sendrom gibi yönetilmesi güvenli değildir.",
          "clinicalMeaning": "EKG transmural koroner oklüzyon lehine değildir; kardiyak belirteç sınırda olduğundan ağrının tek başına koroner sendrom gibi yönetilmesi güvenli değildir.",
          "result": {
            "title": "EKG ve kardiyak belirteçler",
            "summary": "EKG transmural koroner oklüzyon lehine değildir; kardiyak belirteç sınırda olduğundan ağrının tek başına koroner sendrom gibi yönetilmesi güvenli değildir.",
            "interpretation": "EKG transmural koroner oklüzyon lehine değildir; kardiyak belirteç sınırda olduğundan ağrının tek başına koroner sendrom gibi yönetilmesi güvenli değildir.",
            "values": [
              [
                "EKG",
                "Sinüs taşikardisi; yaygın ST elevasyonu veya yeni sol dal bloğu yok",
                "",
                "STEMI paterni yok"
              ],
              [
                "Troponin T",
                "18 ng/L",
                "<14 ng/L",
                "Sınırda/mild yüksek"
              ],
              [
                "CK-MB",
                "4.2 ng/mL",
                "<5 ng/mL",
                "Belirgin yüksek değil"
              ]
            ]
          }
        },
        {
          "id": "v294-new-659-yirtilir-tarzda-agri-ve-kol-basinc-farki-bt-anjiyografi",
          "label": "Kontrastlı toraks BT anjiyografi",
          "title": "Kontrastlı toraks BT anjiyografi",
          "orderLabel": "Kontrastlı toraks BT anjiyografi",
          "type": "imaging",
          "priority": "critical",
          "subtype": "Kontrastlı toraks BT anjiyografi",
          "category": "imaging",
          "testTypeCategory": "imaging",
          "summary": "Çıkan aortadan arkus düzeyine uzanan intimal ayrılma ve gerçek-yalancı lümen görünümü saptanmıştır; perikardiyal efüzyon izlenmemiştir.",
          "clinicalMeaning": "Çıkan aortadan arkus düzeyine uzanan intimal ayrılma ve gerçek-yalancı lümen görünümü saptanmıştır; perikardiyal efüzyon izlenmemiştir.",
          "result": {
            "title": "Kontrastlı toraks BT anjiyografi",
            "summary": "Çıkan aortadan arkus düzeyine uzanan intimal ayrılma ve gerçek-yalancı lümen görünümü saptanmıştır; perikardiyal efüzyon izlenmemiştir.",
            "interpretation": "Çıkan aortadan arkus düzeyine uzanan intimal ayrılma ve gerçek-yalancı lümen görünümü saptanmıştır; perikardiyal efüzyon izlenmemiştir.",
            "values": [
              [
                "Çıkan aorta çapı",
                "46 mm",
                "<40 mm",
                "Genişleme"
              ],
              [
                "Aort lümeni",
                "Gerçek ve yalancı lümen ayrımı izleniyor",
                "",
                "Akut aort duvar patolojisi"
              ],
              [
                "Tutulum düzeyi",
                "Çıkan aorta ve arkus proksimali",
                "",
                "Cerrahi acil bölge"
              ],
              [
                "Perikard",
                "Belirgin efüzyon yok",
                "",
                "Tamponad bulgusu yok"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada acil yönetimde öncelikli medikal basamak aşağıdakilerden hangisidir?",
      "questionType": "Acil yaklaşım",
      "answerTarget": "Acil aort sendromunda ilk medikal hedef",
      "diagnosis": {
        "correct": "İntravenöz beta-bloker ile kalp hızını ve dP/dt etkisini azaltıp cerrahi ekibi uyarmak",
        "options": [
          "Sadece sublingual nitrat verip ağrı azalırsa taburculuk planlamak",
          "Heparin bolusu ve çift antiplatelet tedaviyi gecikmeden başlamak",
          "Sistolik basıncı düşürmek için önce nitroprussid infüzyonu başlamak",
          "İntravenöz beta-bloker ile kalp hızını ve dP/dt etkisini azaltıp cerrahi ekibi uyarmak",
          "Trombolitik tedavi verip koroner oklüzyon olasılığını öncelemek"
        ],
        "question": "Bu hastada acil yönetimde öncelikli medikal basamak aşağıdakilerden hangisidir?",
        "explanation": "Ani başlayan sırta yayılan şiddetli ağrı, iki kol arasında belirgin basınç farkı, nabız asimetrisi ve çıkan aortayı içeren BT bulgusu acil aort sendromu yönetimini gerektirir. İlk medikal basamak kalp hızını ve sol ventrikül kontraktilitesine bağlı aort duvar stresini azaltmaktır; bu nedenle intravenöz beta-bloker önceliklidir. Vazodilatör gerekirse beta-blokerden sonra eklenir ve çıkan aorta tutulumu nedeniyle cerrahi değerlendirme geciktirilmez.",
        "pearls": [
          "Aort duvar stresinde yalnız basınç değil, kalp hızı ve dP/dt de önemlidir.",
          "Vazodilatör beta-blokajdan önce verilirse refleks taşikardi oluşturabilir.",
          "Çıkan aorta tutulumu cerrahi acil kabul edilir."
        ],
        "optionFeedback": {
          "Sadece sublingual nitrat verip ağrı azalırsa taburculuk planlamak": "Nitrat, bazı iskemik göğüs ağrısı senaryolarında semptom azaltabilir; ancak bu hastada ağrının ani, yırtılır tarzda başlaması, sırta yayılması ve iki kol arasında belirgin kan basıncı farkı olması daha tehlikeli bir aort patolojisi akışını doğurur. Sadece sublingual nitrat vermek hem tanısal süreci geciktirir hem de aort duvar stresini kontrollü biçimde azaltmaz. Ağrının azalması bu acil vasküler durumu dışlamaz. Bu seçenek stabil angina mantığına kaydığı için vakadaki yüksek riskli verileri karşılamaz.",
          "Heparin bolusu ve çift antiplatelet tedaviyi gecikmeden başlamak": "Heparin ve çift antiplatelet tedavi akut koroner sendromda uygun olabilir; özellikle ST elevasyonlu miyokard infarktüsü veya yüksek riskli NSTEMI düşünüldüğünde gündeme gelir. Bu vakada EKG’de STEMI paterni yoktur; buna karşılık kol basınç farkı, nabız asimetrisi ve kontrastlı BT’de çıkan aortayı içeren intimal ayrılma bulgusu vardır. Antikoagülasyon/antiplatelet tedavi, cerrahi gerektiren aort duvar patolojisinde kanama ve rüptür riskini artırabilir. Bu nedenle koroner sendrom algoritmasını otomatik başlatmak doğru öncelik değildir.",
          "Sistolik basıncı düşürmek için önce nitroprussid infüzyonu başlamak": "Vazodilatörler aort duvarındaki basıncı azaltmak için gerekebilir; ancak refleks taşikardi ve kontraktilite artışı oluşturabilecekleri için tek başına ve beta-blokajdan önce verilmemelidir. Bu hastada nabız yüksek ve ağrı devam ederken önce kalp hızını ve sol ventrikül ejeksiyon hızını azaltmak gerekir. Nitroprussid ancak beta-bloker sonrası kan basıncı hâlâ hedefin üzerindeyse eklenebilir. İlk basamak olarak vazodilatör seçmek sıralama hatasıdır.",
          "İntravenöz beta-bloker ile kalp hızını ve dP/dt etkisini azaltıp cerrahi ekibi uyarmak": "Bu seçenek en uygundur. Ani başlayan sırta yayılan yırtılır tarzda ağrı, iki kol arasında belirgin kan basıncı farkı, nabız asimetrisi ve çıkan aortayı içeren intimal ayrılma bulgusu acil aort sendromu yönetimini gerektirir. İlk medikal hedef kalp hızını ve aort duvarına uygulanan dinamik kesme kuvvetini azaltmaktır; bu nedenle intravenöz esmolol veya labetalol gibi beta-blokerler önceliklidir. Çıkan aorta tutulumu cerrahi acil kabul edildiğinden eş zamanlı kardiyovasküler cerrahi ekibinin hazırlanması gerekir.",
          "Trombolitik tedavi verip koroner oklüzyon olasılığını öncelemek": "Trombolitik tedavi seçilmiş iskemik inme veya masif pulmoner emboli gibi durumlarda hayat kurtarıcı olabilir; ancak bu vakadaki ana problem trombotik damar tıkanıklığı değildir. Aort duvarında ayrılma varken trombolitik verilmesi ölümcül kanama, hemoperikardiyum veya rüptür riskini artırabilir. EKG’de transmural koroner oklüzyon bulgusu da verilmemiştir. Bu nedenle trombolitik tedavi hem hedef dışıdır hem de güvenlik açısından sakıncalıdır."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Akut aort sendromunda hedef; ağrıyı kontrol etmek, kalp hızını azaltmak, sistolik basıncı güvenli düzeye indirmek ve çıkan aorta tutulumu varsa cerrahi hazırlığı geciktirmemektir.",
      "examPearl": "Yırtılır tarzda ağrı + kol basınç farkı + nabız asimetrisi varsa önce aort acilini güvenli yönet; antikoagülan/trombolitik refleksinden kaçın.",
      "whyCorrect": "Doğru seçenek beta-blokajı öne alır; çünkü aort duvarındaki dinamik kesme kuvvetini azaltmadan yalnız vazodilatasyon yapmak güvenli değildir.",
      "optionComparison": "Nitrat, heparin veya trombolitik koroner/trombotik senaryolara aittir; nitroprussid ise gerekirse beta-bloker sonrası eklenir.",
      "evidenceChain": [
        "Ani, sırta yayılan çok şiddetli ağrı → akut vasküler ağrı karakteri.",
        "İki kol arasında sistolik basınç farkı ve nabız asimetrisi → büyük damar akım farklılığı.",
        "BT’de çıkan aorta tutulumu → cerrahi ekip uyarısı gerektiren acil bölge.",
        "Taşikardi ve hipertansiyon → ilk medikal hedef beta-bloker ile duvar stresini azaltmaktır."
      ],
      "whyWrong": {},
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v294",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V293 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    },
  {
      "id": "v294-new-660-kanli-kusma-ve-siyah-diskilama",
      "branchId": "internal-medicine",
      "caseType": "standard",
      "relatedBranch": "İç Hastalıkları",
      "title": "Kanlı kusma ve siyah dışkılama",
      "difficulty": "Zor",
      "difficultyTag": "TUS düzeyi",
      "clinicalFocus": "Sirozlu hastada akut üst gastrointestinal kanama paternini tanıyıp resüsitasyon, vazoaktif tedavi, antibiyotik profilaksisi ve endoskopik hemostazı birlikte seçme.",
      "learningTarget": "Portal hipertansiyon zeminli kanamada yalnız asit baskılamanın yeterli olmadığını; enfeksiyon profilaksisi ve erken endoskopik kontrolün tedavi paketinin parçası olduğunu ayırt edebilme.",
      "demographics": "54 yaşında erkek hasta",
      "setting": "Acil servis",
      "chiefComplaint": "Hasta, kanlı kusma ve koyu renkli dışkılama nedeniyle acil serviste değerlendiriliyor.",
      "stem": "Hasta gece yarısından sonra iki kez parlak kırmızı kan içerikli kusması olduğunu, sabah da dışkısının katran gibi koyulaştığını anlatır. Son birkaç gündür iştahının azaldığını ve karnında gerginlik hissettiğini söyler; ağrıdan çok halsizlik ve ayağa kalkınca baş dönmesi nedeniyle ambulans çağırmıştır. Uzun yıllar alkol kullandığını, daha önce karında sıvı birikmesi nedeniyle ilaç verildiğini ama kontrollerine düzenli gitmediğini belirtir. Aspirin veya antikoagülan kullanmadığını söyler; son günlerde ateş, şiddetli karın ağrısı veya travma tariflemez. Daha önce ara sıra mide yanması olsa da bu kadar yoğun kanama yaşamadığını ifade eder.",
      "patientIntro": {
        "profile": "54 yaşında erkek hasta, acil servis başvurusu sonrası değerlendiriliyor.",
        "presentation": "Hasta, kanlı kusma ve koyu renkli dışkılama nedeniyle acil serviste değerlendiriliyor.",
        "historySummary": "Hasta gece yarısından sonra iki kez parlak kırmızı kan içerikli kusması olduğunu, sabah da dışkısının katran gibi koyulaştığını anlatır. Son birkaç gündür iştahının azaldığını ve karnında gerginlik hissettiğini söyler; ağrıdan çok halsizlik ve ayağa kalkınca baş dönmesi nedeniyle ambulans çağırmıştır. Uzun yıllar alkol kullandığını, daha önce karında sıvı birikmesi nedeniyle ilaç verildiğini ama kontrollerine düzenli gitmediğini belirtir. Aspirin veya antikoagülan kullanmadığını söyler; son günlerde ateş, şiddetli karın ağrısı veya travma tariflemez. Daha önce ara sıra mide yanması olsa da bu kadar yoğun kanama yaşamadığını ifade eder."
      },
      "vitals": {
        "TA": "94/58 mmHg",
        "Nabız": "118/dk",
        "Solunum": "23/dk",
        "SpO2": "%95, oda havasında",
        "Ateş": "37.1 °C",
        "Şok indeksi": "1.26 - hipovolemi riski yüksek"
      },
      "exam": [
        "Hasta soluk, terli ve halsiz görünümdedir; bilinç açıktır.",
        "Skleralarda hafif ikter, karında belirgin asit ve abdominal kollateral damarlar izlenir.",
        "Rektal tuşede siyah, kötü kokulu dışkı bulaşı vardır.",
        "Defans veya rebound yoktur; ekstremiteler serin, kapiller dolum yaklaşık 3 saniyedir."
      ],
      "investigations": [
        {
          "id": "v294-new-660-kanli-kusma-ve-siyah-diskilama-tam-kan-ve-koagulasyon",
          "label": "Tam kan sayımı ve koagülasyon paneli",
          "title": "Tam kan sayımı ve koagülasyon paneli",
          "orderLabel": "Tam kan sayımı ve koagülasyon paneli",
          "type": "lab",
          "priority": "essential",
          "subtype": "Tam kan sayımı ve koagülasyon paneli",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Akut kan kaybı ve siroz zeminine eşlik eden trombositopeni/koagülasyon bozukluğu birlikte görülmektedir.",
          "clinicalMeaning": "Akut kan kaybı ve siroz zeminine eşlik eden trombositopeni/koagülasyon bozukluğu birlikte görülmektedir.",
          "result": {
            "title": "Tam kan sayımı ve koagülasyon paneli",
            "summary": "Akut kan kaybı ve siroz zeminine eşlik eden trombositopeni/koagülasyon bozukluğu birlikte görülmektedir.",
            "interpretation": "Akut kan kaybı ve siroz zeminine eşlik eden trombositopeni/koagülasyon bozukluğu birlikte görülmektedir.",
            "values": [
              [
                "Hemoglobin",
                "7.6 g/dL",
                "13.5-17.5 g/dL",
                "Belirgin düşük"
              ],
              [
                "Trombosit",
                "74.000/µL",
                "150.000-400.000/µL",
                "Düşük"
              ],
              [
                "INR",
                "1.8",
                "0.8-1.2",
                "Yüksek"
              ],
              [
                "Üre",
                "68 mg/dL",
                "17-43 mg/dL",
                "Üst GİS kanamada artabilir"
              ]
            ]
          }
        },
        {
          "id": "v294-new-660-kanli-kusma-ve-siyah-diskilama-karaciger-paneli",
          "label": "Karaciğer fonksiyon ve sentez göstergeleri",
          "title": "Karaciğer fonksiyon ve sentez göstergeleri",
          "orderLabel": "Karaciğer fonksiyon ve sentez göstergeleri",
          "type": "lab",
          "priority": "essential",
          "subtype": "Karaciğer fonksiyon ve sentez göstergeleri",
          "category": "laboratory",
          "testTypeCategory": "laboratory",
          "summary": "Kronik karaciğer hastalığı zeminini destekleyen sentetik fonksiyon bozukluğu ve hipoalbüminemi vardır.",
          "clinicalMeaning": "Kronik karaciğer hastalığı zeminini destekleyen sentetik fonksiyon bozukluğu ve hipoalbüminemi vardır.",
          "result": {
            "title": "Karaciğer fonksiyon ve sentez göstergeleri",
            "summary": "Kronik karaciğer hastalığı zeminini destekleyen sentetik fonksiyon bozukluğu ve hipoalbüminemi vardır.",
            "interpretation": "Kronik karaciğer hastalığı zeminini destekleyen sentetik fonksiyon bozukluğu ve hipoalbüminemi vardır.",
            "values": [
              [
                "Albumin",
                "2.6 g/dL",
                "3.5-5.2 g/dL",
                "Düşük"
              ],
              [
                "Total bilirubin",
                "2.4 mg/dL",
                "0.2-1.2 mg/dL",
                "Yüksek"
              ],
              [
                "AST/ALT",
                "78/42 U/L",
                "<40 U/L",
                "AST baskın hafif yükseklik"
              ],
              [
                "Sodyum",
                "132 mmol/L",
                "135-145 mmol/L",
                "Hafif düşük"
              ]
            ]
          }
        },
        {
          "id": "v294-new-660-kanli-kusma-ve-siyah-diskilama-batin-usg",
          "label": "Yatak başı batın ultrasonografisi",
          "title": "Yatak başı batın ultrasonografisi",
          "orderLabel": "Yatak başı batın ultrasonografisi",
          "type": "imaging",
          "priority": "supportive",
          "subtype": "Yatak başı batın ultrasonografisi",
          "category": "imaging",
          "testTypeCategory": "imaging",
          "summary": "Sirotik morfoloji, splenomegali ve orta miktarda asit izlenmektedir; safra yolu dilatasyonu tariflenmemiştir.",
          "clinicalMeaning": "Sirotik morfoloji, splenomegali ve orta miktarda asit izlenmektedir; safra yolu dilatasyonu tariflenmemiştir.",
          "result": {
            "title": "Yatak başı batın ultrasonografisi",
            "summary": "Sirotik morfoloji, splenomegali ve orta miktarda asit izlenmektedir; safra yolu dilatasyonu tariflenmemiştir.",
            "interpretation": "Sirotik morfoloji, splenomegali ve orta miktarda asit izlenmektedir; safra yolu dilatasyonu tariflenmemiştir.",
            "values": [
              [
                "Karaciğer",
                "Nodüler kontur ve heterojen parankim",
                "",
                "Kronik karaciğer hastalığı"
              ],
              [
                "Dalak",
                "15.8 cm",
                "<12 cm",
                "Splenomegali"
              ],
              [
                "Asit",
                "Orta miktarda serbest sıvı",
                "",
                "Portal hipertansiyonla uyumlu"
              ],
              [
                "Safra yolları",
                "Dilatasyon yok",
                "",
                "Kolanjit lehine değil"
              ]
            ]
          }
        }
      ],
      "useSyntheticInvestigationBank": true,
      "managementSequence": {
        "enabled": false
      },
      "hideExamSignal": true,
      "question": "Bu hastada ilk saatlerde en uygun bütüncül yaklaşım aşağıdakilerden hangisidir?",
      "questionType": "Acil yaklaşım",
      "answerTarget": "Sirozlu akut üst GİS kanamada erken yönetim paketi",
      "diagnosis": {
        "correct": "Damar yolu-resüsitasyonla birlikte oktreotid, seftriakson ve erken endoskopik bant ligasyonu planlamak",
        "options": [
          "Damar yolu-resüsitasyonla birlikte oktreotid, seftriakson ve erken endoskopik bant ligasyonu planlamak",
          "Sadece yüksek doz proton pompa inhibitörü verip antibiyotik ve vazoaktif tedaviyi ertelemek",
          "Nazogastrik lavaj temiz gelirse hastayı ayaktan oral demir tedavisiyle izlemek",
          "Trombolitik tedavi başlayıp pıhtı yükünü azaltmaya çalışmak",
          "Kanama durana kadar tüm sıvı ve kan ürünlerini kesip portal basıncın düşmesini beklemek"
        ],
        "question": "Bu hastada ilk saatlerde en uygun bütüncül yaklaşım aşağıdakilerden hangisidir?",
        "explanation": "Siroz öyküsü, asit, trombositopeni, INR yüksekliği, hematemez ve melena birlikte değerlendirildiğinde portal hipertansiyon zeminli akut üst GİS kanama olasılığı yüksektir. Yönetim yalnız asit baskılaması değildir; damar yolu ve kontrollü resüsitasyon, erken vazoaktif ajan, antibiyotik profilaksisi ve endoskopik hemostaz birlikte planlanmalıdır. Bu yaklaşım kanamayı durdurmanın yanında sirozlu hastada enfeksiyon, böbrek bozulması ve yeniden kanama riskini azaltır.",
        "pearls": [
          "Sirozlu akut kanamada enfeksiyon profilaksisi tedavinin aktif parçasıdır.",
          "Vazoaktif tedavi endoskopi beklenirken geciktirilmemelidir.",
          "Endoskopik bant ligasyonu kanama kontrolünde temel hemostaz basamağıdır."
        ],
        "optionFeedback": {
          "Damar yolu-resüsitasyonla birlikte oktreotid, seftriakson ve erken endoskopik bant ligasyonu planlamak": "Bu seçenek en uygundur. Siroz zemininde hematemez ve melena, hipotansiyon eğilimi, trombositopeni ve INR yüksekliği üst gastrointestinal kanamanın portal hipertansiyonla ilişkili olabileceğini güçlü biçimde destekler. Tedavide hemodinamik resüsitasyonla birlikte erken vazoaktif tedavi, bakteriyel enfeksiyon ve yeniden kanama riskini azaltmak için antibiyotik profilaksisi ve hemostaz için erken endoskopik bant ligasyonu birlikte düşünülür. Bu yaklaşım hem kanamayı hem de sirozlu hastaya özgü komplikasyon riskini hedefler.",
          "Sadece yüksek doz proton pompa inhibitörü verip antibiyotik ve vazoaktif tedaviyi ertelemek": "Proton pompa inhibitörü peptik ülser kanaması şüphesinde ve endoskopi öncesi bazı üst GİS kanamalarında kullanılabilir; ancak bu vakada siroz, splenomegali/trombositopeni, düşük albümin ve portal hipertansiyon ipuçları vardır. Yalnız PPI vermek portal basınca bağlı kanama fizyolojisini azaltmaz ve sirozlu akut kanamada önerilen antibiyotik profilaksisini karşılamaz. Vazoaktif tedaviyi ertelemek erken kanama kontrolünü zayıflatır. Bu seçenek peptik ülser mantığına aşırı daralır.",
          "Nazogastrik lavaj temiz gelirse hastayı ayaktan oral demir tedavisiyle izlemek": "Nazogastrik değerlendirme bazı hastalarda kanamanın üst-alt ayrımına yardımcı olabilir; ancak temiz gelmesi aktif veya yakın dönem üst GİS kanamayı güvenle dışlamaz. Hastanın hematemez, melena, hemoglobin düşüklüğü ve hemodinamik etkilenmesi vardır; bu tablo ayaktan izlem veya oral demir tedavisiyle yönetilemez. Oral demir ancak stabil kronik eksiklikte gündeme gelir. Bu seçenek akut kanama ve siroz riskini tehlikeli biçimde hafife alır.",
          "Trombolitik tedavi başlayıp pıhtı yükünü azaltmaya çalışmak": "Trombolitik tedavi masif pulmoner emboli veya belirli iskemik inme senaryolarında kullanılabilir; ancak aktif gastrointestinal kanama varlığında ciddi kontrendikasyon oluşturur. Bu hastada problem pıhtı yükü değil, lümene kan kaybıdır. Trombolitik verilmesi kanamayı dramatik şekilde artırabilir. Bu nedenle seçenek hem mekanizma hem güvenlik açısından yanlıştır.",
          "Kanama durana kadar tüm sıvı ve kan ürünlerini kesip portal basıncın düşmesini beklemek": "Kontrollü transfüzyon stratejisi önemlidir; ancak bu, sıvı ve kan ürünlerini tamamen kesmek anlamına gelmez. Hipotansiyon eğilimi, taşikardi ve hemoglobin düşüklüğü olan hastada damar yolu, kristalloid, gerektiğinde eritrosit süspansiyonu ve hemodinamik izlem gerekir. Portal basıncı azaltmak için vazoaktif ilaç verilir; hastanın dolaşım desteği kesilmez. Beklemek hipovolemik şok ve organ hipoperfüzyonu riskini artırır."
        }
      },
      "shuffleOptions": false,
      "coreKnowledge": "Sirozlu hastada hematemez-melena varsa resüsitasyon, vazoaktif tedavi, antibiyotik profilaksisi ve erken endoskopi birlikte düşünülür.",
      "examPearl": "Varis kanaması sorusunda yalnız PPI seçeneğine atlama; siroz ipuçları varsa oktreotid/terlipressin + seftriakson + erken endoskopi paketini ara.",
      "whyCorrect": "Doğru seçenek hem dolaşımı destekler hem portal basınç ilişkili kanamayı ve siroza özgü enfeksiyon riskini hedefler.",
      "optionComparison": "PPI tek başına peptik ülser eksenine kayar; nazogastrik lavaj ve oral demir akut kanamayı karşılamaz; trombolitik ve beklemek tehlikelidir.",
      "evidenceChain": [
        "Hematemez ve melena → akut üst GİS kanama.",
        "Asit, splenomegali, trombositopeni ve INR yüksekliği → siroz/portal hipertansiyon zemini.",
        "TA 94/58 ve nabız 118/dk → erken dolaşım etkilenimi.",
        "Hb 7.6 g/dL → resüsitasyon ve endoskopik hemostaz gerektiren kan kaybı."
      ],
      "whyWrong": {},
      "preserveInvestigationOrder": true,
      "aiMeta": {
        "version": "v294",
        "source": "manual-render-safe-internal-medicine-expansion",
        "antiRepeatChecked": true,
        "schemaReference": "V280-V293 render-safe internal-medicine cases"
      },
      "findings": [],
      "images": []
    }
];
