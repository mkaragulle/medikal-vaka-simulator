import { normalizeQuestionText } from './aiQuestionHistory.js';
import { attachQuestionDedupeFields, getQuestionCorrectText, getQuestionOptionTexts, toPlainText } from './questionDeduplication.js';
import { sanitizeMeasurementText, sanitizeVitalsObject } from './clinicalFormatters.js';
import { validateBranchFit } from './aiBranchRules.js';
import { removeInlineFieldLabels, repairMisplacedClinicalData, validateClinicalFieldPlacement } from './clinicalFieldPlacement.js';
import {
  detectBrokenSentence,
  detectExcessivePunctuation,
  detectMetaLanguage,
  detectTemplateLikeFeedback,
  detectInvalidClinicalMeasurementFormat,
  repairFeedbackText as repairEditorialFeedbackText,
  repairEditorialQuality,
  normalizeMedicalTurkish,
  validateClinicalMeaning,
  validateGeneratedCaseText,
} from './editorialQuality.js';

export const AI_QUALITY_FORBIDDEN_PHRASES = [
  'öğrenme hedefi',
  'çeldirici',
  'doğru seçenek',
  'yanıt ekseni',
  'bulgu ilişkisi ve mekanizma',
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
  'hedeflenen öğrenme çıktısıyla',
  'gömülü vakadaki metni tekrar etmekten',
  'direkt tanı adı arama',
  'bulgu yorumu beklenir',
  'yanıtı açık etmeden',
  'seçenekler arasında doğrudan ezber',
  'tus sorusunda doğru ayrım',
  'değerlendirmesi başvurusunda',
  'nedeniyle değerlendirilir',
  'bu olguda elenir:',
  'karar verdiren ipucu',
  'bu nedenle en iyi yanıt',
  'çeldirici',
];

const HARD_FORBIDDEN_REGEXES = [
  /\b([a-zçğıöşü]+)\s+\1\b/iu,
  /\bçocuk\s+çocuk\b/iu,
  /\b(değerlendirmesi|yorumlanması)\s+başvurusunda\b/iu,
  /\bekseninde\s+(kısa|hedef|yorumlan)/iu,
  /\b12\s*yaş[^.]{0,80}\bemme\s+azalması\b/iu,
  /\b(adölesan|ergen|çocuk)\b[^.]{0,80}\bemme\s+azalması\b/iu,
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
    || HARD_FORBIDDEN_REGEXES.some((regex) => regex.test(String(text || '')));
}

function cleanSentence(text = '') {
  let value = normalizeMedicalTurkish(removeInlineFieldLabels(String(text || '')))
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,;:!?])(?=\S)/g, '$1 ')
    .replace(/(?<!\d)\.(?=\S)/g, '. ')
    .replace(/\s*\/\s*/g, '/')
    .replace(/çeldiriciler/giu, 'yanlış seçenekler')
    .replace(/çeldiriciyi/giu, 'yanlış seçeneği')
    .replace(/çeldirici/giu, 'yanlış seçenek')
    .replace(/öğrenci/giu, 'hekim adayı')
    .replace(/yanıt ekseni/giu, 'klinik karar')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/^[,.;:!?\-\s]+|[,.;:!?\-\s]+$/g, '')
    .trim();
  value = value.replace(/([.!?])\s+([a-zçğıöşü])/gu, (_, punct, letter) => `${punct} ${letter.toLocaleUpperCase('tr')}`);
  return value;
}

function filterQualityItems(items = [], max = 4) {
  const seen = new Set();
  const output = [];
  items.map(toPlainText).map(cleanSentence).forEach((item) => {
    if (!item || item.length < 8) return;
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
    question.wrongOptionFeedback,
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
    if (/hışıltılı solunum|hisi?lti|bronsiolit|oksuruk|solunum/.test(bundle)) {
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
    return ['Temas öyküsü veya örnek türünün yorumu değiştirmesi', 'Bağışıklık durumunun etken ayrımına etkisi', 'Seroloji, kültür veya direnç sonucunun birlikte değerlendirilmesi'];
  }
  if (/fizyoloji|baroreseptor|sempatik|vagal|ventilasyon|perfuzyon/.test(bundle)) {
    return ['Temel mekanizmanın klinik bulguyla ilişkilendirilmesi', 'Kompansatuvar yanıtın yönünün ayırt edilmesi', 'Sistem yanıtının kısa süreli değişkenlerle değerlendirilmesi'];
  }
  return ['Başvuru yakınmasının tanısal önceliği belirlemesi', 'Objektif bulguların karar basamağını desteklemesi', 'Komplikasyon veya gecikmiş tedavi riskinin dikkate alınması'];
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
    if (/hışıltılı solunum|hisi?lti|bronsiolit|oksuruk|solunum/.test(bundle)) {
      return ['Ekspiratuvar hışıltılı solunum', 'Subkostal çekilme veya takipne', 'Beslenmede azalma', 'Hipoksemi varlığının değerlendirilmesi'];
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
  if (/mikrobiyoloji|seroloji|kultur|viral|bakteri|direnc|temas/.test(bundle)) return ['Örnek türü ve temas öyküsü', 'Seroloji veya kültür sonucunun yönü', 'Bağışıklık durumuyla uyumlu etken olasılığı', 'Tedavi veya izolasyon kararını etkileyen bulgu'];
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
    if (/hışıltılı solunum|hisi?lti|bronsiolit/.test(bundle)) return '8 aylık erkek bebek';
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
  if (/hışıltılı solunum|hisi?lti|bronsiolit|oksuruk|solunum/.test(bundle)) return 'Hışıltılı solunum ve öksürük';
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
    if (/hışıltılı solunum|hisi?lti|bronsiolit|dehidratasyon|nobet|kawasaki|ates/.test(bundle)) return 'çocuk acile getirilir';
    return 'pediatri polikliniğine başvurur';
  }
  if (isObgyn(question)) return /acil|kanama|ağrı|agri/.test(bundle) ? 'kadın doğum aciline başvurur' : 'kadın doğum polikliniğine başvurur';
  if (isBasicScience(question)) return 'kısa TUS pratiğinde ele alınır';
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
    ? `${profile}, ${presentation.toLocaleLowerCase('tr')} nedeniyle kısa TUS pratiğinde ele alınır.`
    : `${profile}, ${presentation.toLocaleLowerCase('tr')} nedeniyle ${setting || 'başvurur'}.`;
  const clueText = clues.length ? ` ${clues.join('; ')} dikkat çeker.` : '';
  return cleanSentence(`${intro}${clueText}`)
    .replace(/\bbaşvurur\./u, 'başvurur.')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeInvestigationQuality(investigation = {}, index = 0) {
  const label = sanitizeMeasurementText(investigation.label || investigation.name || `Hedefli tetkik ${index + 1}`);
  const rawSummary = cleanSentence(investigation.summary || investigation.result || investigation.interpretation || '');
  const rawFindings = filterQualityItems(investigation.findings || investigation.rows || [], 4);
  if (rawSummary && !hasForbiddenPhrase(rawSummary)) {
    return {
      ...investigation,
      label,
      summary: rawSummary,
      findings: rawFindings,
      interpretation: cleanSentence(investigation.interpretation || 'Objektif bulgu klinik kararı destekler.'),
    };
  }
  return {
    ...investigation,
    label,
    summary: rawFindings[0] || 'Objektif bulgu klinik kararı destekler.',
    findings: rawFindings.length ? rawFindings : ['Vital bulgular ve muayene verileriyle birlikte yorumlanır.'],
    interpretation: 'Sonuç, olgudaki ana bulgularla birlikte değerlendirilir.',
  };
}

function repairFeedbackText(text = '', question = {}) {
  const correct = getQuestionCorrectText(question);
  const clues = deriveBranchSpecificClues(question).slice(0, 2);
  const cleaned = repairEditorialFeedbackText(cleanSentence(text), { correct, clue: clues[0] });
  if (cleaned && cleaned.length >= 40 && !hasForbiddenPhrase(cleaned) && !detectBrokenSentence(cleaned) && !detectTemplateLikeFeedback(cleaned)) return cleaned;
  if (correct) {
    return cleanSentence(`${correct} en uygun yanıttır. ${clues.join(' ve ') || 'Somut klinik bulgular'} bu seçeneği diğer olasılıklardan ayırır.`);
  }
  return 'Somut klinik bulgular birlikte değerlendirildiğinde en uygun seçenek belirlenir.';
}

function repairWrongFeedback(text = '', optionText = '', question = {}) {
  const cleaned = cleanSentence(text);
  if (cleaned && cleaned.length >= 25 && !hasForbiddenPhrase(cleaned)) return cleaned;
  const correct = getQuestionCorrectText(question);
  return cleanSentence(`${optionText} uygun klinik koşullarda düşünülebilir. Bu tabloda ana bulgular ${correct || 'uygun yanıt'} lehine daha güçlüdür.`);
}

function repairDifferentialComparison(comparison = {}, question = {}) {
  const repaired = {};
  Object.entries(comparison || {}).forEach(([optionText, value]) => {
    const explanation = repairWrongFeedback(value?.explanation || '', optionText, question);
    const points = filterQualityItems(value?.comparisonPoints || [], 3);
    repaired[optionText] = {
      explanation,
      comparisonPoints: points.length ? points : [
        `${optionText} için beklenen temel bulgu bu olguda baskın değildir.`,
        'Olgudaki somut ipuçları doğru yanıta daha doğrudan yönlendirir.',
      ],
    };
  });
  return repaired;
}

export function repairAIQuestionQuality(question = {}) {
  const repaired = { ...question };
  repaired.demographics = safeDemographic(repaired);
  repaired.learningTarget = cleanSentence(repaired.learningTarget || repaired.clinicalFocus || 'Karar verdirici klinik bilginin yorumlanması');
  if (hasForbiddenPhrase(repaired.learningTarget)) repaired.learningTarget = 'Karar verdirici klinik bulgunun doğru yorumlanması';
  repaired.clinicalFocus = cleanSentence(repaired.clinicalFocus || repaired.learningTarget);
  repaired.setting = cleanSentence(repaired.setting || (isBasicScience(repaired) ? 'Kısa TUS pratiği' : 'Klinik değerlendirme'));
  if (hasForbiddenPhrase(repaired.setting)) repaired.setting = isBasicScience(repaired) ? 'Kısa TUS pratiği' : 'Klinik değerlendirme';
  repaired.chiefComplaint = normalizePediatricPresentation(repaired);
  repaired.title = cleanSentence(repaired.title || repaired.chiefComplaint || 'Kısa klinik olgu');
  if (!repaired.title || hasForbiddenPhrase(repaired.title)) repaired.title = repaired.chiefComplaint || 'Kısa klinik olgu';
  repaired.stem = hasForbiddenPhrase(repaired.stem || '') || String(repaired.stem || '').length < 45
    ? buildNaturalHistorySummary(repaired)
    : cleanSentence(repaired.stem);

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

  repaired.investigations = (Array.isArray(repaired.investigations) ? repaired.investigations : []).map(normalizeInvestigationQuality);
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
    nextStep: cleanSentence(repaired.diagnosis?.nextStep || 'Olgudaki somut ipuçlarını seçeneklerle karşılaştır.'),
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
      'Önce hastanın yaşına ve başvuru yakınmasına uygun acil bulguları değerlendir.',
      'Muayene ve tetkik verilerini aynı klinik olasılık içinde birleştir.',
      'Doğru yaklaşımı geciktirecek alternatifleri somut bulgularla ele.',
    ];
  }

  const fieldRepaired = repairMisplacedClinicalData(repaired);
  attachQuestionDedupeFields(fieldRepaired);
  return fieldRepaired;
}

function visibleQualityTexts(question = {}) {
  const texts = [];
  const push = (value) => {
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
    question.wrongOptionFeedback,
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
    Object.values(question.diagnosis?.answerFeedback?.differentialComparison || {}),
  ].forEach(push);
  return texts;
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
    if (detectExcessivePunctuation(text)) warnings.push(`noktalama kontrolü: ${String(text).slice(0, 90)}`);
  });
  const editorial = validateGeneratedCaseText(question);
  if (!editorial.ok) errors.push(...editorial.errors.map((error) => `editorial:${error}`));
  warnings.push(...editorial.warnings);

  const fieldPlacement = validateClinicalFieldPlacement(question);
  if (!fieldPlacement.ok) errors.push(...fieldPlacement.errors.map((error) => `field-placement:${error}`));
  warnings.push(...fieldPlacement.warnings.map((warning) => `field-placement:${warning}`));

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
