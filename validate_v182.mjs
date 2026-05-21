import { rawCases, cases } from './src/data/cases.js';

const branchLabels = {
  'minor-rotations': 'Küçük Stajlar',
  'internal-medicine': 'İç Hastalıkları',
  pediatrics: 'Çocuk Sağlığı ve Hastalıkları',
  'obstetrics-gynecology': 'Kadın Hastalıkları ve Doğum',
  'general-surgery': 'Genel Cerrahi',
  'medical-pharmacology': 'Tıbbi Farmakoloji',
  'medical-pathology': 'Tıbbi Patoloji',
  anatomy: 'Anatomi',
  'medical-biochemistry': 'Tıbbi Biyokimya',
  physiology: 'Fizyoloji',
  'histology-embryology': 'Histoloji ve Embriyoloji',
  'medical-microbiology': 'Tıbbi Mikrobiyoloji',
};

function validatePool(pool, label) {
  const problems = [];
  const seen = new Set();
  for (const item of pool) {
    if (!item?.id) problems.push(`${label}: missing id`);
    if (seen.has(item.id)) problems.push(`${label}: duplicate id ${item.id}`);
    seen.add(item.id);
    const options = item?.diagnosis?.options || [];
    if (!Array.isArray(options) || options.length !== 5) problems.push(`${label}:${item.id}: option count ${options.length}`);
    if (!options.includes(item?.diagnosis?.correct)) problems.push(`${label}:${item.id}: correct not in options`);
    if (item.shuffleOptions !== false) problems.push(`${label}:${item.id}: shuffleOptions not false`);
    for (const option of options) {
      const feedback = item.diagnosis?.optionFeedback?.[option]
        || item.diagnosis?.optionComparison?.[option]
        || item.diagnosis?.answerFeedback?.optionFeedback?.[option]
        || item.diagnosis?.answerFeedback?.feedbackByOption?.[option]
        || item.diagnosis?.answerFeedback?.optionComparison?.[option];
      if (!String(feedback || '').trim()) problems.push(`${label}:${item.id}: missing feedback for option ${option}`);
      if (String(feedback || '').includes('Bu seçenek için ayırt ettirici açıklama üretilemedi')) problems.push(`${label}:${item.id}: generic feedback for ${option}`);
    }
    const json = JSON.stringify(item);
    if (json.includes('[object Object]')) problems.push(`${label}:${item.id}: [object Object] found`);
    if (json.includes('Hasta öyküsü, fizik muayene ve objektif veriler birlikte değerlendirilerek en uygun klinik karar seçilir')) problems.push(`${label}:${item.id}: generic focus found`);
    if (json.includes('Klinik ipucu. Klinik ipucu')) problems.push(`${label}:${item.id}: duplicated clue label text`);
  }
  return problems;
}

const problems = [...validatePool(rawCases, 'raw'), ...validatePool(cases, 'sanitized')];
if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}

const counts = rawCases.reduce((acc, item) => {
  const branch = branchLabels[item.branchId] || item.branchId;
  acc[branch] = (acc[branch] || 0) + 1;
  return acc;
}, {});
const entries = Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'tr'));
console.log(JSON.stringify({ rawCases: rawCases.length, cases: cases.length, counts: Object.fromEntries(entries) }, null, 2));
