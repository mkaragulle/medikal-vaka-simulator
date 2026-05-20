# V164 Clinical Cases Second Batch Added

- Added the second user-provided batch of 10 clinical cases to the embedded clinical case pool.
- Existing 10 replacement cases were preserved; total embedded case count is now 20.
- New cases were mapped to the relevant branch sections: İç Hastalıkları, Çocuk Sağlığı ve Hastalıkları, Kadın Hastalıkları ve Doğum, Küçük Stajlar and related basic-science branches where appropriate.
- Each new case preserves the simplified clinical flow: patient profile, presentation, patient history, physical exam/vitals, objective investigation data, question stem, 5 options and feedback.
- No Risk Bağlamı or Ayırt Ettirici İpuçları fields were added.
- Qualitative investigation results are kept without reference-range content where not applicable.
- Runtime checks: rawCases = 20, cases = 20, all cases have exactly 5 options, duplicate ids = 0.
- `node --check src/data/cases.js` passed.
- `npm run build` could not complete because Vite is not installed in the ZIP environment and `node_modules` is intentionally absent.
