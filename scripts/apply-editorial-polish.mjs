import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const technicalKeys = new Set([
  'id','branchId','caseId','source','sourceCaseId','seedId','contentSignature','topicSignature','generationSignature','semanticFingerprint','dedupeKey','optionSetSignature','license','type','priority','score','aiMeta','metadata','provider','generator','schemaVersion','generatedAt','sourceSeedId','sourceConceptOnly','conceptOriginHash','variantAngle','variantNo','remoteAttempt','validationWarnings','qualityGateErrors','qualityGateWarnings','caseType','originalBranchId','conceptOriginId','correctAnswer','imageUrl','sourceUrl','sourceName','modality','asset','filename','url'
]);

const labelKeys = new Set(['label','title']);
const urlKeys = new Set(['imageUrl','sourceUrl','url']);

const sectionPrefixes = [
  'Sınav incisi','Sınav notu','Sınav bilgisi','TUS notu','TUS kırmızı bayrağı','Ayırıcı nokta','Ayırt ettirici ipucu','Ayırt ettirici bulgu','Klinik gerekçe','Kanıt zinciri','Yönetim','İlk yaklaşım','Mekanizma','İlk adım','Karar verdirici ipucu','Karar verdiren ipucu','Destekleyici kanıt','Destekleyici bulgu','Ana patern','Klinik patern','Klinik yaklaşım','Olgu verisi','Ek destek','Ana kanıt','Kritik ipucu'
];
const prefixPattern = new RegExp(`^\\s*(?:${sectionPrefixes.map(escapeRegExp).join('|')})\\s*(?:[|:：\\-–—]+)\\s*`, 'iu');
const repeatedPrefixPattern = new RegExp(`^\\s*(?:${sectionPrefixes.map(escapeRegExp).join('|')})\\s+(?:${sectionPrefixes.map(escapeRegExp).join('|')})\\s*(?:[|:：\\-–—]+)?\\s*`, 'iu');

const replacements = [
  [/\bwheezing\b/giu, 'hışıltılı solunum'],
  [/\bWheezing\b/gu, 'Hışıltılı solunum'],
  [/\brash\b/giu, 'döküntü'],
  [/\bairway\b/giu, 'hava yolu'],
  [/\bsepsis\s+workup\b/giu, 'sepsis değerlendirmesi'],
  [/\bscreening\b/giu, 'tarama'],
  [/\bfollow[-\s]?up\b/giu, 'izlem'],
  [/\bmanagement\b/giu, 'yönetim'],
  [/\btrigger\b/giu, 'tetikleyici'],
  [/\bred\s+flag\b/giu, 'kırmızı bayrak'],
  [/\btripod\s+position\b/giu, 'tripod pozisyonu'],
  [/\bpattern\b/giu, 'bulgu örüntüsü'],
  [/\bErysipelas\b/giu, 'Erizipel'],
  [/\bdiffüz\b/giu, 'yaygın'],
  [/\bTUS’ta\b/gu, 'TUS’ta'],
];

const phraseReplacements = [
  [/\bbenzer seçenekleri ayıran ana patern olarak hatırlanmalıdır\b/giu, 'ayırıcı tanıda önemlidir'],
  [/\bbenzer seçenekleri ayıran ana bulgu örüntüsü olarak hatırlanmalıdır\b/giu, 'ayırıcı tanıda önemlidir'],
  [/\bdoğru seçenek verilen öğrenme hedefiyle en tutarlı yanıt eksenini oluşturur\b/giu, 'olgudaki bulgular doğru yanıta götürür'],
  [/\bdoğru seçenek verilen öğrenme hedefiyle uyumludur\b/giu, 'olgudaki bulgularla uyumludur'],
  [/\bsoru patern yorumlama becerisini ölçer\b/giu, 'ayırıcı klinik bulguların yorumlanması gerekir'],
  [/\bklinik bağlam içinde değerlendirilir\b/giu, 'öykü ve muayene bulgularıyla birlikte değerlendirilir'],
  [/\bsonuçlar tek bir tanı adını yazmaz\b/giu, 'sonuçlar öykü ve muayene ile birlikte yorumlanır'],
  [/\böğrenci bu ayrımı yapmalıdır\b/giu, 'bu ayrım klinik kararı belirler'],
  [/\bverilen öğrenme hedefi\b/giu, 'bu klinik bilgi'],
  [/\bekseninde değerlendirilmelidir\b/giu, 'birlikte değerlendirilmelidir'],
  [/\bana karar tek öğrenme hedefine dayanır\b/giu, 'karar olgudaki temel bulgulara dayanır'],
  [/\bbu veri klinik olarak anlam kazanır\b/giu, 'bu bulgu klinik kararı destekler'],
  [/\bmevcut tabloda yüksek tanısal değer taşır\b/giu, 'bu tabloda tanısal değeri yüksektir'],
  [/\bbelirli klinik koşullarda doğru olabilir;?\s*/giu, 'uygun klinik koşullarda düşünülebilir. '],
  [/\bBu nedenle en iyi yanıt\.?\s*/giu, ''],
  [/\bBu nedenle en uygun yanıt\.?\s*/giu, ''],
  [/\bdoğru yanıt\s+([^.]*)\s+olmalıdır\.?/giu, 'en uygun yanıt $1 olur.'],
];

function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function fixUrl(value) {
  return String(value || '')
    .replace(/^https:\s*\/\//i, 'https://')
    .replace(/^http:\s*\/\//i, 'http://')
    .replace(/\.\s+([A-Za-z0-9])/g, '.$1')
    .replace(/FilePath\s+veya\s+/i, 'FilePath/');
}

function cleanupPunctuation(value) {
  let text = value
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .replace(/(?<!\d)\.(?=\S)/g, '. ')
    .replace(/\s*\|\s*/g, '. ')
    .replace(/\s*;\s*/g, '. ')
    .replace(/\s*–\s*/g, '–')
    .replace(/\s*—\s*/g, '—')
    .replace(/\.{2,}|…/g, '')
    .replace(/\bve\s+ve\b/giu, 've')
    .replace(/\s+([.)])/g, '$1')
    .replace(/\(\s+/g, '(')
    .replace(/\s{2,}/g, ' ')
    .trim();
  // Do not alter range dashes, but normalize long prose dashes used as label separators.
  text = text.replace(/\s[-–—]\s/g, '. ');
  text = text.replace(/\.\s*\.\s*/g, '. ');
  return text.trim();
}

function sentenceCaseFix(value) {
  return value
    .replace(/\bOrofarengial\b/g, 'Orofarengeal')
    .replace(/\borofarengial\b/g, 'orofarengeal')
    .replace(/\bbronsiolit\b/giu, 'bronşiolit')
    .replace(/\bbronşiolitik\b/giu, 'bronşiolitik')
    .replace(/\bKrup genellikle havlar tarzda öksürük ve daha yavaş başlangıç gösterir ayırıcı tanıda önemlidir\.?/giu, 'Krup genellikle havlar tarzda öksürük, ses kısıklığı ve daha yavaş başlangıçla seyreder. Epiglottitte toksik görünüm, yüksek ateş, salya akması ve tripod pozisyonu daha belirgindir.')
    .replace(/\bEpiglottitte ajitasyon ve gereksiz manipülasyon obstrüksiyonu artırabilir\.?/giu, 'Epiglottitte boğaz muayenesi için gereksiz manipülasyon yapılması hava yolu obstrüksiyonunu artırabilir. Öncelik hava yolunu güvenceye almaktır.')
    .replace(/\bEpiglottitte ajitasyon ve gereksiz orofarengeal manipülasyon obstrüksiyonu artırabilir\.?/giu, 'Epiglottitte ajitasyon ve gereksiz orofarengeal manipülasyon hava yolu obstrüksiyonunu artırabilir.');
}

function normalizeMedicalTurkishString(input, key = '') {
  if (input == null) return input;
  let value = String(input);
  if (urlKeys.has(key)) return fixUrl(value);
  if (technicalKeys.has(key)) return value;

  // Keep concise UI section labels. Only repair visible text bodies aggressively.
  let text = value;
  for (const [rx, replacement] of replacements) text = text.replace(rx, replacement);
  for (const [rx, replacement] of phraseReplacements) text = text.replace(rx, replacement);

  // Remove heading repetition only inside prose, not standalone label values.
  if (!labelKeys.has(key) || text.length > 32) {
    let changed = true;
    while (changed) {
      const before = text;
      text = text.replace(repeatedPrefixPattern, '').replace(prefixPattern, '');
      changed = before !== text;
    }
  }

  text = text
    .replace(/\bKlinik patern\b/giu, 'Klinik tablo')
    .replace(/\bklinik patern\b/giu, 'klinik tablo')
    .replace(/\bpaterni\b/giu, 'bulgu örüntüsü')
    .replace(/\bpaternini\b/giu, 'bulgu örüntüsünü')
    .replace(/\bpaternin\b/giu, 'bulgu örüntüsünün')
    .replace(/\bpatern\b/giu, 'bulgu örüntüsü')
    .replace(/\bbulgu örüntüsü yorumu\b/giu, 'bulgu yorumu')
    .replace(/\bana bulgu örüntüsü\b/giu, 'ana bulgu')
    .replace(/\bkompansatuvar\b/giu, 'kompansatuvar')
    .replace(/\bbronkore\b/giu, 'bronş sekresyon artışı');

  text = cleanupPunctuation(text);
  text = sentenceCaseFix(text);

  // Avoid broken endings introduced by cleanup.
  text = text
    .replace(/\bBu nedenle en uygun seçim\s+([^.]*)\s+olur\.?$/iu, 'Bu nedenle en uygun seçim $1 olur.')
    .replace(/\bBu nedenle\s*$/iu, '')
    .replace(/\bile uyumludur ve\.?$/iu, 'ile uyumludur.')
    .replace(/\btanısını\.?$/iu, 'tanısını destekler.')
    .trim();

  return text;
}

function transform(value, key = '', stats = { strings: 0, changed: 0, headingPrefix: 0, english: 0, punctuation: 0 }) {
  if (typeof value === 'string') {
    stats.strings += 1;
    const before = value;
    const after = normalizeMedicalTurkishString(value, key);
    if (after !== before) {
      stats.changed += 1;
      if (/Sınav incisi\s*[|:]|Ayırıcı nokta\s*:|Karar verdirici ipucu|Destekleyici kanıt|Mekanizma:/iu.test(before)) stats.headingPrefix += 1;
      if (/\bwheezing\b|\brash\b|\bairway\b|\bmanagement\b|\bscreening\b|\bfollow[-\s]?up\b|\bpattern\b/iu.test(before)) stats.english += 1;
      if (/[|;]|\s[-–—]\s/.test(before)) stats.punctuation += 1;
    }
    return after;
  }
  if (Array.isArray(value)) return value.map((item) => transform(item, key, stats));
  if (value && typeof value === 'object') {
    const output = {};
    for (const [childKey, childValue] of Object.entries(value)) output[childKey] = transform(childValue, childKey, stats);
    return output;
  }
  return value;
}

function serializeConst(name, value, extra = '') {
  return `export const ${name} = ${JSON.stringify(value, null, 2)};\n${extra}`;
}

async function load(modulePath) {
  return import(pathToFileURL(path.join(root, modulePath)).href + `?t=${Date.now()}`);
}

const totals = {};

const casesModule = await load('src/data/cases.js');
const caseStats = { strings: 0, changed: 0, headingPrefix: 0, english: 0, punctuation: 0 };
const cases = transform(casesModule.cases, 'cases', caseStats);
fs.writeFileSync(path.join(root, 'src/data/cases.js'), serializeConst('cases', cases, `\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`));
totals.cases = { count: cases.length, ...caseStats };

const configs = [
  ['src/data/aiQuestionSeeds.js', 'AI_QUESTION_SEEDS'],
  ['src/data/aiBranchQuestionTemplates.js', 'AI_BRANCH_TEMPLATE_SEEDS'],
  ['src/data/aiSyntheticFallbackTemplates.js', 'AI_SYNTHETIC_FALLBACK_SEEDS'],
];
for (const [file, exportName] of configs) {
  const mod = await load(file);
  const stats = { strings: 0, changed: 0, headingPrefix: 0, english: 0, punctuation: 0 };
  const arr = transform(mod[exportName], exportName, stats);
  fs.writeFileSync(path.join(root, file), serializeConst(exportName, arr));
  totals[exportName] = { count: Array.isArray(arr) ? arr.length : 0, ...stats };
}

const report = {
  generatedAt: new Date().toISOString(),
  summary: totals,
};
fs.writeFileSync(path.join(root, 'EDITORIAL_TURKISH_POLISH_RESULT.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
