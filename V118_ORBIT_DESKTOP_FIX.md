# V118 Orbit Desktop Fix

This patch fixes the auth hero orbital illustration on desktop by replacing fragile coordinate rules with a transform-only, single-center orbit system.

Main fixes:
- Removed reliance on the individual CSS `translate` property for ring/core centering.
- Reset `.auth-orbit-item` from inherited `width: 0; height: 0` to `width: 100%; height: 100%`.
- Removed per-icon negative animation delays so all badges preserve equal angular spacing while rotating as one system.
- Forced rings, shield core and badges to share the exact same center point.
- Kept all badges inside the illustration bounds by calculating radius from orbit size and badge size.
- Prevented pseudo-element leftovers from previous orbit implementations.
