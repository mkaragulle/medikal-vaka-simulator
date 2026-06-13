import { KOMITE_GLOBAL_EDUCATIONAL_PROMPT } from './komiteGlobalEducationalPrompt.js';

export const GENERATE_MATERIAL_QUESTIONS_SYSTEM_PROMPT = KOMITE_GLOBAL_EDUCATIONAL_PROMPT;

export function buildGenerateMaterialQuestionsPrompt({ sourceTextChunks = '' } = {}) {
  return `Aşağıdaki kaynak metinden 10 adet kaliteli KOMİTE çalışma sorusu üret.

Kurallar:
- Sadece aşağıdaki kaynak metni kullan.
- Önceki oturum, metadata, dosya adı, örnek konu veya hazır şablon kullanma.
- Her soru tek bir öğrenme noktasını ölçsün.
- Önce soru hedefini belirle: tanı, tedavi, ilk adım, ileri test, mekanizma, komplikasyon veya temel kavram.
- Kök, doğru cevabı seçtirecek kadar yeterli ayırt ettirici veri içersin; eksik veriyle çözülemeyen soruyu "zor" gibi yazma.
- Kök veya supportingData içinde görünmeyen hasta-özel/veri-özel bilgiyi explanation ya da optionFeedback içinde kullanma.
- Beş seçenek aynı karar türünden, makul ama tek doğru cevaplı seçeneklerden oluşsun.
- correctOptionId alanını yalnızca kök + supportingData gerçekten o seçeneği destekliyorsa seç.
- Başka bir seçenek kökle daha güçlü uyumluysa soruyu yeniden kur; açıklamayla hatalı cevabı savunma.
- optionFeedback A-E için zorunludur; her feedback seçenek özelinde, bilimsel ve ayırt ettirici olsun.
- Yanlış seçenek feedbacki, o seçeneğin hangi durumda doğru olabileceğini ve bu soruda neden elendiğini anlatabilsin.
- "Bu seçenek klinik bağlamda öncelikli değildir", "verilen bulgularla yeterince uyumlu değildir", "temel karar noktasını açıklamaz", "bu nedenle uygun değildir" gibi boş/fallback cümleleri tek başına kullanma.
- Açıklama doğru cevabı ve yanlış seçeneklerin neden uygun olmadığını öğretici şekilde anlatsın; açıklamadaki kritik veri kökte veya supportingData içinde görünür olmalı.
- difficulty rastgele verilmesin: easy klasik/tek basamak, medium ayırıcı yorum, hard çoklu veri entegrasyonu olsun.
- Karakter/sentence limitine uymak için metni kesme; kırık cümle, üç nokta veya otomatik üretim izi bırakma.
- JSON şemasındaki alan adlarını aynen kullan: stem, supportingData, question, options, correctOptionId, explanation, optionFeedback, learningPoint, memoryNote.

Kaynak metin:
${sourceTextChunks || 'Okunabilir metin yok.'}`;
}
