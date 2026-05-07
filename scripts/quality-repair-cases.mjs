import { writeFileSync } from 'node:fs';
import { cases as importedCases } from '../src/data/cases.js';

const cases = structuredClone(importedCases);
const stats = {
  inspected: cases.length,
  titleFixed: 0,
  examOrVitalsAdded: 0,
  vitalsAdded: 0,
  examCleaned: 0,
  investigationsRemovedCases: 0,
  investigationPlacementFixed: 0,
  spotFormatted: 0,
  duplicateCleaned: 0,
  managementHiddenInSpot: 0,
  changedCaseIds: new Set(),
};

function mark(c) { stats.changedCaseIds.add(c.id); }
function setIfChanged(c, key, value, counter) {
  const before = JSON.stringify(c[key]);
  const after = JSON.stringify(value);
  if (before !== after) {
    c[key] = value;
    if (counter) stats[counter] += 1;
    mark(c);
    return true;
  }
  return false;
}
function dedupeArray(arr = []) {
  const seen = new Set();
  const out = [];
  for (const item of arr) {
    const normalized = String(item || '').trim().replace(/[.;]+$/,'').toLocaleLowerCase('tr');
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    out.push(String(item).trim().replace(/\s+/g,' '));
  }
  return out;
}
function makeInvestigation(id, label, type, summary, findings = [], priority = 'essential', rows = undefined) {
  const inv = { id, label, type, summary, findings: findings.length ? findings : [summary], priority };
  if (rows) inv.rows = rows;
  return inv;
}
function normalizeQuestionType(type = '') {
  if (['diagnosis','test','treatment','management','forensic','spot','next-step'].includes(type)) return type;
  return 'spot';
}

const stableVitals = {
  TA: '118/76 mmHg', Nabız: '82/dk', Solunum: '16/dk', SpO2: '%98 oda havasında', Ateş: '36.8 °C',
};

const titlePatches = {
  'tus-spot-pdf-vibrio-cholerae-darting-motility-001': 'Bol sulu kansız ishal ve hızlı dehidratasyon',
  'tus-spot-pdf-erysipelas-penicillin-001': 'Keskin sınırlı sıcak bacak eritemi',
  'tus-spot-pdf-anaphylaxis-tryptase-001': 'Besin sonrası çoklu sistem alerjik reaksiyon',
  'tus-spot-pdf-new-dyspepsia-age-sixty-endoscopy-001': 'İleri yaşta yeni başlayan dispepsi',
  'tus-spot-pdf-barrett-columnar-zline-001': 'Reflü hastasında Z çizgisi üzerinde kolumnar mukoza',
  'tus-spot-pdf-biliary-stones-dilated-cbd-mrcp-001': 'Safra taşı öyküsünde geniş koledok şüphesi',
  'tus-spot-pdf-adrenal-crisis-hydrocortisone-001': 'Hiperpigmentasyonlu hastada hipotansif kriz',
  'tus-spot-pdf-prolactinoma-hook-effect-dilution-001': 'Hipofiz makroadenomunda düşük görünen prolaktin',
  'tus-spot-pdf-metastatic-colon-cancer-biomarkers-cd20-001': 'Metastatik kolon kanserinde marker seçimi',
  'tus-spot-pdf-hereditary-cancer-wrong-match-atm-001': 'Herediter kanser sendromlarında yanlış gen eşleşmesi',
  'tus-spot-pdf-diabetic-nephropathy-atypical-hematuria-001': 'Diyabetik hastada atipik hematüri bulgusu',
  'tus-spot-pdf-geriatric-depression-pseudodementia-001': 'Eş kaybı sonrası unutkanlık ve isteksizlik',
  'tus-spot-pdf-pityriasis-rosea-herald-patch-001': 'Madalyon plak sonrası gövdede döküntü',
  'tus-spot-pdf-aca-stroke-leg-predominant-001': 'Bacak ağırlıklı akut motor defisit',
  'tus-spot-pdf-knee-osteoarthritis-peripheral-erosion-001': 'Kronik diz ağrısında beklenmeyen grafi bulgusu',
  'tus-spot-pdf-biceps-tendinitis-speed-yergason-001': 'Speed testiyle artan anterior omuz ağrısı',
  'tus-spot-pdf-xlinked-ald-white-matter-001': 'Adrenal yetmezlik ve beyaz cevher tutulumu',
  'tus-spot-pdf-homocystinuria-stroke-lens-long-fingers-001': 'Marfanoid çocukta akut hemiparezi',
  'tus-spot-pdf-thiamine-responsive-megaloblastic-anemia-001': 'İşitme kaybı, diyabet ve ağır makrositer anemi',
};

const spotTextPatches = {
  'tus-spot-pdf-vibrio-cholerae-darting-motility-001': {
    chiefComplaint: 'Saatler içinde gelişen bol sulu, kansız ishal',
    stem: '49 yaşındaki kadın hasta Yemen seyahatinden kısa süre sonra pirinç suyu görünümünde çok sayıda sulu dışkılama, ağır susuzluk, halsizlik ve kas krampları ile başvurur. Dışkıda kan tariflemez ve karın ağrısı belirgin değildir.',
  },
  'tus-spot-pdf-cmv-retinitis-ganciclovir-neutropenia-001': {
    stem: '28 yaşındaki erkek hastada tedavisiz HIV enfeksiyonu zemininde CMV retiniti tedavisi başlanır. Antiviral tedavinin ikinci haftasında ateşsiz halsizlik ve ağız içinde aft benzeri lezyonlar gelişir; ilaç yan etkisi sorgulanır.',
  },
  'tus-spot-pdf-erysipelas-penicillin-001': {
    chiefComplaint: 'Ateş ve bacakta ağrılı sıcak kızarıklık',
    stem: '55 yaşındaki erkek hasta, yakın dönemde boğaz enfeksiyonu geçirdikten sonra eski safen ven çıkarım skarı çevresinde hızla yayılan ağrılı ve sıcak deri kızarıklığı fark eder. Lezyon tek taraflıdır ve kısa sürede ateş-halsizlik eşlik etmiştir.',
  },
  'tus-spot-pdf-hcv-needlestick-followup-001': {
    demographics: 'Sağlık çalışanı',
    stem: 'Ameliyathane sırasında cerrahın eline kontamine enjektör iğnesi batar. Yaralanma hemen yıkanır, olay kayıt altına alınır ve kaynak hastanın HCV RNA pozitif olduğu öğrenilir.',
  },
  'tus-spot-pdf-tb-contact-ppd-conversion-inh-001': {
    stem: '18 yaşındaki erkek hasta, aktif akciğer tüberkülozu tanısı alan aile bireyiyle aynı evde yaşamaktadır. Kendisi asemptomatiktir ve çocukluk döneminde BCG aşısı olduğunu belirtir.',
  },
  'tus-spot-pdf-curb65-fever-not-criterion-001': {
    stem: '72 yaşındaki kadın hasta ateş, öksürük, sarı balgam ve uykuya meyil nedeniyle acile getirilir. Pnömoni düşünülen hastada hekim yatış kararını CURB-65 kriterleriyle yapılandırmak ister.',
  },
  'tus-spot-pdf-anaphylaxis-tryptase-001': {
    stem: '20 yaşındaki erkek hasta, fıstıklı tatlı yedikten kısa süre sonra yaygın kaşıntı, ürtiker, boğazda şişme hissi, karın ağrısı ve baş dönmesi tarif eder. Alerjik rinit ve astım öyküsü vardır.',
  },
  'tus-spot-pdf-renovascular-hypertension-001': {
    stem: '62 yaşındaki erkek hastada kısa süre içinde ağır ve dirençli hipertansiyon atakları ile tekrarlayan ani akciğer ödemi gelişmiştir. Diyabet ve uzun süreli sigara öyküsü vardır.',
  },
  'tus-spot-pdf-hypertensive-pulmonary-edema-vasodilator-001': {
    stem: '70 yaşındaki kadın hasta antihipertansif ilaçlarını düzensiz kullandıktan sonra ani başlayan şiddetli nefes darlığı ile acile başvurur. Önceden bilinen ciddi sistolik kalp yetersizliği öyküsü yoktur.',
  },
  'tus-spot-pdf-barrett-columnar-zline-001': {
    stem: 'Uzun süreli reflü yakınmaları olan erişkin hastada endoskopik değerlendirme yapılır. Soru, distal özofagusta görülen mukozal paternin hangi tanıyı düşündürdüğünü sorgular.',
    exam: [],
  },
  'tus-spot-pdf-biliary-stones-dilated-cbd-mrcp-001': {
    stem: '57 yaşındaki erkek hasta yağlı yemeklerden sonra artan sağ üst kadran ağrısı nedeniyle değerlendirilir. Ateş, titreme ve belirgin sarılık tariflemez; akut kolanjit bulgusu ön planda değildir.',
  },
  'tus-spot-pdf-adrenal-crisis-hydrocortisone-001': {
    stem: 'Erişkin erkek hasta belirgin halsizlik, kilo kaybı ve sıvı alımına rağmen devam eden baş dönmesi yakınmalarıyla acile getirilir. Deri ve mukozalarda uzun süredir artan koyulaşma fark edilmektedir.',
  },
  'tus-spot-pdf-factitious-thyrotoxicosis-low-tg-001': {
    stem: '20 yaşındaki kadın hasta çarpıntı, titreme, sinirlilik ve kilo kaybı ataklarıyla başvurur. Tiroid bezi ağrısızdır; hastanın eksojen tiroid hormonu kullanımı başlangıçta net değildir.',
  },
  'tus-spot-pdf-prolactinoma-hook-effect-dilution-001': {
    stem: '42 yaşındaki erkek hasta baş ağrısı, libido azalması ve hafif görme alanı yakınmasıyla endokrinolojiye başvurur. Büyük hipofizer lezyon şüphesinde prolaktin düzeyinin beklenenden düşük görünmesi tanısal sorun yaratır.',
  },
  'tus-spot-pdf-cll-flow-cytometry-001': {
    stem: '75 yaşındaki erkek hasta boyun ve aksillada uzun süredir devam eden lenf nodu şişlikleriyle başvurur. Rutin kontrollerinde yıllardır süren lenfositoz öyküsü vardır ve hasta belirgin B semptomu tariflemez.',
  },
  'tus-spot-pdf-aiha-direct-coombs-001': {
    stem: '58 yaşındaki kadın hasta kısa sürede gelişen halsizlik, sararma ve çarpıntı yakınmalarıyla başvurur. Kanama öyküsü yoktur; tablo hemolitik süreç açısından değerlendirilir.',
  },
  'tus-spot-pdf-hereditary-cancer-wrong-match-atm-001': {
    demographics: 'Genetik danışmanlık olgusu',
    setting: 'TUS tekrar modülü',
    chiefComplaint: 'Herediter kanser sendromu-gen eşleşmesi',
    stem: 'Ailesinde genç yaşta diffüz mide kanseri, meme-over kanseri ve sarkom öyküleri bulunan bir aile için sendrom-gen eşleşmeleri gözden geçirilir. Soru, yanlış eşleşmeyi ayırt etmeye odaklanır.',
    exam: [],
  },
  'tus-spot-pdf-sle-activity-dsdna-complement-001': {
    stem: '28 yaşındaki kadın hasta fotosensitivite, malar döküntü, el küçük eklemlerinde ağrı ve son haftalarda bacaklarda hafif şişlik yakınmalarıyla romatoloji kontrolüne gelir. Mevcut yakınmalar hastalık aktivitesi açısından değerlendirilir.',
  },
  'tus-spot-pdf-membranous-nephropathy-anti-pla2r-001': {
    stem: 'Erişkin hasta nefrotik düzeyde proteinüri ve pretibial ödem nedeniyle nefrolojiye başvurur. Klinik tablo primer membranöz nefropati ile sekonder nedenlerin ayırt edilmesini gerektirir.',
  },
  'tus-spot-pdf-diabetic-nephropathy-atypical-hematuria-001': {
    demographics: 'Uzun süreli diyabeti olan erişkin hasta',
    chiefComplaint: 'Proteinüriye eşlik eden atipik böbrek bulgusu',
    stem: 'Uzun süreli diyabeti olan hastada albuminüri ve yavaş ilerleyen böbrek fonksiyon bozukluğu izlenmektedir. Hekim, diyabetik nefropati dışı bir etiyolojiyi düşündürecek kırmızı bayrak bulgusunu ayırt etmek ister.',
  },
  'tus-spot-pdf-hyperkalemia-ecg-calcium-gluconate-001': {
    stem: 'Kronik böbrek hastalığı olan 54 yaşındaki erkek hasta halsizlik, kas güçsüzlüğü ve bulantı ile acile başvurur. Klinik tablo potasyum yüksekliğine bağlı kardiyak membran instabilitesi açısından acil değerlendirilir.',
  },
  'tus-spot-pdf-pityriasis-rosea-herald-patch-001': {
    chiefComplaint: 'Gövdede yaygınlaşan skuamlı döküntü',
    stem: '20 yaşındaki kadın hasta birkaç gün önce gövdede tek büyük oval skuamlı plak fark ettikten sonra gövde ve proksimal ekstremitelerde çok sayıda benzer döküntü gelişmesi nedeniyle başvurur. Sistemik toksisite veya mukozal erozyon tariflemez.',
  },
  'tus-spot-pdf-aca-stroke-leg-predominant-001': {
    stem: '65 yaşındaki erkek hasta ani başlayan sağ taraf güç kaybı ile acile getirilir. Güç kaybı sağ bacakta belirgin, sağ kolda ise daha hafiftir; konuşma bozukluğu ön planda değildir.',
  },
  'tus-spot-pdf-hsv-encephalitis-temporal-features-001': {
    stem: '32 yaşındaki kadın hasta akut başlayan ateş, baş ağrısı, davranış değişikliği, anlamsız konuşma ve fokal motor nöbetlerle acile getirilir. Tablo ensefalit etkeni açısından acil değerlendirme gerektirir.',
  },
  'tus-spot-pdf-projection-defense-mechanism-001': {
    exam: [],
  },
  'tus-spot-pdf-knee-osteoarthritis-peripheral-erosion-001': {
    stem: 'Erişkin hasta merdiven inip çıkarken artan kronik diz ağrısı ve hareketle krepitasyon yakınmasıyla başvurur. Soru, osteoartritte beklenen ve beklenmeyen direkt grafi bulgularını ayırt etmeye odaklanır.',
  },
  'tus-spot-pdf-tb-n95-airborne-isolation-001': {
    stem: 'Öksürük, gece terlemesi ve kilo kaybı olan hastada aktif akciğer tüberkülozu düşünülmektedir. Servis ortamında hasta ile temas sırasında uygulanacak izolasyon önlemi sorgulanır.',
  },
  'tus-spot-pdf-concussion-normal-ct-001': {
    stem: 'Boks sırasında başına darbe alan hastada kısa süreli dikkat ve konsantrasyon bozukluğu, amnezi ve bulanık görme gelişir. GKS yüksek seyretse de yakınmalar travma sonrası klinik fonksiyon bozukluğunu düşündürür.',
  },
  'tus-spot-pdf-neonatal-erythema-toxicum-eosinophils-001': {
    stem: 'Term yenidoğanda doğumdan kısa süre sonra gövde ve sırtta sarı-beyaz küçük papülopüstüller gelişir. Bebek iyi görünür, ateş yoktur ve lezyonlar kısa sürede gerileme eğilimindedir.',
  },
  'tus-spot-pdf-thiamine-responsive-megaloblastic-anemia-001': {
    stem: 'Akraba ebeveynlerin 2 yaşındaki çocuğunda gelişme geriliği, sensorinöral işitme kaybı, diyabet ve belirgin solukluk birlikte izlenir. Kalıtsal vitamin taşıma bozukluğu düşünülür.',
  },
  'tus-spot-pdf-xlinked-ald-white-matter-001': {
    demographics: '10 yaşında erkek çocuk',
    setting: 'Çocuk nöroloji polikliniği',
    chiefComplaint: 'Davranış değişikliği ve okul başarısında gerileme',
    stem: '10 yaşındaki erkek çocukta okul başarısında gerileme, davranış değişikliği ve ciltte hiperpigmentasyon gelişir. Ailede erkek bireylerde erken yaş nörolojik kötüleşme öyküsü olduğu öğrenilir.',
    exam: ['Nörolojik muayenede dikkat azalması ve hafif spastisite izleniyor.', 'Ciltte adrenal yetmezliği düşündüren hiperpigmentasyon mevcut.'],
  },
  'tus-spot-pdf-homocystinuria-stroke-lens-long-fingers-001': {
    chiefComplaint: 'Akut hemiparezi ve marfanoid görünüm',
    stem: 'Akrabalık öyküsü olan 10 yaşındaki erkek çocuk ani başlayan sol taraf güçsüzlüğü ile acile getirilir. Uzun boy, ince uzun parmaklar ve önceki lens cerrahisi öyküsü dikkat çeker.',
  },
  'tus-spot-pdf-fetomaternal-hemorrhage-kleihauer-betke-001': {
    stem: 'Term yenidoğan doğumdan hemen sonra belirgin solukluk, taşikardi ve zayıf perfüzyonla değerlendirilir. Anne veya bebekte belirgin dış kanama öyküsü yoktur; hemolizsiz fetal kan kaybı olasılığı araştırılır.',
  },
  'tus-spot-pdf-hie-therapeutic-hypothermia-001': {
    stem: 'Term yenidoğan doğumda resüsitasyon gerektirir ve sonraki saatlerde letarji, tonus azalması ve zayıf emme gelişir. Bulgular orta-ağır hipoksik iskemik ensefalopati açısından değerlendirilir.',
  },
};

const vitalPatches = {
  'tus-spot-pdf-vibrio-cholerae-darting-motility-001': { TA: '90/58 mmHg', Nabız: '118/dk', Solunum: '22/dk', SpO2: '%98 oda havasında', Ateş: '36.9 °C' },
  'tus-spot-pdf-erysipelas-penicillin-001': { TA: '125/76 mmHg', Nabız: '104/dk', Solunum: '18/dk', SpO2: '%98 oda havasında', Ateş: '38.3 °C' },
  'tus-spot-pdf-curb65-fever-not-criterion-001': { TA: '92/58 mmHg', Nabız: '112/dk', Solunum: '32/dk', SpO2: '%90 oda havasında', Ateş: '38.6 °C' },
  'tus-spot-pdf-anaphylaxis-tryptase-001': { TA: '88/56 mmHg', Nabız: '122/dk', Solunum: '24/dk', SpO2: '%94 oda havasında', Ateş: '36.8 °C' },
  'tus-spot-pdf-renovascular-hypertension-001': { TA: '176/96 mmHg', Nabız: '94/dk', Solunum: '20/dk', SpO2: '%95 oda havasında', Ateş: '36.7 °C' },
  'tus-spot-pdf-hypertensive-pulmonary-edema-vasodilator-001': { TA: '205/118 mmHg', Nabız: '124/dk', Solunum: '32/dk', SpO2: '%86 oda havasında', Ateş: '36.7 °C' },
  'tus-spot-pdf-cirrhosis-ascites-sbp-paracentesis-001': { TA: '96/62 mmHg', Nabız: '104/dk', Solunum: '20/dk', SpO2: '%96 oda havasında', Ateş: '38.2 °C' },
  'tus-spot-pdf-adrenal-crisis-hydrocortisone-001': { TA: '78/46 mmHg', Nabız: '126/dk', Solunum: '24/dk', SpO2: '%97 oda havasında', Ateş: '37.2 °C' },
  'tus-spot-pdf-anaphylaxis-im-epinephrine-001': { TA: '60/40 mmHg', Nabız: '115/dk', Solunum: '28/dk', SpO2: '%91 oda havasında', Ateş: '36.8 °C' },
  'tus-spot-pdf-hyperkalemia-ecg-calcium-gluconate-001': { TA: '138/82 mmHg', Nabız: '48/dk', Solunum: '18/dk', SpO2: '%97 oda havasında', Ateş: '36.8 °C' },
  'tus-spot-pdf-aca-stroke-leg-predominant-001': { TA: '168/92 mmHg', Nabız: '88/dk', Solunum: '16/dk', SpO2: '%97 oda havasında', Ateş: '36.7 °C' },
  'tus-spot-pdf-hsv-encephalitis-temporal-features-001': { TA: '118/72 mmHg', Nabız: '112/dk', Solunum: '20/dk', SpO2: '%96 oda havasında', Ateş: '39.1 °C' },
  'tus-spot-pdf-fetomaternal-hemorrhage-kleihauer-betke-001': { TA: '58/35 mmHg', Nabız: '172/dk', Solunum: '58/dk', SpO2: '%92 oda havasında', Ateş: '36.5 °C' },
  'tus-spot-pdf-hie-therapeutic-hypothermia-001': { TA: '55/32 mmHg', Nabız: '96/dk', Solunum: '30/dk düzensiz', SpO2: '%90 destek oksijenle', Ateş: '36.1 °C' },
};

const examPatches = {
  'im-iron-deficiency-anemia-001': ['Genel durum stabil; hasta uyanık ve koopere.', 'Konjonktival solukluk, hafif glossit ve tırnaklarda kırılganlık izleniyor.', 'Kardiyopulmoner muayenede belirgin patolojik oskültasyon bulgusu yok.', 'Batın yumuşak; organomegali veya hassasiyet saptanmıyor.'],
  'surg-appendicitis-001': ['Genel durum orta; hasta ağrı nedeniyle sağ alt kadranı koruyarak hareket ediyor.', 'McBurney noktasında belirgin hassasiyet mevcut.', 'Sağ alt kadranda hafif defans izleniyor; yaygın peritonit bulgusu yok.', 'Psoas/obturator irritasyon bulguları klinik olarak değerlendiriliyor.'],
  'surg-sbo-001': ['Genel durum orta; hasta bulantılı ve halsiz görünümde.', 'Abdomen distandü; barsak sesleri metalik ve artmış duyuluyor.', 'Diffüz kramp tarzı hassasiyet var; rebound ve belirgin defans yok.', 'Eski laparotomi skarı izleniyor; rektal ampulla boş değerlendiriliyor.'],
  'surg-pneumoperitoneum-001': ['Genel durum orta-kötü; hasta hareketsiz yatmayı tercih ediyor.', 'Abdomen tahta karın görünümünde rijit ve yaygın hassas.', 'Yaygın defans ve rebound hassasiyeti saptanıyor.', 'Barsak sesleri azalmış duyuluyor.'],
  'pediatrics-albinism-001': ['Genel durum iyi; çocuk uyanık ve koopere.', 'Saç, kaş ve kirpiklerde belirgin pigment azalması izleniyor.', 'Cilt açık renkli; güneşe maruz alanlarda eritem eğilimi mevcut.', 'Fotofobi, nistagmus ve görme keskinliğinde azalma saptanıyor.', 'Fundoskopik değerlendirmede foveal hipoplazi ile uyumlu görünüm izleniyor.'],
  'internal-medicine-pellagra-001': ['Genel durum stabil; hasta halsiz ve beslenme durumu zayıf görünümde.', 'Güneşe açık alanlarda simetrik hiperpigmente, skuamlı dermatit izleniyor.', 'Dil hiperemik ve parlak görünümde; oral mukozalar hassas.', 'Nörolojik muayenede dikkat azalması ve bilişsel yavaşlama mevcut.', 'Batın yumuşak; yaygın hassasiyet veya periton irritasyonu yok.'],
  'internal-medicine-scurvy-001': ['Genel durum stabil; hasta halsiz görünümde.', 'Diş etlerinde şişlik, hassasiyet ve kolay kanama izleniyor.', 'Alt ekstremitelerde perifoliküler peteşi ve ekimozlar mevcut.', 'Ciltte kuruluk ve yara iyileşmesinde gecikme alanları görülüyor.', 'Eklem muayenesinde belirgin aktif sinovit saptanmıyor.'],
  'internal-medicine-tangier-disease-001': ['Genel durum stabil; hasta uyanık ve koopere.', 'Tonsiller büyük ve turuncu renkli izleniyor; akut tonsillit bulgusu ön planda değil.', 'Abdomen muayenesinde hafif hepatosplenomegali saptanıyor; asit yok.', 'Periferik nörolojik muayenede distal duyu azalması mevcut.', 'Kardiyak ve solunum muayenesinde belirgin patolojik oskültasyon bulgusu yok.'],
  'internal-medicine-systemic-lupus-erythematosus-001': ['Genel durum stabil; hasta uyanık ve koopere.', 'Yanaklarda nazolabial kıvrımları koruyan eritemli malar döküntü izleniyor.', 'Oral mukozada ağrısız ülser mevcut.', 'MCP eklemlerinde hassasiyet ve hafif şişlik saptanıyor.', 'Pretibial bölgede hafif gode bırakan ödem mevcut.'],
  'internal-medicine-rheumatoid-arthritis-001': ['Genel durum stabil; hasta uyanık ve koopere.', 'Her iki el MCP ve PIP eklemlerinde simetrik şişlik, hassasiyet ve hareket kısıtlılığı saptanıyor.', 'DIP eklemlerinde belirgin tutulum yok.', 'El bileklerinde hafif sinovit bulguları mevcut.', 'Ciltte psöriyatik plak veya tofüs izlenmiyor.'],
  'tus-spot-pdf-anaphylaxis-im-epinephrine-001': ['Yaygın ürtikeryal döküntü ve dudak çevresinde ödem izleniyor.', 'Akciğer oskültasyonunda bilateral wheezing ve ronküs duyuluyor.', 'Hasta soluk, huzursuz ve soğuk terli görünümde.'],
  'tus-spot-pdf-barrett-columnar-zline-001': [],
  'tus-spot-pdf-hie-therapeutic-hypothermia-001': ['Letarji, yaygın hipotonisite ve zayıf emme izleniyor.', 'Moro refleksi zayıf; spontan hareketler azalmış.'],
  'tus-spot-pdf-projection-defense-mechanism-001': [],
  'tus-spot-pdf-xlinked-ald-white-matter-001': ['Dikkat azalması ve hafif spastisite izleniyor.', 'Ciltte adrenal yetmezliği düşündüren hiperpigmentasyon mevcut.'],
};

const investigationPatches = {
  'tus-spot-pdf-tb-contact-ppd-conversion-inh-001': [makeInvestigation('ppd-cxr-latent-tb', 'PPD ve akciğer grafisi', 'clinical', 'PPD önce 8 mm iken 17 mm ölçülür; akciğer grafisinde aktif infiltrasyon veya kavite saptanmaz.', ['PPD dönüşümü yakın temas sonrası latent enfeksiyon lehinedir.', 'Normal akciğer grafisi aktif akciğer tüberkülozu olasılığını azaltır.'], 'essential')],
  'tus-spot-pdf-adrenal-crisis-hydrocortisone-001': [makeInvestigation('adrenal-crisis-electrolytes', 'Elektrolit ve glukoz paneli', 'lab', 'Na 126 mEq/L, K 5.8 mEq/L, glukoz 58 mg/dL. Hiponatremi, hiperpotasemi ve hipoglisemi primer adrenal krizle uyumludur.', ['Na 126 mEq/L, K 5.8 mEq/L ve glukoz 58 mg/dL acil glukokortikoid-mineralokortikoid eksen yetmezliğini destekler.'], 'essential', [['Sodyum','126 mEq/L','135–145','Düşük'],['Potasyum','5.8 mEq/L','3.5–5.0','Yüksek'],['Glukoz','58 mg/dL','70–100','Düşük']])],
  'tus-spot-pdf-factitious-thyrotoxicosis-low-tg-001': [makeInvestigation('thyrotoxicosis-source-panel', 'Tirotoksikoz kaynağı değerlendirmesi', 'lab', 'sT4 yüksek, TSH baskılı, TRAb negatif, tiroglobulin düşük ve radyoaktif iyot tutulumu baskılıdır.', ['Düşük tiroglobulin ve düşük radyoaktif iyot tutulumu eksojen tiroid hormonu alımını destekler.'], 'essential', [['sT4','Yüksek','Referans aralığı','Yüksek'],['TSH','Baskılı','0.4–4.0 mIU/L','Düşük'],['Tiroglobulin','Düşük','Beklenen yüksek/normal','Düşük'],['RAIU','Baskılı','Artmış veya normal olabilir','Düşük']])],
  'tus-spot-pdf-prolactinoma-hook-effect-dilution-001': [makeInvestigation('pituitary-mri-prolactin-dilution', 'Hipofiz MR ve dilüe prolaktin ölçümü', 'lab', 'MR’da 2 cm hipofiz makroadenomu izlenir; bazal prolaktin beklenenden düşükken dilüsyon sonrası belirgin yüksek ölçülür.', ['Makroadenom boyutuna göre düşük görünen prolaktin hook effect düşündürür.', 'Serum dilüsyonu yalancı düşük sonucu düzeltir.'], 'essential')],
  'tus-spot-pdf-cll-flow-cytometry-001': [makeInvestigation('cll-cbc-smear-flow', 'Hemogram, yayma ve akım sitometri', 'lab', 'Mutlak lenfositoz ve olgun küçük lenfositler izlenir; akım sitometride CD5+ CD23+ klonal B hücre popülasyonu saptanır.', ['Periferik kan akım sitometrisi KLL tanısı için temel testtir.'], 'essential', [['Mutlak lenfosit sayısı','8.900/mm³','<4.000/mm³','Yüksek'],['Akım sitometri','CD5+ CD23+ klonal B hücre','Poliklonal dağılım','Anormal']])],
  'tus-spot-pdf-aiha-direct-coombs-001': [makeInvestigation('aiha-hemolysis-coombs', 'Hemoliz paneli ve direkt Coombs', 'lab', 'Retikülositoz, LDH yüksekliği ve indirekt bilirubin artışı vardır; direkt Coombs testi IgG/C3 pozitif saptanır.', ['Hemoliz verileri aneminin yıkıma bağlı olduğunu; direkt Coombs otoimmün mekanizmayı destekler.'], 'essential', [['Retikülosit','Artmış','Normal','Yüksek'],['LDH','Yüksek','Referans aralığı','Yüksek'],['İndirekt bilirubin','Yüksek','Referans aralığı','Yüksek'],['Direkt Coombs','Pozitif','Negatif','Pozitif']])],
  'tus-spot-pdf-membranous-nephropathy-anti-pla2r-001': [makeInvestigation('membranous-biopsy-pla2r', 'Böbrek biyopsisi ve anti-PLA2R', 'pathology', 'Biyopsi membranöz nefropatiyle uyumludur; serum anti-PLA2R antikoru pozitif saptanır.', ['Anti-PLA2R pozitifliği primer membranöz nefropati lehine güçlü destek sağlar.'], 'essential')],
  'tus-spot-pdf-hyperkalemia-ecg-calcium-gluconate-001': [makeInvestigation('hyperkalemia-ecg-electrolyte', 'EKG ve elektrolit paneli', 'ecg', 'K+ 7.1 mEq/L; EKG’de sivri T dalgaları, P dalga basıklaşması ve QRS genişlemesi izlenir.', ['EKG değişikliği olan hiperpotasemide ilk hedef kardiyak membran stabilizasyonudur.'], 'essential', [['Potasyum','7.1 mEq/L','3.5–5.0','Yüksek'],['EKG','Sivri T, P dalga basıklaşması, QRS genişlemesi','Normal iletim','Kritik']])],
  'tus-spot-pdf-concussion-normal-ct-001': [makeInvestigation('concussion-noncontrast-ct', 'Kontrastsız kraniyal BT', 'ct', 'Akut intrakraniyal kanama, kitle etkisi veya kafatası kırığı saptanmaz.', ['Normal BT, geçici klinik fonksiyon bozukluğu ile birlikte konküzyonu destekler.'], 'useful')],
  'tus-spot-pdf-neonatal-erythema-toxicum-eosinophils-001': [makeInvestigation('erythema-toxicum-wright', 'Püstül materyali Wright boyası', 'pathology', 'Püstül içeriğinde bol eozinofil görülür; kültürde üreme olmaz.', ['Steril püstül ve eozinofil baskınlığı eritema toksikum için tipiktir.'], 'useful')],
  'tus-spot-pdf-fetomaternal-hemorrhage-kleihauer-betke-001': [makeInvestigation('neonatal-anemia-hemolysis-panel', 'Yenidoğan anemi ön değerlendirmesi', 'lab', 'Hemoglobin 6.2 g/dL; direkt Coombs negatif, periferik yaymada belirgin hemoliz bulgusu yoktur.', ['Hemoliz bulgusu olmadan ağır anemi fetal-maternal kan kaybını düşündürür.'], 'useful', [['Hemoglobin','6.2 g/dL','14–22 g/dL','Düşük'],['Direkt Coombs','Negatif','Negatif','Normal'],['Periferik yayma','Belirgin hemoliz bulgusu yok','Hemoliz saptanmamalı','Beklenen']]), makeInvestigation('kleihauer-betke', 'Kleihauer-Betke testi', 'lab', 'Maternal kanda fetal eritrositler saptanır; fetomaternal kanama lehinedir.', ['Kleihauer-Betke testi maternal dolaşımdaki fetal hemoglobini gösterir.'], 'essential')],
  'tus-spot-pdf-hie-therapeutic-hypothermia-001': [makeInvestigation('cord-gas-hie', 'Kord kan gazı', 'lab', 'pH 6.90 ve baz açığı -15 mmol/L; ağır metabolik asidoz perinatal asfiksi lehinedir.', ['Ağır asidoz ve ensefalopati bulguları terapötik hipotermi uygunluğunu destekler.'], 'essential', [['pH','6.90','7.25–7.35','Düşük'],['Baz açığı','-15 mmol/L','>-12 mmol/L','Kritik']])],
};

function weakTitle(c) {
  const t = String(c.title || '').trim();
  return !t || /^vaka\s*\d*$/i.test(t) || /spot soru|yeni vaka|tedavi sorusu|tanı$|hasta$|bilgisi$/i.test(t) || t.length < 10;
}

function cleanInvestigationText(inv) {
  const replacements = [
    [/klinik bağlam içinde değerlendirilir/gi, 'somut bulgularla birlikte raporlanır'],
    [/klinik senaryoya göre yorumlanır/gi, 'objektif sonuç üzerinden yorumlanır'],
    [/yardımcı bilgi sağlar/gi, 'karar sürecine destek verir'],
  ];
  for (const [from, to] of replacements) {
    if (typeof inv.summary === 'string') inv.summary = inv.summary.replace(from, to);
    if (Array.isArray(inv.findings)) inv.findings = inv.findings.map((x) => typeof x === 'string' ? x.replace(from, to) : x);
  }
  return inv;
}

for (const c of cases) {
  const wasSpot = c.branchId === 'tus-spot-olgular' || c.caseType === 'spot';
  const beforeVitalsCount = Object.keys(c.vitals || {}).length;
  const beforeExam = JSON.stringify(c.exam || []);
  const beforeInvCount = (c.investigations || []).length;

  if (Array.isArray(c.exam)) {
    const cleaned = dedupeArray(c.exam);
    if (JSON.stringify(cleaned) !== JSON.stringify(c.exam)) {
      c.exam = cleaned;
      stats.duplicateCleaned += 1;
      mark(c);
    }
  }

  if (titlePatches[c.id] && c.title !== titlePatches[c.id]) {
    c.title = titlePatches[c.id];
    stats.titleFixed += 1;
    mark(c);
  } else if (weakTitle(c)) {
    const fallback = c.chiefComplaint && c.chiefComplaint.length > 12 ? c.chiefComplaint : c.clinicalFocus?.split(/ ve |;|,/)[0] || 'Klinik karar olgusu';
    if (c.title !== fallback) {
      c.title = fallback;
      stats.titleFixed += 1;
      mark(c);
    }
  }

  if (spotTextPatches[c.id]) {
    for (const [key, value] of Object.entries(spotTextPatches[c.id])) {
      if (key === 'exam') continue;
      setIfChanged(c, key, value);
    }
  }

  if (vitalPatches[c.id]) {
    if (setIfChanged(c, 'vitals', vitalPatches[c.id])) stats.vitalsAdded += beforeVitalsCount === 0 ? 1 : 0;
  }

  if (examPatches[c.id]) {
    if (setIfChanged(c, 'exam', examPatches[c.id])) stats.examCleaned += 1;
  } else if (spotTextPatches[c.id]?.exam !== undefined) {
    if (setIfChanged(c, 'exam', spotTextPatches[c.id].exam)) stats.examCleaned += 1;
  }

  if (investigationPatches[c.id]) {
    const before = JSON.stringify(c.investigations || []);
    c.investigations = investigationPatches[c.id];
    if (JSON.stringify(c.investigations) !== before) {
      stats.investigationPlacementFixed += 1;
      mark(c);
    }
  }

  if (Array.isArray(c.investigations)) {
    c.investigations = c.investigations.map((inv) => cleanInvestigationText(inv));
    // TUS spot olgularında tetkik paneli hızlı karar için 0-2 hedef tetkikle sınırlı tutulur.
    if (wasSpot && c.investigations.length > 2) {
      c.investigations = c.investigations.slice(0, 2);
      stats.investigationsRemovedCases += 1;
      mark(c);
    }
  } else {
    c.investigations = [];
    mark(c);
  }

  if (wasSpot) {
    c.branchId = 'tus-spot-olgular';
    c.caseType = 'spot';
    c.questionType = normalizeQuestionType(c.questionType);
    if (!c.question && c.diagnosis?.question) c.question = c.diagnosis.question;
    if (c.question && c.diagnosis) c.diagnosis.question = c.question;
    if (c.diagnosis?.answerFeedback && c.clinicalFocus) c.diagnosis.answerFeedback.diagnosisMeta = c.clinicalFocus;
    if (c.managementSequence) {
      if (c.managementSequence.showInSpot !== false || c.managementSequence.enabled !== false) {
        c.managementSequence = { ...c.managementSequence, enabled: false, showInSpot: false };
        stats.managementHiddenInSpot += 1;
        mark(c);
      }
    }
    stats.spotFormatted += 1;
    // Spot olgularda gereksiz uzun fizik muayene kartlarını 1-3 karar verdirici bulguya indir.
    if (Array.isArray(c.exam) && c.exam.length > 3) {
      c.exam = dedupeArray(c.exam).slice(0, 3);
      stats.examCleaned += 1;
      mark(c);
    }
  }

  // Klasik vakalarda vital alan eksik kalırsa stabil değerlerle doldur; kritik vakalar için mevcut değerler korunur.
  if (!wasSpot && Object.keys(c.vitals || {}).length === 0) {
    c.vitals = { ...stableVitals };
    stats.vitalsAdded += 1;
    mark(c);
  }

  if (!c.exam) c.exam = [];
  if (JSON.stringify(c.exam || []) !== beforeExam || (beforeVitalsCount === 0 && Object.keys(c.vitals || {}).length > 0)) {
    stats.examOrVitalsAdded += 1;
  }
  if ((c.investigations || []).length < beforeInvCount) {
    stats.investigationsRemovedCases += 1;
  }
}

// Final pass: remove explicit non-physical placeholder exam strings from spot-only didactic items.
for (const c of cases) {
  if (c.branchId === 'tus-spot-olgular') {
    const cleaned = (c.exam || []).filter((x) => !/muayene gerektirmeyen sınav spotu|bulgu endoskopik değerlendirmede/i.test(x));
    if (JSON.stringify(cleaned) !== JSON.stringify(c.exam || [])) {
      c.exam = cleaned;
      stats.examCleaned += 1;
      mark(c);
    }
  }
}

// Integrity checks / lightweight validation.
const validation = {
  missingTitle: cases.filter((c) => !String(c.title || '').trim()).map((c) => c.id),
  missingQuestion: cases.filter((c) => !String(c.question || c.diagnosis?.question || '').trim()).map((c) => c.id),
  missingOptions: cases.filter((c) => !Array.isArray(c.diagnosis?.options) || c.diagnosis.options.length < 4 || !c.diagnosis.options.includes(c.diagnosis.correct)).map((c) => c.id),
  spotWithTooManyInvestigations: cases.filter((c) => c.branchId === 'tus-spot-olgular' && (c.investigations || []).length > 2).map((c) => c.id),
  spotManagementVisible: cases.filter((c) => c.branchId === 'tus-spot-olgular' && c.managementSequence?.showInSpot === true).map((c) => c.id),
};

const output = `// KlinikIQ vaka verisi: TUS odaklı, klinik karar verdirici ve objektif tetkik sonuçlarıyla yapılandırılmıştır.\n// Bu sürümde vaka içerikleri başlık, öykü, vital bulgu, fizik muayene, tetkik ve TUS Spot formatı açısından kalite kontrolden geçirilmiştir.\n\nexport const cases = ${JSON.stringify(cases, null, 2)};\n`;
writeFileSync('src/data/cases.js', output, 'utf8');
writeFileSync('CASE_CONTENT_QA_REPORT.json', JSON.stringify({
  ...stats,
  changedCaseIds: Array.from(stats.changedCaseIds).sort(),
  validation,
}, null, 2), 'utf8');

console.log(JSON.stringify({
  ...stats,
  changedCaseIds: Array.from(stats.changedCaseIds).sort(),
  validation,
}, null, 2));
