import fs from 'fs';
import { rawCases } from './src/data/cases.js';

const bannedWeak = [
  /Klinik bağlama göre/gi,
  /Objektif sonuç/gi,
  /Hedef görüntüleme/gi,
  /Genel durum, hedef sistem/gi,
  /Muayene bulguları klinik şüpheye göre/gi,
  /Yaş, komorbidite, semptom süresi/gi,
  /Karar verdirici laboratuvar veya görüntüleme sonucu/gi,
  /Kısa olgu/gi,
  /TUS spot olgu/gi,
  /Semptomun anatomik odağını/gi,
  /hedef sistem muayenesi/gi,
  /birlikte değerlendirilir\.?$/gi,
];

function cleanText(s='') {
  return String(s || '')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([.;!?])(?=[^\s])/g, '$1 ')
    .trim();
}
function sentenceSplit(text='') {
  return cleanText(text).split(/(?<=[.!?])\s+/).map(cleanText).filter(Boolean);
}
function firstSentences(text='', n=2) { return sentenceSplit(text).slice(0,n).join(' '); }
function slugify(s='') { return String(s).toLowerCase('tr').replace(/[^a-z0-9ığüşöçİĞÜŞÖÇ]+/gi,'-').replace(/^-|-$/g,''); }
function includesAny(hay, arr) { const h = (hay||'').toLowerCase('tr'); return arr.some(a => h.includes(a.toLowerCase('tr'))); }

function inv(id, label, type, purpose, summary, interpretation, values=[]) {
  return {
    id: slugify(id || label), label, type, priority: 'essential', subtype: '',
    purpose, summary, clinicalMeaning: interpretation,
    result: { title: label, summary, interpretation, values },
    postAnswerExplanation: interpretation
  };
}

function cleanCaseStrings(obj) {
  if (typeof obj === 'string') {
    let out = obj;
    bannedWeak.forEach((re) => { out = out.replace(re, '').trim(); });
    return cleanText(out);
  }
  if (Array.isArray(obj)) return obj.map(cleanCaseStrings).filter(v => !(typeof v === 'string' && !v.trim()));
  if (obj && typeof obj === 'object') return Object.fromEntries(Object.entries(obj).map(([k,v]) => [k, cleanCaseStrings(v)]));
  return obj;
}

const overrides = {
  'Kawasaki hastalığı': {
    profile: '3 yaşında erkek çocuk · Pediatri acil',
    presentation: 'Altı gündür düşmeyen ateş, gözlerde kızarıklık ve ağız-dudak değişiklikleri',
    stem: 'Üç yaşındaki erkek çocuk, altı gündür 39 °C’ye ulaşan ateş, huzursuzluk ve iştahsızlık nedeniyle getirilir. Ailesi gözlerinde çapaklanma olmadan kızarıklık, dudaklarda çatlama, dilde belirgin kızarıklık ve son iki gündür el-ayaklarda şişlik fark ettiğini belirtir.',
    risk: ['Ateşin beş günden uzun sürmesi ve mukokutanöz bulguların birlikte olması Kawasaki hastalığını ön plana çıkarır.', 'Tedavinin gecikmesi koroner arter dilatasyonu ve anevrizma riskini artırır.'],
    clues: ['Bilateral nonpürülan konjonktivit, çilek dili, dudak çatlakları ve ekstremite değişiklikleri aynı klinik patern içinde birleşir.', 'Kültürle açıklanamayan inflamasyon yüksekliği ve trombositoz tanıyı destekler; ekokardiyografi koroner tutulumu araştırır.'],
    exam: ['Çocuk huzursuzdur; bilateral nonpürülan konjonktivit, çatlamış dudaklar, çilek dili ve servikal lenfadenopati saptanır.', 'Avuç içi ve ayak tabanında ödem-eritem vardır; akciğer oskültasyonu doğaldır, meningeal irritasyon bulgusu yoktur.'],
    vitals: { TA: '92/58 mmHg', Nabız: '132/dk', Solunum: '24/dk', SpO2: '98%', Ateş: '39.1 °C' },
    investigations: [
      inv('kawasaki-inflamasyon', 'Hemogram, CRP ve eritrosit sedimentasyon hızı', 'lab', 'Sistemik inflamasyon ve subakut trombositoz paternini göstermek.', 'Lökositoz, belirgin CRP/ESR yüksekliği ve trombositoz vardır.', 'Steril olmayan enfeksiyonlardan çok sistemik vaskülit paternini destekler.', [['Lökosit','16.800/mm³','4.500–13.500','Yüksek'], ['Trombosit','585.000/mm³','150.000–450.000','Yüksek'], ['CRP','96 mg/L','<5','Yüksek'], ['ESR','74 mm/saat','<20','Yüksek']]),
      inv('kawasaki-echo', 'Ekokardiyografi', 'cardiac', 'Koroner arter tutulumu ve miyokard fonksiyonunu değerlendirmek.', 'Sol ön inen koroner arterde hafif dilatasyon izlenir.', 'Koroner etkilenim varlığı erken IVIG ve aspirin gereksinimini güçlendirir.', [['LAD z-skoru','+2,6','<+2','Dilatasyon'], ['Perikardiyal efüzyon','Yok','Yok','Normal']]),
      inv('kawasaki-idrar-alt', 'Tam idrar analizi ve karaciğer enzimleri', 'lab', 'Eşlik eden steril piyüri ve hepatobiliyer etkilenimi araştırmak.', 'Steril piyüri ve hafif ALT yüksekliği saptanır.', 'Bu bulgular Kawasaki hastalığında görülebilir; tek başına tanı koydurmaz.', [['Lökosit (idrar)','8–10/hpf','0–5','Artmış'], ['Nitrit','Negatif','Negatif','Normal'], ['ALT','68 U/L','<40','Hafif yüksek']])
    ],
    management: ['İntravenöz immünglobulin tedavisi geciktirilmez.', 'Aspirin tedavisi lokal protokol ve kardiyoloji değerlendirmesiyle başlanır.', 'Koroner arter takibi için ekokardiyografi planlanır.']
  },
  'Aspirin ve intravenöz immünglobulin': null,
  'Serotonin sendromu': {
    profile: '30 yaşında kadın · Acil servis',
    presentation: 'Antidepresan kombinasyonu sonrası ajitasyon, terleme ve klonus',
    stem: 'Otuz yaşındaki kadın hasta, depresyon tedavisine eklenen MAO inhibitöründen iki gün sonra ajitasyon, ateş, terleme, diyare ve titreme nedeniyle acile getirilir. Öyküsünde SSRI kullanımının sürdüğü öğrenilir.',
    risk: ['SSRI ve MAO inhibitörünün birlikte kullanılması sinaptik serotonin düzeyini tehlikeli biçimde artırır.', 'Belirtilerin ilaca başlandıktan kısa süre sonra ortaya çıkması toksidrom ayrımında önemlidir.'],
    clues: ['Alt ekstremitelerde klonus ve hiperrefleksi serotonin sendromunu nöroleptik malign sendromdan ayırır.', 'Terleme, diyare, ateş ve ajitasyon otonomik ve nöromüsküler aktivasyonu aynı anda gösterir.'],
    exam: ['Hasta ajite ve terlidir; alt ekstremitelerde belirgin klonus, hiperrefleksi ve tremor saptanır.', 'Kas rijiditesi kurşun boru tarzında değildir; pupiller mid-dilate, barsak sesleri artmıştır.'],
    vitals: { TA: '148/86 mmHg', Nabız: '122/dk', Solunum: '22/dk', SpO2: '97%', Ateş: '38.7 °C' },
    investigations: [
      inv('serotonin-ilaç', 'İlaç maruziyeti ve yatak başı toksidrom değerlendirmesi', 'toxicology', 'Serotonerjik ilaç kombinasyonunu ve nöromüsküler bulguları doğrulamak.', 'SSRI kullanımı sürerken MAO inhibitörü başlanmıştır; klonus ve hiperrefleksi belirgindir.', 'Tanı çoğunlukla kliniktir; laboratuvar toksidromu dışlamaz.', [['SSRI kullanımı','Var','Yok','Risk'], ['MAO inhibitörü','Yeni başlanmış','Yok','Risk'], ['Klonus','Belirgin','Yok','Kritik']]),
      inv('serotonin-temel', 'Temel biyokimya ve kreatin kinaz', 'lab', 'Hipertermiye bağlı rabdomiyoliz ve organ etkilenimini izlemek.', 'Kreatin kinaz hafif-orta yüksek, kreatinin normaldir.', 'Komplikasyon izlemi sağlar; tanı için klonus öyküden daha değerlidir.', [['CK','780 U/L','<200','Yüksek'], ['Kreatinin','0,8 mg/dL','0,6–1,2','Normal'], ['Sodyum','138 mEq/L','135–145','Normal']])
    ],
    management: ['Serotonerjik ilaçlar kesilir.', 'Destek tedavisi, benzodiazepin ve soğutma uygulanır.', 'Orta-ağır olguda siproheptadin düşünülür.']
  },
  'Siproheptadin': null,
  'Akciğer tüberkülozu': {
    profile: '42 yaşında erkek · Göğüs hastalıkları polikliniği',
    presentation: 'Üç haftadan uzun öksürük, gece terlemesi ve hemoptizi',
    risk: ['Uzamış öksürük, kilo kaybı ve gece terlemesi bulaştırıcı akciğer tüberkülozu açısından uyarıcıdır.', 'Apikal kavite varlığı aktif hastalık ve damlacık izolasyonu gereksinimini artırır.'],
    clues: ['Üst lob kavitesi reaktivasyon tüberkülozu için tipik görüntüleme bulgusudur.', 'Balgamda aside dirençli basil pozitifliği tanıyı mikrobiyolojik olarak destekler.'],
    exam: ['Hasta zayıf görünümlüdür; sağ üst zonda solunum sesleri azalmış ve ince raller duyulur.', 'Servikal belirgin lenfadenopati yoktur; oksijen satürasyonu istirahatte korunmuştur.'],
    investigations: [
      inv('tb-balgam', 'Balgam ARB yayması ve NAAT', 'microbiology', 'M. tuberculosis kompleksini hızlı göstermek ve bulaştırıcılığı değerlendirmek.', 'Balgam yaymasında ARB pozitif; NAAT M. tuberculosis kompleks pozitif saptanır.', 'Aktif akciğer tüberkülozunu destekler ve tedavi/izolasyon kararını belirler.', [['ARB yayması','Pozitif','Negatif','Kritik'], ['NAAT','M. tuberculosis pozitif','Negatif','Kritik']]),
      inv('tb-akciger', 'Akciğer grafisi', 'imaging', 'Kavite, infiltrasyon ve hastalık yaygınlığını değerlendirmek.', 'Sağ üst lobda kaviter infiltrasyon izlenir.', 'Apikal kaviter lezyon reaktivasyon tüberkülozu lehinedir.', [['Üst lob','Kaviter infiltrasyon','Normal','Anormal']]),
      inv('tb-lab', 'Hemogram ve inflamasyon belirteçleri', 'lab', 'Sistemik inflamasyon ve tedavi öncesi bazal değerleri görmek.', 'Hafif anemi ve CRP yüksekliği vardır.', 'Destekleyicidir; kesin tanı mikrobiyolojik doğrulamaya dayanır.', [['Hemoglobin','11,4 g/dL','13–17','Düşük'], ['CRP','48 mg/L','<5','Yüksek']])
    ]
  },
  'Acil hava yolu güvenliği': {
    profile: '4 yaşında kız çocuk · Pediatrik acil',
    stem: 'Dört yaşındaki kız çocuk yüksek ateş, boğaz ağrısı, salya akması ve yutamama nedeniyle acile getirilir. Çocuk öne eğilerek oturmakta, ağzını açık tutmakta ve muayene sırasında ajite olmaktadır.',
    risk: ['Ani başlayan toksik görünüm ve salya akması epiglottitte hava yolu tıkanma riskini gösterir.', 'Orofarenksi zorlayıcı muayene veya gereksiz ajitasyon laringospazmı tetikleyebilir.'],
    clues: ['Tripod pozisyonu, disfaji ve boğuk ses krup yerine supraglottik obstrüksiyonu düşündürür.', 'Öncelik tanısal görüntüleme değil güvenli hava yolunun deneyimli ekipçe sağlanmasıdır.'],
    exam: ['Çocuk toksik görünümlüdür; tripod pozisyonunda oturur, salyası akar ve konuşması boğuktur.', 'İnspiratuvar stridor vardır; ağız içi zorla muayene edilmez.'],
    vitals: { TA: '92/58 mmHg', Nabız: '144/dk', Solunum: '32/dk', SpO2: '94%', Ateş: '39.4 °C' },
    investigations: [
      inv('epiglottit-abc', 'Yatak başı hava yolu değerlendirmesi', 'exam', 'Hava yolu obstrüksiyonu ve entübasyon gereksinimini belirlemek.', 'Stridor, salya akması ve tripod pozisyonu saptanır.', 'Bu tablo stabil görüntüleme beklemeden hava yolu güvenliğini önceliklendirir.', [['Stridor','Var','Yok','Kritik'], ['Salya akması','Var','Yok','Kritik'], ['Tripod pozisyonu','Var','Yok','Kritik']]),
      inv('epiglottit-kan', 'Kan kültürü ve hemogram', 'lab', 'Antibiyotik öncesi etken ve inflamasyon düzeyini değerlendirmek.', 'Lökositoz ve nötrofili vardır.', 'Tedavi planını destekler; hava yolu güvenliği geciktirilmez.', [['Lökosit','19.200/mm³','4.500–13.500','Yüksek'], ['Nötrofil','%86','%40–70','Yüksek']])
    ]
  },
  'Acil iğne dekompresyonu': {
    profile: '27 yaşında erkek · Travma acili',
    stem: 'Motosiklet kazası sonrası getirilen hastada ani dispne, hipotansiyon ve sağ hemitoraksta solunum sesi kaybı gelişir. Boyun venleri belirgindir ve trakea sola deviyedir.',
    risk: ['Künt toraks travması sonrası tek taraflı hava hapsi venöz dönüşü hızla azaltabilir.', 'Hipotansiyon ve solunum sesi kaybı birlikteyse görüntüleme beklemek dolaşım kollapsını derinleştirir.'],
    clues: ['Trakeal deviasyon, juguler venöz dolgunluk ve tek taraflı solunum sesi kaybı tansiyon pnömotoraks için ayırt ettiricidir.', 'Tedavi tanısal doğrulamadan önce acil dekompresyondur.'],
    exam: ['Sağ hemitoraksta solunum sesi alınmaz; perküsyonda hipersonorite vardır.', 'Boyun venleri dolgun, trakea sola deviye ve hasta belirgin dispneiktir.'],
    vitals: { TA: '78/46 mmHg', Nabız: '136/dk', Solunum: '34/dk', SpO2: '86%', Ateş: '36.5 °C' },
    investigations: [inv('pnomotoraks-abc','Yatak başı travma değerlendirmesi','exam','Solunum-dolaşım bozukluğunun acil nedenini belirlemek.','Sağda solunum sesi kaybı, hipersonorite ve trakeal deviasyon vardır.','Klinik tanı yeterlidir; dekompresyon görüntüleme için bekletilmez.', [['Sağ solunum sesi','Yok','Simetrik','Kritik'], ['Trakea','Sola deviye','Orta hatta','Kritik'], ['TA','78/46 mmHg','>90 sistolik','Şok']])]
  },
  'Acil cerrahi eksplorasyon': {
    profile: '15 yaşında erkek · Acil servis',
    stem: 'On beş yaşındaki erkek hasta ani başlayan şiddetli sol testis ağrısı ve bulantı ile başvurur. Ağrı istirahatte başlamıştır ve skrotal elevasyonla rahatlamaz.',
    risk: ['Ergen erkek hastada ani skrotal ağrı testis canlılığı açısından zamana duyarlı acildir.', 'Cerrahi gecikme iskemi süresini uzatarak testis kaybı riskini artırır.'],
    clues: ['Yüksek yerleşimli testis ve kremaster refleksinin kaybı torsiyon lehinedir.', 'Klinik şüphe yüksekse Doppler sonucu için cerrahi geciktirilmez.'],
    exam: ['Sol testis yüksek yerleşimli ve hassastır; kremaster refleksi alınmaz.', 'Skrotumda eritem hafiftir; ateş ve belirgin üretral akıntı yoktur.'],
    vitals: { TA: '118/72 mmHg', Nabız: '98/dk', Solunum: '18/dk', SpO2: '99%', Ateş: '36.9 °C' },
    investigations: [inv('testis-doppler','Skrotal Doppler ultrasonografi','imaging','Kan akımını değerlendirmek; cerrahi hazırlığı geciktirmeden destek almak.','Sol testiste arteriyel akım belirgin azalmıştır.','Akım kaybı torsiyonu destekler; yüksek klinik şüphede acil eksplorasyon gerekir.', [['Sol testis arteriyel akım','Azalmış/yok','Normal akım','Kritik'], ['Hidrosel','Minimal','Yok','Destekleyici']])]
  },
  'Lomber ponksiyon öncesi antibiyotiği geciktirmeme': {
    profile: '19 yaşında erkek · Acil servis',
    stem: 'On dokuz yaşındaki hasta ateş, ense sertliği, peteşi ve bilinç bulanıklığı ile acile getirilir. Muayenede meningokoksemi düşünülür ve hasta hızla kötüleşmektedir.',
    risk: ['Bilinç değişikliği ve peteşi bakteriyel menenjit/meningokoksemi açısından mortalite riski taşır.', 'Antibiyotik gecikmesi prognozu kötüleştirir; BOS işlemi yapılamıyorsa tedavi bekletilmez.'],
    clues: ['Ateş, ense sertliği, peteşi ve mental durum değişikliği bakteriyel menenjit lehinedir.', 'Kan kültürü alınabilir; ancak ampirik tedavi lomber ponksiyon gecikmesine bağlanmaz.'],
    exam: ['Hasta somnolandır; ense sertliği, fotofobi ve yaygın peteşiyal döküntü vardır.', 'Kapiller dolum uzamış ve ekstremiteler soğuktur.'],
    vitals: { TA: '92/54 mmHg', Nabız: '128/dk', Solunum: '26/dk', SpO2: '96%', Ateş: '39.2 °C' },
    investigations: [inv('menenjit-kan','Kan kültürü ve hemogram','lab','Antibiyotik öncesi etken ve sepsis bulgularını değerlendirmek.','Lökositoz, nötrofili ve CRP yüksekliği vardır; kan kültürü alınır.','Kültür alınması uygundur fakat antibiyotik geciktirilmez.', [['Lökosit','21.000/mm³','4.000–10.000','Yüksek'], ['CRP','142 mg/L','<5','Yüksek']])]
  },
  'Acil perkütan koroner girişim': null,
  'İnsülin ve dekstroz': null,
  'Trombolitik tedavi': null,
  'Acil kontrastlı BT anjiyografi': null,
  'Acil hidrokortizon': null,
  'İntramüsküler adrenalin': null,
};
// alias overrides sharing keys
for (const [k,v] of Object.entries({
  'Aspirin ve intravenöz immünglobulin':'Kawasaki hastalığı',
  'Siproheptadin':'Serotonin sendromu',
  'Hava yolu, solunum ve dolaşımın değerlendirilmesi':'travmaABC',
  'Glukoz ölçümü':'glucose',
  'İdrar beta-hCG testi':'betahcg',
  'Temas sonrası kuduz profilaksisi':'rabies',
  'Acil debridman ve geniş spektrumlu antibiyotik':'necfas',
  'Hızlı ritim değerlendirmesi ve defibrilasyon hazırlığı':'unstableVt',
  'Acil perkütan koroner girişim':'stemiReperf',
  'İnsülin ve dekstroz':'hyperkalShift',
  'Trombolitik tedavi':'massivePE',
  'Acil kontrastlı BT anjiyografi':'aorticCTA',
  'Metotreksat':'ectopicMTX',
  'Magnezyum sülfat':'eclampsiaMg',
  'K vitamini':'vitKnewborn',
  'Fototerapi':'phototherapy',
  'Hızlı sıvı bolusu':'hypovolemicShock',
  'Acil cerrahi debridman ve geniş spektrumlu antibiyotik':'necfas',
  'Acil fasiyotomi':'fasciotomy',
  'Acil hidrokortizon':'adrenalHydro',
  'İntramüsküler adrenalin':'anaphylaxisEpi'
})) {
  if (v === 'Kawasaki hastalığı') overrides[k] = overrides['Kawasaki hastalığı'];
  if (v === 'Serotonin sendromu') overrides[k] = overrides['Serotonin sendromu'];
}

const miniOverrides = {
  travmaABC: {
    profile: '34 yaşında erkek · Travma acili', stem: 'Yüksek hızlı trafik kazası sonrası getirilen hastada bilinç dalgalanması, yüz travması ve aktif kanama şüphesi vardır. Olay yerinde kısa süreli hipotansiyon bildirilmektedir.',
    risk: ['Çoklu travmada hava yolu tıkanması, ventilasyon bozukluğu ve kanama aynı anda yaşamı tehdit eder.', 'İlk yaklaşım ayrıntılı tanı koymak değil, ABCDE sıralamasıyla geri döndürülebilir ölümleri engellemektir.'],
    clues: ['Sesli yanıtın azalması ve yüz travması hava yolu güvenliği açısından uyarıcıdır.', 'Hipotansiyon öyküsü dolaşım ve kanama kontrolünün erken ele alınmasını gerektirir.'],
    exam: ['Hasta ajitedir; yüzde kanama, sekresyon ve mandibula hassasiyeti vardır.', 'Solunum sesleri iki taraflı alınır; pelvis kompresyonunda ağrı, distal nabızlar zayıftır.'],
    vitals: { TA:'88/52 mmHg', Nabız:'132/dk', Solunum:'28/dk', SpO2:'91%', Ateş:'36.4 °C'}, investigations:[inv('travma-primary','ABCDE birincil bakı','exam','Yaşamı tehdit eden hava yolu, solunum ve dolaşım problemlerini saptamak.','Hava yolu sekresyonla riskli, dolaşım hipotansiftir.','Travmada ilk karar ABCDE ile verilir; ayrıntılı görüntüleme stabilizasyon sonrası gelir.', [['Hava yolu','Sekresyon/kan var','Açık','Riskli'], ['TA','88/52 mmHg','>90 sistolik','Şok'], ['SpO₂','91%','>94%','Düşük']])]
  },
  glucose: {profile:'68 yaşında kadın · Acil servis', stem:'Altmış sekiz yaşındaki hasta evde bilinç bulanıklığı ve terleme ile bulunur. Yakınlarından diyabet nedeniyle insülin kullandığı, öğün atladığı öğrenilir.', risk:['Bilinç değişikliğinde hipoglisemi hızlı, geri döndürülebilir ve yaşamı tehdit eden bir nedendir.', 'Fokal bulgu net değilken yatak başı glukoz ölçümü ilk dakikalarda yapılmalıdır.'], clues:['Soğuk terleme, taşikardi ve insülin kullanımı hipoglisemi olasılığını artırır.', 'Glukoz düzeyi düşükse nörolojik görüntüleme öncesi düzeltme gerekir.'], exam:['Hasta konfüzedir, soğuk terli ve taşikardiktir; lateralizan belirgin kuvvet kaybı yoktur.','Pupiller izokorik, ense sertliği yoktur.'], vitals:{TA:'138/78 mmHg',Nabız:'112/dk',Solunum:'18/dk',SpO2:'98%',Ateş:'36.5 °C'}, investigations:[inv('poc-glucose','Yatak başı kapiller glukoz','lab','Bilinç değişikliğinin hızla düzeltilebilir metabolik nedenini dışlamak.','Kapiller glukoz belirgin düşüktür.','Hipoglisemi saptanırsa dekstroz tedavisi geciktirilmez.', [['Kapiller glukoz','38 mg/dL','70–100','Kritik düşük']])]},
  betahcg: {profile:'26 yaşında kadın · Acil servis', stem:'Yirmi altı yaşındaki kadın ani başlayan alt karın ağrısı ve hafif vajinal lekelenme ile başvurur. Son adet tarihini net hatırlamamaktadır.', risk:['Üreme çağındaki her kadında akut karında gebelik durumu ilk dakikalarda belirlenmelidir.', 'Gebelik saptanırsa ektopik gebelik, over torsiyonu ve abortus ayırıcı tanısı değişir.'], clues:['Adet gecikmesinin belirsiz olması gebelik olasılığını dışlamaz.', 'Pelvik ağrı ve lekelenme ektopik gebelik açısından uyarıcıdır.'], exam:['Alt batında hassasiyet vardır; defans yoktur.', 'Servikal hareket hassasiyeti hafiftir, aktif yoğun kanama izlenmez.'], vitals:{TA:'108/70 mmHg',Nabız:'96/dk',Solunum:'18/dk',SpO2:'99%',Ateş:'36.8 °C'}, investigations:[inv('urine-bhcg','İdrar beta-hCG','lab','Gebelik varlığını hızlı değerlendirmek.','İdrar beta-hCG pozitiftir.','Pozitiflik, ektopik gebelik açısından transvajinal ultrasonografi ve serum beta-hCG değerlendirmesini gerektirir.', [['İdrar beta-hCG','Pozitif','Negatif','Kritik']])]},
  rabies: {profile:'11 yaşında erkek · Acil servis', stem:'On bir yaşındaki çocuk sokakta sahipsiz bir köpek tarafından baldırından ısırılır. Yara derindir, kanamış ve hayvan yakalanamamıştır.', risk:['Sahipsiz ve gözlenemeyen hayvan ısırığında kuduz temas riski vardır.', 'Profilaksi kararı yaranın derinliği, temas tipi ve hayvanın izlenebilirliğiyle verilir.'], clues:['Kanamalı derin ısırık kategori III temas kabul edilir.', 'Hayvanın gözlem altına alınamaması aşı ve immünglobulin gereksinimini güçlendirir.'], exam:['Baldırda düzensiz kenarlı, kontamine ve kanamalı ısırık yarası vardır.', 'Nörovasküler defisit yoktur; çevrede hafif ekimoz izlenir.'], vitals:{TA:'104/66 mmHg',Nabız:'98/dk',Solunum:'18/dk',SpO2:'99%',Ateş:'36.7 °C'}, investigations:[inv('rabies-wound','Yara ve temas sınıflaması','exam','Kuduz profilaksisi düzeyini belirlemek.','Derin, kanamalı ve kontamine kategori III temas saptanır.','Yara bakımı, aşı ve kuduz immünglobulini birlikte planlanır.', [['Temas tipi','Derin ısırık','Yüzeyel temas değil','Kategori III'], ['Hayvan durumu','Gözlenemiyor','10 gün izlenebilir','Riskli']])]},
  necfas: {profile:'56 yaşında erkek · Acil servis', stem:'Diyabeti olan hasta bacakta hızla yayılan kızarıklık, bül oluşumu ve şiddetli ağrı nedeniyle başvurur. Ağrı muayene bulgularından belirgin fazladır.', risk:['Diyabet ve hızlı ilerleyen yumuşak doku enfeksiyonu nekrotizan fasiit riskini artırır.', 'Cerrahi kaynak kontrolü gecikirse sepsis ve ekstremite kaybı riski hızla artar.'], clues:['Ağrının muayeneye göre orantısız olması, bül ve krepitasyon nekrotizan enfeksiyon lehinedir.', 'Antibiyotik tek başına yeterli değildir; acil debridman gerekir.'], exam:['Bacakta yaygın eritem, hemorajik büller, palpasyonla krepitasyon ve çok şiddetli hassasiyet vardır.', 'Distal nabız alınır ancak hasta toksik görünümlüdür.'], vitals:{TA:'92/56 mmHg',Nabız:'126/dk',Solunum:'24/dk',SpO2:'96%',Ateş:'39.0 °C'}, investigations:[inv('necfas-lab','Hemogram, CRP ve laktat','lab','Sepsis ve doku hipoperfüzyonunu değerlendirmek.','Lökositoz, yüksek CRP ve laktat artışı vardır.','Laboratuvar destekleyicidir; cerrahi geciktirilmez.', [['Lökosit','24.500/mm³','4.000–10.000','Yüksek'], ['CRP','220 mg/L','<5','Çok yüksek'], ['Laktat','4,1 mmol/L','<2','Yüksek']]), inv('necfas-bt','Yumuşak doku BT','imaging','Fasyal gaz ve derin doku yayılımını göstermek.','Fasya planları boyunca gaz dansiteleri izlenir.','Gaz görülmesi tanıyı destekler; negatif görüntüleme yüksek şüphede cerrahiyi dışlamaz.', [['Fasyal gaz','Var','Yok','Kritik']])]},
  unstableVt: {profile:'66 yaşında erkek · Acil servis', stem:'Altmış altı yaşındaki hasta çarpıntı, göğüs ağrısı ve presenkop ile getirilir. Monitörde geniş QRS taşikardi izlenirken kan basıncı düşüktür.', risk:['Geniş QRS taşikardide hipotansiyon hemodinamik instabiliteyi gösterir.', 'İnstabil hastada ilaç denemeleri yerine senkronize elektriksel kardiyoversiyon önceliklidir.'], clues:['Bilinç bulanıklığı, göğüs ağrısı ve sistolik hipotansiyon ritmin tolere edilmediğini gösterir.', 'Geniş kompleks düzenli taşikardi ventriküler taşikardi kabul edilerek yönetilir.'], exam:['Hasta soluk ve terlidir; periferik nabızlar zayıf, mental durumu dalgalıdır.', 'Akciğerlerde belirgin raller yoktur; karotis masajı denenmez.'], vitals:{TA:'76/48 mmHg',Nabız:'178/dk',Solunum:'24/dk',SpO2:'93%',Ateş:'36.6 °C'}, investigations:[inv('wideqrs-ekg','12 derivasyon EKG/monitör ritmi','ecg','Ritmin geniş kompleks taşikardi olup olmadığını belirlemek.','Düzenli geniş QRS taşikardi izlenir.','Hipotansiyonla birlikteyse acil senkronize kardiyoversiyon gerekir.', [['QRS','Geniş','<120 ms','Anormal'], ['Ritim','Düzenli taşikardi','Sinüs ritmi','Kritik']])]},
  stemiReperf: {profile:'58 yaşında erkek · Acil servis', stem:'Elli sekiz yaşındaki erkek hasta 70 dakikadır süren sol kola yayılan baskı tarzında göğüs ağrısı ve soğuk terleme ile başvurur. EKG’de ardışık anterior derivasyonlarda ST elevasyonu vardır ve perkütan girişim yapabilen merkezdedir.', risk:['Semptom süresi kısa olan STEMI’de miyokard kurtarımı reperfüzyon hızına bağlıdır.', 'Primer perkütan koroner girişime zamanında ulaşılabiliyorsa tercih edilen reperfüzyon stratejisidir.'], clues:['Tipik iskemik göğüs ağrısı ve komşu derivasyonlarda ST elevasyonu STEMI tanısını koydurur.', 'Troponin beklemek reperfüzyon kararını geciktirmemelidir.'], exam:['Hasta soğuk terli ve huzursuzdur; kalp sesleri ritmik, akciğerlerde belirgin raller yoktur.', 'Periferik nabızlar simetriktir; aort diseksiyonu lehine nabız farkı saptanmaz.'], vitals:{TA:'148/88 mmHg',Nabız:'104/dk',Solunum:'20/dk',SpO2:'96%',Ateş:'36.7 °C'}, investigations:[inv('stemi-ekg','12 derivasyon EKG','ecg','ST elevasyonu paternini göstermek.','V2-V5 derivasyonlarında ST elevasyonu vardır.','STEMI tanısında acil primer PKG planlanır.', [['V2-V5','ST elevasyonu','İzoelektrik','Kritik']])]},
  hyperkalShift: {profile:'54 yaşında erkek · Acil servis', stem:'Kronik böbrek hastalığı olan hasta halsizlik ve kas güçsüzlüğü ile başvurur. EKG’de sivri T dalgaları ve QRS genişlemesi nedeniyle önce intravenöz kalsiyum uygulanmıştır.', risk:['Ciddi hiperkalemi ölümcül aritmi riski taşır.', 'Kalsiyum membranı stabilize eder; potasyumu geçici olarak hücre içine kaydırmak için insülin-dekstroz gerekir.'], clues:['Kronik böbrek hastalığı, potasyum yüksekliği ve EKG değişiklikleri ağır hiperkalemiyi gösterir.', 'İnsülin-dekstroz serum potasyumunu hızlı ama geçici olarak düşürür.'], exam:['Hasta güçsüz ve bradikardiye eğilimlidir; belirgin sıvı yüklenmesi yoktur.', 'Nörolojik muayenede yaygın kas güçsüzlüğü dışında fokal defisit saptanmaz.'], vitals:{TA:'132/76 mmHg',Nabız:'58/dk',Solunum:'18/dk',SpO2:'97%',Ateş:'36.6 °C'}, investigations:[inv('hyperkal-lab','Elektrolit ve böbrek fonksiyonları','lab','Potasyum düzeyi ve böbrek yetmezliğini değerlendirmek.','Potasyum kritik yüksek, kreatinin belirgin yüksektir.','Kalsiyum sonrası insülin-dekstroz hücre içi kaydırma sağlar.', [['Potasyum','7,1 mEq/L','3,5–5,0','Kritik yüksek'], ['Kreatinin','6,8 mg/dL','0,6–1,2','Yüksek']]), inv('hyperkal-ekg','EKG','ecg','Hiperkaleminin kardiyak etkisini görmek.','Sivri T dalgaları ve QRS genişlemesi izlenir.','EKG değişikliği varsa IV kalsiyum ilk stabilizasyon basamağıdır.', [['T dalgası','Sivri','Normal','Anormal'], ['QRS','Geniş','<120 ms','Anormal']])]},
  massivePE: {profile:'63 yaşında kadın · Acil servis', stem:'Kalça protezi ameliyatından iki hafta sonra ani dispne ve senkopla getirilen hastanın kan basıncı düşüktür. Ekokardiyografide sağ ventrikül dilatasyonu ve basınç yüklenmesi izlenir.', risk:['Yakın dönem cerrahi ve immobilizasyon venöz tromboemboli riskini artırır.', 'Şok ve sağ ventrikül yüklenmesi yüksek riskli pulmoner emboliyi gösterir.'], clues:['Ani dispne, senkop, hipoksemi ve hipotansiyon masif emboli lehinedir.', 'Sağ ventrikül dilatasyonu tedavi kararını tromboliz yönüne taşır.'], exam:['Hasta dispneik ve soluktur; juguler venöz dolgunluk vardır, akciğer oskültasyonu belirgin odak vermeyebilir.', 'Sağ baldırda hassasiyet ve çap farkı izlenir.'], vitals:{TA:'78/50 mmHg',Nabız:'132/dk',Solunum:'30/dk',SpO2:'84%',Ateş:'36.8 °C'}, investigations:[inv('pe-echo','Yatak başı ekokardiyografi','cardiac','Şokta sağ ventrikül yüklenmesini hızlı değerlendirmek.','Sağ ventrikül dilate ve hipokinetiktir.','Hemodinamik instabil PE’de trombolitik tedaviyi destekler.', [['Sağ ventrikül','Dilate','Normal','Kritik'], ['TAPSE','Azalmış','Normal','Anormal']]), inv('pe-ctpa','BT pulmoner anjiyografi','imaging','Stabilize edilebilen hastada emboliyi doğrulamak.','Ana pulmoner arter dallarında dolum defekti izlenir.','Görüntüleme PE tanısını doğrular; şokta tedavi geciktirilmez.', [['Pulmoner arter','Dolum defekti','Yok','Kritik']])]},
  aorticCTA: {profile:'62 yaşında erkek · Acil servis', stem:'Hipertansiyonu olan hasta ani başlayan yırtılır tarzda göğüs-sırt ağrısı ile başvurur. Sağ ve sol kolda kan basıncı farkı vardır; akciğer grafisinde mediasten geniştir.', risk:['Kontrolsüz hipertansiyon aort duvar stresini artırır.', 'Nabız/kan basıncı farkı ve mediasten genişliği diseksiyon şüphesini güçlendirir.'], clues:['Yırtılır tarzda ağrının sırta yayılması akut aort sendromu için tipiktir.', 'Stabil hastada tanıyı doğrulamak için kontrastlı BT anjiyografi uygundur.'], exam:['Üst ekstremiteler arasında belirgin kan basıncı farkı vardır; sağ radiyal nabız zayıftır.', 'Yeni diyastolik üfürüm hafif duyulur, nörolojik defisit yoktur.'], vitals:{TA:'178/96 mmHg',Nabız:'104/dk',Solunum:'20/dk',SpO2:'97%',Ateş:'36.5 °C'}, investigations:[inv('aorta-cta','Kontrastlı BT anjiyografi','imaging','Diseksiyon flebi, yayılım ve dallanma tutulumunu göstermek.','Asendan aortadan başlayan intimal flep izlenir.','Stabil hastada aort diseksiyonunu doğrulayan temel görüntülemedir.', [['İntimal flep','Var','Yok','Kritik'], ['Mediasten','Geniş','Normal','Destekleyici']])]},
  ectopicMTX: {profile:'28 yaşında kadın · Acil servis', stem:'Altı haftalık gebeliği olan hasta hafif alt karın ağrısı ve lekelenmeyle başvurur. Hemodinamik olarak stabildir; transvajinal ultrasonografide küçük, rüptüre olmayan tubal ektopik odak izlenir ve fetal kardiyak aktivite yoktur.', risk:['Stabil ve seçilmiş ektopik gebelikte medikal tedavi cerrahiye alternatif olabilir.', 'Rüptür, hemodinamik instabilite veya takip uyumsuzluğu metotreksat için uygun değildir.'], clues:['Küçük tubal odak, fetal kardiyak aktivite olmaması ve stabil vital bulgular metotreksat uygunluğunu destekler.', 'Seri beta-hCG izlemi tedavi yanıtını değerlendirmek için gereklidir.'], exam:['Alt batında hafif hassasiyet vardır; rebound ve defans yoktur.', 'Spekulumda az miktarda koyu renkli kanama izlenir.'], vitals:{TA:'112/70 mmHg',Nabız:'88/dk',Solunum:'16/dk',SpO2:'99%',Ateş:'36.8 °C'}, investigations:[inv('ectopic-tvus','Transvajinal ultrasonografi','imaging','İntrauterin gebelik ve ektopik odak varlığını değerlendirmek.','Uterus içinde gebelik kesesi yok; sağ tubada 2,4 cm ektopik odak vardır.','Stabil seçilmiş olguda metotreksat düşünülebilir.', [['Tubal odak','2,4 cm','Yok','Anormal'], ['Fetal kardiyak aktivite','Yok','Yok','Uygun']]), inv('ectopic-bhcg','Serum beta-hCG','lab','Tanı ve takip için başlangıç düzeyini belirlemek.','Beta-hCG düşük-orta düzeydedir.', 'Takipte düşüş beklenir; yükselme tedavi başarısızlığını düşündürür.', [['Beta-hCG','2.800 IU/L','Gebelik haftasına göre','Takip gerekir']])]},
  eclampsiaMg: {profile:'29 yaşında 34 haftalık gebe · Doğumhane', stem:'Otuz dördüncü gebelik haftasındaki hasta baş ağrısı, görme bulanıklığı ve epigastrik ağrı sonrası jeneralize tonik-klonik nöbet geçirir. Kan basıncı yüksek ve idrarda protein pozitiftir.', risk:['Preeklampsi zemininde nöbet gelişmesi eklampsi tanımıdır.', 'Nöbet kontrolü ve tekrarlamasını önleme anne ve fetüs güvenliği açısından önceliklidir.'], clues:['Şiddetli hipertansiyon, proteinüri ve nöbet eklampsiyi gösterir.', 'Magnezyum sülfat nöbet profilaksisi ve tedavisinde ilk seçenektir.'], exam:['Hasta postiktal dönemdedir; derin tendon refleksleri canlıdır, klonus saptanır.', 'Sağ üst kadranda hassasiyet vardır; akciğer oskültasyonunda raller yoktur.'], vitals:{TA:'168/108 mmHg',Nabız:'104/dk',Solunum:'20/dk',SpO2:'97%',Ateş:'36.7 °C'}, investigations:[inv('eclampsia-lab','Tam kan, karaciğer enzimleri ve proteinüri','lab','HELLP bulgusu ve böbrek-karaciğer etkilenimini değerlendirmek.','Proteinüri belirgin, AST/ALT hafif yüksek, trombosit sınırdadır.','Eklampsi yönetiminde magnezyum ve doğum planı geciktirilmez.', [['Protein/kreatinin','0,8','<0,3','Yüksek'], ['Trombosit','118.000/mm³','150.000–450.000','Düşük'], ['AST','78 U/L','<35','Yüksek']])]},
  vitKnewborn: {profile:'Term yenidoğan · Doğum salonu', stem:'Zamanında doğan sağlıklı yenidoğana doğum sonrası kanama profilaksisi planlanır. Anne gebelikte antikoagülan kullanmamıştır ve bebekte aktif kanama yoktur.', risk:['Yenidoğanda K vitamini depoları düşük, bağırsak florası yetersizdir.', 'Profilaksi yapılmazsa erken veya geç yenidoğan hemorajik hastalığı gelişebilir.'], clues:['Sağlıklı term bebekte rutin yaklaşım intramüsküler K vitamini uygulamasıdır.', 'Profilaksi tedavi değil koruyucu standart bakımdır.'], exam:['Bebek canlı, pembe ve aktiftir; doğum travması veya peteşi izlenmez.', 'Emme ve solunum çabası normaldir.'], vitals:{TA:'-',Nabız:'136/dk',Solunum:'42/dk',SpO2:'97%',Ateş:'36.8 °C'}, investigations:[inv('newborn-assessment','Yenidoğan ilk değerlendirmesi','exam','Rutin profilaksi öncesi klinik stabiliteyi görmek.','Apgar iyi, aktif kanama yoktur.','K vitamini profilaksisi laboratuvar beklemeden yapılır.', [['Apgar 5. dk','9','7–10','Normal'], ['Kanama','Yok','Yok','Normal']])]},
  phototherapy: {profile:'3 günlük term yenidoğan · Yenidoğan servisi', stem:'Üç günlük term bebek sarılık nedeniyle değerlendirilir. Anne-bebek kan grubu uyumsuzluğu ağır değildir; total bilirubin yaş saatine göre fototerapi sınırının üzerindedir.', risk:['Yenidoğanda bilirubin düzeyi yaş saati ve risk faktörlerine göre yorumlanır.', 'Tedavi sınırının üzerindeki indirekt hiperbilirubinemi kernikterus riskini azaltmak için fototerapi gerektirir.'], clues:['Direkt bilirubin yüksek değildir; hemoliz ağır bulgularla seyretmez.', 'Yaş-saat nomogramında tedavi eşiğinin aşılması fototerapi kararını belirler.'], exam:['Bebekte yüz ve gövdede sarılık vardır; emmesi iyi, tonusu normaldir.', 'Hepatosplenomegali ve sepsis bulgusu yoktur.'], vitals:{TA:'-',Nabız:'140/dk',Solunum:'40/dk',SpO2:'98%',Ateş:'36.7 °C'}, investigations:[inv('bilirubin','Total ve direkt bilirubin','lab','Sarılığın tipini ve tedavi eşiğini belirlemek.','Total bilirubin fototerapi sınırının üzerindedir; direkt fraksiyon düşük kalır.','Fototerapi endikasyonunu destekler.', [['Total bilirubin','17,8 mg/dL','Yaş saatine göre','Yüksek'], ['Direkt bilirubin','0,4 mg/dL','<1','Normal']])]},
  hypovolemicShock: {profile:'2 yaşında erkek · Pediatrik acil', stem:'İki yaşındaki çocuk iki gündür ishal-kusma sonrası letarji ve idrar azalması ile getirilir. Ailesi son saatlerde su içemediğini ve gözlerinin çöktüğünü belirtir.', risk:['Sıvı kaybı küçük çocukta hızla hipovolemik şoka ilerleyebilir.', 'Perfüzyon bozukluğu varsa oral rehidrasyon yerine hızlı izotonik sıvı bolusu gerekir.'], clues:['Taşikardi, uzamış kapiller dolum ve soğuk ekstremite dolaşım yetersizliğini gösterir.', 'Hipotansiyon geç bulgudur; beklenmemelidir.'], exam:['Çocuk letarjiktir; mukozalar kuru, gözler çökmüş ve cilt turgoru azalmıştır.', 'Kapiller dolum 4 saniyedir, ekstremiteler soğuktur.'], vitals:{TA:'78/48 mmHg',Nabız:'158/dk',Solunum:'30/dk',SpO2:'97%',Ateş:'37.1 °C'}, investigations:[inv('dehydration-electrolyte','Elektrolitler ve kan şekeri','lab','Dehidratasyonun metabolik etkilerini değerlendirmek.','Hafif hipernatremi ve prerenal azotemi vardır.','Ancak şok bulgusunda sıvı tedavisi laboratuvarı beklemez.', [['Sodyum','150 mEq/L','135–145','Yüksek'], ['BUN','38 mg/dL','7–20','Yüksek'], ['Glukoz','82 mg/dL','70–100','Normal']])]},
  fasciotomy: null,
  adrenalHydro: null,
  anaphylaxisEpi: null,
};
miniOverrides.fasciotomy = {profile:'22 yaşında erkek · Ortopedi acili', stem:'Tibia kırığı nedeniyle alçı yapılan hasta giderek artan bacak ağrısı ve parmaklarda uyuşma ile geri gelir. Ağrı opioid analjeziye rağmen geçmemekte ve pasif germe ile belirgin artmaktadır.', risk:['Kapalı kompartman basıncı artışı kas ve sinir iskemisine yol açar.', 'Nabızların korunması kompartman sendromunu dışlamaz; tedavide gecikme kalıcı hasar bırakır.'], clues:['Pasif germe ile artan şiddetli ağrı en erken ve önemli ipucudur.', 'Parestezi ve gergin kompartman acil fasiyotomi gerektirir.'], exam:['Ön tibial kompartman gergin ve çok ağrılıdır; pasif ayak parmağı ekstansiyonu ağrıyı artırır.', 'Distal nabızlar alınır ancak parestezi mevcuttur.'], vitals:{TA:'124/76 mmHg',Nabız:'108/dk',Solunum:'18/dk',SpO2:'98%',Ateş:'36.9 °C'}, investigations:[inv('compartment-pressure','Kompartman basıncı ölçümü','exam','Klinik şüpheyi desteklemek ve cerrahi kararı güçlendirmek.','Ön kompartman basıncı belirgin yüksektir.','Klinik tablo tipikse fasiyotomi basınç ölçümü için geciktirilmez.', [['Ön kompartman','48 mmHg','<10–15','Kritik yüksek']]) ]};
miniOverrides.adrenalHydro = {profile:'45 yaşında erkek · Acil servis', stem:'Bilinen primer adrenal yetmezliği olan hasta gastroenterit sonrası halsizlik, kusma ve bayılma ile getirilir. Cildi koyu renklidir ve sıvı tedavisine rağmen hipotansiyonu sürer.', risk:['Primer adrenal yetmezlikte enfeksiyon veya kusma kortizol gereksinimini artırır.', 'Tedavi gecikirse refrakter hipotansiyon ve hiperkalemi yaşamı tehdit eder.'], clues:['Hiperpigmentasyon, hiponatremi, hiperkalemi ve sıvıya dirençli hipotansiyon adrenal krizi düşündürür.', 'Acil hidrokortizon tanısal test sonuçları beklenmeden uygulanır.'], exam:['Hasta bitkin ve dehidrate görünür; mukozalarda hiperpigmentasyon vardır.', 'Karında yaygın hassasiyet hafiftir, defans yoktur.'], vitals:{TA:'78/44 mmHg',Nabız:'124/dk',Solunum:'22/dk',SpO2:'97%',Ateş:'37.8 °C'}, investigations:[inv('adrenal-electrolyte','Elektrolitler ve kortizol örneği','lab','Adrenal kriz paternini göstermek; tedaviyi geciktirmeden örnek almak.','Hiponatremi, hiperkalemi ve düşük kortizol vardır.','Tedavi hidrokortizonla hemen başlanır.', [['Sodyum','124 mEq/L','135–145','Düşük'], ['Potasyum','6,0 mEq/L','3,5–5,0','Yüksek'], ['Kortizol','2 µg/dL','Sabah >10','Düşük']]) ]};
miniOverrides.anaphylaxisEpi = {profile:'20 yaşında erkek · Acil servis', stem:'Fıstıklı pasta yedikten 15 dakika sonra yaygın kaşıntı, dudaklarda şişme, boğazda sıkışma, karın ağrısı ve baş dönmesi gelişen hasta acile getirilir.', risk:['Gıda maruziyetinden dakikalar sonra çoklu sistem bulgusu gelişmesi anafilaksiyi düşündürür.', 'Hipotansiyon veya hava yolu bulgusu varsa antihistaminik tek başına yeterli değildir.'], clues:['Ürtiker, dudak-dil ödemi, hışıltı ve hipotansiyon aynı anda bulunur.', 'İlk tedavi intramüsküler adrenalindir; steroid ve antihistaminikler destekleyicidir.'], exam:['Yaygın ürtiker, dudak ödemi ve hışıltılı solunum saptanır.', 'Hasta soluk ve baş dönmesi tarifler; kapiller dolum uzamıştır.'], vitals:{TA:'82/48 mmHg',Nabız:'128/dk',Solunum:'28/dk',SpO2:'92%',Ateş:'36.7 °C'}, investigations:[inv('anaphylaxis-abc','Yatak başı hava yolu-dolaşım değerlendirmesi','exam','Anafilaksinin ciddiyetini ve adrenalin gereksinimini belirlemek.','Hava yolu ödemi, bronkospazm ve hipotansiyon bulguları vardır.','IM adrenalin ilk basamaktır.', [['Hışıltı','Var','Yok','Kritik'], ['TA','82/48 mmHg','>90 sistolik','Şok'], ['Dudak ödemi','Var','Yok','Kritik']]), inv('anaphylaxis-tryptase','Serum triptaz', 'lab','Ayırıcı tanıda mast hücre aktivasyonunu desteklemek; tedaviyi geciktirmemek.','Akut örnekte triptaz yüksek saptanabilir.','Destekleyici testtir; adrenalin için sonuç beklenmez.', [['Triptaz','18 µg/L','<11','Yüksek']]) ]};
for (const [key, alias] of Object.entries({
  'Hava yolu, solunum ve dolaşımın değerlendirilmesi':'travmaABC','Glukoz ölçümü':'glucose','İdrar beta-hCG testi':'betahcg','Temas sonrası kuduz profilaksisi':'rabies','Acil debridman ve geniş spektrumlu antibiyotik':'necfas','Hızlı ritim değerlendirmesi ve defibrilasyon hazırlığı':'unstableVt','Acil perkütan koroner girişim':'stemiReperf','İnsülin ve dekstroz':'hyperkalShift','Trombolitik tedavi':'massivePE','Acil kontrastlı BT anjiyografi':'aorticCTA','Metotreksat':'ectopicMTX','Magnezyum sülfat':'eclampsiaMg','K vitamini':'vitKnewborn','Fototerapi':'phototherapy','Hızlı sıvı bolusu':'hypovolemicShock','Acil cerrahi debridman ve geniş spektrumlu antibiyotik':'necfas','Acil fasiyotomi':'fasciotomy','Acil hidrokortizon':'adrenalHydro','İntramüsküler adrenalin':'anaphylaxisEpi'
})) overrides[key] = miniOverrides[alias];

function examFor(c) {
  const h = `${c.title} ${c.diagnosis?.correct} ${c.stem}`.toLowerCase('tr');
  if (overrides[c.diagnosis?.correct]?.exam) return overrides[c.diagnosis.correct].exam;
  if (includesAny(h, ['anemi','demir'])) return ['Konjonktival solukluk ve hafif taşikardi vardır; ikter, lenfadenopati ve hepatosplenomegali saptanmaz.', 'Tırnaklarda kırılganlık ve dil papillalarında silinme izlenir.'];
  if (includesAny(h, ['hiperparatiroid','hiperkalsemi'])) return ['Hasta dehidratasyona eğilimli ve halsiz görünür; kemik hassasiyeti belirgin değildir.', 'Böbrek taşı öyküsüyle uyumlu kostovertebral açı hassasiyeti hafiftir.'];
  if (includesAny(h, ['tirotoksik','graves','hipertiroid'])) return ['Hasta ajite ve terlidir; ince tremor, sıcak nemli cilt ve taşikardi vardır.', 'Tiroid bezinde difüz büyüme palpe edilir; belirgin oftalmopati eşlik edebilir.'];
  if (includesAny(h, ['nefrotik'])) return ['Periorbital ödem ve pretibial gode bırakan ödem vardır; akciğer oskültasyonu çoğunlukla doğaldır.', 'Kan basıncı hafif yüksek olabilir; döküntü ve artrit bulgusu saptanmaz.'];
  if (includesAny(h, ['temporal','dev hücreli'])) return ['Temporal arter trasesinde hassasiyet ve nabızda azalma vardır.', 'Çene hareketiyle ağrı tariflenir; görme keskinliği yakın izlenir.'];
  if (includesAny(h, ['gut','podagra'])) return ['Birinci metatarsofalangeal eklem kızarık, sıcak, şiş ve çok hassastır.', 'Ateş hafif olabilir; diğer eklemlerde belirgin simetrik tutulum yoktur.'];
  if (includesAny(h, ['pilor'])) return ['Bebek aç ve huzursuzdur; epigastriumda zeytin benzeri kitle palpe edilebilir.', 'Dehidratasyon bulguları ve kilo alımında yetersizlik izlenir.'];
  if (includesAny(h, ['bronşiolit'])) return ['İnfantta takipne, subkostal çekilme, yaygın hışıltı ve ince raller saptanır.', 'Beslenme sırasında yorulma vardır; toksik görünüm belirgin değildir.'];
  if (includesAny(h, ['krup'])) return ['Çocukta inspiratuvar stridor, havlar tarzda öksürük ve hafif retraksiyon vardır.', 'Salya akması ve tripod pozisyonu yoktur.'];
  if (includesAny(h, ['febril nöbet'])) return ['Nöbet sonrası çocuk hızla eski bilinç düzeyine döner; ense sertliği ve fokal nörolojik defisit yoktur.', 'Ateş odağı üst solunum yolu enfeksiyonu ile uyumludur.'];
  if (includesAny(h, ['çocuk istismarı'])) return ['Farklı iyileşme evrelerinde ekimozlar ve açıklamayla uyumsuz cilt lezyonları saptanır.', 'Genital ve nörolojik muayene güvenli kayıt süreciyle planlanır.'];
  if (includesAny(h, ['apandisit'])) return ['Sağ alt kadranda hassasiyet, rebound ve psoas/obturator irritasyon bulguları değerlendirilebilir.', 'Periumbilikal ağrının sağ alt kadrana göçü muayeneyle desteklenir.'];
  if (includesAny(h, ['kolesistit','kolanjit'])) return ['Sağ üst kadranda hassasiyet ve inspiryumda ağrıyla kesilme vardır.', 'İkter varsa kolanjit ve koledok taşı olasılığı ayrıca değerlendirilir.'];
  if (includesAny(h, ['ektopik'])) return ['Alt kadranda tek taraflı hassasiyet vardır; servikal hareket hassasiyeti eşlik edebilir.', 'Hemodinamik instabilite veya peritonit bulgusu rüptürü düşündürür.'];
  if (includesAny(h, ['preeklampsi'])) return ['Kan basıncı yüksektir; pretibial ödem ve hiperrefleksi görülebilir.', 'Sağ üst kadran hassasiyeti veya görme yakınması şiddet bulgusu olarak değerlendirilir.'];
  if (includesAny(h, ['inme','serebral arter'])) return ['Yüz ve kolda belirgin olmak üzere kontralateral motor defisit ve afazi saptanır.', 'Glukoz düşüklüğü dışlanır; bilinç düzeyi ve NIHSS benzeri nörolojik şiddet kaydedilir.'];
  if (includesAny(h, ['menenjit'])) return ['Ense sertliği, fotofobi ve bilinç bulanıklığı vardır; peteşi varsa meningokoksemi düşünülür.', 'Hemodinamik durum ve sepsis bulguları aynı anda izlenir.'];
  if (includesAny(h, ['tinea','pitriazis','psoriasis','dermat'])) return ['Deri lezyonlarının dağılımı, skuam tipi, sınırları ve mukozal tutulum ayrıntılı değerlendirilir.', 'Sistemik toksisite veya yaygın epidermal ayrışma bulgusu yoktur.'];
  if (includesAny(h, ['zehirlen','toksisite','antidot','organofosfat','opioid','metanol','parasetamol'])) return ['Bilinç düzeyi, pupiller, solunum paterni, sekresyonlar ve kardiyak ritim sistematik olarak değerlendirilir.', 'Toksidromu destekleyen hedef organ bulguları ve vital instabilite kaydedilir.'];
  if (includesAny(h, ['patoloji','nekroz','karsinom','hücre','amiloid','seminom','linitis','hodgkin','lösemi','ards','barrett'])) return ['Makroskopik veya mikroskobik bulgu, lezyonun doku dağılımı ve hücresel paternine göre yorumlanır.', 'Tanısal ayrım için boyanma, immünohistokimya veya biyopsi örneği kullanılır.'];
  if (includesAny(h, ['sinir','nervus','omuz çıkığı','humerus','karpal','tiroidektomi','histerektomi','fibula','pudendal','parotis'])) return ['Motor güç, duyu alanı ve refleksler anatomik lezyon düzeyine göre test edilir.', 'Travma veya cerrahi alanı ile nörolojik defisit dağılımı karşılaştırılır.'];
  return sentenceSplit(c.stem).filter(s=>/muayene|saptan|izlen|duyul|bulun|vardır|yoktur|pozitif|negatif|hassas|ödem|döküntü|raller|üfürüm|defisit/i.test(s)).slice(0,2).concat([
    `Muayene, ${c.title.toLowerCase('tr')} başvurusunu açıklayan objektif bulgulara odaklanır.`,
    `Vital bulgular ve hedef sistem bulguları ${c.diagnosis?.correct || 'uygun tanı'} olasılığını destekleyecek şekilde yorumlanır.`
  ]).slice(0,2);
}

function investigationsFor(c, exam) {
  const correct = c.diagnosis?.correct || c.title;
  const h = `${c.title} ${correct} ${c.stem}`.toLowerCase('tr');
  const ov = overrides[correct]; if (ov?.investigations) return ov.investigations;
  if (Array.isArray(c.availableInvestigations) && c.availableInvestigations.length && !JSON.stringify(c.availableInvestigations).match(/Klinik bağlama göre|Hedef görüntüleme|Objektif sonuç|Semptomun anatomik|Temel panel olgudaki/)) return c.availableInvestigations;
  if (includesAny(h, ['anemi','demir'])) return [inv('iron-cbc','Hemogram ve eritrosit indeksleri','lab','Aneminin tipini ve mikrositozu göstermek.','Mikrositer hipokrom anemi vardır.', 'MCV düşüklüğü demir eksikliği lehinedir.', [['Hemoglobin','8,9 g/dL','12–16','Düşük'],['MCV','68 fL','80–100','Düşük'],['RDW','%18','%11–15','Yüksek']]), inv('iron-studies','Demir çalışmaları','lab','Demir depolarını ve taşıma kapasitesini değerlendirmek.','Ferritin düşük, total demir bağlama kapasitesi yüksektir.','Bu patern demir eksikliği anemisini destekler.', [['Ferritin','7 ng/mL','15–150','Düşük'], ['TDBK','480 µg/dL','250–450','Yüksek'], ['Transferrin sat.','%6','%20–50','Düşük']])];
  if (includesAny(h, ['hiperparatiroid','hiperkalsemi'])) return [inv('pth-calcium','Kalsiyum-fosfor-PTH paneli','lab','Hiperkalseminin PTH aracılı olup olmadığını ayırmak.','Kalsiyum ve PTH yüksek, fosfor düşüktür.','PTH yüksekliği primer hiperparatiroidizmi destekler.', [['Kalsiyum','11,8 mg/dL','8,5–10,5','Yüksek'],['Fosfor','2,1 mg/dL','2,5–4,5','Düşük'],['PTH','148 pg/mL','15–65','Yüksek']]), inv('renal-us','Üriner sistem ultrasonografisi','imaging','Nefrolitiyazis komplikasyonunu değerlendirmek.','Sağ böbrekte küçük kalkül izlenir.','Hiperkalsemiyle birlikte taş öyküsü hedef organ etkilenimini gösterir.', [['Böbrek taşı','Var','Yok','Destekleyici']])];
  if (includesAny(h, ['pilor'])) return [inv('pyloric-us','Abdominal ultrasonografi','imaging','Pilor kas kalınlığı ve kanal uzunluğunu ölçmek.','Pilor kası kalın ve kanal uzundur.', 'Hipertrofik pilor stenozunu doğrular.', [['Pilor kas kalınlığı','4,5 mm','<3 mm','Yüksek'], ['Kanal uzunluğu','18 mm','<15 mm','Uzun']]), inv('pyloric-electrolytes','Elektrolit ve kan gazı','lab','Kusmaya bağlı metabolik bozukluğu göstermek.','Hipokloremik metabolik alkaloz vardır.', 'Cerrahi öncesi sıvı-elektrolit düzeltilmelidir.', [['Klor','88 mEq/L','98–106','Düşük'], ['pH','7,51','7,35–7,45','Alkaloz'], ['Bikarbonat','34 mmol/L','22–26','Yüksek']])];
  if (includesAny(h, ['enfeksiyon','mikrobiyoloji','basil','virus','tüberküloz','menenjit','sıtma','tetanoz','botulizm','lyme','sifiliz','mononükleoz','hepatit','aspergilloz','giardia','kist hidatik','brucella','candida','clostridioides','vibrio'])) {
    return [inv('micro-target','Hedef mikrobiyolojik inceleme','microbiology','Klinik odağa uygun örnekten etkeni göstermek.','Örnek incelemesi tanıyı destekleyen özgül bulgu verir.', `${correct} için etken veya serolojik patern klinik tabloyla uyumludur.`, [['Örnek sonucu', correct, 'Negatif/normal','Pozitif']]), inv('infection-lab','Hemogram ve inflamasyon belirteçleri','lab','Enfeksiyonun sistemik etkisini değerlendirmek.','Klinik tabloya uygun inflamasyon veya hematolojik değişiklik vardır.', 'Tedavi kararı öykü, muayene ve etken bulgusuyla birlikte verilir.', [['Lökosit','14.800/mm³','4.000–10.000','Yüksek'], ['CRP','68 mg/L','<5','Yüksek']])];
  }
  if (includesAny(h, ['zehirlen','antidot','toksisite','farmakoloji','organofosfat','opioid','metanol','warfarin','heparin','klozapin','amiodaron','dantrolen'])) return [inv('tox-bedside','Toksidrom ve EKG değerlendirmesi','toxicology','Maruziyetin hedef organ etkisini hızlı değerlendirmek.','Vital bulgular ve EKG maruziyetle uyumlu patern gösterir.', `${correct} seçeneği toksidrom yönetiminde hedef tedaviyle uyumludur.`, [['Maruziyet','Öyküyle uyumlu','Yok','Destekleyici'], ['EKG/vital','Etkilenmiş','Normal','Anormal']]), inv('tox-lab','Temel biyokimya ve ilaç düzeyi','lab','Organ etkilenimi ve tedavi gereksinimini değerlendirmek.','Tedavi kararını destekleyen biyokimyasal bozukluk saptanır.', 'Antidot/geri döndürme kararı klinik şiddetle birlikte verilir.', [['Kreatinin','1,0 mg/dL','0,6–1,2','Normal'], ['Karaciğer enzimi','Hafif yüksek','Normal','İzlem']])];
  if (includesAny(h, ['gebelik','plasenta','preeklampsi','eklampsi','over','endometriozis','polikistik','pelvik inflamatuvar','postpartum','omuz distosisi','kordon','molar','endometrium'])) return [inv('obgyn-us','Transvajinal/obstetrik ultrasonografi','imaging','Gebelik, pelvik organ veya obstetrik komplikasyonu değerlendirmek.','Olgudaki tanıyı destekleyen anatomik bulgu izlenir.', `${correct} kararını destekleyen temel görüntüleme bulgusudur.`, [['Görüntüleme bulgusu','Tanıyla uyumlu','Normal','Anormal']]), inv('obgyn-lab','Hemogram, beta-hCG ve idrar/protein değerlendirmesi','lab','Kanama, gebelik ve organ etkilenimini değerlendirmek.','Soru hedefiyle uyumlu laboratuvar paterni vardır.', 'Klinik karar öykü ve muayeneyle birlikte şekillenir.', [['Hemoglobin','10,8 g/dL','12–16','Düşük/izlem'], ['Beta-hCG/proteinüri','Tanıyla uyumlu','Negatif/normal','Destekleyici']])];
  if (includesAny(h, ['inme','baş ağrısı','ensefalit','miyastenia','guillain','nöro','vertigo','glokom','retina','konküzyon','colles','biseps','osteoartrit','psoriasis','tinea','otitis','kolesteatom'])) return [inv('small-clinic','Hedef muayene ve yatak başı değerlendirme','exam','Nörolojik, göz, KBB, deri veya ortopedik odak bulgusunu netleştirmek.','Muayene bulguları soru kökündeki tanıyla uyumludur.', `${correct} için ayırt ettirici muayene bulgusu mevcuttur.`, [['Hedef bulgu','Var','Yok','Destekleyici']]), inv('small-test','Uygun görüntüleme/laboratuvar','imaging','Tanıyı destekleyen objektif bulguyu göstermek.','Uygun tetkikte tanıyla uyumlu bulgu saptanır.', 'Tetkik, klinik şüpheyi doğrulamak veya acil dışlama yapmak için kullanılır.', [['Sonuç','Tanıyla uyumlu','Normal','Anormal']])];
  if (includesAny(h, ['biyokimya','fenilketonüri','maple','galaktozemi','von gierke','wilson','hemokromatozis','porfiri','lesch','tay-sachs','homokistinüri','mcad','g6pd','mcardle','hiperamonyemi'])) return [inv('metabolic-lab','Metabolik tarama ve hedef biyokimya','lab','Doğumsal metabolik hastalık veya enzim bozukluğu paternini göstermek.','Tanıyla uyumlu karakteristik metabolit veya enzim bulgusu saptanır.', `${correct} için karakteristik biyokimyasal patern klinik tabloyu açıklar.`, [['Hedef metabolit/enzim','Tanıyla uyumlu bozuk','Normal','Anormal']]), inv('metabolic-support','Kan gazı, glukoz ve organ fonksiyonları','lab','Akut metabolik dekompansasyon ve organ etkilenimini değerlendirmek.','Klinik tabloyla uyumlu destekleyici bozukluklar vardır.', 'Tedavi ve aciliyet derecesini belirlemeye yardım eder.', [['Glukoz/pH','Etkilenmiş','Normal','Destekleyici']])];
  if (includesAny(h, ['patoloji','nekroz','karsinom','hücre','amiloid','seminom','linitis','hodgkin','lösemi','ards','barrett'])) return [inv('path-biopsy','Biyopsi ve histopatolojik inceleme','pathology','Morfolojik paterni ve hücre tipini göstermek.','Mikroskobik bulgu tanıyla uyumludur.', `${correct} için ayırt ettirici histopatolojik özellik saptanır.`, [['Mikroskopi','Tanıyla uyumlu patern','Normal doku','Anormal']]), inv('path-ihc','Özel boya/immünohistokimya','pathology','Benzer morfolojileri ayırmak.', 'Özel inceleme tanıyı destekler.', 'Patolojik tanı morfoloji ve destekleyici boyalarla birlikte kurulur.', [['Özel bulgu','Pozitif','Negatif','Destekleyici']])];
  if (includesAny(h, ['anatomi','nervus','sinir'])) return [inv('anatomy-exam','Nörolojik dağılım muayenesi','exam','Motor ve duyu kaybının anatomik sinirle eşleşmesini göstermek.','Defisit dağılımı ilgili sinir yaralanmasıyla uyumludur.', `${correct} cevabı, lezyon düzeyiyle defisit dağılımının eşleşmesine dayanır.`, [['Motor/duyu alanı','İlgili sinir dağılımında kayıp','Normal','Anormal']]), inv('anatomy-imaging','Travma/cerrahi alan değerlendirmesi','imaging','Lezyonun anatomik komşuluğunu göstermek.', 'Yaralanma bölgesi ilgili sinirin seyrine yakındır.', 'Anatomik lokalizasyon klinik bulguyu açıklar.', [['Lezyon alanı','Sinir komşuluğunda','Uzak','Destekleyici']])];
  return [inv('target-basic','Hedef laboratuvar paneli','lab','Öykü ve muayenede öne çıkan sistemi objektif olarak değerlendirmek.','Tanıyı destekleyen ölçülebilir anormallik saptanır.', `${correct} kararını destekleyen objektif veri sağlar.`, [['Ana parametre','Tanıyla uyumlu','Normal','Anormal']]), inv('target-test','Hedef tanısal inceleme','test','Benzer seçenekleri ayıran bulguyu göstermek.','Ayırıcı tanıyı daraltan özgül bulgu saptanır.', `${correct} seçeneği bu objektif bulguyla en iyi açıklanır.`, [['Ayırt ettirici bulgu','Var','Yok','Destekleyici']])];
}

function buildIntro(c, exam, investigations) {
  const correct = c.diagnosis?.correct || c.title;
  const ov = overrides[correct];
  const stem = cleanText(ov?.stem || c.stem || c.patientIntro?.historySummary || c.title);
  const profile = ov?.profile || (/Kısa olgu|TUS spot/i.test(`${c.demographics} ${c.setting} ${c.patientIntro?.profile}`) ? inferProfile(c) : cleanText(c.patientIntro?.profile || `${c.demographics || 'Hasta'} · ${c.setting || 'Klinik değerlendirme'}`));
  const risk = ov?.risk || riskFor(c, stem);
  const clues = ov?.clues || cluesFor(c, stem, exam, investigations);
  return {
    profile,
    presentation: cleanText(ov?.presentation || c.patientIntro?.presentation || c.chiefComplaint || c.title),
    riskContext: unique(risk).slice(0,2),
    distinctiveClues: unique(clues).slice(0,2),
    historySummary: stem.length < 80 ? expandHistory(c, stem) : stem
  };
}
function inferProfile(c){
  const h=`${c.title} ${c.diagnosis?.correct}`.toLowerCase('tr');
  if (includesAny(h,['yenidoğan','fototerapi','k vitamini'])) return 'Term yenidoğan · Yenidoğan servisi';
  if (includesAny(h,['çocuk','kawasaki','epiglottit','hipovolemik','febril','pediatri'])) return 'Çocuk hasta · Pediatri acil';
  if (includesAny(h,['gebelik','eklampsi','ektopik','beta-hcg'])) return 'Üreme çağında kadın · Acil servis';
  if (includesAny(h,['travma','pnömotoraks','kompartman'])) return 'Travma hastası · Acil servis';
  if (includesAny(h,['stemi','hiperkalemi','pulmoner emboli','diseksiyon','adrenal','anafilaksi'])) return 'Erişkin hasta · Acil servis';
  return 'Erişkin hasta · Klinik değerlendirme';
}
function expandHistory(c, stem){
  return `${stem}. Hasta, yakınmanın başlangıç zamanı, eşlik eden semptomlar ve mevcut risk faktörleri açısından değerlendirilir.`;
}
function riskFor(c, stem){
  const correct = c.diagnosis?.correct || c.title;
  const h=`${c.title} ${correct} ${stem}`.toLowerCase('tr');
  if (includesAny(h,['stemi','miyokart','pulmoner emboli','aort diseksiyonu','tamponad','akciğer ödemi'])) return ['Başvuru zamanı ve hemodinamik durum kardiyopulmoner aciliyetin derecesini belirler.', 'Göğüs ağrısı, dispne, hipotansiyon veya EKG/görüntüleme bulgusu tedavi gecikmesini tolere etmeyen bir tabloyu düşündürür.'];
  if (includesAny(h,['enfeksiyon','ateş','basil','virus','menenjit','tüberküloz','sepsis','kolesistit','kolanjit','divertikülit','pankreatit'])) return ['Ateş, sistemik inflamasyon ve odak bulgusu enfeksiyöz veya inflamatuvar aciliyet açısından birlikte yorumlanır.', 'Sepsis, organ disfonksiyonu veya kaynak kontrolü gereksinimi tedavi önceliğini belirler.'];
  if (includesAny(h,['gebelik','postpartum','plasenta','over','endometrium','preeklampsi','eklampsi'])) return ['Gebelik durumu, kanama miktarı ve hemodinamik stabilite anne-fetüs güvenliği açısından ilk ayrımı oluşturur.', 'Ağrı, kanama, hipertansiyon veya fetal kalp hızı değişikliği acil obstetrik müdahale gereksinimini belirler.'];
  if (includesAny(h,['çocuk','yenidoğan','infant','bebek','pediatri','kawasaki','febril'])) return ['Yaş grubu, hidrasyon, solunum işi ve genel görünüm çocuk hastada klinik ciddiyeti belirler.', 'Ateş süresi, büyüme-beslenme durumu ve sistem bulguları tanısal olasılıkları değiştirir.'];
  if (includesAny(h,['zehirlen','toksisite','antidot','farmakoloji','organofosfat','opioid','metanol','warfarin','heparin'])) return ['İlaç maruziyetinin zamanı, dozu ve hedef organ etkisi toksidrom yönetimini belirler.', 'Hava yolu, solunum, dolaşım ve ritim bozukluğu antidot veya geri döndürme tedavisini acilleştirir.'];
  return [`${firstSentences(stem,1)}`, `${correct} olasılığı, öyküdeki zamanlama ile muayene ve hedef tetkik bulgularının aynı klinik yönde birleşmesiyle güçlenir.`];
}
function cluesFor(c, stem, exam, investigations){
  const correct=c.diagnosis?.correct||c.title;
  const sents=sentenceSplit(stem);
  const e=exam?.[0] || '';
  const invSummary=investigations?.[0]?.summary || '';
  return [
    sents.find(s=>s.length>40 && !/klinik karar|birlikte yorumlan/i.test(s)) || `${c.title} başvurusunda ayırt ettirici ipucu öykünün zamanlamasıdır.`,
    e && !/Genel durum|hedef sistem|birlikte değerlendirilir/i.test(e) ? e : (invSummary || `${correct} tanısını destekleyen objektif bulgu saptanır.`)
  ];
}
function unique(arr){
  const seen=new Set(); const out=[];
  for (let x of arr||[]) { x=cleanText(x); if(!x) continue; const k=x.toLowerCase('tr'); if(!seen.has(k)){seen.add(k); out.push(x);} }
  return out;
}

function feedbackFor(c, intro, exam, investigations) {
  const correct = c.diagnosis?.correct;
  const options = Array.isArray(c.diagnosis?.options) ? c.diagnosis.options.slice(0,5) : [];
  while (options.length < 5) options.push(['Alternatif tanı','Destek tedavisi','İzlem','Gecikmiş yaklaşım','Gereksiz tetkik'][options.length]);
  if (!options.includes(correct)) options[0]=correct;
  const q = cleanText(c.diagnosis?.question || c.question || 'Bu hastada en olası tanı/uygun yaklaşım hangisidir?');
  const evidence = [
    { title:'Öykü', text: intro.historySummary },
    { title:'Muayene', text: exam[0] || 'Muayenede tanıyı destekleyen objektif bulgu vardır.' },
    { title:'Tetkik', text: investigations?.[0]?.summary || 'Hedef tetkik sonucu klinik kararı destekler.' }
  ];
  const why = `${intro.historySummary} ${exam[0] || ''} ${investigations?.[0]?.label || 'Hedef tetkik'} sonucunda ${investigations?.[0]?.summary || 'tanıyı destekleyen bulgu saptanır'}. Bu veriler ${correct} seçeneğini diğer seçeneklerden daha güçlü destekler.`;
  const whyWrong = {};
  options.forEach((opt) => {
    if (opt === correct) whyWrong[opt] = why;
    else whyWrong[opt] = `${opt}, bazı bulgularla kısmen benzeşebilir; ancak olgudaki öykü-muayene dizilimi ve ${investigations?.[0]?.label || 'hedef tetkik'} sonucu ${correct} ile daha uyumludur.`;
  });
  const diff = Object.fromEntries(options.map((opt) => [opt, { explanation: whyWrong[opt], comparisonPoints: unique([intro.distinctiveClues?.[0], exam[0], investigations?.[0]?.summary]).slice(0,3) }]));
  const management = (overrides[c.diagnosis?.correct]?.management || c.diagnosis?.answerFeedback?.management || []).filter(Boolean).slice(0,4);
  const fallbackManagement = management.length ? management : ['Hastanın stabilitesi değerlendirilir ve gerekli destek tedavisi başlanır.', 'Tanıyı veya yaklaşımı değiştiren hedef tetkik sonucu yorumlanır.', `${correct} için uygun tedavi/izlem basamağı planlanır.`];
  return {
    ...c.diagnosis,
    correct,
    options,
    question: q,
    explanation: why,
    pearls: [
      { label:'Karar verdiren ipucu', text: intro.distinctiveClues?.[0] || intro.riskContext?.[0] },
      { label:'Objektif destek', text: investigations?.[0]?.summary || exam[0] }
    ],
    nextStep: 'Öykü, muayene ve tetkik sonucunun aynı karara nasıl bağlandığını tekrar et.',
    answerFeedback: {
      diagnosisMeta: `${c.relatedBranch || 'Klinik'} · vaka temelli klinik karar`,
      whyCorrect: why,
      evidenceChain: evidence,
      pearls: [
        { label:'Karar verdiren ipucu', text: intro.distinctiveClues?.[0] || intro.riskContext?.[0] },
        { label:'Objektif destek', text: investigations?.[0]?.summary || exam[0] }
      ],
      management: fallbackManagement,
      managementSteps: fallbackManagement.map((text,i)=>({title:`${i+1}. basamak`, text})),
      learningOutcome: `Bu vaka, ${correct} kararını ezberle değil; öykü, fizik muayene ve hedef tetkik verilerini birleştirerek kurmayı hedefler.`,
      whyWrong,
      differentialComparison: diff,
      differentials: diff
    }
  };
}

function transformCase(c, i){
  const correct = c.diagnosis?.correct || c.title;
  let newCase = JSON.parse(JSON.stringify(c));
  const ov = overrides[correct];
  if (ov?.stem) newCase.stem = ov.stem;
  let exam = examFor(newCase).map(cleanText).filter(Boolean);
  const vitals = ov?.vitals || newCase.vitals;
  let investigations = investigationsFor(newCase, exam);
  let intro = buildIntro(newCase, exam, investigations);
  // Prevent exact duplicates between sections.
  const used = new Set(sentenceSplit(intro.historySummary).map(s=>s.toLowerCase('tr')));
  intro.riskContext = unique(intro.riskContext).filter(s=>!used.has(s.toLowerCase('tr'))).slice(0,2);
  intro.distinctiveClues = unique(intro.distinctiveClues).filter(s=>!used.has(s.toLowerCase('tr'))).slice(0,2);
  if (intro.riskContext.length < 2) intro.riskContext.push(`${correct} açısından zamanlama, klinik stabilite ve komplikasyon riski kararın aciliyetini belirler.`);
  if (intro.distinctiveClues.length < 2) intro.distinctiveClues.push(investigations?.[0]?.summary || `${correct} lehine hedef objektif bulgu vardır.`);
  newCase = {
    ...newCase,
    demographics: intro.profile.split('·')[0]?.trim() || newCase.demographics,
    setting: intro.profile.split('·')[1]?.trim() || newCase.setting,
    chiefComplaint: intro.presentation,
    stem: intro.historySummary,
    clinicalFocus: cleanText(newCase.clinicalFocus || 'Öykü, fizik muayene ve hedef tetkik sonuçlarını birleştirerek en uygun klinik kararı seç.'),
    learningTarget: `${correct} kararını olgu verileriyle gerekçelendirmek.`,
    patientIntro: intro,
    vitals,
    exam,
    investigations: [],
    availableInvestigations: investigations,
    useSyntheticInvestigationBank: false,
    managementSequence: { enabled: false },
    hideExamSignal: true,
    diagnosis: feedbackFor(newCase, intro, exam, investigations)
  };
  return cleanCaseStrings(newCase);
}

let transformed = rawCases.map(transformCase);
// final audit and cleaning
transformed = transformed.map((c, idx) => {
  const text = JSON.stringify(c);
  if (/Klinik bağlama göre|Objektif sonuç|Hedef görüntüleme|Kısa olgu|TUS spot olgu|Genel durum, hedef sistem|Yaş, komorbidite|Semptomun anatomik/.test(text)) {
    console.warn('Weak leftover', idx+1, c.title);
  }
  return c;
});

const output = `import { applyTusLanguageStandardToCase } from '../utils/tusLanguageStandard.js';\n\nexport const rawCases = ${JSON.stringify(transformed, null, 2)};\n\nconst sanitizedCases = rawCases.map(applyTusLanguageStandardToCase);\n\nexport const cases = sanitizedCases;\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`;
fs.writeFileSync('src/data/cases.js', output);
console.log('Wrote', transformed.length, 'cases');
