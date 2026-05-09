import { readFileSync } from 'node:fs';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');
const finalBlock = css.slice(css.lastIndexOf('KLINIKIQ V178'));

assert(finalBlock.includes('minmax(360px, 472px)'), 'Hero right column should use a compact 472px control width.');
assert(/\.ai-practice-actions\.ai-practice-actions-pro[\s\S]*?padding:\s*12px\s*!important/.test(finalBlock), 'Control card padding should be compact and balanced.');
assert(/\.ai-practice-actions-pro \.ai-branch-filter-control span[\s\S]*?padding:\s*0\s*!important/.test(finalBlock), 'Label should not carry extra left padding.');
assert(/\.ai-practice-actions-pro \.ai-branch-filter-control select[\s\S]*?padding:\s*0 46px 0 14px\s*!important/.test(finalBlock), 'Select should use controlled left inset without a large gutter.');
assert(/\.ai-practice-actions-pro \.ai-practice-button-row[\s\S]*?grid-template-columns:\s*minmax\(0, 1fr\) minmax\(0, 1\.08fr\)\s*!important/.test(finalBlock), 'Action buttons should remain aligned on a shared grid.');
assert(/@media \(max-width: 720px\)[\s\S]*?\.ai-practice-actions-pro \.ai-practice-button-row[\s\S]*?grid-template-columns:\s*1fr\s*!important/.test(finalBlock), 'Mobile layout should stack buttons to avoid horizontal overflow.');

console.log(JSON.stringify({
  status: 'PASS',
  checks: [
    'Sağ kontrol kolonu 472px kompakt genişliğe indirildi',
    'Kontrol kartı padding/gap değerleri dengelendi',
    'Label sol paddingi kaldırıldı',
    'Select sol inseti kontrollü hale getirildi',
    'Butonlar ortak grid hizasında korundu',
    'Mobilde butonlar alt alta akıyor',
  ],
}, null, 2));
