import { KOMITE_GLOBAL_EDUCATIONAL_PROMPT } from './komiteGlobalEducationalPrompt.js';

export const GENERATE_LESSON_SYSTEM_PROMPT = KOMITE_GLOBAL_EDUCATIONAL_PROMPT;

export function buildGenerateLessonPrompt({ studyContext = {}, sourceTextChunks = '', filesUploadedCount = 0 } = {}) {
  return `Aşağıdaki kaynak metni kullanarak profesyonel, anlaşılır ve detaylı bir Türkçe ders anlatımı hazırla.

Kaynak sınırı:
- Yalnızca aşağıdaki kaynak metni kullan.
- Önceki oturum, eski çıktı, dosya adı, metadata, örnek konu veya dış şablon kullanma.
- Kaynak metinde olmayan bir konuyu ekleme.
- Kaynak metindeki bozuk OCR parçalarını, sayfa işaretlerini ve alan adlarını kullanıcıya gösterme.

Çalışma bağlamı:
${JSON.stringify({
  classYear: studyContext.classYear || '',
  committeeOrCourse: studyContext.committeeOrCourse || '',
  learningTarget: studyContext.learningTarget || '',
  filesUploadedCount: filesUploadedCount || 0,
}, null, 2)}

Kaynak metin:
${sourceTextChunks || 'Okunabilir kaynak metin yok.'}

Ders anlatımı şu JSON şemasıyla dönmeli:
{
  "title": "",
  "shortIntro": "",
  "sourceCoverage": { "filesAnalyzedCount": 0, "usedFiles": [], "coverageNote": "" },
  "learningObjectives": [],
  "bigPicture": "",
  "mainConcepts": [],
  "sections": [
    { "heading": "", "teachingText": "", "mechanismFlow": [], "examAngle": "", "commonTrap": "", "whyItMatters": "", "sourceReferences": [] }
  ],
  "visualNotes": [],
  "figureExplanations": [],
  "clinicalExamRelevance": "",
  "commonConfusions": [],
  "highYieldPoints": [],
  "mustKnow": [],
  "limitations": [],
  "sourceReferences": [],
  "qualityCheck": { "usesAllFiles": true, "notSlideBySlide": true, "noRawOCR": true, "noMeaninglessTags": true, "sectionDepthAdequate": true }
}

Yazım kuralları:
- title dosya adı gibi değil, metnin gerçek konusundan çıkarılmış akademik bir başlık olmalı.
- shortIntro kısa ama öğretici bir giriş paragrafı olmalı.
- bigPicture kaynak metnin ana mantığını birkaç bağlantılı paragrafta açıklamalı.
- sections ana kavramlara göre düzenlenmeli; her bölümde sadece başlık değil, gerçek açıklama olmalı.
- highYieldPoints ve mustKnow kısa, net ve sınav/tekrar için işe yarar olmalı.
- Emin olmadığın görsel, tablo veya bozuk OCR içeriğini kesin bilgi gibi yorumlama.
- Kullanıcıya "dosya analiz edildi", "kaynak metin", "field", "cleanedExtractedText" gibi teknik ifadeler gösterme.
- Sadece JSON döndür.`;
}
