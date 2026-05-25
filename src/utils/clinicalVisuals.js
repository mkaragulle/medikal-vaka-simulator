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

export function visualMatchesInvestigation(image = {}, item = {}) {
  if (!image || !item) return false;

  if (image.investigationId && item.id && image.investigationId === item.id) return true;
  if (Array.isArray(item.imageIds) && item.imageIds.includes(image.id)) return true;

  const itemText = collectInvestigationText(item);
  const normalizedItemText = normalizeClinicalVisualText(itemText);
  if (!normalizedItemText) return false;

  const parameter = image.parameter || image.title || '';
  const result = image.result || '';
  const rawRow = image.rawInvestigationRow || '';

  const normalizedParameter = normalizeClinicalVisualText(parameter);
  if (normalizedParameter && normalizedParameter.length >= 4) {
    if (normalizedItemText.includes(normalizedParameter) || normalizedParameter.includes(normalizedItemText)) return true;
  }

  if (rawRow && overlapScore(rawRow, itemText) >= 3) return true;
  if (result && overlapScore(result, itemText) >= 3) return true;
  if (parameter && overlapScore(parameter, itemText) >= 2) return true;

  return false;
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
