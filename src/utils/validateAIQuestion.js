import { shuffleArray } from './randomize.js';
import { makeQuestionSignature, normalizeQuestionText } from './aiQuestionHistory.js';

const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];
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
      explanation: feedback[option.id] || `${option.text} güçlü bir çeldiricidir; ancak olgudaki karar verdirici patern ${correctText} lehinedir.`,
      comparisonPoints: [
        `${option.text} belirli klinik koşullarda doğru olabilir; bu olguda temel patern farklıdır.`,
        `Bu seçenek, “${payload.evidenceChain?.[0] || payload.learningTarget || 'ana ipucu'}” bilgisini yeterince açıklamaz.`,
        `Doğru yanıt ${correctText} çünkü bulgular tek bir öğrenme hedefine bağlanır.`,
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
    interpretation: 'Sonuçlar tanıyı doğrudan yazmadan patern yorumlaması gerektirir.',
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
    id: payload.id || `ai-generated-remote-${Date.now()}`,
    seedId: payload.seedId || payload.id || null,
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
    setting: payload.setting || 'AI spot pratik',
    chiefComplaint: payload.chiefComplaint || payload.learningTarget,
    stem: payload.stem,
    history,
    exam,
    vitals,
    investigations: rawInvestigations.map((item, index) => normalizeInvestigation(item, index, correctText)),
    question: payload.question,
    questionType: payload.questionType || 'spot',
    clinicalFocus: payload.learningTarget,
    managementSequence: { enabled: false, showInSpot: false, steps: [] },
    patientIntro: {
      profile: payload.demographics || payload.relatedBranch || 'AI TUS pratik',
      presentation: payload.chiefComplaint || payload.title,
      riskContext: history.slice(0, 2),
      distinctiveClues: payload.evidenceChain?.slice(0, 4) || [],
      historySummary: payload.stem,
    },
    diagnosis: {
      correct: correctText,
      options: shuffleArray(options.map((option) => option.text)),
      explanation: payload.explanation,
      nextStep: payload.nextStep || 'Kanıt zincirini tekrar ederek benzer çeldiricileri ayır.',
      pearls: [payload.examPearl].filter(Boolean),
      answerFeedback: {
        whyCorrect: payload.explanation,
        evidenceChain: payload.evidenceChain || [],
        pearls: [payload.examPearl].filter(Boolean),
        clinicalPearls: [payload.examPearl].filter(Boolean),
        differentialComparison: buildDifferentialComparisonFromPayload(payload, correctText, options),
        managementSteps: payload.managementSteps || [
          'Ana ipucunu belirle ve seçenekleri aynı kategori içinde karşılaştır.',
          'Objektif tetkik sonuçlarını tanı adı okumadan patern olarak yorumla.',
          'Benzer TUS çeldiricilerinin hangi ipucuyla elendiğini tekrar et.',
        ],
        learningOutcome: payload.learningTarget,
      },
    },
    aiMeta: {
      generatedAt: Date.now(),
      generator: payload.source || 'real-ai-provider',
      schemaVersion: 'ai-spot-v2',
      signature: null,
      validationWarnings: validation.warnings,
      provider: payload.provider || null,
    },
  };

  normalized.aiMeta.signature = makeQuestionSignature(normalized);
  return normalized;
}

export function validateAIQuestionCase(question = {}, recentSignatures = []) {
  const errors = [];
  if (!question?.id) errors.push('id yok');
  if (!question?.diagnosis?.correct) errors.push('doğru cevap metni yok');
  if (!Array.isArray(question?.diagnosis?.options) || question.diagnosis.options.length < 4) errors.push('en az 4 seçenek gerekli');
  if (!question?.diagnosis?.options?.includes(question?.diagnosis?.correct)) errors.push('doğru cevap seçenekler içinde değil');
  if (!question?.diagnosis?.answerFeedback?.whyCorrect) errors.push('klinik gerekçe yok');
  if (!Array.isArray(question?.diagnosis?.answerFeedback?.evidenceChain) || question.diagnosis.answerFeedback.evidenceChain.length < 3) errors.push('kanıt zinciri yetersiz');

  const signature = makeQuestionSignature(question);
  if (recentSignatures.includes(signature)) errors.push('yakın geçmişte aynı içerik imzası üretildi');

  return { ok: errors.length === 0, errors, signature };
}
