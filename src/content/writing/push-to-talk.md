---
title: Push to talk
description: On talking to my computer instead of typing at it.
pubDate: 2026-05-14
draft: true
tags: [reflection, tech]
---

I've recently started talking to my computer instead of typing at it. The setup works. The habit is the part I'm still building. Most days I catch myself reaching for the keyboard before remembering the other option is right there.

When I do remember, the ideas come out fuller. Some of them come out at all that wouldn't have otherwise. That's what's keeping me at the practice.

The shape of work changed first. Writing TypeScript means a lot of `const`, `=>`, `<T>`, `?.`, `??`, generics inside generics, brackets inside brackets. The keyboard load is as much special characters as words. More and more of what I write to trigger the work is sentences. "Refactor this hook to use a reducer." "Write a test for the case where the request times out." The medium of the work moves from syntax to intent.

Once that shift had happened, voice made sense. Typing prose-shaped prompts at 70 WPM versus speaking them at 150 is roughly a 2x bandwidth increase per thought. [Stanford's HCI lab benchmarked the gap at 3x](https://hci.stanford.edu/research/speech/Ubicomp18_pdf.pdf) for English on mobile, so my rough math is at the conservative end. The thoughts that come out in four seconds versus eight seconds are different thoughts. The four-second ones are less filtered, less edited, and weirdly more correct about what I actually meant.

## what voice does to thinking

Three things I notice when I actually do it:

**More ideas show up.** Speaking is closer to thinking than typing. The brain doesn't have to plan a sentence, hold it in a buffer, and then translate it through the fingers. That translation step is where some ideas die before they reach the screen. Talking skips it.

**The register changes.** I describe what I want a thing to be *like* instead of specifying what it should do. The voice version of an idea contains more of the why than the what. That's exactly the part agents need.

**The boring five percent makes it through.** Side comments, asides, the half-formed bit that's actually the real point. They all survive when I'm not pre-editing for keystrokes. Often that five percent turns out to be the most useful part of the dictation.

## my setup

Three pieces:

**[Handy](https://handy.computer)** for macOS captures audio and routes it to a local model.

**Parakeet V3** is the model. Runs locally, fast, accurate enough for code and natural language. No round-trip to a cloud service, no API key, no recurring cost, and no half-formed thoughts leaking to someone else's servers.

**Push to talk** bound to a hotkey. Hold to speak, release to drop the transcript at my cursor. The hotkey is doing more work than it looks like. Always-on listening creates a low background anxiety: am I being recorded, did that aside count, what just got transcribed. Push-to-talk turns speaking into an intentional act. I have to choose to speak.

A note on accent and the model. I'm a Swede dictating in English, and Parakeet handles my accent without much fight. A colleague with a stronger accent has to work harder: more deliberate articulation, occasionally spelling a word the model keeps mishearing, a longer cleanup pass on each dictation. Handy bundles a model selector, so the first move if one doesn't fit your voice is to try the other from inside the app. The accent-fit question matters more than any model leaderboard.

## the cleanup tax

Voice produces more raw words and also more rough edges. Misrecognitions, half-spoken thoughts, the wrong word that the model heard but I didn't say. Each transcript needs a pass before it lands.

Handy does some of this automatically. It picks up tone, so a question gets a question mark without me saying "question mark." That's enough for most prose-shaped dictation. What it can't do yet: parentheses, brackets, anything that depends on visual structure rather than spoken form. Those still need the keyboard. The net-WPM-after-cleanup is closer to 1.5x than the raw 2x, once I account for re-reading and fixing what didn't land. The thinking gain still wins for me. The tax is real.

## the open-landscape problem

The real friction isn't the tech. It's where I'm working.

Speaking to my computer in a coworking space carries a few kinds of friction at once. There's the shame of looking weird talking to a screen. The fear of being overheard while a half-formed thought is still finding its shape. And the real consideration of not wanting to disturb the person at the next desk who's trying to think. All three are enough to keep me silent at the office.

The shame and the fear are partly mine to work through. People dictate to computers in legal offices, medical clinics, and accessibility setups every day. There's no real reason for it to feel strange in tech except that it isn't yet normal. Someone has to be among the first to do it openly. I want to be. What keeps me from pushing harder isn't shame so much as the respect I have for the colleagues sitting near me and the quiet they're trying to hold onto. Finding where to push the norm forward without crashing through their day is its own practice.

At home, none of the friction applies. I talk to the screen freely, narrate options out loud, think through tradeoffs as if someone else is listening. The work goes faster and the half-formed five percent stays in the room.

At the office, I downshift to keyboard. Less bandwidth, less flow, more accuracy. A trade I make consciously, prompt by prompt.

## what I'm not saying

Voice doesn't replace typing for everything. Code review needs reading. Long documents need visual scanning. Precise edits need a cursor. I still type plenty.

The felt-faster effect is also worth flagging. A [METR randomized trial in mid-2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) found that experienced developers using AI coding tools were 19% slower at familiar tasks, while predicting they'd be 24% faster and still believing afterward they had been 20% faster. Voice input isn't AI coding, but the perception gap is the same shape. I notice more ideas coming through. I am less sure I am producing more shipped code per hour.

The proportion is shifting where I can let it. At home it tilts toward talking. At the office it stays mostly typing. Closing that gap is a mix of practice and getting over how weird it still feels.
