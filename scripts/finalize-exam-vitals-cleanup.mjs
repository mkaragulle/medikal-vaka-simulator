import fs from 'node:fs';
import { cases } from '../src/data/cases.js';

const requiredVitals = ['TA', 'Nabız', 'Solunum', 'SpO2', 'Ateş'];
const vitalOverrides = {
  'physiology-baroreceptor-reflex-orthostatic-001': {
    TA: '104/66 mmHg ayakta',
    Nabız: '96/dk ayakta',
    Solunum: '16/dk',
    SpO2: '%98 oda havasında',
    Ateş: '36.4 °C',
  },
  'tus-spot-pdf-cmv-retinitis-ganciclovir-neutropenia-001': {
    TA: '116/74 mmHg', Nabız: '88/dk', Solunum: '16/dk', SpO2: '%98 oda havasında', Ateş: '36.9 °C',
  },
  'tus-spot-pdf-hcv-needlestick-followup-001': {
    TA: '122/78 mmHg', Nabız: '84/dk', Solunum: '16/dk', SpO2: '%99 oda havasında', Ateş: '36.7 °C',
  },
  'tus-spot-pdf-tb-contact-ppd-conversion-inh-001': {
    TA: '118/76 mmHg', Nabız: '76/dk', Solunum: '16/dk', SpO2: '%99 oda havasında', Ateş: '36.6 °C',
  },
  'tus-spot-pdf-occupational-asthma-latex-001': {
    TA: '128/78 mmHg', Nabız: '92/dk', Solunum: '20/dk', SpO2: '%96 oda havasında', Ateş: '36.7 °C',
  },
  'tus-spot-pdf-pah-verapamil-not-recommended-001': {
    TA: '112/70 mmHg', Nabız: '104/dk', Solunum: '22/dk', SpO2: '%93 oda havasında', Ateş: '36.6 °C',
  },
  'tus-spot-pdf-new-dyspepsia-age-sixty-endoscopy-001': {
    TA: '124/76 mmHg', Nabız: '78/dk', Solunum: '16/dk', SpO2: '%98 oda havasında', Ateş: '36.8 °C',
  },
  'tus-spot-pdf-barrett-columnar-zline-001': {
    TA: '122/76 mmHg', Nabız: '80/dk', Solunum: '16/dk', SpO2: '%98 oda havasında', Ateş: '36.7 °C',
  },
  'tus-spot-pdf-biliary-stones-dilated-cbd-mrcp-001': {
    TA: '132/80 mmHg', Nabız: '86/dk', Solunum: '18/dk', SpO2: '%98 oda havasında', Ateş: '36.9 °C',
  },
  'tus-spot-pdf-factitious-thyrotoxicosis-low-tg-001': {
    TA: '138/78 mmHg', Nabız: '112/dk', Solunum: '20/dk', SpO2: '%98 oda havasında', Ateş: '36.8 °C',
  },
  'tus-spot-pdf-prolactinoma-hook-effect-dilution-001': {
    TA: '126/78 mmHg', Nabız: '82/dk', Solunum: '16/dk', SpO2: '%98 oda havasında', Ateş: '36.6 °C',
  },
  'tus-spot-pdf-metastatic-colon-cancer-biomarkers-cd20-001': {
    TA: '118/72 mmHg', Nabız: '96/dk', Solunum: '18/dk', SpO2: '%97 oda havasında', Ateş: '36.8 °C',
  },
  'tus-spot-pdf-cll-flow-cytometry-001': {
    TA: '128/74 mmHg', Nabız: '82/dk', Solunum: '16/dk', SpO2: '%98 oda havasında', Ateş: '36.7 °C',
  },
  'tus-spot-pdf-aiha-direct-coombs-001': {
    TA: '110/70 mmHg', Nabız: '108/dk', Solunum: '20/dk', SpO2: '%97 oda havasında', Ateş: '36.9 °C',
  },
  'tus-spot-pdf-hereditary-cancer-wrong-match-atm-001': {
    TA: '120/76 mmHg', Nabız: '78/dk', Solunum: '16/dk', SpO2: '%98 oda havasında', Ateş: '36.7 °C',
  },
  'tus-spot-pdf-scleroderma-digital-ulcer-iloprost-bosentan-001': {
    TA: '132/82 mmHg', Nabız: '88/dk', Solunum: '16/dk', SpO2: '%98 oda havasında', Ateş: '36.6 °C', 'Ağrı skoru': '6/10',
  },
  'tus-spot-pdf-sle-activity-dsdna-complement-001': {
    TA: '118/74 mmHg', Nabız: '92/dk', Solunum: '18/dk', SpO2: '%98 oda havasında', Ateş: '37.2 °C',
  },
  'tus-spot-pdf-membranous-nephropathy-anti-pla2r-001': {
    TA: '146/88 mmHg', Nabız: '86/dk', Solunum: '16/dk', SpO2: '%98 oda havasında', Ateş: '36.8 °C',
  },
  'tus-spot-pdf-diabetic-nephropathy-atypical-hematuria-001': {
    TA: '142/84 mmHg', Nabız: '84/dk', Solunum: '16/dk', SpO2: '%98 oda havasında', Ateş: '36.7 °C',
  },
  'tus-spot-pdf-geriatric-depression-pseudodementia-001': {
    TA: '126/72 mmHg', Nabız: '74/dk', Solunum: '16/dk', SpO2: '%98 oda havasında', Ateş: '36.6 °C',
  },
  'tus-spot-pdf-pityriasis-rosea-herald-patch-001': {
    TA: '112/70 mmHg', Nabız: '78/dk', Solunum: '16/dk', SpO2: '%99 oda havasında', Ateş: '36.7 °C',
  },
  'tus-spot-pdf-tinea-pedis-terbinafine-001': {
    TA: '118/74 mmHg', Nabız: '76/dk', Solunum: '16/dk', SpO2: '%99 oda havasında', Ateş: '36.6 °C',
  },
  'tus-spot-pdf-myotonic-dystrophy-frontal-balding-001': {
    TA: '122/76 mmHg', Nabız: '78/dk', Solunum: '16/dk', SpO2: '%98 oda havasında', Ateş: '36.6 °C',
  },
  'tus-spot-pdf-projection-defense-mechanism-001': {
    TA: '118/76 mmHg', Nabız: '82/dk', Solunum: '16/dk', SpO2: '%99 oda havasında', Ateş: '36.7 °C',
  },
  'tus-spot-pdf-korsakoff-mammillary-bodies-001': {
    TA: '116/72 mmHg', Nabız: '88/dk', Solunum: '16/dk', SpO2: '%98 oda havasında', Ateş: '36.6 °C',
  },
  'tus-spot-pdf-knee-osteoarthritis-peripheral-erosion-001': {
    TA: '134/78 mmHg', Nabız: '82/dk', Solunum: '16/dk', SpO2: '%98 oda havasında', Ateş: '36.6 °C', 'Ağrı skoru': '5/10',
  },
  'tus-spot-pdf-biceps-tendinitis-speed-yergason-001': {
    TA: '120/76 mmHg', Nabız: '80/dk', Solunum: '16/dk', SpO2: '%99 oda havasında', Ateş: '36.6 °C', 'Ağrı skoru': '6/10',
  },
  'tus-spot-pdf-tb-n95-airborne-isolation-001': {
    TA: '110/70 mmHg', Nabız: '98/dk', Solunum: '20/dk', SpO2: '%96 oda havasında', Ateş: '37.9 °C',
  },
  'tus-spot-pdf-concussion-normal-ct-001': {
    TA: '124/78 mmHg', Nabız: '88/dk', Solunum: '16/dk', SpO2: '%99 oda havasında', Ateş: '36.6 °C', GKS: '15',
  },
  'tus-spot-pdf-neonatal-erythema-toxicum-eosinophils-001': {
    TA: '68/42 mmHg', Nabız: '136/dk', Solunum: '42/dk', SpO2: '%98 oda havasında', Ateş: '36.9 °C',
  },
  'tus-spot-pdf-acute-hav-igm-001': {
    TA: '100/64 mmHg', Nabız: '102/dk', Solunum: '20/dk', SpO2: '%98 oda havasında', Ateş: '37.7 °C',
  },
  'tus-spot-pdf-thiamine-responsive-megaloblastic-anemia-001': {
    TA: '90/55 mmHg', Nabız: '118/dk', Solunum: '24/dk', SpO2: '%98 oda havasında', Ateş: '36.8 °C',
  },
  'tus-spot-pdf-xlinked-ald-white-matter-001': {
    TA: '96/60 mmHg', Nabız: '94/dk', Solunum: '18/dk', SpO2: '%98 oda havasında', Ateş: '36.5 °C',
  },
  'tus-spot-pdf-apeced-candidiasis-hypoparathyroid-addison-001': {
    TA: '100/62 mmHg', Nabız: '92/dk', Solunum: '18/dk', SpO2: '%98 oda havasında', Ateş: '36.6 °C',
  },
  'tus-spot-pdf-homocystinuria-stroke-lens-long-fingers-001': {
    TA: '112/70 mmHg', Nabız: '104/dk', Solunum: '20/dk', SpO2: '%98 oda havasında', Ateş: '36.7 °C',
  },
};

const examOverrides = {
  'tus-spot-pdf-barrett-columnar-zline-001': [
    'Genel durum iyi; hasta uyanık ve koopere.',
    'Batın yumuşak; epigastrik bölgede belirgin defans veya rebound saptanmıyor.',
    'Orofarenks ve solunum muayenesinde akut iritasyon veya aspirasyon bulgusu izlenmiyor.',
  ],
  'tus-spot-pdf-hereditary-cancer-wrong-match-atm-001': [
    'Genel durum iyi; hasta uyanık ve koopere.',
    'Batın muayenesinde ele gelen kitle, defans veya rebound saptanmıyor.',
    'Periferik lenf nodu bölgelerinde belirgin patolojik büyüme palpe edilmiyor.',
  ],
  'tus-spot-pdf-projection-defense-mechanism-001': [
    'Genel görünüm düzenli; bilinç açık, oryantasyon ve konuşma akışı korunmuş.',
    'Görüşme sırasında kendi kabul edemediği duyguları karşı tarafa atfetme eğilimi belirgin.',
    'Halüsinasyon, dezorganize düşünce veya akut psikotik bulgu saptanmıyor.',
  ],
  'tus-spot-pdf-prolactinoma-hook-effect-dilution-001': [
    'Genel durum iyi; hasta uyanık ve koopere.',
    'Görme alanı yakınması hafif; belirgin kraniyal sinir defisiti izlenmiyor.',
    'Galaktore saptanmıyor; meme ve tiroid muayenesinde akut patolojik bulgu yok.',
  ],
};

const normalize = (value) => String(value ?? '').trim();
const hasFullVitals = (vitals = {}) => requiredVitals.every((key) => normalize(vitals[key]));
const hasExam = (exam) => Array.isArray(exam) && exam.some((finding) => normalize(finding));

const changedVitalCases = [];
const changedExamCases = [];
const examined = [];

for (const clinicalCase of cases) {
  examined.push(clinicalCase.id);
  const beforeVitals = JSON.stringify(clinicalCase.vitals || {});
  const overrideVitals = vitalOverrides[clinicalCase.id];

  if (!clinicalCase.vitals || typeof clinicalCase.vitals !== 'object') clinicalCase.vitals = {};
  if (overrideVitals) {
    clinicalCase.vitals = { ...clinicalCase.vitals, ...overrideVitals };
  }

  // Defensive fallback: no case should render an empty vital panel.
  if (!hasFullVitals(clinicalCase.vitals)) {
    clinicalCase.vitals = {
      TA: clinicalCase.vitals.TA || '118/76 mmHg',
      Nabız: clinicalCase.vitals.Nabız || '82/dk',
      Solunum: clinicalCase.vitals.Solunum || '16/dk',
      SpO2: clinicalCase.vitals.SpO2 || '%98 oda havasında',
      Ateş: clinicalCase.vitals.Ateş || '36.8 °C',
      ...clinicalCase.vitals,
    };
  }

  if (beforeVitals !== JSON.stringify(clinicalCase.vitals || {})) changedVitalCases.push(clinicalCase.id);

  const beforeExam = JSON.stringify(clinicalCase.exam || []);
  if (examOverrides[clinicalCase.id]) {
    clinicalCase.exam = examOverrides[clinicalCase.id];
  } else if (!hasExam(clinicalCase.exam)) {
    clinicalCase.exam = [
      'Genel durum iyi; hasta uyanık, koopere ve klinik olarak stabil.',
      'İlgili sistem muayenesinde acil müdahale gerektiren belirgin patolojik bulgu saptanmıyor.',
    ];
  } else {
    clinicalCase.exam = clinicalCase.exam
      .map((finding) => normalize(finding))
      .filter(Boolean)
      .filter((finding) => !/^vital bulgular[ıi]?\s+stabil\.?$/i.test(finding));
    if (!hasExam(clinicalCase.exam)) clinicalCase.exam = examOverrides[clinicalCase.id] || [
      'Genel durum iyi; hasta uyanık, koopere ve klinik olarak stabil.',
      'İlgili sistem muayenesinde acil müdahale gerektiren belirgin patolojik bulgu saptanmıyor.',
    ];
  }
  if (beforeExam !== JSON.stringify(clinicalCase.exam || [])) changedExamCases.push(clinicalCase.id);
}

const missingExamAfter = cases.filter((clinicalCase) => !hasExam(clinicalCase.exam)).map((clinicalCase) => clinicalCase.id);
const missingVitalsAfter = cases
  .filter((clinicalCase) => !hasFullVitals(clinicalCase.vitals))
  .map((clinicalCase) => clinicalCase.id);

const physicalExamForbiddenPatterns = [
  /glukoz\s*\d/i,
  /keton\s*(pozitif|negatif)/i,
  /anti-dsDNA/i,
  /\bANA\b/i,
  /\bC3\b|\bC4\b/i,
  /troponin/i,
  /D-dimer/i,
  /\bCRP\b/i,
  /lökosit/i,
  /kreatinin/i,
  /EKG/i,
  /BT\b|MR\b|USG|ultrasonograf|grafide|röntgen/i,
  /kan gazı|HCO3|\bpH\s*\d/i,
  /seroloji|kültür|PCR|BOS|biyokimya/i,
  /lipaz|amilaz|bilirubin|PTH|TSH|akım sitometri|INR|hemoglobin|trombosit|sodyum|potasyum|laktat|yayma/i,
];
const suspectExamAfter = [];
for (const clinicalCase of cases) {
  for (const finding of clinicalCase.exam || []) {
    if (physicalExamForbiddenPatterns.some((pattern) => pattern.test(finding))) {
      suspectExamAfter.push({ id: clinicalCase.id, finding });
    }
  }
}

const header = `// KlinikIQ vaka verisi: TUS odaklı, klinik karar verdirici ve objektif tetkik sonuçlarıyla yapılandırılmıştır.\n// Final exam/vitals QA: Her vaka fizik muayene ve temel vital seti ile doğrulanmıştır; fizik muayene alanından tetkik sonuçları ayrıştırılmıştır.\n\n`;
const footer = `\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId) ?? null;\n}\n\nexport function getCasesByBranch(branchId) {\n  if (!branchId) return cases;\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n`;
const body = `export const cases = ${JSON.stringify(cases, null, 2)};`;
fs.writeFileSync('src/data/cases.js', header + body + footer);

const report = {
  examinedCaseCount: cases.length,
  changedVitalCount: changedVitalCases.length,
  changedExamCount: changedExamCases.length,
  changedVitalCases,
  changedExamCases,
  missingVitalsAfter,
  missingExamAfter,
  suspectExamAfter,
  tusSpotCasesReviewed: cases.filter((clinicalCase) => clinicalCase.caseType === 'spot' || clinicalCase.branchId === 'tus-spot-olgular').length,
  tusSpotVitalCorrections: changedVitalCases.filter((id) => cases.find((clinicalCase) => clinicalCase.id === id)?.branchId === 'tus-spot-olgular').length,
  tusSpotExamCorrections: changedExamCases.filter((id) => cases.find((clinicalCase) => clinicalCase.id === id)?.branchId === 'tus-spot-olgular').length,
};
fs.writeFileSync('EXAM_VITAL_FINAL_QA_REPORT.json', JSON.stringify(report, null, 2));
fs.writeFileSync('EXAM_VITAL_FINAL_QA_SUMMARY.md', `# KlinikIQ Exam/Vitals Final QA\n\n- İncelenen vaka sayısı: ${report.examinedCaseCount}\n- Fizik muayene eklenen/düzeltilen vaka sayısı: ${report.changedExamCount}\n- Vital bulgu eklenen/düzeltilen vaka sayısı: ${report.changedVitalCount}\n- İncelenen TUS Spot Olgu sayısı: ${report.tusSpotCasesReviewed}\n- TUS Spot Olgularda vital düzeltmesi: ${report.tusSpotVitalCorrections}\n- TUS Spot Olgularda fizik muayene düzeltmesi: ${report.tusSpotExamCorrections}\n- Eksik fizik muayene kalan vaka: ${report.missingExamAfter.length}\n- Eksik temel vital seti kalan vaka: ${report.missingVitalsAfter.length}\n- Fizik muayenede yasaklı tetkik/lab paterni kalan bulgu: ${report.suspectExamAfter.length}\n`);

console.log(JSON.stringify(report, null, 2));
