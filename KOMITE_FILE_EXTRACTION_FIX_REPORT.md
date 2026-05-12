# KOMITE File Extraction Fix v38

## Problem
KOMITE mode accepted PDF/PPTX/DOCX files as metadata only. When the user clicked lesson/question/card generation, the system often produced a generic placeholder such as “dosya metni ayrıştırılamadığı için...” instead of using the uploaded material.

## What changed
- Added real client-side text extraction for supported files:
  - PDF: readable text layer extraction via `pdfjs-dist`
  - PPTX: slide text extraction via `JSZip`
  - DOCX: document text extraction via `JSZip`
  - TXT/MD: direct text reading
- Added extraction feedback in the upload UI:
  - number of detected pages/slides/sections
  - extracted character count
  - limitations when the file is scanned or not readable
- Saved extraction metadata in each `UploadedMaterial`:
  - `detectedStructure`
  - `extractionNotice`
  - `extractionLimitations`
  - `extractedText`
- Improved local fallback lesson/question/card generation:
  - if OpenAI is unavailable, local output now uses extracted source text instead of generic metadata-only placeholders
  - if no text can be extracted, the app clearly says why and does not pretend to analyze the file

## Changed files
- `package.json`
  - Added `pdfjs-dist` and `jszip`.
- `src/utils/komiteFileExtraction.js`
  - New extraction utility for PDF/PPTX/DOCX/TXT/MD.
- `src/components/KomiteModeWorkspace.jsx`
  - Upload flow now extracts text immediately.
  - Material records now store extracted text and extraction metadata.
  - Local lesson/question/flashcard fallback now uses real extracted source text when available.

## Supported behavior after this fix
1. User uploads a readable PDF/PPTX/DOCX/TXT file.
2. The UI extracts text immediately and shows extraction status.
3. When lesson/questions/cards are generated, the uploaded material text is used.
4. If the AI API is configured, server-side AI routes receive the extracted text.
5. If the AI API is not configured, the local fallback still creates source-driven output from the extracted text.
6. If the file is scanned/image-only and has no readable text layer, the system gives a clear limitation instead of fake analysis.

## Tests performed
- `src/**/*.js(x)` TypeScript JSX transpilation check: passed.
- `api/**/*.js` `node --check`: passed.
- `npm install` was attempted in the sandbox but timed out due environment/network limits, so a full Vite build could not be completed here.

## Required local test
Run locally or on Vercel:

```bash
npm install --package-lock=false --legacy-peer-deps --no-audit --no-fund
npm run build
npm run dev
```

Then test with:
- a text-layer PDF
- a PPTX with editable text boxes
- a DOCX with normal document text
- a scanned/image-only PDF to confirm the limitation message appears
