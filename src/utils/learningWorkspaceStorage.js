import { localBackend } from '../services/localBackend.js';
import { PROCESSING_STEPS } from '../data/learningPlatform.js';

const WORKSPACE_KEY_PREFIX = 'klinikiq-learning-workspace-v1';

function nowIso() {
  return new Date().toISOString();
}

function buildId(prefix = 'item') {
  const random = Math.random().toString(36).slice(2, 8);
  return `${prefix}-${Date.now()}-${random}`;
}

function normalizeModeLabel(mode) {
  if (mode === 'tus') return 'TUS';
  if (mode === 'clinical-rotation') return 'Klinik staj';
  if (mode === 'medical-school') return 'Tıp fakültesi';
  return 'Genel öğrenme';
}

function inferTopic(metadata = {}, fileName = '') {
  return metadata.course || metadata.committee || metadata.tusBranch || String(fileName).replace(/\.[^.]+$/, '') || 'Ders materyali';
}

function buildSourceRef(page = 1, note = 'oluşturulan materyal taslağı') {
  return { page, note };
}

function buildLesson(material) {
  const topic = inferTopic(material, material.fileName);
  const modeLabel = normalizeModeLabel(material.studyMode);
  const isTus = material.studyMode === 'tus';
  const isClinical = material.studyMode === 'clinical-rotation';

  return {
    id: buildId('lesson'),
    materialId: material.id,
    title: `${topic} çalışma dersi`,
    overview: `${material.fileName} materyali ${modeLabel} modu için yapılandırılmış bir öğrenme çalışma alanına dönüştürüldü. Bu prototip sürümde ders iskeleti, soru seti ve kartlar dosya metni derin çıkarımı yerine seçilen çalışma amacı ve materyal meta verisiyle güvenli şekilde oluşturulur.`,
    learningObjectives: isTus
      ? ['TUS düzeyinde karar verdirici ipuçlarını ayırt etmek.', 'Aynı kategorideki çeldiricileri elemek.', 'Kısa ve mekanizma odaklı sınav notu üretmek.']
      : isClinical
        ? ['Klinik tabloyu tanı ve ayırıcı tanı basamaklarına yerleştirmek.', 'Tetkik ve yönetim sırasını gerekçelendirmek.', 'Hasta güvenliğini etkileyen kırmızı bayrakları tanımak.']
        : ['Dersin temel kavramlarını büyük resim içinde kurmak.', 'Mekanizma ve klinik bağlantıyı adım adım açıklamak.', 'Komite/final düzeyinde aktif hatırlama soruları üretmek.'],
    sections: [
      {
        id: buildId('section'),
        title: 'Büyük resim',
        body: `${topic} konusu önce temel kavram, ardından mekanizma ve son olarak klinik/ sınav bağlantısı ile öğrenilmelidir. Bu yapı öğrencinin ezber yerine neden-sonuç ilişkisini kurmasını hedefler.`,
        sourceReferences: [buildSourceRef(1, 'ders başlığı ve çalışma amacı')],
      },
      {
        id: buildId('section'),
        title: 'Adım adım öğrenme akışı',
        body: isTus
          ? 'TUS modunda ilk hedef karar verdirici ipucunu yakalamaktır. Kökten gereksiz ayrıntılar çıkarılır, doğru seçenek ile yakın çeldirici arasındaki ayırıcı özellik kısa ve net gösterilir.'
          : 'Tıp fakültesi modunda konu temel tanım ile başlar, ardından mekanizma, klinik örnek ve sınavda nasıl sorulabileceği birlikte açıklanır.',
        sourceReferences: [buildSourceRef(1, 'AI çalışma modu')],
      },
      {
        id: buildId('section'),
        title: 'Klinik ve sınav ilişkisi',
        body: isClinical
          ? 'Klinik staj yaklaşımında öncelik stabilite, kırmızı bayrak, doğru tetkik sırası ve ilk yönetim basamağıdır.'
          : isTus
            ? 'TUS yaklaşımında kısa vaka ipucu, mekanizma ve en olası/ilk/kontrendike seçenek ayrımı özellikle önemlidir.'
            : 'Komite ve final yaklaşımında öğretim üyesinin vurguladığı mekanizma, tablo ve şekiller sınav sorusuna dönüşebilecek çekirdeği oluşturur.',
        sourceReferences: [buildSourceRef(2, 'öğrenme amacı')],
      },
    ],
    figureExplanations: [
      {
        id: buildId('figure'),
        reference: 'Sayfa/slayt 1-3',
        title: 'Görsel analizi için ayrılmış alan',
        whatItShows: 'Bu prototip sürümde gerçek şekil çıkarımı yapılmadı; üretim sürümünde slayt başlıkları, şekil etiketleri, tablolar, grafikler, histoloji/radyoloji görselleri ve akış şemaları ayrı ayrı işlenecektir.',
        interpretation: 'Önemli görseller ders içinde sayfa referansı, etiket açıklaması, sınav değeri ve sık yapılan hata formatında gösterilmelidir.',
        examRelevance: 'Tıp slaytlarında mekanizmalar çoğu zaman şekil üzerinden öğretildiği için görsel açıklama modülü ana akıştan ayrı tutulmuştur.',
        memoryNote: 'Şekil varsa sadece özetleme değil, etiketi okuyup mekanizmayı kurma hedeflenir.',
      },
    ],
    highYieldSummary: [
      `${topic} için önce ana mekanizma, sonra klinik karşılık, ardından sınav tuzağı öğrenilmelidir.`,
      isTus ? 'TUS kartlarında kısa karar cümlesi ve ayırıcı ipucu öne çıkar.' : 'Tıp fakültesi kartlarında kavramın nedeni ve basamaklı açıklaması korunur.',
      'Yanlış yapılan sorular aynı materyalin review alanına otomatik düşmelidir.',
    ],
    mustRemember: [
      'Verilen bilgi doğrudan tanıyı söylüyorsa soru aynı tanıyı tekrar sormamalıdır.',
      'Her seçenek açıklaması öğrencinin neden yanıldığını gösterecek kadar ayırt ettirici olmalıdır.',
      'Tıbbi öneri içeren sorularda stabilite, zamanlama, yaş ve kontrendikasyon bağlamı eksik bırakılmamalıdır.',
    ],
    sourceReferences: [buildSourceRef(1, material.fileName)],
    createdAt: nowIso(),
  };
}

const QUESTION_TEMPLATES = [
  { type: 'recall', stem: 'Bu materyaldeki ana öğrenme hedefi düşünüldüğünde ilk kurulması gereken kavramsal çerçeve hangisidir?', correct: 'Temel mekanizma ile klinik bulguyu birlikte ilişkilendirmek' },
  { type: 'mechanism', stem: 'Bir öğrencinin bu konuyu ezber yerine mekanizma üzerinden öğrenmesi için en doğru çalışma yaklaşımı hangisidir?', correct: 'Neden-sonuç ilişkisini basamaklandırarak klinik sonuca bağlamak' },
  { type: 'interpretation', stem: 'Ders slaytındaki tablo veya şekil soru hâline getirilecekse en uygun soru hedefi hangisi olmalıdır?', correct: 'Şekilde verilen ilişkiyi yorumlatmak' },
  { type: 'clinical-application', stem: 'Klinik vaka içeren bir soruda doğru cevabı güçlendiren en güvenli yazım ilkesi hangisidir?', correct: 'Kökü tek doğru cevaba götüren ayırt ettirici ipuçlarıyla daraltmak' },
  { type: 'differential', stem: 'Yakın iki seçenek arasında öğrencinin ayırım yapmasını en çok ne sağlar?', correct: 'Her yanlış seçenek için hangi durumda doğru olacağını açıklamak' },
  { type: 'management', stem: 'Tedavi veya ilk yaklaşım sorusu yazılırken belirsizliği azaltan en önemli bilgi hangisidir?', correct: 'Hastanın stabilite, şiddet ve zamanlama bağlamı' },
  { type: 'figure', stem: 'Bir şekil açıklamasının eğitim değerini en çok artıran unsur hangisidir?', correct: 'Etiketleri adım adım yorumlayıp sınavdaki karşılığını belirtmek' },
  { type: 'exam-trap', stem: 'Sınav tuzağı içeren kartlarda en iyi TUS ipucu nasıl yazılmalıdır?', correct: 'Kısa, ayırt ettirici ve karar verdirici tek cümle olarak' },
  { type: 'review', stem: 'Yanlış yapılan soruların en verimli tekrar biçimi hangisidir?', correct: 'Aynı materyale bağlı yanlış ve zor soruları ayrı review setinde çözmek' },
  { type: 'quality', stem: 'AI tarafından üretilen bir sorunun kullanıcıya gösterilmeden önce mutlaka geçmesi gereken kontrol hangisidir?', correct: 'Tek doğru cevap, bilimsel doğruluk ve öğretici feedback kontrolü' },
];

function buildQuestion(material, index, template) {
  const correctId = ['A', 'B', 'C', 'D', 'E'][index % 5];
  const distractors = [
    'Kökü mümkün olduğunca uzun ve ayrıntılı tutmak',
    'Tüm laboratuvar değerlerini rutin olarak eklemek',
    'Doğru cevabı veri panelinde açıkça göstermek',
    'Farklı kategorilerden seçenekleri birlikte kullanmak',
    'Sadece genel ve şablon açıklama vermek',
  ].filter((item) => item !== template.correct);
  const optionTexts = distractors.slice(0, 4);
  optionTexts.splice(index % 5, 0, template.correct);

  const options = optionTexts.map((text, optionIndex) => ({ id: ['A', 'B', 'C', 'D', 'E'][optionIndex], text }));
  const correctOption = options.find((item) => item.text === template.correct)?.id || correctId;
  const topic = inferTopic(material, material.fileName);

  return {
    id: buildId('question'),
    materialId: material.id,
    mode: material.studyMode,
    questionNumber: index + 1,
    type: template.type,
    stem: `${topic} materyalini çalışan bir öğrenci, dersi aktif öğrenme ve sınav pratiğine dönüştürmek istiyor. ${template.stem}`,
    supportingData: [
      { label: 'Materyal', value: material.fileName },
      { label: 'Çalışma modu', value: normalizeModeLabel(material.studyMode) },
    ],
    options,
    correctOptionId: correctOption,
    optionFeedback: options.reduce((accumulator, option) => {
      accumulator[option.id] = option.id === correctOption
        ? `${option.text} bu materyal için en uygundur çünkü öğrenme çıktısını mekanizma, klinik bağlam ve sınav kararına bağlar.`
        : `${option.text} bu vakada yeterli değildir; bu yaklaşım öğrencinin ayırt ettirici ipucunu ve doğru karar sırasını kurmasını sağlamaz.`;
      return accumulator;
    }, {}),
    sourceReferences: [buildSourceRef(1, material.fileName)],
    userAnswer: null,
    isWrong: false,
    isFavorite: false,
    isDifficult: false,
    createdAt: nowIso(),
  };
}

function buildQuestions(material) {
  return QUESTION_TEMPLATES.map((template, index) => buildQuestion(material, index, template));
}

function buildFlashcards(material) {
  const topic = inferTopic(material, material.fileName);
  const mode = material.studyMode;
  const cards = [
    ['Bu materyali çalışırken ilk hedef ne olmalıdır?', 'Ana mekanizmayı, klinik karşılığı ve sınavdaki karar noktasını birlikte kurmak.', 'Aktif öğrenme, yalnızca özet okumak değil; bilgiyi soru ve geri bildirim üzerinden geri çağırmaktır.', 'must-remember'],
    ['İyi bir TUS/komite sorusunda seçenekler nasıl olmalıdır?', 'Seçenekler aynı kategoriden gelmeli ve tek seçenek açıkça en doğru olmalıdır.', 'Tanı, test, tedavi ve mekanizma seçenekleri aynı soruda karıştırılırsa ölçülen hedef bulanıklaşır.', 'exam-trap'],
    ['Yanlış seçenek açıklaması neden önemlidir?', 'Öğrenciye o seçeneğin hangi durumda doğru olacağını ve bu soruda neden uymadığını göstermelidir.', 'Bu yaklaşım pasif cevap görmeyi aktif ayırıcı tanı öğrenmesine dönüştürür.', 'differential'],
    ['Şekil veya tablo içeren slayt nasıl çalışılmalıdır?', 'Etiketler tek tek okunmalı, ilişki adım adım yorumlanmalı ve sınavdaki karşılığı yazılmalıdır.', 'Tıbbi slaytlarda mekanizmalar çoğu zaman metinden çok görsel akışla öğretilir.', 'figure'],
    ['Bu materyalde tekrar merkezi neyi ayırmalıdır?', 'Yanlış sorular, zor kartlar, favoriler ve tekrar kartları materyal bazında saklanmalıdır.', 'Materyal bazlı tekrar, ilgisiz konuların karışmasını önler ve zayıf başlığı netleştirir.', 'review'],
    ['AI çıktısı kullanıcıya gösterilmeden önce hangi kalite kontrolünden geçmelidir?', 'Tek doğru cevap, cevap sızıntısı, bilimsel mekanizma, evidenceChain ve feedback kalitesi kontrol edilmelidir.', 'Kısa prompt tek başına yeterli değildir; güvenilirlik için lokal validation katmanı gerekir.', 'quality'],
  ];

  return cards.map(([front, back, explanation, tag], index) => ({
    id: buildId('card'),
    userId: material.userId,
    materialId: material.id,
    mode,
    classYear: material.classYear || null,
    university: material.university || '',
    committee: material.committee || '',
    course: material.course || '',
    tusBranch: material.tusBranch || '',
    front: `${topic}: ${front}`,
    back,
    explanation,
    sourceReference: `Materyal: ${material.fileName}`,
    type: tag,
    difficulty: index < 2 ? 'Kolay' : index < 4 ? 'Orta' : 'Zor',
    isUserCreated: false,
    isFavorite: false,
    isDifficult: false,
    repeatStatus: 'new',
    createdAt: nowIso(),
  }));
}

export function createMaterialBundle({ userId, files = [], metadata = {} }) {
  const safeFiles = Array.from(files || []).map((file) => ({
    name: file.name || 'Ders materyali.pdf',
    type: file.type || (file.name?.endsWith('.pptx') ? 'application/vnd.openxmlformats-officedocument.presentationml.presentation' : 'application/pdf'),
    size: file.size || 0,
  }));

  return safeFiles.map((file) => {
    const material = {
      id: buildId('material'),
      userId,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      uploadDate: nowIso(),
      studyMode: metadata.studyMode || 'medical-school',
      classYear: metadata.classYear || null,
      university: metadata.university || '',
      committee: metadata.committee || '',
      course: metadata.course || '',
      tusBranch: metadata.tusBranch || '',
      targetExamDate: metadata.examDate || '',
      processingStatus: PROCESSING_STEPS.at(-1),
      processingLog: PROCESSING_STEPS,
      extractedText: '',
      extractedFigures: [],
    };
    const lesson = buildLesson(material);
    const questions = buildQuestions(material);
    const flashcards = buildFlashcards(material);
    return {
      material: {
        ...material,
        lessonId: lesson.id,
        questionSetId: `${material.id}-questions`,
        flashcardDeckId: `${material.id}-cards`,
      },
      lesson,
      questions,
      flashcards,
    };
  });
}

function emptyWorkspace() {
  return {
    materials: [],
    lessons: [],
    questions: [],
    flashcards: [],
    reviewSets: [],
    updatedAt: nowIso(),
  };
}

function workspaceKey(userId) {
  return `${WORKSPACE_KEY_PREFIX}:${userId || 'guest'}`;
}

export function loadLearningWorkspace(userId) {
  const stored = localBackend.read(workspaceKey(userId), emptyWorkspace());
  return {
    ...emptyWorkspace(),
    ...stored,
    materials: Array.isArray(stored.materials) ? stored.materials : [],
    lessons: Array.isArray(stored.lessons) ? stored.lessons : [],
    questions: Array.isArray(stored.questions) ? stored.questions : [],
    flashcards: Array.isArray(stored.flashcards) ? stored.flashcards : [],
    reviewSets: Array.isArray(stored.reviewSets) ? stored.reviewSets : [],
  };
}

export function saveLearningWorkspace(userId, workspace) {
  const nextWorkspace = { ...emptyWorkspace(), ...workspace, updatedAt: nowIso() };
  localBackend.write(workspaceKey(userId), nextWorkspace);
  return nextWorkspace;
}

export function appendMaterialBundles(userId, workspace, bundles = []) {
  const nextWorkspace = {
    ...workspace,
    materials: [...bundles.map((bundle) => bundle.material), ...workspace.materials],
    lessons: [...bundles.map((bundle) => bundle.lesson), ...workspace.lessons],
    questions: [...bundles.flatMap((bundle) => bundle.questions), ...workspace.questions],
    flashcards: [...bundles.flatMap((bundle) => bundle.flashcards), ...workspace.flashcards],
    updatedAt: nowIso(),
  };
  return saveLearningWorkspace(userId, nextWorkspace);
}

export function updateQuestionAnswer(userId, workspace, questionId, answerId) {
  const nextQuestions = workspace.questions.map((question) => {
    if (question.id !== questionId) return question;
    const isWrong = answerId !== question.correctOptionId;
    return { ...question, userAnswer: answerId, isWrong, answeredAt: nowIso() };
  });
  return saveLearningWorkspace(userId, { ...workspace, questions: nextQuestions });
}

export function toggleWorkspaceItem(userId, workspace, collection, itemId, field) {
  const nextCollection = (workspace[collection] || []).map((item) => (item.id === itemId ? { ...item, [field]: !item[field] } : item));
  return saveLearningWorkspace(userId, { ...workspace, [collection]: nextCollection });
}

export function addUserFlashcard(userId, workspace, card) {
  const nextCard = {
    id: buildId('user-card'),
    userId,
    materialId: card.materialId || null,
    mode: card.mode || 'medical-school',
    classYear: card.classYear || null,
    university: card.university || '',
    committee: card.committee || '',
    course: card.course || '',
    tusBranch: card.tusBranch || '',
    front: card.front,
    back: card.back,
    explanation: card.explanation || '',
    sourceReference: card.sourceReference || 'Kullanıcı oluşturdu',
    type: 'user-created',
    difficulty: card.difficulty || 'Orta',
    isUserCreated: true,
    isFavorite: false,
    isDifficult: false,
    repeatStatus: 'new',
    createdAt: nowIso(),
  };
  return saveLearningWorkspace(userId, { ...workspace, flashcards: [nextCard, ...workspace.flashcards] });
}

export function deleteUserFlashcard(userId, workspace, cardId) {
  return saveLearningWorkspace(userId, { ...workspace, flashcards: workspace.flashcards.filter((card) => card.id !== cardId) });
}
