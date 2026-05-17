---
description: Two-pass writing review on a draft in src/content/writing/
argument-hint: [filename-or-path]
---

Invoke the `writing-coach` subagent to review the draft at `$ARGUMENTS`.

Resolution rules for `$ARGUMENTS`:
- If it's a bare filename (e.g. `push-to-talk.md`), resolve to `src/content/writing/<filename>`.
- If it's a path, use it as-is.
- If empty, pick the most recently modified file in `src/content/writing/` that has `draft: true` in its frontmatter. If none, pick the most recently modified file in that directory and note this in one line.

Pass the resolved path to the subagent. Output the subagent's response verbatim. Do not add your own commentary, praise, or summary before or after.
