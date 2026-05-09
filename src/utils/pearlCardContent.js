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

function formatLeadSentence(firstSentence = '') {
  const cleaned = normalizeText(firstSentence)
    .replace(/\s+ilişkisi\s+doğru\s+cevaba\s+götürür\.?$/iu, '')
    .replace(/\s+doğru\s+cevaba\s+götürür\.?$/iu, '')
    .replace(/\s+uygun\s+yanıta\s+götürür\.?$/iu, '')
    .replace(/\s+birlikte\s+değerlendirilir\.?$/iu, '')
    .replace(/[.;:]+$/u, '')
    .trim();
  if (!cleaned) return '';
  return /^Anahtar ipucu:/iu.test(cleaned) ? cleaned : `Anahtar ipucu: ${cleaned}`;
}

function splitLeadSentence(backText = '') {
  const text = normalizeText(backText);
  if (!text) {
    return { leadText: '', mainText: '' };
  }

  const explicitChain = text.match(/^(.{0,220}?→.{0,260}?(?:birlikte değerlendirilir|doğru cevaba götürür|uygun yanıta götürür)\.)\s+(.+)$/iu);
  if (explicitChain?.[1] && explicitChain?.[2]) {
    return {
      leadText: formatLeadSentence(explicitChain[1]),
      mainText: normalizeText(explicitChain[2]),
    };
  }

  const sentences = text.split(/(?<=[.!?])\s+/).map((item) => normalizeText(item)).filter(Boolean);
  if (!sentences.length) {
    return { leadText: '', mainText: text };
  }

  const firstSentence = sentences[0];
  const remaining = normalizeText(sentences.slice(1).join(' '));
  const looksLikeChain = (firstSentence.match(/→/g) || []).length >= 2;
  const isClueSentence = /doğru cevaba götürür/i.test(firstSentence) || /ayırt ettirici ipucu/i.test(firstSentence);

  if ((looksLikeChain || isClueSentence) && remaining) {
    return {
      leadText: formatLeadSentence(firstSentence),
      mainText: remaining,
    };
  }

  return { leadText: '', mainText: text };
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
  const rawBackText = normalizeText(card.back);
  const { leadText, mainText } = splitLeadSentence(rawBackText);
  const { bodyText, noteLabel, noteText } = splitPearlExplanation(card.explanation);

  let detailText = bodyText;
  if (detailText) {
    const comparableBack = normalizeForCompare(mainText || rawBackText);
    const comparableDetail = normalizeForCompare(detailText);
    if (comparableDetail && comparableBack.includes(comparableDetail)) {
      detailText = '';
    }
  }

  const backText = mainText || rawBackText;
  const isCompactBack = backText.length > 138;
  const hasStructuredBack = Boolean(backText || detailText || noteText);

  return {
    leadText,
    backText,
    detailText,
    noteLabel,
    noteText,
    isCompactBack,
    hasStructuredBack,
  };
}
