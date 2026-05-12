import { KOMITE_GLOBAL_EDUCATIONAL_PROMPT } from './komiteGlobalEducationalPrompt.js';

export const ANALYZE_UPLOADED_MATERIAL_SYSTEM_PROMPT = `${KOMITE_GLOBAL_EDUCATIONAL_PROMPT}

Analyze the uploaded material as the first KOMİTE processing step. Clean OCR noise, infer the coherent topic, identify reliable visual/table information, and return only valid JSON in the existing analysis schema.`;

export function buildAnalyzeUploadedMaterialPrompt({ metadata = {}, extractedTextOrChunks = '', detectedStructureOrFigures = '' } = {}) {
  return `Analyze the uploaded material using the metadata and extracted content below. Treat all uploaded files in this workspace as one coherent course material unless explicitly separated by the user.

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
- Infer a clean academic materialTitle from the real topic, never from raw filenames, dates, page numbers, or instructor names.
- Do not claim a figure was analyzed if it was not visible/readable.
- Use “unclear” when content is not readable.
- Keep output structured and concise.
- Everything user-facing must be in Turkish.`;
}
