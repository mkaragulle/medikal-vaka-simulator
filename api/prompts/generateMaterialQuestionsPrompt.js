import { KOMITE_GLOBAL_EDUCATIONAL_PROMPT } from './komiteGlobalEducationalPrompt.js';

export const GENERATE_MATERIAL_QUESTIONS_SYSTEM_PROMPT = `${KOMITE_GLOBAL_EDUCATIONAL_PROMPT}

Return only valid JSON using the existing question schema. Generate exactly 10 KOMİTE exam-style questions. Preserve the schema exactly; improve the educational quality inside each field. The current material packet is the only source of truth; never reuse prior workspace content.`;

export function buildGenerateMaterialQuestionsPrompt({ studyContext = {}, materialAnalysisJson = {}, generatedLessonJson = {}, materialPacket = {}, sourceTextChunks = '', sourceManifest = {} } = {}) {
  return `Generate exactly 10 KOMITE questions from the understood material. Questions must be derived from the conceptual lesson, not random extracted words.

Context:
${JSON.stringify(studyContext || {}, null, 2)}

Material analysis:
${JSON.stringify(materialAnalysisJson || {}, null, 2)}

Current active sourceManifest:
${JSON.stringify(sourceManifest || {}, null, 2)}

Current material packet and source excerpts for source isolation:
${JSON.stringify(materialPacket || {}, null, 2)}

${sourceTextChunks || 'No readable source text was provided.'}

Lesson compact JSON:
${JSON.stringify(generatedLessonJson || {}, null, 2)}

Return only:
{ "questions": [
  {
    "id": "",
    "questionNumber": 1,
    "difficulty": "easy|medium|hard",
    "learningTarget": "",
    "sourceReference": "",
    "stem": "",
    "supportingData": [],
    "question": "",
    "options": [{"id":"A","text":""},{"id":"B","text":""},{"id":"C","text":""},{"id":"D","text":""},{"id":"E","text":""}],
    "correctOptionId": "A",
    "explanation": "",
    "optionFeedback": {"A":"","B":"","C":"","D":"","E":""},
    "learningPoint": "",
    "memoryNote": ""
  }
]}

Quality rules:
- Exactly 10 questions: target distribution 3 easy, 5 medium, 2 hard.
- Each question must come from a real learning target in the current material packet, current sourceManifest, and generated lesson.
- If a concept is not present in the current source packet or lesson, do not ask about it. Do not reuse questions from another workspace.
- Prefer mechanism, cause-effect, table/figure-text interpretation, clinical connection, comparison, application, and common traps.
- “En uygun tanım hangisidir?” type questions are allowed at most once and only if the material is introductory.
- Options must be from the same conceptual category and plausible; avoid obviously absurd distractors.
- Do not repeat the same sentence in stem, supportingData, and question. Put background in stem, compact objective facts in supportingData, the task in question.
- Feedback for all five options is mandatory. Correct feedback explains why it fits this exact material clue. Wrong feedback explains when it could be true and why it is wrong here.
- No empty/generic fragments such as “Doğru”, “Yanlış”, “Destekleyici olabilir”.
- Anatomy feedback must not use isolated abbreviations like N., m., a.; write full Latin/Turkish names.
- Treatment/acute management questions need enough clinical context: age, stability, duration, severity, contraindication, pregnancy/pediatric context, or relevant thresholds when needed.`;
}
