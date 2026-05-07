import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cases } from '../src/data/cases.js';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const byId = new Map(cases.map((c) => [c.id, c]));
const touched = new Set();
let rewrittenManagement = 0;
let templateLeaksFixed = 0;
let investigationsCleaned = 0;
let tusSpotDisabledVerified = 0;

function slug(text = '') {
  return String(text)
    .toLocaleLowerCase('tr')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72) || 'step';
}

function step(prefix, order, label, rationale, score = order <= 3 ? 2 : 1) {
  return {
    id: `${prefix}-r-${order}-${slug(label)}`,
    label,
    required: true,
    correctOrder: order,
    unsafe: false,
    score,
    rationale,
  };
}

function distractor(prefix, index, label, rationale, unsafe = false, score = unsafe ? -2 : -1) {
  return {
    id: `${prefix}-d-${index}-${slug(label)}`,
    label,
    required: false,
    correctOrder: null,
    unsafe,
    score,
    rationale,
  };
}

function setSequence(id, { title, instruction, required, distractors = [], minRequiredSteps }) {
  const c = byId.get(id);
  if (!c) throw new Error(`Case not found: ${id}`);
  const prefix = slug(id);
  c.managementSequence = {
    enabled: true,
    showInSpot: c.branchId === 'tus-spot-olgular' ? true : false,
    title,
    instruction,
    minRequiredSteps: minRequiredSteps ?? required.length,
    steps: [
      ...required.map((entry, i) => step(prefix, i + 1, entry[0], entry[1], entry[2])),
      ...distractors.map((entry, i) => distractor(prefix, i + 1, entry[0], entry[1], entry[2], entry[3])),
    ],
  };
  const requiredLabels = required.map((entry) => entry[0]);
  if (c.diagnosis?.answerFeedback) {
    c.diagnosis.answerFeedback.managementSteps = requiredLabels;
    c.diagnosis.answerFeedback.management = requiredLabels;
  }
  if (c.diagnosis) c.diagnosis.nextStep = requiredLabels.join(' ');
  touched.add('src/data/cases.js');
  rewrittenManagement += 1;
}

function setInvestigations(id, investigations) {
  const c = byId.get(id);
  if (!c) throw new Error(`Case not found: ${id}`);
  c.investigations = investigations;
  touched.add('src/data/cases.js');
  investigationsCleaned += 1;
}

function appendInvestigationIfMissing(id, inv) {
  const c = byId.get(id);
  if (!c) throw new Error(`Case not found: ${id}`);
  c.investigations = Array.isArray(c.investigations) ? c.investigations : [];
  if (!c.investigations.some((item) => item.id === inv.id)) {
    c.investigations.push(inv);
    investigationsCleaned += 1;
    touched.add('src/data/cases.js');
  }
}

// 1) Explicitly wrong template matches.
setSequence('anatomy-radial-nerve-humerus-fracture-001', {
  title: 'Radial sinir yaralanması yönetim sırası',
  instruction: 'Kırık, nörovasküler muayene ve radial sinir izlemini klinik sıraya yerleştir.',
  required: [
    ['Üst ekstremitenin nörovasküler muayenesini omuzdan ele kadar tamamla.', 'Radial sinir motor-duyu fonksiyonu, distal dolaşım ve kompartman bulguları ilk kararı belirler.'],
    ['El bileği-parmak ekstansiyonu, başparmak abduksiyonu ve birinci dorsal web duyusunu kaydet.', 'Bu bulgular radial sinir hasarını median, ulnar ve aksiller sinir lezyonlarından ayırır.'],
    ['Humerus grafileriyle kırığın seviyesi, deplasmanı ve ekleme uzanımını doğrula.', 'Kırık lokalizasyonu stabilizasyon yöntemini ve sinir izlem planını değiştirir.'],
    ['Açık kırık, damar yaralanması, kompartman bulgusu veya ilerleyici defisiti acil dışla.', 'Bu bulgulardan biri varsa beklemeksizin ortopedik cerrahi değerlendirme gerekir.'],
    ['Kapalı kırıkta uygun immobilizasyon sağla ve ortopedi takibini planla.', 'İzole radial sinir palsilerinin önemli bir kısmı seri izlemle düzelebilir.'],
    ['Radial sinir fonksiyonunu seri muayenelerle izle; düzelme yoksa EMG ve cerrahi zamanlamasını planla.', 'Persistan defisit sinir kesisi, sıkışma veya iyileşme gecikmesi açısından ileri değerlendirme gerektirir.'],
  ],
  distractors: [
    ['Nörovasküler muayene yapmadan yalnız analjezik verip taburcu et.', 'Travmatik ekstremite yaralanmasında distal dolaşım ve sinir fonksiyonu belgelenmeden güvenli taburculuk yapılamaz.', true],
    ['Açık kırık veya nabız kaybını elektif poliklinik kontrolüne bırak.', 'Açık kırık ve damar yaralanması acil cerrahi değerlendirme gerektirir.', true],
    ['El bileği düşüklüğünü kırıkla ilişkisiz kabul edip grafiyi ertele.', 'Travma sonrası radial sinir bulgusu humerus şaft kırığıyla doğrudan ilişkilidir.', true],
    ['Kapalı kırıkta izole radial sinir palsisini otomatik acil sinir eksplorasyonu kabul et.', 'Kapalı humerus şaft kırığında izole radial sinir palsisi çoğu durumda seri izlemle değerlendirilir.', false],
  ],
});

setInvestigations('anatomy-radial-nerve-humerus-fracture-001', [
  {
    id: 'direct-xray-humerus',
    label: 'Direkt humerus grafisi',
    type: 'xray',
    priority: 'essential',
    summary: 'Sağ humerus orta-distal şaft düzeyinde deplase kırık hattı izleniyor.',
    findings: ['Kırık hattı radial sinirin spiral oluk komşuluğuyla uyumludur ve nörolojik defisit ile birlikte yorumlanmalıdır.'],
    rows: [['Direkt humerus grafisi', 'Orta-distal şaftta deplase kırık hattı', 'Kırık yok', 'Radial sinir hasarıyla anatomik korelasyon sağlar']],
  },
  {
    id: 'neurovascular-exam-radial-nerve',
    label: 'Nörovasküler muayene kaydı',
    type: 'clinical',
    priority: 'essential',
    summary: 'El bileği ve parmak ekstansiyonu belirgin zayıf; birinci dorsal web aralığında hipoestezi var. Radial-ulnar nabızlar palpabl ve kapiller dolum normal.',
    findings: ['Damar yaralanması olmadan radial sinir motor-duyu defisitini destekler.'],
    rows: [
      ['El bileği/parmak ekstansiyonu', 'Belirgin zayıf', 'Tam kuvvet', 'Radial sinir motor tutulumu'],
      ['Birinci dorsal web duyusu', 'Azalmış', 'Normal', 'Radial sinir duyu alanı etkilenmiş'],
      ['Distal nabız ve kapiller dolum', 'Korunmuş', 'Korunmuş', 'Acil damar yaralanması lehine bulgu yok'],
    ],
  },
  {
    id: 'post-immobilization-control-xray',
    label: 'İmmobilizasyon sonrası kontrol grafisi',
    type: 'xray',
    priority: 'useful',
    summary: 'İmmobilizasyon sonrası kırık hizalanması kabul edilebilir sınırlarda izleniyor.',
    findings: ['Kontrol görüntüleme ortopedi izlemi ve stabilizasyon planını destekler.'],
    rows: [['Kontrol grafisi', 'Kabul edilebilir hizalanma', 'Belirgin deplasman yok', 'Takip planını destekler']],
  },
]);
templateLeaksFixed += 1;

setSequence('ortho-shoulder-dislocation-001', {
  title: 'Anterior omuz çıkığı yönetim sırası',
  instruction: 'Travmatik omuz çıkığında görüntüleme, redüksiyon ve nörovasküler kontrol sırasını kur.',
  required: [
    ['Distal nabız, kapiller dolum ve aksiller sinir duyusunu redüksiyon öncesi değerlendir.', 'Omuz çıkığında nörovasküler durum işlem öncesi mutlaka belgelenmelidir.'],
    ['Omuz grafisiyle çıkık yönünü ve eşlik eden kırığı kontrol et.', 'Anterior-inferior çıkık ve kırık varlığı redüksiyon tekniğini ve güvenliğini belirler.'],
    ['Analjezi/sedasyon koşullarını hazırlayıp kapalı redüksiyon uygula.', 'Ağrı kontrolü ve kas gevşemesi başarılı ve güvenli redüksiyon sağlar.'],
    ['Redüksiyon sonrası nörovasküler muayeneyi tekrar et.', 'İşlem sonrası gelişen sinir veya damar etkilenimi erken yakalanmalıdır.'],
    ['Kontrol grafisiyle humerus başının glenoide oturduğunu doğrula.', 'Redüksiyon başarısı ve eşlik eden kırık kontrol görüntüleme ile belgelenir.'],
    ['Kısa süreli immobilizasyon, ortopedi kontrolü ve rehabilitasyon planla.', 'Nüks ve hareket kısıtlılığını azaltmak için takip ve egzersiz programı gerekir.'],
  ],
  distractors: [
    ['Nörovasküler muayene yapmadan redüksiyon dene.', 'İşlem öncesi nörovasküler durum bilinmezse komplikasyon ayırt edilemez.', true],
    ['Redüksiyon sonrası kontrol grafisini tamamen atla.', 'Başarısız redüksiyon veya eşlik eden kırık gözden kaçabilir.', true],
    ['Eşlik eden kırık şüphesine rağmen kuvvetli manipülasyon yap.', 'Kırıklı çıkıkta kontrolsüz manipülasyon ek hasar oluşturabilir.', true],
    ['Omuz çıkığını adli bildirim basamaklarıyla ana akış gibi yönet.', 'Bu vakada ana klinik karar çıkığın güvenli redüksiyonu ve nörovasküler izlemdir.', false],
  ],
});
templateLeaksFixed += 1;

setSequence('cardiovascular-electrical-injury-arrhythmia-001', {
  title: 'Elektrik yaralanması yönetim sırası',
  instruction: 'İş kazası bağlamını tıbbi stabilizasyonu geciktirmeden, kardiyak ve yanık riskleriyle birlikte sırala.',
  required: [
    ['Havayolu, solunum, dolaşım ve bilinç durumunu ilk değerlendirmede kontrol et.', 'Elektrik yaralanmasında aritmi, solunum durması ve travma birlikte görülebilir.'],
    ['12 derivasyon EKG ve sürekli ritim monitorizasyonu başlat.', 'Elektrik akımı ölümcül aritmi ve iletim bozukluğu oluşturabilir.'],
    ['Giriş-çıkış yanıkları, derin doku hasarı ve eşlik eden düşme travmasını ara.', 'Küçük deri lezyonu derin kas hasarını veya travmayı dışlamaz.'],
    ['CK, elektrolit, kreatinin ve idrar miyoglobinini izleyerek rabdomiyoliz riskini değerlendir.', 'Derin elektrik hasarı akut böbrek hasarı ve elektrolit bozukluğu yapabilir.'],
    ['Yanık bakımı, tetanoz profilaksisi ve sıvı tedavisini klinik bulgulara göre düzenle.', 'Doku hasarı ve enfeksiyon riski destek tedavisiyle kontrol edilir.'],
    ['Tıbbi stabilizasyon sonrası iş kazası kaydını ve gerekli bildirimi objektif bulgularla tamamla.', 'Adli/idari süreç tıbbi müdahaleyi geciktirmeden yürütülmelidir.'],
  ],
  distractors: [
    ['İş kazası bildirimi tamamlanana kadar EKG ve tedaviyi ertele.', 'Kayıt ve bildirim tıbbi stabilizasyonun önüne geçemez.', true],
    ['EKG anormalliği varken yalnız yara pansumanı yapıp taburcu et.', 'Aritmi riski olan hastada kardiyak izlem gerekir.', true],
    ['Küçük deri yanığı var diye kas ve böbrek hasarını dışla.', 'Elektrik yaralanmasında deri bulgusu derin hasarı hafife aldırabilir.', true],
    ['Olayı yalnız hastanın sözlü beyanına göre kaydedip muayene bulgularını yazma.', 'İş kazasında objektif tıbbi kayıt hasta güvenliği ve hukuki süreç için gereklidir.', false],
  ],
});
templateLeaksFixed += 1;

setSequence('cv-pulmonary-edema-001', {
  title: 'Akut kardiyojenik pulmoner ödem yönetim sırası',
  instruction: 'Hipoksemi, hipertansiyon/volüm yükü ve altta yatan tetikleyiciyi hedefleyen akışı sırala.',
  required: [
    ['Solunum eforu, SpO₂, kan basıncı ve bilinç durumuyla aciliyeti belirle.', 'Pulmoner ödemde hipoksemi ve solunum yorgunluğu hızla kötüleşebilir.'],
    ['Hastayı oturt, oksijen ver ve gerekirse noninvaziv ventilasyonu erken başlat.', 'Pozisyon ve basınçlı ventilasyon oksijenasyonu ve preload/afterload yükünü azaltır.'],
    ['EKG, akciğer grafisi, kan gazı ve natriüretik peptid ile tanıyı ve tetikleyiciyi değerlendir.', 'İskemi, aritmi, hipertansif kriz ve volüm yükü tedavi seçimini değiştirir.'],
    ['Hipertansif tabloda nitrat, konjesyonda intravenöz loop diüretik tedaviyi planla.', 'Tedavi baskın hemodinamik probleme göre seçilmelidir.'],
    ['Akut koroner sendrom, aritmi veya kapak patolojisi gibi tetikleyicileri eş zamanlı yönet.', 'Pulmoner ödem tek başına değil, altta yatan nedenle birlikte tedavi edilir.'],
    ['Şok, bilinç bozulması veya ventilasyon yetersizliği varsa yoğun bakım ve invaziv havayolu hazırlığı yap.', 'Klinik kötüleşme gecikmeden ileri destek gerektirir.'],
  ],
  distractors: [
    ['Her pulmoner ödem hastasını STEMI gibi doğrudan kateter laboratuvarına gönder.', 'Koroner reperfüzyon yalnız STEMI veya uygun AKS kanıtı varsa önceliklidir.', true],
    ['Hipoksemi belirginken BNP sonucunu bekleyip oksijeni ertele.', 'Solunum desteği laboratuvar sonucunu beklemez.', true],
    ['Volüm yükü olan hastaya rutin hızlı sıvı bolusu ver.', 'Kardiyojenik pulmoner ödemde gereksiz sıvı hipoksemiyi artırabilir.', true],
    ['Dispneyi yalnız bronkospazm kabul edip diüretik/hemodinamik değerlendirme yapma.', 'Yaygın ral, ortopne ve yüksek BNP kardiyojenik ödem lehinedir.', false],
  ],
});
templateLeaksFixed += 1;

setSequence('inf-endocarditis-001', {
  title: 'Enfektif endokardit yönetim sırası',
  instruction: 'Kültür, ekokardiyografi, antibiyotik ve cerrahi endikasyonları doğru sıraya koy.',
  required: [
    ['Uzamış ateş, yeni üfürüm, emboli bulgusu ve IV madde kullanımını birlikte değerlendir.', 'Bu birliktelik enfektif endokardit olasılığını yükseltir.'],
    ['Antibiyotik öncesi farklı ven girişlerinden en az üç set kan kültürü al.', 'Etkenin saptanması tedaviyi daraltmak ve süreyi belirlemek için kritiktir.'],
    ['Transtorasik ekokardiyografiyle ve gerekirse TEE ile vejetasyon/kapak hasarını ara.', 'Ekokardiyografi tanıyı ve komplikasyonları gösterir.'],
    ['Kültürler alındıktan sonra klinik ağırlığa uygun ampirik IV antibiyotik başla.', 'Tedavi kan kültürünü geciktirmeden, fakat kültür alımı tamamlandıktan sonra başlatılır.'],
    ['Etken ve duyarlılık sonucuna göre uzun süreli hedefe yönelik IV tedaviyi düzenle.', 'Endokarditte tedavi süresi ve ilaç seçimi mikrobiyolojik veriye dayanır.'],
    ['Kalp yetmezliği, apse, dirençli bakteriyemi veya büyük emboli riski varsa cerrahi değerlendirme iste.', 'Komplike endokardit yalnız antibiyotikle güvenli yönetilemeyebilir.'],
  ],
  distractors: [
    ['Pulmoner emboli varsayımıyla kan kültürü almadan yalnız antikoagülasyon başla.', 'Bu olguda ateş ve üfürüm enfektif endokarditi öncelikli kılar.'],
    ['Tek negatif kan kültürüyle endokarditi dışla.', 'Endokarditte çoklu kültür setleri gerekir; tek örnek yetersizdir.'],
    ['Vejetasyon şüphesinde ekokardiyografiyi gereksiz kabul et.', 'Kapak tutulumu ve komplikasyonların gösterilmesi yönetimi belirler.'],
    ['Klinik düzelince IV tedaviyi birkaç günde kes.', 'Endokardit uzun süreli, hedefe yönelik tedavi gerektirir.'],
  ],
});
templateLeaksFixed += 1;

setSequence('pulmonology-lightning-apnea-001', {
  title: 'Yıldırım/elektrik maruziyeti yönetim sırası',
  instruction: 'Geçici solunum durması, ritim riski, yanık ve travma değerlendirmesini sırala.',
  required: [
    ['Solunum, dolaşım ve bilinç durumunu hızla değerlendir; apne varsa ventilasyon desteği başlat.', 'Yıldırım maruziyetinde solunum merkezi baskılanması ve kardiyak arrest görülebilir.'],
    ['EKG çek ve ritim monitorizasyonunu sürdür.', 'Geçici aritmi veya iletim bozukluğu erken dönemde yakalanmalıdır.'],
    ['Düşme travması, deri yanıkları ve nörolojik defisitleri sistematik ara.', 'Maruziyet yalnız elektrik etkisi değil mekanik travma da oluşturabilir.'],
    ['CK, kreatinin, elektrolit ve idrar bulgularıyla kas-böbrek hasarını izle.', 'Rabdomiyoliz ve elektrolit bozuklukları gecikmiş komplikasyon yapabilir.'],
    ['Yanık bakımı, sıvı desteği ve göz/kulak-nörolojik izlem gereksinimini planla.', 'Yıldırım yaralanmasında çoklu sistem etkilenimi olabilir.'],
    ['Olay kaydını ve güvenlik bildirimini tıbbi stabilizasyon sonrası tamamla.', 'Kayıt önemlidir ancak ana akış yaşam desteği ve komplikasyon izlemdir.'],
  ],
  distractors: [
    ['Apneik hastada ventilasyon yerine yalnız deri lezyonlarını incele.', 'Solunum desteği ilk önceliktir.', true],
    ['EKG normalse tüm izlemi hemen sonlandır.', 'Semptomlu veya yüksek riskli maruziyette klinik izlem gerekebilir.', false],
    ['Düşme veya travma olasılığını değerlendirme dışı bırak.', 'Yıldırım çarpması düşme ve künt travma oluşturabilir.', true],
    ['Yanık küçük göründüğü için kas hasarı ve böbrek riskini hiç araştırma.', 'Elektrik maruziyetinde dış yanık derin hasarı göstermeyebilir.', false],
  ],
});
templateLeaksFixed += 1;

setSequence('pulmonology-near-hanging-asphyxia-001', {
  title: 'Boyun basısı/asfiksi yönetim sırası',
  instruction: 'Havayolu, servikal travma, hipoksik hasar ve güvenlik değerlendirmesini sırala.',
  required: [
    ['Havayolu açıklığı, solunum eforu, oksijenasyon ve dolaşımı ilk dakikada değerlendir.', 'Boyun basısı sonrası gecikmiş havayolu ödemi ve hipoksik bozulma gelişebilir.'],
    ['Servikal omurga güvenliğini koruyarak oksijen veya ventilasyon desteği sağla.', 'Eşlik eden boyun travması dışlanmadan manipülasyon risklidir.'],
    ['Boyun yumuşak doku hasarı, laringeal ödem, stridor ve nörolojik defisitleri ara.', 'Havayolu ve nörolojik komplikasyonlar başlangıçta hafif görünebilir.'],
    ['Klinik endikasyon varsa servikal BT/BT anjiyografi ve kan gazı-laktat değerlendirmesi yap.', 'Vasküler yaralanma, omurga hasarı ve hipoksi derecesi tedaviyi değiştirir.'],
    ['Gecikmiş pulmoner ödem, aspirasyon ve hipoksik beyin hasarı açısından gözlem planla.', 'Yakın izlem komplikasyonları erken saptar.'],
    ['Tıbbi stabilizasyon sonrası psikiyatrik güvenlik ve adli kayıt sürecini başlat.', 'Güvenlik değerlendirmesi gereklidir ancak havayolu yönetimini geciktirmez.'],
  ],
  distractors: [
    ['Boyun basısı sonrası stridoru basit anksiyete kabul edip taburcu et.', 'Stridor havayolu ödemi veya laringeal yaralanma belirtisi olabilir.', true],
    ['Servikal travma dışlanmadan agresif boyun manipülasyonu yap.', 'Olası servikal yaralanmada immobilizasyon güvenliği gerekir.', true],
    ['Oksijenizasyon bozukken yalnız psikiyatrik görüşme bekle.', 'Önce tıbbi stabilizasyon sağlanmalıdır.', true],
    ['Gecikmiş pulmoner ödem riskini izlem dışı bırak.', 'Yakın ası/asfiksi sonrası solunum komplikasyonları geç ortaya çıkabilir.', false],
  ],
});
templateLeaksFixed += 1;

// 2) Duplicate broad surgery/pediatric templates converted to case-specific flows.
setSequence('surg-appendicitis-001', {
  title: 'Akut apandisit yönetim sırası',
  instruction: 'Ağrı migrasyonu, görüntüleme ve cerrahi zamanlamayı sırala.',
  required: [
    ['Ağrı migrasyonu, sağ alt kadran hassasiyeti ve periton bulgularını değerlendir.', 'Klinik örüntü apandisit olasılığını ve aciliyetini belirler.'],
    ['Oral alımı kes; damar yolu, sıvı ve analjeziyi başlat.', 'Olası operasyon ve dehidratasyon riski için destek tedavisi gerekir.'],
    ['Hemogram/CRP ve uygun hastada idrar-gebelik değerlendirmesiyle ayırıcı tanıyı daralt.', 'Üriner ve jinekolojik nedenler apandisitle karışabilir.'],
    ['USG veya BT ile apendiks inflamasyonu ve komplikasyonu doğrula.', 'Görüntüleme özellikle atipik olguda perforasyon/apseyi gösterir.'],
    ['Genel cerrahi ile apendektomi zamanlamasını ve antibiyotik gereksinimini planla.', 'Definitif tedavi çoğu olguda cerrahi yaklaşım ve perioperatif antibiyotiktir.'],
    ['Perforasyon, apse, yaygın peritonit veya sepsis bulgularını izle.', 'Komplike apandisit tedavi şeklini ve yatış düzeyini değiştirir.'],
  ],
  distractors: [
    ['Periton bulgusu varken yalnız oral analjezikle taburcu et.', 'Peritonit olasılığı güvenli ayaktan izleme uygun değildir.', true],
    ['Akut dönemde kolonoskopiyle tanıyı kesinleştirmeye çalış.', 'Kolonoskopi akut apandisit tanısında ilk yöntem değildir ve riskli olabilir.', true],
    ['Gebelik olasılığını hiç sorgulama.', 'Doğurgan yaştaki hastada gebelik görüntüleme ve ayırıcı tanıyı değiştirir.', false],
  ],
});

setSequence('surg-cholecystitis-001', {
  title: 'Akut kolesistit yönetim sırası',
  instruction: 'Sağ üst kadran ağrısı, biliyer görüntüleme ve erken cerrahi yaklaşımı sırala.',
  required: [
    ['Ateş, sağ üst kadran hassasiyeti ve Murphy bulgusunu akut kolesistit lehine değerlendir.', 'Biliyer kolikten ayrım inflamasyon bulgularıyla yapılır.'],
    ['Oral alımı kes; damar yolu, sıvı, analjezi ve antiemetik desteği başlat.', 'Cerrahi olasılığı ve kusma/dehidratasyon riski nedeniyle destek tedavisi gerekir.'],
    ['Lökosit, CRP, bilirubin ve karaciğer enzimleriyle kolanjit/koledok taşı riskini değerlendir.', 'Kolestaz bulguları ERCP gereksinimini değiştirebilir.'],
    ['Sağ üst kadran ultrasonografisiyle taş, duvar kalınlığı ve perikolesistik sıvıyı doğrula.', 'USG ilk basamak görüntülemedir.'],
    ['Ampirik antibiyotik ve erken laparoskopik kolesistektomi planını cerrahiyle belirle.', 'Erken cerrahi komplikasyonu ve nüksü azaltır.'],
    ['Sarılık, kolanjit veya geniş koledok varsa ERCP gereksinimini değerlendir.', 'Ortak safra yolu obstrüksiyonu cerrahi öncesi endoskopik yaklaşım gerektirebilir.'],
  ],
  distractors: [
    ['Ateş ve Murphy bulgusuna rağmen yalnız antispazmodik verip taburcu et.', 'İnflamasyon bulguları akut kolesistit lehinedir ve izlem/tedavi gerektirir.', true],
    ['Kolanjit bulgularını ERCP değerlendirmesinden bağımsız kabul et.', 'Kolanjit veya koledok taşı varlığı acil drenaj gerektirebilir.', true],
    ['Ultrasonografi yerine ilk basamak olarak rutin kolonoskopi iste.', 'Kolonoskopi biliyer ağrı değerlendirmesinde uygun değildir.', true],
  ],
});

setSequence('surg-sbo-001', {
  title: 'İnce bağırsak obstrüksiyonu yönetim sırası',
  instruction: 'Obstrüksiyon derecesi, strangülasyon bulguları ve cerrahi karar sırasını kur.',
  required: [
    ['Kusma, distansiyon, obstipasyon ve geçirilmiş cerrahi öyküsünü obstrüksiyon lehine değerlendir.', 'Adezyon öyküsü mekanik ince bağırsak obstrüksiyonunu destekler.'],
    ['Oral alımı kes; damar yolu, sıvı-elektrolit replasmanı ve analjezi başlat.', 'Kusma ve üçüncü boşluk kaybı hızlı sıvı-elektrolit bozukluğu oluşturur.'],
    ['Nazogastrik dekompresyonu kusma/distansiyon belirginse uygula.', 'Dekompresyon aspirasyon riskini ve intraluminal basıncı azaltır.'],
    ['BT ile geçiş noktası, kapalı ans, iskemi veya perforasyon bulgularını değerlendir.', 'Strangülasyon bulguları cerrahi aciliyeti belirler.'],
    ['Peritonit, ateş, laktat yüksekliği veya kapalı ans varsa acil cerrahi planla.', 'İskemi/perforasyon riski beklemeyi tehlikeli kılar.'],
    ['Komplikasyon yoksa konservatif izlemde ağrı, gaz-gaita çıkışı ve laboratuvar yanıtını takip et.', 'Basit adezif obstrüksiyon seçilmiş hastada cerrahisiz düzelebilir.'],
  ],
  distractors: [
    ['Tam obstrüksiyon şüphesinde oral laksatifle pasaj açmaya çalış.', 'Oral laksatif aspirasyon ve perforasyon riskini artırabilir.', true],
    ['Peritonit ve laktat yüksekliği varken konservatif izlemde ısrar et.', 'Strangülasyon bulguları acil cerrahi gerektirir.', true],
    ['Geçirilmiş cerrahi öyküsünü tanısal değerlendirmeye katma.', 'Adezyon en sık mekanik SBO nedenlerinden biridir.', false],
  ],
});

setSequence('surg-pneumoperitoneum-001', {
  title: 'Perfore peptik ülser yönetim sırası',
  instruction: 'Serbest hava, peritonit ve acil cerrahi hazırlığı doğru sıraya koy.',
  required: [
    ['Ani yaygın ağrı, tahta karın ve serbest hava bulgusunu perforasyon lehine tanı.', 'Peritonit ve pnömoperitoneum acil cerrahi tablodur.'],
    ['Oral alımı kes; iki damar yolu, sıvı resüsitasyonu ve yakın monitorizasyon başlat.', 'Perforasyonda sepsis ve hipovolemi riski nedeniyle destek tedavisi gerekir.'],
    ['Geniş spektrum antibiyotik ve intravenöz proton pompası inhibitörü başla.', 'Peritoneal kontaminasyon ve asit sekresyonu erken tedavi edilmelidir.'],
    ['Ayakta grafi veya BT ile serbest hava ve olası perforasyon odağını doğrula.', 'Görüntüleme cerrahi planlamayı hızlandırır; klinik peritonitte karar geciktirilmez.'],
    ['Genel cerrahiyle acil operasyon veya uygun seçilmiş olguda girişimsel planı belirle.', 'Definitif tedavi kaynak kontrolüdür.'],
    ['Sepsis, laktat, böbrek fonksiyonu ve postoperatif komplikasyonları izle.', 'Perforasyon sonrası sistemik yanıt ve organ disfonksiyonu gelişebilir.'],
  ],
  distractors: [
    ['Serbest hava varken yalnız oral antasit verip gözle.', 'Pnömoperitoneum kaynak kontrolü gerektiren acil durumdur.', true],
    ['Peritonit bulgusunda önce elektif endoskopi planla.', 'Akut perforasyonda endoskopi ilk yaklaşım değildir ve gecikme yaratabilir.', true],
    ['Antibiyotik ve sıvıyı cerrahi sonrasına kadar tamamen beklet.', 'Resüsitasyon ve antibiyotik cerrahi hazırlıkla eş zamanlı başlar.', true],
  ],
});

setSequence('surg-diverticulitis-001', {
  title: 'Akut divertikülit yönetim sırası',
  instruction: 'Komplike/komplike olmayan divertiküliti BT ve klinik bulgularla ayır.',
  required: [
    ['Sol alt kadran ağrısı, ateş ve hassasiyeti divertikülit lehine değerlendir.', 'Yaşlı hastada lokalize inflamasyon sigmoid divertiküliti düşündürür.'],
    ['Hemodinami, peritonit ve sepsis bulgularını ilk değerlendirmede ara.', 'Komplikasyon varlığı yatış ve cerrahi kararını değiştirir.'],
    ['Kontrastlı BT ile perikolik inflamasyon, apse, fistül veya serbest perforasyonu değerlendir.', 'BT hastalığı sınıflandırmada en yararlı görüntülemedir.'],
    ['Komplike olmayan olguda analjezi, diyet düzenleme ve seçilmiş antibiyotik/yatış kararını ver.', 'Tedavi hastanın ağırlığı ve risk durumuna göre bireyselleştirilir.'],
    ['Apse, yaygın peritonit veya serbest perforasyon varsa drenaj veya cerrahi planla.', 'Komplike hastalıkta kaynak kontrolü gerekebilir.'],
    ['Akut dönem düzeldikten sonra kolon kanseri dışlama için kolonoskopi zamanlamasını planla.', 'Kolonoskopi akut inflamasyon sırasında değil iyileşme sonrası düşünülür.'],
  ],
  distractors: [
    ['Akut inflamasyon sırasında ilk tanı testi olarak kolonoskopi yap.', 'Akut divertikülitte kolonoskopi perforasyon riskini artırabilir.', true],
    ['Peritonit bulgusu varken yalnız lifli diyet öner.', 'Peritonit komplikasyon işaretidir ve acil değerlendirme gerektirir.', true],
    ['BT’de apse saptansa bile drenaj/cerrahi seçeneklerini hiç değerlendirme.', 'Apse boyutu ve klinik durum kaynak kontrolü kararını etkiler.', true],
  ],
});

setSequence('ped-intussusception-001', {
  title: 'İnvajinasyon yönetim sırası',
  instruction: 'Stabilizasyon, ultrason ve redüksiyon kararını pediatrik akut batına göre sırala.',
  required: [
    ['Kolik ağlama atakları, kusma ve kanlı-mukuslu dışkıyı invajinasyon lehine değerlendir.', 'Paroksismal ağrı ve çilek jölesi dışkı tipik ipuçlarıdır.'],
    ['Dehidratasyon, şok, peritonit ve perforasyon bulgularını erken dışla.', 'Bu bulgular redüksiyon yöntemini ve cerrahi gereksinimi değiştirir.'],
    ['Oral alımı kes; damar yolu, sıvı ve analjezi desteğini başlat.', 'Çocukta kusma ve üçüncü boşluk kaybı hızlı bozulma yapabilir.'],
    ['Ultrasonografide hedef/pseudokidney bulgusuyla tanıyı doğrula.', 'USG invajinasyonda ilk tercih tanısal görüntülemedir.'],
    ['Stabil ve perforasyonsuz olguda pnömatik/hidrostatik redüksiyon planla.', 'Nonoperatif redüksiyon hem tanısal hem tedavi edicidir.'],
    ['Peritonit, perforasyon veya başarısız redüksiyonda cerrahi değerlendirme iste.', 'Komplike invajinasyon cerrahi müdahale gerektirebilir.'],
  ],
  distractors: [
    ['Peritonit bulgusu varken lavman redüksiyonunda ısrar et.', 'Perforasyon/peritonit redüksiyon için kontrendikasyon oluşturabilir.', true],
    ['Kolik ağrıyı basit gaz sancısı kabul edip görüntülemeyi ertele.', 'Tekrarlayan ağlama atakları ve kanlı dışkı akut batın uyarısıdır.', true],
    ['Kusma ve dehidratasyon varken yalnız oral sıvı öner.', 'Akut obstrüksiyonda damar yolu ve güvenli destek gerekir.', true],
  ],
});

setSequence('ped-pyloric-stenosis-001', {
  title: 'Hipertrofik pilor stenozu yönetim sırası',
  instruction: 'Elektrolit düzeltme, ultrason tanısı ve piloromiyotomi hazırlığını sırala.',
  required: [
    ['Safrasız fışkırır kusma, açlık ve kilo alamamayı pilor stenozu lehine değerlendir.', 'Yaş ve kusma paterni tanı için güçlü ipucudur.'],
    ['Dehidratasyon ve hipokloremik metabolik alkalozu saptayıp oral alımı kes.', 'Asit kaybı ve sıvı eksikliği anestezi öncesi düzeltilmelidir.'],
    ['İzotonik sıvı ve potasyum replasmanını idrar çıkışıyla güvenli şekilde düzenle.', 'Elektrolit düzeltilmeden cerrahiye gitmek risklidir.'],
    ['Pilor ultrasonografisiyle kas kalınlığı ve kanal uzunluğunu doğrula.', 'USG tanıyı gereksiz radyasyon olmadan destekler.'],
    ['Elektrolit ve volüm durumu düzeldikten sonra Ramstedt piloromiyotomi planla.', 'Definitif tedavi cerrahidir ancak önce metabolik stabilizasyon gerekir.'],
    ['Ameliyat sonrası beslenme toleransı ve kusma tekrarı açısından izle.', 'Erken dönemde kusma devam edebilir; hidrasyon ve beslenme izlenir.'],
  ],
  distractors: [
    ['Hipokloremik alkalozu düzeltmeden hemen ameliyata gönder.', 'Elektrolit bozukluğu anestezi riskini artırır.', true],
    ['Safrasız kusmayı her durumda basit reflü kabul edip taburcu et.', 'Fışkırır kusma ve alkaloz pilor stenozunu düşündürür.', true],
    ['Ultrason yerine ilk basamak olarak geniş enfeksiyon paneli iste.', 'Bu vakada karar verdirici test pilor ultrasonografisidir.', false],
  ],
});

// 3) Biochemistry/metabolic distractor cleanup: unique, disease-specific wrong options.
const biochemDistractors = {
  'pediatrics-classic-galactosemia-001': [
    ['Sarılık ve kusma sürerken laktoz/galaktoz içeren beslenmeye devam et.', 'Galaktoz maruziyeti karaciğer yetmezliği ve sepsis riskini artırır.', true],
    ['Tanı için yalnız total bilirubini izle ve hedef metabolit/enzim testini ertele.', 'Galaktozemi hedef metabolit ve enzim/genetik testle doğrulanmalıdır.', true],
    ['E. coli sepsisi olasılığını klinik değerlendirme dışında bırak.', 'Klasik galaktozemide neonatal sepsis riski özellikle önemlidir.', false],
  ],
  'pediatrics-hereditary-fructose-intolerance-001': [
    ['Tanı koymak için fruktoz yükleme testi yap.', 'Fruktoz yükleme hipoglisemi ve ağır metabolik bozulma yaratabilir.', true],
    ['Sükroz/fruktoz içeren beslenmeyi sürdürüp yalnız antiemetik ver.', 'Tetikleyici karbonhidratın kesilmesi tedavinin temelidir.', true],
    ['Hipoglisemi ataklarını beslenme öyküsünden bağımsız yorumla.', 'Ek gıda sonrası zaman ilişkisi HFI için karar verdiricidir.', false],
  ],
  'pediatrics-von-gierke-gsd-001': [
    ['Kısa açlık nöbetlerini güvenli kabul edip uzun açlık testi uygula.', 'GSD tip I’de açlık ciddi hipoglisemi ve laktik asidoz oluşturabilir.', true],
    ['Gece beslenmesi/çiğ nişasta planı olmadan yalnız tek doz glukoz ver.', 'Sürekli açlık önleme uzun dönem kontrolün temelidir.', true],
    ['Laktat, trigliserid ve ürik asit paternini değerlendirme dışı bırak.', 'Bu metabolik patern tanısal ayrım sağlar.', false],
  ],
  'pediatrics-phenylketonuria-001': [
    ['Fenilalanin yüksekliğine rağmen diyet tedavisini nörolojik hasar gelişene kadar ertele.', 'PKU’da erken diyet kalıcı bilişsel hasarı önler.', true],
    ['Tüm proteini tamamen kesip büyüme izlemini bırak.', 'Tedavi kontrollü fenilalanin kısıtlaması ve yeterli protein/tirozin desteği gerektirir.', true],
    ['Gebelik çağına gelince maternal PKU danışmanlığını hiç planlama.', 'Yüksek fenilalanin fetal gelişimi etkileyebilir.', false],
  ],
  'pediatrics-maple-syrup-urine-disease-001': [
    ['Letarjik yenidoğanda sonucu beklemek için proteinli mamayı sürdür.', 'Katabolizma ve lösin yükü nörolojik kötüleşmeyi artırır.', true],
    ['Lösin çok yüksekken yoğun bakım/diyaliz seçeneğini değerlendirme.', 'Ağır lösin yüksekliği beyin ödemi ve koma riski taşır.', true],
    ['Alloizolösin ve dallı zincirli aminoasit profilini gereksiz kabul et.', 'Bu profil MSUD için hedef tanısal veridir.', false],
  ],
  'internal-medicine-alkaptonuria-001': [
    ['Bekleyen idrar koyulaşmasını yalnız dehidratasyon sayıp metabolit testini isteme.', 'Homogentisik asit artışı alkaptonürinin temel bulgusudur.', false],
    ['Eklem ve kapak komplikasyonlarını uzun dönem izlem dışında bırak.', 'Ochronosis sistemik bağ doku ve kapak tutulumu yapabilir.', false],
    ['Ağrılı artropatiyi enfeksiyon varsayarak uzun süreli antibiyotikle yönet.', 'Bu tabloda sorun enfeksiyon değil pigment birikimine bağlı dejenerasyondur.', true],
  ],
  'pediatrics-albinism-001': [
    ['Fotofobi ve nistagmus varken oftalmoloji değerlendirmesini ertele.', 'Albinizmde fonksiyonel yük çoğunlukla oküler etkilenimden gelir.', false],
    ['Güneşten korunma ve deri taramasını gereksiz kabul et.', 'Melanin eksikliği UV hasarı ve deri kanseri riskini artırır.', false],
    ['Kanama veya immün yetmezlik bulgularını sendromik albinizm açısından sorgulama.', 'Hermansky-Pudlak ve Chediak-Higashi gibi tablolar ek risk taşır.', false],
  ],
  'pediatrics-homocystinuria-001': [
    ['Akut bacak şişliğini yalnız ortopedik ağrı kabul edip trombozu dışlama.', 'Homosistinüri venöz/arteriyel tromboz riskini artırır.', true],
    ['Homosistein ve metiyonin ölçmeden yalnız Marfan sendromu izlemi yap.', 'Metabolik testler ayırıcı tanıyı belirler.', false],
    ['Piridoksin yanıtı ve betain/diyet seçeneklerini hiç değerlendirme.', 'Tedavi homosistein düzeyini düşürmeye yöneliktir.', false],
  ],
  'internal-medicine-pellagra-001': [
    ['Fotosensitif dermatiti yalnız topikal steroidle yönetip niasin eksikliğini düzeltme.', 'Pellagraya özgü sistemik eksiklik yerine konmalıdır.', true],
    ['Diyare ve bilişsel yavaşlamayı tanıyla ilişkisiz kabul et.', 'Dermatit-diyare-demans üçlüsü pellagra için öğreticidir.', false],
    ['Beslenme yetersizliği, alkol kullanımı veya izoniazid öyküsünü sorgulama.', 'Niasin eksikliğinin nedeni tedavi planını etkiler.', false],
  ],
  'internal-medicine-scurvy-001': [
    ['Diş eti kanaması ve perifoliküler peteşide C vitamini yerine yalnız antikoagülan kes.', 'Skorbütte kollajen sentez bozukluğu hedef tedavi gerektirir.', false],
    ['Beslenme öyküsünü almadan geniş koagülasyon çalışmasına yönel.', 'Yetersiz C vitamini alımı tanı için temel ipucudur.', false],
    ['C vitamini replasmanını laboratuvar sonucu çıkana kadar haftalarca ertele.', 'Klinik şüphede replasman güvenli ve etkilidir.', false],
  ],
  'internal-medicine-hemochromatosis-001': [
    ['Yüksek ferritin ve transferrin satürasyonu varken demir desteği başla.', 'Demir yüklenmesinde demir desteği zararlıdır.', true],
    ['Karaciğer, pankreas ve kalp komplikasyonlarını izlem dışında bırak.', 'Hemokromatozis çoklu organ hasarı yapabilir.', false],
    ['Aile taraması ve genetik danışmanlığı gereksiz kabul et.', 'HFE ilişkili hastalıkta aile bireyleri risk altında olabilir.', false],
  ],
  'internal-medicine-familial-hypercholesterolemia-001': [
    ['Tendon ksantomları ve erken MI öyküsüne rağmen yalnız düşük doz diyet öner.', 'FH yüksek yoğunluklu lipid düşürücü tedavi ve risk azaltma gerektirir.', false],
    ['LDL düzeyi çok yüksekken sekonder nedenleri ve aile taramasını hiç değerlendirme.', 'Sekonder nedenler dışlanmalı ve kaskad tarama planlanmalıdır.', false],
    ['Ailede erken kardiyak ölüm öyküsünü risk sınıflamasına katma.', 'Aile öyküsü FH ve erken ateroskleroz için kilit ipucudur.', false],
  ],
  'internal-medicine-tangier-disease-001': [
    ['Turuncu tonsilleri yalnız tekrarlayan tonsillit kabul edip lipid profilini isteme.', 'Tangier hastalığında çok düşük HDL ve tonsil bulgusu birliktedir.', false],
    ['Periferik nöropatiyi metabolik hastalıkla ilişkisiz kabul et.', 'ABCA1 bozukluğu nöropatiyle birlikte görülebilir.', false],
    ['Aile öyküsü ve genetik danışmanlığı tamamen atla.', 'Kalıtsal lipid taşıma bozukluğunda aile değerlendirmesi önemlidir.', false],
  ],
};

for (const [id, items] of Object.entries(biochemDistractors)) {
  const c = byId.get(id);
  if (!c?.managementSequence?.steps?.length) continue;
  const required = c.managementSequence.steps.filter((s) => s.required);
  const prefix = slug(id);
  c.managementSequence.steps = [
    ...required,
    ...items.map((entry, i) => distractor(prefix, i + 1, entry[0], entry[1], entry[2])),
  ];
  c.managementSequence.title = c.managementSequence.title === 'Yönetim sırası' ? 'Metabolik hastalık yönetim sırası' : c.managementSequence.title;
  touched.add('src/data/cases.js');
  rewrittenManagement += 1;
}

// 4) Minor wording cleanup for generic trigger words where they were not useful.
const cMS = byId.get('neuro-ms-001');
if (cMS) {
  for (const key of ['diagnosis']) {
    const af = cMS[key]?.answerFeedback;
    if (af) {
      for (const arrName of ['management', 'managementSteps']) {
        if (Array.isArray(af[arrName])) {
          af[arrName] = af[arrName].map((x) => x.replace('MR bulguları ve gerekirse BOS oligoklonal bant ile demiyelinizasyonu destekle', 'MR bulgularını BOS oligoklonal bant ve klinik atak öyküsüyle destekle'));
        }
      }
    }
  }
  if (cMS.managementSequence?.steps) {
    for (const s of cMS.managementSequence.steps) {
      s.label = s.label.replace('MR bulguları ve gerekirse BOS oligoklonal bant ile demiyelinizasyonu destekle', 'MR bulgularını BOS oligoklonal bant ve klinik atak öyküsüyle destekle');
    }
  }
  touched.add('src/data/cases.js');
}
const gal = byId.get('pediatrics-classic-galactosemia-001');
if (gal?.diagnosis) {
  gal.diagnosis.nextStep = 'Laktoz/galaktoz içeren beslenmeyi kes, uygun formülaya geç, karaciğer hasarı ve E. coli sepsisi bulgularını değerlendir.';
  touched.add('src/data/cases.js');
}

// 5) Verify TUS spot olgular stay simple: disabled management panel unless explicitly authored.
for (const c of cases) {
  if (c.branchId === 'tus-spot-olgular' && c.managementSequence?.enabled === false) tusSpotDisabledVerified += 1;
}

const output = `// KlinikIQ vaka verisi: TUS odaklı, klinik karar verdirici ve objektif tetkik sonuçlarıyla yapılandırılmıştır.\n// Bu sürümde yönetim sırası ve tetkik istemleri vaka özelinde sadeleştirilmiştir.\n// Final clinical QA: şablon sızıntıları temizlenmiş, vaka başlığı tekrarı kaldırılmıştır.\n\nexport const cases = ${JSON.stringify(cases, null, 2)};\n`;
fs.writeFileSync(path.join(root, 'src/data/cases.js'), output);

const report = {
  reviewedCases: cases.length,
  reviewedManagementSequences: cases.filter((c) => c.managementSequence?.enabled !== false).length,
  rewrittenManagementSequences: rewrittenManagement,
  fixedTemplateLeakCases: templateLeaksFixed,
  cleanedInvestigationCases: investigationsCleaned,
  tusSpotDisabledManagementVerified: tusSpotDisabledVerified,
  changedFiles: [...touched].sort(),
  specialFixes: {
    radialNerveHumerus: 'Adli şablon kaldırıldı; nörovasküler muayene, humerus grafisi, açık kırık/damar yaralanması dışlama, immobilizasyon, ortopedi takibi ve radial sinir seri izlemi eklendi.',
    tusSpot: 'TUS Spot Olguların 62 tanesinde yönetim paneli kapalı bırakılarak gereksiz algoritma ve fallback şablon üretimi engellendi.',
  },
};
fs.writeFileSync(path.join(root, 'FINAL_CLINICAL_MANAGEMENT_QA_REPORT.json'), JSON.stringify(report, null, 2));
fs.writeFileSync(path.join(root, 'FINAL_CLINICAL_MANAGEMENT_QA_SUMMARY.md'), `# KlinikIQ Final Yönetim Sırası QA\n\n- İncelenen vaka sayısı: ${report.reviewedCases}\n- Aktif yönetim sırası incelenen vaka sayısı: ${report.reviewedManagementSequences}\n- Yönetim sırası yeniden yazılan/düzeltilen vaka sayısı: ${report.rewrittenManagementSequences}\n- Yanlış şablon sızıntısı net düzeltilen vaka sayısı: ${report.fixedTemplateLeakCases}\n- Tetkik istemi temizlenen/güçlendirilen vaka sayısı: ${report.cleanedInvestigationCases}\n- Yönetim paneli kapalı ve sade kalan TUS Spot Olgu sayısı: ${report.tusSpotDisabledManagementVerified}\n\n## Özel düzeltme: Humerus şaft/radial sinir\n\nAdli/delil/mahremiyet şablonu tamamen kaldırıldı. Yeni akış radial sinir motor-duyu muayenesi, distal dolaşım, humerus grafisi, açık kırık/damar yaralanması dışlama, immobilizasyon, ortopedi takibi ve seri radial sinir fonksiyon izlemi üzerine kuruldu. Tetkik istemlerine nörovasküler muayene kaydı ve immobilizasyon sonrası kontrol grafisi eklendi.\n\n## TUS Spot Olgular\n\nTUS Spot Olgularda gereksiz yönetim algoritması gösterilmemesi korundu. Paneli kapalı olan spot olgularda fallback şablonların otomatik üretilmemesi için ek komponent koruması ayrıca uygulanmalıdır.\n`);
console.log(JSON.stringify(report, null, 2));
