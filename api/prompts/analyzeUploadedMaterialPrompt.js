import { KOMITE_GLOBAL_EDUCATIONAL_PROMPT } from './komiteGlobalEducationalPrompt.js';

export const ANALYZE_UPLOADED_MATERIAL_SYSTEM_PROMPT = KOMITE_GLOBAL_EDUCATIONAL_PROMPT;

export function buildAnalyzeUploadedMaterialPrompt({ metadata = {}, extractedTextOrChunks = '' } = {}) {
  return `Aşağıdaki mevcut kaynak metni kısaca analiz et ve sadece JSON döndür. Eski oturum, metadata veya dosya adından konu üretme.

Bağlam:
${JSON.stringify({
  classYear: metadata.classYear || '',
  committeeOrCourse: metadata.committeeOrCourse || metadata.committee || metadata.course || '',
  learningTarget: metadata.learningTarget || '',
}, null, 2)}

Kaynak metin:
${extractedTextOrChunks || 'Okunabilir kaynak metin yok.'}

JSON şeması:
{
  "materialTitle": "",
  "detectedCourseOrTopic": "",
  "sourceQuality": { "readableText": true, "figuresDetected": false, "tablesDetected": false, "limitations": [] },
  "lectureStructure": [{ "sectionTitle": "", "sourcePages": [], "mainIdeas": [], "importantDetails": [] }],
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
}

Kurallar:
- Kullanıcıya görünecek hiçbir alanda ham OCR, dosya adı, JSON anahtarı veya metadata yazma.
- Kaynakta olmayan konu ekleme.
- Kısa, temiz ve Türkçe yaz.`;
}
