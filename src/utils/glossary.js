import { TUS_GLOSSARY_ADVANCED_TERMS } from '../data/tusGlossaryIndex.js';
import { TUS_GLOSSARY_EXPANDED_TERMS } from '../data/tusGlossaryExpandedIndex.js';
import { TUS_GLOSSARY_SUPPLEMENTAL_TERMS } from '../data/tusGlossarySupplementalIndex.js';
import { TUS_GLOSSARY_SCIENTIFIC_TERMS } from '../data/tusGlossaryScientificIndex.js';
import { TUS_GLOSSARY_NESTED_CLINICAL_TERMS } from '../data/tusGlossaryNestedClinicalIndex.js';
import { TUS_GLOSSARY_CASE_DERIVED_TERMS } from '../data/tusGlossaryCaseDerivedIndex.js';
import { TUS_GLOSSARY_CLINICAL_BRANCH_DEEP_TERMS } from '../data/tusGlossaryClinicalBranchDeepIndex.js';
import { TUS_GLOSSARY_CONTEXTUAL_PHRASE_TERMS } from '../data/tusGlossaryContextualPhraseIndex.js';
import { TUS_GLOSSARY_BINDING_CORRECTION_TERMS } from '../data/tusGlossaryBindingCorrectionsIndex.js';
import { TUS_GLOSSARY_CONTEXT_SAFETY_TERMS } from '../data/tusGlossaryContextSafetyIndex.js';
import { TUS_GLOSSARY_GLOBAL_QUALITY_TERMS } from '../data/tusGlossaryGlobalQualityIndex.js';
import { TUS_GLOSSARY_NESTED_COVERAGE_TERMS } from '../data/tusGlossaryNestedCoverageIndex.js';
import { TUS_GLOSSARY_AMBIGUITY_SAFETY_TERMS } from '../data/tusGlossaryAmbiguitySafetyIndex.js';
import { TUS_GLOSSARY_CONTENT_COVERAGE_TERMS } from '../data/tusGlossaryContentCoverageIndex.js';
import { TUS_GLOSSARY_RECURSIVE_NESTED_TERMS } from '../data/tusGlossaryRecursiveNestedIndex.js';
import { TUS_GLOSSARY_CANDIDATE_AUDIT_TERMS } from '../data/tusGlossaryCandidateAuditIndex.js';
import { TUS_GLOSSARY_DEFINITION_QUALITY_TERMS } from '../data/tusGlossaryDefinitionQualityIndex.js';
import { TUS_GLOSSARY_V300_SUPPLEMENTAL_TERMS } from '../data/tusGlossaryV300SupplementalIndex.js';
import { TUS_GLOSSARY_V304_EXTRA_TERMS } from '../data/tusGlossaryV304ExtraIndex.js';
import { TUS_GLOSSARY_V319_TEACHABLE_TERMS } from '../data/tusGlossaryV319TeachableIndex.js';
import { TUS_GLOSSARY_V320_QUALITY_BATCH3_TERMS } from '../data/tusGlossaryV320QualityBatch3Index.js';
import { TUS_GLOSSARY_V321_DEEP_HIGH_YIELD_BATCH4_TERMS } from '../data/tusGlossaryV321DeepHighYieldBatch4Index.js';
import { TUS_GLOSSARY_V330_ULTRADEEP_BATCH5_6_TERMS } from '../data/tusGlossaryV330UltraDeepBatch5And6Index.js';

const teachingOnly = 'teachingOnly';

// Central KlinikIQ glossary.
// Updated from KlinikIQ_CEHT_Glossary_TUS_Spot_Kelimeler(1).xlsx.
// Source sheets used: Glossary_All and TUS_Spot_Kelimeler.
// Duplicate terms are merged by normalized term/alias matching; case linkage is stored as metadata.

export function foldTurkishText(value = '') {
  return String(value)
    .replace(/İ/g, 'i')
    .replace(/I/g, 'ı')
    .toLocaleLowerCase('tr')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function normalizeGlossaryText(value = '') {
  return foldTurkishText(value)
    .replace(/[^\p{L}\p{N}+/.-]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export const UNIT_BLACKLIST = [
  'mg',
  'g',
  'kg',
  'mcg',
  'µg',
  'μg',
  'ng',
  'mL',
  'L',
  'dL',
  'mg/dL',
  'mg/L',
  'g/dL',
  'mmol/L',
  'mEq/L',
  'IU/L',
  'U/L',
  'pg/mL',
  'ng/mL',
  'µIU/mL',
  'μIU/mL',
  'mmHg',
  'bpm',
  '°C',
  '%',
  '/mm³',
  '/mm3',
  'x10^3/µL',
  'x10^3/μL',
];

function escapeUnitRegExp(value = '') {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function normalizeUnitToken(value = '') {
  return String(value)
    .replace(/μ/g, 'µ')
    .replace(/\s+/g, '')
    .trim();
}

const UNIT_BLACKLIST_SET = new Set(UNIT_BLACKLIST.map(normalizeUnitToken));

const NUMERIC_UNIT_PATTERN = UNIT_BLACKLIST
  .map(normalizeUnitToken)
  .filter(Boolean)
  .sort((a, b) => b.length - a.length)
  .map(escapeUnitRegExp)
  .join('|');

const NUMERIC_UNIT_REGEX = new RegExp(
  `\\b\\d+(?:[.,]\\d+)?(?:\\s*(?:/|–|-|to)\\s*\\d+(?:[.,]\\d+)?)?\\s*(?:${NUMERIC_UNIT_PATTERN})(?=$|[\\s,;:.!?)}\\]\\[]|\\/)`,
  'gu',
);

export function isBlacklistedUnitToken(value = '') {
  return UNIT_BLACKLIST_SET.has(normalizeUnitToken(value));
}

export function getProtectedUnitRanges(text = '') {
  const source = String(text).replace(/μ/g, 'µ');
  const ranges = [];
  NUMERIC_UNIT_REGEX.lastIndex = 0;
  let match;

  while ((match = NUMERIC_UNIT_REGEX.exec(source)) !== null) {
    ranges.push({ start: match.index, end: match.index + match[0].length });
  }

  return ranges;
}

export function isInsideProtectedUnitRange(start, end, ranges = []) {
  return ranges.some((range) => start < range.end && end > range.start);
}


// Terms that are too broad to mark everywhere. They may still appear as part of
// longer, curated expressions such as "intravenöz kalsiyum glukonat".
export const LOW_SIGNAL_GLOSSARY_ALIASES = new Set([
  'hasta',
  'agri',
  'ates',
  'bulgu',
  'semptom',
  'test',
  'tedavi',
  'tani',
  'iv',
  'intravenoz',
  'ekg',
  'bt',
  'mrg',
  'tomografi',
  'derivasyon',
  'vital bulgular',
  'gogus agrisi',
  'oksijenizasyon',
  'bulantı',
  'kusma',
  'ishal',
  'baş ağrısı',
  'öksürük',
  'idrar',
  'kan',
  'serum',
  'pozitif',
  'negatif',
  'as',
  'ana',
  'no',
  'or',
  'f',
  't',
  'akg',
  'vkg',
  'yüksek saptandı',
  'düşük saptandı',
  'pozitif saptandı',
  'negatif saptandı',
  'normal saptandı',
  'objektif veri',
  'sınav notu',
  'ayırıcı mantık',
  'sınav odağı',
  'ölçülen bilgi',
  'muayene bulgusu',
]);

export function isLowSignalGlossaryAlias(alias = '') {
  const raw = String(alias || '').trim();
  // Keep true uppercase acronyms linkable (ANA, ANCA, AKG, ACTH, NO), while
  // suppressing their lowercase generated/noisy forms (ana, anca, akg, no).
  if (/^[A-ZÇĞİÖŞÜ0-9./+-]{2,5}$/.test(raw) && /[A-ZÇĞİÖŞÜ]/.test(raw)) return false;
  const normalized = normalizeGlossaryText(alias);
  return LOW_SIGNAL_GLOSSARY_ALIASES.has(normalized);
}

function isShortCaseSensitiveMedicalToken(value = '') {
  const raw = String(value || '').trim();
  // Short acronyms such as AS, ANA, NO, F, OR, ACTH must not generate a
  // lowercase alias. Otherwise they can consume the limited glossary slots in
  // ordinary Turkish/English prose and hide more useful clinical terms.
  return raw.length <= 5
    && /[A-ZÇĞİÖŞÜ]/.test(raw)
    && /^[A-ZÇĞİÖŞÜ0-9./+-]+$/.test(raw);
}

function getTurkishNounPhraseVariants(raw = '') {
  const source = String(raw || '').replace(/\s+/g, ' ').trim();
  if (!source) return [];
  const variants = new Set();
  const add = (value) => {
    const cleaned = String(value || '').replace(/\s+/g, ' ').trim();
    if (cleaned && cleaned !== source) variants.add(cleaned);
  };

  // Common Turkish possessive phrase variants found in real case text:
  // "Sivri T dalgası" -> "Sivri T dalgaları", "QRS genişlemesi" -> "QRS genişleme".
  const replacements = [
    [/sı$/iu, 'ları'], [/si$/iu, 'leri'], [/su$/iu, 'ları'], [/sü$/iu, 'leri'],
    [/ı$/iu, 'ı'], [/i$/iu, 'i'], [/u$/iu, 'u'], [/ü$/iu, 'ü'],
  ];

  if (/\s/.test(source)) {
    if (/[aı]sı$/iu.test(source)) add(source.replace(/sı$/iu, 'ları'));
    if (/[ei]si$/iu.test(source)) add(source.replace(/si$/iu, 'leri'));
    if (/[ou]su$/iu.test(source)) add(source.replace(/su$/iu, 'ları'));
    if (/[öü]sü$/iu.test(source)) add(source.replace(/sü$/iu, 'leri'));
    if (/mesi$/iu.test(source)) add(source.replace(/mesi$/iu, 'me'));
    if (/ması$/iu.test(source)) add(source.replace(/ması$/iu, 'ma'));
    if (/ı$/iu.test(source)) add(source.replace(/ı$/iu, ''));
    if (/i$/iu.test(source)) add(source.replace(/i$/iu, ''));
    if (/u$/iu.test(source)) add(source.replace(/u$/iu, ''));
    if (/ü$/iu.test(source)) add(source.replace(/ü$/iu, ''));
  }

  return Array.from(variants);
}

export function getGlossaryAliasVariants(alias = '') {
  const raw = String(alias || '').replace(/\s+/g, ' ').trim();
  if (!raw) return [];

  if (isShortCaseSensitiveMedicalToken(raw)) {
    return Array.from(new Set([raw, raw.replace(/\./g, '')].filter(Boolean)));
  }

  const variants = [raw, ...getTurkishNounPhraseVariants(raw)];
  const folded = variants.map((item) => normalizeGlossaryText(item)).filter(Boolean);
  return Array.from(new Set([...variants, ...folded].filter(Boolean)));
}

export const globalGlossaryTerms = [
  {
    "term": "EKG",
    "aliases": [
      "elektrokardiyografi",
      "12 derivasyon EKG",
      "EKG"
    ],
    "definition": "Kalbin elektriksel aktivitesini kaydeden testtir; ritim, iletim ve iskemi bulgularını değerlendirmede kullanılır.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cardiovascular-coagulative-necrosis-mi-001",
      "cardiovascular-electrical-injury-arrhythmia-001",
      "cv-anterior-stemi-001",
      "cv-hocm-001",
      "cv-tamponade-001",
      "im-acute-pancreatitis-001",
      "internal-medicine-familial-hypercholesterolemia-001",
      "pulmonology-lightning-apnea-001",
      "pulmonology-pulmonary-embolism-dvt-001"
    ]
  },
  {
    "term": "retrosternal",
    "aliases": [
      "retrosternal"
    ],
    "definition": "Göğüs kemiği arkasında hissedilen yerleşimi ifade eder; göğüs ağrısı tarifinde sık kullanılır.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": [
      "cv-anterior-stemi-001"
    ]
  },
  {
    "term": "göğüs ağrısı",
    "aliases": [
      "retrosternal baskı",
      "göğüs ağrısı"
    ],
    "definition": "Kalp, akciğer, özofagus, kas-iskelet sistemi veya damar kaynaklı olabilen önemli bir başvuru yakınmasıdır.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "infectious-diseases",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cardiovascular-coagulative-necrosis-mi-001",
      "cv-anterior-stemi-001",
      "cv-aortic-dissection-001",
      "inf-endocarditis-001",
      "pulm-pe-001",
      "pulm-pneumothorax-001",
      "pulmonology-pulmonary-embolism-dvt-001"
    ]
  },
  {
    "term": "hipertansiyon",
    "aliases": [
      "yüksek tansiyon",
      "hipertansiyon"
    ],
    "definition": "Arteriyel kan basıncının kronik olarak yüksek seyretmesidir; kardiyovasküler ve renal riskleri artırır.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine",
      "orthopedics"
    ],
    "relatedCaseIds": [
      "cv-anterior-stemi-001",
      "cv-aortic-dissection-001",
      "im-variceal-bleeding-001",
      "internal-medicine-systemic-lupus-erythematosus-001",
      "ortho-femoral-neck-001"
    ]
  },
  {
    "term": "dislipidemi",
    "aliases": [
      "hiperlipidemi",
      "dislipidemi"
    ],
    "definition": "Kan lipid düzeylerinde bozulmadır; ateroskleroz ve kardiyovasküler risk açısından önemlidir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "cv-anterior-stemi-001",
      "internal-medicine-familial-hypercholesterolemia-001"
    ]
  },
  {
    "term": "derivasyon",
    "aliases": [
      "derivasyonlarında",
      "derivasyon"
    ],
    "definition": "EKG’de kalbin elektriksel aktivitesine farklı açılardan bakan kayıt düzlemlerini ifade eder.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "cardiovascular-coagulative-necrosis-mi-001",
      "cardiovascular-electrical-injury-arrhythmia-001",
      "cv-anterior-stemi-001",
      "cv-hocm-001",
      "cv-tamponade-001",
      "internal-medicine-familial-hypercholesterolemia-001"
    ]
  },
  {
    "term": "intravenöz",
    "aliases": [
      "intravenöz",
      "IV"
    ],
    "definition": "Damar içi uygulamayı ifade eder; acil tedavi ve sıvı/ilaç verilmesinde sık kullanılır.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "general-surgery",
      "infectious-diseases",
      "internal-medicine",
      "neurology",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "cv-aortic-dissection-001",
      "cv-pulmonary-edema-001",
      "im-acute-pancreatitis-001",
      "im-dka-001",
      "im-iron-deficiency-anemia-001",
      "inf-endocarditis-001",
      "inf-malaria-001",
      "neuro-mca-stroke-001",
      "neuro-ms-001",
      "ped-epiglottitis-001",
      "surg-diverticulitis-001",
      "surg-sbo-001"
    ]
  },
  {
    "term": "vital bulgular",
    "aliases": [
      "vital stabilizasyon",
      "vital bulgular"
    ],
    "definition": "Kan basıncı, nabız, solunum, oksijen satürasyonu ve ateş gibi temel klinik ölçümlerdir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [],
    "relatedCaseIds": []
  },
  {
    "term": "oksijenizasyon",
    "aliases": [
      "oksijenizasyon",
      "oksijenlenme"
    ],
    "definition": "Kanın oksijen taşıma ve dokulara oksijen ulaştırma durumunu ifade eder.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cv-pulmonary-edema-001",
      "cv-tamponade-001",
      "pulmonology-near-hanging-asphyxia-001"
    ]
  },
  {
    "term": "BT",
    "aliases": [
      "bilgisayarlı tomografi",
      "BT"
    ],
    "definition": "Kesitsel görüntüleme sağlayan radyolojik yöntemdir; akut kanama, travma ve birçok acil tabloda kullanılır.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "general-surgery",
      "infectious-diseases",
      "internal-medicine",
      "neurology",
      "pediatrics",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cv-aortic-dissection-001",
      "cv-pulmonary-edema-001",
      "im-acute-pancreatitis-001",
      "inf-endocarditis-001",
      "infectious-diseases-caseating-granuloma-tb-001",
      "neuro-cvst-001",
      "neuro-mca-stroke-001",
      "neuro-sah-001",
      "neurology-liquefactive-necrosis-brain-001",
      "pediatrics-shaken-baby-syndrome-001",
      "pulm-ipf-uip-001",
      "pulm-pe-001",
      "pulm-pneumothorax-001",
      "pulmonology-near-hanging-asphyxia-001",
      "pulmonology-pulmonary-embolism-dvt-001",
      "surg-appendicitis-001",
      "surg-diverticulitis-001",
      "surg-pneumoperitoneum-001",
      "surg-sbo-001"
    ]
  },
  {
    "term": "MR",
    "aliases": [
      "manyetik rezonans",
      "MR"
    ],
    "definition": "Manyetik alan kullanarak yüksek yumuşak doku çözünürlüğü sağlayan görüntüleme yöntemidir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "neurology",
      "orthopedics",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "internal-medicine-hemochromatosis-001",
      "neuro-cvst-001",
      "neuro-ms-001",
      "neurology-liquefactive-necrosis-brain-001",
      "ortho-scaphoid-001",
      "pediatrics-shaken-baby-syndrome-001"
    ]
  },
  {
    "term": "USG",
    "aliases": [
      "ultrasonografi",
      "USG"
    ],
    "definition": "Ses dalgalarıyla yapılan görüntüleme yöntemidir; batın, üriner sistem, damar ve obstetrik değerlendirmelerde sık kullanılır.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "general-surgery",
      "internal-medicine",
      "pediatrics",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "im-acute-pancreatitis-001",
      "internal-medicine-rheumatoid-arthritis-001",
      "ped-intussusception-001",
      "ped-pyloric-stenosis-001",
      "pediatrics-homocystinuria-001",
      "pulm-pe-001",
      "surg-cholecystitis-001"
    ]
  },
  {
    "term": "hemodinami",
    "aliases": [
      "hemodinamik stabilite",
      "hemodinamik durum",
      "hemodinamik",
      "hemodinami"
    ],
    "definition": "Dolaşımın kan basıncı, nabız, perfüzyon ve organ kanlanması açısından değerlendirilmesini ifade eder.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cardiovascular-coagulative-necrosis-mi-001",
      "cardiovascular-electrical-injury-arrhythmia-001",
      "cv-tamponade-001",
      "im-variceal-bleeding-001",
      "internal-medicine-sexual-assault-evidence-001",
      "pulm-pe-001",
      "pulm-pneumothorax-001",
      "pulmonology-pulmonary-embolism-dvt-001"
    ]
  },
  {
    "term": "hipotansiyon",
    "aliases": [
      "hipotansiyon",
      "hipotansif"
    ],
    "definition": "Kan basıncının doku perfüzyonunu bozabilecek düzeyde düşük olmasıdır.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "infectious-diseases",
      "internal-medicine",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cv-tamponade-001",
      "im-variceal-bleeding-001",
      "inf-meningococcemia-001",
      "infectious-diseases-septic-shock-001",
      "internal-medicine-azathioprine-tpmt-toxicity-001",
      "internal-medicine-sexual-assault-evidence-001",
      "pulm-pe-001",
      "pulm-pneumothorax-001"
    ]
  },
  {
    "term": "taşikardi",
    "aliases": [
      "nabız hızlı",
      "taşikardik",
      "taşikardi"
    ],
    "definition": "Kalp hızının beklenen aralığın üzerinde olmasıdır; ağrı, ateş, hipovolemi, hipoksemi veya aritmiyle ilişkili olabilir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "infectious-diseases",
      "internal-medicine",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cardiovascular-electrical-injury-arrhythmia-001",
      "im-dka-001",
      "im-iron-deficiency-anemia-001",
      "im-variceal-bleeding-001",
      "inf-meningococcemia-001",
      "infectious-diseases-septic-shock-001",
      "pulm-pe-001",
      "pulmonology-pulmonary-embolism-dvt-001"
    ]
  },
  {
    "term": "bradikardi",
    "aliases": [
      "bradikardik",
      "bradikardi"
    ],
    "definition": "Kalp hızının beklenen aralığın altında olmasıdır; klinik etkisi hemodinamik durumla birlikte değerlendirilir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "pulmonology"
    ],
    "relatedCaseIds": [
      "pulmonology-lightning-apnea-001"
    ]
  },
  {
    "term": "hipoksemi",
    "aliases": [
      "oksijen satürasyonu düşük",
      "oksijenizasyon sınırda",
      "hipoksemi"
    ],
    "definition": "Arteriyel oksijenlenmenin azalmasıdır; solunum ve dolaşım değerlendirmesinde önemlidir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "pediatrics",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cv-anterior-stemi-001",
      "cv-pulmonary-edema-001",
      "ped-epiglottitis-001",
      "pulmonology-lightning-apnea-001",
      "pulmonology-near-hanging-asphyxia-001",
      "pulmonology-pulmonary-embolism-dvt-001"
    ]
  },
  {
    "term": "hipovolemi",
    "aliases": [
      "hipovolemik",
      "hipovolemi",
      "sıvı kaybı"
    ],
    "definition": "Dolaşımdaki etkili sıvı hacminin azalmasıdır; hipotansiyon ve organ perfüzyon bozukluğu ile ilişkili olabilir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases",
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-variceal-bleeding-001",
      "infectious-diseases-septic-shock-001",
      "internal-medicine-acute-radiation-syndrome-001"
    ]
  },
  {
    "term": "perfüzyon",
    "aliases": [
      "organ perfüzyonu",
      "doku perfüzyonu",
      "perfüzyon"
    ],
    "definition": "Dokulara yeterli kan akımının sağlanmasıdır. Şok ve organ yetmezliği değerlendirmesinde temel kavramdır.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cv-hocm-001",
      "im-acute-pancreatitis-001",
      "internal-medicine-sexual-assault-evidence-001",
      "pulmonology-lightning-apnea-001"
    ]
  },
  {
    "term": "stabilizasyon",
    "aliases": [
      "stabilizasyon",
      "stabilize",
      "stabilite"
    ],
    "definition": "Hastanın yaşamı tehdit eden solunum, dolaşım veya bilinç sorunlarının güvenli düzeye getirilmesidir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "infectious-diseases",
      "internal-medicine",
      "neurology",
      "pediatrics",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cv-tamponade-001",
      "im-variceal-bleeding-001",
      "infectious-diseases-caseating-granuloma-tb-001",
      "infectious-diseases-hiv-aids-001",
      "infectious-diseases-septic-shock-001",
      "internal-medicine-alkaptonuria-001",
      "internal-medicine-familial-hypercholesterolemia-001",
      "internal-medicine-hemochromatosis-001",
      "internal-medicine-pellagra-001",
      "internal-medicine-rheumatoid-arthritis-001",
      "internal-medicine-scurvy-001",
      "internal-medicine-sexual-assault-evidence-001",
      "internal-medicine-sjogren-syndrome-001",
      "internal-medicine-systemic-lupus-erythematosus-001",
      "internal-medicine-tangier-disease-001",
      "neurology-liquefactive-necrosis-brain-001",
      "ped-pyloric-stenosis-001",
      "pediatrics-albinism-001",
      "pediatrics-bruton-agammaglobulinemia-001",
      "pediatrics-classic-galactosemia-001",
      "pediatrics-hereditary-fructose-intolerance-001",
      "pediatrics-homocystinuria-001",
      "pediatrics-maple-syrup-urine-disease-001",
      "pediatrics-phenylketonuria-001",
      "pediatrics-shaken-baby-syndrome-001",
      "pediatrics-von-gierke-gsd-001",
      "pulmonology-pulmonary-embolism-dvt-001"
    ]
  },
  {
    "term": "ABC",
    "aliases": [
      "ABC"
    ],
    "definition": "Airway, Breathing, Circulation basamaklarıdır; acil değerlendirmede havayolu, solunum ve dolaşım önceliklerini ifade eder.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cardiovascular-electrical-injury-arrhythmia-001",
      "internal-medicine-acute-radiation-syndrome-001",
      "internal-medicine-sexual-assault-evidence-001",
      "pulmonology-lightning-apnea-001",
      "pulmonology-near-hanging-asphyxia-001"
    ]
  },
  {
    "term": "senkop",
    "aliases": [
      "bayılma",
      "senkop"
    ],
    "definition": "Beyin kan akımının kısa süreli azalmasına bağlı geçici bilinç kaybıdır.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": [
      "cv-aortic-dissection-001",
      "cv-hocm-001"
    ]
  },
  {
    "term": "diyaforez",
    "aliases": [
      "soğuk terleme",
      "diyaforez"
    ],
    "definition": "Terleme artışıdır; ağrı, şok, hipoglisemi veya akut kardiyak olaylarda görülebilir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": [
      "cardiovascular-coagulative-necrosis-mi-001",
      "cv-anterior-stemi-001"
    ]
  },
  {
    "term": "koagülasyon",
    "aliases": [
      "koagülasyon",
      "koagülopati",
      "pıhtılaşma"
    ],
    "definition": "Kan pıhtılaşma sistemini ifade eder. Kanama riski ve işlem güvenliği açısından değerlendirilir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine",
      "neurology",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "cardiovascular-coagulative-necrosis-mi-001",
      "im-variceal-bleeding-001",
      "internal-medicine-scurvy-001",
      "neurology-liquefactive-necrosis-brain-001",
      "pediatrics-homocystinuria-001",
      "pediatrics-shaken-baby-syndrome-001"
    ]
  },
  {
    "term": "trombositopeni",
    "aliases": [
      "trombosit sayısı düşük",
      "trombosit düşük",
      "trombositopeni"
    ],
    "definition": "Trombosit sayısının azalmasıdır; kanama eğilimi ve bazı sistemik hastalıklar açısından önemlidir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases",
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "inf-malaria-001",
      "internal-medicine-azathioprine-tpmt-toxicity-001",
      "internal-medicine-scurvy-001"
    ]
  },
  {
    "term": "lökositoz",
    "aliases": [
      "lökosit yüksekliği",
      "lökositoz"
    ],
    "definition": "Lökosit sayısının artmasıdır; enfeksiyon, inflamasyon, stres yanıtı veya hematolojik hastalıklarla ilişkili olabilir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "general-surgery",
      "infectious-diseases",
      "internal-medicine",
      "neurology"
    ],
    "relatedCaseIds": [
      "im-dka-001",
      "infectious-diseases-septic-shock-001",
      "internal-medicine-scurvy-001",
      "neurology-liquefactive-necrosis-brain-001",
      "surg-appendicitis-001",
      "surg-cholecystitis-001",
      "surg-diverticulitis-001"
    ]
  },
  {
    "term": "anemi",
    "aliases": [
      "hemoglobin düşüklüğü",
      "anemi"
    ],
    "definition": "Hemoglobin düzeyinin azalmasıdır; oksijen taşıma kapasitesini ve dolaşım toleransını etkiler.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "im-iron-deficiency-anemia-001",
      "internal-medicine-alkaptonuria-001",
      "internal-medicine-azathioprine-tpmt-toxicity-001",
      "internal-medicine-familial-hypercholesterolemia-001",
      "internal-medicine-hemochromatosis-001",
      "internal-medicine-oxidative-stress-injury-001",
      "internal-medicine-pellagra-001",
      "internal-medicine-scurvy-001",
      "internal-medicine-systemic-lupus-erythematosus-001",
      "internal-medicine-tangier-disease-001",
      "pediatrics-albinism-001",
      "pediatrics-classic-galactosemia-001",
      "pediatrics-hereditary-fructose-intolerance-001",
      "pediatrics-homocystinuria-001",
      "pediatrics-maple-syrup-urine-disease-001",
      "pediatrics-phenylketonuria-001",
      "pediatrics-von-gierke-gsd-001"
    ]
  },
  {
    "term": "transfüzyon",
    "aliases": [
      "eritrosit süspansiyonu",
      "transfüzyon",
      "kan ürünü"
    ],
    "definition": "Kan veya kan ürünlerinin damar yoluyla verilmesidir; klinik durum, hemoglobin düzeyi ve kanama riskiyle planlanır.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-variceal-bleeding-001"
    ]
  },
  {
    "term": "metabolik asidoz",
    "aliases": [
      "metabolik asidoz"
    ],
    "definition": "Metabolik nedenlerle kan pH’sının asidik yöne kaymasıdır; laktat artışı, böbrek yetmezliği veya toksik/metabolik durumlarla görülebilir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "im-dka-001",
      "pediatrics-hereditary-fructose-intolerance-001",
      "pediatrics-maple-syrup-urine-disease-001",
      "pulmonology-lightning-apnea-001"
    ]
  },
  {
    "term": "anyon açıklığı",
    "aliases": [
      "anyon açıklığı",
      "anion gap"
    ],
    "definition": "Sodyum ile ölçülen ana anyonlar arasındaki farktır; metabolik asidoz tipini ayırt etmede kullanılır.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-dka-001"
    ]
  },
  {
    "term": "laktat",
    "aliases": [
      "laktat"
    ],
    "definition": "Doku hipoperfüzyonu, sepsis veya anaerobik metabolizma hakkında bilgi veren biyokimyasal göstergedir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "general-surgery",
      "infectious-diseases",
      "internal-medicine",
      "pediatrics",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "im-acute-pancreatitis-001",
      "im-dka-001",
      "infectious-diseases-septic-shock-001",
      "pediatrics-hereditary-fructose-intolerance-001",
      "pediatrics-von-gierke-gsd-001",
      "pulmonology-lightning-apnea-001",
      "pulmonology-near-hanging-asphyxia-001",
      "surg-pneumoperitoneum-001",
      "surg-sbo-001"
    ]
  },
  {
    "term": "akut böbrek hasarı",
    "aliases": [
      "böbrek fonksiyon bozukluğu",
      "akut böbrek hasarı",
      "kreatinin artışı"
    ],
    "definition": "Böbrek fonksiyonunun kısa sürede bozulmasıdır; kreatinin artışı ve idrar çıkışında azalma ile izlenebilir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [],
    "relatedCaseIds": []
  },
  {
    "term": "oligüri",
    "aliases": [
      "idrar çıkışı az",
      "oligüri"
    ],
    "definition": "İdrar miktarının azalmasıdır; hipovolemi, böbrek hasarı veya obstrüksiyon açısından önemlidir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [],
    "relatedCaseIds": []
  },
  {
    "term": "ikter",
    "aliases": [
      "sarılık",
      "ikter"
    ],
    "definition": "Bilirübin artışına bağlı deri ve skleralarda sararma görünümüdür.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "general-surgery",
      "infectious-diseases",
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "im-acute-pancreatitis-001",
      "inf-malaria-001",
      "internal-medicine-oxidative-stress-injury-001",
      "pediatrics-classic-galactosemia-001",
      "pediatrics-phenylketonuria-001",
      "surg-cholecystitis-001"
    ]
  },
  {
    "term": "kolestaz",
    "aliases": [
      "kolestatik",
      "kolestaz"
    ],
    "definition": "Safra akımının azalması veya tıkanmasıdır; direkt bilirübin, ALP ve GGT artışıyla ilişkili olabilir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [],
    "relatedCaseIds": []
  },
  {
    "term": "asit",
    "aliases": [
      "asit sıvısı",
      "asit"
    ],
    "definition": "Periton boşluğunda sıvı birikimidir; siroz, malignite veya enfeksiyon gibi nedenlerle görülebilir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases",
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "im-variceal-bleeding-001",
      "inf-tuberculosis-001",
      "internal-medicine-alkaptonuria-001",
      "internal-medicine-hemochromatosis-001",
      "internal-medicine-scurvy-001",
      "internal-medicine-tangier-disease-001",
      "pediatrics-hereditary-fructose-intolerance-001",
      "pediatrics-maple-syrup-urine-disease-001",
      "pediatrics-von-gierke-gsd-001"
    ]
  },
  {
    "term": "ateş",
    "aliases": [
      "febril",
      "ateş"
    ],
    "definition": "Vücut sıcaklığının artmasıdır; enfeksiyon ve inflamatuvar süreçlerde önemli bir bulgudur.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "general-surgery",
      "infectious-diseases",
      "internal-medicine",
      "neurology",
      "pediatrics",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cv-pulmonary-edema-001",
      "cv-tamponade-001",
      "inf-endocarditis-001",
      "inf-malaria-001",
      "inf-meningococcemia-001",
      "inf-tuberculosis-001",
      "infectious-diseases-hiv-aids-001",
      "infectious-diseases-septic-shock-001",
      "internal-medicine-azathioprine-tpmt-toxicity-001",
      "neuro-sah-001",
      "neurology-liquefactive-necrosis-brain-001",
      "ped-epiglottitis-001",
      "ped-kawasaki-001",
      "pediatrics-hereditary-fructose-intolerance-001",
      "pulm-pneumonia-001",
      "pulm-pneumothorax-001",
      "pulmonology-near-hanging-asphyxia-001",
      "surg-appendicitis-001",
      "surg-cholecystitis-001",
      "surg-diverticulitis-001",
      "surg-sbo-001"
    ]
  },
  {
    "term": "ampirik antibiyotik",
    "aliases": [
      "ampirik antibiyotik",
      "ampirik tedavi"
    ],
    "definition": "Etken kesinleşmeden, olası mikroorganizmalara yönelik başlanan antibiyotik tedavisidir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "internal-medicine-azathioprine-tpmt-toxicity-001",
      "pulm-pneumonia-001"
    ]
  },
  {
    "term": "antibiyogram",
    "aliases": [
      "duyarlılık sonucu",
      "kültür/duyarlılık",
      "antibiyogram"
    ],
    "definition": "Mikroorganizmanın hangi antibiyotiklere duyarlı veya dirençli olduğunu gösteren testtir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedCaseIds": [
      "infectious-diseases-caseating-granuloma-tb-001"
    ]
  },
  {
    "term": "sepsis",
    "aliases": [
      "sepsis",
      "septik"
    ],
    "definition": "Enfeksiyona düzensiz konak yanıtı sonucu organ fonksiyon bozukluğu gelişmesidir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "infectious-diseases",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "cv-aortic-dissection-001",
      "cv-tamponade-001",
      "inf-endocarditis-001",
      "inf-meningococcemia-001",
      "infectious-diseases-septic-shock-001",
      "pediatrics-classic-galactosemia-001"
    ]
  },
  {
    "term": "septik şok",
    "aliases": [
      "septic shock",
      "septik şok"
    ],
    "definition": "Sepsise bağlı dolaşım ve hücresel metabolizma bozukluğunun ağır formudur; hızlı stabilizasyon ve kaynak tedavisi gerektirir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "infectious-diseases"
    ],
    "relatedCaseIds": [
      "cv-tamponade-001",
      "infectious-diseases-septic-shock-001"
    ]
  },
  {
    "term": "hipoglisemi",
    "aliases": [
      "kan glukozu düşük",
      "hypoglycemia",
      "hipoglisemi"
    ],
    "definition": "Kan glukozunun düşmesidir; bilinç değişikliği ve nörolojik bulguları taklit edebilir.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "neurology",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "im-dka-001",
      "internal-medicine-alkaptonuria-001",
      "internal-medicine-familial-hypercholesterolemia-001",
      "internal-medicine-hemochromatosis-001",
      "internal-medicine-pellagra-001",
      "internal-medicine-scurvy-001",
      "internal-medicine-tangier-disease-001",
      "neuro-mca-stroke-001",
      "pediatrics-albinism-001",
      "pediatrics-classic-galactosemia-001",
      "pediatrics-hereditary-fructose-intolerance-001",
      "pediatrics-homocystinuria-001",
      "pediatrics-maple-syrup-urine-disease-001",
      "pediatrics-phenylketonuria-001",
      "pediatrics-von-gierke-gsd-001"
    ]
  },
  {
    "term": "kontrendikasyon",
    "aliases": [
      "kontrendikasyonlar",
      "kontrendikasyon"
    ],
    "definition": "Bir tedavi veya işlemin uygulanmasını sakıncalı kılan klinik durumdur.",
    "category": "Genel",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology"
    ],
    "relatedCaseIds": [
      "neuro-cvst-001",
      "neuro-mca-stroke-001"
    ]
  },
  {
    "term": "troponin",
    "aliases": [
      "kardiyak troponin",
      "Troponin I",
      "troponin"
    ],
    "definition": "Miyokart hücre hasarını gösteren kardiyak biyobelirteçtir; akut koroner sendrom değerlendirmesinde kullanılır.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cardiovascular-coagulative-necrosis-mi-001",
      "cardiovascular-electrical-injury-arrhythmia-001",
      "cv-anterior-stemi-001",
      "cv-aortic-dissection-001",
      "cv-pulmonary-edema-001",
      "cv-tamponade-001",
      "im-acute-pancreatitis-001",
      "im-dka-001",
      "pulm-pe-001",
      "pulmonology-lightning-apnea-001"
    ]
  },
  {
    "term": "ST elevasyonu",
    "aliases": [
      "ST segment elevasyonu",
      "ST elevasyonu",
      "ST yükselmesi"
    ],
    "definition": "EKG’de ST segmentinin izoelektrik hatta göre yükselmesidir; ilgili derivasyon paternine göre akut miyokart iskemisini düşündürebilir.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cardiovascular-coagulative-necrosis-mi-001",
      "cardiovascular-electrical-injury-arrhythmia-001",
      "cv-anterior-stemi-001",
      "internal-medicine-familial-hypercholesterolemia-001",
      "pulmonology-lightning-apnea-001"
    ]
  },
  {
    "term": "resiprokal ST depresyonu",
    "aliases": [
      "resiprokal ST depresyonu",
      "karşılıklı ST depresyonu",
      "resiprokal değişiklik"
    ],
    "definition": "ST elevasyonuna karşılık bazı karşı derivasyonlarda ST çökmesi görülmesidir; akut koroner oklüzyon lehine güçlü bir ipucudur.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": [
      "cardiovascular-coagulative-necrosis-mi-001",
      "cv-anterior-stemi-001"
    ]
  },
  {
    "term": "reperfüzyon",
    "aliases": [
      "koroner reperfüzyon",
      "reperfüzyon"
    ],
    "definition": "Tıkanmış damar akımının yeniden sağlanmasıdır. STEMI ve akut iskemik inmede zaman kritik bir hedeftir.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "neurology",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cardiovascular-coagulative-necrosis-mi-001",
      "cv-anterior-stemi-001",
      "neuro-mca-stroke-001",
      "pulm-pe-001"
    ]
  },
  {
    "term": "fibrinoliz",
    "aliases": [
      "fibrinolitik tedavi",
      "fibrinoliz"
    ],
    "definition": "Pıhtının ilaçla çözülmesini hedefleyen reperfüzyon tedavisidir; zaman penceresi ve kontrendikasyonlar önemlidir.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "primer PCI",
    "aliases": [
      "primer perkütan koroner girişim",
      "primer PCI",
      "PCI"
    ],
    "definition": "Tıkalı koroner damarın kateter yöntemiyle açılmasını hedefleyen reperfüzyon yaklaşımıdır.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": [
      "cardiovascular-coagulative-necrosis-mi-001",
      "cv-anterior-stemi-001"
    ]
  },
  {
    "term": "antitrombotik",
    "aliases": [
      "antikoagülasyon",
      "antitrombotik",
      "antiagregan"
    ],
    "definition": "Tromboz oluşumunu veya büyümesini azaltan tedavi grubudur; kanama riskiyle birlikte değerlendirilir.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "neurology",
      "pediatrics",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cardiovascular-coagulative-necrosis-mi-001",
      "cv-anterior-stemi-001",
      "cv-aortic-dissection-001",
      "neuro-cvst-001",
      "pediatrics-homocystinuria-001",
      "pulm-pe-001",
      "pulmonology-near-hanging-asphyxia-001"
    ]
  },
  {
    "term": "üfürüm",
    "aliases": [
      "diyastolik üfürüm",
      "sistolik üfürüm",
      "üfürüm"
    ],
    "definition": "Kalp veya damar içindeki türbülan akıma bağlı duyulan ek sestir.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "infectious-diseases",
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "cardiovascular-coagulative-necrosis-mi-001",
      "cardiovascular-electrical-injury-arrhythmia-001",
      "cv-anterior-stemi-001",
      "cv-aortic-dissection-001",
      "cv-hocm-001",
      "im-dka-001",
      "inf-endocarditis-001",
      "internal-medicine-familial-hypercholesterolemia-001",
      "pediatrics-homocystinuria-001"
    ]
  },
  {
    "term": "aritmi",
    "aliases": [
      "Transtorasik elektrik akımı",
      "ritim bozukluğu",
      "Aritmi/VF riski",
      "VF riski",
      "aritmi"
    ],
    "definition": "Kalp ritminin normal düzeninden sapmasıdır; hemodinamik etkisi ritim tipi ve klinik durumla belirlenir.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cardiovascular-electrical-injury-arrhythmia-001",
      "cv-hocm-001",
      "pulmonology-lightning-apnea-001"
    ]
  },
  {
    "term": "kontrastsız beyin BT",
    "aliases": [
      "kontrastsız kraniyal BT",
      "kontrastsız beyin BT"
    ],
    "definition": "Kontrast madde verilmeden çekilen beyin tomografisidir; akut kanamayı hızlı dışlamak için kullanılır.",
    "category": "Küçük Stajlar",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology",
      "pediatrics",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "neuro-cvst-001",
      "neuro-mca-stroke-001",
      "neuro-sah-001",
      "pediatrics-shaken-baby-syndrome-001",
      "pulmonology-near-hanging-asphyxia-001"
    ]
  },
  {
    "term": "orta serebral arter",
    "aliases": [
      "orta serebral arter",
      "sol MCA",
      "MCA"
    ],
    "definition": "Beynin geniş bir lateral bölümünü besleyen ana arterlerden biridir; tıkanıklığı afazi ve hemiparezi yapabilir.",
    "category": "Küçük Stajlar",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology"
    ],
    "relatedCaseIds": [
      "neuro-mca-stroke-001"
    ]
  },
  {
    "term": "oklüzyon",
    "aliases": [
      "dolum kesintisi",
      "tıkanıklık",
      "oklüzyon"
    ],
    "definition": "Damar lümeninin tıkanmasıdır; ilgili dokuda iskemiye neden olabilir.",
    "category": "Küçük Stajlar",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "general-surgery",
      "neurology"
    ],
    "relatedCaseIds": [
      "cardiovascular-coagulative-necrosis-mi-001",
      "cv-anterior-stemi-001",
      "neuro-mca-stroke-001",
      "surg-cholecystitis-001"
    ]
  },
  {
    "term": "son sağlıklı görülme zamanı",
    "aliases": [
      "son sağlıklı görülme zamanı",
      "semptom başlangıç zamanı",
      "last known well"
    ],
    "definition": "Hastanın nörolojik olarak en son normal görüldüğü zamandır; reperfüzyon kararında kritik önemdedir.",
    "category": "Küçük Stajlar",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology"
    ],
    "relatedCaseIds": [
      "neuro-mca-stroke-001"
    ]
  },
  {
    "term": "afazi",
    "aliases": [
      "ekspresif afazi",
      "reseptif afazi",
      "afazi"
    ],
    "definition": "Dil üretimi veya anlama işlevinde bozulmadır. Dominant hemisfer tutulumu ile ilişkili olabilir.",
    "category": "Küçük Stajlar",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology"
    ],
    "relatedCaseIds": [
      "neuro-mca-stroke-001"
    ]
  },
  {
    "term": "hemiparezi",
    "aliases": [
      "yarım vücut güçsüzlüğü",
      "hemiparezi",
      "hemipleji"
    ],
    "definition": "Vücudun bir yarısında güç kaybıdır. Fokal nörolojik defisit örüntüsünün önemli bir parçasıdır.",
    "category": "Küçük Stajlar",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology"
    ],
    "relatedCaseIds": [
      "neuro-mca-stroke-001",
      "neurology-liquefactive-necrosis-brain-001"
    ]
  },
  {
    "term": "nörolojik defisit",
    "aliases": [
      "fokal nörolojik defisit",
      "nörolojik defisit",
      "fokal defisit"
    ],
    "definition": "Belirli bir sinir sistemi bölgesinin işlev kaybına bağlı gelişen güçsüzlük, duyu kaybı, konuşma bozukluğu veya görme kaybı gibi bulgulardır.",
    "category": "Küçük Stajlar",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine",
      "neurology",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "cardiovascular-coagulative-necrosis-mi-001",
      "cv-aortic-dissection-001",
      "im-dka-001",
      "im-primary-hyperparathyroidism-001",
      "internal-medicine-acute-radiation-syndrome-001",
      "internal-medicine-hemochromatosis-001",
      "internal-medicine-pellagra-001",
      "internal-medicine-scurvy-001",
      "internal-medicine-sexual-assault-evidence-001",
      "neuro-mca-stroke-001",
      "neurology-liquefactive-necrosis-brain-001",
      "pediatrics-classic-galactosemia-001",
      "pediatrics-hereditary-fructose-intolerance-001",
      "pediatrics-homocystinuria-001"
    ]
  },
  {
    "term": "iskemi",
    "aliases": [
      "serebral iskemi",
      "iskemik",
      "iskemi"
    ],
    "definition": "Dokuya giden kan akımının azalmasıdır; beyinde kalıcı hasar gelişmeden hızlı değerlendirme gerekir.",
    "category": "Küçük Stajlar",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "general-surgery",
      "internal-medicine",
      "neurology",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "cardiovascular-coagulative-necrosis-mi-001",
      "cv-anterior-stemi-001",
      "im-acute-pancreatitis-001",
      "internal-medicine-familial-hypercholesterolemia-001",
      "internal-medicine-tangier-disease-001",
      "neuro-mca-stroke-001",
      "neurology-liquefactive-necrosis-brain-001",
      "ped-intussusception-001",
      "ped-pyloric-stenosis-001",
      "surg-diverticulitis-001",
      "surg-sbo-001"
    ]
  },
  {
    "term": "intrakraniyal kanama",
    "aliases": [
      "intrakraniyal kanama",
      "kanama dışlanması",
      "beyin kanaması"
    ],
    "definition": "Kafa içi kanamadır; akut nörolojik tabloda görüntüleme ile ayırt edilmesi gerekir.",
    "category": "Küçük Stajlar",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "neuro-mca-stroke-001",
      "pulmonology-near-hanging-asphyxia-001"
    ]
  },
  {
    "term": "büyük damar oklüzyonu",
    "aliases": [
      "büyük damar oklüzyonu",
      "damar oklüzyonu",
      "MCA oklüzyonu"
    ],
    "definition": "Beyni besleyen büyük arterlerden birinin tıkanmasıdır; mekanik trombektomi kararını etkileyebilir.",
    "category": "Küçük Stajlar",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology"
    ],
    "relatedCaseIds": [
      "neuro-mca-stroke-001"
    ]
  },
  {
    "term": "tromboliz",
    "aliases": [
      "trombolitik tedavi",
      "IV tromboliz",
      "tromboliz"
    ],
    "definition": "Pıhtıyı eritmeye yönelik ilaç tedavisidir; uygun hasta ve zaman penceresinde değerlendirilir.",
    "category": "Küçük Stajlar",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "neurology",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cv-aortic-dissection-001",
      "neuro-mca-stroke-001",
      "pulm-pe-001"
    ]
  },
  {
    "term": "mekanik trombektomi",
    "aliases": [
      "mekanik trombektomi",
      "trombektomi"
    ],
    "definition": "Büyük damar tıkanıklığında pıhtının endovasküler yöntemle çıkarılmasıdır.",
    "category": "Küçük Stajlar",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology"
    ],
    "relatedCaseIds": [
      "neuro-mca-stroke-001"
    ]
  },
  {
    "term": "meningeal irritasyon",
    "aliases": [
      "meningeal irritasyon",
      "meninks irritasyonu",
      "ense sertliği"
    ],
    "definition": "Menenkslerin irritasyonunu düşündüren ense sertliği ve benzeri muayene bulgularıdır.",
    "category": "Küçük Stajlar",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases",
      "internal-medicine",
      "neurology",
      "pediatrics",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "inf-malaria-001",
      "inf-meningococcemia-001",
      "inf-tuberculosis-001",
      "infectious-diseases-hiv-aids-001",
      "internal-medicine-acute-radiation-syndrome-001",
      "neuro-cvst-001",
      "neuro-sah-001",
      "neurology-liquefactive-necrosis-brain-001",
      "pediatrics-classic-galactosemia-001",
      "pediatrics-hereditary-fructose-intolerance-001",
      "pediatrics-maple-syrup-urine-disease-001",
      "pediatrics-shaken-baby-syndrome-001",
      "pediatrics-von-gierke-gsd-001",
      "pulmonology-lightning-apnea-001",
      "pulmonology-near-hanging-asphyxia-001"
    ]
  },
  {
    "term": "pnömotoraks",
    "aliases": [
      "pnömotoraks"
    ],
    "definition": "Plevra boşluğuna hava girmesiyle akciğerin kısmen veya tamamen sönmesidir.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cardiovascular-electrical-injury-arrhythmia-001",
      "cv-aortic-dissection-001",
      "cv-tamponade-001",
      "pulm-copd-exacerbation-001",
      "pulm-pe-001",
      "pulm-pneumothorax-001",
      "pulmonology-lightning-apnea-001",
      "pulmonology-near-hanging-asphyxia-001",
      "pulmonology-pulmonary-embolism-dvt-001"
    ]
  },
  {
    "term": "raller",
    "aliases": [
      "raller",
      "ral"
    ],
    "definition": "Akciğer oskültasyonunda duyulan, sıvı veya alveoler açılma ile ilişkili ek solunum sesleridir.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "infectious-diseases",
      "pediatrics",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cardiovascular-coagulative-necrosis-mi-001",
      "cardiovascular-electrical-injury-arrhythmia-001",
      "cv-anterior-stemi-001",
      "cv-hocm-001",
      "cv-pulmonary-edema-001",
      "cv-tamponade-001",
      "inf-endocarditis-001",
      "inf-tuberculosis-001",
      "infectious-diseases-caseating-granuloma-tb-001",
      "infectious-diseases-hiv-aids-001",
      "pediatrics-bruton-agammaglobulinemia-001",
      "pulm-ipf-uip-001",
      "pulm-pe-001",
      "pulm-pneumonia-001",
      "pulmonology-lightning-apnea-001"
    ]
  },
  {
    "term": "dispne",
    "aliases": [
      "nefes darlığı",
      "dispne"
    ],
    "definition": "Hastanın solunumda zorlanma veya hava açlığı hissetmesidir.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "infectious-diseases",
      "internal-medicine",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cv-anterior-stemi-001",
      "cv-hocm-001",
      "cv-pulmonary-edema-001",
      "cv-tamponade-001",
      "im-iron-deficiency-anemia-001",
      "inf-endocarditis-001",
      "pulm-copd-exacerbation-001",
      "pulm-ipf-uip-001",
      "pulm-pe-001",
      "pulm-pneumothorax-001",
      "pulmonology-near-hanging-asphyxia-001",
      "pulmonology-pulmonary-embolism-dvt-001"
    ]
  },
  {
    "term": "konsolidasyon",
    "aliases": [
      "pnömonik infiltrasyon",
      "konsolidasyon"
    ],
    "definition": "Akciğer dokusunda hava yerine sıvı, hücre veya eksüda birikimiyle oluşan yoğunlaşma görünümüdür.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cv-pulmonary-edema-001",
      "pulm-copd-exacerbation-001",
      "pulm-pneumonia-001",
      "pulmonology-pulmonary-embolism-dvt-001"
    ]
  },
  {
    "term": "ventilasyon-perfüzyon",
    "aliases": [
      "ventilasyon-perfüzyon",
      "V/Q"
    ],
    "definition": "Akciğerde hava dağılımı ile kan akımının uyumunu ifade eder; emboli ve gaz değişimi bozukluklarında önemlidir.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [],
    "relatedCaseIds": []
  },
  {
    "term": "plevral efüzyon",
    "aliases": [
      "plevral efüzyon",
      "efüzyon"
    ],
    "definition": "Plevra boşluğunda sıvı birikimidir; enfeksiyon, kalp yetmezliği veya malignite ile ilişkili olabilir.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cv-aortic-dissection-001",
      "cv-pulmonary-edema-001",
      "cv-tamponade-001",
      "pulm-pneumothorax-001"
    ]
  },
  {
    "term": "prokalsitonin",
    "aliases": [
      "prokalsitonin",
      "PCT"
    ],
    "definition": "Bakteriyel enfeksiyon ve sepsis değerlendirmesinde yardımcı olabilen biyobelirteçtir.",
    "category": "Tıbbi Mikrobiyoloji",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedCaseIds": [
      "infectious-diseases-septic-shock-001"
    ]
  },
  {
    "term": "kültür",
    "aliases": [
      "balgam kültürü",
      "idrar kültürü",
      "BOS kültürü",
      "kültür"
    ],
    "definition": "Mikroorganizmayı üretip tanımlamak için yapılan mikrobiyolojik incelemedir.",
    "category": "Tıbbi Mikrobiyoloji",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases",
      "internal-medicine",
      "neurology",
      "pediatrics",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "inf-meningococcemia-001",
      "inf-tuberculosis-001",
      "infectious-diseases-caseating-granuloma-tb-001",
      "infectious-diseases-septic-shock-001",
      "internal-medicine-azathioprine-tpmt-toxicity-001",
      "neurology-liquefactive-necrosis-brain-001",
      "ped-kawasaki-001",
      "pulm-pneumonia-001"
    ]
  },
  {
    "term": "kan kültürü",
    "aliases": [
      "kan kültürü"
    ],
    "definition": "Kandaki mikroorganizmayı saptamak için alınan kültür örneğidir; antibiyotik seçimini yönlendirebilir.",
    "category": "Tıbbi Mikrobiyoloji",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases",
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "inf-endocarditis-001",
      "inf-meningococcemia-001",
      "infectious-diseases-septic-shock-001",
      "internal-medicine-azathioprine-tpmt-toxicity-001",
      "ped-epiglottitis-001"
    ]
  },
  {
    "term": "kaynak kontrolü",
    "aliases": [
      "kaynak kontrolü"
    ],
    "definition": "Enfeksiyon odağının drenaj, cerrahi veya girişimsel yöntemlerle kontrol altına alınmasıdır.",
    "category": "Tıbbi Mikrobiyoloji",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "melena",
    "aliases": [
      "siyah dışkı",
      "melena"
    ],
    "definition": "Üst gastrointestinal sistem kanamasını düşündüren siyah, katran kıvamında dışkıdır.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-variceal-bleeding-001"
    ]
  },
  {
    "term": "hematemez",
    "aliases": [
      "kanlı kusma",
      "hematemez"
    ],
    "definition": "Kan kusmadır; üst gastrointestinal kanama açısından önemli bir bulgudur.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-variceal-bleeding-001"
    ]
  },
  {
    "term": "portal hipertansiyon",
    "aliases": [
      "portal hipertansiyon"
    ],
    "definition": "Portal venöz sistem basıncının artmasıdır; varis kanaması ve asit gibi komplikasyonlara yol açabilir.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-variceal-bleeding-001"
    ]
  },
  {
    "term": "varis",
    "aliases": [
      "özofagus varisi",
      "varis kanaması",
      "varis"
    ],
    "definition": "Portal hipertansiyona bağlı gelişebilen genişlemiş venöz yapılardır; kanama riski taşıyabilir.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-variceal-bleeding-001"
    ]
  },
  {
    "term": "hipertiroidi",
    "aliases": [
      "hipertiroidi",
      "tirotoksikoz"
    ],
    "definition": "Tiroid hormon etkisinin artmasıdır; taşikardi, kilo kaybı, tremor ve ısı intoleransı yapabilir.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [],
    "relatedCaseIds": []
  },
  {
    "term": "adrenal yetmezlik",
    "aliases": [
      "adrenal yetmezlik",
      "Addison"
    ],
    "definition": "Kortizol üretiminin yetersizliğidir; hipotansiyon, hiponatremi ve hiperkalemiyle ilişkili olabilir.",
    "category": "İç Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [],
    "relatedCaseIds": []
  },
  {
    "term": "peritonit",
    "aliases": [
      "peritonit",
      "rebound",
      "defans"
    ],
    "definition": "Periton irritasyonunu gösteren klinik tablodur; akut batında cerrahi aciliyet açısından önemlidir.",
    "category": "Genel Cerrahi",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "general-surgery",
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "im-acute-pancreatitis-001",
      "im-dka-001",
      "internal-medicine-acute-radiation-syndrome-001",
      "internal-medicine-azathioprine-tpmt-toxicity-001",
      "internal-medicine-pellagra-001",
      "internal-medicine-sexual-assault-evidence-001",
      "ped-intussusception-001",
      "pediatrics-hereditary-fructose-intolerance-001",
      "surg-appendicitis-001",
      "surg-cholecystitis-001",
      "surg-diverticulitis-001",
      "surg-pneumoperitoneum-001",
      "surg-sbo-001"
    ]
  },
  {
    "term": "ileus",
    "aliases": [
      "bağırsak tıkanıklığı",
      "obstrüksiyon",
      "ileus"
    ],
    "definition": "Bağırsak geçişinin mekanik veya fonksiyonel olarak bozulmasıdır.",
    "category": "Genel Cerrahi",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "general-surgery",
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "cv-hocm-001",
      "im-acute-pancreatitis-001",
      "ped-epiglottitis-001",
      "ped-pyloric-stenosis-001",
      "surg-sbo-001"
    ]
  },
  {
    "term": "perforasyon",
    "aliases": [
      "perforasyon",
      "delinme"
    ],
    "definition": "İçi boş organ duvar bütünlüğünün bozulmasıdır; serbest hava ve peritonit bulgularıyla ilişkili olabilir.",
    "category": "Genel Cerrahi",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "general-surgery",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "ped-intussusception-001",
      "surg-diverticulitis-001",
      "surg-pneumoperitoneum-001"
    ]
  },
  {
    "term": "endoskopik hemostaz",
    "aliases": [
      "endoskopik hemostaz",
      "hemostaz"
    ],
    "definition": "Endoskopi sırasında kanama odağının durdurulmasına yönelik işlemdir.",
    "category": "Genel Cerrahi",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "general-surgery"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "dehidratasyon",
    "aliases": [
      "dehidratasyon",
      "susuzluk"
    ],
    "definition": "Vücuttaki sıvı kaybının artmasıdır; çocuklarda hızlı klinik bozulmaya neden olabilir.",
    "category": "Çocuk Sağlığı ve Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "general-surgery",
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "im-primary-hyperparathyroidism-001",
      "internal-medicine-acute-radiation-syndrome-001",
      "internal-medicine-sjogren-syndrome-001",
      "ped-pyloric-stenosis-001",
      "pediatrics-hereditary-fructose-intolerance-001",
      "pediatrics-maple-syrup-urine-disease-001",
      "surg-diverticulitis-001"
    ]
  },
  {
    "term": "fontanel",
    "aliases": [
      "bıngıldak",
      "fontanel"
    ],
    "definition": "Bebeklerde kafatası kemikleri arasındaki yumuşak açıklıklardır; hidrasyon ve kafa içi basınç değerlendirmesinde bilgi verebilir.",
    "category": "Çocuk Sağlığı ve Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": [
      "ped-pyloric-stenosis-001",
      "pediatrics-maple-syrup-urine-disease-001",
      "pediatrics-shaken-baby-syndrome-001"
    ]
  },
  {
    "term": "siyanoz",
    "aliases": [
      "siyanoz",
      "morarma"
    ],
    "definition": "Oksijenlenme azalmasına bağlı deri veya mukozalarda morarma görünümüdür.",
    "category": "Çocuk Sağlığı ve Hastalıkları",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine",
      "pediatrics",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cv-anterior-stemi-001",
      "cv-aortic-dissection-001",
      "cv-hocm-001",
      "cv-pulmonary-edema-001",
      "cv-tamponade-001",
      "internal-medicine-azathioprine-tpmt-toxicity-001",
      "internal-medicine-scurvy-001",
      "pulm-copd-exacerbation-001",
      "pulm-pneumothorax-001",
      "pulmonology-lightning-apnea-001",
      "pulmonology-near-hanging-asphyxia-001"
    ]
  },
  {
    "term": "hematuri",
    "aliases": [
      "kanlı idrar",
      "hematuri"
    ],
    "definition": "İdrarda eritrosit bulunmasıdır; taş, enfeksiyon, tümör veya glomerüler hastalıklarla ilişkili olabilir.",
    "category": "urogenital",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-systemic-lupus-erythematosus-001"
    ]
  },
  {
    "term": "piyüri",
    "aliases": [
      "lökositüri",
      "piyüri"
    ],
    "definition": "İdrarda lökosit bulunmasıdır; üriner sistem enfeksiyonu veya inflamasyonla ilişkili olabilir.",
    "category": "urogenital",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [],
    "relatedCaseIds": []
  },
  {
    "term": "hidronefroz",
    "aliases": [
      "hidronefroz"
    ],
    "definition": "İdrar akımındaki engel nedeniyle böbrek toplayıcı sisteminin genişlemesidir.",
    "category": "urogenital",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [],
    "relatedCaseIds": []
  },
  {
    "term": "redüksiyon",
    "aliases": [
      "redüksiyon"
    ],
    "definition": "Çıkık veya kırık parçalarının anatomik pozisyona getirilmesidir.",
    "category": "Küçük Stajlar",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "orthopedics",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "ortho-colles-001",
      "ortho-shoulder-dislocation-001",
      "ped-intussusception-001"
    ]
  },
  {
    "term": "nörovasküler değerlendirme",
    "aliases": [
      "nörovasküler değerlendirme",
      "duyu-motor muayene",
      "distal nabız"
    ],
    "definition": "Travma sonrası damar ve sinir bütünlüğünü değerlendiren muayenedir.",
    "category": "Küçük Stajlar",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "orthopedics"
    ],
    "relatedCaseIds": [
      "ortho-colles-001"
    ]
  },
  {
    "term": "deplasman",
    "aliases": [
      "deplasman",
      "deplase"
    ],
    "definition": "Kırık parçalarının normal anatomik yerinden kaymasıdır.",
    "category": "Küçük Stajlar",
    "priority": "Kullanımda",
    "mode": teachingOnly,
    "relatedBranches": [
      "orthopedics"
    ],
    "relatedCaseIds": [
      "ortho-colles-001",
      "ortho-femoral-neck-001",
      "ortho-scaphoid-001"
    ]
  },
  {
    "term": "Akut koroner sendrom",
    "aliases": [
      "Akut koroner sendrom"
    ],
    "definition": "Göğüs ağrısı, EKG ve biyobelirteçlerle değerlendirilen miyokart iskemisi spektrumudur.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cv-anterior-stemi-001",
      "im-dka-001",
      "internal-medicine-familial-hypercholesterolemia-001",
      "pulm-pe-001"
    ]
  },
  {
    "term": "STEMI",
    "aliases": [
      "STEMI"
    ],
    "definition": "ST elevasyonlu miyokart enfarktüsünü ifade eder; akut koroner oklüzyon ve reperfüzyon gereksinimi açısından kritik tanıdır.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": [
      "cardiovascular-coagulative-necrosis-mi-001",
      "cv-anterior-stemi-001",
      "cv-aortic-dissection-001"
    ]
  },
  {
    "term": "NSTEMI",
    "aliases": [
      "NSTEMI"
    ],
    "definition": "ST elevasyonu olmadan miyokart hasarı biyobelirteç yüksekliğiyle seyreden akut koroner sendrom tipidir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": [
      "cv-anterior-stemi-001"
    ]
  },
  {
    "term": "ST segment elevasyonu",
    "aliases": [
      "ST segment elevasyonu"
    ],
    "definition": "EKG’de ardışık derivasyonlarda görülürse akut transmural iskemi ve koroner oklüzyon lehinedir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": [
      "cv-anterior-stemi-001"
    ]
  },
  {
    "term": "CK-MB",
    "aliases": [
      "CK-MB"
    ],
    "definition": "Miyokart hasarında yükselebilen kardiyak enzimdir; troponine göre daha az duyarlı/özgül kabul edilir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": [
      "cardiovascular-coagulative-necrosis-mi-001",
      "cv-anterior-stemi-001"
    ]
  },
  {
    "term": "Primer perkütan koroner girişim",
    "aliases": [
      "Primer perkütan koroner girişim"
    ],
    "definition": "STEMI’de tıkalı koroner damarı mekanik olarak açmaya yönelik öncelikli reperfüzyon yöntemidir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": [
      "cv-anterior-stemi-001"
    ]
  },
  {
    "term": "Fibrinolitik tedavi",
    "aliases": [
      "Fibrinolitik tedavi"
    ],
    "definition": "Uygun STEMI olgusunda primer girişime zamanında ulaşılamıyorsa pıhtıyı eritmek için kullanılan tedavidir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "P2Y12 inhibitörü",
    "aliases": [
      "P2Y12 inhibitörü"
    ],
    "definition": "Trombosit aktivasyonunu azaltan antiplatelet ilaç grubudur; akut koroner sendrom yönetiminde kullanılır.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": [
      "cv-anterior-stemi-001"
    ]
  },
  {
    "term": "Antikoagülasyon",
    "aliases": [
      "Antikoagülasyon"
    ],
    "definition": "Pıhtı oluşumunu veya ilerlemesini azaltan tedavi yaklaşımıdır.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "neurology",
      "pediatrics",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cv-anterior-stemi-001",
      "cv-aortic-dissection-001",
      "neuro-cvst-001",
      "pediatrics-homocystinuria-001",
      "pulm-pe-001",
      "pulmonology-near-hanging-asphyxia-001"
    ]
  },
  {
    "term": "Nitrat",
    "aliases": [
      "Nitrat"
    ],
    "definition": "Vazodilatasyon sağlayarak iskemi ilişkili ağrıyı azaltabilen ilaç grubudur; hipotansiyon gibi durumlarda dikkat gerekir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": [
      "cv-anterior-stemi-001"
    ]
  },
  {
    "term": "Akut aort sendromu",
    "aliases": [
      "Akut aort sendromu"
    ],
    "definition": "Aort diseksiyonu, intramural hematom ve penetran ülseri içeren acil aort patolojileri grubudur.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": [
      "cv-aortic-dissection-001"
    ]
  },
  {
    "term": "Stanford tip A diseksiyon",
    "aliases": [
      "Stanford tip A diseksiyon"
    ],
    "definition": "Asendan aortu tutan aort diseksiyonudur; genellikle acil cerrahi gerektirir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "İntimal flap",
    "aliases": [
      "İntimal flap"
    ],
    "definition": "Aort diseksiyonunda lümeni ayıran iç tabaka yırtığına bağlı görüntüleme bulgusudur.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": [
      "cv-aortic-dissection-001"
    ]
  },
  {
    "term": "Gerçek lümen",
    "aliases": [
      "Gerçek lümen"
    ],
    "definition": "Diseksiyonda normal damar lümeninin devamını ifade eder.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Yalancı lümen",
    "aliases": [
      "Yalancı lümen"
    ],
    "definition": "Diseksiyon yırtığı sonrası damar duvarı katları arasında oluşan patolojik kan kanalıdır.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": [
      "cv-aortic-dissection-001"
    ]
  },
  {
    "term": "BT anjiyografi",
    "aliases": [
      "BT anjiyografi"
    ],
    "definition": "Damar yapılarının kontrastlı BT ile değerlendirilmesidir; diseksiyon, emboli ve oklüzyonlarda kullanılır.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine",
      "neurology",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cv-aortic-dissection-001",
      "im-acute-pancreatitis-001",
      "neuro-mca-stroke-001",
      "neuro-sah-001",
      "pulmonology-near-hanging-asphyxia-001"
    ]
  },
  {
    "term": "Nabız asimetrisi",
    "aliases": [
      "Nabız asimetrisi"
    ],
    "definition": "Ekstremiteler arasında nabız gücü farkıdır; diseksiyon veya damar tıkanıklığı düşündürebilir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": [
      "cardiovascular-electrical-injury-arrhythmia-001",
      "cv-aortic-dissection-001"
    ]
  },
  {
    "term": "Aort yetmezliği",
    "aliases": [
      "Aort yetmezliği"
    ],
    "definition": "Aort kapağından diyastolde geri kaçış olmasıdır; tip A diseksiyonda gelişebilir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": [
      "cv-aortic-dissection-001"
    ]
  },
  {
    "term": "Kardiyak tamponad",
    "aliases": [
      "Kardiyak tamponad"
    ],
    "definition": "Perikard boşluğundaki basınç artışı nedeniyle kalp doluşunun bozulduğu hayatı tehdit eden tablodur.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": [
      "cv-tamponade-001"
    ]
  },
  {
    "term": "Beck triadı",
    "aliases": [
      "Beck triadı"
    ],
    "definition": "Hipotansiyon, juguler venöz dolgunluk ve kalp seslerinde derinden gelme bulgularından oluşan tamponad ipucudur.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Pulsus paradoksus",
    "aliases": [
      "Pulsus paradoksus"
    ],
    "definition": "İnspirasyonla sistolik kan basıncında belirgin düşüş olmasıdır; tamponad gibi durumlarda görülebilir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Perikardiyosentez",
    "aliases": [
      "Perikardiyosentez"
    ],
    "definition": "Perikard boşluğundaki sıvının iğne/kateterle boşaltılmasıdır.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": [
      "cv-tamponade-001"
    ]
  },
  {
    "term": "Kardiyojenik pulmoner ödem",
    "aliases": [
      "Kardiyojenik pulmoner ödem"
    ],
    "definition": "Sol kalp basınç artışına bağlı alveol/interstisyel sıvı birikimiyle gelişen akut solunum tablosudur.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cv-pulmonary-edema-001",
      "cv-tamponade-001",
      "pulm-copd-exacerbation-001"
    ]
  },
  {
    "term": "Ortopne",
    "aliases": [
      "Ortopne"
    ],
    "definition": "Yatar pozisyonda artan nefes darlığıdır; kalp yetersizliği için önemli klinik ipucudur.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": [
      "cv-pulmonary-edema-001"
    ]
  },
  {
    "term": "Ejeksiyon fraksiyonu",
    "aliases": [
      "Ejeksiyon fraksiyonu"
    ],
    "definition": "Sol ventrikülün her atımda pompaladığı kan yüzdesidir; kalp yetersizliği sınıflamasında kullanılır.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Hipertrofik obstrüktif kardiyomiyopati",
    "aliases": [
      "Hipertrofik obstrüktif kardiyomiyopati"
    ],
    "definition": "Sol ventrikül çıkış yolu obstrüksiyonu ve septal hipertrofiyle seyreden kardiyomiyopatidir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": [
      "cv-hocm-001"
    ]
  },
  {
    "term": "LVOT obstrüksiyonu",
    "aliases": [
      "LVOT obstrüksiyonu"
    ],
    "definition": "Sol ventrikül çıkış yolunda dinamik veya sabit darlık oluşmasıdır.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Valsalva manevrası",
    "aliases": [
      "Valsalva manevrası"
    ],
    "definition": "İntratorasik basıncı artıran manevradır; bazı üfürümlerin şiddetini değiştirmede tanısal ipucu verir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": [
      "cv-hocm-001"
    ]
  },
  {
    "term": "Diyabetik ketoasidoz",
    "aliases": [
      "Diyabetik ketoasidoz"
    ],
    "definition": "İnsülin eksikliğine bağlı ketozis, hiperglisemi ve anyon açıklı metabolik asidozla seyreden acil tablodur.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-dka-001"
    ]
  },
  {
    "term": "Kussmaul solunumu",
    "aliases": [
      "Kussmaul solunumu"
    ],
    "definition": "Metabolik asidozu kompanse etmeye yönelik derin ve hızlı solunum paternidir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-dka-001"
    ]
  },
  {
    "term": "Ketonemi",
    "aliases": [
      "Ketonemi"
    ],
    "definition": "Kanda keton cisimlerinin artmasıdır; diyabetik ketoasidozda beklenir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-dka-001"
    ]
  },
  {
    "term": "Beta-hidroksibutirat",
    "aliases": [
      "Beta-hidroksibutirat"
    ],
    "definition": "DKA’da baskın keton cismidir ve ketozis değerlendirmesinde kullanılır.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-dka-001"
    ]
  },
  {
    "term": "Potasyum replasmanı",
    "aliases": [
      "Potasyum replasmanı"
    ],
    "definition": "Hipokalemi veya toplam vücut potasyum eksikliğinde potasyumun kontrollü verilmesidir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [],
    "relatedCaseIds": []
  },
  {
    "term": "Akut pankreatit",
    "aliases": [
      "Akut pankreatit"
    ],
    "definition": "Pankreas inflamasyonudur; tipik ağrı ve enzim yüksekliğiyle tanınır.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "general-surgery",
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-acute-pancreatitis-001",
      "surg-cholecystitis-001",
      "surg-pneumoperitoneum-001"
    ]
  },
  {
    "term": "Biliyer pankreatit",
    "aliases": [
      "Biliyer pankreatit"
    ],
    "definition": "Safra taşı veya safra yolu patolojisine bağlı gelişen akut pankreatittir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-acute-pancreatitis-001"
    ]
  },
  {
    "term": "Lipaz",
    "aliases": [
      "Lipaz"
    ],
    "definition": "Pankreatit tanısında amilaza göre daha özgül kabul edilen pankreatik enzimdir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-acute-pancreatitis-001"
    ]
  },
  {
    "term": "Kolelitiazis",
    "aliases": [
      "Kolelitiazis"
    ],
    "definition": "Safra kesesinde taş bulunmasıdır; biliyer kolik, kolesistit ve pankreatit ile ilişkili olabilir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [],
    "relatedCaseIds": []
  },
  {
    "term": "MRCP",
    "aliases": [
      "MRCP"
    ],
    "definition": "Manyetik rezonans kolanjiyopankreatografi; safra ve pankreas kanallarını noninvaziv gösterir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [],
    "relatedCaseIds": []
  },
  {
    "term": "ERCP",
    "aliases": [
      "ERCP"
    ],
    "definition": "Endoskopik retrograd kolanjiyopankreatografi; tanısal ve terapötik safra/pankreas kanalı girişimidir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-acute-pancreatitis-001"
    ]
  },
  {
    "term": "Oktreotid",
    "aliases": [
      "Oktreotid"
    ],
    "definition": "Varis kanamasında portal basıncı azaltmaya yardımcı somatostatin analoğudur.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-variceal-bleeding-001"
    ]
  },
  {
    "term": "Endoskopik bant ligasyonu",
    "aliases": [
      "Endoskopik bant ligasyonu"
    ],
    "definition": "Özofagus varis kanamasında varislerin bantla boğulmasına dayalı endoskopik tedavidir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-variceal-bleeding-001"
    ]
  },
  {
    "term": "Mikrositer anemi",
    "aliases": [
      "Mikrositer anemi"
    ],
    "definition": "Eritrosit hacminin düşük olduğu anemi tipidir; demir eksikliği sık nedendir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-iron-deficiency-anemia-001"
    ]
  },
  {
    "term": "Hipokromi",
    "aliases": [
      "Hipokromi"
    ],
    "definition": "Eritrositlerde hemoglobin içeriğinin azalmasına bağlı soluk görünümüdür.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-iron-deficiency-anemia-001"
    ]
  },
  {
    "term": "Ferritin",
    "aliases": [
      "serum ferritin",
      "Ferritin"
    ],
    "definition": "Demir depolarını yansıtan laboratuvar parametresidir; inflamasyonda yükselebilir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-iron-deficiency-anemia-001",
      "internal-medicine-hemochromatosis-001",
      "internal-medicine-scurvy-001"
    ]
  },
  {
    "term": "Transferrin satürasyonu",
    "aliases": [
      "Transferrin satürasyonu"
    ],
    "definition": "Transferrinin demirle doluluk oranıdır; demir eksikliğinde düşer.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-hemochromatosis-001"
    ]
  },
  {
    "term": "Total demir bağlama kapasitesi",
    "aliases": [
      "Total demir bağlama kapasitesi"
    ],
    "definition": "Transferrin kapasitesini dolaylı yansıtır; demir eksikliğinde genellikle artar.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-iron-deficiency-anemia-001"
    ]
  },
  {
    "term": "Pika",
    "aliases": [
      "Pika"
    ],
    "definition": "Besin değeri olmayan maddeleri yeme isteğidir; demir eksikliğiyle ilişkili olabilir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-iron-deficiency-anemia-001"
    ]
  },
  {
    "term": "Hiperkalsemi",
    "aliases": [
      "Hiperkalsemi"
    ],
    "definition": "Serum kalsiyum düzeyinin yüksek olmasıdır; malignite ve hiperparatiroidi gibi nedenlerle görülür.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-primary-hyperparathyroidism-001"
    ]
  },
  {
    "term": "Parathormon",
    "aliases": [
      "Parathormon"
    ],
    "definition": "Kalsiyum-fosfor dengesini düzenleyen paratiroid hormonudur.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [],
    "relatedCaseIds": []
  },
  {
    "term": "Primer hiperparatiroidi",
    "aliases": [
      "Primer hiperparatiroidi"
    ],
    "definition": "Paratiroid bezinden uygunsuz PTH fazlalığına bağlı hiperkalsemi tablosudur.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-primary-hyperparathyroidism-001"
    ]
  },
  {
    "term": "Nefrolitiyazis",
    "aliases": [
      "Nefrolitiyazis"
    ],
    "definition": "Böbrek taşı hastalığıdır; hiperkalsemi ve hiperparatiroidi ile ilişkili olabilir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-primary-hyperparathyroidism-001"
    ]
  },
  {
    "term": "Akut iskemik inme",
    "aliases": [
      "Akut iskemik inme"
    ],
    "definition": "Beyin damar tıkanıklığına bağlı ani nörolojik defisit gelişmesidir.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology"
    ],
    "relatedCaseIds": [
      "neuro-mca-stroke-001"
    ]
  },
  {
    "term": "NIHSS",
    "aliases": [
      "NIHSS"
    ],
    "definition": "Akut inmede nörolojik defisit şiddetini sayısal olarak değerlendiren skaladır.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Nonkontrast kraniyal BT",
    "aliases": [
      "Nonkontrast kraniyal BT"
    ],
    "definition": "Akut inmede kanamayı dışlamak için ilk kullanılan görüntüleme yöntemidir.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "ASPECTS",
    "aliases": [
      "ASPECTS"
    ],
    "definition": "Ön dolaşım inmesinde erken iskemi bulgularını sınıflayan BT skorudur.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Subaraknoid kanama",
    "aliases": [
      "Subaraknoid kanama"
    ],
    "definition": "Subaraknoid aralığa kanama olmasıdır; ani en şiddetli baş ağrısıyla gelebilir.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology"
    ],
    "relatedCaseIds": [
      "neuro-cvst-001",
      "neuro-sah-001"
    ]
  },
  {
    "term": "Thunderclap baş ağrısı",
    "aliases": [
      "Thunderclap baş ağrısı"
    ],
    "definition": "Saniyeler-dakikalar içinde maksimum şiddete ulaşan baş ağrısıdır; SAK açısından kırmızı bayraktır.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology"
    ],
    "relatedCaseIds": [
      "neuro-cvst-001",
      "neuro-sah-001"
    ]
  },
  {
    "term": "Lomber ponksiyon",
    "aliases": [
      "Lomber ponksiyon"
    ],
    "definition": "BOS örneği almak için yapılan işlemdir; menenjit ve SAK değerlendirmesinde kullanılır.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology"
    ],
    "relatedCaseIds": [
      "neuro-sah-001"
    ]
  },
  {
    "term": "Ksantokromi",
    "aliases": [
      "Ksantokromi"
    ],
    "definition": "BOS’ta sarımsı renk değişikliğidir; subaraknoid kanama sonrası görülebilir.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology"
    ],
    "relatedCaseIds": [
      "neuro-sah-001"
    ]
  },
  {
    "term": "Nimodipin",
    "aliases": [
      "Nimodipin"
    ],
    "definition": "Subaraknoid kanamada vazospazm riskini azaltmak için kullanılan kalsiyum kanal blokörüdür.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Multipl skleroz",
    "aliases": [
      "Multipl skleroz"
    ],
    "definition": "Santral sinir sisteminde inflamatuvar demiyelinizasyonla seyreden kronik hastalıktır.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology"
    ],
    "relatedCaseIds": [
      "neuro-ms-001"
    ]
  },
  {
    "term": "Optik nörit",
    "aliases": [
      "Optik nörit"
    ],
    "definition": "Optik sinir inflamasyonudur; ağrılı görme kaybı ve MS ile ilişkili olabilir.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology"
    ],
    "relatedCaseIds": [
      "neuro-ms-001"
    ]
  },
  {
    "term": "Demiyelinizan plak",
    "aliases": [
      "Demiyelinizan plak"
    ],
    "definition": "Miyelin kaybına bağlı MR lezyonudur; MS değerlendirmesinde önemlidir.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Oligoklonal band",
    "aliases": [
      "Oligoklonal band"
    ],
    "definition": "BOS’ta intratekal immün aktivasyonu gösteren bantlardır; MS tanısına destek verir.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Serebral venöz sinüs trombozu",
    "aliases": [
      "Serebral venöz sinüs trombozu"
    ],
    "definition": "Beynin venöz sinüslerinde pıhtı gelişmesidir; baş ağrısı, nöbet ve fokal defisit yapabilir.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology"
    ],
    "relatedCaseIds": [
      "neuro-cvst-001",
      "neuro-sah-001"
    ]
  },
  {
    "term": "MR venografi",
    "aliases": [
      "MR venografi"
    ],
    "definition": "Venöz sinüslerin MR ile değerlendirilmesini sağlayan görüntüleme yöntemidir.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology"
    ],
    "relatedCaseIds": [
      "neuro-cvst-001"
    ]
  },
  {
    "term": "İleoçekal invajinasyon",
    "aliases": [
      "İleoçekal invajinasyon"
    ],
    "definition": "İleum segmentinin çekum içine teleskopik şekilde girmesidir; kolik ağrı ve kanlı mukuslu dışkı yapabilir.",
    "category": "Çocuk Sağlığı ve Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": [
      "ped-intussusception-001"
    ]
  },
  {
    "term": "Target sign",
    "aliases": [
      "Target sign"
    ],
    "definition": "USG’de invajinasyon için tipik hedef/halka görünümüdür.",
    "category": "Çocuk Sağlığı ve Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": [
      "ped-intussusception-001"
    ]
  },
  {
    "term": "Hipertrofik pilor stenozu",
    "aliases": [
      "Hipertrofik pilor stenozu"
    ],
    "definition": "Pilor kas hipertrofisine bağlı gastrik çıkış obstrüksiyonudur; safrasız fışkırır kusma yapar.",
    "category": "Çocuk Sağlığı ve Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": [
      "ped-intussusception-001",
      "ped-pyloric-stenosis-001"
    ]
  },
  {
    "term": "Hipokloremik metabolik alkaloz",
    "aliases": [
      "Hipokloremik metabolik alkaloz"
    ],
    "definition": "Kusmaya bağlı klor kaybı ve alkalozla seyreden asit-baz bozukluğudur.",
    "category": "Çocuk Sağlığı ve Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": [
      "ped-pyloric-stenosis-001"
    ]
  },
  {
    "term": "Kawasaki hastalığı",
    "aliases": [
      "Kawasaki hastalığı"
    ],
    "definition": "Uzamış ateş ve mukokutanöz inflamasyonla seyreden çocukluk çağı vaskülitidir.",
    "category": "Çocuk Sağlığı ve Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": [
      "ped-kawasaki-001"
    ]
  },
  {
    "term": "Koroner anevrizma",
    "aliases": [
      "Koroner anevrizma"
    ],
    "definition": "Koroner arter duvarında genişlemedir; Kawasaki hastalığının önemli komplikasyonudur.",
    "category": "Çocuk Sağlığı ve Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": [
      "ped-kawasaki-001"
    ]
  },
  {
    "term": "IVIG",
    "aliases": [
      "IVIG"
    ],
    "definition": "İntravenöz immünoglobulin tedavisidir; Kawasaki ve bazı immün hastalıklarda kullanılır.",
    "category": "Çocuk Sağlığı ve Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": [
      "ped-kawasaki-001",
      "pediatrics-bruton-agammaglobulinemia-001"
    ]
  },
  {
    "term": "Akut epiglottit",
    "aliases": [
      "Akut epiglottit"
    ],
    "definition": "Epiglot inflamasyonudur; hava yolu obstrüksiyonu riski nedeniyle acildir.",
    "category": "Çocuk Sağlığı ve Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": [
      "ped-epiglottitis-001"
    ]
  },
  {
    "term": "Tripod pozisyonu",
    "aliases": [
      "Tripod pozisyonu"
    ],
    "definition": "Hava yolu darlığında hastanın öne eğilip ellerinden destek alarak solumasıdır.",
    "category": "Çocuk Sağlığı ve Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": [
      "ped-epiglottitis-001"
    ]
  },
  {
    "term": "Stridor",
    "aliases": [
      "Stridor"
    ],
    "definition": "Üst hava yolu darlığında duyulan kaba inspiratuvar solunum sesidir.",
    "category": "Çocuk Sağlığı ve Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "ped-epiglottitis-001",
      "pulmonology-near-hanging-asphyxia-001"
    ]
  },
  {
    "term": "Akut apandisit",
    "aliases": [
      "Akut apandisit"
    ],
    "definition": "Apendiks inflamasyonudur; migratuvar sağ alt kadran ağrısı ve lokal hassasiyet ile seyreder.",
    "category": "Genel Cerrahi",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "general-surgery",
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-dka-001",
      "surg-appendicitis-001",
      "surg-diverticulitis-001"
    ]
  },
  {
    "term": "McBurney noktası",
    "aliases": [
      "McBurney noktası"
    ],
    "definition": "Sağ alt kadranda apandisit muayenesinde hassasiyet aranılan anatomik noktadır.",
    "category": "Genel Cerrahi",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "general-surgery"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Rebound",
    "aliases": [
      "Rebound"
    ],
    "definition": "Bası kaldırıldığında ağrının artmasıdır; peritoneal irritasyonu düşündürür.",
    "category": "Genel Cerrahi",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "general-surgery",
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-acute-pancreatitis-001",
      "im-dka-001",
      "internal-medicine-acute-radiation-syndrome-001",
      "internal-medicine-pellagra-001",
      "internal-medicine-sexual-assault-evidence-001",
      "surg-appendicitis-001",
      "surg-cholecystitis-001",
      "surg-diverticulitis-001",
      "surg-pneumoperitoneum-001",
      "surg-sbo-001"
    ]
  },
  {
    "term": "Akut taşlı kolesistit",
    "aliases": [
      "Akut taşlı kolesistit"
    ],
    "definition": "Safra kesesi taşına bağlı gelişen akut safra kesesi inflamasyonudur.",
    "category": "Genel Cerrahi",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "general-surgery"
    ],
    "relatedCaseIds": [
      "surg-cholecystitis-001"
    ]
  },
  {
    "term": "Murphy bulgusu",
    "aliases": [
      "Murphy bulgusu"
    ],
    "definition": "Sağ üst kadran palpasyonunda inspirasyonun ağrı nedeniyle kesilmesidir; kolesistit lehinedir.",
    "category": "Genel Cerrahi",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "general-surgery"
    ],
    "relatedCaseIds": [
      "surg-cholecystitis-001"
    ]
  },
  {
    "term": "Perikolesistik sıvı",
    "aliases": [
      "Perikolesistik sıvı"
    ],
    "definition": "Safra kesesi çevresinde sıvı birikimidir; kolesistit görüntüleme bulgusu olabilir.",
    "category": "Genel Cerrahi",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "general-surgery"
    ],
    "relatedCaseIds": [
      "surg-cholecystitis-001"
    ]
  },
  {
    "term": "İnce bağırsak obstrüksiyonu",
    "aliases": [
      "İnce bağırsak obstrüksiyonu"
    ],
    "definition": "İnce bağırsak pasajının mekanik olarak tıkanmasıdır.",
    "category": "Genel Cerrahi",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "general-surgery"
    ],
    "relatedCaseIds": [
      "surg-sbo-001"
    ]
  },
  {
    "term": "Adezyon",
    "aliases": [
      "Adezyon"
    ],
    "definition": "Cerrahi veya inflamasyon sonrası oluşan fibrotik yapışıklıklardır; obstrüksiyon nedeni olabilir.",
    "category": "Genel Cerrahi",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "general-surgery"
    ],
    "relatedCaseIds": [
      "surg-sbo-001"
    ]
  },
  {
    "term": "Obstipasyon",
    "aliases": [
      "Obstipasyon"
    ],
    "definition": "Gaz ve dışkı çıkaramama durumudur; bağırsak obstrüksiyonunda görülebilir.",
    "category": "Genel Cerrahi",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "general-surgery"
    ],
    "relatedCaseIds": [
      "surg-sbo-001"
    ]
  },
  {
    "term": "Subdiyafragmatik serbest hava",
    "aliases": [
      "Subdiyafragmatik serbest hava"
    ],
    "definition": "Diyafram altında serbest hava görünümüdür; içi boş organ perforasyonunu düşündürür.",
    "category": "Genel Cerrahi",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "general-surgery",
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-acute-pancreatitis-001",
      "surg-pneumoperitoneum-001"
    ]
  },
  {
    "term": "Sigmoid divertikülit",
    "aliases": [
      "Sigmoid divertikülit"
    ],
    "definition": "Sigmoid kolondaki divertiküllerin inflamasyonudur; sol alt kadran ağrısı yapabilir.",
    "category": "Genel Cerrahi",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "general-surgery"
    ],
    "relatedCaseIds": [
      "surg-diverticulitis-001"
    ]
  },
  {
    "term": "Perikolik inflamasyon",
    "aliases": [
      "Perikolik inflamasyon"
    ],
    "definition": "Kolon çevresi yağ dokusunda inflamasyon bulgusudur; divertikülitte BT bulgusu olabilir.",
    "category": "Genel Cerrahi",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "general-surgery"
    ],
    "relatedCaseIds": [
      "surg-diverticulitis-001"
    ]
  },
  {
    "term": "Primer spontan pnömotoraks",
    "aliases": [
      "Primer spontan pnömotoraks"
    ],
    "definition": "Altta belirgin akciğer hastalığı olmadan plevra boşluğuna hava kaçmasıdır; genç uzun erkeklerde görülebilir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "pulmonology"
    ],
    "relatedCaseIds": [
      "pulm-pe-001",
      "pulm-pneumothorax-001"
    ]
  },
  {
    "term": "Plevral çizgi",
    "aliases": [
      "Plevral çizgi"
    ],
    "definition": "Akciğer grafisinde pnömotoraksı gösteren visseral plevra hattıdır.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cv-aortic-dissection-001",
      "pulm-pneumothorax-001"
    ]
  },
  {
    "term": "Toraks tüpü",
    "aliases": [
      "Toraks tüpü"
    ],
    "definition": "Plevral boşluktaki hava veya sıvıyı boşaltmak için yerleştirilen tüptür.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [],
    "relatedCaseIds": []
  },
  {
    "term": "İğne dekompresyon",
    "aliases": [
      "İğne dekompresyon"
    ],
    "definition": "Tansiyon pnömotoraksta acil basınç azaltma girişimidir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [],
    "relatedCaseIds": []
  },
  {
    "term": "Akut pulmoner emboli",
    "aliases": [
      "Akut pulmoner emboli"
    ],
    "definition": "Pulmoner arter dallarının trombüsle tıkanmasıdır; ani dispne ve plöritik ağrı yapabilir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "pulmonology"
    ],
    "relatedCaseIds": [
      "pulm-pe-001"
    ]
  },
  {
    "term": "Wells skoru",
    "aliases": [
      "Wells skoru"
    ],
    "definition": "Pulmoner emboli olasılığını klinik olarak sınıflayan skordur.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [],
    "relatedCaseIds": []
  },
  {
    "term": "CTPA",
    "aliases": [
      "CTPA"
    ],
    "definition": "BT pulmoner anjiyografi; pulmoner emboli tanısında sık kullanılan görüntülemedir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "pulmonology"
    ],
    "relatedCaseIds": [
      "pulm-pe-001"
    ]
  },
  {
    "term": "V/Q sintigrafisi",
    "aliases": [
      "V/Q sintigrafisi"
    ],
    "definition": "Ventilasyon ve perfüzyon dağılımını karşılaştıran nükleer tıp incelemesidir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [],
    "relatedCaseIds": []
  },
  {
    "term": "Toplum kökenli pnömoni",
    "aliases": [
      "Toplum kökenli pnömoni"
    ],
    "definition": "Hastane dışında gelişen akciğer parankim enfeksiyonudur.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "infectious-diseases"
    ],
    "relatedCaseIds": [
      "cv-pulmonary-edema-001",
      "inf-endocarditis-001",
      "inf-tuberculosis-001"
    ]
  },
  {
    "term": "CURB-65",
    "aliases": [
      "CURB-65"
    ],
    "definition": "Pnömonide yatış ve mortalite riskini değerlendiren klinik skordur.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "pulmonology"
    ],
    "relatedCaseIds": [
      "pulm-pneumonia-001"
    ]
  },
  {
    "term": "İdiyopatik pulmoner fibrozis",
    "aliases": [
      "İdiyopatik pulmoner fibrozis"
    ],
    "definition": "Nedeni bilinmeyen ilerleyici fibrotik interstisyel akciğer hastalığıdır.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "pulmonology"
    ],
    "relatedCaseIds": [
      "pulm-ipf-uip-001"
    ]
  },
  {
    "term": "Bal peteği görünümü",
    "aliases": [
      "Bal peteği görünümü"
    ],
    "definition": "İleri fibroziste HRCT’de görülen kistik subplevral paternidir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "pulmonology"
    ],
    "relatedCaseIds": [
      "pulm-ipf-uip-001"
    ]
  },
  {
    "term": "Restriktif patern",
    "aliases": [
      "Restriktif patern"
    ],
    "definition": "Akciğer hacimlerinde azalmayla giden solunum fonksiyon testi örüntüsüdür.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [],
    "relatedCaseIds": []
  },
  {
    "term": "DLCO",
    "aliases": [
      "DLCO"
    ],
    "definition": "Karbonmonoksit difüzyon kapasitesidir; gaz alışverişi ve interstisyel hastalık değerlendirmesinde kullanılır.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "pulmonology"
    ],
    "relatedCaseIds": [
      "pulm-ipf-uip-001"
    ]
  },
  {
    "term": "KOAH alevlenmesi",
    "aliases": [
      "KOAH alevlenmesi"
    ],
    "definition": "KOAH hastasında dispne, balgam miktarı/pürülansı ve öksürüğün akut kötüleşmesidir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "pulmonology"
    ],
    "relatedCaseIds": [
      "pulm-copd-exacerbation-001",
      "pulm-pneumonia-001"
    ]
  },
  {
    "term": "Hiperkapni",
    "aliases": [
      "Hiperkapni"
    ],
    "definition": "Kanda karbondioksit düzeyinin artmasıdır; ventilasyon yetmezliğini gösterir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [],
    "relatedCaseIds": []
  },
  {
    "term": "Noninvaziv ventilasyon",
    "aliases": [
      "Noninvaziv ventilasyon"
    ],
    "definition": "Entübasyon olmadan maske aracılığıyla ventilasyon desteği verilmesidir.",
    "category": "İç Hastalıkları",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cv-pulmonary-edema-001",
      "pulm-copd-exacerbation-001"
    ]
  },
  {
    "term": "Reaktivasyon tüberkülozu",
    "aliases": [
      "Reaktivasyon tüberkülozu"
    ],
    "definition": "Daha önce alınmış tüberküloz enfeksiyonunun yeniden aktifleşmesiyle gelişen tabloyu ifade eder.",
    "category": "Tıbbi Mikrobiyoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedCaseIds": [
      "inf-tuberculosis-001",
      "infectious-diseases-caseating-granuloma-tb-001"
    ]
  },
  {
    "term": "ARB",
    "aliases": [
      "ARB"
    ],
    "definition": "Aside dirençli basil boyamasıdır; tüberküloz tanısında kullanılır.",
    "category": "Tıbbi Mikrobiyoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedCaseIds": [
      "inf-tuberculosis-001",
      "infectious-diseases-caseating-granuloma-tb-001"
    ]
  },
  {
    "term": "Kaviter lezyon",
    "aliases": [
      "Kaviter lezyon"
    ],
    "definition": "Akciğerde içi boşluklu lezyondur; reaktivasyon TB gibi hastalıklarda görülebilir.",
    "category": "Tıbbi Mikrobiyoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases",
      "neurology"
    ],
    "relatedCaseIds": [
      "inf-tuberculosis-001",
      "neurology-liquefactive-necrosis-brain-001"
    ]
  },
  {
    "term": "Plasmodium falciparum",
    "aliases": [
      "Plasmodium falciparum"
    ],
    "definition": "Ağır sıtmaya yol açabilen Plasmodium türüdür.",
    "category": "Tıbbi Mikrobiyoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedCaseIds": [
      "inf-malaria-001"
    ]
  },
  {
    "term": "Kalın damla",
    "aliases": [
      "Kalın damla"
    ],
    "definition": "Sıtma parazitlerinin saptanmasında kullanılan mikroskobik kan yayması yöntemidir.",
    "category": "Tıbbi Mikrobiyoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedCaseIds": [
      "inf-malaria-001"
    ]
  },
  {
    "term": "İnce yayma",
    "aliases": [
      "İnce yayma"
    ],
    "definition": "Sıtma tür ayrımı ve parazitemi değerlendirmesinde kullanılan kan yaymasıdır.",
    "category": "Tıbbi Mikrobiyoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedCaseIds": [
      "inf-malaria-001"
    ]
  },
  {
    "term": "Meningokoksemi",
    "aliases": [
      "Meningokoksemi"
    ],
    "definition": "Neisseria meningitidis’in kana yayılmasıyla gelişen sepsis tablosudur.",
    "category": "Tıbbi Mikrobiyoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedCaseIds": [
      "inf-meningococcemia-001"
    ]
  },
  {
    "term": "Peteşi",
    "aliases": [
      "Peteşi"
    ],
    "definition": "Basmakla solmayan küçük noktasal kanama odağıdır.",
    "category": "Tıbbi Mikrobiyoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases",
      "internal-medicine",
      "pediatrics",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "inf-meningococcemia-001",
      "internal-medicine-acute-radiation-syndrome-001",
      "pediatrics-von-gierke-gsd-001",
      "pulmonology-near-hanging-asphyxia-001"
    ]
  },
  {
    "term": "Purpura",
    "aliases": [
      "Purpura"
    ],
    "definition": "Deri veya mukozada daha geniş kanama odaklarıdır; meningokoksemi gibi acillerde görülebilir.",
    "category": "Tıbbi Mikrobiyoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases",
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "inf-meningococcemia-001",
      "internal-medicine-acute-radiation-syndrome-001"
    ]
  },
  {
    "term": "BOS",
    "aliases": [
      "BOS"
    ],
    "definition": "Beyin omurilik sıvısıdır; menenjit ve SAK değerlendirmesinde incelenir.",
    "category": "Tıbbi Mikrobiyoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases",
      "neurology",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "inf-meningococcemia-001",
      "neuro-ms-001",
      "neuro-sah-001",
      "pulmonology-near-hanging-asphyxia-001"
    ]
  },
  {
    "term": "Seftriakson",
    "aliases": [
      "Seftriakson"
    ],
    "definition": "Geniş spektrumlu üçüncü kuşak sefalosporindir; menenjit ve sepsis tedavisinde kullanılabilir.",
    "category": "Tıbbi Mikrobiyoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases",
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-variceal-bleeding-001",
      "inf-meningococcemia-001"
    ]
  },
  {
    "term": "İnfektif endokardit",
    "aliases": [
      "İnfektif endokardit"
    ],
    "definition": "Kalp kapakları veya endokard yüzeyinin mikrobiyal enfeksiyonudur.",
    "category": "Tıbbi Mikrobiyoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Vejetasyon",
    "aliases": [
      "Vejetasyon"
    ],
    "definition": "Endokarditte kapak üzerinde oluşan mikroorganizma, fibrin ve hücrelerden oluşan kitlelerdir.",
    "category": "Tıbbi Mikrobiyoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedCaseIds": [
      "inf-endocarditis-001"
    ]
  },
  {
    "term": "Duke kriterleri",
    "aliases": [
      "Duke kriterleri"
    ],
    "definition": "İnfektif endokardit tanısında kullanılan majör/minör kriterlerdir.",
    "category": "Tıbbi Mikrobiyoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedCaseIds": [
      "inf-endocarditis-001"
    ]
  },
  {
    "term": "Triküspit kapak",
    "aliases": [
      "Triküspit kapak"
    ],
    "definition": "Sağ atriyum ile sağ ventrikül arasındaki kapaktır; IV madde kullanımında endokardit tutulumu görülebilir.",
    "category": "Tıbbi Mikrobiyoloji",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Colles kırığı",
    "aliases": [
      "Colles kırığı"
    ],
    "definition": "Distal radiusun dorsal angulasyon/deplasmanla kırılmasıdır; çatal sırtı deformitesi yapabilir.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "orthopedics"
    ],
    "relatedCaseIds": [
      "ortho-colles-001"
    ]
  },
  {
    "term": "Distal radius kırığı",
    "aliases": [
      "Distal radius kırığı"
    ],
    "definition": "El bileğine yakın radius kırığıdır; düşme sonrası sık görülür.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "orthopedics"
    ],
    "relatedCaseIds": [
      "ortho-colles-001",
      "ortho-scaphoid-001"
    ]
  },
  {
    "term": "Çatal sırtı deformitesi",
    "aliases": [
      "Çatal sırtı deformitesi"
    ],
    "definition": "Colles kırığında el bileğinde görülen tipik dorsal deformitedir.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "orthopedics"
    ],
    "relatedCaseIds": [
      "ortho-colles-001"
    ]
  },
  {
    "term": "Femur boyun kırığı",
    "aliases": [
      "Femur boyun kırığı"
    ],
    "definition": "Femur başı ile trokanterik bölge arasındaki boyun kısmında kırık oluşmasıdır.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "orthopedics"
    ],
    "relatedCaseIds": [
      "ortho-femoral-neck-001"
    ]
  },
  {
    "term": "İntrakapsüler kırık",
    "aliases": [
      "İntrakapsüler kırık"
    ],
    "definition": "Eklem kapsülü içinde yer alan kırığı ifade eder; femur boynunda avasküler nekroz riski önemlidir.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "orthopedics"
    ],
    "relatedCaseIds": [
      "ortho-femoral-neck-001"
    ]
  },
  {
    "term": "Avasküler nekroz",
    "aliases": [
      "Avasküler nekroz"
    ],
    "definition": "Kemik dokusunun kanlanma bozukluğuna bağlı nekrozudur.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "orthopedics"
    ],
    "relatedCaseIds": [
      "ortho-femoral-neck-001",
      "ortho-scaphoid-001"
    ]
  },
  {
    "term": "Hemiartroplasti",
    "aliases": [
      "Hemiartroplasti"
    ],
    "definition": "Eklem yüzeyinin bir kısmının protezle değiştirilmesidir; bazı femur boyun kırıklarında kullanılır.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "orthopedics"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Skafoid kırığı",
    "aliases": [
      "Skafoid kırığı"
    ],
    "definition": "El bileği skafoid kemiğinin kırığıdır; anatomik enfiye çukuru hassasiyeti tipiktir.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "orthopedics"
    ],
    "relatedCaseIds": [
      "ortho-colles-001",
      "ortho-scaphoid-001"
    ]
  },
  {
    "term": "Anatomik enfiye çukuru",
    "aliases": [
      "Anatomik enfiye çukuru"
    ],
    "definition": "Skafoid üzerinde yer alan palpasyon alanıdır; hassasiyeti skafoid kırığını düşündürür.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "orthopedics"
    ],
    "relatedCaseIds": [
      "ortho-scaphoid-001"
    ]
  },
  {
    "term": "Başparmak spika ateli",
    "aliases": [
      "Başparmak spika ateli"
    ],
    "definition": "Skafoid kırığı şüphesinde başparmağı ve el bileğini immobilize eden ateldir.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "orthopedics"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Glenohumeral çıkık",
    "aliases": [
      "Glenohumeral çıkık"
    ],
    "definition": "Humerus başının glenoid kaviteden çıkmasıdır; anterior çıkık en sık formdur.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "orthopedics"
    ],
    "relatedCaseIds": [
      "ortho-shoulder-dislocation-001"
    ]
  },
  {
    "term": "Aksiller sinir",
    "aliases": [
      "Aksiller sinir"
    ],
    "definition": "Omuz çıkığında yaralanma riski olan sinirdir; deltoid duyu ve motor fonksiyonla değerlendirilir.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "orthopedics"
    ],
    "relatedCaseIds": [
      "ortho-shoulder-dislocation-001"
    ]
  },
  {
    "term": "Kapalı redüksiyon",
    "aliases": [
      "Kapalı redüksiyon"
    ],
    "definition": "Cerrahi kesi olmadan çıkık veya kırığın anatomik yerine getirilmesidir.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "orthopedics"
    ],
    "relatedCaseIds": [
      "ortho-colles-001",
      "ortho-shoulder-dislocation-001"
    ]
  },
  {
    "term": "İmmobilizasyon",
    "aliases": [
      "İmmobilizasyon"
    ],
    "definition": "Yaralı bölgenin hareketini kısıtlayarak iyileşmeyi destekleyen uygulamadır.",
    "category": "Küçük Stajlar",
    "priority": "Yüksek/Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "orthopedics",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "ortho-colles-001",
      "ortho-femoral-neck-001",
      "ortho-scaphoid-001",
      "ortho-shoulder-dislocation-001",
      "pulmonology-near-hanging-asphyxia-001",
      "pulmonology-pulmonary-embolism-dvt-001"
    ]
  },
  {
    "term": "Statik elektrik alan",
    "aliases": [
      "SEA dış yüzeyde birikir",
      "static electric field",
      "Statik elektrik alan",
      "SEA"
    ],
    "definition": "Maruz kalan nesne üzerinde yüzey yükü oluşturur; insan vücuduna girmez, dış yüzeyde birikir ve iç alan oluşturmaz.",
    "category": "Biyofizik / Elektrik alan",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Statik manyetik alan",
    "aliases": [
      "static magnetic field",
      "Statik manyetik alan",
      "SMA dokulara girer",
      "SMA",
      "SMF"
    ],
    "definition": "Biyolojik dokulara girerek hareketli iyon/proteinlerle ve manyetik maddelerle etkileşebilir; elektriksel potansiyel ve akımlar oluşturabilir.",
    "category": "Biyofizik / Manyetik alan",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "ELF-MF",
    "aliases": [
      "Extremely low frequency magnetic field",
      "çok çok düşük frekanslı manyetik alan",
      "ELF-MF"
    ],
    "definition": "Elektriğin üretimi, taşınması veya tüketimi sırasında oluşan düşük frekanslı manyetik alanlardır; zararlı etkinin ortaya çıkması için dokulardaki elektrik alan/akım eşik düzeyi aşılmalıdır.",
    "category": "Biyofizik / Elektromanyetik maruziyet",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Manyetohidrodinamik kuvvet",
    "aliases": [
      "Manyetohidrodinamik kuvvet",
      "MHD force"
    ],
    "definition": "Manyetik alanda hareket eden yüklü parçacıkların oluşturduğu kuvvettir; büyük damarlarda kan akışını yavaşlatabilir.",
    "category": "Biyofizik / SMA mekanizması",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Manyetik fosfen",
    "aliases": [
      "magnetic phosphene",
      "Manyetik fosfen"
    ],
    "definition": "Manyetik alan maruziyeti sırasında görsel sistemde ışık çakması benzeri algı oluşmasıdır.",
    "category": "Biyofizik / SMA semptomu",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Ferrometalik implant riski",
    "aliases": [
      "Ferrometalik implant riski",
      "pacemaker/implant torque"
    ],
    "definition": "Statik manyetik alanlar kalp pili, metal implant veya dış metalik objelere kuvvet/tork uygulayarak klinik risk oluşturabilir.",
    "category": "Biyofizik / MRI güvenliği",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Elektrik çarpması",
    "aliases": [
      "Elektrik çarpması",
      "electrical injury",
      "electrocution"
    ],
    "definition": "Elektrik akımının vücuttan geçmesiyle ısı, membran hasarı, kas kasılması, aritmi ve yanık oluşturabilen travmadır.",
    "category": "Acil/Biyofizik / Elektrik travması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "cardiovascular-electrical-injury-arrhythmia-001"
    ]
  },
  {
    "term": "Alternatif akım",
    "aliases": [
      "alternating current",
      "Alternatif akım",
      "AC"
    ],
    "definition": "Yönü periyodik değişen akımdır; tetanik kasılma yaparak kişinin kaynaktan ayrılamamasına neden olabilir.",
    "category": "Acil/Biyofizik / Elektrik travması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "cardiovascular-electrical-injury-arrhythmia-001",
      "ped-pyloric-stenosis-001"
    ]
  },
  {
    "term": "Doğru akım",
    "aliases": [
      "direct current",
      "Doğru akım",
      "DC"
    ],
    "definition": "Tek yönde akan akımdır; elektrik çarpmasında kişiyi kaynaktan uzağa fırlatma eğilimi AC’ye göre daha belirgindir.",
    "category": "Acil/Biyofizik / Elektrik travması",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Transtorasik akım",
    "aliases": [
      "thoracic current pathway",
      "hand-to-hand current",
      "Transtorasik akım"
    ],
    "definition": "Bir koldan girip diğer koldan çıkan akımın göğüsten geçerek kalbi etkilemesidir; vertikal akımdan daha öldürücü olabilir.",
    "category": "Acil/Biyofizik / Elektrik travması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "cardiovascular-electrical-injury-arrhythmia-001"
    ]
  },
  {
    "term": "Ventriküler fibrilasyon",
    "aliases": [
      "50–100 mA elektrik akımı",
      "Ventriküler fibrilasyon",
      "VF"
    ],
    "definition": "Ventriküllerin düzensiz, etkisiz elektriksel aktivitesi sonucu dolaşımın durduğu ölümcül aritmidir.",
    "category": "Acil kardiyoloji / Elektrik travması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cardiovascular-electrical-injury-arrhythmia-001",
      "pulmonology-lightning-apnea-001"
    ]
  },
  {
    "term": "Asistoli",
    "aliases": [
      "5–10 A veya yıldırım",
      "Asistoli",
      "asystole"
    ],
    "definition": "Kalpte elektriksel aktivitenin kaybolmasıdır; çok yüksek akımlarda ve yıldırım çarpmasında daha sık vurgulanır.",
    "category": "Acil kardiyoloji / Elektrik/yıldırım travması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cardiovascular-electrical-injury-arrhythmia-001",
      "pulmonology-lightning-apnea-001"
    ]
  },
  {
    "term": "Otomatik eksternal defibrilatör",
    "aliases": [
      "Otomatik eksternal defibrilatör",
      "OED",
      "AED"
    ],
    "definition": "Şoklanabilir ritimleri tanıyarak defibrilasyon sağlayan acil müdahale cihazıdır.",
    "category": "Acil yönetim / Elektrik travması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": [
      "cardiovascular-electrical-injury-arrhythmia-001"
    ]
  },
  {
    "term": "Elektroporasyon",
    "aliases": [
      "Nanometre porlar",
      "Elektroporasyon",
      "electroporation"
    ],
    "definition": "Kısa süreli fakat şiddetli elektrik akımıyla hücre zarında nanometre boyutlu geçici porlar oluşmasıdır.",
    "category": "Biyofizik/Hücre / Membran hasarı",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "PEMF",
    "aliases": [
      "pulsed electromagnetic field",
      "pulslu manyetik alan",
      "PEMF"
    ],
    "definition": "Pulslu manyetik alan tedavilerinde hücresel Ca²⁺ artışı ve kalmodulin bağlanması üzerinden etkiler vurgulanır.",
    "category": "Biyofizik / Tıbbi uygulama",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Biyoelektrik empedans analizi",
    "aliases": [
      "Biyoelektrik empedans analizi",
      "BIA"
    ],
    "definition": "Vücuttan düşük düzeyli alternatif akım geçirilerek su, yağ, kas, reaktans, empedans ve faz açısı hakkında bilgi veren ölçüm yöntemidir.",
    "category": "Biyofizik / Tıbbi ölçüm",
    "priority": "Düşük",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Yıldırım çarpması",
    "aliases": [
      "Yıldırım çarpması",
      "lightning strike"
    ],
    "definition": "Çok yüksek şiddetli elektrik akımına bağlı yüzeyel akım, deri yanığı, bilinç kaybı, kardiyorespiratuvar arrest ve nörolojik hasar oluşturabilen travmadır.",
    "category": "Acil/Biyofizik / Yıldırım travması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "pulmonology-lightning-apnea-001"
    ]
  },
  {
    "term": "Uzamış apne",
    "aliases": [
      "Uzamış apne / kardiyorespiratuvar arrest",
      "Yıldırım çarpması + ani ölüm",
      "kardiyorespiratuvar arrest",
      "prolonged apnea",
      "Uzamış apne"
    ],
    "definition": "Solunumun uzun süre durmasıdır; yıldırım çarpmasına bağlı ani ölümde yüksek verimli cevap olarak vurgulanmıştır.",
    "category": "Acil / Yıldırım travması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "pulmonology"
    ],
    "relatedCaseIds": [
      "pulmonology-lightning-apnea-001"
    ]
  },
  {
    "term": "Lichtenberg figürleri",
    "aliases": [
      "Lichtenberg figürleri",
      "Lichtenberg figures"
    ],
    "definition": "Yıldırım/elektrik maruziyetinden sonra deride dallanan, ağaç benzeri geçici izlerdir.",
    "category": "Acil/Dermatoloji / Yıldırım travması",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "pulmonology"
    ],
    "relatedCaseIds": [
      "pulmonology-lightning-apnea-001"
    ]
  },
  {
    "term": "Akut radyasyon sendromu",
    "aliases": [
      "Radyasyon sonrası bulantı-kusma-ishal",
      "Akut radyasyon sendromu",
      "radiation sickness",
      "ARS"
    ],
    "definition": "Kısa sürede yüksek doz radyasyona tüm vücut veya büyük bir vücut bölümü maruz kaldığında gelişen sistemik tablodur.",
    "category": "Radyasyon biyofiziği / Radyasyon hastalığı",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-acute-radiation-syndrome-001"
    ]
  },
  {
    "term": "Prodromal radyasyon belirtileri",
    "aliases": [
      "Prodromal radyasyon belirtileri",
      "nausea-vomiting-diarrhea",
      "ARS prodrome"
    ],
    "definition": "ARS’de ilk görülen bulgular mide bulantısı, kusma, baş ağrısı ve ishaldir.",
    "category": "Radyasyon biyofiziği / ARS klinik",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Kronik radyasyon sendromu",
    "aliases": [
      "Düşük doz + yıllarca maruziyet",
      "Kronik radyasyon sendromu",
      "CRS"
    ],
    "definition": "Düşük radyasyon dozlarına uzun süreli maruziyet sonucu ortaya çıkan, ARS’nin daha hafif/kronik formu olarak anlatılan tablodur.",
    "category": "Radyasyon biyofiziği / Kronik maruziyet",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-acute-radiation-syndrome-001"
    ]
  },
  {
    "term": "Radyasyon dermatiti",
    "aliases": [
      "radiation dermatitis",
      "Radyasyon dermatiti",
      "radiation burn"
    ],
    "definition": "Yüksek doz radyasyondan sonra saatler-günler içinde eritem, şişlik, kaşıntı, bül/ülser ve geç iyileşme ile seyreden cilt hasarıdır.",
    "category": "Radyasyon biyofiziği / Cilt bulgusu",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-acute-radiation-syndrome-001"
    ]
  },
  {
    "term": "Kemik iliği hasarı",
    "aliases": [
      "bone marrow suppression",
      "Kemik iliği hasarı"
    ],
    "definition": "Yüksek doz radyasyon sonrası hematopoietik hücrelerin hasarı; enfeksiyon ve iç kanama ölümlerinde temel mekanizmadır.",
    "category": "Radyasyon biyofiziği / ARS komplikasyonu",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-acute-radiation-syndrome-001"
    ]
  },
  {
    "term": "Radyosensitivite",
    "aliases": [
      "Radyosensitivite",
      "radiosensitivity"
    ],
    "definition": "Hücrelerin radyasyon hasarına duyarlılık derecesidir; hızlı bölünen hücreler genellikle daha duyarlıdır.",
    "category": "Radyasyon biyofiziği / Radyobiyoloji",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Radon gazı",
    "aliases": [
      "Yer kabuğu doğal radyasyonu",
      "Radon gazı",
      "radon"
    ],
    "definition": "Yer kabuğundan kaynaklanan doğal radyasyonun temel kaynağı olarak vurgulanan radyoaktif gazdır.",
    "category": "Radyasyon biyofiziği / Doğal radyasyon",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Kozmik ışın",
    "aliases": [
      "Kozmik ışın",
      "cosmic ray"
    ],
    "definition": "Uzaydan gelen doğal radyasyon bileşenidir; yüksek irtifada ve uçuşta maruziyet artar.",
    "category": "Radyasyon biyofiziği / Doğal radyasyon",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Potasyum-40",
    "aliases": [
      "Potasyum-40",
      "K-40"
    ],
    "definition": "Vücutta bulunan doğal radyoaktif izotoplardan biridir; miktarı kas kütlesiyle ilişkilidir.",
    "category": "Radyasyon biyofiziği / Doğal radyasyon",
    "priority": "Düşük",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "İyonlaştırıcı radyasyon",
    "aliases": [
      "İyonlaştırıcı radyasyon",
      "ionizing radiation"
    ],
    "definition": "Atom/moleküllerden elektron koparabilecek enerjide radyasyondur; DNA zincir kırığı ve hücre hasarı oluşturabilir.",
    "category": "Radyasyon biyofiziği / Radyasyon türü",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Gama ışını",
    "aliases": [
      "Gama ışını",
      "gamma ray"
    ],
    "definition": "Atom çekirdeği kaynaklı elektromanyetik iyonlaştırıcı radyasyondur.",
    "category": "Radyasyon biyofiziği / Radyasyon türü",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "X ışını",
    "aliases": [
      "X ışını",
      "X-ray"
    ],
    "definition": "Elektron uzayı kaynaklı elektromanyetik iyonlaştırıcı radyasyondur; tıbbi görüntülemede kullanılır.",
    "category": "Radyoloji/Radyasyon / Görüntüleme",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "general-surgery",
      "infectious-diseases",
      "internal-medicine",
      "orthopedics",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "inf-tuberculosis-001",
      "ortho-femoral-neck-001",
      "ortho-scaphoid-001",
      "pulm-pneumonia-001",
      "pulm-pneumothorax-001",
      "surg-sbo-001"
    ]
  },
  {
    "term": "Serbest radikal",
    "aliases": [
      "Eşleşmemiş elektron",
      "Serbest radikal",
      "free radical"
    ],
    "definition": "Dış orbitalinde eşleşmemiş elektron bulunduran ve bu nedenle yüksek reaktivite gösteren atom, atom grubu veya moleküldür.",
    "category": "Biyokimya / Oksidatif stres",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Reaktif oksijen türleri",
    "aliases": [
      "Reaktif oksijen türleri",
      "ROS",
      "ROT"
    ],
    "definition": "Oksijenden türeyen ve lipit, protein ve DNA hasarı oluşturabilen reaktif molekül grubudur.",
    "category": "Biyokimya / Oksidatif stres",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Süperoksit radikali",
    "aliases": [
      "Süperoksit radikali",
      "superoxide",
      "O2•−"
    ],
    "definition": "Oksijene tek elektron transferiyle oluşan, fizyolojik radikal başlangıcı sayılan ROS türüdür.",
    "category": "Biyokimya / ROS",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Hidrojen peroksit",
    "aliases": [
      "Hidrojen peroksit",
      "H2O2"
    ],
    "definition": "Radikal olmayan fakat hidroksil radikali oluşumuna kaynaklık edebilen reaktif oksijen türevidir.",
    "category": "Biyokimya / ROS",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Hidroksil radikali",
    "aliases": [
      "Fenton reaksiyonu / hidroksil radikali",
      "Hidroksil radikali",
      "Fenton reaksiyonu",
      "Fe2+ + H2O2",
      "•OH",
      "HO•"
    ],
    "definition": "Çok kısa ömürlü ve en reaktif ROS türlerinden biridir; DNA, lipid ve proteinlerde ağır hasar oluşturur.",
    "category": "Biyokimya / ROS",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Singlet oksijen",
    "aliases": [
      "Singlet oksijen",
      "1O2"
    ],
    "definition": "Enerji absorbsiyonu sonrası oksijenin uyarılmış formudur; dış orbital elektron spin düzeni değişmiştir.",
    "category": "Biyokimya / ROS",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Hipokloröz asit",
    "aliases": [
      "Hipokloröz asit",
      "HOCl"
    ],
    "definition": "Miyeloperoksidaz aracılığıyla nötrofillerde mikrobisidal etki oluşturan reaktif klor bileşiğidir.",
    "category": "Biyokimya/İmmünoloji / ROS antimikrobiyal",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Nitrik oksit",
    "aliases": [
      "Nitrik oksit",
      "NO"
    ],
    "definition": "Hem fizyolojik sinyal molekülü hem de reaktif nitrojen türlerinin öncülü olabilen serbest radikaldir.",
    "category": "Biyokimya / RNS",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Peroksinitrit",
    "aliases": [
      "Peroksinitrit",
      "ONOO−"
    ],
    "definition": "NO ile süperoksitin reaksiyonu sonucu oluşan güçlü oksidan nitrojen türevidir.",
    "category": "Biyokimya / RNS",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Spin kısıtlaması",
    "aliases": [
      "Spin kısıtlaması",
      "spin restriction"
    ],
    "definition": "Oksijenin elektron spin düzeni nedeniyle birçok organik molekülle doğrudan reaksiyona girmesinin kısıtlanmasıdır.",
    "category": "Biyokimya / Moleküler oksijen",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Geçiş metalleri",
    "aliases": [
      "Fe, Cu, Mn, Cr, Co, Ni, Mo",
      "Geçiş metalleri"
    ],
    "definition": "Eşleşmemiş elektron taşıyabilen fakat serbest radikal sayılmayan; radikal oluşumunda önemli rol oynayan metallerdir.",
    "category": "Biyokimya / Radikal oluşumu",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Fenton reaksiyonu",
    "aliases": [
      "Fe2+ + H2O2 → Fe3+ + OH− + •OH",
      "Fenton reaksiyonu"
    ],
    "definition": "Demir aracılığıyla H2O2’den hidroksil radikali oluşmasıdır.",
    "category": "Biyokimya / ROS üretimi",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Süperoksit dismutaz",
    "aliases": [
      "Süperoksit detoksifikasyonu",
      "Süperoksit dismutaz",
      "SOD"
    ],
    "definition": "Süperoksiti hidrojen peroksit ve oksijene dönüştüren antioksidan enzimdir.",
    "category": "Biyokimya / Antioksidan",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Katalaz",
    "aliases": [
      "H2O2 → H2O + O2",
      "Katalaz",
      "CAT"
    ],
    "definition": "Hidrojen peroksiti su ve oksijene parçalayan peroksizomal antioksidan enzimdir.",
    "category": "Biyokimya / Antioksidan",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Glutatyon peroksidaz",
    "aliases": [
      "Glutatyon peroksidaz",
      "GSH-Px",
      "GPx"
    ],
    "definition": "H2O2 ve organik peroksitleri indirgerken GSH kullanan selenyum bağımlı antioksidan enzimdir.",
    "category": "Biyokimya / Antioksidan",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Glutatyon",
    "aliases": [
      "İndirgenmiş glutatyon",
      "Glutatyon",
      "GSH"
    ],
    "definition": "Hücre içi temel indirgenmiş antioksidan tripeptittir; peroksit detoksifikasyonunda kullanılır.",
    "category": "Biyokimya / Antioksidan",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "NADPH",
    "aliases": [
      "reduced nicotinamide adenine dinucleotide phosphate",
      "NADPH"
    ],
    "definition": "Glutatyon redüktaz üzerinden GSSG’yi GSH’ye çevirerek antioksidan savunmayı sürdürür.",
    "category": "Biyokimya / PPP/Antioksidan",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Malondialdehit",
    "aliases": [
      "Malondialdehit",
      "MDA"
    ],
    "definition": "Lipid peroksidasyonu sonucu oluşan oksidatif hasar ürünlerinden biridir.",
    "category": "Biyokimya / Oksidatif hasar belirteci",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "4-Hidroksinonenal",
    "aliases": [
      "4-Hidroksinonenal",
      "4-HNE"
    ],
    "definition": "Lipid peroksidasyonu sonucu oluşan reaktif aldehit ürünüdür.",
    "category": "Biyokimya / Oksidatif hasar belirteci",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Timin glikol",
    "aliases": [
      "thymine glycol",
      "Timin glikol"
    ],
    "definition": "DNA baz oksidasyonu sonucu oluşabilen oksidatif DNA hasarı ürünüdür.",
    "category": "Biyokimya / DNA hasarı",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Sülfür radikalleri",
    "aliases": [
      "Protein oksidatif hasarı",
      "Sülfür radikalleri",
      "sulfur radicals"
    ],
    "definition": "Proteinlerde özellikle sülfür içeren aminoasitlerin oksidasyonu sonucu oluşabilecek radikal türleridir.",
    "category": "Biyokimya / Protein hasarı",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Melatonin",
    "aliases": [
      "Melatonin"
    ],
    "definition": "Epifiz kaynaklı hormon; antioksidan özellikleri ve gece/mavi ışıkla ilişkili ritim etkileriyle vurgulanır.",
    "category": "Biyokimya/Fizyoloji / Antioksidan-sirkadiyen",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Hiperglisemi",
    "aliases": [
      "hyperglycemia",
      "Hiperglisemi"
    ],
    "definition": "Kan glukozunun yüksek olmasıdır; diyabet başlığıyla birlikte ele alınır.",
    "category": "Biyokimya/Endokrin / Karbonhidrat metabolizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "im-dka-001"
    ]
  },
  {
    "term": "Diabetes mellitus Tip 1",
    "aliases": [
      "Diabetes mellitus Tip 1",
      "T1DM"
    ],
    "definition": "Otoimmün beta hücre yıkımı ve mutlak insülin eksikliğiyle seyreden diyabet formudur.",
    "category": "Endokrin/Biyokimya / Diyabet",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Diabetes mellitus Tip 2",
    "aliases": [
      "Diabetes mellitus Tip 2",
      "T2DM"
    ],
    "definition": "İnsülin direnci ve ilerleyici beta hücre disfonksiyonu ile seyreden hiperglisemi tablosudur.",
    "category": "Endokrin/Biyokimya / Diyabet",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Galaktozemi",
    "aliases": [
      "classic galactosemia",
      "Galaktozemi"
    ],
    "definition": "Galaktoz metabolizması bozukluğudur; klasik formda GALT eksikliğiyle galaktoz-1-fosfat birikir.",
    "category": "Biyokimya / Karbonhidrat metabolizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-classic-galactosemia-001",
      "pediatrics-hereditary-fructose-intolerance-001",
      "pediatrics-maple-syrup-urine-disease-001"
    ]
  },
  {
    "term": "GALT",
    "aliases": [
      "galactose-1-phosphate uridyltransferase",
      "GALT"
    ],
    "definition": "Klasik galaktozemide eksik olan enzimdir; galaktoz-1-fosfatın metabolize edilmesini sağlar.",
    "category": "Biyokimya / Galaktoz metabolizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-classic-galactosemia-001"
    ]
  },
  {
    "term": "Galaktokinaz eksikliği",
    "aliases": [
      "Galaktokinaz eksikliği",
      "GALK deficiency"
    ],
    "definition": "Galaktozun galaktoz-1-fosfata fosforilasyonunda bozukluk; katarakt daha ön planda olabilir.",
    "category": "Biyokimya / Galaktoz metabolizması",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Herediter fruktoz intoleransı",
    "aliases": [
      "Meyve suyu/fruktoz sonrası hipoglisemi",
      "Herediter fruktoz intoleransı",
      "HFI"
    ],
    "definition": "Aldolaz B eksikliğine bağlı fruktoz-1-fosfat birikimiyle hipoglisemi, karaciğer/böbrek hasarı ve kusma yapan hastalıktır.",
    "category": "Biyokimya / Fruktoz metabolizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-classic-galactosemia-001",
      "pediatrics-hereditary-fructose-intolerance-001",
      "pediatrics-von-gierke-gsd-001"
    ]
  },
  {
    "term": "Aldolaz B",
    "aliases": [
      "fructose-1-phosphate aldolase",
      "Aldolaz B"
    ],
    "definition": "Herediter fruktoz intoleransında eksik olan karaciğer enzimidir.",
    "category": "Biyokimya / Fruktoz metabolizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-hereditary-fructose-intolerance-001"
    ]
  },
  {
    "term": "Esansiyel fruktozüri",
    "aliases": [
      "Benign fruktoz metabolizma bozukluğu",
      "essential fructosuria",
      "Esansiyel fruktozüri"
    ],
    "definition": "Fruktokinaz eksikliğine bağlı genellikle benign fruktoz metabolizması bozukluğudur.",
    "category": "Biyokimya / Fruktoz metabolizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-hereditary-fructose-intolerance-001"
    ]
  },
  {
    "term": "Glikojen depo hastalığı",
    "aliases": [
      "Açlık hipoglisemisi + hepatomegali",
      "Glikojen depo hastalığı",
      "GSD"
    ],
    "definition": "Glikojen sentez veya yıkım enzimlerindeki defektlere bağlı hipoglisemi, hepatomegali veya kas semptomları oluşturabilen hastalık grubudur.",
    "category": "Biyokimya / Glikojen metabolizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-hereditary-fructose-intolerance-001",
      "pediatrics-von-gierke-gsd-001"
    ]
  },
  {
    "term": "Von Gierke hastalığı",
    "aliases": [
      "glucose-6-phosphatase deficiency",
      "Glukoz-6-fosfataz eksikliği",
      "Von Gierke hastalığı",
      "GSD I"
    ],
    "definition": "Glukoz-6-fosfataz eksikliğine bağlı ağır açlık hipoglisemisi, laktik asidoz, hiperürisemi ve hepatomegali ile giden GSD’dir.",
    "category": "Biyokimya / Glikojen depo hastalığı",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-von-gierke-gsd-001"
    ]
  },
  {
    "term": "Pompe hastalığı",
    "aliases": [
      "acid alpha-glucosidase deficiency",
      "Lizozomal asit alfa-glukozidaz",
      "Pompe hastalığı",
      "GSD II"
    ],
    "definition": "Lizozomal asit alfa-glukozidaz eksikliğiyle kardiyomegali ve kas zayıflığı yapabilen glikojen depo hastalığıdır.",
    "category": "Biyokimya / Glikojen depo hastalığı",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-von-gierke-gsd-001"
    ]
  },
  {
    "term": "McArdle hastalığı",
    "aliases": [
      "muscle glycogen phosphorylase deficiency",
      "Egzersiz intoleransı + miyoglobinüri",
      "McArdle hastalığı",
      "GSD V"
    ],
    "definition": "Kas glikojen fosforilaz eksikliğine bağlı egzersiz intoleransı, kramp ve miyoglobinüri yapabilir.",
    "category": "Biyokimya / Glikojen depo hastalığı",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-von-gierke-gsd-001"
    ]
  },
  {
    "term": "Laktoz intoleransı",
    "aliases": [
      "Süt sonrası gaz-diyare",
      "Laktoz intoleransı",
      "lactase deficiency"
    ],
    "definition": "Laktaz eksikliğine bağlı laktozun sindirilememesi; süt ürünleri sonrası şişkinlik, gaz ve osmotik diyare oluşturur.",
    "category": "Biyokimya/Gastroenteroloji / Disakkaridaz eksikliği",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-classic-galactosemia-001"
    ]
  },
  {
    "term": "Pentoz fosfat yolu",
    "aliases": [
      "Pentoz fosfat yolu",
      "HMP shunt",
      "PPP"
    ],
    "definition": "NADPH ve riboz-5-fosfat üreten metabolik yoldur; antioksidan savunmada GSH regenerasyonu için önemlidir.",
    "category": "Biyokimya / Karbonhidrat metabolizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "G6PD eksikliği",
    "aliases": [
      "glucose-6-phosphate dehydrogenase deficiency",
      "Fava/ilaç sonrası hemoliz",
      "G6PD eksikliği"
    ],
    "definition": "NADPH üretimi azalınca eritrositlerde oksidatif strese bağlı hemoliz gelişen X’e bağlı enzim eksikliğidir.",
    "category": "Biyokimya/Hematoloji / PPP",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-oxidative-stress-injury-001"
    ]
  },
  {
    "term": "Fenilketonüri",
    "aliases": [
      "Küf/ölü fare kokusu",
      "phenylketonuria",
      "Fenilketonüri",
      "PKU"
    ],
    "definition": "Fenilalanin hidroksilaz eksikliği veya BH4 metabolizması bozukluğu sonucu fenilalanin birikimiyle nörogelişimsel hasar yapan hastalıktır.",
    "category": "Biyokimya / Aminoasit metabolizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "internal-medicine-alkaptonuria-001",
      "pediatrics-albinism-001",
      "pediatrics-classic-galactosemia-001",
      "pediatrics-homocystinuria-001",
      "pediatrics-maple-syrup-urine-disease-001",
      "pediatrics-phenylketonuria-001"
    ]
  },
  {
    "term": "Fenilalanin hidroksilaz",
    "aliases": [
      "Fenilalanin hidroksilaz",
      "PAH"
    ],
    "definition": "Fenilalanini tirozine çeviren enzimdir; klasik PKU’da eksiktir.",
    "category": "Biyokimya / PKU",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-phenylketonuria-001"
    ]
  },
  {
    "term": "Tetrahidrobiyopterin",
    "aliases": [
      "Tetrahidrobiyopterin",
      "BH4"
    ],
    "definition": "Fenilalanin hidroksilaz, tirozin hidroksilaz ve triptofan hidroksilaz için kofaktördür.",
    "category": "Biyokimya / PKU varyantı",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-phenylketonuria-001"
    ]
  },
  {
    "term": "Dihidropteridin redüktaz",
    "aliases": [
      "Dihidropteridin redüktaz",
      "DHPR"
    ],
    "definition": "BH4 rejenerasyonunda görevli enzimdir; eksikliği atipik PKU nedeni olabilir.",
    "category": "Biyokimya / PKU varyantı",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Tirozin esansiyel hale gelmesi",
    "aliases": [
      "tyrosine becomes essential in PKU",
      "Tirozin esansiyel hale gelmesi"
    ],
    "definition": "Fenilalaninin tirozine dönüşememesi nedeniyle PKU’da tirozin diyetle alınması gereken göreceli esansiyel aminoasit olur.",
    "category": "Biyokimya / PKU",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Akçaağaç şurubu idrar hastalığı",
    "aliases": [
      "Akçaağaç şurubu idrar hastalığı",
      "Tatlı/akçaağaç kokulu idrar",
      "Maple syrup urine disease",
      "MSUD"
    ],
    "definition": "Dallı zincirli alfa-ketoasit dehidrogenaz eksikliğine bağlı lösin, izolösin ve valin birikimiyle nörotoksisite ve tatlı idrar kokusu yapan hastalıktır.",
    "category": "Biyokimya / Aminoasit metabolizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-maple-syrup-urine-disease-001",
      "pediatrics-phenylketonuria-001"
    ]
  },
  {
    "term": "Dallı zincirli alfa-ketoasit dehidrogenaz",
    "aliases": [
      "Dallı zincirli alfa-ketoasit dehidrogenaz",
      "BCKD"
    ],
    "definition": "Lösin, izolösin ve valin katabolizmasında görevli kompleks; MSUD’de eksiktir.",
    "category": "Biyokimya / MSUD",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-maple-syrup-urine-disease-001"
    ]
  },
  {
    "term": "Lösin",
    "aliases": [
      "leucine",
      "Lösin"
    ],
    "definition": "Dallı zincirli aminoasittir; MSUD’de birikir ve nörotoksisite açısından önemlidir.",
    "category": "Biyokimya / BCAA",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-maple-syrup-urine-disease-001"
    ]
  },
  {
    "term": "Alkaptonüri",
    "aliases": [
      "Homogentisik asit oksidaz",
      "alkaptonuria",
      "Alkaptonüri"
    ],
    "definition": "Homogentisik asit oksidaz eksikliğine bağlı homogentisik asit birikimi, koyulaşan idrar ve okronozisle giden hastalıktır.",
    "category": "Biyokimya / Fenilalanin-tirozin yolu",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "internal-medicine-alkaptonuria-001",
      "pediatrics-albinism-001",
      "pediatrics-homocystinuria-001",
      "pediatrics-phenylketonuria-001"
    ]
  },
  {
    "term": "Homogentisik asit oksidaz",
    "aliases": [
      "Homogentisik asit oksidaz",
      "homogentisate oxidase"
    ],
    "definition": "Alkaptonüride eksik olan enzimdir.",
    "category": "Biyokimya / Alkaptonüri",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-alkaptonuria-001"
    ]
  },
  {
    "term": "Okronozis",
    "aliases": [
      "ochronosis",
      "Okronozis"
    ],
    "definition": "Homogentisik asit birikimine bağlı bağ dokularda koyu pigmentasyon gelişmesidir.",
    "category": "Biyokimya/Patoloji / Alkaptonüri bulgusu",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-alkaptonuria-001"
    ]
  },
  {
    "term": "Albinizm",
    "aliases": [
      "Tirozinaz eksikliği",
      "Albinizm",
      "albinism"
    ],
    "definition": "Tirozinaz eksikliğine bağlı melanin sentez kusuru; hipopigmentasyon, fotofobi ve görme sorunları oluşturur.",
    "category": "Biyokimya/Dermatoloji / Tirozin metabolizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "internal-medicine-alkaptonuria-001",
      "pediatrics-albinism-001",
      "pediatrics-phenylketonuria-001"
    ]
  },
  {
    "term": "Tirozinaz",
    "aliases": [
      "tyrosinase",
      "Tirozinaz"
    ],
    "definition": "Melanin sentezinde tirozin metabolizmasını katalizleyen; albinizmde eksikliği vurgulanan enzimdir.",
    "category": "Biyokimya / Melanin sentezi",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-albinism-001"
    ]
  },
  {
    "term": "Tirozinemi Tip I",
    "aliases": [
      "fumarylacetoacetate hydrolase deficiency",
      "Tirozinemi Tip I"
    ],
    "definition": "Fumarilasetoasetat hidrolaz eksikliğine bağlı karaciğer yetmezliği, renal tübüler bozukluk ve succinylacetone birikimiyle giden tirozinemi formudur.",
    "category": "Biyokimya / Tirozin metabolizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "internal-medicine-alkaptonuria-001"
    ]
  },
  {
    "term": "Tirozinemi Tip II",
    "aliases": [
      "tyrosine transaminase deficiency",
      "Tirozinemi Tip II"
    ],
    "definition": "Tirozin transaminaz eksikliğiyle hipertirozinemi/tirozinüri; göz ve deri bulguları daha belirgin olabilir.",
    "category": "Biyokimya / Tirozin metabolizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Homosistinüri",
    "aliases": [
      "Lens aşağı-içe + tromboz",
      "homocystinuria",
      "Homosistinüri"
    ],
    "definition": "Sıklıkla sistationin beta-sentaz eksikliğine bağlı homosistein birikimi; lens dislokasyonu, tromboz ve marfanoid habitus yapabilir.",
    "category": "Biyokimya / Metiyonin metabolizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-homocystinuria-001",
      "pediatrics-maple-syrup-urine-disease-001"
    ]
  },
  {
    "term": "Sistationin beta-sentaz",
    "aliases": [
      "Sistationin beta-sentaz",
      "CBS"
    ],
    "definition": "Homosisteini sistationine dönüştüren B6 bağımlı enzim; klasik homosistinüride eksik olabilir.",
    "category": "Biyokimya / Homosistinüri",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-homocystinuria-001"
    ]
  },
  {
    "term": "Ektopia lentis",
    "aliases": [
      "lens dislocation",
      "Ektopia lentis"
    ],
    "definition": "Lensin normal yerinden ayrılmasıdır; homosistinüri ve Marfan ayrımında spot bulgudur.",
    "category": "Göz/Biyokimya / Homosistinüri bulgusu",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-homocystinuria-001"
    ]
  },
  {
    "term": "Nonketotik hiperglisinemi",
    "aliases": [
      "Nonketotik hiperglisinemi",
      "glycine encephalopathy"
    ],
    "definition": "Glisin yıkım sistemindeki defekte bağlı ağır nörolojik bulgularla giden aminoasit metabolizma bozukluğudur.",
    "category": "Biyokimya / Aminoasit metabolizması",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Üre döngüsü bozukluğu",
    "aliases": [
      "Üre döngüsü bozukluğu",
      "urea cycle disorder"
    ],
    "definition": "Amonyağın üreye çevrilmesindeki enzim defektleri sonucu hiperamonyemi ve ensefalopati gelişen hastalık grubudur.",
    "category": "Biyokimya / Aminoasit/azot metabolizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Ornitin transkarbamoilaz eksikliği",
    "aliases": [
      "Ornitin transkarbamoilaz eksikliği",
      "OTC deficiency"
    ],
    "definition": "X’e bağlı üre döngüsü bozukluğu; karbamoil fosfat birikimi ve orotik asit artışıyla ilişkilidir.",
    "category": "Biyokimya / Üre döngüsü",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Hartnup hastalığı",
    "aliases": [
      "Hartnup hastalığı",
      "Hartnup disease"
    ],
    "definition": "Nötral aminoasit taşıma defekti; triptofan emilimi azalır, pellagra benzeri bulgular olabilir.",
    "category": "Biyokimya / Aminoasit transportu",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Sistinozis",
    "aliases": [
      "Sistinozis",
      "cystinosis"
    ],
    "definition": "Lizozomal sistin transport defektiyle sistin kristal birikimi ve Fanconi sendromu yapabilen hastalıktır.",
    "category": "Biyokimya / Aminoasit/transport",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Tiamin eksikliği",
    "aliases": [
      "Vitamin B1 deficiency",
      "Tiamin eksikliği",
      "beriberi"
    ],
    "definition": "Pirüvat dehidrogenaz ve alfa-ketoglutarat dehidrogenaz gibi reaksiyonlarda kofaktör eksikliği; kuru/yaş beriberi ve Wernicke-Korsakoff ile ilişkilidir.",
    "category": "Biyokimya / Vitaminler",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-pellagra-001"
    ]
  },
  {
    "term": "Wernicke-Korsakoff sendromu",
    "aliases": [
      "Wernicke-Korsakoff sendromu",
      "Wernicke encephalopathy"
    ],
    "definition": "Tiamin eksikliğine bağlı konfüzyon, oftalmopleji ve ataksi ile başlayan; bellek bozukluğu/konfabülasyonla devam edebilen tablodur.",
    "category": "Nöroloji/Biyokimya / Vitamin B1",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Riboflavin",
    "aliases": [
      "Riboflavin",
      "Vitamin B2"
    ],
    "definition": "FAD ve FMN koenzimlerinin öncülüdür; enerji metabolizmasında oksidoredüksiyon reaksiyonlarına katılır.",
    "category": "Biyokimya / Vitaminler",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Niasin eksikliği",
    "aliases": [
      "3D: dermatit-diyare-demans",
      "Pellagra / B3 eksikliği",
      "Vitamin B3 deficiency",
      "Niasin eksikliği",
      "B3 eksikliği",
      "pellagra"
    ],
    "definition": "NAD/NADP öncülü eksikliği; dermatit, diyare ve demans triadıyla karakterizedir.",
    "category": "Biyokimya / Vitaminler",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-pellagra-001",
      "internal-medicine-scurvy-001"
    ]
  },
  {
    "term": "Piridoksin",
    "aliases": [
      "Piridoksin",
      "Vitamin B6"
    ],
    "definition": "Transaminasyon, dekarboksilasyon ve hem sentezinde kofaktör; izoniazid kullanımıyla eksikliği görülebilir.",
    "category": "Biyokimya/Farmakoloji / Vitaminler",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-homocystinuria-001"
    ]
  },
  {
    "term": "Folat eksikliği",
    "aliases": [
      "Megaloblastik anemi + nörolojik yok",
      "Vitamin B9 deficiency",
      "Folat eksikliği"
    ],
    "definition": "DNA sentez bozukluğu ve megaloblastik anemi yapar; nöral tüp defekti riskiyle ilişkilidir.",
    "category": "Biyokimya/Hematoloji / Vitaminler",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Kobalamin eksikliği",
    "aliases": [
      "Vitamin B12 deficiency",
      "Kobalamin eksikliği"
    ],
    "definition": "DNA sentez bozukluğu, megaloblastik anemi ve subakut kombine dejenerasyon gibi nörolojik bulgular yapabilir.",
    "category": "Biyokimya/Hematoloji / Vitaminler",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Askorbik asit eksikliği",
    "aliases": [
      "Diş eti kanaması + yara iyileşmesi bozukluğu",
      "Skorbüt / C vitamini eksikliği",
      "Askorbik asit eksikliği",
      "Vitamin C deficiency",
      "C vitamini eksikliği",
      "skorbüt",
      "scurvy"
    ],
    "definition": "Kollajen hidroksilasyonu bozulduğu için diş eti kanaması, peteşi, yara iyileşme bozukluğu ve kemik bulguları yapar.",
    "category": "Biyokimya / Vitaminler",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-pellagra-001",
      "internal-medicine-scurvy-001"
    ]
  },
  {
    "term": "Vitamin D eksikliği",
    "aliases": [
      "Vitamin D eksikliği",
      "osteomalacia",
      "rickets"
    ],
    "definition": "Kalsiyum-fosfor homeostazı bozulur; çocukta raşitizm, erişkinde osteomalaziye yol açar.",
    "category": "Biyokimya/Endokrin / Vitaminler",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Vitamin K eksikliği",
    "aliases": [
      "phylloquinone deficiency",
      "Vitamin K eksikliği"
    ],
    "definition": "Gama-karboksilasyon bozulması nedeniyle faktör II, VII, IX, X ve protein C/S aktivasyonu azalır; kanama eğilimi yapar.",
    "category": "Biyokimya/Hematoloji / Vitaminler",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Demir eksikliği anemisi",
    "aliases": [
      "Demir eksikliği anemisi",
      "iron deficiency anemia"
    ],
    "definition": "Demir depolarının azalmasıyla mikrositer hipokrom anemi, düşük ferritin ve yüksek TIBC ile seyreden anemidir.",
    "category": "Hematoloji/Biyokimya / Eser element",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-iron-deficiency-anemia-001",
      "internal-medicine-hemochromatosis-001"
    ]
  },
  {
    "term": "Transferrin",
    "aliases": [
      "iron transport protein",
      "Transferrin"
    ],
    "definition": "Kanda demir taşıyan proteindir; demir eksikliğinde TIBC genellikle artar.",
    "category": "Hematoloji/Biyokimya / Demir metabolizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "im-iron-deficiency-anemia-001",
      "internal-medicine-hemochromatosis-001"
    ]
  },
  {
    "term": "Hepsidin",
    "aliases": [
      "Hepsidin",
      "hepcidin"
    ],
    "definition": "Demir emilimi ve makrofajlardan demir salınımını ferroportin üzerinden azaltan karaciğer kaynaklı hormondur.",
    "category": "Biyokimya/Hematoloji / Demir metabolizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "internal-medicine-hemochromatosis-001"
    ]
  },
  {
    "term": "Hemokromatozis",
    "aliases": [
      "hemochromatosis",
      "Hemokromatozis",
      "Bronz diyabet"
    ],
    "definition": "Aşırı demir birikimine bağlı karaciğer, pankreas, kalp ve deri tutulumu yapabilen demir yüklenme hastalığıdır.",
    "category": "Biyokimya/Hematoloji / Demir metabolizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "internal-medicine-hemochromatosis-001"
    ]
  },
  {
    "term": "Wilson hastalığı",
    "aliases": [
      "hepatolenticular degeneration",
      "Kayser-Fleischer halkası",
      "Wilson hastalığı"
    ],
    "definition": "Bakır atılım bozukluğu sonucu karaciğer, beyin ve korneada bakır birikimi; Kayser-Fleischer halkasıyla ilişkilidir.",
    "category": "Biyokimya/Nöroloji / Bakır metabolizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "neurology",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "internal-medicine-hemochromatosis-001"
    ]
  },
  {
    "term": "Menkes hastalığı",
    "aliases": [
      "kinky hair disease",
      "Menkes hastalığı",
      "Kinky hair"
    ],
    "definition": "Bakır emilim/taşınma bozukluğu; kıvırcık/kırılgan saç, nörolojik bozukluk ve bağ dokusu sorunları yapabilir.",
    "category": "Biyokimya/Pediatri / Bakır metabolizması",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "internal-medicine-hemochromatosis-001"
    ]
  },
  {
    "term": "Çinko eksikliği",
    "aliases": [
      "Çinko eksikliği",
      "zinc deficiency"
    ],
    "definition": "Dermatit, alopesi, diyare, yara iyileşme bozukluğu ve immün fonksiyon bozukluğu ile ilişkilidir.",
    "category": "Biyokimya/Dermatoloji / Eser element",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Akrodermatitis enteropatika",
    "aliases": [
      "acrodermatitis enteropathica",
      "Akrodermatitis enteropatika"
    ],
    "definition": "Çinko emilim defektine bağlı periorifisiyel/akral dermatit, alopesi ve diyareyle seyreden hastalıktır.",
    "category": "Biyokimya/Dermatoloji / Çinko metabolizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Şilomikron",
    "aliases": [
      "chylomicron",
      "Şilomikron"
    ],
    "definition": "Diyet trigliseridlerini bağırsaktan periferik dokulara taşıyan büyük lipoproteindir; Apo B-48 içerir.",
    "category": "Biyokimya / Lipoprotein",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "VLDL",
    "aliases": [
      "very-low-density lipoprotein",
      "VLDL"
    ],
    "definition": "Karaciğer kaynaklı trigliseridleri periferik dokulara taşıyan lipoproteindir.",
    "category": "Biyokimya / Lipoprotein",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "LDL",
    "aliases": [
      "low-density lipoprotein",
      "LDL"
    ],
    "definition": "Kolesterolü periferik dokulara taşıyan aterojenik lipoproteindir; Apo B-100 içerir.",
    "category": "Tıbbi Biyokimya / Lipoprotein",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-familial-hypercholesterolemia-001",
      "internal-medicine-tangier-disease-001"
    ]
  },
  {
    "term": "HDL",
    "aliases": [
      "high-density lipoprotein",
      "HDL"
    ],
    "definition": "Kolesterolü periferden karaciğere taşıyan ters kolesterol taşıma lipoproteinidir; Apo A-I içerir.",
    "category": "Tıbbi Biyokimya / Lipoprotein",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-tangier-disease-001"
    ]
  },
  {
    "term": "Apo A-I",
    "aliases": [
      "Apolipoprotein A-I",
      "LCAT aktivatörü",
      "Apo A-I"
    ],
    "definition": "HDL’nin temel yapısal proteini ve LCAT aktivatörüdür.",
    "category": "Biyokimya / Apolipoprotein",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Apo B-48",
    "aliases": [
      "Şilomikron yapısal proteini",
      "Apolipoprotein B-48",
      "Apo B-48"
    ],
    "definition": "Bağırsakta sentezlenen ve şilomikronların yapısında bulunan apolipoproteindir.",
    "category": "Biyokimya / Apolipoprotein",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Apo B-100",
    "aliases": [
      "Apolipoprotein B-100",
      "LDL reseptör ligandı",
      "Apo B-100"
    ],
    "definition": "VLDL, IDL ve LDL yapısında bulunur; LDL reseptörü için ligand görevi görür.",
    "category": "Biyokimya / Apolipoprotein",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Apo C-II",
    "aliases": [
      "Apolipoprotein C-II",
      "LPL aktivatörü",
      "Apo C-II"
    ],
    "definition": "Lipoprotein lipazın temel aktivatörüdür; şilomikron/VLDL trigliseridlerinin yıkımında gereklidir.",
    "category": "Biyokimya / Apolipoprotein",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Apo C-III",
    "aliases": [
      "Apolipoprotein C-III",
      "Apo C-III"
    ],
    "definition": "Lipoprotein lipaz aktivitesini inhibe eden apolipoproteindir.",
    "category": "Biyokimya / Apolipoprotein",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Apo E",
    "aliases": [
      "Apolipoprotein E",
      "Apo E"
    ],
    "definition": "Şilomikron artıkları ve IDL’nin hepatik reseptörlerce tanınmasını sağlayan liganddır; beyinde kolesterol taşıması ve Alzheimer ilişkisi vurgulanır.",
    "category": "Biyokimya/Nöroloji / Apolipoprotein",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "neurology"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Apo(a)",
    "aliases": [
      "Apolipoprotein(a)",
      "Apo(a)",
      "Lp(a)"
    ],
    "definition": "Lp(a) yapısında bulunan ve proaterojenik, proinflamatuar, antifibrinolitik kabul edilen apolipoproteindir.",
    "category": "Tıbbi Biyokimya / Apolipoprotein",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Lipoprotein lipaz",
    "aliases": [
      "Lipoprotein lipaz",
      "LPL"
    ],
    "definition": "Şilomikron ve VLDL trigliseridlerini hidrolize eden; Apo C-II ile aktive edilen enzimdir.",
    "category": "Biyokimya / Lipid metabolizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "LCAT",
    "aliases": [
      "lecithin-cholesterol acyltransferase",
      "LCAT"
    ],
    "definition": "HDL üzerinde serbest kolesterolü esterleştiren; Apo A-I tarafından aktive edilen enzimdir.",
    "category": "Biyokimya / HDL metabolizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "internal-medicine-familial-hypercholesterolemia-001",
      "internal-medicine-tangier-disease-001"
    ]
  },
  {
    "term": "CETP",
    "aliases": [
      "cholesteryl ester transfer protein",
      "Apo D",
      "CETP"
    ],
    "definition": "Kolesterol esterleri ve trigliseridlerin lipoproteinler arasında transferinde rol oynar.",
    "category": "Biyokimya / Lipid transferi",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "ABCA1",
    "aliases": [
      "ATP-binding cassette transporter A1",
      "ABCA1"
    ],
    "definition": "Kolesterolün Apo A-I’e aktarılması ve HDL oluşumunda görevli transporterdır; Tangier hastalığında defektlidir.",
    "category": "Biyokimya / HDL metabolizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "internal-medicine-tangier-disease-001"
    ]
  },
  {
    "term": "Ailesel hiperkolesterolemi",
    "aliases": [
      "familial hypercholesterolemia",
      "Tendon ksantom + LDL yüksek",
      "Ailesel hiperkolesterolemi",
      "Type IIa"
    ],
    "definition": "LDL reseptörü veya Apo B-100 ilişkili bozukluklarla yüksek LDL, tendon ksantomları ve erken ateroskleroz yapan hastalıktır.",
    "category": "Tıbbi Biyokimya / Dislipidemi",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-familial-hypercholesterolemia-001",
      "internal-medicine-tangier-disease-001"
    ]
  },
  {
    "term": "Tangier hastalığı",
    "aliases": [
      "Turuncu tonsil + çok düşük HDL",
      "Tangier hastalığı",
      "Tangier disease"
    ],
    "definition": "ABCA1 defektiyle çok düşük HDL, turuncu tonsiller ve nöropati yapabilen bozukluktur.",
    "category": "Biyokimya / HDL bozukluğu",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-familial-hypercholesterolemia-001",
      "internal-medicine-tangier-disease-001"
    ]
  },
  {
    "term": "Abetalipoproteinemi",
    "aliases": [
      "Apo B içeren lipoprotein yokluğu + akantositoz",
      "Bassen-Kornzweig disease",
      "Abetalipoproteinemi"
    ],
    "definition": "Apo B içeren lipoproteinlerin oluşum bozukluğu; yağ malabsorpsiyonu, akantositoz ve nörolojik bulgular yapar.",
    "category": "Biyokimya/Gastroenteroloji / Lipoprotein bozukluğu",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-familial-hypercholesterolemia-001",
      "internal-medicine-tangier-disease-001"
    ]
  },
  {
    "term": "LCAT eksikliği",
    "aliases": [
      "Korneal opasite + hemoliz + renal hastalık",
      "familial LCAT deficiency",
      "LCAT eksikliği"
    ],
    "definition": "HDL kolesterol esterleşmesi bozulur; korneal opasite, hemolitik anemi ve renal hastalık yapabilir.",
    "category": "Biyokimya / HDL bozukluğu",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-familial-hypercholesterolemia-001",
      "internal-medicine-tangier-disease-001"
    ]
  },
  {
    "term": "Balık gözü hastalığı",
    "aliases": [
      "Balık gözü hastalığı",
      "fish-eye disease"
    ],
    "definition": "Parsiyel LCAT eksikliğinin korneal opasite ağırlıklı formudur.",
    "category": "Biyokimya/Göz / HDL bozukluğu",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Wolman hastalığı",
    "aliases": [
      "lysosomal acid lipase deficiency",
      "Wolman hastalığı"
    ],
    "definition": "Lizozomal asit lipaz eksikliğiyle kolesterol ester ve trigliserid birikimi; hepatosplenomegali ve adrenal kalsifikasyon yapabilir.",
    "category": "Biyokimya / Lipid depo hastalığı",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Ksantom",
    "aliases": [
      "xanthoma",
      "Ksantom"
    ],
    "definition": "Deride/tendonlarda lipid yüklü makrofaj birikimine bağlı sarımsı lezyonlardır.",
    "category": "Dermatoloji/Biyokimya / Dislipidemi bulgusu",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "internal-medicine-familial-hypercholesterolemia-001",
      "internal-medicine-tangier-disease-001",
      "pediatrics-von-gierke-gsd-001"
    ]
  },
  {
    "term": "Korneal arkus",
    "aliases": [
      "arcus cornealis",
      "Korneal arkus"
    ],
    "definition": "Korneada lipid birikimine bağlı halka görünümüdür; genç yaşta dislipidemi açısından anlamlıdır.",
    "category": "Göz/Biyokimya / Dislipidemi bulgusu",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-tangier-disease-001"
    ]
  },
  {
    "term": "Atrofi",
    "aliases": [
      "atrophy",
      "Atrofi"
    ],
    "definition": "Hücre boyutunda ve doku/organ hacminde azalma; iş yükü azalması, denervasyon, iskemi veya beslenme bozukluğuyla gelişebilir.",
    "category": "Patoloji / Adaptasyon",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Hipertrofi",
    "aliases": [
      "hypertrophy",
      "Hipertrofi"
    ],
    "definition": "Hücre boyutunun artmasıyla organ/doku büyümesidir; bölünemeyen hücrelerde belirgindir.",
    "category": "Patoloji / Adaptasyon",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "cv-hocm-001"
    ]
  },
  {
    "term": "Hiperplazi",
    "aliases": [
      "hyperplasia",
      "Hiperplazi"
    ],
    "definition": "Hücre sayısının artmasıyla doku/organ büyümesidir; hormonal veya kompansatuar olabilir.",
    "category": "Patoloji / Adaptasyon",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Metaplazi",
    "aliases": [
      "metaplasia",
      "Metaplazi"
    ],
    "definition": "Bir diferansiye hücre tipinin başka bir diferansiye hücre tipiyle yer değiştirmesidir; kronik irritasyona adaptif yanıttır.",
    "category": "Patoloji / Adaptasyon",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Displazi",
    "aliases": [
      "dysplasia",
      "Displazi"
    ],
    "definition": "Epitelde düzensiz büyüme ve sitolojik atipiyle karakterize premalign değişikliktir.",
    "category": "Patoloji / Prekanseröz değişim",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Reversibl hücre zedelenmesi",
    "aliases": [
      "Reversibl hücre zedelenmesi",
      "reversible cell injury"
    ],
    "definition": "Hasar etkeni ortadan kalkarsa hücrenin normale dönebileceği; hücresel şişme ve yağlanma gibi bulgularla giden zedelenmedir.",
    "category": "Patoloji / Hücre zedelenmesi",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "İrreversibl hücre zedelenmesi",
    "aliases": [
      "İrreversibl hücre zedelenmesi",
      "irreversible cell injury"
    ],
    "definition": "Mitokondriyal fonksiyon kaybı ve membran hasarı kritik eşiği aşınca geri dönüşsüz hücre ölümü gelişmesidir.",
    "category": "Patoloji / Hücre zedelenmesi",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Hidropik değişiklik",
    "aliases": [
      "Hidropik değişiklik",
      "cellular swelling",
      "hydropic change"
    ],
    "definition": "ATP azalmasına bağlı iyon-su dengesi bozulunca hücre şişmesiyle görülen reversibl hasar bulgusudur.",
    "category": "Patoloji / Reversibl hasar",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Yağlanma",
    "aliases": [
      "fatty change",
      "steatosis",
      "Yağlanma"
    ],
    "definition": "Hücre içinde trigliserid birikimidir; karaciğerde hipoksi, alkol ve metabolik bozukluklarla görülür.",
    "category": "Patoloji / Hücre içi birikim",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Nekroz",
    "aliases": [
      "necrosis",
      "Nekroz"
    ],
    "definition": "Geri dönüşsüz hücre hasarı sonrası membran bütünlüğü kaybı ve inflamasyonla seyreden patolojik hücre ölümüdür.",
    "category": "Patoloji / Hücre ölümü",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "infectious-diseases",
      "internal-medicine",
      "neurology",
      "orthopedics",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cardiovascular-coagulative-necrosis-mi-001",
      "infectious-diseases-caseating-granuloma-tb-001",
      "internal-medicine-acute-radiation-syndrome-001",
      "internal-medicine-pellagra-001",
      "neurology-liquefactive-necrosis-brain-001",
      "ortho-femoral-neck-001",
      "ortho-scaphoid-001",
      "pulmonology-lightning-apnea-001"
    ]
  },
  {
    "term": "Apoptoz",
    "aliases": [
      "Kaspaz + inflamasyon yok",
      "programmed cell death",
      "Apoptoz"
    ],
    "definition": "Kaspaz aracılı, kontrollü hücre ölümü; membran bütünlüğü korunur ve genellikle inflamasyon gelişmez.",
    "category": "Patoloji / Hücre ölümü",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Koagülasyon nekrozu",
    "aliases": [
      "İskemi + beyin dışı infarkt",
      "coagulative necrosis",
      "Koagülasyon nekrozu"
    ],
    "definition": "Doku mimarisinin bir süre korunduğu nekroz tipidir; beyin dışı iskemik infarktlarda tipiktir.",
    "category": "Patoloji / Nekroz tipi",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine",
      "neurology"
    ],
    "relatedCaseIds": [
      "cardiovascular-coagulative-necrosis-mi-001",
      "neurology-liquefactive-necrosis-brain-001"
    ]
  },
  {
    "term": "Likefaksiyon nekrozu",
    "aliases": [
      "liquefactive necrosis",
      "Likefaksiyon nekrozu",
      "Beyin infarktı"
    ],
    "definition": "Enzimatik sindirimle dokunun sıvılaşmasıdır; beyin infarktı ve apse için tipiktir.",
    "category": "Patoloji / Nekroz tipi",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine",
      "neurology"
    ],
    "relatedCaseIds": [
      "cardiovascular-coagulative-necrosis-mi-001",
      "neurology-liquefactive-necrosis-brain-001"
    ]
  },
  {
    "term": "Kazeifikasyon nekrozu",
    "aliases": [
      "Tüberküloz + peynirsi nekroz",
      "Kazeifikasyon nekrozu",
      "caseous necrosis"
    ],
    "definition": "Peynirsi görünümde nekroz tipidir; tüberküloz granülomlarında klasik olarak görülür.",
    "category": "Patoloji / Nekroz tipi",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine",
      "neurology"
    ],
    "relatedCaseIds": [
      "cardiovascular-coagulative-necrosis-mi-001",
      "neurology-liquefactive-necrosis-brain-001"
    ]
  },
  {
    "term": "Yağ nekrozu",
    "aliases": [
      "Pankreatit + sabunlaşma",
      "fat necrosis",
      "Yağ nekrozu"
    ],
    "definition": "Adipoz dokuda lipaz etkisiyle yağ asitleri ve kalsiyum sabunları oluşmasıdır; akut pankreatit ve meme travmasında görülür.",
    "category": "Patoloji / Nekroz tipi",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine",
      "neurology"
    ],
    "relatedCaseIds": [
      "cardiovascular-coagulative-necrosis-mi-001",
      "neurology-liquefactive-necrosis-brain-001"
    ]
  },
  {
    "term": "Fibrinoid nekroz",
    "aliases": [
      "Vaskülit/malign HTN + damar duvarı",
      "fibrinoid necrosis",
      "Fibrinoid nekroz"
    ],
    "definition": "Damar duvarında immün kompleks ve fibrin benzeri materyal birikimiyle görülen nekroz tipidir.",
    "category": "Patoloji / Nekroz tipi",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases",
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "infectious-diseases-caseating-granuloma-tb-001"
    ]
  },
  {
    "term": "Piknoz",
    "aliases": [
      "pyknosis",
      "Piknoz"
    ],
    "definition": "Nekrozda çekirdeğin küçülüp koyulaşmasıdır.",
    "category": "Patoloji / Nükleer değişiklik",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Karyoreksis",
    "aliases": [
      "karyorrhexis",
      "Karyoreksis"
    ],
    "definition": "Nekrozda çekirdeğin parçalanmasıdır.",
    "category": "Patoloji / Nükleer değişiklik",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Karyolizis",
    "aliases": [
      "Karyolizis",
      "karyolysis"
    ],
    "definition": "Nekrozda çekirdek DNA’sının çözünmesi ve soluklaşmasıdır.",
    "category": "Patoloji / Nükleer değişiklik",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Kaspaz",
    "aliases": [
      "caspase",
      "Kaspaz"
    ],
    "definition": "Apoptozda proteinleri parçalayan sistein proteaz ailesidir.",
    "category": "Patoloji / Apoptoz mekanizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Sitokrom c",
    "aliases": [
      "cytochrome c",
      "Sitokrom c"
    ],
    "definition": "Mitokondriden sitoplazmaya salınarak intrinsik apoptoz yolunu aktive eden proteindir.",
    "category": "Patoloji / Apoptoz mekanizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Bcl-2",
    "aliases": [
      "B-cell lymphoma 2",
      "Bcl-2"
    ],
    "definition": "Mitokondriyal apoptoz yolunu inhibe eden anti-apoptotik proteindir.",
    "category": "Patoloji / Apoptoz regülasyonu",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "p53",
    "aliases": [
      "tumor suppressor p53",
      "p53"
    ],
    "definition": "DNA hasarı sonrası hücre siklus durdurma, onarım veya apoptozu tetikleyen tümör baskılayıcı proteindir.",
    "category": "Patoloji/Genetik / Hücre döngüsü",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Nekroptozis",
    "aliases": [
      "Nekroptozis",
      "necroptosis"
    ],
    "definition": "Morfolojik olarak nekroza benzeyen ancak düzenlenmiş/programlı hücre ölüm yoludur.",
    "category": "Patoloji / Regüle hücre ölümü",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Piroptozis",
    "aliases": [
      "İnflammazom + IL-1β",
      "Piroptozis",
      "pyroptosis"
    ],
    "definition": "İnflamatuvar kaspazlar ve inflammazomla ilişkili, IL-1β/IL-18 salınımıyla seyreden hücre ölümüdür.",
    "category": "Patoloji/İmmünoloji / Regüle hücre ölümü",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Ferroptozis",
    "aliases": [
      "Demir + lipid peroksidasyonu",
      "Ferroptozis",
      "ferroptosis"
    ],
    "definition": "Demir bağımlı lipid peroksidasyonu sonucu gelişen regüle hücre ölümü tipidir.",
    "category": "Patoloji/Biyokimya / Regüle hücre ölümü",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Lipofuscin",
    "aliases": [
      "wear-and-tear pigment",
      "Yaşlanma pigmenti",
      "Lipofuscin"
    ],
    "definition": "Yaşlanma ve oksidatif stresle ilişkili sarı-kahverengi, sindirilemeyen lipid-protein pigmentidir.",
    "category": "Patoloji / Hücre içi birikim",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Hemosiderin",
    "aliases": [
      "Hemosiderin"
    ],
    "definition": "Demir içeren altın-kahverengi pigmenttir; lokal kanama veya sistemik demir yüklenmesinde birikir.",
    "category": "Patoloji/Hematoloji / Pigment",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Distrofik kalsifikasyon",
    "aliases": [
      "dystrophic calcification",
      "Hasarlı doku + normal Ca",
      "Distrofik kalsifikasyon"
    ],
    "definition": "Serum kalsiyumu normal iken ölü/hasarlı dokuda kalsiyum birikmesidir.",
    "category": "Patoloji / Kalsifikasyon",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Metastatik kalsifikasyon",
    "aliases": [
      "Normal doku + hiperkalsemi",
      "Metastatik kalsifikasyon",
      "metastatic calcification"
    ],
    "definition": "Hiperkalsemiye bağlı normal dokularda kalsiyum birikimidir.",
    "category": "Patoloji / Kalsifikasyon",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Amiloid",
    "aliases": [
      "Kongo kırmızısı + elma yeşili",
      "Amiloid",
      "amyloid"
    ],
    "definition": "Beta-pleated sheet yapıda ekstraselüler protein birikimidir; Kongo kırmızısı ve elma yeşili birefringence ile tanınır.",
    "category": "Patoloji / Protein birikimi",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Akut inflamasyon",
    "aliases": [
      "acute inflammation",
      "Akut inflamasyon"
    ],
    "definition": "Dakika-saatler içinde başlayan, vazodilatasyon, geçirgenlik artışı ve nötrofil göçüyle karakterize inflamatuvar yanıttır.",
    "category": "Patoloji / İnflamasyon",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "general-surgery",
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "surg-diverticulitis-001"
    ]
  },
  {
    "term": "Kronik inflamasyon",
    "aliases": [
      "chronic inflammation",
      "Kronik inflamasyon"
    ],
    "definition": "Uzun süren inflamatuvar yanıt; makrofaj, lenfosit, plazma hücresi, doku yıkımı ve onarım birlikte görülür.",
    "category": "Patoloji / İnflamasyon",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases",
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "im-iron-deficiency-anemia-001",
      "infectious-diseases-caseating-granuloma-tb-001"
    ]
  },
  {
    "term": "Granülom",
    "aliases": [
      "granuloma",
      "Granülom"
    ],
    "definition": "Aktive makrofaj/epiteloid histiyosit kümelerinden oluşan kronik inflamasyon paterni; TB ve yabancı cisimlerde görülür.",
    "category": "Patoloji / Kronik inflamasyon",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases",
      "internal-medicine",
      "neurology"
    ],
    "relatedCaseIds": [
      "infectious-diseases-caseating-granuloma-tb-001",
      "neurology-liquefactive-necrosis-brain-001"
    ]
  },
  {
    "term": "Makrofaj",
    "aliases": [
      "Makrofaj/lenfosit/plazma hücresi",
      "Kronik inflamasyonun ana hücresi",
      "plazma hücresi",
      "macrophage",
      "Makrofaj",
      "lenfosit"
    ],
    "definition": "Dokulara geçen monositlerden gelişen fagositik hücre; kronik inflamasyonun ana hücresidir.",
    "category": "Patoloji/İmmünoloji / İnflamasyon hücresi",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases",
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "infectious-diseases-caseating-granuloma-tb-001",
      "infectious-diseases-hiv-aids-001",
      "internal-medicine-acute-radiation-syndrome-001",
      "internal-medicine-systemic-lupus-erythematosus-001"
    ]
  },
  {
    "term": "Nötrofil",
    "aliases": [
      "Akut inflamasyonun ana hücresi",
      "neutrophil",
      "Nötrofil"
    ],
    "definition": "Akut bakteriyel inflamasyon ve erken yara iyileşmesinde baskın olan polimorfonükleer lökosittir.",
    "category": "Patoloji/İmmünoloji / İnflamasyon hücresi",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "general-surgery",
      "internal-medicine",
      "neurology",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "im-dka-001",
      "internal-medicine-azathioprine-tpmt-toxicity-001",
      "neurology-liquefactive-necrosis-brain-001",
      "pediatrics-albinism-001",
      "surg-appendicitis-001"
    ]
  },
  {
    "term": "Eozinofil",
    "aliases": [
      "Parazit/alerji/astım",
      "eosinophil",
      "Eozinofil",
      "Parazit",
      "alerji",
      "astım"
    ],
    "definition": "Paraziter enfeksiyonlar ve alerjik hastalıklarla ilişkili granülosittir.",
    "category": "Patoloji/İmmünoloji / İnflamasyon hücresi",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "infectious-diseases",
      "internal-medicine",
      "pediatrics",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cv-pulmonary-edema-001",
      "inf-malaria-001",
      "ped-pyloric-stenosis-001",
      "pulm-copd-exacerbation-001",
      "pulm-ipf-uip-001",
      "pulmonology-pulmonary-embolism-dvt-001"
    ]
  },
  {
    "term": "Histamin",
    "aliases": [
      "histamine",
      "Histamin"
    ],
    "definition": "Mast hücrelerinden salınan, vazodilatasyon ve damar geçirgenliği artışında erken mediatördür.",
    "category": "Patoloji/İmmünoloji / Kimyasal mediatör",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Prostaglandin",
    "aliases": [
      "Prostaglandin",
      "PG"
    ],
    "definition": "Arachidonik asit metabolitleri; ağrı, ateş, vazodilatasyon ve inflamasyonda rol oynar.",
    "category": "Patoloji/Farmakoloji / Kimyasal mediatör",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "cv-pulmonary-edema-001",
      "im-primary-hyperparathyroidism-001",
      "internal-medicine-pellagra-001",
      "pediatrics-homocystinuria-001"
    ]
  },
  {
    "term": "Lökotrien",
    "aliases": [
      "Lökotrien",
      "LT"
    ],
    "definition": "Arachidonik asit metabolitleri; bronkokonstriksiyon, damar geçirgenliği ve kemotaksiyle ilişkilidir.",
    "category": "Patoloji/Farmakoloji / Kimyasal mediatör",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "TNF-α",
    "aliases": [
      "tumor necrosis factor alpha",
      "TNF-α"
    ],
    "definition": "Makrofaj kaynaklı proinflamatuvar sitokin; ateş, endotelyal aktivasyon ve kaşeksi/septik şokta rol oynar.",
    "category": "Patoloji/İmmünoloji / Sitokin",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "IL-1",
    "aliases": [
      "interleukin-1",
      "IL-1"
    ],
    "definition": "Ateş, lökosit aktivasyonu ve akut faz yanıtında rol alan proinflamatuvar sitokindir.",
    "category": "Patoloji/İmmünoloji / Sitokin",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Kemotaksi",
    "aliases": [
      "chemotaxis",
      "Kemotaksi"
    ],
    "definition": "Lökositlerin kimyasal mediatörlere doğru yönlendirilmiş hareketidir.",
    "category": "Patoloji / İnflamasyon basamağı",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Opsonizasyon",
    "aliases": [
      "Opsonizasyon",
      "opsonization"
    ],
    "definition": "Mikroorganizmanın fagositozu kolaylaştıracak moleküllerle kaplanmasıdır; IgG ve C3b önemlidir.",
    "category": "İmmünoloji/Patoloji / Fagositoz",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Püy",
    "aliases": [
      "Püy",
      "pus"
    ],
    "definition": "Nötrofil, nekrotik debris ve sıvıdan oluşan irin materyalidir.",
    "category": "Patoloji / Akut inflamasyon",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Abse",
    "aliases": [
      "abscess",
      "Abse"
    ],
    "definition": "Püy içeren lokalize süpüratif inflamasyon odağıdır.",
    "category": "Patoloji / Akut inflamasyon",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Primer yara iyileşmesi",
    "aliases": [
      "primary intention healing",
      "Primer yara iyileşmesi"
    ],
    "definition": "Temiz, kenarları yaklaşmış yaralarda minimal granülasyon dokusu ve küçük skarla iyileşmedir.",
    "category": "Patoloji / Doku tamiri",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Sekonder yara iyileşmesi",
    "aliases": [
      "Daha fazla granülasyon, inflamasyon, kontraksiyon ve skar",
      "secondary intention healing",
      "Sekonder yara iyileşmesi"
    ],
    "definition": "Geniş doku kayıplarında daha fazla inflamasyon, granülasyon dokusu, kontraksiyon ve belirgin skarla iyileşmedir.",
    "category": "Patoloji / Doku tamiri",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Granülasyon dokusu",
    "aliases": [
      "Granülasyon dokusu",
      "granulation tissue"
    ],
    "definition": "Anjiyogenez, fibroblast proliferasyonu ve gevşek ekstraselüler matriksten oluşan onarım dokusudur.",
    "category": "Patoloji / Doku tamiri",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Kollajen",
    "aliases": [
      "Kollajen",
      "collagen"
    ],
    "definition": "Fibroblastlarca sentezlenen, yara gücü ve skar oluşumunda temel ekstraselüler matriks proteinidir.",
    "category": "Patoloji/Biyokimya / Doku tamiri",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-scurvy-001"
    ]
  },
  {
    "term": "Keloid",
    "aliases": [
      "Keloid"
    ],
    "definition": "Aşırı kollajen birikimiyle yara sınırlarını aşan kabarık skar oluşumudur.",
    "category": "Patoloji/Dermatoloji / Doku tamiri",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Ödem",
    "aliases": [
      "edema",
      "Ödem"
    ],
    "definition": "İnterstisyel doku veya boşluklarda aşırı sıvı birikmesidir.",
    "category": "Patoloji / Hemodinamik bozukluk",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine",
      "neurology",
      "pediatrics",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cardiovascular-electrical-injury-arrhythmia-001",
      "cv-pulmonary-edema-001",
      "cv-tamponade-001",
      "internal-medicine-acute-radiation-syndrome-001",
      "internal-medicine-systemic-lupus-erythematosus-001",
      "neurology-liquefactive-necrosis-brain-001",
      "ped-epiglottitis-001",
      "ped-kawasaki-001",
      "pulm-copd-exacerbation-001",
      "pulm-ipf-uip-001",
      "pulmonology-near-hanging-asphyxia-001"
    ]
  },
  {
    "term": "Hiperemi",
    "aliases": [
      "hyperemia",
      "Hiperemi"
    ],
    "definition": "Aktif arteriyel kan akımı artışına bağlı dokunun kızarık görünmesidir.",
    "category": "Patoloji / Hemodinamik bozukluk",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "ped-kawasaki-001",
      "pediatrics-homocystinuria-001"
    ]
  },
  {
    "term": "Konjesyon",
    "aliases": [
      "congestion",
      "Konjesyon"
    ],
    "definition": "Venöz dönüş azalmasına bağlı pasif kan göllenmesidir; kronik konjesyonda hipoksi ve hemosiderin birikimi olabilir.",
    "category": "Patoloji / Hemodinamik bozukluk",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine",
      "neurology"
    ],
    "relatedCaseIds": [
      "cv-pulmonary-edema-001",
      "neuro-cvst-001"
    ]
  },
  {
    "term": "Tromboz",
    "aliases": [
      "Virchow triadı",
      "thrombosis",
      "Tromboz"
    ],
    "definition": "Canlı dolaşım sisteminde kan pıhtısı oluşmasıdır.",
    "category": "Patoloji/Hematoloji / Hemodinamik bozukluk",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "neurology",
      "pediatrics",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "neuro-cvst-001",
      "pediatrics-homocystinuria-001",
      "pulmonology-pulmonary-embolism-dvt-001"
    ]
  },
  {
    "term": "Virchow triadı",
    "aliases": [
      "endothelial injury",
      "hypercoagulability",
      "Virchow triadı",
      "stasis"
    ],
    "definition": "Tromboz oluşumunu açıklayan üçlü: endotelyal hasar, kan akımında staz/türbülans ve hiperkoagülabilitedir.",
    "category": "Patoloji/Hematoloji / Tromboz mekanizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "pulmonology-pulmonary-embolism-dvt-001"
    ]
  },
  {
    "term": "Emboli",
    "aliases": [
      "embolism",
      "Emboli"
    ],
    "definition": "Damar içinde taşınan katı, sıvı veya gaz materyalin uzak bir damarı tıkamasıdır.",
    "category": "Patoloji / Tromboembolizm",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "infectious-diseases",
      "internal-medicine",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cv-anterior-stemi-001",
      "cv-pulmonary-edema-001",
      "inf-endocarditis-001",
      "pulm-copd-exacerbation-001",
      "pulm-pe-001",
      "pulm-pneumonia-001",
      "pulm-pneumothorax-001",
      "pulmonology-pulmonary-embolism-dvt-001"
    ]
  },
  {
    "term": "İnfarkt",
    "aliases": [
      "infarction",
      "İnfarkt"
    ],
    "definition": "Kan akımı kesilmesine bağlı doku nekrozudur.",
    "category": "Patoloji / Damar tıkanıklığı",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "pulmonology-pulmonary-embolism-dvt-001"
    ]
  },
  {
    "term": "Şok",
    "aliases": [
      "Doku hipoperfüzyonu",
      "shock",
      "Şok"
    ],
    "definition": "Doku hipoperfüzyonu ve hücresel hipoksiyle çoklu organ disfonksiyonuna gidebilen sistemik dolaşım yetmezliğidir.",
    "category": "Patoloji/Acil / Hemodinamik bozukluk",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "infectious-diseases",
      "internal-medicine",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cv-tamponade-001",
      "im-acute-pancreatitis-001",
      "inf-meningococcemia-001",
      "infectious-diseases-septic-shock-001",
      "internal-medicine-sexual-assault-evidence-001",
      "pulmonology-pulmonary-embolism-dvt-001"
    ]
  },
  {
    "term": "DIC",
    "aliases": [
      "disseminated intravascular coagulation",
      "DIC"
    ],
    "definition": "Yaygın mikrotrombüs oluşumu ve koagülasyon faktörü tüketimiyle kanama-tromboz birlikteliği oluşturan sendromdur.",
    "category": "Hematoloji/Patoloji / Koagülopati",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Tip I hipersensitivite",
    "aliases": [
      "immediate hypersensitivity",
      "Tip I hipersensitivite",
      "IgE + mast hücresi"
    ],
    "definition": "IgE aracılı mast hücre degranülasyonu ile dakikalar içinde gelişen alerjik reaksiyondur.",
    "category": "İmmünoloji / Hipersensitivite",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Tip II hipersensitivite",
    "aliases": [
      "antibody-mediated cytotoxic hypersensitivity",
      "Tip II hipersensitivite",
      "Hücre yüzeyine IgG/IgM"
    ],
    "definition": "IgG/IgM antikorlarının hücre yüzeyi veya matriks antijenlerine bağlanmasıyla hücre hasarı/fonksiyon bozukluğu yapmasıdır.",
    "category": "İmmünoloji / Hipersensitivite",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Tip III hipersensitivite",
    "aliases": [
      "immune complex hypersensitivity",
      "Tip III hipersensitivite",
      "İmmün kompleks"
    ],
    "definition": "Dolaşan immün komplekslerin dokuda birikerek kompleman ve inflamasyon oluşturmasıdır.",
    "category": "İmmünoloji / Hipersensitivite",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-systemic-lupus-erythematosus-001"
    ]
  },
  {
    "term": "Tip IV hipersensitivite",
    "aliases": [
      "delayed-type hypersensitivity",
      "Tip IV hipersensitivite",
      "T hücre gecikmiş yanıt"
    ],
    "definition": "T hücre aracılı gecikmiş tip hücresel immün yanıttır.",
    "category": "İmmünoloji / Hipersensitivite",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Anafilaksi",
    "aliases": [
      "anaphylaxis",
      "Anafilaksi"
    ],
    "definition": "Sistemik Tip I hipersensitivite reaksiyonu; hipotansiyon, bronkospazm, ürtiker ve laringeal ödemle seyredebilir.",
    "category": "Acil/İmmünoloji / Alerji",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-azathioprine-tpmt-toxicity-001"
    ]
  },
  {
    "term": "Otoimmünite",
    "aliases": [
      "autoimmunity",
      "Otoimmünite"
    ],
    "definition": "Self tolerans kaybı sonucu kişinin kendi antijenlerine karşı immün yanıt geliştirmesidir.",
    "category": "İmmünoloji / Otoimmün hastalık",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Sistemik lupus eritematozus",
    "aliases": [
      "Sistemik lupus eritematozus",
      "Malar raş + anti-dsDNA",
      "SLE"
    ],
    "definition": "Çoklu otoantikor ve immün kompleks aracılı multisistem otoimmün hastalıktır; deri, böbrek, eklem ve hematolojik tutulum yapabilir.",
    "category": "İmmünoloji/Romatoloji / Otoimmün hastalık",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases",
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "infectious-diseases-hiv-aids-001",
      "internal-medicine-rheumatoid-arthritis-001",
      "internal-medicine-sjogren-syndrome-001",
      "internal-medicine-systemic-lupus-erythematosus-001"
    ]
  },
  {
    "term": "ANA",
    "aliases": [
      "antinuclear antibody",
      "ANA"
    ],
    "definition": "Nükleer antijenlere karşı otoantikor; SLE’de duyarlı fakat özgül olmayan tarama testidir.",
    "category": "İmmünoloji / Otoantikor",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "general-surgery",
      "infectious-diseases",
      "internal-medicine",
      "orthopedics",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "im-dka-001",
      "inf-endocarditis-001",
      "inf-malaria-001",
      "inf-meningococcemia-001",
      "inf-tuberculosis-001",
      "internal-medicine-systemic-lupus-erythematosus-001",
      "ortho-colles-001",
      "ortho-femoral-neck-001",
      "ortho-scaphoid-001",
      "ortho-shoulder-dislocation-001",
      "pulm-copd-exacerbation-001",
      "pulm-ipf-uip-001",
      "pulm-pe-001",
      "pulm-pneumonia-001",
      "pulm-pneumothorax-001",
      "pulmonology-pulmonary-embolism-dvt-001",
      "surg-appendicitis-001",
      "surg-cholecystitis-001",
      "surg-diverticulitis-001",
      "surg-pneumoperitoneum-001",
      "surg-sbo-001"
    ]
  },
  {
    "term": "Anti-dsDNA",
    "aliases": [
      "anti-double-stranded DNA antibody",
      "Anti-dsDNA"
    ],
    "definition": "SLE için özgül kabul edilen, lupus nefriti aktivitesiyle ilişkili otoantikordur.",
    "category": "İmmünoloji / Otoantikor",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-systemic-lupus-erythematosus-001"
    ]
  },
  {
    "term": "Malar döküntü",
    "aliases": [
      "butterfly rash",
      "Malar döküntü"
    ],
    "definition": "SLE’de yanak ve burun köprüsünü tutan kelebek tarzı fotosensitif döküntüdür.",
    "category": "Dermatoloji/İmmünoloji / SLE bulgusu",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-sjogren-syndrome-001",
      "internal-medicine-systemic-lupus-erythematosus-001"
    ]
  },
  {
    "term": "Sjögren sendromu",
    "aliases": [
      "Kuru göz + kuru ağız",
      "Sjögren sendromu",
      "Sjogren syndrome"
    ],
    "definition": "Ekzokrin bezleri hedefleyen otoimmün hastalık; kuru göz ve kuru ağızla karakterizedir.",
    "category": "İmmünoloji/Romatoloji / Otoimmün hastalık",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-sjogren-syndrome-001",
      "internal-medicine-systemic-lupus-erythematosus-001"
    ]
  },
  {
    "term": "Anti-Ro/SSA",
    "aliases": [
      "SSA antibody",
      "Anti-Ro/SSA"
    ],
    "definition": "Sjögren ve SLE ile ilişkili otoantikordur; neonatal lupus ve konjenital kalp bloğu ile de ilişkilidir.",
    "category": "İmmünoloji / Otoantikor",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-sjogren-syndrome-001"
    ]
  },
  {
    "term": "Anti-La/SSB",
    "aliases": [
      "SSB antibody",
      "Anti-La/SSB"
    ],
    "definition": "Sjögren sendromunda görülebilen otoantikordur.",
    "category": "İmmünoloji / Otoantikor",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-sjogren-syndrome-001"
    ]
  },
  {
    "term": "Romatoid artrit",
    "aliases": [
      "Simetrik MCP/PIP + sabah tutukluğu",
      "Romatoid artrit",
      "RA"
    ],
    "definition": "Simetrik küçük eklem artriti, sabah tutukluğu ve pannus oluşumu ile seyreden kronik otoimmün sinovit hastalığıdır.",
    "category": "İmmünoloji/Romatoloji / Otoimmün hastalık",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-rheumatoid-arthritis-001",
      "internal-medicine-sjogren-syndrome-001",
      "internal-medicine-systemic-lupus-erythematosus-001"
    ]
  },
  {
    "term": "Pannus",
    "aliases": [
      "Pannus"
    ],
    "definition": "RA’da sinovyumun inflamatuvar proliferasyonu sonucu kıkırdak ve kemiği erozyona uğratan granülasyon dokusudur.",
    "category": "Patoloji/İmmünoloji / RA patogenezi",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-rheumatoid-arthritis-001"
    ]
  },
  {
    "term": "Anti-CCP",
    "aliases": [
      "anti-cyclic citrullinated peptide antibody",
      "Anti-CCP"
    ],
    "definition": "Romatoid artrit için görece özgül otoantikordur ve eroziv hastalıkla ilişkilidir.",
    "category": "İmmünoloji / Otoantikor",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "internal-medicine-rheumatoid-arthritis-001",
      "pulm-ipf-uip-001"
    ]
  },
  {
    "term": "Romatoid faktör",
    "aliases": [
      "Romatoid faktör",
      "RF"
    ],
    "definition": "IgG’nin Fc kısmına karşı gelişen otoantikordur; RA’da görülebilir ancak özgüllüğü sınırlıdır.",
    "category": "İmmünoloji / Otoantikor",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "internal-medicine-rheumatoid-arthritis-001",
      "pulm-ipf-uip-001"
    ]
  },
  {
    "term": "Sistemik skleroz",
    "aliases": [
      "Sistemik skleroz",
      "scleroderma"
    ],
    "definition": "Fibrozis, vasküler hasar ve otoimmüniteyle seyreden; deri ve iç organ tutulumu yapabilen hastalıktır.",
    "category": "İmmünoloji/Romatoloji / Otoimmün hastalık",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-systemic-lupus-erythematosus-001"
    ]
  },
  {
    "term": "Myastenia gravis",
    "aliases": [
      "Yorulmakla artan ptozis/diplopi",
      "Myastenia gravis",
      "MG"
    ],
    "definition": "Nöromüsküler kavşakta asetilkolin reseptörlerine karşı antikorlarla fluktuasyon gösteren kas güçsüzlüğü yapan hastalıktır.",
    "category": "Nöroloji/İmmünoloji / Otoimmün hastalık",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "general-surgery",
      "infectious-diseases",
      "internal-medicine",
      "neurology",
      "orthopedics",
      "pediatrics",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cardiovascular-electrical-injury-arrhythmia-001",
      "cv-anterior-stemi-001",
      "cv-tamponade-001",
      "im-acute-pancreatitis-001",
      "im-dka-001",
      "im-primary-hyperparathyroidism-001",
      "inf-malaria-001",
      "inf-meningococcemia-001",
      "infectious-diseases-septic-shock-001",
      "internal-medicine-acute-radiation-syndrome-001",
      "internal-medicine-azathioprine-tpmt-toxicity-001",
      "internal-medicine-familial-hypercholesterolemia-001",
      "internal-medicine-oxidative-stress-injury-001",
      "internal-medicine-pellagra-001",
      "internal-medicine-scurvy-001",
      "internal-medicine-systemic-lupus-erythematosus-001",
      "internal-medicine-tangier-disease-001",
      "neuro-mca-stroke-001",
      "neurology-liquefactive-necrosis-brain-001",
      "ortho-femoral-neck-001",
      "ped-epiglottitis-001",
      "ped-intussusception-001",
      "ped-kawasaki-001",
      "pediatrics-classic-galactosemia-001",
      "pediatrics-hereditary-fructose-intolerance-001",
      "pediatrics-maple-syrup-urine-disease-001",
      "pediatrics-phenylketonuria-001",
      "pediatrics-von-gierke-gsd-001",
      "pulm-copd-exacerbation-001",
      "pulm-pneumonia-001",
      "surg-appendicitis-001",
      "surg-cholecystitis-001",
      "surg-diverticulitis-001",
      "surg-pneumoperitoneum-001",
      "surg-sbo-001"
    ]
  },
  {
    "term": "IgG4 ilişkili hastalık",
    "aliases": [
      "IgG4 ilişkili hastalık",
      "IgG4-related disease"
    ],
    "definition": "IgG4 pozitif plazma hücresi infiltrasyonu ve fibrozisle çeşitli organlarda kitle benzeri tutulum yapabilen immün aracılı hastalıktır.",
    "category": "İmmünoloji/Patoloji / Fibroinflamatuvar hastalık",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "HIV",
    "aliases": [
      "CD4 düşüklüğü + fırsatçı enfeksiyon",
      "human immunodeficiency virus",
      "HIV/AIDS",
      "AIDS",
      "HIV"
    ],
    "definition": "CD4 T lenfositleri hedefleyen retrovirüstür; ilerleyici hücresel immün yetmezliğe ve AIDS’e neden olur.",
    "category": "İmmünoloji/Enfeksiyon / İmmün yetmezlik",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases",
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "inf-tuberculosis-001",
      "infectious-diseases-hiv-aids-001",
      "internal-medicine-sexual-assault-evidence-001"
    ]
  },
  {
    "term": "CD4 T lenfosit",
    "aliases": [
      "CD4 T lenfosit",
      "helper T cell"
    ],
    "definition": "Adaptif immün yanıtı düzenleyen yardımcı T hücresidir; HIV enfeksiyonunda temel hedef hücredir.",
    "category": "İmmünoloji / Hücresel immünite",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases",
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "infectious-diseases-hiv-aids-001"
    ]
  },
  {
    "term": "gp120",
    "aliases": [
      "HIV-CD4 bağlanması",
      "HIV gp120",
      "gp120"
    ],
    "definition": "HIV’in CD4 ve koreseptörlere bağlanmasında rol alan zarf glikoproteinidir.",
    "category": "İmmünoloji/Viroloji / HIV",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedCaseIds": [
      "infectious-diseases-hiv-aids-001"
    ]
  },
  {
    "term": "gp41",
    "aliases": [
      "HIV gp41",
      "gp41"
    ],
    "definition": "HIV zarfında membran füzyonunda rol alan glikoproteindir.",
    "category": "İmmünoloji/Viroloji / HIV",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedCaseIds": [
      "infectious-diseases-hiv-aids-001"
    ]
  },
  {
    "term": "p24 antijeni",
    "aliases": [
      "p24 antijeni",
      "HIV p24"
    ],
    "definition": "HIV kapsid proteinidir; erken enfeksiyon tanısında antijen testlerinde kullanılır.",
    "category": "İmmünoloji/Viroloji / HIV tanısı",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Fırsatçı enfeksiyon",
    "aliases": [
      "opportunistic infection",
      "Fırsatçı enfeksiyon"
    ],
    "definition": "İmmün yetmezlikte normalde sınırlı patojenlerin ağır hastalık yapmasıdır.",
    "category": "İmmünoloji/Enfeksiyon / İmmün yetmezlik",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "infectious-diseases"
    ],
    "relatedCaseIds": [
      "infectious-diseases-hiv-aids-001"
    ]
  },
  {
    "term": "Adli olgu",
    "aliases": [
      "forensic case",
      "Adli olgu"
    ],
    "definition": "Hekimin mesleki uygulama sırasında hukuki bildirim, rapor veya adli süreç gerektiren tıbbi olgudur.",
    "category": "Adli tıp / Adli yaklaşım",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Adli rapor",
    "aliases": [
      "forensic medical report",
      "Adli rapor"
    ],
    "definition": "Adli sürece esas olmak üzere hekim tarafından düzenlenen tıbbi-hukuki belgedir.",
    "category": "Adli tıp / Raporlama",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-sexual-assault-evidence-001"
    ]
  },
  {
    "term": "İlliyet bağı",
    "aliases": [
      "İlliyet bağı",
      "causality"
    ],
    "definition": "Bir eylem/ihmal ile ortaya çıkan zarar veya ölüm arasında neden-sonuç ilişkisidir.",
    "category": "Adli tıp / Hukuki değerlendirme",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-shaken-baby-syndrome-001"
    ]
  },
  {
    "term": "Malpraktis",
    "aliases": [
      "Hekim kusuru + zarar",
      "medical malpractice",
      "Malpraktis"
    ],
    "definition": "Hekimin kusurlu davranışı sonucu hastada zarar oluşmasıyla cezai, hukuki, idari veya disiplin sorumluluğu doğurabilen durumdur.",
    "category": "Adli tıp / Hekim sorumluluğu",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Aydınlatılmış onam",
    "aliases": [
      "Hastanın bilgilendirilmiş kabulü",
      "Aydınlatılmış onam",
      "informed consent"
    ],
    "definition": "Hastanın yapılacak tıbbi uygulamayı anlayarak özgür iradesiyle kabul etmesini sağlayan hukuki-etik süreçtir.",
    "category": "Adli tıp/Etik / Hasta hakları",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Ölü muayenesi",
    "aliases": [
      "external death examination",
      "Ölü muayenesi"
    ],
    "definition": "Ölümün gerçekleşip gerçekleşmediği, ölüm zamanı bulguları ve adli şüphe açısından dıştan yapılan muayenedir.",
    "category": "Adli tıp / Ölüm incelemesi",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Otopsi",
    "aliases": [
      "autopsy",
      "Otopsi"
    ],
    "definition": "Ölüm nedeni, mekanizması ve hukuki soruların aydınlatılması için cesedin sistematik iç/dış incelemesidir.",
    "category": "Adli tıp / Ölüm incelemesi",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Livor mortis",
    "aliases": [
      "Yerçekimine bağlı mor lekeler",
      "postmortem lividity",
      "Livor mortis",
      "ölü lekesi"
    ],
    "definition": "Ölümden sonra kanın yerçekimiyle bağımlı bölgelerde birikmesiyle oluşan morumsu renk değişikliğidir.",
    "category": "Adli tıp / Ölüm belirtileri",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Rigor mortis",
    "aliases": [
      "ATP tükenmesi sonrası kas sertliği",
      "Rigor mortis",
      "ölü katılığı"
    ],
    "definition": "Ölüm sonrası ATP tükenmesine bağlı kasların sertleşmesidir.",
    "category": "Adli tıp / Ölüm belirtileri",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Algor mortis",
    "aliases": [
      "Algor mortis",
      "ölü soğuması"
    ],
    "definition": "Ölüm sonrası vücut sıcaklığının çevre koşullarına bağlı olarak düşmesidir.",
    "category": "Adli tıp / Ölüm belirtileri",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Ekimoz",
    "aliases": [
      "ecchymosis",
      "Ekimoz"
    ],
    "definition": "Künt travmaya bağlı deri altı kanama alanıdır; rengi zamanla değişebilir.",
    "category": "Adli tıp / Yara tanımı",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-azathioprine-tpmt-toxicity-001",
      "internal-medicine-sexual-assault-evidence-001"
    ]
  },
  {
    "term": "Abrazyon",
    "aliases": [
      "Abrazyon",
      "abrasion",
      "sıyrık"
    ],
    "definition": "Epidermisin yüzeyel mekanik sürtünmeyle kaybıdır.",
    "category": "Adli tıp / Yara tanımı",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Laserasyon",
    "aliases": [
      "Düzensiz kenar + doku köprüsü",
      "Laserasyon",
      "laceration"
    ],
    "definition": "Künt travmayla derinin düzensiz yırtılmasıdır; doku köprüleri görülebilir.",
    "category": "Adli tıp / Yara tanımı",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Kesici alet yarası",
    "aliases": [
      "Boy derinlikten fazla, düzgün kenar",
      "Kesici alet yarası",
      "incised wound"
    ],
    "definition": "Keskin kenarlı aletle oluşan, kenarları düzgün ve boyu derinliğinden fazla olabilen yaradır.",
    "category": "Adli tıp / Yara tanımı",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Kesici-delici alet yarası",
    "aliases": [
      "Kesici-delici alet yarası",
      "Derinlik boydan fazla",
      "stab wound"
    ],
    "definition": "Sivri/keskin aletle oluşan, derinliği boyundan fazla olabilen penetran yaradır.",
    "category": "Adli tıp / Yara tanımı",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Ateşli silah giriş yarası",
    "aliases": [
      "Ateşli silah giriş yarası",
      "gunshot entry wound"
    ],
    "definition": "Mermi giriş yerinde abrazyon halkası, is, tatuaj veya yanık gibi mesafeye bağlı bulgular bulunabilir.",
    "category": "Adli tıp / Ateşli silah yarası",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Asfiksi",
    "aliases": [
      "asphyxia",
      "Asfiksi"
    ],
    "definition": "Oksijenlenmenin bozulmasına bağlı hipoksi ve ölüm gelişebilen durumlar grubudur.",
    "category": "Adli tıp/Acil / Asfiksili ölüm",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "pulmonology"
    ],
    "relatedCaseIds": [
      "pulmonology-near-hanging-asphyxia-001"
    ]
  },
  {
    "term": "Strangülasyon",
    "aliases": [
      "Strangülasyon",
      "strangulation"
    ],
    "definition": "Boynun dış kuvvetle sıkıştırılması sonucu hava yolu/damar basısı ve asfiksi oluşmasıdır.",
    "category": "Adli tıp / Asfiksili ölüm",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "general-surgery",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "surg-sbo-001"
    ]
  },
  {
    "term": "Çocuk istismarı",
    "aliases": [
      "Öyküyle uyumsuz yara",
      "Çocuk istismarı",
      "child abuse"
    ],
    "definition": "Çocuğun fiziksel, cinsel, duygusal veya ihmal yoluyla zarar görmesidir; öyküyle uyumsuz yaralanma çok önemlidir.",
    "category": "Adli tıp/Pediatri / İstismar",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-shaken-baby-syndrome-001"
    ]
  },
  {
    "term": "Sarsılmış bebek sendromu",
    "aliases": [
      "Subdural + retinal kanama",
      "Sarsılmış bebek sendromu",
      "shaken baby syndrome",
      "abusive head trauma"
    ],
    "definition": "Bebekte sarsılma sonucu subdural kanama, retinal kanama ve diffüz aksonal hasar gelişebilen istismar tablosudur.",
    "category": "Adli tıp/Pediatri / İstismar",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-shaken-baby-syndrome-001"
    ]
  },
  {
    "term": "Subdural kanama",
    "aliases": [
      "subdural hemorrhage",
      "Subdural kanama"
    ],
    "definition": "Dura ile araknoid arasında kanama; sarsılmış bebek ve travmada görülebilir.",
    "category": "Adli tıp/Nöroloji / Travma bulgusu",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-shaken-baby-syndrome-001"
    ]
  },
  {
    "term": "Retinal kanama",
    "aliases": [
      "retinal hemorrhage",
      "Retinal kanama"
    ],
    "definition": "Retinada kanama; sarsılmış bebek sendromunda destekleyici önemli bulgudur.",
    "category": "Adli tıp/Göz / İstismar bulgusu",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-shaken-baby-syndrome-001"
    ]
  },
  {
    "term": "Diffüz aksonal hasar",
    "aliases": [
      "diffuse axonal injury",
      "Diffüz aksonal hasar"
    ],
    "definition": "Akselerasyon-deselerasyon kuvvetleriyle aksonların yaygın hasarıdır; ağır kafa travması ve sarsılma ile ilişkilidir.",
    "category": "Adli tıp/Nöroloji / Travma mekanizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "neurology"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Cinsel saldırı",
    "aliases": [
      "Cinsel saldırı",
      "sexual assault"
    ],
    "definition": "Kişinin rızası dışında cinsel davranışa maruz kalmasıdır; tıbbi stabilizasyon, delil toplama ve bildirim gerektirir.",
    "category": "Adli tıp / Cinsel suçlar",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-sexual-assault-evidence-001"
    ]
  },
  {
    "term": "Delil zinciri",
    "aliases": [
      "Adli örnek kimden-kime kayıt",
      "chain of custody",
      "Delil zinciri"
    ],
    "definition": "Adli örneklerin kimden, ne zaman, nasıl alınıp kime teslim edildiğinin kesintisiz kayıt altına alınmasıdır.",
    "category": "Adli tıp / Delil yönetimi",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "internal-medicine-sexual-assault-evidence-001",
      "pediatrics-shaken-baby-syndrome-001"
    ]
  },
  {
    "term": "Adli toksikoloji",
    "aliases": [
      "forensic toxicology",
      "Adli toksikoloji"
    ],
    "definition": "Zehir, alkol, ilaç ve uyuşturucu maddelerin adli örneklerde incelenmesiyle ilgilenen alandır.",
    "category": "Adli tıp / Laboratuvar",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "İstanbul Protokolü",
    "aliases": [
      "İstanbul Protokolü",
      "Istanbul Protocol"
    ],
    "definition": "İşkence ve kötü muamele iddialarının tıbbi-hukuki değerlendirilmesi için uluslararası rehber niteliğinde belgedir.",
    "category": "Adli tıp/İnsan hakları / Kötü muamele",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Farmakokinetik",
    "aliases": [
      "pharmacokinetics",
      "Farmakokinetik",
      "ADME"
    ],
    "definition": "İlacın vücutta absorbsiyon, dağılım, metabolizma ve eliminasyon süreçlerini inceler.",
    "category": "Farmakoloji / Temel kavram",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Farmakodinamik",
    "aliases": [
      "pharmacodynamics",
      "Farmakodinamik"
    ],
    "definition": "İlacın reseptör, hücre veya sistem üzerindeki etkilerini ve etki mekanizmasını inceler.",
    "category": "Farmakoloji / Temel kavram",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Biyoyararlanım",
    "aliases": [
      "bioavailability",
      "Biyoyararlanım",
      "F"
    ],
    "definition": "Uygulanan ilacın sistemik dolaşıma değişmeden ulaşan fraksiyonudur.",
    "category": "Farmakoloji / Farmakokinetik",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "İlk geçiş metabolizması",
    "aliases": [
      "İlk geçiş metabolizması",
      "first-pass metabolism"
    ],
    "definition": "Oral alınan ilacın sistemik dolaşıma ulaşmadan bağırsak/karaciğerde metabolize olmasıdır.",
    "category": "Farmakoloji / Absorpsiyon/metabolizma",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "pediatrics"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Dağılım hacmi",
    "aliases": [
      "volume of distribution",
      "Dağılım hacmi",
      "Vd"
    ],
    "definition": "İlacın plazma dışı dokulara dağılım derecesini gösteren görünür hacim parametresidir.",
    "category": "Farmakoloji / Farmakokinetik",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Klerens",
    "aliases": [
      "clearance",
      "Klerens",
      "CL"
    ],
    "definition": "Bir ilacın birim zamanda plazmadan temizlenen sanal hacmini gösterir.",
    "category": "Farmakoloji / Eliminasyon",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Yarı ömür",
    "aliases": [
      "Yarı ömür",
      "half-life",
      "t1/2"
    ],
    "definition": "Plazma ilaç konsantrasyonunun yarıya inmesi için geçen süredir.",
    "category": "Farmakoloji / Eliminasyon",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Sitokrom P450",
    "aliases": [
      "Sitokrom P450",
      "CYP450"
    ],
    "definition": "Karaciğerde faz I ilaç metabolizmasında önemli oksidasyon enzim ailesidir.",
    "category": "Farmakoloji/Biyokimya / Biyotransformasyon",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Otozomal dominant kalıtım",
    "aliases": [
      "Otozomal dominant kalıtım",
      "AD inheritance"
    ],
    "definition": "Tek mutant alelin hastalık oluşturabildiği, dikey soy geçişi gösteren kalıtım paternidir.",
    "category": "Genetik / Kalıtım",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "internal-medicine-familial-hypercholesterolemia-001"
    ]
  },
  {
    "term": "Otozomal resesif kalıtım",
    "aliases": [
      "Otozomal resesif kalıtım",
      "AR inheritance"
    ],
    "definition": "Hastalığın ortaya çıkması için iki mutant alel gereken; akraba evliliğiyle riski artan kalıtım paternidir.",
    "category": "Genetik / Kalıtım",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "X'e bağlı kalıtım",
    "aliases": [
      "X-linked inheritance",
      "X'e bağlı kalıtım"
    ],
    "definition": "X kromozomu üzerindeki genlerle taşınan, erkeklerde daha belirgin olabilen kalıtım paternidir.",
    "category": "Genetik / Kalıtım",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-bruton-agammaglobulinemia-001"
    ]
  },
  {
    "term": "Radyofarmasötik",
    "aliases": [
      "radiopharmaceutical",
      "Radyofarmasötik",
      "Nükleer tıp"
    ],
    "definition": "Tanı veya tedavi amacıyla kullanılan radyoaktif izotop içeren farmasötik preparattır.",
    "category": "Nükleer tıp / Temel kavram",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "PET",
    "aliases": [
      "positron emission tomography",
      "PET"
    ],
    "definition": "Pozitron yayıcı radyofarmasötiklerle metabolik/füzyon görüntüleme sağlayan nükleer tıp yöntemidir.",
    "category": "Nükleer tıp/Radyoloji / Görüntüleme",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "SPECT",
    "aliases": [
      "single-photon emission computed tomography",
      "SPECT"
    ],
    "definition": "Gama yayıcı radyofarmasötiklerle tomografik nükleer görüntüleme yöntemidir.",
    "category": "Nükleer tıp / Görüntüleme",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Kontrast madde",
    "aliases": [
      "Kontrast madde",
      "contrast agent"
    ],
    "definition": "Radyolojik görüntülemede anatomik/ vasküler yapıların görünürlüğünü artıran maddedir.",
    "category": "Radyoloji / Görüntüleme",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [],
    "relatedCaseIds": []
  },
  {
    "term": "Barrett özofagusu",
    "aliases": [
      "Barrett özofagusu",
      "Barrett esophagus"
    ],
    "definition": "Distal özofagusta kronik reflüye bağlı skuamöz epitelin intestinal tip kolumnar epitele metaplazisidir.",
    "category": "Patoloji/Gastroenteroloji / Metaplazi",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Mallory-Denk cisimciği",
    "aliases": [
      "Mallory-Denk cisimciği",
      "Mallory body"
    ],
    "definition": "Alkolik karaciğer hastalığında hepatositlerde sitokeratin ara filament birikimleridir.",
    "category": "Patoloji / Hücre içi birikim",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Councilman cisimciği",
    "aliases": [
      "Councilman cisimciği",
      "apoptotic hepatocyte"
    ],
    "definition": "Viral hepatitte görülebilen apoptotik hepatositlerdir.",
    "category": "Patoloji / Apoptoz örneği",
    "priority": "Orta",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Reperfüzyon hasarı",
    "aliases": [
      "ischemia-reperfusion injury",
      "Reperfüzyon hasarı"
    ],
    "definition": "İskemik dokuya kan akımı geri geldiğinde ROS ve inflamasyon artışıyla hasarın ağırlaşmasıdır.",
    "category": "Patoloji/Biyokimya / Hücre hasarı",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Kalsiyum artışı",
    "aliases": [
      "intracellular Ca2+ increase",
      "Kalsiyum artışı"
    ],
    "definition": "Hücre zedelenmesinde fosfolipaz, proteaz, endonükleaz ve ATPaz aktivasyonuna yol açarak hasarı artırır.",
    "category": "Patoloji / Hücre hasarı mekanizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "ATP azalması",
    "aliases": [
      "ATP depletion",
      "ATP azalması"
    ],
    "definition": "Hipoksi/iskemi sırasında enerji bağımlı pompaların bozulmasına, hücresel şişmeye ve ağır hasarda nekroza neden olur.",
    "category": "Patoloji / Hücre hasarı mekanizması",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Tetanik kasılma",
    "aliases": [
      "Alternatif akım + kaynaktan ayrılamama",
      "Tetanik kasılma"
    ],
    "definition": "AC istemsiz kasılma yaparak temas süresini uzatır. AC, DC’den daha tehlikeli.",
    "category": "Biyofizik/Acil",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "internal-medicine"
    ],
    "relatedCaseIds": [
      "cardiovascular-electrical-injury-arrhythmia-001"
    ]
  },
  {
    "term": "Muhtemel kanserojen sınıflaması",
    "aliases": [
      "Muhtemel kanserojen sınıflaması",
      "ELF-MF + DSÖ 2B"
    ],
    "definition": "Çok düşük frekanslı manyetik alanlarla ilgili sınav vurgusudur. 2B ifadesini yakala.",
    "category": "Biyofizik",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Radyasyon kazası şüphesi",
    "aliases": [
      "Isı/kimyasal/elektrik olmadan yanık",
      "Radyasyon kazası şüphesi"
    ],
    "definition": "Radyasyon dermatiti dış hasar kaynağı olmadan gelişebilir. Cilt yanığı için radyasyon maruziyeti sorgula.",
    "category": "Radyasyon",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Kozmik radyasyon artışı",
    "aliases": [
      "Kozmik radyasyon artışı",
      "Pilot yüksek irtifa"
    ],
    "definition": "Atmosfer koruması azaldıkça kozmik radyasyon artar. Pilot/dağ zirvesi deniz seviyesinden fazla maruz kalır.",
    "category": "Radyasyon",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Süperoksit oluşumu",
    "aliases": [
      "Oksijene tek elektron transferi",
      "Süperoksit oluşumu"
    ],
    "definition": "Spin kısıtlaması aşılarak daha reaktif ROS oluşur. O2 + e− = O2•−.",
    "category": "Biyokimya",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Lipid peroksidasyonu",
    "aliases": [
      "Lipid peroksidasyonu",
      "MDA / 4-HNE"
    ],
    "definition": "Serbest radikalin lipitler üzerindeki ürünleridir. Lipit hasarı sorusunda MDA/4-HNE.",
    "category": "Biyokimya",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "GALT eksikliği",
    "aliases": [
      "Galaktozemi + süt sonrası kusma/sarılık",
      "GALT eksikliği"
    ],
    "definition": "Galaktoz-1-fosfat birikimi karaciğer ve lens toksisitesi yapar. Yenidoğan + süt + katarakt/sepsis = galaktozemi.",
    "category": "Biyokimya",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-classic-galactosemia-001"
    ]
  },
  {
    "term": "Klasik PKU",
    "aliases": [
      "PAH eksikliği",
      "Klasik PKU"
    ],
    "definition": "Fenilalanin tirozin dönüşümü bozulur. Klasik PKU enzim spotu.",
    "category": "Biyokimya",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "pediatrics"
    ],
    "relatedCaseIds": [
      "pediatrics-phenylketonuria-001"
    ]
  },
  {
    "term": "Atipik PKU",
    "aliases": [
      "DHPR/BH4 defekti",
      "Atipik PKU"
    ],
    "definition": "Fenilalanin artar, nörotransmitter sentezi de etkilenir. Serotonin/katekolamin sentezinde azalma beklenebilir.",
    "category": "Biyokimya",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "OTC eksikliği",
    "aliases": [
      "Orotik asit artışı + hiperamonyemi",
      "OTC eksikliği"
    ],
    "definition": "X’e bağlı üre döngüsü bozukluğu. Karbamoil fosfat pirimidin yoluna kaçar.",
    "category": "Biyokimya",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Wernicke ensefalopatisi / B1 eksikliği",
    "aliases": [
      "Wernicke ensefalopatisi / B1 eksikliği",
      "Konfüzyon-oftalmopleji-ataksi",
      "Wernicke ensefalopatisi",
      "B1 eksikliği"
    ],
    "definition": "Tiamin eksikliği acil replasman gerektirir. Alkolizmde glukozdan önce tiamin verilir.",
    "category": "Vitamin",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "B12 eksikliği",
    "aliases": [
      "Megaloblastik anemi + nörolojik bulgu",
      "B12 eksikliği"
    ],
    "definition": "DNA sentezi ve miyelin metabolizması etkilenir. Metilmalonik asit artar.",
    "category": "Vitamin",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine",
      "neurology"
    ],
    "relatedCaseIds": [
      "neuro-ms-001"
    ]
  },
  {
    "term": "Vitamin K",
    "aliases": [
      "II, VII, IX, X + protein C/S",
      "Vitamin K"
    ],
    "definition": "Gama karboksilasyon için gereklidir. Warfarin/Vit K bağlantısı.",
    "category": "Vitamin",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Makrofaj ve granülasyon dokusu başlangıcı",
    "aliases": [
      "Makrofaj ve granülasyon dokusu başlangıcı",
      "3. gün yara iyileşmesi"
    ],
    "definition": "Nötrofiller yerini makrofajlara bırakır. 5. veya 7. gün başlangıcı tuzaktır.",
    "category": "Patoloji",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Pulmoner emboli",
    "aliases": [
      "DVT sonrası ani dispne",
      "Pulmoner emboli"
    ],
    "definition": "Venöz trombüs akciğere embolize olur. DVT → PE zinciri.",
    "category": "Patoloji",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "cardiovascular",
      "infectious-diseases",
      "internal-medicine",
      "pulmonology"
    ],
    "relatedCaseIds": [
      "cv-anterior-stemi-001",
      "cv-pulmonary-edema-001",
      "inf-endocarditis-001",
      "pulm-copd-exacerbation-001",
      "pulm-pe-001",
      "pulm-pneumonia-001",
      "pulm-pneumothorax-001",
      "pulmonology-pulmonary-embolism-dvt-001"
    ]
  },
  {
    "term": "Oral biyoyararlanım düşük",
    "aliases": [
      "Oral biyoyararlanım düşük",
      "First-pass yüksek"
    ],
    "definition": "Karaciğer/bağırsakta ilk geçiş metabolizması. IV biyoyararlanım %100.",
    "category": "Farmakoloji",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Doku dağılımı fazla",
    "aliases": [
      "Doku dağılımı fazla",
      "Vd yüksek"
    ],
    "definition": "İlacın plazma dışına dağıldığını düşündürür. Plazma proteinine sıkı bağlı ilaçta Vd düşük olabilir.",
    "category": "Farmakoloji",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Steady state",
    "aliases": [
      "4-5 yarı ömür",
      "Steady state"
    ],
    "definition": "Sabit plazma düzeyine ulaşma süresidir. Yarı ömür doz aralığı ile ilişkili.",
    "category": "Farmakoloji",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  },
  {
    "term": "Metabolik aktivite görüntüleme",
    "aliases": [
      "Metabolik aktivite görüntüleme",
      "FDG-PET"
    ],
    "definition": "Glukoz analoguyla yüksek metabolik aktivite saptanır. Onkolojik görüntülemede sık kullanılır.",
    "category": "Nükleer tıp",
    "priority": "Yüksek",
    "mode": teachingOnly,
    "relatedBranches": [
      "internal-medicine"
    ],
    "relatedCaseIds": []
  }
];

export const branchGlossaryTerms = {};

export const defaultGlossaryTerms = globalGlossaryTerms;

const STATIC_GLOSSARY_SOURCES = [
  // Highest-priority quality layer: removes placeholder/filler definitions while preserving aliases and matching behavior.
  ...TUS_GLOSSARY_DEFINITION_QUALITY_TERMS,
  ...TUS_GLOSSARY_V330_ULTRADEEP_BATCH5_6_TERMS,
  ...TUS_GLOSSARY_V321_DEEP_HIGH_YIELD_BATCH4_TERMS,
  ...TUS_GLOSSARY_V320_QUALITY_BATCH3_TERMS,
  ...TUS_GLOSSARY_V319_TEACHABLE_TERMS,
  ...TUS_GLOSSARY_V304_EXTRA_TERMS,
  ...TUS_GLOSSARY_V300_SUPPLEMENTAL_TERMS,
  ...TUS_GLOSSARY_CANDIDATE_AUDIT_TERMS,
  ...TUS_GLOSSARY_RECURSIVE_NESTED_TERMS,
  // Binding corrections come first: they define true canonical owners for terms
  // that legacy rows sometimes used only as context clues (e.g. asthma inside
  // the eosinophil explanation). This prevents title/definition mismatches.
  ...TUS_GLOSSARY_CONTEXT_SAFETY_TERMS,
  ...TUS_GLOSSARY_GLOBAL_QUALITY_TERMS,
  ...TUS_GLOSSARY_CONTENT_COVERAGE_TERMS,
  ...TUS_GLOSSARY_AMBIGUITY_SAFETY_TERMS,
  ...TUS_GLOSSARY_NESTED_COVERAGE_TERMS,
  ...TUS_GLOSSARY_BINDING_CORRECTION_TERMS,
  // Contextual phrase layer comes next so exact clinical phrases such as
  // "defans", "aktif elevasyon" or "sağ inguinal insizyon" do not get
  // swallowed by broader disease-level aliases.
  ...TUS_GLOSSARY_CONTEXTUAL_PHRASE_TERMS,
  ...TUS_GLOSSARY_CLINICAL_BRANCH_DEEP_TERMS,
  ...TUS_GLOSSARY_ADVANCED_TERMS,
  ...TUS_GLOSSARY_EXPANDED_TERMS,
  ...TUS_GLOSSARY_SUPPLEMENTAL_TERMS,
  ...TUS_GLOSSARY_SCIENTIFIC_TERMS,
  ...TUS_GLOSSARY_NESTED_CLINICAL_TERMS,
  ...TUS_GLOSSARY_CASE_DERIVED_TERMS,
  ...globalGlossaryTerms,
];

const NORMALIZED_GLOSSARY_CACHE = new Map();
const MAX_NORMALIZED_GLOSSARY_CACHE_SIZE = 24;

function rememberNormalizedGlossary(cacheKey, value) {
  try {
    Object.defineProperty(value, '__glossarySignature', {
      value: cacheKey,
      enumerable: false,
      configurable: true,
    });
  } catch (_) {
    // Cache signature is an optimization hint only.
  }

  NORMALIZED_GLOSSARY_CACHE.set(cacheKey, value);
  if (NORMALIZED_GLOSSARY_CACHE.size > MAX_NORMALIZED_GLOSSARY_CACHE_SIZE) {
    const oldestKey = NORMALIZED_GLOSSARY_CACHE.keys().next().value;
    NORMALIZED_GLOSSARY_CACHE.delete(oldestKey);
  }
  return value;
}


function getEntryMatchingPriority(entry = {}) {
  const raw = Number(entry.matchingPriority ?? entry.priorityScore ?? 0);
  if (Number.isFinite(raw) && raw > 0) return raw;
  const priority = String(entry.priority || entry.difficulty || '').toLocaleLowerCase('tr');
  if (priority.includes('çok yüksek') || priority.includes('kritik')) return 95;
  if (priority.includes('yüksek') || priority.includes('zor')) return 80;
  if (entry.isMultiWordTerm) return 70;
  return 50;
}

function compareGlossaryEntrySpecificity(a = {}, b = {}) {
  const ap = getEntryMatchingPriority(a);
  const bp = getEntryMatchingPriority(b);
  if (ap !== bp) return bp - ap;
  const aw = String(a.term || '').trim().split(/\s+/).length;
  const bw = String(b.term || '').trim().split(/\s+/).length;
  if (aw !== bw) return bw - aw;
  return String(b.term || '').length - String(a.term || '').length;
}


const UNSAFE_CONTEXT_ALIAS_PATTERNS = [
  /\//u,
  /\b(?:ana hücresi|ilişkili|düşündürür|destekler|tipiktir|görülür|görülebilir|nedenidir|bulgusudur)\b/iu,
  /\b(?:parazit|alerji|astım)\s*\/\s*/iu,
];

// These words are real medical concepts, but they are too broad to be used as
// standalone aliases for a specific disease. Example: "obstrüksiyon" may mean
// airway, intestinal, biliary, vascular or urinary obstruction depending on
// context. It must not point to "İleus" unless the phrase is explicitly
// intestinal/bowel obstruction.
const GENERIC_STANDALONE_ALIAS_SET = new Set([
  // Broad pathophysiology / clinical state words. These may be glossary entries
  // as general concepts, but must not be standalone aliases for specific
  // diseases, procedures or organs.
  'obstruksiyon', 'tikaniklik', 'inflamasyon', 'enfeksiyon', 'yetmezlik',
  'asit', 'direnc', 'blok', 'aks', 'depresyon', 'tas', 'plak', 'granulom', 'kalsifikasyon',
  'iskemi', 'nekroz', 'odem', 'lezyon', 'kitle', 'nodul', 'infiltrasyon',
  'darlik', 'basi', 'hiperreaktivite', 'hassasiyet', 'agri', 'dispne',
  'hipoksi', 'hipoksemi', 'hiperkapni', 'asidoz', 'alkaloz', 'sok',
  'kanama', 'perforasyon', 'torsiyon', 'elevasyon', 'defisit', 'tutulum',
  'yanit', 'komplikasyon', 'atak', 'tablo', 'bulgu', 'semptom',
  // Broad anatomical direction/location words. They should be linked only as
  // part of a specific phrase such as "sağ inguinal insizyon".
  'sag', 'sol', 'medial', 'lateral', 'anterior', 'posterior', 'proksimal',
  'distal', 'superior', 'inferior', 'santral', 'periferik',
  // Broad procedure/movement/test roots. Link phrase forms, not the naked word,
  // unless a dedicated generic concept owns the exact canonical term.
  'insizyon', 'eksplorasyon', 'drenaj', 'rezeksiyon', 'biyopsi',
  'abduksiyon', 'adduksiyon', 'fleksiyon', 'ekstansiyon', 'rotasyon',
  'kultur', 'yayma', 'grafi', 'ultrasonografi', 'tomografi', 'ponksiyon',
]);

export function isGenericStandaloneAlias(alias = '') {
  const normalized = normalizeGlossaryText(alias);
  return Boolean(normalized && GENERIC_STANDALONE_ALIAS_SET.has(normalized));
}


export const AMBIGUOUS_CONTEXT_REQUIRED_ALIAS_SET = new Set([
  'asit', 'direnc', 'blok', 'sok', 'basi', 'yetmezlik', 'darlik', 'tutulum',
  'lezyon', 'yanit', 'hassasiyet', 'infiltrasyon', 'elevasyon', 'depresyon',
  'aks', 'nodul', 'kitle', 'tas', 'agri', 'odem', 'inflamasyon', 'obstruksiyon',
  'perforasyon', 'torsiyon', 'rotasyon', 'asidoz', 'alkaloz', 'kalsifikasyon',
  'granulom', 'plak', 'kultur'
]);

export function isAmbiguousStandaloneAlias(alias = '') {
  const normalized = normalizeGlossaryText(alias);
  return Boolean(normalized && AMBIGUOUS_CONTEXT_REQUIRED_ALIAS_SET.has(normalized));
}

function getContextWindow(source = '', matchStart = 0, matchEnd = 0, radius = 90) {
  const start = Math.max(0, Number(matchStart || 0) - radius);
  const end = Math.min(String(source).length, Number(matchEnd || 0) + radius);
  return normalizeGlossaryText(String(source).slice(start, end));
}

function listContainsAnyNormalized(context = '', terms = []) {
  if (!context || !Array.isArray(terms) || !terms.length) return false;
  return terms.some((term) => {
    const key = normalizeGlossaryText(term);
    return key && context.includes(key);
  });
}

function getAliasWordCount(alias = '') {
  return String(alias || '').trim().split(/\s+/u).filter(Boolean).length;
}

function isContextAllowedForEntry(entry = {}, alias = '', source = '', matchStart = 0, matchEnd = 0) {
  const wordCount = getAliasWordCount(alias);
  const context = getContextWindow(source, matchStart, matchEnd);
  const allowed = Array.isArray(entry.allowedContextKeywords) ? entry.allowedContextKeywords : [];
  const blocked = Array.isArray(entry.blockedContextKeywords) ? entry.blockedContextKeywords : [];
  const required = Array.isArray(entry.requiredCoTerms) ? entry.requiredCoTerms : [];

  if (blocked.length && listContainsAnyNormalized(context, blocked)) return false;

  // Context-required or phrase-only entries must not be selected from a naked,
  // ambiguous one-word alias unless the surrounding text explicitly supports it.
  if (wordCount === 1 && (entry.contextRequired || entry.phraseOnly || entry.disabledAsStandaloneAlias)) {
    if (entry.standaloneSafe === true && !required.length && !allowed.length) return true;
    return listContainsAnyNormalized(context, [...required, ...allowed]);
  }

  if (wordCount === 1 && isAmbiguousStandaloneAlias(alias) && !entry.isGenericConcept && entry.standaloneSafe !== true) {
    return listContainsAnyNormalized(context, [...required, ...allowed]);
  }

  return true;
}

export function isUnsafeStandaloneAliasForEntry(entry = {}, alias = '') {
  return isUnsafeContextAlias(entry, alias);
}

function normalizeEntryOwnerKey(entry = {}) {
  return normalizeGlossaryText(entry.canonicalTerm || entry.displayTerm || entry.term || '');
}

function isExactCanonicalAlias(entry = {}, alias = '') {
  const normalized = normalizeGlossaryText(alias);
  return Boolean(normalized && (
    normalized === normalizeGlossaryText(entry.canonicalTerm || '')
    || normalized === normalizeGlossaryText(entry.displayTerm || '')
    || normalized === normalizeGlossaryText(entry.term || '')
    || normalized === normalizeGlossaryText(entry.normalizedTerm || '')
  ));
}

function isNamedFieldAlias(entry = {}, alias = '') {
  const normalized = normalizeGlossaryText(alias);
  return Boolean(normalized && [entry.abbreviation, entry.EnglishName, entry.englishName, entry.LatinName, entry.latinName, entry.TurkishName, entry.turkishName]
    .filter(Boolean)
    .some((item) => normalizeGlossaryText(item) === normalized));
}

function isUnsafeContextAlias(entry = {}, alias = '') {
  const raw = String(alias || '').replace(/\s+/g, ' ').trim();
  if (!raw) return true;
  if ((entry.disabledAsStandaloneAlias || entry.phraseOnly) && raw.trim().split(/\s+/u).length === 1) return true;
  if (isExactCanonicalAlias(entry, raw) || isNamedFieldAlias(entry, raw)) return false;

  // Broad standalone words are allowed only when the entry is the broad concept
  // itself. They are removed from specific disease entries such as "İleus".
  if (isGenericStandaloneAlias(raw) && !entry.isGenericConcept) return true;
  if (isAmbiguousStandaloneAlias(raw) && raw.trim().split(/\s+/u).length === 1 && !entry.isGenericConcept && entry.standaloneSafe !== true) return true;

  // Context-sensitive entries can explicitly require co-terms before a broad
  // alias is used. The standalone alias is therefore unsafe at alias-build time;
  // precise phrase aliases such as "bağırsak obstrüksiyonu" stay valid.
  if (Array.isArray(entry.requiredCoTerms) && entry.requiredCoTerms.length && raw.trim().split(/\s+/).length === 1) return true;

  // Legacy rows sometimes stored clue phrases as aliases. Those phrases should
  // not hijack the tooltip binding of true terms appearing in case text.
  if (UNSAFE_CONTEXT_ALIAS_PATTERNS.some((pattern) => pattern.test(raw))) return true;
  return false;
}

function scoreAliasOwnership(entry = {}, alias = '') {
  const normalizedAlias = normalizeGlossaryText(alias);
  let score = getEntryMatchingPriority(entry);
  if (normalizedAlias && normalizedAlias === normalizeGlossaryText(entry.canonicalTerm || '')) score += 10000;
  if (normalizedAlias && normalizedAlias === normalizeGlossaryText(entry.displayTerm || '')) score += 9000;
  if (normalizedAlias && normalizedAlias === normalizeGlossaryText(entry.term || '')) score += 8500;
  if (isNamedFieldAlias(entry, alias)) score += 7600;
  if (entry.isMultiWordTerm || /\s/.test(String(alias || ''))) score += 120;
  score += Math.min(String(alias || '').length, 80);
  return score;
}

function enforceGlossaryAliasIntegrity(entries = []) {
  const canonicalOwners = new Map();
  entries.forEach((entry) => {
    const keys = [entry.canonicalTerm, entry.displayTerm, entry.term, entry.normalizedTerm]
      .filter(Boolean)
      .map(normalizeGlossaryText)
      .filter(Boolean);
    keys.forEach((key) => {
      const current = canonicalOwners.get(key);
      if (!current || scoreAliasOwnership(entry, key) > scoreAliasOwnership(current, key)) canonicalOwners.set(key, entry);
    });
  });

  const preliminary = entries.map((entry) => {
    const seen = new Set();
    const aliases = [];
    (entry.aliases || []).forEach((alias) => {
      const cleaned = String(alias || '').replace(/\s+/g, ' ').trim();
      const normalized = normalizeGlossaryText(cleaned);
      if (!cleaned || !normalized || seen.has(normalized)) return;
      if (isBlacklistedUnitToken(cleaned) || isLowSignalGlossaryAlias(cleaned)) return;
      if (isUnsafeContextAlias(entry, cleaned)) return;
      const owner = canonicalOwners.get(normalized);
      if (owner && owner.id !== entry.id && normalizeEntryOwnerKey(owner) !== normalizeEntryOwnerKey(entry)) return;
      seen.add(normalized);
      aliases.push(cleaned);
    });

    // A glossary entry must always keep its own canonical labels, even if broad
    // context aliases are discarded.
    [entry.canonicalTerm, entry.displayTerm, entry.term, entry.abbreviation, entry.EnglishName, entry.LatinName]
      .filter(Boolean)
      .forEach((alias) => {
        const cleaned = String(alias || '').replace(/\s+/g, ' ').trim();
        const normalized = normalizeGlossaryText(cleaned);
        if (cleaned && normalized && !seen.has(normalized) && !isBlacklistedUnitToken(cleaned)) {
          seen.add(normalized);
          aliases.push(cleaned);
        }
      });

    return { ...entry, aliases: aliases.sort((a, b) => b.length - a.length), normalizedAliases: aliases.map(normalizeGlossaryText) };
  });

  const aliasClaims = new Map();
  preliminary.forEach((entry) => {
    (entry.aliases || []).forEach((alias) => {
      const normalized = normalizeGlossaryText(alias);
      if (!normalized) return;
      const claims = aliasClaims.get(normalized) || [];
      claims.push({ entry, alias, score: scoreAliasOwnership(entry, alias) });
      aliasClaims.set(normalized, claims);
    });
  });

  const winningAliasOwner = new Map();
  aliasClaims.forEach((claims, normalized) => {
    const sorted = [...claims].sort((a, b) => {
      if (a.score !== b.score) return b.score - a.score;
      const aExact = isExactCanonicalAlias(a.entry, a.alias) ? 1 : 0;
      const bExact = isExactCanonicalAlias(b.entry, b.alias) ? 1 : 0;
      if (aExact !== bExact) return bExact - aExact;
      return String(a.entry.term || '').localeCompare(String(b.entry.term || ''), 'tr');
    });
    winningAliasOwner.set(normalized, sorted[0].entry.id);
  });

  return preliminary.map((entry) => {
    const aliases = (entry.aliases || []).filter((alias) => {
      const normalized = normalizeGlossaryText(alias);
      const winner = winningAliasOwner.get(normalized);
      if (winner && winner !== entry.id) return false;
      // Generic concepts should not inherit specific phrase aliases from legacy
      // duplicates during canonical merge. Example: the generic chemical
      // concept "Asit" must not own "asit sıvısı" variants; those belong to
      // the peritoneal/ascites phrase entry. Explicit safeGenericPhraseAliases
      // can opt in when a generic multi-word alias is truly intended.
      if (entry.isGenericConcept && String(alias || '').trim().split(/\s+/u).filter(Boolean).length > 1) {
        const safePhrases = new Set((entry.safeGenericPhraseAliases || []).map((item) => normalizeGlossaryText(item)).filter(Boolean));
        if (!safePhrases.has(normalized) && !isExactCanonicalAlias(entry, alias) && !isNamedFieldAlias(entry, alias)) return false;
      }
      return true;
    });
    return { ...entry, aliases, normalizedAliases: aliases.map(normalizeGlossaryText) };
  });
}

const CATEGORY_KEYWORDS = [
  { key: 'disease', category: /hastalık|sendrom|neoplazi|tümör|kanser|enfeksiyon hastalığı/iu, definition: /hastalık|sendrom|enfeksiyon|tümör|neoplazi|klinik tablo|patoloji/iu },
  { key: 'cell-molecule', category: /hücre|molekül|reseptör|enzim|protein|genetik|immünoloji|sinyal/iu, definition: /hücre|molekül|reseptör|enzim|protein|gen|sinyal|aktivasyon|ekspresyon|sitokin|antikor/iu },
  { key: 'test-imaging', category: /tetkik|görüntüleme|radyoloji|laboratuvar|test|kan gazı|mikrobiyoloji/iu, definition: /ölç|değerlendir|görüntü|inceleme|test|tetkik|kültür|boyama|serum|kan|idrar|BOS|ultrason|BT|MR/iu },
  { key: 'drug-treatment', category: /ilaç|farmakoloji|antidot|tedavi|ajan|antibiyotik|antikoagülan/iu, definition: /ilaç|ajan|reseptör|inhibe|aktive|tedavi|doz|verilir|kullanılır|antidot|antibiyotik/iu },
  { key: 'anatomy', category: /anatomi|anatomik|lokalizasyon|bölge|sinir|arter|ven|kas/iu, definition: /bölge|lokalizasyon|anatomik|sinir|arter|ven|kas|kenar|çıkım|segment|komşuluk/iu },
  { key: 'exam-finding', category: /bulgu|semptom|muayene|hareket|fonksiyonel/iu, definition: /bulgu|semptom|yakınma|muayene|hareket|ağrı|kısıtlılık|hassasiyet|duygu|güç|refleks/iu },
  { key: 'mechanism', category: /mekanizma|patofizyoloji|fizyoloji|biyokimya|asit-baz/iu, definition: /mekanizma|yanıt|aktivasyon|inhibisyon|akım|basınç|metabolik|fizyolojik|patofizyolojik/iu },
];

const TITLE_DEFINITION_MISMATCH_RULES = [
  { title: /astım|asthma/iu, forbidden: /paraziter enfeksiyonlarla ilişkili granülosit|granülosittir/iu, reason: 'asthma-title-with-eosinophil-definition' },
  { title: /eozinofil/iu, forbidden: /geri dönüşümlü hava yolu obstrüksiyonu|bronş hiperreaktivitesi/iu, reason: 'eosinophil-title-with-asthma-definition' },
  { title: /ileus/iu, forbidden: /hava yolu|bronş|astım|mesane çıkım|safra yolu/iu, reason: 'ileus-definition-with-nonintestinal-obstruction-context' },
  { title: /Doppler|ultrasonografi|BT|MR|grafi|Coombs|kültür|yayma/iu, forbidden: /tedavi edilir|ilk tedavi|verilmelidir|doz/iu, reason: 'test-title-with-treatment-definition' },
  { title: /aktif elevasyon|pasif elevasyon|abdüksiyon|rotasyon|fleksiyon|ekstansiyon/iu, forbidden: /bağırsak|safra|idrar kültürü|antibiyotik/iu, reason: 'movement-title-with-unrelated-system-definition' },
  { title: /insizyon|eksplorasyon|detorsiyon|orşiopeksi|laparotomi|drenaj/iu, forbidden: /granülosit|hücre reseptörü|spirometri|glomerüler filtrasyon/iu, reason: 'procedure-title-with-unrelated-definition' },
];

function classifyGlossaryCategory(entry = {}) {
  const category = String(entry.category || '').trim();
  const term = String(entry.canonicalTerm || entry.displayTerm || entry.term || '').trim();
  const definition = String(entry.shortDefinition || entry.definition || entry.previewDefinition || '').trim();
  const combined = `${category} ${term} ${definition}`;
  if (/hastalık|sendrom|neoplazi|tümör|kanser|enfeksiyon hastalığı/iu.test(combined)) return 'Hastalık / sendrom / klinik tablo';
  if (/semptom|yakınma|dispne|ağrı|öksürük|senkop|hematemez|melena|hemoptizi/iu.test(combined)) return 'Semptom / yakınma';
  if (/muayene|bulgu|defans|rebound|hassasiyet|refleks|motor|duyusal|hareket|elevasyon|rotasyon/iu.test(combined)) return 'Fizik/fonksiyonel muayene bulgusu';
  if (/anatomi|anatomik|lokalizasyon|bölge|sinir|arter|ven|kas|skapula|inguinal/iu.test(combined)) return 'Anatomik bölge / lokalizasyon';
  if (/cerrahi|insizyon|eksplorasyon|detorsiyon|orşiopeksi|laparotomi|drenaj|rezeksiyon|biyopsi/iu.test(combined)) return 'Cerrahi işlem / girişim';
  if (/tetkik|görüntüleme|ultrasonografi|Doppler|BT|MR|grafi|Coombs|kültür|yayma|kan gazı/iu.test(combined)) return 'Tetkik / görüntüleme / laboratuvar';
  if (/biyokimya|enzim|reseptör|molekül|hücre|sitokin|protein|gen|GTPaz|kinaz|kompleman/iu.test(combined)) return 'Hücre / molekül / biyokimyasal kavram';
  if (/ilaç|farmakoloji|antidot|tedavi|antibiyotik|epinefrin|kalsiyum|magnezyum|nalokson/iu.test(combined)) return 'Farmakolojik ajan / tedavi yaklaşımı';
  if (/mekanizma|patofizyoloji|fizyoloji|inflamasyon|iskemi|nekroz|ödem|obstrüksiyon|asidoz|alkaloz|perfüzyon/iu.test(combined)) return 'Patofizyolojik/fizyolojik mekanizma';
  return 'Genel klinik kavram';
}

function maybeDefinitionMatchesCategory(entry = {}) {
  const category = String(entry.category || '').trim();
  const definition = String(entry.shortDefinition || entry.definition || entry.previewDefinition || '').trim();
  if (!category || !definition) return true;
  const direct = CATEGORY_KEYWORDS.find((rule) => rule.category.test(category));
  if (!direct) return true;
  return direct.definition.test(definition);
}

function hasSuspiciousTitleDefinitionMismatch(entry = {}) {
  const title = String(entry.canonicalTerm || entry.displayTerm || entry.term || '').trim();
  const body = [entry.shortDefinition, entry.preAnswerSafeDefinition, entry.postAnswerExplanation, entry.postAnswerExpandedExplanation, entry.tusPearl, entry.differentialPoint]
    .filter(Boolean)
    .join(' ');
  return TITLE_DEFINITION_MISMATCH_RULES.find((rule) => rule.title.test(title) && rule.forbidden.test(body)) || null;
}

function isUnsafeShortAcronymAlias(alias = '') {
  const raw = String(alias || '').trim();
  return raw.length <= 3 && /^[A-ZÇĞİÖŞÜ]+$/.test(raw) && !['BT', 'MR', 'EKG', 'USG', 'BOS'].includes(raw);
}

function findPotentialAnswerLeakage(value = '') {
  const text = String(value || '');
  if (!text) return false;
  if (/klinik metinlerde anlamı bilinmesi gereken|klinik yönetim veya tedavi yaklaşımı bağlamında kullanılan|tıbbi\/terminolojik bir kavramdır/iu.test(text)) return false;
  return /\b(?:ilk|öncelikli|en uygun|en olası|patognomonik|tanı koydurur|düşündürür|tedavisi|verilmelidir|uygulanmalıdır|başlanmalıdır)\b/iu.test(text);
}

export function auditGlossaryIntegrity(entries = getGlossaryTerms(), options = {}) {
  const issues = [];
  const ids = new Map();
  const canonicalTerms = new Map();
  const aliases = new Map();
  const definitions = new Map();
  const categorySummary = new Map();
  const knownEntryKeys = new Set(entries.flatMap((item) => [item.id, item.term, item.canonicalTerm, item.displayTerm].filter(Boolean).map(normalizeGlossaryText)));

  entries.forEach((entry) => {
    const id = entry.id || '';
    const term = entry.canonicalTerm || entry.displayTerm || entry.term || '';
    const normalizedTerm = normalizeGlossaryText(term);
    const definition = String(entry.shortDefinition || entry.definition || entry.previewDefinition || '').trim();
    const classifiedCategory = classifyGlossaryCategory(entry);
    categorySummary.set(classifiedCategory, (categorySummary.get(classifiedCategory) || 0) + 1);

    if (!id) issues.push({ severity: 'critical', type: 'missing-id', term });
    if (!definition) issues.push({ severity: 'critical', type: 'missing-definition', id, term });
    if (definition && definition.length < 24) issues.push({ severity: 'medium', type: 'too-short-definition', id, term, definition });

    const previousTerm = ids.get(id);
    if (id && previousTerm) issues.push({ severity: 'critical', type: 'duplicate-id', id, terms: [previousTerm, term] });
    if (id) ids.set(id, term);

    const previousCanonical = canonicalTerms.get(normalizedTerm);
    if (normalizedTerm && previousCanonical && previousCanonical.id !== id) {
      issues.push({ severity: 'high', type: 'duplicate-canonical-term', normalizedTerm, entries: [previousCanonical, { id, term }] });
    } else if (normalizedTerm) {
      canonicalTerms.set(normalizedTerm, { id, term });
    }

    if (!maybeDefinitionMatchesCategory(entry)) {
      issues.push({ severity: 'medium', type: 'category-definition-mismatch-suspicion', id, term, category: entry.category, definition });
    }

    const titleMismatch = hasSuspiciousTitleDefinitionMismatch(entry);
    if (titleMismatch) {
      issues.push({ severity: 'critical', type: 'title-definition-mismatch-suspicion', id, term, reason: titleMismatch.reason });
    }

    const normalizedDefinition = normalizeGlossaryText(definition);
    if (normalizedDefinition && normalizedDefinition.length > 32) {
      const list = definitions.get(normalizedDefinition) || [];
      list.push({ id, term, category: entry.category });
      definitions.set(normalizedDefinition, list);
    }

    if (findPotentialAnswerLeakage(entry.preAnswerSafeDefinition || '')) {
      issues.push({ severity: 'high', type: 'pre-answer-leakage-risk', id, term, preAnswerSafeDefinition: entry.preAnswerSafeDefinition });
    }

    if (Array.isArray(entry.relatedTerms)) {
      entry.relatedTerms.forEach((related) => {
        const key = normalizeGlossaryText(related);
        if (key && !knownEntryKeys.has(key)) issues.push({ severity: 'low', type: 'orphan-related-term', id, term, related });
      });
    }

    (entry.aliases || []).forEach((alias) => {
      const normalized = normalizeGlossaryText(alias);
      if (!normalized) return;
      const list = aliases.get(normalized) || [];
      list.push({ id, term, alias, category: entry.category, isGenericConcept: Boolean(entry.isGenericConcept), isContextSensitive: Boolean(entry.isContextSensitive) });
      aliases.set(normalized, list);

      if (isGenericStandaloneAlias(alias) && !entry.isGenericConcept && !isExactCanonicalAlias(entry, alias)) {
        issues.push({ severity: 'critical', type: 'generic-alias-assigned-to-specific-entry', id, term, alias, category: entry.category });
      }
      if (isUnsafeShortAcronymAlias(alias) && !entry.caseSensitiveDisplay) {
        issues.push({ severity: 'medium', type: 'short-acronym-case-safety-risk', id, term, alias });
      }
      if (String(alias).trim().split(/\s+/).length === 1 && entry.isMultiWordTerm && !isExactCanonicalAlias(entry, alias) && isGenericStandaloneAlias(alias)) {
        issues.push({ severity: 'high', type: 'single-word-alias-shadowing-phrase-risk', id, term, alias });
      }
    });
  });

  aliases.forEach((list, normalizedAlias) => {
    const ownerIds = Array.from(new Set(list.map((item) => item.id)));
    if (ownerIds.length > 1) issues.push({ severity: 'critical', type: 'duplicate-normalized-alias', normalizedAlias, entries: list });
  });

  definitions.forEach((list, normalizedDefinition) => {
    const categories = new Set(list.map((item) => String(item.category || '').split('/')[0].trim()));
    if (list.length > 2 && categories.size > 1) {
      issues.push({ severity: 'medium', type: 'duplicated-definition-across-unrelated-entries', normalizedDefinition, entries: list.slice(0, 8) });
    }
  });

  const severityCounts = issues.reduce((acc, issue) => {
    acc[issue.severity || 'low'] = (acc[issue.severity || 'low'] || 0) + 1;
    return acc;
  }, { critical: 0, high: 0, medium: 0, low: 0 });

  return {
    totalEntries: entries.length,
    totalAliases: entries.reduce((sum, entry) => sum + (entry.aliases?.length || 0), 0),
    issueCount: issues.length,
    severityCounts,
    categorySummary: Object.fromEntries([...categorySummary.entries()].sort((a, b) => b[1] - a[1])),
    issues,
  };
}

function buildNormalizedGlossary(entries = []) {
  const byLabel = new Map();

  entries.forEach((entry) => {
    const canonical = entry?.canonicalTerm || entry?.displayTerm || entry?.term;
    if (!canonical || !(entry?.definition || entry?.shortDefinition || entry?.previewDefinition || entry?.preAnswerSafeDefinition)) return;
    const normalized = normalizeGlossaryText(canonical);
    const normalizedEntry = normalizeEntry({ ...entry, term: canonical });
    if (!normalizedEntry.aliases?.length) return;

    if (!byLabel.has(normalized)) {
      byLabel.set(normalized, normalizedEntry);
      return;
    }

    const existing = byLabel.get(normalized);
    const preferred = compareGlossaryEntrySpecificity(existing, normalizedEntry) <= 0 ? existing : normalizedEntry;
    const secondary = preferred === existing ? normalizedEntry : existing;
    const aliases = Array.from(new Set([...(preferred.aliases || []), ...(secondary.aliases || [])]))
      .sort((a, b) => b.length - a.length);
    byLabel.set(normalized, normalizeEntry({ ...secondary, ...preferred, aliases }));
  });

  return enforceGlossaryAliasIntegrity(Array.from(byLabel.values()).sort(compareGlossaryEntrySpecificity));
}

function getExtraTermsCacheKey(extraTerms = []) {
  if (!Array.isArray(extraTerms) || !extraTerms.length) return '';
  return extraTerms
    .map((entry) => `${entry?.id || ''}:${entry?.term || ''}:${entry?.aliases?.length || 0}`)
    .join('|');
}


const PREANSWER_DEFINITION_LEAKAGE_PATTERNS = [
  /\b(?:ilk|öncelikli|en uygun|en olası|kesin|klasik|tipik|patognomonik)\s+(?:tedavi|yaklaşım|basamak|tanı|etken|bulgu|ipucu|seçenek|yanıt|manevra|görüntüleme)\b/iu,
  /\b(?:düşündürür|destekler|ayırt ettirir|tanı koydurur|tanısını destekler|verilmelidir|uygulanmalıdır|başlanmalıdır)\b/iu,
  /\b(?:ilk kullanılan|ilk uygulanan|ilk görülen|ilk manevra|ilk basamak|ilk ulaştığı|öncelikle uygulanması|başlayan ilk|katalizleyen enzimdir)\b/iu,
  /\bilk\b/iu,
  /\b(?:yüksek değerli|ilk geçiş|lenfatik drenajın ilk|ilk ulaştığı|ilk manevralardan)\b/iu,
  /\b(?:düşük|yüksek|azalmış|artmış)\s+(?:biyoyararlanım|saptanır|saptandı)\b/iu,
];

export function hasPreAnswerDefinitionLeakage(value = '') {
  const text = String(value || '');
  return PREANSWER_DEFINITION_LEAKAGE_PATTERNS.some((pattern) => pattern.test(text));
}


export function isPlaceholderDefinitionText(value = '') {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (!text) return false;
  const patterns = [
    /klinik metinlerde anlam[ıi] bilinmesi gereken/iu,
    /t[ıi]bbi\/?terminolojik bir kavramd[ıi]r/iu,
    /t[ıi]bbi a[çc][ıi]dan [öo]nemli bir kavramd[ıi]r/iu,
    /klinikte kullan[ıi]lan bir terimdir/iu,
    /sa[ğg]l[ıi]k alan[ıi]nda kullan[ıi]lan bir ifadedir/iu,
    /TUS a[çc][ıi]s[ıi]ndan bilinmesi gereken/iu,
    /bu kavram klinik pratikte [öo]nemlidir/iu,
    /bu terim t[ıi]bbi metinlerde ge[çc]ebilir/iu,
    /hakk[ıi]nda bilgi sahibi olmak [öo]nemlidir/iu,
    /ilgili klinik ba[ğg]lamda de[ğg]erlendirilmelidir/iu,
    /çeşitli hastalıklarla ilişkili olabilir/iu,
    /tan[ıi] ve tedavide [öo]nem ta[şs][ıi]r/iu,
    /klinik tabloyla ilişkili bir terimdir/iu,
    /belirli semptom, muayene ve objektif veri [öo]r[üu]nt[üu]s[üu]yle tan[ıi]nan/iu,
    /tipik başvuru, ay[ıi]rt ettirici muayene\/laboratuvar bulgusu/iu,
    /kaynak c[üu]mlelerde .* ile e[şs]le[şs]mesi/iu,
    /TUS’ta .* benzer tablolardan bir veya iki ay[ıi]rt ettirici ipucuyla ayr[ıi]l[ıi]r/iu,
    /başlang[ıi]ç h[ıi]z[ıi], lokalizasyon, sistemik bulgu/iu,
    /KlinikIQ metinlerinde klinik ak[ıi]l y[üu]r[üu]tmeyi destekleyen/iu,
    /ge[çc]ti[ğg]i c[üu]mledeki klinik ba[ğg]lama g[öo]re a[çc][ıi]klanmas[ıi] gereken/iu,
    /neden [öo]nemli, hangi mekanizmaya ba[ğg]lan[ıi]r/iu,
    /ancak olgu i[çc]indeki ay[ıi]rt ettirici ipucuyla birlikte de[ğg]er kazan[ıi]r/iu,
    /tooltip bu ipucunu ezber de[ğg]il karar mant[ıi][ğg][ıi] olarak anlatmal[ıi]d[ıi]r/iu,
  ];
  return patterns.some((pattern) => pattern.test(text));
}

function buildNeutralSafeDefinitionForEntry(entry = {}, canonicalTerm = '') {
  const term = canonicalTerm || entry.canonicalTerm || entry.displayTerm || entry.term || 'Bu kavram';
  const category = String(entry.category || '').toLocaleLowerCase('tr');
  const shortDefinition = String(entry.shortDefinition || entry.definition || entry.previewDefinition || '').trim();

  // Prefer an already scientific short definition if it is not itself leaky or filler.
  if (shortDefinition && !hasPreAnswerDefinitionLeakage(shortDefinition) && !isPlaceholderDefinitionText(shortDefinition)) {
    return shortDefinition;
  }

  if (/kadın|doğum|obstetrik|preeklampsi|gebelik|postpartum/.test(category)) {
    return `${term}, gebelik veya postpartum bağlamda maternal-fetal risk değerlendirmesiyle ilişkili klinik bir kavramdır; ayrıntılı tanı/tedavi ipuçları cevap sonrası gösterilir.`;
  }
  if (/ilaç|farmakoloji|antidot|tedavi|ajan|antibiyotik|antikoagülan|manevra|girişim|cerrahi/.test(category)) {
    return `${term}, klinik yönetimde belirli bir mekanizma veya işlem basamağıyla ilişkili yaklaşımdır; uygulama sırası ve endikasyon bağlama göre değerlendirilir.`;
  }
  if (/hastalık|sendrom|enfeksiyon|patoloji|neoplazi|tümör|kanser|acil/.test(category)) {
    return `${term}, belirli organ/sistem etkilenimi ve klinik bulgu örüntüsüyle yorumlanan hastalık veya klinik tablodur.`;
  }
  if (/laboratuvar|biyokimya|asit|baz|kan gazı|parametre/.test(category)) {
    return `${term}, biyolojik süreç veya laboratuvar yorumu açısından anlam taşıyan ölçüm/kavramdır; yorum klinik bağlama göre yapılır.`;
  }
  if (/tetkik|görüntüleme|radyoloji|bt|mr|ultrasonografi|grafi/.test(category)) {
    return `${term}, belirli anatomik veya patolojik soruyu yanıtlamak için kullanılan görüntüleme/değerlendirme yöntemidir.`;
  }
  if (/bulgu|semptom|muayene|ekg|hareket|fonksiyonel/.test(category)) {
    return `${term}, muayene veya klinik gözlemde saptanan ve altta yatan mekanizmayı yorumlamaya yardım eden bulgudur.`;
  }
  if (/anatomi|anatomik|lokalizasyon|bölge|sinir|arter|ven|kas/.test(category)) {
    return `${term}, klinik bulgu veya girişimlerin anatomik yerleşimini anlamak için kullanılan lokalizasyon kavramıdır.`;
  }
  if (/mekanizma|fizyoloji|moleküler|genetik|immünoloji|patofizyoloji|sinyal/.test(category)) {
    return `${term}, hücresel veya sistemik yanıtı açıklayan mekanizma/temel bilim kavramıdır.`;
  }
  return `${term}, klinik bağlama göre organ, mekanizma veya karar süreciyle ilişkilendirilerek yorumlanan tıbbi kavramdır.`;
}

function normalizeEntry(entry = {}) {
  const canonicalTerm = entry.canonicalTerm || entry.displayTerm || entry.term || '';
  const displayTerm = entry.displayTerm || entry.canonicalTerm || entry.term || canonicalTerm;
  const aliases = Array.from(new Set([canonicalTerm, displayTerm, entry.term, ...(entry.aliases || [])].filter(Boolean)))
    .flatMap(getGlossaryAliasVariants)
    .map((alias) => String(alias).replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);

  const previewDefinition = entry.previewDefinition || entry.shortDefinition || entry.definition || '';
  const rawPreAnswerSafeDefinition = entry.preAnswerSafeDefinition || previewDefinition;
  const preAnswerSafeDefinition = hasPreAnswerDefinitionLeakage(rawPreAnswerSafeDefinition)
    ? buildNeutralSafeDefinitionForEntry(entry, canonicalTerm)
    : rawPreAnswerSafeDefinition;
  const shortDefinition = entry.shortDefinition || previewDefinition || entry.definition || '';
  const postAnswerExpandedExplanation = entry.postAnswerExpandedExplanation || entry.postAnswerExplanation || entry.detailedExplanation || entry.longDefinition || '';
  const normalizedTerm = entry.normalizedTerm || normalizeGlossaryText(canonicalTerm);
  const matchingPriority = getEntryMatchingPriority({ ...entry, term: canonicalTerm });

  return {
    id: entry.id || normalizedTerm.replace(/[^a-z0-9]+/giu, '-').replace(/^-|-$/g, '') || canonicalTerm,
    ...entry,
    term: canonicalTerm,
    canonicalTerm,
    displayTerm,
    definition: entry.definition || shortDefinition,
    shortDefinition,
    previewDefinition,
    preAnswerSafeDefinition,
    postAnswerExplanation: entry.postAnswerExplanation || postAnswerExpandedExplanation || '',
    postAnswerExpandedExplanation,
    detailedExplanation: entry.detailedExplanation || entry.longDefinition || postAnswerExpandedExplanation || '',
    tusPearl: entry.tusPearl || entry.examPearl || entry.pearl || '',
    differentialPoint: entry.differentialPoint || entry.differential || entry.ayiriciNot || '',
    clinicalContext: entry.clinicalContext || entry.clinicalRelevance || '',
    clinicalRelevance: entry.clinicalRelevance || entry.clinicalContext || '',
    mechanism: entry.mechanism || '',
    TurkishName: entry.TurkishName || entry.turkishName || canonicalTerm || '',
    EnglishName: entry.EnglishName || entry.englishName || '',
    LatinName: entry.LatinName || entry.latinName || '',
    abbreviation: entry.abbreviation || '',
    relatedTerms: entry.relatedTerms || [],
    safeNestedTerms: entry.safeNestedTerms || [],
    relatedCases: entry.relatedCases || entry.relatedCaseIds || [],
    relatedQuestions: entry.relatedQuestions || [],
    relatedFlashcards: entry.relatedFlashcards || [],
    difficulty: entry.difficulty || entry.priority || 'orta',
    keywordsForSearch: entry.keywordsForSearch || [],
    sourceTextExamples: entry.sourceTextExamples || [],
    matchingPriority,
    isMultiWordTerm: entry.isMultiWordTerm ?? /\s/.test(canonicalTerm),
    isGenericConcept: Boolean(entry.isGenericConcept),
    isContextSensitive: Boolean(entry.isContextSensitive),
    standaloneSafe: entry.standaloneSafe === true,
    contextRequired: Boolean(entry.contextRequired),
    phraseOnly: Boolean(entry.phraseOnly),
    allowedContexts: entry.allowedContexts || [],
    blockedContexts: entry.blockedContexts || [],
    allowedContextKeywords: entry.allowedContextKeywords || [],
    blockedContextKeywords: entry.blockedContextKeywords || [],
    requiredCoTerms: entry.requiredCoTerms || [],
    forbiddenCoTerms: entry.forbiddenCoTerms || [],
    preferredPhraseEntries: entry.preferredPhraseEntries || [],
    ambiguityGroup: entry.ambiguityGroup || '',
    disambiguationRule: entry.disambiguationRule || '',
    genericFallbackEntryId: entry.genericFallbackEntryId || '',
    nestedGlossaryAllowed: entry.nestedGlossaryAllowed !== false,
    disabledAsStandaloneAlias: Boolean(entry.disabledAsStandaloneAlias),
    answerLeakRisk: entry.answerLeakRisk || 'medium',
    caseSensitiveDisplay: Boolean(entry.caseSensitiveDisplay || aliases.some(isShortCaseSensitiveMedicalToken)),
    capitalizationRule: entry.capitalizationRule || 'canonical-medical-title',
    normalizedTerm,
    aliases,
    normalizedAliases: aliases.map(normalizeGlossaryText),
  };
}

export function getBranchGlossaryTerms(branchId) {
  return branchGlossaryTerms[branchId] || [];
}

export function getGlossaryTerms(extraTerms = null, options = {}) {
  const branchId = options?.branchId || '';
  const branchTerms = branchId ? getBranchGlossaryTerms(branchId) : [];
  const hasBranchTerms = branchTerms.length > 0;
  const hasExtraTerms = Array.isArray(extraTerms) && extraTerms.length > 0;
  const extraKey = getExtraTermsCacheKey(extraTerms);
  const cacheKey = `${branchId || 'global'}::${hasBranchTerms ? branchTerms.length : 0}::${extraKey}`;

  if (!hasBranchTerms && !hasExtraTerms && NORMALIZED_GLOSSARY_CACHE.has(cacheKey)) {
    return NORMALIZED_GLOSSARY_CACHE.get(cacheKey);
  }

  if ((hasBranchTerms || hasExtraTerms) && NORMALIZED_GLOSSARY_CACHE.has(cacheKey)) {
    return NORMALIZED_GLOSSARY_CACHE.get(cacheKey);
  }

  const merged = [
    ...STATIC_GLOSSARY_SOURCES,
    ...branchTerms,
    ...(hasExtraTerms ? extraTerms : []),
  ];

  return rememberNormalizedGlossary(cacheKey, buildNormalizedGlossary(merged));
}
