import { writeFileSync } from 'node:fs';
import { cases } from '../src/data/cases.js';

const byId = (id) => cases.find((c) => c.id === id);
const replaceDeep = (node, rules) => {
  if (typeof node === 'string') {
    let v = node;
    for (const [re, rep] of rules) v = v.replace(re, rep);
    return v;
  }
  if (Array.isArray(node)) return node.map((x) => replaceDeep(x, rules));
  if (node && typeof node === 'object') {
    Object.keys(node).forEach((k) => { node[k] = replaceDeep(node[k], rules); });
  }
  return node;
};
function syncAnswerFeedback(c) {
  if (!c?.diagnosis?.answerFeedback) return;
  const af = c.diagnosis.answerFeedback;
  c.diagnosis.whyCorrect = af.whyCorrect || c.diagnosis.whyCorrect;
  c.diagnosis.evidenceChain = af.evidenceChain || c.diagnosis.evidenceChain;
  c.diagnosis.pearls = af.pearls || c.diagnosis.pearls;
  c.diagnosis.clinicalPearls = af.clinicalPearls || c.diagnosis.clinicalPearls;
  c.diagnosis.differentialComparison = af.differentialComparison || c.diagnosis.differentialComparison;
  c.diagnosis.managementSteps = af.managementSteps || c.diagnosis.managementSteps;
  c.diagnosis.management = af.managementSteps || c.diagnosis.management;
}

// Global small typo/measurement phrasing cleanup
replaceDeep(cases, [
  [/TAş/g, 'taş'],
  [/TAşikardi/g, 'taşikardi'],
  [/Safra kesesi TAşı/g, 'Safra kesesi taşı'],
  [/AST veya ALT/g, 'AST ve ALT'],
  [/ALT veya AST/g, 'ALT ve AST'],
  [/%20–45/g, '%20–45'],
  [/20-%45/g, '%20–45'],
]);

{
  const c = byId('pediatrics-classic-galactosemia-001');
  if (c) {
    c.patientIntro.distinctiveClues = [
      'Süt alımı sonrası kusma, uzamış sarılık ve emmeme',
      'Hipoglisemi, direkt hiperbilirubinemi ve transaminaz yüksekliği',
      'GALT aktivitesinde belirgin düşüklük',
      'Galaktoz-1-fosfat birikimi ve idrarda redüktan madde pozitifliği',
    ];
    c.patientIntro.priorityFocus = 'Süt alımı sonrası kusma, sarılık, hepatomegali ve katarakt klasik galaktozemiyi düşündürür.';
    const labText = 'Glukoz 56 mg/dL ile hipoglisemi, direkt bilirubin 2.4 mg/dL ile kolestatik etkilenme, AST 180 U/L ve ALT 165 U/L ile hepatoselüler hasar desteklenir.';
    const e = c.diagnosis?.answerFeedback?.evidenceChain || [];
    if (e[1]) e[1].text = labText;
    if (e[2]) e[2].text = 'GALT aktivitesinin <%10 olması ve galaktoz-1-fosfat düzeyinin 7.0 mg/dL bulunması klasik galaktozemi lehinedir.';
    const inv = c.investigations?.find((x) => /glukoz.*bilirubin/i.test(x.label || ''));
    if (inv) {
      inv.summary = 'Glukoz: 56 mg/dL (Düşük). Direkt bilirubin: 2.4 mg/dL (Yüksek). AST: 180 U/L (Yüksek). ALT: 165 U/L (Yüksek).';
      inv.findings = [
        'Glukoz: 56 mg/dL (referans 70–100 mg/dL) — Düşük. Hipoglisemi metabolik dekompansasyonu destekler.',
        'Direkt bilirubin: 2.4 mg/dL (referans <0.3 mg/dL) — Yüksek. Kolestatik etkilenme lehinedir.',
        'AST: 180 U/L (referans <35 U/L) — Yüksek.',
        'ALT: 165 U/L (referans <45 U/L) — Yüksek.',
      ];
      inv.rows = [
        ['Glukoz', '56 mg/dL', '70–100 mg/dL', 'Düşük'],
        ['Direkt bilirubin', '2.4 mg/dL', '<0.3 mg/dL', 'Yüksek'],
        ['AST', '180 U/L', '<35 U/L', 'Yüksek'],
        ['ALT', '165 U/L', '<45 U/L', 'Yüksek'],
      ];
    }
    syncAnswerFeedback(c);
  }
}
{
  const c = byId('pediatrics-von-gierke-gsd-001');
  if (c) {
    c.patientIntro.distinctiveClues = [
      'Kısa açlık sonrası hipoglisemi ve nöbet',
      'Belirgin hepatomegali ve dolgun yanak görünümü',
      'Laktik asidoz, hipertrigliseridemi ve hiperürisemi',
      'Glukoz-6-fosfataz aktivitesinde düşüklük',
    ];
    c.patientIntro.priorityFocus = 'Kısa açlıkla tetiklenen hipoglisemi, hepatomegali ve laktik asidoz karaciğer tipi glikojen depo hastalığını düşündürür.';
    const labText = 'Glukoz 38 mg/dL ile ağır hipoglisemi, laktat 5.6 mmol/L ile laktik asidoz, trigliserid 420 mg/dL ve ürik asit 8.2 mg/dL yüksekliği Von Gierke paternini destekler.';
    const e = c.diagnosis?.answerFeedback?.evidenceChain || [];
    if (e[0]) { e[0].title = 'Klinik patern'; e[0].text = 'Kısa açlıkta hipoglisemi, nöbet ve hepatomegali GSD Tip Ia için tipiktir.'; }
    if (e[1]) e[1].text = labText;
    if (e[2]) e[2].text = 'Glukoz-6-fosfataz aktivitesinin düşük olması tanısal biyokimyasal mekanizmayı açıklar.';
    syncAnswerFeedback(c);
  }
}
{
  const c = byId('internal-medicine-hemochromatosis-001');
  if (c) {
    c.patientIntro.distinctiveClues = [
      'Hiperpigmentasyon, diyabet ve karaciğer enzim yüksekliği birlikteliği',
      'Ferritin 980 ng/mL ve transferrin satürasyonu %72 ile demir yüklenmesi',
      'AST/ALT yüksekliği karaciğer etkilenmesini destekler',
      'HFE C282Y pozitifliği herediter hemokromatozisi güçlendirir',
    ];
    c.patientIntro.priorityFocus = 'Ferritin ve transferrin satürasyonu yüksekliği, hiperpigmentasyon ve diyabetle birlikte hemokromatozis lehinedir.';
    const e = c.diagnosis?.answerFeedback?.evidenceChain || [];
    const labText = 'Ferritin 980 ng/mL ve transferrin satürasyonu %72 ile demir yüklenmesi desteklenir. AST 88 U/L ve ALT 96 U/L karaciğer etkilenmesini gösterir.';
    for (const item of e) {
      if (/Ferritin yüksek|transferrin satürasyonu yüksek/i.test(item.text || '')) item.text = labText;
    }
    const inv1 = c.investigations?.find((x) => /ferritin/i.test(x.label || ''));
    if (inv1) {
      inv1.summary = 'Ferritin: 980 ng/mL (Yüksek). Transferrin satürasyonu: %72 (Yüksek).';
      inv1.findings = [
        'Ferritin: 980 ng/mL (referans 30–300 ng/mL) — Yüksek.',
        'Transferrin satürasyonu: %72 (referans %20–45) — Yüksek.',
      ];
      inv1.rows = [['Ferritin', '980 ng/mL', '30–300 ng/mL', 'Yüksek'], ['Transferrin satürasyonu', '%72', '%20–45', 'Yüksek']];
    }
    const inv2 = c.investigations?.find((x) => /karaciğer enzimleri/i.test(x.label || ''));
    if (inv2) {
      inv2.label = 'Karaciğer enzimleri ve HbA1c';
      inv2.summary = 'ALT: 96 U/L (Yüksek). AST: 88 U/L (Yüksek). HbA1c: %8.1 (Yüksek).';
      inv2.findings = [
        'ALT: 96 U/L (referans <45 U/L) — Yüksek.',
        'AST: 88 U/L (referans <35 U/L) — Yüksek.',
        'HbA1c: %8.1 (referans <%5.7) — Yüksek.',
      ];
      inv2.rows = [['ALT', '96 U/L', '<45 U/L', 'Yüksek'], ['AST', '88 U/L', '<35 U/L', 'Yüksek'], ['HbA1c', '%8.1', '<%5.7', 'Yüksek']];
    }
    syncAnswerFeedback(c);
  }
}
{
  const c = byId('tus-spot-pdf-hyperkalemia-ecg-calcium-gluconate-001');
  if (c) {
    c.patientIntro.distinctiveClues = [
      'Potasyum 7.1 mEq/L ile ağır hiperkalemi',
      "EKG'de sivri T dalgaları ve P dalga basıklaşması",
      'QRS genişlemesi kardiyak membran instabilitesini gösterir',
      'Kronik böbrek hastalığı hiperpotasemi riskini artırır',
    ];
    c.patientIntro.priorityFocus = 'Potasyum 7.1 mEq/L ve EKG değişikliği varsa ilk adım kardiyak membranı IV kalsiyum glukonatla stabilize etmektir.';
    c.learningOutcome = 'Ağır hiperkalemide EKG değişikliği varsa ilk tedavi IV kalsiyum glukonattır; potasyumu hücre içine kaydıran tedaviler bundan sonra gelir.';
    if (c.diagnosis?.answerFeedback) {
      const af = c.diagnosis.answerFeedback;
      const e = af.evidenceChain || [];
      e.forEach((item) => {
        if (/^K, 7\.$|^K⁺ 7\.$|^Potasyum 7\.$/u.test(item.text || '')) item.text = 'Potasyum 7.1 mEq/L ile ağır hiperkalemi vardır.';
        if (/Hiperkalemi\./.test(item.text || '')) item.text = 'Potasyum 7.1 mEq/L ağır hiperkalemi düzeyindedir.';
      });
      af.learningOutcome = c.learningOutcome;
      af.spotClue = 'Potasyum 7.1 mEq/L, sivri T dalgaları ve QRS genişlemesi.';
      for (const item of af.clinicalPearls || []) {
        if (/İnsülin-dekstroz/.test(item.text || '')) item.text = 'İnsülin-dekstroz potasyumu hücre içine kaydırır; EKG değişikliği varsa önce IV kalsiyum glukonat verilir.';
      }
      af.pearls = af.clinicalPearls;
      for (const diff of Object.values(af.differentialComparison || {})) {
        diff.comparisonPoints = [
          'Potasyum 7.1 mEq/L ve EKG değişikliği acil membran stabilizasyonu gerektirir.',
          'IV kalsiyum glukonat potasyumu düşürmez; kardiyak membranı stabilize eder.',
          'Potasyumu uzaklaştıran veya hücre içine kaydıran tedaviler stabilizasyondan sonra planlanır.',
        ];
      }
      syncAnswerFeedback(c);
    }
  }
}
{
  const c = byId('tus-spot-pdf-thiamine-responsive-megaloblastic-anemia-001');
  if (c) {
    const inv = c.investigations?.find((x) => /tam kan/i.test(x.label || ''));
    if (inv) {
      inv.summary = 'Hemoglobin: 5.0 g/dL (Kritik düşük). MCV: 110 fL (Yüksek).';
      inv.findings = [
        'Hemoglobin: 5.0 g/dL (referans 11–14 g/dL) — Kritik düşük. Ağır anemi mevcuttur.',
        'MCV: 110 fL (referans 80–100 fL) — Yüksek. Makrositoz megaloblastik süreci destekler.',
      ];
      inv.rows = [['Hemoglobin', '5.0 g/dL', '11–14 g/dL', 'Kritik düşük'], ['MCV', '110 fL', '80–100 fL', 'Yüksek']];
    }
  }
}
{
  const c = byId('pulm-pe-001');
  if (c) {
    replaceDeep(c, [[/D-dimer yüksekliği\./g, 'D-dimer 2.400 ng/mL FEU düzeyi klinik olasılıkla birlikte pulmoner emboli lehine destekleyicidir.']]);
  }
}
{
  const c = byId('cardiovascular-coagulative-necrosis-mi-001');
  if (c) {
    replaceDeep(c, [[/Troponin yüksekliği\./g, 'Troponin I yüksekliği miyokart hasarını destekler.']]);
  }
}
{
  const c = byId('infectious-diseases-septic-shock-001');
  if (c) {
    replaceDeep(c, [[/Laktat yüksektir\./g, 'Laktat yüksekliği doku hipoperfüzyonunu destekler.']]);
  }
}

writeFileSync('src/data/cases.js', `export const cases = ${JSON.stringify(cases, null, 2)};\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`);
