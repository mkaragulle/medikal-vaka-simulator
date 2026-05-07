import fs from 'fs';
import path from 'path';
import { cases } from '../src/data/cases.js';

const workDir = path.resolve(new URL('..', import.meta.url).pathname);
const casesPath = path.join(workDir, 'src/data/cases.js');

function trLower(value = '') {
  return String(value).toLocaleLowerCase('tr-TR');
}

function slug(value = '') {
  return trLower(value)
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 52) || 'step';
}

function cleanSentence(value = '') {
  const text = String(value).replace(/\s+/g, ' ').trim().replace(/[.;]+$/g, '');
  return text;
}

function makeStep(prefix, item, index, required = true) {
  const [label, rationale, unsafe = false] = item;
  return {
    id: `${prefix}-${required ? 'r' : 'd'}-${index + 1}-${slug(label)}`,
    label: cleanSentence(label),
    required,
    correctOrder: required ? index + 1 : null,
    unsafe: !required && Boolean(unsafe),
    score: required ? (index < 3 ? 2 : 1) : (unsafe ? -2 : -1),
    rationale: cleanSentence(rationale),
  };
}

function makeSequence(caseId, title, instruction, required, distractors, options = {}) {
  const prefix = slug(caseId);
  const steps = [
    ...required.map((item, index) => makeStep(prefix, item, index, true)),
    ...distractors.map((item, index) => makeStep(prefix, item, index, false)),
  ];
  return {
    enabled: true,
    showInSpot: Boolean(options.showInSpot),
    title,
    instruction,
    minRequiredSteps: required.length,
    steps,
  };
}

function pool(c) {
  return trLower([
    c.id,
    c.title,
    c.branchId,
    c.caseType,
    c.spotCategory,
    c.relatedBranch,
    c.clinicalFocus,
    c.chiefComplaint,
    c.stem,
    c.diagnosis?.correct,
    ...(c.tags || []),
  ].filter(Boolean).join(' '));
}

function inferTitle(c) {
  if (c.title && c.title !== 'undefined') return c.title;
  const cc = cleanSentence(c.chiefComplaint || '');
  if (cc) {
    if (cc.length <= 88) return cc;
    return `${cc.slice(0, 85).trim()}…`;
  }
  const focus = cleanSentence(c.clinicalFocus || c.diagnosis?.correct || 'TUS spot olgu');
  return focus.length <= 88 ? focus : `${focus.slice(0, 85).trim()}…`;
}

const seq = {
  stemi(c) {
    return makeSequence(c.id, 'STEMI yönetim sırası', 'Reperfüzyon gecikmesini önleyecek acil kardiyak yönetim basamaklarını sırala.', [
      ['İskemik göğüs ağrısı ve ardışık derivasyonlarda ST elevasyonu paternini hızla tanı', 'STEMI’de tedavi kararı tipik klinik ve EKG ile verilir; troponin tekrarını beklemek reperfüzyonu geciktirir.'],
      ['Hastayı monitörize et, defibrilatör erişimini ve iki damar yolu hazırlığını sağla', 'STEMI erken dönemde ölümcül aritmi ve hemodinamik bozulma riski taşır.'],
      ['Aspirin, P2Y12 inhibitörü ve antikoagülasyonu kontrendikasyonları dışlayarak başla', 'Antitrombotik tedavi trombüs ilerlemesini azaltır ve reperfüzyon stratejisinin temel parçasıdır.'],
      ['Primer perkütan koroner girişim için kateter laboratuvarını aktive et', 'Uygun merkezde en etkili yaklaşım mümkün olan en kısa sürede koroner reperfüzyondur.'],
      ['PCI gecikecekse fibrinolitik uygunluğunu kanama riskiyle birlikte değerlendir', 'Zaman hedefi aşılıyorsa ve kontrendikasyon yoksa fibrinoliz mortaliteyi azaltabilir.'],
      ['Aritmi, kalp yetmezliği, tekrar iskemi ve kanama komplikasyonlarını yakın izle', 'Akut dönem izlemi hem tedavi güvenliği hem de erken komplikasyon yönetimi için zorunludur.'],
    ], [
      ['Troponin sonucunu seri olarak bekle ve reperfüzyon kararını ertele', 'ST elevasyonu ile uyumlu klinikte reperfüzyon kararı troponin beklenerek geciktirilmez.', true],
      ['Akut ağrı sırasında elektif efor testi planla', 'Efor testi akut koroner oklüzyon şüphesinde kontrendike/uygunsuz bir ilk basamaktır.', true],
      ['STEMI paternini yalnız analjeziyle izlemeye al', 'Analjezi destekleyicidir; koroner reperfüzyonun yerine geçmez.', true],
    ]);
  },
  aorticDissection(c) {
    return makeSequence(c.id, 'Aort diseksiyonu yönetim sırası', 'Tip A diseksiyonda mortaliteyi artıran gecikmeleri önleyecek basamakları sırala.', [
      ['Yırtılır tarzda ağrı, nabız/kan basıncı asimetrisi ve nörolojik-periferik iskemi bulgularını birlikte değerlendir', 'Klinik ipuçları diseksiyon şüphesini güçlendirir ve hızlı görüntüleme gerektirir.'],
      ['Kan basıncı ve kalp hızını invaziv/yoğun monitorizasyonla takip et', 'Diseksiyonda duvar gerilimini azaltmak için hemodinamik kontrol ilk tedavi hedefidir.'],
      ['Önce intravenöz beta-blokör ile kalp hızını düşür', 'Refleks taşikardiyi önlemeden vazodilatör vermek shear stresini artırabilir.'],
      ['Gerekiyorsa beta-blokaj sonrası intravenöz vazodilatör ekle', 'Sistolik basınç kontrollü düşürülürken kalp hızı kontrolü korunmalıdır.'],
      ['BT anjiyografi veya uygun acil görüntüleme ile diseksiyon tipini doğrula', 'Stanford tipinin belirlenmesi cerrahi/endovasküler kararını doğrudan değiştirir.'],
      ['Stanford tip A saptanırsa acil kardiyovasküler cerrahi konsültasyonu ve operasyon hazırlığı başlat', 'Tip A diseksiyonda definitif tedavi gecikmeden cerrahidir.'],
    ], [
      ['Beta-blokaj olmadan yalnız nitroprussid ile basıncı düşür', 'Önce kalp hızı kontrol edilmezse refleks taşikardi diseksiyon stresini artırabilir.', true],
      ['Ağrı azalırsa ayaktan kontrol planla', 'Diseksiyon şüphesi stabil görünümle dışlanamaz ve yüksek mortalite taşır.', true],
      ['Antikoagülasyonu rutin olarak başla', 'Diseksiyonda kanama/ruptür riski nedeniyle antikoagülasyon rutin ilk yaklaşım değildir.', true],
    ]);
  },
  tamponade(c) {
    return makeSequence(c.id, 'Kardiyak tamponad yönetim sırası', 'Obstrüktif şoku hızla tanıyıp definitif boşaltma kararını sırala.', [
      ['Hipotansiyon, juguler venöz dolgunluk ve kalp seslerinde azalma bulgularını tamponad lehine yorumla', 'Beck triadı obstrüktif şokun kritik ipucudur.'],
      ['Hastayı monitörize et ve damar yolu ile dolaşım desteğini hazırla', 'Tamponadda küçük hemodinamik değişiklikler hızla kollapsa ilerleyebilir.'],
      ['Yatak başı ekokardiyografi ile perikardiyal efüzyon ve sağ kalp basısını değerlendir', 'EKO tanıyı doğrular ve girişim gereksinimini gösterir.'],
      ['Hemodinamik bozulma varsa acil perikardiyosentez uygula', 'Definitif acil tedavi bası yapan sıvının boşaltılmasıdır.'],
      ['Perikard sıvısı etiyolojisi ve nüks riski için ileri değerlendirme planla', 'Malignite, enfeksiyon, üremi veya travma gibi nedenler tedavi yönünü belirler.'],
    ], [
      ['Hipotansiyon düzelene kadar yalnız diüretik ver', 'Diürez preloadu azaltarak tamponadda dolaşımı daha da bozabilir.', true],
      ['EKO bulgularına rağmen taburculuk öner', 'Tamponad hemodinamik acildir ve ayaktan izlemle yönetilemez.', true],
      ['Perikardiyosentezi yalnız troponin sonucuna göre planla', 'Tamponad kararı kardiyak biyobelirteç değil hemodinami ve EKO ile verilir.', true],
    ]);
  },
  pulmonaryEdema(c) {
    return makeSequence(c.id, 'Akut kardiyojenik pulmoner ödem yönetim sırası', 'Solunum iş yükünü ve kardiyak dolum basıncını azaltan basamakları sırala.', [
      ['Akut dispne, ortopne, yaygın ral ve hipoksemi bulgularını kardiyojenik pulmoner ödem lehine değerlendir', 'Klinik örüntü hızlı solunum desteği ve preload/afterload yönetimi gerektirir.'],
      ['Hastayı monitörize et ve oksijenizasyonu değerlendir', 'Hipoksemi ve aritmi akut dönemde mortaliteyi artırır.'],
      ['Solunum sıkıntısı belirginse non-invaziv ventilasyon başlatmayı değerlendir', 'NIV alveoler ventilasyonu artırır ve solunum iş yükünü azaltır.'],
      ['Hipertansiyon/afterload yüksekliği varsa intravenöz vazodilatör tedavi başla', 'Hipertansif pulmoner ödemde afterload düşürülmesi hızlı klinik düzelme sağlar.'],
      ['Volüm yükü bulguları varsa intravenöz loop diüretik ekle', 'Diürez pulmoner konjesyonu azaltır; ancak hipotansiyonda dikkatli planlanır.'],
      ['Akut koroner sendrom, aritmi ve böbrek fonksiyonlarını eş zamanlı değerlendir', 'Pulmoner ödemi tetikleyen neden tedavinin kalıcılığını belirler.'],
    ], [
      ['Kan basıncı çok yüksekken yalnız oral antihipertansif verip taburcu et', 'Hipertansif pulmoner ödem acil intravenöz tedavi ve yakın izlem gerektirir.', true],
      ['Rutin ilk seçenek olarak pozitif inotrop başla', 'Sistolik fonksiyon korunmuş ve hipertansif tabloda inotrop öncelikli değildir.', true],
      ['Fibrinolitik tedaviyi pulmoner ödemin rutin tedavisi olarak uygula', 'Fibrinoliz yalnız uygun akut koroner oklüzyon endikasyonunda düşünülür.', true],
    ]);
  },
  hocm(c) {
    return makeSequence(c.id, 'Hipertrofik obstrüktif kardiyomiyopati yönetim sırası', 'Eforla senkop ve dinamik obstrüksiyonda güvenli spor/aritmi yaklaşımını sırala.', [
      ['Eforla senkop, aile öyküsü ve manevrayla değişen üfürümü HOKM lehine değerlendir', 'Dinamik çıkış yolu obstrüksiyonu genç sporcuda ani ölüm riski taşır.'],
      ['Ekokardiyografi ile septal hipertrofi ve çıkış yolu gradiyentini doğrula', 'Tanı ve risk sınıflaması EKO bulgularına dayanır.'],
      ['Ani kardiyak ölüm riskini aile öyküsü, senkop, aritmi ve duvar kalınlığı üzerinden sınıfla', 'Yüksek riskli hastada ICD kararı gündeme gelebilir.'],
      ['Semptom kontrolü için beta-blokör veya non-dihidropiridin kalsiyum kanal blokeri düşün', 'Negatif inotropi çıkış yolu gradiyentini ve semptomları azaltabilir.'],
      ['Dehidratasyon, vazodilatör ve yoğun rekabetçi egzersizden kaçınma eğitimi ver', 'Preload azalması dinamik obstrüksiyonu artırır.'],
      ['Yüksek risk varsa kardiyoloji/elektrofizyoloji ile ICD ve aile taraması planla', 'HOKM kalıtsal olabilir ve ani ölüm önleme stratejisi gerektirebilir.'],
    ], [
      ['Üfürüm azalır diye nitrata rutin başla', 'Vazodilatasyon preloadu azaltarak çıkış yolu obstrüksiyonunu kötüleştirebilir.', true],
      ['Senkop öyküsüne rağmen rekabetçi spora hemen dönüş öner', 'Eforla senkop ani ölüm riski açısından ciddi uyarıdır.', true],
      ['Tanıyı yalnız oskültasyonla kesinleştirip EKO isteme', 'HOKM tanısı ve risk sınıflaması görüntüleme ile doğrulanmalıdır.', false],
    ]);
  },
  dka(c) {
    return makeSequence(c.id, 'Diyabetik ketoasidoz yönetim sırası', 'Asidoz, ketozis ve sıvı-elektrolit açığını güvenli sırayla düzelt.', [
      ['DKA tanısını hiperglisemi, ketozis ve yüksek anyon açıklı metabolik asidoz birlikteliğiyle doğrula', 'DKA yönetimi tanısal üçlünün ve tetikleyicinin birlikte değerlendirilmesiyle başlar.'],
      ['İlk olarak izotonik sıvı resüsitasyonuna başla', 'DKA’da en erken ve en büyük fizyolojik sorun belirgin volüm açığıdır.'],
      ['Serum potasyumunu değerlendir ve insülin öncesi güvenli düzeyi sağla', 'İnsülin potasyumu hücre içine sokar; düşük potasyumda fatal aritmi gelişebilir.'],
      ['Potasyum uygunsa intravenöz düzenli insülin infüzyonu başla', 'İnsülin ketogenezi durdurur ve asidozun düzelmesini sağlar.'],
      ['Glukoz düştüğünde dekstroz ekleyerek insülini ketoasidoz kapanana kadar sürdür', 'Tedavi hedefi yalnız glukoz düşürmek değil anyon açığını kapatmaktır.'],
      ['Enfeksiyon, insülin atlanması veya miyokart iskemisi gibi tetikleyicileri araştır', 'Tetikleyici düzeltilmezse DKA tekrarlayabilir veya dirençli seyreder.'],
    ], [
      ['Potasyum düşükken insülin infüzyonuna hemen başla', 'Hipokalemi düzeltilmeden insülin verilmesi yaşamı tehdit eden aritmiye yol açabilir.', true],
      ['Asidoz düzelmeden sadece subkutan kısa etkili insülinle taburcu et', 'Orta-ağır DKA yakın izlem ve intravenöz tedavi gerektirir.', true],
      ['Tedavi başarısını yalnız kapiller glukoz normalleşmesiyle değerlendir', 'DKA’da anyon açığı ve ketozisin düzelmesi izlenmelidir.', false],
    ]);
  },
  pancreatitis(c) {
    return makeSequence(c.id, 'Akut pankreatit yönetim sırası', 'Biliyer pankreatitte erken destek tedavisi ve safra yolu kararını sırala.', [
      ['Sırta yayılan epigastrik ağrı ve lipaz/amilaz yüksekliği ile akut pankreatiti tanı', 'Tanı klinik ve enzim yüksekliği ile çoğu olguda konur.'],
      ['Erken dönemde izotonik sıvı resüsitasyonu, analjezi ve oral alımı kesme/erken beslenme stratejisini planla', 'Destek tedavisi pankreatitte başlangıç yönetiminin temelidir.'],
      ['Şiddet riskini vital bulgular, organ yetmezliği ve laboratuvar trendleriyle sınıfla', 'Yoğun bakım ve yakın izlem gereksinimi risk sınıflamasıyla belirlenir.'],
      ['Biliyer neden için karaciğer testleri ve hepatobiliyer ultrason bulgularını değerlendir', 'Safra taşı varlığı tekrar ve komplikasyon riskini değiştirir.'],
      ['Kolanjit veya persistan obstrüksiyon varsa erken ERCP planla', 'ERCP yalnız seçilmiş biliyer obstrüksiyon/kolanjit durumlarında gereklidir.'],
      ['Klinik düzelme sonrası aynı yatışta kolesistektomi zamanlamasını değerlendir', 'Biliyer pankreatitte nüksü önlemek için safra kesesi kaynağı ele alınmalıdır.'],
    ], [
      ['Komplike olmayan pankreatitte rutin profilaktik geniş spektrum antibiyotik başla', 'Steril pankreatitte profilaktik antibiyotik önerilmez.', true],
      ['Her biliyer pankreatitte acil ERCP uygula', 'ERCP kolanjit veya devam eden obstrüksiyon kanıtı varsa önceliklidir.', false],
      ['Ağrıyı değerlendirmeden yalnız enzim takibiyle izle', 'Analjezi ve klinik stabilizasyon pankreatit yönetiminin erken parçasıdır.', true],
    ]);
  },
  varicealBleed(c) {
    return makeSequence(c.id, 'Özofagus varis kanaması yönetim sırası', 'Sirozlu hastada kanama kontrolü ve yeniden kanama önleme basamaklarını sırala.', [
      ['Hemodinamik durumu değerlendir ve geniş damar yolu ile resüsitasyon hazırlığını başlat', 'Varis kanaması hipovolemik şoka hızla ilerleyebilir.'],
      ['Kan grubu, cross-match, hemogram ve koagülasyon değerlendirmesini al', 'Transfüzyon ve işlem güvenliği için başlangıç verileri gerekir.'],
      ['Vazoaktif tedaviyi erken başla ve profilaktik antibiyotik ekle', 'Terlipressin/oktreotid kanamayı azaltır; sirozda antibiyotik enfeksiyon ve mortaliteyi azaltır.'],
      ['Stabilizasyon sonrası acil üst endoskopi ile band ligasyonu planla', 'Endoskopik tedavi varis kanamasında definitif kanama kontrolünün temelidir.'],
      ['Kontrol edilemeyen kanamada balon tamponad veya erken TIPS gereksinimini değerlendir', 'Köprü/definitif girişimler refrakter kanamada hayat kurtarıcı olabilir.'],
      ['Sekonder profilaksi için nonselektif beta-blokör ve tekrar ligasyon programını düzenle', 'Yeniden kanama riski yüksektir ve profilaksi zorunludur.'],
    ], [
      ['Aktif hematemez varken yalnız oral PPI vererek takip et', 'Varis kanamasında vazoaktif tedavi ve endoskopik kontrol geciktirilmemelidir.', true],
      ['Antibiyotik profilaksisini sirozda gereksiz kabul et', 'Sirotik varis kanamasında antibiyotik enfeksiyon ve yeniden kanama riskini azaltır.', true],
      ['Endoskopiyi hemodinamik değerlendirme yapmadan elektife ertele', 'Aktif/şüpheli varis kanaması acil endoskopik plan gerektirir.', false],
    ]);
  },
  ironDeficiency(c) {
    return makeSequence(c.id, 'Demir eksikliği anemisi yönetim sırası', 'Demir replasmanı ile altta yatan kan kaybı nedenini birlikte ele al.', [
      ['Mikrositer anemi, düşük ferritin ve klinik pica ipuçlarıyla demir eksikliğini doğrula', 'Demir eksikliği tanısı yalnız MCV ile değil demir depolarıyla desteklenir.'],
      ['Yaş, cinsiyet ve kanama öyküsüne göre gastrointestinal veya jinekolojik kan kaybı kaynağını araştır', 'Erişkin erkekte ve postmenopozal kadında gizli GI kanama dışlanmalıdır.'],
      ['Uygun hastada oral demir replasmanı ve kullanım eğitimini başla', 'Demir depolarının dolması için düzenli ve yeterli süre tedavi gerekir.'],
      ['Toleranssızlık, malabsorpsiyon veya ağır eksiklikte intravenöz demir seçeneğini değerlendir', 'IV demir seçilmiş hastalarda hızlı ve güvenilir replasman sağlar.'],
      ['Hemoglobin yanıtını ve ferritin düzelmesini takip et', 'Yanıt olmaması uyumsuzluk, devam eden kanama veya yanlış tanı düşündürür.'],
    ], [
      ['Altta yatan kanama kaynağını araştırmadan yalnız kısa süre vitamin ver', 'Demir eksikliği özellikle erişkinde önemli bir kanama belirtisi olabilir.', true],
      ['Ferritin düşükken direkt kemik iliği aspirasyonu planla', 'Tipik demir eksikliğinde invaziv kemik iliği incelemesi ilk basamak değildir.', false],
      ['Hemoglobin normale gelir gelmez depoları değerlendirmeden tedaviyi kes', 'Demir depoları dolmadan tedaviyi kesmek nüks riskini artırır.', false],
    ]);
  },
  hyperparathyroid(c) {
    return makeSequence(c.id, 'Primer hiperparatiroidi yönetim sırası', 'Hiperkalsemi-PTH ilişkisinden cerrahi endikasyona kadar yaklaşımı sırala.', [
      ['Hiperkalsemi ile uygunsuz yüksek PTH birlikteliğini primer hiperparatiroidi lehine yorumla', 'PTH yüksekliği hiperkalseminin PTH aracılı olduğunu gösterir.'],
      ['Böbrek taşı, kemik yoğunluğu, böbrek fonksiyonu ve semptomları değerlendir', 'Cerrahi endikasyonlar hedef organ etkilenimine göre belirlenir.'],
      ['Serum kalsiyum, fosfor, 25-OH D vitamini ve 24 saatlik idrar kalsiyumunu tamamla', 'Ailevi hipokalsiürik hiperkalsemi ve vitamin D durumu ayırıcı tanıda önemlidir.'],
      ['Cerrahi endikasyon varsa paratiroidektomi için lokalizasyon görüntülemesi planla', 'Görüntüleme tanı koymak için değil cerrahi planlama için kullanılır.'],
      ['Cerrahi uygun değilse hidrasyon, kalsiyum/D vitamini dengesi ve medikal izlem seçeneklerini düzenle', 'Semptom ve risk durumuna göre cinakalsed veya antiresorptif tedavi düşünülebilir.'],
    ], [
      ['PTH yüksekliğini baskılamak için tanı doğrulamadan yüksek doz kalsiyum ver', 'Hiperkalsemide kontrolsüz kalsiyum replasmanı tabloyu kötüleştirebilir.', true],
      ['Lokalizasyon sintigrafisini tanı koydurucu ilk test kabul et', 'Primer hiperparatiroidi tanısı biyokimyasal olarak konur; görüntüleme cerrahi plan içindir.', false],
      ['Böbrek taşı öyküsünü cerrahi kararında önemsiz kabul et', 'Nefrolitiyazis hedef organ tutulumu ve cerrahi endikasyon açısından önemlidir.', true],
    ]);
  },
  ischemicStroke(c) {
    return makeSequence(c.id, 'Akut iskemik inme yönetim sırası', 'Reperfüzyon uygunluğunu zaman ve görüntüleme üzerinden sırala.', [
      ['Ani fokal nörolojik defisiti inme alarmı olarak değerlendir ve son sağlıklı görülme zamanını netleştir', 'Reperfüzyon penceresi zaman bilgisi olmadan belirlenemez.'],
      ['Kapiller glukoz ve temel stabilite değerlendirmesiyle inme taklitçilerini hızla dışla', 'Hipoglisemi gibi düzeltilebilir durumlar inme benzeri bulgu verebilir.'],
      ['Kontrastsız beyin BT ile intrakraniyal kanamayı dışla', 'Tromboliz/antitrombotik kararından önce kanama dışlanmalıdır.'],
      ['Damar görüntüleme ile büyük damar oklüzyonunu değerlendir', 'Trombektomi kararı proksimal damar oklüzyonu ve zaman penceresine bağlıdır.'],
      ['Kontrendikasyon yoksa zaman penceresine göre IV tromboliz ve/veya mekanik trombektomi planla', 'Uygun hastada reperfüzyon fonksiyonel sonuçları belirler.'],
      ['Yutma değerlendirmesi, kan basıncı hedefi ve sekonder korunma planını düzenle', 'Akut tedavi sonrası aspirasyon, kanama ve tekrar inme riski yönetilmelidir.'],
    ], [
      ['Beyin görüntülemesi olmadan trombolitik tedavi uygula', 'Kanama dışlanmadan tromboliz ciddi zarar verebilir.', true],
      ['Son sağlıklı görülme zamanı bilinmeden rutin tromboliz başla', 'Zaman penceresi ve görüntüleme kriterleri reperfüzyon kararının temelidir.', true],
      ['Fokal defisiti yalnız yorgunluğa bağlayıp taburcu et', 'Ani fokal defisit inme kabul edilerek acil değerlendirilmelidir.', true],
    ]);
  },
  sah(c) {
    return makeSequence(c.id, 'Subaraknoid kanama yönetim sırası', 'Anevrizmal kanamada yeniden kanama ve vazospazm riskini yönetecek basamakları sırala.', [
      ['Ani en şiddetli baş ağrısı ve meningeal irritasyonu subaraknoid kanama lehine değerlendir', 'Thunderclap baş ağrısı SAH için kritik uyarıdır.'],
      ['Kontrastsız beyin BT ile akut kanamayı araştır; şüphe sürerse LP/BT anjiyografi planla', 'Erken BT duyarlıdır; negatifse klinik şüpheye göre ek test gerekir.'],
      ['Kan basıncı, ağrı, bulantı ve nörolojik durumu yakın izle', 'Yeniden kanama ve bilinç kötüleşmesi erken dönemde fatal olabilir.'],
      ['Anevrizma saptanırsa nöroşirürji/girişimsel nöroradyoloji ile klipleme veya koilleme planla', 'Definitif tedavi kanama kaynağını kapatmaktır.'],
      ['Nimodipin ve vazospazm izlemini başlat', 'Nimodipin gecikmiş serebral iskemi riskini azaltır.'],
      ['Hidrosefali, nöbet ve yoğun bakım gereksinimini değerlendir', 'SAH komplikasyonları hedefe yönelik izlem gerektirir.'],
    ], [
      ['Anevrizma dışlanmadan antikoagülasyon başla', 'Kanama kaynağı kontrol edilmeden antikoagülasyon yeniden kanama riskini artırır.', true],
      ['Tipik thunderclap baş ağrısında yalnız analjezik verip taburcu et', 'SAH dışlanmadan güvenli taburculuk uygun değildir.', true],
      ['Nimodipini yalnız vazospazm gelişince düşün', 'Nimodipin SAH sonrası profilaktik olarak erken başlanır.', false],
    ]);
  },
  ms(c) {
    return makeSequence(c.id, 'Multipl skleroz atağı yönetim sırası', 'Demiyelinizan atakta tanı doğrulama, atak tedavisi ve uzun dönem planı sırala.', [
      ['Nörolojik defisitin zaman içinde yayılım ve mekânda yayılım kriterlerini destekleyip desteklemediğini değerlendir', 'MS tanısında klinik ve görüntüleme ile dissemine tutulum gösterilir.'],
      ['MR bulguları ve gerekirse BOS oligoklonal bant ile demiyelinizasyonu destekle', 'Tanı başka nedenler dışlandıktan sonra objektif bulgularla güçlenir.'],
      ['Fonksiyonel kayıp yaratan akut atakta yüksek doz intravenöz metilprednizolon başla', 'Steroid atak süresini kısaltır; hastalık modifiye edici tedavinin yerine geçmez.'],
      ['Steroid yanıtsız ağır atakta plazmaferez gereksinimini değerlendir', 'Refrakter atakta immün aracılı inflamasyonu azaltmak için plazmaferez kullanılabilir.'],
      ['Hastalık modifiye edici tedaviyi atak sıklığı, MR yükü ve hasta özelliklerine göre planla', 'Uzun dönem hedef yeni atak ve özürlülük birikimini azaltmaktır.'],
      ['Enfeksiyon, gebelik, aşı ve rehabilitasyon gereksinimini izlem planına ekle', 'MS yönetimi yalnız akut ataktan ibaret değildir.'],
    ], [
      ['Tipik atakta antibiyotiği ilk tedavi olarak başla', 'Enfeksiyon yoksa MS atağında antibiyotik tedavisi uygun değildir.', true],
      ['Tek bir MR plağıyla kesin MS tanısı koy', 'MS tanısı yayılım kriterleri ve ayırıcı tanı dışlanması gerektirir.', false],
      ['Steroid sonrası uzun dönem hastalık modifiye tedavi değerlendirmesini atla', 'Atak tedavisi hastalığın uzun dönem seyrini tek başına kontrol etmez.', false],
    ]);
  },
  cvst(c) {
    return makeSequence(c.id, 'Serebral venöz sinüs trombozu yönetim sırası', 'Lohusalıkta trombotik nörolojik acili yönetme basamaklarını sırala.', [
      ['Lohusalık, progresif baş ağrısı ve nöbet birlikteliğinde venöz sinüs trombozunu düşün', 'Hiperkoagülabilite ve atipik baş ağrısı CVST için güçlü ipucudur.'],
      ['MR venografi veya BT venografi ile venöz sinüs oklüzyonunu doğrula', 'Tanı venöz sistem görüntülemesiyle konur.'],
      ['İntrakraniyal kanama eşlik etse bile kontrendikasyon yoksa antikoagülasyon başla', 'CVST’de tedavinin temeli trombüs progresyonunu durdurmaktır.'],
      ['Nöbet varsa antiepileptik tedavi ve intrakraniyal basınç yönetimini planla', 'Nöbet ve basınç artışı morbiditeyi artırır.'],
      ['Gebelik/lohusalığa uygun antikoagülan seçimini ve tedavi süresini belirle', 'Tedavi süresi provoke edici faktör ve risk durumuna göre planlanır.'],
      ['Trombofili ve sekonder nedenleri akut dönem sonrası uygun zamanda değerlendir', 'Altta yatan riskin saptanması nüks önleme stratejisini belirler.'],
    ], [
      ['Venöz trombozu kanama riski nedeniyle tamamen antikoagülasyonsuz izle', 'CVST’de kanama eşlik edebilse de tedavi çoğu hastada antikoagülasyondur.', true],
      ['Sadece migren tedavisi verip görüntüleme yapma', 'Lohusalıkta progresif baş ağrısı ve nöbet ciddi sekonder neden gerektirir.', true],
      ['Trombofili testlerini akut antikoagülasyon kararından önce bekle', 'Akut tedavi klinik/görüntüleme tanısıyla gecikmeden başlanmalıdır.', false],
    ]);
  },
};

function genericDiagnosticSequence(c, options = {}) {
  const diagnosis = c.diagnosis?.correct || c.clinicalFocus || 'klinik tablo';
  const setting = c.setting || 'klinik değerlendirme';
  const isSpot = c.caseType === 'spot' || c.branchId === 'tus-spot-olgular';
  const short = isSpot;
  const required = [
    [`${diagnosis} için karar verdirici öykü ve muayene ipuçlarını birlikte tanı`, `Bu olgunun öğrenme hedefi ${diagnosis} ile uyumlu klinik örüntüyü doğru yakalamaktır.`],
    [`Gerekiyorsa yalnız tanıyı değiştirecek hedef tetkiki seç`, 'Spot veya odaklı olgularda gereksiz panel yerine karar noktasına katkı sağlayan test istenir.'],
    [`Yanlış çeldiricileri ${setting} bağlamında dışla`, 'Benzer tablolar ayırt edici ipuçları üzerinden elenir; rastgele geniş tedavi başlanmaz.'],
  ];
  if (!short) {
    required.push(
      [`${diagnosis} için ilk basamak tedavi veya yönlendirme kararını ver`, 'Yönetim tanı olasılığı, aciliyet ve hedef organ riskiyle uyumlu olmalıdır.'],
      ['Takipte klinik yanıtı ve komplikasyon gelişimini hedefe yönelik izle', 'İzlem tanı doğruluğunu ve tedavi güvenliğini yeniden değerlendirir.'],
    );
  }
  return makeSequence(c.id, short ? `TUS spot ${diagnosis} yaklaşım sırası` : `${diagnosis} vaka özel yönetim sırası`, short ? 'Bu spot olguda doğru karar noktasını gereksiz işlem eklemeden sırala.' : 'Vaka özel tanı ve yönetim önceliklerini sırala.', required, [
    ['Tanıyla ilgisiz rutin geniş tetkik paneli ekle', 'Gereksiz tetkik spot karar mantığını bulanıklaştırır ve klinik önceliği öğretmez.', false],
    ['Karar verdirici ipucunu göz ardı edip rastgele tedavi başla', 'Tedavi klinik örüntü ve objektif verilerle ilişkilendirilmelidir.', true],
    ['Stabilite veya kırmızı bayrakları değerlendirmeden ayaktan izlem öner', 'Acil uyarı bulguları dışlanmadan güvenli izlem kararı verilmez.', true],
  ], { showInSpot: isSpot, ...options });
}

function pediatricGI(c, diagnosis) {
  return makeSequence(c.id, `${diagnosis} yönetim sırası`, 'Pediatrik akut batında stabilizasyon ve doğru girişim zamanlamasını sırala.', [
    ['Yaşa özgü dehidratasyon, ağrı paterni ve kusma özelliklerini değerlendir', 'Süt çocuğunda klinik bozulma hızlı gelişebilir ve öykü paternleri tanısal ipucu sağlar.'],
    ['Sıvı-elektrolit dengesini ve beslenme kesintisini güvenli şekilde düzenle', 'Kusma ve obstrüksiyon tablolarında dehidratasyon/alkaloz riski önceliklidir.'],
    ['Hedef görüntüleme ile tanıyı doğrula', 'Ultrasonografi veya uygun grafi gereksiz tetkik kalabalığı olmadan tanıyı destekler.'],
    [`${diagnosis} için definitif girişim veya cerrahi konsültasyon kararını ver`, 'Tedavi seçimi obstrüksiyonun nedeni ve komplikasyon varlığına göre değişir.'],
    ['Aileyi uyarı bulguları ve işlem sonrası takip konusunda bilgilendir', 'Pediatrik olgularda güvenli izlem aile eğitimiyle tamamlanır.'],
  ], [
    ['Safralı kusmayı basit reflü kabul ederek taburcu et', 'Safralı kusma obstrüksiyon açısından kırmızı bayraktır.', true],
    ['Sıvı-elektrolit açığını düzeltmeden girişime gönder', 'Pediatrik hastada işlem öncesi güvenli stabilizasyon gerekir.', true],
    ['Tanıyı destekleyen görüntülemeyi tamamen ertele', 'Akut cerrahi olasılıkta hedef görüntüleme yönetimi hızlandırır.', false],
  ]);
}

function forensicSeq(c) {
  return makeSequence(c.id, 'Tıbbi-adli yaklaşım sırası', 'Tıbbi önceliği koruyarak kayıt, bildirim ve güvenlik basamaklarını sırala.', [
    ['Hastanın vital stabilitesini ve acil müdahale gereksinimini değerlendir', 'Adli olgu olması tıbbi stabilizasyon önceliğini ortadan kaldırmaz.'],
    ['Gerekli tıbbi tedaviyi gecikmeden başlat', 'Adli süreç hiçbir şekilde hayat kurtarıcı veya gerekli tedaviyi geciktirmemelidir.'],
    ['Yaralanma/olay bulgularını objektif, ayrıntılı ve zaman bilgisiyle kaydet', 'Kayıtlar hem hasta güvenliği hem de adli süreç için temel belgedir.'],
    ['Adli bildirim veya ilgili koruyucu bildirim yükümlülüğünü yerine getir', 'Hekim adli olgu şüphesinde yalnız hastanın beyanıyla yetinemez.'],
    ['Delil niteliği taşıyabilecek materyali ve mahremiyeti koruyarak süreci sürdür', 'Delil zinciri, güvenlik ve mahremiyet adli-tıbbi yaklaşımın ayrılmaz parçasıdır.'],
  ], [
    ['Adli süreç tamamlanana kadar tıbbi müdahaleyi ertele', 'Adli işlemler tedaviyi geciktiremez; önce hasta güvenliği sağlanır.', true],
    ['Hasta istemezse objektif muayene kaydı tutma', 'Adli nitelik taşıyan bulgular tıbbi kayıtta objektif olarak yer almalıdır.', true],
    ['Yaralanmayı yalnız sözlü anlatıma göre değerlendir', 'Hekim fizik bulguları, tutarlılığı ve güvenlik riskini bağımsız değerlendirmelidir.', false],
  ], { showInSpot: true });
}

function allergySeq(c, anaphylaxis = false) {
  if (anaphylaxis) {
    return makeSequence(c.id, 'Anafilaksi yönetim sırası', 'Mortaliteyi azaltan ilk tedaviyi destek basamaklarından ayırarak sırala.', [
      ['Hipotansiyon, ürtiker, bronkospazm veya çoklu sistem tutulumunu anafilaksi lehine hızla tanı', 'Anafilaksi klinik tanıdır; laboratuvar sonucu beklenmez.'],
      ['Tetikleyici ilaç veya gıda maruziyetini hemen durdur', 'Devam eden maruziyet reaksiyonun ağırlaşmasına yol açabilir.'],
      ['İlk tedavi olarak intramüsküler adrenalin uygula', 'Anafilakside mortaliteyi azaltan ana tedavi adrenalindir.'],
      ['Hastayı yatır, oksijen, damar yolu ve izotonik sıvı desteği sağla', 'Hipotansiyon ve solunum sistemi tutulumu dolaşım/solunum desteği gerektirir.'],
      ['Bronkospazm varsa inhale beta-2 agonist; antihistaminik ve steroidleri destek tedavi olarak ekle', 'Bu ilaçlar adrenalinin yerine geçmez, semptom kontrolüne yardımcı olur.'],
      ['Bifazik reaksiyon riski nedeniyle klinik izlem planla', 'Semptomlar düzelse bile ikinci faz reaksiyon görülebilir.'],
    ], [
      ['Adrenalini yalnız antihistaminik ve steroid başarısız olursa uygula', 'Adrenalin geciktirilmemesi gereken ilk tedavidir.', true],
      ['Hipotansiyon varken oral antihistaminikle taburcu et', 'Sistemik tutulum ve hipotansiyon acil izlem ve parenteral tedavi gerektirir.', true],
      ['Serum triptaz sonucunu bekleyip tedaviye sonra başla', 'Anafilaksi tedavisi klinik tanı ile hemen başlar.', true],
    ], { showInSpot: c.branchId === 'tus-spot-olgular' });
  }
  return makeSequence(c.id, 'Akut ürtiker/anjiyoödem yaklaşım sırası', 'Anafilaksi bulgusu olmayan alerjik reaksiyonda güvenli kısa yönetimi sırala.', [
    ['Solunum sıkıntısı, hipotansiyon, stridor, wheezing ve bilinç değişikliğini özellikle sorgula', 'Anafilaksi dışlanmadan basit ürtiker gibi yönetmek güvenli değildir.'],
    ['Tetikleyici gıda/ilaç maruziyetini durdur ve tekrar maruziyetten kaçınma öner', 'Tetikleyiciden uzaklaşmak reaksiyonun sürmesini önler.'],
    ['Anafilaksi bulgusu yoksa antihistaminik tedavi ve kısa klinik izlem uygula', 'Basit akut ürtikerde semptomatik tedavi yeterli olabilir.'],
    ['Kötüleşme, solunum bulgusu veya hipotansiyon gelişirse IM adrenalin eşiğini düşük tut', 'Klinik tablo çoklu sistem tutulumuna ilerlerse yönetim anafilaksiye döner.'],
  ], [
    ['Hipotansiyon veya wheezing gelişirse yine yalnız oral antihistaminik ver', 'Sistemik tutulum anafilaksi kabul edilip adrenalin gerektirir.', true],
    ['Her akut ürtiker olgusuna geniş spektrumlu antibiyotik başla', 'Enfeksiyon bulgusu yoksa antibiyotik alerjik reaksiyon tedavisi değildir.', false],
    ['Dudak ödemi varken havayolu riskini hiç değerlendirme', 'Anjiyoödemde havayolu kötüleşmesi izlenmelidir.', true],
  ], { showInSpot: c.branchId === 'tus-spot-olgular' });
}

function hyperkalemiaSeq(c) {
  return makeSequence(c.id, 'Hiperpotasemi yönetim sırası', 'EKG değişikliği olan hiperpotasemide membran stabilizasyonunu ilk sıraya yerleştir.', [
    ['EKG değişiklikleriyle birlikte hayatı tehdit eden hiperpotasemiyi tanı', 'Sivri T, QRS genişlemesi veya P silikleşmesi acil kardiyak risk göstergesidir.'],
    ['Kardiyak membran stabilizasyonu için intravenöz kalsiyum glukonat uygula', 'Kalsiyum potasyumu düşürmez ama ölümcül aritmi riskini hızla azaltır.'],
    ['Potasyumu hücre içine kaydırmak için intravenöz insülin ve dekstroz ver', 'İnsülin-dekstroz serum potasyumunu geçici olarak düşürür.'],
    ['Gerekliyse beta-2 agonist veya sodyum bikarbonat desteğini klinik bağlama göre değerlendir', 'Ek hücre içi kaydırma seçenekleri asidoz ve klinik duruma göre seçilir.'],
    ['Potasyumu vücuttan uzaklaştırmak için hemodiyaliz veya bağlayıcı seçeneklerini planla', 'Geçici kaydırma tedavisi potasyumu vücuttan atmaz; kalıcı uzaklaştırma gerekir.'],
    ['EKG ve serum potasyumunu yakın izle, altta yatan böbrek yetmezliği/ilaç nedenlerini düzelt', 'Nüks riski neden ortadan kaldırılana kadar sürer.'],
  ], [
    ['EKG değişikliği varken yalnız potasyum bağlayıcı reçete et', 'Bağlayıcılar yavaş etkilidir; EKG değişikliğinde önce IV kalsiyum gerekir.', true],
    ['Kalsiyum glukonatı insülin-dekstrozdan sonraya ertele', 'EKG değişikliği olan hastada membran stabilizasyonu ilk basamaktır.', true],
    ['EKG izlemi yapmadan taburcu et', 'Hiperpotasemi ölümcül aritmi riski nedeniyle yakın izlem gerektirir.', true],
  ], { showInSpot: c.branchId === 'tus-spot-olgular' });
}

function tbContactSeq(c) {
  return makeSequence(c.id, 'Tüberküloz temaslı yönetim sırası', 'Aktif hastalığı dışlayıp latent enfeksiyon profilaksisini doğru sırala.', [
    ['Aktif akciğer tüberkülozu olan kişiyle yakın temas öyküsünü doğrula', 'Ev içi temas bulaş riski açısından yüksek kabul edilir.'],
    ['Semptom sorgulaması ve akciğer grafisi ile aktif hastalığı dışla', 'Profilaksi başlamadan önce aktif TB tedavi gereksinimi değerlendirilmelidir.'],
    ['PPD veya IGRA sonucunu önceki değer ve BCG öyküsüyle birlikte yorumla', 'PPD dönüşümü BCG’den bağımsız yeni enfeksiyon lehine olabilir.'],
    ['Aktif hastalık dışlandıktan sonra latent TB enfeksiyonu için izoniyazid profilaksisi başla', 'Yakın temaslıda profilaksi aktif hastalık gelişme riskini azaltır.'],
    ['Hepatotoksisite, ilaç uyumu ve aktif hastalık semptomları açısından takip planla', 'Profilaksi güvenliği ve etkinliği düzenli izlem gerektirir.'],
  ], [
    ['BCG aşısı olduğu için PPD dönüşümünü tamamen önemsiz kabul et', 'Belirgin PPD artışı temas sonrası latent enfeksiyon lehine yorumlanır.', true],
    ['Aktif hastalık bulgusu yokken standart dörtlü tedaviyi rutin başla', 'Dörtlü tedavi aktif TB için kullanılır; latent enfeksiyonda profilaksi gerekir.', true],
    ['Profilaksi yerine yalnız aylık akciğer grafisi ile izle', 'Aktif hastalık dışlanmış PPD dönüşümünde koruyucu tedavi gereklidir.', false],
  ], { showInSpot: true });
}

function pityriasisSeq(c) {
  return makeSequence(c.id, 'Pityriasis rosea yaklaşım sırası', 'Klinik tanı ve semptomatik tedavi dengesini gereksiz işlem eklemeden sırala.', [
    ['Herald patch ve gövde-proksimal ekstremite dağılımını tanı', 'Tipik başlangıç plağı ve dağılım tanı için en yüksek verimli ipuçlarıdır.'],
    ['Klinik görünüm tipikse tanıyı öncelikle klinik olarak koy', 'Pityriasis rosea çoğu olguda biyopsi veya geniş laboratuvar gerektirmez.'],
    ['Kaşıntı varsa antihistaminik veya hafif topikal kortikosteroid öner', 'Tedavi çoğunlukla semptom kontrolüne yöneliktir.'],
    ['Kendini sınırlayan seyir ve beklenen düzelme süresi hakkında bilgilendir', 'Hastayı gereksiz antibiyotik/antifungal beklentisinden uzaklaştırır.'],
    ['Atipik, mukozal, yaygın veya uzun süren olguda ayırıcı tanıları değerlendir', 'Sifiliz, ilaç döküntüsü veya dermatofitoz gibi durumlar tipik olmayan seyirde düşünülür.'],
  ], [
    ['Tipik olguda rutin sistemik antifungal başla', 'Pityriasis rosea dermatofit enfeksiyonu değildir.', true],
    ['Her hastaya deri biyopsisi yap', 'Tipik klinik tabloda biyopsi ilk basamak değildir.', false],
    ['Geniş spektrumlu antibiyotik tedavisi başla', 'Bakteriyel enfeksiyon bulgusu yoksa antibiyotik gereksizdir.', true],
  ], { showInSpot: c.branchId === 'tus-spot-olgular' });
}

function sleSeq(c) {
  return makeSequence(c.id, 'SLE aktivite ve organ tutulumu yönetim sırası', 'Klinik aktiviteyi seroloji ve renal tarama ile ilişkilendirerek tedavi önceliğini sırala.', [
    ['Malar döküntü, artrit, serozit veya ödem gibi klinik aktivite bulgularını sistemik tutulum açısından değerlendir', 'SLE’de tedavi şiddeti organ tutulumu ve aktivite düzeyine göre belirlenir.'],
    ['Anti-dsDNA ve kompleman düzeylerini hastalık aktivite takibinde kullan', 'Anti-dsDNA artışı ve C3/C4 düşüklüğü aktivasyon ve nefrit riskiyle ilişkilidir.'],
    ['İdrar analizi, proteinüri ve böbrek fonksiyonu ile renal tutulumu tara', 'Proteinüri/hematüri lupus nefriti açısından yönetimi değiştirir.'],
    ['Organ tutulumunun şiddetine göre kortikosteroid ve immünsupresif tedaviyi planla', 'Hafif mukokutanöz-eklem tutulumu ile renal/CNS tutulum aynı tedaviyi gerektirmez.'],
    ['Kontrendikasyon yoksa hidroksiklorokini temel tedavi olarak sürdür', 'Hidroksiklorokin alevlenme riskini azaltır ve uzun dönem koruyucu etki sağlar.'],
    ['Renal tutulum şüphesinde nefroloji değerlendirmesi ve gerekirse böbrek biyopsisi planla', 'Nefrit sınıfı immünsupresyon seçimini belirler.'],
  ], [
    ['ANA titresini hastalık aktivitesinin ana takip belirteci kabul et', 'ANA tanısal taramada değerlidir; aktivite takibinde anti-dsDNA ve kompleman daha kullanışlıdır.', true],
    ['Proteinüri varken renal değerlendirmeyi ertele', 'Proteinüri lupus nefriti açısından erken değerlendirme gerektirir.', true],
    ['Anti-Sm düzeyini aktivite izleminde temel marker olarak kullan', 'Anti-Sm özgüllüğü yüksek olabilir ancak aktivite takibinde temel marker değildir.', false],
  ], { showInSpot: c.branchId === 'tus-spot-olgular' });
}

function collesSeq(c) {
  return makeSequence(c.id, 'Colles kırığı yönetim sırası', 'Distal radius kırığında nörovasküler güvenlik ve immobilizasyon kararını sırala.', [
    ['Düşme mekanizması, distal radius hassasiyeti ve çatal sırtı deformitesini kırık lehine değerlendir', 'Klinik mekanizma ve deformite distal radius kırığı için güçlü ipucudur.'],
    ['El bileği ön-arka ve yan grafileriyle kırığı ve deplasmanı doğrula', 'Tedavi kararı kırık hattı ve hizalanmaya göre verilir.'],
    ['Median sinir fonksiyonu, distal dolaşım ve parmak hareketlerini belgeleyerek nörovasküler muayene yap', 'Kırık yönetiminde nörovasküler durum acil konsültasyon gereksinimini belirler.'],
    ['Deplasman durumuna göre kapalı redüksiyon ve immobilizasyon planla', 'Stabil/hizalı kırıklarda alçı; deplase kırıkta redüksiyon gerekir.'],
    ['Redüksiyon sonrası kontrol grafisiyle hizalanmayı değerlendir', 'Yetersiz redüksiyon fonksiyon kaybına ve malunion riskine yol açabilir.'],
    ['Açık kırık, nörovasküler bozukluk veya instabil kırık varsa ortopedi konsültasyonu iste', 'Komplike kırıklar cerrahi değerlendirme gerektirir.'],
  ], [
    ['Grafi çekmeden yalnız ağrı kesiciyle taburcu et', 'Deformite ve hassasiyet kırığın görüntüleme ile doğrulanmasını gerektirir.', true],
    ['Nörovasküler muayeneyi atla', 'Median sinir ve distal dolaşım değerlendirmesi hasta güvenliği için zorunludur.', true],
    ['Açık kırıkta elektif poliklinik kontrolü öner', 'Açık kırık acil ortopedik değerlendirme ve enfeksiyon profilaksisi gerektirir.', true],
  ], { showInSpot: c.branchId === 'tus-spot-olgular' });
}

function infectionSeq(c, label = 'enfeksiyon') {
  return makeSequence(c.id, `${label} yönetim sırası`, 'Enfeksiyon odağına özel tanı, izolasyon ve tedavi basamaklarını sırala.', [
    ['Hastalık odağını ve bulaş/komplikasyon riskini klinik bulgularla sınıfla', 'Her enfeksiyon aynı sepsis algoritmasıyla değil, odağı ve riskine göre yönetilir.'],
    ['Tedaviyi geciktirmeyecek şekilde hedef mikrobiyolojik örneği al', 'Örnekler gereksiz panel yerine tanı ve daraltma kararını desteklemelidir.'],
    ['Klinik şiddet ve olası etkene uygun hedef ampirik veya özgül tedaviyi başla', 'Tedavi seçiminde odak, yaş, immün durum ve lokal direnç dikkate alınır.'],
    ['Gerekli izolasyon veya temaslı yönetimini hastalığın bulaş yoluna göre uygula', 'TB, menenjit veya döküntülü hastalıklarda enfeksiyon kontrolü tedavinin parçasıdır.'],
    ['Mikrobiyolojik sonuç ve klinik yanıta göre tedaviyi daralt, değiştir veya süresini belirle', 'Antimikrobiyal yönetim gereksiz geniş spektrumu azaltır.'],
  ], [
    ['Bulaş yolu farklı olsa da her hastaya aynı izolasyon önlemini uygula', 'İzolasyon damlacık, temas veya hava yolu bulaşına göre seçilmelidir.', false],
    ['Ağır enfeksiyon bulgularında tedaviyi kültür sonucu çıkana kadar tamamen beklet', 'Klinik ağır seyirde tedavi mikrobiyolojik sonuç beklenerek geciktirilmez.', true],
    ['Kaynak veya odak değerlendirmesini gereksiz kabul et', 'Odağın bilinmesi tedavi seçimini ve kaynak kontrolünü belirler.', true],
  ]);
}

function surgicalSeq(c, diagnosis) {
  return makeSequence(c.id, `${diagnosis} yönetim sırası`, 'Akut cerrahi karında tanı doğrulama, destek ve zamanlama kararını sırala.', [
    ['Ağrı migrasyonu, lokal periton bulgusu veya obstrüksiyon bulgularını klinik öncelikle değerlendir', 'Cerrahi akut karında fizik muayene tedavi zamanlamasını etkiler.'],
    ['Oral alımı kes, damar yolu ve sıvı-elektrolit desteğini başlat', 'Cerrahi girişim olasılığında aspirasyon ve dehidratasyon riski azaltılır.'],
    ['Hedef laboratuvar/görüntüleme ile tanıyı doğrula ve komplikasyon varlığını araştır', 'Görüntüleme seçimi şüpheli patolojiye göre yapılır; gereksiz tetkik eklenmez.'],
    ['Cerrahi konsültasyonla operasyon veya konservatif tedavi kararını ver', 'Akut cerrahi tabloda zamanlama morbiditeyi belirler.'],
    ['Endikasyon varsa uygun antibiyotik ve ağrı kontrolünü başla', 'Antibiyotik perforasyon, gangren, kolanjit veya komplike inflamasyonda hedefe yöneliktir.'],
    ['Klinik kötüleşme, peritonit ve sepsis bulgularını yakın izle', 'Başlangıçta sınırlı tablo komplikasyona ilerleyebilir.'],
  ], [
    ['Periton bulgusu varken yalnız oral analjezikle taburcu et', 'Peritonit veya komplikasyon şüphesinde ayaktan izlem güvenli değildir.', true],
    ['Cerrahi değerlendirmeyi görüntüleme sonucu olmadan her durumda ertele', 'Klinik peritonit varsa cerrahi karar geciktirilmemelidir.', true],
    ['Antibiyotiği her karın ağrısında tanıdan bağımsız rutin ver', 'Antibiyotik endikasyona göre seçilir; tanısal belirsizliği örtmemelidir.', false],
  ]);
}

function orthoSeq(c, diagnosis) {
  if (/skafoid/.test(pool(c))) {
    return makeSequence(c.id, 'Skafoid kırığı yönetim sırası', 'Grafi normal olsa bile klinik şüphede güvenli immobilizasyonu sırala.', [
      ['FOOSH mekanizması ve anatomik enfiye çukuru hassasiyetini skafoid kırığı lehine değerlendir', 'Skafoid kırığı erken grafide görünmeyebilir; muayene kritik ipucudur.'],
      ['El bileği/skafoid grafilerini iste ve başlangıç görüntüsünü yorumla', 'Grafi kırığı gösterebilir ancak negatif grafi tanıyı dışlamaz.'],
      ['Klinik şüphe yüksekse başparmak spika atel/alçı ile immobilize et', 'Avasküler nekroz ve kaynamama riskini azaltmak için şüpheli kırık korunur.'],
      ['10-14 gün sonra kontrol grafisi veya erken MR/BT planla', 'Gecikmiş görüntüleme okült kırığı ortaya koyabilir.'],
      ['Deplase/proksimal kırık veya nörovasküler sorun varsa ortopedi konsültasyonu iste', 'Komplike skafoid kırıkları cerrahi değerlendirme gerektirebilir.'],
    ], [
      ['İlk grafi normal diye atelsiz taburcu et', 'Skafoid kırığı ilk grafide kaçabilir; klinik şüphe immobilizasyon gerektirir.', true],
      ['Enfiye çukuru hassasiyetini yumuşak doku ezilmesi kabul edip takip etme', 'Bu bulgu skafoid kırığı için yüksek değerli muayene ipucudur.', true],
      ['Her hastaya acil cerrahi planla', 'Cerrahi karar kırığın yeri, deplasmanı ve stabilitesine göre verilir.', false],
    ]);
  }
  return makeSequence(c.id, `${diagnosis} yönetim sırası`, 'Travma sonrası kırık/çıkıkta nörovasküler güvenlik ve definitif tedaviyi sırala.', [
    ['Travma mekanizması, deformite, ağrı ve fonksiyon kaybını sistematik değerlendir', 'Mekanizma kırık/çıkık tipini ve eşlik eden yaralanma riskini belirler.'],
    ['Nörovasküler muayeneyi redüksiyon veya immobilizasyon öncesi belgeleyip tekrar et', 'Sinir-damar hasarı tedavi aciliyetini değiştirir ve medikolegal açıdan önemlidir.'],
    ['Uygun grafilerle yaralanmanın tipini doğrula', 'Direkt grafi kırık/çıkık yönü ve tedavi planı için temel yöntemdir.'],
    ['Ağrı kontrolü sağla ve yaralanmaya uygun redüksiyon/immobilizasyon planla', 'Erken immobilizasyon ağrı, yumuşak doku hasarı ve ek yaralanmayı azaltır.'],
    ['Açık kırık, instabilite, femur boyun kırığı veya nörovasküler bozuklukta ortopedi konsültasyonu iste', 'Bu durumlar acil cerrahi veya ileri tedavi gerektirebilir.'],
    ['Kontrol grafisi, komplikasyon izlemi ve rehabilitasyon/takip planını düzenle', 'Malunion, avasküler nekroz veya donukluk gibi komplikasyonlar önlenmelidir.'],
  ], [
    ['Nörovasküler muayene yapmadan redüksiyon uygula', 'Sinir-damar durumu tedavi öncesi ve sonrası belgelenmelidir.', true],
    ['Belirgin deformitede grafi çekmeden taburcu et', 'Deformite kırık/çıkık açısından görüntüleme gerektirir.', true],
    ['Açık kırığı elektif poliklinik kontrolüne bırak', 'Açık kırık acil ortopedik değerlendirme ve enfeksiyon profilaksisi gerektirir.', true],
  ]);
}

function pediatricSeq(c, diagnosis) {
  return makeSequence(c.id, `${diagnosis} pediatrik yönetim sırası`, 'Çocuk hastada yaşa özgü aciliyet ve aile-takip planını sırala.', [
    ['Yaşa göre genel durum, beslenme, hidrasyon ve kırmızı bayrak bulgularını değerlendir', 'Çocuklarda klinik kötüleşme hızlı ve sessiz ilerleyebilir.'],
    [`${diagnosis} için ayırt ettirici öykü ve muayene ipuçlarını belirle`, 'Pediatrik olguda tanı çoğu zaman yaşa özgü paternlerle konur.'],
    ['Gerekiyorsa yalnız tanıyı veya tedavi kararını değiştirecek hedef tetkiki iste', 'Gereksiz tetkik çocukta yük oluşturur ve karar kalitesini artırmaz.'],
    [`${diagnosis} için yaşa uygun tedavi veya konsültasyon kararını ver`, 'Doz, güvenlik ve komplikasyon riski pediatrik yaşa göre planlanır.'],
    ['Aileye uyarı bulguları, takip ve tekrar başvuru koşullarını açıkla', 'Aile eğitimi güvenli pediatrik yönetimin temel parçasıdır.'],
  ], [
    ['Çocuğu erişkin dozlarıyla tedavi et', 'Pediatrik tedavide doz ve güvenlik yaş/kilo ile uyumlu olmalıdır.', true],
    ['Beslenme ve hidrasyon durumunu değerlendirmeden taburcu et', 'Çocuklarda hidrasyon ve beslenme klinik güvenliği belirler.', true],
    ['Tüm çocuk hastalara aynı geniş laboratuvar panelini iste', 'Tetkikler klinik karar noktasına göre seçilmelidir.', false],
  ]);
}

function metabolicSeq(c, diagnosis) {
  return makeSequence(c.id, `${diagnosis} metabolik yaklaşım sırası`, 'Metabolik hastalıkta akut güvenlik, tetikleyici besin ve uzun dönem danışmanlığı sırala.', [
    ['Beslenme ilişkisi, açlık/ek gıda tetiklenmesi ve nörolojik-hepatik bulguları birlikte değerlendir', 'Doğuştan metabolizma hastalıklarında öyküdeki besin-zaman ilişkisi çok değerlidir.'],
    ['Akut hipoglisemi, asidoz, hiperamonyemi veya dehidratasyon varsa hızla düzelt', 'Metabolik krizlerde önce beyin ve dolaşım güvenliği sağlanır.'],
    ['Tanıyı destekleyen hedef metabolit veya enzim/genetik testi seç', 'Geniş rastgele panel yerine karar verdirici biyokimyasal testler kullanılır.'],
    ['Sorumlu substratı diyetten uzaklaştır ve güvenli kalori desteği sağla', 'Katabolizmayı ve toksik ara ürün birikimini azaltmak tedavinin temelidir.'],
    ['Aileye genetik danışmanlık, kriz planı ve uzun dönem izlem düzenle', 'Akrabalık ve tekrarlama riski nedeniyle aile bazlı yönetim gerekir.'],
  ], [
    ['Metabolik kriz bulgusunda beslenmeyi tamamen kesip kalori desteği verme', 'Katabolizma toksik metabolit birikimini artırabilir.', true],
    ['Ek gıda ile tetiklenen tabloyu basit gastroenterit kabul ederek izlem dışı bırak', 'Tetikleyici besin ilişkisi metabolik hastalık açısından kritiktir.', true],
    ['Genetik danışmanlığı yalnız erişkin döneme ertele', 'Aile tekrarlama riski ve erken tanı için danışmanlık erken verilmelidir.', false],
  ]);
}

function rheumSeq(c, diagnosis) {
  if (/lupus|sle|sistemik lupus/.test(pool(c))) return sleSeq(c);
  if (/sjögren|sjogren/.test(pool(c))) {
    return makeSequence(c.id, 'Sjögren sendromu yönetim sırası', 'Sikka bulgularından sistemik tutulum ve lenfoma riskine kadar yaklaşımı sırala.', [
      ['Göz-ağız kuruluğu, parotis büyümesi ve ekstraglandüler bulguları birlikte değerlendir', 'Sjögren yalnız lokal kuruluk değil sistemik hastalık olabilir.'],
      ['Schirmer testi, oküler boyama ve tükürük bezi değerlendirmesiyle objektif kuruluğu destekle', 'Sikka semptomları objektif testlerle doğrulanmalıdır.'],
      ['Anti-Ro/SSA, Anti-La/SSB ve eşlik eden otoimmün hastalıkları değerlendir', 'Seroloji tanıyı destekler ve fenotipi belirler.'],
      ['Semptomatik kuruluk için yapay gözyaşı, ağız bakımı ve gerekirse sekretagog tedavi planla', 'Tedavi yaşam kalitesi ve komplikasyon önlemeye yöneliktir.'],
      ['Purpura, kalıcı parotis büyümesi, lenfadenopati veya proteinüri varsa sistemik/lenfoproliferatif tutulum açısından araştır', 'Sjögren lenfoma ve renal tutulum riski taşıyabilir.'],
    ], [
      ['Kuruluk yakınmalarını yalnız yaşlanmaya bağlayıp objektif test yapma', 'Sikka semptomları otoimmün hastalık belirtisi olabilir.', false],
      ['Kalıcı parotis büyümesini izlem dışı bırak', 'Kalıcı bez büyümesi lenfoma riski açısından değerlendirilmelidir.', true],
      ['Her hastaya yüksek doz sistemik steroid başla', 'Sistemik immünsupresyon organ tutulumu varsa düşünülür; kurulukta rutin değildir.', true],
    ]);
  }
  if (/romatoid|rheumatoid/.test(pool(c))) {
    return makeSequence(c.id, 'Romatoid artrit yönetim sırası', 'Erken inflamatuvar artritte tanı, DMARD ve izlem hedefini sırala.', [
      ['Sabah tutukluğu, simetrik küçük eklem şişliği ve hareket kısıtlılığını inflamatuvar artrit lehine değerlendir', 'RA’da erken klinik örüntü tanı ve tedavi gecikmesini önler.'],
      ['RF, anti-CCP, akut faz ve eklem görüntülemelerini tanıyı desteklemek için kullan', 'Anti-CCP özgüllüğü ve erozyon riski açısından değerlidir.'],
      ['Erken dönemde metotreksat temelli DMARD tedavisi planla', 'RA’da erken DMARD eklem hasarını ve fonksiyon kaybını azaltır.'],
      ['Kısa süreli düşük doz steroid/NSAİİ ile köprü semptom kontrolünü değerlendir', 'Semptom kontrolü DMARD etkisi başlayana kadar destek sağlar.'],
      ['Treat-to-target yaklaşımıyla hastalık aktivitesi ve yan etkileri düzenli izle', 'Tedavi hedefi remisyon veya düşük hastalık aktivitesidir.'],
    ], [
      ['Erozyon gelişene kadar DMARD tedavisini ertele', 'RA’da tedaviyi ertelemek kalıcı eklem hasarı riskini artırır.', true],
      ['Anti-CCP pozitifliğini klinikle ilişkilendirmeden tek başına tedavi kararı yap', 'Seroloji klinik artrit bulgularıyla birlikte değerlendirilmelidir.', false],
      ['Uzun süre yalnız analjezikle takip et', 'Analjezikler hastalık modifiye edici etki sağlamaz.', true],
    ]);
  }
  return genericDiagnosticSequence(c);
}

function tbIsolationSeq(c) {
  return makeSequence(c.id, 'Tüberküloz izolasyon ve tedavi sırası', 'Hava yolu izolasyonu ve temaslı yönetimini doğru konumlandır.', [
    ['Uzamış öksürük, gece terlemesi ve apikal/kaviter bulgularla akciğer TB şüphesini tanı', 'Klinik ve radyolojik patern bulaştırıcı TB açısından uyarıcıdır.'],
    ['Hastayı hava yolu izolasyonuna al ve N95/negatif basınç önlemlerini uygula', 'Mycobacterium tuberculosis hava yoluyla bulaşır.'],
    ['ARB yayma, kültür ve moleküler direnç testleri için balgam örneği al', 'Mikrobiyolojik doğrulama ve direnç bilgisi tedaviyi yönlendirir.'],
    ['Standart dörtlü anti-tüberküloz tedaviyi uygun endikasyonda başla', 'Bulaştırıcı akciğer TB’de tedavi geciktirilmez.'],
    ['Temaslı taraması ve bildirim/dispansere yönlendirme sürecini düzenle', 'Toplum sağlığı açısından temaslı yönetimi zorunludur.'],
    ['Hepatotoksisite, görme etkisi ve tedavi uyumunu düzenli izle', 'Tedavi süresi uzun olduğu için yan etki ve uyum yönetimi önemlidir.'],
  ], [
    ['Aktif akciğer TB’de yalnız cerrahi maske ile standart izolasyon uygula', 'Bulaş hava yolu ile olduğundan N95 ve uygun oda gerekir.', true],
    ['Kültür kesinleşene kadar bulaş önlemi alma', 'Klinik/radyolojik güçlü şüphede izolasyon hemen başlanmalıdır.', true],
    ['Semptomlar azalınca tedaviyi erken kes', 'Eksik tedavi direnç ve nüks riskini artırır.', true],
  ], { showInSpot: c.branchId === 'tus-spot-olgular' });
}

function chooseSequence(c) {
  const p = pool(c);
  const diagnosis = c.diagnosis?.correct || 'klinik tablo';
  const isSpot = c.caseType === 'spot' || c.branchId === 'tus-spot-olgular';

  // Cross-branch spot/forensic/emergency rules must be evaluated before broad branch patterns.
  if (/adli|bildirim|istismar|cinsel saldırı|trafik|iş kazası|şüpheli ölüm|yaralanma|onam|bilinci kapalı|aile içi şiddet/.test(p)) return forensicSeq(c);
  if (/anafilaksi|hipotansiyon.*ürtiker|triptaz|adrenalin/.test(p)) return allergySeq(c, true);
  if (/ürtiker|anjiyoödem/.test(p)) return allergySeq(c, false);
  if (/hiperpotasemi|kalsiyum glukonat/.test(p)) return hyperkalemiaSeq(c);
  if (/pitriazis|pityriasis|herald/.test(p)) return pityriasisSeq(c);
  if (/epistaksis|burun kanaması/.test(p)) return makeSequence(c.id, 'Epistaksis ilk yaklaşım sırası', 'Ön burun kanamasında basit ama doğru ilk müdahaleyi sırala.', [
    ['Hastayı öne eğ ve kanın aspire edilmesini önle', 'Başın geriye atılması kan yutma ve aspirasyon riskini artırır.'],
    ['Burun kanatlarına sürekli direkt bası uygula', 'Ön epistakside ilk etkili müdahale basıdır.'],
    ['Koagülopati, antikoagülan ve travma öyküsünü sorgula', 'Kanama riski olan hastada ileri değerlendirme gerekir.'],
    ['Kanama sürerse topikal vazokonstriktör, koter veya tampon seçeneklerini değerlendir', 'İlk bası başarısızsa basamaklı lokal tedavi uygulanır.'],
  ], [
    ['Hastanın başını geriye yatır', 'Bu pozisyon aspirasyon ve kan yutma riskini artırır.', true],
    ['İlk basamak olarak posterior tampon uygula', 'Ön epistakside önce basit bası ve anterior kaynak yönetimi denenir.', false],
    ['Aktif kanamayı değerlendirmeden taburcu et', 'Kanamanın durduğu ve risklerin değerlendirildiği doğrulanmalıdır.', true],
  ], { showInSpot: true });

  // highly specific first
  if (/(\banterior st|\bstemi\b|st elevasyonlu|koagülasyon nekrozu|miyokart enfarkt)/.test(p)) return seq.stemi(c);
  if (/aort diseksiyon|dissection/.test(p)) return seq.aorticDissection(c);
  if (/tamponad/.test(p)) return seq.tamponade(c);
  if (/pulmoner ödem|akciğer ödemi|hypertensive-pulmonary-edema/.test(p)) return seq.pulmonaryEdema(c);
  if (/hipertrofik obstrüktif|hocm|hcm/.test(p)) return seq.hocm(c);
  if (/ketoasidoz|dka/.test(p)) return seq.dka(c);
  if (/pankreatit/.test(p)) return seq.pancreatitis(c);
  if (/varis kanama|hematemez|melena/.test(p)) return seq.varicealBleed(c);
  if (/demir eksikliği/.test(p)) return seq.ironDeficiency(c);
  if (/hiperparatiroid/.test(p)) return seq.hyperparathyroid(c);
  if (/orta serebral|anterior serebral|iskemik inme|stroke|hemiparezi|afazi/.test(p)) return seq.ischemicStroke(c);
  if (/subaraknoid|sah|anevrizmal/.test(p)) return seq.sah(c);
  if (/multipl skleroz|demiyelinizan|optik nörit/.test(p)) return seq.ms(c);
  if (/venöz sinüs|cvst|lohusalık/.test(p)) return seq.cvst(c);
  if (/invajinasyon|pilor stenozu/.test(p)) return pediatricGI(c, diagnosis);
  if (/kawasaki/.test(p)) return makeSequence(c.id, 'Kawasaki hastalığı yönetim sırası', 'Koroner komplikasyonu önleyen pediatrik tedaviyi sırala.', [
    ['Beş günden uzun ateş ve mukokutanöz bulguları Kawasaki lehine değerlendir', 'Ateş süresi ve klinik kriterler tanının temelidir.'],
    ['Koroner tutulum için ekokardiyografi planla', 'Kawasaki’de en önemli komplikasyon koroner anevrizmadır.'],
    ['İlk 10 gün içinde IVIG ve yüksek doz aspirin tedavisi başla', 'Erken IVIG koroner komplikasyon riskini azaltır.'],
    ['Ateş yanıtını ve inflamasyon bulgularını izle', 'IVIG dirençli olgularda ek antiinflamatuvar tedavi gerekebilir.'],
    ['Koroner izlem ve aspirin doz geçişini kardiyolojiyle planla', 'Uzun dönem takip koroner risk durumuna göre belirlenir.'],
  ], [
    ['Ateş düzelmediği halde yalnız oral antibiyotikle izle', 'Kawasaki bakteriyel enfeksiyon gibi yönetilmemelidir.', true],
    ['Ekokardiyografiyi gereksiz kabul et', 'Koroner değerlendirme Kawasaki yönetiminin ana parçasıdır.', true],
    ['IVIG tedavisini koroner anevrizma gelişene kadar ertele', 'Koroner komplikasyonu önlemek için erken IVIG gerekir.', true],
  ]);
  if (/epiglottit|tripod|salya|stridor/.test(p)) return makeSequence(c.id, 'Akut epiglottit yönetim sırası', 'Havayolu güvenliğini bozmadan pediatrik acil yaklaşımı sırala.', [
    ['Toksik görünüm, salya akması, disfaji ve tripod pozisyonunu epiglottit lehine tanı', 'Bu bulgular ani havayolu obstrüksiyonu riskini gösterir.'],
    ['Çocuğu ajite edecek ağız muayenesi ve boğaz manipülasyonundan kaçın', 'Manipülasyon laringospazm ve tam obstrüksiyon tetikleyebilir.'],
    ['Anestezi/KBB/yoğun bakım desteğiyle kontrollü havayolu hazırlığı yap', 'Epiglottitte güvenli entübasyon deneyimli ekip ve uygun ortam gerektirir.'],
    ['Havayolu güvenceye alındıktan sonra intravenöz antibiyotik başla', 'Tedavi olası H. influenzae ve diğer etkenleri kapsamalıdır.'],
    ['Yakın solunum izlemi ve komplikasyon takibi planla', 'Ödem gerileyene kadar havayolu riski sürer.'],
  ], [
    ['Dil basacağıyla boğazı agresif muayene et', 'Epiglottitte orofaringeal manipülasyon obstrüksiyon yaratabilir.', true],
    ['Ayaktan oral antibiyotik verip gönder', 'Epiglottit potansiyel havayolu acilidir ve yatış/izlem gerektirir.', true],
    ['Radyografi için havayolu hazırlığını ertele', 'Görüntüleme hava yolu güvenliğinin önüne geçmemelidir.', true],
  ], { showInSpot: isSpot });
  if (/apandisit/.test(p)) return surgicalSeq(c, 'Akut apandisit');
  if (/kolesistit/.test(p)) return surgicalSeq(c, 'Akut kolesistit');
  if (/obstrüksiyon|ileus|invajinasyon|volvulus/.test(p)) return surgicalSeq(c, diagnosis);
  if (/perfore|pneumoperitoneum|serbest hava/.test(p)) return surgicalSeq(c, 'Perfore peptik ülser');
  if (/divertikülit/.test(p)) return surgicalSeq(c, 'Akut divertikülit');
  if (/pnömotoraks/.test(p)) return makeSequence(c.id, 'Primer spontan pnömotoraks yönetim sırası', 'Pnomotoraksta boyut, semptom ve tansiyon bulgusuna göre yaklaşımı sırala.', [
    ['Ani plöritik ağrı ve tek taraflı solunum sesi azalmasını pnömotoraks lehine değerlendir', 'Klinik bulgu acil görüntüleme ve stabilite değerlendirmesi gerektirir.'],
    ['Tansiyon pnömotoraks bulgusu varsa görüntüleme beklemeden iğne dekompresyonu uygula', 'Hemodinamik bozulmada tedavi tanı doğrulamasından önce gelir.'],
    ['Stabil hastada akciğer grafisi veya USG ile pnömotoraks boyutunu değerlendir', 'Boyut ve semptom tedavi seçimini belirler.'],
    ['Küçük ve stabil olguda oksijen/izlem; büyük veya semptomatik olguda aspirasyon ya da tüp torakostomi planla', 'Tedavi invazivliği klinik riskle orantılı seçilir.'],
    ['Nüks riski, sigara bırakma ve kontrol görüntüleme planını düzenle', 'Primer spontan pnömotoraks nüks edebilir.'],
  ], [
    ['Tansiyon pnömotoraksta önce BT çekimini bekle', 'Tansiyon pnömotoraks klinik tanıdır ve acil dekompresyon gerektirir.', true],
    ['Büyük semptomatik pnömotoraksı yalnız ayaktan izle', 'Semptomatik/büyük pnömotoraks aktif girişim gerektirebilir.', true],
    ['Nüks riskini ve sigarayı hiç konuşma', 'Sigara nüks riskini artırır ve eğitim yönetimin parçasıdır.', false],
  ]);
  if (/pulmoner embol|tromboemboli|dvt|d-dimer/.test(p)) return makeSequence(c.id, 'Pulmoner emboli yönetim sırası', 'Risk sınıflaması ve antikoagülasyon/reperfüzyon kararını sırala.', [
    ['Ani dispne, plöritik ağrı, taşikardi ve DVT ipuçlarıyla pulmoner emboli olasılığını değerlendir', 'Pretest olasılık tetkik ve tedavi kararını belirler.'],
    ['Hemodinamik stabiliteyi sınıfla ve yüksek risk bulgularını ara', 'Masif PE’de reperfüzyon tedavisi gündeme gelir.'],
    ['Uygun hastada BT pulmoner anjiyografi veya D-dimer stratejisini pretest olasılığa göre seç', 'Düşük ve yüksek olasılıkta test seçimi farklıdır.'],
    ['Kontrendikasyon yoksa antikoagülasyon başla', 'Antikoagülasyon trombüs progresyonu ve mortalite riskini azaltır.'],
    ['Şok/hipotansiyon varsa tromboliz veya embolektomi seçeneğini değerlendir', 'Yüksek risk PE’de reperfüzyon hayat kurtarıcı olabilir.'],
    ['Altta yatan provoke edici faktör ve tedavi süresini planla', 'Uzun dönem antikoagülasyon süresi nüks riskine göre belirlenir.'],
  ], [
    ['Şok bulgusunda yalnız D-dimer sonucunu bekle', 'Hemodinamik instabil PE’de tedavi ve görüntüleme acil planlanır.', true],
    ['Antikoagülasyonu kontrendikasyon değerlendirmeden rastgele başla', 'Kanama riski ve kontrendikasyonlar tedavi güvenliği için önemlidir.', false],
    ['DVT bulgularını yönetimden bağımsız kabul et', 'DVT varlığı PE olasılığını ve tedavi planını destekler.', false],
  ]);
  if (/pnömoni|lobar konsolidasyon|curb|chlamydia trachomatis|neonatal pnömoni/.test(p)) return infectionSeq(c, 'Pnömoni');
  if (/idiopatik pulmoner fibroz|uip|fibrozis/.test(p)) return makeSequence(c.id, 'İdiyopatik pulmoner fibrozis yönetim sırası', 'Fibrotik akciğer hastalığında tanı doğrulama ve progresyon izlemini sırala.', [
    ['Kuru öksürük, ilerleyici efor dispnesi ve bazal ince raller ile fibrotik interstisyel akciğer hastalığını düşün', 'Klinik patern kronik fibrozis açısından yönlendiricidir.'],
    ['Yüksek çözünürlüklü toraks BT ile UIP paternini değerlendir', 'IPF tanısında HRCT paterni merkezî öneme sahiptir.'],
    ['Sekonder interstisyel akciğer hastalığı nedenlerini dışla', 'Otoimmün, mesleki ve ilaç nedenleri tedavi yaklaşımını değiştirir.'],
    ['Uygun hastada antifibrotik tedavi ve pulmoner rehabilitasyon planla', 'Antifibrotikler progresyon hızını azaltabilir.'],
    ['Oksijen gereksinimi, alevlenme ve transplantasyon uygunluğunu izle', 'IPF progresif ve kötü prognozlu olabilir.'],
  ], [
    ['Tipik UIP paterninde rutin geniş spektrumlu antibiyotik başla', 'Enfeksiyon bulgusu yoksa antibiyotik fibrozis tedavisi değildir.', true],
    ['Sekonder nedenleri hiç araştırmadan IPF tanısını kesinleştir', 'IPF tanısı benzer nedenler dışlandıktan sonra konur.', false],
    ['Progresif hipoksemiyi izlem dışı bırak', 'Oksijen ve transplantasyon değerlendirmesi prognoz açısından önemlidir.', true],
  ]);
  if (/koah|hiperkapnik/.test(p)) return makeSequence(c.id, 'KOAH alevlenmesi yönetim sırası', 'Alevlenmede bronkodilatör, steroid, antibiyotik ve ventilasyon kararını sırala.', [
    ['Dispne artışı, balgam pürülansı ve hiperkapniyi KOAH alevlenmesi lehine değerlendir', 'Alevlenme şiddeti tedavi basamaklarını belirler.'],
    ['Oksijen hedefini CO2 retansiyon riskiyle uyumlu şekilde ayarla', 'KOAH alevlenmesinde aşırı oksijen hiperkapniyi artırabilir.'],
    ['Kısa etkili bronkodilatörleri sık aralıklarla uygula', 'Bronkospazm ve hava akımı kısıtlılığı hızla azaltılmalıdır.'],
    ['Sistemik kortikosteroid başla ve balgam pürülansı/şiddete göre antibiyotik değerlendir', 'Steroid alevlenme süresini kısaltır; antibiyotik seçilmiş olguda yararlıdır.'],
    ['Asidoz, hiperkapni veya solunum iş yükü varsa non-invaziv ventilasyon başla', 'NIV entübasyon ve mortalite riskini azaltabilir.'],
    ['Taburculuk öncesi inhaler tekniği, sigara bırakma ve uzun dönem tedaviyi düzenle', 'Alevlenme sonrası risk azaltma önemlidir.'],
  ], [
    ['CO2 retansiyon riski olan hastaya sınırsız yüksek akım oksijen ver', 'Hedefsiz oksijen hiperkapni ve asidozu kötüleştirebilir.', true],
    ['Hiperkapnik asidozda NIV değerlendirmesini ertele', 'NIV uygun hastada erken başlanmalıdır.', true],
    ['Alevlenme sonrası inhaler tedaviyi gözden geçirme', 'Uzun dönem tedavi optimizasyonu tekrar alevlenmeleri azaltır.', false],
  ]);
  if (/tüberküloz|tuberculosis|tb|n95|kazeifiye/.test(p)) return /temaslı|ppd|latent/.test(p) ? tbContactSeq(c) : tbIsolationSeq(c);
  if (/sıtma|malaria|plasmodium/.test(p)) return infectionSeq(c, 'Falciparum sıtması');
  if (/meningokok|menenjit|ense sertliği/.test(p)) return infectionSeq(c, 'Menenjit/meningokoksemi');
  if (/endokardit/.test(p)) return infectionSeq(c, 'İnfektif endokardit');
  if (/sepsis|septik şok/.test(p)) return makeSequence(c.id, 'Septik şok yönetim sırası', 'Sepsiste genel kalıp yerine şok ve kaynak kontrolünü doğru sırala.', [
    ['Enfeksiyon şüphesiyle hipotansiyon/laktat yüksekliğini septik şok lehine tanı', 'Şok organ perfüzyon bozukluğunu gösterir ve acil müdahale gerektirir.'],
    ['Uygun kültürleri tedaviyi geciktirmeden al', 'Mikrobiyoloji tedavi daraltma için önemlidir ama antibiyotiği geciktirmemelidir.'],
    ['Erken geniş spektrumlu antibiyotik başla', 'Septik şokta antibiyotik gecikmesi mortaliteyi artırır.'],
    ['Kristalloid sıvı resüsitasyonu başlat ve yanıtı değerlendir', 'İlk hemodinamik destek intravasküler volümü düzeltmektir.'],
    ['Sıvıya rağmen hipotansiyon sürerse norepinefrin başla', 'Vazopressör hedef perfüzyon basıncını korumaktır.'],
    ['Enfeksiyon odağı için kaynak kontrolü gereksinimini değerlendir', 'Apse, nekrotik doku veya kateter gibi odaklar tedavi başarısını belirler.'],
  ], [
    ['Şokta antibiyotiği kültür kesinleşene kadar tamamen beklet', 'Septik şokta tedavi mikrobiyoloji sonucu beklenerek geciktirilmez.', true],
    ['Sıvıya yanıtsız hipotansiyonda vazopressörü ertele', 'Persistan hipotansiyonda norepinefrin perfüzyon için gereklidir.', true],
    ['Kaynak kontrolü gereksinimini değerlendirme dışı bırak', 'Kaynak kontrolü olmadan enfeksiyon dirençli sürebilir.', true],
  ]);
  if (/colles|distal radius/.test(p)) return collesSeq(c);
  if (/femur boyun|skafoid|omuz|glenohumeral|biseps tendinit|osteoartrit|radial sinir|humerus|kırık|çıkık/.test(p)) return orthoSeq(c, diagnosis);
  if (/elektrik çarp|iş kazası.*elektrik|ventriküler aritmi/.test(p)) return makeSequence(c.id, 'Elektrik yaralanması yönetim sırası', 'Elektrik temasında kardiyak izlem, yanık ve adli/iş kazası kaydını sırala.', [
    ['Temas voltajı, süre, bilinç kaybı ve giriş-çıkış yanıklarını değerlendir', 'Elektrik yaralanmasında iç doku ve kardiyak etkiler dış görünümden daha ağır olabilir.'],
    ['EKG çek ve aritmi açısından monitörizasyon gereksinimini belirle', 'Elektrik akımı ölümcül ritim bozukluğu yapabilir.'],
    ['Yanık, rabdomiyoliz ve kompartman bulgularını hedefe yönelik değerlendir', 'Derin doku hasarı böbrek yetmezliği ve kompartman sendromuna yol açabilir.'],
    ['Tetanus, yara bakımı ve gerekirse yanık/cerrahi konsültasyonu planla', 'Lokal yaralanma uygun yara ve yanık yönetimi gerektirir.'],
    ['İş kazası/adli kayıt ve bildirim sürecini tıbbi tedaviyi geciktirmeden başlat', 'Mesleki yaralanma kayıt ve bildirim yükümlülüğü doğurur.'],
  ], [
    ['EKG normal değilken monitörizasyonsuz taburcu et', 'Aritmi riski olan elektrik yaralanmasında izlem gerekir.', true],
    ['Yanık küçük görünüyor diye derin doku hasarını dışla', 'Elektrik yanığında yüzey görünümü hasarı küçümsetebilir.', true],
    ['Adli/iş kazası kaydını tıbbi müdahale bitene kadar tamamen yok say', 'Kayıt süreci tedaviyle birlikte yürütülmelidir.', false],
  ]);
  if (/yıldırım|apne|near-hanging|boyun basısı|asfiksi/.test(p)) return makeSequence(c.id, 'Asfiksi/havayolu riski yönetim sırası', 'Solunum depresyonu ve gecikmiş havayolu ödeminde güvenli yaklaşımı sırala.', [
    ['Bilinç, solunum eforu ve havayolu açıklığını hızla değerlendir', 'Asfiksi ve yıldırım/boğulma benzeri yaralanmalarda ilk risk oksijenlenmedir.'],
    ['Gerekirse ventilasyon desteği ve oksijenizasyonu başlat', 'Uzamış apne hipoksik hasar ve arrest riskini artırır.'],
    ['Boyun travması, laringeal ödem ve servikal yaralanma bulgularını değerlendir', 'Gecikmiş havayolu ödemi başlangıçta sessiz olabilir.'],
    ['Kardiyak ritim ve nörolojik durumu monitörize et', 'Elektrik/yıldırım ve asfiksi sonrası aritmi ve hipoksik beyin hasarı izlenir.'],
    ['Adli/yaralanma kaydı ve güvenlik değerlendirmesini tıbbi stabilizasyonla birlikte yürüt', 'Şüpheli boyun basısı veya iş/saha kazası bildirim gerektirebilir.'],
  ], [
    ['Solunum depresyonu varken yalnız gözlem öner', 'Apne/hipoventilasyon acil ventilasyon desteği gerektirir.', true],
    ['Boyun basısı sonrası gecikmiş havayolu ödemini izlem dışı bırak', 'Havayolu ödemi saatler içinde kötüleşebilir.', true],
    ['Kardiyak ritim izlemi gereksiz kabul et', 'Elektrik/yıldırım etkilenmesinde aritmi riski bulunabilir.', false],
  ]);
  if (/galaktozemi|fruktoz|von gierke|fenilketon|akçaağaç|alkapton|albinizm|homosistin|pellagra|skorbüt|hemokromatoz|hiperkolesterolemi|tangier|g6pd|tiamin|adrenolökodistrofi|otoimmün endokrinopati|apeced|fetomaternal|hipoksik iskemik/.test(p)) return metabolicSeq(c, diagnosis);
  if (/radyasyon/.test(p)) return makeSequence(c.id, 'Akut radyasyon sendromu yönetim sırası', 'Maruziyet sonrası dekontaminasyon, doz tahmini ve hematolojik izlemi sırala.', [
    ['Maruziyet süresi, mesafe, koruyucu ekipman ve prodromal semptom zamanını değerlendir', 'Bulantı-kusmanın erken başlaması yüksek doz maruziyet için ipucudur.'],
    ['Kontaminasyon varsa kıyafetleri çıkarıp dekontaminasyon uygula', 'Dış kontaminasyonun uzaklaştırılması hem hasta hem ekip güvenliği sağlar.'],
    ['Mutlak lenfosit sayısı trendi ve dozimetri ile doz tahmini yap', 'Lenfosit düşüş hızı radyasyon dozu ve prognoz hakkında bilgi verir.'],
    ['Hematolojik destek, enfeksiyon önleme ve gerekirse G-CSF tedavisini planla', 'Kemik iliği baskılanması enfeksiyon ve kanama riskini artırır.'],
    ['Radyasyon güvenliği, adli/iş sağlığı bildirimi ve uzun dönem kanser takibini düzenle', 'Maruziyet olayı toplum ve iş güvenliği açısından da yönetilmelidir.'],
  ], [
    ['Dekontaminasyon gereksinimini değerlendirmeden hastayı yoğun alana al', 'Kontaminasyon varsa yayılımı önlemek için erken dekontaminasyon gerekir.', true],
    ['Lenfosit trendini önemsiz kabul et', 'Lenfosit kinetiği doz tahmini için yüksek verimlidir.', false],
    ['Maruziyet kaydını ve güvenlik bildirimini atla', 'Radyasyon maruziyeti kurumsal güvenlik ve bildirim gerektirebilir.', true],
  ]);
  if (/nekroz|patoloji|barrett|adenokarsinom|mikrosatellit|kanser|kolon/.test(p) && !/miyokart/.test(p)) return genericDiagnosticSequence(c);
  if (/sistemik lupus|sjögren|romatoid|skleroderma|dijital ülser|membranöz|diabetic nephropathy|nefropati|anti-pla2r/.test(p)) return rheumSeq(c, diagnosis);
  if (/bruton|agammaglobulin|hiv|aids|scid|immün yetmezlik|diskeratozis|langerhans|itp|purpura|trombositopeni|kawasaki|yenidoğan|kritik aort koarktasyonu|varicella|chlamydia|yabancı cisim|talasemi|yersinia|lenfoma/.test(p)) return pediatricSeq(c, diagnosis);
  if (/azatioprin|tpmt|organofosfat|gansiklovir|foskarnet|verapamil|bosentan|iloprost/.test(p)) return makeSequence(c.id, 'Farmakolojik yönetim sırası', 'İlaç etkisi, toksisite ve güvenli alternatif kararını sırala.', [
    ['İlaç maruziyeti ile klinik/laboratuvar toksisite arasındaki zaman ilişkisini kur', 'Farmakolojik olgularda nedensellik için maruziyet-zaman-yan etki ilişkisi önemlidir.'],
    ['Ciddi toksisite veya kontrendike ilacı durdur', 'Toksisite süren ilacın devamı klinik kötüleşmeye yol açar.'],
    ['Spesifik antidot, alternatif ilaç veya destek tedaviyi doğru endikasyonla başla', 'Farmakoloji sorularında tedavi seçimi mekanizma bilgisine dayanır.'],
    ['Hedef organ yan etkilerini laboratuvar ve klinik izle', 'Kemik iliği, böbrek, karaciğer veya kolinerjik etkiler yakın takip gerektirir.'],
    ['Tekrar maruziyetten kaçınma, doz/genetik risk ve hasta eğitimi planla', 'TPMT gibi riskler gelecekteki reçete güvenliğini belirler.'],
  ], [
    ['Toksisiteye rağmen aynı ilacı aynı dozda sürdür', 'Ciddi yan etkide sorumlu ilaç kesilmeli veya değiştirilmelidir.', true],
    ['Spesifik antidot varken yalnız semptomatik izlem yap', 'Bazı toksisitelerde antidot zaman kritiktir.', true],
    ['Yan etki izlemini gereksiz kabul et', 'Toksik ilaçlarda hedef organ izlemi güvenlik için zorunludur.', false],
  ], { showInSpot: isSpot });
  if (/adli|bildirim|istismar|cinsel saldırı|trafik|iş kazası|şüpheli ölüm|yaralanma|onam|bilinci kapalı|aile içi şiddet/.test(p)) return forensicSeq(c);
  if (/anafilaksi|hipotansiyon.*ürtiker|triptaz|adrenalin/.test(p)) return allergySeq(c, true);
  if (/ürtiker|anjiyoödem/.test(p)) return allergySeq(c, false);
  if (/hiperpotasemi|kalsiyum glukonat/.test(p)) return hyperkalemiaSeq(c);
  if (/tüberküloz temas|ppd|izoniyazid profilaksisi/.test(p)) return tbContactSeq(c);
  if (/pitriazis|pityriasis|herald/.test(p)) return pityriasisSeq(c);
  if (/erizipel|selülit|tinea|terbinafin|eritema toksikum|dermatoloji|döküntü|malar|koplik|kızıl|pastia/.test(p)) return genericDiagnosticSequence(c, { showInSpot: isSpot });
  if (/epistaksis|burun kanaması/.test(p)) return makeSequence(c.id, 'Epistaksis ilk yaklaşım sırası', 'Ön burun kanamasında basit ama doğru ilk müdahaleyi sırala.', [
    ['Hastayı öne eğ ve kanın aspire edilmesini önle', 'Başın geriye atılması kan yutma ve aspirasyon riskini artırır.'],
    ['Burun kanatlarına sürekli direkt bası uygula', 'Ön epistakside ilk etkili müdahale basıdır.'],
    ['Koagülopati, antikoagülan ve travma öyküsünü sorgula', 'Kanama riski olan hastada ileri değerlendirme gerekir.'],
    ['Kanama sürerse topikal vazokonstriktör, koter veya tampon seçeneklerini değerlendir', 'İlk bası başarısızsa basamaklı lokal tedavi uygulanır.'],
  ], [
    ['Hastanın başını geriye yatır', 'Bu pozisyon aspirasyon ve kan yutma riskini artırır.', true],
    ['İlk basamak olarak posterior tampon uygula', 'Ön epistakside önce basit bası ve anterior kaynak yönetimi denenir.', false],
    ['Aktif kanamayı değerlendirmeden taburcu et', 'Kanamanın durduğu ve risklerin değerlendirildiği doğrulanmalıdır.', true],
  ], { showInSpot: true });
  if (/ortostatik|baroreseptör/.test(p)) return makeSequence(c.id, 'Fizyolojik refleks yorum sırası', 'Baroreseptör refleksini klinik gözlemle ilişkilendir.', [
    ['Pozisyon değişimi sonrası venöz dönüş azalmasını başlangıç olay olarak tanı', 'Ayağa kalkınca geçici kan basıncı düşüşü refleks yanıtı başlatır.'],
    ['Karotis sinüs ve aort kavsindeki baroreseptör deşarj azalmasını mekanizmaya yerleştir', 'Baroreseptör aktivitesi basınç değişimine duyarlıdır.'],
    ['Sempatik aktivite artışı ve parasempatik tonus azalmasıyla taşikardi/vasokonstriksiyonu açıkla', 'Homeostatik yanıt kan basıncını korumaya yöneliktir.'],
    ['Patolojik ortostatik hipotansiyon varsa ilaç, dehidratasyon ve otonom yetmezlik nedenlerini değerlendir', 'Fizyolojik refleks yetersizse klinik neden aranmalıdır.'],
  ], [
    ['Ayağa kalkınca sempatik aktivitenin azalacağını kabul et', 'Normal kompansasyon sempatik aktivite artışıdır.', true],
    ['Baroreseptörleri glukoz sensörü gibi yorumla', 'Baroreseptörler arter basıncındaki gerilmeyi algılar.', true],
    ['Tek bir refleks yanıtla tüm senkop nedenlerini dışla', 'Senkop ayırıcı tanısı daha geniştir.', false],
  ]);
  if (/tiroglossal/.test(p)) return makeSequence(c.id, 'Tiroglossal kanal kisti yaklaşım sırası', 'Orta hat boyun kitlesinde embriyolojik köken ve güvenli cerrahi planı sırala.', [
    ['Dil çıkarma/yutkunma ile hareket eden orta hat boyun kitlesini tiroglossal kanal kisti lehine değerlendir', 'Kistin hyoid ve dil kökü ilişkisi bu hareketi açıklar.'],
    ['Enfeksiyon bulgusu ve tiroid dokusunun normal yerleşimini değerlendir', 'Ektopik tek tiroid dokusunun çıkarılması hipotiroidi riski taşır.'],
    ['Ultrasonografi ile kistik yapı ve normal tiroid varlığını doğrula', 'Görüntüleme cerrahi öncesi güvenlik sağlar.'],
    ['Aktif enfeksiyon varsa önce tedavi et; elektif dönemde Sistrunk prosedürünü planla', 'Hyoid orta kısmıyla birlikte eksizyon nüks riskini azaltır.'],
  ], [
    ['Normal tiroid varlığını doğrulamadan kitleyi çıkar', 'Ektopik tiroid olasılığı cerrahi öncesi dışlanmalıdır.', true],
    ['Sadece basit drenajla definitif tedavi sağla', 'Drenaj nüks riskini azaltmaz; Sistrunk prosedürü gerekir.', true],
    ['Dil hareketiyle kitlenin hareketini önemsiz kabul et', 'Bu bulgu tanısal açıdan değerlidir.', false],
  ]);
  if (/ektopik gebelik/.test(p)) return makeSequence(c.id, 'Ektopik gebelik yönetim sırası', 'Maternal stabilite ve rüptür riskine göre obstetrik acil yaklaşımı sırala.', [
    ['Amenore, tek taraflı pelvik ağrı ve vajinal kanamayı ektopik gebelik açısından değerlendir', 'Üreme çağında gebelik testi pozitif ağrı-kanama ektopik için kırmızı bayraktır.'],
    ['Hemodinamik stabilite ve periton irritasyon bulgularını sınıfla', 'Rüptür şüphesinde cerrahi aciliyet değişir.'],
    ['Serum beta-hCG ve transvajinal ultrason ile intrauterin gebelik/ektopik olasılığını değerlendir', 'Tanı seri beta-hCG ve USG ilişkisiyle netleşir.'],
    ['Stabil ve uygun kriterli hastada metotreksat; instabil veya rüptür şüphesinde cerrahi planla', 'Tedavi seçimi stabilite, kitle boyutu, hCG düzeyi ve rüptür bulgusuna bağlıdır.'],
    ['Rh negatif hastada anti-D profilaksisi ve beta-hCG düşüş takibi düzenle', 'İzlem tedavi başarısını ve izoimmünizasyon riskini yönetir.'],
  ], [
    ['Şok bulgusu olan hastada seri beta-hCG bekle', 'İnstabil/rüptür şüphesinde cerrahi değerlendirme geciktirilmez.', true],
    ['Gebelik olasılığını dışlamadan analjezikle taburcu et', 'Üreme çağında ağrı-kanama gebelik testi gerektirir.', true],
    ['Metotreksatı her ektopik gebelikte koşulsuz ver', 'Metotreksat seçilmiş stabil hastalar için uygundur.', false],
  ]);

  return genericDiagnosticSequence(c, { showInSpot: isSpot });
}

const updated = cases.map((c) => {
  const next = structuredClone(c);
  next.title = inferTitle(next);
  next.managementSequence = chooseSequence(next);
  const isSpotCase = next.caseType === 'spot' || next.branchId === 'tus-spot-olgular';
  if (next.managementSequence?.steps?.length) {
    const diagnosisContext = cleanSentence(next.diagnosis?.correct || next.clinicalFocus || next.title || 'bu olgu');
    const titleContext = cleanSentence(next.title || diagnosisContext);
    next.managementSequence.steps = next.managementSequence.steps.map((step) => {
      let label = step.label;
      label = label.replace('Gerekiyorsa yalnız tanıyı değiştirecek hedef tetkiki seç', `Gerekiyorsa yalnız ${diagnosisContext} kararını değiştirecek hedef tetkiki seç`);
      label = label.replace('Tanıyla ilgisiz rutin geniş tetkik paneli ekle', `${diagnosisContext} ile ilgisiz rutin geniş tetkik paneli ekle`);
      label = label.replace('Karar verdirici ipucunu göz ardı edip rastgele tedavi başla', `${diagnosisContext} için karar verdirici ipucunu göz ardı edip rastgele tedavi başla`);
      label = label.replace('Stabilite veya kırmızı bayrakları değerlendirmeden ayaktan izlem öner', `${diagnosisContext} olgusunda stabilite veya kırmızı bayrakları değerlendirmeden ayaktan izlem öner`);
      label = label.replace('Beslenme ilişkisi, açlık/ek gıda tetiklenmesi ve nörolojik-hepatik bulguları birlikte değerlendir', `${diagnosisContext} için beslenme ilişkisi, açlık/ek gıda tetiklenmesi ve nörolojik-hepatik bulguları birlikte değerlendir`);
      label = label.replace('Akut hipoglisemi, asidoz, hiperamonyemi veya dehidratasyon varsa hızla düzelt', `${diagnosisContext} olgusunda akut hipoglisemi, asidoz, hiperamonyemi veya dehidratasyon varsa hızla düzelt`);
      label = label.replace('Tanıyı destekleyen hedef metabolit veya enzim/genetik testi seç', `${diagnosisContext} tanısını destekleyen hedef metabolit veya enzim/genetik testi seç`);
      label = label.replace('Sorumlu substratı diyetten uzaklaştır ve güvenli kalori desteği sağla', `${diagnosisContext} için sorumlu substratı diyetten uzaklaştır ve güvenli kalori desteği sağla`);
      label = label.replace('Aileye genetik danışmanlık, kriz planı ve uzun dönem izlem düzenle', `${diagnosisContext} için aileye genetik danışmanlık, kriz planı ve uzun dönem izlem düzenle`);
      label = label.replace('Metabolik kriz bulgusunda beslenmeyi tamamen kesip kalori desteği verme', `${diagnosisContext} metabolik krizinde beslenmeyi tamamen kesip kalori desteği verme`);
      label = label.replace('Ek gıda ile tetiklenen tabloyu basit gastroenterit kabul ederek izlem dışı bırak', `${diagnosisContext} ipuçlarını basit gastroenterit kabul ederek izlem dışı bırak`);
      label = label.replace('Genetik danışmanlığı yalnız erişkin döneme ertele', `${diagnosisContext} için genetik danışmanlığı yalnız erişkin döneme ertele`);
      label = label.replace('Hastanın vital stabilitesini ve acil müdahale gereksinimini değerlendir', `${titleContext} olgusunda vital stabilite ve acil müdahale gereksinimini değerlendir`);
      label = label.replace('Gerekli tıbbi tedaviyi gecikmeden başlat', `${titleContext} olgusunda gerekli tıbbi tedaviyi gecikmeden başlat`);
      label = label.replace('Yaralanma/olay bulgularını objektif, ayrıntılı ve zaman bilgisiyle kaydet', `${titleContext} bulgularını objektif, ayrıntılı ve zaman bilgisiyle kaydet`);
      label = label.replace('Adli bildirim veya ilgili koruyucu bildirim yükümlülüğünü yerine getir', `${titleContext} için adli bildirim veya ilgili koruyucu bildirim yükümlülüğünü yerine getir`);
      label = label.replace('Delil niteliği taşıyabilecek materyali ve mahremiyeti koruyarak süreci sürdür', `${titleContext} sürecinde delil niteliği taşıyabilecek materyali ve mahremiyeti koru`);
      label = label.replace('Adli süreç tamamlanana kadar tıbbi müdahaleyi ertele', `${titleContext} olgusunda adli süreç tamamlanana kadar tıbbi müdahaleyi ertele`);
      label = label.replace('Hasta istemezse objektif muayene kaydı tutma', `${titleContext} olgusunda hasta istemezse objektif muayene kaydı tutma`);
      label = label.replace('Yaralanmayı yalnız sözlü anlatıma göre değerlendir', `${titleContext} olgusunu yalnız sözlü anlatıma göre değerlendir`);
      label = label.replace('Hastalık odağını ve bulaş/komplikasyon riskini klinik bulgularla sınıfla', `${diagnosisContext} için hastalık odağını ve bulaş/komplikasyon riskini klinik bulgularla sınıfla`);
      label = label.replace('Tedaviyi geciktirmeyecek şekilde hedef mikrobiyolojik örneği al', `${diagnosisContext} için tedaviyi geciktirmeyecek şekilde hedef mikrobiyolojik örneği al`);
      label = label.replace('Klinik şiddet ve olası etkene uygun hedef ampirik veya özgül tedaviyi başla', `${diagnosisContext} olasılığına uygun hedef ampirik veya özgül tedaviyi başla`);
      label = label.replace('Gerekli izolasyon veya temaslı yönetimini hastalığın bulaş yoluna göre uygula', `${diagnosisContext} için izolasyon veya temaslı yönetimini bulaş yoluna göre uygula`);
      label = label.replace('Mikrobiyolojik sonuç ve klinik yanıta göre tedaviyi daralt, değiştir veya süresini belirle', `${diagnosisContext} tedavisini mikrobiyolojik sonuç ve klinik yanıta göre daralt/değiştir`);
      label = label.replace('Bulaş yolu farklı olsa da her hastaya aynı izolasyon önlemini uygula', `${diagnosisContext} olgusunda bulaş yolu farklı olsa da aynı izolasyon önlemini uygula`);
      label = label.replace('Ağır enfeksiyon bulgularında tedaviyi kültür sonucu çıkana kadar tamamen beklet', `${diagnosisContext} olgusunda tedaviyi kültür sonucu çıkana kadar tamamen beklet`);
      label = label.replace('Kaynak veya odak değerlendirmesini gereksiz kabul et', `${diagnosisContext} için kaynak veya odak değerlendirmesini gereksiz kabul et`);
      label = label.replace('Yanlış çeldiricileri Acil servis bağlamında dışla', `${diagnosisContext} için Acil servis bağlamındaki yanlış çeldiricileri dışla`);
      return { ...step, label };
    });
  }

  if (isSpotCase && next.managementSequence?.steps?.length) {
    const required = next.managementSequence.steps.filter((step) => step.required).sort((a, b) => (a.correctOrder || 0) - (b.correctOrder || 0));
    const distractors = next.managementSequence.steps.filter((step) => !step.required).slice(0, 3);
    const trimmedRequired = required.slice(0, Math.min(required.length, 5));
    next.managementSequence = {
      ...next.managementSequence,
      showInSpot: true,
      title: next.managementSequence.title?.includes('TUS') ? next.managementSequence.title : `TUS spot ${next.managementSequence.title || 'yaklaşım sırası'}`,
      instruction: 'Bu spot olguda doğru klinik kararı gereksiz işlem eklemeden sırala.',
      minRequiredSteps: trimmedRequired.length,
      steps: [
        ...trimmedRequired.map((step, index) => ({ ...step, correctOrder: index + 1 })),
        ...distractors,
      ],
    };
  }

  // Keep the feedback management concise and synchronized with required sequence steps.
  const requiredLabels = next.managementSequence.steps
    .filter((step) => step.required)
    .sort((a, b) => (a.correctOrder || 0) - (b.correctOrder || 0))
    .map((step) => step.label);
  if (next.diagnosis?.answerFeedback) {
    next.diagnosis.answerFeedback.management = requiredLabels.slice(0, 5);
    next.diagnosis.answerFeedback.managementSteps = requiredLabels.slice(0, 5);
  }
  return next;
});

const output = `// KlinikIQ vaka verisi: TUS odaklı, klinik karar verdirici ve objektif tetkik sonuçlarıyla yapılandırılmıştır.\n// Not: ÖSYM/TUS soru metinleri kopyalanmamış; PDF'teki bilgiler özgün KlinikIQ eğitim senaryolarına dönüştürülmüştür.\n// Bu sürümde her vaka için tanıya, aciliyete ve TUS öğrenme hedefine özgü yönetim sırası eklenmiştir.\n\nexport const cases = ${JSON.stringify(updated, null, 2)};\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(id) {\n  return cases.find((clinicalCase) => clinicalCase.id === id);\n}\n`;

fs.writeFileSync(casesPath, output, 'utf8');

const report = {
  totalCases: updated.length,
  casesWithManagementSequence: updated.filter((c) => c.managementSequence?.steps?.length).length,
  spotCasesWithManagementSequence: updated.filter((c) => (c.caseType === 'spot' || c.branchId === 'tus-spot-olgular') && c.managementSequence?.showInSpot).length,
  fixedMissingTitles: updated.filter((c) => c.title && c.title !== 'undefined').length,
  genericForbiddenPhraseHits: updated.flatMap((c) => (c.managementSequence?.steps || []).map((s) => s.label)).filter((label) => /ABC, vital bulgular ve sepsis|Kan kültürü ve gerekli temel tetkikleri al|Klinik gecikme yaratmadan ampirik antibiyotik başla/i.test(label)).length,
  generatedAt: new Date().toISOString(),
};
fs.writeFileSync(path.join(workDir, 'MANAGEMENT_SEQUENCE_REWORK_REPORT.json'), JSON.stringify(report, null, 2), 'utf8');
console.log(JSON.stringify(report, null, 2));
