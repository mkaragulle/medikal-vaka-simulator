import { AI_QUESTION_SEEDS } from '../data/aiQuestionSeeds.js';
import { shuffleArray } from './randomize.js';

const AI_BRANCH_ID = 'tus-spot-olgular';

function nowToken() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function optionTextById(seed, optionId) {
  return seed.options.find((option) => option.id === optionId)?.text || seed.options[0]?.text || '';
}

function buildDifferentialComparison(seed, correctText) {
  return seed.options.reduce((accumulator, option) => {
    if (option.text === correctText) return accumulator;
    const feedback = seed.wrongOptionFeedback?.[option.id]
      || `${option.text} güçlü bir çeldiricidir; ancak olgudaki ana ipuçları ${correctText} lehinedir.`;
    accumulator[option.text] = {
      explanation: feedback,
      comparisonPoints: [
        `${option.text} belirli klinik koşullarda doğru olabilir; bu olguda karar verdirici patern farklıdır.`,
        `Bu seçenek, ana ipucu olan “${seed.evidenceChain?.[0] || seed.learningTarget}” bilgisini yeterince açıklamaz.`,
        `Doğru yanıt ${correctText} çünkü veriler tek bir öğrenme hedefi etrafında birleşir.`,
      ],
    };
    return accumulator;
  }, {});
}

function buildInvestigation(item, index) {
  return {
    id: item.id || `ai-investigation-${index + 1}`,
    label: item.label || `Tetkik ${index + 1}`,
    type: item.type || 'lab',
    priority: item.priority || (index === 0 ? 'essential' : 'useful'),
    summary: item.summary || '',
    findings: Array.isArray(item.findings) ? item.findings : [],
    interpretation: item.interpretation || 'Objektif sonuçlar tanıyı doğrudan söylemeden klinik yorum gerektirir.',
  };
}

function previousSeedIdFromQuestionId(questionId = '') {
  const raw = String(questionId || '').replace(/^ai-generated-/, '');
  const matchedSeed = AI_QUESTION_SEEDS.find((seed) => raw.startsWith(`${seed.seedId}-`));
  return matchedSeed?.seedId || null;
}

export function buildAIQuestionCase(seed, { generatedId = nowToken() } = {}) {
  const correctText = optionTextById(seed, seed.correctAnswer);
  const optionTexts = seed.options.map((option) => option.text);

  return {
    id: `ai-generated-${seed.seedId}-${generatedId}`,
    seedId: seed.seedId,
    source: 'ai',
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
    investigations: (seed.investigations || []).map(buildInvestigation),
    question: seed.question,
    questionType: seed.questionType || 'spot',
    clinicalFocus: seed.learningTarget,
    managementSequence: { enabled: false, showInSpot: false, steps: [] },
    patientIntro: {
      profile: [seed.demographics, seed.setting].filter(Boolean).join(' · '),
      presentation: seed.chiefComplaint || seed.title,
      riskContext: Array.isArray(seed.evidenceChain) ? seed.evidenceChain.slice(0, 2) : [],
      distinctiveClues: Array.isArray(seed.evidenceChain) ? seed.evidenceChain.slice(1, 4) : [],
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
        managementSteps: seed.managementSteps || [
          'Ana ipucunu belirle ve seçenekleri aynı kategori içinde karşılaştır.',
          'Objektif tetkik sonuçlarını tanı adı okumadan patern olarak yorumla.',
          'Benzer TUS çeldiricilerinin hangi ipucuyla elendiğini tekrar et.',
        ],
        learningOutcome: seed.learningTarget,
      },
    },
    aiMeta: {
      generatedAt: Date.now(),
      generator: 'local-mock-ai-generator',
      schemaVersion: 'ai-spot-v1',
    },
  };
}

export function generateAIQuestion({ previousQuestionId = null, branchFilter = 'random' } = {}) {
  const normalizedFilter = String(branchFilter || 'random').toLocaleLowerCase('tr');
  const eligibleSeeds = AI_QUESTION_SEEDS.filter((seed) => {
    if (normalizedFilter === 'random') return true;
    const branchText = `${seed.relatedBranch || ''} ${seed.spotCategory || ''}`.toLocaleLowerCase('tr');
    return branchText.includes(normalizedFilter);
  });

  const previousSeedId = previousSeedIdFromQuestionId(previousQuestionId);
  const pool = eligibleSeeds.length ? eligibleSeeds : AI_QUESTION_SEEDS;
  const shuffled = shuffleArray(pool);
  const seed = shuffled.find((item) => item.seedId !== previousSeedId) || shuffled[0] || AI_QUESTION_SEEDS[0];
  return buildAIQuestionCase(seed);
}

export function listAIQuestionBranches() {
  return ['Rastgele', ...Array.from(new Set(AI_QUESTION_SEEDS.map((seed) => seed.relatedBranch).filter(Boolean)))];
}
