import { generateAIQuestion } from '../src/utils/aiQuestionGenerator.js';
import { clearAIQuestionHistory, buildRecentQuestionContext, rememberAIQuestion } from '../src/utils/aiQuestionHistory.js';
import { validateAIQuestionCase } from '../src/utils/validateAIQuestion.js';
import { validateClinicalCoherenceHardGate } from '../src/utils/clinicalCoherenceHardGate.js';

const badCrossTopic = {
  relatedBranch: 'Nöroloji',
  title: 'Devam eden jeneralize nöbet',
  stem: 'Erişkin hasta devam eden jeneralize tonik-klonik nöbet nedeniyle acil serviste izlenir. Hava yolu değerlendirilirken nöbet aktivitesi sürmektedir.',
  question: 'Bu hastada en uygun ilk ilaç tedavisi hangisidir?',
  options: [
    { id: 'A', text: 'Sodyum bikarbonat infüzyonu' },
    { id: 'B', text: 'İntravenöz kalsiyum glukonat' },
    { id: 'C', text: 'Diyaliz' },
    { id: 'D', text: 'Albuterol inhalasyonu' },
    { id: 'E', text: 'İntravenöz insülin + glukoz' },
  ],
  correctAnswer: 'B',
  explanation: 'EKG bulgulu ciddi hiperkalemide ilk hedef kardiyak membran stabilizasyonudur.',
  evidenceChain: ['EKG değişikliği'],
  examPearl: 'Hiperkalemi paterninde ilk basamak kalsiyumdur.',
};

const hardGate = validateClinicalCoherenceHardGate(badCrossTopic);
if (hardGate.ok) {
  console.error('Cross-topic contamination fixture was not rejected.');
  process.exit(1);
}

clearAIQuestionHistory();
const branches = ['random', 'pediatrics'];
let produced = 0;
for (const branchFilter of branches) {
  for (let i = 0; i < 2; i += 1) {
    const context = buildRecentQuestionContext(20);
    const question = generateAIQuestion({ branchFilter, context });
    const validation = validateAIQuestionCase(question, [], { context, requestedBranch: branchFilter });
    if (!validation.ok) {
      console.error('Generated local question failed validation', { branchFilter, title: question.title, errors: validation.errors });
      process.exit(1);
    }
    rememberAIQuestion(question, { source: 'stall-guard-test' });
    produced += 1;
  }
}

console.log(`AI generation stall/contamination guard PASS (${produced} local questions + cross-topic rejection).`);
