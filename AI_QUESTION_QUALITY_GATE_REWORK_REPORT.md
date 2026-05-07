# AI Question Quality Gate Rework Report

## Scope
This update strengthens the `AI ile Soru Üret` pipeline so generated questions are not rendered immediately after generation. Each candidate now passes through a quality-gate layer that repairs or rejects low-quality content before it reaches the user.

## Main changes

1. Added `src/utils/aiQuestionQualityGate.js`.
   - Detects forbidden meta/generator language.
   - Repairs patient summary, risk context, distinctive clues, stem, investigation wording, explanation, wrong-option feedback and management steps.
   - Validates age/branch/clinical coherence, especially pediatrics and OB/GYN.
   - Rebuilds weak AI summaries into concrete clinical items.

2. Reworked local generator wording.
   - Removed generic phrases such as `AI spot`, `tek öğrenme hedefi`, `çeldirici`, `doğru seçenek`, `yanıt ekseni`, and `patern yorumlaması` from generated visible fields.
   - Replaced synthetic investigation placeholders with objective clinical data language.
   - Replaced meta feedback with case-specific explanation text.

3. Strengthened validation.
   - `validateAIQuestionCase` now calls `validateAIQuestionQuality` in addition to schema, novelty and branch-fit checks.
   - Remote AI payloads are normalized, repaired and then validated before render.
   - Duplicate prevention remains active through `contentSignature`, embedded-case overlap checks and recent-history checks.

4. Improved pediatric coherence.
   - Pediatric profile is selected according to content: newborn topics use newborn profiles, recurrent infection topics use infant profiles, Kawasaki-like topics use child profiles.
   - Incompatible pairs such as `12 yaş çocuk + emme azalması` are repaired or rejected.
   - Pediatric risk and clues are concrete clinical findings rather than generic labels.

5. Improved generator performance.
   - Invalid seed IDs are remembered during a runtime session so the generator does not repeatedly retry seeds that systematically fail branch or quality validation.
   - Duplicate/recent failures are not treated as hard seed failures.

## Forbidden visible-language examples blocked

- öğrenme hedefi
- çeldirici
- doğru seçenek
- yanıt ekseni
- patern ve mekanizma
- klinik değerlendirme için ek veri
- klinik bağlamda
- bu soru
- öğrenci
- AI spot
- spot karar
- verilen öğrenme hedefi
- sonuçlar tek bir tanı adını yazmaz
- yüzeysel anahtar kelime
- tek öğrenme hedefinin doğru yorumlanmasına dayanır

## Validation rules added

- Forbidden phrase scan across visible AI question fields.
- Repeated-word / broken Turkish phrase scan.
- Pediatric age + symptom coherence check.
- OB/GYN sex/context coherence check.
- Risk context minimum quality check.
- Distinctive clues minimum quality check.
- Natural clinical history minimum quality check.
- Five-option answer structure check.
- Existing branch-fit and novelty checks are preserved.

## Repair/regenerate logic

The local generator now runs:

`generate candidate → repair quality fields → attach dedupe fields → schema/branch/quality/novelty validation → render if valid; otherwise retry next seed/variant`.

For remote AI:

`fetch payload → schema normalize → repair visible fields → attach dedupe fields → validate quality/branch/novelty → render if valid; otherwise retry/fallback`.

## Test results

### 20-question quality test
- Generated: 20
- Unique IDs: 20/20
- Unique content signatures: 20/20
- Forbidden/meta phrase failures: 0
- Quality validation failures: 0
- General validation failures: 0

### Pediatrics branch test
- Generated: 10
- Adult/geriatric pediatric profile: 0
- Age-incompatible `emme azalması`: 0
- Forbidden/meta phrase failures: 0
- Quality validation failures: 0

### 50-question deduplication test
- Generated: 50
- Unique IDs: 50/50
- Unique content signatures: 50/50
- Duplicate validation failures: 0
- Elapsed local generation test: ~13.9 seconds in Node environment

## Build status

- JS syntax/import checks passed for utility, service and data modules.
- `npm run build` could not complete in this environment because `node_modules` is absent and Vite is not installed: `sh: 1: vite: not found`.
- Run `npm install` locally first, then `npm run build`.
