import { KOMITE_GLOBAL_EDUCATIONAL_PROMPT } from './komiteGlobalEducationalPrompt.js';

export const GENERATE_FLASHCARDS_SYSTEM_PROMPT = KOMITE_GLOBAL_EDUCATIONAL_PROMPT;

export function buildGenerateFlashcardsPrompt({ sourceTextChunks = '' } = {}) {
  return `Aşağıdaki kaynak metinden aktif hatırlama için kısa ve kaliteli hap kartlar üret.

Kurallar:
- Sadece aşağıdaki kaynak metni kullan.
- Önceki oturum, metadata, dosya adı, örnek konu veya hazır şablon kullanma.
- 12-18 kart üret.
- Her kart tek bir anlamlı bilgiyi veya ayrımı ölçsün.
- Kart önü soru şeklinde olsun; kart arkası kısa ama tam cevap versin.
- Açıklama öğrencinin cevabın nedenini anlamasına yardım etsin.

Kaynak metin:
${sourceTextChunks || 'Okunabilir metin yok.'}`;
}
