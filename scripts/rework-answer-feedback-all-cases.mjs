import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cases } from '../src/data/cases.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const targetFile = path.join(rootDir, 'src/data/cases.js');
const reportFile = path.join(rootDir, 'ANSWER_FEEDBACK_GLOBAL_REWORK_REPORT.json');
const summaryFile = path.join(rootDir, 'ANSWER_FEEDBACK_GLOBAL_REWORK_SUMMARY.md');

const MAX_EVIDENCE = 5;
const MAX_PEARLS = 4;
const MAX_MANAGEMENT = 4;

const BRANCH_STANDARDS = {
  'medical-microbiology': {
    pearlLabel: 'Etken-test ayrımı',
    fallbackPearl: 'Mikrobiyoloji sorularında etken, bulaş yolu, özgül tanı testi ve tedavi/izolasyon ilişkisi birlikte yorumlanmalıdır.',
    approach: ['Etkeni düşündüren klinik/epidemiyolojik ipucunu belirle.', 'Tanı testini doğrudan tanı adı okumadan patern olarak yorumla.', 'Tedavi veya izolasyon kararını etken ve klinik ağırlığa göre netleştir.'],
  },
  'medical-pharmacology': {
    pearlLabel: 'İlaç mantığı',
    fallbackPearl: 'Farmakoloji sorularında doğru yanıt etki mekanizması, yan etki, kontrendikasyon veya antidot ilişkisi üzerinden seçilmelidir.',
    approach: ['İlacın hedef reseptör/enzim mekanizmasını belirle.', 'Yan etki, kontrendikasyon veya antidot ipucunu seçeneklerle eşleştir.', 'Benzer ilaçları klinik kullanım farkıyla ele.'],
  },
  'medical-pathology': {
    pearlLabel: 'Morfolojik patern',
    fallbackPearl: 'Patoloji sorularında hücre tipi, nekroz/inflamasyon paterni ve histolojik ayırt ettirici bulgu doğru yanıtı belirler.',
    approach: ['Doku veya hücre paternini tanımla.', 'Morfolojik bulguyu hastalık mekanizmasına bağla.', 'Benzer lezyonları ayırt ettiren özgül bulguyu kullan.'],
  },
  'medical-biochemistry': {
    pearlLabel: 'Yolak/marker ayrımı',
    fallbackPearl: 'Biyokimya sorularında enzim, metabolit, kofaktör veya yolak basamağı doğru yanıtın mekanistik temelidir.',
    approach: ['Yolak üzerindeki bozuk basamağı belirle.', 'Metabolit veya laboratuvar paternini mekanizmayla eşleştir.', 'Benzer enzim/yolak çeldiricilerini birikim-eksiklik ilişkisiyle ayır.'],
  },
  anatomy: {
    pearlLabel: 'Anatomik lokalizasyon',
    fallbackPearl: 'Anatomi sorularında lezyon yeri, komşuluk ve fonksiyon kaybı doğru yapıyı seçtirir.',
    approach: ['Semptomun anatomik lokalizasyonunu belirle.', 'Komşuluk ve fonksiyon kaybını ilgili yapı ile eşleştir.', 'Benzer yapıları dağılım veya innervasyon farkıyla ele.'],
  },
  physiology: {
    pearlLabel: 'Fizyolojik ilişki',
    fallbackPearl: 'Fizyoloji sorularında değişkenler arasındaki yön ilişkisi ve homeostatik yanıt doğru seçeneği belirler.',
    approach: ['Değişen fizyolojik parametreyi belirle.', 'Geri bildirim veya kompansasyon yönünü çıkar.', 'Seçenekleri beklenen yanıt yönüne göre ele.'],
  },
  'histology-embryology': {
    pearlLabel: 'Doku-gelişim ilişkisi',
    fallbackPearl: 'Histoloji/embriyoloji sorularında doku katmanı, hücre tipi veya gelişimsel köken ayırt ettirici bilgidir.',
    approach: ['Hücre/doku tipini veya embriyolojik kökeni belirle.', 'Morfolojik bulguyu fonksiyon ya da gelişim basamağıyla eşleştir.', 'Benzer dokuları boyanma, tabaka veya köken farkıyla ayır.'],
  },
};

const CLINICAL_FALLBACK_APPROACH = [
  'Önce vital bulgular ve acil kırmızı bayrakları değerlendir.',
  'Karar verdirici öykü-muayene-tetkik paternini birlikte yorumla.',
  'Doğru tanı veya tedavi kararını geciktirmeden en güvenli ilk adımı uygula.',
];

function normalizeText(value = '') {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim();
}

function sentence(value = '') {
  const text = normalizeText(value);
  if (!text) return '';
  const fixed = text.charAt(0).toLocaleUpperCase('tr') + text.slice(1);
  return /[.!?]$/u.test(fixed) ? fixed : `${fixed}.`;
}

function trimPunctuation(value = '') {
  return normalizeText(value).replace(/[.;:]$/u, '');
}

function itemText(item) {
  if (!item) return '';
  if (typeof item === 'string') return normalizeText(item);
  return normalizeText(item.text || item.description || item.summary || item.explanation || item.label || item.title || '');
}

function itemTitle(item) {
  if (!item || typeof item === 'string') return '';
  return normalizeText(item.title || item.label || item.heading || '');
}

function splitSentences(text = '') {
  return normalizeText(text).split(/(?<=[.!?])\s+/u).filter(Boolean);
}

function compact(text = '', max = 520, sentences = 4) {
  const source = splitSentences(text).slice(0, sentences).join(' ') || normalizeText(text);
  if (source.length <= max) return source;
  return `${source.slice(0, max).replace(/\s+\S*$/u, '').trim()}…`;
}

function removeMeta(text = '') {
  return normalizeText(text)
    .replace(/Bu spot olguda\s+/giu, '')
    .replace(/öğrenci\s+[^.]*\.?/giu, '')
    .replace(/Bu vaka,?\s*/giu, '')
    .replace(/klinik bağlamda değerlendirilir/giu, 'olgudaki objektif paternle yorumlanır')
    .replace(/öğrenme çıktısı/giu, 'sınav hedefi')
    .trim();
}

function unique(items = []) {
  const seen = new Set();
  return items.filter((item) => {
    const key = itemText(item).toLocaleLowerCase('tr');
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function inferEvidenceTitle(text = '', fallback = 'Kanıt') {
  const n = normalizeText(text).toLocaleLowerCase('tr');
  if (/st |ekg|derivasyon|ritim|qrs|qt|pr\b|segment/.test(n)) return 'EKG paterni';
  if (/bt|mr|mrg|usg|grafi|tomografi|görüntüleme|radyografi|ultrason/.test(n)) return 'Görüntüleme bulgusu';
  if (/troponin|crp|lökosit|hemoglobin|trombosit|glukoz|ph\b|baz açığı|enzim|metabolit|kreatinin|ast|alt|bilirubin|seroloji|kültür|pcr|marker|antikor|antijen|igg|igm|ige|iga/.test(n)) return 'Laboratuvar paterni';
  if (/muayene|oskültasyon|defans|rebound|döküntü|ekimoz|letarji|ral|üfürüm|ödem|nörolojik|ateş|nabız|hipotansiyon/.test(n)) return 'Muayene bulgusu';
  if (/öykü|maruziyet|travma|ilaç|sigara|gebelik|doğum|aile|beslenme|seyahat|temas|başvuru/.test(n)) return 'Öykü ipucu';
  if (/yaş|bebek|çocuk|yenidoğan|erkek|kadın|adölesan|gebede/.test(n)) return 'Klinik bağlam';
  if (/reseptör|enzim|gen|mutasyon|yolak|hormon|protein|histolojik|nekroz|inflamasyon|morfoloji/.test(n)) return 'Mekanizma';
  if (/negatif|saptanmadı|normal|yok/.test(n)) return 'Dışlatıcı bulgu';
  return fallback;
}

function titled(item, fallbackTitle = 'Kanıt', max = 190) {
  let title = itemTitle(item);
  let text = removeMeta(itemText(item));
  if (!text) return null;
  const colon = text.match(/^([^:：]{2,44})[:：]\s*(.+)$/u);
  if (!title && colon) {
    title = normalizeText(colon[1]);
    text = normalizeText(colon[2]);
  }
  if (!title) title = inferEvidenceTitle(text, fallbackTitle);
  return { title: trimPunctuation(title).slice(0, 58), text: sentence(compact(text, max, 2)) };
}

function getFeedback(c) {
  return c.diagnosis?.answerFeedback || c.answerFeedback || {};
}

function getCorrect(c) {
  return c.diagnosis?.correct || '';
}

function mainClue(c, feedback = getFeedback(c)) {
  const candidates = [
    feedback.spotClue,
    c.spotClue,
    c.patientIntro?.priorityFocus,
    c.patientIntro?.distinctiveClues?.[0],
    Array.isArray(feedback.evidenceChain) ? itemText(feedback.evidenceChain[0]) : '',
    c.clinicalFocus,
    c.chiefComplaint,
  ];
  return compact(removeMeta(candidates.find((x) => itemText(x)) || ''), 180, 1);
}

function buildWhyCorrect(c, feedback) {
  const correct = getCorrect(c);
  const clue = mainClue(c, feedback);
  const explicit = removeMeta(feedback.whyCorrect || c.diagnosis?.explanation || '');
  if (explicit) {
    const text = compact(explicit, 620, 4);
    if (/Bu nedenle|Doğru yaklaşım|en iyi seçenek|en uygun/i.test(text)) return sentence(text);
    return sentence(`${text} Bu nedenle en iyi yanıt ${correct} seçeneğidir.`);
  }
  return sentence(`${clue ? `${clue} karar verdirici ana ipucudur. ` : ''}Bu nedenle ${correct} olgudaki öykü, muayene ve objektif veri paternini en iyi açıklar.`);
}

function collectEvidence(c, feedback) {
  const raw = [];
  if (Array.isArray(feedback.evidenceChain)) raw.push(...feedback.evidenceChain);
  if (Array.isArray(c.patientIntro?.distinctiveClues)) {
    c.patientIntro.distinctiveClues.slice(0, 3).forEach((x) => raw.push({ title: 'Ayırt ettirici ipucu', text: x }));
  }
  if (c.chiefComplaint) raw.push({ title: 'Başvuru paterni', text: `${c.chiefComplaint} başvurunun ana problemidir` });
  if (Array.isArray(c.exam) && c.exam.length) raw.push({ title: 'Muayene bulgusu', text: c.exam[0] });
  (c.investigations || []).slice(0, 3).forEach((inv) => {
    const text = inv.summary || inv.findings?.[0];
    if (text) raw.push({ title: inv.label || 'Tetkik paterni', text });
  });
  splitSentences(c.diagnosis?.explanation || '').slice(0, 2).forEach((x) => raw.push({ title: 'Gerekçe bağlantısı', text: x }));

  return unique(raw)
    .map((item, index) => titled(item, `Kanıt ${index + 1}`, 185))
    .filter(Boolean)
    .slice(0, MAX_EVIDENCE);
}

function inferPearlLabel(text = '', c) {
  const n = normalizeText(text).toLocaleLowerCase('tr');
  if (/kırmızı bayrak|red flag|tutarsız|acil|geciktirmez|bildirim/.test(n)) return 'TUS kırmızı bayrağı';
  if (/ilk|başla|önce|bekleme|stabilizasyon|reperfüzyon|tedavi/.test(n)) return 'İlk adım';
  if (/değil|kaçır|karışır|tuzak|çeldirici|yanlış/.test(n)) return 'Sık tuzak';
  if (/mekanizma|enzim|reseptör|gen|yolak|inhibe|aktive/.test(n)) return 'Mekanizma';
  if (/tanı|test|marker|seroloji|kültür|pcr|histoloji|morfoloji/.test(n)) return 'Ayırt ettirici bulgu';
  return BRANCH_STANDARDS[c.branchId]?.pearlLabel || 'Sınav incisi';
}

function collectPearls(c, feedback) {
  const branchStandard = BRANCH_STANDARDS[c.branchId];
  const raw = [];
  if (Array.isArray(feedback.clinicalPearls)) raw.push(...feedback.clinicalPearls);
  if (Array.isArray(feedback.pearls)) raw.push(...feedback.pearls);
  if (Array.isArray(c.diagnosis?.pearls)) raw.push(...c.diagnosis.pearls);
  if (c.spotPearl) raw.push(c.spotPearl);
  if (raw.length < 2) raw.push(branchStandard?.fallbackPearl || 'TUS sorularında karar verdirici bulgu, benzer çeldiricileri eleten en özgül patern olarak hatırlanmalıdır.');
  const clue = mainClue(c, feedback);
  if (raw.length < 3 && clue) raw.push(`Ayırt ettirici ipucu: ${clue}`);

  return unique(raw)
    .map((item) => {
      let title = itemTitle(item);
      let text = itemText(item);
      const colon = text.match(/^([^:：]{2,44})[:：]\s*(.+)$/u);
      if (!title && colon) {
        title = colon[1];
        text = colon[2];
      }
      title = title || inferPearlLabel(text, c);
      return { label: trimPunctuation(title).slice(0, 58), text: sentence(compact(removeMeta(text), 170, 1)) };
    })
    .filter((x) => x.text)
    .slice(0, MAX_PEARLS);
}

function inferManagementTitle(text = '') {
  const n = normalizeText(text).toLocaleLowerCase('tr');
  if (/stabil|abc|hava yolu|solunum|dolaşım|monitör|damar yolu|nöbet|vital/.test(n)) return 'Stabilizasyon';
  if (/kaydet|dokümante|objektif/.test(n)) return 'Objektif kayıt';
  if (/adli|bildirim|güvenlik|koruyucu|mahremiyet/.test(n)) return 'Güvenlik ve bildirim';
  if (/tetkik|ekg|bt|mr|usg|kültür|seroloji|biyopsi|marker|laboratuvar|doğrula/.test(n)) return 'Tanısal doğrulama';
  if (/tedavi|başla|ver|antibiyotik|antikoagülasyon|aspirin|insülin|antidot|cerrahi|pci|reperfüzyon|hipotermi|sıvı|operasyon/.test(n)) return 'İlk tedavi';
  if (/izle|takip|kontrol|komplikasyon|yanıt|daralt|değiştir/.test(n)) return 'İzlem';
  return 'Yaklaşım';
}

function splitActionItems(text = '') {
  const normalized = normalizeText(text);
  if (!normalized) return [];
  const semicolonParts = normalized.split(/;\s*/u).map(trimPunctuation).filter(Boolean);
  if (semicolonParts.length > 1) return semicolonParts;
  const sentenceParts = splitSentences(normalized).map(trimPunctuation).filter(Boolean);
  if (sentenceParts.length > 1) return sentenceParts;
  return [normalized];
}

function collectManagement(c, feedback) {
  let raw = [];
  if (Array.isArray(feedback.managementSteps) && feedback.managementSteps.length) raw = feedback.managementSteps;
  else if (Array.isArray(feedback.management) && feedback.management.length) raw = feedback.management;
  else if (c.diagnosis?.nextStep) raw = splitActionItems(c.diagnosis.nextStep);
  else raw = BRANCH_STANDARDS[c.branchId]?.approach || CLINICAL_FALLBACK_APPROACH;

  if (raw.length < 2) raw.push(...(BRANCH_STANDARDS[c.branchId]?.approach || CLINICAL_FALLBACK_APPROACH));

  return unique(raw)
    .map((step) => {
      let title = itemTitle(step);
      const text = itemText(step);
      title = title || inferManagementTitle(text);
      return { title, text: sentence(compact(removeMeta(text), 165, 1)) };
    })
    .filter((x) => x.text)
    .slice(0, MAX_MANAGEMENT);
}

function getWrongMaps(c, feedback) {
  const maps = [feedback.whyWrong, feedback.differentialComparison, feedback.differentials, feedback.differentialExplanations, c.diagnosis?.differentials]
    .filter((x) => x && typeof x === 'object' && !Array.isArray(x));
  return maps.reduce((acc, map) => {
    Object.entries(map).forEach(([key, value]) => {
      if (!key || acc[key]) return;
      acc[key] = typeof value === 'string'
        ? { explanation: value, comparisonPoints: [] }
        : { explanation: value?.explanation || value?.summary || '', comparisonPoints: value?.comparisonPoints || value?.points || [] };
    });
    return acc;
  }, {});
}

function comparisonPoints(c, option, evidence, feedback, explicitPoints = []) {
  const points = explicitPoints.map(itemText).filter(Boolean).filter((x) => !/klinik bağlamda|öğrenci|ayırıcı tanıda yer alabilir/i.test(x));
  const clue = mainClue(c, feedback);
  if (points.length < 1 && clue) points.push(`Ana ipucu: ${clue}`);
  if (points.length < 2 && evidence[0]) points.push(`Kanıt: ${evidence[0].text}`);
  if (points.length < 3) points.push(`${option} kendi tipik paterninde doğru olabilir; bu olguda karar verdirici veri farklıdır.`);
  return unique(points).slice(0, 3).map((p) => sentence(compact(removeMeta(p), 160, 1)));
}

function buildWrongOptionFeedback(c, feedback, evidence) {
  const correct = getCorrect(c);
  const clue = mainClue(c, feedback);
  const map = getWrongMaps(c, feedback);
  const result = {};
  const differentials = {};
  (c.diagnosis?.options || []).forEach((option) => {
    if (option === correct) return;
    const explicit = map[option] || {};
    let explanation = removeMeta(explicit.explanation || '');
    if (!explanation || /klinik bağlamda|ayırıcı tanıda yer alabilir|öğrenci/i.test(explanation)) {
      explanation = `${option} benzer bir klinik başlık gibi görünebilir; ancak bu vakada ${clue ? `${clue} ` : 'kanıt zinciri '}doğru yanıt lehinedir. Bu seçenek karar verdirici bulguyu veya ilk yaklaşım önceliğini eksik bırakır; doğru karar ${correct} seçeneğidir.`;
    } else if (!/ancak|fakat|bu olguda|bu vakada/i.test(explanation)) {
      explanation = `${explanation} Ancak bu vakada ${clue || 'karar verdirici kanıt zinciri'} ${correct} lehine daha güçlüdür.`;
    }
    explanation = sentence(compact(explanation, 360, 3));
    result[option] = explanation;
    differentials[option] = {
      explanation,
      comparisonPoints: comparisonPoints(c, option, evidence, feedback, explicit.comparisonPoints),
    };
  });
  return { whyWrong: result, differentialComparison: differentials };
}

function patchChildAbuse(c) {
  const evidenceChain = [
    { title: 'Letarji', text: 'Postiktal durum beklenebilir; ancak beslenme bozukluğu ve genel durum düşüklüğü eşlik ediyorsa ek neden aranmalıdır.' },
    { title: 'Ekimozların yaşı', text: 'Farklı iyileşme evrelerindeki morluklar tekrarlayan travmayı düşündürür.' },
    { title: 'Öykü-bulgu uyumsuzluğu', text: 'Bildirilen hafif düşme öyküsü yaygın fizik bulgular ve nörolojik etkilenmeyle açıklanamaz.' },
    { title: 'Yüksek özgüllükte ipuçları', text: 'Subdural kanama, retinal kanama, posterior kosta ve metafizer lezyon istismar şüphesini güçlendirir.' },
  ];
  const pearls = [
    { label: 'Bildirim için kesin tanı gerekmez', text: 'Çocuk istismarında güçlü şüphe güvenlik, kayıt ve bildirim sürecini başlatmak için yeterlidir.' },
    { label: 'TUS kırmızı bayrakları', text: 'Tutarsız öykü, farklı yaşta ekimoz, retinal/subdural kanama, posterior kosta-metafiz kırığı ve açıklanamayan nöbet-letarji birlikte düşünülmelidir.' },
    { label: 'Süreç eş zamanlıdır', text: 'Stabilizasyon geciktirilmez; objektif kayıt ve koruyucu/adli bildirim aynı anda yürütülür.' },
  ];
  const managementSteps = [
    { title: 'Stabilizasyon', text: 'Aktif nöbet, hava yolu, solunum ve dolaşımı değerlendir; gerekiyorsa akut nöbet tedavisini uygula.' },
    { title: 'Objektif kayıt', text: 'Ekimozların yeri, yaşı, dağılımı ve eşlik eden nörolojik bulguları ayrıntılı kaydet.' },
    { title: 'Güvenlik ve bildirim', text: 'Çocuğun güvenliğini sağlayarak adli/koruyucu bildirim sürecini kesin tanı beklemeden başlat.' },
  ];
  const correct = getCorrect(c);
  const wrongs = {};
  const diffs = {};
  (c.diagnosis?.options || []).forEach((option) => {
    if (option === correct) return;
    let explanation;
    if (/antiepileptik/i.test(option)) {
      explanation = 'Antiepileptik tedavi aktif nöbet kontrolü için gerekebilir; ancak bu yaklaşım olgunun güvenlik boyutunu kaçırır. Açıklanamayan ekimozlar, tutarsız öykü ve letarji çocuk istismarı şüphesini doğurduğundan yalnızca nöbet tedavisiyle beklemek yetersizdir.';
    } else if (/adli süreç tamamlanana kadar/i.test(option)) {
      explanation = 'Adli süreç önemlidir; ancak tıbbi stabilizasyonu ertelemek yanlıştır. Çocuk istismarı şüphesinde acil tedavi, objektif kayıt ve bildirim eş zamanlı yürütülür.';
    } else if (/taburcu/i.test(option) || /bildirim yapmadan/i.test(option)) {
      explanation = 'Bakıcı beyanı tek başına güven verici değildir; öykü-bulgu uyumsuzluğu ve farklı yaşta ekimozlar bildirim eşiğini aşar. Bu nedenle taburculuk ve bildirimsiz izlem çocuğun güvenliğini riske atar.';
    } else {
      explanation = `${option} bu olguda güvenlik ve bildirim yükümlülüğünü eksik bırakır; doğru yaklaşım stabilizasyonla birlikte objektif kayıt ve koruyucu/adli bildirimdir.`;
    }
    wrongs[option] = explanation;
    diffs[option] = {
      explanation,
      comparisonPoints: [
        'Ana ipucu: tutarsız öykü, farklı yaşlarda ekimoz ve letarji birlikteliği.',
        'Yanlış şık nöbeti veya beyanı merkeze alırken çocuğun güvenliğini eksik bırakır.',
        'Kesin tanı beklenmeden güvenlik ve bildirim süreci başlatılmalıdır.',
      ],
    };
  });
  c.diagnosis.answerFeedback = {
    ...(c.diagnosis.answerFeedback || {}),
    diagnosisMeta: 'Çocuk istismarı şüphesi · stabilizasyon · objektif kayıt · güvenlik ve bildirim',
    whyCorrect: 'Bu olguda nöbet tek başına primer nörolojik olay gibi ele alınmamalıdır. Farklı yaşlarda ekimozlar, tutarsız travma öyküsü ve letarji kaza dışı travma/çocuk istismarı açısından kırmızı bayraktır. Doğru yaklaşım; akut stabilizasyonu sürdürürken bulguları objektif kaydetmek, çocuğun güvenliğini sağlamak ve adli/koruyucu bildirim sürecini başlatmaktır.',
    whyWrong: wrongs,
    evidenceChain,
    pearls,
    clinicalPearls: pearls,
    managementSteps,
    management: managementSteps,
    differentialComparison: diffs,
  };
  c.spotPearl = pearls[0].text;
}

let rewritten = 0;
const branchCounts = {};
const branchRewritten = {};
const childAbuseIds = [];

for (const c of cases) {
  branchCounts[c.branchId] = (branchCounts[c.branchId] || 0) + 1;
  c.diagnosis = c.diagnosis || {};
  c.diagnosis.answerFeedback = c.diagnosis.answerFeedback || {};
  const feedback = c.diagnosis.answerFeedback;

  if (/çocuk istismarı|kaza dışı travma|tutarsız bebek/i.test(`${c.title} ${c.clinicalFocus} ${c.stem}`)) {
    patchChildAbuse(c);
    childAbuseIds.push(c.id);
    rewritten += 1;
    branchRewritten[c.branchId] = (branchRewritten[c.branchId] || 0) + 1;
    continue;
  }

  const evidenceChain = collectEvidence(c, feedback);
  const pearls = collectPearls(c, feedback);
  const managementSteps = collectManagement(c, feedback);
  const wrongFeedback = buildWrongOptionFeedback(c, feedback, evidenceChain);

  const newFeedback = {
    ...feedback,
    diagnosisMeta: feedback.diagnosisMeta || c.clinicalFocus || c.setting || c.title,
    whyCorrect: buildWhyCorrect(c, feedback),
    whyWrong: wrongFeedback.whyWrong,
    evidenceChain,
    pearls,
    clinicalPearls: pearls,
    managementSteps,
    management: managementSteps,
    differentialComparison: wrongFeedback.differentialComparison,
    learningOutcome: removeMeta(feedback.learningOutcome || c.learningOutcome || c.clinicalFocus || c.title),
    feedbackStandardVersion: 'global-answer-feedback-v3',
  };

  c.diagnosis.answerFeedback = newFeedback;
  rewritten += 1;
  branchRewritten[c.branchId] = (branchRewritten[c.branchId] || 0) + 1;
}

const content = `export const cases = ${JSON.stringify(cases, null, 2)};\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`;
fs.writeFileSync(targetFile, content, 'utf8');

const report = {
  generatedAt: new Date().toISOString(),
  totalCases: cases.length,
  casesReviewed: cases.length,
  feedbackRewritten: rewritten,
  branchCounts,
  branchRewritten,
  childAbuseIds,
  standard: {
    clinicalReasoning: '2-4 sentence case-specific why correct/why wrong',
    evidenceChain: '3-5 titled clue objects from case-specific history/exam/investigation data',
    pearls: '2-4 labeled high-yield TUS notes',
    management: '2-4 titled first-action steps or mechanism approach notes',
    optionComparison: 'all wrong options receive short explanation and comparison points',
  },
};
fs.writeFileSync(reportFile, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

const lines = [
  '# KlinikIQ Global Answer Feedback Rework',
  '',
  `- İncelenen vaka sayısı: ${cases.length}`,
  `- Yeniden standardize edilen feedback sayısı: ${rewritten}`,
  `- Çocuk istismarı özel düzeltmesi: ${childAbuseIds.join(', ') || 'yok'}`,
  '',
  '## Yeni standart',
  '',
  '- Klinik Gerekçe: doğru/yanlış cevabın karar verdirici ipucunu 2-4 cümleyle açıklar.',
  '- Kanıt Zinciri: yalnızca olgudaki somut öykü, muayene, tetkik, risk veya mekanizma ipuçlarını başlıklı maddeler halinde verir.',
  '- Sınav Notu / Kritik İpuçları: TUS kırmızı bayrağı, sık tuzak, ilk adım veya mekanizma bilgisi olarak etiketlenmiş kısa hap bilgiler içerir.',
  '- İlk Yönetim / Yaklaşım: klinik vakalarda 2-4 eylem basamağı, temel bilimlerde mekanistik yaklaşım notu olarak düzenlenir.',
  '- Seçenek Karşılaştırması: tüm seçenekler için doğru/çeldirici ayrımı, kullanıcının seçtiği yanlış şık vurgulanacak şekilde hazırlanır.',
  '',
  '## Branş dağılımı',
  '',
  ...Object.entries(branchCounts).map(([branch, count]) => `- ${branch}: ${count} vaka`),
  '',
];
fs.writeFileSync(summaryFile, `${lines.join('\n')}\n`, 'utf8');

console.log(JSON.stringify(report, null, 2));
