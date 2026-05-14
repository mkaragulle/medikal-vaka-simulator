import { KOMITE_GLOBAL_EDUCATIONAL_PROMPT } from './komiteGlobalEducationalPrompt.js';

export const GENERATE_FLASHCARDS_SYSTEM_PROMPT = KOMITE_GLOBAL_EDUCATIONAL_PROMPT;

export function buildGenerateFlashcardsPrompt({ sourceTextChunks = '', materialId = '' } = {}) {
  return `Aşağıdaki metinden kaliteli aktif hatırlama kartları üret. Sadece bu metni kullan. Eski oturum, metadata, dosya adı veya örnek konu kullanma.

Metin:
${sourceTextChunks || 'Okunabilir metin yok.'}

Sadece şu JSON yapısıyla dön:
{
  "deck": {
    "id": "",
    "deckTitle": "",
    "materialId": "${materialId}",
    "cards": [
      { "id": "", "type": "definition|mechanism|comparison|clinical_clue|exam_trap|visual|treatment|differential|must_know", "difficulty": "easy|medium|hard", "front": "", "back": "", "explanation": "", "sourceReference": "", "tags": [], "isFavorite": false, "isDifficult": false, "repeatStatus": "new" }
    ]
  }
}`;
}
