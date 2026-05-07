import { writeFileSync } from 'node:fs';
import { cases } from '../src/data/cases.js';

let changedStrings = 0;
let rewrittenFeedbackCases = 0;
let childAbusePatched = false;
const changedCaseIds = new Set();

function normalize(value = '') {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function ensureSentence(value = '') {
  const text = normalize(value).replace(/\s+([,.;:!?])/g, '$1');
  if (!text) return '';
  return /[.!?]$/u.test(text) ? text : `${text}.`;
}

function stripWeakPrefix(value = '') {
  return normalize(value)
    .replace(/\.\.\.|…/g, '.')
    .replace(/^(?:TUS kırmızı bayrağı|İlk adım|Mekanizma|Mekanistik yaklaşım|İlk tedavi|Klinik olasılığı belirle|Pellagra|Olgu verisi|Ek destek|Ana ipucu|Kanıt)\s*[:：-]\s*/iu, '')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim();
}

function refineLabel(value = '', fallback = 'Klinik ipucu') {
  const raw = stripWeakPrefix(value || fallback).replace(/[.;:]$/u, '').trim();
  if (!raw) return fallback;
  if (/^kan[ıi]t\s*\d+$/iu.test(raw)) return fallback;
  if (/tus k[ıi]rm[ıi]z[ıi] bayra[ğg][ıi]/iu.test(raw)) return 'Karar verdirici ipucu';
  if (/^ilk ad[ıi]m$/iu.test(raw)) return 'Öncelik';
  if (/^mekanizma$/iu.test(raw) || /mekanistik yakla[şs][ıi]m/iu.test(raw)) return 'Mekanizma özeti';
  if (/^ilk tedavi$/iu.test(raw)) return 'Tedavi önceliği';
  if (/klinik olas[ıi]l[ıi][ğg][ıi] belirle/iu.test(raw)) return 'Klinik örüntü';
  if (/^yakla[şs][ıi]m$/iu.test(raw)) return 'Klinik örüntü';
  if (/^hap bilgi$/iu.test(raw)) return 'Yüksek verimli bilgi';
  return raw;
}

function inferEvidenceTitle(text = '', index = 0) {
  const normalized = normalize(text).toLocaleLowerCase('tr');
  if (/ekg|st segment|derivasyon|ritim|qrs|troponin/.test(normalized)) return 'EKG ve iskemi örüntüsü';
  if (/bt|mr|mrg|usg|grafi|görüntüleme|radyografi|ultrason|endoskopi/.test(normalized)) return 'Görüntüleme bulgusu';
  if (/ph\b|baz açığı|glukoz|keton|crp|lökosit|hemoglobin|trombosit|ferritin|enzim|metabolit|kreatinin|ast|alt|bilirubin|seroloji|kültür|pcr|marker|antikor|antijen/.test(normalized)) return 'Laboratuvar örüntüsü';
  if (/muayene|oskültasyon|defans|rebound|döküntü|ekimoz|letarji|ral|üfürüm|ödem|nörolojik|ateş|bulgu/.test(normalized)) return 'Muayene bulgusu';
  if (/öykü|maruziyet|travma|ilaç|sigara|gebelik|doğum|aile|beslenme|seyahat|temas|alkol/.test(normalized)) return 'Öykü ipucu';
  if (/yaş|bebek|çocuk|yenidoğan|erkek|kadın|adölesan|gebede/.test(normalized)) return 'Klinik bağlam';
  if (/reseptör|enzim|gen|mutasyon|yolak|hormon|protein|histolojik|nekroz|inflamasyon|morfoloji/.test(normalized)) return 'Mekanizma';
  return index === 0 ? 'Karar verdirici ipucu' : 'Destekleyici kanıt';
}

function cleanString(value) {
  const before = value;
  let next = String(value)
    .replace(/\.\.\.|…/g, '.')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/\bTUS kırmızı bayrağı\s*[:：-]\s*/giu, '')
    .replace(/\bİlk adım\s*[:：-]\s*/giu, '')
    .replace(/\bMekanistik yaklaşım\s*[:：-]\s*/giu, '')
    .replace(/\bMekanizma\s*[:：-]\s*/giu, '')
    .replace(/\bKlinik olasılığı belirle\s*[:：-]\s*/giu, '')
    .replace(/\bİlk tedavi\s*[:：-]\s*/giu, '')
    .replace(/\bOlgu verisi\s*[:：-]\s*/giu, '')
    .replace(/\bEk destek\s*[:：-]\s*/giu, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
  if (next !== before) changedStrings += 1;
  return next;
}

function cleanDeep(value) {
  if (typeof value === 'string') return cleanString(value);
  if (Array.isArray(value)) return value.map(cleanDeep);
  if (value && typeof value === 'object') {
    Object.keys(value).forEach((key) => {
      value[key] = cleanDeep(value[key]);
    });
  }
  return value;
}

function normalizeTitledList(list = [], fallbackTitleFn = (text, index) => `Madde ${index + 1}`) {
  if (!Array.isArray(list)) return list;
  const used = new Map();
  return list.map((item, index) => {
    if (!item || typeof item !== 'object') return item;
    const text = stripWeakPrefix(item.text || item.explanation || item.summary || item.description || '');
    const fallback = fallbackTitleFn(text, index);
    let title = refineLabel(item.title || item.label || item.heading, fallback);
    const count = used.get(title) || 0;
    used.set(title, count + 1);
    if (count > 0) {
      const alternatives = ['Klinik örüntü', 'Tedavi önceliği', 'Tanısal doğrulama', 'İzlem ve güvenlik', 'Çeldirici ayrımı'];
      title = alternatives.find((candidate) => !used.has(candidate)) || `${title} ${count + 1}`;
      used.set(title, 1);
    }
    return { ...item, title, label: item.label ? title : item.label, text: text || item.text };
  });
}

function cleanComparisonPoints(points = [], option = '') {
  if (!Array.isArray(points)) return [];
  return points.map((point) => {
    const clean = stripWeakPrefix(point);
    if (/kendi tipik örüntüsünde doğru olabilir/i.test(clean)) {
      return `${option} yalnız kendi tipik öykü, muayene veya tetkik bulguları varsa güç kazanır; bu olguda belirleyici bulgu farklıdır.`;
    }
    return ensureSentence(clean);
  }).filter(Boolean).slice(0, 3);
}

function reworkFeedback(clinicalCase) {
  const feedback = clinicalCase.diagnosis?.answerFeedback || clinicalCase.answerFeedback;
  if (!feedback) return;
  const before = JSON.stringify(feedback);

  if (Array.isArray(feedback.evidenceChain)) {
    feedback.evidenceChain = feedback.evidenceChain.map((item, index) => {
      if (!item || typeof item !== 'object') return item;
      const text = stripWeakPrefix(item.text || item.explanation || item.summary || '');
      return { ...item, title: refineLabel(item.title, inferEvidenceTitle(text, index)), text: ensureSentence(text) };
    });
  }

  for (const key of ['pearls', 'clinicalPearls']) {
    if (Array.isArray(feedback[key])) {
      feedback[key] = feedback[key].map((item, index) => {
        if (typeof item === 'string') return ensureSentence(stripWeakPrefix(item));
        if (!item || typeof item !== 'object') return item;
        const text = ensureSentence(stripWeakPrefix(item.text || item.explanation || item.summary || ''));
        const label = refineLabel(item.label || item.title, index === 0 ? 'Sınav incisi' : 'Yüksek verimli bilgi');
        return { ...item, label, title: item.title ? label : item.title, text };
      });
    }
  }

  for (const key of ['managementSteps', 'management']) {
    if (Array.isArray(feedback[key])) {
      feedback[key] = normalizeTitledList(feedback[key], (text, index) => {
        const normalized = normalize(text).toLocaleLowerCase('tr');
        if (/stabil|abc|hava yolu|solunum|dolaşım|monitör|damar yolu|nöbet/.test(normalized)) return 'Stabilizasyon';
        if (/bildirim|güvenlik|adli|koruyucu|mahrem|onam/.test(normalized)) return 'Güvenlik ve bildirim';
        if (/tetkik|ekg|bt|mr|usg|kültür|seroloji|biyopsi|marker|laboratuvar|doğrula/.test(normalized)) return 'Tanısal doğrulama';
        if (/tedavi|başla|ver|antibiyotik|antikoagülasyon|aspirin|insülin|antidot|cerrahi|pci|reperfüzyon|hipotermi|sıvı/.test(normalized)) return 'Tedavi önceliği';
        if (/izle|takip|kontrol|komplikasyon|yanıt/.test(normalized)) return 'İzlem';
        return index === 0 ? 'Klinik örüntü' : 'Sonraki adım';
      });
    }
  }

  for (const key of ['differentials', 'differentialComparison', 'differentialExplanations']) {
    if (feedback[key] && typeof feedback[key] === 'object' && !Array.isArray(feedback[key])) {
      Object.entries(feedback[key]).forEach(([option, value]) => {
        if (!value || typeof value !== 'object') return;
        if (typeof value.explanation === 'string') value.explanation = ensureSentence(stripWeakPrefix(value.explanation));
        if (Array.isArray(value.comparisonPoints)) value.comparisonPoints = cleanComparisonPoints(value.comparisonPoints, option);
      });
    }
  }

  if (feedback.whyWrong && typeof feedback.whyWrong === 'object' && !Array.isArray(feedback.whyWrong)) {
    Object.entries(feedback.whyWrong).forEach(([option, explanation]) => {
      if (typeof explanation === 'string') feedback.whyWrong[option] = ensureSentence(stripWeakPrefix(explanation));
    });
  }

  if (typeof feedback.whyCorrect === 'string') feedback.whyCorrect = ensureSentence(stripWeakPrefix(feedback.whyCorrect));
  if (typeof feedback.diagnosisMeta === 'string') feedback.diagnosisMeta = stripWeakPrefix(feedback.diagnosisMeta);
  if (typeof feedback.shortDiagnosisMeta === 'string') feedback.shortDiagnosisMeta = stripWeakPrefix(feedback.shortDiagnosisMeta);

  if (clinicalCase.id === 'pediatrics-shaken-baby-syndrome-001') {
    const correct = clinicalCase.diagnosis?.correct || 'Çocuk istismarı şüphesi';
    feedback.whyCorrect = 'Bu olguda nöbet tek başına primer nörolojik olay gibi ele alınmamalıdır. Farklı yaşlarda ekimozlar, tutarsız travma öyküsü ve letarji kaza dışı travma/çocuk istismarı açısından kırmızı bayraktır. Doğru yaklaşım; akut stabilizasyonu sürdürürken bulguları objektif kaydetmek, çocuğun güvenliğini sağlamak ve adli/koruyucu bildirim sürecini başlatmaktır.';
    feedback.evidenceChain = [
      { title: 'Letarji', text: 'Postiktal tablo beklenebilir; ancak beslenme bozukluğu ve genel durum düşüklüğü eşlik ediyorsa ek neden aranmalıdır.' },
      { title: 'Ekimozların yaşı', text: 'Farklı iyileşme evrelerindeki morluklar tekrarlayan travmayı düşündürür.' },
      { title: 'Öykü-bulgu uyumsuzluğu', text: 'Bildirilen hafif düşme öyküsü yaygın fizik bulgularla açıklanamaz.' },
      { title: 'Yüksek özgüllükte ipuçları', text: 'Retinal kanama, subdural kanama, posterior kosta ve metafizer lezyon istismar şüphesini güçlendirir.' },
    ];
    feedback.clinicalPearls = [
      { label: 'Karar verdirici ipucu', text: 'Çocuk istismarında güçlü şüphe güvenlik, kayıt ve bildirim sürecini başlatmak için yeterlidir; kesin tanı beklenmez.' },
      { label: 'Ayırt ettirici örüntü', text: 'Tutarsız öykü, farklı yaşta ekimoz, retinal/subdural kanama, posterior kosta-metafiz kırığı ve açıklanamayan nöbet-letarji yüksek değerli ipuçlarıdır.' },
      { label: 'Yönetim önceliği', text: 'Stabilizasyon geciktirilmez; objektif kayıt ve koruyucu bildirim tıbbi tedaviyle eş zamanlı yürütülür.' },
    ];
    feedback.pearls = feedback.clinicalPearls;
    feedback.managementSteps = [
      { title: 'Stabilizasyon', text: 'Aktif nöbet, hava yolu, solunum ve dolaşımı değerlendir; gerekiyorsa akut nöbet tedavisini uygula.' },
      { title: 'Objektif kayıt', text: 'Ekimozların yeri, yaşı, dağılımı ve eşlik eden nörolojik bulguları ayrıntılı kaydet.' },
      { title: 'Güvenlik ve bildirim', text: 'Çocuğun güvenliğini sağlayarak adli/koruyucu bildirim sürecini kesin tanı beklemeden başlat.' },
    ];
    feedback.management = feedback.managementSteps;
    if (clinicalCase.diagnosis?.options) {
      const wrongs = clinicalCase.diagnosis.options.filter((option) => option !== correct);
      feedback.whyWrong = Object.fromEntries(wrongs.map((option) => [option, `${option} bazı akut sorunları hedefleyebilir; ancak bu olguda farklı yaşta ekimozlar ve tutarsız travma öyküsü güvenlik ve bildirim yükümlülüğünü öne çıkarır. Yalnız semptom tedavisi veya bekleme yaklaşımı çocuk istismarı şüphesini kaçırır.`]));
    }
    childAbusePatched = true;
  }

  const after = JSON.stringify(feedback);
  if (after !== before) {
    rewrittenFeedbackCases += 1;
    changedCaseIds.add(clinicalCase.id);
  }
}

for (const clinicalCase of cases) {
  cleanDeep(clinicalCase);
  reworkFeedback(clinicalCase);
}

const content = `export const cases = ${JSON.stringify(cases, null, 2)};\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`;
writeFileSync(new URL('../src/data/cases.js', import.meta.url), content);

const report = {
  totalCases: cases.length,
  rewrittenFeedbackCases,
  changedCaseIds: [...changedCaseIds],
  changedStrings,
  childAbusePatched,
  branchCounts: cases.reduce((acc, item) => {
    acc[item.branchId] = (acc[item.branchId] || 0) + 1;
    return acc;
  }, {}),
  standard: 'dashboard-performance-feedback-global-qc-v1',
};
writeFileSync(new URL('../PERFORMANCE_FEEDBACK_GLOBAL_QC_REPORT.json', import.meta.url), JSON.stringify(report, null, 2));
console.log(report);
