import fs from 'node:fs';
import { rawCases } from './src/data/cases.js';

const pastedPath = '/mnt/data/Pasted text(241).txt';
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
  const text = relatedBranch.toLocaleLowerCase('tr-TR');
  if (text.includes('pediatri') || text.includes('neonatoloji') || text.includes('çocuk')) return 'pediatrics';
  if (text.includes('kadın') || text.includes('doğum') || text.includes('obstetri') || text.includes('jinekoloji')) return 'obstetrics-gynecology';
  if (text.includes('anatomi')) return 'anatomy';
  if (text.includes('fizyoloji')) return 'physiology';
  if (text.includes('histoloji') || text.includes('embriyoloji')) return 'histology-embryology';
  if (text.includes('farmakoloji')) return 'medical-pharmacology';
  if (text.includes('patoloji') && !text.includes('pediatri')) return 'medical-pathology';
  if (text.includes('biyokimya') || text.includes('metabolizma')) return 'medical-biochemistry';
  if (text.includes('mikrobiyoloji')) return 'medical-microbiology';
  if (text.includes('genel cerrahi') || text.includes('cerrahi')) return 'general-surgery';
  if (text.includes('dahiliye') || text.includes('iç hastalıkları') || text.includes('ic hastaliklari') || text.includes('kardiyoloji') || text.includes('nefroloji') || text.includes('endokrinoloji') || text.includes('hematoloji') || text.includes('romatoloji') || text.includes('gastroenteroloji') || text.includes('enfeksiyon')) return 'internal-medicine';
  if (text.includes('nöroloji') || text.includes('noroloji') || text.includes('acil') || text.includes('toksikoloji') || text.includes('üroloji') || text.includes('uroloji') || text.includes('ortopedi') || text.includes('psikiyatri') || text.includes('dermatoloji') || text.includes('kbb') || text.includes('göz')) return 'minor-rotations';
  return 'minor-rotations';
}

function extractDemographics(profile = '') {
  const beforeComma = String(profile).split(',')[0]?.trim();
  return beforeComma || profile || 'Hasta';
}

function extractSetting(profile = '') {
  const text = String(profile).toLocaleLowerCase('tr-TR');
  if (text.includes('çocuk acil')) return 'Çocuk acil servis';
  if (text.includes('acil servis')) return 'Acil servis';
  if (text.includes('doğum salonu')) return 'Doğum salonu';
  if (text.includes('yenidoğan yoğun bakım')) return 'Yenidoğan yoğun bakım';
  if (text.includes('yenidoğan servisi')) return 'Yenidoğan servisi';
  if (text.includes('doğumhane')) return 'Doğumhane';
  if (text.includes('servis')) return 'Servis';
  if (text.includes('poliklinik')) return 'Poliklinik';
  return 'Klinik değerlendirme';
}

function parseVitals(physical = '') {
  const vitals = {};
  const text = String(physical);
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

function splitExam(physical = '') {
  const sentences = String(physical)
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.replace(/\.$/, '.'));
  const exam = sentences.filter((s) => !/(Kan basıncı|nabız|kalp hızı|solunum sayısı|vücut sıcaklığı|oksijen satürasyonu|SpO2)/i.test(s));
  return exam.length ? exam : [String(physical).trim()].filter(Boolean);
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
    subtype: 'Laboratuvar',
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
  const target = String(answerTarget).toLowerCase();
  if (target.includes('first') || target.includes('treatment')) return 'treatment';
  if (target.includes('mechanism')) return 'mechanism';
  if (target.includes('pathogen')) return 'etiology';
  if (target.includes('pathology')) return 'pathology';
  if (target.includes('anatomy')) return 'anatomy';
  if (target.includes('lab')) return 'lab_interpretation';
  if (target.includes('diagnosis')) return 'diagnosis';
  return target || 'clinical_decision';
}

function transformCase(source, index) {
  const sourceOptions = Array.isArray(source.options) ? source.options : [];
  const options = [...sourceOptions].sort((a, b) => String(a.id).localeCompare(String(b.id))).map((o) => o.text);
  const correctOption = sourceOptions.find((o) => o.id === source.correctAnswer)?.text || options[0];
  const evidenceObjects = (source.evidenceChain || []).map((text) => ({ text, weight: 'high', source: 'case' }));
  const optionFeedbackByText = {};
  for (const option of sourceOptions) {
    const feedback = source.optionComparison?.[option.id] || '';
    optionFeedbackByText[option.text] = {
      explanation: feedback,
      keyClues: [...(source.evidenceChain || [])],
    };
  }
  const investigations = (source.objectiveDataInvestigations || []).map(investigationFrom);
  const caseNumber = rawCases.length + index + 1;
  return {
    id: `v169-new-${String(caseNumber).padStart(3, '0')}-${slugify(source.title)}`,
    branchId: getBranchId(source.relatedBranch),
    caseType: 'standard',
    relatedBranch: source.relatedBranch,
    title: source.title,
    difficulty: source.difficulty || 'Orta',
    clinicalFocus: 'Hasta öyküsü, fizik muayene ve objektif veriler birlikte değerlendirilerek en uygun klinik karar seçilir.',
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
    question: source.questionStem,
    questionType: getQuestionType(source.answerTarget),
    answerTarget: source.answerTarget,
    diagnosis: {
      correct: correctOption,
      options,
      question: source.questionStem,
      explanation: source.clinicalScientificRationale,
      pearls: [
        {
          label: 'Sınav notu',
          text: source.examPearl,
        },
      ],
      nextStep: 'Öykü, muayene ve objektif veriyi birlikte yorumlayarak klinik kararını doğrula.',
      answerFeedback: {
        summary: `${correctOption}, bu olgudaki klinik akışla en uyumlu yanıttır.`,
        keyClues: [...(source.evidenceChain || [])],
        examPearl: source.examPearl,
        evidenceChain: evidenceObjects,
        optionComparison: source.optionComparison || {},
        rationale: source.clinicalScientificRationale,
        whyCorrect: source.clinicalScientificRationale,
      },
      whyCorrect: source.clinicalScientificRationale,
      evidenceChain: evidenceObjects,
      feedbackByOption: optionFeedbackByText,
      optionFeedback: optionFeedbackByText,
      answerFeedbackByOption: optionFeedbackByText,
    },
  };
}

const newCases = pastedCases.map(transformCase);
const allCases = [...rawCases, ...newCases];
const seenIds = new Set();
for (const item of allCases) {
  if (seenIds.has(item.id)) throw new Error(`Duplicate id: ${item.id}`);
  seenIds.add(item.id);
  if (!Array.isArray(item.diagnosis?.options) || item.diagnosis.options.length !== 5) {
    throw new Error(`Case ${item.id} does not have exactly 5 options`);
  }
}

const header = "import { applyTusLanguageStandardToCase } from '../utils/tusLanguageStandard.js';\n\n";
const body = `export const rawCases = ${JSON.stringify(allCases, null, 2)};\n\n`;
const footer = `const sanitizedCases = rawCases.map(applyTusLanguageStandardToCase);\n\nexport const cases = sanitizedCases;\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`;
fs.writeFileSync(outPath, header + body + footer, 'utf8');

const counts = allCases.reduce((acc, item) => {
  acc[item.branchId] = (acc[item.branchId] || 0) + 1;
  return acc;
}, {});
console.log(JSON.stringify({ total: allCases.length, added: newCases.length, counts, ids: newCases.map(c => c.id) }, null, 2));
