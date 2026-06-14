// Text overrides for the first 50 frontend-rendered İç Hastalıkları pearl cards.
// Targets only internal-medicine rendered positions 1–50; schema, order, branch metadata and card IDs remain unchanged.

export const TUS_PEARL_INTERNAL_MEDICINE_FIRST50_TEXT_OVERRIDES = Object.freeze(
{
  "tus-pearl-internal-medicine-061-spot": {
    "front": "ST elevasyonlu miyokard enfarktüsünde reperfüzyon stratejisini belirleyen temel klinik öncelik nedir?",
    "keywords": [
      "STEMI",
      "reperfüzyon",
      "primer PCI",
      "iskemik süre"
    ],
    "back": "Uygun sürede primer perkütan koroner girişim ile reperfüzyon.",
    "answer": "Primer PCI ile erken reperfüzyon.",
    "explanation": "STEMI’de temel problem tam veya tama yakın koroner oklüzyondur; miyokard kaybını azaltan ana basamak damarın hızla açılmasıdır. PCI yapılabilen merkezde zaman kaybetmeden primer PCI tercih edilir; anlamlı gecikme olacaksa ve kontrendikasyon yoksa fibrinolitik tedavi düşünülür. Ağrı kesici veya antitrombotik destek önemlidir ama reperfüzyonun yerini tutmaz.",
    "tusTip": "STEMI sorusunda zaman penceresi ve PCI erişimi veriliyorsa karar reperfüzyon hızına göre kurulur.",
    "differentialNote": "NSTEMI’de troponin pozitifliği vardır ancak persistan ST elevasyonu yoktur; fibrinoliz NSTEMI tedavisi değildir."
  },
  "tus-pearl-internal-medicine-061-extra": {
    "front": "Akut koroner sendromda aspirinin erken verilmesi hangi trombosit basamağını hedefler?",
    "keywords": [
      "akut koroner sendrom",
      "aspirin",
      "COX-1",
      "trombosit agregasyonu"
    ],
    "back": "Trombosit COX-1 inhibisyonu ile tromboksan A₂ aracılı agregasyonun azaltılması.",
    "answer": "Trombosit agregasyonunu azaltmak için COX-1/TXA₂ yolunun inhibisyonu.",
    "explanation": "Akut koroner sendromda plak rüptürü sonrası trombosit aktivasyonu ve trombüs oluşumu koroner akımı bozar. Aspirin trombositlerde COX-1’i irreversibl inhibe ederek tromboksan A₂ üretimini azaltır ve yeni trombüs büyümesini sınırlar. Bu yaklaşım reperfüzyon kararını tamamlar; tek başına oklüde damarı açan işlem değildir.",
    "tusTip": "AKS’de aspirin erken verilir; primer hedef ağrı değil trombosit aracılı trombüs progresyonudur.",
    "differentialNote": "Heparin koagülasyon kaskadını hedefler; aspirin primer olarak trombosit fonksiyonunu baskılar."
  },
  "tus-pearl-internal-medicine-062-spot": {
    "front": "Diyabetik ketoasidozda hiperglisemi, ketozis ve dehidratasyonla gelen hastada tedavinin ilk basamağı nedir?",
    "keywords": [
      "DKA",
      "dehidratasyon",
      "izotonik sıvı",
      "insülin öncesi yaklaşım"
    ],
    "back": "İzotonik kristaloid sıvı resüsitasyonu.",
    "answer": "Öncelikle izotonik sıvı ile intravasküler hacim replasmanı.",
    "explanation": "DKA’da osmotik diürez ciddi sıvı ve elektrolit kaybı oluşturur; dolaşımın düzeltilmesi böbrek perfüzyonunu ve glukoz klirensini artırır. İnsülin tedavisi gereklidir ancak potasyum değerlendirilmeden başlanması aritmi riskini artırabilir. Bu nedenle ilk klinik zincir sıvı resüsitasyonu, potasyum kontrolü ve ardından insülin şeklinde düşünülür.",
    "tusTip": "DKA’da ilk refleks insülin değil, hacim kaybını düzeltmek ve potasyumu güvenli aralıkta değerlendirmektir.",
    "differentialNote": "HHS’de ketozis minimaldir ancak sıvı açığı genellikle daha belirgindir; her iki tabloda da başlangıçta sıvı tedavisi kritiktir."
  },
  "tus-pearl-internal-medicine-062-extra": {
    "front": "DKA tedavisinde insülin başlamadan önce hangi elektrolitin güvenli düzeyde olduğundan emin olunmalıdır?",
    "keywords": [
      "DKA",
      "potasyum",
      "insülin",
      "aritmi riski"
    ],
    "back": "Serum potasyumu.",
    "answer": "Potasyum düzeyi değerlendirilmelidir.",
    "explanation": "DKA’da total vücut potasyumu genellikle azalmıştır; asidoz ve insülin eksikliği nedeniyle serum potasyumu normal veya yüksek görünebilir. İnsülin potasyumu hücre içine sokar ve hipokalemiyi hızla ağırlaştırabilir. Bu nedenle düşük potasyum varsa insülin geciktirilip önce potasyum replasmanı yapılması gerekir.",
    "tusTip": "DKA’da serum K⁺ normal bile olsa total vücut potasyumu düşüktür; insülin hipokalemiyi görünür hale getirir.",
    "differentialNote": "Hiperkalemide EKG bulgusu varsa kalsiyum glukonat kalbi korur; DKA’da potasyum değerlendirmesi insülin güvenliği içindir."
  },
  "tus-pearl-internal-medicine-063-spot": {
    "front": "Hipotansiyon, hiponatremi, hiperkalemi ve hipoglisemiyle gelen hastada adrenal kriz düşünülüyorsa acil tedavi önceliği nedir?",
    "keywords": [
      "adrenal kriz",
      "hidrokortizon",
      "hiponatremi",
      "hiperkalemi"
    ],
    "back": "IV hidrokortizon ve izotonik salin ile acil replasman/resüsitasyon.",
    "answer": "İntravenöz hidrokortizon ve izotonik sıvı tedavisi.",
    "explanation": "Adrenal kriz kortizol eksikliği ve sıklıkla mineralokortikoid yetersizliği nedeniyle vazodilatasyon, hacim kaybı, hiponatremi ve hiperkalemi oluşturur. Klinik şüphe yüksekse laboratuvar sonucunu beklemek tedaviyi geciktirmemelidir. Hidrokortizon glukokortikoid etkiyle dolaşımı destekler; sıvı replasmanı hipotansiyon ve hipovolemiyi düzeltir.",
    "tusTip": "Adrenal kriz sınavda bekletilmez; steroid ve sıvı erken başlanır.",
    "differentialNote": "Sekonder adrenal yetmezlikte aldosteron genellikle korunur; belirgin hiperkalemi primer adrenal yetmezliği daha çok destekler."
  },
  "tus-pearl-internal-medicine-063-extra": {
    "front": "Primer adrenal yetmezlikte hiperpigmentasyon hangi hormonal değişiklikle açıklanır?",
    "keywords": [
      "primer adrenal yetmezlik",
      "ACTH",
      "hiperpigmentasyon",
      "kortizol eksikliği"
    ],
    "back": "ACTH artışı.",
    "answer": "Negatif feedback kaybına bağlı yüksek ACTH düzeyi.",
    "explanation": "Primer adrenal yetmezlikte adrenal korteks kortizol üretimini yeterli yapamaz; hipofiz bu duruma ACTH artışıyla yanıt verir. ACTH, POMC türevleri üzerinden melanokortin etkisiyle hiperpigmentasyona katkı sağlar. Bu bulgu sekonder adrenal yetmezlikten ayırımda değerlidir.",
    "tusTip": "Hiperpigmentasyon + hiperkalemi primer adrenal yetmezlik lehinedir.",
    "differentialNote": "Sekonder adrenal yetmezlikte ACTH düşük/uygunsuz normaldir; hiperpigmentasyon ve belirgin mineralokortikoid kaybı beklenmez."
  },
  "tus-pearl-internal-medicine-064-spot": {
    "front": "Hiperkalemide geniş QRS veya sivri T dalgası gibi EKG değişikliği varsa ilk kardiyak koruyucu tedavi nedir?",
    "keywords": [
      "hiperkalemi",
      "EKG değişikliği",
      "kalsiyum glukonat",
      "membran stabilizasyonu"
    ],
    "back": "İntravenöz kalsiyum glukonat.",
    "answer": "IV kalsiyum glukonat ile miyokard membran stabilizasyonu.",
    "explanation": "Ağır hiperkalemi miyokard hücre membranını depolarize ederek ölümcül aritmi riskini artırır. Kalsiyum glukonat serum potasyumunu düşürmez; fakat kardiyak membranı stabilize ederek zaman kazandırır. Ardından insülin-glukoz, beta agonist veya bikarbonat gibi hücre içine kaydırıcı ve eliminasyonu artırıcı tedaviler planlanır.",
    "tusTip": "Hiperkalemi + EKG değişikliği görülürse ilk hedef potasyumu düşürmek değil kalbi korumaktır.",
    "differentialNote": "İnsülin-glukoz potasyumu hücre içine kaydırır; kalsiyum glukonat aritmi riskini acilen azaltır."
  },
  "tus-pearl-internal-medicine-064-keywords": {
    "front": "Hiperkalemide insülin-glukoz tedavisi serum potasyumunu hangi temel mekanizmayla geçici olarak düşürür?",
    "keywords": [
      "hiperkalemi",
      "insülin glukoz",
      "hücre içi potasyum",
      "geçici kaydırma"
    ],
    "back": "Potasyumu hücre içine kaydırarak.",
    "answer": "Na⁺/K⁺-ATPaz aktivasyonu ile potasyumun hücre içine geçişinin artırılması.",
    "explanation": "İnsülin hücre membranında potasyum girişini artırır ve serum potasyumunu hızlı ama geçici olarak düşürür. Glukoz hipoglisemiyi önlemek için birlikte verilir. Bu yaklaşım potasyumu vücuttan uzaklaştırmaz; kalıcı kontrol için renal atılım, potasyum bağlayıcılar veya diyaliz gerekebilir.",
    "tusTip": "Hiperkalemide kalsiyum kalbi korur, insülin-glukoz potasyumu geçici olarak hücre içine kaydırır.",
    "differentialNote": "Diyaliz potasyumu vücuttan uzaklaştırır; insülin-glukoz sadece kompartman değiştirir."
  },
  "tus-pearl-internal-medicine-064-extra": {
    "front": "Hiperkalemide potasyumu gerçekten vücuttan uzaklaştıran kesin yöntem özellikle böbrek yetmezliğinde hangisidir?",
    "keywords": [
      "hiperkalemi",
      "diyaliz",
      "potasyum eliminasyonu",
      "böbrek yetmezliği"
    ],
    "back": "Hemodiyaliz.",
    "answer": "Hemodiyaliz ile potasyum eliminasyonu.",
    "explanation": "Kalsiyum glukonat kardiyak membranı stabilize eder, insülin-glukoz ise potasyumu geçici olarak hücre içine kaydırır. Böbrek yetmezliği, dirençli hiperkalemi veya ağır EKG bulgularında potasyumun vücuttan uzaklaştırılması gerekir. Bu bağlamda hemodiyaliz en etkili ve hızlı eliminasyon yöntemidir.",
    "tusTip": "Dirençli hiperkalemi + böbrek yetmezliği = potasyumu uzaklaştırmak için diyaliz düşün.",
    "differentialNote": "Loop diüretikler idrar çıkışı olan hastada yardımcı olabilir; anürik ağır böbrek yetmezliğinde diyaliz daha belirleyicidir."
  },
  "tus-pearl-internal-medicine-065-spot": {
    "front": "Övolemik hiponatremi, düşük serum ozmolalitesi, yüksek idrar ozmolalitesi ve yüksek idrar sodyumu hangi tanıyı destekler?",
    "keywords": [
      "SIADH",
      "övolemik hiponatremi",
      "idrar ozmolalitesi",
      "idrar sodyumu"
    ],
    "back": "Uygunsuz ADH salınımı sendromu.",
    "answer": "SIADH.",
    "explanation": "SIADH’de ADH etkisi uygunsuz biçimde sürer; su tutulumu hiponatremi yaparken hasta klinik olarak genellikle övolemik görünür. İdrarın seyreltilememesi yüksek idrar ozmolalitesiyle, natriürez ise yüksek idrar sodyumuyla izlenir. Tanı öncesinde hipotiroidi, adrenal yetmezlik ve diüretik kullanımı gibi nedenler dışlanmalıdır.",
    "tusTip": "SIADH’de serum seyrek, idrar gereğinden konsantredir.",
    "differentialNote": "Hipovolemik hiponatremide genellikle klinik hacim kaybı vardır; primer polidipside idrar ozmolalitesi baskılanmış olarak düşük beklenir."
  },
  "tus-pearl-internal-medicine-065-extra": {
    "front": "Nöbet veya ciddi bilinç bozukluğu yapan ağır hiponatremide hangi sıvı tedavisi önceliklidir?",
    "keywords": [
      "semptomatik hiponatremi",
      "hipertonik salin",
      "nöbet",
      "sodyum düzeltme hızı"
    ],
    "back": "Hipertonik salin.",
    "answer": "Kontrollü şekilde %3 hipertonik salin verilmesi.",
    "explanation": "Ağır semptomatik hiponatremi beyin ödemi ve nöbet riski taşır; bu durumda sodyumu güvenli ama hızlı başlangıç hedefiyle yükseltmek gerekir. Hipertonik salin bu acil nörolojik riski azaltmak için kullanılır. Aşırı hızlı düzeltme osmotik demiyelinizasyon riski taşıdığı için yakın izlem şarttır.",
    "tusTip": "Semptomatik ağır hiponatremide amaç tüm sodyumu hızla normale getirmek değil, nörolojik tehlikeyi kontrollü azaltmaktır.",
    "differentialNote": "Asemptomatik kronik SIADH’de sıvı kısıtlaması düşünülebilir; nöbet varsa hipertonik salin önceliklidir."
  },
  "tus-pearl-internal-medicine-066-spot": {
    "front": "Dirençli hipertansiyon ve hipokalemi saptanan hastada primer hiperaldosteronizm için en uygun tarama yaklaşımı nedir?",
    "keywords": [
      "primer hiperaldosteronizm",
      "dirençli hipertansiyon",
      "hipokalemi",
      "aldosteron renin oranı"
    ],
    "back": "Plazma aldosteron/renin oranı.",
    "answer": "Aldosteron-renin oranının değerlendirilmesi.",
    "explanation": "Primer hiperaldosteronizmde aldosteron fazlalığı sodyum tutulumu, potasyum kaybı ve renin baskılanması oluşturur. Bu nedenle yüksek aldosteron ve düşük renin kombinasyonu taramada değerlidir. Hipokalemi klasik ipucudur ancak tüm hastalarda bulunmayabilir; dirençli hipertansiyon tek başına da tarama nedenidir.",
    "tusTip": "Hipertansiyon + hipokalemi + düşük renin düşünülüyorsa aldosteron-renin oranı sorulur.",
    "differentialNote": "Renovasküler hipertansiyonda renin genellikle artar; primer hiperaldosteronizmde renin baskılanır."
  },
  "tus-pearl-internal-medicine-066-extra": {
    "front": "Conn sendromunda hipokalemiye eşlik eden tipik asit-baz bozukluğu nedir?",
    "keywords": [
      "Conn sendromu",
      "metabolik alkaloz",
      "potasyum kaybı",
      "hidrojen atılımı"
    ],
    "back": "Metabolik alkaloz.",
    "answer": "Hipokalemik metabolik alkaloz.",
    "explanation": "Aldosteron distal nefronda sodyum geri emilimini artırırken potasyum ve hidrojen iyonu atılımını artırır. Bu nedenle primer aldosteron fazlalığında hipokalemi ve metabolik alkaloz birlikte görülür. Klinik bağlamda dirençli hipertansiyon bu laboratuvar paterniyle birleşirse Conn sendromu güçlenir.",
    "tusTip": "Aldosteron fazlalığı sodyumu tutar, potasyum ve hidrojeni attırır.",
    "differentialNote": "Addison hastalığında aldosteron eksikliği hiperkalemi ve metabolik asidoz eğilimiyle zıt patern oluşturur."
  },
  "tus-pearl-internal-medicine-067-spot": {
    "front": "Cushing sendromu şüphesinde hiperkortizolizmi göstermek için kullanılan klasik tarama testlerinden biri nedir?",
    "keywords": [
      "Cushing sendromu",
      "1 mg deksametazon",
      "kortizol supresyonu",
      "tarama"
    ],
    "back": "Gece 1 mg deksametazon supresyon testi.",
    "answer": "1 mg gece deksametazon supresyon testi.",
    "explanation": "Sağlıklı bireyde deksametazon ACTH salınımını baskılayarak sabah kortizolünü düşürür. Cushing sendromunda otonom veya uygunsuz kortizol fazlalığı nedeniyle bu baskılanma yetersiz kalır. Tarama testleri tanıyı destekler; etiyoloji ayrımı için ACTH düzeyi ve ileri testler gerekir.",
    "tusTip": "Cushing’de ilk soru hiperkortizolizmi kanıtlamak, ikinci soru ACTH bağımlı mı bağımsız mı ayırmaktır.",
    "differentialNote": "Ekzojen steroid kullanımı Cushingoid görünüm yapabilir; endojen Cushing değerlendirmesinde ilaç öyküsü kritik ayırıcıdır."
  },
  "tus-pearl-internal-medicine-067-extra": {
    "front": "Cushing hastalığı terimi hangi spesifik hiperkortizolizm nedenini ifade eder?",
    "keywords": [
      "Cushing hastalığı",
      "hipofiz adenomu",
      "ACTH",
      "Cushing sendromu"
    ],
    "back": "ACTH salgılayan hipofiz adenomu.",
    "answer": "Hipofiz kaynaklı ACTH salgılayan adenomun neden olduğu Cushing sendromu.",
    "explanation": "Cushing sendromu hiperkortizolizmin genel adıdır; adrenal tümör, ektopik ACTH veya ekzojen steroid gibi farklı nedenleri kapsar. Cushing hastalığı ise bu geniş grubun hipofiz ACTH adenomu olan alt tipidir. Bu ayrım TUS’ta terminoloji ve etiyoloji sorularında sık kullanılır.",
    "tusTip": "Her Cushing hastalığı Cushing sendromudur; her Cushing sendromu Cushing hastalığı değildir.",
    "differentialNote": "Ektopik ACTH sendromunda ACTH yüksek olabilir ama kaynak hipofiz dışıdır; adrenal adenomda ACTH baskılanır."
  },
  "tus-pearl-internal-medicine-068-spot": {
    "front": "Hipertiroidi bulgularına ekzoftalmi ve pretibial miksödem eşlik ediyorsa en olası tanı nedir?",
    "keywords": [
      "Graves",
      "hipertiroidi",
      "oftalmopati",
      "pretibial miksödem"
    ],
    "back": "Graves hastalığı.",
    "answer": "Graves hastalığı.",
    "explanation": "Graves hastalığında TSH reseptörünü uyaran otoantikorlar tiroid hormon üretimini artırır. Orbital fibroblast aktivasyonu ve glikozaminoglikan birikimi oftalmopatiyi açıklar; bu özellik toksik nodüler guatrdan ayırımda değerlidir. TSH baskılanmış, serbest T4/T3 yüksek beklenir.",
    "tusTip": "Hipertiroidi + oftalmopati birlikteliği Graves lehine güçlü ayırıcıdır.",
    "differentialNote": "Toksik multinodüler guatr hipertiroidi yapabilir ancak infiltratif oftalmopati Graves kadar tipik değildir."
  },
  "tus-pearl-internal-medicine-068-extra": {
    "front": "Graves hastalığında hipertiroidiyi oluşturan temel otoantikor hangisidir?",
    "keywords": [
      "Graves",
      "TRAb",
      "TSH reseptörü",
      "otoantikor"
    ],
    "back": "TSH reseptör antikoru.",
    "answer": "TSH reseptörünü uyaran antikorlar (TRAb/TSI).",
    "explanation": "TRAb tiroid folikül hücresindeki TSH reseptörünü uyararak hormon sentezi ve tiroid büyümesini artırır. Bu nedenle TSH düşük olmasına rağmen tiroid hormonları yüksektir. Antikor varlığı tanıyı destekler ve gebelik gibi özel durumlarda fetal/neonatal risk açısından da önem taşır.",
    "tusTip": "Graves’te reseptör blokajı değil reseptör uyarılması vardır.",
    "differentialNote": "Hashimoto tiroiditinde anti-TPO/anti-tiroglobulin daha tipiktir; Graves’in ayırıcı antikoru TSH reseptör antikorudur."
  },
  "tus-pearl-internal-medicine-069-spot": {
    "front": "SLE’de hastalık aktivitesi ve özellikle lupus nefriti alevlenmesini destekleyen laboratuvar paterni nedir?",
    "keywords": [
      "SLE aktivitesi",
      "anti-dsDNA",
      "kompleman düşüklüğü",
      "lupus nefriti"
    ],
    "back": "Anti-dsDNA artışı ve C3/C4 düşüklüğü.",
    "answer": "Artmış anti-dsDNA ile düşük kompleman düzeyleri.",
    "explanation": "Aktif SLE’de immün kompleks oluşumu artar ve kompleman tüketimi gelişir; anti-dsDNA yükselişi özellikle renal aktiviteyle ilişkilidir. Proteinüri, hematüri veya silendir varlığı bu paterni lupus nefriti açısından daha anlamlı hale getirir. Tek başına ANA pozitifliği hastalık aktivitesini izlemek için yeterli değildir.",
    "tusTip": "SLE aktivite sorusunda anti-dsDNA yükselir, kompleman düşer.",
    "differentialNote": "ANA taramada duyarlıdır fakat aktivite ve nefrit izlemi için anti-dsDNA/kompleman paterni daha ayırt ettiricidir."
  },
  "tus-pearl-internal-medicine-069-keywords": {
    "front": "SLE taramasında duyarlılığı yüksek olduğu için negatifliği tanı olasılığını belirgin azaltan otoantikor hangisidir?",
    "keywords": [
      "SLE",
      "ANA",
      "tarama",
      "duyarlılık"
    ],
    "back": "Antinükleer antikor.",
    "answer": "ANA.",
    "explanation": "ANA SLE için yüksek duyarlılığa sahiptir; bu nedenle negatifliği klasik SLE olasılığını azaltır. Ancak özgüllüğü düşüktür ve başka otoimmün hastalıklarda veya düşük titrede sağlıklı bireylerde pozitif olabilir. Tanısal bağlamda anti-dsDNA ve anti-Sm gibi daha özgül antikorlar destekleyici değer taşır.",
    "tusTip": "ANA duyarlı tarama testidir; anti-dsDNA/anti-Sm daha özgül düşünülür.",
    "differentialNote": "Pozitif ANA tek başına SLE tanısı koydurmaz; klinik kriterler ve organ tutulumu ile birlikte yorumlanmalıdır."
  },
  "tus-pearl-internal-medicine-069-extra": {
    "front": "SLE’de anti-Sm antikorunun sınav açısından temel değeri nedir?",
    "keywords": [
      "SLE",
      "anti-Sm",
      "özgüllük",
      "otoantikor"
    ],
    "back": "SLE için yüksek özgüllük göstermesi.",
    "answer": "Anti-Sm antikoru SLE için oldukça özgüldür.",
    "explanation": "Anti-Sm duyarlılığı düşük olsa da pozitif bulunduğunda SLE tanısını güçlü biçimde destekler. Buna karşılık ANA daha duyarlı fakat daha az özgüldür. Bu nedenle tarama ve doğrulayıcı antikor mantığını ayırmak klinik akıl yürütmede önemlidir.",
    "tusTip": "ANA negatifse SLE zorlaşır; anti-Sm pozitifse SLE lehine özgüllük artar.",
    "differentialNote": "Anti-Ro/SSA Sjögren ve neonatal lupusla da ilişkilidir; anti-Sm daha klasik SLE özgüllüğüyle sorulur."
  },
  "tus-pearl-internal-medicine-070-spot": {
    "front": "Kronik sinüzit/otit, akciğer nodülleri-hemoptizi ve hızlı ilerleyen glomerülonefrit birlikteliğinde hangi vaskülit ve antikor düşünülür?",
    "keywords": [
      "GPA",
      "c-ANCA",
      "PR3",
      "akciğer böbrek sendromu"
    ],
    "back": "Granülomatoz polianjiit ve PR3-ANCA/c-ANCA.",
    "answer": "GPA; en tipik antikor PR3-ANCA/c-ANCA.",
    "explanation": "GPA küçük-orta damar nekrotizan vaskülitidir ve üst solunum yolu, alt solunum yolu ve böbrek tutulumunu birlikte yapabilir. PR3-ANCA/c-ANCA tanıyı destekleyen klasik serolojik bulgudur. Böbrekte hızlı ilerleyen glomerülonefrit gelişebileceği için idrar sedimenti ve kreatinin izlemi önemlidir.",
    "tusTip": "Üst solunum yolu + akciğer + böbrek üçlüsü GPA’yı güçlü düşündürür.",
    "differentialNote": "Mikroskopik polianjiitte granülomatöz üst solunum yolu tutulumu daha azdır ve MPO-ANCA/p-ANCA daha sık beklenir."
  },
  "tus-pearl-internal-medicine-070-extra": {
    "front": "Granülomatoz polianjiitte beklenen temel histopatolojik patern nedir?",
    "keywords": [
      "GPA",
      "nekrotizan granülom",
      "vaskülit",
      "histopatoloji"
    ],
    "back": "Nekrotizan granülomatöz inflamasyon ve vaskülit.",
    "answer": "Nekrotizan granülomatöz vaskülit.",
    "explanation": "GPA’da damar duvarı hasarı nekrozla, çevre dokuda ise granülomatöz inflamasyonla karakterizedir. Bu patern özellikle üst-alt solunum yolu lezyonlarıyla birlikte değerlendirildiğinde tanısal değeri artırır. Böbrekte pauci-immün kresentik glomerülonefrit görülebilir.",
    "tusTip": "GPA’da granülom varlığı, MPA’dan ayıran klasik patolojik ipucudur.",
    "differentialNote": "Anti-GBM hastalığında lineer IgG birikimi beklenir; ANCA vaskülitlerinde immün birikim genellikle pauci-immündür."
  },
  "tus-pearl-internal-medicine-071-spot": {
    "front": "Hemoptizi ve hızlı ilerleyen glomerülonefrit birlikteliğinde lineer immünfloresan bekleniyorsa hangi antikor düşünülür?",
    "keywords": [
      "Anti-GBM",
      "pulmoner hemoraji",
      "hızlı ilerleyen glomerülonefrit",
      "lineer IgG"
    ],
    "back": "Anti-GBM antikoru.",
    "answer": "Anti-glomerüler bazal membran antikoru.",
    "explanation": "Anti-GBM hastalığında antikorlar glomerüler ve alveoler bazal membrana bağlanarak akciğer-böbrek sendromu oluşturur. Hemoptizi, anemi ve kresentik glomerülonefrit birlikteliği tanıyı destekler. Erken plazmaferez ve immünsüpresyon böbrek ve akciğer hasarını sınırlamak açısından kritiktir.",
    "tusTip": "Hemoptizi + RPGN + lineer IgG = anti-GBM hastalığı.",
    "differentialNote": "GPA da akciğer-böbrek sendromu yapar; ancak immünfloresan tipik olarak lineer değil pauci-immündür."
  },
  "tus-pearl-internal-medicine-071-extra": {
    "front": "Anti-GBM hastalığında böbrek biyopsisinde immünfloresan paterni nasıl beklenir?",
    "keywords": [
      "Anti-GBM",
      "immünfloresan",
      "lineer IgG",
      "glomerüler bazal membran"
    ],
    "back": "Glomerüler bazal membran boyunca lineer IgG birikimi.",
    "answer": "Lineer IgG boyanması.",
    "explanation": "Anti-GBM antikorları bazal membran boyunca düzenli biçimde bağlandığı için immünfloresan lineer görünüm verir. Bu patern immün kompleks hastalıklarındaki granüler birikimden ayrılır. Klinik olarak hızlı kreatinin artışı ve aktif idrar sedimentiyle birlikte değerlendirilir.",
    "tusTip": "Lineer boyanma anti-GBM; granüler boyanma immün kompleks hastalıklarını düşündürür.",
    "differentialNote": "Poststreptokoksik GN veya lupus nefritinde immün kompleks birikimi nedeniyle daha granüler patern beklenir."
  },
  "tus-pearl-internal-medicine-072-spot": {
    "front": "Erişkinde ani başlayan nefrotik sendromda ışık mikroskopisi belirgin patoloji göstermeyebilir; elektron mikroskobunda podosit hasarı hangi hastalığı düşündürür?",
    "keywords": [
      "minimal değişiklik hastalığı",
      "nefrotik sendrom",
      "podosit",
      "erişkin"
    ],
    "back": "Minimal değişiklik hastalığı.",
    "answer": "Minimal değişiklik hastalığı.",
    "explanation": "Minimal değişiklik hastalığında temel hasar podosit ayaksı çıkıntılarındadır; bu nedenle ışık mikroskopisi normal veya normale yakın olabilir. Çocuklarda daha sık olsa da erişkinde de nefrotik sendrom nedeni olabilir ve bazı ilaçlar veya hematolojik hastalıklarla ilişkilendirilebilir. Klinik patern masif proteinüri, hipoalbüminemi ve ödemdir.",
    "tusTip": "Nefrotik sendrom + normal ışık mikroskopisi + podosit silinmesi minimal değişiklik lehinedir.",
    "differentialNote": "Nefritik sendromda hematüri, hipertansiyon ve eritrosit silendirleri daha ön plandadır; nefrotikte proteinüri baskındır."
  },
  "tus-pearl-internal-medicine-072-extra": {
    "front": "Minimal değişiklik hastalığında elektron mikroskobunda beklenen ayırt ettirici bulgu nedir?",
    "keywords": [
      "minimal değişiklik",
      "elektron mikroskopisi",
      "podosit ayaksı çıkıntı",
      "nefrotik proteinüri"
    ],
    "back": "Podosit ayaksı çıkıntılarında yaygın silinme.",
    "answer": "Foot process effacement.",
    "explanation": "Podosit ayaksı çıkıntılarının silinmesi filtrasyon bariyerinin selektivitesini bozar ve özellikle albümin kaybına yol açar. Işık mikroskobunun normal görünmesi hastalığın olmadığı anlamına gelmez; tanısal ipucu elektron mikroskobundadır. Bu mekanizma nefrotik düzeyde proteinüriyi açıklar.",
    "tusTip": "Minimal değişiklikte ana mikroskopik ipucu ışık mikroskobu değil elektron mikroskobudur.",
    "differentialNote": "FSGS’de segmental skleroz odakları görülebilir ve steroid yanıtı minimal değişiklik kadar iyi olmayabilir."
  },
  "tus-pearl-internal-medicine-073-spot": {
    "front": "Yaşlı tip 2 diyabetlide çok yüksek glukoz, belirgin hiperozmolarite, ağır dehidratasyon ve minimal ketozis hangi akut tabloyu düşündürür?",
    "keywords": [
      "HHS",
      "hiperozmolarite",
      "minimal ketozis",
      "tip 2 diyabet"
    ],
    "back": "Hiperozmolar hiperglisemik durum.",
    "answer": "HHS.",
    "explanation": "HHS’de göreceli insülin varlığı lipoliz ve ketogenezi kısmen baskılar; bu nedenle ketozis DKA kadar belirgin değildir. Buna karşın uzun süren osmotik diürez ağır su kaybı ve hiperozmolarite oluşturur. Bilinç değişikliği genellikle ozmolaritenin yüksekliğiyle ilişkilidir.",
    "tusTip": "HHS = çok yüksek glukoz ve ozmolarite, minimal keton; DKA = ketozis ve asidoz daha belirgin.",
    "differentialNote": "DKA daha çok tip 1 diyabette ve abdominal ağrı-kusma-asidozla; HHS yaşlı tip 2 diyabetlide ağır dehidratasyonla sorulur."
  },
  "tus-pearl-internal-medicine-073-extra": {
    "front": "HHS tedavisinde ilk klinik öncelik neden agresif sıvı replasmanıdır?",
    "keywords": [
      "HHS tedavisi",
      "sıvı replasmanı",
      "hiperozmolarite",
      "dehidratasyon"
    ],
    "back": "Ağır intravasküler ve total vücut su kaybını düzeltmek için.",
    "answer": "İzotonik sıvı ile ciddi dehidratasyonun düzeltilmesi.",
    "explanation": "HHS’de osmotik diürez uzun süre devam ettiği için sıvı açığı çok büyüktür. Sıvı replasmanı dolaşımı, böbrek perfüzyonunu ve glukoz klirensini düzeltir; glukoz düzeyi insülin verilmeden de bir miktar düşebilir. İnsülin ve elektrolit yönetimi sıvı tedavisinin ardından güvenli biçimde düzenlenir.",
    "tusTip": "HHS’de ölümcül risk çoğu kez ketondan değil hiperozmolar dehidratasyondan gelir.",
    "differentialNote": "DKA’da asidoz yönetimi daha ön plandadır; HHS’de sıvı açığı genellikle daha fazladır."
  },
  "tus-pearl-internal-medicine-074-spot": {
    "front": "Akut pankreatit şüphesinde amilaza göre daha özgül ve daha uzun süre yüksek kalabilen temel enzim hangisidir?",
    "keywords": [
      "akut pankreatit",
      "lipaz",
      "amilaz",
      "epigastrik ağrı"
    ],
    "back": "Serum lipazı.",
    "answer": "Lipaz.",
    "explanation": "Akut pankreatitte epigastrik ağrı ve sırta yayılım klinik olarak önemlidir; tanıda pankreatik enzim yüksekliği destekleyicidir. Lipaz pankreas kaynaklı hasarı amilaza göre daha özgül yansıtır ve daha uzun süre yüksek kalabilir. Enzim düzeyi tek başına şiddeti belirlemez; klinik durum ve organ yetmezliği değerlendirilmelidir.",
    "tusTip": "Pankreatit enzim sorusunda lipaz, amilazdan daha özgül kabul edilir.",
    "differentialNote": "Perfore ülser veya safra koliklerinde karın ağrısı olabilir; belirgin lipaz yüksekliği pankreatit lehine ayırt ettirir."
  },
  "tus-pearl-internal-medicine-074-extra": {
    "front": "Akut pankreatitin erişkinde en sık iki etiyolojik nedeni hangileridir?",
    "keywords": [
      "akut pankreatit",
      "safra taşı",
      "alkol",
      "etiyoloji"
    ],
    "back": "Safra taşları ve alkol kullanımı.",
    "answer": "Safra taşı ve alkol.",
    "explanation": "Safra taşı ampulla düzeyinde geçici tıkanma yaparak pankreatik kanal basıncını ve enzim aktivasyonunu artırabilir. Alkol ise pankreatik sekresyon ve kanal protein tıkaçları üzerinden tekrarlayan hasara zemin hazırlar. Etiyolojiyi belirlemek nüksü önleme ve ileri tedavi planı açısından önemlidir.",
    "tusTip": "Pankreatitte en sık nedenler sorulursa önce safra taşı ve alkol düşünülür.",
    "differentialNote": "Hipertrigliseridemi, ERCP ve ilaçlar daha özel nedenlerdir; klasik ilk iki neden safra taşı ve alkoldür."
  },
  "tus-pearl-internal-medicine-075-spot": {
    "front": "Siroz ve asiti olan hastada ateş, karın ağrısı, böbrek fonksiyon bozulması veya ensefalopati gelişirse ilk tanısal işlem nedir?",
    "keywords": [
      "siroz",
      "asit",
      "spontan bakteriyel peritonit",
      "tanısal parasentez"
    ],
    "back": "Tanısal parasentez.",
    "answer": "Asit sıvısından tanısal parasentez yapılması.",
    "explanation": "Sirotik asitli hastada enfeksiyon bulguları hafif veya atipik olabilir; ensefalopati ya da renal bozulma da SBP belirtisi olabilir. Bu nedenle antibiyotik öncesi gecikmeden asit örneği alınarak hücre sayımı ve kültür değerlendirilir. Tanısal parasentez hem tanıyı koyar hem de gereksiz gecikmeyi önler.",
    "tusTip": "Siroz + asit + yeni klinik kötüleşme = önce parasentez düşün.",
    "differentialNote": "Asit varlığında yalnız görüntüleme ile SBP dışlanmaz; tanı asit PMN sayımıyla desteklenir."
  },
  "tus-pearl-internal-medicine-075-extra": {
    "front": "Spontan bakteriyel peritonit tanısında asit sıvısındaki polimorfonükleer lökosit eşik değeri nedir?",
    "keywords": [
      "SBP",
      "asit PMN",
      "250",
      "siroz"
    ],
    "back": "PMN ≥250/mm³.",
    "answer": "Asit sıvısında PMN sayısının 250/mm³ veya üzerinde olması.",
    "explanation": "SBP’de tanısal eşik kültür sonucunu beklemeden tedavi kararını destekler. Kültür negatif olabilir; ancak PMN ≥250/mm³ ise klinik bağlama göre antibiyotik tedavisi geciktirilmemelidir. İkincil peritonit şüphesinde glukoz, LDH, protein ve görüntüleme gibi ek veriler değerlendirilir.",
    "tusTip": "SBP için sınav eşiği asit PMN ≥250/mm³’tür.",
    "differentialNote": "Sekonder peritonitte perforasyon veya intraabdominal odak aranır; SBP’de belirgin cerrahi kaynak olmadan enfekte asit vardır."
  },
  "tus-pearl-internal-medicine-145-spot": {
    "front": "Hipotansiyon, laktat yüksekliği ve enfeksiyon odağı olan erişkinde sepsis/septik şok şüphesinde ilk yaklaşımın temel basamakları nelerdir?",
    "keywords": [
      "sepsis",
      "laktat",
      "antibiyotik",
      "kristaloid"
    ],
    "back": "Erken geniş spektrumlu antibiyotik ve kristaloid sıvı resüsitasyonu.",
    "answer": "Geniş spektrumlu antibiyotik başlanması ve hızlı kristaloid resüsitasyonu.",
    "explanation": "Sepsis organ disfonksiyonu riski taşıyan sistemik enfeksiyon yanıtıdır; hipotansiyon ve laktat yüksekliği doku hipoperfüzyonunu düşündürür. İlk saatlerde kültürlerin alınması, uygun antibiyotiğin gecikmeden başlanması ve kristaloid sıvıyla perfüzyonun düzeltilmesi mortaliteyi azaltmaya yöneliktir. Kaynak kontrolü ve yakın hemodinamik izlem bu zincirin devamıdır.",
    "tusTip": "Sepsiste antibiyotik ve perfüzyon resüsitasyonu birlikte düşünülür; yalnız ateş düşürmek tedavi değildir.",
    "differentialNote": "SIRS enfeksiyon dışı nedenlerle de olabilir; sepsiste enfeksiyon ve organ disfonksiyonu/hipoperfüzyon mantığı aranır."
  },
  "tus-pearl-internal-medicine-145-keywords": {
    "front": "Yeterli sıvı resüsitasyonuna rağmen septik şokta ortalama arter basıncı düşük kalırsa ilk tercih vazopressör hangisidir?",
    "keywords": [
      "septik şok",
      "norepinefrin",
      "vazopressör",
      "MAP"
    ],
    "back": "Norepinefrin.",
    "answer": "Norepinefrin ilk tercih vazopressördür.",
    "explanation": "Septik şokta vazodilatasyon ve kapiller kaçak nedeniyle perfüzyon basıncı düşer. Kristaloid resüsitasyona rağmen hipotansiyon sürüyorsa norepinefrin alfa-adrenerjik vazokonstriksiyonla damar tonusunu artırır ve hedef perfüzyon basıncını destekler. Vazopressör tedavisi antibiyotik, sıvı ve kaynak kontrolünün yerine geçmez; onlarla birlikte uygulanır.",
    "tusTip": "Septik şokta sıvıya dirençli hipotansiyonun klasik vazopressörü norepinefrindir.",
    "differentialNote": "Dopamin aritmi riski ve seçilmiş hasta gerekliliği nedeniyle rutin ilk seçenek değildir."
  },
  "tus-pearl-internal-medicine-145-extra": {
    "front": "Sepsiste laktat yüksekliği klinik olarak hangi dolaşım bozukluğunu düşündürür?",
    "keywords": [
      "sepsis",
      "laktat",
      "hipoperfüzyon",
      "doku oksijenasyonu"
    ],
    "back": "Doku hipoperfüzyonu ve anaerobik metabolizma artışı.",
    "answer": "Doku hipoperfüzyonu göstergesi olarak yorumlanır.",
    "explanation": "Laktat yüksekliği sepsiste mikrosirkülasyon bozukluğu, doku oksijen kullanım kusuru ve hipoperfüzyonla ilişkilidir. Bu nedenle sadece tanısal değil, resüsitasyon yanıtını izleme açısından da değerlidir. Laktat normal olsa bile sepsis dışlanmaz; klinik organ disfonksiyonu birlikte değerlendirilir.",
    "tusTip": "Sepsiste laktat, tansiyon kadar perfüzyonun biyokimyasal ipucudur.",
    "differentialNote": "Laktat nöbet, karaciğer yetmezliği veya beta agonistlerle de artabilir; sepsiste enfeksiyon ve hipoperfüzyon bağlamı belirleyicidir."
  },
  "tus-pearl-internal-medicine-146-spot": {
    "front": "Pulmoner embolide hipotansiyon veya şok varlığı risk sınıflamasını nasıl değiştirir?",
    "keywords": [
      "pulmoner emboli",
      "hemodinamik instabilite",
      "yüksek risk",
      "şok"
    ],
    "back": "Hasta yüksek riskli pulmoner emboli kabul edilir.",
    "answer": "Hemodinamik instabil PE, yüksek riskli PE olarak değerlendirilir.",
    "explanation": "Pulmoner embolide hipotansiyon sağ ventrikül yüklenmesi ve dolaşım çöküşü riskini gösterir. Hemodinamik instabilite varsa risk sınıflaması doğrudan yüksek risk yönüne kayar ve tedavi kararı daha acil hale gelir. Stabil hastalarda ise görüntüleme, sağ ventrikül bulguları ve biyobelirteçlerle risk ayrımı yapılır.",
    "tusTip": "PE’de şok/hipotansiyon varsa risk sınıflamasında en kritik veri hemodinamik instabilitedir.",
    "differentialNote": "Stabil PE’de antikoagülasyon ana tedavidir; instabil PE’de reperfüzyon tedavisi gündeme gelir."
  },
  "tus-pearl-internal-medicine-146-extra": {
    "front": "Hemodinamik instabil pulmoner embolide kontrendikasyon yoksa hangi reperfüzyon tedavisi düşünülür?",
    "keywords": [
      "yüksek riskli PE",
      "trombolitik",
      "hemodinamik instabilite",
      "reperfüzyon"
    ],
    "back": "Sistemik trombolitik tedavi.",
    "answer": "Sistemik tromboliz.",
    "explanation": "Yüksek riskli PE’de sağ ventrikül akut basınç yükü altında kalır ve kardiyojenik şok gelişebilir. Kontrendikasyon yoksa sistemik tromboliz pıhtı yükünü hızla azaltmayı hedefler. Kanama riski yüksekse kateter temelli veya cerrahi seçenekler klinik duruma göre değerlendirilir.",
    "tusTip": "PE’de tromboliz kararı stabil hastadan çok şok/hipotansiyon varlığıyla ilişkilidir.",
    "differentialNote": "Submasif PE’de sağ ventrikül disfonksiyonu olabilir ama rutin tromboliz kararı kanama riski nedeniyle daha seçicidir."
  },
  "tus-pearl-internal-medicine-147-spot": {
    "front": "Pulmoner arteriyel hipertansiyonda akut vazoreaktivite testi pozitifliği gösterilmeden kalsiyum kanal blokeri başlanması neden riskli bir tuzaktır?",
    "keywords": [
      "pulmoner hipertansiyon",
      "vazoreaktivite testi",
      "kalsiyum kanal blokeri",
      "verapamil"
    ],
    "back": "Vazoreaktivite kanıtı yoksa yarar sınırlı, hipotansiyon/sağ kalp yetmezliği riski artabilir.",
    "answer": "Kalsiyum kanal blokerleri yalnız seçilmiş vazoreaktif PAH hastalarında düşünülmelidir.",
    "explanation": "Pulmoner arteriyel hipertansiyon heterojen bir hastalıktır; yüksek doz kalsiyum kanal blokerlerinden fayda gören grup küçüktür ve akut vazoreaktivite ile seçilir. Vazoreaktivite yoksa ampirik verapamil/diltiazem gibi ilaçlar sistemik hipotansiyon ve sağ ventrikül dekompansasyonunu ağırlaştırabilir. Bu nedenle tanı ve tedavi planı uzman merkez mantığıyla kurulmalıdır.",
    "tusTip": "PAH’de kalsiyum kanal blokeri ancak vazoreaktivite pozitif özel grupta sınav cevabıdır.",
    "differentialNote": "Sol kalp hastalığına bağlı pulmoner hipertansiyonda tedavi PAH ilaçları değil altta yatan sol kalp patolojisinin yönetimidir."
  },
  "tus-pearl-internal-medicine-147-extra": {
    "front": "Pulmoner arteriyel hipertansiyon tanısını kesinleştiren ve hemodinamik sınıflamayı sağlayan temel yöntem nedir?",
    "keywords": [
      "pulmoner arteriyel hipertansiyon",
      "sağ kalp kateterizasyonu",
      "hemodinami",
      "tanı"
    ],
    "back": "Sağ kalp kateterizasyonu.",
    "answer": "Sağ kalp kateterizasyonu.",
    "explanation": "Ekokardiyografi pulmoner hipertansiyondan şüphelendirir ancak basınçları ve vasküler dirençleri kesinleştirme açısından tanısal altın standart değildir. Sağ kalp kateterizasyonu pulmoner arter basıncı, wedge basıncı ve pulmoner vasküler direnç ölçümüyle PAH ayrımını sağlar. Tedavi seçimi bu hemodinamik sınıflamaya dayanır.",
    "tusTip": "EKO şüphelendirir; PAH tanısını hemodinamik olarak sağ kalp kateterizasyonu netleştirir.",
    "differentialNote": "Yüksek wedge basıncı sol kalp kaynaklı pulmoner hipertansiyon lehinedir; PAH prekapiller patern gösterir."
  },
  "tus-pearl-internal-medicine-148-spot": {
    "front": "TSH düşük, serbest T4 yüksek, radyoaktif iyot tutulumu düşük ve tiroglobulin düşükse hangi tirotoksikoz nedeni düşünülür?",
    "keywords": [
      "tirotoksikozis faktitisya",
      "düşük tiroglobulin",
      "düşük Rtutulumu",
      "ekzojen hormon"
    ],
    "back": "Tirotoksikozis faktitisya.",
    "answer": "Ekzojen tiroid hormonu alımına bağlı tirotoksikozis faktitisya.",
    "explanation": "Tirotoksikozis faktitisyada hormon fazlalığı tiroid bezinin aşırı üretiminden değil dışarıdan hormon alınmasından kaynaklanır. Bu nedenle TSH baskılanır ve T4 yüksek olur; ancak tiroid bezi aktif üretim yapmadığı için radyoaktif iyot tutulumu ve tiroglobulin düşüktür. Bu patern Graves ve tiroiditten ayırımda değerlidir.",
    "tusTip": "Düşük R+ düşük tiroglobulin ekzojen hormon alımını düşündürür.",
    "differentialNote": "Subakut tiroiditte Rdüşüktür ama tiroglobulin genellikle artar ve ağrılı tiroid/ESR yüksekliği beklenir."
  },
  "tus-pearl-internal-medicine-148-extra": {
    "front": "Subakut tiroiditi tirotoksikozis faktitisyadan ayıran klasik klinik-laboratuvar ipucu nedir?",
    "keywords": [
      "subakut tiroidit",
      "ağrılı tiroid",
      "ESR",
      "tirotoksikozis faktitisya"
    ],
    "back": "Ağrılı tiroid bezi ve yüksek sedimentasyon.",
    "answer": "Ağrılı/tender tiroid ve belirgin inflamasyon bulguları.",
    "explanation": "Subakut tiroiditte folikül yıkımı depolanmış hormonun kana salınmasına neden olur; bu yüzden geçici tirotoksikoz ve düşük Rtutulumu görülebilir. Ancak inflamatuvar süreç nedeniyle boyun ağrısı, hassas tiroid ve yüksek ESR beklenir. Faktitisyada ise ekzojen hormon alımı nedeniyle tiroglobulin düşüklüğü daha ayırt ettiricidir.",
    "tusTip": "Düşük Riki tabloda da olabilir; ağrı/ESR subakut tiroiditi, düşük tiroglobulin faktitisyayı destekler.",
    "differentialNote": "Graves’te Rtutulumu genellikle artar ve oftalmopati eşlik edebilir."
  },
  "tus-pearl-internal-medicine-149-spot": {
    "front": "Dirençli hipertansiyon, abdominal üfürüm, böbrek fonksiyonunda ACE inhibitörü sonrası bozulma veya flash akciğer ödemi hangi tanıyı düşündürür?",
    "keywords": [
      "renovasküler hipertansiyon",
      "renal arter stenozu",
      "abdominal üfürüm",
      "flash akciğer ödemi"
    ],
    "back": "Renovasküler hipertansiyon.",
    "answer": "Renal arter stenozuna bağlı renovasküler hipertansiyon.",
    "explanation": "Renal arter stenozunda böbrek perfüzyonu azalır ve RAAS aktivasyonu hipertansiyonu sürdürür. Bilateral stenoz veya tek böbrekte stenoz varsa ACE inhibitörü/ARB sonrası GFR belirgin düşebilir. Flash akciğer ödemi ve abdominal üfürüm bu tanıyı klasik sınav bağlamına taşır.",
    "tusTip": "Dirençli HT + abdominal üfürüm + ACEİ sonrası kreatinin artışı renovasküler HT düşündürür.",
    "differentialNote": "Primer hiperaldosteronizmde renin baskılıdır; renovasküler hipertansiyonda renin aktivasyonu beklenir."
  },
  "tus-pearl-internal-medicine-149-extra": {
    "front": "Renovasküler hipertansiyon şüphesinde renal arterleri noninvaziv değerlendirmek için hangi görüntüleme yöntemleri kullanılabilir?",
    "keywords": [
      "renovasküler hipertansiyon",
      "BT anjiyografi",
      "MR anjiyografi",
      "renal arter"
    ],
    "back": "BT anjiyografi veya MR anjiyografi.",
    "answer": "Renal arter BT/MR anjiyografi.",
    "explanation": "Renovasküler hipertansiyonda amaç renal arter darlığını yapısal olarak göstermektir. BT anjiyografi ve MR anjiyografi noninvaziv olarak damar lümenini değerlendirebilir; böbrek fonksiyonu ve kontrast riski yöntem seçiminde dikkate alınır. Doppler ultrason da uygun hastada tarama amacıyla kullanılabilir.",
    "tusTip": "Renovasküler HT’de görüntüleme damar darlığını göstermeye yöneliktir; yalnız kreatinin tanı koydurmaz.",
    "differentialNote": "Endokrin hipertansiyonlarda hormon testleri ön plandayken renovasküler tabloda vasküler görüntüleme daha belirleyicidir."
  },
  "tus-pearl-internal-medicine-150-spot": {
    "front": "Katı ve sıvı gıdalara birlikte disfaji, regürjitasyon ve baryum grafide kuş gagası görünümü hangi özofagus motor bozukluğunu düşündürür?",
    "keywords": [
      "akalazya",
      "katı ve sıvı disfaji",
      "kuş gagası",
      "LES gevşeme kusuru"
    ],
    "back": "Akalazya.",
    "answer": "Akalazya.",
    "explanation": "Akalazyada alt özofagus sfinkteri yeterli gevşeyemez ve özofagus peristaltizmi bozulur. Bu nedenle yalnız katı değil sıvı gıdalarda da disfaji erken dönemde belirgindir. Regürjitasyon ve kuş gagası görünümü tanıyı destekler; maligniteye bağlı psödoakalazya yaşlı ve hızlı kilo kaybı olan hastada akılda tutulmalıdır.",
    "tusTip": "Katı+sıvı disfaji başlangıçtan beri varsa motilite bozukluğu düşün; sadece katıyla başlayan disfaji mekanik darlığa daha yakındır.",
    "differentialNote": "Özofagus kanserinde disfaji genellikle önce katı gıdalarla başlar ve progresif seyreder."
  },
  "tus-pearl-internal-medicine-150-extra": {
    "front": "Akalazya tanısını kesinleştiren temel fonksiyonel test nedir?",
    "keywords": [
      "akalazya",
      "özofagus manometrisi",
      "LES",
      "peristaltizm"
    ],
    "back": "Özofagus manometrisi.",
    "answer": "Yüksek çözünürlüklü özofagus manometrisi.",
    "explanation": "Baryum grafi ve endoskopi akalazyadan şüphelendirir veya mekanik tıkanıklığı dışlamaya yardım eder. Tanıyı kesinleştiren test manometridir; LES gevşeme kusuru ve aperistaltizm gösterilir. Endoskopi özellikle malign psödoakalazyayı dışlamak için önemlidir.",
    "tusTip": "Akalazyada görüntüleme ipucu verir; kesin tanı manometriyle konur.",
    "differentialNote": "GERD’de LES gevşekliği ve reflü ön plandadır; akalazyada LES gevşeyemediği için disfaji/regürjitasyon oluşur."
  },
  "tus-pearl-internal-medicine-151-spot": {
    "front": "Ülseratif kolitli hastada kaşıntı, kolestatik enzim yüksekliği ve safra yollarında multifokal darlık-genişleme paterni hangi hastalığı düşündürür?",
    "keywords": [
      "primer sklerozan kolanjit",
      "ülseratif kolit",
      "kolestaz",
      "safra yolu darlığı"
    ],
    "back": "Primer sklerozan kolanjit.",
    "answer": "Primer sklerozan kolanjit.",
    "explanation": "PSC intrahepatik ve ekstrahepatik safra yollarında inflamatuvar fibrozis ve segmental darlıklar oluşturur. Ülseratif kolit ile güçlü ilişkisi sınavda klasik ipucudur. Kolestatik patern ALP/GGT yüksekliğiyle belirginleşir; hastalık kolanjit, siroz ve kolanjiyokarsinom riskini artırır.",
    "tusTip": "Ülseratif kolit + kolestaz = PSC akla gelmelidir.",
    "differentialNote": "Primer biliyer kolanjit daha çok orta yaş kadınlarda AMA pozitifliği ve küçük intrahepatik safra kanalı tutulumu ile sorulur."
  },
  "tus-pearl-internal-medicine-151-extra": {
    "front": "Primer sklerozan kolanjitte safra yolu darlıklarını değerlendirmede tercih edilen noninvaziv görüntüleme nedir?",
    "keywords": [
      "PSC",
      "MRCP",
      "safra yolları",
      "kolestaz"
    ],
    "back": "MR kolanjiyopankreatografi.",
    "answer": "MRCP.",
    "explanation": "MRCP safra yollarındaki çok odaklı darlık ve genişlemeleri invaziv girişim yapmadan gösterebilir. ERCP tanısal olmaktan çok seçilmiş terapötik durumlarda veya darlık müdahalesinde kullanılır. Kolestatik enzim yüksekliği ve ülseratif kolit öyküsü MRCP endikasyonunu güçlendirir.",
    "tusTip": "PSC’de tanısal görüntüleme için MRCP, terapötik gerekirse ERCP düşünülür.",
    "differentialNote": "Safra taşı obstrüksiyonunda tek odaklı mekanik tıkanma daha olasıdır; PSC multifokal darlıklarla karakterizedir."
  },
  "tus-pearl-internal-medicine-152-spot": {
    "front": "Anemiye retikülositoz, LDH ve indirekt bilirubin yüksekliği, haptoglobin düşüklüğü ve direkt Coombs pozitifliği eşlik ediyorsa hangi tanı öne çıkar?",
    "keywords": [
      "otoimmün hemolitik anemi",
      "direkt Coombs",
      "hemoliz",
      "haptoglobin"
    ],
    "back": "Otoimmün hemolitik anemi.",
    "answer": "Direkt Coombs pozitif otoimmün hemolitik anemi.",
    "explanation": "Hemolizde eritrosit yıkımı nedeniyle LDH ve indirekt bilirubin yükselir, haptoglobin düşer ve kemik iliği yanıtı olarak retikülositoz gelişir. Direkt Coombs testinin pozitif olması eritrosit yüzeyine bağlanmış antikor veya komplemanı gösterir. Bu bulgu nonimmün hemolizlerden ayırımda değerlidir.",
    "tusTip": "Hemoliz laboratuvarı + direkt Coombs pozitifliği immün hemoliz lehinedir.",
    "differentialNote": "G6PD eksikliği veya mikroanjiyopatik hemolizde hemoliz bulguları olabilir; ancak direkt Coombs genellikle negatiftir."
  },
  "tus-pearl-internal-medicine-152-extra": {
    "front": "Sıcak otoimmün hemolitik anemide eritrositlere en sık bağlanan antikor sınıfı hangisidir?",
    "keywords": [
      "sıcakHA",
      "IgG",
      "ekstravasküler hemoliz",
      "dalak"
    ],
    "back": "IgG.",
    "answer": "IgG tipi otoantikor.",
    "explanation": "SıcakHA’da IgG kaplı eritrositler özellikle dalak makrofajları tarafından tanınır ve ekstravasküler hemoliz gelişir. Bu nedenle splenomegali ve indirekt hiperbilirubinemi görülebilir. Soğuk aglutinin hastalığında ise IgM ve kompleman aracılı süreç daha ön plandadır.",
    "tusTip": "SıcakHA = IgG; soğuk aglutinin = IgM/kompleman ilişkisi şeklinde ayrılır.",
    "differentialNote": "Soğuk aglutinin hastalığı düşük ısıda semptom verir ve akrosiyanozla sorulabilir; sıcakHA daha çok IgG ile ekstravasküler hemoliz yapar."
  },
  "tus-pearl-internal-medicine-171-spot": {
    "front": "ALP ve GGT belirgin yüksek, AST/ALT artışı daha sınırlıysa baskın karaciğer biyokimyası paterni nasıl adlandırılır?",
    "keywords": [
      "kolestatik patern",
      "ALP",
      "GGT",
      "AST ALT"
    ],
    "back": "Kolestatik patern.",
    "answer": "Kolestatik karaciğer enzim paterni.",
    "explanation": "Kolestazda safra akımı veya safra yolu epitel hasarı ön plandadır; bu nedenle ALP ve GGT artışı aminotransferaz artışından daha baskındır. GGT yüksekliği ALP’nin hepatobiliyer kaynaklı olduğunu destekler. Bu patern görüldüğünde intrahepatik kolestaz ile ekstrahepatik obstrüksiyon ayrımı klinik ve görüntüleme ile yapılır.",
    "tusTip": "ALP+GGT baskınlığı kolestazı; AST/ALT baskınlığı hepatoselüler hasarı düşündürür.",
    "differentialNote": "İzole ALP yüksekliği kemik kaynaklı olabilir; GGT eşlik ediyorsa hepatobiliyer kaynak güçlenir."
  }
}
);
