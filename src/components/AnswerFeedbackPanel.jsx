import { Icon, IconBadge } from './ui.jsx';
import GlossaryText from './GlossaryTooltip.jsx';
import { formatAppearedYears, resolveExamSignal } from '../utils/examMeta.js';
import { feedbackDuplicationGate } from '../utils/feedbackDuplicationGate.js';
import './tusPearlCards.css';
import { repairAIGeneratedText, isForbiddenEditorialText, isPlaceholderInvestigationText } from '../utils/editorialQuality.js';

const MAX_EVIDENCE_ITEMS = 5;
const MAX_PEARL_ITEMS = 4;
const MAX_MANAGEMENT_ITEMS = 4;
const MAX_COMPARISON_ITEMS = 6;

const GENERIC_COMPARISON_PATTERNS = [
  /belirleyici klinik bulgular doğru tanı lehine/i,
  /seçeneğin beklenen tipik bulguları/i,
  /ilk yönetim doğru tanının aciliyetine göre/i,
  /klinik bağlamda değerlendir/i,
  /ayırıcı tanıda yer alabilir/i,
  /veriler tek bir klinik karar etrafında birleşir/i,
];

const BASIC_SCIENCE_BRANCHES = new Set([
  'anatomy',
  'physiology',
  'histology-embryology',
  'medical-biochemistry',
  'medical-pathology',
  'medical-pharmacology',
  'medical-microbiology',
]);


function allowsManagementFeedback(clinicalCase = {}) {
  const target = normalizeText(clinicalCase.answerTarget || clinicalCase.questionType || '').toLocaleLowerCase('tr');
  const branchText = normalizeText(`${clinicalCase.branchId || ''} ${clinicalCase.relatedBranch || ''} ${clinicalCase.branchName || ''}`).toLocaleLowerCase('tr');
  const isAISpot = clinicalCase.caseType === 'ai-spot' || clinicalCase.branchId === 'tus-spot-olgular';
  const managementTarget = /^(first_step|next_step|treatment|prevention)$/iu.test(target);
  if (isAISpot && !managementTarget) return false;
  if (/mechanism|lab_interpretation|diagnostic_test|complication|diagnosis/iu.test(target) && /biyokimya|mikrobiyoloji|farmakoloji|anatomi|histoloji|embriyoloji|temel bilim|medical-biochemistry|medical-microbiology|medical-pharmacology|histology-embryology|anatomy/iu.test(branchText)) return false;
  return true;
}

function normalizeText(value = '') {
  return repairAIGeneratedText(String(value ?? ''), { fallback: String(value ?? '') })
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim();
}


function normalizeForCompare(value = '') {
  return normalizeText(value)
    .toLocaleLowerCase('tr')
    .replace(/[ıİ]/g, 'i')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[üÜ]/g, 'u')
    .replace(/[şŞ]/g, 's')
    .replace(/[öÖ]/g, 'o')
    .replace(/[çÇ]/g, 'c')
    .replace(/[^a-z0-9+\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function containsAnswerLeak(text = '', correct = '') {
  const value = normalizeForCompare(text);
  const answer = normalizeForCompare(correct);
  if (!value || !answer || answer.length < 5) return false;
  if (value.includes(answer)) return true;
  const words = answer.split(/\s+/u).filter((word) => word.length >= 4);
  if (words.length < 2) return false;
  return words.filter((word) => value.includes(word)).length >= Math.ceil(words.length * 0.8);
}

function singleSentence(value = '', limit = 220) {
  const first = splitIntoSentences(value)[0] || normalizeText(value);
  return truncateSentence(first, limit);
}

function stripFeedbackHeading(value = '') {
  return normalizeText(value)
    .replace(/^\s*(?:TUS\s*ipucu|Spot\s*bilgi|Hap\s*bilgi|Sınav\s*notu|Klinik\/Bilimsel\s*gerekçe|Klinik\s*gerekçe|Kanıt\s*zinciri)\s*[:：-]\s*/iu, '')
    .replace(/^\s*(?:TUS\s*ipucu|Spot\s*bilgi)\s*[:：-]\s*/iu, '')
    .trim();
}

function textLooksSame(a = '', b = '', threshold = 0.9) {
  const left = normalizeForCompare(a);
  const right = normalizeForCompare(b);
  if (!left || !right) return false;
  if (left === right) return true;
  const leftWords = new Set(left.split(/\s+/u).filter((word) => word.length > 2));
  const rightWords = new Set(right.split(/\s+/u).filter((word) => word.length > 2));
  if (!leftWords.size || !rightWords.size) return false;
  let overlap = 0;
  leftWords.forEach((word) => { if (rightWords.has(word)) overlap += 1; });
  return overlap / Math.min(leftWords.size, rightWords.size) >= threshold;
}

function deriveSingleLinePearl(clinicalCase = {}, reasoningText = '') {
  const feedback = getFeedback(clinicalCase);
  const raw = feedback.spotPearl
    || feedback.examPearl
    || feedback.pearls?.[0]?.text
    || feedback.pearls?.[0]
    || feedback.clinicalPearls?.[0]?.text
    || feedback.clinicalPearls?.[0]
    || clinicalCase.examPearl
    || clinicalCase.examPearls?.[0]
    || clinicalCase.diagnosis?.pearls?.[0]
    || '';
  const pearl = singleSentence(stripFeedbackHeading(raw), 230);
  if (!pearl || textLooksSame(pearl, reasoningText, 0.86)) return '';
  return pearl;
}

function itemText(value) {
  if (!value) return '';
  if (typeof value === 'string') return normalizeText(value);
  return normalizeText(value.text || value.description || value.summary || value.explanation || value.label || value.title || '');
}

function itemTitle(value) {
  if (!value || typeof value === 'string') return '';
  return normalizeText(value.title || value.label || value.heading || value.type || '');
}

function trimTrailingPunctuation(value = '') {
  return normalizeText(value).replace(/[.;:]$/u, '');
}

function capitalizeSentence(value = '') {
  const text = normalizeText(value);
  if (!text) return '';
  return text.charAt(0).toLocaleUpperCase('tr') + text.slice(1);
}

function ensureSentence(value = '') {
  const text = capitalizeSentence(normalizeText(value));
  if (!text) return '';
  return /[.!?]$/u.test(text) ? text : `${text}.`;
}

function truncateSentence(value = '', limit = 230) {
  const text = normalizeText(value).replace(/\.\.\.|…/g, '.');
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit).replace(/\s+\S*$/u, '').replace(/[,:;\-–—]+$/u, '').trim();
  if (!cut) return text.slice(0, limit).trim();
  return /[.!?]$/u.test(cut) ? cut : `${cut}.`;
}

function splitIntoSentences(text = '') {
  return normalizeText(text)
    .split(/(?<=[.!?])\s+/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function compactParagraph(value = '', maxSentences = 4, maxLength = 620) {
  const sentences = splitIntoSentences(value).slice(0, maxSentences);
  const text = sentences.length ? sentences.join(' ') : normalizeText(value);
  return truncateSentence(text, maxLength);
}

function unique(items = []) {
  const seen = new Set();
  return items.filter((item) => {
    const text = itemText(item);
    if (!text || isForbiddenEditorialText(text) || isPlaceholderInvestigationText(text)) return false;
    const key = text.toLocaleLowerCase('tr');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function stripWeakPrefix(value = '') {
  return normalizeText(value)
    .replace(/^(?:TUS kırmızı bayrağı|İlk adım|Mekanizma özeti|Mekanizma|Mekanistik yaklaşım|Morfolojik patern|İlk tedavi|Klinik olasılığı belirle|Pellagra|Olgu verisi|Ek destek|Sınav incisi|Sınav notu|Ayırıcı nokta|Karar verdirici ipucu|Destekleyici kanıt|Laboratuvar paterni|Görüntüleme bulgusu|Fizik muayene bulgusu|Başvuru yakınması)\s*[:：-]\s*/iu, '')
    .trim();
}

function refineLabel(value = '', fallback = '') {
  const raw = trimTrailingPunctuation(stripWeakPrefix(value || fallback));
  const normalized = raw.toLocaleLowerCase('tr');
  if (!raw) return fallback || 'Klinik ipucu';
  if (/^kan[ıi]t\s*\d+$/iu.test(raw)) return fallback || 'Olgu kanıtı';
  if (/tus k[ıi]rm[ıi]z[ıi] bayra[ğg][ıi]/iu.test(raw)) return 'Karar verdirici ipucu';
  if (/^ilk ad[ıi]m$/iu.test(raw)) return 'Öncelik';
  if (/^morfolojik patern$/iu.test(raw)) return 'Doku hasarı paterni';
  if (/^mekanizma$/iu.test(raw) || /mekanistik yakla[şs][ıi]m/iu.test(raw)) return 'Mekanizma özeti';
  if (/^ilk tedavi$/iu.test(raw)) return 'Tedavi adımı';
  if (/klinik olas[ıi]l[ıi][ğg][ıi] belirle/iu.test(raw)) return 'Klinik patern';
  if (/^yakla[şs][ıi]m$/iu.test(raw)) return 'Klinik patern';
  if (/^hap bilgi$/iu.test(raw)) return 'Yüksek verimli bilgi';
  if (/^s[ıi]nav incisi$/iu.test(raw)) return 'Sınav incisi';
  return raw;
}

function removeMetaLanguage(value = '') {
  return stripWeakPrefix(normalizeText(value)
    .replace(/\.\.\.|…/g, '.')
    .replace(/Bu spot olguda\s+/giu, '')
    .replace(/öğrenci\s+[^.]*\.?/giu, '')
    .replace(/Bu vaka,?\s*/giu, '')
    .replace(/klinik bağlamda değerlendirilir/giu, 'öykü ve objektif bulgularla birlikte yorumlanır')
    .replace(/Morfolojik patern\.\s*Morfolojik patern\.?/giu, '')
    .replace(/karar verdirici paternyla/giu, 'karar verdirici paternle')
    .replace(/likefaksiyon nekrozuyla/giu, 'sıvılaşma nekrozu ile')
    .replace(/kısa TUS pratiğinde ele alınır/giu, 'sınav odaklı olarak yorumlanır')
    .replace(/Klinik değerlendirme için ek veri/giu, '')
    .replace(/\bOlgu verisi\s*[:：-]\s*/giu, '')
    .replace(/\bEk destek\s*[:：-]\s*/giu, '')
    .replace(/\s+/g, ' '));
}

function splitActionItems(text = '') {
  const normalized = normalizeText(text);
  if (!normalized) return [];

  const semicolonParts = normalized.split(/;\s*/u).map(trimTrailingPunctuation).filter(Boolean);
  if (semicolonParts.length > 1) return semicolonParts;

  const sentenceParts = splitIntoSentences(normalized).map(trimTrailingPunctuation).filter(Boolean);
  if (sentenceParts.length > 1) return sentenceParts;

  return normalized
    .split(/,\s+(?=(?:intravenöz|oral|acil|ritim|hemodinami|hasta|tedavi|cerrahi|antibiyotik|antikoagülasyon|aspirin|görüntüleme|izlem|kontrendikasyon|mekanik|reperfüzyon|stabilizasyon|bildirim|güvenlik)\b)/iu)
    .map(trimTrailingPunctuation)
    .filter(Boolean);
}

function getFeedback(clinicalCase) {
  return clinicalCase.diagnosis?.answerFeedback || clinicalCase.answerFeedback || {};
}

function pickClinicalMeta(clinicalCase) {
  const feedback = getFeedback(clinicalCase);
  if (feedback.shortDiagnosisMeta) return normalizeText(feedback.shortDiagnosisMeta);
  if (feedback.diagnosisMeta) return normalizeText(feedback.diagnosisMeta);

  const focus = normalizeText(clinicalCase.clinicalFocus || '');
  if (focus) return focus.split(/[,.;]/u)[0].trim();
  return normalizeText(clinicalCase.setting || 'Klinik karar verme');
}

function getMainClue(clinicalCase) {
  const feedback = getFeedback(clinicalCase);
  const candidates = [
    feedback.spotClue,
    clinicalCase.spotClue,
    clinicalCase.patientIntro?.priorityFocus,
    clinicalCase.patientIntro?.distinctiveClues?.[0],
    feedback.evidenceChain?.[0]?.title ? `${feedback.evidenceChain[0].title}: ${feedback.evidenceChain[0].text || ''}` : feedback.evidenceChain?.[0],
    clinicalCase.clinicalFocus,
    clinicalCase.chiefComplaint,
  ];
  return truncateSentence(removeMetaLanguage(candidates.find((item) => normalizeText(itemText(item))) || ''), 190);
}

function deriveWhyCorrect(clinicalCase) {
  const feedback = getFeedback(clinicalCase);
  const explicit = normalizeText(feedback.whyCorrect || '');
  if (explicit) return compactParagraph(removeMetaLanguage(explicit), 4, 620);

  const explanation = normalizeText(clinicalCase.diagnosis?.explanation || '');
  if (explanation) return compactParagraph(removeMetaLanguage(explanation), 4, 620);

  const clue = getMainClue(clinicalCase);
  const correct = clinicalCase.diagnosis?.correct || 'doğru seçenek';
  return `${clue ? `${clue} klinik kararı yönlendiren temel ipucudur. ` : ''}${correct} öykü, muayene ve objektif veriler birlikte ele alındığında en tutarlı seçenektir.`;
}

function normalizeWrongMap(clinicalCase) {
  const feedback = getFeedback(clinicalCase);
  const maps = [
    feedback.whyWrong,
    feedback.differentialComparison,
    feedback.differentials,
    feedback.differentialExplanations,
    clinicalCase.diagnosis?.differentials,
  ].filter((map) => map && typeof map === 'object' && !Array.isArray(map));

  return maps.reduce((accumulator, map) => {
    Object.entries(map).forEach(([key, value]) => {
      if (!key || accumulator[key]) return;
      if (typeof value === 'string') accumulator[key] = { explanation: value, comparisonPoints: [] };
      else accumulator[key] = {
        explanation: value?.explanation || value?.summary || '',
        comparisonPoints: value?.comparisonPoints || value?.points || [],
      };
    });
    return accumulator;
  }, {});
}

function deriveWhyWrong(clinicalCase, selectedOption, selectedComparison) {
  const feedback = getFeedback(clinicalCase);
  if (selectedOption && feedback.whyWrong && typeof feedback.whyWrong === 'object' && typeof feedback.whyWrong[selectedOption] === 'string') {
    return compactParagraph(removeMetaLanguage(feedback.whyWrong[selectedOption]), 4, 620);
  }
  if (typeof feedback.whyWrong === 'string') return compactParagraph(removeMetaLanguage(feedback.whyWrong), 4, 620);
  if (selectedComparison?.explanation) return compactParagraph(removeMetaLanguage(selectedComparison.explanation), 4, 620);

  const clue = getMainClue(clinicalCase);
  const correctDiagnosis = clinicalCase.diagnosis?.correct || 'doğru seçenek';
  if (selectedOption) {
    return `${selectedOption} ilk bakışta düşünülebilir; ancak bu vakada ${clue ? `${clue} ` : 'ana klinik patern '}bu alternatifi öncelikli yanıt yapacak yeterli desteği sağlamaz. Olgudaki ipuçları ${correctDiagnosis} ile daha tutarlı ilerler.`;
  }

  return `Seçilen yanıt, olgunun ana klinik ve tetkik paternini ${correctDiagnosis} kadar iyi açıklamaz.`;
}

function inferEvidenceTitle(text = '', index = 0) {
  const normalized = normalizeText(text).toLocaleLowerCase('tr');
  if (/st |ekg|derivasyon|ritim|qrs|qt|pr\b|segment/.test(normalized)) return 'EKG paterni';
  if (/bt|mr|mrg|usg|grafi|tomografi|görüntüleme|radyografi|ultrason/.test(normalized)) return 'Görüntüleme bulgusu';
  if (/troponin|crp|lökosit|hemoglobin|trombosit|glukoz|ph\b|baz açığı|enzim|metabolit|kreatinin|ast|alt|bilirubin|seroloji|kültür|pcr|marker|antikor|antijen/.test(normalized)) return 'Laboratuvar bulgusu';
  if (/muayene|oskültasyon|defans|rebound|döküntü|ekimoz|letarji|ral|üfürüm|ödem|nörolojik|ateş/.test(normalized)) return 'Muayene bulgusu';
  if (/öykü|maruziyet|travma|ilaç|sigara|gebelik|doğum|aile|beslenme|seyahat|temas/.test(normalized)) return 'Öykü ipucu';
  if (/yaş|bebek|çocuk|yenidoğan|erkek|kadın|adölesan|gebede/.test(normalized)) return 'Klinik bağlam';
  if (/reseptör|enzim|gen|mutasyon|yolak|hormon|protein|histolojik|nekroz|inflamasyon|morfoloji/.test(normalized)) return 'Mekanizma';
  if (/negatif|saptanmadı|normal|yok/.test(normalized)) return 'Dışlatıcı bulgu';
  return 'Klinik ipucu';
}

function normalizeTitledItem(item, index, fallbackTitle, maxLength = 190) {
  if (!item) return null;
  const originalTitle = itemTitle(item);
  let text = removeMetaLanguage(itemText(item));
  if (!text) return null;

  let title = originalTitle;
  const colonMatch = text.match(/^([^:：]{2,42})[:：]\s*(.+)$/u);
  if (!title && colonMatch) {
    title = normalizeText(colonMatch[1]);
    text = normalizeText(colonMatch[2]);
  }

  if (!title) title = fallbackTitle || inferEvidenceTitle(text, index);
  const inferredFallback = fallbackTitle || inferEvidenceTitle(text, index);
  return {
    title: truncateSentence(refineLabel(title, inferredFallback), 46),
    text: truncateSentence(stripWeakPrefix(text), maxLength),
  };
}

function cleanEvidenceText(item, index = 0) {
  const normalized = normalizeTitledItem(item, index, null, 185);
  if (!normalized) return null;
  normalized.text = normalized.text
    .replace(/^Başvuru:\s*/iu, '')
    .replace(/^Muayene:\s*/iu, '')
    .replace(/^Tetkik:\s*/iu, '')
    .replace(/^Laboratuvar bulgusu:\s*/iu, '')
    .replace(/^Morfolojik patern:\s*/iu, '');
  return normalized;
}

function deriveEvidenceChain(clinicalCase) {
  const feedback = getFeedback(clinicalCase);
  const rawEvidence = [];
  if (Array.isArray(feedback.evidenceChain)) rawEvidence.push(...feedback.evidenceChain);

  if (rawEvidence.length < 3 && clinicalCase.chiefComplaint) {
    rawEvidence.push({ title: 'Başvuru paterni', text: `${trimTrailingPunctuation(clinicalCase.chiefComplaint)} başvurunun temel klinik problemini oluşturur` });
  }

  if (rawEvidence.length < 4 && Array.isArray(clinicalCase.exam) && clinicalCase.exam.length) {
    rawEvidence.push({ title: 'Muayene bulgusu', text: trimTrailingPunctuation(clinicalCase.exam[0]) });
  }

  const highYieldInvestigations = (clinicalCase.investigations || [])
    .map((investigation) => {
      const finding = investigation.summary || investigation.findings?.[0] || '';
      if (!finding) return null;
      return { title: investigation.label || 'Tetkik paterni', text: trimTrailingPunctuation(finding) };
    })
    .filter(Boolean);

  rawEvidence.push(...highYieldInvestigations.slice(0, 3));

  if (rawEvidence.length < 3) {
    const explanationSentences = splitIntoSentences(clinicalCase.diagnosis?.explanation || '');
    explanationSentences.slice(0, 2).forEach((sentence) => rawEvidence.push({ title: 'Gerekçe ipucu', text: trimTrailingPunctuation(sentence) }));
  }

  const correct = clinicalCase.diagnosis?.correct || '';
  return unique(rawEvidence)
    .slice(0, MAX_EVIDENCE_ITEMS)
    .map(cleanEvidenceText)
    .filter(Boolean)
    .filter((item) => !containsAnswerLeak(`${item.title} ${item.text}`, correct))
    .slice(0, 3);
}

function inferPearlLabel(text = '', index = 0) {
  const normalized = normalizeText(text).toLocaleLowerCase('tr');
  if (/kırmızı bayrak|red flag|tutarsız|acil|geciktirmez/.test(normalized)) return 'Karar verdirici ipucu';
  if (/ilk|başla|önce|bekleme|stabilizasyon|reperfüzyon|bildirim/.test(normalized)) return 'Öncelik';
  if (/değil|kaçır|karışır|tuzak|alternatif|yanlış/.test(normalized)) return 'Sık tuzak';
  if (/mekanizma|enzim|reseptör|gen|yolak|inhibe|aktive/.test(normalized)) return 'Mekanizma özeti';
  if (/tanı|test|marker|seroloji|kültür|pcr|histoloji/.test(normalized)) return 'Ayırt ettirici bulgu';
  return index === 0 ? 'Sınav incisi' : 'Hap bilgi';
}

function derivePearls(clinicalCase) {
  const feedback = getFeedback(clinicalCase);
  const pearls = feedback.clinicalPearls || feedback.pearls || clinicalCase.diagnosis?.pearls || [];
  const clue = getMainClue(clinicalCase);
  const rawPearls = Array.isArray(pearls) ? [...pearls] : [];
  if (rawPearls.length < 2 && clue) rawPearls.push({ label: 'Ayırt ettirici bulgu', text: `${clue} seçenekler arasındaki ayrımı belirginleştirir.` });

  return unique(rawPearls)
    .slice(0, MAX_PEARL_ITEMS)
    .map((item, index) => {
      const normalized = normalizeTitledItem(item, index, item?.label || inferPearlLabel(itemText(item), index), 170);
      if (!normalized) return null;
      normalized.label = normalized.title;
      return normalized;
    })
    .filter(Boolean);
}

function inferManagementTitle(text = '', index = 0) {
  const normalized = normalizeText(text).toLocaleLowerCase('tr');
  if (/stabil|abc|hava yolu|solunum|dolaşım|monitör|damar yolu|nöbet/.test(normalized)) return 'Stabilizasyon';
  if (/kaydet|dokümante|objektif|adli|bildirim|güvenlik|koruyucu/.test(normalized)) return /bildirim|güvenlik|koruyucu|adli/.test(normalized) ? 'Güvenlik ve bildirim' : 'Objektif kayıt';
  if (/tetkik|ekg|bt|mr|usg|kültür|seroloji|biyopsi|marker|laboratuvar|doğrula/.test(normalized)) return 'Tanısal doğrulama';
  if (/tedavi|başla|ver|antibiyotik|antikoagülasyon|aspirin|insülin|antidot|cerrahi|pci|reperfüzyon|hipotermi|sıvı/.test(normalized)) return 'Tedavi adımı';
  if (/izle|takip|kontrol|komplikasyon|yanıt|daralt|değiştir/.test(normalized)) return 'İzlem';
  return index === 0 ? 'İlk basamak' : 'Sonraki adım';
}

function deriveManagementSteps(clinicalCase) {
  if (!allowsManagementFeedback(clinicalCase)) return [];
  const feedback = getFeedback(clinicalCase);
  const management = feedback.managementSteps || feedback.management;
  let steps = [];
  if (Array.isArray(management) && management.length) {
    steps = management;
  } else {
    const nextStep = clinicalCase.diagnosis?.nextStep || '';
    steps = splitActionItems(nextStep);
  }

  return unique(steps)
    .slice(0, MAX_MANAGEMENT_ITEMS)
    .map((step, index) => normalizeTitledItem(step, index, inferManagementTitle(itemText(step), index), 170))
    .filter(Boolean);
}

function isGenericComparisonPoint(point = '') {
  return GENERIC_COMPARISON_PATTERNS.some((pattern) => pattern.test(point));
}

function buildNaturalComparisonPoints(clinicalCase, option, evidenceChain = []) {
  const keyEvidence = evidenceChain[0]?.text || itemText(evidenceChain[0]);
  const keyInvestigation = (clinicalCase.investigations || []).find((item) => item.summary || item.findings?.length);
  const points = [
    keyEvidence ? `${trimTrailingPunctuation(keyEvidence)} verilen olguda bu alternatifin neden geri planda kaldığını gösterir.` : null,
    keyInvestigation ? `${keyInvestigation.label} bulgusu seçenekler arasındaki ayrımı objektif veriye taşır.` : null,
    `${option} ancak farklı bir klinik öncelikte düşünülebilir; verilen olguda beklenen karar noktasını karşılamaz.`,
  ];

  return unique(points.filter(Boolean)).slice(0, 3).map((item) => truncateSentence(item, 155));
}


function deriveCorrectOptionSummary(clinicalCase, option, evidenceChain = []) {
  const feedback = getFeedback(clinicalCase);
  const explicit = feedback.correctOptionFeedback
    || feedback.correctChoiceFeedback
    || feedback.optionRationales?.[option]
    || feedback.differentialComparison?.[option]?.explanation
    || '';
  if (explicit && !textLooksSame(explicit, feedback.whyCorrect || clinicalCase.diagnosis?.explanation || '', 0.86)) {
    return singleSentence(removeMetaLanguage(explicit), 210);
  }
  const clue = evidenceChain[0]?.text || getMainClue(clinicalCase);
  const target = normalizeText(clinicalCase.answerTarget || clinicalCase.questionType || '').toLocaleLowerCase('tr');
  if (/mechanism|mekanizma/iu.test(target)) return `${option} verilen bulguyu en doğrudan açıklayan mekanizmayı temsil eder.`;
  if (/diagnostic_test|test|laboratuvar|lab/iu.test(target)) return `${option} bu klinik hedef için en uygun tanısal yönü öne çıkarır.`;
  if (/first_step|next_step|treatment|tedavi/iu.test(target)) return `${option} olgudaki klinik önceliği en doğrudan karşılayan yaklaşımdır.`;
  return `${option} ${clue ? `${trimTrailingPunctuation(clue)} ile birlikte değerlendirildiğinde` : 'vaka ipuçlarıyla'} hedeflenen karar noktasını karşılar.`;
}

function buildOptionComparisons(clinicalCase, selectedOption, evidenceChain = []) {
  const feedback = getFeedback(clinicalCase);
  const correct = clinicalCase.diagnosis?.correct;
  const options = Array.isArray(clinicalCase.diagnosis?.options) ? clinicalCase.diagnosis.options : [];
  const wrongMap = normalizeWrongMap(clinicalCase);
  const clue = getMainClue(clinicalCase);

  return options.slice(0, MAX_COMPARISON_ITEMS).map((option) => {
    const isCorrectOption = option === correct;
    if (isCorrectOption) {
      return {
        option,
        status: 'correct',
        isSelected: selectedOption === option,
        title: 'En iyi seçenek',
        explanation: singleSentence(deriveCorrectOptionSummary(clinicalCase, option, evidenceChain), 210),
        comparisonPoints: [],
      };
    }

    const explicit = wrongMap[option] || {};
    const explanation = singleSentence(removeMetaLanguage(explicit.explanation || `${option} ilk bakışta aynı karar alanında düşünülebilir; ancak bu olguda ${clue ? `${clue} ` : 'kanıt zinciri '}bu alternatifi öncelikli yanıt yapacak yeterli desteği sağlamaz.`), 190);
    return {
      option,
      status: 'wrong',
      isSelected: selectedOption === option,
      title: selectedOption === option ? 'Seçtiğin alternatif' : 'Neden elenir?',
      explanation,
      comparisonPoints: [],
    };
  });
}

function buildAISpotFocusedComparisons(optionComparisons = [], selectedOption = '', isCorrect = false) {
  if (isCorrect) return [];
  const selectedCard = optionComparisons.find((item) => item.isSelected || item.option === selectedOption);
  const correctCard = optionComparisons.find((item) => item.status === 'correct');
  return [selectedCard, correctCard]
    .filter(Boolean)
    .filter((item, index, list) => list.findIndex((entry) => entry.option === item.option) === index)
    .slice(0, 2);
}

function FeedbackSection({ icon, tone = 'blue', eyebrow, title, children, className = '', minimal = false }) {
  const shouldRenderHead = !minimal && (icon || eyebrow || title);
  return (
    <section className={`feedback-card ${minimal ? 'feedback-card-minimal' : ''} ${className}`.trim()}>
      {shouldRenderHead ? (
        <header className="feedback-card-head">
          {icon ? <IconBadge icon={icon} tone={tone} size="sm" /> : null}
          <div>
            {eyebrow ? <span>{eyebrow}</span> : null}
            {title ? <h4>{title}</h4> : null}
          </div>
        </header>
      ) : null}
      {children}
    </section>
  );
}


function ExamNoteFeedback({ signal, glossaryEnabled = true }) {
  if (!signal?.hasContent) return null;
  const yearsLabel = formatAppearedYears(signal);
  const metaChips = [
    yearsLabel || '',
    signal.appearanceCount > 1 && !yearsLabel ? `${signal.appearanceCount} kez sorulmuş` : '',
    signal.isPastQuestionDerived && !yearsLabel ? 'Çıkmış bilgi' : '',
  ].filter(Boolean);
  const keyPoints = Array.isArray(signal.keyPoints) ? signal.keyPoints.slice(0, 4) : [];
  const keywordChips = Array.isArray(signal.keywords) ? signal.keywords.slice(0, 3) : [];

  return (
    <FeedbackSection icon="Sparkles" tone="accent" eyebrow="TUS ipucu" title="Kısa sınav notu" className="tus-spot-signal-feedback exam-note-feedback-card spot-note-card">
      <div className="exam-note-content-stack">
        {metaChips.length ? (
          <div className="exam-note-meta-row" aria-label="Sınav geçmişi">
            {metaChips.slice(0, 2).map((chip) => <span className="exam-signal-chip past keyword-badge" key={chip}>{chip}</span>)}
          </div>
        ) : null}
        {signal.spotPearl ? (
          <p className="exam-signal-pearl exam-note-pearl spot-note-copy">
            <span className="spot-note-label">Spot bilgi:</span> {signal.spotPearl}
          </p>
        ) : null}
        {keyPoints.length ? (
          <div className="spot-note-insight-list" aria-label="Kritik ipuçları">
            <span className="spot-note-list-title">Kritik ipuçları</span>
            <ul>
              {keyPoints.map((point, index) => <li key={`${point}-${index}`}>{point}</li>)}
            </ul>
          </div>
        ) : null}
        {keywordChips.length ? (
          <div className="exam-signal-keywords exam-note-keywords keyword-badge-row" aria-label="Kısa anahtarlar">
            {keywordChips.map((keyword) => <span className="keyword-badge" key={keyword}>{keyword}</span>)}
          </div>
        ) : null}
        {signal.examTrap ? <p className="exam-signal-trap exam-note-trap"><strong>Sık tuzak:</strong> {signal.examTrap}</p> : null}
      </div>
    </FeedbackSection>
  );
}

function ReasoningCard({ reasoningText, isCorrect = true, glossaryEnabled = true, minimal = false }) {
  return (
    <FeedbackSection
      icon={minimal ? null : (isCorrect ? 'Brain' : 'AlertTriangle')}
      tone={isCorrect ? 'blue' : 'warning'}
      eyebrow={minimal ? '' : 'Klinik/Bilimsel gerekçe'}
      title={minimal ? '' : (isCorrect ? 'Gerekçe' : 'Seçim değerlendirmesi')}
      className={`reasoning-evidence-card clinical-reasoning-card ${minimal ? 'minimal-reasoning-card' : ''}`.trim()}
      minimal={minimal}
    >
      <p className="feedback-body-copy"><GlossaryText text={ensureSentence(reasoningText)} enabled={glossaryEnabled} /></p>
    </FeedbackSection>
  );
}


function TusTipCard({ pearl, glossaryEnabled = true, minimal = false }) {
  if (!pearl) return null;
  return (
    <FeedbackSection
      icon={minimal ? null : 'Sparkles'}
      tone="accent"
      eyebrow={minimal ? '' : 'TUS ipucu'}
      title={minimal ? '' : 'Karar cümlesi'}
      className={`tus-single-line-tip-card ${minimal ? 'minimal-tip-card' : ''}`.trim()}
      minimal={minimal}
    >
      <p className="feedback-body-copy tus-single-line-tip"><GlossaryText text={ensureSentence(pearl)} enabled={glossaryEnabled} /></p>
    </FeedbackSection>
  );
}

function EvidenceChainCard({ evidenceChain, glossaryEnabled = true, minimal = false }) {
  if (!evidenceChain.length) return null;
  return (
    <FeedbackSection
      icon={minimal ? null : 'ClipboardList'}
      tone="teal"
      eyebrow={minimal ? '' : 'Kanıt zinciri'}
      title={minimal ? '' : 'Vakadaki ipuçları'}
      className={`evidence-chain-card ${minimal ? 'minimal-evidence-card' : ''}`.trim()}
      minimal={minimal}
    >
      <ol className={`evidence-chain-list evidence-chain-list-pro ${minimal ? 'minimal-evidence-list' : ''}`.trim()}>
        {evidenceChain.map((item, index) => (
          <li key={`${item.title}-${item.text}-${index}`}>
            <b>{index + 1}</b>
            <div className="evidence-chain-copy">
              {!minimal && item.title ? <strong><GlossaryText text={item.title} enabled={glossaryEnabled} /></strong> : null}
              <p><GlossaryText text={ensureSentence(item.text)} enabled={glossaryEnabled} /></p>
            </div>
          </li>
        ))}
      </ol>
    </FeedbackSection>
  );
}

function ClinicalPearlsList({ pearls, glossaryEnabled = true }) {
  if (!pearls.length) return null;
  return (
    <FeedbackSection icon="Sparkles" tone="accent" eyebrow="Sınav notu" title="Kritik ipuçları" className="clinical-pearls-card">
      <div className="clinical-pearl-list">
        {pearls.map((pearl, index) => (
          <div className="clinical-pearl-item clinical-pearl-item-pro" key={`${pearl.label}-${pearl.text}-${index}`}>
            <span aria-hidden="true" />
            <p><strong><GlossaryText text={pearl.label} enabled={glossaryEnabled} /></strong><GlossaryText text={ensureSentence(pearl.text)} enabled={glossaryEnabled} /></p>
          </div>
        ))}
      </div>
    </FeedbackSection>
  );
}

function OptionComparisonCard({ comparisons, glossaryEnabled = true, isSpotCase = false, minimal = false }) {
  if (!comparisons.length) return null;
  const comparisonCountClass = `option-comparison-count-${Math.min(comparisons.length, 6)}`;
  return (
    <FeedbackSection
      icon={minimal ? null : 'Target'}
      tone="warning"
      eyebrow={minimal ? '' : 'Seçenek karşılaştırması'}
      title={minimal ? '' : (isSpotCase ? 'Şıklar nasıl elenir?' : 'Ayırıcı karar')}
      className={`option-comparison-card differential-comparison-card ${minimal ? 'minimal-option-comparison-card' : ''}`.trim()}
      minimal={minimal}
    >
      <div className={`option-comparison-list ${comparisonCountClass} ${minimal ? 'minimal-option-comparison-list' : ''}`.trim()}>
        {comparisons.map((item, index) => (
          <article className={`option-comparison-item ${item.status} ${item.isSelected ? 'selected-option' : ''} ${minimal ? 'minimal-option-card' : ''}`.trim()} key={`${item.option}-${index}`}>
            <div className={`option-comparison-head ${minimal ? 'minimal' : ''}`.trim()}>
              {minimal ? (item.status === 'correct' ? <div className="option-comparison-kicker">Doğru cevap</div> : item.isSelected ? <div className="option-comparison-kicker">Seçimin</div> : null) : <span className={`option-comparison-status ${item.status}`}>{item.status === 'correct' ? 'Doğru' : item.isSelected ? 'Seçimin' : 'Alternatif'}</span>}
              <strong><GlossaryText text={item.option} enabled={glossaryEnabled} /></strong>
            </div>
            <p><GlossaryText text={ensureSentence(item.explanation)} enabled={glossaryEnabled} /></p>
          </article>
        ))}
      </div>
    </FeedbackSection>
  );
}

function FeedbackManagementCard({ managementSteps, glossaryEnabled = true, clinicalCase }) {
  if (!managementSteps.length) return null;
  const isBasic = BASIC_SCIENCE_BRANCHES.has(clinicalCase?.branchId) && clinicalCase?.caseType !== 'spot';
  return (
    <FeedbackSection icon="Timer" tone="warning" eyebrow={isBasic ? 'Yaklaşım' : 'Yönetim'} title={isBasic ? 'Mekanistik yaklaşım notu' : 'İlk yönetim basamağı'} className="feedback-management-card">
      <div className="management-action-list">
        {managementSteps.map((step, index) => (
          <div className="management-action-item management-action-item-pro" key={`${step.title}-${step.text}-${index}`}>
            <b>{index + 1}</b>
            <p><strong><GlossaryText text={step.title} enabled={glossaryEnabled} /></strong><GlossaryText text={ensureSentence(step.text)} enabled={glossaryEnabled} /></p>
          </div>
        ))}
      </div>
    </FeedbackSection>
  );
}

function AnswerFeedbackPanel({
  clinicalCase,
  selected,
  isCorrect,
  children,
  hardMode = false,
}) {
  const selectedDiagnosis = selected;
  const whyCorrect = deriveWhyCorrect(clinicalCase);
  const evidenceChain = deriveEvidenceChain(clinicalCase);
  const optionComparisons = buildOptionComparisons(clinicalCase, selectedDiagnosis, evidenceChain);
  const selectedComparison = optionComparisons.find((item) => item.option === selectedDiagnosis);
  const whyWrong = deriveWhyWrong(clinicalCase, selectedDiagnosis, selectedComparison);
  const reasoningText = isCorrect ? whyCorrect : whyWrong;
  const rawPearls = derivePearls(clinicalCase);
  const managementSteps = deriveManagementSteps(clinicalCase);
  const glossaryEnabled = !hardMode;
  const isSpotCase = clinicalCase.caseType === 'spot' || clinicalCase.caseType === 'ai-spot' || clinicalCase.branchId === 'tus-spot-olgular';
  const dedupedFeedback = feedbackDuplicationGate({
    signal: resolveExamSignal(clinicalCase),
    pearls: rawPearls,
    reasoningText,
    evidenceChain,
    managementSteps,
    correctAnswer: clinicalCase.diagnosis?.correct || '',
  });
  const examSignal = dedupedFeedback.signal;
  const pearls = dedupedFeedback.pearls;
  const shouldRenderPearls = pearls.length && (!isSpotCase || !examSignal.hasContent);
  const isAISpot = clinicalCase.caseType === 'ai-spot';
  const singleLinePearl = deriveSingleLinePearl(clinicalCase, reasoningText);
  const aiSpotFocusedComparisons = buildAISpotFocusedComparisons(optionComparisons, selectedDiagnosis, isCorrect);

  if (isAISpot) {
    return (
      <div className={`feedback answer-feedback-panel ${isCorrect ? 'success' : 'danger'} answer-feedback-panel-pro`} aria-live="polite">
        <div className="answer-feedback-grid answer-feedback-grid-pro ai-spot-compact-feedback-grid">
          <ReasoningCard reasoningText={reasoningText} isCorrect={isCorrect} glossaryEnabled={glossaryEnabled} minimal />
          <TusTipCard pearl={singleLinePearl} glossaryEnabled={glossaryEnabled} minimal />
          <EvidenceChainCard evidenceChain={evidenceChain} glossaryEnabled={glossaryEnabled} minimal />
          <OptionComparisonCard comparisons={aiSpotFocusedComparisons} glossaryEnabled={glossaryEnabled} isSpotCase minimal />
        </div>

        {children ? <div className="answer-feedback-actions">{children}</div> : null}
      </div>
    );
  }

  return (
    <div className={`feedback answer-feedback-panel ${isCorrect ? 'success' : 'danger'} answer-feedback-panel-pro`} aria-live="polite">
      <div className="answer-feedback-grid answer-feedback-grid-pro">
        <ReasoningCard reasoningText={reasoningText} isCorrect={isCorrect} glossaryEnabled={glossaryEnabled} />
        <ExamNoteFeedback signal={examSignal} glossaryEnabled={glossaryEnabled} />
        <EvidenceChainCard evidenceChain={evidenceChain} glossaryEnabled={glossaryEnabled} />
        {shouldRenderPearls ? <ClinicalPearlsList pearls={pearls} glossaryEnabled={glossaryEnabled} /> : null}
        <FeedbackManagementCard managementSteps={managementSteps} glossaryEnabled={glossaryEnabled} clinicalCase={clinicalCase} />
        <OptionComparisonCard comparisons={optionComparisons} glossaryEnabled={glossaryEnabled} isSpotCase={isSpotCase} />
      </div>

      {children ? <div className="answer-feedback-actions">{children}</div> : null}
    </div>
  );
}

export default AnswerFeedbackPanel;
