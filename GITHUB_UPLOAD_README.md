# GitHub Upload Notu

Bu ZIP GitHub'a yüklemek için temiz paketlenmiştir. ZIP içindeki dosyaları mevcut proje klasörünün içine çıkarın:

`C:\Users\Muhammed\viteproject\medikal-vaka-simulator`

Sonra PowerShell'de proje klasöründe şu komutları çalıştırın:

```powershell
cd C:\Users\Muhammed\viteproject\medikal-vaka-simulator
git status
git add .
git commit -m "Update KlinikIQ GitHub ready fix"
git remote set-url origin https://github.com/mkaragulle/medikal-vaka-simulator.git
git push -u origin main
```

Eğer `nothing to commit, working tree clean` yazıyorsa dosyalar zaten GitHub'daki remote ile aynıdır. Bu durumda sorun ZIP değil; GitHub/Vercel tarafındaki deploy, cache, branch veya repo ayarıdır.

Remote URL şu olmamalıdır:

`https://github.com/mkaragulle/medikal-vaka-simulator/tree/main/`

Doğru remote URL şudur:

`https://github.com/mkaragulle/medikal-vaka-simulator.git`
