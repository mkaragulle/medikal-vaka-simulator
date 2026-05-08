import { writeFileSync } from 'node:fs';
import { rawCases, cases } from '../src/data/cases.js';
import { summarizeLeakageScan } from '../src/utils/answerLeakageGate.js';

const rawSummary = summarizeLeakageScan(rawCases);
const repairedSummary = summarizeLeakageScan(cases);

const report = {
  generatedAt: new Date().toISOString(),
  scope: 'embedded-cases',
  rawSummary,
  repairedSummary,
  pass: repairedSummary.casesWithLeakage === 0,
};

writeFileSync('ANSWER_LEAKAGE_SCAN_REPORT.json', JSON.stringify(report, null, 2));
writeFileSync('ANSWER_LEAKAGE_SCAN_REPORT.md', [
  '# Answer Leakage Scan Report',
  '',
  `Generated at: ${report.generatedAt}`,
  '',
  '## Raw embedded case scan',
  `- Total cases: ${rawSummary.totalCases}`,
  `- Cases with leakage: ${rawSummary.casesWithLeakage}`,
  `- Title leakage hits: ${rawSummary.titleLeakage}`,
  `- Pre-answer spot/TUS leakage hits: ${rawSummary.spotPreAnswerLeakage}`,
  `- Investigation interpretation leakage hits: ${rawSummary.investigationInterpretationLeakage}`,
  `- Hard leakage hits: ${rawSummary.hardLeakage}`,
  `- Soft leakage hits: ${rawSummary.softLeakage}`,
  `- Unit issues: ${rawSummary.unitIssues}`,
  '',
  '## Runtime-repaired case scan',
  `- Total cases: ${repairedSummary.totalCases}`,
  `- Cases with leakage: ${repairedSummary.casesWithLeakage}`,
  `- Title leakage hits: ${repairedSummary.titleLeakage}`,
  `- Pre-answer spot/TUS leakage hits: ${repairedSummary.spotPreAnswerLeakage}`,
  `- Investigation interpretation leakage hits: ${repairedSummary.investigationInterpretationLeakage}`,
  `- Hard leakage hits: ${repairedSummary.hardLeakage}`,
  `- Soft leakage hits: ${repairedSummary.softLeakage}`,
  `- Unit issues: ${repairedSummary.unitIssues}`,
  '',
  `Result: ${report.pass ? 'PASS' : 'FAIL'}`,
].join('\n'));

console.log(JSON.stringify({ pass: report.pass, raw: rawSummary, repaired: repairedSummary }, null, 2));
if (!report.pass) process.exit(1);
