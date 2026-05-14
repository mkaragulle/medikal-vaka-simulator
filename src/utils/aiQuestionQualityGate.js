import { normalizeQuestionText } from './aiQuestionHistory.js';
import { attachQuestionDedupeFields, getQuestionCorrectText, getQuestionOptionTexts, toPlainText } from './questionDeduplication.js';
import { sanitizeMeasurementText, sanitizeVitalsObject } from './clinicalFormatters.js';
import { validateBranchFit } from './aiBranchRules.js';
import { repairScientificAccuracy, scientificAccuracyGate } from './clinicalScientificAccuracyGate.js';
import { normalizeInvestigationLabResults, validateInvestigationLabCompleteness, hasIncompleteLabResultText } from './clinicalValueFormatters.js';
import { repairAnswerLeakage, runAnswerLeakageGate } from './answerLeakageGate.js';
import { applyTusLanguageStandardToQuestion, normalizeTusLanguageText, hasWeakTusLanguage } from './tusLanguageStandard.js';
import { applyFeedbackQualityStandardToQuestion, validateFeedbackQualityStandard } from './feedbackQualityStandard.js';
import { applySingleBestAnswerStandard, validateSingleBestAnswerGate } from './singleBestAnswerGate.js';
import { applyFinalAIQuestionSafetyStandard, validateFinalAIQuestionSafetyGate } from './finalAIQuestionSafetyGate.js';
import { validateClinicalCoherenceHardGate } from './clinicalCoherenceHardGate.js';
import {
  detectBrokenSentence,
  detectExcessivePunctuation,
  detectMetaLanguage,
  detectTemplateLikeFeedback,
  detectInvalidClinicalMeasurementFormat,
  repairFeedbackText as repairEditorialFeedbackText,
  validateClinicalMeaning,
  validateGeneratedCaseText,
  repairAIGeneratedText,
  isPlaceholderInvestigationText,
  isForbiddenEditorialText,
  hasRepeatedShortPhrase,
} from './editorialQuality.js';

export const AI_QUALITY_FORBIDDEN_PHRASES = [
  'objektif veri sağlar',
  'hastanın durumu değerlendirilir',
  'hangi tedavi yöntemi ilk sırada uygulanmalıdır',
  'kendi tipik öykü, muayene veya tetkik paterni varsa güç kazanır',
  'doğru cevabı destekleyen ana ipucudur',
  'öğrenme hedefi',
  'çeldirici',
  'doğru seçenek',
  'yanıt ekseni',
  'patern ve mekanizma',
  'kısa ve hedef odaklı yorumlanmalıdır',
  'klinik değerlendirme için ek veri',
  'klinik bağlamda',
  'bu soru',
  'öğrenci',
  'ai spot',
  'spot karar',
  'verilen öğrenme hedefi',
  'sonuçlar tek bir tanı adını yazmaz',
  'yüzeysel anahtar kelime',
  'tek öğrenme hedefinin doğru yorumlanmasına dayanır',
  'klinik veya temel bilim kategorisinde tutulduğu için',
  'klinik/temel bilim kategorisinde',
  'doğru yanıt eksenini oluşturur',
  'morfolojik patern. morfolojik patern',
  'morfolojik patern:',
  'karar verdirici paternyla',
  'likefaksiyon nekrozuyla',
  'objektif karar verisi',
  'hedeflenen öğrenme çıktısıyla',
  'gömülü vakadaki metni tekrar etmekten',
  'direkt tanı adı arama',
  'patern yorumlaması beklenir',
  'yanıtı açık etmeden',
  'seçenekler arasında doğrudan ezber',
  'tus sorusunda doğru ayrım',
  'değerlendirmesi başvurusunda',
  'nedeniyle değerlendirilir',
  'bu olguda elenir:',
  'karar verdiren ipucu',
  'bu nedenle en iyi yanıt',
  'çeldirici',
  'beklenen ana ipuçları bu tabloda baskın değildir',
  'karar adrenalin yönünde güçlenir',
  'karar doğru seçenek yönünde güçlenir',
  'ancak kendi tipik öykü, muayene veya tetkik paterni varsa güç kazanır',
  'laboratuvar paterni',
  'kanıt 2',
  'kanıt 3',
  'kanıt 4',
  'objektif bulguların karar basamağını desteklemesi',
  'doğru yanıta götüren ana bulgudur',
  'ilk karar',
  'tedavi önceliği',
  'bu veri klinik bağlamda değerlendirilir',
  'nedeniyle ameliyathane',
  'sağlayarak.',
];

const HARD_FORBIDDEN_REGEXES = [
  /\bhangi tedavi yöntemi ilk sırada uygulanmalıdır\b/iu,
  /\bkendi tipik öykü, muayene veya tetkik paterni varsa güç kazanır\b/iu,
  /\bdoğru yanıta götüren ana bulgudur\b/iu,
  /\b([a-zçğıöşü]+)\s+\1\b/iu,
  /\bçocuk\s+çocuk\b/iu,
  /\b(değerlendirmesi|yorumlanması)\s+başvurusunda\b/iu,
  /\bekseninde\s+(kısa|hedef|yorumlan)/iu,
  /\b12\s*yaş[^.]{0,80}\bemme\s+azalması\b/iu,
  /Morfolojik patern\.\s*Morfolojik patern/iu,
  /\bkarar verdirici paternyla\b/iu,
  /\blikefaksiyon nekrozuyla\b/iu,
  /\bkısa TUS pratiğinde ele alınır\b/iu,
  /\b(adölesan|ergen|çocuk)\b[^.]{0,80}\bemme\s+azalması\b/iu,
  /\bBeklenen ana ipuçları bu tabloda baskın değildir\b/iu,
  /\bKarar .{0,80} yönünde güçlenir\b/iu,
  /\bAncak kendi tipik öykü, muayene veya tetkik paterni varsa güç kazanır\b/iu,
  /\bLaboratuvar paterni\.?\b/iu,
  /\bKanıt\s*[2-4]\b/iu,
  /\bObjektif bulguların karar basamağını desteklemesi\b/iu,
  /\bDoğru yanıta götüren ana bulgudur\b/iu,
  /\bİlk karar\.?\b/iu,
  /\bTedavi önceliği\.?\b/iu,
  /\bBu veri klinik bağlamda değerlendirilir\b/iu,
  /\bNedeniyle Ameliyathane\b/iu,
  /\bsağlayarak\.\s*$/iu,
];

function normalizeForIncludes(text = '') {
  return normalizeQuestionText(text)
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u');
}

function hasForbiddenPhrase(text = '') {
  const normalized = normalizeForIncludes(text);
  return AI_QUALITY_FORBIDDEN_PHRASES.some((phrase) => normalized.includes(normalizeForIncludes(phrase)))
    || HARD_FORBIDDEN_REGEXES.some((regex) => regex.test(String(text || '')))
    || isForbiddenEditorialText(text);
}

function cleanSentence(text = '') {
  const initial = repairAIGeneratedText(sanitizeMeasurementText(String(text || '')), { fallback: '' }) || sanitizeMeasurementText(String(text || ''));
  let value = initial
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .replace(/(?<!\d)\.(?=\S)/g, '. ')
    .replace(/\s*\/\s*/g, '/')
    .replace(/\bAI\s*spot\b/giu, '')
    .replace(/\bçeldirici\s+ayrımı\b/giu, 'ayırıcı tanı')
    .replace(/\bçeldiriciler\b/giu, 'alternatifler')
    .replace(/\bçeldiriciyi\b/giu, 'alternatifi')
    .replace(/\bçeldirici\b/giu, 'alternatif')
    .replace(/\böğrenci\b/giu, 'hekim adayı')
    .replace(/\bverilen öğrenme hedefi\b/giu, 'klinik bilgi')
    .replace(/\böğrenme hedefi\b/giu, 'klinik bilgi')
    .replace(/\bdoğru seçenek\b/giu, 'uygun yanıt')
    .replace(/\byanıt ekseni\b/giu, 'klinik karar')
    .replace(/\bpatern ve mekanizma\b/giu, 'bulgu ilişkisi')
    .replace(/\bpatern yorumlaması\b/giu, 'bulgu yorumu')
    .replace(/\bklinik bağlamda\b/giu, 'bu tabloda')
    .replace(/\bklinik değerlendirme için ek veri sağlar\b/giu, '')
    .replace(/\bBeklenen ana ipuçları bu tabloda baskın değildir\b/giu, '')
    .replace(/\bKarar [^.]{0,80} yönünde güçlenir\b/giu, '')
    .replace(/\bAncak kendi tipik öykü, muayene veya tetkik paterni varsa güç kazanır\b/giu, '')
    .replace(/\bObjektif bulguların karar basamağını desteklemesi\b/giu, '')
    .replace(/\bDoğru yanıta götüren ana bulgudur\b/giu, '')
    .replace(/\bİlk karar\.?\b/giu, '')
    .replace(/\bTedavi önceliği\.?\b/giu, '')
    .replace(/\bKanıt\s*[2-4]\b/giu, '')
    .replace(/\bNedeniyle Ameliyathane\b/giu, '')
    .replace(/\bsonuçlar tek bir tanı adını yazmaz;?\s*/giu, '')
    .replace(/\bMorfolojik patern\.\s*Morfolojik patern\.?/giu, '')
    .replace(/\bMorfolojik patern\s*[:：]\s*/giu, '')
    .replace(/\bkarar verdirici paternyla\b/giu, 'karar verdirici paternle')
    .replace(/\blikefaksiyon nekrozuyla\b/giu, 'sıvılaşma nekrozu ile')
    .replace(/\bwheezing\b/giu, 'hışıltılı solunum')
    .replace(/\bbronchospasm\b/giu, 'bronkospazm')
    .replace(/\bhypotension\b/giu, 'hipotansiyon')
    .replace(/\bepinephrine\b/giu, 'epinefrin')
    .replace(/adrenalin\s*\(\s*epinefrin\s*\)/giu, 'adrenalin/epinefrin')
    .replace(/epinefrin\s*\(\s*adrenalin\s*\)/giu, 'adrenalin/epinefrin')
    .replace(/\b1\s*:\s*1000\b/giu, '1:1000')
    .replace(/\byüzeysel anahtar kelimeyle değil\b/giu, '')
    .replace(/\bkısa ve hedef odaklı yorumlanmalıdır\b/giu, 'birlikte değerlendirilir')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/^[,.;:!?\-\s]+|[,.;:!?\-\s]+$/g, '')
    .trim();
  if (/\b(sağlayarak|yaparak|ederek|ile|ve|için)\.?$/iu.test(value)) return '';
  return value;
}

function filterQualityItems(items = [], max = 4) {
  const seen = new Set();
  const output = [];
  items.map(toPlainText).map(cleanSentence).forEach((item) => {
    if (!item || item.length < 8) return;
    item = repairAIGeneratedText(item, { fallback: '' });
    if (!item || isPlaceholderInvestigationText(item) || hasRepeatedShortPhrase(item)) return;
    if (/^(ilk adım|sınav incisi|sınav notu|tus notu)\s*:/iu.test(item)) return;
    if (hasForbiddenPhrase(item)) return;
    const key = normalizeQuestionText(item);
    if (!key || seen.has(key)) return;
    seen.add(key);
    output.push(item);
  });
  return output.slice(0, max);
}

function textBundle(question = {}) {
  return normalizeForIncludes([
    question.title,
    question.learningTarget,
    question.clinicalFocus,
    question.stem,
    question.chiefComplaint,
    question.learningTarget,
    question.clinicalFocus,
    Object.values(question.wrongOptionFeedback || {}),
    question.diagnosis?.correct,
    question.examPearls,
    question.diagnosis?.answerFeedback?.clinicalPearls,
    question.diagnosis?.answerFeedback?.evidenceChain,
  ].map(toPlainText).join(' | '));
}

function isPediatrics(question = {}) {
  return /cocuk|pediatri|yenidogan|bebek|adolesan/.test(normalizeForIncludes(question.relatedBranch || question.branchName || question.spotCategory || ''));
}

function isObgyn(question = {}) {
  return /kadin|dogum|jinekoloji|obstetri|gebelik|gebe/.test(normalizeForIncludes(question.relatedBranch || question.branchName || question.spotCategory || ''));
}

function isBasicScience(question = {}) {
  return /fizyoloji|biyokimya|mikrobiyoloji|farmakoloji|patoloji|anatomi|histoloji|embriyoloji/.test(normalizeForIncludes(question.relatedBranch || question.branchName || question.spotCategory || ''));
}

function deriveBranchSpecificRisk(question = {}) {
  const bundle = textBundle(question);
  if (isPediatrics(question)) {
    if (/kawasaki|koroner|konjonktivit|cilek|mukozal|dudak/.test(bundle)) {
      return ['Beş günden uzun süren ateş', 'Mukokutanöz bulguların eşlik etmesi', 'Koroner arter tutulumu riski'];
    }
    if (/hie|hipoksik|iskemik|asfiksi|term|near term|ensefalopati/.test(bundle)) {
      return ['Doğumda asfiksi veya resüsitasyon öyküsü', 'İlk saatlerde bilinç ve tonus bozukluğu', 'Nörolojik sekel riskinin yüksek olması'];
    }
    if (/bruton|pyojenik|b hucre|immunglobulin|otitis|sinuzit/.test(bundle)) {
      return ['Erkek bebekte tekrarlayan pyojenik enfeksiyonlar', 'Altıncı aydan sonra maternal antikor korumasının azalması', 'B hücre ve immünoglobulin düşüklüğü olasılığı'];
    }
    if (/eritema toksikum|papulopustuler|eozinofilli/.test(bundle)) {
      return ['Yaşamın ilk günlerinde benign döküntü', 'Ateş veya toksik görünüm olmaması', 'Aileye güvence verme gereksinimi'];
    }
    if (/yenidogan|sarilik|bilirubin/.test(bundle)) {
      return ['Yenidoğan döneminde bilirubin nörotoksisitesi riski', 'Emme azalması veya letarjinin eşlik etmesi', 'Prematürite veya hemoliz olasılığı'];
    }
    if (/dehidratasyon|ishal|kusma|gastroenterit/.test(bundle)) {
      return ['Süt çocuklarında hızlı sıvı kaybı riski', 'Kusma veya ishalle oral alımın azalması', 'Kapiller dolum ve idrar çıkışının izlenmesi'];
    }
    if (/wheezing|bronsiolit|oksuruk|solunum/.test(bundle)) {
      return ['Süt çocukluğu döneminde küçük hava yolu obstrüksiyonu', 'Beslenme azalması ve solunum eforu riski', 'Hipoksemi gelişimi açısından yakın izlem'];
    }
    if (/nobet|febril/.test(bundle)) {
      return ['Ateşle ilişkili nöbet öyküsü', 'Yaşa göre basit ve komplike nöbet ayrımı', 'Menenjit bulgularının dışlanması gerekliliği'];
    }
    return ['Ateş, beslenme ve bilinç değişikliğinin birlikte izlenmesi', 'Yaş grubuna göre hızlı klinik kötüleşme riski', 'Aşılanma ve temas öyküsünün sorgulanması'];
  }
  if (isObgyn(question)) {
    if (/gebelik|gebe|preeklampsi|hipertansiyon/.test(bundle)) {
      return ['Gebelik haftası ve hipertansiyonun birlikte değerlendirilmesi', 'Anne ve fetal komplikasyon riski', 'Baş ağrısı, görme bulgusu veya proteinürinin sorgulanması'];
    }
    return ['Üreme çağı ve gebelik olasılığı', 'Vajinal kanama veya pelvik ağrının aciliyet oluşturması', 'Hemodinamik stabilitenin izlenmesi'];
  }
  if (/farmakoloji|ilac|toksin|antidot/.test(bundle)) {
    return ['İlaç veya toksin maruziyeti öyküsü', 'Doz ve zaman ilişkisinin klinik tabloyu belirlemesi', 'Antidot veya destek tedavisi gereksinimi'];
  }
  if (/mikrobiyoloji|seroloji|kultur|viral|bakteri|direnc|temas/.test(bundle)) {
    return ['Temas öyküsü veya örnek türünün yorumu değiştirmesi', 'Bağışıklık durumunun etken ayrımına etkisi', 'Seroloji, kültür veya direnç paterninin birlikte değerlendirilmesi'];
  }
  if (/fizyoloji|baroreseptor|sempatik|vagal|ventilasyon|perfuzyon/.test(bundle)) {
    return ['Temel mekanizmanın klinik bulguyla ilişkilendirilmesi', 'Kompansatuvar yanıtın yönünün ayırt edilmesi', 'Sistem yanıtının kısa süreli değişkenlerle değerlendirilmesi'];
  }
  return ['Başvuru yakınmasının zamanı ve seyri', 'Muayene bulgusunun klinik kararı desteklemesi', 'Komplikasyon veya gecikmiş tedavi riskinin dikkate alınması'];
}

function deriveBranchSpecificClues(question = {}) {
  const bundle = textBundle(question);
  if (isPediatrics(question)) {
    if (/kawasaki|koroner|konjonktivit|cilek|mukozal|dudak/.test(bundle)) {
      return ['Beş günden uzun süren ateş', 'Bilateral nonpürülan konjonktivit', 'Dudaklarda çatlama veya çilek dili', 'Döküntü ve ekstremite bulguları'];
    }
    if (/hie|hipoksik|iskemik|asfiksi|term|near term|ensefalopati/.test(bundle)) {
      return ['Term veya near-term yenidoğan', 'Asfiksi kanıtı ve düşük Apgar öyküsü', 'Orta-ağır ensefalopati bulguları', 'İlk 6 saatte nöroprotektif yaklaşım gereksinimi'];
    }
    if (/bruton|pyojenik|b hucre|immunglobulin|otitis|sinuzit/.test(bundle)) {
      return ['Altıncı aydan sonra tekrarlayan otitis veya pnömoni', 'Erkek bebekte B hücre azlığı', 'İmmünoglobulin düzeylerinde düşüklük', 'Canlı viral enfeksiyonlardan çok pyojenik bakterilerle seyir'];
    }
    if (/eritema toksikum|papulopustuler|eozinofilli/.test(bundle)) {
      return ['İlk günlerde ortaya çıkan papülopüstüler döküntü', 'Ateş veya toksik görünüm olmaması', 'Döküntünün kendiliğinden gerilemesi', 'Eozinofilli benign yenidoğan döküntüsü'];
    }
    if (/yenidogan|sarilik|bilirubin/.test(bundle)) {
      return ['Yaşamın ilk günlerinde belirgin sarılık', 'Emme azalması veya letarji', 'Total ve direkt bilirubin ayrımı', 'Hemoliz bulgularının sorgulanması'];
    }
    if (/dehidratasyon|ishal|kusma|gastroenterit/.test(bundle)) {
      return ['Mukozalarda kuruluk', 'Gözyaşı ve idrar çıkışında azalma', 'Taşikardi veya kapiller dolum uzaması', 'Sıvı kaybının derecesini gösteren vital bulgular'];
    }
    if (/wheezing|bronsiolit|oksuruk|solunum/.test(bundle)) {
      return ['Ekspiratuvar wheezing', 'Subkostal çekilme veya takipne', 'Beslenmede azalma', 'Hipoksemi varlığının değerlendirilmesi'];
    }
    if (/nobet|febril/.test(bundle)) {
      return ['Ateşle eş zamanlı kısa süreli nöbet', 'Fokal nörolojik bulgu olmaması', 'Postiktal dönemin kısa olması', 'Ense sertliği veya bilinç bozukluğu yokluğu'];
    }
  }

  const extracted = filterQualityItems([
    ...(Array.isArray(question.evidenceChain) ? question.evidenceChain : []),
    ...(Array.isArray(question.diagnosis?.answerFeedback?.evidenceChain) ? question.diagnosis.answerFeedback.evidenceChain : []),
    ...(Array.isArray(question.exam) ? question.exam : []),
    ...(Array.isArray(question.findings?.exam) ? question.findings.exam : []),
  ], 4);
  if (extracted.length >= 3) return extracted.slice(0, 4);

  const stemItems = splitClinicalFragments(question.stem || question.patientIntro?.historySummary || '');
  const mixed = filterQualityItems([...stemItems, ...extracted], 4);
  if (mixed.length >= 3) return mixed;

  if (/farmakoloji|ilac|toksin|antidot/.test(bundle)) return ['Maruziyet zamanı ve doz ilişkisi', 'Toksidromla uyumlu vital veya muayene bulgusu', 'Antidot gerektiren klinik belirti', 'Benzer toksisitelerin ayrımı'];
  if (/mikrobiyoloji|seroloji|kultur|viral|bakteri|direnc|temas/.test(bundle)) return ['Örnek türü ve temas öyküsü', 'Seroloji veya kültür paterninin yönü', 'Bağışıklık durumuyla uyumlu etken olasılığı', 'Tedavi veya izolasyon kararını etkileyen bulgu'];
  if (/fizyoloji|baroreseptor|sempatik|vagal|ventilasyon|perfuzyon/.test(bundle)) return ['Başlangıç değişkeninin yönü', 'Kompansatuvar yanıtın beklenen sonucu', 'Karşıt fizyolojik yanıtların elenmesi', 'Mekanizmayı destekleyen objektif bulgu'];
  return ['Başvuru yakınmasının ani veya ilerleyici seyri', 'Muayene bulgusunun tanısal yön göstermesi', 'Objektif tetkik sonucunun tabloyla uyumu', 'Alternatif seçenekleri dışlayan temel ipucu'];
}

function splitClinicalFragments(text = '') {
  return String(text || '')
    .split(/[.;]\s+|\s+-\s+|;|\|/)
    .map(cleanSentence)
    .filter((fragment) => fragment.length >= 12 && fragment.length <= 140 && !hasForbiddenPhrase(fragment))
    .slice(0, 5);
}

function safeDemographic(question = {}) {
  const raw = String(question.demographics || question.patientIntro?.profile || '').trim();
  if (isPediatrics(question)) {
    const bundle = textBundle(question);
    if (/hie|hipoksik|iskemik|asfiksi|eritema toksikum|yenidogan|sarilik|bilirubin|emme/.test(bundle)) {
      return /eritema toksikum|papulopustuler/.test(bundle) ? '3 günlük yenidoğan' : '10 günlük yenidoğan';
    }
    if (/bruton|pyojenik|b hucre|immunglobulin|otitis|sinuzit/.test(bundle)) return '8 aylık erkek bebek';
    if (/wheezing|bronsiolit/.test(bundle)) return '8 aylık erkek bebek';
    if (/kawasaki|koroner|konjonktivit|mukozal|dudak/.test(bundle)) return '4 yaş kız çocuk';
    if (/emme\s+azalması/i.test([question.stem, question.chiefComplaint, question.patientIntro?.presentation].join(' ')) && !/yenidoğan|bebek|aylık/i.test(raw)) {
      return '3 aylık kız bebek';
    }
    if (/\b([2-9][0-9])\s*yaş\b|erişkin|yaşlı|postmenopozal/i.test(raw) || !/yenidoğan|bebek|çocuk|adölesan|ergen|yaş/i.test(raw)) {
      return '7 yaş erkek çocuk';
    }
  }
  if (isObgyn(question) && /erkek|prostat|testis/i.test(raw)) return '28 yaş kadın';
  return raw || (isPediatrics(question) ? '7 yaş erkek çocuk' : isObgyn(question) ? '28 yaş kadın' : 'Erişkin hasta');
}

function normalizePediatricPresentation(question = {}) {
  const profile = safeDemographic(question);
  const bundle = textBundle(question);
  let presentation = String(question.chiefComplaint || question.patientIntro?.presentation || question.title || '').trim();
  if (!isPediatrics(question)) {
    return presentation || question.title || 'Klinik başvuru';
  }
  if (/hie|hipoksik|iskemik|asfiksi|ensefalopati/.test(bundle)) return 'Doğum sonrası solunum depresyonu ve letarji';
  if (/bruton|pyojenik|b hucre|immunglobulin|otitis|sinuzit/.test(bundle)) return 'Tekrarlayan solunum yolu enfeksiyonları';
  if (/eritema toksikum|papulopustuler|eozinofilli/.test(bundle)) return 'Yenidoğanda döküntü';
  if (/kawasaki|koroner|konjonktivit|mukozal|dudak/.test(bundle)) return 'Beş gündür süren ateş ve döküntü';
  if (/yenidogan|sarilik|bilirubin|emme/.test(bundle)) return 'Sarılık ve emme azalması';
  if (/dehidratasyon|ishal|kusma|gastroenterit/.test(bundle)) return 'Kusma ve dehidratasyon';
  if (/wheezing|hışıltılı|bronsiolit|oksuruk|solunum/.test(bundle)) return 'Hışıltılı solunum ve öksürük';
  if (/nobet|febril/.test(bundle)) return 'Ateşle ilişkili nöbet';
  if (/emme\s+azalması/i.test(presentation) && !/yenidoğan|bebek|aylık/i.test(profile)) {
    presentation = presentation.replace(/\s*ve\s*emme\s+azalması/giu, '').replace(/emme\s+azalması/giu, 'halsizlik').trim() || 'Ateş ve halsizlik';
  }
  return presentation || question.title || 'Klinik başvuru';
}


function normalizeSettingForQuestion(question = {}) {
  const raw = cleanSentence(question.setting || '');
  const bundle = textBundle(question);
  if (isPediatrics(question)) {
    if (/yenidogan|hie|hipoksik|iskemik|asfiksi|eritema toksikum|sarilik|bilirubin/.test(bundle)) return 'Yenidoğan servisinde değerlendirilir';
    if (/wheezing|bronsiolit|dehidratasyon|nobet|kawasaki|ates/.test(bundle)) return 'çocuk acile getirilir';
    return 'pediatri polikliniğine başvurur';
  }
  if (isObgyn(question)) return /acil|kanama|ağrı|agri/.test(bundle) ? 'kadın doğum aciline başvurur' : 'kadın doğum polikliniğine başvurur';
  if (isBasicScience(question)) return 'temel bilim bağlamında değerlendirilir';
  if (/acil/i.test(raw)) return 'acil servise başvurur';
  if (/poliklinik/i.test(raw)) return `${raw.toLocaleLowerCase('tr')}ne başvurur`.replace('polikliniğiline', 'polikliniğine');
  return raw ? `${raw.toLocaleLowerCase('tr')}de değerlendirilir` : 'klinik değerlendirmeye alınır';
}

function buildNaturalHistorySummary(question = {}) {
  const profile = safeDemographic(question);
  const presentation = normalizePediatricPresentation(question);
  const setting = String(question.setting || '').trim();
  const clues = deriveBranchSpecificClues(question).slice(0, 2);
  const intro = isBasicScience(question)
    ? `${profile}, ${presentation.toLocaleLowerCase('tr')} bağlamında değerlendirilir.`
    : `${profile}, ${presentation.toLocaleLowerCase('tr')} nedeniyle ${setting || 'başvurur'}.`;
  const clueText = clues.length ? ` ${clues.map((clue) => repairAIGeneratedText(clue, { fallback: '' })).filter(Boolean).join('. ')}` : '';
  return cleanSentence(`${intro}${clueText}`)
    .replace(/\bbaşvurur\./u, 'başvurur.')
    .replace(/\s+/g, ' ')
    .trim();
}

function isMeaningfulInvestigation(investigation = {}) {
  const label = cleanSentence(investigation.label || investigation.name || '');
  const type = String(investigation.type || '').toLocaleLowerCase('tr');
  const summary = cleanSentence(investigation.summary || investigation.result || '');
  const findings = Array.isArray(investigation.findings) ? investigation.findings.map(cleanSentence).filter(Boolean) : [];
  const rows = Array.isArray(investigation.rows) ? investigation.rows : [];
  const bundle = [label, type, summary, ...findings, ...rows.flat().map(String)].join(' ');
  if (!bundle.trim()) return false;
  if (isPlaceholderInvestigationText(summary) && !rows.length && !findings.length) return false;
  if (/objektif karar verisi|mekanizma ipucu/i.test(label) && !rows.length && findings.length < 2) return false;
  if (/laboratuvar|lab/i.test(label + ' ' + type) && !rows.length && !/\d|pozitif|negatif|saptandı|saptanmadı|üreme|referans|mm|mg|ng|u\/l|µ|%/iu.test(bundle)) return false;
  if (hasForbiddenPhrase(bundle) || hasRepeatedShortPhrase(bundle)) return false;
  return true;
}

function normalizeInvestigationQuality(investigation = {}, index = 0) {
  const label = cleanSentence(investigation.label || investigation.name || `Hedefli tetkik ${index + 1}`);
  const rawSummary = cleanSentence(investigation.summary || investigation.result || '');
  const rawFindings = filterQualityItems(investigation.findings || investigation.rows || [], 4);
  const base = {
    ...investigation,
    label,
    summary: rawSummary && !isPlaceholderInvestigationText(rawSummary) && !hasForbiddenPhrase(rawSummary) ? rawSummary : (rawFindings[0] || ''),
    findings: rawFindings,
    interpretation: cleanSentence(investigation.interpretation || ''),
  };
  if (!base.interpretation || isPlaceholderInvestigationText(base.interpretation) || hasForbiddenPhrase(base.interpretation)) delete base.interpretation;
  const normalized = normalizeInvestigationLabResults(base);
  return isMeaningfulInvestigation(normalized) ? normalized : null;
}

function repairFeedbackText(text = '', question = {}) {
  const correct = getQuestionCorrectText(question);
  const clues = deriveBranchSpecificClues(question).slice(0, 2);
  const cleaned = repairEditorialFeedbackText(cleanSentence(text), { correct, clue: clues[0] });
  if (cleaned && cleaned.length >= 40 && !hasForbiddenPhrase(cleaned) && !detectBrokenSentence(cleaned) && !detectTemplateLikeFeedback(cleaned)) return cleaned;
  if (correct) {
    return cleanSentence(`${correct} en uygun yanıttır; çünkü ${clues.join(' ve ') || 'verilen somut klinik bulgular'} bu seçeneği diğer olasılıklardan ayırır.`);
  }
  return 'Somut klinik bulgular ve objektif veriler birlikte değerlendirildiğinde en uygun seçenek belirlenir.';
}

function describeOptionPurpose(optionText = '') {
  const option = normalizeForIncludes(optionText);
  if (/salbutamol|bronkodilator|bronko/.test(option)) return 'Bronkodilatörler bronkospazmı azaltmada destek sağlayabilir.';
  if (/antihistamin|h1|h2/.test(option)) return 'Antihistaminikler ürtiker ve kaşıntı gibi deri bulgularını azaltabilir.';
  if (/kortikosteroid|steroid|metilpred|predniz/.test(option)) return 'Kortikosteroidlerin etkisi geç başlar ve akut şok tablosunu hemen düzeltmez.';
  if (/sivi|kristaloid|ringer|serum|resusitasyon/.test(option)) return 'IV kristaloid, vazodilatasyon ve kapiller kaçak nedeniyle gelişen şokta gerekli destek basamağıdır.';
  if (/adrenalin|epinefrin/.test(option)) return 'Adrenalin bronkospazm, vazodilatasyon ve dolaşım çöküşünü hedefleyen hayat kurtarıcı ilaçtır.';
  if (/oksijen|hava yolu|entubasyon/.test(option)) return 'Oksijen ve hava yolu güvenliği hipoksemi riski olan hastada temel destek basamağıdır.';
  if (/gozlem|bekle|izlem/.test(option)) return 'Sadece gözlem, hızla kötüleşebilecek acil tabloda tedaviyi geciktirir.';
  return `${optionText} ilişkili bir alternatif gibi görünse de verilen olguda hedeflenen karar düzeyi için öncelikli yanıt değildir.`;
}

function isPerioperativeAnaphylaxis(question = {}) {
  const bundle = normalizeForIncludes(visibleQualityTexts(question).join(' | '));
  return /anafil|hipersensitiv|urtiker|bronkospazm|hisiltili/.test(bundle)
    && /ameliyathane|anestezi|induksiyon|perioperatif|cerrahi|monitorize/.test(bundle)
    && /hipotansiyon|sok|70\/40|dusuk spo/.test(bundle);
}

function isGeneralAnaphylaxis(question = {}) {
  const bundle = normalizeForIncludes(visibleQualityTexts(question).join(' | '));
  return /anafil|hipersensitiv/.test(bundle) || (/urtiker/.test(bundle) && /bronkospazm|hisiltili|hipotansiyon/.test(bundle));
}

function buildContextualWrongFeedback(optionText = '', question = {}) {
  const correct = getQuestionCorrectText(question);
  const purpose = describeOptionPurpose(optionText);
  const option = normalizeForIncludes(optionText);
  if (isPerioperativeAnaphylaxis(question)) {
    if (/adrenalin|epinefrin/.test(option) && /im|intramuskuler|intramüsküler|kas ici/.test(option)) {
      return 'IM adrenalin genel anafilaksi bilgisinde hayat kurtarıcıdır. Ancak monitörize ameliyathane hastasında ciddi hipotansiyon ve bronkospazm varsa tetikleyiciyi durdurma, yüzde 100 oksijen, hızlı IV sıvı ve hemodinamik ciddiyete göre adrenalin uygulaması birlikte planlanır.';
    }
    return `${purpose} Ancak perioperatif ağır anafilakside tek başına yeterli değildir; tetikleyici ajanı durdurma, yüzde 100 oksijen, hızlı IV sıvı ve adrenalin eş zamanlı düşünülmelidir.`;
  }
  if (isGeneralAnaphylaxis(question)) {
    return `${purpose} Ancak anafilakside hava yolu, bronkospazm veya hipotansiyon varsa destek tedavileri adrenalin temelli acil yaklaşımın yerine geçmez.`;
  }
  const clues = deriveBranchSpecificClues(question).slice(0, 2).join(' ve ') || 'olgudaki somut bulgular';
  const correctTarget = correct ? `ölçülen karar hedefi ${correct} seçeneğine yönelir` : 'ölçülen karar hedefi bu seçeneğe yönelmez';
  return `${purpose} Bu olguda ${clues} dikkate alındığında ${correctTarget}; bu seçenek aynı hedefi doğrudan karşılamadığı için tek en iyi yanıt olmaz.`;
}

function repairWrongFeedback(text = '', optionText = '', question = {}) {
  const cleaned = cleanSentence(text);
  if (cleaned && cleaned.length >= 45 && !hasForbiddenPhrase(cleaned) && !detectTemplateLikeFeedback(cleaned) && !detectBrokenSentence(cleaned)) return cleaned;
  return cleanSentence(buildContextualWrongFeedback(optionText, question));
}

function repairDifferentialComparison(comparison = {}, question = {}) {
  const repaired = {};
  Object.entries(comparison || {}).forEach(([optionText, value]) => {
    const explanation = repairWrongFeedback(value?.explanation || '', optionText, question);
    const points = filterQualityItems(value?.comparisonPoints || [], 3);
    repaired[optionText] = {
      explanation,
      comparisonPoints: points.length ? points : [
        describeOptionPurpose(optionText),
        repairWrongFeedback('', optionText, question),
      ].map(cleanSentence).filter(Boolean).slice(0, 2),
    };
  });
  return repaired;
}

function repairContextSensitiveEmergencyQuestion(question = {}) {
  if (!isPerioperativeAnaphylaxis(question)) return question;
  const correctManagement = 'Tetikleyici ajanı durdurmak, yüzde 100 oksijen vermek, hızlı IV sıvı başlamak ve hemodinamik ciddiyete göre adrenalin uygulamak';
  const options = [
    { id: 'A', text: correctManagement },
    { id: 'B', text: 'Yalnızca IV antihistaminik verip yanıtı beklemek' },
    { id: 'C', text: 'Yalnızca inhaler bronkodilatör uygulamak' },
    { id: 'D', text: 'Kortikosteroid verip cerrahiye devam etmek' },
    { id: 'E', text: 'Sadece hızlı IV kristaloid vererek adrenalin ve hava yolu desteğini ertelemek' },
  ];
  const repaired = {
    ...question,
    title: 'Anestezi indüksiyonu sonrası ani hipotansiyon',
    relatedBranch: question.relatedBranch || 'Anesteziyoloji ve Reanimasyon',
    branchName: question.branchName || 'Anesteziyoloji ve Reanimasyon',
    difficulty: question.difficulty || 'Zor',
    learningTarget: 'Perioperatif anafilakside ilk acil yönetim yaklaşımını ayırt etmek',
    clinicalFocus: 'Perioperatif anafilakside bağlam duyarlı acil yönetim',
    demographics: question.demographics && !hasForbiddenPhrase(question.demographics) ? question.demographics : '45 yaş erkek',
    setting: 'Ameliyathane',
    chiefComplaint: 'Ani hipotansiyon ve bronkospazm',
    stem: '45 yaşındaki erkek hastada genel anestezi indüksiyonundan kısa süre sonra ani hipotansiyon, bronkospazm ve oksijen satürasyonunda düşme gelişir. Eş zamanlı yaygın ürtiker fark edilir.',
    exam: [
      'Yaygın ürtiker izlenir.',
      'Oskültasyonda belirgin hışıltılı solunum ve bronkospazm bulguları vardır.',
    ],
    vitals: { TA: '70/40 mmHg', Nabız: '126/dk', Solunum: '28/dk', Ateş: '36,8 °C', 'SpO₂': '%88' },
    question: 'Genel anestezi altında gelişen ağır anafilaksi şüphesinde en uygun ilk yönetim yaklaşımı hangisidir?',
    questionType: 'treatment',
    options,
    correctAnswer: 'A',
    explanation: 'Anestezi indüksiyonundan kısa süre sonra gelişen hipotansiyon, bronkospazm, düşük SpO₂ ve ürtiker perioperatif anafilaksiyi düşündürür. Bu tabloda yalnızca bronkodilatör veya antihistaminik vermek yetersizdir; hava yolu, oksijen, dolaşım desteği ve adrenalin gecikmeden planlanmalıdır.',
    evidenceChain: [
      'Zamanlama: Bulgular anestezi indüksiyonundan kısa süre sonra başlar.',
      'Hemodinamik bulgu: 70/40 mmHg kan basıncı ciddi sistemik reaksiyonu gösterir.',
      'Solunum bulgusu: Bronkospazm ve düşük SpO₂ hava yolu etkilenimini destekler.',
      'Deri bulgusu: Yaygın ürtiker mast hücre aracılı reaksiyon lehinedir.',
    ],
    examPearls: [
      'Anafilakside deri bulguları olmasa bile hipotansiyon ve bronkospazm varsa tedavi geciktirilmez. Adrenalin hayat kurtarıcıdır; antihistaminik, bronkodilatör ve steroidler destek tedavisidir.',
    ],
    wrongOptionFeedback: {},
    investigations: [],
    history: [],
  };
  repaired.patientIntro = {
    profile: `${repaired.demographics} · Ameliyathane`,
    presentation: 'Ani hipotansiyon ve bronkospazm',
    riskContext: [
      'Anestezi indüksiyonu sonrası erken dönem',
      'Nöromüsküler bloker, antibiyotik veya lateks maruziyeti olasılığı',
      'Bilinen alerji öyküsünün olmaması anafilaksiyi dışlamaz',
    ],
    distinctiveClues: [
      'Ani hipotansiyon',
      'Bronkospazm ve düşük SpO₂',
      'Yaygın ürtiker',
      'Anestezi indüksiyonundan kısa süre sonra başlaması',
    ],
    historySummary: repaired.stem,
  };
  repaired.history = [repaired.stem];
  repaired.findings = {
    history: [repaired.stem],
    exam: repaired.exam,
    vitals: repaired.vitals,
    investigations: [],
  };
  options.forEach((option) => {
    if (option.id !== 'A') repaired.wrongOptionFeedback[option.id] = repairWrongFeedback('', option.text, repaired);
  });
  repaired.diagnosis = {
    ...(repaired.diagnosis || {}),
    correct: correctManagement,
    options: options.map((option) => option.text),
    explanation: repaired.explanation,
    nextStep: 'Tetikleyiciyi durdur, oksijen ve dolaşım desteğini başlat, adrenalin uygulamasını hemodinamik ciddiyete göre planla.',
    pearls: repaired.examPearls,
    answerFeedback: {
      ...(repaired.diagnosis?.answerFeedback || {}),
      whyCorrect: repaired.explanation,
      evidenceChain: repaired.evidenceChain,
      pearls: repaired.examPearls,
      clinicalPearls: repaired.examPearls,
      differentialComparison: repairDifferentialComparison(Object.fromEntries(options.filter((option) => option.id !== 'A').map((option) => [option.text, { explanation: repaired.wrongOptionFeedback[option.id] }])) || {}, repaired),
      whyWrong: Object.fromEntries(options.filter((option) => option.id !== 'A').map((option) => [option.text, repaired.wrongOptionFeedback[option.id]])),
      managementSteps: [
        'Tetikleyici olabilecek ajanı durdur ve yardım çağır.',
        'Yüzde 100 oksijen vererek hava yolunu güvenceye al.',
        'Hızlı IV kristaloid resüsitasyonu başlat.',
        'Hemodinamik ciddiyete göre adrenalin uygula; ameliyathane koşullarında IV titrasyon gerekebilir.',
      ],
      learningOutcome: repaired.learningTarget,
    },
  };
  return repaired;
}

export function repairAIQuestionQuality(question = {}) {
  const repaired = applyTusLanguageStandardToQuestion({ ...question });
  repaired.demographics = safeDemographic(repaired);
  repaired.learningTarget = cleanSentence(repaired.learningTarget || repaired.clinicalFocus || 'Karar verdirici klinik bilginin yorumlanması');
  if (hasForbiddenPhrase(repaired.learningTarget)) repaired.learningTarget = 'Karar verdirici klinik bulgunun doğru yorumlanması';
  repaired.clinicalFocus = cleanSentence(repaired.clinicalFocus || repaired.learningTarget);
  repaired.setting = cleanSentence(repaired.setting || (isBasicScience(repaired) ? 'Temel bilim bağlamı' : 'Klinik değerlendirme'));
  if (hasForbiddenPhrase(repaired.setting)) repaired.setting = isBasicScience(repaired) ? 'Temel bilim bağlamı' : 'Klinik değerlendirme';
  repaired.chiefComplaint = normalizePediatricPresentation(repaired);
  repaired.title = cleanSentence(repaired.title || repaired.chiefComplaint || 'Kısa klinik olgu');
  if (!repaired.title || hasForbiddenPhrase(repaired.title)) repaired.title = repaired.chiefComplaint || 'Kısa klinik olgu';
  repaired.stem = hasForbiddenPhrase(repaired.stem || '') || String(repaired.stem || '').length < 45
    ? buildNaturalHistorySummary(repaired)
    : cleanSentence(repaired.stem);
  repaired.narrativeStem = repaired.stem;

  const risks = filterQualityItems(repaired.patientIntro?.riskContext || [], 3);
  const clues = filterQualityItems(repaired.patientIntro?.distinctiveClues || repaired.evidenceChain || [], 4);
  repaired.patientIntro = {
    ...(repaired.patientIntro || {}),
    profile: [repaired.demographics, repaired.setting].filter(Boolean).join(' · '),
    presentation: repaired.chiefComplaint || repaired.title,
    riskContext: risks.length >= 2 ? risks : deriveBranchSpecificRisk(repaired).slice(0, 3),
    distinctiveClues: clues.length >= 3 ? clues : deriveBranchSpecificClues(repaired).slice(0, 4),
    historySummary: buildNaturalHistorySummary(repaired),
  };

  repaired.evidenceChain = filterQualityItems(repaired.evidenceChain || repaired.patientIntro.distinctiveClues, 4);
  if (repaired.evidenceChain.length < 3) repaired.evidenceChain = deriveBranchSpecificClues(repaired).slice(0, 4);
  repaired.examPearls = filterQualityItems(repaired.examPearls || repaired.diagnosis?.pearls || [], 3);
  if (!repaired.examPearls.length) {
    repaired.examPearls = [deriveBranchSpecificClues(repaired)[0] || 'Somut klinik bulgu tanısal kararı yönlendirir.'];
  }

  repaired.investigations = (Array.isArray(repaired.investigations) ? repaired.investigations : [])
    .map(normalizeInvestigationQuality)
    .filter(Boolean);
  if (isBasicScience(repaired)) {
    repaired.investigations = repaired.investigations.filter((item) => {
      const label = `${item.label || ''} ${item.type || ''}`;
      const bundle = `${label} ${item.summary || ''} ${(item.findings || []).join(' ')} ${(item.rows || []).flat().join(' ')}`;
      if (/laboratuvar|lab/i.test(label) && !/\d|pozitif|negatif|saptandı|üreme|histopatoloji|biyopsi|nekroz|inflamasyon/i.test(bundle)) return false;
      return !isPlaceholderInvestigationText(bundle);
    });
  }
  repaired.vitals = sanitizeVitalsObject(repaired.vitals || repaired.findings?.vitals || {});
  repaired.findings = {
    ...(repaired.findings || {}),
    history: [repaired.patientIntro.historySummary],
    exam: Array.isArray(repaired.exam) ? repaired.exam.map(cleanSentence).filter(Boolean) : repaired.findings?.exam || [],
    vitals: repaired.vitals,
    investigations: repaired.investigations,
  };

  repaired.explanation = repairFeedbackText(repaired.explanation || repaired.diagnosis?.explanation || repaired.diagnosis?.answerFeedback?.whyCorrect, repaired);
  repaired.wrongOptionFeedback = { ...(repaired.wrongOptionFeedback || {}) };
  (Array.isArray(repaired.options) ? repaired.options : []).forEach((option) => {
    if (String(option?.id || '').toUpperCase() === String(repaired.correctAnswer || '').toUpperCase()) return;
    repaired.wrongOptionFeedback[option.id] = repairWrongFeedback(repaired.wrongOptionFeedback[option.id], option.text, repaired);
  });

  const answerFeedback = repaired.diagnosis?.answerFeedback || {};
  repaired.diagnosis = {
    ...(repaired.diagnosis || {}),
    explanation: repairFeedbackText(repaired.diagnosis?.explanation || repaired.explanation, repaired),
    nextStep: cleanSentence(repaired.diagnosis?.nextStep || 'Olgudaki somut ipuçlarını aynı kategorideki seçeneklerle karşılaştır.'),
    pearls: filterQualityItems(repaired.diagnosis?.pearls || repaired.examPearls || [], 3),
    answerFeedback: {
      ...answerFeedback,
      whyCorrect: repairFeedbackText(answerFeedback.whyCorrect || repaired.explanation, repaired),
      evidenceChain: repaired.evidenceChain,
      pearls: filterQualityItems(answerFeedback.pearls || repaired.examPearls || repaired.diagnosis?.pearls || [], 3),
      clinicalPearls: filterQualityItems(answerFeedback.clinicalPearls || repaired.examPearls || repaired.diagnosis?.pearls || [], 3),
      differentialComparison: repairDifferentialComparison(answerFeedback.differentialComparison, repaired),
      whyWrong: Object.fromEntries((Array.isArray(repaired.options) ? repaired.options : [])
        .filter((option) => normalizeQuestionText(option.text) !== normalizeQuestionText(getQuestionCorrectText(repaired)))
        .map((option) => [option.text, repaired.wrongOptionFeedback[option.id] || repairWrongFeedback('', option.text, repaired)])),
      managementSteps: filterQualityItems(answerFeedback.managementSteps || [], 4),
      learningOutcome: cleanSentence(answerFeedback.learningOutcome || repaired.learningTarget || repaired.clinicalFocus || ''),
    },
  };
  if (!repaired.diagnosis.answerFeedback.managementSteps.length) {
    repaired.diagnosis.answerFeedback.managementSteps = [
      'Önce hastanın yaşına ve başvuru yakınmasına göre acil bulguları değerlendir.',
      'Muayene ve objektif tetkik verilerini aynı klinik olasılık içinde birleştir.',
      'Uygun yaklaşımı geciktirecek alternatifleri somut bulgularla ele.',
    ];
  }

  const scientificRepaired = repairScientificAccuracy(repaired);
  const contextRepaired = repairContextSensitiveEmergencyQuestion(scientificRepaired);
  const leakageRepaired = applyTusLanguageStandardToQuestion(repairAnswerLeakage(contextRepaired));
  const feedbackRepaired = applyFeedbackQualityStandardToQuestion(leakageRepaired);
  const singleBestRepaired = applySingleBestAnswerStandard(feedbackRepaired);
  const finalSafetyRepaired = applyFinalAIQuestionSafetyStandard(singleBestRepaired);
  attachQuestionDedupeFields(finalSafetyRepaired);
  return finalSafetyRepaired;
}

function visibleQualityTexts(question = {}) {
  const texts = [];
  const push = (value) => {
    if (Array.isArray(value)) {
      value.forEach(push);
      return;
    }
    const text = toPlainText(value);
    if (text) texts.push(text);
  };
  [
    question.title,
    question.stem,
    question.question,
    question.chiefComplaint,
    question.learningTarget,
    question.clinicalFocus,
    Object.values(question.wrongOptionFeedback || {}),
    question.patientIntro?.profile,
    question.patientIntro?.presentation,
    question.patientIntro?.riskContext,
    question.patientIntro?.distinctiveClues,
    question.patientIntro?.historySummary,
    question.evidenceChain,
    question.explanation,
    question.examPearls,
    question.investigations,
    question.diagnosis?.explanation,
    question.diagnosis?.nextStep,
    question.diagnosis?.pearls,
    question.diagnosis?.answerFeedback?.whyCorrect,
    question.diagnosis?.answerFeedback?.evidenceChain,
    question.diagnosis?.answerFeedback?.pearls,
    question.diagnosis?.answerFeedback?.clinicalPearls,
    question.diagnosis?.answerFeedback?.managementSteps,
    // Differential comparison reuses wrong-option feedback by design; validate it through whyWrong/feedback maps to avoid false duplicate flags.
  ].forEach(push);
  return texts;
}

function validateContextSensitiveClinicalCoherence(question = {}) {
  const errors = [];
  const bundle = normalizeForIncludes(visibleQualityTexts(question).join(' | '));
  const correct = normalizeForIncludes(getQuestionCorrectText(question) || '');
  const questionText = normalizeForIncludes(question.question || question.diagnosis?.nextStep || '');
  if (isPerioperativeAnaphylaxis(question) && /ilk|yonetim|tedavi|yaklasim|acil/.test(questionText)) {
    const hasTriggerStop = /tetikleyici|ajan.*durdur|maruziyet.*kes/.test(correct);
    const hasOxygen = /oksijen|hava yolu/.test(correct);
    const hasFluid = /sivi|kristaloid|resusitasyon|iv/.test(correct);
    const hasAdrenaline = /adrenalin|epinefrin/.test(correct);
    if (!(hasTriggerStop && hasOxygen && hasFluid && hasAdrenaline)) {
      errors.push('perioperatif anafilaksi yönetimi tetikleyiciyi durdurma, oksijen/hava yolu, IV sıvı ve adrenalin bileşenlerini birlikte içermeli');
    }
    if (/\bim\b|intramuskuler|intramüsküler|kas ici/.test(correct) && !/iv|monitorize|hemodinamik/.test(correct)) {
      errors.push('ameliyathane/perioperatif ağır anafilaksi tek başına IM adrenalin kalıbına indirgenmiş');
    }
  }
  if (!isPerioperativeAnaphylaxis(question) && isGeneralAnaphylaxis(question) && /ilk|tedavi|ilac|yaklasim|acil/.test(questionText)) {
    if (!/adrenalin|epinefrin/.test(correct)) errors.push('anafilaksi tedavi sorusunda hayat kurtarıcı adrenalin vurgusu yok');
  }
  if (/wheezing\b/i.test(visibleQualityTexts(question).join(' | '))) errors.push('gereksiz İngilizce terim: wheezing');
  if (/Nedeniyle Ameliyathane/i.test(visibleQualityTexts(question).join(' | '))) errors.push('bozuk öykü parçası: Nedeniyle Ameliyathane');
  return errors;
}

function validateFeedbackSpecificity(question = {}) {
  const errors = [];
  const correctId = String(question.correctAnswer || '').toUpperCase();
  const feedback = question.wrongOptionFeedback || {};
  (Array.isArray(question.options) ? question.options : []).forEach((option) => {
    const id = String(option?.id || '').toUpperCase();
    if (!id || id === correctId) return;
    const text = cleanSentence(feedback[option.id] || feedback[id] || question.diagnosis?.answerFeedback?.whyWrong?.[option.text] || '');
    if (!text || text.length < 55) errors.push(`${id} yanlış seçenek feedbacki seçenek özelinde ve öğretici değil`);
    if (hasForbiddenPhrase(text) || detectTemplateLikeFeedback(text)) errors.push(`${id} yanlış seçenek feedbacki şablon ifade içeriyor`);
  });
  const evidence = question.diagnosis?.answerFeedback?.evidenceChain || question.evidenceChain || [];
  evidence.forEach((item, index) => {
    const text = cleanSentence(item);
    if (/^kanıt\s*\d*$/iu.test(text) || /laboratuvar paterni/i.test(text)) errors.push(`kanıt zinciri mekanik başlık içeriyor: ${index + 1}`);
    if (text.length < 18) errors.push(`kanıt zinciri çok kısa: ${index + 1}`);
  });
  return errors;
}

function validateAgeSymptomCoherence(question = {}) {
  const errors = [];
  const profile = safeDemographic(question);
  const allText = [question.stem, question.chiefComplaint, question.patientIntro?.historySummary, question.patientIntro?.presentation].join(' ');
  if (isPediatrics(question)) {
    if (/\b([2-9][0-9])\s*yaş\b|erişkin|yaşlı|postmenopozal/i.test(profile)) errors.push('pediatri erişkin/geriatrik profil içeriyor');
    if (/emme\s+azalması/i.test(allText) && !/yenidoğan|bebek|aylık/i.test(profile)) errors.push('emme azalması yaş bağlamıyla uyumsuz');
  }
  if (isObgyn(question) && /erkek|prostat|testis/i.test(profile + ' ' + allText)) errors.push('kadın doğum bağlamında erkek/uygunsuz profil');
  return errors;
}

export function validateAIQuestionQuality(question = {}, { requestedBranch = null } = {}) {
  const errors = [];
  const warnings = [];
  const texts = visibleQualityTexts(question);
  texts.forEach((text) => {
    if (hasForbiddenPhrase(text)) {
      const preview = String(text).slice(0, 120);
      errors.push(`yasaklı/meta ifade: ${preview}`);
    }
  });
  errors.push(...validateAgeSymptomCoherence(question));
  errors.push(...validateContextSensitiveClinicalCoherence(question));
  const scientificGate = scientificAccuracyGate(question);
  if (!scientificGate.ok) errors.push(...scientificGate.errors.map((error) => `scientific-accuracy:${error}`));
  warnings.push(...(scientificGate.warnings || []).map((warning) => `scientific-accuracy:${warning}`));
  errors.push(...validateFeedbackSpecificity(question));
  const feedbackQuality = validateFeedbackQualityStandard(question);
  if (!feedbackQuality.ok) errors.push(...feedbackQuality.errors.map((error) => `feedback-quality:${error}`));
  const singleBest = validateSingleBestAnswerGate(question);
  if (!singleBest.ok) errors.push(...singleBest.errors.map((error) => `single-best-answer:${error}`));
  const finalSafety = validateFinalAIQuestionSafetyGate(question);
  if (!finalSafety.ok) errors.push(...finalSafety.errors.map((error) => `final-safety:${error}`));
  const hardCoherence = validateClinicalCoherenceHardGate(question);
  if (!hardCoherence.ok) errors.push(...hardCoherence.errors.map((error) => `hard-coherence:${error}`));
  warnings.push(...(finalSafety.warnings || []).map((warning) => `final-safety:${warning}`));

  const leakageGate = runAnswerLeakageGate(question, { ignorePostAnswerTeachingFields: true });
  if (!leakageGate.ok) errors.push(...leakageGate.errors.map((error) => `answer-leakage:${error}`));
  warnings.push(...leakageGate.warnings.map((warning) => `answer-leakage:${warning}`));

  const branchFit = validateBranchFit(question, requestedBranch || question.relatedBranch || question.branchName);
  if (!branchFit.ok) errors.push(...branchFit.errors.map((error) => `branch-fit:${error}`));

  const risk = question.patientIntro?.riskContext || [];
  const clues = question.patientIntro?.distinctiveClues || [];
  if (!Array.isArray(risk) || risk.length < 2) errors.push('risk bağlamı somut ve yeterli değil');
  if (!Array.isArray(clues) || clues.length < 3) errors.push('ayırt ettirici ipuçları yetersiz');
  if (filterQualityItems(risk, 5).length < Math.min(2, risk.length)) errors.push('risk bağlamı meta veya zayıf ifade içeriyor');
  if (filterQualityItems(clues, 5).length < Math.min(3, clues.length)) errors.push('ayırt ettirici ipuçları meta veya zayıf ifade içeriyor');

  const history = question.patientIntro?.historySummary || question.stem || '';
  if (String(history).length < 55) errors.push('kısa klinik öykü yetersiz');
  if (/\b([a-zçğıöşü]+)\s+\1\b/iu.test(history)) errors.push('kısa klinik öykü tekrar içeriyor');

  const options = getQuestionOptionTexts(question);
  if (options.length < 5) errors.push('5 seçenek bulunmalı');
  if (!getQuestionCorrectText(question)) errors.push('doğru cevap metni eksik');

  texts.forEach((text) => {
    if (detectInvalidClinicalMeasurementFormat(text)) errors.push(`hatalı ölçüm formatı: ${String(text).slice(0, 90)}`);
    if (detectBrokenSentence(text)) errors.push(`yarım cümle: ${String(text).slice(0, 90)}`);
    if (detectMetaLanguage(text)) errors.push(`meta/generator dili: ${String(text).slice(0, 90)}`);
    if (detectTemplateLikeFeedback(text)) errors.push(`şablon feedback: ${String(text).slice(0, 90)}`);
    if (isForbiddenEditorialText(text)) errors.push(`yasaklı editoryal ifade: ${String(text).slice(0, 90)}`);
    if (hasRepeatedShortPhrase(text)) errors.push(`tekrar eden ifade: ${String(text).slice(0, 90)}`);
    if (detectExcessivePunctuation(text)) warnings.push(`noktalama kontrolü: ${String(text).slice(0, 90)}`);
    if (hasWeakTusLanguage(text)) errors.push(`zayıf TUS dili: ${String(text).slice(0, 90)}`);
  });
  const investigations = [
    ...(Array.isArray(question.investigations) ? question.investigations : []),
    ...(Array.isArray(question.findings?.investigations) ? question.findings.investigations : []),
  ];
  investigations.forEach((investigation) => {
    const labValidation = validateInvestigationLabCompleteness(investigation);
    if (!labValidation.ok) errors.push(...labValidation.errors.map((error) => `lab-result:${error}`));
  });
  texts.forEach((text) => {
    if (hasIncompleteLabResultText(text)) errors.push(`eksik/birimsiz laboratuvar sonucu: ${String(text).slice(0, 90)}`);
  });

  const editorial = validateGeneratedCaseText(question);
  if (!editorial.ok) errors.push(...editorial.errors.map((error) => `editorial:${error}`));
  warnings.push(...editorial.warnings);

  return { ok: errors.length === 0, errors: Array.from(new Set(errors)), warnings: Array.from(new Set(warnings)) };
}

export function runAIQuestionQualityGate(question = {}, options = {}) {
  const repair = options.repair !== false;
  const candidate = repair ? repairAIQuestionQuality(question) : question;
  const validation = validateAIQuestionQuality(candidate, options);
  return {
    ok: validation.ok,
    question: candidate,
    errors: validation.errors,
    warnings: validation.warnings,
  };
}
