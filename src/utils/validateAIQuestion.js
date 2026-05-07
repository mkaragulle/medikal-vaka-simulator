import { shuffleArray } from './randomize.js';
import { makeQuestionSignature, makeQuestionTopicSignature, normalizeQuestionText } from './aiQuestionHistory.js';
import { cases } from '../data/cases.js';
import { attachQuestionDedupeFields, createAIQuestionId, validateQuestionNovelty } from './questionDeduplication.js';
import { validateBranchFit } from './aiBranchRules.js';
import { repairAIQuestionQuality, validateAIQuestionQuality } from './aiQuestionQualityGate.js';

const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];

function cleanClinicalSummaryItem(value = '') {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .replace(/^(Karar verdirici ipucu|Destekleyici kanıt|Ayırt ettirici ipucu|Ayırt ettirici bulgu|Klinik patern|Tanısal ayrım|Sınav notu|TUS kırmızı bayrağı|Destekleyici bulgu|Ana kanıt|Kritik ipucu|karar verdirici patern)\s*[:：-]\s*/iu, '')
    .replace(/\s*(\.{3}|…)\s*/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,.;:!?])(?=\S)/g, '$1 ')
    .replace(/\s*\/\s*/g, ' veya ')
    .replace(/[\s,;:.]+$/u, '')
    .trim();
}

function uniqueSummaryItems(items = [], max = 4) {
  const seen = new Set();
  const out = [];
  items.map(cleanClinicalSummaryItem).filter(Boolean).forEach((item) => {
    const key = item.toLocaleLowerCase('tr');
    if (!seen.has(key)) {
      seen.add(key);
      out.push(item);
    }
  });
  return out.slice(0, max);
}

function buildValidatedAIRiskContext(payload = {}, history = []) {
  const branch = String(payload.relatedBranch || '').toLocaleLowerCase('tr');
  const target = String(payload.learningTarget || '').toLocaleLowerCase('tr');
  const allText = `${branch} ${target} ${payload.title || ''} ${payload.stem || ''}`.toLocaleLowerCase('tr');
  if (/kawasaki|koroner|konjonktivit|mukozal|dudak/.test(allText)) {
    return ['Beş günden uzun süren ateş', 'Mukokutanöz bulguların eşlik etmesi', 'Koroner arter tutulumu riski'];
  }
  if (/pediatri|çocuk|yenidoğan|bebek/.test(branch + ' ' + target)) {
    return ['Ateş, beslenme ve bilinç değişikliğinin birlikte izlenmesi', 'Aşılanma ve temas öyküsünün sorgulanması'];
  }
  if (/mikrobiyoloji|enfeksiyon|hiv|hepatit|tüberküloz|sepsis|bakteri|viral/.test(branch + ' ' + target)) {
    return ['Temas öyküsü veya örnek türünün yorumu değiştirmesi', 'Bağışıklık durumunun etken ayrımına etkisi'];
  }
  if (/farmakoloji|ilaç|toksin|zehir|yan etki|antidot/.test(branch + ' ' + target)) {
    return ['İlaç veya toksin maruziyeti öyküsü', 'Doz ve zaman ilişkisinin klinik tabloyu belirlemesi'];
  }
  return uniqueSummaryItems([history[0], 'Objektif bulguların karar basamağını desteklemesi'], 2);
}
const DIRECT_LEAK_PHRASES = [
  'tanısını doğrular',
  'tanısını koydurur',
  'ile uyumludur',
  'kesin tanıdır',
  'tanı:',
  'diagnosis:',
];

function stripAnswerLeak(text = '', correctText = '') {
  if (!text || !correctText) return text || '';
  const escaped = String(correctText).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return String(text).replace(new RegExp(escaped, 'gi'), 'karar verdirici patern');
}

function toOptionText(option) {
  return typeof option === 'string' ? option : option?.text;
}

function normalizeOptions(options = []) {
  return options
    .map((option, index) => ({
      id: option?.id || OPTION_IDS[index] || String(index + 1),
      text: toOptionText(option),
    }))
    .filter((option) => option.text && String(option.text).trim().length > 1)
    .slice(0, 5);
}

export function validateAIQuestionPayload(payload = {}) {
  const errors = [];
  const warnings = [];
  const options = normalizeOptions(payload.options);
  const correctAnswer = String(payload.correctAnswer || '').trim().toUpperCase();
  const correctOption = options.find((option) => option.id.toUpperCase() === correctAnswer);

  if (!payload.title || String(payload.title).trim().length < 6) errors.push('title eksik veya çok kısa');
  if (!payload.stem || String(payload.stem).trim().length < 40) errors.push('stem eksik veya çok kısa');
  if (!payload.question || String(payload.question).trim().length < 16) errors.push('question eksik veya çok kısa');
  if (options.length !== 5) errors.push('tam 5 seçenek gerekli');
  if (!correctOption) errors.push('correctAnswer A-E seçenekleriyle eşleşmiyor');
  if (!payload.explanation || String(payload.explanation).trim().length < 60) errors.push('explanation eksik veya çok kısa');
  if (!Array.isArray(payload.evidenceChain) || payload.evidenceChain.length < 3) errors.push('evidenceChain en az 3 madde olmalı');
  if (!payload.examPearl || String(payload.examPearl).trim().length < 20) errors.push('examPearl eksik veya çok kısa');

  const wrongFeedback = payload.wrongOptionFeedback || {};
  options.forEach((option) => {
    if (option.id.toUpperCase() !== correctAnswer && !wrongFeedback[option.id]) {
      errors.push(`${option.id} yanlış seçenek feedbacki eksik`);
    }
  });

  const correctText = correctOption?.text || '';
  const investigationText = JSON.stringify(payload.findings?.investigations || payload.investigations || []);
  const normalizedInvestigationText = normalizeQuestionText(investigationText);
  const normalizedCorrectText = normalizeQuestionText(correctText);
  if (normalizedCorrectText && normalizedInvestigationText.includes(normalizedCorrectText)) {
    warnings.push('tetkik metni doğru cevabı birebir içeriyor; ekranda maskeleme uygulanacak');
  }
  DIRECT_LEAK_PHRASES.forEach((phrase) => {
    if (normalizeQuestionText(investigationText).includes(normalizeQuestionText(phrase))) {
      warnings.push(`tetkik yorumunda direkt tanı dili var: ${phrase}`);
    }
  });

  return {
    ok: errors.length === 0,
    errors,
    warnings,
    normalizedOptions: options,
  };
}

function buildDifferentialComparisonFromPayload(payload, correctText, options) {
  const feedback = payload.wrongOptionFeedback || {};
  return options.reduce((accumulator, option) => {
    if (option.text === correctText) return accumulator;
    accumulator[option.text] = {
      explanation: feedback[option.id] || `${option.text} bazı olgularda düşünülebilir; ancak bu tablodaki somut bulgular ${correctText} lehine daha güçlüdür.`,
      comparisonPoints: [
        `${option.text} belirli klinik koşullarda doğru olabilir; bu olgudaki ana bulgular farklıdır.`,
        `Bu seçenek, olgudaki temel bulguları yeterince açıklamaz.`,
        `${correctText} öykü, muayene ve objektif verilerle daha güçlü uyum gösterir.`,
      ],
    };
    return accumulator;
  }, {});
}

function normalizeInvestigation(item, index, correctText) {
  const summary = stripAnswerLeak(item?.summary || item?.result || '', correctText);
  const findings = Array.isArray(item?.findings)
    ? item.findings.map((finding) => stripAnswerLeak(finding, correctText))
    : [];
  return {
    id: item?.id || `remote-ai-investigation-${index + 1}`,
    label: item?.label || item?.name || `Tetkik ${index + 1}`,
    type: item?.type || 'lab',
    priority: item?.priority || (index === 0 ? 'essential' : 'useful'),
    summary,
    findings,
    interpretation: 'Sonuç, öykü ve muayene bulgularıyla birlikte değerlendirilir.',
  };
}

export function normalizeGeneratedAIQuestion(payload = {}) {
  const validation = validateAIQuestionPayload(payload);
  if (!validation.ok) {
    const error = new Error(`AI question schema invalid: ${validation.errors.join('; ')}`);
    error.validation = validation;
    throw error;
  }

  const options = validation.normalizedOptions;
  const correctId = String(payload.correctAnswer || '').trim().toUpperCase();
  const correctText = options.find((option) => option.id.toUpperCase() === correctId)?.text;
  const rawInvestigations = payload.findings?.investigations || payload.investigations || [];
  const history = Array.isArray(payload.findings?.history) ? payload.findings.history : [];
  const exam = Array.isArray(payload.findings?.exam) ? payload.findings.exam : [];
  const vitals = payload.findings?.vitals || payload.vitals || {};

  const normalized = {
    id: payload.id || createAIQuestionId('ai-spot-remote'),
    seedId: payload.seedId || null,
    source: payload.source || 'real-ai',
    caseType: 'ai-spot',
    branchId: 'tus-spot-olgular',
    branchName: payload.relatedBranch || 'AI TUS Spot',
    title: payload.title,
    relatedBranch: payload.relatedBranch || 'TUS Spot Olgular',
    spotCategory: `AI Spot • ${payload.relatedBranch || 'TUS'}`,
    difficulty: payload.difficulty || 'Orta-Zor',
    learningTarget: payload.learningTarget,
    demographics: payload.demographics || 'TUS adayı için kısa klinik bağlam',
    setting: payload.setting || 'Kısa klinik pratik',
    chiefComplaint: payload.chiefComplaint || payload.learningTarget,
    stem: payload.stem,
    history,
    exam,
    vitals,
    investigations: rawInvestigations.map((item, index) => normalizeInvestigation(item, index, correctText)),
    findings: { history, exam, vitals, investigations: rawInvestigations.map((item, index) => normalizeInvestigation(item, index, correctText)) },
    options,
    correctAnswer: correctId,
    question: payload.question,
    questionType: payload.questionType || 'spot',
    clinicalFocus: payload.learningTarget,
    managementSequence: { enabled: false, showInSpot: false, steps: [] },
    patientIntro: {
      profile: payload.demographics || payload.relatedBranch || 'AI TUS pratik',
      presentation: payload.chiefComplaint || payload.title,
      riskContext: buildValidatedAIRiskContext(payload, history),
      distinctiveClues: uniqueSummaryItems(payload.evidenceChain?.slice(0, 4) || [], 4),
      historySummary: payload.stem,
    },
    diagnosis: {
      correct: correctText,
      options: shuffleArray(options.map((option) => option.text)),
      explanation: payload.explanation,
      nextStep: payload.nextStep || 'Olgudaki somut ipuçlarını seçeneklerle karşılaştır.',
      pearls: [payload.examPearl].filter(Boolean),
      answerFeedback: {
        whyCorrect: payload.explanation,
        evidenceChain: payload.evidenceChain || [],
        pearls: [payload.examPearl].filter(Boolean),
        clinicalPearls: [payload.examPearl].filter(Boolean),
        differentialComparison: buildDifferentialComparisonFromPayload(payload, correctText, options),
        managementSteps: payload.managementSteps || [
          'Öykü, muayene ve vital bulguları birlikte değerlendir.',
          'Objektif tetkik verilerini klinik tabloyla ilişkilendir.',
          'Alternatif seçenekleri olgudaki somut bulgularla ele.',
        ],
        learningOutcome: payload.learningTarget,
      },
    },
    aiMeta: {
      generatedAt: Date.now(),
      generator: payload.source || 'real-ai-provider',
      schemaVersion: 'ai-spot-v2',
      signature: null,
      topicSignature: null,
      validationWarnings: validation.warnings,
      provider: payload.provider || null,
    },
  };

  const repaired = repairAIQuestionQuality(normalized);
  attachQuestionDedupeFields(repaired);
  repaired.generatedAt = new Date(repaired.aiMeta.generatedAt).toISOString();
  return repaired;
}

export function validateAIQuestionCase(question = {}, recentSignatures = [], options = {}) {
  const errors = [];
  const embeddedCases = options.embeddedCases || cases;
  const recentContext = options.context || { recentSignatures, recentIds: [], recentQuestionSummaries: [] };

  if (!question?.id) errors.push('id yok');
  if (!String(question?.id || '').startsWith('ai-spot')) errors.push('AI sorusu için bağımsız ai-spot ID kullanılmalı');
  if (question?.sourceCaseId || question?.aiMeta?.sourceCaseId) errors.push('AI sorusu mevcut vaka ID bilgisini doğrudan taşımamalı');
  if (!question?.diagnosis?.correct) errors.push('doğru cevap metni yok');
  if (!Array.isArray(question?.diagnosis?.options) || question.diagnosis.options.length < 4) errors.push('en az 4 seçenek gerekli');
  if (!question?.diagnosis?.options?.includes(question?.diagnosis?.correct)) errors.push('doğru cevap seçenekler içinde değil');
  if (!question?.diagnosis?.answerFeedback?.whyCorrect) errors.push('klinik gerekçe yok');
  if (!Array.isArray(question?.diagnosis?.answerFeedback?.evidenceChain) || question.diagnosis.answerFeedback.evidenceChain.length < 3) errors.push('kanıt zinciri yetersiz');
  if (!question?.contentSignature && !question?.generationSignature && !question?.aiMeta?.contentSignature && !question?.aiMeta?.signature) errors.push('contentSignature eksik');

  const novelty = validateQuestionNovelty(question, { context: recentContext, embeddedCases });
  if (!novelty.ok) errors.push(...novelty.errors);

  const branchFit = validateBranchFit(question, options.requestedBranch || question.relatedBranch || question.branchName);
  if (!branchFit.ok) errors.push(...branchFit.errors.map((error) => `branch-fit:${error}`));

  const quality = validateAIQuestionQuality(question, { requestedBranch: options.requestedBranch || question.relatedBranch || question.branchName });
  if (!quality.ok) errors.push(...quality.errors.map((error) => `quality:${error}`));

  attachQuestionDedupeFields(question);
  const signature = question.contentSignature || makeQuestionSignature(question);
  const topicSignature = question.topicSignature || question.aiMeta?.topicSignature || makeQuestionTopicSignature(question);
  if (recentSignatures.includes(signature)) errors.push('yakın geçmişte aynı contentSignature üretildi');

  return { ok: errors.length === 0, errors: Array.from(new Set(errors)), signature, topicSignature, contentSignature: signature, embeddedOverlap: novelty.embeddedOverlap || null };
}
