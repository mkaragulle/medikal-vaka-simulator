import { normalizeQuestionText, stableHash } from './aiQuestionHistory.js';

const CLINICAL_TITLE_STOP = /\b(ai|spot|soru|vaka|olgu|analizi|çeldirici|ayrımı|klinik düşünme|karar sorusu)\b/giu;

function pickByHash(items = [], key = '') {
  if (!items.length) return '';
  const hash = parseInt(stableHash(key).replace(/^q/, ''), 36);
  return items[Math.abs(hash) % items.length];
}

function normalizeBranch(value = '') {
  return normalizeQuestionText(value)
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u');
}

function rule(
  id,
  names,
  {
    demographics,
    settings,
    presentations,
    titles,
    riskContexts,
    examDefaults,
    vitals,
    forbiddenDemographic = [],
    requiredDemographic = [],
    branchKeywords = [],
    category = 'clinical',
  },
) {
  return {
    id,
    names,
    normalizedNames: names.map(normalizeBranch),
    demographics,
    settings,
    presentations,
    titles,
    riskContexts,
    examDefaults,
    vitals,
    forbiddenDemographic,
    requiredDemographic,
    branchKeywords,
    category,
  };
}

export const AI_BRANCH_RULES = [
  rule('pediatrics', ['Çocuk Sağlığı ve Hastalıkları', 'Pediatri', 'Çocuk'], {
    category: 'clinical',
    demographics: ['10 günlük yenidoğan', '3 aylık kız bebek', '8 aylık erkek bebek', '18 aylık çocuk', '4 yaş kız çocuk', '7 yaş erkek çocuk', '12 yaş çocuk', '15 yaş adölesan'],
    settings: ['Çocuk acil', 'Pediatri polikliniği', 'Yenidoğan servisi', 'Çocuk enfeksiyon değerlendirmesi'],
    presentations: ['Ateş ve döküntü', 'Kusma ve dehidratasyon', 'Hışıltılı solunum ve öksürük', 'Sarılık ve emme azalması', 'Febril nöbet', 'Büyüme-gelişme gecikmesi'],
    titles: ['Yüksek ateş ve peteşi', 'Süt çocuğunda hışıltılı solunum', 'Yenidoğanda sarılık tablosu', 'İshal sonrası nöbet', 'Kusma ve dehidratasyon', 'Çocukta ense sertliği', 'Döküntü ve ateş', 'Adölesanda kilo kaybı'],
    riskContexts: ['Ateş, beslenme ve bilinç değişikliğinin birlikte izlenmesi', 'Süt çocuklarında hızlı sıvı kaybı riski', 'Eksik aşılanma veya yakın temas öyküsü'],
    examDefaults: ['Genel durum yaşına göre değerlendirilir.', 'Kapiller dolum, hidrasyon ve solunum eforu pediatrik bağlamda yorumlanır.', 'Bilinç, beslenme ve irritabilite değişikliği kırmızı bayrak olarak izlenir.'],
    vitals: { TA: '90/55 mmHg', Nabız: '128/dk', Solunum: '30/dk', SpO2: '%97', Ateş: '38.4 °C' },
    forbiddenDemographic: [/\b([2-9][0-9])\s*yaş\b/i, /erişkin/i, /yaşlı/i, /postmenopozal/i],
    requiredDemographic: [/yenidoğan|bebek|çocuk|adölesan|ergen/i],
    branchKeywords: ['yenidoğan', 'bebek', 'çocuk', 'adölesan', 'pediatrik', 'aşı', 'büyüme', 'gelişme'],
  }),
  rule('obstetrics-gynecology', ['Kadın Hastalıkları ve Doğum', 'Kadın Doğum', 'Jinekoloji', 'Obstetri'], {
    category: 'clinical',
    demographics: ['22 yaş kadın', '28 yaş gebe kadın', '31 yaş kadın', '35 yaş lohusa', '39 yaş kadın', '17 yaş adölesan kız'],
    settings: ['Jinekoloji acil', 'Kadın doğum polikliniği', 'Doğumhane triyajı', 'Antenatal değerlendirme'],
    presentations: ['Alt karın ağrısı ve vajinal kanama', 'Gebelikte hipertansiyon', 'Pelvik ağrı', 'Amenore ve kanama', 'Lohusalıkta ateş', 'Adet düzensizliği'],
    titles: ['Erken gebelikte ağrı ve kanama', 'Gebelikte hipertansif tablo', 'Pelvik ağrı ve ateş', 'Amenore sonrası kanama', 'Lohusalıkta ateş', 'Adneksiyal ağrı tablosu'],
    riskContexts: ['Üreme çağı ve gebelik olasılığı', 'Vajinal kanama veya pelvik ağrının aciliyet oluşturması', 'Kanama ve hemodinamik bozulma riski'],
    examDefaults: ['Hemodinamik stabilite ve batın hassasiyeti birlikte değerlendirilir.', 'Pelvik muayene bulguları gebelik ve enfeksiyon bağlamında yorumlanır.', 'Vajinal kanama, servikal bulgu ve adneksiyal hassasiyet ayırıcı tanıda kullanılır.'],
    vitals: { TA: '108/68 mmHg', Nabız: '96/dk', Solunum: '18/dk', SpO2: '%99', Ateş: '36.8 °C' },
    forbiddenDemographic: [/\berkek\b/i, /prostat/i],
    requiredDemographic: [/kadın|gebe|lohusa|adölesan kız/i],
    branchKeywords: ['kadın', 'doğum', 'obstetrik', 'gebelik', 'jinekolojik', 'vajinal', 'pelvik', 'adneksiyal', 'servikal', 'lohusa', 'uterus'],
  }),
  rule('internal-medicine', ['İç Hastalıkları', 'Dahiliye'], {
    category: 'clinical',
    demographics: ['23 yaş kadın', '34 yaş kadın', '46 yaş erkek', '55 yaş kadın', '63 yaş erkek', '72 yaş kadın'],
    settings: ['Dahiliye polikliniği', 'Acil servis', 'Endokrinoloji değerlendirmesi', 'Nefroloji konsültasyonu', 'Hematoloji polikliniği'],
    presentations: ['Halsizlik ve elektrolit bozukluğu', 'Nefes darlığı ve göğüs ağrısı', 'Sarılık ve koyu idrar', 'Anemi bulguları', 'Poliüri ve kilo kaybı', 'Ödem ve proteinüri'],
    titles: ['Makrositik anemi ile başvuru', 'Sarılık ve koyu idrar', 'Akut elektrolit bozukluğu', 'Dispne ve plöritik ağrı', 'Poliüri ve kilo kaybı', 'Ödem ve proteinüri'],
    riskContexts: ['Erişkin iç hastalıklarında sistemik komplikasyon riski', 'Metabolik, renal veya hematolojik bulguların birlikte değerlendirilmesi'],
    examDefaults: ['Genel durum ve volüm bulguları sistemik hastalık açısından değerlendirilir.', 'Kardiyopulmoner ve batın muayenesi ayırıcı tanıya göre yönlendirilir.', 'Klinik bulgular laboratuvar paterniyle birlikte yorumlanır.'],
    vitals: { TA: '118/74 mmHg', Nabız: '88/dk', Solunum: '18/dk', SpO2: '%98', Ateş: '37.1 °C' },
    forbiddenDemographic: [],
    requiredDemographic: [/yaş/i],
    branchKeywords: ['dahiliye', 'renal', 'endokrin', 'hematolojik', 'romatolojik', 'metabolik'],
  }),
  rule('general-surgery', ['Genel Cerrahi', 'Cerrahi'], {
    category: 'clinical',
    demographics: ['19 yaş erkek', '27 yaş kadın', '42 yaş erkek', '58 yaş kadın', '66 yaş erkek'],
    settings: ['Acil servis', 'Genel cerrahi acil', 'Postoperatif servis', 'Travma değerlendirmesi'],
    presentations: ['Akut karın ağrısı', 'Postoperatif ateş', 'Travma sonrası ağrı', 'Sağ üst kadran ağrısı', 'Ani başlayan dispne', 'Yara yerinde kızarıklık'],
    titles: ['Akut karın ağrısı', 'Ameliyat sonrası ateş', 'Travma sonrası batın ağrısı', 'Sağ üst kadran ağrısı', 'Postoperatif ani dispne', 'Yara yeri enfeksiyonu'],
    riskContexts: ['Cerrahi aciliyet ve komplikasyon riski', 'Travma veya postoperatif süreçte hemodinamik izlem gerekliliği'],
    examDefaults: ['Batın muayenesinde periton irritasyonu ve lokal hassasiyet araştırılır.', 'Hemodinamik stabilite cerrahi önceliği belirler.', 'Yara, ekstremite veya vasküler bulgular komplikasyon açısından değerlendirilir.'],
    vitals: { TA: '110/70 mmHg', Nabız: '104/dk', Solunum: '20/dk', SpO2: '%97', Ateş: '37.6 °C' },
    forbiddenDemographic: [],
    requiredDemographic: [/yaş/i],
    branchKeywords: ['cerrahi', 'travma', 'akut karın', 'postoperatif', 'periton', 'yara'],
  }),
  rule('medical-microbiology', ['Tıbbi Mikrobiyoloji', 'Mikrobiyoloji', 'Enfeksiyon'], {
    category: 'basic-science',
    demographics: ['24 yaş sağlık çalışanı', '32 yaş kadın', '45 yaş erkek', 'Hastane kaynaklı örnek', 'Bağışıklığı baskılanmış hasta'],
    settings: ['Mikrobiyoloji laboratuvarı', 'Enfeksiyon hastalıkları değerlendirmesi', 'Acil servis örnek yorumu'],
    presentations: ['Serolojik patern yorumu', 'Kültür ve direnç paterni', 'Temas sonrası tarama', 'Menenjit etkeni ayrımı', 'Viral hepatit paneli', 'Fırsatçı enfeksiyon paterni'],
    titles: ['Serolojik patern yorumu', 'Kültürde direnç paterni', 'Temas sonrası tarama', 'Menenjit etkeni ayrımı', 'Viral hepatit paneli', 'Fırsatçı enfeksiyon bulgusu'],
    riskContexts: ['Temas öyküsü veya örnek türünün yorumu değiştirmesi', 'Bağışıklık durumunun etken ayrımına etkisi'],
    examDefaults: ['Klinik bulgular örnek türü ve laboratuvar sonucu ile birlikte değerlendirilir.', 'Temas öyküsü, inkübasyon ve immün durum etken ayrımını etkiler.'],
    vitals: { TA: '116/72 mmHg', Nabız: '92/dk', Solunum: '18/dk', SpO2: '%98', Ateş: '38.1 °C' },
    branchKeywords: ['mikrobiyoloji', 'seroloji', 'kültür', 'etken', 'viral', 'bakteri', 'direnç'],
  }),
  rule('medical-pharmacology', ['Tıbbi Farmakoloji', 'Farmakoloji'], {
    category: 'basic-science',
    demographics: ['26 yaş kadın', '38 yaş erkek', '54 yaş kadın', 'İlaç kullanan hasta', 'Acil toksikoloji olgusu'],
    settings: ['Farmakoloji spot değerlendirmesi', 'Acil toksikoloji değerlendirmesi', 'Poliklinik ilaç yan etkisi yorumu'],
    presentations: ['İlaç yan etkisi düşündüren tablo', 'Antidot seçimi', 'Reseptör mekanizması', 'İlaç etkileşimi', 'Toksisite paterni'],
    titles: ['İlaç sonrası döküntü', 'Antidot seçimi gerektiren tablo', 'Toksisite paterni', 'Reseptör mekanizması', 'İlaç etkileşimi bulgusu', 'Yan etki düşündüren tablo'],
    riskContexts: ['İlaç veya toksin maruziyeti öyküsü', 'Doz ve zaman ilişkisinin klinik tabloyu belirlemesi'],
    examDefaults: ['Bulgular ilaç maruziyeti, doz ve zaman ilişkisiyle değerlendirilir.', 'Muayene, toksidrom veya yan etki paternini destekleyecek şekilde yorumlanır.'],
    vitals: { TA: '112/70 mmHg', Nabız: '96/dk', Solunum: '18/dk', SpO2: '%98', Ateş: '36.9 °C' },
    branchKeywords: ['ilaç', 'antidot', 'reseptör', 'toksisite', 'yan etki', 'farmakoloji'],
  }),
  rule('medical-biochemistry', ['Tıbbi Biyokimya', 'Biyokimya'], {
    category: 'basic-science',
    demographics: ['Yenidoğan taramasında saptanan bebek', '18 yaş erkek', '25 yaş kadın', 'Metabolik tarama yapılan hasta', 'Aile öyküsü olan çocuk'],
    settings: ['Biyokimya laboratuvarı', 'Metabolik hastalık değerlendirmesi', 'TUS temel bilim pratiği'],
    presentations: ['Metabolik asidoz paterni', 'Enzim eksikliği yorumu', 'Aminoasit yüksekliği', 'Hipoglisemi ve ketoz', 'Üre döngüsü paterni'],
    titles: ['Metabolik asidoz paterni', 'Enzim eksikliği yorumu', 'Aminoasit yüksekliği', 'Hipoglisemi ve ketoz', 'Üre döngüsü bozukluğu', 'Yenidoğan tarama paterni'],
    riskContexts: ['Metabolik veya genetik zeminle ilişkili klinik bağlam', 'Laboratuvar paterninin biyokimyasal yolakla eşleştirilmesi'],
    examDefaults: ['Klinik ipuçları laboratuvar paterni ve metabolik yolakla birlikte yorumlanır.', 'Muayene bulguları enzim eksikliğini doğrudan söylemeden metabolik tabloyu destekler.'],
    vitals: { TA: '100/64 mmHg', Nabız: '108/dk', Solunum: '24/dk', SpO2: '%98', Ateş: '36.7 °C' },
    branchKeywords: ['biyokimya', 'enzim', 'metabolik', 'aminoasit', 'asidoz', 'yolak'],
  }),
  rule('medical-pathology', ['Tıbbi Patoloji', 'Patoloji'], {
    category: 'basic-science',
    demographics: ['Biyopsi materyali değerlendirilen hasta', '45 yaş kadın', '62 yaş erkek', 'Patoloji raporu tartışılan olgu'],
    settings: ['Patoloji laboratuvarı', 'Tümör konseyi', 'Biyopsi sonucu değerlendirmesi'],
    presentations: ['Histolojik patern yorumu', 'İmmünohistokimyasal marker ayrımı', 'Nekroz tipi yorumu', 'Tümör marker paterni'],
    titles: ['Histolojik patern yorumu', 'Marker profili ayrımı', 'Nekroz tipi yorumu', 'Biyopsi bulgusu', 'Tümör marker paterni'],
    riskContexts: ['Doku paterni ve marker bilgisinin tanısal bağlamı', 'Patolojik bulgunun klinik karar üzerindeki etkisi'],
    examDefaults: ['Makroskopik ve mikroskopik patern birlikte değerlendirilir.', 'İmmünohistokimyasal bulgular ayırıcı tanıda kullanılır.'],
    vitals: { TA: '120/76 mmHg', Nabız: '82/dk', Solunum: '16/dk', SpO2: '%98', Ateş: '36.8 °C' },
    branchKeywords: ['patoloji', 'biyopsi', 'histolojik', 'marker', 'nekroz', 'tümör'],
  }),
  rule('physiology', ['Fizyoloji'], {
    category: 'basic-science',
    demographics: ['Fizyoloji pratiğinde değerlendirilen olgu', '22 yaş sağlıklı gönüllü', 'Egzersiz sonrası değerlendirilen hasta'],
    settings: ['Fizyoloji laboratuvarı', 'TUS temel bilim pratiği'],
    presentations: ['Refleks arkı yorumu', 'Solunum fizyolojisi paterni', 'Böbrek fizyolojisi dengesi', 'Kardiyak debi değişikliği'],
    titles: ['Refleks arkı yorumu', 'Solunum paterni', 'Böbrek dengesi', 'Kardiyak debi değişikliği', 'Asit-baz kompansasyonu'],
    riskContexts: ['Fizyolojik mekanizmanın klinik bağlama uygulanması'],
    examDefaults: ['Bulgular mekanizma ve kompansasyon ekseninde yorumlanır.'],
    vitals: { TA: '118/72 mmHg', Nabız: '86/dk', Solunum: '18/dk', SpO2: '%98', Ateş: '36.7 °C' },
    branchKeywords: ['fizyoloji', 'refleks', 'kompansasyon', 'debi', 'filtrasyon', 'ventilasyon'],
  }),
  rule('anatomy', ['Anatomi'], {
    category: 'basic-science',
    demographics: ['Travma sonrası değerlendirilen hasta', 'Anatomi pratiğinde tartışılan olgu', 'Cerrahi sırasında anatomik yapı sorulan olgu'],
    settings: ['Anatomi spot pratiği', 'Travma değerlendirmesi', 'Cerrahi anatomi tartışması'],
    presentations: ['Sinir lezyonu paterni', 'Damar yaralanması', 'Kas fonksiyon kaybı', 'Dermatom dağılımı'],
    titles: ['Sinir lezyonu paterni', 'Damar yaralanması', 'Dermatom dağılımı', 'Kas fonksiyon kaybı', 'Cerrahi anatomi ipucu'],
    riskContexts: ['Anatomik lezyon lokalizasyonunun klinik bağlamı'],
    examDefaults: ['Motor, duyu ve refleks bulguları anatomik lokalizasyonla birlikte yorumlanır.'],
    vitals: { TA: '118/74 mmHg', Nabız: '84/dk', Solunum: '16/dk', SpO2: '%99', Ateş: '36.6 °C' },
    branchKeywords: ['anatomi', 'sinir', 'arter', 'ven', 'kas', 'dermatom'],
  }),
  rule('histology-embryology', ['Histoloji ve Embriyoloji', 'Histoloji', 'Embriyoloji'], {
    category: 'basic-science',
    demographics: ['Embriyoloji spot pratiğinde değerlendirilen olgu', 'Histoloji kesiti tartışılan hasta', 'Konjenital anomali nedeniyle değerlendirilen bebek'],
    settings: ['Histoloji laboratuvarı', 'Embriyoloji TUS pratiği'],
    presentations: ['Embriyolojik köken yorumu', 'Doku tipi ayrımı', 'Konjenital anomali paterni', 'Epitel tipi sorusu'],
    titles: ['Embriyolojik köken yorumu', 'Epitel tipi ayrımı', 'Konjenital anomali paterni', 'Doku kesiti bulgusu', 'Germ yaprağı ilişkisi'],
    riskContexts: ['Gelişimsel veya histolojik paternin temel bilim bağlamı'],
    examDefaults: ['Mikroskobik veya embriyolojik ipuçları ilgili yapı ve köken bilgisiyle ilişkilendirilir.'],
    vitals: { TA: '110/70 mmHg', Nabız: '90/dk', Solunum: '18/dk', SpO2: '%99', Ateş: '36.7 °C' },
    branchKeywords: ['histoloji', 'embriyoloji', 'epitel', 'germ', 'doku', 'konjenital'],
  }),
  rule('minor-rotations', ['Küçük Stajlar', 'Nöroloji', 'Psikiyatri', 'Dermatoloji', 'Göz', 'KBB', 'FTR', 'Üroloji', 'Acil'], {
    category: 'clinical',
    demographics: ['18 yaş kadın', '24 yaş erkek', '37 yaş kadın', '49 yaş erkek', '67 yaş kadın'],
    settings: ['Acil servis', 'Konsültasyon değerlendirmesi', 'Poliklinik başvurusu', 'Küçük staj spot pratiği'],
    presentations: ['Ani nörolojik bulgu', 'Deri döküntüsü', 'Görme azalması', 'Kulak ağrısı', 'Psikiyatrik acil değerlendirme', 'Üriner yakınma'],
    titles: ['Ani nörolojik bulgu', 'Deri döküntüsü', 'Görme azalması', 'Kulak ağrısı', 'Psikiyatrik acil', 'Üriner yakınma'],
    riskContexts: ['Alt disipline özgü aciliyet ve ayırıcı tanı bağlamı'],
    examDefaults: ['Muayene seçilen alt disiplinin karar verdirici bulgularına odaklanır.', 'Kırmızı bayrak bulguları branş dışına taşmadan yorumlanır.'],
    vitals: { TA: '122/78 mmHg', Nabız: '88/dk', Solunum: '18/dk', SpO2: '%98', Ateş: '37.0 °C' },
    branchKeywords: ['nöroloji', 'dermatoloji', 'göz', 'kbb', 'psikiyatri', 'üroloji', 'acil'],
  }),
  rule('tus-spot-olgular', ['TUS Spot Olgular', 'TUS Spot', 'Rastgele'], {
    category: 'mixed',
    demographics: ['23 yaş kadın', '35 yaş erkek', '46 yaş kadın', '58 yaş erkek', '8 aylık bebek', '29 yaş gebe kadın'],
    settings: ['TUS spot pratiği', 'Acil karar basamağı', 'Poliklinik değerlendirmesi'],
    presentations: ['Kısa klinik patern', 'Tetkik yorumu', 'İlk yaklaşım kararı', 'Mekanizma bilgisi'],
    titles: ['Kısa klinik patern', 'Tetkik yorumu', 'İlk yaklaşım kararı', 'Mekanizma bilgisi', 'Ayırıcı tanı ipucu'],
    riskContexts: ['Somut klinik bağlam ve karar riski'],
    examDefaults: ['Bulgular temel mekanizma veya laboratuvar ilişkisini gösterecek şekilde kısa tutulur.'],
    vitals: { TA: '118/74 mmHg', Nabız: '88/dk', Solunum: '18/dk', SpO2: '%98', Ateş: '37.1 °C' },
    branchKeywords: ['tus', 'spot', 'klinik', 'mekanizma'],
  }),
];

export function getBranchRule(branchValue = '') {
  const normalized = normalizeBranch(branchValue || '');
  if (!normalized || normalized === 'random' || normalized === 'rastgele') return null;
  return AI_BRANCH_RULES.find((item) => item.normalizedNames.some((name) => normalized.includes(name) || name.includes(normalized))) || null;
}

export function getBranchRuleForSeed(seed = {}, fallbackBranch = '') {
  return getBranchRule(seed.relatedBranch || seed.branchName || seed.originalBranchId || fallbackBranch) || getBranchRule(fallbackBranch) || getBranchRule('TUS Spot Olgular');
}

export function branchFilterMatchesSeed(seed = {}, branchFilter = 'random') {
  const targetRule = getBranchRule(branchFilter);
  if (!targetRule) return true;
  const seedText = normalizeBranch(`${seed.relatedBranch || ''} ${seed.branchName || ''} ${seed.spotCategory || ''} ${seed.originalBranchId || ''}`);
  return targetRule.normalizedNames.some((name) => seedText.includes(name) || name.includes(seedText)) || seedText.includes(normalizeBranch(targetRule.id));
}

export function getBranchControlledProfile(seed = {}, attempt = 0, context = {}, branchFilter = '') {
  const rule = getBranchRuleForSeed(seed, branchFilter);
  const key = `${seed.seedId || seed.title}|${attempt}|${context.recentSignatures?.length || 0}|${Date.now()}|${Math.random()}`;
  const candidateDemographic = String(seed.demographics || '').trim();
  const demographic = isDemographicAllowedForBranch(candidateDemographic, rule).ok
    ? candidateDemographic
    : pickByHash(rule.demographics, `${key}|demographic`);
  const setting = seed.setting || pickByHash(rule.settings, `${key}|setting`);
  const sourcePresentation = seed.chiefComplaint || (seed.source === 'embedded-case-concept-only' ? seed.title : '');
  const presentation = sourcePresentation || pickByHash(rule.presentations, `${key}|presentation`);
  const titleCue = seed.source === 'embedded-case-concept-only' && seed.title ? seed.title : pickByHash(rule.titles, `${key}|title`);
  return { rule, demographic, setting, presentation, titleCue };
}

export function isDemographicAllowedForBranch(demographic = '', rule = null) {
  if (!rule || !demographic) return { ok: false, reason: 'missing-rule-or-demographic' };
  const text = String(demographic || '');
  const forbidden = (rule.forbiddenDemographic || []).find((pattern) => pattern.test(text));
  if (forbidden) return { ok: false, reason: `forbidden-demographic:${forbidden}` };
  if (rule.requiredDemographic?.length) {
    const requiredOk = rule.requiredDemographic.some((pattern) => pattern.test(text));
    if (!requiredOk) return { ok: false, reason: 'required-demographic-missing' };
  }
  return { ok: true };
}

export function sanitizeAIQuestionTitle(rawTitle = '', { seed = {}, profile = {}, rule = null, key = '' } = {}) {
  const candidates = [rawTitle, profile.presentation, profile.titleCue, seed.chiefComplaint, seed.learningTarget]
    .map((item) => String(item || '')
      .replace(/\bAI\s*(spot|soru)?\b/giu, ' ')
      .replace(/TUS\s*spot\s*/giu, ' ')
      .replace(/^[\s:：-]*(Tıbbi|İç|Çocuk|Kadın|Genel|Küçük|Anatomi|Fizyoloji|Histoloji|Biyokimya|Mikrobiyoloji|Patoloji|Farmakoloji)[^:：—-]{0,50}[:：—-]/giu, ' ')
      .replace(CLINICAL_TITLE_STOP, ' ')
      .replace(/\s+/g, ' ')
      .trim())
    .filter((item) => {
      if (item.length < 8 || item.length > 62) return false;
      const normalizedItem = normalizeBranch(item);
      const looksLikeBranchOnly = rule?.normalizedNames?.some((name) => normalizedItem === name || normalizedItem.replace(/\s+/g, '').includes(name.replace(/\s+/g, '')));
      const looksLikeLearningObjective = /yorumlanmasi|taninmasi|ayirt edilmesi|kullanilmasi|secilmesi|eslestirilmesi|ogrenme|mekanizmasi/i.test(normalizedItem);
      return !looksLikeBranchOnly && !looksLikeLearningObjective;
    });
  let title = candidates.length ? pickByHash(candidates, key || seed.seedId || rawTitle) : pickByHash(rule?.titles || ['Kısa klinik patern'], key || seed.seedId || rawTitle);
  title = title
    .replace(/[.?!;:,]+$/u, '')
    .split(/\s+/)
    .slice(0, 10)
    .join(' ')
    .trim();
  if (title.split(/\s+/).length < 3) {
    const fallback = profile.titleCue || profile.presentation || pickByHash(rule?.titles || [], key || title);
    title = String(fallback || title).replace(/[.?!;:,]+$/u, '').trim();
  }
  return title.charAt(0).toLocaleUpperCase('tr') + title.slice(1);
}

export function buildBranchAwareStem(seed = {}, profile = {}, angle = {}, correctText = '') {
  const rule = profile.rule || getBranchRuleForSeed(seed);
  const maskedTarget = maskAnswerLeak(seed.learningTarget || profile.presentation || 'karar verdirici patern', correctText);
  const presentation = profile.presentation || seed.chiefComplaint || pickByHash(rule.presentations, seed.seedId || maskedTarget);
  const opening = rule.category === 'basic-science'
    ? `${profile.setting} sırasında ${profile.demographic.toLocaleLowerCase('tr')} için ${presentation.toLocaleLowerCase('tr')} değerlendirilir.`
    : `${profile.demographic} ${profile.setting.toLocaleLowerCase('tr')} başvurusunda ${presentation.toLocaleLowerCase('tr')} nedeniyle değerlendirilir.`;
  const branchCue = rule.category === 'basic-science'
    ? `Verilen bulgular ${maskedTarget} bilgisinin klinik karşılığını sorgular.`
    : `Öykü ve objektif bulgular ${maskedTarget} açısından birlikte yorumlanır.`;
  const angleCue = angle?.stemCue ? `${angle.stemCue.charAt(0).toLocaleUpperCase('tr') + angle.stemCue.slice(1)}.` : '';
  return `${opening} ${branchCue} ${angleCue}`.replace(/\s+/g, ' ').trim();
}

export function maskAnswerLeak(text = '', correctText = '') {
  if (!text || !correctText) return text || '';
  const escaped = String(correctText).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return String(text).replace(new RegExp(escaped, 'gi'), 'karar verdirici patern');
}

export function buildBranchRiskContext(seed = {}, profile = {}) {
  const rule = profile.rule || getBranchRuleForSeed(seed);
  const base = rule.riskContexts?.length ? [...rule.riskContexts] : ['Somut klinik bağlam ve karar riski'];
  if (profile.demographic) base.push(`${profile.demographic} profiline uygun karar bağlamı`);
  return Array.from(new Set(base)).slice(0, 3);
}

export function buildBranchExamDefaults(seed = {}, profile = {}) {
  const rule = profile.rule || getBranchRuleForSeed(seed);
  return rule.examDefaults?.length ? rule.examDefaults : ['Bulgular klinik karar veya temel mekanizma ile birlikte değerlendirilir.'];
}

export function buildBranchVitals(seed = {}, profile = {}) {
  const rule = profile.rule || getBranchRuleForSeed(seed);
  return rule.vitals || { TA: '118/74 mmHg', Nabız: '88/dk', Solunum: '18/dk', SpO2: '%98', Ateş: '37.1 °C' };
}

export function validateBranchFit(question = {}, requestedBranch = '') {
  const errors = [];
  const branchLabel = requestedBranch || question.relatedBranch || question.branchName || '';
  const rule = getBranchRule(branchLabel) || getBranchRule(question.relatedBranch || question.branchName || '');
  if (!rule) return { ok: true, errors, rule: null };

  if (requestedBranch && !['random', 'rastgele'].includes(String(requestedBranch).toLocaleLowerCase('tr'))) {
    const questionRule = getBranchRule(question.relatedBranch || question.branchName || '');
    if (questionRule && questionRule.id !== rule.id) {
      errors.push(`üretilen soru farklı branşa ait: ${question.relatedBranch || question.branchName}`);
    }
  }

  const title = String(question.title || '');
  const titleNorm = normalizeQuestionText(title);
  if (/\bai\b|ai spot|ai soru|secenek ayrimi|seçenek ayrımı|vaka analizi|klinik dusunme|klinik düşünme/.test(titleNorm)) {
    errors.push('başlık yapay AI/şablon ifadesi içeriyor');
  }
  const titleWords = title.trim().split(/\s+/).filter(Boolean).length;
  if (titleWords < 3 || titleWords > 10) errors.push('başlık 3-10 kelime aralığında doğal klinik özet olmalı');

  const demographic = String(question.demographics || question.patientIntro?.profile || '');
  const demoCheck = isDemographicAllowedForBranch(demographic, rule);
  if (!demoCheck.ok) errors.push(`demografi branşla uyumsuz: ${demoCheck.reason}`);

  const joined = normalizeQuestionText([
    question.title,
    question.relatedBranch,
    question.branchName,
    question.stem,
    question.patientIntro?.presentation,
    question.patientIntro?.historySummary,
    question.learningTarget,
    question.clinicalFocus,
    question.question,
  ].filter(Boolean).join(' | '));

  if (rule.id === 'pediatrics' && /\b([2-9][0-9]) yas\b|eriskin|geriatrik|postmenopozal/.test(joined)) {
    errors.push('pediatri sorusunda erişkin/geriatrik bağlam var');
  }
  if (rule.id === 'obstetrics-gynecology' && /\berkek\b|prostat|testis/.test(joined)) {
    errors.push('kadın doğum sorusunda erkek/uygunsuz üreme bağlamı var');
  }
  const joinedBranch = normalizeBranch(joined);
  const keywordHit = rule.branchKeywords?.some((keyword) => joinedBranch.includes(normalizeBranch(keyword)));
  const branchNameHit = rule.normalizedNames?.some((name) => joinedBranch.includes(name));
  if (!keywordHit && !branchNameHit && rule.id !== 'tus-spot-olgular') {
    errors.push('soru metni seçilen branşa ait en az bir kontrollü bağlam ipucu taşımalı');
  }
  return { ok: errors.length === 0, errors, rule };
}

export function getAIQuestionBranchOptions() {
  return ['Rastgele', ...AI_BRANCH_RULES.filter((item) => item.id !== 'tus-spot-olgular').map((item) => item.names[0])];
}
