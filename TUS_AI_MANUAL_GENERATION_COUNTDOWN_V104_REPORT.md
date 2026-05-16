# TUS AI Manual Generation + Countdown V104

## Applied changes
- AI TUS question screen no longer auto-generates a question when the user enters the page.
- Changing branch or difficulty no longer triggers automatic generation.
- Question generation starts only when the user clicks the generate button.
- Added a ready state prompting the user to choose branch and difficulty first.
- Added a live countdown during AI generation: 9 sn, 8 sn, 7 sn...
- Loading state keeps filters disabled while generation is running.

## Files changed
- `src/App.jsx`
- `src/components/AIGeneratedQuestionView.jsx`
- `src/index.css`

## Build note
- Local build could not complete in this environment because the `vite` executable returned `Permission denied`.
