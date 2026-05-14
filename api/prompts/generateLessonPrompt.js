import { KOMITE_GLOBAL_EDUCATIONAL_PROMPT } from './komiteGlobalEducationalPrompt.js';

export const GENERATE_LESSON_SYSTEM_PROMPT = KOMITE_GLOBAL_EDUCATIONAL_PROMPT;

export function buildGenerateLessonPrompt({ sourceTextChunks = '' } = {}) {
  return `Aşağıdaki metni kullanarak profesyonel, anlaşılır ve detaylı bir Türkçe konu anlatımı hazırla.

Kurallar:
- Sadece aşağıdaki metni kullan.
- Eski oturum, eski çıktı, örnek konu, dosya adı, metadata veya şablon kullanma.
- Metinde olmayan konuları ekleme.
- Ham OCR kırıntılarını, teknik alan adlarını, sayfa/dosya etiketlerini ve JSON anahtarlarını kullanıcıya gösterme.
- Metni kopyalama; anlamlı başlıklara ayır, açıklayıcı ve öğretici şekilde yeniden anlat.
- Bölümleri kavram mantığına göre sırala.
- Eğer metinde mekanizma, karşılaştırma, klinik bağlantı, tablo/görsel açıklaması veya sınav açısından önemli ayrım varsa bunları açık ve doğal şekilde anlat.

Metin:
${sourceTextChunks || 'Okunabilir metin yok.'}

Sadece şu JSON yapısıyla dön:
{
  "title": "",
  "shortIntro": "",
  "learningObjectives": [],
  "bigPicture": "",
  "mainConcepts": [],
  "sections": [
    {
      "heading": "",
      "teachingText": "",
      "mechanismFlow": [],
      "examAngle": "",
      "commonTrap": "",
      "whyItMatters": "",
      "sourceReferences": []
    }
  ],
  "visualNotes": [],
  "figureExplanations": [],
  "clinicalExamRelevance": "",
  "commonConfusions": [],
  "highYieldPoints": [],
  "mustKnow": [],
  "limitations": [],
  "sourceReferences": []
}`;
}
