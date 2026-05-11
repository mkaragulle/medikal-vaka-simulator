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

Write one Turkish TUS-style single-best-answer question. The item must be scientifically accurate, educational, clinically meaningful, medically safe and written in professional Turkish with complete sentences.

Core standards:
- Build one focused clinical vignette around one clear reasoning target.
- The stem must read like a real clinical vignette with a natural beginning, not like a disconnected data note.
- Keep the stem, objective data, question, options, evidenceChain and feedback aligned with the same learning target.
- Make all five options plausible, same-category and centered on one clearly best answer.
- Use only necessary findings. Avoid filler labs, vitals, imaging, repeated data and artificial phrasing.
- Do not ask for information that is already directly given in the stem or data panels.
- compactObjectiveData must contain only short, readable supportive findings. Do not place answer-equivalent results, final interpretations, decisive diagnostic labels or repeated stem text there. If objective data is not needed, return an empty array.
- Avoid overly simple increase/decrease questions unless the reasoning mechanism is the actual target.
- If a treatment decision depends on a threshold, severity level, timing, risk factor, contraindication or clinical stability, include the necessary context in the stem; otherwise choose a safer question target.

Final clinical-quality pass:
- Before returning JSON, perform a strict final clinical-quality pass.
- Verify that the question is TUS-style, educational and based on one clear reasoning target.
- Verify that every necessary clinical context is explicitly present in the stem, vitals or objective data.
- Do not refer in explanation, evidenceChain, examPearl, feedback or managementSteps to any treatment, laboratory value, test, diagnosis, severity marker or clinical fact that was not explicitly given.
- Avoid broken Turkish, unfinished sentences, awkward fragments and artificial phrasing.
- Feedback must be clinically useful and never generic.
- Every option feedback must be a complete, scientific, educational Turkish sentence.
- For the correct option, explain the specific pathophysiologic, diagnostic, therapeutic or mechanistic reason why it is correct in this exact case.
- For wrong options, explain the key discriminating medical reason why they are not the best answer here.
- evidenceChain must contain exactly three short scientific reasons that connect the given case clues to the correct answer. Each reason must be based only on information explicitly present in the stem, vitals or objective data. Do not invent new clues, add hidden assumptions or include the answer name.
- In physiology, pharmacology, biochemistry, emergency care and mechanism questions, verify the exact direction of the mechanism, receptor, enzyme, transporter, electrolyte change, antidote indication and treatment sequence.
- If the output is medically ambiguous, weakly educational, repetitive, incomplete or unsafe, rewrite the question before returning JSON.`;
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
Write a compact but well-framed clinical vignette with a natural beginning. Use correct Turkish medical terminology, spelling and grammar. Make the item challenging enough for TUS preparation and educational after the answer is selected. The learner must still have a real reasoning step.

Feedback quality:
The explanation must teach the reasoning, not repeat the answer. For each option, write one complete, case-specific and medically explanatory sentence. Use only facts explicitly given in the case. If a necessary fact is missing, revise the stem or objective data before returning JSON.

Output rules:
- difficulty must be exactly one of: Kolay, Orta, Zor.
- correctAnswer must be exactly one of: A, B, C, D, E. Do not default to A; distribute the correct answer naturally across options.
- answerTarget should briefly name the actual focus, such as diagnosis, mechanism, treatment, diagnostic_test, first_step, complication or lab_interpretation.
- compactVitals and compactObjectiveData may be empty arrays when not needed.
- compactObjectiveData must contain only short, readable objective findings that support reasoning without revealing the answer. Do not include answer-equivalent results, final interpretations, decisive diagnostic labels, repeated stem text or incomplete values. If objective data is not needed, return an empty array.
- explanation must clearly explain why the correct answer is correct in this exact case using pathophysiology, diagnostic reasoning, treatment order, mechanism or clinical decision logic. It must be educational and must not merely restate the selected option.
- wrongOptionFeedback must include one complete, scientific and educational Turkish sentence for every option, including the correct answer. For the correct option, explain why it is correct in this case. For wrong options, state the specific discriminating reason they are eliminated here.
- evidenceChain must provide exactly 3 short scientific reasons that connect the given case clues to the correct answer. Each reason must be based only on information explicitly present in the stem, vitals or objective data. Do not invent findings, add hidden assumptions or include the answer name.
- In physiology, pharmacology, biochemistry, emergency care and mechanism questions, verify the exact scientific direction, receptor, enzyme, transporter, electrolyte change, antidote indication and treatment sequence.
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
