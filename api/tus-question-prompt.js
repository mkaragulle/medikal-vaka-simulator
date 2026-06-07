// KlinikIQ — V408 compact TUS AI prompt setup
// Purpose: low-cost Turkish TUS-quality single-best-answer questions with a stable JSON contract.

function cleanText(value = '') {
  return String(value ?? '')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function truncateText(value = '', max = 80) {
  const text = cleanText(value);
  if (text.length <= max) return text;
  return `${text.slice(0, max).replace(/\s+\S*$/u, '')}…`;
}

function optionTextList(item = {}) {
  const raw = Array.isArray(item.optionTexts)
    ? item.optionTexts
    : Array.isArray(item.options)
      ? item.options.map((option) => (typeof option === 'string' ? option : option?.text || option?.label || ''))
      : [];
  return raw.map(cleanText).filter(Boolean).slice(0, 5);
}

function correctFromSummary(item = {}) {
  if (item.correctAnswer && ['A', 'B', 'C', 'D', 'E'].includes(String(item.correctAnswer).toUpperCase())) return String(item.correctAnswer).toUpperCase();
  if (item.correct) return item.correct;
  if (item.correctAnswerText) return item.correctAnswerText;
  if (item.correctAnswer && Array.isArray(item.optionTexts)) {
    const index = ['A', 'B', 'C', 'D', 'E'].indexOf(String(item.correctAnswer).toUpperCase());
    return index >= 0 ? item.optionTexts[index] : item.correctAnswer;
  }
  return item.correctAnswer || '';
}

function correctTextFromSummary(item = {}) {
  if (item.correctAnswerText) return item.correctAnswerText;
  if (item.correct && !['A', 'B', 'C', 'D', 'E'].includes(String(item.correct).toUpperCase())) return item.correct;
  const options = optionTextList(item);
  const letter = String(item.correctAnswer || item.correct || '').toUpperCase();
  const index = ['A', 'B', 'C', 'D', 'E'].indexOf(letter);
  return index >= 0 ? options[index] || letter : cleanText(item.correctAnswer || '');
}

export function normalizeDifficulty(value = 'Orta') {
  const text = cleanText(value).toLocaleLowerCase('tr');
  if (/kolay|easy/.test(text)) return 'Kolay';
  if (/zor|hard/.test(text)) return 'Zor';
  return 'Orta';
}

export const OPTIMIZED_TUS_SYSTEM_PROMPT = `KlinikIQ için tek doğru cevaplı, öğretici ve temiz Türkçe TUS sorusu üret. Sadece geçerli kompakt JSON döndür.

Kalite sözleşmesi:
1) Kök/panel tek başına çözdürmeli. Açıklama veya feedbackte kullanılan hasta-özel veri mutlaka stem, compactVitals veya compactObjectiveData içinde görünmeli; gizli BT/MR bulgusu, lab değeri, eşik, stabilite, invazyon, grade, tedavi başarısızlığı ekleme.
2) İki seçenek savunulabiliyorsa köke ayırt ettirici eşik, zamanlama, stabilite, kontrendikasyon veya amaç ekle; netleştiremiyorsan soru hedefini değiştir.
3) Şıklar aynı kategoriden, benzer uzunlukta ve benzer teknik seviyede olsun; doğru şık daha uzun/detaylı görünmesin.
4) Çeldiriciler saçma değil, aynı algoritmanın yanlış basamağı veya yakın ayırıcı olmalı.
5) Zorluk gerçekçi olsun: klasik tek bilgi=Orta; güçlü çeldirici + algoritma/eşik/mekanizma ayrımı=Zor. Gerekiyorsa difficulty alanını Orta yaz.
6) Feedback kısa, seçenek-özel ve tekrarsız olsun. Yanlış şıkta tek cümlede “ne zaman düşünülür + bu kökte neden değil” mantığı ver.
7) Temiz Türkçe tıp dili kullan; İngilizce kırıntı, bozuk terim ve yarım cümle bırakma.
8) Soru tipini çeşitlendir; sürekli “en uygun sonraki adım” formatına düşme.

Alan kuralları: relatedBranch görevle aynı olsun. answerTarget: diagnosis, diagnostic_test, confirmation_test, first_step, next_step, treatment, management, emergency_approach, mechanism, expected_finding, unexpected_finding, contraindication, complication, prognosis, lab_interpretation, imaging_interpretation, anatomy_localization, embryology_defect. stem 3-5 cümle; explanation en fazla 2 cümle; A-E feedbackleri birer öğretici cümle; evidenceChain 3 kısa görünür ipucu; examPearl tek kısa cümle; managementSteps yalnızca yönetim sorusunda 2-3 kısa adım.

Kompakt şema: {"relatedBranch":"","difficulty":"","learningTarget":"","answerTarget":"","demographics":"","setting":"","chiefComplaint":"","stem":"","compactVitals":[],"compactObjectiveData":[],"question":"","options":[{"id":"A","text":""},{"id":"B","text":""},{"id":"C","text":""},{"id":"D","text":""},{"id":"E","text":""}],"correctAnswer":"","explanation":"","wrongOptionFeedback":{"A":"","B":"","C":"","D":"","E":""},"evidenceChain":["","",""],"examPearl":"","managementSteps":[]}`;

export function buildRecentCompact(recentQuestionSummaries = []) {
  const rows = Array.isArray(recentQuestionSummaries) ? recentQuestionSummaries : [];
  const compact = rows.slice(0, 5).map((item, index) => {
    const target = truncateText(item.learningTarget || item.answerTarget || item.questionType || '', 36);
    const correctText = truncateText(correctTextFromSummary(item), 34);
    const stem = truncateText(item.stem || item.normalizedStem || item.question || '', 46);
    const options = optionTextList(item).slice(0, 3).map((text) => truncateText(text, 16)).join('/');
    return `${index + 1}) ${[target, correctText && `ans:${correctText}`, stem && `stem:${stem}`, options && `opts:${options}`].filter(Boolean).join(' | ')}`;
  }).filter(Boolean);
  return compact.length ? compact.join('\n') : 'Yok';
}

export function buildUserPrompt({
  branch,
  target = '',
  difficulty = 'Orta',
  recentCompact = 'Yok',
  attempt = 1,
  antiRepeatNonce = '',
  detailMode = 'concise',
  desiredCorrectAnswer = '',
}) {
  const branchText = cleanText(branch);
  const targetText = cleanText(target);
  const selectedDifficulty = normalizeDifficulty(difficulty);
  const preferredFocus = targetText || 'Branşa uygun, sonlardan farklı bir tanı/test/mekanizma/bulgu/kontrendikasyon/komplikasyon odağı seç.';
  const answerLetter = ['A', 'B', 'C', 'D', 'E'].includes(String(desiredCorrectAnswer || '').toUpperCase()) ? String(desiredCorrectAnswer).toUpperCase() : '';
  const depth = String(detailMode || '').toLowerCase() === 'full'
    ? 'Biraz daha öğretici ama tekrar etme.'
    : 'Kompakt tut: explanation 2 cümle, feedbackler tek cümle.';

  return `TUS JSON üret. branch=${branchText}; difficultyHint=${selectedDifficulty}; focus=${preferredFocus}; depth=${depth}; preferredLetter=${answerLetter || 'soft'}; nonce=${cleanText(antiRepeatNonce)}-${attempt}.
Yakın tekrar yapma: ${recentCompact}
Çıkıştan önce kontrol: kök/panel tek başına çözdürüyor mu, feedbackte gizli hasta verisi var mı, iki doğru kalıyor mu, doğru şık uzunlukla ele veriyor mu, zorluk gerçekçi mi, dil temiz mi? relatedBranch="${branchText}"; difficulty klasikse Orta, gerçekten algoritmik/zor ayrım varsa Zor yaz.`;
}
