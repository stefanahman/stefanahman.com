---
name: newsletter
description: >-
  Turn a published post into a Buttondown newsletter draft (a personal intro in
  Stefan's voice + an excerpt + a tracked link back to the site), created as a
  DRAFT for review. Use when Stefan wants to email a post, send a newsletter
  issue, or "newsletter <slug>".
---

# /newsletter — draft a Buttondown issue from a post

Creates a **draft** in Buttondown for a published post. It never sends; Stefan
reviews and hits Send in Buttondown. The thin API client lives in
`scripts/newsletter.mjs` (safe by default, dedups by slug).

## Steps

1. **Pick the post.** Use the slug passed as the argument. If none was given,
   pick the newest non-draft post in `src/content/writing/` by `pubDate` and
   confirm it with Stefan before continuing.

2. **Read the post** (`src/content/writing/<slug>.md` or `.mdx`). Extract:
   - `title`, `tags`, `pubDate`, and whether `draft: true` (if it's a draft,
     stop and say so).
   - `content_type`: `tech` if `tags` includes `tech`, else `life` if it
     includes `life`, else leave null.
   - `canonicalUrl`: `https://stefanahman.com/writing/<slug>/`.

3. **Write the intro** — 2 to 4 sentences, first person, in Stefan's voice.
   Follow `/.claude/rules/writing-style.md` strictly: no em-dashes, concrete
   over abstract, no banned phrases, no terse stub-closers. A light
   reintroduction ("I write about ...") is good for new subscribers, but keep
   it human, not a template.

4. **Build the excerpt.** Take roughly the first ~300 words of the post's prose,
   cut at a paragraph boundary (never mid-sentence). Strip the frontmatter, and
   for `.mdx` skip any `import` lines and JSX/components — prose only.

5. **Assemble the body** (markdown):

   ```
   <intro>

   <excerpt>

   [Read the rest →](<canonicalUrl>?utm_source=newsletter&utm_medium=email&utm_campaign=<slug>)
   ```

   Subject = the post title (offer to tweak it).

6. **Show Stefan the full email** (subject + body) and wait for approval or
   edits. Do not skip this.

7. **Write the payload** to `.newsletter/payload.json` (gitignored):

   ```json
   {
     "subject": "...",
     "body": "...",
     "slug": "<slug>",
     "canonicalUrl": "https://stefanahman.com/writing/<slug>/",
     "contentType": "tech" | "life" | null
   }
   ```

8. **Create the draft:**

   ```bash
   node --env-file=.env scripts/newsletter.mjs --payload .newsletter/payload.json
   ```

   (If `--env-file` isn't supported by the local Node, have Stefan `export
   BUTTONDOWN_API_KEY=...` first. The key lives in `.env`, which is gitignored.)

9. **Report** the draft URL the script prints, and remind Stefan: review it in
   Buttondown and hit Send. The draft has NOT been sent.

## Rules

- **Never send.** Default behaviour is a draft. Only add `--send` if Stefan
  explicitly says "send it now," and confirm first.
- **Respect dedup.** If the script reports an email already exists for this
  slug, stop and tell Stefan. Only pass `--force` if he asks.
- **Segmentation is off.** `content_type` is recorded on the email, but the
  tech/life send filter only activates with `BUTTONDOWN_SEGMENT=1` (needs paid
  Buttondown Tags). Don't enable it unless Stefan has set tags up and asks.
- The API key is read from the environment. Never print it, never commit it.
