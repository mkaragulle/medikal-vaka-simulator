import fs from 'node:fs';

const component = fs.readFileSync('src/components/DiagnosisQuiz.jsx', 'utf8');
const css = fs.readFileSync('src/index.css', 'utf8');

const checks = [
  {
    name: 'inline stem gate exists for AI Spot when callout is hidden',
    pass: /showInlineQuestionStem\s*=\s*isSpotCase\s*&&\s*Boolean\(questionPrompt\)\s*&&\s*hideSpotQuestionCallout/.test(component),
  },
  {
    name: 'AI Spot soru kökü renders before option grid',
    pass: component.indexOf('ai-spot-inline-question-stem') > -1 && component.indexOf('ai-spot-inline-question-stem') < component.indexOf('className="option-grid"'),
  },
  {
    name: 'old separate callout remains hidden in AI single-flow mode',
    pass: /\.ai-spot-answer-flow\s+\.tus-spot-olgular-question-callout\s*\{[^}]*display:\s*none\s*!important/s.test(css),
  },
  {
    name: 'inline stem has dedicated visible styling',
    pass: /\.ai-spot-answer-flow\s+\.ai-spot-inline-question-stem\s*\{[^}]*display:\s*grid\s*!important/s.test(css),
  },
  {
    name: 'inline stem max-width matches answer column rhythm',
    pass: /\.ai-spot-answer-flow\s+\.ai-spot-inline-question-stem\s*\{[^}]*max-width:\s*920px\s*!important/s.test(css),
  },
  {
    name: 'dark mode styling exists',
    pass: /data-theme="dark"[^{}]*\.ai-spot-inline-question-stem/s.test(css),
  },
];

const failed = checks.filter((check) => !check.pass);
const report = { passed: failed.length === 0, total: checks.length, failed: failed.map((item) => item.name), checks };
fs.writeFileSync('AI_SPOT_QUESTION_STEM_INLINE_TEST_REPORT.json', `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync('AI_SPOT_QUESTION_STEM_INLINE_TEST_REPORT.md', report.passed ? 'AI Spot question stem inline render test: PASSED\n' : `AI Spot question stem inline render test: FAILED\n\n${failed.map((f) => `- ${f.name}`).join('\n')}\n`);
if (!report.passed) process.exit(1);
console.log('AI Spot question stem inline render test: PASSED');
