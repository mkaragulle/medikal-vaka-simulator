# KlinikIQ OpenRouter Final Fix Report

## Main cause found

The OpenRouter endpoint was working, but two issues still caused the frontend to fall back to the local generator:

1. The selected OpenRouter free model returned after about 60 seconds, while the frontend default timeout was still 30 seconds.
2. Remote questions returned IDs such as `ai-generated-openrouter-...`; the client-side validator requires AI question IDs to start with `ai-spot`. Therefore valid remote responses could be rejected after they reached the browser.
3. Pediatric remote responses such as `2 yaşında kız çocuğu` were incorrectly rejected by the branch demographic validator because the pediatric regex matched `çocuk` but not `çocuğu`.
4. Internally generated fallback comparison text used the phrase `belirli klinik koşullarda doğru olabilir`, which the quality gate itself marks as template-like. This caused remote questions to fail client validation even when the model output was acceptable.

## Code changes

- `src/services/aiQuestionService.js`
  - Default frontend AI timeout increased from 30 seconds to 90 seconds.
  - Remote retry count default reduced from 2 to 1 to avoid waiting twice for a slow model.

- `api/generate-ai-question.js`
  - OpenRouter default max tokens reduced from 2800 to 1600.
  - Default temperature/top-p reduced for faster and cleaner JSON.
  - Remote IDs now start with `ai-spot-real-*`.

- `src/utils/validateAIQuestion.js`
  - Remote IDs are normalized to a safe `ai-spot-*` ID if the provider sends a non-compatible ID.
  - Internal option-comparison fallback text no longer uses phrases that the quality gate rejects.

- `src/utils/aiBranchRules.js`
  - Pediatric demographic validation now accepts Turkish inflected forms such as `çocuğu`, `çocukta`, and `çocuklarda`.

- `vercel.json`
  - Added Vercel function `maxDuration: 60` for `api/generate-ai-question.js`.

## Recommended Vercel environment variables

Use these values in Production + Preview, then redeploy:

```txt
AI_PROVIDER=openrouter
OPENROUTER_API_KEY=<your OpenRouter key>
OPENROUTER_MODEL=google/gemini-2.5-flash-lite
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_SITE_URL=https://medikal-vaka-simulator-yl76.vercel.app
OPENROUTER_APP_TITLE=KlinikIQ
OPENROUTER_MAX_TOKENS=1600
OPENROUTER_TEMPERATURE=0.72
OPENROUTER_TOP_P=0.9
OPENROUTER_USE_JSON_MODE=true
OPENROUTER_REASONING_ENABLED=false
OPENROUTER_REASONING_EXCLUDE=true
VITE_ENABLE_REAL_AI=true
VITE_AI_QUESTION_ENDPOINT=/api/generate-ai-question
VITE_AI_REQUEST_TIMEOUT_MS=90000
VITE_AI_REMOTE_RETRY_COUNT=1
```

Free but slow alternative:

```txt
OPENROUTER_MODEL=openai/gpt-oss-120b:free
```

This free model may take close to 60 seconds. For a usable app experience, a fast low-cost model is recommended.

## Local commands

```bash
npm install
npm run build
npm run dev
```

## Endpoint test command

```powershell
$body = @{
  branchFilter = "pediatrics"
  previousQuestionId = $null
  recentIds = @()
  recentSignatures = @()
  recentQuestionSummaries = @()
  attempt = 1
  antiRepeatNonce = [guid]::NewGuid().ToString()
} | ConvertTo-Json -Depth 10

$sw = [System.Diagnostics.Stopwatch]::StartNew()

try {
  $r = Invoke-WebRequest `
    -Uri "https://medikal-vaka-simulator-yl76.vercel.app/api/generate-ai-question" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body `
    -TimeoutSec 120 `
    -UseBasicParsing

  $sw.Stop()
  "STATUS: $($r.StatusCode)"
  "TIME: $($sw.Elapsed.TotalSeconds) seconds"
  $r.Content
}
catch {
  $sw.Stop()
  "TIME: $($sw.Elapsed.TotalSeconds) seconds"
  "ERROR:"
  if ($_.Exception.Response) {
    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    $reader.ReadToEnd()
  } else {
    $_.Exception.Message
  }
}
```
