const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];

const GENERIC_FEEDBACK_PATTERNS = [
  /bu\s+tabloda\s+en\s+uygun\s+yakla[şs][ıi]m/iu,
  /olgudaki\s+verilerle\s+en\s+iyi\s+uyumludur/iu,
  /bu\s+se[çc]enek\s+olgudaki\s+verilerle\s+uyumludur/iu,
  /tek\s+en\s+iyi\s+yan[ıi]t\s+de[ğg]ildir/iu,
  /farkl[ıi]\s+klinik\s+tabloda\s+uygun\s+olabilir/iu,
  /baz[ıi]\s+klinik\s+durumlarda\s+g[üu]ndeme\s+gelebilir/iu,
  /olgudaki\s+ana\s+ipu[çc]lar[ıi]n[ıi]\s+tek\s+ba[şs][ıi]na\s+a[çc][ıi]klamaz/iu,
  /klinik\s+ba[ğg]lamda\s+de[ğg]erlendirilir/iu,
  /bu\s+nedenle\s+do[ğg]ru\s+cevap\s+budur/iu,
  /bu\s+se[çc]enek\s+uygun\s+de[ğg]ildir\.?$/iu,
  /beklenen\s+ana\s+ipu[çc]lar[ıi]/iu,
  /yan[ıi]t\s+ekseni/iu,
  /verilen\s+[öo][ğg]renme\s+hedefi/iu,
  /karar\s+noktas[ıi]n[ıi]\s+g[öo]sterir/iu,
];

const EVIDENCE_INTERPRETATION_PATTERNS = [
  /destekler/iu,
  /d[üu][şs][üu]nd[üu]r[üu]r/iu,
  /uyumludur/iu,
  /g[öo]sterir/iu,
  /kan[ıi]tlar/iu,
  /i[şs]aret\s+eder/iu,
  /tipiktir/iu,
  /ay[ıi]rt\s+ettirir/iu,
  /tan[ıi]s[ıi]/iu,
];

const QUESTION_BROADNESS_PATTERNS = [
  /\ben\s+[öo]nemli\b/iu,
  /\ben\s+uygun\b/iu,
  /\bilk\s+yakla[şs][ıi]m\b/iu,
  /\bilk\s+basamak\b/iu,
  /\bkomplikasyon\b/iu,
];

const CLINICAL_NARROWING_TERMS = [
  /acil/iu,
  /hayat\s+kurtar[ıi]c[ıi]/iu,
  /ilk\s+ila[çc]/iu,
  /ilk\s+tedavi/iu,
  /tan[ıi]y[ıi]\s+do[ğg]rulamak/iu,
  /aktivite\s+takibi/iu,
  /izlem/iu,
  /monitorizasyon/iu,
  /profilaksi/iu,
  /tarama/iu,
  /desteklemek/iu,
  /kesinle[şs]tirmek/iu,
];

const STOPWORDS = new Set([
  've', 'veya', 'ile', 'icin', 'için', 'olan', 'olarak', 'hasta', 'hastada', 'olgu', 'olguda',
  'klinik', 'soru', 'yanit', 'yanıt', 'dogru', 'doğru', 'cevap', 'secenek', 'seçenek', 'en',
  'uygun', 'ilk', 'hangi', 'hangisidir', 'nedir', 'bu', 'veri', 'bulgu', 'bulgusu', 'muayene',
  'laboratuvar', 'vital', 'değer', 'degeri', 'değeri', 'saptanır', 'saptanir', 'vardır', 'vardir',
]);

function cleanText(value = '') {
  return String(value ?? '')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .trim();
}

function normalize(value = '') {
  return cleanText(value)
    .toLocaleLowerCase('tr')
    .replace(/[ıİ]/g, 'i')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[üÜ]/g, 'u')
    .replace(/[şŞ]/g, 's')
    .replace(/[öÖ]/g, 'o')
    .replace(/[çÇ]/g, 'c')
    .replace(/[^a-z0-9+/%\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokens(value = '') {
  return normalize(value)
    .split(/\s+/u)
    .filter((token) => token.length > 2 && !STOPWORDS.has(token));
}

function ensureSentence(value = '') {
  const text = cleanText(value)
    .replace(/^(?:neden\s+do[ğg]ru\??|do[ğg]ru\s+cevap|a[çc][ıi]klama|gerek[çc]e|tus\s+ipucu|hap\s+bilgi|s[ıi]nav\s+notu)\s*[:：-]\s*/iu, '')
    .replace(/[\s,;:]+$/u, '')
    .trim();
  if (!text) return '';
  const cased = text.charAt(0).toLocaleUpperCase('tr') + text.slice(1);
  return /[.!?]$/u.test(cased) ? cased : `${cased}.`;
}

function splitSentences(value = '') {
  return cleanText(value)
    .split(/(?<=[.!?])\s+/u)
    .map((item) => item.trim())
    .filter(Boolean);
}

function dedupeSentences(value = '', maxSentences = 3) {
  const seen = new Set();
  const output = [];
  splitSentences(value).forEach((sentence) => {
    const fixed = ensureSentence(sentence);
    const key = normalize(fixed);
    if (!key || seen.has(key)) return;
    seen.add(key);
    output.push(fixed);
  });
  return output.slice(0, maxSentences).join(' ') || ensureSentence(value);
}

function optionList(question = {}) {
  const raw = Array.isArray(question.options) ? question.options : [];
  return OPTION_IDS.map((id, index) => {
    const source = raw.find((item) => String(item?.id || '').toUpperCase() === id) ?? raw[index];
    return { id, text: cleanText(typeof source === 'string' ? source : source?.text || '') };
  }).filter((option) => option.text);
}

function getCorrectText(question = {}) {
  const id = String(question.correctAnswer || '').toUpperCase();
  return optionList(question).find((option) => option.id === id)?.text || cleanText(question.correctAnswerText || '');
}

function preAnswerText(question = {}) {
  const vitals = Array.isArray(question.compactVitals) ? question.compactVitals : [];
  const data = Array.isArray(question.compactObjectiveData) ? question.compactObjectiveData : [];
  return [
    question.stem,
    question.question,
    ...vitals.flatMap((item) => [item?.label, item?.value]),
    ...data.flatMap((item) => [item?.label, item?.value]),
  ].filter(Boolean).join(' | ');
}

function hasGenericFeedback(value = '') {
  return GENERIC_FEEDBACK_PATTERNS.some((pattern) => pattern.test(String(value || '')));
}

function hasTruncatedText(value = '') {
  const text = cleanText(value);
  if (!text) return true;
  if (/\.{2,}|…/u.test(text)) return true;
  if (/\b(?:ve|veya|ile|çünkü|ancak|fakat|bu nedenle|olarak|için|açısından|nedeniyle)$/iu.test(text.replace(/[.!?]$/u, ''))) return true;
  return false;
}

function hasRationaleConnector(value = '') {
  return /çünkü|nedeniyle|eşlik|beklenir|gösterir|destekler|öncelik|ayırır|patofizyoloji|mekanizma|aktivite|izlem|takip|kontrendike|ilk|acil|doğrul|hedeflediği|karşıladığı|açıkladığı|stabilizasyon|uyumludur/iu.test(value);
}

function hasContrastLogic(value = '') {
  return /burada|bu olguda|bu vakada|ancak|oysa|fakat|beklenir|düşündürür|desteklenmez|uymaz|uygun değildir|daha çok|tipiktir|verilmemiştir|saptanmamıştır|eşlik eder/iu.test(value);
}

function optionFeedbackErrors(question = {}) {
  const errors = [];
  const feedback = question.wrongOptionFeedback || {};
  const correctId = String(question.correctAnswer || '').toUpperCase();
  OPTION_IDS.forEach((id) => {
    const text = cleanText(feedback[id] || '');
    if (!text || text.length < 45) errors.push(`${id} seçenek açıklaması kısa veya eksik`);
    if (hasTruncatedText(text)) errors.push(`${id} seçenek açıklaması yarım kalmış`);
    if (hasGenericFeedback(text)) errors.push(`${id} seçenek açıklaması şablon/jenerik`);
    if (id === correctId) {
      if (!hasRationaleConnector(text) || /^bu\s+se[çc]enek/iu.test(text) && text.length < 75) errors.push('doğru seçenek açıklaması yeterince klinik gerekçe içermiyor');
    } else if (!hasContrastLogic(text)) {
      errors.push(`${id} yanlış seçenek açıklaması ayırt ettirici karşılaştırma içermiyor`);
    }
  });
  return Array.from(new Set(errors));
}

function evidenceErrors(question = {}) {
  const errors = [];
  const chain = Array.isArray(question.evidenceChain) ? question.evidenceChain : [];
  const source = normalize(preAnswerText(question));
  const correct = normalize(getCorrectText(question));
  if (chain.length !== 3) errors.push('kanıt zinciri tam 3 ipucu değil');
  chain.forEach((item, index) => {
    const text = cleanText(item);
    const norm = normalize(text);
    if (!text || text.length < 12) errors.push(`kanıt zinciri ${index + 1} eksik`);
    if (EVIDENCE_INTERPRETATION_PATTERNS.some((pattern) => pattern.test(text))) errors.push(`kanıt zinciri ${index + 1} yorum/çıkarım içeriyor`);
    if (correct && correct.length > 4 && norm.includes(correct)) errors.push(`kanıt zinciri ${index + 1} doğru cevabı söylüyor`);
    const clueTokens = tokens(text);
    const overlap = clueTokens.filter((token) => source.includes(token)).length;
    if (clueTokens.length >= 3 && overlap < 2) errors.push(`kanıt zinciri ${index + 1} vakada açıkça yazan ipuçlarına dayanmıyor`);
  });
  return Array.from(new Set(errors));
}

function examPearlErrors(question = {}) {
  const text = cleanText(question.examPearl || '');
  const errors = [];
  if (text.length < 45) errors.push('TUS ipucu karar cümlesi olamayacak kadar kısa');
  if (text.length > 240) errors.push('TUS ipucu fazla uzun');
  if (hasGenericFeedback(text)) errors.push('TUS ipucu jenerik kalıp içeriyor');
  if (!/ise|varlığında|düşündürür|öncelik|ilk|anahtar|tipik|akla gelir|ayırt|izlem|takip|gösterir|beklenir|verilir/iu.test(text)) {
    errors.push('TUS ipucu hafızada kalacak karar cümlesi gibi yazılmamış');
  }
  return errors;
}

function questionBroadnessErrors(question = {}) {
  const q = cleanText(question.question || '');
  if (!QUESTION_BROADNESS_PATTERNS.some((pattern) => pattern.test(q))) return [];
  if (CLINICAL_NARROWING_TERMS.some((pattern) => pattern.test(q))) return [];
  return ['soru hedefi geniş; klinik karar düzeyi daha dar yazılmalı'];
}

function isTargetRisky(question = {}) {
  const branchTarget = normalize([question.relatedBranch, question.answerTarget, question.learningTarget, question.question].join(' '));
  return /farmakoloji|biyokimya|fizyoloji|acil|mekanizma|antidot|reseptor|enzim|transport|kanal|elektrolit|ilk tedavi|ilk mudahale|tedavi/.test(branchTarget);
}

function hardMedicalRuleErrors(question = {}) {
  const errors = [];
  const source = normalize(preAnswerText(question));
  const correct = normalize(getCorrectText(question));
  const target = normalize([question.answerTarget, question.question, question.learningTarget].join(' '));
  const isTreatmentLike = /first|ilk|tedavi|treatment|acil|yaklasim|mudahele|müdahale|antidot|proflaksi|profilaksi|next/.test(target);

  if (isTreatmentLike && /hiperkalemi|potasyum.*(?:6[.,][5-9]|7[.,]|8[.,])|sivri t|qrs.*genis|qrs.*geniş/.test(source)) {
    if (!/kalsiyum|calcium/.test(correct)) errors.push('hiperkalemi + EKG değişikliği varsa ilk stabilizasyon kalsiyum glukonat olmalı');
  }

  if (isTreatmentLike && /anafilaksi|urtiker|ürtiker|hışılt|wheez|hipotansiyon|ari sok|arı sok|fistik|fıstık/.test(source)) {
    if (/hipotansiyon|hışılt|wheez|dudak|larinks|nefes/.test(source) && !/adrenalin|epinefrin/.test(correct)) {
      errors.push('anafilakside hayat kurtarıcı ilk tedavi IM adrenalindir');
    }
  }

  if (isTreatmentLike && /septik sok|septik şok|laktat.*(?:4|5|6)|hipotansiyon.*enfeksiyon|sepsis/.test(source)) {
    if (!/(antibiyotik|genis spektrum|geniş spektrum).*(kristaloid|sivi|sıvı|30\s*ml)|(?:kristaloid|sivi|sıvı|30\s*ml).*(antibiyotik|genis spektrum|geniş spektrum)/.test(correct)) {
      errors.push('septik şok ilk yaklaşımında geniş spektrum antibiyotik ve 30 mL/kg kristaloid birlikte beklenir');
    }
  }

  if (isTreatmentLike && /opioid|miyozis|solunum depresyonu|heroin|morfin/.test(source)) {
    if (!/nalokson/.test(correct)) errors.push('opioid toksidromunda solunum depresyonu varsa antidot naloksondur');
  }

  if (isTreatmentLike && /organofosfat|kolinerjik|miyozis|bronkore|salivasyon|terleme|fasikülasyon/.test(source)) {
    if (!/atropin/.test(correct)) errors.push('organofosfat toksisitesinde muskarinik bulgular için atropin temel tedavidir');
  }

  if (/hcv|hepatit c|igne bat|iğne bat/.test(source) && /profilaksi|yaklasim|yaklaşım|korunma/.test(target)) {
    if (/a[şs][ıi]|immunglobulin|imm[üu]noglobulin|sofosbuvir|ledipasvir/.test(correct) || !/(anti\s*hcv|hcv\s*rna|rna)/.test(correct)) {
      errors.push('HCV iğne batmasında aşı/immünoglobulin yoktur; bazal anti-HCV ve erken HCV RNA izlemi beklenir');
    }
  }

  if (/sle|lupus|anti\s*dsdna|kompleman/.test(source) && /aktivite|takip|izlem|belirte[çc]|marker/.test(target)) {
    if (!/(anti\s*dsdna|dsdna).*(kompleman|c3|c4)|(?:kompleman|c3|c4).*(anti\s*dsdna|dsdna)/.test(correct)) {
      errors.push('SLE aktivite takibinde anti-dsDNA ve kompleman düzeyleri birlikte beklenir');
    }
  }

  if (isTargetRisky(question)) {
    const mechanismText = normalize([question.explanation, question.examPearl, ...Object.values(question.wrongOptionFeedback || {})].join(' '));
    if (/reseptor|enzim|transport|kanal|pompa|inhib|agonist|antagonist|kotransport|metabolik|elektrolit|asid|alkaloz/.test(mechanismText)) {
      if (/arttirir.*azaltir|azaltir.*arttirir|agonist.*antagonist|antagonist.*agonist/.test(mechanismText)) {
        errors.push('mekanizma açıklamasında yön/etki çelişkisi olasılığı var');
      }
    }
  }

  return Array.from(new Set(errors));
}

function repetitionErrors(question = {}, recentQuestionSummaries = []) {
  const errors = [];
  const correct = normalize(getCorrectText(question));
  const target = normalize(question.learningTarget || question.answerTarget || '');
  const theme = normalize([question.chiefComplaint, question.question].join(' '));
  const currentTokens = new Set(tokens([target, correct, theme].join(' ')));
  if (!currentTokens.size) return errors;
  const recent = Array.isArray(recentQuestionSummaries) ? recentQuestionSummaries.slice(0, 10) : [];
  recent.forEach((item) => {
    const recentCorrect = normalize(item.correct || item.correctAnswerText || item.correctAnswer || '');
    const recentTarget = normalize(item.learningTarget || item.answerTarget || item.questionType || '');
    const recentTheme = normalize([item.chiefComplaint, item.question, item.title].join(' '));
    const recentTokens = new Set(tokens([recentTarget, recentCorrect, recentTheme].join(' ')));
    let overlap = 0;
    currentTokens.forEach((token) => { if (recentTokens.has(token)) overlap += 1; });
    const ratio = overlap / Math.max(1, Math.min(currentTokens.size, recentTokens.size));
    if (correct && correct === recentCorrect && ratio >= 0.45) errors.push('yakın geçmişte aynı hedef/doğru cevap ekseninde benzer soru var');
    else if (target && recentTarget && target === recentTarget && ratio >= 0.65) errors.push('yakın geçmişte çok benzer öğrenme hedefi var');
  });
  return Array.from(new Set(errors));
}

export function cleanMedicalFeedback(question = {}) {
  const cleaned = { ...question };
  cleaned.explanation = dedupeSentences(cleaned.explanation || '', 3);
  cleaned.examPearl = ensureSentence(cleaned.examPearl || '');
  const feedback = cleaned.wrongOptionFeedback || {};
  cleaned.wrongOptionFeedback = OPTION_IDS.reduce((acc, id) => {
    acc[id] = dedupeSentences(feedback[id] || '', 2);
    return acc;
  }, {});
  cleaned.evidenceChain = (Array.isArray(cleaned.evidenceChain) ? cleaned.evidenceChain : [])
    .map((item) => ensureSentence(item))
    .filter(Boolean)
    .filter((item, index, arr) => arr.findIndex((candidate) => normalize(candidate) === normalize(item)) === index)
    .slice(0, 3);
  cleaned.managementSteps = (Array.isArray(cleaned.managementSteps) ? cleaned.managementSteps : [])
    .map((item) => ensureSentence(item))
    .filter(Boolean)
    .slice(0, 3);
  return cleaned;
}

export function runMedicalQualityFilter(question = {}, recentQuestionSummaries = []) {
  const cleaned = cleanMedicalFeedback(question);
  const errors = [
    ...optionFeedbackErrors(cleaned),
    ...evidenceErrors(cleaned),
    ...examPearlErrors(cleaned),
    ...questionBroadnessErrors(cleaned),
    ...hardMedicalRuleErrors(cleaned),
    ...repetitionErrors(cleaned, recentQuestionSummaries),
  ];

  const allText = [
    cleaned.explanation,
    cleaned.examPearl,
    ...Object.values(cleaned.wrongOptionFeedback || {}),
    ...(Array.isArray(cleaned.evidenceChain) ? cleaned.evidenceChain : []),
  ].join(' | ');

  if (hasGenericFeedback(allText)) errors.push('feedback içinde şablon/jenerik ifade var');
  if (hasTruncatedText(allText)) errors.push('feedback içinde yarım veya kesik cümle var');
  if (!cleanText(cleaned.explanation) || cleanText(cleaned.explanation).length < 70 || !hasRationaleConnector(cleaned.explanation)) {
    errors.push('açıklama patofizyoloji, klinik karar sırası veya ayırıcı tanı mantığını yeterince göstermiyor');
  }

  return { ok: errors.length === 0, question: cleaned, errors: Array.from(new Set(errors)) };
}
