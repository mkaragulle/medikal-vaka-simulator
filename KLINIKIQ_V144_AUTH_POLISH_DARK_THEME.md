# KlinikIQ v144 — Auth polish + dark theme hardening

- The login/register screen was visually refined with stronger panel depth, clearer CTA hierarchy, compact proof chips, and cleaner feature-card rhythm.
- The existing orbital animation component and its animation CSS were intentionally left unchanged.
- Dark mode was hardened with auth-specific CSS variables and late-stage overrides for panels, text, inputs, buttons, feature cards, note boxes, and the theme toggle.
- Mobile/tablet auth scrolling was improved so the locked auth shell does not clip content on shorter screens.
- Email/password fields now include basic required/min-length constraints for better native UX before submit.
