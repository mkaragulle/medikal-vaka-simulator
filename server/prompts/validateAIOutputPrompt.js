export const VALIDATE_AI_OUTPUT_SYSTEM_PROMPT = `You are a simple JSON quality checker for KlinikIQ KOMITE outputs. Return only valid JSON.`;

export function buildValidateAIOutputPrompt({ outputType = '', outputJson = {}, sourceSummary = '' } = {}) {
  return `Check whether this ${outputType} output is usable.

Source summary:
${sourceSummary || ''}

Output:
${JSON.stringify(outputJson || {}, null, 2)}

Return:
{ "status": "pass|warn|reject", "reasons": [], "fixInstruction": "" }

Reject only if the JSON is unusable, clearly empty, obviously unrelated to the provided source summary, or contains raw metadata/field names as learner-facing content.`;
}
