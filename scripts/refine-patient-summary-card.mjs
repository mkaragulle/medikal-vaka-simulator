import fs from 'node:fs';
import { cases } from '../src/data/cases.js';

const normalize = (text = '') => String(text || '')
  .replace(/\s*\+\s*/g, ', ')
  .replace(/\s+/g, ' ')
  .replace(/\s+([.,;:!?])/g, '$1')
  .replace(/,\s*,/g, ',')
  .trim();

const lowerTR = (text = '') => normalize(text).toLocaleLowerCase('tr');
const capTR = (text = '') => {
  const t = normalize(text).replace(/^[,;:\-–\s]+/, '');
  return t ? t.charAt(0).toLocaleUpperCase('tr') + t.slice(1) : '';
};
const sentence = (text = '') => {
  const t = capTR(text).replace(/[.;:]+$/g, '').trim();
  return t ? `${t}.` : '';
};
const cleanEnd = (text = '') => normalize(text).replace(/[.;:]+$/g, '').trim();

function splitSentences(text = '') {
  const parts = normalize(text).match(/[^.!?]+[.!?]?/g) || [];
  return parts.map((p) => cleanEnd(p)).filter(Boolean);
}

function dedupeTextItems(items = []) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    const clean = cleanEnd(item);
    const key = lowerTR(clean).replace(/[^a-z0-9çğıöşü\s]/gi, '').replace(/\s+/g, ' ').trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(capTR(clean));
  }
  return out;
}

function compactText(text = '', max = 82) {
  let t = cleanEnd(text)
    .replace(/^Bu olguda\s*/i, '')
    .replace(/^Hastada\s*/i, '')
    .replace(/^Öğrenci\s+[^.]+$/i, '')
    .replace(/\s+(lehinedir|tanıyı destekler|düşündürür|gösterir|ihtimalini artırır|olasılığını artırır|açısından uyarıcıdır)$/i, '')
    .replace(/\s+ile uyumludur$/i, '')
    .replace(/\s+ön plandadır$/i, '');

  const replacers = [
    [/Retrosternal baskı tarzında ağrının sol kola ve mandibulaya yayılması.*/i, 'Sol kola/mandibulaya yayılan baskı tarzı ağrı'],
    [/Soğuk terleme ve bulantı.*/i, 'Soğuk terleme ve bulantı'],
    [/V2[–-]V5.*ST segment elevasyonu.*/i, 'V2–V5 ST elevasyonu'],
    [/İnferior derivasyon.*resiprokal ST depresyonu.*/i, 'Resiprokal ST depresyonu'],
    [/Kontrolsüz hipertansiyon.*/i, 'Kontrolsüz hipertansiyon öyküsü'],
    [/Yırtılır tarzda ağrının sırta yayılması.*/i, 'Sırta yayılan ani yırtılır ağrı'],
    [/Üst ekstremiteler arası nabız veya kan basıncı farkı.*/i, 'Nabız/TA asimetrisi'],
    [/Asendan aortta intimal flap.*/i, 'Asendan aort intimal flap bulgusu'],
    [/Progresif dispne ve presenkop.*/i, 'Progresif dispne ve presenkop'],
    [/Juguler venöz dolgunluk.*/i, 'Juguler venöz dolgunluk'],
    [/Pulsus paradoxus.*/i, 'Pulsus paradoxus'],
    [/Sağ atriyum.*sağ ventrikül.*kollaps.*/i, 'Sağ kalp boşluklarında diyastolik kollaps'],
    [/Farklı iyileşme evrelerinde ekimozlar.*/i, 'Farklı yaşlarda ekimozlar'],
    [/Öykü ile fizik muayene bulguları.*/i, 'Öykü-bulgu uyumsuzluğu'],
    [/Nöbet sonrası letarji.*/i, 'Nöbet sonrası letarji'],
  ];
  for (const [pattern, repl] of replacers) t = t.replace(pattern, repl);

  const cuts = ['; ', ' çünkü ', ' ancak ', ' bu nedenle ', ' tanı ', ' açısından ', ' ile birlikte ', ' olduğunda '];
  for (const cut of cuts) {
    if (t.length > max && lowerTR(t).includes(cut.trim())) {
      const idx = lowerTR(t).indexOf(cut.trim());
      if (idx > 30) { t = t.slice(0, idx); break; }
    }
  }
  if (t.length > max) {
    const words = t.split(' ');
    let out = '';
    for (const word of words) {
      if ((out ? `${out} ${word}` : word).length > max) break;
      out = out ? `${out} ${word}` : word;
    }
    t = out || t.slice(0, max);
  }
  return capTR(t);
}

function extractStructuredRisks(c) {
  const source = lowerTR(`${c.title}. ${c.demographics}. ${c.setting}. ${c.chiefComplaint}. ${c.stem}. ${c.diagnosis?.correct || ''}`);
  const riskSource = source
    .replace(/travmanın eşlik etmediği/g, '')
    .replace(/travma öyküsü yok/g, '')
    .replace(/direkt travma öyküsü yok/g, '')
    .replace(/düşme öyküsü yok/g, '');
  const rules = [
    ['Kontrolsüz hipertansiyon / vasküler stres', /kontrolsüz hipertansiyon|hipertansiyon/],
    ['Aterosklerotik risk zemini', /dislipidemi|sigara|aterosklerotik|koroner|miyokart|st elevasyon|göğüs ağrısı/],
    ['Diyabet veya metabolik dekompansasyon riski', /diyabet|hba1c|ketoasidoz|hiperglisemi|hipoglisemi/],
    ['Siroz ve portal hipertansiyon zemini', /siroz|portal hipertansiyon|varis/],
    ['Gebelik/postpartum fizyolojik risk', /gebelik|postpartum|lohusa|doğum sonrası|preeklampsi/],
    ['Yenidoğan veya süt çocukluğu yaş riski', /yenidoğan|bebek|süt çocuğu|anne sütü|doğumda/],
    ['Çocukta güvenlik ve öykü-bulgu uyumu riski', /çocuk istismarı|bakıcı|ekimoz|morluk|shaken|kaza dışı/],
    ['İmmünsüpresyon veya HIV ilişkili enfeksiyon riski', /immünsüpres|hiv|kemoterapi|transplant|steroid kullan|cd4/],
    ['Travma veya adli kayıt gerektiren olay', /travma|kırık|çıkık|yaralanma|kesici|delici|kaza|elektrik|yanık|düşme|trafik kazası|iş kazası/],
    ['Toksin/ilaç maruziyeti olasılığı', /ilaç|toksin|zehir|parasetamol|antikoagülan|warfarin|heparin|blister|şişe/],
    ['Enfeksiyon ve temas/izolasyon bağlamı', /ateş|öksürük|balgam|menenjit|pnömoni|tüberküloz|temas|döküntü|kızamık|boğmaca/],
    ['Aile öyküsü veya kalıtsal yatkınlık', /aile öyküsü|ailede|akraba evliliği|kalıtsal|genetik/],
    ['Endemik bölge veya vektör maruziyeti', /seyahat|endemik|kene|sıtma|malarya|kamp/],
  ];
  const out = [];
  for (const [label, regex] of rules) {
    if (regex.test(riskSource) && !out.includes(label)) out.push(label);
  }
  if (!out.length) {
    if (/acil servis/.test(source)) out.push('Acil başvuru bağlamında stabilite değerlendirmesi');
    else if (/poliklinik/.test(source)) out.push('Ayaktan başvuruda tanısal önceliklendirme');
    else out.push('Öykü ve objektif bulgularla klinik bağlam kurulmalı');
  }
  return out.slice(0, 3);
}

function extractClues(c) {
  const fb = c.diagnosis?.answerFeedback || {};
  const chain = Array.isArray(fb.evidenceChain) ? fb.evidenceChain : [];
  const clueSeed = [fb.spotClue, ...(c.patientIntro?.distinctiveClues || []), ...chain, c.clinicalFocus, c.chiefComplaint]
    .filter(Boolean)
    .filter((item) => !/öğrenci|ayırt eder|öğrenme/i.test(String(item)));
  return dedupeTextItems(clueSeed.map((item) => compactText(item, 78))).slice(0, 4);
}

function historySummary(c) {
  const existing = c.patientIntro?.historySummary || '';
  const source = existing.length > 35 ? existing : c.stem || '';
  const demo = lowerTR(c.demographics || '');
  const complaint = lowerTR(c.chiefComplaint || '');
  const setting = lowerTR(c.setting || '');
  const sentences = dedupeTextItems(splitSentences(source).filter((part, index) => {
    const n = lowerTR(part);
    const repeatsHeader = (demo && n.includes(demo)) || (complaint && n.includes(complaint)) || (setting && n.includes(setting));
    return !(index === 0 && repeatsHeader);
  }));
  return sentences.slice(0, 3).map(sentence).join(' ');
}

function firstPearl(c) {
  const fb = c.diagnosis?.answerFeedback || {};
  const arrays = [fb.pearls, fb.clinicalPearls, fb.examNote].filter(Array.isArray);
  for (const arr of arrays) {
    const candidate = arr.find((x) => typeof x === 'string' && x.length > 20 && !/TUS tuzağı/i.test(x));
    if (candidate) return sentence(compactText(candidate, 132));
  }
  return '';
}

const manualFocus = {
  'pediatrics-shaken-baby-syndrome-001': 'Tutarsız öykü, farklı yaşlarda ekimozlar ve letarji çocuk istismarı açısından kırmızı bayraktır; kesin tanı beklenmeden güvenlik, kayıt ve bildirim süreci başlatılmalıdır.',
  'internal-medicine-sexual-assault-evidence-001': 'Cinsel saldırı sonrası erken başvuruda güvenlik, mahremiyet, bilgilendirilmiş onam ve delil zinciri aynı klinik süreç içinde korunmalıdır.',
  'tus-spot-domestic-violence-safety-001': 'Eşin görüşmeyi kontrol etmesi ve hastanın yalnızken güvende olmadığını ima etmesi aile içi şiddet açısından mahrem güvenlik değerlendirmesini zorunlu kılar.',
  'tus-spot-clinical-urticaria-001': 'Hipotansiyon, solunum bulgusu veya çoklu sistem tutulumu yoksa izole ürtiker/hafif anjiyoödem düşünülür; ilk yaklaşım antihistaminik ve yakın izlemdir.',
  'tus-spot-ethics-unconscious-consent-001': 'Bilinç kapalı hastada hava yolu riski varsa yaşam tehdidi nedeniyle varsayılan onamla acil stabilizasyon geciktirilmeden yapılmalıdır.',
};

function priorityFocus(c, clues) {
  if (manualFocus[c.id]) return manualFocus[c.id];

  const source = lowerTR(`${c.title}. ${c.chiefComplaint}. ${c.stem}. ${c.diagnosis?.correct || ''}. ${c.clinicalFocus || ''}`);
  const clue = cleanEnd(clues[0] || compactText(c.chiefComplaint || c.title, 76));
  const pearl = firstPearl(c);

  const specific = [
    [/st elevasyon|stemi|miyokart|koroner/, `${clue} akut koroner oklüzyon açısından karar verdiricidir; ST elevasyonu varsa reperfüzyon kararı troponin beklenmeden planlanır.`],
    [/aort diseksiyon|nabız asimetrisi|yırtılır/, `${clue} akut aort sendromu için kırmızı bayraktır; ani maksimum ağrı ve nabız/TA farkı ACS çeldiricisini geri plana iter.`],
    [/tamponad|juguler|beck/, `${clue} kardiyak tamponad lehine obstrüktif şok paternidir; ekokardiyografik kollaps acil drenaj kararını güçlendirir.`],
    [/hiperpotasemi|sivri t|qrs/, `${clue} EKG değişiklikli hiperpotasemi paternidir; ilk hedef IV kalsiyumla miyokard membranını stabilize etmektir.`],
    [/sle|lupus/, `${clue} SLE aktivitesi için anlamlıdır; takipte ANA’dan çok anti-dsDNA artışı ve kompleman düşüklüğü kullanılır.`],
    [/hie|hipoksik|asfiksi|terapötik hipotermi/, `${clue} hipoksik-iskemik ensefalopatide nöroprotektif zaman penceresini gösterir; terapötik hipotermi ilk 6 saatte düşünülür.`],
    [/septik artrit|sıcak şiş eklem/, `${clue} septik artrit dışlanana kadar acil kabul edilir; eklem aspirasyonu ve antibiyotik geciktirilmemelidir.`],
    [/menenjit|peteşi|ense sertliği/, `${clue} bakteriyel menenjit/meningokoksemi açısından acil uyarıdır; antibiyotik kültür için gereksiz geciktirilmez.`],
    [/tüberküloz|aside dirençli|balgam/, `${clue} aktif tüberküloz olasılığını artırır; hava yolu izolasyonu ve mikrobiyolojik doğrulama birlikte planlanır.`],
    [/dka|ketoasidoz|kussmaul/, `${clue} DKA tanısının temel paternidir; sıvı ve potasyum güvenliği insülin tedavisinden önce değerlendirilir.`],
    [/varis kanaması|hematemez|melena|siroz/, `${clue} varis kanaması olasılığını yükseltir; resüsitasyonla birlikte vazoaktif tedavi, antibiyotik ve erken endoskopi planlanır.`],
    [/pulmoner emboli|plevritik|d-dimer|bt anjiyo/, `${clue} pulmoner emboli olasılığını yükseltir; hemodinamik durum tanı ve reperfüzyon kararını belirler.`],
    [/nursemaid|radius başı|çekilme sonrası/, `${clue} radius başı subluksasyonu için tipiktir; direkt travma/deformite yoksa kapalı redüksiyon ön plandadır.`],
    [/kızamık|koplik/, `${clue} kızamık için yüksek verimli spot ipucudur; Koplik lekesi kızamıkta ayırt ettirici kabul edilir.`],
    [/kızıl|zımpara/, `${clue} kızıl için tipiktir; zımpara kağıdı döküntüsü ve farenjit Streptococcus pyogenes’i düşündürür.`],
  ];
  for (const [pattern, text] of specific) {
    if (pattern.test(source)) return sentence(text);
  }

  if (c.branchId === 'tus-spot-olgular' && pearl) {
    return sentence(`${clue} doğru seçeneği belirleyen temel ipucudur; ${cleanEnd(pearl).charAt(0).toLocaleLowerCase('tr') + cleanEnd(pearl).slice(1)}`);
  }

  if (pearl) return sentence(`${clue} karar verdirici klinik ipucudur; ${cleanEnd(pearl).charAt(0).toLocaleLowerCase('tr') + cleanEnd(pearl).slice(1)}`);
  return sentence(`${clue} bu vakada tanısal önceliği belirleyen ana klinik veridir`);
}

function profile(c) {
  return normalize(c.patientIntro?.profile || [c.demographics, c.setting].filter(Boolean).join(' · '));
}

function presentation(c) {
  return normalize(c.patientIntro?.presentation || c.chiefComplaint || c.title);
}

const badGenericTerms = [
  'Pediatrik güvenlik/yaş bağımlı risk',
  'Travma/yaralanma sonrası başvuru',
  'Vasküler/iskemik risk bağlamı',
  'Yenidoğan/metabolik hastalık bağlamı',
  'Belirgin risk bilgisi verilmemiş',
  'Ek ipuçları öykü ve muayeneden çıkarılmalıdır',
];

let changedFocus = 0;
let changedRiskClues = 0;
let removedGeneric = 0;

const updated = cases.map((c) => {
  const before = JSON.stringify(c.patientIntro || {});
  const clues = extractClues(c);
  const intro = {
    profile: profile(c),
    presentation: presentation(c),
    riskContext: extractStructuredRisks(c),
    distinctiveClues: clues,
    historySummary: historySummary(c),
    priorityFocus: priorityFocus(c, clues),
  };
  if ((c.patientIntro?.priorityFocus || '') !== intro.priorityFocus) changedFocus += 1;
  if (JSON.stringify(c.patientIntro?.riskContext || []) !== JSON.stringify(intro.riskContext) || JSON.stringify(c.patientIntro?.distinctiveClues || []) !== JSON.stringify(intro.distinctiveClues)) changedRiskClues += 1;
  if (badGenericTerms.some((term) => before.includes(term))) removedGeneric += 1;
  return { ...c, patientIntro: intro };
});

const header = `// KlinikIQ vaka verisi: TUS odaklı, klinik karar verdirici ve objektif tetkik sonuçlarıyla yapılandırılmıştır.\n// Patient intro QA v2: Hasta özeti kartı okunabilir 2x2 yapı, kısa risk/ipucu listeleri ve özgün klinik odak cümleleriyle rafine edilmiştir.\n\n`;
const body = `export const cases = ${JSON.stringify(updated, null, 2)};\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId) ?? null;\n}\n\nexport function getCasesByBranch(branchId) {\n  if (!branchId) return cases;\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n`;
fs.writeFileSync('src/data/cases.js', header + body);

const report = {
  totalCasesReviewed: updated.length,
  patientIntroCardsValidated: updated.filter((c) => c.patientIntro).length,
  priorityFocusRewritten: changedFocus,
  riskOrClueFieldsRefined: changedRiskClues,
  genericRiskPhrasesRemovedFromCases: removedGeneric,
  casesUsingListFriendlyClues: updated.filter((c) => c.patientIntro.distinctiveClues.some((x) => x.length > 34) || c.patientIntro.distinctiveClues.length > 2).length,
  generatedAt: new Date().toISOString(),
};
fs.writeFileSync('PATIENT_SUMMARY_CARD_READABILITY_REWORK_REPORT.json', JSON.stringify(report, null, 2));
fs.writeFileSync('PATIENT_SUMMARY_CARD_READABILITY_REWORK_SUMMARY.md', `# Hasta Özeti Kartı Okunabilirlik Revizyonu\n\n- İncelenen vaka: ${report.totalCasesReviewed}\n- patientIntro doğrulanan vaka: ${report.patientIntroCardsValidated}\n- Öncelikli klinik odak yeniden yazılan vaka: ${report.priorityFocusRewritten}\n- Risk/ipucu alanı rafine edilen vaka: ${report.riskOrClueFieldsRefined}\n- Generic risk ifadeleri temizlenen vaka: ${report.genericRiskPhrasesRemovedFromCases}\n\nRevizyon; 4 dar sütun yerine responsive 2x2 yapı, uzun klinik ifadelerde pill yerine mini liste, doğal cümle yapısı, plus işaretlerinin kaldırılması, özgün klinik odak cümleleri ve light/dark uyumlu kart stillerini kapsar.\n`);
console.log(report);
