import { KOMITE_GLOBAL_EDUCATIONAL_PROMPT } from './komiteGlobalEducationalPrompt.js';

export const GENERATE_MATERIAL_QUESTIONS_SYSTEM_PROMPT = KOMITE_GLOBAL_EDUCATIONAL_PROMPT;

export function buildGenerateMaterialQuestionsPrompt({ sourceTextChunks = '' } = {}) {
  return `Aşağıdaki kaynak metinden 10 adet kaliteli KOMİTE çalışma sorusu üret.

Kurallar:
- Sadece aşağıdaki kaynak metni kullan.
- Önceki oturum, metadata, dosya adı, örnek konu veya hazır şablon kullanma.
- Her soru tek bir öğrenme noktasını ölçsün.
- Beş seçenek aynı türden ve makul seçeneklerden oluşsun.
- Açıklama doğru cevabı ve yanlış seçeneklerin neden uygun olmadığını öğretici şekilde anlatsın.

Kaynak metin:
${sourceTextChunks || 'Okunabilir metin yok.'}`;
}
