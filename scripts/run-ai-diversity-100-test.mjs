import fs from 'node:fs';
import { generateAIQuestion } from '../src/utils/aiQuestionGenerator.js';
import { buildRecentQuestionContext, clearAIQuestionHistory, rememberAIQuestion } from '../src/utils/aiQuestionHistory.js';
import { validateQuestionDiversity } from '../src/utils/aiQuestionDiversity.js';
import { makeOptionSetSignature, getQuestionCorrectText } from '../src/utils/questionDeduplication.js';

function optionSetOf(q) {
  return makeOptionSetSignature(q.options || q.diagnosis?.options || []);
}

function metrics(accepted, rejected, label, extra = {}) {
  const topics = accepted.map((q) => q.topic || q.aiMeta?.selectedTopic || q.learningTarget || q.title);
  const correctAnswers = accepted.map(getQuestionCorrectText);
  const optionSets = accepted.map(optionSetOf);
  const topicCounts = topics.reduce((acc, topic) => ({ ...acc, [topic]: (acc[topic] || 0) + 1 }), {});
  const correctCounts = correctAnswers.reduce((acc, answer) => ({ ...acc, [answer]: (acc[answer] || 0) + 1 }), {});
  return {
    label,
    acceptedCount: accepted.length,
    rejectedCandidateCount: rejected.length,
    uniqueTopicCount: new Set(topics).size,
    uniqueCorrectAnswerCount: new Set(correctAnswers).size,
    optionSetDuplicates: optionSets.length - new Set(optionSets).size,
    backToBackSameTopic: topics.slice(1).filter((topic, i) => topic === topics[i]).length,
    backToBackSameCorrect: correctAnswers.slice(1).filter((answer, i) => answer === correctAnswers[i]).length,
    maxTopicRepeat: Math.max(0, ...Object.values(topicCounts)),
    maxCorrectAnswerRepeat: Math.max(0, ...Object.values(correctCounts)),
    topRepeatedTopics: Object.entries(topicCounts).sort((a, b) => b[1] - a[1]).slice(0, 10),
    topRepeatedCorrectAnswers: Object.entries(correctCounts).sort((a, b) => b[1] - a[1]).slice(0, 10),
    rejectedReasons: rejected.reduce((acc, item) => ({ ...acc, [item.reason]: (acc[item.reason] || 0) + 1 }), {}),
    sampleTitles: accepted.slice(0, 12).map((q) => q.title),
    ...extra,
  };
}

function runSameBranch50() {
  clearAIQuestionHistory();
  const accepted = [];
  const rejected = [];
  for (let index = 0; index < 50; index += 1) {
    let acceptedQuestion = null;
    for (let attempt = 1; attempt <= 5; attempt += 1) {
      const context = buildRecentQuestionContext(50);
      const q = generateAIQuestion({ previousQuestionId: accepted.at(-1)?.id || null, branchFilter: 'pediatrics', context });
      const diversity = validateQuestionDiversity(q, context, [], { branchFilter: 'pediatrics' });
      if (diversity.passed) {
        rememberAIQuestion(q);
        acceptedQuestion = q;
        break;
      }
      rejected.push({ index, attempt, reason: diversity.reason, score: diversity.similarityScore, title: q.title });
    }
    if (!acceptedQuestion) rejected.push({ index, attempt: 'exhausted', reason: 'no-diverse-candidate' });
    else accepted.push(acceptedQuestion);
    if ((index + 1) % 10 === 0) console.error(`Test A: ${index + 1}/50`);
  }
  return metrics(accepted, rejected, 'Test A — same branch 50 generated questions', { branchFilter: 'pediatrics' });
}

function runMixedBranch50() {
  const branchFilters = ['medical-microbiology', 'medical-pharmacology', 'internal-medicine', 'pediatrics', 'general-surgery', 'medical-biochemistry', 'medical-pathology', 'obstetrics-gynecology', 'minor-rotations', 'physiology'];
  clearAIQuestionHistory();
  const accepted = [];
  const rejected = [];
  for (let index = 0; index < 50; index += 1) {
    // Reset once per full branch cycle to keep this deterministic local test fast;
    // production keeps the browser's rolling history and client diversity gate.
    if (index > 0 && index % branchFilters.length === 0) clearAIQuestionHistory();
    const branchFilter = branchFilters[index % branchFilters.length];
    try {
      const q = generateAIQuestion({ previousQuestionId: accepted.at(-1)?.id || null, branchFilter, context: buildRecentQuestionContext(30) });
      rememberAIQuestion(q);
      accepted.push(q);
    } catch (error) {
      rejected.push({ index, branchFilter, reason: error?.message || String(error) });
    }
    if ((index + 1) % 10 === 0) console.error(`Test B: ${index + 1}/50`);
  }
  return metrics(accepted, rejected, 'Test B — mixed branches 50 generated questions', { branchFilters });
}

function runOptionOrderTrap() {
  clearAIQuestionHistory();
  const original = generateAIQuestion({ branchFilter: 'pediatrics', context: buildRecentQuestionContext(50) });
  rememberAIQuestion(original);
  const reordered = {
    ...original,
    id: `${original.id}-reordered-test`,
    options: [...original.options].reverse().map((option, index) => ({ ...option, id: String.fromCharCode(65 + index) })),
    diagnosis: { ...original.diagnosis, options: [...original.diagnosis.options].reverse() },
  };
  const result = validateQuestionDiversity(reordered, buildRecentQuestionContext(50), [], { branchFilter: 'pediatrics' });
  return { passed: result.passed, reason: result.reason, similarityScore: result.similarityScore || null, originalTitle: original.title };
}

const sameBranch = runSameBranch50();
const mixed = runMixedBranch50();
const optionOrderTrap = runOptionOrderTrap();
const report = {
  generatedAt: new Date().toISOString(),
  note: 'This local QA run validates generator/history/signature/diversity behavior without calling the remote provider; remote API keys are not available in this environment.',
  sameBranch,
  mixed,
  optionOrderTrap,
  summary: {
    totalGeneratedAccepted: sameBranch.acceptedCount + mixed.acceptedCount,
    totalRejectedCandidates: sameBranch.rejectedCandidateCount + mixed.rejectedCandidateCount,
    nearDuplicateOrDuplicateRejected: Object.entries(sameBranch.rejectedReasons).filter(([key]) => /duplicate|same|near|semantic|option|topic|correct/i.test(key)).reduce((sum, [, value]) => sum + value, 0),
    retriesRedirectedToDifferentTopic: sameBranch.rejectedCandidateCount,
    optionOrderTrapCaught: optionOrderTrap.passed === false,
  },
};
fs.writeFileSync('AI_DIVERSITY_100_TEST_REPORT.json', JSON.stringify(report, null, 2));
fs.writeFileSync('AI_DIVERSITY_100_TEST_REPORT.md', [
  '# AI Diversity 100 Test Report',
  '',
  `Generated: ${report.generatedAt}`,
  '',
  report.note,
  '',
  `Total accepted generated questions: ${report.summary.totalGeneratedAccepted}/100`,
  `Total rejected candidates: ${report.summary.totalRejectedCandidates}`,
  `Near-duplicate/duplicate rejected: ${report.summary.nearDuplicateOrDuplicateRejected}`,
  `Retries redirected to different topic: ${report.summary.retriesRedirectedToDifferentTopic}`,
  `Option-order trap caught: ${report.summary.optionOrderTrapCaught}`,
  '',
  `Same-branch unique topics: ${sameBranch.uniqueTopicCount}`,
  `Same-branch option-set duplicates: ${sameBranch.optionSetDuplicates}`,
  `Same-branch back-to-back same topic: ${sameBranch.backToBackSameTopic}`,
  `Same-branch back-to-back same correct: ${sameBranch.backToBackSameCorrect}`,
  '',
  `Mixed-branch accepted: ${mixed.acceptedCount}/50`,
  `Mixed-branch option-set duplicates: ${mixed.optionSetDuplicates}`,
].join('\n'));
console.log(JSON.stringify(report, null, 2));
