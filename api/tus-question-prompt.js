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

Write one Turkish TUS-style single-best-answer question. The item must be medically accurate, concise, clinically meaningful, educational and written in professional Turkish with complete sentences.

Core standards:
- Build one focused clinical vignette around one decisive learning point.
- Keep the stem, objective data, question, options, evidence chain and feedback aligned with the same learning point.
- Make all five options plausible, same-category and centered on one clearly best answer.
- Use only clinical data that is necessary for reasoning.
- Do not reveal the answer in the stem or objective data.
- Do not ask for a fact that is already directly stated in the stem or objective data.
- Objective data must be complete, clinically necessary and readable; omit any data item that is incomplete, unnecessary or cannot be written clearly with units when units are required.
- Avoid simple direction-only questions such as increase/decrease/change unless the reasoning mechanism itself is the target. Prefer mechanism, interpretation, diagnostic reasoning, treatment choice, test selection, next-step or decision-rule questions.

Clinical-quality rewrite pass:
- Before returning JSON, revise the whole item as if reviewed by a clinician and a TUS item editor.
- The case must contain every clinical fact needed to answer the question inside the stem, vitals or objective data.
- Do not refer in explanation, evidenceChain, examPearl, feedback or managementSteps to any treatment, laboratory value, test, diagnosis, severity marker or clinical fact that was not explicitly given.
- evidenceChain must contain exactly three short scientific reasons based only on the provided case data. It must not add new findings, treatment steps, hidden assumptions or the answer name.
- Feedback must never be a one-word, vague or template response. Every feedback sentence must teach a concrete medical reason.
- For the correct option, explain the pathophysiologic, diagnostic, therapeutic or mechanistic reason why it is correct in this exact case.
- For wrong options, explain why they are not appropriate for this case using a specific discriminating feature.
- Do not use vague phrases such as wrong, correct option, supports the diagnosis, or generic decision phrases without medical reasoning.
- If the required explanation cannot be written clearly and scientifically, rewrite the question, options and data before returning JSON.

Final output standard: complete, precise, non-repetitive, medically safe and educational.`;

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

  return `Generate one Turkish TUS spot question for KlinikIQ.

Branch: ${branchText}
Difficulty: ${selectedDifficulty}
Focus: ${preferredFocus}
Anti-repeat key: ${cleanText(antiRepeatNonce)}-${attempt}

Recent outputs are listed only to avoid repetition. Do not copy their topic, case structure, wording or answer:
${recentCompact}

Question quality:
Write a compact but well-framed clinical vignette. Use correct Turkish medical terminology, spelling and grammar. Make the item challenging enough for TUS preparation and educational after the answer is selected. The learner must still have a real reasoning step.

Feedback quality:
The explanation must teach the reasoning, not repeat the answer. For each option, write one concise, case-specific and medically explanatory sentence. Use only facts given in the case. If a necessary fact is missing, revise the stem or objective data before returning JSON.

Output rules:
- difficulty must be exactly one of: Kolay, Orta, Zor.
- correctAnswer must be exactly one of: A, B, C, D, E. Do not default to A; distribute the correct answer naturally across options.
- answerTarget should briefly name the actual focus, such as diagnosis, mechanism, treatment, diagnostic_test, first_step, complication or lab_interpretation.
- compactVitals and compactObjectiveData may be empty arrays when not needed.
- compactObjectiveData must contain only concise objective findings that support reasoning without revealing the answer. Do not include decisive interpretations, repeated stem text, answer-equivalent conclusions or incomplete values.
- explanation must clearly explain why the correct answer is correct in this exact case using pathophysiology, diagnostic reasoning, treatment order, mechanism or clinical decision logic.
- wrongOptionFeedback must include one useful scientific sentence for every option, including the correct answer. For wrong options, state the discriminating reason they are eliminated in this case.
- evidenceChain must provide exactly 3 short scientific reasons based only on information present in the stem, vitals or objective data. Do not invent findings, use hidden assumptions or include the answer name.
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
