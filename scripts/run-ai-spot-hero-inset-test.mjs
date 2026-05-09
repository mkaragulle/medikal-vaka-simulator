import fs from 'node:fs';
import path from 'node:path';

const cssPath = path.resolve('src/index.css');
const css = fs.readFileSync(cssPath, 'utf8');
const blockStart = css.indexOf('KLINIKIQ V179 — AI Spot hero control inset correction');
if (blockStart === -1) {
  throw new Error('V179 hero inset correction block is missing.');
}
const block = css.slice(blockStart);
const required = [
  'width: min(100%, 440px) !important',
  'align-items: stretch !important',
  'justify-items: stretch !important',
  'ai-practice-actions.ai-practice-actions-pro > *',
  'max-width: none !important',
  'margin-inline: 0 !important',
  'grid-template-columns: minmax(0, 1fr) minmax(0, 1.08fr) !important',
];
for (const token of required) {
  if (!block.includes(token)) {
    throw new Error(`Missing hero inset control token: ${token}`);
  }
}
console.log(JSON.stringify({ ok: true, checked: required.length, file: 'src/index.css' }, null, 2));
