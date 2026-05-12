import { KOMITE_GLOBAL_EDUCATIONAL_PROMPT } from './komiteGlobalEducationalPrompt.js';

export const GENERATE_LESSON_SYSTEM_PROMPT = `${KOMITE_GLOBAL_EDUCATIONAL_PROMPT}

Return only valid JSON using the existing lesson schema. Preserve the schema exactly; improve the educational quality inside each field.`;

export function buildGenerateLessonPrompt({ studyContext = {}, materialAnalysisJson = {}, sourceTextChunks = '' } = {}) {
  return `Create a professional, coherent, memorable Turkish KOMITE lesson from this material. Synthesize the whole uploaded workspace as one connected course material, not as slide-by-slide notes.

Context:
- classYear: ${studyContext.classYear || ''}
- committeeOrCourse: ${studyContext.committeeOrCourse || studyContext.committee || studyContext.course || ''}
- learningTarget: ${studyContext.learningTarget || ''}

Material analysis compact JSON:
${JSON.stringify(materialAnalysisJson || {}, null, 2)}

Source excerpts:
${sourceTextChunks || ''}

Return only this JSON shape:
{
  "title": "",
  "shortIntro": "",
  "bigPicture": "",
  "clinicalExamRelevance": "",
  "commonConfusions": [{ "confusion": "", "correctDistinction": "", "whyConfused": "", "memoryClarification": "" }],
  "learningObjectives": [],
  "coreExplanation": [
    { "heading": "", "teachingText": "", "mechanismFlow": [], "examAngle": "", "commonTrap": "" }
  ],
  "sections": [
    { "heading": "", "teachingText": "", "mechanismFlow": [], "examAngle": "", "commonTrap": "", "sourceReferences": [] }
  ],
  "visualNotes": [],
  "figureExplanations": [
    { "sourcePageOrSlide": "", "analysisStatus": "analyzed|partial|unavailable", "type": "figure|table|diagram|graph|image|unknown", "visibleTextAroundFigure": "", "whatCanBeSaidSafely": "", "limitations": "", "examRelevance": "" }
  ],
  "highYieldPoints": [],
  "mustKnow": [],
  "limitations": [],
  "sourceReferences": []
}

Rules:
- Map Academic title → title, Short overview → shortIntro, Big picture → bigPicture, Main lesson → sections/coreExplanation, Figure/table explanations → figureExplanations/visualNotes, Clinical/exam relevance → clinicalExamRelevance, Common confusions → commonConfusions, High-yield summary → highYieldPoints, Must remember → mustKnow.
- Explain the topic from zero in a logical order; do not merely summarize slides.
- Avoid repeated “klinik bağlantı/sınav bağlantısı” formula. Use examAngle/commonTrap only when useful.
- Each section should contain short dense paragraphs, not long flat text.
- Mechanisms should be written as cause → intermediate step → consequence.
- Learning objectives: 4-6 items max.
- High-yield/must-know items must be decision-level exam points, not generic definitions.
- If information is not in the material but needed for clarification, mark it as “Ek açıklama”. Use sparingly.
- If visual pixels were not analyzed, say only that readable text around the figure was analyzed. Never invent figure content.`;
}
