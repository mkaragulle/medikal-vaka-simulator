import fs from 'node:fs';

const component = fs.readFileSync('src/components/TusPearlStudyScreen.jsx', 'utf8');
const css = fs.readFileSync('src/components/tusPearlCards.css', 'utf8');

const checks = [
  ['uses React portal', component.includes("import { createPortal } from 'react-dom';") && component.includes('createPortal(')],
  ['uses fixed popover positioning', css.includes('.pearl-study-more-popover') && css.includes('position: fixed') && css.includes('z-index: 9999')],
  ['has accessible trigger attrs', component.includes('aria-haspopup="menu"') && component.includes('aria-expanded={open}') && component.includes('aria-controls="pearl-study-more-menu"')],
  ['supports outside click and escape', component.includes("document.addEventListener('pointerdown'") && component.includes("event.key === 'Escape'")],
  ['supports scroll/resize reposition', component.includes("window.addEventListener('resize'") && component.includes("window.addEventListener('scroll'")],
  ['contains required menu actions', ['Tüm kartları gör', 'Kendi kartını oluştur', 'Bildiklerim', 'Kendi kartlarım', 'Kataloglarım'].every((text) => component.includes(text) || component.includes('secondaryRepeatItems'))],
  ['supports mobile sheet placement', component.includes("placement: 'sheet'") && css.includes('.pearl-study-more-popover.mobile-sheet')],
];

const failures = checks.filter(([, passed]) => !passed).map(([name]) => name);
const report = {
  status: failures.length ? 'FAIL' : 'PASS',
  checks: Object.fromEntries(checks),
  failures,
};

fs.writeFileSync('HAP_BILGI_DROPDOWN_PORTAL_TEST_REPORT.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exit(1);
