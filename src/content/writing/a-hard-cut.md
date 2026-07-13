---
title: A hard cut
description: A conversation with my love about my workday turned into a break screen I built into my terminal.
pubDate: 2026-07-13
draft: true
tags: [work, attention, tech, reflection, life]
---

My eyes were burning and my head was tight by mid-afternoon. I told my love about it, and we ended up talking about how important breaks are. That gave me the idea to code something, because I love building my own tools. And since she's a lot into somatic practices, I was inspired to explore how I can get back into my body throughout the day.

## what was actually draining me

Two or three agents running in parallel in my terminal, and me reaching for whichever one had a new status the moment there was a gap. I wrote about that reach in [In a case](/writing/in-a-case/). It kept getting worse. What I needed was a hard cut into that loop.

## the terminal and the sessions idea

I work mainly in the terminal. Claude Code in [Ghostty](https://ghostty.org), and [tmux](https://github.com/tmux/tmux/wiki), which I installed for the first time recently and wanted to really understand. Ghostty is [Mitchell Hashimoto](https://mitchellh.com)'s terminal emulator. He calls it technical philanthropy, and it shows in the details: native to the OS, no Electron, no subscription. Learning how tmux sessions work is what gave me the idea: sync a popup across every terminal I have open.

## how tmux works

Optional and technical. Skip if you're only here for the life part.

tmux is a terminal multiplexer, which is a persistent workspace inside your terminal that survives when the terminal closes. Three concepts, from the top down. A **session** is the named workspace. Inside a session are **windows**, like browser tabs. Inside a window are **panes**, splits inside a tab.

The concept that makes the synced popup possible is client attachment. Multiple terminal clients can attach to the same session at the same time. When they do, every attached client is looking at the same window, the same pane, the same running program. When the pane changes, every client sees it.

I use that to interrupt myself. When focus ends, my scripts open a new tmux session running the break screen and switch every attached client into it. Every terminal window I have open in every macOS Space becomes the break screen at once. When I dismiss it in one, it dismisses everywhere.

## pomodoro (and what writing surfaced)

I'd heard about pomodoro for a decade and never used it once. It's the classic productivity technique. Twenty-five minutes of focus, five minutes of break, four cycles and then a longer break of fifteen to thirty. Cirillo invented it in the late 1980s with a kitchen timer shaped like a tomato, and named the technique after the timer.

I picked pomodoro because I'd heard about it. I hadn't done any research. Writing this post is what pushed me to pause and actually look. Everything below (the ultradian research, the DeskTime rule, my own hypothesis about agents) I found because I sat down to write about pomodoro.

A [2025 scoping review](https://pmc.ncbi.nlm.nih.gov/articles/PMC12532815/) found that time-structured pomodoro sessions consistently improve focus and reduce mental fatigue compared to self-paced breaks. The mechanism that keeps showing up in the literature: [externally cued breaks work better than self-cued ones](https://www.browndailyherald.com/article/2026/03/fact-check-is-the-pomodoro-technique-actually-effective-for-studying), which is exactly why my previous break rules kept failing. What the research does not endorse is the 25-minute figure specifically, which was Cirillo's own kitchen-timer experiment.

## other frameworks in comparison

The [DeskTime study from 2014](https://theblogtimer.com/guides/52-17-rule-vs-pomodoro) suggested 52 minutes of work to 17 of break, based on their most productive users. [Kleitman's ultradian rhythm research](https://neurosity.co/guides/ultradian-rhythm-90-minute-brain-cycles) puts natural cognitive cycles closer to 90 minutes with a 20-minute trough. Flowtime abandons the fixed timer entirely and lets focus run until it wanes.

Any of these is just a timer, easy to update. The choice between them isn't a technical one.

## the ultradian question, and where that leaves me

I love integrating into our biology, and this is a humble extension of Kleitman's ultradian model.

The work I'm doing now feels much more intense than before. A lot more context switching and parallel tasks. With agents, my way of working keeps changing weekly or bi-weekly. The latest big shift was about a month ago, and I'm still improving my tmux setup almost every day.

The biology hasn't changed. Kleitman's pacemaker is what it is. But the shape of the work happening inside a cycle has changed. I can still hold focus for a 90-minute window if I need to. My default with agents, though, has shifted to splitting attention across several at once. Short-term I get more done. By evening my eyes hurt and I have less left for anything after work than I used to.

So the break screen is really about sustainability. I want a healthy body and a functioning brain when I'm old. The way of working will have shifted wildly many times by then. I'm protecting my capacity to keep engaging with it.

Pomodoro is not my final destination. It's the starting point, of me discovering these frameworks and learning more. I'm happy to change the setup if something else is better or speaks to me more.

## coming back to the body

Each break, the overlay reminds me. I come back into the body I'm occupying, outside the digital world.

One reminder per break, rotated. Small nudges to check on my current needs, which change over time. Some breaks it might be to drink or eat. Others a stretch, a toilet break, or a walk.

## typing to close

I'm currently extending the screen. The latest addition is a phrase I have to type before the popup dismisses. Something like "just breathe" or "notice this". Case-insensitive, Enter to submit. It's small, but enough to interrupt the reflex of instinctively dismissing the popup, which is what I was doing with the first version.

## close

The screen has worked better than I expected. I rarely dismiss it. When it does happen, it's usually because the break clashes with a lunch. I feel a pull sometimes: "I just want to finish this before my meeting in 3 minutes." That pull is exactly what I built the screen for. I respect it and do what the prompt asks.
