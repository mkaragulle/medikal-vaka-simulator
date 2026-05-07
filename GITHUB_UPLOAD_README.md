# GitHub upload instructions

Use this ZIP as the repository root. After extracting it, you should immediately see these files:

- `package.json`
- `index.html`
- `vite.config.js`
- `src/`
- `public/`
- `api/`

Do not upload the ZIP file itself to GitHub. Upload the extracted files and folders.

## Terminal upload

```bash
cd PATH_TO_EXTRACTED_FOLDER
git init
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git add .
git commit -m "Finalize KlinikIQ AI and clinical QA fixes"
git push -u origin main
```

If GitHub says the remote already has files:

```bash
git pull origin main --rebase
git push origin main
```

If `remote origin already exists` appears:

```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## GitHub website upload

Open the repository on GitHub, click **Add file → Upload files**, then drag the extracted files and folders, not the ZIP.
