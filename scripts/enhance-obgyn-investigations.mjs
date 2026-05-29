import fs from 'node:fs';
import path from 'node:path';
import { rawCases } from '../src/data/cases.js';

const DATA_FILE = path.resolve('src/data/cases.js');
const REPORT_DIR = path.resolve('quality-reports');
fs.mkdirSync(REPORT_DIR, { recursive: true });

const cases = JSON.parse(JSON.stringify(rawCases));
const changedCaseIds = new Set();
const added = [];
const renamed = [];
const tagged = [];
const ordered = [];

const ECTOPIC_IDS = new Set(['v163-new-004-gebelikte-akut-karin', 'v184-new-191-erken-gebelikte-karin-agrisi-ve-bayilma']);
const PREECLAMPSIA_IDS = new Set(['v167-new-046-gebelikte-hipertansif-tablo', 'v169-new-062-gebelikte-hipertansiyon-ve-norolojik-yakinma', 'v185-new-226-gebelikte-bas-agrisi-ve-hipertansiyon']);
const ECLAMPSIA_IDS = new Set(['v186-new-232-gebelikte-nobet-ve-hipertansiyon']);
const ABRUPTION_IDS = new Set(['v185-new-225-gebelikte-agrili-kanama']);
const PREVIA_IDS = new Set(['v174-new-100-gebeligin-gec-doneminde-agrisiz-kanama', 'v186-new-231-gebeligin-son-doneminde-agrisiz-kanama']);
const TORSION_IDS = new Set(['v185-new-227-ani-pelvik-agri-ve-over-kisti']);
const PID_IDS = new Set(['v195-new-358-alt-karin-agrisi-ve-servikal-hassasiyet']);
const VASA_IDS = new Set(['v194-new-331-membran-rupturu-sonrasi-fetal-kalp-atiminda-dusme']);
const PMB_IDS = new Set(['v195-new-359-menopoz-sonrasi-vajinal-kanama']);


function trLower(value = '') {
  return String(value || '').toLocaleLowerCase('tr');
}

function slug(value = '') {
  return trLower(value)
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'tetkik';
}

function hasInv(c, titlePart) {
  const needle = trLower(titlePart);
  return (c.investigations || []).some((x) => trLower(`${x.title || ''} ${x.label || ''}`).includes(needle));
}

function context(c) {
  return trLower([
    c.id,
    c.title,
    c.clinicalFocus,
    c.learningTarget,
    c.chiefComplaint,
    c.stem,
    c.diagnosis?.correct,
    ...(c.exam || []),
  ].join(' '));
}

function inferType(inv) {
  const text = trLower(`${inv.title || ''} ${inv.label || ''} ${inv.category || ''} ${inv.testTypeCategory || ''}`);
  if (/kan grubu|crossmatch|cross-match|transfüzyon|kan hazırlığı|eritrosit/.test(text)) return 'bloodBank';
  if (/kardiyotokografi|\bnst\b|fetal kalp|fetal izlem|fetal iyilik/.test(text)) return 'functionalTest';
  if (/ultrason|usg|doppler|transvajinal|transabdominal|obstetrik görüntüleme|pelvik görüntüleme/.test(text)) return 'ultrasound';
  if (/biyopsi|histopatoloji|patoloji|sitoloji|endometrial örnekleme|kolposkopi/.test(text)) return 'pathology';
  if (/kültür|naat|pcr|mikrobiyoloji|vajinal sürüntü|servikal örnek/.test(text)) return 'microbiology';
  if (/idrar|protein\/kreatinin|protein kreatinin/.test(text)) return 'urine';
  if (/hemogram|trombosit|ast|alt|ldh|bilirubin|kreatinin|koagülasyon|fibrinojen|beta-hcg|hcg|elektrolit|lökosit|crp|glukoz|tiroid|tsh|serum|laboratuvar|panel|biyokimya/.test(text)) return 'lab';
  if (/muayene|değerlendirme|hemodinami|kanama|uterus|serviks|stabilizasyon|doğumhane|4t|vital|ağrı|nöbet|klonus|loşi|spekulum/.test(text)) return 'clinical';
  return inv.type || 'clinical';
}

function inferCategory(inv) {
  const text = trLower(`${inv.title || ''} ${inv.label || ''} ${inv.category || ''} ${inv.testTypeCategory || ''}`);
  if (/kan grubu|crossmatch|cross-match|transfüzyon|kan hazırlığı|eritrosit/.test(text)) return 'bloodBank';
  if (/kardiyotokografi|\bnst\b|fetal kalp|fetal izlem|fetal iyilik/.test(text)) return 'functional';
  if (/ultrason|usg|doppler|transvajinal|transabdominal|obstetrik görüntüleme|pelvik görüntüleme/.test(text)) return 'imaging';
  if (/biyopsi|histopatoloji|patoloji|sitoloji|endometrial örnekleme|kolposkopi/.test(text)) return 'pathology';
  if (/kültür|naat|pcr|mikrobiyoloji|vajinal sürüntü|servikal örnek/.test(text)) return 'microbiology';
  if (/idrar|protein\/kreatinin|protein kreatinin/.test(text)) return 'urine';
  if (/beta-hcg|hcg|gebelik testi/.test(text)) return 'urogenital';
  if (/muayene|değerlendirme|hemodinami|kanama|uterus|serviks|stabilizasyon|doğumhane|4t|vital|ağrı|nöbet|klonus|loşi|spekulum/.test(text)) return 'clinicalAssessment';
  if (/hemogram|trombosit|ast|alt|ldh|bilirubin|kreatinin|koagülasyon|fibrinojen|elektrolit|lökosit|crp|glukoz|tiroid|tsh|serum|laboratuvar|panel|biyokimya/.test(text)) return 'laboratory';
  return inv.testTypeCategory || inv.category || 'other';
}

function valueMeta(inv, c) {
  const title = trLower(`${inv.title || ''} ${inv.label || ''}`);
  const text = trLower(`${inv.title || ''} ${inv.label || ''} ${inv.summary || ''} ${inv.interpretation || ''}`);
  const ctx = context(c);

  if (/fetal|nst|kardiyotokografi|fhr|kalp hızı|iyilik hali/.test(title)) return ['Fetal iyilik hali', 3, 20, 'essential'];
  if (/protein\/kreatinin|proteinüri|idrar/.test(title)) return ['Tanıyı destekler', 2, 34, 'useful'];
  if (/fibrinojen|koagülasyon|inr|aptt|pt\b|dic|tüketim/.test(text)) return ['Koagülasyon riski', 5, 32, 'essential'];
  if (/hellp|preeklampsi|organ etkilenimi|ağır özellik|trombosit|ast|alt|ldh|bilirubin/.test(text)) return [/hellp/.test(text) ? 'HELLP taraması' : 'Ağır özellik göstergesi', 5, 30, 'essential'];
  if (/kan grubu|crossmatch|transfüzyon|kan hazırlığı|eritrosit/.test(text)) return ['Kanama güvenliği', 4, 42, 'essential'];
  if (/hemogram|hemoglobin|trombosit/.test(text) && /kanama|postpartum|previa|ablatio|ektopik|düşük|lekelenme|adet/.test(ctx)) return ['Kanama güvenliği', 3, 31, 'essential'];
  if (/beta-hcg|hcg|gebelik testi/.test(text)) return ['Gebelik güvenliği', 4, 18, 'essential'];
  if (/plasenta yerleşimi|previa|internal servikal os|dijital muayene/.test(text)) return ['Dijital muayene yapılmaz', 5, 24, 'essential'];
  if (/transvajinal|ultrason|usg|doppler|obstetrik|pelvik/.test(text)) return /doppler/.test(text) ? ['Hedefli görüntüleme', 4, 38, 'essential'] : ['İlk basamak görüntüleme', 3, 38, 'essential'];
  if (/nöbet sonrası|postiktal|hava yolu|bilinç|klonus/.test(title)) return ['Nöbet güvenliği', 5, 10, 'essential'];
  if (/maternal|hemodinami|vital|şok|kanama miktarı|stabilite|peritoneal|ağrı paterni|doğumhane klinik|uterus tonusu|4t|servikal hareket/.test(title)) return ['Maternal güvenlik', 4, 10, 'essential'];
  if (/kültür|naat|pcr|servikal örnek|mikrobiyoloji/.test(text)) return ['Etken örneklemesi', 2, 36, 'useful'];
  if (/enfeksiyon|crp|lökosit|ateş/.test(text)) return ['Enfeksiyon güvenliği', 3, 30, 'essential'];
  if (/endometrial|biyopsi|histopatoloji|patoloji/.test(text)) return ['Doğrulayıcı test', 4, 50, 'essential'];
  if (/izlem|toksisite|idrar çıkışı|solunum sayısı|refleks/.test(text)) return ['Tedaviyi geciktirmez', 2, 55, 'useful'];
  return ['İzlem için değerli', 2, 60, 'useful'];
}

function setInvestigationMeta(inv, c, index) {
  const before = JSON.stringify(inv);
  const originalTitle = inv.title || inv.label || `Tetkik ${index + 1}`;
  const improvedTitle = renameTitle(originalTitle, c);
  if (originalTitle !== improvedTitle) renamed.push({ caseId: c.id, from: originalTitle, to: improvedTitle });

  inv.title = improvedTitle;
  inv.label = improvedTitle;
  inv.orderLabel = improvedTitle;
  inv.id = inv.id || `${slug(c.id)}-${slug(improvedTitle)}`;
  inv.type = inferType(inv);
  const category = inferCategory(inv);
  inv.category = category;
  inv.testTypeCategory = category;
  inv.subtype = inv.subtype || subtypeFor(inv);

  const [tag, score, flow, priority] = valueMeta(inv, c);
  inv.priority = inv.priority || priority;
  inv.testValueLabel = inv.testValueLabel || tag;
  inv.educationalValue = inv.educationalValue || tag;
  inv.clinicalPriorityLabel = inv.clinicalPriorityLabel || tag;
  inv.scoreImpact = Number.isFinite(Number(inv.scoreImpact)) ? inv.scoreImpact : score;
  inv.scoreValue = Number.isFinite(Number(inv.scoreValue)) ? inv.scoreValue : inv.scoreImpact;
  inv.clinicalFlowOrder = Number.isFinite(Number(inv.clinicalFlowOrder)) ? inv.clinicalFlowOrder : flow + index / 100;
  inv.obstetricPriority = inv.obstetricPriority || tag;
  inv.treatmentImpact = inv.treatmentImpact || treatmentImpactFor(inv, c);
  inv.maternalSafetyValue = inv.maternalSafetyValue || maternalSafetyValueFor(inv);
  inv.fetalSafetyValue = inv.fetalSafetyValue || fetalSafetyValueFor(inv);

  if (inv.summary && !inv.interpretation) inv.interpretation = inv.summary;
  if (inv.interpretation && !inv.summary) inv.summary = inv.interpretation;
  const feedback = feedbackFor(inv, c);
  inv.inlineFeedback = inv.inlineFeedback || feedback;
  inv.postAnswerExplanation = inv.postAnswerExplanation || feedback;
  inv.explanationAfterAnswer = inv.explanationAfterAnswer || feedback;
  inv.clinicalMeaning = inv.clinicalMeaning || inv.interpretation || inv.summary || feedback;

  if (JSON.stringify(inv) !== before) {
    changedCaseIds.add(c.id);
    tagged.push({ caseId: c.id, title: inv.title, tag: inv.testValueLabel, score: inv.scoreImpact, flow: inv.clinicalFlowOrder });
  }
}

function renameTitle(title, c) {
  const t = trLower(title);
  const ctx = context(c);
  if (/klinik materyal|tetkik materyali|klinik veri özeti/.test(t)) {
    if (/eklampsi|nöbet/.test(ctx)) return 'Eklampsi/HELLP organ etkilenimi paneli';
    if (/preeklampsi|hipertansif/.test(ctx)) return 'Preeklampsi ağır özellikler ve HELLP laboratuvar paneli';
    if (/ablatio|abruptio|ağrılı kanama|hipertonik uterus/.test(ctx)) return 'Koagülasyon ve tüketim koagülopatisi paneli';
    if (/previa|ağrısız kanama|parlak kırmızı/.test(ctx)) return 'Kanama ve transfüzyon hazırlığı paneli';
    if (/postmenopoz|menopoz sonrası/.test(ctx)) return 'Transvajinal ultrasonografi ile endometrium değerlendirmesi';
    if (/ektopik|erken gebelik.*bayılma|serbest sıvı/.test(ctx)) return 'Seri beta-hCG ve transvajinal ultrasonografi değerlendirmesi';
    if (/torsiyon|over kisti|ani pelvik ağrı/.test(ctx)) return 'Adneksiyal Doppler ultrasonografi';
    if (/postpartum kanama|doğum sonrası.*kanama/.test(ctx)) return 'Kanama şiddeti ve koagülasyon değerlendirmesi';
    return 'Vaka odaklı objektif veri değerlendirmesi';
  }
  if (/^preeklampsi laboratuvar paneli$/.test(t)) {
    if (ECLAMPSIA_IDS.has(c.id)) return 'Eklampsi/HELLP organ etkilenimi paneli';
    return 'Preeklampsi ağır özellikler ve HELLP laboratuvar paneli';
  }
  if (/^koagülasyon ve fibrinojen paneli$/.test(t) && ABRUPTION_IDS.has(c.id)) return 'Koagülasyon ve tüketim koagülopatisi paneli';
  if (/^hemogram ve kan hazırlığı$/.test(t) && PREVIA_IDS.has(c.id)) return 'Kanama ve transfüzyon hazırlığı paneli';
  if (/^obstetrik ultrasonografi$/.test(t) && PREVIA_IDS.has(c.id)) return 'Plasenta lokalizasyonu ve fetal iyilik hali ultrasonografisi';
  if (/^transvajinal ultrasonografi$/.test(t) && PMB_IDS.has(c.id)) return 'Transvajinal ultrasonografi ile endometrium değerlendirmesi';
  if (/^transvajinal ultrasonografi$/.test(t) && ECTOPIC_IDS.has(c.id)) return 'Transvajinal ultrasonografi ile gebelik lokalizasyonu değerlendirmesi';
  if (/^serum beta-hcg$/.test(t) && ECTOPIC_IDS.has(c.id)) return 'Serum beta-hCG ve gebelik lokalizasyonu başlangıç değerlendirmesi';
  return title;
}

function subtypeFor(inv) {
  switch (inv.type) {
    case 'lab': return 'Laboratuvar paneli';
    case 'ultrasound': return 'Ultrasonografi';
    case 'functionalTest': return 'Fetal/klinik izlem';
    case 'bloodBank': return 'Kan hazırlığı';
    case 'microbiology': return 'Mikrobiyoloji';
    case 'urine': return 'İdrar tetkiki';
    case 'pathology': return 'Patoloji / histopatoloji';
    case 'clinical': return 'Klinik değerlendirme';
    default: return 'Tetkik';
  }
}

function treatmentImpactFor(inv, c) {
  const text = trLower(`${inv.title} ${inv.summary || ''}`);
  if (/nöbet|eklampsi|preeklampsi|hellp|ağır özellik/.test(text)) return 'Nöbet profilaksisi, kan basıncı kontrolü ve doğum planı laboratuvar sonucu beklenerek geciktirilmemelidir.';
  if (/fibrinojen|koagülasyon|kan hazırlığı|transfüzyon|kanama/.test(text)) return 'Kanama kontrolü, kan ürünü hazırlığı ve girişim/doğum planı eş zamanlı yürütülür.';
  if (/fetal|nst|kardiyotokografi/.test(text)) return 'Fetal değerlendirme karar verirken kullanılır; maternal stabilizasyon önceliğini geriye düşürmez.';
  if (/plasenta lokalizasyonu|previa|dijital muayene/.test(text)) return 'Plasenta previa dışlanmadan dijital vajinal muayene yapılmaz.';
  if (/ektopik|serbest sıvı|gebelik lokalizasyonu/.test(text)) return 'Hemodinamik instabilite varsa izlem veya ek doğrulama cerrahi kanama kontrolünü geciktirmemelidir.';
  if (/torsiyon|adneksiyal doppler|over/.test(text)) return 'Klinik torsiyon şüphesi güçlü ise normal/parsiyel Doppler akımı cerrahi değerlendirmeyi geciktirmemelidir.';
  if (/pid|enfeksiyon|kültür|naat/.test(text)) return 'Mikrobiyolojik örnekleme ampirik tedaviyi klinik eşik karşılandığında geciktirmemelidir.';
  return 'Sonuç klinik tabloyla birlikte yorumlanır; acil tedavi gerektiren durumda yönetim geciktirilmez.';
}

function maternalSafetyValueFor(inv) {
  const text = trLower(`${inv.title} ${inv.testValueLabel || ''}`);
  if (/maternal|hemodinami|kanama|koagülasyon|hemogram|kan grubu|crossmatch|hellp|preeklampsi|eklampsi|nöbet|enfeksiyon|torsiyon|ektopik/.test(text)) return 'high';
  return 'moderate';
}

function fetalSafetyValueFor(inv) {
  const text = trLower(`${inv.title} ${inv.testValueLabel || ''}`);
  if (/fetal|nst|kardiyotokografi|plasenta|obstetrik|gebelik haftası|preeklampsi|eklampsi|ablatio|previa|pprom|vasa/.test(text)) return 'high';
  return 'notPrimary';
}

function feedbackFor(inv, c) {
  const text = trLower(`${inv.title} ${inv.summary || ''}`);
  if (/nöbet sonrası|eklampsi/.test(text)) return 'Nöbet, ağır hipertansiyon ve organ etkilenimi maternal acil kabul edilir; hava yolu-solunum-dolaşım güvenliği, antikonvülzan tedavi ve kan basıncı kontrolü tetkik beklenerek ertelenmez.';
  if (/preeklampsi|hellp|ağır özellik/.test(text)) return 'Trombositopeni, transaminaz yüksekliği ve gebelikte beklenenden yüksek kreatinin ağır özellik/HELLP spektrumunu destekler; nöbet profilaksisi, antihipertansif tedavi ve doğum planı geciktirilmemelidir.';
  if (/fibrinojen|koagülasyon|tüketim/.test(text)) return 'Fibrinojen düşüklüğü ve koagülasyon bozulması obstetrik kanamada tüketim koagülopatisi riskini gösterir; kan ürünü hazırlığı ve doğum/girişim planlamasını acilleştirir.';
  if (/kan grubu|crossmatch|hemogram|kan hazırlığı|transfüzyon/.test(text)) return 'Aktif ya da potansiyel obstetrik kanamada hemoglobin, trombosit ve crossmatch anne güvenliği için gereklidir; kanama kontrolüyle eş zamanlı yürütülür.';
  if (/plasenta lokalizasyonu|previa|dijital muayene/.test(text)) return 'Üçüncü trimesterde ağrısız parlak kırmızı kanamada plasenta yerleşimi ultrasonografiyle gösterilmeden dijital vajinal muayene yapılmamalıdır.';
  if (/fetal|nst|kardiyotokografi|kalp hızı/.test(text)) return 'Fetal kalp hızı ve NST/CTG fetal iyilik halini gösterir; sonuç doğum zamanlamasını etkileyebilir ancak anne stabilizasyonunun önüne geçmez.';
  if (/ektopik|gebelik lokalizasyonu|serbest sıvı|beta-hcg/.test(text)) return 'Pozitif beta-hCG ile intrauterin gebelik kesesinin izlenmemesi ve serbest sıvı ektopik gebeliği düşündürür; instabil hastada seri izlem cerrahi kontrolü geciktirmemelidir.';
  if (/torsiyon|adneksiyal doppler|venöz akım|over/.test(text)) return 'Büyümüş over ve azalmış venöz akım torsiyonu destekler; arteriyel akımın görülmesi torsiyonu dışlamaz ve cerrahi değerlendirme geciktirilmemelidir.';
  if (/postmenopoz|endometrium|endometrial/.test(text)) return 'Postmenopozal kanamada artmış endometrium kalınlığı endometrial patoloji riskini artırır; ultrason ilk basamaktır, kesin değerlendirme histolojik örneklemeyle yapılır.';
  if (/pid|enfeksiyon|naat|kültür|servikal/.test(text)) return 'Gebelik dışlanır ve servikal örnekler alınır; PID klinik eşiği karşılandığında ampirik antibiyotik tedavisi kültür/NAAT sonucu beklenmeden başlanır.';
  if (/membran rüptürü|pprom|spekulum/.test(text)) return 'PPROM değerlendirmesinde steril spekulum ve enfeksiyon-fetal izlem kullanılır; dijital muayene enfeksiyon riskini artırabileceği için rutin ilk basamak değildir.';
  if (/postpartum|uterus tonusu|4t|uterin atoni/.test(text)) return 'Postpartum kanamada uterus tonusu ve 4T yaklaşımı nedeni hızla ayırır; uterin atonide uterin masaj ve oksitosin kanama kontrolü için geciktirilmez.';
  return inv.summary || inv.interpretation || 'Bu tetkik olguda klinik kararın güvenli verilmesini sağlayan objektif veriyi sunar.';
}

function inv(title, category, type, rows, summary, tag, score, flow, priority = 'essential') {
  return {
    id: slug(title),
    title,
    label: title,
    orderLabel: title,
    category,
    testTypeCategory: category,
    type,
    subtype: subtypeFor({ type }),
    rows,
    summary,
    interpretation: summary,
    clinicalMeaning: summary,
    priority,
    testValueLabel: tag,
    educationalValue: tag,
    clinicalPriorityLabel: tag,
    scoreImpact: score,
    scoreValue: score,
    clinicalFlowOrder: flow,
    obstetricPriority: tag,
    treatmentImpact: '',
    maternalSafetyValue: tag.includes('Maternal') || tag.includes('Kanama') || tag.includes('Nöbet') ? 'high' : 'moderate',
    fetalSafetyValue: tag.includes('Fetal') ? 'high' : 'notPrimary',
  };
}

function addAtStart(c, newInv) {
  if (!c.investigations) c.investigations = [];
  if (hasInv(c, newInv.title)) return;
  newInv.id = `${slug(c.id)}-${slug(newInv.title)}`;
  c.investigations.unshift(newInv);
  changedCaseIds.add(c.id);
  added.push({ caseId: c.id, title: newInv.title });
}

function addAtEnd(c, newInv) {
  if (!c.investigations) c.investigations = [];
  if (hasInv(c, newInv.title)) return;
  newInv.id = `${slug(c.id)}-${slug(newInv.title)}`;
  c.investigations.push(newInv);
  changedCaseIds.add(c.id);
  added.push({ caseId: c.id, title: newInv.title });
}

function specificAdditions(c) {
  const ctx = context(c);
  if (ECTOPIC_IDS.has(c.id)) {
    addAtStart(c, inv(
      'Maternal hemodinami ve peritoneal irritasyon değerlendirmesi',
      'clinicalAssessment',
      'clinical',
      [
        ['Kan basıncı / nabız', `${c.vitals?.TA || 'Düşük'} / ${c.vitals?.Nabız || 'yüksek'}`, 'Stabil olmalı', 'Şok açısından kritik'],
        ['Peritoneal irritasyon', 'Alt batında defans ve adneksiyal hassasiyet', 'Olmamalı', 'Acil cerrahi uyarısı'],
        ['Vajinal kanama', 'Az miktarda koyu lekelenme', 'Yok veya minimal', 'Klinikle birlikte yorumlanır'],
      ],
      'Hemodinamik bozulma ve peritoneal bulgu varsa gebelik lokalizasyonu değerlendirmesi resüsitasyon ve cerrahi hazırlıkla eş zamanlı yürütülür.',
      'Maternal güvenlik', 5, 10
    ));
  }

  if (PREECLAMPSIA_IDS.has(c.id)) {
    addAtStart(c, inv(
      'Maternal ağır özellik klinik değerlendirmesi',
      'clinicalAssessment',
      'clinical',
      [
        ['Kan basıncı', c.vitals?.TA || '≥160/110 mmHg eşiğine yakın/yüksek', '<140/90 mmHg', 'Ağır özellik açısından kritik'],
        ['Nörolojik semptom', 'Şiddetli baş ağrısı ve/veya görme bulanıklığı', 'Yok', 'Ağır özellik göstergesi'],
        ['Refleks / sağ üst kadran', 'Canlı refleks veya sağ üst kadran hassasiyeti', 'Yok', 'Organ etkilenimi açısından uyarıcı'],
      ],
      'Ağır hipertansiyon, nörolojik yakınma ve sağ üst kadran/refleks bulguları preeklampside maternal güvenlik önceliğini belirler.',
      'Ağır özellik göstergesi', 5, 10
    ));
    addAtEnd(c, inv(
      'Tedavi güvenliği klinik izlemi',
      'clinicalAssessment',
      'clinical',
      [
        ['Solunum sayısı', '≥12/dk izleniyor', '≥12/dk', 'Güvenli izlem'],
        ['Derin tendon refleksleri', 'Canlı; tedavi sırasında seri izlem gerekir', 'Korunmalı', 'Toksisite izlemi'],
        ['İdrar çıkışı', 'Saatlik izlem planlandı', '≥25-30 mL/saat', 'Tedavi güvenliği'],
      ],
      'Antikonvülzan ve antihipertansif tedavi başlatılırken solunum, refleks ve idrar çıkışı izlenir; bu izlem tedaviyi geciktirmek için kullanılmaz.',
      'Tedaviyi geciktirmez', 2, 55, 'useful'
    ));
  }

  if (ECLAMPSIA_IDS.has(c.id)) {
    addAtStart(c, inv(
      'Acil nöbet sonrası maternal stabilizasyon değerlendirmesi',
      'clinicalAssessment',
      'clinical',
      [
        ['Bilinç durumu', 'Postiktal uykuya eğilim', 'Uyanık ve oryante', 'Nöbet güvenliği'],
        ['Kan basıncı', c.vitals?.TA || 'Ağır hipertansiyon', '<140/90 mmHg', 'Acil kontrol gerekir'],
        ['Hava yolu / solunum', `${c.vitals?.SpO2 || 'Oksijenlenme izleniyor'}; solunum sayısı ${c.vitals?.Solunum || 'izleniyor'}`, 'Stabil', 'Maternal stabilizasyon'],
      ],
      'Eklamptik nöbet sonrası hava yolu, solunum, bilinç ve kan basıncı aynı anda değerlendirilir; antikonvülzan tedavi laboratuvar sonucu beklenerek ertelenmez.',
      'Nöbet güvenliği', 5, 10
    ));
    addAtEnd(c, inv(
      'Tedavi güvenliği klinik izlemi',
      'clinicalAssessment',
      'clinical',
      [
        ['Solunum sayısı', '≥12/dk izleniyor', '≥12/dk', 'Güvenli izlem'],
        ['Derin tendon refleksleri', 'Tedavi sırasında seri izlem planlandı', 'Korunmalı', 'Toksisite izlemi'],
        ['İdrar çıkışı', 'Saatlik izlem planlandı', '≥25-30 mL/saat', 'Tedavi güvenliği'],
      ],
      'Antikonvülzan tedavi sırasında solunum, refleks ve idrar çıkışı izlenir; bu izlem nöbet kontrolünü geciktirmez.',
      'Tedaviyi geciktirmez', 2, 55, 'useful'
    ));
  }

  if (ABRUPTION_IDS.has(c.id)) {
    addAtStart(c, inv(
      'Maternal kanama ve uterus tonusu değerlendirmesi',
      'clinicalAssessment',
      'clinical',
      [
        ['Kanama paterni', 'Koyu vajinal kanama ve sürekli karın ağrısı', 'Ağrısız/parlak kanama olmamalı', 'Obstetrik acil'],
        ['Uterus tonusu', 'Sert/hipertonik ve hassas', 'Yumuşak ve hassasiyetsiz', 'Kritik klinik ipucu'],
        ['Hemodinami', `${c.vitals?.TA || 'izleniyor'}; nabız ${c.vitals?.Nabız || 'izleniyor'}`, 'Stabil olmalı', 'Maternal güvenlik'],
      ],
      'Ağrılı koyu kanama, hipertonik uterus ve maternal hemodinami birlikte değerlendirilir; koagülasyon hazırlığı eş zamanlı ilerler.',
      'Obstetrik acil test', 5, 10
    ));
    addAtEnd(c, inv(
      'Destekleyici obstetrik ultrasonografi',
      'imaging',
      'ultrasound',
      [
        ['Plasenta / retroplasental alan', 'Heterojen alan izlenebilir; yokluğu dışlatıcı değildir', 'Belirgin hematom olmamalı', 'Sınırlı dışlama gücü'],
        ['Fetal kalp hızı', 'Fetal izlemle birlikte değerlendirilir', '110-160/dk', 'Fetal iyilik hali'],
      ],
      'Ultrason plasenta ve fetal değerlendirmeye yardımcıdır; normal veya belirsiz görüntü ablasyo plasentayı klinik olarak dışlamaz.',
      'Bu olguda sınırlı katkı', 1, 45, 'situational'
    ));
  }

  if (PREVIA_IDS.has(c.id)) {
    addAtStart(c, inv(
      'Maternal stabilite ve kanama miktarı değerlendirmesi',
      'clinicalAssessment',
      'clinical',
      [
        ['Kanama paterni', 'Ağrısız parlak kırmızı vajinal kanama', 'Kanama olmamalı', 'Kanama güvenliği'],
        ['Uterus', 'Yumuşak ve hassasiyetsiz', 'Hipertonisite olmamalı', 'Previa-ablasyo ayrımı'],
        ['Dijital vajinal muayene', 'Yapılmadı', 'Plasenta lokalizasyonu öncesi yapılmaz', 'Güvenlik kuralı'],
      ],
      'Üçüncü trimester ağrısız kanamada önce maternal stabilite ve kanama paterni değerlendirilir; plasenta lokalizasyonu gösterilmeden dijital muayene yapılmaz.',
      'Maternal güvenlik', 5, 10
    ));
    addAtEnd(c, inv(
      'Fetal iyilik hali ve uterin aktivite izlemi',
      'functional',
      'functionalTest',
      [
        ['Fetal kalp hızı', '145/dk', '110-160/dk', 'Rahatlatıcı'],
        ['Uterin aktivite', 'Düzenli kontraksiyon yok', 'Aktif kontraksiyon olmamalı', 'Doğum planını etkiler'],
      ],
      'Fetal kalp hızı ve uterin aktivite kanama yönetiminde doğum zamanlamasını etkileyebilir; maternal kanama güvenliği önceliklidir.',
      'Fetal iyilik hali', 3, 20
    ));
  }

  if (TORSION_IDS.has(c.id)) {
    addAtStart(c, inv(
      'Acil jinekolojik ağrı ve hemodinami değerlendirmesi',
      'clinicalAssessment',
      'clinical',
      [
        ['Ağrı başlangıcı', 'Ani başlayan tek taraflı şiddetli pelvik ağrı', 'Kronik/progresif olmamalı', 'Acil cerrahi uyarısı'],
        ['Bulantı-kusma', 'Eşlik ediyor', 'Olmayabilir', 'Torsiyon lehine destek'],
        ['Hemodinami', `${c.vitals?.TA || 'stabil'}; nabız ${c.vitals?.Nabız || 'izleniyor'}`, 'Stabil olmalı', 'Girişim öncesi güvenlik'],
      ],
      'Ani tek taraflı ağrı ve kusma adneksiyal torsiyon şüphesini yükseltir; görüntüleme yardımcıdır fakat cerrahi değerlendirme geciktirilmez.',
      'Girişim öncesi güvenlik', 4, 10
    ));
  }

  if (PID_IDS.has(c.id)) {
    addAtStart(c, inv(
      'Pelvik muayene ve vital stabilite değerlendirmesi',
      'clinicalAssessment',
      'clinical',
      [
        ['Servikal hareket hassasiyeti', 'Belirgin', 'Olmamalı', 'PID lehine klinik eşik'],
        ['Ateş / vital bulgular', `${c.vitals?.Ateş || 'ateş izleniyor'}; nabız ${c.vitals?.Nabız || 'izleniyor'}`, 'Stabil', 'Sepsis dışlama'],
        ['Akıntı', 'Mukopürülan akıntı olabilir', 'Yok', 'Enfeksiyon odağı'],
      ],
      'PID klinik tanıdır; gebelik dışlama ve örnekleme yapılırken ampirik antibiyotik tedavisi gereksiz geciktirilmez.',
      'Maternal güvenlik', 4, 10
    ));
  }

  if (VASA_IDS.has(c.id)) {
    addAtStart(c, inv(
      'Maternal kanama ve fetal bradikardi eş zamanlı değerlendirmesi',
      'clinicalAssessment',
      'clinical',
      [
        ['Maternal hemodinami', 'Stabil', 'Stabil olmalı', 'Maternal güvenlik'],
        ['Kanama paterni', 'Membran rüptürü sonrası vajinal kanama', 'Olmamalı', 'Obstetrik acil'],
        ['Fetal kalp hızı', 'Ani düşüş/bradikardi', '110-160/dk', 'Fetal iyilik hali'],
      ],
      'Maternal stabilite korunurken fetal bradikardi acil fetal kaynaklı kanama olasılığını düşündürür; doğum planı geciktirilmemelidir.',
      'Fetal iyilik hali', 5, 10
    ));
  }

  if (PMB_IDS.has(c.id)) {
    addAtStart(c, inv(
      'Klinik risk ve servikal odak dışlama değerlendirmesi',
      'clinicalAssessment',
      'clinical',
      [
        ['Kanama tipi', 'Menopozdan yıllar sonra tekrarlayan lekelenme', 'Kanama olmamalı', 'Uyarıcı bulgu'],
        ['Risk faktörleri', 'Obezite ve hipertansiyon', 'Risk faktörü olmaması beklenir', 'Endometrial risk artışı'],
        ['Servikal görünüm', 'Belirgin servikal polip/kitle yok', 'Lezyon olmamalı', 'Odak ayrımı'],
      ],
      'Postmenopozal kanamada klinik risk faktörleri ve servikal odak dışlanması ilk basamak değerlendirmeyi yönlendirir.',
      'İlk basamak veri', 2, 10, 'useful'
    ));
  }
}

function sortInvestigations(c) {
  const before = (c.investigations || []).map((x) => x.title || x.label).join('|');
  const catWeight = {
    clinicalAssessment: 10,
    functional: 20,
    urogenital: 25,
    laboratory: 30,
    urine: 34,
    imaging: 38,
    microbiology: 40,
    bloodBank: 42,
    pathology: 50,
    invasive: 50,
  };
  c.investigations = (c.investigations || []).sort((a, b) => {
    const af = Number(a.clinicalFlowOrder ?? catWeight[a.testTypeCategory || a.category] ?? 99);
    const bf = Number(b.clinicalFlowOrder ?? catWeight[b.testTypeCategory || b.category] ?? 99);
    if (af !== bf) return af - bf;
    return (catWeight[a.testTypeCategory || a.category] ?? 99) - (catWeight[b.testTypeCategory || b.category] ?? 99);
  });
  const after = (c.investigations || []).map((x) => x.title || x.label).join('|');
  if (before !== after) {
    changedCaseIds.add(c.id);
    ordered.push({ caseId: c.id, before, after });
  }
}

const targetCases = cases.filter((c) => c.branchId === 'obstetrics-gynecology');

for (const c of targetCases) {
  specificAdditions(c);
  (c.investigations || []).forEach((item, index) => setInvestigationMeta(item, c, index));
  sortInvestigations(c);
  c.useSyntheticInvestigationBank = false;
  c.preserveInvestigationOrder = true;
  c.obgynInvestigationLayerEnhanced = true;
  c.obgynInvestigationLayerVersion = 'v397-obgyn-investigation-layer';
}

// Replace only the rawCases declaration while keeping imports and footer logic intact.
const source = fs.readFileSync(DATA_FILE, 'utf8');
const startMarker = 'export const rawCases = ';
const start = source.indexOf(startMarker);
const endMarker = '\n];\n\nexport const cases =';
const end = source.indexOf(endMarker, start);
if (start === -1 || end === -1) throw new Error('rawCases boundaries could not be located.');
const prefix = source.slice(0, start + startMarker.length);
const suffix = source.slice(end + '\n];'.length); // drop original closing array; generated JSON supplies it
const nextSource = `${prefix}${JSON.stringify(cases, null, 2)};${suffix}`;
fs.writeFileSync(DATA_FILE, nextSource);

const obgynAfter = cases.filter((c) => c.branchId === 'obstetrics-gynecology');
const visibleClinicalMaterial = [];
for (const c of obgynAfter) {
  for (const item of c.investigations || []) {
    const titleText = `${item.title || ''} ${item.label || ''} ${item.orderLabel || ''}`;
    if (/klinik materyal/i.test(titleText)) visibleClinicalMaterial.push({ caseId: c.id, title: item.title, label: item.label });
  }
}

const missingLabels = [];
for (const c of obgynAfter) {
  for (const item of c.investigations || []) {
    if (!item.label || !item.type || !item.testValueLabel || !Number.isFinite(Number(item.scoreImpact))) {
      missingLabels.push({ caseId: c.id, title: item.title, label: item.label, type: item.type, testValueLabel: item.testValueLabel, scoreImpact: item.scoreImpact });
    }
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  scope: 'Only branchId === obstetrics-gynecology',
  targetCaseCount: targetCases.length,
  changedCaseCount: changedCaseIds.size,
  changedCaseIds: [...changedCaseIds],
  addedInvestigationCount: added.length,
  addedInvestigations: added,
  renamedTitleCount: renamed.length,
  renamedTitles: renamed,
  taggedInvestigationCount: tagged.length,
  orderedCaseCount: ordered.length,
  visibleClinicalMaterialRemaining: visibleClinicalMaterial,
  missingCriticalInvestigationMetadata: missingLabels,
  qualityGate: {
    clinicalMaterialVisibleTitlesCleared: visibleClinicalMaterial.length === 0,
    labelsTypesTagsAndScoresPresent: missingLabels.length === 0,
    nonObgynBranchContentIntendedToRemainUnchanged: true,
    syntheticInvestigationBankDisabledForObgyn: obgynAfter.every((c) => c.useSyntheticInvestigationBank === false),
    obgynPreserveInvestigationOrderEnabled: obgynAfter.every((c) => c.preserveInvestigationOrder === true),
  },
};
fs.writeFileSync(path.join(REPORT_DIR, 'KlinikIQ_OBGYN_INVESTIGATION_LAYER_ENHANCEMENT_REPORT.json'), JSON.stringify(report, null, 2));

const technical = [
  'KlinikIQ Kadın Hastalıkları ve Doğum tetkik/objektif veri katmanı güçlendirme raporu',
  `Kapsam: ${targetCases.length} Kadın Hastalıkları ve Doğum vakası (branchId=obstetrics-gynecology).`,
  `Değiştirilen vaka sayısı: ${changedCaseIds.size}.`,
  `Eklenen yeni tetkik/objektif veri sayısı: ${added.length}.`,
  `Yeniden adlandırılan tetkik başlığı sayısı: ${renamed.length}.`,
  `Etiket/puan/akış metadatası eklenen veya doğrulanan tetkik sayısı: ${tagged.length}.`,
  `Kullanıcıya görünen tetkik title/label alanlarında kalan “Klinik materyal”: ${visibleClinicalMaterial.length}.`,
  `Eksik label/type/tag/score metadatası: ${missingLabels.length}.`,
  'Not: Doğru cevap, seçenek sırası ve optionFeedback alanları değiştirilmedi; düzenleme tetkik katmanı, tetkik adı/etiketi/puanı/akışı ve kısa tetkik geri bildirimiyle sınırlandı.',
].join('\n');
fs.writeFileSync(path.join(REPORT_DIR, 'KlinikIQ_OBGYN_INVESTIGATION_LAYER_TECHNICAL_REPORT.txt'), technical);

console.log(JSON.stringify(report, null, 2));
