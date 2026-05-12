export const GENERATE_LESSON_SYSTEM_PROMPT = `You are KlinikIQ's KOMITE lesson engine. Produce a natural Turkish medical lecture based primarily on uploaded material. Teach like a clear professor: big idea first, mechanism/cause-effect second, exam angle third. Do not write a mechanical report, do not repeat empty headings, and do not claim visual/figure interpretation unless the text explicitly supports it. Return only valid JSON.`;

export function buildGenerateLessonPrompt({ studyContext = {}, materialAnalysisJson = {}, sourceTextChunks = '' } = {}) {
  return `Create a concise but high-yield Turkish KOMITE lesson from this material.

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
- Explain the topic from zero in a logical order; do not merely summarize slides.
- Avoid repeated “klinik bağlantı/sınav bağlantısı” formula. Use examAngle/commonTrap only when useful.
- Each section should contain short dense paragraphs, not long flat text.
- Mechanisms should be written as cause → intermediate step → consequence.
- Learning objectives: 4-6 items max.
- High-yield/must-know items must be decision-level exam points, not generic definitions.
- If information is not in the material but needed for clarification, mark it as “Ek açıklama”. Use sparingly.
- If visual pixels were not analyzed, say only that readable text around the figure was analyzed. Never invent figure content.`;
}
