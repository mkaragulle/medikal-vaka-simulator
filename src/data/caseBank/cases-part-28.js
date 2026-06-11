export const casesPart28 = [
{
    "id": "v303-new-708-garajda-bulunma-ve-derin-asidoz",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "Garajda bulunma ve derin asidoz",
    "difficulty": "Zor",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "Yüksek anyon açıklı metabolik asidoz, osmolal açıklık ve idrar kristallerini birlikte yorumlayarak antidot-diyaliz kararını verme.",
    "learningTarget": "Toksik alkol maruziyetinde fomepizol ve hemodiyaliz endikasyonlarını laboratuvar paterninden çıkarma.",
    "demographics": "46 yaşında erkek hasta",
    "setting": "Acil servis resüsitasyon alanı",
    "chiefComplaint": "Hasta, garajda dalgın halde bulunması ve hızlı soluk alıp vermesi nedeniyle ambulansla getiriliyor.",
    "stem": "Hasta yakınları onu garajda yerde oturur halde, yanında açık bir antifriz kabı ve bardağa dökülmüş tatlı kokulu bir sıvıyla bulduklarını anlatır. Son görülmesinden yaklaşık altı saat sonra konuşmaları anlamsızlaşmış, ayağa kalkmaya çalışırken sendelemiş ve birkaç kez kusmuştur. Bilinen diyabeti yoktur; ailesi son günlerde intihar düşüncesi ifade etmediğini fakat alkol kullanımının arttığını söyler. Göğüs ağrısı veya travma öyküsü net değildir; nöbet geçirdiği görülmemiştir. Acile gelirken solunumu derinleşmiş ve idrar çıkışı azalmıştır. Yakınları hangi miktarda sıvı içtiğini bilmemektedir.",
    "patientIntro": {
      "profile": "46 yaşında erkek hasta, Acil servis resüsitasyon alanı ortamında değerlendiriliyor.",
      "presentation": "Hasta, garajda dalgın halde bulunması ve hızlı soluk alıp vermesi nedeniyle ambulansla getiriliyor.",
      "historySummary": "Hasta yakınları onu garajda yerde oturur halde, yanında açık bir antifriz kabı ve bardağa dökülmüş tatlı kokulu bir sıvıyla bulduklarını anlatır. Son görülmesinden yaklaşık altı saat sonra konuşmaları anlamsızlaşmış, ayağa kalkmaya çalışırken sendelemiş ve birkaç kez kusmuştur. Bilinen diyabeti yoktur; ailesi son günlerde intihar düşüncesi ifade etmediğini fakat alkol kullanımının arttığını söyler. Göğüs ağrısı veya travma öyküsü net değildir; nöbet geçirdiği görülmemiştir. Acile gelirken solunumu derinleşmiş ve idrar çıkışı azalmıştır. Yakınları hangi miktarda sıvı içtiğini bilmemektedir."
    },
    "vitals": {
      "TA": "102/60 mmHg",
      "Nabız": "124/dk",
      "Solunum": "30/dk",
      "SpO2": "%97, oda havasında",
      "Ateş": "36.4 °C",
      "Şok indeksi": "1.22 - hipoperfüzyon riski ve taşikardi var"
    },
    "exam": [
      "Hasta konfüze, sorulara anlamsız yanıtlar veriyor; pupiller izokorik.",
      "Solunum derin ve hızlı; akciğer oskültasyonunda belirgin ral yok.",
      "Cilt soğuk ve terli, mukozalar kuru; kapiller dolum 3-4 saniye.",
      "Karında yaygın hassasiyet hafif, defans veya rebound yok."
    ],
    "investigations": [
      {
        "id": "v303-new-708-garajda-bulunma-ve-derin-asidoz-kan-gazi-kimya",
        "label": "Arter kan gazı ve temel biyokimya",
        "title": "Arter kan gazı ve temel biyokimya",
        "orderLabel": "Arter kan gazı ve temel biyokimya",
        "type": "lab",
        "priority": "essential",
        "subtype": "Arter kan gazı ve temel biyokimya",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Derin yüksek anyon açıklı metabolik asidoz ve böbrek etkilenimi vardır.",
        "clinicalMeaning": "Derin yüksek anyon açıklı metabolik asidoz ve böbrek etkilenimi vardır.",
        "result": {
          "title": "Arter kan gazı ve temel biyokimya",
          "summary": "Derin yüksek anyon açıklı metabolik asidoz ve böbrek etkilenimi vardır.",
          "interpretation": "Derin yüksek anyon açıklı metabolik asidoz ve böbrek etkilenimi vardır.",
          "values": [
            [
              "pH",
              "7.12",
              "7.35-7.45",
              "Derin asidemi"
            ],
            [
              "pCO2",
              "20 mmHg",
              "35-45 mmHg",
              "Solunumsal kompansasyon"
            ],
            [
              "Bikarbonat",
              "7 mmol/L",
              "22-26 mmol/L",
              "Çok düşük"
            ],
            [
              "Sodyum/Potasyum/Klor",
              "140/5.2/101 mmol/L",
              "135-145/3.5-5.1/98-107",
              "Anyon açığı yüksek"
            ],
            [
              "Anyon açığı",
              "37 mmol/L",
              "8-12 mmol/L",
              "Çok yüksek"
            ],
            [
              "Kreatinin",
              "2.3 mg/dL",
              "0.7-1.2 mg/dL",
              "Yüksek"
            ]
          ]
        }
      },
      {
        "id": "v303-new-708-garajda-bulunma-ve-derin-asidoz-osmolal-toksik",
        "label": "Osmolalite ve toksikoloji ön paneli",
        "title": "Osmolalite ve toksikoloji ön paneli",
        "orderLabel": "Osmolalite ve toksikoloji ön paneli",
        "type": "lab",
        "priority": "essential",
        "subtype": "Osmolalite ve toksikoloji ön paneli",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Osmolal açıklık belirgindir; yaygın alternatif nedenler desteklenmemektedir.",
        "clinicalMeaning": "Osmolal açıklık belirgindir; yaygın alternatif nedenler desteklenmemektedir.",
        "result": {
          "title": "Osmolalite ve toksikoloji ön paneli",
          "summary": "Osmolal açıklık belirgindir; yaygın alternatif nedenler desteklenmemektedir.",
          "interpretation": "Osmolal açıklık belirgindir; yaygın alternatif nedenler desteklenmemektedir.",
          "values": [
            [
              "Ölçülen serum osmolalitesi",
              "348 mOsm/kg",
              "275-295 mOsm/kg",
              "Yüksek"
            ],
            [
              "Hesaplanan osmolalite",
              "304 mOsm/kg",
              "275-295 mOsm/kg",
              "Fark yüksek"
            ],
            [
              "Osmolal açıklık",
              "44 mOsm/kg",
              "<10 mOsm/kg",
              "Çok yüksek"
            ],
            [
              "Laktat",
              "2.4 mmol/L",
              "<2 mmol/L",
              "Hafif yüksek"
            ],
            [
              "Serum ketonu",
              "Negatif",
              "Negatif",
              "Ketoasidoz lehine değil"
            ],
            [
              "Asetaminofen düzeyi",
              "Saptanmadı",
              "Saptanmaz",
              "Desteklemiyor"
            ]
          ]
        }
      },
      {
        "id": "v303-new-708-garajda-bulunma-ve-derin-asidoz-idrar-mikroskopi",
        "label": "İdrar mikroskopisi",
        "title": "İdrar mikroskopisi",
        "orderLabel": "İdrar mikroskopisi",
        "type": "lab",
        "priority": "important",
        "subtype": "İdrar mikroskopisi",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Kristal paterni metabolit ilişkili böbrek hasarını destekler.",
        "clinicalMeaning": "Kristal paterni metabolit ilişkili böbrek hasarını destekler.",
        "result": {
          "title": "İdrar mikroskopisi",
          "summary": "Kristal paterni metabolit ilişkili böbrek hasarını destekler.",
          "interpretation": "Kristal paterni metabolit ilişkili böbrek hasarını destekler.",
          "values": [
            [
              "İdrar pH",
              "5.5",
              "4.5-8.0",
              "Asidik"
            ],
            [
              "Kalsiyum oksalat kristalleri",
              "Çok sayıda zarf şeklinde kristal",
              "Yok/az",
              "Belirgin"
            ],
            [
              "Protein",
              "+",
              "Negatif",
              "Hafif proteinüri"
            ],
            [
              "Eritrosit",
              "5-8/hpf",
              "0-3/hpf",
              "Mikroskopik hematüri"
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
    "question": "Bu hastada acil yönetimde en uygun yaklaşım hangisidir?",
    "questionType": "acil tedavi",
    "answerTarget": "Toksik alkol maruziyetinde antidot ve hemodiyaliz kararı",
    "diagnosis": {
      "correct": "Fomepizol başlamak ve ağır asidemi/böbrek etkilenimi nedeniyle hemodiyaliz planlamak",
      "options": [
        "Yalnızca intravenöz bikarbonat verip toksik alkol sonucu çıkana kadar beklemek",
        "Aktif kömür uygulayıp taburculuk için serum etanol düzeyini beklemek",
        "İnsülin-dextroz ve kalsiyum glukonatla hiperkalemi protokolü uygulamak",
        "Fomepizol başlamak ve ağır asidemi/böbrek etkilenimi nedeniyle hemodiyaliz planlamak",
        "N-asetilsistein infüzyonu başlatıp karaciğer testlerini 24 saat sonra tekrarlamak"
      ],
      "question": "Bu hastada acil yönetimde en uygun yaklaşım hangisidir?",
      "explanation": "Bu hastada derin yüksek anyon açıklı metabolik asidoz, belirgin osmolal açıklık, kalsiyum oksalat kristalleri ve akut böbrek etkilenimi birlikte toksik alkol metabolizmasını düşündürür. Tedavi metabolit oluşumunu durdurmak için fomepizol ve ağır asidemi/böbrek etkileniminde hemodiyalizdir. Yalnız bikarbonat veya destek tedavisi, toksin/metabolit yükünü ortadan kaldırmaz.",
      "pearls": [
        "Osmolal açıklık erken toksik alkol yükünü, anyon açığı metabolit birikimini gösterir.",
        "Kalsiyum oksalat kristalleri etilen glikol metabolizması için ayırt ettirici destek sağlar.",
        "Fomepizol alkol dehidrogenazı inhibe eder.",
        "Ağır asidemi ve böbrek hasarında hemodiyaliz düşünülür."
      ],
      "optionFeedback": {
        "Yalnızca intravenöz bikarbonat verip toksik alkol sonucu çıkana kadar beklemek": "Bikarbonat ağır asidemide destekleyici olarak kullanılabilir; ancak tek başına toksik metabolit oluşumunu durdurmaz ve mevcut organ etkilenimini çözmez. Bu hastada yüksek anyon açıklı metabolik asidoz, yüksek osmolal açıklık, kalsiyum oksalat kristalleri ve kreatinin artışı birlikte toksik alkol metabolitleriyle ilişkili ağır tabloyu düşündürür. Sonucu beklemek, glikolat/oksalat birikimi ve böbrek hasarını ilerletebilir.",
        "Aktif kömür uygulayıp taburculuk için serum etanol düzeyini beklemek": "Aktif kömür birçok ilaç alımında erken dönemde yararlı olabilir; fakat etilen glikol ve metanol gibi küçük alkolleri klinik olarak anlamlı düzeyde bağlamaz. Serum etanol düzeyini beklemek de bu tablodaki ana toksik maruziyeti açıklamaz. Bilinç değişikliği, osmolal açıklık, anyon açığı ve oksalat kristalleri varken antidot ve ekstrakorporeal uzaklaştırma değerlendirilmelidir.",
        "İnsülin-dextroz ve kalsiyum glukonatla hiperkalemi protokolü uygulamak": "İnsülin-dextroz ve kalsiyum glukonat hiperkalemiye bağlı kardiyak membran stabilizasyonu ve potasyum hücre içine kaydırma için kullanılır. Bu hastada potasyum hafif yüksek olsa da ana sorun hiperkalemi krizi değil; derin metabolik asidoz, osmolal açıklık ve toksik metabolit yüküdür. Bu protokol tek başına toksik alkol metabolizmasını durdurmaz veya toksini uzaklaştırmaz.",
        "Fomepizol başlamak ve ağır asidemi/böbrek etkilenimi nedeniyle hemodiyaliz planlamak": "Bu seçenek en uygundur. Garajda tatlı kokulu sıvı yanında bulunma, yüksek anyon açıklı metabolik asidoz, yüksek osmolal açıklık, kalsiyum oksalat kristalleri ve akut böbrek etkilenimi etilen glikol maruziyetini güçlü biçimde destekler. Fomepizol alkol dehidrogenazı inhibe ederek toksik metabolit oluşumunu durdurur. pH 7.12, bikarbonat 7 mmol/L, anyon açığı çok yüksek ve kreatinin artmış olduğu için hemodiyaliz toksin/metabolit uzaklaştırma ve asit-baz düzeltimi açısından gereklidir.",
        "N-asetilsistein infüzyonu başlatıp karaciğer testlerini 24 saat sonra tekrarlamak": "N-asetilsistein asetaminofen toksisitesinde ve bazı ağır karaciğer yetmezliği senaryolarında kullanılır. Bu hastada transaminaz baskın karaciğer hasarı, asetaminofen alım öyküsü veya yüksek asetaminofen düzeyi verilmemiştir. Asit-baz ve idrar kristal paterni hepatotoksisite değil toksik alkol metabolitleriyle böbrek-asidoz eksenini düşündürür."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "Toksik alkol sorularında tek bir değere bakılmaz; osmolal açıklık, anyon açığı, asit-baz durumu, idrar kristalleri ve organ hasarı birlikte karar verdirir.",
    "examPearl": "TUS ipucu: Antifriz + osmolal gap + yüksek anion gap asidoz + kalsiyum oksalat kristali = fomepizol; ağır asidoz/AKI varsa hemodiyaliz.",
    "whyCorrect": "Fomepizol ve hemodiyaliz, bu hastadaki toksik metabolit oluşumu ve ağır asidoz-böbrek etkilenimi zincirini doğrudan hedefler.",
    "optionComparison": "Diğer seçenekler yalnız destek, aktif kömür, hiperkalemi protokolü veya asetaminofen eksenindedir; vakadaki osmolal/anyon açık ve kristal paterni bunlarla açıklanmaz.",
    "evidenceChain": [
      "pH 7.12 ve HCO3 7 mmol/L → yaşamı tehdit eden metabolik asidoz.",
      "Osmolal açıklık 44 mOsm/kg → küçük alkol/toksin yükü olasılığı.",
      "Anyon açığı 37 mmol/L → asidik metabolit birikimi.",
      "Kalsiyum oksalat kristalleri + kreatinin 2.3 → metabolit ilişkili böbrek hasarı desteği."
    ],
    "whyWrong": "Yanlış seçenekler aynı klinik bağlamda düşünülebilecek alternatif tanı veya yönetim yollarını temsil eder; ancak olgudaki öykü, vital bulgu ve objektif veri zinciri seçilen doğru hedefle daha güçlü ve güvenli biçimde örtüşür.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v303",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V302 render-safe internal-medicine cases with diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  },
{
    "id": "v304-new-709-parmaklarda-sikilasma-ve-efor-dispnesi",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "Parmaklarda sıkılaşma ve efor dispnesi",
    "difficulty": "Zor",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "Bağ dokusu hastalığı zemininde gelişen efor dispnesinde ekokardiyografi, DLCO ve sağ kalp yüklenmesini birlikte yorumlayarak hemodinamik doğrulama basamağını seçme.",
    "learningTarget": "Pulmoner vasküler hastalık şüphesinde ekokardiyografinin tarama, sağ kalp kateterizasyonunun tanısal doğrulama aracı olduğunu ayırt etme.",
    "demographics": "43 yaşında kadın hasta",
    "setting": "Göğüs hastalıkları-kardiyoloji ortak polikliniği",
    "chiefComplaint": "Hasta, son üç aydır merdiven çıkarken belirginleşen nefes darlığı ve çarpıntı hissi nedeniyle başvuruyor.",
    "stem": "Hasta son aylarda iki kat merdiveni dinlenmeden çıkamaz hale geldiğini ve eskiden rahat yürüdüğü yolda artık göğsünde baskı olmadan nefesinin kesildiğini anlatır. Soğukta parmaklarının önce beyazlaşıp sonra morardığını, son bir yıldır yüzüklerinin zor çıktığını ve parmak uçlarında gerginlik hissettiğini söyler. Kuru öksürüğü hafiftir; balgam, ateş veya yakın zamanda geçirilmiş alt solunum yolu enfeksiyonu tariflemez. Sigara kullanmamıştır ve bilinen astım atağı öyküsü yoktur. Bacaklarda belirgin şişlik fark etmemiştir ancak son haftalarda çabuk yorulma nedeniyle iş çıkışı yürüyüşlerini bırakmıştır. Göğüs ağrısı eforla baskın yakınması değildir ve bayılma yaşamamıştır.",
    "patientIntro": {
      "profile": "43 yaşında kadın hasta, Göğüs hastalıkları-kardiyoloji ortak polikliniği ortamında değerlendiriliyor.",
      "presentation": "Hasta, son üç aydır merdiven çıkarken belirginleşen nefes darlığı ve çarpıntı hissi nedeniyle başvuruyor.",
      "historySummary": "Hasta son aylarda iki kat merdiveni dinlenmeden çıkamaz hale geldiğini ve eskiden rahat yürüdüğü yolda artık göğsünde baskı olmadan nefesinin kesildiğini anlatır. Soğukta parmaklarının önce beyazlaşıp sonra morardığını, son bir yıldır yüzüklerinin zor çıktığını ve parmak uçlarında gerginlik hissettiğini söyler. Kuru öksürüğü hafiftir; balgam, ateş veya yakın zamanda geçirilmiş alt solunum yolu enfeksiyonu tariflemez. Sigara kullanmamıştır ve bilinen astım atağı öyküsü yoktur. Bacaklarda belirgin şişlik fark etmemiştir ancak son haftalarda çabuk yorulma nedeniyle iş çıkışı yürüyüşlerini bırakmıştır. Göğüs ağrısı eforla baskın yakınması değildir ve bayılma yaşamamıştır."
    },
    "vitals": {
      "TA": "118/72 mmHg",
      "Nabız": "96/dk",
      "Solunum": "22/dk",
      "SpO2": "%94, oda havasında",
      "Ateş": "36.7 °C",
      "Şok indeksi": "0.81 - belirgin şok yok, efor kapasitesi düşük"
    },
    "exam": [
      "Genel durum iyi; konuşurken hafif dispne gelişiyor.",
      "Akciğer oskültasyonunda bazallerde belirgin ince ral veya wheezing duyulmuyor.",
      "P2 belirgin, triküspit odakta hafif sistolik üfürüm var; juguler venöz dolgunluk istirahatte belirgin değil.",
      "Parmak derisinde sıkılaşma ve birkaç telenjiektazi görülüyor; pretibial belirgin ödem yok."
    ],
    "investigations": [
      {
        "id": "v304-new-709-parmaklarda-sikilasma-ve-efor-dispnesi-solunum-fonksiyon",
        "label": "Solunum fonksiyon testi ve difüzyon",
        "title": "Solunum fonksiyon testi ve difüzyon",
        "orderLabel": "Solunum fonksiyon testi ve difüzyon",
        "type": "lab",
        "priority": "essential",
        "subtype": "Solunum fonksiyon testi ve difüzyon",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Spirometri belirgin obstrüksiyon göstermemekte, difüzyon kapasitesi belirgin düşüktür.",
        "clinicalMeaning": "Spirometri belirgin obstrüksiyon göstermemekte, difüzyon kapasitesi belirgin düşüktür.",
        "result": {
          "title": "Solunum fonksiyon testi ve difüzyon",
          "summary": "Spirometri belirgin obstrüksiyon göstermemekte, difüzyon kapasitesi belirgin düşüktür.",
          "interpretation": "Spirometri belirgin obstrüksiyon göstermemekte, difüzyon kapasitesi belirgin düşüktür.",
          "values": [
            [
              "FVC",
              "%82 beklenen",
              "%80-120",
              "Korunmuş"
            ],
            [
              "FEV1/FVC",
              "0.81",
              ">0.70",
              "Obstrüksiyon yok"
            ],
            [
              "DLCO",
              "%36 beklenen",
              "%80-120",
              "Belirgin düşük"
            ],
            [
              "6 dakika yürüme testi",
              "360 m",
              "Yaş/cinsiyete göre değişir",
              "Azalmış efor kapasitesi"
            ]
          ]
        }
      },
      {
        "id": "v304-new-709-parmaklarda-sikilasma-ve-efor-dispnesi-eko",
        "label": "Transtorasik ekokardiyografi",
        "title": "Transtorasik ekokardiyografi",
        "orderLabel": "Transtorasik ekokardiyografi",
        "type": "imaging",
        "priority": "essential",
        "subtype": "Görüntüleme",
        "category": "imaging",
        "testTypeCategory": "imaging",
        "summary": "Ekokardiyografi sağ kalp yüklenmesini ve pulmoner basınç artışı olasılığını destekler.",
        "clinicalMeaning": "Ekokardiyografi sağ kalp yüklenmesini ve pulmoner basınç artışı olasılığını destekler.",
        "result": {
          "title": "Transtorasik ekokardiyografi",
          "summary": "Ekokardiyografi sağ kalp yüklenmesini ve pulmoner basınç artışı olasılığını destekler.",
          "interpretation": "Ekokardiyografi sağ kalp yüklenmesini ve pulmoner basınç artışı olasılığını destekler.",
          "values": [
            [
              "Sol ventrikül EF",
              "%62",
              "%55-70",
              "Korunmuş"
            ],
            [
              "Sağ ventrikül",
              "Hafif dilate",
              "Normal boyut",
              "Yüklenme bulgusu"
            ],
            [
              "Tahmini sistolik pulmoner arter basıncı",
              "68 mmHg",
              "<35 mmHg",
              "Yüksek"
            ],
            [
              "Triküspit yetersizlik jet hızı",
              "3.9 m/sn",
              "<2.8 m/sn",
              "Yüksek olasılık"
            ],
            [
              "Sol atriyum",
              "Normal genişlik",
              "Normal",
              "Sol taraf baskın değil"
            ]
          ]
        }
      },
      {
        "id": "v304-new-709-parmaklarda-sikilasma-ve-efor-dispnesi-hrbt",
        "label": "Yüksek çözünürlüklü toraks BT",
        "title": "Yüksek çözünürlüklü toraks BT",
        "orderLabel": "Yüksek çözünürlüklü toraks BT",
        "type": "imaging",
        "priority": "important",
        "subtype": "Görüntüleme",
        "category": "imaging",
        "testTypeCategory": "imaging",
        "summary": "Yaygın parankimal fibrozis baskın değildir; pulmoner arter çapı artmıştır.",
        "clinicalMeaning": "Yaygın parankimal fibrozis baskın değildir; pulmoner arter çapı artmıştır.",
        "result": {
          "title": "Yüksek çözünürlüklü toraks BT",
          "summary": "Yaygın parankimal fibrozis baskın değildir; pulmoner arter çapı artmıştır.",
          "interpretation": "Yaygın parankimal fibrozis baskın değildir; pulmoner arter çapı artmıştır.",
          "values": [
            [
              "Parankim",
              "Yaygın fibrozis yok",
              "-",
              "Parankimal yük düşük"
            ],
            [
              "Buzlu cam/konsolidasyon",
              "Yok",
              "Yok",
              "Aktif yaygın inflamasyon yok"
            ],
            [
              "Pulmoner arter çapı",
              "31 mm",
              "<29 mm",
              "Artmış"
            ],
            [
              "Plevral sıvı",
              "Yok",
              "Yok",
              "Efüzyon yok"
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
    "question": "Bu hastada tanısal doğrulamada belirleyici basamak hangisidir?",
    "questionType": "tanısal doğrulama",
    "answerTarget": "Pulmoner vasküler yüklenmede kesin hemodinamik doğrulama",
    "diagnosis": {
      "correct": "Sağ kalp kateterizasyonu ile pulmoner arter basıncı, wedge basıncı ve pulmoner vasküler direnci ölçmek",
      "options": [
        "Yüksek çözünürlüklü toraks BT ile fibrotik tutulum derecesini tek başına belirlemek",
        "Sağ kalp kateterizasyonu ile pulmoner arter basıncı, wedge basıncı ve pulmoner vasküler direnci ölçmek",
        "Koroner BT anjiyografi ile epikardiyal koroner darlığı dışlamak",
        "Bronkodilatörlü spirometriyle reversibilite varlığını temel karar noktası yapmak",
        "D-dimer negatifse ileri değerlendirmeyi sonlandırmak"
      ],
      "question": "Bu hastada tanısal doğrulamada belirleyici basamak hangisidir?",
      "explanation": "Bu hastada bağ dokusu hastalığı bulguları, efor dispnesi, belirgin düşük DLCO, sağ ventrikül yüklenmesi ve yüksek tahmini pulmoner arter basıncı birlikte pulmoner vasküler hastalık olasılığını artırır. Ekokardiyografi güçlü bir tarama bulgusu sağlar; ancak prekapiller/postkapiller ayrım ve tedavi planı için sağ kalp kateterizasyonu ile hemodinamik ölçüm gerekir.",
      "pearls": [
        "DLCO düşüklüğü parankimden bağımsız pulmoner vasküler yüklenmede belirgin olabilir.",
        "Ekokardiyografi olasılığı artırır fakat kesin hemodinamik tanı koymaz.",
        "Wedge basıncı ve PVR ölçümü sol kalp hastalığına bağlı basınç artışını ayırır."
      ],
      "optionFeedback": {
        "Yüksek çözünürlüklü toraks BT ile fibrotik tutulum derecesini tek başına belirlemek": "Yüksek çözünürlüklü toraks BT, interstisyel akciğer hastalığı ve fibrotik parankim tutulumunu değerlendirmek için değerlidir; özellikle skleroderma spektrumunda dispnenin akciğer parankimi kaynaklı olup olmadığını ayırmaya yardım eder. Ancak bu hastada FVC görece korunmuşken DLCO belirgin düşük, ekokardiyografide sağ kalp yüklenmesi ve tahmini sistolik pulmoner arter basıncı artışı vardır. BT’de yaygın fibrozis olmaması parankimal hastalığın ana açıklama olma olasılığını azaltır; hemodinamik tanıyı tek başına BT koymaz.",
        "Sağ kalp kateterizasyonu ile pulmoner arter basıncı, wedge basıncı ve pulmoner vasküler direnci ölçmek": "Bu seçenek en uygundur. Hastada Raynaud benzeri yakınmalar, parmaklarda sıkılaşma, efor dispnesi, belirgin düşük DLCO, sağ ventrikül genişlemesi ve yüksek tahmini pulmoner arter basıncı birlikte pulmoner vasküler yüklenmeyi güçlü biçimde düşündürür. Ekokardiyografi tarama ve olasılık belirleme aracıdır; kesin hemodinamik ayrım için sağ kalp kateterizasyonunda ortalama pulmoner arter basıncı, pulmoner kapiller wedge basıncı ve pulmoner vasküler direnç ölçülmelidir. Bu ayrım, prekapiller pulmoner vasküler hastalığı sol kalp hastalığına bağlı basınç artışından ayırdığı için tedavi kararını doğrudan değiştirir.",
        "Koroner BT anjiyografi ile epikardiyal koroner darlığı dışlamak": "Koroner BT anjiyografi, atipik göğüs ağrısı veya koroner arter hastalığı olasılığı bulunan stabil hastalarda seçilmiş durumlarda yararlı olabilir. Bu olguda ana sorun eforla artan nefes darlığı, sağ kalp yüklenmesi ve difüzyon kapasitesinde belirgin azalmadır; troponin normal, sol ventrikül sistolik fonksiyonu korunmuş ve tipik iskemik göğüs ağrısı yoktur. Koroner görüntüleme pulmoner hemodinamik problemi doğrulamaz.",
        "Bronkodilatörlü spirometriyle reversibilite varlığını temel karar noktası yapmak": "Bronkodilatörlü spirometri astım veya KOAH gibi obstrüktif hava yolu hastalıklarını değerlendirmek için uygundur. Ancak hastada wheezing yok, FEV1/FVC oranı obstrüksiyon lehine değil ve DLCO düşüklüğü sağ kalp yüklenmesiyle birlikte verilmiştir. Reversibilite testi bu klinik zincirin merkezindeki pulmoner vasküler basınç/direnç sorununu doğrulayamaz.",
        "D-dimer negatifse ileri değerlendirmeyi sonlandırmak": "D-dimer düşük olduğunda düşük-orta klinik olasılıklı akut pulmoner emboliyi dışlamada yararlı olabilir; fakat kronik efor dispnesi ve sağ kalp yüklenmesi olan bu tabloda değerlendirmeyi sonlandırmak güvenli değildir. Ayrıca sistemik bağ dokusu hastalığı bulguları, düşük DLCO ve ekokardiyografik sağ kalp bulguları akut emboli dışı pulmoner vasküler hastalık olasılığını gündeme getirir. D-dimer hemodinamik sınıflama sağlamaz."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "Pulmoner hipertansiyon şüphesinde ekokardiyografi tarama/olasılık belirleme aracıdır; sağ kalp kateterizasyonu tanısal hemodinamik doğrulama sağlar.",
    "examPearl": "TUS ipucu: Skleroderma bulguları + efor dispnesi + düşük DLCO + yüksek ekokardiyografik pulmoner basınç → sağ kalp kateterizasyonu ile doğrula.",
    "whyCorrect": "Doğru seçenek, olgudaki sağ kalp yüklenmesini ölçülebilir hemodinamiye çeviren tek seçenektir.",
    "optionComparison": "Diğer seçenekler parankim, koroner hastalık, obstrüksiyon veya akut emboli dışlama eksenindedir; bu olguda temel karar prekapiller hemodinamik doğrulamadır.",
    "evidenceChain": [
      "Raynaud ve parmak sıkılaşması → bağ dokusu hastalığı zeminini destekler.",
      "DLCO %36 ve FVC %82 → parankim korunurken difüzyon ciddi bozulmuştur.",
      "EKO’da RV dilatasyonu ve tahmini sPAB 68 mmHg → sağ kalp basınç yüklenmesi olasılığı yüksektir.",
      "HRBT’de yaygın fibrozis olmaması → dispnenin yalnız interstisyel fibrozisle açıklanmasını zayıflatır."
    ],
    "whyWrong": "Yanlış seçenekler aynı klinik bağlamda akla gelebilecek alternatif tanı, mekanizma veya yönetim yollarını temsil eder; ancak olgudaki öykü, muayene ve objektif veri zinciri seçilen doğru hedefle daha güçlü ve güvenli biçimde örtüşür.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v304",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V303 render-safe internal-medicine cases with diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  },
{
    "id": "v304-new-710-mor-catlaklar-ve-direnc-tansiyon",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "Mor çatlaklar ve dirençli tansiyon",
    "difficulty": "Zor",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "Progresif cushingoid bulgular, hipertansiyon, hiperglisemi ve hipokalemide tarama testlerini doğru yorumlayarak endojen glukokortikoid fazlalığını tanıma.",
    "learningTarget": "Cushing sendromu şüphesinde gece kortizol ritmi, 1 mg deksametazon baskılama testi ve ACTH yorumunu ayırma.",
    "demographics": "38 yaşında kadın hasta",
    "setting": "Endokrinoloji polikliniği",
    "chiefComplaint": "Hasta, son bir yılda kilo artışı, morarma ve kontrol altına alınamayan tansiyon nedeniyle başvuruyor.",
    "stem": "Hasta son bir yılda özellikle gövdesinden kilo aldığını, yüzünün yuvarlaklaştığını ve daha önce kullanmadığı kıyafetlerin bel bölgesinden dar geldiğini anlatır. Karın ve uyluklarında geniş mor çatlaklar fark etmiş; küçük çarpmalarla kollarında morluklar oluşmaya başlamıştır. Merdiven çıkarken bacaklarında güçsüzlük hissettiğini, saçlarını tararken kollarının çabuk yorulduğunu söyler. Bilinen astım, romatolojik hastalık veya uzun süreli steroid kullanımı yoktur; son aylarda iştahı artmış ve adetleri seyrekleşmiştir. Aile hekimi iki farklı antihipertansif başlamasına rağmen kan basıncı yüksek seyretmiş, kan şekeri ölçümlerinin de yükseldiği görülmüştür. Ateş, gece terlemesi veya belirgin enfeksiyon yakınması tariflemez.",
    "patientIntro": {
      "profile": "38 yaşında kadın hasta, Endokrinoloji polikliniği ortamında değerlendiriliyor.",
      "presentation": "Hasta, son bir yılda kilo artışı, morarma ve kontrol altına alınamayan tansiyon nedeniyle başvuruyor.",
      "historySummary": "Hasta son bir yılda özellikle gövdesinden kilo aldığını, yüzünün yuvarlaklaştığını ve daha önce kullanmadığı kıyafetlerin bel bölgesinden dar geldiğini anlatır. Karın ve uyluklarında geniş mor çatlaklar fark etmiş; küçük çarpmalarla kollarında morluklar oluşmaya başlamıştır. Merdiven çıkarken bacaklarında güçsüzlük hissettiğini, saçlarını tararken kollarının çabuk yorulduğunu söyler. Bilinen astım, romatolojik hastalık veya uzun süreli steroid kullanımı yoktur; son aylarda iştahı artmış ve adetleri seyrekleşmiştir. Aile hekimi iki farklı antihipertansif başlamasına rağmen kan basıncı yüksek seyretmiş, kan şekeri ölçümlerinin de yükseldiği görülmüştür. Ateş, gece terlemesi veya belirgin enfeksiyon yakınması tariflemez."
    },
    "vitals": {
      "TA": "162/96 mmHg",
      "Nabız": "92/dk",
      "Solunum": "18/dk",
      "SpO2": "%98, oda havasında",
      "Ateş": "36.8 °C",
      "Şok indeksi": "0.57 - dolaşım stabil"
    },
    "exam": [
      "Santral obezite, supraklaviküler dolgunluk ve pletorik yüz görünümü var.",
      "Karın yanlarında 1 cm’den geniş mor strialar ve ön kollarda ekimozlar görülüyor.",
      "Proksimal kas gücü kalça fleksiyonunda 4/5, distal güç korunmuş.",
      "Periferik ödem belirgin değil; tiroid palpasyonunda nodül saptanmıyor."
    ],
    "investigations": [
      {
        "id": "v304-new-710-mor-catlaklar-ve-direnc-tansiyon-metabolik-panel",
        "label": "Metabolik panel",
        "title": "Metabolik panel",
        "orderLabel": "Metabolik panel",
        "type": "lab",
        "priority": "essential",
        "subtype": "Metabolik panel",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Hiperglisemi, hipertansiyonla birlikte hafif hipokalemi ve korunmuş böbrek fonksiyonu vardır.",
        "clinicalMeaning": "Hiperglisemi, hipertansiyonla birlikte hafif hipokalemi ve korunmuş böbrek fonksiyonu vardır.",
        "result": {
          "title": "Metabolik panel",
          "summary": "Hiperglisemi, hipertansiyonla birlikte hafif hipokalemi ve korunmuş böbrek fonksiyonu vardır.",
          "interpretation": "Hiperglisemi, hipertansiyonla birlikte hafif hipokalemi ve korunmuş böbrek fonksiyonu vardır.",
          "values": [
            [
              "Açlık glukozu",
              "168 mg/dL",
              "70-100 mg/dL",
              "Yüksek"
            ],
            [
              "HbA1c",
              "7.1%",
              "<5.7%",
              "Diyabet aralığı"
            ],
            [
              "Potasyum",
              "3.2 mmol/L",
              "3.5-5.1 mmol/L",
              "Düşük"
            ],
            [
              "Sodyum",
              "142 mmol/L",
              "135-145 mmol/L",
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
      },
      {
        "id": "v304-new-710-mor-catlaklar-ve-direnc-tansiyon-kortizol-tarama",
        "label": "Kortizol tarama testleri",
        "title": "Kortizol tarama testleri",
        "orderLabel": "Kortizol tarama testleri",
        "type": "lab",
        "priority": "essential",
        "subtype": "Kortizol tarama testleri",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Sirkadiyen ritim kaybı ve deksametazonla baskılanmama birlikte görülmektedir.",
        "clinicalMeaning": "Sirkadiyen ritim kaybı ve deksametazonla baskılanmama birlikte görülmektedir.",
        "result": {
          "title": "Kortizol tarama testleri",
          "summary": "Sirkadiyen ritim kaybı ve deksametazonla baskılanmama birlikte görülmektedir.",
          "interpretation": "Sirkadiyen ritim kaybı ve deksametazonla baskılanmama birlikte görülmektedir.",
          "values": [
            [
              "Gece tükürük kortizolü",
              "0.42 mcg/dL",
              "<0.09 mcg/dL",
              "Yüksek"
            ],
            [
              "1 mg deksametazon sonrası serum kortizolü",
              "14.2 mcg/dL",
              "<1.8 mcg/dL beklenir",
              "Baskılanmamış"
            ],
            [
              "24 saat idrar serbest kortizol",
              "285 mcg/gün",
              "<50 mcg/gün",
              "Yüksek"
            ],
            [
              "ACTH",
              "78 pg/mL",
              "10-60 pg/mL",
              "Baskılanmamış/yüksek"
            ]
          ]
        }
      },
      {
        "id": "v304-new-710-mor-catlaklar-ve-direnc-tansiyon-ek-dislamalar",
        "label": "Eşlik eden dışlama verileri",
        "title": "Eşlik eden dışlama verileri",
        "orderLabel": "Eşlik eden dışlama verileri",
        "type": "lab",
        "priority": "important",
        "subtype": "Eşlik eden dışlama verileri",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Sık karışabilecek bazı metabolik ve sistemik nedenler desteklenmemektedir.",
        "clinicalMeaning": "Sık karışabilecek bazı metabolik ve sistemik nedenler desteklenmemektedir.",
        "result": {
          "title": "Eşlik eden dışlama verileri",
          "summary": "Sık karışabilecek bazı metabolik ve sistemik nedenler desteklenmemektedir.",
          "interpretation": "Sık karışabilecek bazı metabolik ve sistemik nedenler desteklenmemektedir.",
          "values": [
            [
              "TSH",
              "1.8 mIU/L",
              "0.4-4.0 mIU/L",
              "Normal"
            ],
            [
              "Gebelik testi",
              "Negatif",
              "Negatif",
              "Gebelik yok"
            ],
            [
              "AST/ALT",
              "28/34 U/L",
              "<35/<35 U/L",
              "Belirgin karaciğer yetmezliği yok"
            ],
            [
              "CRP",
              "4 mg/L",
              "<5 mg/L",
              "Yüksek değil"
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
    "question": "Bu hastadaki laboratuvar paternini en doğru yorumlayan seçenek hangisidir?",
    "questionType": "laboratuvar yorumu",
    "answerTarget": "Cushing sendromu tarama testlerinin yorumlanması",
    "diagnosis": {
      "correct": "Gece kortizol ritminin kaybı ve deksametazonla baskılanmama endojen glukokortikoid fazlalığını destekler",
      "options": [
        "Sabah serum kortizolünün referans aralıkta olması tabloyu güvenle dışlar",
        "Baskılanmış ACTH varlığı bu verilerle primer hipofiz kaynaklı süreci destekler",
        "1 mg deksametazon sonrası kortizolün 1.8 mcg/dL altında olması patolojik baskılanmamayı gösterir",
        "Gece kortizol ritminin kaybı ve deksametazonla baskılanmama endojen glukokortikoid fazlalığını destekler",
        "Aldosteron-renin oranının yüksekliği bu klinik tablonun ana tarama testidir"
      ],
      "question": "Bu hastadaki laboratuvar paternini en doğru yorumlayan seçenek hangisidir?",
      "explanation": "Progresif santral kilo artışı, geniş mor stria, kolay morarma, proksimal kas güçsüzlüğü, hipertansiyon ve hiperglisemi birlikte glukokortikoid fazlalığını düşündüren güçlü klinik ipuçlarıdır. Gece tükürük kortizolünün yüksek olması sirkadiyen ritim kaybını, deksametazon sonrası kortizolün baskılanmaması ise negatif feedback bozukluğunu gösterir. ACTH düzeyi sonraki lokalizasyon ayrımı için kullanılır.",
      "pearls": [
        "Tek sabah kortizolü tarama için yeterli değildir.",
        "Gece kortizol yüksekliği fizyolojik ritim kaybını gösterir.",
        "1 mg deksametazon sonrası baskılanmama endojen fazlalık lehinedir.",
        "ACTH düzeyi nedenin ACTH-bağımlı veya bağımsız olabileceğini sınıflandırır."
      ],
      "optionFeedback": {
        "Sabah serum kortizolünün referans aralıkta olması tabloyu güvenle dışlar": "Sabah kortizolü tek başına bu tabloyu dışlamak için güvenilir değildir; kortizol fizyolojik olarak sabah yüksektir ve birçok hastada tek ölçüm referans aralığında görünebilir. Bu hastada progresif kilo artışı, mor strialar, kolay morarma, proksimal güçsüzlük, dirençli hipertansiyon ve yeni hiperglisemi gibi yüksek ayırt ettirici klinik bulgular vardır. Tarama, sirkadiyen ritmin bozulmasını veya deksametazonla baskılanma kaybını gösteren testlerle yapılmalıdır.",
        "Baskılanmış ACTH varlığı bu verilerle primer hipofiz kaynaklı süreci destekler": "Baskılanmış ACTH adrenal kaynaklı kortizol fazlalığını düşündürebilir; fakat bu olguda ACTH baskılanmış değil, yüksektir. Ayrıca seçenek hipofiz kaynaklı süreci yanlış yönde yorumlamaktadır; hipofiz veya ektopik ACTH üretiminde ACTH genellikle baskılanmaz. Bu nedenle verilen laboratuvar paterniyle uyumlu değildir.",
        "1 mg deksametazon sonrası kortizolün 1.8 mcg/dL altında olması patolojik baskılanmamayı gösterir": "1 mg deksametazon sonrası serum kortizolünün 1.8 mcg/dL altında olması normal baskılanma lehinedir ve endojen kortizol fazlalığını desteklemez. Bu hastada deksametazon sonrası kortizol yüksek kalmıştır; yani negatif feedback yanıtı kaybolmuştur. Seçenek eşik bilgisini ters yorumladığı için yanlıştır.",
        "Gece kortizol ritminin kaybı ve deksametazonla baskılanmama endojen glukokortikoid fazlalığını destekler": "Bu seçenek en uygundur. Gece tükürük kortizolünün yüksek olması normal sirkadiyen kortizol ritminin kaybolduğunu, 1 mg deksametazon sonrası kortizolün baskılanmaması ise negatif feedback kontrolünün bozulduğunu gösterir. Klinik olarak mor strialar, kolay morarma, proksimal kas güçsüzlüğü, hipertansiyon ve hiperglisemi bu biyokimyasal paterni destekler. Sonraki basamaklarda ACTH düzeyine göre ACTH-bağımlı ve bağımsız nedenler ayrılır; ancak ilk kritik yorum endojen glukokortikoid fazlalığının gösterilmesidir.",
        "Aldosteron-renin oranının yüksekliği bu klinik tablonun ana tarama testidir": "Aldosteron-renin oranı primer hiperaldosteronizm taramasında kullanılır; dirençli hipertansiyon ve hipokalemi varsa önemli bir testtir. Ancak bu hastada mor stria, kolay morarma, proksimal güçsüzlük, kilo artışı ve glukoz bozukluğu glukokortikoid fazlalığı eksenini ön plana çıkarır. Aldosteron-renin oranı bu çoklu katabolik ve metabolik bulguları açıklayan ana tarama testi değildir."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "Cushing sendromunda klinik şüphe çoklu ve progresif bulgularla kurulur; taramada gece tükürük kortizolü, 1 mg deksametazon baskılama testi veya 24 saat idrar serbest kortizolü kullanılır.",
    "examPearl": "TUS ipucu: Geniş mor stria + proksimal miyopati + hipertansiyon/hiperglisemi → sabah kortizolüne güvenme; gece kortizolü ve deksametazon baskılanmasına bak.",
    "whyCorrect": "Doğru seçenek, hem klinik bulguları hem de iki bağımsız tarama testindeki anormalliği aynı patofizyolojik eksende birleştirir.",
    "optionComparison": "Yanlış seçenekler sabah kortizolüne aşırı güvenme, ACTH yönünü ters yorumlama, deksametazon eşiğini ters okuma veya aldosteron eksenine kayma hatalarını temsil eder.",
    "evidenceChain": [
      "Mor stria ve kolay morarma → protein katabolizması ve deri incelmesiyle uyumlu.",
      "Proksimal kas güçsüzlüğü → glukokortikoid ilişkili miyopati desteği.",
      "Gece tükürük kortizolü yüksek → sirkadiyen ritim kaybı.",
      "1 mg deksametazon sonrası kortizol 14.2 mcg/dL → normal baskılanma yok."
    ],
    "whyWrong": "Yanlış seçenekler aynı klinik bağlamda akla gelebilecek alternatif tanı, mekanizma veya yönetim yollarını temsil eder; ancak olgudaki öykü, muayene ve objektif veri zinciri seçilen doğru hedefle daha güçlü ve güvenli biçimde örtüşür.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v304",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V303 render-safe internal-medicine cases with diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  },
{
    "id": "v304-new-711-uyusma-dengesizlik-ve-makrositoz",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "Uyuşma, dengesizlik ve makrositoz",
    "difficulty": "Zor",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "Makrositik anemi, nörolojik bulgular, metilmalonik asit ve otoantikor verilerini birlikte yorumlayarak B12 eksikliğinin mekanizmasını ayırt etme.",
    "learningTarget": "Pernisiyöz anemide intrinsik faktör kaybı, megaloblastik anemi ve nörolojik tutulum bağlantısını kurma.",
    "demographics": "67 yaşında kadın hasta",
    "setting": "Dahiliye polikliniği",
    "chiefComplaint": "Hasta, son aylarda artan halsizlik, ayaklarda uyuşma ve yürürken dengesizlik nedeniyle başvuruyor.",
    "stem": "Hasta yaklaşık altı aydır giderek artan yorgunluk hissettiğini, son iki aydır ayak tabanlarında karıncalanma ve pamuk üstünde yürüme hissi olduğunu anlatır. Ev içinde yürürken özellikle karanlıkta dengesinin bozulduğunu ve merdiven inerken trabzana daha çok tutunduğunu söyler. Dilinde yanma ve iştahsızlık olmuştur; belirgin kilo kaybı veya kanlı dışkı fark etmemiştir. Et tüketimini tamamen bırakmamıştır ve yoğun alkol kullanımı yoktur. Hashimoto tiroiditi nedeniyle levotiroksin kullanır; yeni başlanan kemoterapi, antiepileptik veya metotreksat öyküsü bulunmaz. Ateş, gece terlemesi veya kemik ağrısı tariflemez.",
    "patientIntro": {
      "profile": "67 yaşında kadın hasta, Dahiliye polikliniği ortamında değerlendiriliyor.",
      "presentation": "Hasta, son aylarda artan halsizlik, ayaklarda uyuşma ve yürürken dengesizlik nedeniyle başvuruyor.",
      "historySummary": "Hasta yaklaşık altı aydır giderek artan yorgunluk hissettiğini, son iki aydır ayak tabanlarında karıncalanma ve pamuk üstünde yürüme hissi olduğunu anlatır. Ev içinde yürürken özellikle karanlıkta dengesinin bozulduğunu ve merdiven inerken trabzana daha çok tutunduğunu söyler. Dilinde yanma ve iştahsızlık olmuştur; belirgin kilo kaybı veya kanlı dışkı fark etmemiştir. Et tüketimini tamamen bırakmamıştır ve yoğun alkol kullanımı yoktur. Hashimoto tiroiditi nedeniyle levotiroksin kullanır; yeni başlanan kemoterapi, antiepileptik veya metotreksat öyküsü bulunmaz. Ateş, gece terlemesi veya kemik ağrısı tariflemez."
    },
    "vitals": {
      "TA": "124/76 mmHg",
      "Nabız": "104/dk",
      "Solunum": "18/dk",
      "SpO2": "%97, oda havasında",
      "Ateş": "36.6 °C",
      "Şok indeksi": "0.84 - taşikardi anemiyle uyumlu, perfüzyon korunmuş"
    },
    "exam": [
      "Konjonktivalar soluk, dil yüzeyi parlak ve hassas görünümde.",
      "Alt ekstremitede vibrasyon ve pozisyon duyusu azalmış; Romberg testi pozitif.",
      "Kas gücü belirgin asimetrik değil, derin tendon refleksleri hafif azalmış.",
      "Karında organomegali saptanmıyor; dışkı muayenesinde belirgin melena yok."
    ],
    "investigations": [
      {
        "id": "v304-new-711-uyusma-dengesizlik-ve-makrositoz-tam-kan",
        "label": "Tam kan sayımı ve retikülosit",
        "title": "Tam kan sayımı ve retikülosit",
        "orderLabel": "Tam kan sayımı ve retikülosit",
        "type": "lab",
        "priority": "essential",
        "subtype": "Tam kan sayımı ve retikülosit",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Makrositik hipoproliferatif anemiye hafif pansitopeni eşlik etmektedir.",
        "clinicalMeaning": "Makrositik hipoproliferatif anemiye hafif pansitopeni eşlik etmektedir.",
        "result": {
          "title": "Tam kan sayımı ve retikülosit",
          "summary": "Makrositik hipoproliferatif anemiye hafif pansitopeni eşlik etmektedir.",
          "interpretation": "Makrositik hipoproliferatif anemiye hafif pansitopeni eşlik etmektedir.",
          "values": [
            [
              "Hemoglobin",
              "8.7 g/dL",
              "12-16 g/dL",
              "Düşük"
            ],
            [
              "MCV",
              "119 fL",
              "80-100 fL",
              "Makrositoz"
            ],
            [
              "Lökosit",
              "3.6 x10^9/L",
              "4-10 x10^9/L",
              "Hafif düşük"
            ],
            [
              "Trombosit",
              "128 x10^9/L",
              "150-400 x10^9/L",
              "Hafif düşük"
            ],
            [
              "Retikülosit",
              "0.6%",
              "0.5-2.5%",
              "Uygunsuz düşük"
            ]
          ]
        }
      },
      {
        "id": "v304-new-711-uyusma-dengesizlik-ve-makrositoz-hemoliz-vitamin",
        "label": "Hemoliz belirteçleri ve vitamin düzeyleri",
        "title": "Hemoliz belirteçleri ve vitamin düzeyleri",
        "orderLabel": "Hemoliz belirteçleri ve vitamin düzeyleri",
        "type": "lab",
        "priority": "essential",
        "subtype": "Hemoliz belirteçleri ve vitamin düzeyleri",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "B12 eksikliğiyle uyumlu metabolit paterni ve intramedüller yıkım bulguları vardır.",
        "clinicalMeaning": "B12 eksikliğiyle uyumlu metabolit paterni ve intramedüller yıkım bulguları vardır.",
        "result": {
          "title": "Hemoliz belirteçleri ve vitamin düzeyleri",
          "summary": "B12 eksikliğiyle uyumlu metabolit paterni ve intramedüller yıkım bulguları vardır.",
          "interpretation": "B12 eksikliğiyle uyumlu metabolit paterni ve intramedüller yıkım bulguları vardır.",
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
              "<0.40 µmol/L",
              "Yüksek"
            ],
            [
              "Homosistein",
              "38 µmol/L",
              "5-15 µmol/L",
              "Yüksek"
            ],
            [
              "LDH",
              "820 U/L",
              "<250 U/L",
              "Yüksek"
            ],
            [
              "İndirekt bilirubin",
              "1.8 mg/dL",
              "<1.0 mg/dL",
              "Yüksek"
            ]
          ]
        }
      },
      {
        "id": "v304-new-711-uyusma-dengesizlik-ve-makrositoz-otoantikor",
        "label": "Otoimmün gastrit göstergeleri",
        "title": "Otoimmün gastrit göstergeleri",
        "orderLabel": "Otoimmün gastrit göstergeleri",
        "type": "lab",
        "priority": "important",
        "subtype": "Otoimmün gastrit göstergeleri",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Otoimmün mide kaynaklı emilim bozukluğu lehine bulgular vardır.",
        "clinicalMeaning": "Otoimmün mide kaynaklı emilim bozukluğu lehine bulgular vardır.",
        "result": {
          "title": "Otoimmün gastrit göstergeleri",
          "summary": "Otoimmün mide kaynaklı emilim bozukluğu lehine bulgular vardır.",
          "interpretation": "Otoimmün mide kaynaklı emilim bozukluğu lehine bulgular vardır.",
          "values": [
            [
              "Anti-intrinsik faktör antikoru",
              "Pozitif",
              "Negatif",
              "Pozitif"
            ],
            [
              "Anti-parietal hücre antikoru",
              "Pozitif",
              "Negatif",
              "Pozitif"
            ],
            [
              "Gastrin",
              "620 pg/mL",
              "<100 pg/mL",
              "Yüksek"
            ],
            [
              "Ferritin",
              "82 ng/mL",
              "15-150 ng/mL",
              "Demir deposu korunmuş"
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
    "question": "Bu bulguları en iyi açıklayan mekanizma aşağıdakilerden hangisidir?",
    "questionType": "mekanizma",
    "answerTarget": "Makrositik anemi ve nörolojik bulguların mekanizması",
    "diagnosis": {
      "correct": "Otoimmün parietal hücre hasarı ve intrinsik faktör kaybına bağlı ileal B12 emilim bozukluğu",
      "options": [
        "Otoimmün parietal hücre hasarı ve intrinsik faktör kaybına bağlı ileal B12 emilim bozukluğu",
        "Yetersiz folat alımına bağlı DNA sentez bozukluğu ve nörolojik bulgu gelişimi",
        "Kronik gastrointestinal kan kaybına bağlı demir eksikliği ve mikrositik eritropoez",
        "İnflamasyon ilişkili hepsidin artışıyla makrofajlarda demir tutulumu",
        "Eritrosit membranında oksidatif stresle tetiklenen enzimatik hemoliz"
      ],
      "question": "Bu bulguları en iyi açıklayan mekanizma aşağıdakilerden hangisidir?",
      "explanation": "Makrositoz, düşük B12, metilmalonik asit ve homosistein yüksekliği, glossit ve posterior kolon tipi duyu kaybı birlikte B12 eksikliğini gösterir. Anti-intrinsik faktör ve anti-parietal hücre antikor pozitifliği, B12 eksikliğinin otoimmün gastrit/pernisiyöz anemi mekanizmasıyla geliştiğini destekler.",
      "pearls": [
        "B12 eksikliğinde metilmalonik asit ve homosistein birlikte artar.",
        "Folat eksikliğinde metilmalonik asit artışı beklenmez.",
        "İntrinsik faktör eksikliği ileal B12 emilimini bozar.",
        "Nörolojik bulgular B12 eksikliğini folat eksikliğinden ayırmada değerlidir."
      ],
      "optionFeedback": {
        "Otoimmün parietal hücre hasarı ve intrinsik faktör kaybına bağlı ileal B12 emilim bozukluğu": "Bu seçenek en uygundur. Makrositoz, düşük B12, yüksek metilmalonik asit, yüksek homosistein, anti-intrinsik faktör antikoru ve vibrasyon/pozisyon duyusu kaybı birlikte B12 eksikliğini ve otoimmün emilim bozukluğunu destekler. İntrinsik faktör eksikliğinde terminal ileumdan B12 emilimi bozulur; DNA sentezi aksadığı için megaloblastik anemi, metilmalonik asit biriktiği için nörolojik tutulum gelişir. Hashimoto öyküsü başka otoimmün hastalıkla birlikteliği güçlendirir.",
        "Yetersiz folat alımına bağlı DNA sentez bozukluğu ve nörolojik bulgu gelişimi": "Folat eksikliği megaloblastik anemi ve makrositoz yapabilir; homosistein artabilir fakat metilmalonik asit genellikle artmaz. Ayrıca folat eksikliği tipik olarak posterior kolon/dorsal kolon bulguları gibi nörolojik tutulumla açıklanmaz. Bu hastada metilmalonik asit yüksekliği ve anti-intrinsik faktör pozitifliği folattan çok B12 emilim bozukluğunu destekler.",
        "Kronik gastrointestinal kan kaybına bağlı demir eksikliği ve mikrositik eritropoez": "Kronik gastrointestinal kan kaybı demir eksikliği anemisine yol açar ve tipik olarak mikrositoz, düşük ferritin ve düşük transferrin satürasyonu beklenir. Bu olguda MCV belirgin yüksek, LDH ve indirekt bilirubin artmış, B12 düşük ve nörolojik bulgular vardır. Demir eksikliği bu biyokimyasal ve nörolojik paterni açıklamaz.",
        "İnflamasyon ilişkili hepsidin artışıyla makrofajlarda demir tutulumu": "Kronik hastalık anemisinde hepsidin artışı demirin makrofajlarda tutulmasına ve serum demirinin düşmesine neden olur; MCV çoğu kez normositik veya hafif mikrositik seyreder. Nörolojik bulgular, yüksek metilmalonik asit ve anti-intrinsik faktör pozitifliği bu mekanizmanın parçası değildir. Bu seçenek inflamatuvar anemi için öğretici bir çeldiricidir fakat olguyla uyumlu değildir.",
        "Eritrosit membranında oksidatif stresle tetiklenen enzimatik hemoliz": "G6PD eksikliği gibi oksidatif hemolizlerde ani hemoliz atakları, Heinz cisimcikleri/bite cell görülebilir ve olay genellikle ilaç, enfeksiyon veya bakla gibi tetikleyicilerle ilişkilidir. Bu hastada kronik yorgunluk, makrositoz, düşük B12, metilmalonik asit yüksekliği ve duyusal ataksi ön plandadır. Hemoliz belirteçleri megaloblastik eritropoeze bağlı intramedüller yıkımı yansıtabilir; temel mekanizma eritrosit enzim defekti değildir."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "Megaloblastik anemide makrositozun yanında nörolojik bulgu varsa B12 eksikliği öncelenir; anti-intrinsik faktör pozitifliği pernisiyöz anemi için yüksek özgüllüğe sahiptir.",
    "examPearl": "TUS ipucu: Makrositoz + nörolojik bulgu + metilmalonik asit yüksekliği = B12; anti-intrinsik faktör pozitifse pernisiyöz anemi.",
    "whyCorrect": "Doğru seçenek hem hematolojik hem nörolojik bulguları tek bir emilim bozukluğu mekanizmasıyla açıklar.",
    "optionComparison": "Yanlış seçenekler folat, demir eksikliği, kronik hastalık anemisi ve oksidatif hemoliz gibi gerçek ayırıcıları temsil eder; ancak metabolit ve nörolojik paternle uyumlu değildir.",
    "evidenceChain": [
      "MCV 119 fL + düşük retikülosit → megaloblastik hipoproliferatif süreç.",
      "B12 92 pg/mL + MMA yüksekliği → fonksiyonel B12 eksikliği.",
      "Pozitif Romberg ve vibrasyon kaybı → nörolojik tutulum desteği.",
      "Anti-intrinsik faktör pozitifliği → otoimmün emilim bozukluğu mekanizması."
    ],
    "whyWrong": "Yanlış seçenekler aynı klinik bağlamda akla gelebilecek alternatif tanı, mekanizma veya yönetim yollarını temsil eder; ancak olgudaki öykü, muayene ve objektif veri zinciri seçilen doğru hedefle daha güçlü ve güvenli biçimde örtüşür.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v304",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V303 render-safe internal-medicine cases with diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  },
{
    "id": "v304-new-712-diyabette-yuksek-potasyum-ve-hafif-asidoz",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "Diyabette yüksek potasyum ve hafif asidoz",
    "difficulty": "Zor",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "Diyabetik böbrek hastalığı ve ilaç kullanımı zemininde hiperkalemik normal anyon açıklıklı metabolik asidoz paternini mekanizma düzeyinde ayırt etme.",
    "learningTarget": "Tip 4 renal tübüler asidozda aldosteron ekseni, distal potasyum sekresyonu ve asit atılımı arasındaki ilişkiyi kurma.",
    "demographics": "68 yaşında erkek hasta",
    "setting": "Dahiliye acil değerlendirme alanı",
    "chiefComplaint": "Hasta, rutin kontrolde potasyum yüksekliği görülmesi ve son günlerde halsizlik hissetmesi nedeniyle yönlendirilmiş.",
    "stem": "Hasta son bir haftadır bacaklarında güçsüzlük ve çabuk yorulma hissettiğini, ancak bayılma veya göğüs ağrısı yaşamadığını anlatır. On beş yıldır tip 2 diyabeti ve hipertansiyonu vardır; son aylarda ayak bileği ödemi için spironolakton eklenmiş, bel ağrısı için de birkaç gündür ibuprofen kullanmıştır. İdrar miktarında belirgin azalma fark etmemiştir ve son günlerde ishal veya kusma olmamıştır. Kan şekeri ölçümleri genellikle 120-180 mg/dL arasında seyretmiştir; evde keton ölçümü yapmamıştır. Tuz yerine potasyum içeren diyet ürünü kullanmaya başladığını da sonradan belirtir. Ateş, yan ağrısı veya idrarda yanma tariflemez.",
    "patientIntro": {
      "profile": "68 yaşında erkek hasta, Dahiliye acil değerlendirme alanı ortamında değerlendiriliyor.",
      "presentation": "Hasta, rutin kontrolde potasyum yüksekliği görülmesi ve son günlerde halsizlik hissetmesi nedeniyle yönlendirilmiş.",
      "historySummary": "Hasta son bir haftadır bacaklarında güçsüzlük ve çabuk yorulma hissettiğini, ancak bayılma veya göğüs ağrısı yaşamadığını anlatır. On beş yıldır tip 2 diyabeti ve hipertansiyonu vardır; son aylarda ayak bileği ödemi için spironolakton eklenmiş, bel ağrısı için de birkaç gündür ibuprofen kullanmıştır. İdrar miktarında belirgin azalma fark etmemiştir ve son günlerde ishal veya kusma olmamıştır. Kan şekeri ölçümleri genellikle 120-180 mg/dL arasında seyretmiştir; evde keton ölçümü yapmamıştır. Tuz yerine potasyum içeren diyet ürünü kullanmaya başladığını da sonradan belirtir. Ateş, yan ağrısı veya idrarda yanma tariflemez."
    },
    "vitals": {
      "TA": "136/78 mmHg",
      "Nabız": "82/dk",
      "Solunum": "18/dk",
      "SpO2": "%98, oda havasında",
      "Ateş": "36.5 °C",
      "Şok indeksi": "0.60 - hemodinami stabil"
    },
    "exam": [
      "Genel durum iyi, bilinç açık ve koopere.",
      "Mukozalar hafif kuru değil; belirgin dehidratasyon bulgusu yok.",
      "Kalp oskültasyonunda ritim düzenli; akciğerlerde ral yok.",
      "Pretibial ödem minimal; karın ve kostovertebral açı hassasiyeti yok."
    ],
    "investigations": [
      {
        "id": "v304-new-712-diyabette-yuksek-potasyum-ve-hafif-asidoz-kimya-kan-gazi",
        "label": "Temel biyokimya ve venöz kan gazı",
        "title": "Temel biyokimya ve venöz kan gazı",
        "orderLabel": "Temel biyokimya ve venöz kan gazı",
        "type": "lab",
        "priority": "essential",
        "subtype": "Temel biyokimya ve venöz kan gazı",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Hiperkalemik normal anyon açıklıklı metabolik asidoz paterni vardır.",
        "clinicalMeaning": "Hiperkalemik normal anyon açıklıklı metabolik asidoz paterni vardır.",
        "result": {
          "title": "Temel biyokimya ve venöz kan gazı",
          "summary": "Hiperkalemik normal anyon açıklıklı metabolik asidoz paterni vardır.",
          "interpretation": "Hiperkalemik normal anyon açıklıklı metabolik asidoz paterni vardır.",
          "values": [
            [
              "Sodyum",
              "139 mmol/L",
              "135-145 mmol/L",
              "Normal"
            ],
            [
              "Potasyum",
              "6.0 mmol/L",
              "3.5-5.1 mmol/L",
              "Yüksek"
            ],
            [
              "Klor",
              "112 mmol/L",
              "98-107 mmol/L",
              "Yüksek"
            ],
            [
              "Bikarbonat",
              "18 mmol/L",
              "22-26 mmol/L",
              "Düşük"
            ],
            [
              "Anyon açığı",
              "9 mmol/L",
              "8-12 mmol/L",
              "Normal"
            ],
            [
              "Venöz pH",
              "7.31",
              "7.32-7.42",
              "Hafif asidemi"
            ],
            [
              "Kreatinin",
              "1.8 mg/dL",
              "0.7-1.2 mg/dL",
              "Bazaline yakın yüksek"
            ]
          ]
        }
      },
      {
        "id": "v304-new-712-diyabette-yuksek-potasyum-ve-hafif-asidoz-idrar-elektrolit",
        "label": "İdrar elektrolitleri ve potasyum atılım göstergeleri",
        "title": "İdrar elektrolitleri ve potasyum atılım göstergeleri",
        "orderLabel": "İdrar elektrolitleri ve potasyum atılım göstergeleri",
        "type": "lab",
        "priority": "essential",
        "subtype": "İdrar elektrolitleri ve potasyum atılım göstergeleri",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Böbreğin potasyum ve amonyum yanıtı yetersiz görünmektedir.",
        "clinicalMeaning": "Böbreğin potasyum ve amonyum yanıtı yetersiz görünmektedir.",
        "result": {
          "title": "İdrar elektrolitleri ve potasyum atılım göstergeleri",
          "summary": "Böbreğin potasyum ve amonyum yanıtı yetersiz görünmektedir.",
          "interpretation": "Böbreğin potasyum ve amonyum yanıtı yetersiz görünmektedir.",
          "values": [
            [
              "İdrar pH",
              "5.2",
              "4.5-8.0",
              "Asidoza uygun asidik"
            ],
            [
              "İdrar sodyum",
              "48 mmol/L",
              "Değişken",
              "Renal sodyum atılımı var"
            ],
            [
              "İdrar potasyum",
              "18 mmol/L",
              "Değişken",
              "Beklenenden düşük"
            ],
            [
              "İdrar anyon açığı",
              "+18 mmol/L",
              "Negatif beklenir",
              "Amonyum atılımı yetersizliği lehine"
            ],
            [
              "TTKG",
              "3",
              "Hiperkalemide >7 beklenir",
              "Düşük"
            ]
          ]
        }
      },
      {
        "id": "v304-new-712-diyabette-yuksek-potasyum-ve-hafif-asidoz-hormon-ekg",
        "label": "Renin-aldosteron ve EKG",
        "title": "Renin-aldosteron ve EKG",
        "orderLabel": "Renin-aldosteron ve EKG",
        "type": "lab",
        "priority": "important",
        "subtype": "Renin-aldosteron ve EKG",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Renin-aldosteron ekseni baskılanmış, ketoasidoz ve belirgin EKG toksisitesi desteklenmemektedir.",
        "clinicalMeaning": "Renin-aldosteron ekseni baskılanmış, ketoasidoz ve belirgin EKG toksisitesi desteklenmemektedir.",
        "result": {
          "title": "Renin-aldosteron ve EKG",
          "summary": "Renin-aldosteron ekseni baskılanmış, ketoasidoz ve belirgin EKG toksisitesi desteklenmemektedir.",
          "interpretation": "Renin-aldosteron ekseni baskılanmış, ketoasidoz ve belirgin EKG toksisitesi desteklenmemektedir.",
          "values": [
            [
              "Plazma renin aktivitesi",
              "Düşük",
              "Pozisyona/sodyuma bağlı",
              "Baskılı"
            ],
            [
              "Aldosteron",
              "4 ng/dL",
              "Değişken, genelde >5-10",
              "Düşük-normal"
            ],
            [
              "Serum ketonu",
              "Negatif",
              "Negatif",
              "Ketoasidoz yok"
            ],
            [
              "EKG",
              "Dar QRS, belirgin sivri T yok",
              "-",
              "Acil membran bulgusu yok"
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
    "question": "Bu laboratuvar paternini en iyi açıklayan süreç hangisidir?",
    "questionType": "mekanizma",
    "answerTarget": "Hiperkalemik normal anyon açıklıklı metabolik asidozun mekanizması",
    "diagnosis": {
      "correct": "Hipoaldosteronizm veya aldosteron direnciyle distal potasyum ve asit atılımının azalması",
      "options": [
        "Distal hidrojen sekresyon kusuru nedeniyle idrar pH’sının sürekli yüksek kaldığı distal renal tübüler asidoz",
        "Proksimal bikarbonat geri emilim kusuru ve yaygın Fanconi tipi tübül disfonksiyonu",
        "Gastrointestinal bikarbonat kaybına bağlı ekstrarenal normal anyon açıklıklı asidoz",
        "Ketonkörper birikimine bağlı yüksek anyon açıklıklı metabolik asidoz",
        "Hipoaldosteronizm veya aldosteron direnciyle distal potasyum ve asit atılımının azalması"
      ],
      "question": "Bu laboratuvar paternini en iyi açıklayan süreç hangisidir?",
      "explanation": "Diyabetik böbrek hastalığı zemininde RAAS blokajı, spironolakton, NSAİİ ve potasyum alımı bir araya gelince aldosteron etkisi azalabilir. Bu durum distal nefronda potasyum sekresyonunu ve amonyum/asit atılımını azaltarak hiperkalemik normal anyon açıklıklı metabolik asidoz oluşturur. Normal anyon açıklığı, negatif keton, idrar anyon açığı pozitifliği ve düşük TTKG bu mekanizmayı destekler.",
      "pearls": [
        "Hiperkalemi + normal anyon açıklıklı asidoz → tip 4 RTA düşün.",
        "Diyabet ve RAAS/aldosteron karşıtı ilaçlar riski artırır.",
        "Düşük TTKG hiperkalemiye uygun renal potasyum atılımı olmadığını gösterir.",
        "Keton negatifliği DKA’yı zayıflatır."
      ],
      "optionFeedback": {
        "Distal hidrojen sekresyon kusuru nedeniyle idrar pH’sının sürekli yüksek kaldığı distal renal tübüler asidoz": "Distal renal tübüler asidozda alfa-interkale hücrelerin H+ sekresyonu bozulur ve idrar pH’sı genellikle asidoza rağmen 5.5’in üzerinde kalır. Bu hastada idrar pH’sı 5.2’dir ve ana ayırıcı bulgu hiperkalemidir. Distal RTA daha çok hipokalemi ve nefrolitiazis/nefron kalsifikasyonu ile hatırlanır; bu olgudaki düşük renin/aldosteron ve diyabetik zeminle uyumlu değildir.",
        "Proksimal bikarbonat geri emilim kusuru ve yaygın Fanconi tipi tübül disfonksiyonu": "Proksimal RTA’da bikarbonat geri emilimi bozulur; Fanconi sendromunda glukozüri, fosfatüri, aminoasidüri ve ürik asit kaybı gibi yaygın proksimal tübül bulguları beklenebilir. Bu hastada glukoz kontrolü makul, idrar pH’sı asidoza uygun asidik, fosfat kaybı veya yaygın proksimal tübül kaçağı verilmemiştir. Hiperkalemik patern proksimal RTA’dan çok aldosteron eksenini düşündürür.",
        "Gastrointestinal bikarbonat kaybına bağlı ekstrarenal normal anyon açıklıklı asidoz": "İshal gibi gastrointestinal bikarbonat kaybı normal anyon açıklıklı metabolik asidoz yapabilir; ancak böbrekler yanıt olarak amonyum atılımını artırır ve idrar anyon açığı genellikle negatif olur. Bu hastada ishal öyküsü yok, idrar anyon açığı pozitiftir ve potasyum atılım göstergesi düşüktür. Bu nedenle sorun ekstrarenal bikarbonat kaybından çok renal distal potasyum/asit atılım yetersizliğidir.",
        "Ketonkörper birikimine bağlı yüksek anyon açıklıklı metabolik asidoz": "Ketoasidoz yüksek anyon açıklıklı metabolik asidoz ve keton pozitifliği ile gider; sıklıkla belirgin hiperglisemi, dehidratasyon ve ketonemi/ketonüri beklenir. Bu olguda anyon açıklığı normal, serum ketonu negatif ve glukoz aşırı yüksek değildir. Bu nedenle DKA benzeri bir süreç laboratuvar paterniyle uyuşmaz.",
        "Hipoaldosteronizm veya aldosteron direnciyle distal potasyum ve asit atılımının azalması": "Bu seçenek en uygundur. Uzun süreli diyabet ve hafif kronik böbrek hastalığı zemininde ACE inhibitörü, spironolakton ve NSAİİ kullanımı renin-anjiyotensin-aldosteron eksenini baskılayarak hiperkalemik normal anyon açıklıklı metabolik asidoza yol açabilir. Aldosteron etkisi azaldığında distal nefronda sodyum geri emilimine bağlı lümen negatifliği azalır; potasyum ve asit atılımı bozulur. Düşük TTKG, pozitif idrar anyon açığı, düşük renin/aldosteron ve normal anyon açıklığı bu mekanizmayı destekler."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "Tip 4 RTA, hipoaldosteronizm veya aldosteron direnci nedeniyle hiperkalemi ve normal anyon açıklıklı metabolik asidoz yapar; diyabetik böbrek hastalığı ve RAAS etkileyen ilaçlar klasik zemindir.",
    "examPearl": "TUS ipucu: Diyabet + ACEi/ARB/spironolakton/NSAİİ + hiperkalemi + normal anyon açıklıklı asidoz = tip 4 RTA mekanizması.",
    "whyCorrect": "Doğru seçenek, normal anyon açıklıklı asidozu hiperkalemi ve düşük distal potasyum/asit atılımıyla birlikte açıklar.",
    "optionComparison": "Yanlış seçenekler distal/proksimal RTA, gastrointestinal bikarbonat kaybı ve ketoasidoz gibi gerçek ayırıcıları temsil eder; ancak potasyum, idrar pH, keton ve idrar anyon açığı paterniyle uyumsuzdur.",
    "evidenceChain": [
      "K 6.0 mmol/L + HCO3 18 mmol/L → hiperkalemik metabolik asidoz.",
      "Anyon açığı 9 mmol/L → yüksek anyon açıklıklı süreç değil.",
      "İdrar pH 5.2 → klasik distal RTA lehine değil.",
      "Düşük renin/aldosteron + düşük TTKG → aldosteron etkisi yetersizliği."
    ],
    "whyWrong": "Yanlış seçenekler aynı klinik bağlamda akla gelebilecek alternatif tanı, mekanizma veya yönetim yollarını temsil eder; ancak olgudaki öykü, muayene ve objektif veri zinciri seçilen doğru hedefle daha güçlü ve güvenli biçimde örtüşür.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v304",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V303 render-safe internal-medicine cases with diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  },
{
    "id": "v304-new-713-kuru-oksuruk-ve-oksijen-dusuklugu",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "Kuru öksürük ve oksijen düşüklüğü",
    "difficulty": "Zor",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "Hücresel immün yetmezlik zemininde subakut kuru öksürük, hipoksemi, LDH yüksekliği ve bilateral buzlu cam paternini tedavi kararına bağlama.",
    "learningTarget": "Pneumocystis jirovecii pnömonisinde TMP-SMX ve hipoksemi varsa ek kortikosteroid endikasyonunu ayırt etme.",
    "demographics": "32 yaşında erkek hasta",
    "setting": "Acil servis gözlem alanı",
    "chiefComplaint": "Hasta, iki haftadır artan kuru öksürük ve son iki gündür yürürken belirgin nefes darlığı nedeniyle başvuruyor.",
    "stem": "Hasta iki haftadır balgamsız öksürdüğünü, başlangıçta bunu soğuk algınlığı sandığını ancak son günlerde banyoya yürürken bile nefesinin kesildiğini anlatır. Ateşi aralıklı yükselmiş, gece terlemesi hafif olmuş fakat belirgin pürülan balgam veya göğüs yan ağrısı tariflememiştir. Son üç ayda yaklaşık altı kilo kaybettiğini ve ağzında beyaz plaklar çıktığını söyler. Düzenli takipli kronik hastalığı olmadığını, son yıllarda sağlık kontrolüne gitmediğini belirtir. Yakın zamanda hastane yatışı, kemoterapi veya yüksek doz steroid kullanımı yoktur. Sigara içmez; evde benzer yakınması olan biri bulunmamaktadır.",
    "patientIntro": {
      "profile": "32 yaşında erkek hasta, Acil servis gözlem alanı ortamında değerlendiriliyor.",
      "presentation": "Hasta, iki haftadır artan kuru öksürük ve son iki gündür yürürken belirgin nefes darlığı nedeniyle başvuruyor.",
      "historySummary": "Hasta iki haftadır balgamsız öksürdüğünü, başlangıçta bunu soğuk algınlığı sandığını ancak son günlerde banyoya yürürken bile nefesinin kesildiğini anlatır. Ateşi aralıklı yükselmiş, gece terlemesi hafif olmuş fakat belirgin pürülan balgam veya göğüs yan ağrısı tariflememiştir. Son üç ayda yaklaşık altı kilo kaybettiğini ve ağzında beyaz plaklar çıktığını söyler. Düzenli takipli kronik hastalığı olmadığını, son yıllarda sağlık kontrolüne gitmediğini belirtir. Yakın zamanda hastane yatışı, kemoterapi veya yüksek doz steroid kullanımı yoktur. Sigara içmez; evde benzer yakınması olan biri bulunmamaktadır."
    },
    "vitals": {
      "TA": "112/70 mmHg",
      "Nabız": "118/dk",
      "Solunum": "30/dk",
      "SpO2": "%88 oda havasında, %94 nazal oksijenle",
      "Ateş": "38.2 °C",
      "Şok indeksi": "1.05 - taşikardi ve solunum sıkıntısı var, belirgin hipotansiyon yok"
    },
    "exam": [
      "Hasta takipneik, cümleleri kısa keserek konuşuyor.",
      "Akciğer oskültasyonunda belirgin lobar ral veya wheezing yok; yaygın hafif inspiratuvar çıtırtılar duyuluyor.",
      "Ağız içinde kazınabilen beyaz plaklar görülüyor.",
      "Lenf nodları küçük ve yaygın palpabl; pretibial ödem yok."
    ],
    "investigations": [
      {
        "id": "v304-new-713-kuru-oksuruk-ve-oksijen-dusuklugu-kan-gazi",
        "label": "Arter kan gazı",
        "title": "Arter kan gazı",
        "orderLabel": "Arter kan gazı",
        "type": "lab",
        "priority": "essential",
        "subtype": "Arter kan gazı",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Belirgin hipoksemi ve artmış A-a gradiyenti vardır.",
        "clinicalMeaning": "Belirgin hipoksemi ve artmış A-a gradiyenti vardır.",
        "result": {
          "title": "Arter kan gazı",
          "summary": "Belirgin hipoksemi ve artmış A-a gradiyenti vardır.",
          "interpretation": "Belirgin hipoksemi ve artmış A-a gradiyenti vardır.",
          "values": [
            [
              "pH",
              "7.46",
              "7.35-7.45",
              "Hafif alkaloz"
            ],
            [
              "PaCO2",
              "31 mmHg",
              "35-45 mmHg",
              "Düşük"
            ],
            [
              "PaO2",
              "58 mmHg",
              "80-100 mmHg",
              "Düşük"
            ],
            [
              "A-a gradiyenti",
              "48 mmHg",
              "<15-20 mmHg",
              "Yüksek"
            ],
            [
              "Laktat",
              "1.6 mmol/L",
              "<2 mmol/L",
              "Normal"
            ]
          ]
        }
      },
      {
        "id": "v304-new-713-kuru-oksuruk-ve-oksijen-dusuklugu-immun-lab",
        "label": "Tam kan, biyokimya ve immünolojik tarama",
        "title": "Tam kan, biyokimya ve immünolojik tarama",
        "orderLabel": "Tam kan, biyokimya ve immünolojik tarama",
        "type": "lab",
        "priority": "essential",
        "subtype": "Tam kan, biyokimya ve immünolojik tarama",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Hücresel immün yetmezlik ve doku hasarı/akciğer tutulumu lehine veriler vardır.",
        "clinicalMeaning": "Hücresel immün yetmezlik ve doku hasarı/akciğer tutulumu lehine veriler vardır.",
        "result": {
          "title": "Tam kan, biyokimya ve immünolojik tarama",
          "summary": "Hücresel immün yetmezlik ve doku hasarı/akciğer tutulumu lehine veriler vardır.",
          "interpretation": "Hücresel immün yetmezlik ve doku hasarı/akciğer tutulumu lehine veriler vardır.",
          "values": [
            [
              "Lökosit",
              "4.2 x10^9/L",
              "4-10 x10^9/L",
              "Normal-alt"
            ],
            [
              "Lenfosit",
              "0.6 x10^9/L",
              "1.0-3.0 x10^9/L",
              "Düşük"
            ],
            [
              "LDH",
              "510 U/L",
              "<250 U/L",
              "Yüksek"
            ],
            [
              "CRP",
              "42 mg/L",
              "<5 mg/L",
              "Yüksek"
            ],
            [
              "HIV Ag/Ab",
              "Reaktif",
              "Negatif",
              "Pozitif tarama"
            ],
            [
              "CD4 sayısı",
              "64/mm³",
              ">500/mm³",
              "Çok düşük"
            ]
          ]
        }
      },
      {
        "id": "v304-new-713-kuru-oksuruk-ve-oksijen-dusuklugu-toraks-bt",
        "label": "Toraks BT",
        "title": "Toraks BT",
        "orderLabel": "Toraks BT",
        "type": "imaging",
        "priority": "essential",
        "subtype": "Görüntüleme",
        "category": "imaging",
        "testTypeCategory": "imaging",
        "summary": "Bilateral difüz interstisyel/buzlu cam tutulum mevcuttur.",
        "clinicalMeaning": "Bilateral difüz interstisyel/buzlu cam tutulum mevcuttur.",
        "result": {
          "title": "Toraks BT",
          "summary": "Bilateral difüz interstisyel/buzlu cam tutulum mevcuttur.",
          "interpretation": "Bilateral difüz interstisyel/buzlu cam tutulum mevcuttur.",
          "values": [
            [
              "Parankim",
              "Bilateral yaygın buzlu cam opasiteleri",
              "Yok",
              "Difüz tutulum"
            ],
            [
              "Konsolidasyon",
              "Belirgin lobar konsolidasyon yok",
              "Yok",
              "Lobar bakteriyel patern baskın değil"
            ],
            [
              "Plevral efüzyon",
              "Yok",
              "Yok",
              "Efüzyon yok"
            ],
            [
              "Kavitasyon",
              "Yok",
              "Yok",
              "Kaviter patern yok"
            ]
          ]
        }
      },
      {
        "id": "v304-new-713-kuru-oksuruk-ve-oksijen-dusuklugu-solunum-ornek",
        "label": "İndüklenmiş balgam/PCR",
        "title": "İndüklenmiş balgam/PCR",
        "orderLabel": "İndüklenmiş balgam/PCR",
        "type": "lab",
        "priority": "important",
        "subtype": "İndüklenmiş balgam/PCR",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Fırsatçı etken lehine mikrobiyolojik destek vardır.",
        "clinicalMeaning": "Fırsatçı etken lehine mikrobiyolojik destek vardır.",
        "result": {
          "title": "İndüklenmiş balgam/PCR",
          "summary": "Fırsatçı etken lehine mikrobiyolojik destek vardır.",
          "interpretation": "Fırsatçı etken lehine mikrobiyolojik destek vardır.",
          "values": [
            [
              "P. jirovecii PCR",
              "Pozitif",
              "Negatif",
              "Pozitif"
            ],
            [
              "Bakteriyel Gram boyama",
              "Belirgin baskın bakteri yok",
              "-",
              "Desteklemiyor"
            ],
            [
              "ARB yayma",
              "Negatif",
              "Negatif",
              "İlk örnekte destek yok"
            ],
            [
              "Influenza PCR",
              "Negatif",
              "Negatif",
              "Desteklemiyor"
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
    "question": "Bu hasta için en uygun tedavi yaklaşımı hangisidir?",
    "questionType": "tedavi",
    "answerTarget": "Hipoksemik fırsatçı pnömonide tedavi ve steroid endikasyonu",
    "diagnosis": {
      "correct": "Trimetoprim-sülfametoksazol başlamak ve hipoksemi nedeniyle sistemik kortikosteroid eklemek",
      "options": [
        "Seftriakson ve azitromisinle toplum kökenli bakteriyel pnömoni tedavisi başlamak",
        "İzoniazid, rifampisin, pirazinamid ve etambutol ile ampirik tüberküloz tedavisi başlamak",
        "Trimetoprim-sülfametoksazol başlamak ve hipoksemi nedeniyle sistemik kortikosteroid eklemek",
        "Oseltamivir başlamak ve bakteriyel/fırsatçı tedaviyi sonuçlara kadar ertelemek",
        "Flukonazol yüksek doz verip oral kandidiyazis yanıtına göre akciğer tedavisini belirlemek"
      ],
      "question": "Bu hasta için en uygun tedavi yaklaşımı hangisidir?",
      "explanation": "Subakut kuru öksürük, belirgin hipoksemi, yüksek A-a gradiyenti, CD4 düşüklüğü, oral kandidiyazis, LDH yüksekliği ve bilateral buzlu cam opasiteleri birlikte Pneumocystis jirovecii pnömonisini destekler. Orta-ağır hipoksemi varlığında TMP-SMX’e sistemik kortikosteroid eklenmesi gerekir; çünkü tedavi sırasında inflamatuvar yanıt solunum durumunu kötüleştirebilir.",
      "pearls": [
        "CD4 <200 fırsatçı pnömoni riskini artırır.",
        "Kuru öksürük ve hipoksemi, oskültasyon bulgularından daha belirgin olabilir.",
        "PaO2 <70 mmHg veya A-a gradiyenti yüksekse ek steroid düşünülür.",
        "TMP-SMX birinci basamak tedavidir."
      ],
      "optionFeedback": {
        "Seftriakson ve azitromisinle toplum kökenli bakteriyel pnömoni tedavisi başlamak": "Seftriakson-azitromisin tipik veya atipik toplum kökenli bakteriyel pnömonide uygun olabilir; özellikle lobar konsolidasyon, pürülan balgam ve nötrofilik tablo beklenir. Bu hastada sinsi başlangıçlı kuru öksürük, belirgin hipoksemi, yaygın bilateral buzlu cam paterni, yüksek LDH, oral kandidiyazis ve CD4 düşüklüğü bakteriyel lobar pnömoniden farklı bir eksen oluşturur. Sadece bu rejimle fırsatçı etken hedeflenmez.",
        "İzoniazid, rifampisin, pirazinamid ve etambutol ile ampirik tüberküloz tedavisi başlamak": "Dört ilaçlı tüberküloz tedavisi, kaviter lezyon, kronik gece terlemesi, balgamda aside dirençli basil veya yüksek klinik şüphe varsa gündeme gelir. Bu hastada akut-orta süreli kuru öksürük, difüz bilateral buzlu cam görünümü ve ciddi hücresel immün yetmezlik farklı bir fırsatçı pnömoni paternini destekler. Tüberküloz ayırıcı tanıda kalabilir; ancak bu veri setinde öncelikli tedavi hedefi değildir.",
        "Trimetoprim-sülfametoksazol başlamak ve hipoksemi nedeniyle sistemik kortikosteroid eklemek": "Bu seçenek en uygundur. CD4 64/mm³, oral kandidiyazis, kuru öksürük, yaygın bilateral buzlu cam opasiteleri, yüksek LDH ve hipoksemi Pneumocystis jirovecii pnömonisi için güçlü bir klinik-laboratuvar zinciri oluşturur. PaO2 58 mmHg ve A-a gradiyenti 48 mmHg olduğu için orta-ağır hipoksemi vardır; bu durumda TMP-SMX ana tedavi, sistemik kortikosteroid ise inflamatuvar solunum kötüleşmesini azaltmak için eklenir. Tedavi, yalnız görüntüleme sonucunu bekleyerek geciktirilmemelidir.",
        "Oseltamivir başlamak ve bakteriyel/fırsatçı tedaviyi sonuçlara kadar ertelemek": "Oseltamivir influenza için erken dönemde yararlı olabilir; ateş, miyalji, salgın teması ve viral PCR pozitifliği gibi verilerle desteklenir. Bu olguda CD4 düşüklüğü, oral kandidiyazis, yüksek LDH ve tipik yaygın buzlu cam paterni immün yetmezlik ilişkili fırsatçı pnömoniyi öne çıkarır. Antiviral tek başına hipoksemik fırsatçı pnömoni yönetimini karşılamaz.",
        "Flukonazol yüksek doz verip oral kandidiyazis yanıtına göre akciğer tedavisini belirlemek": "Flukonazol oral veya özofageal kandidiyazis tedavisinde kullanılabilir; ancak Candida pnömonisi bu bağlamda tipik bir açıklama değildir ve akciğer bulgularını oral kandidiyazise göre yönetmek hatalıdır. Oral kandidiyazis burada ağır hücresel immün yetmezliğin ipucudur. Akciğer tablosu hipoksemi ve difüz interstisyel/buzlu cam görünümüyle ayrı bir fırsatçı pnömoni tedavisi gerektirir."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "Pneumocystis jirovecii pnömonisi subakut kuru öksürük, dispne, hipoksemi, yüksek LDH ve bilateral buzlu cam opasiteleriyle gelir; orta-ağır hipoksemide TMP-SMX’e kortikosteroid eklenir.",
    "examPearl": "TUS ipucu: CD4 düşük + kuru öksürük + hipoksemi + bilateral buzlu cam + LDH yüksekliği → TMP-SMX; PaO2 düşükse steroid ekle.",
    "whyCorrect": "Doğru seçenek hem etkeni hem de hipoksemiye bağlı ek tedavi gerekliliğini birlikte hedefler.",
    "optionComparison": "Yanlış seçenekler bakteriyel pnömoni, tüberküloz, influenza ve kandidiyazis eksenlerini temsil eder; ancak bu olgudaki immünolojik ve radyolojik veri zinciriyle daha zayıftır.",
    "evidenceChain": [
      "CD4 64/mm³ + oral kandidiyazis → ağır hücresel immün yetmezlik.",
      "Kuru öksürük + yaygın buzlu cam → fırsatçı interstisyel pnömoni paterni.",
      "PaO2 58 ve A-a 48 → orta-ağır hipoksemi, steroid endikasyonu.",
      "P. jirovecii PCR pozitifliği → tedavi hedefini destekler."
    ],
    "whyWrong": "Yanlış seçenekler aynı klinik bağlamda akla gelebilecek alternatif tanı, mekanizma veya yönetim yollarını temsil eder; ancak olgudaki öykü, muayene ve objektif veri zinciri seçilen doğru hedefle daha güçlü ve güvenli biçimde örtüşür.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v304",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V303 render-safe internal-medicine cases with diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  },
{
    "id": "v305-new-714-boyun-venlerinde-dolgunluk-ve-tansiyon-dusuklugu",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "Boyun venlerinde dolgunluk ve tansiyon düşüklüğü",
    "difficulty": "Zor",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "Malignite öyküsü olan hastada hipotansiyon, belirgin juguler venöz dolgunluk, pulsus paradoxus ve ekokardiyografik sağ kalp basılanmasını birlikte yorumlayarak acil boşaltma kararını verme.",
    "learningTarget": "Hemodinamik bozulma yapan perikardiyal sıvıda diüretik, vazodilatör veya yalnız antiinflamatuvar tedavi yerine acil drenaj gerekliliğini ayırt etme.",
    "demographics": "58 yaşında kadın hasta",
    "setting": "Acil servis resüsitasyon alanı",
    "chiefComplaint": "Hasta, son iki gündür artan nefes darlığı ve ayağa kalkınca bayılacak gibi olma nedeniyle acile getiriliyor.",
    "stem": "Hasta son haftalarda merdiven çıkarken çabuk yorulduğunu, son iki gündür ise otururken bile göğsünde baskı ve nefes alamama hissi başladığını anlatır. Yakınları, sabah yataktan kalkarken gözlerinin karardığını ve kısa süre duvara tutunmak zorunda kaldığını fark ettiklerini söyler. Ağrı keskin ve sırta yırtılır tarzda değildir; belirgin balgam, ateş veya bacakta tek taraflı şişlik tariflemez. Altı ay önce akciğer adenokarsinomu tanısı almış, son kemoterapisini üç hafta önce almıştır. Evde tansiyonunun normalden düşük seyrettiğini, sıvı içmesine rağmen halsizliğinin düzelmediğini belirtir. Daha önce kalp yetmezliği veya kronik böbrek hastalığı öyküsü yoktur.",
    "patientIntro": {
      "profile": "58 yaşında kadın hasta, Acil servis resüsitasyon alanı ortamında değerlendiriliyor.",
      "presentation": "Hasta, son iki gündür artan nefes darlığı ve ayağa kalkınca bayılacak gibi olma nedeniyle acile getiriliyor.",
      "historySummary": "Hasta son haftalarda merdiven çıkarken çabuk yorulduğunu, son iki gündür ise otururken bile göğsünde baskı ve nefes alamama hissi başladığını anlatır. Yakınları, sabah yataktan kalkarken gözlerinin karardığını ve kısa süre duvara tutunmak zorunda kaldığını fark ettiklerini söyler. Ağrı keskin ve sırta yırtılır tarzda değildir; belirgin balgam, ateş veya bacakta tek taraflı şişlik tariflemez. Altı ay önce akciğer adenokarsinomu tanısı almış, son kemoterapisini üç hafta önce almıştır. Evde tansiyonunun normalden düşük seyrettiğini, sıvı içmesine rağmen halsizliğinin düzelmediğini belirtir. Daha önce kalp yetmezliği veya kronik böbrek hastalığı öyküsü yoktur."
    },
    "vitals": {
      "TA": "82/54 mmHg",
      "Nabız": "128/dk",
      "Solunum": "28/dk",
      "SpO2": "%93 oda havasında",
      "Ateş": "36.7 °C",
      "Şok indeksi": "1.56 - soğuk ekstremite ve kapiller dolumda uzama mevcut"
    },
    "exam": [
      "Hasta anksiyöz ve ortopneik, konuşurken kısa aralar veriyor.",
      "Juguler venler 45 derecede belirgin dolgun; inspiryumda beklenen çökme izlenmiyor.",
      "Kalp sesleri derinden ve boğuk duyuluyor; belirgin üfürüm yok.",
      "Akciğerlerde yaygın ral yok; pretibial ödem saptanmıyor.",
      "Pulsus paradoxus yaklaşık 16 mmHg ölçülüyor."
    ],
    "investigations": [
      {
        "id": "v305-new-714-ekg",
        "label": "EKG",
        "title": "EKG",
        "orderLabel": "EKG",
        "type": "ekg",
        "priority": "essential",
        "subtype": "12 derivasyon EKG",
        "category": "cardiology",
        "testTypeCategory": "cardiology",
        "summary": "Sinüs taşikardisi ve düşük voltajlı QRS kompleksleri vardır.",
        "clinicalMeaning": "Sinüs taşikardisi ve düşük voltajlı QRS kompleksleri vardır.",
        "result": {
          "title": "EKG",
          "summary": "Sinüs taşikardisi ve düşük voltajlı QRS kompleksleri vardır.",
          "interpretation": "Sinüs taşikardisi ve düşük voltajlı QRS kompleksleri vardır.",
          "values": [
            [
              "Ritim",
              "Sinüs taşikardisi",
              "60-100/dk",
              "Hızlı"
            ],
            [
              "QRS voltajı",
              "Ekstremite derivasyonlarında düşük",
              "Normal voltaj",
              "Düşük"
            ],
            [
              "ST elevasyonu",
              "Yok",
              "Yok",
              "Akut STEMI paterni yok"
            ],
            [
              "Elektriksel alternans",
              "Hafif değişken QRS amplitüdü",
              "Yok",
              "Destekleyici bulgu"
            ]
          ]
        }
      },
      {
        "id": "v305-new-714-akciger-grafisi",
        "label": "Akciğer grafisi",
        "title": "Akciğer grafisi",
        "orderLabel": "Akciğer grafisi",
        "type": "imaging",
        "priority": "essential",
        "subtype": "Direkt grafi",
        "category": "imaging",
        "testTypeCategory": "imaging",
        "summary": "Kardiyak silüet geniş, belirgin alveoler ödem görünümü yoktur.",
        "clinicalMeaning": "Kardiyak silüet geniş, belirgin alveoler ödem görünümü yoktur.",
        "result": {
          "title": "Akciğer grafisi",
          "summary": "Kardiyak silüet geniş, belirgin alveoler ödem görünümü yoktur.",
          "interpretation": "Kardiyak silüet geniş, belirgin alveoler ödem görünümü yoktur.",
          "narrative": "Kardiyotorasik oran artmış görünür; akciğer alanlarında yaygın Kerley çizgisi veya belirgin plevral sıvı izlenmez."
        }
      },
      {
        "id": "v305-new-714-yatak-basi-eko",
        "label": "Yatak başı transtorasik ekokardiyografi",
        "title": "Yatak başı transtorasik ekokardiyografi",
        "orderLabel": "Yatak başı transtorasik ekokardiyografi",
        "type": "imaging",
        "priority": "essential",
        "subtype": "Ekokardiyografi",
        "category": "imaging",
        "testTypeCategory": "imaging",
        "summary": "Büyük perikardiyal sıvı ve sağ kalp boşluklarında diyastolik basılanma izlenir.",
        "clinicalMeaning": "Büyük perikardiyal sıvı ve sağ kalp boşluklarında diyastolik basılanma izlenir.",
        "result": {
          "title": "Yatak başı transtorasik ekokardiyografi",
          "summary": "Büyük perikardiyal sıvı ve sağ kalp boşluklarında diyastolik basılanma izlenir.",
          "interpretation": "Büyük perikardiyal sıvı ve sağ kalp boşluklarında diyastolik basılanma izlenir.",
          "values": [
            [
              "Perikardiyal sıvı",
              "Sirkumferensiyel, en geniş yerde 24 mm",
              "Yok/minimal",
              "Büyük"
            ],
            [
              "Sağ atriyum",
              "Geç diyastolde kollaps",
              "Kollaps yok",
              "Basınç etkisi"
            ],
            [
              "Sağ ventrikül",
              "Erken diyastolik kollaps",
              "Kollaps yok",
              "Basınç etkisi"
            ],
            [
              "IVC",
              "Dilate, inspiratuvar kollaps <%20",
              "Kollaps >%50",
              "Yüksek sağ atriyum basıncı"
            ],
            [
              "LVEF",
              "%60",
              "%55-70",
              "Korunmuş"
            ]
          ]
        }
      },
      {
        "id": "v305-new-714-lab",
        "label": "Temel laboratuvar",
        "title": "Temel laboratuvar",
        "orderLabel": "Temel laboratuvar",
        "type": "lab",
        "priority": "essential",
        "subtype": "Acil biyokimya ve hemogram",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Belirgin enfeksiyon, ağır anemi veya masif böbrek yetmezliği bulgusu yoktur.",
        "clinicalMeaning": "Belirgin enfeksiyon, ağır anemi veya masif böbrek yetmezliği bulgusu yoktur.",
        "result": {
          "title": "Temel laboratuvar",
          "summary": "Belirgin enfeksiyon, ağır anemi veya masif böbrek yetmezliği bulgusu yoktur.",
          "interpretation": "Belirgin enfeksiyon, ağır anemi veya masif böbrek yetmezliği bulgusu yoktur.",
          "values": [
            [
              "Hemoglobin",
              "11.4 g/dL",
              "12-16 g/dL",
              "Hafif düşük"
            ],
            [
              "Lökosit",
              "7.900/mm³",
              "4.000-10.000/mm³",
              "Normal"
            ],
            [
              "Kreatinin",
              "0.9 mg/dL",
              "0.6-1.2 mg/dL",
              "Normal"
            ],
            [
              "Troponin I",
              "0.018 ng/mL",
              "<0.04 ng/mL",
              "Belirgin yüksek değil"
            ],
            [
              "Laktat",
              "3.1 mmol/L",
              "<2 mmol/L",
              "Hipoperfüzyonla uyumlu yüksek"
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
    "question": "Bu hastada acil yönetimde öncelikli basamak hangisidir?",
    "questionType": "Acil yönetim",
    "answerTarget": "Hemodinamik bozulma oluşturan perikardiyal sıvıda ilk hayat kurtarıcı yaklaşımı seçme.",
    "diagnosis": {
      "correct": "Ekokardiyografi eşliğinde acil perikardiyal drenaj yapmak",
      "options": [
        "İntravenöz furosemid ve nitratla pulmoner konjesyonu azaltmak",
        "Yüksek doz NSAİİ ve kolşisin başlayıp serviste yakın izlemek",
        "Ekokardiyografi eşliğinde acil perikardiyal drenaj yapmak",
        "Önce toraks BT anjiyografi çekip emboli dışlandıktan sonra tedavi planlamak",
        "Geniş spektrum antibiyotik verip sıvı kültür sonucuna kadar girişim yapmamak"
      ],
      "question": "Bu hastada acil yönetimde öncelikli basamak hangisidir?",
      "explanation": "Hipotansiyon, taşikardi, juguler venöz dolgunluk, boğuk kalp sesleri, pulsus paradoxus, düşük voltajlı EKG, büyük perikardiyal sıvı ve sağ kalp boşluklarında diyastolik kollaps birlikte obstrüktif şok fizyolojisini gösterir. Bu durumda tedavi, perikard boşluğundaki basıncı azaltan acil drenajdır; diüretik veya vazodilatör gibi preload azaltıcı yaklaşımlar dolaşımı daha da bozabilir.",
      "pearls": [
        "Hipotansiyon + JVD + boğuk kalp sesleri klasik ancak her zaman tam olmayabilir.",
        "Pulsus paradoxus ve sağ kalp diyastolik kollapsı hemodinamik etkiyi destekler.",
        "Belirgin pulmoner ral olmadan şok ve JVD, kardiyojenik ödemden farklıdır.",
        "Stabil olmayan hastada görüntüleme süreci tedaviyi geciktirmemelidir."
      ],
      "optionFeedback": {
        "İntravenöz furosemid ve nitratla pulmoner konjesyonu azaltmak": "Bu yaklaşım hipertansif akut pulmoner ödemde veya volüm yüklenmesi belirgin kalp yetmezliğinde uygun olabilir. Bu olguda akciğerlerde yaygın ral yok, EKO’da sol ventrikül sistolik fonksiyonu korunmuş ve temel sorun kalp odacıklarının dıştan bası altında yeterli dolamamasıdır. Furosemid ve nitrat preload’u azaltarak sağ kalbe dönen kanı daha da düşürebilir; bu da zaten düşük olan stroke volume ve tansiyonu kötüleştirir.",
        "Yüksek doz NSAİİ ve kolşisin başlayıp serviste yakın izlemek": "NSAİİ-kolşisin, hemodinamik stabil akut perikardit veya inflamatuvar perikardiyal efüzyonda kullanılabilir. Ancak bu hastada sadece perikard ağrısı veya inflamasyon değil, hipotansiyon, soğuk ekstremite, pulsus paradoxus ve sağ kalp kollapsı ile dolaşım bozukluğu vardır. Antiinflamatuvar tedavi altta yatan süreci hedefleyebilir ama acil basınç boşaltma ihtiyacının yerine geçmez.",
        "Ekokardiyografi eşliğinde acil perikardiyal drenaj yapmak": "Bu seçenek en uygundur. Büyük perikardiyal sıvı, sağ atriyum ve sağ ventrikül diyastolik kollapsı, dilate IVC, düşük tansiyon, taşikardi ve pulsus paradoxus birlikte perikard boşluğundaki basıncın kalp doluşunu kısıtladığını gösterir. Tedavinin amacı perikard içi basıncı hızla azaltıp venöz dönüşün kalp debisine dönüşmesini sağlamaktır. Eş zamanlı oksijen, damar yolu, dikkatli sıvı desteği ve vazopressör gerekebilir; ancak hayat kurtarıcı özgül basamak drenajdır.",
        "Önce toraks BT anjiyografi çekip emboli dışlandıktan sonra tedavi planlamak": "Pulmoner emboli akut nefes darlığı ve taşikardi yapabilir; tek taraflı bacak şişliği, pleuritik ağrı, ciddi hipoksemi veya sağ ventrikül yüklenmesiyle gündeme gelebilir. Bu hastada yatak başı EKO zaten büyük perikardiyal sıvı ve sağ boşluk basılanmasını göstermektedir. Hemodinamik bozukluğu olan bir hastayı BT için taşımak tedaviyi geciktirir ve dolaşım kollapsı riskini artırır.",
        "Geniş spektrum antibiyotik verip sıvı kültür sonucuna kadar girişim yapmamak": "Pürülan perikardit veya septik tablo varsa antibiyotik gerekir; ancak burada ateş, belirgin lökositoz veya primer enfeksiyon odağı ön planda değildir. Malignite öyküsü perikardiyal sıvının olası nedenlerinden biridir fakat neden ne olursa olsun hemodinamik etkili sıvı acil boşaltılmalıdır. Kültür veya sitoloji tanısal değer taşır; fakat sonucu beklemek dolaşımı düzelten basamağı geciktirir."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "Hemodinamik bozulma yapan perikardiyal sıvıda temel sorun ventrikül doluşunun dıştan basıyla kısıtlanmasıdır; stabil olmayan hastada acil ekokardiyografi eşliğinde drenaj önceliklidir.",
    "examPearl": "TUS ipucu: hipotansiyon + JVD + pulsus paradoxus + EKO’da sağ kalp kollapsı → preload azaltma değil acil perikardiyal drenaj.",
    "whyCorrect": "Doğru seçenek, bu hastadaki obstrüktif şok mekanizmasını doğrudan ortadan kaldıran tek yaklaşımdır.",
    "optionComparison": "Yanlış seçenekler pulmoner ödem, stabil perikardit, pulmoner emboli ve enfeksiyon eksenlerini temsil eder; ancak olguda acil dolaşım bozukluğunu açıklayan veri zinciri perikardiyal bası üzerindedir.",
    "evidenceChain": [
      "Hipotansiyon + taşikardi + soğuk ekstremite → düşük kardiyak debi ve hipoperfüzyon.",
      "JVD + ral yokluğu → volüm yükünden çok sağ kalp doluş engeli düşünülür.",
      "Pulsus paradoxus 16 mmHg → inspiryumda sol ventrikül doluşunun belirgin azalması.",
      "Büyük perikardiyal sıvı + sağ atriyum/ventrikül kollapsı → acil basınç boşaltma gerektiren mekanik etki."
    ],
    "whyWrong": "Yanlış seçenekler aynı yakınmayla karışabilecek alternatif yönetimleri temsil eder; ancak bu hastanın objektif verileri dolaşımı düzeltecek girişimin geciktirilmemesi gerektiğini gösterir.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v305",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V304 render-safe internal-medicine cases with diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  },
{
    "id": "v305-new-715-kanli-kusma-ve-bas-donmesi",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "Kanlı kusma ve baş dönmesi",
    "difficulty": "Zor",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "Dekompanse karaciğer hastalığı zemininde üst gastrointestinal kanama bulgularını portal hipertansiyon yönetim sıralamasıyla ilişkilendirme.",
    "learningTarget": "Sirozlu hastada hematemez geliştiğinde resüsitasyonla birlikte vasoaktif tedavi, antibiyotik profilaksisi ve erken endoskopik band ligasyonu yaklaşımını ayırt etme.",
    "demographics": "49 yaşında erkek hasta",
    "setting": "Acil servis kırmızı alan",
    "chiefComplaint": "Hasta, aniden başlayan kanlı kusma ve ayakta dururken baş dönmesi nedeniyle ambulansla getiriliyor.",
    "stem": "Hasta akşam yemeğinden sonra bulantı hissettiğini, ardından bir bardaktan fazla koyu kırmızı kan kustuğunu anlatır. Son iki gündür dışkısının siyaha yakın renkte olduğunu fark etmiş, fakat karın ağrısı veya ishal tariflememiştir. Bilinen kronik hepatit B ve siroz öyküsü vardır; daha önce karnında sıvı birikmesi nedeniyle ilaç kullanmıştır. Son haftalarda alkol almadığını, ancak düzenli kontrollerini aksattığını söyler. Ağrı kesici olarak ara sıra parasetamol kullandığını, NSAİİ veya kan sulandırıcı almadığını belirtir. Başvuru sırasında susuzluk hissi ve ayağa kalkınca fenalaşma tarifler.",
    "patientIntro": {
      "profile": "49 yaşında erkek hasta, Acil servis kırmızı alan ortamında değerlendiriliyor.",
      "presentation": "Hasta, aniden başlayan kanlı kusma ve ayakta dururken baş dönmesi nedeniyle ambulansla getiriliyor.",
      "historySummary": "Hasta akşam yemeğinden sonra bulantı hissettiğini, ardından bir bardaktan fazla koyu kırmızı kan kustuğunu anlatır. Son iki gündür dışkısının siyaha yakın renkte olduğunu fark etmiş, fakat karın ağrısı veya ishal tariflememiştir. Bilinen kronik hepatit B ve siroz öyküsü vardır; daha önce karnında sıvı birikmesi nedeniyle ilaç kullanmıştır. Son haftalarda alkol almadığını, ancak düzenli kontrollerini aksattığını söyler. Ağrı kesici olarak ara sıra parasetamol kullandığını, NSAİİ veya kan sulandırıcı almadığını belirtir. Başvuru sırasında susuzluk hissi ve ayağa kalkınca fenalaşma tarifler."
    },
    "vitals": {
      "TA": "94/58 mmHg",
      "Nabız": "122/dk",
      "Solunum": "22/dk",
      "SpO2": "%96 oda havasında",
      "Ateş": "37.4 °C",
      "Şok indeksi": "1.30 - aktif kanama ve hipovolemi lehine"
    },
    "exam": [
      "Hasta soluk ve terli, ancak sorulara yanıt verebiliyor.",
      "Skleralarda hafif ikter, gövdede spider anjiomlar ve palmar eritem görülüyor.",
      "Batında hafif asit dalgalanması var; defans veya rebound yok.",
      "Rektal muayenede melena ile uyumlu siyah, kötü kokulu dışkı görülüyor.",
      "Asteriksis belirgin değil; periferik ödem hafif."
    ],
    "investigations": [
      {
        "id": "v305-new-715-hemogram",
        "label": "Hemogram",
        "title": "Hemogram",
        "orderLabel": "Hemogram",
        "type": "lab",
        "priority": "essential",
        "subtype": "Tam kan sayımı",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Akut kan kaybı ve portal hipertansiyon zeminindeki trombositopeni ile uyumlu değerler vardır.",
        "clinicalMeaning": "Akut kan kaybı ve portal hipertansiyon zeminindeki trombositopeni ile uyumlu değerler vardır.",
        "result": {
          "title": "Hemogram",
          "summary": "Akut kan kaybı ve portal hipertansiyon zeminindeki trombositopeni ile uyumlu değerler vardır.",
          "interpretation": "Akut kan kaybı ve portal hipertansiyon zeminindeki trombositopeni ile uyumlu değerler vardır.",
          "values": [
            [
              "Hemoglobin",
              "8.1 g/dL",
              "13.5-17.5 g/dL",
              "Düşük"
            ],
            [
              "MCV",
              "89 fL",
              "80-100 fL",
              "Normositer"
            ],
            [
              "Trombosit",
              "72.000/mm³",
              "150.000-400.000/mm³",
              "Düşük"
            ],
            [
              "Lökosit",
              "6.800/mm³",
              "4.000-10.000/mm³",
              "Normal"
            ]
          ]
        }
      },
      {
        "id": "v305-new-715-koagulasyon",
        "label": "Koagülasyon ve karaciğer sentez göstergeleri",
        "title": "Koagülasyon ve karaciğer sentez göstergeleri",
        "orderLabel": "Koagülasyon ve karaciğer sentez göstergeleri",
        "type": "lab",
        "priority": "essential",
        "subtype": "Koagülasyon paneli",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Karaciğer sentez bozukluğu ve kanama riskiyle uyumlu bozulma vardır.",
        "clinicalMeaning": "Karaciğer sentez bozukluğu ve kanama riskiyle uyumlu bozulma vardır.",
        "result": {
          "title": "Koagülasyon ve karaciğer sentez göstergeleri",
          "summary": "Karaciğer sentez bozukluğu ve kanama riskiyle uyumlu bozulma vardır.",
          "interpretation": "Karaciğer sentez bozukluğu ve kanama riskiyle uyumlu bozulma vardır.",
          "values": [
            [
              "INR",
              "1.8",
              "0.8-1.2",
              "Yüksek"
            ],
            [
              "Albumin",
              "2.6 g/dL",
              "3.5-5.0 g/dL",
              "Düşük"
            ],
            [
              "Total bilirubin",
              "3.4 mg/dL",
              "0.2-1.2 mg/dL",
              "Yüksek"
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
        "id": "v305-new-715-biyokimya",
        "label": "Böbrek fonksiyonu ve üre",
        "title": "Böbrek fonksiyonu ve üre",
        "orderLabel": "Böbrek fonksiyonu ve üre",
        "type": "lab",
        "priority": "essential",
        "subtype": "Biyokimya",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Üre yüksekliği üst gastrointestinal kanama ve volüm kaybını destekler.",
        "clinicalMeaning": "Üre yüksekliği üst gastrointestinal kanama ve volüm kaybını destekler.",
        "result": {
          "title": "Böbrek fonksiyonu ve üre",
          "summary": "Üre yüksekliği üst gastrointestinal kanama ve volüm kaybını destekler.",
          "interpretation": "Üre yüksekliği üst gastrointestinal kanama ve volüm kaybını destekler.",
          "values": [
            [
              "Üre",
              "78 mg/dL",
              "17-43 mg/dL",
              "Yüksek"
            ],
            [
              "Kreatinin",
              "1.2 mg/dL",
              "0.7-1.3 mg/dL",
              "Sınırda"
            ],
            [
              "Sodyum",
              "132 mmol/L",
              "135-145 mmol/L",
              "Hafif düşük"
            ],
            [
              "Laktat",
              "2.8 mmol/L",
              "<2 mmol/L",
              "Yüksek"
            ]
          ]
        }
      },
      {
        "id": "v305-new-715-usg",
        "label": "Yatak başı abdominal ultrason",
        "title": "Yatak başı abdominal ultrason",
        "orderLabel": "Yatak başı abdominal ultrason",
        "type": "imaging",
        "priority": "essential",
        "subtype": "Ultrasonografi",
        "category": "imaging",
        "testTypeCategory": "imaging",
        "summary": "Kronik karaciğer hastalığı ve portal hipertansiyon lehine bulgular vardır.",
        "clinicalMeaning": "Kronik karaciğer hastalığı ve portal hipertansiyon lehine bulgular vardır.",
        "result": {
          "title": "Yatak başı abdominal ultrason",
          "summary": "Kronik karaciğer hastalığı ve portal hipertansiyon lehine bulgular vardır.",
          "interpretation": "Kronik karaciğer hastalığı ve portal hipertansiyon lehine bulgular vardır.",
          "narrative": "Karaciğer konturları nodüler, dalak uzun aksı 15.5 cm, batında az-orta miktarda serbest sıvı izleniyor; belirgin safra yolu dilatasyonu yok."
        }
      },
      {
        "id": "v305-new-715-endoskopi",
        "label": "Acil üst gastrointestinal endoskopi",
        "title": "Acil üst gastrointestinal endoskopi",
        "orderLabel": "Acil üst gastrointestinal endoskopi",
        "type": "procedure",
        "priority": "essential",
        "subtype": "Endoskopi",
        "category": "procedure",
        "testTypeCategory": "procedure",
        "summary": "Özofagus distalinde yüksek riskli kanama odağı görülür.",
        "clinicalMeaning": "Özofagus distalinde yüksek riskli kanama odağı görülür.",
        "result": {
          "title": "Acil üst gastrointestinal endoskopi",
          "summary": "Özofagus distalinde yüksek riskli kanama odağı görülür.",
          "interpretation": "Özofagus distalinde yüksek riskli kanama odağı görülür.",
          "narrative": "Resüsitasyon ve hava yolu değerlendirmesi sonrası yapılan endoskopide distal özofagusta genişlemiş venöz yapılar ve kırmızı wale işaretleri izlenir; aktif sızıntı alanına band ligasyonu uygulanabilir görünüm vardır."
        }
      }
    ],
    "useSyntheticInvestigationBank": true,
    "managementSequence": {
      "enabled": false
    },
    "hideExamSignal": true,
    "question": "Bu hasta için en uygun erken tedavi paketi hangisidir?",
    "questionType": "Tedavi ve acil yaklaşım",
    "answerTarget": "Portal hipertansiyon zemininde üst gastrointestinal kanamada erken kombine tedavi yaklaşımını seçme.",
    "diagnosis": {
      "correct": "Kristalloid ve hedefli kan replasmanı ile birlikte vasoaktif ilaç, seftriakson ve erken endoskopik band ligasyonu uygulamak",
      "options": [
        "Kristalloid ve hedefli kan replasmanı ile birlikte vasoaktif ilaç, seftriakson ve erken endoskopik band ligasyonu uygulamak",
        "Yalnız proton pompa inhibitörü infüzyonu verip endoskopiyi hemodinami tamamen normale dönene kadar ertelemek",
        "Taze donmuş plazma ve trombosit verip INR normale dönmeden endoskopiye geçmemek",
        "Laktüloz ve rifaksimin başlatıp kanamanın spontan durmasını izlemek",
        "Geniş spektrum antibiyotik başlayıp vasoaktif tedaviyi endoskopi sonucuna kadar bekletmek"
      ],
      "question": "Bu hasta için en uygun erken tedavi paketi hangisidir?",
      "explanation": "Siroz zemininde hematemez, melena, trombositopeni, splenomegali, asit ve distal özofagusta yüksek riskli venöz yapılar portal hipertansiyon ilişkili üst gastrointestinal kanamayı destekler. Erken yaklaşım tek bir ilaçtan ibaret değildir: hava yolu ve dolaşım güvenliği sağlanır, hedefli kan replasmanı yapılır, vasoaktif tedavi ve antibiyotik profilaksisi erken başlanır, ardından geciktirilmeden endoskopik band ligasyonu uygulanır.",
      "pearls": [
        "Sirozlu hastada hematemez aksi kanıtlanana kadar portal hipertansiyon ilişkili kabul edilmelidir.",
        "Vasoaktif tedavi endoskopiyi beklemeden başlanır.",
        "Antibiyotik profilaksisi enfeksiyon ve yeniden kanama riskini azaltır.",
        "Endoskopik band ligasyonu özofageal kaynaklı kanamada temel girişimdir."
      ],
      "optionFeedback": {
        "Kristalloid ve hedefli kan replasmanı ile birlikte vasoaktif ilaç, seftriakson ve erken endoskopik band ligasyonu uygulamak": "Bu seçenek en uygundur. Hasta aktif üst gastrointestinal kanama ve hipovolemi bulgularıyla gelmektedir; öncelikle damar yolu, dikkatli kristalloid, hedefli eritrosit replasmanı ve hava yolu güvenliği düşünülür. Siroz zemininde portal hipertansiyon bulguları olduğu için vasoaktif tedavi endoskopi öncesinde başlanmalı, bakteriyel enfeksiyon ve yeniden kanama riskini azaltmak için seftriakson verilmelidir. Endoskopide distal özofagusta yüksek riskli venöz yapı görüldüğünden band ligasyonu erken dönemde uygulanacak özgül kaynak kontrolüdür.",
        "Yalnız proton pompa inhibitörü infüzyonu verip endoskopiyi hemodinami tamamen normale dönene kadar ertelemek": "PPI infüzyonu peptik ülser kanamasında yararlıdır ve üst GİS kanamasında başlangıçta verilebilir; ancak bu hastada siroz, splenomegali, trombositopeni, asit ve endoskopik venöz yapı portal hipertansiyon kaynaklı kanamayı güçlü destekler. Yalnız PPI tedavisi portal basıncı düşürmez ve kanama odağını kontrol etmez. Hemodinamik stabilizasyon hedeflenir ama endoskopik tedavi gereksiz yere uzun süre ertelenmez.",
        "Taze donmuş plazma ve trombosit verip INR normale dönmeden endoskopiye geçmemek": "Koagülasyon bozukluğu sirozda sık görülür; ancak INR’nin tamamen normale döndürülmesi hem gerçek hemostazı güvenilir biçimde yansıtmaz hem de endoskopik kaynak kontrolünü geciktirebilir. Trombosit veya plazma, belirli eşikler ve klinik kanama bağlamında seçici kullanılabilir. Bu seçenek, asıl erken tedavi üçlüsü olan vasoaktif ilaç, antibiyotik profilaksisi ve endoskopik ligasyonu geri plana attığı için hatalıdır.",
        "Laktüloz ve rifaksimin başlatıp kanamanın spontan durmasını izlemek": "Laktüloz ve rifaksimin hepatik ensefalopati yönetiminde kullanılır; kanama sonrası ensefalopati riski artabileceği için daha sonra gündeme gelebilir. Ancak bu hastanın acil sorunu aktif kanama ve hipovolemidir. Kanamanın spontan durmasını beklemek, dolaşım bozukluğu ve aspirasyon riski olan bir hastada güvenli değildir; kaynak kontrolü ve portal basıncı azaltan tedavi önceliklidir.",
        "Geniş spektrum antibiyotik başlayıp vasoaktif tedaviyi endoskopi sonucuna kadar bekletmek": "Antibiyotik profilaksisi doğru yaklaşımın önemli bir parçasıdır; ancak tek başına yeterli değildir. Vasoaktif tedavi endoskopi sonucunu beklemeden başlanmalıdır çünkü portal hipertansiyon ilişkili kanamada splanchnik kan akımını ve portal basıncı azaltarak erken kanama kontrolüne katkı sağlar. Bu seçenek tedavinin bir bileşenini içerir fakat kritik vasoaktif ve endoskopik basamakları geciktirdiği için eksiktir."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "Sirozlu hastada akut hematemez yönetimi resüsitasyon, vasoaktif ilaç, antibiyotik profilaksisi ve erken endoskopik kaynak kontrolünün birlikte uygulanmasını gerektirir.",
    "examPearl": "TUS ipucu: siroz + hematemez/melena + splenomegali/trombositopeni → vasoaktif tedavi + antibiyotik + erken endoskopik band ligasyonu.",
    "whyCorrect": "Doğru seçenek hem hipovolemiyi hem portal hipertansiyon kaynaklı kanamayı hem de enfeksiyon riskini eş zamanlı hedefler.",
    "optionComparison": "Yanlış seçenekler peptik ülser, koagülasyon düzeltme, ensefalopati ve antibiyotik eksenlerine takılır; doğru yaklaşım ise kombine erken yönetim paketidir.",
    "evidenceChain": [
      "Hematemez + melena + üre yüksekliği → üst gastrointestinal kanama.",
      "Siroz öyküsü + asit + splenomegali + trombositopeni → portal hipertansiyon zemini.",
      "TA 94/58 + nabız 122 + laktat 2.8 → aktif kanama/hipovolemi etkisi.",
      "Distal özofagusta geniş venöz yapı + kırmızı wale → endoskopik ligasyon gerektiren kaynak."
    ],
    "whyWrong": "Yanlış seçenekler gerçek klinikte akla gelebilecek ancak bu hastanın portal hipertansiyon kanaması bağlamında tek başına yetersiz veya geciktirici olan stratejilerdir.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v305",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V304 render-safe internal-medicine cases with diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  },
{
    "id": "v305-new-716-diz-ameliyati-sonrasi-trombosit-dususu-ve-bacak-agrisi",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "Diz ameliyatı sonrası trombosit düşüşü ve bacak ağrısı",
    "difficulty": "Zor",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "Heparin maruziyeti sonrası 5-10. günde gelişen trombosit düşüşü ve yeni tromboz bulgusunu immun aracılı prokoagülan mekanizma ile ilişkilendirme.",
    "learningTarget": "HIT şüphesinde tüm heparinlerin kesilmesi, PF4-heparin antikoru için test istenmesi ve heparin dışı terapötik antikoagülasyon başlanması gerektiğini ayırt etme.",
    "demographics": "66 yaşında erkek hasta",
    "setting": "Ortopedi servisinde dahiliye konsültasyonu",
    "chiefComplaint": "Hasta, diz protezi ameliyatından sonra sol baldırda yeni başlayan ağrı ve şişlik nedeniyle değerlendiriliyor.",
    "stem": "Hasta bir hafta önce sol diz protezi ameliyatı olduğunu, ameliyat sonrası yürütülmeye başlandığını ancak dün akşamdan beri sol baldırında giderek artan gerginlik ve ağrı hissettiğini anlatır. Ağrı yürüyünce artmakta, istirahatte tam geçmemektedir. Profilaksi amacıyla ameliyat sonrası her gün düşük molekül ağırlıklı heparin yapılmıştır. Kanama, burun kanaması, idrarda kan veya morarma artışı tariflemez. Daha önce bilinen trombosit hastalığı yoktur; ameliyat öncesi kan sayımının normal olduğu söylenmiştir. Göğüs ağrısı veya ani nefes darlığı yoktur fakat bacağındaki şişlik nedeniyle serviste dahiliye görüşü istenmiştir.",
    "patientIntro": {
      "profile": "66 yaşında erkek hasta, Ortopedi servisinde dahiliye konsültasyonu ortamında değerlendiriliyor.",
      "presentation": "Hasta, diz protezi ameliyatından sonra sol baldırda yeni başlayan ağrı ve şişlik nedeniyle değerlendiriliyor.",
      "historySummary": "Hasta bir hafta önce sol diz protezi ameliyatı olduğunu, ameliyat sonrası yürütülmeye başlandığını ancak dün akşamdan beri sol baldırında giderek artan gerginlik ve ağrı hissettiğini anlatır. Ağrı yürüyünce artmakta, istirahatte tam geçmemektedir. Profilaksi amacıyla ameliyat sonrası her gün düşük molekül ağırlıklı heparin yapılmıştır. Kanama, burun kanaması, idrarda kan veya morarma artışı tariflemez. Daha önce bilinen trombosit hastalığı yoktur; ameliyat öncesi kan sayımının normal olduğu söylenmiştir. Göğüs ağrısı veya ani nefes darlığı yoktur fakat bacağındaki şişlik nedeniyle serviste dahiliye görüşü istenmiştir."
    },
    "vitals": {
      "TA": "126/78 mmHg",
      "Nabız": "96/dk",
      "Solunum": "18/dk",
      "SpO2": "%97 oda havasında",
      "Ateş": "37.1 °C",
      "Şok indeksi": "0.76 - hemodinamik olarak stabil"
    },
    "exam": [
      "Genel durumu iyi, bilinç açık ve oryante.",
      "Sol baldır sağa göre 3 cm daha geniş ölçülüyor; palpasyonla hassasiyet var.",
      "Diz cerrahi alanında beklenen postoperatif hassasiyet dışında aktif kanama veya belirgin enfeksiyon bulgusu yok.",
      "Ciltte yaygın peteşi veya purpura izlenmiyor.",
      "Akciğer oskültasyonu doğal; sağ kalp yüklenmesi düşündüren belirgin bulgu yok."
    ],
    "investigations": [
      {
        "id": "v305-new-716-trombosit-trendi",
        "label": "Trombosit trendi",
        "title": "Trombosit trendi",
        "orderLabel": "Trombosit trendi",
        "type": "lab",
        "priority": "essential",
        "subtype": "Seri tam kan sayımı",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Trombosit sayısında heparin maruziyetinden sonra belirgin oransal düşüş vardır.",
        "clinicalMeaning": "Trombosit sayısında heparin maruziyetinden sonra belirgin oransal düşüş vardır.",
        "result": {
          "title": "Trombosit trendi",
          "summary": "Trombosit sayısında heparin maruziyetinden sonra belirgin oransal düşüş vardır.",
          "interpretation": "Trombosit sayısında heparin maruziyetinden sonra belirgin oransal düşüş vardır.",
          "values": [
            [
              "Ameliyat öncesi trombosit",
              "246.000/mm³",
              "150.000-400.000/mm³",
              "Normal"
            ],
            [
              "Postop 3. gün trombosit",
              "218.000/mm³",
              "150.000-400.000/mm³",
              "Normal"
            ],
            [
              "Postop 7. gün trombosit",
              "92.000/mm³",
              "150.000-400.000/mm³",
              "Belirgin düşük"
            ],
            [
              "Hemoglobin",
              "10.8 g/dL",
              "13.5-17.5 g/dL",
              "Postoperatif hafif düşük"
            ],
            [
              "Lökosit",
              "8.700/mm³",
              "4.000-10.000/mm³",
              "Normal"
            ]
          ]
        }
      },
      {
        "id": "v305-new-716-koagulasyon",
        "label": "Koagülasyon paneli",
        "title": "Koagülasyon paneli",
        "orderLabel": "Koagülasyon paneli",
        "type": "lab",
        "priority": "essential",
        "subtype": "PT/aPTT/fibrinojen",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Yaygın tüketim koagülopatisini destekleyen belirgin bozulma yoktur.",
        "clinicalMeaning": "Yaygın tüketim koagülopatisini destekleyen belirgin bozulma yoktur.",
        "result": {
          "title": "Koagülasyon paneli",
          "summary": "Yaygın tüketim koagülopatisini destekleyen belirgin bozulma yoktur.",
          "interpretation": "Yaygın tüketim koagülopatisini destekleyen belirgin bozulma yoktur.",
          "values": [
            [
              "PT/INR",
              "1.05",
              "0.8-1.2",
              "Normal"
            ],
            [
              "aPTT",
              "31 sn",
              "25-35 sn",
              "Normal"
            ],
            [
              "Fibrinojen",
              "420 mg/dL",
              "200-400 mg/dL",
              "Hafif yüksek"
            ],
            [
              "D-dimer",
              "2.1 mg/L FEU",
              "<0.5 mg/L FEU",
              "Postoperatif/trombotik süreçte yüksek"
            ]
          ]
        }
      },
      {
        "id": "v305-new-716-venoz-doppler",
        "label": "Alt ekstremite venöz Doppler USG",
        "title": "Alt ekstremite venöz Doppler USG",
        "orderLabel": "Alt ekstremite venöz Doppler USG",
        "type": "imaging",
        "priority": "essential",
        "subtype": "Doppler ultrasonografi",
        "category": "imaging",
        "testTypeCategory": "imaging",
        "summary": "Sol alt ekstremitede akut derin ven trombozu ile uyumlu bulgu vardır.",
        "clinicalMeaning": "Sol alt ekstremitede akut derin ven trombozu ile uyumlu bulgu vardır.",
        "result": {
          "title": "Alt ekstremite venöz Doppler USG",
          "summary": "Sol alt ekstremitede akut derin ven trombozu ile uyumlu bulgu vardır.",
          "interpretation": "Sol alt ekstremitede akut derin ven trombozu ile uyumlu bulgu vardır.",
          "narrative": "Sol popliteal ven ve posterior tibial venlerde kompresibilite kaybı ve intraluminal ekojen materyal izlenir; sağ bacak venleri komprese edilebilir."
        }
      },
      {
        "id": "v305-new-716-4t",
        "label": "4T klinik olasılık skoru",
        "title": "4T klinik olasılık skoru",
        "orderLabel": "4T klinik olasılık skoru",
        "type": "procedure",
        "priority": "essential",
        "subtype": "Klinik skor",
        "category": "procedure",
        "testTypeCategory": "procedure",
        "summary": "Trombosit düşüşü, zamanlama ve yeni tromboz nedeniyle yüksek olasılık puanı hesaplanır.",
        "clinicalMeaning": "Trombosit düşüşü, zamanlama ve yeni tromboz nedeniyle yüksek olasılık puanı hesaplanır.",
        "result": {
          "title": "4T klinik olasılık skoru",
          "summary": "Trombosit düşüşü, zamanlama ve yeni tromboz nedeniyle yüksek olasılık puanı hesaplanır.",
          "interpretation": "Trombosit düşüşü, zamanlama ve yeni tromboz nedeniyle yüksek olasılık puanı hesaplanır.",
          "values": [
            [
              "Trombosit düşüşü",
              ">%50 düşüş",
              "0-2 puan",
              "2 puan"
            ],
            [
              "Zamanlama",
              "5-10. gün",
              "0-2 puan",
              "2 puan"
            ],
            [
              "Tromboz",
              "Yeni DVT",
              "0-2 puan",
              "2 puan"
            ],
            [
              "Alternatif neden",
              "Belirgin güçlü alternatif yok",
              "0-2 puan",
              "1 puan"
            ],
            [
              "Toplam",
              "7/8",
              "0-3 düşük, 4-5 orta, 6-8 yüksek",
              "Yüksek olasılık"
            ]
          ]
        }
      },
      {
        "id": "v305-new-716-pf4",
        "label": "PF4-heparin antikor testi",
        "title": "PF4-heparin antikor testi",
        "orderLabel": "PF4-heparin antikor testi",
        "type": "lab",
        "priority": "essential",
        "subtype": "İmmünolojik test",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "İmmün aracılı heparin reaksiyonunu destekleyen test pozitifliği vardır.",
        "clinicalMeaning": "İmmün aracılı heparin reaksiyonunu destekleyen test pozitifliği vardır.",
        "result": {
          "title": "PF4-heparin antikor testi",
          "summary": "İmmün aracılı heparin reaksiyonunu destekleyen test pozitifliği vardır.",
          "interpretation": "İmmün aracılı heparin reaksiyonunu destekleyen test pozitifliği vardır.",
          "values": [
            [
              "PF4-heparin ELISA",
              "Pozitif, OD 1.8",
              "Negatif/çok düşük OD",
              "Pozitif"
            ],
            [
              "Fonksiyonel doğrulama",
              "İstendi, sonuç bekleniyor",
              "Negatif",
              "Klinik karar bekletilmez"
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
    "question": "Bu hastadaki tablo için en uygun yönetim yaklaşımı hangisidir?",
    "questionType": "Acil hematoloji yönetimi",
    "answerTarget": "Heparin ilişkili immun trombositopeni ve tromboz şüphesinde güvenli antikoagülasyon stratejisini seçme.",
    "diagnosis": {
      "correct": "Tüm heparin ürünlerini kesip heparin dışı terapötik antikoagülan başlamak",
      "options": [
        "Düşük molekül ağırlıklı heparin dozunu terapötik düzeye çıkarıp trombozu tedavi etmek",
        "Trombosit süspansiyonu verip trombosit sayısı normale gelene kadar antikoagülasyonu durdurmak",
        "Varfarin başlatıp INR terapötik aralığa gelene kadar heparin profilaksisine devam etmek",
        "Antibiyotik başlayıp cerrahi alan enfeksiyonu düzelene kadar tromboz tedavisini ertelemek",
        "Tüm heparin ürünlerini kesip heparin dışı terapötik antikoagülan başlamak"
      ],
      "question": "Bu hastadaki tablo için en uygun yönetim yaklaşımı hangisidir?",
      "explanation": "Heparin maruziyetinden yaklaşık 7 gün sonra trombosit sayısının %50’den fazla düşmesi, kanama bulgusu olmadan yeni venöz tromboz gelişmesi, normal PT/aPTT ve yüksek 4T skoru immun aracılı heparin ilişkili trombositopeni ve tromboz olasılığını güçlendirir. Bu durumda tüm heparinler kesilir ve tromboz riski yüksek olduğu için heparin dışı terapötik antikoagülasyon başlanır; tanısal test sonucu tedaviyi geciktirmemelidir.",
      "pearls": [
        "HIT kanama değil tromboz problemidir.",
        "Trombosit düşüşü genellikle mutlak sayıdan çok >%50 azalma ile dikkat çeker.",
        "5-10. gün zamanlaması klasik ipucudur.",
        "Warfarin erken dönemde tek başına başlanmaz; heparin de sürdürülmez."
      ],
      "optionFeedback": {
        "Düşük molekül ağırlıklı heparin dozunu terapötik düzeye çıkarıp trombozu tedavi etmek": "Bu seçenek tromboz tedavisini hedefliyor gibi görünse de hatalıdır; çünkü olguda trombozu tetikleyen süreç heparin maruziyetiyle ilişkilidir. Düşük molekül ağırlıklı heparin de heparin ürünüdür ve antikor aracılı trombosit aktivasyonu devam edebilir. Bu durumda heparini artırmak, trombotik riski azaltmak yerine prokoagülan süreci sürdürebilir.",
        "Trombosit süspansiyonu verip trombosit sayısı normale gelene kadar antikoagülasyonu durdurmak": "Trombosit düşüklüğü kanama ile değil trombozla seyreden immun aktivasyonun parçasıdır. Aktif ciddi kanama yokken rutin trombosit transfüzyonu güvenli bir tercih değildir ve teorik olarak trombotik süreci artırabilir. Yeni DVT bulunan ve yüksek klinik olasılığı olan hastada antikoagülasyonu tamamen durdurmak emboli ve tromboz progresyonu açısından tehlikelidir.",
        "Varfarin başlatıp INR terapötik aralığa gelene kadar heparin profilaksisine devam etmek": "Varfarin erken akut dönemde tek başına veya heparin sürdürülerek başlanmamalıdır. Protein C düzeyini erken azaltarak deri nekrozu ve venöz gangren riskini artırabilir; ayrıca heparin devam ettiği sürece immun trombosit aktivasyonu sürer. Warfarin gerekiyorsa trombosit toparlandıktan ve güvenli parenteral/heparin dışı antikoagülasyonla geçiş planlandıktan sonra düşünülür.",
        "Antibiyotik başlayıp cerrahi alan enfeksiyonu düzelene kadar tromboz tedavisini ertelemek": "Postoperatif enfeksiyon trombosit düşüklüğü yapabilir; ancak bu hastada ateş, lökositoz, cerrahi alanda pürülan akıntı veya sepsis bulgusu yoktur. Zamanlama, >%50 trombosit düşüşü ve yeni DVT daha güçlü bir immun-heparin ilişkili trombotik tablo oluşturur. Antibiyotik gereksiz olabilir ve tromboz tedavisini ertelemek güvenli değildir.",
        "Tüm heparin ürünlerini kesip heparin dışı terapötik antikoagülan başlamak": "Bu seçenek en uygundur. Klinik olasılık yüksek olduğunda heparin ürünleri kesilmeli ve tromboz riski nedeniyle heparin dışı terapötik antikoagülasyon başlanmalıdır. Argatroban, bivalirudin, fondaparinuks veya uygun bağlamda direkt oral antikoagülanlar klinik duruma göre seçilebilir. PF4-heparin ELISA ve fonksiyonel testler tanıyı destekler; ancak yeni trombozu olan yüksek olasılıklı hastada tedavi bu sonuçları bekleyerek geciktirilmez."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "HIT, heparin-PF4 komplekslerine karşı antikorların trombositleri aktive ettiği ve trombositopeniye rağmen tromboz riskini artırdığı immun prokoagülan bir tablodur.",
    "examPearl": "TUS ipucu: heparin sonrası 5-10. gün + >%50 trombosit düşüşü + yeni tromboz → heparini kes, heparin dışı antikoagülan başla.",
    "whyCorrect": "Doğru seçenek hem tetikleyici heparini ortadan kaldırır hem de mevcut tromboz ve yüksek tromboz riskini güvenli antikoagülasyonla hedefler.",
    "optionComparison": "Yanlış seçenekler heparini sürdürme, gereksiz trombosit verme, erken varfarin veya enfeksiyon varsayımı üzerinden hatalı yönlere gider; doğru yaklaşım immun trombotik mekanizmayı tanır.",
    "evidenceChain": [
      "Heparin maruziyeti sonrası 7. gün → tipik zamanlama.",
      "246.000’den 92.000/mm³’e düşüş → >%50 trombosit azalması.",
      "Yeni popliteal ven trombozu → kanamadan çok tromboz eğilimi.",
      "PT/aPTT normal ve fibrinojen korunmuş → DIC olasılığı daha zayıf.",
      "4T skoru 7/8 → tedaviyi test sonucuna kadar bekletmeme gerekçesi."
    ],
    "whyWrong": "Yanlış seçenekler gerçek pratikte sık yapılan geciktirici veya zararlı yaklaşımları temsil eder; klinik veri zinciri ise heparini kesip alternatif antikoagülasyon başlama yönündedir.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v305",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V304 render-safe internal-medicine cases with diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  },
{
    "id": "v305-new-717-tekrarlayan-tas-ve-kemik-agrisi",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "Tekrarlayan taş ve kemik ağrısı",
    "difficulty": "Orta-Zor",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "Hiperkalsemi, uygunsuz yüksek PTH, hipofosfatemi, hiperkalsiüri ve kemik/taş öyküsünü birlikte yorumlayarak paratiroid kaynaklı süreci ayırt etme.",
    "learningTarget": "PTH baskılanmamış hiperkalsemide primer paratiroid aşırı aktivitesini malignite, FHH, D vitamini fazlalığı ve immobilizasyon hiperkalsemisinden ayırma.",
    "demographics": "54 yaşında kadın hasta",
    "setting": "Endokrinoloji polikliniği",
    "chiefComplaint": "Hasta, tekrarlayan böbrek taşı atakları, yaygın kemik ağrısı ve son aylarda artan halsizlik nedeniyle başvuruyor.",
    "stem": "Hasta son üç yılda iki kez böbrek taşı düşürdüğünü, son altı aydır da kalça ve bel çevresinde derinden gelen ağrılar hissettiğini anlatır. Gün içinde çabuk yorulduğunu, kabızlığının arttığını ve eskisine göre daha fazla su içtiğini söyler. Kilo kaybı, gece terlemesi veya kanlı balgam tariflemez. Ailesinde genç yaşta belirgin hiperkalsemi tanısı alan biri olmadığını belirtir. Tiazid diüretik, lityum veya yüksek doz D vitamini kullanmıyor; yalnızca aralıklı kalsiyum içermeyen multivitamin aldığını söyler. Daha önce kanser tanısı veya uzun süreli immobilizasyon öyküsü yoktur.",
    "patientIntro": {
      "profile": "54 yaşında kadın hasta, Endokrinoloji polikliniği ortamında değerlendiriliyor.",
      "presentation": "Hasta, tekrarlayan böbrek taşı atakları, yaygın kemik ağrısı ve son aylarda artan halsizlik nedeniyle başvuruyor.",
      "historySummary": "Hasta son üç yılda iki kez böbrek taşı düşürdüğünü, son altı aydır da kalça ve bel çevresinde derinden gelen ağrılar hissettiğini anlatır. Gün içinde çabuk yorulduğunu, kabızlığının arttığını ve eskisine göre daha fazla su içtiğini söyler. Kilo kaybı, gece terlemesi veya kanlı balgam tariflemez. Ailesinde genç yaşta belirgin hiperkalsemi tanısı alan biri olmadığını belirtir. Tiazid diüretik, lityum veya yüksek doz D vitamini kullanmıyor; yalnızca aralıklı kalsiyum içermeyen multivitamin aldığını söyler. Daha önce kanser tanısı veya uzun süreli immobilizasyon öyküsü yoktur."
    },
    "vitals": {
      "TA": "138/84 mmHg",
      "Nabız": "82/dk",
      "Solunum": "16/dk",
      "SpO2": "%98 oda havasında",
      "Ateş": "36.6 °C",
      "Şok indeksi": "0.59 - perfüzyon iyi, acil şok bulgusu yok"
    },
    "exam": [
      "Genel durumu iyi; hafif yorgun görünümde.",
      "Karın yumuşak, defans veya rebound yok; kostovertebral açı hassasiyeti saptanmıyor.",
      "Kas gücü kaba muayenede korunmuş, belirgin nörolojik defisit yok.",
      "Tiroid lojunda belirgin nodül palpe edilmiyor; servikal lenfadenopati yok.",
      "Kemik palpasyonunda yaygın hassasiyet yok, ancak hasta bel ve kalça çevresinde aralıklı derin ağrı tarifliyor."
    ],
    "investigations": [
      {
        "id": "v305-new-717-kalsiyum-pth",
        "label": "Kalsiyum-PTH paneli",
        "title": "Kalsiyum-PTH paneli",
        "orderLabel": "Kalsiyum-PTH paneli",
        "type": "lab",
        "priority": "essential",
        "subtype": "Endokrin biyokimya",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Kalsiyum yüksekliği PTH baskılanması olmadan devam etmektedir.",
        "clinicalMeaning": "Kalsiyum yüksekliği PTH baskılanması olmadan devam etmektedir.",
        "result": {
          "title": "Kalsiyum-PTH paneli",
          "summary": "Kalsiyum yüksekliği PTH baskılanması olmadan devam etmektedir.",
          "interpretation": "Kalsiyum yüksekliği PTH baskılanması olmadan devam etmektedir.",
          "values": [
            [
              "Düzeltilmiş kalsiyum",
              "11.7 mg/dL",
              "8.6-10.2 mg/dL",
              "Yüksek"
            ],
            [
              "İyonize kalsiyum",
              "1.48 mmol/L",
              "1.12-1.32 mmol/L",
              "Yüksek"
            ],
            [
              "Fosfor",
              "2.1 mg/dL",
              "2.5-4.5 mg/dL",
              "Düşük"
            ],
            [
              "İntakt PTH",
              "146 pg/mL",
              "15-65 pg/mL",
              "Yüksek"
            ],
            [
              "25-OH D vitamini",
              "28 ng/mL",
              "20-50 ng/mL",
              "Yeterli aralık"
            ]
          ]
        }
      },
      {
        "id": "v305-new-717-idrar-kalsiyum",
        "label": "24 saatlik idrar kalsiyumu",
        "title": "24 saatlik idrar kalsiyumu",
        "orderLabel": "24 saatlik idrar kalsiyumu",
        "type": "lab",
        "priority": "essential",
        "subtype": "İdrar biyokimyası",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "İdrar kalsiyum atılımı düşük değil, belirgin artmıştır.",
        "clinicalMeaning": "İdrar kalsiyum atılımı düşük değil, belirgin artmıştır.",
        "result": {
          "title": "24 saatlik idrar kalsiyumu",
          "summary": "İdrar kalsiyum atılımı düşük değil, belirgin artmıştır.",
          "interpretation": "İdrar kalsiyum atılımı düşük değil, belirgin artmıştır.",
          "values": [
            [
              "24 saat idrar kalsiyumu",
              "386 mg/gün",
              "100-300 mg/gün",
              "Yüksek"
            ],
            [
              "Kalsiyum/kreatinin klirens oranı",
              "0.028",
              ">0.02 genellikle PHPT lehine; <0.01 FHH lehine",
              "Yüksek/uygun olmayan düşük değil"
            ],
            [
              "İdrar kreatinin",
              "1.1 g/gün",
              "0.8-1.8 g/gün",
              "Yeterli toplama ile uyumlu"
            ]
          ]
        }
      },
      {
        "id": "v305-new-717-bobrek-usg",
        "label": "Üriner sistem ultrasonografisi",
        "title": "Üriner sistem ultrasonografisi",
        "orderLabel": "Üriner sistem ultrasonografisi",
        "type": "imaging",
        "priority": "essential",
        "subtype": "Ultrasonografi",
        "category": "imaging",
        "testTypeCategory": "imaging",
        "summary": "Taş hastalığı öyküsünü destekleyen böbrek bulguları vardır.",
        "clinicalMeaning": "Taş hastalığı öyküsünü destekleyen böbrek bulguları vardır.",
        "result": {
          "title": "Üriner sistem ultrasonografisi",
          "summary": "Taş hastalığı öyküsünü destekleyen böbrek bulguları vardır.",
          "interpretation": "Taş hastalığı öyküsünü destekleyen böbrek bulguları vardır.",
          "narrative": "Sağ böbrekte 5 mm nonobstrüktif taş ve sol böbrekte medüller ekojenite artışı izleniyor; hidronefroz yok."
        }
      },
      {
        "id": "v305-new-717-dexa",
        "label": "Kemik mineral yoğunluğu",
        "title": "Kemik mineral yoğunluğu",
        "orderLabel": "Kemik mineral yoğunluğu",
        "type": "imaging",
        "priority": "essential",
        "subtype": "DEXA",
        "category": "imaging",
        "testTypeCategory": "imaging",
        "summary": "Kortikal kemik etkilenimini destekleyen düşük yoğunluk vardır.",
        "clinicalMeaning": "Kortikal kemik etkilenimini destekleyen düşük yoğunluk vardır.",
        "result": {
          "title": "Kemik mineral yoğunluğu",
          "summary": "Kortikal kemik etkilenimini destekleyen düşük yoğunluk vardır.",
          "interpretation": "Kortikal kemik etkilenimini destekleyen düşük yoğunluk vardır.",
          "values": [
            [
              "Distal 1/3 radius T skoru",
              "-2.7",
              "> -1 normal",
              "Osteoporotik aralık"
            ],
            [
              "Femur boynu T skoru",
              "-2.1",
              "> -1 normal",
              "Osteopenik aralık"
            ],
            [
              "Lomber vertebra T skoru",
              "-1.6",
              "> -1 normal",
              "Osteopenik aralık"
            ]
          ]
        }
      },
      {
        "id": "v305-new-717-pthrp",
        "label": "Malignite ilişkili hiperkalsemi paneli",
        "title": "Malignite ilişkili hiperkalsemi paneli",
        "orderLabel": "Malignite ilişkili hiperkalsemi paneli",
        "type": "lab",
        "priority": "essential",
        "subtype": "Ek biyokimya",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "PTH dışı malignite aracılı belirgin bir sinyal saptanmamıştır.",
        "clinicalMeaning": "PTH dışı malignite aracılı belirgin bir sinyal saptanmamıştır.",
        "result": {
          "title": "Malignite ilişkili hiperkalsemi paneli",
          "summary": "PTH dışı malignite aracılı belirgin bir sinyal saptanmamıştır.",
          "interpretation": "PTH dışı malignite aracılı belirgin bir sinyal saptanmamıştır.",
          "values": [
            [
              "PTHrP",
              "Normal aralıkta",
              "Düşük/normal",
              "Yüksek değil"
            ],
            [
              "ALP",
              "138 U/L",
              "35-120 U/L",
              "Hafif yüksek"
            ],
            [
              "Kreatinin",
              "0.8 mg/dL",
              "0.6-1.2 mg/dL",
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
    "question": "Bu laboratuvar ve klinik paterni en iyi açıklayan süreç hangisidir?",
    "questionType": "Laboratuvar paterni / mekanizma",
    "answerTarget": "PTH bağımlı hiperkalsemi paternini ayırıcı mekanizmalar içinde seçme.",
    "diagnosis": {
      "correct": "Paratiroid bezinden otonom PTH salınımına bağlı kemik rezorpsiyonu ve renal kalsiyum yükü artışı",
      "options": [
        "PTHrP aracılı malign humoral hiperkalsemiye bağlı PTH baskılanması",
        "Paratiroid bezinden otonom PTH salınımına bağlı kemik rezorpsiyonu ve renal kalsiyum yükü artışı",
        "Kalsiyum algılayıcı reseptör duyarsızlığına bağlı hipokalsiürik ailesel hiperkalsemi",
        "D vitamini fazlalığına bağlı bağırsaktan kalsiyum ve fosfat emiliminde artış",
        "İmmobilizasyona bağlı kemik yıkımı ve düşük PTH ile seyreden hiperkalsemi"
      ],
      "question": "Bu laboratuvar ve klinik paterni en iyi açıklayan süreç hangisidir?",
      "explanation": "Hiperkalsemi varlığında PTH’nin baskılanmaması, hatta yüksek olması PTH bağımlı bir süreci gösterir. Düşük fosfor, tekrarlayan taş, hiperkalsiüri, kortikal kemik yoğunluğu kaybı ve aile öyküsü/hipokalsiüri olmaması paratiroid kaynaklı otonom PTH fazlalığını destekler. PTHrP, D vitamini fazlalığı ve immobilizasyon hiperkalsemisinde PTH genellikle baskılanır; FHH’de ise idrar kalsiyumu tipik olarak düşüktür.",
      "pearls": [
        "Hiperkalsemide ilk ayrım PTH bağımlı mı bağımsız mı sorusudur.",
        "Yüksek veya uygunsuz normal PTH, PTH bağımlı hiperkalsemi lehinedir.",
        "FHH’de idrar kalsiyumu düşük; primer paratiroid aşırı aktivitesinde genellikle düşük değildir.",
        "Taş ve osteoporoz semptomatik hastalık göstergesi olabilir."
      ],
      "optionFeedback": {
        "PTHrP aracılı malign humoral hiperkalsemiye bağlı PTH baskılanması": "PTHrP aracılı malign hiperkalsemi özellikle skuamöz hücreli kanserler gibi tümörlerde hızlı gelişen kalsiyum yüksekliğiyle görülebilir. Bu durumda endojen PTH baskılanır; çünkü yüksek kalsiyum normal paratiroid bezini negatif geri bildirimle susturur. Bu olguda PTH 146 pg/mL ile yüksektir, PTHrP normaldir ve hiperkalsemiye eşlik eden taş/hiperkalsiüri paterni paratiroid kaynaklı süreci daha iyi açıklar.",
        "Paratiroid bezinden otonom PTH salınımına bağlı kemik rezorpsiyonu ve renal kalsiyum yükü artışı": "Bu seçenek en uygundur. Yüksek kalsiyuma rağmen PTH’nin baskılanmaması paratiroid hormonunun fizyolojik geri bildirime uymadığını gösterir. PTH kemikten kalsiyum mobilizasyonunu artırır, böbrekten fosfat atılımını artırarak hipofosfatemi yapar ve kalsiyum yükü arttığı için idrarda kalsiyum atılımı da yükselir. Tekrarlayan taş ve distal radius ağırlıklı kemik yoğunluğu kaybı bu mekanizmanın klinik yansımalarıdır.",
        "Kalsiyum algılayıcı reseptör duyarsızlığına bağlı hipokalsiürik ailesel hiperkalsemi": "FHH de PTH’nin uygunsuz normal veya hafif yüksek kalabildiği PTH bağımlı görünümlü hiperkalsemi yapabilir; bu nedenle gerçek bir ayırıcıdır. Ancak FHH genellikle genç yaştan beri hafif hiperkalsemi, aile öyküsü ve belirgin düşük idrar kalsiyumu ile karakterizedir. Bu hastada 24 saatlik idrar kalsiyumu ve kalsiyum/kreatinin klirens oranı düşüklük göstermemekte, taş ve kemik etkilenimi daha belirgin seyretmektedir.",
        "D vitamini fazlalığına bağlı bağırsaktan kalsiyum ve fosfat emiliminde artış": "D vitamini fazlalığında bağırsaktan hem kalsiyum hem fosfat emilimi artar; bu nedenle fosfor normal-yüksek olabilir ve PTH genellikle baskılanır. Bu hastada 25-OH D vitamini toksik aralıkta değildir, fosfor düşüktür ve PTH belirgin yüksektir. Dolayısıyla bu seçenek kalsiyum yüksekliğini kısmen açıklayabilse de tüm laboratuvar zincirini açıklayamaz.",
        "İmmobilizasyona bağlı kemik yıkımı ve düşük PTH ile seyreden hiperkalsemi": "Uzun süreli immobilizasyon özellikle yüksek kemik dönüşümü olan kişilerde hiperkalsemiye neden olabilir. Bu durumda kalsiyum yüksekliği PTH’yi baskılar ve klinikte hareketsizlik öyküsü beklenir. Olguda immobilizasyon yoktur, PTH yüksek kalmıştır ve hipofosfatemi-hiperkalsiüri-taş birlikteliği paratiroid hormonunun böbrek ve kemik etkileriyle daha uyumludur."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "PTH bağımlı hiperkalsemide serum kalsiyumu yüksekken PTH baskılanmaz; primer paratiroid aşırı aktivitesi taş, kemik kaybı, hipofosfatemi ve idrar kalsiyum artışıyla desteklenir.",
    "examPearl": "TUS ipucu: Ca yüksek + PTH yüksek/uygunsuz normal + fosfor düşük + idrar kalsiyumu düşük değil → primer paratiroid kaynaklı süreç; idrar kalsiyumu çok düşükse FHH düşün.",
    "whyCorrect": "Doğru seçenek, serum ve idrar elektrolitleriyle taş-kemik bulgularını tek bir PTH bağımlı mekanizmada birleştirir.",
    "optionComparison": "Yanlış seçenekler PTH bağımsız hiperkalsemi veya hipokalsiürik ailesel hiperkalsemi eksenindedir; bu olguda PTH yüksekliği ve idrar kalsiyumu ayrımı belirleyicidir.",
    "evidenceChain": [
      "Düzeltilmiş Ca 11.7 + iyonize Ca yüksek → gerçek hiperkalsemi.",
      "PTH 146 pg/mL → hiperkalsemiye rağmen baskılanmamış hormon yanıtı.",
      "Fosfor 2.1 mg/dL → PTH’nin fosfatürik etkisiyle uyumlu.",
      "24 saat idrar kalsiyumu 386 mg/gün + UCCR 0.028 → FHH’den uzaklaştırır.",
      "Taş öyküsü + distal radius T skoru -2.7 → böbrek ve kemik hedef organ etkisi."
    ],
    "whyWrong": "Yanlış seçenekler hiperkalsemi ayırıcı tanılarının gerçekçi üyeleridir; ancak her biri PTH, fosfor ve idrar kalsiyumu zincirinin bir bölümünde kırılır.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v305",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V304 render-safe internal-medicine cases with diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  },
{
    "id": "v305-new-718-yanakta-dokuntu-ve-kopuklu-idrar",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "Yanakta döküntü ve köpüklü idrar",
    "difficulty": "Zor",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "Sistemik otoimmün bulgularla birlikte aktif idrar sedimenti, proteinüri, kompleman düşüklüğü ve böbrek biyopsisini yorumlayarak proliferatif renal tutulumda indüksiyon tedavisini seçme.",
    "learningTarget": "Proliferatif lupus nefritinde yalnız antiproteinürik izlem veya düşük doz steroid yerine immünsupresif indüksiyon gerekliliğini ayırt etme.",
    "demographics": "27 yaşında kadın hasta",
    "setting": "Nefroloji-romatoloji ortak polikliniği",
    "chiefComplaint": "Hasta, son haftalarda artan yüz şişliği, köpüklü idrar ve eklem ağrıları nedeniyle başvuruyor.",
    "stem": "Hasta yaklaşık bir aydır sabahları göz kapaklarında şişlik olduğunu, idrarının belirgin köpüklendiğini ve son günlerde ayakkabılarının sıkmaya başladığını anlatır. Son altı aydır güneşe çıkınca yanaklarında kızarıklık belirginleşmekte, el bilekleri ve parmak eklemlerinde sabahları yarım saatten uzun süren tutukluk olmaktadır. İdrar yaparken yanma, yan ağrısı veya ateş tariflemez. Son haftalarda yeni ilaç başlamamış, NSAİİ’leri yalnız nadiren kullanmıştır. Ailesinde böbrek yetmezliği öyküsü yoktur. Daha önce gebelik veya bilinen tromboz öyküsü olmadığını belirtir.",
    "patientIntro": {
      "profile": "27 yaşında kadın hasta, Nefroloji-romatoloji ortak polikliniği ortamında değerlendiriliyor.",
      "presentation": "Hasta, son haftalarda artan yüz şişliği, köpüklü idrar ve eklem ağrıları nedeniyle başvuruyor.",
      "historySummary": "Hasta yaklaşık bir aydır sabahları göz kapaklarında şişlik olduğunu, idrarının belirgin köpüklendiğini ve son günlerde ayakkabılarının sıkmaya başladığını anlatır. Son altı aydır güneşe çıkınca yanaklarında kızarıklık belirginleşmekte, el bilekleri ve parmak eklemlerinde sabahları yarım saatten uzun süren tutukluk olmaktadır. İdrar yaparken yanma, yan ağrısı veya ateş tariflemez. Son haftalarda yeni ilaç başlamamış, NSAİİ’leri yalnız nadiren kullanmıştır. Ailesinde böbrek yetmezliği öyküsü yoktur. Daha önce gebelik veya bilinen tromboz öyküsü olmadığını belirtir."
    },
    "vitals": {
      "TA": "148/92 mmHg",
      "Nabız": "88/dk",
      "Solunum": "16/dk",
      "SpO2": "%99 oda havasında",
      "Ateş": "36.9 °C",
      "Şok indeksi": "0.59 - sistemik perfüzyon stabil"
    },
    "exam": [
      "Yanak ve burun köprüsünde nazolabial olukları nispeten koruyan eritemli döküntü görülüyor.",
      "Bilateral el bileği ve MCP eklemlerinde hafif şişlik ve hassasiyet var; deformite yok.",
      "Pretibial bölgede bilateral 2+ gode bırakan ödem mevcut.",
      "Akciğer ve kalp oskültasyonu doğal; perikard sürtünme sesi duyulmuyor.",
      "Ağız içinde aktif ülser saptanmıyor."
    ],
    "investigations": [
      {
        "id": "v305-new-718-idrar",
        "label": "Tam idrar tetkiki ve proteinüri",
        "title": "Tam idrar tetkiki ve proteinüri",
        "orderLabel": "Tam idrar tetkiki ve proteinüri",
        "type": "lab",
        "priority": "essential",
        "subtype": "İdrar analizi",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Proteinüri ve aktif glomerüler sediment vardır.",
        "clinicalMeaning": "Proteinüri ve aktif glomerüler sediment vardır.",
        "result": {
          "title": "Tam idrar tetkiki ve proteinüri",
          "summary": "Proteinüri ve aktif glomerüler sediment vardır.",
          "interpretation": "Proteinüri ve aktif glomerüler sediment vardır.",
          "values": [
            [
              "Protein",
              "3+",
              "Negatif",
              "Yüksek"
            ],
            [
              "Eritrosit",
              "35-45/hpf",
              "0-3/hpf",
              "Yüksek"
            ],
            [
              "Eritrosit silendiri",
              "Pozitif",
              "Negatif",
              "Glomerüler kaynak lehine"
            ],
            [
              "Lökosit",
              "4-6/hpf",
              "0-5/hpf",
              "Sınırda"
            ],
            [
              "Spot protein/kreatinin",
              "2.8 g/g",
              "<0.15 g/g",
              "Nefritik-nefrotik aralıkta yüksek"
            ]
          ]
        }
      },
      {
        "id": "v305-new-718-bobrek",
        "label": "Böbrek fonksiyonu",
        "title": "Böbrek fonksiyonu",
        "orderLabel": "Böbrek fonksiyonu",
        "type": "lab",
        "priority": "essential",
        "subtype": "Biyokimya",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Böbrek fonksiyonunda yeni bozulma ve hipoalbuminemi vardır.",
        "clinicalMeaning": "Böbrek fonksiyonunda yeni bozulma ve hipoalbuminemi vardır.",
        "result": {
          "title": "Böbrek fonksiyonu",
          "summary": "Böbrek fonksiyonunda yeni bozulma ve hipoalbuminemi vardır.",
          "interpretation": "Böbrek fonksiyonunda yeni bozulma ve hipoalbuminemi vardır.",
          "values": [
            [
              "Kreatinin",
              "1.6 mg/dL",
              "0.6-1.1 mg/dL",
              "Yüksek"
            ],
            [
              "eGFR",
              "48 mL/dk/1.73 m²",
              ">90 mL/dk/1.73 m²",
              "Düşük"
            ],
            [
              "Albumin",
              "2.9 g/dL",
              "3.5-5.0 g/dL",
              "Düşük"
            ],
            [
              "Potasyum",
              "4.6 mmol/L",
              "3.5-5.1 mmol/L",
              "Normal"
            ],
            [
              "Bikarbonat",
              "23 mmol/L",
              "22-28 mmol/L",
              "Normal"
            ]
          ]
        }
      },
      {
        "id": "v305-new-718-otoimmun",
        "label": "Otoimmün seroloji",
        "title": "Otoimmün seroloji",
        "orderLabel": "Otoimmün seroloji",
        "type": "lab",
        "priority": "essential",
        "subtype": "Seroloji",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Sistemik otoimmün aktiviteyi destekleyen antikor ve kompleman paterni vardır.",
        "clinicalMeaning": "Sistemik otoimmün aktiviteyi destekleyen antikor ve kompleman paterni vardır.",
        "result": {
          "title": "Otoimmün seroloji",
          "summary": "Sistemik otoimmün aktiviteyi destekleyen antikor ve kompleman paterni vardır.",
          "interpretation": "Sistemik otoimmün aktiviteyi destekleyen antikor ve kompleman paterni vardır.",
          "values": [
            [
              "ANA",
              "1/1280 homojen",
              "Negatif/düşük titre",
              "Pozitif"
            ],
            [
              "Anti-dsDNA",
              "180 IU/mL",
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
              "Anti-GBM",
              "Negatif",
              "Negatif",
              "Desteklemiyor"
            ],
            [
              "ANCA",
              "Negatif",
              "Negatif",
              "Desteklemiyor"
            ]
          ]
        }
      },
      {
        "id": "v305-new-718-hemogram",
        "label": "Hemogram ve inflamasyon",
        "title": "Hemogram ve inflamasyon",
        "orderLabel": "Hemogram ve inflamasyon",
        "type": "lab",
        "priority": "essential",
        "subtype": "Tam kan sayımı",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Hafif sitopeni ve inflamasyon bulgusu vardır.",
        "clinicalMeaning": "Hafif sitopeni ve inflamasyon bulgusu vardır.",
        "result": {
          "title": "Hemogram ve inflamasyon",
          "summary": "Hafif sitopeni ve inflamasyon bulgusu vardır.",
          "interpretation": "Hafif sitopeni ve inflamasyon bulgusu vardır.",
          "values": [
            [
              "Hemoglobin",
              "10.6 g/dL",
              "12-16 g/dL",
              "Düşük"
            ],
            [
              "Lökosit",
              "3.200/mm³",
              "4.000-10.000/mm³",
              "Düşük"
            ],
            [
              "Trombosit",
              "142.000/mm³",
              "150.000-400.000/mm³",
              "Hafif düşük"
            ],
            [
              "ESR",
              "68 mm/saat",
              "<20 mm/saat",
              "Yüksek"
            ],
            [
              "CRP",
              "7 mg/L",
              "<5 mg/L",
              "Hafif yüksek"
            ]
          ]
        }
      },
      {
        "id": "v305-new-718-biyopsi",
        "label": "Böbrek biyopsisi",
        "title": "Böbrek biyopsisi",
        "orderLabel": "Böbrek biyopsisi",
        "type": "procedure",
        "priority": "essential",
        "subtype": "Histopatoloji",
        "category": "procedure",
        "testTypeCategory": "procedure",
        "summary": "Proliferatif glomerüler tutulum ve immün kompleks birikimi gösterilir.",
        "clinicalMeaning": "Proliferatif glomerüler tutulum ve immün kompleks birikimi gösterilir.",
        "result": {
          "title": "Böbrek biyopsisi",
          "summary": "Proliferatif glomerüler tutulum ve immün kompleks birikimi gösterilir.",
          "interpretation": "Proliferatif glomerüler tutulum ve immün kompleks birikimi gösterilir.",
          "narrative": "Işık mikroskobunda glomerüllerin çoğunda endokapiller proliferasyon ve segmental kresentler izlenir. İmmünfloresanda IgG, IgA, IgM, C3 ve C1q ile full-house boyanma vardır. Aktivite indeksi yüksek, kronisite indeksi düşüktür."
        }
      }
    ],
    "useSyntheticInvestigationBank": true,
    "managementSequence": {
      "enabled": false
    },
    "hideExamSignal": true,
    "question": "Bu hasta için en uygun tedavi veya izlem basamağı hangisidir?",
    "questionType": "Tedavi/izlem",
    "answerTarget": "Proliferatif immün kompleks glomerülonefritinde indüksiyon tedavisi gerekliliğini ayırt etme.",
    "diagnosis": {
      "correct": "Glukokortikoid ile birlikte mikofenolat mofetil veya siklofosfamid temelli indüksiyon immünsupresyonu başlamak",
      "options": [
        "Yalnız ACE inhibitörü/ARB ile proteinüriyi azaltıp serolojik aktiviteyi izlemek",
        "Yüksek doz NSAİİ verip eklem yakınmaları geriledikten sonra idrar bulgularını tekrar değerlendirmek",
        "Üç gün antibiyotik tedavisi verip idrar kültürü negatifleşene kadar böbrek tedavisini ertelemek",
        "Glukokortikoid ile birlikte mikofenolat mofetil veya siklofosfamid temelli indüksiyon immünsupresyonu başlamak",
        "Acil plazmaferez başlatıp tüm immünsupresifleri biyopsi kronisite skoruna kadar ertelemek"
      ],
      "question": "Bu hasta için en uygun tedavi veya izlem basamağı hangisidir?",
      "explanation": "Proteinüri, eritrosit silendiri, kreatinin artışı, anti-dsDNA yüksekliği, kompleman düşüklüğü ve biyopside proliferatif immün kompleks glomerülonefriti aktif renal tutulumla uyumludur. Aktivite yüksek ve kronisite düşük olduğundan amaç inflamatuvar hasarı hızla baskılamaktır; bu nedenle glukokortikoid ile birlikte mikofenolat mofetil veya siklofosfamid temelli indüksiyon tedavisi gerekir.",
      "pearls": [
        "Proteinüri + eritrosit silendiri glomerüler inflamasyonu düşündürür.",
        "Anti-dsDNA yüksekliği ve düşük kompleman renal aktiviteyle ilişkilidir.",
        "Proliferatif histoloji yalnız destek tedavisiyle izlenmez.",
        "Kronisite düşükse agresif indüksiyonla geri döndürülebilir aktivite hedeflenir."
      ],
      "optionFeedback": {
        "Yalnız ACE inhibitörü/ARB ile proteinüriyi azaltıp serolojik aktiviteyi izlemek": "ACE inhibitörü veya ARB proteinüri ve kan basıncı kontrolünde destekleyici olarak değerlidir. Ancak aktif idrar sedimenti, kreatinin artışı, düşük kompleman, yüksek anti-dsDNA ve proliferatif biyopsi bulgusu varken yalnız antiproteinürik tedavi yetersizdir. Bu yaklaşım inflamatuvar glomerüler hasarı durdurmaz ve kalıcı nefron kaybı riskini artırır.",
        "Yüksek doz NSAİİ verip eklem yakınmaları geriledikten sonra idrar bulgularını tekrar değerlendirmek": "NSAİİ inflamatuvar eklem ağrısında kısa süreli semptom kontrolü sağlayabilir; fakat böbrek fonksiyon bozukluğu ve proteinüri bulunan hastada nefrotoksisite riski taşır. Bu olguda ana problem eklem ağrısı değil aktif glomerüler tutulumdur. NSAİİ ile idrar bulgularının izlenmesi tedaviyi geciktirir ve böbrek fonksiyonunu kötüleştirebilir.",
        "Üç gün antibiyotik tedavisi verip idrar kültürü negatifleşene kadar böbrek tedavisini ertelemek": "İdrar yolu enfeksiyonu hematüri veya lökositüri yapabilir; dizüri, ateş, bakteriüri ve pozitif kültürle desteklenir. Bu hastada eritrosit silendiri, ağır proteinüri, düşük kompleman ve proliferatif biyopsi enfeksiyondan çok glomerüler immün hasarı gösterir. Antibiyotik denemesi bu veri zincirini açıklamaz ve gerekli indüksiyon tedavisini geciktirir.",
        "Glukokortikoid ile birlikte mikofenolat mofetil veya siklofosfamid temelli indüksiyon immünsupresyonu başlamak": "Bu seçenek en uygundur. Aktif proliferatif renal tutulumda yalnız izlem veya destek tedavisi yeterli değildir; glomerüler inflamasyonu hızla baskılamak gerekir. Glukokortikoid inflamasyonu hızlı azaltır, mikofenolat mofetil veya siklofosfamid ise patojenik lenfosit yanıtı ve immün kompleks aracılı hasarı kontrol etmek için indüksiyon tedavisinin temelini oluşturur. Düşük kronisite indeksi, tedaviyle geri döndürülebilir aktivitenin hedeflenebileceğini destekler.",
        "Acil plazmaferez başlatıp tüm immünsupresifleri biyopsi kronisite skoruna kadar ertelemek": "Plazmaferez anti-GBM hastalığı, bazı ağır pulmoner-renal sendromlar veya belirli katastrofik tablolar gibi seçilmiş durumlarda düşünülebilir. Bu hastada anti-GBM ve ANCA negatif, pulmoner hemoraji yok ve biyopsi zaten aktif proliferatif immün kompleks hasarı göstermektedir. Plazmaferez standart indüksiyon immünsupresyonunun yerine geçmez; üstelik immünsupresyonu ertelemek aktif glomerüler hasarı uzatır."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "Proliferatif lupus nefriti aktif glomerüler inflamasyon ve immün kompleks birikimiyle seyreder; proteinüri, eritrosit silendiri, düşük kompleman ve yüksek anti-dsDNA varlığında biyopsiye göre indüksiyon immünsupresyonu gerekir.",
    "examPearl": "TUS ipucu: genç kadın + fotosensitif döküntü/artrit + proteinüri/eritrosit silendiri + düşük C3-C4 + anti-dsDNA yüksek → proliferatif renal tutulumda steroid + MMF/siklofosfamid indüksiyonu.",
    "whyCorrect": "Doğru seçenek, aktif proliferatif glomerüler hasarı böbrek fonksiyonu kalıcı bozulmadan baskılamayı hedefler.",
    "optionComparison": "Yanlış seçenekler destek tedavisi, semptomatik tedavi, enfeksiyon varsayımı veya seçilmemiş plazmaferez yaklaşımıdır; bu olguda belirleyici nokta aktif proliferatif renal tutulumdur.",
    "evidenceChain": [
      "Köpüklü idrar + ödem + protein/kreatinin 2.8 g/g → anlamlı proteinüri.",
      "Eritrosit silendiri + kreatinin artışı → aktif glomerüler inflamasyon.",
      "Anti-dsDNA yüksek + C3/C4 düşük → immün kompleks aktivitesi.",
      "Full-house boyanma + proliferasyon/kresent → proliferatif renal tutulum.",
      "Aktivite yüksek, kronisite düşük → indüksiyon tedavisiyle geri döndürülebilir hasarı hedefleme."
    ],
    "whyWrong": "Yanlış seçenekler olgunun bir parçasına odaklanır; ancak böbrek biyopsisi ve serolojik aktivite birlikte güçlü immünsupresif indüksiyon gerekliliğini gösterir.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v305",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V304 render-safe internal-medicine cases with diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  },
{
    "id": "v306-new-719-ates-balgam-ve-giderek-artan-solunum-sikintisi",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "Ateş, balgam ve giderek artan solunum sıkıntısı",
    "difficulty": "Zor",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "Yaşlı ve komorbid hastada ağır alt solunum yolu enfeksiyonu bulgularını, oksijen ihtiyacını ve böbrek fonksiyon verilerini birlikte değerlendirerek erken yatış ve ampirik tedavi kararını verme.",
    "learningTarget": "Ağır toplum kökenli alt solunum yolu enfeksiyonunda ayaktan tedavi, dar spektrumlu monoterapi veya gereksiz anaerobik/MRSA kapsamı yerine doğru ampirik hastane tedavisini seçme.",
    "demographics": "72 yaşında erkek hasta",
    "setting": "Acil servis gözlem alanı",
    "chiefComplaint": "Üç gündür artan öksürük, ateş ve nefes darlığı nedeniyle acile başvuruyor.",
    "stem": "Hasta üç gün önce üşüme-titreme ile başlayan ateşinin evde parasetamolle kısa süre düştüğünü, son 24 saatte ise merdiven çıkmadan bile nefesinin yetmediğini anlatır. Öksürüğü başlangıçta kuruyken bugün sarı-yeşil balgam çıkarmaya başlamış, gece yatarken iki yastıkla daha rahat ettiğini söylemiştir. Eşi, sabah kahvaltıda konuşurken cümlelerini karıştırdığını ve ilaçlarını yanlış saatte almaya çalıştığını fark ettiğini belirtir. Bilinen KOAH, tip 2 diyabet ve hipertansiyon öyküsü vardır; son bir ayda hastane yatışı veya intravenöz antibiyotik kullanımı olmamıştır. Göğüste baskı tarzı ağrı, kanlı balgam veya tek taraflı bacak şişliği tariflemez. Evde kullandığı inhalerleri artırmasına rağmen nefes darlığı belirgin düzelmemiştir.",
    "patientIntro": {
      "profile": "72 yaşında erkek hasta, Acil servis gözlem alanı ortamında değerlendiriliyor.",
      "presentation": "Üç gündür artan öksürük, ateş ve nefes darlığı nedeniyle acile başvuruyor.",
      "historySummary": "Hasta üç gün önce üşüme-titreme ile başlayan ateşinin evde parasetamolle kısa süre düştüğünü, son 24 saatte ise merdiven çıkmadan bile nefesinin yetmediğini anlatır. Öksürüğü başlangıçta kuruyken bugün sarı-yeşil balgam çıkarmaya başlamış, gece yatarken iki yastıkla daha rahat ettiğini söylemiştir. Eşi, sabah kahvaltıda konuşurken cümlelerini karıştırdığını ve ilaçlarını yanlış saatte almaya çalıştığını fark ettiğini belirtir. Bilinen KOAH, tip 2 diyabet ve hipertansiyon öyküsü vardır; son bir ayda hastane yatışı veya intravenöz antibiyotik kullanımı olmamıştır. Göğüste baskı tarzı ağrı, kanlı balgam veya tek taraflı bacak şişliği tariflemez. Evde kullandığı inhalerleri artırmasına rağmen nefes darlığı belirgin düzelmemiştir."
    },
    "vitals": {
      "TA": "96/58 mmHg",
      "Nabız": "118/dk",
      "Solunum": "32/dk",
      "SpO2": "%87 oda havasında, 4 L/dk nazal oksijenle %92",
      "Ateş": "38.9 °C",
      "Şok indeksi": "1.23 - ekstremiteler ılık, kapiller dolum 3 saniye"
    },
    "exam": [
      "Hasta dispneik, sorulara yavaş yanıt veriyor ancak koopere.",
      "Sağ alt-orta akciğer alanında inspiratuvar ral ve bronşiyal solunum sesi duyuluyor.",
      "Yaygın wheezing minimal; ekspiryum hafif uzamış.",
      "Juguler venöz dolgunluk ve periferik ödem yok.",
      "Karın yumuşak, batında hassasiyet veya defans saptanmıyor."
    ],
    "investigations": [
      {
        "id": "v306-new-719-hemogram-inflamasyon",
        "label": "Hemogram ve inflamasyon belirteçleri",
        "title": "Hemogram ve inflamasyon belirteçleri",
        "orderLabel": "Hemogram ve inflamasyon belirteçleri",
        "type": "lab",
        "priority": "essential",
        "subtype": "Acil laboratuvar",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Nötrofil ağırlıklı lökositoz ve belirgin inflamatuvar yanıt vardır.",
        "clinicalMeaning": "Sistemik inflamasyon ve bakteriyel etken olasılığını artıran akut yanıt vardır.",
        "result": {
          "title": "Hemogram ve inflamasyon belirteçleri",
          "summary": "Nötrofil ağırlıklı lökositoz ve belirgin inflamatuvar yanıt vardır.",
          "interpretation": "Nötrofil ağırlıklı lökositoz ve belirgin inflamatuvar yanıt vardır.",
          "values": [
            [
              "Lökosit",
              "18.600/mm³",
              "4.000-10.000/mm³",
              "Yüksek"
            ],
            [
              "Nötrofil",
              "%89",
              "%40-70",
              "Yüksek"
            ],
            [
              "CRP",
              "196 mg/L",
              "<5 mg/L",
              "Yüksek"
            ],
            [
              "Prokalsitonin",
              "2.8 ng/mL",
              "<0.1 ng/mL",
              "Yüksek"
            ],
            [
              "Hemoglobin",
              "12.7 g/dL",
              "13-17 g/dL",
              "Sınırda düşük"
            ]
          ]
        }
      },
      {
        "id": "v306-new-719-biyokimya-kan-gazi",
        "label": "Biyokimya ve arter kan gazı",
        "title": "Biyokimya ve arter kan gazı",
        "orderLabel": "Biyokimya ve arter kan gazı",
        "type": "lab",
        "priority": "essential",
        "subtype": "Acil biyokimya ve kan gazı",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "BUN yüksekliği, hipoksemi ve laktat artışı vardır.",
        "clinicalMeaning": "Solunum yükü ve sistemik hastalık ağırlığını gösteren bulgular vardır.",
        "result": {
          "title": "Biyokimya ve arter kan gazı",
          "summary": "BUN yüksekliği, hipoksemi ve laktat artışı vardır.",
          "interpretation": "BUN yüksekliği, hipoksemi ve laktat artışı vardır.",
          "values": [
            [
              "Üre azotu (BUN)",
              "34 mg/dL",
              "7-20 mg/dL",
              "Yüksek"
            ],
            [
              "Kreatinin",
              "1.3 mg/dL",
              "0.6-1.2 mg/dL",
              "Hafif yüksek"
            ],
            [
              "Sodyum",
              "132 mmol/L",
              "135-145 mmol/L",
              "Hafif düşük"
            ],
            [
              "pH",
              "7.45",
              "7.35-7.45",
              "Üst sınır"
            ],
            [
              "PaO2",
              "56 mmHg",
              "80-100 mmHg",
              "Düşük"
            ],
            [
              "Laktat",
              "2.6 mmol/L",
              "<2 mmol/L",
              "Yüksek"
            ]
          ]
        }
      },
      {
        "id": "v306-new-719-akciger-grafisi",
        "label": "Akciğer grafisi",
        "title": "Akciğer grafisi",
        "orderLabel": "Akciğer grafisi",
        "type": "imaging",
        "priority": "essential",
        "subtype": "PA akciğer grafisi",
        "category": "imaging",
        "testTypeCategory": "imaging",
        "summary": "Sağ alt lobda hava bronkogramları içeren konsolidasyon izlenir.",
        "clinicalMeaning": "Lober alveoler dolum paterni ve oksijen ihtiyacı birlikte değerlendirilmelidir.",
        "result": {
          "title": "Akciğer grafisi",
          "summary": "Sağ alt lobda hava bronkogramları içeren konsolidasyon izlenir.",
          "interpretation": "Sağ alt lobda hava bronkogramları içeren konsolidasyon izlenir; belirgin plevral sıvı yoktur.",
          "narrative": "Sağ alt zon ağırlıklı, sınırları segment/lob düzeyinde belirgin alveoler opasite ve hava bronkogramları vardır. Kardiyotorasik oran belirgin artmış değildir; yaygın interstisyel ödem paterni izlenmez."
        }
      },
      {
        "id": "v306-new-719-mikrobiyoloji",
        "label": "Mikrobiyolojik örnekler",
        "title": "Mikrobiyolojik örnekler",
        "orderLabel": "Mikrobiyolojik örnekler",
        "type": "lab",
        "priority": "essential",
        "subtype": "Kültür ve antijen testleri",
        "category": "microbiology",
        "testTypeCategory": "microbiology",
        "summary": "Kan kültürleri alındı; hızlı antijen testleri başlangıç yönetimini destekler.",
        "clinicalMeaning": "Örnekler antibiyotik öncesi alınır; tedavi kültür sonucunu beklemez.",
        "result": {
          "title": "Mikrobiyolojik örnekler",
          "summary": "Kan kültürleri alındı; hızlı antijen testleri başlangıç yönetimini destekler.",
          "interpretation": "Örnekler antibiyotik öncesi alınır; tedavi kültür sonucunu beklemez.",
          "values": [
            [
              "Kan kültürü",
              "2 set alındı",
              "Antibiyotik öncesi",
              "Uygun örnekleme"
            ],
            [
              "Balgam Gram boyama",
              "Çok sayıda nötrofil, gram pozitif diplokoklar",
              "Kaliteli örnek",
              "Destekleyici"
            ],
            [
              "İdrar pnömokok antijeni",
              "Pozitif",
              "Negatif",
              "Destekleyici"
            ],
            [
              "İnfluenza/SARS-CoV-2 PCR",
              "Negatif",
              "Negatif",
              "Viral hızlı test negatif"
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
    "question": "Bu hasta için en uygun ampirik tedavi ve bakım yeri yaklaşımı hangisidir?",
    "questionType": "Tedavi ve bakım yeri kararı",
    "answerTarget": "Ağır toplum kökenli alt solunum yolu enfeksiyonunda yatış/yoğun bakım düzeyi ve ampirik antibiyotik kapsamını ayırt etme.",
    "diagnosis": {
      "correct": "Yoğun bakım düzeyinde izlemle intravenöz beta-laktam ve makrolid kombinasyonu başlamak",
      "options": [
        "Ayaktan amoksisilin-klavulanat verip 48 saat sonra poliklinik kontrolüne çağırmak",
        "Serviste yalnız oral doksisiklin başlayıp oksijen ihtiyacını klinik izleme bırakmak",
        "Ampisilin-sulbaktamla birlikte rutin anaerobik kapsam ekleyip aspirasyon dışlanana kadar beklemek",
        "Yoğun bakım düzeyinde izlemle intravenöz beta-laktam ve makrolid kombinasyonu başlamak",
        "MRSA ve Pseudomonas kapsamlı vankomisin-meropenem kombinasyonunu herkeste standart başlamak"
      ],
      "question": "Bu hasta için en uygun ampirik tedavi ve bakım yeri yaklaşımı hangisidir?",
      "explanation": "İleri yaş, konfüzyon, taşipne, hipoksemi, düşük-normal tansiyon, BUN yüksekliği ve lober konsolidasyon birlikte ağır seyir riskini artırır. Son dönemde hastane yatışı veya dirençli patojen için belirgin risk faktörü olmadığından standart ağır toplum kökenli tabloda intravenöz beta-laktam ve makrolid kombinasyonu, oksijen desteği ve yakın monitörizasyon gerekir. Kültürler antibiyotik öncesi alınır; tedavi kültür sonucunu beklemez.",
      "pearls": [
        "Konfüzyon, yüksek solunum sayısı, düşük tansiyon ve BUN yüksekliği bakım yeri kararını etkiler.",
        "Ağır tabloda beta-laktam + makrolid kombinasyonu, tek ajanlı dar tedaviden daha güvenlidir.",
        "MRSA/Pseudomonas kapsamı yalnız uygun risk faktörü varsa eklenir.",
        "Rutin anaerobik kapsam, aspirasyon şüphesi olsa bile her hastada otomatik değildir."
      ],
      "optionFeedback": {
        "Ayaktan amoksisilin-klavulanat verip 48 saat sonra poliklinik kontrolüne çağırmak": "Amoksisilin-klavulanat bazı ayaktan, stabil ve hafif-orta şiddette olgularda düşünülebilir. Bu hastada ise oda havasında SpO2 düşüklüğü, solunum sayısının 32/dk olması, konfüzyon, BUN yüksekliği ve tansiyon düşüklüğü vardır. Bu veriler evde tedavinin güvenli olmadığını gösterir; yalnız ayaktan reçete yazmak oksijen, sıvı dengesi ve erken kötüleşme izlemini kaçırır.",
        "Serviste yalnız oral doksisiklin başlayıp oksijen ihtiyacını klinik izleme bırakmak": "Doksisiklin ayaktan veya seçilmiş hafif olgularda atipik kapsam sağlayabilir; ancak bu hasta oksijen gerektiriyor, mental durumu etkilenmiş ve sistemik hastalık ağırlığı belirgin. Ağır tabloda yalnız oral tek ajan tedavisi hem etken kapsamı hem de farmakokinetik güvenilirlik açısından zayıftır. Oksijen ihtiyacı da pasif izleme bırakılmamalı, yakın monitörize edilmelidir.",
        "Ampisilin-sulbaktamla birlikte rutin anaerobik kapsam ekleyip aspirasyon dışlanana kadar beklemek": "Aspirasyon pnömonisi; bilinç kaybı, kusma, yutma bozukluğu, kötü ağız hijyeni veya apse/ampiyem gibi bulgularla özel olarak gündeme gelir. Bu hastada lober konsolidasyon ve pnömokok lehine bulgular daha belirgindir; aspirasyon için güçlü bir olay akışı yoktur. Rutin anaerobik kapsam eklemek her ağır toplum kökenli tabloda gerekli değildir ve tedavi kararını 'aspirasyon dışlanana kadar' ertelemek doğru değildir.",
        "Yoğun bakım düzeyinde izlemle intravenöz beta-laktam ve makrolid kombinasyonu başlamak": "Bu seçenek en uygundur. Hastada hipoksemi, taşipne, konfüzyon, BUN yüksekliği, sınırda hipotansiyon ve lober konsolidasyon birlikte ağır klinik seyir riskini gösterir. Beta-laktam tipik bakteriyel etkenleri, makrolid ise atipik etkenleri ve ağır tabloda olası inflamatuvar katkıyı hedefler. Yoğun bakım düzeyi izlem, oksijen gereksinimi ve dolaşım-solunum kötüleşmesi ihtimali nedeniyle güvenli yaklaşımdır.",
        "MRSA ve Pseudomonas kapsamlı vankomisin-meropenem kombinasyonunu herkeste standart başlamak": "MRSA veya Pseudomonas kapsamı, önceki izolasyon, yakın dönemde hastane yatışı/IV antibiyotik, yapısal akciğer hastalığına bağlı belirgin risk veya ağır epidemiyolojik ipucu varsa eklenir. Bu hastada KOAH ve yaş riski vardır; ancak son bir ayda hastane yatışı/IV antibiyotik yok, önceki dirençli patojen bilgisi yoktur. Her hastaya vankomisin-meropenem başlamak gereksiz geniş spektrum, direnç ve toksisite riskini artırır."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "Ağır toplum kökenli alt solunum yolu enfeksiyonunda bakım yeri kararı vital bulgular, oksijen ihtiyacı, mental durum ve organ fonksiyon verileriyle yapılır; dirençli patojen riski yoksa ağır olguda intravenöz beta-laktam + makrolid sık kullanılan ampirik yaklaşımdır.",
    "examPearl": "TUS ipucu: yaşlı hasta + konfüzyon + RR yüksek + BUN yüksek + hipoksemi → ayaktan tedavi değil, hastane/yoğun bakım düzeyi ve IV kombinasyon tedavisi.",
    "whyCorrect": "Doğru seçenek hem hastalık ağırlığını hem de dirençli patojen risk faktörlerinin yokluğunu birlikte dikkate alır.",
    "optionComparison": "Yanlış seçenekler ayaktan tedavi, yetersiz tek ajan, gereksiz anaerobik kapsam veya herkeste gereksiz geniş dirençli patojen kapsamı hatalarını temsil eder.",
    "evidenceChain": [
      "Konfüzyon + solunum sayısı 32/dk → ağır klinik seyir ve yakın izlem gereği.",
      "SpO2 %87 + PaO2 56 mmHg → oksijen gerektiren hipoksemi.",
      "BUN 34 mg/dL + TA 96/58 mmHg → sistemik hastalık ağırlığı ve volüm/perfüzyon riski.",
      "Lober konsolidasyon + nötrofilik lökositoz → ampirik bakteriyel kapsama ihtiyacı.",
      "Son hastane/IV antibiyotik öyküsünün olmaması → rutin MRSA/Pseudomonas kapsamı gerektirmeyen başlangıç profili."
    ],
    "whyWrong": "Yanlış seçenekler hastalığın ağırlığını veya dirençli patojen riskini yanlış yorumlar; doğru yaklaşım klinik ağırlık ile hedefli ampirik kapsamı birlikte düzenler.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v306",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V305 render-safe internal-medicine cases with diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  },
{
    "id": "v306-new-720-aclik-sonrasi-bulanti-ve-derin-nefes-alma",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "Açlık sonrası bulantı ve derin nefes alma",
    "difficulty": "Zor",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "SGLT2 inhibitörü kullanan diyabet hastasında belirgin hiperglisemi olmadan gelişen yüksek anyon açıklı metabolik asidoz ve ketozu tanıyıp tedaviyi glukoz düzeyine göre geciktirmeme.",
    "learningTarget": "Normale yakın kan şekeri varlığında ketoasidozu atlamadan sıvı, potasyum, insülin ve dekstroz dengesini kurma.",
    "demographics": "46 yaşında kadın hasta",
    "setting": "Acil servis dahiliye değerlendirme odası",
    "chiefComplaint": "Bir gündür süren bulantı, karın ağrısı ve hızlı nefes alma nedeniyle başvuruyor.",
    "stem": "Hasta iki gündür iştahsız olduğunu, kilo vermek için karbonhidratı çok azalttığını ve dün akşamdan beri neredeyse hiçbir şey yiyemediğini anlatır. Bu sabah bulantısı artmış, karnının üst kısmında yaygın rahatsızlık hissetmiş ve ailesi nefeslerinin derinleştiğini fark etmiştir. Tip 2 diyabet için metformin ve empagliflozin kullanmaktadır; son insülin kullanımı yoktur. Evde ölçtüğü kan şekeri 180-220 mg/dL arasında olduğu için 'çok yüksek değil' diye acile gelmeyi geciktirdiğini söyler. Ateş, ishal, kanlı kusma veya yeni alkol alımı tariflemez. Son iki gündür idrar miktarının arttığını ve ağzının çok kuruduğunu belirtir.",
    "patientIntro": {
      "profile": "46 yaşında kadın hasta, Acil servis dahiliye değerlendirme odası ortamında değerlendiriliyor.",
      "presentation": "Bir gündür süren bulantı, karın ağrısı ve hızlı nefes alma nedeniyle başvuruyor.",
      "historySummary": "Hasta iki gündür iştahsız olduğunu, kilo vermek için karbonhidratı çok azalttığını ve dün akşamdan beri neredeyse hiçbir şey yiyemediğini anlatır. Bu sabah bulantısı artmış, karnının üst kısmında yaygın rahatsızlık hissetmiş ve ailesi nefeslerinin derinleştiğini fark etmiştir. Tip 2 diyabet için metformin ve empagliflozin kullanmaktadır; son insülin kullanımı yoktur. Evde ölçtüğü kan şekeri 180-220 mg/dL arasında olduğu için 'çok yüksek değil' diye acile gelmeyi geciktirdiğini söyler. Ateş, ishal, kanlı kusma veya yeni alkol alımı tariflemez. Son iki gündür idrar miktarının arttığını ve ağzının çok kuruduğunu belirtir."
    },
    "vitals": {
      "TA": "104/66 mmHg",
      "Nabız": "112/dk",
      "Solunum": "30/dk, derin",
      "SpO2": "%98 oda havasında",
      "Ateş": "36.6 °C",
      "Şok indeksi": "1.08 - mukozalar kuru, kapiller dolum 2-3 saniye"
    },
    "exam": [
      "Hasta halsiz ve susuz görünüyor, bilinci açık ancak konuşurken sık nefes arası veriyor.",
      "Ağız mukozası kuru, deri turgoru hafif azalmış.",
      "Akciğer sesleri doğal, ral veya wheezing yok.",
      "Karında yaygın hafif hassasiyet var; defans veya rebound yok.",
      "Nörolojik muayenede lateralizan bulgu saptanmıyor."
    ],
    "investigations": [
      {
        "id": "v306-new-720-kan-gazi",
        "label": "Venöz kan gazı ve asit-baz",
        "title": "Venöz kan gazı ve asit-baz",
        "orderLabel": "Venöz kan gazı ve asit-baz",
        "type": "lab",
        "priority": "essential",
        "subtype": "Kan gazı",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Yüksek anyon açıklı metabolik asidoz ve solunumsal kompansasyon vardır.",
        "clinicalMeaning": "Derin solunumun metabolik asidoza kompansatuvar yanıt olduğunu gösterir.",
        "result": {
          "title": "Venöz kan gazı ve asit-baz",
          "summary": "Yüksek anyon açıklı metabolik asidoz ve solunumsal kompansasyon vardır.",
          "interpretation": "Yüksek anyon açıklı metabolik asidoz ve solunumsal kompansasyon vardır.",
          "values": [
            [
              "pH",
              "7.21",
              "7.35-7.45",
              "Düşük"
            ],
            [
              "HCO3-",
              "11 mmol/L",
              "22-26 mmol/L",
              "Düşük"
            ],
            [
              "pCO2",
              "25 mmHg",
              "35-45 mmHg",
              "Düşük"
            ],
            [
              "Anyon açıklığı",
              "24 mmol/L",
              "8-12 mmol/L",
              "Yüksek"
            ],
            [
              "Laktat",
              "1.6 mmol/L",
              "<2 mmol/L",
              "Normal"
            ]
          ]
        }
      },
      {
        "id": "v306-new-720-glukoz-keton",
        "label": "Glukoz ve keton değerlendirmesi",
        "title": "Glukoz ve keton değerlendirmesi",
        "orderLabel": "Glukoz ve keton değerlendirmesi",
        "type": "lab",
        "priority": "essential",
        "subtype": "Acil metabolik testler",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Belirgin ketonemiye rağmen glukoz düzeyi klasik ağır hiperglisemi aralığında değildir.",
        "clinicalMeaning": "Kan şekeri tek başına tablo ağırlığını dışlamaz.",
        "result": {
          "title": "Glukoz ve keton değerlendirmesi",
          "summary": "Belirgin ketonemiye rağmen glukoz düzeyi klasik ağır hiperglisemi aralığında değildir.",
          "interpretation": "Belirgin ketonemiye rağmen glukoz düzeyi klasik ağır hiperglisemi aralığında değildir.",
          "values": [
            [
              "Plazma glukoz",
              "214 mg/dL",
              "70-140 mg/dL",
              "Orta düzey yüksek"
            ],
            [
              "Beta-hidroksibütirat",
              "5.9 mmol/L",
              "<0.6 mmol/L",
              "Yüksek"
            ],
            [
              "İdrar ketonu",
              "3+",
              "Negatif",
              "Pozitif"
            ],
            [
              "HbA1c",
              "%8.1",
              "<%5.7",
              "Yüksek"
            ],
            [
              "Serum osmolalitesi",
              "299 mOsm/kg",
              "275-295 mOsm/kg",
              "Hafif yüksek"
            ]
          ]
        }
      },
      {
        "id": "v306-new-720-elektrolit-bobrek",
        "label": "Elektrolit ve böbrek fonksiyonu",
        "title": "Elektrolit ve böbrek fonksiyonu",
        "orderLabel": "Elektrolit ve böbrek fonksiyonu",
        "type": "lab",
        "priority": "essential",
        "subtype": "Biyokimya",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Volüm kaybı ve potasyum dengesinin tedavi öncesi değerlendirilmesi gerekir.",
        "clinicalMeaning": "İnsülin başlanmadan önce potasyum güvenliği ve sıvı açığı birlikte ele alınmalıdır.",
        "result": {
          "title": "Elektrolit ve böbrek fonksiyonu",
          "summary": "Volüm kaybı ve potasyum dengesinin tedavi öncesi değerlendirilmesi gerekir.",
          "interpretation": "İnsülin başlanmadan önce potasyum güvenliği ve sıvı açığı birlikte ele alınmalıdır.",
          "values": [
            [
              "Sodyum",
              "134 mmol/L",
              "135-145 mmol/L",
              "Hafif düşük"
            ],
            [
              "Potasyum",
              "4.9 mmol/L",
              "3.5-5.1 mmol/L",
              "Üst sınıra yakın"
            ],
            [
              "Kreatinin",
              "1.1 mg/dL",
              "0.6-1.1 mg/dL",
              "Üst sınır"
            ],
            [
              "Üre",
              "42 mg/dL",
              "15-40 mg/dL",
              "Hafif yüksek"
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
        "id": "v306-new-720-enfeksiyon-tarama",
        "label": "Tetikleyici taraması",
        "title": "Tetikleyici taraması",
        "orderLabel": "Tetikleyici taraması",
        "type": "lab",
        "priority": "supportive",
        "subtype": "Enfeksiyon ve kardiyak tarama",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Ateş, belirgin enfeksiyon odağı veya akut kardiyak hasar bulgusu saptanmaz.",
        "clinicalMeaning": "Açlık ve ilaç ilişkili metabolik stres ön planda kalır.",
        "result": {
          "title": "Tetikleyici taraması",
          "summary": "Ateş, belirgin enfeksiyon odağı veya akut kardiyak hasar bulgusu saptanmaz.",
          "interpretation": "Ateş, belirgin enfeksiyon odağı veya akut kardiyak hasar bulgusu saptanmaz.",
          "values": [
            [
              "Lökosit",
              "9.800/mm³",
              "4.000-10.000/mm³",
              "Üst sınıra yakın"
            ],
            [
              "CRP",
              "6 mg/L",
              "<5 mg/L",
              "Hafif yüksek"
            ],
            [
              "Troponin I",
              "0.012 ng/mL",
              "<0.04 ng/mL",
              "Normal"
            ],
            [
              "İdrar nitrit/lökosit esteraz",
              "Negatif/negatif",
              "Negatif",
              "Enfeksiyon lehine değil"
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
    "question": "Bu hastada acil yönetimde öncelikli tedavi yaklaşımı hangisidir?",
    "questionType": "Acil metabolik tedavi",
    "answerTarget": "Normale yakın glukozlu ketoasidozda insülinin dekstrozla birlikte sürdürülmesi gerektiğini ayırt etme.",
    "diagnosis": {
      "correct": "İzotonik sıvı ve potasyum izlemiyle birlikte intravenöz insülin infüzyonu başlamak, glukozu güvenli aralıkta tutmak için dekstroz eklemek ve SGLT2 inhibitörünü kesmek",
      "options": [
        "Glukoz 250 mg/dL altında olduğu için insülini erteleyip yalnız oral karbonhidrat ve gözlem uygulamak",
        "İzotonik sıvı ve potasyum izlemiyle birlikte intravenöz insülin infüzyonu başlamak, glukozu güvenli aralıkta tutmak için dekstroz eklemek ve SGLT2 inhibitörünü kesmek",
        "Metformin dozunu artırıp taburculukta açlık diyetini sürdürmesini önermek",
        "Sodyum bikarbonatı rutin yüksek doz verip insülin tedavisini pH normale dönene kadar bekletmek",
        "Geniş spektrum antibiyotik başlayıp ketonların enfeksiyon gerileyince kendiliğinden düzelmesini beklemek"
      ],
      "question": "Bu hastada acil yönetimde öncelikli tedavi yaklaşımı hangisidir?",
      "explanation": "Kan şekeri çok yüksek görünmese de pH düşüklüğü, bikarbonat azalması, yüksek anyon açıklığı ve belirgin beta-hidroksibütirat ketoasidozu gösterir. SGLT2 inhibitörü, düşük karbonhidrat alımı ve açlık glukozu çok yükseltmeden ketogenez eşiğini düşürebilir. Tedavide sıvı açığı düzeltilir, potasyum yakından izlenir, keton üretimini durdurmak için insülin verilir ve hipoglisemiyi önlemek için dekstroz eklenir; SGLT2 inhibitörü kesilir.",
      "pearls": [
        "Ketoasidoz tanısı yalnız glukoz yüksekliğine bağlanmaz; pH, HCO3, anyon açıklığı ve keton birlikte yorumlanır.",
        "SGLT2 inhibitörleri glukozürik etkiyle kan şekerini beklenenden düşük tutabilir.",
        "İnsülin ketogenezi durdurmak için gerekir; glukoz düşükse dekstroz eklenerek insülin sürdürülür.",
        "Potasyum tedavinin güvenlik kilididir; insülin potasyumu hücre içine sokar."
      ],
      "optionFeedback": {
        "Glukoz 250 mg/dL altında olduğu için insülini erteleyip yalnız oral karbonhidrat ve gözlem uygulamak": "Bu yaklaşım tehlikelidir çünkü ketoasidozun ağırlığı yalnız glukoz düzeyiyle belirlenmez. Hastada pH 7.21, HCO3 11 mmol/L, anyon açıklığı 24 mmol/L ve beta-hidroksibütirat 5.9 mmol/L'dir. Oral karbonhidrat ve gözlem keton üretimini durdurmaz; asidoz derinleşebilir. Normale yakın glukoz, özellikle SGLT2 inhibitörü kullanan ve aç kalan hastada tanıyı dışlamaz.",
        "İzotonik sıvı ve potasyum izlemiyle birlikte intravenöz insülin infüzyonu başlamak, glukozu güvenli aralıkta tutmak için dekstroz eklemek ve SGLT2 inhibitörünü kesmek": "Bu seçenek en uygundur. Temel problem glukozun mutlak yüksekliği değil, insülin etkisinin yetersizliği ve keton üretiminin devam etmesidir. Sıvı tedavisi dolaşım ve böbrek perfüzyonunu düzeltir; insülin lipoliz ve ketogenezi baskılar; dekstroz, glukoz çok düşmeden insülinin sürdürülmesine izin verir. Potasyum düzenli izlenmelidir çünkü insülin tedavisi potasyumu hücre içine kaydırabilir. SGLT2 inhibitörünün kesilmesi tekrar eden metabolik tetiklenmeyi önler.",
        "Metformin dozunu artırıp taburculukta açlık diyetini sürdürmesini önermek": "Metformin kronik glisemik kontrol ilacıdır; akut yüksek anyon açıklı ketoasidozu düzeltmez. Üstelik hasta dehidrate ve metabolik olarak stres altındayken oral ilaç dozunu artırmak güvenli bir acil yaklaşım değildir. Açlık ve düşük karbonhidrat alımı bu tabloda tetikleyici rol oynadığı için sürdürülmesi önerilmez.",
        "Sodyum bikarbonatı rutin yüksek doz verip insülin tedavisini pH normale dönene kadar bekletmek": "Bikarbonat çok ağır asidemide seçilmiş durumlarda tartışılabilir; ancak bu hastada asıl tedavi keton üretimini durdurmaktır. İnsülini bekletmek patofizyolojiyi sürdürür. Rutin yüksek doz bikarbonat potasyum kaymaları, sodyum yükü ve paradoksal etkiler açısından risk taşır; pH 7.21 düzeyinde ana basamak sıvı, potasyum güvenliği, insülin ve dekstrozdur.",
        "Geniş spektrum antibiyotik başlayıp ketonların enfeksiyon gerileyince kendiliğinden düzelmesini beklemek": "Enfeksiyon ketoasidozu tetikleyebilir; ateş, belirgin lökositoz, yüksek CRP/prokalsitonin veya odak varsa antibiyotik gerekir. Bu olguda enfeksiyon için güçlü veri yoktur ve metabolik zincir açlık ile SGLT2 inhibitörü kullanımına bağlanır. Antibiyotik ketogenezi durdurmaz; ketoasidoz tedavisini geciktirmek asidozu ve volüm kaybını kötüleştirir."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "SGLT2 inhibitörü ilişkili ketoasidozda glukoz belirgin yüksek olmayabilir; tedavi sıvı, potasyum güvenliği, insülin infüzyonu, dekstroz desteği ve tetikleyici ilacın kesilmesidir.",
    "examPearl": "TUS ipucu: SGLT2 inhibitörü + açlık/düşük karbonhidrat + yüksek anyon açıklı asidoz + keton yüksek ama glukoz <250 → insülini erteleme, dekstrozla birlikte ver.",
    "whyCorrect": "Doğru seçenek, glukoz düzeyine aldanmadan ketogenezi durduran ve hipoglisemi-potasyum riskini birlikte yöneten yaklaşımdır.",
    "optionComparison": "Yanlış seçenekler glukoz değerine aşırı güvenme, kronik oral tedaviye yönelme, gereksiz bikarbonat önceliği veya kanıtsız enfeksiyon odağına odaklanma hatalarını temsil eder.",
    "evidenceChain": [
      "Empagliflozin + düşük karbonhidrat/açlık → glukoz çok yükselmeden ketoz riskini artırır.",
      "pH 7.21 + HCO3 11 + anyon açıklığı 24 → yüksek anyon açıklı metabolik asidoz.",
      "Beta-hidroksibütirat 5.9 mmol/L + idrar ketonu 3+ → belirgin keton yükü.",
      "Glukoz 214 mg/dL → klasik ağır hiperglisemi yok; bu değer ketoasidozu dışlamaz.",
      "Potasyum 4.9 mmol/L → insülin verilebilir ancak sık potasyum izlemi gerekir."
    ],
    "whyWrong": "Yanlış seçenekler metabolik asidoz ve keton yüksekliğinin acil önemini geri plana iter; doğru yaklaşım keton üretimini durdururken glukoz ve potasyumu güvenli aralıkta tutar.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v306",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V305 render-safe internal-medicine cases with diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  },
{
    "id": "v306-new-721-kanli-balgam-ve-hizla-azalan-idrar",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "Kanlı balgam ve hızla azalan idrar",
    "difficulty": "Zor",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "Pulmoner kanama ve hızlı ilerleyen glomerüler hasar bulgularını birlikte değerlendirerek otoantikor aracılı acil tedavi gerekliliğini ayırt etme.",
    "learningTarget": "Pulmoner-renal sendromda yalnız antibiyotik, yalnız diyaliz veya biyopsi sonucu bekleme yerine antikor uzaklaştırma ve immünsupresyonu birlikte başlatma kararını verme.",
    "demographics": "31 yaşında erkek hasta",
    "setting": "Acil servis ve nefroloji konsültasyonu",
    "chiefComplaint": "İki gündür kanlı balgam, halsizlik ve idrar miktarında belirgin azalma nedeniyle getiriliyor.",
    "stem": "Hasta bir hafta önce hafif boğaz ağrısı ve kırgınlık yaşadığını, son iki gündür ise öksürürken peçeteye çizgi şeklinde kan geldiğini anlatır. Bu sabah idrarının çay renginde olduğunu fark etmiş ve gün boyunca çok az idrara çıkmıştır. Nefes darlığı merdiven çıkarken başlamış, bugün kısa mesafe yürümekle artmıştır. Sigara içmektedir; bilinen böbrek hastalığı, diyabet veya hipertansiyon öyküsü yoktur. Burun tıkanıklığı, sinüs ağrısı, ciltte purpura veya uzun süredir devam eden eklem şişliği tariflemez. Son haftalarda yeni ilaç, kokain kullanımı veya yoğun egzersiz öyküsü yoktur.",
    "patientIntro": {
      "profile": "31 yaşında erkek hasta, Acil servis ve nefroloji konsültasyonu ortamında değerlendiriliyor.",
      "presentation": "İki gündür kanlı balgam, halsizlik ve idrar miktarında belirgin azalma nedeniyle getiriliyor.",
      "historySummary": "Hasta bir hafta önce hafif boğaz ağrısı ve kırgınlık yaşadığını, son iki gündür ise öksürürken peçeteye çizgi şeklinde kan geldiğini anlatır. Bu sabah idrarının çay renginde olduğunu fark etmiş ve gün boyunca çok az idrara çıkmıştır. Nefes darlığı merdiven çıkarken başlamış, bugün kısa mesafe yürümekle artmıştır. Sigara içmektedir; bilinen böbrek hastalığı, diyabet veya hipertansiyon öyküsü yoktur. Burun tıkanıklığı, sinüs ağrısı, ciltte purpura veya uzun süredir devam eden eklem şişliği tariflemez. Son haftalarda yeni ilaç, kokain kullanımı veya yoğun egzersiz öyküsü yoktur."
    },
    "vitals": {
      "TA": "158/94 mmHg",
      "Nabız": "106/dk",
      "Solunum": "26/dk",
      "SpO2": "%90 oda havasında, 3 L/dk oksijenle %95",
      "Ateş": "37.2 °C",
      "Şok indeksi": "0.67 - periferik perfüzyon korunmuş, mukozalar soluk"
    },
    "exam": [
      "Hasta soluk ve hafif dispneik, bilinci açık.",
      "Akciğer bazallerinde bilateral ince ral duyuluyor.",
      "Pretibial ödem hafif; juguler venöz dolgunluk belirgin değil.",
      "Ciltte palpabl purpura, livedo veya ülser yok.",
      "Nazal kabuklanma ve belirgin sinüzit hassasiyeti saptanmıyor."
    ],
    "investigations": [
      {
        "id": "v306-new-721-idrar-sediment",
        "label": "İdrar analizi ve sediment",
        "title": "İdrar analizi ve sediment",
        "orderLabel": "İdrar analizi ve sediment",
        "type": "lab",
        "priority": "essential",
        "subtype": "Tam idrar ve mikroskopi",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Glomerüler kaynaklı hematüri ve aktif sediment vardır.",
        "clinicalMeaning": "Alt üriner sistem kanamasından çok glomerüler inflamasyon eksenini destekler.",
        "result": {
          "title": "İdrar analizi ve sediment",
          "summary": "Glomerüler kaynaklı hematüri ve aktif sediment vardır.",
          "interpretation": "Glomerüler kaynaklı hematüri ve aktif sediment vardır.",
          "values": [
            [
              "Protein",
              "2+",
              "Negatif/trace",
              "Yüksek"
            ],
            [
              "Eritrosit",
              ">100/hpf",
              "0-3/hpf",
              "Yüksek"
            ],
            [
              "Dismorfik eritrosit",
              "%65",
              "Yok",
              "Belirgin"
            ],
            [
              "Eritrosit silendiri",
              "Pozitif",
              "Yok",
              "Aktif sediment"
            ],
            [
              "Protein/kreatinin",
              "1.4 g/g",
              "<0.2 g/g",
              "Yüksek"
            ]
          ]
        }
      },
      {
        "id": "v306-new-721-bobrek-fonksiyon",
        "label": "Böbrek fonksiyon ve inflamasyon",
        "title": "Böbrek fonksiyon ve inflamasyon",
        "orderLabel": "Böbrek fonksiyon ve inflamasyon",
        "type": "lab",
        "priority": "essential",
        "subtype": "Biyokimya ve hemogram",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Kısa sürede gelişen azotemi ve anemi vardır.",
        "clinicalMeaning": "Hızlı ilerleyen glomerüler süreç ve pulmoner kan kaybı birlikte düşünülmelidir.",
        "result": {
          "title": "Böbrek fonksiyon ve inflamasyon",
          "summary": "Kısa sürede gelişen azotemi ve anemi vardır.",
          "interpretation": "Kısa sürede gelişen azotemi ve anemi vardır.",
          "values": [
            [
              "Kreatinin",
              "3.2 mg/dL",
              "0.6-1.2 mg/dL",
              "Yüksek"
            ],
            [
              "Üre",
              "86 mg/dL",
              "15-40 mg/dL",
              "Yüksek"
            ],
            [
              "Potasyum",
              "5.3 mmol/L",
              "3.5-5.1 mmol/L",
              "Hafif yüksek"
            ],
            [
              "Hemoglobin",
              "9.1 g/dL",
              "13-17 g/dL",
              "Düşük"
            ],
            [
              "CRP",
              "34 mg/L",
              "<5 mg/L",
              "Yüksek"
            ]
          ]
        }
      },
      {
        "id": "v306-new-721-akciger-bt",
        "label": "Toraks BT",
        "title": "Toraks BT",
        "orderLabel": "Toraks BT",
        "type": "imaging",
        "priority": "essential",
        "subtype": "Kontrastsız toraks BT",
        "category": "imaging",
        "testTypeCategory": "imaging",
        "summary": "Bilateral yamalı buzlu cam alanları ve alveoler dolum bulguları vardır.",
        "clinicalMeaning": "Klinikle birlikte alveoler kanama olasılığını güçlendiren dağılım vardır.",
        "result": {
          "title": "Toraks BT",
          "summary": "Bilateral yamalı buzlu cam alanları ve alveoler dolum bulguları vardır.",
          "interpretation": "Bilateral yamalı buzlu cam alanları ve alveoler dolum bulguları vardır; belirgin lobar konsolidasyon veya plevral efüzyon yoktur.",
          "narrative": "Her iki akciğerde perihiler ve bazal alanlarda yamalı buzlu cam dansiteleri izlenir. Kavitasyon, belirgin nodül kümelenmesi veya apse görünümü saptanmaz."
        }
      },
      {
        "id": "v306-new-721-seroloji",
        "label": "Seroloji ve otoantikorlar",
        "title": "Seroloji ve otoantikorlar",
        "orderLabel": "Seroloji ve otoantikorlar",
        "type": "lab",
        "priority": "essential",
        "subtype": "Otoimmün panel",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Bazal membran antikor pozitifliği vardır; ANCA ve kompleman paterni alternatifleri zayıflatır.",
        "clinicalMeaning": "Antikor aracılı hedefe yönelik acil tedavi gerekliliğini destekleyen veri sağlar.",
        "result": {
          "title": "Seroloji ve otoantikorlar",
          "summary": "Bazal membran antikor pozitifliği vardır; ANCA ve kompleman paterni alternatifleri zayıflatır.",
          "interpretation": "Bazal membran antikor pozitifliği vardır; ANCA ve kompleman paterni alternatifleri zayıflatır.",
          "values": [
            [
              "Anti-GBM antikoru",
              "Pozitif, yüksek titre",
              "Negatif",
              "Pozitif"
            ],
            [
              "p-ANCA/c-ANCA",
              "Negatif/negatif",
              "Negatif",
              "Negatif"
            ],
            [
              "C3",
              "96 mg/dL",
              "90-180 mg/dL",
              "Normal"
            ],
            [
              "C4",
              "24 mg/dL",
              "10-40 mg/dL",
              "Normal"
            ],
            [
              "Anti-dsDNA",
              "Negatif",
              "Negatif",
              "Negatif"
            ]
          ]
        }
      },
      {
        "id": "v306-new-721-biyopsi",
        "label": "Böbrek biyopsisi",
        "title": "Böbrek biyopsisi",
        "orderLabel": "Böbrek biyopsisi",
        "type": "procedure",
        "priority": "essential",
        "subtype": "Histopatoloji ve immünfloresan",
        "category": "procedure",
        "testTypeCategory": "procedure",
        "summary": "Kresentik glomerüler hasar ve lineer immün birikim gösterilir.",
        "clinicalMeaning": "Tedavi gecikirse kalıcı böbrek kaybı riski yüksektir.",
        "result": {
          "title": "Böbrek biyopsisi",
          "summary": "Kresentik glomerüler hasar ve lineer immün birikim gösterilir.",
          "interpretation": "Kresentik glomerüler hasar ve lineer immün birikim gösterilir.",
          "narrative": "Glomerüllerin büyük kısmında hücresel kresentler ve fibrinoid nekroz odakları izlenir. İmmünfloresanda glomerüler bazal membran boyunca lineer IgG ve C3 boyanması vardır. Belirgin granüler immün kompleks paterni izlenmez."
        }
      }
    ],
    "useSyntheticInvestigationBank": true,
    "managementSequence": {
      "enabled": false
    },
    "hideExamSignal": true,
    "question": "Bu hastada renal ve pulmoner hasarı sınırlamak için en uygun acil tedavi kombinasyonu hangisidir?",
    "questionType": "Acil tedavi / mekanizma hedefi",
    "answerTarget": "Anti-bazal membran antikor aracılı pulmoner-renal sendromda plazmaferez ve immünsupresyon kombinasyonunu seçme.",
    "diagnosis": {
      "correct": "Plazma değişimiyle birlikte yüksek doz glukokortikoid ve siklofosfamid başlamak",
      "options": [
        "Yalnız yüksek doz loop diüretik verip kreatinin seyrine göre taburculuk planlamak",
        "Ampirik geniş spektrum antibiyotik başlayıp otoantikor sonucu kesinleşene kadar immün tedaviyi ertelemek",
        "ACE inhibitörü başlatıp proteinüri azalmasını izlemek",
        "Hemodiyaliz başlatıp pulmoner bulgular gerileyene kadar immünsupresyon vermemek",
        "Plazma değişimiyle birlikte yüksek doz glukokortikoid ve siklofosfamid başlamak"
      ],
      "question": "Bu hastada renal ve pulmoner hasarı sınırlamak için en uygun acil tedavi kombinasyonu hangisidir?",
      "explanation": "Kanlı balgam, bilateral alveoler dolum alanları, hızlı kreatinin artışı, aktif glomerüler sediment, anti-GBM pozitifliği ve biyopside lineer IgG birikimi antikor aracılı pulmoner-renal hasarı gösterir. Tedavinin üç ayağı vardır: dolaşımdaki patojenik antikorları uzaklaştırmak için plazma değişimi, inflamasyonu hızlı baskılamak için yüksek doz glukokortikoid ve yeni antikor üretimini azaltmak için siklofosfamid. Bu tablo saatler-günler içinde kalıcı böbrek hasarı ve yaşamı tehdit eden akciğer kanamasına ilerleyebilir.",
      "pearls": [
        "Pulmoner kanama + eritrosit silendiri glomerüler-pulmoner ortak süreci akla getirir.",
        "Lineer IgG boyanması granüler immün kompleks hastalıklarından ayrılır.",
        "Plazma değişimi mevcut antikoru uzaklaştırır; siklofosfamid yeni antikor üretimini baskılar.",
        "Diyaliz gerekebilir ama patojenik antikor sürecinin tedavisinin yerine geçmez."
      ],
      "optionFeedback": {
        "Yalnız yüksek doz loop diüretik verip kreatinin seyrine göre taburculuk planlamak": "Loop diüretikler volüm yüklenmesi ve ödem yönetiminde semptomatik yarar sağlayabilir. Bu hastada asıl sorun volüm fazlalığı değil; aktif eritrosit silendiri, hızlı kreatinin artışı, pulmoner kanama bulguları ve lineer IgG birikimiyle seyreden agresif glomerüler hasardır. Yalnız diüretik vermek patojenik antikoru veya inflamasyonu durdurmaz ve taburculuk planı güvenli değildir.",
        "Ampirik geniş spektrum antibiyotik başlayıp otoantikor sonucu kesinleşene kadar immün tedaviyi ertelemek": "Akciğer infiltratı ve kanlı balgam enfeksiyonla karışabilir; ancak ateşin belirgin olmaması, aktif glomerüler sediment, anti-GBM pozitifliği ve lineer boyanma enfeksiyon dışı antikor aracılı bir süreci güçlendirir. Sepsis veya eşlik eden enfeksiyon şüphesi varsa antibiyotik eklenebilir; fakat immün tedaviyi bekletmek böbrek ve akciğer hasarını artırır. Pulmoner-renal sendromda zaman kritik bir değişkendir.",
        "ACE inhibitörü başlatıp proteinüri azalmasını izlemek": "ACE inhibitörleri proteinürik kronik böbrek hastalığında uzun dönem renal koruma sağlayabilir. Ancak hızlı kreatinin artışı, eritrosit silendiri ve pulmoner kanama bulunan bu hastada destekleyici antiproteinürik tedavi yeterli değildir. Ayrıca akut böbrek fonksiyon bozukluğunda ACE inhibitörü hemodinamik GFR düşüşünü artırabilir. Bu seçenek aktif kresentik hasarın acil tedavisini karşılamaz.",
        "Hemodiyaliz başlatıp pulmoner bulgular gerileyene kadar immünsupresyon vermemek": "Hemodiyaliz hiperkalemi, ağır üremi, volüm yükü veya ciddi asidoz gelişirse hayat kurtarıcı destek olabilir. Fakat diyaliz dolaşımdaki patojenik antikorları yeterli hızda ortadan kaldırmaz ve yeni antikor üretimini baskılamaz. Pulmoner kanama bulguları varken immünsupresyonu ertelemek kanamayı ve kresentik hasarı ilerletebilir. Diyaliz gerekse bile özgül tedaviyle birlikte düşünülür.",
        "Plazma değişimiyle birlikte yüksek doz glukokortikoid ve siklofosfamid başlamak": "Bu seçenek en uygundur. Plazma değişimi dolaşımdaki anti-bazal membran antikorlarını uzaklaştırır; yüksek doz glukokortikoid akut inflamasyonu baskılar; siklofosfamid ise antikor üretimini sürdüren immün hücre yanıtını azaltır. Pulmoner kanama ve hızlı böbrek fonksiyon kaybı bulunduğu için tedavi geciktirilmemelidir. Biyopsi ve seroloji bu mekanizmayı desteklediğinde yalnız destek tedavisi yeterli olmaz."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "Anti-GBM ilişkili pulmoner-renal sendromda dolaşımdaki antikorların plazma değişimiyle uzaklaştırılması, yüksek doz steroidle inflamasyonun baskılanması ve siklofosfamidle yeni antikor üretiminin azaltılması hedeflenir.",
    "examPearl": "TUS ipucu: hemoptizi + hızlı kreatinin artışı + eritrosit silendiri + lineer IgG → plazmaferez + steroid + siklofosfamid.",
    "whyCorrect": "Doğru seçenek hem mevcut antikor yükünü hem de devam eden immün üretimi hedefleyen tek kombinasyondur.",
    "optionComparison": "Yanlış seçenekler destek tedavisi, enfeksiyon varsayımı, kronik antiproteinürik yaklaşım veya yalnız diyaliz ekseninde kalır; bu olguda antikor aracılı acil doku hasarı ön plandadır.",
    "evidenceChain": [
      "Kanlı balgam + bilateral buzlu cam alanları → alveoler kanama olasılığı.",
      "Kreatinin 3.2 + oligüri → hızlı böbrek fonksiyon kaybı.",
      "Dismorfik eritrosit + eritrosit silendiri → glomerüler kanama ve aktif sediment.",
      "Anti-GBM pozitifliği + normal kompleman + ANCA negatifliği → hedef antikor paternini güçlendirir.",
      "Lineer IgG/C3 boyanması + kresentler → acil antikor uzaklaştırma ve immünsupresyon gereği."
    ],
    "whyWrong": "Yanlış seçenekler doku hasarını sürdüren antikor mekanizmasını durdurmaz; doğru yaklaşım antikorları uzaklaştırma ve üretimini baskılamayı birlikte sağlar.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v306",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V305 render-safe internal-medicine cases with diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  },
{
    "id": "v306-new-722-genis-morluklar-ve-uzayan-pihtilasma-testi",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "Geniş morluklar ve uzayan pıhtılaşma testi",
    "difficulty": "Zor",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "Yaşlı hastada spontan yumuşak doku kanaması ve izole aPTT uzamasını faktör inhibitörü açısından yorumlayarak akut kanama kontrolünü ve inhibitör eradikasyonunu ayırt etme.",
    "learningTarget": "İzole aPTT uzaması ve karışım testinde düzelmeme paterninde taze donmuş plazma veya trombosit yerine bypassing ajan ve immünsupresyon gerekliliğini seçme.",
    "demographics": "68 yaşında kadın hasta",
    "setting": "Acil servis hematoloji konsültasyonu",
    "chiefComplaint": "Son bir haftada artan geniş morluklar ve sağ uylukta ağrılı şişlik nedeniyle başvuruyor.",
    "stem": "Hasta belirgin bir travma hatırlamadığını, önce kollarında avuç içi büyüklüğünde morluklar çıktığını, son iki gündür sağ uyluğunda giderek artan ağrı ve gerginlik hissettiğini anlatır. Diş eti kanaması çok belirgin değildir; burun kanaması veya siyah dışkı fark etmemiştir. Çocuklukta, doğumlarında veya önceki ameliyatlarında aşırı kanama öyküsü olmadığını söyler. Düzenli aspirin, varfarin veya heparin kullanımı yoktur; yalnız hipertansiyon için amlodipin almaktadır. Son haftalarda kilo kaybı veya ateş tariflemez, ancak yeni başlayan halsizlik nedeniyle günlük yürüyüşlerini bırakmıştır. Ailesinde bilinen kanama hastalığı yoktur.",
    "patientIntro": {
      "profile": "68 yaşında kadın hasta, Acil servis hematoloji konsültasyonu ortamında değerlendiriliyor.",
      "presentation": "Son bir haftada artan geniş morluklar ve sağ uylukta ağrılı şişlik nedeniyle başvuruyor.",
      "historySummary": "Hasta belirgin bir travma hatırlamadığını, önce kollarında avuç içi büyüklüğünde morluklar çıktığını, son iki gündür sağ uyluğunda giderek artan ağrı ve gerginlik hissettiğini anlatır. Diş eti kanaması çok belirgin değildir; burun kanaması veya siyah dışkı fark etmemiştir. Çocuklukta, doğumlarında veya önceki ameliyatlarında aşırı kanama öyküsü olmadığını söyler. Düzenli aspirin, varfarin veya heparin kullanımı yoktur; yalnız hipertansiyon için amlodipin almaktadır. Son haftalarda kilo kaybı veya ateş tariflemez, ancak yeni başlayan halsizlik nedeniyle günlük yürüyüşlerini bırakmıştır. Ailesinde bilinen kanama hastalığı yoktur."
    },
    "vitals": {
      "TA": "118/72 mmHg",
      "Nabız": "104/dk",
      "Solunum": "18/dk",
      "SpO2": "%98 oda havasında",
      "Ateş": "36.8 °C",
      "Şok indeksi": "0.88 - kapiller dolum normal, belirgin ortostatik yakınma yok"
    },
    "exam": [
      "Her iki üst ekstremitede geniş ekimoz alanları vardır; peteşi belirgin değildir.",
      "Sağ uyluk anterolateralinde ağrılı, gergin hematom alanı palpe edilir.",
      "Eklem içi şişlik veya hemartroz bulgusu yok.",
      "Mukozalarda yaygın kanama izlenmiyor.",
      "Karın yumuşak, dalak büyüklüğü saptanmıyor."
    ],
    "investigations": [
      {
        "id": "v306-new-722-hemogram",
        "label": "Hemogram",
        "title": "Hemogram",
        "orderLabel": "Hemogram",
        "type": "lab",
        "priority": "essential",
        "subtype": "Tam kan sayımı",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Anemi vardır; trombosit sayısı korunmuştur.",
        "clinicalMeaning": "Platelet sayısal eksikliğinden çok pıhtılaşma faktörü ekseni değerlendirilmelidir.",
        "result": {
          "title": "Hemogram",
          "summary": "Anemi vardır; trombosit sayısı korunmuştur.",
          "interpretation": "Anemi vardır; trombosit sayısı korunmuştur.",
          "values": [
            [
              "Hemoglobin",
              "8.6 g/dL",
              "12-16 g/dL",
              "Düşük"
            ],
            [
              "MCV",
              "88 fL",
              "80-100 fL",
              "Normal"
            ],
            [
              "Trombosit",
              "286.000/mm³",
              "150.000-400.000/mm³",
              "Normal"
            ],
            [
              "Lökosit",
              "7.400/mm³",
              "4.000-10.000/mm³",
              "Normal"
            ],
            [
              "Retikülosit",
              "%3.1",
              "%0.5-2",
              "Artmış"
            ]
          ]
        }
      },
      {
        "id": "v306-new-722-koagulasyon",
        "label": "Koagülasyon testleri",
        "title": "Koagülasyon testleri",
        "orderLabel": "Koagülasyon testleri",
        "type": "lab",
        "priority": "essential",
        "subtype": "PT/aPTT/fibrinojen",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "İzole aPTT uzaması vardır; PT ve fibrinojen korunmuştur.",
        "clinicalMeaning": "DIC veya varfarin etkisinden çok intrinsik yol/inhibitör ekseni değerlendirilmelidir.",
        "result": {
          "title": "Koagülasyon testleri",
          "summary": "İzole aPTT uzaması vardır; PT ve fibrinojen korunmuştur.",
          "interpretation": "İzole aPTT uzaması vardır; PT ve fibrinojen korunmuştur.",
          "values": [
            [
              "PT/INR",
              "12.1 sn / 1.0",
              "INR 0.8-1.2",
              "Normal"
            ],
            [
              "aPTT",
              "86 sn",
              "25-35 sn",
              "Belirgin uzun"
            ],
            [
              "Fibrinojen",
              "340 mg/dL",
              "200-400 mg/dL",
              "Normal"
            ],
            [
              "D-dimer",
              "0.7 mg/L FEU",
              "<0.5 mg/L FEU",
              "Hafif yüksek"
            ],
            [
              "Trombin zamanı",
              "17 sn",
              "14-19 sn",
              "Normal"
            ]
          ]
        }
      },
      {
        "id": "v306-new-722-mixing-test",
        "label": "Karışım testi ve faktör düzeyi",
        "title": "Karışım testi ve faktör düzeyi",
        "orderLabel": "Karışım testi ve faktör düzeyi",
        "type": "lab",
        "priority": "essential",
        "subtype": "Hematoloji özel testleri",
        "category": "hematology",
        "testTypeCategory": "hematology",
        "summary": "Karışım testinde düzelme olmaması ve faktör VIII düşüklüğü inhibitör paternini destekler.",
        "clinicalMeaning": "Eksik faktör replasmanından çok inhibitör varlığı ve bypassing yaklaşım düşünülmelidir.",
        "result": {
          "title": "Karışım testi ve faktör düzeyi",
          "summary": "Karışım testinde düzelme olmaması ve faktör VIII düşüklüğü inhibitör paternini destekler.",
          "interpretation": "Karışım testinde düzelme olmaması ve faktör VIII düşüklüğü inhibitör paternini destekler.",
          "values": [
            [
              "1:1 mixing aPTT - hemen",
              "62 sn",
              "Tam düzelme beklenir",
              "Düzelme yetersiz"
            ],
            [
              "1:1 mixing aPTT - 2 saat",
              "78 sn",
              "Tam düzelme beklenir",
              "Zamanla uzama"
            ],
            [
              "Faktör VIII aktivitesi",
              "%3",
              "%50-150",
              "Çok düşük"
            ],
            [
              "Bethesda inhibitör titresi",
              "18 BU",
              "0 BU",
              "Yüksek"
            ],
            [
              "Lupus antikoagülan",
              "Negatif",
              "Negatif",
              "Negatif"
            ]
          ]
        }
      },
      {
        "id": "v306-new-722-goruntuleme",
        "label": "Yumuşak doku görüntüleme",
        "title": "Yumuşak doku görüntüleme",
        "orderLabel": "Yumuşak doku görüntüleme",
        "type": "imaging",
        "priority": "supportive",
        "subtype": "Uyluk USG/BT",
        "category": "imaging",
        "testTypeCategory": "imaging",
        "summary": "Kas içi hematom saptanır; aktif damar yırtığı lehine belirgin bulgu yoktur.",
        "clinicalMeaning": "Spontan derin yumuşak doku kanaması klinik ağırlığı artırır.",
        "result": {
          "title": "Yumuşak doku görüntüleme",
          "summary": "Kas içi hematom saptanır; aktif damar yırtığı lehine belirgin bulgu yoktur.",
          "interpretation": "Sağ vastus lateralis içinde yaklaşık 6.5 x 3.2 cm heterojen hematom alanı vardır; kompartman basıncı klinik olarak yakın izlenmelidir.",
          "narrative": "Hematoma eşlik eden belirgin arteriyel ekstravazasyon izlenmez; çevre dokuda ödem vardır."
        }
      }
    ],
    "useSyntheticInvestigationBank": true,
    "managementSequence": {
      "enabled": false
    },
    "hideExamSignal": true,
    "question": "Bu hastada kanamayı kontrol altına almak ve altta yatan süreci baskılamak için en uygun yaklaşım hangisidir?",
    "questionType": "Hematoloji tedavi kararı",
    "answerTarget": "Edinsel faktör VIII inhibitöründe akut kanama kontrolü ve inhibitör eradikasyonu basamaklarını ayırt etme.",
    "diagnosis": {
      "correct": "Rekombinant aktive faktör VIIa veya aktive protrombin kompleks konsantresiyle kanama kontrolü sağlamak ve kortikosteroid temelli immünsupresyon başlamak",
      "options": [
        "Rekombinant aktive faktör VIIa veya aktive protrombin kompleks konsantresiyle kanama kontrolü sağlamak ve kortikosteroid temelli immünsupresyon başlamak",
        "Trombosit süspansiyonu verip trombosit sayısı 50.000/mm³ üzerine çıkana kadar izlemek",
        "Varfarin etkisi kabul edip K vitamini ve protrombin kompleks konsantresi vermek",
        "Standart faktör VIII konsantresi verip inhibitör testlerini poliklinikte tekrar etmek",
        "Heparin etkisi düşünerek protamin uygulamak ve antikoagülan öyküsü netleşene kadar başka tedavi vermemek"
      ],
      "question": "Bu hastada kanamayı kontrol altına almak ve altta yatan süreci baskılamak için en uygun yaklaşım hangisidir?",
      "explanation": "Yeni başlayan geniş ekimozlar ve kas içi hematom, normal trombosit, normal PT/INR, belirgin izole aPTT uzaması, karışım testinde düzelmeme ve çok düşük faktör VIII aktivitesi edinsel faktör inhibitörü paternini gösterir. Akut kanamada amaç eksik faktörü doğrudan yerine koymak değil inhibitörü bypass ederek trombin oluşumunu sağlamaktır. Aynı zamanda inhibitör üretimini azaltmak için kortikosteroid temelli immünsupresyon gerekir; ağır veya dirençli olgularda ek ajanlar gündeme gelebilir.",
      "pearls": [
        "İzole aPTT uzaması + normal PT/INR intrinsik yol veya inhibitör eksenini düşündürür.",
        "Karışım testinde düzelme olmaması faktör eksikliğinden çok inhibitörü destekler.",
        "Yaşlı hastada yeni başlayan derin yumuşak doku kanaması edinsel inhibitör için tipiktir.",
        "Akut kanama kontrolü ve inhibitör eradikasyonu ayrı ama eş zamanlı hedeflerdir."
      ],
      "optionFeedback": {
        "Rekombinant aktive faktör VIIa veya aktive protrombin kompleks konsantresiyle kanama kontrolü sağlamak ve kortikosteroid temelli immünsupresyon başlamak": "Bu seçenek en uygundur. Hastada izole aPTT uzaması, mixing testte düzelmeme, faktör VIII aktivitesinin çok düşük olması ve Bethesda inhibitör titresinin yüksekliği edinsel faktör VIII inhibitörünü gösterir. Aktif kas içi kanamada bypassing ajanlar faktör VIII yolunu atlayarak hemostaz sağlar. Kortikosteroid temelli immünsupresyon ise inhibitör üretimini azaltmak ve kalıcı düzelme sağlamak için gereklidir.",
        "Trombosit süspansiyonu verip trombosit sayısı 50.000/mm³ üzerine çıkana kadar izlemek": "Trombosit transfüzyonu trombositopeni veya trombosit fonksiyon bozukluğuna bağlı kanamalarda anlamlıdır. Bu hastanın trombosit sayısı 286.000/mm³ ile normaldir ve peteşiden çok geniş ekimoz/kas hematomu vardır. İzole aPTT uzaması ve inhibitör testi trombosit eksenini değil koagülasyon faktör inhibitörünü gösterir; trombosit vermek temel sorunu düzeltmez.",
        "Varfarin etkisi kabul edip K vitamini ve protrombin kompleks konsantresi vermek": "Varfarin etkisinde PT/INR uzaması beklenir ve hasta genellikle vitamin K bağımlı faktörlerin azalmasına bağlı kanar. Bu olguda INR normal, aPTT belirgin uzun ve hastanın varfarin kullanımı yoktur. K vitamini veya protrombin kompleks konsantresi faktör VIII inhibitörünü ortadan kaldırmaz; bu nedenle kanama mekanizmasını hedeflemez.",
        "Standart faktör VIII konsantresi verip inhibitör testlerini poliklinikte tekrar etmek": "Konjenital hemofili A'da inhibitör yoksa faktör VIII replasmanı temel tedavidir. Bu hastada ileri yaşta yeni başlayan kanama, daha önce kanama öyküsünün olmaması ve yüksek Bethesda inhibitörü faktör VIII'in hızla nötralize edileceğini gösterir. Aktif kas içi hematomu olan hastayı poliklinik tekrarına bırakmak güvenli değildir; bypassing tedavi ve immünsupresyon gerekir.",
        "Heparin etkisi düşünerek protamin uygulamak ve antikoagülan öyküsü netleşene kadar başka tedavi vermemek": "Heparin aPTT uzatabilir; ancak hastanın heparin kullanımı yok, trombin zamanı normal ve karışım testindeki zaman bağımlı inhibitör paterni heparin etkisinden farklıdır. Protamin, heparin varsa etkiyi geri çevirebilir fakat faktör VIII inhibitörünü tedavi etmez. Tedaviyi antikoagülan öyküsüne bağlayıp beklemek derin doku kanamasının büyümesine yol açabilir."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "Edinsel hemofili A, çoğunlukla daha önce kanama öyküsü olmayan erişkinde derin yumuşak doku kanaması, izole aPTT uzaması, mixing testte düzelmeme, düşük faktör VIII ve inhibitör pozitifliğiyle tanınır; akut kanamada bypassing ajan ve inhibitör eradikasyonu için immünsupresyon gerekir.",
    "examPearl": "TUS ipucu: yaşlı hasta + geniş ekimoz/kas hematomu + normal trombosit/PT + izole aPTT uzaması + mixing düzelmez → edinsel faktör VIII inhibitörü; bypassing ajan + steroid.",
    "whyCorrect": "Doğru seçenek hem akut hemostazı hem de inhibitör üretimini hedefleyen çift basamaklı tedavidir.",
    "optionComparison": "Yanlış seçenekler trombositopeni, varfarin etkisi, konjenital faktör eksikliği veya heparin etkisi varsayımına dayanır; olgudaki laboratuvar paterni inhibitör varlığını gösterir.",
    "evidenceChain": [
      "Travmasız geniş ekimoz + kas içi hematom → derin yumuşak doku kanaması.",
      "Trombosit 286.000/mm³ + PT/INR normal → trombositopeni ve varfarin etkisi zayıf.",
      "aPTT 86 sn → intrinsik yol/faktör inhibitörü ekseni.",
      "Mixing testte düzelmeme ve inkübasyonla uzama → inhibitör paterni.",
      "Faktör VIII %3 + Bethesda 18 BU → faktör VIII inhibitörüyle aktif kanama."
    ],
    "whyWrong": "Yanlış seçenekler sayısal trombosit, vitamin K bağımlı faktör, heparin veya basit replasman mantığına dayanır; bu hastada inhibitör mekanizması nedeniyle bypass ve immünsupresyon gerekir.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v306",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V305 render-safe internal-medicine cases with diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  },
{
    "id": "v306-new-723-sirozlu-hastada-uyku-hali-ve-el-titremesi",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "Sirozlu hastada uyku hali ve el titremesi",
    "difficulty": "Orta-Zor",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "Sirozlu hastada akut bilinç değişikliğinde gastrointestinal kanama, konstipasyon, enfeksiyon ve elektrolit bozukluğu gibi tetikleyicileri değerlendirerek bağırsak kaynaklı azot yükünü azaltan tedaviyi seçme.",
    "learningTarget": "Amonyak düzeyine aşırı bağımlı kalmadan klinik tablo ve tetikleyicilerle akut tedavide laktülozun yerini ayırt etme.",
    "demographics": "59 yaşında erkek hasta",
    "setting": "Acil servis dahiliye konsültasyonu",
    "chiefComplaint": "Ailesi tarafından son iki gündür artan uyku hali, dalgınlık ve ellerde titreme nedeniyle getiriliyor.",
    "stem": "Hasta yakınları, üç gündür kabız olduğunu ve dün geceden beri konuşurken konuyu dağıttığını anlatır. Sabah kahvaltıda kaşığı elinden düşürmüş, kısa süre sonra uyuklamaya başlamış ve gündüz-gece düzeni belirgin bozulmuştur. Alkol ilişkili siroz nedeniyle takip edilmektedir; son hafta diüretik dozunu kendi kendine artırmış, su içmeyi azalttığını söylemiştir. Dün dışkısının koyu renkli olduğunu fark etmiş ama belirgin kan kusma yaşamamıştır. Ateş, yeni öksürük veya idrar yaparken yanma tariflemez. Son günlerde benzodiazepin veya opioid kullanımı olmadığını eşi özellikle belirtir.",
    "patientIntro": {
      "profile": "59 yaşında erkek hasta, Acil servis dahiliye konsültasyonu ortamında değerlendiriliyor.",
      "presentation": "Ailesi tarafından son iki gündür artan uyku hali, dalgınlık ve ellerde titreme nedeniyle getiriliyor.",
      "historySummary": "Hasta yakınları, üç gündür kabız olduğunu ve dün geceden beri konuşurken konuyu dağıttığını anlatır. Sabah kahvaltıda kaşığı elinden düşürmüş, kısa süre sonra uyuklamaya başlamış ve gündüz-gece düzeni belirgin bozulmuştur. Alkol ilişkili siroz nedeniyle takip edilmektedir; son hafta diüretik dozunu kendi kendine artırmış, su içmeyi azalttığını söylemiştir. Dün dışkısının koyu renkli olduğunu fark etmiş ama belirgin kan kusma yaşamamıştır. Ateş, yeni öksürük veya idrar yaparken yanma tariflemez. Son günlerde benzodiazepin veya opioid kullanımı olmadığını eşi özellikle belirtir."
    },
    "vitals": {
      "TA": "108/64 mmHg",
      "Nabız": "96/dk",
      "Solunum": "18/dk",
      "SpO2": "%97 oda havasında",
      "Ateş": "36.9 °C",
      "Şok indeksi": "0.89 - periferik perfüzyon korunmuş, mukozalar hafif kuru"
    },
    "exam": [
      "Hasta uykuya eğilimli, basit komutları yerine getiriyor ancak zamanı karıştırıyor.",
      "Eller öne uzatıldığında belirgin asteriksis izleniyor.",
      "Skleralar hafif ikterik, karında belirgin asit dalgası alınmıyor.",
      "Rektal muayenede koyu renkli dışkı izleniyor.",
      "Ense sertliği, fokal nörolojik defisit veya travma bulgusu yok."
    ],
    "investigations": [
      {
        "id": "v306-new-723-karaciger-koagulasyon",
        "label": "Karaciğer fonksiyon ve koagülasyon",
        "title": "Karaciğer fonksiyon ve koagülasyon",
        "orderLabel": "Karaciğer fonksiyon ve koagülasyon",
        "type": "lab",
        "priority": "essential",
        "subtype": "Biyokimya ve INR",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Kronik karaciğer yetmezliği bulguları ve koagülasyon bozukluğu vardır.",
        "clinicalMeaning": "Siroz zemininde mental durum değişikliğinin sistemik tetikleyicileri araştırılmalıdır.",
        "result": {
          "title": "Karaciğer fonksiyon ve koagülasyon",
          "summary": "Kronik karaciğer yetmezliği bulguları ve koagülasyon bozukluğu vardır.",
          "interpretation": "Kronik karaciğer yetmezliği bulguları ve koagülasyon bozukluğu vardır.",
          "values": [
            [
              "Total bilirubin",
              "3.4 mg/dL",
              "0.2-1.2 mg/dL",
              "Yüksek"
            ],
            [
              "Albumin",
              "2.7 g/dL",
              "3.5-5.0 g/dL",
              "Düşük"
            ],
            [
              "INR",
              "1.7",
              "0.8-1.2",
              "Yüksek"
            ],
            [
              "AST/ALT",
              "78/42 U/L",
              "<40 U/L",
              "AST baskın yüksek"
            ],
            [
              "ALP/GGT",
              "126/188 U/L",
              "ALP <120, GGT <60 U/L",
              "Yüksek"
            ]
          ]
        }
      },
      {
        "id": "v306-new-723-metabolik",
        "label": "Metabolik ve böbrek değerlendirmesi",
        "title": "Metabolik ve böbrek değerlendirmesi",
        "orderLabel": "Metabolik ve böbrek değerlendirmesi",
        "type": "lab",
        "priority": "essential",
        "subtype": "Acil biyokimya",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Hiponatremi ve hafif prerenal eğilim vardır; hipoglisemi saptanmaz.",
        "clinicalMeaning": "Alternatif metabolik nedenler ve tetikleyici faktörler birlikte değerlendirilir.",
        "result": {
          "title": "Metabolik ve böbrek değerlendirmesi",
          "summary": "Hiponatremi ve hafif prerenal eğilim vardır; hipoglisemi saptanmaz.",
          "interpretation": "Hiponatremi ve hafif prerenal eğilim vardır; hipoglisemi saptanmaz.",
          "values": [
            [
              "Sodyum",
              "129 mmol/L",
              "135-145 mmol/L",
              "Düşük"
            ],
            [
              "Potasyum",
              "3.2 mmol/L",
              "3.5-5.1 mmol/L",
              "Düşük"
            ],
            [
              "Kreatinin",
              "1.3 mg/dL",
              "0.6-1.2 mg/dL",
              "Hafif yüksek"
            ],
            [
              "Üre",
              "54 mg/dL",
              "15-40 mg/dL",
              "Yüksek"
            ],
            [
              "Glukoz",
              "104 mg/dL",
              "70-140 mg/dL",
              "Normal"
            ],
            [
              "Amonyak",
              "92 µmol/L",
              "15-45 µmol/L",
              "Yüksek"
            ]
          ]
        }
      },
      {
        "id": "v306-new-723-kanama-enfeksiyon",
        "label": "Kanama ve enfeksiyon taraması",
        "title": "Kanama ve enfeksiyon taraması",
        "orderLabel": "Kanama ve enfeksiyon taraması",
        "type": "lab",
        "priority": "essential",
        "subtype": "Hemogram, dışkı ve enfeksiyon belirteçleri",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Üst sindirim sistemi kanaması olasılığını destekleyen anemi ve dışkı bulgusu vardır; belirgin sepsis bulgusu yoktur.",
        "clinicalMeaning": "Azot yükü ve volüm-elektrolit değişiklikleri mental durum bozulmasını tetikleyebilir.",
        "result": {
          "title": "Kanama ve enfeksiyon taraması",
          "summary": "Üst sindirim sistemi kanaması olasılığını destekleyen anemi ve dışkı bulgusu vardır; belirgin sepsis bulgusu yoktur.",
          "interpretation": "Üst sindirim sistemi kanaması olasılığını destekleyen anemi ve dışkı bulgusu vardır; belirgin sepsis bulgusu yoktur.",
          "values": [
            [
              "Hemoglobin",
              "9.8 g/dL",
              "13-17 g/dL",
              "Düşük"
            ],
            [
              "Trombosit",
              "92.000/mm³",
              "150.000-400.000/mm³",
              "Düşük"
            ],
            [
              "Dışkı gizli kan",
              "Pozitif",
              "Negatif",
              "Pozitif"
            ],
            [
              "Lökosit",
              "8.900/mm³",
              "4.000-10.000/mm³",
              "Normal"
            ],
            [
              "CRP",
              "8 mg/L",
              "<5 mg/L",
              "Hafif yüksek"
            ]
          ]
        }
      },
      {
        "id": "v306-new-723-goruntuleme",
        "label": "Kraniyal BT",
        "title": "Kraniyal BT",
        "orderLabel": "Kraniyal BT",
        "type": "imaging",
        "priority": "supportive",
        "subtype": "Kontrastsız BT",
        "category": "imaging",
        "testTypeCategory": "imaging",
        "summary": "Akut kanama, kitle etkisi veya geniş enfarkt alanı saptanmaz.",
        "clinicalMeaning": "Fokal nörolojik açıklama desteklenmez; klinik ve metabolik veriler birlikte önem kazanır.",
        "result": {
          "title": "Kraniyal BT",
          "summary": "Akut kanama, kitle etkisi veya geniş enfarkt alanı saptanmaz.",
          "interpretation": "Akut intrakraniyal kanama, belirgin kitle etkisi veya geniş akut enfarkt alanı yoktur.",
          "narrative": "Ventrikül boyutları yaş ile uyumlu; orta hat şifti izlenmez."
        }
      }
    ],
    "useSyntheticInvestigationBank": true,
    "managementSequence": {
      "enabled": false
    },
    "hideExamSignal": true,
    "question": "Bu hastada bilinç değişikliğini düzeltmeye yönelik en uygun ilk farmakolojik yaklaşım hangisidir?",
    "questionType": "Tedavi / tetikleyici yönetimi",
    "answerTarget": "Siroz zemininde asteriksis ve akut bilinç değişikliğinde laktülozun akut tedavideki yerini ayırt etme.",
    "diagnosis": {
      "correct": "Laktüloz başlayıp dışkılama hedefiyle titre etmek, eş zamanlı tetikleyici kanama/konstipasyon ve elektrolit bozukluklarını düzeltmek",
      "options": [
        "Amonyak yüksekliği tek başına tedavi hedefi olmadığı için spesifik tedavi vermeden yalnız gözlem yapmak",
        "Protein alımını tamamen kesip yalnız dekstrozlu sıvı vermek",
        "Laktüloz başlayıp dışkılama hedefiyle titre etmek, eş zamanlı tetikleyici kanama/konstipasyon ve elektrolit bozukluklarını düzeltmek",
        "Rifaximini tek başına ilk seçenek olarak verip kabızlık düzelene kadar laktülozdan kaçınmak",
        "Benzodiazepin sedasyonu verip ajitasyonu baskılamak ve nörolojik muayeneyi sonra tekrarlamak"
      ],
      "question": "Bu hastada bilinç değişikliğini düzeltmeye yönelik en uygun ilk farmakolojik yaklaşım hangisidir?",
      "explanation": "Sirozlu hastada uyku hali, zaman oryantasyon bozukluğu, asteriksis, kabızlık, koyu dışkı/pozitif gizli kan, hipokalemi ve amonyak yüksekliği akut hepatik ensefalopati tablosunu destekler. İlk farmakolojik yaklaşım bağırsak azot yükünü azaltan ve dışkılamayı artıran laktülozdur; hedef genellikle günde birkaç yumuşak dışkıdır. Aynı anda gastrointestinal kanama, konstipasyon, hipokalemi, dehidratasyon ve enfeksiyon gibi tetikleyiciler araştırılıp düzeltilmelidir.",
      "pearls": [
        "Asteriksis ve uyku-uyanıklık döngüsü bozulması klinik olarak değerlidir.",
        "Amonyak yüksekliği destekleyicidir; normal amonyak tanıyı yeniden düşündürür, ancak tedavi yalnız sayıya göre yapılmaz.",
        "Kabızlık ve gastrointestinal kanama bağırsakta azot yükünü artırır.",
        "Rifaximin çoğunlukla laktüloza ek veya rekürrens önleme bağlamında kullanılır."
      ],
      "optionFeedback": {
        "Amonyak yüksekliği tek başına tedavi hedefi olmadığı için spesifik tedavi vermeden yalnız gözlem yapmak": "Amonyak düzeyi tek başına tanı, evreleme veya prognoz için yeterli değildir; bu bilgi doğrudur. Ancak bu hastada karar yalnız amonyak değerine dayanmıyor: siroz, asteriksis, uyku hali, oryantasyon bozukluğu, kabızlık, olası gastrointestinal kanama ve hipokalemi bir klinik tablo oluşturuyor. Bu nedenle spesifik tedaviyi erteleyip yalnız gözlem yapmak güvenli değildir.",
        "Protein alımını tamamen kesip yalnız dekstrozlu sıvı vermek": "Geçmişte protein kısıtlaması sık kullanılsa da uzun süreli veya tam protein kesilmesi malnütrisyon ve sarkopeniyi artırarak sirozlu hastada kötü sonuçlara yol açabilir. Akut dönemde aspirasyon riski ve bilinç durumu nedeniyle beslenme düzenlenebilir; ancak tedavinin temel farmakolojik basamağı bağırsak azot yükünü laktülozla azaltmak ve tetikleyicileri düzeltmektir. Yalnız dekstrozlu sıvı bu mekanizmayı karşılamaz.",
        "Laktüloz başlayıp dışkılama hedefiyle titre etmek, eş zamanlı tetikleyici kanama/konstipasyon ve elektrolit bozukluklarını düzeltmek": "Bu seçenek en uygundur. Laktüloz bağırsak lümeninde amonyağın emilimini azaltır, bağırsak geçişini hızlandırır ve dışkıyla azot yükünün atılmasını artırır. Bu hastada kabızlık, olası üst gastrointestinal kanama ve hipokalemi gibi tetikleyiciler aynı anda düzeltilmelidir. Tedavi yalnız amonyak değerini düşürmeye değil, klinik bilinç durumunu ve tetikleyici zinciri düzeltmeye yöneliktir.",
        "Rifaximini tek başına ilk seçenek olarak verip kabızlık düzelene kadar laktülozdan kaçınmak": "Rifaximin bağırsak bakteriyel amonyak üretimini azaltır ve özellikle tekrarlayan atakların önlenmesinde laktüloza ek olarak değerli olabilir. Akut ilk atakta ve kabızlık belirgin olduğunda laktüloz dışkılama üzerinden hızlı mekanik/metabolik katkı sağlar. Rifaximini tek başına verip laktülozdan kaçınmak bu hastadaki kabızlık ve azot yükü sorununu yeterince hedeflemez.",
        "Benzodiazepin sedasyonu verip ajitasyonu baskılamak ve nörolojik muayeneyi sonra tekrarlamak": "Benzodiazepinler sirozlu hastalarda santral sinir sistemi depresyonunu artırabilir ve bilinç değişikliğini kötüleştirebilir. Bu hastanın problemi ajitasyon değil uykuya eğilim ve dalgınlıktır; sedasyon klinik izlemi de zorlaştırır. İlaçla baskılama yerine tetikleyicileri düzeltmek ve bağırsak azot yükünü azaltmak gerekir."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "Sirozda akut hepatik ensefalopati tedavisinde laktüloz ilk farmakolojik basamaktır; kabızlık, gastrointestinal kanama, enfeksiyon, hipokalemi, dehidratasyon ve sedatif ilaçlar gibi tetikleyiciler eş zamanlı düzeltilmelidir.",
    "examPearl": "TUS ipucu: siroz + uyku hali + asteriksis + kabızlık/GİS kanama tetikleyicisi → laktüloz titre et, tetikleyicileri düzelt; amonyak sayısına tek başına bağlanma.",
    "whyCorrect": "Doğru seçenek hem bağırsak kaynaklı azot yükünü hem de atağı başlatan klinik tetikleyicileri hedefler.",
    "optionComparison": "Yanlış seçenekler amonyak değerini yanlış yorumlama, aşırı protein kesme, rifaximini yanlış tek basamak yapma veya sedatifle tabloyu kötüleştirme hatalarını temsil eder.",
    "evidenceChain": [
      "Siroz öyküsü + uyku-uyanıklık bozukluğu + oryantasyon kusuru → klinik zemin.",
      "Asteriksis → metabolik ensefalopati lehine muayene bulgusu.",
      "Kabızlık + koyu dışkı/pozitif gizli kan → bağırsak azot yükünü artıran tetikleyiciler.",
      "Hipokalemi + hafif dehidratasyon → atağı kolaylaştıran metabolik faktörler.",
      "Kraniyal BT'de akut patoloji olmaması → fokal yapısal açıklama zayıf."
    ],
    "whyWrong": "Yanlış seçenekler klinik tanıyı ya yalnız amonyak sayısına indirger ya da tetikleyici mekanizmaları hedeflemez; doğru yaklaşım akut bağırsak azot yükünü azaltma ve tetikleyici düzeltme birlikteliğidir.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v306",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V305 render-safe internal-medicine cases with diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  },
{
    "id": "v307-new-724-istirahatte-gogus-baskisi-ve-dinamik-troponin-artisi",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "İstirahatte göğüs baskısı ve dinamik troponin artışı",
    "difficulty": "Zor",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "ST elevasyonu olmadan gelişen yüksek riskli akut koroner sendromda seri troponin, EKG değişikliği ve klinik risk bulgularını birlikte değerlendirerek erken invaziv yaklaşımı seçme.",
    "learningTarget": "NSTEMI ile karışabilecek gastrit, düşük riskli göğüs ağrısı ve noniskemik troponin yüksekliği durumlarını ayırma.",
    "demographics": "66 yaşında erkek hasta",
    "setting": "Acil servis kardiyak monitör alanı",
    "chiefComplaint": "İki saattir süren göğüs baskısı ve soğuk terleme nedeniyle acile başvuruyor.",
    "stem": "Hasta sabah kahvaltıdan sonra başlayan baskı tarzındaki ağrının göğsün ortasında belirgin olduğunu ve sol kola doğru yayıldığını anlatır. Dinlenmesine rağmen ağrı tamamen geçmemiş, eve giderken kısa mesafede belirgin halsizlik ve soğuk terleme eklenmiştir. Daha önce merdiven çıkarken kısa süren göğüs sıkışmaları olmuş ancak bu kadar uzun sürmediğini söyler. Tip 2 diyabet, hipertansiyon ve sigara öyküsü vardır; düzenli aspirin kullanmamaktadır. Şiddetli yırtılır tarzda sırt ağrısı, ateş, balgam veya tek taraflı bacak şişliği tariflemez. Ağrı yanma şeklinde başlamadığı gibi antiasit aldıktan sonra da belirgin rahatlama olmamıştır.",
    "patientIntro": {
      "profile": "66 yaşında erkek hasta, Acil servis kardiyak monitör alanı ortamında değerlendiriliyor.",
      "presentation": "İki saattir süren göğüs baskısı ve soğuk terleme nedeniyle acile başvuruyor.",
      "historySummary": "Hasta sabah kahvaltıdan sonra başlayan baskı tarzındaki ağrının göğsün ortasında belirgin olduğunu ve sol kola doğru yayıldığını anlatır. Dinlenmesine rağmen ağrı tamamen geçmemiş, eve giderken kısa mesafede belirgin halsizlik ve soğuk terleme eklenmiştir. Daha önce merdiven çıkarken kısa süren göğüs sıkışmaları olmuş ancak bu kadar uzun sürmediğini söyler. Tip 2 diyabet, hipertansiyon ve sigara öyküsü vardır; düzenli aspirin kullanmamaktadır. Şiddetli yırtılır tarzda sırt ağrısı, ateş, balgam veya tek taraflı bacak şişliği tariflemez. Ağrı yanma şeklinde başlamadığı gibi antiasit aldıktan sonra da belirgin rahatlama olmamıştır."
    },
    "vitals": {
      "TA": "142/86 mmHg",
      "Nabız": "96/dk",
      "Solunum": "20/dk",
      "SpO2": "%96 oda havasında",
      "Ateş": "36.7 °C",
      "Şok indeksi": "0.68 - periferik perfüzyon korunmuş, soğuk terleme mevcut"
    },
    "exam": [
      "Hasta anksiyöz ve terli görünüyor, bilinç açık.",
      "Kalp sesleri ritmik, belirgin yeni üfürüm duyulmuyor.",
      "Akciğer bazallerinde ral yok, wheezing saptanmıyor.",
      "Karında belirgin hassasiyet, defans veya rebound yok.",
      "Alt ekstremitelerde tek taraflı ödem veya hassasiyet izlenmiyor."
    ],
    "investigations": [
      {
        "id": "v307-new-724-ekg",
        "label": "12 derivasyonlu EKG",
        "title": "12 derivasyonlu EKG",
        "orderLabel": "12 derivasyonlu EKG",
        "type": "ecg",
        "priority": "essential",
        "subtype": "Acil EKG",
        "category": "cardiology",
        "testTypeCategory": "cardiology",
        "summary": "V4-V6 ve DII-aVF derivasyonlarında 1-1.5 mm horizontal ST depresyonu izleniyor; yaygın ST elevasyonu yok.",
        "clinicalMeaning": "İskemik repolarizasyon değişikliği vardır; STEMI paterni yoktur.",
        "result": {
          "title": "12 derivasyonlu EKG",
          "summary": "V4-V6 ve DII-aVF derivasyonlarında 1-1.5 mm horizontal ST depresyonu izleniyor; yaygın ST elevasyonu yok.",
          "interpretation": "V4-V6 ve DII-aVF derivasyonlarında 1-1.5 mm horizontal ST depresyonu izleniyor; yaygın ST elevasyonu yok.",
          "narrative": "Sinüs ritmi 96/dk. V4-V6 ve DII-aVF derivasyonlarında 1-1.5 mm horizontal ST depresyonu, aVR'de minimal ST elevasyonu izlenir. Patolojik Q dalgası veya yeni sol dal bloğu saptanmaz."
        }
      },
      {
        "id": "v307-new-724-troponin",
        "label": "Kardiyak biyobelirteçler",
        "title": "Kardiyak biyobelirteçler",
        "orderLabel": "Kardiyak biyobelirteçler",
        "type": "lab",
        "priority": "essential",
        "subtype": "Seri kardiyak marker",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Yüksek duyarlıklı troponin seri ölçümde belirgin artıyor.",
        "clinicalMeaning": "Dinamik artış akut miyokard hasarını destekler.",
        "result": {
          "title": "Kardiyak biyobelirteçler",
          "summary": "Yüksek duyarlıklı troponin seri ölçümde belirgin artıyor.",
          "interpretation": "Yüksek duyarlıklı troponin seri ölçümde belirgin artıyor.",
          "values": [
            [
              "hs-Troponin I 0. saat",
              "184 ng/L",
              "<20 ng/L",
              "Yüksek"
            ],
            [
              "hs-Troponin I 2. saat",
              "612 ng/L",
              "<20 ng/L",
              "Dinamik artış"
            ],
            [
              "CK-MB",
              "18 ng/mL",
              "<5 ng/mL",
              "Yüksek"
            ],
            [
              "NT-proBNP",
              "420 pg/mL",
              "<125 pg/mL",
              "Hafif yüksek"
            ]
          ]
        }
      },
      {
        "id": "v307-new-724-biyokimya",
        "label": "Biyokimya ve böbrek fonksiyonu",
        "title": "Biyokimya ve böbrek fonksiyonu",
        "orderLabel": "Biyokimya ve böbrek fonksiyonu",
        "type": "lab",
        "priority": "essential",
        "subtype": "Acil biyokimya",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Böbrek fonksiyonu hafif bozulmuş, potasyum güvenli aralıkta.",
        "clinicalMeaning": "Tedavi planında kontrast ve antitrombotik doz açısından dikkate alınır.",
        "result": {
          "title": "Biyokimya ve böbrek fonksiyonu",
          "summary": "Böbrek fonksiyonu hafif bozulmuş, potasyum güvenli aralıkta.",
          "interpretation": "Böbrek fonksiyonu hafif bozulmuş, potasyum güvenli aralıkta.",
          "values": [
            [
              "Kreatinin",
              "1.36 mg/dL",
              "0.7-1.2 mg/dL",
              "Hafif yüksek"
            ],
            [
              "eGFR",
              "58 mL/dk/1.73m²",
              ">60",
              "Sınırda düşük"
            ],
            [
              "Potasyum",
              "4.3 mmol/L",
              "3.5-5.1 mmol/L",
              "Normal"
            ],
            [
              "Glukoz",
              "188 mg/dL",
              "70-140 mg/dL",
              "Yüksek"
            ]
          ]
        }
      },
      {
        "id": "v307-new-724-akciger",
        "label": "Akciğer grafisi",
        "title": "Akciğer grafisi",
        "orderLabel": "Akciğer grafisi",
        "type": "imaging",
        "priority": "essential",
        "subtype": "PA akciğer grafisi",
        "category": "imaging",
        "testTypeCategory": "imaging",
        "summary": "Belirgin pulmoner ödem veya pnömoni odağı yok.",
        "clinicalMeaning": "Dispnenin ana nedenini akciğer enfeksiyonu veya ağır volüm yüklenmesi olarak desteklemez.",
        "result": {
          "title": "Akciğer grafisi",
          "summary": "Belirgin pulmoner ödem veya pnömoni odağı yok.",
          "interpretation": "Belirgin pulmoner ödem veya pnömoni odağı yok.",
          "narrative": "Kardiyotorasik oran sınırda, belirgin alveoler ödem, fokal infiltrasyon veya plevral efüzyon izlenmez."
        }
      }
    ],
    "useSyntheticInvestigationBank": true,
    "managementSequence": {
      "enabled": false
    },
    "hideExamSignal": true,
    "question": "Bu hastada en uygun erken klinik yaklaşım aşağıdakilerden hangisidir?",
    "questionType": "Tedavi ve risk yönetimi",
    "answerTarget": "ST elevasyonu olmadan yüksek riskli akut koroner sendromda erken invaziv değerlendirme gerekliliğini ayırt etme.",
    "diagnosis": {
      "correct": "Antiiskemik ve antitrombotik tedavi altında erken invaziv koroner değerlendirme planlamak",
      "options": [
        "ST elevasyonu olmadığı için seri troponin düşene kadar yalnız gözlem ve efor testi planlamak",
        "Primer fibrinolitik tedavi verip ağrı geriledikten sonra ayaktan kardiyoloji kontrolü önermek",
        "Antiiskemik ve antitrombotik tedavi altında erken invaziv koroner değerlendirme planlamak",
        "Epigastrik yanmayı ön planda kabul edip proton pompa inhibitörüyle taburcu etmek",
        "Troponin yüksekliğini böbrek fonksiyonuna bağlayıp yalnız diüretik ve oksijenle izlemek"
      ],
      "question": "Bu hastada en uygun erken klinik yaklaşım aşağıdakilerden hangisidir?",
      "explanation": "İstirahatle süren baskı tarzı ağrı, dinamik troponin artışı ve ST depresyonu birlikte yüksek riskli non-ST elevasyonlu akut koroner sendrom paternini oluşturur. STEMI olmadığı için fibrinoliz değil; antitrombotik/antiiskemik tedavi altında erken invaziv koroner değerlendirme gerekir.",
      "pearls": [
        "NSTEMI'de troponin pozitifliği ve dinamik artış tanısal ağırlık taşır.",
        "ST depresyonu yüksek riskli iskemi bulgusudur.",
        "ST elevasyonu yoksa rutin fibrinoliz uygulanmaz.",
        "Yüksek riskli NSTE-AKS erken koroner anatomi değerlendirmesi gerektirir."
      ],
      "optionFeedback": {
        "ST elevasyonu olmadığı için seri troponin düşene kadar yalnız gözlem ve efor testi planlamak": "ST elevasyonunun olmaması akut koroner sendrom olasılığını dışlamaz; bu hastada istirahatle gelen baskı tarzı ağrı, lateral derivasyonlarda ST depresyonu ve dinamik troponin artışı miyokard hasarını destekler. Yalnız gözlem ve efor testi düşük riskli, troponini negatif ve aktif iskemi bulgusu olmayan hastalarda düşünülebilir. Bu olguda efor testi hem akut dönemde güvenli değildir hem de yüksek riskli biyobelirteç/ECG paternini tedavisiz bırakır.",
        "Primer fibrinolitik tedavi verip ağrı geriledikten sonra ayaktan kardiyoloji kontrolü önermek": "Fibrinolitik tedavi klasik olarak uygun zamanda primer perkütan girişime ulaşılamayan ST elevasyonlu miyokard infarktüsünde reperfüzyon amacıyla kullanılır. Bu hastada yaygın ST elevasyonu veya yeni sol dal bloğu gibi fibrinoliz hedefi olan bir tablo yoktur. NSTEMI paterninde fibrinoliz kanama riskini artırır ve tıkayıcı olmayan ama aktif plak/trombüs sürecini yönetmek için doğru strateji değildir.",
        "Antiiskemik ve antitrombotik tedavi altında erken invaziv koroner değerlendirme planlamak": "Bu seçenek en uygundur. İstirahat ağrısı, yeni ST depresyonları, yüksek ve yükselen troponin değeri, diyabet ve ileri yaş birlikte yüksek riskli non-ST elevasyonlu akut koroner sendrom paternini oluşturur. Bu tabloda amaç iskemiyi baskılamak, trombüs ilerlemesini azaltmak ve gecikmeden koroner anatomiyi görüp revaskülarizasyon gerekliliğini belirlemektir. Tedavi yalnız ağrı kontrolü değil; aspirin/antikoagülasyon gibi antitrombotik zemin, antiiskemik yaklaşım, monitörizasyon ve erken invaziv değerlendirme mantığıyla yürütülür.",
        "Epigastrik yanmayı ön planda kabul edip proton pompa inhibitörüyle taburcu etmek": "Epigastrik rahatsızlık, reflü veya peptik ülser hastalığında görülebilir; fakat bu vakada ağrının istirahatte baskı tarzında olması, kola yayılması, soğuk terleme eşlik etmesi, ST depresyonu ve yükselen troponin gastrointestinal nedenlerle açıklanamaz. Proton pompa inhibitörü eşlik eden dispepsi veya kanama riski varsa destekleyici olabilir; akut iskemik biyobelirteç ve EKG paternini yönetmez. Bu yaklaşım kritik koroner olayı atlamaya neden olur.",
        "Troponin yüksekliğini böbrek fonksiyonuna bağlayıp yalnız diüretik ve oksijenle izlemek": "Kronik böbrek hastalığında troponin bazal olarak yüksek seyredebilir; ancak seri ölçümde anlamlı yükselme ve iskemik semptom/ECG değişikliği varsa akut miyokard hasarı lehine yorumlanır. Bu hastada kreatinin hafif yüksek olmakla birlikte akciğer ödemi, ciddi hipoksemi veya belirgin volüm yüklenmesi ön planda değildir. Yalnız diüretik ve oksijen vermek trombotik/iskemik süreci tedavisiz bırakır. Troponin yüksekliğini tek başına böbreğe bağlamak, dinamik değişimi ve klinik bağlamı gözden kaçırmaktır."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "Non-ST elevasyonlu akut koroner sendromda risk; semptomun sürekliliği, dinamik troponin artışı, ST depresyonu, hemodinami ve komorbiditelerle belirlenir. Yüksek riskte hedef erken invaziv değerlendirme ve uygun antitrombotik zemindir.",
    "examPearl": "TUS ipucu: göğüs baskısı + ST depresyonu + yükselen troponin = NSTEMI; ST elevasyonu yok diye efor testi veya fibrinoliz seçilmez, yüksek riskte erken invaziv yaklaşım düşünülür.",
    "whyCorrect": "Doğru seçenek, hastanın aktif iskemik biyobelirteç ve EKG paternini tedavi ederken koroner anatomiyi geciktirmeden değerlendirmeyi sağlar.",
    "optionComparison": "Yanlış seçenekler STEMI tedavisini NSTEMI'ye taşır, düşük riskli göğüs ağrısı gibi davranır veya gastrointestinal/noniskemik açıklamayı verilerin önüne geçirir.",
    "evidenceChain": [
      "İstirahatte uzun süren baskı tarzı ağrı → akut koroner sendrom olasılığı.",
      "V4-V6 ve inferior derivasyonlarda ST depresyonu → subendokardiyal iskemi bulgusu.",
      "hs-troponinin 184'ten 612 ng/L'ye yükselmesi → dinamik miyokard hasarı.",
      "ST elevasyonunun olmaması → fibrinoliz yerine NSTE-AKS algoritması.",
      "Diyabet ve ileri yaş → yüksek riskli klinik bağlam."
    ],
    "whyWrong": "Yanlış seçeneklerin ortak hatası, dinamik troponin ve iskemik EKG değişikliğini ya düşük riskli ağrı gibi izlemek ya da STEMI dışı bir tabloda uygun olmayan reperfüzyon stratejisi seçmektir.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v307",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V306 render-safe internal-medicine cases with investigations and diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  },
{
    "id": "v307-new-725-ishal-sonrasi-derin-asidoz-ve-bobrek-yetmezligi",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "İshal sonrası derin asidoz ve böbrek yetmezliği",
    "difficulty": "Zor",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "Metformin kullanan hastada dehidratasyon/akut böbrek hasarı sonrası gelişen yüksek anyon açıklıklı laktik asidozu ketoasidoz, sepsis ve basit gastroenteritten ayırma.",
    "learningTarget": "Metformin ilişkili laktik asidozda ilacı kesme, destek tedavisi ve ağır olguda renal replasman endikasyonunu seçme.",
    "demographics": "73 yaşında kadın hasta",
    "setting": "Acil servis kritik bakım alanı",
    "chiefComplaint": "Üç gündür ishal-kusma sonrası halsizlik, uykuya meyil ve derin nefes alma nedeniyle getiriliyor.",
    "stem": "Hasta üç gündür sulu ishal ve kusma yaşadığını, bu nedenle çok az sıvı alabildiğini anlatır. Tip 2 diyabet için yıllardır metformin kullandığını, hastalanınca ilaçlarını kesmesi gerektiğini bilmediği için dozlarını almaya devam ettiğini söyler. Bugün sabah yatağından kalkarken belirgin sersemlik ve nefes nefese kalma hissi olmuş, kızı konuşmasının yavaşladığını fark etmiştir. Ateş, balgam, idrar yaparken yanma veya karın sağ alt kadranda lokalize ağrı tariflemez. Evde kan şekeri ölçümü 160-190 mg/dL civarında seyretmiştir. Son haftada kontrastlı tetkik yapılmamış, alkol kullanımı yoktur.",
    "patientIntro": {
      "profile": "73 yaşında kadın hasta, Acil servis kritik bakım alanı ortamında değerlendiriliyor.",
      "presentation": "Üç gündür ishal-kusma sonrası halsizlik, uykuya meyil ve derin nefes alma nedeniyle getiriliyor.",
      "historySummary": "Hasta üç gündür sulu ishal ve kusma yaşadığını, bu nedenle çok az sıvı alabildiğini anlatır. Tip 2 diyabet için yıllardır metformin kullandığını, hastalanınca ilaçlarını kesmesi gerektiğini bilmediği için dozlarını almaya devam ettiğini söyler. Bugün sabah yatağından kalkarken belirgin sersemlik ve nefes nefese kalma hissi olmuş, kızı konuşmasının yavaşladığını fark etmiştir. Ateş, balgam, idrar yaparken yanma veya karın sağ alt kadranda lokalize ağrı tariflemez. Evde kan şekeri ölçümü 160-190 mg/dL civarında seyretmiştir. Son haftada kontrastlı tetkik yapılmamış, alkol kullanımı yoktur."
    },
    "vitals": {
      "TA": "88/54 mmHg",
      "Nabız": "116/dk",
      "Solunum": "30/dk, derin",
      "SpO2": "%97 oda havasında",
      "Ateş": "36.3 °C",
      "Şok indeksi": "1.32 - mukozalar kuru, kapiller dolum 4 saniye"
    },
    "exam": [
      "Hasta uykuya meyilli ancak seslenince uyanıyor ve kısa yanıt veriyor.",
      "Mukozalar belirgin kuru, deri turgoru azalmış.",
      "Akciğerlerde ral veya wheezing duyulmuyor.",
      "Karında yaygın hafif hassasiyet var; defans ve rebound yok.",
      "Periferik ödem yok, ekstremiteler soğuk."
    ],
    "investigations": [
      {
        "id": "v307-new-725-kan-gazi",
        "label": "Arteriyel kan gazı ve laktat",
        "title": "Arteriyel kan gazı ve laktat",
        "orderLabel": "Arteriyel kan gazı ve laktat",
        "type": "lab",
        "priority": "essential",
        "subtype": "Kan gazı",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Derin yüksek anyon açıklıklı metabolik asidoz ve ağır laktat yüksekliği vardır.",
        "clinicalMeaning": "Klinik tablonun ana metabolik acilini gösterir.",
        "result": {
          "title": "Arteriyel kan gazı ve laktat",
          "summary": "Derin yüksek anyon açıklıklı metabolik asidoz ve ağır laktat yüksekliği vardır.",
          "interpretation": "Derin yüksek anyon açıklıklı metabolik asidoz ve ağır laktat yüksekliği vardır.",
          "values": [
            [
              "pH",
              "7.04",
              "7.35-7.45",
              "Kritik düşük"
            ],
            [
              "HCO3-",
              "8 mmol/L",
              "22-26 mmol/L",
              "Düşük"
            ],
            [
              "PaCO2",
              "24 mmHg",
              "35-45 mmHg",
              "Kompansatuvar düşük"
            ],
            [
              "Laktat",
              "13.8 mmol/L",
              "0.5-2.0 mmol/L",
              "Çok yüksek"
            ],
            [
              "Anyon açıklığı",
              "31 mmol/L",
              "8-12 mmol/L",
              "Yüksek"
            ]
          ]
        }
      },
      {
        "id": "v307-new-725-bobrek",
        "label": "Böbrek fonksiyonu ve elektrolit",
        "title": "Böbrek fonksiyonu ve elektrolit",
        "orderLabel": "Böbrek fonksiyonu ve elektrolit",
        "type": "lab",
        "priority": "essential",
        "subtype": "Biyokimya",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Akut böbrek hasarı ve dehidratasyon bulguları vardır.",
        "clinicalMeaning": "Metformin klirensinin azalması ve laktik asidoz riskini güçlendirir.",
        "result": {
          "title": "Böbrek fonksiyonu ve elektrolit",
          "summary": "Akut böbrek hasarı ve dehidratasyon bulguları vardır.",
          "interpretation": "Akut böbrek hasarı ve dehidratasyon bulguları vardır.",
          "values": [
            [
              "Kreatinin",
              "3.1 mg/dL",
              "0.6-1.1 mg/dL",
              "Yüksek"
            ],
            [
              "Üre",
              "112 mg/dL",
              "17-43 mg/dL",
              "Yüksek"
            ],
            [
              "eGFR",
              "15 mL/dk/1.73m²",
              ">60",
              "Ciddi düşük"
            ],
            [
              "Potasyum",
              "5.4 mmol/L",
              "3.5-5.1 mmol/L",
              "Hafif yüksek"
            ],
            [
              "Sodyum",
              "132 mmol/L",
              "136-145 mmol/L",
              "Düşük"
            ]
          ]
        }
      },
      {
        "id": "v307-new-725-glukoz-keton",
        "label": "Glukoz ve keton değerlendirmesi",
        "title": "Glukoz ve keton değerlendirmesi",
        "orderLabel": "Glukoz ve keton değerlendirmesi",
        "type": "lab",
        "priority": "essential",
        "subtype": "Metabolik tarama",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Belirgin ketoasidoz paternini destekleyen keton yüksekliği yoktur.",
        "clinicalMeaning": "Yüksek anyon açıklığının ketondan çok laktat kaynaklı olduğunu destekler.",
        "result": {
          "title": "Glukoz ve keton değerlendirmesi",
          "summary": "Belirgin ketoasidoz paternini destekleyen keton yüksekliği yoktur.",
          "interpretation": "Belirgin ketoasidoz paternini destekleyen keton yüksekliği yoktur.",
          "values": [
            [
              "Glukoz",
              "176 mg/dL",
              "70-140 mg/dL",
              "Hafif yüksek"
            ],
            [
              "Beta-hidroksibütirat",
              "0.4 mmol/L",
              "<0.6 mmol/L",
              "Normal"
            ],
            [
              "İdrar keton",
              "Negatif",
              "Negatif",
              "Normal"
            ],
            [
              "HbA1c",
              "7.4%",
              "<7% hedef",
              "Yüksek"
            ]
          ]
        }
      },
      {
        "id": "v307-new-725-enfeksiyon",
        "label": "Enfeksiyon taraması",
        "title": "Enfeksiyon taraması",
        "orderLabel": "Enfeksiyon taraması",
        "type": "lab",
        "priority": "essential",
        "subtype": "Acil tarama",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Belirgin bakteriyel sepsis lehine güçlü laboratuvar desteği yoktur.",
        "clinicalMeaning": "Laktat yüksekliğini yalnız enfeksiyona bağlamayı zayıflatır, ancak klinik izlem gerektirir.",
        "result": {
          "title": "Enfeksiyon taraması",
          "summary": "Belirgin bakteriyel sepsis lehine güçlü laboratuvar desteği yoktur.",
          "interpretation": "Belirgin bakteriyel sepsis lehine güçlü laboratuvar desteği yoktur.",
          "values": [
            [
              "Lökosit",
              "9.800/mm³",
              "4.000-10.000/mm³",
              "Üst sınır"
            ],
            [
              "CRP",
              "18 mg/L",
              "<5 mg/L",
              "Hafif yüksek"
            ],
            [
              "Prokalsitonin",
              "0.12 ng/mL",
              "<0.1 ng/mL",
              "Sınırda"
            ],
            [
              "İdrar nitrit/lökosit esteraz",
              "Negatif",
              "Negatif",
              "Normal"
            ]
          ]
        }
      },
      {
        "id": "v307-new-725-ilac",
        "label": "İlaç ve risk notu",
        "title": "İlaç ve risk notu",
        "orderLabel": "İlaç ve risk notu",
        "type": "clinical",
        "priority": "essential",
        "subtype": "İlaç öyküsü",
        "category": "clinical",
        "testTypeCategory": "clinical",
        "summary": "Metformin akut hastalık ve böbrek fonksiyon bozukluğu sırasında sürdürülmüş.",
        "clinicalMeaning": "Laktat birikimi için klinik bağlam sağlar.",
        "result": {
          "title": "İlaç ve risk notu",
          "summary": "Metformin akut hastalık ve böbrek fonksiyon bozukluğu sırasında sürdürülmüş.",
          "interpretation": "Metformin akut hastalık ve böbrek fonksiyon bozukluğu sırasında sürdürülmüş.",
          "values": [
            [
              "Metformin kullanımı",
              "1000 mg günde 2 kez",
              "eGFR <30'da kaçınılır",
              "Riskli"
            ],
            [
              "Akut hastalıkta kullanım",
              "İshal-kusmaya rağmen devam etmiş",
              "Kesilmesi gerekir",
              "Riskli"
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
    "question": "Bu hastada en uygun acil yaklaşım aşağıdakilerden hangisidir?",
    "questionType": "Acil metabolik tedavi",
    "answerTarget": "Metformin ilişkili ağır laktik asidozda tedavi önceliğini seçme.",
    "diagnosis": {
      "correct": "Metformini kesip destek tedavisi başlamak; ağır asidemi, yüksek laktat ve akut böbrek hasarı nedeniyle renal replasman tedavisini acil planlamak",
      "options": [
        "Metformini kesip destek tedavisi başlamak; ağır asidemi, yüksek laktat ve akut böbrek hasarı nedeniyle renal replasman tedavisini acil planlamak",
        "Laktat yüksekliğini sepsise bağlayıp metformine dokunmadan yalnız geniş spektrumlu antibiyotikle izlemek",
        "Hiperglisemi belirgin olmadığı için asidozu önemsiz kabul edip oral sıvı ve metformin doz azaltımıyla taburcu etmek",
        "İnsülin infüzyonu ve yüksek doz dekstrozla ketoasidoz protokolünü primer tedavi olarak başlamak",
        "Loperamid verip ishali durdurduktan sonra kreatinin normale dönene kadar evde takip etmek"
      ],
      "question": "Bu hastada en uygun acil yaklaşım aşağıdakilerden hangisidir?",
      "explanation": "Metformin kullanımı, dehidratasyon, akut böbrek hasarı, derin anyon açıklıklı metabolik asidoz ve çok yüksek laktat birlikte metformin ilişkili laktik asidozu güçlü biçimde destekler. Ağır asidemi ve renal yetmezlik nedeniyle metformin kesilmeli, yoğun destek tedavisi verilmeli ve renal replasman tedavisi acil değerlendirilmelidir.",
      "pearls": [
        "MALA pH <7.35 ve laktat >5 mmol/L bağlamında düşünülür.",
        "Akut böbrek hasarı metformin birikimini kolaylaştırır.",
        "Glukozun çok yüksek olmaması MALA'yı dışlamaz.",
        "Ağır asidemi/laktat yüksekliğinde diyaliz düşünülür."
      ],
      "optionFeedback": {
        "Metformini kesip destek tedavisi başlamak; ağır asidemi, yüksek laktat ve akut böbrek hasarı nedeniyle renal replasman tedavisini acil planlamak": "Bu seçenek en uygundur. Metformin kullanan, dehidratasyon ve akut böbrek hasarı gelişen hastada derin anyon açıklıklı metabolik asidoz ve çok yüksek laktat varsa metformin ilişkili laktik asidoz güçlü biçimde düşünülür. İlk yaklaşım metformini kesmek, hava yolu-solunum-dolaşımı desteklemek, sıvı/vasopressör ve asit-baz yönetimini yapmak; ağır asidemi, belirgin laktat yüksekliği veya renal yetmezlik varsa hemodiyaliz/renal replasman tedavisini planlamaktır. Diyaliz hem metformini uzaklaştırır hem asidoz ve laktatı düzeltmeye yardım eder.",
        "Laktat yüksekliğini sepsise bağlayıp metformine dokunmadan yalnız geniş spektrumlu antibiyotikle izlemek": "Sepsis laktik asidozun çok önemli nedenidir ve enfeksiyon bulguları varsa antibiyotik gecikmemelidir. Ancak bu hastada lökosit/prokalsitonin çok belirgin değil, hipotansiyon dehidratasyonla birlikte, ana bağlam ise metformin kullanımı ve akut böbrek hasarıdır. Metformini sürdürmek veya laktik asidozu yalnız sepsise bağlamak patofizyolojik yükü düzeltmez. Geniş spektrumlu antibiyotik ancak klinik enfeksiyon kanıtı varsa eklenir; tek başına temel tedavi değildir.",
        "Hiperglisemi belirgin olmadığı için asidozu önemsiz kabul edip oral sıvı ve metformin doz azaltımıyla taburcu etmek": "Metformin ilişkili laktik asidozda glukoz çok yüksek olmak zorunda değildir; hatta ana laboratuvar paterni düşük pH, düşük bikarbonat, yüksek anyon açıklığı ve yüksek laktattır. pH 7.04 ve laktat 13.8 mmol/L gibi değerler taburculukla izlenecek hafif bir yan etki değildir. Doz azaltımı değil ilacın kesilmesi ve yoğun bakım düzeyinde destek gerekir. Bu yaklaşım ölümcül asidozu atlar.",
        "İnsülin infüzyonu ve yüksek doz dekstrozla ketoasidoz protokolünü primer tedavi olarak başlamak": "Ketoasidozda keton yüksekliği, hiperglisemi veya SGLT2 ilişkili öglisemik patern gibi bulgular beklenir. Bu vakada beta-hidroksibütirat düşük-sınırda, glukoz aşırı yüksek değil ve laktat çok belirgin artmıştır. İnsülin infüzyonu bu laktik asidozun primer tedavisi değildir; potasyum ve glukoz dengesini gereksiz bozabilir. Tedavi metformin birikimi ve renal klirens sorununa odaklanmalıdır.",
        "Loperamid verip ishali durdurduktan sonra kreatinin normale dönene kadar evde takip etmek": "İshal ve kusma metformin birikimini tetikleyen dehidratasyon ve akut böbrek hasarına yol açmış olabilir; ancak artık tablo yalnız gastrointestinal semptom değildir. Kreatinin yüksekliği, pH düşüklüğü ve laktat yüksekliği yoğun bakım gerektiren metabolik acili gösterir. Loperamid verip evde takip etmek hem böbrek yetmezliğini hem derin asidozu tedavisiz bırakır."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "Metformin mitokondriyal oksidatif fosforilasyon ve hepatik glukoneogenez-laktat kullanımını etkileyerek laktat birikimini artırabilir; renal klirens azalınca risk belirginleşir.",
    "examPearl": "TUS ipucu: metformin + akut böbrek hasarı/dehidratasyon + laktat çok yüksek + pH çok düşük = metformini kes, destekle, ağırsa hemodiyaliz düşün.",
    "whyCorrect": "Doğru seçenek hem tetikleyici ilacı keser hem de ölümcül asidoz ve renal klirens sorununu hedefler.",
    "optionComparison": "Yanlış seçenekler tabloyu sepsis, DKA veya basit gastroenterit gibi tek bir eksene indirger ve metformin birikimiyle gelişen ağır laktik asidozu tedavisiz bırakır.",
    "evidenceChain": [
      "İshal-kusma ve az sıvı alımı → dehidratasyon/AKI tetikleyicisi.",
      "Metformin devamı → renal klirens azalınca birikim riski.",
      "pH 7.04 + HCO3 8 → ağır metabolik asidoz.",
      "Laktat 13.8 + anyon açıklığı 31 → laktik yüksek anyon açıklıklı asidoz.",
      "Keton negatif ve beta-hidroksibütirat normal → ketoasidoz zayıf."
    ],
    "whyWrong": "Yanlış seçeneklerin ortak hatası, laktat ve böbrek yetmezliğiyle uyumlu ilaç ilişkili metabolik acili görmezden gelmesidir.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v307",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V306 render-safe internal-medicine cases with investigations and diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  },
{
    "id": "v307-new-726-yuz-kizarmasi-ishal-ve-hiriltili-nefes",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "Yüz kızarması, ishal ve hırıltılı nefes",
    "difficulty": "Zor",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "Flushing, kronik sekretuar ishal, bronkospazm ve karaciğer lezyonlarını nöroendokrin tümör kaynaklı hormon sendromuyla ilişkilendirme.",
    "learningTarget": "Karsinoid sendromu feokromositoma, medüller tiroid karsinomu, VIPoma ve enfeksiyöz kolitten ayıran 5-HIAA merkezli tanısal yaklaşımı öğretme.",
    "demographics": "59 yaşında erkek hasta",
    "setting": "Gastroenteroloji-onkoloji polikliniği",
    "chiefComplaint": "Altı aydır tekrarlayan yüz kızarması, sulu ishal ve zaman zaman hırıltılı nefes nedeniyle başvuruyor.",
    "stem": "Hasta son altı aydır özellikle sıcak içeceklerden veya stresli toplantılardan sonra yüzünde ve boynunda aniden kızarma olduğunu, bu sırada kalbinin hızlandığını ve bazen göğsünde hırıltı hissettiğini anlatır. Aynı dönem içinde günde 5-6 kez sulu dışkılama başlamış, dışkıda kan veya mukus fark etmemiştir. İshal nedeniyle kilo kaybetmiş ancak iştahı tamamen kapanmamıştır. Daha önce astım tanısı yoktur; inhaler kullandığında hırıltısı yalnız kısmen rahatlamıştır. Ateş, gece terlemesi veya yakın zamanda antibiyotik kullanımı tariflemez. Aile hekimi karaciğer enzimlerinde hafif yükseklik görünce ultrason istemiş ve birden fazla karaciğer lezyonu saptanmıştır.",
    "patientIntro": {
      "profile": "59 yaşında erkek hasta, Gastroenteroloji-onkoloji polikliniği ortamında değerlendiriliyor.",
      "presentation": "Altı aydır tekrarlayan yüz kızarması, sulu ishal ve zaman zaman hırıltılı nefes nedeniyle başvuruyor.",
      "historySummary": "Hasta son altı aydır özellikle sıcak içeceklerden veya stresli toplantılardan sonra yüzünde ve boynunda aniden kızarma olduğunu, bu sırada kalbinin hızlandığını ve bazen göğsünde hırıltı hissettiğini anlatır. Aynı dönem içinde günde 5-6 kez sulu dışkılama başlamış, dışkıda kan veya mukus fark etmemiştir. İshal nedeniyle kilo kaybetmiş ancak iştahı tamamen kapanmamıştır. Daha önce astım tanısı yoktur; inhaler kullandığında hırıltısı yalnız kısmen rahatlamıştır. Ateş, gece terlemesi veya yakın zamanda antibiyotik kullanımı tariflemez. Aile hekimi karaciğer enzimlerinde hafif yükseklik görünce ultrason istemiş ve birden fazla karaciğer lezyonu saptanmıştır."
    },
    "vitals": {
      "TA": "118/72 mmHg",
      "Nabız": "98/dk",
      "Solunum": "20/dk",
      "SpO2": "%96 oda havasında",
      "Ateş": "36.7 °C",
      "Şok indeksi": "0.83 - perfüzyon iyi, aktif flushing yok"
    },
    "exam": [
      "Hasta zayıf görünüyor, bilinç açık.",
      "Muayene sırasında yüzde hafif eritem mevcut; ürtiker veya anjiyoödem yok.",
      "Akciğerde ekspiryum sonunda hafif wheezing duyuluyor.",
      "Karaciğer kot altında 2 cm palpabl, belirgin asit yok.",
      "Tiroidde belirgin nodül palpe edilmiyor."
    ],
    "investigations": [
      {
        "id": "v307-new-726-hemogram-biyokimya",
        "label": "Hemogram ve temel biyokimya",
        "title": "Hemogram ve temel biyokimya",
        "orderLabel": "Hemogram ve temel biyokimya",
        "type": "lab",
        "priority": "essential",
        "subtype": "Laboratuvar",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Hafif karaciğer enzim yüksekliği ve kilo kaybıyla uyumlu sınırda anemi vardır.",
        "clinicalMeaning": "Kronik sistemik süreci destekler, akut enfeksiyöz kolit paternini güçlendirmez.",
        "result": {
          "title": "Hemogram ve temel biyokimya",
          "summary": "Hafif karaciğer enzim yüksekliği ve kilo kaybıyla uyumlu sınırda anemi vardır.",
          "interpretation": "Hafif karaciğer enzim yüksekliği ve kilo kaybıyla uyumlu sınırda anemi vardır.",
          "values": [
            [
              "Hemoglobin",
              "12.2 g/dL",
              "13-17 g/dL",
              "Hafif düşük"
            ],
            [
              "Lökosit",
              "7.400/mm³",
              "4.000-10.000/mm³",
              "Normal"
            ],
            [
              "CRP",
              "6 mg/L",
              "<5 mg/L",
              "Sınırda"
            ],
            [
              "AST",
              "54 U/L",
              "<40 U/L",
              "Yüksek"
            ],
            [
              "ALT",
              "61 U/L",
              "<41 U/L",
              "Yüksek"
            ]
          ]
        }
      },
      {
        "id": "v307-new-726-elektrolit",
        "label": "Elektrolit ve dışkı etkisi",
        "title": "Elektrolit ve dışkı etkisi",
        "orderLabel": "Elektrolit ve dışkı etkisi",
        "type": "lab",
        "priority": "essential",
        "subtype": "Biyokimya",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Ağır hipokalemik sekretuar ishal paterni yoktur.",
        "clinicalMeaning": "VIPoma olasılığını zayıflatır, ancak kronik ishal etkisini izlemeyi gerektirir.",
        "result": {
          "title": "Elektrolit ve dışkı etkisi",
          "summary": "Ağır hipokalemik sekretuar ishal paterni yoktur.",
          "interpretation": "Ağır hipokalemik sekretuar ishal paterni yoktur.",
          "values": [
            [
              "Potasyum",
              "3.8 mmol/L",
              "3.5-5.1 mmol/L",
              "Normal"
            ],
            [
              "Sodyum",
              "137 mmol/L",
              "136-145 mmol/L",
              "Normal"
            ],
            [
              "Albumin",
              "3.3 g/dL",
              "3.5-5.0 g/dL",
              "Hafif düşük"
            ],
            [
              "Kreatinin",
              "0.86 mg/dL",
              "0.7-1.2 mg/dL",
              "Normal"
            ]
          ]
        }
      },
      {
        "id": "v307-new-726-diski",
        "label": "Dışkı değerlendirmesi",
        "title": "Dışkı değerlendirmesi",
        "orderLabel": "Dışkı değerlendirmesi",
        "type": "lab",
        "priority": "essential",
        "subtype": "Dışkı testi",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Kanlı invaziv kolit bulgusu desteklenmiyor.",
        "clinicalMeaning": "Kronik ishalin enfeksiyöz/inflamatuvar açıklamasını zayıflatır.",
        "result": {
          "title": "Dışkı değerlendirmesi",
          "summary": "Kanlı invaziv kolit bulgusu desteklenmiyor.",
          "interpretation": "Kanlı invaziv kolit bulgusu desteklenmiyor.",
          "values": [
            [
              "Dışkıda gizli kan",
              "Negatif",
              "Negatif",
              "Normal"
            ],
            [
              "Dışkı lökositi",
              "Negatif",
              "Negatif",
              "Normal"
            ],
            [
              "Dışkı kültürü",
              "Patojen üremedi",
              "Negatif",
              "Negatif"
            ],
            [
              "C. difficile toksini",
              "Negatif",
              "Negatif",
              "Normal"
            ]
          ]
        }
      },
      {
        "id": "v307-new-726-goruntuleme",
        "label": "Abdominal BT",
        "title": "Abdominal BT",
        "orderLabel": "Abdominal BT",
        "type": "imaging",
        "priority": "essential",
        "subtype": "Kesitsel görüntüleme",
        "category": "imaging",
        "testTypeCategory": "imaging",
        "summary": "Karaciğerde çok sayıda hipervasküler lezyon izleniyor.",
        "clinicalMeaning": "Hormonların sistemik dolaşıma kaçmasına izin verebilecek metastatik nöroendokrin tümör bağlamını destekler.",
        "result": {
          "title": "Abdominal BT",
          "summary": "Karaciğerde çok sayıda hipervasküler lezyon izleniyor.",
          "interpretation": "Karaciğerde çok sayıda hipervasküler lezyon izleniyor.",
          "narrative": "Karaciğer her iki lobda arteriyel fazda belirgin kontrastlanan çok sayıda lezyon izlenir. İleum distal segmentinde duvar komşuluğunda 2 cm nodüler lezyon şüphesi vardır. Safra yolu dilatasyonu yoktur."
        }
      },
      {
        "id": "v307-new-726-biyobelirtec",
        "label": "Hedef biyokimyasal test",
        "title": "Hedef biyokimyasal test",
        "orderLabel": "Hedef biyokimyasal test",
        "type": "lab",
        "priority": "essential",
        "subtype": "Nöroendokrin biyobelirteç",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Serotonin metaboliti ölçümü için uygun diyet/ilaç hazırlığıyla örnek planlandı.",
        "clinicalMeaning": "Semptomları hormon aktif nöroendokrin tümör yönünden doğrulamaya yarar.",
        "result": {
          "title": "Hedef biyokimyasal test",
          "summary": "Serotonin metaboliti ölçümü için uygun diyet/ilaç hazırlığıyla örnek planlandı.",
          "interpretation": "Serotonin metaboliti ölçümü için uygun diyet/ilaç hazırlığıyla örnek planlandı.",
          "values": [
            [
              "Planlanan test",
              "24 saatlik idrar 5-HIAA veya uygun serum/plazma 5-HIAA",
              "-",
              "Hedef test"
            ],
            [
              "NT-proBNP",
              "210 pg/mL",
              "<125 pg/mL",
              "Hafif yüksek; kardiyak tutulum taraması için izlem"
            ],
            [
              "Kalsitonin",
              "6 pg/mL",
              "<10 pg/mL",
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
    "question": "Bu klinik tabloyu doğrulamaya yönelik en uygun biyokimyasal değerlendirme aşağıdakilerden hangisidir?",
    "questionType": "Tanısal biyobelirteç",
    "answerTarget": "Flushing-ishal-wheezing-karaciğer lezyonu paterninde doğru hormon metabolitini seçme.",
    "diagnosis": {
      "correct": "Serotonin metaboliti olan 5-HIAA ölçümüyle nöroendokrin tümör kaynaklı karsinoid sendromu değerlendirmek",
      "options": [
        "Serum kalsitonin ve RET mutasyonu ile medüller tiroid karsinomunu doğrulamak",
        "Plazma serbest metanefrinleriyle katekolamin salgılayan adrenal tümörü araştırmak",
        "Dışkı kültürü ve kolonoskopiyle invaziv enfeksiyöz koliti öncelikli doğrulamak",
        "VIP düzeyi ölçüp hipokalemik aklorhidrik sekretuar ishal sendromunu araştırmak",
        "Serotonin metaboliti olan 5-HIAA ölçümüyle nöroendokrin tümör kaynaklı karsinoid sendromu değerlendirmek"
      ],
      "question": "Bu klinik tabloyu doğrulamaya yönelik en uygun biyokimyasal değerlendirme aşağıdakilerden hangisidir?",
      "explanation": "Tekrarlayan flushing, sulu ishal, wheezing ve hipervasküler karaciğer lezyonları serotonin salgılayan nöroendokrin tümör kaynaklı karsinoid sendromu düşündürür. Bu durumda serotonin metaboliti 5-HIAA ölçümü tanısal biyokimyasal değerlendirmede temel basamaktır.",
      "pearls": [
        "Flushing + ishal + wheezing karsinoid sendrom için klasik birlikteliktir.",
        "Karaciğer metastazı hormonların sistemik dolaşıma ulaşmasını kolaylaştırır.",
        "5-HIAA serotonin metabolizmasını yansıtır.",
        "NT-proBNP karsinoid kalp hastalığı taramasında yardımcıdır."
      ],
      "optionFeedback": {
        "Serum kalsitonin ve RET mutasyonu ile medüller tiroid karsinomunu doğrulamak": "Medüller tiroid karsinomu kalsitonin yüksekliği, tiroid nodülü ve bazen MEN2 bağlamında düşünülebilir; flushing veya ishal yapabilse de bu hastada belirgin karaciğer lezyonları ve serotonin metaboliti paternine giden semptomlar ön plandadır. Tiroid muayenesi ve kalsitonin verisi yoktur. Bu seçenek özellikle tiroid nodülü/kalsitonin eksenini sorgulayan olgularda doğru olurdu, ancak mevcut veri zincirinin en güçlü açıklaması değildir.",
        "Plazma serbest metanefrinleriyle katekolamin salgılayan adrenal tümörü araştırmak": "Feokromositoma paroksismal hipertansiyon, baş ağrısı, terleme ve çarpıntı ile gelir; metanefrinler bu durumda ilk biyokimyasal testtir. Bu hastada ataklar tansiyon pikinden çok sıcak basması, sulu ishal ve wheezing ile ilişkilidir. Kan basıncı ataklarda kriz düzeyine çıkmamış ve karaciğerde nöroendokrin metastaz düşündüren lezyonlar vardır. Bu nedenle katekolamin tümörü ilk açıklama değildir.",
        "Dışkı kültürü ve kolonoskopiyle invaziv enfeksiyöz koliti öncelikli doğrulamak": "Enfeksiyöz kolit ateş, kanlı/mukuslu dışkı, temas öyküsü veya akut inflamatuvar laboratuvarla desteklenebilir. Bu hastanın ishali aylardır sürüyor, sıcak basması ve bronkospazm eşlik ediyor; dışkıda kan yok. Kolonoskopi elbette bazı kronik ishal nedenlerinde gerekebilir, ancak bu tabloda biyokimyasal olarak hormon aktif nöroendokrin sendromu değerlendirmek daha hedefe yöneliktir.",
        "VIP düzeyi ölçüp hipokalemik aklorhidrik sekretuar ishal sendromunu araştırmak": "VIPoma bol sulu ishal, hipokalemi ve aklorhidri ile karakterize sekretuar ishal sendromu yapabilir. Bu olguda potasyum belirgin düşük değildir ve flushing-wheezing-karaciğer lezyonları triadı serotonin salınımı ile daha uyumludur. VIP düzeyi, hipokalemik masif ishal baskın olsaydı daha uygun olurdu; burada ilk test 5-HIAA eksenidir.",
        "Serotonin metaboliti olan 5-HIAA ölçümüyle nöroendokrin tümör kaynaklı karsinoid sendromu değerlendirmek": "Bu seçenek en uygundur. Tekrarlayan sıcak basması, sulu ishal, bronkospazm benzeri hırıltı ve karaciğer lezyonları birlikte serotonin salgılayan nöroendokrin tümörün sistemik hormon etkisini düşündürür. Serotonin karaciğerde metabolize edildiğinden karaciğer metastazları varlığında sistemik bulgular belirginleşebilir. Tanısal değerlendirmede 24 saatlik idrar 5-HIAA veya uygun koşullarda serum/plazma 5-HIAA ölçümü serotonin metabolizmasını gösteren temel biyobelirteçtir; kromogranin A tek başına özgül tarama testi değildir."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "Karsinoid sendromda serotonin ve diğer mediatörler flushing, sekretuar ishal ve bronkospazm oluşturabilir. Serotoninin ana metaboliti 5-HIAA'dır ve 24 saatlik idrar veya uygun kan ölçümüyle izlenebilir.",
    "examPearl": "TUS ipucu: flushing + sulu ishal + wheezing + karaciğer metastazı = karsinoid sendrom; biyokimyasal anahtar 5-HIAA.",
    "whyCorrect": "Doğru seçenek, semptomların ortak serotonin aracılı mekanizmasını hedefleyen biyokimyasal testi seçer.",
    "optionComparison": "Yanlış seçenekler benzer flushing/ishal yapabilen ama bu veri zincirindeki karaciğer lezyonu ve bronkospazm-serotonin ilişkisini karşılamayan durumları temsil eder.",
    "evidenceChain": [
      "Sıcak içecek/stres sonrası flushing → mediatör salınımı.",
      "Günde 5-6 sulu dışkılama → sekretuar ishal paterni.",
      "Wheezing ve parsiyel inhaler yanıt → bronkospazm mediatör etkisi.",
      "Hipervasküler karaciğer lezyonları → nöroendokrin metastaz olasılığı.",
      "Kalsitonin normal ve dışkı inflamasyon bulgusu yok → alternatifler zayıflar."
    ],
    "whyWrong": "Yanlış seçenekler tek tek bazı semptomları açıklayabilir; ancak flushing, ishal, wheezing ve karaciğer lezyonlarını birlikte en iyi 5-HIAA ile değerlendirilen serotonin aracılı süreç açıklar.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v307",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V306 render-safe internal-medicine cases with investigations and diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  },
{
    "id": "v307-new-727-asitli-hastada-ates-ve-karin-agrisi",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "Asitli hastada ateş ve karın ağrısı",
    "difficulty": "Zor",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "Siroz ve asit zemininde gelişen enfeksiyon bulgularında parasentez sonucunu tedavi kararına bağlama.",
    "learningTarget": "Asit PMN eşiği, kültür beklememe, antibiyotik ve albümin kararını cerrahi peritonit/ensefalopati/diüretik yönetiminden ayırma.",
    "demographics": "61 yaşında erkek hasta",
    "setting": "Acil servis dahiliye konsültasyon alanı",
    "chiefComplaint": "Bir gündür ateş, karın ağrısı ve halsizlik nedeniyle getiriliyor.",
    "stem": "Hasta alkol ilişkili siroz nedeniyle takip edildiğini, son aylarda karnındaki şişliğin arttığını ve iki kez parasentez yapıldığını anlatır. Dün akşamdan beri karnının özellikle hareket ederken daha hassas olduğunu, sabaha karşı üşüme-titreme ve belirgin halsizlik başladığını söyler. Eşi, hastanın normalden daha dalgın olduğunu ancak evde kanlı kusma veya siyah dışkı fark etmediğini belirtir. Son günlerde dışarıdan çiğ deniz ürünü yememiş, yeni antibiyotik kullanmamıştır. İdrar miktarının azaldığını ve ağız kuruluğu olduğunu söyler. Şiddetli lokalize sağ alt kadran ağrısı veya ani başlayan bıçak saplanır tarzda ağrı tariflemez.",
    "patientIntro": {
      "profile": "61 yaşında erkek hasta, Acil servis dahiliye konsültasyon alanı ortamında değerlendiriliyor.",
      "presentation": "Bir gündür ateş, karın ağrısı ve halsizlik nedeniyle getiriliyor.",
      "historySummary": "Hasta alkol ilişkili siroz nedeniyle takip edildiğini, son aylarda karnındaki şişliğin arttığını ve iki kez parasentez yapıldığını anlatır. Dün akşamdan beri karnının özellikle hareket ederken daha hassas olduğunu, sabaha karşı üşüme-titreme ve belirgin halsizlik başladığını söyler. Eşi, hastanın normalden daha dalgın olduğunu ancak evde kanlı kusma veya siyah dışkı fark etmediğini belirtir. Son günlerde dışarıdan çiğ deniz ürünü yememiş, yeni antibiyotik kullanmamıştır. İdrar miktarının azaldığını ve ağız kuruluğu olduğunu söyler. Şiddetli lokalize sağ alt kadran ağrısı veya ani başlayan bıçak saplanır tarzda ağrı tariflemez."
    },
    "vitals": {
      "TA": "104/64 mmHg",
      "Nabız": "108/dk",
      "Solunum": "22/dk",
      "SpO2": "%95 oda havasında",
      "Ateş": "38.4 °C",
      "Şok indeksi": "1.04 - kapiller dolum 3 saniye, mukozalar kuru"
    },
    "exam": [
      "Hasta halsiz ve hafif dalgın, sorulara yavaş ama uygun yanıt veriyor.",
      "Skleralar ikterik, karında belirgin asit görünümü var.",
      "Batında yaygın hassasiyet mevcut; belirgin defans veya rebound saptanmıyor.",
      "Asteriksis hafif pozitif.",
      "Pretibial ödem bilateral +1, akciğer bazallerinde belirgin ral yok."
    ],
    "investigations": [
      {
        "id": "v307-new-727-kan",
        "label": "Hemogram ve inflamasyon",
        "title": "Hemogram ve inflamasyon",
        "orderLabel": "Hemogram ve inflamasyon",
        "type": "lab",
        "priority": "essential",
        "subtype": "Acil laboratuvar",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Nötrofil ağırlıklı lökositoz ve inflamatuvar yanıt vardır.",
        "clinicalMeaning": "Siroz zemininde enfeksiyon olasılığını destekler.",
        "result": {
          "title": "Hemogram ve inflamasyon",
          "summary": "Nötrofil ağırlıklı lökositoz ve inflamatuvar yanıt vardır.",
          "interpretation": "Nötrofil ağırlıklı lökositoz ve inflamatuvar yanıt vardır.",
          "values": [
            [
              "Lökosit",
              "15.200/mm³",
              "4.000-10.000/mm³",
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
              "94 mg/L",
              "<5 mg/L",
              "Yüksek"
            ],
            [
              "Hemoglobin",
              "10.8 g/dL",
              "13-17 g/dL",
              "Düşük"
            ],
            [
              "Trombosit",
              "82.000/mm³",
              "150.000-400.000/mm³",
              "Düşük"
            ]
          ]
        }
      },
      {
        "id": "v307-new-727-biyokimya",
        "label": "Karaciğer ve böbrek paneli",
        "title": "Karaciğer ve böbrek paneli",
        "orderLabel": "Karaciğer ve böbrek paneli",
        "type": "lab",
        "priority": "essential",
        "subtype": "Biyokimya",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Siroz bulguları ve böbrek etkilenimi riski vardır.",
        "clinicalMeaning": "Tedavide albümin ve renal yakın izlem gerekliliğini destekler.",
        "result": {
          "title": "Karaciğer ve böbrek paneli",
          "summary": "Siroz bulguları ve böbrek etkilenimi riski vardır.",
          "interpretation": "Siroz bulguları ve böbrek etkilenimi riski vardır.",
          "values": [
            [
              "Total bilirubin",
              "4.1 mg/dL",
              "0.2-1.2 mg/dL",
              "Yüksek"
            ],
            [
              "Albumin",
              "2.4 g/dL",
              "3.5-5.0 g/dL",
              "Düşük"
            ],
            [
              "INR",
              "1.8",
              "0.8-1.2",
              "Yüksek"
            ],
            [
              "Kreatinin",
              "1.6 mg/dL",
              "0.7-1.2 mg/dL",
              "Yüksek"
            ],
            [
              "Sodyum",
              "130 mmol/L",
              "136-145 mmol/L",
              "Düşük"
            ]
          ]
        }
      },
      {
        "id": "v307-new-727-asit",
        "label": "Tanısal parasentez",
        "title": "Tanısal parasentez",
        "orderLabel": "Tanısal parasentez",
        "type": "lab",
        "priority": "essential",
        "subtype": "Asit sıvısı analizi",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Asit sıvısında nötrofil sayısı belirgin yüksektir.",
        "clinicalMeaning": "Siroz zemininde enfekte asit sıvısı için tedavi eşiğini aşar.",
        "result": {
          "title": "Tanısal parasentez",
          "summary": "Asit sıvısında nötrofil sayısı belirgin yüksektir.",
          "interpretation": "Asit sıvısında nötrofil sayısı belirgin yüksektir.",
          "values": [
            [
              "Asit PMN",
              "740/mm³",
              "<250/mm³",
              "Yüksek"
            ],
            [
              "Asit total protein",
              "0.9 g/dL",
              ">1.5 g/dL düşük risk değil",
              "Düşük"
            ],
            [
              "SAAG",
              "1.7 g/dL",
              ">1.1 portal HT lehine",
              "Yüksek"
            ],
            [
              "Gram boyama",
              "Bakteri görülmedi",
              "Negatif olabilir",
              "Tanıyı dışlamaz"
            ],
            [
              "Asit kültürü",
              "Sonuç bekleniyor",
              "-",
              "Beklemede"
            ]
          ]
        }
      },
      {
        "id": "v307-new-727-usg",
        "label": "Batın ultrasonografisi",
        "title": "Batın ultrasonografisi",
        "orderLabel": "Batın ultrasonografisi",
        "type": "imaging",
        "priority": "essential",
        "subtype": "Acil ultrason",
        "category": "imaging",
        "testTypeCategory": "imaging",
        "summary": "Gergin asit vardır, serbest hava veya belirgin apse bulgusu yoktur.",
        "clinicalMeaning": "Cerrahi perforasyon bulgusundan çok siroz-asit komplikasyonu bağlamını destekler.",
        "result": {
          "title": "Batın ultrasonografisi",
          "summary": "Gergin asit vardır, serbest hava veya belirgin apse bulgusu yoktur.",
          "interpretation": "Gergin asit vardır, serbest hava veya belirgin apse bulgusu yoktur.",
          "narrative": "Karaciğer konturları nodüler, portal hipertansiyon bulguları ve yaygın asit izlenir. Safra yollarında dilatasyon, belirgin intraabdominal apse veya serbest hava lehine bulgu saptanmaz."
        }
      }
    ],
    "useSyntheticInvestigationBank": true,
    "managementSequence": {
      "enabled": false
    },
    "hideExamSignal": true,
    "question": "Bu hasta için en uygun başlangıç tedavisi aşağıdakilerden hangisidir?",
    "questionType": "Tedavi / komplikasyon yönetimi",
    "answerTarget": "Siroz-asit hastasında PMN yüksekliğiyle ampirik antibiyotik ve albümin kararını seçme.",
    "diagnosis": {
      "correct": "Üçüncü kuşak sefalosporin tedavisi ve böbrek riskini azaltmak için intravenöz albümin başlamak",
      "options": [
        "Asit kültürü sonucunu bekleyip antibiyotiği yalnız üreme olursa başlamak",
        "Üçüncü kuşak sefalosporin tedavisi ve böbrek riskini azaltmak için intravenöz albümin başlamak",
        "Acil cerrahi eksplorasyon planlayıp antibiyotiği laparotomi sonrasına ertelemek",
        "Yalnız yüksek doz diüretik artırıp asit geriledikten sonra ateşi yeniden değerlendirmek",
        "Rifaksimin dozunu artırıp laktülozla dışkılama sayısını yükseltmek"
      ],
      "question": "Bu hasta için en uygun başlangıç tedavisi aşağıdakilerden hangisidir?",
      "explanation": "Sirozlu ve asitli hastada ateş, karın ağrısı ve asit PMN değerinin 250/mm³ üzerinde olması enfekte asit sıvısı için tedavi gerektirir. Kültür sonucu beklenmeden üçüncü kuşak sefalosporin başlanmalı; renal etkilenim riski olan hastada albümin desteği eklenmelidir.",
      "pearls": [
        "Siroz + asit + ateş/karın ağrısı → tanısal parasentez gerekir.",
        "Asit PMN ≥250/mm³ tedavi eşiğidir.",
        "Gram boyama negatifliği tanıyı dışlamaz.",
        "Kreatinin yüksekliği albümin gerekliliğini güçlendirir."
      ],
      "optionFeedback": {
        "Asit kültürü sonucunu bekleyip antibiyotiği yalnız üreme olursa başlamak": "Asit sıvısında kültür tanıyı destekler ve antibiyotik seçimini daraltmaya yardım eder; fakat sonuç beklenmez. Nötrofil sayısı eşik değerin üzerindeyse veya klinik güçlü ise ampirik tedavi gecikmeden başlanır. Bu hastada ateş, karın ağrısı, lökositoz ve yüksek asit PMN değeri varken kültür beklemek sepsis ve böbrek yetmezliği riskini artırır.",
        "Üçüncü kuşak sefalosporin tedavisi ve böbrek riskini azaltmak için intravenöz albümin başlamak": "Bu seçenek en uygundur. Siroz ve asit zemininde ateş/karın ağrısı gelişen hastada diagnostik parasentezde PMN sayısının yüksek bulunması enfekte asit sıvısını düşündürür ve ampirik üçüncü kuşak sefalosporin başlanmalıdır. Kreatinin ve üre yüksekliği böbrek etkilenimi riskini artırdığı için intravenöz albümin eklenmesi dolaşım disfonksiyonu ve renal kötüleşme riskini azaltma açısından önemlidir. Tedavi kültür sonucu beklenmeden başlatılır; sonuçlar daha sonra antibiyotik düzenlemesi için kullanılır.",
        "Acil cerrahi eksplorasyon planlayıp antibiyotiği laparotomi sonrasına ertelemek": "Sekonder peritonit perforasyon veya intraabdominal cerrahi odakla ilişkili olabilir; belirgin rebound/defans, polimikrobiyal kültür, çok yüksek protein/LDH veya görüntülemede perforasyon bulgusu gibi verilerle düşünülür. Bu vakada karın hassasiyeti yaygın ama defans-rebound yok, görüntülemede serbest hava yok ve asit PMN yüksekliği siroz zemininde enfekte asit sıvısı lehinedir. Cerrahiyi ilk basamak yapmak ve antibiyotiği ertelemek doğru değildir.",
        "Yalnız yüksek doz diüretik artırıp asit geriledikten sonra ateşi yeniden değerlendirmek": "Diüretik artırmak gergin asiti azaltabilir; ancak ateş, karın ağrısı ve nötrofilik asit sıvısı varken ana problem sıvı birikimi değil enfeksiyondur. Üstelik kreatinin yüksekliği ve hiponatremi varken agresif diürez renal perfüzyonu daha da bozabilir. Bu yaklaşım enfeksiyonu tedavisiz bırakır ve klinik kötüleşmeyi hızlandırabilir.",
        "Rifaksimin dozunu artırıp laktülozla dışkılama sayısını yükseltmek": "Rifaksimin ve laktüloz hepatik ensefalopati yönetiminde kullanılır; uyku hali veya asteriksis baskınsa değerlidir. Bu hastada hafif dalgınlık eşlik etse de karın ağrısı, ateş ve asit PMN yüksekliği enfeksiyöz komplikasyonu ön plana çıkarır. Sadece ensefalopati tedavisini artırmak enfekte asit sıvısını tedavi etmez; antibiyotik ve böbrek koruyucu destek gecikir."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "Sirozda bakteriyel translocation ve düşük asit opsonik aktivitesi enfekte asit sıvısı riskini artırır. Tanıda kültürden çok PMN eşiği acil tedavi kararını belirler.",
    "examPearl": "TUS ipucu: siroz + asit + ateş/karın ağrısı + asit PMN >250 → kültür bekleme; sefotaksim/seftriakson ve uygun hastada albümin düşün.",
    "whyCorrect": "Doğru seçenek, hem enfeksiyonu gecikmeden tedavi eder hem de sirozda enfeksiyonla tetiklenen renal dolaşım bozukluğu riskini azaltır.",
    "optionComparison": "Yanlış seçenekler kültür sonucunu bekleyerek, cerrahi tablo varsayarak, diürezi artırarak veya ensefalopati tedavisine odaklanarak asıl enfeksiyon yönetimini geciktirir.",
    "evidenceChain": [
      "Siroz ve yaygın asit öyküsü → riskli zemin.",
      "Ateş + yaygın karın hassasiyeti → enfeksiyon şüphesi.",
      "Asit PMN 740/mm³ → tedavi eşiğinin üstünde.",
      "Kreatinin 1.6 ve sodyum 130 → renal dolaşım riski.",
      "Defans/rebound ve serbest hava olmaması → primer cerrahi yaklaşım gereksinimini zayıflatır."
    ],
    "whyWrong": "Yanlış seçeneklerin ortak hatası, asit PMN eşiğinin tedavi kararındaki ağırlığını görmezden gelmesidir.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v307",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V306 render-safe internal-medicine cases with investigations and diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  },
{
    "id": "v307-new-728-sogukta-moraran-parmaklar-ve-koyu-idrar",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "Soğukta moraran parmaklar ve koyu idrar",
    "difficulty": "Zor",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "Soğuk maruziyetiyle artan akral dolaşım bulguları ve hemoliz laboratuvarını kompleman aracılı soğuk antikor mekanizmasına bağlama.",
    "learningTarget": "Soğuk aglutinin hastalığını sıcak AIHA, G6PD hemolizi, TTP ve demir eksikliğinden ayıran DAT/hemoliz paternini öğretme.",
    "demographics": "67 yaşında kadın hasta",
    "setting": "Dahiliye hematoloji polikliniği",
    "chiefComplaint": "Kış aylarında artan halsizlik, parmaklarda morarma ve koyu renkli idrar nedeniyle başvuruyor.",
    "stem": "Hasta son iki aydır özellikle soğuk havada marketten döndükten sonra parmak uçlarının morarıp uyuştuğunu ve eve girip ısınınca rengin yavaşça düzeldiğini anlatır. Aynı dönemlerde belirgin halsizlik, eforla çabuk yorulma ve sabahları çay rengine yakın idrar fark etmiştir. Ateş, boğaz ağrısı veya yeni başlayan ilaç kullanımı tariflemez; bakla yeme öyküsü yoktur. Kanama, siyah dışkı veya aşırı adet kanaması öyküsü bulunmamaktadır. Daha önce sarılık atağı yaşamamış ancak kış aylarında şikâyetlerinin belirginleştiğini söyler. Ailesinde bilinen kalıtsal anemi yoktur.",
    "patientIntro": {
      "profile": "67 yaşında kadın hasta, Dahiliye hematoloji polikliniği ortamında değerlendiriliyor.",
      "presentation": "Kış aylarında artan halsizlik, parmaklarda morarma ve koyu renkli idrar nedeniyle başvuruyor.",
      "historySummary": "Hasta son iki aydır özellikle soğuk havada marketten döndükten sonra parmak uçlarının morarıp uyuştuğunu ve eve girip ısınınca rengin yavaşça düzeldiğini anlatır. Aynı dönemlerde belirgin halsizlik, eforla çabuk yorulma ve sabahları çay rengine yakın idrar fark etmiştir. Ateş, boğaz ağrısı veya yeni başlayan ilaç kullanımı tariflemez; bakla yeme öyküsü yoktur. Kanama, siyah dışkı veya aşırı adet kanaması öyküsü bulunmamaktadır. Daha önce sarılık atağı yaşamamış ancak kış aylarında şikâyetlerinin belirginleştiğini söyler. Ailesinde bilinen kalıtsal anemi yoktur."
    },
    "vitals": {
      "TA": "128/76 mmHg",
      "Nabız": "92/dk",
      "Solunum": "18/dk",
      "SpO2": "%98 oda havasında",
      "Ateş": "36.4 °C",
      "Şok indeksi": "0.72 - periferik perfüzyon sıcak ortamda iyi, parmak uçlarında hafif livedoid renk değişikliği"
    },
    "exam": [
      "Hasta soluk ve hafif ikterik görünüyor, bilinç açık.",
      "Parmak uçlarında soğukla artan morumsu renk değişikliği öyküyle uyumlu; aktif ülser yok.",
      "Dalak kot altında hafif palpabl.",
      "Lenf nodu belirgin büyümüş değil.",
      "Peteşi, purpura veya aktif mukozal kanama yok."
    ],
    "investigations": [
      {
        "id": "v307-new-728-hemogram",
        "label": "Hemogram ve retikülosit",
        "title": "Hemogram ve retikülosit",
        "orderLabel": "Hemogram ve retikülosit",
        "type": "lab",
        "priority": "essential",
        "subtype": "Hemogram",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Normomakrositer anemi ve retikülositoz vardır.",
        "clinicalMeaning": "Kemik iliğinin hemolize yanıt verdiğini destekler.",
        "result": {
          "title": "Hemogram ve retikülosit",
          "summary": "Normomakrositer anemi ve retikülositoz vardır.",
          "interpretation": "Normomakrositer anemi ve retikülositoz vardır.",
          "values": [
            [
              "Hemoglobin",
              "8.9 g/dL",
              "12-16 g/dL",
              "Düşük"
            ],
            [
              "MCV",
              "101 fL",
              "80-100 fL",
              "Hafif yüksek"
            ],
            [
              "Retikülosit",
              "%6.8",
              "%0.5-2.5",
              "Yüksek"
            ],
            [
              "Lökosit",
              "6.700/mm³",
              "4.000-10.000/mm³",
              "Normal"
            ],
            [
              "Trombosit",
              "244.000/mm³",
              "150.000-400.000/mm³",
              "Normal"
            ]
          ]
        }
      },
      {
        "id": "v307-new-728-hemoliz",
        "label": "Hemoliz belirteçleri",
        "title": "Hemoliz belirteçleri",
        "orderLabel": "Hemoliz belirteçleri",
        "type": "lab",
        "priority": "essential",
        "subtype": "Hemoliz paneli",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Aktif hemoliz paterni vardır.",
        "clinicalMeaning": "Aneminin kan kaybı veya üretim eksikliğinden çok eritrosit yıkımıyla ilişkili olduğunu gösterir.",
        "result": {
          "title": "Hemoliz belirteçleri",
          "summary": "Aktif hemoliz paterni vardır.",
          "interpretation": "Aktif hemoliz paterni vardır.",
          "values": [
            [
              "LDH",
              "720 U/L",
              "<250 U/L",
              "Yüksek"
            ],
            [
              "İndirekt bilirubin",
              "3.1 mg/dL",
              "<1.0 mg/dL",
              "Yüksek"
            ],
            [
              "Haptoglobin",
              "<10 mg/dL",
              "30-200 mg/dL",
              "Düşük"
            ],
            [
              "Direkt bilirubin",
              "0.4 mg/dL",
              "<0.3 mg/dL",
              "Hafif yüksek"
            ],
            [
              "Ferritin",
              "96 ng/mL",
              "15-150 ng/mL",
              "Normal"
            ]
          ]
        }
      },
      {
        "id": "v307-new-728-yayma",
        "label": "Periferik yayma ve örnek gözlemi",
        "title": "Periferik yayma ve örnek gözlemi",
        "orderLabel": "Periferik yayma ve örnek gözlemi",
        "type": "lab",
        "priority": "essential",
        "subtype": "Morfoloji",
        "category": "hematology",
        "testTypeCategory": "hematology",
        "summary": "Eritrosit aglütinasyonu izleniyor, şistosit baskınlığı yok.",
        "clinicalMeaning": "Soğuk antikor aracılı aglütinasyon paternini destekler; mikroanjiyopatiyi zayıflatır.",
        "result": {
          "title": "Periferik yayma ve örnek gözlemi",
          "summary": "Eritrosit aglütinasyonu izleniyor, şistosit baskınlığı yok.",
          "interpretation": "Eritrosit aglütinasyonu izleniyor, şistosit baskınlığı yok.",
          "narrative": "Oda ısısında bekleyen EDTA tüpünde eritrosit kümelenmeleri fark edilir. Isıtılmış preparatta kümelenme azalır. Yaymada belirgin eritrosit aglütinasyonu vardır; şistositler nadirdir ve baskın bulgu değildir."
        }
      },
      {
        "id": "v307-new-728-dat",
        "label": "Direkt antiglobulin testi",
        "title": "Direkt antiglobulin testi",
        "orderLabel": "Direkt antiglobulin testi",
        "type": "lab",
        "priority": "essential",
        "subtype": "İmmünohematoloji",
        "category": "hematology",
        "testTypeCategory": "hematology",
        "summary": "Monospesifik testte C3d pozitifliği belirgindir.",
        "clinicalMeaning": "Kompleman aracılı soğuk antikor hemolizini destekleyen temel serolojik bulgudur.",
        "result": {
          "title": "Direkt antiglobulin testi",
          "summary": "Monospesifik testte C3d pozitifliği belirgindir.",
          "interpretation": "Monospesifik testte C3d pozitifliği belirgindir.",
          "values": [
            [
              "Polispefisik DAT",
              "Pozitif",
              "Negatif",
              "Pozitif"
            ],
            [
              "Monospesifik DAT IgG",
              "Negatif",
              "Negatif",
              "Negatif"
            ],
            [
              "Monospesifik DAT C3d",
              "3+ pozitif",
              "Negatif",
              "Pozitif"
            ],
            [
              "Soğuk aglutinin titresi",
              "1:512",
              "<1:64",
              "Yüksek"
            ]
          ]
        }
      },
      {
        "id": "v307-new-728-bobrek",
        "label": "İdrar ve böbrek fonksiyonu",
        "title": "İdrar ve böbrek fonksiyonu",
        "orderLabel": "İdrar ve böbrek fonksiyonu",
        "type": "lab",
        "priority": "essential",
        "subtype": "İdrar analizi",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Hemoglobinüriyi destekleyen idrar bulgusu vardır, böbrek fonksiyonu korunmuş.",
        "clinicalMeaning": "İntravasküler hemoliz katkısını ve akut böbrek hasarı olmadığını gösterir.",
        "result": {
          "title": "İdrar ve böbrek fonksiyonu",
          "summary": "Hemoglobinüriyi destekleyen idrar bulgusu vardır, böbrek fonksiyonu korunmuş.",
          "interpretation": "Hemoglobinüriyi destekleyen idrar bulgusu vardır, böbrek fonksiyonu korunmuş.",
          "values": [
            [
              "İdrar dipstick heme",
              "3+",
              "Negatif",
              "Pozitif"
            ],
            [
              "Mikroskopik eritrosit",
              "0-2/HPF",
              "0-2/HPF",
              "Normal"
            ],
            [
              "Kreatinin",
              "0.88 mg/dL",
              "0.6-1.1 mg/dL",
              "Normal"
            ],
            [
              "Üre",
              "32 mg/dL",
              "17-43 mg/dL",
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
    "question": "Bu hastadaki tabloyu en iyi açıklayan tanısal/laboratuvar paterni aşağıdakilerden hangisidir?",
    "questionType": "Laboratuvar paterni / mekanizma",
    "answerTarget": "Soğukla tetiklenen hemolizde DAT ve aglütinasyon bulgularını doğru mekanizmaya bağlama.",
    "diagnosis": {
      "correct": "Monospesifik direkt antiglobulin testinde C3d pozitifliği ve soğuk aglutinin titresini değerlendirerek kompleman aracılı soğuk antikor hemolizini doğrulamak",
      "options": [
        "Sıcak tip IgG aracılı ekstravasküler hemoliz için doğrudan yüksek doz steroid başlamak",
        "G6PD eksikliğine bağlı oksidatif hemoliz kabul edip yalnız tetikleyici gıdalardan kaçınmasını önermek",
        "Mikroanjiyopatik hemoliz düşünerek ADAMTS13 beklemeden plazma değişimi başlamak",
        "Monospesifik direkt antiglobulin testinde C3d pozitifliği ve soğuk aglutinin titresini değerlendirerek kompleman aracılı soğuk antikor hemolizini doğrulamak",
        "Demir eksikliği anemisi kabul edip oral demir tedavisiyle retikülosit yanıtını izlemek"
      ],
      "question": "Bu hastadaki tabloyu en iyi açıklayan tanısal/laboratuvar paterni aşağıdakilerden hangisidir?",
      "explanation": "Soğuk maruziyetiyle artan akral morarma, aktif hemoliz belirteçleri, eritrosit aglütinasyonu, IgG negatif ama C3d pozitif DAT ve yüksek soğuk aglutinin titresi birlikte kompleman aracılı soğuk antikor hemolizini destekler. Trombositlerin normal olması ve şistosit baskınlığının olmaması mikroanjiyopatiyi zayıflatır.",
      "pearls": [
        "Soğukla artan akral morarma aglütinasyon belirtisidir.",
        "LDH/indirekt bilirubin yüksek, haptoglobin düşük → hemoliz.",
        "DAT C3d pozitifliği kompleman aracılı süreci destekler.",
        "Trombosit normal ve şistosit baskın değilse TTP daha zayıftır."
      ],
      "optionFeedback": {
        "Sıcak tip IgG aracılı ekstravasküler hemoliz için doğrudan yüksek doz steroid başlamak": "Sıcak tip otoimmün hemolitik anemide genellikle IgG aracılı eritrosit opsonizasyonu vardır ve direkt antiglobulin testinde IgG pozitifliği beklenir; steroid tedavisi ilk basamak olabilir. Bu vakada semptomların soğukla belirginleşmesi, akral morarma, örnek tüpünde aglütinasyon ve C3d baskın pozitiflik soğuk antikor paternine daha uygundur. Steroidler soğuk aglutinin hastalığında sıcak AIHA kadar etkili değildir; doğru serolojik ayrım yapılmadan refleks steroid seçimi eksik olur.",
        "G6PD eksikliğine bağlı oksidatif hemoliz kabul edip yalnız tetikleyici gıdalardan kaçınmasını önermek": "G6PD eksikliğinde oksidan ilaç, bakla veya enfeksiyon sonrası intravasküler hemoliz görülebilir; yaymada bite cell/Heinz cisimciği gibi bulgular beklenebilir. Bu hastada hemoliz soğuk maruziyetiyle tetikleniyor ve parmaklarda morarma/aglütinasyon bulgusu var. C3d pozitif direkt antiglobulin ve yüksek soğuk aglutinin titresi G6PD eksikliğinden çok kompleman aracılı otoimmün hemolizi destekler.",
        "Mikroanjiyopatik hemoliz düşünerek ADAMTS13 beklemeden plazma değişimi başlamak": "TTP veya diğer mikroanjiyopatik hemolitik anemilerde trombositopeni, şistosit, nörolojik bulgu ve böbrek etkilenimi ön plandadır; acil plazma değişimi hayat kurtarıcı olabilir. Bu vakada trombosit sayısı normal, şistosit baskınlığı yok ve soğukla ilişkili akral bulgular var. Bu nedenle mikroanjiyopati algoritmasını işletmek hem gereksiz hem de temel immün-hemolitik mekanizmayı kaçırıcı olur.",
        "Monospesifik direkt antiglobulin testinde C3d pozitifliği ve soğuk aglutinin titresini değerlendirerek kompleman aracılı soğuk antikor hemolizini doğrulamak": "Bu seçenek en uygundur. Soğukta parmak morarması, koyu idrar, hemoliz laboratuvarı, eritrosit aglütinasyonu ve direkt antiglobulin testinde C3d pozitifliği soğuk antikor aracılı kompleman aktivasyonunu destekler. IgM soğukta eritrositlere bağlanıp komplemanı aktive eder; IgM ısınınca ayrılabilir ama C3d eritrosit yüzeyinde kalır, bu yüzden monospesifik DAT çoğunlukla C3d pozitif olur. Soğuk aglutinin titresinin gösterilmesi ve örneklerin sıcak taşınması doğru tanısal yorum için önemlidir.",
        "Demir eksikliği anemisi kabul edip oral demir tedavisiyle retikülosit yanıtını izlemek": "Demir eksikliği mikrositer anemi, düşük ferritin ve düşük transferrin satürasyonu ile beklenir; sarılık, LDH yüksekliği, düşük haptoglobin ve retikülositoz beklenen ana patern değildir. Bu hastada hemoliz belirteçleri aktif yıkımı gösteriyor. Oral demir tedavisi hemolizin mekanizmasını düzeltmez ve soğukla tetiklenen akral aglütinasyon bulgusunu açıklamaz."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "Soğuk aglutinin hastalığında IgM soğukta eritrositlere bağlanır ve klasik kompleman yolunu aktive eder. IgM ayrıldıktan sonra eritrosit üzerinde C3d kalabildiği için monospesifik DAT tipik olarak C3d pozitiftir.",
    "examPearl": "TUS ipucu: soğukta akrosiyanoz + hemoliz + eritrosit aglütinasyonu + DAT C3d pozitif/IgG negatif = soğuk aglutinin hastalığı paternidir.",
    "whyCorrect": "Doğru seçenek, soğukla tetiklenen klinik bulguyu ve hemoliz laboratuvarını tek bir kompleman-IgM mekanizmasıyla açıklar.",
    "optionComparison": "Yanlış seçenekler sıcak AIHA, G6PD eksikliği, TTP veya demir eksikliği gibi hemoliz/anemi nedenlerini temsil eder; ancak vakadaki soğuk ilişkisi ve C3d pozitifliği bu seçenekleri geri plana iter.",
    "evidenceChain": [
      "Soğukta parmak morarması → eritrosit aglütinasyonu/akral dolaşım etkisi.",
      "LDH 720 + indirekt bilirubin 3.1 + haptoglobin <10 → aktif hemoliz.",
      "Retikülosit %6.8 → kemik iliği yanıtı.",
      "DAT C3d 3+ ve IgG negatif → kompleman baskın seroloji.",
      "Trombosit normal + şistosit baskın değil → TTP/mikroanjiyopati zayıf."
    ],
    "whyWrong": "Yanlış seçenekler hemolizi farklı mekanizmalarla açıklar; bu olguda ayırıcı anahtar soğukla tetiklenen aglütinasyon ve C3d pozitif direkt antiglobulin testidir.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v307",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V306 render-safe internal-medicine cases with investigations and diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  },
{
  "id": "v308-new-729-atesli-oksuruk-sonrasi-yan-agrisi-ve-plevral-sivi",
  "branchId": "internal-medicine",
  "caseType": "standard",
  "relatedBranch": "İç Hastalıkları",
  "title": "Ateşli öksürük sonrası yan ağrısı ve plevral sıvı",
  "difficulty": "Zor",
  "difficultyTag": "TUS düzeyi",
  "clinicalFocus": "Pnömoni zemininde gelişen plevral sıvıda pH, glukoz, LDH ve lokülasyon bulgularını kullanarak komplike enfeksiyöz efüzyonda drenaj kararını verme.",
  "learningTarget": "Basit parapnömonik efüzyon ile drenaj gerektiren komplike plevral enfeksiyon/empiem ayrımını plevral sıvı verileri üzerinden öğretme.",
  "demographics": "59 yaşında erkek hasta",
  "setting": "Acil servis ve göğüs hastalıkları konsültasyonu",
  "chiefComplaint": "Üç gündür artan ateş, balgamlı öksürük ve sağ yan ağrısı nedeniyle başvuruyor.",
  "stem": "Hasta bir haftadır devam eden öksürüğünün son üç günde koyu sarı balgamla arttığını ve sağ göğüs yan tarafında nefes almakla keskinleşen ağrı başladığını anlatır. Evde parasetamol almasına rağmen ateşi düşmemiş, gece terlemesi ve iştahsızlık eklenmiştir. Son gün merdiven çıkarken belirgin nefes darlığı hissetmiş ve ağrı nedeniyle derin nefes alamadığını söylemiştir. Yakın zamanda uzun yolculuk, bacak şişliği veya hemoptizi tariflemez. Bilinen kalp yetmezliği yoktur; sigara öyküsü 35 paket-yıldır. Daha önce benzer plevral sıvı nedeniyle işlem yapılmamıştır.",
  "patientIntro": {
    "profile": "59 yaşında erkek hasta, acil servis ve göğüs hastalıkları konsültasyonu ortamında değerlendiriliyor.",
    "presentation": "Üç gündür artan ateş, balgamlı öksürük ve sağ yan ağrısı nedeniyle başvuruyor.",
    "historySummary": "Hasta bir haftadır devam eden öksürüğünün son üç günde koyu sarı balgamla arttığını ve sağ göğüs yan tarafında nefes almakla keskinleşen ağrı başladığını anlatır. Evde parasetamol almasına rağmen ateşi düşmemiş, gece terlemesi ve iştahsızlık eklenmiştir. Son gün merdiven çıkarken belirgin nefes darlığı hissetmiş ve ağrı nedeniyle derin nefes alamadığını söylemiştir. Yakın zamanda uzun yolculuk, bacak şişliği veya hemoptizi tariflemez. Bilinen kalp yetmezliği yoktur; sigara öyküsü 35 paket-yıldır. Daha önce benzer plevral sıvı nedeniyle işlem yapılmamıştır."
  },
  "vitals": {
    "TA": "104/66 mmHg",
    "Nabız": "112/dk",
    "Solunum": "26/dk",
    "SpO2": "%91 oda havasında",
    "Ateş": "38.7 °C",
    "Şok indeksi": "1.07 - ekstremiteler ılık, kapiller dolum yaklaşık 3 saniye"
  },
  "exam": [
    "Genel durumu orta-kötü, konuşurken cümleleri kısa kesiyor.",
    "Sağ alt hemitoraksta solunum sesleri azalmış, perküsyonda matite mevcut.",
    "Sağ bazalde inspiratuvar ral ve plevral sürtünme sesi duyuluyor.",
    "Juguler venöz dolgunluk ve belirgin periferik ödem yok.",
    "Bacaklarda tek taraflı şişlik, hassasiyet veya belirgin asimetri saptanmıyor."
  ],
  "investigations": [
    {
      "id": "v308-new-729-hemogram-crp",
      "label": "Hemogram ve inflamasyon belirteçleri",
      "title": "Hemogram ve inflamasyon belirteçleri",
      "orderLabel": "Hemogram ve inflamasyon belirteçleri",
      "type": "lab",
      "priority": "essential",
      "subtype": "Hemogram/CRP",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Nötrofilik lökositoz ve yüksek inflamasyon belirteçleri vardır.",
      "clinicalMeaning": "Bakteriyel alt solunum yolu enfeksiyonu ve plevral inflamasyon zeminini destekler.",
      "result": {
        "title": "Hemogram ve inflamasyon belirteçleri",
        "summary": "Nötrofilik lökositoz ve yüksek inflamasyon belirteçleri vardır.",
        "interpretation": "Nötrofilik lökositoz ve yüksek inflamasyon belirteçleri vardır.",
        "values": [
          [
            "Lökosit",
            "18.600/mm³",
            "4.000-10.000/mm³",
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
            "Yüksek"
          ],
          [
            "Prokalsitonin",
            "3.1 ng/mL",
            "<0.1 ng/mL",
            "Yüksek"
          ]
        ]
      }
    },
    {
      "id": "v308-new-729-kan-gazi",
      "label": "Arter kan gazı",
      "title": "Arter kan gazı",
      "orderLabel": "Arter kan gazı",
      "type": "lab",
      "priority": "essential",
      "subtype": "Kan gazı",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Hipoksemi ve hafif laktat yüksekliği vardır.",
      "clinicalMeaning": "Solunum rezervinin azaldığını ve sistemik etkilenim başladığını gösterir.",
      "result": {
        "title": "Arter kan gazı",
        "summary": "Hipoksemi ve hafif laktat yüksekliği vardır.",
        "interpretation": "Hipoksemi ve hafif laktat yüksekliği vardır.",
        "values": [
          [
            "pH",
            "7.43",
            "7.35-7.45",
            "Normal"
          ],
          [
            "PaO₂",
            "62 mmHg",
            "80-100 mmHg",
            "Düşük"
          ],
          [
            "PaCO₂",
            "34 mmHg",
            "35-45 mmHg",
            "Hafif düşük"
          ],
          [
            "Laktat",
            "2.4 mmol/L",
            "0.5-2.0 mmol/L",
            "Hafif yüksek"
          ]
        ]
      }
    },
    {
      "id": "v308-new-729-goruntuleme",
      "label": "Akciğer grafisi ve toraks ultrasonu",
      "title": "Akciğer grafisi ve toraks ultrasonu",
      "orderLabel": "Akciğer grafisi ve toraks ultrasonu",
      "type": "imaging",
      "priority": "essential",
      "subtype": "Grafi/USG",
      "category": "imaging",
      "testTypeCategory": "imaging",
      "summary": "Sağ alt lob konsolidasyonu ve septalı plevral sıvı izlenir.",
      "clinicalMeaning": "Parankim enfeksiyonuna eşlik eden organize plevral koleksiyonu düşündürür.",
      "result": {
        "title": "Akciğer grafisi ve toraks ultrasonu",
        "summary": "Sağ alt lob konsolidasyonu ve septalı plevral sıvı izlenir.",
        "interpretation": "Sağ alt lob konsolidasyonu ve septalı plevral sıvı izlenir.",
        "values": [
          [
            "Akciğer grafisi",
            "Sağ alt zonda konsolidasyon ve kostofrenik sinüste küntleşme",
            "Normal grafi",
            "Anormal"
          ],
          [
            "Toraks USG",
            "Sağ bazalde yaklaşık 4 cm derinlikte septalı/loküle plevral sıvı",
            "Serbest sıvı yok",
            "Anormal"
          ]
        ]
      }
    },
    {
      "id": "v308-new-729-plevra",
      "label": "Tanısal torasentez",
      "title": "Tanısal torasentez",
      "orderLabel": "Tanısal torasentez",
      "type": "lab",
      "priority": "essential",
      "subtype": "Plevral sıvı analizi",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Nötrofilik, düşük pH ve düşük glukozlu eksüdatif plevral sıvı vardır.",
      "clinicalMeaning": "Antibiyotikle birlikte kapalı drenaj gerektiren komplike plevral enfeksiyon paternini destekler.",
      "result": {
        "title": "Tanısal torasentez",
        "summary": "Nötrofilik, düşük pH ve düşük glukozlu eksüdatif plevral sıvı vardır.",
        "interpretation": "Düşük pH, düşük glukoz ve çok yüksek LDH drenaj gerektiren plevral enfeksiyon lehinedir.",
        "values": [
          [
            "Görünüm",
            "Bulanık sarı sıvı",
            "Berrak",
            "Anormal"
          ],
          [
            "pH",
            "7.08",
            ">7.20",
            "Düşük"
          ],
          [
            "Glukoz",
            "28 mg/dL",
            ">60 mg/dL",
            "Düşük"
          ],
          [
            "LDH",
            "1860 U/L",
            "Serum üst sınırına göre değerlendirilir",
            "Çok yüksek"
          ],
          [
            "Hücre sayısı",
            "12.800/mm³, %92 nötrofil",
            "Düşük hücreli",
            "Yüksek"
          ],
          [
            "Gram boyama",
            "Gram pozitif koklar görülüyor",
            "Mikroorganizma yok",
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
  "question": "Bu hastada plevral sıvı ve görüntüleme bulgularına göre en uygun yönetim aşağıdakilerden hangisidir?",
  "questionType": "Tedavi / acil yaklaşım",
  "answerTarget": "Komplike enfeksiyöz plevral efüzyonda antibiyotik ve drenaj kararını belirleme.",
  "diagnosis": {
    "correct": "Ampirik intravenöz antibiyotik başlamak ve plevral boşluğa tüp drenaj uygulamak",
    "options": [
      "Ayaktan oral antibiyotik verip plevral sıvının kendiliğinden gerilemesini beklemek",
      "Ampirik intravenöz antibiyotik başlamak ve plevral boşluğa tüp drenaj uygulamak",
      "Tek seferlik terapötik torasentez yapıp kültür sonucuna kadar ek işlem planlamamak",
      "Transüdatif sıvı kabul edip yalnız intravenöz diüretik ve tuz kısıtlaması uygulamak",
      "Viral plörit düşünerek antibiyotiksiz NSAİİ ve kısa süreli steroid vermek"
    ],
    "question": "Bu hastada plevral sıvı ve görüntüleme bulgularına göre en uygun yönetim aşağıdakilerden hangisidir?",
    "explanation": "Pnömoni kliniğine eşlik eden loküle plevral sıvı, plevral pH 7.08, glukoz 28 mg/dL, LDH yüksekliği ve Gram boyamada bakteri görülmesi drenaj gerektiren komplike enfeksiyöz plevral efüzyon paternidir. Bu durumda antibiyotik tek başına yeterli kabul edilmez; plevral boşluğun tüp drenajla boşaltılması gerekir.",
    "pearls": [
      "Plevral enfeksiyonda pH <7.20 güçlü drenaj göstergesidir.",
      "Düşük glukoz ve çok yüksek LDH plevral boşlukta yoğun inflamasyonu destekler.",
      "Lokülasyon varsa sadece antibiyotik veya tek ponksiyon genellikle yetersiz kalır.",
      "Kalp yetmezliği transüdasında pH/glukoz bu kadar bozulmaz ve nötrofilik pürülan görünüm beklenmez."
    ],
    "optionFeedback": {
      "Ayaktan oral antibiyotik verip plevral sıvının kendiliğinden gerilemesini beklemek": "Basit parapnömonik efüzyon küçük, serbest akışlı, pH ve glukozu korunmuş olduğunda yalnız antibiyotikle izlenebilir. Bu hastada ise hipoksemi, lokülasyon, plevral pH 7.08, glukoz 28 mg/dL, LDH 1860 U/L ve Gram pozitif kok görülmesi enfeksiyonun plevral boşlukta organize olduğunu gösterir. Ayaktan oral tedavi hem klinik ağırlığa hem de sıvı biyokimyasına göre yetersizdir; gecikme fibropürülan fazın ilerlemesine ve cerrahi gereksinime neden olabilir.",
      "Ampirik intravenöz antibiyotik başlamak ve plevral boşluğa tüp drenaj uygulamak": "Bu seçenek en uygundur. Hastada pnömoniye eşlik eden plevral enfeksiyon bulguları vardır ve plevral sıvının pH değerinin 7.20'nin altında olması, düşük glukoz, yüksek LDH, lokülasyon ve bakteri görülmesi sıvının yalnız sistemik antibiyotikle temizlenemeyeceğini gösterir. Tedavinin iki ayağı vardır: akciğer/plevra enfeksiyonunu kapsayan intravenöz antibiyotik ve plevral boşluğun kapalı tüp drenajla boşaltılması. Drenajdan sonra yetersiz yanıt olursa intraplevral tedaviler veya cerrahi değerlendirme gündeme gelebilir; ancak ilk doğru adım antibiyotik + drenaj kombinasyonudur.",
      "Tek seferlik terapötik torasentez yapıp kültür sonucuna kadar ek işlem planlamamak": "Tek seferlik torasentez tanı ve semptom rahatlatma için yararlı olabilir; fakat loküle, düşük pH'lı, düşük glukozlu ve yoğun nötrofilli enfeksiyöz sıvıda kalıcı kaynak kontrolü sağlamaz. Kültür sonucu beklemek tedaviyi geciktirir, çünkü Gram boyama ve biyokimya zaten plevral enfeksiyonun komplike olduğunu göstermektedir. Bu yaklaşım ancak basit, serbest ve biyokimyasal olarak komplike olmayan efüzyonlarda daha kabul edilebilir olurdu.",
      "Transüdatif sıvı kabul edip yalnız intravenöz diüretik ve tuz kısıtlaması uygulamak": "Kalp yetmezliği veya siroz gibi transüdatif efüzyonlarda protein/LDH düşük olur, plevral sıvı pürülan görünmez, pH ve glukoz genellikle bu düzeyde bozulmaz. Bu vakada ateş, nötrofilik lökositoz, konsolidasyon, lokülasyon ve Gram boyama pozitifliği enfeksiyöz eksüdatif süreci destekler. Diüretik tedavi plevral boşluktaki enfeksiyon yükünü boşaltmaz ve kaynak kontrolünü geciktirir.",
      "Viral plörit düşünerek antibiyotiksiz NSAİİ ve kısa süreli steroid vermek": "Viral plöritte plevral ağrı olabilir; ancak yüksek ateş, pürülan balgam, belirgin CRP/prokalsitonin yüksekliği, konsolidasyon ve plevral sıvıda düşük pH-glukoz paternini açıklamaz. Steroid enfeksiyonun kontrolsüz olduğu bir plevral boşlukta tabloyu maskeleyebilir ve kötüleştirebilir. Bu seçenek yalnız hafif, bakteriyel enfeksiyon verisi olmayan inflamatuvar plörit tablolarında düşünülebilirdi; bu vaka için güvenli değildir."
    }
  },
  "shuffleOptions": false,
  "coreKnowledge": "Parapnömonik efüzyonda plevral sıvı pH <7.20, düşük glukoz, çok yüksek LDH, bakteri görülmesi veya lokülasyon drenaj gereksinimini destekler. Kaynak kontrolü sağlanmadan antibiyotik tek başına yeterli olmayabilir.",
  "examPearl": "TUS ipucu: pnömoni + loküle plevral sıvı + pH <7.20/glukoz düşük = komplike parapnömonik efüzyon; antibiyotik + tüp drenaj düşün.",
  "whyCorrect": "Doğru seçenek, hem enfeksiyonu sistemik olarak tedavi eder hem de düşük pH-lokülasyonla gösterilen plevral kaynak kontrolünü sağlar.",
  "optionComparison": "Yanlış seçenekler basit efüzyon, transüda veya viral plörit gibi daha hafif/başka mekanizmaları temsil eder; ancak plevral pH, glukoz, LDH, lokülasyon ve Gram boyama bu olguda drenaj gerekliliğini öne çıkarır.",
  "evidenceChain": [
    "Ateş + pürülan balgam + konsolidasyon → bakteriyel alt solunum yolu enfeksiyonu zemini.",
    "USG'de loküle sıvı → serbest basit efüzyondan daha komplike koleksiyon.",
    "Plevral pH 7.08 ve glukoz 28 → plevral boşlukta yoğun metabolik/inflamatuvar aktivite.",
    "LDH 1860 + nötrofil %92 → eksüdatif pürülan süreç.",
    "Gram pozitif kok görülmesi → kültür beklenmeden antibiyotik ve drenaj gerekliliği."
  ],
  "whyWrong": "Yanlış seçenekler plevral sıvının biyokimyasal ve mikrobiyolojik ağırlığını göz ardı eder; bu vakada ana karar noktası pH düşüklüğü, glukoz düşüklüğü ve lokülasyondur.",
  "preserveInvestigationOrder": true,
  "aiMeta": {
    "version": "v308",
    "source": "manual-render-safe-internal-medicine-expansion",
    "antiRepeatChecked": true,
    "schemaReference": "V307 cases.js rawCases schema with diagnosis.optionFeedback object mapping"
  },
  "findings": [],
  "images": []
},
{
  "id": "v308-new-730-ilac-sonrasi-dokuntu-ve-kreatinin-yukselmesi",
  "branchId": "internal-medicine",
  "caseType": "standard",
  "relatedBranch": "İç Hastalıkları",
  "title": "İlaç sonrası döküntü ve kreatinin yükselmesi",
  "difficulty": "Zor",
  "difficultyTag": "TUS düzeyi",
  "clinicalFocus": "Yeni ilaç kullanımı sonrası gelişen ateş-döküntü-eozinofili ile steril piyüri ve lökosit silendirlerini birleştirerek akut tübülointerstisyel hasarı ayırt etme.",
  "learningTarget": "İlaç ilişkili akut interstisyel nefriti prerenal azotemi, postrenal obstrüksiyon, ATN ve hızlı ilerleyen glomerülonefritten ayırma.",
  "demographics": "52 yaşında kadın hasta",
  "setting": "Dahiliye nefroloji konsültasyonu",
  "chiefComplaint": "Halsizlik, yaygın kaşıntılı döküntü ve kreatinin yüksekliği nedeniyle değerlendiriliyor.",
  "stem": "Hasta iki hafta önce sinüzit nedeniyle başladığı antibiyotiği tamamladıktan birkaç gün sonra gövdesinde kaşıntılı döküntü ve kırgınlık hissettiğini anlatır. Son günlerde idrar miktarının azaldığını değil, daha çok sık idrara çıktığını ve idrarda hafif yanma olduğunu söylemektedir. Belirgin kusma, ishal veya yoğun sıvı kaybı tariflemez. Taş düşürme öyküsü, makroskopik kanlı idrar veya pıhtılı idrar fark etmemiştir. Düzenli NSAİİ kullanmaz; ancak son enfeksiyon sırasında reçete edilen ilacı kendi ifadesiyle aksatmadan kullanmıştır. Daha önce böbrek hastalığı bilinmemektedir.",
  "patientIntro": {
    "profile": "52 yaşında kadın hasta, dahiliye nefroloji konsültasyonu ortamında değerlendiriliyor.",
    "presentation": "Halsizlik, yaygın kaşıntılı döküntü ve kreatinin yüksekliği nedeniyle değerlendiriliyor.",
    "historySummary": "Hasta iki hafta önce sinüzit nedeniyle başladığı antibiyotiği tamamladıktan birkaç gün sonra gövdesinde kaşıntılı döküntü ve kırgınlık hissettiğini anlatır. Son günlerde idrar miktarının azaldığını değil, daha çok sık idrara çıktığını ve idrarda hafif yanma olduğunu söylemektedir. Belirgin kusma, ishal veya yoğun sıvı kaybı tariflemez. Taş düşürme öyküsü, makroskopik kanlı idrar veya pıhtılı idrar fark etmemiştir. Düzenli NSAİİ kullanmaz; ancak son enfeksiyon sırasında reçete edilen ilacı kendi ifadesiyle aksatmadan kullanmıştır. Daha önce böbrek hastalığı bilinmemektedir."
  },
  "vitals": {
    "TA": "126/78 mmHg",
    "Nabız": "96/dk",
    "Solunum": "18/dk",
    "SpO2": "%98 oda havasında",
    "Ateş": "37.9 °C",
    "Şok indeksi": "0.76 - perfüzyon iyi, mukozalar hafif kuru değil"
  },
  "exam": [
    "Gövde ve üst ekstremitelerde makülopapüler, basmakla solan döküntü mevcut.",
    "Kostovertebral açı hassasiyeti belirgin değil.",
    "Pretibial ödem yok, akciğer sesleri doğal.",
    "Artrit oluşturan belirgin eklem şişliği yok; hafif yaygın miyalji tarifliyor.",
    "Üreter taşı düşündürecek kolik tarzda ağrı gözlenmiyor."
  ],
  "investigations": [
    {
      "id": "v308-new-730-bobrek",
      "label": "Böbrek fonksiyonları ve elektrolitler",
      "title": "Böbrek fonksiyonları ve elektrolitler",
      "orderLabel": "Böbrek fonksiyonları ve elektrolitler",
      "type": "lab",
      "priority": "essential",
      "subtype": "Biyokimya",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Kreatinin bazale göre belirgin yükselmiştir.",
      "clinicalMeaning": "Akut böbrek hasarı vardır; klinik bağlam intrensek renal hasarı düşündürür.",
      "result": {
        "title": "Böbrek fonksiyonları ve elektrolitler",
        "summary": "Kreatinin bazale göre belirgin yükselmiştir.",
        "interpretation": "Akut böbrek hasarı vardır.",
        "values": [
          [
            "Kreatinin",
            "2.6 mg/dL",
            "0.6-1.1 mg/dL",
            "Yüksek"
          ],
          [
            "Önceki kreatinin",
            "0.8 mg/dL",
            "0.6-1.1 mg/dL",
            "Bazal normal"
          ],
          [
            "Üre",
            "58 mg/dL",
            "10-45 mg/dL",
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
            "22-26 mmol/L",
            "Hafif düşük"
          ]
        ]
      }
    },
    {
      "id": "v308-new-730-hemogram",
      "label": "Hemogram ve eozinofil",
      "title": "Hemogram ve eozinofil",
      "orderLabel": "Hemogram ve eozinofil",
      "type": "lab",
      "priority": "important",
      "subtype": "Hemogram",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Hafif lökositoz ve eozinofili vardır.",
      "clinicalMeaning": "İlaç ilişkili immün reaksiyon olasılığını güçlendirir.",
      "result": {
        "title": "Hemogram ve eozinofil",
        "summary": "Hafif lökositoz ve eozinofili vardır.",
        "interpretation": "Eozinofili ilaç ilişkili interstisyel reaksiyonu destekleyebilir.",
        "values": [
          [
            "Lökosit",
            "11.800/mm³",
            "4.000-10.000/mm³",
            "Hafif yüksek"
          ],
          [
            "Eozinofil",
            "%10",
            "%0-5",
            "Yüksek"
          ],
          [
            "Hemoglobin",
            "12.6 g/dL",
            "12-16 g/dL",
            "Normal"
          ],
          [
            "Trombosit",
            "286.000/mm³",
            "150.000-400.000/mm³",
            "Normal"
          ]
        ]
      }
    },
    {
      "id": "v308-new-730-idrar",
      "label": "Tam idrar tetkiki ve sediment",
      "title": "Tam idrar tetkiki ve sediment",
      "orderLabel": "Tam idrar tetkiki ve sediment",
      "type": "lab",
      "priority": "essential",
      "subtype": "İdrar analizi",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Steril piyüri, lökosit silendirleri ve hafif proteinüri vardır.",
      "clinicalMeaning": "Tubulointerstisyel inflamasyon lehine idrar paternidir.",
      "result": {
        "title": "Tam idrar tetkiki ve sediment",
        "summary": "Steril piyüri, lökosit silendirleri ve hafif proteinüri vardır.",
        "interpretation": "Aktif glomerüler sediment olmadan lökosit ağırlıklı tubulointerstisyel patern vardır.",
        "values": [
          [
            "Lökosit",
            "35-40/HPF",
            "0-5/HPF",
            "Yüksek"
          ],
          [
            "Lökosit silendiri",
            "Pozitif",
            "Negatif",
            "Anormal"
          ],
          [
            "Eritrosit",
            "2-3/HPF",
            "0-3/HPF",
            "Normal-sınır"
          ],
          [
            "Protein",
            "1+",
            "Negatif",
            "Hafif"
          ],
          [
            "Nitrit",
            "Negatif",
            "Negatif",
            "Negatif"
          ],
          [
            "İdrar kültürü",
            "Üreme yok",
            "Üreme yok",
            "Steril"
          ]
        ]
      }
    },
    {
      "id": "v308-new-730-usg",
      "label": "Üriner sistem ultrasonu",
      "title": "Üriner sistem ultrasonu",
      "orderLabel": "Üriner sistem ultrasonu",
      "type": "imaging",
      "priority": "important",
      "subtype": "USG",
      "category": "imaging",
      "testTypeCategory": "imaging",
      "summary": "Hidronefroz veya obstrüksiyon bulgusu yoktur.",
      "clinicalMeaning": "Postrenal nedenleri geri plana iter.",
      "result": {
        "title": "Üriner sistem ultrasonu",
        "summary": "Hidronefroz veya obstrüksiyon bulgusu yoktur.",
        "interpretation": "Postrenal obstrüksiyon lehine bulgu saptanmaz.",
        "values": [
          [
            "Sağ böbrek",
            "Boyut normal, hidronefroz yok",
            "Hidronefroz yok",
            "Normal"
          ],
          [
            "Sol böbrek",
            "Boyut normal, hidronefroz yok",
            "Hidronefroz yok",
            "Normal"
          ],
          [
            "Mesane",
            "Belirgin rezidü veya taş görünümü yok",
            "Normal",
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
  "question": "Bu hastadaki böbrek hasarını en iyi açıklayan laboratuvar/mekanizma paterni aşağıdakilerden hangisidir?",
  "questionType": "Laboratuvar paterni / mekanizma",
  "answerTarget": "Yeni ilaç kullanımı sonrası akut interstisyel nefrit paternini ayırt etme.",
  "diagnosis": {
    "correct": "İlaç ilişkili akut interstisyel nefrit: eozinofili, steril piyüri, lökosit silendiri ve hafif proteinüri ile seyreden tubulointerstisyel inflamasyon",
    "options": [
      "Prerenal azotemi: yoğun sıvı kaybı sonrası düşük idrar sodyumu ve tamamen normal idrar sedimenti",
      "Postrenal obstrüksiyon: bilateral hidronefroz ve yüksek rezidü idrarla seyreden akım engeli",
      "İskemik akut tübüler nekroz: hipotansiyon sonrası çamurumsu kahverengi granüler silendirlerle seyreden tübül hasarı",
      "İlaç ilişkili akut interstisyel nefrit: eozinofili, steril piyüri, lökosit silendiri ve hafif proteinüri ile seyreden tubulointerstisyel inflamasyon",
      "Hızlı ilerleyen glomerülonefrit: makroskopik hematüri, eritrosit silendiri ve belirgin proteinüriyle seyreden glomerüler nekroz"
    ],
    "question": "Bu hastadaki böbrek hasarını en iyi açıklayan laboratuvar/mekanizma paterni aşağıdakilerden hangisidir?",
    "explanation": "Yeni antibiyotik maruziyeti sonrası ateş, döküntü, eozinofili, akut kreatinin yükselişi, steril piyüri ve lökosit silendirleri ilaç ilişkili akut interstisyel nefrit paternini destekler. Aktif eritrosit silendirlerinin olmaması glomerülonefriti, hidronefroz olmaması postrenal obstrüksiyonu ve hipotansiyon/çamurumsu silendir yokluğu ATN'yi geri plana iter.",
    "pearls": [
      "AIN triadı her zaman tam olmayabilir; ateş-döküntü-eozinofili varsa ipucu güçlenir.",
      "Steril piyüri ve lökosit silendirleri tubulointerstisyel inflamasyonu destekler.",
      "En kritik ilk adım şüpheli ilacın kesilmesidir.",
      "Eritrosit silendiri glomerüler hasarı daha güçlü düşündürür."
    ],
    "optionFeedback": {
      "Prerenal azotemi: yoğun sıvı kaybı sonrası düşük idrar sodyumu ve tamamen normal idrar sedimenti": "Prerenal azotemide belirgin kusma, ishal, kanama, aşırı diürez veya düşük efektif dolaşım gibi perfüzyon azaltıcı bir öykü beklenir; idrar sedimenti genellikle bland olur ve lökosit silendiri beklenmez. Bu hastada döküntü, eozinofili, steril piyüri ve lökosit silendirleri intrensek tubulointerstisyel inflamasyonu destekler. Hafif yanma semptomu kültür negatifliğiyle enfeksiyöz sistitten çok interstisyel renal reaksiyonun idrar bulgusuna uyar.",
      "Postrenal obstrüksiyon: bilateral hidronefroz ve yüksek rezidü idrarla seyreden akım engeli": "Postrenal akut böbrek hasarında prostat obstrüksiyonu, taş, tümör basısı veya nörojen mesane gibi idrar akımını engelleyen durumlar aranır; ultrasonografide hidronefroz veya mesane rezidüsü beklenebilir. Bu vakada üriner sistem ultrasonu normaldir ve kolik ağrı/taş düşürme öyküsü yoktur. Döküntü-eozinofili-lökosit silendiri kombinasyonu akım engelinden çok immün tubulointerstisyel hasarı destekler.",
      "İskemik akut tübüler nekroz: hipotansiyon sonrası çamurumsu kahverengi granüler silendirlerle seyreden tübül hasarı": "Akut tübüler nekroz genellikle uzun süren hipotansiyon, sepsis, nefrotoksin veya ciddi iskemi sonrası gelişir; idrar sedimentinde çamurumsu kahverengi granüler silendirler klasik ipucudur. Bu hastada belirgin hipotansiyon veya şok öyküsü yoktur, sedimenti lökosit ağırlıklıdır ve sistemik alerjik özellikler ön plandadır. ATN kreatinin artışını açıklayabilir ama döküntü, eozinofili ve steril piyüri birlikteliğini AIN kadar iyi açıklamaz.",
      "İlaç ilişkili akut interstisyel nefrit: eozinofili, steril piyüri, lökosit silendiri ve hafif proteinüri ile seyreden tubulointerstisyel inflamasyon": "Bu seçenek en uygundur. Antibiyotik veya bazı NSAİİ/PPI maruziyetinden günler-haftalar sonra gelişen ateş, makülopapüler döküntü, eozinofili ve akut kreatinin yükselmesi ilaç ilişkili akut interstisyel nefrit için tipiktir. İdrarda steril piyüri, lökosit silendiri ve hafif proteinüri tubulointerstisyel inflamasyonu destekler; glomerüler hastalıklardaki yoğun hematüri/eritrosit silendiri veya ATN'deki çamurumsu silendir paterninden ayrılır. İlk yönetim şüpheli ilacın kesilmesi, böbrek fonksiyonlarının izlenmesi ve düzelmeyen/şiddetli olgularda nefrolojiyle biyopsi-steroid kararının değerlendirilmesidir.",
      "Hızlı ilerleyen glomerülonefrit: makroskopik hematüri, eritrosit silendiri ve belirgin proteinüriyle seyreden glomerüler nekroz": "Hızlı ilerleyen glomerülonefritte aktif glomerüler sediment, dismorfik eritrositler, eritrosit silendirleri ve sıklıkla belirgin proteinüri beklenir; sistemik vaskülit veya anti-GBM bulguları eşlik edebilir. Bu hastada eritrosit sayısı minimal, eritrosit silendiri yok ve proteinüri hafiftir. Yeni ilaç maruziyetiyle başlayan döküntü-eozinofili ve lökosit silendiri glomerüler nekrozdan çok interstisyel inflamasyonu destekler."
    }
  },
  "shuffleOptions": false,
  "coreKnowledge": "Akut interstisyel nefrit genellikle ilaçlara karşı gecikmiş hipersensitivite benzeri tubulointerstisyel inflamasyondur. Ateş-döküntü-eozinofili klasik olsa da her zaman tam değildir; steril piyüri ve lökosit silendirleri önemli ipuçlarıdır.",
  "examPearl": "TUS ipucu: yeni ilaç + döküntü/eozinofili + kreatinin artışı + steril piyüri/lökosit silendiri = akut interstisyel nefrit düşün.",
  "whyCorrect": "Doğru seçenek, klinik zamanlamayı ve idrar sedimentinin lökosit ağırlıklı tubulointerstisyel karakterini tek mekanizmada birleştirir.",
  "optionComparison": "Prerenal, postrenal, ATN ve glomerülonefrit seçenekleri AKI ayırıcı tanısında gerçekçi çeldiricilerdir; ancak her biri vakadaki döküntü-eozinofili-steril piyüri-lökosit silendiri paternini eksik açıklar.",
  "evidenceChain": [
    "Yeni antibiyotik kullanımı → ilaç ilişkili immün renal reaksiyon için zamanlama.",
    "Döküntü + ateş + eozinofili → hipersensitivite paternini destekler.",
    "Kreatinin 0.8'den 2.6'ya yükselmiş → akut böbrek hasarı.",
    "Steril piyüri + lökosit silendiri → tubulointerstisyel inflamasyon.",
    "USG'de hidronefroz yok + eritrosit silendiri yok → postrenal ve glomerüler nedenler geri planda."
  ],
  "whyWrong": "Yanlış seçenekler AKI'nin diğer ana kategorilerini temsil eder; ancak bu olguda ana ayırıcı bulgular yeni ilaç maruziyeti, eozinofili ve lökosit ağırlıklı steril idrar sedimentidir.",
  "preserveInvestigationOrder": true,
  "aiMeta": {
    "version": "v308",
    "source": "manual-render-safe-internal-medicine-expansion",
    "antiRepeatChecked": true,
    "schemaReference": "V307 cases.js rawCases schema with diagnosis.optionFeedback object mapping"
  },
  "findings": [],
  "images": []
},
{
  "id": "v308-new-731-karin-sisligi-ve-hassas-hepatomegali",
  "branchId": "internal-medicine",
  "caseType": "standard",
  "relatedBranch": "İç Hastalıkları",
  "title": "Karın şişliği ve hassas hepatomegali",
  "difficulty": "Zor",
  "difficultyTag": "TUS düzeyi",
  "clinicalFocus": "Akut karın şişliği, sağ üst kadran ağrısı, hassas hepatomegali, asit ve hepatik ven akım kaybını birleştirerek hepatik venöz çıkış obstrüksiyonunu tanıma.",
  "learningTarget": "Budd-Chiari sendromunu dekompanse siroz, akut viral hepatit, safra yolu tıkanıklığı ve sağ kalp yetmezliğinden ayıran vasküler karaciğer paternini öğretme.",
  "demographics": "34 yaşında kadın hasta",
  "setting": "Dahiliye gastroenteroloji servisi",
  "chiefComplaint": "Üç gündür artan karın şişliği ve sağ üst kadran ağrısı nedeniyle başvuruyor.",
  "stem": "Hasta son üç gündür karnının hızla şiştiğini ve sağ kaburga altında sürekli bir dolgunluk-ağrı hissettiğini anlatır. Ağrı yemekle belirgin değişmemekte, derin nefes aldığında ve sağ yana döndüğünde artmaktadır. Son aylarda düzensiz adetleri nedeniyle oral kontraseptif kullandığını, daha önce sarılık veya kronik karaciğer hastalığı tanısı almadığını söyler. Ateş, titreme ve sarı-yeşil kusma tariflemez; dışkı renginde açılma fark etmemiştir. Alkol kullanımı belirgin değildir ve ailesinde genç yaşta tekrarlayan damar tıkanıklığı öyküsü olduğunu belirtir. Son bir haftada bacaklarda belirgin şişlik veya göğüs ağrısı yaşamamıştır.",
  "patientIntro": {
    "profile": "34 yaşında kadın hasta, dahiliye gastroenteroloji servisi ortamında değerlendiriliyor.",
    "presentation": "Üç gündür artan karın şişliği ve sağ üst kadran ağrısı nedeniyle başvuruyor.",
    "historySummary": "Hasta son üç gündür karnının hızla şiştiğini ve sağ kaburga altında sürekli bir dolgunluk-ağrı hissettiğini anlatır. Ağrı yemekle belirgin değişmemekte, derin nefes aldığında ve sağ yana döndüğünde artmaktadır. Son aylarda düzensiz adetleri nedeniyle oral kontraseptif kullandığını, daha önce sarılık veya kronik karaciğer hastalığı tanısı almadığını söyler. Ateş, titreme ve sarı-yeşil kusma tariflemez; dışkı renginde açılma fark etmemiştir. Alkol kullanımı belirgin değildir ve ailesinde genç yaşta tekrarlayan damar tıkanıklığı öyküsü olduğunu belirtir. Son bir haftada bacaklarda belirgin şişlik veya göğüs ağrısı yaşamamıştır."
  },
  "vitals": {
    "TA": "118/74 mmHg",
    "Nabız": "104/dk",
    "Solunum": "20/dk",
    "SpO2": "%97 oda havasında",
    "Ateş": "36.9 °C",
    "Şok indeksi": "0.88 - periferik perfüzyon korunmuş"
  },
  "exam": [
    "Karın distandü, shifting dullness pozitif.",
    "Karaciğer kot altında 4 cm palpabl ve hassas.",
    "Splenomegali hafif düzeyde; belirgin ensefalopati veya asteriksis yok.",
    "Murphy bulgusu belirgin değil, defans-rebound yok.",
    "Juguler venöz dolgunluk ve belirgin pretibial ödem saptanmıyor."
  ],
  "investigations": [
    {
      "id": "v308-new-731-karaciger",
      "label": "Karaciğer biyokimyası ve koagülasyon",
      "title": "Karaciğer biyokimyası ve koagülasyon",
      "orderLabel": "Karaciğer biyokimyası ve koagülasyon",
      "type": "lab",
      "priority": "essential",
      "subtype": "Biyokimya",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Orta düzey hepatoselüler enzim yüksekliği ve hafif sentetik bozulma vardır.",
      "clinicalMeaning": "Akut vasküler konjesyonla uyumlu karaciğer etkilenimini destekler.",
      "result": {
        "title": "Karaciğer biyokimyası ve koagülasyon",
        "summary": "Orta düzey hepatoselüler enzim yüksekliği ve hafif sentetik bozulma vardır.",
        "interpretation": "Kolestazdan çok hepatoselüler/konjestif etkilenim öne çıkar.",
        "values": [
          [
            "AST",
            "186 U/L",
            "<35 U/L",
            "Yüksek"
          ],
          [
            "ALT",
            "214 U/L",
            "<35 U/L",
            "Yüksek"
          ],
          [
            "ALP",
            "146 U/L",
            "40-130 U/L",
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
            "1.5",
            "0.8-1.2",
            "Yüksek"
          ],
          [
            "Albumin",
            "3.3 g/dL",
            "3.5-5.0 g/dL",
            "Hafif düşük"
          ]
        ]
      }
    },
    {
      "id": "v308-new-731-asit",
      "label": "Asit sıvısı analizi",
      "title": "Asit sıvısı analizi",
      "orderLabel": "Asit sıvısı analizi",
      "type": "lab",
      "priority": "important",
      "subtype": "Parasentez",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Yüksek SAAG ve düşük hücreli asit vardır.",
      "clinicalMeaning": "Portal hipertansif/vasküler konjesyon zeminini destekler, enfeksiyon baskın değildir.",
      "result": {
        "title": "Asit sıvısı analizi",
        "summary": "Yüksek SAAG ve düşük hücreli asit vardır.",
        "interpretation": "Enfeksiyöz peritonit değil, portal hipertansif asit paterni ön plandadır.",
        "values": [
          [
            "SAAG",
            "1.6 g/dL",
            ">=1.1 g/dL portal hipertansiyon lehine",
            "Yüksek"
          ],
          [
            "Total protein",
            "3.1 g/dL",
            "Değişken",
            "Görece yüksek"
          ],
          [
            "PMN",
            "90/mm³",
            "<250/mm³",
            "Düşük"
          ],
          [
            "Kültür",
            "Üreme yok",
            "Üreme yok",
            "Negatif"
          ]
        ]
      }
    },
    {
      "id": "v308-new-731-doppler",
      "label": "Doppler ultrasonografi",
      "title": "Doppler ultrasonografi",
      "orderLabel": "Doppler ultrasonografi",
      "type": "imaging",
      "priority": "essential",
      "subtype": "Doppler USG",
      "category": "imaging",
      "testTypeCategory": "imaging",
      "summary": "Hepatik ven akımı izlenmiyor, kaudat lob belirginleşmiş.",
      "clinicalMeaning": "Hepatik venöz çıkış obstrüksiyonunu destekler.",
      "result": {
        "title": "Doppler ultrasonografi",
        "summary": "Hepatik ven akımı izlenmiyor, kaudat lob belirginleşmiş.",
        "interpretation": "Hepatik venöz çıkış bozukluğu ile uyumlu vasküler patern vardır.",
        "values": [
          [
            "Sağ hepatik ven",
            "Akım alınamıyor",
            "Patent akım",
            "Anormal"
          ],
          [
            "Orta hepatik ven",
            "Segmental trombotik görünüm",
            "Patent akım",
            "Anormal"
          ],
          [
            "Portal ven",
            "Akım yönü hepatopetal, hız azalmış",
            "Hepatopetal akım",
            "Kısmen korunmuş"
          ],
          [
            "Kaudat lob",
            "Görece hipertrofik",
            "Normal oran",
            "Belirgin"
          ]
        ]
      }
    },
    {
      "id": "v308-new-731-trombofili",
      "label": "Tromboz riski için başlangıç verileri",
      "title": "Tromboz riski için başlangıç verileri",
      "orderLabel": "Tromboz riski için başlangıç verileri",
      "type": "lab",
      "priority": "supportive",
      "subtype": "Hematoloji",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Trombosit yüksekliği ve JAK2 mutasyonu saptanmıştır.",
      "clinicalMeaning": "Altta yatan miyeloproliferatif eğilimi düşündürür.",
      "result": {
        "title": "Tromboz riski için başlangıç verileri",
        "summary": "Trombosit yüksekliği ve JAK2 mutasyonu saptanmıştır.",
        "interpretation": "Hepatik ven trombozu için prokoagülan zemin olabilir.",
        "values": [
          [
            "Trombosit",
            "612.000/mm³",
            "150.000-400.000/mm³",
            "Yüksek"
          ],
          [
            "Hemoglobin",
            "13.8 g/dL",
            "12-16 g/dL",
            "Normal"
          ],
          [
            "JAK2 V617F",
            "Pozitif",
            "Negatif",
            "Pozitif"
          ],
          [
            "D-dimer",
            "2.900 ng/mL FEU",
            "<500 ng/mL FEU",
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
  "question": "Bu hastada en olası vasküler karaciğer süreci aşağıdakilerden hangisidir?",
  "questionType": "Tanı / mekanizma",
  "answerTarget": "Hepatik venöz çıkış obstrüksiyonunu klinik, asit ve Doppler verileriyle tanıma.",
  "diagnosis": {
    "correct": "Hepatik venöz çıkış obstrüksiyonuna bağlı Budd-Chiari sendromu",
    "options": [
      "Hepatik venöz çıkış obstrüksiyonuna bağlı Budd-Chiari sendromu",
      "Koledok taşına bağlı akut ekstrahepatik kolestaz",
      "Kronik alkolik siroza bağlı yavaş gelişen dekompansasyon",
      "Akut viral hepatite bağlı primer hepatoselüler inflamasyon",
      "Sağ kalp yetmezliğine bağlı konjestif hepatopati"
    ],
    "question": "Bu hastada en olası vasküler karaciğer süreci aşağıdakilerden hangisidir?",
    "explanation": "Hızla gelişen karın şişliği, sağ üst kadran ağrısı, hassas hepatomegali, yüksek SAAG'lı asit ve Doppler'da hepatik ven akımının kaybolması hepatik venöz çıkış obstrüksiyonunu destekler. Oral kontraseptif kullanımı, ailede tromboz öyküsü ve JAK2 pozitifliği prokoagülan zemin açısından ek ipuçlarıdır.",
    "pearls": [
      "Budd-Chiari triadı: karın ağrısı, asit, hepatomegali.",
      "Doppler USG tanıda ilk güçlü görüntüleme basamaklarından biridir.",
      "Yüksek SAAG ve görece yüksek asit proteini vasküler/konjestif süreci destekleyebilir.",
      "Tedavide altta yatan tromboz eğilimi ve antikoagülasyon düşünülür."
    ],
    "optionFeedback": {
      "Hepatik venöz çıkış obstrüksiyonuna bağlı Budd-Chiari sendromu": "Bu seçenek en uygundur. Hızlı gelişen asit, sağ üst kadran ağrısı, hassas hepatomegali ve Doppler'da hepatik ven akımının alınamaması hepatik venöz çıkışın tıkandığını gösterir. Oral kontraseptif kullanımı ve JAK2 pozitif trombositoz prokoagülan zemin oluşturur; bu nedenle tablo basit siroz dekompansasyonundan çok vasküler karaciğer hastalığıdır. Yönetimde kontrendikasyon yoksa antikoagülasyon ve yanıt yetersizse endovasküler/şant seçenekleri basamaklı şekilde değerlendirilir.",
      "Koledok taşına bağlı akut ekstrahepatik kolestaz": "Koledok taşında ateş, sarılık ve sağ üst kadran ağrısı olabilir; laboratuvarda ALP/GGT ve direkt bilirubin baskın kolestatik patern, görüntülemede safra yolu genişliği beklenir. Bu hastada safra yolu genişliği verilmemiş, dışkı renginde açılma veya titreme yoktur; asıl bulgu hepatik ven akımının kaybolması ve asittir. Bu nedenle ekstrahepatik safra tıkanıklığı vasküler çıkış obstrüksiyonu kadar açıklayıcı değildir.",
      "Kronik alkolik siroza bağlı yavaş gelişen dekompansasyon": "Kronik sirozda asit gelişebilir; ancak genellikle uzun süreli karaciğer hastalığı öyküsü, kronik stigmalar, belirgin hipoalbuminemi ve daha yavaş ilerleyen bir klinik beklenir. Bu vakada karın şişliği birkaç günde hızla gelişmiş, karaciğer hassas ve Doppler'da hepatik ven akımı kaybolmuştur. Alkol öyküsünün belirgin olmaması ve prokoagülan ipuçları siroz dekompansasyonunu geri plana iter.",
      "Akut viral hepatite bağlı primer hepatoselüler inflamasyon": "Akut viral hepatitte halsizlik, bulantı, sarılık ve çok yüksek aminotransferazlar görülebilir; asit ve hepatik ven akım kaybı tipik ilk bulgu değildir. Bu hastada AST/ALT orta düzeydedir ve ana klinik hızla gelişen asit-hassas hepatomegalidir. Doppler bulgusu primer hepatosit inflamasyonundan çok venöz çıkış obstrüksiyonunu gösterir.",
      "Sağ kalp yetmezliğine bağlı konjestif hepatopati": "Sağ kalp yetmezliği karaciğer konjesyonu ve asit yapabilir; juguler venöz dolgunluk, belirgin periferik ödem, triküspit yetmezliği bulguları veya kardiyak disfonksiyon beklenir. Bu vakada JVD ve pretibial ödem yoktur; Doppler hepatik ven trombotik/akım kaybı paternini göstermektedir. Konjestif hepatopati ayırıcı tanıda düşünülebilir ama hepatik venöz obstrüksiyon verisiyle ikinci planda kalır."
    }
  },
  "shuffleOptions": false,
  "coreKnowledge": "Budd-Chiari sendromu hepatik venöz çıkışın tıkanmasıdır; akut-subakut karın ağrısı, hassas hepatomegali ve asitle gelebilir. Altta miyeloproliferatif hastalıklar, JAK2 mutasyonu, gebelik/OKS ve trombofilik durumlar aranır.",
  "examPearl": "TUS ipucu: hızlı asit + sağ üst kadran ağrısı + hassas hepatomegali + hepatik ven akımı yok = Budd-Chiari sendromu.",
  "whyCorrect": "Doğru seçenek, akut asit ve karaciğer ağrısını Doppler'daki hepatik ven akım kaybıyla tek vasküler mekanizmada birleştirir.",
  "optionComparison": "Yanlış seçenekler kolestaz, siroz, viral hepatit ve kardiyak konjesyonu temsil eder; fakat vakadaki Doppler bulgusu ve tromboz risk zemini hepatik venöz çıkış obstrüksiyonunu öne çıkarır.",
  "evidenceChain": [
    "Üç günde gelişen karın şişliği → akut/subakut asit.",
    "Sağ üst kadran ağrısı + hassas hepatomegali → karaciğer kapsül gerilimi/konjesyon.",
    "SAAG 1.6 → portal hipertansif asit paterni.",
    "Hepatik ven akımı alınamıyor → venöz çıkış obstrüksiyonu.",
    "OKS kullanımı + JAK2 pozitif trombositoz → tromboz zemini."
  ],
  "whyWrong": "Yanlış seçenekler karaciğer hastalığı ayırıcı tanısında yer alır; ancak hastanın belirleyici verisi safra yolu, viral veya kardiyak değil hepatik ven akım bozukluğudur.",
  "preserveInvestigationOrder": true,
  "aiMeta": {
    "version": "v308",
    "source": "manual-render-safe-internal-medicine-expansion",
    "antiRepeatChecked": true,
    "schemaReference": "V307 cases.js rawCases schema with diagnosis.optionFeedback object mapping"
  },
  "findings": [],
  "images": []
},
{
  "id": "v308-new-732-ataklar-halinde-bas-agrisi-ve-carpinti",
  "branchId": "internal-medicine",
  "caseType": "standard",
  "relatedBranch": "İç Hastalıkları",
  "title": "Ataklar halinde baş ağrısı ve çarpıntı",
  "difficulty": "Zor",
  "difficultyTag": "TUS düzeyi",
  "clinicalFocus": "Paroksismal adrenerjik semptomlar, dirençli hipertansiyon ve yüksek metanefrin paternini preoperatif güvenli yönetim sıralamasıyla ilişkilendirme.",
  "learningTarget": "Katekolamin fazlalığında beta blokerin alfa blokajdan önce verilmemesi gerektiğini ve cerrahi öncesi alfa blokaj-hacim hazırlığı mantığını öğretme.",
  "demographics": "43 yaşında kadın hasta",
  "setting": "Dahiliye endokrinoloji polikliniği",
  "chiefComplaint": "Tekrarlayan çarpıntı, zonklayıcı baş ağrısı ve ani terleme atakları nedeniyle başvuruyor.",
  "stem": "Hasta son altı aydır birkaç dakikadan yarım saate kadar süren, aniden başlayan çarpıntı ve zonklayıcı baş ağrısı atakları yaşadığını anlatır. Atak sırasında yüzünün solduğunu, yoğun terlediğini ve ölçtüğünde tansiyonunun çok yükseldiğini söylemektedir. Ataklar arasında kendini nispeten iyi hissetse de son aylarda verilen iki farklı tansiyon ilacına rağmen ev ölçümleri dalgalı seyretmiştir. Göğüs ağrısı sürekli değildir, ateş veya kilo kaybı tariflemez. Ailesinde genç yaşta tiroid kanseri öyküsü olduğunu belirtir; düzenli dekonjestan veya kokain kullanımı yoktur. Yakın zamanda yapılan karın görüntülemesinde adrenal bölgede kitle görülmesi üzerine endokrinolojiye yönlendirilmiştir.",
  "patientIntro": {
    "profile": "43 yaşında kadın hasta, dahiliye endokrinoloji polikliniği ortamında değerlendiriliyor.",
    "presentation": "Tekrarlayan çarpıntı, zonklayıcı baş ağrısı ve ani terleme atakları nedeniyle başvuruyor.",
    "historySummary": "Hasta son altı aydır birkaç dakikadan yarım saate kadar süren, aniden başlayan çarpıntı ve zonklayıcı baş ağrısı atakları yaşadığını anlatır. Atak sırasında yüzünün solduğunu, yoğun terlediğini ve ölçtüğünde tansiyonunun çok yükseldiğini söylemektedir. Ataklar arasında kendini nispeten iyi hissetse de son aylarda verilen iki farklı tansiyon ilacına rağmen ev ölçümleri dalgalı seyretmiştir. Göğüs ağrısı sürekli değildir, ateş veya kilo kaybı tariflemez. Ailesinde genç yaşta tiroid kanseri öyküsü olduğunu belirtir; düzenli dekonjestan veya kokain kullanımı yoktur. Yakın zamanda yapılan karın görüntülemesinde adrenal bölgede kitle görülmesi üzerine endokrinolojiye yönlendirilmiştir."
  },
  "vitals": {
    "TA": "176/104 mmHg",
    "Nabız": "118/dk",
    "Solunum": "19/dk",
    "SpO2": "%99 oda havasında",
    "Ateş": "36.6 °C",
    "Şok indeksi": "0.67 - perfüzyon iyi, atak sırasında soğuk terleme tarifli"
  },
  "exam": [
    "Hasta görüşme sırasında huzursuz, elleri hafif tremorlu.",
    "Tiroid belirgin büyümüş değil, göz bulgusu yok.",
    "Kalpte taşikardi dışında ek ses veya belirgin üfürüm duyulmuyor.",
    "Cushingoid görünüm veya mor stria yok.",
    "Abdominal palpasyonda hassasiyet yok; kitle palpe edilmiyor."
  ],
  "investigations": [
    {
      "id": "v308-new-732-metanephrine",
      "label": "Katekolamin metabolitleri",
      "title": "Katekolamin metabolitleri",
      "orderLabel": "Katekolamin metabolitleri",
      "type": "lab",
      "priority": "essential",
      "subtype": "Endokrin biyokimya",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Plazma serbest metanefrin ve normetanefrin belirgin yüksektir.",
      "clinicalMeaning": "Katekolamin üreten tümör olasılığını güçlendirir.",
      "result": {
        "title": "Katekolamin metabolitleri",
        "summary": "Plazma serbest metanefrin ve normetanefrin belirgin yüksektir.",
        "interpretation": "Adrenerjik atakları biyokimyasal olarak destekleyen metabolit yüksekliği vardır.",
        "values": [
          [
            "Plazma serbest metanefrin",
            "3.1 nmol/L",
            "<0.5 nmol/L",
            "Yüksek"
          ],
          [
            "Plazma serbest normetanefrin",
            "8.4 nmol/L",
            "<0.9 nmol/L",
            "Yüksek"
          ],
          [
            "24 saat idrar normetanefrin",
            "2.900 µg/gün",
            "<600 µg/gün",
            "Yüksek"
          ]
        ]
      }
    },
    {
      "id": "v308-new-732-ct",
      "label": "Adrenal görüntüleme",
      "title": "Adrenal görüntüleme",
      "orderLabel": "Adrenal görüntüleme",
      "type": "imaging",
      "priority": "essential",
      "subtype": "BT",
      "category": "imaging",
      "testTypeCategory": "imaging",
      "summary": "Sol adrenal medullaya uyan hipervasküler kitle izlenir.",
      "clinicalMeaning": "Biyokimyasal veriyle birlikte katekolamin üreten adrenal kitleyi destekler.",
      "result": {
        "title": "Adrenal görüntüleme",
        "summary": "Sol adrenal medullaya uyan hipervasküler kitle izlenir.",
        "interpretation": "Adrenal kaynaklı katekolamin fazlalığı için yapısal odak mevcuttur.",
        "values": [
          [
            "Sol adrenal",
            "3.4 cm iyi sınırlı hipervasküler lezyon",
            "Kitle yok",
            "Anormal"
          ],
          [
            "Sağ adrenal",
            "Doğal",
            "Doğal",
            "Normal"
          ],
          [
            "Lokal invazyon",
            "Saptanmadı",
            "Yok",
            "Yok"
          ]
        ]
      }
    },
    {
      "id": "v308-new-732-basic",
      "label": "Eşlik eden metabolik veriler",
      "title": "Eşlik eden metabolik veriler",
      "orderLabel": "Eşlik eden metabolik veriler",
      "type": "lab",
      "priority": "important",
      "subtype": "Biyokimya",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Hafif hiperglisemi ve normal potasyum vardır.",
      "clinicalMeaning": "Cushing veya primer aldosteronizm paternini daha geri plana iter.",
      "result": {
        "title": "Eşlik eden metabolik veriler",
        "summary": "Hafif hiperglisemi ve normal potasyum vardır.",
        "interpretation": "Hipertansiyonun hipokalemik aldosteron fazlalığıyla açıklanması zayıftır.",
        "values": [
          [
            "Glukoz",
            "142 mg/dL",
            "70-100 mg/dL",
            "Yüksek"
          ],
          [
            "Potasyum",
            "4.1 mmol/L",
            "3.5-5.1 mmol/L",
            "Normal"
          ],
          [
            "TSH",
            "1.2 mIU/L",
            "0.4-4.0 mIU/L",
            "Normal"
          ],
          [
            "Serbest T4",
            "1.1 ng/dL",
            "0.8-1.8 ng/dL",
            "Normal"
          ]
        ]
      }
    },
    {
      "id": "v308-new-732-ekg",
      "label": "EKG",
      "title": "EKG",
      "orderLabel": "EKG",
      "type": "test",
      "priority": "supportive",
      "subtype": "Elektrokardiyografi",
      "category": "diagnostic",
      "testTypeCategory": "diagnostic",
      "summary": "Sinüs taşikardisi vardır, akut iskemi bulgusu yoktur.",
      "clinicalMeaning": "Atak sırasında adrenerjik uyarıya bağlı taşikardiyi destekler.",
      "result": {
        "title": "EKG",
        "summary": "Sinüs taşikardisi vardır, akut iskemi bulgusu yoktur.",
        "interpretation": "Sürekli aritmi veya akut koroner patern saptanmaz.",
        "values": [
          [
            "Ritim",
            "Sinüs taşikardisi",
            "Sinüs ritmi",
            "Taşikardi"
          ],
          [
            "ST-T",
            "Akut iskemik değişiklik yok",
            "Akut değişiklik yok",
            "Normal"
          ],
          [
            "QTc",
            "430 ms",
            "<460 ms",
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
  "question": "Cerrahi planlanan bu hastada preoperatif güvenlik açısından en uygun hazırlık basamağı aşağıdakilerden hangisidir?",
  "questionType": "Tedavi sıralaması / güvenli yaklaşım",
  "answerTarget": "Katekolamin üreten adrenal kitlede alfa blokajın beta blokajdan önce gelmesi gerektiğini seçme.",
  "diagnosis": {
    "correct": "Önce alfa adrenerjik blokaj ve hacim hazırlığı yapmak, gerekirse yeterli alfa blokajdan sonra beta bloker eklemek",
    "options": [
      "Taşikardi belirgin olduğu için ilk basamakta yüksek doz beta bloker başlayıp cerrahiye almak",
      "ACE inhibitörü ve tiyazid ile tansiyonu düşürüp özel adrenerjik hazırlık yapmadan ameliyata göndermek",
      "Biyokimya pozitif olduğu için aynı gün acil adrenalektomi yapıp ilaç hazırlığını postoperatif döneme bırakmak",
      "Yalnız metirozin verip alfa blokaj yapmadan katekolamin sentezini azaltarak izlemek",
      "Önce alfa adrenerjik blokaj ve hacim hazırlığı yapmak, gerekirse yeterli alfa blokajdan sonra beta bloker eklemek"
    ],
    "question": "Cerrahi planlanan bu hastada preoperatif güvenlik açısından en uygun hazırlık basamağı aşağıdakilerden hangisidir?",
    "explanation": "Paroksismal baş ağrısı-terleme-çarpıntı, dalgalı ağır hipertansiyon, yüksek metanefrinler ve adrenal kitle katekolamin fazlalığını destekler. Cerrahi öncesi kontrolsüz alfa aracılı vazokonstriksiyonu azaltmak için alfa blokaj ve intravasküler hacim hazırlığı yapılır; beta bloker gerekiyorsa ancak yeterli alfa blokajdan sonra eklenir.",
    "pearls": [
      "Katekolamin fazlalığında ilk biyokimyasal test plazma serbest veya idrar fraksiyone metanefrinlerdir.",
      "Preoperatif alfa blokaj hipertansif krizi azaltmak için temel basamaktır.",
      "Beta bloker alfa blokajdan önce verilirse karşılanmamış alfa vazokonstriksiyon riski doğar.",
      "Hazırlıkta tuz-sıvı/hacim optimizasyonu ortostatik hipotansiyon riskine rağmen önemlidir."
    ],
    "optionFeedback": {
      "Taşikardi belirgin olduğu için ilk basamakta yüksek doz beta bloker başlayıp cerrahiye almak": "Beta bloker taşikardiyi azaltabilir; ancak katekolamin üreten tümörde alfa reseptör aracılı vazokonstriksiyon kontrol altına alınmadan verilirse beta-2 vazodilatasyonun blokajı nedeniyle karşılanmamış alfa etkisi baskınlaşabilir. Bu durum ağır hipertansif kriz, koroner iskemi veya inme riskini artırabilir. Beta bloker ancak yeterli alfa blokaj ve hacim hazırlığından sonra, taşikardi devam ediyorsa eklenmelidir.",
      "ACE inhibitörü ve tiyazid ile tansiyonu düşürüp özel adrenerjik hazırlık yapmadan ameliyata göndermek": "Standart antihipertansifler kan basıncını kısmen düşürebilir; fakat cerrahi manipülasyon sırasında ani katekolamin salınımına bağlı krizi önlemede yeterli değildir. Tiyazid hacim kaybını artırabilir ve preoperatif dönemde zaten alfa blokajla oluşabilecek ortostatik riski kötüleştirebilir. Bu hastada temel sorun sıradan esansiyel hipertansiyon değil katekolamin aracılı vazokonstriktif kriz riskidir.",
      "Biyokimya pozitif olduğu için aynı gün acil adrenalektomi yapıp ilaç hazırlığını postoperatif döneme bırakmak": "Biyokimyasal tanı cerrahi gerekliliğini destekler; ancak hemodinamik hazırlık yapılmadan adrenalektomiye gitmek anestezi ve tümör manipülasyonu sırasında ölümcül hipertansif kriz riski oluşturur. Elektif cerrahide önce alfa blokaj, hacim optimizasyonu ve gerektiğinde beta blokaj yapılır. Acil cerrahi yalnız kontrol edilemeyen özel durumlarda çok yakın yoğun bakım/anestezi hazırlığıyla düşünülebilir; bu vaka elektif hazırlık gerektirir.",
      "Yalnız metirozin verip alfa blokaj yapmadan katekolamin sentezini azaltarak izlemek": "Metirozin katekolamin sentezini azaltabilir ve seçilmiş yüksek riskli olgularda alfa blokaja ek yardımcı olabilir. Ancak tek başına alfa reseptör aracılı vazokonstriksiyonu güvenli şekilde kontrol altına alma stratejisinin yerine geçmez. Bu hastada temel preoperatif güvenlik basamağı alfa blokaj ve hacim hazırlığıdır; metirozin gerekirse eklenebilir ama alfa blokajı dışlayan bir seçenek değildir.",
      "Önce alfa adrenerjik blokaj ve hacim hazırlığı yapmak, gerekirse yeterli alfa blokajdan sonra beta bloker eklemek": "Bu seçenek en uygundur. Hastanın paroksismal semptomları, çok yüksek metanefrinleri ve adrenal kitlesi katekolamin üreten tümörü destekler; cerrahi sırasında katekolamin boşalması ciddi hipertansif krize yol açabilir. Alfa blokaj damar yatağındaki aşırı vazokonstriksiyonu azaltır, hacim hazırlığı kronik vazokonstriksiyon ve alfa blokaj sonrası gelişebilecek ortostatik/hipotansif dönemleri dengelemeye yardım eder. Taşikardi sürerse beta bloker ancak alfa blokaj sağlandıktan sonra eklenir; bu sıra sınavlarda en kritik güvenlik noktasıdır."
    }
  },
  "shuffleOptions": false,
  "coreKnowledge": "Katekolamin üreten adrenal/paragangliyonik tümörlerde cerrahi öncesi alfa adrenerjik blokaj yapılır. Beta bloker gerekiyorsa alfa blokajdan sonra eklenir; aksi halde karşılanmamış alfa etkisiyle hipertansif kriz riski artabilir.",
  "examPearl": "TUS ipucu: feokromositoma şüphesi + ameliyat planı = önce alfa blokaj, sonra gerekiyorsa beta blokaj.",
  "whyCorrect": "Doğru seçenek, biyokimyasal olarak desteklenen katekolamin fazlalığında perioperatif hipertansif kriz riskini fizyolojik olarak azaltır.",
  "optionComparison": "Yanlış seçenekler taşikardiye, standart hipertansiyona veya hızlı cerrahiye odaklanır; ancak bu tabloda sırayı belirleyen ana mekanizma alfa aracılı vazokonstriksiyondur.",
  "evidenceChain": [
    "Paroksismal baş ağrısı-terleme-çarpıntı → adrenerjik atak paterni.",
    "Dalgalı dirençli hipertansiyon → sekonder hipertansiyon olasılığı.",
    "Metanefrin/normetanefrin yüksekliği → katekolamin metabolit fazlalığı.",
    "Adrenal hipervasküler kitle → yapısal kaynak.",
    "Cerrahi planı → preoperatif alfa blokaj ve hacim hazırlığı gerekliliği."
  ],
  "whyWrong": "Yanlış seçenekler alfa blokaj önceliğini atlar veya beta blokajı güvenli sıranın önüne koyar; bu da katekolamin fazlalığında sınavın ana tuzağıdır.",
  "preserveInvestigationOrder": true,
  "aiMeta": {
    "version": "v308",
    "source": "manual-render-safe-internal-medicine-expansion",
    "antiRepeatChecked": true,
    "schemaReference": "V307 cases.js rawCases schema with diagnosis.optionFeedback object mapping"
  },
  "findings": [],
  "images": []
},
{
  "id": "v308-new-733-bel-agrisi-anemi-ve-kreatinin-yuksekligi",
  "branchId": "internal-medicine",
  "caseType": "standard",
  "relatedBranch": "İç Hastalıkları",
  "title": "Bel ağrısı, anemi ve kreatinin yüksekliği",
  "difficulty": "Zor",
  "difficultyTag": "TUS düzeyi",
  "clinicalFocus": "Kemik ağrısı, normositer anemi, böbrek fonksiyon bozulması, hiperkalsemi, M protein ve klonal plazma hücresi bulgularını birlikte yorumlayarak semptomatik plazma hücre neoplazisini tanıma.",
  "learningTarget": "MGUS, smoldering myeloma, Waldenström makroglobulinemisi, metastatik solid tümör ve semptomatik multipl miyelom ayrımını CRAB ve klonal plazma hücresi verileriyle öğretme.",
  "demographics": "69 yaşında erkek hasta",
  "setting": "Dahiliye hematoloji polikliniği",
  "chiefComplaint": "Üç aydır artan bel ağrısı, halsizlik ve son haftalarda iştahsızlık nedeniyle başvuruyor.",
  "stem": "Hasta son üç aydır özellikle gece yatakta dönerken artan, basit ağrı kesicilerle tam geçmeyen bel ve kaburga ağrısı olduğunu anlatır. Son haftalarda merdiven çıkarken çabuk yorulmaya başlamış, iştahı azalmış ve birkaç kilo verdiğini fark etmiştir. Travma, ateş, gece üşüme-titreme veya idrar yaparken yanma tariflemez. Daha önce prostat veya akciğer kanseri tanısı almamıştır; sigara öyküsü sınırlıdır. Son yıl içinde iki kez sinüzit benzeri enfeksiyon nedeniyle antibiyotik kullanmış ama hastaneye yatmamıştır. Ailesi son dönemde daha soluk göründüğünü ve su içmesine rağmen kabızlığının arttığını belirtmiştir.",
  "patientIntro": {
    "profile": "69 yaşında erkek hasta, dahiliye hematoloji polikliniği ortamında değerlendiriliyor.",
    "presentation": "Üç aydır artan bel ağrısı, halsizlik ve son haftalarda iştahsızlık nedeniyle başvuruyor.",
    "historySummary": "Hasta son üç aydır özellikle gece yatakta dönerken artan, basit ağrı kesicilerle tam geçmeyen bel ve kaburga ağrısı olduğunu anlatır. Son haftalarda merdiven çıkarken çabuk yorulmaya başlamış, iştahı azalmış ve birkaç kilo verdiğini fark etmiştir. Travma, ateş, gece üşüme-titreme veya idrar yaparken yanma tariflemez. Daha önce prostat veya akciğer kanseri tanısı almamıştır; sigara öyküsü sınırlıdır. Son yıl içinde iki kez sinüzit benzeri enfeksiyon nedeniyle antibiyotik kullanmış ama hastaneye yatmamıştır. Ailesi son dönemde daha soluk göründüğünü ve su içmesine rağmen kabızlığının arttığını belirtmiştir."
  },
  "vitals": {
    "TA": "132/78 mmHg",
    "Nabız": "94/dk",
    "Solunum": "18/dk",
    "SpO2": "%97 oda havasında",
    "Ateş": "36.5 °C",
    "Şok indeksi": "0.71 - perfüzyon iyi, belirgin ortostatik bulgu yok"
  },
  "exam": [
    "Hasta soluk görünüyor, bilinç açık ve koopere.",
    "Torakolomber vertebra üzerinde perküsyonla hassasiyet var.",
    "Nörolojik muayenede belirgin motor defisit yok, sfinkter kusuru tariflemiyor.",
    "Lenfadenopati veya belirgin hepatosplenomegali saptanmıyor.",
    "Prostat muayenesi yaşına göre hafif büyüme dışında özellik göstermiyor."
  ],
  "investigations": [
    {
      "id": "v308-new-733-cbc",
      "label": "Hemogram ve biyokimya",
      "title": "Hemogram ve biyokimya",
      "orderLabel": "Hemogram ve biyokimya",
      "type": "lab",
      "priority": "essential",
      "subtype": "Hemogram/Biyokimya",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Normositer anemi, hiperkalsemi ve böbrek fonksiyon bozulması vardır.",
      "clinicalMeaning": "Kemik iliği/plazma hücre hastalığına bağlı organ etkilenimi olasılığını destekler.",
      "result": {
        "title": "Hemogram ve biyokimya",
        "summary": "Normositer anemi, hiperkalsemi ve böbrek fonksiyon bozulması vardır.",
        "interpretation": "CRAB organ hasarı bileşenleri birlikte görülmektedir.",
        "values": [
          [
            "Hemoglobin",
            "9.4 g/dL",
            "13-17 g/dL",
            "Düşük"
          ],
          [
            "MCV",
            "88 fL",
            "80-100 fL",
            "Normal"
          ],
          [
            "Kreatinin",
            "2.1 mg/dL",
            "0.6-1.2 mg/dL",
            "Yüksek"
          ],
          [
            "Kalsiyum",
            "11.9 mg/dL",
            "8.6-10.2 mg/dL",
            "Yüksek"
          ],
          [
            "Albumin",
            "3.1 g/dL",
            "3.5-5.0 g/dL",
            "Düşük"
          ],
          [
            "Total protein",
            "10.2 g/dL",
            "6.4-8.3 g/dL",
            "Yüksek"
          ]
        ]
      }
    },
    {
      "id": "v308-new-733-protein",
      "label": "Serum/idrarda monoklonal protein değerlendirmesi",
      "title": "Serum/idrarda monoklonal protein değerlendirmesi",
      "orderLabel": "Serum/idrarda monoklonal protein değerlendirmesi",
      "type": "lab",
      "priority": "essential",
      "subtype": "Protein elektroforezi",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Monoklonal IgG-kappa proteini ve serbest hafif zincir dengesizliği vardır.",
      "clinicalMeaning": "Klonal plazma hücre proliferasyonunu destekler.",
      "result": {
        "title": "Serum/idrarda monoklonal protein değerlendirmesi",
        "summary": "Monoklonal IgG-kappa proteini ve serbest hafif zincir dengesizliği vardır.",
        "interpretation": "Monoklonal protein üretimi belirgindir.",
        "values": [
          [
            "SPEP",
            "M bandı 3.2 g/dL",
            "M bandı yok",
            "Pozitif"
          ],
          [
            "İmmünfiksasyon",
            "IgG-kappa monoklonal protein",
            "Poliklonal dağılım",
            "Pozitif"
          ],
          [
            "Serum kappa/lambda oranı",
            "76",
            "0.26-1.65",
            "Yüksek"
          ],
          [
            "İdrar immünfiksasyon",
            "Kappa hafif zincir pozitif",
            "Negatif",
            "Pozitif"
          ]
        ]
      }
    },
    {
      "id": "v308-new-733-bone",
      "label": "Düşük doz tüm vücut BT",
      "title": "Düşük doz tüm vücut BT",
      "orderLabel": "Düşük doz tüm vücut BT",
      "type": "imaging",
      "priority": "essential",
      "subtype": "BT",
      "category": "imaging",
      "testTypeCategory": "imaging",
      "summary": "Vertebra ve kaburgalarda litik kemik lezyonları izlenir.",
      "clinicalMeaning": "Kemik yıkımıyla giden plazma hücre hastalığını destekler.",
      "result": {
        "title": "Düşük doz tüm vücut BT",
        "summary": "Vertebra ve kaburgalarda litik kemik lezyonları izlenir.",
        "interpretation": "Destrüktif litik kemik tutulumu vardır.",
        "values": [
          [
            "T12 vertebra",
            "1.8 cm litik lezyon",
            "Lezyon yok",
            "Anormal"
          ],
          [
            "Sağ 7. kaburga",
            "Kortikal incelme yapan litik odak",
            "Lezyon yok",
            "Anormal"
          ],
          [
            "Pelvis",
            "Küçük multipl litik odaklar",
            "Lezyon yok",
            "Anormal"
          ],
          [
            "Prostat metastazı tipi skleroz",
            "Saptanmadı",
            "Yok",
            "Yok"
          ]
        ]
      }
    },
    {
      "id": "v308-new-733-marrow",
      "label": "Kemik iliği incelemesi",
      "title": "Kemik iliği incelemesi",
      "orderLabel": "Kemik iliği incelemesi",
      "type": "pathology",
      "priority": "essential",
      "subtype": "Kemik iliği",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Klonal plazma hücre artışı saptanır.",
      "clinicalMeaning": "Monoklonal protein ve organ hasarıyla birlikte tanısal eşiği destekler.",
      "result": {
        "title": "Kemik iliği incelemesi",
        "summary": "Klonal plazma hücre artışı saptanır.",
        "interpretation": "Klonal plazma hücre proliferasyonu mevcuttur.",
        "values": [
          [
            "Plazma hücre oranı",
            "%28",
            "<%10",
            "Yüksek"
          ],
          [
            "Kappa/lambda boyanma",
            "Kappa restriksiyonu",
            "Poliklonal",
            "Klonal"
          ],
          [
            "Blast oranı",
            "%1",
            "<%5",
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
  "question": "Bu hastadaki klinik ve laboratuvar bulgularını en iyi açıklayan tanı aşağıdakilerden hangisidir?",
  "questionType": "Tanı / laboratuvar paterni",
  "answerTarget": "CRAB organ hasarı ve klonal plazma hücre verileriyle semptomatik multipl miyelomu ayırt etme.",
  "diagnosis": {
    "correct": "Semptomatik multipl miyelom",
    "options": [
      "MGUS yani klinik organ hasarı oluşturmayan monoklonal gammopati",
      "Smoldering plazma hücre hastalığı",
      "Semptomatik multipl miyelom",
      "Waldenström makroglobulinemisi",
      "Metastatik prostat adenokarsinomu"
    ],
    "question": "Bu hastadaki klinik ve laboratuvar bulgularını en iyi açıklayan tanı aşağıdakilerden hangisidir?",
    "explanation": "Klonal plazma hücre oranının %10'un üzerinde olması, M proteini, belirgin kappa/lambda oran bozukluğu ve CRAB bulguları olarak anemi, hiperkalsemi, böbrek fonksiyon bozukluğu ve litik kemik lezyonlarının bulunması semptomatik multipl miyelomu destekler. MGUS ve smoldering hastalıkta bu organ hasarı beklenmez.",
    "pearls": [
      "CRAB: hyperCalcemia, Renal dysfunction, Anemia, Bone lesions.",
      "MGUS'ta M protein olabilir ama organ hasarı yoktur.",
      "Smoldering hastalıkta klonal yük daha belirgindir fakat myeloma-defining event/CRAB yoktur.",
      "Prostat metastazları tipik olarak sklerotik olma eğilimindedir; monoklonal protein ve klonal plazma hücresiyle açıklanmaz."
    ],
    "optionFeedback": {
      "MGUS yani klinik organ hasarı oluşturmayan monoklonal gammopati": "MGUS'ta serumda monoklonal protein bulunabilir, ancak klonal plazma hücre oranı sınırlıdır ve anemi, böbrek yetmezliği, hiperkalsemi veya litik kemik lezyonu gibi hastalığa atfedilebilir organ hasarı yoktur. Bu hastada hem M bandı hem %28 klonal plazma hücresi hem de CRAB bulguları vardır. Bu nedenle durum masum/izlem ağırlıklı monoklonal gammopati olarak değerlendirilemez.",
      "Smoldering plazma hücre hastalığı": "Smoldering hastalık, MGUS'tan daha yüksek tümör yüküne sahip olabilir; ancak tanı gereği organ hasarı veya myeloma-defining event bulunmaz. Bu vakada Hb 9.4 g/dL, kreatinin 2.1 mg/dL, kalsiyum 11.9 mg/dL ve litik kemik lezyonları vardır. Bu bulgular hastalığın sessiz değil semptomatik/tedavi gerektiren evrede olduğunu gösterir.",
      "Semptomatik multipl miyelom": "Bu seçenek en uygundur. Hastada klonal plazma hücre proliferasyonu (%28), IgG-kappa M proteini, serbest hafif zincir oran bozukluğu ve monoklonal hafif zincir atılımı vardır. Bunun yanında anemi, renal fonksiyon bozulması, hiperkalsemi ve litik kemik lezyonları aynı klinik çatı altında CRAB organ hasarını oluşturur. Bu kombinasyon MGUS veya smoldering evreyi aşar ve tedavi gerektiren semptomatik multipl miyelom tanısını destekler.",
      "Waldenström makroglobulinemisi": "Waldenström makroglobulinemisi genellikle lenfoplazmasitik lenfoma zemininde IgM monoklonal proteinle gider; hiperviskozite, lenfadenopati, hepatosplenomegali veya nöropati gibi bulgular öne çıkabilir. Bu hastada monoklonal protein IgG-kappa, kemik iliğinde plazma hücre klonu ve litik kemik lezyonları ön plandadır. IgM baskınlığı ve lenfoplazmasitik tablo verilmediği için Waldenström daha zayıftır.",
      "Metastatik prostat adenokarsinomu": "Yaşlı erkekte bel ağrısı metastatik prostat kanserini akla getirebilir; ancak prostat metastazları çoğunlukla osteoblastik/sklerotik lezyonlarla ilişkilidir ve M bandı, serbest hafif zincir oran bozukluğu, idrarda kappa hafif zincir ve %28 klonal plazma hücresi artışını açıklamaz. Prostat muayenesi belirgin şüpheli değil ve BT'de litik lezyonlar baskındır. Bu nedenle solid tümör metastazından çok plazma hücre neoplazisi düşünülmelidir."
    }
  },
  "shuffleOptions": false,
  "coreKnowledge": "Semptomatik multipl miyelom tanısında klonal plazma hücre proliferasyonu veya plazmasitom ile birlikte CRAB bulguları ya da myeloma-defining event aranır. CRAB organ hasarı tedavi gerektiren hastalığı MGUS/smoldering evreden ayırır.",
  "examPearl": "TUS ipucu: yaşlı hasta + bel ağrısı + anemi + hiperkalsemi + kreatinin yüksekliği + M bandı/litik lezyon = multipl miyelom düşün.",
  "whyCorrect": "Doğru seçenek, monoklonal protein üretimini ve CRAB organ hasarını tek plazma hücre neoplazisi çatısı altında birleştirir.",
  "optionComparison": "Yanlış seçenekler monoklonal protein veya kemik ağrısı ayırıcı tanısında gerçekçi olsa da CRAB organ hasarı ve %28 klonal plazma hücresi varlığı semptomatik miyelomu öne çıkarır.",
  "evidenceChain": [
    "Bel-kaburga ağrısı + litik BT odakları → kemik yıkımı.",
    "Hb 9.4 → anemi bileşeni.",
    "Kreatinin 2.1 + idrarda kappa hafif zincir → renal etkilenim.",
    "Kalsiyum 11.9 → kemik rezorpsiyonu/hiperkalsemi.",
    "M bandı + IgG-kappa + %28 klonal plazma hücresi → plazma hücre neoplazisi."
  ],
  "whyWrong": "Yanlış seçenekler organ hasarı olmayan veya farklı hücresel kökenli tabloları temsil eder; bu vakada CRAB ve klonal plazma hücre yükü tanısal belirleyicidir.",
  "preserveInvestigationOrder": true,
  "aiMeta": {
    "version": "v308",
    "source": "manual-render-safe-internal-medicine-expansion",
    "antiRepeatChecked": true,
    "schemaReference": "V307 cases.js rawCases schema with diagnosis.optionFeedback object mapping"
  },
  "findings": [],
  "images": []
},
{
    "id": "v309-new-734-carpinti-ve-duzensiz-genis-qrs-tasikardi",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "Çarpıntı ve düzensiz geniş QRS taşikardi",
    "difficulty": "Zor",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "Düzensiz geniş kompleks taşikardide aksesuar yol aracılı hızlı iletimi tanıyıp AV nod baskılayan ilaçlardan kaçınarak güvenli ritim yönetimini seçme.",
    "learningTarget": "Atriyal fibrilasyon zemininde geniş ve değişken QRS morfolojisinin AV nod dışı iletim riski taşıdığını; stabil hastada prokainamid/ibutilid, instabil hastada senkronize kardiyoversiyon yaklaşımını öğretme.",
    "demographics": "32 yaşında erkek hasta",
    "setting": "Acil servis monitörlü gözlem alanı",
    "chiefComplaint": "Ani başlayan çarpıntı, göğüste baskı ve baş dönmesi nedeniyle başvuruyor.",
    "stem": "Hasta maç izlerken aniden kalbinin çok hızlı ve düzensiz attığını, birkaç dakika içinde göğsünde baskı ve baş dönmesi hissettiğini anlatır. Yakınması başlamadan önce enerji içeceği içtiğini ve son haftalarda uykusuz kaldığını söyler. Daha önce kısa süren çarpıntı atakları olmuş, ancak bu kadar uzun sürmediği için doktora başvurmamıştır. Bayılma, travma, ateş veya aktif kanama tariflemez. Düzenli ilaç kullanmaz ve bilinen yapısal kalp hastalığı yoktur. Acile geldiğinde konuşabiliyor ancak ritim hissinin dalgalandığını ve arada gözlerinin karardığını belirtir.",
    "patientIntro": {
      "profile": "32 yaşında erkek hasta, acil servis monitörlü gözlem alanında değerlendiriliyor.",
      "presentation": "Ani başlayan çarpıntı, göğüste baskı ve baş dönmesi nedeniyle başvuruyor.",
      "historySummary": "Hasta maç izlerken aniden kalbinin çok hızlı ve düzensiz attığını, birkaç dakika içinde göğsünde baskı ve baş dönmesi hissettiğini anlatır. Yakınması başlamadan önce enerji içeceği içtiğini ve son haftalarda uykusuz kaldığını söyler. Daha önce kısa süren çarpıntı atakları olmuş, ancak bu kadar uzun sürmediği için doktora başvurmamıştır. Bayılma, travma, ateş veya aktif kanama tariflemez. Düzenli ilaç kullanmaz ve bilinen yapısal kalp hastalığı yoktur. Acile geldiğinde konuşabiliyor ancak ritim hissinin dalgalandığını ve arada gözlerinin karardığını belirtir."
    },
    "vitals": {
      "TA": "112/70 mmHg",
      "Nabız": "180-230/dk, düzensiz",
      "Solunum": "22/dk",
      "SpO2": "%97 oda havasında",
      "Ateş": "36.8 °C",
      "Şok indeksi": "Yaklaşık 1.6-2.0; bilinç açık, kapiller dolum 2-3 saniye"
    },
    "exam": [
      "Hasta anksiyöz görünümde, cümle kurabiliyor ve oryante.",
      "Nabız düzensiz ve çok hızlı; periferik nabız dolgunluğu atımdan atıma değişiyor.",
      "Akciğerlerde ral yok, belirgin bronkospazm duyulmuyor.",
      "Juguler venöz dolgunluk ve periferik ödem yok.",
      "Göğüs ağrısı sürekli ezici karakterde değil; hipotansiyon veya bilinç kaybı gelişmemiş."
    ],
    "investigations": [
      {
        "id": "v309-new-734-ekg-tasikardi",
        "label": "Başvuru EKG'si",
        "title": "Başvuru EKG'si",
        "orderLabel": "Başvuru EKG'si",
        "type": "ecg",
        "priority": "essential",
        "subtype": "Ritim analizi",
        "category": "cardiology",
        "testTypeCategory": "cardiology",
        "summary": "Düzensiz, geniş kompleksli ve çok hızlı taşikardi izlenir.",
        "clinicalMeaning": "Ritimde AV nodu dışındaki hızlı iletim olasılığını düşündüren yüksek riskli özellikler vardır.",
        "result": {
          "title": "12 derivasyonlu EKG",
          "summary": "Düzensiz, geniş kompleksli ve çok hızlı taşikardi izlenir.",
          "interpretation": "QRS morfolojisi ve RR aralıkları belirgin değişkenlik göstermektedir.",
          "values": [
            [
              "Ritim",
              "Tamamen düzensiz RR aralıkları",
              "Düzenli sinüs ritmi",
              "Anormal"
            ],
            [
              "Ventrikül hızı",
              "180-230/dk",
              "60-100/dk",
              "Çok yüksek"
            ],
            [
              "QRS",
              "120-170 ms arasında değişken genişlik",
              "<120 ms",
              "Geniş ve değişken"
            ],
            [
              "En kısa RR aralığı",
              "Yaklaşık 240 ms",
              ">250-300 ms",
              "Riskli kısa aralık"
            ],
            [
              "ST elevasyonu",
              "Yok",
              "Yok",
              "Saptanmadı"
            ]
          ]
        }
      },
      {
        "id": "v309-new-734-perfuzyon",
        "label": "Hemodinamik değerlendirme",
        "title": "Hemodinamik değerlendirme",
        "orderLabel": "Hemodinamik değerlendirme",
        "type": "clinical",
        "priority": "essential",
        "subtype": "Stabilite değerlendirmesi",
        "category": "clinicalAssessment",
        "testTypeCategory": "clinicalAssessment",
        "summary": "Hasta semptomatik ancak şu anda şok, bilinç kaybı veya akciğer ödemi göstermiyor.",
        "clinicalMeaning": "Acil elektriksel kardiyoversiyon hazırlığı korunurken stabil ritim kontrol seçeneği değerlendirilebilir.",
        "result": {
          "title": "Hemodinamik durum",
          "summary": "Hasta semptomatik ancak şu anda şok, bilinç kaybı veya akciğer ödemi göstermiyor.",
          "interpretation": "Yakın izlem gerektiren fakat henüz instabilite kriterlerini karşılamayan tablo.",
          "values": [
            [
              "Bilinç",
              "Açık, koopere",
              "Açık",
              "Korunmuş"
            ],
            [
              "Sistolik kan basıncı",
              "112 mmHg",
              ">90 mmHg",
              "Korunmuş"
            ],
            [
              "Akciğer ödemi",
              "Yok",
              "Yok",
              "Saptanmadı"
            ],
            [
              "İskemik ST elevasyonu",
              "Yok",
              "Yok",
              "Saptanmadı"
            ]
          ]
        }
      },
      {
        "id": "v309-new-734-lab",
        "label": "Acil biyokimya ve kardiyak belirteçler",
        "title": "Acil biyokimya ve kardiyak belirteçler",
        "orderLabel": "Acil biyokimya ve kardiyak belirteçler",
        "type": "lab",
        "priority": "important",
        "subtype": "Elektrolit/kardiyak belirteç",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Ağır elektrolit bozukluğu veya belirgin miyokard hasarı saptanmaz.",
        "clinicalMeaning": "Ritim yönetimi elektrolit düzeltmesinden çok iletim yoluna göre seçilmelidir.",
        "result": {
          "title": "Acil laboratuvar",
          "summary": "Ağır elektrolit bozukluğu veya belirgin miyokard hasarı saptanmaz.",
          "interpretation": "Aritmiyi açıklayacak belirgin hipokalemi/hipomagnezemi yoktur.",
          "values": [
            [
              "Potasyum",
              "4.1 mmol/L",
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
              "Troponin I",
              "12 ng/L",
              "<34 ng/L",
              "Normal"
            ],
            [
              "TSH",
              "1.7 mIU/L",
              "0.4-4.0 mIU/L",
              "Normal"
            ]
          ]
        }
      },
      {
        "id": "v309-new-734-konversiyon-ekg",
        "label": "Atak sonrası kontrol EKG",
        "title": "Atak sonrası kontrol EKG",
        "orderLabel": "Atak sonrası kontrol EKG",
        "type": "ecg",
        "priority": "supportive",
        "subtype": "Sinüs ritmi analizi",
        "category": "cardiology",
        "testTypeCategory": "cardiology",
        "summary": "Sinüs ritminde kısa PR ve QRS başlangıcında slurring dikkati çeker.",
        "clinicalMeaning": "Önceki taşikardide AV nod dışı iletim riskinin neden önemli olduğunu destekler.",
        "result": {
          "title": "Kontrol EKG",
          "summary": "Sinüs ritminde kısa PR ve QRS başlangıcında slurring dikkati çeker.",
          "interpretation": "Bazal EKG'de erken ventriküler aktivasyon bulguları vardır.",
          "values": [
            [
              "PR aralığı",
              "95 ms",
              "120-200 ms",
              "Kısa"
            ],
            [
              "QRS başlangıcı",
              "Yavaş yükselen başlangıç dalgası",
              "Keskin başlangıç",
              "Anormal"
            ],
            [
              "QRS süresi",
              "118 ms",
              "<120 ms",
              "Sınırda"
            ],
            [
              "QTc",
              "410 ms",
              "<450 ms",
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
    "question": "Bu hastada acil ritim yönetiminde en uygun yaklaşım aşağıdakilerden hangisidir?",
    "questionType": "Acil ritim yönetimi",
    "answerTarget": "Düzensiz geniş kompleks taşikardide AV nod blokerlerinden kaçınarak aksesuar yol üzerinden iletimi yavaşlatan güvenli yaklaşımı seçme.",
    "diagnosis": {
      "correct": "Yakın monitörizasyon altında intravenöz prokainamid veya ibutilid ile ritim kontrolü planlamak; instabilite gelişirse senkronize kardiyoversiyona geçmek",
      "options": [
        "Hız kontrolü için intravenöz diltiazem bolusu vermek ve gerekirse infüzyona geçmek",
        "Vagal manevra sonrası hızlı intravenöz adenozin bolusu uygulamak",
        "Yakın monitörizasyon altında intravenöz prokainamid veya ibutilid ile ritim kontrolü planlamak; instabilite gelişirse senkronize kardiyoversiyona geçmek",
        "Digoksin yüklemesi yaparak ventrikül hızını AV nod üzerinden yavaşlatmak",
        "Amiodaronu ilk seçenek olarak başlayıp ek hız kontrolü için beta bloker eklemek"
      ],
      "question": "Bu hastada acil ritim yönetiminde en uygun yaklaşım aşağıdakilerden hangisidir?",
      "explanation": "Düzensiz geniş kompleks taşikardi, çok hızlı ventrikül yanıtı, değişken QRS genişliği ve kısa RR aralıkları AV nod dışı iletim olasılığını tehlikeli hale getirir. Bu durumda AV nodu baskılayan ilaçlar aksesuar yol üzerinden iletimi görece artırarak ventrikül fibrilasyonu riskini yükseltebilir. Hasta şu anda konuşabiliyor ve belirgin şok göstermiyor; bu nedenle monitörize koşulda prokainamid/ibutilid gibi aksesuar yol iletimini de yavaşlatan ritim kontrol yaklaşımı uygundur. Hipotansiyon, bilinç bozukluğu, ciddi iskemi veya akciğer ödemi gelişirse farmakolojik bekleme yerine senkronize kardiyoversiyon gerekir.",
      "pearls": [
        "Düzensiz geniş QRS taşikardide AV nod blokeri refleks olarak verilmez.",
        "Çok kısa RR aralığı aksesuar yol üzerinden hızlı ventrikül aktivasyonu riskini gösterir.",
        "Adenozin düzenli dar QRS SVT için uygundur; bu tablo farklıdır.",
        "İnstabil geniş kompleks taşikardide senkronize kardiyoversiyon geciktirilmez."
      ],
      "optionFeedback": {
        "Hız kontrolü için intravenöz diltiazem bolusu vermek ve gerekirse infüzyona geçmek": "Diltiazem AV nod üzerinden iletimi yavaşlatan non-dihidropiridin kalsiyum kanal blokeridir ve tipik dar kompleks hızlı atriyal fibrilasyonda hız kontrolünde kullanılabilir. Ancak bu vakadaki ritim düzensiz, geniş kompleksli, çok hızlı ve QRS morfolojisi değişkendir; bu patern AV nod dışında ventriküle iletim yapan bir yolun devrede olabileceğini gösterir. AV nodu baskılamak, atriyal impulsların aksesuar yol üzerinden daha hızlı ventriküle geçmesine izin verebilir ve ventrikül fibrilasyonu riskini artırabilir. Bu nedenle diltiazem burada güvenli bir ilk seçenek değildir.",
        "Vagal manevra sonrası hızlı intravenöz adenozin bolusu uygulamak": "Adenozin, AV nod bağımlı düzenli dar QRS taşikardilerde tanısal ve tedavi edici olabilir. Bu hastada ritim düzenli değildir; RR aralıkları tamamen değişken, QRS genişliği atımdan atıma farklı ve hız çok yüksektir. Adenozin AV nodu geçici olarak bloke eder, fakat sorun AV nod bağımlı re-entry gibi görünmemektedir. Düzensiz geniş kompleks ritimde adenozin refleks olarak verilirse tanısal belirsizlik ve potansiyel kötüleşme riski oluşturabilir; bu nedenle uygun yaklaşım değildir.",
        "Yakın monitörizasyon altında intravenöz prokainamid veya ibutilid ile ritim kontrolü planlamak; instabilite gelişirse senkronize kardiyoversiyona geçmek": "Bu seçenek en uygundur. Hasta semptomatik olsa da şu anda sistolik basıncı korunmuş, bilinci açık ve akciğer ödemi göstermiyor; bu nedenle monitörize ortamda farmakolojik ritim kontrolü düşünülebilir. Prokainamid ve ibutilid yalnız AV nodu baskılamakla kalmayıp atriyum-aksesuar yol iletimini ve refrakterliği etkileyerek bu tehlikeli iletim paterninde daha güvenli kabul edilir. Ancak bu karar dinamik bir karardır: hipotansiyon, bilinç bozulması, ciddi iskemik ağrı veya pulmoner ödem gelişirse doğru yaklaşım senkronize elektriksel kardiyoversiyondur.",
        "Digoksin yüklemesi yaparak ventrikül hızını AV nod üzerinden yavaşlatmak": "Digoksin tipik atriyal fibrilasyonda özellikle istirahat hız kontrolünde bazı hastalarda kullanılabilir; fakat etkisi yavaş başlar ve AV nodu baskılayan mekanizması bu vakada sorunludur. Aksesuar yol riski olan düzensiz geniş kompleks taşikardide AV nodu yavaşlatmak ventriküle ulaşan impulsların alternatif yoldan hızlanmasına yol açabilir. Ayrıca hasta akut semptomatik ve çok hızlı ventrikül yanıtına sahiptir; digoksin hem yavaş hem de güvenlik açısından uygunsuzdur.",
        "Amiodaronu ilk seçenek olarak başlayıp ek hız kontrolü için beta bloker eklemek": "Amiodaron birçok geniş kompleks taşikardi ve atriyal aritmide kullanılsa da bu özel tabloda ilk refleks seçenek olarak güvenli kabul edilmez; özellikle AV nod baskılayıcı ek ilaçlarla birlikte aksesuar yol dinamiği kötüleşebilir. Beta bloker de AV nodu baskılar ve bu ritim paterninde tek başına hız kontrol amacıyla verilmemelidir. Amiodaron bazı klinik senaryolarda uzman eşliğinde düşünülebilse de sınav mantığında düzensiz geniş kompleks taşikardi + kısa RR aralığı görüldüğünde prokainamid/ibutilid veya instabilite varsa kardiyoversiyon önceliklidir."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "Düzensiz geniş kompleks taşikardi ve çok kısa RR aralıkları görüldüğünde AV nod blokerleriyle hız kontrolü tehlikeli olabilir. Stabil hastada aksesuar yol iletimini de etkileyen ritim kontrolü, instabil hastada senkronize kardiyoversiyon önceliklidir.",
    "examPearl": "TUS ipucu: düzensiz geniş QRS + çok hızlı ventrikül yanıtı = AV nod blokerlerinden kaçın; prokainamid/ibutilid veya instabilse kardiyoversiyon düşün.",
    "whyCorrect": "Doğru seçenek, ritmin geniş ve düzensiz olmasının taşıdığı aksesuar yol riskini dikkate alır ve AV nod blokeriyle paradoksal kötüleşme riskinden kaçınır.",
    "optionComparison": "Yanlış seçenekler dar kompleks AV nod bağımlı taşikardi veya tipik atriyal fibrilasyon hız kontrolü mantığını temsil eder; bu vakada QRS genişliği, değişkenlik ve çok kısa RR aralığı yönetimi değiştirir.",
    "evidenceChain": [
      "Ani çarpıntı + düzensiz çok hızlı nabız → atriyal kaynaklı düzensiz taşiaritmi olasılığı.",
      "QRS genişliği ve morfolojisi atımdan atıma değişken → standart dar kompleks hız kontrolünden farklı yüksek riskli patern.",
      "En kısa RR yaklaşık 240 ms → ventrikülün çok hızlı uyarılabildiğini gösterir.",
      "Kan basıncı ve bilinç korunmuş → monitörize farmakolojik ritim kontrolü için kısa zaman penceresi.",
      "AV nod blokerlerinin seçeneklerde bulunması → yanlış güvenli hız kontrol refleksini ayırma hedefi."
    ],
    "whyWrong": "Yanlış seçenekler AV nodu bloke eden veya düzenli SVT yaklaşımına uygun ilaçlardır; düzensiz geniş kompleks ve kısa RR aralıklı tabloda bu yaklaşım ventriküler aritmi riskini artırabilir.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v309",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V308 cases.js rawCases schema with diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  },
{
    "id": "v309-new-735-yuz-boyun-sisligi-ve-gogus-duvari-damarlarinda-belirginlesme",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "Yüz-boyun şişliği ve göğüs duvarı damarlarında belirginleşme",
    "difficulty": "Zor",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "Santral venöz dönüş obstrüksiyonunu tanıyıp stabil hastada görüntüleme ve doku tanısı önceliğini gereksiz ampirik onkolojik tedaviden ayırma.",
    "learningTarget": "Yüz-boyun ödemi, venöz kollateraller ve mediastinal kitle birlikteliğinde malign vena kava superior obstrüksiyonu olasılığını; hava yolu/serebral ödem yoksa tanısal doğrulama ve doku örneklemenin önemini öğretme.",
    "demographics": "64 yaşında erkek hasta",
    "setting": "Dahiliye acil konsültasyonu ve göğüs hastalıkları değerlendirmesi",
    "chiefComplaint": "Sabahları belirginleşen yüz şişliği, nefes darlığı ve boyun damarlarında dolgunluk nedeniyle başvuruyor.",
    "stem": "Hasta son üç haftadır sabah uyandığında yüzünün ve göz kapaklarının şiş olduğunu, gün içinde kısmen azalsa da eğilince başında basınç hissinin arttığını anlatır. Son birkaç gündür gömlek yakasının dar geldiğini ve sağ kolunda hafif ağırlık hissettiğini söylemektedir. Merdiven çıkarken nefes nefese kalması yeni başlamış, ancak balgamlı ateşli öksürük veya hemoptizi tariflememiştir. Sırtüstü yatınca boğulur gibi olduğu için iki yastıkla uyumaya başlamıştır. Otuz beş paket-yıl sigara öyküsü vardır ve son iki ayda istemsiz kilo kaybı fark etmiştir. Bilinen kalp yetmezliği veya böbrek hastalığı yoktur.",
    "patientIntro": {
      "profile": "64 yaşında erkek hasta, dahiliye acil konsültasyonu ve göğüs hastalıkları değerlendirmesi ortamında inceleniyor.",
      "presentation": "Sabahları belirginleşen yüz şişliği, nefes darlığı ve boyun damarlarında dolgunluk nedeniyle başvuruyor.",
      "historySummary": "Hasta son üç haftadır sabah uyandığında yüzünün ve göz kapaklarının şiş olduğunu, gün içinde kısmen azalsa da eğilince başında basınç hissinin arttığını anlatır. Son birkaç gündür gömlek yakasının dar geldiğini ve sağ kolunda hafif ağırlık hissettiğini söylemektedir. Merdiven çıkarken nefes nefese kalması yeni başlamış, ancak balgamlı ateşli öksürük veya hemoptizi tariflememiştir. Sırtüstü yatınca boğulur gibi olduğu için iki yastıkla uyumaya başlamıştır. Otuz beş paket-yıl sigara öyküsü vardır ve son iki ayda istemsiz kilo kaybı fark etmiştir. Bilinen kalp yetmezliği veya böbrek hastalığı yoktur."
    },
    "vitals": {
      "TA": "128/76 mmHg",
      "Nabız": "104/dk",
      "Solunum": "22/dk",
      "SpO2": "%94 oda havasında",
      "Ateş": "36.9 °C",
      "Şok indeksi": "0.81 - perfüzyon korunmuş, kapiller dolum 2 saniye"
    },
    "exam": [
      "Yüz ve boyunda pletorik görünüm ve bilateral periorbital ödem izleniyor.",
      "Boyun venleri oturur pozisyonda da belirgin dolgun.",
      "Üst göğüs duvarında yüzeyel venler belirginleşmiş ve akım aşağı yöne izleniyor.",
      "Stridor, bilinç bulanıklığı veya fokal nörolojik bulgu yok.",
      "Alt ekstremitede belirgin ödem yok; akciğerlerde yaygın ral saptanmıyor."
    ],
    "investigations": [
      {
        "id": "v309-new-735-lab",
        "label": "Temel laboratuvar ve organ fonksiyonları",
        "title": "Temel laboratuvar ve organ fonksiyonları",
        "orderLabel": "Temel laboratuvar ve organ fonksiyonları",
        "type": "lab",
        "priority": "important",
        "subtype": "Hemogram/biyokimya",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Acil kontrastlı görüntüleme öncesi belirgin böbrek fonksiyon engeli yoktur.",
        "clinicalMeaning": "Kontrastlı toraks görüntülemesi güvenli biçimde planlanabilir.",
        "result": {
          "title": "Laboratuvar",
          "summary": "Acil kontrastlı görüntüleme öncesi belirgin böbrek fonksiyon engeli yoktur.",
          "interpretation": "Böbrek fonksiyonu korunmuş, ağır enfeksiyon veya belirgin anemi yok.",
          "values": [
            [
              "Hemoglobin",
              "13.1 g/dL",
              "13.5-17.5 g/dL",
              "Sınırda düşük"
            ],
            [
              "Lökosit",
              "9.800/mm³",
              "4.000-10.000/mm³",
              "Normal"
            ],
            [
              "Kreatinin",
              "0.9 mg/dL",
              "0.6-1.2 mg/dL",
              "Normal"
            ],
            [
              "Albumin",
              "4.0 g/dL",
              "3.5-5.0 g/dL",
              "Normal"
            ]
          ]
        }
      },
      {
        "id": "v309-new-735-akciger-grafisi",
        "label": "Akciğer grafisi",
        "title": "Akciğer grafisi",
        "orderLabel": "Akciğer grafisi",
        "type": "imaging",
        "priority": "essential",
        "subtype": "PA akciğer grafisi",
        "category": "imaging",
        "testTypeCategory": "imaging",
        "summary": "Sağ hiler-paratrakeal bölgede genişleme ve üst mediastende dolgunluk izlenir.",
        "clinicalMeaning": "Santral torasik kitle veya lenf nodu konglomerasyonu olasılığını destekler.",
        "result": {
          "title": "PA akciğer grafisi",
          "summary": "Sağ hiler-paratrakeal bölgede genişleme ve üst mediastende dolgunluk izlenir.",
          "interpretation": "Mediastinal genişleme ileri kesitsel görüntüleme gerektirir.",
          "values": [
            [
              "Mediasten",
              "Sağ üst mediastende genişleme",
              "Normal genişlik",
              "Anormal"
            ],
            [
              "Sağ hilus",
              "Belirginleşmiş",
              "Normal",
              "Anormal"
            ],
            [
              "Plevral sıvı",
              "Yok",
              "Yok",
              "Saptanmadı"
            ],
            [
              "Kardiyotorasik oran",
              "Normal sınırlarda",
              "Normal",
              "Kalp yetmezliği lehine değil"
            ]
          ]
        }
      },
      {
        "id": "v309-new-735-kontrastli-bt",
        "label": "Kontrastlı toraks BT",
        "title": "Kontrastlı toraks BT",
        "orderLabel": "Kontrastlı toraks BT",
        "type": "imaging",
        "priority": "essential",
        "subtype": "Kontrastlı BT",
        "category": "imaging",
        "testTypeCategory": "imaging",
        "summary": "Sağ üst lob santral kitle ve üst mediastende venöz dönüşü daraltan yumuşak doku kitlesi izlenir.",
        "clinicalMeaning": "Obstrüksiyonun anatomik yeri ve olası malign kaynak gösterilir; doku tanısı için hedef belirlenir.",
        "result": {
          "title": "Kontrastlı toraks BT",
          "summary": "Sağ üst lob santral kitle ve üst mediastende venöz dönüşü daraltan yumuşak doku kitlesi izlenir.",
          "interpretation": "Üst mediastinal venöz dönüşte belirgin daralma ve kollateral venler mevcuttur.",
          "values": [
            [
              "Sağ üst lob",
              "4.8 cm santral kitle",
              "Kitle yok",
              "Anormal"
            ],
            [
              "Üst mediasten",
              "Kitle/lenf nodu konglomerasyonu ile belirgin bası",
              "Bası yok",
              "Anormal"
            ],
            [
              "Santral venöz yapı",
              "Yaklaşık %80 lümen daralması",
              "Patent",
              "Belirgin daralma"
            ],
            [
              "Kollateraller",
              "Azigos ve göğüs duvarı venlerinde genişleme",
              "Belirgin değil",
              "Artmış"
            ],
            [
              "Trakea",
              "Hafif sola itilmiş, kritik daralma yok",
              "Orta hatta",
              "Kritik hava yolu basısı yok"
            ]
          ]
        }
      },
      {
        "id": "v309-new-735-doku-plan",
        "label": "Doku tanısı için hedef lezyon değerlendirmesi",
        "title": "Doku tanısı için hedef lezyon değerlendirmesi",
        "orderLabel": "Doku tanısı için hedef lezyon değerlendirmesi",
        "type": "procedurePlanning",
        "priority": "essential",
        "subtype": "Bronkoskopi/EBUS planı",
        "category": "procedure",
        "testTypeCategory": "procedure",
        "summary": "EBUS ile örneklenebilecek mediastinal nodal kitle ve bronkoskopik erişime uygun santral lezyon vardır.",
        "clinicalMeaning": "Kesin onkolojik tedaviye geçmeden histolojik tanı alma olanağı mevcuttur.",
        "result": {
          "title": "Doku örnekleme planı",
          "summary": "EBUS ile örneklenebilecek mediastinal nodal kitle ve bronkoskopik erişime uygun santral lezyon vardır.",
          "interpretation": "Minimal invaziv doku tanısı teknik olarak mümkün görünmektedir.",
          "values": [
            [
              "EBUS hedefi",
              "Sağ paratrakeal nodal kitle",
              "Hedef yok",
              "Uygun"
            ],
            [
              "Bronkoskopik hedef",
              "Sağ üst lob santral endobronşiyal daralma",
              "Yok",
              "Uygun"
            ],
            [
              "Acil entübasyon gereksinimi",
              "Yok",
              "Yok",
              "Şimdilik yok"
            ],
            [
              "Beyin ödemi bulgusu",
              "Klinik olarak yok",
              "Yok",
              "Saptanmadı"
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
    "question": "Bu hastada mevcut stabilite düzeyine göre en uygun öncelikli yaklaşım aşağıdakilerden hangisidir?",
    "questionType": "Onkolojik acil / tanısal-yönetim yaklaşımı",
    "answerTarget": "Stabil santral venöz dönüş obstrüksiyonunda destek, kontrastlı görüntüleme ve doku tanısı önceliğini seçme.",
    "diagnosis": {
      "correct": "Baş yükseltme ve semptomatik destek sağlarken kontrastlı toraks görüntülemesini tamamlayıp en güvenli yoldan doku tanısı almak",
      "options": [
        "Baş yükseltme ve semptomatik destek sağlarken kontrastlı toraks görüntülemesini tamamlayıp en güvenli yoldan doku tanısı almak",
        "Histoloji beklemeden aynı gün ampirik küratif kemoterapi başlamak",
        "Kalp yetmezliği kabul edip yüksek doz intravenöz loop diüretik ile izlemek",
        "Antibiyotik ve bronkodilatör verip taburculuk sonrası poliklinik BT randevusu planlamak",
        "Akut pulmoner emboli kabul edip görüntüleme olmadan trombolitik tedavi uygulamak"
      ],
      "question": "Bu hastada mevcut stabilite düzeyine göre en uygun öncelikli yaklaşım aşağıdakilerden hangisidir?",
      "explanation": "Yüz-boyun ödemi, pletora, üst göğüs duvarı venöz kollateralleri, ortopne benzeri pozisyonel yakınma ve toraks BT'de santral kitleyle venöz lümen daralması santral venöz dönüş obstrüksiyonunu destekler. Hasta belirgin stridor, bilinç bozukluğu veya serebral ödem bulgusu göstermediği için kontrolsüz ampirik kemoterapi/radyoterapiye atlamak yerine destek tedavisi, anatomik doğrulama ve doku tanısı önceliklidir. Doku tanısı tedavi seçimini belirler; küçük hücreli akciğer kanseri, küçük hücreli dışı akciğer kanseri, lenfoma veya trombotik nedenlerde yaklaşım farklıdır.",
      "pearls": [
        "Yüz-boyun ödemi + göğüs duvarı kollateralleri santral venöz obstrüksiyonu düşündürür.",
        "Hava yolu veya serebral ödem yoksa doku tanısı tedavi seçimi için kritik önceliktir.",
        "Ampirik radyoterapi/kemoterapi histolojiyi zorlaştırabilir ve yanlış tedaviye yol açabilir.",
        "Kalp yetmezliğinde yaygın alt ekstremite ödemi, kardiyomegali ve pulmoner konjesyon daha belirgin beklenir."
      ],
      "optionFeedback": {
        "Baş yükseltme ve semptomatik destek sağlarken kontrastlı toraks görüntülemesini tamamlayıp en güvenli yoldan doku tanısı almak": "Bu seçenek en uygundur. Hasta üst gövde venöz dönüşünün engellendiğini düşündüren yüz-boyun ödemi, pletora, boyun venlerinde dolgunluk ve göğüs duvarı kollateralleriyle başvuruyor. BT, obstrüksiyonun anatomik yerini ve olası malign kaynağı göstermiş; ancak kesin tedavi histolojik tipe göre değişeceği için EBUS/bronkoskopi gibi güvenli bir yolla doku tanısı alınmalıdır. Stridor, ağır hipoksemi, bilinç bozukluğu veya serebral ödem yoksa ampirik tedaviyle histolojiyi bozmadan tanısal süreci hızlandırmak en rasyonel yaklaşımdır.",
        "Histoloji beklemeden aynı gün ampirik küratif kemoterapi başlamak": "Küratif veya sistemik onkolojik tedavi tümör tipine, evreye ve moleküler özelliklere göre belirlenir. Küçük hücreli akciğer kanseri, lenfoma ve küçük hücreli dışı akciğer kanseri aynı tedaviyi almaz. Acil hava yolu veya nörolojik tehdit varsa palyatif radyoterapi, stent veya steroid gibi köprü kararları gündeme gelebilir; fakat bu vakada doku tanısı alınabilecek ve hasta henüz kritik instabil değildir. Histoloji olmadan kemoterapi başlamak hem yanlış tedavi riskini artırır hem de tanı materyalini bozabilir.",
        "Kalp yetmezliği kabul edip yüksek doz intravenöz loop diüretik ile izlemek": "Kalp yetmezliği yüzeyel venöz dolgunluk ve ortopne yapabilir; ancak bu hastada yüz-boyun ağırlıklı ödem, üst göğüs duvarında kollateral venler, normal kardiyotorasik oran, alt ekstremite ödeminin olmaması ve BT'de santral kitleyle lümen daralması farklı bir mekanizmayı destekler. Diüretik santral venöz obstrüksiyonu açmaz ve doku tanısını geciktirir. Kalp yetmezliği olsaydı akciğerlerde raller, kardiyomegali, BNP yüksekliği ve yaygın sıvı yükü bulguları daha beklenirdi.",
        "Antibiyotik ve bronkodilatör verip taburculuk sonrası poliklinik BT randevusu planlamak": "Balgamlı ateşli enfeksiyon veya wheezing baskın bir obstrüktif hava yolu atağı bu tabloda ana mekanizma değildir. Üç haftalık progresif yüz-boyun şişliği, kollateral venler ve mediastinal kitle acil/öncelikli değerlendirme gerektirir. Poliklinik randevusuna bırakmak, obstrüksiyonun ilerleyip hava yolu veya serebral venöz basınç komplikasyonlarına yol açmasına neden olabilir. Bu nedenle görüntüleme ve doku tanısı aynı başvuru sürecinde hızlandırılmalıdır.",
        "Akut pulmoner emboli kabul edip görüntüleme olmadan trombolitik tedavi uygulamak": "Pulmoner emboli ani nefes darlığı, pleuritik ağrı, hipoksemi veya senkopla gelebilir; ancak bu hastada haftalar içinde gelişen yüz-boyun ödemi ve venöz kollateraller ön plandadır. Trombolitik tedavi yalnız belirgin yüksek riskli pulmoner embolide ve uygun kanama riski değerlendirmesiyle düşünülür. BT'de kitle basısı ve kollateral venler verilmişken görüntüleme olmadan tromboliz yapmak hem gereksiz kanama riski doğurur hem de asıl tanı sürecini geciktirir."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "Üst gövde venöz dönüş obstrüksiyonunda yüz-boyun ödemi, pletora, venöz kollateraller ve pozisyonla artan baş basıncı tipiktir. Kritik hava yolu veya nörolojik bulgu yoksa tedavi seçimini belirlemek için kontrastlı görüntüleme ve doku tanısı önceliklidir.",
    "examPearl": "TUS ipucu: yüz-boyun şişliği + göğüs duvarı kollateralleri + mediastinal kitle = santral venöz dönüş obstrüksiyonu; stabil hastada görüntüleme + doku tanısı unutma.",
    "whyCorrect": "Doğru seçenek, hem semptomatik venöz basıncı azaltacak destek basamaklarını hem de malignite tipine göre tedavi seçimini belirleyecek doku tanısını birlikte önceler.",
    "optionComparison": "Yanlış seçenekler kalp yetmezliği, enfeksiyon, pulmoner emboli veya histolojisiz onkolojik tedavi gibi aceleci/uygunsuz yaklaşımları temsil eder; vaka bulguları santral venöz bası ve hızlandırılmış tanısal süreç lehinedir.",
    "evidenceChain": [
      "Sabah artan yüz-göz kapağı şişliği → üst gövde venöz basınç artışı.",
      "Göğüs duvarı venöz kollateralleri → kronikleşen merkezi venöz akım engeli.",
      "Sigara ve kilo kaybı → torasik malignite riskini artırır.",
      "Kontrastlı BT'de santral kitle ve belirgin venöz daralma → anatomik obstrüksiyon kanıtı.",
      "Stridor/bilinç bozukluğu yok → histoloji almadan ampirik tedaviye atlamak yerine kontrollü tanısal süreç."
    ],
    "whyWrong": "Yanlış seçenekler obstrüksiyonun anatomik ve onkolojik doğasını ya görmezden gelir ya da histolojik tanı olmadan geri dönüşü zor tedavilere yönelir.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v309",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V308 cases.js rawCases schema with diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  },
{
    "id": "v309-new-736-sarilik-ve-akut-viral-seroloji-paterni",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "Sarılık ve akut viral seroloji paterni",
    "difficulty": "Orta-Zor",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "Akut hepatoselüler enzim yüksekliği ile HBsAg, anti-HBc IgM, HBeAg ve anti-HBs kombinasyonunu yorumlayarak enfeksiyon evresini ayırt etme.",
    "learningTarget": "Viral hepatit serolojisinde IgM anti-HBc'nin akut enfeksiyonu, anti-HBs'nin bağışıklığı, HBeAg'nin yüksek bulaştırıcılığı desteklediğini öğretme.",
    "demographics": "27 yaşında erkek hasta",
    "setting": "Dahiliye hepatoloji polikliniğine yönlendirilmiş acil değerlendirme",
    "chiefComplaint": "Bir haftadır halsizlik, iştahsızlık, koyu idrar ve gözlerde sararma nedeniyle başvuruyor.",
    "stem": "Hasta yaklaşık on gün önce başlayan belirgin halsizlik ve iştahsızlığın ardından idrar renginin koyulaştığını ve son iki gündür göz aklarında sararma fark ettiğini anlatır. Karın sağ üst tarafında künt bir dolgunluk hissi vardır, ancak şiddetli kolik tarzda ağrı tariflemez. Son bir ay içinde dövme yaptırdığını ve korunmasız cinsel temas öyküsü olduğunu söyler. Düzenli alkol kullanımı yoktur; parasetamol veya bitkisel ürünleri yüksek dozda almadığını belirtir. Daha önce sarılık geçirmemiştir ve aşı kayıtlarını hatırlamamaktadır. Evde ateşi çok yükselmemiş, bilinç bulanıklığı veya kanama fark etmemiştir.",
    "patientIntro": {
      "profile": "27 yaşında erkek hasta, dahiliye hepatoloji polikliniğine yönlendirilmiş acil değerlendirme ortamında inceleniyor.",
      "presentation": "Bir haftadır halsizlik, iştahsızlık, koyu idrar ve gözlerde sararma nedeniyle başvuruyor.",
      "historySummary": "Hasta yaklaşık on gün önce başlayan belirgin halsizlik ve iştahsızlığın ardından idrar renginin koyulaştığını ve son iki gündür göz aklarında sararma fark ettiğini anlatır. Karın sağ üst tarafında künt bir dolgunluk hissi vardır, ancak şiddetli kolik tarzda ağrı tariflemez. Son bir ay içinde dövme yaptırdığını ve korunmasız cinsel temas öyküsü olduğunu söyler. Düzenli alkol kullanımı yoktur; parasetamol veya bitkisel ürünleri yüksek dozda almadığını belirtir. Daha önce sarılık geçirmemiştir ve aşı kayıtlarını hatırlamamaktadır. Evde ateşi çok yükselmemiş, bilinç bulanıklığı veya kanama fark etmemiştir."
    },
    "vitals": {
      "TA": "118/74 mmHg",
      "Nabız": "92/dk",
      "Solunum": "16/dk",
      "SpO2": "%99 oda havasında",
      "Ateş": "37.4 °C",
      "Şok indeksi": "0.78 - perfüzyon iyi, kapiller dolum <2 saniye"
    },
    "exam": [
      "Skleralarda ikter ve hafif cilt sarılığı mevcut.",
      "Karında sağ üst kadranda hafif hassasiyet var; defans veya rebound yok.",
      "Asteriksis, konfüzyon veya belirgin uykuya meyil saptanmıyor.",
      "Hepatosplenomegali belirgin değil; asit bulgusu yok.",
      "Döküntü, yaygın lenfadenopati veya aktif kanama bulgusu izlenmiyor."
    ],
    "investigations": [
      {
        "id": "v309-new-736-karaciger-paneli",
        "label": "Karaciğer biyokimyası",
        "title": "Karaciğer biyokimyası",
        "orderLabel": "Karaciğer biyokimyası",
        "type": "lab",
        "priority": "essential",
        "subtype": "Karaciğer paneli",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Hepatoselüler patern baskındır ve bilirubin yüksekliği eşlik eder.",
        "clinicalMeaning": "Kolestatik tıkanmadan çok hepatosit hasarı ön planda görünür.",
        "result": {
          "title": "Karaciğer paneli",
          "summary": "Hepatoselüler patern baskındır ve bilirubin yüksekliği eşlik eder.",
          "interpretation": "Transaminaz yüksekliği ALP artışından belirgin fazladır.",
          "values": [
            [
              "AST",
              "980 U/L",
              "<40 U/L",
              "Çok yüksek"
            ],
            [
              "ALT",
              "1420 U/L",
              "<45 U/L",
              "Çok yüksek"
            ],
            [
              "ALP",
              "165 U/L",
              "40-130 U/L",
              "Hafif yüksek"
            ],
            [
              "GGT",
              "112 U/L",
              "<60 U/L",
              "Yüksek"
            ],
            [
              "Total bilirubin",
              "5.6 mg/dL",
              "0.2-1.2 mg/dL",
              "Yüksek"
            ],
            [
              "Direkt bilirubin",
              "3.8 mg/dL",
              "<0.3 mg/dL",
              "Yüksek"
            ]
          ]
        }
      },
      {
        "id": "v309-new-736-sentez-fonksiyonu",
        "label": "Karaciğer sentez fonksiyonu ve güvenlik",
        "title": "Karaciğer sentez fonksiyonu ve güvenlik",
        "orderLabel": "Karaciğer sentez fonksiyonu ve güvenlik",
        "type": "lab",
        "priority": "essential",
        "subtype": "INR/albumin",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "INR hafif artmış, ensefalopati bulgusu yoktur.",
        "clinicalMeaning": "Yakın izlem gerekir; akut karaciğer yetmezliği kriterleri şu an tam karşılanmaz.",
        "result": {
          "title": "Sentez fonksiyonu",
          "summary": "INR hafif artmış, ensefalopati bulgusu yoktur.",
          "interpretation": "Ağır koagülopati veya ensefalopati saptanmıyor.",
          "values": [
            [
              "INR",
              "1.3",
              "0.8-1.2",
              "Hafif yüksek"
            ],
            [
              "Albumin",
              "4.1 g/dL",
              "3.5-5.0 g/dL",
              "Normal"
            ],
            [
              "Glukoz",
              "92 mg/dL",
              "70-100 mg/dL",
              "Normal"
            ],
            [
              "Bilinç",
              "Açık, oryante",
              "Açık",
              "Ensefalopati yok"
            ]
          ]
        }
      },
      {
        "id": "v309-new-736-viral-seroloji",
        "label": "Viral hepatit serolojisi",
        "title": "Viral hepatit serolojisi",
        "orderLabel": "Viral hepatit serolojisi",
        "type": "lab",
        "priority": "essential",
        "subtype": "HBV serolojisi",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Yüzey antijeni ve core IgM pozitif, yüzey antikoru negatiftir.",
        "clinicalMeaning": "Yeni gelişmiş aktif hepatotrop viral enfeksiyon paternini destekler.",
        "result": {
          "title": "Viral seroloji",
          "summary": "Yüzey antijeni ve core IgM pozitif, yüzey antikoru negatiftir.",
          "interpretation": "Seroloji paterninde akut dönem enfeksiyon belirteçleri ön plandadır.",
          "values": [
            [
              "HBsAg",
              "Pozitif",
              "Negatif",
              "Pozitif"
            ],
            [
              "Anti-HBs",
              "Negatif",
              "Aşı/iyileşme sonrası pozitif",
              "Negatif"
            ],
            [
              "Total anti-HBc",
              "Pozitif",
              "Negatif",
              "Pozitif"
            ],
            [
              "IgM anti-HBc",
              "Pozitif",
              "Negatif",
              "Pozitif"
            ],
            [
              "HBeAg",
              "Pozitif",
              "Negatif",
              "Pozitif"
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
        "id": "v309-new-736-bt-usg",
        "label": "Batın ultrasonografisi",
        "title": "Batın ultrasonografisi",
        "orderLabel": "Batın ultrasonografisi",
        "type": "imaging",
        "priority": "supportive",
        "subtype": "USG",
        "category": "imaging",
        "testTypeCategory": "imaging",
        "summary": "Safra yollarında genişleme veya taş lehine belirgin bulgu yoktur.",
        "clinicalMeaning": "Tıkanma kaynaklı kolestaz olasılığı geri plandadır.",
        "result": {
          "title": "Batın USG",
          "summary": "Safra yollarında genişleme veya taş lehine belirgin bulgu yoktur.",
          "interpretation": "Ekstrahepatik biliyer obstrüksiyon desteklenmiyor.",
          "values": [
            [
              "Koledok çapı",
              "5 mm",
              "<6 mm",
              "Normal"
            ],
            [
              "Safra kesesi",
              "Taş izlenmedi",
              "Taş yok",
              "Normal"
            ],
            [
              "Karaciğer",
              "Hafif homojen büyüme",
              "Normal boyut",
              "Hafif artmış"
            ],
            [
              "Asit",
              "Yok",
              "Yok",
              "Saptanmadı"
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
    "question": "Bu serolojik patern ve klinik tablo en iyi aşağıdakilerden hangisiyle açıklanır?",
    "questionType": "Laboratuvar paterni / seroloji yorumu",
    "answerTarget": "HBsAg ve IgM anti-HBc pozitifliğini akut enfeksiyon paterninde yorumlama.",
    "diagnosis": {
      "correct": "Akut hepatit B enfeksiyonu ve yüksek bulaştırıcılık göstergesi olan erken aktif replikasyon dönemi",
      "options": [
        "Aşıya bağlı bağışıklık; yalnız anti-HBs pozitifliği beklenen durum",
        "Geçirilmiş ve tamamen iyileşmiş enfeksiyon; anti-HBs ve anti-HBc IgG pozitifliği beklenen durum",
        "Kronik inaktif taşıyıcılık; IgM anti-HBc negatif ve düşük replikasyon beklenen durum",
        "Akut hepatit A enfeksiyonu; HAV IgM pozitifliğiyle tanımlanan durum",
        "Akut hepatit B enfeksiyonu ve yüksek bulaştırıcılık göstergesi olan erken aktif replikasyon dönemi"
      ],
      "question": "Bu serolojik patern ve klinik tablo en iyi aşağıdakilerden hangisiyle açıklanır?",
      "explanation": "Hepatoselüler enzim yüksekliği, sarılık, riskli temas öyküsü, HBsAg pozitifliği ve özellikle IgM anti-HBc pozitifliği akut hepatit B enfeksiyonunu destekler. Anti-HBs negatifliği henüz koruyucu bağışıklık gelişmediğini, HBeAg pozitifliği ise viral replikasyon ve bulaştırıcılığın yüksek olabileceğini gösterir. Aşı bağışıklığında anti-HBs tek başına pozitif olur; geçirilmiş enfeksiyonda anti-HBs ile total anti-HBc pozitif, IgM anti-HBc negatif beklenir.",
      "pearls": [
        "IgM anti-HBc akut HBV enfeksiyonunun en önemli serolojik ipuçlarından biridir.",
        "Aşı bağışıklığında anti-HBc pozitif olmaz; yalnız anti-HBs beklenir.",
        "HBeAg pozitifliği aktif replikasyon/bulaştırıcılık ile ilişkilidir.",
        "Akut hepatit tablosunda INR ve bilinç durumu akut karaciğer yetmezliği açısından mutlaka izlenir."
      ],
      "optionFeedback": {
        "Aşıya bağlı bağışıklık; yalnız anti-HBs pozitifliği beklenen durum": "Aşı bağışıklığında kişi virüsün core antijeniyle karşılaşmadığı için anti-HBc pozitif olmaz; tipik beklenen patern HBsAg negatif, anti-HBs pozitif ve anti-HBc negatiftir. Bu hastada HBsAg pozitif, total anti-HBc pozitif ve IgM anti-HBc pozitiftir; bu aktif enfeksiyonla uyumludur. Ayrıca transaminazların binli değerlere çıkması ve sarılık aşı bağışıklığıyla açıklanamaz.",
        "Geçirilmiş ve tamamen iyileşmiş enfeksiyon; anti-HBs ve anti-HBc IgG pozitifliği beklenen durum": "Geçirilmiş doğal enfeksiyondan sonra genellikle HBsAg negatifleşir, anti-HBs pozitifleşir ve total anti-HBc yaşam boyu pozitif kalır. IgM anti-HBc akut döneme özgüdür ve iyileşmiş uzak enfeksiyonda beklenmez. Bu hastada anti-HBs negatif ve HBsAg pozitif olduğu için iyileşmiş enfeksiyon değil, aktif süreç düşünülmelidir.",
        "Kronik inaktif taşıyıcılık; IgM anti-HBc negatif ve düşük replikasyon beklenen durum": "Kronik HBV'de HBsAg kalıcı pozitif olabilir; ancak akut semptomatik başlangıçla birlikte IgM anti-HBc pozitifliği kronik inaktif taşıyıcılıktan çok yeni/akut enfeksiyonu destekler. İnaktif taşıyıcılıkta genellikle HBeAg negatif, HBV DNA düşük ve transaminazlar normal veya hafif yüksek olur. Bu vakada ALT 1420 U/L, sarılık ve HBeAg pozitifliği aktif akut hepatit paternine daha uygundur.",
        "Akut hepatit A enfeksiyonu; HAV IgM pozitifliğiyle tanımlanan durum": "Akut hepatit A da halsizlik, sarılık ve yüksek transaminaz yapabilir; ancak tanısı HAV IgM pozitifliğiyle desteklenir ve HBV yüzey antijeni/core IgM paterniyle açıklanmaz. Bu hastanın dövme ve cinsel temas öyküsü, HBsAg pozitifliği, IgM anti-HBc pozitifliği ve HBeAg pozitifliği HBV yönünde özgüldür. HAV seçeneği ancak HAV IgM pozitifliği ve HBV belirteçlerinin negatif olduğu durumda doğru olurdu.",
        "Akut hepatit B enfeksiyonu ve yüksek bulaştırıcılık göstergesi olan erken aktif replikasyon dönemi": "Bu seçenek en uygundur. HBsAg pozitifliği dolaşımda viral yüzey antijeni bulunduğunu, IgM anti-HBc pozitifliği enfeksiyonun akut/erken dönemini, anti-HBs negatifliği henüz koruyucu yüzey antikoru gelişmediğini gösterir. HBeAg pozitifliği de aktif viral replikasyon ve bulaştırıcılık açısından önemlidir. Klinik olarak koyu idrar, sarılık ve çok yüksek ALT/AST değerleri serolojik paternle birlikte akut hepatit B tablosunu destekler."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "Akut HBV enfeksiyonunda HBsAg ve IgM anti-HBc pozitifliği temel paterndir. Anti-HBs iyileşme veya aşılama sonrası bağışıklığı, HBeAg ise yüksek replikasyon/bulaştırıcılık olasılığını destekler.",
    "examPearl": "TUS ipucu: HBsAg (+) + IgM anti-HBc (+) + anti-HBs (-) = akut HBV; HBeAg (+) ise bulaştırıcılık/replikasyon yüksektir.",
    "whyCorrect": "Doğru seçenek, akut hepatoselüler hasarı ve serolojik akut enfeksiyon belirteçlerini aynı viral enfeksiyon evresi altında birleştirir.",
    "optionComparison": "Yanlış seçenekler aşılama, geçirilmiş enfeksiyon, kronik inaktif taşıyıcılık veya HAV enfeksiyonunu temsil eder; bu vakada IgM anti-HBc ve HBsAg birlikteliği ayırıcı belirleyicidir.",
    "evidenceChain": [
      "Koyu idrar + sarılık → konjuge bilirubin artışı olan hepatit tablosu.",
      "ALT 1420 ve AST 980 → hepatoselüler hasar paterni.",
      "HBsAg pozitif → aktif HBV antijeni dolaşımda.",
      "IgM anti-HBc pozitif → akut/erken dönem enfeksiyon lehine.",
      "HBeAg pozitif → aktif replikasyon ve bulaştırıcılık olasılığı yüksek."
    ],
    "whyWrong": "Yanlış seçenekler serolojide beklenen antikor-antijen kombinasyonunu karşılamaz; özellikle anti-HBs negatifliği ve IgM anti-HBc pozitifliği kritik ayırıcıdır.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v309",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V308 cases.js rawCases schema with diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  },
{
    "id": "v309-new-737-boyna-vuran-agri-ve-carpinti",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "Boyna vuran ağrı ve çarpıntı",
    "difficulty": "Orta-Zor",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "Ağrılı tirotoksik tabloda yıkıcı hormon salınımını Graves hastalığından ayırıp antitiroid ilaç yerine semptomatik antiinflamatuvar yaklaşımı seçme.",
    "learningTarget": "Subakut ağrılı tiroid inflamasyonunda düşük TSH-yüksek serbest T4 ile düşük radyoiyot tutulumunun sentez artışından değil depo hormon salınımından kaynaklandığını öğretme.",
    "demographics": "41 yaşında kadın hasta",
    "setting": "Dahiliye endokrinoloji polikliniği",
    "chiefComplaint": "Boynun ön tarafında ağrı, çarpıntı ve halsizlik nedeniyle başvuruyor.",
    "stem": "Hasta iki hafta önce boğaz ağrısı ve burun akıntısıyla başlayan bir üst solunum yolu enfeksiyonundan sonra boynunun ön tarafında hassasiyet geliştiğini anlatır. Ağrı bazen çeneye ve kulağa vurmakta, yutkunmakla ve başını çevirmekle artmaktadır. Son günlerde çarpıntı, ellerde titreme, sıcağa tahammülsüzlük ve uykusuzluk fark etmiştir. İştahı azalmış olmasına rağmen birkaç kilo verdiğini söyler. Gözlerde dışa doğru belirginleşme, çift görme veya ailede benzer tiroid hastalığı öyküsü tariflemez. İyotlu kontrast alma veya amiodaron kullanma öyküsü yoktur.",
    "patientIntro": {
      "profile": "41 yaşında kadın hasta, dahiliye endokrinoloji polikliniğinde değerlendiriliyor.",
      "presentation": "Boynun ön tarafında ağrı, çarpıntı ve halsizlik nedeniyle başvuruyor.",
      "historySummary": "Hasta iki hafta önce boğaz ağrısı ve burun akıntısıyla başlayan bir üst solunum yolu enfeksiyonundan sonra boynunun ön tarafında hassasiyet geliştiğini anlatır. Ağrı bazen çeneye ve kulağa vurmakta, yutkunmakla ve başını çevirmekle artmaktadır. Son günlerde çarpıntı, ellerde titreme, sıcağa tahammülsüzlük ve uykusuzluk fark etmiştir. İştahı azalmış olmasına rağmen birkaç kilo verdiğini söyler. Gözlerde dışa doğru belirginleşme, çift görme veya ailede benzer tiroid hastalığı öyküsü tariflemez. İyotlu kontrast alma veya amiodaron kullanma öyküsü yoktur."
    },
    "vitals": {
      "TA": "122/72 mmHg",
      "Nabız": "116/dk",
      "Solunum": "18/dk",
      "SpO2": "%98 oda havasında",
      "Ateş": "37.8 °C",
      "Şok indeksi": "0.95 - perfüzyon iyi, kapiller dolum <2 saniye"
    },
    "exam": [
      "Tiroid bezi difüz hassas, hafif büyümüş ve palpasyonla ağrılıdır.",
      "İnce tremor ve hafif sıcak-nemli cilt mevcuttur.",
      "Ekzoftalmi, pretibial miksödem veya belirgin oftalmopati yok.",
      "Servikal lenf nodları küçük ve hassas; akut süpüratif odak düşündüren fluktuasyon yok.",
      "Kalp oskültasyonunda taşikardi dışında yeni üfürüm duyulmuyor."
    ],
    "investigations": [
      {
        "id": "v309-new-737-tiroid-fonksiyon",
        "label": "Tiroid fonksiyon testleri",
        "title": "Tiroid fonksiyon testleri",
        "orderLabel": "Tiroid fonksiyon testleri",
        "type": "lab",
        "priority": "essential",
        "subtype": "TSH/sT4/sT3",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "TSH baskılı, serbest tiroid hormonları yüksektir.",
        "clinicalMeaning": "Tirotoksik biyokimyasal tablo vardır; neden sentez artışı veya yıkıcı salınım olabilir.",
        "result": {
          "title": "Tiroid paneli",
          "summary": "TSH baskılı, serbest tiroid hormonları yüksektir.",
          "interpretation": "Tirotoksik biyokimya saptanır.",
          "values": [
            [
              "TSH",
              "<0.01 mIU/L",
              "0.4-4.0 mIU/L",
              "Baskılı"
            ],
            [
              "Serbest T4",
              "2.6 ng/dL",
              "0.8-1.8 ng/dL",
              "Yüksek"
            ],
            [
              "Serbest T3",
              "5.1 pg/mL",
              "2.3-4.2 pg/mL",
              "Yüksek"
            ],
            [
              "T3/T4 oranı",
              "Belirgin T3 baskınlığı yok",
              "Graves'te T3 baskınlığı olabilir",
              "Ayırıcı destek"
            ]
          ]
        }
      },
      {
        "id": "v309-new-737-inflamasyon",
        "label": "İnflamasyon belirteçleri",
        "title": "İnflamasyon belirteçleri",
        "orderLabel": "İnflamasyon belirteçleri",
        "type": "lab",
        "priority": "important",
        "subtype": "ESR/CRP",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "ESR ve CRP belirgin yüksektir.",
        "clinicalMeaning": "Ağrılı inflamatuvar tiroid sürecini destekler.",
        "result": {
          "title": "ESR ve CRP",
          "summary": "ESR ve CRP belirgin yüksektir.",
          "interpretation": "Sistemik inflamasyon belirgindir.",
          "values": [
            [
              "ESR",
              "86 mm/saat",
              "<20 mm/saat",
              "Yüksek"
            ],
            [
              "CRP",
              "64 mg/L",
              "<5 mg/L",
              "Yüksek"
            ],
            [
              "Lökosit",
              "8.900/mm³",
              "4.000-10.000/mm³",
              "Normal"
            ],
            [
              "Prokalsitonin",
              "0.05 ng/mL",
              "<0.1 ng/mL",
              "Normal"
            ]
          ]
        }
      },
      {
        "id": "v309-new-737-otoantikor",
        "label": "Tiroid otoantikorları",
        "title": "Tiroid otoantikorları",
        "orderLabel": "Tiroid otoantikorları",
        "type": "lab",
        "priority": "important",
        "subtype": "TRAb/anti-TPO",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "TSH reseptör antikoru negatif, anti-TPO düşük düzeyde/negatif sınırlardadır.",
        "clinicalMeaning": "Otoimmün hormon sentez artışı lehine güçlü veri yoktur.",
        "result": {
          "title": "Otoantikorlar",
          "summary": "TSH reseptör antikoru negatif, anti-TPO düşük düzeyde/negatif sınırlardadır.",
          "interpretation": "Graves tipi uyarıcı antikor paterni desteklenmez.",
          "values": [
            [
              "TRAb",
              "Negatif",
              "Negatif",
              "Negatif"
            ],
            [
              "Anti-TPO",
              "28 IU/mL",
              "<35 IU/mL",
              "Normal"
            ],
            [
              "Anti-tiroglobulin",
              "Sınırda negatif",
              "Negatif",
              "Negatif"
            ]
          ]
        }
      },
      {
        "id": "v309-new-737-uptake-usg",
        "label": "Tiroid görüntüleme ve tutulum",
        "title": "Tiroid görüntüleme ve tutulum",
        "orderLabel": "Tiroid görüntüleme ve tutulum",
        "type": "imaging",
        "priority": "essential",
        "subtype": "USG/sintigrafi",
        "category": "imaging",
        "testTypeCategory": "imaging",
        "summary": "Tiroidde heterojen hipoekoik alanlar ve düşük radyoiyot tutulum paterni vardır.",
        "clinicalMeaning": "Hormon sentezinin artmasından çok folikül hasarıyla depo hormon salınımı desteklenir.",
        "result": {
          "title": "USG ve tutulum değerlendirmesi",
          "summary": "Tiroidde heterojen hipoekoik alanlar ve düşük radyoiyot tutulum paterni vardır.",
          "interpretation": "Tirotoksik tabloya rağmen tutulum düşüktür.",
          "values": [
            [
              "Tiroid USG",
              "Yamalı hipoekoik alanlar, hafif büyüme",
              "Homojen parankim",
              "Anormal"
            ],
            [
              "Doppler vaskülarite",
              "Belirgin artış yok",
              "Aşırı artış yok",
              "Graves lehine değil"
            ],
            [
              "24 saat radyoiyot tutulumu",
              "%2",
              "%10-30",
              "Düşük"
            ],
            [
              "Nodül",
              "Otonom sıcak nodül izlenmedi",
              "Yok",
              "Saptanmadı"
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
    "question": "Bu hastada tirotoksik görünümü en iyi açıklayan mekanizma ve uygun yaklaşım aşağıdakilerden hangisidir?",
    "questionType": "Mekanizma / tedavi yaklaşımı",
    "answerTarget": "Ağrılı düşük tutulumlu tirotoksik tabloda yıkıcı tiroiditi tanıyıp antitiroid ilaçtan kaçınma.",
    "diagnosis": {
      "correct": "Folikül yıkımına bağlı önceden sentezlenmiş hormon salınımı; ağrı için NSAİİ/gerekirse glukokortikoid ve çarpıntı için beta bloker kullanmak",
      "options": [
        "TSH reseptör uyarıcı antikorlarına bağlı artmış hormon sentezi; metimazol ve gerekirse radyoiyot tedavisi başlamak",
        "Folikül yıkımına bağlı önceden sentezlenmiş hormon salınımı; ağrı için NSAİİ/gerekirse glukokortikoid ve çarpıntı için beta bloker kullanmak",
        "Otonom toksik nodül kaynaklı hormon üretimi; nodül ablasyonu için doğrudan cerrahi planlamak",
        "İyot fazlalığına bağlı hormon sentezi; yüksek doz iyot solüsyonu ile hormon çıkışını baskılamak",
        "Akut bakteriyel tiroid apsesi; geniş spektrumlu antibiyotik ve acil cerrahi drenaj yapmak"
      ],
      "question": "Bu hastada tirotoksik görünümü en iyi açıklayan mekanizma ve uygun yaklaşım aşağıdakilerden hangisidir?",
      "explanation": "Üst solunum yolu enfeksiyonu sonrası boyuna/çeneye vuran ağrılı tiroid hassasiyeti, yüksek ESR/CRP, baskılı TSH-yüksek serbest T4 ve düşük radyoiyot tutulumu yıkıcı tiroid inflamasyonunu destekler. Bu durumda hormon fazlalığı yeni sentezin artmasından değil, foliküllerde depolanmış hormonun dolaşıma salınmasından kaynaklanır. Bu nedenle metimazol gibi sentezi bloke eden antitiroid ilaçlar temel tedavi değildir; ağrı/inflamasyon için NSAİİ veya ağır olguda glukokortikoid, adrenerjik semptomlar için beta bloker tercih edilir.",
      "pearls": [
        "Ağrılı tiroid + ESR yüksekliği + düşük radyoiyot tutulumu = yıkıcı tiroidit paternidir.",
        "Graves'te tutulum ve vaskülarite genellikle artar; TRAb pozitif olabilir.",
        "Yıkıcı tiroiditte metimazol etkisizdir çünkü sorun yeni hormon sentezi değildir.",
        "Tirotoksik fazdan sonra geçici hipotiroid faz gelişebilir."
      ],
      "optionFeedback": {
        "TSH reseptör uyarıcı antikorlarına bağlı artmış hormon sentezi; metimazol ve gerekirse radyoiyot tedavisi başlamak": "Bu seçenek Graves hastalığının mekanizmasını ve tedavisini anlatır. Graves'te genellikle ağrısız diffüz guatr, oftalmopati, TRAb pozitifliği, artmış Doppler vaskülarite ve artmış radyoiyot tutulumu beklenir. Bu vakada tiroid ağrılıdır, ESR/CRP yüksektir, TRAb negatiftir ve radyoiyot tutulumu çok düşüktür. Metimazol yeni hormon sentezini azaltır; fakat folikül yıkımıyla salınmış hazır hormon fazlalığında temel sorunu çözmez.",
        "Folikül yıkımına bağlı önceden sentezlenmiş hormon salınımı; ağrı için NSAİİ/gerekirse glukokortikoid ve çarpıntı için beta bloker kullanmak": "Bu seçenek en uygundur. ÜSYE sonrası ağrılı tiroid, çeneye/kulağa vuran hassasiyet, yüksek ESR/CRP ve düşük radyoiyot tutulumu yıkıcı inflamatuvar tiroid sürecini destekler. Tirotoksik biyokimya olmasına rağmen bez yeni hormon sentezlemeyi artırmadığı için tutulum düşüktür; dolaşımdaki hormonlar hasarlı foliküllerden salınır. Bu nedenle tedavi semptom ve inflamasyon kontrolüne yönelir: ağrı için NSAİİ, ağır veya dirençli ağrıda glukokortikoid, çarpıntı/tremor için beta bloker. Sonrasında geçici hipotiroid faz açısından izlem gerekir.",
        "Otonom toksik nodül kaynaklı hormon üretimi; nodül ablasyonu için doğrudan cerrahi planlamak": "Toksik adenom veya toksik multinodüler guatrda tirotoksik tablo otonom hormon üretiminden kaynaklanır ve sintigrafide sıcak nodül ya da odaklanmış artmış tutulum beklenir. Bu hastada ağrılı diffüz tiroid hassasiyeti, inflamasyon belirteçlerinin yüksekliği ve düşük radyoiyot tutulumu vardır; otonom nodül lehine görüntüleme bulgusu verilmemiştir. Cerrahi/ablasyon yaklaşımı bu klinik patern için ilk basamak değildir.",
        "İyot fazlalığına bağlı hormon sentezi; yüksek doz iyot solüsyonu ile hormon çıkışını baskılamak": "İyot ilişkili tirotoksikoz iyotlu kontrast veya amiodaron gibi maruziyetlerden sonra görülebilir. Bu hasta böyle bir maruziyet tariflemiyor ve ana ipuçları ağrılı tiroid + yüksek ESR/CRP + düşük tutulumdur. Yüksek doz iyot solüsyonları tiroid fırtınası gibi seçilmiş durumlarda antitiroid ilaçtan sonra kullanılabilir; bu vakada mekanizma ve tedavi hedefi farklıdır. Yanlış iyot kullanımı gereksiz ve potansiyel olarak sakıncalı olabilir.",
        "Akut bakteriyel tiroid apsesi; geniş spektrumlu antibiyotik ve acil cerrahi drenaj yapmak": "Süpüratif tiroidit/apse genellikle daha toksik görünüm, yüksek ateş, belirgin lökositoz, lokal fluktuasyon veya görüntülemede koleksiyonla beklenir. Bu vakada prokalsitonin ve lökosit belirgin yüksek değil, USG'de apse koleksiyonu yok ve tablo ÜSYE sonrası yıkıcı ağrılı inflamasyonla uyumludur. Antibiyotik ve cerrahi drenaj apse varsa doğru olurdu; ancak burada verilen veriler desteklemiyor."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "Ağrılı subakut tiroid inflamasyonunda tirotoksik faz, artmış sentezden değil folikül yıkımıyla depolanmış hormon salınımından kaynaklanır. Düşük radyoiyot tutulumu bu ayrımın temel ipucudur; tedavi semptomatik ve antiinflamatuvardır.",
    "examPearl": "TUS ipucu: ağrılı tiroid + ESR yüksek + TSH düşük/T4 yüksek + radyoiyot tutulumu düşük = subakut tiroidit; metimazol değil NSAİİ/beta bloker düşün.",
    "whyCorrect": "Doğru seçenek düşük tutulumlu tirotoksik tablonun sentez artışı değil yıkıcı hormon salınımı olduğunu açıklar ve tedaviyi buna göre seçer.",
    "optionComparison": "Yanlış seçenekler Graves, toksik nodül, iyot ilişkili tirotoksikoz veya bakteriyel apseyi temsil eder; bu vakada ağrı, inflamasyon ve düşük tutulum ayırıcıdır.",
    "evidenceChain": [
      "ÜSYE sonrası boyna/çeneye vuran ağrı → ağrılı inflamatuvar tiroid süreci.",
      "TSH baskılı + sT4/sT3 yüksek → tirotoksik biyokimya.",
      "ESR 86 ve CRP 64 → belirgin inflamasyon.",
      "TRAb negatif ve Doppler vaskülarite artmamış → Graves lehine güçlü veri yok.",
      "Radyoiyot tutulumu %2 → yeni hormon sentezinden çok yıkıcı salınım."
    ],
    "whyWrong": "Yanlış seçenekler tirotoksikozun farklı mekanizmalarını hedefler; bu vakada en belirleyici ayrım düşük radyoiyot tutulumu ve ağrılı inflamasyondur.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v309",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V308 cases.js rawCases schema with diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  },
{
    "id": "v309-new-738-tekrarlayan-agiz-yarasi-genital-ulser-ve-goz-kizarikligi",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "Tekrarlayan ağız yarası, genital ülser ve göz kızarıklığı",
    "difficulty": "Zor",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "Mukokütanöz ülserler, üveit ve venöz tromboz birlikteliğinde değişken damar vaskülitini diğer romatolojik ve enfeksiyöz nedenlerden ayırma.",
    "learningTarget": "Behçet hastalığında rekürren oral aft, skarlı genital ülser, göz tutulumu, eritema nodozum benzeri lezyon ve venöz trombozun aynı klinik spektrumda birleştiğini öğretme.",
    "demographics": "29 yaşında erkek hasta",
    "setting": "Dahiliye romatoloji polikliniği ve göz hastalıkları konsültasyonu",
    "chiefComplaint": "Tekrarlayan ağız yaraları, genital bölgede ağrılı ülser izi ve göz kızarıklığı nedeniyle başvuruyor.",
    "stem": "Hasta yaklaşık üç yıldır ayda birkaç kez ağrılı ağız yaraları çıktığını, son altı ayda genital bölgede daha derin ve iz bırakarak iyileşen yaralar fark ettiğini anlatır. Son iki haftadır sağ gözünde kızarıklık, ışığa bakınca ağrı ve bulanık görme geliştiği için başvurmuştur. Zaman zaman diz ve ayak bileğinde şişlik olduğunu, bacak ön yüzünde ağrılı kızarık kabarıklıkların çıkıp kaybolduğunu söyler. Bir yıl önce sol baldırında şişlik nedeniyle damar pıhtısı tedavisi aldığını belirtir. Kronik ishal, kanlı dışkı, yeni cinsel yolla bulaşan enfeksiyon tanısı veya sürekli bel tutukluğu tariflemez. Ailesinde benzer ağız yaraları olan bir akrabası olduğunu ekler.",
    "patientIntro": {
      "profile": "29 yaşında erkek hasta, dahiliye romatoloji polikliniği ve göz hastalıkları konsültasyonu ortamında değerlendiriliyor.",
      "presentation": "Tekrarlayan ağız yaraları, genital bölgede ağrılı ülser izi ve göz kızarıklığı nedeniyle başvuruyor.",
      "historySummary": "Hasta yaklaşık üç yıldır ayda birkaç kez ağrılı ağız yaraları çıktığını, son altı ayda genital bölgede daha derin ve iz bırakarak iyileşen yaralar fark ettiğini anlatır. Son iki haftadır sağ gözünde kızarıklık, ışığa bakınca ağrı ve bulanık görme geliştiği için başvurmuştur. Zaman zaman diz ve ayak bileğinde şişlik olduğunu, bacak ön yüzünde ağrılı kızarık kabarıklıkların çıkıp kaybolduğunu söyler. Bir yıl önce sol baldırında şişlik nedeniyle damar pıhtısı tedavisi aldığını belirtir. Kronik ishal, kanlı dışkı, yeni cinsel yolla bulaşan enfeksiyon tanısı veya sürekli bel tutukluğu tariflemez. Ailesinde benzer ağız yaraları olan bir akrabası olduğunu ekler."
    },
    "vitals": {
      "TA": "116/72 mmHg",
      "Nabız": "88/dk",
      "Solunum": "16/dk",
      "SpO2": "%99 oda havasında",
      "Ateş": "37.2 °C",
      "Şok indeksi": "0.76 - perfüzyon iyi, kapiller dolum <2 saniye"
    },
    "exam": [
      "Oral mukozada farklı evrelerde iki aftöz ülser görülüyor.",
      "Skrotal bölgede ağrılı ülser iyileşmesine ait skar alanları izleniyor.",
      "Sağ gözde siliyer enjeksiyon ve fotofobi mevcut; görme keskinliği hasta ifadesine göre azalmış.",
      "Her iki tibia ön yüzde eritema nodozum benzeri hassas nodüller var.",
      "Sakroiliak bası ağrısı belirgin değil; periferik nörolojik defisit yok."
    ],
    "investigations": [
      {
        "id": "v309-new-738-goz",
        "label": "Göz hastalıkları değerlendirmesi",
        "title": "Göz hastalıkları değerlendirmesi",
        "orderLabel": "Göz hastalıkları değerlendirmesi",
        "type": "clinical",
        "priority": "essential",
        "subtype": "Üveit değerlendirmesi",
        "category": "clinicalAssessment",
        "testTypeCategory": "clinicalAssessment",
        "summary": "Sağ gözde anterior ve posterior segment inflamasyon bulguları saptanır.",
        "clinicalMeaning": "Sistemik inflamatuvar hastalıkta organ tutulumunu ve tedavi aciliyetini artırır.",
        "result": {
          "title": "Oftalmolojik muayene",
          "summary": "Sağ gözde anterior ve posterior segment inflamasyon bulguları saptanır.",
          "interpretation": "Göz tutulumu aktif inflamatuvar süreçle uyumludur.",
          "values": [
            [
              "Ön kamara",
              "Hücre 2+",
              "Hücre yok",
              "Anormal"
            ],
            [
              "Vitreus",
              "Hafif hücre",
              "Hücre yok",
              "Anormal"
            ],
            [
              "Retina",
              "Perivasküler inflamatuvar odaklar",
              "Normal",
              "Anormal"
            ],
            [
              "Göz içi basıncı",
              "15 mmHg",
              "10-21 mmHg",
              "Normal"
            ]
          ]
        }
      },
      {
        "id": "v309-new-738-inflamasyon",
        "label": "İnflamasyon ve temel laboratuvar",
        "title": "İnflamasyon ve temel laboratuvar",
        "orderLabel": "İnflamasyon ve temel laboratuvar",
        "type": "lab",
        "priority": "important",
        "subtype": "ESR/CRP/hemogram",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Aktif inflamasyonu destekleyen orta düzey belirteç yüksekliği vardır.",
        "clinicalMeaning": "Sistemik inflamatuvar aktiviteyle uyumludur; tek başına özgül değildir.",
        "result": {
          "title": "Laboratuvar",
          "summary": "Aktif inflamasyonu destekleyen orta düzey belirteç yüksekliği vardır.",
          "interpretation": "İnflamasyon belirteçleri yüksek; böbrek ve karaciğer fonksiyonları korunmuş.",
          "values": [
            [
              "ESR",
              "48 mm/saat",
              "<20 mm/saat",
              "Yüksek"
            ],
            [
              "CRP",
              "38 mg/L",
              "<5 mg/L",
              "Yüksek"
            ],
            [
              "Lökosit",
              "9.600/mm³",
              "4.000-10.000/mm³",
              "Normal-yüksek"
            ],
            [
              "Kreatinin",
              "0.8 mg/dL",
              "0.6-1.2 mg/dL",
              "Normal"
            ],
            [
              "ALT",
              "28 U/L",
              "<45 U/L",
              "Normal"
            ]
          ]
        }
      },
      {
        "id": "v309-new-738-enfeksiyon-disla",
        "label": "Enfeksiyöz ayırıcı testler",
        "title": "Enfeksiyöz ayırıcı testler",
        "orderLabel": "Enfeksiyöz ayırıcı testler",
        "type": "lab",
        "priority": "important",
        "subtype": "HSV/sifiliz/HIV",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Sık taklit eden enfeksiyonlar için tarama negatif bulunur.",
        "clinicalMeaning": "Tekrarlayan ülserlerin yalnız enfeksiyöz nedenlerle açıklanma olasılığını azaltır.",
        "result": {
          "title": "Enfeksiyon taraması",
          "summary": "Sık taklit eden enfeksiyonlar için tarama negatif bulunur.",
          "interpretation": "HSV, sifiliz ve HIV taraması negatif.",
          "values": [
            [
              "HSV PCR (aktif ülser sürüntüsü)",
              "Negatif",
              "Negatif",
              "Negatif"
            ],
            [
              "VDRL/RPR",
              "Negatif",
              "Negatif",
              "Negatif"
            ],
            [
              "HIV Ag/Ab",
              "Negatif",
              "Negatif",
              "Negatif"
            ],
            [
              "Üretral akıntı",
              "Yok",
              "Yok",
              "Saptanmadı"
            ]
          ]
        }
      },
      {
        "id": "v309-new-738-vaskuler",
        "label": "Vasküler öykü ve Doppler kaydı",
        "title": "Vasküler öykü ve Doppler kaydı",
        "orderLabel": "Vasküler öykü ve Doppler kaydı",
        "type": "imaging",
        "priority": "supportive",
        "subtype": "Venöz Doppler kaydı",
        "category": "imaging",
        "testTypeCategory": "imaging",
        "summary": "Önceki yılda sol popliteal-krural ven trombozu belgelenmiştir.",
        "clinicalMeaning": "Venöz damar tutulumu sistemik değişken damar vasküliti spektrumunu destekler.",
        "result": {
          "title": "Önceki Doppler raporu",
          "summary": "Önceki yılda sol popliteal-krural ven trombozu belgelenmiştir.",
          "interpretation": "Genç yaşta açıklanamayan venöz tromboz öyküsü mevcuttur.",
          "values": [
            [
              "Sol popliteal ven",
              "Kısmi tromboz, önceki raporda",
              "Patent",
              "Anormal"
            ],
            [
              "Provokan faktör",
              "Uzun immobilizasyon/cerrahi yok",
              "Yok",
              "Açıklanamayan"
            ],
            [
              "Antikoagülasyon süresi",
              "6 ay kullanmış",
              "Klinik duruma göre",
              "Tamamlanmış"
            ],
            [
              "Güncel bacak Doppler",
              "Yeni akut tromboz yok",
              "Yok",
              "Saptanmadı"
            ]
          ]
        }
      },
      {
        "id": "v309-new-738-paterji",
        "label": "Paterji testi",
        "title": "Paterji testi",
        "orderLabel": "Paterji testi",
        "type": "clinical",
        "priority": "supportive",
        "subtype": "Paterji",
        "category": "clinicalAssessment",
        "testTypeCategory": "clinicalAssessment",
        "summary": "Steril iğne giriş yerinde 48 saat sonra papülopüstüler reaksiyon gelişir.",
        "clinicalMeaning": "Tanısal değildir fakat uygun klinik bağlamda destekleyici bir bulgudur.",
        "result": {
          "title": "Paterji sonucu",
          "summary": "Steril iğne giriş yerinde 48 saat sonra papülopüstüler reaksiyon gelişir.",
          "interpretation": "Uygun klinik bağlamda destekleyici pozitif reaksiyon.",
          "values": [
            [
              "48. saat cilt yanıtı",
              "3 mm papülopüstüler lezyon",
              "Reaksiyon yok",
              "Pozitif"
            ],
            [
              "Enfeksiyon bulgusu",
              "Lokal yaygın selülit yok",
              "Yok",
              "Yok"
            ],
            [
              "Test yorumu",
              "Klinikle birlikte destekleyici",
              "Tek başına tanısal değil",
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
    "question": "Bu hastadaki bulguların tamamını en iyi açıklayan tanı aşağıdakilerden hangisidir?",
    "questionType": "Tanı / ayırıcı tanı",
    "answerTarget": "Oral-genital ülser, üveit, eritema nodozum benzeri lezyon ve venöz trombozu tek değişken damar vasküliti altında birleştirme.",
    "diagnosis": {
      "correct": "Behçet hastalığı",
      "options": [
        "Sistemik lupus eritematozus",
        "Reaktif artrit",
        "Crohn hastalığına bağlı ekstraintestinal tutulum",
        "Behçet hastalığı",
        "Tekrarlayan herpes simpleks enfeksiyonu"
      ],
      "question": "Bu hastadaki bulguların tamamını en iyi açıklayan tanı aşağıdakilerden hangisidir?",
      "explanation": "Rekürren ağrılı oral aftlar, skar bırakan genital ülserler, gözde üveit/retinal vaskülit bulguları, eritema nodozum benzeri lezyonlar, paterji pozitifliği ve genç yaşta venöz tromboz öyküsü değişken damarları tutabilen sistemik inflamatuvar vaskülit spektrumunu destekler. Enfeksiyöz ülser nedenleri ve inflamatuvar barsak hastalığı belirtileri desteklenmemiştir. Bu nedenle bulguları en iyi Behçet hastalığı açıklar.",
      "pearls": [
        "Behçet'te oral aft genellikle en sık ve erken bulgudur.",
        "Genital ülserlerin skar bırakması ayırıcı tanıda yardımcıdır.",
        "Üveit/retinal vaskülit organ tehdit edici tutulumdur ve acil uzman tedavisi gerektirir.",
        "Venöz tromboz Behçet'te yalnız hiperkoagülabiliteden değil damar duvarı inflamasyonundan kaynaklanabilir."
      ],
      "optionFeedback": {
        "Sistemik lupus eritematozus": "SLE oral ülser, fotosensitivite, artrit, sitopeni ve böbrek tutulumu yapabilir; ancak skar bırakan genital ülser, paterji pozitifliği, üveit/retinal vaskülit paterni ve genç erkekte venöz trombozla birlikte eritema nodozum benzeri lezyonlar Behçet spektrumuna daha uygundur. SLE'de anti-dsDNA, düşük kompleman, proteinüri/aktif idrar sedimenti veya tipik malar döküntü gibi veriler beklenirdi. Bu vakada böbrek fonksiyonu normal, enfeksiyon taraması negatif ve mukokütanöz-vasküler kombinasyon Behçet lehine daha güçlüdür.",
        "Reaktif artrit": "Reaktif artrit genellikle gastrointestinal veya genitoüriner enfeksiyon sonrası asimetrik oligoartrit, entezit, konjonktivit/üveit ve mukokütanöz bulgularla gelebilir. Ancak bu hastada yıllardır tekrarlayan oral aftlar, skar bırakan genital ülserler, paterji pozitifliği ve açıklanamayan venöz tromboz öyküsü vardır. Reaktif artritte genital lezyonlar genellikle sirkinate balanit gibi farklı karakterdedir ve venöz tromboz/retinal vaskülit kombinasyonu bu kadar tipik değildir. Enfeksiyon tetikleyicisi ve üretral/ishalli başlangıç da verilmemiştir.",
        "Crohn hastalığına bağlı ekstraintestinal tutulum": "Crohn hastalığı oral aft, eritema nodozum, artrit ve üveit gibi ekstraintestinal bulgular yapabilir. Ancak bu hastada kronik ishal, karın ağrısı, kilo kaybı, perianal hastalık veya kanlı dışkı gibi intestinal bir eksen verilmemiştir. Skar bırakan genital ülser, paterji pozitifliği ve venöz tromboz Behçet için daha karakteristik bir birlikteliktir. Crohn doğru olsaydı endoskopik ülserler, transmural bağırsak tutulum bulguları veya belirgin gastrointestinal yakınmalar beklenirdi.",
        "Behçet hastalığı": "Bu seçenek en uygundur. Hastada rekürren oral aftlar, skar bırakan genital ülserler, üveit/retinal vaskülit bulguları, eritema nodozum benzeri nodüller, paterji pozitifliği ve genç yaşta açıklanamayan venöz tromboz öyküsü aynı sistemik inflamatuvar damar hastalığı spektrumunda birleşir. Behçet değişken damarları tutabilen bir vaskülittir; hem mukokütanöz hem oküler hem de venöz tutulum yapabilir. Özellikle göz tutulumu görme kaybı riski nedeniyle hızlı romatoloji-göz işbirliği ve immünsupresif tedavi planı gerektirir.",
        "Tekrarlayan herpes simpleks enfeksiyonu": "HSV ağrılı tekrarlayan genital ülser yapabilir ve bazen oral lezyonlarla birlikte görülebilir; ancak paterji pozitifliği, eritema nodozum benzeri nodüller, üveit/retinal vaskülit ve açıklanamayan venöz tromboz HSV ile açıklanmaz. Ayrıca aktif ülser sürüntüsünde HSV PCR negatif verilmiştir. HSV doğru olsaydı lezyonlar genellikle veziküler başlangıçlı, lokalize ve antiviral tedaviyle belirgin ilişkili olurdu; sistemik değişken damar vasküliti bulguları beklenmezdi."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "Behçet hastalığı rekürren oral aft, genital ülser, oküler inflamasyon, deri lezyonları ve arter/ven tutulumunu birleştirebilen değişken damar vaskülitidir. Tanı klinik örüntüye dayanır; paterji destekleyici olabilir fakat tek başına yeterli değildir.",
    "examPearl": "TUS ipucu: oral aft + skarlı genital ülser + üveit + paterji/eritema nodozum + venöz tromboz = Behçet düşün.",
    "whyCorrect": "Doğru seçenek, mukokütanöz, oküler, dermatolojik ve venöz bulguları tek değişken damar vasküliti çatısı altında açıklar.",
    "optionComparison": "Yanlış seçenekler oral ülser veya artrit yapabilen gerçek ayırıcı tanılardır; ancak skarlı genital ülser, göz tutulumu, paterji ve venöz tromboz kombinasyonu Behçet lehine daha bütüncül bir kanıt sağlar.",
    "evidenceChain": [
      "Yıllardır tekrarlayan oral aft → kronik mukokütanöz inflamasyon.",
      "Skar bırakan genital ülser → Behçet için güçlü klinik ipucu.",
      "Üveit/retinal vaskülit → oküler organ tutulumu.",
      "Eritema nodozum benzeri nodüller + paterji pozitifliği → destekleyici cilt bulguları.",
      "Genç yaşta açıklanamayan venöz tromboz → venöz damar tutulumu olasılığı."
    ],
    "whyWrong": "Yanlış seçenekler bazı bulguları açıklayabilir; ancak bu kadar geniş mukokütanöz-oküler-venöz patern ve negatif enfeksiyon taraması birlikte Behçet tanısını güçlendirir.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v309",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V308 cases.js rawCases schema with diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  },
{
  "id": "v310-new-739-bayilma-ve-kaba-sistolik-ufurum",
  "branchId": "internal-medicine",
  "caseType": "standard",
  "relatedBranch": "İç Hastalıkları",
  "title": "Bayılma ve kaba sistolik üfürüm",
  "difficulty": "Zor",
  "difficultyTag": "TUS düzeyi",
  "clinicalFocus": "Eforla ilişkili senkop, dar nabız basıncı, geç pik yapan sistolik üfürüm ve ekokardiyografik gradyanı birlikte yorumlayarak semptomatik ciddi kapak darlığında prognoz değiştiren yaklaşımı seçme.",
  "learningTarget": "Semptomatik ciddi aort kapak darlığında yalnız medikal izlem veya vazodilatör yaklaşımın yetersiz olduğunu; uygun hastada kapak replasmanı/TAVI-SAVR değerlendirmesinin temel karar olduğunu öğretme.",
  "demographics": "76 yaşında erkek hasta",
  "setting": "Acil servis sonrası kardiyoloji konsültasyonu",
  "chiefComplaint": "Merdiven çıkarken bayılma ve son aylarda artan eforla göğüs sıkışması nedeniyle getiriliyor.",
  "stem": "Hasta son altı aydır yokuş çıkarken göğsünde baskı hissi ve nefes darlığı olduğunu, dinlenince birkaç dakika içinde rahatladığını anlatır. O gün apartman merdiveninin ikinci katında baş dönmesi yaşamış, kısa süreli bayılmış ve yakınları tarafından acile getirilmiştir. Bayılmadan önce çarpıntı, ateş, nöbet benzeri kasılma veya idrar kaçırma olmamıştır. Hipertansiyon için yıllardır düzensiz ilaç kullandığını, son haftalarda günlük işlerini daha yavaş yaptığını söyler. Bilinen aktif kanama, yeni geçirilmiş enfeksiyon veya göğüs travması tariflemez. Ailesi son aylarda yürürken sık durup soluklandığını fark ettiklerini belirtir.",
  "patientIntro": {
    "profile": "76 yaşında erkek hasta, acil servis sonrası kardiyoloji konsültasyonu ortamında değerlendiriliyor.",
    "presentation": "Merdiven çıkarken bayılma ve son aylarda artan eforla göğüs sıkışması nedeniyle getiriliyor.",
    "historySummary": "Hasta son altı aydır yokuş çıkarken göğsünde baskı hissi ve nefes darlığı olduğunu, dinlenince birkaç dakika içinde rahatladığını anlatır. O gün apartman merdiveninin ikinci katında baş dönmesi yaşamış, kısa süreli bayılmış ve yakınları tarafından acile getirilmiştir. Bayılmadan önce çarpıntı, ateş, nöbet benzeri kasılma veya idrar kaçırma olmamıştır. Hipertansiyon için yıllardır düzensiz ilaç kullandığını, son haftalarda günlük işlerini daha yavaş yaptığını söyler. Bilinen aktif kanama, yeni geçirilmiş enfeksiyon veya göğüs travması tariflemez. Ailesi son aylarda yürürken sık durup soluklandığını fark ettiklerini belirtir."
  },
  "vitals": {
    "TA": "108/64 mmHg",
    "Nabız": "84/dk, düzenli",
    "Solunum": "18/dk",
    "SpO2": "%96 oda havasında",
    "Ateş": "36.7 °C",
    "Şok indeksi": "0.78 - ekstremiteler ılık, kapiller dolum yaklaşık 2 saniye"
  },
  "exam": [
    "Karotis nabzı zayıf ve geç yükseliyor; nabız basıncı dar.",
    "Sağ ikinci interkostal aralıkta kaba, geç pik yapan sistolik ejeksiyon üfürümü duyuluyor ve karotislere yayılıyor.",
    "S2 kalp sesi hafif azalmış; belirgin düzensiz ritim yok.",
    "Akciğer bazallerinde hafif ince ral var, yaygın wheezing yok.",
    "Pretibial ödem hafif; fokal nörolojik defisit saptanmıyor."
  ],
  "investigations": [
    {
      "id": "v310-new-739-ekg",
      "label": "EKG",
      "title": "EKG",
      "orderLabel": "EKG",
      "type": "cardiology",
      "priority": "essential",
      "subtype": "12 derivasyon EKG",
      "category": "cardiology",
      "testTypeCategory": "cardiology",
      "summary": "Sinüs ritmi ve sol ventrikül yüklenme bulguları izlenir.",
      "clinicalMeaning": "Senkop için aritmik acil neden tamamen dışlanmaz; ancak yapısal kapak hastalığı olasılığını artıran yüklenme paterni vardır.",
      "result": {
        "title": "EKG",
        "summary": "Sinüs ritmi ve sol ventrikül yüklenme bulguları izlenir.",
        "interpretation": "Akut ST elevasyonu yok; kronik basınç yükünü düşündüren voltaj paterni var.",
        "values": [
          [
            "Ritim",
            "Sinüs ritmi, 84/dk",
            "Sinüs",
            "Düzenli"
          ],
          [
            "ST elevasyonu",
            "Yok",
            "Yok",
            "Akut STEMI yok"
          ],
          [
            "Sol ventrikül voltajı",
            "Yüksek voltaj + repolarizasyon değişikliği",
            "Yok",
            "LVH ile uyumlu"
          ],
          [
            "PR/QRS",
            "PR 170 ms, QRS 96 ms",
            "PR 120-200 ms; QRS <120 ms",
            "Normal iletim"
          ]
        ]
      }
    },
    {
      "id": "v310-new-739-eko",
      "label": "Transtorasik ekokardiyografi",
      "title": "Transtorasik ekokardiyografi",
      "orderLabel": "Transtorasik ekokardiyografi",
      "type": "imaging",
      "priority": "essential",
      "subtype": "Kapak ve ventrikül değerlendirmesi",
      "category": "imaging",
      "testTypeCategory": "imaging",
      "summary": "Kalsifik kapakta belirgin daralma ve yüksek transvalvüler gradyan saptanır.",
      "clinicalMeaning": "Semptomlarla birlikte ciddi kapak darlığı düzeyinde hemodinamik yük olduğunu gösterir.",
      "result": {
        "title": "Transtorasik ekokardiyografi",
        "summary": "Kalsifik kapakta belirgin daralma ve yüksek transvalvüler gradyan saptanır.",
        "interpretation": "Kapak alanı, jet hızı ve gradyan birlikte ciddi obstrüktif kapak yükünü destekler.",
        "values": [
          [
            "Aort kapak alanı",
            "0.7 cm²",
            ">1.5 cm²",
            "Ciddi daralma"
          ],
          [
            "Ortalama gradyan",
            "48 mmHg",
            "<20 mmHg",
            "Yüksek"
          ],
          [
            "Maksimum jet hızı",
            "4.4 m/sn",
            "<3.0 m/sn",
            "Yüksek"
          ],
          [
            "LVEF",
            "55%",
            "≥50%",
            "Korunmuş"
          ],
          [
            "Sol ventrikül",
            "Konsantrik hipertrofi",
            "Normal duvar kalınlığı",
            "Basınç yükü"
          ]
        ]
      }
    },
    {
      "id": "v310-new-739-lab",
      "label": "Temel laboratuvar ve kardiyak belirteç",
      "title": "Temel laboratuvar ve kardiyak belirteç",
      "orderLabel": "Temel laboratuvar ve kardiyak belirteç",
      "type": "lab",
      "priority": "important",
      "subtype": "Hemogram-biyokimya-troponin",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Akut kanama, ciddi anemi ve dinamik miyokard hasarı lehine belirgin veri yoktur.",
      "clinicalMeaning": "Senkop ve efor semptomlarını yalnız anemi veya akut infarkt ile açıklama olasılığını azaltır.",
      "result": {
        "title": "Temel laboratuvar ve kardiyak belirteç",
        "summary": "Akut kanama, ciddi anemi ve dinamik miyokard hasarı lehine belirgin veri yoktur.",
        "interpretation": "Dinamik troponin yükselişi yok; hafif BNP artışı basınç yükü ve konjesyonla uyumlu olabilir.",
        "values": [
          [
            "Hemoglobin",
            "12.8 g/dL",
            "13-17 g/dL",
            "Hafif düşük"
          ],
          [
            "Kreatinin",
            "1.0 mg/dL",
            "0.6-1.2 mg/dL",
            "Normal"
          ],
          [
            "Sodyum",
            "138 mmol/L",
            "135-145 mmol/L",
            "Normal"
          ],
          [
            "Troponin I, seri",
            "18 → 19 ng/L",
            "<20 ng/L; dinamik artış yok",
            "Negatif sınırda"
          ],
          [
            "BNP",
            "310 pg/mL",
            "<100 pg/mL",
            "Yüksek"
          ]
        ]
      }
    },
    {
      "id": "v310-new-739-akciger",
      "label": "Akciğer grafisi",
      "title": "Akciğer grafisi",
      "orderLabel": "Akciğer grafisi",
      "type": "imaging",
      "priority": "supportive",
      "subtype": "PA akciğer grafisi",
      "category": "imaging",
      "testTypeCategory": "imaging",
      "summary": "Hafif pulmoner venöz belirginleşme dışında akut infiltrasyon saptanmaz.",
      "clinicalMeaning": "Dispneye enfeksiyöz pnömoniden çok kardiyak yüklenmenin eşlik ettiğini destekler.",
      "result": {
        "title": "Akciğer grafisi",
        "summary": "Hafif pulmoner venöz belirginleşme dışında akut infiltrasyon saptanmaz.",
        "interpretation": "Akut enfeksiyon veya büyük plevral sıvı yok; hafif kardiyak konjesyon eşlik ediyor.",
        "values": [
          [
            "Pulmoner vaskülarite",
            "Hafif venöz belirginleşme",
            "Normal",
            "Hafif konjesyon"
          ],
          [
            "Fokal infiltrasyon",
            "Yok",
            "Yok",
            "Pnömoni lehine değil"
          ],
          [
            "Plevral sıvı",
            "Yok",
            "Yok",
            "Saptanmadı"
          ],
          [
            "Kardiyotorasik oran",
            "0.54",
            "<0.50",
            "Hafif artmış"
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
  "question": "Bu hasta için prognozu değiştirecek en uygun yönetim basamağı aşağıdakilerden hangisidir?",
  "questionType": "Tedavi / klinik karar",
  "answerTarget": "Semptomatik ciddi kapak darlığında kapak replasmanı değerlendirmesini medikal semptom kontrolünden ayırma.",
  "diagnosis": {
    "correct": "Kapak replasmanı için kalp takımı değerlendirmesi ve uygun yöntemin planlanması",
    "options": [
      "Sadece beta-bloker dozu artırılarak poliklinik izlemine bırakılması",
      "Senkopu vazovagal kabul edip ek kardiyak girişim planlamadan taburculuk",
      "Uzun etkili nitrat ve agresif vazodilatör tedaviyle efor semptomlarını baskılama",
      "Kapak replasmanı için kalp takımı değerlendirmesi ve uygun yöntemin planlanması",
      "Kalıcı pacemaker takılması ve kapak hastalığının izleme alınması"
    ],
    "question": "Bu hasta için prognozu değiştirecek en uygun yönetim basamağı aşağıdakilerden hangisidir?",
    "explanation": "Eforla senkop, angina benzeri göğüs baskısı, karotise yayılan geç pikli sistolik üfürüm, zayıf-geç karotis nabzı ve ekokardiyografide ciddi hemodinamik daralma birlikte semptomatik ileri kapak darlığı paternini oluşturur. Bu tabloda yalnız semptom baskılayan medikal yaklaşım prognozu düzeltmez ve hipotansiyon riskini artırabilir. Uygun cerrahi veya transkateter kapak replasmanı için kalp takımı değerlendirmesi temel karardır.",
    "pearls": [
      "Efor senkopu ve angina ciddi kapak darlığında klasik kötü prognoz semptomlarıdır.",
      "Geç pikli sistolik ejeksiyon üfürümü ve pulsus parvus et tardus obstrüktif çıkış yolu yükünü destekler.",
      "Semptomatik ciddi darlıkta temel karar kapak replasmanı uygunluğudur; yalnız medikal tedavi kesin çözüm değildir.",
      "TAVI/SAVR seçimi yaş, cerrahi risk, anatomi, eşlik eden hastalık ve hasta tercihine göre kalp takımıyla belirlenir."
    ],
    "optionFeedback": {
      "Sadece beta-bloker dozu artırılarak poliklinik izlemine bırakılması": "Beta-bloker bazı kardiyak durumlarda semptom kontrolü için kullanılabilir; ancak bu hastanın ana sorunu ritim hızı değil, sabit sol ventrikül çıkış obstrüksiyonudur. Efor senkopu ve angina benzeri yakınmalar ciddi kapak darlığında prognoz açısından yüksek risklidir. Sadece beta-bloker artırmak hastanın efor kapasitesini azaltabilir, hipotansiyon ve düşük debi yakınmalarını kötüleştirebilir ve altta yatan mekanik kapak sorununu çözmez. Bu seçenek ancak hafif-orta kapak hastalığı olan, semptomsuz veya farklı nedenle taşikardik bir hastada yardımcı düşünülebilirdi.",
      "Senkopu vazovagal kabul edip ek kardiyak girişim planlamadan taburculuk": "Vazovagal senkop genellikle uzun süre ayakta kalma, emosyonel tetikleyici, prodromal bulantı-terleme ve hızlı toparlanma gibi bir öyküyle desteklenir. Bu vakada ise senkop efor sırasında gelişmiş, öncesinde giderek artan efor dispnesi ve göğüs baskısı vardır; muayene ve ekokardiyografi ciddi yapısal kapak yükünü gösterir. Yaşlı hastada efor senkopu yapısal kalp hastalığı açısından alarm bulgusudur ve basit vazovagal senkop gibi taburculuk güvenli değildir.",
      "Uzun etkili nitrat ve agresif vazodilatör tedaviyle efor semptomlarını baskılama": "Nitrat ve vazodilatörler koroner iskemi veya hipertansif acil gibi bazı bağlamlarda yararlı olabilir; fakat sabit çıkış yolu obstrüksiyonu olan ileri kapak darlığında preload/afterload düşüşü senkop ve hipotansiyonu artırabilir. Bu hastada semptomların nedeni yalnız koroner vazokonstriksiyon değil, kapak düzeyinde mekanik akım kısıtlılığıdır. Medikal vazodilatasyon, kapak alanını genişletmez ve prognozu değiştirmez; klinik karar kapak replasmanı uygunluğudur.",
      "Kapak replasmanı için kalp takımı değerlendirmesi ve uygun yöntemin planlanması": "Bu seçenek doğrudur. Hasta semptomatiktir ve ekokardiyografide kapak alanı 0.7 cm², ortalama gradyan 48 mmHg ve jet hızı 4.4 m/sn gibi ciddi hemodinamik darlık verileri vardır. Eforla senkop ve göğüs baskısı, ileri kapak darlığında mortalite riskini belirgin artıran semptomlardır. Bu nedenle sadece izlem veya semptomatik ilaçlarla yetinilmez; cerrahi kapak replasmanı veya TAVI uygunluğu yaş, cerrahi risk, anatomik özellikler ve eşlik eden hastalıklara göre kalp takımı tarafından planlanmalıdır.",
      "Kalıcı pacemaker takılması ve kapak hastalığının izleme alınması": "Kalıcı pacemaker bradiaritmi, yüksek derece AV blok veya semptomatik iletim bozukluğu gibi durumlarda uygundur. Bu hastada EKG sinüs ritminde, PR ve QRS süreleri normaldir; senkopu açıklayan temel bulgu iletim sistemi hastalığı değil, ciddi kapak obstrüksiyonudur. Pacemaker takılması çıkış yolu darlığını düzeltmez ve eforla gelişen düşük debi mekanizmasını çözmez. İleti bozukluğu olsaydı bu seçenek düşünülürdü; bu vakada öncelik kapak hastalığıdır."
    }
  },
  "shuffleOptions": false,
  "coreKnowledge": "Semptomatik ciddi aort kapak darlığında efor senkopu, angina veya kalp yetmezliği belirtileri ortaya çıktığında prognozu değiştiren yaklaşım kapak replasmanı uygunluğunun değerlendirilmesidir.",
  "examPearl": "TUS ipucu: yaşlı hasta + efor senkopu/angina + karotise yayılan geç pikli sistolik üfürüm + dar kapak alanı = izlem değil kapak replasmanı değerlendirmesi.",
  "whyCorrect": "Doğru seçenek, klinik semptomları ve ekokardiyografik ciddi darlık verilerini mekanik kapak obstrüksiyonu altında birleştirir ve prognoz değiştiren tedaviyi hedefler.",
  "optionComparison": "Yanlış seçenekler semptomları geçici baskılamaya veya alternatif senkop nedenlerine yönelir; ancak vakadaki yapısal kapak verisi, efor senkopu ve yüksek gradyan birlikte kapak replasmanı kararını öne çıkarır.",
  "evidenceChain": [
    "Eforla senkop ve göğüs baskısı → yapısal kardiyak obstrüksiyon açısından alarm semptomları.",
    "Karotise yayılan geç pikli sistolik üfürüm + zayıf-geç karotis nabzı → çıkış yolu darlığı lehine muayene paterni.",
    "Kapak alanı 0.7 cm², gradyan 48 mmHg, jet 4.4 m/sn → ciddi hemodinamik kapak darlığı.",
    "LVEF korunmuş olsa da semptom varlığı → yalnız izlem değil girişim uygunluğu değerlendirmesi.",
    "Akut ST elevasyonu ve ciddi anemi yok → senkopu açıklayan ana eksen mekanik kapak yükü."
  ],
  "whyWrong": "Yanlış seçenekler vazovagal senkop, ritim bozukluğu veya semptom baskılama mantığına dayanır; ancak ciddi semptomatik kapak obstrüksiyonunda bu yaklaşımlar altta yatan prognoz belirleyici sorunu çözmez.",
  "preserveInvestigationOrder": true,
  "aiMeta": {
    "version": "v310",
    "source": "manual-render-safe-internal-medicine-expansion",
    "antiRepeatChecked": true,
    "schemaReference": "V309 cases.js rawCases schema with diagnosis.optionFeedback object mapping"
  },
  "findings": [],
  "images": []
},
{
  "id": "v310-new-740-oksuruk-goz-kurulugu-ve-kalsiyum-yuksekligi",
  "branchId": "internal-medicine",
  "caseType": "standard",
  "relatedBranch": "İç Hastalıkları",
  "title": "Öksürük, göz yakınması ve kalsiyum yüksekliği",
  "difficulty": "Zor",
  "difficultyTag": "TUS düzeyi",
  "clinicalFocus": "Bilateral hiler lenfadenopati, granülomatöz inflamasyon ve PTH baskılı hiperkalsemiyi birlikte yorumlayarak kalsiyum yüksekliğinin mekanizmasını ayırt etme.",
  "learningTarget": "Granülomatöz hastalıklarda aktive makrofaj kaynaklı 1-alfa hidroksilaz aktivitesinin 1,25(OH)2D artışıyla PTH dışı hiperkalsemi oluşturabileceğini öğretme.",
  "demographics": "34 yaşında kadın hasta",
  "setting": "Göğüs hastalıkları ve dahiliye polikliniği",
  "chiefComplaint": "Kuru öksürük, eforla çabuk yorulma ve gözde batma-kızarıklık nedeniyle başvuruyor.",
  "stem": "Hasta yaklaşık iki aydır geçmeyen kuru öksürüğü olduğunu, merdiven çıkarken eskisine göre daha çabuk yorulduğunu anlatır. Son haftalarda iki kez gözünde kızarıklık ve ışığa hassasiyet gelişmiş, göz damlası kullanınca kısa süreli rahatlamıştır. Yaz başından beri daha çok su içtiğini ve geceleri birkaç kez idrara kalktığını fark etmiştir. Sigara kullanmadığını, yakın zamanda yeni bir ilaç başlamadığını ve bilinen kanser öyküsü olmadığını söyler. Gece terlemesi belirgin değildir; balgamda kan, kilo kaybı veya uzun süreli ateş tariflemez. Ailesi, hasta son dönemde halsizlik nedeniyle iş çıkışı daha erken uyuduğunu belirtir.",
  "patientIntro": {
    "profile": "34 yaşında kadın hasta, göğüs hastalıkları ve dahiliye polikliniği ortamında değerlendiriliyor.",
    "presentation": "Kuru öksürük, eforla çabuk yorulma ve gözde batma-kızarıklık nedeniyle başvuruyor.",
    "historySummary": "Hasta yaklaşık iki aydır geçmeyen kuru öksürüğü olduğunu, merdiven çıkarken eskisine göre daha çabuk yorulduğunu anlatır. Son haftalarda iki kez gözünde kızarıklık ve ışığa hassasiyet gelişmiş, göz damlası kullanınca kısa süreli rahatlamıştır. Yaz başından beri daha çok su içtiğini ve geceleri birkaç kez idrara kalktığını fark etmiştir. Sigara kullanmadığını, yakın zamanda yeni bir ilaç başlamadığını ve bilinen kanser öyküsü olmadığını söyler. Gece terlemesi belirgin değildir; balgamda kan, kilo kaybı veya uzun süreli ateş tariflemez. Ailesi, hasta son dönemde halsizlik nedeniyle iş çıkışı daha erken uyuduğunu belirtir."
  },
  "vitals": {
    "TA": "118/76 mmHg",
    "Nabız": "92/dk",
    "Solunum": "17/dk",
    "SpO2": "%97 oda havasında",
    "Ateş": "37.1 °C",
    "Şok indeksi": "0.78 - perfüzyon iyi, mukozalar hafif kuru"
  },
  "exam": [
    "Her iki akciğerde belirgin ral veya wheezing duyulmuyor.",
    "Gözde hafif konjonktival kızarıklık var; görme keskinliği belirgin kayıp göstermiyor.",
    "Ciltte eritema nodozum benzeri ağrılı nodül saptanmıyor.",
    "Servikal lenf nodları küçük ve hareketli; belirgin hepatosplenomegali yok.",
    "Kas gücü normal, kemik hassasiyeti yok."
  ],
  "investigations": [
    {
      "id": "v310-new-740-akciger-grafisi",
      "label": "Akciğer grafisi",
      "title": "Akciğer grafisi",
      "orderLabel": "Akciğer grafisi",
      "type": "imaging",
      "priority": "essential",
      "subtype": "PA akciğer grafisi",
      "category": "imaging",
      "testTypeCategory": "imaging",
      "summary": "Bilateral hiler dolgunluk ve hafif retikülonodüler görünüm izlenir.",
      "clinicalMeaning": "Kronik kuru öksürükle birlikte granülomatöz veya lenfoproliferatif ayırıcıları gündeme getirir; tek başına tanı koydurmaz.",
      "result": {
        "title": "Akciğer grafisi",
        "summary": "Bilateral hiler dolgunluk ve hafif retikülonodüler görünüm izlenir.",
        "interpretation": "Bilateral simetrik hiler lenfadenopati paternini destekleyen görüntü mevcuttur.",
        "values": [
          [
            "Hiler bölgeler",
            "Bilateral simetrik dolgunluk",
            "Normal",
            "Anormal"
          ],
          [
            "Parankim",
            "Hafif retikülonodüler çizgilenme",
            "Normal",
            "Hafif anormal"
          ],
          [
            "Plevral sıvı",
            "Yok",
            "Yok",
            "Saptanmadı"
          ],
          [
            "Kaviter lezyon",
            "Yok",
            "Yok",
            "Saptanmadı"
          ]
        ]
      }
    },
    {
      "id": "v310-new-740-bt",
      "label": "Toraks BT",
      "title": "Toraks BT",
      "orderLabel": "Toraks BT",
      "type": "imaging",
      "priority": "important",
      "subtype": "Kontrastlı toraks BT",
      "category": "imaging",
      "testTypeCategory": "imaging",
      "summary": "Bilateral hiler ve mediastinal lenf nodları ile perilenfatik mikronodüller görülür.",
      "clinicalMeaning": "Lenfatik dağılımlı nodüller sistemik granülomatöz süreç olasılığını güçlendirir.",
      "result": {
        "title": "Toraks BT",
        "summary": "Bilateral hiler ve mediastinal lenf nodları ile perilenfatik mikronodüller görülür.",
        "interpretation": "Santral kitle olmadan simetrik hiler-mediastinal nodlar ve perilenfatik dağılım dikkat çekiyor.",
        "values": [
          [
            "Hiler lenf nodları",
            "Bilateral, simetrik, 18-22 mm",
            "<10 mm",
            "Büyümüş"
          ],
          [
            "Mediastinal nodlar",
            "Paratrakeal ve subkarinal büyüme",
            "Normal",
            "Büyümüş"
          ],
          [
            "Nodül dağılımı",
            "Perilenfatik mikronodüller",
            "Yok",
            "Anormal"
          ],
          [
            "Kitle lezyonu",
            "Belirgin santral kitle yok",
            "Yok",
            "Saptanmadı"
          ]
        ]
      }
    },
    {
      "id": "v310-new-740-kalsiyum",
      "label": "Kalsiyum-PTH-D vitamini paneli",
      "title": "Kalsiyum-PTH-D vitamini paneli",
      "orderLabel": "Kalsiyum-PTH-D vitamini paneli",
      "type": "lab",
      "priority": "essential",
      "subtype": "Mineral metabolizma",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "PTH baskılı hiperkalsemi ve 1,25(OH)2D yüksekliği saptanır.",
      "clinicalMeaning": "Kalsiyum artışının paratiroid kaynaklı olmadığını, D vitamini aktivasyonu üzerinden gelişebileceğini düşündürür.",
      "result": {
        "title": "Kalsiyum-PTH-D vitamini paneli",
        "summary": "PTH baskılı hiperkalsemi ve 1,25(OH)2D yüksekliği saptanır.",
        "interpretation": "Baskılı PTH ve yüksek aktif D vitamini düzeyi PTH dışı kalsiyum artışını destekler.",
        "values": [
          [
            "Düzeltilmiş kalsiyum",
            "11.8 mg/dL",
            "8.5-10.5 mg/dL",
            "Yüksek"
          ],
          [
            "Fosfor",
            "3.8 mg/dL",
            "2.5-4.5 mg/dL",
            "Normal"
          ],
          [
            "PTH",
            "8 pg/mL",
            "15-65 pg/mL",
            "Baskılı"
          ],
          [
            "25-OH D vitamini",
            "24 ng/mL",
            "20-50 ng/mL",
            "Yeterli-sınırda"
          ],
          [
            "1,25-(OH)2 D",
            "92 pg/mL",
            "18-72 pg/mL",
            "Yüksek"
          ],
          [
            "PTHrP",
            "Normal",
            "Normal",
            "Normal"
          ]
        ]
      }
    },
    {
      "id": "v310-new-740-biyopsi",
      "label": "Endobronşiyal USG eşliğinde lenf nodu örneklemesi",
      "title": "Endobronşiyal USG eşliğinde lenf nodu örneklemesi",
      "orderLabel": "Endobronşiyal USG eşliğinde lenf nodu örneklemesi",
      "type": "pathology",
      "priority": "essential",
      "subtype": "EBUS-TBNA",
      "category": "pathology",
      "testTypeCategory": "pathology",
      "summary": "Örneklemede kazeifikasyon göstermeyen granülomatöz inflamasyon izlenir.",
      "clinicalMeaning": "Uygun klinik-radyolojik bağlamda granülomatöz hastalık tanısını destekler; enfeksiyon ve malignite dışlanmalıdır.",
      "result": {
        "title": "Endobronşiyal USG eşliğinde lenf nodu örneklemesi",
        "summary": "Örneklemede kazeifikasyon göstermeyen granülomatöz inflamasyon izlenir.",
        "interpretation": "Nekrotizan enfeksiyon veya malignite lehine belirgin veri yok; nonkazeifiye granülomatöz patern var.",
        "values": [
          [
            "Granülom",
            "Kazeifikasyon göstermeyen epiteloid granülomlar",
            "Yok",
            "Mevcut"
          ],
          [
            "Aside dirençli basil boyası",
            "Negatif",
            "Negatif",
            "Negatif"
          ],
          [
            "Mantar boyası",
            "Negatif",
            "Negatif",
            "Negatif"
          ],
          [
            "Malign hücre",
            "Saptanmadı",
            "Yok",
            "Yok"
          ],
          [
            "Kültür ön sonucu",
            "Üreme yok",
            "Üreme yok",
            "Negatif"
          ]
        ]
      }
    },
    {
      "id": "v310-new-740-solunum",
      "label": "Solunum fonksiyon testi",
      "title": "Solunum fonksiyon testi",
      "orderLabel": "Solunum fonksiyon testi",
      "type": "physiology",
      "priority": "supportive",
      "subtype": "SFT/DLCO",
      "category": "clinicalAssessment",
      "testTypeCategory": "clinicalAssessment",
      "summary": "Hafif restriktif eğilim ve DLCO azalması izlenir.",
      "clinicalMeaning": "Parankim veya interstisyel tutulumun fonksiyonel karşılığını gösterir.",
      "result": {
        "title": "Solunum fonksiyon testi",
        "summary": "Hafif restriktif eğilim ve DLCO azalması izlenir.",
        "interpretation": "Obstrüktif astım/KOAH paterninden çok restriktif-difüzyon etkilenimi öne çıkıyor.",
        "values": [
          [
            "FVC",
            "%78 beklenen",
            ">%80",
            "Hafif düşük"
          ],
          [
            "FEV1/FVC",
            "0.82",
            ">0.70",
            "Obstrüksiyon yok"
          ],
          [
            "DLCO",
            "%68 beklenen",
            ">%80",
            "Düşük"
          ],
          [
            "Bronkodilatör yanıt",
            "Anlamlı değil",
            "<%12 artış",
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
  "question": "Bu hastadaki kalsiyum yüksekliğini en iyi açıklayan mekanizma aşağıdakilerden hangisidir?",
  "questionType": "Mekanizma / laboratuvar yorumu",
  "answerTarget": "PTH baskılı hiperkalsemide granülomatöz aktif D vitamini üretimini ayırt etme.",
  "diagnosis": {
    "correct": "Aktive makrofajlarda 1-alfa hidroksilaz artışıyla 1,25-(OH)2 D üretiminin yükselmesi",
    "options": [
      "Paratiroid bezinden otonom PTH salınımının artması",
      "Aktive makrofajlarda 1-alfa hidroksilaz artışıyla 1,25-(OH)2 D üretiminin yükselmesi",
      "Tümör hücrelerinden PTHrP salınımı ile renal kalsiyum geri emiliminin artması",
      "Kemik metastazlarına bağlı lokal osteolitik sitokin aktivitesinin baskın hale gelmesi",
      "D vitamini alım fazlalığına bağlı 25-OH D düzeyinin toksik aralığa çıkması"
    ],
    "question": "Bu hastadaki kalsiyum yüksekliğini en iyi açıklayan mekanizma aşağıdakilerden hangisidir?",
    "explanation": "Bilateral hiler-mediastinal lenfadenopati, perilenfatik nodüller, nonkazeifiye granülomlar ve PTH baskılı hiperkalsemi birlikte granülomatöz inflamatuvar bir süreci düşündürür. Bu patern içinde hiperkalsemi, paratiroid bezinden değil granülomlardaki aktive makrofajların ekstrarenal 1-alfa hidroksilaz aktivitesiyle 25-OH D’yi 1,25-(OH)2 D’ye çevirmesinden kaynaklanır. Artan aktif D vitamini bağırsaktan kalsiyum emilimini artırır ve PTH baskılanır.",
    "pearls": [
      "PTH baskılı hiperkalsemide ilk ayrım PTH dışı mekanizmaları düşünmektir.",
      "Granülomatöz hastalıkta 1,25-(OH)2D yüksek, PTH düşük olabilir.",
      "PTHrP yüksekliği daha çok humoral malignite hiperkalsemisini destekler.",
      "Nonkazeifiye granülom tanı koydurucu bağlamda değerlendirilir; enfeksiyon ve malignite dışlanmalıdır."
    ],
    "optionFeedback": {
      "Paratiroid bezinden otonom PTH salınımının artması": "Primer hiperparatiroidizmde PTH uygunsuz şekilde yüksek veya normal-yüksek kalır; kalsiyum yüksekliğine rağmen PTH baskılanmaz. Bu hastada PTH 8 pg/mL ile baskılıdır, ayrıca bilateral hiler lenfadenopati ve nonkazeifiye granülomlar mineral metabolizmasını açıklayan başka bir eksen sunar. Primer hiperparatiroidizm doğru olsaydı paratiroid adenomu, hipofosfatemiye eğilim ve PTH yüksekliği beklenirdi; 1,25-(OH)2D artışı granülom bağlamında bu kadar açıklayıcı olmazdı.",
      "Aktive makrofajlarda 1-alfa hidroksilaz artışıyla 1,25-(OH)2 D üretiminin yükselmesi": "Bu seçenek doğrudur. Granülomatöz inflamasyonda aktive makrofajlar ekstrarenal 1-alfa hidroksilaz aktivitesi gösterebilir ve 25-OH D’yi aktif 1,25-(OH)2D’ye çevirebilir. Aktif D vitamini bağırsaktan kalsiyum emilimini artırdığı için kalsiyum yükselir, buna yanıt olarak PTH baskılanır. Bu vakadaki simetrik hiler-mediastinal lenf nodları, perilenfatik nodüller, nonkazeifiye granülomlar, PTH düşüklüğü ve 1,25-(OH)2D yüksekliği bu mekanizmayı en iyi destekler.",
      "Tümör hücrelerinden PTHrP salınımı ile renal kalsiyum geri emiliminin artması": "Humoral malignite hiperkalsemisinde PTHrP artışı beklenir; genellikle skuamöz hücreli akciğer kanseri, renal hücreli karsinom veya bazı diğer solid tümörlerle ilişkilidir. Bu hastada PTHrP normal, belirgin santral akciğer kitlesi yok ve biyopside malign hücre saptanmamış. Bu mekanizma PTH baskılı hiperkalsemi yapabilir; ancak burada yüksek 1,25-(OH)2D ve granülomatöz biyopsi bulgusu PTHrP mekanizmasından daha uygundur.",
      "Kemik metastazlarına bağlı lokal osteolitik sitokin aktivitesinin baskın hale gelmesi": "Osteolitik metastaz veya multipl miyelom gibi süreçlerde kemik ağrısı, litik lezyonlar, anemi, belirgin ALP değişikliği veya malign hücre kanıtı beklenebilir. Bu hastada kemik ağrısı yok, görüntüleme hiler-mediastinal lenf nodu ve perilenfatik nodül paternini gösteriyor; biyopsi malignite yerine nonkazeifiye granülomatöz inflamasyon göstermiş. Osteolitik mekanizma kalsiyum yüksekliği yapabilir, fakat bu vakadaki laboratuvar anahtarı yüksek aktif D vitamini ve baskılı PTH’dir.",
      "D vitamini alım fazlalığına bağlı 25-OH D düzeyinin toksik aralığa çıkması": "D vitamini intoksikasyonunda 25-OH D düzeyi genellikle belirgin yüksek olur ve öyküde yüksek doz takviye kullanımı bulunur. Bu hastada 25-OH D toksik aralıkta değildir, yeni takviye veya ilaç kullanımı anlatılmamıştır; buna karşın 1,25-(OH)2D yüksektir. Granülomatöz hastalıkta sorun dışarıdan fazla D vitamini almak değil, makrofajların aktif D vitamini üretimini kontrolsüz artırmasıdır. Bu ayrım TUS düzeyinde kritik bir mekanizma bilgisidir."
    }
  },
  "shuffleOptions": false,
  "coreKnowledge": "Granülomatöz hastalıklarda aktive makrofajların 1-alfa hidroksilaz aktivitesi artabilir; bu durum PTH baskılı, 1,25-(OH)2D yüksek hiperkalsemiye yol açar.",
  "examPearl": "TUS ipucu: bilateral hiler lenfadenopati + nonkazeifiye granülom + PTH düşük + 1,25-(OH)2D yüksek = makrofaj 1-alfa hidroksilaz mekanizması.",
  "whyCorrect": "Doğru seçenek, granülomatöz inflamasyonu mineral metabolizması laboratuvarıyla bağlar ve PTH dışı hiperkalsemiyi açıklar.",
  "optionComparison": "Yanlış seçenekler PTH, PTHrP, osteoliz veya D vitamini toksisitesi gibi gerçek hiperkalsemi nedenleridir; ancak bu vakada 1,25-(OH)2D yüksekliği ve granülomatöz kanıt makrofaj mekanizmasını üstün kılar.",
  "evidenceChain": [
    "Kuru öksürük ve efor dispnesi → kronik pulmoner/inflamatuvar süreç olasılığı.",
    "Bilateral simetrik hiler-mediastinal lenfadenopati → granülomatöz hastalık paternini destekler.",
    "Nonkazeifiye granülom + negatif AFB/mantar ve malignite bulgusu yok → enfeksiyon/malignite dışlanırken granülomatöz inflamasyon güçlenir.",
    "Kalsiyum yüksek + PTH baskılı → paratiroid dışı mekanizma.",
    "1,25-(OH)2D yüksek, 25-OH D toksik değil → ekstrarenal aktif D vitamini üretimi lehine."
  ],
  "whyWrong": "Yanlış mekanizmalar hiperkalsemi yapabilir; ancak vakadaki laboratuvar imzası PTHrP, PTH veya 25-OH D toksisitesinden çok granülom makrofajı kaynaklı aktif D vitamini üretimini gösterir.",
  "preserveInvestigationOrder": true,
  "aiMeta": {
    "version": "v310",
    "source": "manual-render-safe-internal-medicine-expansion",
    "antiRepeatChecked": true,
    "schemaReference": "V309 cases.js rawCases schema with diagnosis.optionFeedback object mapping"
  },
  "findings": [],
  "images": []
},
{
  "id": "v310-new-741-egzersiz-sonrasi-koyu-idrar-ve-kreatinin-artisi",
  "branchId": "internal-medicine",
  "caseType": "standard",
  "relatedBranch": "İç Hastalıkları",
  "title": "Egzersiz sonrası koyu idrar ve kreatinin artışı",
  "difficulty": "Zor",
  "difficultyTag": "TUS düzeyi",
  "clinicalFocus": "Kas ağrısı, koyu idrar, CK yüksekliği, dipstick-pozitif mikroskopide eritrositsiz idrar ve elektrolit bozukluğunu birlikte yorumlayarak miyoglobin ilişkili akut böbrek hasarında ilk yönetimi seçme.",
  "learningTarget": "Rhabdomyolysis tablosunda nefrotoksik tetikleyiciyi kesme, erken izotonik sıvı replasmanı, hiperkalemi takibi ve diyaliz endikasyonunu birbirinden ayırmayı öğretme.",
  "demographics": "42 yaşında erkek hasta",
  "setting": "Acil servis ve nefroloji konsültasyonu",
  "chiefComplaint": "Yoğun egzersiz sonrası yaygın kas ağrısı, halsizlik ve koyu renkli idrar nedeniyle başvuruyor.",
  "stem": "Hasta iki gün önce uzun süredir yapmadığı ağır bir spor antrenmanına katıldığını, ertesi sabah uyluk ve omuz kaslarında belirgin ağrı başladığını anlatır. Aynı gün idrarının çay rengine döndüğünü ve miktarının azaldığını fark etmiştir. Son bir haftadır aile hekiminin başladığı kolesterol ilacını kullandığını, antrenman günü az su içtiğini ve akşam birkaç kadeh alkol aldığını söyler. Göğüs ağrısı, travmaya bağlı kırık, ateşli enfeksiyon veya kanlı dışkı tariflemez. Ağrı kesici olarak iki kez ibuprofen aldığını belirtir. Kas ağrısı ve idrar rengindeki değişiklik nedeniyle ailesi tarafından acile getirilmiştir.",
  "patientIntro": {
    "profile": "42 yaşında erkek hasta, acil servis ve nefroloji konsültasyonu ortamında değerlendiriliyor.",
    "presentation": "Yoğun egzersiz sonrası yaygın kas ağrısı, halsizlik ve koyu renkli idrar nedeniyle başvuruyor.",
    "historySummary": "Hasta iki gün önce uzun süredir yapmadığı ağır bir spor antrenmanına katıldığını, ertesi sabah uyluk ve omuz kaslarında belirgin ağrı başladığını anlatır. Aynı gün idrarının çay rengine döndüğünü ve miktarının azaldığını fark etmiştir. Son bir haftadır aile hekiminin başladığı kolesterol ilacını kullandığını, antrenman günü az su içtiğini ve akşam birkaç kadeh alkol aldığını söyler. Göğüs ağrısı, travmaya bağlı kırık, ateşli enfeksiyon veya kanlı dışkı tariflemez. Ağrı kesici olarak iki kez ibuprofen aldığını belirtir. Kas ağrısı ve idrar rengindeki değişiklik nedeniyle ailesi tarafından acile getirilmiştir."
  },
  "vitals": {
    "TA": "104/68 mmHg",
    "Nabız": "108/dk",
    "Solunum": "20/dk",
    "SpO2": "%98 oda havasında",
    "Ateş": "36.9 °C",
    "Şok indeksi": "1.04 - ağız mukozası kuru, kapiller dolum 2-3 saniye"
  },
  "exam": [
    "Uyluk ve omuz kuşağı kaslarında yaygın hassasiyet var; belirgin travmatik deformite yok.",
    "Kas kompartmanları gergin değil, pasif germe ile aşırı ağrı saptanmıyor.",
    "Akciğer sesleri doğal; yaygın ödem veya belirgin volüm yükü yok.",
    "Karında defans/rebound yok; kostovertebral açı hassasiyeti belirgin değil.",
    "Nörolojik muayenede fokal defisit yok, hasta uyanık ve koopere."
  ],
  "investigations": [
    {
      "id": "v310-new-741-ck",
      "label": "Kas enzimi ve böbrek fonksiyonları",
      "title": "Kas enzimi ve böbrek fonksiyonları",
      "orderLabel": "Kas enzimi ve böbrek fonksiyonları",
      "type": "lab",
      "priority": "essential",
      "subtype": "CK-kreatinin-elektrolit",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "CK çok yüksek, kreatinin artmış ve potasyum sınırda yüksek bulunur.",
      "clinicalMeaning": "Kas yıkımı ve miyoglobin ilişkili böbrek hasarı riskini gösterir; hiperkalemi açısından yakın izlem gerekir.",
      "result": {
        "title": "Kas enzimi ve böbrek fonksiyonları",
        "summary": "CK çok yüksek, kreatinin artmış ve potasyum sınırda yüksek bulunur.",
        "interpretation": "Ağır kas yıkımı, erken böbrek etkilenimi ve elektrolit kayması birlikte izleniyor.",
        "values": [
          [
            "CK",
            "36.500 U/L",
            "<200 U/L",
            "Çok yüksek"
          ],
          [
            "Kreatinin",
            "2.1 mg/dL",
            "0.6-1.2 mg/dL",
            "Yüksek"
          ],
          [
            "Üre",
            "58 mg/dL",
            "15-45 mg/dL",
            "Yüksek"
          ],
          [
            "Potasyum",
            "5.6 mmol/L",
            "3.5-5.1 mmol/L",
            "Yüksek"
          ],
          [
            "Kalsiyum",
            "8.0 mg/dL",
            "8.5-10.5 mg/dL",
            "Düşük"
          ],
          [
            "Fosfor",
            "5.8 mg/dL",
            "2.5-4.5 mg/dL",
            "Yüksek"
          ]
        ]
      }
    },
    {
      "id": "v310-new-741-idrar",
      "label": "Tam idrar tetkiki ve mikroskopi",
      "title": "Tam idrar tetkiki ve mikroskopi",
      "orderLabel": "Tam idrar tetkiki ve mikroskopi",
      "type": "lab",
      "priority": "essential",
      "subtype": "İdrar dipstick/mikroskopi",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Dipstick kan pozitifken mikroskopide eritrosit görülmemesi pigmentüriyi destekler.",
      "clinicalMeaning": "Hematüriden çok miyoglobin/hem pigmenti varlığını düşündürür.",
      "result": {
        "title": "Tam idrar tetkiki ve mikroskopi",
        "summary": "Dipstick kan pozitifken mikroskopide eritrosit görülmemesi pigmentüriyi destekler.",
        "interpretation": "Kan pozitifliği eritrosit yokluğunda pigment kaynaklıdır; konsantre idrar dehidratasyonu destekler.",
        "values": [
          [
            "Renk",
            "Koyu kahverengi",
            "Açık sarı",
            "Anormal"
          ],
          [
            "Dipstick kan",
            "3+",
            "Negatif",
            "Pozitif"
          ],
          [
            "Eritrosit mikroskopi",
            "0-1/hpf",
            "0-3/hpf",
            "Hematüri yok"
          ],
          [
            "Protein",
            "1+",
            "Negatif-eser",
            "Hafif"
          ],
          [
            "Granüler silendir",
            "Az sayıda",
            "Yok",
            "Mevcut"
          ],
          [
            "Dansite",
            "1.030",
            "1.005-1.030",
            "Konsantre"
          ]
        ]
      }
    },
    {
      "id": "v310-new-741-kan-gazi",
      "label": "Venöz kan gazı ve metabolik panel",
      "title": "Venöz kan gazı ve metabolik panel",
      "orderLabel": "Venöz kan gazı ve metabolik panel",
      "type": "lab",
      "priority": "important",
      "subtype": "VBG/laktat",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Hafif metabolik asidoz ve normal laktat görülür.",
      "clinicalMeaning": "Hipoperfüzyon ağır değil; ancak böbrek ve kas yıkımı kaynaklı asit yükü izlenmelidir.",
      "result": {
        "title": "Venöz kan gazı ve metabolik panel",
        "summary": "Hafif metabolik asidoz ve normal laktat görülür.",
        "interpretation": "Derin laktik asidoz veya ketoasidoz yok; kas yıkımı-böbrek ekseni öne çıkıyor.",
        "values": [
          [
            "pH",
            "7.32",
            "7.35-7.45",
            "Düşük"
          ],
          [
            "HCO3",
            "19 mmol/L",
            "22-26 mmol/L",
            "Düşük"
          ],
          [
            "Laktat",
            "1.8 mmol/L",
            "<2.0 mmol/L",
            "Normal"
          ],
          [
            "Anyon açıklığı",
            "15 mmol/L",
            "8-12 mmol/L",
            "Hafif yüksek"
          ],
          [
            "Glukoz",
            "104 mg/dL",
            "70-140 mg/dL",
            "Normal"
          ]
        ]
      }
    },
    {
      "id": "v310-new-741-ekg",
      "label": "EKG",
      "title": "EKG",
      "orderLabel": "EKG",
      "type": "cardiology",
      "priority": "important",
      "subtype": "Hiperkalemi izlemi",
      "category": "cardiology",
      "testTypeCategory": "cardiology",
      "summary": "Potasyum yüksekliğine rağmen belirgin malign EKG değişikliği saptanmaz.",
      "clinicalMeaning": "Hiperkalemi tedavisi EKG ve potasyum düzeyiyle birlikte izlenmelidir; yakın tekrar değerlendirme gerekir.",
      "result": {
        "title": "EKG",
        "summary": "Potasyum yüksekliğine rağmen belirgin malign EKG değişikliği saptanmaz.",
        "interpretation": "Şu an kalsiyum gerektiren ağır EKG bulgusu yok; ancak potasyum yüksekliği izlenmelidir.",
        "values": [
          [
            "Ritim",
            "Sinüs taşikardisi, 108/dk",
            "Sinüs",
            "Taşikardi"
          ],
          [
            "T dalgaları",
            "Belirgin sivrilme yok",
            "Normal",
            "Acil değişiklik yok"
          ],
          [
            "QRS",
            "92 ms",
            "<120 ms",
            "Dar"
          ],
          [
            "PR",
            "160 ms",
            "120-200 ms",
            "Normal"
          ]
        ]
      }
    },
    {
      "id": "v310-new-741-usg",
      "label": "Böbrek ultrasonografisi",
      "title": "Böbrek ultrasonografisi",
      "orderLabel": "Böbrek ultrasonografisi",
      "type": "imaging",
      "priority": "supportive",
      "subtype": "Renal USG",
      "category": "imaging",
      "testTypeCategory": "imaging",
      "summary": "Obstrüksiyon veya hidronefroz saptanmaz.",
      "clinicalMeaning": "Kreatinin artışını postrenal obstrüksiyondan çok tübüler/pigment ilişkili hasara yönlendirir.",
      "result": {
        "title": "Böbrek ultrasonografisi",
        "summary": "Obstrüksiyon veya hidronefroz saptanmaz.",
        "interpretation": "Postrenal obstrüksiyon lehine veri yoktur.",
        "values": [
          [
            "Sağ böbrek",
            "Normal boyut, hidronefroz yok",
            "Normal",
            "Normal"
          ],
          [
            "Sol böbrek",
            "Normal boyut, hidronefroz yok",
            "Normal",
            "Normal"
          ],
          [
            "Mesane rezidüsü",
            "Minimal",
            "Minimal",
            "Normal"
          ],
          [
            "Taş gölgesi",
            "Yok",
            "Yok",
            "Saptanmadı"
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
  "question": "Bu hastada böbrek hasarını azaltmak için öncelikli yönetim aşağıdakilerden hangisidir?",
  "questionType": "Acil yaklaşım / tedavi",
  "answerTarget": "Pigment nefropatisi riskinde erken izotonik sıvı ve tetikleyici ilaç kesilmesini seçme.",
  "diagnosis": {
    "correct": "Nefrotoksik ve miyotoksik ilaçları kesip erken izotonik kristalloid ile volüm replasmanı başlamak",
    "options": [
      "Nefrotoksik ve miyotoksik ilaçları kesip erken izotonik kristalloid ile volüm replasmanı başlamak",
      "İdrar rengi açılana kadar sıvı kısıtlaması ve loop diüretik başlamak",
      "CK yüksekliği normale dönene kadar yüksek doz steroid tedavisi başlamak",
      "Hemoglobinüri kabul ederek acil eritrosit süspansiyonu transfüzyonu yapmak",
      "Kreatinin yüksekliği var diye ilk basamakta rutin acil hemodiyaliz başlamak"
    ],
    "question": "Bu hastada böbrek hasarını azaltmak için öncelikli yönetim aşağıdakilerden hangisidir?",
    "explanation": "Yoğun egzersiz, statin kullanımı, dehidratasyon, yaygın kas ağrısı, çok yüksek CK, koyu idrar ve dipstick kan pozitifliği ile mikroskopide eritrosit olmaması pigmentüriyi destekler. Bu durumda miyoglobin tübüler hasar, renal vazokonstriksiyon ve tübüler tıkanma üzerinden akut böbrek hasarı oluşturabilir. Volüm yükü yokken erken izotonik kristalloid replasmanı, tetikleyici/nefotoksik ilaçların kesilmesi ve elektrolit yakın takibi önceliklidir.",
    "pearls": [
      "Dipstick kan pozitif + mikroskopide eritrosit yok = miyoglobinüri/hemoglobinüri düşün.",
      "Rhabdomyolysis erken dönemde hiperkalemi, hiperfosfatemi, hipokalsemi ve AKI yapabilir.",
      "Tedavinin temeli erken volüm replasmanı, tetikleyici ilaçların kesilmesi ve elektrolit takibidir.",
      "Diyaliz CK yüksekliği için değil; refrakter hiperkalemi, ağır asidoz, üremik komplikasyon veya volüm yükü gibi klasik endikasyonlarla yapılır."
    ],
    "optionFeedback": {
      "Nefrotoksik ve miyotoksik ilaçları kesip erken izotonik kristalloid ile volüm replasmanı başlamak": "Bu seçenek doğrudur. Hastada ağır egzersiz, yeni statin kullanımı, dehidratasyon ve NSAİİ maruziyeti gibi tetikleyicilerle birlikte çok yüksek CK, pigmentüri ve kreatinin artışı vardır. Volüm replasmanı renal perfüzyonu artırır, tübüler miyoglobin yoğunluğunu azaltır ve pigment nefropatisi riskini düşürür. Statin ve NSAİİ gibi miyotoksik/nefotoksik katkı sağlayabilecek ilaçların kesilmesi, potasyum-kalsiyum-fosfor izlemi ve idrar çıkışının takip edilmesi gerekir.",
      "İdrar rengi açılana kadar sıvı kısıtlaması ve loop diüretik başlamak": "Sıvı kısıtlaması bu hastada yanlış yönde etki eder; hasta kuru mukozalı, taşikardik ve konsantre idrarlıdır. Rhabdomyolysis’te böbrek hasarını önlemek için temel yaklaşım yeterli intravasküler volüm sağlamaktır. Loop diüretik ancak volüm yükü gelişen seçilmiş hastalarda destek olarak düşünülebilir; başlangıçta volüm replasmanı yapılmadan diüretik verilmesi renal perfüzyonu daha da bozabilir. İdrar renginin açılmasını beklemek de tedaviyi geciktirir.",
      "CK yüksekliği normale dönene kadar yüksek doz steroid tedavisi başlamak": "Steroidler inflamatuvar miyopati, otoimmün kas hastalığı veya seçilmiş immün aracılı nekrotizan miyopati gibi bağlamlarda gündeme gelebilir. Bu vakada akut başlangıç yoğun egzersiz, dehidratasyon, statin ve NSAİİ maruziyeti ile ilişkili; klinik ve idrar bulguları pigment nefropatisini destekliyor. Ateş, proksimal kronik güçsüzlük, döküntü, miyozit otoantikorları veya inflamatuvar miyopati bulgusu verilmemiştir. Bu nedenle steroid ilk basamak değil, erken sıvı ve tetikleyici kontrolü önceliklidir.",
      "Hemoglobinüri kabul ederek acil eritrosit süspansiyonu transfüzyonu yapmak": "Dipstick kan pozitifliği hemoglobin veya miyoglobin nedeniyle pozitifleşebilir; ancak mikroskopide eritrosit olmaması gerçek hematüriden uzaklaştırır. Hastada anemiye veya aktif hemolize dair veri yoktur; koyu idrar kas yıkımı bağlamında miyoglobinüri ile daha uyumludur. Eritrosit transfüzyonu böbrek hasarını önlemez ve gereksiz volüm/immün komplikasyon riski taşır. Hemolitik kriz olsaydı LDH, bilirubin, haptoglobin, retikülosit ve hemoglobin düşüşü gibi farklı veriler beklenirdi.",
      "Kreatinin yüksekliği var diye ilk basamakta rutin acil hemodiyaliz başlamak": "Diyaliz akut böbrek hasarında belirli endikasyonlarla yapılır; yalnız CK yüksekliği veya kreatinin artışı tek başına rutin acil diyaliz nedeni değildir. Refrakter hiperkalemi, ağır asidoz, üremik komplikasyon, tedaviye dirençli volüm yükü veya toksin uzaklaştırma gerekliliği gibi durumlar aranır. Bu hastada potasyum yüksek ama EKG’de ağır değişiklik yok, volüm yükü yok ve laktik asidoz derin değil. Öncelik sıvı replasmanı, tetikleyici ilaçların kesilmesi ve yakın elektrolit-idrar takibidir; diyaliz gereksinimi gelişirse ayrıca değerlendirilir."
    }
  },
  "shuffleOptions": false,
  "coreKnowledge": "Rhabdomyolysis’te miyoglobin tübüler toksisite ve tıkanma üzerinden AKI yapabilir; tedavinin temeli erken izotonik sıvı, tetikleyici ilaçların kesilmesi ve hiperkalemi/asidoz/volüm durumunun yakın izlemidir.",
  "examPearl": "TUS ipucu: kas ağrısı + koyu idrar + CK çok yüksek + dipstick kan pozitif ama eritrosit yok = rhabdomyolysis; ilk basamak sıvı ve elektrolit takibidir.",
  "whyCorrect": "Doğru seçenek pigment nefropatisini önlemeye yönelik en erken değiştirilebilir basamak olan volüm replasmanını ve tetikleyicilerin kesilmesini hedefler.",
  "optionComparison": "Yanlış seçenekler sıvıyı kısıtlar, immün miyopatiye yönelir, hemoliz varsayar veya diyalizi erken genelleştirir; vakadaki mekanizma miyoglobin ilişkili akut tübüler hasar riskidir.",
  "evidenceChain": [
    "Ağır egzersiz + yeni statin + dehidratasyon/NSAİİ → kas yıkımı ve böbrek riski için tetikleyiciler.",
    "Yaygın kas ağrısı + CK 36.500 U/L → belirgin kas hasarı.",
    "Dipstick kan 3+ ama eritrosit 0-1/hpf → pigmentüri lehine.",
    "Kreatinin 2.1 mg/dL + konsantre idrar → erken AKI ve volüm eksikliği.",
    "Potasyum 5.6 mmol/L → elektrolit komplikasyonu için yakın izlem ve gerekirse tedavi ihtiyacı."
  ],
  "whyWrong": "Yanlış seçenekler rhabdomyolysis tedavisinin temel basamağı olan erken volüm replasmanını geciktirir veya vaka verisiyle desteklenmeyen mekanizmalara yönelir.",
  "preserveInvestigationOrder": true,
  "aiMeta": {
    "version": "v310",
    "source": "manual-render-safe-internal-medicine-expansion",
    "antiRepeatChecked": true,
    "schemaReference": "V309 cases.js rawCases schema with diagnosis.optionFeedback object mapping"
  },
  "findings": [],
  "images": []
},
{
  "id": "v310-new-742-tekrarlayan-pihti-ve-gebelik-kaybi",
  "branchId": "internal-medicine",
  "caseType": "standard",
  "relatedBranch": "İç Hastalıkları",
  "title": "Tekrarlayan pıhtı ve gebelik kaybı",
  "difficulty": "Zor",
  "difficultyTag": "TUS düzeyi",
  "clinicalFocus": "Genç hastada açıklanamayan venöz tromboz, obstetrik kayıp, livedo retikülaris ve kalıcı antifosfolipid antikor profilini birleştirerek uzun dönem antikoagülasyon seçimini ayırt etme.",
  "learningTarget": "Trombotik antifosfolipid sendromunda kalıcı antikor pozitifliği ve klinik olay birlikteliğini tanıyıp sekonder korunmada direkt oral antikoagülan yerine VKA mantığını öğretme.",
  "demographics": "33 yaşında kadın hasta",
  "setting": "Dahiliye hematoloji-romatoloji ortak polikliniği",
  "chiefComplaint": "İkinci kez gelişen bacak pıhtısı ve geçmiş gebelik kayıpları nedeniyle değerlendirilmek üzere başvuruyor.",
  "stem": "Hasta üç yıl önce uzun yolculuk veya ameliyat öyküsü olmadan sol bacağında pıhtı geliştiğini, altı ay kan sulandırıcı kullanıp bıraktığını anlatır. Son hafta sağ baldırında şişlik ve yürümekle artan ağrı başlamış, acilde tekrar damar pıhtısı saptanınca ileri değerlendirmeye yönlendirilmiştir. Daha önce 10. haftadan sonra iki gebeliğini kaybettiğini ve bir gebeliğinde tansiyon yükselmesi nedeniyle erken doğum yaptığını söyler. Gençliğinden beri soğukta belirginleşen ağsı morarma tarzı cilt görünümü olduğunu belirtir. Ailesinde erken yaşta venöz pıhtı öyküsü yoktur; aktif kanser, yakın dönem cerrahi, oral kontraseptif kullanımı veya uzun immobilizasyon tariflemez. Eklem şişliği, fotosensitif döküntü ve böbrek hastalığı öyküsü olmadığını ekler.",
  "patientIntro": {
    "profile": "33 yaşında kadın hasta, dahiliye hematoloji-romatoloji ortak polikliniği ortamında değerlendiriliyor.",
    "presentation": "İkinci kez gelişen bacak pıhtısı ve geçmiş gebelik kayıpları nedeniyle değerlendirilmek üzere başvuruyor.",
    "historySummary": "Hasta üç yıl önce uzun yolculuk veya ameliyat öyküsü olmadan sol bacağında pıhtı geliştiğini, altı ay kan sulandırıcı kullanıp bıraktığını anlatır. Son hafta sağ baldırında şişlik ve yürümekle artan ağrı başlamış, acilde tekrar damar pıhtısı saptanınca ileri değerlendirmeye yönlendirilmiştir. Daha önce 10. haftadan sonra iki gebeliğini kaybettiğini ve bir gebeliğinde tansiyon yükselmesi nedeniyle erken doğum yaptığını söyler. Gençliğinden beri soğukta belirginleşen ağsı morarma tarzı cilt görünümü olduğunu belirtir. Ailesinde erken yaşta venöz pıhtı öyküsü yoktur; aktif kanser, yakın dönem cerrahi, oral kontraseptif kullanımı veya uzun immobilizasyon tariflemez. Eklem şişliği, fotosensitif döküntü ve böbrek hastalığı öyküsü olmadığını ekler."
  },
  "vitals": {
    "TA": "122/78 mmHg",
    "Nabız": "96/dk",
    "Solunum": "18/dk",
    "SpO2": "%98 oda havasında",
    "Ateş": "36.8 °C",
    "Şok indeksi": "0.79 - perfüzyon iyi, kapiller dolum <2 saniye"
  },
  "exam": [
    "Sağ baldır sol tarafa göre 3 cm daha geniş ve palpasyonla hassas.",
    "Ayak nabızları alınabiliyor; belirgin siyanoz veya arteriyel soğukluk yok.",
    "Uyluk ve gövde yanlarında livedo retikülaris benzeri ağsı morarma izleniyor.",
    "Akciğer oskültasyonu doğal; belirgin dispne veya hemoptizi yok.",
    "Eklemde aktif sinovit, malar döküntü veya oral ülser saptanmıyor."
  ],
  "investigations": [
    {
      "id": "v310-new-742-doppler",
      "label": "Alt ekstremite venöz Doppler",
      "title": "Alt ekstremite venöz Doppler",
      "orderLabel": "Alt ekstremite venöz Doppler",
      "type": "imaging",
      "priority": "essential",
      "subtype": "Venöz Doppler",
      "category": "imaging",
      "testTypeCategory": "imaging",
      "summary": "Sağ popliteal-femoral ven segmentinde akut tromboz saptanır.",
      "clinicalMeaning": "Klinik şişliğin yeni venöz trombozla ilişkili olduğunu gösterir.",
      "result": {
        "title": "Alt ekstremite venöz Doppler",
        "summary": "Sağ popliteal-femoral ven segmentinde akut tromboz saptanır.",
        "interpretation": "Yeni akut DVT objektif olarak gösterilmiştir.",
        "values": [
          [
            "Sağ popliteal ven",
            "Nonkomprese, akut trombüs",
            "Komprese olur",
            "Tromboz"
          ],
          [
            "Sağ femoral ven",
            "Kısmi lümen trombüsü",
            "Patent",
            "Tromboz"
          ],
          [
            "Sol bacak",
            "Akut trombüs yok",
            "Patent",
            "Saptanmadı"
          ],
          [
            "Yüzeyel venler",
            "Belirgin tromboflebit yok",
            "Yok",
            "Yok"
          ]
        ]
      }
    },
    {
      "id": "v310-new-742-koag",
      "label": "Koagülasyon ve hemogram",
      "title": "Koagülasyon ve hemogram",
      "orderLabel": "Koagülasyon ve hemogram",
      "type": "lab",
      "priority": "important",
      "subtype": "PT/aPTT/hemogram",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "aPTT uzamış, trombosit ve hemoglobin belirgin düşük değildir.",
      "clinicalMeaning": "aPTT uzaması kanama eğiliminden çok inhibitör/antikor etkisiyle ilişkili olabilir; trombozla birlikte yorumlanmalıdır.",
      "result": {
        "title": "Koagülasyon ve hemogram",
        "summary": "aPTT uzamış, trombosit ve hemoglobin belirgin düşük değildir.",
        "interpretation": "Koagülasyon tüketimi/DIC paterni yok; tromboz ve aPTT uzaması birlikte dikkat çekiyor.",
        "values": [
          [
            "Hemoglobin",
            "12.6 g/dL",
            "12-16 g/dL",
            "Normal"
          ],
          [
            "Trombosit",
            "168.000/mm³",
            "150.000-400.000/mm³",
            "Normal"
          ],
          [
            "PT/INR",
            "INR 1.0",
            "0.8-1.2",
            "Normal"
          ],
          [
            "aPTT",
            "48 sn",
            "25-35 sn",
            "Uzamış"
          ],
          [
            "Fibrinojen",
            "340 mg/dL",
            "200-400 mg/dL",
            "Normal"
          ],
          [
            "D-dimer",
            "2.800 ng/mL",
            "<500 ng/mL",
            "Yüksek"
          ]
        ]
      }
    },
    {
      "id": "v310-new-742-apl",
      "label": "Antifosfolipid antikor paneli",
      "title": "Antifosfolipid antikor paneli",
      "orderLabel": "Antifosfolipid antikor paneli",
      "type": "lab",
      "priority": "essential",
      "subtype": "aPL paneli",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Lupus antikoagülanı ve antikardiyolipin IgG iki ayrı ölçümde pozitif bulunur.",
      "clinicalMeaning": "Klinik tromboz ve obstetrik öyküyle birlikte kalıcı otoantikor profili sendrom tanısını destekler.",
      "result": {
        "title": "Antifosfolipid antikor paneli",
        "summary": "Lupus antikoagülanı ve antikardiyolipin IgG iki ayrı ölçümde pozitif bulunur.",
        "interpretation": "Antikor pozitifliği geçici enfeksiyon yanıtı gibi değil, kalıcı bir profil göstermektedir.",
        "values": [
          [
            "Lupus antikoagülanı",
            "Pozitif",
            "Negatif",
            "Pozitif"
          ],
          [
            "Antikardiyolipin IgG",
            "68 GPL",
            "<20 GPL",
            "Yüksek"
          ],
          [
            "Anti-β2 glikoprotein I IgG",
            "54 U/mL",
            "<20 U/mL",
            "Yüksek"
          ],
          [
            "12 hafta sonra lupus antikoagülanı",
            "Pozitif",
            "Negatif",
            "Kalıcı"
          ],
          [
            "12 hafta sonra antikardiyolipin IgG",
            "61 GPL",
            "<20 GPL",
            "Kalıcı yüksek"
          ]
        ]
      }
    },
    {
      "id": "v310-new-742-otoimmun",
      "label": "Otoimmün tarama ve böbrek değerlendirmesi",
      "title": "Otoimmün tarama ve böbrek değerlendirmesi",
      "orderLabel": "Otoimmün tarama ve böbrek değerlendirmesi",
      "type": "lab",
      "priority": "supportive",
      "subtype": "ANA-kompleman-idrar",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Eşlik eden aktif SLE veya lupus nefriti lehine güçlü veri saptanmaz.",
      "clinicalMeaning": "Primer ve sekonder otoimmün bağlam ayrımı için destekleyici bilgiler sağlar.",
      "result": {
        "title": "Otoimmün tarama ve böbrek değerlendirmesi",
        "summary": "Eşlik eden aktif SLE veya lupus nefriti lehine güçlü veri saptanmaz.",
        "interpretation": "SLE eşlik edebilir ancak bu vakada aktif lupus nefriti veya sistemik aktivite desteklenmiyor.",
        "values": [
          [
            "ANA",
            "1/80 zayıf pozitif",
            "Negatif veya düşük titre",
            "Düşük titre"
          ],
          [
            "Anti-dsDNA",
            "Negatif",
            "Negatif",
            "Negatif"
          ],
          [
            "C3/C4",
            "Normal",
            "Normal",
            "Normal"
          ],
          [
            "Kreatinin",
            "0.8 mg/dL",
            "0.6-1.2 mg/dL",
            "Normal"
          ],
          [
            "İdrar protein/eritrosit",
            "Protein negatif, eritrosit 0-1/hpf",
            "Normal",
            "Aktif sediment yok"
          ]
        ]
      }
    },
    {
      "id": "v310-new-742-toraks",
      "label": "Pulmoner emboli taraması",
      "title": "Pulmoner emboli taraması",
      "orderLabel": "Pulmoner emboli taraması",
      "type": "imaging",
      "priority": "supportive",
      "subtype": "Klinik risk odaklı değerlendirme",
      "category": "imaging",
      "testTypeCategory": "imaging",
      "summary": "Dispne olmadığı için yapılan temel değerlendirmede akut pulmoner emboli bulgusu saptanmaz.",
      "clinicalMeaning": "Mevcut yönetim akut DVT üzerinden planlanır; PE semptomları gelişirse yeniden değerlendirilir.",
      "result": {
        "title": "Pulmoner emboli taraması",
        "summary": "Dispne olmadığı için yapılan temel değerlendirmede akut pulmoner emboli bulgusu saptanmaz.",
        "interpretation": "Şu an klinik olarak akut PE baskın değildir; DVT tedavisi geciktirilmez.",
        "values": [
          [
            "SpO2",
            "%98 oda havasında",
            ">%94",
            "Normal"
          ],
          [
            "Göğüs ağrısı/hemoptizi",
            "Yok",
            "Yok",
            "Yok"
          ],
          [
            "EKG",
            "Sinüs ritmi",
            "Sinüs",
            "Acil sağ yüklenme yok"
          ],
          [
            "Akciğer grafisi",
            "Akut patoloji yok",
            "Normal",
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
  "question": "Tanı doğrulandıktan sonra bu hastada uzun dönem sekonder tromboz korunması için en uygun yaklaşım hangisidir?",
  "questionType": "Tedavi / izlem",
  "answerTarget": "Trombotik antifosfolipid sendromunda uzun dönem VKA antikoagülasyonunu seçme.",
  "diagnosis": {
    "correct": "Uzun dönem vitamin K antagonisti ile antikoagülasyon planlamak",
    "options": [
      "Sadece düşük doz aspirinle izlemek",
      "Antikoagülasyonu üç ay sonra tamamen kesmek",
      "Direkt oral faktör Xa inhibitörüyle standart doz monoterapiye geçmek",
      "Yalnız gebelik dönemlerinde düşük molekül ağırlıklı heparin kullanmak",
      "Uzun dönem vitamin K antagonisti ile antikoagülasyon planlamak"
    ],
    "question": "Tanı doğrulandıktan sonra bu hastada uzun dönem sekonder tromboz korunması için en uygun yaklaşım hangisidir?",
    "explanation": "Genç yaşta tekrarlayan açıklanamayan venöz tromboz, obstetrik kayıplar, livedo retikülaris ve 12 hafta arayla kalıcı antifosfolipid antikor pozitifliği trombotik antifosfolipid sendromu paternini destekler. Bu durumda akut DVT tedavisi sonrası sekonder korunmada yalnız aspirin veya kısa süreli antikoagülasyon yetersiz kalır. Özellikle yüksek riskli/çoklu antikor pozitifliğinde uzun dönem vitamin K antagonisti tedavisi standart yaklaşımdır; gebelik planında ise ayrı şekilde heparin-temelli protokol gerekir.",
    "pearls": [
      "APS tanısı klinik olay + kalıcı laboratuvar pozitifliği gerektirir.",
      "Lupus antikoagülanı adı kanama değil tromboz riskini çağrıştırmalıdır.",
      "Trombotik APS’de sekonder korunmada VKA temel tedavidir; DOAC özellikle yüksek riskli profilde sorunludur.",
      "Gebelikte warfarin kullanılmaz; ancak bu soru gebelik dışı uzun dönem sekonder korunmayı sormaktadır."
    ],
    "optionFeedback": {
      "Sadece düşük doz aspirinle izlemek": "Aspirin primer korunma veya belirli obstetrik bağlamlarda destek tedavi olarak gündeme gelebilir; ancak bu hastada tekrarlayan objektif venöz tromboz vardır. Klinik olay venöz tromboz olduğunda yalnız antiplatelet tedavi sekonder korunma için yetersizdir. Ayrıca hasta lupus antikoagülanı, antikardiyolipin ve anti-β2 glikoprotein I pozitifliğiyle yüksek riskli profile yakındır. Aspirin tek başına, venöz pıhtı nüksünü önlemek için yeterli antikoagülan etki sağlamaz.",
      "Antikoagülasyonu üç ay sonra tamamen kesmek": "Provokan faktörlü tek bir DVT’de sınırlı süreli antikoagülasyon bazı hastalarda yeterli olabilir. Bu vakada ise genç yaşta tekrarlayan açıklanamayan DVT, obstetrik kayıplar ve kalıcı antifosfolipid antikorları vardır. Bu durum geçici bir cerrahi/immobilizasyon pıhtısı gibi yönetilemez; nüks riski yüksektir. Üç ay sonra tamamen kesmek hastayı yeni venöz veya arteriyel tromboz açısından korumasız bırakır.",
      "Direkt oral faktör Xa inhibitörüyle standart doz monoterapiye geçmek": "DOAC’lar birçok klasik venöz tromboemboli hastasında pratiktir; ancak antifosfolipid sendromunda özellikle yüksek riskli veya çoklu antikor pozitif profilde VKA’ya göre daha sorunlu kabul edilir. Bu hastada lupus antikoagülanı, antikardiyolipin IgG ve anti-β2 glikoprotein I pozitifliği birlikte bulunmuştur. Bu nedenle standart DOAC monoterapisine geçmek en güvenli sekonder korunma seçimi değildir. DOAC düşünülmesi ancak çok seçilmiş düşük riskli durumlarda uzman kararıyla tartışılabilir; bu vaka o gruba uymaz.",
      "Yalnız gebelik dönemlerinde düşük molekül ağırlıklı heparin kullanmak": "Gebelik kaybı öyküsü nedeniyle ileride gebelik planlanırsa düşük molekül ağırlıklı heparin ve düşük doz aspirin gibi obstetrik protokoller gündeme gelebilir. Ancak hasta şu anda gebelik dışı dönemde akut tekrarlayan venöz trombozla başvurmuştur. Sadece gebelik dönemlerinde tedavi vermek mevcut trombotik APS için sekonder korunmayı eksik bırakır. Gebelik yönetimi ayrı bir başlıktır; bu soruda uzun dönem tromboz nüksünü önleme hedeflenmektedir.",
      "Uzun dönem vitamin K antagonisti ile antikoagülasyon planlamak": "Bu seçenek doğrudur. Tekrarlayan açıklanamayan DVT ve 12 hafta arayla kalıcı pozitif antifosfolipid antikor profili trombotik APS ile uyumludur. Venöz trombotik APS’de uzun dönem sekonder korunmada vitamin K antagonisti, genellikle hedef INR 2-3 olacak şekilde temel yaklaşımdır; arteriyel olay veya nüks gibi özel durumlarda hedef ve ek tedaviler uzman değerlendirmesiyle değişebilir. Bu hasta çoklu antikor pozitifliği nedeniyle DOAC yerine VKA açısından daha tipik bir sınav örneğidir."
    }
  },
  "shuffleOptions": false,
  "coreKnowledge": "Antifosfolipid sendromu klinik tromboz/obstetrik morbidite ile en az 12 hafta arayla kalıcı antifosfolipid antikor pozitifliğinin birleşimidir; trombotik APS’de uzun dönem sekonder korunmada VKA ana tedavidir.",
  "examPearl": "TUS ipucu: genç hasta + tekrarlayan açıklanamayan tromboz + gebelik kaybı + livedo + kalıcı lupus antikoagülanı/aCL/anti-β2GP1 = APS; trombotik formda VKA düşün.",
  "whyCorrect": "Doğru seçenek, hastanın tekrarlayan venöz trombozunu ve kalıcı yüksek riskli antikor profilini nüks riski yüksek trombotik APS olarak ele alır.",
  "optionComparison": "Yanlış seçenekler antiplatelet, kısa süreli tedavi, DOAC veya yalnız obstetrik dönem yaklaşımına sıkışır; oysa vakada gebelik dışı dönemde tekrarlayan trombotik olay vardır.",
  "evidenceChain": [
    "Genç yaşta tekrarlayan DVT → kalıcı trombofili/otoimmün tromboz eğilimi araştırma gereği.",
    "Gebelik kayıpları ve erken doğum öyküsü → obstetrik APS bileşenini destekler.",
    "Livedo retikülaris → APS ile ilişkili olabilen vasküler cilt bulgusu.",
    "Lupus antikoagülanı + aCL IgG + anti-β2GP1 IgG pozitifliği → yüksek riskli antikor profili.",
    "12 hafta sonra pozitifliğin sürmesi → geçici enfeksiyon ilişkili antikor yanıtından ayrılır."
  ],
  "whyWrong": "Yanlış seçenekler trombotik APS’de nüks riskini yeterince karşılamaz veya yüksek riskli antikor profilinde tercih edilmeyen antikoagülasyon stratejisini seçer.",
  "preserveInvestigationOrder": true,
  "aiMeta": {
    "version": "v310",
    "source": "manual-render-safe-internal-medicine-expansion",
    "antiRepeatChecked": true,
    "schemaReference": "V309 cases.js rawCases schema with diagnosis.optionFeedback object mapping"
  },
  "findings": [],
  "images": []
},
{
  "id": "v310-new-743-ailevi-sislik-ataklari-ve-karin-agrisi",
  "branchId": "internal-medicine",
  "caseType": "standard",
  "relatedBranch": "İç Hastalıkları",
  "title": "Ailevi şişlik atakları ve karın ağrısı",
  "difficulty": "Zor",
  "difficultyTag": "TUS düzeyi",
  "clinicalFocus": "Ürtikersiz tekrarlayan anjiyoödem, karın ağrısı atakları, aile öyküsü ve düşük C4/C1 inhibitör verisini birlikte değerlendirerek bradikinin aracılı atağın acil tedavisini seçme.",
  "learningTarget": "Histamin aracılı alerjik anjiyoödem ile C1 inhibitör eksikliği ilişkili bradikinin aracılı anjiyoödemi ayırıp akut atakta C1-INH konsantresi veya bradikinin yolu hedefli tedaviyi seçmeyi öğretme.",
  "demographics": "24 yaşında erkek hasta",
  "setting": "Acil servis ve dahiliye immünoloji konsültasyonu",
  "chiefComplaint": "Dudak-dil şişliği ve kramp tarzı karın ağrısı atağı nedeniyle acile başvuruyor.",
  "stem": "Hasta sabah uyandığında dudaklarında ve dil kenarında giderek artan şişlik fark ettiğini, birkaç saat içinde konuşmasının zorlaştığını anlatır. Aynı gün dalgalar halinde gelen kramp tarzı karın ağrısı ve bulantısı başlamıştır. Daha önce de el sırtında ve ayak bileğinde bir-iki gün süren şişlik atakları olduğunu, genellikle kaşıntı veya kabarıklık eşlik etmediğini söyler. İki kez acilde alerji iğnesi yapıldığını ama şişliğin ancak ertesi gün azaldığını hatırlar. Yeni ilaç, kabuklu deniz ürünü, arı sokması veya belirgin döküntü tariflemez. Babasında genç yaşlardan beri benzer şişlik atakları olduğunu ve bir akrabasının boğaz şişliği nedeniyle hastaneye yattığını belirtir.",
  "patientIntro": {
    "profile": "24 yaşında erkek hasta, acil servis ve dahiliye immünoloji konsültasyonu ortamında değerlendiriliyor.",
    "presentation": "Dudak-dil şişliği ve kramp tarzı karın ağrısı atağı nedeniyle acile başvuruyor.",
    "historySummary": "Hasta sabah uyandığında dudaklarında ve dil kenarında giderek artan şişlik fark ettiğini, birkaç saat içinde konuşmasının zorlaştığını anlatır. Aynı gün dalgalar halinde gelen kramp tarzı karın ağrısı ve bulantısı başlamıştır. Daha önce de el sırtında ve ayak bileğinde bir-iki gün süren şişlik atakları olduğunu, genellikle kaşıntı veya kabarıklık eşlik etmediğini söyler. İki kez acilde alerji iğnesi yapıldığını ama şişliğin ancak ertesi gün azaldığını hatırlar. Yeni ilaç, kabuklu deniz ürünü, arı sokması veya belirgin döküntü tariflemez. Babasında genç yaşlardan beri benzer şişlik atakları olduğunu ve bir akrabasının boğaz şişliği nedeniyle hastaneye yattığını belirtir."
  },
  "vitals": {
    "TA": "126/80 mmHg",
    "Nabız": "102/dk",
    "Solunum": "20/dk",
    "SpO2": "%97 oda havasında",
    "Ateş": "36.6 °C",
    "Şok indeksi": "0.81 - perfüzyon iyi, stridor yok ancak dil kenarında şişlik var"
  },
  "exam": [
    "Dudaklarda ve dil lateralinde belirgin nonpitting şişlik var; yaygın ürtiker yok.",
    "Ses hafif boğuk, stridor duyulmuyor; hasta tam cümle kurabiliyor.",
    "Akciğerlerde wheezing yok; hipotansiyon veya yaygın flushing saptanmıyor.",
    "Karın yaygın hassas, defans/rebound yok; bağırsak sesleri hafif artmış.",
    "El sırtında eski ataklardan kalma renk değişikliği yok; aktif enfeksiyon odağı saptanmıyor."
  ],
  "investigations": [
    {
      "id": "v310-new-743-kompleman",
      "label": "Kompleman ve C1 inhibitör paneli",
      "title": "Kompleman ve C1 inhibitör paneli",
      "orderLabel": "Kompleman ve C1 inhibitör paneli",
      "type": "lab",
      "priority": "essential",
      "subtype": "C4/C1-INH",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "C4 düşük, C1 inhibitör düzeyi ve fonksiyonu azalmış bulunur.",
      "clinicalMeaning": "Bradikinin aracılı kalıtsal anjiyoödem mekanizmasını destekler.",
      "result": {
        "title": "Kompleman ve C1 inhibitör paneli",
        "summary": "C4 düşük, C1 inhibitör düzeyi ve fonksiyonu azalmış bulunur.",
        "interpretation": "Düşük C4 ve düşük C1-INH fonksiyonu bradikinin aracılı kalıtsal atağı destekler.",
        "values": [
          [
            "C4",
            "5 mg/dL",
            "10-40 mg/dL",
            "Düşük"
          ],
          [
            "C1 inhibitör antijen düzeyi",
            "6 mg/dL",
            "21-39 mg/dL",
            "Düşük"
          ],
          [
            "C1 inhibitör fonksiyonu",
            "%18",
            ">%68",
            "Düşük"
          ],
          [
            "C1q",
            "Normal",
            "Normal",
            "Normal"
          ],
          [
            "Total IgE",
            "Normal",
            "Laboratuvara göre",
            "Alerjik patern değil"
          ]
        ]
      }
    },
    {
      "id": "v310-new-743-alerji",
      "label": "Alerjik reaksiyon belirteçleri",
      "title": "Alerjik reaksiyon belirteçleri",
      "orderLabel": "Alerjik reaksiyon belirteçleri",
      "type": "lab",
      "priority": "important",
      "subtype": "Triptaz/eozinofil",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Mast hücre aracılı sistemik anafilaksi lehine belirgin veri saptanmaz.",
      "clinicalMeaning": "Ürtiker, wheezing ve hipotansiyon yokluğu ile birlikte histamin aracılı atağı zayıflatır.",
      "result": {
        "title": "Alerjik reaksiyon belirteçleri",
        "summary": "Mast hücre aracılı sistemik anafilaksi lehine belirgin veri saptanmaz.",
        "interpretation": "Anafilaksi bulguları baskın değildir; ancak hava yolu takibi yine zorunludur.",
        "values": [
          [
            "Serum triptaz",
            "4.2 ng/mL",
            "<11.4 ng/mL",
            "Normal"
          ],
          [
            "Eozinofil",
            "180/mm³",
            "0-500/mm³",
            "Normal"
          ],
          [
            "Ürtiker",
            "Yok",
            "Yok",
            "Yok"
          ],
          [
            "Wheezing",
            "Yok",
            "Yok",
            "Yok"
          ],
          [
            "Hipotansiyon",
            "Yok",
            "Yok",
            "Yok"
          ]
        ]
      }
    },
    {
      "id": "v310-new-743-hava-yolu",
      "label": "Hava yolu değerlendirmesi",
      "title": "Hava yolu değerlendirmesi",
      "orderLabel": "Hava yolu değerlendirmesi",
      "type": "clinical",
      "priority": "essential",
      "subtype": "Acil hava yolu izlemi",
      "category": "clinicalAssessment",
      "testTypeCategory": "clinicalAssessment",
      "summary": "Dil kenarında şişlik var; stridor ve oksijen düşüklüğü henüz gelişmemiştir.",
      "clinicalMeaning": "Hava yolu riski dinamik olduğu için tedaviyle birlikte yakın izlem gerekir.",
      "result": {
        "title": "Hava yolu değerlendirmesi",
        "summary": "Dil kenarında şişlik var; stridor ve oksijen düşüklüğü henüz gelişmemiştir.",
        "interpretation": "Şu an entübasyon endikasyonu yok; kötüleşme açısından hazırlıklı izlem gerekir.",
        "values": [
          [
            "Konuşma",
            "Tam cümle kurabiliyor",
            "Normal",
            "Hafif etkilenmiş"
          ],
          [
            "Stridor",
            "Yok",
            "Yok",
            "Yok"
          ],
          [
            "SpO2",
            "%97 oda havasında",
            ">%94",
            "Normal"
          ],
          [
            "Dil/dudak şişliği",
            "Mevcut",
            "Yok",
            "Anormal"
          ],
          [
            "Sekresyon kontrolü",
            "Korunmuş",
            "Korunmuş",
            "Korunmuş"
          ]
        ]
      }
    },
    {
      "id": "v310-new-743-karin",
      "label": "Karın görüntüleme ve temel laboratuvar",
      "title": "Karın görüntüleme ve temel laboratuvar",
      "orderLabel": "Karın görüntüleme ve temel laboratuvar",
      "type": "imaging",
      "priority": "supportive",
      "subtype": "USG/laboratuvar",
      "category": "imaging",
      "testTypeCategory": "imaging",
      "summary": "Karında barsak duvar ödemi ve az serbest sıvı izlenir; akut cerrahi bulgu yoktur.",
      "clinicalMeaning": "Bradikinin aracılı bağırsak duvar ödemi karın atağını açıklayabilir.",
      "result": {
        "title": "Karın görüntüleme ve temel laboratuvar",
        "summary": "Karında barsak duvar ödemi ve az serbest sıvı izlenir; akut cerrahi bulgu yoktur.",
        "interpretation": "Cerrahi akut karın veya pankreatit lehine veri yok; ödem atağı destekleniyor.",
        "values": [
          [
            "Karın USG",
            "Az serbest sıvı, segmental barsak duvar ödemi",
            "Normal",
            "Anormal"
          ],
          [
            "Lökosit",
            "8.700/mm³",
            "4.000-10.000/mm³",
            "Normal"
          ],
          [
            "CRP",
            "3 mg/L",
            "<5 mg/L",
            "Normal"
          ],
          [
            "Amilaz/lipaz",
            "Normal",
            "Normal",
            "Normal"
          ],
          [
            "Laktat",
            "1.2 mmol/L",
            "<2.0 mmol/L",
            "Normal"
          ]
        ]
      }
    },
    {
      "id": "v310-new-743-ilac",
      "label": "İlaç ve tetikleyici değerlendirmesi",
      "title": "İlaç ve tetikleyici değerlendirmesi",
      "orderLabel": "İlaç ve tetikleyici değerlendirmesi",
      "type": "clinical",
      "priority": "supportive",
      "subtype": "Öykü tabanlı tetikleyici analizi",
      "category": "clinicalAssessment",
      "testTypeCategory": "clinicalAssessment",
      "summary": "ACE inhibitörü, yeni gıda veya arı sokması öyküsü yoktur.",
      "clinicalMeaning": "Edinsel ilaç ilişkili veya klasik alerjik atak olasılığını azaltır; aile öyküsü kalıtsal paterni güçlendirir.",
      "result": {
        "title": "İlaç ve tetikleyici değerlendirmesi",
        "summary": "ACE inhibitörü, yeni gıda veya arı sokması öyküsü yoktur.",
        "interpretation": "Öykü bradikinin aracılı kalıtsal patern lehinedir.",
        "values": [
          [
            "ACE inhibitörü kullanımı",
            "Yok",
            "Yok",
            "Yok"
          ],
          [
            "Yeni gıda/arı sokması",
            "Yok",
            "Yok",
            "Yok"
          ],
          [
            "Aile öyküsü",
            "Baba ve akrabada benzer atak",
            "Yok",
            "Pozitif"
          ],
          [
            "Atak süresi",
            "1-2 gün süren önceki ataklar",
            "Saatler içinde gerileme beklenir",
            "Uzun"
          ],
          [
            "Antihistaminik/adrenalin yanıtı",
            "Önceki ataklarda belirgin hızlı yanıt yok",
            "Hızlı yanıt beklenir",
            "Zayıf"
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
  "question": "Bu hastanın akut atağında en uygun hedefe yönelik tedavi hangisidir?",
  "questionType": "Acil tedavi / mekanizma",
  "answerTarget": "Bradikinin aracılı anjiyoödemde C1-INH veya bradikinin yolunu hedefleyen tedaviyi seçme.",
  "diagnosis": {
    "correct": "C1 inhibitör konsantresi veya ikatibant uygulamak ve hava yolunu yakın izlemek",
    "options": [
      "Yalnız oral antihistaminik verip birkaç saat sonra taburcu etmek",
      "Geniş spektrumlu antibiyotik ve acil laparotomi hazırlığı yapmak",
      "C1 inhibitör konsantresi veya ikatibant uygulamak ve hava yolunu yakın izlemek",
      "Taze donmuş plazma ve varfarinle uzun dönem antikoagülasyon başlamak",
      "Yüksek doz inhaler bronkodilatör ile atağın geçmesini beklemek"
    ],
    "question": "Bu hastanın akut atağında en uygun hedefe yönelik tedavi hangisidir?",
    "explanation": "Tekrarlayan ürtikersiz şişlik atakları, karın ağrısı, aile öyküsü, antihistaminik/adrenalin yanıtının zayıf olması, düşük C4 ve düşük C1 inhibitör fonksiyonu bradikinin aracılı kalıtsal anjiyoödem atağını destekler. Dil-dudak tutulumu hava yolu açısından riskli olduğundan yakın izlem ve gerekirse hava yolu hazırlığı şarttır. Akut hedefe yönelik tedavi C1 inhibitör replasmanı veya bradikinin B2 reseptör antagonisti gibi bradikinin yolunu hedefleyen tedavidir.",
    "pearls": [
      "Ürtiker yokluğu ve antihistaminik/adrenalin yanıtının zayıf olması bradikinin aracılı anjiyoödemi düşündürür.",
      "C4 düşüklüğü ataklar arasında bile tarama ipucu olabilir.",
      "Dil-larenks tutulumu dinamik hava yolu riski taşır; sadece laboratuvar değil klinik izlem gerekir.",
      "HAE atağında C1-INH konsantresi, ikatibant veya uygun bradikinin-kallikrein yolu tedavileri hedefe yöneliktir."
    ],
    "optionFeedback": {
      "Yalnız oral antihistaminik verip birkaç saat sonra taburcu etmek": "Antihistaminikler histamin aracılı ürtiker/alerjik anjiyoödemde yararlı olabilir; ancak bu hastada ürtiker, wheezing, hipotansiyon ve triptaz artışı yoktur. Önceki ataklarda alerji tedavisine hızlı yanıt alınmamış, ataklar 1-2 gün sürmüş ve aile öyküsü belirgindir. Dil tutulumu da hava yolu riski taşır. Bu nedenle sadece antihistaminikle taburculuk tehlikelidir; bradikinin yolunu hedefleyen tedavi ve yakın hava yolu izlemi gerekir.",
      "Geniş spektrumlu antibiyotik ve acil laparotomi hazırlığı yapmak": "Karın ağrısı ve barsak duvar ödemi akut batını taklit edebilir; ancak hastada ateş, lökositoz, CRP yüksekliği, laktat artışı, defans/rebound veya pankreatit bulgusu yoktur. Tekrarlayan şişlik atakları ve kompleman-C1 inhibitör paterni karın yakınmasını bradikinin aracılı barsak ödemiyle açıklar. Gereksiz laparotomi bu hastalarda klasik bir tuzaktır. Cerrahi akut karın bulguları gelişirse değerlendirme değişir; mevcut veride hedefe yönelik anjiyoödem tedavisi önceliklidir.",
      "C1 inhibitör konsantresi veya ikatibant uygulamak ve hava yolunu yakın izlemek": "Bu seçenek doğrudur. Klinik tablo kalıtsal C1 inhibitör eksikliğiyle uyumlu bradikinin aracılı anjiyoödem atağıdır. C1 inhibitör konsantresi eksik inhibitör aktivitesini yerine koyar; ikatibant bradikinin B2 reseptörünü bloke ederek ödem yolunu hedefler. Dil ve dudak tutulumu nedeniyle SpO2 normal olsa bile atak dinamik ilerleyebilir; tedaviyle birlikte entübasyon hazırlığı yapılabilecek ortamda yakın hava yolu izlemi gerekir.",
      "Taze donmuş plazma ve varfarinle uzun dönem antikoagülasyon başlamak": "Taze donmuş plazma bazı koşullarda hedef tedavi bulunmadığında C1 inhibitör kaynağı olarak tartışılabilir; ancak ilk tercih özgül C1-INH konsantresi veya ikatibant gibi hedefe yönelik ajanlardır. Varfarin bu tablonun tedavisi değildir; hastada tromboz veya antikoagülasyon endikasyonu verilmemiştir. Ayrıca akut hava yolu riski olan bir atakta uzun dönem antikoagülasyon başlamak sorunun mekanizmasını çözmez ve gereksiz kanama riski doğurur.",
      "Yüksek doz inhaler bronkodilatör ile atağın geçmesini beklemek": "Bronkodilatörler bronkospazm ve astım/anafilaksi ilişkili wheezing için uygundur. Bu hastada wheezing yok, SpO2 normal ve sorun bronş düz kas kasılması değil mukozal-submukozal ödemdir. Dil-larenks ödemi bronkodilatörle düzelmez; beklemek hava yolu obstrüksiyonu açısından risklidir. Bronkodilatör ancak eşlik eden bronkospazm bulgusu olsaydı destek tedavi olabilirdi, burada hedef bradikinin yoludur."
    }
  },
  "shuffleOptions": false,
  "coreKnowledge": "Kalıtsal anjiyoödemde C1 inhibitör eksikliği veya fonksiyon bozukluğu bradikinin artışıyla ürtikersiz, uzun süren deri/mukoza ve gastrointestinal ödem atakları yapar; akut tedavide C1-INH veya bradikinin/kallikrein yolu hedeflenir.",
  "examPearl": "TUS ipucu: tekrarlayan ürtikersiz anjiyoödem + aile öyküsü + karın ağrısı + C4 düşük = histamin değil bradikinin; C1-INH/ikatibant düşün.",
  "whyCorrect": "Doğru seçenek atağın bradikinin aracılı mekanizmasını hedefler ve en önemli akut risk olan hava yolunu eş zamanlı izler.",
  "optionComparison": "Yanlış seçenekler alerji, cerrahi akut karın, antikoagülasyon veya bronkospazm eksenine yönelir; vakada C1-INH eksikliği ve bradikinin aracılı ödem paterni baskındır.",
  "evidenceChain": [
    "Tekrarlayan şişlik atakları ve aile öyküsü → kalıtsal mekanizma olasılığı.",
    "Ürtiker, wheezing, hipotansiyon yok → histamin aracılı anafilaksi daha zayıf.",
    "Karın ağrısı + barsak duvar ödemi → gastrointestinal anjiyoödem atağı.",
    "C4 düşük + C1-INH düzey/fonksiyon düşük → C1 inhibitör eksikliği paternini destekler.",
    "Dil-dudak tutulumu → tedaviyle birlikte hava yolu yakın izlemi gerekir."
  ],
  "whyWrong": "Yanlış seçenekler atağın mediyatörünü yanlış kabul eder veya acil hava yolu riskini küçümser; bu nedenle hedefe yönelik tedaviyi geciktirir.",
  "preserveInvestigationOrder": true,
  "aiMeta": {
    "version": "v310",
    "source": "manual-render-safe-internal-medicine-expansion",
    "antiRepeatChecked": true,
    "schemaReference": "V309 cases.js rawCases schema with diagnosis.optionFeedback object mapping"
  },
  "findings": [],
  "images": []
},
{
  "id": "v311-new-744-dis-eti-kanamasi-ve-yaygin-morarma",
  "branchId": "internal-medicine",
  "caseType": "standard",
  "relatedBranch": "İç Hastalıkları",
  "title": "Diş eti kanaması ve yaygın morarma",
  "difficulty": "TUS düzeyi",
  "clinicalFocus": "Kanama ile gelen hastada akut lösemiye eşlik eden koagülopatiyi tanıyıp tedaviyi genetik doğrulama beklemeden başlatma.",
  "learningTarget": "Ağır kanama riski taşıyan lösemi ilişkili koagülopatide ATRA ve destekleyici kan ürünü hedeflerini birlikte düşünme.",
  "demographics": "32 yaşında erkek hasta",
  "setting": "Acil servis / hematoloji konsültasyonu",
  "chiefComplaint": "Hasta, birkaç gündür artan diş eti kanaması, ciltte morarmalar ve halsizlik nedeniyle acile başvuruyor.",
  "stem": "Hasta son bir haftadır diş fırçalarken kanamanın normalden uzun sürdüğünü, son iki gündür bacaklarında kendiliğinden morluklar belirdiğini ve sabah burun kanaması yaşadığını anlatır. Halsizliği giderek artmış, merdiven çıkarken çabuk yorulmaya başlamıştır. Son gün içinde idrarında kan fark etmemiştir; dışkısının siyah olmadığını ve belirgin karın ağrısı yaşamadığını söyler. Bilinen karaciğer hastalığı, antikoagülan kullanımı veya yakın zamanda büyük travma öyküsü yoktur. Ateşi olmadığını belirtse de ailesi son günlerde belirgin soluklaştığını fark ederek acile getirmiştir.",
  "patientIntro": {
    "profile": "32 yaşında erkek hasta, spontan mukozal kanama ve yaygın ekimozlarla acil serviste değerlendiriliyor.",
    "presentation": "Diş eti kanaması, burun kanaması, halsizlik ve kendiliğinden gelişen morarmalar ön plandadır.",
    "historySummary": "Hasta son bir haftadır diş fırçalarken kanamanın normalden uzun sürdüğünü, son iki gündür bacaklarında kendiliğinden morluklar belirdiğini ve sabah burun kanaması yaşadığını anlatır. Halsizliği giderek artmış, merdiven çıkarken çabuk yorulmaya başlamıştır. Son gün içinde idrarında kan fark etmemiştir; dışkısının siyah olmadığını ve belirgin karın ağrısı yaşamadığını söyler. Bilinen karaciğer hastalığı, antikoagülan kullanımı veya yakın zamanda büyük travma öyküsü yoktur. Ateşi olmadığını belirtse de ailesi son günlerde belirgin soluklaştığını fark ederek acile getirmiştir."
  },
  "vitals": {
    "TA": "104/66 mmHg",
    "Nabız": "112/dk",
    "Solunum": "20/dk",
    "SpO2": "%98, oda havasında",
    "Ateş": "37.2 °C",
    "Şok indeksi": "1.08 - sınırda dolaşım yükü"
  },
  "exam": [
    "Hasta belirgin soluk ve halsiz görünür; bilinç açıktır.",
    "Diş etlerinde sızıntı tarzında kanama, alt ekstremitelerde yaygın ekimoz ve peteşiler izlenir.",
    "Lenfadenopati belirgin değildir; dalak kot altında hafif ele gelir.",
    "Aktif masif dış kanama yoktur ancak ven ponksiyon yerlerinden uzamış sızıntı vardır."
  ],
  "investigations": [
    {
      "id": "v311-new-744-dis-eti-kanamasi-ve-yaygin-morarma-tetkik-1",
      "label": "Tam kan sayımı ve yayma",
      "title": "Tam kan sayımı ve yayma",
      "orderLabel": "Tam kan sayımı ve yayma",
      "type": "laboratory",
      "priority": "essential",
      "subtype": "Tam kan sayımı ve yayma",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Sitopeniler ve periferik yaymadaki blastik hücreler hematolojik acil olasılığını destekler.",
      "clinicalMeaning": "Sitopeniler ve periferik yaymadaki blastik hücreler hematolojik acil olasılığını destekler.",
      "result": {
        "title": "Tam kan sayımı ve yayma",
        "summary": "Sitopeniler ve periferik yaymadaki blastik hücreler hematolojik acil olasılığını destekler.",
        "interpretation": "Sitopeniler ve periferik yaymadaki blastik hücreler hematolojik acil olasılığını destekler.",
        "values": [
          [
            "Hemoglobin",
            "8.1 g/dL",
            "13.5-17.5 g/dL",
            "Anemi"
          ],
          [
            "Lökosit",
            "18.400/µL",
            "4.000-10.000/µL",
            "Lökositoz"
          ],
          [
            "Trombosit",
            "24.000/µL",
            "150.000-400.000/µL",
            "Ağır trombositopeni"
          ],
          [
            "Periferik yayma",
            "Yoğun granüllü blastlar ve çoklu Auer çubuğu içeren hücreler",
            "",
            "Akut lösemi lehine morfoloji"
          ]
        ]
      }
    },
    {
      "id": "v311-new-744-dis-eti-kanamasi-ve-yaygin-morarma-tetkik-2",
      "label": "Koagülasyon ve fibrinojen",
      "title": "Koagülasyon ve fibrinojen",
      "orderLabel": "Koagülasyon ve fibrinojen",
      "type": "laboratory",
      "priority": "essential",
      "subtype": "Koagülasyon ve fibrinojen",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Düşük fibrinojen ve yüksek fibrin yıkımı aktif koagülopatiyi gösterir.",
      "clinicalMeaning": "Düşük fibrinojen ve yüksek fibrin yıkımı aktif koagülopatiyi gösterir.",
      "result": {
        "title": "Koagülasyon ve fibrinojen",
        "summary": "Düşük fibrinojen ve yüksek fibrin yıkımı aktif koagülopatiyi gösterir.",
        "interpretation": "Düşük fibrinojen ve yüksek fibrin yıkımı aktif koagülopatiyi gösterir.",
        "values": [
          [
            "PT/INR",
            "INR 1.9",
            "0.8-1.2",
            "Uzamış pıhtılaşma"
          ],
          [
            "aPTT",
            "47 sn",
            "25-35 sn",
            "Uzamış"
          ],
          [
            "Fibrinojen",
            "82 mg/dL",
            "200-400 mg/dL",
            "Belirgin düşük"
          ],
          [
            "D-dimer",
            "Çok yüksek",
            "<500 ng/mL FEU",
            "Aktif fibrin yıkımı"
          ]
        ]
      }
    },
    {
      "id": "v311-new-744-dis-eti-kanamasi-ve-yaygin-morarma-tetkik-3",
      "label": "Temel biyokimya",
      "title": "Temel biyokimya",
      "orderLabel": "Temel biyokimya",
      "type": "laboratory",
      "priority": "essential",
      "subtype": "Temel biyokimya",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Organ fonksiyonları ve hücre yıkımı riski tedavi öncesi izlem için kaydedilir.",
      "clinicalMeaning": "Organ fonksiyonları ve hücre yıkımı riski tedavi öncesi izlem için kaydedilir.",
      "result": {
        "title": "Temel biyokimya",
        "summary": "Organ fonksiyonları ve hücre yıkımı riski tedavi öncesi izlem için kaydedilir.",
        "interpretation": "Organ fonksiyonları ve hücre yıkımı riski tedavi öncesi izlem için kaydedilir.",
        "values": [
          [
            "Kreatinin",
            "0.9 mg/dL",
            "0.6-1.2 mg/dL",
            "Başlangıç böbrek fonksiyonu korunmuş"
          ],
          [
            "AST/ALT",
            "38/42 U/L",
            "<40 U/L",
            "Sınırda"
          ],
          [
            "Ürik asit",
            "6.8 mg/dL",
            "3.5-7.2 mg/dL",
            "Yakın izlem gerektirir"
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
  "questionType": "Acil hematoloji tedavisi",
  "answerTarget": "Kanama ile gelen lösemi ilişkili koagülopatide tedavi gecikmesini önleme.",
  "diagnosis": {
    "correct": "ATRA’yı hemen başlamak ve fibrinojen-trombosit hedefleriyle agresif kan ürünü desteği vermek",
    "options": [
      "Trombosit süspansiyonu verip kemik iliği sonucunu beklemek",
      "Yalnız geniş spektrumlu antibiyotik başlayıp koagülopatiyi izlemek",
      "ATRA’yı hemen başlamak ve fibrinojen-trombosit hedefleriyle agresif kan ürünü desteği vermek",
      "Varfarin başlamak ve INR terapötik aralığa gelene kadar takip etmek",
      "Lökoferez yapıp farklılaşma tedavisini genetik doğrulamadan sonraya ertelemek"
    ],
    "question": "Bu hastada acil yönetimde öncelikli basamak aşağıdakilerden hangisidir?",
    "explanation": "Mukoza kanaması, yaygın ekimoz, ağır trombositopeni, düşük fibrinojen ve periferik yaymada yoğun granüllü blast/Auer çubuğu paterni acil tedavi gerektiren promiyelositik lösemi ilişkili koagülopatiyi destekler. Bu durumda moleküler doğrulama beklenmeden ATRA başlanır ve hemostatik destek agresif biçimde sürdürülür.",
    "pearls": [
      "Ağır kanama riski olan bu tabloda tanısal doğrulama tedaviyi geciktirmemelidir.",
      "Fibrinojen düşüklüğü ve D-dimer yüksekliği aktif koagülopatiyi gösterir.",
      "ATRA hastalık mekanizmasını hedefler; kan ürünü desteği kanama mortalitesini azaltmaya yöneliktir."
    ],
    "optionFeedback": {
      "Trombosit süspansiyonu verip kemik iliği sonucunu beklemek": "Trombosit desteği bu hastada gereklidir; ancak tek başına yeterli değildir. Yaygın morarma, diş eti kanaması, düşük fibrinojen, uzamış PT/aPTT ve granüllü blastların görülmesi erken ölüm nedeni olabilen lösemi ilişkili koagülopatiyi düşündüren acil bir tablodur. Trombosit ve kriyopresipitat desteği kanama kontrolünün bir parçasıdır; fakat altta yatan prokoagülan-fibrinolitik süreci durdurmak için farklılaşma tedavisi gecikmeden başlanmalıdır. Kemik iliği veya moleküler doğrulama beklenirse ilk saatlerde fatal intrakraniyal veya pulmoner kanama gelişebilir.",
      "Yalnız geniş spektrumlu antibiyotik başlayıp koagülopatiyi izlemek": "Ateş ve nötropeni varsa antipseudomonal antibiyotik yaşamsal olabilir; fakat verilen tabloda ana acil sorun enfeksiyon değil ağır koagülopati ve kanama eğilimidir. Antibiyotik, klinik ateş veya nötropenik enfeksiyon riskiyle birlikte düşünülür; düşük fibrinojen ve yaygın kanama bulgularını düzeltmez. Bu seçenek altta yatan hematolojik acil mekanizmayı hedeflemediği için eksiktir. Bu hastada kanama kontrolü ve farklılaşma tedavisi aynı anda yürütülmelidir.",
      "ATRA’yı hemen başlamak ve fibrinojen-trombosit hedefleriyle agresif kan ürünü desteği vermek": "Bu seçenek doğrudur. Klinik ve laboratuvar paterni, kanama ile başvuran akut promiyelositik lösemi olasılığını güçlendirir; bu tabloda ATRA genetik doğrulama beklenmeden başlanmalıdır. ATRA promiyelositlerin farklılaşmasını sağlayarak doku faktörü ve fibrinolitik aktiviteye bağlı koagülopatiyi azaltır. Eş zamanlı olarak trombosit, fibrinojen ve pıhtılaşma testleri sık izlenmeli; trombosit ve kriyopresipitat/taze donmuş plazma desteğiyle kanama riski aktif biçimde azaltılmalıdır. TUS açısından ayırıcı nokta, tanıyı kesinleştirme sürecinin tedaviyi geciktirmemesi gerektiğidir.",
      "Varfarin başlamak ve INR terapötik aralığa gelene kadar takip etmek": "Varfarin antikoagülan bir ilaçtır ve bu hastadaki yaygın kanama eğilimini ağırlaştırabilir. Hastada tromboz değil, tüketim koagülopatisi ve fibrinoliz baskındır; INR yüksekliği tedavi hedefi değil kanama riskinin göstergesidir. Varfarin, atriyal fibrilasyon veya venöz tromboz gibi ayrı bir endikasyonda düşünülebilir; burada ilk yaklaşım kanama koagülopatisini düzeltmek ve hastalığa özgü tedaviyi başlatmaktır. Bu seçenek mekanizmayı ters yönde etkiler.",
      "Lökoferez yapıp farklılaşma tedavisini genetik doğrulamadan sonraya ertelemek": "Lökoferez bazı lösemilerde belirgin lökostaz bulguları varsa tartışılabilir; ancak bu olguda ön planda olan sorun koagülopati ve kanamadır. Daha önemlisi, ATRA’nın genetik doğrulama veya lökoferez sonrasına ertelenmesi bu hastalıkta kabul edilemez bir gecikme yaratır. Lökosit sayısı çok yüksek olsa bile farklılaşma tedavisi ve koagülopati desteği gecikmeden başlatılır; lökoferez rutinde ilk ve tek basamak değildir. Bu nedenle doğru öncelik ATRA + agresif hemostatik destektir."
    }
  },
  "shuffleOptions": false,
  "coreKnowledge": "Akut promiyelositik lösemi şüphesinde en kritik TUS bilgisi, ATRA’nın genetik doğrulama beklenmeden başlanması ve koagülopatinin aktif kan ürünü hedefleriyle yönetilmesidir.",
  "examPearl": "Kanama + düşük fibrinojen + Auer çubuklu granüllü blastlar görüldüğünde ATRA’yı bekletme; erken ölüm nedeni çoğu kez kanamadır.",
  "whyCorrect": "Doğru seçenek hem altta yatan farklılaşma blokunu hem de eşlik eden koagülopatiyi aynı anda hedefler.",
  "optionComparison": "Yanlış seçenekler yalnız destek tedavisine, enfeksiyon odağına, antikoagülasyona veya lökofereze kayar; bu vakada tedaviyi geciktirmeden ATRA ve hemostatik destek gereklidir.",
  "evidenceChain": [
    "Diş eti/burun kanaması ve ekimoz → aktif mukokutanöz kanama eğilimi.",
    "Trombosit 24.000/µL → kanama riski yüksek ağır trombositopeni.",
    "Fibrinojen 82 mg/dL ve D-dimer yüksekliği → tüketim/fibrinoliz paternli koagülopati.",
    "Auer çubuklu granüllü blastlar → acil farklılaşma tedavisi gerektiren akut lösemi olasılığı.",
    "Organ fonksiyonlarının başlangıçta korunmuş olması → tedavi ve tümör lizis izlemi için başlangıç noktası."
  ],
  "whyWrong": "Yanlış seçenekler kanama koagülopatisinin özgül mekanizmasını hedeflemez veya kanamayı artırabilecek yönde müdahale önerir.",
  "preserveInvestigationOrder": true,
  "aiMeta": {
    "version": "v311",
    "source": "manual-render-safe-internal-medicine-expansion",
    "antiRepeatChecked": true,
    "schemaReference": "V310 cases.js rawCases schema with diagnosis.optionFeedback object mapping"
  },
  "findings": [],
  "images": []
},
{
  "id": "v311-new-745-uzayan-oksuruk-ve-gece-terlemesi",
  "branchId": "internal-medicine",
  "caseType": "standard",
  "relatedBranch": "İç Hastalıkları",
  "title": "Uzayan öksürük ve gece terlemesi",
  "difficulty": "TUS düzeyi",
  "clinicalFocus": "Kronik solunum semptomları ve kaviteli görüntüleme paterninde aktif bulaştırıcı enfeksiyonu tanıyıp izolasyon-tedavi kararını birlikte verme.",
  "learningTarget": "Aktif akciğer enfeksiyonunda mikrobiyolojik doğrulama, kültür-duyarlılık ve çoklu ilaç tedavisinin birlikte planlandığını öğrenme.",
  "demographics": "46 yaşında erkek hasta",
  "setting": "Göğüs hastalıkları polikliniğinden acil izolasyon alanına yönlendirme",
  "chiefComplaint": "Hasta, altı haftadır geçmeyen öksürük, gece terlemesi ve kilo kaybı nedeniyle değerlendiriliyor.",
  "stem": "Hasta yaklaşık altı haftadır önce kuru başlayan, sonrasında az miktarda balgamla devam eden öksürüğü olduğunu anlatır. Son üç haftada geceleri atletini değiştirecek kadar terlediğini ve iştahı azaldığı için istemsiz kilo verdiğini söyler. Balgamında birkaç kez ince kan çizgisi fark etmiş, ancak belirgin göğüs ağrısı veya ani başlayan nefes darlığı yaşamamıştır. Aynı evde yaşayan yaşlı babasında benzer yakınma olmadığını, daha önce düzenli tüberküloz tedavisi almadığını belirtir. Sigara kullanır; yakın dönemde antibiyotik kullanmasına rağmen yakınmaları belirgin düzelmemiştir.",
  "patientIntro": {
    "profile": "46 yaşında erkek hasta, haftalardır süren öksürük ve sistemik yakınmalarla başvuruyor.",
    "presentation": "Gece terlemesi, kilo kaybı, uzayan balgamlı öksürük ve aralıklı kan çizgili balgam tarifler.",
    "historySummary": "Hasta yaklaşık altı haftadır önce kuru başlayan, sonrasında az miktarda balgamla devam eden öksürüğü olduğunu anlatır. Son üç haftada geceleri atletini değiştirecek kadar terlediğini ve iştahı azaldığı için istemsiz kilo verdiğini söyler. Balgamında birkaç kez ince kan çizgisi fark etmiş, ancak belirgin göğüs ağrısı veya ani başlayan nefes darlığı yaşamamıştır. Aynı evde yaşayan yaşlı babasında benzer yakınma olmadığını, daha önce düzenli tüberküloz tedavisi almadığını belirtir. Sigara kullanır; yakın dönemde antibiyotik kullanmasına rağmen yakınmaları belirgin düzelmemiştir."
  },
  "vitals": {
    "TA": "118/74 mmHg",
    "Nabız": "96/dk",
    "Solunum": "22/dk",
    "SpO2": "%95, oda havasında",
    "Ateş": "37.8 °C",
    "Şok indeksi": "0.81 - dolaşım stabil"
  },
  "exam": [
    "Hasta zayıf görünümlü, konuşurken aralıklı öksürmektedir.",
    "Sağ üst zonda solunum sesleri hafif azalmış, yer yer kaba ral duyulur.",
    "Belirgin periferik ödem, juguler venöz dolgunluk veya siyanoz yoktur.",
    "Hemodinamik olarak stabil görünür; kapiller dolum 2 saniyedir."
  ],
  "investigations": [
    {
      "id": "v311-new-745-uzayan-oksuruk-ve-gece-terlemesi-tetkik-1",
      "label": "Tam kan sayımı ve inflamasyon",
      "title": "Tam kan sayımı ve inflamasyon",
      "orderLabel": "Tam kan sayımı ve inflamasyon",
      "type": "laboratory",
      "priority": "essential",
      "subtype": "Tam kan sayımı ve inflamasyon",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Kronik inflamasyonu destekleyen ancak özgül olmayan laboratuvar paterni vardır.",
      "clinicalMeaning": "Kronik inflamasyonu destekleyen ancak özgül olmayan laboratuvar paterni vardır.",
      "result": {
        "title": "Tam kan sayımı ve inflamasyon",
        "summary": "Kronik inflamasyonu destekleyen ancak özgül olmayan laboratuvar paterni vardır.",
        "interpretation": "Kronik inflamasyonu destekleyen ancak özgül olmayan laboratuvar paterni vardır.",
        "values": [
          [
            "Hemoglobin",
            "12.2 g/dL",
            "13.5-17.5 g/dL",
            "Hafif anemi"
          ],
          [
            "Lökosit",
            "8.900/µL",
            "4.000-10.000/µL",
            "Normal-sınırda"
          ],
          [
            "CRP",
            "46 mg/L",
            "<5 mg/L",
            "Yüksek"
          ],
          [
            "ESR",
            "72 mm/saat",
            "<20 mm/saat",
            "Yüksek"
          ]
        ]
      }
    },
    {
      "id": "v311-new-745-uzayan-oksuruk-ve-gece-terlemesi-tetkik-2",
      "label": "Akciğer grafisi ve toraks BT",
      "title": "Akciğer grafisi ve toraks BT",
      "orderLabel": "Akciğer grafisi ve toraks BT",
      "type": "imaging",
      "priority": "essential",
      "subtype": "Akciğer grafisi ve toraks BT",
      "category": "imaging",
      "testTypeCategory": "imaging",
      "summary": "Üst lob ağırlıklı kaviter ve bronkojenik yayılım paternli görüntüleme bulguları vardır.",
      "clinicalMeaning": "Üst lob ağırlıklı kaviter ve bronkojenik yayılım paternli görüntüleme bulguları vardır.",
      "result": {
        "title": "Akciğer grafisi ve toraks BT",
        "summary": "Üst lob ağırlıklı kaviter ve bronkojenik yayılım paternli görüntüleme bulguları vardır.",
        "interpretation": "Üst lob ağırlıklı kaviter ve bronkojenik yayılım paternli görüntüleme bulguları vardır.",
        "values": [
          [
            "Akciğer grafisi",
            "Sağ üst zonda heterojen infiltrasyon ve hacim kaybı",
            "",
            "Üst zon ağırlıklı tutulum"
          ],
          [
            "Toraks BT",
            "Sağ apikal bölgede kalın duvarlı kaviter lezyon ve çevresinde tomurcuklanan ağaç görünümü",
            "",
            "Hava yolu yayılımı düşündüren bulgu"
          ],
          [
            "Plevral sıvı",
            "Belirgin sıvı izlenmedi",
            "",
            "Alternatif plevral süreç geri planda"
          ]
        ]
      }
    },
    {
      "id": "v311-new-745-uzayan-oksuruk-ve-gece-terlemesi-tetkik-3",
      "label": "Balgam mikrobiyolojisi",
      "title": "Balgam mikrobiyolojisi",
      "orderLabel": "Balgam mikrobiyolojisi",
      "type": "laboratory",
      "priority": "essential",
      "subtype": "Balgam mikrobiyolojisi",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Balgam incelemesi aktif mikobakteriyel hastalık açısından yönlendiricidir.",
      "clinicalMeaning": "Balgam incelemesi aktif mikobakteriyel hastalık açısından yönlendiricidir.",
      "result": {
        "title": "Balgam mikrobiyolojisi",
        "summary": "Balgam incelemesi aktif mikobakteriyel hastalık açısından yönlendiricidir.",
        "interpretation": "Balgam incelemesi aktif mikobakteriyel hastalık açısından yönlendiricidir.",
        "values": [
          [
            "Aside dirençli basil boyası",
            "Pozitif",
            "Negatif beklenir",
            "Mikobakteriyel yük lehine"
          ],
          [
            "Moleküler NAAT",
            "M. tuberculosis kompleksi saptandı; rifampisin direnci saptanmadı",
            "Negatif beklenir",
            "Hızlı mikrobiyolojik destek"
          ],
          [
            "Kültür",
            "Sonuç bekleniyor",
            "",
            "Duyarlılık için gerekli"
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
  "question": "Bu hastada en uygun tanısal-yönetim yaklaşımı aşağıdakilerden hangisidir?",
  "questionType": "Enfeksiyon / bulaş kontrolü ve tedavi",
  "answerTarget": "Aktif akciğer enfeksiyonunda izolasyon, mikrobiyoloji ve çoklu tedavi kararını birlikte verme.",
  "diagnosis": {
    "correct": "Hava yolu izolasyonu sağlayıp balgam mikroskopi-kültür/NAAT örnekleriyle birlikte çoklu antitüberküloz tedavi başlamak",
    "options": [
      "Hava yolu izolasyonu sağlayıp balgam mikroskopi-kültür/NAAT örnekleriyle birlikte çoklu antitüberküloz tedavi başlamak",
      "Yalnız makrolid monoterapisi verip akciğer grafisini dört hafta sonra tekrarlamak",
      "Sadece inhaler kortikosteroid ve bronkodilatörle obstrüktif hastalık tedavisi başlamak",
      "Bronkoskopiyi erteleyip sistemik kortikosteroidle semptom kontrolü yapmak",
      "Antibiyotik vermeden latent enfeksiyon profilaksisiyle ayaktan izlemek"
    ],
    "question": "Bu hastada en uygun tanısal-yönetim yaklaşımı aşağıdakilerden hangisidir?",
    "explanation": "Uzayan öksürük, gece terlemesi, kilo kaybı, üst lob kavitasyonu ve balgamda mikrobiyolojik pozitiflik aktif akciğer tüberkülozu ile uyumludur. Yönetimde yalnız tanı veya yalnız tedavi değil; hava yolu izolasyonu, kültür-duyarlılık ve çoklu antitüberküloz tedavi birlikte planlanır.",
    "pearls": [
      "Kronik öksürük ve gece terlemesi aktif granülomatöz enfeksiyon açısından uyarıcıdır.",
      "Kaviteli üst lob lezyonu bulaştırıcılık ve yüksek basil yükü açısından önemlidir.",
      "NAAT hızlı karar sağlar; kültür ve duyarlılık tedavinin güvenliği için gereklidir."
    ],
    "optionFeedback": {
      "Hava yolu izolasyonu sağlayıp balgam mikroskopi-kültür/NAAT örnekleriyle birlikte çoklu antitüberküloz tedavi başlamak": "Bu seçenek doğrudur. Kronik öksürük, gece terlemesi, kilo kaybı, üst lob kavitasyonları ve balgamda aside dirençli basil/NAAT pozitifliği aktif akciğer enfeksiyonu için güçlü bir paterndir. Bu hastada hem bireysel tedavi hem de bulaş kontrolü aynı anda düşünülmelidir: hava yolu izolasyonu, uygun balgam örnekleri, kültür-duyarlılık ve çoklu antitüberküloz tedavi birlikte yürütülür. Tek ilaç veya yalnız gözlem direnç, bulaş ve klinik ilerleme riskini artırır.",
      "Yalnız makrolid monoterapisi verip akciğer grafisini dört hafta sonra tekrarlamak": "Makrolid monoterapisi atipik toplum kökenli pnömonide kullanılabilir; ancak bu hasta haftalardır süren kilo kaybı, gece terlemesi ve kaviteli üst lob lezyonuyla gelir. Tek antibiyotikle izlem, aktif bulaştırıcı hastalıkta hem tanıyı geciktirir hem de toplum sağlığı açısından risklidir. Ayrıca balgam mikroskopisi/NAAT pozitifliği varken dört hafta beklemek hastanın bulaştırıcılığını ve klinik ilerleme riskini artırır. Bu seçenek akut bakteriyel bronşit veya hafif atipik pnömoni gibi daha kısa süreli tablolara yaklaşımı temsil eder.",
      "Sadece inhaler kortikosteroid ve bronkodilatörle obstrüktif hastalık tedavisi başlamak": "İnhaler kortikosteroid ve bronkodilatör KOAH veya astım alevlenmesinde anlamlı olabilir. Burada wheezing baskın değildir; kilo kaybı, gece terlemesi, hemoptiziye yakın çizgili balgam ve kavitasyon enfeksiyöz-granülomatöz bir süreci destekler. İnhaler steroid tek başına enfeksiyonu tedavi etmez ve tanı gecikirse bulaş sürer. KOAH eşlik etse bile aktif enfeksiyonun izolasyon ve çoklu tedavi gereksinimi değişmez.",
      "Bronkoskopiyi erteleyip sistemik kortikosteroidle semptom kontrolü yapmak": "Sistemik kortikosteroidler belirli tüberküloz formlarında veya ağır inflamatuvar komplikasyonlarda ek tedavi olarak gündeme gelebilir; ancak aktif akciğer hastalığında tanı ve antimikrobiyal tedavinin yerine geçmez. Steroid monoterapisi basil yükünü artırabilir ve klinik kötüleşmeye yol açabilir. Bronkoskopi bazı hastalarda balgam alınamıyorsa gerekebilir; fakat bu olguda balgam örnekleri zaten yönlendiricidir. Öncelik izolasyon, mikrobiyolojik doğrulama ve çoklu ilaç tedavisidir.",
      "Antibiyotik vermeden latent enfeksiyon profilaksisiyle ayaktan izlemek": "Latent enfeksiyon tedavisi semptomsuz, aktif hastalık bulgusu olmayan kişiler içindir. Bu hastada öksürük, sistemik semptomlar, kavitasyon ve pozitif mikrobiyolojik testler aktif hastalığı destekler. Latent profilaksiyle ayaktan izlem hem yetersiz tedavi hem de bulaştırıcılığın devamı anlamına gelir. Aktif hastalık dışlanmadan latent rejime yönelmek önemli bir yönetim hatasıdır."
    }
  },
  "shuffleOptions": false,
  "coreKnowledge": "Aktif akciğer tüberkülozunda klinik-görüntüleme-mikrobiyoloji birlikte değerlendirilir; bulaş riski nedeniyle izolasyon, balgam örnekleri ve çoklu tedavi geciktirilmez.",
  "examPearl": "Kavite + gece terlemesi + kilo kaybı + balgam AFB/NAAT pozitifliği varsa latent tedavi değil aktif hastalık yönetimi gerekir.",
  "whyCorrect": "Doğru seçenek hastanın bulaştırıcılığını, tanısal doğrulamayı ve etkili çoklu tedaviyi aynı anda ele alır.",
  "optionComparison": "Yanlış seçenekler aktif bulaştırıcı hastalığı hafif pnömoni, obstrüktif hastalık, steroidle baskılanacak inflamasyon veya latent enfeksiyon gibi ele alır.",
  "evidenceChain": [
    "Altı haftalık öksürük + gece terlemesi → kronik enfeksiyon olasılığı.",
    "Sağ üst lob kavitasyonu → yüksek basil yükü ve bulaş riski.",
    "Balgam AFB pozitifliği → hava yolu izolasyonu gerektiren mikrobiyolojik bulgu.",
    "NAAT ile M. tuberculosis saptanması → tedavi kararını hızlandırır.",
    "Kültür sonucu bekleniyor → duyarlılık takibi tedavinin parçasıdır."
  ],
  "whyWrong": "Yanlış seçenekler bulaş kontrolünü ve çoklu ilaç gereksinimini ihmal eder; bu nedenle hem hasta hem toplum açısından risklidir.",
  "preserveInvestigationOrder": true,
  "aiMeta": {
    "version": "v311",
    "source": "manual-render-safe-internal-medicine-expansion",
    "antiRepeatChecked": true,
    "schemaReference": "V310 cases.js rawCases schema with diagnosis.optionFeedback object mapping"
  },
  "findings": [],
  "images": []
},
{
  "id": "v311-new-746-bel-agrisiyla-gelen-kanser-hastasinda-bacak-gucsuzlugu",
  "branchId": "internal-medicine",
  "caseType": "standard",
  "relatedBranch": "İç Hastalıkları",
  "title": "Bel ağrısıyla gelen kanser hastasında bacak güçsüzlüğü",
  "difficulty": "TUS düzeyi",
  "clinicalFocus": "Malignite öyküsü olan hastada yeni bel ağrısı ve nörolojik defisiti onkolojik acil olarak değerlendirme.",
  "learningTarget": "Metastatik spinal kanal basısında steroid, acil MR ve multidisipliner tedavi kararının geciktirilmemesi gerektiğini öğrenme.",
  "demographics": "63 yaşında erkek hasta",
  "setting": "Acil servis / onkoloji konsültasyonu",
  "chiefComplaint": "Hasta, giderek artan bel ağrısı ve bacaklarında güçsüzlük nedeniyle acile getiriliyor.",
  "stem": "Hasta son iki haftadır sırtından beline doğru yayılan derin bir ağrı hissettiğini, son üç gecedir ağrının uykudan uyandıracak kadar arttığını anlatır. Son iki gündür merdiven çıkarken bacaklarının boşaldığını ve yürürken duvara tutunma ihtiyacı duyduğunu söyler. Sabah idrarını başlatmakta zorlanmış, ancak tam idrar kaçırma yaşamamıştır. Bilinen metastatik akciğer kanseri nedeniyle sistemik tedavi aldığını, yakın zamanda düşme veya ağır kaldırma olmadığını belirtir. Ateş, titreme veya yeni öksürük tariflemez; ağrı basit ağrı kesiciyle belirgin rahatlamamıştır.",
  "patientIntro": {
    "profile": "63 yaşında metastatik akciğer kanseri olan erkek hasta, yeni bel ağrısı ve ilerleyen bacak güçsüzlüğüyle başvuruyor.",
    "presentation": "Gece artan aksiyel ağrıya iki taraflı bacak güçsüzlüğü ve idrar başlatmada zorlanma eşlik eder.",
    "historySummary": "Hasta son iki haftadır sırtından beline doğru yayılan derin bir ağrı hissettiğini, son üç gecedir ağrının uykudan uyandıracak kadar arttığını anlatır. Son iki gündür merdiven çıkarken bacaklarının boşaldığını ve yürürken duvara tutunma ihtiyacı duyduğunu söyler. Sabah idrarını başlatmakta zorlanmış, ancak tam idrar kaçırma yaşamamıştır. Bilinen metastatik akciğer kanseri nedeniyle sistemik tedavi aldığını, yakın zamanda düşme veya ağır kaldırma olmadığını belirtir. Ateş, titreme veya yeni öksürük tariflemez; ağrı basit ağrı kesiciyle belirgin rahatlamamıştır."
  },
  "vitals": {
    "TA": "132/78 mmHg",
    "Nabız": "104/dk",
    "Solunum": "20/dk",
    "SpO2": "%94, oda havasında",
    "Ateş": "36.9 °C",
    "Şok indeksi": "0.79 - dolaşım stabil"
  },
  "exam": [
    "Hasta ağrı nedeniyle hareket etmekte zorlanır; bilinç açıktır.",
    "Alt ekstremitelerde proksimal kas gücü bilateral 4-/5, distal kas gücü 4/5 saptanır.",
    "T8 düzeyi altında duyu azalması tarifler; patellar refleksler canlıdır.",
    "Perianal duyu azalmamış olmakla birlikte mesane yakınması nedeniyle yakın nörolojik izlem gerektirir."
  ],
  "investigations": [
    {
      "id": "v311-new-746-bel-agrisiyla-gelen-kanser-hastasinda-bacak-gucsuzlugu-tetkik-1",
      "label": "Temel laboratuvar",
      "title": "Temel laboratuvar",
      "orderLabel": "Temel laboratuvar",
      "type": "laboratory",
      "priority": "essential",
      "subtype": "Temel laboratuvar",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Laboratuvarlar acil nörolojik tabloyu açıklamaktan çok eşlik eden durumları tarar.",
      "clinicalMeaning": "Laboratuvarlar acil nörolojik tabloyu açıklamaktan çok eşlik eden durumları tarar.",
      "result": {
        "title": "Temel laboratuvar",
        "summary": "Laboratuvarlar acil nörolojik tabloyu açıklamaktan çok eşlik eden durumları tarar.",
        "interpretation": "Laboratuvarlar acil nörolojik tabloyu açıklamaktan çok eşlik eden durumları tarar.",
        "values": [
          [
            "Hemoglobin",
            "10.7 g/dL",
            "13.5-17.5 g/dL",
            "Kronik hastalık/anemi"
          ],
          [
            "Lökosit",
            "7.600/µL",
            "4.000-10.000/µL",
            "Belirgin enfeksiyon lehine değil"
          ],
          [
            "CRP",
            "18 mg/L",
            "<5 mg/L",
            "Hafif yüksek"
          ],
          [
            "Kalsiyum",
            "9.6 mg/dL",
            "8.5-10.5 mg/dL",
            "Normal"
          ]
        ]
      }
    },
    {
      "id": "v311-new-746-bel-agrisiyla-gelen-kanser-hastasinda-bacak-gucsuzlugu-tetkik-2",
      "label": "Acil spinal MR",
      "title": "Acil spinal MR",
      "orderLabel": "Acil spinal MR",
      "type": "imaging",
      "priority": "essential",
      "subtype": "Acil spinal MR",
      "category": "imaging",
      "testTypeCategory": "imaging",
      "summary": "MR, epidural basının düzeyini ve nörolojik bulgularla ilişkisini gösterir.",
      "clinicalMeaning": "MR, epidural basının düzeyini ve nörolojik bulgularla ilişkisini gösterir.",
      "result": {
        "title": "Acil spinal MR",
        "summary": "MR, epidural basının düzeyini ve nörolojik bulgularla ilişkisini gösterir.",
        "interpretation": "MR, epidural basının düzeyini ve nörolojik bulgularla ilişkisini gösterir.",
        "values": [
          [
            "Torakal omurga",
            "T7 korpusunda metastatik tutulum ve posterior epidural yumuşak doku komponenti",
            "",
            "Spinal kanal içine uzanım"
          ],
          [
            "Kord basısı",
            "T7 düzeyinde belirgin kord basısı ve çevresel ödem",
            "",
            "Nörolojik defisitle uyumlu"
          ],
          [
            "Diğer düzeyler",
            "Lomber bölgede ek belirgin bası yok",
            "",
            "Tedavi planı için düzey belirleme"
          ]
        ]
      }
    },
    {
      "id": "v311-new-746-bel-agrisiyla-gelen-kanser-hastasinda-bacak-gucsuzlugu-tetkik-3",
      "label": "Nörolojik seri değerlendirme",
      "title": "Nörolojik seri değerlendirme",
      "orderLabel": "Nörolojik seri değerlendirme",
      "type": "clinical",
      "priority": "essential",
      "subtype": "Nörolojik seri değerlendirme",
      "category": "clinical",
      "testTypeCategory": "clinical",
      "summary": "Seri nörolojik bulgular acil tedavi zamanlamasını belirler.",
      "clinicalMeaning": "Seri nörolojik bulgular acil tedavi zamanlamasını belirler.",
      "result": {
        "title": "Nörolojik seri değerlendirme",
        "summary": "Seri nörolojik bulgular acil tedavi zamanlamasını belirler.",
        "interpretation": "Seri nörolojik bulgular acil tedavi zamanlamasını belirler.",
        "values": [
          [
            "Motor güç",
            "Bilateral alt ekstremitede 4-/5",
            "5/5",
            "Motor defisit"
          ],
          [
            "Duyu",
            "T8 altında azalma",
            "Normal",
            "Duyu seviyesi"
          ],
          [
            "Mesane",
            "İdrar başlatmada zorlanma",
            "Normal işeme",
            "Otonom etkilenme uyarısı"
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
  "question": "Bu hastada acil yönetimde en uygun öncelikli yaklaşım aşağıdakilerden hangisidir?",
  "questionType": "Onkolojik acil yönetimi",
  "answerTarget": "Nörolojik defisitli kanser hastasında spinal kanal basısını gecikmeden yönetme.",
  "diagnosis": {
    "correct": "Deksametazon başlamak, acil tüm spinal MR istemek ve nöroşirürji-radyasyon onkolojisiyle aynı gün değerlendirmek",
    "options": [
      "Oral analjezik verip kemik sintigrafisini poliklinik koşullarında planlamak",
      "Antibiyotik başlayıp nörolojik muayeneyi enfeksiyon gerileyene kadar ertelemek",
      "Fizik tedavi programı başlatıp steroid ve görüntülemeyi ayaktan değerlendirmek",
      "Deksametazon başlamak, acil tüm spinal MR istemek ve nöroşirürji-radyasyon onkolojisiyle aynı gün değerlendirmek",
      "Lomber ponksiyon yapıp sitoloji sonucuna göre tedavi kararı vermek"
    ],
    "question": "Bu hastada acil yönetimde en uygun öncelikli yaklaşım aşağıdakilerden hangisidir?",
    "explanation": "Malignite öyküsü, gece artan aksiyel ağrı, ilerleyen bacak güçsüzlüğü, duyu seviyesi ve mesane yakınması metastatik spinal kanal basısı açısından acildir. Deksametazon, acil tüm spinal MR ve aynı gün nöroşirürji-radyasyon onkolojisi değerlendirmesi nörolojik fonksiyon kaybını sınırlamak için geciktirilmemelidir.",
    "pearls": [
      "Kanser öyküsü + yeni gece ağrısı kırmızı bayraktır.",
      "Motor defisit ve duyu seviyesi mekanik nöral basıyı destekler.",
      "MR düzeyi gösterir; tedavi kararı cerrahi/radyoterapi ekseninde hızla verilir."
    ],
    "optionFeedback": {
      "Oral analjezik verip kemik sintigrafisini poliklinik koşullarında planlamak": "Analjezi ağrı kontrolü için gereklidir; ancak yeni bacak güçsüzlüğü ve idrar başlatmada zorlanma varlığında tek başına yeterli ve güvenli değildir. Poliklinik koşullarında gecikmiş kemik sintigrafisi spinal kanal basısını hızlı göstermez ve nörolojik kaybı geri döndürülebilir dönemde yakalama fırsatını kaçırabilir. Kanser öyküsü olan hastada yeni mekanik bel ağrısı ve nörolojik defisit acil görüntüleme gerektirir. Bu seçenek ağrıyı semptom olarak ele alır, omurilik/kauda basısı riskini yönetmez.",
      "Antibiyotik başlayıp nörolojik muayeneyi enfeksiyon gerileyene kadar ertelemek": "Ateş, belirgin lökositoz veya epidural apseyi düşündüren enfeksiyon odağı verilmemiştir. Enfeksiyon düşünülse bile yeni nörolojik defisit nörolojik değerlendirme ve acil MR gereksinimini ortadan kaldırmaz. Antibiyotik başlanması gereken bir tablo olsaydı bile görüntüleme ve cerrahi/radyasyon değerlendirmesi geciktirilmemelidir. Bu seçenek acil nörolojik tehdidi enfeksiyon tedavisi arkasına sakladığı için hatalıdır.",
      "Fizik tedavi programı başlatıp steroid ve görüntülemeyi ayaktan değerlendirmek": "Fizik tedavi kronik mekanik bel ağrısı veya stabil nörolojik defisiti olmayan hastalarda düşünülebilir. Bu olguda gece artan ağrı, bilinen malignite, bacak güçsüzlüğü ve mesane yakınması kırmızı bayrak niteliğindedir. Steroid ve görüntülemenin ayaktan ertelenmesi kalıcı paraparezi veya mesane disfonksiyonu riskini artırır. Bu nedenle rehabilitasyon ancak acil bası dışlanıp stabilizasyon sağlandıktan sonra gündeme gelebilir.",
      "Deksametazon başlamak, acil tüm spinal MR istemek ve nöroşirürji-radyasyon onkolojisiyle aynı gün değerlendirmek": "Bu seçenek doğrudur. Bilinen akciğer kanseri olan hastada yeni başlayan şiddetli sırt-bel ağrısı, bacak güçsüzlüğü, duyu seviyesi ve idrar başlatmada zorlanma metastatik spinal kanal basısını düşündüren acil bulgulardır. Deksametazon ödemi azaltmak ve nörolojik bozulmayı sınırlamak için erken başlanır; tüm spinal MR lezyon düzeyini ve çoklu odakları değerlendirmek için tercih edilir. Aynı gün nöroşirürji ve radyasyon onkolojisi değerlendirmesi, cerrahi dekompresyon/stabilizasyon veya radyoterapi kararını geciktirmemek için gereklidir.",
      "Lomber ponksiyon yapıp sitoloji sonucuna göre tedavi kararı vermek": "Lomber ponksiyon bu tabloda ilk basamak değildir ve spinal kanal basısı şüphesi varken gereksiz gecikme yaratabilir. BOS sitolojisi leptomeningeal hastalık şüphesinde anlamlı olabilir; ancak bu hastada fokal omurga ağrısı, nörolojik defisit ve görüntülemede epidural kitle daha acil bir mekanik bası sorununu düşündürür. Ayrıca bası varken LP güvenlik açısından da dikkat gerektirir. İlk yaklaşım steroid, acil MR ve ilgili ekiplerin değerlendirmesidir."
    }
  },
  "shuffleOptions": false,
  "coreKnowledge": "Kanser hastasında yeni bel/sırt ağrısına güçsüzlük, duyu seviyesi veya mesane-barsak bulgusu eşlik ederse metastatik spinal kanal basısı dışlanana kadar onkolojik acil kabul edilir.",
  "examPearl": "Bel ağrısı + kanser + nörolojik defisit = ayaktan analjezi değil; steroid, acil MR ve multidisipliner değerlendirme.",
  "whyCorrect": "Doğru seçenek hem ödemi azaltan erken medikal basamağı hem de kalıcı nörolojik kaybı önlemek için acil görüntüleme ve girişim kararını içerir.",
  "optionComparison": "Yanlış seçenekler ağrıyı rutin mekanik ağrı gibi yönetir, enfeksiyon/rehabilitasyon/BOS sitolojisi eksenine kayar veya görüntülemeyi geciktirir.",
  "evidenceChain": [
    "Metastatik akciğer kanseri öyküsü → vertebral metastaz ve epidural bası riski.",
    "Gece uykudan uyandıran ağrı → malign omurga ağrısı için kırmızı bayrak.",
    "Bilateral bacak güçsüzlüğü → motor yol etkilenmesi.",
    "T8 altında duyu azalması → lezyon düzeyini destekleyen nörolojik bulgu.",
    "MR’da epidural komponent ve kord basısı → acil dekompresyon/radyoterapi kararı gerektirir."
  ],
  "whyWrong": "Yanlış seçenekler zaman duyarlı kord basısı ihtimalini azaltır ve kalıcı nörolojik kayba yol açabilecek gecikme yaratır.",
  "preserveInvestigationOrder": true,
  "aiMeta": {
    "version": "v311",
    "source": "manual-render-safe-internal-medicine-expansion",
    "antiRepeatChecked": true,
    "schemaReference": "V310 cases.js rawCases schema with diagnosis.optionFeedback object mapping"
  },
  "findings": [],
  "images": []
},
{
  "id": "v311-new-747-boyun-damarlarinda-dolgunluk-ve-asitle-gelen-hasta",
  "branchId": "internal-medicine",
  "caseType": "standard",
  "relatedBranch": "İç Hastalıkları",
  "title": "Boyun damarlarında dolgunluk ve asitle gelen hasta",
  "difficulty": "TUS düzeyi",
  "clinicalFocus": "Sağ kalp konjesyonu ile gelen hastada korunmuş ejeksiyon fraksiyonu ve perikardiyal kısıtlama bulgularını birlikte yorumlama.",
  "learningTarget": "Konstriktif fizyolojide diyastolik dolum kısıtlanması, ventriküler interdependans ve sistemik venöz konjesyon ilişkisini kavrama.",
  "demographics": "58 yaşında erkek hasta",
  "setting": "Kardiyoloji polikliniği / servis değerlendirmesi",
  "chiefComplaint": "Hasta, aylardır artan karın şişliği, bacak ödemi ve eforla nefes darlığı nedeniyle başvuruyor.",
  "stem": "Hasta son altı aydır ayakkabılarının gün sonunda sıkmaya başladığını ve karnında giderek artan şişlik olduğunu anlatır. Önceleri uzun yürüyüşlerde zorlanırken artık kısa mesafede yorulduğunu, ancak düz yatınca belirgin boğulma hissi yaşamadığını söyler. Göğüs ağrısı tariflemez; çarpıntı atakları kısa süreli olmuştur. Çocukluğunda akciğer enfeksiyonu nedeniyle uzun tedavi aldığını, yıllar önce de tekrarlayan göğüs zarı iltihabı söylendiğini hatırlar. Alkol kullanımının sınırlı olduğunu, son aylarda sarılık veya siyah dışkı fark etmediğini belirtir.",
  "patientIntro": {
    "profile": "58 yaşında erkek hasta, kronik sistemik venöz konjesyon bulgularıyla kardiyolojiye yönlendiriliyor.",
    "presentation": "Karın şişliği, bacak ödemi ve efor dispnesi vardır; ortopne belirgin değildir.",
    "historySummary": "Hasta son altı aydır ayakkabılarının gün sonunda sıkmaya başladığını ve karnında giderek artan şişlik olduğunu anlatır. Önceleri uzun yürüyüşlerde zorlanırken artık kısa mesafede yorulduğunu, ancak düz yatınca belirgin boğulma hissi yaşamadığını söyler. Göğüs ağrısı tariflemez; çarpıntı atakları kısa süreli olmuştur. Çocukluğunda akciğer enfeksiyonu nedeniyle uzun tedavi aldığını, yıllar önce de tekrarlayan göğüs zarı iltihabı söylendiğini hatırlar. Alkol kullanımının sınırlı olduğunu, son aylarda sarılık veya siyah dışkı fark etmediğini belirtir."
  },
  "vitals": {
    "TA": "112/70 mmHg",
    "Nabız": "94/dk",
    "Solunum": "20/dk",
    "SpO2": "%96, oda havasında",
    "Ateş": "36.6 °C",
    "Şok indeksi": "0.84 - dolaşım stabil"
  },
  "exam": [
    "Juguler venöz dolgunluk belirgindir ve inspiryumda azalmak yerine devam eder.",
    "Akciğer bazallerinde belirgin raller yoktur; kalp sesleri derinden gelir.",
    "Karında asit ile uyumlu matite değişimi ve bilateral pretibial ödem vardır.",
    "Karaciğer kenarı hafif büyümüş ve hassastır; belirgin sarılık izlenmez."
  ],
  "investigations": [
    {
      "id": "v311-new-747-boyun-damarlarinda-dolgunluk-ve-asitle-gelen-hasta-tetkik-1",
      "label": "Ekokardiyografi",
      "title": "Ekokardiyografi",
      "orderLabel": "Ekokardiyografi",
      "type": "imaging",
      "priority": "essential",
      "subtype": "Ekokardiyografi",
      "category": "imaging",
      "testTypeCategory": "imaging",
      "summary": "Korunmuş EF’ye rağmen dolum fizyolojisini etkileyen perikardiyal bulgular vardır.",
      "clinicalMeaning": "Korunmuş EF’ye rağmen dolum fizyolojisini etkileyen perikardiyal bulgular vardır.",
      "result": {
        "title": "Ekokardiyografi",
        "summary": "Korunmuş EF’ye rağmen dolum fizyolojisini etkileyen perikardiyal bulgular vardır.",
        "interpretation": "Korunmuş EF’ye rağmen dolum fizyolojisini etkileyen perikardiyal bulgular vardır.",
        "values": [
          [
            "Sol ventrikül EF",
            "%58",
            ">%50",
            "Korunmuş sistolik fonksiyon"
          ],
          [
            "Septal hareket",
            "Solunumla belirgin septal bounce",
            "Yok",
            "Ventriküler etkileşim"
          ],
          [
            "Mitral/triküspit inflow",
            "Solunumla belirgin karşıt yönlü değişkenlik",
            "Minimal değişim",
            "Dolum kısıtlanması lehine"
          ],
          [
            "Perikard",
            "Kalın ve ekojen görünüm",
            "İnce",
            "Perikardiyal kısıtlama bulgusu"
          ]
        ]
      }
    },
    {
      "id": "v311-new-747-boyun-damarlarinda-dolgunluk-ve-asitle-gelen-hasta-tetkik-2",
      "label": "Toraks BT",
      "title": "Toraks BT",
      "orderLabel": "Toraks BT",
      "type": "imaging",
      "priority": "essential",
      "subtype": "Toraks BT",
      "category": "imaging",
      "testTypeCategory": "imaging",
      "summary": "BT perikardda kalınlaşma ve kalsifikasyon gösterir.",
      "clinicalMeaning": "BT perikardda kalınlaşma ve kalsifikasyon gösterir.",
      "result": {
        "title": "Toraks BT",
        "summary": "BT perikardda kalınlaşma ve kalsifikasyon gösterir.",
        "interpretation": "BT perikardda kalınlaşma ve kalsifikasyon gösterir.",
        "values": [
          [
            "Perikard kalınlığı",
            "6 mm",
            "Genellikle <2 mm",
            "Kalınlaşmış"
          ],
          [
            "Perikard kalsifikasyonu",
            "Yamalı kalsifik odaklar",
            "Yok",
            "Kronik perikardiyal süreç"
          ],
          [
            "Akciğer parankimi",
            "Belirgin akut infiltrasyon yok",
            "",
            "Eşlik eden akut pnömoni yok"
          ]
        ]
      }
    },
    {
      "id": "v311-new-747-boyun-damarlarinda-dolgunluk-ve-asitle-gelen-hasta-tetkik-3",
      "label": "Laboratuvar",
      "title": "Laboratuvar",
      "orderLabel": "Laboratuvar",
      "type": "laboratory",
      "priority": "essential",
      "subtype": "Laboratuvar",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Asit ve ödemi tek başına primer karaciğer veya böbrek yetmezliğiyle açıklayacak güçlü laboratuvar paterni yoktur.",
      "clinicalMeaning": "Asit ve ödemi tek başına primer karaciğer veya böbrek yetmezliğiyle açıklayacak güçlü laboratuvar paterni yoktur.",
      "result": {
        "title": "Laboratuvar",
        "summary": "Asit ve ödemi tek başına primer karaciğer veya böbrek yetmezliğiyle açıklayacak güçlü laboratuvar paterni yoktur.",
        "interpretation": "Asit ve ödemi tek başına primer karaciğer veya böbrek yetmezliğiyle açıklayacak güçlü laboratuvar paterni yoktur.",
        "values": [
          [
            "Albumin",
            "3.8 g/dL",
            "3.5-5.0 g/dL",
            "Hipoalbüminemi yok"
          ],
          [
            "AST/ALT",
            "34/29 U/L",
            "<40 U/L",
            "Belirgin hepatoselüler hasar yok"
          ],
          [
            "BNP",
            "176 pg/mL",
            "<100 pg/mL",
            "Hafif-orta artış"
          ],
          [
            "Kreatinin",
            "1.0 mg/dL",
            "0.6-1.2 mg/dL",
            "Korunmuş"
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
  "question": "Bu hastadaki bulguları en iyi açıklayan mekanizma aşağıdakilerden hangisidir?",
  "questionType": "Mekanizma / kardiyoloji fizyolojisi",
  "answerTarget": "Konstriktif perikardiyal fizyolojiyi sistolik yetmezlik ve diğer sağ kalp yüklenmelerinden ayırma.",
  "diagnosis": {
    "correct": "Kalınlaşmış ve esnekliğini kaybetmiş perikardın diyastolik dolumu sınırlaması ve ventriküller arası bağımlılığı artırması",
    "options": [
      "Sistolik pompa gücü azalmasına bağlı ileri sol ventrikül ejeksiyon fraksiyonu düşüklüğü",
      "Kalınlaşmış ve esnekliğini kaybetmiş perikardın diyastolik dolumu sınırlaması ve ventriküller arası bağımlılığı artırması",
      "Mitral kapak prolapsusuna bağlı geç sistolik kaçak ve izole sol atriyal basınç artışı",
      "Pulmoner arter trombüsü nedeniyle ani gelişen ölü boşluk artışı ve sağ ventrikül afterload yükselmesi",
      "Primer renal sodyum tutulumu nedeniyle intravasküler hacim artışı ve düşük reninli hipertansiyon"
    ],
    "question": "Bu hastadaki bulguları en iyi açıklayan mekanizma aşağıdakilerden hangisidir?",
    "explanation": "Kronik sağ taraflı konjesyon, Kussmaul bulgusu, korunmuş ejeksiyon fraksiyonu, perikard kalınlaşması/kalsifikasyonu, septal bounce ve solunumla belirgin dolum değişkenliği perikardiyal kısıtlama mekanizmasını destekler. Temel sorun sert perikardın diyastolik genişlemeyi sınırlaması ve ventriküller arası bağımlılığı artırmasıdır.",
    "pearls": [
      "Korunmuş EF, sistolik pompa yetmezliğini geri plana iter.",
      "Perikard kalınlaşması/kalsifikasyonu kronik kısıtlayıcı süreci destekler.",
      "Kussmaul ve asit sistemik venöz konjesyonun klinik yansımasıdır."
    ],
    "optionFeedback": {
      "Sistolik pompa gücü azalmasına bağlı ileri sol ventrikül ejeksiyon fraksiyonu düşüklüğü": "İleri sistolik kalp yetmezliğinde düşük ejeksiyon fraksiyonu, genişlemiş sol ventrikül, S3 ve pulmoner konjesyon beklenebilir. Bu olguda ejeksiyon fraksiyonu korunmuş, perikard kalınlığı artmış, septal bounce ve solunumla değişen dolum bulguları verilmiştir. Sağ kalp konjesyonu baskın olsa da temel sorun miyokardın sistolik pompa gücü değil, kalbin diyastolde dıştan kısıtlanmasıdır. Bu nedenle klasik HFrEF mekanizması bu tabloyu en iyi açıklamaz.",
      "Kalınlaşmış ve esnekliğini kaybetmiş perikardın diyastolik dolumu sınırlaması ve ventriküller arası bağımlılığı artırması": "Bu seçenek doğrudur. Kalınlaşmış, sert perikard diyastolde kalp boşluklarının genişlemesini sınırlar; erken hızlı dolumdan sonra hacim artışı aniden durur. Bu durum sağ ve sol ventrikül dolumlarının solunumla birbirini daha belirgin etkilemesine, septal bounce bulgusuna, Kussmaul belirtisine ve sistemik venöz konjesyona yol açar. Korunmuş ejeksiyon fraksiyonu ile belirgin asit-JVD birlikteliği konstriktif fizyolojiyi sistolik yetmezlikten ayırır. TUS açısından anahtar, sorunun miyokard kasılmasından çok perikardiyal kısıtlama olmasıdır.",
      "Mitral kapak prolapsusuna bağlı geç sistolik kaçak ve izole sol atriyal basınç artışı": "Mitral kapak prolapsusu çarpıntı, atipik göğüs ağrısı, midsistolik klik ve geç sistolik üfürüm ile gelebilir; ileri olursa mitral yetersizlik üzerinden sol atriyal hacim yükü oluşturabilir. Bu hastada periferik ödem, asit, Kussmaul bulgusu ve perikard kalınlaşması ön plandadır. İzole mitral prolapsus, solunumla belirgin ventriküler dolum değişimini ve septal bounce bulgusunu açıklamaz. Üfürüm baskın klinik bulgu olarak verilmemiştir.",
      "Pulmoner arter trombüsü nedeniyle ani gelişen ölü boşluk artışı ve sağ ventrikül afterload yükselmesi": "Pulmoner emboli ani dispne, plöritik ağrı, taşikardi, hipoksemi ve akut sağ ventrikül yüklenmesiyle gelebilir. Bu olguda süreç aylar içinde gelişmiş, sistemik venöz konjesyon ve perikardiyal kalınlaşma bulguları vardır. Pulmoner emboli akut bir sağ kalp basınç yükü oluşturur; fakat kronik asit, Kussmaul belirtisi ve perikardiyal kalsifikasyonla giden diyastolik kısıtlama mekanizmasını açıklamaz. Ani başlangıç ve D-dimer/BT anjiyo bulguları da verilmemiştir.",
      "Primer renal sodyum tutulumu nedeniyle intravasküler hacim artışı ve düşük reninli hipertansiyon": "Primer renal sodyum tutulumu hacim artışı ve hipertansiyon yapabilir; ancak bu hastada kan basıncı yüksek değildir ve juguler venöz dolgunluk-asit kombinasyonuna perikardiyal görüntüleme bulguları eşlik eder. Düşük reninli hipertansiyon hiperaldosteronizm veya mineralokortikoid fazlalığı gibi durumlarda düşünülür. Burada elektrolit ve tansiyon paterni bu mekanizmayı desteklemez. Sorun renal hacim yükünden çok kalbin dıştan kısıtlanmasıdır."
    }
  },
  "shuffleOptions": false,
  "coreKnowledge": "Konstriktif perikarditte kalbin dışındaki sert perikard diyastolik dolumu sınırlar; erken dolumdan sonra hacim artışı durur, sağ-sol ventrikül dolumları solunumla birbirini belirgin etkiler.",
  "examPearl": "Korunmuş EF + JVD/asit/ödem + septal bounce + perikard kalınlığı = sistolik yetmezlikten çok konstriktif fizyoloji.",
  "whyCorrect": "Doğru seçenek vakadaki venöz konjesyonu, korunmuş sistolik fonksiyonu ve görüntüleme bulgularını tek mekanizmada birleştirir.",
  "optionComparison": "Yanlış seçenekler sistolik yetmezlik, kapak patolojisi, akut pulmoner vasküler olay veya renal hacim yükü gibi alternatifleri temsil eder; perikardiyal kısıtlama bulgularını açıklamaz.",
  "evidenceChain": [
    "Aylar içinde artan asit ve ödem → kronik sistemik venöz konjesyon.",
    "İnspiryumda juguler ven dolgunluğunun sürmesi → sağ kalp dolum kısıtlanması.",
    "EF %58 → sistolik pompa fonksiyonu korunmuş.",
    "Septal bounce ve inflow değişkenliği → ventriküler interdependans.",
    "Perikard kalınlığı/kalsifikasyonu → kronik perikardiyal kısıtlama zemini."
  ],
  "whyWrong": "Yanlış seçenekler sistemik venöz konjesyonun perikardiyal ve solunumla değişen diyastolik doğasını açıklamakta yetersizdir.",
  "preserveInvestigationOrder": true,
  "aiMeta": {
    "version": "v311",
    "source": "manual-render-safe-internal-medicine-expansion",
    "antiRepeatChecked": true,
    "schemaReference": "V310 cases.js rawCases schema with diagnosis.optionFeedback object mapping"
  },
  "findings": [],
  "images": []
},
{
  "id": "v311-new-748-ani-bas-agrisi-gorme-kaybi-ve-hipotansiyon",
  "branchId": "internal-medicine",
  "caseType": "standard",
  "relatedBranch": "İç Hastalıkları",
  "title": "Ani baş ağrısı, görme kaybı ve hipotansiyon",
  "difficulty": "TUS düzeyi",
  "clinicalFocus": "Sellar kitle bulgularıyla gelen akut baş ağrısı ve görme kaybında endokrin acili tanıma.",
  "learningTarget": "Hipofiz apopleksisinde önce adrenal aksın hidrokortizonla güvenceye alınması ve acil görüntüleme/konsültasyon gerekliliğini öğrenme.",
  "demographics": "41 yaşında kadın hasta",
  "setting": "Acil servis / endokrinoloji ve nöroşirürji konsültasyonu",
  "chiefComplaint": "Hasta, ani başlayan çok şiddetli baş ağrısı, kusma ve görmede azalma nedeniyle acile getiriliyor.",
  "stem": "Hasta sabah işe hazırlanırken aniden gözlerinin arkasında patlayıcı tarzda bir baş ağrısı başladığını ve kısa süre sonra birkaç kez kustuğunu anlatır. Acile gelirken özellikle yanlardan gelen kişileri fark etmekte zorlandığını, çift görmesinin de başladığını söyler. Son aylarda adetlerinin seyrekleştiğini ve ara ara memeden süt geldiğini fark etmiş, ancak bunun için doktora başvurmamıştır. Ateş, ense sertliği, travma veya yeni antikoagülan kullanımı tariflemez. Yakınları acile gelirken giderek halsizleştiğini ve konuşmasının yavaşladığını belirtir.",
  "patientIntro": {
    "profile": "41 yaşında kadın hasta, ani şiddetli baş ağrısı ve görme yakınmasıyla acile getiriliyor.",
    "presentation": "Baş ağrısı, kusma, bitemporal görme alanı yakınması, çift görme ve hipotansif halsizlik ön plandadır.",
    "historySummary": "Hasta sabah işe hazırlanırken aniden gözlerinin arkasında patlayıcı tarzda bir baş ağrısı başladığını ve kısa süre sonra birkaç kez kustuğunu anlatır. Acile gelirken özellikle yanlardan gelen kişileri fark etmekte zorlandığını, çift görmesinin de başladığını söyler. Son aylarda adetlerinin seyrekleştiğini ve ara ara memeden süt geldiğini fark etmiş, ancak bunun için doktora başvurmamıştır. Ateş, ense sertliği, travma veya yeni antikoagülan kullanımı tariflemez. Yakınları acile gelirken giderek halsizleştiğini ve konuşmasının yavaşladığını belirtir."
  },
  "vitals": {
    "TA": "86/54 mmHg",
    "Nabız": "118/dk",
    "Solunum": "22/dk",
    "SpO2": "%97, oda havasında",
    "Ateş": "36.5 °C",
    "Şok indeksi": "1.37 - perfüzyon riski"
  },
  "exam": [
    "Hasta halsiz, soluk ve ağrı nedeniyle huzursuz görünür; sorulara yavaş yanıt verir.",
    "Görme alanı muayenesinde bitemporal kısıtlılık tarifler.",
    "Sol gözde pitoz ve dışa bakışta kısıtlılık izlenir.",
    "Ense sertliği belirgin değildir; periferik motor defisit saptanmaz."
  ],
  "investigations": [
    {
      "id": "v311-new-748-ani-bas-agrisi-gorme-kaybi-ve-hipotansiyon-tetkik-1",
      "label": "Acil hormon ve biyokimya paneli",
      "title": "Acil hormon ve biyokimya paneli",
      "orderLabel": "Acil hormon ve biyokimya paneli",
      "type": "laboratory",
      "priority": "essential",
      "subtype": "Acil hormon ve biyokimya paneli",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Akut hipopituitarizm ve adrenal yetmezlik açısından riskli hormon paterni vardır.",
      "clinicalMeaning": "Akut hipopituitarizm ve adrenal yetmezlik açısından riskli hormon paterni vardır.",
      "result": {
        "title": "Acil hormon ve biyokimya paneli",
        "summary": "Akut hipopituitarizm ve adrenal yetmezlik açısından riskli hormon paterni vardır.",
        "interpretation": "Akut hipopituitarizm ve adrenal yetmezlik açısından riskli hormon paterni vardır.",
        "values": [
          [
            "Sabah kortizol",
            "2.1 µg/dL",
            "5-25 µg/dL",
            "Belirgin düşük"
          ],
          [
            "Sodyum",
            "130 mmol/L",
            "135-145 mmol/L",
            "Hafif düşük"
          ],
          [
            "Glukoz",
            "68 mg/dL",
            "70-100 mg/dL",
            "Düşük-sınır"
          ],
          [
            "TSH / serbest T4",
            "TSH 0.4 mIU/L, sT4 0.6 ng/dL",
            "sT4 0.8-1.8 ng/dL",
            "Santral aks etkilenimi lehine"
          ]
        ]
      }
    },
    {
      "id": "v311-new-748-ani-bas-agrisi-gorme-kaybi-ve-hipotansiyon-tetkik-2",
      "label": "Kontrastlı hipofiz MR",
      "title": "Kontrastlı hipofiz MR",
      "orderLabel": "Kontrastlı hipofiz MR",
      "type": "imaging",
      "priority": "essential",
      "subtype": "Kontrastlı hipofiz MR",
      "category": "imaging",
      "testTypeCategory": "imaging",
      "summary": "MR sellar kitle içinde akut hemorajik değişiklik ve optik kiazma basısı gösterir.",
      "clinicalMeaning": "MR sellar kitle içinde akut hemorajik değişiklik ve optik kiazma basısı gösterir.",
      "result": {
        "title": "Kontrastlı hipofiz MR",
        "summary": "MR sellar kitle içinde akut hemorajik değişiklik ve optik kiazma basısı gösterir.",
        "interpretation": "MR sellar kitle içinde akut hemorajik değişiklik ve optik kiazma basısı gösterir.",
        "values": [
          [
            "Sella",
            "2.1 cm sellar-suprasellar kitle",
            "Normal hipofiz boyutu",
            "Makroadenom boyutu"
          ],
          [
            "İç sinyal",
            "Heterojen hemorajik alanlar",
            "Yok",
            "Akut kanama/infarkt lehine"
          ],
          [
            "Optik kiazma",
            "Üstten bası ve elevasyon",
            "Basısız",
            "Görme alanıyla ilişkili"
          ],
          [
            "Kavernöz sinüs komşuluğu",
            "Sol tarafta okulomotor sinir etkilenimini açıklayabilecek yayılım",
            "Yok",
            "Diplopi-pitoz ile uyumlu"
          ]
        ]
      }
    },
    {
      "id": "v311-new-748-ani-bas-agrisi-gorme-kaybi-ve-hipotansiyon-tetkik-3",
      "label": "Göz değerlendirmesi",
      "title": "Göz değerlendirmesi",
      "orderLabel": "Göz değerlendirmesi",
      "type": "clinical",
      "priority": "essential",
      "subtype": "Göz değerlendirmesi",
      "category": "clinical",
      "testTypeCategory": "clinical",
      "summary": "Görme bulguları sellar-suprasellar basıyla uyumludur.",
      "clinicalMeaning": "Görme bulguları sellar-suprasellar basıyla uyumludur.",
      "result": {
        "title": "Göz değerlendirmesi",
        "summary": "Görme bulguları sellar-suprasellar basıyla uyumludur.",
        "interpretation": "Görme bulguları sellar-suprasellar basıyla uyumludur.",
        "values": [
          [
            "Görme alanı",
            "Bitemporal defekt paterni",
            "Normal",
            "Kiazmal bası lehine"
          ],
          [
            "Görme keskinliği",
            "Sağ 8/10, sol 6/10",
            "10/10",
            "Etkilenim"
          ],
          [
            "Fundus",
            "Papil ödemi belirgin değil",
            "",
            "Primer papil ödemi baskın değil"
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
  "questionType": "Endokrin acil yönetimi",
  "answerTarget": "Hipofiz apopleksisinde hormon replasman önceliği ve acil nöro-oftalmolojik değerlendirmeyi seçme.",
  "diagnosis": {
    "correct": "Stres doz intravenöz hidrokortizon başlamak, acil hipofiz MR’ı ve nöroşirürji-göz hastalıkları değerlendirmesi sağlamak",
    "options": [
      "Oral levotiroksin başlayıp hipofiz MR’ını poliklinikte planlamak",
      "Dopamin agonisti başlayıp görme bulgularını birkaç hafta izlemek",
      "Asetazolamid verip glokom atağı olarak göz polikliniğine yönlendirmek",
      "Yalnız opioid analjezi verip baş ağrısı geriledikten sonra hormon testlerini tekrarlamak",
      "Stres doz intravenöz hidrokortizon başlamak, acil hipofiz MR’ı ve nöroşirürji-göz hastalıkları değerlendirmesi sağlamak"
    ],
    "question": "Bu hastada acil yönetimde en uygun ilk yaklaşım aşağıdakilerden hangisidir?",
    "explanation": "Ani baş ağrısı, kusma, görme alanı kaybı, okülomotor bulgu, sellar makroadenom içinde hemorajik değişiklik ve düşük kortizol hipofiz apopleksisi için tipiktir. Yaşamı tehdit eden adrenal yetmezlik riski nedeniyle stres doz hidrokortizon geciktirilmeden başlanır; acil MR, görme alanı ve nöroşirürji-göz hastalıkları değerlendirmesi eş zamanlı yürütülür.",
    "pearls": [
      "Ani baş ağrısı ve kusma sellar akut olay için uyarıcıdır.",
      "Bitemporal görme alanı yakınması optik kiazma basısını düşündürür.",
      "Düşük kortizol hipotansiyon ve hipoglisemiye katkı sağlar.",
      "MR’da hemorajik sellar kitle acil endokrin-nöroşirürjik yaklaşım gerektirir."
    ],
    "optionFeedback": {
      "Oral levotiroksin başlayıp hipofiz MR’ını poliklinikte planlamak": "Levotiroksin merkezi hipotiroidi saptanan hastada gerekebilir; ancak akut hipotansiyon, bilinç dalgalanması ve kortizol düşüklüğü varken önce adrenal aks güvenceye alınmalıdır. Tiroid hormonu tek başına başlanırsa kortizol ihtiyacını artırarak adrenal krizi ağırlaştırabilir. Ayrıca akut görme alanı kaybı ve sellar hemorajik kitle poliklinik MR’ı bekleyemez. Bu seçenek hem aciliyeti hem de hormon replasman sırasını yanlış yönetir.",
      "Dopamin agonisti başlayıp görme bulgularını birkaç hafta izlemek": "Dopamin agonistleri prolaktinomada özellikle stabil hastalarda temel tedavidir. Fakat bu olguda ani şiddetli baş ağrısı, kusma, bitemporal görme alanı kaybı, okülomotor bulgular ve hipotansiyon akut sellar kanama/infarkt sürecini düşündürür. Görme bulgularını haftalarca izlemek kalıcı optik kiazma hasarı riskini artırır. Prolaktin yüksekliği olsa bile acil steroid, görüntüleme ve nöroşirürji-göz değerlendirmesi önceliklidir.",
      "Asetazolamid verip glokom atağı olarak göz polikliniğine yönlendirmek": "Asetazolamid glokom veya intrakraniyal basınçla ilişkili bazı durumlarda kullanılabilir; ancak bu hastada primer göz içi basınç atağını destekleyen ağrılı kırmızı göz, korneal bulanıklık veya mid-dilate pupil bulgusu verilmemiştir. Bitemporal alan kaybı optik kiazma basısını; hipotansiyon ve düşük kortizol hipopituitar/adrenal yetmezliği düşündürür. Bu nedenle göz polikliniğine rutin yönlendirme değil, acil endokrin-nöroşirürjik yaklaşım gerekir.",
      "Yalnız opioid analjezi verip baş ağrısı geriledikten sonra hormon testlerini tekrarlamak": "Analjezi semptom kontrolü için verilebilir; ancak tek başına yönetim değildir. Baş ağrısının gerilemesini beklemek, akut hipofizer kanama/infarkt ve adrenal yetmezlik tablosunda tehlikeli gecikme yaratır. Hormon testleri alınsa bile kortizol eksikliği şüphesi varsa hidrokortizon geciktirilmemelidir. Bu seçenek yaşamı tehdit eden hipotansiyon ve görme basısını tedavisiz bırakır.",
      "Stres doz intravenöz hidrokortizon başlamak, acil hipofiz MR’ı ve nöroşirürji-göz hastalıkları değerlendirmesi sağlamak": "Bu seçenek doğrudur. Ani şiddetli baş ağrısı, kusma, görme alanı kaybı, okülomotor bulgu, sellar kitlede hemorajik değişiklik ve düşük kortizol akut hipofiz apopleksisi ile uyumludur. İlk kritik basamak, yaşamı tehdit edebilen ACTH-kortizol eksikliğini stres doz hidrokortizonla düzeltmektir. Ardından acil hipofiz MR’ı, görme alanı değerlendirmesi ve nöroşirürji/göz hastalıkları görüşü gerekir; progresif görme kaybı veya bilinç bozukluğu varsa cerrahi dekompresyon gündeme gelebilir."
    }
  },
  "shuffleOptions": false,
  "coreKnowledge": "Hipofiz apopleksisi akut baş ağrısı, görme alanı defekti, oftalmopleji ve hipopituitarizmle gelebilir; kortizol eksikliği şüphesinde hidrokortizon gecikmeden başlanır.",
  "examPearl": "Ani baş ağrısı + bitemporal defekt + sellar hemoraji + düşük kortizol = önce hidrokortizon, sonra acil MR ve nöroşirürji/göz değerlendirmesi.",
  "whyCorrect": "Doğru seçenek hastanın yaşamı tehdit eden adrenal yetmezliğini ve görme kaybı riskini aynı anda yönetir.",
  "optionComparison": "Yanlış seçenekler yalnız tiroid replasmanı, prolaktinoma tedavisi, göz basıncı yaklaşımı veya semptomatik analjeziye odaklanarak acil adrenal ve nöro-oftalmolojik riski kaçırır.",
  "evidenceChain": [
    "Ani retroorbital baş ağrısı ve kusma → akut sellar olay olasılığı.",
    "Bitemporal görme defekti → optik kiazma basısı.",
    "Pitoz ve göz hareket kısıtlılığı → kavernöz sinüs/okulomotor etkilenim.",
    "Kortizol 2.1 µg/dL + hipotansiyon → akut adrenal yetmezlik riski.",
    "MR’da hemorajik makroadenom → hipofiz apopleksisi paternini destekler."
  ],
  "whyWrong": "Yanlış seçenekler hidrokortizon önceliğini ve acil görme-kitle basısı yönetimini geciktirir.",
  "preserveInvestigationOrder": true,
  "aiMeta": {
    "version": "v311",
    "source": "manual-render-safe-internal-medicine-expansion",
    "antiRepeatChecked": true,
    "schemaReference": "V310 cases.js rawCases schema with diagnosis.optionFeedback object mapping"
  },
  "findings": [],
  "images": []
},
{
  "id": "v312-new-749-kalin-dil-kopuklu-idrar-ve-efor-dispnesi",
  "branchId": "internal-medicine",
  "caseType": "standard",
  "relatedBranch": "İç Hastalıkları",
  "title": "Kalın dil, köpüklü idrar ve efor dispnesi",
  "difficulty": "TUS düzeyi",
  "difficultyTag": "TUS düzeyi",
  "clinicalFocus": "Nefrotik proteinüri, infiltratif kardiyomiyopati ve yumuşak doku bulgularını birleştirerek AL amiloidoz mekanizmasını tanıma.",
  "learningTarget": "Düşük voltajlı EKG + kalın ventrikül duvarı + monoklonal hafif zincir + nefrotik proteinüri birlikteliğini sistemik amiloid birikimi ile ilişkilendirme.",
  "demographics": "68 yaşında erkek hasta",
  "setting": "Dahiliye polikliniği / kardiyoloji-nefroloji ortak değerlendirmesi",
  "chiefComplaint": "Hasta, son aylarda artan efor dispnesi, ayak bileklerinde şişlik ve köpüklü idrar nedeniyle başvuruyor.",
  "stem": "Hasta yaklaşık altı aydır merdiven çıkarken nefesinin daha çabuk kesildiğini, son iki aydır ayakkabılarının akşama doğru sıktığını ve idrarının belirgin köpüklendiğini anlatır. Dilinde büyüme hissi nedeniyle bazı kelimeleri söylerken zorlandığını, yemek yerken yanağını daha sık ısırdığını fark etmiştir. Göz çevresinde küçük morlukların özellikle öksürme veya yüzünü sert silme sonrası kolay oluştuğunu söyler. Uzun yıllardır hafif hipertansiyonu vardır ancak tansiyonları çoğunlukla kontrol altında seyretmiştir; diyabet öyküsü yoktur. Göğüs ağrısı, ateş, kanlı idrar veya yeni döküntü tariflemez. Son haftalarda halsizliği arttığı için ailesinin ısrarıyla değerlendirmeye gelmiştir.",
  "patientIntro": {
    "profile": "68 yaşında erkek hasta, dispne, ödem ve köpüklü idrarla değerlendiriliyor.",
    "presentation": "Efor dispnesi, periferik ödem, köpüklü idrar, dilde büyüme hissi ve kolay periorbital morarma ön plandadır.",
    "historySummary": "Hasta yaklaşık altı aydır merdiven çıkarken nefesinin daha çabuk kesildiğini, son iki aydır ayakkabılarının akşama doğru sıktığını ve idrarının belirgin köpüklendiğini anlatır. Dilinde büyüme hissi nedeniyle bazı kelimeleri söylerken zorlandığını, yemek yerken yanağını daha sık ısırdığını fark etmiştir. Göz çevresinde küçük morlukların özellikle öksürme veya yüzünü sert silme sonrası kolay oluştuğunu söyler. Uzun yıllardır hafif hipertansiyonu vardır ancak tansiyonları çoğunlukla kontrol altında seyretmiştir; diyabet öyküsü yoktur. Göğüs ağrısı, ateş, kanlı idrar veya yeni döküntü tariflemez. Son haftalarda halsizliği arttığı için ailesinin ısrarıyla değerlendirmeye gelmiştir."
  },
  "vitals": {
    "TA": "112/68 mmHg",
    "Nabız": "96/dk",
    "Solunum": "22/dk",
    "SpO2": "%95, oda havasında",
    "Ateş": "36.7 °C",
    "Perfüzyon": "Kapiller dolum 2 sn, periferik ödem mevcut"
  },
  "exam": [
    "Hasta konuşurken dil hacmi belirgin ve hafif peltek konuşma izlenir.",
    "Bilateral ayak bileğinde gode bırakan ödem vardır; juguler venöz dolgunluk hafiftir.",
    "Kalp sesleri derinden alınır, belirgin üfürüm duyulmaz.",
    "Akciğer bazallerinde ince inspiratuvar ral mevcuttur.",
    "Periorbital bölgede küçük ekimozlar izlenir."
  ],
  "investigations": [
    {
      "id": "v312-new-749-kalin-dil-kopuklu-idrar-ve-efor-dispnesi-tetkik-1",
      "label": "İdrar ve serum protein değerlendirmesi",
      "title": "İdrar ve serum protein değerlendirmesi",
      "orderLabel": "İdrar ve serum protein değerlendirmesi",
      "type": "laboratory",
      "priority": "essential",
      "subtype": "İdrar ve serum protein değerlendirmesi",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Proteinüri baskın böbrek tutulumu ve düşük albumin ödemi destekler.",
      "clinicalMeaning": "Proteinüri baskın böbrek tutulumu ve düşük albumin ödemi destekler.",
      "result": {
        "title": "İdrar ve serum protein değerlendirmesi",
        "summary": "Proteinüri baskın böbrek tutulumu ve düşük albumin ödemi destekler.",
        "interpretation": "Proteinüri baskın böbrek tutulumu ve düşük albumin ödemi destekler.",
        "values": [
          [
            "Spot idrar protein/kreatinin",
            "5.8 g/g",
            "<0.2 g/g",
            "Nefrotik düzey proteinüri"
          ],
          [
            "Serum albumin",
            "2.6 g/dL",
            "3.5-5.0 g/dL",
            "Düşük"
          ],
          [
            "Kreatinin",
            "1.4 mg/dL",
            "0.7-1.2 mg/dL",
            "Hafif yüksek"
          ],
          [
            "İdrar sedimenti",
            "Bland sediment, eritrosit silendiri yok",
            "Aktif sediment beklenmez",
            "Proteinüri baskın patern"
          ]
        ]
      }
    },
    {
      "id": "v312-new-749-kalin-dil-kopuklu-idrar-ve-efor-dispnesi-tetkik-2",
      "label": "Kardiyak değerlendirme",
      "title": "Kardiyak değerlendirme",
      "orderLabel": "Kardiyak değerlendirme",
      "type": "echocardiography",
      "priority": "essential",
      "subtype": "Kardiyak değerlendirme",
      "category": "imaging",
      "testTypeCategory": "imaging",
      "summary": "Kalın ventrikül duvarına rağmen düşük voltaj ve diyastolik bozukluk infiltratif kalp tutulumunu destekler.",
      "clinicalMeaning": "Kalın ventrikül duvarına rağmen düşük voltaj ve diyastolik bozukluk infiltratif kalp tutulumunu destekler.",
      "result": {
        "title": "Kardiyak değerlendirme",
        "summary": "Kalın ventrikül duvarına rağmen düşük voltaj ve diyastolik bozukluk infiltratif kalp tutulumunu destekler.",
        "interpretation": "Kalın ventrikül duvarına rağmen düşük voltaj ve diyastolik bozukluk infiltratif kalp tutulumunu destekler.",
        "values": [
          [
            "EKG",
            "Ekstremite derivasyonlarında düşük voltaj",
            "Klinikle yorumlanır",
            "Voltaj-duvar kalınlığı uyumsuzluğu"
          ],
          [
            "NT-proBNP",
            "6420 pg/mL",
            "<125 pg/mL",
            "Belirgin yüksek"
          ],
          [
            "Troponin T",
            "42 ng/L",
            "<14 ng/L",
            "Hafif yüksek"
          ],
          [
            "Ekokardiyografi",
            "Konsantrik duvar kalınlığı, diyastolik disfonksiyon, strain’de apikal korunma paterni",
            "Normal duvar kalınlığı beklenir",
            "İnfiltratif kardiyomiyopati paterni"
          ]
        ]
      }
    },
    {
      "id": "v312-new-749-kalin-dil-kopuklu-idrar-ve-efor-dispnesi-tetkik-3",
      "label": "Monoklonal protein taraması",
      "title": "Monoklonal protein taraması",
      "orderLabel": "Monoklonal protein taraması",
      "type": "laboratory",
      "priority": "essential",
      "subtype": "Monoklonal protein taraması",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Monoklonal hafif zincir üretimi sistemik birikim yapan plazma hücre ilişkili süreci destekler.",
      "clinicalMeaning": "Monoklonal hafif zincir üretimi sistemik birikim yapan plazma hücre ilişkili süreci destekler.",
      "result": {
        "title": "Monoklonal protein taraması",
        "summary": "Monoklonal hafif zincir üretimi sistemik birikim yapan plazma hücre ilişkili süreci destekler.",
        "interpretation": "Monoklonal hafif zincir üretimi sistemik birikim yapan plazma hücre ilişkili süreci destekler.",
        "values": [
          [
            "Serum serbest lambda hafif zincir",
            "184 mg/L",
            "5.7-26.3 mg/L",
            "Yüksek"
          ],
          [
            "Kappa/lambda oranı",
            "0.08",
            "0.26-1.65",
            "Belirgin bozuk"
          ],
          [
            "Serum immünfiksasyon",
            "Lambda monoklonal bant",
            "Monoklonal bant beklenmez",
            "Plazma hücre ilişkili üretim"
          ],
          [
            "Tam kan sayımı",
            "Hb 11.2 g/dL",
            "13.5-17.5 g/dL",
            "Hafif normositer anemi"
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
  "question": "Bu hastadaki çok sistemli bulguları en iyi açıklayan mekanizma aşağıdakilerden hangisidir?",
  "questionType": "Mekanizma / sistemik hastalık paterni",
  "answerTarget": "Sistemik infiltratif hastalık mekanizması",
  "diagnosis": {
    "correct": "Monoklonal immünoglobulin hafif zincirlerinin sistemik amiloid fibrilleri olarak birikmesi",
    "options": [
      "Hipertansif kardiyomiyopatiye bağlı sol ventrikül hipertrofisi ve diyabetik nefropati birlikteliği",
      "Monoklonal immünoglobulin hafif zincirlerinin sistemik amiloid fibrilleri olarak birikmesi",
      "Yaşa bağlı transtiretin birikimiyle sınırlı kardiyak tutulum gelişmesi",
      "Granülomatöz miyokard infiltrasyonu ve renal interstisyel tutulum gelişmesi",
      "Kompleman aracılı glomerülonefrit ve sekonder basınç yükü hipertrofisi gelişmesi"
    ],
    "question": "Bu hastadaki çok sistemli bulguları en iyi açıklayan mekanizma aşağıdakilerden hangisidir?",
    "explanation": "Köpüklü idrar ve hipoalbüminemi nefrotik proteinüriyi; düşük voltajlı EKG’ye rağmen kalın ventrikül duvarı ve apikal korunma paterni infiltratif kardiyomiyopatiyi; makroglossi, periorbital purpura ve monoklonal lambda hafif zincir artışı ise AL amiloidozu destekler. Bu tabloda temel süreç, klonal plazma hücrelerinden kaynaklanan hafif zincirlerin yanlış katlanıp amiloid fibrili olarak çoklu organda birikmesidir.",
    "pearls": [
      "Düşük voltaj + kalın ventrikül duvarı infiltratif kardiyomiyopati için uyarıcıdır.",
      "Makroglossi ve periorbital purpura AL amiloidoz için klasik yumuşak doku ipuçlarıdır.",
      "Nefrotik düzey proteinüri böbrek amiloid birikimini destekler.",
      "Monoklonal hafif zincir saptanmadan ATTR tanısına atlanmamalıdır."
    ],
    "optionFeedback": {
      "Hipertansif kardiyomiyopatiye bağlı sol ventrikül hipertrofisi ve diyabetik nefropati birlikteliği": "Uzun süreli hipertansiyon sol ventrikül duvar kalınlığını artırabilir ve diyabetik nefropati proteinüri yapabilir; ancak bu seçenek vakadaki çok sistemli paterni açıklamakta yetersizdir. Hastada düşük voltajlı EKG ile kalın duvarlı ventrikülün birlikte olması, makroglossi, periorbital purpura, nefrotik düzey proteinüri ve belirgin serbest hafif zincir oran bozukluğu basit hipertansif hipertrofi-diyabetik nefropati birlikteliğinden daha özgül bir infiltratif/plazma hücre ilişkili süreci düşündürür. Diyabetik nefropatide makroglossi ve periorbital purpura beklenmez; kardiyak bulgular da genellikle düşük voltaj-infiltratif kısıtlılık paterninde olmaz.",
      "Monoklonal immünoglobulin hafif zincirlerinin sistemik amiloid fibrilleri olarak birikmesi": "Bu seçenek doğrudur. Makroglossi, periorbital purpura, köpüklü idrar, nefrotik düzey proteinüri, düşük voltajlı EKG’ye rağmen ekoda kalın ventrikül duvarı ve serbest hafif zincir oranındaki belirgin bozulma sistemik AL amiloidoz için güçlü bir bütünlük oluşturur. AL amiloidozda klonal plazma hücrelerinden kaynaklanan immünoglobulin hafif zincirleri yanlış katlanarak amiloid fibrilleri hâlinde kalp, böbrek, dil ve damar duvarına birikir. Kalpte restriktif/infiltratif kardiyomiyopati ve NT-proBNP yüksekliği; böbrekte albüminüri/nefrotik sendrom; yumuşak dokuda makroglossi ve purpura görülmesi bu mekanizmanın klinik karşılığıdır. ATTR amiloidozu da kardiyak tutulum yapabilir; fakat belirgin monoklonal hafif zincir bulgusu ve sistemik yumuşak doku-böbrek tutulumu AL yönünü güçlendirir.",
      "Yaşa bağlı transtiretin birikimiyle sınırlı kardiyak tutulum gelişmesi": "Transtiretin ilişkili amiloidoz özellikle yaşlı erkeklerde kalp yetmezliği, kalın ventrikül duvarı, düşük voltaj veya iletim bozukluklarıyla gelebilir ve önemli bir ayırıcı tanıdır. Ancak ATTR’de makroglossi ve periorbital purpura AL amiloidoza göre çok daha az tipiktir; nefrotik düzey proteinüri ve belirgin serbest hafif zincir oran bozukluğu da ATTR lehine değil, AL lehinedir. ATTR tanısında monoklonal protein dışlandıktan sonra kemik sintigrafisi/PYP gibi yöntemler çok değerlidir; bu vakada ise monoklonal süreç dışlanmadan ATTR’ye gitmek hatalı olur.",
      "Granülomatöz miyokard infiltrasyonu ve renal interstisyel tutulum gelişmesi": "Sarkoidoz gibi granülomatöz hastalıklar kalpte iletim bozukluğu, aritmi veya kardiyomiyopati yapabilir; böbrekte ise hiperkalsemiye bağlı taş/nefrokalsinozis veya interstisyel tutulum görülebilir. Fakat vakada hiler lenfadenopati, granülomatöz akciğer bulgusu, hiperkalsemi veya ACE yüksekliği gibi destekleyici veri yoktur. Makroglossi, periorbital purpura, nefrotik düzey proteinüri ve monoklonal hafif zincir paterni granülomatöz infiltrasyondan çok amiloid birikimini açıklar.",
      "Kompleman aracılı glomerülonefrit ve sekonder basınç yükü hipertrofisi gelişmesi": "Kompleman aracılı glomerülonefrit aktif idrar sedimenti, eritrosit silendirleri, düşük kompleman veya sistemik inflamatuvar bulgularla gelebilir. Bu hastada idrar sedimenti aktif değil, proteinüri baskın ve albümin düşüklüğü belirgindir; kalp bulguları da basınç yükünden çok infiltratif patern gösterir. Kompleman aracılı glomerülonefrit makroglossi ve periorbital purpura ile beklenen bir birliktelik oluşturmaz. Bu nedenle vakadaki çok sistemli veri zinciri hafif zincir amiloidozunu daha iyi açıklar."
    }
  },
  "shuffleOptions": false,
  "coreKnowledge": "AL amiloidozda monoklonal hafif zincirler kalp, böbrek, damar ve yumuşak dokuda birikerek restriktif kardiyomiyopati, nefrotik sendrom, makroglossi ve purpuraya yol açabilir.",
  "examPearl": "Kalın ventrikül duvarı her zaman hipertansiyon değildir; düşük voltajlı EKG ile birlikteyse infiltratif kardiyomiyopati düşün.",
  "whyCorrect": "Doğru seçenek monoklonal hafif zincir üretimini, nefrotik proteinüriyi, kardiyak infiltrasyonu ve yumuşak doku bulgularını tek mekanizmada birleştirir.",
  "optionComparison": "Hipertansif/diyabetik süreç, ATTR, sarkoidoz ve kompleman aracılı GN bazı tekil bulguları açıklayabilir; ancak bu olgudaki kardiyak-böbrek-yumuşak doku-monoklonal protein bütünlüğünü aynı güçte açıklamaz.",
  "evidenceChain": [
    "Köpüklü idrar + protein/kreatinin 5.8 g/g → nefrotik düzey proteinüri.",
    "Düşük voltajlı EKG + kalın ventrikül duvarı → infiltratif kardiyomiyopati uyarısı.",
    "Makroglossi ve periorbital purpura → hafif zincir amiloid birikimi için özgül yumuşak doku ipuçları.",
    "Lambda hafif zincir yüksekliği ve oran bozukluğu → monoklonal plazma hücre ilişkili süreç.",
    "Diyabet yokluğu ve bland sediment → diyabetik nefropati veya aktif GN olasılığını zayıflatır."
  ],
  "whyWrong": "Yanlış seçenekler tek bir organ bulgusunu veya daha sınırlı infiltratif süreçleri öne çıkarır; ancak böbrek, kalp, yumuşak doku ve monoklonal protein verilerini birlikte açıklayamaz.",
  "preserveInvestigationOrder": true,
  "aiMeta": {
    "version": "v312",
    "source": "manual-render-safe-internal-medicine-expansion",
    "antiRepeatChecked": true,
    "schemaReference": "V311 cases.js rawCases schema with diagnosis.optionFeedback object mapping"
  },
  "findings": [],
  "images": []
},
{
  "id": "v312-new-750-uzun-suren-ishal-ve-demir-eksikligi",
  "branchId": "internal-medicine",
  "caseType": "standard",
  "relatedBranch": "İç Hastalıkları",
  "title": "Uzun süren ishal ve demir eksikliği",
  "difficulty": "TUS düzeyi",
  "difficultyTag": "TUS düzeyi",
  "clinicalFocus": "Kronik ishal, kilo kaybı ve demir eksikliğinde çölyak hastalığı tanı sıralamasını doğru kurma.",
  "learningTarget": "Gluten tüketimi sürerken tTG-IgA + total IgA ölçümünü ve erişkinde duodenal biyopsi ile doğrulamayı ayırt etme.",
  "demographics": "29 yaşında kadın hasta",
  "setting": "Gastroenteroloji polikliniği",
  "chiefComplaint": "Hasta, aylardır süren ishal, kilo kaybı ve halsizlik nedeniyle başvuruyor.",
  "stem": "Hasta son sekiz aydır özellikle ekmek ve hamur işi ağırlıklı öğünlerden sonra şişkinlik ve karın gurultusunun arttığını, dışkısının daha hacimli ve kötü kokulu olduğunu anlatır. Son dönemde istemsiz 6 kg kaybetmiş, adet dönemlerinde halsizliği belirginleşmiş ve demir ilacı kullanmasına rağmen çabuk yorulması düzelmemiştir. Diz ve dirsek çevresinde kaşıntılı küçük kabarcıklar çıktığını, bunları alerji sanıp krem sürdüğünü söyler. Kanlı dışkı, gece uyandıran şiddetli karın ağrısı veya ateş tariflemez. Ailesinde otoimmün tiroid hastalığı vardır; kendisi daha önce düzenli bir eliminasyon diyeti denememiştir. Yakınmaları uzayınca aile hekiminden gastroenterolojiye yönlendirilmiştir.",
  "patientIntro": {
    "profile": "29 yaşında kadın hasta, kronik ishal ve tedaviye dirençli demir eksikliği nedeniyle değerlendiriliyor.",
    "presentation": "Uzun süren ishal, kilo kaybı, şişkinlik, demir eksikliği ve kaşıntılı ekstansör deri lezyonları ön plandadır.",
    "historySummary": "Hasta son sekiz aydır özellikle ekmek ve hamur işi ağırlıklı öğünlerden sonra şişkinlik ve karın gurultusunun arttığını, dışkısının daha hacimli ve kötü kokulu olduğunu anlatır. Son dönemde istemsiz 6 kg kaybetmiş, adet dönemlerinde halsizliği belirginleşmiş ve demir ilacı kullanmasına rağmen çabuk yorulması düzelmemiştir. Diz ve dirsek çevresinde kaşıntılı küçük kabarcıklar çıktığını, bunları alerji sanıp krem sürdüğünü söyler. Kanlı dışkı, gece uyandıran şiddetli karın ağrısı veya ateş tariflemez. Ailesinde otoimmün tiroid hastalığı vardır; kendisi daha önce düzenli bir eliminasyon diyeti denememiştir. Yakınmaları uzayınca aile hekiminden gastroenterolojiye yönlendirilmiştir."
  },
  "vitals": {
    "TA": "108/70 mmHg",
    "Nabız": "92/dk",
    "Solunum": "18/dk",
    "SpO2": "%99, oda havasında",
    "Ateş": "36.6 °C",
    "Perfüzyon": "Mukozalar soluk, kapiller dolum 2 sn"
  },
  "exam": [
    "Hasta zayıf ve soluk görünür; genel durumu stabildir.",
    "Karında yaygın hafif distansiyon vardır, defans veya rebound yoktur.",
    "Diz ve dirsek ekstansör yüzlerinde kaşıntılı, ekskoriye olmuş küçük veziküler-papüler lezyonlar izlenir.",
    "Oral aft benzeri küçük yüzeyel ülserler vardır.",
    "Periferik ödem veya hepatosplenomegali saptanmaz."
  ],
  "investigations": [
    {
      "id": "v312-new-750-uzun-suren-ishal-ve-demir-eksikligi-tetkik-1",
      "label": "Tam kan sayımı ve demir çalışmaları",
      "title": "Tam kan sayımı ve demir çalışmaları",
      "orderLabel": "Tam kan sayımı ve demir çalışmaları",
      "type": "laboratory",
      "priority": "essential",
      "subtype": "Tam kan sayımı ve demir çalışmaları",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Mikrositer anemi ve düşük demir depoları kronik emilim bozukluğu veya kan kaybı açısından değerlendirme gerektirir.",
      "clinicalMeaning": "Mikrositer anemi ve düşük demir depoları kronik emilim bozukluğu veya kan kaybı açısından değerlendirme gerektirir.",
      "result": {
        "title": "Tam kan sayımı ve demir çalışmaları",
        "summary": "Mikrositer anemi ve düşük demir depoları kronik emilim bozukluğu veya kan kaybı açısından değerlendirme gerektirir.",
        "interpretation": "Mikrositer anemi ve düşük demir depoları kronik emilim bozukluğu veya kan kaybı açısından değerlendirme gerektirir.",
        "values": [
          [
            "Hemoglobin",
            "9.8 g/dL",
            "12-16 g/dL",
            "Düşük"
          ],
          [
            "MCV",
            "72 fL",
            "80-100 fL",
            "Mikrositoz"
          ],
          [
            "Ferritin",
            "7 ng/mL",
            "15-150 ng/mL",
            "Düşük"
          ],
          [
            "Transferrin satürasyonu",
            "%6",
            "%20-50",
            "Düşük"
          ]
        ]
      }
    },
    {
      "id": "v312-new-750-uzun-suren-ishal-ve-demir-eksikligi-tetkik-2",
      "label": "Biyokimya ve beslenme göstergeleri",
      "title": "Biyokimya ve beslenme göstergeleri",
      "orderLabel": "Biyokimya ve beslenme göstergeleri",
      "type": "laboratory",
      "priority": "essential",
      "subtype": "Biyokimya ve beslenme göstergeleri",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Beslenme eksikliği ve hafif transaminaz yüksekliği ince bağırsak emilim bozukluğu ile birlikte görülebilir.",
      "clinicalMeaning": "Beslenme eksikliği ve hafif transaminaz yüksekliği ince bağırsak emilim bozukluğu ile birlikte görülebilir.",
      "result": {
        "title": "Biyokimya ve beslenme göstergeleri",
        "summary": "Beslenme eksikliği ve hafif transaminaz yüksekliği ince bağırsak emilim bozukluğu ile birlikte görülebilir.",
        "interpretation": "Beslenme eksikliği ve hafif transaminaz yüksekliği ince bağırsak emilim bozukluğu ile birlikte görülebilir.",
        "values": [
          [
            "Albumin",
            "3.4 g/dL",
            "3.5-5.0 g/dL",
            "Hafif düşük"
          ],
          [
            "25-OH D vitamini",
            "12 ng/mL",
            ">30 ng/mL",
            "Düşük"
          ],
          [
            "ALT",
            "48 U/L",
            "<35 U/L",
            "Hafif yüksek"
          ],
          [
            "CRP",
            "3 mg/L",
            "<5 mg/L",
            "Belirgin inflamasyon yok"
          ]
        ]
      }
    },
    {
      "id": "v312-new-750-uzun-suren-ishal-ve-demir-eksikligi-tetkik-3",
      "label": "Çölyak serolojisi",
      "title": "Çölyak serolojisi",
      "orderLabel": "Çölyak serolojisi",
      "type": "laboratory",
      "priority": "essential",
      "subtype": "Çölyak serolojisi",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Serolojik patern gluten ilişkili enteropati için ileri endoskopik doğrulamayı destekler.",
      "clinicalMeaning": "Serolojik patern gluten ilişkili enteropati için ileri endoskopik doğrulamayı destekler.",
      "result": {
        "title": "Çölyak serolojisi",
        "summary": "Serolojik patern gluten ilişkili enteropati için ileri endoskopik doğrulamayı destekler.",
        "interpretation": "Serolojik patern gluten ilişkili enteropati için ileri endoskopik doğrulamayı destekler.",
        "values": [
          [
            "Doku transglutaminaz IgA",
            "Pozitif, üst sınırın 9 katı",
            "Negatif",
            "Yüksek titre"
          ],
          [
            "Total IgA",
            "Normal",
            "70-400 mg/dL",
            "IgA eksikliği yok"
          ],
          [
            "Dışkı kültürü",
            "Üreme yok",
            "Patojen üreme olmamalı",
            "Akut bakteriyel enfeksiyon desteklenmiyor"
          ],
          [
            "Gaitada gizli kan",
            "Negatif",
            "Negatif",
            "Belirgin kan kaybı yok"
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
  "question": "Bu hastada tanıyı doğrulamak için en uygun yaklaşım aşağıdakilerden hangisidir?",
  "questionType": "Tanısal yaklaşım",
  "answerTarget": "Çölyak hastalığı tanı sıralaması",
  "diagnosis": {
    "correct": "Gluten tüketimi sürerken doku transglutaminaz IgA ve total IgA bakıp pozitiflikte üst endoskopi ile duodenal biyopsi almak",
    "options": [
      "Glutensiz diyete hemen başlayıp serolojik testleri diyet sonrası tekrarlamak",
      "Kolonoskopi ile yalnız kolon biyopsileri almak ve ince bağırsak değerlendirmesini ertelemek",
      "Gluten tüketimi sürerken doku transglutaminaz IgA ve total IgA bakıp pozitiflikte üst endoskopi ile duodenal biyopsi almak",
      "Dışkı kültürü negatifse irritabl bağırsak sendromu kabul edip ileri inceleme yapmamak",
      "Serum anti-nükleer antikor ve kompleman düzeyleriyle primer otoimmün enteropati taraması yapmak"
    ],
    "question": "Bu hastada tanıyı doğrulamak için en uygun yaklaşım aşağıdakilerden hangisidir?",
    "explanation": "Kronik ishal, kilo kaybı, demir eksikliği, D vitamini düşüklüğü ve ekstansör yüzde kaşıntılı veziküler lezyonlar çölyak hastalığı ile uyumludur. Erişkinde doğru tanı için hasta gluten tüketirken tTG-IgA ve total IgA bakılır; pozitif seroloji durumunda üst endoskopi ile çoklu duodenal biyopsi alınır.",
    "pearls": [
      "Seroloji gluten içeren diyet sırasında değerlendirilmelidir.",
      "Total IgA ölçümü yalancı negatif tTG-IgA riskini azaltır.",
      "Erişkinde pozitif seroloji çoğunlukla duodenal biyopsi ile doğrulanır.",
      "Tanı netleşmeden glutensiz diyete başlamak testlerin duyarlılığını düşürebilir."
    ],
    "optionFeedback": {
      "Glutensiz diyete hemen başlayıp serolojik testleri diyet sonrası tekrarlamak": "Glutensiz diyete erken başlamak semptomları azaltabilir; ancak tanı tamamlanmadan başlanırsa seroloji ve biyopsi duyarlılığı düşer. Bu hastada demir eksikliği, kilo kaybı, kronik ishal, aft benzeri yakınmalar ve dermatitis herpetiformis benzeri kaşıntılı veziküler lezyonlar çölyak hastalığı açısından güçlü ipuçlarıdır. Doğru yaklaşım, hasta gluten tüketirken uygun seroloji ve gerekirse duodenal biyopsi ile tanıyı netleştirmektir. Diyet öncesi tanı konulmazsa ileride gluten challenge gerekebilir ve tanı süreci gereksiz zorlaşır.",
      "Kolonoskopi ile yalnız kolon biyopsileri almak ve ince bağırsak değerlendirmesini ertelemek": "Kolonoskopi kronik kanlı ishal, inflamatuvar bağırsak hastalığı veya kolonik patoloji şüphesinde değerlidir. Fakat bu vakada baskın problem demir eksikliği, kilo kaybı, yağlı-kötü kokulu dışkı ve emilim bozukluğu paternidir; ana tutulum ince bağırsak mukozasını düşündürür. Çölyak hastalığında tanısal biyopsiler duodenumdan alınır. Sadece kolon biyopsisi almak, villöz atrofi ve kript hiperplazisi gibi temel tanısal bulguları kaçırır.",
      "Gluten tüketimi sürerken doku transglutaminaz IgA ve total IgA bakıp pozitiflikte üst endoskopi ile duodenal biyopsi almak": "Bu seçenek doğrudur. Erişkin hastada kronik ishal, kilo kaybı, demir eksikliği ve çölyakla uyumlu deri bulguları varsa ilk serolojik değerlendirme hasta gluten içeren diyet almaya devam ederken doku transglutaminaz IgA ve total IgA ile yapılır. Total IgA ölçümü, selektif IgA eksikliğinde yalancı negatif tTG-IgA sonucunu önlemek için önemlidir. Seroloji pozitifse üst endoskopide çoklu duodenal biyopsi alınarak villöz atrofi, kript hiperplazisi ve intraepitelyal lenfositoz gösterilir. Tanı doğrulandıktan sonra ömür boyu sıkı glutensiz diyet ve beslenme eksikliklerinin izlenmesi gerekir.",
      "Dışkı kültürü negatifse irritabl bağırsak sendromu kabul edip ileri inceleme yapmamak": "Dışkı kültürünün negatif olması akut bakteriyel enfeksiyon olasılığını azaltır; ancak kronik malabsorpsiyon paternini açıklamaz. İrritabl bağırsak sendromunda kilo kaybı, belirgin demir eksikliği, düşük ferritin, D vitamini düşüklüğü veya dermatitis herpetiformis benzeri lezyonlar beklenen alarm bulguları değildir. Bu nedenle organik hastalık dışlanmadan fonksiyonel tanıya gitmek hatalıdır. Bu seçenek tanısal gecikmeye ve malabsorpsiyon komplikasyonlarının sürmesine yol açabilir.",
      "Serum anti-nükleer antikor ve kompleman düzeyleriyle primer otoimmün enteropati taraması yapmak": "Otoimmün enteropati nadirdir ve genellikle ağır, dirençli ishal ile farklı immünolojik bağlamlarda düşünülür. ANA ve kompleman ölçümleri çölyak hastalığı için ilk basamak tanı testi değildir. Vaka, çölyak hastalığına ait daha tipik klinik-laboratuvar zinciri verir: kronik ishal, demir eksikliği, kilo kaybı, tTG-IgA pozitifliği beklenen bir tablo ve ince bağırsak kaynaklı emilim bozukluğu. Bu nedenle öncelik çölyak serolojisi ve duodenal biyopsidir."
    }
  },
  "shuffleOptions": false,
  "coreKnowledge": "Çölyak hastalığında tanı, uygun klinik bağlamda gluten tüketimi sırasında yapılan seroloji ve erişkinde duodenal biyopsi ile doğrulanır; tedavi tanıdan sonra ömür boyu glutensiz diyettir.",
  "examPearl": "Demir eksikliği + kronik ishal + kilo kaybı varsa “IBS” demeden önce çölyak dışlanmalıdır.",
  "whyCorrect": "Doğru seçenek hem serolojinin doğru zamanda yapılmasını hem de erişkinde histolojik doğrulamayı içerir.",
  "optionComparison": "Yanlış seçenekler tanıdan önce diyeti değiştirmeye, yanlış anatomik bölgeden biyopsiye veya alarm bulgularına rağmen fonksiyonel tanıya gitmeye dayanır.",
  "evidenceChain": [
    "Kronik hacimli-kötü kokulu dışkı → malabsorpsiyon paterni.",
    "Ferritin 7 ng/mL ve MCV 72 fL → demir eksikliği anemisi.",
    "D vitamini düşüklüğü → emilim bozukluğunu destekleyen ek beslenme göstergesi.",
    "tTG-IgA yüksek ve total IgA normal → çölyak serolojisi güvenilir pozitif.",
    "Kanlı dışkı ve yüksek CRP olmaması → aktif kolit olasılığını azaltır."
  ],
  "whyWrong": "Yanlış seçenekler ya tanısal duyarlılığı düşürür ya da ince bağırsak kaynaklı emilim bozukluğu paternini yeterince araştırmaz.",
  "preserveInvestigationOrder": true,
  "aiMeta": {
    "version": "v312",
    "source": "manual-render-safe-internal-medicine-expansion",
    "antiRepeatChecked": true,
    "schemaReference": "V311 cases.js rawCases schema with diagnosis.optionFeedback object mapping"
  },
  "findings": [],
  "images": []
},
{
  "id": "v312-new-751-gunduz-uykululugu-ve-kronik-hiperkapni",
  "branchId": "internal-medicine",
  "caseType": "standard",
  "relatedBranch": "İç Hastalıkları",
  "title": "Gündüz uykululuğu ve kronik hiperkapni",
  "difficulty": "TUS düzeyi",
  "difficultyTag": "TUS düzeyi",
  "clinicalFocus": "Morbid obez hastada gündüz hiperkapnisi, yüksek bikarbonat ve uyku apnesi bulgularını obezite hipoventilasyon sendromu yönetimiyle ilişkilendirme.",
  "learningTarget": "Obezite hipoventilasyonunda oksijen monoterapisi yerine pozitif hava yolu basıncı ve kilo kaybının temel tedavi olduğunu ayırt etme.",
  "demographics": "52 yaşında erkek hasta",
  "setting": "Göğüs hastalıkları polikliniği / uyku laboratuvarı sonrası değerlendirme",
  "chiefComplaint": "Hasta, gündüz uyuklama, sabah baş ağrısı ve eforla nefes darlığı nedeniyle başvuruyor.",
  "stem": "Hasta son bir yıldır televizyon izlerken ve kısa araba yolculuklarında kolayca uyuyakaldığını, sabahları baş ağrısı ve ağız kuruluğu ile uyandığını anlatır. Eşi geceleri yüksek sesle horladığını ve nefesinin zaman zaman durur gibi olduğunu fark etmiştir. Son aylarda düz yolda hızlı yürürken nefes nefese kaldığını, merdiven çıkmayı bıraktığını söyler. Aktif sigara kullanmaz ve daha önce KOAH tanısı almamıştır. Ateş, pürülan balgam, ani göğüs ağrısı veya bacakta tek taraflı şişlik tariflemez. Kilo vermeyi birkaç kez denemiş ancak sürdürememiştir.",
  "patientIntro": {
    "profile": "52 yaşında erkek hasta, morbid obezite zemininde gündüz uyku hali ve kronik solunum yakınmalarıyla değerlendiriliyor.",
    "presentation": "Gündüz uykululuğu, sabah baş ağrısı, horlama-apne tanıklığı ve efor dispnesi ön plandadır.",
    "historySummary": "Hasta son bir yıldır televizyon izlerken ve kısa araba yolculuklarında kolayca uyuyakaldığını, sabahları baş ağrısı ve ağız kuruluğu ile uyandığını anlatır. Eşi geceleri yüksek sesle horladığını ve nefesinin zaman zaman durur gibi olduğunu fark etmiştir. Son aylarda düz yolda hızlı yürürken nefes nefese kaldığını, merdiven çıkmayı bıraktığını söyler. Aktif sigara kullanmaz ve daha önce KOAH tanısı almamıştır. Ateş, pürülan balgam, ani göğüs ağrısı veya bacakta tek taraflı şişlik tariflemez. Kilo vermeyi birkaç kez denemiş ancak sürdürememiştir."
  },
  "vitals": {
    "TA": "138/84 mmHg",
    "Nabız": "88/dk",
    "Solunum": "20/dk",
    "SpO2": "%91, oda havasında",
    "Ateş": "36.5 °C",
    "Perfüzyon": "Kapiller dolum 2 sn, siyanoz yok"
  },
  "exam": [
    "BMI 48 kg/m² olarak ölçülür; boyun çevresi belirgindir.",
    "Bilateral akciğer sesleri genel olarak azalmış duyulur, belirgin wheezing yoktur.",
    "Bacaklarda hafif bilateral gode bırakan ödem vardır.",
    "Juguler venöz dolgunluk belirgin değildir; bilinç açık ancak hasta görüşme sırasında uyuklamaya eğilimlidir.",
    "Kalp oskültasyonunda belirgin üfürüm yoktur."
  ],
  "investigations": [
    {
      "id": "v312-new-751-gunduz-uykululugu-ve-kronik-hiperkapni-tetkik-1",
      "label": "Arter kan gazı",
      "title": "Arter kan gazı",
      "orderLabel": "Arter kan gazı",
      "type": "laboratory",
      "priority": "essential",
      "subtype": "Arter kan gazı",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Kan gazı kronik hiperkapnik solunum yetmezliğini ve metabolik kompansasyonu gösterir.",
      "clinicalMeaning": "Kan gazı kronik hiperkapnik solunum yetmezliğini ve metabolik kompansasyonu gösterir.",
      "result": {
        "title": "Arter kan gazı",
        "summary": "Kan gazı kronik hiperkapnik solunum yetmezliğini ve metabolik kompansasyonu gösterir.",
        "interpretation": "Kan gazı kronik hiperkapnik solunum yetmezliğini ve metabolik kompansasyonu gösterir.",
        "values": [
          [
            "pH",
            "7.36",
            "7.35-7.45",
            "Kompanse"
          ],
          [
            "PaCO2",
            "58 mmHg",
            "35-45 mmHg",
            "Yüksek"
          ],
          [
            "HCO3",
            "32 mEq/L",
            "22-26 mEq/L",
            "Kronik kompansasyon"
          ],
          [
            "PaO2",
            "62 mmHg",
            "80-100 mmHg",
            "Hafif hipoksemi"
          ]
        ]
      }
    },
    {
      "id": "v312-new-751-gunduz-uykululugu-ve-kronik-hiperkapni-tetkik-2",
      "label": "Uyku çalışması",
      "title": "Uyku çalışması",
      "orderLabel": "Uyku çalışması",
      "type": "laboratory",
      "priority": "essential",
      "subtype": "Uyku çalışması",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Ağır uyku apnesi ve gece hipoventilasyonu gündüz hiperkapnisiyle birlikte değerlendirilir.",
      "clinicalMeaning": "Ağır uyku apnesi ve gece hipoventilasyonu gündüz hiperkapnisiyle birlikte değerlendirilir.",
      "result": {
        "title": "Uyku çalışması",
        "summary": "Ağır uyku apnesi ve gece hipoventilasyonu gündüz hiperkapnisiyle birlikte değerlendirilir.",
        "interpretation": "Ağır uyku apnesi ve gece hipoventilasyonu gündüz hiperkapnisiyle birlikte değerlendirilir.",
        "values": [
          [
            "Apne-hipopne indeksi",
            "56/saat",
            "<5/saat",
            "Ağır uyku apnesi"
          ],
          [
            "Gece minimum SpO2",
            "%72",
            ">90% tercih edilir",
            "Belirgin desatürasyon"
          ],
          [
            "CO2 izlemi",
            "Uykuda uzun süreli CO2 yüksekliği",
            "Normal olmalı",
            "Gece hipoventilasyonu"
          ],
          [
            "Uyku verimliliği",
            "Düşük",
            "Klinikle yorumlanır",
            "Sık bölünme"
          ]
        ]
      }
    },
    {
      "id": "v312-new-751-gunduz-uykululugu-ve-kronik-hiperkapni-tetkik-3",
      "label": "Solunum fonksiyon ve temel inceleme",
      "title": "Solunum fonksiyon ve temel inceleme",
      "orderLabel": "Solunum fonksiyon ve temel inceleme",
      "type": "laboratory",
      "priority": "essential",
      "subtype": "Solunum fonksiyon ve temel inceleme",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Obstrüktif patern olmaması ve yüksek bikarbonat kronik hipoventilasyon paternini destekler.",
      "clinicalMeaning": "Obstrüktif patern olmaması ve yüksek bikarbonat kronik hipoventilasyon paternini destekler.",
      "result": {
        "title": "Solunum fonksiyon ve temel inceleme",
        "summary": "Obstrüktif patern olmaması ve yüksek bikarbonat kronik hipoventilasyon paternini destekler.",
        "interpretation": "Obstrüktif patern olmaması ve yüksek bikarbonat kronik hipoventilasyon paternini destekler.",
        "values": [
          [
            "FEV1/FVC",
            "%78",
            ">%70",
            "Obstrüksiyon yok"
          ],
          [
            "FVC",
            "%68 beklenen",
            ">%80 beklenen",
            "Obeziteyle ilişkili restriktif eğilim"
          ],
          [
            "Serum bikarbonat",
            "33 mEq/L",
            "22-26 mEq/L",
            "Kronik CO2 retansiyonu ipucu"
          ],
          [
            "Akciğer grafisi",
            "Akut infiltrasyon yok",
            "Akut infiltrasyon beklenmez",
            "Pnömoni desteklenmiyor"
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
  "question": "Bu hasta için uzun dönem yönetimde en uygun temel yaklaşım aşağıdakilerden hangisidir?",
  "questionType": "Tedavi / solunum yetmezliği yönetimi",
  "answerTarget": "Obezite hipoventilasyon sendromu tedavisi",
  "diagnosis": {
    "correct": "Pozitif hava yolu basıncı tedavisi başlamak ve yapılandırılmış kilo kaybı programı planlamak",
    "options": [
      "Yüksek akımlı oksijeni tek başına uzun süreli tedavi olarak düzenlemek",
      "İnhale bronkodilatör ve sistemik steroidle KOAH alevlenmesi protokolü başlamak",
      "Asetazolamid monoterapisiyle bikarbonatı düşürüp solunum kontrolünü izlemek",
      "Pozitif hava yolu basıncı tedavisi başlamak ve yapılandırılmış kilo kaybı programı planlamak",
      "Gece sedatif hipnotik verip uyku bölünmesini azaltmak"
    ],
    "question": "Bu hasta için uzun dönem yönetimde en uygun temel yaklaşım aşağıdakilerden hangisidir?",
    "explanation": "Morbid obezite, ağır uyku apnesi, gündüz hiperkapnisi, yüksek bikarbonat ve akut enfeksiyon/obstrüksiyon bulgusu olmaması obezite hipoventilasyon sendromunu destekler. Temel tedavi pozitif hava yolu basıncı ile gece ventilasyonunun düzeltilmesi ve sürdürülebilir kilo kaybıdır; oksijen monoterapisi veya KOAH tedavisi asıl mekanizmayı düzeltmez.",
    "pearls": [
      "PaCO2 yüksekliği ve HCO3 artışı kronik hiperkapniyi gösterir.",
      "BMI yüksekliği ve ağır uyku apnesi obezite hipoventilasyonunu destekler.",
      "Obstrüksiyon yoksa KOAH varsayımı zayıflar.",
      "PAP tedavisi ventilatuvar sorunu hedefler; kilo kaybı hastalığın temel yükünü azaltır."
    ],
    "optionFeedback": {
      "Yüksek akımlı oksijeni tek başına uzun süreli tedavi olarak düzenlemek": "Oksijen hipoksemi varsa destekleyici olarak kullanılabilir; ancak obezite hipoventilasyonunda temel sorun alveoler hipoventilasyon ve karbondioksit retansiyonudur. Oksijeni tek başına vermek ventilasyonu düzeltmez, hatta bazı hastalarda CO2 retansiyonunu kötüleştirebilir. Bu hastada PaCO2 58 mmHg, HCO3 yüksekliği ve gündüz uyku hali kronik hipoventilasyonu gösterir. Uzun dönem tedavinin temeli pozitif hava yolu basıncı ve kilo kaybıdır; oksijen yalnız başına yeterli ve güvenli ana tedavi değildir.",
      "İnhale bronkodilatör ve sistemik steroidle KOAH alevlenmesi protokolü başlamak": "KOAH alevlenmesi wheezing, obstrüktif spirometri, sigara öyküsü ve akut enfeksiyon/alevlenme bulgularıyla düşünülür. Bu hastada belirgin sigara öyküsü yok, spirometri obstrüksiyon göstermiyor ve asıl tablo morbid obezite, ağır uyku apnesi, gündüz hiperkapnisi ve yüksek bikarbonat ile kronik hipoventilasyondur. Bronkodilatör-steroid protokolü KOAH için uygun olabilir; fakat bu vaka obezite hipoventilasyon sendromu yönetimi gerektirir. Yanlış tanı hastanın asıl ventilatuvar problemini tedavisiz bırakır.",
      "Asetazolamid monoterapisiyle bikarbonatı düşürüp solunum kontrolünü izlemek": "Asetazolamid bikarbonatı düşürerek solunum uyarısını etkileyebilir; bazı özel durumlarda yardımcı yaklaşımlar tartışılabilir. Ancak obezite hipoventilasyon sendromunda standart temel tedavi asetazolamid monoterapisi değildir. Hastanın ağır obstrüktif uyku apnesi ve gündüz hiperkapnisi vardır; ventilatuvar yükün ve üst hava yolu kollapsının düzeltilmesi gerekir. Bu nedenle pozitif hava yolu basıncı tedavisi ve kilo kaybı planı yerine asetazolamid vermek yetersiz kalır.",
      "Pozitif hava yolu basıncı tedavisi başlamak ve yapılandırılmış kilo kaybı programı planlamak": "Bu seçenek doğrudur. BMI 48 kg/m², gündüz uyku hali, sabah baş ağrısı, PaCO2 yüksekliği, kompansatuvar HCO3 artışı ve ağır uyku apnesi obezite hipoventilasyon sendromunu destekler. Tedavinin temeli gece pozitif hava yolu basıncıdır; ağır eşlik eden obstrüktif uyku apnesi varsa çoğu hastada CPAP ilk seçenek olarak başlanabilir, yeterli yanıt yoksa veya hipoventilasyon baskınsa bilevel PAP gerekebilir. Uzun dönem başarının diğer temel ayağı yapılandırılmış kilo kaybıdır. Bu yaklaşım hem ventilasyonu düzeltir hem pulmoner hipertansiyon ve sağ kalp yükünü azaltmayı hedefler.",
      "Gece sedatif hipnotik verip uyku bölünmesini azaltmak": "Sedatif hipnotikler uykuya dalmayı kolaylaştırabilir; ancak hipoventilasyonu olan bir hastada solunum dürtüsünü ve üst hava yolu tonusunu azaltarak CO2 retansiyonunu artırabilir. Bu vakada sorun basit uykusuzluk değil, ağır uyku apnesi ve gündüz hiperkapnisi ile seyreden ventilatuvar yetmezliktir. Sedatif vermek altta yatan mekanizmayı düzeltmediği gibi gece hipoksemi ve hiperkapni riskini artırabilir. Bu nedenle uygun yaklaşım PAP tedavisi ve kilo kaybıdır."
    }
  },
  "shuffleOptions": false,
  "coreKnowledge": "Obezite hipoventilasyon sendromu, başka nedenlerle açıklanamayan gündüz hiperkapnisi ve obezite birlikteliğidir; çoğu hastada obstrüktif uyku apnesi eşlik eder.",
  "examPearl": "OHS’de oksijen tek başına tedavi değildir; ventilasyonu düzelten PAP tedavisi gerekir.",
  "whyCorrect": "Doğru seçenek ventilatuvar yetmezliği doğrudan PAP ile hedefler ve altta yatan obezite yükünü azaltmayı planlar.",
  "optionComparison": "Yanlış seçenekler hipoksemiyi, KOAH varsayımını, bikarbonatı veya uykusuzluğu hedefler; ancak gündüz hiperkapnisinin temel mekanizmasını düzeltmez.",
  "evidenceChain": [
    "BMI 48 kg/m² → obezite hipoventilasyonu için güçlü zemin.",
    "PaCO2 58 mmHg + HCO3 32 mEq/L → kronik hiperkapni ve renal kompansasyon.",
    "AHİ 56/saat → ağır uyku apnesi eşlik ediyor.",
    "FEV1/FVC %78 → belirgin KOAH obstrüksiyonu yok.",
    "Ateş/infiltrasyon yokluğu → akut enfeksiyon alevlenmesi olasılığını azaltır."
  ],
  "whyWrong": "Yanlış seçenekler semptomlardan birini geçici olarak etkileyebilir; fakat PAP ve kilo kaybı olmadan kronik hipoventilasyon tedavi edilmiş olmaz.",
  "preserveInvestigationOrder": true,
  "aiMeta": {
    "version": "v312",
    "source": "manual-render-safe-internal-medicine-expansion",
    "antiRepeatChecked": true,
    "schemaReference": "V311 cases.js rawCases schema with diagnosis.optionFeedback object mapping"
  },
  "findings": [],
  "images": []
},
{
  "id": "v312-new-752-bas-agrisi-ates-ve-dusuk-cd4",
  "branchId": "internal-medicine",
  "caseType": "standard",
  "relatedBranch": "İç Hastalıkları",
  "title": "Baş ağrısı, ateş ve düşük CD4",
  "difficulty": "TUS düzeyi",
  "difficultyTag": "TUS düzeyi",
  "clinicalFocus": "İleri HIV immünsüpresyonunda subakut menenjit, yüksek BOS basıncı ve kriptokok antijen pozitifliğini acil antifungal-indüksiyon ve basınç yönetimiyle ilişkilendirme.",
  "learningTarget": "Kriptokokal menenjitte liposomal amfoterisin B + flusitozin indüksiyonu, intrakraniyal basınç yönetimi ve ART zamanlamasını birlikte düşünme.",
  "demographics": "38 yaşında erkek hasta",
  "setting": "Acil servis / enfeksiyon hastalıkları konsültasyonu",
  "chiefComplaint": "Hasta, iki haftadır artan baş ağrısı, ateş ve dalgınlık nedeniyle acile getiriliyor.",
  "stem": "Hasta yaklaşık iki haftadır giderek artan yaygın baş ağrısı yaşadığını, son günlerde ışığa bakınca rahatsız olduğunu ve birkaç kez kustuğunu anlatır. Yakını son iki gündür hastanın konuşmalarının yavaşladığını ve randevularını karıştırmaya başladığını fark etmiştir. Son aylarda istemsiz kilo kaybı olmuş ve ağız içinde beyaz plaklar nedeniyle yemek yemesi zorlaşmıştır. Bilinen HIV tanısı vardır ancak düzensiz takip edildiğini ve son bir yıldır ilaçlarını aksattığını söyler. Ani başlayan nöbet, tek taraflı güçsüzlük veya yakın zamanda kafa travması tariflenmez. Baş ağrısı şiddetlenip kusma eklenince acile başvurmuştur.",
  "patientIntro": {
    "profile": "38 yaşında erkek hasta, ileri immünsüpresyon zemininde subakut baş ağrısı ve ateşle değerlendiriliyor.",
    "presentation": "Baş ağrısı, kusma, dalgınlık, ateş ve düşük CD4 düzeyi ön plandadır.",
    "historySummary": "Hasta yaklaşık iki haftadır giderek artan yaygın baş ağrısı yaşadığını, son günlerde ışığa bakınca rahatsız olduğunu ve birkaç kez kustuğunu anlatır. Yakını son iki gündür hastanın konuşmalarının yavaşladığını ve randevularını karıştırmaya başladığını fark etmiştir. Son aylarda istemsiz kilo kaybı olmuş ve ağız içinde beyaz plaklar nedeniyle yemek yemesi zorlaşmıştır. Bilinen HIV tanısı vardır ancak düzensiz takip edildiğini ve son bir yıldır ilaçlarını aksattığını söyler. Ani başlayan nöbet, tek taraflı güçsüzlük veya yakın zamanda kafa travması tariflenmez. Baş ağrısı şiddetlenip kusma eklenince acile başvurmuştur."
  },
  "vitals": {
    "TA": "106/64 mmHg",
    "Nabız": "108/dk",
    "Solunum": "20/dk",
    "SpO2": "97%, oda havasında",
    "Ateş": "38.1 °C",
    "Perfüzyon": "Kapiller dolum 2 sn, hafif dehidratasyon bulgusu"
  },
  "exam": [
    "Hasta uykuluya eğilimlidir ancak uyaranla kooperedir.",
    "Ense sertliği hafiftir; Kernig belirgin değildir.",
    "Oral kandidiyazis ile uyumlu beyaz plaklar izlenir.",
    "Fokal motor defisit saptanmaz; papil sınırları silik izlenir.",
    "Akciğer oskültasyonunda belirgin ral veya wheezing yoktur."
  ],
  "investigations": [
    {
      "id": "v312-new-752-bas-agrisi-ates-ve-dusuk-cd4-tetkik-1",
      "label": "HIV ve temel laboratuvar",
      "title": "HIV ve temel laboratuvar",
      "orderLabel": "HIV ve temel laboratuvar",
      "type": "laboratory",
      "priority": "essential",
      "subtype": "HIV ve temel laboratuvar",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "İleri hücresel immün yetmezlik fırsatçı santral sinir sistemi enfeksiyonu riskini artırır.",
      "clinicalMeaning": "İleri hücresel immün yetmezlik fırsatçı santral sinir sistemi enfeksiyonu riskini artırır.",
      "result": {
        "title": "HIV ve temel laboratuvar",
        "summary": "İleri hücresel immün yetmezlik fırsatçı santral sinir sistemi enfeksiyonu riskini artırır.",
        "interpretation": "İleri hücresel immün yetmezlik fırsatçı santral sinir sistemi enfeksiyonu riskini artırır.",
        "values": [
          [
            "CD4 lenfosit",
            "42/µL",
            ">500/µL",
            "Ağır immünsüpresyon"
          ],
          [
            "HIV RNA",
            "Yüksek kopya düzeyi",
            "Baskılanmış beklenir",
            "Kontrolsüz viremiyi destekler"
          ],
          [
            "Sodyum",
            "131 mEq/L",
            "135-145 mEq/L",
            "Hafif düşük"
          ],
          [
            "Kreatinin",
            "0.9 mg/dL",
            "0.7-1.2 mg/dL",
            "Başlangıç böbrek fonksiyonu korunmuş"
          ]
        ]
      }
    },
    {
      "id": "v312-new-752-bas-agrisi-ates-ve-dusuk-cd4-tetkik-2",
      "label": "BOS incelemesi",
      "title": "BOS incelemesi",
      "orderLabel": "BOS incelemesi",
      "type": "laboratory",
      "priority": "essential",
      "subtype": "BOS incelemesi",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Subakut menenjit paternine eşlik eden yüksek açılış basıncı acil basınç yönetimi gerektirir.",
      "clinicalMeaning": "Subakut menenjit paternine eşlik eden yüksek açılış basıncı acil basınç yönetimi gerektirir.",
      "result": {
        "title": "BOS incelemesi",
        "summary": "Subakut menenjit paternine eşlik eden yüksek açılış basıncı acil basınç yönetimi gerektirir.",
        "interpretation": "Subakut menenjit paternine eşlik eden yüksek açılış basıncı acil basınç yönetimi gerektirir.",
        "values": [
          [
            "Açılış basıncı",
            "34 cmH2O",
            "10-20 cmH2O",
            "Yüksek"
          ],
          [
            "BOS lökosit",
            "68/µL, lenfosit ağırlıklı",
            "0-5/µL",
            "Pleositoz"
          ],
          [
            "BOS glukoz",
            "32 mg/dL",
            "Serumun yaklaşık %60ı",
            "Düşük"
          ],
          [
            "BOS protein",
            "92 mg/dL",
            "15-45 mg/dL",
            "Yüksek"
          ],
          [
            "BOS kriptokok antijeni",
            "Pozitif",
            "Negatif",
            "Fungal kapsül antijeni"
          ]
        ]
      }
    },
    {
      "id": "v312-new-752-bas-agrisi-ates-ve-dusuk-cd4-tetkik-3",
      "label": "Görüntüleme ve güvenlik değerlendirmesi",
      "title": "Görüntüleme ve güvenlik değerlendirmesi",
      "orderLabel": "Görüntüleme ve güvenlik değerlendirmesi",
      "type": "laboratory",
      "priority": "essential",
      "subtype": "Görüntüleme ve güvenlik değerlendirmesi",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Antifungal tedavi öncesi renal-elektrolit izlemi ve güvenli LP koşulları değerlendirilir.",
      "clinicalMeaning": "Antifungal tedavi öncesi renal-elektrolit izlemi ve güvenli LP koşulları değerlendirilir.",
      "result": {
        "title": "Görüntüleme ve güvenlik değerlendirmesi",
        "summary": "Antifungal tedavi öncesi renal-elektrolit izlemi ve güvenli LP koşulları değerlendirilir.",
        "interpretation": "Antifungal tedavi öncesi renal-elektrolit izlemi ve güvenli LP koşulları değerlendirilir.",
        "values": [
          [
            "Kontrastsız beyin BT",
            "Kitle etkisi veya hidrosefali yok",
            "Kitle etkisi olmamalı",
            "LP güvenliği açısından değerlendirildi"
          ],
          [
            "Tam kan sayımı",
            "Lökosit 3.100/µL",
            "4.000-10.000/µL",
            "Lökopeni"
          ],
          [
            "Potasyum",
            "3.7 mEq/L",
            "3.5-5.0 mEq/L",
            "Başlangıç değeri"
          ],
          [
            "Magnezyum",
            "1.8 mg/dL",
            "1.7-2.2 mg/dL",
            "Başlangıç değeri"
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
  "questionType": "Acil enfeksiyon yönetimi",
  "answerTarget": "Kriptokokal menenjit tedavi sıralaması",
  "diagnosis": {
    "correct": "Liposomal amfoterisin B ile flusitozin başlamak, açılış basıncını tekrarlayan lomber ponksiyonlarla yönetmek ve antiretroviral tedaviyi erken dönemde dikkatle ertelemek",
    "options": [
      "Liposomal amfoterisin B ile flusitozin başlamak, açılış basıncını tekrarlayan lomber ponksiyonlarla yönetmek ve antiretroviral tedaviyi erken dönemde dikkatle ertelemek",
      "Tek doz seftriakson verip kültür sonucu çıkana kadar taburculuk sonrası kontrol planlamak",
      "Yüksek doz asiklovir başlamak ve BOS basıncı yüksek olsa bile tekrar lomber ponksiyon yapmamak",
      "Yalnız flukonazol profilaksisi başlamak ve antiretroviral tedaviyi aynı gün yüksek dozla başlatmak",
      "Sistemik kortikosteroid monoterapisiyle meningeal inflamasyonu baskılamak"
    ],
    "question": "Bu hastada acil yönetimde en uygun yaklaşım aşağıdakilerden hangisidir?",
    "explanation": "İleri HIV, subakut baş ağrısı, ateş, hafif meningeal bulgular, yüksek BOS açılış basıncı ve BOS kriptokok antijen pozitifliği kriptokokal menenjiti destekler. Yönetim, fungisidal indüksiyon tedavisi ile fungal yükü azaltmayı, terapötik lomber ponksiyonlarla intrakraniyal basıncı kontrol etmeyi ve ART başlangıcını IRIS riskini gözeterek zamanlamayı içerir.",
    "pearls": [
      "Subakut seyir ve düşük CD4 fırsatçı fungal menenjiti düşündürür.",
      "Yüksek açılış basıncı kriptokokal menenjitte aktif yönetilmelidir.",
      "İndüksiyon tedavisinde amfoterisin B + flusitozin temel kombinasyondur.",
      "ART zamanlaması, kriptokokal IRIS riskinden dolayı bakteriyel menenjitten farklı düşünülür."
    ],
    "optionFeedback": {
      "Liposomal amfoterisin B ile flusitozin başlamak, açılış basıncını tekrarlayan lomber ponksiyonlarla yönetmek ve antiretroviral tedaviyi erken dönemde dikkatle ertelemek": "Bu seçenek doğrudur. İleri immünsüpresyonu olan hastada subakut baş ağrısı, ateş, kilo kaybı, ense sertliği, yüksek BOS açılış basıncı, lenfosit ağırlıklı BOS ve pozitif kriptokok antijeni kriptokokal menenjiti destekler. Akut yönetimde fungisidal indüksiyon tedavisi liposomal amfoterisin B ve flusitozin kombinasyonudur; böbrek fonksiyonu ve elektrolitler yakından izlenir. Kriptokokal menenjitte mortaliteyi belirleyen önemli unsurlardan biri intrakraniyal basınçtır, bu nedenle semptomatik yüksek basınç terapötik lomber ponksiyonlarla yönetilir. Antiretroviral tedavi tanı anında hemen başlatılırsa intrakraniyal inflamasyonu artıran IRIS riski doğabilir; bu nedenle başlangıç zamanlaması dikkatle planlanır.",
      "Tek doz seftriakson verip kültür sonucu çıkana kadar taburculuk sonrası kontrol planlamak": "Seftriakson bakteriyel menenjit ampirik tedavisinin önemli bir parçası olabilir; ancak bu hastanın tablosu saatler içinde gelişen pürülan bakteriyel menenjitten çok ileri HIV ilişkili subakut fungal menenjite uyar. CD4 düşüklüğü, subakut seyir, yüksek açılış basıncı ve BOS kriptokok antijen pozitifliği taburculukla izlenemeyecek kadar ciddi bir enfeksiyonu gösterir. Tek doz antibiyotik ve bekleme yaklaşımı hem antifungal indüksiyonu hem de basınç yönetimini geciktirir. Bu nedenle yaşamı tehdit eden komplikasyon riski yüksektir.",
      "Yüksek doz asiklovir başlamak ve BOS basıncı yüksek olsa bile tekrar lomber ponksiyon yapmamak": "Asiklovir HSV ensefaliti gibi viral santral sinir sistemi enfeksiyonlarında doğru tedavidir; özellikle temporal lob bulguları, nöbet veya fokal ensefalit şüphesinde kullanılır. Bu vakada BOS kriptokok antijeni pozitiftir ve açılış basıncı belirgin yüksektir. Yüksek intrakraniyal basıncı tedavisiz bırakmak görme kaybı, bilinç bozukluğu ve ölüm riskini artırır. Antiviral tedavi tek başına fungal yükü azaltmaz; gerekli olan amfoterisin B + flusitozin indüksiyonu ve basınç kontrolüdür.",
      "Yalnız flukonazol profilaksisi başlamak ve antiretroviral tedaviyi aynı gün yüksek dozla başlatmak": "Flukonazol kriptokokal menenjitte konsolidasyon ve idame dönemlerinde önemlidir; ancak ağır/meningeal hastalıkta tek başına başlangıç tedavisi olarak fungisidal etki açısından yetersiz kalır. Ayrıca ART’nin aynı gün başlanması, özellikle yüksek fungal yük ve yüksek BOS basıncı varken kriptokokal IRIS riskini artırabilir. Bu olguda önce uygun antifungal indüksiyon ve intrakraniyal basınç yönetimi gerekir; ART zamanlaması enfeksiyon kontrolüyle dengelenmelidir.",
      "Sistemik kortikosteroid monoterapisiyle meningeal inflamasyonu baskılamak": "Kortikosteroidler bazı menenjit türlerinde veya belirli inflamatuvar komplikasyonlarda seçilmiş şekilde kullanılabilir; ancak kriptokokal menenjitte antifungal tedavi yerine steroid monoterapisi verilmez. Bu yaklaşım fungal yükü azaltmaz ve immünsüprese hastada enfeksiyon kontrolünü daha da zorlaştırabilir. Vakanın ana sorunu canlı fungal enfeksiyon ve yüksek intrakraniyal basınçtır. Bu nedenle fungisidal kombinasyon tedavisi ve terapötik BOS basınç yönetimi önceliklidir."
    }
  },
  "shuffleOptions": false,
  "coreKnowledge": "Kriptokokal menenjitte tedavi yalnız antifungal seçimi değildir; intrakraniyal basınç kontrolü ve ART zamanlaması mortaliteyi etkileyen temel bileşenlerdir.",
  "examPearl": "Düşük CD4 + subakut baş ağrısı + yüksek BOS basıncı varsa kriptokok akılda tutulur; basınç yönetimini unutma.",
  "whyCorrect": "Doğru seçenek tanı sonrası üç kritik hedefi birlikte içerir: fungisidal indüksiyon, BOS basıncı kontrolü ve ART zamanlaması.",
  "optionComparison": "Yanlış seçenekler bakteriyel/viral menenjit kalıbına, yetersiz flukonazol monoterapisine veya steroid monoterapisine dayanır ve yüksek fungal yük ile basınç sorununu yönetmez.",
  "evidenceChain": [
    "CD4 42/µL → fırsatçı fungal enfeksiyon riski yüksek.",
    "İki haftalık baş ağrısı ve kusma → subakut menenjit seyri.",
    "BOS açılış basıncı 34 cmH2O → terapötik basınç yönetimi gerektiren yükseklik.",
    "BOS kriptokok antijeni pozitif → kriptokokal menenjit lehine güçlü kanıt.",
    "Fokal defisit/kitle etkisi yok → LP ve basınç takibi uygulanabilir."
  ],
  "whyWrong": "Yanlış seçenekler antimikrobiyal kapsamı, basınç yönetimini veya ART zamanlamasını eksik kurduğu için yüksek risklidir.",
  "preserveInvestigationOrder": true,
  "aiMeta": {
    "version": "v312",
    "source": "manual-render-safe-internal-medicine-expansion",
    "antiRepeatChecked": true,
    "schemaReference": "V311 cases.js rawCases schema with diagnosis.optionFeedback object mapping"
  },
  "findings": [],
  "images": []
},
{
  "id": "v312-new-753-aksamlari-yukselen-ates-ve-somon-dokuntu",
  "branchId": "internal-medicine",
  "caseType": "standard",
  "relatedBranch": "İç Hastalıkları",
  "title": "Akşamları yükselen ateş ve somon renkli döküntü",
  "difficulty": "TUS düzeyi",
  "difficultyTag": "TUS düzeyi",
  "clinicalFocus": "Uzayan ateş, geçici somon renkli döküntü, artralji ve çok yüksek ferritin paterninde erişkin başlangıçlı Still hastalığını ayırt etme.",
  "learningTarget": "AOSD’nin enfeksiyon, SLE, endokardit ve HLH ile karışabileceğini; tanıda klinik örüntü ve dışlama mantığının önemli olduğunu öğrenme.",
  "demographics": "34 yaşında kadın hasta",
  "setting": "Romatoloji polikliniği / ateş etyolojisi değerlendirmesi",
  "chiefComplaint": "Hasta, üç haftadır akşamları yükselen ateş, eklem ağrısı ve ateş sırasında beliren döküntü nedeniyle başvuruyor.",
  "stem": "Hasta üç haftadır gün içinde nispeten iyi olduğunu, akşam saatlerinde ateşinin 39 °C üzerine çıktığını ve ateş yükselirken gövdesinde pembe-turuncu renkte silik döküntüler belirdiğini anlatır. Ateş düştüğünde döküntünün neredeyse kaybolduğunu fark etmiştir. Boğaz ağrısı ilk günlerden beri vardır; son haftada el bilekleri, dizleri ve ayak bileklerinde ağrı ve sabah tutukluğu eklenmiştir. Antibiyotik kullanmasına rağmen ateşleri devam etmiş, kan kültürleri için daha önce başvurduğu merkezden kesin bir enfeksiyon odağı söylenmemiştir. Fotosensitivite, ağızda tekrarlayan derin ülser, idrarda kan veya belirgin kilo kaybı tariflemez. Ateşlerin uzaması ve eklem ağrılarının artması üzerine romatolojiye yönlendirilmiştir.",
  "patientIntro": {
    "profile": "34 yaşında kadın hasta, uzayan ateş ve inflamatuvar eklem yakınmalarıyla değerlendiriliyor.",
    "presentation": "Akşam pik yapan ateş, ateşle belirginleşen geçici somon renkli döküntü, boğaz ağrısı ve artralji ön plandadır.",
    "historySummary": "Hasta üç haftadır gün içinde nispeten iyi olduğunu, akşam saatlerinde ateşinin 39 °C üzerine çıktığını ve ateş yükselirken gövdesinde pembe-turuncu renkte silik döküntüler belirdiğini anlatır. Ateş düştüğünde döküntünün neredeyse kaybolduğunu fark etmiştir. Boğaz ağrısı ilk günlerden beri vardır; son haftada el bilekleri, dizleri ve ayak bileklerinde ağrı ve sabah tutukluğu eklenmiştir. Antibiyotik kullanmasına rağmen ateşleri devam etmiş, kan kültürleri için daha önce başvurduğu merkezden kesin bir enfeksiyon odağı söylenmemiştir. Fotosensitivite, ağızda tekrarlayan derin ülser, idrarda kan veya belirgin kilo kaybı tariflemez. Ateşlerin uzaması ve eklem ağrılarının artması üzerine romatolojiye yönlendirilmiştir."
  },
  "vitals": {
    "TA": "112/72 mmHg",
    "Nabız": "104/dk",
    "Solunum": "18/dk",
    "SpO2": "%98, oda havasında",
    "Ateş": "39.2 °C",
    "Perfüzyon": "Kapiller dolum 2 sn, hipotansiyon yok"
  },
  "exam": [
    "Ateş sırasında gövdede ve proksimal ekstremitelerde silik somon-pembe makülopapüler döküntü izlenir.",
    "Diz ve el bileklerinde hassasiyet ve hafif şişlik vardır.",
    "Boğaz hafif hiperemiktir; tonsiller eksüda yoktur.",
    "Kalpte yeni üfürüm duyulmaz; periferik embolik cilt bulgusu yoktur.",
    "Hepatosplenomegali belirgin değildir, nörolojik muayene doğaldır."
  ],
  "investigations": [
    {
      "id": "v312-new-753-aksamlari-yukselen-ates-ve-somon-dokuntu-tetkik-1",
      "label": "Tam kan sayımı ve inflamasyon",
      "title": "Tam kan sayımı ve inflamasyon",
      "orderLabel": "Tam kan sayımı ve inflamasyon",
      "type": "laboratory",
      "priority": "essential",
      "subtype": "Tam kan sayımı ve inflamasyon",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Nötrofil baskın sistemik inflamasyon enfeksiyon dışı otoinflamatuvar süreçlerle de görülebilir.",
      "clinicalMeaning": "Nötrofil baskın sistemik inflamasyon enfeksiyon dışı otoinflamatuvar süreçlerle de görülebilir.",
      "result": {
        "title": "Tam kan sayımı ve inflamasyon",
        "summary": "Nötrofil baskın sistemik inflamasyon enfeksiyon dışı otoinflamatuvar süreçlerle de görülebilir.",
        "interpretation": "Nötrofil baskın sistemik inflamasyon enfeksiyon dışı otoinflamatuvar süreçlerle de görülebilir.",
        "values": [
          [
            "Lökosit",
            "18.600/µL",
            "4.000-10.000/µL",
            "Yüksek"
          ],
          [
            "Nötrofil oranı",
            "%88",
            "%40-70",
            "Nötrofili"
          ],
          [
            "Hemoglobin",
            "11.4 g/dL",
            "12-16 g/dL",
            "Hafif düşük"
          ],
          [
            "Trombosit",
            "486.000/µL",
            "150.000-400.000/µL",
            "Reaktif yüksek"
          ],
          [
            "CRP",
            "126 mg/L",
            "<5 mg/L",
            "Yüksek"
          ]
        ]
      }
    },
    {
      "id": "v312-new-753-aksamlari-yukselen-ates-ve-somon-dokuntu-tetkik-2",
      "label": "Ferritin ve biyokimya",
      "title": "Ferritin ve biyokimya",
      "orderLabel": "Ferritin ve biyokimya",
      "type": "laboratory",
      "priority": "essential",
      "subtype": "Ferritin ve biyokimya",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Çok yüksek ferritin ve akut faz yanıtı güçlü sistemik inflamasyonu destekler; ağır HLH paterni için ek bulgular aranmalıdır.",
      "clinicalMeaning": "Çok yüksek ferritin ve akut faz yanıtı güçlü sistemik inflamasyonu destekler; ağır HLH paterni için ek bulgular aranmalıdır.",
      "result": {
        "title": "Ferritin ve biyokimya",
        "summary": "Çok yüksek ferritin ve akut faz yanıtı güçlü sistemik inflamasyonu destekler; ağır HLH paterni için ek bulgular aranmalıdır.",
        "interpretation": "Çok yüksek ferritin ve akut faz yanıtı güçlü sistemik inflamasyonu destekler; ağır HLH paterni için ek bulgular aranmalıdır.",
        "values": [
          [
            "Ferritin",
            "12.800 ng/mL",
            "15-150 ng/mL",
            "Çok yüksek"
          ],
          [
            "AST",
            "62 U/L",
            "<35 U/L",
            "Hafif yüksek"
          ],
          [
            "ALT",
            "58 U/L",
            "<35 U/L",
            "Hafif yüksek"
          ],
          [
            "Trigliserid",
            "168 mg/dL",
            "<150 mg/dL",
            "Hafif yüksek"
          ],
          [
            "Fibrinojen",
            "460 mg/dL",
            "200-400 mg/dL",
            "Yüksek"
          ]
        ]
      }
    },
    {
      "id": "v312-new-753-aksamlari-yukselen-ates-ve-somon-dokuntu-tetkik-3",
      "label": "Ayırıcı tanı çalışmaları",
      "title": "Ayırıcı tanı çalışmaları",
      "orderLabel": "Ayırıcı tanı çalışmaları",
      "type": "laboratory",
      "priority": "essential",
      "subtype": "Ayırıcı tanı çalışmaları",
      "category": "laboratory",
      "testTypeCategory": "laboratory",
      "summary": "Enfeksiyon ve otoantikor aracılı hastalıkları destekleyen ana bulguların olmaması otoinflamatuvar tanıyı güçlendirir.",
      "clinicalMeaning": "Enfeksiyon ve otoantikor aracılı hastalıkları destekleyen ana bulguların olmaması otoinflamatuvar tanıyı güçlendirir.",
      "result": {
        "title": "Ayırıcı tanı çalışmaları",
        "summary": "Enfeksiyon ve otoantikor aracılı hastalıkları destekleyen ana bulguların olmaması otoinflamatuvar tanıyı güçlendirir.",
        "interpretation": "Enfeksiyon ve otoantikor aracılı hastalıkları destekleyen ana bulguların olmaması otoinflamatuvar tanıyı güçlendirir.",
        "values": [
          [
            "ANA",
            "Negatif",
            "Negatif",
            "SLE lehine değil"
          ],
          [
            "RF",
            "Negatif",
            "Negatif",
            "RA lehine değil"
          ],
          [
            "Kompleman C3/C4",
            "Normal",
            "Normal",
            "Aktif immün kompleks tüketimi yok"
          ],
          [
            "Üç set kan kültürü",
            "Üreme yok",
            "Üreme olmamalı",
            "Endokardit desteklenmiyor"
          ],
          [
            "Transtorasik EKO",
            "Vejetasyon izlenmedi",
            "Vejetasyon olmamalı",
            "Kapak enfeksiyonu lehine değil"
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
  "questionType": "Tanı / romatolojik ayırıcı tanı",
  "answerTarget": "Uzayan ateş ve hiperferritinemi ayırıcı tanısı",
  "diagnosis": {
    "correct": "Erişkin başlangıçlı Still hastalığı",
    "options": [
      "Erişkin başlangıçlı Still hastalığı",
      "Akut bakteriyel endokardit",
      "Sistemik lupus eritematozus alevlenmesi",
      "Primer hemofagositik lenfohistiyositoz",
      "Akut romatizmal ateş"
    ],
    "question": "Bu hastada en olası tanı aşağıdakilerden hangisidir?",
    "explanation": "Günlük ateş pikleri, ateşle eş zamanlı belirip kaybolan somon renkli döküntü, boğaz ağrısı, inflamatuvar artrit, nötrofilik lökositoz, çok yüksek ferritin, negatif ANA/RF ve enfeksiyon odağı bulunmaması erişkin başlangıçlı Still hastalığı ile uyumludur. Tanı enfeksiyon, malignite ve diğer romatolojik hastalıkların dışlanmasıyla güçlenir.",
    "pearls": [
      "Ateşle gelen-geçen somon döküntü AOSD için klasik ipucudur.",
      "Nötrofilik lökositoz SLE’den ayrımda yardımcıdır.",
      "Ferritin çok yüksek olabilir ancak tek başına tanı koydurmaz.",
      "HLH/MAS gelişimi açısından sitopeni, fibrinojen ve organ disfonksiyonu izlenmelidir."
    ],
    "optionFeedback": {
      "Erişkin başlangıçlı Still hastalığı": "Bu seçenek doğrudur. Günlük yüksek ateş pikleri, ateş sırasında belirginleşen geçici somon renkli döküntü, boğaz ağrısı, artralji/artrit, nötrofilik lökositoz, çok yüksek ferritin, negatif ANA/RF ve enfeksiyon-kültür bulgularının desteklememesi erişkin başlangıçlı Still hastalığını düşündürür. AOSD bir dışlama tanısıdır; enfeksiyon, malignite ve diğer romatolojik hastalıklar uygun klinik bağlamda dışlanmalıdır. Ferritinin çok yüksek olması tek başına tanı koydurmaz, ancak bu klinik örüntü içinde güçlü destek sağlar. Hastalık sistemik inflamasyon, artrit ve nadiren makrofaj aktivasyon sendromu gibi ağır komplikasyonlarla seyredebilir.",
      "Akut bakteriyel endokardit": "Akut bakteriyel endokardit ateş, üfürüm, embolik bulgular ve pozitif kan kültürleriyle seyredebilir. Ancak bu vakada ateş pikleriyle ortaya çıkan geçici somon renkli döküntü, belirgin nötrofilik lökositoz, çok yüksek ferritin ve negatif tekrarlayan kan kültürleri endokarditten daha çok sistemik otoinflamatuvar bir tabloyu destekler. Ekokardiyografide vejetasyon verilmemesi ve kapak odağını destekleyen veri olmaması da bu seçeneği zayıflatır. Endokardit ayırıcı tanıda düşünülür; fakat mevcut veri zinciri onu en olası tanı yapmaz.",
      "Sistemik lupus eritematozus alevlenmesi": "SLE ateş, artralji, döküntü, sitopeni, böbrek tutulumu ve otoantikor pozitifliğiyle gelebilir. Bu hastada ise ANA negatif, kompleman düzeyleri normal, belirgin sitopeni yok ve döküntü fotosensitif/malar özellikte değil; ateşle gelip geçen somon renkli döküntü tarifleniyor. SLE’de lökopeni daha tipikken burada nötrofilik lökositoz vardır. Çok yüksek ferritin SLE’de de görülebilir ama bu klinik örüntü AOSD lehinedir.",
      "Primer hemofagositik lenfohistiyositoz": "Hemofagositik lenfohistiyositoz yüksek ateş ve çok yüksek ferritinle gelebilir; ayrıca sitopeniler, hipertrigliseridemi, hipofibrinojenemi, hepatosplenomegali ve organ disfonksiyonu beklenebilir. Bu vakada ferritin çok yüksek olsa da belirgin sitopeni, koagülopati veya ağır karaciğer yetmezliği verilmemiştir. AOSD’nin ciddi komplikasyonu olarak makrofaj aktivasyon sendromu gelişebilir; bu nedenle hasta izlenmelidir. Fakat sunulan başlangıç paterni primer HLH’den çok AOSD ile uyumludur.",
      "Akut romatizmal ateş": "Akut romatizmal ateş genellikle streptokok enfeksiyonu sonrası gezici poliartrit, kardit, Sydenham kore, eritema marginatum veya subkutan nodüllerle düşünülür. Erişkin yaşta yeni başlayan bu tabloda ateşle eş zamanlı somon renkli döküntü, çok yüksek ferritin ve negatif otoantikorlar AOSD için daha tipiktir. ASO yüksekliği, migratuvar büyük eklem artriti veya kardit bulguları verilmemiştir. Bu nedenle akut romatizmal ateş en uygun tanı değildir."
    }
  },
  "shuffleOptions": false,
  "coreKnowledge": "Erişkin başlangıçlı Still hastalığı, yüksek ateş pikleri, geçici somon döküntü, boğaz ağrısı, artrit/artralji, nötrofilik lökositoz ve çok yüksek ferritinle seyreden otoinflamatuvar bir hastalıktır.",
  "examPearl": "Ateşle belirginleşip ateş düşünce kaybolan somon döküntü + ferritin yüksekliği = AOSD akılda tutulur.",
  "whyCorrect": "Doğru seçenek ateş paterni, döküntünün karakteri, nötrofili, ferritin yüksekliği ve negatif ayırıcı testleri birlikte açıklar.",
  "optionComparison": "Yanlış seçenekler ateş ve inflamasyonu açıklayabilir; ancak geçici somon döküntü, nötrofilik lökositoz, çok yüksek ferritin ve negatif kültür/otoantikor bütünlüğünü daha zayıf açıklar.",
  "evidenceChain": [
    "Quotidian ateş paterni → AOSD için tipik klinik ritim.",
    "Ateşle belirginleşen somon-pembe döküntü → geçici otoinflamatuvar döküntü paterni.",
    "Lökosit 18.600/µL ve nötrofil %88 → nötrofilik inflamasyon.",
    "Ferritin 12.800 ng/mL → güçlü hiperferritinemi.",
    "ANA/RF negatif ve kültürlerde üreme yok → SLE, RA ve endokardit olasılığını azaltır."
  ],
  "whyWrong": "Yanlış seçenekler enfeksiyon, otoimmün hastalık veya hiperferritinemik sendrom ayırıcı tanısında düşünülse de vakadaki özgül patern AOSD lehinedir.",
  "preserveInvestigationOrder": true,
  "aiMeta": {
    "version": "v312",
    "source": "manual-render-safe-internal-medicine-expansion",
    "antiRepeatChecked": true,
    "schemaReference": "V311 cases.js rawCases schema with diagnosis.optionFeedback object mapping"
  },
  "findings": [],
  "images": []
},
{
    "id": "v313-new-754-heparin-sonrasi-bacak-agrisi-ve-trombosit-dususu",
    "branchId": "internal-medicine",
    "caseType": "standard",
    "relatedBranch": "İç Hastalıkları",
    "title": "Heparin sonrası bacak ağrısı ve trombosit düşüşü",
    "difficulty": "TUS düzeyi",
    "difficultyTag": "TUS düzeyi",
    "clinicalFocus": "Heparin maruziyeti sonrası gelişen trombosit düşüşü ve yeni tromboz birlikteliğinde HIT yönetimini doğru sıralama.",
    "learningTarget": "HIT’in kanama değil tromboz ağırlıklı immün bir sendrom olduğunu ve ilk yönetimde tüm heparinlerin kesilip heparin dışı antikoagülasyon başlanması gerektiğini ayırt etme.",
    "demographics": "63 yaşında erkek hasta",
    "setting": "Kardiyoloji servisi / konsültasyon",
    "chiefComplaint": "Hasta, yatırıldığı serviste yeni başlayan sağ bacak ağrısı ve şişlik nedeniyle değerlendiriliyor.",
    "stem": "Hasta bir hafta önce NSTEMI nedeniyle yatırıldığını, yatışından beri karın cildinden kan sulandırıcı iğne yapıldığını anlatır. Son iki gündür sağ baldırında gerginlik ve yürürken artan ağrı fark etmiş, sabah çorabının sağ bacağında belirgin iz bıraktığını söylemiştir. Daha önce benzer bacak şişliği yaşamamıştır. Göğüs ağrısı tekrarlamamış, kanlı balgam veya bayılma tariflememiştir. Burun kanaması, melena veya idrarda kan fark etmemiştir. Hemşirenin trombositlerinin hızla düştüğünü söylemesi üzerine hematoloji görüşü istenmiştir.",
    "patientIntro": {
      "profile": "63 yaşında erkek hasta, yakın zamanda akut koroner sendrom nedeniyle yatırılmış ve heparin türevi antikoagülan kullanmaktadır.",
      "presentation": "Yatıştan yaklaşık bir hafta sonra yeni tek taraflı bacak şişliği, baldır ağrısı ve belirgin trombosit düşüşü gelişmiştir.",
      "historySummary": "Hasta bir hafta önce NSTEMI nedeniyle yatırıldığını, yatışından beri karın cildinden kan sulandırıcı iğne yapıldığını anlatır. Son iki gündür sağ baldırında gerginlik ve yürürken artan ağrı fark etmiş, sabah çorabının sağ bacağında belirgin iz bıraktığını söylemiştir. Daha önce benzer bacak şişliği yaşamamıştır. Göğüs ağrısı tekrarlamamış, kanlı balgam veya bayılma tariflememiştir. Burun kanaması, melena veya idrarda kan fark etmemiştir. Hemşirenin trombositlerinin hızla düştüğünü söylemesi üzerine hematoloji görüşü istenmiştir."
    },
    "vitals": {
      "TA": "128/76 mmHg",
      "Nabız": "92/dk",
      "Solunum": "18/dk",
      "SpO2": "%96, oda havasında",
      "Ateş": "36.8 °C",
      "Perfüzyon": "Kapiller dolum 2 sn; sağ bacakta lokal ısı artışı ve ödem mevcut"
    },
    "exam": [
      "Genel durumu iyi, bilinci açık ve hemodinamik olarak stabildir.",
      "Sağ baldır çevresi sola göre 3 cm daha geniştir ve derin palpasyonla hassastır.",
      "Peteşi, yaygın purpura veya mukozal aktif kanama izlenmez.",
      "Akciğer oskültasyonunda belirgin ral veya wheezing yoktur.",
      "Kalp ritmi düzenlidir; yeni üfürüm duyulmaz."
    ],
    "investigations": [
      {
        "id": "v313-new-754-heparin-sonrasi-bacak-agrisi-ve-trombosit-dususu-tetkik-1",
        "label": "Trombosit trendi ve tam kan sayımı",
        "title": "Trombosit trendi ve tam kan sayımı",
        "orderLabel": "Trombosit trendi ve tam kan sayımı",
        "type": "laboratory",
        "priority": "essential",
        "subtype": "Trombosit trendi ve tam kan sayımı",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Trombosit sayısındaki belirgin göreceli düşüş, zamanlama ve yeni trombozla birlikte değerlendirilir.",
        "clinicalMeaning": "Trombosit sayısındaki belirgin göreceli düşüş, zamanlama ve yeni trombozla birlikte değerlendirilir.",
        "result": {
          "title": "Trombosit trendi ve tam kan sayımı",
          "summary": "Trombosit sayısındaki belirgin göreceli düşüş, zamanlama ve yeni trombozla birlikte değerlendirilir.",
          "interpretation": "Trombosit sayısındaki belirgin göreceli düşüş, zamanlama ve yeni trombozla birlikte değerlendirilir.",
          "values": [
            [
              "Yatış trombositi",
              "242.000/µL",
              "150.000-400.000/µL",
              "Başlangıç normal"
            ],
            [
              "7. gün trombositi",
              "88.000/µL",
              "150.000-400.000/µL",
              "%50’den fazla düşüş"
            ],
            [
              "Hemoglobin",
              "13.1 g/dL",
              "13.5-17.5 g/dL",
              "Belirgin kanama lehine değil"
            ],
            [
              "Lökosit",
              "9.800/µL",
              "4.000-10.000/µL",
              "Normal sınıra yakın"
            ]
          ],
          "rows": [
            [
              "Yatış trombositi",
              "242.000/µL",
              "150.000-400.000/µL",
              "Başlangıç normal"
            ],
            [
              "7. gün trombositi",
              "88.000/µL",
              "150.000-400.000/µL",
              "%50’den fazla düşüş"
            ],
            [
              "Hemoglobin",
              "13.1 g/dL",
              "13.5-17.5 g/dL",
              "Belirgin kanama lehine değil"
            ],
            [
              "Lökosit",
              "9.800/µL",
              "4.000-10.000/µL",
              "Normal sınıra yakın"
            ]
          ]
        }
      },
      {
        "id": "v313-new-754-heparin-sonrasi-bacak-agrisi-ve-trombosit-dususu-tetkik-2",
        "label": "Koagülasyon ve hemoliz dışlama",
        "title": "Koagülasyon ve hemoliz dışlama",
        "orderLabel": "Koagülasyon ve hemoliz dışlama",
        "type": "laboratory",
        "priority": "essential",
        "subtype": "Koagülasyon ve hemoliz dışlama",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Koagülasyon paneli yaygın tüketim koagülopatisinden çok trombotik klinik bağlamı destekler.",
        "clinicalMeaning": "Koagülasyon paneli yaygın tüketim koagülopatisinden çok trombotik klinik bağlamı destekler.",
        "result": {
          "title": "Koagülasyon ve hemoliz dışlama",
          "summary": "Koagülasyon paneli yaygın tüketim koagülopatisinden çok trombotik klinik bağlamı destekler.",
          "interpretation": "Koagülasyon paneli yaygın tüketim koagülopatisinden çok trombotik klinik bağlamı destekler.",
          "values": [
            [
              "PT/INR",
              "1.1",
              "0.8-1.2",
              "Normal"
            ],
            [
              "aPTT",
              "44 sn",
              "25-35 sn",
              "Heparin etkisiyle uzamış"
            ],
            [
              "Fibrinojen",
              "380 mg/dL",
              "200-400 mg/dL",
              "Korunmuş"
            ],
            [
              "D-dimer",
              "3.4 mg/L FEU",
              "<0.5 mg/L FEU",
              "Trombozla uyumlu artış"
            ]
          ],
          "rows": [
            [
              "PT/INR",
              "1.1",
              "0.8-1.2",
              "Normal"
            ],
            [
              "aPTT",
              "44 sn",
              "25-35 sn",
              "Heparin etkisiyle uzamış"
            ],
            [
              "Fibrinojen",
              "380 mg/dL",
              "200-400 mg/dL",
              "Korunmuş"
            ],
            [
              "D-dimer",
              "3.4 mg/L FEU",
              "<0.5 mg/L FEU",
              "Trombozla uyumlu artış"
            ]
          ]
        }
      },
      {
        "id": "v313-new-754-heparin-sonrasi-bacak-agrisi-ve-trombosit-dususu-tetkik-3",
        "label": "Venöz Doppler ultrason",
        "title": "Venöz Doppler ultrason",
        "orderLabel": "Venöz Doppler ultrason",
        "type": "imaging",
        "priority": "essential",
        "subtype": "Venöz Doppler ultrason",
        "category": "imaging",
        "testTypeCategory": "imaging",
        "summary": "Yeni proksimal ven trombozu trombositopeni ile birlikte HIT olasılığını güçlendirir.",
        "clinicalMeaning": "Yeni proksimal ven trombozu trombositopeni ile birlikte HIT olasılığını güçlendirir.",
        "result": {
          "title": "Venöz Doppler ultrason",
          "summary": "Yeni proksimal ven trombozu trombositopeni ile birlikte HIT olasılığını güçlendirir.",
          "interpretation": "Yeni proksimal ven trombozu trombositopeni ile birlikte HIT olasılığını güçlendirir.",
          "values": [
            [
              "Sağ femoropopliteal ven",
              "Kompresyonla kollabe olmuyor",
              "Kollabe olmalı",
              "Proksimal DVT"
            ],
            [
              "Sol alt ekstremite venleri",
              "Açık",
              "Açık",
              "Tek taraflı tutulum"
            ],
            [
              "Yüzeyel venler",
              "Belirgin tromboflebit yok",
              "Yok",
              "Derin sistem ön planda"
            ]
          ],
          "rows": [
            [
              "Sağ femoropopliteal ven",
              "Kompresyonla kollabe olmuyor",
              "Kollabe olmalı",
              "Proksimal DVT"
            ],
            [
              "Sol alt ekstremite venleri",
              "Açık",
              "Açık",
              "Tek taraflı tutulum"
            ],
            [
              "Yüzeyel venler",
              "Belirgin tromboflebit yok",
              "Yok",
              "Derin sistem ön planda"
            ]
          ]
        }
      },
      {
        "id": "v313-new-754-heparin-sonrasi-bacak-agrisi-ve-trombosit-dususu-tetkik-4",
        "label": "Klinik olasılık ve immün test",
        "title": "Klinik olasılık ve immün test",
        "orderLabel": "Klinik olasılık ve immün test",
        "type": "laboratory",
        "priority": "essential",
        "subtype": "Klinik olasılık ve immün test",
        "category": "laboratory",
        "testTypeCategory": "laboratory",
        "summary": "Yüksek klinik olasılıkta tedavi fonksiyonel test beklenmeden güvenli şekilde başlatılır.",
        "clinicalMeaning": "Yüksek klinik olasılıkta tedavi fonksiyonel test beklenmeden güvenli şekilde başlatılır.",
        "result": {
          "title": "Klinik olasılık ve immün test",
          "summary": "Yüksek klinik olasılıkta tedavi fonksiyonel test beklenmeden güvenli şekilde başlatılır.",
          "interpretation": "Yüksek klinik olasılıkta tedavi fonksiyonel test beklenmeden güvenli şekilde başlatılır.",
          "values": [
            [
              "4T skoru",
              "7/8",
              "0-3 düşük, 4-5 orta, 6-8 yüksek",
              "Yüksek olasılık"
            ],
            [
              "PF4-heparin ELISA",
              "Pozitif, OD 1.9",
              "Negatif beklenir",
              "İmmün destek"
            ],
            [
              "Serotonin salınım testi",
              "Beklemede",
              "Negatif beklenir",
              "Fonksiyonel doğrulama bekleniyor"
            ]
          ],
          "rows": [
            [
              "4T skoru",
              "7/8",
              "0-3 düşük, 4-5 orta, 6-8 yüksek",
              "Yüksek olasılık"
            ],
            [
              "PF4-heparin ELISA",
              "Pozitif, OD 1.9",
              "Negatif beklenir",
              "İmmün destek"
            ],
            [
              "Serotonin salınım testi",
              "Beklemede",
              "Negatif beklenir",
              "Fonksiyonel doğrulama bekleniyor"
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
    "question": "Bu hastada acil yönetimde en uygun basamak aşağıdakilerden hangisidir?",
    "questionType": "Acil yönetim",
    "answerTarget": "HIT şüphesinde ilk güvenli tedavi basamağı",
    "diagnosis": {
      "correct": "Tüm heparin ürünlerini kesip heparin dışı terapötik antikoagülasyon başlamak",
      "options": [
        "Düşük molekül ağırlıklı heparini aynı dozda sürdürüp trombositleri günlük izlemek",
        "Heparini kesip trombosit süspansiyonu vererek antikoagülasyonu tamamen durdurmak",
        "Tüm heparin ürünlerini kesip heparin dışı terapötik antikoagülasyon başlamak",
        "Warfarini hemen tek başına başlatıp INR terapötik olana kadar izlemek",
        "Trombositopeni düzelene kadar yalnız mekanik kompresyonla takip etmek"
      ],
      "question": "Bu hastada acil yönetimde en uygun basamak aşağıdakilerden hangisidir?",
      "explanation": "Heparin maruziyetinden yaklaşık 7 gün sonra trombositlerde %50’den fazla düşüş, yeni proksimal DVT ve yüksek 4T skoru HIT için güçlü bir klinik tablo oluşturur. HIT’te trombositopeniye rağmen ana risk kanama değil trombozdur; bu nedenle tüm heparin ürünleri kesilmeli ve heparin dışı terapötik antikoagülasyon başlanmalıdır.",
      "pearls": [
        "HIT genellikle heparin maruziyetinden 5-10 gün sonra belirir.",
        "Trombosit düşüşü çoğu zaman %50’den fazladır; sayı mutlaka 20.000/µL altına inmek zorunda değildir.",
        "Yeni tromboz HIT olasılığını ve aciliyeti artırır.",
        "Yüksek klinik olasılıkta tedavi PF4 sonucunu beklemeden başlatılır."
      ],
      "optionFeedback": {
        "Düşük molekül ağırlıklı heparini aynı dozda sürdürüp trombositleri günlük izlemek": "Bu yaklaşım hatalıdır. Düşük molekül ağırlıklı heparin de PF4-heparin kompleksleri üzerinden aynı immün mekanizmayı sürdürebilir ve tromboz riskini artırabilir. Vaka zamanlaması, trombosit düşüş oranı ve yeni proksimal ven trombozu HIT için yüksek olasılık oluşturur; bu durumda heparini sürdürmek hasta güvenliği açısından en riskli hatalardan biridir. Yalnızca günlük trombosit izlemek yeterli değildir, çünkü HIT kanama hastalığından çok trombozla seyreden bir immün prokoagülan sendromdur.",
        "Heparini kesip trombosit süspansiyonu vererek antikoagülasyonu tamamen durdurmak": "Heparini kesmek doğrudur, ancak trombosit süspansiyonu verip antikoagülasyonu tamamen durdurmak doğru değildir. HIT’te trombosit sayısı düşük görünse de temel klinik tehlike kanama değil yeni venöz veya arteriyel trombozdur. Aktif kanama yoksa rutin trombosit transfüzyonu trombotik süreci artırabilir. Yeni DVT gelişmiş bu hastada heparin dışı terapötik antikoagülasyon başlanmadığında tromboz ilerleyebilir veya pulmoner emboli gelişebilir.",
        "Tüm heparin ürünlerini kesip heparin dışı terapötik antikoagülasyon başlamak": "Bu seçenek doğrudur. Heparin maruziyetinden 5-10 gün sonra trombosit sayısında %50’den fazla düşüş ve eş zamanlı yeni tromboz gelişmesi HIT için çok güçlü bir klinik örüntüdür. İlk yapılacak güvenli yönetim tüm heparin ürünlerini kesmek ve argatroban, bivalirudin, fondaparinuks veya uygun seçilmiş direkt oral antikoagülan gibi heparin dışı terapötik antikoagülasyon başlatmaktır. PF4-heparin antikor testi tanıyı destekler; fakat yüksek klinik olasılıkta tedavi laboratuvar sonucunu beklemeden başlatılır. Bu yaklaşım hem immün tetikleyiciyi kaldırır hem de devam eden trombin üretimi ve tromboz riskini kontrol altına alır.",
        "Warfarini hemen tek başına başlatıp INR terapötik olana kadar izlemek": "Warfarini hemen tek başına başlatmak HIT’te klasik bir tuzaktır. Akut HIT döneminde protein C düzeyi hızla düşebileceği için warfarin monoterapisi cilt nekrozu ve venöz ekstremite gangreni riskini artırabilir. Warfarin gerekiyorsa trombositler toparlandıktan ve hasta heparin dışı antikoagülanla güvenli şekilde köprülendikten sonra başlanmalıdır. Bu vakada ilk adım warfarin değil, heparini kesip heparin dışı hızlı etkili antikoagülanla tromboz riskini kontrol etmektir.",
        "Trombositopeni düzelene kadar yalnız mekanik kompresyonla takip etmek": "Mekanik kompresyon tek başına yeterli değildir. Hastada yalnız trombositopeni yok; ultrasonla doğrulanmış proksimal DVT vardır ve HIT tromboz riskinin çok yüksek olduğu bir sendromdur. Antikoagülasyonu trombosit sayısı normale dönene kadar ertelemek yeni tromboz, emboli ve damar tıkanıklığı riskini artırır. Mekanik önlemler destekleyici olabilir, fakat terapötik heparin dışı antikoagülasyonun yerini tutmaz."
      }
    },
    "shuffleOptions": false,
    "coreKnowledge": "HIT, PF4-heparin komplekslerine karşı gelişen antikorların trombosit aktivasyonu yapmasıyla trombin üretimini artıran immün prokoagülan bir sendromdur.",
    "examPearl": "Heparin + 5-10. gün + %50 trombosit düşüşü + yeni tromboz = HIT düşün, heparini kes ve heparin dışı antikoagülan başla.",
    "whyCorrect": "Doğru seçenek hem tetikleyici heparini kaldırır hem de yüksek tromboz riskini heparin dışı antikoagülasyonla yönetir.",
    "optionComparison": "Yanlış seçenekler heparini sürdürmeye, kanama hastalığı gibi davranmaya, erken warfarine veya antikoagülasyonu geciktirmeye dayanır.",
    "evidenceChain": [
      "7 günlük heparin maruziyeti → immün HIT zamanlamasına uygun.",
      "Trombosit 242.000’den 88.000/µL’ye düşmüş → %50’den fazla göreceli düşüş.",
      "Yeni femoropopliteal DVT → tromboz ağırlıklı klinik risk.",
      "PT/INR ve fibrinojen korunmuş → DIC olasılığını azaltır.",
      "4T skoru 7/8 ve PF4 pozitifliği → yüksek klinik-immün destek."
    ],
    "whyWrong": "Yanlış seçenekler tromboz riskini yeterince tedavi etmez veya HIT döneminde ek komplikasyon yaratabilir.",
    "preserveInvestigationOrder": true,
    "aiMeta": {
      "version": "v313",
      "source": "manual-render-safe-internal-medicine-expansion",
      "antiRepeatChecked": true,
      "schemaReference": "V312 cases.js rawCases schema with diagnosis.optionFeedback object mapping"
    },
    "findings": [],
    "images": []
  }
];
