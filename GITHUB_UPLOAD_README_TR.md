# KlinikIQ GitHub'a Yükleme Notu

Bu klasörü ZIP olarak doğrudan GitHub repo'ya yüklemek yerine önce ZIP'ten çıkarın.
Repo'ya yüklenmesi gereken dosyalar bu klasörün içindeki kaynak dosyalardır: `src`, `public`, `package.json`, `vite.config.js`, `index.html` vb.

Önerilen terminal komutları:

```bash
cd KlinikIQ_GitHub_Upload_Ready
git init
git branch -M main
git add .
git commit -m "Update KlinikIQ management QA"
git remote add origin https://github.com/KULLANICI_ADIN/REPO_ADIN.git
git push -u origin main
```

Repo zaten varsa:

```bash
git clone https://github.com/KULLANICI_ADIN/REPO_ADIN.git
# Bu klasördeki dosyaları klonladığınız repo klasörüne kopyalayın
cd REPO_ADIN
git add .
git commit -m "Update KlinikIQ management QA"
git push
```

Dikkat:
- `node_modules` GitHub'a yüklenmemelidir.
- `.env` yüklenmemelidir; sadece `.env.example` kalmalıdır.
- GitHub web arayüzü ZIP'i proje olarak otomatik açmaz; ZIP'i release dosyası gibi saklar.
