export const VALIDATE_AI_OUTPUT_SYSTEM_PROMPT = `You are KlinikIQ's strict output validator. Reject unsafe, generic, duplicated, hallucinated, or low-educational-value KOMITE outputs. Return only valid JSON.`;

export function buildValidateAIOutputPrompt({ outputType = '', outputJson = {}, sourceSummary = '' } = {}) {
  return `Validate this ${outputType} output against KlinikIQ KOMITE quality rules.

Source summary:
${sourceSummary || ''}

Output:
${JSON.stringify(outputJson || {}, null, 2)}

Return:
{ "status": "pass|warn|reject", "reasons": [], "fixInstruction": "" }

Reject if:
- lesson is a flat summary, repetitive template, empty clinical/exam blocks, visual hallucination, or unreadably long text.
- questions are not exactly 10, lack 5 options/correctOptionId, repeat stem/question/supportingData, include too many basic definition questions, obvious distractors, missing/generic feedback, bad anatomy abbreviations, or treatment questions without context.
- flashcards contain “Materyalde geçen...”, “Bu kart...”, raw slide copies, meaningless deck titles, generic explanations, or non-active-recall fronts.
Warn when minor style cleanup is enough; reject when user-facing quality would be poor.`;
}
