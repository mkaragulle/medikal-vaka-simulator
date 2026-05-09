import fs from 'node:fs';
import path from 'node:path';

const servicePath = path.resolve('src/services/aiQuestionService.js');
const source = fs.readFileSync(servicePath, 'utf8');

const checks = [
  {
    name: 'Remote AI client validation trusts server-validated output for semantic novelty',
    ok: /trustRemoteAi:\s*true/.test(source) && /skipSemanticNovelty:\s*true/.test(source),
  },
  {
    name: 'Remote diversity gate is advisory rather than UI-blocking',
    ok: /clientDiversityGateMode:\s*'advisory-for-remote-ai'/.test(source)
      && /remote-diversity-soft-warning/.test(source)
      && !/throw new Error\(`Remote AI diversity gate rejected candidate/.test(source),
  },
  {
    name: 'Client quality gate keeps structural validation hard but quality warnings soft',
    ok: /clientQualityGateMode:\s*'server-trusted-soft-warning'/.test(source)
      && /structuralValidation/.test(source),
  },
  {
    name: 'Local fallback has an emergency no-error path before returning UI failure',
    ok: /function createEmergencyLocalQuestion/.test(source)
      && /emergencyFallback/.test(source)
      && /source:\s*question\.source \|\| 'local-emergency-template-generator'/.test(source),
  },
  {
    name: 'Emergency fallback clears stale history/context before final generation attempt',
    ok: /recentIds:\s*\[\],\s*recentSignatures:\s*\[\],\s*recentQuestionSummaries:\s*\[\]/s.test(source),
  },
];

const failed = checks.filter((check) => !check.ok);
console.log(JSON.stringify({ ok: failed.length === 0, checks }, null, 2));
if (failed.length) process.exit(1);
