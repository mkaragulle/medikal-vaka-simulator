import { sanitizeMeasurementText } from './clinicalFormatters.js';

const GENERIC_PREANSWER_PHRASES = [
  /spot bilgi[^.?!]*(?:[.?!]|$)/giu,
  /tus işareti[^.?!]*(?:[.?!]|$)/giu,
  /sınav notu[^.?!]*(?:[.?!]|$)/giu,
  /kritik ipucu[^.?!]*(?:[.?!]|$)/giu,
  /ayırt ettirici ipuçları?\s*[:：-]?/giu,
  /risk bağlamı\s*[:：-]?/giu,
  /karar verdirici ipucu\s*[:：-]?/giu,
  /destekleyici kanıt\s*[:：-]?/giu,
  /klinik gerekçe\s*[:：-]?/giu,
  /kanıt zinciri\s*[:：-]?/giu,
  /neden doğru\s*[:：-]?/giu,
  /neden yanlış\s*[:：-]?/giu,
  /hasta özeti\s*[:：-]?/giu,
  /profil\s*[:：-]?/giu,
  /başvuru\s*[:：-]?/giu,
];

const GENERIC_INVESTIGATION_SENTENCES = [
  /sonuç[, ]+öykü ve muayene bulgularıyla birlikte değerlendirilir/iu,
  /klinik bağlamda değerlendirilir/iu,
  /objektif karar verisi/iu,
  /beklenen ana ipuçları/iu,
  /tanıyı destekler/iu,
  /tanısını destekler/iu,
  /tanısını doğrular/iu,
  /ile uyumludur/iu,
];

const VITAL_LABELS = ['TA', 'Nabız', 'Solunum', 'Ateş', 'SpO₂'];
const VITAL_RELEVANCE_KEYWORDS = /şok|sepsis|septik|anafilaksi|hipotansiyon|hipotansif|taşikardi|taşikardik|bradikardi|hipoksi|hipoksemi|dispne|solunum yetmezliği|ketoasidoz|dka|dehidratasyon|kanama|travma|yenidoğan|neonatal|prematüre|resüsitasyon|hemodinamik|acil|ateş|febril|menenjit|pnömoni|pulmoner emboli/iu;
const OBJECTIVE_LABEL_HINT = /lökosit|lokosit|wbc|crp|pH|ph|hco₃|hco3|laktat|glukoz|sodyum|potasyum|kreatinin|troponin|d-dimer|d dimer|platelet|trombosit|hemoglobin|alt|ast|bilirubin|kültür|kultur|oksidaz|dnaz|gram|seroloji|igg|igm|hbsag|hbeag|hbv|anti|pcr|gaz|ultrasonografi|usg|grafi|bt|mr|histoloji|patoloji|ana|anca|dsdna|c3|c4|tsh|t4|t3/iu;

const TITLE_FALLBACK_BY_TYPE = {
  diagnosis: 'Klinik olgu yorumu',
  treatment: 'İlk yaklaşım kararı',
  test: 'Tetkik verisi yorumu',
  mechanism: 'Mekanizma odaklı TUS sorusu',
  spot: 'TUS spot karar sorusu',
};

function baseCleanText(value = '') {
  return sanitizeMeasurementText(String(value || ''))
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .trim();
}

export function normalizeAiNarrativeText(value = '') {
  let text = baseCleanText(value);
  text = text
    .replace(/\b(\d{1,2})\s*g\s*w\s*['’]?\s*(?:da|de|daki|deki)?\b/giu, '$1. gebelik haftasında')
    .replace(/\b(\d{1,2})\s*gw\s*['’]?\s*(?:da|de|daki|deki)?\b/giu, '$1. gebelik haftasında')
    .replace(/\b(\d{1,2})\s*haftalık\s+gestasyon/giu, '$1. gebelik haftası')
    .replace(/\b(\d{1,3})\s*gün\s+yaşındaki\b/giu, '$1 günlük')
    .replace(/\b(\d{1,3})\s+günlük\s+yaşındaki\b/giu, '$1 günlük')
    .replace(/\b(\d{1,3})\s*ay\s+yaşındaki\b/giu, '$1 aylık')
    .replace(/\b(\d{1,3})\s*yaş\s+yaşındaki\b/giu, '$1 yaşındaki')
    .replace(/(\d{1,2}\. gebelik haftasında)\s+doğmuş/giu, '$1 doğan')
    .replace(/(\d{1,2}\. gebelik haftasında doğan),\s+(\d+ günlük)/giu, '$1 $2')
    .replace(/peristaltik sesler(?:in)?\s+azalması/giu, 'barsak seslerinde azalma')
    .replace(/barsak sesleri\s+azalması/giu, 'barsak seslerinde azalma')
    .replace(/peristaltik seslerde\s+azalma/giu, 'barsak seslerinde azalma')
    .replace(/peristaltik sesler(?:in)?/giu, 'barsak sesleri')
    .replace(/\bWheezing\b/g, 'hışıltılı solunum')
    .replace(/\bwheezing\b/g, 'hışıltılı solunum')
    .replace(/\bgörü(?:\.{2,}|…)\b/giu, 'görülüyor')
    .replace(/\bgörü\.?(?=\s+(?:Vital|Fizik|Objektif|Laboratuvar|Abdominal)|$)/giu, 'görülüyor.')
    .replace(/\s*(?:\.{3}|…)\s*/g, ' ')
    .replace(/\bAbdominal ultrasonografi\s*[:：]\s*/giu, 'Abdominal görüntülemede ')
    .replace(/\bObjektif değerlendirmede\s*/giu, 'Laboratuvar değerlendirmesinde ')
    .replace(/\bVital bulgularda\s+vital bulgularda\b/giu, 'Vital bulgularda')
    .replace(/,\s*referans\s*[^,.;]+(?:,\s*(?:yüksek|düşük|normal|patolojik|pozitif|negatif|artmış|azalmış))?/giu, '')
    .replace(/;\s*referans\s*[^,.;]+(?:,\s*(?:yüksek|düşük|normal|patolojik|pozitif|negatif|artmış|azalmış))?/giu, '')
    .replace(/\b(\d+)\.\s+(?=\d{3}\b)/g, '$1.')
    .replace(/\b(\d{2})\.\s+(?=gebelik haftasında)/giu, '$1. ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return text;
}

function asText(value = '') {
  return normalizeAiNarrativeText(value);
}

function normalizeComparable(value = '') {
  return asText(value)
    .toLocaleLowerCase('tr')
    .replace(/[.,;:!?()[\]{}"'`´]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function sentenceCase(value = '') {
  const text = asText(value);
  if (!text) return '';
  return text.charAt(0).toLocaleUpperCase('tr') + text.slice(1);
}

function ensureSentence(value = '') {
  const text = sentenceCase(value).replace(/[\s,;:]+$/u, '');
  if (!text) return '';
  return /[.!?]$/u.test(text) ? text : `${text}.`;
}

function ensureQuestion(value = '') {
  const text = sentenceCase(value).replace(/[\s,;:.]+$/u, '');
  if (!text) return 'Bu olguda en uygun seçenek aşağıdakilerden hangisidir?';
  return /[?]$/u.test(text) ? text : `${text}?`;
}

function removeCorrectAnswer(text = '', correct = '') {
  const cleaned = asText(text);
  const correctText = asText(correct);
  if (!cleaned || !correctText || correctText.length < 4) return cleaned;
  const escaped = correctText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return cleaned.replace(new RegExp(escaped, 'giu'), 'etken');
}

function stripPreAnswerTeaching(value = '', correct = '') {
  let text = removeCorrectAnswer(value, correct);
  GENERIC_PREANSWER_PHRASES.forEach((pattern) => {
    text = text.replace(pattern, ' ');
  });
  text = text
    .replace(/\bdoğru yanıta götüren\b[^.?!]*(?:[.?!]|$)/giu, ' ')
    .replace(/\bbu nedenle doğru yanıt\b[^.?!]*(?:[.?!]|$)/giu, ' ')
    .replace(/\ben olası tanı .*?dır\b/giu, 'en olası seçenek değerlendirilmelidir')
    .replace(/\bbu tablo\s+[^.?!]{0,60}\s+düşündürür\b[^.?!]*(?:[.?!]|$)/giu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return normalizeAiNarrativeText(text);
}

function splitSentences(value = '') {
  const text = normalizeAiNarrativeText(value);
  if (!text) return [];
  return text
    .split(/(?<=[.!?])\s+(?=[A-ZÇĞİÖŞÜ])/u)
    .map((item) => item.trim())
    .filter(Boolean);
}

function addUniqueSentence(sentences, sentence, correct = '') {
  const clean = stripPreAnswerTeaching(ensureSentence(sentence), correct);
  if (!clean || clean.length < 8) return sentences;
  const key = normalizeComparable(clean);
  const duplicate = sentences.some((item) => {
    const itemKey = normalizeComparable(item);
    return itemKey.includes(key) || key.includes(itemKey);
  });
  if (!duplicate) sentences.push(clean);
  return sentences;
}

function normalizeDataLabel(label = '') {
  const raw = String(label || '').trim();
  if (/^spo2$/iu.test(raw)) return 'SpO₂';
  if (/^kan basıncı$/iu.test(raw)) return 'TA';
  if (/^ateş|ates$/iu.test(raw)) return 'Ateş';
  if (/^solunum sayısı$/iu.test(raw)) return 'Solunum';
  return raw;
}

function normalizeDataValue(value = '') {
  const cleaned = normalizeAiNarrativeText(value)
    .replace(/\s*\((?:referans|normal)[^)]+\)/giu, '')
    .replace(/,\s*(?:referans|normal aralık)\s*[^,.;]+/giu, '')
    .replace(/,\s*(?:yüksek|düşük|normal|patolojik|pozitif|negatif|artmış|azalmış)$/giu, '')
    .trim();
  if (/^pozitif$/iu.test(cleaned)) return 'Pozitif';
  if (/^negatif$/iu.test(cleaned)) return 'Negatif';
  return cleaned;
}

function normalizeCompactDataItem(item = {}) {
  if (typeof item === 'string') {
    const [label, ...rest] = item.split(/[:：]/u);
    return rest.length ? { label: normalizeDataLabel(label), value: normalizeDataValue(rest.join(':')) } : null;
  }
  const label = normalizeDataLabel(item.label || item.name || item.parameter || item.title || '');
  const value = normalizeDataValue(item.value || item.result || item.text || '');
  if (!label || !value) return null;
  return { label, value };
}

function uniqueCompactItems(items = [], max = 6) {
  const seen = new Set();
  const out = [];
  items.map(normalizeCompactDataItem).filter(Boolean).forEach((item) => {
    const key = normalizeComparable(`${item.label} ${item.value}`);
    if (!seen.has(key)) {
      seen.add(key);
      out.push(item);
    }
  });
  return out.slice(0, max);
}


const SEROLOGY_PARAM_PATTERN = /^(?:HBsAg|Anti-HBs|Anti-HBc(?:\s+IgM)?|HBeAg|Anti-HBe|HBV\s*DNA|Anti-HAV\s*IgM|Anti-HCV|HCV\s*RNA|HIV(?:\s*Ag\/Ab|\s*RNA)?|VDRL|RPR|ANA|Anti-dsDNA|Anti-Sm|C3|C4|IgG|IgM|IgA)$/iu;
const LAB_PARAM_PATTERN = /^(?:Lökosit|Lokosit|WBC|CRP|pH|HCO₃|HCO3|Laktat|Glukoz|Sodyum|Potasyum|Kreatinin|Üre|BUN|Troponin|D-dimer|Platelet|Trombosit|Hemoglobin|ALT|AST|Bilirubin|TSH|Serbest\s*T4|Serbest\s*T3)$/iu;
const MICRO_PARAM_PATTERN = /^(?:Oksidaz|DNaz|Gram|Kültür|Duyarlılık|Fermentasyon|Non-fermenter|PCR|Antijen|Boyama)$/iu;
const IMAGING_PARAM_PATTERN = /(?:grafi|ultrasonografi|usg|bt|mr|tomografi|görüntüleme|ekokardiyografi|eko|radyografi)/iu;

function canonicalSupportLabel(label = '') {
  return normalizeDataLabel(label)
    .replace(/^anti\s*-/iu, 'Anti-')
    .replace(/^hbsag$/iu, 'HBsAg')
    .replace(/^hbeag$/iu, 'HBeAg')
    .replace(/^hbv\s*dna$/iu, 'HBV DNA')
    .replace(/^anti\s*hbs$/iu, 'Anti-HBs')
    .replace(/^anti\s*hbc\s*igm$/iu, 'Anti-HBc IgM')
    .replace(/^anti\s*hbc$/iu, 'Anti-HBc')
    .replace(/^anti\s*hbe$/iu, 'Anti-HBe')
    .replace(/^crp$/iu, 'CRP')
    .replace(/^wbc$/iu, 'WBC')
    .replace(/^ph$/iu, 'pH')
    .replace(/^hco3$/iu, 'HCO₃')
    .replace(/^d\s*-?\s*dimer$/iu, 'D-dimer');
}

function classifySupportItem(item = {}) {
  const label = canonicalSupportLabel(item.label || '');
  const value = normalizeDataValue(item.value || '');
  const combined = `${label} ${value}`;
  if (SEROLOGY_PARAM_PATTERN.test(label) || /\b(?:pozitif|negatif)\b/iu.test(value) && /anti|hbs|hbe|hbv|hcv|hav|hiv|ana|anca|igg|igm|iga|c3|c4/iu.test(combined)) return 'serology';
  if (IMAGING_PARAM_PATTERN.test(label) || IMAGING_PARAM_PATTERN.test(value)) return 'imaging';
  if (MICRO_PARAM_PATTERN.test(label) || /oksidaz|dnaz|gram|kültür|kultur|duyarlı|dirençli|fermenter|basil|kok/iu.test(combined)) return 'microbiology';
  if (LAB_PARAM_PATTERN.test(label) || /mg\/dL|mg\/L|mmol\/L|mEq\/L|mmHg|\/mm³|µL|ng\/mL|pg\/mL|IU\/mL|log IU\/mL/iu.test(value)) return 'labs';
  return 'objective';
}

function compactDataGroupTitle(kind = 'objective') {
  if (kind === 'vitals') return 'Vital bulgular';
  if (kind === 'serology') return 'Serolojik veriler';
  if (kind === 'labs') return 'Laboratuvar verileri';
  if (kind === 'microbiology') return 'Mikrobiyoloji verileri';
  if (kind === 'imaging') return 'Görüntüleme';
  return 'Objektif veriler';
}

function extractStructuredDataFromText(value = '') {
  const text = normalizeAiNarrativeText(value);
  const items = [];
  const serologyPattern = /\b(HBsAg|Anti-HBs|Anti-HBc\s*IgM|Anti-HBc|HBeAg|Anti-HBe|HBV\s*DNA|Anti-HAV\s*IgM|Anti-HCV|HCV\s*RNA|HIV\s*Ag\/Ab|HIV\s*RNA|ANA|Anti-dsDNA|C3|C4)\s*(?:[:=]|\s+)\s*(pozitif|negatif|\d+(?:[.,]\d+)?\s*(?:log\s*IU\/mL|IU\/mL|kopya\/mL|mg\/dL|mg\/L)?|düşük|yüksek|normal)/giu;
  let match;
  while ((match = serologyPattern.exec(text))) {
    items.push({ label: canonicalSupportLabel(match[1]), value: normalizeDataValue(match[2]) });
  }

  const labPattern = /\b(Lökosit|Lokosit|WBC|CRP|pH|HCO₃|HCO3|Laktat|Glukoz|Sodyum|Potasyum|Kreatinin|Üre|Troponin|D-dimer|Platelet|Trombosit|Hemoglobin|ALT|AST|Bilirubin|TSH|Serbest\s*T4)\s*(?:[:=]|\s+)\s*([0-9]+(?:[.,][0-9]+)?(?:\.[0-9]{3})?\s*(?:\/mm³|\/µL|x10\^3\/µL|mg\/L|mg\/dL|mmol\/L|mEq\/L|IU\/L|U\/L|ng\/mL|pg\/mL|µIU\/mL|g\/dL)?)/giu;
  while ((match = labPattern.exec(text))) {
    items.push({ label: canonicalSupportLabel(match[1]), value: normalizeDataValue(match[2]) });
  }

  const microPattern = /\b(Oksidaz|DNaz)\s+(pozitif|negatif)\b/giu;
  while ((match = microPattern.exec(text))) {
    items.push({ label: canonicalSupportLabel(match[1]), value: normalizeDataValue(match[2]) });
  }
  const gram = text.match(/\b((?:non-fermenter\s+)?gram\s+(?:negatif|pozitif)\s+(?:basil|kok))\b/iu);
  if (gram) items.push({ label: 'Gram', value: normalizeDataValue(gram[1]) });
  const susceptibility = text.match(/trimetoprim[-\s]*sulfametoksazol(?:e|a)?\s+(?:ise\s+)?(?:yüksek dozda\s+)?(duyarlı)/iu);
  if (susceptibility) items.push({ label: 'Duyarlılık', value: 'TMP-SMX duyarlı' });

  return uniqueCompactItems(items, 10);
}

function removeStructuredDataFragmentsFromText(value = '', hasSupportData = false) {
  if (!hasSupportData) return value;
  let text = normalizeAiNarrativeText(value);
  text = text
    .replace(/\b(?:Laboratuvar sonuçları|Laboratuvar değerlendirmesinde|Objektif değerlendirmede)\s*[:：]?\s*.*?(?=\s+(?:Abdominal|Toraks|Akciğer|Görüntüleme|Fizik|Bu\s|Hangi\s|Aşağıdakiler)|$)/giu, ' ')
    .replace(/\b(?:Serolojik inceleme(?:de)?|Serolojide|Serolojik veriler)\s*[:：]?\s*.*?(?=\s+(?:Bu\s|Hangi\s|Aşağıdakiler|Fizik|Görüntüleme)|$)/giu, ' ')
    .replace(/\b(?:Vital bulgularda|Vital bulgularında)\s+.*?(?=\s+(?:Fizik|Laboratuvar|Abdominal|Toraks|Akciğer|Görüntüleme|Bu\s|Hangi\s|Aşağıdakiler)|$)/giu, ' ')
    .replace(/\s*(?:Serolojik incelemede|Serolojide)\s+[^.?!]*(?:HBsAg|Anti-HBs|Anti-HBc|HBeAg|Anti-HBe|HBV\s*DNA)[^.?!]*(?:saptanıyor|bildiriliyor|bulunuyor)[.?!]?/giu, ' ')
    .replace(/\bhastada\s*[.]/giu, 'hasta değerlendiriliyor.')
    .replace(/\bbaşvuran hastada\s+(Bu\s)/giu, 'başvuran hasta değerlendiriliyor. $1')
    .replace(/\bhastada\s+(Bu\s)/giu, 'hasta değerlendiriliyor. $1')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return normalizeAiNarrativeText(text);
}

function isMeaningfulVital(value = '') {
  const text = normalizeComparable(value);
  return Boolean(text) && !/^(stabil|normal|normal aralikta|normal aralıkta|afebril|yok|korunmus|korunmuş|olağan|fizyolojik)$/u.test(text);
}

function vitalLooksAbnormal(label = '', value = '') {
  const text = normalizeComparable(`${label} ${value}`);
  if (/hipotans|hipertans|taşikard|tasikard|bradikard|takipne|hipoksi|desat|febril|ateş|ates|şok|sok/.test(text)) return true;
  if (/^ta$/i.test(label) && /\b([3-9][0-9]|1[0-8][0-9])\/[0-9]{2,3}\s*mmhg\b/.test(text)) return true;
  if (/nabız|nabiz/.test(text)) {
    const n = Number.parseFloat((text.match(/\b\d+(?:\.\d+)?\b/) || [])[0]);
    if (Number.isFinite(n) && (n > 120 || n < 50)) return true;
  }
  if (/solunum/.test(text)) {
    const n = Number.parseFloat((text.match(/\b\d+(?:\.\d+)?\b/) || [])[0]);
    if (Number.isFinite(n) && n > 28) return true;
  }
  if (/ateş|ates/.test(text)) {
    const n = Number.parseFloat((text.match(/\b\d+(?:\.\d+)?\b/) || [])[0]);
    if (Number.isFinite(n) && n >= 38) return true;
  }
  if (/spo/.test(text)) {
    const n = Number.parseFloat((text.match(/\b\d+(?:\.\d+)?\b/) || [])[0]);
    if (Number.isFinite(n) && n < 95) return true;
  }
  return false;
}

function extractVitalsFromText(value = '') {
  const text = normalizeAiNarrativeText(value);
  const items = [];
  const patterns = [
    { label: 'TA', pattern: /\b(?:kan basıncı|TA)\s*(?:[:=]|\s+)\s*(\d{2,3}\s*\/\s*\d{2,3}\s*mmHg)/iu },
    { label: 'Nabız', pattern: /\b(?:nabız|kalp hızı)\s*(?:[:=]|\s+)\s*(\d{2,3}\s*\/?\s*(?:dk|dakika)?)/iu },
    { label: 'Solunum', pattern: /\b(?:solunum|solunum sayısı)\s*(?:[:=]|\s+)\s*(\d{1,3}\s*\/?\s*(?:dk|dakika)?)/iu },
    { label: 'Ateş', pattern: /\b(?:ateş|vücut sıcaklığı)\s*(?:[:=]|\s+)\s*(\d{2}(?:[.,]\d)?\s*°?\s*C)/iu },
    { label: 'SpO₂', pattern: /\b(?:SpO₂|SpO2|oksijen satürasyonu)\s*(?:[:=]|\s+)?\s*(%\s*\d{2,3}|\d{2,3}\s*%)/iu },
  ];
  patterns.forEach(({ label, pattern }) => {
    const match = text.match(pattern);
    if (match?.[1]) items.push({ label, value: normalizeDataValue(match[1].replace(/\s+\/\s+/g, '/').replace(/%\s+/g, '%')) });
  });
  return uniqueCompactItems(items, 5);
}

function shouldExposeVitals(question = {}, candidateItems = []) {
  if (Array.isArray(question.compactVitals) && question.compactVitals.length) return true;
  if (!candidateItems.length) return false;
  const bundle = normalizeAiNarrativeText([
    question.title,
    question.relatedBranch,
    question.learningTarget,
    question.questionType,
    question.chiefComplaint,
    question.narrativeStem,
    question.stem,
    question.question,
  ].filter(Boolean).join(' '));
  return VITAL_RELEVANCE_KEYWORDS.test(bundle) || candidateItems.some((item) => vitalLooksAbnormal(item.label, item.value));
}

export function getAISpotCompactVitals(question = {}) {
  const explicit = uniqueCompactItems(question.compactVitals || question.compactVitalData || [], 5);
  if (explicit.length) return explicit;
  const narrativeVitals = extractVitalsFromText(question.narrativeStem || question.primaryStem || question.stem || '');
  if (narrativeVitals.length && shouldExposeVitals(question, narrativeVitals)) return narrativeVitals;
  const vitals = question.vitals || question.findings?.vitals || {};
  const items = VITAL_LABELS
    .map((label) => ({ label, value: vitals[label] || vitals[label.replace('₂', '2')] || '' }))
    .filter((item) => isMeaningfulVital(item.value));
  return shouldExposeVitals(question, items) ? uniqueCompactItems(items, 5) : [];
}

function rowToCompactItem(row = []) {
  if (!Array.isArray(row)) return null;
  const [name, result] = row.map(asText);
  if (!name || !result) return null;
  const value = normalizeDataValue(result);
  if (!OBJECTIVE_LABEL_HINT.test(`${name} ${value}`) && !/\d/.test(value)) return null;
  return { label: name, value };
}

function findingToCompactItem(text = '') {
  const clean = normalizeAiNarrativeText(text);
  if (!clean || GENERIC_INVESTIGATION_SENTENCES.some((pattern) => pattern.test(clean))) return null;
  const colon = clean.match(/^([^:：]{2,28})[:：]\s*(.+)$/u);
  if (colon) return { label: colon[1], value: normalizeDataValue(colon[2]) };
  const lab = clean.match(/\b(lökosit|lokosit|wbc|crp|pH|ph|hco₃|hco3|laktat|glukoz|kreatinin|troponin|d-dimer|platelet|trombosit|hemoglobin)\s+([^,.;]+)/iu);
  if (lab) return { label: lab[1].replace(/^ph$/iu, 'pH'), value: normalizeDataValue(lab[2]) };
  return null;
}

export function getAISpotCompactObjectiveData(question = {}) {
  const explicit = uniqueCompactItems(question.compactObjectiveData || question.compactObjective || [], 10);
  const narrativeItems = extractStructuredDataFromText(question.narrativeStem || question.primaryStem || question.stem || question.question || '');
  const investigations = question.investigations || question.findings?.investigations || [];
  const items = [...explicit, ...narrativeItems];
  (Array.isArray(investigations) ? investigations : []).forEach((item) => {
    if (Array.isArray(item.rows)) item.rows.forEach((row) => {
      const compact = rowToCompactItem(row);
      if (compact) items.push(compact);
    });
    if (Array.isArray(item.findings)) item.findings.forEach((finding) => {
      const compact = findingToCompactItem(finding);
      if (compact) items.push(compact);
    });
    const compactSummary = findingToCompactItem(item.summary || item.result || '');
    if (compactSummary) items.push(compactSummary);
  });
  return uniqueCompactItems(items, 10);
}

export function getAISpotSupportDataGroups(question = {}) {
  const groups = [];
  const vitals = getAISpotCompactVitals(question);
  if (vitals.length) groups.push({ type: 'vitals', title: compactDataGroupTitle('vitals'), items: vitals });

  const buckets = new Map();
  getAISpotCompactObjectiveData(question).forEach((item) => {
    const normalized = {
      label: canonicalSupportLabel(item.label),
      value: normalizeDataValue(item.value),
    };
    if (!normalized.label || !normalized.value) return;
    const kind = classifySupportItem(normalized);
    if (!buckets.has(kind)) buckets.set(kind, []);
    buckets.get(kind).push(normalized);
  });

  ['serology', 'labs', 'microbiology', 'imaging', 'objective'].forEach((kind) => {
    const items = uniqueCompactItems(buckets.get(kind) || [], kind === 'serology' ? 8 : 6);
    if (items.length) groups.push({ type: kind, title: compactDataGroupTitle(kind), items });
  });

  return groups.slice(0, 4);
}

function removeDenseVitalSentences(text = '', shouldRemove = false) {
  if (!shouldRemove) return text;
  return splitSentences(text)
    .filter((sentence) => {
      const score = ['kan basıncı', 'ta ', 'nabız', 'solunum', 'ateş', 'spo'].reduce((acc, token) => acc + (normalizeComparable(sentence).includes(token.trim()) ? 1 : 0), 0);
      return !(score >= 3 || /^vital bulgularda/iu.test(sentence));
    })
    .join(' ');
}

function simplifyInlineObjectiveText(text = '') {
  return normalizeAiNarrativeText(text)
    .replace(/\bLaboratuvar değerlendirmesinde\s+([^.!?]{0,260})\s+bildiriliyor[.!?]?/giu, (_, body) => `Laboratuvar değerlendirmesinde ${body} saptanıyor.`)
    .replace(/\bObjektif değerlendirmede\s+([^.!?]{0,260})\s+bildiriliyor[.!?]?/giu, (_, body) => `Laboratuvar değerlendirmesinde ${body} saptanıyor.`)
    .replace(/\b(?:yüksek|düşük|normal|patolojik)\s*;\s*/giu, '; ')
    .replace(/\s*;\s*/g, ', ')
    .replace(/,\s*,/g, ',')
    .replace(/\s+/g, ' ')
    .trim();
}


function looksLikeDenseObjectiveSentence(sentence = '') {
  const comparable = normalizeComparable(sentence);
  const objectiveHits = ['lökosit', 'lokosit', 'crp', 'ph', 'hco', 'laktat', 'glukoz', 'troponin', 'd dimer', 'kreatinin'].reduce((acc, token) => acc + (comparable.includes(token) ? 1 : 0), 0);
  return objectiveHits >= 2 || /abdominal görüntülemede\s+lökosit/iu.test(sentence) || /^laboratuvar değerlendirmesinde/i.test(sentence) && objectiveHits >= 1;
}

function questionsLookSimilar(a = '', b = '') {
  const left = normalizeComparable(a)
    .replace(/bu olguda|bu hastada|aşağıdakilerden hangisidir|hangisidir|nedir|en olası|en uygun/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const right = normalizeComparable(b)
    .replace(/bu olguda|bu hastada|aşağıdakilerden hangisidir|hangisidir|nedir|en olası|en uygun/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!left || !right) return false;
  return left.includes(right) || right.includes(left);
}

function limitNarrativeLength(sentences = [], questionPrompt = '') {
  const prompt = ensureQuestion(questionPrompt || 'Bu olguda en uygun seçenek aşağıdakilerden hangisidir?');
  const selected = [];
  let words = 0;
  sentences.forEach((sentence) => {
    const count = sentence.split(/\s+/).filter(Boolean).length;
    if (selected.length < 5 && words + count <= 185) {
      selected.push(sentence);
      words += count;
    }
  });

  const questionIndexes = selected
    .map((sentence, index) => ({ sentence, index }))
    .filter(({ sentence }) => /\?\s*$/u.test(sentence) || /aşağıdakilerden hangisidir\??$/iu.test(sentence));

  if (questionIndexes.length > 1) {
    const keepIndex = questionIndexes[questionIndexes.length - 1].index;
    for (let index = selected.length - 1; index >= 0; index -= 1) {
      if (index !== keepIndex && (/\?\s*$/u.test(selected[index]) || /aşağıdakilerden hangisidir\??$/iu.test(selected[index]))) {
        selected.splice(index, 1);
      }
    }
  }

  const hasExistingQuestion = selected.some((sentence) =>
    /\?\s*$/u.test(sentence) ||
    /aşağıdakilerden hangisidir\??$/iu.test(sentence) ||
    questionsLookSimilar(sentence, prompt)
  );

  if (!hasExistingQuestion) {
    selected.push(prompt);
  }
  return selected;
}

function splitTusParagraphsFromSentences(sentences = []) {
  if (!sentences.length) return ['Bu olguda en uygun seçenek aşağıdakilerden hangisidir?'];
  const last = sentences[sentences.length - 1] || '';
  const hasQuestion = /\?\s*$/u.test(last) || /aşağıdakilerden hangisidir\??$/iu.test(last);
  const bodySentences = hasQuestion ? sentences.slice(0, -1) : sentences;
  const question = hasQuestion ? ensureQuestion(last) : '';
  const body = bodySentences.join(' ').trim();
  if (!body) return [question || ensureQuestion(last)];

  if (body.length < 760) {
    return [question ? `${body} ${question}`.trim() : body];
  }

  const midpoint = Math.ceil(bodySentences.length / 2);
  const first = bodySentences.slice(0, midpoint).join(' ').trim();
  const second = bodySentences.slice(midpoint).join(' ').trim();
  const paragraphs = [first, question ? `${second} ${question}`.trim() : second].filter(Boolean);
  return paragraphs.slice(0, 2);
}

export function buildSafeAISpotTitle(question = {}) {
  const correct = question.diagnosis?.correct || question.correctAnswerText || '';
  const originalTitle = asText(question.title || '');
  const comparableOriginalTitle = normalizeComparable(originalTitle);
  const comparableCorrect = normalizeComparable(correct);
  const rawTitle = stripPreAnswerTeaching(originalTitle, correct);
  const comparableTitle = normalizeComparable(rawTitle);
  const type = String(question.questionType || '').toLocaleLowerCase('tr');
  const fallback = TITLE_FALLBACK_BY_TYPE[type] || TITLE_FALLBACK_BY_TYPE.spot;
  if (!originalTitle || originalTitle.length < 6) return fallback;
  if (comparableCorrect && comparableOriginalTitle.includes(comparableCorrect)) return fallback;
  if (!rawTitle || rawTitle.length < 6) return fallback;
  if (/tanisi|tanısı|tedavisi|yönetimi|yonetimi|ilk ilac|ilk ilaç|etkeni$/u.test(comparableTitle)) return fallback;
  return rawTitle.length > 74 ? `${rawTitle.slice(0, 71).trim()}…` : rawTitle;
}

export function buildAISpotContextLine(question = {}) {
  const branch = asText(question.relatedBranch || question.branchName || 'TUS Spot');
  const type = String(question.questionType || '').toLocaleLowerCase('tr');
  if (type === 'test') return `${branch} bağlamında TUS tarzı veri yorumu.`;
  if (type === 'treatment') return `${branch} bağlamında ilk yaklaşım kararı.`;
  if (type === 'mechanism') return `${branch} bağlamında mekanizma sorusu.`;
  if (type === 'diagnosis') return `${branch} bağlamında kısa klinik olgu yorumu.`;
  return `${branch} bağlamında tek köklü TUS spot sorusu.`;
}

export function buildAISpotNarrativeStem(question = {}) {
  const correct = question.diagnosis?.correct || question.correctAnswerText || '';
  const vitalsBox = getAISpotCompactVitals(question);
  const objectiveBox = getAISpotCompactObjectiveData(question);
  const baseRaw = question.narrativeStem || question.primaryStem || question.stem || question.patientIntro?.historySummary || '';
  let cleanBase = stripPreAnswerTeaching(baseRaw, correct);
  cleanBase = removeDenseVitalSentences(cleanBase, vitalsBox.length > 0);
  cleanBase = removeStructuredDataFragmentsFromText(cleanBase, Boolean(vitalsBox.length || objectiveBox.length));
  cleanBase = simplifyInlineObjectiveText(cleanBase);

  const baseSentences = [];
  splitSentences(cleanBase).forEach((sentence) => {
    if (/^vital bulgularda/iu.test(sentence) && vitalsBox.length) return;
    if (objectiveBox.length && looksLikeDenseObjectiveSentence(sentence)) return;
    if (/^objektif değerlendirmede/iu.test(sentence)) return;
    addUniqueSentence(baseSentences, sentence, correct);
  });

  if (baseSentences.length < 2) {
    const history = Array.isArray(question.history || question.findings?.history) ? (question.history || question.findings?.history) : [];
    history.slice(0, 2).forEach((item) => addUniqueSentence(baseSentences, item, correct));
    const exam = Array.isArray(question.exam || question.findings?.exam) ? (question.exam || question.findings?.exam) : [];
    exam.slice(0, 2).forEach((item) => addUniqueSentence(baseSentences, `Fizik muayenede ${item}`, correct));
  }

  const questionPrompt = stripPreAnswerTeaching(question.question || question.diagnosis?.question || '', correct)
    .replace(/^[Bb]u olguda\s*,?\s*/u, 'Bu olguda ');
  const finalSentences = limitNarrativeLength(baseSentences, questionPrompt);
  return splitTusParagraphsFromSentences(finalSentences);
}

export function getAISpotPreviewDiagnostics(question = {}) {
  const paragraphs = buildAISpotNarrativeStem(question);
  const text = paragraphs.join(' ');
  return {
    paragraphCount: paragraphs.length,
    wordCount: text.split(/\s+/).filter(Boolean).length,
    supportGroupCount: getAISpotSupportDataGroups(question).length,
    supportItemCount: getAISpotSupportDataGroups(question).reduce((total, group) => total + group.items.length, 0),
    hasLegacyBoxLabels: /profil|başvuru|risk bağlamı|ayırt ettirici ipuçları|kısa klinik öykü özeti/iu.test(text),
    containsCorrectAnswerText: Boolean(question.diagnosis?.correct && normalizeComparable(text).includes(normalizeComparable(question.diagnosis.correct))),
  };
}
