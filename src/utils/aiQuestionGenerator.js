import { AI_QUESTION_SEEDS } from '../data/aiQuestionSeeds.js';
import { AI_BRANCH_TEMPLATE_SEEDS } from '../data/aiBranchQuestionTemplates.js';
import { AI_SYNTHETIC_FALLBACK_SEEDS } from '../data/aiSyntheticFallbackTemplates.js';
import { cases } from '../data/cases.js';
import { branches } from '../data/branches.js';
import { shuffleArray } from './randomize.js';
import {
  buildRecentQuestionContext,
  makeSeedSignature,
  normalizeQuestionText,
  stableHash,
} from './aiQuestionHistory.js';
import { validateAIQuestionCase } from './validateAIQuestion.js';
import { repairAIQuestionQuality, runAIQuestionQualityGate } from './aiQuestionQualityGate.js';
import { attachQuestionDedupeFields, createAIQuestionId, makeOptionSetSignature, toPlainText } from './questionDeduplication.js';
import {
  branchFilterMatchesSeed,
  buildBranchAwareStem,
  buildBranchExamDefaults,
  buildBranchRiskContext,
  buildBranchVitals,
  getAIQuestionBranchOptions,
  getBranchControlledProfile,
  getBranchRuleForSeed,
  sanitizeAIQuestionTitle,
} from './aiBranchRules.js';

const AI_BRANCH_ID = 'tus-spot-olgular';
const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];
const CASE_CONCEPT_LIMIT = 220;
const MAX_PRIMARY_ATTEMPTS = 12;
const MAX_REPAIR_ATTEMPTS = 4;
const MAX_TEMPLATE_FALLBACK_ATTEMPTS = 60;
const MAX_GENERATION_ATTEMPTS = 180;
const BRANCH_NAME_BY_ID = Object.fromEntries((branches || []).map((branch) => [branch.id, branch.name || branch.shortName || branch.id]));

const FALLBACK_DISTRACTORS_BY_BRANCH = {
  'Tıbbi Mikrobiyoloji': ['Geçirilmiş enfeksiyon paterni', 'Aşı sonrası bağışıklık paterni', 'Kronik taşıyıcılık paterni', 'Reaktivasyon paterni', 'Kontaminasyon lehine sonuç'],
  'Tıbbi Farmakoloji': ['Nalokson', 'Flumazenil', 'N-asetilsistein', 'Fomepizol', 'Dantrolen', 'Metilen mavisi'],
  'Tıbbi Biyokimya': ['Fenilalanin hidroksilaz defekti', 'Ornitin transkarbamilaz defekti', 'Propionil-CoA karboksilaz defekti', 'Homogentizat oksidaz defekti', 'Pirüvat dehidrogenaz defekti'],
  'İç Hastalıkları': ['Sekonder endokrin yetmezlik', 'Akut enfeksiyöz tablo', 'Primer hiperaldosteronizm', 'Uygunsuz ADH sendromu', 'Fonksiyonel yakınma paterni'],
  'Çocuk Sağlığı ve Hastalıkları': ['Epiglotit', 'Yabancı cisim aspirasyonu', 'Bronşiolit', 'Astım atağı', 'Bakteriyel trakeit'],
  'Kadın Hastalıkları ve Doğum': ['Normal intrauterin gebelik', 'Tam abortus', 'Molar gebelik', 'Korpus luteum kisti rüptürü', 'Pelvik inflamatuvar hastalık'],
  default: ['Yakın klinik olasılık', 'Farklı mekanizmalı benzer tablo', 'Geçirilmiş hastalık bulgusu', 'Akut komplikasyon dışı durum', 'Normal varyant'],
};

const SCENARIO_OPENERS = [
  'Kısa TUS pratiğinde değerlendirilen hastada',
  'Acil karar basamağına getirilen olguda',
  'Poliklinik değerlendirmesinde ayırıcı tanı gerektiren tabloda',
  'Nöbetçi hekimin hızlı yorumlaması gereken spot olguda',
  'Temel bilim bilgisinin klinik paternle birleştirildiği soruda',
  'Klinik karar toplantısında tartışılan kısa olguda',
];

const QUESTION_ANGLES = [
  {
    id: 'pattern',
    label: 'klinik yorum',
    question: 'Bu olguda öykü, muayene ve objektif veriler birlikte düşünüldüğünde en uygun seçenek hangisidir?',
    stemCue: 'öykü, muayene ve seçilmiş objektif veriler birlikte değerlendirilir',
  },
  {
    id: 'first-step',
    label: 'ilk yaklaşım',
    question: 'Bu hasta için en doğru ilk yaklaşım hangisidir?',
    stemCue: 'öncelik acil ve etkili basamağı geciktirmeden seçmektir',
  },
  {
    id: 'mechanism',
    label: 'mekanizma bağlantısı',
    question: 'Bu tablonun temel mekanizmasını en iyi karşılayan seçenek hangisidir?',
    stemCue: 'mekanizma ile klinik bulgu ilişkisi birlikte değerlendirilir',
  },
  {
    id: 'differential',
    label: 'ayırıcı tanı',
    question: 'Benzer olasılıklar arasından bu olguyu en iyi açıklayan yanıt hangisidir?',
    stemCue: 'belirleyici klinik bulgu ayırıcı tanıyı daraltır',
  },
  {
    id: 'lab',
    label: 'tetkik yorumu',
    question: 'Verilen tetkik ve klinik bulgular birlikte yorumlandığında en güçlü sonuç hangisidir?',
    stemCue: 'tetkik sonucu öykü ve muayene bulgularıyla birlikte değerlendirilir',
  },
];

const DEMOGRAPHIC_POOL = [
  '19 yaş kadın', '23 yaş erkek', '31 yaş kadın', '37 yaş erkek', '44 yaş kadın', '52 yaş erkek',
  '61 yaş kadın', '68 yaş erkek', '2 yaş çocuk', '9 yaş çocuk', '10 günlük yenidoğan', '16 yaş ergen',
];

const SETTING_POOL = ['Acil servis', 'Dahiliye polikliniği', 'Çocuk acil', 'Aile hekimliği başvurusu', 'Servis konsültasyonu', 'Yoğun bakım ön değerlendirmesi'];

const VARIANT_STEM_MODIFIERS = [
  'Yakınmaların zamanlaması ayırıcı tanı için ayrıca sorgulanır.',
  'İlk değerlendirmede hemodinamik stabilite ve kırmızı bayraklar kontrol edilir.',
  'Ek öyküde temas, ilaç kullanımı veya önceki atak bilgisi netleştirilir.',
  'Muayene bulguları hedefli objektif verilerle birlikte yorumlanır.',
  'Klinik öncelik, tedaviyi geciktirebilecek olasılıkları hızla ayırmaktır.',
  'Başvuru sırasında eşlik eden sistemik bulgular karar basamağını etkiler.',
  'Acil kötüleşme bulguları dışlandıktan sonra en olası açıklama seçilir.',
  'Laboratuvar veya görüntüleme bulgusu tek başına değil, öyküyle birlikte değerlendirilir.',
  'Benzer tabloları ayıran temel nokta, bulguların birlikte oluşturduğu klinik örüntüdür.',
  'Hedefli yaklaşım, gereksiz tedavi veya tetkik yükünü azaltır.',
];

function buildVariantStemModifier(seed = {}, profile = {}) {
  const key = `${seed.seedId || seed.title}|${profile.variantNo || 0}|${profile.angle?.id || ''}`;
  const index = parseInt(stableHash(key).replace(/^q/, ''), 36) % VARIANT_STEM_MODIFIERS.length;
  return VARIANT_STEM_MODIFIERS[index];
}

function richItemText(item = '') {
  if (!item) return '';
  if (typeof item === 'string') return item;
  return [item.title || item.label, item.text || item.summary || item.explanation || item.description]
    .filter(Boolean)
    .join(': ');
}

function uniqueStrings(items = []) {
  return Array.from(new Set(items.map((item) => String(richItemText(item) || '').replace(/\s+/g, ' ').trim()).filter(Boolean)));
}

function branchTextOfSeed(seed) {
  return `${seed.relatedBranch || ''} ${seed.spotCategory || ''} ${seed.branchId || ''}`.toLocaleLowerCase('tr');
}

function optionTextById(seed, optionId) {
  return seed.options.find((option) => option.id === optionId)?.text || seed.options[0]?.text || '';
}

function getCaseAnswerFeedback(clinicalCase = {}) {
  return clinicalCase.diagnosis?.answerFeedback || clinicalCase.answerFeedback || {};
}

function getBranchName(clinicalCase = {}) {
  return clinicalCase.relatedBranch || BRANCH_NAME_BY_ID[clinicalCase.branchId] || clinicalCase.branchId || 'TUS Spot Olgular';
}

function compactLearningTarget(text = '', fallback = '') {
  const cleaned = String(text || fallback || '')
    .replace(/\s+/g, ' ')
    .replace(/\bBu nedenle\b.*$/i, '')
    .trim();
  return cleaned || 'Karar verdirici klinik bulgunun doğru yorumlanması';
}

function collectBranchDiagnosisPool(branchId) {
  return uniqueStrings(
    cases
      .filter((item) => item.branchId === branchId)
      .map((item) => item.diagnosis?.correct)
      .filter(Boolean),
  );
}

function collectGlobalDiagnosisPool() {
  return uniqueStrings(cases.map((item) => item.diagnosis?.correct).filter(Boolean));
}

function selectDeterministic(items = [], key = '', count = 1) {
  if (!items.length) return [];
  const start = parseInt(stableHash(key).replace(/^q/, ''), 36) % items.length;
  const selected = [];
  for (let offset = 0; offset < items.length && selected.length < count; offset += 1) {
    selected.push(items[(start + offset) % items.length]);
  }
  return selected;
}

function buildCaseDerivedOptions(clinicalCase, relatedBranch) {
  const correct = clinicalCase.diagnosis?.correct;
  if (!correct) return null;
  const branchPool = collectBranchDiagnosisPool(clinicalCase.branchId).filter((item) => normalizeQuestionText(item) !== normalizeQuestionText(correct));
  const globalPool = collectGlobalDiagnosisPool().filter((item) => normalizeQuestionText(item) !== normalizeQuestionText(correct));
  const fallbackPool = FALLBACK_DISTRACTORS_BY_BRANCH[relatedBranch] || FALLBACK_DISTRACTORS_BY_BRANCH.default;
  const distractors = uniqueStrings([
    ...selectDeterministic(branchPool, `${clinicalCase.id}-branch`, 7),
    ...selectDeterministic(globalPool, `${clinicalCase.id}-global`, 5),
    ...fallbackPool,
  ]).filter((item) => normalizeQuestionText(item) !== normalizeQuestionText(correct));

  const finalTexts = uniqueStrings([correct, ...distractors]).slice(0, 5);
  if (finalTexts.length < 5) return null;
  return finalTexts.map((text, index) => ({ id: OPTION_IDS[index], text }));
}

function abstractCaseEvidence(clinicalCase = {}) {
  const feedback = getCaseAnswerFeedback(clinicalCase);
  const pearls = uniqueStrings([
    ...(Array.isArray(feedback.pearls) ? feedback.pearls : []),
    ...(Array.isArray(clinicalCase.diagnosis?.pearls) ? clinicalCase.diagnosis.pearls : []),
    feedback.learningOutcome,
    clinicalCase.clinicalFocus,
    clinicalCase.examNote,
    clinicalCase.spotPearl,
  ]).slice(0, 4);
  return pearls.length ? pearls : [clinicalCase.clinicalFocus || clinicalCase.title].filter(Boolean);
}

function buildCaseDerivedSeed(clinicalCase) {
  const relatedBranch = getBranchName(clinicalCase);
  const options = buildCaseDerivedOptions(clinicalCase, relatedBranch);
  if (!options) return null;

  const feedback = getCaseAnswerFeedback(clinicalCase);
  const learningTarget = compactLearningTarget(
    feedback.learningOutcome || clinicalCase.clinicalFocus,
    clinicalCase.diagnosis?.explanation || clinicalCase.title,
  );

  return {
    seedId: `ai-concept-${stableHash(`${clinicalCase.id}|${learningTarget}|${clinicalCase.diagnosis?.correct}`)}`,
    conceptOriginId: clinicalCase.id,
    source: 'embedded-case-concept-only',
    title: clinicalCase.chiefComplaint || clinicalCase.patientIntro?.presentation || `${relatedBranch} spot karar sorusu`,
    relatedBranch,
    branchId: AI_BRANCH_ID,
    originalBranchId: clinicalCase.branchId,
    spotCategory: `AI Spot • ${relatedBranch}`,
    difficulty: clinicalCase.difficulty?.includes('Acil') ? 'Zor' : (clinicalCase.difficulty || 'Orta-Zor'),
    learningTarget,
    correctConcept: clinicalCase.diagnosis?.correct,
    demographics: null,
    setting: null,
    chiefComplaint: null,
    stem: null,
    exam: [],
    vitals: {},
    investigations: [],
    question: null,
    questionType: 'spot',
    options,
    correctAnswer: 'A',
    explanation: clinicalCase.diagnosis?.explanation || feedback.whyCorrect || `${clinicalCase.diagnosis?.correct} olgudaki somut klinik bulgularla en güçlü uyum gösterir; diğer olasılıklar ana bulguları yeterince açıklamaz.`,
    wrongOptionFeedback: {},
    evidenceConcepts: abstractCaseEvidence(clinicalCase),
    examPearl: toPlainText((feedback.pearls || clinicalCase.diagnosis?.pearls || [])[0]) || learningTarget,
    managementSteps: [],
  };
}

let cachedCaseDerivedSeeds = null;
const hardRejectedAISeedIds = new Set();

export function buildCaseDerivedAISeeds() {
  if (cachedCaseDerivedSeeds) return cachedCaseDerivedSeeds;
  cachedCaseDerivedSeeds = cases
    .map(buildCaseDerivedSeed)
    .filter(Boolean)
    .slice(0, CASE_CONCEPT_LIMIT);
  return cachedCaseDerivedSeeds;
}

function getEligibleSeeds(branchFilter = 'random') {
  const normalizedFilter = String(branchFilter || 'random').toLocaleLowerCase('tr');
  const allSeeds = [...AI_QUESTION_SEEDS, ...AI_BRANCH_TEMPLATE_SEEDS, ...AI_SYNTHETIC_FALLBACK_SEEDS, ...buildCaseDerivedAISeeds()];
  if (normalizedFilter === 'random' || normalizedFilter === 'rastgele') return allSeeds;
  const filtered = allSeeds.filter((seed) => branchFilterMatchesSeed(seed, branchFilter));
  return filtered.length ? filtered : [...AI_QUESTION_SEEDS, ...AI_BRANCH_TEMPLATE_SEEDS, ...AI_SYNTHETIC_FALLBACK_SEEDS].filter((seed) => branchFilterMatchesSeed(seed, branchFilter));
}

function previousSeedIdFromContext(previousQuestionId = '', context = {}) {
  const historyItem = (context.recentQuestionSummaries || []).find((item) => item.id === previousQuestionId);
  return historyItem?.seedId || null;
}

function scoreSeedNovelty(seed, context, previousQuestionId) {
  const seedSignature = makeSeedSignature(seed);
  const sourceKey = seed.seedId;
  let score = Math.random();
  if (sourceKey === previousSeedIdFromContext(previousQuestionId, context)) score -= 100;
  if (context.recentIds?.includes(sourceKey)) score -= 80;
  if (context.recentSignatures?.includes(seedSignature)) score -= 50;
  if (seed.source === 'embedded-case-concept-only') score += 0.2;
  if (seed.difficulty?.toLocaleLowerCase('tr').includes('zor')) score += 0.06;
  return score;
}

function rankSeedsByNovelty(pool, { previousQuestionId = null, context = buildRecentQuestionContext() } = {}) {
  return shuffleArray(pool)
    .sort((a, b) => scoreSeedNovelty(b, context, previousQuestionId) - scoreSeedNovelty(a, context, previousQuestionId));
}

function buildVariantProfile(seed, attempt = 0, context = {}, branchFilter = '') {
  const variantKey = `${seed.seedId}|${Date.now()}|${Math.random()}|${attempt}|${context.recentSignatures?.length || 0}`;
  const numeric = parseInt(stableHash(variantKey).replace(/^q/, ''), 36);
  const branchProfile = getBranchControlledProfile(seed, attempt, context, branchFilter);
  return {
    angle: QUESTION_ANGLES[numeric % QUESTION_ANGLES.length],
    opener: SCENARIO_OPENERS[(numeric + attempt) % SCENARIO_OPENERS.length],
    demographic: branchProfile.demographic,
    setting: branchProfile.setting,
    presentation: branchProfile.presentation,
    titleCue: branchProfile.titleCue,
    rule: branchProfile.rule,
    variantNo: (numeric % 997) + 1,
    answerShift: numeric % OPTION_IDS.length,
  };
}

function maskCorrectConcept(text = '', correctText = '') {
  if (!text || !correctText) return text || '';
  const escaped = String(correctText).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return String(text).replace(new RegExp(escaped, 'gi'), 'karar verdirici patern');
}

function buildStem(seed, profile, correctText) {
  const controlledStem = buildBranchAwareStem(seed, profile, profile.angle, correctText);
  if (seed.source === 'embedded-case-concept-only') return controlledStem;

  const baseStem = String(seed.stem || '').replace(new RegExp(String(correctText || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), 'karar verdirici patern');
  const branchRule = getBranchRuleForSeed(seed);
  if (branchRule?.id === 'pediatrics' && /\b([2-9][0-9])\s*yaş\b|erişkin|yaşlı/i.test(baseStem)) return `${controlledStem} ${buildVariantStemModifier(seed, profile)}`.replace(/\s+/g, ' ').trim();
  if (branchRule?.id === 'obstetrics-gynecology' && /\berkek\b|prostat|testis/i.test(baseStem)) return `${controlledStem} ${buildVariantStemModifier(seed, profile)}`.replace(/\s+/g, ' ').trim();
  return `${baseStem} ${profile.angle.stemCue}. ${buildVariantStemModifier(seed, profile)}`.replace(/\s+/g, ' ').trim();
}

function normalizeOptionObjects(options = []) {
  return options
    .map((option, index) => ({ id: OPTION_IDS[index] || option.id || String(index + 1), text: String(option.text || option || '').trim() }))
    .filter((option) => option.text)
    .slice(0, 5);
}

function buildBalancedOptions(seed, profile) {
  const correctText = seed.correctConcept || optionTextById(seed, seed.correctAnswer);
  const rawOptions = normalizeOptionObjects(seed.options);
  const correctOption = rawOptions.find((option) => normalizeQuestionText(option.text) === normalizeQuestionText(correctText)) || rawOptions.find((option) => option.id === seed.correctAnswer) || rawOptions[0];
  const distractors = rawOptions.filter((option) => normalizeQuestionText(option.text) !== normalizeQuestionText(correctOption?.text));
  const optionTexts = uniqueStrings([correctOption?.text, ...shuffleArray(distractors.map((item) => item.text))]).slice(0, 5);
  const completeTexts = optionTexts.length === 5 ? optionTexts : uniqueStrings([...optionTexts, ...(FALLBACK_DISTRACTORS_BY_BRANCH[seed.relatedBranch] || FALLBACK_DISTRACTORS_BY_BRANCH.default)]).slice(0, 5);

  const correct = correctOption?.text || completeTexts[0];
  const remaining = shuffleArray(completeTexts.filter((text) => normalizeQuestionText(text) !== normalizeQuestionText(correct)));
  const finalTexts = [...remaining.slice(0, profile.answerShift), correct, ...remaining.slice(profile.answerShift)].slice(0, 5);
  while (finalTexts.length < 5) {
    const fallback = (FALLBACK_DISTRACTORS_BY_BRANCH[seed.relatedBranch] || FALLBACK_DISTRACTORS_BY_BRANCH.default)
      .find((item) => !finalTexts.some((text) => normalizeQuestionText(text) === normalizeQuestionText(item)));
    if (!fallback) break;
    finalTexts.push(fallback);
  }

  return finalTexts.slice(0, 5).map((text, index) => ({ id: OPTION_IDS[index], text }));
}

function buildEvidenceChain(seed, profile, correctText) {
  if (seed.source === 'embedded-case-concept-only') {
    const concepts = uniqueStrings(seed.evidenceConcepts || [])
      .map((item) => maskCorrectConcept(item, correctText))
      .slice(0, 3);
    const maskedLearningTarget = maskCorrectConcept(seed.learningTarget, correctText);
    const primaryConcepts = concepts.length ? concepts : [maskedLearningTarget];
    return uniqueStrings([
      ...primaryConcepts,
      seed.examPearl || maskedLearningTarget,
      seed.title || seed.chiefComplaint,
      seed.correctConcept ? `${maskCorrectConcept(seed.correctConcept, correctText)} ile karışabilecek yakın klinik olasılıklar dışlanır.` : '',
    ]).filter(Boolean).slice(0, 4);
  }
  return uniqueStrings(seed.evidenceChain || []).map((item) => maskCorrectConcept(item, correctText)).slice(0, 5);
}

function cleanClinicalSummaryItem(value = '') {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .replace(/^(Karar verdirici ipucu|Destekleyici kanıt|Ayırt ettirici ipucu|Ayırt ettirici bulgu|Klinik patern|Tanısal ayrım|Sınav notu|TUS kırmızı bayrağı|Destekleyici bulgu|Ana kanıt|Kritik ipucu|karar verdirici patern)\s*[:：-]\s*/iu, '')
    .replace(/\s*(\.{3}|…)\s*/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/([,.;:!?])(?=\S)/g, '$1 ')
    .replace(/\s*\/\s*/g, ' veya ')
    .replace(/[\s,;:.]+$/u, '')
    .trim();
}

function uniqueSummaryItems(items = [], max = 4) {
  const seen = new Set();
  const out = [];
  items.map(cleanClinicalSummaryItem).filter(Boolean).forEach((item) => {
    const key = normalizeQuestionText(item);
    if (!seen.has(key)) {
      seen.add(key);
      out.push(item);
    }
  });
  return out.slice(0, max);
}

function buildAIRiskContext(seed, profile) {
  return uniqueSummaryItems(buildBranchRiskContext(seed, profile), 3);
}

function buildAIClueItems(evidenceChain = [], seed = {}, correctText = '') {
  return uniqueSummaryItems([
    ...(evidenceChain || []),
    seed.examPearl || seed.learningTarget,
    seed.title || seed.chiefComplaint,
  ], 4);
}

function buildInvestigation(item, index, correctText = '') {
  const strip = (text = '') => {
    if (!text || !correctText) return text || '';
    const escaped = String(correctText).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return String(text).replace(new RegExp(escaped, 'gi'), 'karar verdirici patern');
  };
  return {
    id: item.id || `ai-investigation-${index + 1}`,
    label: item.label || `Tetkik ${index + 1}`,
    type: item.type || 'lab',
    priority: item.priority || (index === 0 ? 'essential' : 'useful'),
    rows: Array.isArray(item.rows) ? item.rows : undefined,
    summary: strip(item.summary || ''),
    findings: Array.isArray(item.findings) ? item.findings.map(strip) : [],
    interpretation: 'Objektif sonuçlar tanıyı doğrudan söylemeden klinik yorum gerektirir.',
  };
}

function buildSyntheticInvestigation(seed, profile, correctText = '') {
  const learningCue = maskCorrectConcept(seed.examPearl || seed.learningTarget || 'Ana klinik bulgu', correctText);
  const branchLabel = profile.angle.id === 'lab' ? 'Hedefli laboratuvar verisi' : profile.angle.id === 'mechanism' ? 'Mekanizma ipucu' : 'Objektif karar verisi';
  return [{
    id: `ai-synthetic-pattern-${profile.variantNo}`,
    label: branchLabel,
    type: profile.angle.id === 'mechanism' ? 'mechanism' : 'lab',
    priority: 'essential',
    summary: learningCue,
    findings: [
      seed.title || profile.presentation || 'Başvuru bulgusu tanısal ayrımda önemlidir.',
      learningCue,
    ].filter(Boolean),
    interpretation: 'Objektif veri, öykü ve muayene bulgularıyla birlikte değerlendirilir.',
  }];
}

function buildWrongFeedback(options, correctText, seed) {
  return options.reduce((accumulator, option) => {
    if (normalizeQuestionText(option.text) === normalizeQuestionText(correctText)) return accumulator;
    const seeded = seed.wrongOptionFeedback?.[option.id];
    accumulator[option.id] = seeded || `${option.text} benzer tabloda düşünülebilir; ancak olgudaki somut bulgular ${correctText} lehine daha güçlüdür.`;
    return accumulator;
  }, {});
}

function buildDifferentialComparison(options, correctText, wrongOptionFeedback, seed) {
  return options.reduce((accumulator, option) => {
    if (normalizeQuestionText(option.text) === normalizeQuestionText(correctText)) return accumulator;
    accumulator[option.text] = {
      explanation: wrongOptionFeedback[option.id] || `${option.text} bu klinik bağlamda düşünülebilir; ancak temel patern ${correctText} lehinedir.`,
      comparisonPoints: [
        `${option.text} bazı olgularda benzer yakınma oluşturabilir; ancak bu olgudaki ana bulguları tam açıklamaz.`,
        `${correctText} olgudaki somut bulgularla daha güçlü uyum gösterir.`,
        'Ayırıcı tanıda belirleyici olan, öykü ve muayene bulgularının birlikte oluşturduğu klinik tablodur.',
      ],
    };
    return accumulator;
  }, {});
}

function buildManagementSteps(seed, profile) {
  if (Array.isArray(seed.managementSteps) && seed.managementSteps.length) {
    return seed.managementSteps.map(richItemText).filter(Boolean).slice(0, 4);
  }
  return [
    'Önce yaş, başvuru yakınması ve acil bulguları birlikte değerlendir.',
    'Objektif verileri muayene ve öyküyle birlikte yorumla.',
    'Tedavi veya tanı gecikmesine yol açabilecek alternatifleri somut bulgularla ele.',
  ];
}

export function buildAIQuestionCase(seed, { generatedId = createAIQuestionId(), source = 'local-template-generator', attempt = 0, context = {}, branchFilter = '' } = {}) {
  const profile = buildVariantProfile(seed, attempt, context, branchFilter);
  const options = buildBalancedOptions(seed, profile);
  const correctText = seed.correctConcept || optionTextById(seed, seed.correctAnswer) || options[0]?.text;
  const correctOption = options.find((option) => normalizeQuestionText(option.text) === normalizeQuestionText(correctText)) || options[0];
  const normalizedCorrectText = correctOption.text;
  const evidenceChain = buildEvidenceChain(seed, profile, normalizedCorrectText);
  const wrongOptionFeedback = buildWrongFeedback(options, normalizedCorrectText, seed);
  const titleBase = sanitizeAIQuestionTitle(seed.title, {
    seed,
    profile,
    rule: profile.rule,
    key: `${seed.seedId}|${profile.variantNo}|${profile.angle.id}`,
  });
  const questionPrompt = seed.question && seed.source !== 'embedded-case-concept-only'
    ? `${profile.angle.question}`
    : profile.angle.question;
  const stem = buildStem(seed, profile, normalizedCorrectText);
  const investigations = seed.source === 'embedded-case-concept-only'
    ? buildSyntheticInvestigation(seed, profile, normalizedCorrectText)
    : (seed.investigations || []).map((item, index) => buildInvestigation(item, index, normalizedCorrectText));
  const diagnosisOptions = options.map((option) => option.text);
  const optionSet = makeOptionSetSignature(options);
  const generationSignatureSeed = stableHash([
    seed.seedId,
    profile.angle.id,
    profile.variantNo,
    titleBase,
    stem,
    questionPrompt,
    normalizedCorrectText,
    optionSet,
  ].join(' | '));

  const question = {
    id: generatedId,
    seedId: seed.seedId,
    source,
    caseType: 'ai-spot',
    branchId: AI_BRANCH_ID,
    branchName: seed.relatedBranch || 'TUS Spot Olgular',
    title: titleBase,
    relatedBranch: seed.relatedBranch || 'TUS Spot Olgular',
    spotCategory: seed.spotCategory || `AI Spot • ${seed.relatedBranch || 'TUS'}`,
    difficulty: seed.difficulty || 'Orta-Zor',
    learningTarget: seed.learningTarget,
    demographics: profile.demographic,
    setting: profile.setting,
    chiefComplaint: profile.presentation || seed.chiefComplaint || titleBase,
    stem,
    exam: Array.isArray(seed.exam) && seed.exam.length ? seed.exam : [
      ...buildBranchExamDefaults(seed, profile),
    ],
    vitals: Object.keys(seed.vitals || {}).length ? seed.vitals : buildBranchVitals(seed, profile),
    investigations,
    question: questionPrompt,
    questionType: profile.angle.id === 'first-step' ? 'treatment' : profile.angle.id === 'lab' ? 'test' : profile.angle.id === 'mechanism' ? 'spot' : 'diagnosis',
    clinicalFocus: seed.learningTarget,
    findings: {
      history: [stem],
      exam: Array.isArray(seed.exam) && seed.exam.length ? seed.exam : buildBranchExamDefaults(seed, profile),
      vitals: Object.keys(seed.vitals || {}).length ? seed.vitals : buildBranchVitals(seed, profile),
      investigations,
    },
    options,
    correctAnswer: correctOption.id,
    explanation: seed.source === 'embedded-case-concept-only'
      ? `${normalizedCorrectText} en uygun yanıttır; çünkü olgudaki öykü, muayene ve objektif veriler bu seçeneği diğer olasılıklardan daha güçlü destekler.`
      : seed.explanation,
    evidenceChain,
    examPearls: [seed.examPearl || seed.learningTarget],
    wrongOptionFeedback,
    generationSignature: generationSignatureSeed,
    generatedAt: new Date().toISOString(),
    managementSequence: { enabled: false, showInSpot: false, steps: [] },
    patientIntro: {
      profile: [profile.demographic, profile.setting].filter(Boolean).join(' · '),
      presentation: profile.presentation || seed.chiefComplaint || titleBase,
      riskContext: buildAIRiskContext(seed, profile),
      distinctiveClues: buildAIClueItems(evidenceChain, seed, normalizedCorrectText),
      historySummary: stem,
    },
    diagnosis: {
      correct: normalizedCorrectText,
      options: diagnosisOptions,
      explanation: seed.explanation,
      nextStep: seed.nextStep || 'Olgudaki somut ipuçlarını seçeneklerle karşılaştır.',
      pearls: [seed.examPearl || seed.learningTarget].filter(Boolean),
      answerFeedback: {
        whyCorrect: seed.source === 'embedded-case-concept-only'
          ? `${normalizedCorrectText} doğru yanıttır; çünkü olgudaki somut bulgular bu seçeneği destekler ve alternatifler aynı klinik tabloyu yeterince açıklamaz.`
          : seed.explanation,
        evidenceChain,
        pearls: [seed.examPearl || seed.learningTarget].filter(Boolean),
        clinicalPearls: [seed.examPearl || seed.learningTarget].filter(Boolean),
        differentialComparison: buildDifferentialComparison(options, normalizedCorrectText, wrongOptionFeedback, seed),
        whyWrong: Object.fromEntries(options
          .filter((option) => normalizeQuestionText(option.text) !== normalizeQuestionText(normalizedCorrectText))
          .map((option) => [option.text, wrongOptionFeedback[option.id]])),
        managementSteps: buildManagementSteps(seed, profile),
        learningOutcome: seed.learningTarget,
      },
    },
    aiMeta: {
      generatedAt: Date.now(),
      generator: source,
      schemaVersion: 'ai-spot-v3-independent-generator',
      sourceSeedId: seed.seedId,
      sourceConceptOnly: seed.source === 'embedded-case-concept-only',
      sourceCaseId: null,
      conceptOriginHash: seed.conceptOriginId ? stableHash(seed.conceptOriginId) : null,
      signature: null,
      topicSignature: null,
      generationSignature: generationSignatureSeed,
      optionSetSignature: optionSet,
      variantAngle: profile.angle.id,
      variantNo: profile.variantNo,
    },
  };

  const qualityGate = runAIQuestionQualityGate(question, { repair: true, requestedBranch: branchFilter || seed.relatedBranch });
  const qualityCheckedQuestion = qualityGate.question || repairAIQuestionQuality(question);
  qualityCheckedQuestion.aiMeta = {
    ...(qualityCheckedQuestion.aiMeta || {}),
    qualityGateErrors: qualityGate.ok ? [] : ['quality-gate-repaired'],
    qualityGateWarnings: qualityGate.warnings?.length ? ['quality-gate-warning'] : [],
  };
  attachQuestionDedupeFields(qualityCheckedQuestion);
  return qualityCheckedQuestion;
}

function pickCandidateSeeds(pool, context, previousQuestionId) {
  const usablePool = pool.filter((seed) => !hardRejectedAISeedIds.has(seed.seedId));
  const ranked = rankSeedsByNovelty(usablePool.length ? usablePool : pool, { previousQuestionId, context });
  const fresh = ranked.filter((seed) => {
    const signature = makeSeedSignature(seed);
    return !context.recentIds?.includes(seed.seedId) && !context.recentSignatures?.includes(signature);
  });
  return fresh.length ? fresh : ranked;
}


function isHardSeedFailure(errors = []) {
  if (!Array.isArray(errors) || !errors.length) return false;
  return errors.some((error) => /quality:|branch-fit:|başlık|demografi|pediatri|kadın doğum|schema|contentSignature eksik/i.test(String(error)))
    && !errors.every((error) => /duplicate:|yakın geçmişte|embedded-case-overlap|id-repeat|content-signature-repeat/i.test(String(error)));
}

function shouldLogAIGenerationDebug() {
  try {
    return Boolean(import.meta?.env?.DEV) || (typeof window !== 'undefined' && window.localStorage?.getItem('klinikiq-ai-debug') === '1');
  } catch {
    return false;
  }
}

function logAIGenerationDebug(message, payload = {}) {
  if (!shouldLogAIGenerationDebug()) return;
  // eslint-disable-next-line no-console
  console.debug(`[KlinikIQ AI] ${message}`, payload);
}

function validateGeneratedCandidate(question, seed, context, branchFilter, errors, stage, attempt) {
  const validation = validateAIQuestionCase(question, context.recentSignatures, { embeddedCases: cases, context, requestedBranch: branchFilter });
  if (validation.ok) {
    question.aiMeta = {
      ...(question.aiMeta || {}),
      generationStage: stage,
      generationAttempt: attempt,
      validationErrors: [],
    };
    return { ok: true, question };
  }

  if (isHardSeedFailure(validation.errors)) hardRejectedAISeedIds.add(seed.seedId);
  const record = { stage, attempt, seedId: seed.seedId, source: seed.source, errors: validation.errors.slice(0, 8) };
  errors.push(record);
  logAIGenerationDebug('candidate rejected', record);
  return { ok: false, validation };
}

function tryGenerateFromSeeds(seeds, { context, branchFilter, previousQuestionId, errors, stage, maxAttempts, attemptOffset = 0, sourceFactory }) {
  if (!seeds.length) return null;
  const candidates = pickCandidateSeeds(seeds, context, previousQuestionId);
  const totalAttempts = Math.min(Math.max(maxAttempts, candidates.length), MAX_GENERATION_ATTEMPTS);

  for (let attempt = 0; attempt < totalAttempts; attempt += 1) {
    const seed = candidates[(attempt + attemptOffset) % candidates.length];
    if (!seed) continue;
    const source = sourceFactory ? sourceFactory(seed) : 'local-template-generator';
    const question = buildAIQuestionCase(seed, {
      source,
      attempt: attempt + attemptOffset,
      context,
      branchFilter,
    });
    const result = validateGeneratedCandidate(question, seed, context, branchFilter, errors, stage, attempt + attemptOffset);
    if (result.ok) return result.question;
  }
  return null;
}

function generateFromSyntheticTemplate(branchFilter, context, previousQuestionId, errors = []) {
  const syntheticPool = [...AI_SYNTHETIC_FALLBACK_SEEDS, ...AI_BRANCH_TEMPLATE_SEEDS]
    .filter((seed) => branchFilterMatchesSeed(seed, branchFilter));
  return tryGenerateFromSeeds(syntheticPool, {
    context,
    branchFilter,
    previousQuestionId,
    errors,
    stage: 'local-synthetic-template-fallback',
    maxAttempts: MAX_TEMPLATE_FALLBACK_ATTEMPTS,
    attemptOffset: 900,
    sourceFactory: () => 'local-synthetic-template-fallback',
  });
}

export function generateAIQuestion({ previousQuestionId = null, branchFilter = 'random', context = buildRecentQuestionContext() } = {}) {
  const errors = [];
  const pool = getEligibleSeeds(branchFilter);

  const primary = tryGenerateFromSeeds(pool, {
    context,
    branchFilter,
    previousQuestionId,
    errors,
    stage: 'primary-mutated-seed',
    maxAttempts: MAX_PRIMARY_ATTEMPTS,
    sourceFactory: (seed) => (seed.source === 'embedded-case-concept-only' ? 'concept-template-local-generator' : 'curated-template-local-generator'),
  });
  if (primary) return primary;

  const repairPool = [...AI_QUESTION_SEEDS, ...AI_BRANCH_TEMPLATE_SEEDS, ...AI_SYNTHETIC_FALLBACK_SEEDS, ...buildCaseDerivedAISeeds()]
    .filter((seed) => branchFilterMatchesSeed(seed, branchFilter));
  const repaired = tryGenerateFromSeeds(repairPool, {
    context,
    branchFilter,
    previousQuestionId,
    errors,
    stage: 'repair-and-seed-mutation',
    maxAttempts: MAX_REPAIR_ATTEMPTS * Math.max(1, Math.min(4, repairPool.length)),
    attemptOffset: 300,
    sourceFactory: (seed) => (seed.source === 'embedded-case-concept-only' ? 'concept-template-repair-generator' : 'curated-template-repair-generator'),
  });
  if (repaired) return repaired;

  const fallback = generateFromSyntheticTemplate(branchFilter, context, previousQuestionId, errors);
  if (fallback) return fallback;

  const canUseBroadSynthetic = ['random', 'rastgele'].includes(String(branchFilter || 'random').toLocaleLowerCase('tr'));
  if (canUseBroadSynthetic) {
    const broadSynthetic = generateFromSyntheticTemplate('random', context, previousQuestionId, errors);
    if (broadSynthetic) return broadSynthetic;
  }

  const error = new Error('AI local generator could not create a non-duplicate question after primary, repair and synthetic fallback attempts.');
  error.generationErrors = errors.slice(-18);
  logAIGenerationDebug('all generation stages failed', { branchFilter, attempts: errors.length, lastErrors: error.generationErrors });
  throw error;
}

export function listAIQuestionBranches() {
  return getAIQuestionBranchOptions();
}
