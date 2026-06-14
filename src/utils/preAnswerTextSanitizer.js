import { sanitizeMeasurementText } from './clinicalFormatters.js';

const TURKISH_CHAR_MAP = {
  ç: 'c', ğ: 'g', ı: 'i', i: 'i', ö: 'o', ş: 's', ü: 'u',
  Ç: 'c', Ğ: 'g', I: 'i', İ: 'i', Ö: 'o', Ş: 's', Ü: 'u',
};

const TITLE_LEAKAGE_PATTERNS = [
  /pulmoner\s+emboli/i,
  /miyokard|miyokart|stemi|nstemi|akut\s+koroner/i,
  /pn[öo]motoraks/i,
  /kardiyojenik\s+pulmoner\s+[öo]dem|pulmoner\s+[öo]dem/i,
  /aort\s+diseksiyonu|diseksiyon/i,
  /kardiyak\s+tamponad|tamponad/i,
  /perikardit/i,
  /portal\s+hipertansiyon|varis\s+kanam/i,
  /pankreatit|apandisit|menenjit/i,
  /septik\s+artrit|osteomiyelit/i,
  /diyabetik\s+ketoasidoz|\bdka\b/i,
  /hipertrofik\s+pilor\s+stenozu|pilor\s+stenozu/i,
  /kawasaki/i,
  /anafilaksi|anaf[l]?aksi/i,
  /erizipel/i,
  /hepatit\s+[abcde]|akut\s+hepatit/i,
  /hipoksik\s+iskemik\s+ensefalopati|hie/i,
  /terap[öo]tik\s+hipotermi/i,
];

const INTERPRETIVE_PATTERNS = [
  /\b(?:d[üu]ş[üu]nd[üu]r[üu]r|akla\s+getirir|destekler|lehinedir|lehine|uyumludur|uyumlu\s+olarak|tan[ıi]y[ıi]\s+doğrular|kesin\s+tan[ıi]|tan[ıi]\s+koydurur|tan[ıi]sal\s+olarak|olas[ıi]l[ıi]ğ[ıi]n[ıi]\s+art[ıi]r[ıi]r|ihtimalini\s+art[ıi]r[ıi]r)\b/iu,
  /\b(?:ilk\s+tedavi|ilk\s+yakla[şs][ıi]m|tedavi\s+[öo]nceliği|başlanmal[ıi]|başla(?:n[ıi]r|nmal[ıi])|reperf[üu]zyon|tromboliz|antikoag[üu]lasyon|adrenalin|epinefrin)\b/iu,
  /\b(?:karar\s+verdirici|ana\s+ipucu|kritik\s+ipucu|s[ıi]nav\s+incisi|s[ıi]nav\s+notu|spot\s+bilgi|tus\s+k[ıi]rm[ıi]z[ıi]\s+bayrağ[ıi])\b/iu,
  /\b(?:bu\s+bulgu\s+.*(?:g[öo]sterir|destekler|d[üu]ş[üu]nd[üu]r[üu]r)|bu\s+değer\s+.*(?:destekler|d[üu]ş[üu]nd[üu]r[üu]r)|bu\s+patern\s+.*(?:destekler|d[üu]ş[üu]nd[üu]r[üu]r))\b/iu,
];

const SOFT_PATTERNS_FOR_SUMMARY_ONLY = [
  /\b(?:ile\s+uyumlu|uyumlu)\b/iu,
  /\b(?:g[öo]sterir|g[öo]steren|kanıt\s+sağlar|kanıttır)\b/iu,
];

const PREANSWER_TEXT_PATHS = [
  ['title'], ['subtitle'], ['clinicalFocus'], ['learningTarget'], ['chiefComplaint'], ['stem'], ['question'],
  ['patientIntro', 'profile'], ['patientIntro', 'presentation'], ['patientIntro', 'riskContext'],
  ['patientIntro', 'distinctiveClues'], ['patientIntro', 'historySummary'], ['patientIntro', 'priorityFocus'],
  ['spotPearl'], ['spotPearlText'], ['examPearl'], ['examTrap'], ['tusSign'], ['keyWords'], ['keywords'],
  ['examMeta', 'spotPearl'], ['examMeta', 'keywords'], ['examMeta', 'examTrap'],
  ['investigations'], ['availableInvestigations'], ['findings', 'investigations'], ['images'],
];

const STRICT_PREANSWER_PATH_PATTERNS = [
  /title/i,
  /subtitle/i,
  /patientIntro\.riskContext/i,
  /patientIntro\.distinctiveClues/i,
  /patientIntro\.historySummary/i,
  /patientIntro\.priorityFocus/i,
  /clinicalFocus/i,
  /learningTarget/i,
  /spotPearl|examPearl|examTrap|tusSign|keyWords|keywords|examMeta/i,
  /investigations|availableInvestigations|findings\.investigations|images/i,
];

function deepClone(value) {
  return JSON.parse(JSON.stringify(value || {}));
}

export function normalizeLeakText(value = '') {
  return String(value || '')
    .replace(/[ÇĞIİÖŞÜçğıiöşü]/g, (char) => TURKISH_CHAR_MAP[char] || char)
    .toLocaleLowerCase('tr')
    .replace(/[^a-z0-9µ%/.-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeRegExp(value = '') {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function toArray(value) {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

function itemToText(value) {
  if (value === undefined || value === null) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) return value.map(itemToText).filter(Boolean).join(' | ');
  if (typeof value === 'object') {
    return [
      value.title,
      value.label,
      value.parameter,
      value.value,
      value.reference,
      value.note,
      value.summary,
      value.findings,
      value.interpretation,
      value.caption,
      value.relatedFinding,
      value.text,
      value.description,
      value.explanation,
    ].map(itemToText).filter(Boolean).join(' | ');
  }
  return String(value || '');
}

function getPathValue(source, path = []) {
  return path.reduce((current, key) => (current && current[key] !== undefined ? current[key] : undefined), source);
}

function setPathValue(source, path = [], value) {
  if (!path.length) return;
  let current = source;
  path.slice(0, -1).forEach((key) => {
    if (!current[key] || typeof current[key] !== 'object') current[key] = {};
    current = current[key];
  });
  current[path[path.length - 1]] = value;
}

function optionTextById(caseItem = {}, optionId = '') {
  const options = Array.isArray(caseItem.options) ? caseItem.options : [];
  const match = options.find((option) => String(option?.id || '').toUpperCase() === String(optionId || '').toUpperCase());
  return match?.text || '';
}

export function getCorrectAnswerText(caseItem = {}) {
  return caseItem.diagnosis?.correct
    || optionTextById(caseItem, caseItem.correctAnswer)
    || caseItem.correctConcept
    || '';
}

function correctAnswerVariants(caseItem = {}) {
  const correct = getCorrectAnswerText(caseItem);
  const variants = new Set();
  const add = (value) => {
    const normalized = normalizeLeakText(value).replace(/^[.\s]+|[.\s]+$/g, '');
    if (normalized && normalized.length >= 3) variants.add(normalized);
  };
  add(correct);
  String(correct || '')
    .split(/[()/,;]|\s+ve\s+|\s+veya\s+/iu)
    .map((part) => part.trim())
    .filter((part) => part.length >= 5)
    .forEach(add);

  const normalized = normalizeLeakText(correct).replace(/^[.\s]+|[.\s]+$/g, '');
  const synonymMap = {
    'akut pulmoner emboli': ['pulmoner emboli', 'emboli'],
    'pulmoner emboli': ['akut pulmoner emboli', 'pulmoner tromboemboli', 'pte'],
    'pulmoner tromboemboli': ['pulmoner emboli', 'akut pulmoner emboli', 'pte'],
    'antikoagulasyon baslanmasi': ['antikoagulasyon', 'heparin', 'lmwh', 'dusuk molekul agirlikli heparin'],
    'dusuk molekul agirlikli heparin': ['lmwh', 'heparin', 'antikoagulasyon'],
    'terapotik hipotermi': ['hipotermi', 'noroprotektif tedavi'],
    'adrenalin': ['epinefrin'],
    'epinefrin': ['adrenalin'],
    'akut hepatit a': ['hepatit a'],
  };
  Object.entries(synonymMap).forEach(([key, values]) => {
    if (normalized.includes(key)) values.forEach(add);
  });

  return Array.from(variants).sort((a, b) => b.length - a.length);
}

export function hasCorrectAnswerLeak(text = '', caseItem = {}) {
  const normalizedText = normalizeLeakText(text);
  if (!normalizedText) return false;
  return correctAnswerVariants(caseItem).some((variant) => {
    if (variant.length <= 4) return normalizedText === variant || normalizedText.split(' ').includes(variant);
    return normalizedText.includes(variant);
  });
}

function hasInterpretiveLeak(text = '', { strict = true } = {}) {
  const source = String(text || '');
  if (!source.trim()) return false;
  const patterns = strict ? [...INTERPRETIVE_PATTERNS, ...SOFT_PATTERNS_FOR_SUMMARY_ONLY] : INTERPRETIVE_PATTERNS;
  return patterns.some((pattern) => pattern.test(source));
}

function isStrictPreAnswerPath(path = '') {
  return STRICT_PREANSWER_PATH_PATTERNS.some((pattern) => pattern.test(path));
}

function isDiagnosisQuestion(caseItem = {}) {
  const questionText = `${caseItem.question || ''} ${caseItem.diagnosis?.question || ''} ${caseItem.questionType || ''}`;
  return /tan[ıi]|olası|a[çc][ıi]klayan|hangi\s+tan[ıi]|diagnosis/iu.test(questionText) || caseItem.questionType === 'diagnosis';
}

function isLeakyTitle(title = '', caseItem = {}) {
  if (!title) return false;
  const questionText = `${caseItem.question || ''} ${caseItem.questionType || ''}`;
  const titleHasDiseaseLikeTerm = TITLE_LEAKAGE_PATTERNS.some((pattern) => pattern.test(title));
  const titleHasCorrect = hasCorrectAnswerLeak(title, caseItem);
  const asksDecisionAfterDiagnosis = /tedavi|y[öo]netim|ilk|test|tetkik|yakla[şs][ıi]m|mekanizma/i.test(questionText);
  return titleHasCorrect
    || (titleHasDiseaseLikeTerm && asksDecisionAfterDiagnosis)
    || /\b(?:tedavi|y[öo]netim)\b|tan[ıi]s[ıi]$/iu.test(title);
}

function fixDimerUnitText(value = '') {
  return String(value || '')
    .replace(/D\s*-\s*dimer/giu, 'D-dimer')
    .replace(/(\d+(?:[.,]\d+)?)\s*µg\/mL\s*ng\/mL\s*FEU/giu, '$1 µg/mL FEU')
    .replace(/(\d+(?:[.,]\d+)?)\s*ng\/mL\s*µg\/mL\s*FEU/giu, '$1 ng/mL FEU')
    .replace(/(\d+(?:[.,]\d+)?)\s*ng\/mL\s*ng\/mL\s*FEU/giu, '$1 ng/mL FEU')
    .replace(/(\d+(?:[.,]\d+)?)\s*µg\/mL\s*µg\/mL\s*FEU/giu, '$1 µg/mL FEU')
    .replace(/(ng\/mL\s*FEU)(?:\s*\(referans\s*<\s*500\s*ng\/mL\s*FEU;?\s*y[üu]ksek\))?\s*\1/giu, '$1')
    .replace(/\(referans\s*<\s*500\s*ng\/mL\s*FEU;?\s*y[üu]ksek\)\s*ng\/mL\s*FEU\s*\(referans\s*<\s*500\s*ng\/mL\s*FEU;?\s*y[üu]ksek\)/giu, '(referans <500 ng/mL FEU; yüksek)')
    .replace(/(D-dimer:\s*\d+)\.\s+(\d{3}\s*ng\/mL\s*FEU)/giu, '$1.$2')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanMeasurementForLeakGate(value = '') {
  return fixDimerUnitText(sanitizeMeasurementText(fixDimerUnitText(value || '')));
}

function splitSentences(text = '') {
  const protectedText = String(text || '').replace(/(\d)\.\s?(\d)/g, '$1§DOT§$2');
  const parts = protectedText.match(/[^.!?]+[.!?]?/g) || [protectedText];
  return parts.map((part) => part.replace(/§DOT§/g, '.').trim()).filter(Boolean);
}

function sentenceCase(value = '') {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (!text) return '';
  return text.charAt(0).toLocaleUpperCase('tr') + text.slice(1).replace(/[.;:]+$/u, '');
}

function ensureSentence(value = '') {
  const text = sentenceCase(value);
  if (!text) return '';
  return /[.!?]$/u.test(text) ? text : `${text}.`;
}

function removeCorrectAnswerText(text = '', caseItem = {}) {
  let output = String(text || '');
  const correct = getCorrectAnswerText(caseItem);
  const rawVariants = [correct]
    .concat(String(correct || '').split(/[()/,;]|\s+ve\s+|\s+veya\s+/iu))
    .filter((item) => String(item || '').trim().length >= 5);
  rawVariants.forEach((variant) => {
    output = output.replace(new RegExp(escapeRegExp(variant), 'giu'), '');
  });
  return output
    .replace(/\s+[,.;:]/g, (match) => match.trim())
    .replace(/^[,.;:–\-\s]+|[,.;:–\-\s]+$/gu, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export function sanitizePreAnswerText(text = '', caseItem = {}, options = {}) {
  const field = options.field || '';
  const strict = options.strict ?? true;
  let value = cleanMeasurementForLeakGate(String(text || '')).replace(/\s+/g, ' ').trim();
  if (!value) return '';

  if (field === 'title' && isLeakyTitle(value, caseItem)) {
    return '';
  }

  if (hasCorrectAnswerLeak(value, caseItem)) {
    value = removeCorrectAnswerText(value, caseItem);
  }

  const sentences = splitSentences(value)
    .map((sentence) => sentence.trim())
    .filter((sentence) => {
      if (!sentence) return false;
      if (hasCorrectAnswerLeak(sentence, caseItem)) return false;
      if (hasInterpretiveLeak(sentence, { strict })) return false;
      return true;
    });

  if (!sentences.length && hasInterpretiveLeak(value, { strict })) return '';
  const output = sentences.length ? sentences.join(' ') : value;
  if (hasCorrectAnswerLeak(output, caseItem)) return '';
  if (strict && hasInterpretiveLeak(output, { strict: true })) return '';
  return output.replace(/\s{2,}/g, ' ').trim();
}

