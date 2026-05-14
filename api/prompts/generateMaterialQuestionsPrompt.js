import { KOMITE_GLOBAL_EDUCATIONAL_PROMPT } from './komiteGlobalEducationalPrompt.js';

export const GENERATE_MATERIAL_QUESTIONS_SYSTEM_PROMPT = KOMITE_GLOBAL_EDUCATIONAL_PROMPT;

export function buildGenerateMaterialQuestionsPrompt({ sourceTextChunks = '' } = {}) {
  return `Aşağıdaki metinden 10 adet kaliteli KOMITE çalışma sorusu üret. Sadece bu metni kullan. Eski oturum, metadata, dosya adı veya örnek konu kullanma.

Metin:
${sourceTextChunks || 'Okunabilir metin yok.'}

Sadece şu JSON yapısıyla dön:
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
}`;
}
