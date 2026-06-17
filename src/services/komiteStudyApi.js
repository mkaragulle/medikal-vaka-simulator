export const KOMITE_GENERATION_ERROR_MESSAGE = 'Komite çalışma içeriği şu anda oluşturulamadı. Lütfen tekrar deneyin.';

const OPTION_IDS = ['A', 'B', 'C', 'D', 'E'];

function compactText(value = '') {
  if (Array.isArray(value)) return value.map(compactText).filter(Boolean).join(' ');
  if (value && typeof value === 'object') {
    return compactText(value.text || value.content || value.explanation || value.summary || value.value || '');
  }
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function normalizeDifficulty(value = 'medium') {
  const clean = compactText(value).toLocaleLowerCase('tr');
  if (['hard', 'zor'].includes(clean)) return 'hard';
  if (['easy', 'kolay'].includes(clean)) return 'easy';
  return 'medium';
}

function normalizeFigure(figure = {}, index = 0) {
  const sourceFile = compactText(figure.sourceFile);
  const pageOrSlide = compactText(figure.pageOrSlide || figure.sourcePageOrSlide);
  return {
    id: figure.id || `komite-figure-${Date.now()}-${index}`,
    sourceFile,
    pageOrSlide,
    sourcePageOrSlide: compactText(figure.sourcePageOrSlide) || [sourceFile, pageOrSlide].filter(Boolean).join(' · ') || 'Materyal geneli',
    type: compactText(figure.type) || 'görsel / tablo',
    title: compactText(figure.title) || 'Görsel / tablo notu',
    whatCanBeSaidSafely: compactText(figure.whatCanBeSaidSafely || figure.description || figure.interpretation),
    visibleTextAroundFigure: compactText(figure.visibleTextAroundFigure || figure.visibleText || figure.preview),
    limitations: compactText(figure.limitations) || 'Yalnızca okunabilen metin ve bağlam yorumlandı; görünmeyen piksel içeriği uydurulmadı.',
    examRelevance: compactText(figure.examRelevance),
    relatedTopic: compactText(figure.relatedTopic || figure.sourceTopic),
    analysisStatus: ['analyzed', 'partial', 'unavailable'].includes(figure.analysisStatus) ? figure.analysisStatus : 'partial',
  };
}

function normalizeLesson(rawLesson = {}, sourceFingerprint = '') {
  const sections = Array.isArray(rawLesson.sections)
    ? rawLesson.sections
    : rawLesson.sections && typeof rawLesson.sections === 'object'
      ? Object.entries(rawLesson.sections).map(([heading, value]) => ({ heading, content: value }))
      : [];
  const normalizedSections = sections.map((section, index) => ({
    id: section.id || `komite-section-${index + 1}`,
    heading: compactText(section.heading || section.title) || `Bölüm ${index + 1}`,
    level: Number(section.level) || 2,
    teachingText: compactText(section.teachingText || section.content || section.coreExplanation || section.bigPicture || section.summary),
    content: compactText(section.content || section.teachingText || section.coreExplanation || section.bigPicture || section.summary),
    mechanismFlow: Array.isArray(section.mechanismFlow) ? section.mechanismFlow.map(compactText).filter(Boolean) : [],
    clinicalConnection: compactText(section.clinicalConnection || section.clinicalOrPracticalConnection),
    examAngle: compactText(section.examAngle || section.examConnection || section.examFocus),
    commonTrap: compactText(section.commonTrap || section.commonConfusions),
    keyBoxes: Array.isArray(section.keyBoxes) ? section.keyBoxes : [],
    sourceRefs: Array.isArray(section.sourceRefs || section.relatedSourceFiles)
      ? (section.sourceRefs || section.relatedSourceFiles).map(compactText).filter(Boolean)
      : [],
  })).filter((section) => section.heading && section.teachingText);
  const fallbackText = compactText(
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
        heading: compactText(rawLesson.title || rawLesson.inferredTitle) || 'Konu anlatımı',
        level: 2,
        teachingText: fallbackText,
        content: fallbackText,
        mechanismFlow: [],
        clinicalConnection: compactText(rawLesson.clinicalExamRelevance),
        examAngle: compactText(rawLesson.examFocus),
        commonTrap: '',
        keyBoxes: [],
        sourceRefs: [],
      }]
      : [];
  const derivedHighYield = [
    ...(Array.isArray(rawLesson.highYieldPoints) ? rawLesson.highYieldPoints : []),
    ...(Array.isArray(rawLesson.mustKnow) ? rawLesson.mustKnow : []),
    ...(Array.isArray(rawLesson.finalReview) ? rawLesson.finalReview : []),
    ...lessonSections.flatMap((section) => [section.examAngle, section.commonTrap, section.clinicalConnection]),
  ].map(compactText).filter(Boolean);
  const derivedObjectives = Array.isArray(rawLesson.learningObjectives) && rawLesson.learningObjectives.length
    ? rawLesson.learningObjectives.map(compactText).filter(Boolean)
    : lessonSections.slice(0, 4).map((section) => `${section.heading} başlığının mekanizma ve sınav bağlantısını açıklayabilmek.`);
  const lesson = {
    title: compactText(rawLesson.title || rawLesson.inferredTitle) || 'Komite ders anlatımı',
    inferredTitle: compactText(rawLesson.inferredTitle || rawLesson.title) || 'Komite ders anlatımı',
    shortIntro: compactText(rawLesson.shortIntro || rawLesson.summary || rawLesson.overview),
    overview: compactText(rawLesson.overview || rawLesson.shortIntro),
    bigPicture: compactText(rawLesson.bigPicture || rawLesson.overview),
    learningObjectives: derivedObjectives,
    mainConcepts: Array.isArray(rawLesson.mainConcepts) ? rawLesson.mainConcepts.map(compactText).filter(Boolean) : [],
    clinicalExamRelevance: compactText(rawLesson.clinicalExamRelevance),
    commonConfusions: Array.isArray(rawLesson.commonConfusions) ? rawLesson.commonConfusions.map(compactText).filter(Boolean) : [],
    sections: lessonSections,
    highYieldPoints: derivedHighYield.slice(0, 9),
    mustKnow: (Array.isArray(rawLesson.mustKnow) ? rawLesson.mustKnow.map(compactText).filter(Boolean) : derivedHighYield).slice(0, 8),
    finalReview: (Array.isArray(rawLesson.finalReview) ? rawLesson.finalReview.map(compactText).filter(Boolean) : derivedHighYield).slice(0, 8),
    figureExplanations: Array.isArray(rawLesson.figureExplanations) ? rawLesson.figureExplanations.map(normalizeFigure) : [],
    materialCoverage: Array.isArray(rawLesson.materialCoverage)
      ? rawLesson.materialCoverage.map((item, index) => ({
        fileName: compactText(item.fileName) || `Materyal ${index + 1}`,
        detectedMainTopic: compactText(item.detectedMainTopic),
        representedIn: compactText(item.representedIn),
        coverageNote: compactText(item.coverageNote),
      })).filter((item) => item.fileName)
      : [],
    coverageSummary: compactText(rawLesson.coverageSummary),
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
