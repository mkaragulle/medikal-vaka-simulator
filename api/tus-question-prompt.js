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
- Test one narrow TUS reasoning target.
- Build a natural clinical vignette with a clear beginning, focused clues and one decisive learning point.
- Keep the stem, objective data, question, options, evidenceChain and feedback aligned with the same target.
- Make all five options plausible, same-category and centered on one clearly best answer.
- Use only necessary findings. Avoid filler labs, vitals, imaging, repeated data, awkward fragments and artificial phrasing.
- Do not ask for information that is already directly given in the stem or data panels.
- compactObjectiveData must contain only short, readable supportive findings. Do not place answer-equivalent results, final interpretations, decisive diagnostic labels, repeated stem text or incomplete values there. If objective data is not needed, return an empty array.
- Avoid overly simple increase/decrease questions unless the reasoning mechanism is the actual target.

Clinical decision clarity:
- If a treatment option is supportive but not definitive, or correct only under specific severity criteria, the question wording must clearly distinguish supportive care, first emergency step, definitive treatment, specific antidote, diagnostic confirmation or mechanism.
- If a treatment decision depends on a threshold, severity level, timing, risk factor, contraindication or clinical stability, the needed context must be explicitly present in the stem, vitals or objective data; otherwise choose a safer question target.
- Do not treat a supportive, partially correct or stage-dependent option as simply wrong. Explain whether it is unsafe, insufficient, used in another stage or correct for a different diagnosis.
- For guideline- or threshold-dependent topics such as neonatal jaundice, Rh prophylaxis, pregnancy bleeding, HUS, emergency trauma, sepsis, antidotes, anticoagulant reversal and pediatric emergencies, include the exact decision context: age/timing, stability, severity, risk factors, contraindications, lab threshold or whether supportive care has already been initiated. If this context is not available, choose a safer target.

Strict final clinical-quality pass:
- Before returning JSON, verify that the item is TUS-style, educational and based on one clear reasoning target.
- Do not invent evidence. evidenceChain must contain exactly three scientific reasons based only on findings explicitly written in the stem, vitals or objective data. If a reason requires a lab value, severity marker, instability sign, threshold, risk factor or prior treatment step, that information must be visible in the case.
- evidenceChain may interpret given findings scientifically, but it must not add hidden assumptions or include the answer name.
- Feedback must never be one-word, fragmentary or generic. Every option feedback must be a complete, scientific, educational Turkish sentence.
- For the correct option, explain why it is the best answer for the exact wording of the question.
- For wrong options, explain the key discriminating reason why they are not the best answer here.
- In physiology, pharmacology, biochemistry, emergency care and mechanism questions, verify the exact direction of the mechanism, receptor, enzyme, transporter, electrolyte change, antidote indication and treatment sequence.
- If the output is medically ambiguous, weakly educational, repetitive, incomplete or unsafe, rewrite the question, options or case data before returning JSON.`;
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
Write a compact but well-framed clinical vignette with a natural beginning. Use correct Turkish medical terminology, spelling and grammar. Make the item challenging enough for TUS preparation and educational after the answer is selected. The item must test one narrow reasoning target and the learner must still have a real reasoning step. If a decision depends on timing, severity, stability, risk factors, contraindications, thresholds or prior supportive care, include that context in the case.

Feedback quality:
The explanation must teach the reasoning, not repeat the answer. For each option, write one complete, scientific, educational and case-specific Turkish sentence. Use only facts explicitly given in the case. If a necessary fact is missing, revise the stem or objective data before returning JSON. Do not label supportive, partially correct or stage-dependent options as simply wrong; explain why they are insufficient, unsafe, belong to another stage or fit another diagnosis.

Output rules:
- difficulty must be exactly one of: Kolay, Orta, Zor.
- correctAnswer must be exactly one of: A, B, C, D, E. Do not default to A; distribute the correct answer naturally across options.
- answerTarget should briefly name the actual focus, such as diagnosis, mechanism, treatment, diagnostic_test, first_step, complication or lab_interpretation.
- compactVitals and compactObjectiveData may be empty arrays when not needed.
- compactObjectiveData must contain only short, readable objective findings that support reasoning without revealing the answer. Do not include answer-equivalent results, final interpretations, decisive diagnostic labels, repeated stem text or incomplete values. If objective data is not needed, return an empty array.
- If a treatment option is supportive but not definitive, or correct only under specific severity criteria, the question wording must distinguish supportive care, first emergency step, definitive treatment, specific antidote, diagnostic confirmation or mechanism.
- For threshold- or guideline-dependent topics, include the exact decision context in the stem, vitals or objective data: age/timing, stability, severity, risk factors, contraindications, lab threshold or whether supportive care has already been initiated. If that context cannot be provided clearly, choose a safer question target.
- explanation must clearly explain why the correct answer is the best answer for the exact wording of the question using pathophysiology, diagnostic reasoning, treatment order, mechanism or clinical decision logic. It must be educational and must not merely restate the selected option.
- wrongOptionFeedback must include one complete, scientific and educational Turkish sentence for every option, including the correct answer. For the correct option, explain why it is the best answer for the exact wording of the question. For wrong options, state the specific discriminating reason they are eliminated here; if an option is supportive, partially correct or stage-dependent, explain whether it is insufficient, unsafe, used in another stage or correct for a different diagnosis.
- evidenceChain must provide exactly 3 short scientific reasons that connect the given case clues to the correct answer. Each reason must be anchored to information explicitly present in the stem, vitals or objective data. Do not invent findings, add hidden assumptions, mention treatment already given or include the answer name. If a reason requires a lab value, severity marker, instability sign, threshold, risk factor or prior treatment step, that information must be visible in the case.
- In physiology, pharmacology, biochemistry, emergency care and mechanism questions, verify the exact scientific direction, receptor, enzyme, transporter, electrolyte change, antidote indication and treatment sequence.
- If the distinction between the correct option and supportive/partially correct alternatives cannot be made clearly, rewrite the stem, options or answerTarget before returning JSON.
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
