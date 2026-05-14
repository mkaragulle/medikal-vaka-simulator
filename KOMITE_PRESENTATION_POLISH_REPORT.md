# KOMITE Presentation Polish Fix

This update changes only neutral presentation and formatting behavior.

## Changed
- The KOMITE lesson prompt stays source-only and avoids topic-specific examples or trigger terms.
- The workspace title now prefers the generated academic lesson title when available instead of raw file-name-like labels.
- Quick access now lists only the main lesson sections instead of utility sections.
- Lesson paragraphs preserve line breaks better.
- Markdown-style bullet lines are rendered as bullet lists instead of being flattened into long paragraphs.
- Long paragraph splitting no longer duplicates paragraphs.

## Not changed
- No topic-specific detectors were added.
- No hardcoded medical concepts were added.
- Current-batch source isolation remains unchanged.
