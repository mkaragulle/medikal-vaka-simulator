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

function collectNeutralFallbackCandidates(caseItem = {}) {
  const candidates = [];
  const push = (value) => {
    const text = sanitizePreAnswerText(value, caseItem, { strict: false });
    if (text && text.length >= 8 && !hasCorrectAnswerLeak(text, caseItem)) candidates.push(ensureSentence(text));
  };

  push(caseItem.chiefComplaint);
  splitSentences(caseItem.stem || '').slice(0, 3).forEach(push);
  toArray(caseItem.exam).slice(0, 6).forEach(push);
  Object.entries(caseItem.vitals || {}).forEach(([key, value]) => push(`${key}: ${value}`));
  toArray(caseItem.investigations).forEach((item) => {
    toArray(item?.findings).forEach(push);
    push(item?.summary);
    toArray(item?.rows).forEach((row) => {
      if (Array.isArray(row)) push(`${row[0]}: ${row[1]}${row[2] ? ` (referans ${row[2]})` : ''}`);
      else if (row && typeof row === 'object') push(`${row.parameter || row.label || 'Bulgular'}: ${row.value || row.result || ''}${row.reference ? ` (referans ${row.reference})` : ''}`);
    });
  });

  const seen = new Set();
  return candidates.filter((candidate) => {
    const key = normalizeLeakText(candidate);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function neutralTitleFor(caseItem = {}) {
  const fallbackCandidates = [
    caseItem.patientIntro?.presentation,
    caseItem.chiefComplaint,
    splitSentences(caseItem.stem || '')[0],
    'Kısa klinik karar olgusu',
  ];
  const selected = fallbackCandidates
    .map((item) => sanitizePreAnswerText(item, caseItem, { strict: false }))
    .find((item) => item && item.length >= 8 && !hasCorrectAnswerLeak(item, caseItem) && !isLeakyTitle(item, caseItem));
  return sentenceCase(selected || 'Kısa klinik karar olgusu');
}

function neutralizeObjectiveCell(value = '', caseItem = {}, fallback = 'Objektif bulgu') {
  let output = cleanMeasurementForLeakGate(value || '').replace(/\s+/g, ' ').trim();
  if (!output) return fallback;
  if (hasCorrectAnswerLeak(output, caseItem)) output = removeCorrectAnswerText(output, caseItem);
  output = output
    .replace(/\s+ile\s+uyumlu(?:dur)?\b/giu, '')
    .replace(/\s+[^,.;]{1,70}\s+uyumlu(?:dur)?\b/giu, ' ')
    .replace(/\buyumlu\s+değişiklik(?:ler)?\b/giu, 'Objektif değişiklik')
    .replace(/\b(?:lehine|destekler|d[üu]ş[üu]nd[üu]r[üu]r|kanıt\s+sağlar|kanıttır)\b.*$/giu, '')
    .replace(/\btan[ıi]y[ıi]\s+doğrular\b.*$/giu, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/[.;:,\s]+$/u, '')
    .trim();
  if (!output || hasCorrectAnswerLeak(output, caseItem) || hasInterpretiveLeak(output, { strict: true })) return fallback;
  return output;
}

function sanitizePreAnswerArray(items = [], caseItem = {}, fallback = [], minItems = 2) {
  const seen = new Set();
  const output = [];
  const push = (item, strict = true) => {
    const text = sanitizePreAnswerText(itemToText(item), caseItem, { strict });
    if (!text || text.length < 6) return;
    if (hasInterpretiveLeak(text, { strict: true }) || hasCorrectAnswerLeak(text, caseItem)) return;
    const key = normalizeLeakText(text);
    if (seen.has(key)) return;
    seen.add(key);
    output.push(ensureSentence(text));
  };
  toArray(items).forEach((item) => push(item, true));
  if (output.length < minItems) fallback.forEach((item) => push(item, false));
  return output.slice(0, 4);
}

function sanitizeRows(rows = [], caseItem = {}) {
  return toArray(rows).map((row) => {
    const cells = Array.isArray(row)
      ? row
      : [row?.parameter, row?.value, row?.reference, row?.note || row?.interpretation];
    const [parameter, value, reference, note] = cells;
    const cleanNote = sanitizePreAnswerText(note, caseItem, { strict: true, field: 'row.note' });
    const rawNote = cleanMeasurementForLeakGate(note || '');
    const safeRawNote = rawNote
      && !hasCorrectAnswerLeak(rawNote, caseItem)
      && !hasInterpretiveLeak(rawNote, { strict: true })
      ? rawNote
      : '';
    return [
      cleanMeasurementForLeakGate(parameter || ''),
      neutralizeObjectiveCell(value || '', caseItem, cleanMeasurementForLeakGate(value || '') || 'Objektif bulgu'),
      neutralizeObjectiveCell(reference || '—', caseItem, '—'),
      cleanNote || safeRawNote || 'Objektif sonuç',
    ];
  });
}

function sanitizeInvestigationItem(item = {}, caseItem = {}) {
  const sanitized = { ...item };
  const rowFallback = toArray(item.rows).map((row) => Array.isArray(row) ? `${row[0]}: ${row[1]}` : `${row?.parameter || ''}: ${row?.value || ''}`);
  sanitized.summary = sanitizePreAnswerText(item.summary, caseItem, { strict: true, field: 'investigation.summary' })
    || sanitizePreAnswerArray(rowFallback, caseItem, [], 1)[0]
    || '';
  sanitized.findings = sanitizePreAnswerArray(item.findings || [], caseItem, rowFallback, 0);
  sanitized.interpretation = '';
  sanitized.clinicalMeaning = '';
  if (item.rows) sanitized.rows = sanitizeRows(item.rows, caseItem);
  if (item.result?.values || item.result?.rows) {
    sanitized.result = {
      ...item.result,
      summary: sanitizePreAnswerText(item.result.summary || item.summary, caseItem, { strict: true, field: 'investigation.result.summary' }) || sanitized.summary,
      interpretation: '',
      rows: sanitizeRows(item.result.values || item.result.rows, caseItem),
    };
  }
  return sanitized;
}

function sanitizeImageItem(image = {}, caseItem = {}) {
  return {
    ...image,
    caption: sanitizePreAnswerText(image.caption, caseItem, { strict: true, field: 'image.caption' }) || 'Görsel materyalde objektif bulgular değerlendirilir.',
    relatedFinding: sanitizePreAnswerText(image.relatedFinding, caseItem, { strict: true, field: 'image.relatedFinding' }) || '',
  };
}

function repairPostAnswerFeedback(caseItem = {}) {
  const repaired = caseItem;
  const correct = getCorrectAnswerText(caseItem);
  const feedback = repaired.diagnosis?.answerFeedback || repaired.answerFeedback || {};
  const pearls = [];
  const addPearl = (value) => {
    if (!value) return;
    if (typeof value === 'string') pearls.push(fixDimerUnitText(value));
    else if (value.text || value.label) pearls.push({ ...value, text: fixDimerUnitText(value.text || value.summary || '') });
  };
  toArray(repaired.__preAnswerTeaching).forEach(addPearl);
  toArray(repaired.spotPearl || repaired.spotPearlText || repaired.examPearl).forEach(addPearl);
  toArray(repaired.examPearls).forEach(addPearl);
  toArray(repaired.diagnosis?.pearls).forEach(addPearl);
  toArray(feedback.pearls).forEach(addPearl);

  const answerFeedback = {
    ...feedback,
    pearls: pearls.length ? pearls : feedback.pearls,
    clinicalPearls: toArray(feedback.clinicalPearls).map((item) => (typeof item === 'string' ? fixDimerUnitText(item) : { ...item, text: fixDimerUnitText(item.text || item.summary || '') })),
  };

  if (!answerFeedback.spotPearl && pearls.length) {
    const first = pearls[0];
    answerFeedback.spotPearl = typeof first === 'string' ? first : first.text || '';
  }
  if (!answerFeedback.whyCorrect && repaired.explanation) answerFeedback.whyCorrect = repaired.explanation;
  if (correct && answerFeedback.whyCorrect && !normalizeLeakText(answerFeedback.whyCorrect).includes(normalizeLeakText(correct))) {
    answerFeedback.whyCorrect = `${answerFeedback.whyCorrect} Bu nedenle en uygun yanıt ${correct} seçeneğidir.`;
  }

  repaired.diagnosis = {
    ...(repaired.diagnosis || {}),
    explanation: fixDimerUnitText(repaired.diagnosis?.explanation || repaired.explanation || ''),
    pearls: toArray(repaired.diagnosis?.pearls).map((item) => (typeof item === 'string' ? fixDimerUnitText(item) : { ...item, text: fixDimerUnitText(item.text || item.summary || '') })),
    answerFeedback,
  };
  return repaired;
}

export function repairAnswerLeakage(caseItem = {}) {
  const repaired = deepClone(caseItem);
  const fallback = collectNeutralFallbackCandidates(repaired);
  repaired.__preAnswerTeaching = [
    repaired.spotPearl,
    repaired.spotPearlText,
    repaired.examPearl,
    repaired.examTrap,
    ...(toArray(repaired.examMeta?.spotPearl)),
    ...(toArray(repaired.examMeta?.examTrap)),
  ].filter(Boolean);

  repaired.title = isLeakyTitle(repaired.title, repaired)
    ? neutralTitleFor(repaired)
    : (sanitizePreAnswerText(repaired.title, repaired, { strict: false, field: 'title' }) || neutralTitleFor(repaired));
  repaired.clinicalFocus = 'Klinik verileri önceliklendirerek karar verme pratiği.';
  repaired.learningTarget = 'Klinik verileri yorumlama.';

  const intro = repaired.patientIntro || {};
  repaired.patientIntro = {
    ...intro,
    profile: sanitizePreAnswerText(intro.profile || [repaired.demographics, repaired.setting].filter(Boolean).join(' · '), repaired, { strict: false }) || [repaired.demographics, repaired.setting].filter(Boolean).join(' · '),
    presentation: sanitizePreAnswerText(intro.presentation || repaired.chiefComplaint || repaired.title, repaired, { strict: false }) || repaired.title || 'Klinik başvuru',
    riskContext: sanitizePreAnswerArray(intro.riskContext || [], repaired, fallback, 1),
    distinctiveClues: sanitizePreAnswerArray(intro.distinctiveClues || [], repaired, fallback, 2),
    historySummary: sanitizePreAnswerText(intro.historySummary || repaired.stem || fallback[0], repaired, { strict: true }) || fallback.slice(0, 2).filter((item) => !hasInterpretiveLeak(item, { strict: true })).join(' '),
    priorityFocus: undefined,
  };

  if (isLeakyTitle(repaired.title, repaired)) repaired.title = 'Kısa klinik karar olgusu';
  if (hasCorrectAnswerLeak(repaired.patientIntro.presentation, repaired) || hasInterpretiveLeak(repaired.patientIntro.presentation, { strict: true })) {
    repaired.patientIntro.presentation = repaired.title || 'Klinik başvuru';
  }
  repaired.chiefComplaint = sanitizePreAnswerText(repaired.chiefComplaint, repaired, { strict: false }) || repaired.patientIntro.presentation || repaired.title;
  if (hasCorrectAnswerLeak(repaired.chiefComplaint, repaired) || hasInterpretiveLeak(repaired.chiefComplaint, { strict: true })) {
    repaired.chiefComplaint = repaired.patientIntro.presentation || repaired.title || 'Klinik başvuru';
  }
  repaired.stem = sanitizePreAnswerText(repaired.stem, repaired, { strict: false }) || repaired.patientIntro.historySummary;
  repaired.exam = toArray(repaired.exam).map((item) => sanitizePreAnswerText(item, repaired, { strict: false })).filter(Boolean);
  repaired.history = toArray(repaired.history).map((item) => sanitizePreAnswerText(item, repaired, { strict: false })).filter(Boolean);
  repaired.investigations = toArray(repaired.investigations).map((item) => sanitizeInvestigationItem(item, repaired));
  if (Array.isArray(repaired.availableInvestigations)) {
    repaired.availableInvestigations = repaired.availableInvestigations.map((item) => sanitizeInvestigationItem(item, repaired));
  }
  repaired.images = toArray(repaired.images).map((image) => sanitizeImageItem(image, repaired));
  repaired.findings = {
    ...(repaired.findings || {}),
    history: [repaired.patientIntro.historySummary].filter(Boolean),
    exam: repaired.exam,
    vitals: repaired.vitals || repaired.findings?.vitals || {},
    investigations: repaired.investigations,
  };

  // Force all teaching/exam-signal content to be post-answer only. The UI reads these through diagnosis.answerFeedback.
  delete repaired.spotPearl;
  delete repaired.spotPearlText;
  delete repaired.examPearl;
  delete repaired.examTrap;
  delete repaired.tusSign;
  delete repaired.keyWords;
  delete repaired.keywords;
  if (repaired.examMeta) {
    repaired.examMeta = {
      ...repaired.examMeta,
      spotPearl: undefined,
      examTrap: undefined,
      keywords: [],
    };
  }

  const postAnswerRepaired = repairPostAnswerFeedback(repaired);
  delete postAnswerRepaired.__preAnswerTeaching;
  return postAnswerRepaired;
}

export function collectPreAnswerTexts(caseItem = {}, options = {}) {
  const rows = [];
  const ignorePostAnswerTeachingFields = Boolean(options.ignorePostAnswerTeachingFields);
  PREANSWER_TEXT_PATHS.forEach((path) => {
    const pathKey = path.join('.');
    if (ignorePostAnswerTeachingFields && /^(?:spotPearl|spotPearlText|examPearl|examTrap|tusSign|keyWords|keywords|examMeta)/i.test(pathKey)) return;
    const value = getPathValue(caseItem, path);
    const collect = (entry, suffix = '') => {
      if (entry === undefined || entry === null) return;
      if (Array.isArray(entry)) {
        entry.forEach((child, index) => collect(child, `${suffix}[${index}]`));
        return;
      }
      if (typeof entry === 'object') {
        Object.entries(entry).forEach(([key, child]) => {
          if (/^(?:imageUrl|sourceUrl|url|src|href|creditUrl)$/i.test(key)) return;
          collect(child, suffix ? `${suffix}.${key}` : key);
        });
        return;
      }
      const text = String(entry || '').trim();
      if (text) rows.push({ path: `${path.join('.')}${suffix ? `.${suffix}` : ''}`, text });
    };
    collect(value);
  });
  return rows;
}

export function runAnswerLeakageGate(caseItem = {}, options = {}) {
  const errors = [];
  const warnings = [];
  const texts = collectPreAnswerTexts(caseItem, options);
  texts.forEach(({ path, text }) => {
    const isQuestionPath = /(^|\.)question$/.test(path);
    const strictPath = isStrictPreAnswerPath(path);
    if (path === 'title' && isLeakyTitle(text, caseItem)) errors.push(`title-leak:${text}`);
    if (hasCorrectAnswerLeak(text, caseItem) && (!isQuestionPath || isDiagnosisQuestion(caseItem))) {
      errors.push(`hard-leak:${path}:${text.slice(0, 120)}`);
    }
    if (strictPath && hasInterpretiveLeak(text, { strict: true })) {
      errors.push(`soft-leak:${path}:${text.slice(0, 120)}`);
    } else if (hasInterpretiveLeak(text, { strict: false })) {
      warnings.push(`possible-teaching-text:${path}:${text.slice(0, 120)}`);
    }
    if (/D\s*-\s*dimer/i.test(text) && /(µg\/mL\s*ng\/mL|ng\/mL\s*µg\/mL|ng\/mL\s*ng\/mL\s*FEU|µg\/mL\s*µg\/mL\s*FEU)/i.test(text)) {
      errors.push(`unit-leak:${path}:${text.slice(0, 120)}`);
    }
  });

  return {
    ok: errors.length === 0,
    errors: Array.from(new Set(errors)),
    warnings: Array.from(new Set(warnings)),
    checkedTextCount: texts.length,
  };
}

export function validateCaseBeforeInsert(caseItem = {}) {
  const repaired = repairAnswerLeakage(caseItem);
  const leakage = runAnswerLeakageGate(repaired);
  const errors = [...leakage.errors];
  const options = repaired.diagnosis?.options || repaired.options?.map((option) => option.text) || [];
  if (options.length < 4) errors.push('option-quality:en az 4 güçlü seçenek gerekli');
  if (!getCorrectAnswerText(repaired)) errors.push('schema:doğru cevap eksik');
  return {
    ok: errors.length === 0,
    caseItem: repaired,
    errors,
    warnings: leakage.warnings,
  };
}

export function sanitizeEmbeddedCasesForPreAnswer(cases = []) {
  return cases.map((caseItem) => repairAnswerLeakage(caseItem));
}

export function summarizeLeakageScan(cases = []) {
  const summary = {
    totalCases: cases.length,
    casesWithLeakage: 0,
    titleLeakage: 0,
    spotPreAnswerLeakage: 0,
    investigationInterpretationLeakage: 0,
    hardLeakage: 0,
    softLeakage: 0,
    unitIssues: 0,
    details: [],
  };

  cases.forEach((caseItem) => {
    const gate = runAnswerLeakageGate(caseItem);
    if (!gate.ok) summary.casesWithLeakage += 1;
    const detail = { id: caseItem.id, title: caseItem.title, errors: gate.errors, warnings: gate.warnings };
    gate.errors.forEach((error) => {
      if (/title-leak|hard-leak:title/.test(error)) summary.titleLeakage += 1;
      if (/spotPearl|examPearl|examTrap|tusSign|keyWords|keywords|examMeta/.test(error)) summary.spotPreAnswerLeakage += 1;
      if (/investigations|availableInvestigations|findings\.investigations/.test(error)) summary.investigationInterpretationLeakage += 1;
      if (/hard-leak/.test(error)) summary.hardLeakage += 1;
      if (/soft-leak/.test(error)) summary.softLeakage += 1;
      if (/unit-leak/.test(error)) summary.unitIssues += 1;
    });
    if (detail.errors.length) summary.details.push(detail);
  });

  return summary;
}
