---
title: Push to talk
description: On talking to my computer instead of typing at it.
pubDate: 2026-05-17
draft: false
tags: [reflection, tech, life]
---

I talk to my computer now instead of typing at it, and the habit is the part I'm still building. The setup works. Most days I catch myself reaching for the keyboard before remembering the other option is right there.

When I do remember, more ideas come out. Some of them wouldn't have come at all. That's what's keeping me at the practice.

The shape of work changed first. Writing TypeScript means a lot of `const`, `=>`, `<T>`, `?.`, `??`, generics inside generics, brackets inside brackets. The keyboard load is as much special characters as words. More and more of what I write to trigger the work is sentences. "Refactor this hook to use a reducer." "Write a test for the case where the request times out."

If the work is sentences, why type them? Typing at 70 WPM versus speaking at 150 is roughly a 2x speed-up. [Stanford's HCI lab benchmarked the gap at 3x](https://hci.stanford.edu/research/speech/Ubicomp18_pdf.pdf) for English on mobile, so my rough math is at the conservative end.

## what voice does to thinking

Three things I notice when I actually do it:

**More ideas show up.** The first sentence is the hard one. The second isn't. Once I'm talking, sentences pull each other out. Typing breaks that chain on every line.

**The register changes.** I describe what I want a thing to be *like* instead of specifying what it should do. The voice version carries the why. The typed version usually only carries the what. That's the part agents need.

**The boring five percent makes it through.** Asides survive when I'm not pre-editing for keystrokes. That five percent is often the real point.

## my setup

Three pieces:

**[Handy](https://handy.computer)** for macOS. Captures audio at the OS level and drops the transcript wherever the cursor has focus, in any app. Runs your model of choice locally. Offline, no round-trip, no API key, no recurring cost, no half-formed thoughts leaking to someone else's servers.

**Parakeet V3** is the model I use. Transcribes natural language well enough that I rarely have to fix words.

**Push to talk** bound to a hotkey. Hold to speak, release. Make sure the right window has focus before you start. The hotkey is doing more work than it looks like. Always-on listening creates a low background anxiety: am I being recorded, did that aside count, what just got transcribed. Push-to-talk turns speaking into an intentional act. I have to choose to speak.

**Bonus.** The same setup transcribes anything the OS can hear. Meeting audio, podcasts, a video playing in another tab. Same hotkey, same cursor-drop.

A note on accent and the model. I'm a Swede dictating in English, and Parakeet handles my accent without much fight. A colleague with a stronger accent has to work harder: more deliberate articulation, occasionally spelling a word the model keeps mishearing, a longer cleanup pass on each dictation. Handy bundles a model selector, so the first move if one doesn't fit your voice is to try the other from inside the app. The accent-fit question matters more than any model leaderboard.

## the cleanup tax

Voice produces more raw words and also more rough edges. Misrecognitions, half-spoken thoughts, the wrong word that the model heard but I didn't say. Each transcript needs a pass before it lands.

Handy handles part of the cleanup automatically. It picks up tone, so a question gets a question mark without me saying "question mark." That's enough for most prose-shaped dictation. What it can't do yet: parentheses, brackets, anything that depends on visual structure rather than spoken form. Those still need the keyboard. The net-WPM-after-cleanup is closer to 1.5x than the raw 2x, once I account for re-reading and fixing what didn't land. The thinking gain still wins for me. The tax is real.

## the open-landscape problem

The real friction isn't the tech. It's where I'm working.

Speaking to my computer in a coworking space carries a few kinds of friction at once. There's the shame of looking weird talking to a screen. The fear of being overheard while a half-formed thought is still finding its shape. And the real consideration of not wanting to disturb the person at the next desk who's trying to think. All three are enough to keep me silent at the office.

The shame and the fear are partly mine to work through. People dictate to computers in legal offices, medical clinics, and accessibility setups every day. There's no real reason for it to feel strange in tech except that it isn't yet normal. Someone has to be among the first to do it openly. I want to be. What keeps me from pushing harder isn't shame so much as the respect I have for the colleagues sitting near me and the quiet they're trying to hold onto. I haven't figured out how to push the norm without crashing through their day.

At home, none of the friction applies. I talk to the screen freely, narrate options out loud, think through tradeoffs as if someone else is listening. The work goes faster and the half-formed five percent stays in the room.

At the office, the keyboard wins by default. Same in cafes and other shared spaces. Most of the practice for now is just remembering to talk to the screen when I can.
