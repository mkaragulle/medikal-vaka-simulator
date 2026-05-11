// KlinikIQ — Minimal, cleaner TUS AI prompt setup
// Purpose: real TUS-quality Turkish questions without over-constraining the question type.
// Keep only essential cleaning, user-selected difficulty, anti-repeat context and a stable JSON contract.

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

export const OPTIMIZED_TUS_SYSTEM_PROMPT = `You are KlinikIQ's Turkish TUS medical question engine.

Return only valid JSON.

Generate one concise, scientifically correct, single-best-answer Turkish TUS spot question. The output must be in professional Turkish with correct medical terminology, spelling and grammar. The question should feel close to the real TUS exam: clinically meaningful, challenging, highly educational, scientific and medically precise.

Core standard:
- Create a natural clinical vignette with a clear beginning, focused clues and one decisive learning point.
- Choose the most appropriate TUS-style focus for the requested branch and context.
- Respect the requested difficulty: Kolay should test a classic/high-yield clue, Orta should require one real reasoning step, and Zor should require a more discriminating mechanism, interpretation or differential decision.
- Options must be scientifically plausible, same-category and built around one clearly best answer.
- Do not make the item artificially easy; the question should teach clinical reasoning, mechanism, diagnosis, treatment choice, test selection or interpretation.
- Use only necessary findings. Avoid filler labs, vitals, imaging and repeated data.
- Do not ask the learner to choose information that is already directly given in the stem or data panel.
- Do not place answer-equivalent conclusions in compactObjectiveData. Data panels must show raw supportive findings only, not the final physiologic direction, mechanism, diagnosis or interpretation that the question asks for.
- Avoid asking a simple direction question such as “artar mı/azalır mı?” after giving the determinant in the data panel; instead ask the missing mechanism, principle or interpretation, or keep the determinant inside the vignette without an extra data card.
- Feedback must teach: explain why the correct answer is correct and why each wrong option is not the best answer in this case.
- Every feedback sentence must be case-specific, highly educational, medically explanatory and complete. Avoid generic, template-like, vague or unfinished wording.
- evidenceChain must contain exactly 3 short scientific reasons based only on clues present in the stem, vitals or objective data. Do not invent findings or include the answer name.
- If the output is medically uncertain, ambiguous, repetitive, poorly phrased or not educational, rewrite it before returning JSON.`;

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
  const preferredFocus = targetText || 'Choose the most suitable TUS-style focus for this branch.';

  return `Generate one educational-scientific Turkish TUS spot question for KlinikIQ.

Branch: ${branchText}
Requested difficulty: ${selectedDifficulty}
Preferred focus: ${preferredFocus}
Anti-repeat key: ${cleanText(antiRepeatNonce)}-${attempt}

Recent outputs are listed only to avoid repetition. Do not copy their topic, case structure, wording or answer:
${recentCompact}

Question quality:
Write a compact but well-framed clinical vignette. Use correct Turkish medical terminology, spelling and grammar. Make the item challenging, scientific and highly educational for TUS preparation at the requested difficulty level. The question must have one clearly best scientific answer and plausible same-category options. The learner must still have a real reasoning step.

Feedback quality:
The explanation must teach the reasoning. For each option, write one useful, highly educational, case-specific and medically explanatory sentence showing why it fits or why it is eliminated in this case. Do not use generic, template-like, half or vague feedback.

Output rules:
- difficulty must be exactly: ${selectedDifficulty}.
- correctAnswer must be exactly one of: A, B, C, D, E. Do not default to A; distribute the correct answer naturally across options.
- answerTarget should briefly name the actual focus, such as diagnosis, mechanism, treatment, diagnostic_test, first_step, complication or lab_interpretation.
- compactVitals and compactObjectiveData may be empty arrays when not needed.
- compactObjectiveData should contain only concise, easy-to-read objective findings that support the vignette without revealing the answer. Do not place answer-equivalent conclusions, decisive diagnostic interpretations, repeated stem text or the exact result being asked in this field. If no safe supportive data is needed, return an empty array.
- evidenceChain must provide exactly 3 short scientific reasons that connect the given case clues to the correct answer. Each reason must be based only on information present in the stem, vitals or objective data; do not invent findings or include the answer name.
- wrongOptionFeedback must include one scientific and educational sentence for every option, including the correct answer. For the correct option, explain why it is correct. For wrong options, explain why they are eliminated in this case.
- managementSteps: use only for treatment, first-step, next-step, emergency or management questions. Include 2-4 concise clinical steps in correct order. For diagnosis, mechanism, etiology, lab interpretation, anatomy or pathology questions, return [].

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
