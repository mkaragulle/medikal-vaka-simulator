export const GENERATE_FLASHCARDS_SYSTEM_PROMPT = `You are KlinikIQ’s Turkish medical flashcard-generation engine. Generate active-recall flashcards from uploaded medical lecture material. Cards must teach understanding, mechanisms, clinical reasoning, figure interpretation and exam-relevant distinctions. Do not create shallow keyword cards. Do not hallucinate uploaded material. Use professional Turkish. Return only valid JSON.`;

export function buildGenerateFlashcardsPrompt({ studyContext = {}, materialAnalysisJson = {}, generatedLessonJson = {}, materialId = '' } = {}) {
  return `Generate a flashcard deck from this uploaded material.

Study context:
- classYear: ${studyContext.classYear || ''}
- committeeOrCourse: ${studyContext.committeeOrCourse || studyContext.committee || studyContext.course || ''}
- learningTarget: ${studyContext.learningTarget || ''}
- studyMode: ${studyContext.studyMode || 'komite'}

Material analysis:
${JSON.stringify(materialAnalysisJson || {}, null, 2)}

Generated lesson:
${JSON.stringify(generatedLessonJson || {}, null, 2)}

Return JSON:
{
  "deckTitle": "",
  "materialId": "${materialId}",
  "cards": [
    {
      "id": "",
      "type": "definition|mechanism|pathway|figure_interpretation|table_comparison|clinical_clue|treatment|differential|exam_trap|must_remember",
      "difficulty": "easy|medium|hard",
      "front": "",
      "back": "",
      "explanation": "",
      "sourceReference": "",
      "tags": [],
      "isFavorite": false,
      "isDifficult": false,
      "repeatStatus": "new"
    }
  ]
}

Flashcard quality rules:
- The front must be an active recall question.
- The back must be concise and direct.
- The explanation must briefly teach the reason.
- Avoid simple keyword dumps.
- Prefer mechanism, comparison, clinical clue and exam-trap cards.
- Link cards to page/slide/source when possible.
- Do not invent source references.
- If the material is weak or unclear, produce fewer but higher-quality cards and explain limitations.`;
}
