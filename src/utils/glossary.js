const teachingOnly = 'teachingOnly';

// This glossary is generated from klinikiq_v61_aciklamali_glossary(1).xlsx.
// Source columns used: Terim, Alternatif Yazımlar, Kısa Açıklama (Tooltip İçin), Branş / Kategori, Öncelik.
// The table is treated as the source of truth: no extra low-value/high-value filtering is applied here.

export function normalizeGlossaryText(value = '') {
  return String(value)
    .toLocaleLowerCase('tr')
    .replace(/[İI]/g, 'i')
    .replace(/\s+/g, ' ')
    .trim();
}

export const globalGlossaryTerms = [
  {
    "term": "EKG",
    "aliases": [
      "elektrokardiyografi",
      "12 derivasyon EKG",
      "EKG"
    ],
    "definition": "Kalbin elektriksel aktivitesini kaydeden testtir; ritim, iletim ve iskemi bulgularını değerlendirmede kullanılır.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "retrosternal",
    "aliases": [
      "retrosternal"
    ],
    "definition": "Göğüs kemiği arkasında hissedilen yerleşimi ifade eder; göğüs ağrısı tarifinde sık kullanılır.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "göğüs ağrısı",
    "aliases": [
      "retrosternal baskı",
      "göğüs ağrısı"
    ],
    "definition": "Kalp, akciğer, özofagus, kas-iskelet sistemi veya damar kaynaklı olabilen önemli bir başvuru yakınmasıdır.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "hipertansiyon",
    "aliases": [
      "yüksek tansiyon",
      "hipertansiyon"
    ],
    "definition": "Arteriyel kan basıncının kronik olarak yüksek seyretmesidir; kardiyovasküler ve renal riskleri artırır.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "dislipidemi",
    "aliases": [
      "hiperlipidemi",
      "dislipidemi"
    ],
    "definition": "Kan lipid düzeylerinde bozulmadır; ateroskleroz ve kardiyovasküler risk açısından önemlidir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "derivasyon",
    "aliases": [
      "derivasyonlarında",
      "derivasyon"
    ],
    "definition": "EKG’de kalbin elektriksel aktivitesine farklı açılardan bakan kayıt düzlemlerini ifade eder.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "intravenöz",
    "aliases": [
      "intravenöz",
      "IV"
    ],
    "definition": "Damar içi uygulamayı ifade eder; acil tedavi ve sıvı/ilaç verilmesinde sık kullanılır.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "vital bulgular",
    "aliases": [
      "vital stabilizasyon",
      "vital bulgular"
    ],
    "definition": "Kan basıncı, nabız, solunum, oksijen satürasyonu ve ateş gibi temel klinik ölçümlerdir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "oksijenizasyon",
    "aliases": [
      "oksijenizasyon",
      "oksijenlenme"
    ],
    "definition": "Kanın oksijen taşıma ve dokulara oksijen ulaştırma durumunu ifade eder.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "BT",
    "aliases": [
      "bilgisayarlı tomografi",
      "BT"
    ],
    "definition": "Kesitsel görüntüleme sağlayan radyolojik yöntemdir; akut kanama, travma ve birçok acil tabloda kullanılır.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "MR",
    "aliases": [
      "manyetik rezonans",
      "MR"
    ],
    "definition": "Manyetik alan kullanarak yüksek yumuşak doku çözünürlüğü sağlayan görüntüleme yöntemidir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "USG",
    "aliases": [
      "ultrasonografi",
      "USG"
    ],
    "definition": "Ses dalgalarıyla yapılan görüntüleme yöntemidir; batın, üriner sistem, damar ve obstetrik değerlendirmelerde sık kullanılır.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "hemodinami",
    "aliases": [
      "hemodinamik stabilite",
      "hemodinamik durum",
      "hemodinamik",
      "hemodinami"
    ],
    "definition": "Dolaşımın kan basıncı, nabız, perfüzyon ve organ kanlanması açısından değerlendirilmesini ifade eder.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "hipotansiyon",
    "aliases": [
      "hipotansiyon",
      "hipotansif"
    ],
    "definition": "Kan basıncının doku perfüzyonunu bozabilecek düzeyde düşük olmasıdır.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "taşikardi",
    "aliases": [
      "nabız hızlı",
      "taşikardik",
      "taşikardi"
    ],
    "definition": "Kalp hızının beklenen aralığın üzerinde olmasıdır; ağrı, ateş, hipovolemi, hipoksemi veya aritmiyle ilişkili olabilir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "bradikardi",
    "aliases": [
      "bradikardik",
      "bradikardi"
    ],
    "definition": "Kalp hızının beklenen aralığın altında olmasıdır; klinik etkisi hemodinamik durumla birlikte değerlendirilir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "hipoksemi",
    "aliases": [
      "oksijen satürasyonu düşük",
      "oksijenizasyon sınırda",
      "hipoksemi"
    ],
    "definition": "Arteriyel oksijenlenmenin azalmasıdır; solunum ve dolaşım değerlendirmesinde önemlidir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "hipovolemi",
    "aliases": [
      "hipovolemik",
      "hipovolemi",
      "sıvı kaybı"
    ],
    "definition": "Dolaşımdaki etkili sıvı hacminin azalmasıdır; hipotansiyon ve organ perfüzyon bozukluğu ile ilişkili olabilir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "perfüzyon",
    "aliases": [
      "organ perfüzyonu",
      "doku perfüzyonu",
      "perfüzyon"
    ],
    "definition": "Dokulara yeterli kan akımının sağlanmasıdır. Şok ve organ yetmezliği değerlendirmesinde temel kavramdır.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "stabilizasyon",
    "aliases": [
      "stabilizasyon",
      "stabilize",
      "stabilite"
    ],
    "definition": "Hastanın yaşamı tehdit eden solunum, dolaşım veya bilinç sorunlarının güvenli düzeye getirilmesidir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "ABC",
    "aliases": [
      "ABC"
    ],
    "definition": "Airway, Breathing, Circulation basamaklarıdır; acil değerlendirmede havayolu, solunum ve dolaşım önceliklerini ifade eder.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "senkop",
    "aliases": [
      "bayılma",
      "senkop"
    ],
    "definition": "Beyin kan akımının kısa süreli azalmasına bağlı geçici bilinç kaybıdır.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "diyaforez",
    "aliases": [
      "soğuk terleme",
      "diyaforez"
    ],
    "definition": "Terleme artışıdır; ağrı, şok, hipoglisemi veya akut kardiyak olaylarda görülebilir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "koagülasyon",
    "aliases": [
      "koagülasyon",
      "koagülopati",
      "pıhtılaşma"
    ],
    "definition": "Kan pıhtılaşma sistemini ifade eder. Kanama riski ve işlem güvenliği açısından değerlendirilir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "trombositopeni",
    "aliases": [
      "trombosit sayısı düşük",
      "trombosit düşük",
      "trombositopeni"
    ],
    "definition": "Trombosit sayısının azalmasıdır; kanama eğilimi ve bazı sistemik hastalıklar açısından önemlidir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "lökositoz",
    "aliases": [
      "lökosit yüksekliği",
      "lökositoz"
    ],
    "definition": "Lökosit sayısının artmasıdır; enfeksiyon, inflamasyon, stres yanıtı veya hematolojik hastalıklarla ilişkili olabilir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "anemi",
    "aliases": [
      "hemoglobin düşüklüğü",
      "anemi"
    ],
    "definition": "Hemoglobin düzeyinin azalmasıdır; oksijen taşıma kapasitesini ve dolaşım toleransını etkiler.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "transfüzyon",
    "aliases": [
      "eritrosit süspansiyonu",
      "transfüzyon",
      "kan ürünü"
    ],
    "definition": "Kan veya kan ürünlerinin damar yoluyla verilmesidir; klinik durum, hemoglobin düzeyi ve kanama riskiyle planlanır.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "metabolik asidoz",
    "aliases": [
      "metabolik asidoz"
    ],
    "definition": "Metabolik nedenlerle kan pH’sının asidik yöne kaymasıdır; laktat artışı, böbrek yetmezliği veya toksik/metabolik durumlarla görülebilir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "anyon açıklığı",
    "aliases": [
      "anyon açıklığı",
      "anion gap"
    ],
    "definition": "Sodyum ile ölçülen ana anyonlar arasındaki farktır; metabolik asidoz tipini ayırt etmede kullanılır.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "laktat",
    "aliases": [
      "laktat"
    ],
    "definition": "Doku hipoperfüzyonu, sepsis veya anaerobik metabolizma hakkında bilgi veren biyokimyasal göstergedir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "akut böbrek hasarı",
    "aliases": [
      "böbrek fonksiyon bozukluğu",
      "akut böbrek hasarı",
      "kreatinin artışı"
    ],
    "definition": "Böbrek fonksiyonunun kısa sürede bozulmasıdır; kreatinin artışı ve idrar çıkışında azalma ile izlenebilir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "oligüri",
    "aliases": [
      "idrar çıkışı az",
      "oligüri"
    ],
    "definition": "İdrar miktarının azalmasıdır; hipovolemi, böbrek hasarı veya obstrüksiyon açısından önemlidir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "ikter",
    "aliases": [
      "sarılık",
      "ikter"
    ],
    "definition": "Bilirübin artışına bağlı deri ve skleralarda sararma görünümüdür.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "kolestaz",
    "aliases": [
      "kolestatik",
      "kolestaz"
    ],
    "definition": "Safra akımının azalması veya tıkanmasıdır; direkt bilirübin, ALP ve GGT artışıyla ilişkili olabilir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "asit",
    "aliases": [
      "asit sıvısı",
      "asit"
    ],
    "definition": "Periton boşluğunda sıvı birikimidir; siroz, malignite veya enfeksiyon gibi nedenlerle görülebilir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "ateş",
    "aliases": [
      "febril",
      "ateş"
    ],
    "definition": "Vücut sıcaklığının artmasıdır; enfeksiyon ve inflamatuvar süreçlerde önemli bir bulgudur.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "ampirik antibiyotik",
    "aliases": [
      "ampirik antibiyotik",
      "ampirik tedavi"
    ],
    "definition": "Etken kesinleşmeden, olası mikroorganizmalara yönelik başlanan antibiyotik tedavisidir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "antibiyogram",
    "aliases": [
      "duyarlılık sonucu",
      "kültür/duyarlılık",
      "antibiyogram"
    ],
    "definition": "Mikroorganizmanın hangi antibiyotiklere duyarlı veya dirençli olduğunu gösteren testtir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "sepsis",
    "aliases": [
      "sepsis",
      "septik"
    ],
    "definition": "Enfeksiyona düzensiz konak yanıtı sonucu organ fonksiyon bozukluğu gelişmesidir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "septik şok",
    "aliases": [
      "septik şok"
    ],
    "definition": "Sepsise bağlı dolaşım ve hücresel metabolizma bozukluğunun ağır formudur; hızlı stabilizasyon ve kaynak tedavisi gerektirir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "hipoglisemi",
    "aliases": [
      "kan glukozu düşük",
      "hipoglisemi"
    ],
    "definition": "Kan glukozunun düşmesidir; bilinç değişikliği ve nörolojik bulguları taklit edebilir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "kontrendikasyon",
    "aliases": [
      "kontrendikasyonlar",
      "kontrendikasyon"
    ],
    "definition": "Bir tedavi veya işlemin uygulanmasını sakıncalı kılan klinik durumdur.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "troponin",
    "aliases": [
      "kardiyak troponin",
      "Troponin I",
      "troponin"
    ],
    "definition": "Miyokart hücre hasarını gösteren kardiyak biyobelirteçtir; akut koroner sendrom değerlendirmesinde kullanılır.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "ST elevasyonu",
    "aliases": [
      "ST segment elevasyonu",
      "ST elevasyonu",
      "ST yükselmesi"
    ],
    "definition": "EKG’de ST segmentinin izoelektrik hatta göre yükselmesidir; klinik bağlama göre akut miyokart iskemisini düşündürebilir.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "resiprokal ST depresyonu",
    "aliases": [
      "resiprokal ST depresyonu",
      "karşılıklı ST depresyonu",
      "resiprokal değişiklik"
    ],
    "definition": "ST elevasyonuna karşılık bazı karşı derivasyonlarda ST çökmesi görülmesidir; akut koroner oklüzyon lehine güçlü bir ipucudur.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "reperfüzyon",
    "aliases": [
      "koroner reperfüzyon",
      "reperfüzyon"
    ],
    "definition": "Tıkanmış damar akımının yeniden sağlanmasıdır. STEMI ve akut iskemik inmede zaman kritik bir hedeftir.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "fibrinoliz",
    "aliases": [
      "fibrinolitik tedavi",
      "fibrinoliz"
    ],
    "definition": "Pıhtının ilaçla çözülmesini hedefleyen reperfüzyon tedavisidir; zaman penceresi ve kontrendikasyonlar önemlidir.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "primer PCI",
    "aliases": [
      "primer perkütan koroner girişim",
      "primer PCI",
      "PCI"
    ],
    "definition": "Tıkalı koroner damarın kateter yöntemiyle açılmasını hedefleyen reperfüzyon yaklaşımıdır.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "antitrombotik",
    "aliases": [
      "antikoagülasyon",
      "antitrombotik",
      "antiagregan"
    ],
    "definition": "Tromboz oluşumunu veya büyümesini azaltan tedavi grubudur; kanama riskiyle birlikte değerlendirilir.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "üfürüm",
    "aliases": [
      "diyastolik üfürüm",
      "sistolik üfürüm",
      "üfürüm"
    ],
    "definition": "Kalp veya damar içindeki türbülan akıma bağlı duyulan ek sestir.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "aritmi",
    "aliases": [
      "ritim bozukluğu",
      "aritmi"
    ],
    "definition": "Kalp ritminin normal düzeninden sapmasıdır; hemodinamik etkisi ritim tipi ve klinik durumla belirlenir.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "kontrastsız beyin BT",
    "aliases": [
      "kontrastsız kraniyal BT",
      "kontrastsız beyin BT"
    ],
    "definition": "Kontrast madde verilmeden çekilen beyin tomografisidir; akut kanamayı hızlı dışlamak için kullanılır.",
    "category": "Nörolojik Bilimler",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "orta serebral arter",
    "aliases": [
      "orta serebral arter",
      "sol MCA",
      "MCA"
    ],
    "definition": "Beynin geniş bir lateral bölümünü besleyen ana arterlerden biridir; tıkanıklığı afazi ve hemiparezi yapabilir.",
    "category": "Nörolojik Bilimler",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "oklüzyon",
    "aliases": [
      "dolum kesintisi",
      "tıkanıklık",
      "oklüzyon"
    ],
    "definition": "Damar lümeninin tıkanmasıdır; ilgili dokuda iskemiye neden olabilir.",
    "category": "Nörolojik Bilimler",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "son sağlıklı görülme zamanı",
    "aliases": [
      "son sağlıklı görülme zamanı",
      "semptom başlangıç zamanı",
      "last known well"
    ],
    "definition": "Hastanın nörolojik olarak en son normal görüldüğü zamandır; reperfüzyon kararında kritik önemdedir.",
    "category": "Nörolojik Bilimler",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "afazi",
    "aliases": [
      "ekspresif afazi",
      "reseptif afazi",
      "afazi"
    ],
    "definition": "Dil üretimi veya anlama işlevinde bozulmadır. Dominant hemisfer tutulumu ile ilişkili olabilir.",
    "category": "Nörolojik Bilimler",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "hemiparezi",
    "aliases": [
      "yarım vücut güçsüzlüğü",
      "hemiparezi",
      "hemipleji"
    ],
    "definition": "Vücudun bir yarısında güç kaybıdır. Fokal nörolojik defisit örüntüsünün önemli bir parçasıdır.",
    "category": "Nörolojik Bilimler",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "nörolojik defisit",
    "aliases": [
      "fokal nörolojik defisit",
      "nörolojik defisit",
      "fokal defisit"
    ],
    "definition": "Belirli bir sinir sistemi bölgesinin işlev kaybına bağlı gelişen güçsüzlük, duyu kaybı, konuşma bozukluğu veya görme kaybı gibi bulgulardır.",
    "category": "Nörolojik Bilimler",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "iskemi",
    "aliases": [
      "serebral iskemi",
      "iskemik",
      "iskemi"
    ],
    "definition": "Dokuya giden kan akımının azalmasıdır; beyinde kalıcı hasar gelişmeden hızlı değerlendirme gerekir.",
    "category": "Nörolojik Bilimler",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "intrakraniyal kanama",
    "aliases": [
      "intrakraniyal kanama",
      "kanama dışlanması",
      "beyin kanaması"
    ],
    "definition": "Kafa içi kanamadır; akut nörolojik tabloda görüntüleme ile ayırt edilmesi gerekir.",
    "category": "Nörolojik Bilimler",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "büyük damar oklüzyonu",
    "aliases": [
      "büyük damar oklüzyonu",
      "damar oklüzyonu",
      "MCA oklüzyonu"
    ],
    "definition": "Beyni besleyen büyük arterlerden birinin tıkanmasıdır; mekanik trombektomi kararını etkileyebilir.",
    "category": "Nörolojik Bilimler",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "tromboliz",
    "aliases": [
      "trombolitik tedavi",
      "IV tromboliz",
      "tromboliz"
    ],
    "definition": "Pıhtıyı eritmeye yönelik ilaç tedavisidir; uygun hasta ve zaman penceresinde değerlendirilir.",
    "category": "Nörolojik Bilimler",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "mekanik trombektomi",
    "aliases": [
      "mekanik trombektomi",
      "trombektomi"
    ],
    "definition": "Büyük damar tıkanıklığında pıhtının endovasküler yöntemle çıkarılmasıdır.",
    "category": "Nörolojik Bilimler",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "meningeal irritasyon",
    "aliases": [
      "meningeal irritasyon",
      "meninks irritasyonu",
      "ense sertliği"
    ],
    "definition": "Menenkslerin irritasyonunu düşündüren ense sertliği ve benzeri muayene bulgularıdır.",
    "category": "Nörolojik Bilimler",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "pnömotoraks",
    "aliases": [
      "pnömotoraks"
    ],
    "definition": "Plevra boşluğuna hava girmesiyle akciğerin kısmen veya tamamen sönmesidir.",
    "category": "Göğüs Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "raller",
    "aliases": [
      "raller",
      "ral"
    ],
    "definition": "Akciğer oskültasyonunda duyulan, sıvı veya alveoler açılma ile ilişkili ek solunum sesleridir.",
    "category": "Göğüs Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "dispne",
    "aliases": [
      "nefes darlığı",
      "dispne"
    ],
    "definition": "Hastanın solunumda zorlanma veya hava açlığı hissetmesidir.",
    "category": "Göğüs Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "konsolidasyon",
    "aliases": [
      "pnömonik infiltrasyon",
      "konsolidasyon"
    ],
    "definition": "Akciğer dokusunda hava yerine sıvı, hücre veya eksüda birikimiyle oluşan yoğunlaşma görünümüdür.",
    "category": "Göğüs Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "ventilasyon-perfüzyon",
    "aliases": [
      "ventilasyon-perfüzyon",
      "V/Q"
    ],
    "definition": "Akciğerde hava dağılımı ile kan akımının uyumunu ifade eder; emboli ve gaz değişimi bozukluklarında önemlidir.",
    "category": "Göğüs Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "plevral efüzyon",
    "aliases": [
      "plevral efüzyon",
      "efüzyon"
    ],
    "definition": "Plevra boşluğunda sıvı birikimidir; enfeksiyon, kalp yetmezliği veya malignite ile ilişkili olabilir.",
    "category": "Göğüs Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "prokalsitonin",
    "aliases": [
      "prokalsitonin",
      "PCT"
    ],
    "definition": "Bakteriyel enfeksiyon ve sepsis değerlendirmesinde yardımcı olabilen biyobelirteçtir.",
    "category": "Enfeksiyon Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "kültür",
    "aliases": [
      "balgam kültürü",
      "idrar kültürü",
      "BOS kültürü",
      "kültür"
    ],
    "definition": "Mikroorganizmayı üretip tanımlamak için yapılan mikrobiyolojik incelemedir.",
    "category": "Enfeksiyon Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "kan kültürü",
    "aliases": [
      "kan kültürü"
    ],
    "definition": "Kandaki mikroorganizmayı saptamak için alınan kültür örneğidir; antibiyotik seçimini yönlendirebilir.",
    "category": "Enfeksiyon Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "kaynak kontrolü",
    "aliases": [
      "kaynak kontrolü"
    ],
    "definition": "Enfeksiyon odağının drenaj, cerrahi veya girişimsel yöntemlerle kontrol altına alınmasıdır.",
    "category": "Enfeksiyon Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "melena",
    "aliases": [
      "siyah dışkı",
      "melena"
    ],
    "definition": "Üst gastrointestinal sistem kanamasını düşündüren siyah, katran kıvamında dışkıdır.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "hematemez",
    "aliases": [
      "kanlı kusma",
      "hematemez"
    ],
    "definition": "Kan kusmadır; üst gastrointestinal kanama açısından önemli bir bulgudur.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "portal hipertansiyon",
    "aliases": [
      "portal hipertansiyon"
    ],
    "definition": "Portal venöz sistem basıncının artmasıdır; varis kanaması ve asit gibi komplikasyonlara yol açabilir.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "varis",
    "aliases": [
      "özofagus varisi",
      "varis kanaması",
      "varis"
    ],
    "definition": "Portal hipertansiyona bağlı gelişebilen genişlemiş venöz yapılardır; kanama riski taşıyabilir.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "hipertiroidi",
    "aliases": [
      "hipertiroidi",
      "tirotoksikoz"
    ],
    "definition": "Tiroid hormon etkisinin artmasıdır; taşikardi, kilo kaybı, tremor ve ısı intoleransı yapabilir.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "adrenal yetmezlik",
    "aliases": [
      "adrenal yetmezlik",
      "Addison"
    ],
    "definition": "Kortizol üretiminin yetersizliğidir; hipotansiyon, hiponatremi ve hiperkalemiyle ilişkili olabilir.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "peritonit",
    "aliases": [
      "peritonit",
      "rebound",
      "defans"
    ],
    "definition": "Periton irritasyonunu gösteren klinik tablodur; akut batında cerrahi aciliyet açısından önemlidir.",
    "category": "Genel Cerrahi",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "ileus",
    "aliases": [
      "bağırsak tıkanıklığı",
      "obstrüksiyon",
      "ileus"
    ],
    "definition": "Bağırsak geçişinin mekanik veya fonksiyonel olarak bozulmasıdır.",
    "category": "Genel Cerrahi",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "perforasyon",
    "aliases": [
      "perforasyon",
      "delinme"
    ],
    "definition": "İçi boş organ duvar bütünlüğünün bozulmasıdır; serbest hava ve peritonit bulgularıyla ilişkili olabilir.",
    "category": "Genel Cerrahi",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "endoskopik hemostaz",
    "aliases": [
      "endoskopik hemostaz",
      "hemostaz"
    ],
    "definition": "Endoskopi sırasında kanama odağının durdurulmasına yönelik işlemdir.",
    "category": "Genel Cerrahi",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "dehidratasyon",
    "aliases": [
      "dehidratasyon",
      "susuzluk"
    ],
    "definition": "Vücuttaki sıvı kaybının artmasıdır; çocuklarda hızlı klinik bozulmaya neden olabilir.",
    "category": "Çocuk Sağlığı ve Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "fontanel",
    "aliases": [
      "bıngıldak",
      "fontanel"
    ],
    "definition": "Bebeklerde kafatası kemikleri arasındaki yumuşak açıklıklardır; hidrasyon ve kafa içi basınç değerlendirmesinde bilgi verebilir.",
    "category": "Çocuk Sağlığı ve Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "siyanoz",
    "aliases": [
      "siyanoz",
      "morarma"
    ],
    "definition": "Oksijenlenme azalmasına bağlı deri veya mukozalarda morarma görünümüdür.",
    "category": "Çocuk Sağlığı ve Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "hematuri",
    "aliases": [
      "kanlı idrar",
      "hematuri",
      "hematüri"
    ],
    "definition": "İdrarda eritrosit bulunmasıdır; taş, enfeksiyon, tümör veya glomerüler hastalıklarla ilişkili olabilir.",
    "category": "urogenital",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "piyüri",
    "aliases": [
      "lökositüri",
      "piyüri"
    ],
    "definition": "İdrarda lökosit bulunmasıdır; üriner sistem enfeksiyonu veya inflamasyonla ilişkili olabilir.",
    "category": "urogenital",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "hidronefroz",
    "aliases": [
      "hidronefroz"
    ],
    "definition": "İdrar akımındaki engel nedeniyle böbrek toplayıcı sisteminin genişlemesidir.",
    "category": "urogenital",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "redüksiyon",
    "aliases": [
      "redüksiyon"
    ],
    "definition": "Çıkık veya kırık parçalarının anatomik pozisyona getirilmesidir.",
    "category": "Ortopedi ve Travmatoloji",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "nörovasküler değerlendirme",
    "aliases": [
      "nörovasküler değerlendirme",
      "duyu-motor muayene",
      "distal nabız"
    ],
    "definition": "Travma sonrası damar ve sinir bütünlüğünü değerlendiren muayenedir.",
    "category": "Ortopedi ve Travmatoloji",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "deplasman",
    "aliases": [
      "deplasman",
      "deplase"
    ],
    "definition": "Kırık parçalarının normal anatomik yerinden kaymasıdır.",
    "category": "Ortopedi ve Travmatoloji",
    "priority": "Kullanımda",
    "mode": teachingOnly
  },
  {
    "term": "Akut koroner sendrom",
    "aliases": [
      "Akut koroner sendrom"
    ],
    "definition": "Göğüs ağrısı, EKG ve biyobelirteçlerle değerlendirilen miyokart iskemisi spektrumudur.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "STEMI",
    "aliases": [
      "STEMI"
    ],
    "definition": "ST elevasyonlu miyokart enfarktüsünü ifade eder; akut koroner oklüzyon ve reperfüzyon gereksinimi açısından kritik tanıdır.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "NSTEMI",
    "aliases": [
      "NSTEMI"
    ],
    "definition": "ST elevasyonu olmadan miyokart hasarı biyobelirteç yüksekliğiyle seyreden akut koroner sendrom tipidir.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "ST segment elevasyonu",
    "aliases": [
      "ST segment elevasyonu"
    ],
    "definition": "EKG’de ardışık derivasyonlarda görülürse akut transmural iskemi ve koroner oklüzyon lehinedir.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "CK-MB",
    "aliases": [
      "CK-MB"
    ],
    "definition": "Miyokart hasarında yükselebilen kardiyak enzimdir; troponine göre daha az duyarlı/özgül kabul edilir.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Primer perkütan koroner girişim",
    "aliases": [
      "Primer perkütan koroner girişim"
    ],
    "definition": "STEMI’de tıkalı koroner damarı mekanik olarak açmaya yönelik öncelikli reperfüzyon yöntemidir.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Fibrinolitik tedavi",
    "aliases": [
      "Fibrinolitik tedavi"
    ],
    "definition": "Uygun STEMI olgusunda primer girişime zamanında ulaşılamıyorsa pıhtıyı eritmek için kullanılan tedavidir.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "P2Y12 inhibitörü",
    "aliases": [
      "P2Y12 inhibitörü"
    ],
    "definition": "Trombosit aktivasyonunu azaltan antiplatelet ilaç grubudur; akut koroner sendrom yönetiminde kullanılır.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Antikoagülasyon",
    "aliases": [
      "Antikoagülasyon"
    ],
    "definition": "Pıhtı oluşumunu veya ilerlemesini azaltan tedavi yaklaşımıdır.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Nitrat",
    "aliases": [
      "Nitrat"
    ],
    "definition": "Vazodilatasyon sağlayarak iskemi ilişkili ağrıyı azaltabilen ilaç grubudur; hipotansiyon gibi durumlarda dikkat gerekir.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Akut aort sendromu",
    "aliases": [
      "Akut aort sendromu"
    ],
    "definition": "Aort diseksiyonu, intramural hematom ve penetran ülseri içeren acil aort patolojileri grubudur.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Stanford tip A diseksiyon",
    "aliases": [
      "Stanford tip A diseksiyon"
    ],
    "definition": "Asendan aortu tutan aort diseksiyonudur; genellikle acil cerrahi gerektirir.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "İntimal flap",
    "aliases": [
      "İntimal flap"
    ],
    "definition": "Aort diseksiyonunda lümeni ayıran iç tabaka yırtığına bağlı görüntüleme bulgusudur.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Gerçek lümen",
    "aliases": [
      "Gerçek lümen"
    ],
    "definition": "Diseksiyonda normal damar lümeninin devamını ifade eder.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Yalancı lümen",
    "aliases": [
      "Yalancı lümen"
    ],
    "definition": "Diseksiyon yırtığı sonrası damar duvarı katları arasında oluşan patolojik kan kanalıdır.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "BT anjiyografi",
    "aliases": [
      "BT anjiyografi"
    ],
    "definition": "Damar yapılarının kontrastlı BT ile değerlendirilmesidir; diseksiyon, emboli ve oklüzyonlarda kullanılır.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Nabız asimetrisi",
    "aliases": [
      "Nabız asimetrisi"
    ],
    "definition": "Ekstremiteler arasında nabız gücü farkıdır; diseksiyon veya damar tıkanıklığı düşündürebilir.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Aort yetmezliği",
    "aliases": [
      "Aort yetmezliği"
    ],
    "definition": "Aort kapağından diyastolde geri kaçış olmasıdır; tip A diseksiyonda gelişebilir.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Kardiyak tamponad",
    "aliases": [
      "Kardiyak tamponad"
    ],
    "definition": "Perikard boşluğundaki basınç artışı nedeniyle kalp doluşunun bozulduğu hayatı tehdit eden tablodur.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Beck triadı",
    "aliases": [
      "Beck triadı"
    ],
    "definition": "Hipotansiyon, juguler venöz dolgunluk ve kalp seslerinde derinden gelme bulgularından oluşan tamponad ipucudur.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Pulsus paradoksus",
    "aliases": [
      "Pulsus paradoksus"
    ],
    "definition": "İnspirasyonla sistolik kan basıncında belirgin düşüş olmasıdır; tamponad gibi durumlarda görülebilir.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Perikardiyosentez",
    "aliases": [
      "Perikardiyosentez"
    ],
    "definition": "Perikard boşluğundaki sıvının iğne/kateterle boşaltılmasıdır.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Kardiyojenik pulmoner ödem",
    "aliases": [
      "Kardiyojenik pulmoner ödem"
    ],
    "definition": "Sol kalp basınç artışına bağlı alveol/interstisyel sıvı birikimiyle gelişen akut solunum tablosudur.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Ortopne",
    "aliases": [
      "Ortopne"
    ],
    "definition": "Yatar pozisyonda artan nefes darlığıdır; kalp yetersizliği için önemli klinik ipucudur.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Ejeksiyon fraksiyonu",
    "aliases": [
      "Ejeksiyon fraksiyonu"
    ],
    "definition": "Sol ventrikülün her atımda pompaladığı kan yüzdesidir; kalp yetersizliği sınıflamasında kullanılır.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Hipertrofik obstrüktif kardiyomiyopati",
    "aliases": [
      "Hipertrofik obstrüktif kardiyomiyopati"
    ],
    "definition": "Sol ventrikül çıkış yolu obstrüksiyonu ve septal hipertrofiyle seyreden kardiyomiyopatidir.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "LVOT obstrüksiyonu",
    "aliases": [
      "LVOT obstrüksiyonu"
    ],
    "definition": "Sol ventrikül çıkış yolunda dinamik veya sabit darlık oluşmasıdır.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Valsalva manevrası",
    "aliases": [
      "Valsalva manevrası"
    ],
    "definition": "İntratorasik basıncı artıran manevradır; bazı üfürümlerin şiddetini değiştirmede tanısal ipucu verir.",
    "category": "Kardiyovasküler Tıp",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Diyabetik ketoasidoz",
    "aliases": [
      "Diyabetik ketoasidoz"
    ],
    "definition": "İnsülin eksikliğine bağlı ketozis, hiperglisemi ve anyon açıklı metabolik asidozla seyreden acil tablodur.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Kussmaul solunumu",
    "aliases": [
      "Kussmaul solunumu"
    ],
    "definition": "Metabolik asidozu kompanse etmeye yönelik derin ve hızlı solunum paternidir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Ketonemi",
    "aliases": [
      "Ketonemi"
    ],
    "definition": "Kanda keton cisimlerinin artmasıdır; diyabetik ketoasidozda beklenir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Beta-hidroksibutirat",
    "aliases": [
      "Beta-hidroksibutirat"
    ],
    "definition": "DKA’da baskın keton cismidir ve ketozis değerlendirmesinde kullanılır.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Potasyum replasmanı",
    "aliases": [
      "Potasyum replasmanı"
    ],
    "definition": "Hipokalemi veya toplam vücut potasyum eksikliğinde potasyumun kontrollü verilmesidir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Akut pankreatit",
    "aliases": [
      "Akut pankreatit"
    ],
    "definition": "Pankreas inflamasyonudur; tipik ağrı ve enzim yüksekliğiyle tanınır.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Biliyer pankreatit",
    "aliases": [
      "Biliyer pankreatit"
    ],
    "definition": "Safra taşı veya safra yolu patolojisine bağlı gelişen akut pankreatittir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Lipaz",
    "aliases": [
      "Lipaz"
    ],
    "definition": "Pankreatit tanısında amilaza göre daha özgül kabul edilen pankreatik enzimdir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Kolelitiazis",
    "aliases": [
      "Kolelitiazis"
    ],
    "definition": "Safra kesesinde taş bulunmasıdır; biliyer kolik, kolesistit ve pankreatit ile ilişkili olabilir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "MRCP",
    "aliases": [
      "MRCP"
    ],
    "definition": "Manyetik rezonans kolanjiyopankreatografi; safra ve pankreas kanallarını noninvaziv gösterir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "ERCP",
    "aliases": [
      "ERCP"
    ],
    "definition": "Endoskopik retrograd kolanjiyopankreatografi; tanısal ve terapötik safra/pankreas kanalı girişimidir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Oktreotid",
    "aliases": [
      "Oktreotid"
    ],
    "definition": "Varis kanamasında portal basıncı azaltmaya yardımcı somatostatin analoğudur.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Endoskopik bant ligasyonu",
    "aliases": [
      "Endoskopik bant ligasyonu"
    ],
    "definition": "Özofagus varis kanamasında varislerin bantla boğulmasına dayalı endoskopik tedavidir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Mikrositer anemi",
    "aliases": [
      "Mikrositer anemi"
    ],
    "definition": "Eritrosit hacminin düşük olduğu anemi tipidir; demir eksikliği sık nedendir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Hipokromi",
    "aliases": [
      "Hipokromi"
    ],
    "definition": "Eritrositlerde hemoglobin içeriğinin azalmasına bağlı soluk görünümüdür.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Ferritin",
    "aliases": [
      "Ferritin"
    ],
    "definition": "Demir depolarını yansıtan laboratuvar parametresidir; inflamasyonda yükselebilir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Transferrin satürasyonu",
    "aliases": [
      "Transferrin satürasyonu"
    ],
    "definition": "Transferrinin demirle doluluk oranıdır; demir eksikliğinde düşer.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Total demir bağlama kapasitesi",
    "aliases": [
      "Total demir bağlama kapasitesi"
    ],
    "definition": "Transferrin kapasitesini dolaylı yansıtır; demir eksikliğinde genellikle artar.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Pika",
    "aliases": [
      "Pika"
    ],
    "definition": "Besin değeri olmayan maddeleri yeme isteğidir; demir eksikliğiyle ilişkili olabilir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Hiperkalsemi",
    "aliases": [
      "Hiperkalsemi"
    ],
    "definition": "Serum kalsiyum düzeyinin yüksek olmasıdır; malignite ve hiperparatiroidi gibi nedenlerle görülür.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Parathormon",
    "aliases": [
      "Parathormon"
    ],
    "definition": "Kalsiyum-fosfor dengesini düzenleyen paratiroid hormonudur.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Primer hiperparatiroidi",
    "aliases": [
      "Primer hiperparatiroidi"
    ],
    "definition": "Paratiroid bezinden uygunsuz PTH fazlalığına bağlı hiperkalsemi tablosudur.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Nefrolitiyazis",
    "aliases": [
      "Nefrolitiyazis"
    ],
    "definition": "Böbrek taşı hastalığıdır; hiperkalsemi ve hiperparatiroidi ile ilişkili olabilir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Akut iskemik inme",
    "aliases": [
      "Akut iskemik inme"
    ],
    "definition": "Beyin damar tıkanıklığına bağlı ani nörolojik defisit gelişmesidir.",
    "category": "Nörolojik Bilimler",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "NIHSS",
    "aliases": [
      "NIHSS"
    ],
    "definition": "Akut inmede nörolojik defisit şiddetini sayısal olarak değerlendiren skaladır.",
    "category": "Nörolojik Bilimler",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Nonkontrast kraniyal BT",
    "aliases": [
      "Nonkontrast kraniyal BT"
    ],
    "definition": "Akut inmede kanamayı dışlamak için ilk kullanılan görüntüleme yöntemidir.",
    "category": "Nörolojik Bilimler",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "ASPECTS",
    "aliases": [
      "ASPECTS"
    ],
    "definition": "Ön dolaşım inmesinde erken iskemi bulgularını sınıflayan BT skorudur.",
    "category": "Nörolojik Bilimler",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Subaraknoid kanama",
    "aliases": [
      "Subaraknoid kanama"
    ],
    "definition": "Subaraknoid aralığa kanama olmasıdır; ani en şiddetli baş ağrısıyla gelebilir.",
    "category": "Nörolojik Bilimler",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Thunderclap baş ağrısı",
    "aliases": [
      "Thunderclap baş ağrısı"
    ],
    "definition": "Saniyeler-dakikalar içinde maksimum şiddete ulaşan baş ağrısıdır; SAK açısından kırmızı bayraktır.",
    "category": "Nörolojik Bilimler",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Lomber ponksiyon",
    "aliases": [
      "Lomber ponksiyon"
    ],
    "definition": "BOS örneği almak için yapılan işlemdir; menenjit ve SAK değerlendirmesinde kullanılır.",
    "category": "Nörolojik Bilimler",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Ksantokromi",
    "aliases": [
      "Ksantokromi"
    ],
    "definition": "BOS’ta sarımsı renk değişikliğidir; subaraknoid kanama sonrası görülebilir.",
    "category": "Nörolojik Bilimler",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Nimodipin",
    "aliases": [
      "Nimodipin"
    ],
    "definition": "Subaraknoid kanamada vazospazm riskini azaltmak için kullanılan kalsiyum kanal blokörüdür.",
    "category": "Nörolojik Bilimler",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Multipl skleroz",
    "aliases": [
      "Multipl skleroz"
    ],
    "definition": "Santral sinir sisteminde inflamatuvar demiyelinizasyonla seyreden kronik hastalıktır.",
    "category": "Nörolojik Bilimler",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Optik nörit",
    "aliases": [
      "Optik nörit"
    ],
    "definition": "Optik sinir inflamasyonudur; ağrılı görme kaybı ve MS ile ilişkili olabilir.",
    "category": "Nörolojik Bilimler",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Demiyelinizan plak",
    "aliases": [
      "Demiyelinizan plak"
    ],
    "definition": "Miyelin kaybına bağlı MR lezyonudur; MS değerlendirmesinde önemlidir.",
    "category": "Nörolojik Bilimler",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Oligoklonal band",
    "aliases": [
      "Oligoklonal band"
    ],
    "definition": "BOS’ta intratekal immün aktivasyonu gösteren bantlardır; MS tanısına destek verir.",
    "category": "Nörolojik Bilimler",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Serebral venöz sinüs trombozu",
    "aliases": [
      "Serebral venöz sinüs trombozu"
    ],
    "definition": "Beynin venöz sinüslerinde pıhtı gelişmesidir; baş ağrısı, nöbet ve fokal defisit yapabilir.",
    "category": "Nörolojik Bilimler",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "MR venografi",
    "aliases": [
      "MR venografi"
    ],
    "definition": "Venöz sinüslerin MR ile değerlendirilmesini sağlayan görüntüleme yöntemidir.",
    "category": "Nörolojik Bilimler",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "İleoçekal invajinasyon",
    "aliases": [
      "İleoçekal invajinasyon"
    ],
    "definition": "İleum segmentinin çekum içine teleskopik şekilde girmesidir; kolik ağrı ve kanlı mukuslu dışkı yapabilir.",
    "category": "Çocuk Sağlığı ve Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Target sign",
    "aliases": [
      "Target sign"
    ],
    "definition": "USG’de invajinasyon için tipik hedef/halka görünümüdür.",
    "category": "Çocuk Sağlığı ve Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Hipertrofik pilor stenozu",
    "aliases": [
      "Hipertrofik pilor stenozu"
    ],
    "definition": "Pilor kas hipertrofisine bağlı gastrik çıkış obstrüksiyonudur; safrasız fışkırır kusma yapar.",
    "category": "Çocuk Sağlığı ve Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Hipokloremik metabolik alkaloz",
    "aliases": [
      "Hipokloremik metabolik alkaloz"
    ],
    "definition": "Kusmaya bağlı klor kaybı ve alkalozla seyreden asit-baz bozukluğudur.",
    "category": "Çocuk Sağlığı ve Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Kawasaki hastalığı",
    "aliases": [
      "Kawasaki hastalığı"
    ],
    "definition": "Uzamış ateş ve mukokutanöz inflamasyonla seyreden çocukluk çağı vaskülitidir.",
    "category": "Çocuk Sağlığı ve Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Koroner anevrizma",
    "aliases": [
      "Koroner anevrizma"
    ],
    "definition": "Koroner arter duvarında genişlemedir; Kawasaki hastalığının önemli komplikasyonudur.",
    "category": "Çocuk Sağlığı ve Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "IVIG",
    "aliases": [
      "IVIG"
    ],
    "definition": "İntravenöz immünoglobulin tedavisidir; Kawasaki ve bazı immün hastalıklarda kullanılır.",
    "category": "Çocuk Sağlığı ve Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Akut epiglottit",
    "aliases": [
      "Akut epiglottit"
    ],
    "definition": "Epiglot inflamasyonudur; hava yolu obstrüksiyonu riski nedeniyle acildir.",
    "category": "Çocuk Sağlığı ve Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Tripod pozisyonu",
    "aliases": [
      "Tripod pozisyonu"
    ],
    "definition": "Hava yolu darlığında hastanın öne eğilip ellerinden destek alarak solumasıdır.",
    "category": "Çocuk Sağlığı ve Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Stridor",
    "aliases": [
      "Stridor"
    ],
    "definition": "Üst hava yolu darlığında duyulan kaba inspiratuvar solunum sesidir.",
    "category": "Çocuk Sağlığı ve Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Akut apandisit",
    "aliases": [
      "Akut apandisit"
    ],
    "definition": "Apendiks inflamasyonudur; migratuvar sağ alt kadran ağrısı ve lokal hassasiyet ile seyreder.",
    "category": "Genel Cerrahi",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "McBurney noktası",
    "aliases": [
      "McBurney noktası"
    ],
    "definition": "Sağ alt kadranda apandisit muayenesinde hassasiyet aranılan anatomik noktadır.",
    "category": "Genel Cerrahi",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Rebound",
    "aliases": [
      "Rebound"
    ],
    "definition": "Bası kaldırıldığında ağrının artmasıdır; peritoneal irritasyonu düşündürür.",
    "category": "Genel Cerrahi",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Akut taşlı kolesistit",
    "aliases": [
      "Akut taşlı kolesistit"
    ],
    "definition": "Safra kesesi taşına bağlı gelişen akut safra kesesi inflamasyonudur.",
    "category": "Genel Cerrahi",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Murphy bulgusu",
    "aliases": [
      "Murphy bulgusu"
    ],
    "definition": "Sağ üst kadran palpasyonunda inspirasyonun ağrı nedeniyle kesilmesidir; kolesistit lehinedir.",
    "category": "Genel Cerrahi",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Perikolesistik sıvı",
    "aliases": [
      "Perikolesistik sıvı"
    ],
    "definition": "Safra kesesi çevresinde sıvı birikimidir; kolesistit görüntüleme bulgusu olabilir.",
    "category": "Genel Cerrahi",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "İnce bağırsak obstrüksiyonu",
    "aliases": [
      "İnce bağırsak obstrüksiyonu"
    ],
    "definition": "İnce bağırsak pasajının mekanik olarak tıkanmasıdır.",
    "category": "Genel Cerrahi",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Adezyon",
    "aliases": [
      "Adezyon"
    ],
    "definition": "Cerrahi veya inflamasyon sonrası oluşan fibrotik yapışıklıklardır; obstrüksiyon nedeni olabilir.",
    "category": "Genel Cerrahi",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Obstipasyon",
    "aliases": [
      "Obstipasyon"
    ],
    "definition": "Gaz ve dışkı çıkaramama durumudur; bağırsak obstrüksiyonunda görülebilir.",
    "category": "Genel Cerrahi",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Subdiyafragmatik serbest hava",
    "aliases": [
      "Subdiyafragmatik serbest hava"
    ],
    "definition": "Diyafram altında serbest hava görünümüdür; içi boş organ perforasyonunu düşündürür.",
    "category": "Genel Cerrahi",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Sigmoid divertikülit",
    "aliases": [
      "Sigmoid divertikülit"
    ],
    "definition": "Sigmoid kolondaki divertiküllerin inflamasyonudur; sol alt kadran ağrısı yapabilir.",
    "category": "Genel Cerrahi",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Perikolik inflamasyon",
    "aliases": [
      "Perikolik inflamasyon"
    ],
    "definition": "Kolon çevresi yağ dokusunda inflamasyon bulgusudur; divertikülitte BT bulgusu olabilir.",
    "category": "Genel Cerrahi",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Primer spontan pnömotoraks",
    "aliases": [
      "Primer spontan pnömotoraks"
    ],
    "definition": "Altta belirgin akciğer hastalığı olmadan plevra boşluğuna hava kaçmasıdır; genç uzun erkeklerde görülebilir.",
    "category": "Göğüs Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Plevral çizgi",
    "aliases": [
      "Plevral çizgi"
    ],
    "definition": "Akciğer grafisinde pnömotoraksı gösteren visseral plevra hattıdır.",
    "category": "Göğüs Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Toraks tüpü",
    "aliases": [
      "Toraks tüpü"
    ],
    "definition": "Plevral boşluktaki hava veya sıvıyı boşaltmak için yerleştirilen tüptür.",
    "category": "Göğüs Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "İğne dekompresyon",
    "aliases": [
      "İğne dekompresyon"
    ],
    "definition": "Tansiyon pnömotoraksta acil basınç azaltma girişimidir.",
    "category": "Göğüs Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Akut pulmoner emboli",
    "aliases": [
      "Akut pulmoner emboli"
    ],
    "definition": "Pulmoner arter dallarının trombüsle tıkanmasıdır; ani dispne ve plöritik ağrı yapabilir.",
    "category": "Göğüs Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Wells skoru",
    "aliases": [
      "Wells skoru"
    ],
    "definition": "Pulmoner emboli olasılığını klinik olarak sınıflayan skordur.",
    "category": "Göğüs Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "CTPA",
    "aliases": [
      "CTPA"
    ],
    "definition": "BT pulmoner anjiyografi; pulmoner emboli tanısında sık kullanılan görüntülemedir.",
    "category": "Göğüs Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "V/Q sintigrafisi",
    "aliases": [
      "V/Q sintigrafisi"
    ],
    "definition": "Ventilasyon ve perfüzyon dağılımını karşılaştıran nükleer tıp incelemesidir.",
    "category": "Göğüs Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Toplum kökenli pnömoni",
    "aliases": [
      "Toplum kökenli pnömoni"
    ],
    "definition": "Hastane dışında gelişen akciğer parankim enfeksiyonudur.",
    "category": "Göğüs Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "CURB-65",
    "aliases": [
      "CURB-65"
    ],
    "definition": "Pnömonide yatış ve mortalite riskini değerlendiren klinik skordur.",
    "category": "Göğüs Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "İdiyopatik pulmoner fibrozis",
    "aliases": [
      "İdiyopatik pulmoner fibrozis"
    ],
    "definition": "Nedeni bilinmeyen ilerleyici fibrotik interstisyel akciğer hastalığıdır.",
    "category": "Göğüs Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Bal peteği görünümü",
    "aliases": [
      "Bal peteği görünümü"
    ],
    "definition": "İleri fibroziste HRCT’de görülen kistik subplevral paternidir.",
    "category": "Göğüs Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Restriktif patern",
    "aliases": [
      "Restriktif patern"
    ],
    "definition": "Akciğer hacimlerinde azalmayla giden solunum fonksiyon testi örüntüsüdür.",
    "category": "Göğüs Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "DLCO",
    "aliases": [
      "DLCO"
    ],
    "definition": "Karbonmonoksit difüzyon kapasitesidir; gaz alışverişi ve interstisyel hastalık değerlendirmesinde kullanılır.",
    "category": "Göğüs Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "KOAH alevlenmesi",
    "aliases": [
      "KOAH alevlenmesi"
    ],
    "definition": "KOAH hastasında dispne, balgam miktarı/pürülansı ve öksürüğün akut kötüleşmesidir.",
    "category": "Göğüs Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Hiperkapni",
    "aliases": [
      "Hiperkapni"
    ],
    "definition": "Kanda karbondioksit düzeyinin artmasıdır; ventilasyon yetmezliğini gösterir.",
    "category": "Göğüs Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Noninvaziv ventilasyon",
    "aliases": [
      "Noninvaziv ventilasyon"
    ],
    "definition": "Entübasyon olmadan maske aracılığıyla ventilasyon desteği verilmesidir.",
    "category": "Göğüs Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Reaktivasyon tüberkülozu",
    "aliases": [
      "Reaktivasyon tüberkülozu"
    ],
    "definition": "Daha önce alınmış tüberküloz enfeksiyonunun yeniden aktifleşmesiyle gelişen tabloyu ifade eder.",
    "category": "Enfeksiyon Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "ARB",
    "aliases": [
      "ARB"
    ],
    "definition": "Aside dirençli basil boyamasıdır; tüberküloz tanısında kullanılır.",
    "category": "Enfeksiyon Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Kaviter lezyon",
    "aliases": [
      "Kaviter lezyon"
    ],
    "definition": "Akciğerde içi boşluklu lezyondur; reaktivasyon TB gibi hastalıklarda görülebilir.",
    "category": "Enfeksiyon Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Plasmodium falciparum",
    "aliases": [
      "Plasmodium falciparum"
    ],
    "definition": "Ağır sıtmaya yol açabilen Plasmodium türüdür.",
    "category": "Enfeksiyon Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Kalın damla",
    "aliases": [
      "Kalın damla"
    ],
    "definition": "Sıtma parazitlerinin saptanmasında kullanılan mikroskobik kan yayması yöntemidir.",
    "category": "Enfeksiyon Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "İnce yayma",
    "aliases": [
      "İnce yayma"
    ],
    "definition": "Sıtma tür ayrımı ve parazitemi değerlendirmesinde kullanılan kan yaymasıdır.",
    "category": "Enfeksiyon Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Meningokoksemi",
    "aliases": [
      "Meningokoksemi"
    ],
    "definition": "Neisseria meningitidis’in kana yayılmasıyla gelişen sepsis tablosudur.",
    "category": "Enfeksiyon Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Peteşi",
    "aliases": [
      "Peteşi"
    ],
    "definition": "Basmakla solmayan küçük noktasal kanama odağıdır.",
    "category": "Enfeksiyon Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Purpura",
    "aliases": [
      "Purpura"
    ],
    "definition": "Deri veya mukozada daha geniş kanama odaklarıdır; meningokoksemi gibi acillerde görülebilir.",
    "category": "Enfeksiyon Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "BOS",
    "aliases": [
      "BOS"
    ],
    "definition": "Beyin omurilik sıvısıdır; menenjit ve SAK değerlendirmesinde incelenir.",
    "category": "Enfeksiyon Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Seftriakson",
    "aliases": [
      "Seftriakson"
    ],
    "definition": "Geniş spektrumlu üçüncü kuşak sefalosporindir; menenjit ve sepsis tedavisinde kullanılabilir.",
    "category": "Enfeksiyon Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "İnfektif endokardit",
    "aliases": [
      "İnfektif endokardit"
    ],
    "definition": "Kalp kapakları veya endokard yüzeyinin mikrobiyal enfeksiyonudur.",
    "category": "Enfeksiyon Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Vejetasyon",
    "aliases": [
      "Vejetasyon"
    ],
    "definition": "Endokarditte kapak üzerinde oluşan mikroorganizma, fibrin ve hücrelerden oluşan kitlelerdir.",
    "category": "Enfeksiyon Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Duke kriterleri",
    "aliases": [
      "Duke kriterleri"
    ],
    "definition": "İnfektif endokardit tanısında kullanılan majör/minör kriterlerdir.",
    "category": "Enfeksiyon Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Triküspit kapak",
    "aliases": [
      "Triküspit kapak"
    ],
    "definition": "Sağ atriyum ile sağ ventrikül arasındaki kapaktır; IV madde kullanımında endokardit tutulumu görülebilir.",
    "category": "Enfeksiyon Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Colles kırığı",
    "aliases": [
      "Colles kırığı"
    ],
    "definition": "Distal radiusun dorsal angulasyon/deplasmanla kırılmasıdır; çatal sırtı deformitesi yapabilir.",
    "category": "Ortopedi ve Travmatoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Distal radius kırığı",
    "aliases": [
      "Distal radius kırığı"
    ],
    "definition": "El bileğine yakın radius kırığıdır; düşme sonrası sık görülür.",
    "category": "Ortopedi ve Travmatoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Çatal sırtı deformitesi",
    "aliases": [
      "Çatal sırtı deformitesi"
    ],
    "definition": "Colles kırığında el bileğinde görülen tipik dorsal deformitedir.",
    "category": "Ortopedi ve Travmatoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Femur boyun kırığı",
    "aliases": [
      "Femur boyun kırığı"
    ],
    "definition": "Femur başı ile trokanterik bölge arasındaki boyun kısmında kırık oluşmasıdır.",
    "category": "Ortopedi ve Travmatoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "İntrakapsüler kırık",
    "aliases": [
      "İntrakapsüler kırık"
    ],
    "definition": "Eklem kapsülü içinde yer alan kırığı ifade eder; femur boynunda avasküler nekroz riski önemlidir.",
    "category": "Ortopedi ve Travmatoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Avasküler nekroz",
    "aliases": [
      "Avasküler nekroz"
    ],
    "definition": "Kemik dokusunun kanlanma bozukluğuna bağlı nekrozudur.",
    "category": "Ortopedi ve Travmatoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Hemiartroplasti",
    "aliases": [
      "Hemiartroplasti"
    ],
    "definition": "Eklem yüzeyinin bir kısmının protezle değiştirilmesidir; bazı femur boyun kırıklarında kullanılır.",
    "category": "Ortopedi ve Travmatoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Skafoid kırığı",
    "aliases": [
      "Skafoid kırığı"
    ],
    "definition": "El bileği skafoid kemiğinin kırığıdır; anatomik enfiye çukuru hassasiyeti tipiktir.",
    "category": "Ortopedi ve Travmatoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Anatomik enfiye çukuru",
    "aliases": [
      "Anatomik enfiye çukuru"
    ],
    "definition": "Skafoid üzerinde yer alan palpasyon alanıdır; hassasiyeti skafoid kırığını düşündürür.",
    "category": "Ortopedi ve Travmatoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Başparmak spika ateli",
    "aliases": [
      "Başparmak spika ateli"
    ],
    "definition": "Skafoid kırığı şüphesinde başparmağı ve el bileğini immobilize eden ateldir.",
    "category": "Ortopedi ve Travmatoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Glenohumeral çıkık",
    "aliases": [
      "Glenohumeral çıkık"
    ],
    "definition": "Humerus başının glenoid kaviteden çıkmasıdır; anterior çıkık en sık formdur.",
    "category": "Ortopedi ve Travmatoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Aksiller sinir",
    "aliases": [
      "Aksiller sinir"
    ],
    "definition": "Omuz çıkığında yaralanma riski olan sinirdir; deltoid duyu ve motor fonksiyonla değerlendirilir.",
    "category": "Ortopedi ve Travmatoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "Kapalı redüksiyon",
    "aliases": [
      "Kapalı redüksiyon"
    ],
    "definition": "Cerrahi kesi olmadan çıkık veya kırığın anatomik yerine getirilmesidir.",
    "category": "Ortopedi ve Travmatoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  },
  {
    "term": "İmmobilizasyon",
    "aliases": [
      "İmmobilizasyon"
    ],
    "definition": "Yaralı bölgenin hareketini kısıtlayarak iyileşmeyi destekleyen uygulamadır.",
    "category": "Ortopedi ve Travmatoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly
  }
];

export const branchGlossaryTerms = {};

export const defaultGlossaryTerms = globalGlossaryTerms;

function normalizeEntry(entry = {}) {
  const aliases = Array.from(new Set([entry.term, ...(entry.aliases || [])].filter(Boolean)))
    .map((alias) => String(alias).replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);

  return {
    ...entry,
    aliases,
    normalizedAliases: aliases.map(normalizeGlossaryText),
  };
}

export function getBranchGlossaryTerms(branchId) {
  return branchGlossaryTerms[branchId] || [];
}

export function getGlossaryTerms(extraTerms = [], options = {}) {
  const branchTerms = options.branchId ? getBranchGlossaryTerms(options.branchId) : [];
  const merged = [
    ...globalGlossaryTerms,
    ...branchTerms,
    ...(Array.isArray(extraTerms) ? extraTerms : []),
  ];

  const byLabel = new Map();
  merged.forEach((entry) => {
    if (!entry?.term || !entry?.definition) return;
    const normalized = normalizeGlossaryText(entry.term);
    const normalizedEntry = normalizeEntry(entry);
    if (!normalizedEntry.aliases?.length) return;

    if (!byLabel.has(normalized)) {
      byLabel.set(normalized, normalizedEntry);
      return;
    }

    const existing = byLabel.get(normalized);
    const aliases = Array.from(new Set([...(existing.aliases || []), ...(normalizedEntry.aliases || [])]))
      .sort((a, b) => b.length - a.length);
    byLabel.set(normalized, normalizeEntry({ ...existing, aliases }));
  });

  return Array.from(byLabel.values()).sort((a, b) => b.term.length - a.term.length);
}
