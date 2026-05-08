$endpoint = if ($env:KLINIKIQ_AI_ENDPOINT) { $env:KLINIKIQ_AI_ENDPOINT } else { "https://medikal-vaka-simulator-yl76.vercel.app/api/generate-ai-question" }
$branches = @("pediatrics", "internal-medicine", "cardiology", "neurology", "surgery")
$expectedFastModel = "google/gemini-2.5-flash-lite"

Write-Host "Endpoint: $endpoint"
Write-Host "Expected model: $expectedFastModel"
Write-Host ""

for ($i = 1; $i -le 10; $i++) {
  $branch = $branches[($i - 1) % $branches.Count]
  $body = @{
    branchFilter = $branch
    previousQuestionId = $null
    recentIds = @()
    recentSignatures = @()
    recentQuestionSummaries = @()
    attempt = $i
    antiRepeatNonce = [guid]::NewGuid().ToString()
  } | ConvertTo-Json -Depth 10

  $sw = [System.Diagnostics.Stopwatch]::StartNew()
  try {
    $r = Invoke-WebRequest `
      -Uri $endpoint `
      -Method POST `
      -ContentType "application/json" `
      -Body $body `
      -TimeoutSec 90 `
      -UseBasicParsing

    $sw.Stop()
    $json = $r.Content | ConvertFrom-Json
    $model = $json.question.openRouterModel
    $time = [math]::Round($sw.Elapsed.TotalSeconds, 2)
    $slowFlag = if ($model -and ($model -notlike "*$expectedFastModel*")) { " SLOW_MODEL_CHECK_ENV" } else { "" }
    Write-Host "[$i] OK=$($json.ok) PROVIDER=$($json.provider) TIME=${time}s MODEL=$model$slowFlag TITLE=$($json.question.title)"
  }
  catch {
    $sw.Stop()
    Write-Host "[$i] ERROR TIME=$([math]::Round($sw.Elapsed.TotalSeconds, 2))s"
    Write-Host $_.Exception.Message
    if ($_.ErrorDetails.Message) { Write-Host $_.ErrorDetails.Message }
  }
}
