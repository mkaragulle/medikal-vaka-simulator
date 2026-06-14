import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Icon, IconBadge } from './ui.jsx';
import GlossaryText from './GlossaryTooltip.jsx';
import { sanitizeMeasurementText } from '../utils/clinicalFormatters.js';
import { normalizeLabResultRow } from '../utils/clinicalValueFormatters.js';
import {
  buildInvestigationOrders,
  getOrderCategoryMeta,
  investigationIconByType,
} from '../utils/investigationOrders.js';

const CATEGORY_ORDER = [
  'clinicalAssessment',
  'bedside',
  'cardiac',
  'respiratory',
  'metabolic',
  'neurologic',
  'prenatal',
  'laboratory',
  'urine',
  'immunologySerology',
  'microbiology',
  'imaging',
  'gastrointestinal',
  'functional',
  'fluidAnalysis',
  'urogenital',
  'pathology',
  'invasive',
  'bloodBank',
  'toxicology',
  'other',
];


function getOrderValueTag(item = {}) {
  const raw = item.testValueLabel || item.educationalValue || item.clinicalPriorityLabel || '';
  const clean = String(raw || '').trim();
  if (!clean) return 'İstendi';
  return clean.length > 28 ? `${clean.slice(0, 25).trim()}…` : clean;
}

function getOrderScoreBadge(item = {}) {
  if (!(item.testValueLabel || item.educationalValue || item.clinicalPriorityLabel)) return '';
  const numericScore = Number(item.scoreImpact ?? item.scoreValue);
  if (!Number.isFinite(numericScore) || numericScore <= 0) return '';
  return `+${numericScore}`;
}

function groupOrdersByCategory(orders = []) {
  const groups = [];
  const byCategory = new Map();

  orders.forEach((item) => {
    const category = item.testTypeCategory || item.category || 'other';
    if (!byCategory.has(category)) {
      const meta = getOrderCategoryMeta(category);
      const group = { id: category, meta, items: [] };
      byCategory.set(category, group);
      groups.push(group);
    }
    byCategory.get(category).items.push(item);
  });

  return groups.sort((a, b) => {
    const flowOrderForGroup = (group) => {
      const flowValues = group.items
        .map((item) => Number(item.clinicalFlowOrder ?? item.flowOrder ?? item.orderRank))
        .filter((value) => Number.isFinite(value));
      return flowValues.length ? Math.min(...flowValues) : null;
    };

    const af = flowOrderForGroup(a);
    const bf = flowOrderForGroup(b);
    if (af !== null || bf !== null) return (af ?? 9999) - (bf ?? 9999);

    const leftIndex = CATEGORY_ORDER.indexOf(a.id);
    const rightIndex = CATEGORY_ORDER.indexOf(b.id);
    return (leftIndex === -1 ? 99 : leftIndex) - (rightIndex === -1 ? 99 : rightIndex);
  });
}


function normalizeClinicalText(value = '') {
  return String(value || '')
    .toLocaleLowerCase('tr')
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/â/g, 'a')
    .replace(/î/g, 'i')
    .replace(/û/g, 'u')
    .replace(/\s+/g, ' ')
    .trim();
}

function hasAny(text, patterns = []) {
  return patterns.some((pattern) => pattern.test(text));
}

function parseClinicalNumber(rawValue = '') {
  const source = String(rawValue || '').replace(/,/g, '.');
  const match = source.match(/-?\d+(?:[.,]\d+)?/);
  if (!match) return null;
  const token = match[0];
  const normalized = /^\d{1,3}(?:\.\d{3})+(?:\.\d+)?$/.test(token)
    ? token.replace(/\./g, '')
    : token;
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function extractReferenceNumbers(rawReference = '') {
  const source = String(rawReference || '')
    .replace(/,/g, '.')
    .replace(/(\d)\s*[-–—]\s*(\d)/g, '$1 $2');
  const matches = source.match(/-?\d+(?:[.,]\d+)?/g) || [];
  return matches
    .map((token) => {
      const normalized = /^\d{1,3}(?:\.\d{3})+(?:\.\d+)?$/.test(token)
        ? token.replace(/\./g, '')
        : token;
      const parsed = Number.parseFloat(normalized);
      return Number.isFinite(parsed) ? parsed : null;
    })
    .filter((number) => number !== null);
}

function evaluateNumericStatus(value = '', reference = '') {
  const numericValue = parseClinicalNumber(value);
  const refText = String(reference || '').trim();
  const normalizedReference = normalizeClinicalText(refText);
  if (numericValue === null || !refText || refText === '—') return null;

  const referenceNumbers = extractReferenceNumbers(refText);
  if (/^</.test(normalizedReference) && referenceNumbers.length) {
    return numericValue < referenceNumbers[0]
      ? { tone: 'success', label: 'Referans içinde' }
      : { tone: 'danger', label: 'Yüksek' };
  }
  if (/^≤|^<=/.test(normalizedReference) && referenceNumbers.length) {
    return numericValue <= referenceNumbers[0]
      ? { tone: 'success', label: 'Referans içinde' }
      : { tone: 'danger', label: 'Yüksek' };
  }
  if (/^>/.test(normalizedReference) && referenceNumbers.length) {
    return numericValue > referenceNumbers[0]
      ? { tone: 'success', label: 'Referans içinde' }
      : { tone: 'danger', label: 'Düşük' };
  }
  if (/^≥|^>=/.test(normalizedReference) && referenceNumbers.length) {
    return numericValue >= referenceNumbers[0]
      ? { tone: 'success', label: 'Referans içinde' }
      : { tone: 'danger', label: 'Düşük' };
  }
  if (referenceNumbers.length >= 2 && /[-–—]/.test(refText)) {
    const [low, high] = referenceNumbers[0] <= referenceNumbers[1]
      ? [referenceNumbers[0], referenceNumbers[1]]
      : [referenceNumbers[1], referenceNumbers[0]];
    if (numericValue < low) return { tone: 'danger', label: 'Düşük' };
    if (numericValue > high) return { tone: 'danger', label: 'Yüksek' };
    return { tone: 'success', label: 'Referans içinde' };
  }
  return null;
}

const ABSENCE_RESULT_PATTERNS = [
  /\bsaptanmadi\b/,
  /\bizlenmedi\b/,
  /\bgorulmedi\b/,
  /\byok\b/,
  /\bnegatif\b/,
  /\bnormal sinirlarda\b/,
  /\breferans icinde\b/,
  /\bpatoloji saptanmadi\b/,
  /\banormal bulgu yok\b/,
  /\bdislan(?:di|ir)\b/,
];

const ABSENCE_REFERENCE_PATTERNS = [
  /\bsaptanmamali\b/,
  /\bsaptanmaz\b/,
  /\bolmamali\b/,
  /\bbeklenmez\b/,
  /\bizlenmemeli\b/,
  /\byok\b/,
  /\bnegatif\b/,
  /\bnormal\b/,
  /\bpatoloji yok\b/,
];

const PRESENCE_RESULT_PATTERNS = [
  /\bsaptandi\b/,
  /\bizlendi\b/,
  /\bvar\b/,
  /\bpozitif\b/,
  /\bartmis\b/,
  /\bartis\b/,
  /\byuksek\b/,
  /\bazalmis\b/,
  /\bdusuk\b/,
  /\banormal\b/,
  /\bkritik\b/,
];

function evaluateSemanticStatus(row = {}) {
  const value = String(row.value || '');
  const reference = String(row.reference || '');
  const note = String(row.note || '');
  const parameter = String(row.parameter || '');
  const valueText = normalizeClinicalText(value);
  const referenceText = normalizeClinicalText(reference);
  const noteText = normalizeClinicalText(note);
  const combinedText = normalizeClinicalText(`${parameter} ${value} ${reference} ${note}`);

  if (!valueText && !noteText) return { tone: 'neutral', label: '—' };

  const numericStatus = evaluateNumericStatus(value, reference);
  if (numericStatus) {
    if (/\bsinirda\b/.test(noteText) || /\bhafif\b/.test(noteText)) {
      return { tone: 'warning', label: note || numericStatus.label };
    }
    return noteText && /\bnormal\b|\breferans icinde\b|\buygun\b/.test(noteText)
      ? { tone: 'success', label: note }
      : numericStatus;
  }

  const resultShowsAbsence = hasAny(valueText, ABSENCE_RESULT_PATTERNS) && !/\bgram negatif\b/.test(valueText);
  const referenceExpectsAbsence = hasAny(referenceText, ABSENCE_REFERENCE_PATTERNS);
  const resultShowsPresence = hasAny(valueText, PRESENCE_RESULT_PATTERNS);

  if (resultShowsAbsence && referenceExpectsAbsence) {
    if (/\bnegatif\b/.test(valueText) && /\bnegatif\b/.test(referenceText)) return { tone: 'success', label: 'Normal' };
    return { tone: 'success', label: 'Beklenen' };
  }

  if ((/\bnormal\b|\breferans icinde\b|\bstabil\b|\buygun\b|\buyumlu\b/.test(valueText) || /\bnormal\b|\breferans icinde\b|\bstabil\b|\buygun\b|\buyumlu\b/.test(noteText)) && !/\buyumlu degil\b|\banormal\b/.test(combinedText)) {
    return { tone: 'success', label: note || 'Normal' };
  }

  if (resultShowsPresence && referenceExpectsAbsence) {
    if (/\bsinirda\b|\bhafif\b/.test(combinedText)) return { tone: 'warning', label: note || 'Dikkat' };
    if (/\bpozitif\b/.test(valueText)) return { tone: 'danger', label: 'Pozitif' };
    return { tone: 'danger', label: 'Anormal' };
  }

  if (/\bdusuk risk\b|\brisk dusuk\b/.test(combinedText)) return { tone: 'success', label: 'Düşük risk' };
  if (/\bkritik\b|\bacil\b|\bagir\b|\bbelirgin\b/.test(noteText)) return { tone: 'danger', label: note || 'Kritik' };
  if (/\bsinirda\b|\bhafif\b|\btakip\b|\bdikkat\b/.test(noteText)) return { tone: 'warning', label: note || 'Dikkat' };
  if (/\byuksek\b/.test(noteText)) return { tone: 'danger', label: note || 'Yüksek' };
  if (/\bdusuk\b/.test(noteText)) return { tone: 'danger', label: note || 'Düşük' };
  if (/\bpozitif\b|\bsaptandi\b|\bvar\b/.test(noteText)) return { tone: 'danger', label: note || 'Anormal' };
  if (/\bnegatif\b|\bsaptanmadi\b|\byok\b/.test(noteText)) return { tone: 'success', label: note || 'Normal' };

  return { tone: 'neutral', label: note || '—' };
}

function normalizeCellTextForDedup(value = '') {
  return String(value || '')
    .normalize('NFKC')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .toLocaleLowerCase('tr')
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/â/g, 'a')
    .replace(/î/g, 'i')
    .replace(/û/g, 'u')
    .replace(/\s+/g, ' ')
    .trim();
}

function collapseRepeatedWholeCellText(value = '') {
  const text = String(value || '').trim();
  if (!text) return '';

  const tokens = text.split(/\s+/).filter(Boolean);
  if (tokens.length >= 2 && tokens.length % 2 === 0) {
    const middle = tokens.length / 2;
    const firstHalf = tokens.slice(0, middle).join(' ');
    const secondHalf = tokens.slice(middle).join(' ');
    if (normalizeCellTextForDedup(firstHalf) === normalizeCellTextForDedup(secondHalf)) {
      return firstHalf;
    }
  }

  return text;
}

function uniqueCellLines(value = '') {
  const rawText = String(value || '');
  const hasExplicitLines = /\r|\n/.test(rawText);
  const sourceLines = hasExplicitLines
    ? rawText.split(/\r?\n+/).map((line) => line.trim()).filter(Boolean)
    : [rawText.trim()].filter(Boolean);
  const seen = new Set();
  const uniqueLines = [];

  sourceLines.forEach((line) => {
    const collapsed = collapseRepeatedWholeCellText(line);
    const normalized = normalizeCellTextForDedup(collapsed);
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    uniqueLines.push(collapsed);
  });

  return uniqueLines.join('\n');
}

function sanitizeUniqueCellText(value = '') {
  const uniqueText = uniqueCellLines(value);
  return sanitizeMeasurementText(uniqueText || '');
}

function isDuplicateCellLine(primary = '', secondary = '') {
  const normalizedPrimary = normalizeCellTextForDedup(primary);
  const normalizedSecondary = normalizeCellTextForDedup(secondary);
  return Boolean(normalizedPrimary && normalizedSecondary && normalizedPrimary === normalizedSecondary);
}

function normalizeResultRow(row) {
  const normalized = Array.isArray(row)
    ? { parameter: row[0], value: row[1], reference: row[2], note: row[3] }
    : {
      parameter: row.parameter,
      value: row.value,
      reference: row.reference,
      note: row.note || row.interpretation,
    };
  const normalizedRow = normalizeLabResultRow({
    ...normalized,
    parameter: uniqueCellLines(normalized.parameter || ''),
    value: uniqueCellLines(normalized.value || ''),
    reference: uniqueCellLines(normalized.reference || ''),
    note: uniqueCellLines(normalized.note || ''),
  });

  const value = sanitizeUniqueCellText(normalizedRow.value || '');
  const note = sanitizeUniqueCellText(normalizedRow.note || '');

  return {
    parameter: sanitizeUniqueCellText(normalizedRow.parameter || ''),
    value,
    reference: sanitizeUniqueCellText(normalizedRow.reference || ''),
    note: isDuplicateCellLine(value, note) ? '' : note,
  };
}


const COMPOSITE_RESULT_ANALYTES = [
  { id: 'ph', label: 'pH', aliases: ['pH'], unit: '' },
  { id: 'paco2', label: 'PaCO₂', aliases: ['PaCO2', 'PCO2'], unit: 'mmHg' },
  { id: 'pao2', label: 'PaO₂', aliases: ['PaO2', 'PO2'], unit: 'mmHg' },
  { id: 'hco3', label: 'HCO₃⁻', aliases: ['HCO3'], unit: 'mmol/L' },
  { id: 'sao2', label: 'SaO₂', aliases: ['SaO2', 'O2 sat', 'O2 saturasyonu', 'O2 satürasyonu'], unit: '%' },
  { id: 'lactate', label: 'Laktat', aliases: ['Laktat', 'Lactate'], unit: 'mmol/L' },
];

function normalizeCompositeLabText(value = '') {
  return String(value || '')
    .replace(/₂/g, '2')
    .replace(/₃/g, '3')
    .replace(/₄/g, '4')
    .replace(/[⁻−]/g, '-')
    .replace(/HCO3\s*-/gi, 'HCO3')
    .replace(/\bPa\s*CO2\b/gi, 'PaCO2')
    .replace(/\bPa\s*O2\b/gi, 'PaO2')
    .replace(/\bSa\s*O2\b/gi, 'SaO2')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeRegexText(value = '') {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function resolveCompositeUnit(analyte, source = '', capturedUnit = '', isReference = false) {
  const normalizedSource = normalizeCompositeLabText(source).toLocaleLowerCase('tr');
  const unitText = String(capturedUnit || '').replace(/\s+/g, '').trim();

  if (analyte.id === 'ph') return '';
  if (['paco2', 'pao2'].includes(analyte.id)) return /mmhg/i.test(normalizedSource) ? 'mmHg' : (unitText || analyte.unit);
  if (analyte.id === 'hco3') {
    if (/mmol\s*\/\s*l/i.test(normalizedSource)) return 'mmol/L';
    if (/meq\s*\/\s*l/i.test(normalizedSource)) return 'mEq/L';
    return unitText && !/mmhg/i.test(unitText) ? unitText : analyte.unit;
  }
  if (analyte.id === 'sao2') return /%/.test(normalizedSource) ? '%' : (unitText || analyte.unit);
  if (analyte.id === 'lactate') return /mmol\s*\/\s*l/i.test(normalizedSource) ? 'mmol/L' : (unitText || analyte.unit);
  return unitText || analyte.unit || '';
}

function normalizeCompositeRange(value = '', isReference = false) {
  let text = String(value || '').replace(/,/g, '.').replace(/\s+/g, ' ').trim();
  if (isReference) {
    text = text.replace(/(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/g, '$1–$2');
  }
  return text.replace(/\s*[-–—]\s*/g, '–');
}

function formatCompositeMeasurement(range = '', unit = '') {
  const cleanRange = String(range || '').trim();
  const cleanUnit = String(unit || '').trim();
  if (!cleanRange) return '';
  if (!cleanUnit || new RegExp(`(?:^|\\s)${escapeRegexText(cleanUnit)}$`, 'i').test(cleanRange)) return cleanRange;
  return `${cleanRange} ${cleanUnit}`;
}

function extractCompositeAnalyteMeasurement(source = '', analyte, isReference = false) {
  const text = normalizeCompositeLabText(source);
  if (!text) return '';

  const rangePattern = '([<>≤≥]?\\s*\\d+(?:[.,]\\d+)?(?:\\s*(?:[-–—/]\\s*)\\d+(?:[.,]\\d+)?)?)';
  const unitPattern = '([a-zA-Zµμ%0-9³]+(?:\\s*\\/\\s*[a-zA-Zµμ0-9³]+)?)?';

  for (const alias of analyte.aliases) {
    const aliasPattern = escapeRegexText(normalizeCompositeLabText(alias));
    const regex = new RegExp(`(?:^|[^A-Za-zÇĞİÖŞÜçğıöşü0-9])${aliasPattern}\\s*[:=]?\\s*${rangePattern}\\s*${unitPattern}`, 'i');
    const match = text.match(regex);
    if (match) {
      const range = normalizeCompositeRange(match[1], isReference);
      const unit = resolveCompositeUnit(analyte, source, match[2], isReference);
      return formatCompositeMeasurement(range, unit);
    }
  }

  return '';
}

function splitCompositeResultRow(row = {}) {
  const normalized = normalizeResultRow(row);
  const combined = normalizeCompositeLabText(`${normalized.parameter} ${normalized.value} ${normalized.reference}`);
  const detectedAnalytes = COMPOSITE_RESULT_ANALYTES.filter((analyte) => analyte.aliases.some((alias) => {
    const pattern = new RegExp(`(?:^|[^A-Za-zÇĞİÖŞÜçğıöşü0-9])${escapeRegexText(normalizeCompositeLabText(alias))}(?=\\s*[:=]?\\s*[<>≤≥]?\\d|\\b)`, 'i');
    return pattern.test(combined);
  }));

  if (detectedAnalytes.length < 2) return [normalized];

  const splitRows = detectedAnalytes
    .map((analyte) => {
      const value = extractCompositeAnalyteMeasurement(normalized.value, analyte, false);
      const reference = extractCompositeAnalyteMeasurement(normalized.reference, analyte, true);
      if (!value && !reference) return null;
      return {
        parameter: analyte.label,
        value,
        reference: reference || '—',
        note: '',
      };
    })
    .filter(Boolean);

  return splitRows.length >= 2 ? splitRows : [normalized];
}

function expandCompositeResultRows(rows = []) {
  return rows.flatMap((row) => splitCompositeResultRow(row));
}

const PARAMETER_TABLE_TYPES = new Set(['lab', 'bloodGas', 'urine', 'culture', 'toxicology', 'bloodBank']);
const QUALITATIVE_RESULT_TYPES = new Set(['ecg', 'xray', 'ct', 'mri', 'ultrasound', 'imaging', 'microscopy', 'pathology', 'endoscopy', 'clinical', 'physicalExam', 'woundAssessment', 'microbiology', 'fluidAnalysis', 'functionalTest', 'neurophysiology', 'nuclear']);


function DenseResultText({ text = '' }) {
  return <>{String(text || '')}</>;
}


function isGenericQualitativeReference(reference = '') {
  const normalized = normalizeClinicalText(reference);
  return !normalized || normalized === '—' || /normalde beklenmeyen patern|objektif bulgu|klinik olarak|ornek etken iliskisi|bilgi|referans araligi yok|karar verdirici degil|klinik baglama gore degerlendirilir|seri olcum|ultrason ile yorumlanir|sonuc.*gosterir|metabolik yolakta/.test(normalized);
}


function isGenericResultNote(note = '') {
  const normalized = normalizeClinicalText(note);
  if (!normalized) return true;
  return /klinik olarak anlamli|objektif sonuc|yorum gerektirir|klinik veri özeti|klinik veri ozeti|referans araligi yok|vital bulgular klinik baglama|laboratuvar verisidir|ilk yonetim kararini|ornek etken iliskisi|bilgi|anormal bulgu|tek basina karar verdirici|diger bulgularla birlikte anlam kazan|tani(?:sal)? akil yurutmeyi guclendir|klinik odagi somutlastir|somutlastirdigini gosterir/.test(normalized);
}

function rowHasQuantitativeSignal(row = {}) {
  const value = String(row.value || '');
  const reference = String(row.reference || '');
  const joined = `${row.parameter || ''} ${value} ${reference}`;

  if (reference && !isGenericQualitativeReference(reference)) return true;
  if (!/\d/.test(joined)) return false;

  return /(mg\/dL|g\/dL|mmol\/L|mEq\/L|IU\/L|U\/L|ng\/mL|pg\/mL|µIU\/mL|uIU\/mL|mmHg|\/mm³|\/mm3|x10\^3\/µL|%|sn|mm|cm|mL|L|IU|titre|titer)/i.test(joined);
}

function shouldRenderParameterTable(rows = [], itemType = '') {
  const normalizedRows = expandCompositeResultRows(rows);
  if (PARAMETER_TABLE_TYPES.has(itemType)) return true;
  if (QUALITATIVE_RESULT_TYPES.has(itemType) && !normalizedRows.some(rowHasQuantitativeSignal)) return false;
  return normalizedRows.some(rowHasQuantitativeSignal);
}

function isLongResultValue(value = '') {
  const text = String(value || '').trim();
  return text.length > 64 || text.split(/\s+/).length > 8;
}

function hasMeasurementUnitSignal(value = '') {
  return /(mg\/dL|g\/dL|mmol\/L|mEq\/L|IU\/L|U\/L|ng\/mL|pg\/mL|µIU\/mL|uIU\/mL|mmHg|\/mm³|\/mm3|x10\^3\/µL|%|sn|mm|cm|mL|L|IU|titre|titer)/i.test(String(value || ''));
}

function hasMeaningfulReference(row = {}) {
  const reference = String(row.reference || '').trim();
  return Boolean(reference && !isGenericQualitativeReference(reference) && rowHasQuantitativeSignal(row));
}

function isNarrativeCell(value = '') {
  const text = String(value || '').trim();
  if (!text || text === '—') return false;
  const words = text.split(/\s+/).filter(Boolean).length;
  const hasLetters = /[A-Za-zÇĞİÖŞÜçğıöşü]/.test(text);
  const hasNumericMeasurement = /\d/.test(text) && hasMeasurementUnitSignal(text);
  return hasLetters && !hasNumericMeasurement && (words >= 2 || text.length >= 18);
}

function isTextDominantRow(row = {}) {
  return isNarrativeCell(row.value) || isNarrativeCell(row.reference) || isNarrativeCell(row.note);
}


function getResultTableVariant(rows = [], itemType = '', hardMode = false) {
  const normalizedRows = expandCompositeResultRows(rows);
  const rowCount = normalizedRows.length || 1;
  const quantitativeRows = normalizedRows.filter(rowHasQuantitativeSignal).length;
  const textDominantRows = normalizedRows.filter(isTextDominantRow).length;
  const meaningfulReferenceRows = normalizedRows.filter(hasMeaningfulReference).length;
  const hasLongCell = normalizedRows.some((row) => isLongResultValue(row.value) || isLongResultValue(row.reference) || isLongResultValue(row.note));
  const quantitativeRatio = quantitativeRows / rowCount;
  const textDominantRatio = textDominantRows / rowCount;
  const isClassicNumericLab = PARAMETER_TABLE_TYPES.has(itemType) && quantitativeRatio >= 0.5 && textDominantRatio < 0.5 && !hasLongCell;

  if (!meaningfulReferenceRows) return 'two-column';
  if (!isClassicNumericLab || hardMode || textDominantRatio >= 0.4 || hasLongCell) {
    return 'three-column';
  }
  return 'four-column';
}

function ResultFindingList({ rows = [], glossaryEnabled = true, glossaryRevealMode = 'preAnswer' }) {
  const normalizedRows = expandCompositeResultRows(rows);

  return (
    <div className="qualitative-result-list inline-result-finding-list">
      {normalizedRows.map(({ parameter, value, reference, note }, index) => {
        const status = evaluateSemanticStatus({ parameter, value, reference, note });
        const showReference = reference && !isGenericQualitativeReference(reference) && rowHasQuantitativeSignal({ parameter, value, reference, note });
        const showNote = note && !isGenericResultNote(note);

        return (
          <div key={`${parameter || 'bulgu'}-${index}`} className={`qualitative-result-finding ${status.tone}`}>
            <div className="qualitative-result-marker" aria-hidden="true" />
            <div className="qualitative-result-copy">
              <span className="qualitative-result-label"><DenseResultText text={String(parameter || 'Bulgular')} /></span>
              <p><DenseResultText text={String(value || 'Objektif bulgu saptanmadı.')} /></p>
              {showReference || showNote ? (
                <span className="qualitative-result-meta">
                  {showReference ? <DenseResultText text={`Beklenen: ${reference}`} /> : null}
                  {showReference && showNote ? ' · ' : ''}
                  {showNote ? <DenseResultText text={String(note)} /> : null}
                </span>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const MemoizedResultFindingList = memo(ResultFindingList, (prev, next) => (
  prev.rows === next.rows
  && prev.glossaryEnabled === next.glossaryEnabled
  && prev.glossaryRevealMode === next.glossaryRevealMode
));

function ResultTable({ rows = [], hardMode = false, glossaryEnabled = true, itemType = '', glossaryRevealMode = 'preAnswer' }) {
  if (!rows.length) return null;

  const normalizedRows = expandCompositeResultRows(rows);

  if (!shouldRenderParameterTable(rows, itemType)) {
    return <MemoizedResultFindingList rows={rows} glossaryEnabled={glossaryEnabled} glossaryRevealMode={glossaryRevealMode} />;
  }

  const tableVariant = getResultTableVariant(rows, itemType, hardMode);

  if (tableVariant === 'two-column') {
    return (
      <div className="table-wrap lab-table-wrap ordered-result-table-wrap inline-result-table-wrap compact-result-table-wrap adaptive-result-table-wrap">
        <table className="lab-table ordered-result-table inline-result-table compact-result-table adaptive-result-table adaptive-result-table--two">
          <thead>
            <tr>
              <th>Parametre</th>
              <th>Sonuç</th>
            </tr>
          </thead>
          <tbody>
            {normalizedRows.map(({ parameter, value, reference, note }, index) => {
              const { tone } = evaluateSemanticStatus({ parameter, value, reference, note });
              const secondary = note && !isGenericResultNote(note) && !isDuplicateCellLine(value, note) ? note : '';
              return (
                <tr key={`${parameter || 'satir'}-${index}`} className={`lab-table-row ${tone}`}>
                  <td>
                    <div className="lab-parameter-cell">
                      <strong><DenseResultText text={String(parameter || '')} /></strong>
                    </div>
                  </td>
                  <td>
                    <span className="lab-value-text long-result-text"><DenseResultText text={String(value || '')} /></span>
                    {secondary ? <span className="lab-cell-subnote"><DenseResultText text={String(secondary)} /></span> : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  if (tableVariant === 'three-column') {
    return (
      <div className="table-wrap lab-table-wrap ordered-result-table-wrap inline-result-table-wrap adaptive-result-table-wrap">
        <table className="lab-table ordered-result-table inline-result-table adaptive-result-table adaptive-result-table--three">
          <thead>
            <tr>
              <th>Parametre</th>
              <th>Sonuç</th>
              <th>Referans</th>
            </tr>
          </thead>
          <tbody>
            {normalizedRows.map(({ parameter, value, reference, note }, index) => {
              const { tone } = evaluateSemanticStatus({ parameter, value, reference, note });
              const secondary = note && !isGenericResultNote(note) && !isDuplicateCellLine(value, note) ? note : '';
              return (
                <tr key={`${parameter || 'satir'}-${index}`} className={`lab-table-row ${tone}`}>
                  <td>
                    <div className="lab-parameter-cell">
                      <strong><DenseResultText text={String(parameter || '')} /></strong>
                    </div>
                  </td>
                  <td>
                    <span className="lab-value-text long-result-text"><DenseResultText text={String(value || '')} /></span>
                    {secondary ? <span className="lab-cell-subnote"><DenseResultText text={String(secondary)} /></span> : null}
                  </td>
                  <td><span className="lab-reference-text long-reference-text"><DenseResultText text={String(reference || '—')} /></span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="table-wrap lab-table-wrap ordered-result-table-wrap inline-result-table-wrap adaptive-result-table-wrap">
      <table className="lab-table ordered-result-table inline-result-table adaptive-result-table adaptive-result-table--four">
        <thead>
          <tr>
            <th>Parametre</th>
            <th>Sonuç</th>
            <th>Referans</th>
            <th>Durum</th>
          </tr>
        </thead>
        <tbody>
          {normalizedRows.map(({ parameter, value, reference, note }, index) => {
            const status = evaluateSemanticStatus({ parameter, value, reference, note });
            const tone = status.tone;
            return (
              <tr key={`${parameter || 'satir'}-${index}`} className={`lab-table-row ${tone}`}>
                <td>
                  <div className="lab-parameter-cell">
                    <strong><DenseResultText text={String(parameter || '')} /></strong>
                  </div>
                </td>
                <td>
                  <span className="lab-value-text"><DenseResultText text={String(value || '')} /></span>
                </td>
                <td><span className="lab-reference-text"><DenseResultText text={String(reference || '—')} /></span></td>
                <td>
                  <span className={`lab-status-pill ${tone}`}>
                    <DenseResultText text={String(status.label || '—')} />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const MemoizedResultTable = memo(ResultTable, (prev, next) => (
  prev.rows === next.rows
  && prev.hardMode === next.hardMode
  && prev.glossaryEnabled === next.glossaryEnabled
  && prev.itemType === next.itemType
  && prev.glossaryRevealMode === next.glossaryRevealMode
));

function ResultImages({ images = [], glossaryEnabled = true, glossaryRevealMode = 'preAnswer', revealCaption = true }) {
  if (!images.length) return null;
  return (
    <div className="ordered-image-grid inline-result-image-grid">
      {images.map((image) => {
        const captionText = revealCaption
          ? (image.title || image.parameter || 'Tetkik görseli')
          : (image.genericTitle || 'Tetkik görseli');

        return (
          <figure key={`${image.title}-${image.imageUrl}`} className="ordered-image-card inline-result-image-card">
            <div className="ordered-image-frame inline-result-image-frame">
              <img
                src={image.thumbnailUrl || image.imageUrl}
                alt={image.alt || image.title || 'Tetkik görseli'}
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  if (image.imageUrl && event.currentTarget.src !== image.imageUrl) {
                    event.currentTarget.src = image.imageUrl;
                  }
                }}
              />
              <a href={image.imageUrl || image.thumbnailUrl} target="_blank" rel="noreferrer" aria-label="Görseli yeni sekmede aç">
                <Icon name="Search" size={16} />
              </a>
            </div>
            <figcaption>
              <strong><GlossaryText text={captionText} enabled={glossaryEnabled && revealCaption} revealMode={glossaryRevealMode} maxTerms={5} /></strong>
              {!revealCaption ? <span>Önce görsel bulguları kendin yorumla.</span> : null}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

function VisualHelpGate({ open, onToggle, compact = false }) {
  return (
    <div className={`visual-interpretation-gate ${compact ? 'compact' : ''}`.trim()}>
      <div className="visual-interpretation-copy">
        <strong>Önce görseli kendin yorumla</strong>
        <p>Önce anatomik lokalizasyonu, dağılımı, yoğunluk/sinyal değişikliğini ve vaka bulgularıyla ilişkisini değerlendir. Takıldığında Yardım Al ile bu görsele özel bilimsel yorumu açabilirsin.</p>
      </div>
      <button
        type="button"
        className={`visual-help-button ${open ? 'active' : ''}`.trim()}
        onClick={onToggle}
        aria-expanded={open}
      >
        <Icon name={open ? 'EyeOff' : 'Sparkles'} size={15} />
        {open ? 'Yorumu Gizle' : 'Yardım Al'}
      </button>
    </div>
  );
}

function normalizeForDuplicateCheck(text = '') {
  return normalizeClinicalText(text).replace(/[^a-z0-9ığüşöçİĞÜŞÖÇ]+/gi, ' ').trim();
}


const EMPTY_SHORT_COMMENT_PATTERNS = [
  /bağlamında/iu,
  /ilk yönetim kararını/iu,
  /laboratuvar verisidir/iu,
  /vital bulgular klinik bağlama göre değerlendirilir/iu,
  /klinik veri özeti/iu,
  /referans aralığı yok/iu,
  /hasta güvenliği açısından netleştirir/iu,
  /tanısal olasılığı ve yönetim önceliğini netleştirir/iu,
  /temel klinik değerlendirme/iu,
  /ile birlikte yorumlandığında/i,
  /gerektiğini gösterir/i,
  /klinik yorumu destekleyen objektif/i,
  /klinik değerlendirmeyi destekleyen objektif/i,
  /objektif verilerden biridir/i,
  /ilgili klinik yorum için destekleyici veri sağlar/i,
  /klinik yorumu vaka verisiyle ilişkilendirir/i,
  /klinik odağı(?:nı)? somutlaştır/iu,
  /somutlaştırdığını gösterir/iu,
  /tek başına karar verdirici/iu,
  /diğer bulgularla birlikte anlam kazan/iu,
  /tanısal akıl yürütmeyi güçlendir/iu,
  /sonucun vaka tablosunda/iu,
  /örnek\/etken ilişkisi/iu,
  /^\s*(bilgi|anormal bulgu|klinikle uyumludur|tanıyı destekler|karar verdirici değildir)\.?\s*$/i,
  /sonucu\s+(?:patolojik\s+)?(?:yükseklik|düşüklük|anemi varlığını|aktif inflamasyonu|böbrek fonksiyon bozulmasını).*gösterir/iu,
  /metabolik\s+yolakta\s+birikim\s+paternini\s+gösterir/iu,
  /akut\s+olasılığını\s+artırır/iu,
];

function isMeaningfulShortComment(text = '') {
  const cleanText = String(text || '').replace(/\s+/g, ' ').trim();
  if (!cleanText) return false;
  if (EMPTY_SHORT_COMMENT_PATTERNS.some((pattern) => pattern.test(cleanText))) return false;
  if (cleanText.length < 24 && !/[.;]/.test(cleanText)) return false;
  return true;
}

function summaryDuplicatesStructuredRows(summary = '', rows = []) {
  const summaryText = normalizeForDuplicateCheck(summary);
  if (!summaryText || !rows.length) return false;

  return rows.some((row) => {
    const { value } = normalizeResultRow(row);
    const valueText = normalizeForDuplicateCheck(value);
    return valueText && valueText.length > 20 && (summaryText.includes(valueText) || valueText.includes(summaryText));
  });
}



function isVisualResultItem(item = {}) {
  const text = `${item.id || ''} ${item.label || ''} ${item.title || ''} ${item.type || ''} ${item.subtype || ''}`.toLocaleLowerCase('tr');
  if (['xray', 'ct', 'mri', 'ultrasound', 'ecg', 'echo', 'endoscopy', 'microscopy', 'pathology', 'clinical', 'physicalExam', 'woundAssessment', 'microbiology', 'fluidAnalysis', 'functionalTest', 'neurophysiology', 'nuclear'].includes(item.type)) return true;
  return /(grafi|radyografi|röntgen|xray|bt|ct|tomografi|mr\b|mri|ultrason|usg|ekokardiyografi|eko\b|doppler|ekg|elektrokardiyografi|eeg|endoskopi|kolonoskopi|bronkoskopi|fundoskopi|dermatoskopi|biyopsi|patoloji|histopatoloji|mikroskopi|periferik yayma|gram boyama|immünfloresan|immunfloresan|klinik fotoğraf|lezyon fotoğrafı|görsel)/.test(text);
}

function InlineOrderResult({ item, mode, hardMode = false, glossaryRevealMode = 'preAnswer' }) {
  const result = item.result || {};
  const hasRows = Boolean(result.rows?.length);
  const hasImages = Boolean(result.images?.length) && isVisualResultItem(item);
  const summaryText = sanitizeMeasurementText(result.summary || '').trim();
  const hasSummary = Boolean(summaryText && result.format !== 'empty' && isMeaningfulShortComment(summaryText));
  const shouldShowSummary = hasSummary && (!hasRows || !summaryDuplicatesStructuredRows(summaryText, result.rows));
  const [showVisualHelp, setShowVisualHelp] = useState(false);
  const visualFirstMode = hasImages;
  const revealScientificInterpretation = !visualFirstMode || showVisualHelp;

  useEffect(() => {
    setShowVisualHelp(false);
  }, [item.id]);

  return (
    <div className="inline-order-result requested-result-panel" role="region" aria-label={`${item.label} sonucu`}>
      <div className="inline-result-block requested-result-primary">
        <div className="inline-result-title-row">
          <span className="inline-result-label"><Icon name={visualFirstMode ? 'Image' : 'Notes'} size={13} /> {visualFirstMode ? 'Görsel' : 'Sonuç'}</span>
        </div>
        {hasImages ? (
          <>
            <ResultImages
              images={result.images}
              glossaryEnabled={mode !== 'exam' && !hardMode}
              glossaryRevealMode={glossaryRevealMode}
              revealCaption={showVisualHelp}
            />
            <VisualHelpGate open={showVisualHelp} onToggle={() => setShowVisualHelp((current) => !current)} />
          </>
        ) : null}
        {revealScientificInterpretation && (hasRows || shouldShowSummary) ? (
          <div className={`visual-scientific-interpretation ${visualFirstMode ? 'revealed' : ''}`.trim()}>
            {visualFirstMode ? <span className="visual-interpretation-heading"><Icon name="Notes" size={13} /> Bilimsel yorum</span> : null}
            {hasRows ? <MemoizedResultTable rows={result.rows} hardMode={hardMode} glossaryEnabled={mode !== 'exam' && !hardMode} itemType={item.type} glossaryRevealMode={glossaryRevealMode} /> : null}
            {shouldShowSummary ? (
              <div className={`ordered-result-comment ${hasRows || hasImages ? 'after-objective-data' : 'standalone'}`}>
                {(hasRows || hasImages) ? <span>Kısa yorum</span> : null}
                <p className="ordered-result-summary inline-result-summary"><GlossaryText text={summaryText} enabled={mode !== 'exam' && !hardMode} revealMode={glossaryRevealMode} maxTerms={5} /></p>
              </div>
            ) : null}
          </div>
        ) : null}
        {!hasSummary && !hasRows && !hasImages ? (
          <p className="ordered-result-empty inline-result-empty">Bu istemde ek objektif bulgu saptanmadı.</p>
        ) : null}
      </div>

    </div>
  );
}

function OrderCard({ item, selected, expanded, onToggle, mode, hardMode = false, glossaryRevealMode = 'preAnswer' }) {
  const valueTag = getOrderValueTag(item);
  const scoreBadge = getOrderScoreBadge(item);
  return (
    <article className={`order-card-shell requested-test-card ${selected ? 'selected requested' : ''} ${expanded ? 'expanded' : ''}`.trim()}>
      <button
        type="button"
        className={`investigation-option-card smart-order-card neutral-order-card requested-test-card-head ${selected ? 'selected' : ''}`.trim()}
        onClick={() => onToggle(item)}
        aria-pressed={selected}
        aria-expanded={expanded}
        aria-label={`${item.label} istemini ${selected ? 'aç veya kapat' : 'seç'}`}
      >
        <IconBadge icon={investigationIconByType[item.type] || 'Search'} tone={selected ? 'success' : 'blue'} size="sm" />
        <span className="investigation-option-copy smart-order-copy requested-test-copy">
          <strong>{item.title || item.label}</strong>
        </span>
        <span className="smart-order-actions requested-test-actions">
          <span className={`investigation-option-state smart-order-state order-status-chip ${selected ? 'requested' : 'idle'}`}>
            {selected ? (
              <>
                <Icon name="CheckCircle" size={13} />
                <span>{valueTag}</span>
                {scoreBadge ? <span className="order-score-mini">{scoreBadge}</span> : null}
              </>
            ) : 'İste'}
          </span>
          {selected ? (
            <span className="order-expand-control" aria-hidden="true">
              <Icon name={expanded ? 'ChevronUp' : 'ChevronDown'} size={16} className="order-expand-icon" />
            </span>
          ) : null}
        </span>
      </button>

      {selected && expanded ? <MemoizedInlineOrderResult item={item} mode={mode} hardMode={hardMode} glossaryRevealMode={glossaryRevealMode} /> : null}
    </article>
  );
}

const MemoizedInlineOrderResult = memo(InlineOrderResult, (prev, next) => (
  prev.item === next.item
  && prev.mode === next.mode
  && prev.hardMode === next.hardMode
  && prev.glossaryRevealMode === next.glossaryRevealMode
));

const MemoizedOrderCard = memo(OrderCard, (prev, next) => (
  prev.item === next.item
  && prev.selected === next.selected
  && prev.expanded === next.expanded
  && prev.mode === next.mode
  && prev.hardMode === next.hardMode
  && prev.glossaryRevealMode === next.glossaryRevealMode
));

function OrderCategorySection({ group, selectedOrderSet, openResultSet, onToggleOrder, mode, hardMode = false, glossaryRevealMode = 'preAnswer' }) {
  return (
    <section className="order-category-section smart-order-category-section" aria-labelledby={`order-category-${group.id}`}>
      <header className="order-category-head smart-order-category-head">
        <div>
          <h3 id={`order-category-${group.id}`}>{group.meta.label}</h3>
        </div>
      </header>
      <div className="order-category-grid smart-order-category-grid">
        {group.items.map((item) => {
          const selected = selectedOrderSet.has(item.id);
          return (
            <MemoizedOrderCard
              key={item.id}
              item={item}
              selected={selected}
              expanded={openResultSet.has(item.id)}
              onToggle={onToggleOrder}
              mode={mode}
              hardMode={hardMode}
              glossaryRevealMode={glossaryRevealMode}
            />
          );
        })}
      </div>
    </section>
  );
}

function DiagnosticOrdersPanel({ orders, orderedInvestigationIds, onOrderInvestigation, mode, hardMode = false, glossaryRevealMode = 'preAnswer' }) {
  const groups = useMemo(() => groupOrdersByCategory(orders), [orders]);
  const [openResultIds, setOpenResultIds] = useState([]);
  const selectedIdsRef = useRef(orderedInvestigationIds);
  const orderSignature = useMemo(() => orders.map((item) => item.id).join('|'), [orders]);
  const selectedOrderSet = useMemo(() => new Set(orderedInvestigationIds), [orderedInvestigationIds]);
  const openResultSet = useMemo(() => new Set(openResultIds), [openResultIds]);

  useEffect(() => {
    selectedIdsRef.current = orderedInvestigationIds;
  }, [orderedInvestigationIds]);

  useEffect(() => {
    setOpenResultIds([]);
  }, [orderSignature]);

  useEffect(() => {
    if (!orderedInvestigationIds.length) setOpenResultIds([]);
  }, [orderedInvestigationIds.length]);

  const handleToggleOrder = useCallback((item) => {
    const alreadySelected = selectedIdsRef.current.includes(item.id);

    if (!alreadySelected) {
      onOrderInvestigation?.(item.id);
      setOpenResultIds((current) => current.includes(item.id) ? current : [...current, item.id]);
      return;
    }

    setOpenResultIds((current) => (
      current.includes(item.id)
        ? current.filter((id) => id !== item.id)
        : [...current, item.id]
    ));
  }, [onOrderInvestigation]);

  return (
    <div className="diagnostic-orders-panel smart-diagnostic-orders-panel" aria-label="İstenebilir tetkikler">
      {groups.map((group) => (
        <OrderCategorySection
          key={group.id}
          group={group}
          selectedOrderSet={selectedOrderSet}
          openResultSet={openResultSet}
          onToggleOrder={handleToggleOrder}
          mode={mode}
          hardMode={hardMode}
          glossaryRevealMode={glossaryRevealMode}
        />
      ))}
    </div>
  );
}

function InvestigationPanel({
  clinicalCase,
  mode = 'study',
  hardMode = false,
  orderedInvestigationIds = [],
  onOrderInvestigation,
  orders: providedOrders = null,
  glossaryRevealMode = 'preAnswer',
}) {
  const orders = useMemo(() => providedOrders ?? buildInvestigationOrders(clinicalCase), [clinicalCase, providedOrders]);

  return (
    <section className="card-surface investigation-order-section refined-investigation-order-section smart-investigation-order-section" aria-label="Objektif Veri / Tetkik">
      <div className="panel-title-row compact investigation-order-head refined-investigation-order-head smart-investigation-order-head">
        <div>
          <h2>Objektif Veri / Tetkik</h2>
        </div>
        <span className="ordered-count-chip refined-count-chip smart-count-chip">{orderedInvestigationIds.length} istem seçildi</span>
      </div>

      <DiagnosticOrdersPanel
        orders={orders}
        orderedInvestigationIds={orderedInvestigationIds}
        onOrderInvestigation={onOrderInvestigation}
        mode={mode}
        hardMode={hardMode}
        glossaryRevealMode={glossaryRevealMode}
      />
    </section>
  );
}

export default memo(InvestigationPanel);
