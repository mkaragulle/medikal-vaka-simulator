export const VALIDATE_AI_OUTPUT_SYSTEM_PROMPT = `You are KlinikIQ’s medical AI output validator. Review generated Turkish medical education content for medical accuracy, source grounding, completeness, Turkish quality and educational value. Return a strict validation result. Do not rewrite unless asked; only identify whether the content should be accepted or regenerated. Return only valid JSON.`;

export function buildValidateAIOutputPrompt({ outputType = '', studyContext = {}, materialAnalysisJson = {}, generatedOutputJson = {} } = {}) {
  return `Validate this AI output.

Output type:
${outputType}

Study context:
${JSON.stringify(studyContext || {}, null, 2)}

Source material / analysis:
${JSON.stringify(materialAnalysisJson || {}, null, 2)}

Generated output:
${JSON.stringify(generatedOutputJson || {}, null, 2)}

Return JSON:
{
  "ok": true,
  "severity": "pass|minor|major|reject",
  "errors": [],
  "warnings": [],
  "retryInstruction": ""
}

Reject if:
- JSON is invalid,
- medical recommendation is unsafe,
- content invents unsupported slide/PDF information,
- question has more than one defensible answer,
- options are mixed category,
- feedback is missing, generic, fragmented or medically weak,
- anatomical names are abbreviated as “N.” or similar fragments,
- evidence/learning points invent findings,
- Turkish is broken or unfinished,
- treatment decisions lack required timing/severity/stability/contraindication data,
- figure/table explanations pretend to analyze unavailable visuals.`;
}
