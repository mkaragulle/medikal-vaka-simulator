const TR_LOCALE = 'tr';
const MAX_FEEDBACK_CHIPS = 3;
const MAX_EXAM_NOTE_LENGTH = 260;

function normalizeText(value = '') {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim();
}

function asciiTR(value = '') {
  return normalizeText(value)
    .toLocaleLowerCase(TR_LOCALE)
    .replace(/[ıİ]/g, 'i')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[üÜ]/g, 'u')
    .replace(/[şŞ]/g, 's')
    .replace(/[öÖ]/g, 'o')
    .replace(/[çÇ]/g, 'c');
}

function bareKey(value = '') {
  return asciiTR(value)
    .replace(/anti\s*[-–—]?\s*ds\s*dna/g, 'anti dsdna')
    .replace(/c\s*3\s*\/\s*c\s*4/g, 'c3 c4')
    .replace(/[^a-z0-9+↑↓/ ]+/g, ' ')
    .replace(/\b(?:ve|veya|ile|icin|olan|olarak|bu|olguda|hasta|hastada|ilk|en|uygun|tedavi|secenek|dogru|yanit|onerisi|uygulama|uygulanir)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function wordsOf(value = '') {
  return bareKey(value).split(/\s+/).filter((word) => word.length > 1);
}

function semanticKey(value = '') {
  const normalized = asciiTR(value);
  if (!normalized) return '';
  if (/(?:epinefrin|adrenalin)/.test(normalized)) {
    if (/(?:im|intramuskuler|intramuscular|intramuskuler|kas ici|kas ici)/.test(normalized)) return 'im-epinefrin';
    if (/0[,.]?3|0[,.]?5|mg/.test(normalized)) return 'epinefrin-doz';
    return 'epinefrin';
  }
  if (/hipotansiyon|dusuk tansiyon|kan basinci dusuk|ta\s*<|sistolik/.test(normalized)) return 'hipotansiyon';
  if (/bronkospazm|hirilti|hisi?ltili|wheez|solunum sikintisi|dispne/.test(normalized)) return 'bronkospazm';
  if (/mukoz|anjioodem|anjiyoodem|dudak|uvula|orofarenks/.test(normalized)) return 'mukozal-tutulum';
  if (/anti\s*[-–—]?\s*ds\s*dna|dsdna/.test(normalized)) return 'anti-dsdna';
  if (/\bc\s*3\b|\bc\s*4\b|kompleman|complement/.test(normalized)) return 'kompleman';
  if (/\bana\b|antinukleer/.test(normalized)) return 'ana';
  if (/hb\s*s\s*ag|hbsag/.test(normalized)) return 'hbsag';
  if (/anti\s*[-–—]?\s*hbc|hbc\s*igm/.test(normalized)) return 'anti-hbc-igm';
  if (/hbv\s*dna/.test(normalized)) return 'hbv-dna';
  if (/potasyum|\bk\s*[+＋]?\b|hiperkalemi/.test(normalized)) return 'potasyum';
  if (/ekg|qrs|t dalga|sivri t|pr\b|qt\b/.test(normalized)) return 'ekg';
  if (/laktat/.test(normalized)) return 'laktat';
  if (/l[oö]kosit|wbc/.test(normalized)) return 'lokosit';
  if (/crp/.test(normalized)) return 'crp';
  if (/ate[sş]|febril/.test(normalized)) return 'ates';
  const words = wordsOf(value);
  return words.slice(0, 4).join('-');
}

function textSimilarity(a = '', b = '') {
  const aWords = new Set(wordsOf(a));
  const bWords = new Set(wordsOf(b));
  if (!aWords.size || !bWords.size) return 0;
  let intersection = 0;
  aWords.forEach((word) => { if (bWords.has(word)) intersection += 1; });
  return intersection / Math.min(aWords.size, bWords.size);
}

function isTooSimilarToAny(value = '', contextTexts = [], threshold = 0.82) {
  const text = normalizeText(value);
  const key = bareKey(text);
  if (!text || !key) return true;
  return contextTexts.some((context) => {
    const ctx = normalizeText(context);
    const ctxKey = bareKey(ctx);
    if (!ctxKey) return false;
    if (key.length > 22 && ctxKey.includes(key)) return true;
    if (ctxKey.length > 22 && key.includes(ctxKey)) return true;
    return textSimilarity(key, ctxKey) >= threshold;
  });
}

function sentenceList(value = '') {
  return normalizeText(value)
    .replace(/^\s*(?:spot\s*bilgi|sınav\s*notu|tus\s*işareti|tus\s*incisi)\s*[:：-]\s*/iu, '')
    .split(/(?<=[.!?])\s+/u)
    .map((sentence) => normalizeText(sentence))
    .filter(Boolean);
}

function ensureSentence(value = '') {
  const text = normalizeText(value);
  if (!text) return '';
  return /[.!?]$/u.test(text) ? text : `${text}.`;
}

function truncateText(value = '', limit = MAX_EXAM_NOTE_LENGTH) {
  const text = normalizeText(value);
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit).replace(/\s+\S*$/u, '').replace(/[,:;\-–—]+$/u, '').trim();
  return ensureSentence(cut || text.slice(0, limit).trim());
}

function isAnaphylaxisContext(text = '') {
  const normalized = asciiTR(text);
  return /anafilaksi|epinefrin|adrenalin|hipotansiyon|bronkospazm|mukoz/.test(normalized)
    && /epinefrin|adrenalin|anafilaksi/.test(normalized);
}

function isPerioperativeAnaphylaxisContext(text = '') {
  const normalized = asciiTR(text);
  return isAnaphylaxisContext(text) && /perioperatif|ameliyathane|genel anestezi|induksiyon|anestezi altinda|operasyon/.test(normalized);
}

function cleanExamNoteText(value = '', contextTexts = []) {
  let text = normalizeText(value)
    .replace(/^\s*(?:spot\s*bilgi|sınav\s*notu|tus\s*işareti|tus\s*incisi|kritik\s*hatırlatma)\s*[:：-]\s*/iu, '')
    .replace(/\b(?:Bu nedenle en uygun yanıt|Bu nedenle doğru yanıt|Doğru cevap)\s+[^.?!]+[.?!]?/giu, '')
    .replace(/\b(?:ilk ve tek hayati öneme sahip ilaçtır)\b/giu, 'ilk hayat kurtarıcı tedavidir')
    .replace(/\bIM\s+önerisi\b/giu, 'IM uygulama')
    .replace(/\bwheezing\b/giu, 'hışıltılı solunum')
    .replace(/\b([Ii])U\/ml\b/gu, '$1U/mL')
    .replace(/\bcomplement\s+C([34])\b/giu, 'C$1')
    .replace(/\s+/g, ' ')
    .trim();

  const joinedContext = contextTexts.join(' ');
  const anaphylaxisContext = `${text} ${joinedContext}`;
  if (isPerioperativeAnaphylaxisContext(anaphylaxisContext)) {
    return 'Perioperatif anafilakside tetikleyici ajan kesilir, oksijen-havayolu ve dolaşım desteği sağlanır; adrenalin hemodinamik ciddiyete göre geciktirilmez.';
  }
  if (isAnaphylaxisContext(anaphylaxisContext)) {
    return 'Anafilaksi kuralı: Hipotansiyon veya solunum bulgusu varsa ilk ilaç IM epinefrindir; oksijen, sıvı ve ek ilaçlar bunu izler.';
  }

  const uniqueSentences = [];
  sentenceList(text).forEach((sentence) => {
    if (!isTooSimilarToAny(sentence, [...contextTexts, ...uniqueSentences], 0.86)) uniqueSentences.push(sentence);
  });

  if (!uniqueSentences.length && text && !isTooSimilarToAny(text, contextTexts, 0.94)) uniqueSentences.push(text);
  return truncateText(uniqueSentences.slice(0, 2).join(' '), MAX_EXAM_NOTE_LENGTH);
}

function normalizeChip(value = '') {
  const raw = normalizeText(value)
    .replace(/^\s*(?:anahtar\s*kelime|ipucu|bulgu|kanıt|spot)\s*[:：-]\s*/iu, '')
    .replace(/\bIM\s+önerisi\b/giu, '')
    .replace(/\bAdrenalin\s*\(\s*Epinefrin\s*\)/giu, 'Epinefrin')
    .replace(/\bEpinefrin\s*0[,.]3\s*mg\b/giu, 'IM epinefrin')
    .replace(/\b3\s*mg\b/giu, '')
    .trim();
  const normalized = asciiTR(raw);
  if (!raw) return '';
  if (/(?:epinefrin|adrenalin)/.test(normalized)) return 'IM epinefrin';
  if (/hipotansiyon|dusuk tansiyon|kan basinci/.test(normalized)) return 'Hipotansiyon';
  if (/bronkospazm|hirilti|hisi?ltili|wheez|solunum sikintisi|dispne/.test(normalized)) return 'Bronkospazm';
  if (/mukoz|anjioodem|anjiyoodem|dudak|orofarenks/.test(normalized)) return 'Mukozal tutulum';
  if (/anti\s*[-–—]?\s*ds\s*dna|dsdna/.test(normalized)) return 'Anti-dsDNA↑';
  if (/c\s*3\s*\/\s*c\s*4|c3.*c4|kompleman/.test(normalized)) return 'C3/C4↓';
  if (/\bc\s*3\b/.test(normalized)) return 'C3↓';
  if (/\bc\s*4\b/.test(normalized)) return 'C4↓';
  if (/\bana\b|antinukleer/.test(normalized)) return 'ANA+';
  if (/hb\s*s\s*ag|hbsag/.test(normalized)) return 'HBsAg+';
  if (/anti\s*[-–—]?\s*hbc|hbc\s*igm/.test(normalized)) return 'Anti-HBc IgM+';
  if (/hbv\s*dna/.test(normalized)) return 'HBV DNA';
  if (/potasyum|hiperkalemi|\bk\s*[+＋]?\b/.test(normalized)) return 'K⁺ yüksek';
  if (/ekg|qrs|sivri t/.test(normalized)) return 'EKG değişikliği';
  if (/laktat/.test(normalized)) return 'Laktat yüksek';
  if (/l[oö]kosit/.test(normalized)) return 'Lökositoz';
  if (/crp/.test(normalized)) return 'CRP yüksek';
  if (/ate[sş]/.test(normalized)) return 'Ateş';
  return raw
    .replace(/\s*\([^)]{0,28}\)\s*/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isWeakChip(value = '') {
  const text = normalizeText(value);
  const normalized = asciiTR(text);
  if (!text) return true;
  if (/onerisi|anahtar kelime|spot bilgi|klinik gerekce|dogru cevap|secenek|yanit/.test(normalized)) return true;
  if (/^\d+(?:[,.]\d+)?\s*mg$/i.test(text)) return true;
  if (text.length > 34) return true;
  if (text.split(/\s+/).length > 4 && !/[↑↓+/]/u.test(text)) return true;
  return false;
}

function cleanKeywordList(keywords = [], contextTexts = []) {
  const seen = new Set();
  const chips = [];
  (keywords || []).forEach((keyword) => {
    const chip = normalizeChip(keyword);
    if (isWeakChip(chip)) return;
    const key = semanticKey(chip);
    if (!key || seen.has(key)) return;
    if (chips.some((existing) => semanticKey(existing) === key)) return;
    seen.add(key);
    chips.push(chip);
  });

  const joinedContext = `${contextTexts.join(' ')} ${keywords.join(' ')}`;
  if (isAnaphylaxisContext(joinedContext)) {
    const preferred = ['IM epinefrin', 'Hipotansiyon', 'Bronkospazm'];
    return preferred.filter((chip) => {
      const key = semanticKey(chip);
      if (seen.has(key) || chips.some((item) => semanticKey(item) === key)) return false;
      seen.add(key);
      return true;
    }).concat(chips).slice(0, MAX_FEEDBACK_CHIPS);
  }

  return chips.slice(0, MAX_FEEDBACK_CHIPS);
}

function cleanTrap(value = '', contextTexts = []) {
  const text = cleanExamNoteText(value, []);
  if (!text || isTooSimilarToAny(text, contextTexts, 0.78)) return '';
  return truncateText(text, 210);
}

function cleanPearls(pearls = [], contextTexts = []) {
  const seen = new Set();
  return (pearls || [])
    .map((pearl, index) => {
      const label = normalizeText(pearl?.label || pearl?.title || (index === 0 ? 'Sınav incisi' : 'Hap bilgi'));
      const text = cleanExamNoteText(pearl?.text || pearl?.description || pearl, contextTexts);
      if (!text || isTooSimilarToAny(text, contextTexts, 0.80)) return null;
      const key = semanticKey(`${label} ${text}`) || bareKey(`${label} ${text}`);
      if (!key || seen.has(key)) return null;
      seen.add(key);
      contextTexts.push(text);
      return { label, text };
    })
    .filter(Boolean)
    .slice(0, 3);
}

export function feedbackDuplicationGate({
  signal = {},
  pearls = [],
  reasoningText = '',
  evidenceChain = [],
  managementSteps = [],
  correctAnswer = '',
} = {}) {
  const evidenceTexts = (evidenceChain || []).map((item) => `${item?.title || ''} ${item?.text || item || ''}`);
  const managementTexts = (managementSteps || []).map((item) => `${item?.title || ''} ${item?.text || item || ''}`);
  const contextTexts = [reasoningText, correctAnswer, ...evidenceTexts, ...managementTexts].map(normalizeText).filter(Boolean);

  const spotPearl = cleanExamNoteText(signal.spotPearl || '', contextTexts);
  const signalContext = [...contextTexts, spotPearl].filter(Boolean);
  const keywords = cleanKeywordList(signal.keywords || [], signalContext);
  const examTrap = cleanTrap(signal.examTrap || '', signalContext);
  const cleanedPearls = cleanPearls(pearls, signalContext);

  const hasSignalContent = Boolean(
    spotPearl
    || keywords.length
    || examTrap
    || signal.appearedYears?.length
    || signal.isPastQuestionDerived
    || signal.appearanceCount > 1
  );

  return {
    signal: {
      ...signal,
      spotPearl,
      keywords,
      examTrap,
      hasContent: hasSignalContent,
    },
    pearls: cleanedPearls,
  };
}

export { MAX_FEEDBACK_CHIPS };
