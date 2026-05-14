import { KOMITE_GLOBAL_EDUCATIONAL_PROMPT } from './komiteGlobalEducationalPrompt.js';

export const GENERATE_LESSON_SYSTEM_PROMPT = KOMITE_GLOBAL_EDUCATIONAL_PROMPT;

export function buildGenerateLessonPrompt({ sourceTextChunks = '' } = {}) {
  return `Aşağıdaki kaynak metni okuyup profesyonel, detaylı ve düzenli bir Türkçe konu anlatımına dönüştür.

Kurallar:
- Sadece aşağıdaki kaynak metni kullan.
- Önceki oturum, eski çıktı, örnek konu, dosya adı, metadata veya hazır şablon kullanma.
- Kullanıcıya teknik alan adları, dosya etiketleri, JSON anahtarları veya ham OCR kırıntıları gösterme.
- Metni aynen kopyalama; anlamı koruyarak açık başlıklar altında öğretici şekilde yeniden yaz.
- Başlıkları konunun kendi akışına göre düzenle.
- Kaynakta açıkça desteklenmeyen ayrıntıları kesin bilgi gibi ekleme.

Kaynak metin:
${sourceTextChunks || 'Okunabilir metin yok.'}`;
}
