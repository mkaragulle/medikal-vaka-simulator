import { KOMITE_GLOBAL_EDUCATIONAL_PROMPT } from './komiteGlobalEducationalPrompt.js';

export const ANALYZE_UPLOADED_MATERIAL_SYSTEM_PROMPT = KOMITE_GLOBAL_EDUCATIONAL_PROMPT;

export function buildAnalyzeUploadedMaterialPrompt({ extractedTextOrChunks = '' } = {}) {
  return `Aşağıdaki metni kısa ve düzenli şekilde analiz et. Sadece bu metni kullan. Eski oturum, dosya adı, metadata, örnek konu veya hazır şablon kullanma.

Metin:
${extractedTextOrChunks || 'Okunabilir metin yok.'}

Sadece şu JSON yapısıyla dön:
{
  "materialTitle": "",
  "detectedCourseOrTopic": "",
  "sourceQuality": { "readableText": true, "figuresDetected": false, "tablesDetected": false, "limitations": [] },
  "lectureStructure": [],
  "keyConcepts": [],
  "mechanisms": [],
  "clinicalRelevance": [],
  "examRelevance": [],
  "figureTableNotes": [],
  "commonConfusions": [],
  "recommendedLessonPlan": [],
  "questionGenerationTargets": [],
  "flashcardGenerationTargets": [],
  "sourceReferences": []
}`;
}
