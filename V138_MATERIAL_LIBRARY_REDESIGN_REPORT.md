# V138 Material Library Redesign

- Removed the "Çalıştıklarım" kicker from the Material Library page.
- Reworked the material library into a compact multi-level archive: class year → committee/topic → material.
- Added class-level and committee-level accordion behavior so long-term medical school usage remains navigable.
- Added compact library stats for class count, material count, and flashcard count.
- Improved material rows with clean status pills, date/course metadata, active state, and delete action preservation.
- Preserved existing KOMİTE workspace opening and material deletion behavior.
- Verified with `npm run build` after installing dependencies locally; `node_modules`, `dist`, and temporary install artifacts were removed before zipping.
