---
title: Every terminal at once
description: How I built a tmux break screen that appears in every terminal at once.
pubDate: 2026-07-13
draft: true
tags: [tech, tools, tmux, terminal]
related: [look-at-something-real]
---

A tmux session with multiple attached clients is already a sync primitive. Run the break screen in a shared session, switch every client into it, and all their terminals show the same thing at the same time. When it exits, they go back to where they came from.

The reflection that made me build this is in [Look at something real](/writing/look-at-something-real/).

## the pieces

Three scripts in the setup, and they share one state file.

```
~/.local/bin/
├── tmux-pomodoro-toggle
├── tmux-pomodoro-manager
└── tmux-pomodoro-break-screen
```

- `tmux-pomodoro-toggle` creates or clears `/tmp/tmux-pomodoro.state`.
- `tmux-pomodoro-manager` advances the state machine on every status refresh and emits the status bar string.
- `tmux-pomodoro-break-screen` is the UI: prompts, star field, phrase typing.

The state file holds three variables:

```
# /tmp/tmux-pomodoro.state
phase=focus|short_break|long_break
ends=<unix timestamp>
cycles=<int>
```

`cycles` counts completed focus sessions; a long break triggers on multiples of four. Every two seconds (tmux `status-interval`), the manager runs. If `now < ends`, nothing changes and it emits the countdown. If `now >= ends`, it advances the phase, posts a macOS notification, and if the phase that just ended was focus, forks the break coordinator.

## the shared session

The whole coordinator is a snapshot and a loop:

```bash
tmux new-session -d -s pomodoro-break -n break tmux-pomodoro-break-screen

# Snapshot each client's current session so we can restore it later
snapshot=$(tmux list-clients -F '#{client_tty}\t#{session_name}')

# Switch every attached client into the break session
while IFS=$'\t' read -r tty session; do
    tmux switch-client -c "$tty" -t pomodoro-break
done <<< "$snapshot"
```

Break-screen is an ordinary bash program that renders the screen, reads input, and exits when the phrase matches. When it exits, the pane and session dies, and every client goes back to where it started.

One tmux default got in the way. When a session dies, every attached client detaches. Ghostty runs `zsh -lc "tmux attach ..."` as its command; when tmux exits, so does zsh, so does the window. The break session dying was closing every window I had open. `set-option detach-on-destroy off` on the break session changes that: tmux switches each client to another live session instead, and the snapshot loop restores the correct one.

## what came before

The first version fanned out. For each attached client, it called `tmux display-popup` and rendered its own copy of the break screen. Ten Ghostty windows meant ten popups. To keep them in sync, I used a file at `/tmp/tmux-pomodoro-break.session`, leader election via atomic hard-link (whichever process won the `ln` ran the dismiss logic), and 400ms polling for the "dismissed elsewhere" signal.

This version was working, but every new feature broke a different corner of that plumbing. First cross-window sync broke, then Space-switching, then the Enter key started misbehaving in one popup but not another. I was writing more IPC than break screen.

## the input handler

Dismiss is by typing a rotating phrase. Case-insensitive, submit on Enter. Reading a keystroke while the star field animates in the periphery is one line:

```bash
IFS= read -t 0.4 -n 1 -s -r -d '' ch
```

What each flag does:

- `-n 1`: one character at a time.
- `-t 0.4`: 400ms timeout, so the star field can redraw between keystrokes.
- `-s`: no echo.
- `-r`: raw, no backslash processing.
- `-d ''`: delimiter is NUL, so Enter (CR/LF) is captured as a regular character instead of terminating the read.
- `IFS=`: don't strip whitespace, so a space stays a space instead of being read as an empty Enter.

Then the bug that took a lot longer to find. Fast typing was losing characters. Bash's `read -n 1 -s` briefly changes termios (canonical off, echo off) for each call and restores after. Between calls, the terminal is back in canonical (line-buffered) mode. Characters typed in that window go into the driver's line buffer. Bash's next `read` sometimes drops them, depending on timing.

The fix was to set the target mode once, at the start of the main loop.

```bash
stty -icanon -echo min 0 time 0
```

Bash's per-call save/restore now round-trips to the same state, and the canonical-mode window between reads is gone.

## the wait-for cleanup

After the shared-session refactor, the manager forks a coordinator that blocks until break-screen exits, then restores each client to its original session. The first version of the block was polling:

```bash
while tmux has-session -t pomodoro-break; do
    sleep 0.5
done
```

I had refactored away from polling for cross-client sync but left this second polling loop in. tmux has a native signal primitive: `wait-for`. Break-screen sends a signal from its EXIT trap:

```bash
tmux wait-for -S pomodoro-done
```

The coordinator blocks on it instead:

```bash
while tmux has-session -t pomodoro-break; do
    tmux wait-for pomodoro-done 2>/dev/null &
    wait_pid=$!
    ( sleep 30; kill "$wait_pid" 2>/dev/null || true ) &
    guard_pid=$!
    wait "$wait_pid" 2>/dev/null || true
    kill "$guard_pid" 2>/dev/null || true
done
```

The 30-second background kill guards the rare case where break-screen crashed before its trap could install.

## the prompts

Break-screen picks one of ten prompts at random. `eyes` cues the 20-20-20 rule ("Look 6 metres away for 20 seconds"). `breath` for a slow one, longer out than in. `sky` is my favourite: "Look up. Something is there that is not this screen."

Below the prompt, a self-check list grouped by the four categories in Kim, Park & Niu's 2017 microbreak taxonomy:

```
body       ·  water   ·  snack       ·  bathroom  ·  move
relax      ·  breath  ·  shoulders   ·  jaw       ·  eyes  ·  sky
social     ·  send someone a message
cognitive  ·  offload one sentence   ·  look at something real
```

Albulescu et al.'s 2022 systematic review of microbreak studies finds that active, structured breaks recover cognition faster than passive scrolling. A menu that names categories nudges toward the active kind.

## what's still open

- Extending the dismiss-phrase pool, or rotating new ones in. With only ten, typing them will turn into muscle memory, and muscle memory is the exact reflex the phrase exists to break.
- Physiological sigh as its own prompt. The current breath cue is generic; a paced double-inhale animation would be closer to the actual regulation move.
- More readers of the state file: do-not-disturb during focus, a Slack status that follows the phase, an ambient light that changes with it.
