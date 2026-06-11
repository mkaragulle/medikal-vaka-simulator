// KlinikIQ — Lean 9/10 TUS AI prompt setup
// Purpose: generate Turkish TUS-quality single-best-answer questions with a stable JSON contract.

function cleanText(value = '') {
  return String(value ?? '')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function truncateText(value = '', max = 120) {
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

export const OPTIMIZED_TUS_SYSTEM_PROMPT = `You are KlinikIQ's Turkish TUS question editor. Return only valid JSON in the requested schema.

Produce one original, single-best-answer Turkish TUS item. Optimize for medical accuracy, clean Turkish, plausible distractors and low token waste.

CORE RULES
1) Case-data lock: any patient-specific fact that justifies the answer must be visible before the options, either in stem, compactVitals or compactObjectiveData. General medical knowledge may be used in explanation/feedback; do not invent hidden case facts later.
2) One best answer: if more than one option could be correct, add discriminating context before the options or rewrite the options.
3) Distractors: keep all five options in the same conceptual category when possible; at least two wrong options should be tempting but ruled out by timing, severity, indication, subtype, mechanism or algorithm step.
4) Difficulty: Kolay = classic cue; Orta = diagnosis plus interpretation/algorithm; Zor = two plausible close distractors plus a decisive clue. Do not label simple recall as Zor.
5) Turkish quality: use natural academic Turkish, complete sentences and standard medical terminology. Avoid machine-translation fragments, placeholders and generic feedback.
6) Feedback: every A-E feedback must be option-specific. For wrong options, state why it may sound plausible or when it is used, then why it is not best in this case.
7) Data panels: use compactVitals/compactObjectiveData only when they improve readability. They may contain raw vitals, labs, imaging or exam findings, but not interpretive labels that directly reveal the answer.
8) Answer-letter balance is soft: use the requested letter only if option reordering preserves medical correctness. Never sacrifice validity for letter balance.

FIELD RULES
- relatedBranch and difficulty must exactly match the task.
- answerTarget: diagnosis, diagnostic_test, confirmation_test, first_step, next_step, treatment, management, emergency_approach, mechanism, expected_finding, unexpected_finding, contraindication, complication, prognosis, lab_interpretation, imaging_interpretation, anatomy_localization, embryology_defect.
- stem: 3-6 complete Turkish sentences; clinical items usually 60-125 words, basic sciences 40-90 words. Include age/sex/context, presentation, 2-4 discriminating clues and all decision-critical case data.
- question: one precise Turkish question ending with ?
- explanation: 2-4 concise scientific sentences, no hidden case facts.
- evidenceChain: exactly 3 short visible clues from stem/panels; do not name the correct answer directly.
- examPearl: one high-yield sentence.
- managementSteps: [] unless answerTarget is first_step, next_step, treatment, management or emergency_approach; then give 2-4 ordered steps.

Return JSON in this exact schema:
{
  "relatedBranch": "",
  "difficulty": "",
  "learningTarget": "",
  "answerTarget": "",
  "demographics": "",
  "setting": "",
  "chiefComplaint": "",
  "stem": "",
  "compactVitals": [],
  "compactObjectiveData": [],
  "question": "",
  "options": [
    {"id": "A", "text": ""},
    {"id": "B", "text": ""},
    {"id": "C", "text": ""},
    {"id": "D", "text": ""},
    {"id": "E", "text": ""}
  ],
  "correctAnswer": "",
  "explanation": "",
  "wrongOptionFeedback": {
    "A": "",
    "B": "",
    "C": "",
    "D": "",
    "E": ""
  },
  "evidenceChain": ["", "", ""],
  "examPearl": "",
  "managementSteps": []
}`;

export function buildRecentCompact(recentQuestionSummaries = []) {
  const rows = Array.isArray(recentQuestionSummaries) ? recentQuestionSummaries : [];
  const compact = rows.slice(0, 8).map((item, index) => {
    const branch = truncateText(item.branch || item.relatedBranch || item.branchName || '', 28);
    const target = truncateText(item.learningTarget || item.answerTarget || item.questionType || '', 44);
    const correctLetter = cleanText(correctFromSummary(item));
    const correctText = truncateText(correctTextFromSummary(item), 42);
    const stem = truncateText(item.stem || item.normalizedStem || item.question || '', 70);
    const options = optionTextList(item).map((text) => truncateText(text, 22)).join(' / ');
    return `${index + 1}) ${[branch, target, `correct=${correctLetter}${correctText && correctText !== correctLetter ? `:${correctText}` : ''}`, stem && `stem=${stem}`, options && `opts=${options}`].filter(Boolean).join(' | ')}`;
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
  detailMode = 'standard',
  desiredCorrectAnswer = '',
}) {
  const branchText = cleanText(branch);
  const targetText = cleanText(target);
  const selectedDifficulty = normalizeDifficulty(difficulty);
  const preferredFocus = targetText || 'Branşa uygun, son sorulardan farklı bir TUS odağı seç.';
  const answerLetter = ['A', 'B', 'C', 'D', 'E'].includes(String(desiredCorrectAnswer || '').toUpperCase()) ? String(desiredCorrectAnswer).toUpperCase() : '';
  const normalizedDetailMode = ['full', 'standard', 'concise'].includes(String(detailMode || '').toLowerCase()) ? String(detailMode).toLowerCase() : 'standard';
  const outputDepthInstruction = normalizedDetailMode === 'full'
    ? 'Açıklama 3-4 cümle; her seçenek feedback 1-2 öğretici cümle.'
    : normalizedDetailMode === 'concise'
      ? 'Açıklama 2 güçlü cümle; her seçenek feedback tek ama seçenek-özel cümle.'
      : 'Açıklama 2-3 cümle; her seçenek feedback 1-2 seçenek-özel cümle.';

  return `Generate one original Turkish TUS spot question for KlinikIQ.
Branch=${branchText}
Difficulty=${selectedDifficulty}
Focus=${preferredFocus}
Depth=${outputDepthInstruction}
PreferredCorrectLetter=${answerLetter || 'balanced-soft'}
AntiRepeat=${cleanText(antiRepeatNonce)}-${attempt}

Avoid repeating these recent topic/stem/option/correct-answer patterns:
${recentCompact}

Before output: one best answer, no hidden patient-specific data, A-E feedback present and specific, same-category options, clean Turkish, relatedBranch="${branchText}", difficulty="${selectedDifficulty}". Return only valid JSON.`;
}
