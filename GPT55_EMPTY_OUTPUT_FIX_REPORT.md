# GPT-5.5 output compatibility fix

This project uses GPT-5.5 through the Responses API for KOMITE and TUS generation.

Current fix:
- Custom temperature values are not sent to GPT-5.5.
- Reasoning effort is normalized before sending to OpenAI.
- If an old environment value uses `minimal`, the server maps it to `low` automatically.
- Recommended values are `low` or `none` for fast request/response generation.
- KOMITE continues to use only the current upload batch text from `materialPacket.files[].cleanedExtractedText`.
