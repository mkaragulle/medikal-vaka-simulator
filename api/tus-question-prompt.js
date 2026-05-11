const TARGETS = [
  'diagnosis',
  'etiology',
  'diagnostic_test',
  'lab_interpretation',
  'first_step',
  'next_step',
  'treatment',
  'mechanism',
  'complication',
  'monitoring',
  'severity_marker',
  'activity_marker',
  'prevention',
];

function cleanText(value = '') {
  return String(value ?? '')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function normalize(value = '') {
  return cleanText(value)
    .toLocaleLowerCase('tr')
    .replace(/ı/g, 'i')
    .replace(/[âîû]/g, (match) => ({ â: 'a', î: 'i', û: 'u' }[match] || match))
    .replace(/[^a-z0-9çğıöşü\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
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

export const OPTIMIZED_TUS_SYSTEM_PROMPT = `You are KlinikIQ's Turkish TUS-style medical question engine.

Return only valid JSON. Generate one medically correct, concise, single-best-answer TUS spot question in professional Turkish. Use real TUS style: natural patient presentation, minimal decisive clues, one learning target, same-category options, and case-specific feedback.

Hard rules:
1. One item tests one target only: diagnosis, etiology, test, treatment, mechanism, complication, monitoring, severity/activity marker, anatomy/pathology/pharmacology/basic-science concept.
2. Start the stem naturally with a patient/context. Do not start with an isolated lab, biopsy, image, mechanism or definition.
3. Do not leak the answer. If a result already proves the diagnosis/mechanism, ask the next missing reasoning target instead.
4. Use only necessary data. Do not add irrelevant vitals, CBC/CRP/biochemistry, imaging or microbiology.
5. Put data in the right field: symptoms/history in stem; vital signs in compactVitals; labs/imaging/micro/pathology/exam findings in compactObjectiveData.
6. Options must be five plausible same-category alternatives with one clearly best answer.
7. Use exact medical wording: first step, first drug, screening, confirmation, supportive test, treatment, prophylaxis, monitoring, most common, most serious and contraindicated must match the scientific context.
8. Feedback must be specific, medically correct, non-repetitive and tied to the case.
9. evidenceChain must contain exactly 3 plain clue sentences explicitly present in stem/data; no interpretation, no invented clue, no answer name.
10. If the requested branch/target is unsafe or ambiguous, choose a safer high-yield TUS target within the same branch.

Silently audit before JSON: scientific accuracy, single best answer, no answer leakage, same-category options, correct labels/units, no repeated data, no vague feedback, complete Turkish sentences.`;

export function selectPromptTarget(branch = '') {
  const value = normalize(branch);
  if (/anatomi/.test(value)) return 'mechanism';
  if (/histoloji|embriyoloji/.test(value)) return pick(['mechanism', 'diagnosis']);
  if (/biyokimya/.test(value)) return pick(['mechanism', 'lab_interpretation']);
  if (/patoloji/.test(value)) return pick(['diagnosis', 'mechanism']);
  if (/farmakoloji/.test(value)) return pick(['mechanism', 'treatment']);
  if (/mikrobiyoloji/.test(value)) return pick(['etiology', 'diagnostic_test', 'prevention']);
  if (/acil/.test(value)) return pick(['first_step', 'treatment', 'diagnosis']);
  return pick(TARGETS);
}

export function buildRecentCompact(recentQuestionSummaries = []) {
  const rows = Array.isArray(recentQuestionSummaries) ? recentQuestionSummaries : [];
  const compact = rows.slice(0, 5).map((item, index) => {
    const branch = cleanText(item.branch || item.relatedBranch || item.branchName || '');
    const target = cleanText(item.answerTarget || item.questionType || item.learningTarget || '');
    const learningTarget = cleanText(item.learningTarget || item.title || '');
    const correct = cleanText(correctFromSummary(item));
    const theme = cleanText(item.chiefComplaint || item.question || item.stem || '').slice(0, 120);
    return `${index + 1}) ${[branch, target, learningTarget, correct, theme].filter(Boolean).join(' | ')}`;
  }).filter(Boolean);
  return compact.length ? compact.join('\n') : 'Yok';
}

export function buildUserPrompt({ branch, target, recentCompact = 'Yok', attempt = 1, antiRepeatNonce = '' }) {
  return `Generate one Turkish TUS spot question.

Branch: ${cleanText(branch)}
Target: ${cleanText(target)}
Anti-repeat key: ${cleanText(antiRepeatNonce)}-${attempt}
Avoid repeating these recent targets/questions:
${recentCompact}

Style target:
- Real TUS language, not textbook explanation.
- Stem: 3-5 sentences.
- compactVitals: 0-4 items.
- compactObjectiveData: 0-5 items.
- question: one clear Turkish question sentence using "aşağıdakilerden hangisidir?" when suitable.
- difficulty: choose exactly one of Kolay, Orta or Zor.
- correctAnswer: choose exactly one option id: A, B, C, D or E.
- explanation: 2 concise sentences.
- examPearl: 1 high-yield decision sentence.
- wrongOptionFeedback: 1 short discriminating sentence for each option.
- managementSteps: fill only for treatment/first-step/emergency/management targets; otherwise [].

Return JSON in this exact schema:

{
  "title": "",
  "relatedBranch": "${cleanText(branch)}",
  "difficulty": "Orta",
  "learningTarget": "",
  "answerTarget": "${cleanText(target)}",
  "demographics": "",
  "setting": "",
  "chiefComplaint": "",
  "stem": "",
  "compactVitals": [
    {"label": "", "value": ""}
  ],
  "compactObjectiveData": [
    {"label": "", "value": ""}
  ],
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
}

Final check before output:
- The correct answer is not named in stem/data/evidenceChain.
- The question asks the missing reasoning target, not something already demonstrated.
- All options are the same type.
- No generic phrase like "klinik bağlamda değerlendirilir".
- No invented evidence.
- No markdown or extra text.`;
}
