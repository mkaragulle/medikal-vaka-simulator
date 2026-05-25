# KlinikIQ V375 Other Cases Scrollbar Fast Refresh Audit

## Scope
This pass focused only on the intermittent late custom-scrollbar appearance in the **Diğer olgular** horizontal case browser. Medical/TUS content, answers, feedback, glossary data, visual identity, custom cursor and custom scrollbar design were not changed.

## Finding
The custom scrollbar system intentionally avoids expensive full-DOM scans by using debounced `MutationObserver` scans, capped candidate tracking and throttled pointer activity. This improves general smoothness, but the **Diğer olgular** horizontal list can mount after the case player layout changes and wait for the generic scan window before its custom scrollbar is registered.

## Root Cause
- `.horizontal-case-list` was already part of the general candidate selector, but discovery still depended on a delayed global scan.
- The horizontal list is created inside a bottom browser that appears after selected-case route/layout changes, so the visible content could exist before the custom scrollbar entry was created.
- Because native scrollbars are globally hidden by the custom scrollbar system, this short discovery delay felt like the scrollbar was loading late.

## Fix Strategy
- Mark horizontal case lists as explicit, high-priority scroll containers.
- Dispatch a lightweight scrollbar-refresh event immediately after the horizontal list mounts and after the next layout frame.
- Teach `KlinikIQCustomScrollbars` to listen for this explicit refresh signal and run an immediate targeted rescan with two short settle scans.
- Prioritize `[data-ki-scroll-priority]` and `.bottom-case-browser .horizontal-case-list` before lower-priority scrollable candidates so the list is not skipped by the tracking cap.

## Expected Result
The **Diğer olgular** custom scrollbar should appear much sooner after opening/changing cases or filtering the bottom list, without disabling the custom scrollbar system or reintroducing heavy full-DOM scanning.
