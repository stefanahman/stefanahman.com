---
paths:
  - "src/content/**/*.md"
  - "src/pages/**/*.astro"
  - "src/layouts/**/*.astro"
  - "src/consts.ts"
---

# Writing style

These rules apply to anything written *for this site*: blog posts in `src/content/writing/`, page copy in `.astro` files (homepage descriptor, about, footer, etc.), meta descriptions, and any drafts proposed in conversation. They do not apply to code comments.

The goal is to sound like Stefan, not an assistant that generates posts. The anchor is his own published posts in `src/content/writing/` and the corrections in `voice-corrections.md`. Other bloggers (Hashimoto, Evans, Willison, and whoever else) are fair inspiration for moves and rhythms worth trying — never a style to copy because it works for them. A borrowed move earns its place the same way everything else does: Stefan keeps it after seeing it in his own draft.

## Rules

1. **Open with a concrete fact, anecdote, or claim.** Never with a roadmap. No "in this post", no "today I want to talk about", no "let's explore". The reader already clicked.

2. **One idea per sentence. One beat per paragraph.** Paragraphs of 1 to 4 sentences. White space is part of the rhythm. Long paragraphs read as AI even when they aren't.

3. **No em-dashes at all.** Use periods, parentheses, colons, or commas. The em-dash is one of the most recognizable AI-tells regardless of how it's used. If you'd type ` — `, try a period instead. The sentence is almost always sharper.

4. **No "not just X, but Y" pivots.** No "it's not about X, it's about Y". These inverted-emphasis rhythms are the most recognizable AI tic. Just say what you mean.

5. **Banned phrases.** Cut these on sight. The canonical, build-enforced list lives in `scripts/banned-phrases.txt` (one entry per line; `/.../i` lines are regexes, others case-insensitive literals). `scripts/check-banned-phrases.mjs` fails the production build if a published post matches. Add new entries to the txt file and the check follows automatically. Highlights: "let's dive in/explore", "it's worth noting", "importantly", "ultimately", "in essence", "at its core", "I hope this was helpful", "thanks for reading", and the "X is real" predicate (empty AI emphasis; describe what actually happens with a concrete verb, found fresh each time).

6. **No closing summary.** Don't end with "In conclusion", "Key takeaways", or a recap. End on the last real thing you had to say. A short final beat is fine. A summary block is not.

7. **No vague hype adjectives.** No "seamless", "robust", "powerful", "elegant", "blazing fast", "delightful", "magical", "world-class". If a thing is good, say *why* with a concrete detail.

8. **No tricolons of adjectives.** Don't write "fast, simple, and powerful" or "clean, modern, and accessible". The pattern is a tell.

9. **First person, with stake.** Use "I" when it's your experience. Use "you" only for direct address, sparingly. Avoid editorial "we". Hedge honestly ("I'm not sure yet", "I think"), never corporately ("it could be argued that").

10. **Show the artifact, not the description.** Paste the actual code, the actual command, the actual error message. If a paragraph describes a thing in the abstract for more than two sentences, paste the thing instead.

11. **Subheads are lowercase and terse.** "automatic migrations!" not "Understanding Django's Automatic Migration System". Sound like how you'd describe the section out loud.

12. **Semicolons only when a period would be wrong.** Don't use them to sound sophisticated. If a period works, use the period.

13. **For explanatory or technical posts, lead with the answer.** If the post is "How to X" or "Why Y", the first sentence should answer X or Y. AI engines and impatient readers extract the first parseable answer. Setup paragraphs lose the citation. This is the machine-readable counterpart to rule 1.

14. **No terse declarative stub-closers.** Don't end a paragraph, or stand a one-line paragraph, on a dramatic 3-to-5-word restatement of what you just said: "It's the same plant.", "Not tea.", "The tax is real.", "Apples and pears." It reads as an AI tic, not a human writer. Fold the point into a real sentence instead. A genuine short contrastive sentence in natural speech is fine ("Real tea has caffeine. Rooibos doesn't."); the dramatic snap-back restatement is not. Note: a critique that praises this pattern as a "signature move" is wrong, ignore it.

15. **End on a practice, not a thesis.** The closing line should be something concrete the writer (or reader) does, ideally still imperfect — not a summary claim. Evidence across published posts: "cook the base of meals from scratch most days" (the-number-on-the-back), "Tea or tisane? Caffeine or not?" (the-kettle-was-for-rooibos), "catching myself when the hand starts to reach" (in-a-case), "I am learning to stay grounded in the wait" (thunder-and-lightning). The thesis is the body's job.

## Scope notes

- **UI copy** (nav links, button labels, page titles, meta descriptions): same spirit, more compression. Cut "the", "a", filler verbs. Concrete over abstract.
- **Code comments**: not in scope. Keep comments rare and only where the *why* is non-obvious.
- **Frontmatter `description`** in posts: one sentence, written like a person, never like a meta description. It's read by humans on the archive index and by search engines.
