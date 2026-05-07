import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const casesPath = path.join(root, 'src/data/cases.js');
const { cases } = await import(`${pathToFileURL(casesPath).href}?v=${Date.now()}`);

function capAfterPeriod(text = '') {
  return String(text).replace(/([.!?]\s+)([a-zçğıöşü])/gu, (_, p, ch) => p + ch.toLocaleUpperCase('tr'));
}

function cleanString(value = '') {
  let text = String(value)
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,.;:!?])(?=\S)/g, '$1 ')
    .replace(/\.{3}|…/g, '')
    .replace(/\s*;\s*/g, '. ')
    .replace(/\bBu spot olguda ana ipucunu\s*\(([^)]+)\)\s*yakalayıp\s*çeldiriciyi\s*eleyerek\s*doğru sınav kararına ulaşır\.?/giu, 'Ana ipucu $1 bilgisidir. Bu bilgi doğru sınav kararını destekler.')
    .replace(/\bAna ipucunu\s*\(([^)]+)\)\s*yakalayıp\s*çeldiriciyi\s*eleyerek\s*doğru sınav kararına ulaşır\.?/giu, 'Ana ipucu $1 bilgisidir. Bu bilgi doğru sınav kararını destekler.')
    .replace(/\bçeldiricilerine\b/giu, 'alternatiflerine')
    .replace(/\bçeldiricileri\b/giu, 'alternatifleri')
    .replace(/\bçeldiriciler\b/giu, 'alternatifler')
    .replace(/\bçeldiricidir\b/giu, 'yanıltıcı olabilir')
    .replace(/\bçeldirici olabilir\b/giu, 'yanıltıcı olabilir')
    .replace(/\bçeldiriciyi\b/giu, 'alternatifi')
    .replace(/\bçeldirici\b/giu, 'alternatif')
    .replace(/\bdoğru seçenek\b/giu, 'uygun yanıt')
    .replace(/\bKarar verdirici ipucu\s*[:：-]\s*/giu, '')
    .replace(/\bDestekleyici kanıt\s*[:：-]\s*/giu, '')
    .replace(/\bAyırt ettirici ipucu\s*[:：-]\s*/giu, '')
    .replace(/\bİlk tedavi\s*[:：-]\s*/giu, '')
    .replace(/\bMekanizma\s*[:：-]\s*/giu, '')
    .replace(/\bTUS kırmızı bayrağı\s*[:：-]\s*/giu, '')
    .replace(/\bKlinik olasılığı belirle\s*[:：-]\s*/giu, '')
    .replace(/\bOlgu verisi\s*[:：-]\s*/giu, '')
    .replace(/\bEk destek\s*[:：-]\s*/giu, '')
    .replace(/\s*\/\s*/g, ' veya ')
    .replace(/\s*\+\s*/g, ' ve ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,.;:!?])(?=\S)/g, '$1 ')
    .replace(/\.\s*\.\s*/g, '. ')
    .replace(/\s+/g, ' ')
    .trim();
  text = capAfterPeriod(text);
  text = text.replace(/^([a-zçğıöşü])/u, (m) => m.toLocaleUpperCase('tr'));
  return text;
}

function traverse(value) {
  if (typeof value === 'string') return cleanString(value);
  if (Array.isArray(value)) return value.map(traverse);
  if (value && typeof value === 'object') {
    for (const key of Object.keys(value)) value[key] = traverse(value[key]);
    return value;
  }
  return value;
}
const updated = traverse(structuredClone(cases));
const content = `export const cases = ${JSON.stringify(updated, null, 2)};\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`;
fs.writeFileSync(casesPath, content);
const text = JSON.stringify(updated);
const report = JSON.parse(fs.readFileSync(path.join(root, 'EDITORIAL_QUALITY_PASS_REPORT.json'), 'utf8'));
report.finalSweep = {
  generatedAt: new Date().toISOString(),
  residualPhraseCounts: {
    bestAnswerPhrase: (text.match(/Bu nedenle en iyi yanıt/giu) || []).length,
    weakEvidenceTitles: (text.match(/Karar verdirici ipucu|Destekleyici kanıt|Ayırt ettirici ipucu/giu) || []).length,
    eliminatedTemplate: (text.match(/bu olguda elenir:/giu) || []).length,
    metaDistractorLanguage: (text.match(/çeldirici/giu) || []).length,
    ellipsis: (text.match(/\.\.\.|…/gu) || []).length,
    semicolons: (text.match(/;/gu) || []).length,
  }
};
fs.writeFileSync(path.join(root, 'EDITORIAL_QUALITY_PASS_REPORT.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report.finalSweep, null, 2));
