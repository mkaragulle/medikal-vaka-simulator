import { KOMITE_GLOBAL_EDUCATIONAL_PROMPT } from './komiteGlobalEducationalPrompt.js';

export const GENERATE_MATERIAL_QUESTIONS_SYSTEM_PROMPT = KOMITE_GLOBAL_EDUCATIONAL_PROMPT;

export function buildGenerateMaterialQuestionsPrompt({ sourceTextChunks = '', generatedLessonJson = {} } = {}) {
  return `Aşağıdaki mevcut kaynak metinden 10 adet kaliteli KOMITE çalışma sorusu üret. Sadece kaynak metni kullan; eski oturum, metadata, örnek konu veya dosya adı kullanma.

Kaynak metin:
${sourceTextChunks || 'Okunabilir kaynak metin yok.'}

Varsa mevcut ders özeti:
${JSON.stringify(generatedLessonJson || {}, null, 2)}

JSON şeması:
{
  "questions": [
    {
      "id": "",
      "questionNumber": 1,
      "difficulty": "easy|medium|hard",
      "learningTarget": "",
      "stem": "",
      "supportingData": [],
      "question": "",
      "options": [{ "id": "A", "text": "" }, { "id": "B", "text": "" }, { "id": "C", "text": "" }, { "id": "D", "text": "" }, { "id": "E", "text": "" }],
      "correctOptionId": "A",
      "explanation": "",
      "optionFeedback": { "A": "", "B": "", "C": "", "D": "", "E": "" },
      "learningPoint": "",
      "memoryNote": ""
    }
  ]
}

Kurallar:
- Her soru tek öğrenme hedefini ölçsün.
- Beş seçenek aynı kategoriden ve makul çeldiricilerden oluşsun.
- Açıklamalar öğretici olsun, "Doğru/Yanlış" gibi kısa kalmasın.
- Ham kaynak etiketi, dosya adı, JSON alan adı veya OCR kırıntısı yazma.
- Sadece JSON döndür.`;
}
