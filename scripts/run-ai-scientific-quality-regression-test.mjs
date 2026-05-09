import { scientificAccuracyGate, repairScientificAccuracy, highRiskClinicalRules } from '../src/utils/clinicalScientificAccuracyGate.js';

function q(overrides = {}) {
  const options = overrides.options || [
    { id: 'A', text: 'Birinci seçenek' },
    { id: 'B', text: 'İkinci seçenek' },
    { id: 'C', text: 'Üçüncü seçenek' },
    { id: 'D', text: 'Dördüncü seçenek' },
    { id: 'E', text: 'Beşinci seçenek' },
  ];
  const correct = options.find((option) => option.id === (overrides.correctAnswer || 'A'))?.text || options[0].text;
  return {
    id: overrides.id || 'ai-spot-regression',
    title: overrides.title || 'Regresyon testi',
    relatedBranch: overrides.relatedBranch || 'İç Hastalıkları',
    branchName: overrides.branchName || overrides.relatedBranch || 'İç Hastalıkları',
    spotCategory: overrides.spotCategory || 'AI Spot • Regresyon',
    learningTarget: overrides.learningTarget || 'Kritik klinik karar doğrulaması',
    clinicalFocus: overrides.clinicalFocus || 'Kritik klinik karar doğrulaması',
    demographics: overrides.demographics || '45 yaş erkek',
    setting: overrides.setting || 'Acil servis',
    chiefComplaint: overrides.chiefComplaint || 'Acil başvuru',
    stem: overrides.stem || 'Kısa klinik karar olgusu.',
    narrativeStem: overrides.stem || 'Kısa klinik karar olgusu.',
    question: overrides.question || 'Bu hasta için en doğru ilk yaklaşım hangisidir?',
    questionType: overrides.questionType || 'treatment',
    vitals: overrides.vitals || {},
    investigations: overrides.investigations || [],
    options,
    correctAnswer: overrides.correctAnswer || 'A',
    explanation: overrides.explanation || `${correct} olgudaki somut bulgularla en uyumlu yanıttır.`,
    evidenceChain: overrides.evidenceChain || ['Kritik bulgu 1.', 'Kritik bulgu 2.', 'Kritik karar basamağı.'],
    examPearls: overrides.examPearls || ['Kritik klinik karar doğru sırayla verilmelidir.'],
    wrongOptionFeedback: overrides.wrongOptionFeedback || {},
    patientIntro: overrides.patientIntro || { profile: overrides.demographics || '45 yaş erkek', presentation: overrides.chiefComplaint || 'Acil başvuru', riskContext: ['Kritik bulgu.'], distinctiveClues: ['Kritik bulgu 1.', 'Kritik bulgu 2.', 'Kritik bulgu 3.'], historySummary: overrides.stem || 'Kısa klinik karar olgusu.' },
    diagnosis: {
      correct,
      options: options.map((option) => option.text),
      explanation: overrides.explanation || `${correct} olgudaki somut bulgularla en uyumlu yanıttır.`,
      answerFeedback: {
        whyCorrect: overrides.explanation || `${correct} olgudaki somut bulgularla en uyumlu yanıttır.`,
        evidenceChain: overrides.evidenceChain || ['Kritik bulgu 1.', 'Kritik bulgu 2.', 'Kritik karar basamağı.'],
        clinicalPearls: overrides.examPearls || ['Kritik klinik karar doğru sırayla verilmelidir.'],
      },
    },
  };
}

function result(name, question, expectation, { repair = false } = {}) {
  const gate = scientificAccuracyGate(question);
  const repaired = repair ? repairScientificAccuracy(question) : null;
  const repairedGate = repaired ? scientificAccuracyGate(repaired) : null;
  return {
    name,
    expected: expectation,
    accepted: gate.ok,
    errors: gate.errors,
    matchedRules: gate.matchedRules,
    repairedAccepted: repairedGate?.ok ?? null,
    repairedCorrect: repaired?.diagnosis?.correct || null,
    passed: expectation === 'accept' ? gate.ok : !gate.ok,
  };
}

const fixtures = [
  result('Hyperkalemi + EKG yanlış insülin/glukoz cevabı reddedilir ve kalsiyuma repair edilir', q({
    id: 'ai-spot-reg-hyperkalemia',
    title: 'Hiperkalemi ve EKG değişikliği',
    stem: 'Diyabetik nefropatisi olan hasta halsizlik ile başvurur. Serum K⁺ 6.8 mEq/L saptanır. EKG’de sivri T dalgaları ve QRS genişlemesi vardır.',
    question: 'Hiperkalemiye acil tedaviye başlanırken ilk uygulanması gereken müdahale hangisidir?',
    options: [
      { id: 'A', text: 'Beta-agonist inhalasyon' },
      { id: 'B', text: 'İntravenöz insülin + glukoz' },
      { id: 'C', text: 'Sodyum polistiren sülfat' },
      { id: 'D', text: 'İntravenöz kalsiyum glukonat' },
      { id: 'E', text: 'İntravenöz sodyum bikarbonat' },
    ],
    correctAnswer: 'B',
  }), 'reject', { repair: true }),
  result('PE + hipotansiyon PESI IV cevabı reddedilir ve yüksek risk/masif PE’ye repair edilir', q({
    id: 'ai-spot-reg-pe',
    title: 'Pulmoner emboli risk sınıflaması',
    relatedBranch: 'Küçük Stajlar',
    stem: 'Ani dispne ve plöritik göğüs ağrısı olan hastada SpO₂ %91 ve TA 68/42 mmHg saptanır. Bacaklarda şişlik ve hassasiyet vardır.',
    question: 'Bu hastada pulmoner emboli için en uygun risk sınıflaması hangisidir?',
    questionType: 'risk',
    options: [
      { id: 'A', text: 'PESI yüksek risk (III)' },
      { id: 'B', text: 'PESI çok yüksek risk (IV)' },
      { id: 'C', text: 'PESI sınıflaması uygulanamaz' },
      { id: 'D', text: 'PESI düşük risk (I)' },
      { id: 'E', text: 'PESI orta risk (II)' },
    ],
    correctAnswer: 'B',
  }), 'reject', { repair: true }),
  result('Anafilaksi ilk ilaç antihistaminik olamaz', q({
    id: 'ai-spot-reg-anaphylaxis',
    title: 'Anafilaksi acil yaklaşımı',
    stem: 'Antibiyotik sonrası ürtiker, dudak ödemi, hışıltılı solunum ve TA 78/44 mmHg gelişir. Anafilaksi düşünülür.',
    question: 'Bu hastada ilk hayat kurtarıcı ilaç hangisidir?',
    options: [
      { id: 'A', text: 'İntramüsküler adrenalin' },
      { id: 'B', text: 'Antihistaminik' },
      { id: 'C', text: 'Nebulize salbutamol' },
      { id: 'D', text: 'Kortikosteroid' },
      { id: 'E', text: 'Oral sıvı' },
    ],
    correctAnswer: 'B',
  }), 'reject'),
  result('DKA + düşük potasyumda doğrudan insülin reddedilir', q({
    id: 'ai-spot-reg-dka-low-k',
    title: 'DKA ve potasyum güvenliği',
    stem: 'Diyabetik ketoasidoz tablosundaki hastada glukoz 480 mg/dL, keton pozitif, pH 7.18 ve serum K⁺ 3.0 mEq/L saptanır.',
    question: 'Bu hastada ilk tedavi yaklaşımı hangisidir?',
    options: [
      { id: 'A', text: 'İntravenöz insülin infüzyonuna hemen başlamak' },
      { id: 'B', text: 'Potasyum replasmanı ve izotonik sıvı ile başlamak' },
      { id: 'C', text: 'Sodyum bikarbonat vermek' },
      { id: 'D', text: 'Oral antidiyabetik başlamak' },
      { id: 'E', text: 'Glukagon vermek' },
    ],
    correctAnswer: 'A',
  }), 'reject'),
  result('Sepsis/hipoperfüzyon doğru bundle cevabı kabul edilir', q({
    id: 'ai-spot-reg-sepsis',
    title: 'Sepsis erken yaklaşımı',
    stem: 'Yüksek ateş, titreme, dizüri ve flank hassasiyeti olan hastada TA 92/58 mmHg, laktat 3.8 mmol/L ve lökosit 16.200/mm³ saptanır.',
    question: 'Bu hasta için en doğru ilk yaklaşım hangisidir?',
    options: [
      { id: 'A', text: 'Kortikosteroid tedavisine başlanması' },
      { id: 'B', text: 'Erken hemodiyaliz uygulanması' },
      { id: 'C', text: 'Geniş spektrumlu antibiyotik başlanması ve 30 mL/kg kristaloid bolus' },
      { id: 'D', text: 'Antifibrinolitik ilaç verilmesi' },
      { id: 'E', text: 'İntravenöz insülin + glukoz infüzyonu' },
    ],
    correctAnswer: 'C',
  }), 'accept'),
  result('Akut inmede tromboliz öncesi kanama dışlanmalıdır', q({
    id: 'ai-spot-reg-stroke',
    title: 'Akut inme yaklaşımı',
    stem: 'Ani hemiparezi ve afazi ile gelen hastada semptom başlangıcı 90 dakikadır. Henüz beyin görüntülemesi yapılmamıştır.',
    question: 'Tromboliz değerlendirmesi öncesinde ilk yapılması gereken nedir?',
    options: [
      { id: 'A', text: 'Kontrastsız beyin BT ile kanamayı dışlamak' },
      { id: 'B', text: 'Alteplazı görüntüleme olmadan başlamak' },
      { id: 'C', text: 'Oral aspirin vermek' },
      { id: 'D', text: 'Taburculuk planlamak' },
      { id: 'E', text: 'Antibiyotik başlamak' },
    ],
    correctAnswer: 'B',
  }), 'reject'),
  result('Status epileptikusta ilk basamak benzodiazepin olmalıdır', q({
    id: 'ai-spot-reg-status',
    title: 'Status epileptikus',
    stem: 'Hasta 8 dakikadır devam eden jeneralize tonik-klonik nöbet ile acile getirilir.',
    question: 'Bu hastada ilk ilaç tedavisi hangisidir?',
    options: [
      { id: 'A', text: 'İntravenöz lorazepam' },
      { id: 'B', text: 'Oral karbamazepin' },
      { id: 'C', text: 'Sadece gözlem' },
      { id: 'D', text: 'Asetilsalisilik asit' },
      { id: 'E', text: 'Antihistaminik' },
    ],
    correctAnswer: 'C',
  }), 'reject'),
  result('Pediatri branşında erişkin profil reddedilir', q({
    id: 'ai-spot-reg-pediatric',
    relatedBranch: 'Çocuk Sağlığı ve Hastalıkları',
    branchName: 'Çocuk Sağlığı ve Hastalıkları',
    demographics: '68 yaş erkek',
    stem: '68 yaş erkek hasta çocuk acil bağlamında değerlendirilir.',
  }), 'reject'),
  result('Adli/etik olguda bildirim-güvenlik-kayıt yükümlülüğü atlanamaz', q({
    id: 'ai-spot-reg-forensic',
    title: 'Çocuk istismarı şüphesi',
    relatedBranch: 'Adli Tıp',
    stem: 'Çocukta açıklanamayan çoklu ekimozlar ve bakım veren öyküsüyle uyumsuz travma bulguları vardır. Çocuk istismarı şüphesi doğar.',
    question: 'Bu durumda en uygun ilk yaklaşım hangisidir?',
    options: [
      { id: 'A', text: 'Yalnız ağrı kesici verip taburcu etmek' },
      { id: 'B', text: 'Güvenliği sağlamak, objektif kayıt tutmak ve adli bildirim yapmak' },
      { id: 'C', text: 'Aile kesin tanıyı kabul edene kadar beklemek' },
      { id: 'D', text: 'Sadece kontrol randevusu vermek' },
      { id: 'E', text: 'Konuyu hasta dosyasına yazmadan izlemek' },
    ],
    correctAnswer: 'A',
  }), 'reject'),
];

const summary = {
  generatedAt: new Date().toISOString(),
  highRiskClinicalRuleCount: highRiskClinicalRules.length,
  fixtureCount: fixtures.length,
  passedCount: fixtures.filter((item) => item.passed).length,
  failedCount: fixtures.filter((item) => !item.passed).length,
  fixtures,
};

console.log(JSON.stringify(summary, null, 2));
process.exitCode = summary.failedCount ? 1 : 0;
