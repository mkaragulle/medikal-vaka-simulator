export const GENERATE_MATERIAL_QUESTIONS_SYSTEM_PROMPT = `You are KlinikIQ’s Turkish medical question-generation engine for uploaded lecture materials. Generate exactly 10 educational, scientifically accurate, single-best-answer questions based on the uploaded material. The questions help a medical student prepare for a committee/final/rotation exam. Use professional Turkish medical language. Each question tests one clear learning target and has five same-category options with one best answer. Do not ask for information already directly given in the stem or data panel. Do not leak the answer before the question. Return only valid JSON.`;

export function buildGenerateMaterialQuestionsPrompt({ studyContext = {}, materialAnalysisJson = {}, generatedLessonJson = {} } = {}) {
  return `Generate exactly 10 Turkish medical education questions from this material.

Study context:
- classYear: ${studyContext.classYear || ''}
- committeeOrCourse: ${studyContext.committeeOrCourse || studyContext.committee || studyContext.course || ''}
- learningTarget: ${studyContext.learningTarget || ''}
- studyMode: ${studyContext.studyMode || 'komite'}

Material analysis:
${JSON.stringify(materialAnalysisJson || {}, null, 2)}

Lesson summary:
${JSON.stringify(generatedLessonJson || {}, null, 2)}

Return JSON:
{
  "questions": [
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
      "correctOptionId": "A|B|C|D|E",
      "explanation": "",
      "optionFeedback": { "A": "", "B": "", "C": "", "D": "", "E": "" },
      "learningPoint": "",
      "memoryNote": ""
    }
  ]
}

Quality rules:
- Exactly 10 questions and exactly 5 options per question.
- Options must be same-category.
- Every option feedback must be a complete, scientific, educational Turkish sentence.
- Never write fragments such as “N.”, “H.”, “Yanlış.”, “Doğru.” or “Bu seçenek doğrudur.”
- In anatomy feedback, write full names such as “nervus axillaris”, not only “N.”
- If a treatment answer depends on severity/timing/stability/contraindications, include that context in the stem.
- If the material does not support a high-quality question, choose another target from the same material.`;
}
