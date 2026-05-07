import fs from 'node:fs';
import { cases } from '../src/data/cases.js';

const normalize = (text = '') => String(text)
  .replace(/\s+/g, ' ')
  .replace(/\s+([.,;:!?])/g, '$1')
  .trim();

function splitSentences(text = '') {
  const parts = normalize(text).match(/[^.!?]+[.!?]?/g) || [];
  return parts.map((p) => normalize(p).replace(/[.]+$/, '.')).filter(Boolean);
}

function lowerTR(text='') { return normalize(text).toLocaleLowerCase('tr'); }
function cleanEnd(text='') { return normalize(text).replace(/[.;:]+$/,''); }
function shortText(text='', max=128) {
  let t = cleanEnd(text)
    .replace(/^Bu olguda\s*/i, '')
    .replace(/^Hastada\s*/i, '')
    .replace(/\s+tanıyı destekler$/i, '');
  const cuts = ['; ', ' çünkü ', ' ve bu ', ' tanıyı ', ' olasılığını ', ' ihtimalini '];
  for (const cut of cuts) {
    if (t.length > max && lowerTR(t).includes(cut.trim())) {
      const idx = lowerTR(t).indexOf(cut.trim());
      if (idx > 35) { t = t.slice(0, idx); break; }
    }
  }
  if (t.length > max) {
    const words = t.split(' ');
    let out = '';
    for (const w of words) {
      if ((out + ' ' + w).trim().length > max) break;
      out = (out + ' ' + w).trim();
    }
    t = out || t.slice(0, max);
  }
  return cleanEnd(t);
}

function dedupeSentences(sentences) {
  const seen = new Set();
  const out = [];
  for (const sentence of sentences) {
    const key = lowerTR(sentence).replace(/[^a-z0-9çğıöşü\s]/gi, '').replace(/\s+/g, ' ').trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(normalize(sentence));
  }
  return out;
}

function extractRisks(c) {
  const source = lowerTR(`${c.demographics || ''}. ${c.setting || ''}. ${c.chiefComplaint || ''}. ${c.stem || ''}`);
  const rules = [
    ['Hipertansiyon öyküsü', /hipertansiyon|yüksek tansiyon/],
    ['Dislipidemi/aterosklerotik risk', /dislipidemi|hiperlipidemi|aterosklerotik|erken mi|erken miyokart/],
    ['Sigara maruziyeti', /sigara|paket-yıl/],
    ['Diyabet öyküsü', /tip 1 diyabet|tip 2 diyabet|diyabet|diabetes|hba1c/],
    ['Siroz/portal hipertansiyon zemini', /siroz|portal hipertansiyon|varis/],
    ['Gebelik veya postpartum dönem', /gebelik|postpartum|lohusa|doğum sonrası/],
    ['Yenidoğan/metabolik hastalık bağlamı', /yenidoğan|anne sütü|doğum sonrası|akraba evliliği|gelişim geriliği/],
    ['Pediatrik güvenlik/yaş bağımlı risk', /bebek|çocuk istismarı|bakıcı|ekimoz|morluk/],
    ['İmmünsüpresyon veya HIV riski', /immünsüpres|hiv|kemoterapi|transplant|steroid kullan/],
    ['Travma/yaralanma sonrası başvuru', /düşme|travma|kırık|çıkık|elektrik|yanık|kaza/],
    ['Seyahat/endemik bölge öyküsü', /seyahat|endemik|kamp|kene|sıtma|malarya/],
    ['Aile öyküsü/genetik yatkınlık', /aile öyküsü|ailede|akraba evliliği|genetik|kalıtsal/],
    ['İlaç veya toksin maruziyeti', /ilaç|parasetamol|antibiyotik|antikoagülan|warfarin|heparin|toksin|zehir/],
    ['Enfeksiyon/temas öyküsü', /ateş|enfeksiyon|öksürük|balgam|temas|menenjit|pnömoni|tüberküloz/],
    ['Vasküler/iskemik risk bağlamı', /senkop|göğüs ağrısı|st elevasyonu|nabız asimetrisi|arter|venöz|vende|tromboz|iskemi|miyokart|pulmoner emboli/],
  ];
  const out = [];
  for (const [label, regex] of rules) {
    if (regex.test(source) && !out.includes(label)) out.push(label);
  }
  if (!out.length && c.setting) out.push(`${c.setting} bağlamında değerlendirme`);
  return out.slice(0, 4);
}

function extractEvidence(c) {
  const fb = c.diagnosis?.answerFeedback || {};
  const chain = fb.evidenceChain || fb.evidence || fb.clinicalClues || [];
  const arr = Array.isArray(chain) ? chain : Object.values(chain || {});
  const out = [];
  for (const item of arr) {
    const s = shortText(item, 118);
    if (s && !/öğrenci|ayırt eder|öğrenme/i.test(s)) out.push(s);
  }
  if (fb.spotClue) out.unshift(shortText(fb.spotClue, 118));
  if (!out.length && c.clinicalFocus) out.push(shortText(c.clinicalFocus, 118));
  if (!out.length && c.chiefComplaint) out.push(shortText(c.chiefComplaint, 118));
  return Array.from(new Set(out.map(cleanEnd))).filter(Boolean).slice(0, 4);
}

function buildHistorySummary(c) {
  const all = dedupeSentences(splitSentences(c.stem || ''));
  const demo = lowerTR(c.demographics || '');
  const complaint = lowerTR(c.chiefComplaint || '');
  const setting = lowerTR(c.setting || '');
  const filtered = all.filter((sentence, i) => {
    const n = lowerTR(sentence);
    const repeatsHeader = (demo && n.includes(demo)) || (complaint && n.includes(complaint)) || (setting && n.includes(setting));
    return !(i === 0 && repeatsHeader);
  });
  const chosen = (filtered.length ? filtered : all).slice(0, 3);
  return normalize(chosen.join(' '));
}


function focusClue(text = '') {
  return cleanEnd(text)
    .replace(/\s+lehinedir$/i, '')
    .replace(/\s+tanıyı destekler$/i, '')
    .replace(/\s+düşündürür$/i, '')
    .replace(/\s+gösterir$/i, '')
    .replace(/\s+ihtimalini artırır$/i, '')
    .replace(/\s+olasılığını yükseltir$/i, '');
}

function focusTemplate(c, clues) {
  const correct = cleanEnd(c.diagnosis?.correct || c.diagnosis?.answerFeedback?.correctDiagnosis || c.title || 'doğru klinik karar');
  const clue1 = focusClue(clues[0] || shortText(c.chiefComplaint || c.clinicalFocus || c.title, 112));
  const clue2 = focusClue(clues[1] || '');
  const focus = cleanEnd(c.clinicalFocus || correct);
  const source = lowerTR(`${c.title} ${c.chiefComplaint} ${c.stem} ${correct} ${focus}`);

  if (/st elevasyon|stemi|miyokart|koroner/.test(source)) return `${clue1}, ${correct} açısından karar verdiricidir; TUS’ta EKG paterni reperfüzyon kararını troponinden önce belirler.`;
  if (/aort diseksiyon|nabız asimetrisi|yırtılır/.test(source)) return `${clue1}, ${correct} için kırmızı bayraktır; ağrının ani-maksimum başlaması ve nabız/TA farkı çeldirici ACS tanılarını geri plana iter.`;
  if (/tamponad|juguler|beck/.test(source)) return `${clue1}, ${correct} lehine kritik obstrüktif şok paternidir; tedavide zaman kaybettiren rutin sıvı/diüretik yaklaşımından kaçınılır.`;
  if (/anafilaksi|ürtiker|wheezing|hipotansiyon/.test(source)) return `${clue1}, anafilaksi için yeterli klinik paterndir; ilk ilaç antihistaminik değil IM adrenalindir.`;
  if (/hiperpotasemi|sivri t|qrs/.test(source)) return `${clue1}, acil hiperpotasemide membran stabilizasyonu gerektirir; EKG değişikliği varsa ilk adım IV kalsiyumdur.`;
  if (/sle|lupus/.test(source)) return `${clue1}, SLE aktivitesi açısından anlamlıdır; aktivite takibinde ANA’dan çok anti-dsDNA ve kompleman öne çıkar.`;
  if (/çocuk istismarı|kaza dışı|shaken|ekimoz/.test(source)) return `${clue1}, çocuk istismarı için kritik kırmızı bayraktır; kesin tanı beklenmeden güvenlik, kayıt ve bildirim süreci başlatılır.`;
  if (/hie|hipoksik|asfiksi|hipotermi tedavisi|terapötik hipotermi/.test(source)) return `${clue1}, hipoksik-iskemik ensefalopatide nöroprotektif zaman penceresini gösterir; terapötik hipotermi ilk 6 saat içinde düşünülür.`;
  if (/galaktozemi|fruktoz|glikojen|fenilketonüri|homosistinüri|alkaptonüri|akçaağaç|msud|metabolik|adrenolökodistrofi|x-ald/.test(source)) return `${clue1}, kalıtsal/metabolik hastalık için karar verdiricidir; özgül klinik ipucu ve metabolit paterni çeldiricileri ayırır.`;
  if (/inme|stroke|afazi|hemiparezi|tromboliz/.test(source)) return `${clue1}, akut inme yaklaşımında zaman penceresi ve kanama dışlanmasını öne çıkarır; hipoglisemi gibi taklitçiler hızla elenir.`;
  if (/septik artrit|monoartrit|sıcak şiş eklem/.test(source)) return `${clue1}, septik artrit dışlanana kadar acil kabul edilir; intraartiküler steroid veya gecikmiş antibiyotik yaklaşımı risklidir.`;
  if (/menenjit|meningokok|ense sertliği|peteşi/.test(source)) return `${clue1}, bakteriyel menenjit/meningokoksemi açısından acil uyarıdır; kültür alınsa da antibiyotik tedavisi geciktirilmez.`;
  if (/tüberküloz|kavitasyon|aside dirençli|balgam/.test(source)) return `${clue1}, aktif tüberküloz lehinedir; izolasyon ve mikrobiyolojik doğrulama tedavi planıyla birlikte yürütülür.`;
  if (/sıtma|plasmodium|parazitemi|halka form/.test(source)) return `${clue1}, falciparum sıtması açısından ayırt ettiricidir; yüksek parazitemi ve trombositopeni ağır hastalık riskini artırır.`;
  if (/dka|diyabetik ketoasidoz|kussmaul|anyon/.test(source)) return `${clue1}, DKA tanısının temel üçlüsünü kurar; ilk yaklaşım insülinden önce sıvı ve potasyum güvenliğini değerlendirmektir.`;
  if (/pankreatit|epigastrik|lipaz/.test(source)) return `${clue1}, akut pankreatit tanısını destekler; biliyer etiyoloji varsa kolestaz bulguları ve USG birlikte değerlendirilir.`;
  if (/varis kanaması|hematemez|melena|siroz/.test(source)) return `${clue1}, varis kanaması lehinedir; resüsitasyonla birlikte vazoaktif tedavi, antibiyotik ve erken endoskopi planlanır.`;
  if (/pulmoner emboli|dispne|plevritik|d-dimer|bt anjiyo/.test(source)) return `${clue1}, pulmoner emboli olasılığını yükseltir; hemodinamik durum tanı ve reperfüzyon kararını belirler.`;
  if (/pnömoni|konsolidasyon|balgam|öksürük/.test(source)) return `${clue1}, pnömonide etken/yerleşim ayrımını güçlendirir; tedavi kararı klinik şiddet ve olası patojene göre verilir.`;
  if (/astım|hışıltı|wheezing|pef/.test(source)) return `${clue1}, akut bronkospazm atağını düşündürür; ağır atakta oksijen, inhale SABA ve sistemik steroid geciktirilmez.`;
  if (/koah|hiperkapni|paco2|balgam/.test(source)) return `${clue1}, KOAH alevlenmesinde ventilasyon ve enfeksiyon yükünü gösterir; asidoz/hiperkapni NIV kararını belirler.`;
  if (/kırık|çıkık|skafoid|femur|radius|humerus|omuz/.test(source)) return `${clue1}, ortopedik aciliyetin ana ipucudur; nörovasküler muayene ve uygun immobilizasyon ilk basamaktır.`;
  if (/galaktozemi|fruktoz|glikojen|fenilketonüri|homosistinüri|alkaptonüri|akçaağaç|msud|metabolik/.test(source)) return `${clue1}, kalıtsal metabolik hastalık için karar verdiricidir; besin tetikleyicisi ve özgül metabolit paterni çeldiricileri ayırır.`;
  if (c.branchId === 'tus-spot-olgular') return `${clue1}, bu spot olguda doğru cevaba götüren ana ipucudur; TUS’ta odak ${shortText(focus, 130)} bilgisini çeldiriciden ayırmaktır.`;
  if (/farmakoloji|ilaç|reseptör|yan etki|antidot/.test(source)) return `${clue1}, ilaç-etki veya toksisite eşleşmesini kurdurur; TUS’ta doğru yanıt mekanizma/antidot bilgisinden gelir.`;
  if (/embriyoloji|histoloji|anatomi|sinir|arter|kas|kemik/.test(source)) return `${clue1}, anatomik lokalizasyonu belirler; doğru cevap komşuluk, innervasyon veya damar-sinir ilişkisi üzerinden seçilir.`;

  const second = clue2 ? ` ${clue2} eşlik ettiğinde çeldirici seçenekler geri planda kalır.` : '';
  return `${clue1}, ${correct} açısından en güçlü ipucudur.${second} TUS’ta odak, ${shortText(focus, 100)} bilgisini doğru klinik bağlama yerleştirmektir.`;
}

function presentationText(c) {
  return normalize(c.chiefComplaint || c.title || 'Klinik başvuru bilgisi');
}

const updated = cases.map((c) => {
  const clues = extractEvidence(c);
  const patientIntro = {
    profile: normalize([c.demographics, c.setting].filter(Boolean).join(' · ')),
    presentation: presentationText(c),
    riskContext: extractRisks(c),
    distinctiveClues: clues,
    historySummary: buildHistorySummary(c),
    priorityFocus: focusTemplate(c, clues),
  };
  return { ...c, patientIntro };
});

const header = `// KlinikIQ vaka verisi: TUS odaklı, klinik karar verdirici ve objektif tetkik sonuçlarıyla yapılandırılmıştır.\n// Patient intro QA: Hasta özeti ve klinik öykü tek kartta normalize edilmiştir.\n\n`;
const body = `export const cases = ${JSON.stringify(updated, null, 2)};\n\nexport function getCaseById(caseId) {\n  return cases.find((clinicalCase) => clinicalCase.id === caseId) ?? null;\n}\n\nexport function getCasesByBranch(branchId) {\n  if (!branchId) return cases;\n  return cases.filter((clinicalCase) => clinicalCase.branchId === branchId);\n}\n`;
fs.writeFileSync('src/data/cases.js', header + body);

const report = {
  totalCases: updated.length,
  casesWithPatientIntro: updated.filter(c=>c.patientIntro).length,
  casesWithPriorityFocus: updated.filter(c=>c.patientIntro?.priorityFocus).length,
  casesWithHistorySummary: updated.filter(c=>c.patientIntro?.historySummary).length,
  casesWithDistinctiveClues: updated.filter(c=>c.patientIntro?.distinctiveClues?.length).length,
  generatedAt: new Date().toISOString(),
};
fs.writeFileSync('PATIENT_SUMMARY_HISTORY_REWORK_REPORT.json', JSON.stringify(report, null, 2));
console.log(report);
