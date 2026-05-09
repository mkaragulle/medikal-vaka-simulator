const NOTE_MARKER_REGEX = /(Ayırıcı not|Ayrıcı not|Ayırıcı ipucu|Ayrıcı ipucu|Önemli not|Kritik not)\s*:\s*/i;

function normalizeText(value = '') {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function normalizeForCompare(value = '') {
  return normalizeText(value)
    .toLocaleLowerCase('tr')
    .replace(/[“”"'`´]/g, '')
    .replace(/\s*([.,;:!?])\s*/g, '$1');
}

function titleCaseLabel(value = '') {
  const text = normalizeText(value);
  if (!text) return '';
  return text.charAt(0).toLocaleUpperCase('tr') + text.slice(1);
}

export function splitPearlExplanation(explanation = '') {
  const text = normalizeText(explanation);
  if (!text) {
    return {
      bodyText: '',
      noteLabel: '',
      noteText: '',
    };
  }

  const match = text.match(NOTE_MARKER_REGEX);
  if (!match) {
    return {
      bodyText: text,
      noteLabel: '',
      noteText: '',
    };
  }

  const markerIndex = match.index ?? -1;
  const markerLength = match[0]?.length || 0;

  return {
    bodyText: normalizeText(text.slice(0, markerIndex)),
    noteLabel: titleCaseLabel(match[1] || 'Önemli not'),
    noteText: normalizeText(text.slice(markerIndex + markerLength)),
  };
}

export function getPearlBackContent(card = {}) {
  const backText = normalizeText(card.back);
  const { bodyText, noteLabel, noteText } = splitPearlExplanation(card.explanation);

  let detailText = bodyText;
  if (detailText) {
    const comparableBack = normalizeForCompare(backText);
    const comparableDetail = normalizeForCompare(detailText);
    if (comparableDetail && comparableBack.includes(comparableDetail)) {
      detailText = '';
    }
  }

  return {
    backText,
    detailText,
    noteLabel,
    noteText,
  };
}
