---
paths:
  - "src/content/**/*.md"
  - "src/pages/**/*.astro"
  - "src/layouts/**/*.astro"
  - "src/consts.ts"
---

# Writing style

These rules apply to anything written *for this site*: blog posts in `src/content/writing/`, page copy in `.astro` files (homepage descriptor, about, footer, etc.), meta descriptions, and any drafts proposed in conversation. They do not apply to code comments.

The goal is to sound like a person who blogs, not an assistant that generates posts. Modeled on the rhythms of Mitchell Hashimoto, Julia Evans, Simon Willison, Lee Robinson, Maggie Appleton, and Josh Comeau.

## Rules

1. **Open with a concrete fact, anecdote, or claim.** Never with a roadmap. No "in this post", no "today I want to talk about", no "let's explore". The reader already clicked.

2. **One idea per sentence. One beat per paragraph.** Paragraphs of 1 to 4 sentences. White space is part of the rhythm. Long paragraphs read as AI even when they aren't.

3. **Use periods, not em-dashes, as the default connector.** Em-dashes are allowed at most once or twice per post, only as a real parenthetical. If you'd type ` — `, try a period instead. The sentence is almost always sharper.

4. **No "not just X, but Y" pivots.** No "it's not about X, it's about Y". These inverted-emphasis rhythms are the most recognizable AI tic. Just say what you mean.

5. **Banned phrases.** Cut these on sight:
   - "Let's dive in", "Let's explore", "Let's take a closer look"
   - "It's worth noting", "Importantly", "Ultimately", "In essence", "At its core"
   - "In today's [fast-paced / digital / modern] world"
   - "Whether you're a beginner or an expert"
   - "I hope this was helpful", "Thanks for reading"

6. **No closing summary.** Don't end with "In conclusion", "Key takeaways", or a recap. End on the last real thing you had to say. A short final beat is fine. A summary block is not.

7. **No vague hype adjectives.** No "seamless", "robust", "powerful", "elegant", "blazing fast", "delightful", "magical", "world-class". If a thing is good, say *why* with a concrete detail.

8. **No tricolons of adjectives.** Don't write "fast, simple, and powerful" or "clean, modern, and accessible". The pattern is a tell.

9. **First person, with stake.** Use "I" when it's your experience. Use "you" only for direct address, sparingly. Avoid editorial "we". Hedge honestly ("I'm not sure yet", "I think"), never corporately ("it could be argued that").

10. **Show the artifact, not the description.** Paste the actual code, the actual command, the actual error message. If a paragraph describes a thing in the abstract for more than two sentences, paste the thing instead.

11. **Subheads are lowercase and terse.** "automatic migrations!" not "Understanding Django's Automatic Migration System". Sound like how you'd describe the section out loud.

12. **Semicolons only when a period would be wrong.** Don't use them to sound sophisticated. If a period works, use the period.

## Scope notes

- **UI copy** (nav links, button labels, page titles, meta descriptions): same spirit, more compression. Cut "the", "a", filler verbs. Concrete over abstract.
- **Code comments**: not in scope. Keep comments rare and only where the *why* is non-obvious.
- **Frontmatter `description`** in posts: one sentence, written like a person, never like a meta description. It's read by humans on the archive index and by search engines.
