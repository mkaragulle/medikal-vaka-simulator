import fs from 'node:fs';
import { rawCases } from '../src/data/cases.js';

const SOURCE_PATH = 'src/data/cases.js';
const REPORT_PATH = 'quality-reports/KlinikIQ_INTERNAL_MEDICINE_INVESTIGATION_LAYER_ENHANCEMENT_REPORT.json';
const TECH_REPORT_PATH = 'quality-reports/KlinikIQ_INTERNAL_MEDICINE_INVESTIGATION_LAYER_TECHNICAL_REPORT.txt';

const internalIds = new Set(rawCases.filter((item) => item.branchId === 'internal-medicine').map((item) => item.id));
const beforeNonInternal = JSON.stringify(rawCases.filter((item) => item.branchId !== 'internal-medicine'));
const beforeInternalSummary = rawCases
  .filter((item) => item.branchId === 'internal-medicine')
  .map((item) => ({ id: item.id, title: item.title, investigationCount: item.investigations?.length || 0 }));

function normalizeRows(rows = []) {
  return rows.map((row) => {
    const next = Array.isArray(row) ? [...row] : [row.parameter, row.value, row.reference, row.note || row.interpretation];
    return next.map((value) => String(value ?? '')
      .replace(/HCO3-/g, 'HCO₃⁻')
      .replace(/HCO3/g, 'HCO₃⁻')
      .replace(/HCO₃⁻-/g, 'HCO₃⁻')
      .replace(/Sik inflamasyon/g, 'Sistemik inflamasyon')
      .replace(/sik inflamasyon/g, 'sistemik inflamasyon')
      .replace(/’dan çok/g, 'DKA’dan çok'));
  });
}

function findInvestigation(clinicalCase, matcher) {
  const normalizedMatcher = typeof matcher === 'string' ? matcher.toLocaleLowerCase('tr') : null;
  return (clinicalCase.investigations || []).find((item) => {
    const text = `${item.title || ''} ${item.label || ''} ${item.id || ''}`.toLocaleLowerCase('tr');
    return normalizedMatcher ? text.includes(normalizedMatcher) : matcher(item, text);
  });
}

function rowsFrom(clinicalCase, matcher, fallback = []) {
  const item = findInvestigation(clinicalCase, matcher);
  return normalizeRows(item?.rows || item?.result?.rows || item?.result?.values || fallback);
}

function makeInvestigation(clinicalCase, {
  suffix,
  title,
  type = 'lab',
  category = 'laboratory',
  priority = 'essential',
  rows = [],
  summary,
  tag,
  score = 3,
  flow = 1,
  subtype = '',
  purpose = '',
  inlineFeedback = '',
  treatmentImpact = '',
  emergencyValue = '',
}) {
  const cleanRows = normalizeRows(rows);
  const cleanSummary = String(summary || '').trim();
  const cleanTag = String(tag || '').trim();
  return {
    id: `${clinicalCase.id}-${suffix}`,
    label: title,
    title,
    type,
    priority,
    subtype: subtype || title,
    category,
    testTypeCategory: category,
    summary: cleanSummary,
    clinicalMeaning: cleanSummary,
    result: {
      title,
      summary: cleanSummary,
      interpretation: cleanSummary,
      values: cleanRows,
      rows: cleanRows,
    },
    rows: cleanRows,
    postAnswerExplanation: cleanSummary,
    interpretation: cleanSummary,
    explanationAfterAnswer: cleanSummary,
    testValueLabel: cleanTag,
    educationalValue: cleanTag,
    clinicalPriorityLabel: cleanTag,
    scoreImpact: score,
    scoreValue: score,
    clinicalFlowOrder: flow,
    purpose: purpose || cleanSummary,
    inlineFeedback: inlineFeedback || cleanSummary,
    treatmentImpact,
    emergencyValue,
  };
}

function setEnhancedInvestigations(clinicalCase, investigations, note = '') {
  clinicalCase.investigations = investigations;
  clinicalCase.availableInvestigations = investigations;
  clinicalCase.useSyntheticInvestigationBank = false;
  clinicalCase.preserveInvestigationOrder = true;
  clinicalCase.investigationLayerMeta = {
    enhancedAt: '2026-05-28',
    editor: 'internal-medicine-investigation-layer-enhancement',
    objective: 'Acil güvenlik, basitten komplekse klinik akış, tetkik değeri etiketi ve tedavi geciktirmeme güvenlik kapısı',
    note,
  };
}

function enhanceHyperkalemia(c) {
  setEnhancedInvestigations(c, [
    makeInvestigation(c, {
      suffix: 'ekg-acil-guvenlik',
      title: 'Acil 12 derivasyon EKG',
      type: 'ecg',
      category: 'cardiac',
      rows: rowsFrom(c, 'elektrokardiyografi', [['EKG bulgusu', 'Sivri T dalgaları, PR uzaması ve QRS genişleme eğilimi', 'Normal ileti beklenir', 'Hiperkalemi kardiyotoksisitesi']]),
      summary: 'Sivri T dalgaları ve QRS genişleme eğilimi ağır hiperkaleminin kardiyak iletimi etkilediğini gösterir; bu bulgu potasyumu düşüren tedaviler beklenmeden intravenöz kalsiyumla membran stabilizasyonunu öncelikli hale getirir.',
      tag: 'Acil güvenlik testi',
      score: 5,
      flow: 1,
      emergencyValue: 'EKG değişikliği varsa kardiyak membran stabilizasyonu geciktirilmez.',
    }),
    makeInvestigation(c, {
      suffix: 'elektrolit-bobrek-kritik',
      title: 'Kritik elektrolit ve böbrek fonksiyon paneli',
      type: 'lab',
      category: 'metabolic',
      rows: rowsFrom(c, 'elektrolit ve böbrek', [['Potasyum', '7.1 mmol/L', '3.5–5.1 mmol/L', 'Kritik yüksek'], ['Kreatinin', '3.2 mg/dL', '0.6–1.2 mg/dL', 'Yüksek'], ['BUN', '64 mg/dL', '7–20 mg/dL', 'Yüksek'], ['Bikarbonat', '18 mmol/L', '22–26 mmol/L', 'Düşük']]),
      summary: 'Kritik potasyum yüksekliği, böbrek fonksiyon bozukluğu ve metabolik asidoz potasyum birikimini açıklar; EKG değişikliği eşlik ettiği için laboratuvar sonucu acil kardiyak stabilizasyon kararını güçlendirir.',
      tag: 'Kritik tedavi belirler',
      score: 5,
      flow: 2,
      treatmentImpact: 'Kalsiyum sonrası insülin-glukoz, beta-agonist, eliminasyon ve diyaliz gereksinimi bu panele göre planlanır.',
    }),
    makeInvestigation(c, {
      suffix: 'renal-ilac-risk',
      title: 'Renal atılım ve ilaç ilişkili risk değerlendirmesi',
      type: 'clinical',
      category: 'clinicalAssessment',
      rows: [['İdrar çıkışı', 'Azalmış', 'Normal idrar çıkışı', 'Oligüri eğilimi'], ['ACE inhibitörü kullanımı', 'Mevcut', 'Potasyum artırıcı risk faktörü yok', 'Hiperkalemi riskini artırabilir']],
      summary: 'Oligüri ve ACE inhibitörü kullanımı renal potasyum atılımının azalmasına katkı verir; bu veri nedeni açıklar ancak EKG değişikliği olan hastada kalsiyum tedavisini geciktirmez.',
      tag: 'Mekanizma kurdurur',
      score: 2,
      flow: 3,
    }),
    makeInvestigation(c, {
      suffix: 'seri-potasyum-ekg-izlem',
      title: 'Seri potasyum ve EKG izlemi',
      type: 'ecg',
      category: 'cardiac',
      priority: 'useful',
      rows: [['İzlem planı', 'Seri potasyum ölçümü ve tekrarlayan EKG', 'Klinik stabiliteye göre', 'Tedavi yanıtı izlemi'], ['Diyaliz değerlendirmesi', 'Refrakter hiperkalemi veya ağır böbrek yetmezliğinde gerekli olabilir', 'Endikasyon yoksa ertelenebilir', 'Eliminasyon basamağı']],
      summary: 'Membran stabilizasyonundan sonra potasyumun düşürülmesi ve vücuttan uzaklaştırılması izlenir; dirençli hiperkalemi veya ağır böbrek yetmezliğinde diyaliz hazırlığı ayrıca değerlendirilir.',
      tag: 'İzlem için değerli',
      score: 2,
      flow: 4,
    }),
  ], 'Hiperkalemi vakasında EKG ilk acil güvenlik testi yapıldı; ACE inhibitörü risk ifadesi düzeltildi.');
}

function enhanceDkaFluids(c) {
  const bg = rowsFrom(c, 'arter kan gazı', [['pH', '7.18', '7.35–7.45', 'Düşük'], ['HCO₃⁻', '9 mmol/L', '22–26 mmol/L', 'Düşük'], ['Anyon açıklığı', '25 mmol/L', '8–12 mmol/L', 'Yüksek']]);
  const glucose = rowsFrom(c, 'glukoz ve keton', [['Plazma glukozu', '486 mg/dL', '70–140 mg/dL', 'Yüksek'], ['Serum beta-hidroksibütirat', '5.8 mmol/L', '<0.6 mmol/L', 'Yüksek'], ['İdrar ketonu', '3+', 'Negatif', 'Pozitif']]);
  const electrolyte = rowsFrom(c, 'elektrolit ve böbrek', [['Sodyum', '132 mmol/L', '135–145 mmol/L', 'Düşük'], ['Potasyum', '5.1 mmol/L', '3.5–5.1 mmol/L', 'Üst sınır/yüksek'], ['BUN', '34 mg/dL', '7–20 mg/dL', 'Yüksek'], ['Kreatinin', '1.3 mg/dL', '0.6–1.2 mg/dL', 'Hafif yüksek']]);
  const infection = rowsFrom(c, 'tetikleyici', [['Lökosit', '13.800/mm³', '4.000–10.000/mm³', 'Yüksek'], ['CRP', '42 mg/L', '<5 mg/L', 'Yüksek'], ['Akciğer oskültasyonu/grafi', 'Belirgin konsolidasyon yok', 'Klinikle uyumlu', 'Tetikleyici araştırılıyor']]);
  setEnhancedInvestigations(c, [
    makeInvestigation(c, {
      suffix: 'bedside-volum-glukoz',
      title: 'Yatak başı volüm ve metabolik güvenlik değerlendirmesi',
      type: 'clinical',
      category: 'bedside',
      rows: [['Klinik volüm durumu', 'Kuru mukozalar, taşikardi ve yüksek şok indeksi', 'Stabil perfüzyon', 'Belirgin hacim kaybı'], ['Yatak başı glukoz', glucose[0]?.[1] || 'Yüksek', '70–140 mg/dL', 'Acil metabolik ölçüm']],
      summary: 'Dehidratasyon ve ağır hiperglisemi ilk dakikada sıvı resüsitasyonu gereksinimini gösterir; insülin ve elektrolit yönetimi bu güvenlik değerlendirmesinden sonra düzenlenir.',
      tag: 'Acil güvenlik testi',
      score: 4,
      flow: 1,
      emergencyValue: 'İlk öncelik volüm açığını güvenli biçimde düzeltmektir.',
    }),
    makeInvestigation(c, {
      suffix: 'kan-gazi-anyon',
      title: 'Kan gazı ve anyon açıklığı',
      type: 'bloodGas',
      category: 'respiratory',
      rows: bg,
      summary: 'Düşük pH, düşük HCO₃⁻ ve yüksek anyon açıklığı keton birikimine bağlı metabolik asidozu gösterir; bu veri DKA paternini kurdurur ancak ilk sıvı basamağını geciktirmez.',
      tag: 'Asit-baz güvenliği',
      score: 4,
      flow: 2,
    }),
    makeInvestigation(c, {
      suffix: 'glukoz-keton',
      title: 'Glukoz ve keton paneli',
      type: 'lab',
      category: 'metabolic',
      rows: glucose,
      summary: 'Hiperglisemiye belirgin beta-hidroksibütirat ve idrar ketonu eşlik etmesi ketotik hiperglisemik acil paterni oluşturur; bu bulgu HHS’den ayrımı güçlendirir.',
      tag: 'Mekanizma kurdurur',
      score: 3,
      flow: 3,
    }),
    makeInvestigation(c, {
      suffix: 'elektrolit-bobrek-guvenlik',
      title: 'Elektrolit ve böbrek fonksiyon güvenlik paneli',
      type: 'lab',
      category: 'metabolic',
      rows: electrolyte,
      summary: 'Potasyum, sodyum ve böbrek fonksiyonu insülin ve sıvı tedavisinin güvenliğini belirler; potasyum güvenli aralıkta değilse insülin zamanlaması değiştirilmelidir.',
      tag: 'Elektrolit güvenliği',
      score: 4,
      flow: 4,
      treatmentImpact: 'İnsülin, potasyum ve sıvı replasmanı bu panelle güvenli hale getirilir.',
    }),
    makeInvestigation(c, {
      suffix: 'tetikleyici-enfeksiyon',
      title: 'Tetikleyici enfeksiyon taraması',
      type: 'lab',
      category: 'laboratory',
      priority: 'useful',
      rows: infection,
      summary: 'Enfeksiyon DKA’yı tetikleyebilir; ancak enfeksiyon odağı araştırması sıvı-elektrolit stabilizasyonunu ve acil metabolik tedaviyi geciktirmemelidir.',
      tag: 'Enfeksiyon odağı',
      score: 2,
      flow: 5,
    }),
  ], 'DKA ilk sıvı tedavisi vakasında bedside volüm/glukoz basamağı eklendi ve asit-baz-elektrolit akışı yeniden sıralandı.');
}

function enhanceDkaHypokalemia(c) {
  const bg = rowsFrom(c, 'arter kan gazı', [['pH', '7.16', '7.35–7.45', 'Düşük'], ['HCO₃⁻', '8 mmol/L', '22–26 mmol/L', 'Düşük'], ['Anyon açıklığı', '27 mmol/L', '8–12 mmol/L', 'Yüksek']]);
  const glucose = rowsFrom(c, 'glukoz ve keton', [['Plazma glukozu', '512 mg/dL', '70–140 mg/dL', 'Yüksek'], ['Serum beta-hidroksibütirat', '6.4 mmol/L', '<0.6 mmol/L', 'Yüksek'], ['İdrar ketonu', '3+', 'Negatif', 'Pozitif']]);
  const potassium = rowsFrom(c, 'potasyum ve böbrek', [['Potasyum', '2.9 mmol/L', '3.5–5.1 mmol/L', 'Düşük'], ['Sodyum', '131 mmol/L', '135–145 mmol/L', 'Düşük'], ['Kreatinin', '1.2 mg/dL', '0.6–1.2 mg/dL', 'Referans üst sınır']]);
  const ekg = rowsFrom(c, 'elektrokardiyografi', [['Ritim', 'Sinüs taşikardisi; belirgin iskemik değişiklik yok', 'Klinik bağlamla uyumlu', 'Hipokalemi açısından izlem']]);
  setEnhancedInvestigations(c, [
    makeInvestigation(c, {
      suffix: 'bedside-volum-glukoz',
      title: 'Yatak başı volüm ve glukoz değerlendirmesi',
      type: 'clinical',
      category: 'bedside',
      rows: [['Klinik volüm durumu', 'Dehidratasyon, taşikardi ve Kussmaul tipi solunum', 'Stabil volüm/perfüzyon', 'Acil sıvı-elektrolit ihtiyacı'], ['Yatak başı glukoz', glucose[0]?.[1] || '512 mg/dL', '70–140 mg/dL', 'Yüksek']],
      summary: 'Dehidratasyon ve ağır hiperglisemi hiperglisemik acil tabloyu hızla düşündürür; ancak tedavinin güvenli ilerlemesi potasyum düzeyinin ayrıca yorumlanmasına bağlıdır.',
      tag: 'İlk basamak veri',
      score: 3,
      flow: 1,
    }),
    makeInvestigation(c, {
      suffix: 'kan-gazi-anyon',
      title: 'Kan gazı ve anyon açıklığı',
      type: 'bloodGas',
      category: 'respiratory',
      rows: bg,
      summary: 'Yüksek anyon açıklıklı metabolik asidoz keton birikimini gösterir; bu veri DKA paternini kurdurur fakat düşük potasyum varsa insülin hemen başlanmamalıdır.',
      tag: 'Asit-baz güvenliği',
      score: 4,
      flow: 2,
    }),
    makeInvestigation(c, {
      suffix: 'glukoz-keton',
      title: 'Glukoz ve keton paneli',
      type: 'lab',
      category: 'metabolic',
      rows: glucose,
      summary: 'Hiperglisemi ve belirgin keton birikimi DKA tanısını güçlendirir; tedavi sırası ise potasyum güvenlik eşiğine göre belirlenir.',
      tag: 'Mekanizma kurdurur',
      score: 3,
      flow: 3,
    }),
    makeInvestigation(c, {
      suffix: 'potasyum-guvenlik',
      title: 'Potasyum ve böbrek fonksiyon güvenlik paneli',
      type: 'lab',
      category: 'metabolic',
      rows: potassium,
      summary: 'Potasyumun düşük olması insülinin hemen başlanmasını tehlikeli hale getirir; insülin potasyumu hücre içine kaydıracağı için önce potasyum replasmanı gerekir.',
      tag: 'Kritik tedavi belirler',
      score: 5,
      flow: 4,
      treatmentImpact: 'Potasyum <3.3 mmol/L ise insülin ertelenir ve potasyum replasmanı öncelik kazanır.',
    }),
    makeInvestigation(c, {
      suffix: 'ekg-hipokalemi-izlem',
      title: 'Elektrokardiyografi ve aritmi izlemi',
      type: 'ecg',
      category: 'cardiac',
      rows: ekg,
      summary: 'Sinüs taşikardisi tek başına özgül değildir; hipokalemi bağlamında EKG izlemi aritmi güvenliği için değerlidir ve potasyum replasmanı sırasında sürdürülmelidir.',
      tag: 'Elektrolit güvenliği',
      score: 3,
      flow: 5,
    }),
  ], 'DKA + hipokalemi vakasında potasyum güvenlik kapısı belirginleştirildi; insülini geciktirme mantığı tetkik yorumuna işlendi.');
}

function enhanceTtp(c) {
  setEnhancedInvestigations(c, [
    makeInvestigation(c, {
      suffix: 'organ-guvenlik-klinik',
      title: 'Acil organ etkilenimi ve nörolojik güvenlik değerlendirmesi',
      type: 'clinical',
      category: 'clinicalAssessment',
      rows: [['Nörolojik durum', 'Dalgalanan bilinç/konuşma-dikkat değişikliği', 'Normal mental durum', 'Mikrovasküler organ etkilenimi'], ['Aktif kanama', 'Masif kanama yok; peteşi-ekimoz mevcut', 'Aktif majör kanama yok', 'Transfüzyon kararı için güvenlik verisi']],
      summary: 'Nörolojik dalgalanma ve yaygın purpura TMA aciliyetini artırır; bu klinik güvenlik verisi laboratuvar doğrulaması beklenirken plazma değişimi kararının gecikmemesini sağlar.',
      tag: 'Acil güvenlik testi',
      score: 4,
      flow: 1,
    }),
    makeInvestigation(c, { suffix: 'hemogram', title: 'Hemogram', type: 'lab', category: 'laboratory', rows: rowsFrom(c, 'hemogram'), summary: 'Anemi ve ağır trombositopeninin birlikte bulunması peteşi-ekimozla birleştiğinde trombotik mikroanjiyopati olasılığını artırır.', tag: 'İlk basamak veri', score: 4, flow: 2 }),
    makeInvestigation(c, { suffix: 'hemoliz-paneli', title: 'Hemoliz paneli', type: 'lab', category: 'laboratory', rows: rowsFrom(c, 'hemoliz paneli'), summary: 'LDH yüksekliği, indirekt bilirubin artışı, düşük haptoglobin ve retikülositoz intravasküler hemolizi destekler; periferik yaymadaki şistositlerle MAHA mantığı kurulur.', tag: 'Mekanizma kurdurur', score: 4, flow: 3 }),
    makeInvestigation(c, { suffix: 'periferik-yayma', title: 'Periferik yayma', type: 'pathology', category: 'pathology', rows: rowsFrom(c, 'periferik yayma'), summary: 'Şistositler mikrotrombüslerden geçen eritrositlerin mekanik parçalanmasını gösterir; bu bulgu TMA paterninde kritik ayırıcı değerdedir.', tag: 'Kritik tedavi belirler', score: 5, flow: 4 }),
    makeInvestigation(c, { suffix: 'bobrek-fonksiyon', title: 'Böbrek fonksiyonu', type: 'lab', category: 'laboratory', rows: rowsFrom(c, 'böbrek fonksiyonu'), summary: 'Kreatinin ve BUN artışı mikrotrombotik böbrek etkilenimini gösterir; böbrek bulgusu nörolojik bulguyla birlikte organ hasarı ciddiyetini artırır.', tag: 'Organ hasarı göstergesi', score: 3, flow: 5 }),
    makeInvestigation(c, { suffix: 'koagulasyon-paneli', title: 'Koagülasyon paneli', type: 'lab', category: 'laboratory', rows: rowsFrom(c, 'koagülasyon paneli'), summary: 'PT, aPTT ve fibrinojenin belirgin bozulmaması DIC olasılığını geri plana iter; trombosit ağırlıklı mikrotrombotik süreci ayırt etmeye yardım eder.', tag: 'Ayırıcı tanıya yardım eder', score: 3, flow: 6 }),
    makeInvestigation(c, { suffix: 'coombs-adamts13', title: 'Coombs ve ADAMTS13 değerlendirmesi', type: 'lab', category: 'laboratory', rows: rowsFrom(c, 'coombs'), summary: 'Negatif direkt antiglobulin testi immün hemolizi desteklemez; ADAMTS13 testi tanıyı doğrulamaya yardım eder ancak güçlü klinik şüphede plazma değişimi bu sonucun beklenmesiyle geciktirilmemelidir.', tag: 'Tedaviyi geciktirmez', score: 3, flow: 7, treatmentImpact: 'Plazma değişimi klinik şüphe güçlü olduğunda ADAMTS13 sonucu beklemeden başlatılabilir.' }),
    makeInvestigation(c, { suffix: 'gebelik-guvenlik', title: 'Gebelik testi', type: 'lab', category: 'laboratory', priority: 'useful', rows: rowsFrom(c, 'gebelik testi'), summary: 'Negatif beta-hCG gebelik ilişkili TMA/HELLP ayırıcılarını geri plana iter; bu test tedavi planını güvenli hale getirir ama acil TMA yönetimini geciktirmez.', tag: 'Ayırıcı tanıya yardım eder', score: 2, flow: 8 }),
  ], 'TTP/TMA vakalarında organ güvenliği, MAHA, koagülasyon ayrımı ve ADAMTS13 sonucu beklenmeden tedavi güvenliği vurgulandı.');
}

function enhanceGca(c) {
  setEnhancedInvestigations(c, [
    makeInvestigation(c, {
      suffix: 'gorme-aciliyeti',
      title: 'Görme aciliyeti ve hedefli damar muayenesi',
      type: 'clinical',
      category: 'clinicalAssessment',
      rows: [['Görme semptomu', 'Geçici görme bulanıklığı öyküsü', 'Görme semptomu yok', 'İskemik risk'], ['Temporal arter', 'Hassasiyet ve nabız azalması', 'Normal nabız/hassasiyet yok', 'Klinik patern']],
      summary: 'Geçici görme bulanıklığı ve temporal arter bulguları kalıcı görme kaybı riskini yükseltir; bu nedenle steroid tedavisi biyopsi veya görüntüleme sonucu beklenerek geciktirilmemelidir.',
      tag: 'Acil güvenlik testi',
      score: 5,
      flow: 1,
    }),
    makeInvestigation(c, { suffix: 'inflamasyon', title: 'İnflamasyon belirteçleri', type: 'lab', category: 'laboratory', rows: rowsFrom(c, 'inflamasyon'), summary: 'ESR/CRP yüksekliği ve trombositoz büyük damar inflamasyonu olasılığını artırır; klinik görme riski varsa bu destekleyici veri tedaviyi ertelemek için kullanılmamalıdır.', tag: 'İlk basamak veri', score: 3, flow: 2 }),
    makeInvestigation(c, { suffix: 'temporal-arter-usg', title: 'Temporal arter ultrasonografisi', type: 'ultrasound', category: 'imaging', rows: rowsFrom(c, 'ultrason'), summary: 'Temporal arter duvar kalınlaşması ve halo bulgusu hedefli görüntüleme desteği sağlar; negatif veya geciken görüntüleme görme tehdidi olan tabloda steroid başlangıcını geciktirmemelidir.', tag: 'Hedefli test', score: 3, flow: 3 }),
    makeInvestigation(c, { suffix: 'temporal-arter-biyopsi', title: 'Temporal arter biyopsisi planı', type: 'pathology', category: 'pathology', rows: rowsFrom(c, 'biyopsi'), summary: 'Temporal arter biyopsisi tanısal doğrulama için değerlidir; ancak dev hücreli arterit kuşkusu ve görme semptomu varken tedavi biyopsi sonucunu beklememelidir.', tag: 'Tedaviyi geciktirmez', score: 3, flow: 4 }),
  ], 'Dev hücreli arterit vakasında görme güvenliği ilk basamak yapıldı; biyopsinin tedaviyi geciktirmemesi açıklaştırıldı.');
}

function enhancePulmonaryRenal(c) {
  setEnhancedInvestigations(c, [
    makeInvestigation(c, { suffix: 'oksijenasyon-akciger', title: 'Oksijenasyon ve akciğer görüntüleme', type: 'xray', category: 'respiratory', rows: rowsFrom(c, 'akciğer görüntüleme', [['Akciğer grafisi', 'Bilateral yamalı alveoler opasiteler', 'Normal akciğer alanları', 'Alveoler hemoraji lehine'], ['SpO₂', c.vitals?.SpO2 || '%90, oda havasında', '%95–100', 'Düşük']]), summary: 'Hemoptiziyle birlikte hipoksemi ve bilateral alveoler opasiteler pulmoner hemoraji olasılığını artırır; oksijenasyon bozukluğu tanısal doğrulama beklenmeden acil yönetim gerektirir.', tag: 'Acil güvenlik testi', score: 5, flow: 1 }),
    makeInvestigation(c, { suffix: 'bobrek-fonksiyon', title: 'Böbrek fonksiyon paneli', type: 'lab', category: 'laboratory', rows: rowsFrom(c, 'böbrek fonksiyon'), summary: 'Kreatinin ve BUN artışı hızlı gelişen glomerüler kaynaklı böbrek hasarını destekler; akciğer bulgularıyla birleştiğinde akciğer-böbrek sendromu önceliğini yükseltir.', tag: 'Böbrek hasarı göstergesi', score: 4, flow: 2 }),
    makeInvestigation(c, { suffix: 'idrar-sediment', title: 'İdrar analizi ve sediment', type: 'urine', category: 'urine', rows: rowsFrom(c, 'idrar analizi'), summary: 'Dismorfik eritrosit ve eritrosit silendirleri kanamanın glomerüler kaynaklı olduğunu gösterir; hemoptiziyle birlikte pulmoner-renal sendrom akıl yürütmesini güçlendirir.', tag: 'Kritik tedavi belirler', score: 5, flow: 3 }),
    makeInvestigation(c, { suffix: 'otoimmun-seroloji', title: 'Otoimmün seroloji', type: 'lab', category: 'immunologySerology', rows: rowsFrom(c, 'otoimmün seroloji'), summary: 'Anti-GBM antikor pozitifliği akciğer-böbrek sendromunda anti-GBM hastalığını öne çıkarır; ANCA negatifliği ve referans içi kompleman düzeyleri ayırıcı tanıyı daraltır.', tag: 'Hedefli test', score: 4, flow: 4 }),
    makeInvestigation(c, { suffix: 'biyopsi-immunfloresan', title: 'Böbrek biyopsisi immünfloresan inceleme', type: 'pathology', category: 'pathology', rows: rowsFrom(c, 'biyopsi'), summary: 'Glomerüler bazal membran boyunca lineer IgG birikimi doğrulayıcı histopatolojik paterndir; hipoksemi ve pulmoner hemoraji varken tedavi planı bu doğrulama süreciyle geciktirilmemelidir.', tag: 'Doğrulayıcı test', score: 4, flow: 5 }),
  ], 'Pulmoner-renal sendrom vakalarında oksijenasyon ilk sıraya alındı; seroloji kategorisi İmmünoloji/seroloji olarak düzeltildi.');
}

function enhanceCdiff(c) {
  setEnhancedInvestigations(c, [
    makeInvestigation(c, { suffix: 'hacim-fulminan-guvenlik', title: 'Hacim durumu ve fulminan kolit güvenliği', type: 'clinical', category: 'clinicalAssessment', rows: [['Klinik şiddet', 'Sık sulu dışkılama, hafif toksik görünüm ve dehidratasyon', 'Stabil hidrasyon', 'Sıvı kaybı'], ['Peritonit/ileus', 'Rebound, defans veya ileus bulgusu yok', 'Yok', 'Fulminan kolit lehine değil']], summary: 'Dehidratasyon ve peritonit/ileus bulgusu olup olmadığı ilk güvenlik değerlendirmesidir; fulminan tablo yoksa medikal tedavi önceliklidir.', tag: 'Acil güvenlik testi', score: 3, flow: 1 }),
    makeInvestigation(c, { suffix: 'hemogram-inflamasyon', title: 'Hemogram, inflamasyon ve böbrek paneli', type: 'lab', category: 'laboratory', rows: rowsFrom(c, 'hemogram'), summary: 'Lökositoz, CRP yüksekliği ve kreatinin artışı semptomatik kolit ile sıvı kaybı/şiddet değerlendirmesini destekler.', tag: 'Temel değerlendirme', score: 3, flow: 2 }),
    makeInvestigation(c, { suffix: 'cdifficile-toksin', title: 'Dışkıda C. difficile antijen/toksin testi', type: 'microbiology', category: 'microbiology', rows: rowsFrom(c, 'dışkıda'), summary: 'GDH antijeni ve toksin A/B pozitifliği antibiyotik sonrası sulu ishal tablosunda C. difficile kolitini destekler; sonuç tedavi seçimini doğrudan yönlendirir.', tag: 'Kritik tedavi belirler', score: 5, flow: 3 }),
    makeInvestigation(c, { suffix: 'abdominal-komplikasyon', title: 'Abdominal komplikasyon değerlendirmesi', type: 'imaging', category: 'imaging', priority: 'useful', rows: rowsFrom(c, 'abdominal'), summary: 'Toksik megakolon, perforasyon veya peritonit bulgusu olmaması cerrahi aciliyet yerine hedefli medikal tedaviyi destekler.', tag: 'Komplikasyon taraması', score: 2, flow: 4 }),
  ], 'C. difficile vakasında fulminan kolit ve hacim güvenliği ayrı ilk basamak haline getirildi.');
}

function enhanceEndocarditisStaph(c) {
  setEnhancedInvestigations(c, [
    makeInvestigation(c, { suffix: 'oksijenasyon-sepsis', title: 'Oksijenasyon ve sepsis güvenliği', type: 'clinical', category: 'clinicalAssessment', rows: [['SpO₂', c.vitals?.SpO2 || '%91, oda havasında', '%95–100', 'Düşük'], ['Şok indeksi', c.vitals?.['Şok indeksi'] || 'Yüksek', 'Normal klinik perfüzyon', 'Hemodinamik risk'], ['Solunum bulgusu', 'Bilateral raller ve batıcı göğüs ağrısı', 'Akciğer bulgusu yok', 'Septik pulmoner odak kuşkusu']], summary: 'Hipoksemi, taşikardi ve toksik görünüm ağır enfeksiyon riskini gösterir; kültür alınması önemlidir ancak instabil klinikte antibiyotik tedavisi gereksiz geciktirilmemelidir.', tag: 'Acil güvenlik testi', score: 4, flow: 1 }),
    makeInvestigation(c, { suffix: 'inflamasyon-paneli', title: 'Hemogram ve inflamasyon paneli', type: 'lab', category: 'laboratory', rows: rowsFrom(c, 'hemogram'), summary: 'Yüksek lökosit, CRP ve prokalsitonin sistemik inflamasyon ile bakteriyemi olasılığını destekler; etken ayrımı risk faktörü ve mikrobiyolojiyle yapılır.', tag: 'Temel değerlendirme', score: 3, flow: 2 }),
    makeInvestigation(c, { suffix: 'kan-kulturu', title: 'Antibiyotik öncesi kan kültürü', type: 'culture', category: 'microbiology', rows: rowsFrom(c, 'kan kültürü'), summary: 'Farklı venlerden antibiyotik öncesi alınan kan kültürleri etkeni belirlemek için kritiktir; ağır klinik tabloda ampirik tedavi kültür sonucu beklenerek geciktirilmemelidir.', tag: 'Antibiyotik öncesi alınmalı', score: 5, flow: 3 }),
    makeInvestigation(c, { suffix: 'tte', title: 'Transtorasik ekokardiyografi', type: 'echo', category: 'cardiac', rows: rowsFrom(c, 'transtorasik').map((row) => row[0] === 'Kapak bulgusu' ? [row[0], String(row[1]).replace('hareketli vejetasyon', 'hareketli ekodens yapı'), row[2], 'Kapak tutulumu lehine'] : row), summary: 'Triküspit kapakta hareketli ekodens yapı ve yeni üfürüm birlikte kapak tutulumunu destekler; görüntüleme bulgusu klinik ve kültür verisiyle anlam kazanır.', tag: 'Doğrulayıcı test', score: 4, flow: 4 }),
    makeInvestigation(c, { suffix: 'toraks-bt', title: 'Toraks BT ile septik pulmoner emboli taraması', type: 'ct', category: 'imaging', priority: 'useful', rows: rowsFrom(c, 'toraks bt'), summary: 'Periferik nodüler/kaviter odaklar sağ kalp kaynaklı septik emboli komplikasyonunu düşündürür; bu test komplikasyon ve yayılımı gösterir.', tag: 'Komplikasyon taraması', score: 3, flow: 5 }),
  ], 'Sağ kalp endokarditi vakasında oksijenasyon/sepsis güvenliği, kültür-öncesi antibiyotik dengesi ve komplikasyon taraması netleştirildi.');
}

function enhanceEndocarditisViridans(c) {
  setEnhancedInvestigations(c, [
    makeInvestigation(c, { suffix: 'klinik-inflamasyon', title: 'Klinik patern ve inflamasyon paneli', type: 'lab', category: 'laboratory', rows: rowsFrom(c, 'hemogram'), summary: 'Uzamış ateş, üfürüm ve inflamasyon yüksekliği subakut enfektif endokardit olasılığını artırır; etken ayrımı girişim öyküsü ve kültür paterniyle yapılır.', tag: 'Temel değerlendirme', score: 3, flow: 1 }),
    makeInvestigation(c, { suffix: 'kan-kulturu', title: 'Antibiyotik öncesi kan kültürü', type: 'culture', category: 'microbiology', rows: rowsFrom(c, 'kan kültürü'), summary: 'Farklı venlerden antibiyotik öncesi alınan kültürler etkeni saptamak için kritiktir; sepsis veya instabilite gelişirse antibiyotik kültür nedeniyle geciktirilmemelidir.', tag: 'Antibiyotik öncesi alınmalı', score: 5, flow: 2 }),
    makeInvestigation(c, { suffix: 'tte', title: 'Transtorasik ekokardiyografi', type: 'echo', category: 'cardiac', rows: rowsFrom(c, 'transtorasik').map((row) => row[0] === 'Kapak bulgusu' ? [row[0], 'Mitral kapakta küçük hareketli ekodens yapı', 'Kapak üzerinde hareketli yapı beklenmez', 'Kapak tutulumu lehine'] : row), summary: 'Mitral kapak üzerindeki hareketli ekodens yapı, üfürüm ve pozitif kültür bağlamında kapak tutulumunu destekler; açıklama doğrudan tanı etiketi yerine görüntü bulgusunu tarif eder.', tag: 'Doğrulayıcı test', score: 4, flow: 3 }),
    makeInvestigation(c, { suffix: 'periferik-bulgular', title: 'Periferik vasküler/embolik bulgular', type: 'clinical', category: 'clinicalAssessment', rows: rowsFrom(c, 'periferik'), summary: 'Ağrısız Janeway benzeri lezyonlar vasküler/embolik fenomenleri destekler; muayene bulgusu laboratuvar yerine klinik bulgu olarak yorumlanmalıdır.', tag: 'Ayırıcı tanıya yardım eder', score: 2, flow: 4 }),
    makeInvestigation(c, { suffix: 'tee-komplikasyon', title: 'TEE veya komplikasyon değerlendirmesi', type: 'echo', category: 'cardiac', priority: 'situational', rows: [['Endikasyon', 'TTE yetersizse, komplikasyon veya apse şüphesi varsa TEE planlanır', 'TTE yeterli ve komplikasyon yok', 'Durumsal doğrulama']], summary: 'TEE, TTE yetersiz olduğunda veya apse/kapak destrüksiyonu gibi komplikasyonlardan şüphelenildiğinde değer kazanır; stabil hastada temel kültür ve TTE basamaklarından sonra konumlandırılır.', tag: 'Durumsal doğrulama', score: 2, flow: 5 }),
  ], 'Subakut viridans endokarditi vakasında TTE bulgusu doğrudan tanı etiketi yerine tarifleyici hale getirildi; periferik bulgu kategorisi klinik olarak düzeltildi.');
}

function enhanceRvStemi(c) {
  setEnhancedInvestigations(c, [
    makeInvestigation(c, { suffix: 'preload-hemodinami', title: 'Hemodinami ve preload güvenliği', type: 'clinical', category: 'clinicalAssessment', rows: [['Kan basıncı', c.vitals?.TA || 'Hipotansif', 'Stabil basınç', 'Hipotansiyon'], ['Juguler venöz dolgunluk', 'Belirgin', 'Yok', 'Sağ ventrikül preload bağımlılığı'], ['Akciğer oskültasyonu', 'Ral yok', 'Konjesyon yok', 'Temiz akciğer']], summary: 'Hipotansiyon, juguler venöz dolgunluk ve temiz akciğerler sağ ventrikül preload bağımlılığını düşündürür; nitrat gibi preload azaltıcı tedaviler bu tabloda hipotansiyonu ağırlaştırabilir.', tag: 'Acil güvenlik testi', score: 5, flow: 1 }),
    makeInvestigation(c, { suffix: 'ekg-sag-derivasyon', title: '12 derivasyon ve sağ derivasyon EKG', type: 'ecg', category: 'cardiac', rows: rowsFrom(c, 'elektrokardiyografi'), summary: 'İnferior ST elevasyonuna V4R elevasyonunun eşlik etmesi sağ ventrikül tutulumu olasılığını artırır; reperfüzyon kararı EKG ve klinikle gecikmeden verilir.', tag: 'Kritik tedavi belirler', score: 5, flow: 2 }),
    makeInvestigation(c, { suffix: 'troponin', title: 'Kardiyak biyobelirteçler', type: 'lab', category: 'laboratory', rows: rowsFrom(c, 'kardiyak'), summary: 'Troponin ve CK-MB miyokard hasarını destekler; STEMI’de tedavi kararı biyobelirteç sonucunu beklemeden EKG ve hemodinamiyle verilir.', tag: 'Tedaviyi geciktirmez', score: 3, flow: 3 }),
    makeInvestigation(c, { suffix: 'pocus-eko', title: 'Yatak başı ekokardiyografi', type: 'echo', category: 'cardiac', rows: rowsFrom(c, 'ekokardiyografi'), summary: 'Sağ ventrikül dilatasyonu/hipokinezisi ve akciğer konjesyonu olmaması preload bağımlı hipotansiyon mekanizmasını destekler; bu bulgu nitrat güvenliği açısından kritiktir.', tag: 'Tedavi yönlendirir', score: 4, flow: 4 }),
  ], 'Sağ ventrikül MI vakalarında preload güvenliği ilk basamak yapıldı; nitrat sakıncası objektif veriyle ilişkilendirildi.');
}

function enhanceAdrenalCrisis(c) {
  const electrolytes = rowsFrom(c, 'elektrolit paneli');
  const cortisol = rowsFrom(c, 'kortizol');
  const renal = rowsFrom(c, 'böbrek');
  setEnhancedInvestigations(c, [
    makeInvestigation(c, { suffix: 'hemodinami-glukoz', title: 'Acil hemodinami ve glukoz güvenliği', type: 'clinical', category: 'bedside', rows: [['Kan basıncı/şok indeksi', `${c.vitals?.TA || 'Hipotansiyon'}; ${c.vitals?.['Şok indeksi'] || 'yüksek'}`, 'Stabil perfüzyon', 'Adrenal kriz riski'], ['Yatak başı glukoz', electrolytes.find((row) => row[0] === 'Glukoz')?.[1] || 'Düşük', '70–100 mg/dL', 'Hipoglisemi eğilimi']], summary: 'Dirençli hipotansiyon ve hipoglisemi eğilimi adrenal krizde ilk güvenlik verisidir; hidrokortizon ve izotonik sıvı tedavisi kortizol sonucunu beklemekle geciktirilmemelidir.', tag: 'Acil güvenlik testi', score: 5, flow: 1 }),
    makeInvestigation(c, { suffix: 'elektrolit', title: 'Elektrolit paneli', type: 'lab', category: 'metabolic', rows: electrolytes, summary: 'Hiponatremi, hiperkalemi ve hipoglisemi primer adrenal yetmezlik/adrenal kriz paternini destekler ve sıvı-steroid tedavisinin aciliyetini artırır.', tag: 'Kritik tedavi belirler', score: 5, flow: 2 }),
    makeInvestigation(c, { suffix: 'bobrek-hacim', title: 'Böbrek ve hacim durumu', type: 'lab', category: 'laboratory', rows: renal, summary: 'BUN/kreatinin artışı ve uygunsuz idrar sodyumu hacim kaybı ile mineralokortikoid eksikliğini birlikte gösterir; sıvı replasmanını tedavinin güvenli parçası yapar.', tag: 'Hemodinamik risk', score: 3, flow: 3 }),
    makeInvestigation(c, { suffix: 'kortizol-acth', title: 'Kortizol ve ACTH değerlendirmesi', type: 'lab', category: 'laboratory', rows: cortisol, summary: 'Düşük kortizol ve yüksek ACTH primer adrenal yetmezliği destekler; mümkünse örnek alınır fakat adrenal kriz şüphesinde tedavi bu sonucu beklemez.', tag: 'Tedaviyi geciktirmez', score: 3, flow: 4 }),
    makeInvestigation(c, { suffix: 'tetikleyici-enfeksiyon', title: 'Tetikleyici enfeksiyon ve stres değerlendirmesi', type: 'lab', category: 'laboratory', priority: 'useful', rows: [['Tetikleyici', 'Ateşli üst solunum yolu enfeksiyonu/kusma öyküsü', 'Akut stres yok', 'Kriz tetikleyicisi'], ['Ateş', c.vitals?.Ateş || '38.2 °C', '36–37.5 °C', 'Yüksek veya klinikle uyumlu']], summary: 'Enfeksiyon ve kusma kortizol gereksinimini artırarak adrenal krizi tetikleyebilir; tetikleyici araştırması steroid-sıvı tedavisini geciktirmemelidir.', tag: 'Enfeksiyon odağı', score: 2, flow: 5 }),
  ], 'Adrenal kriz vakalarında hemodinami/glukoz güvenlik kapısı eklendi; kortizol sonucunu beklememe ilkesi korunup vurgulandı.');
}

function enhanceChronicAdrenal(c) {
  setEnhancedInvestigations(c, [
    makeInvestigation(c, { suffix: 'ortostatik-pigmentasyon', title: 'Ortostatik bulgu ve hiperpigmentasyon değerlendirmesi', type: 'clinical', category: 'clinicalAssessment', rows: [['Ortostatik hipotansiyon', 'Belirgin', 'Yok', 'Volüm/mineralokortikoid etkisi'], ['Hiperpigmentasyon', 'Ağız mukozası ve palmar çizgilerde mevcut', 'Yok', 'ACTH yüksekliği lehine']], summary: 'Ortostatik hipotansiyon ve hiperpigmentasyon primer adrenal yetmezlik yönünde klinik patern oluşturur; laboratuvarlar bu geri bildirim ilişkisini doğrular.', tag: 'İlk basamak veri', score: 3, flow: 1 }),
    makeInvestigation(c, { suffix: 'elektrolit', title: 'Elektrolit paneli', type: 'lab', category: 'metabolic', rows: rowsFrom(c, 'elektrolit'), summary: 'Hiponatremi, hiperkalemi ve düşük glukoz mineralokortikoid ve glukokortikoid eksikliğini düşündürür; sekonder adrenal yetmezlikten ayrımda hiperkalemi özellikle değerlidir.', tag: 'Ayırıcı tanıya yardım eder', score: 4, flow: 2 }),
    makeInvestigation(c, { suffix: 'kortizol-acth', title: 'Sabah kortizolü ve ACTH', type: 'lab', category: 'laboratory', rows: rowsFrom(c, 'sabah kortizolü'), summary: 'Düşük sabah kortizolüne yüksek ACTH eşlik etmesi adrenal bez düzeyindeki primer yetmezlik paternini gösterir.', tag: 'Doğrulayıcı test', score: 5, flow: 3 }),
    makeInvestigation(c, { suffix: 'renin-aldosteron', title: 'Renin-aldosteron değerlendirmesi', type: 'lab', category: 'laboratory', rows: rowsFrom(c, 'renin'), summary: 'Yüksek renin ve düşük aldosteron mineralokortikoid eksikliğini destekler; primer adrenal yetmezliğin mekanizmasını netleştirir.', tag: 'Mekanizma kurdurur', score: 3, flow: 4 }),
  ], 'Kronik primer adrenal yetmezlik vakasında klinik geri bildirim ilişkisi ve mineralokortikoid ayrımı sıraya eklendi.');
}

function enhanceRenalColic(c) {
  setEnhancedInvestigations(c, [
    makeInvestigation(c, { suffix: 'idrar-analizi', title: 'Tam idrar analizi', type: 'urine', category: 'urine', rows: rowsFrom(c, 'tam idrar'), summary: 'Mikroskobik hematüri renal kolik ile uyumludur; nitrit ve lökositin negatif olması enfekte obstrüksiyon olasılığını azaltır.', tag: 'İlk basamak veri', score: 3, flow: 1 }),
    makeInvestigation(c, { suffix: 'bobrek-enfeksiyon-guvenlik', title: 'Böbrek fonksiyonu ve enfeksiyon güvenliği', type: 'lab', category: 'laboratory', rows: [['Kreatinin', '1.0 mg/dL', '0.6–1.2 mg/dL', 'Referans içinde'], ['Lökosit', '8.700/mm³', '4.000–10.000/mm³', 'Referans içinde'], ['Ateş', c.vitals?.Ateş || '36.7 °C', '36–37.5 °C', 'Ateş yok']], summary: 'Böbrek fonksiyonunun korunması, ateş ve lökositoz olmaması enfekte/komplike obstrüksiyon riskini azaltır; bu güvenlik verisi acil ürolojik girişim gereksinimini ayırır.', tag: 'Acil güvenlik testi', score: 3, flow: 2 }),
    makeInvestigation(c, { suffix: 'kontrastsiz-bt', title: 'Kontrastsız üriner sistem BT', type: 'ct', category: 'imaging', rows: rowsFrom(c, 'kontrastsız'), summary: 'Kontrastsız BT taşın yerini ve obstrüksiyon derecesini gösterir; küçük distal üreter taşı ve hafif hidronefroz konservatif/analjezik yaklaşım için bağlam sağlar.', tag: 'Doğrulayıcı test', score: 4, flow: 3 }),
    makeInvestigation(c, { suffix: 'kristal-morfoloji', title: 'İdrar mikroskopisi - kristal morfolojisi', type: 'urine', category: 'urine', rows: rowsFrom(c, 'kristal'), summary: 'Zarf şeklindeki kristaller kalsiyum oksalat taşını destekler; kristal morfolojisi taş tipini ayırmada yardımcıdır ama acil obstrüksiyon güvenliğinin önüne geçmez.', tag: 'Ayırıcı tanıya yardım eder', score: 3, flow: 4 }),
  ], 'Renal kolik vakasında komplike/enfekte obstrüksiyon güvenlik paneli eklendi.');
}

function enhanceHhs(c) {
  setEnhancedInvestigations(c, [
    makeInvestigation(c, { suffix: 'bedside-volum-noroloji', title: 'Yatak başı volüm ve nörolojik güvenlik değerlendirmesi', type: 'clinical', category: 'bedside', rows: [['Mental durum', 'Konfüzyon ve giderek artan dalgınlık', 'Normal bilinç', 'Hiperosmolalite etkisi'], ['Klinik volüm durumu', 'Kuru mukozalar, düşük turgor ve yüksek şok indeksi', 'Stabil hidrasyon', 'Ağır dehidratasyon']], summary: 'Konfüzyon ve belirgin dehidratasyon HHS’de ilk sıvı resüsitasyonu önceliğini belirler; insülin ve elektrolit yönetimi volüm güvenliğiyle birlikte planlanır.', tag: 'Acil güvenlik testi', score: 5, flow: 1 }),
    makeInvestigation(c, { suffix: 'glukoz-osmolalite', title: 'Glukoz ve osmolalite paneli', type: 'lab', category: 'metabolic', rows: rowsFrom(c, 'glukoz ve osmolalite'), summary: 'Ağır hiperglisemi ve yüksek efektif osmolalite mental durum değişikliğini açıklar; bu veri HHS paterninde sıvı resüsitasyonunu ilk basamak yapar.', tag: 'Kritik tedavi belirler', score: 5, flow: 2 }),
    makeInvestigation(c, { suffix: 'keton-asitbaz', title: 'Keton ve asit-baz değerlendirmesi', type: 'bloodGas', category: 'respiratory', rows: rowsFrom(c, 'keton ve asit'), summary: 'Belirgin asidoz ve ketoz olmaması DKA’dan çok HHS lehinedir; bu ayrım tedavi hızını ve elektrolit izlem yoğunluğunu belirler.', tag: 'Ayırıcı tanıya yardım eder', score: 4, flow: 3 }),
    makeInvestigation(c, { suffix: 'bobrek-hacim', title: 'Böbrek fonksiyonu ve hacim kaybı', type: 'lab', category: 'laboratory', rows: rowsFrom(c, 'böbrek fonksiyonu'), summary: 'BUN/kreatinin artışı ve konsantre idrar derin sıvı kaybını gösterir; bu nedenle ilk tedavi yoğun izotonik sıvı replasmanıdır.', tag: 'Hemodinamik risk', score: 4, flow: 4 }),
    makeInvestigation(c, { suffix: 'enfeksiyon-tetikleyici', title: 'Enfeksiyon tetikleyicisi', type: 'xray', category: 'imaging', priority: 'useful', rows: rowsFrom(c, 'enfeksiyon'), summary: 'Pnömoni HHS için sık tetikleyicidir; enfeksiyon yönetimi önemlidir ancak metabolik stabilizasyon ve sıvı resüsitasyonu geciktirilmemelidir.', tag: 'Enfeksiyon odağı', score: 2, flow: 5 }),
    makeInvestigation(c, { suffix: 'seri-izlem', title: 'Seri glukoz, osmolalite ve elektrolit izlemi', type: 'lab', category: 'metabolic', priority: 'useful', rows: [['Saatlik glukoz', 'Yakın izlem gerekir', 'Kademeli düşüş hedeflenir', 'Tedavi yanıtı'], ['Sodyum/potasyum/osmolalite', 'Seri ölçüm planlanır', 'Ani osmolalite değişimi olmamalı', 'Nörolojik güvenlik'], ['İdrar çıkışı', 'Saatlik izlem', 'Yeterli perfüzyon göstergesi', 'Volüm yanıtı']], summary: 'HHS’de glukoz ve osmolalitenin kontrollü düşmesi, elektrolit ve idrar çıkışının yakından izlenmesi nörolojik ve kardiyak güvenlik için önemlidir.', tag: 'İzlem için değerli', score: 2, flow: 6 }),
  ], 'HHS vakasında bedside volüm/nörolojik güvenlik ve seri izlem paneli eklendi.');
}

function enhanceHypercalcemia(c) {
  setEnhancedInvestigations(c, [
    makeInvestigation(c, { suffix: 'ekg-volum', title: 'Acil EKG ve volüm güvenliği', type: 'ecg', category: 'cardiac', rows: [['EKG', 'QT kısalığı eğilimi; belirgin malign aritmi yok', 'Normal QT', 'Hiperkalsemi etkisi'], ['Klinik volüm', 'Dehidratasyon ve yüksek şok indeksi', 'Stabil hidrasyon', 'Sıvı önceliği']], summary: 'Ağır hiperkalsemi kardiyak elektriksel aktiviteyi ve volüm durumunu etkileyebilir; semptomatik hastada ilk güvenli basamak izotonik sıvı resüsitasyonudur.', tag: 'Acil güvenlik testi', score: 4, flow: 1 }),
    makeInvestigation(c, { suffix: 'kalsiyum-pth', title: 'Kalsiyum-fosfor-PTH paneli', type: 'lab', category: 'metabolic', rows: rowsFrom(c, 'kalsiyum'), summary: 'Düzeltilmiş kalsiyumun çok yüksek, PTH’nin baskılanmış olması PTH dışı ağır hiperkalsemi paternini gösterir ve acil tedavi gereksinimini destekler.', tag: 'Kritik tedavi belirler', score: 5, flow: 2 }),
    makeInvestigation(c, { suffix: 'bobrek-hacim', title: 'Böbrek ve hacim durumu', type: 'lab', category: 'laboratory', rows: rowsFrom(c, 'böbrek'), summary: 'Hiperkalsemi poliüri ve volüm kaybı yapar; prerenal etkilenim izotonik sıvı resüsitasyonunu tedavinin ilk basamağı haline getirir.', tag: 'Hemodinamik risk', score: 4, flow: 3 }),
    makeInvestigation(c, { suffix: 'malignite-goruntuleme', title: 'Malignite yönünden görüntüleme ve PTHrP', type: 'xray', category: 'imaging', priority: 'useful', rows: rowsFrom(c, 'malignite'), summary: 'Kilo kaybı, sigara öyküsü, akciğer kitlesi ve yüksek PTHrP malignite ilişkili hiperkalsemiyi destekler; etiyoloji araştırması acil sıvı tedavisinin önüne geçmemelidir.', tag: 'Etiyolojiye yardım eder', score: 3, flow: 4 }),
  ], 'Ağır hiperkalsemi vakasında EKG/volüm güvenliği ve acil sıvı önceliği eklendi.');
}

function enhanceIronDeficiency(c) {
  setEnhancedInvestigations(c, [
    makeInvestigation(c, { suffix: 'hemogram-indeks', title: 'Hemogram ve eritrosit indeksleri', type: 'lab', category: 'laboratory', rows: rowsFrom(c, 'hemogram'), summary: 'Mikrositik hipokrom anemi ve artmış RDW demir eksikliği paternini destekler; aneminin şiddeti semptomlarla birlikte değerlendirilir.', tag: 'İlk basamak veri', score: 4, flow: 1 }),
    makeInvestigation(c, { suffix: 'demir-calismalari', title: 'Demir çalışmaları', type: 'lab', category: 'laboratory', rows: rowsFrom(c, 'demir'), summary: 'Düşük ferritin, düşük serum demiri, yüksek TDBK ve düşük transferrin satürasyonu demir depolarının tükendiğini gösterir.', tag: 'Doğrulayıcı test', score: 5, flow: 2 }),
    makeInvestigation(c, { suffix: 'yayma-retikulosit', title: 'Periferik yayma ve retikülosit', type: 'pathology', category: 'pathology', rows: rowsFrom(c, 'periferik'), summary: 'Mikrositoz-hipokromi demir eksikliğini destekler; retikülosit yanıtının yetersiz olması substrat eksikliğine bağlı eritropoez kısıtlılığını gösterir.', tag: 'Mekanizma kurdurur', score: 3, flow: 3 }),
    makeInvestigation(c, { suffix: 'gebelik-guvenlik', title: 'Gebelik testi', type: 'lab', category: 'laboratory', priority: 'useful', rows: rowsFrom(c, 'gebelik'), summary: 'Gebelik testi tedavi ve kanama değerlendirmesi açısından güvenlik bilgisi sağlar; mikrositik anemi paterninin ana açıklamasını tek başına değiştirmez.', tag: 'Tedavi güvenliği', score: 2, flow: 4 }),
    makeInvestigation(c, { suffix: 'kan-kaybi-kaynagi', title: 'Kan kaybı kaynağı değerlendirmesi', type: 'clinical', category: 'clinicalAssessment', priority: 'useful', rows: [['Menstrüel öykü', 'Yoğun ve uzun süren adet kanamaları', 'Normal kanama paterni', 'Kronik kan kaybı kaynağı'], ['GİS kanama taraması', 'Melena öyküsü yok; gerekirse dışkıda gizli kan/yaşa uygun GİS değerlendirme planlanır', 'Kanama bulgusu yok', 'Etiyoloji araştırması']], summary: 'Demir eksikliği saptandıktan sonra kan kaybı kaynağı araştırılır; bu olguda yoğun menstrüel kanama en olası kaynak olsa da yaş ve risk durumuna göre GİS değerlendirme de düşünülür.', tag: 'Etiyolojiye yardım eder', score: 2, flow: 5 }),
  ], 'Demir eksikliği anemisi vakasında kan kaybı kaynağı ve tedavi güvenliği katmanı eklendi.');
}

function applyEnhancement(c) {
  if (c.id === 'v163-new-002-acil-elektrolit-bozuklugu') return enhanceHyperkalemia(c);
  if (['v164-new-011-aclik-ve-kusma-sonrasi-metabolik-bozulma', 'v166-new-033-hiperglisemik-acil-tablo', 'v168-new-058-hiperglisemi-ve-asidotik-solunum'].includes(c.id)) return enhanceDkaFluids(c);
  if (['v165-new-021-aclik-ve-kusma-sonrasi-metabolik-bozulma', 'v167-new-042-asidoz-ve-hiperglisemi-tablosu'].includes(c.id)) return enhanceDkaHypokalemia(c);
  if (['v164-new-014-purpura-ve-norolojik-bulgular', 'v166-new-039-trombositopeni-ve-norolojik-bulgu', 'v167-new-048-hemoliz-ve-norolojik-bulgular', 'v169-new-063-trombositopeni-ve-norolojik-bulgu'].includes(c.id)) return enhanceTtp(c);
  if (c.id === 'v164-new-017-yeni-baslayan-temporal-bas-agrisi') return enhanceGca(c);
  if (['v164-new-018-hemoptizi-ve-hematuri-birlikteligi', 'v192-new-305-hemoptizi-ve-bobrek-yetmezligi'].includes(c.id)) return enhancePulmonaryRenal(c);
  if (c.id === 'v164-new-020-antibiyotik-sonrasi-ishal') return enhanceCdiff(c);
  if (['v165-new-024-ates-ve-yeni-ufurum', 'v166-new-036-ates-ve-yeni-ufurum'].includes(c.id)) return enhanceEndocarditisStaph(c);
  if (c.id === 'v167-new-044-uzamis-ates-ve-ufurum') return enhanceEndocarditisViridans(c);
  if (['v165-new-029-gogus-agrisi-ve-hipotansiyon', 'v167-new-050-akut-gogus-agrisi-ve-hipotansiyon'].includes(c.id)) return enhanceRvStemi(c);
  if (['v165-new-030-hipotansiyon-ve-elektrolit-bozuklugu', 'v192-new-301-halsizlik-ve-direncli-hipotansiyon'].includes(c.id)) return enhanceAdrenalCrisis(c);
  if (c.id === 'v166-new-040-kronik-halsizlik-ve-hipotansiyon') return enhanceChronicAdrenal(c);
  if (c.id === 'v167-new-049-kolik-yan-agrisi') return enhanceRenalColic(c);
  if (c.id === 'v192-new-302-yasli-hastada-bilinc-bulanikligi-ve-hiperglisemi') return enhanceHhs(c);
  if (c.id === 'v192-new-303-kabizlik-poliuri-ve-konfuzyon') return enhanceHypercalcemia(c);
  if (c.id === 'v192-new-304-halsizlik-ve-pika') return enhanceIronDeficiency(c);
}

rawCases.filter((item) => item.branchId === 'internal-medicine').forEach(applyEnhancement);

const afterNonInternal = JSON.stringify(rawCases.filter((item) => item.branchId !== 'internal-medicine'));
if (beforeNonInternal !== afterNonInternal) {
  throw new Error('Scope guard failed: non-internal medicine cases changed.');
}

const afterInternalSummary = rawCases
  .filter((item) => item.branchId === 'internal-medicine')
  .map((item) => ({
    id: item.id,
    title: item.title,
    investigationCountBefore: beforeInternalSummary.find((entry) => entry.id === item.id)?.investigationCount || 0,
    investigationCountAfter: item.investigations?.length || 0,
    tags: [...new Set((item.investigations || []).map((inv) => inv.testValueLabel).filter(Boolean))],
    categories: [...new Set((item.investigations || []).map((inv) => inv.testTypeCategory || inv.category).filter(Boolean))],
  }));

const expectedInternal = rawCases.filter((item) => item.branchId === 'internal-medicine');
const missingEnhanced = expectedInternal.filter((item) => !item.investigationLayerMeta);
if (missingEnhanced.length) {
  throw new Error(`Unenhanced internal medicine cases: ${missingEnhanced.map((item) => item.id).join(', ')}`);
}

const source = fs.readFileSync(SOURCE_PATH, 'utf8');
const start = source.indexOf('export const rawCases = ');
const endMarker = '\n];\n\nexport const cases =';
const end = source.indexOf(endMarker, start);
if (start < 0 || end < 0) throw new Error('Could not locate rawCases block.');
const nextSource = `${source.slice(0, start)}export const rawCases = ${JSON.stringify(rawCases, null, 2)};${source.slice(end + 3)}`;
fs.writeFileSync(SOURCE_PATH, nextSource);

const totalBefore = beforeInternalSummary.reduce((sum, item) => sum + item.investigationCount, 0);
const totalAfter = afterInternalSummary.reduce((sum, item) => sum + item.investigationCountAfter, 0);
const report = {
  generatedAt: '2026-05-28',
  scope: 'branchId === internal-medicine only',
  internalMedicineCasesProcessed: expectedInternal.length,
  scopeGuardNonInternalCasesUnchanged: true,
  investigationCountBefore: totalBefore,
  investigationCountAfter: totalAfter,
  netAddedInvestigations: totalAfter - totalBefore,
  supportedNewFieldsUsed: ['testValueLabel', 'educationalValue', 'clinicalPriorityLabel', 'scoreImpact', 'scoreValue', 'clinicalFlowOrder', 'treatmentImpact', 'emergencyValue'],
  categoryCorrections: [
    'cardiology/cardiac ayrımı normalize edildi',
    'bloodGas kategorileri respiratory altında toplandı',
    'otoimmün seroloji için immunologySerology kategorisi eklendi',
    'klinik muayene bulguları clinicalAssessment kategorisine alındı',
  ],
  safetyGates: [
    'Hiperkalemide EKG değişikliği varsa IV kalsiyum geciktirilmez',
    'DKA + K < 3.3 mmol/L ise insülin potasyum replasmanı öncesi başlanmaz',
    'Adrenal kriz şüphesinde kortizol sonucu beklenerek steroid-sıvı tedavisi geciktirilmez',
    'Endokarditte kan kültürü antibiyotik öncesi alınır; instabil hastada antibiyotik geciktirilmez',
    'TTP/TMA güçlü şüphesinde ADAMTS13 sonucu plazma değişimini geciktirmez',
    'HHS’de ilk öncelik volüm resüsitasyonu ve kontrollü osmolalite-elektrolit izlemidir',
  ],
  cases: afterInternalSummary,
};
fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
fs.writeFileSync(TECH_REPORT_PATH, [
  'KlinikIQ Internal Medicine Investigation Layer Enhancement Technical Report',
  'Scope: Only branchId === internal-medicine cases were transformed.',
  `Cases processed: ${expectedInternal.length}`,
  `Investigation count: ${totalBefore} -> ${totalAfter} (net +${totalAfter - totalBefore})`,
  'UI/data support added: clinicalFlowOrder propagation and immunologySerology category metadata.',
  'Safety gates embedded: hyperkalemia membrane stabilization, DKA potassium gate, HHS fluids-first logic, adrenal crisis treatment-not-delayed rule, endocarditis culture/treatment balance, TTP ADAMTS13-not-delayed rule.',
  'Scope guard: non-internal medicine case JSON remained unchanged before write.',
].join('\n'));

console.log(JSON.stringify({ processed: expectedInternal.length, totalBefore, totalAfter, netAdded: totalAfter - totalBefore }, null, 2));
