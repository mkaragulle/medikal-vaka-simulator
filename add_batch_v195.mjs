import fs from 'node:fs';
import { rawCases } from './src/data/cases.js';

const pastedPath = '/mnt/data/klinik_iq_tus_30_yeni_anti_repeat_set_37_39_exact_structure(1).txt';
const outPath = './src/data/cases.js';
const pastedCases = JSON.parse(fs.readFileSync(pastedPath, 'utf8'));

function slugify(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'I')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72) || 'vaka';
}

function getBranchId(relatedBranch = '') {
  const text = String(relatedBranch).toLocaleLowerCase('tr-TR');
  if (text.includes('pediatri') || text.includes('neonatoloji') || text.includes('çocuk sağlığı') || text.includes('cocuk sagligi')) return 'pediatrics';
  if (text.includes('kadın') || text.includes('kadin') || text.includes('doğum') || text.includes('dogum') || text.includes('obstetri') || text.includes('jinekoloji')) return 'obstetrics-gynecology';
  if (text.includes('anatomi')) return 'anatomy';
  if (text.includes('fizyoloji')) return 'physiology';
  if (text.includes('histoloji') || text.includes('embriyoloji')) return 'histology-embryology';
  if (text.includes('farmakoloji')) return 'medical-pharmacology';
  if (text.includes('patoloji') && !text.includes('pediatri')) return 'medical-pathology';
  if (text.includes('biyokimya') || text.includes('metabolizma')) return 'medical-biochemistry';
  if (text.includes('mikrobiyoloji')) return 'medical-microbiology';
  if (text.includes('genel cerrahi') || /^cerrahi/.test(text) || text.includes('/ cerrahi')) return 'general-surgery';
  if (text.includes('dahiliye') || text.includes('iç hastalıkları') || text.includes('ic hastaliklari') || text.includes('kardiyoloji') || text.includes('nefroloji') || text.includes('endokrinoloji') || text.includes('hematoloji') || text.includes('romatoloji') || text.includes('gastroenteroloji') || text.includes('enfeksiyon')) return 'internal-medicine';
  if (text.includes('nöroloji') || text.includes('noroloji') || text.includes('acil') || text.includes('toksikoloji') || text.includes('üroloji') || text.includes('uroloji') || text.includes('ortopedi') || text.includes('psikiyatri') || text.includes('dermatoloji') || text.includes('kbb') || text.includes('göz') || text.includes('goz')) return 'minor-rotations';
  return 'minor-rotations';
}

function extractDemographics(profile = '') {
  const beforeComma = String(profile || '').split(',')[0]?.trim();
  return beforeComma || profile || 'Hasta';
}

function extractSetting(profile = '') {
  const text = String(profile || '').toLocaleLowerCase('tr-TR');
  if (text.includes('çocuk acil')) return 'Çocuk acil servis';
  if (text.includes('acil servis')) return 'Acil servis';
  if (text.includes('travma odası')) return 'Travma odası';
  if (text.includes('doğum acil')) return 'Doğum acil ünitesi';
  if (text.includes('doğum salonu')) return 'Doğum salonu';
  if (text.includes('yenidoğan yoğun bakım')) return 'Yenidoğan yoğun bakım';
  if (text.includes('yenidoğan servisi')) return 'Yenidoğan servisi';
  if (text.includes('yenidoğan')) return 'Yenidoğan değerlendirmesi';
  if (text.includes('doğumhane')) return 'Doğumhane';
  if (text.includes('servis')) return 'Servis';
  if (text.includes('poliklinik')) return 'Poliklinik';
  return 'Klinik değerlendirme';
}

function parseVitals(physical = '') {
  const vitals = {};
  const text = String(physical || '');
  const bp = text.match(/Kan basıncı\s*([0-9]{2,3}\/[0-9]{2,3}\s*mmHg)/i);
  if (bp) vitals.TA = bp[1].replace(/\s+/g, ' ');
  const pulse = text.match(/(?:nabız|kalp hızı)\s*([0-9]{2,3}\s*\/dk)/i);
  if (pulse) vitals.Nabız = pulse[1].replace(/\s+/g, '');
  const rr = text.match(/solunum sayısı\s*([0-9]{1,3}\s*\/dk)/i);
  if (rr) vitals.Solunum = rr[1].replace(/\s+/g, '');
  const temp = text.match(/(?:vücut sıcaklığı|ateş)\s*([0-9]{2}(?:\.[0-9])?\s*°C)/i);
  if (temp) vitals.Ateş = temp[1].replace(/\s+/g, '');
  const spo2 = text.match(/(?:oksijen satürasyonu|SpO2)(?:[^%]*?)%\s*([0-9]{2,3})/i);
  if (spo2) vitals.SpO2 = `%${spo2[1]}`;
  return vitals;
}

function splitSentences(text = '') {
  return String(text || '')
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => /[.!?]$/.test(s) ? s : `${s}.`);
}

function splitExam(physical = '') {
  const sentences = splitSentences(physical);
  const exam = sentences.filter((s) => !/(Kan basıncı|nabız|kalp hızı|solunum sayısı|vücut sıcaklığı|oksijen satürasyonu|SpO2)/i.test(s));
  return exam.length ? exam : [String(physical || '').trim()].filter(Boolean);
}

function formatValue(item) {
  const value = String(item.value ?? '').trim();
  const unit = String(item.unit ?? '').trim();
  const result = String(item.result ?? '').trim();
  if (!value) return result;
  if (!unit) return value;
  if (/^pH$/i.test(unit)) return value;
  return `${value} ${unit}`.replace(/\s+;/g, ';');
}

function investigationSubtype(label = '') {
  const text = String(label).toLocaleLowerCase('tr-TR');
  if (text.includes('grafi') || text.includes('tomografi') || text.includes('ultrason') || text.includes('eko') || text.includes('sintigrafi') || text.includes('ko-oksimetri')) return 'Görüntüleme';
  if (text.includes('biyopsi') || text.includes('histopatoloji') || text.includes('sitoloji') || text.includes('immüno')) return 'Patoloji';
  if (text.includes('kültür') || text.includes('antijen') || text.includes('seroloji') || text.includes('pcr')) return 'Mikrobiyoloji';
  return 'Laboratuvar';
}

function investigationFrom(item, idx) {
  const label = String(item.testName || `Tetkik ${idx + 1}`).trim();
  const value = formatValue(item);
  const reference = String(item.referenceRange || '').trim();
  const comment = String(item.shortComment || '').trim();
  const summary = String(item.result || '').trim() || value || 'Bulgular değerlendirildi.';
  const row = [label, value, reference, comment];
  return {
    id: `${slugify(label)}-${idx + 1}`,
    label,
    title: label,
    type: 'lab',
    priority: 'essential',
    subtype: investigationSubtype(label),
    summary,
    clinicalMeaning: comment || summary,
    result: {
      title: label,
      summary,
      interpretation: comment || summary,
      values: [row],
      rows: [row],
    },
    rows: [row],
    postAnswerExplanation: comment || summary,
  };
}

function getQuestionType(answerTarget = '') {
  const target = String(answerTarget || '').toLowerCase();
  if (target.includes('diagnostic_test')) return 'diagnostic_test';
  if (target.includes('first') || target.includes('next') || target.includes('treatment')) return 'treatment';
  if (target.includes('mechanism')) return 'mechanism';
  if (target.includes('pathogen')) return 'pathogen';
  if (target.includes('pathology')) return 'pathology';
  if (target.includes('anatomy')) return 'anatomy';
  if (target.includes('lab')) return 'lab_interpretation';
  if (target.includes('diagnosis')) return 'diagnosis';
  return target || 'clinical_decision';
}

function getClinicalFocus(answerTarget = '') {
  const type = getQuestionType(answerTarget);
  const map = {
    treatment: 'Klinik tabloya uygun tedavi yaklaşımını seçme.',
    diagnostic_test: 'Uygun tanısal testi klinik bağlamla seçme.',
    mechanism: 'Mekanizmayı klinik bulgularla ilişkilendirme.',
    pathogen: 'Etkeni klinik ve laboratuvar ipuçlarıyla seçme.',
    pathology: 'Patolojik bulguyu klinik bağlamla ilişkilendirme.',
    anatomy: 'Anatomik yapıyı klinik bulgularla ilişkilendirme.',
    diagnosis: 'Tanısal paterni klinik ve objektif verilerle eşleştirme.',
    lab_interpretation: 'Laboratuvar bulgusunu klinik bağlamla yorumlama.',
  };
  return map[type] || 'Klinik veriyi hedeflenen karar noktasıyla eşleştirme.';
}

function clueTitle(text = '', index = 0) {
  if (/(biyopsi|grafi|tomografi|ultrason|sintigrafi|test|kültür|serum|kan|idrar|ekokardiyografi|FAST|BT|ko-oksimetri|laktat|sodyum|kalsiyum|kreatinin|hemoglobin|INR|EKG|elektrokardiyografi)/i.test(text)) return 'Objektif veri';
  if (/(muayene|duyulur|izlen|palpe|hassas|üfürüm|distandü|nabız|kan basıncı|şişlik|solunum|satürasyon|ateş|ödem|ikter)/i.test(text)) return 'Muayene bulgusu';
  return index === 0 ? 'Klinik ipucu' : 'Klinik ipucu';
}

function optionMaps(source, options) {
  const byText = {};
  const byId = {};
  const sourceOptions = Array.isArray(source.options) ? source.options : [];
  for (const option of sourceOptions) {
    const text = String(option.text || '').trim();
    const id = String(option.id || '').trim();
    const feedback = String(source.optionComparison?.[id] || source.optionComparison?.[text] || '').trim();
    byText[text] = feedback;
    if (id) byId[id] = feedback;
  }
  for (const opt of options) if (!byText[opt]) byText[opt] = '';
  return { byText, byId };
}


function reviewDifficultyForDisplay(caseItem, sourceDifficulty) {
  const title = String(caseItem.title || '').toLocaleLowerCase('tr-TR');
  const fullText = JSON.stringify(caseItem).toLocaleLowerCase('tr-TR');

  // Acil sadece gerçek zamanlı acil karar gerektiren klinik durumlarda kullanılır.
  if (
    title.includes('membran rüptürü sonrası fetal kalp atımında düşme') ||
    title.includes('alında veziküler döküntü ve göz ağrısı') ||
    title.includes('antipsikotik sonrası ateş ve boğaz ağrısı') ||
    title.includes('ani bacak ağrısı ve soğukluk') ||
    title.includes('sinüs enfeksiyonu sonrası çift görme') ||
    title.includes('yenidoğanda beslenme sonrası asidoz') ||
    title.includes('tarım ilacı sonrası salivasyon ve bronkore') ||
    title.includes('kusma sonrası göğüs ağrısı') ||
    title.includes('kasık altında ağrılı şişlik') ||
    title.includes('alçı sonrası artan bacak ağrısı')
  ) {
    return 'Acil';
  }

  // Stabil poliklinik / eğitim / mekanizma sorularında Acil kullanılmaz.
  if (
    title.includes('mide asit salgısının son basamağı') ||
    title.includes('testis biyopsisinde destek hücresi') ||
    title.includes('katekolamin salgılayan hücre kökeni') ||
    title.includes('ldl yüksekliği için başlanan ilaç')
  ) {
    return 'Kolay';
  }

  // Temel ama tek basamaklı klinik eşleştirme soruları.
  if (
    title.includes('testis kitlesinde lenf nodu değerlendirmesi') ||
    title.includes('karbondioksit taşınması mekanizması') ||
    title.includes('tekrarlayan gut atakları') ||
    title.includes('uyumadan enerjik olma ve taşkınlık') ||
    title.includes('vancomycin') ||
    title.includes('antibiyotik infüzyonu sırasında kızarma') ||
    title.includes('boyun kaburgası ve elde güçsüzlük') ||
    title.includes('renal tübüler akım azalmasına yanıt') ||
    title.includes('mesane boşaltma refleksi') ||
    title.includes('makrositoz ve nörolojik yakınma') ||
    title.includes('dalgalı ateş ve bel ağrısı') ||
    title.includes('anormal servikal tarama sonucu') ||
    title.includes('alt karın ağrısı ve servikal hassasiyet') ||
    title.includes('yoğun adet kanaması ve pelvik bası') ||
    title.includes('ani yüz felci') ||
    title.includes('tekrarlayan vertigo ve kulakta dolgunluk') ||
    title.includes('erken evre meme kitlesi')
  ) {
    return 'Orta';
  }

  // İleri mekanizma, özel anatomik nokta, ciddi fakat stabil poliklinik/servis tablosu.
  if (
    sourceDifficulty === 'Zor' ||
    fullText.includes('wilson') ||
    fullText.includes('hartnup') ||
    fullText.includes('echinococcus') ||
    fullText.includes('leptospira') ||
    fullText.includes('amiloid') ||
    fullText.includes('osteosarkom') ||
    fullText.includes('pudendal') ||
    fullText.includes('torasik kanal') ||
    fullText.includes('vasa previa') ||
    fullText.includes('tiroglossal') ||
    fullText.includes('syncytiotrophoblast') ||
    fullText.includes('para-aminohippurat')
  ) {
    return 'Zor';
  }

  return sourceDifficulty || 'Orta';
}

function transformCase(source, index) {
  const sourceOptions = Array.isArray(source.options) ? [...source.options] : [];
  const options = sourceOptions
    .sort((a, b) => String(a.id || '').localeCompare(String(b.id || '')))
    .map((o) => String(o.text || '').trim())
    .filter(Boolean);
  const correctOption = sourceOptions.find((o) => String(o.id) === String(source.correctAnswer))?.text || options[0];
  const evidenceTexts = Array.isArray(source.evidenceChain) ? source.evidenceChain.map((item) => String(item).trim()).filter(Boolean) : [];
  const evidenceObjects = evidenceTexts.map((text, clueIndex) => ({ title: clueTitle(text, clueIndex), text, weight: 'high', source: 'case' }));
  const { byText, byId } = optionMaps(source, options);
  const differentialComparison = Object.fromEntries(options.map((option) => [option, { explanation: byText[option] || '', keyClues: evidenceTexts }]));
  const investigations = Array.isArray(source.objectiveDataInvestigations) ? source.objectiveDataInvestigations.map(investigationFrom) : [];
  const caseNumber = rawCases.length + index + 1;
  const id = `v195-new-${String(caseNumber).padStart(3, '0')}-${slugify(source.title)}`;
  const rationale = String(source.clinicalScientificRationale || '').trim();
  const examPearl = String(source.examPearl || '').trim();

  return {
    id,
    branchId: getBranchId(source.relatedBranch),
    caseType: 'standard',
    relatedBranch: source.relatedBranch,
    title: source.title,
    difficulty: source.difficulty || 'Orta',
    difficultyTag: source.difficulty || 'Orta',
    clinicalFocus: getClinicalFocus(source.answerTarget),
    learningTarget: source.learningTarget,
    demographics: extractDemographics(source.profile),
    setting: extractSetting(source.profile),
    chiefComplaint: source.presentation,
    stem: source.patientHistory,
    patientIntro: {
      profile: source.profile,
      presentation: source.presentation,
      historySummary: source.patientHistory,
    },
    vitals: parseVitals(source.physicalExamAndVitals),
    exam: splitExam(source.physicalExamAndVitals),
    investigations,
    availableInvestigations: investigations,
    useSyntheticInvestigationBank: false,
    managementSequence: { enabled: false },
    hideExamSignal: true,
    shuffleOptions: false,
    question: source.questionStem,
    questionType: getQuestionType(source.answerTarget),
    answerTarget: source.answerTarget,
    diagnosis: {
      correct: correctOption,
      options,
      question: source.questionStem,
      explanation: rationale,
      pearls: examPearl ? [{ label: 'Sınav notu', text: examPearl }] : [],
      optionComparison: byText,
      optionFeedback: byText,
      optionRationales: byText,
      feedbackByOption: byText,
      answerFeedback: {
        summary: `${correctOption}, bu olgudaki klinik akışla en uyumlu yanıttır.`,
        whyCorrect: rationale,
        rationale,
        correctOptionFeedback: byText[correctOption] || rationale,
        keyClues: evidenceTexts,
        evidenceChain: evidenceObjects,
        examPearl,
        pearls: examPearl ? [{ label: 'Sınav notu', text: examPearl }] : [],
        clinicalPearls: examPearl ? [{ label: 'Sınav notu', text: examPearl }] : [],
        optionComparison: byText,
        optionFeedback: byText,
        optionRationales: byText,
        feedbackByOption: byText,
        optionComparisonById: byId,
        differentialComparison,
        whyWrong: byText,
        managementSteps: [],
        management: [],
        learningOutcome: source.learningTarget,
      },
      whyCorrect: rationale,
      evidenceChain: evidenceObjects,
    },
  };
}

const existingContentKeys = new Set(rawCases.map((item) => `${String(item.title || '').trim()}||${String(item.question || '').trim()}`));
const duplicateSourceCases = [];
const uniquePastedCases = pastedCases.filter((item) => {
  const key = `${String(item.title || '').trim()}||${String(item.questionStem || '').trim()}`;
  const isDuplicate = existingContentKeys.has(key);
  if (isDuplicate) duplicateSourceCases.push({ title: item.title, relatedBranch: item.relatedBranch });
  return !isDuplicate;
});
const newCases = uniquePastedCases.map(transformCase).map((item, idx) => {
  const reviewedDifficulty = reviewDifficultyForDisplay(item, uniquePastedCases[idx]?.difficulty || item.difficulty);
  return { ...item, difficulty: reviewedDifficulty, difficultyTag: reviewedDifficulty };
});
const normalizedExistingCases = rawCases.map((item) => ({ ...item, shuffleOptions: false, difficultyTag: item.difficulty || item.difficultyTag || 'Orta' }));
const allCases = [...normalizedExistingCases, ...newCases];
const seenIds = new Set();
const problems = [];
for (const item of allCases) {
  if (seenIds.has(item.id)) problems.push(`Duplicate id: ${item.id}`);
  seenIds.add(item.id);
  const options = item.diagnosis?.options || [];
  if (!Array.isArray(options) || options.length !== 5) problems.push(`${item.id}: option count ${options.length}`);
  if (!options.includes(item.diagnosis?.correct)) problems.push(`${item.id}: correct answer not in options`);
  if (item.shuffleOptions !== false) problems.push(`${item.id}: shuffleOptions is not false`);
  for (const option of options) {
    const feedback = item.diagnosis?.optionFeedback?.[option] || item.diagnosis?.answerFeedback?.optionFeedback?.[option] || item.diagnosis?.answerFeedback?.feedbackByOption?.[option];
    if (!String(feedback || '').trim()) problems.push(`${item.id}: missing feedback for option ${option}`);
    if (String(feedback || '').includes('Bu seçenek için ayırt ettirici açıklama üretilemedi')) problems.push(`${item.id}: generic feedback for option ${option}`);
  }
  const json = JSON.stringify(item);
  if (json.includes('[object Object]')) problems.push(`${item.id}: [object Object] found`);
  if (json.includes('Hasta öyküsü, fizik muayene ve objektif veriler birlikte değerlendirilerek en uygun klinik karar seçilir')) problems.push(`${item.id}: generic focus text found`);
}
if (problems.length) {
  console.error(problems.join('\n'));
  throw new Error(`Validation failed with ${problems.length} problem(s)`);
}

const header = "import { applyTusLanguageStandardToCase } from '../utils/tusLanguageStandard.js';\n\n";
const body = `export const rawCases = ${JSON.stringify(allCases, null, 2)};\n\n`;
const footer = `const sanitizedCases = rawCases.map(applyTusLanguageStandardToCase);\n\nexport const cases = sanitizedCases;\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`;
fs.writeFileSync(outPath, header + body + footer, 'utf8');

const counts = allCases.reduce((acc, item) => {
  acc[item.branchId] = (acc[item.branchId] || 0) + 1;
  return acc;
}, {});
const addedCounts = newCases.reduce((acc, item) => {
  acc[item.branchId] = (acc[item.branchId] || 0) + 1;
  return acc;
}, {});
console.log(JSON.stringify({ total: allCases.length, added: newCases.length, counts, addedCounts, skippedDuplicates: duplicateSourceCases.length, duplicateSourceCases, ids: newCases.map(c => c.id) }, null, 2));
