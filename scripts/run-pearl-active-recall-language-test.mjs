import fs from 'node:fs';
import { TUS_PEARL_CARDS } from '../src/data/tusPearlCards.js';
import {
  PEARL_META_FORBIDDEN_PATTERNS,
  getPearlBackContent,
  normalizePearlCardFields,
  normalizePearlTextForCompare,
} from '../src/utils/pearlCardContent.js';

function fieldText(card) {
  return [card.front, card.back, card.answer, card.explanation, card.tusTip, card.differentialNote].filter(Boolean).join('\n');
}

function firstMatchingPattern(text) {
  return PEARL_META_FORBIDDEN_PATTERNS.find((pattern) => pattern.test(text));
}

function frontSentenceIsRepeated(front = '', value = '') {
  const frontKey = normalizePearlTextForCompare(front);
  const valueKey = normalizePearlTextForCompare(value);
  if (!frontKey || !valueKey) return false;
  return valueKey === frontKey || valueKey.startsWith(`${frontKey} `) || valueKey.includes(` ${frontKey} `);
}

const GENERIC_FRONT_PATTERNS = [
  /karışabilecek temel ayırıcı/i,
  /ayırt ettirici TUS paterni/i,
  /çeldiriciye düşmemeyi sağlayan/i,
  /yüksek verimli ipucu zinciri/i,
];

const normalizedCards = TUS_PEARL_CARDS.map((card) => normalizePearlCardFields(card));
const metaViolations = [];
const duplicationViolations = [];
const missingFieldViolations = [];
const genericFrontViolations = [];
const examples = [];

for (const card of normalizedCards) {
  const text = fieldText(card);
  const pattern = firstMatchingPattern(text);
  if (pattern) {
    metaViolations.push({ id: card.id, topic: card.topic, pattern: String(pattern), front: card.front });
  }
  if (!card.front || !card.answer) {
    missingFieldViolations.push({ id: card.id, topic: card.topic, front: card.front, answer: card.answer });
  }
  const genericPattern = GENERIC_FRONT_PATTERNS.find((item) => item.test(card.front || ''));
  if (genericPattern) {
    genericFrontViolations.push({ id: card.id, topic: card.topic, pattern: String(genericPattern), front: card.front });
  }
  const backContent = getPearlBackContent(card);
  for (const [field, value] of Object.entries({
    answer: backContent.backText,
    explanation: backContent.detailText,
    tusTip: backContent.tusTipText,
    differentialNote: backContent.noteText,
  })) {
    if (!value) continue;
    if (frontSentenceIsRepeated(card.front, value)) {
      duplicationViolations.push({ id: card.id, topic: card.topic, field, front: card.front, value });
    }
  }
}

const preferredTopics = [
  'Karbonmonoksit zehirlenmesi',
  'Hiperkalemi + EKG değişikliği',
  'Anafilaksi',
  'SLE aktivite',
  'Sepsis erken yaklaşımı',
  'Ulnar sinir lezyonu',
  'Radial sinir lezyonu',
  'V/Q uyumsuzluğu',
  'DKA tanı kriterleri',
  'Torsades de pointes',
];

function pushExample(card) {
  if (!card || examples.some((item) => item.id === card.id)) return;
  const content = getPearlBackContent(card);
  examples.push({
    id: card.id,
    topic: card.topic,
    cardType: card.cardType,
    front: card.front,
    answer: content.backText,
    explanation: content.detailText,
    tusTip: content.tusTipText,
    differentialNote: content.noteText,
  });
}

for (const topic of preferredTopics) {
  pushExample(normalizedCards.find((item) => item.topic === topic && item.cardType === 'Anahtar kelime')
    || normalizedCards.find((item) => item.topic === topic));
}

for (const card of normalizedCards.filter((item) => item.cardType === 'Anahtar kelime')) {
  if (examples.length >= 10) break;
  pushExample(card);
}

const report = {
  totalCards: TUS_PEARL_CARDS.length,
  normalizedCards: normalizedCards.length,
  metaViolations: metaViolations.length,
  duplicationViolations: duplicationViolations.length,
  missingFieldViolations: missingFieldViolations.length,
  genericFrontViolations: genericFrontViolations.length,
  manualReviewRequired: [],
  examples,
  status: metaViolations.length || duplicationViolations.length || missingFieldViolations.length || genericFrontViolations.length ? 'failed' : 'passed',
  generatedAt: new Date().toISOString(),
};

fs.writeFileSync('HAP_BILGI_ACTIVE_RECALL_LANGUAGE_TEST_REPORT.json', JSON.stringify(report, null, 2));
fs.writeFileSync('HAP_BILGI_ACTIVE_RECALL_LANGUAGE_TEST_REPORT.md', [
  '# Hap Bilgi Active Recall Language Test',
  '',
  `- Total cards: ${report.totalCards}`,
  `- Meta-language violations: ${report.metaViolations}`,
  `- Front/back duplication violations: ${report.duplicationViolations}`,
  `- Missing front/answer violations: ${report.missingFieldViolations}`,
  `- Generic front violations: ${report.genericFrontViolations}`,
  `- Manual review required: ${report.manualReviewRequired.length}`,
  `- Status: ${report.status}`,
  '',
  '## Sample normalized cards',
  ...examples.flatMap((example, index) => [
    '',
    `### ${index + 1}. ${example.topic}`,
    `- Front: ${example.front}`,
    `- Answer: ${example.answer}`,
    example.explanation ? `- Explanation: ${example.explanation}` : '',
    example.tusTip ? `- TUS tip: ${example.tusTip}` : '',
    example.differentialNote ? `- Differential note: ${example.differentialNote}` : '',
  ].filter(Boolean)),
  '',
].join('\n'));

if (report.status !== 'passed') {
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}

console.log(JSON.stringify(report, null, 2));
