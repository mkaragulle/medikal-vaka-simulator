// V408 — Medical Pathology first 84 active Hap Bilgi cards: high-yield morphology/pathogenesis rewrite.
// Scope guard: only IDs listed here are overridden; branch/order/schema metadata remain unchanged.
export const TUS_PEARL_MEDICAL_PATHOLOGY_FIRST84_TEXT_OVERRIDES = Object.freeze(
{
  "tus-pearl-medical-pathology-037-spot": {
    "front": "İskemik miyokard veya böbrek infarktında hücre ölümü geliştiğinde, beyin dışındaki solid organlarda hangi nekroz paterni görülür?",
    "back": "Koagülasyon nekrozu.",
    "answer": "Koagülasyon nekrozu.",
    "explanation": "Koagülasyon nekrozunda protein denatürasyonu enzimatik sindirime baskın gelir; bu nedenle ölü hücrelerin ana hatları bir süre korunur. Miyokard, böbrek ve dalak infarktlarında klasik patern budur. Beyin iskemisi bu kuralın ana istisnasıdır.",
    "tusTip": "Solid organ iskemisi denince koagülasyon nekrozu; beyin iskemisi denince sıvılaşma nekrozu düşünülür.",
    "differentialNote": "Sıvılaşma nekrozunda doku enzimatik olarak parçalanır ve yapı kaybolur; koagülasyon nekrozunda doku mimarisi geçici olarak seçilebilir.",
    "keywords": [
      "koagülasyon nekrozu",
      "solid organ infarktı",
      "protein denatürasyonu",
      "beyin istisnası"
    ]
  },
  "tus-pearl-medical-pathology-037-extra": {
    "front": "Koagülasyon nekrozunda ölü dokunun mimarisinin bir süre korunmasını açıklayan temel patolojik mekanizma nedir?",
    "back": "Yapısal proteinlerin ve proteolitik enzimlerin denatürasyonu.",
    "answer": "Yapısal proteinlerin ve proteolitik enzimlerin denatürasyonu.",
    "explanation": "İskemi hücresel ATP kaybı ve membran hasarı oluşturur; fakat proteolitik enzimler de denatüre olduğu için doku hemen sindirilemez. Bu yüzden hücre çekirdekleri kaybolsa bile hücre sınırları ve organ mimarisi erken dönemde korunur.",
    "tusTip": "Koagülasyon nekrozunda 'hayalet hücre' mantığı, yapı korunması ama canlılığın kaybıdır.",
    "differentialNote": "Apoptozda tek tek hücre ölümü ve inflamasyon yokluğu beklenir; koagülasyon nekrozu doku alanı ölümü ve inflamasyonla gider.",
    "keywords": [
      "protein denatürasyonu",
      "hayalet hücre",
      "iskemi",
      "proteolitik enzim"
    ]
  },
  "tus-pearl-medical-pathology-038-spot": {
    "front": "İskemik beyin dokusu veya bakteriyel apse odağında doku yapısının hızla eriyip sıvı içerik kazanması hangi nekroz tipini gösterir?",
    "back": "Sıvılaşma nekrozu.",
    "answer": "Sıvılaşma nekrozu.",
    "explanation": "Sıvılaşma nekrozunda enzimatik sindirim protein denatürasyonundan baskındır ve doku mimarisi kaybolur. Beyinde yüksek lipid içeriği ve zayıf stromal destek bu paterni kolaylaştırır; apsede ise nötrofil enzimleri dokuyu eritir.",
    "tusTip": "Beyin infarktı ve apse, sıvılaşma nekrozunun iki klasik sınav bağlamıdır.",
    "differentialNote": "Böbrek veya miyokard infarktı genellikle koagülasyon nekrozu yapar; beyin infarktı bu genel kuraldan ayrılır.",
    "keywords": [
      "sıvılaşma nekrozu",
      "beyin infarktı",
      "apse",
      "nötrofil enzimleri"
    ]
  },
  "tus-pearl-medical-pathology-038-extra": {
    "front": "Bakteriyel apsede püy oluşumu hangi hücresel olay nedeniyle sıvılaşma nekrozuna yol açar?",
    "back": "Nötrofillerden salınan lizozomal enzimlerle dokunun sindirilmesi.",
    "answer": "Nötrofillerden salınan lizozomal enzimlerle dokunun sindirilmesi.",
    "explanation": "Akut piyojenik inflamasyonda nötrofiller mikroorganizmaları öldürürken çevre dokuyu da proteolitik enzimlerle parçalar. Nekrotik hücre kalıntıları, nötrofiller ve sıvı eksüda birleşerek püyü oluşturur.",
    "tusTip": "Apse sorusunda püy + nötrofil + doku erimesi üçlüsü sıvılaşma nekrozuna götürür.",
    "differentialNote": "Kazeifikasyon nekrozunda merkez amorf ve peynirimsidir; apse ise nötrofil ağırlıklı sıvı-pürülan içerikle ayrılır.",
    "keywords": [
      "apse",
      "püy",
      "nötrofil",
      "lizozomal enzim"
    ]
  },
  "tus-pearl-medical-pathology-039-spot": {
    "front": "Merkezinde amorf, hücresiz ve peynirimsi nekroz bulunan granülomatöz inflamasyon en klasik olarak hangi nekroz tipini düşündürür?",
    "back": "Kazeifikasyon nekrozu.",
    "answer": "Kazeifikasyon nekrozu.",
    "explanation": "Kazeifikasyon nekrozu özellikle tüberkülozda epiteloid histiyositler ve dev hücrelerle çevrili nekrotik granülom merkezini tanımlar. Mikroskopide doku mimarisi tamamen silinir ve granüler-eozinofilik amorf materyal görülür.",
    "tusTip": "Kazeifiye granülom denince önce tüberküloz; nonkazeifiye granülom denince sarkoidoz akla gelir.",
    "differentialNote": "Sıvılaşma nekrozu apse veya beyin infarktıyla; fibrinoid nekroz damar duvarı hasarıyla ilişkilidir.",
    "keywords": [
      "kazeifikasyon nekrozu",
      "tüberküloz",
      "granülom",
      "amorf eozinofilik merkez"
    ]
  },
  "tus-pearl-medical-pathology-039-extra": {
    "front": "Tüberküloz granülomunda Langhans tipi dev hücreler ve epiteloid histiyositler hangi nekrotik merkez etrafında dizilir?",
    "back": "Kazeifikasyon nekrozu etrafında.",
    "answer": "Kazeifikasyon nekrozu etrafında.",
    "explanation": "T hücre aracılı makrofaj aktivasyonu epiteloid histiyositleri ve dev hücreleri oluşturur; merkezde hipoksi ve hücre ölümüyle kazeifiye materyal birikir. Bu düzen, enfeksiyöz granülomu ayırt ettiren temel morfolojik paterndir.",
    "tusTip": "Granülom + merkezde kazeifikasyon + Langhans dev hücresi, patolojide klasik tüberküloz üçlüsüdür.",
    "differentialNote": "Sarkoidozda granülomlar çoğunlukla nonkazeifiyedir; belirgin nekrotik merkez tüberküloz veya bazı fungal enfeksiyonlar lehinedir.",
    "keywords": [
      "Langhans dev hücresi",
      "epiteloid histiyosit",
      "T hücre yanıtı",
      "tüberküloz granülomu"
    ]
  },
  "tus-pearl-medical-pathology-040-spot": {
    "front": "Akut pankreatitte çevre yağ dokusunda tebeşirimsi beyaz odaklar ve kalsiyum sabunları oluşması hangi nekroz tipini gösterir?",
    "back": "Enzimatik yağ nekrozu.",
    "answer": "Enzimatik yağ nekrozu.",
    "explanation": "Pankreatik lipazlar trigliseridleri serbest yağ asitlerine parçalar; bu yağ asitleri kalsiyumla birleşerek sabunlaşma odakları oluşturur. Bu nedenle akut pankreatitte yağ nekrozu hipokalsemiyle de ilişkilendirilebilir.",
    "tusTip": "Pankreatit + lipaz + sabunlaşma + hipokalsemi, enzimatik yağ nekrozunun yüksek verimli paternidir.",
    "differentialNote": "Travmatik yağ nekrozu memede kitle ve kalsifikasyonla maligniteyi taklit edebilir; pankreatitte mekanizma enzimatik lipaz hasarıdır.",
    "keywords": [
      "enzimatik yağ nekrozu",
      "akut pankreatit",
      "sabunlaşma",
      "hipokalsemi"
    ]
  },
  "tus-pearl-medical-pathology-040-extra": {
    "front": "Memede travma sonrası sert kitle ve kalsifikasyon geliştiğinde, maligniteyi taklit edebilen patolojik süreç nedir?",
    "back": "Travmatik yağ nekrozu.",
    "answer": "Travmatik yağ nekrozu.",
    "explanation": "Adipoz dokunun hasarı yağ hücrelerinin parçalanmasına, inflamasyona ve fibrozise yol açar. Ortaya çıkan sert nodüler alan klinik ve radyolojik olarak meme karsinomunu taklit edebilir; tanıda histolojik değerlendirme ayırıcıdır.",
    "tusTip": "Memede travma sonrası kitle, yağ nekrozu ile kanser taklidini düşündüren klasik patoloji tuzağıdır.",
    "differentialNote": "Enzimatik yağ nekrozu pankreatit bağlamında lipaz aracılıdır; travmatik yağ nekrozu lokal doku hasarı ve fibrozisle öne çıkar.",
    "keywords": [
      "travmatik yağ nekrozu",
      "meme kitlesi",
      "fibrozis",
      "kanser taklidi"
    ]
  },
  "tus-pearl-medical-pathology-041-spot": {
    "front": "İmmün kompleks vaskülitinde damar duvarında parlak eozinofilik fibrin benzeri materyal birikmesi hangi nekroz tipidir?",
    "back": "Fibrinoid nekroz.",
    "answer": "Fibrinoid nekroz.",
    "explanation": "Fibrinoid nekroz damar duvarında immün kompleks, kompleman ve plazma proteinlerinin birikmesiyle oluşur. Histolojide duvarın yapısı bozulur ve yoğun eozinofilik, fibrin benzeri görünüm kazanır.",
    "tusTip": "Damar duvarı + immün kompleks/şiddetli hipertansiyon + eozinofilik fibrin benzeri materyal, fibrinoid nekrozdur.",
    "differentialNote": "Kazeifikasyon nekrozu granülom merkezinde; yağ nekrozu adipoz dokuda; fibrinoid nekroz ise damar duvarında düşünülür.",
    "keywords": [
      "fibrinoid nekroz",
      "vaskülit",
      "immün kompleks",
      "damar duvarı"
    ]
  },
  "tus-pearl-medical-pathology-041-extra": {
    "front": "Malign hipertansiyonda arteriol duvarında nekroz ve plazma protein sızıntısı görülmesi hangi histopatolojik değişiklikle uyumludur?",
    "back": "Fibrinoid nekroz.",
    "answer": "Fibrinoid nekroz.",
    "explanation": "Çok yüksek basınç endotel hasarı oluşturur ve plazma proteinleri damar duvarına sızar. Bu süreç damar duvarında fibrin benzeri eozinofilik materyal, nekroz ve lümen daralmasıyla sonuçlanır.",
    "tusTip": "Malign hipertansiyon böbrek arteriollerinde fibrinoid nekroz ve hiperplastik arteriolosklerozla sorulabilir.",
    "differentialNote": "Benign hipertansiyonda hiyalin arterioloskleroz beklenir; malign hipertansiyonda nekrotizan damar hasarı daha belirgindir.",
    "keywords": [
      "malign hipertansiyon",
      "arteriol",
      "endotel hasarı",
      "fibrin benzeri materyal"
    ]
  },
  "tus-pearl-medical-pathology-042-spot": {
    "front": "Tek tek hücrelerin küçülerek apoptotik cisimciklere ayrıldığı, membran bütünlüğünün korunduğu ve belirgin inflamasyon gelişmediği ölüm tipi nedir?",
    "back": "Apoptoz.",
    "answer": "Apoptoz.",
    "explanation": "Apoptoz kaspazlarla yürüyen programlı hücre ölümüdür; hücre içeriği çevreye saçılmadığı için inflamasyon minimaldir. Morfolojik olarak hücre küçülmesi, kromatin kondensasyonu ve apoptotik cisimcikler beklenir.",
    "tusTip": "İnflamasyon yokluğu + apoptotik cisimcik + kaspaz aktivasyonu, apoptozun temel ayırt ettiricisidir.",
    "differentialNote": "Nekrozda membran bütünlüğü bozulur, hücre şişer ve inflamasyon gelişir; apoptoz kontrollü ve tek hücre düzeyinde ilerler.",
    "keywords": [
      "apoptoz",
      "kaspaz",
      "apoptotik cisimcik",
      "inflamasyon yok"
    ]
  },
  "tus-pearl-medical-pathology-042-extra": {
    "front": "Mitokondri dış membran permeabilitesinin artması ve sitokrom c salınımı apoptozun hangi yolunu başlatır?",
    "back": "İntrinsik mitokondriyal apoptoz yolu.",
    "answer": "İntrinsik mitokondriyal apoptoz yolu.",
    "explanation": "DNA hasarı veya büyüme faktörü eksikliği BAX/BAK aktivasyonunu artırıp mitokondriden sitokrom c salınmasına yol açar. Sitokrom c Apaf-1 ile apoptosom oluşturur ve başlatıcı kaspaz-9 üzerinden yürütücü kaspazları aktive eder.",
    "tusTip": "İntrinsik yol mitokondri-sitokrom c-kaspaz 9; ekstrinsik yol Fas/TNF-kaspaz 8 üzerinden hatırlanır.",
    "differentialNote": "BCL-2 antiapoptotik etkiyle sitokrom c salınımını engeller; bu nedenle bazı lenfomalarda hücre yaşamını uzatır.",
    "keywords": [
      "intrinsik apoptoz",
      "sitokrom c",
      "BAX",
      "kaspaz 9"
    ]
  },
  "tus-pearl-medical-pathology-043-spot": {
    "front": "Ekstraselüler protein birikiminin Congo red boyasıyla elma yeşili çift kırınım vermesi hangi patolojik birikimi gösterir?",
    "back": "Amiloid birikimi.",
    "answer": "Amiloid birikimi.",
    "explanation": "Amiloid yanlış katlanmış proteinlerin beta-kıvrımlı tabaka yapısında ekstraselüler birikmesidir. Congo red ile boyanıp polarize ışıkta elma yeşili çift kırınım vermesi tanısal morfolojik ipucudur.",
    "tusTip": "Congo red + elma yeşili çift kırınım, amiloidoz için klasik patoloji bilgisidir.",
    "differentialNote": "Hiyalin değişiklik yalnızca camsı-eozinofilik görünümü anlatır; amiloid tanısı için özgül boyanma ve çift kırınım önemlidir.",
    "keywords": [
      "amiloid",
      "Congo red",
      "elma yeşili çift kırınım",
      "beta-pleated sheet"
    ]
  },
  "tus-pearl-medical-pathology-043-extra": {
    "front": "Plazma hücre diskrazisinde immünoglobulin hafif zincirlerinden gelişen amiloidoz tipi hangisidir?",
    "back": "AL amiloidoz.",
    "answer": "AL amiloidoz.",
    "explanation": "AL amiloidozda monoklonal plazma hücreleri tarafından üretilen hafif zincirler yanlış katlanarak dokularda birikir. AA amiloidoz ise kronik inflamasyonda serum amiloid A proteininden gelişir.",
    "tusTip": "AL = light chain/plazma hücre hastalığı; AA = chronic inflammation/serum amiloid A şeklinde ayırt edilir.",
    "differentialNote": "Multipl miyelomla ilişkili amiloidoz AL tipidir; kronik enfeksiyon veya romatizmal hastalık zemininde AA tipi beklenir.",
    "keywords": [
      "AL amiloidoz",
      "hafif zincir",
      "plazma hücre diskrazisi",
      "AA amiloidoz"
    ]
  },
  "tus-pearl-medical-pathology-044-spot": {
    "front": "Kronik gastroözofageal reflü zemininde distal özofagus çok katlı yassı epitelinin goblet hücreli intestinal kolumnar epitele dönüşmesi hangi lezyondur?",
    "back": "Barrett özofagusu.",
    "answer": "Barrett özofagusu.",
    "explanation": "Barrett özofagusu adaptif metaplazidir; skuamöz epitel asit hasarına daha dayanıklı intestinal tip kolumnar epitele dönüşür. Bu metaplazi displazi ve özofagus adenokarsinomu için premalign zemin oluşturur.",
    "tusTip": "Distal özofagus + GERD + goblet hücreli intestinal metaplazi, Barrett özofagusudur.",
    "differentialNote": "Özofagus skuamöz hücreli karsinomu daha çok sigara/alkol ve orta özofagusla ilişkilidir; Barrett adenokarsinom riskini artırır.",
    "keywords": [
      "Barrett özofagusu",
      "GERD",
      "intestinal metaplazi",
      "adenokarsinom riski"
    ]
  },
  "tus-pearl-medical-pathology-044-extra": {
    "front": "Barrett özofagusunda takip edilmesinin temel nedeni hangi histolojik ilerleme riskidir?",
    "back": "Displazi üzerinden özofagus adenokarsinomuna ilerleme riski.",
    "answer": "Displazi üzerinden özofagus adenokarsinomuna ilerleme riski.",
    "explanation": "Metaplastik epitel kronik hasar altında genetik değişiklikler biriktirerek displazi geliştirebilir. Displazi bazal membranı aşmadığı sürece preinvazivdir; invazyon gelişirse adenokarsinom tanısı gündeme gelir.",
    "tusTip": "Barrett’te sınav değeri metaplazi değil, metaplazi-displazi-adenokarsinom zinciridir.",
    "differentialNote": "Karsinoma in situ bazal membranı aşmaz; invaziv karsinom stromaya geçerek metastaz potansiyeli kazanır.",
    "keywords": [
      "displazi",
      "adenokarsinom",
      "premalign lezyon",
      "bazal membran"
    ]
  },
  "tus-pearl-medical-pathology-045-spot": {
    "front": "Tiroid tümöründe Orphan Annie göz nükleusu, nükleer yarıklanma ve psammoma cisimcikleri hangi karsinomu düşündürür?",
    "back": "Papiller tiroid karsinomu.",
    "answer": "Papiller tiroid karsinomu.",
    "explanation": "Papiller tiroid karsinomunda tanıyı çoğu zaman papiller mimariden çok nükleer özellikler belirler. Berrak görünümlü nükleus, nükleer groove, psödoinklüzyon ve psammoma cisimcikleri yüksek verimli morfolojik ipuçlarıdır.",
    "tusTip": "Papiller tiroid karsinomunda 'nükleer tanı' esastır: Orphan Annie + groove + psammoma.",
    "differentialNote": "Folliküler karsinom kapsül veya damar invazyonuyla tanınır; papiller karsinomda lenfatik yayılım ve nükleer bulgular öne çıkar.",
    "keywords": [
      "papiller tiroid karsinomu",
      "Orphan Annie",
      "nükleer groove",
      "psammoma cisimciği"
    ]
  },
  "tus-pearl-medical-pathology-045-extra": {
    "front": "Papiller tiroid karsinomunun folliküler karsinomdan ayrımında hangi yayılım ve morfoloji paterni daha tipiktir?",
    "back": "Lenfatik yayılım ve karakteristik nükleer özellikler.",
    "answer": "Lenfatik yayılım ve karakteristik nükleer özellikler.",
    "explanation": "Papiller tiroid karsinomu sıklıkla servikal lenf nodlarına lenfatik yolla yayılır ve tanıda nükleer berraklaşma, yarıklanma ve psammoma cisimcikleri önemlidir. Folliküler karsinomda ise hematolojik yayılım ve kapsül-damar invazyonu daha belirleyicidir.",
    "tusTip": "Papiller = lenfatik + nükleer groove; folliküler = hematolojik + kapsül/damar invazyonu.",
    "differentialNote": "Folliküler adenom-karsinom ayrımı sitolojik atipiyle değil, kapsül veya damar invazyonunun gösterilmesiyle yapılır.",
    "keywords": [
      "lenfatik yayılım",
      "folliküler karsinom",
      "kapsül invazyonu",
      "servikal lenf nodu"
    ]
  },
  "tus-pearl-medical-pathology-046-spot": {
    "front": "Sigara öyküsü olan hastada santral bronş kökenli, keratin incileri ve intersellüler köprüler gösteren akciğer tümörü hangisidir?",
    "back": "Akciğer skuamöz hücreli karsinomu.",
    "answer": "Akciğer skuamöz hücreli karsinomu.",
    "explanation": "Skuamöz hücreli karsinom genellikle santral yerleşir ve bronş epitelinde sigaraya bağlı skuamöz metaplazi-displazi zemininden gelişir. Keratinizasyon ve intersellüler köprüler mikroskobik ayırıcı özellikleridir.",
    "tusTip": "Santral akciğer kitle + keratin incisi + PTHrP hiperkalsemisi, skuamöz karsinom lehinedir.",
    "differentialNote": "Adenokarsinom daha çok periferik yerleşir ve glandüler/müsinöz diferansiyasyon gösterir; küçük hücreli karsinom nöroendokrin ve yüksek agresiftir.",
    "keywords": [
      "skuamöz hücreli karsinom",
      "sigara",
      "santral bronş",
      "keratin incisi"
    ]
  },
  "tus-pearl-medical-pathology-046-extra": {
    "front": "Bronş epitelinde sigaraya bağlı skuamöz metaplazi ve displazi gelişmesi hangi akciğer kanseri için klasik prekürsör zemindir?",
    "back": "Akciğer skuamöz hücreli karsinomu.",
    "answer": "Akciğer skuamöz hücreli karsinomu.",
    "explanation": "Kronik irritasyon siliyalı kolumnar epitelin skuamöz epitele dönüşmesine yol açar; devam eden hasar displazi ve invaziv skuamöz karsinoma ilerleyebilir. Bu süreç santral bronş yerleşimini açıklar.",
    "tusTip": "Metaplazi geri dönebilir; displazi ve invazyon eklendiğinde neoplazi riski belirginleşir.",
    "differentialNote": "Skuamöz metaplazi adenokarsinomun değil, santral skuamöz karsinomun klasik öncül ortamıdır.",
    "keywords": [
      "skuamöz metaplazi",
      "displazi",
      "bronş epiteli",
      "sigara"
    ]
  },
  "tus-pearl-medical-pathology-047-spot": {
    "front": "Santral yerleşimli, sigarayla güçlü ilişkili, nöroendokrin marker pozitif ve SIADH veya ektopik ACTH yapabilen akciğer tümörü hangisidir?",
    "back": "Küçük hücreli akciğer karsinomu.",
    "answer": "Küçük hücreli akciğer karsinomu.",
    "explanation": "Küçük hücreli karsinom yüksek dereceli nöroendokrin tümördür; kromogranin, sinaptofizin veya CD56 pozitifliği gösterebilir. Erken metastaz yaptığı için genellikle cerrahi değil sistemik tedavi yaklaşımıyla düşünülür.",
    "tusTip": "Santral + sigara + nöroendokrin + paraneoplastik SIADH/ACTH, küçük hücreli karsinom için ayırt ettiricidir.",
    "differentialNote": "Skuamöz karsinom keratin incisi ve PTHrP hiperkalsemisiyle; adenokarsinom periferik glandüler yapı/müsinle ayrılır.",
    "keywords": [
      "küçük hücreli karsinom",
      "nöroendokrin",
      "SIADH",
      "ektopik ACTH"
    ]
  },
  "tus-pearl-medical-pathology-047-extra": {
    "front": "Küçük hücreli akciğer karsinomunda cerrahi rezeksiyonun genellikle ön planda olmamasını açıklayan temel biyolojik özellik nedir?",
    "back": "Erken yayılım ve yüksek dereceli agresif nöroendokrin biyoloji.",
    "answer": "Erken yayılım ve yüksek dereceli agresif nöroendokrin biyoloji.",
    "explanation": "Bu tümör tanı anında çoğu kez yaygın hastalık düzeyindedir; küçük koyu mavi hücreler, yüksek mitoz, nekroz ve nöroendokrin diferansiyasyon gösterir. Bu nedenle tedavi mantığı lokal rezeksiyondan çok sistemik kemoterapi-radyoterapi eksenindedir.",
    "tusTip": "Küçük hücreli karsinom histolojik olarak agresif, klinik olarak erken metastatik kabul edilir.",
    "differentialNote": "Karsinoid tümör de nöroendokrindir fakat daha düşük dereceli, daha az mitotik ve paraneoplastik açıdan farklı seyirli olabilir.",
    "keywords": [
      "erken metastaz",
      "yüksek mitoz",
      "nöroendokrin tümör",
      "küçük mavi hücre"
    ]
  },
  "tus-pearl-medical-pathology-141-spot": {
    "front": "Beyin infarktı sonrası nekrotik dokunun makrofajlarla temizlenip kistik boşluk bırakması hangi nekroz paterninin sonucudur?",
    "back": "Sıvılaşma nekrozu.",
    "answer": "Sıvılaşma nekrozu.",
    "explanation": "Santral sinir sistemi infarktında enzimatik sindirim baskındır ve destekleyici stromal yapı azdır. Nekrotik alan mikroglia-makrofajlar tarafından temizlenir; geride sıvı dolu kistik boşluk ve gliozis kalabilir.",
    "tusTip": "Beyin infarktı, solid organ iskemisindeki koagülasyon kuralının en önemli istisnasıdır.",
    "differentialNote": "Miyokard infarktında skar gelişimi beklenirken beyin infarktında sıvılaşma ve kistik boşluk daha tipiktir.",
    "keywords": [
      "beyin infarktı",
      "sıvılaşma nekrozu",
      "mikroglia",
      "kistik boşluk"
    ]
  },
  "tus-pearl-medical-pathology-141-extra": {
    "front": "Beyin iskemisinde koagülasyon yerine sıvılaşma nekrozunun gelişmesini açıklayan temel doku özelliği nedir?",
    "back": "Yüksek lipid içeriği, yoğun enzimatik sindirim ve zayıf stromal destek.",
    "answer": "Yüksek lipid içeriği, yoğun enzimatik sindirim ve zayıf stromal destek.",
    "explanation": "Beyin dokusunda proteolitik/lipolitik sindirim dokunun yapısal bütünlüğünü hızla ortadan kaldırır. Kollajen destek az olduğu için ölü alan katı bir iskelet halinde korunmaz ve zamanla sıvılaşır.",
    "tusTip": "Beyinde infarkt sonrası beklenen sonlanım fibrotik skardan çok kistik boşluk ve gliozistir.",
    "differentialNote": "Böbrek ve dalakta infarkt alanı doku mimarisi korunarak koagülatif görünüm alır; beyin bu yönden ayrılır.",
    "keywords": [
      "yüksek lipid",
      "stromal destek azlığı",
      "gliozis",
      "enzimatik sindirim"
    ]
  },
  "tus-pearl-medical-pathology-175-spot": {
    "front": "Granülomatöz inflamasyonda nekrotik merkez belirginse, özellikle enfeksiyöz etkenler açısından hangi morfolojik tanımlama yapılır?",
    "back": "Kazeifiye granülom.",
    "answer": "Kazeifiye granülom.",
    "explanation": "Kazeifiye granülomda merkezde amorf nekrotik materyal, çevrede epiteloid histiyositler, dev hücreler ve lenfositler bulunur. Bu patern tüberküloz ve bazı fungal enfeksiyonlar için yüksek verimli ipucudur.",
    "tusTip": "Nekrotik merkez varlığı granülomu enfeksiyöz nedenler açısından daha uyarıcı hale getirir.",
    "differentialNote": "Nonkazeifiye granülom sarkoidoz, Crohn hastalığı veya berilyozis gibi durumlarda daha tipiktir; ancak klinik ve mikrobiyolojik bağlam şarttır.",
    "keywords": [
      "kazeifiye granülom",
      "enfeksiyöz granülom",
      "tüberküloz",
      "fungal enfeksiyon"
    ]
  },
  "tus-pearl-medical-pathology-175-extra": {
    "front": "Sarkoidoz granülomunu tüberküloz granülomundan ayırmada en temel histolojik ipucu nedir?",
    "back": "Sarkoidozda granülomların genellikle nonkazeifiye olması.",
    "answer": "Sarkoidozda granülomların genellikle nonkazeifiye olması.",
    "explanation": "Sarkoidozda iyi sınırlı epiteloid histiyosit granülomları bulunur fakat merkezde belirgin kazeöz nekroz beklenmez. Tüberkülozda nekrotik merkez ve etkeni gösterebilecek özel boyalar tanısal açıdan daha önemlidir.",
    "tusTip": "Granülom sorusunda 'nonkazeifiye' sarkoidoz lehine, 'kazeifiye' tüberküloz lehine güçlü ipucudur.",
    "differentialNote": "Crohn hastalığında da nonkazeifiye granülom görülebilir; organ bağlamı ve eşlik eden mukozal bulgular ayırıcıdır.",
    "keywords": [
      "sarkoidoz",
      "nonkazeifiye granülom",
      "tüberküloz",
      "özel boya"
    ]
  },
  "tus-pearl-medical-pathology-282-spot": {
    "front": "Kronik inflamasyonda epiteloid histiyositler, dev hücreler ve çevresel lenfositlerden oluşan organize odak hangi inflamasyon paternidir?",
    "back": "Granülomatöz inflamasyon.",
    "answer": "Granülomatöz inflamasyon.",
    "explanation": "Granülom, fagosite edilmesi zor etken veya yabancı maddeye karşı T hücre-makrofaj ekseninde gelişen organize kronik inflamasyon odağıdır. IFN-γ ile aktive olan makrofajlar epiteloid hücrelere dönüşür.",
    "tusTip": "Granülom yapısının ana hücresi epiteloid makrofajdır; lenfositler yanıtı sürdürür.",
    "differentialNote": "Akut inflamasyon nötrofil ağırlıklıdır; granülomatöz inflamasyon ise makrofaj/T hücre ağırlıklı kronik yanıttır.",
    "keywords": [
      "granülomatöz inflamasyon",
      "epiteloid histiyosit",
      "dev hücre",
      "IFN-gamma"
    ]
  },
  "tus-pearl-medical-pathology-282-extra": {
    "front": "Granülom oluşumunda makrofajların epiteloid hücrelere dönüşmesini sağlayan temel immün sinyal hangi hücre ve sitokinle ilişkilidir?",
    "back": "Th1 hücresinden salınan IFN-γ.",
    "answer": "Th1 hücresinden salınan IFN-γ.",
    "explanation": "Th1 yanıtı IL-12 ile güçlenir ve IFN-γ makrofajları aktive eder. Aktive makrofajlar epiteloid görünüm kazanır, dev hücre oluşturabilir ve kalıcı antijeni çevreleyen granülom yapısını kurar.",
    "tusTip": "Granülomda IL-12-Th1-IFN-γ-makrofaj aktivasyonu zinciri temel mekanizmadır.",
    "differentialNote": "TNF granülomun devamlılığı için önemlidir; anti-TNF tedaviler latent tüberküloz reaktivasyonu riskini artırabilir.",
    "keywords": [
      "Th1",
      "IFN-gamma",
      "IL-12",
      "makrofaj aktivasyonu"
    ]
  },
  "tus-pearl-medical-pathology-283-spot": {
    "front": "Transplantasyondan dakikalar-saatler sonra damar trombozu ve graft nekrozu gelişmesi hangi rejeksiyon tipini düşündürür?",
    "back": "Hiperakut greft rejeksiyonu.",
    "answer": "Hiperakut greft rejeksiyonu.",
    "explanation": "Hiperakut rejeksiyon alıcıda önceden var olan donör ABO veya HLA antikorlarının endotele bağlanmasıyla başlar. Kompleman aktivasyonu, endotel hasarı, fibrinoid nekroz ve tromboz greftin hızla iskemiye gitmesine yol açar.",
    "tusTip": "Dakikalar-saatler içinde tromboze olan graft, önceden oluşmuş antikor aracılı hiperakut rejeksiyondur.",
    "differentialNote": "Akut hücresel rejeksiyon günler-haftalar içinde T hücre infiltrasyonu ile; kronik rejeksiyon aylar-yıllar içinde vasküler fibrozisle seyreder.",
    "keywords": [
      "hiperakut rejeksiyon",
      "preformed antikor",
      "kompleman",
      "tromboz"
    ]
  },
  "tus-pearl-medical-pathology-283-extra": {
    "front": "Hiperakut greft rejeksiyonunda vasküler hasarı başlatan temel hedef yapı hangisidir?",
    "back": "Greft endotelindeki donör antijenleri.",
    "answer": "Greft endotelindeki donör antijenleri.",
    "explanation": "Alıcıdaki önceden oluşmuş antikorlar greft endotel antijenlerine bağlanır ve klasik kompleman yolunu aktive eder. Endotel hasarı trombosit aktivasyonu ve damar lümeni tıkanmasıyla sonuçlanır.",
    "tusTip": "Hiperakut rejeksiyon temelde antikor-endotel-kompleman-tromboz zinciridir.",
    "differentialNote": "Akut antikor aracılı rejeksiyon da vasküler hasar yapabilir; fakat hiperakut tabloda antikorlar transplantasyon öncesinden hazırdır.",
    "keywords": [
      "donör endoteli",
      "ABO uyumsuzluğu",
      "HLA antikoru",
      "kompleman"
    ]
  },
  "tus-pearl-medical-pathology-284-spot": {
    "front": "Transplantasyondan günler-haftalar sonra interstisyel mononükleer infiltrasyon ve tubülit görülmesi hangi rejeksiyon paternidir?",
    "back": "Akut hücresel greft rejeksiyonu.",
    "answer": "Akut hücresel greft rejeksiyonu.",
    "explanation": "Akut hücresel rejeksiyon alıcının T lenfositlerinin greft antijenlerini tanımasıyla gelişir. Histolojide interstisyel lenfosit infiltrasyonu, parankim hücre hasarı ve böbrekte tubülit tipiktir.",
    "tusTip": "T hücre + interstisyel infiltrasyon + tubülit, akut hücresel rejeksiyonun klasik morfolojik paternidir.",
    "differentialNote": "Akut humoral rejeksiyonda antikor-kompleman etkisi, vaskülit ve C4d pozitifliği daha ön plandadır.",
    "keywords": [
      "akut hücresel rejeksiyon",
      "T lenfosit",
      "tubülit",
      "interstisyel infiltrasyon"
    ]
  },
  "tus-pearl-medical-pathology-284-extra": {
    "front": "Akut hücresel rejeksiyonun hiperakut rejeksiyondan en temel patogenetik farkı nedir?",
    "back": "Önceden hazır antikorlar yerine T hücre aracılı gecikmiş greft hasarı gelişmesi.",
    "answer": "Önceden hazır antikorlar yerine T hücre aracılı gecikmiş greft hasarı gelişmesi.",
    "explanation": "Hiperakut rejeksiyon nakilden hemen sonra antikor ve komplemanla tromboz yapar. Akut hücresel rejeksiyon ise günler-haftalar içinde T hücrelerinin parankim ve damar endoteline saldırmasıyla ortaya çıkar.",
    "tusTip": "Zamanlama ve efektör mekanizma ayrımı sınavda en net ayırt ettiricidir.",
    "differentialNote": "Kronik rejeksiyon daha çok ilerleyici damar intimal kalınlaşması ve fibrozisle kalıcı fonksiyon kaybı oluşturur.",
    "keywords": [
      "T hücre aracılı",
      "gecikmiş hasar",
      "hiperakut rejeksiyon",
      "zamanlama"
    ]
  },
  "tus-pearl-medical-pathology-285-spot": {
    "front": "Transplantasyondan aylar-yıllar sonra progresif lümen daralması, intimal fibrozis ve parankimal atrofi gelişmesi hangi rejeksiyon tipidir?",
    "back": "Kronik greft rejeksiyonu.",
    "answer": "Kronik greft rejeksiyonu.",
    "explanation": "Kronik rejeksiyon düşük düzeyli immün hasarın damar duvarında intimal kalınlaşma ve fibrozis oluşturmasıyla ilerler. Sonuçta greft iskemisi, parankimal atrofi ve kalıcı fonksiyon kaybı gelişir.",
    "tusTip": "Kronik rejeksiyonun ana morfolojik dili vasküler intimal fibrozis ve progresif iskemi kaybıdır.",
    "differentialNote": "Akut rejeksiyon daha inflamatuvar ve potansiyel olarak tedaviye yanıtlı olabilir; kronik rejeksiyon çoğu zaman geri dönüşsüz fibrozisle seyreder.",
    "keywords": [
      "kronik rejeksiyon",
      "intimal fibrozis",
      "parankimal atrofi",
      "greft iskemisi"
    ]
  },
  "tus-pearl-medical-pathology-285-extra": {
    "front": "Kronik greft rejeksiyonunda greft fonksiyonunun yavaş kaybını en iyi açıklayan vasküler değişiklik nedir?",
    "back": "Greft damarlarında obliteratif intimal kalınlaşma.",
    "answer": "Greft damarlarında obliteratif intimal kalınlaşma.",
    "explanation": "Damar intimasındaki proliferasyon ve fibrozis lümeni daraltır; kronik hipoperfüzyon parankimal kayıp ve interstisyel fibrozise yol açar. Bu süreç akut trombotik hasardan çok yavaş ilerleyen iskemik reproviderLabeling şeklindedir.",
    "tusTip": "Kronik rejeksiyon, greftin damar hastalığı gibi davranır: lümen daralır, parankim zamanla kaybolur.",
    "differentialNote": "Hiperakut rejeksiyonda ani tromboz ve nekroz; kronik rejeksiyonda ise aylar-yıllar içinde obliteratif damar lezyonu beklenir.",
    "keywords": [
      "obliteratif vaskülopati",
      "lümen daralması",
      "interstisyel fibrozis",
      "kronik iskemi"
    ]
  },
  "tus-pearl-medical-pathology-286-spot": {
    "front": "Periferde trombosit yıkımı artmış bir hastada kemik iliğinde megakaryosit artışı görülmesi en çok hangi trombositopeni mekanizmasını destekler?",
    "back": "İmmün trombositopeni.",
    "answer": "İmmün trombositopeni.",
    "explanation": "İmmün trombositopenide antiplatelet antikorlar trombositlerin özellikle dalakta yıkılmasına yol açar. Kemik iliği bu kaybı telafi etmeye çalıştığı için megakaryosit sayısı artmış veya belirgin olabilir.",
    "tusTip": "Trombositopeni + normal koagülasyon testleri + kemik iliğinde megakaryosit artışı, ITP lehinedir.",
    "differentialNote": "Aplastik anemide kemik iliği hiposellülerdir ve megakaryosit artışı beklenmez; DIC’de koagülasyon testleri bozulur.",
    "keywords": [
      "immün trombositopeni",
      "megakaryosit artışı",
      "dalak yıkımı",
      "normal PT/PTT"
    ]
  },
  "tus-pearl-medical-pathology-286-extra": {
    "front": "İmmün trombositopenide kanama eğilimi olmasına rağmen PT ve aPTT’nin genellikle normal kalmasını açıklayan temel neden nedir?",
    "back": "Sorunun koagülasyon faktörlerinden çok trombosit sayısında olması.",
    "answer": "Sorunun koagülasyon faktörlerinden çok trombosit sayısında olması.",
    "explanation": "ITP primer hemostaz bozukluğudur; trombositler antikor aracılı yıkılır. Koagülasyon faktörleri tüketilmediği için sekonder hemostazı ölçen PT ve aPTT genellikle normaldir.",
    "tusTip": "Peteşi-purpura tarzı kanama primer hemostazı, uzamış PT/aPTT ise koagülasyon faktörü sorununu düşündürür.",
    "differentialNote": "DIC’de trombositler ve koagülasyon faktörleri birlikte tüketildiği için PT/aPTT uzar ve D-dimer yükselir.",
    "keywords": [
      "primer hemostaz",
      "trombosit yıkımı",
      "PT normal",
      "aPTT normal"
    ]
  },
  "tus-pearl-medical-pathology-287-spot": {
    "front": "ADAMTS13 eksikliğine bağlı büyük vWF multimerlerinin parçalanamaması hangi trombotik mikroanjiyopatiyi oluşturur?",
    "back": "Trombotik trombositopenik purpura.",
    "answer": "Trombotik trombositopenik purpura.",
    "explanation": "ADAMTS13 normalde büyük vWF multimerlerini parçalar; eksikliğinde trombositler mikrodolaşımda anormal şekilde agregasyona uğrar. Sonuçta trombositopeni, mikroanjiyopatik hemolitik anemi ve organ iskemisi gelişir.",
    "tusTip": "TTP’de ADAMTS13 eksikliği + trombosit mikrotrombüsü + MAHA ana mekanizmadır.",
    "differentialNote": "DIC’de koagülasyon kaskadı yaygın aktive olur ve PT/aPTT uzar; TTP’de koagülasyon testleri çoğu kez normaldir.",
    "keywords": [
      "TTP",
      "ADAMTS13",
      "vWF multimerleri",
      "mikroanjiyopatik hemoliz"
    ]
  },
  "tus-pearl-medical-pathology-287-extra": {
    "front": "TTP’de şistosit oluşumunu açıklayan temel damar içi olay nedir?",
    "back": "Mikrodolaşımda trombositten zengin mikrotrombüslerin eritrositleri mekanik olarak parçalaması.",
    "answer": "Mikrodolaşımda trombositten zengin mikrotrombüslerin eritrositleri mekanik olarak parçalaması.",
    "explanation": "vWF aracılı trombosit agregasyonları küçük damarlarda akımı daraltır. Eritrositler bu dar lümenlerden geçerken parçalanır ve periferik yaymada şistositler ortaya çıkar.",
    "tusTip": "Şistosit + trombositopeni + nörolojik/renal bulgu, TTP için yüksek verimli kombinasyondur.",
    "differentialNote": "İmmün hemolitik anemide eritrosit yıkımı antikor aracılıdır; TTP’de parçalanma mekanik mikroanjiyopatiktir.",
    "keywords": [
      "şistosit",
      "mikrotrombüs",
      "MAHA",
      "trombositopeni"
    ]
  },
  "tus-pearl-medical-pathology-288-spot": {
    "front": "Yaygın pıhtılaşma aktivasyonu sonrası trombosit ve faktör tüketimiyle PT/aPTT uzaması, fibrinojen düşüklüğü ve D-dimer yüksekliği hangi tabloyu gösterir?",
    "back": "Dissemine intravasküler koagülasyon.",
    "answer": "Dissemine intravasküler koagülasyon.",
    "explanation": "DIC’de sistemik trombin oluşumu mikrotrombüslere ve aynı anda koagülasyon faktörlerinin tüketilmesine yol açar. Bu nedenle hem tromboz hem kanama görülür; laboratuvarda trombositopeni, düşük fibrinojen ve yüksek D-dimer tipiktir.",
    "tusTip": "DIC = tromboz + kanama + düşük fibrinojen + yüksek D-dimer + uzamış PT/aPTT.",
    "differentialNote": "TTP’de trombosit mikrotrombüsleri baskındır ve koagülasyon testleri genellikle normal kalır; DIC’de koagülasyon kaskadı tüketilir.",
    "keywords": [
      "DIC",
      "uzamış PT",
      "uzamış aPTT",
      "yüksek D-dimer"
    ]
  },
  "tus-pearl-medical-pathology-288-extra": {
    "front": "DIC’de aynı hastada hem mikrotromboz hem de kanama gelişmesini açıklayan temel patogenez nedir?",
    "back": "Koagülasyon sisteminin yaygın aktivasyonu ve faktör-trombosit tüketimi.",
    "answer": "Koagülasyon sisteminin yaygın aktivasyonu ve faktör-trombosit tüketimi.",
    "explanation": "Başlangıçta trombin üretimi damar içinde fibrin mikrotrombüsleri oluşturur. Süreç ilerledikçe trombositler, fibrinojen ve koagülasyon faktörleri tüketildiği için kanama eğilimi belirginleşir.",
    "tusTip": "DIC’de patolojik anahtar, pıhtılaşmanın hem aşırı çalışması hem de kaynakları tüketmesidir.",
    "differentialNote": "Primer fibrinolizde D-dimer artabilir ancak yaygın mikrotrombüslü tüketim koagülopatisi DIC için daha tipiktir.",
    "keywords": [
      "tüketim koagülopatisi",
      "mikrotromboz",
      "fibrinojen düşüklüğü",
      "kanama"
    ]
  },
  "tus-pearl-medical-pathology-289-spot": {
    "front": "Mikrositer hipokrom anemide ferritin düşüklüğü, TIBC yüksekliği ve serum demiri azalması hangi anemi tipini destekler?",
    "back": "Demir eksikliği anemisi.",
    "answer": "Demir eksikliği anemisi.",
    "explanation": "Demir eksikliğinde depo demiri azaldığı için ferritin düşer; transferrin üretimi arttığı için TIBC yükselir. Eritrositlerde hemoglobin sentezi azalır ve mikrositer-hipokrom morfoloji gelişir.",
    "tusTip": "Ferritin düşük + TIBC yüksek ise demir eksikliği anemisi en güçlü seçenektir.",
    "differentialNote": "Kronik hastalık anemisinde serum demiri düşük olabilir fakat ferritin genellikle normal/yüksek, TIBC düşük olur.",
    "keywords": [
      "demir eksikliği anemisi",
      "ferritin düşük",
      "TIBC yüksek",
      "mikrositer hipokrom"
    ]
  },
  "tus-pearl-medical-pathology-289-extra": {
    "front": "Demir eksikliği anemisinin kronik hastalık anemisinden ayrımında en kullanışlı depo göstergesi hangisidir?",
    "back": "Ferritin düşüklüğü.",
    "answer": "Ferritin düşüklüğü.",
    "explanation": "Ferritin vücuttaki demir depolarını yansıtır; demir eksikliğinde depolar boşaldığı için azalır. Kronik inflamasyonda ferritin akut faz reaktanı olarak artabilir ve demir makrofajlarda tutulur.",
    "tusTip": "Düşük ferritin gerçek demir deposu kaybı için çok güçlü bir ipucudur.",
    "differentialNote": "Talasemide demir depoları genellikle normaldir; belirgin mikrositoza rağmen ferritin düşüklüğü beklenmez.",
    "keywords": [
      "ferritin",
      "kronik hastalık anemisi",
      "demir deposu",
      "akut faz reaktanı"
    ]
  },
  "tus-pearl-medical-pathology-290-spot": {
    "front": "Makrositer anemide makro-ovalositler ve hipersegmentli nötrofiller görülmesi hangi temel hücresel sentez bozukluğunu düşündürür?",
    "back": "DNA sentez bozukluğuna bağlı megaloblastik anemi.",
    "answer": "DNA sentez bozukluğuna bağlı megaloblastik anemi.",
    "explanation": "B12 veya folat eksikliğinde timidilat sentezi bozulur ve çekirdek olgunlaşması sitoplazmaya göre gecikir. Bu nükleer-sitoplazmik asenkroni makro-ovalosit ve hipersegmentli nötrofil morfolojisini oluşturur.",
    "tusTip": "Makro-ovalosit + hipersegmentli nötrofil, megaloblastik aneminin periferik yayma imzasıdır.",
    "differentialNote": "Alkol veya karaciğer hastalığı da makrositoz yapabilir; hipersegmentli nötrofil megaloblastik süreci daha güçlü destekler.",
    "keywords": [
      "megaloblastik anemi",
      "hipersegmentli nötrofil",
      "makro-ovalosit",
      "DNA sentezi"
    ]
  },
  "tus-pearl-medical-pathology-290-extra": {
    "front": "B12 eksikliğini folat eksikliğinden ayırmada hangi klinik-biyokimyasal özellik daha değerlidir?",
    "back": "Nörolojik bulgu ve metilmalonik asit artışı.",
    "answer": "Nörolojik bulgu ve metilmalonik asit artışı.",
    "explanation": "B12 eksikliği metilmalonil-CoA mutaz yolunu da bozar; bu nedenle metilmalonik asit artar ve nörolojik hasar gelişebilir. Folat eksikliğinde megaloblastik anemi olur fakat metilmalonik asit artışı ve nörolojik tutulum beklenmez.",
    "tusTip": "B12 eksikliği = megaloblastik anemi + nörolojik bulgu + metilmalonik asit artışı.",
    "differentialNote": "Folat vermek anemiyi düzeltebilir ancak B12 eksikliğine bağlı nörolojik hasarı maskeleyebilir.",
    "keywords": [
      "B12 eksikliği",
      "folat eksikliği",
      "metilmalonik asit",
      "nörolojik bulgu"
    ]
  },
  "tus-pearl-medical-pathology-291-spot": {
    "front": "Pansitopeniyle birlikte kemik iliğinin hiposellüler ve yağ dokusundan zengin olması hangi kemik iliği yetmezliğini düşündürür?",
    "back": "Aplastik anemi.",
    "answer": "Aplastik anemi.",
    "explanation": "Aplastik anemide hematopoietik kök hücrelerin kaybı veya baskılanması tüm hücre serilerinde azalmaya yol açar. Kemik iliği biyopsisinde hematopoietik alanların yerini yağ dokusu almıştır.",
    "tusTip": "Pansitopeni + hiposellüler yağlı kemik iliği, aplastik aneminin temel patolojik bulgusudur.",
    "differentialNote": "Lösemide kemik iliği genellikle blastlarla hipersellülerdir; periferde pansitopeni olsa bile patoloji farklıdır.",
    "keywords": [
      "aplastik anemi",
      "pansitopeni",
      "hiposellüler ilik",
      "yağlı kemik iliği"
    ]
  },
  "tus-pearl-medical-pathology-291-extra": {
    "front": "Aplastik anemide splenomegalinin genellikle belirgin olmaması hangi mekanizmayla uyumludur?",
    "back": "Primer sorunun periferik yıkımdan çok kemik iliği üretim yetmezliği olması.",
    "answer": "Primer sorunun periferik yıkımdan çok kemik iliği üretim yetmezliği olması.",
    "explanation": "Hücre serileri dalakta yıkıldığı için değil, kemik iliğinde üretilemediği için azalır. Bu nedenle belirgin ekstramedüller hematopoez veya periferik sekestrasyon beklenmez.",
    "tusTip": "Aplastik anemi üretim problemi; hipersplenizm periferik sekestrasyon problemi olarak ayrılır.",
    "differentialNote": "Miyelofibroziste ekstramedüller hematopoez nedeniyle masif splenomegali daha tipiktir.",
    "keywords": [
      "üretim yetmezliği",
      "splenomegali yokluğu",
      "hematopoietik kök hücre",
      "hipersplenizm"
    ]
  },
  "tus-pearl-medical-pathology-292-spot": {
    "front": "Lenf nodunda geniş nükleollü çift çekirdekli Reed-Sternberg hücreleri ve CD15/CD30 pozitifliği hangi lenfomayı düşündürür?",
    "back": "Klasik Hodgkin lenfoma.",
    "answer": "Klasik Hodgkin lenfoma.",
    "explanation": "Klasik Hodgkin lenfomada tanısal hücre Reed-Sternberg hücresidir; genellikle CD15 ve CD30 pozitiftir. Tümör hücreleri az sayıda olabilir, çevrede reaktif inflamatuvar hücrelerden zengin bir arka plan bulunur.",
    "tusTip": "Reed-Sternberg + CD15/CD30, klasik Hodgkin lenfomanın yüksek verimli imzasıdır.",
    "differentialNote": "Non-Hodgkin lenfomalarda tümöral lenfoid hücre kitlesi daha baskındır ve yayılım çoğu zaman nonkontigüöz olabilir.",
    "keywords": [
      "Hodgkin lenfoma",
      "Reed-Sternberg",
      "CD15",
      "CD30"
    ]
  },
  "tus-pearl-medical-pathology-292-extra": {
    "front": "Klasik Hodgkin lenfomanın birçok non-Hodgkin lenfomadan ayrılan yayılım paterni hangisidir?",
    "back": "Komşu lenf nodu bölgelerine kontigüöz yayılım.",
    "answer": "Komşu lenf nodu bölgelerine kontigüöz yayılım.",
    "explanation": "Hodgkin lenfoma çoğu zaman tek bir lenf nodu bölgesinden başlayıp komşu nodal alanlara düzenli şekilde ilerler. Bu özellik evreleme ve radyolojik değerlendirmede önem taşır.",
    "tusTip": "Hodgkin’de düzenli-kontigüöz nodal yayılım, sınavda non-Hodgkin ayrımında sık kullanılır.",
    "differentialNote": "Burkitt veya diffüz büyük B hücreli lenfoma gibi non-Hodgkin lenfomalar daha sık ekstranodal veya atlamalı tutulum gösterebilir.",
    "keywords": [
      "kontigüöz yayılım",
      "lenf nodu",
      "klasik Hodgkin",
      "non-Hodgkin ayrımı"
    ]
  },
  "tus-pearl-medical-pathology-293-spot": {
    "front": "BCL2 aşırı ekspresyonu oluşturan t(14;18) translokasyonu hangi indolent B hücreli lenfoma için klasiktir?",
    "back": "Foliküler lenfoma.",
    "answer": "Foliküler lenfoma.",
    "explanation": "Foliküler lenfomada t(14;18), BCL2 genini immünoglobulin ağır zincir promotörü altına getirir. BCL2 apoptozu engellediği için germinal merkez kökenli B hücreleri uzun süre hayatta kalır.",
    "tusTip": "Foliküler lenfoma = t(14;18) + BCL2 + apoptozdan kaçış.",
    "differentialNote": "Burkitt lenfomada temel translokasyon MYC aktivasyonu yapan t(8;14)’tür ve tümör çok yüksek proliferasyonludur.",
    "keywords": [
      "foliküler lenfoma",
      "t(14;18)",
      "BCL2",
      "apoptoz inhibisyonu"
    ]
  },
  "tus-pearl-medical-pathology-293-extra": {
    "front": "Foliküler lenfomada BCL2 pozitifliğinin germinal merkez biyolojisi açısından anormal olmasının nedeni nedir?",
    "back": "Normal germinal merkez B hücrelerinde BCL2 baskılıdır; seçilemeyen hücrelerin apoptoza gitmesi gerekir.",
    "answer": "Normal germinal merkez B hücrelerinde BCL2 baskılıdır; seçilemeyen hücrelerin apoptoza gitmesi gerekir.",
    "explanation": "Germinal merkezde düşük afiniteli veya hatalı B hücreleri apoptozla temizlenir. BCL2 aşırı ekspresyonu bu fizyolojik seçilimi bozar ve neoplastik hücrelerin birikmesine izin verir.",
    "tusTip": "Foliküler lenfomada temel kanser mantığı proliferasyondan çok apoptozdan kaçıştır.",
    "differentialNote": "Reaktif foliküllerde polarizasyon ve tingible body makrofajları beklenir; neoplastik foliküllerde bu düzen kaybolabilir.",
    "keywords": [
      "germinal merkez",
      "BCL2 pozitifliği",
      "apoptozdan kaçış",
      "reaktif folikül"
    ]
  },
  "tus-pearl-medical-pathology-294-spot": {
    "front": "Çok yüksek proliferasyonlu B hücreli lenfomada t(8;14) ile MYC aktivasyonu ve starry-sky görünümü hangi tanıyı destekler?",
    "back": "Burkitt lenfoma.",
    "answer": "Burkitt lenfoma.",
    "explanation": "Burkitt lenfomada MYC aktivasyonu hücre proliferasyonunu çok hızlandırır; Ki-67 neredeyse tümör hücrelerinin tamamına yakındır. Makrofajların apoptotik hücreleri temizlemesi starry-sky görünümünü oluşturur.",
    "tusTip": "Burkitt = MYC t(8;14) + çok yüksek Ki-67 + starry-sky.",
    "differentialNote": "Foliküler lenfomada t(14;18)-BCL2 apoptozdan kaçış yapar; Burkitt’te ana olay MYC ile proliferasyondur.",
    "keywords": [
      "Burkitt lenfoma",
      "MYC",
      "t(8;14)",
      "starry-sky"
    ]
  },
  "tus-pearl-medical-pathology-294-extra": {
    "front": "Burkitt lenfomadaki starry-sky görünümünün histolojik karşılığı nedir?",
    "back": "Apoptotik tümör hücrelerini fagosite eden açık sitoplazmalı makrofajların koyu tümör zemini içinde seçilmesi.",
    "answer": "Apoptotik tümör hücrelerini fagosite eden açık sitoplazmalı makrofajların koyu tümör zemini içinde seçilmesi.",
    "explanation": "Tümör çok hızlı çoğaldığı için hücre ölümü de fazladır. Makrofajlar bu apoptotik kalıntıları temizler ve koyu mavi tümör hücreleri arasında yıldızlı gökyüzü görünümü verir.",
    "tusTip": "Starry-sky görünümü yüksek proliferasyon ve yüksek hücre dönüşümünü morfolojik olarak yansıtır.",
    "differentialNote": "Bu görünüm tek başına tamamen özgül değildir; MYC translokasyonu ve klinik bağlamla birlikte değerlendirilir.",
    "keywords": [
      "starry-sky",
      "makrofaj",
      "apoptoz",
      "yüksek proliferasyon"
    ]
  },
  "tus-pearl-medical-pathology-295-spot": {
    "front": "Düşük eritropoietin düzeyiyle birlikte eritrosit kitlesi artışı, panmiyeloz ve JAK2 mutasyonu hangi miyeloproliferatif neoplaziyi düşündürür?",
    "back": "Polisitemia vera.",
    "answer": "Polisitemia vera.",
    "explanation": "Polisitemia verada JAK2 aktivasyonu eritroid seri başta olmak üzere miyeloid serilerde EPO’dan bağımsız proliferasyon oluşturur. Artmış kan viskozitesi tromboz, baş ağrısı ve sıcak duş sonrası kaşıntı gibi bulgulara yol açabilir.",
    "tusTip": "PV’de eritrositoz primerdir; EPO düşük, JAK2 sıklıkla pozitiftir.",
    "differentialNote": "Sekonder polisitemide hipoksi veya EPO üreten tümör nedeniyle EPO yüksek beklenir; PV’de otonom marrow üretimi baskındır.",
    "keywords": [
      "polisitemia vera",
      "JAK2",
      "düşük EPO",
      "panmiyeloz"
    ]
  },
  "tus-pearl-medical-pathology-295-extra": {
    "front": "Polisitemia verayı sekonder polisitemiden ayırmada EPO düzeyinin düşük olmasını açıklayan mekanizma nedir?",
    "back": "Kemik iliğinde JAK2 aracılı otonom eritroid proliferasyonun renal EPO üretimini baskılaması.",
    "answer": "Kemik iliğinde JAK2 aracılı otonom eritroid proliferasyonun renal EPO üretimini baskılaması.",
    "explanation": "Eritrosit kitlesi arttıkça doku oksijenlenmesi yükselir ve böbrekten EPO salınımı geri bildirimle azalır. Buna rağmen mutant miyeloid klon EPO’dan bağımsız çoğalmayı sürdürür.",
    "tusTip": "EPO düşükse primer klonal eritrositoz; EPO yüksekse sekonder polisitemi düşünülür.",
    "differentialNote": "Kronik hipokside gelişen polisitemide JAK2 klonu değil, hipoksiye yanıt olarak artan EPO temel uyarandır.",
    "keywords": [
      "EPO düşük",
      "otonom proliferasyon",
      "renal feedback",
      "sekonder polisitemi"
    ]
  },
  "tus-pearl-medical-pathology-296-spot": {
    "front": "Kalıcı trombositoz, dev hiperlobüle megakaryosit kümeleri ve tromboz-kanama eğilimi hangi miyeloproliferatif neoplaziyle uyumludur?",
    "back": "Esansiyel trombositemi.",
    "answer": "Esansiyel trombositemi.",
    "explanation": "Esansiyel trombositemide megakaryosit serisi klonal olarak artar; JAK2, CALR veya MPL mutasyonları görülebilir. Trombosit sayısı yüksek olsa da fonksiyon bozukluğu nedeniyle hem tromboz hem kanama gelişebilir.",
    "tusTip": "Esansiyel trombositemi = yüksek trombosit + büyük hiperlobüle megakaryosit + tromboz/kanama riski.",
    "differentialNote": "Primer miyelofibroziste belirgin retikülin/kollajen fibrozis ve ekstramedüller hematopoez daha ön plandadır.",
    "keywords": [
      "esansiyel trombositemi",
      "trombositoz",
      "megakaryosit",
      "JAK2 CALR MPL"
    ]
  },
  "tus-pearl-medical-pathology-296-extra": {
    "front": "Esansiyel trombositemide çok yüksek trombosit sayısına rağmen kanama gelişebilmesini açıklayan temel neden nedir?",
    "back": "Klonal trombositlerin fonksiyonel olarak bozuk olabilmesi ve edinilmiş von Willebrand faktör kaybı.",
    "answer": "Klonal trombositlerin fonksiyonel olarak bozuk olabilmesi ve edinilmiş von Willebrand faktör kaybı.",
    "explanation": "Trombosit sayısı fazla olsa bile adezyon-agregasyon işlevi kusurlu olabilir. Aşırı trombositoz büyük vWF multimerlerinin tüketilmesine de yol açarak mukokutanöz kanama riskini artırabilir.",
    "tusTip": "Trombosit sayısı yüksekliği her zaman iyi hemostaz anlamına gelmez; kalite ve vWF etkileşimi önemlidir.",
    "differentialNote": "Reaktif trombositozda altta yatan inflamasyon veya demir eksikliği vardır; klonal megakaryosit proliferasyonu ET lehinedir.",
    "keywords": [
      "fonksiyonel trombosit bozukluğu",
      "edinilmiş vWF kaybı",
      "kanama",
      "klonal trombositoz"
    ]
  },
  "tus-pearl-medical-pathology-297-spot": {
    "front": "Miyokart infarktından sonraki ilk saatlerde dalgalı lifler, erken koagülasyon nekrozu ve ardından nötrofil infiltrasyonu hangi zaman penceresini düşündürür?",
    "back": "Erken akut miyokart infarktı.",
    "answer": "Erken akut miyokart infarktı.",
    "explanation": "Miyokart infarktında ilk saatlerde dalgalı lifler ve erken koagülatif değişiklikler görülebilir; 12-24 saatten sonra nötrofiller belirginleşir. Günler ilerledikçe makrofaj temizliği ve granülasyon dokusu gelişir.",
    "tusTip": "MI zamanlamasında erken dönem nötrofil, 3-7 gün makrofaj ve duvar rüptürü riskiyle hatırlanır.",
    "differentialNote": "Beyin infarktı sıvılaşma nekrozu yaparken miyokart infarktı koagülasyon nekrozu ve skar ile iyileşir.",
    "keywords": [
      "miyokart infarktı",
      "dalgalı lif",
      "nötrofil",
      "koagülasyon nekrozu"
    ]
  },
  "tus-pearl-medical-pathology-297-extra": {
    "front": "Miyokart infarktında 3-7. günlerde ventrikül duvar rüptürü riskinin artmasını açıklayan histolojik olay nedir?",
    "back": "Makrofajların nekrotik miyokardı temizlemesiyle duvarın geçici olarak zayıflaması.",
    "answer": "Makrofajların nekrotik miyokardı temizlemesiyle duvarın geçici olarak zayıflaması.",
    "explanation": "İlk günlerde nötrofiller baskındır; ardından makrofajlar nekrotik dokuyu fagosite eder. Kollajen birikimi henüz yeterli olmadığı için bu dönemde mekanik dayanıklılık düşer ve rüptür riski artar.",
    "tusTip": "MI’da rüptür riski, makrofaj temizliği ile skar dayanıklılığı arasındaki boşlukta artar.",
    "differentialNote": "Geç dönemde yoğun kollajen skarı gelişir; bu skar rüptürden çok kronik anevrizma ve kalp yetmezliğiyle ilişkilidir.",
    "keywords": [
      "3-7 gün",
      "makrofaj",
      "duvar rüptürü",
      "granülasyon öncesi zayıflık"
    ]
  },
  "tus-pearl-medical-pathology-298-spot": {
    "front": "Romatizmal ateşte miyokardda Anitschkow hücreleri içeren Aschoff cisimcikleri görülmesi hangi immünopatolojik süreci destekler?",
    "back": "Akut romatizmal kardit.",
    "answer": "Akut romatizmal kardit.",
    "explanation": "Romatizmal ateş, streptokok antijenleri ile kalp dokusu arasındaki moleküler benzerliğe bağlı immün yanıtla gelişir. Aschoff cisimcikleri ve tırtıklı kromatinli Anitschkow hücreleri karditin klasik histolojik bulgusudur.",
    "tusTip": "Aschoff cisimciği + Anitschkow hücresi, romatizmal karditin morfolojik imzasıdır.",
    "differentialNote": "Enfektif endokarditte kapakta mikroorganizma içeren vejetasyonlar beklenir; romatizmal ateş steril immün aracılı kardittir.",
    "keywords": [
      "romatizmal ateş",
      "Aschoff cisimciği",
      "Anitschkow hücresi",
      "moleküler benzerlik"
    ]
  },
  "tus-pearl-medical-pathology-298-extra": {
    "front": "Kronik romatizmal kalp hastalığında en sık kalıcı kapak deformitesi hangi kapakta ve hangi morfolojiyle gelişir?",
    "back": "Mitral kapakta fibrotik kalınlaşma ve komissür füzyonu.",
    "answer": "Mitral kapakta fibrotik kalınlaşma ve komissür füzyonu.",
    "explanation": "Tekrarlayan immün hasar kapak yaprakçıklarında fibrozis, kısalma ve komissür füzyonu oluşturur. Bu değişiklikler en çok mitral stenozla sonuçlanır.",
    "tusTip": "Romatizmal hastalıkta kronik sonuç denince balık ağzı görünümünde mitral stenoz akılda tutulur.",
    "differentialNote": "Akut romatizmal ateşte küçük steril verrüköz vejetasyonlar olabilir; büyük yıkıcı vejetasyonlar enfektif endokardit lehinedir.",
    "keywords": [
      "mitral stenoz",
      "komissür füzyonu",
      "fibrozis",
      "balık ağzı"
    ]
  },
  "tus-pearl-medical-pathology-299-spot": {
    "front": "Kalp kapağında fibrin, trombosit, inflamatuvar hücre ve mikroorganizmalardan oluşan büyük, frajil vejetasyonlar hangi endokardit tipini düşündürür?",
    "back": "Enfektif endokardit.",
    "answer": "Enfektif endokardit.",
    "explanation": "Enfektif endokarditte mikroorganizmalar kapak yüzeyinde trombosit-fibrin kütlesi içinde çoğalır. Vejetasyonlar frajil olduğu için emboli riski taşır ve kapakta destrüksiyon oluşturabilir.",
    "tusTip": "Mikroorganizma içeren büyük frajil vejetasyon, enfektif endokarditin ana morfolojik bulgusudur.",
    "differentialNote": "Nonbakteriyel trombotik endokarditte vejetasyonlar sterildir; Libman-Sacks endokarditi SLE ile ilişkilidir ve iki yüzlü kapak tutulumu gösterebilir.",
    "keywords": [
      "enfektif endokardit",
      "vejetasyon",
      "fibrin trombosit",
      "mikroorganizma"
    ]
  },
  "tus-pearl-medical-pathology-299-extra": {
    "front": "Enfektif endokarditte vejetasyonların emboli ve kapak yıkımı yapabilmesini açıklayan temel morfolojik özellik nedir?",
    "back": "Büyük, gevşek ve frajil trombotik-enfektif kitleler olmaları.",
    "answer": "Büyük, gevşek ve frajil trombotik-enfektif kitleler olmaları.",
    "explanation": "Vejetasyon içindeki fibrin ve mikroorganizma yoğunluğu antibiyotik ve immün hücre penetrasyonunu zorlaştırabilir. Kütlenin parçalanması septik embolilere, lokal invazyon ise kapak yetmezliği veya apseye yol açabilir.",
    "tusTip": "Enfektif endokardit morfolojisi sadece kapak lezyonu değil, embolik komplikasyon mantığı da taşır.",
    "differentialNote": "Romatizmal verrükalar daha küçük ve steril çizgisel lezyonlardır; enfektif vejetasyonlar daha yıkıcı ve emboliktir.",
    "keywords": [
      "septik emboli",
      "kapak destrüksiyonu",
      "frajil vejetasyon",
      "apse"
    ]
  },
  "tus-pearl-medical-pathology-300-spot": {
    "front": "Genç yaşta alt lob ağırlıklı panasinüler amfizem ve hepatositlerde PAS-pozitif globüller hangi kalıtsal protein katlanma bozukluğunu düşündürür?",
    "back": "Alfa-1 antitripsin eksikliği.",
    "answer": "Alfa-1 antitripsin eksikliği.",
    "explanation": "Alfa-1 antitripsin eksikliğinde akciğerde elastaz aktivitesi yeterince baskılanamaz ve alveol duvarları panasinüler yıkıma uğrar. Karaciğerde yanlış katlanmış AAT proteini hepatositlerde PAS-pozitif globüller halinde birikir.",
    "tusTip": "Alt lob panasinüler amfizem + PAS-pozitif hepatosit globülü, AAT eksikliği için klasik ikilidir.",
    "differentialNote": "Sigara ilişkili sentriasiner amfizem daha çok üst loblarda ve respiratuvar bronşiol çevresinde belirgindir.",
    "keywords": [
      "alfa-1 antitripsin eksikliği",
      "panasinüler amfizem",
      "PAS pozitif globül",
      "elastaz"
    ]
  },
  "tus-pearl-medical-pathology-300-extra": {
    "front": "Alfa-1 antitripsin eksikliğinde akciğer ve karaciğer patolojisinin farklı mekanizmalarla gelişmesini nasıl açıklarsın?",
    "back": "Akciğerde proteaz-antiproteaz dengesizliği, karaciğerde yanlış katlanmış protein birikimi vardır.",
    "answer": "Akciğerde proteaz-antiproteaz dengesizliği, karaciğerde yanlış katlanmış protein birikimi vardır.",
    "explanation": "AAT azlığı akciğerde nötrofil elastazını kontrolsüz bırakır ve alveol septalarını yıkar. Mutant AAT proteini ise hepatositlerde birikerek hücre hasarı, hepatit, siroz ve hepatoselüler karsinom riskine katkı sağlar.",
    "tusTip": "AAT eksikliği iki organlı düşünülür: akciğerde kayıp fonksiyon, karaciğerde toksik birikim.",
    "differentialNote": "Kistik fibroziste akciğer hasarı koyu sekresyon ve enfeksiyonlarla; AAT’de elastaz aracılı septal yıkımla gelişir.",
    "keywords": [
      "proteaz-antiproteaz",
      "hepatosit birikimi",
      "siroz",
      "panasinüler amfizem"
    ]
  },
  "tus-pearl-medical-pathology-301-spot": {
    "front": "Üst loblarda fibrotik nodüller, hiler lenf nodlarında yumurta kabuğu kalsifikasyonu ve çift kırınımlı partiküller hangi pnömokonyozu düşündürür?",
    "back": "Silikozis.",
    "answer": "Silikozis.",
    "explanation": "Silika partikülleri makrofajlar tarafından alınır ve inflamatuvar-fibrojenik sitokin salınımını tetikler. Sonuçta üst lob ağırlıklı fibrotik nodüller, progresif masif fibrozis ve tüberküloz riskinde artış görülebilir.",
    "tusTip": "Silikozis = üst lob fibrozis + eggshell kalsifikasyon + TB yatkınlığı.",
    "differentialNote": "Asbestoz daha çok alt lob interstisyel fibrozis, plevral plak ve mezotelyoma/akciğer kanseri riskiyle ilişkilidir.",
    "keywords": [
      "silikozis",
      "üst lob",
      "eggshell kalsifikasyon",
      "tüberküloz riski"
    ]
  },
  "tus-pearl-medical-pathology-301-extra": {
    "front": "Silikoziste tüberküloz riskinin artmasını açıklayan temel hücresel mekanizma nedir?",
    "back": "Silika partiküllerinin makrofaj fonksiyonunu bozması.",
    "answer": "Silika partiküllerinin makrofaj fonksiyonunu bozması.",
    "explanation": "Silika makrofajlarda lizozomal hasar ve hücre ölümü oluşturabilir; bu durum mikobakterilerin kontrolünü zayıflatır. Aynı zamanda kronik inflamasyon ve fibrozis akciğer savunmasını bozar.",
    "tusTip": "Silika maruziyeti sorularında sadece fibrozis değil, TB yatkınlığı da kritik ipucudur.",
    "differentialNote": "Kömür işçisi pnömokonyozunda TB riski silikozis kadar vurgulanmaz; silika bu ayrımda daha klasik bilgidir.",
    "keywords": [
      "makrofaj hasarı",
      "Mycobacterium tuberculosis",
      "fibrozis",
      "pnömokonyoz"
    ]
  },
  "tus-pearl-medical-pathology-302-spot": {
    "front": "Uzun latent dönem sonrası plevrada difüz kalınlaşma yapan, asbest maruziyetiyle ilişkili ve calretinin/WT1 pozitif olabilen tümör hangisidir?",
    "back": "Malign mezotelyoma.",
    "answer": "Malign mezotelyoma.",
    "explanation": "Mezotelyoma mezotel hücrelerinden kaynaklanır ve en güçlü çevresel ilişkisi asbest maruziyetidir. Plevrada yaygın kalınlaşma ve akciğeri zırh gibi sarma eğilimi gösterir.",
    "tusTip": "Asbest + plevral difüz tümör + calretinin/WT1, mezotelyoma lehinedir.",
    "differentialNote": "Asbest maruziyetinde akciğer karsinomu riski de artar ve mutlak olarak mezotelyomadan daha sık görülür.",
    "keywords": [
      "mezotelyoma",
      "asbest",
      "plevra",
      "calretinin WT1"
    ]
  },
  "tus-pearl-medical-pathology-302-extra": {
    "front": "Asbest maruziyetinde mezotelyoma ile akciğer karsinomu arasındaki sınav açısından önemli epidemiyolojik fark nedir?",
    "back": "Asbest mezotelyoma için klasik ilişki olsa da maruziyet sonrası akciğer karsinomu daha sık gelişir.",
    "answer": "Asbest mezotelyoma için klasik ilişki olsa da maruziyet sonrası akciğer karsinomu daha sık gelişir.",
    "explanation": "Asbest lifleri hem plevral mezotelyoma hem de bronkojenik karsinom riskini artırır. Sigara akciğer karsinomu riskini sinerjistik artırırken mezotelyoma riskini aynı ölçüde artırmaz.",
    "tusTip": "Asbest sorusunda 'klasik tümör' mezotelyoma, 'daha sık kanser' akciğer karsinomudur.",
    "differentialNote": "Plevral plaklar benign maruziyet göstergesi olabilir; difüz invaziv plevral kitle mezotelyoma lehinedir.",
    "keywords": [
      "akciğer karsinomu",
      "sigara sinerjisi",
      "plevral plak",
      "asbest maruziyeti"
    ]
  },
  "tus-pearl-medical-pathology-303-spot": {
    "front": "Erişkinde nefrotik sendrom, kapiller duvar kalınlaşması ve subepitelyal immün komplekslere bağlı spike-and-dome görünümü hangi glomerülopatiyi düşündürür?",
    "back": "Membranöz nefropati.",
    "answer": "Membranöz nefropati.",
    "explanation": "Membranöz nefropatide podosit altındaki subepitelyal immün kompleksler glomerüler bazal membranı kalınlaştırır. Gümüş boyada yeni membran materyali depozitlerin arasına uzanarak spike-and-dome görünümünü oluşturur.",
    "tusTip": "Erişkin nefrotik sendrom + subepitelyal depozit + spike-and-dome, membranöz nefropatidir.",
    "differentialNote": "Minimal değişiklik hastalığında ışık mikroskopisi genellikle normaldir; elektron mikroskopide podosit ayaksı çıkıntı silinmesi vardır.",
    "keywords": [
      "membranöz nefropati",
      "subepitelyal depozit",
      "spike and dome",
      "nefrotik sendrom"
    ]
  },
  "tus-pearl-medical-pathology-303-extra": {
    "front": "Primer membranöz nefropatide sık hedeflenen podosit antijeni hangisidir?",
    "back": "Fosfolipaz A2 reseptörü.",
    "answer": "Fosfolipaz A2 reseptörü.",
    "explanation": "Primer membranöz nefropatide anti-PLA2R antikorları podosit yüzey antijenlerine bağlanarak in situ immün kompleks oluşumuna yol açar. Sekonder membranöz nefropati SLE, HBV, malignite veya ilaçlarla ilişkili olabilir.",
    "tusTip": "Anti-PLA2R pozitifliği primer membranöz nefropati lehine yüksek verimli bilgidir.",
    "differentialNote": "SLE ilişkili membranöz nefropatide sistemik bulgular ve diğer immün kompleks paterni ayırıcıdır.",
    "keywords": [
      "PLA2R",
      "podosit",
      "anti-PLA2R",
      "sekonder membranöz"
    ]
  },
  "tus-pearl-medical-pathology-304-spot": {
    "front": "Üst solunum yolu enfeksiyonundan 1-2 gün sonra tekrarlayan makroskopik hematüri ve mezangial IgA birikimi hangi nefropatiyi düşündürür?",
    "back": "IgA nefropatisi.",
    "answer": "IgA nefropatisi.",
    "explanation": "IgA nefropatisinde anormal glikozillenmiş IgA1 mezangiumda birikir ve mezangial proliferasyona yol açar. Hematürinin enfeksiyondan hemen sonra veya eş zamanlı gelişmesi poststreptokoksik glomerülonefritten ayrımda önemlidir.",
    "tusTip": "Synpharyngitic hematuria, IgA nefropatisi için klasik zamanlama ipucudur.",
    "differentialNote": "Poststreptokoksik glomerülonefrit genellikle enfeksiyondan 1-3 hafta sonra gelişir ve düşük komplemanla seyreder.",
    "keywords": [
      "IgA nefropatisi",
      "mezangial IgA",
      "synpharyngitic hematüri",
      "mezangial proliferasyon"
    ]
  },
  "tus-pearl-medical-pathology-304-extra": {
    "front": "IgA nefropatisinde immün birikimin glomerüldeki temel yerleşim yeri neresidir?",
    "back": "Mezangium.",
    "answer": "Mezangium.",
    "explanation": "Mezangial IgA birikimi kompleman aktivasyonu ve mezangial hücre proliferasyonu oluşturur. İmmünfloresanda mezangial IgA baskınlığı tanısal değeri yüksek bulgudur.",
    "tusTip": "IgA nefropatisinde ana morfolojik alan kapiller duvar değil mezangiumdur.",
    "differentialNote": "Membranöz nefropatide subepitelyal depozitler ve kapiller duvar kalınlaşması; IgA nefropatisinde mezangial depozitler öne çıkar.",
    "keywords": [
      "mezangium",
      "immünfloresan",
      "IgA birikimi",
      "mezangial proliferasyon"
    ]
  },
  "tus-pearl-medical-pathology-305-spot": {
    "front": "Streptokok enfeksiyonundan haftalar sonra nefritik sendrom, düşük C3 ve elektron mikroskopide subepitelyal hump depozitleri hangi tanıyı destekler?",
    "back": "Poststreptokoksik glomerülonefrit.",
    "answer": "Poststreptokoksik glomerülonefrit.",
    "explanation": "Poststreptokoksik glomerülonefrit immün kompleks aracılıdır; glomerülde diffüz proliferatif yanıt ve granüler IgG/C3 birikimi görülür. Subepitelyal hump depozitleri klasik elektron mikroskopi bulgusudur.",
    "tusTip": "PSGN = gecikmiş nefritik tablo + düşük C3 + subepitelyal hump.",
    "differentialNote": "IgA nefropatisinde hematüri enfeksiyonla eş zamanlı veya birkaç gün içinde gelişir ve mezangial IgA birikimi baskındır.",
    "keywords": [
      "poststreptokoksik GN",
      "düşük C3",
      "subepitelyal hump",
      "nefritik sendrom"
    ]
  },
  "tus-pearl-medical-pathology-305-extra": {
    "front": "Poststreptokoksik glomerülonefritte immünfloresan incelemede beklenen temel boyanma paterni nedir?",
    "back": "Granüler IgG ve C3 birikimi.",
    "answer": "Granüler IgG ve C3 birikimi.",
    "explanation": "Dolaşan veya in situ oluşan immün kompleksler glomerüler yapılar boyunca düzensiz depolanır. Bu nedenle lineer değil, granüler immünfloresan paterni görülür.",
    "tusTip": "Granüler boyanma immün kompleks hastalığını; lineer boyanma anti-GBM hastalığını düşündürür.",
    "differentialNote": "Goodpasture sendromunda anti-GBM antikorları bazal membran boyunca lineer IgG boyanması yapar.",
    "keywords": [
      "granüler IF",
      "IgG C3",
      "immün kompleks",
      "anti-GBM ayrımı"
    ]
  },
  "tus-pearl-medical-pathology-306-spot": {
    "front": "Böbrekte sarı-kahverengi kitle, berrak sitoplazmalı hücreler ve VHL kaybıyla ilişkili tümör hangisidir?",
    "back": "Renal hücreli karsinom.",
    "answer": "Renal hücreli karsinom.",
    "explanation": "Renal hücreli karsinom özellikle clear cell tipte lipid ve glikojen içeriği nedeniyle berrak sitoplazma ve sarı gross görünüm gösterebilir. VHL kaybı HIF birikimi ve anjiyogenez artışı üzerinden tümör biyolojisine katkı sağlar.",
    "tusTip": "Berrak hücre + sarı renal kitle + VHL/HIF aksı, renal hücreli karsinom için yüksek verimlidir.",
    "differentialNote": "Ürotelyal karsinom renal pelvis veya mesane epitelinden kaynaklanır; RCC renal tübül epitel kökenlidir.",
    "keywords": [
      "renal hücreli karsinom",
      "clear cell",
      "VHL",
      "HIF"
    ]
  },
  "tus-pearl-medical-pathology-306-extra": {
    "front": "Renal hücreli karsinomda polisitemi veya hipertansiyon gibi paraneoplastik bulgular nasıl gelişebilir?",
    "back": "Tümörün eritropoietin veya renin benzeri hormon üretmesiyle.",
    "answer": "Tümörün eritropoietin veya renin benzeri hormon üretmesiyle.",
    "explanation": "Renal hücreli karsinom paraneoplastik sendrom yapabilen bir tümördür; EPO üretimi eritrositoz, renin üretimi hipertansiyon, PTHrP üretimi hiperkalsemi oluşturabilir. Renal ven invazyonu da klasik anatomik yayılım özelliğidir.",
    "tusTip": "RCC paraneoplastik sendrom ve renal ven invazyonuyla sık sorulur.",
    "differentialNote": "Wilms tümörü çocukluk çağı böbrek tümörüdür; RCC erişkinde sigara, obezite ve VHL ilişkisiyle öne çıkar.",
    "keywords": [
      "paraneoplastik sendrom",
      "EPO",
      "renin",
      "renal ven invazyonu"
    ]
  },
  "tus-pearl-medical-pathology-307-spot": {
    "front": "Çocukta böbrek kitlesinde blastemal, epitelyal ve stromal üçlü komponent görülmesi hangi tümör için klasiktir?",
    "back": "Wilms tümörü.",
    "answer": "Wilms tümörü.",
    "explanation": "Wilms tümörü nefroblastom olarak da bilinir ve embriyonik böbrek dokusunu taklit eden triphasic histoloji gösterebilir. WT1/WT2 ilişkisi, aniridi ve hemihipertrofi sendromik bağlamda önemlidir.",
    "tusTip": "Çocuk böbrek kitlesi + triphasic histoloji, Wilms tümörü lehinedir.",
    "differentialNote": "Renal hücreli karsinom erişkin tümörüdür ve berrak hücreli/sarı kitle görünümüyle ayrılır.",
    "keywords": [
      "Wilms tümörü",
      "nefroblastom",
      "triphasic histoloji",
      "WT1"
    ]
  },
  "tus-pearl-medical-pathology-307-extra": {
    "front": "Wilms tümöründe aniridi, genitoüriner anomaliler ve mental retardasyon birlikteliği hangi gen bölgesiyle ilişkilendirilen sendromu düşündürür?",
    "back": "WAGR sendromu ve WT1 bölgesi.",
    "answer": "WAGR sendromu ve WT1 bölgesi.",
    "explanation": "WT1 tümör baskılayıcı geninin etkilenmesi nefroblast gelişimini bozar ve Wilms tümörü riskini artırır. WAGR sendromu Wilms tümörü, aniridi, genitoüriner anomaliler ve mental retardasyon birlikteliğiyle hatırlanır.",
    "tusTip": "Wilms tümörü sorularında WT1 ve çocukluk çağı abdominal kitle anahtar bağlantıdır.",
    "differentialNote": "Nöroblastom adrenal/simpatik zincir kökenlidir, kalsifikasyon ve katekolamin metabolitleriyle ayrılabilir.",
    "keywords": [
      "WAGR",
      "WT1",
      "aniridi",
      "çocukluk böbrek tümörü"
    ]
  },
  "tus-pearl-medical-pathology-308-spot": {
    "front": "Adölesanda diz çevresi metafizde ağrılı kemik kitlesi, malign osteoid üretimi ve sunburst/Codman üçgeni hangi tümörü düşündürür?",
    "back": "Osteosarkom.",
    "answer": "Osteosarkom.",
    "explanation": "Osteosarkomun tanısal özelliği malign tümör hücrelerinin osteoid üretmesidir. En sık uzun kemik metafizlerinde, özellikle diz çevresinde görülür; radyolojide agresif periostal reaksiyonlar izlenebilir.",
    "tusTip": "Osteosarkom = adölesan + metafiz + malign osteoid + sunburst/Codman.",
    "differentialNote": "Ewing sarkomu daha çok diafiz yerleşimli küçük yuvarlak mavi hücreli tümördür ve t(11;22) ile ilişkilidir.",
    "keywords": [
      "osteosarkom",
      "malign osteoid",
      "metafiz",
      "sunburst"
    ]
  },
  "tus-pearl-medical-pathology-308-extra": {
    "front": "Osteosarkom riskini artıran kalıtsal tümör baskılayıcı gen bozukluklarından biri hangisidir?",
    "back": "RB1 veya TP53 bozukluğu.",
    "answer": "RB1 veya TP53 bozukluğu.",
    "explanation": "Retinoblastom öyküsü olan hastalarda RB1 kaybı osteosarkom riskini artırır; Li-Fraumeni sendromunda TP53 mutasyonu da önemli risk faktörüdür. Ayrıca Paget hastalığı ve radyasyon sonrası osteosarkom erişkin bağlamda sorulabilir.",
    "tusTip": "RB1/TP53 kaybı, osteosarkomun tümör baskılayıcı gen mantığıyla ilişkilidir.",
    "differentialNote": "Ewing sarkomunda ana genetik olay tümör baskılayıcı kaybından çok EWSR1-FLI1 füzyonudur.",
    "keywords": [
      "RB1",
      "TP53",
      "Li-Fraumeni",
      "Paget"
    ]
  },
  "tus-pearl-medical-pathology-309-spot": {
    "front": "Çocukta uzun kemik diafizinde küçük yuvarlak mavi hücreli tümör, onion-skin periost reaksiyonu ve t(11;22) hangi tanıyı destekler?",
    "back": "Ewing sarkomu.",
    "answer": "Ewing sarkomu.",
    "explanation": "Ewing sarkomu genellikle çocuk ve adölesanlarda diafiz yerleşimli agresif kemik tümörüdür. EWSR1-FLI1 füzyonu ve CD99 pozitifliği tanısal değeri yüksek bilgiler arasındadır.",
    "tusTip": "Ewing = diafiz + küçük yuvarlak mavi hücre + t(11;22) + onion-skin.",
    "differentialNote": "Osteosarkom metafizde malign osteoid üretir; Ewing’de osteoid üretimi tanısal özellik değildir.",
    "keywords": [
      "Ewing sarkomu",
      "t(11;22)",
      "EWSR1-FLI1",
      "onion-skin"
    ]
  },
  "tus-pearl-medical-pathology-309-extra": {
    "front": "Ewing sarkomunu osteosarkomdan ayıran en temel histogenetik ve morfolojik fark nedir?",
    "back": "Ewing’de küçük yuvarlak mavi hücreli tümör ve EWSR1-FLI1 füzyonu vardır; osteosarkomda malign osteoid üretimi esastır.",
    "answer": "Ewing’de küçük yuvarlak mavi hücreli tümör ve EWSR1-FLI1 füzyonu vardır; osteosarkomda malign osteoid üretimi esastır.",
    "explanation": "Ewing sarkomu nöroektodermal özellikler gösterebilen küçük yuvarlak hücreli tümördür ve çoğunlukla diafizde yerleşir. Osteosarkom ise osteoblastik malign hücrelerin osteoid üretmesiyle tanınır ve metafiz yerleşimi daha tipiktir.",
    "tusTip": "Kemik tümörü ayrımında yerleşim + osteoid varlığı + translokasyon birlikte düşünülmelidir.",
    "differentialNote": "Kondrosarkom kıkırdak matriks üretimiyle ve daha ileri yaşla ilişkilidir; Ewing çocukluk çağı diafiz tümörüdür.",
    "keywords": [
      "küçük yuvarlak mavi hücre",
      "malign osteoid",
      "diafiz",
      "metafiz"
    ]
  },
  "tus-pearl-medical-pathology-310-spot": {
    "front": "Çocukta lökokori, Flexner-Wintersteiner rozetleri ve RB1 tümör baskılayıcı geninin iki vuruşla kaybı hangi tümörü düşündürür?",
    "back": "Retinoblastom.",
    "answer": "Retinoblastom.",
    "explanation": "Retinoblastom RB1 geninin iki alelinin inaktivasyonu ile gelişir; RB proteini normalde G1/S geçişini baskılar. Histolojide Flexner-Wintersteiner rozetleri ve klinikte lökokori klasik ipuçlarıdır.",
    "tusTip": "Retinoblastom = lökokori + RB1 iki vuruş + G1/S kontrol kaybı.",
    "differentialNote": "Konjenital katarakt da lökokori yapabilir; tümöral bağlamda rozet ve RB1 kaybı retinoblastomu destekler.",
    "keywords": [
      "retinoblastom",
      "RB1",
      "iki vuruş",
      "Flexner-Wintersteiner rozeti"
    ]
  },
  "tus-pearl-medical-pathology-310-extra": {
    "front": "Kalıtsal retinoblastomun bilateral ve erken başlangıçlı olmasını Knudson iki vuruş hipotezi nasıl açıklar?",
    "back": "İlk RB1 vuruşu germline olduğu için ikinci somatik vuruş farklı retinal hücrelerde kolayca tümör başlatır.",
    "answer": "İlk RB1 vuruşu germline olduğu için ikinci somatik vuruş farklı retinal hücrelerde kolayca tümör başlatır.",
    "explanation": "Sporadik olguda aynı hücrede iki somatik RB1 kaybı gerekir; bu daha geç ve genellikle tek taraflıdır. Kalıtsal formda tüm hücreler ilk mutasyonu taşıdığı için bilateralite ve ek tümör riski artar.",
    "tusTip": "Kalıtsal retinoblastomda bilateralite ve osteosarkom riski RB1 germline kaybıyla ilişkilidir.",
    "differentialNote": "Tek taraflı geç başlangıçlı olgu sporadik olasılığı artırır; aile öyküsü ve bilateral tutulum germline mutasyonu düşündürür.",
    "keywords": [
      "Knudson",
      "germline RB1",
      "bilateral",
      "osteosarkom riski"
    ]
  }
}
);
