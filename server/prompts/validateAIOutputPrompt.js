export const VALIDATE_AI_OUTPUT_SYSTEM_PROMPT = `You are KlinikIQ's medical education output quality auditor. Return only valid JSON.`;

export function buildValidateAIOutputPrompt({
  outputType = '',
  outputJson = null,
  generatedOutputJson = null,
  sourceSummary = '',
  studyContext = null,
  materialAnalysisJson = null,
} = {}) {
  const output = outputJson || generatedOutputJson || {};
  return `Audit this ${outputType} output for publication quality, not just JSON shape.

Source summary:
${sourceSummary || ''}

Study context:
${JSON.stringify(studyContext || {}, null, 2)}

Material analysis:
${JSON.stringify(materialAnalysisJson || {}, null, 2)}

Output:
${JSON.stringify(output || {}, null, 2)}

Required checks:
- Reject if the output is empty, unrelated to the current source, or contains metadata/file names as learner-facing content.
- For questions, reject if any stem lacks enough data to select one answer, if correctOptionId is not supported by stem/supportingData, or if another option is stronger.
- Reject if explanation or optionFeedback uses source/patient-specific facts that are not visible in the stem/supportingData.
- Reject if optionFeedback is missing for A-E, generic, duplicated, placeholder-like, or not specific to the option.
- Reject fallback phrases such as "Bu seçenek klinik bağlamda öncelikli değildir", "verilen bulgularla yeterince uyumlu değildir", "temel karar noktasını açıklamaz", or "bu nedenle uygun değildir" when they stand alone.
- Reject broken/truncated text, three-dot endings, malformed Turkish, or text that looks mechanically shortened.
- Warn when the output is usable but needs editorial polish that does not affect scientific correctness or answer validity.

Return only:
{ "status": "pass|warn|reject", "reasons": [], "fixInstruction": "" }`;
}
