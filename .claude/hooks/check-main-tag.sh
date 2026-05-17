#!/usr/bin/env bash
# PostToolUse hook: warn Claude when a writing post lacks a main tag.
# Main tags (tech, life) determine which topic RSS feed the post lands in.
# Drafts are checked too — better to catch the omission early than at build time.

set -euo pipefail

INPUT=$(cat)
FILE=$(printf '%s' "$INPUT" | jq -r '.tool_input.file_path // empty')

# Bail fast if not a writing markdown file
[[ "$FILE" =~ src/content/writing/.*\.md$ ]] || exit 0
[ -f "$FILE" ] || exit 0

# Extract the tags line from the frontmatter block (between the first --- pair)
TAGS_LINE=$(awk '
  /^---$/ { n++; next }
  n == 1 && /^tags:/ { print; exit }
' "$FILE")

# Pass if tech or life is present
if [[ "$TAGS_LINE" =~ (tech|life) ]]; then
  exit 0
fi

# Missing main tag — emit a non-blocking nudge Claude will see
jq -n --arg file "$FILE" '{
  hookSpecificOutput: {
    hookEventName: "PostToolUse",
    additionalContext: "Post \($file) is missing a main tag. Add `tech` or `life` (or both) to the tags array in frontmatter so it lands in a topic RSS feed."
  }
}'
