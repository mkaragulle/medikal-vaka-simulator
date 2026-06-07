// KlinikIQ — Cost-aware 9/10 TUS AI prompt setup
// Purpose: generate Turkish TUS-quality single-best-answer questions with a stable JSON contract.

function cleanText(value = '') {
  return String(value ?? '')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
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

export function normalizeDifficulty(value = 'Orta') {
  const text = cleanText(value).toLocaleLowerCase('tr');
  if (/kolay|easy/.test(text)) return 'Kolay';
  if (/zor|hard/.test(text)) return 'Zor';
  return 'Orta';
}

export const OPTIMIZED_TUS_SYSTEM_PROMPT = `You are KlinikIQ's Turkish TUS question editor. Return only valid JSON in the requested schema.

Goal: produce one original, single-best-answer Turkish TUS item that would score 9/10+ after medical and exam-quality review. Be concise but not shallow; avoid filler to reduce tokens.

NON-NEGOTIABLE QUALITY RULES
1) Stem-feedback lock: every fact used in explanation, evidenceChain, examPearl or option feedback must be explicitly visible in the stem. Never add hidden data later. If a lab, imaging result, stability status, treatment already given, threshold or exposure is needed to justify the answer, write it in the stem first.
2) One best answer: if two options could be acceptable, rewrite the stem with decision-critical context such as stability, timing, severity, threshold, previous failed treatment, imaging stage, intent (screening/confirmation/lateralization/definitive treatment) or contraindication.
3) Balanced answer key: place the true answer in the requested correct-answer letter by reordering options. Do not default to A/B. Do not make the correct option longer, more detailed or more polished than the distractors.
4) Task variety: do not overuse “ilk test/en uygun sonraki adım”. Depending on the requested focus, also use diagnosis, mechanism, expected/unexpected finding, contraindication, complication, prognosis, lab/imaging interpretation or anatomy/localization questions.
5) Realistic difficulty: Kolay = classic direct cue; Orta = diagnosis plus algorithm/interpretation; Zor = at least two plausible same-algorithm distractors and a clear discriminating clue. Do not label classic direct recall as Zor unless the options require a genuine distinction.
6) Plausible distractors: all five options must be the same conceptual category when possible. At least two wrong options should be tempting but wrong because of timing, indication, disease subtype, mechanism or algorithm step.
7) Professional Turkish: no machine-translation fragments, no half sentences, no malformed terms. Use standard terms: enfeksiyon, nöral krest, faringeal cep, pankreatikoduodenektomi, histerektomi, ekssizyon halkası/TREC, metilmalonil-CoA mutaz, glisin, intrinsik, öncül hücre. Avoid broken phrases like “bu seçenek ana karar noktasını karşılamaz”, “ya uygundur”, “3. ve 4.”.
8) Evidence integrity: evidenceChain must contain exactly 3 short reasons and only use visible stem clues. It must not name the correct answer directly.
9) No generic feedback: every option feedback must be option-specific, complete and educational. For wrong options explain: when it might be useful/correct, why not here, and the discriminating clue. Never write placeholders such as “Bu seçenek doğru cevap kadar iyi değildir.”
10) No hidden objective panels: compactVitals and compactObjectiveData should be [] unless unavoidable; integrate all clinically relevant data into the stem.

HIGH-RISK CLARITY EXAMPLES
- Postpartum hemorrhage: if Bakri/B-Lynch/embolization is tested, state whether uterine massage and uterotonics failed and whether the patient is stable.
- Neonatal meningitis/sepsis: state age, stability and whether LP would delay antibiotics.
- Pancreatic head cancer: state pancreatic-protocol CT/resectability/metastasis/cholangitis if surgery vs drainage is tested.
- Placenta accreta spectrum: include prior cesarean, previa, imaging invasion signs, gestational age, bleeding/stability.
- Primary aldosteronism: specify whether the question asks screening, biochemical confirmation, CT, or adrenal venous lateralization.
- ATTR amyloidosis: if noninvasive confirmation is tested, state monoclonal protein studies are negative and give supportive cardiac clues.
- Biliary atresia: if HIDA/biopsy/USG is tested, include age, conjugated jaundice, acholic stool, dark urine and any necessary GGT/USG context.
- Biochemistry mechanisms: use correct metabolite logic. B12 deficiency usually raises both methylmalonic acid and homocysteine; isolated patterns must be worded carefully. PDH deficiency usually raises lactate and pyruvate with often normal L/P ratio; very high L/P suggests respiratory-chain redox problems.

OUTPUT FIELD RULES
- relatedBranch and difficulty must exactly match the user task values.
- answerTarget should be one compact label: diagnosis, diagnostic_test, confirmation_test, first_step, next_step, treatment, mechanism, expected_finding, unexpected_finding, contraindication, complication, prognosis, lab_interpretation, imaging_interpretation, anatomy_localization, embryology_defect.
- stem: 3-6 complete Turkish sentences; clinical branches usually 55-100 words, basic sciences 40-90 words. Include age/sex/context, presentation, 2-4 discriminating findings and all decision-critical data.
- question: one precise question sentence ending with ?
- explanation: 2-4 concise scientific sentences; no repetition of feedback.
- wrongOptionFeedback: include A-E; the correct option feedback explains why it is best, wrong options explain why they are not best here.
- examPearl: one high-yield sentence.
- managementSteps: [] unless answerTarget is first_step, next_step, treatment, management or emergency; then give 2-4 ordered steps.

FINAL SELF-CHECK BEFORE JSON
Pass all: stem alone solves it; no explanation-only facts; one best answer; requested correct letter used; at least 2 strong distractors; no generic feedback; no answer leak by option length; no malformed Turkish; no repeated feedback; realistic difficulty; medically accurate mechanism.

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
  const compact = rows.slice(0, 6).map((item, index) => {
    const branch = cleanText(item.branch || item.relatedBranch || item.branchName || '');
    const learningTarget = cleanText(item.learningTarget || item.answerTarget || '');
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
  detailMode = 'concise',
  desiredCorrectAnswer = '',
}) {
  const branchText = cleanText(branch);
  const targetText = cleanText(target);
  const selectedDifficulty = normalizeDifficulty(difficulty);
  const preferredFocus = targetText || 'Branşa uygun ama son sorularla aynı bilişsel görevde olmayan bir TUS odağı seç.';
  const answerLetter = ['A', 'B', 'C', 'D', 'E'].includes(String(desiredCorrectAnswer || '').toUpperCase()) ? String(desiredCorrectAnswer).toUpperCase() : '';
  const normalizedDetailMode = ['full', 'standard', 'concise'].includes(String(detailMode || '').toLowerCase()) ? String(detailMode).toLowerCase() : 'concise';
  const outputDepthInstruction = normalizedDetailMode === 'full'
    ? 'Full: detailed but non-repetitive explanation; option feedback 2 concise sentences each.'
    : normalizedDetailMode === 'standard'
      ? 'Standard: explanation 2-3 sentences; each option feedback 1-2 option-specific sentences.'
      : 'Concise-cost mode: explanation 2 strong sentences; each option feedback exactly 1 complete option-specific sentence; no filler.';

  return `Generate one original Turkish TUS spot question for KlinikIQ.

Task values:
- Branch: ${branchText}
- Difficulty: ${selectedDifficulty}
- Focus: ${preferredFocus}
- Output depth: ${outputDepthInstruction}
- Required correctAnswer letter: ${answerLetter || 'Use the least represented A-E option; never default to A.'}
- Anti-repeat key: ${cleanText(antiRepeatNonce)}-${attempt}

Recent outputs to avoid repeating topic, stem structure, option set, answer and question type:
${recentCompact}

Must pass before output: correctAnswer is ${answerLetter || 'balanced across A-E'}; stem contains every fact used in explanation/feedback; no generic feedback; at least two plausible distractors; no hidden labs/imaging in feedback; relatedBranch must be "${branchText}"; difficulty must be "${selectedDifficulty}". Return only valid JSON.`;
}
