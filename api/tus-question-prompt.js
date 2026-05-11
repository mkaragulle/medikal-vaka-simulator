// KlinikIQ — Minimal, cleaner TUS AI prompt setup
// Purpose: let the model create real TUS-quality Turkish questions without over-constraining question type.
// Keep code-side cleaning; remove branch-target restriction logic and repetitive prompt rules.

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

export const OPTIMIZED_TUS_SYSTEM_PROMPT = `You are KlinikIQ's Turkish TUS medical question engine.

Return only valid JSON.

Generate one concise, scientifically correct, single-best-answer Turkish TUS spot question. The question must feel close to the real TUS exam: clinically meaningful, educational, professionally written, grammatically clean, and medically precise.

Core standard:
- Use professional Turkish medical language.
- Create a natural clinical vignette with a clear beginning, focused clues and one decisive learning point.
- Choose the most appropriate TUS-style question type for the requested branch and context.
- Options must be scientifically plausible, same-category and built around one clearly best answer.
- Do not make the item artificially easy; the question should teach clinical reasoning, mechanism, diagnosis, treatment choice, test selection or interpretation.
- Use only necessary findings. Avoid filler labs, vitals, imaging and repeated data.
- Feedback must teach: explain why the correct answer is correct, and why each wrong option is not the best answer in this case.
- In pharmacology, physiology, biochemistry, emergency care and mechanisms, ensure exact scientific direction, mechanism, indication and treatment order.
- If the output is medically uncertain, ambiguous, repetitive, poorly phrased or not educational, rewrite it before returning JSON.

The UI does not show a question title. Always keep "title" as an empty string.`;

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
  recentCompact = 'Yok',
  attempt = 1,
  antiRepeatNonce = '',
}) {
  const branchText = cleanText(branch);
  const targetText = cleanText(target);

  return `Generate one Turkish TUS spot question for KlinikIQ.

Branch: ${branchText}
Preferred focus: ${targetText || 'Choose the most suitable TUS-style focus for this branch.'}
Anti-repeat key: ${cleanText(antiRepeatNonce)}-${attempt}

Recent outputs are listed only to avoid repetition. Do not copy their topic, case structure, wording or answer:
${recentCompact}

Question quality:
Write a compact but well-framed clinical vignette. Use correct terminology, Turkish spelling and grammar. Make the item challenging enough for TUS preparation and educational after the answer is selected.

Feedback quality:
The explanation must teach the reasoning, not repeat the answer. For each option, write one useful sentence explaining why it fits or why it is eliminated in this case. Avoid generic or template-like feedback.

Return JSON in this exact schema:

{
  "title": "",
  "relatedBranch": "${branchText}",
  "difficulty": "Kolay|Orta|Zor",
  "learningTarget": "",
  "answerTarget": "${targetText}",
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
  "correctAnswer": "A",
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
