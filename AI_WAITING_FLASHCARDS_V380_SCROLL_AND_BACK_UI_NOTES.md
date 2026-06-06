# V380 — AI Waiting Flashcards Scroll + Back Face UI Refinement

- AI question generation waiting mode now focuses the waiting/flashcard area instead of leaving the user at the top of the page.
- While a question is being generated or ready-but-not-revealed, hero/stats sections are hidden so the mini-review area greets the user without manual scrolling.
- The ready CTA text is simplified to only “Soruyu Gör”.
- The ready CTA visual style was made more prominent with a stronger teal gradient, shine, ring and hover elevation.
- Flashcard helper tags such as “Cevap için karta dokun” / “Soruya dönmek için tekrar dokun” remain visually removed.
- The back face keeps two clean blocks: green answer area and orange explanation area, without extra labels/tags.
- Build verified with Vite using `node node_modules/vite/bin/vite.js build` because the unpacked local `.bin/vite` wrapper was not symlinked correctly after zip extraction.
