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


function isGenericNextStep(value = '') {
  const text = normalizeText(value).toLocaleLowerCase('tr');
  return !text
    || /öykü,? muayene ve objektif veriyi birlikte yorumlayarak klinik kararını doğrula/.test(text)
    || /öykü,? fizik muayene ve objektif veriler.*klinik karar/.test(text);
}

function isManagementTarget(clinicalCase = {}) {
  const target = normalizeText(clinicalCase.answerTarget || clinicalCase.questionType || '').toLocaleLowerCase('tr');
  return /^(first_step|next_step|treatment|prevention|management)$/iu.test(target);
}

function allowsManagementFeedback(clinicalCase = {}) {
  if (!isManagementTarget(clinicalCase)) return false;
  const feedback = getFeedback(clinicalCase);
  const explicitSteps = feedback.managementSteps || feedback.management;
  if (Array.isArray(explicitSteps) && explicitSteps.some((step) => normalizeText(itemText(step)))) return true;
  return !isGenericNextStep(clinicalCase.diagnosis?.nextStep || '');
}



function normalizeMedicalAbbreviations(value = '') {
  let text = String(value ?? '');

  const replacements = [
    [/\bKavernöz sinüste\s+VI\.\s*sinir\s+içeride,?\s*III-IV-V1-V2\s+lateral\s+duvardadır;?\s*II\.\s*sinir\s+bu\s+listeye\s+girmez\.?/giu, 'Kavernöz sinüste abdusens siniri sinüs içinden geçer; okulomotor, troklear, oftalmik ve maksiller sinirler lateral duvardadır. Optik sinir bu listeye girmez.'],
    [/\bKavernöz sinüste\s+VI\.\s*sinir\s+içeride\b/giu, 'Kavernöz sinüste abdusens siniri sinüs içinden geçer'],
    [/\bVI\.\s*sinir(?:i|in)?\b/giu, 'abdusens siniri'],
    [/\bII\.\s*sinir(?:i|in)?\b/giu, 'optik sinir'],
    [/\bIII\.\s*sinir(?:i|in)?\b/giu, 'okulomotor sinir'],
    [/\bIV\.\s*sinir(?:i|in)?\b/giu, 'troklear sinir'],
    [/\bIII-IV-V1-V2\b/giu, 'okulomotor, troklear, oftalmik ve maksiller sinirler'],
    [/\bIII\s*,\s*IV\s*,\s*V1\s*(?:ve|,)?\s*V2\b/giu, 'okulomotor, troklear, oftalmik ve maksiller sinirler'],
    [/\bV1\b/gu, 'oftalmik sinir'],
    [/\bV2\b/gu, 'maksiller sinir'],
    [/\bNervus\s+oculomotorius\b/gu, 'Okulomotor sinir'],
    [/\bnervus\s+oculomotorius\b/gu, 'okulomotor sinir'],
    [/\bNervus\s+trochlearis\b/gu, 'Troklear sinir'],
    [/\bnervus\s+trochlearis\b/gu, 'troklear sinir'],
    [/\bNervus\s+abducens\b/gu, 'Abdusens siniri'],
    [/\bnervus\s+abducens\b/gu, 'abdusens siniri'],
    [/\bNervus\s+opticus\b/gu, 'Optik sinir'],
    [/\bnervus\s+opticus\b/gu, 'optik sinir'],
    [/\bArteria\s+carotis\s+interna\b/gu, 'İnternal karotis arter'],
    [/\barteria\s+carotis\s+interna\b/gu, 'internal karotis arter'],
    [/\bsinus\s+cavernosus\b/giu, 'kavernöz sinüs'],
    [/\bSinus\s+cavernosus\b/gu, 'Kavernöz sinüs'],
    [/\bcanalis\s+opticus\b/giu, 'optik kanal'],
    // Microbiology genus abbreviations: prevent sentence splitters from reading
    // "C. difficile" or "E. coli" as a one-letter sentence.
    [/\b[Cc]\.\s*[Dd]ifficile([’'`]?nin|[’'`]?de|[’'`]?den|[’'`]?ye|[’'`]?yi|[’'`]?e|[’'`]?i)?\b/gu, (_match, suffix = '') => `Clostridioides difficile${suffix}`],
    [/\b[Ee]\.\s*[Cc]oli([’'`]?nin|[’'`]?de|[’'`]?den|[’'`]?ye|[’'`]?yi|[’'`]?e|[’'`]?i)?\b/gu, (_match, suffix = '') => `Escherichia coli${suffix}`],
    [/\b[Ss]\.\s*[Aa]ureus([’'`]?un|[’'`]?ta|[’'`]?tan|[’'`]?a|[’'`]?u)?\b/gu, (_match, suffix = '') => `Staphylococcus aureus${suffix}`],
    [/\b[Ss]\.\s*[Pp]neumoniae([’'`]?nin|[’'`]?de|[’'`]?den|[’'`]?ye|[’'`]?yi|[’'`]?e|[’'`]?i)?\b/gu, (_match, suffix = '') => `Streptococcus pneumoniae${suffix}`],
    [/\b[Hh]\.\s*[Pp]ylori([’'`]?nin|[’'`]?de|[’'`]?den|[’'`]?ye|[’'`]?yi|[’'`]?e|[’'`]?i)?\b/gu, (_match, suffix = '') => `Helicobacter pylori${suffix}`],
    [/\b[Nn]\.\s*[Mm]eningitidis([’'`]?in|[’'`]?te|[’'`]?ten|[’'`]?e|[’'`]?i)?\b/gu, (_match, suffix = '') => `Neisseria meningitidis${suffix}`],
    [/\b[Pp]\.\s*[Aa]eruginosa([’'`]?n[ıi]n|[’'`]?da|[’'`]?dan|[’'`]?ya|[’'`]?y[ıi])?\b/gu, (_match, suffix = '') => `Pseudomonas aeruginosa${suffix}`],
    [/\b[Mm]\.\s*[Tt]uberculosis([’'`]?in|[’'`]?te|[’'`]?ten|[’'`]?e|[’'`]?i)?\b/gu, (_match, suffix = '') => `Mycobacterium tuberculosis${suffix}`],
    [/\b[Bb]\.\s*[Pp]ertussis([’'`]?in|[’'`]?te|[’'`]?ten|[’'`]?e|[’'`]?i)?\b/gu, (_match, suffix = '') => `Bordetella pertussis${suffix}`],
    [/\b[nN]\.\s*maxillarisin\b/gu, 'maksiller sinirin'],
    [/\b[nN]\.\s*maxillaris\b/gu, 'maksiller sinir'],
    [/\b[nN]\.\s*mandibularisin\b/gu, 'mandibular sinirin'],
    [/\b[nN]\.\s*mandibularis\b/gu, 'mandibular sinir'],
    [/\b[nN]\.\s*hypoglossusun\b/gu, 'hipoglossal sinirin'],
    [/\b[nN]\.\s*hypoglossus\b/gu, 'hipoglossal sinir'],
    [/\b[nN]\.\s*facialisin\b/gu, 'fasiyal sinirin'],
    [/\b[nN]\.\s*facialis\b/gu, 'fasiyal sinir'],
    [/\b[nN]\.\s*thoracicus\s+longusun\b/gu, 'uzun torasik sinirin'],
    [/\b[nN]\.\s*thoracicus\s+longus\b/gu, 'uzun torasik sinir'],
    [/\b[nN]\.\s*axillaris\b/gu, 'aksiller sinir'],
    [/\b[nN]\.\s*suprascapularis\b/gu, 'supraskapular sinir'],
    [/\b[nN]\.\s*abducens\b/gu, 'abdusens siniri'],
    [/\b[nN]\.\s*oculomotorius\b/gu, 'okulomotor sinir'],
    [/\b[nN]\.\s*trochlearis\b/gu, 'troklear sinir'],
    [/\b[nN]\.\s*ophthalmicus\b/gu, 'oftalmik sinir'],
    [/\b[nN]\.\s*opticus\b/gu, 'optik sinir'],
    [/\b[nN]\.\s*femoralis\b/gu, 'femoral sinir'],
    [/\b[nN]\.\s*saphenus\b/gu, 'safen sinir'],
    [/\b[nN]\.\s*laryngeus\s+recurrens\b/gu, 'rekürren laringeal sinir'],
    [/\b[nN]\.\s*laryngeus\s+superior\b/gu, 'superior laringeal sinir'],
    [/\b[aA]\.\s*meningea\s+media[-–—]?spinosum\b/gu, 'orta meningeal arter–foramen spinosum'],
    [/\b[aA]\.\s*meningea\s+media\b/gu, 'orta meningeal arter'],
    [/\b[aA]\.\s*carotis\s+interna\b/gu, 'internal karotis arter'],
    [/\b[aA]\.\s*femoralis\b/gu, 'femoral arter'],
    [/\b[vV]\.\s*jugularis\s+interna\b/gu, 'internal juguler ven'],
    [/\b[vV]\.\s*femoralis\b/gu, 'femoral ven'],
    [/\b[mM]\.\s*serratus\s+anterior\b/gu, 'serratus anterior kası'],
    [/\b[mM]\.\s*deltoideus\b/gu, 'deltoid kas'],
    [/\b[mM]\.\s*latissimus\s+dorsi\b/gu, 'latissimus dorsi kası'],
    [/\b[mM]\.\s*supraspinatus\b/gu, 'supraspinatus kası'],
    [/\b[mM]\.\s*rhomboideus\s+major\b/gu, 'rhomboid major kası'],
    [/\b[mM]\.\s*sternocleidomastoideus\b/gu, 'sternokleidomastoid kas'],
    [/\b[mM]\.\s*posterior\s+cricoarytenoideus\b/gu, 'posterior krikoaritenoid kas'],
    [/\b[mM]\.\s*lateral\s+cricoarytenoideus\b/gu, 'lateral krikoaritenoid kas'],
    [/\b[mM]\.\s*transversus\s+arytenoideus\b/gu, 'transvers aritenoid kas'],
    [/\b[mM]\.\s*thyroarytenoideus\b/gu, 'tiroaritenoid kas'],
    [/\b[mM]\.\s*cricothyroideus\b/gu, 'krikotiroid kas'],
    [/\b[Ll]ig\.\s*/gu, 'ligamentum '],
    [/\b[Pp]roc\.\s*/gu, 'processus '],
    [/\b[Ff]or\.\s*/gu, 'foramen '],
    [/\b[Aa]rt\.\s*/gu, 'articulatio '],
    [/\bNervus thoracicus longus\b/gu, 'Uzun torasik sinir'],
    [/\bnervus thoracicus longus\b/gu, 'uzun torasik sinir'],
    [/\bMusculus serratus anterior\b/gu, 'Serratus anterior kası'],
    [/\bmusculus serratus anterior\b/gu, 'serratus anterior kası'],
    [/\bMusculus deltoideus\b/gu, 'Deltoid kas'],
    [/\bmusculus deltoideus\b/gu, 'deltoid kas'],
    [/\bMusculus latissimus dorsi\b/gu, 'Latissimus dorsi kası'],
    [/\bmusculus latissimus dorsi\b/gu, 'latissimus dorsi kası'],
    [/\bMusculus supraspinatus\b/gu, 'Supraspinatus kası'],
    [/\bmusculus supraspinatus\b/gu, 'supraspinatus kası'],
    [/\bMusculus rhomboideus major\b/gu, 'Rhomboid major kası'],
    [/\bmusculus rhomboideus major\b/gu, 'rhomboid major kası'],
  ];

  replacements.forEach(([pattern, replacement]) => {
    text = text.replace(pattern, replacement);
  });

  return text
    .replace(/\bn\.\s*([A-Za-zÇĞİÖŞÜçğıöşü-]+)/gu, 'nervus $1')
    .replace(/\bm\.\s*([A-Za-zÇĞİÖŞÜçğıöşü-]+)/gu, 'musculus $1')
    .replace(/\ba\.\s*([A-Za-zÇĞİÖŞÜçğıöşü-]+)/gu, 'arteria $1')
    .replace(/\bv\.\s*([A-Za-zÇĞİÖŞÜçğıöşü-]+)/gu, 'vena $1');
}

function normalizeText(value = '') {
  return normalizeMedicalAbbreviations(repairAIGeneratedText(String(value ?? ''), { fallback: String(value ?? '') }))
    .replace(/\bASİT\s*[-–—]?\s*baz\b/giu, 'Asit-baz')
    .replace(/\bASIT\s*[-–—]?\s*baz\b/giu, 'Asit-baz')
    .replace(/\bASİT\s*[-–—]?\s*BAZ\b/giu, 'Asit-baz')
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
  const source = stripFeedbackHeading(itemText(raw));
  let pearl = compactParagraph(source, 2, 360);

  // Safety: if a dotted abbreviation or Roman-numeral cranial nerve shorthand
  // slipped through and produced only "C.", "VI.", etc., use the repaired full note.
  if (/^(?:[A-ZÇĞİÖŞÜ]|I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII)\.$/u.test(pearl) || pearl.length < 12 || /\b(?:[A-ZÇĞİÖŞÜ]|I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII)\.$/u.test(pearl)) {
    pearl = truncateSentence(source, 360);
  }

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
  const normalized = normalizeText(text);
  if (!normalized) return [];

  const protectedText = normalized
    .replace(/\b([A-ZÇĞİÖŞÜ])\.\s+(?=[A-ZÇĞİÖŞÜa-zçğıöşü])/gu, '$1<abbr-dot> ')
    .replace(/\b(I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII)\.\s+(?=(?:sinir|Sinir|kranial|Kranial|[A-ZÇĞİÖŞÜa-zçğıöşü]))/gu, '$1<roman-dot> ');

  return protectedText
    .split(/(?<=[.!?])\s+(?=[A-ZÇĞİÖŞÜ0-9])/u)
    .map((sentence) => sentence.replace(/<abbr-dot>/g, '.').replace(/<roman-dot>/g, '.').trim())
    .filter((sentence) => sentence && !/^(?:[A-ZÇĞİÖŞÜ]|I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII)\.$/u.test(sentence));
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
    .replace(/Bu\s+seçenek\s+soru\s+kökündeki\s+(?:hatalı\/?istisna|hatalı|istisna)\s+ifadeyi\s+karşılar\.?/giu, '')
    .replace(/^\s*(?:Seçilmelidir|Yanlıştır|Doğrudur)\s*[;:.-]?\s*/giu, '')
    .replace(/\s+(?:Seçilmelidir|Yanlıştır|Doğrudur)\s*;\s*/giu, ' ')
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
  const selected = candidates.find((item) => normalizeText(itemText(item)));
  return truncateSentence(removeMetaLanguage(itemText(selected)), 190);
}

function deriveWhyCorrect(clinicalCase) {
  const feedback = getFeedback(clinicalCase);
  const isSpotCase = clinicalCase.caseType === 'ai-spot' || clinicalCase.branchId === 'tus-spot-olgular';
  const explicit = normalizeText(feedback.whyCorrect || '');
  if (explicit) return compactParagraph(removeMetaLanguage(explicit), isSpotCase ? 6 : 4, isSpotCase ? 900 : 620);

  const explanation = normalizeText(clinicalCase.diagnosis?.explanation || clinicalCase.explanation || '');
  if (explanation) return compactParagraph(removeMetaLanguage(explanation), isSpotCase ? 6 : 4, isSpotCase ? 900 : 620);

  const clue = getMainClue(clinicalCase);
  const correct = clinicalCase.diagnosis?.correct || 'doğru seçenek';
  return `${clue ? `${clue} klinik kararı yönlendiren temel ipucudur. ` : ''}${correct} öykü, muayene ve objektif veriler birlikte ele alındığında en tutarlı seçenektir.`;
}

function normalizeWrongMap(clinicalCase) {
  const feedback = getFeedback(clinicalCase);
  const optionTexts = Array.isArray(clinicalCase.diagnosis?.options) ? clinicalCase.diagnosis.options : [];
  const letterToOption = optionTexts.reduce((accumulator, option, index) => {
    const letter = String.fromCharCode(65 + index);
    accumulator[letter] = option;
    return accumulator;
  }, {});

  const maps = [
    feedback.whyWrong,
    feedback.differentialComparison,
    feedback.differentials,
    feedback.differentialExplanations,
    feedback.optionComparison,
    feedback.optionFeedback,
    feedback.feedbackByOption,
    feedback.answerFeedbackByOption,
    feedback.optionRationales,
    clinicalCase.diagnosis?.differentials,
    clinicalCase.diagnosis?.optionComparison,
    clinicalCase.diagnosis?.optionFeedback,
    clinicalCase.diagnosis?.feedbackByOption,
    clinicalCase.diagnosis?.answerFeedbackByOption,
    clinicalCase.diagnosis?.optionRationales,
  ].filter((map) => map && typeof map === 'object' && !Array.isArray(map));

  return maps.reduce((accumulator, map) => {
    Object.entries(map).forEach(([rawKey, value]) => {
      const key = letterToOption[rawKey] || rawKey;
      if (!key || accumulator[key]) return;
      if (typeof value === 'string') accumulator[key] = { explanation: value, comparisonPoints: [] };
      else accumulator[key] = {
        explanation: value?.explanation || value?.summary || value?.text || '',
        comparisonPoints: value?.comparisonPoints || value?.points || value?.keyClues || [],
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
    return 'Seçilen seçenek için ayırt ettirici açıklama üretilemedi.';
  }

  return 'Seçilen seçenek için ayırt ettirici açıklama üretilemedi.';
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
  const rawPearls = [];

  if (feedback.examPearl) rawPearls.push({ label: 'Sınav notu', text: feedback.examPearl });

  const pearlSources = [feedback.clinicalPearls, feedback.pearls, clinicalCase.diagnosis?.pearls];
  pearlSources.forEach((pearls) => {
    if (Array.isArray(pearls)) rawPearls.push(...pearls);
  });

  return unique(rawPearls)
    .slice(0, MAX_PEARL_ITEMS)
    .map((item, index) => {
      const fallbackLabel = typeof item === 'object' && item?.label ? item.label : inferPearlLabel(itemText(item), index);
      const normalized = normalizeTitledItem(item, index, fallbackLabel, 190);
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
    if (isGenericNextStep(nextStep)) return [];
    steps = splitActionItems(nextStep);
  }

  return unique(steps)
    .slice(0, MAX_MANAGEMENT_ITEMS)
    .map((step, index) => normalizeTitledItem(step, index, inferManagementTitle(itemText(step), index), 190))
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
  const optionTexts = Array.isArray(clinicalCase.diagnosis?.options) ? clinicalCase.diagnosis.options : [];
  const correctIndex = optionTexts.findIndex((item) => item === option);
  const correctLetter = correctIndex >= 0 ? String.fromCharCode(65 + correctIndex) : '';
  const explicit = feedback.correctOptionFeedback
    || feedback.correctChoiceFeedback
    || feedback.optionRationales?.[option]
    || feedback.optionRationales?.[correctLetter]
    || feedback.differentialComparison?.[option]?.explanation
    || feedback.differentialComparison?.[correctLetter]?.explanation
    || feedback.optionFeedback?.[option]?.explanation
    || feedback.feedbackByOption?.[option]?.explanation
    || feedback.answerFeedbackByOption?.[option]?.explanation
    || clinicalCase.diagnosis?.optionFeedback?.[option]?.explanation
    || clinicalCase.diagnosis?.feedbackByOption?.[option]?.explanation
    || clinicalCase.diagnosis?.answerFeedbackByOption?.[option]?.explanation
    || feedback.optionComparison?.[option]
    || feedback.optionComparison?.[correctLetter]
    || clinicalCase.diagnosis?.optionComparison?.[option]
    || clinicalCase.diagnosis?.optionComparison?.[correctLetter]
    || '';
  if (explicit) {
    return singleSentence(removeMetaLanguage(explicit), 240);
  }

  const whyCorrect = feedback.whyCorrect || feedback.rationale || clinicalCase.diagnosis?.whyCorrect || clinicalCase.diagnosis?.explanation || '';
  if (whyCorrect) {
    return singleSentence(removeMetaLanguage(whyCorrect), 240);
  }

  return 'Doğru seçenek için ayrıntılı açıklama üretilemedi.';
}

function buildOptionComparisons(clinicalCase, selectedOption, evidenceChain = []) {
  const feedback = getFeedback(clinicalCase);
  const correct = clinicalCase.diagnosis?.correct;
  const options = Array.isArray(clinicalCase.diagnosis?.options) ? clinicalCase.diagnosis.options : [];
  const wrongMap = normalizeWrongMap(clinicalCase);
  const normalizedWrongMap = Object.entries(wrongMap).reduce((accumulator, [key, value]) => {
    accumulator[normalizeForCompare(key)] = value;
    return accumulator;
  }, {});
  const isAISpot = clinicalCase.caseType === 'ai-spot' || clinicalCase.branchId === 'tus-spot-olgular';

  return options.slice(0, MAX_COMPARISON_ITEMS).map((option) => {
    const isCorrectOption = option === correct;
    if (isCorrectOption) {
      return {
        option,
        status: 'correct',
        isSelected: selectedOption === option,
        title: 'En iyi seçenek',
        explanation: isAISpot
          ? compactParagraph(removeMetaLanguage(deriveCorrectOptionSummary(clinicalCase, option, evidenceChain)), 3, 420)
          : singleSentence(deriveCorrectOptionSummary(clinicalCase, option, evidenceChain), 210),
        comparisonPoints: [],
      };
    }

    const explicit = wrongMap[option] || normalizedWrongMap[normalizeForCompare(option)] || {};
    const rawExplanation = removeMetaLanguage(explicit.explanation || 'Bu seçenek için ayırt ettirici açıklama üretilemedi.');
    const explanation = isAISpot ? compactParagraph(rawExplanation, 3, 360) : singleSentence(rawExplanation, 190);
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


function getAISpotOptions(clinicalCase = {}) {
  const diagnosisOptions = Array.isArray(clinicalCase.diagnosis?.options) ? clinicalCase.diagnosis.options : [];
  if (diagnosisOptions.length) return diagnosisOptions.map(itemText).filter(Boolean);
  const rawOptions = Array.isArray(clinicalCase.options) ? clinicalCase.options : [];
  return rawOptions.map((option) => itemText(option?.text || option)).filter(Boolean);
}

function getAISpotOptionLetter(clinicalCase = {}, optionText = '') {
  const options = getAISpotOptions(clinicalCase);
  const normalized = normalizeForCompare(optionText);
  const index = options.findIndex((option) => normalizeForCompare(option) === normalized);
  return index >= 0 ? String.fromCharCode(65 + index) : '';
}

function resolveAISpotOptionText(clinicalCase = {}, key = '') {
  const options = getAISpotOptions(clinicalCase);
  const rawKey = normalizeText(key);
  const letterMatch = rawKey.match(/^[A-E]$/iu);
  if (letterMatch) return options[rawKey.toLocaleUpperCase('tr').charCodeAt(0) - 65] || rawKey;
  const normalized = normalizeForCompare(rawKey);
  return options.find((option) => normalizeForCompare(option) === normalized) || rawKey;
}

function pickAISpotCorrectOption(clinicalCase = {}) {
  return normalizeText(
    clinicalCase.diagnosis?.correct
    || clinicalCase.correctOptionText
    || clinicalCase.correctAnswerText
    || resolveAISpotOptionText(clinicalCase, clinicalCase.correctAnswer || '')
    || ''
  );
}

function getAISpotMapValue(map, optionText = '', letter = '') {
  if (!map || typeof map !== 'object' || Array.isArray(map)) return '';
  const direct = map[optionText] || map[letter] || map[letter?.toLocaleUpperCase?.('tr')];
  if (direct) return itemText(direct);
  const normalizedOption = normalizeForCompare(optionText);
  const matched = Object.entries(map).find(([key]) => normalizeForCompare(key) === normalizedOption);
  return matched ? itemText(matched[1]) : '';
}

function mergeUniqueSentences(parts = [], maxSentences = 7, maxLength = 1350) {
  const seen = new Set();
  const sentences = [];
  parts.forEach((part) => {
    splitIntoSentences(removeMetaLanguage(itemText(part))).forEach((sentence) => {
      const cleaned = ensureSentence(sentence);
      const key = normalizeForCompare(cleaned);
      if (!key || seen.has(key)) return;
      seen.add(key);
      sentences.push(cleaned);
    });
  });
  const text = sentences.slice(0, maxSentences).join(' ');
  return truncateSentence(text, maxLength);
}

function resolveAISpotOptionExplanation(clinicalCase = {}, optionText = '', fallback = '') {
  const feedback = getFeedback(clinicalCase);
  const letter = getAISpotOptionLetter(clinicalCase, optionText);
  const sources = [
    getAISpotMapValue(feedback.whyWrong, optionText, letter),
    getAISpotMapValue(feedback.optionComparison, optionText, letter),
    getAISpotMapValue(feedback.optionFeedback, optionText, letter),
    getAISpotMapValue(feedback.feedbackByOption, optionText, letter),
    getAISpotMapValue(feedback.answerFeedbackByOption, optionText, letter),
    getAISpotMapValue(feedback.optionRationales, optionText, letter),
    getAISpotMapValue(clinicalCase.diagnosis?.whyWrong, optionText, letter),
    getAISpotMapValue(clinicalCase.diagnosis?.optionComparison, optionText, letter),
    getAISpotMapValue(clinicalCase.diagnosis?.optionFeedback, optionText, letter),
    getAISpotMapValue(clinicalCase.diagnosis?.feedbackByOption, optionText, letter),
    getAISpotMapValue(clinicalCase.diagnosis?.answerFeedbackByOption, optionText, letter),
    fallback,
  ].filter(Boolean);
  return mergeUniqueSentences(sources, 4, 760) || 'Bu seçenek için ayrıntılı açıklama eklenemedi.';
}

function buildAISpotDetailedRows(clinicalCase = {}, selectedOption = '') {
  const options = getAISpotOptions(clinicalCase);
  const correctOption = pickAISpotCorrectOption(clinicalCase);
  const selectedNormalized = normalizeForCompare(resolveAISpotOptionText(clinicalCase, selectedOption));
  const correctNormalized = normalizeForCompare(correctOption);

  return options.map((option, index) => {
    const letter = String.fromCharCode(65 + index);
    const isCorrectOption = normalizeForCompare(option) === correctNormalized;
    const isSelectedOption = normalizeForCompare(option) === selectedNormalized;
    return {
      letter,
      option,
      status: isCorrectOption ? 'correct' : 'wrong',
      isSelected: isSelectedOption,
      explanation: resolveAISpotOptionExplanation(clinicalCase, option),
    };
  });
}

function isAISpotExceptionQuestion(clinicalCase = {}) {
  const stem = normalizeText(clinicalCase.stem || clinicalCase.question || clinicalCase.diagnosis?.question || '');
  return /yanl[ıi][şs]t[ıi]r|hatal[ıi]d[ıi]r|do[ğg]ru de[ğg]ildir|de[ğg]ildir|olmayan|istisna/iu.test(stem);
}

function decorateAISpotSelectedExplanation(clinicalCase = {}, row = {}, isCorrect = false) {
  const text = removeMetaLanguage(row?.explanation || '');
  if (isCorrect) return text;
  if (isAISpotExceptionQuestion(clinicalCase) && /do[ğg]rudur|ifade do[ğg]rudur|seçenek do[ğg]ru/iu.test(text)) {
    return mergeUniqueSentences([
      `Seçtiğin ifade bilimsel olarak doğrudur; ancak soru kökü yanlış veya istisna olan ifadeyi sorduğu için bu yanıt elenir.`,
      text,
    ], 4, 760);
  }
  return text;
}

function decorateAISpotCorrectExplanation(clinicalCase = {}, row = {}) {
  const text = removeMetaLanguage(row?.explanation || '');
  return text;
}

function buildAISpotScienceText(clinicalCase = {}, whyCorrect = '') {
  const feedback = getFeedback(clinicalCase);
  const evidenceTexts = Array.isArray(clinicalCase.evidenceChain)
    ? clinicalCase.evidenceChain.map((item) => item?.text || item)
    : [];
  return mergeUniqueSentences([
    clinicalCase.coreKnowledge,
    clinicalCase.explanation,
    clinicalCase.diagnosis?.explanation,
    feedback.whyCorrect,
    feedback.rationale,
    whyCorrect,
    ...evidenceTexts,
  ], 12, 2600);
}

function groupSentencesForAISpotScience(sentences = []) {
  const clean = sentences.map((sentence) => ensureSentence(sentence)).filter(Boolean);
  if (clean.length <= 2) return [{ title: 'Temel mantık', text: clean.join(' ') }];

  const firstBlockSize = clean.length >= 6 ? 2 : 1;
  const secondBlockSize = clean.length >= 5 ? 2 : 1;
  const blocks = [
    { title: 'Temel mantık', sentences: clean.slice(0, firstBlockSize) },
    { title: 'Klinik sonuç', sentences: clean.slice(firstBlockSize, firstBlockSize + secondBlockSize) },
    { title: 'Ayırıcı ayrım', sentences: clean.slice(firstBlockSize + secondBlockSize) },
  ]
    .map((block) => ({ title: block.title, text: block.sentences.join(' ') }))
    .filter((block) => normalizeText(block.text));

  return blocks.length ? blocks : [{ title: 'Temel mantık', text: clean.join(' ') }];
}

function buildAISpotScienceBlocks(scienceText = '') {
  const sentences = splitIntoSentences(scienceText);
  if (!sentences.length) return [];
  return groupSentencesForAISpotScience(sentences);
}

function AISpotDetailedFeedback({ clinicalCase, selectedOption, isCorrect, whyCorrect, whyWrong, pearl, children, glossaryEnabled = true }) {
  const rows = buildAISpotDetailedRows(clinicalCase, selectedOption);
  const selectedText = resolveAISpotOptionText(clinicalCase, selectedOption);
  const correctText = pickAISpotCorrectOption(clinicalCase);
  const selectedRow = rows.find((row) => normalizeForCompare(row.option) === normalizeForCompare(selectedText));
  const correctRow = rows.find((row) => row.status === 'correct') || rows.find((row) => normalizeForCompare(row.option) === normalizeForCompare(correctText));
  const selectedExplanation = decorateAISpotSelectedExplanation(clinicalCase, selectedRow, isCorrect) || whyWrong;
  const correctExplanation = decorateAISpotCorrectExplanation(clinicalCase, correctRow) || whyCorrect;
  const scienceText = buildAISpotScienceText(clinicalCase, whyCorrect);
  const scienceBlocks = buildAISpotScienceBlocks(scienceText);
  return (
    <div className={`feedback answer-feedback-panel ${isCorrect ? 'success' : 'danger'} answer-feedback-panel-pro ai-spot-detailed-feedback-panel ai-spot-detailed-feedback-panel-v246`} aria-live="polite">
      <div className="ai-spot-detailed-feedback-shell ai-spot-detailed-feedback-shell-v246">
        <div className={`ai-spot-feedback-choice-grid ai-spot-feedback-choice-grid-v246 ${isCorrect ? 'single' : ''}`.trim()}>
          <article className={`ai-spot-feedback-choice-card ${isCorrect ? 'is-correct' : 'is-selected-wrong'}`.trim()}>
            <span className="ai-spot-choice-kicker">Seçimin</span>
            <strong><GlossaryText text={selectedText || 'Seçim bulunamadı'} enabled={glossaryEnabled} /></strong>
            <p><GlossaryText text={ensureSentence(selectedExplanation || 'Seçilen seçenek için açıklama bulunamadı.')} enabled={glossaryEnabled} /></p>
          </article>

          {!isCorrect ? (
            <article className="ai-spot-feedback-choice-card is-correct">
              <span className="ai-spot-choice-kicker">Doğru cevap</span>
              <strong><GlossaryText text={correctText || 'Doğru cevap bulunamadı'} enabled={glossaryEnabled} /></strong>
              <p><GlossaryText text={ensureSentence(correctExplanation || 'Doğru seçenek için açıklama bulunamadı.')} enabled={glossaryEnabled} /></p>
            </article>
          ) : null}
        </div>

        {scienceBlocks.length ? (
          <section className="ai-spot-feedback-section-card ai-spot-feedback-science-card ai-spot-feedback-science-card-v246 ai-spot-feedback-science-card-v249">
            <header>
              <h4>Mekanizma ve sınav mantığı</h4>
            </header>
            <div className="ai-spot-science-flow-v249">
              {scienceBlocks.map((block, index) => (
                <article className="ai-spot-science-item-v249" key={`${block.title}-${index}`}>
                  <span className="ai-spot-science-step-v249">{block.title}</span>
                  <p><GlossaryText text={block.text} enabled={glossaryEnabled} /></p>
                </article>
              ))}
            </div>
            {pearl ? (
              <div className="ai-spot-feedback-pearl-card ai-spot-feedback-pearl-card-v246">
                <div className="ai-spot-pearl-icon"><Icon name="Sparkles" size={15} /></div>
                <div>
                  <span>TUS ipucu</span>
                  <p><GlossaryText text={ensureSentence(pearl)} enabled={false} /></p>
                </div>
              </div>
            ) : null}
          </section>
        ) : null}

        <section className="ai-spot-feedback-section-card ai-spot-feedback-options-card ai-spot-feedback-options-card-v246">
          <header>
            <h4>Seçenekleri nasıl elemeliydin?</h4>
          </header>
          <div className="ai-spot-feedback-option-list">
            {rows.map((row) => (
              <article
                className={`ai-spot-feedback-option-row ${row.status === 'correct' ? 'is-correct' : 'is-wrong'} ${row.isSelected ? 'is-selected' : ''}`.trim()}
                key={`${row.letter}-${row.option}`}
              >
                <div className="ai-spot-feedback-option-head">
                  <b>{row.letter}</b>
                  <strong><GlossaryText text={row.option} enabled={glossaryEnabled} /></strong>
                  {row.isSelected ? <em>Seçimin</em> : null}
                  {row.status === 'correct' ? <em className="correct">Doğru cevap</em> : null}
                </div>
                <p><GlossaryText text={ensureSentence(row.explanation)} enabled={glossaryEnabled} /></p>
              </article>
            ))}
          </div>
        </section>
      </div>

      {children ? <div className="answer-feedback-actions ai-spot-feedback-actions">{children}</div> : null}
    </div>
  );
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
      title={minimal ? '' : (isCorrect ? 'Gerekçe' : '')}
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
      title={minimal ? '' : ''}
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
    <FeedbackSection icon="Sparkles" tone="accent" eyebrow="Sınav notu" title="" className="clinical-pearls-card">
      <div className="clinical-pearl-list">
        {pearls.map((pearl, index) => (
          <div className="clinical-pearl-item clinical-pearl-item-pro" key={`${pearl.label}-${pearl.text}-${index}`}>
            <span aria-hidden="true" />
            <p><GlossaryText text={ensureSentence(pearl.text)} enabled={glossaryEnabled} /></p>
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
      title={minimal ? '' : ''}
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
            <p><strong><GlossaryText text={step.title} enabled={glossaryEnabled} /></strong>{' '}<GlossaryText text={ensureSentence(step.text)} enabled={glossaryEnabled} /></p>
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
      <AISpotDetailedFeedback
        clinicalCase={clinicalCase}
        selectedOption={selectedDiagnosis}
        isCorrect={isCorrect}
        whyCorrect={whyCorrect}
        whyWrong={whyWrong}
        pearl={singleLinePearl}
        glossaryEnabled={glossaryEnabled}
      >
        {children}
      </AISpotDetailedFeedback>
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
