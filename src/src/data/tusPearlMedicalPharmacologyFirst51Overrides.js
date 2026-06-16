// Text overrides for the first 51 frontend-rendered Tıbbi Farmakoloji pearl cards.
// Only exact card IDs are overridden; schema, order, branch metadata and card IDs remain unchanged.

export const TUS_PEARL_MEDICAL_PHARMACOLOGY_FIRST51_TEXT_OVERRIDES = Object.freeze({
  "tus-pearl-medical-pharmacology-048-spot": {
    "front": "Organofosfat zehirlenmesinde atropin ve pralidoksim tedavide hangi iki farklı hedefi tamamlar?",
    "keywords": [
      "organofosfat",
      "asetilkolinesteraz",
      "atropin",
      "pralidoksim"
    ],
    "back": "Atropin muskarinik reseptörleri bloke eder; pralidoksim fosforillenmiş asetilkolinesterazı yeniden aktive eder.",
    "answer": "Atropin muskarinik bulguları antagonize eder, pralidoksim asetilkolinesterazı reaktive eder.",
    "explanation": "Organofosfatlar asetilkolinesterazı inhibe ederek sinapsta asetilkolin birikimine yol açar. Atropin bronkore, bronkospazm, bradikardi ve sekresyon artışı gibi muskarinik etkileri düzeltir; pralidoksim ise yaşlanma gelişmeden enzimi reaktive ederek nikotinik kas güçsüzlüğü ve paraliziye de katkı sağlar.",
    "tusTip": "Miyozis, salivasyon, bronkore ve bradikardi organofosfatı düşündürür; atropin semptomu, pralidoksim hedef enzimi düzeltir.",
    "differentialNote": "Atropin nikotinik nöromüsküler paraliziyi tek başına düzeltmez; bu ayrım pralidoksimi sınavda kritik yapar."
  },
  "tus-pearl-medical-pharmacology-048-extra": {
    "front": "Organofosfatların kolinerjik kriz oluşturmasının temel enzim hedefi hangisidir?",
    "keywords": [
      "asetilkolinesteraz",
      "kolinerjik kriz",
      "DUMBBELSS",
      "nikotinik bulgular"
    ],
    "back": "Asetilkolinesteraz.",
    "answer": "Asetilkolinesteraz inhibisyonu.",
    "explanation": "Asetilkolinesterazın inhibisyonu asetilkolinin sinaptik aralıkta yıkılamamasına ve muskarinik, nikotinik, santral kolinerjik bulguların birlikte ortaya çıkmasına neden olur. Bu nedenle klinikte sekresyon artışı, bronkospazm, bradikardi, miyozis, fasikülasyon ve nöbet aynı toksidrom içinde görülebilir.",
    "tusTip": "Organofosfat sorusunda hedef enzim asetilkolinesterazdır; klinik tablo asetilkolin fazlalığıdır.",
    "differentialNote": "Karbamatlar da asetilkolinesterazı inhibe eder fakat bağlanma genellikle daha geri dönüşümlüdür; organofosfatta “aging” pralidoksim zamanlamasını önemli kılar."
  },
  "tus-pearl-medical-pharmacology-049-spot": {
    "front": "Parasetamol toksisitesinde N-asetilsistein hepatotoksisiteyi hangi mekanizmayla azaltır?",
    "keywords": [
      "parasetamol",
      "N-asetilsistein",
      "glutatyon",
      "NAPQI"
    ],
    "back": "Glutatyon depolarını yenileyerek NAPQI detoksifikasyonunu artırır.",
    "answer": "N-asetilsistein.",
    "explanation": "Yüksek doz parasetamolde sülfat ve glukuronidasyon yolları doyunca CYP aracılı NAPQI oluşumu artar. N-asetilsistein glutatyon prekürsörü sağlayarak NAPQI’nin hepatosit proteinlerine bağlanmasını azaltır ve karaciğer nekrozunu önlemeye yardım eder.",
    "tusTip": "Parasetamol toksisitesi = NAPQI + glutatyon tüketimi + N-asetilsistein ilişkisi yüksek verimlidir.",
    "differentialNote": "Opioid toksisitesinde antidot naloksondur; parasetamolde bilinç baskılanması olmasa da geç hepatotoksisite riski belirleyicidir."
  },
  "tus-pearl-medical-pharmacology-049-extra": {
    "front": "Parasetamol aşırı dozunda glutatyon tükenince hepatotoksisite yapan reaktif metabolit hangisidir?",
    "keywords": [
      "NAPQI",
      "CYP2E1",
      "glutatyon",
      "hepatoselüler nekroz"
    ],
    "back": "NAPQI.",
    "answer": "N-asetil-p-benzokinon imin (NAPQI).",
    "explanation": "NAPQI normal dozlarda glutatyonla hızla konjuge edilerek zararsızlaştırılır. Aşırı dozda glutatyon depoları tükenince NAPQI hepatosit makromoleküllerine bağlanır ve özellikle santralobüler karaciğer nekrozuna yol açar.",
    "tusTip": "NAPQI toksiktir; N-asetilsistein glutatyonu yenileyerek bu metaboliti nötralize eder.",
    "differentialNote": "Parasetamol doğrudan gastrik kanama yapan klasik NSAİİ gibi düşünülmez; toksisite çekirdeği hepatik metabolit birikimidir."
  },
  "tus-pearl-medical-pharmacology-050-spot": {
    "front": "Beta bloker zehirlenmesinde glukagonun bradikardi ve hipotansiyonu düzeltmesi hangi yol üzerinden açıklanır?",
    "keywords": [
      "beta bloker",
      "glukagon",
      "cAMP",
      "bradikardi"
    ],
    "back": "Glukagon reseptörü üzerinden Gs-adenilat siklaz-cAMP yolunu beta reseptörden bağımsız aktive eder.",
    "answer": "Glukagon.",
    "explanation": "Beta bloker toksisitesinde beta-1 reseptör aracılı cAMP üretimi baskılanır ve miyokard kontraktilitesi ile kalp hızı azalır. Glukagon kendi Gs-bağlı reseptörüyle adenilat siklazı uyararak cAMP’yi beta reseptörden bağımsız artırır; bu nedenle dirençli bradikardi ve hipotansiyonda yararlıdır.",
    "tusTip": "Beta bloker toksisitesinde “cAMP’yi beta reseptörü bypass ederek artıran antidotal ajan” glukagondur.",
    "differentialNote": "Kalsiyum kanal bloker toksisitesinde yüksek doz insülin-euglisemi desteği daha öne çıkar; iki zehirlenme bradikardi-hipotansiyonla karışabilir."
  },
  "tus-pearl-medical-pharmacology-050-extra": {
    "front": "Beta blokerler diyabetli hastada hipogliseminin hangi adrenerjik uyarı bulgusunu maskeleyebilir?",
    "keywords": [
      "beta bloker",
      "hipoglisemi",
      "taşikardi",
      "diyabet"
    ],
    "back": "Taşikardi ve tremor gibi sempatik uyarı bulgularını maskeleyebilir.",
    "answer": "Hipoglisemiye bağlı taşikardi.",
    "explanation": "Hipoglisemide adrenerjik aktivasyon çarpıntı, taşikardi ve tremor gibi erken uyarı bulguları oluşturur. Özellikle nonselektif beta blokerler bu belirtileri azaltarak hastanın hipoglisemiyi fark etmesini geciktirebilir.",
    "tusTip": "Diyabet + beta bloker sorusunda hipoglisemi farkındalığının azalması ve taşikardinin maskelenmesi akla gelmelidir.",
    "differentialNote": "Terleme daha çok kolinerjik sempatik liflerle ilişkili olduğundan beta blokajıyla taşikardi kadar belirgin maskelenmeyebilir."
  },
  "tus-pearl-medical-pharmacology-051-spot": {
    "front": "ACE inhibitörlerinde kuru öksürük ve anjiyoödem hangi mediatörün yıkımının azalmasıyla ilişkilidir?",
    "keywords": [
      "ACE inhibitörü",
      "bradikinin",
      "kuru öksürük",
      "anjiyoödem"
    ],
    "back": "Bradikinin birikimi.",
    "answer": "Bradikinin artışı.",
    "explanation": "ACE, anjiyotensin I’i anjiyotensin II’ye çevirirken bradikinin yıkımına da katılır. ACE inhibisyonu bradikinin ve substance P birikimine yol açarak kuru öksürük ve nadiren anjiyoödem oluşturabilir.",
    "tusTip": "ACE inhibitörü + kuru öksürük/anjiyoödem = bradikinin birikimi.",
    "differentialNote": "ARB’ler anjiyotensin II reseptörünü bloke eder ama bradikinin yıkımını belirgin azaltmadığı için öksürük daha az beklenir."
  },
  "tus-pearl-medical-pharmacology-051-extra": {
    "front": "ACE inhibitörleri gebelikte neden kontrendikedir?",
    "keywords": [
      "ACE inhibitörü",
      "gebelik",
      "fetal böbrek",
      "oligohidramnios"
    ],
    "back": "Fetal renal gelişimi bozarak oligohidramnios ve fetal toksisiteye yol açabilir.",
    "answer": "Gebelikte kontrendikedir; fetal renal hasar ve oligohidramnios riski taşır.",
    "explanation": "Renin-anjiyotensin sistemi fetal böbrek gelişimi ve amniyotik sıvı dengesi için önemlidir. ACE inhibitörleri gebelikte fetal renal disgenezi, oligohidramnios, kafatası kemikleşme kusurları ve neonatal böbrek yetmezliği riski nedeniyle kullanılmaz.",
    "tusTip": "Gebelikte ACE inhibitörü/ARB verilmez; klasik toksisite fetal böbrek hasarı ve oligohidramniostur.",
    "differentialNote": "Hipertansif gebede metildopa, labetalol veya nifedipin gibi seçenekler düşünülür; ACE inhibitörü klasik kontrendikedir."
  },
  "tus-pearl-medical-pharmacology-052-spot": {
    "front": "Heparinin antikoagülan etkisi aşırı kanama oluşturduğunda hangi ajanla geri çevrilir?",
    "keywords": [
      "heparin",
      "protamin",
      "antitrombin",
      "kanama"
    ],
    "back": "Protamin sülfat.",
    "answer": "Protamin sülfat.",
    "explanation": "Heparin negatif yüklü bir moleküldür ve antitrombin üzerinden trombin ile faktör Xa inhibisyonunu artırır. Pozitif yüklü protamin sülfat heparine bağlanarak kompleks oluşturur ve özellikle unfractionated heparinin etkisini hızlı biçimde nötralize eder.",
    "tusTip": "Heparin antidotu protamindir; warfarinde K vitamini/PCC düşünülür.",
    "differentialNote": "Protamin düşük molekül ağırlıklı heparini tam değil kısmen geri çevirebilir; unfractionated heparinde etkisi daha belirgindir."
  },
  "tus-pearl-medical-pharmacology-052-extra": {
    "front": "Unfractionated heparin tedavisinde antikoagülan etkiyi izlemek için klasik test hangisidir?",
    "keywords": [
      "unfractionated heparin",
      "aPTT",
      "antitrombin",
      "faktör Xa"
    ],
    "back": "Aktive parsiyel tromboplastin zamanı (aPTT).",
    "answer": "aPTT.",
    "explanation": "Unfractionated heparin antitrombin aracılığıyla özellikle trombin ve faktör Xa aktivitesini azaltır. Klinik izlemde intrinsik ve ortak yol duyarlılığı nedeniyle klasik olarak aPTT kullanılır.",
    "tusTip": "UFH = aPTT; warfarin = PT/INR şeklinde ayırmak TUS için temeldir.",
    "differentialNote": "Düşük molekül ağırlıklı heparin rutin aPTT takibi gerektirmez; özel durumlarda anti-Xa düzeyi kullanılabilir."
  },
  "tus-pearl-medical-pharmacology-053-spot": {
    "front": "Warfarin hangi enzimi inhibe ederek K vitaminine bağımlı pıhtılaşma faktörlerinin aktivasyonunu azaltır?",
    "keywords": [
      "warfarin",
      "vitamin K epoksit redüktaz",
      "faktör II VII IX X",
      "INR"
    ],
    "back": "Vitamin K epoksit redüktaz.",
    "answer": "Vitamin K epoksit redüktaz inhibisyonu.",
    "explanation": "Warfarin vitamin K epoksit redüktazı inhibe ederek vitamin K’nin indirgenmiş aktif formunun yenilenmesini azaltır. Böylece faktör II, VII, IX, X ile protein C ve S’nin gama-karboksilasyonu bozulur ve pıhtılaşma aktivitesi düşer.",
    "tusTip": "Warfarin sorusunda hedef enzim vitamin K epoksit redüktaz, izlem testi PT/INR’dir.",
    "differentialNote": "Heparin hazır antitrombini güçlendirir ve hızlı etkilidir; warfarin yeni faktör sentezini bozduğu için başlangıç etkisi gecikir."
  },
  "tus-pearl-medical-pharmacology-053-extra": {
    "front": "Warfarin tedavisinin etkinliği hangi koagülasyon testiyle izlenir?",
    "keywords": [
      "warfarin",
      "PT",
      "INR",
      "faktör VII"
    ],
    "back": "PT/INR.",
    "answer": "Protrombin zamanı / INR.",
    "explanation": "Warfarin K vitaminine bağımlı faktörleri azaltır; özellikle kısa yarı ömürlü faktör VII nedeniyle ekstrinsik yol erken etkilenir. Bu nedenle tedavi izlemi protrombin zamanı ve bunun standardize edilmiş karşılığı olan INR ile yapılır.",
    "tusTip": "Warfarin = PT/INR; heparin = aPTT ayrımı klasik sınav bilgisidir.",
    "differentialNote": "Warfarinin erken döneminde protein C azalması geçici hiperkoagülabilite yapabilir; yüksek riskli hastada heparin köprüsü bu yüzden önemlidir."
  },
  "tus-pearl-medical-pharmacology-054-spot": {
    "front": "Aminoglikozidlerde nefrotoksisite ve ototoksisite riski hangi farmakokinetik özelliğe bağlı olarak artar?",
    "keywords": [
      "aminoglikozid",
      "nefrotoksisite",
      "ototoksisite",
      "renal atılım"
    ],
    "back": "Renal atılım ve dokuda birikim nedeniyle böbrek yetmezliğinde toksisite riski artar.",
    "answer": "Nefrotoksisite ve ototoksisite.",
    "explanation": "Aminoglikozidler polar ilaçlardır, ağırlıklı olarak böbrekten atılır ve proksimal tübül ile iç kulakta birikebilir. Bu nedenle doz, böbrek fonksiyonuna göre ayarlanmalı; nefrotoksisite ve vestibüler/işitsel ototoksisite özellikle izlenmelidir.",
    "tusTip": "Aminoglikozid = 30S + bakterisidal + nefro/ototoksisite üçlüsü yüksek verimlidir.",
    "differentialNote": "Vankomisin de nefrotoksisite yapabilir; aminoglikozidde ototoksisite ve 30S yanlış okuma etkisi daha ayırt ettiricidir."
  },
  "tus-pearl-medical-pharmacology-054-extra": {
    "front": "Aminoglikozidlerin bakterisidal etkisi hangi ribozomal alt birime bağlanma ve translasyon hatasıyla ilişkilidir?",
    "keywords": [
      "aminoglikozid",
      "30S",
      "mRNA yanlış okuma",
      "bakterisidal"
    ],
    "back": "30S ribozomal alt birime bağlanıp mRNA’nın yanlış okunmasına neden olur.",
    "answer": "30S ribozomal alt birim.",
    "explanation": "Aminoglikozidler 30S alt birimine bağlanarak başlatma kompleksini bozar ve mRNA’nın yanlış okunmasına yol açar. Hatalı proteinler bakteri membranını zedeler; bu yüzden protein sentez inhibitörleri içinde bakterisidal özellikleriyle ayrılırlar.",
    "tusTip": "Aminoglikozidler oksijen bağımlı alındığı için anaeroblara etkisizdir.",
    "differentialNote": "Tetrasiklinler de 30S’i hedefler fakat aminoasil-tRNA girişini engeller ve genellikle bakteriyostatiktir."
  },
  "tus-pearl-medical-pharmacology-055-spot": {
    "front": "Vankomisinin hızlı infüzyonu sırasında kızarma, kaşıntı ve hipotansiyon gelişmesi hangi reaksiyonu düşündürür?",
    "keywords": [
      "vankomisin",
      "red man",
      "histamin",
      "infüzyon reaksiyonu"
    ],
    "back": "Kızarma (red man) sendromu.",
    "answer": "Kızarma (red man) sendromu.",
    "explanation": "Vankomisin hızlı verildiğinde mast hücrelerinden histamin salınımı artabilir ve yüzde-boyunda kızarma, kaşıntı, hipotansiyon gelişebilir. Bu tablo gerçek IgE aracılı alerjiden çok infüzyon hızına bağlı reaksiyon olarak değerlendirilir.",
    "tusTip": "Vankomisin + hızlı infüzyon + kızarma/kaşıntı = red man sendromu.",
    "differentialNote": "Anafilakside bronkospazm, laringeal ödem ve sistemik alerjik bulgular daha belirgindir; red man sendromunda infüzyonu yavaşlatmak ve antihistaminik yararlı olabilir."
  },
  "tus-pearl-medical-pharmacology-055-extra": {
    "front": "Vankomisin hücre duvarı sentezini hangi peptid ucuna bağlanarak inhibe eder?",
    "keywords": [
      "vankomisin",
      "D-Ala-D-Ala",
      "peptidoglikan",
      "hücre duvarı"
    ],
    "back": "D-Ala-D-Ala ucuna bağlanır.",
    "answer": "D-Ala-D-Ala.",
    "explanation": "Vankomisin peptidoglikan prekürsörlerindeki D-Ala-D-Ala ucuna bağlanır ve transglikozilasyon ile transpeptidasyonu engeller. Bu etki özellikle Gram pozitif bakterilerde hücre duvarı sentezini bozar.",
    "tusTip": "Vankomisin hedefi D-Ala-D-Ala; dirençte D-Ala-D-Lac değişimi klasik mekanizmadır.",
    "differentialNote": "Beta-laktamlar PBP/transpeptidaz enzimlerini inhibe eder; vankomisin doğrudan peptid ucuna bağlanır."
  },
  "tus-pearl-medical-pharmacology-056-spot": {
    "front": "Eritromisin ve klaritromisinin çok sayıda ilaç etkileşimi yapması hangi CYP enzimi inhibisyonuyla açıklanır?",
    "keywords": [
      "makrolid",
      "CYP3A4",
      "ilaç etkileşimi",
      "QT uzaması"
    ],
    "back": "CYP3A4 inhibisyonu.",
    "answer": "CYP3A4.",
    "explanation": "Eritromisin ve klaritromisin CYP3A4 inhibisyonu yaparak bu enzimle metabolize edilen ilaçların düzeyini artırabilir. Bu etkileşim statin toksisitesi, bazı antiaritmiklerle QT uzaması veya diğer dar terapötik indeksli ilaçlarda toksisite riskini artırabilir.",
    "tusTip": "Makrolidlerde CYP3A4 inhibisyonu ve QT uzaması birlikte akılda tutulmalıdır.",
    "differentialNote": "Azitromisin CYP3A4 inhibisyonu açısından eritromisin/klaritromisine göre daha zayıftır."
  },
  "tus-pearl-medical-pharmacology-056-extra": {
    "front": "Makrolidler bakteriyel protein sentezini ribozomun hangi alt biriminde translokasyonu engelleyerek inhibe eder?",
    "keywords": [
      "makrolid",
      "50S",
      "translokasyon",
      "protein sentezi"
    ],
    "back": "50S ribozomal alt birim.",
    "answer": "50S ribozomal alt birim.",
    "explanation": "Makrolidler 50S ribozomal alt birime bağlanarak peptidil-tRNA translokasyonunu engeller. Böylece protein sentezi durur; klinikte atipik pnömoni etkenleri ve bazı Gram pozitif enfeksiyonlarda kullanımları önemlidir.",
    "tusTip": "Makrolid = 50S + translokasyon inhibisyonu + QT/CYP etkileşimi.",
    "differentialNote": "Aminoglikozid ve tetrasiklinler 30S’i hedefler; makrolidler 50S üzerinden ayrılır."
  },
  "tus-pearl-medical-pharmacology-057-spot": {
    "front": "Statin kullanan hastada kas ağrısı, güçsüzlük ve CK artışı hangi ciddi yan etkiyi düşündürür?",
    "keywords": [
      "statin",
      "CK",
      "miyopati",
      "rabdomiyoliz"
    ],
    "back": "Statin ilişkili miyopati veya rabdomiyoliz.",
    "answer": "Miyopati/rabdomiyoliz.",
    "explanation": "Statinler HMG-CoA redüktazı inhibe ederek LDL düşürür; ancak kas toksisitesi nadiren ağır miyopati ve rabdomiyolize ilerleyebilir. Risk yüksek doz, ilaç etkileşimi, ileri yaş ve CYP3A4 inhibitörleriyle artabilir.",
    "tusTip": "Statin + kas ağrısı + CK yüksekliği = miyopati/rabdomiyoliz.",
    "differentialNote": "Fibratlar da miyopati yapabilir; statin-fibrat kombinasyonu bu riski artırır."
  },
  "tus-pearl-medical-pharmacology-057-extra": {
    "front": "Statinlerin LDL düşürücü etkisi hangi kolesterol sentez enziminin inhibisyonuyla başlar?",
    "keywords": [
      "statin",
      "HMG-CoA redüktaz",
      "LDL reseptörü",
      "kolesterol sentezi"
    ],
    "back": "HMG-CoA redüktaz inhibisyonu.",
    "answer": "HMG-CoA redüktaz.",
    "explanation": "Statinler karaciğerde HMG-CoA redüktazı inhibe ederek kolesterol sentezini azaltır. Hepatosit içi kolesterol azalınca LDL reseptör ekspresyonu artar ve plazmadan LDL temizlenmesi güçlenir.",
    "tusTip": "Statinlerin temel hedefi HMG-CoA redüktazdır; LDL düşüşü reseptör artışıyla belirginleşir.",
    "differentialNote": "Ezetimib bağırsaktan kolesterol emilimini azaltır; PCSK9 inhibitörleri LDL reseptör yıkımını azaltır."
  },
  "tus-pearl-medical-pharmacology-058-spot": {
    "front": "Klozapin tedavisinde hangi ciddi hematolojik yan etki nedeniyle düzenli kan sayımı gerekir?",
    "keywords": [
      "klozapin",
      "agranülositoz",
      "nötropeni",
      "kan sayımı"
    ],
    "back": "Agranülositoz.",
    "answer": "Agranülositoz.",
    "explanation": "Klozapin tedaviye dirençli şizofrenide etkili bir atipik antipsikotiktir; ancak ağır nötropeni/agranülositoz riski nedeniyle lökosit ve nötrofil takibi gerektirir. Ateş veya boğaz ağrısı gelişmesi enfeksiyon açısından uyarıcıdır.",
    "tusTip": "Klozapin = agranülositoz takibi; ayrıca nöbet, miyokardit ve metabolik yan etkiler de akılda tutulur.",
    "differentialNote": "Tipik antipsikotiklerde ekstrapiramidal yan etkiler daha ön plandayken klozapinde hematolojik takip ayırt ettiricidir."
  },
  "tus-pearl-medical-pharmacology-058-extra": {
    "front": "Klozapin başlanmış hastada göğüs ağrısı, dispne ve troponin yüksekliği hangi ciddi kardiyak yan etkiyi düşündürür?",
    "keywords": [
      "klozapin",
      "miyokardit",
      "troponin",
      "göğüs ağrısı"
    ],
    "back": "Miyokardit.",
    "answer": "Miyokardit.",
    "explanation": "Klozapin nadiren fakat ciddi biçimde miyokardit ve kardiyomiyopatiyle ilişkilendirilebilir. Tedavinin erken döneminde göğüs ağrısı, dispne, taşikardi veya troponin/CRP yüksekliği gelişmesi bu toksisite açısından değerlendirilmelidir.",
    "tusTip": "Klozapinde agranülositoz kadar miyokardit de ciddi ve ayırt ettirici toksisitedir.",
    "differentialNote": "Haloperidol daha çok akut distoni, parkinsonizm ve QT uzamasıyla sorulur; klozapin için kan sayımı ve miyokardit izlemi öne çıkar."
  },
  "tus-pearl-medical-pharmacology-059-spot": {
    "front": "Lityum kullanan hastada dehidratasyon veya sodyum azalması toksisite riskini neden artırır?",
    "keywords": [
      "lityum",
      "dehidratasyon",
      "sodyum azalması",
      "renal geri emilim"
    ],
    "back": "Proksimal tübülde sodyumla birlikte lityum geri emilimi artar.",
    "answer": "Dehidratasyon veya sodyum azalması lityum geri emilimini artırır.",
    "explanation": "Lityum böbrekten atılır ve proksimal tübülde sodyumla benzer şekilde geri emilir. Hacim kaybı, hiponatremi veya diüretik kullanımı böbreğin sodyum geri emilimini artırırken lityum geri emilimini de artırır ve tremor, ataksi, konfüzyon gibi toksisite bulgularını kolaylaştırır.",
    "tusTip": "Lityum dar terapötik aralıklı bir ilaçtır; dehidratasyon ve sodyum kaybı toksisiteyi artırır.",
    "differentialNote": "Tiyazidler lityum düzeyini artırabilir; bu etkileşim sınavlarda sık sorulur."
  },
  "tus-pearl-medical-pharmacology-059-extra": {
    "front": "Lityumun uzun süreli kullanımında hangi endokrin yan etki klasik olarak izlenir?",
    "keywords": [
      "lityum",
      "hipotiroidi",
      "nefrojenik DI",
      "TDM"
    ],
    "back": "Hipotiroidi.",
    "answer": "Hipotiroidi.",
    "explanation": "Lityum tiroid hormon sentezi ve salınımını azaltarak hipotiroidiye yol açabilir. Ayrıca böbrekte ADH yanıtını bozarak nefrojenik diabetes insipidus yapması da klasik uzun dönem toksisitelerindendir.",
    "tusTip": "Lityumda TSH, böbrek fonksiyonu ve serum düzeyi izlemi birlikte düşünülmelidir.",
    "differentialNote": "Valproat daha çok hepatotoksisite, kilo artışı ve nöral tüp defekti riskiyle ayırt edilir."
  },
  "tus-pearl-medical-pharmacology-060-spot": {
    "front": "Metformin kullanımı sırasında böbrek yetmezliği veya hipoksi varlığında en çok korkulan nadir toksisite nedir?",
    "keywords": [
      "metformin",
      "laktik asidoz",
      "böbrek yetmezliği",
      "hipoksi"
    ],
    "back": "Laktik asidoz.",
    "answer": "Laktik asidoz.",
    "explanation": "Metformin hepatik glukoneogenezi azaltır ve periferik insülin duyarlılığını artırır; genellikle hipoglisemi yapma riski düşüktür. Ancak böbrek yetmezliği, doku hipoksisi veya ağır sistemik hastalıkta laktat birikimi ve laktik asidoz riski artar.",
    "tusTip": "Metformin + böbrek yetmezliği/hipoksi = laktik asidoz riski.",
    "differentialNote": "Sülfonilürelerde temel risk glukozdan bağımsız insülin salınımına bağlı hipoglisemidir."
  },
  "tus-pearl-medical-pharmacology-060-extra": {
    "front": "Metforminin tip 2 diyabette glisemiyi düşürmesinin temel karaciğer etkisi nedir?",
    "keywords": [
      "metformin",
      "hepatik glukoneogenez",
      "AMPK",
      "insülin duyarlılığı"
    ],
    "back": "Hepatik glukoneogenezi azaltır ve insülin duyarlılığını artırır.",
    "answer": "Hepatik glukoneogenezin azaltılması.",
    "explanation": "Metformin karaciğerde glukoz üretimini baskılar ve periferik dokularda insülin duyarlılığını artırır. Pankreastan insülin salınımını doğrudan artırmadığı için tek başına hipoglisemi riski sülfonilürelerden daha düşüktür.",
    "tusTip": "Metformin kilo aldırmayan, hipoglisemi riski düşük temel tip 2 diyabet ilacı olarak düşünülür.",
    "differentialNote": "GLP-1 agonistleri inkretin etkisini artırır; SGLT2 inhibitörleri böbrekten glukoz atılımını artırır."
  },
  "tus-pearl-medical-pharmacology-142-spot": {
    "front": "Digoksin toksisitesinde yaşamı tehdit eden aritmi veya ağır hiperkalemi varsa hangi özgül antidot kullanılır?",
    "keywords": [
      "digoksin",
      "Na/K ATPaz",
      "aritmi",
      "Fab"
    ],
    "back": "Digoksin spesifik Fab antikoru.",
    "answer": "Digoksin spesifik Fab antikoru.",
    "explanation": "Digoksin Na⁺/K⁺-ATPazı inhibe ederek hücre içi kalsiyumu artırır; toksisitede bulantı, sarı-yeşil görme, AV blok ve ventriküler aritmiler görülebilir. Ağır toksisitede Fab antikorları serbest digoksini bağlayarak etkisini nötralize eder.",
    "tusTip": "Digoksin toksisitesi + aritmi/hiperkalemi = digoksin spesifik Fab.",
    "differentialNote": "Digoksin toksisitesinde hipokalemi toksisiteyi kolaylaştırır; akut ağır zehirlenmede hiperkalemi kötü prognoz göstergesidir."
  },
  "tus-pearl-medical-pharmacology-142-extra": {
    "front": "Digoksin toksisitesi hangi elektrolit bozukluğunda daha kolay gelişir?",
    "keywords": [
      "digoksin",
      "hipokalemi",
      "Na/K ATPaz",
      "aritmi"
    ],
    "back": "Hipokalemi.",
    "answer": "Hipokalemi.",
    "explanation": "Potasyum ve digoksin Na⁺/K⁺-ATPaz üzerinde ilişkili bağlanma dinamiklerine sahiptir. Hipokalemi digoksinin pompa üzerindeki etkisini artırarak AV blok ve ventriküler aritmi riskini yükseltir; loop veya tiyazid diüretiklerle birliktelik bu yüzden önemlidir.",
    "tusTip": "Digoksin + hipokalemi = toksisite ve aritmi riski artar.",
    "differentialNote": "Hiperkalsemi ve hipomagnezemi de digoksin aritmisini kolaylaştırabilir; sınavda en klasik tetikleyici hipokalemidir."
  },
  "tus-pearl-medical-pharmacology-143-spot": {
    "front": "Kalsiyum kanal bloker zehirlenmesinde yüksek doz insülin-euglisemi tedavisi hangi kardiyak metabolik etkiyle yarar sağlar?",
    "keywords": [
      "kalsiyum kanal bloker",
      "yüksek doz insülin",
      "euglisemi",
      "miyokard"
    ],
    "back": "Miyokardın karbonhidrat kullanımını ve inotropisini artırır.",
    "answer": "Yüksek doz insülin-euglisemi tedavisi.",
    "explanation": "Kalsiyum kanal bloker toksisitesi pankreasta insülin salınımını azaltabilir, miyokardda kontraktiliteyi düşürür ve vazodilatasyonla şok yapabilir. Yüksek doz insülin, glukoz desteğiyle birlikte miyokardın enerji kullanımını destekler ve pozitif inotropik etki sağlayabilir.",
    "tusTip": "CCB toksisitesi + bradikardi/hipotansiyon/hiperglisemi = yüksek doz insülin-euglisemi yaklaşımı akla gelir.",
    "differentialNote": "Beta bloker toksisitesinde glukagon daha klasik antidotal cevaptır; CCB toksisitesinde hiperglisemi ipucu ayırt ettirir."
  },
  "tus-pearl-medical-pharmacology-143-extra": {
    "front": "Kalsiyum kanal bloker toksisitesinde yüksek doz insülin uygulanırken hangi iki laboratuvar parametresi yakından izlenmelidir?",
    "keywords": [
      "yüksek doz insülin",
      "glukoz",
      "potasyum",
      "CCB toksisitesi"
    ],
    "back": "Kan glukozu ve serum potasyumu.",
    "answer": "Serum glukozu ve potasyumu.",
    "explanation": "Yüksek doz insülin tedavisi hipoglisemi ve potasyumun hücre içine kayması nedeniyle hipokalemi oluşturabilir. Bu yüzden euglisemi sağlamak için glukoz infüzyonu ve elektrolit izlemi tedavinin ayrılmaz parçasıdır.",
    "tusTip": "Yüksek doz insülin tedavisinde “euglisemi” hedefi glukoz desteği ve potasyum takibini gerektirir.",
    "differentialNote": "İnsülin-glukoz hiperkalemide potasyumu hücre içine kaydırmak için kullanılır; CCB toksisitesinde amaç miyokard metabolik desteğidir."
  },
  "tus-pearl-medical-pharmacology-144-spot": {
    "front": "SSRI veya MAOI sonrası hipertermi, ajitasyon, klonus ve hiperrefleksi hangi toksidromu düşündürür?",
    "keywords": [
      "serotonin sendromu",
      "klonus",
      "hiperrefleksi",
      "SSRI"
    ],
    "back": "Serotonin sendromu.",
    "answer": "Serotonin sendromu.",
    "explanation": "Serotonerjik ilaçların birlikte kullanımı veya doz artışı sinaptik serotonin aktivitesini aşırı artırabilir. Serotonin sendromunda mental durum değişikliği, otonom instabilite, hipertermi, diyare, tremor, klonus ve hiperrefleksi tipiktir.",
    "tusTip": "Klonus ve hiperrefleksi serotonin sendromunu nöroleptik malign sendromdan ayıran güçlü ipuçlarıdır.",
    "differentialNote": "Nöroleptik malign sendromda “kurşun boru” rijiditesi ve hiporefleksi daha baskındır; başlangıç genellikle daha yavaştır."
  },
  "tus-pearl-medical-pharmacology-144-extra": {
    "front": "Serotonin sendromunda serotonerjik ilaçların kesilmesine ek olarak kullanılan 5-HT2A antagonisti hangisidir?",
    "keywords": [
      "serotonin sendromu",
      "siproheptadin",
      "5-HT2A",
      "klonus"
    ],
    "back": "Siproheptadin.",
    "answer": "Siproheptadin.",
    "explanation": "Serotonin sendromunda temel yaklaşım serotonerjik ajanları kesmek, destek tedavisi vermek, ajitasyon ve kas aktivitesini kontrol etmektir. Siproheptadin serotonin reseptör antagonisti olarak özellikle orta-ağır olgularda antidotal seçenek olarak kullanılır.",
    "tusTip": "Serotonin sendromunda antidotal isim siproheptadindir; malign hipertermide dantrolen, opioid toksisitesinde nalokson düşünülür.",
    "differentialNote": "Flumazenil benzodiazepin etkisini geri çevirir; serotonerjik toksidromun antidotu değildir."
  },
  "tus-pearl-medical-pharmacology-166-spot": {
    "front": "Tinnitus, takipne ve erken respiratuvar alkalozla başlayan karma asit-baz bozukluğu hangi ilaç zehirlenmesini düşündürür?",
    "keywords": [
      "salisilat",
      "tinnitus",
      "respiratuvar alkaloz",
      "metabolik asidoz"
    ],
    "back": "Salisilat zehirlenmesi.",
    "answer": "Salisilat zehirlenmesi.",
    "explanation": "Salisilatlar erken dönemde solunum merkezini uyararak hiperventilasyon ve respiratuvar alkaloz yapar. Daha sonra oksidatif fosforilasyonu bozma, organik asit birikimi ve laktat artışıyla anyon açıklı metabolik asidoz tabloya eklenebilir.",
    "tusTip": "Salisilat = tinnitus + hiperventilasyon + respiratuvar alkaloz/metabolik asidoz kombinasyonu.",
    "differentialNote": "Opioid toksisitesinde solunum depresyonu beklenir; salisilatta erken hiperventilasyon ayırıcıdır."
  },
  "tus-pearl-medical-pharmacology-166-trap": {
    "front": "Salisilat zehirlenmesi opioid toksidromundan hangi solunum paterniyle ayrılır?",
    "keywords": [
      "salisilat",
      "opioid",
      "hiperventilasyon",
      "solunum depresyonu"
    ],
    "back": "Salisilat erken dönemde hiperventilasyon yapar; opioid toksidromunda solunum depresyonu beklenir.",
    "answer": "Salisilatta hiperventilasyon, opioidde solunum depresyonu.",
    "explanation": "Salisilat medüller solunum merkezini uyararak takipne ve respiratuvar alkaloz oluşturur. Opioidler ise μ-reseptör aktivasyonu ile solunum merkezini baskılar; miyozis ve bilinç depresyonu bu tabloya eşlik eder.",
    "tusTip": "Takipne salisilat lehine, bradipne opioid lehine güçlü ayırıcıdır.",
    "differentialNote": "Nalokson opioid toksisitesinde etkilidir; salisilat zehirlenmesinde idrar alkalinizasyonu veya ağır olguda hemodiyaliz düşünülür."
  },
  "tus-pearl-medical-pharmacology-166-extra": {
    "front": "Ciddi salisilat zehirlenmesinde zayıf asit ilacın renal atılımını artırmak için hangi yaklaşım kullanılır?",
    "keywords": [
      "salisilat",
      "idrar alkalinizasyonu",
      "sodyum bikarbonat",
      "iyon tuzağı"
    ],
    "back": "Sodyum bikarbonatla idrar alkalinizasyonu.",
    "answer": "İdrar alkalinizasyonu.",
    "explanation": "Salisilat zayıf asit yapılıdır; idrar alkalileştirildiğinde iyonize formu artar ve tübüler geri emilimi azalır. Böylece renal eliminasyon artar; ağır zehirlenme, nörolojik bulgu veya ciddi asidozda hemodiyaliz de gerekebilir.",
    "tusTip": "Zayıf asit salisilatın atılımı alkali idrarda artar.",
    "differentialNote": "Asidik idrar zayıf asitlerin geri emilimini artırabilir; bu nedenle salisilat toksisitesinde bikarbonat mantığı iyon tuzağına dayanır."
  },
  "tus-pearl-medical-pharmacology-174-spot": {
    "front": "Siyanotik görünüm, çikolata rengi kan ve normal PaO₂ ile seyreden methemoglobinemide temel antidot hangisidir?",
    "keywords": [
      "methemoglobinemi",
      "metilen mavisi",
      "PaO2 normal",
      "çikolata rengi kan"
    ],
    "back": "Metilen mavisi.",
    "answer": "Metilen mavisi.",
    "explanation": "Methemoglobinemide hem demiri Fe²⁺ yerine Fe³⁺ formuna oksitlenir ve oksijen taşıma kapasitesi bozulur. Metilen mavisi NADPH bağımlı redüksiyon yolunu kullanarak methemoglobini fonksiyonel hemoglobine indirgemeye yardım eder.",
    "tusTip": "Siyanoz + normal PaO₂ + çikolata rengi kan = methemoglobinemi; antidot metilen mavisidir.",
    "differentialNote": "G6PD eksikliğinde metilen mavisi etkisiz kalabilir veya hemolizi artırabilir; bu ayrım toksikoloji sorularında önemlidir."
  },
  "tus-pearl-medical-pharmacology-174-extra": {
    "front": "Methemoglobinemide pulse oksimetrenin düşük görünmesine rağmen arter kan gazında PaO₂’nin normal olması hangi kavramı destekler?",
    "keywords": [
      "methemoglobinemi",
      "satürasyon açığı",
      "pulse oksimetre",
      "PaO2"
    ],
    "back": "Satürasyon açığı.",
    "answer": "Satürasyon açığı.",
    "explanation": "Methemoglobinemide plazmada çözünmüş oksijen basıncı normal olabilir; sorun hemoglobinin oksijeni bağlama/taşıma kapasitesindedir. Bu nedenle pulse oksimetre ile kan gazı oksijen parametreleri arasında uyumsuzluk, yani satürasyon açığı görülebilir.",
    "tusTip": "PaO₂ normal ama siyanoz sürüyorsa hemoglobin fonksiyon bozukluğu düşünülür.",
    "differentialNote": "Karbonmonoksit zehirlenmesinde de PaO₂ normal olabilir; methemoglobinemide çikolata rengi kan ve metilen mavisi ayrımı öne çıkar."
  },
  "tus-pearl-medical-pharmacology-311-spot": {
    "front": "Dar kompleks paroksismal supraventriküler taşikardiyi akut sonlandırmak için kısa yarı ömürlü hangi ilaç kullanılır?",
    "keywords": [
      "adenozin",
      "SVT",
      "AV nod",
      "kısa yarı ömür"
    ],
    "back": "Adenozin.",
    "answer": "Adenozin.",
    "explanation": "Adenozin AV nod iletisini geçici olarak yavaşlatır ve AV nod bağımlı reentry taşikardileri kısa süreli blokla sonlandırabilir. Çok kısa yarı ömrü nedeniyle hızlı IV bolus uygulanır; geçici flushing, göğüs sıkışması veya bronkospazm yapabilir.",
    "tusTip": "AV nod bağımlı dar kompleks SVT’de akut ilaç cevabı adenozindir.",
    "differentialNote": "Geniş kompleks taşikardi veya preeksitasyonlu atriyal fibrilasyon şüphesinde yaklaşım farklıdır; adenozin her taşikardide otomatik cevap değildir."
  },
  "tus-pearl-medical-pharmacology-311-extra": {
    "front": "Adenozinin SVT’yi sonlandırması hangi reseptör aracılı AV nod etkisiyle açıklanır?",
    "keywords": [
      "adenozin",
      "A1 reseptörü",
      "AV nod",
      "potasyum çıkışı"
    ],
    "back": "A1 reseptör aktivasyonu ile AV nod iletisinin geçici baskılanması.",
    "answer": "A1 reseptörü üzerinden AV nod iletimini geçici baskılaması.",
    "explanation": "Adenozin A1 reseptörlerini aktive ederek AV nodda potasyum çıkışını artırır, cAMP’yi azaltır ve iletimi kısa süreli yavaşlatır. Bu etki AV nod bağımlı reentry devresini kırarak PSVT’yi sonlandırabilir.",
    "tusTip": "Adenozinin etkisi çok kısa sürer; bu yüzden hızlı IV bolus ve yakın EKG izlemi gerekir.",
    "differentialNote": "Dipiridamol adenozin etkisini artırabilir; teofilin/kafein adenozin reseptör antagonizmasıyla etkisini azaltabilir."
  },
  "tus-pearl-medical-pharmacology-312-spot": {
    "front": "Uzun süreli amiodaron kullanımında gelişebilen en önemli ciddi akciğer toksisitesi hangisidir?",
    "keywords": [
      "amiodaron",
      "pulmoner fibrozis",
      "tiroid",
      "iyot"
    ],
    "back": "Pulmoner fibrozis.",
    "answer": "Pulmoner fibrozis.",
    "explanation": "Amiodaron sınıf III antiaritmik özellik taşır fakat çok dokuda birikimi ve uzun yarı ömrü nedeniyle çoklu organ toksisitesi yapabilir. Kronik kullanımda interstisyel pnömonit ve pulmoner fibrozis en ciddi yan etkilerden biridir.",
    "tusTip": "Amiodaron toksisite hafızası: akciğer fibrozisi, tiroid bozukluğu, karaciğer toksisitesi, korneal depo ve fotosensitivite.",
    "differentialNote": "Sotalol de sınıf III etki ve QT uzaması yapar; amiodaronu ayırt ettiren geniş doku toksisitesi ve iyot içeriğidir."
  },
  "tus-pearl-medical-pharmacology-312-extra": {
    "front": "Amiodaronun hem hipohem de hipertiroidi yapabilmesi hangi yapısal özelliğiyle ilişkilidir?",
    "keywords": [
      "amiodaron",
      "iyot",
      "hipotiroidi",
      "hipertiroidi"
    ],
    "back": "Yüksek iyot içeriği ve tiroid hormon metabolizmasını etkilemesi.",
    "answer": "Yüksek iyot içeriği.",
    "explanation": "Amiodaron molekülü yüksek oranda iyot içerir ve tiroid hormon sentezi ile periferik dönüşümü etkileyebilir. Bu nedenle bazı hastalarda hipotiroidi, bazılarında iyot yüküne bağlı tirotoksikoz gelişebilir.",
    "tusTip": "Amiodaron + tiroid bozukluğu ilişkisinin temel anahtarı ilacın iyot içeriğidir.",
    "differentialNote": "Propiltiourasil T4’ün T3’e periferik dönüşümünü azaltır; amiodaron bu etkiyi toksisite/yan etki bağlamında da etkileyebilir."
  },
  "tus-pearl-medical-pharmacology-313-spot": {
    "front": "Nitratlar damar düz kasında NO yolunu aktive ederek hangi ikinci haberciyi artırır?",
    "keywords": [
      "nitrat",
      "NO",
      "guanilat siklaz",
      "cGMP"
    ],
    "back": "Siklik GMP (cGMP).",
    "answer": "Siklik GMP (cGMP).",
    "explanation": "Organik nitratlar NO oluşturarak guanilat siklazı aktive eder ve damar düz kasında cGMP artışı sağlar. cGMP miyozin hafif zincir fosforilasyonunu azaltarak gevşeme yapar; venodilatasyon preloadu düşürür ve anjina semptomunu azaltır.",
    "tusTip": "Nitrat = NO + guanilat siklaz + cGMP + venodilatasyon.",
    "differentialNote": "Kalsiyum kanal blokerleri L-tip kalsiyum girişini azaltır; nitratların ana sinyali cGMP üzerinden işler."
  },
  "tus-pearl-medical-pharmacology-313-extra": {
    "front": "Nitrat kullanan hastada PDE-5 inhibitörü alınması neden ağır hipotansiyon riski oluşturur?",
    "keywords": [
      "nitrat",
      "PDE-5 inhibitörü",
      "cGMP",
      "hipotansiyon"
    ],
    "back": "Her ikisi de cGMP etkisini artırarak aşırı vazodilatasyon yapar.",
    "answer": "Aşırı cGMP aracılı vazodilatasyon.",
    "explanation": "Nitratlar cGMP üretimini artırırken PDE-5 inhibitörleri cGMP yıkımını azaltır. İki etki birleştiğinde damar düz kas gevşemesi belirginleşir ve ciddi hipotansiyon, senkop veya iskemi riski doğabilir.",
    "tusTip": "Nitrat + sildenafil/tadalafil kombinasyonu kontrendikedir.",
    "differentialNote": "Beta blokerlerle nitrat kombinasyonu anjinada kullanılabilir; PDE-5 inhibitörü ile kombinasyon ise hipotansiyon nedeniyle tehlikelidir."
  },
  "tus-pearl-medical-pharmacology-314-spot": {
    "front": "Hidralazin kullanımı ateş, artralji ve ANA/antihiston pozitifliğiyle hangi otoimmün benzeri tabloyu tetikleyebilir?",
    "keywords": [
      "hidralazin",
      "ilaç ilişkili lupus",
      "antihiston",
      "ANA"
    ],
    "back": "İlaç ilişkili lupus benzeri sendrom.",
    "answer": "İlaç ilişkili lupus benzeri sendrom.",
    "explanation": "Hidralazin doğrudan arterioler vazodilatör olarak kan basıncını düşürür; ancak bazı hastalarda ilaç ilişkili lupus benzeri tablo oluşturabilir. Ateş, artralji, serozit ve antihiston antikor pozitifliği klasik ipuçlarıdır.",
    "tusTip": "Hidralazin + antihiston antikor = ilaç ilişkili lupus.",
    "differentialNote": "Sistemik lupus nefrit ve anti-dsDNA ile daha güçlü ilişkilidir; ilaç ilişkili lupusta böbrek/MSS tutulumu genellikle daha azdır."
  },
  "tus-pearl-medical-pharmacology-314-extra": {
    "front": "Hidralazin veya prokainamid ilişkili lupus benzeri tabloda hangi otoantikor sınavda ayırt ettiricidir?",
    "keywords": [
      "antihiston",
      "hidralazin",
      "prokainamid",
      "ilaç ilişkili lupus"
    ],
    "back": "Antihiston antikoru.",
    "answer": "Antihiston antikoru.",
    "explanation": "İlaç ilişkili lupus tablolarında antihiston antikorları sık görülür ve hidralazin, prokainamid gibi ilaçlarla klasik olarak ilişkilidir. İlacın kesilmesiyle bulgular çoğu zaman geriler.",
    "tusTip": "İlaç ilişkili lupus sorusunda antihiston antikoru en pratik anahtardır.",
    "differentialNote": "Anti-dsDNA özellikle SLE aktivitesi ve lupus nefritiyle ilişkilidir; antihiston ilaç ilişkili lupus lehine daha öğreticidir."
  },
  "tus-pearl-medical-pharmacology-315-spot": {
    "front": "Minoksidil tedavisinde belirgin saç/kıl artışı şeklinde görülen kozmetik yan etki nedir?",
    "keywords": [
      "minoksidil",
      "hipertrikoz",
      "K kanal",
      "arteriol vazodilatasyon"
    ],
    "back": "Hipertrikoz.",
    "answer": "Hipertrikoz.",
    "explanation": "Minoksidil ATP-duyarlı potasyum kanallarını açarak arterioler vazodilatasyon yapar ve dirençli hipertansiyonda kullanılabilir. Kıl folikülleri üzerindeki etkisi nedeniyle hipertrikoz yapması klasik ayırt ettirici yan etkidir.",
    "tusTip": "Minoksidil = arterioler vazodilatör + hipertrikoz.",
    "differentialNote": "Hidralazin de arterioler vazodilatördür fakat ilaç ilişkili lupusla; minoksidil hipertrikozla ayrılır."
  },
  "tus-pearl-medical-pharmacology-315-extra": {
    "front": "Minoksidilin dirençli hipertansiyonda arterioler vazodilatasyon yapması hangi kanal etkisine dayanır?",
    "keywords": [
      "minoksidil",
      "ATP duyarlı K kanalı",
      "hiperpolarizasyon",
      "arteriol"
    ],
    "back": "ATP-duyarlı potasyum kanallarını açması.",
    "answer": "ATP-duyarlı K⁺ kanallarını açması.",
    "explanation": "Minoksidil damar düz kasında potasyum kanal açıcı etkiyle hiperpolarizasyon oluşturur. Bu durum kalsiyum girişini azaltır, arterioler gevşeme ve periferik dirençte düşüş sağlar.",
    "tusTip": "Kanal açılması → hiperpolarizasyon → vazodilatasyon zinciri minoksidil için temel mekanizmadır.",
    "differentialNote": "Nitroprussid hem arter hem ven üzerinde NO aracılı etki gösterir; minoksidil daha çok arterioler K⁺ kanal açıcı olarak düşünülür."
  },
  "tus-pearl-medical-pharmacology-316-spot": {
    "front": "Spironolakton kullanan erkek hastada jinekomasti gelişmesi hangi reseptör etkileşimiyle açıklanır?",
    "keywords": [
      "spironolakton",
      "aldosteron antagonisti",
      "antiandrojen",
      "jinekomasti"
    ],
    "back": "Mineralokortikoid reseptör antagonizmine ek antiandrojenik etki.",
    "answer": "Jinekomasti.",
    "explanation": "Spironolakton aldosteron reseptör antagonisti olarak potasyum tutucu diüretik etki gösterir. Aynı zamanda androjen reseptörleri ve steroid sentezi üzerinde etkileri nedeniyle jinekomasti, libido azalması ve menstrual düzensizlik gibi endokrin yan etkiler yapabilir.",
    "tusTip": "Spironolakton = hiperkalemi + jinekomasti; eplerenon daha seçici olduğu için endokrin yan etki daha azdır.",
    "differentialNote": "Amilorid ENaC blokajı yapar ve antiandrojenik etkiyle jinekomasti beklenmez."
  },
  "tus-pearl-medical-pharmacology-316-extra": {
    "front": "Spironolaktonun hiperkalemi yapması distal nefronda hangi hormon reseptörünü antagonize etmesiyle açıklanır?",
    "keywords": [
      "spironolakton",
      "aldosteron reseptörü",
      "ENaC",
      "hiperkalemi"
    ],
    "back": "Aldosteron/mineralokortikoid reseptörü.",
    "answer": "Mineralokortikoid reseptör antagonizmi.",
    "explanation": "Aldosteron normalde principal hücrelerde ENaC ve Na⁺/K⁺-ATPaz aktivitesini artırarak sodyum geri emilimini ve potasyum atılımını destekler. Spironolakton bu reseptörü bloke edince potasyum atılımı azalır ve hiperkalemi gelişebilir.",
    "tusTip": "Potasyum tutucu diüretiklerde en kritik elektrolit riski hiperkalemidir.",
    "differentialNote": "Loop ve tiyazid diüretikler genellikle hipokalemi yapar; spironolakton bunun tersine potasyum tutar."
  },
  "tus-pearl-medical-pharmacology-317-spot": {
    "front": "Furosemid gibi loop diüretiklerde işitme kaybı veya tinnitus gelişmesi hangi önemli toksisiteyi düşündürür?",
    "keywords": [
      "furosemid",
      "loop diüretik",
      "ototoksisite",
      "NKCC2"
    ],
    "back": "Ototoksisite.",
    "answer": "Ototoksisite.",
    "explanation": "Loop diüretikler kalın çıkan Henle kulpunda NKCC2 taşıyıcısını inhibe eder ve güçlü natriürez oluşturur. Yüksek doz, hızlı IV uygulama, böbrek yetmezliği veya aminoglikozidlerle birlikte kullanım ototoksisite riskini artırabilir.",
    "tusTip": "Loop diüretik = NKCC2 inhibisyonu + hipokalemi/metabolik alkaloz + ototoksisite.",
    "differentialNote": "Tiyazidler distal tübülde NaCl kotransporterini inhibe eder ve kalsiyum geri emilimini artırır; looplar kalsiyum atılımını artırabilir."
  },
  "tus-pearl-medical-pharmacology-317-extra": {
    "front": "Loop diüretiklerin güçlü natriürez yapması Henle kulpunun hangi taşıyıcısını inhibe etmeleriyle başlar?",
    "keywords": [
      "loop diüretik",
      "NKCC2",
      "kalın çıkan kol",
      "natriürez"
    ],
    "back": "Kalın çıkan Henle kulpunda Na⁺-K⁺-2Cl⁻ kotransporterinin inhibisyonu.",
    "answer": "NKCC2 inhibisyonu.",
    "explanation": "Furosemid, bumetanid ve torsemid kalın çıkan kolda Na⁺-K⁺-2Cl⁻ kotransporterini inhibe eder. Bu segment medüller hipertonisiteye ve paracellular kalsiyum/magnezyum geri emilimine katkı verdiği için loop diüretikler güçlü diürez ve kalsiyum atılımında artış yapabilir.",
    "tusTip": "Loop diüretiklerin hedefi NKCC2; tiyazidlerin hedefi distal tübüldeki Na⁺/Cl⁻ kotransporteridir.",
    "differentialNote": "Looplar hipokalsemi eğilimi yapabilir; tiyazidler kalsiyum geri emilimini artırarak hiperkalsemi eğilimi oluşturur."
  }
});
