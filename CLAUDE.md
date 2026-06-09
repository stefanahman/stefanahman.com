# stefanahman.com

Astro blog, pnpm. `pnpm dev` (drafts visible), `pnpm build` (drafts excluded; prebuild runs `scripts/check-main-tags.mjs` and `scripts/check-banned-phrases.mjs`, both fail the build on violations in published posts).

Stefan is the creator and makes the choices. On decisions with real alternatives (structure, naming, what a post says), propose with reasoning and let him pick before implementing. His questions ("or?", "should we...?") open a discussion; they are not approval.

## content

Posts live in `src/content/writing/` as `.md`, or `.mdx` when using components (e.g. `Term`, the hover-translation tooltip in `src/components/Term.astro`). Frontmatter: `description` required, at least one main tag (`tech` or `life`) required for the RSS topic feeds, `draft: true` keeps a post out of production, `related: [slug, ...]` overrides the tag-based related-posts matching, `image` overrides the default OG image.

## voice system

Two layers, both auto-loaded from `.claude/rules/`:

- `writing-style.md` — principles. Numbered rules plus a machine-read `banned-phrases` block under rule 5 that the build enforces.
- `voice-corrections.md` — evidence. Before/after pairs and vetoed words from editing sessions. Judgment-level, not build-enforced.

Capture discipline, every writing session:

- Hard veto ("never use X", "that's an AI tell") → record it in `voice-corrections.md` in the same turn, with Stefan's stated why. Rejected lines never touch disk; a later harvest cannot recover them.
- Softer rewrite-pairs → harvest in the pre-publish sweep (below).
- New feedback contradicting an existing entry → update or delete the old one. Newer supersedes.
- A veto that keeps recurring across posts graduates to a numbered rule (or, if mechanically matchable, to the banned-phrases block) and leaves voice-corrections.

## writing workflow

1. Draft with `draft: true`. Anchor in Stefan's published posts and `voice-corrections.md`, not generic blog voice.
2. Review via `/review-prose` (writing-coach agent). Stefan picks which findings to apply.
3. Commit the draft early; iterate in further commits.
4. Pre-publish sweep: harvest new voice pairs from this draft's editing history into `voice-corrections.md`, prune contradictions, set `pubDate` to the actual publish date.
5. Flip `draft: false`, `pnpm build`, commit, push (deploy runs via GitHub Actions → Watchtower).
6. Linear: mark the post's ticket Done with the published URL attached (team `stefanahman`, project `stefanahman.com`). Create the ticket if none exists; file spin-off post ideas as Backlog tickets so they aren't lost.

The `newsletter` skill turns a published post into a Buttondown draft.
