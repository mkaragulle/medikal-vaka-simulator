const NOTE_MARKER_REGEX = /(Ayırıcı not|Ayrıcı not|Ayırıcı ipucu|Ayrıcı ipucu|Önemli not|Kritik not)\s*:?\s*/i;
const TUS_TIP_MARKER_REGEX = /(TUS ipucu|Sınav ipucu|Anahtar ipucu|Kritik ipucu)\s*:?\s*/i;
const ANSWER_MARKER_REGEX = /^Yanıt\s*:?\s*$/iu;

export const PEARL_META_FORBIDDEN_PATTERNS = [
  /\bsorusunda\b/iu,
  /\bbu\s+soruda\b/iu,
  /\bsoru\s+kökünde\b/iu,
  /\bdoğru\s+cevaba\s+götüren\b/iu,
  /\bdoğru\s+cevabı\s+destekleyen\b/iu,
  /\bhangi\s+ipuçları\s+doğru\s+cevaba\s+götürür\b/iu,
  /\bTUS\s+sorusunda\b/iu,
  /\bkaynak\s+soruda\b/iu,
  /\byukarıdaki\s+soruda\b/iu,
  /\bseçeneklerde\b/iu,
  /\bşıklarda\b/iu,
  /\bdoğru\s+şık\b/iu,
  /\byanlış\s+şık\b/iu,
  /\bcevap\s+anahtarı\b/iu,
  /\bsoruya\s+göre\b/iu,
  /\bbu\s+vaka\s+sorusunda\b/iu,
  /\bverilen\s+soruda\b/iu,
];

export const PEARL_AI_CARD_FORBIDDEN_EXPRESSIONS = Object.freeze([
  'sorusunda',
  'bu soruda',
  'soru kökünde',
  'doğru cevaba götüren',
  'doğru cevabı destekleyen',
  'doğru şık',
  'yanlış şık',
  'seçeneklerde',
  'şıklarda',
  'yukarıdaki soruda',
  'kaynak soruda',
  'cevap anahtarı',
]);

export const PEARL_AI_CARD_OUTPUT_SCHEMA = Object.freeze({
  front: 'Aktif hatırlama sorusu',
  answer: 'Net cevap',
  explanation: '1–2 cümlelik kısa gerekçe',
  tusTip: 'Sınavda yakalanacak anahtar patern',
  differentialNote: 'Benzer kavramdan ayrım',
  branch: 'Branş',
  topic: 'Konu',
  difficulty: 'easy | medium | hard',
  sourceType: 'embedded | ai_generated | user_created',
});

function polishPearlMedicalTerminology(value = '') {
  return String(value || '')
    .replace(/\bN\.\s*fibularis\s+communis\b/giu, 'nervus fibularis communis')
    .replace(/\bn\.\s*fibularis\s+communis\b/giu, 'nervus fibularis communis')
    .replace(/\bN\.\s*intercostobrachialis\b/giu, 'nervus intercostobrachialis')
    .replace(/\bn\.\s*intercostobrachialis\b/giu, 'nervus intercostobrachialis')
    .replace(/\bN\.\s*oculomotorius\b/giu, 'nervus oculomotorius')
    .replace(/\bn\.\s*oculomotorius\b/giu, 'nervus oculomotorius')
    .replace(/\bN\.\s*abducens\b/giu, 'nervus abducens')
    .replace(/\bn\.\s*abducens\b/giu, 'nervus abducens')
    .replace(/\bN\.\s*axillaris\b/giu, 'nervus axillaris')
    .replace(/\bn\.\s*axillaris\b/giu, 'nervus axillaris')
    .replace(/\bN\.\s*tibialis\b/giu, 'nervus tibialis')
    .replace(/\bn\.\s*tibialis\b/giu, 'nervus tibialis')
    .replace(/\bV\.\s*saphena\s+magna\b/giu, 'vena saphena magna')
    .replace(/\bv\.\s*saphena\s+magna\b/giu, 'vena saphena magna')
    .replace(/\bV\.\s*saphena\s+parva\b/giu, 'vena saphena parva')
    .replace(/\bv\.\s*saphena\s+parva\b/giu, 'vena saphena parva')
    .replace(/\bA\.\s*communicans\s+posterior\b/giu, 'arteria communicans posterior')
    .replace(/\ba\.\s*communicans\s+posterior\b/giu, 'arteria communicans posterior')
    .replace(/\bS\.\s*pneumoniae\b/gu, 'Streptococcus pneumoniae')
    .replace(/\bS\.\s*aureus\b/gu, 'Staphylococcus aureus')
    .replace(/\bH\.\s*influenzae\b/gu, 'Haemophilus influenzae')
    .replace(/\bM\.\s*catarrhalis\b/gu, 'Moraxella catarrhalis')
    .replace(/\bN\.\s*meningitidis\b/gu, 'Neisseria meningitidis')
    .replace(/\bC\.\s*difficile\b/gu, 'Clostridioides difficile')
    .replace(/\bC\.\s*tetani\b/gu, 'Clostridium tetani')
    .replace(/\bV\.\s*cholerae\b/gu, 'Vibrio cholerae')
    .replace(/\bLikefaksiyon\s+nekrozu\b/giu, 'Sıvılaşma nekrozu')
    .replace(/\bRed\s+man\/sendromu\b/giu, 'kızarma (red man) sendromu')
    .replace(/\s*→\s*/g, ', ')
    .replace(/\s+/g, ' ')
    .trim();
}

function capitalizeTerminologyLead(value = '') {
  return String(value || '').replace(/^(nervus|arteria|vena|intravenöz|kızarma)/u, (match) => match.charAt(0).toLocaleUpperCase('tr') + match.slice(1));
}

function normalizeText(value = '') {
  return capitalizeTerminologyLead(polishPearlMedicalTerminology(value).replace(/\s+/g, ' ').trim());
}

export function normalizePearlTextForCompare(value = '') {
  return normalizeText(value)
    .toLocaleLowerCase('tr')
    .replace(/[“”"'`´]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
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

function addPeriod(value = '') {
  const text = normalizeText(value);
  if (!text) return '';
  return /[.!?]$/u.test(text) ? text : `${text}.`;
}

function uniqueSentences(value = '') {
  const seen = new Set();
  return normalizeText(value)
    .split(/(?<=[.!?])\s+/u)
    .map((item) => normalizeText(item))
    .filter((item) => {
      if (!item) return false;
      const key = normalizePearlTextForCompare(item);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .join(' ');
}

function tokenOverlapRatio(a = '', b = '') {
  const aTokens = normalizePearlTextForCompare(a).split(' ').filter((token) => token.length > 2);
  const bSet = new Set(normalizePearlTextForCompare(b).split(' ').filter(Boolean));
  if (!aTokens.length || !bSet.size) return 0;
  const matched = aTokens.filter((token) => bSet.has(token)).length;
  return matched / aTokens.length;
}

function stripFrontDuplication(front = '', value = '') {
  const text = String(value || '').trim();
  const frontText = normalizeText(front);
  if (!text || !frontText) return text;

  const comparableFront = normalizePearlTextForCompare(frontText);
  const lines = text.split(/\n+/u).map((line) => line.trim()).filter(Boolean);
  while (lines.length && normalizePearlTextForCompare(lines[0]) === comparableFront) {
    lines.shift();
  }
  let nextText = lines.join('\n').trim();
  if (!nextText) return '';

  const firstSentenceMatch = nextText.match(/^(.+?[.!?])(?:\s+|$)([\s\S]*)$/u);
  if (firstSentenceMatch?.[1]) {
    const firstSentence = firstSentenceMatch[1].trim();
    const comparableSentence = normalizePearlTextForCompare(firstSentence);
    if (comparableSentence === comparableFront || comparableSentence.startsWith(comparableFront)) {
      nextText = (firstSentenceMatch[2] || '').trim();
    }
  }

  return nextText;
}

function extractLabeledBack(back = '', front = '') {
  const raw = stripFrontDuplication(front, String(back || '').trim());
  if (!raw) return { answer: '', explanation: '', tusTip: '', differentialNote: '' };
  const lines = raw.split(/\n+/u).map((line) => line.trim()).filter(Boolean);
  const out = { answer: '', explanation: '', tusTip: '', differentialNote: '' };
  let section = '';

  for (const line of lines) {
    const tusMatch = line.match(TUS_TIP_MARKER_REGEX);
    const noteMatch = line.match(NOTE_MARKER_REGEX);
    if (tusMatch && tusMatch.index === 0) {
      section = 'tusTip';
      const value = normalizeText(line.slice(tusMatch[0].length));
      if (value) out.tusTip = normalizeText([out.tusTip, value].filter(Boolean).join(' '));
      continue;
    }
    if (noteMatch && noteMatch.index === 0) {
      section = 'differentialNote';
      const value = normalizeText(line.slice(noteMatch[0].length));
      if (value) out.differentialNote = normalizeText([out.differentialNote, value].filter(Boolean).join(' '));
      continue;
    }
    if (ANSWER_MARKER_REGEX.test(line)) {
      section = 'answer';
      continue;
    }
    if (/^Kısa gerekçe\s*:?\s*$/iu.test(line)) {
      section = 'explanation';
      continue;
    }
    if (section && out[section] !== undefined) {
      out[section] = normalizeText([out[section], line].filter(Boolean).join(' '));
    } else if (!out.answer) {
      out.answer = line;
      section = 'answer';
    } else {
      out.explanation = normalizeText([out.explanation, line].filter(Boolean).join(' '));
      section = 'explanation';
    }
  }

  return out;
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
  return /^Anahtar ipucu:/iu.test(cleaned) ? cleaned.replace(/^Anahtar ipucu:/iu, '').trim() : cleaned;
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

  const sentences = text.split(/(?<=[.!?])\s+/u).map((item) => normalizeText(item)).filter(Boolean);
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
    noteLabel: titleCaseLabel(match[1] || 'Ayırıcı not'),
    noteText: normalizeText(text.slice(markerIndex + markerLength)),
  };
}

export function rewritePearlFront(card = {}) {
  const rawFront = normalizeText(card.front || card.question || '');
  if (!rawFront) return '';
  const topic = normalizeText(card.topic || rawFront.replace(/\s+sorusunda[\s\S]*$/iu, ''));

  const keywordMatch = rawFront.match(/^(.+?)\s+sorusunda\s+doğru\s+cevaba\s+götüren\s+ayırt\s+ettirici\s+ipuçları\s+hangileridir\??$/iu);
  if (keywordMatch) return `${topic || keywordMatch[1]} hangi anahtar paternle hatırlanır?`;

  const trapMatch = rawFront.match(/^(.+?)\s+sorusunda\s+hangi\s+yanıltıcı\s+seçenek\s+veya\s+algoritma\s+tuzağına\s+dikkat\s+edilmelidir\??$/iu);
  if (trapMatch) return `${topic || trapMatch[1]} hangi ipucuyla benzer tablolardan ayrılır?`;

  return rawFront
    .replace(/\s+sorusunda\s+doğru\s+cevaba\s+götüren\s+/giu, ' için ')
    .replace(/\s+sorusunda\s+doğru\s+cevabı\s+destekleyen\s+/giu, ' için ')
    .replace(/\bbu\s+soruda\b/giu, 'bu klinik tabloda')
    .replace(/\bTUS\s+sorusunda\b/giu, 'TUS’ta')
    .replace(/\bkaynak\s+soruda\b/giu, 'kaynak klinik paterninde')
    .replace(/\byukarıdaki\s+soruda\b/giu, 'bu klinik patern için')
    .replace(/\bseçeneklerde\b/giu, 'ayırt ettirici bilgilerde')
    .replace(/\bşıklarda\b/giu, 'ayırt ettirici bilgilerde')
    .replace(/\bdoğru\s+şık\b/giu, 'doğru yanıt')
    .replace(/\byanlış\s+şık\b/giu, 'çeldirici')
    .replace(/\bcevap\s+anahtarı\b/giu, 'yanıt')
    .replace(/\s+/g, ' ')
    .trim();
}

function removeAnswerExplanationDuplication(answer = '', explanation = '') {
  const answerKey = normalizePearlTextForCompare(answer);
  const text = normalizeText(explanation);
  if (!answerKey || !text) return text;
  const textKey = normalizePearlTextForCompare(text);
  if (textKey === answerKey || textKey.startsWith(`${answerKey} `)) return '';
  return text;
}

export function normalizePearlCardFields(card = {}) {
  const front = rewritePearlFront(card);
  const parsedBack = extractLabeledBack(card.back, front);
  const rawExplanation = stripFrontDuplication(front, normalizeText(card.explanation));
  const { bodyText, noteLabel, noteText } = splitPearlExplanation(rawExplanation);
  const legacyLead = splitLeadSentence(parsedBack.answer || card.back);

  const answer = stripFrontDuplication(front, normalizeText(card.answer || parsedBack.answer || legacyLead.mainText || card.back));
  let explanation = normalizeText(card.explanation && !NOTE_MARKER_REGEX.test(card.explanation) ? rawExplanation : bodyText || parsedBack.explanation);
  let tusTip = normalizeText(card.tusTip || parsedBack.tusTip || legacyLead.leadText);
  let differentialNote = normalizeText(card.differentialNote || parsedBack.differentialNote || noteText);

  explanation = stripFrontDuplication(front, removeAnswerExplanationDuplication(answer, explanation));
  tusTip = stripFrontDuplication(front, tusTip);
  differentialNote = stripFrontDuplication(front, differentialNote);

  const answerKey = normalizePearlTextForCompare(answer);
  const explanationKey = normalizePearlTextForCompare(explanation);
  if (tusTip && normalizePearlTextForCompare(tusTip) === answerKey) tusTip = '';
  if (tusTip && explanationKey && normalizePearlTextForCompare(tusTip) === explanationKey) tusTip = '';
  if (tusTip && answer.includes('→') && tusTip.includes('→') && tokenOverlapRatio(tusTip, answer) > 0.72) tusTip = '';
  if (differentialNote && normalizePearlTextForCompare(differentialNote) === answerKey) differentialNote = '';
  if (differentialNote && explanationKey && normalizePearlTextForCompare(differentialNote) === explanationKey) differentialNote = '';
  if (differentialNote && explanation && tokenOverlapRatio(differentialNote, explanation) > 0.84) differentialNote = '';

  return {
    ...card,
    front,
    answer: addPeriod(answer),
    back: addPeriod(answer),
    explanation: addPeriod(explanation),
    tusTip: addPeriod(tusTip),
    differentialNote: addPeriod(differentialNote),
    noteLabel: card.noteLabel || noteLabel || 'Ayırıcı not',
  };
}

export function getPearlFrontText(card = {}) {
  return normalizePearlCardFields(card).front;
}

export function hasPearlMetaExpression(card = {}) {
  const text = [card.front, card.back, card.answer, card.explanation, card.tusTip, card.differentialNote].filter(Boolean).join(' ');
  return PEARL_META_FORBIDDEN_PATTERNS.some((pattern) => pattern.test(text));
}

export function normalizeAIPearlCardOutput(output = {}) {
  const rawHasForbiddenMeta = hasPearlMetaExpression(output);
  const normalized = normalizePearlCardFields({
    ...output,
    sourceType: output.sourceType || 'ai_generated',
    answer: output.answer || output.back,
    back: output.back || output.answer,
  });
  const normalizedHasForbiddenMeta = hasPearlMetaExpression(normalized);
  const qualityWarnings = [];
  if (rawHasForbiddenMeta) qualityWarnings.push('AI hap kart çıktısında bağlamsız meta-sınav ifadesi saptandı; üretim yeniden istenmeli.');
  if (normalizedHasForbiddenMeta) qualityWarnings.push('Normalize edilmiş hap kartta hâlâ bağlamsız meta-sınav ifadesi var.');
  return {
    ...normalized,
    sourceType: normalized.sourceType || 'ai_generated',
    qualityWarnings,
    isPearlCardOutputAccepted: !rawHasForbiddenMeta && !normalizedHasForbiddenMeta && Boolean(normalized.front && normalized.answer),
  };
}

export function getPearlBackContent(card = {}) {
  const normalized = normalizePearlCardFields(card);
  const backText = normalized.answer || normalized.back || '';
  const detailText = normalized.explanation || '';
  const tusTipText = normalized.tusTip || '';
  const noteText = normalized.differentialNote || '';
  const noteLabel = normalized.noteLabel || 'Ayırıcı not';

  const isCompactBack = backText.length > 138;
  const hasStructuredBack = Boolean(backText || detailText || tusTipText || noteText);

  return {
    frontText: normalized.front,
    leadText: '',
    tusTipText,
    backText,
    detailText,
    noteLabel,
    noteText,
    isCompactBack,
    hasStructuredBack,
  };
}
