# KlinikIQ V375 Targeted Scrollbar Latency Audit

## User-reported issue
The user reported that the custom scrollbar sometimes appears late in the **Diğer olgular** horizontal case browser.

## Root cause assessment
- The **Diğer olgular** list is rendered as a horizontal scroll container through `CaseList` with `layout="horizontal"`.
- The global custom scrollbar system discovers scroll containers through a scheduled DOM scan.
- In V374, this scan was intentionally debounced to reduce general page lag. That reduced overhead, but it also meant newly mounted horizontal lists could wait for a MutationObserver/resize/pointer-triggered scan before their custom scrollbar appeared.
- The issue is therefore not a data/content problem; it is a refresh-timing issue between the horizontal case list render and `KlinikIQCustomScrollbars` measurement.

## Risk-sensitive conclusion
A large scrollbar refactor is unnecessary and risky. The safest fix is to keep the V374 optimizations, but add a targeted refresh signal only when the horizontal case list mounts or its visible case set changes.
