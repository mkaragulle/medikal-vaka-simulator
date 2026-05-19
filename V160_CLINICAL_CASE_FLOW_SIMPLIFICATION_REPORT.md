# V160 Clinical Case Flow Simplification

## Scope
- Reworked embedded clinical case presentation flow for 300 cases.
- Removed early hint-heavy sections from the visible case summary.
- Preserved the existing TUS AI question generation prompt and AI generation flow.

## Main changes
- Removed visible `Risk bağlamı` and `Ayırt ettirici ipuçları` sections from the embedded case UI.
- Renamed `Kısa Klinik Öykü Özeti` to `Hasta Öyküsü`.
- Changed the investigation panel title to `Objektif Veri / Tetkik`.
- Reorganized case data so history contains patient-reportable information, exam contains direct physical examination findings, and investigations contain laboratory/ECG/imaging/objective data.
- Cleaned generic placeholder texts such as `klinik bağlama göre`, `hedef görüntüleme`, `objektif sonuç`, and similar non-clinical phrases.
- Maintained 300 embedded cases and 5 options per case.

## Checks
- rawCases: 300
- runtime cases: 300
- 5-option validation: passed
- risk/distinctive visible-field cleanup: passed
- generic investigation placeholder cleanup: passed
- objective data leakage into patient history: checked
- `node --check src/data/cases.js`: passed
- `npm run build`: not completed because dependency installation timed out in sandbox and node_modules is intentionally excluded from the ZIP.
