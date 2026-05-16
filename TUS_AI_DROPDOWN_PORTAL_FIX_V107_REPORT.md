# KlinikIQ — TUS AI Dropdown Portal Fix V107

## Problem
The custom `Konu / Branş` and `Zorluk` dropdown menus were visually trapped under the surrounding AI question-generation card/content area.

## Fix
- The dropdown menu is now rendered through a React portal into `document.body`.
- The menu uses `position: fixed` with live trigger-based placement.
- It recalculates position on scroll and resize.
- It opens upward when there is not enough space below.
- A very high z-index and dedicated floating styles prevent clipping under cards, grid sections, and parent overflow contexts.

## Files changed
- `src/components/AIGeneratedQuestionView.jsx`
- `src/index.css`

## Note
Local build was not run because the ZIP package does not include `node_modules`.
