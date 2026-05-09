import fs from 'node:fs';

const component = fs.readFileSync('src/components/GlossaryTooltip.jsx', 'utf8');
const css = fs.readFileSync('src/index.css', 'utf8');

const checks = [
  {
    name: 'GlossaryText returns a single inline wrapper when enabled',
    pass: /<span\s+className="glossary-text-flow">[\s\S]*parts\.map/.test(component),
  },
  {
    name: 'GlossaryText also wraps disabled text to avoid grid fragment splitting',
    pass: /if \(!enabled\) return <span className="glossary-text-flow">\{text\}<\/span>;/.test(component),
  },
  {
    name: 'Plain text glossary segments are not direct parent grid items',
    pass: /className="glossary-plain-segment"/.test(component),
  },
  {
    name: 'Global glossary flow CSS exists',
    pass: /V58 — Glossary inline-flow hardening/.test(css) && /\.glossary-text-flow/.test(css),
  },
  {
    name: 'Feedback glossary flow is protected from grid row splitting',
    pass: /management-action-item p[\s\S]*> \.glossary-text-flow/.test(css),
  },
];

const failed = checks.filter((check) => !check.pass);
if (failed.length) {
  console.error('Glossary inline-flow QA failed:');
  for (const check of failed) console.error(`- ${check.name}`);
  process.exit(1);
}

console.log('Glossary inline-flow QA passed.');
for (const check of checks) console.log(`✓ ${check.name}`);
