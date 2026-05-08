$endpoint = "https://medikal-vaka-simulator-yl76.vercel.app/api/generate-ai-question"
$branches = @("pediatrics", "internal-medicine", "cardiology", "neurology", "surgery")

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
      -TimeoutSec 120 `
      -UseBasicParsing

    $sw.Stop()
    $json = $r.Content | ConvertFrom-Json
    Write-Host "[$i] OK=$($json.ok) PROVIDER=$($json.provider) TIME=$([math]::Round($sw.Elapsed.TotalSeconds, 2))s MODEL=$($json.question.openRouterModel) TITLE=$($json.question.title)"
  }
  catch {
    $sw.Stop()
    Write-Host "[$i] ERROR TIME=$([math]::Round($sw.Elapsed.TotalSeconds, 2))s"
    Write-Host $_.Exception.Message
    Write-Host $_.ErrorDetails.Message
  }
}
