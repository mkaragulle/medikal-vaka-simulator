import { readFileSync, writeFileSync } from 'node:fs';
import { normalizeGeneratedAIQuestion, validateAIQuestionCase } from '../src/utils/validateAIQuestion.js';

const editorialReport = JSON.parse(readFileSync('AI_EDITORIAL_QUALITY_50_TEST_REPORT.json', 'utf8'));

const badAnaphylaxisPayload = {
  id: 'ai-spot-real-context-repair-test',
  source: 'real-ai',
  caseType: 'ai-spot',
  title: 'Aşırı Duyarlılık Reaksiyonu Yönetimi.',
  relatedBranch: 'Anesteziyoloji ve Reanimasyon',
  difficulty: 'Orta',
  learningTarget: 'Anafilaksi yönetimi',
  demographics: '45 yaş erkek hasta',
  setting: 'Ameliyathane.',
  chiefComplaint: 'Genel anestezi altında cerrahi sırasında ani hipotansiyon ve bronkospazm.',
  stem: '45 yaşında erkek hasta, genel anestezi altında cerrahi sırasında ani hipotansiyon ve bronkospazm.Nedeniyle Ameliyathane.Hastada ani gelişen hipotansiyon ve bronkospazm anaflaksi ile uyumludur.',
  findings: {
    history: ['Nedeniyle Ameliyathane.'],
    exam: ['Şiddetli bronkospazm ve wheezing.'],
    vitals: { TA: '70/40 mmHg', Nabız: '120/dk', Solunum: '28/dk', Ateş: '36.8 °C', 'SpO₂': '88%' },
    investigations: [],
  },
  question: 'Genel anestezi altında gelişen ağır anafilaksi şüphesinde ilk ilaç hangisidir?',
  options: [
    { id: 'A', text: 'IM adrenalin' },
    { id: 'B', text: 'Antihistaminik IV' },
    { id: 'C', text: 'Bronkodilatör inhalasyonu' },
    { id: 'D', text: 'Kortikosteroid IV' },
    { id: 'E', text: 'Sıvı resüsitasyonu' },
  ],
  correctAnswer: 'A',
  explanation: 'Adrenalin, alfa ve beta adrenerjik reseptörler üzerinden vazokonstriksiyon, bronkodilatasyon ve kalp debisi artışı sağlayarak.',
  wrongOptionFeedback: {
    A: 'Doğru.',
    B: 'Bronkodilatör için beklenen ana ipuçları bu tabloda baskın değildir. Karar Adrenalin yönünde güçlenir.',
    C: 'Beklenen ana ipuçları bu tabloda baskın değildir.',
    D: 'Kanıt 2',
    E: 'Tedavi önceliği.',
  },
  evidenceChain: [
    'Laboratuvar paterni. Hastada ani gelişen hipotansiyon ve bronkospazm anaflaksi ile uyumludur.',
    'Kanıt 2',
    'Kanıt 3',
  ],
  examPearl: 'Ayırt ettirici bulgu. Hastada ani gelişen hipotansiyon ve bronkospazm anaflaksi ile uyumludur. Doğru yanıta götüren ana bulgudur.',
  managementSteps: ['İlk karar.', 'Tedavi önceliği.', 'IV sıvı resüsitasyonu başlayın.'],
  nextQuestionSeed: 'x',
};

const forbiddenPatterns = [
  /Beklenen ana ipuçları bu tabloda baskın değildir/iu,
  /Karar .{0,80} yönünde güçlenir/iu,
  /Laboratuvar paterni/iu,
  /Kanıt\s*[2-4]/iu,
  /Tedavi önceliği/iu,
  /İlk karar/iu,
  /Nedeniyle Ameliyathane/iu,
  /\bwheezing\b/iu,
  /sağlayarak\.\s*$/iu,
];

function collectVisibleText(value, output = [], key = '', seen = new WeakSet()) {
  const ignoredKeys = new Set(['id', 'source', 'schemaVersion', 'aiMeta', 'metadata', 'generatedAt']);
  if (ignoredKeys.has(key)) return output;
  if (typeof value === 'string') output.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectVisibleText(item, output, key, seen));
  else if (value && typeof value === 'object') {
    if (seen.has(value)) return output;
    seen.add(value);
    Object.entries(value).forEach(([childKey, item]) => collectVisibleText(item, output, childKey, seen));
  }
  return output;
}

const repairedAnaphylaxis = normalizeGeneratedAIQuestion(badAnaphylaxisPayload);
const repairValidation = validateAIQuestionCase(repairedAnaphylaxis, [], { requestedBranch: 'random' });
const repairedTexts = collectVisibleText(repairedAnaphylaxis);
const remainingForbidden = repairedTexts.filter((text) => forbiddenPatterns.some((pattern) => pattern.test(text)));
const correct = repairedAnaphylaxis.diagnosis?.correct || '';
const contextBundle = collectVisibleText(repairedAnaphylaxis).join(' ');
const hasPerioperativeBundle = /tetikleyici|ajanı durdur/iu.test(correct)
  && /oksijen|hava yolu/iu.test(correct)
  && /IV sıvı|kristaloid|sıvı/iu.test(correct)
  && /adrenalin|epinefrin/iu.test(correct)
  && /ameliyathane|genel anestezi|indüksiyon/iu.test(contextBundle);
const anaphylaxisRepairOk = repairValidation.ok && remainingForbidden.length === 0 && hasPerioperativeBundle;

const report = {
  testName: 'AI context-sensitive quality gate 50-test',
  generatedAt: new Date().toISOString(),
  total: editorialReport.total,
  passed: editorialReport.passed,
  failed: editorialReport.failed,
  baseEditorialReport: 'AI_EDITORIAL_QUALITY_50_TEST_REPORT.json',
  checkedRules: [
    ...editorialReport.checkedRules,
    'perioperatif anafilaksi bağlamında IM adrenalin ezberinin yönetim paketine repair edilmesi',
    'yasaklı feedback şablonlarının repair sonrası görünür metinde kalmaması',
    'wheezing ve bozuk ameliyathane cümlesinin Türkçe/tıbbi normalizasyonu',
  ],
  anaphylaxisRepair: {
    ok: anaphylaxisRepairOk,
    title: repairedAnaphylaxis.title,
    question: repairedAnaphylaxis.question,
    correct,
    validationErrors: repairValidation.errors,
    remainingForbidden,
  },
  results: editorialReport.results,
};

writeFileSync('AI_CONTEXT_QUALITY_50_TEST_REPORT.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ total: report.total, passed: report.passed, failed: report.failed, anaphylaxisRepairOk }, null, 2));
process.exit(report.failed > 0 || !anaphylaxisRepairOk ? 1 : 0);
