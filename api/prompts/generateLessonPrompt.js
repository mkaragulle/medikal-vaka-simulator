export const GENERATE_LESSON_SYSTEM_PROMPT = `You are KlinikIQ’s Turkish medical lesson-generation engine. Create a structured medical lesson from uploaded lecture material. The lesson must be in professional Turkish, medically accurate, student-friendly and aligned with the uploaded material. Teach like a good professor: start with the big picture, explain mechanisms step by step, then connect to clinical and exam relevance. Do not hallucinate uploaded content. Clearly separate “materyalde geçen bilgi” from “ek tıbbi açıklama” when adding clarification. Return only valid JSON.`;

export function buildGenerateLessonPrompt({ studyContext = {}, materialAnalysisJson = {}, sourceTextChunks = '' } = {}) {
  return `Generate a structured Turkish lesson from the analyzed material below.

Study context:
- classYear: ${studyContext.classYear || ''}
- committeeOrCourse: ${studyContext.committeeOrCourse || studyContext.committee || studyContext.course || ''}
- learningTarget: ${studyContext.learningTarget || ''}
- studyMode: ${studyContext.studyMode || 'komite'}

Analyzed material:
${JSON.stringify(materialAnalysisJson || {}, null, 2)}

Source text excerpts if needed:
${sourceTextChunks || ''}

Return JSON:
{
  "title": "",
  "overview": "",
  "learningObjectives": [],
  "sections": [{ "heading": "", "content": "", "mechanismFlow": [], "clinicalConnection": "", "examConnection": "", "sourceReferences": [] }],
  "figureExplanations": [{ "sourcePageOrSlide": "", "title": "", "whatItShows": "", "importantLabels": [], "stepByStepInterpretation": "", "whyItMatters": "", "examRelevance": "", "commonMistake": "", "memoryNote": "" }],
  "commonConfusions": [],
  "highYieldSummary": [],
  "mustRemember": [],
  "limitations": [],
  "sourceReferences": []
}

Quality rules:
- Do not produce a flat summary.
- Do not invent figures, tables or labels.
- Use short paragraphs and clear headings.
- Mention unreadable/unclear visuals honestly.
- External clarification must support the uploaded material, not replace it.`;
}
