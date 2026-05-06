import { writeFileSync } from 'node:fs';
import { cases } from '../src/data/cases.js';

const stats = {
  cases: cases.length,
  stringsCleaned: 0,
  ellipsisRemoved: 0,
  badManagementTitlesRewritten: 0,
  colonLabelComparisonPointsCleaned: 0,
  pearlLabelsNaturalized: 0,
  pellagraSpecificRewrite: false,
};

function cleanString(value) {
  if (typeof value !== 'string') return value;
  let next = value;
  const before = next;
  const ellipses = (next.match(/…|\.\.\./g) || []).length;
  if (ellipses) stats.ellipsisRemoved += ellipses;
  next = next
    .replace(/…+/g, '.')
    .replace(/\.\.\.+/g, '.')
    .replace(/\.\s*\./g, '.')
    .replace(/,\s*\./g, '.')
    .replace(/;\s*\./g, '.')
    .replace(/\s+([,.;:!?])/g, '$1')
    .replace(/\bancak da\b/giu, 'ancak')
    .replace(/\bOlguda Klinik\b/g, 'Olguda klinik')
    .replace(/\bHedef mekanizma ve sınav ipuçları tabloyu destekler\s+/g, '')
    .replace(/\bNiasin\/niktotinamid\b/giu, 'Niasin/nikotinamid')
    .replace(/\bPH\b/g, 'pH')
    .replace(/en güçlü\s*\.$/u, 'en güçlü seçeneği destekler.')
    .replace(/\s+/g, ' ')
    .trim();
  if (next !== before) stats.stringsCleaned += 1;
  return next;
}

function walk(value) {
  if (Array.isArray(value)) return value.map(walk);
  if (value && typeof value === 'object') {
    Object.keys(value).forEach((key) => {
      value[key] = walk(value[key]);
    });
    return value;
  }
  return cleanString(value);
}

function inferManagementTitle(step, index = 0) {
  const text = `${step?.text || step?.label || ''}`.toLocaleLowerCase('tr');
  if (/fotosensitif|triad|patern|ayırt|düşündür|lehine|semptom|bulgu/.test(text)) return 'Klinik patern';
  if (/replasman|tedavi|başla|antibiyotik|antikoagülasyon|insülin|antidot|cerrahi|hipotermi|sıvı|ver/.test(text)) return 'Tedavi önceliği';
  if (/malnütrisyon|alkol|malabsorpsiyon|izoniazid|neden|altta yatan|risk|maruziyet|öykü/.test(text)) return 'Altta yatan neden';
  if (/eşlik|vitamin|eksiklik|beslenme|elektrolit/.test(text)) return 'Eşlik eden eksiklikler';
  if (/stabil|abc|hava yolu|solunum|dolaşım|monitör|damar yolu|nöbet|şok|hipotansiyon/.test(text)) return 'Stabilite kontrolü';
  if (/tetkik|ekg|bt|mr|usg|kültür|seroloji|biyopsi|marker|laboratuvar|doğrula|olasılık/.test(text)) return 'Tanısal doğrulama';
  if (/izle|takip|kontrol|komplikasyon|yanıt|daralt|değiştir/.test(text)) return 'Klinik izlem';
  if (/mekanizma|enzim|yolak|reseptör|hormon|substrat|metabolit/.test(text)) return 'Mekanizma bağlantısı';
  return ['Klinik patern', 'Karar noktası', 'Uygulama basamağı', 'İzlem planı'][index] || 'Sonraki adım';
}

function isBadManagementTitle(title = '') {
  return /^(Mekanistik yaklaşım|Klinik olasılığı belirle|İlk tedavi|İlk karar|Sonraki adım)$/iu.test(String(title).trim());
}

function normalizeManagementTitles(feedback) {
  for (const key of ['management', 'managementSteps']) {
    const arr = feedback?.[key];
    if (!Array.isArray(arr)) continue;
    const used = new Map();
    arr.forEach((step, index) => {
      if (!step || typeof step !== 'object') return;
      const title = step.title || '';
      const normalized = String(title).toLocaleLowerCase('tr');
      const count = (used.get(normalized) || 0) + 1;
      used.set(normalized, count);
      if (!title || isBadManagementTitle(title) || count > 1) {
        const nextTitle = inferManagementTitle(step, index);
        if (step.title !== nextTitle) {
          stats.badManagementTitlesRewritten += 1;
          step.title = nextTitle;
        }
      }
    });
  }
}

function cleanComparisonPoint(point) {
  if (typeof point !== 'string') return point;
  let next = point
    .replace(/^Beklenen patern:\s*/iu, '')
    .replace(/^Olgu verisi:\s*/iu, '')
    .replace(/^Ek destek:\s*/iu, '')
    .replace(/^Bu olgudaki ayırt ettirici nokta:\s*/iu, '')
    .replace(/^[^.!?]{2,34}\s+lehine ek destek:\s*/iu, '')
    .trim();
  next = cleanString(next);
  if (next !== point) stats.colonLabelComparisonPointsCleaned += 1;
  return next;
}

function normalizeComparisonBlocks(feedback) {
  for (const key of ['differentials', 'differentialComparison', 'differentialExplanations']) {
    const block = feedback?.[key];
    if (!block || typeof block !== 'object' || Array.isArray(block)) continue;
    for (const entry of Object.values(block)) {
      if (entry && typeof entry === 'object' && Array.isArray(entry.comparisonPoints)) {
        entry.comparisonPoints = entry.comparisonPoints.map(cleanComparisonPoint).filter(Boolean);
      }
    }
  }
}

function normalizePearls(feedback) {
  for (const key of ['pearls', 'clinicalPearls']) {
    const arr = feedback?.[key];
    if (!Array.isArray(arr)) continue;
    arr.forEach((pearl) => {
      if (!pearl || typeof pearl !== 'object') return;
      if (/^(TUS kırmızı bayrağı|İlk adım|Mekanizma|Pellagra)$/iu.test(pearl.label || '')) {
        stats.pearlLabelsNaturalized += 1;
        pearl.label = '';
      }
      if (/^Dermatitis, diarrhea, dementia\.?$/iu.test(pearl.text || '')) {
        pearl.text = 'Pellagra için klasik triad dermatit, diyare ve demanstır.';
      }
    });
  }
}

function setPellagraQuality(caseItem) {
  if (caseItem.id !== 'internal-medicine-pellagra-001') return;
  const feedback = caseItem.diagnosis?.answerFeedback;
  if (!feedback) return;
  const differentials = {
    Skorbüt: {
      explanation: 'Skorbüt C vitamini eksikliğidir; diş eti kanaması, perifoliküler peteşi, kötü yara iyileşmesi ve tirbuşon kıllar beklenir. Bu olguda fotosensitif dermatit, kronik diyare, glossit ve bilişsel yavaşlama niasin eksikliği/pellagra lehinedir.',
      comparisonPoints: [
        'Kanama ve kollajen sentez bozukluğu bulguları skorbüt için daha tipiktir.',
        'Bu olgudaki dermatit-diyare-bilişsel değişiklik birlikteliği pellagrayı öne çıkarır.',
      ],
    },
    Beriberi: {
      explanation: 'Beriberi tiamin eksikliğiyle ilişkilidir; periferik nöropati, Wernicke bulguları veya yüksek debili kalp yetersizliği beklenir. Bu olguda fotosensitif dermatit, diyare ve düşük niasin metaboliti beriberiden çok pellagrayı destekler.',
      comparisonPoints: [
        'Tiamin eksikliğinde nöropati veya kardiyak tutulum ön plandadır.',
        'Niasin eksikliğine özgü dermatit-diyare-demans paterni bu seçeneği geri plana iter.',
      ],
    },
    Raşitizm: {
      explanation: 'Raşitizm D vitamini eksikliğiyle ilişkilidir; büyüme çağında kemik deformitesi, kraniotabes, genu varum ve kalsiyum-fosfor/ALP bozukluğu beklenir. Bu olguda baskın patern fotosensitif dermatit, kronik diyare ve bilişsel yavaşlamadır; bu nedenle raşitizm en güçlü tanı değildir.',
      comparisonPoints: [
        'Raşitizmde ana bulgular kemik mineralizasyon bozukluğu ve iskelet deformiteleridir.',
        'Bu olguda niasin eksikliğini destekleyen dermatit-diyare-bilişsel değişiklik paterni baskındır.',
      ],
    },
  };
  feedback.whyCorrect = 'Fotosensitif dermatit, kronik diyare, glossit ve bilişsel yavaşlama niasin eksikliğine bağlı pellagra için tipik paterndir. Karbonhidrat ağırlıklı beslenme ve düşük N1-metilnikotinamid atılımı tanıyı destekler.';
  feedback.evidenceChain = [
    { title: 'Beslenme riski', text: 'Mısır ve karbonhidrat ağırlıklı beslenme, protein ve B vitamini alımının düşük olması niasin eksikliği riskini artırır.' },
    { title: 'Klasik klinik patern', text: 'Fotosensitif dermatit, kronik diyare ve bilişsel yavaşlama pellagra için yüksek verimli üçlüdür.' },
    { title: 'Mukozal bulgu', text: 'Glossit ve oral mukoza etkilenimi B vitamini eksikliğiyle uyumludur.' },
    { title: 'Biyokimyasal destek', text: 'İdrarda N1-metilnikotinamid atılımının düşük olması niasin eksikliğini destekler.' },
  ];
  const pearls = [
    { label: '', text: 'Pellagrada klasik triad dermatit, diyare ve demanstır; fotosensitif dermatit TUS için yüksek verimli ipucudur.' },
    { label: '', text: 'Tanısal doğrulama veya metabolit ölçümü tedaviyi geciktirmemelidir; klinik patern belirginse replasman başlanır.' },
    { label: '', text: 'Hartnup hastalığı, karsinoid sendrom, izoniazid kullanımı, alkol ve malnütrisyon niasin eksikliğine zemin hazırlayabilir.' },
    { label: '', text: 'NAD/NADP eksikliği deri, gastrointestinal sistem ve sinir sistemi bulgularını birlikte açıklar.' },
  ];
  const management = [
    { title: 'Klinik patern', text: 'Fotosensitif dermatit, kronik diyare, glossit ve bilişsel yavaşlamayı niasin eksikliği lehine birlikte değerlendir.' },
    { title: 'Tedavi önceliği', text: 'Niasin/nikotinamid replasmanını ve beslenme desteğini geciktirmeden başla.' },
    { title: 'Altta yatan neden', text: 'Malnütrisyon, alkol kullanımı, malabsorpsiyon, karsinoid sendrom, Hartnup hastalığı veya izoniazid ilişkisini araştır.' },
    { title: 'Eşlik eden eksiklikler', text: 'Diğer B vitamini eksikliklerini, sıvı-elektrolit durumunu ve genel beslenme desteğini birlikte düzenle.' },
  ];
  feedback.pearls = pearls;
  feedback.clinicalPearls = pearls;
  feedback.management = management;
  feedback.managementSteps = management;
  feedback.differentials = differentials;
  feedback.differentialComparison = differentials;
  feedback.whyWrong = Object.fromEntries(Object.entries(differentials).map(([key, value]) => [key, value.explanation]));
  stats.pellagraSpecificRewrite = true;
}

walk(cases);
for (const item of cases) {
  const feedback = item.diagnosis?.answerFeedback || item.answerFeedback;
  if (feedback) {
    normalizeManagementTitles(feedback);
    normalizeComparisonBlocks(feedback);
    normalizePearls(feedback);
  }
  setPellagraQuality(item);
}

const output = `export const cases = ${JSON.stringify(cases, null, 2)};\n\nexport function getCasesByBranch(branchId) {\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId);\n}\n`;
writeFileSync('src/data/cases.js', output);
writeFileSync('FEEDBACK_TEXT_QUALITY_REPORT.json', JSON.stringify(stats, null, 2));
console.log(stats);
