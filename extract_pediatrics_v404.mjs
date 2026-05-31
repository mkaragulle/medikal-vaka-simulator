import { rawCases } from './src/data/cases.js';
import { TUS_PEARL_TOPICS } from './src/data/tusPearlCards.js';
import { TUS_PEARL_PEDIATRICS_FIRST63_TEXT_OVERRIDES } from './src/data/tusPearlPediatricsFirst63Overrides.js';
import { TUS_PEARL_PEDIATRICS_SECOND63_TEXT_OVERRIDES } from './src/data/tusPearlPediatricsSecond63Overrides.js';
import { getGlossaryTerms } from './src/utils/glossary.js';
import fs from 'fs';

const outDir = './reports/pediatrics_glossary_expansion';
fs.mkdirSync(outDir, { recursive: true });

function isPediatricsCase(c) {
  const rel = String(c.relatedBranch || c.branchName || c.subject || '').toLocaleLowerCase('tr');
  return c.branchId === 'pediatrics' || rel.includes('çocuk') || rel.includes('pediatri');
}
function isPediatricsTopic(t) {
  const s = String(t.subject || t.branchName || '').toLocaleLowerCase('tr');
  return t.branchId === 'pediatrics' || s.includes('çocuk') || s.includes('pediatri');
}
function walk(value, path, bucket) {
  if (value == null) return;
  if (typeof value === 'string') {
    const text = value.replace(/\s+/g, ' ').trim();
    if (text.length >= 2) bucket.push({ path, text });
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, idx) => walk(item, `${path}[${idx}]`, bucket));
    return;
  }
  if (typeof value === 'object') {
    Object.entries(value).forEach(([k, v]) => walk(v, path ? `${path}.${k}` : k, bucket));
  }
}

const texts = [];
const sourceInventory = [];

const pedCases = rawCases.filter(isPediatricsCase);
pedCases.forEach((c) => {
  const bucket = [];
  walk(c, `src/data/cases.js::${c.id}`, bucket);
  texts.push(...bucket.map(x => ({ ...x, sourceArea: 'Çocuk Sağlığı ve Hastalıkları Klinik Olgu', sourceFilePath: 'src/data/cases.js', sourceId: c.id, sourceTitle: c.title || '' })));
});
sourceInventory.push({ sourceFilePath: 'src/data/cases.js', sourceType: 'clinicalCases', sourceArea: 'Çocuk Sağlığı ve Hastalıkları', recordCount: pedCases.length, textFieldCount: texts.filter(t=>t.sourceFilePath==='src/data/cases.js').length });

const pedTopics = TUS_PEARL_TOPICS.filter(isPediatricsTopic);
pedTopics.forEach((t, idx) => {
  const bucket = [];
  walk(t, `src/data/tusPearlCards.js::pediatrics[${idx}]`, bucket);
  texts.push(...bucket.map(x => ({ ...x, sourceArea: 'Çocuk Sağlığı ve Hastalıkları TUS Pearl', sourceFilePath: 'src/data/tusPearlCards.js', sourceId: t.id || t.topic || `peds-topic-${idx}`, sourceTitle: t.topic || '' })));
});
sourceInventory.push({ sourceFilePath: 'src/data/tusPearlCards.js', sourceType: 'tusPearlCards', sourceArea: 'Çocuk Sağlığı ve Hastalıkları', recordCount: pedTopics.length, textFieldCount: texts.filter(t=>t.sourceFilePath==='src/data/tusPearlCards.js').length });

const ov1 = TUS_PEARL_PEDIATRICS_FIRST63_TEXT_OVERRIDES;
Object.entries(ov1).forEach(([id, rec]) => {
  const bucket = [];
  walk(rec, `src/data/tusPearlPediatricsFirst63Overrides.js::${id}`, bucket);
  texts.push(...bucket.map(x => ({ ...x, sourceArea: 'Çocuk Sağlığı ve Hastalıkları Hap Kart Override', sourceFilePath: 'src/data/tusPearlPediatricsFirst63Overrides.js', sourceId: id, sourceTitle: rec.front || rec.answer || '' })));
});
sourceInventory.push({ sourceFilePath: 'src/data/tusPearlPediatricsFirst63Overrides.js', sourceType: 'hapCardOverrides', sourceArea: 'Çocuk Sağlığı ve Hastalıkları', recordCount: Object.keys(ov1).length, textFieldCount: texts.filter(t=>t.sourceFilePath==='src/data/tusPearlPediatricsFirst63Overrides.js').length });

const ov2 = TUS_PEARL_PEDIATRICS_SECOND63_TEXT_OVERRIDES;
Object.entries(ov2).forEach(([id, rec]) => {
  const bucket = [];
  walk(rec, `src/data/tusPearlPediatricsSecond63Overrides.js::${id}`, bucket);
  texts.push(...bucket.map(x => ({ ...x, sourceArea: 'Çocuk Sağlığı ve Hastalıkları Hap Kart Override', sourceFilePath: 'src/data/tusPearlPediatricsSecond63Overrides.js', sourceId: id, sourceTitle: rec.front || rec.answer || '' })));
});
sourceInventory.push({ sourceFilePath: 'src/data/tusPearlPediatricsSecond63Overrides.js', sourceType: 'hapCardOverrides', sourceArea: 'Çocuk Sağlığı ve Hastalıkları', recordCount: Object.keys(ov2).length, textFieldCount: texts.filter(t=>t.sourceFilePath==='src/data/tusPearlPediatricsSecond63Overrides.js').length });

const glossary = getGlossaryTerms();
const normPayload = glossary.map((g) => ({ term: g.term || '', aliases: Array.isArray(g.aliases) ? g.aliases : [] }));
fs.writeFileSync(`${outDir}/pediatrics-text-fields-v404.json`, JSON.stringify({ texts, sourceInventory, counts: { pedCases: pedCases.length, pedTopics: pedTopics.length, ov1: Object.keys(ov1).length, ov2: Object.keys(ov2).length, textFields: texts.length } }, null, 2));
fs.writeFileSync(`${outDir}/pediatrics-active-glossary-terms-v404.json`, JSON.stringify(normPayload, null, 2));
console.log(JSON.stringify({ counts: { pedCases: pedCases.length, pedTopics: pedTopics.length, ov1: Object.keys(ov1).length, ov2: Object.keys(ov2).length, textFields: texts.length, glossary: glossary.length }, sourceInventory }, null, 2));
