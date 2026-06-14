// Text overrides for the second 50 frontend-rendered İç Hastalıkları pearl cards.
// Targets only internal-medicine rendered positions 51–100; schema, order, branch metadata and card IDs remain unchanged.

export const TUS_PEARL_INTERNAL_MEDICINE_SECOND50_TEXT_OVERRIDES = Object.freeze(
{
  "tus-pearl-internal-medicine-171-extra": {
    "front": "Kolestatik enzim paterni olan hastada safra yolu obstrüksiyonunu ayırmak için ilk basamak görüntüleme hangisidir?",
    "keywords": [
      "kolestaz",
      "ALP-GGT",
      "abdominal USG",
      "safra yolu dilatasyonu"
    ],
    "back": "Abdominal ultrasonografi ile safra yolu dilatasyonunun değerlendirilmesi.",
    "answer": "İlk basamak abdominal ultrasonografi.",
    "explanation": "ALP ve GGT baskın yüksekliği kolestatik paterni gösterir; sonraki klinik karar ekstrahepatik obstrüksiyon olup olmadığını ayırmaktır. Ultrasonografi safra yolu dilatasyonu, taş ve kitle lehine hızlı, noninvaziv ilk değerlendirme sağlar. Dilatasyon yoksa ilaç, primer biliyer kolanjit veya intrahepatik kolestaz gibi nedenler daha fazla düşünülür.",
    "tusTip": "Kolestatik patern görüldüğünde ilk pratik ayrım görüntülemede safra yolu dilatasyonu var mı sorusudur.",
    "differentialNote": "Hepatoselüler paternde AST/ALT baskındır; kolestatik paternde ALP-GGT baskınlığı görüntüleme ihtiyacını belirler."
  },
  "tus-pearl-internal-medicine-172-spot": {
    "front": "Yaşlı hastada kalıcı olgun lenfositoz ve yaygın lenfadenopati varsa KLL tanısını doğrulamada en uygun test hangisidir?",
    "keywords": [
      "KLL",
      "olgun lenfositoz",
      "akım sitometri",
      "CD5 CD23"
    ],
    "back": "Periferik kanda akım sitometri ile klonal B hücre immünfenotipinin gösterilmesi.",
    "answer": "Periferik kan akım sitometrisi.",
    "explanation": "KLL çoğu zaman periferik kanda kalıcı klonal B lenfositoz ile tanınır; bu nedenle ilk doğrulayıcı yaklaşım periferik kan immünfenotiplemesidir. Tipik patern CD5 pozitif, CD23 pozitif klonal B hücre popülasyonudur. Lenf nodu biyopsisi her hastada ilk basamak değildir; daha çok atipik tablo veya Richter dönüşümü şüphesinde önem kazanır.",
    "tusTip": "Yaşlı hasta + olgun lenfositoz + lenfadenopati sorusunda tanısal anahtar periferik kan akım sitometrisidir.",
    "differentialNote": "KML’de miyeloid seri artışı ve BCR-ABL beklenir; KLL’de olgun klonal B lenfosit baskındır."
  },
  "tus-pearl-internal-medicine-172-extra": {
    "front": "KLL’de periferik yaymada görülen smudge cell bulgusunun tanısal değeri nasıl yorumlanmalıdır?",
    "keywords": [
      "KLL",
      "smudge cell",
      "periferik yayma",
      "akım sitometri"
    ],
    "back": "KLL’yi destekleyen yardımcı bulgudur; kesin tanı klonal B hücre immünfenotipiyle konur.",
    "answer": "Smudge cell destekleyicidir, doğrulama akım sitometriyle yapılır.",
    "explanation": "Smudge cell kırılgan olgun lenfositlerin yayma sırasında parçalanmasına bağlı görülür ve KLL için klasik bir ipucudur. Ancak tek başına klonaliteyi kanıtlamaz. Tanısal güvenlik için periferik kanda CD5 ve CD23 pozitif klonal B hücre popülasyonunun gösterilmesi gerekir.",
    "tusTip": "Smudge cell sınavda KLL’ye götürür; tanıyı kesinleştiren bilgi immünfenotiptir.",
    "differentialNote": "Mantle hücreli lenfoma da CD5 pozitif olabilir; CD23 negatifliği ve cyclin D1 pozitifliği ayırıcıdır."
  },
  "tus-pearl-internal-medicine-343-spot": {
    "front": "Toplum kökenli pnömonide CURB-65 skoru hangi temel klinik kararı desteklemek için kullanılır?",
    "keywords": [
      "CURB-65",
      "pnömoni",
      "hastane yatışı",
      "mortalite riski"
    ],
    "back": "Pnömoni şiddeti ve hastane yatışı/yoğun bakım gereksinimi riskini değerlendirmek için.",
    "answer": "Pnömoni şiddeti ve yatış riskini sınıflamak.",
    "explanation": "CURB-65 bilinç bozukluğu, üre yüksekliği, solunum sayısı, kan basıncı ve 65 yaş üstünü kullanarak mortalite riskini pratik biçimde sınıflar. Skor arttıkça ayaktan tedavi yerine hastane yatışı veya daha yakın izlem düşünülür. Bu skor etkeni belirlemez; klinik ağırlığı ve tedavi yerini seçmeye yardım eder.",
    "tusTip": "CURB-65 etken tanısı değil, pnömonide tedavi yeri ve risk ciddiyeti kararına yardım eden skordur.",
    "differentialNote": "Ateş yüksekliği ve öksürük pnömoniyi destekler ama CURB-65’in doğrudan puanlanan bileşenleri değildir."
  },
  "tus-pearl-internal-medicine-343-extra": {
    "front": "CURB-65’te bilinç bulanıklığı, üre yüksekliği ve takipnenin birlikte bulunması pnömoni yönetiminde neyi düşündürür?",
    "keywords": [
      "CURB-65",
      "bilinç bulanıklığı",
      "üre",
      "yatış kararı"
    ],
    "back": "Daha ağır pnömoni ve hastane yatışı gereksinimi.",
    "answer": "Yüksek riskli pnömoni; yatış ve yakın izlem gereksinimi.",
    "explanation": "Bu parametreler sistemik hastalık yükünü, solunum iş yükünü ve dolaşım/metabolik etkilenmeyi yansıtır. CURB-65 puanı arttıkça mortalite riski yükselir ve ayaktan tedavi güvenliği azalır. Tedavi kararı yine oksijenasyon, komorbidite ve sepsis bulgularıyla birlikte verilmelidir.",
    "tusTip": "CURB-65’te birden fazla pozitif bileşen varsa soru genellikle ayaktan tedaviden uzaklaşmayı hedefler.",
    "differentialNote": "PSI daha ayrıntılı komorbidite ve laboratuvar içerir; CURB-65 daha hızlı yatış kararı desteği sağlar."
  },
  "tus-pearl-internal-medicine-344-spot": {
    "front": "Anafilaksi sonrası tanıyı desteklemek için bakılabilen mast hücre aktivasyon belirteci hangisidir?",
    "keywords": [
      "anafilaksi",
      "serum triptaz",
      "mast hücre",
      "tanı desteği"
    ],
    "back": "Serum triptaz düzeyi.",
    "answer": "Serum triptazı.",
    "explanation": "Triptaz mast hücre degranülasyonunu yansıtır ve özellikle ilaç veya arı sokması ilişkili anafilakside tanıyı destekleyebilir. Ancak anafilaksi klinik bir acildir; adrenalin tedavisi triptaz sonucunu beklemez. Test en değerli olduğunda akut olaydan kısa süre sonra ve bazal düzeyle karşılaştırılarak yorumlanır.",
    "tusTip": "Anafilakside triptaz tanıyı destekler; hayat kurtaran ilk tedavi intramüsküler adrenalindir.",
    "differentialNote": "Total IgE akut atağı doğrulamak için güvenilir değildir; triptaz mast hücre aktivasyonunu daha doğrudan yansıtır."
  },
  "tus-pearl-internal-medicine-344-extra": {
    "front": "Anafilaksi kliniği belirgin olan hastada serum triptazın normal gelmesi yönetimi nasıl etkiler?",
    "keywords": [
      "anafilaksi",
      "normal triptaz",
      "klinik tanı",
      "adrenalin"
    ],
    "back": "Anafilaksiyi dışlamaz; klinik şüphede acil tedavi sürdürülür.",
    "answer": "Normal triptaz anafilaksiyi dışlamaz.",
    "explanation": "Anafilaksi tanısı hipotansiyon, bronkospazm, ürtiker/anjiyoödem ve gastrointestinal bulguların zaman ilişkisiyle klinik olarak konur. Triptaz bazı gıda ilişkili veya erken/geç alınmış örneklerde normal olabilir. Bu nedenle tedavi kararı laboratuvara değil klinik aciliyete dayanır.",
    "tusTip": "Anafilakside negatif/normal destek testi, tipik klinik tablo varsa adrenalini geciktirme gerekçesi değildir.",
    "differentialNote": "Vazovagal senkopta bradikardi ve solukluk daha ön plandadır; anafilakside bronkospazm, ürtiker ve hipotansiyon birlikteliği ayırt ettirir."
  },
  "tus-pearl-internal-medicine-345-spot": {
    "front": "Çok yüksek kan basıncı, yaygın raller ve akut pulmoner ödemle gelen stabil hastada başlangıç hemodinamik tedavi önceliği nedir?",
    "keywords": [
      "hipertansif akciğer ödemi",
      "IV nitrat",
      "NIV",
      "afterload"
    ],
    "back": "Oksijen/NIV desteğiyle birlikte intravenöz nitrat gibi hızlı etkili vazodilatör tedavi.",
    "answer": "IV nitrat temelli vazodilatasyon ve solunum desteği.",
    "explanation": "Hipertansif akut akciğer ödeminde yüksek afterload ve pulmoner venöz basınç alveoler sıvı birikimini artırır. Nitrater preload ve afterload’u azaltarak hızlı hemodinamik rahatlama sağlar; noninvaziv ventilasyon oksijenasyonu ve solunum işini düzeltir. Sistolik fonksiyon korunmuş ve belirgin hipotansiyon yoksa ilk refleks pozitif inotrop değildir.",
    "tusTip": "Hipertansif akciğer ödeminde temel hedef basınç yükünü hızla azaltmak ve oksijenasyonu desteklemektir.",
    "differentialNote": "Kardiyojenik şokta hipotansiyon ve hipoperfüzyon varsa vazodilatör yerine vazopressör/inotrop ihtiyacı öne çıkabilir."
  },
  "tus-pearl-internal-medicine-345-extra": {
    "front": "Hipertansif akut akciğer ödeminde nitrat tedavisi semptomları hangi temel mekanizmayla hızla azaltır?",
    "keywords": [
      "hipertansif akciğer ödemi",
      "nitrat",
      "preload",
      "afterload"
    ],
    "back": "Venöz ve arteriyel dilatasyonla preload/afterload’u azaltarak pulmoner konjesyonu hafifletir.",
    "answer": "Preload ve afterload azalması.",
    "explanation": "Yüksek sistemik basınç sol ventrikülün karşılaştığı yükü ve pulmoner kapiller basıncı artırır. Nitratlar venodilatasyonla doluş basıncını, daha yüksek dozlarda arteriyel dilatasyonla afterload’u azaltır. Böylece alveole sıvı geçişi ve dispne hızla gerileyebilir.",
    "tusTip": "Bu tabloda nitratın değeri yalnız antihipertansif olması değil, pulmoner konjesyonu hemodinamik olarak hızla azaltmasıdır.",
    "differentialNote": "Saf volüm yüklenmesinde diüretik daha belirgin rol alır; hipertansif flash ödemde vazodilatasyon çoğu zaman daha acil etkilidir."
  },
  "tus-pearl-internal-medicine-346-spot": {
    "front": "Altmış yaş ve üzerinde yeni başlayan dispepside ilk değerlendirmede hangi yaklaşım önceliklidir?",
    "keywords": [
      "dispepsi",
      "ileri yaş",
      "endoskopi",
      "alarm bulgusu"
    ],
    "back": "Üst gastrointestinal endoskopi ile değerlendirme.",
    "answer": "Üst GİS endoskopisi.",
    "explanation": "İleri yaşta yeni başlayan dispepsi malignite veya komplike ülser olasılığını artırdığı için yalnız ampirik tedaviyle geçiştirilmez. Endoskopi mukozal lezyon, ülser, malignite ve kanama odağını doğrudan değerlendirmeyi sağlar. Alarm bulgusu olmasa bile yaş eşiği klinik kararı değiştirir.",
    "tusTip": "Genç-dispepsi algoritması ile ileri yaş dispepsisi aynı değildir; ileri yaşta endoskopi eşiği düşer.",
    "differentialNote": "Genç ve alarm bulgusu olmayan hastada H. pylori test-et-tedavi veya ampirik PPI düşünülebilir."
  },
  "tus-pearl-internal-medicine-346-extra": {
    "front": "Genç, alarm bulgusu olmayan dispepsi hastasında ileri yaş dispepsisinden farklı olarak hangi başlangıç yaklaşımı düşünülebilir?",
    "keywords": [
      "genç dispepsi",
      "alarm yok",
      "H. pylori",
      "PPI"
    ],
    "back": "Noninvaziv H. pylori test-et-tedavi veya ampirik asit baskılama yaklaşımı.",
    "answer": "H. pylori test-et-tedavi veya ampirik PPI.",
    "explanation": "Düşük riskli genç hastada malignite olasılığı daha düşüktür; bu nedenle her hastaya doğrudan endoskopi gerekmez. Noninvaziv H. pylori testi pozitifse eradikasyon, negatifse veya semptom baskınsa PPI denemesi uygulanabilir. Kilo kaybı, disfaji, kanama veya anemi gibi alarm bulguları varsa algoritma endoskopiye döner.",
    "tusTip": "Dispepsi sorusunda yaş ve alarm bulgusu tedavi-deneme ile endoskopi kararını ayırır.",
    "differentialNote": "Disfaji veya GİS kanama gibi alarm bulguları varsa hasta genç olsa bile endoskopi öncelenir."
  },
  "tus-pearl-internal-medicine-347-spot": {
    "front": "Safra taşı olan hastada koledok genişliği saptanmış ancak acil kolanjit yoksa kanal taşını noninvaziv değerlendirmede hangi tetkik uygundur?",
    "keywords": [
      "koledok taşı",
      "MRCP",
      "EUS",
      "ERCP"
    ],
    "back": "MRCP veya endoskopik ultrason ile koledok taşının değerlendirilmesi.",
    "answer": "MRCP/EUS ile noninvaziv değerlendirme.",
    "explanation": "Koledok taşı şüphesinde görüntüleme olasılığı ve klinik ağırlık tedavi yolunu belirler. Orta olasılıkta MRCP veya EUS gereksiz ERCP riskini azaltarak taşı gösterebilir. ERCP tanısal olmaktan çok taş çıkarma veya drenaj gerektiğinde terapötik değer taşır.",
    "tusTip": "Koledok taşı şüphesinde MRCP/EUS tanısal; ERCP daha çok terapötik müdahaledir.",
    "differentialNote": "Akut kolanjit veya belirgin obstrüksiyon varsa yalnız görüntüleme değil biliyer drenaj ihtiyacı öne çıkar."
  },
  "tus-pearl-internal-medicine-347-extra": {
    "front": "Koledok taşı şüphesine ateş, sarılık ve sepsis bulguları eklenirse MRCP yerine hangi yaklaşım öncelik kazanır?",
    "keywords": [
      "akut kolanjit",
      "koledok taşı",
      "ERCP",
      "biliyer drenaj"
    ],
    "back": "Antibiyotikle birlikte acil biliyer drenaj; çoğunlukla terapötik ERCP.",
    "answer": "Acil ERCP ile biliyer drenaj.",
    "explanation": "Ateş, sarılık ve sağ üst kadran ağrısı safra yolu obstrüksiyonuna enfeksiyon eklendiğini düşündürür. Bu durumda sorun yalnız taşı göstermek değil, enfekte ve basınçlı safra yolunu boşaltmaktır. Geciken drenaj sepsis ve organ yetmezliği riskini artırır.",
    "tusTip": "Kolanjit tablosunda ERCP’nin rolü tanıdan çok hayat kurtarıcı drenajdır.",
    "differentialNote": "Komplike olmayan biliyer kolikte acil ERCP gerekmez; kolanjitte enfeksiyon + obstrüksiyon birlikte yönetilir."
  },
  "tus-pearl-internal-medicine-348-spot": {
    "front": "Siroz ve asiti olan hastada spontan bakteriyel peritonit tanısı için asit sıvısı PMN eşik değeri kaçtır?",
    "keywords": [
      "SBP",
      "asit PMN",
      "250/mm³",
      "siroz"
    ],
    "back": "Asit sıvısında PMN ≥250/mm³.",
    "answer": "PMN sayısı 250/mm³ ve üzeri.",
    "explanation": "SBP’de tanısal karar kültür sonucunu beklemeden asit sıvısındaki nötrofil sayısına dayanır. PMN 250/mm³ ve üzerindeyse uygun klinik bağlamda tedavi başlanır. Kültür negatifliği SBP’yi dışlamaz; çünkü kültür duyarlılığı sınırlı olabilir.",
    "tusTip": "Sirotik asitte SBP için kritik sayı PMN 250/mm³’tür.",
    "differentialNote": "Sekonder peritonitte çoklu flora, çok yüksek protein/LDH veya düşük glukoz gibi bulgular ek cerrahi kaynak araştırmasını gerektirebilir."
  },
  "tus-pearl-internal-medicine-348-extra": {
    "front": "Asit kültürü negatif olsa bile PMN ≥250/mm³ olan siroz hastasında yaklaşım nasıl olmalıdır?",
    "keywords": [
      "kültür negatif SBP",
      "PMN 250",
      "antibiyotik",
      "albumin"
    ],
    "back": "SBP kabul edilerek ampirik antibiyotik başlanır ve uygun hastada albumin değerlendirilir.",
    "answer": "SBP gibi tedavi edilir.",
    "explanation": "Kültür negatif nötrositik asit, klinik olarak SBP spektrumunda değerlendirilir. Tedaviyi kültür sonucuna bırakmak böbrek yetmezliği ve mortalite riskini artırabilir. Böbrek fonksiyon bozukluğu veya yüksek bilirübin gibi risklerde albumin eklenmesi hepatorenal komplikasyon riskini azaltmak için önemlidir.",
    "tusTip": "SBP’de kültür değil PMN eşiği tedavi kararını başlatır.",
    "differentialNote": "Asit PMN düşük ama kültür pozitifse bakteriasit söz konusu olabilir; semptom ve risk durumuna göre ayrı değerlendirilir."
  },
  "tus-pearl-internal-medicine-349-spot": {
    "front": "Sirozlu hastada yeni bilinç değişikliği ve asit varlığında hepatik ensefalopatiyi tetikleyen hangi komplikasyon öncelikle dışlanmalıdır?",
    "keywords": [
      "hepatik ensefalopati",
      "siroz",
      "asit",
      "SBP"
    ],
    "back": "Spontan bakteriyel peritonit.",
    "answer": "SBP’nin dışlanması için tanısal parasentez.",
    "explanation": "Hepatik ensefalopati çoğu zaman enfeksiyon, GİS kanama, kabızlık, elektrolit bozukluğu veya sedatiflerle tetiklenir. Asitli siroz hastasında enfeksiyon odağı belirgin olmasa bile SBP bilinç değişikliğine yol açabilir. Bu nedenle parasentez, yalnız amonyak düzeyi bakmaktan daha kritik bir klinik adımdır.",
    "tusTip": "Siroz + asit + yeni ensefalopati sorusunda SBP dışlanmadan tablo açıklanmış kabul edilmez.",
    "differentialNote": "Amonyak yüksekliği destekleyebilir ama ensefalopati şiddetiyle birebir korele değildir; tetikleyici aramak gerekir."
  },
  "tus-pearl-internal-medicine-349-extra": {
    "front": "Hepatik ensefalopati tedavisinde laktülozun temel amacı hangi bağırsak kaynaklı toksini azaltmaktır?",
    "keywords": [
      "hepatik ensefalopati",
      "laktüloz",
      "amonyak",
      "tetikleyici"
    ],
    "back": "Amonyak üretimi ve emilimini azaltmak.",
    "answer": "Amonyak yükünü azaltmak.",
    "explanation": "Laktüloz kolonda pH’ı düşürerek amonyağın amonyum formunda tutulmasını ve dışkıyla atılmasını artırır. Ayrıca katartik etkiyle bağırsak kaynaklı azot yükünü azaltır. Etkin tedavi yalnız laktüloz vermek değil; enfeksiyon, kanama, kabızlık ve elektrolit bozukluğu gibi tetikleyicileri de düzeltmektir.",
    "tusTip": "Hepatik ensefalopati sorusunda tedavi zinciri laktüloz + tetikleyici arama şeklinde düşünülür.",
    "differentialNote": "Primer nörolojik olayda fokal nörolojik defisit daha belirgin olabilir; sirozlu hastada yine de metabolik ve enfeksiyöz tetikleyiciler taranır."
  },
  "tus-pearl-internal-medicine-350-spot": {
    "front": "Orta yaş kadın hastada kaşıntı, kolestatik enzim yüksekliği ve AMA pozitifliği hangi hastalığı düşündürür?",
    "keywords": [
      "PBC",
      "AMA",
      "kolestaz",
      "kaşıntı"
    ],
    "back": "Primer biliyer kolanjit.",
    "answer": "Primer biliyer kolanjit.",
    "explanation": "Primer biliyer kolanjitte küçük intrahepatik safra kanallarına otoimmün hasar gelişir. Bu nedenle ALP-GGT baskın kolestatik patern, kaşıntı ve antimitochondrial antikor pozitifliği klasik birlikteliktir. Kronik kolestaz ilerlerse siroz ve yağda çözünen vitamin eksiklikleri gelişebilir.",
    "tusTip": "AMA pozitifliği + kolestaz + kaşıntı PBC için çok yüksek verimli ipucudur.",
    "differentialNote": "PSC daha çok ülseratif kolit ve büyük safra yollarında multifokal darlık-genişleme paterniyle ayrılır."
  },
  "tus-pearl-internal-medicine-350-extra": {
    "front": "Primer biliyer kolanjitte hastalık seyrini yavaşlatmak için kullanılan temel ilk tedavi nedir?",
    "keywords": [
      "PBC",
      "ursodeoksikolik asit",
      "kolestaz",
      "AMA"
    ],
    "back": "Ursodeoksikolik asit tedavisi.",
    "answer": "Ursodeoksikolik asit.",
    "explanation": "PBC’de otoimmün küçük safra kanalı hasarı kronik kolestaza yol açar. Ursodeoksikolik asit safra asidi toksisitesini azaltarak biyokimyasal yanıt ve hastalık seyri açısından temel tedavidir. Kaşıntı için ek semptomatik tedaviler gerekebilir ancak hastalığın ana tedavi basamağı UDCA’dır.",
    "tusTip": "PBC tanı ipucu AMA; klasik tedavi ipucu ursodeoksikolik asittir.",
    "differentialNote": "Ekstrahepatik mekanik obstrüksiyonda temel yaklaşım tıkanıklığın giderilmesidir; UDCA bu durumun yerine geçmez."
  },
  "tus-pearl-internal-medicine-351-spot": {
    "front": "Ülseratif kolitli hastada MRCP’de safra yollarında boncuk dizisi görünümü hangi tanıyı destekler?",
    "keywords": [
      "PSC",
      "boncuk dizisi",
      "ülseratif kolit",
      "MRCP"
    ],
    "back": "Primer sklerozan kolanjit.",
    "answer": "Primer sklerozan kolanjit.",
    "explanation": "PSC intrahepatik ve ekstrahepatik safra yollarında inflamasyon-fibrozis sonucu ardışık darlık ve genişlemeler oluşturur. Bu görünüm MRCP’de boncuk dizisi olarak tarif edilir. Ülseratif kolit birlikteliği ve kolestatik enzim paterni tanısal olasılığı güçlendirir.",
    "tusTip": "Ülseratif kolit + kolestaz + boncuk dizisi safra yolu görüntüsü PSC lehinedir.",
    "differentialNote": "PBC’de AMA pozitifliği ve küçük intrahepatik kanal tutulumu öne çıkar; büyük kanal boncuklanması PSC’ye aittir."
  },
  "tus-pearl-internal-medicine-351-extra": {
    "front": "Primer sklerozan kolanjitli hastada uzun dönem izlemde özellikle hangi malignite riski artar?",
    "keywords": [
      "PSC",
      "kolanjiyokarsinom",
      "ülseratif kolit",
      "kolestaz"
    ],
    "back": "Kolanjiyokarsinom riski.",
    "answer": "Kolanjiyokarsinom.",
    "explanation": "PSC’de kronik safra yolu inflamasyonu ve fibrozisi malign dönüşüm riskini artırır. Ülseratif kolit birlikteliği nedeniyle kolorektal kanser riski de dikkatle izlenmelidir. Bu nedenle PSC yalnız kolestaz nedeni değil, malignite izlemi gerektiren bir hastalık olarak düşünülmelidir.",
    "tusTip": "PSC kartında boncuk dizisi tanıya; kolanjiyokarsinom komplikasyona götürür.",
    "differentialNote": "PBC’de osteoporoz ve yağda çözünen vitamin eksikliği öne çıkabilir; PSC’de büyük kanal hastalığı ve kolanjiyokarsinom riski daha klasiktir."
  },
  "tus-pearl-internal-medicine-352-spot": {
    "front": "Ateş, sarılık ve sağ üst kadran ağrısı birlikteliği hangi acil hepatobiliyer tabloyu düşündürür?",
    "keywords": [
      "Charcot triadı",
      "akut kolanjit",
      "sarılık",
      "sağ üst kadran ağrısı"
    ],
    "back": "Akut kolanjit.",
    "answer": "Akut kolanjit.",
    "explanation": "Charcot triadı safra yolu obstrüksiyonuna bakteriyel enfeksiyon eklendiğini düşündürür. Klinik tablo ilerlerse hipotansiyon ve bilinç değişikliğiyle Reynolds pentadı gelişebilir. Bu nedenle antibiyotik ve kaynak kontrolü, yani biliyer drenaj, geciktirilmemesi gereken basamaklardır.",
    "tusTip": "Charcot triadı tanıyı; Reynolds pentadı ağır/septik kolanjiti düşündürür.",
    "differentialNote": "Akut kolesistitte Murphy bulgusu ve sağ üst kadran ağrısı belirgin olabilir; sarılık ve sepsis eklenmesi kolanjiti daha çok destekler."
  },
  "tus-pearl-internal-medicine-352-extra": {
    "front": "Akut kolanjitte hipotansiyon veya bilinç değişikliği gelişirse tedavi önceliği nasıl değişir?",
    "keywords": [
      "akut kolanjit",
      "Reynolds pentadı",
      "ERCP",
      "sepsis"
    ],
    "back": "Geniş spektrumlu antibiyotikle birlikte acil biliyer drenaj öncelenir.",
    "answer": "Acil antibiyotik ve ERCP ile biliyer drenaj.",
    "explanation": "Hipotansiyon ve bilinç değişikliği enfeksiyonun sistemik dolaşımı etkilediğini ve ağır kolanjit geliştiğini gösterir. Antibiyotik gerekli olsa da obstrükte enfekte safra yolu boşaltılmadan kaynak kontrolü sağlanamaz. ERCP çoğu hastada hem drenaj hem taş çıkarma açısından öncelikli yöntemdir.",
    "tusTip": "Kolanjitte sepsis bulgusu varsa soru genellikle ‘antibiyotik + drenaj’ cevabına gider.",
    "differentialNote": "Basit biliyer kolikte enfeksiyon yoktur; ateş, sarılık ve hipotansiyon kaynak kontrolü gerektiren kolanjiti ayırır."
  },
  "tus-pearl-internal-medicine-353-spot": {
    "front": "Akut pankreatit tanısını desteklemek için tipik karın ağrısına eşlik eden en kullanışlı laboratuvar bulgusu nedir?",
    "keywords": [
      "akut pankreatit",
      "lipaz",
      "epigastrik ağrı",
      "tanı"
    ],
    "back": "Serum lipazının normal üst sınırın en az 3 katına yükselmesi.",
    "answer": "Serum lipaz yüksekliği.",
    "explanation": "Akut pankreatit tanısı tipik epigastrik ağrı, pankreatik enzim yüksekliği ve görüntüleme bulgularından en az ikisiyle desteklenir. Lipaz amilaza göre daha özgül ve daha uzun süre yüksek kalma eğilimindedir. Enzim yüksekliği tek başına klinik bağlam olmadan yorumlanmamalıdır.",
    "tusTip": "Epigastrik sırta vuran ağrı + lipaz ≥3 kat akut pankreatit için klasik sınav kombinasyonudur.",
    "differentialNote": "Biliyer etiyolojide ALT yüksekliği ipucu verebilir; pankreatitin tanısal enzimi olarak lipaz daha değerlidir."
  },
  "tus-pearl-internal-medicine-353-extra": {
    "front": "Klasik ağrı ve lipaz yüksekliği olan akut pankreatitte erken dönemde BT her hastada neden zorunlu değildir?",
    "keywords": [
      "akut pankreatit",
      "BT",
      "lipaz",
      "şiddet değerlendirme"
    ],
    "back": "Tanı klinik ve laboratuvarla konabilir; BT daha çok tanı belirsizliği veya komplikasyon/şiddet değerlendirmesi için kullanılır.",
    "answer": "BT tanı belirsizliği veya komplikasyon şüphesinde öncelenir.",
    "explanation": "Tipik ağrı ve belirgin lipaz yüksekliği varsa tanı çoğu hastada görüntüleme olmadan desteklenir. Erken BT nekrozu olduğundan az gösterebilir ve her hastada yönetimi değiştirmez. Ağır seyir, tanı belirsizliği, klinik kötüleşme veya komplikasyon şüphesi BT endikasyonunu güçlendirir.",
    "tusTip": "Akut pankreatitte BT değil, tipik ağrı + lipaz çoğu soruda tanıyı kurar.",
    "differentialNote": "Safra taşı etiyolojisini araştırmak için abdominal USG erken dönemde değerlidir; bu BT ile aynı karar değildir."
  },
  "tus-pearl-internal-medicine-354-spot": {
    "front": "Alarm bulgusu olmayan genç dispepsi hastasında H. pylori açısından uygun başlangıç yaklaşımı nedir?",
    "keywords": [
      "H. pylori",
      "dispepsi",
      "test-et-tedavi",
      "üre nefes testi"
    ],
    "back": "Noninvaziv test yapıp pozitifse eradikasyon tedavisi vermek.",
    "answer": "H. pylori test-et-tedavi yaklaşımı.",
    "explanation": "Genç ve alarm bulgusu olmayan dispepsi hastasında invaziv endoskopi yerine noninvaziv H. pylori testi uygun olabilir. Pozitif test peptik ülser ve dispepsi ilişkili semptomlar için eradikasyon tedavisi gerektirir. Test seçilirken PPI, antibiyotik ve bizmut kullanımının yalancı negatifliğe yol açabileceği unutulmamalıdır.",
    "tusTip": "Genç + alarm yok + dispepsi sorusunda H. pylori test-et-tedavi sık hedeflenir.",
    "differentialNote": "Kilo kaybı, disfaji, GİS kanama veya ileri yaş varsa noninvaziv testle oyalanmadan endoskopi düşünülür."
  },
  "tus-pearl-internal-medicine-354-extra": {
    "front": "H. pylori eradikasyonundan sonra tedavi başarısını göstermek için hangi testler tercih edilir?",
    "keywords": [
      "H. pylori",
      "eradikasyon kontrolü",
      "üre nefes testi",
      "dışkı antijen"
    ],
    "back": "Üre nefes testi veya dışkı antijen testi.",
    "answer": "Üre nefes testi ya da dışkı antijen testi.",
    "explanation": "Eradikasyon sonrası başarı noninvaziv olarak aktif enfeksiyonu gösteren testlerle değerlendirilir. Seroloji geçirilmiş enfeksiyon antikorlarını uzun süre pozitif tutabileceği için tedavi başarısını göstermek için uygun değildir. Testin yalancı negatif olmaması için PPI ve antibiyotik/bizmut etkisi zamanlama açısından dikkate alınmalıdır.",
    "tusTip": "H. pylori’de tanı ve eradikasyon kontrolü aktif enfeksiyon testiyle yapılır; seroloji kontrol testi değildir.",
    "differentialNote": "Endoskopik biyopsi alarm bulgusu veya komplike ülser şüphesinde gerekir; rutin eradikasyon kontrolünde şart değildir."
  },
  "tus-pearl-internal-medicine-355-spot": {
    "front": "Katı ve sıvı gıdalara disfaji olan hastada akalazyayı doğrulayan temel fonksiyonel test hangisidir?",
    "keywords": [
      "akalazya",
      "manometri",
      "LES gevşeme kusuru",
      "aperistaltizm"
    ],
    "back": "Özofagus manometrisi.",
    "answer": "Yüksek çözünürlüklü özofagus manometrisi.",
    "explanation": "Akalazyada hem katı hem sıvı disfaji motilite bozukluğunu düşündürür. Manometri alt özofagus sfinkterinde gevşeme kusurunu ve özofagus gövdesinde aperistaltizmi göstererek tanıyı doğrular. Baryum grafide kuş gagası ipucu verebilir ama fonksiyonel kesinlik manometriyle sağlanır.",
    "tusTip": "Akalazyada baryum grafi şüphelendirir; manometri tanıyı doğrular.",
    "differentialNote": "Mekanik darlıkta disfaji önce katılara başlar; akalazyada katı ve sıvı disfaji birlikte olabilir."
  },
  "tus-pearl-internal-medicine-355-extra": {
    "front": "İleri yaşta hızlı kilo kaybı ve yeni disfaji ile akalazya benzeri tablo varsa tedavi öncesi hangi durum dışlanmalıdır?",
    "keywords": [
      "psödoakalazya",
      "malignite",
      "endoskopi",
      "kilo kaybı"
    ],
    "back": "Maligniteye bağlı psödoakalazya.",
    "answer": "Özofagogastrik maligniteye bağlı psödoakalazya dışlanmalıdır.",
    "explanation": "Akalazya benzeri disfaji distal özofagus veya gastroözofageal bileşke tümörleriyle taklit edilebilir. İleri yaş, kısa sürede belirgin kilo kaybı ve hızlı semptom başlangıcı psödoakalazya lehine uyarıcıdır. Bu nedenle endoskopi, özellikle malign mekanik darlığı dışlamak için tedavi planından önce önemlidir.",
    "tusTip": "Akalazya düşünülen yaşlı ve kilo kaybeden hastada psödoakalazya tuzağını unutma.",
    "differentialNote": "Primer akalazya kronik motilite bozukluğudur; psödoakalazya mekanik/malign infiltrasyonla benzer manometrik görünüm oluşturabilir."
  },
  "tus-pearl-internal-medicine-356-spot": {
    "front": "Kronik reflü zemininde gelişen Barrett özofagusunda beklenen temel epitel değişimi nedir?",
    "keywords": [
      "Barrett",
      "intestinal metaplazi",
      "reflü",
      "adenokarsinom"
    ],
    "back": "Distal özofagusta skuamöz epitelin intestinal tip kolumnar epitele dönüşmesi.",
    "answer": "İntestinal tip kolumnar metaplazi.",
    "explanation": "Uzun süreli asit reflüsü distal özofagus skuamöz epitelinde adaptif metaplaziye yol açabilir. Barrett özofagusu adenokarsinom riskini artırdığı için yalnız reflü semptomu olarak görülmemelidir. Tanı endoskopik görünüm ve biyopside intestinal metaplaziyle desteklenir.",
    "tusTip": "Barrett = kronik GERD + intestinal metaplazi + adenokarsinom riski.",
    "differentialNote": "Özofagus skuamöz hücreli kanseri daha çok sigara, alkol ve üst/orta özofagus ilişkisiyle düşünülür."
  },
  "tus-pearl-internal-medicine-356-extra": {
    "front": "Barrett özofagusunda displazi saptanması klinik olarak neden önemlidir?",
    "keywords": [
      "Barrett",
      "displazi",
      "endoskopik izlem",
      "adenokarsinom riski"
    ],
    "back": "Adenokarsinom gelişim riskini artırdığı için endoskopik izlem veya eradikasyon tedavisi kararını etkiler.",
    "answer": "Kanser riski ve endoskopik yönetim kararını belirler.",
    "explanation": "Barrett zemininde displazi, metaplazinin neoplastik dönüşüm yönünde ilerlediğini gösterir. Displazi derecesi izlem aralığını ve endoskopik ablasyon/rezeksiyon gereksinimini belirleyebilir. Bu nedenle biyopsi sonucu yalnız tanı koymaz, takip stratejisini de yönlendirir.",
    "tusTip": "Barrett sorusunda displazi kelimesi takip ve endoskopik tedavi kararının ağırlığını artırır.",
    "differentialNote": "Displazi olmayan reflü özofajitinde temel yaklaşım asit baskılama ve risk kontrolüdür; displazi varlığında onkolojik risk yönetimi eklenir."
  },
  "tus-pearl-internal-medicine-357-spot": {
    "front": "Metastatik kolorektal kanserde anti-EGFR tedavi düşünülüyorsa hangi mutasyonların varlığı tedavi yanıtını azaltır?",
    "keywords": [
      "kolorektal kanser",
      "KRAS",
      "NRAS",
      "anti-EGFR"
    ],
    "back": "KRAS veya NRAS mutasyonları.",
    "answer": "RAS mutasyonları; özellikle KRAS/NRAS.",
    "explanation": "EGFR yolu RAS üzerinden aşağı akım proliferasyon sinyali oluşturur. RAS mutasyonu varsa sinyal EGFR blokajından bağımsız aktif kalabilir ve anti-EGFR ajanlara yanıt beklenmez. Bu nedenle metastatik kolorektal kanserde hedefe yönelik tedavi öncesi RAS durumu klinik kararın temel parçasıdır.",
    "tusTip": "Anti-EGFR planlanıyorsa önce RAS wild-type mı diye düşün.",
    "differentialNote": "HER2 veya BRAF gibi belirteçler ayrı hedef/Prognoz bilgisi sağlar; anti-EGFR için klasik sınav ayrımı RAS mutasyonudur."
  },
  "tus-pearl-internal-medicine-357-extra": {
    "front": "Kolorektal kanserde dMMR/MSI-H saptanması tedavi seçimini hangi yönde etkileyebilir?",
    "keywords": [
      "kolorektal kanser",
      "MSI-H",
      "dMMR",
      "immünoterapi"
    ],
    "back": "İmmün kontrol noktası inhibitörlerine yanıt olasılığını artırır.",
    "answer": "İmmünoterapi duyarlılığını destekler.",
    "explanation": "Mismatch repair bozukluğu mikrosatellit instabilite ve yüksek neoantijen yükü oluşturabilir. Bu tümörler bağışıklık sistemi tarafından daha görünür hale geldiğinden immün kontrol noktası inhibitörlerinden fayda görebilir. Böylece biyobelirteç yalnız tanısal değil, tedavi seçimini belirleyen bir bilgiye dönüşür.",
    "tusTip": "Kolorektal kanserde RAS anti-EGFR kararını, MSI-H/dMMR ise immünoterapi olasılığını düşündürür.",
    "differentialNote": "Mikrosatellit stabil tümörlerde immünoterapi beklentisi daha düşüktür; klasik kemoterapi/hedef tedavi seçenekleri öne çıkar."
  },
  "tus-pearl-internal-medicine-358-spot": {
    "front": "KLL’yi mantle hücreli lenfomadan ayırmada hangi immünfenotipik patern özellikle yardımcıdır?",
    "keywords": [
      "KLL",
      "CD5",
      "CD23",
      "mantle hücreli lenfoma"
    ],
    "back": "KLL’de CD5 pozitif ve CD23 pozitif klonal B hücre paterni.",
    "answer": "CD5+ CD23+ klonal B hücre paterni.",
    "explanation": "KLL, B hücre kökenli olmasına rağmen CD5 ekspresyonu gösterebilir; CD23 pozitifliği bu paterni destekler. Mantle hücreli lenfoma da CD5 pozitif olabilir fakat genellikle CD23 negatif ve cyclin D1 pozitifliğiyle ayrılır. Bu ayrım lenfositoz ve lenfadenopati sorularında sık yapılan tuzaktır.",
    "tusTip": "KLL = CD5+ CD23+; mantle hücreli lenfoma = CD5+ CD23− düşün.",
    "differentialNote": "Foliküler lenfoma tipik olarak CD10/BCL6 ilişkisiyle germinal merkez fenotipi gösterir; KLL paterniyle karıştırılmamalıdır."
  },
  "tus-pearl-internal-medicine-358-extra": {
    "front": "Asemptomatik erken evre KLL tanısı alan hastada tedavi gerektiren bulgu yoksa başlangıç yaklaşımı nedir?",
    "keywords": [
      "KLL",
      "asemptomatik",
      "izlem",
      "tedavi endikasyonu"
    ],
    "back": "Yakın klinik izlem; hemen kemoterapi başlanmaz.",
    "answer": "Watchful waiting / düzenli izlem.",
    "explanation": "KLL’de erken evre ve asemptomatik hastalarda erken tedavi sağkalım avantajı göstermediği için izlem uygundur. Tedavi kararı semptomatik hastalık, ilerleyici sitopeni, hızlı lenfosit artışı, bulky lenfadenopati veya organomegali gibi endikasyonlarla verilir. Bu kartın tuzağı tanı konar konmaz kemoterapi başlamaktır.",
    "tusTip": "KLL’de tedavi hastalığın varlığına değil, aktif/progresif hastalık bulgularına göre başlanır.",
    "differentialNote": "Akut lösemide blast artışı ve kemik iliği yetmezliği acil tedavi gerektirir; stabil erken KLL farklı yönetilir."
  },
  "tus-pearl-internal-medicine-359-spot": {
    "front": "Hemoliz laboratuvarına direkt Coombs pozitifliği eşlik ediyorsa aneminin nedeni nasıl sınıflanır?",
    "keywords": [
      "AIHA",
      "direkt Coombs",
      "hemoliz",
      "LDH"
    ],
    "back": "Otoimmün hemolitik anemi.",
    "answer": "İmmün aracılı hemoliz; otoimmün hemolitik anemi.",
    "explanation": "Hemolizde retikülositoz, LDH ve indirekt bilirubin yüksekliği, haptoglobin düşüklüğü beklenir. Direkt Coombs pozitifliği eritrosit yüzeyine bağlı antikor veya komplemanı göstererek hemolizin immün mekanizmalı olduğunu kanıtlar. Bu bulgu mikroanjiyopatik veya enzim eksikliği kaynaklı hemolizlerden ayrımda kritiktir.",
    "tusTip": "Hemoliz paterni + direkt Coombs pozitifliği = AIHA düşün.",
    "differentialNote": "TTP/HUS gibi mikroanjiyopatik hemolizde şistosit görülür ve direkt Coombs genellikle negatiftir."
  },
  "tus-pearl-internal-medicine-359-extra": {
    "front": "Sıcak ve soğuk otoimmün hemolitik anemiyi antikor tipi açısından nasıl ayırırsın?",
    "keywords": [
      "sıcak AIHA",
      "soğuk aglutinin",
      "IgG",
      "IgM"
    ],
    "back": "Sıcak AIHA çoğunlukla IgG; soğuk aglutinin hastalığı IgM/kompleman aracılıdır.",
    "answer": "Sıcak tip IgG, soğuk tip IgM-kompleman ilişkili.",
    "explanation": "Sıcak AIHA’da IgG kaplı eritrositler özellikle dalakta makrofajlarca yıkılır ve ekstravasküler hemoliz gelişir. Soğuk aglutinin hastalığında IgM düşük ısıda bağlanır, komplemanı aktive eder ve akrosiyanoz gibi soğukla ilişkili bulgular görülebilir. Bu ayrım Coombs testinde hangi komponentin pozitif olduğuyla da desteklenir.",
    "tusTip": "Sıcak = IgG/dalak; soğuk = IgM-kompleman/akral soğuk semptomları.",
    "differentialNote": "Herediter sferositozda sferosit görülebilir ancak Coombs negatiftir; otoimmün sıcak tipte Coombs pozitifliği ayırıcıdır."
  },
  "tus-pearl-internal-medicine-360-spot": {
    "front": "Kemik ağrısı, anemi, böbrek yetmezliği, hiperkalsemi ve M proteini hangi hematolojik maligniteyi düşündürür?",
    "keywords": [
      "multipl miyelom",
      "CRAB",
      "M proteini",
      "litik lezyon"
    ],
    "back": "Multipl miyelom.",
    "answer": "Multipl miyelom.",
    "explanation": "Multipl miyelom klonal plazma hücrelerinin monoklonal immünoglobulin veya hafif zincir üretmesiyle gelişir. CRAB bulguları; hiperkalsemi, renal yetmezlik, anemi ve kemik lezyonlarını ifade eder. Osteolitik lezyonlar, M spike ve plazma hücre artışı tanı zincirinin ana parçalarıdır.",
    "tusTip": "CRAB + M proteini + litik kemik lezyonu multipl miyelom için klasik üçlü mantıktır.",
    "differentialNote": "MGUS’ta M proteini olabilir ancak CRAB bulguları ve organ hasarı beklenmez."
  },
  "tus-pearl-internal-medicine-360-extra": {
    "front": "Multipl miyelom şüphesinde monoklonal protein ve hafif zincir yükünü göstermek için hangi testler kullanılır?",
    "keywords": [
      "multipl miyelom",
      "SPEP",
      "serbest hafif zincir",
      "M proteini"
    ],
    "back": "Serum/idrarda protein elektroforezi-immünfiksasyon ve serum serbest hafif zincir analizi.",
    "answer": "SPEP/UPEP-immünfiksasyon ve serum serbest hafif zincir testi.",
    "explanation": "Miyelomda yalnız tam kan sayımı veya direkt grafi tanısal zinciri tamamlamaz; monoklonal proteinin gösterilmesi gerekir. Serum ve idrar elektroforezi/immünfiksasyon M proteinini, serbest hafif zincir analizi özellikle hafif zincir hastalığını saptamada yardımcıdır. Kemik iliği plazma hücre oranı ve organ hasarı ile birlikte tanı netleşir.",
    "tusTip": "Miyelomda CRAB klinik ipucu; M proteini ve kemik iliği değerlendirmesi tanısal kanıttır.",
    "differentialNote": "Waldenström makroglobulinemisinde IgM ve hiperviskozite öne çıkar; osteolitik CRAB paterni miyelomu daha çok destekler."
  },
  "tus-pearl-internal-medicine-361-spot": {
    "front": "Büyük hipofiz makroadenomu olan hastada prolaktin beklenenden sadece orta düzey yüksekse hangi laboratuvar tuzağı düşünülmelidir?",
    "keywords": [
      "prolaktinoma",
      "hook etkisi",
      "makroadenom",
      "serum dilüsyonu"
    ],
    "back": "Hook etkisi.",
    "answer": "Hook etkisi ve serum dilüsyonu gereksinimi.",
    "explanation": "Çok yüksek prolaktin düzeyi immünoassayde antikor-antijen bağlanma dengesini bozarak yalancı düşük veya orta düzey sonuç oluşturabilir. Büyük makroadenom ile uyumsuz prolaktin düzeyi varsa örnek dilüe edilerek tekrar ölçülmelidir. Bu adım prolaktinomayı nonfonksiyonel adenom sanma hatasını önler.",
    "tusTip": "Dev makroadenom + beklenenden düşük prolaktin = hook etkisi için serum dilüsyonu düşün.",
    "differentialNote": "Stalk etkisi prolaktini genellikle orta düzey artırır; hook etkisi gerçek çok yüksek prolaktini olduğundan düşük gösterir."
  },
  "tus-pearl-internal-medicine-361-extra": {
    "front": "Prolaktinoma ile stalk etkisi arasındaki prolaktin düzeyi ayrımı klinik yorumda nasıl kullanılır?",
    "keywords": [
      "prolaktinoma",
      "stalk etkisi",
      "prolaktin",
      "makroadenom"
    ],
    "back": "Çok yüksek prolaktin prolaktinomayı, orta düzey artış stalk etkisini destekler; uyumsuz makroadenomda hook etkisi dışlanır.",
    "answer": "Çok yüksek prolaktin prolaktinoma lehine; orta artış stalk etkisi lehine yorumlanır.",
    "explanation": "Prolaktinoma prolaktini doğrudan salgıladığı için değerler genellikle tümör boyutuyla uyumlu şekilde çok yüksek olabilir. Nonfonksiyonel kitleler dopamin inhibisyonunu keserek daha sınırlı prolaktin artışı yapar. Makroadenom çok büyük ama prolaktin beklenenden düşükse hook etkisi için dilüsyonla tekrar ölçüm gerekir.",
    "tusTip": "Hipofiz kitlesinde prolaktin düzeyinin tümör boyutuyla uyumu tanı tuzağını çözer.",
    "differentialNote": "Primer hipotiroidide TRH artışı prolaktini yükseltebilir; bu nedenle prolaktin yüksekliğinde TSH değerlendirmesi de önemlidir."
  },
  "tus-pearl-internal-medicine-362-spot": {
    "front": "Aktif orta-ağır Graves oftalmopatisinde tiroid kontrolüne ek olarak hangi tedavi yaklaşımı kullanılabilir?",
    "keywords": [
      "Graves oftalmopati",
      "glukokortikoid",
      "ekzoftalmus",
      "inflamasyon"
    ],
    "back": "Sistemik glukokortikoid tedavi.",
    "answer": "Sistemik glukokortikoid.",
    "explanation": "Graves oftalmopatisi orbital fibroblast aktivasyonu, inflamasyon ve glikozaminoglikan birikimiyle gelişir. Aktif inflamatuvar dönemde glukokortikoidler ödem ve inflamasyonu azaltmak için kullanılabilir. Tiroid hormon kontrolü önemlidir ancak aktif ciddi göz hastalığı ayrı immün/inflamatuvar tedavi gerektirebilir.",
    "tusTip": "Graves’te göz bulgusu aktif ve ciddi ise yalnız antitiroid ilaç düşünmek eksik kalır.",
    "differentialNote": "Radyoaktif iyot aktif oftalmopatiyi kötüleştirebilir; sigara Graves oftalmopatisi riskini ve şiddetini artırır."
  },
  "tus-pearl-internal-medicine-362-extra": {
    "front": "Graves oftalmopatisinde görme azalması veya optik nöropati bulgusu gelişirse yaklaşım neden acildir?",
    "keywords": [
      "Graves oftalmopati",
      "optik nöropati",
      "görme riski",
      "acil tedavi"
    ],
    "back": "Optik sinir basısı kalıcı görme kaybı riski taşıdığı için acil immünsüpresif/dekompresif yaklaşım gerekir.",
    "answer": "Görmeyi tehdit eden oftalmopati acil tedavi gerektirir.",
    "explanation": "Orbital inflamasyon ve doku genişlemesi optik sinir üzerinde bası oluşturabilir. Görme keskinliği azalması, renk görme bozukluğu veya afferent pupil defekti acil uyarı bulgularıdır. Bu durumda tiroid hormonunu düzeltmek tek başına yeterli değildir; yüksek doz steroid ve gerektiğinde orbital dekompresyon gündeme gelir.",
    "tusTip": "Graves oftalmopatisinde görme tehdidi varsa kozmetik sorun değil acil nöro-oftalmolojik durumdur.",
    "differentialNote": "Basit kapak retraksiyonu izlem gerektirebilir; optik nöropati bulgusu yönetimi tamamen değiştirir."
  },
  "tus-pearl-internal-medicine-363-spot": {
    "front": "Diyabetli hastada makroskopik hematüri veya aktif idrar sedimenti saptanması nefropati açısından neyi düşündürür?",
    "keywords": [
      "diyabetik nefropati",
      "makroskopik hematüri",
      "aktif sediment",
      "alternatif glomerülopati"
    ],
    "back": "Diyabetik nefropati dışında başka bir glomerüler hastalık olasılığını.",
    "answer": "Alternatif böbrek hastalığı düşünülmelidir.",
    "explanation": "Klasik diyabetik nefropati genellikle albuminüriyle yavaş ilerler ve aktif nefritik sediment beklenmez. Makroskopik hematüri, eritrosit silendirleri, hızlı kreatinin artışı veya belirgin proteinüri uyumsuzluğu başka glomerülonefritleri düşündürür. Bu bulgular nefroloji değerlendirmesi ve gerekirse biyopsi kararını gündeme getirir.",
    "tusTip": "Diyabetli hastada her böbrek bulgusu otomatik olarak diyabetik nefropati değildir; aktif sediment kırmızı bayraktır.",
    "differentialNote": "Diyabetik retinopati ve uzun süreli albuminüri diyabetik nefropatiyi destekler; ani hematüri farklı tanı aratır."
  },
  "tus-pearl-internal-medicine-363-extra": {
    "front": "Diyabetik nefropati lehine klasik gidiş ile alternatif glomerülopati lehine gidiş nasıl ayrılır?",
    "keywords": [
      "diyabetik nefropati",
      "albuminüri",
      "hematüri",
      "hızlı kreatinin artışı"
    ],
    "back": "Yavaş artan albuminüri diyabetik nefropatiyi; aktif sediment, hızlı bozulma veya makroskopik hematüri alternatif glomerülopatiyi destekler.",
    "answer": "Albuminüri-yavaş seyir diyabetik; aktif sediment-hızlı bozulma alternatif hastalık lehinedir.",
    "explanation": "Diyabetik nefropatide glomerüler bazal membran hasarı ve mezangial genişleme zaman içinde albuminüri ve GFR kaybı oluşturur. Buna karşılık eritrosit silendiri, ani nefritik tablo veya açıklanamayan hızlı kreatinin yükselişi diyabet dışı glomerüler hastalık düşündürür. Bu ayrım gereksiz gecikmeyi önler.",
    "tusTip": "Diyabet + böbrek hastalığı sorusunda ‘hematüri/aktif sediment’ verilirse otomatik diyabetik nefropati deme.",
    "differentialNote": "Hipertansif nefrosklerozda proteinüri genellikle daha hafiftir; nefritik sediment baskınlığı glomerülonefrit lehinedir."
  },
  "tus-pearl-internal-medicine-364-spot": {
    "front": "Hipotonik hiponatremide idrar osmolalitesinin yüksek olması hangi fizyolojik durumu gösterir?",
    "keywords": [
      "hipotonik hiponatremi",
      "idrar osmolalitesi",
      "ADH",
      "su atılımı"
    ],
    "back": "ADH etkisinin sürdüğünü ve serbest su atılımının baskılandığını.",
    "answer": "ADH aracılı su tutulumu sürmektedir.",
    "explanation": "Normalde hipotonik hiponatremide böbrek ADH’yi baskılayıp çok seyreltik idrar üretmelidir. İdrar osmolalitesi yüksekse böbrek suyu atamıyor demektir; bu durum SIADH, hipovolemi, adrenal yetmezlik veya hipotiroidi gibi ADH etkisinin sürdüğü durumlarda görülür. Bu nedenle idrar osmolalitesi hiponatreminin ilk ayırıcı adımlarından biridir.",
    "tusTip": "Hipotonik hiponatremide yüksek idrar osmolalitesi = ADH açık kalmış demektir.",
    "differentialNote": "Primer polidipsi veya düşük solüt alımında idrar osmolalitesi genellikle düşüktür; böbrek suyu seyreltmeye çalışır."
  },
  "tus-pearl-internal-medicine-364-extra": {
    "front": "Hipotonik hiponatremide yüksek idrar osmolalitesiyle birlikte idrar sodyumunun yüksek ve hastanın övolemik olması hangi tanıyı destekler?",
    "keywords": [
      "SIADH",
      "idrar sodyumu",
      "övolemik hiponatremi",
      "idrar osmolalitesi"
    ],
    "back": "SIADH.",
    "answer": "Uygunsuz ADH sendromu (SIADH).",
    "explanation": "SIADH’de ADH etkisi nedeniyle idrar konsantre kalır; intravasküler hacim belirgin azalmadığı için böbrek sodyumu tutma refleksi baskın değildir ve idrar sodyumu yüksek olabilir. Klinik olarak ödem veya ağır hipovolemi beklenmez. Tanıdan önce adrenal yetmezlik, hipotiroidi ve diüretik kullanımı gibi taklitçiler dışlanmalıdır.",
    "tusTip": "Övolemik hipotonik hiponatremi + yüksek idrar osm + yüksek idrar Na SIADH için klasik paterndir.",
    "differentialNote": "Hipovolemik hiponatremide ADH yüksek olabilir ama idrar sodyumu çoğu kez düşük olur; diüretik kullanımı bu ayrımı bozabilir."
  },
  "tus-pearl-internal-medicine-365-spot": {
    "front": "Nefrotik sendromlu erişkinde renal ven trombozu gelişimi en klasik olarak hangi primer glomerülopatiyle ilişkilidir?",
    "keywords": [
      "membranöz nefropati",
      "renal ven trombozu",
      "nefrotik sendrom",
      "hiperkoagülabilite"
    ],
    "back": "Membranöz nefropati.",
    "answer": "Membranöz nefropati.",
    "explanation": "Nefrotik sendromda antitrombin III gibi antikoagülan proteinlerin idrarla kaybı hiperkoagülabilite oluşturur. Membranöz nefropati erişkinde nefrotik sendrom ve renal ven trombozu ile klasik olarak ilişkilidir. Ani yan ağrısı, hematüri veya böbrek fonksiyonunda bozulma trombozu düşündürebilir.",
    "tusTip": "Erişkin nefrotik sendrom + renal ven trombozu denince membranöz nefropatiyi öne al.",
    "differentialNote": "Minimal değişiklik hastalığı çocuk nefrotik sendromunda klasiktir; erişkinde trombozla en klasik bağ membranözdür."
  },
  "tus-pearl-internal-medicine-365-extra": {
    "front": "Nefrotik sendromda tromboz eğilimi hangi temel protein kaybı ve hemostaz bozukluğuyla açıklanır?",
    "keywords": [
      "nefrotik sendrom",
      "antitrombin III",
      "hiperkoagülabilite",
      "tromboz"
    ],
    "back": "Antitrombin III gibi antikoagülan proteinlerin idrarla kaybına bağlı hiperkoagülabilite.",
    "answer": "Antikoagülan protein kaybı ile hiperkoagülabilite.",
    "explanation": "Masif proteinüri yalnız albümin kaybı yapmaz; antitrombin III ve diğer düzenleyici proteinlerin kaybı da pıhtılaşma dengesini tromboz yönüne iter. Karaciğerin kompansatuvar protein sentezi koagülasyon faktörlerini artırarak bu eğilimi güçlendirebilir. Bu mekanizma renal ven trombozu ve venöz tromboemboliyi açıklar.",
    "tusTip": "Nefrotik sendromdaki ödem albümin kaybıyla, tromboz eğilimi antikoagülan protein kaybıyla ilişkilidir.",
    "differentialNote": "Nefritik sendromda hematüri ve hipertansiyon öne çıkar; hiperkoagülabilite nefrotik protein kaybının daha tipik sonucudur."
  },
  "tus-pearl-internal-medicine-366-spot": {
    "front": "Haftalar içinde kreatinin artışı, hematüri ve biyopside kresent oluşumu hangi glomerüler sendromu düşündürür?",
    "keywords": [
      "RPGN",
      "kresent",
      "hızlı böbrek yetmezliği",
      "nefritik sendrom"
    ],
    "back": "Hızlı ilerleyen glomerülonefrit.",
    "answer": "RPGN / kresentik glomerülonefrit.",
    "explanation": "Kresent oluşumu Bowman aralığında fibrin kaçağı ve pariyetal epitel proliferasyonu ile gelişir; ağır glomerüler kapiller hasarı gösterir. Klinik olarak nefritik sediment, hematüri, silendirler ve hızlı GFR kaybı beklenir. Altta anti-GBM hastalığı, ANCA ilişkili vaskülit veya immün kompleks glomerülonefrit bulunabilir.",
    "tusTip": "Kresent kelimesi hızlı ilerleyen nefritik hasar ve acil nefroloji yaklaşımı anlamına gelir.",
    "differentialNote": "Nefrotik sendrom masif proteinüri ve ödemle baskındır; RPGN’de hızlı böbrek fonksiyon kaybı ve aktif sediment belirleyicidir."
  }
}
);
