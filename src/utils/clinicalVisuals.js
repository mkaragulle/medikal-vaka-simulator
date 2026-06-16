const TURKISH_CHAR_MAP = {
  ç: 'c', ğ: 'g', ı: 'i', i: 'i', ö: 'o', ş: 's', ü: 'u',
  Ç: 'c', Ğ: 'g', İ: 'i', I: 'i', Ö: 'o', Ş: 's', Ü: 'u',
};

export function normalizeClinicalVisualText(value = '') {
  return String(value || '')
    .replace(/[çğıiöşüÇĞİIÖŞÜ]/g, (char) => TURKISH_CHAR_MAP[char] || char)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokens(value = '') {
  return normalizeClinicalVisualText(value)
    .split(' ')
    .filter((token) => token.length >= 4);
}

function overlapScore(source = '', target = '') {
  const sourceTokens = Array.from(new Set(tokens(source)));
  const targetText = normalizeClinicalVisualText(target);
  if (!sourceTokens.length || !targetText) return 0;
  return sourceTokens.reduce((score, token) => score + (targetText.includes(token) ? 1 : 0), 0);
}

function collectInvestigationText(item = {}) {
  const result = item.result || {};
  const rows = [
    ...(item.rows || []),
    ...(result.rows || []),
    ...(result.values || []),
  ];

  const rowText = rows
    .map((row) => {
      if (Array.isArray(row)) return row.join(' ');
      if (row && typeof row === 'object') return Object.values(row).join(' ');
      return String(row || '');
    })
    .join(' ');

  return [
    item.id,
    item.label,
    item.title,
    item.type,
    item.subtype,
    item.summary,
    item.clinicalMeaning,
    item.interpretation,
    result.title,
    result.summary,
    result.interpretation,
    rowText,
  ].filter(Boolean).join(' ');
}

function normalizeForVisualGuard(value = '') {
  return normalizeClinicalVisualText(value || '');
}

function collectVisualGuardText(item = {}) {
  return normalizeForVisualGuard([
    item.id,
    item.label,
    item.title,
    item.type,
    item.subtype,
    item.result?.title,
    item.result?.summary,
  ].filter(Boolean).join(' '));
}

const VISUAL_INVESTIGATION_PATTERN = /\b(ekg|ecg|elektrokardiyografi|eeg|grafi|radyografi|rontgen|xray|bt|ct|tomografi|mr|mri|ultrason|ultrasonografi|usg|ekokardiyografi|eko|doppler|endoskopi|kolonoskopi|bronkoskopi|fundoskopi|dermatoskopi|biyopsi|patoloji|histopatoloji|mikroskopi|yayma|gram boyama|immunfloresan|imunfloresan|klinik fotograf|lezyon fotografi|gorsel)\b/;
const LAB_ONLY_INVESTIGATION_PATTERN = /\b(bnp|nt probnp|natriuretik|troponin|crp|prokalsitonin|hemogram|tam kan|hemoglobin|trombosit|lokosit|kreatinin|ure|elektrolit|sodyum|potasyum|d dimer|glukoz|hba1c|tsh|serbest t4|kan gazi|ph|hco3|pco2|po2|laktat|inr|pt|aptt|koagulasyon|albumin|kompleman|protein kreatinin|ferritin|b12|folat|idrar analizi|tam idrar|kultur|pcr|seroloji|antijen|antikor|lipaz|amilaz|bilirubin|ast|alt|ggt)\b/;

function isVisualCompatibleInvestigation(item = {}) {
  const text = collectVisualGuardText(item);
  const explicitVisualType = ['xray', 'ct', 'mri', 'ultrasound', 'ecg', 'echo', 'endoscopy', 'microscopy', 'pathology', 'clinical', 'neurophysiology', 'nuclear'].includes(item.type);
  if (explicitVisualType) return true;
  if (LAB_ONLY_INVESTIGATION_PATTERN.test(text) && !VISUAL_INVESTIGATION_PATTERN.test(text)) return false;
  return VISUAL_INVESTIGATION_PATTERN.test(text);
}

function strongVisualLabelMatch(image = {}, item = {}) {
  const itemLabel = normalizeForVisualGuard(item.label || item.title || item.id || '');
  const imageLabel = normalizeForVisualGuard(image.parameter || image.title || image.rawInvestigationRow || '');
  if (!itemLabel || !imageLabel) return false;
  if (itemLabel.length >= 4 && imageLabel.includes(itemLabel)) return true;
  if (imageLabel.length >= 4 && itemLabel.includes(imageLabel)) return true;
  const itemTokens = tokens(itemLabel).filter((token) => token.length >= 5);
  const imageTokens = new Set(tokens(imageLabel).filter((token) => token.length >= 5));
  if (!itemTokens.length || !imageTokens.size) return false;
  const shared = itemTokens.filter((token) => imageTokens.has(token));
  return shared.length >= Math.min(2, itemTokens.length);
}

export function visualMatchesInvestigation(image = {}, item = {}) {
  if (!image || !item) return false;

  const visualCompatible = isVisualCompatibleInvestigation(item);
  if (!visualCompatible) return false;

  if (image.investigationId && item.id && image.investigationId === item.id) return true;
  if (Array.isArray(item.imageIds) && item.imageIds.includes(image.id)) return true;

  return strongVisualLabelMatch(image, item);
}

function normalizeVisualForCase(visual = {}) {
  return {
    id: visual.id,
    numericId: visual.numericId,
    title: visual.title || visual.parameter || 'Tetkik görseli',
    modality: visual.modality || 'clinical',
    modalityLabel: visual.modalityLabel || '',
    parameter: visual.parameter || visual.title || '',
    result: visual.result || '',
    clinicalMeaning: visual.clinicalMeaning || '',
    rawInvestigationRow: visual.rawInvestigationRow || '',
    desiredVisual: visual.desiredVisual || '',
    imageUrl: visual.imageUrl || '',
    thumbnailUrl: visual.thumbnailUrl || visual.imageUrl || '',
    alt: visual.alt || visual.title || visual.parameter || 'KlinikIQ medikal görsel',
    qualityStatus: visual.qualityStatus || 'vercel-blob-ready',
  };
}

function addVisualIdsToInvestigations(investigations = [], visuals = []) {
  if (!Array.isArray(investigations) || !visuals.length) return investigations || [];

  return investigations.map((item) => {
    const matchedIds = visuals
      .filter((visual) => visualMatchesInvestigation(visual, item))
      .map((visual) => visual.id);

    if (!matchedIds.length) return item;

    return {
      ...item,
      imageIds: Array.from(new Set([...(item.imageIds || []), ...matchedIds])),
    };
  });
}

export function attachClinicalVisualsToCases(rawCases = [], clinicalVisualManifest = []) {
  const visualsByCaseId = clinicalVisualManifest.reduce((map, visual) => {
    if (!visual?.caseId || !visual?.imageUrl) return map;
    const list = map.get(visual.caseId) || [];
    list.push(normalizeVisualForCase(visual));
    map.set(visual.caseId, list);
    return map;
  }, new Map());

  return rawCases.map((clinicalCase) => {
    const externalVisuals = visualsByCaseId.get(clinicalCase.id) || [];
    if (!externalVisuals.length) return clinicalCase;

    const existingImages = clinicalCase.images || [];
    const existingIds = new Set(existingImages.map((image) => image?.id).filter(Boolean));
    const mergedImages = [
      ...existingImages,
      ...externalVisuals.filter((image) => !existingIds.has(image.id)),
    ];

    return {
      ...clinicalCase,
      images: mergedImages,
      investigations: addVisualIdsToInvestigations(clinicalCase.investigations || [], mergedImages),
    };
  });
}
