import { KOMITE_GLOBAL_EDUCATIONAL_PROMPT } from './komiteGlobalEducationalPrompt.js';

export const GENERATE_FLASHCARDS_SYSTEM_PROMPT = KOMITE_GLOBAL_EDUCATIONAL_PROMPT;

export function buildGenerateFlashcardsPrompt({ sourceTextChunks = '', materialId = '', generatedLessonJson = {} } = {}) {
  return `Aşağıdaki mevcut kaynak metinden kaliteli aktif hatırlama kartları üret. Sadece kaynak metni kullan; eski oturum, metadata, örnek konu veya dosya adı kullanma.

Kaynak metin:
${sourceTextChunks || 'Okunabilir kaynak metin yok.'}

Varsa mevcut ders özeti:
${JSON.stringify(generatedLessonJson || {}, null, 2)}

JSON şeması:
{
  "deck": {
    "id": "",
    "deckTitle": "",
    "materialId": "${materialId}",
    "cards": [
      { "id": "", "type": "definition|mechanism|comparison|clinical_clue|exam_trap|visual|treatment|differential|must_know", "difficulty": "easy|medium|hard", "front": "", "back": "", "explanation": "", "sourceReference": "", "tags": [], "isFavorite": false, "isDifficult": false, "repeatStatus": "new" }
    ]
  }
}

Kurallar:
- front gerçek bir aktif hatırlama sorusu olsun.
- back kısa ama tam cevap olsun.
- explanation 1-3 cümlelik öğretici açıklama olsun.
- Ham kaynak etiketi, dosya adı, JSON alan adı veya OCR kırıntısı yazma.
- Sadece JSON döndür.`;
}
