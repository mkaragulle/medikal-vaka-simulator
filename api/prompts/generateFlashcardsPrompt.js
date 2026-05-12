export const GENERATE_FLASHCARDS_SYSTEM_PROMPT = `You are KlinikIQ's active-recall flashcard engine for KOMITE materials. Create short Turkish cards that make the student retrieve useful exam knowledge. Do not copy slide sentences or write meta cards about the material. Return only valid JSON.`;

export function buildGenerateFlashcardsPrompt({ studyContext = {}, materialAnalysisJson = {}, generatedLessonJson = {}, materialId = '' } = {}) {
  return `Create 12-20 high-quality active recall flashcards from this material. If the source is weak, create at least 8 but do not create nonsense cards.

Context:
${JSON.stringify(studyContext || {}, null, 2)}

Material analysis:
${JSON.stringify(materialAnalysisJson || {}, null, 2)}

Lesson compact JSON:
${JSON.stringify(generatedLessonJson || {}, null, 2)}

Return only:
{
  "deck": {
    "id": "",
    "deckTitle": "",
    "materialId": "${materialId}",
    "cards": [
      { "id": "", "type": "definition|mechanism|comparison|clinical_clue|exam_trap|visual|treatment|differential|must_know", "difficulty": "easy|medium|hard", "front": "", "back": "", "explanation": "", "sourceReference": "", "tags": [], "isFavorite": false, "isDifficult": false, "repeatStatus": "new" }
    ]
  }
}

Rules:
- Front must be a real active recall question, not “Materyalde geçen...” or “Bu bilgi neyi hatırlatır?”.
- Back must be short and direct.
- Explanation teaches the logic in 1-3 concise sentences.
- Transform slide information into exam retrieval; do not paste long quoted sentences.
- Avoid low-value etymology or empty definition cards.
- Include card types across definition, mechanism, comparison, clinical clue, exam trap, visual/table clue if supported, treatment/approach if supported.
- Clean deckTitle; never use raw meaningless filenames such as “das Hap Kartları”.
- Do not write “Bu kart materyalden...” or any self-referential/meta explanation.`;
}
