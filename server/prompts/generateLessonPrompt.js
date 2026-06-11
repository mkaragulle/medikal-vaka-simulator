import { KOMITE_GLOBAL_EDUCATIONAL_PROMPT } from './komiteGlobalEducationalPrompt.js';

export const GENERATE_LESSON_SYSTEM_PROMPT = KOMITE_GLOBAL_EDUCATIONAL_PROMPT;

export function buildGenerateLessonPrompt({ sourceTextChunks = '' } = {}) {
  return `Aşağıdaki kaynak metni okuyup profesyonel, açık ve çalışılabilir bir Türkçe konu anlatımına dönüştür.

İstenen çıktı:
- Markdown kullan.
- En üstte dosya adından bağımsız, kısa ve akademik bir başlık yaz.
- Ardından 1 kısa giriş paragrafı yaz.
- "## Öğrenme hedefleri" başlığı altında gerçek çalışma hedefleri yaz.
- "## Büyük resim" başlığı altında konunun ana mantığını açıkla.
- Sonra yalnızca 5-8 ana başlığı "##" ile ver ve her başlığı açıklayıcı paragraflarla anlat.
- İşlem adımları, alt maddeler, örnekler ve kısa cümleler ayrı ana başlık yapılmamalı; ilgili ana başlığın içinde madde işareti olarak kalmalı.
- En sonda "## Can alıcı noktalar" ve "## Mutlaka hatırla" bölümlerini ekle.

Kurallar:
- Sadece aşağıdaki kaynak metni kullan.
- Önceki oturum, eski çıktı, örnek konu, dosya adı, metadata veya hazır şablon kullanma.
- Kullanıcıya teknik alan adları, dosya etiketleri veya ham OCR kırıntıları gösterme.
- Metni aynen kopyalama; anlamı koruyarak açık ve öğretici biçimde yeniden anlat.
- Gereksiz uzatma; fakat ana kavramları, ilişkileri, ayrımları ve sınav için önemli noktaları eksik bırakma.
- Kaynakta açıkça desteklenmeyen ayrıntıları kesin bilgi gibi ekleme.
- Başlık ve ara başlıklar kavramsal olmalı; dosya adı, sayfa bilgisi, metin türü veya yükleme bilgisi başlık olarak kullanılmamalı.

Kaynak metin:
${sourceTextChunks || 'Okunabilir metin yok.'}`;
}
