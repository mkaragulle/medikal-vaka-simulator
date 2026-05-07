# AI ile Soru Üret — Build / Validation Result

## Yapılan kontroller
- `node --check src/data/aiQuestionSeeds.js`: geçti
- `node --check src/utils/aiQuestionGenerator.js`: geçti
- `node --check src/services/aiQuestionService.js`: geçti
- Babel parser ile `src` altındaki JS/JSX dosyalarının statik parse kontrolü: geçti
- `createAIQuestion()` smoke test: geçti

## Build durumu
`npm install --ignore-scripts --no-audit --no-fund --loglevel=error` sandbox ortamında zaman aşımına uğradı. Bu nedenle `node_modules` oluşmadı ve `npm run build` için `vite: not found` hatası alındı.

Local makinede çalıştırılması gereken komutlar:

```bash
npm install
npm run build
npm run dev
```
