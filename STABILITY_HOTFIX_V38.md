# KlinikIQ Stability Hotfix v38

This package intentionally restores the last stable KlinikIQ build baseline from v36.

Reason: the experimental v37 platform pivot introduced too many broad product, dashboard, onboarding, upload-workspace and AI-route changes at once, which made the app unstable. This hotfix prioritizes a working product over a fragile mega-refactor.

What is preserved:
- Existing login/auth flow
- Existing KlinikIQ dashboard
- Existing TUS Spot / AI question generation flow
- Existing Hap Bilgi card improvements
- Existing AI CTA glow effect on the home page
- Existing right-panel label/value layout fix
- Existing AI prompt / quality-gate improvements available before v37

What is intentionally not included:
- The unstable v37 broad medical-learning-platform refactor
- New onboarding flow
- Prototype PDF/PPTX learning workspace
- Prototype material-specific lesson/question/card workspace

Next recommended implementation:
Rebuild the medical-student/PDF platform in small phases on top of this stable base, starting with only one isolated route and one local data model, not by replacing the whole dashboard.
