export const KOMITE_GENERATION_ERROR_MESSAGE = 'Komite çalışma içeriği şu anda oluşturulamadı. Lütfen tekrar deneyin.';

const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];

function compactText(value = '') {
  if (Array.isArray(value)) return value.map(compactText).filter(Boolean).join(' ');
  if (value && typeof value === 'object') {
    return compactText(value.text || value.content || value.explanation || value.summary || value.value || '');
  }
  return String(value || '').replace(/\s+/g, ' ').trim();
}

const TECHNICAL_LESSON_NOTE_PATTERN = /\b(?:dosya bazl[ıi]|materyal(?:ler)?(?:inden|in)?\s+(?:ana konusu|çıkarılan|temsil)|aşağıda yapılandırıldı|temsil edildi|materyal kapsam|coverageSummary|materialCoverage|sourceManifest|sourceFingerprint|MATERIAL_DIGEST|chunk|grup\s*\d+|üretim süreci|teknik nedenle|extraction warning|ayrıştırılan metin|API bağlamı|öğretici excerpt|her dosyanın ana konusu|ilişkili başlıklar birleştirildi|farklı konular tek başlıkta ezilmedi)\b/iu;
const RAW_SOURCE_LINE_PATTERN = /^(?:[A-ZÇĞİÖŞÜ0-9][A-ZÇĞİÖŞÜ0-9\s/():,._-]{10,}|(?:prof\.?|doç\.?|dr\.?|öğr\.?\s*gör\.?)\b|.*\.(?:pdf|pptx|ppt|docx|txt)\b)/iu;
const BAD_OBJECTIVE_PATTERN = /\b(?:odağında klinik, mekanistik ve sınav bağlamıyla yorumlayabilmek|bilgisini açıklamak ve soruda ayırt etmek|dosya bazlı|materyal(?:ler)?inden|sınavda .* sorulabilir odağında)\b/iu;

function stripTechnicalLessonSentences(text = '') {
  return String(text || '')
    .split(/(?<=[.!?])\s+|\n+/u)
    .map((part) => part.trim())
    .filter(Boolean)
    .filter((part) => !TECHNICAL_LESSON_NOTE_PATTERN.test(part))
    .filter((part) => !RAW_SOURCE_LINE_PATTERN.test(part))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanGeneratedText(value = '', { allowShort = false } = {}) {
  let text = compactText(value)
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\beksiklikt\b/giu, 'eksikliği')
    .replace(/\bmikroo\b/giu, 'mikro')
    .replace(/\bmikrositoğu\b/giu, 'mikrositozu')
    .replace(/\s+([.,;:!?])/g, '$1')
    .replace(/([([{])\s+/g, '$1')
    .replace(/\s+([)\]}])/g, '$1')
    .replace(/^\s*['"]?\s*sorusudur\.?\s*/iu, '')
    .replace(/\b(?:Ana konu belirtilmedi|Konu belirtilmedi|Unknown topic|Grup\s*\d+|Chunk\s*\d+)\b/giu, '')
    .replace(/\s+/g, ' ')
    .trim();
  text = stripTechnicalLessonSentences(text);
  if (!text) return '';
  if (/^[,.;:!?'"`-]+$/u.test(text)) return '';
  if (!allowShort && text.split(/\s+/u).length < 3) return '';
  if (/^(ve|veya|ile|için|çünkü|ancak|fakat|ise|de|da)\b/iu.test(text)) return '';
  if (/[,:;(-]\s*$/u.test(text)) return '';
  return text;
}

function compareText(value = '') {
  return cleanGeneratedText(value, { allowShort: true }).toLocaleLowerCase('tr').replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\s+/g, ' ').trim();
}

function uniqueTexts(items = [], maxItems = 12, exclude = new Set()) {
  const seen = new Set(exclude);
  const output = [];
  (Array.isArray(items) ? items : []).forEach((item) => {
    const text = cleanGeneratedText(item);
    const key = compareText(text);
    const nearDuplicate = [...seen].some((seenKey) => key.length > 42 && seenKey.length > 42 && (key.includes(seenKey) || seenKey.includes(key)));
    if (!text || !key || seen.has(key) || nearDuplicate) return;
    seen.add(key);
    output.push(text);
  });
  return output.slice(0, maxItems);
}

function cleanTopic(value = '', fallback = '') {
  const text = cleanGeneratedText(value, { allowShort: true });
  if (text && !/ana konu|belirtilmedi|net çıkarılamadı|unknown topic/iu.test(text) && !TECHNICAL_LESSON_NOTE_PATTERN.test(text) && !RAW_SOURCE_LINE_PATTERN.test(text)) return text;
  const fromFile = cleanGeneratedText(fallback, { allowShort: true }).replace(/\.[a-z0-9]+$/iu, '').replace(/[_-]+/g, ' ');
  return fromFile || 'Komite materyali';
}

function normalizeKeyBoxes(boxes = []) {
  const seen = new Set();
  return (Array.isArray(boxes) ? boxes : [])
    .map((box) => ({
      label: cleanGeneratedText(box?.label || box?.title || 'Komite için kritik', { allowShort: true }) || 'Komite için kritik',
      text: cleanGeneratedText(box?.text || box?.content || box?.body || box?.description),
    }))
    .filter((box) => {
      const key = compareText(box.text);
      if (!box.text || box.text.length < 18 || box.text.split(/\s+/u).length < 4 || seen.has(key)) return false;
      if (/kritik güvenlik/iu.test(box.label) && !/\b(?:acil|hayati|kontrendike|risk|şok|kanama|hava yolu|resüsitasyon|mortalite|toksisite|doz|hasta güvenliği|öncelik)\b/iu.test(box.text)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 2);
}

function normalizeTextList(value = [], maxItems = 6) {
  const items = Array.isArray(value) ? value : value ? [value] : [];
  return uniqueTexts(items.map((item) => {
    if (!item || typeof item !== 'object') return item;
    return item.text || item.content || item.message || item.point || item.summary || item.description || Object.values(item).filter(Boolean).join(' ');
  }), maxItems);
}

function normalizeDifficulty(value = 'medium') {
  const clean = compactText(value).toLocaleLowerCase('tr');
  if (['hard', 'zor'].includes(clean)) return 'hard';
  if (['easy', 'kolay'].includes(clean)) return 'easy';
  return 'medium';
}

function objectiveFocusFromSection(section = {}) {
  const source = cleanGeneratedText(section.examAngle || section.clinicalConnection || section.commonTrap || section.teachingText);
  const firstSentence = source.split(/(?<=[.!?])\s+/u).find((item) => cleanGeneratedText(item));
  return cleanGeneratedText(firstSentence || source).replace(/[.!?]+$/u, '').slice(0, 130);
}

function buildLearningObjective(section = {}) {
  const heading = cleanTopic(section.heading || section.title, 'Komite materyali');
  if (section.algorithmSteps?.length || section.mechanismFlow?.length) {
    return `${heading} başlığındaki mekanizma veya karar basamaklarını neden-sonuç ilişkisi içinde açıklayabilmek.`;
  }
  if (section.comparisonPoints?.length || section.commonTrap) {
    return `${heading} içinde karışabilecek kavramları ayırt ettiren temel ipuçlarını kullanabilmek.`;
  }
  if (section.clinicalConnection || section.examAngle) {
    return `${heading} bilgisini klinik bulgular, tanı yaklaşımı veya sınav sorusu bağlamında yorumlayabilmek.`;
  }
  return `${heading} konusunun temel kavramlarını ve öğrenme açısından kritik bağlantılarını açıklayabilmek.`;
}

function isUsableLearningObjective(item = '') {
  const text = cleanGeneratedText(item);
  if (!text || text.split(/\s+/u).length < 5) return false;
  if (BAD_OBJECTIVE_PATTERN.test(text) || TECHNICAL_LESSON_NOTE_PATTERN.test(text) || RAW_SOURCE_LINE_PATTERN.test(text)) return false;
  if (/[,:;(-]\s*$/u.test(text)) return false;
  return true;
}

function normalizeLesson(rawLesson = {}, sourceFingerprint = '') {
  const sections = Array.isArray(rawLesson.sections)
    ? rawLesson.sections
    : rawLesson.sections && typeof rawLesson.sections === 'object'
      ? Object.entries(rawLesson.sections).map(([heading, value]) => ({ heading, content: value }))
      : [];
  const normalizedSections = sections.map((section, index) => ({
    id: section.id || `komite-section-${index + 1}`,
    heading: cleanTopic(section.heading || section.title, section.sourceRefs?.[0] || `Bölüm ${index + 1}`),
    level: Number(section.level) || 2,
    teachingText: cleanGeneratedText(section.teachingText || section.content || section.coreExplanation || section.bigPicture || section.summary),
    content: cleanGeneratedText(section.content || section.teachingText || section.coreExplanation || section.bigPicture || section.summary),
    mechanismFlow: Array.isArray(section.mechanismFlow) ? uniqueTexts(section.mechanismFlow, 5) : [],
    algorithmSteps: normalizeTextList(section.algorithmSteps || section.algorithmFlow || section.decisionSteps || section.decisionFlow, 7),
    tableInsights: normalizeTextList(section.tableInsights || section.tableNotes || section.tablesAndVisualNotes || section.classificationTable, 5),
    comparisonPoints: normalizeTextList(section.comparisonPoints || section.comparisons || section.differentials || section.commonConfusions, 5),
    visualNotes: normalizeTextList(section.visualNotes || section.schemaNotes, 4),
    miniReview: [],
    clinicalConnection: cleanGeneratedText(section.clinicalConnection || section.clinicalOrPracticalConnection),
    examAngle: cleanGeneratedText(section.examAngle || section.examConnection || section.examFocus),
    commonTrap: cleanGeneratedText(section.commonTrap || section.commonConfusions),
    keyBoxes: normalizeKeyBoxes(section.keyBoxes),
    sourceRefs: Array.isArray(section.sourceRefs || section.relatedSourceFiles)
      ? (section.sourceRefs || section.relatedSourceFiles).map((item) => cleanGeneratedText(item, { allowShort: true })).filter(Boolean)
      : [],
  })).filter((section) => section.heading && section.teachingText);
  const fallbackText = cleanGeneratedText(
    rawLesson.teachingText
    || rawLesson.content
    || rawLesson.body
    || rawLesson.lessonText
    || rawLesson.coreExplanation
    || rawLesson.overview
    || rawLesson.shortIntro
    || rawLesson.bigPicture
    || rawLesson.summary,
  );
  const lessonSections = normalizedSections.length
    ? normalizedSections
    : fallbackText
      ? [{
        id: 'komite-section-1',
        heading: cleanTopic(rawLesson.title || rawLesson.inferredTitle, 'Konu anlatımı'),
        level: 2,
        teachingText: fallbackText,
        content: fallbackText,
        mechanismFlow: [],
        algorithmSteps: [],
        tableInsights: [],
        comparisonPoints: [],
        visualNotes: [],
        miniReview: [],
        clinicalConnection: cleanGeneratedText(rawLesson.clinicalExamRelevance),
        examAngle: cleanGeneratedText(rawLesson.examFocus),
        commonTrap: '',
        keyBoxes: [],
        sourceRefs: [],
      }]
      : [];
  const derivedHighYield = [
    ...(Array.isArray(rawLesson.highYieldPoints) ? rawLesson.highYieldPoints : []),
    ...lessonSections.flatMap((section) => [section.examAngle, section.commonTrap, section.clinicalConnection]),
  ].map(cleanGeneratedText).filter(Boolean);
  const highYieldPoints = uniqueTexts(derivedHighYield, 9);
  const highYieldKeys = new Set(highYieldPoints.map(compareText));
  const mustKnow = uniqueTexts(Array.isArray(rawLesson.mustKnow) ? rawLesson.mustKnow : [], 8, highYieldKeys);
  const fallbackMustKnow = uniqueTexts(lessonSections.flatMap((section) => [section.clinicalConnection, section.examAngle, section.commonTrap]), 6, highYieldKeys);
  const outputMustKnow = mustKnow.length ? mustKnow : fallbackMustKnow;
  const usedAfterMustKnow = new Set([...highYieldKeys, ...outputMustKnow.map(compareText)]);
  const finalReview = uniqueTexts(Array.isArray(rawLesson.finalReview) ? rawLesson.finalReview : [], 8, usedAfterMustKnow);
  const derivedObjectives = Array.isArray(rawLesson.learningObjectives) && rawLesson.learningObjectives.length
    ? rawLesson.learningObjectives.map((item) => cleanGeneratedText(item)).filter(isUsableLearningObjective)
    : [];
  const learningObjectives = uniqueTexts(
    derivedObjectives.length >= 3 ? derivedObjectives : lessonSections.slice(0, 5).map(buildLearningObjective),
    5,
  );
  const cleanShortIntro = cleanGeneratedText(rawLesson.shortIntro || rawLesson.summary || rawLesson.overview);
  const cleanOverview = cleanGeneratedText(rawLesson.overview || rawLesson.shortIntro);
  const cleanBigPicture = cleanGeneratedText(rawLesson.bigPicture || rawLesson.overview);
  const cleanClinicalRelevance = cleanGeneratedText(rawLesson.clinicalExamRelevance);
  const lesson = {
    title: cleanTopic(rawLesson.title || rawLesson.inferredTitle, 'Komite ders anlatımı'),
    inferredTitle: cleanTopic(rawLesson.inferredTitle || rawLesson.title, 'Komite ders anlatımı'),
    shortIntro: cleanShortIntro,
    overview: cleanOverview,
    bigPicture: cleanBigPicture,
    learningObjectives,
    mainConcepts: Array.isArray(rawLesson.mainConcepts) ? uniqueTexts(rawLesson.mainConcepts, 10) : [],
    clinicalExamRelevance: cleanClinicalRelevance,
    commonConfusions: Array.isArray(rawLesson.commonConfusions) ? uniqueTexts(rawLesson.commonConfusions, 8) : [],
    sections: lessonSections,
    highYieldPoints,
    mustKnow: outputMustKnow,
    finalReview: finalReview.length ? finalReview : uniqueTexts(lessonSections.map((section) => section.heading), 6, usedAfterMustKnow),
    materialCoverage: [],
    coverageSummary: '',
    tableOfContents: lessonSections.map((section) => section.heading),
    sourceFingerprint,
    generatedAt: Date.now(),
  };

  if (!lesson.sections.length || !lesson.learningObjectives.length) {
    throw new Error('Invalid komite lesson payload.');
  }
  return lesson;
}

function optionFeedbackById(rawFeedback = {}, options = []) {
  return OPTION_IDS.reduce((feedback, id, index) => {
    const optionText = options[index];
    const raw = rawFeedback?.[id] || rawFeedback?.[id.toLowerCase()] || rawFeedback?.[optionText];
    feedback[id] = compactText(typeof raw === 'string' ? raw : raw?.text || raw?.explanation);
    return feedback;
  }, {});
}

function resolveCorrectId(rawCorrect = '', options = []) {
  const clean = compactText(rawCorrect);
  const letter = clean.match(/^[A-E]$/iu)?.[0]?.toLocaleUpperCase('tr');
  if (letter) return letter;
  const normalizedCorrect = clean.toLocaleLowerCase('tr');
  const index = options.findIndex((option) => compactText(option).toLocaleLowerCase('tr') === normalizedCorrect);
  return OPTION_IDS[index] || '';
}

function normalizeQuestions(rawQuestions = [], sourceFingerprint = '') {
  const questions = (Array.isArray(rawQuestions) ? rawQuestions : [])
    .map((question, questionIndex) => {
      const optionTexts = Array.isArray(question.options)
        ? question.options.map((option) => compactText(typeof option === 'string' ? option : option?.text)).filter(Boolean)
        : [];
      const uniqueOptions = Array.from(new Set(optionTexts)).slice(0, 5);
      const correctOptionId = resolveCorrectId(question.correctAnswer || question.correct || question.answer, uniqueOptions);
      const optionFeedback = optionFeedbackById(question.optionFeedback || question.feedback || {}, uniqueOptions);
      if (uniqueOptions.length !== 5 || !correctOptionId || !compactText(question.stem || question.question)) return null;
      return {
        id: question.id || `komite-question-${Date.now()}-${questionIndex}`,
        questionNumber: questionIndex + 1,
        stem: compactText(question.stem || question.context),
        question: compactText(question.question || question.prompt),
        options: uniqueOptions.map((text, index) => ({ id: OPTION_IDS[index], text })),
        correctOptionId,
        explanation: compactText(question.explanation || question.rationale),
        optionFeedback,
        difficulty: normalizeDifficulty(question.difficulty),
        learningTarget: compactText(question.learningTarget || question.sourceTopic),
        sourceTopic: compactText(question.sourceTopic),
        supportingData: Array.isArray(question.supportingData) ? question.supportingData.map(compactText).filter(Boolean) : [],
        learningPoint: compactText(question.learningPoint),
        memoryNote: compactText(question.memoryNote),
        sourceFingerprint,
        generatedAt: Date.now(),
      };
    })
    .filter(Boolean);

  if (questions.length < 5) throw new Error('Invalid komite questions payload.');
  return questions.slice(0, 10);
}

function normalizeFlashcardDeck(rawDeck = {}, sourceFingerprint = '') {
  const cards = (Array.isArray(rawDeck.cards) ? rawDeck.cards : [])
    .map((card, index) => ({
      id: card.id || `komite-card-${Date.now()}-${index}`,
      front: compactText(card.front),
      back: compactText(card.back),
      explanation: compactText(card.explanation),
      examTrap: compactText(card.examTrap),
      type: compactText(card.type || card.tag || 'high_yield'),
      difficulty: normalizeDifficulty(card.difficulty || card.importance),
      tags: Array.isArray(card.tags) ? card.tags.map(compactText).filter(Boolean) : [compactText(card.sourceTopic || card.tag || 'Komite')],
      importance: compactText(card.importance),
      sourceTopic: compactText(card.sourceTopic),
      sourceFingerprint,
      generatedAt: Date.now(),
    }))
    .filter((card) => card.front && card.back);

  if (cards.length < 10) throw new Error('Invalid komite flashcard payload.');
  return {
    deckTitle: compactText(rawDeck.deckTitle) || 'Komite hap kartları',
    cards,
    sourceFingerprint,
    generatedAt: Date.now(),
  };
}

export async function generateKomiteStudyContent({ kind, payload, signal } = {}) {
  const response = await fetch('/api/generate-komite-study', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kind, ...(payload || {}) }),
    signal,
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    if (data?.debugReason) {
      console.error('[komite-study-api]', data.debugReason);
    }
    const error = new Error(data?.error || KOMITE_GENERATION_ERROR_MESSAGE);
    error.code = data?.errorCode || '';
    throw error;
  }

  try {
    if (kind === 'lesson') return { lesson: normalizeLesson(data?.lesson, data?.sourceFingerprint || payload?.sourceFingerprint || '') };
    if (kind === 'questions') return { questions: normalizeQuestions(data?.questions, data?.sourceFingerprint || payload?.sourceFingerprint || '') };
    if (kind === 'cards') return { flashcardDeck: normalizeFlashcardDeck(data?.flashcardDeck, data?.sourceFingerprint || payload?.sourceFingerprint || '') };
  } catch (error) {
    console.error('[komite-study-api]', error);
    throw new Error(KOMITE_GENERATION_ERROR_MESSAGE);
  }

  throw new Error(KOMITE_GENERATION_ERROR_MESSAGE);
}
