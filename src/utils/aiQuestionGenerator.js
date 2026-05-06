import { AI_QUESTION_SEEDS } from '../data/aiQuestionSeeds.js';
import { cases } from '../data/cases.js';
import { branches } from '../data/branches.js';
import { shuffleArray } from './randomize.js';
import {
  buildRecentQuestionContext,
  makeQuestionSignature,
  makeQuestionTopicSignature,
  makeSeedSignature,
} from './aiQuestionHistory.js';
import { validateAIQuestionCase } from './validateAIQuestion.js';

const AI_BRANCH_ID = 'tus-spot-olgular';
const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];
const CASE_SEED_LIMIT = 220;
const BRANCH_NAME_BY_ID = Object.fromEntries((branches || []).map((branch) => [branch.id, branch.name || branch.shortName || branch.id]));

function nowToken() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function optionTextById(seed, optionId) {
  return seed.options.find((option) => option.id === optionId)?.text || seed.options[0]?.text || '';
}

function richItemText(item = '') {
  if (!item) return '';
  if (typeof item === 'string') return item;
  return [item.title || item.label, item.text || item.summary || item.explanation || item.description]
    .filter(Boolean)
    .join(': ');
}

function uniqueStrings(items = []) {
  return Array.from(new Set(items.map((item) => String(richItemText(item) || '').trim()).filter(Boolean)));
}

function sanitizeOptionText(text = '') {
  return String(text).replace(/\s+/g, ' ').trim();
}

function branchTextOfSeed(seed) {
  return `${seed.relatedBranch || ''} ${seed.spotCategory || ''} ${seed.branchId || ''}`.toLocaleLowerCase('tr');
}

function getCaseAnswerFeedback(clinicalCase = {}) {
  return clinicalCase.diagnosis?.answerFeedback || clinicalCase.answerFeedback || {};
}

function getCaseEvidenceChain(clinicalCase = {}) {
  const feedback = getCaseAnswerFeedback(clinicalCase);
  return uniqueStrings([
    ...(Array.isArray(feedback.evidenceChain) ? feedback.evidenceChain : []),
    ...(Array.isArray(clinicalCase.patientIntro?.distinctiveClues) ? clinicalCase.patientIntro.distinctiveClues : []),
  ]).slice(0, 5);
}

function getCasePearl(clinicalCase = {}) {
  const feedback = getCaseAnswerFeedback(clinicalCase);
  const pearls = uniqueStrings([
    ...(Array.isArray(feedback.pearls) ? feedback.pearls : []),
    ...(Array.isArray(clinicalCase.diagnosis?.pearls) ? clinicalCase.diagnosis.pearls : []),
    clinicalCase.spotPearl,
    clinicalCase.examNote,
  ]);
  return pearls[0] || feedback.learningOutcome || clinicalCase.clinicalFocus || 'TUS’ta karar verdirici ipucu, benzer çeldiricilerden ayrımı sağlayan objektif paterndir.';
}

function buildExtraDistractors(clinicalCase, existingOptions) {
  const existing = new Set(existingOptions.map((item) => item.toLocaleLowerCase('tr')));
  const sameBranchDiagnoses = cases
    .filter((item) => item.branchId === clinicalCase.branchId && item.id !== clinicalCase.id)
    .map((item) => item.diagnosis?.correct)
    .filter(Boolean)
    .map(sanitizeOptionText)
    .filter((item) => !existing.has(item.toLocaleLowerCase('tr')));
  return shuffleArray(uniqueStrings(sameBranchDiagnoses)).slice(0, 5);
}

function buildOptionObjectsFromCase(clinicalCase) {
  const diagnosis = clinicalCase.diagnosis || {};
  const baseOptions = uniqueStrings([diagnosis.correct, ...(Array.isArray(diagnosis.options) ? diagnosis.options : [])])
    .map(sanitizeOptionText)
    .filter(Boolean);
  const expandedOptions = uniqueStrings([...baseOptions, ...buildExtraDistractors(clinicalCase, baseOptions)]).slice(0, 5);

  if (!diagnosis.correct || expandedOptions.length < 4) return null;
  const correctIndex = expandedOptions.findIndex((option) => option === diagnosis.correct);
  if (correctIndex < 0) expandedOptions.unshift(diagnosis.correct);
  const finalOptions = uniqueStrings(expandedOptions).slice(0, 5);
  if (finalOptions.length < 4) return null;

  return finalOptions.map((text, index) => ({ id: OPTION_IDS[index] || String(index + 1), text }));
}

function buildWrongFeedbackFromCase(clinicalCase, options) {
  const diagnosis = clinicalCase.diagnosis || {};
  const feedback = getCaseAnswerFeedback(clinicalCase);
  const differentials = feedback.differentials || feedback.differentialComparison || {};
  const correctText = diagnosis.correct;
  return options.reduce((accumulator, option) => {
    if (option.text === correctText) return accumulator;
    const differential = differentials[option.text];
    accumulator[option.id] = differential?.explanation
      || `${option.text} için beklenen tipik öykü, muayene veya tetkik paterni bu olguda baskın değildir; olgudaki objektif ipuçları ${correctText} lehinedir.`;
    return accumulator;
  }, {});
}

function buildCaseDerivedSeed(clinicalCase) {
  const options = buildOptionObjectsFromCase(clinicalCase);
  if (!options) return null;
  const diagnosis = clinicalCase.diagnosis || {};
  const correctAnswer = options.find((option) => option.text === diagnosis.correct)?.id || 'A';
  const feedback = getCaseAnswerFeedback(clinicalCase);
  const evidenceChain = getCaseEvidenceChain(clinicalCase);
  if (evidenceChain.length < 3) return null;

  const relatedBranch = BRANCH_NAME_BY_ID[clinicalCase.branchId] || clinicalCase.branchId || 'TUS Spot Olgular';
  const questionType = clinicalCase.questionType || (clinicalCase.caseType === 'spot' ? 'spot' : 'diagnosis');

  return {
    seedId: `case-seed-${clinicalCase.id}`,
    sourceCaseId: clinicalCase.id,
    title: clinicalCase.title || 'Klinik patern yorumu',
    relatedBranch,
    branchId: clinicalCase.branchId || AI_BRANCH_ID,
    spotCategory: `AI Spot • ${relatedBranch}`,
    difficulty: clinicalCase.difficulty || 'Orta-Zor',
    learningTarget: feedback.learningOutcome || clinicalCase.clinicalFocus || diagnosis.explanation || clinicalCase.title,
    demographics: clinicalCase.demographics || clinicalCase.patientIntro?.profile || 'TUS adayı için kısa klinik bağlam',
    setting: clinicalCase.setting || 'AI spot pratik',
    chiefComplaint: clinicalCase.chiefComplaint || clinicalCase.patientIntro?.presentation || clinicalCase.title,
    stem: clinicalCase.stem || clinicalCase.patientIntro?.historySummary || clinicalCase.title,
    exam: Array.isArray(clinicalCase.exam) ? clinicalCase.exam.slice(0, 5) : [],
    vitals: clinicalCase.vitals || {},
    investigations: Array.isArray(clinicalCase.investigations) ? clinicalCase.investigations.slice(0, 3) : [],
    question: clinicalCase.question || diagnosis.question || 'Bu klinik ve objektif veri paterni en çok hangi seçeneği destekler?',
    questionType,
    options,
    correctAnswer,
    explanation: feedback.whyCorrect || diagnosis.explanation || 'Olgudaki karar verdirici ipuçları doğru yanıtı destekler; çeldiriciler ise temel paternle tam uyumlu değildir.',
    wrongOptionFeedback: buildWrongFeedbackFromCase(clinicalCase, options),
    evidenceChain,
    examPearl: getCasePearl(clinicalCase),
    managementSteps: (feedback.managementSteps || feedback.management || []).map(richItemText).filter(Boolean),
    nextQuestionSeed: feedback.learningOutcome || clinicalCase.clinicalFocus || clinicalCase.title,
  };
}

let cachedCaseDerivedSeeds = null;

export function buildCaseDerivedAISeeds() {
  if (cachedCaseDerivedSeeds) return cachedCaseDerivedSeeds;
  cachedCaseDerivedSeeds = cases
    .map(buildCaseDerivedSeed)
    .filter(Boolean)
    .slice(0, CASE_SEED_LIMIT);
  return cachedCaseDerivedSeeds;
}

function buildDifferentialComparison(seed, correctText) {
  return seed.options.reduce((accumulator, option) => {
    if (option.text === correctText) return accumulator;
    const feedback = seed.wrongOptionFeedback?.[option.id]
      || `${option.text} güçlü bir çeldirici olabilir; ancak olgudaki objektif ipuçları ${correctText} lehinedir.`;
    accumulator[option.text] = {
      explanation: feedback,
      comparisonPoints: [
        `Beklenen patern: ${option.text} kendi özgül öykü, muayene veya tetkik bulgularıyla güç kazanır.`,
        `Ayırt ettirici olgu verisi: “${seed.evidenceChain?.[0] || seed.learningTarget}”.`,
        `Doğru yanıt ${correctText}; çünkü öykü, muayene ve objektif veriler aynı tanısal eksende birleşir.`,
      ],
    };
    return accumulator;
  }, {});
}

function maskCorrectAnswerInText(text = '', correctText = '') {
  if (!text || !correctText) return text || '';
  const escaped = String(correctText).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return String(text).replace(new RegExp(escaped, 'gi'), 'tanısal ipucu');
}

function buildInvestigation(item, index, correctText = '') {
  return {
    id: item.id || `ai-investigation-${index + 1}`,
    label: item.label || `Tetkik ${index + 1}`,
    type: item.type || 'lab',
    priority: item.priority || (index === 0 ? 'essential' : 'useful'),
    rows: Array.isArray(item.rows) ? item.rows : undefined,
    summary: maskCorrectAnswerInText(item.summary || '', correctText),
    findings: Array.isArray(item.findings) ? item.findings.map((finding) => maskCorrectAnswerInText(finding, correctText)) : [],
    interpretation: 'Objektif sonuçlar tanıyı doğrudan söylemeden klinik yorum gerektirir.',
  };
}

export function buildAIQuestionCase(seed, { generatedId = nowToken(), source = 'mock-local-generator' } = {}) {
  const correctText = optionTextById(seed, seed.correctAnswer);
  const optionTexts = seed.options.map((option) => option.text);

  const question = {
    id: `ai-generated-${seed.seedId}-${generatedId}`,
    seedId: seed.seedId,
    source,
    sourceCaseId: seed.sourceCaseId || null,
    caseType: 'ai-spot',
    branchId: seed.branchId || AI_BRANCH_ID,
    branchName: seed.relatedBranch || 'TUS Spot Olgular',
    title: seed.title,
    relatedBranch: seed.relatedBranch,
    spotCategory: seed.spotCategory || `AI Spot • ${seed.relatedBranch || 'TUS'}`,
    difficulty: seed.difficulty || 'Orta-Zor',
    learningTarget: seed.learningTarget,
    demographics: seed.demographics || 'TUS adayı için kısa klinik bağlam',
    setting: seed.setting || 'AI spot pratik',
    chiefComplaint: seed.chiefComplaint || seed.learningTarget,
    stem: seed.stem,
    exam: Array.isArray(seed.exam) ? seed.exam : [],
    vitals: seed.vitals || {},
    investigations: (seed.investigations || []).map((item, index) => buildInvestigation(item, index, correctText)),
    question: seed.question,
    questionType: seed.questionType || 'spot',
    clinicalFocus: seed.learningTarget,
    managementSequence: { enabled: false, showInSpot: false, steps: [] },
    patientIntro: {
      profile: [seed.demographics, seed.setting].filter(Boolean).join(' · '),
      presentation: seed.chiefComplaint || seed.title,
      riskContext: [],
      distinctiveClues: [seed.chiefComplaint, ...(Array.isArray(seed.exam) ? seed.exam.slice(0, 2) : [])].filter(Boolean),
      historySummary: seed.stem,
    },
    diagnosis: {
      correct: correctText,
      options: shuffleArray(optionTexts),
      explanation: seed.explanation,
      nextStep: seed.nextStep || 'Yanıt sonrası kanıt zincirini tekrar ederek benzer çeldiricileri ayır.',
      pearls: [seed.examPearl].filter(Boolean),
      answerFeedback: {
        whyCorrect: seed.explanation,
        evidenceChain: seed.evidenceChain || [],
        pearls: [seed.examPearl].filter(Boolean),
        clinicalPearls: [seed.examPearl].filter(Boolean),
        differentialComparison: buildDifferentialComparison(seed, correctText),
        managementSteps: seed.managementSteps?.length ? seed.managementSteps.map(richItemText).filter(Boolean) : [
          'Ayırt ettirici klinik ipucunu belirle ve seçenekleri aynı kategori içinde karşılaştır.',
          'Objektif tetkik sonuçlarını tanı adı okumadan patern olarak yorumla.',
          'Benzer TUS çeldiricilerinin hangi ipucuyla elendiğini tekrar et.',
        ],
        learningOutcome: seed.learningTarget,
      },
    },
    aiMeta: {
      generatedAt: Date.now(),
      generator: source,
      schemaVersion: 'ai-spot-v2',
      sourceSeedId: seed.seedId,
      sourceCaseId: seed.sourceCaseId || null,
      signature: null,
      topicSignature: null,
    },
  };

  question.aiMeta.signature = makeQuestionSignature(question);
  question.aiMeta.topicSignature = makeQuestionTopicSignature(question);
  return question;
}

function previousSeedIdFromQuestionId(questionId = '') {
  const raw = String(questionId || '').replace(/^ai-generated-/, '');
  const allSeeds = [...AI_QUESTION_SEEDS, ...buildCaseDerivedAISeeds()];
  const matchedSeed = allSeeds.find((seed) => raw.startsWith(`${seed.seedId}-`));
  return matchedSeed?.seedId || null;
}

function getEligibleSeeds(branchFilter = 'random') {
  const normalizedFilter = String(branchFilter || 'random').toLocaleLowerCase('tr');
  const allSeeds = [...AI_QUESTION_SEEDS, ...buildCaseDerivedAISeeds()];
  if (normalizedFilter === 'random' || normalizedFilter === 'rastgele') return allSeeds;
  const filtered = allSeeds.filter((seed) => branchTextOfSeed(seed).includes(normalizedFilter));
  return filtered.length ? filtered : allSeeds;
}

function scoreSeedNovelty(seed, context, previousSeedId) {
  const seedSignature = makeSeedSignature(seed);
  let score = Math.random();
  if (seed.seedId === previousSeedId) score -= 100;
  if (context.recentIds.includes(seed.seedId) || context.recentIds.includes(seed.sourceCaseId)) score -= 50;
  if (context.recentSignatures.includes(seedSignature)) score -= 50;
  if (seed.sourceCaseId) score += 0.12; // geniş vaka havuzundan yararlanmayı teşvik eder.
  if (seed.difficulty?.toLocaleLowerCase('tr').includes('zor')) score += 0.08;
  return score;
}

function rankSeedsByNovelty(pool, { previousQuestionId = null, context = buildRecentQuestionContext() } = {}) {
  const previousSeedId = previousSeedIdFromQuestionId(previousQuestionId);
  return shuffleArray(pool)
    .sort((a, b) => scoreSeedNovelty(b, context, previousSeedId) - scoreSeedNovelty(a, context, previousSeedId));
}

function pickNonRepeatingSeed(pool, { previousQuestionId = null, context = buildRecentQuestionContext() } = {}) {
  const previousSeedId = previousSeedIdFromQuestionId(previousQuestionId);
  const ranked = rankSeedsByNovelty(pool, { previousQuestionId, context });
  const fresh = ranked.find((seed) => {
    const signature = makeSeedSignature(seed);
    return seed.seedId !== previousSeedId
      && !context.recentIds.includes(seed.seedId)
      && !context.recentIds.includes(seed.sourceCaseId)
      && !context.recentSignatures.includes(signature);
  });
  return fresh || ranked.find((seed) => seed.seedId !== previousSeedId) || ranked[0] || AI_QUESTION_SEEDS[0];
}

export function generateAIQuestion({ previousQuestionId = null, branchFilter = 'random', context = buildRecentQuestionContext() } = {}) {
  const pool = getEligibleSeeds(branchFilter);
  const firstSeed = pickNonRepeatingSeed(pool, { previousQuestionId, context });
  const ranked = rankSeedsByNovelty(pool, { previousQuestionId, context });
  const candidates = [
    firstSeed,
    ...ranked.filter((seed) => seed.seedId !== firstSeed.seedId),
  ].filter(Boolean);

  for (const seed of candidates) {
    const question = buildAIQuestionCase(seed, {
      source: seed.sourceCaseId ? 'case-derived-local-generator' : 'curated-local-generator',
    });
    const validation = validateAIQuestionCase(question, context.recentSignatures);
    if (validation.ok) return question;
  }

  const exhaustedSeed = candidates.find((seed) => seed.seedId !== previousSeedIdFromQuestionId(previousQuestionId)) || candidates[0] || AI_QUESTION_SEEDS[0];
  return buildAIQuestionCase(exhaustedSeed, { source: 'local-generator-exhausted-pool-fallback' });
}

export function listAIQuestionBranches() {
  const seedBranches = [...AI_QUESTION_SEEDS, ...buildCaseDerivedAISeeds()]
    .map((seed) => seed.relatedBranch)
    .filter(Boolean);
  return ['Rastgele', ...Array.from(new Set(seedBranches)).sort((a, b) => a.localeCompare(b, 'tr'))];
}
