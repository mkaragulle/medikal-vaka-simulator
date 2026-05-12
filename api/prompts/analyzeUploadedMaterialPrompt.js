export const ANALYZE_UPLOADED_MATERIAL_SYSTEM_PROMPT = `You are KlinikIQ’s medical lecture-material analysis engine. Analyze uploaded medical school lecture material for Turkish medical education. Extract structure, important concepts, figure/table references, learning objectives, mechanisms, clinical relevance and exam-relevant points. Do not hallucinate. If a figure, table, slide title or text is missing or unreadable, mark it as unclear. Separate information directly found in the uploaded material from medical clarification added by you. Return only valid JSON in professional Turkish.`;

export function buildAnalyzeUploadedMaterialPrompt({ metadata = {}, extractedTextOrChunks = '', detectedStructureOrFigures = '' } = {}) {
  return `Analyze the uploaded material using the metadata and extracted content below.

Material metadata:
- fileName: ${metadata.fileName || ''}
- fileType: ${metadata.fileType || ''}
- classYear: ${metadata.classYear || ''}
- committeeOrCourse: ${metadata.committeeOrCourse || metadata.committee || metadata.course || ''}
- learningTarget: ${metadata.learningTarget || ''}
- studyMode: ${metadata.studyMode || 'komite'}

Extracted content:
${extractedTextOrChunks || 'No readable text was provided.'}

Detected pages/slides/figures if available:
${detectedStructureOrFigures || 'No detected visual structure was provided.'}

Return JSON:
{
  "materialTitle": "",
  "detectedCourseOrTopic": "",
  "sourceQuality": { "readableText": true, "figuresDetected": false, "tablesDetected": false, "limitations": [] },
  "lectureStructure": [{ "sectionTitle": "", "sourcePages": [], "mainIdeas": [], "importantDetails": [] }],
  "keyConcepts": [],
  "mechanisms": [],
  "clinicalRelevance": [],
  "examRelevance": [],
  "figureTableNotes": [{ "sourcePageOrSlide": "", "type": "figure|table|diagram|graph|image|unclear", "visibleContent": "", "importantLabels": [], "interpretation": "", "limitations": "" }],
  "commonConfusions": [],
  "recommendedLessonPlan": [],
  "questionGenerationTargets": [],
  "flashcardGenerationTargets": [],
  "sourceReferences": []
}

Quality rules:
- Do not invent slide content.
- Do not claim a figure was analyzed if it was not visible/readable.
- Use “unclear” when content is not readable.
- Keep output structured and concise.
- Everything user-facing must be in Turkish.`;
}
