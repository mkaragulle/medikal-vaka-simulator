import { cases } from './src/data/cases.js';
const newCases = cases.filter(c => c.id.startsWith('pdf-'));
const errors = [];
for (const c of newCases) {
  if (!c.id || !c.title || !c.branchId) errors.push(`${c.id}: missing core field`);
  if (!c.diagnosis?.correct) errors.push(`${c.id}: missing correct`);
  if (!Array.isArray(c.diagnosis?.options) || c.diagnosis.options.length !== 5) errors.push(`${c.id}: options != 5`);
  if (!c.diagnosis.options.includes(c.diagnosis.correct)) errors.push(`${c.id}: correct missing from options`);
  if (!c.chiefComplaint || /Lökosit|Troponin|grafi|IgM|BT/.test(c.chiefComplaint)) errors.push(`${c.id}: chief complaint suspicious`);
  if (c.exam?.some(x => /mg\/dL|mEq|troponin|grafi|BT|MR|lökosit|CRP|IgM/i.test(x))) errors.push(`${c.id}: exam contains lab/imaging`);
  if (!Array.isArray(c.investigations) || c.investigations.length < 1) errors.push(`${c.id}: no investigations`);
  const feedback = c.diagnosis.answerFeedback || {};
  if (!feedback.whyCorrect || !feedback.evidenceChain?.length || !feedback.pearls?.length) errors.push(`${c.id}: feedback incomplete`);
}
const ids = new Map();
for (const c of cases) ids.set(c.id, (ids.get(c.id)||0)+1);
for (const [id,count] of ids) if (count > 1) errors.push(`duplicate id ${id}`);
const titles = new Map();
for (const c of newCases) titles.set(c.title, (titles.get(c.title)||0)+1);
for (const [title,count] of titles) if (count > 1) errors.push(`duplicate new title ${title}`);
console.log(JSON.stringify({ totalCases: cases.length, newCases: newCases.length, errors }, null, 2));
if (errors.length) process.exit(1);
