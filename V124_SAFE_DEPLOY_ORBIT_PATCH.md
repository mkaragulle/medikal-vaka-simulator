# V124 safe deploy orbit patch

This version is based on the last known valid JSX structure and avoids risky markup rewrites.

- The center shield is fixed.
- The surrounding 6 icons rotate around the shield through `.kq-orbit-track`.
- The icons receive counter-rotation to remain visually upright.
- Reduced motion is softened instead of accidentally freezing desktop animation.
- `ShieldCheck` was removed from the surrounding icon list because the central shield already represents that concept.
