import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import { buildAIQuestionCase } from '../src/utils/aiQuestionGenerator.js';
import { AI_QUESTION_SEEDS } from '../src/data/aiQuestionSeeds.js';
import { AI_BRANCH_TEMPLATE_SEEDS } from '../src/data/aiBranchQuestionTemplates.js';
import { AI_SYNTHETIC_FALLBACK_SEEDS } from '../src/data/aiSyntheticFallbackTemplates.js';
import { TUS_PEARL_AI_SEEDS } from '../src/data/tusPearlCards.js';
import { scientificAccuracyGate, repairScientificAccuracy, highRiskClinicalRules } from '../src/utils/clinicalScientificAccuracyGate.js';
import { resetSessionGeneratedQuestionIdsForTests } from '../src/utils/questionDeduplication.js';


function makeFaultyHyperkalemiaQuestion() {
  return {
    id: 'ai-spot-scientific-test-hyperkalemia-bad',
    title: 'Hiperkalemi ve EKG bulguları',
    relatedBranch: 'İç Hastalıkları',
    branchName: 'İç Hastalıkları',
    spotCategory: 'AI Spot • İç Hastalıkları',
    learningTarget: 'EKG bulgulu hiperkalemide ilk tedaviyi seçmek',
    clinicalFocus: 'İlk tedavi',
    demographics: '45 yaş erkek',
    setting: 'Acil servis',
    chiefComplaint: 'Halsizlik ve kas güçsüzlüğü',
    stem: 'Mide ülseri tedavisi için potasyum tutucu diüretik kullanan 45 yaşındaki erkek hasta halsizlik ve kas güçsüzlüğü ile başvurur. Serum K+: 6.8 mEq/L. EKG’de sivri T dalgaları ve QRS genişlemesi vardır.',
    question: 'En uygun ilk tedavi seçeneği nedir?',
    questionType: 'treatment',
    options: [
      { id: 'A', text: 'Sodyum bikarbonat infüzyonu' },
      { id: 'B', text: 'Dializ' },
      { id: 'C', text: 'Albuterol inhalasyonu' },
      { id: 'D', text: 'İntravenöz kalsiyum glukonat' },
      { id: 'E', text: 'İntravenöz insülin ve glukoz' },
    ],
    correctAnswer: 'E',
    explanation: 'İntravenöz insülin ve glukoz potasyumu hızlı düşürür.',
    evidenceChain: ['Serum K+ 6.8 mEq/L', 'Sivri T dalgaları', 'QRS genişlemesi'],
    examPearls: ['EKG bulgulu hiperkalemide ilk tedavi IV kalsiyumdur.'],
    wrongOptionFeedback: {
      D: 'İntravenöz kalsiyum glukonat bazı klinik durumlarda gündeme gelebilir ancak bu seçeneği tek başına yeterli kılmaz.',
    },
    diagnosis: {
      correct: 'İntravenöz insülin ve glukoz',
      options: ['Sodyum bikarbonat infüzyonu', 'Dializ', 'Albuterol inhalasyonu', 'İntravenöz kalsiyum glukonat', 'İntravenöz insülin ve glukoz'],
      explanation: 'İntravenöz insülin ve glukoz potasyumu hızlı düşürür.',
      answerFeedback: {
        whyCorrect: 'İntravenöz insülin ve glukoz potasyumu hızlı düşürür.',
        evidenceChain: ['Serum K+ 6.8 mEq/L', 'Sivri T dalgaları', 'QRS genişlemesi'],
        clinicalPearls: ['EKG bulgulu hiperkalemide ilk tedavi IV kalsiyumdur.'],
      },
    },
  };
}

function runChildBatch(start, count) {
  const seeds = [...AI_QUESTION_SEEDS, ...AI_BRANCH_TEMPLATE_SEEDS, ...AI_SYNTHETIC_FALLBACK_SEEDS, ...TUS_PEARL_AI_SEEDS]
    .filter((seed) => seed && Array.isArray(seed.options) && seed.options.length >= 4);
  const generatedResults = [];
  const failures = [];
  for (let offset = 0; offset < count; offset += 1) {
    if (offset > 0 && offset % 50 === 0) resetSessionGeneratedQuestionIdsForTests();
    if (process.env.VERBOSE_QA === '1') console.error(`child item ${start + offset + 1}`);
    const index = start + offset;
    const seed = seeds[index % seeds.length];
    try {
      const question = buildAIQuestionCase(seed, {
        generatedId: `ai-spot-scientific-batch-${String(index + 1).padStart(3, '0')}`,
        source: 'scientific-accuracy-qa-local-generator',
        attempt: index,
        context: { recentIds: [], recentSignatures: [], recentQuestionSummaries: [] },
        branchFilter: seed.relatedBranch || 'random',
      });
      const gate = scientificAccuracyGate(question);
      const result = {
        index: index + 1,
        id: question.id,
        title: question.title,
        branch: question.relatedBranch,
        correct: question.diagnosis?.correct,
        ok: gate.ok,
        errors: gate.errors,
        rule: gate.selfConsistency?.ruleId || null,
      };
      generatedResults.push(result);
      if (!gate.ok) failures.push(result);
    } catch (error) {
      failures.push({ index: index + 1, ok: false, errors: [error?.message || String(error)] });
    }
  }
  return { generatedResults, failures };
}

function runWorkerBatch(start, count) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL(import.meta.url), { workerData: { start, count } });
    worker.once('message', (message) => resolve(message));
    worker.once('error', reject);
    worker.once('exit', (code) => {
      if (code !== 0) reject(new Error(`Scientific accuracy worker exited with code ${code}`));
    });
  });
}

async function runParent() {
  const chunks = await Promise.all([
    runWorkerBatch(0, 50),
    runWorkerBatch(50, 50),
  ]);

  const faulty = makeFaultyHyperkalemiaQuestion();
  const faultyGate = scientificAccuracyGate(faulty);
  const repaired = repairScientificAccuracy(faulty);
  const repairedGate = scientificAccuracyGate(repaired);
  const generatedResults = chunks.flatMap((chunk) => chunk.generatedResults);
  const failures = chunks.flatMap((chunk) => chunk.failures);

  return {
    generatedAt: new Date().toISOString(),
    highRiskClinicalRuleCount: highRiskClinicalRules.length,
    faultyHyperkalemiaRejected: !faultyGate.ok,
    faultyHyperkalemiaErrors: faultyGate.errors,
    repairedHyperkalemiaAccepted: repairedGate.ok,
    repairedHyperkalemiaCorrectAnswer: repaired.diagnosis?.correct,
    generatedQuestionCount: generatedResults.length,
    passedCount: generatedResults.filter((item) => item.ok).length,
    failedCount: failures.length,
    failures: failures.slice(0, 20),
    generatedSample: generatedResults.slice(0, 10),
  };
}

if (!isMainThread) {
  const start = Number(workerData?.start || 0);
  const count = Number(workerData?.count || 50);
  parentPort.postMessage(runChildBatch(start, count));
} else if (process.env.KLINIKIQ_QA_CHILD === '1') {
  const start = Number(process.env.START || 0);
  const count = Number(process.env.COUNT || 50);
  console.log(JSON.stringify(runChildBatch(start, count)));
} else {
  console.log(JSON.stringify(await runParent(), null, 2));
}
