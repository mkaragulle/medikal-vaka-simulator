// KlinikIQ — Clean TUS AI prompt setup
// Purpose: generate Turkish TUS-quality single-best-answer questions with a stable JSON contract.

function cleanText(value = '') {
  return String(value ?? '')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function correctFromSummary(item = {}) {
  if (item.correct) return item.correct;
  if (item.correctAnswerText) return item.correctAnswerText;

  if (item.correctAnswer && Array.isArray(item.optionTexts)) {
    const index = ['A', 'B', 'C', 'D', 'E'].indexOf(String(item.correctAnswer).toUpperCase());
    return index >= 0 ? item.optionTexts[index] : item.correctAnswer;
  }

  return item.correctAnswer || '';
}

export function normalizeDifficulty(value = 'Orta') {
  const text = cleanText(value).toLocaleLowerCase('tr');
  if (/kolay|easy/.test(text)) return 'Kolay';
  if (/zor|hard/.test(text)) return 'Zor';
  return 'Orta';
}

export const OPTIMIZED_TUS_SYSTEM_PROMPT = `You are KlinikIQ's Turkish TUS medical question writer.

Return only valid JSON.

Write one Turkish TUS-style single-best-answer question. The item must be medically accurate, concise, clinically meaningful and educational. Use professional Turkish and complete sentences.

Standards:
- Build one focused clinical vignette around one learning point.
- Keep the stem, data, question, options and feedback aligned with the same learning point.
- Make the options plausible, same-category and single-best-answer.
- Use only data that is necessary for reasoning.
- Do not reveal the answer in the stem or data panels.
- Do not ask for a fact already stated in the stem or data panels.
- Objective data must be complete and readable; omit unnecessary or incomplete data.
- Prefer questions that test reasoning, interpretation, mechanism, diagnosis, treatment choice, test selection or next step.
- The explanation must clearly teach why the correct answer is correct in this case.
- Option feedback must be complete, medically meaningful and specific to this case.
- The evidence chain must use only information already present in the stem, vitals or objective data.
- Before returning JSON, revise the item if it is ambiguous, medically uncertain, repetitive, poorly written or not educational.`;

export function buildRecentCompact(recentQuestionSummaries = []) {
  const rows = Array.isArray(recentQuestionSummaries) ? recentQuestionSummaries : [];

  const compact = rows.slice(0, 5).map((item, index) => {
    const branch = cleanText(item.branch || item.relatedBranch || item.branchName || '');
    const learningTarget = cleanText(item.learningTarget || '');
    const correct = cleanText(correctFromSummary(item));

    return `${index + 1}) ${[branch, learningTarget, correct].filter(Boolean).join(' | ')}`;
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
}) {
  const branchText = cleanText(branch);
  const targetText = cleanText(target);
  const selectedDifficulty = normalizeDifficulty(difficulty);
  const preferredFocus = targetText || 'Choose the most suitable focus for this branch.';

  return `Generate one Turkish TUS spot question for KlinikIQ.

Branch: ${branchText}
Difficulty: ${selectedDifficulty}
Focus: ${preferredFocus}
Anti-repeat key: ${cleanText(antiRepeatNonce)}-${attempt}

Avoid repeating these recent outputs:
${recentCompact}

Return JSON in this exact schema:

{
  "relatedBranch": "${branchText}",
  "difficulty": "${selectedDifficulty}",
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
}
