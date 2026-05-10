import fs from 'node:fs';
import { clearAIQuestionHistory, rememberAIQuestion, buildRecentQuestionContext } from '../src/utils/aiQuestionHistory.js';
import { validateQuestionDiversity } from '../src/utils/aiQuestionDiversity.js';
import { cases } from '../src/data/cases.js';

const baseQuestion = {
  id: 'test-sepsis-1',
  source: 'real-ai',
  caseType: 'ai-spot',
  title: 'Septik şokla başvuran hasta',
  relatedBranch: 'İç Hastalıkları',
  learningTarget: 'Sepsis erken yaklaşımı',
  questionType: 'first-step-management',
  demographics: 'Yetmiş iki yaşında erkek hasta',
  chiefComplaint: 'Ateş, öksürük ve halsizlik',
  stem: 'Yetmiş iki yaşında erkek hasta iki gündür süren ateş, öksürük ve giderek artan halsizlik nedeniyle acil servise getiriliyor. Muayenede konfüzyon, soğuk ekstremiteler ve sağ bazalde raller saptanıyor. Son saatlerde letarji artmış.',
  question: 'Bu hastada en uygun ilk yaklaşım hangisidir?',
  options: [
    { id: 'A', text: 'Rutin poliklinik kontrolü planlamak' },
    { id: 'B', text: 'Geniş spektrumlu antibiyotik ve 30 mL/kg kristaloid başlamak' },
    { id: 'C', text: 'Yalnız ateş kontrolü ve oral sıvı önermek' },
    { id: 'D', text: 'Antibiyotik öncesi kesin kültür sonucunu beklemek' },
    { id: 'E', text: 'Sadece düşük doz steroid tedavisi başlamak' },
  ],
  correctAnswer: 'B',
  evidenceChain: ['Hipotansiyon', 'Laktat yüksekliği', 'Enfeksiyon odağı bulgusu'],
  examPearl: 'Şok bulgusu olan enfeksiyon tablosunda erken resüsitasyon ve antibiyotik geciktirilmez.',
};

const sameQuestionOnlyShuffled = {
  ...baseQuestion,
  id: 'test-sepsis-2',
  options: [
    { id: 'A', text: 'Sadece düşük doz steroid tedavisi başlamak' },
    { id: 'B', text: 'Geniş spektrumlu antibiyotik ve 30 mL/kg kristaloid başlamak' },
    { id: 'C', text: 'Yalnız ateş kontrolü ve oral sıvı önermek' },
    { id: 'D', text: 'Rutin poliklinik kontrolü planlamak' },
    { id: 'E', text: 'Antibiyotik öncesi kesin kültür sonucunu beklemek' },
  ],
};

clearAIQuestionHistory();
rememberAIQuestion(baseQuestion);
const context = buildRecentQuestionContext(20);
const diversity = validateQuestionDiversity(sameQuestionOnlyShuffled, context, cases, {
  branchFilter: 'internal-medicine',
  selectedTopic: 'Sepsis erken yaklaşımı',
  questionType: 'first-step-management',
});

const serviceSource = fs.readFileSync('src/services/aiQuestionService.js', 'utf8');
const apiSource = fs.readFileSync('api/generate-ai-question.js', 'utf8');

const checks = {
  duplicateRejected: diversity.passed === false,
  duplicateReason: diversity.reason,
  clientHardRejectsRemoteDiversity: serviceSource.includes("clientDiversityGateMode: 'hard-reject-for-remote-ai'") && serviceSource.includes('Remote AI diversity gate rejected candidate'),
  clientNoAdvisoryRemoteDiversity: !serviceSource.includes("clientDiversityGateMode: 'advisory-for-remote-ai'"),
  emergencyFallbackKeepsHistory: !serviceSource.includes('{ recentIds: [], recentSignatures: [], recentQuestionSummaries: [] }'),
  serverDoesNotBypassFallbackDiversity: !apiSource.includes('bypassedDiversity: true'),
  promptStatesRecentListIsNotExample: apiSource.includes('Bu liste örnek değildir'),
};

const failed = Object.entries(checks).filter(([key, value]) => key !== 'duplicateReason' && !value);
const report = {
  status: failed.length ? 'FAIL' : 'PASS',
  diversity,
  checks,
  failed: failed.map(([key]) => key),
};

fs.writeFileSync('AI_HARD_DIVERSITY_REPEAT_TEST_REPORT.json', JSON.stringify(report, null, 2));
fs.writeFileSync('AI_HARD_DIVERSITY_REPEAT_TEST_REPORT.md', `# AI Hard Diversity Repeat Test\n\nStatus: **${report.status}**\n\n- Duplicate rejected: ${checks.duplicateRejected}\n- Rejection reason: ${checks.duplicateReason}\n- Remote duplicate is hard-rejected on client: ${checks.clientHardRejectsRemoteDiversity}\n- Emergency fallback preserves history: ${checks.emergencyFallbackKeepsHistory}\n- Server fallback cannot bypass diversity: ${checks.serverDoesNotBypassFallbackDiversity}\n- Prompt marks recent list as forbidden-repeat context, not examples: ${checks.promptStatesRecentListIsNotExample}\n`);

if (failed.length) {
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}

console.log(JSON.stringify(report, null, 2));
