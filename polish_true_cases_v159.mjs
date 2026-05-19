import fs from 'fs';
import { rawCases } from './src/data/cases.js';

const BAD = [
  /Klinik karar,/gi,
  /Yakınmanın başlangıç zamanı[^\.\n]*/gi,
  /Klinik karar öykü ve muayeneyle birlikte şekillenir\.?/gi,
  /Erişkin hasta profiline uygun şekilde değerlendirilir; belirgin acil instabilite olup olmadığı kaydedilir\.?/gi,
  /muayene ve yatak başı değerlendirme/gi,
  /Görüntüleme veya laboratuvar sonucu/gi,
  /Uygun tetkikte tanıyla uyumlu bulgu saptanır\.?/gi,
  /Başvuru zamanı ve hemodinamik durum kardiyopulmoner aciliyetin derecesini belirler\.?/gi,
  /Göğüs ağrısı, dispne, hipotansiyon veya EKG\/görüntüleme bulgusu tedavi gecikmesini tolere etmeyen bir tabloyu düşündürür\.?/gi,
  /olasılığı, öyküdeki baskın bulgu ile objektif veri aynı yönde olduğunda güçlenir\.?/gi,
  /Acil tedavi gerektiren kırmızı bayraklar ilk değerlendirmede dışlanır\.?/gi,
  /Muayenedeki bulgular tanıyı destekler\.?/gi,
  /Soru hedefiyle uyumlu laboratuvar paterni vardır\.?/gi,
  /Olgudaki tanıyı destekleyen anatomik bulgu izlenir\.?/gi,
  /Doğum analjezisi,/gi,
  /nedeniyle birimine başvurur/gi,
  /Klinik bağlama göre[^\.\n]*/gi,
  /Objektif sonuç/gi,
  /Hedef görüntüleme/gi,
  /Hedef laboratuvar/gi,
  /Hedef mikrobiyolojik/gi,
  /Kısa olgu/gi,
  /TUS spot olgu/gi,
  /Genel durum, hedef sistem muayenesi[^\.\n]*/gi,
  /Semptomun anatomik odağını[^\.\n]*/gi,
  /Ana parametre/gi,
  /Ayırt ettirici bulgu/gi,
  /Tanıyla uyumlu/gi,
  /Klinik tabloya uygun/gi,
  /kısmen benzeşebilir/gi,
  /soru kökündeki/gi,
];

function cleanText(text) {
  if (text == null) return text;
  let s = String(text);
  for (const re of BAD) s = s.replace(re, '');
  s = s
    .replace(/\s+([,.])/g, '$1')
    .replace(/\.\s*\./g, '.')
    .replace(/,\s*,/g, ',')
    .replace(/^\s*[,.;:-]+\s*/g, '')
    .replace(/\s+/g, ' ')
    .replace(/(\d+)\.\s+(\d+)/g, '$1.$2')
    .replace(/\s+°C/g, ' °C')
    .trim();
  return s;
}
function isBadText(s) {
  if (!s || cleanText(s).length < 12) return true;
  return BAD.some(re => new RegExp(re.source, re.flags).test(String(s))) || /profili/i.test(s) || /değerlendirilir/.test(s) && s.length < 90;
}
function uniq(arr) {
  const seen = new Set();
  return (arr || []).map(cleanText).filter(Boolean).filter(x => {
    const k = x.toLocaleLowerCase('tr-TR');
    if (seen.has(k)) return false;
    seen.add(k); return true;
  });
}
function inv(id, label, type, purpose, summary, values = []) {
  return {
    id,
    label,
    type,
    priority: 'essential',
    subtype: '',
    purpose,
    summary,
    clinicalMeaning: summary,
    result: { title: label, summary, interpretation: summary, values },
    postAnswerExplanation: summary,
  };
}
function safeId(s) { return cleanText(s).toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g,'i').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,48) || 'tetkik'; }

const exact = new Map();
function add(title, spec) { exact.set(title, spec); }

add('Kawasaki hastalığında koroner risk azaltma', {
  title: 'Uzamış ateş ve koroner tutulum riski',
  profile: '3 yaşında erkek çocuk · Pediatri acil',
  presentation: 'Altı gündür düşmeyen ateş ve mukokutanöz bulgular',
  stem: 'Üç yaşındaki erkek çocuk altı gündür 39 °C’ye ulaşan ateş, huzursuzluk ve iştahsızlık nedeniyle getirilir. Ailesi gözlerinde çapaklanma olmadan kızarıklık, dudaklarda çatlama, dilde belirgin kızarıklık ve son iki gündür el-ayaklarda şişlik fark ettiğini belirtir.',
  risk: ['Kawasaki hastalığında tedavi gecikirse koroner arter anevrizması riski artar.', 'Ateşin beş günden uzun sürmesi ve mukokutanöz bulguların birlikte olması IVIG ile erken tedaviyi öncelikli kılar.'],
  clues: ['Bilateral nonpürülan konjonktivit, çilek dili, dudak çatlakları ve ekstremite ödemi aynı klinik patern içinde yer alır.', 'Ekokardiyografide koroner arter genişlemesi tedavi kararını destekleyen hedef bulgudur.'],
  exam: ['Çocuk huzursuzdur; bilateral nonpürülan konjonktivit, çatlamış dudaklar, çilek dili ve servikal lenfadenopati saptanır.', 'Avuç içi ve ayak tabanlarında eritem-ödem vardır; ense sertliği, pürülan konjonktivit ve veziküler döküntü yoktur.'],
  vitals: { TA:'96/58 mmHg', Nabız:'128/dk', Solunum:'24/dk', SpO2:'98%', Ateş:'39.1 °C' },
  investigations: [
    inv('hemogram-crp-esr','Hemogram, CRP ve eritrosit sedimentasyon hızı','lab','Sistemik inflamasyon ve trombositoz paternini değerlendirmek.','Lökositoz, belirgin CRP/ESR yüksekliği ve trombositoz vardır.', [['Lökosit','17.800/mm³','4.000–10.000','Yüksek'],['CRP','86 mg/L','<5','Yüksek'],['Trombosit','610.000/mm³','150.000–450.000','Yüksek']]),
    inv('ekokardiyografi','Ekokardiyografi','cardiac','Koroner arter dilatasyonu veya anevrizmayı araştırmak.','Sol ön inen koroner arterde hafif genişleme izlenir.', [['LAD z-skoru','+2.6','<+2','Genişleme']]),
    inv('idrar-alt','İdrar sedimenti ve karaciğer enzimleri','lab','Steril piyüri ve eşlik eden inflamatuvar organ tutulumunu değerlendirmek.','Steril piyüri ve hafif transaminaz yüksekliği vardır.', [['İdrar lökositi','12/hpf','0–5','Yüksek'],['ALT','76 U/L','<40','Yüksek']])
  ]
});
add('Septik şokta ilk yaklaşım', {
  title: 'Hipotansiyon ve yüksek laktatla gelen ürosepsis', profile:'72 yaşında kadın · Acil servis', presentation:'Ateş, konfüzyon ve hipotansiyon',
  stem:'Yetmiş iki yaşındaki kadın hasta iki gündür ateş, titreme ve dizüri sonrası gelişen bilinç bulanıklığı nedeniyle acile getirilir. Son saatlerde idrar çıkışı azalmış, yakınları hastanın giderek daha uykuya meyilli olduğunu belirtmiştir.',
  risk:['Enfeksiyon odağına eşlik eden hipotansiyon ve laktat yüksekliği doku hipoperfüzyonunu gösterir.', 'Kan kültürü alınması tedaviyi geciktirmemeli; erken antibiyotik ve kristalloid resüsitasyonu mortaliteyi azaltan ilk basamaktır.'],
  clues:['Sistolik kan basıncının 90 mmHg’nin altında olması ve soğuk ekstremiteler şok tablosunu destekler.', 'Piyüri/nitrit pozitifliği enfeksiyon odağını üriner sistem lehine daraltır.'],
  exam:['Hasta konfüzedir, ekstremiteleri soğuk ve kapiller dolum süresi uzundur.', 'Suprapubik hassasiyet ve sağ kostovertebral açı hassasiyeti vardır; ense sertliği ve fokal nörolojik defisit yoktur.'],
  vitals:{TA:'82/48 mmHg',Nabız:'132/dk',Solunum:'28/dk',SpO2:'93%',Ateş:'39.1 °C'},
  investigations:[
    inv('laktat-kan-gazi','Laktat ve arter kan gazı','lab','Doku hipoperfüzyonu ve asidozu göstermek.','Laktat yüksek ve metabolik asidoz vardır.', [['Laktat','5.2 mmol/L','<2','Yüksek'],['pH','7.29','7.35–7.45','Düşük'],['HCO3','17 mmol/L','22–26','Düşük']]),
    inv('kultur','Kan kültürü ve idrar kültürü','culture','Ampirik antibiyotik öncesi örnek almak.','İki set kan kültürü ve idrar kültürü alınır; antibiyotik bekletilmez.', [['Kan kültürü','Örnek alındı','—','Tedavi öncesi'],['İdrar kültürü','Örnek alındı','—','Odak']]),
    inv('idrar-tahlili','Tam idrar tahlili','lab','Üriner enfeksiyon odağını desteklemek.','Piyüri, nitrit pozitifliği ve bakteriüri vardır.', [['Lökosit','>50/hpf','0–5','Yüksek'],['Nitrit','Pozitif','Negatif','Pozitif']])
  ]
});
add('Status epileptikusta ilk ilaç', {
  title:'Beş dakikayı aşan jeneralize nöbet', profile:'44 yaşında erkek · Acil servis', presentation:'Devam eden tonik-klonik nöbet',
  stem:'Kırk dört yaşındaki erkek hasta acile getirildiğinde jeneralize tonik-klonik nöbeti yedi dakikadır devam etmektedir. Yakınları nöbet öncesinde travma olmadığını, hastanın bilincinin hiç açılmadığını ve düzenli antiepileptik kullanmadığını söyler.',
  risk:['Beş dakikayı aşan konvülsiyon status epileptikus kabul edilir ve nöronal hasar riski nedeniyle tedavi bekletilmez.', 'İlk ilaç intravenöz veya intramüsküler benzodiazepindir; glukoz ve elektrolit değerlendirmesi tedaviyi geciktirmemelidir.'],
  clues:['Devam eden jeneralize motor aktivite ve bilinç açılmaması status epileptikus lehinedir.', 'Hipoglisemi dışlanırken hava yolu güvenliği ve oksijenasyon eş zamanlı yönetilir.'],
  exam:['Hasta bilinçsizdir; jeneralize tonik-klonik kasılmalar sürmekte, çene kilitlenmesi ve sekresyon artışı izlenmektedir.', 'Pupiller izokoriktir; lateralizan travma bulgusu yoktur, oksijen desteği ile satürasyon korunur.'],
  vitals:{TA:'146/88 mmHg',Nabız:'118/dk',Solunum:'24/dk',SpO2:'94%',Ateş:'36.9 °C'},
  investigations:[
    inv('parmak-ucu-glukoz','Parmak ucu glukoz','bedside','Hipoglisemiye bağlı nöbeti hızlıca dışlamak.','Glukoz normal sınırlardadır.', [['Glukoz','104 mg/dL','70–110','Referans içinde']]),
    inv('elektrolit','Elektrolit paneli','lab','Sodyum, kalsiyum veya metabolik bozukluğu araştırmak.','Acil tedaviyi açıklayacak ağır elektrolit bozukluğu yoktur.', [['Sodyum','139 mEq/L','135–145','Normal'],['Kalsiyum','9.1 mg/dL','8.5–10.5','Normal']]),
    inv('kan-gazi','Kan gazı ve oksijenasyon','lab','Hipoksi/asidoz derecesini izlemek.','Hafif laktik asidoz vardır; ilk tedavi benzodiazepinle nöbeti sonlandırmaktır.', [['pH','7.32','7.35–7.45','Düşük'],['Laktat','3.8 mmol/L','<2','Yüksek']])
  ]
});
add('Kordon sarkmasında yaklaşım', {
  title:'Membran rüptürü sonrası fetal bradikardi ve kord palpasyonu', profile:'32 yaşında 39 haftalık gebe · Doğumhane', presentation:'Su gelişi sonrası fetal kalp hızında ani düşme',
  stem:'Otuz iki yaşındaki 39 haftalık gebe, spontan membran rüptüründen hemen sonra fetal kalp atımında ani düşme nedeniyle değerlendirilir. Hasta yoğun baskı hissi tarifler; vajinal muayenede gelen kısmın önünde kord benzeri pulsasyon veren yapı palpe edilir.',
  risk:['Kordon sarkmasında fetal hipoksi dakikalar içinde gelişebilir; doğum gerçekleşene kadar kord basısı azaltılmalıdır.', 'Vajinal doğum yakın değilse acil sezaryen hazırlığı geciktirilmemelidir.'],
  clues:['Membran rüptürü sonrası fetal bradikardi ve vajende pulsasyon veren kord palpasyonu tanı koydurucudur.', 'Gelen kısmın elle yukarı itilmesi, diz-dirsek/Trendelenburg pozisyonu ve acil sezaryen aynı anda planlanır.'],
  exam:['Vajinal muayenede serviks 5 cm dilate, baş -2 seviyededir ve kord yapısı gelen kısmın önünde palpe edilir.', 'Fetal kalp hızı monitörde 70/dk düzeyine düşmüş ve değişken deselerasyonlar izlenmektedir.'],
  vitals:{TA:'118/72 mmHg',Nabız:'96/dk',Solunum:'18/dk',SpO2:'98%',Ateş:'36.7 °C'},
  investigations:[
    inv('fetal-monitor','Fetal kalp hızı monitörizasyonu','obstetric','Fetal hipoksi bulgusunu göstermek.','Uzamış bradikardi ve değişken deselerasyonlar vardır.', [['Fetal kalp hızı','70/dk','110–160','Bradikardi']]),
    inv('vajinal-muayene','Steril vajinal muayene','clinical','Kordun gelen kısmın önünde olup olmadığını değerlendirmek.','Pulsasyon veren kord vajende palpe edilir.', [['Kord','Palpe edilir','Palpe edilmez','Tanısal']])
  ]
});
add('Tiroid cerrahisi sonrası ses kısıklığı', {
  title:'Tiroidektomi sonrası vokal kord paralizisi', profile:'48 yaşında kadın · Cerrahi sonrası', presentation:'Ameliyat sonrası belirgin ses kısıklığı',
  stem:'Kırk sekiz yaşındaki kadın hasta total tiroidektomiden sonra başlayan belirgin ses kısıklığı ve konuşurken çabuk yorulma nedeniyle değerlendirilir. Operasyon öncesinde ses problemi yoktur; yutma sırasında zaman zaman öksürük tarifler.',
  risk:['Tiroid cerrahisinde trakeoözofageal olukta seyreden tekrarlayan laringeal sinir yaralanma riski altındadır.', 'Vokal kord hareket kusuru aspirasyon ve kalıcı ses bozukluğu açısından erken değerlendirilmelidir.'],
  clues:['Operasyon sonrası yeni gelişen kısık ses ve aspirasyon hissi tekrarlayan laringeal sinir hasarını düşündürür.', 'Fleksibl laringoskopide ipsilateral vokal kord hareketinin azalması anatomik düzeyi doğrular.'],
  exam:['Hasta konuşurken sesi havalı ve kısık çıkar; inspiratuvar stridor yoktur.', 'Boyun insizyonu temizdir; hematom veya belirgin hava yolu basısı bulgusu saptanmaz.'],
  vitals:{TA:'122/76 mmHg',Nabız:'84/dk',Solunum:'16/dk',SpO2:'98%',Ateş:'36.8 °C'},
  investigations:[
    inv('laringoskopi','Fleksibl laringoskopi','ent','Vokal kord hareketini doğrudan değerlendirmek.','Sol vokal kord paramedian pozisyonda ve hareketi azalmıştır.', [['Sol vokal kord','Parezi','Normal hareket','Ayırt ettirici']]),
    inv('boyun-muayene','Boyun ve hava yolu muayenesi','clinical','Hematom veya hava yolu basısını dışlamak.','Cerrahi alanda hematom yoktur.', [['Boyun hematomu','Yok','Yok','Dışlandı']])
  ]
});
add('Pudendal blokta hedef sinir', {
  title:'Doğumda pudendal blok için anatomik hedef', profile:'27 yaşında term gebe · Doğumhane', presentation:'İkinci evrede perineal analjezi gereksinimi',
  stem:'Yirmi yedi yaşındaki term gebe doğumun ikinci evresindedir ve epizyotomi/perineal onarım için lokal analjezi planlanır. Vajinal muayenede fetal baş aşağı seviyededir; sistemik analjezi yerine pudendal blok uygulanması düşünülür.',
  risk:['Pudendal blok perineal ağrıyı azaltmak için nervus pudendusun iskiyal diken komşuluğunda bloke edilmesine dayanır.', 'Hedef sinirin doğru seçilmesi obstetrik girişimde analjezinin etkili ve güvenli olmasını sağlar.'],
  clues:['İskiyal diken ve sakrospinöz ligament çevresi pudendal sinirin klinik olarak kullanılan landmark bölgesidir.', 'Perine, dış genital bölge ve anal sfinkter duyusu pudendal sinirle ilişkilidir.'],
  exam:['Serviks tam dilatedir; fetal baş +2 seviyededir ve perineal distansiyon belirgindir.', 'İskiyal diken vajinal muayenede palpe edilir; fetal kalp hızı reaktiftir.'],
  vitals:{TA:'118/70 mmHg',Nabız:'92/dk',Solunum:'18/dk',SpO2:'99%',Ateş:'36.6 °C'},
  investigations:[
    inv('obstetrik-muayene','Obstetrik muayene','clinical','Doğum evresi ve blok gereksinimini belirlemek.','Tam dilatasyon ve perineal gerilme vardır.', [['Serviks','10 cm','Tam açıklık','Uygun']]),
    inv('anatomik-landmark','İskiyal diken palpasyonu','clinical','Pudendal blok için anatomik hedefi belirlemek.','İskiyal diken ve sakrospinöz ligament hattı palpe edilir.', [['Landmark','İskiyal diken','—','Hedef']])
  ]
});

// Important high-yield spot/emergency templates.
add('Hiperkalemi ve geniş QRS', {
  profile:'54 yaşında erkek · Acil servis', presentation:'Kas güçsüzlüğü, bulantı ve geniş QRS',
  stem:'Kronik böbrek hastalığı olan 54 yaşındaki erkek hasta halsizlik, bulantı ve yaygın kas güçsüzlüğü ile acile başvurur. EKG’de sivri T dalgaları, P dalgasında silikleşme ve QRS genişlemesi izlenir.',
  risk:['EKG değişikliği olan hiperkalemi kardiyak arrest riski taşır.', 'İlk hedef potasyumu düşürmek değil miyokard membranını stabilize etmektir.'],
  clues:['Potasyumun 7 mEq/L üzerinde olması ve QRS genişlemesi acil intravenöz kalsiyum gerektirir.', 'İnsülin-dekstroz potasyumu hücre içine kaydırır fakat kalsiyumun yerine geçmez.'],
  exam:['Hasta halsiz ve yavaş yanıtlıdır; derin tendon refleksleri azalmıştır.', 'Kalp ritmi düzensizleşmeye eğilimlidir; akciğer oskültasyonunda belirgin ödem bulgusu yoktur.'],
  vitals:{TA:'136/78 mmHg',Nabız:'54/dk',Solunum:'18/dk',SpO2:'97%',Ateş:'36.5 °C'},
  investigations:[inv('ekg','12 derivasyon EKG','ecg','Hiperkaleminin kardiyak etkisini göstermek.','Sivri T dalgaları ve QRS genişlemesi vardır.',[['QRS','140 ms','<120','Geniş'],['T dalgası','Sivri','Normal','Kritik']]), inv('biyokimya','Serum elektrolitleri ve böbrek fonksiyonu','lab','Potasyum düzeyi ve böbrek yetmezliğini göstermek.','Potasyum yüksek, kreatinin belirgin artmıştır.',[['K+','7.1 mEq/L','3.5–5.0','Kritik'],['Kreatinin','7.2 mg/dL','0.6–1.2','Yüksek']])]
});
add('Anafilaksi', {
  profile:'24 yaşında kadın · Acil servis', presentation:'İlaç uygulaması sonrası hipotansiyon ve bronkospazm',
  stem:'Yirmi dört yaşındaki kadın hastada intravenöz antibiyotik uygulamasından birkaç dakika sonra avuç içlerinde kaşıntı, yaygın ürtiker, nefes darlığı ve fenalık hissi gelişir. Kısa sürede tansiyonu düşer ve wheezing duyulur.',
  risk:['Deri bulgularına hipotansiyon veya solunum bulgusu eşlik ediyorsa anafilaksi kabul edilir.', 'İlk tedavi intramüsküler adrenalindir; antihistaminik ve steroid yardımcı tedavidir.'],
  clues:['Dakikalar içinde gelişen ürtiker, bronkospazm ve hipotansiyon sistemik mast hücre aktivasyonunu düşündürür.', 'Tedavinin gecikmesi hava yolu ödemi ve dolaşım kollapsı riskini artırır.'],
  exam:['Hasta ajite ve dispneiktir; yaygın ürtiker, dudaklarda hafif ödem ve bilateral wheezing vardır.', 'Periferik nabızlar zayıf, kapiller dolum gecikmiştir; dil kökünde belirgin obstrüksiyon yoktur.'],
  vitals:{TA:'70/42 mmHg',Nabız:'124/dk',Solunum:'30/dk',SpO2:'91%',Ateş:'36.8 °C'},
  investigations:[inv('klinik-degerlendirme','Hızlı klinik değerlendirme','clinical','Anafilaksiyi geciktirmeden tanımak.','Deri, solunum ve dolaşım bulguları eş zamanlıdır.',[['Ürtiker','Yaygın','Yok','Var'],['Wheezing','Var','Yok','Var'],['Hipotansiyon','Var','Yok','Kritik']]), inv('serum-triptaz','Serum triptaz','lab','Tanıyı sonradan desteklemek; acil tedaviyi geciktirmez.','Akut dönemde yüksek bulunabilir.',[['Triptaz','Yüksek olabilir','Normal','Destekleyici']])]
});
add('DKA tedavisinde ilk basamak', {
  profile:'19 yaşında kadın · Acil servis', presentation:'Poliüri, kusma ve Kussmaul solunumu',
  stem:'Tip 1 diyabetli 19 yaşındaki kadın hasta iki gündür insülinini aksattıktan sonra kusma, karın ağrısı, poliüri ve susuzluk yakınmalarıyla acile başvurur. Muayenede belirgin dehidratasyon ve Kussmaul solunumu vardır.',
  risk:['DKA’da ilk dakikalarda dolaşım hacmi ve doku perfüzyonu düzeltilmelidir.', 'Potasyum düzeyi bilinmeden insülin başlanması aritmi riskini artırabilir.'],
  clues:['Hiperglisemi, ketonemi ve anyon açıklı metabolik asidoz DKA paternini oluşturur.', 'Tedavi sırası sıvı resüsitasyonu, potasyum değerlendirmesi ve ardından insülindir.'],
  exam:['Mukozalar kuru, cilt turgoru azalmış ve kapiller dolum gecikmiştir.', 'Derin ve hızlı solunum ile aseton kokusu fark edilir; fokal batın peritonit bulgusu yoktur.'],
  vitals:{TA:'96/60 mmHg',Nabız:'122/dk',Solunum:'30/dk',SpO2:'97%',Ateş:'36.9 °C'},
  investigations:[inv('kan-gazi-keton','Kan gazı, glukoz ve keton','lab','DKA tanısını ve asidoz şiddetini göstermek.','Hiperglisemi, ketonemi ve anyon açıklı asidoz vardır.',[['Glukoz','486 mg/dL','70–110','Yüksek'],['pH','7.18','7.35–7.45','Düşük'],['Beta-hidroksibütirat','Yüksek','Negatif','Pozitif']]), inv('elektrolit','Elektrolit ve böbrek fonksiyonu','lab','Potasyum ve prerenal azotemiyi değerlendirmek.','Sodyum düşük, potasyum tedavi öncesi dikkatle izlenmelidir.',[['K+','5.2 mEq/L','3.5–5.0','Yüksek-normal'],['Kreatinin','1.4 mg/dL','0.6–1.2','Yüksek']])]
});
add('Acil inmede ilk görüntüleme', exact.get('Akut inmede tromboliz öncesi ilk görüntüleme'));
add('Akut inmede tromboliz öncesi ilk görüntüleme', exact.get('Akut inmede tromboliz öncesi ilk görüntüleme') || {
  title:'Akut inmede kanamayı dışlama', profile:'67 yaşında erkek · İnme acili', presentation:'İki saat önce başlayan sağ hemiparezi ve afazi',
  stem:'Altmış yedi yaşındaki erkek hasta iki saat önce başlayan konuşma bozukluğu ve sağ kol-bacak güçsüzlüğü ile acile getirilir. Yakınları başlangıç saatini net bilmektedir; antikoagülan kullanımı ve travma öyküsü yoktur.',
  risk:['Reperfüzyon tedavisi düşünülüyorsa ilk adım intrakraniyal kanamayı dışlamaktır.', 'Kontrastsız beyin BT hızlı, ulaşılabilir ve kanama dışlama açısından ilk görüntülemedir.'],
  clues:['Ani afazi ve hemiparezi sol hemisfer iskemisini düşündürür.', 'Hipoglisemi dışlandıktan sonra BT’de kanama olmaması tromboliz uygunluğunu değerlendirmeye izin verir.'],
  exam:['Hasta afaziktir; sağ fasiyal asimetri ve sağ üst ekstremitede 3/5 güç kaybı vardır.', 'Ense sertliği, travma bulgusu ve hipoglisemi yoktur.'],
  vitals:{TA:'156/88 mmHg',Nabız:'92/dk',Solunum:'18/dk',SpO2:'97%',Ateş:'36.6 °C'},
  investigations:[inv('glukoz','Parmak ucu glukoz','bedside','İnme taklitçisi hipoglisemiyi dışlamak.','Glukoz normal sınırlardadır.',[['Glukoz','106 mg/dL','70–110','Normal']]),inv('bt','Kontrastsız beyin BT','ct','İntrakraniyal kanamayı dışlamak.','Akut kanama saptanmaz.',[['Kanama','Yok','Yok','Dışlandı']]),inv('cta','BT/MR anjiyografi','ct','Büyük damar oklüzyonunu değerlendirmek.','Sol MCA dalında oklüzyon izlenebilir.',[['Damar','MCA dal oklüzyonu','Açık','Destekleyici']])]
});
add('Eklampside nöbet kontrolü', {
  profile:'30 yaşında gebe · Doğumhane acili', presentation:'Hipertansiyon ve konvülziyon',
  stem:'Otuz yaşındaki 34 haftalık gebe şiddetli baş ağrısı, görme bulanıklığı ve sağ üst kadran ağrısından sonra jeneralize nöbet geçirir. Daha önce preeklampsi nedeniyle izlem önerilmiş ancak düzenli takip edilmemiştir.',
  risk:['Preeklampsi zemininde gelişen nöbet eklampsidir ve anne-fetüs morbiditesi yüksektir.', 'Nöbet kontrolünde ilk tercih magnezyum sülfattır; antihipertansifler yardımcı basamaktır.'],
  clues:['Hipertansiyon, proteinüri ve nöbet birlikteliği eklampsi lehinedir.', 'Magnezyum düzeyi ve derin tendon refleksleri tedavi güvenliği için izlenir.'],
  exam:['Hasta postiktal ve ajitedir; pretibial ödem ve artmış derin tendon refleksleri saptanır.', 'Fetal kalp atımları izlenir; ense sertliği ve travma bulgusu yoktur.'],
  vitals:{TA:'170/112 mmHg',Nabız:'108/dk',Solunum:'20/dk',SpO2:'96%',Ateş:'36.8 °C'},
  investigations:[inv('idrar-protein','İdrar protein/kreatinin oranı','lab','Preeklampsi bulgusunu desteklemek.','Belirgin proteinüri vardır.',[['Protein/kreatinin','0.8','<0.3','Yüksek']]), inv('hemogram-karaciger','Hemogram, trombosit ve karaciğer enzimleri','lab','HELLP ve organ etkilenimini değerlendirmek.','Trombosit sınırda düşük, AST/ALT yüksektir.',[['Trombosit','110.000/mm³','150.000–450.000','Düşük'],['AST','96 U/L','<40','Yüksek']])]
});
add('Travma hastasında ilk basamak', {
  profile:'26 yaşında erkek · Travma odası', presentation:'Motor kazası sonrası bilinç bulanıklığı',
  stem:'Yirmi altı yaşındaki erkek hasta yüksek hızlı motor kazası sonrası acile getirilir. Hasta huzursuzdur, yüzünde kanama vardır ve konuşurken solunumu gürültülüdür.',
  risk:['Travmada ilk değerlendirme tanıdan önce yaşamı tehdit eden hava yolu, solunum ve dolaşım sorunlarını bulmaya yöneliktir.', 'ABC yaklaşımı atlanırsa görüntüleme veya ayrıntılı öykü hayat kurtarıcı müdahaleyi geciktirebilir.'],
  clues:['Gürültülü solunum ve yüz travması hava yolu güvenliği açısından ilk değerlendirilmesi gereken bulgulardır.', 'Dolaşım ve solunum stabilize edilmeden ikincil bakıya geçilmez.'],
  exam:['Hasta ajitedir; ağız içinde kan ve sekresyon vardır, servikal immobilizasyon uygulanmıştır.', 'Solunum sesleri iki tarafta değerlendirilir; radial nabız zayıf ve kapiller dolum uzamıştır.'],
  vitals:{TA:'90/58 mmHg',Nabız:'128/dk',Solunum:'30/dk',SpO2:'90%',Ateş:'36.4 °C'},
  investigations:[inv('abc','Primer bakı','clinical','Hava yolu, solunum ve dolaşımı hızlı değerlendirmek.','Hava yolu sekresyonla risk altındadır ve dolaşım instabilitesi vardır.',[['Hava yolu','Riskli','Açık','Öncelikli'],['Dolaşım','Hipotansif','Stabil','Öncelikli']]), inv('e-fast','E-FAST','ultrasound','İnternal kanama veya pnömotoraksı hızlı taramak.','Hemodinamik instabilitede yatak başı karar verir.',[['FAST','Değerlendirilir','Negatif','Yatak başı']])]
});
add('Bilinç değişikliğinde hızlı dışlanması gereken neden', {
  profile:'68 yaşında erkek · Acil servis', presentation:'Ani bilinç bulanıklığı',
  stem:'Altmış sekiz yaşındaki diyabetik erkek hasta terleme, konuşmada yavaşlama ve uykuya meyil nedeniyle acile getirilir. Yakınları son öğününü atladığını ve insülin yaptığını belirtir.',
  risk:['Bilinç değişikliğinde hipoglisemi hızlı, geri döndürülebilir ve hayatı tehdit eden bir nedendir.', 'Parmak ucu glukoz ölçümü nörolojik görüntüleme veya geniş laboratuvar panelinden önce yapılmalıdır.'],
  clues:['Diyabet, öğün atlama, terleme ve bilinç bulanıklığı hipoglisemiyi öncelikle düşündürür.', 'Glukoz düşüklüğü saptanırsa tedavi tanısaldır ve geciktirilmemelidir.'],
  exam:['Hasta soğuk terli ve somnolandır; fokal motor defisit saptanmaz.', 'Pupiller izokorik, ense sertliği yoktur; oral alımı güvenli değildir.'],
  vitals:{TA:'118/72 mmHg',Nabız:'104/dk',Solunum:'18/dk',SpO2:'98%',Ateş:'36.5 °C'},
  investigations:[inv('glukoz','Parmak ucu glukoz','bedside','Hipoglisemiyi hızlı dışlamak veya doğrulamak.','Glukoz belirgin düşüktür.',[['Glukoz','38 mg/dL','70–110','Düşük']])]
});
add('Üreme çağındaki kadında akut karın değerlendirmesi', {
  profile:'24 yaşında kadın · Acil servis', presentation:'Alt karın ağrısı ve adet gecikmesi',
  stem:'Yirmi dört yaşındaki kadın hasta ani başlayan alt karın ağrısı ve baş dönmesi nedeniyle acile başvurur. Son adetinin altı hafta önce olduğunu, gebelik testini evde yapmadığını söyler.',
  risk:['Üreme çağındaki kadında akut karında gebelik olasılığı dışlanmadan radyoloji veya cerrahi karar güvenli değildir.', 'İdrar beta-hCG testi ektopik gebelik gibi acil tanıları erken yakalatır.'],
  clues:['Adet gecikmesi, alt karın ağrısı ve baş dönmesi ektopik gebeliği ayırıcı tanıda öncelikli yapar.', 'Beta-hCG pozitifliği sonraki adımda transvajinal ultrasonografi gerektirir.'],
  exam:['Hasta hafif soluktur; alt kadranlarda hassasiyet ve servikal hareket ağrısı vardır.', 'Omuz ağrısı ve peritoneal irritasyon bulguları rüptür şüphesini artırır.'],
  vitals:{TA:'96/60 mmHg',Nabız:'112/dk',Solunum:'20/dk',SpO2:'98%',Ateş:'36.7 °C'},
  investigations:[inv('hcg','İdrar beta-hCG testi','lab','Gebeliği hızlıca doğrulamak veya dışlamak.','Beta-hCG pozitiftir.',[['İdrar beta-hCG','Pozitif','Negatif','Pozitif']]), inv('tvu','Transvajinal ultrasonografi','ultrasound','İntrauterin gebelik ve adneksiyal kitleyi değerlendirmek.','Uterus boş, adneksiyal kitle ve serbest sıvı vardır.',[['İntrauterin gebelik','Yok','Var','Şüpheli'],['Serbest sıvı','Var','Yok','Risk']])]
});

const branchRisk = {
  'İç Hastalıkları': ['Semptom süresi, vital bulgular ve organ etkilenimi birlikte okunarak aciliyet düzeyi belirlenir.', 'Laboratuvar veya görüntüleme sonucu, öyküdeki ana yakınmayı tanısal karara bağlar.'],
  'Çocuk Sağlığı ve Hastalıkları': ['Yaş, semptom süresi, beslenme/aktivite durumu ve vital bulgular pediatrik aciliyeti belirler.', 'Çocuk hastada fizik muayene bulgusu ve hedef tetkik sonucu birlikte değerlendirilmelidir.'],
  'Genel Cerrahi': ['Ağrının başlangıcı, lokalizasyonu ve periton bulguları cerrahi aciliyetin temel belirleyicileridir.', 'Görüntüleme ve laboratuvar verileri ameliyat gereksinimi veya konservatif izlem kararını netleştirir.'],
  'Kadın Hastalıkları ve Doğum': ['Gebelik durumu, kanama paterni, ağrı karakteri ve fetal/anne stabilitesi birlikte değerlendirilir.', 'Beta-hCG, ultrasonografi veya obstetrik muayene bulgusu tanısal kararın merkezindedir.'],
  'Küçük Stajlar': ['Nörolojik, psikiyatrik, göz, KBB, deri veya ortopedik odak sistematik muayeneyle ayırt edilir.', 'Fokal muayene bulgusu, yatak başı test veya görüntüleme sonucu kararın yönünü belirler.'],
  'Tıbbi Mikrobiyoloji': ['Maruziyet öyküsü, inkübasyon süresi ve klinik sendrom olası etkeni daraltır.', 'Kültür, seroloji, mikroskopi veya hızlı test sonucu etken seçimini destekler.'],
  'Tıbbi Biyokimya': ['Klinik fenotip, metabolik kriz zamanı ve karakteristik laboratuvar paterni birlikte yorumlanır.', 'Amino asit, organik asit, elektrolit veya enzim göstergesi tanısal ipucunu verir.'],
  'Tıbbi Patoloji': ['Morfolojik patern ve doku düzeyindeki hasar mekanizması tanısal ayrımı sağlar.', 'Histokimyasal, immünohistokimyasal veya mikroskobik bulgu patolojik tanıyı güçlendirir.'],
  'Tıbbi Farmakoloji': ['İlaç maruziyeti, zamanlama ve toksisite bulgusu birlikte değerlendirilir.', 'Antidot veya tedavi seçimi toksidromun baskın fizyolojik etkisine göre belirlenir.'],
  'Anatomi': ['Yakınmanın dağılımı, cerrahi/travma ilişkisi ve muayene bulgusu anatomik yapıyı lokalize eder.', 'Motor, duyu veya otonom defisit doğru sinir-damar ilişkisiyle eşleştirilmelidir.'],
  'Fizyoloji': ['Fizyolojik yanıt, uyarı ile oluşan kompansatuvar değişiklik arasındaki ilişki üzerinden değerlendirilir.', 'Vital bulgu veya ölçüm sonucu mekanizmanın yönünü gösterir.'],
  'Histoloji ve Embriyoloji': ['Klinik bulgu, embriyolojik köken veya doku hücresiyle ilişkilendirilerek yorumlanır.', 'Mikroskobik yapı, gelişimsel mekanizma veya hücre tipi tanı için belirleyicidir.'],
  'TUS Spot Olgular': ['Yaşamı tehdit eden bulgu varsa ilk karar tanısal kesinleşmeden önce güvenli basamakla verilir.', 'Öykü, muayene ve seçilmiş tetkik sonucu tek bir öncelikli tanı veya yaklaşımı desteklemelidir.']
};

function topicFallback(c) {
  const title = c.title || '';
  const corr = c.diagnosis?.correct || c.answerTarget || 'tanısal karar';
  const lower = (title + ' ' + corr).toLocaleLowerCase('tr-TR');
  if (lower.includes('otitis')) return {
    exam:['Otoskopide timpan membran eritemli, opak ve dışa bombeleşmiştir; ışık refleksi kaybolmuştur.', 'Mastoid hassasiyet yoktur; dış kulak yolunda yaygın ödem saptanmaz.'],
    investigations:[inv('otoskopi','Otoskopik değerlendirme','clinical','Orta kulak inflamasyonunu görmek.','Bombeleşmiş ve opak timpan membran akut otitis mediayı destekler.',[['Timpan membran','Bombeleşmiş','Normal','Destekleyici']])]
  };
  if (lower.includes('menenjit') || lower.includes('mening')) return {
    exam:['Hasta toksik görünümdedir; ense sertliği ve fotofobi vardır.', 'Peteşiyal döküntü ve bilinç bulanıklığı invaziv bakteriyel süreci destekler.'],
    investigations:[inv('bos','BOS incelemesi','lab','Menenjit paternini belirlemek.','Nötrofilik pleositoz, düşük glukoz ve yüksek protein vardır.',[['BOS lökosit','1200/mm³','<5','Yüksek'],['BOS glukoz','Düşük','Normal','Bakteriyel']]), inv('kan-kulturu','Kan kültürü','culture','Antibiyotik öncesi etken araştırmak.','Kan kültürü alınır; antibiyotik geciktirilmez.',[['Kan kültürü','Örnek alındı','—','Tedavi öncesi']])]
  };
  if (lower.includes('apandisit')) return {
    exam:['Sağ alt kadranda hassasiyet, rebound ve psoas/obturator manevralarıyla ağrı artışı vardır.', 'Barsak sesleri hafif azalmıştır; yaygın peritonit bulgusu yoktur.'],
    investigations:[inv('hemogram-crp','Hemogram ve CRP','lab','Enflamasyonu desteklemek.','Lökositoz ve CRP yüksekliği vardır.',[['Lökosit','14.800/mm³','4.000–10.000','Yüksek'],['CRP','46 mg/L','<5','Yüksek']]), inv('usg-bt','Abdominal ultrasonografi/BT','imaging','Apendiks çapı ve çevre inflamasyonu değerlendirmek.','Çapı artmış, komprese olmayan apendiks izlenir.',[['Apendiks çapı','9 mm','<6 mm','Artmış']])]
  };
  if (lower.includes('tüberküloz') || lower.includes('tuberculosis')) return {
    exam:['Hasta zayıf ve terli görünümdedir; üst zonlarda raller ve ekspiryum sonunda kaba solunum sesleri duyulur.', 'Servikal lenf nodları küçük ve hareketlidir; akut solunum yetmezliği bulgusu yoktur.'],
    investigations:[inv('akciger-grafisi','Akciğer grafisi','xray','Üst lob tutulumunu ve kaviteyi göstermek.','Üst lobda kaviter infiltrasyon izlenir.',[['Üst lob','Kavite','Yok','Ayırt ettirici']]), inv('balgam-arb-naat','Balgam ARB boyama ve NAAT','microbiology','M. tuberculosis kanıtını araştırmak.','ARB pozitifliği ve NAAT pozitifliği saptanır.',[['ARB','Pozitif','Negatif','Pozitif'],['NAAT','Pozitif','Negatif','Pozitif']])]
  };
  if (lower.includes('glokom')) return {
    exam:['Göz kızarık ve ağrılıdır; kornea hafif bulanık, pupil mid-dilate ve ışık yanıtı azalmıştır.', 'Görme keskinliği azalmış, palpasyonda göz serttir.'],
    investigations:[inv('goz-ici-basinc','Göz içi basıncı ölçümü','ophthalmology','Akut açı kapanmasını desteklemek.','Göz içi basıncı belirgin yüksektir.',[['GİB','54 mmHg','10–21','Yüksek']]), inv('yarik-lamba','Yarık lamba muayenesi','ophthalmology','Kornea ve ön kamara açısını değerlendirmek.','Sığ ön kamara ve korneal ödem izlenir.',[['Ön kamara','Sığ','Normal','Destekleyici']])]
  };
  if (lower.includes('torsiyon')) return {
    exam:['Etkilenen tarafta hassas kitle ele gelir; ani ağrı nedeniyle muayene sınırlıdır.', 'İlgili organın kanlanma kaybını düşündüren hareket/kremaster veya Doppler bulgusu değerlendirilir.'],
    investigations:[inv('doppler','Doppler ultrasonografi','ultrasound','Kan akımını değerlendirmek.','Etkilenen yapıda kan akımı azalmış veya kaybolmuştur.',[['Kan akımı','Azalmış/yok','Normal','Acil']])]
  };
  return { exam:null, investigations:null };
}

function synthInvestigation(c) {
  const corr = c.diagnosis?.correct || 'doğru tanı';
  const title = c.title || '';
  const br = c.relatedBranch || '';
  const t = (title + ' ' + corr + ' ' + br).toLocaleLowerCase('tr-TR');
  if (br === 'Kadın Hastalıkları ve Doğum' || /gebelik|vajinal|uterin|over|plasenta|postpartum|fetal|preeklampsi|eklamsi/.test(t)) {
    return [
      inv('beta-hcg-usg','Beta-hCG ve transvajinal/obstetrik ultrasonografi','obstetric','Gebelik durumu, uterin/adneksiyal yapı ve fetal durumu değerlendirmek.', `${corr} lehine belirleyici obstetrik bulgu saptanır.`, [['Beta-hCG/USG', 'Tanısal patern', 'Normal', 'Ayırt ettirici']]),
      inv('hemogram-koagulasyon','Hemogram ve koagülasyon paneli','lab','Kanama ve organ etkilenimini değerlendirmek.', 'Hemodinami ve kanama riskiyle uyumlu bulgular izlenir.', [['Hemoglobin', 'İzleme uygun', '12–16 g/dL', 'Bağlamsal']])
    ];
  }
  if (br === 'Anatomi') {
    return [
      inv('hedef-muayene','Hedef anatomik muayene','clinical','Motor, duyu veya cerrahi alan bulgusunu anatomik yapıyla eşleştirmek.', `${corr} tutulumunu destekleyen dağılım saptanır.`, [['Dağılım','Anatomik yapıyla uyumlu','Uyumsuz','Ayırt ettirici']]),
      inv('gerekirse-goruntuleme','Gerekirse görüntüleme/lokal inceleme','imaging','Travma veya cerrahi alan ilişkisini netleştirmek.', 'Lezyon alanı beklenen anatomik komşulukla uyumludur.', [['Lokalizasyon','Uyumlu','Normal','Destekleyici']])
    ];
  }
  if (br === 'Küçük Stajlar' || /inme|nöbet|glokom|vertigo|otitis|kırık|tendinit|psoriasis|konküzyon/.test(t)) {
    return [
      inv('hedef-muayene','Hedef sistem muayenesi','clinical','Yakınmanın ait olduğu sistemi ayrıntılı değerlendirmek.', `${corr} lehine odak bulgu saptanır.`, [['Odak bulgu','Var','Yok','Destekleyici']]),
      inv('secilmis-tetkik','Seçilmiş doğrulayıcı tetkik','diagnostic','Ayırıcı tanıyı daraltmak.', 'Sonuç doğru tanı ile uyumludur.', [['Sonuç','Uyumlu patern','Normal','Destekleyici']])
    ];
  }
  if (br === 'Tıbbi Mikrobiyoloji') {
    return [
      inv('mikroskopi-kultur','Mikroskopi, kültür veya hızlı moleküler test','microbiology','Etkeni veya karakteristik mikrobiyolojik paterni göstermek.', `${corr} lehine mikrobiyolojik kanıt elde edilir.`, [['Etken testi','Pozitif/uyumlu','Negatif','Destekleyici']]),
      inv('temel-lab','Hemogram ve inflamasyon belirteçleri','lab','Enfeksiyon şiddetini değerlendirmek.', 'Klinik sendromla uyumlu inflamatuvar yanıt vardır.', [['Lökosit/CRP','Yüksek veya beklenen patern','Normal','Bağlamsal']])
    ];
  }
  if (br === 'Tıbbi Farmakoloji') {
    return [
      inv('ilac-oykusu','İlaç maruziyeti ve toksidrom değerlendirmesi','clinical','Zamanlama ve toksisite bulgularını ilişkilendirmek.', `${corr} ile uyumlu toksidrom paterni vardır.`, [['Maruziyet','Uyumlu','Yok','Ayırt ettirici']]),
      inv('guvenlik-lablari','EKG, CK/elektrolit veya organ fonksiyon testleri','lab','Toksisite komplikasyonlarını izlemek.', 'Tedavi seçimini destekleyen güvenlik bulguları değerlendirilir.', [['Komplikasyon izlemi','Gerekli','Normal','İzlem']])
    ];
  }
  if (br === 'Tıbbi Biyokimya') {
    return [
      inv('metabolik-panel','Metabolik tarama paneli','lab','Karakteristik biyokimyasal paterni yakalamak.', `${corr} lehine metabolik anormallik saptanır.`, [['Metabolit/enzim','Tanısal yönde değişmiş','Normal','Ayırt ettirici']]),
      inv('kan-gazi-glukoz','Kan gazı, glukoz ve elektrolitler','lab','Metabolik krizin şiddetini değerlendirmek.', 'Asidoz, hipoglisemi veya elektrolit paterni klinikle birlikte yorumlanır.', [['Asit-baz/glukoz','Beklenen patern','Normal','Destekleyici']])
    ];
  }
  if (br === 'Tıbbi Patoloji' || br === 'Histoloji ve Embriyoloji') {
    return [
      inv('histolojik-inceleme','Histolojik/morfolojik inceleme','pathology','Doku veya hücre düzeyindeki tanısal paterni göstermek.', `${corr} lehine karakteristik morfolojik bulgu vardır.`, [['Morfoloji','Karakteristik','Yok','Ayırt ettirici']]),
      inv('yardimci-boyama','Yardımcı boyama veya immünohistokimya','pathology','Gerektiğinde tanıyı desteklemek.', 'Ek bulgu morfolojik tanıyı destekler.', [['Yardımcı test','Destekleyici','Negatif','Bağlamsal']])
    ];
  }
  return [
    inv('temel-panel','Hemogram, biyokimya ve hedef belirteçler','lab','Organ etkilenimi ve tanısal paterni değerlendirmek.', `${corr} lehine destekleyici laboratuvar paterni vardır.`, [['Ana bulgu','Beklenen yönde değişmiş','Normal','Destekleyici']]),
    inv('hedef-goruntuleme','Hedefe yönelik görüntüleme veya fonksiyon testi','diagnostic','Şüpheli sistemi objektif olarak değerlendirmek.', 'Tetkik sonucu öykü ve muayene ile aynı tanıya yönelir.', [['Sonuç','Destekleyici','Normal','Ayırt ettirici']])
  ];
}

function setSpec(c, spec) {
  if (!spec) return c;
  if (spec.title) c.title = spec.title;
  c.demographics = spec.profile?.split('·')[0]?.trim() || c.demographics;
  c.setting = spec.profile?.split('·')[1]?.trim() || c.setting;
  c.chiefComplaint = spec.presentation || c.chiefComplaint;
  c.stem = spec.stem || c.stem;
  c.clinicalFocus = 'Öykü, fizik muayene ve seçilmiş tetkik sonuçlarını birleştirerek en doğru klinik karar hangisidir.';
  c.patientIntro = {
    profile: spec.profile || c.patientIntro?.profile || `${c.demographics} · ${c.setting}`,
    presentation: spec.presentation || c.patientIntro?.presentation || c.chiefComplaint,
    riskContext: spec.risk || c.patientIntro?.riskContext,
    distinctiveClues: spec.clues || c.patientIntro?.distinctiveClues,
    historySummary: spec.stem || c.patientIntro?.historySummary || c.stem,
  };
  c.exam = spec.exam || c.exam;
  if (spec.vitals) c.vitals = spec.vitals;
  if (spec.investigations) c.availableInvestigations = spec.investigations;
  c.useSyntheticInvestigationBank = false;
  return c;
}

function polish(c, idx) {
  c = JSON.parse(JSON.stringify(c));
  const spec = exact.get(c.title);
  if (spec) c = setSpec(c, spec);

  // Base cleanup of all strings recursively.
  function walk(obj) {
    if (typeof obj === 'string') return cleanText(obj);
    if (Array.isArray(obj)) return obj.map(walk).filter(x => !(typeof x === 'string' && !x));
    if (obj && typeof obj === 'object') { for (const k of Object.keys(obj)) obj[k] = walk(obj[k]); }
    return obj;
  }
  c = walk(c);

  const correct = c.diagnosis?.correct || c.answerTarget || 'doğru klinik karar';
  if (!c.patientIntro || typeof c.patientIntro !== 'object') c.patientIntro = {};
  if (!c.patientIntro.profile || /Kısa olgu|TUS spot|Erişkin hasta · Klinik değerlendirme|Klinik değerlendirme/i.test(c.patientIntro.profile)) {
    c.patientIntro.profile = `${c.demographics || 'Hasta'} · ${c.setting || 'Klinik değerlendirme'}`;
  }
  if (!c.patientIntro.presentation) c.patientIntro.presentation = c.chiefComplaint || c.title;
  if (isBadText(c.stem)) {
    c.stem = `${c.patientIntro.profile.split('·')[0].trim()} ${c.chiefComplaint || c.title} nedeniyle değerlendirilir. Öykü, muayene ve hedef tetkik sonuçları ${correct} kararını sorgulatacak biçimde birlikte ele alınır.`;
  }
  if (isBadText(c.patientIntro.historySummary)) c.patientIntro.historySummary = c.stem;

  // Risk context and clues.
  let risk = uniq(c.patientIntro.riskContext || []);
  if (risk.length < 2 || risk.some(isBadText)) risk = branchRisk[c.relatedBranch] || branchRisk['TUS Spot Olgular'];
  risk = risk.map(x => x.replace(/^([A-ZÇĞİÖŞÜa-zçğıöşü0-9 \-]+) olasılığı,\s*/i, ''));
  c.patientIntro.riskContext = uniq(risk).slice(0,2);

  let exam = uniq(c.exam || []);
  const fallback = topicFallback(c);
  if (fallback.exam && (exam.length < 2 || exam.some(isBadText) || exam.some(e => c.stem.includes(e) || e.includes(c.stem.slice(0,40))))) {
    exam = fallback.exam;
  }
  if (exam.length < 2 || exam.some(isBadText) || exam.some(e => c.stem.includes(e) || e.includes(c.patientIntro.historySummary?.slice(0,40)))) {
    exam = [
      `${c.patientIntro.presentation || c.title} odağına yönelik muayenede ${correct} lehine klinik bulgular araştırılır.`,
      `Vital bulgular ve sistem muayenesi, acil müdahale gerektiren tabloyu dışlayacak şekilde birlikte değerlendirilir.`
    ];
  }
  c.exam = uniq(exam).slice(0,2);

  let invs = Array.isArray(c.availableInvestigations) ? c.availableInvestigations : [];
  const invText = JSON.stringify(invs);
  if (fallback.investigations && (invs.length === 0 || BAD.some(re => new RegExp(re.source, re.flags).test(invText)))) invs = fallback.investigations;
  if (invs.length === 0 || BAD.some(re => new RegExp(re.source, re.flags).test(JSON.stringify(invs)))) invs = synthInvestigation(c);
  invs = invs.map((x, i) => {
    const label = cleanText(x.label || `Tetkik ${i+1}`);
    const summary = cleanText(x.summary || x.result?.summary || `${correct} lehine destekleyici bulgu vardır.`);
    const purpose = cleanText(x.purpose || `Tanısal kararı destekleyen objektif veri elde etmek.`);
    const type = cleanText(x.type || 'diagnostic');
    const values = Array.isArray(x.result?.values) && x.result.values.length ? x.result.values.map(row => Array.isArray(row) ? row.map(cleanText) : row) : [['Sonuç', summary, 'Normal', 'Destekleyici']];
    return inv(x.id || safeId(label), label, type, purpose, summary, values);
  }).filter(x => x.label && x.summary);
  // Remove generic labels if any after cleanup.
  invs = invs.map(x => {
    if (/^görüntüleme|^laboratuvar|^tetkik$/i.test(x.label) || /hedef/i.test(x.label)) {
      x.label = x.type === 'lab' ? 'Seçilmiş laboratuvar paneli' : x.type === 'culture' ? 'Kültür/serolojik inceleme' : 'Seçilmiş doğrulayıcı tetkik';
      x.result.title = x.label;
    }
    return x;
  });
  c.availableInvestigations = invs.slice(0,3);

  let clues = uniq(c.patientIntro.distinctiveClues || []);
  if (clues.length < 2 || clues.some(isBadText) || clues.some(x => c.stem.includes(x))) {
    const fromExam = c.exam.filter(x => !c.stem.includes(x));
    const fromInv = c.availableInvestigations.map(x => x.summary).filter(Boolean);
    clues = uniq([...fromExam, ...fromInv]).slice(0,2);
  }
  if (clues.length < 2) clues.push(`${correct} seçeneği, öyküdeki ana yakınma ile objektif bulguların aynı yönde olmasıyla öne çıkar.`);
  c.patientIntro.distinctiveClues = uniq(clues).slice(0,2);

  c.patientIntro.historySummary = c.stem;

  // Improve diagnosis explanations and feedback to avoid generic/broken inherited text.
  const firstInv = c.availableInvestigations?.[0];
  const evidence = [c.stem, c.exam?.[0], firstInv ? `${firstInv.label} sonucunda ${firstInv.summary.charAt(0).toLocaleLowerCase('tr-TR') + firstInv.summary.slice(1)}` : ''].filter(Boolean);
  const explanation = `${evidence.join(' ')} Bu bütünlük ${correct} yanıtını en güçlü seçenek yapar.`;
  if (c.diagnosis) {
    c.diagnosis.explanation = explanation;
    c.diagnosis.whyCorrect = explanation;
    c.diagnosis.evidenceChain = evidence.slice(0,3).map(text => ({ text, weight: 'high', source: 'case' }));
    const opts = Array.isArray(c.diagnosis.options) ? c.diagnosis.options : [];
    c.diagnosis.answerFeedback = c.diagnosis.answerFeedback || {};
    c.diagnosis.feedbackByOption = c.diagnosis.feedbackByOption || {};
    for (const opt of opts) {
      const msg = opt === correct ? explanation : `${opt} bu olguda beklenen ana öykü, muayene ve tetkik paternini ${correct} kadar tutarlı açıklamaz.`;
      c.diagnosis.answerFeedback[opt] = msg;
      c.diagnosis.feedbackByOption[opt] = { explanation: msg, keyClues: c.patientIntro.distinctiveClues };
    }
    c.diagnosis.optionFeedback = c.diagnosis.feedbackByOption;
  }
  return walk(c);
}

let out = rawCases.map(polish);
// Ensure all answer options are 5 and no broken relatedBranch from previous passes.
out.forEach(c => { if (c.relatedBranch === 'lar') c.relatedBranch = 'TUS Spot Olgular'; if (c.diagnosis?.options?.length > 5) c.diagnosis.options = c.diagnosis.options.slice(0,5); });

const body = `import { applyTusLanguageStandardToCase } from '../utils/tusLanguageStandard.js';\n\nexport const rawCases = ${JSON.stringify(out, null, 2)};\n\nconst sanitizedCases = rawCases.map(applyTusLanguageStandardToCase);\n\nexport const cases = sanitizedCases;\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`;
fs.writeFileSync('./src/data/cases.js', body, 'utf8');
console.log('Wrote', out.length, 'cases');
