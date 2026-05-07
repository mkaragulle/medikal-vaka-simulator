# Recovery steps after accidental delete commit

If you accidentally committed and pushed a deletion commit, restore first:

```powershell
cd C:\Users\Muhammed\viteproject\medikal-vaka-simulator
git revert --no-edit 6b1b35f
git push
```

Then extract this ZIP to a temporary folder and copy its contents into the repo root. Do not delete `src`, `public`, `api`, or `scripts` before confirming the ZIP path exists.

Recommended PowerShell:

```powershell
$zip = "$env:USERPROFILE\Downloads\KlinikIQ_RECOVERY_FULL_PROJECT_REPOROOT.zip"
$repo = "C:\Users\Muhammed\viteproject\medikal-vaka-simulator"
$tmp = "C:\Users\Muhammed\viteproject\klinikiq_restore"

Test-Path $zip
Remove-Item $tmp -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path $tmp | Out-Null
Expand-Archive -LiteralPath $zip -DestinationPath $tmp -Force
Test-Path "$tmp\package.json"
Test-Path "$tmp\src\App.jsx"
robocopy $tmp $repo /E /XD .git node_modules dist
cd $repo
git status
git add -A
git commit -m "Restore KlinikIQ full project after clean QA fixes"
git push
```
