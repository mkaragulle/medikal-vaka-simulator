# V441 Deploy Output Split from V430

Base ZIP: KlinikIQ_V430_JSON_INPUT_FIX(1).zip

Applied fixes:
- package.json engines.node set to 22.x.
- vercel.json all function maxDuration values set to 60 seconds.
- src/data/cases.js split into 20 parts: cases.part01.js ... cases.part20.js.
- src/data/cases.js kept as a small aggregator preserving rawCases, cases, getCasesByBranch, getCaseById exports.
- vite.config.js manualChunks updated so case parts and glossary indexes are emitted as smaller chunks.

Expected effect:
- Vite build should no longer emit one huge ~29 MB case-bank chunk.
- Vercel output upload/deploy stage should be safer.

No AI prompt/content behavior changes were made beyond what existed in V430.
