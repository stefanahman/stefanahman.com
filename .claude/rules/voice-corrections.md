# Voice corrections

Corrections from real editing sessions: before/after pairs and vetoed words. Each ✗ is a line Stefan vetoed; each ✓ is what he accepted instead. These teach the voice more efficiently than rules describe it. When drafting, match the ✓ column's register and avoid the vetoed words.

Maintenance:
- Hard veto in a session ("never use X", "that's an AI tell") → capture in the same turn, including Stefan's stated why. Rejected lines never touch disk, so a later harvest cannot recover them.
- Softer rewrite-pairs → harvested in the pre-publish sweep (see CLAUDE.md publish checklist).
- Contradictions: the style evolves. When new feedback contradicts an existing entry, update or delete the old one. Newer feedback supersedes. This file describes the current voice, not its history.
- A vetoed word or pattern that keeps recurring across posts graduates to a numbered rule in `writing-style.md` and leaves this file.
- Do not reuse the ✓ lines verbatim in new posts — they show the *kind* of move, not stock phrases.

## vetoed words

Judgment-level (not build-enforced), because they can be legitimate in quotes or technical contexts. No fixed replacements — find the word fresh each time (a stock substitute becomes the next tell).

- **ache / aching** — "too much LLM"
- **hoist** — never
- **land / lands** in any abstract sense. The success sense ("the line lands", "lands a better cup", "before it lands") and the positional compare/contrast sense ("other frameworks land in different places", "the argument lands here") are both AI transition-tissue. The plain spatial sense of a physical thing coming to rest is accepted ("landed below words", "the plane landed").
- **residue** — "something simpler". Reached-for fancy noun where a plain phrase does the job ("what the workday left in me").
- **caveat** — "a word I would not use, very AI". Say what the thing is instead: a bug, a default that got in the way, a catch.
- **pull** as a noun for the urge ("I feel a pull", "that pull is exactly why") — "I would not use 'pull'". He says it in conversation; it doesn't belong in his prose. Name the actual thought or urge instead.

## meta-labeling the mode → let the substance carry the signal

✗ "Here's the honest part. I picked pomodoro because I'd heard about it."
✓ "I picked pomodoro because I'd heard about it."

Stefan flagged this as "very AI, the honesty speaks for itself." Announcing the mode of speech is the tell. Real disclosure doesn't need the label; substance carries the signal. Same family:

- "Here's the honest part", "To be honest", "Honestly", "The truth is", "Let me be candid"
- "Here's what the research says", "Here's the interesting thing", "Here's what I found"
- "I want to sit with a hypothesis", "I'm being careful about the size of the claim", "What I'm noting is"
- "My hypothesis:", "The key insight is", "The important thing is"

The fix is always the same: cut the announcement, keep the claim.

## dramatic stub-closers → folded into a real sentence

✗ "The thinking gain still wins for me. The tax is real."
✓ "The thinking gain still wins for me, but the cleanup is a real cost I pay on every transcript."

✗ "Neither of those is the place's fault. The visit isn't the place. That's the part I'm still learning."
✓ "Neither of those is the place's fault. Separating the visit from the place is the part I'm still learning."

✗ "I'd assumed green tea came from one bush and black tea from another. The way coffee and chocolate come from different plants. Apples and pears. / It's the same plant." (fragment + standalone snap-back paragraph)
✓ "I'd always assumed green tea grew on one kind of bush and black tea on another, the way coffee and cocoa come from different plants. But it's one bush, and a leaf turns into green or black or white depending only on how someone handles it after the picking."

✗ "...chamomile, peppermint, hibiscus, ginger, lemon balm. Not tea." (tacked-on stub)
✓ "...listing chamomile, peppermint, hibiscus, ginger, and lemon balm as *infusion* or *tisane*, because none of them come from the tea plant."

✗ "That's the whole trick." / "The refactor didn't stop where I first thought it did." / "Same tool, different lens." (reflective codas after technical sections in every-terminal-at-once)
✓ (cut — the section's substance stands on its own)

Rule 14 applies in tech posts too. Reflective one-liners that name the arc of the section rather than add to it are the same AI pattern as the stub-closers in life posts. If this keeps recurring across tech posts, promote to rule 14.

## empty emphasis → concrete verb

✗ "But the toll it takes is real, paid out in small handfuls of attention I haven't been counting."
✓ "But it costs me, in small handfuls of attention I haven't been counting."

✗ "Grouping matters. Albulescu et al.'s 2022 systematic review finds that active, structured breaks recover cognition faster than passive scrolling."
✓ "Albulescu et al.'s 2022 systematic review finds that active, structured breaks recover cognition faster than passive scrolling. A menu that names categories nudges toward the active kind."

"X matters" is the close cousin of "X is real". Cut the announcement, keep the reason.

## overwrought metaphor → plainer words, image kept

✗ "Like wisdom landed somewhere lower than language, and I just had to translate it up."
✓ "Like the knowing landed below words, and I just had to find them."

✗ "Each release readies the next reach." (too clever, alliterative bow)
✓ (cut entirely — the paragraph ended on the previous sentence)

## judging the content → describing the gesture

✗ "Checking if my love has sent a message. ... None of these are urgent. None of them changed in the five minutes since I last looked."
✓ "Checking if my love has sent a message. ... The reach happens before I've decided anything."

## priming the reader → letting the image arrive

✗ "The sensation was surreal. I've had useful realizations, but this one came in through the body first."
✓ "I've never felt anything like it before. The realization came through the body, before any thinking."

✗ "I've held a gun a couple of times, at a firing range with someone qualified to teach me. With that came a lot of respect. I didn't gesture with it."
✓ "I've held a gun a couple of times at a firing range. I didn't gesture with it." (the concrete behaviors carry the respect; naming it was the AI move)

## define-by-negation → direct claim

✗ "The gap between us is not empty. It pulls at us both."
✓ "The gap between us pulls. It hums."

✗ "The meeting doesn't end us. It empties us, only so we can fill again."
✓ "The meeting empties us so we can fill again."

## abstract workhorse noun → concrete referent

✗ "I caught my state before I dialed."
✓ "I caught the numbness before I dialed."

✗ "Each one asks for a different state."
✓ "Each one asks for a different version of me."
(Stefan flagged "state" twice in one session once it passed ~4 uses. The fix is naming what the state actually is in that sentence, not a synonym swap.)

## retired closer template

✗ "Acting on what the noticing tells me is the part I'm still practicing."
✓ "The noticing works now. So next time I anchor myself before the call, name where I'm at in the first minute, and ask if it works for both of us to talk right now."
("X is the part I'm still [gerund]" appeared in three posts in a month — learning, building, practicing. It began as an accepted line and became a template. Retired until the published uses age out; end on the concrete next move instead.)

## clipped compression → the sentence a person would say

The general pattern, not a word list: when a line is compressed for snap (a punchy fragment, a standalone abstract noun doing callback work, a too-tight formula like "has the how"), the tightness itself is the AI tell. Expand it into the ordinary phrasing, even when that's a few words longer. If a line feels satisfyingly clever, that's the signal to check it.

✗ "the engineering companion has the how"
✓ "the engineering companion goes into the technical details"

## setup-first opener → hook-first opener

✗ "A guest came over. I asked if they wanted tea. They said yes. I made rooibos. Rooibos isn't tea."
✓ "Rooibos isn't tea. A guest came over, I asked if they wanted tea, they said yes, and I made rooibos."
