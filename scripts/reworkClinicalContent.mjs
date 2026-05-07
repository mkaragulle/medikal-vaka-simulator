import { writeFileSync } from 'node:fs';
import { cases } from '../src/data/cases.js';

const slug = (value = '') => String(value)
  .toLocaleLowerCase('tr-TR')
  .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '')
  .slice(0, 56) || 'step';

const correctDx = (c) => c?.diagnosis?.correct || c?.correctAnswer || c?.title || 'tanı';

function makeSteps(caseId, required, distractors = []) {
  const steps = [];
  required.forEach((item, idx) => {
    const label = Array.isArray(item) ? item[0] : item.label;
    const rationale = Array.isArray(item) ? item[1] : item.rationale;
    steps.push({
      id: `${caseId}-req-${idx + 1}-${slug(label)}`,
      label,
      required: true,
      correctOrder: idx + 1,
      unsafe: false,
      score: 2,
      rationale
    });
  });
  distractors.forEach((item, idx) => {
    const label = Array.isArray(item) ? item[0] : item.label;
    const rationale = Array.isArray(item) ? item[1] : item.rationale;
    steps.push({
      id: `${caseId}-dist-${idx + 1}-${slug(label)}`,
      label,
      required: false,
      correctOrder: null,
      unsafe: true,
      score: -2,
      rationale
    });
  });
  return steps;
}

function setManagement(c, required, distractors = [], opts = {}) {
  const before = JSON.stringify(c.managementSequence || null);
  const steps = makeSteps(c.id, required, distractors);
  c.managementSequence = {
    ...(c.managementSequence || {}),
    enabled: opts.enabled ?? true,
    title: opts.title || 'Yönetim sırası',
    instruction: opts.instruction || 'Bu olguda klinik öncelikleri doğru sıraya koy.',
    minRequiredSteps: required.length,
    steps
  };
  const labels = required.map((item) => Array.isArray(item) ? item[0] : item.label);
  if (c.diagnosis?.answerFeedback) {
    c.diagnosis.answerFeedback.management = labels;
    c.diagnosis.answerFeedback.managementSteps = labels;
  }
  return before !== JSON.stringify(c.managementSequence || null);
}

function disableSpotManagement(c) {
  const before = JSON.stringify(c.managementSequence || null);
  c.managementSequence = {
    ...(c.managementSequence || {}),
    enabled: false,
    showInSpot: false,
    minRequiredSteps: 0,
    steps: []
  };
  if (c.diagnosis?.answerFeedback) {
    delete c.diagnosis.answerFeedback.management;
    delete c.diagnosis.answerFeedback.managementSteps;
  }
  return before !== JSON.stringify(c.managementSequence || null);
}

function dedupeInvestigations(c) {
  if (!Array.isArray(c.investigations)) return 0;
  const before = c.investigations.length;
  const seen = new Set();
  c.investigations = c.investigations.filter((inv) => {
    const key = slug(inv?.label || inv?.id || '');
    if (!key) return false;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return before - c.investigations.length;
}

function setInvestigation(c, id, patch) {
  const inv = c.investigations?.find((item) => item.id === id || item.label === id);
  if (!inv) return false;
  Object.assign(inv, patch);
  return true;
}

const managementMap = {
  'pulm-pneumonia-001': {
    required: [
      ['Solunum sıkıntısı, bilinç durumu, kan basıncı ve oksijen satürasyonuna göre yatış gereksinimini değerlendir.', 'Hipoksemi, konfüzyon, hipotansiyon veya belirgin taşipne ayaktan izlem kararını değiştirir.'],
      ['Akciğer grafisindeki lobar konsolidasyonu ateş ve pürülan balgamla birlikte yorumla.', 'Odaklı konsolidasyon ve sistemik inflamasyon bakteriyel toplum kökenli pnömoniyi destekler.'],
      ['Ampirik antibiyotiği hastanın yaşı, komorbiditesi ve yatış gereksinimine göre geciktirmeden başla.', 'Klinik tanı güçlü olduğunda tedavi kültür sonucunu beklemek için ertelenmez.'],
      ['Ağır hastalık, yatış veya tedavi başarısızlığı varsa kan/balgam kültürü gibi hedef testleri al.', 'Kültürler her hafif olguda zorunlu değildir; ağır olguda tedaviyi daraltmak için değerlidir.'],
      ['İlk 48-72 saatte ateş, solunum işi, oksijen ihtiyacı ve genel durum üzerinden yanıtı değerlendir.', 'Yanıt yoksa dirençli etken, ampiyem, komplikasyon veya alternatif tanı düşünülmelidir.']
    ],
    distractors: [
      ['Klinik pnömoni bulguları güçlü olsa bile antibiyotiği kültür sonucuna kadar beklet.', 'Tedavi gecikmesi özellikle yaşlı veya hipoksemik hastada mortaliteyi artırabilir.'],
      ['Hipoksemik ve konfüze hastayı oral antibiyotikle ayaktan izle.', 'Konfüzyon ve hipoksemi hastane izlemi gerektiren risk bulgularıdır.'],
      ['Tipik toplum kökenli pnömonide rutin antipseudomonal tedavi başla.', 'Risk faktörü yoksa gereksiz geniş spektrum direnç ve yan etki riskini artırır.']
    ]
  },
  'inf-malaria-001': {
    required: [
      ['Endemik bölge dönüşü ateş, titreme ve trombositopeniyi sıtma lehine birlikte değerlendir.', 'Seyahat öyküsü ve döngüsel ateş paterni tanısal şüpheyi yükseltir.'],
      ['Bilinç değişikliği, hipoglisemi, anemi, böbrek yetmezliği ve parazitemi oranıyla ağır sıtmayı ayır.', 'Ağır falciparum sıtmasında tedavi yolu ve izlem düzeyi değişir.'],
      ['Kalın damla ve ince yaymayı gecikmeden iste; şüphe sürüyorsa negatif sonucu tekrarla.', 'Mikroskopi hem tanıyı doğrular hem de parazit yoğunluğunu gösterir.'],
      ['Ağır falciparum veya organ tutulumu varsa IV artesunat başla.', 'Ağır tabloda oral tedavi yeterli değildir ve gecikme ölümcül olabilir.'],
      ['Stabil komplike olmayan olguda uygun artemisinin kombinasyon tedavisini seç.', 'Tedavi seçimi tür, direnç bölgesi ve hastalık şiddetine göre belirlenir.'],
      ['Hipoglisemi, hemoliz, renal fonksiyon ve parazitemi temizlenmesini izle.', 'Komplikasyonlar erken fark edilmezse klinik kötüleşme hızlı olabilir.']
    ],
    distractors: [
      ['Ateş düşene kadar tanısal yaymayı ertele.', 'Sıtma şüphesinde tanı ve tedavi geciktirilmemelidir.'],
      ['Organ tutulumu olan hastayı yalnızca oral tedaviyle izle.', 'Ağır sıtma parenteral tedavi ve yakın izlem gerektirir.'],
      ['Seyahat öyküsü varken yalnızca viral üst solunum yolu enfeksiyonu kabul et.', 'Endemik bölge dönüşü ateş sıtma açısından dışlanmadan basitleştirilmemelidir.']
    ]
  },
  'inf-meningococcemia-001': {
    required: [
      ['Ateş, ense sertliği, bilinç değişikliği ve peteşiyal-purpural döküntüyü invaziv meningokok hastalığı lehine tanı.', 'Menenjit bulgularına purpura eşlik etmesi meningokoksemi açısından acildir.'],
      ['Hemodinami ve solunum durumunu hızla stabilize et; şok bulgusu varsa sıvı ve yoğun bakım izlemini planla.', 'Meningokoksemi dakikalar-saatler içinde dolaşım yetmezliğine ilerleyebilir.'],
      ['Kan kültürü ve uygun ise BOS örneğini al; antibiyotik başlamayı örnekleme için geciktirme.', 'Kültür tanıyı destekler ancak tedavi gecikmesi nörolojik hasar ve mortalite riskini artırır.'],
      ['Ampirik seftriakson/sefotaksim tedavisini hemen başla.', 'Meningokok menenjitinde erken parenteral üçüncü kuşak sefalosporin temel yaklaşımdır.'],
      ['Damlacık izolasyonu uygula ve yakın temaslılara kemoprofilaksi planla.', 'Nazofarengeal bulaş nedeniyle temaslı yönetimi tedavinin ayrılmaz parçasıdır.'],
      ['Purpura fulminans, DIC, adrenal kanama ve nörolojik komplikasyonları izle.', 'Meningokoksemi komplikasyonları erken destek tedavisi gerektirir.']
    ],
    distractors: [
      ['Antibiyotiği BOS kültürü kesinleşene kadar ertele.', 'Klinik şüphe güçlü olduğunda tedavi örnekleme nedeniyle geciktirilmez.'],
      ['Peteşiyal döküntüyü viral ekzantem kabul edip ayaktan izle.', 'Ateş ve ense sertliğiyle birlikte purpura acil invaziv bakteriyel enfeksiyon bulgusudur.'],
      ['Temaslı profilaksisini yalnızca kültür pozitifleşirse düşün.', 'Meningokok şüphesinde temaslı yönetimi hızlı başlatılmalıdır.']
    ]
  },
  'infectious-diseases-septic-shock-001': {
    required: [
      ['Hipotansiyon, bilinç bulanıklığı ve laktat yüksekliğini septik şok lehine acil kabul et.', 'Doku hipoperfüzyonu gecikmeden resüsitasyon gerektirir.'],
      ['Oksijenasyon, iki geniş damar yolu, idrar çıkışı ve sürekli hemodinamik izlemi başlat.', 'Şokta tedavi yanıtı dolaşım ve organ perfüzyonu üzerinden izlenir.'],
      ['Antibiyotiği geciktirmeden önce iki set kan kültürü ve odak örneklerini al.', 'Örnekleme hızlı yapılmalı; antibiyotik başlanmasını geciktirmemelidir.'],
      ['İlk saat içinde olası odağı kapsayan geniş spektrumlu antibiyotik başla.', 'Erken uygun antibiyotik mortaliteyi azaltan temel adımdır.'],
      ['Kristalloid sıvı resüsitasyonu ver ve yanıtı MAP, laktat ve idrar çıkışıyla değerlendir.', 'Volüm açığı düzeltilmeden vazopressör yanıtı yetersiz kalabilir.'],
      ['Sıvıya rağmen hipotansiyon sürerse norepinefrin başla ve enfeksiyon odağı kontrolünü planla.', 'Persistan şokta vazopressör ve kaynak kontrolü birlikte düşünülmelidir.']
    ],
    distractors: [
      ['Laktat sonucu normale dönene kadar antibiyotik başlama.', 'Septik şokta antibiyotik laboratuvar takibine ertelenmez.'],
      ['Sıvıya dirençli hipotansiyonda vazopressörü geciktir.', 'MAP hedeflenmezse organ perfüzyonu bozulur.'],
      ['Kültür sonucuna kadar yalnız destek tedavisiyle izle.', 'Şokta ampirik tedavi gecikmesi mortaliteyi artırır.']
    ]
  },
  'pediatrics-bruton-agammaglobulinemia-001': {
    required: [
      ['Erkek bebekte anne IgG’si azaldıktan sonra başlayan tekrarlayan sinopulmoner enfeksiyonları humoral immün yetmezlik lehine değerlendir.', 'Zamanlama ve enfeksiyon tipi X’e bağlı agammaglobulinemiyi düşündürür.'],
      ['Serum IgG, IgA ve IgM düzeylerini ve periferik B hücre sayısını birlikte yorumla.', 'Bruton’da tüm immünoglobulinler düşük ve CD19+ B hücreleri belirgin azdır.'],
      ['Aktif bakteriyel enfeksiyon varsa uygun antibiyotikle tedavi et.', 'İmmün yetmezlik tanısı enfeksiyon odağının tedavisini geciktirmez.'],
      ['Uzun dönem için düzenli IVIG/SCIG replasmanı planla.', 'Antikor replasmanı ciddi tekrarlayan bakteriyel enfeksiyonları azaltır.'],
      ['Canlı aşılardan kaçın, inaktive aşı yanıtının zayıf olabileceğini aileye anlat.', 'B hücre eksikliği aşı yanıtını ve aşı güvenliğini değiştirir.'],
      ['BTK genetik doğrulaması, aile taraması ve immünoloji izlemi düzenle.', 'X’e bağlı kalıtım nedeniyle aile danışmanlığı klinik yönetimin parçasıdır.']
    ],
    distractors: [
      ['Tekrarlayan enfeksiyonları normal kreş enfeksiyonu kabul edip izlemle yetin.', 'Ağır ve tekrarlayan sinopulmoner enfeksiyonlar immün yetmezlik açısından araştırılmalıdır.'],
      ['Canlı viral aşıları rutin takvime göre uygulamaya devam et.', 'Primer immün yetmezlikte canlı aşı güvenliği ayrıca değerlendirilmelidir.'],
      ['IVIG yerine yalnız profilaktik vitamin başla.', 'Temel sorun antikor üretim yetmezliğidir; vitamin replasmanı bunu düzeltmez.']
    ]
  },
  'internal-medicine-systemic-lupus-erythematosus-001': {
    required: [
      ['Döküntü, artrit, serozit, nörolojik bulgu ve renal tutulum belirtilerini sistemik aktivite açısından değerlendir.', 'SLE’de tedavi şiddeti organ tutulumuna göre belirlenir.'],
      ['Anti-dsDNA ve C3/C4 düzeylerini aktivite takibi için kullan.', 'Anti-dsDNA artışı ve kompleman düşüklüğü aktif hastalık ve nefrit ile ilişkilidir.'],
      ['Proteinüri ve hematüri için idrar analizi ile protein kantifikasyonunu yorumla.', 'Renal tutulum SLE’de prognozu ve tedavi yoğunluğunu doğrudan değiştirir.'],
      ['Kreatinin artışı veya anlamlı proteinüri varsa nefroloji değerlendirmesi ve böbrek biyopsisini planla.', 'Lupus nefriti sınıfı immünsupresif tedavi seçimini belirler.'],
      ['Organ tutulumunun şiddetine göre steroid ve immünsupresif tedaviyi düzenle.', 'Hafif mukokutanöz hastalık ile nefrit aynı yoğunlukta tedavi edilmez.'],
      ['Kontrendikasyon yoksa hidroksiklorokini sürdür ve göz toksisitesi izlemini planla.', 'Hidroksiklorokin alevlenmeyi azaltır ancak uzun dönem güvenlik izlemi gerekir.']
    ],
    distractors: [
      ['ANA titresini hastalık aktivitesinin ana takip aracı olarak kullan.', 'ANA tanıda değerlidir; aktivite takibinde anti-dsDNA ve kompleman daha anlamlıdır.'],
      ['Proteinüri varken renal değerlendirmeyi kontrol randevusuna ertele.', 'Lupus nefriti hızlı değerlendirme gerektiren organ tutulumudur.'],
      ['Anti-Sm düzeyini aktivite takibinde temel marker kabul et.', 'Anti-Sm özgül olabilir fakat aktivite takibi için ana marker değildir.']
    ]
  },
  'internal-medicine-rheumatoid-arthritis-001': {
    required: [
      ['Sabah tutukluğu, simetrik küçük eklem şişliği ve hareket kısıtlılığını inflamatuvar artrit olarak değerlendir.', 'RA’da erken klinik örüntü tedavi gecikmesini önler.'],
      ['Septik artrit düşündüren ateş, akut tek eklem şişliği veya şiddetli ağrı bulgularını dışla.', 'Aspirasyon gerektiren septik artrit steroid veya DMARD öncesi atlanmamalıdır.'],
      ['RF, anti-CCP, ESR/CRP ve el-bilek görüntülemesini tanı ve hasar riski için kullan.', 'Anti-CCP özgüllük ve erozyon riski açısından değerlidir.'],
      ['Erken dönemde hastalık modifiye edici tedaviyi planla; semptom kontrolünü tek başına yeterli görme.', 'RA’da kalıcı eklem hasarını önleyen yaklaşım erken DMARD tedavisidir.'],
      ['DMARD öncesi hemogram, karaciğer-böbrek fonksiyonu ve enfeksiyon taramasını uygun şekilde yap.', 'Tedavi güvenliği için başlangıç değerlendirmesi gerekir.'],
      ['Fonksiyon, eklem şişliği, akut faz belirteçleri ve yan etkiler üzerinden düzenli takip planla.', 'Tedavi hedefi düşük hastalık aktivitesi veya remisyondur.']
    ],
    distractors: [
      ['Eklem yakınması olan her hastadan rutin akciğer grafisi iste.', 'Akciğer grafisi ancak spesifik solunum, TB, sarkoidoz veya ilaç öncesi gerekçeyle anlamlıdır.'],
      ['Akut şiş tek eklemde aspirasyon yapmadan intraartiküler steroid başla.', 'Septik artrit dışlanmadan steroid enfeksiyonu kötüleştirebilir.'],
      ['Mekanik ağrı paterni olan hastada geniş otoantikor paneliyle başla.', 'Tetkik seçimi klinik paternle yönlendirilmelidir.']
    ]
  },
  'im-dka-001': {
    required: [
      ['Hiperglisemi, ketozis ve yüksek anyon açıklı metabolik asidoz birlikteliğiyle DKA tanısını doğrula.', 'DKA yönetimi tanısal üçlünün hızla tanınmasına dayanır.'],
      ['İlk olarak izotonik sıvı resüsitasyonuna başla ve dolaşım yanıtını izle.', 'DKA’da erken ana sorun belirgin volüm açığıdır.'],
      ['Potasyumu değerlendir; güvenli düzeye ulaşmadan insülini başlatma.', 'İnsülin potasyumu hücre içine kaydırarak hipokalemiyi ağırlaştırabilir.'],
      ['Potasyum uygunsa IV insülin infüzyonu başla ve glukoz düşüş hızını izle.', 'İnsülin ketogenezi durdurur ve anyon açıklığını kapatır.'],
      ['Glukoz düşmeye başladığında dekstroz ekleyerek insülini ketozis düzelene kadar sürdür.', 'Tedavi hedefi yalnız glukozu düşürmek değil ketoasidozu düzeltmektir.'],
      ['Enfeksiyon, insülin atlanması veya MI gibi tetikleyicileri öykü ve hedef bulgularla araştır.', 'Tetikleyici düzeltilmezse DKA tekrarlayabilir veya uzayabilir.']
    ],
    distractors: [
      ['Potasyum sonucunu görmeden insülin bolusu ver.', 'Hipokalemi varsa ölümcül aritmi gelişebilir.'],
      ['Bikarbonatı her DKA olgusunda rutin başla.', 'Bikarbonat yalnız çok ağır asidoz gibi seçilmiş durumlarda düşünülür.'],
      ['Glukoz normale yaklaşınca insülini hemen kes.', 'Ketonemi ve anyon açıklığı kapanmadan insülin kesilmemelidir.']
    ]
  }
};

const biochemRules = {
  'pediatrics-classic-galactosemia-001': [
    ['Süt alımı sonrası kusma, uzamış sarılık, hepatomegali ve kataraktı klasik galaktozemi lehine değerlendir.', 'Yenidoğanda sütle tetiklenen karaciğer bulguları GALT eksikliğini düşündürür.'],
    ['Laktoz/galaktoz içeren beslenmeyi tanı kesinleşmesini beklemeden kes.', 'Substrat kesilmezse karaciğer yetmezliği ve sepsis riski artar.'],
    ['Glukoz, bilirubin, karaciğer fonksiyonları, koagülasyon ve E. coli sepsisi açısından değerlendirme yap.', 'Galaktozemi akut dönemde hipoglisemi, hepatik hasar ve sepsisle komplike olabilir.'],
    ['GALT aktivitesi ve galaktoz-1-fosfat düzeyiyle tanıyı doğrula.', 'Hedef enzim/metabolit testi klinik tanıyı biyokimyasal olarak destekler.'],
    ['Uzun dönem laktozsuz/galaktozsuz beslenme, büyüme-gelişim izlemi ve genetik danışmanlık planla.', 'Erken diyet tedavisi komplikasyonları azaltır fakat izlem devam etmelidir.']
  ],
  'pediatrics-hereditary-fructose-intolerance-001': [
    ['Ek gıda veya meyve suyu sonrası kusma, terleme ve hipoglisemiyi herediter fruktoz intoleransı lehine değerlendir.', 'Fruktoz/sükroz/sorbitol maruziyeti sonrası semptom başlaması ayırt ettiricidir.'],
    ['Semptomatik hipoglisemiyi hızla düzelt ve güvenli karbonhidrat desteği ver.', 'Akut nöroglikopeni öncelikle tedavi edilmelidir.'],
    ['Fruktoz, sükroz ve sorbitolü diyetten tamamen çıkar.', 'Aldolaz B eksikliğinde toksik fruktoz-1-fosfat birikimi substrat kısıtlamasıyla önlenir.'],
    ['Karaciğer fonksiyonları, laktat ve hedef genetik/enzim değerlendirmesiyle tanıyı destekle.', 'Hepatik etkilenim ve biyokimyasal patern yönetimi güçlendirir.'],
    ['Aileye etiket okuma, acil hipoglisemi planı ve genetik danışmanlık ver.', 'Yanlışlıkla substrat alımı tekrarlayan krizlere yol açabilir.']
  ],
  'pediatrics-von-gierke-gsd-001': [
    ['Kısa açlıkta nöbet, hipoglisemi ve hepatomegaliyi karaciğer tipi glikojen depo hastalığı lehine değerlendir.', 'Von Gierke’de glukoz üretimi bozulduğu için kısa açlık tolere edilemez.'],
    ['Akut hipoglisemiyi IV/oral glukozla düzelt ve uzun açlığı hemen sonlandır.', 'Nörolojik hasar riskini azaltmak için glukoz hızla verilmelidir.'],
    ['Laktat, trigliserid ve ürik asit yüksekliğini tanısal paternin parçası olarak yorumla.', 'G6P birikimi laktik asidoz, hiperlipidemi ve hiperürisemiye yol açar.'],
    ['Sık beslenme ve gece çiğ mısır nişastası planıyla açlık hipoglisemisini önle.', 'Tedavinin temel hedefi stabil glisemiyi korumaktır.'],
    ['Metabolizma uzmanı izlemi, büyüme, karaciğer lezyonları ve renal komplikasyon takibini düzenle.', 'Uzun dönem komplikasyonlar düzenli izlem gerektirir.']
  ],
  'pediatrics-phenylketonuria-001': [
    ['Küf kokulu idrar, gelişim geriliği ve açık ten-saç bulgularını fenilketonüri lehine değerlendir.', 'Fenilalanin hidroksilaz yolundaki bozukluk nörolojik hasar oluşturur.'],
    ['Plazma fenilalanin düzeyi ve yenidoğan taraması sonucuyla tanıyı doğrula.', 'Erken biyokimyasal doğrulama tedaviyi zamanında başlatır.'],
    ['Fenilalaninden kısıtlı, tirozin destekli diyeti başla.', 'Tirozin PKU’da koşullu esansiyel hale gelir.'],
    ['BH4 yanıtlı olguda sapropterin gibi hedef seçenekleri değerlendir.', 'Bazı hastalarda kofaktör yanıtı diyet yükünü azaltabilir.'],
    ['Nörogelişim, büyüme ve fenilalanin düzeylerini düzenli izle.', 'Tedavi uyumu bozulursa kalıcı bilişsel etkilenme gelişebilir.']
  ],
  'pediatrics-maple-syrup-urine-disease-001': [
    ['Yenidoğanda kötü beslenme, letarji ve tatlı kokulu idrarı MSUD lehine acil değerlendir.', 'Dallı zincirli aminoasit birikimi hızlı ensefalopatiye neden olabilir.'],
    ['Katabolizmayı durdurmak için protein alımını geçici kes, yüksek kalorili glukoz/lipid desteği sağla.', 'Akut krizde amaç toksik aminoasit üretimini ve katabolizmayı azaltmaktır.'],
    ['Plazma aminoasitlerinde lösin/izolösin/valin yüksekliğini ve alloisolösini doğrula.', 'Hedef aminoasit profili tanısaldır.'],
    ['Lösin çok yüksek veya nörolojik kötüleşme varsa diyaliz/yoğun bakım desteğini değerlendir.', 'Toksik lösin düzeyi beyin ödemi ve koma riski taşır.'],
    ['Uzun dönem dallı zincirli aminoasit kısıtlı diyet, özel formula ve gerekirse tiamin yanıtı takibini planla.', 'Metabolik krizleri önlemek için düzenli beslenme ve izlem gerekir.']
  ],
  'internal-medicine-alkaptonuria-001': [
    ['Bekleyen idrarın koyulaşması, ochronotik pigmentasyon ve erken eklem yakınmalarını alkaptonüri lehine değerlendir.', 'Homogentisik asit birikimi idrar rengi ve bağ doku pigmentasyonuyla ipucu verir.'],
    ['İdrarda homogentisik asit düzeyiyle tanıyı doğrula.', 'Hedef metabolitin yüksekliği tanısal değerdedir.'],
    ['Eklem ağrısı ve fonksiyon kaybı için analjezi, fizik tedavi ve ortopedik izlem planla.', 'Tedavi çoğunlukla komplikasyon kontrolüne yöneliktir.'],
    ['Nitisinon gibi hedef tedavi seçeneklerini uzman değerlendirmesiyle düşün.', 'Homogentisik asit üretimini azaltan tedaviler seçilmiş hastalarda yararlı olabilir.'],
    ['Kapak kalsifikasyonu, renal taş ve omurga/eklem komplikasyonları için uzun dönem takip düzenle.', 'Ochronosis sistemik komplikasyonlara yol açabilir.']
  ],
  'pediatrics-albinism-001': [
    ['Yaygın hipopigmentasyon, fotofobi ve nistagmusu okülokutanöz albinizm lehine değerlendir.', 'Pigment sentez bozukluğu cilt ve göz bulgularını birlikte açıklar.'],
    ['Görme keskinliği, refraksiyon, nistagmus ve foveal hipoplazi için oftalmoloji değerlendirmesi planla.', 'Fonksiyonel etkilenim çoğunlukla oküler bulgularla belirlenir.'],
    ['Güneşten korunma, düzenli dermatolojik deri taraması ve eğitim ver.', 'Melanin eksikliği güneş hasarı ve deri kanseri riskini artırır.'],
    ['Kanama, immün yetmezlik veya nörolojik bulgu varsa sendromik albinizm açısından ayırıcı tanı yap.', 'Hermansky-Pudlak veya Chediak-Higashi gibi tablolar ek risk taşır.'],
    ['Genetik danışmanlık ve aile taramasını planla.', 'Kalıtım paterni aile planlaması için önemlidir.']
  ],
  'pediatrics-homocystinuria-001': [
    ['Lens subluksasyonu, marfanoid görünüm ve tromboz eğilimini homosistinüri lehine birlikte değerlendir.', 'Bağ dokusu, göz ve damar bulgularının birlikteliği ayırt ettiricidir.'],
    ['Plazma total homosistein ve metiyonin düzeylerini ölç.', 'CBS eksikliğinde bu metabolitler tanıyı destekler.'],
    ['Akut tromboz varsa standart antikoagülasyon ve organ tutulumuna yönelik tedaviyi başlat.', 'Tromboemboli homosistinüride başlıca morbidite nedenidir.'],
    ['Piridoksin yanıtı, folat/B12, betain ve metiyonin kısıtlı diyet seçeneklerini düzenle.', 'Tedavi metabolik yolu hedefleyerek homosistein düzeyini düşürür.'],
    ['Göz, iskelet ve vasküler komplikasyonlar için multidisipliner takip planla.', 'Uzun dönem riskler düzenli izlem gerektirir.']
  ],
  'internal-medicine-pellagra-001': [
    ['Fotosensitif dermatit, diyare ve bilişsel değişikliği niasin eksikliği lehine değerlendir.', 'Pellagra klasik olarak dermatit, diyare ve demans üçlüsüyle düşünülür.'],
    ['Niasin/niktotinamid replasmanını geciktirmeden başla.', 'Klinik şüphe güçlü olduğunda tedavi güvenli ve hızlı yanıtlıdır.'],
    ['Malnütrisyon, alkol kullanımı, malabsorpsiyon veya izoniazid gibi nedenleri araştır.', 'Altta yatan neden düzeltilmezse eksiklik tekrarlayabilir.'],
    ['Eşlik eden diğer B vitaminleri ve genel beslenme eksikliklerini yerine koy.', 'Tekli eksiklikten çok kombine malnütrisyon görülebilir.'],
    ['Deri lezyonları ve nörokognitif yanıtı takip et.', 'Tedavi yanıtı klinik olarak izlenir.']
  ],
  'internal-medicine-scurvy-001': [
    ['Diş eti kanaması, perifoliküler peteşi, morarma ve halsizliği C vitamini eksikliği lehine değerlendir.', 'Kollajen sentezi bozulduğu için kanama ve yara iyileşme sorunları gelişir.'],
    ['Beslenme öyküsü, kısıtlı diyet, alkol kullanımı veya malabsorpsiyon riskini sorgula.', 'Skorbüt tanısı çoğu zaman hedef öyküyle güçlenir.'],
    ['Plazma askorbik asit düşüklüğü ve eşlik eden anemi/demir eksikliğini yorumla.', 'C vitamini eksikliği demir metabolizmasını ve kanamayı etkileyebilir.'],
    ['Oral C vitamini replasmanı ve beslenme düzenlemesini başla.', 'Tedavi sonrası gingival bulgular ve halsizlik genellikle düzelir.'],
    ['Kanama, yara iyileşmesi ve eşlik eden eksiklikler açısından takip planla.', 'Komplikasyonlar ve kombine beslenme eksiklikleri izlenmelidir.']
  ],
  'internal-medicine-hemochromatosis-001': [
    ['Karaciğer enzim yüksekliği, hiperpigmentasyon, diyabet ve artropatiyi demir yükü lehine değerlendir.', 'Klasik bronz diyabet paterni herediter hemokromatozisi düşündürür.'],
    ['Transferrin satürasyonu ve ferritin düzeyini ilk biyokimyasal tarama olarak yorumla.', 'Yüksek transferrin satürasyonu demir yükünü destekler.'],
    ['HFE genetik testiyle herediter formu doğrula.', 'Genetik doğrulama aile taramasını yönlendirir.'],
    ['Flebotomi tedavisini ferritin hedeflerine göre planla.', 'Demir yükünü azaltmanın temel tedavisi düzenli kan alımıdır.'],
    ['Siroz, hepatosellüler karsinom, diyabet ve kardiyak tutulum açısından izlem düzenle.', 'Organ hasarı prognozu belirler.']
  ],
  'internal-medicine-familial-hypercholesterolemia-001': [
    ['Tendon ksantomu, çok yüksek LDL ve erken koroner hastalık aile öyküsünü ailesel hiperkolesterolemi lehine değerlendir.', 'LDL reseptör yolu bozukluğu erken ateroskleroz riskini artırır.'],
    ['Açlık lipid profiliyle LDL yüksekliğini ve trigliseridlerin genellikle normal olduğunu doğrula.', 'Tip IIa paterni tanısal ayrım sağlar.'],
    ['Yüksek yoğunluklu statin temelli lipid düşürücü tedaviyi başla ve hedefe göre ek ajan düşün.', 'Erken agresif LDL düşürme kardiyovasküler riski azaltır.'],
    ['Birinci derece akrabalar için kaskad tarama planla.', 'Otozomal dominant kalıtım nedeniyle aile taraması kritiktir.'],
    ['Koroner risk, yaşam tarzı ve tedavi yanıtını düzenli izle.', 'Tedavi yaşam boyu sürer ve hedef LDL’ye göre ayarlanır.']
  ],
  'internal-medicine-tangier-disease-001': [
    ['Turuncu tonsiller, çok düşük HDL ve periferik nöropatiyi Tangier hastalığı lehine değerlendir.', 'ABCA1 bozukluğu kolesterol effluksunu ve HDL oluşumunu bozar.'],
    ['HDL, ApoA-I ve tam lipid profilini birlikte yorumla.', 'Tangier’de HDL ve ApoA-I belirgin düşüktür.'],
    ['ABCA1 genetik doğrulaması ve aile değerlendirmesini planla.', 'Genetik tanı nadir lipoprotein bozukluğunu kesinleştirir.'],
    ['Nöropati, hepatosplenomegali ve kardiyovasküler risk açısından takip düzenle.', 'Doku kolesterol birikimi sistemik bulgulara yol açabilir.'],
    ['Yaşam tarzı ve kardiyometabolik risk yönetimini bireyselleştir.', 'Spesifik küratif tedavi olmadığından izlem ve risk azaltma önemlidir.']
  ],
  'internal-medicine-oxidative-stress-injury-001': [
    ['Bakla veya oksidatif ilaç sonrası ani sarılık, koyu idrar ve halsizliği akut hemoliz lehine değerlendir.', 'G6PD eksikliğinde oksidatif stres eritrositleri hemolize yatkınlaştırır.'],
    ['Hemoglobin, retikülosit, indirekt bilirubin, LDH, haptoglobin ve idrar bulgularıyla hemolizi doğrula.', 'Laboratuvar paterni intravasküler/ekstravasküler hemolizi gösterir.'],
    ['Periferik yaymada Heinz cisimciği ve bite cell bulgularını ara.', 'Oksidatif hemoliz için yüksek verimli sınav bulgularıdır.'],
    ['Tetikleyiciyi kes, hidrasyon ve böbrek izlemi sağla; ağır anemide transfüzyon değerlendir.', 'Tedavi temel olarak tetikleyiciden uzaklaştırma ve destek yaklaşımıdır.'],
    ['Akut atak geçtikten sonra G6PD düzeyini tekrar değerlendir ve kaçınılacak ilaç/gıda eğitimi ver.', 'Akut dönemde retikülositoz enzimi yalancı normal gösterebilir.']
  ]
};

const biochemDistractors = [
  ['Semptomlar sürse bile hedef metabolik testi ve tedaviyi kontrol randevusuna ertele.', 'Metabolik veya vitamin eksikliği tablolarında erken tanı/tedavi komplikasyonu önler.'],
  ['Tüm olguları aynı geniş biyokimya paneliyle yönetip hedef testi sonraya bırak.', 'Bu vakalarda karar verdiren test tanıya özgü enzim, metabolit veya lipid paternidir.'],
  ['Beslenme veya tetikleyici öyküsünü tanısal değerlendirmeye katma.', 'Metabolik ve vitamin hastalıklarında maruziyet-zaman ilişkisi temel ipucudur.']
];

const stats = {
  totalCases: cases.length,
  spotCases: 0,
  spotSimplified: 0,
  managementRewritten: 0,
  explicitInvestigationRemoved: 0,
  explicitInvestigationCorrected: 0,
  mappedCases: []
};

for (const c of cases) {
  const removed = dedupeInvestigations(c);
  stats.explicitInvestigationRemoved += removed;
  if (removed > 0) stats.explicitInvestigationCorrected += 1;

  const isSpot = c.branchId === 'tus-spot-olgular' || c.caseType === 'spot';
  if (isSpot) {
    stats.spotCases += 1;
    if (disableSpotManagement(c)) {
      stats.spotSimplified += 1;
      stats.managementRewritten += 1;
    }
    continue;
  }

  let entry = managementMap[c.id];
  if (!entry && biochemRules[c.id]) {
    entry = { required: biochemRules[c.id], distractors: biochemDistractors };
  }
  if (entry) {
    if (setManagement(c, entry.required, entry.distractors)) {
      stats.managementRewritten += 1;
      stats.mappedCases.push(c.id);
    }
  }
}

const pneu = cases.find((c) => c.id === 'pulm-pneumonia-001');
if (pneu) {
  if (setInvestigation(pneu, 'cxr', {
    priority: 'essential',
    summary: 'Sağ alt lobda hava bronkogramı içeren lobar konsolidasyon izlenir; bulgu klinikle birlikte bakteriyel pnömoniyi destekler.',
    findings: ['Sağ alt lob konsolidasyonu', 'Hava bronkogramı', 'Plevral efüzyon veya apse bulgusu yok']
  })) stats.explicitInvestigationCorrected += 1;
  if (setInvestigation(pneu, 'labs', {
    priority: 'useful',
    summary: 'Lökosit ve CRP sonuçları birim ve referans aralığıyla sistemik inflamasyonu destekler.',
    findings: ['Lökositoz ve yüksek CRP', 'Böbrek fonksiyonu antibiyotik dozu için değerlendirilir']
  })) stats.explicitInvestigationCorrected += 1;
  if (setInvestigation(pneu, 'culture', {
    priority: 'situational',
    summary: 'Yatış gerektiren tabloda balgam Gram boyamada bol PMNL ve gram pozitif diplokoklar görülür; kan kültüründe erken dönemde üreme saptanmaz.',
    findings: ['Ağır/yatan hastada antibiyotik daraltma için değerlidir', 'Hafif ayaktan olguda rutin zorunlu değildir']
  })) stats.explicitInvestigationCorrected += 1;
}

const dka = cases.find((c) => c.id === 'im-dka-001');
if (dka) {
  if (setInvestigation(dka, 'blood-gas', {
    priority: 'essential',
    summary: 'pH 7.18, HCO3- 8 mmol/L ve anyon açıklığı 28 mmol/L saptanır; yüksek anyon açıklı metabolik asidoz DKA ile uyumludur.'
  })) stats.explicitInvestigationCorrected += 1;
  if (setInvestigation(dka, 'urine', {
    priority: 'essential',
    label: 'Serum/idrarda keton ve glukoz değerlendirmesi',
    summary: 'Glukoz ve keton sonuçları birim/referans bilgisiyle hiperglisemi ve ketozis paternini tamamlar.'
  })) stats.explicitInvestigationCorrected += 1;
  if (setInvestigation(dka, 'trigger-screening-dka', {
    priority: 'situational',
    label: 'Tetikleyiciye yönelik hedef tarama',
    summary: 'Ateş, akciğer bulgusu, göğüs ağrısı veya EKG değişikliği varsa enfeksiyon/MI açısından hedef test seçilir; rutin geniş panel değildir.'
  })) stats.explicitInvestigationCorrected += 1;
}

const sle = cases.find((c) => c.id === 'internal-medicine-systemic-lupus-erythematosus-001');
if (sle) {
  if (setInvestigation(sle, 'ana-anti-dsdna-ve-kompleman-duzeyleri-23', {
    label: 'SLE serolojisi ve aktivite paneli',
    priority: 'essential',
    summary: 'ANA pozitif, anti-dsDNA yüksek, C3 ve C4 düşük saptanır; bulgular aktif SLE ve nefrit riski lehinedir.'
  })) stats.explicitInvestigationCorrected += 1;
  if (setInvestigation(sle, 'tam-idrar-analizi-ve-proteinuri-23', {
    priority: 'essential',
    summary: 'Proteinüri ve mikroskopik hematüri saptanır; renal tutulum değerlendirmesi gerekir.'
  })) stats.explicitInvestigationCorrected += 1;
}

const scurvy = cases.find((c) => c.id === 'internal-medicine-scurvy-001');
if (scurvy?.investigations) {
  const before = scurvy.investigations.length;
  const preferredVitamin = scurvy.investigations.find((inv) => inv.id === 'vitamin-c-level') || scurvy.investigations.find((inv) => /askorbik/i.test(inv.label));
  const hemo = scurvy.investigations.find((inv) => /hemogram/i.test(inv.label));
  scurvy.investigations = [preferredVitamin, hemo].filter(Boolean);
  const removed = Math.max(0, before - scurvy.investigations.length);
  if (removed) {
    stats.explicitInvestigationRemoved += removed;
    stats.explicitInvestigationCorrected += 1;
  }
  if (preferredVitamin) {
    preferredVitamin.priority = 'essential';
    preferredVitamin.summary = 'Plazma askorbik asit düzeyi belirgin düşük saptanır; diş eti kanaması ve perifoliküler peteşilerle birlikte skorbütü destekler.';
  }
}

// Keep answer feedback aligned after post-investigation updates.
for (const c of cases) {
  const requiredLabels = c.managementSequence?.steps?.filter((step) => step.required).map((step) => step.label) || [];
  if (!requiredLabels.length || !c.diagnosis?.answerFeedback) continue;
  c.diagnosis.answerFeedback.management = requiredLabels;
  c.diagnosis.answerFeedback.managementSteps = requiredLabels;
}

const forbidden = [
  'hastalık odağını',
  'tedaviyi geciktirmeyecek şekilde hedef mikrobiyolojik',
  'hedef ampirik veya özgül',
  'izolasyon veya temaslı yönetimini',
  'Her enfeksiyon aynı sepsis algoritmasıyla',
  'Klinik bağlam içinde değerlendir',
  'Klinik senaryoya göre yorumla',
  'Gerekirse temel tetkikleri al',
  'Hastayı takip et.',
  'Tedaviyi düzenle.',
  'Gerekli konsültasyonları iste',
  'Ayırıcı tanıları değerlendir'
];
const serialized = JSON.stringify(cases, null, 2);
stats.remainingForbiddenHits = forbidden.reduce((sum, phrase) => sum + (serialized.match(new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length, 0);

const file = `// KlinikIQ vaka verisi: TUS odaklı, klinik karar verdirici ve objektif tetkik sonuçlarıyla yapılandırılmıştır.\n// Bu sürümde yönetim sırası ve tetkik istemleri vaka özelinde sadeleştirilmiştir.\n\nexport const cases = ${serialized};\n\nexport const getCaseById = (caseId) => cases.find((clinicalCase) => clinicalCase.id === caseId);\n\nexport const getCasesByBranch = (branchId) => cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n`;
writeFileSync(new URL('../src/data/cases.js', import.meta.url), file);
writeFileSync(new URL('../KLINIKIQ_CLINICAL_CONTENT_QA_REPORT.json', import.meta.url), JSON.stringify(stats, null, 2));
console.log(JSON.stringify(stats, null, 2));
