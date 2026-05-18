function uniqueStrings(items = []) {
  return Array.from(new Set((items || []).map((item) => String(item || '').trim()).filter(Boolean)));
}

function normalizeYears(value) {
  if (!Array.isArray(value)) return [];
  return Array.from(new Set(value
    .map((year) => Number.parseInt(year, 10))
    .filter((year) => Number.isInteger(year) && year >= 1987 && year <= 2100)))
    .sort((a, b) => a - b);
}

export function resolveExamSignal(item = {}) {
  if (item.hideExamSignal === true) {
    return {
      appearedYears: [],
      appearanceCount: 0,
      isPastQuestionDerived: false,
      sourceExamLabel: '',
      keywords: [],
      spotPearl: '',
      examTrap: '',
      hasContent: false,
    };
  }

  const feedback = item.diagnosis?.answerFeedback || item.answerFeedback || {};
  const examMeta = item.examMeta || {};
  const appearedYears = normalizeYears(item.appearedYears || examMeta.appearedYears || []);
  const isPastQuestionDerived = Boolean(item.isPastQuestionDerived || examMeta.isPastQuestionDerived || appearedYears.length);
  const appearanceCount = Number.isFinite(item.appearanceCount)
    ? item.appearanceCount
    : Number.isFinite(examMeta.appearanceCount)
      ? examMeta.appearanceCount
      : appearedYears.length;
  const keywords = uniqueStrings([
    ...(Array.isArray(item.keyWords) ? item.keyWords : []),
    ...(Array.isArray(item.keywords) ? item.keywords : []),
    ...(Array.isArray(examMeta.keywords) ? examMeta.keywords : []),
    ...(Array.isArray(item.patientIntro?.distinctiveClues) ? item.patientIntro.distinctiveClues.slice(0, 5) : []),
    ...(Array.isArray(feedback.evidenceChain) ? feedback.evidenceChain.slice(0, 3).map((entry) => typeof entry === 'string' ? entry : entry?.text || entry?.title) : []),
  ]).slice(0, 6);
  const spotPearl = item.spotPearl || item.spotPearlText || examMeta.spotPearl || feedback.spotPearl || feedback.pearls?.[0]?.text || feedback.pearls?.[0] || item.diagnosis?.pearls?.[0] || '';
  const examTrap = item.examTrap || item.trap || examMeta.examTrap || feedback.examTrap || feedback.trap || '';
  const sourceExamLabel = item.sourceExamLabel || examMeta.sourceExamLabel || (isPastQuestionDerived ? 'TUS' : '');

  return {
    appearedYears,
    appearanceCount: Math.max(0, Number(appearanceCount || 0)),
    isPastQuestionDerived,
    sourceExamLabel,
    keywords,
    spotPearl: typeof spotPearl === 'string' ? spotPearl : '',
    examTrap: typeof examTrap === 'string' ? examTrap : '',
    hasContent: Boolean(appearedYears.length || isPastQuestionDerived || keywords.length || spotPearl || examTrap),
  };
}

export function formatAppearedYears(signal = {}) {
  const years = normalizeYears(signal.appearedYears || []);
  if (!years.length) return signal.isPastQuestionDerived ? 'Çıkmış bilgi' : '';
  const count = signal.appearanceCount || years.length;
  return years.length === 1 ? `Çıkmış: ${years[0]}` : `Çıkmış: ${years.join(', ')} (${count} kez)`;
}
