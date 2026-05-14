KOMITE empty output fix

Changes applied:
- KOMITE OpenAI calls now use the Responses API automatically for GPT-5 class models.
- Structured JSON output is sent through the Responses API text.format json_schema field.
- Reasoning effort defaults to minimal for faster visible output instead of spending the whole budget internally.
- Text extraction now reads both top-level output_text and nested output content parts.
- Empty model output now returns a useful diagnostic message instead of the generic empty response error.
- TUS OpenAI calls also support the same GPT-5 compatible Responses API settings.
- No topic-specific source terms or hardcoded subject detectors were added.

Recommended environment additions:
TUS_OPENAI_API_STYLE=responses
TUS_OPENAI_REASONING_EFFORT=minimal
TUS_OPENAI_VERBOSITY=medium
KOMITE_OPENAI_API_STYLE=responses
KOMITE_OPENAI_REASONING_EFFORT=minimal
KOMITE_OPENAI_VERBOSITY=medium
