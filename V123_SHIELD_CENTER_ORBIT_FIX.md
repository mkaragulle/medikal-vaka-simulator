# V123 Shield-Centered Orbit Fix

- Shield is fixed at the exact center.
- All non-shield icons are inside `.kq-orbit-rotor`, which rotates around the shield/stage center.
- Fixed the previous cause of non-motion: a static `transform: translate(-50%, -50%) !important` on `.kq-orbit-rotor` prevented keyframe transforms from applying.
- Reduced-motion no longer freezes the orbit; it slows the animation instead, preventing accidental desktop-static behavior.
