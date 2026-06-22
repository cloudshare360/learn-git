---
markmap:
  colorFreezeLevel: 2
  initialExpandLevel: 2
  maxWidth: 320
---

# 2. Install your tools

## Module overview

- Goal: Prepare Git, GitHub, and VS Code safely.
- Lesson count: 4
- Visual types: flow, layers, orientation

## Lessons

### Create and secure a GitHub account

- Outcome: Create a durable public identity with recovery and privacy protections.
- Terms:
  - github
  - repository
- Key actions:
  - Open the official site
  - Create and verify
  - Secure recovery
  - Review privacy
- Visual: flow — Account safety
- Practice: Sign out and confirm that your recovery method and password manager allow you to sign back in.

### Install Git and Unix tools

- Outcome: Install Git from an official source, select appropriate Windows options, and verify the executable.
- Terms:
  - git
  - shell
- Key actions:
  - Download officially
  - Windows options
  - Finish and reopen
  - Verify Unix tools on Windows
- Command goals:
  - Verify Git
  - Install on Ubuntu/Debian
- Visual: flow — Installation path
- Practice: Record your Git version and active shell in learning-notes.md without recording private account data.

### Configure identity and defaults

- Outcome: Set Git’s author identity, main default, and inspect where configuration values came from.
- Prerequisites:
  - install-git
- Terms:
  - git
  - commit
- Key actions:
  - Set identity
  - Set modern default
  - Inspect configuration
  - Understand credentials
- Command goals:
  - Set global author identity
  - Use main for new repositories
  - Inspect values and sources
- Visual: layers — Configuration scopes
- Practice: Run git config --global --get user.email and confirm it is the intended public/no-reply address.

### Install and orient yourself in VS Code

- Outcome: Open a project folder, edit a file, use Source Control, and identify the active terminal shell.
- Terms:
  - directory
  - terminal
- Key actions:
  - Install officially
  - Open the folder
  - Identify landmarks
  - Edit and save
  - Open the terminal
- Command goals:
  - Open the current folder in VS Code after PATH setup
- Visual: orientation — VS Code landmarks
- Practice: Create practice/notes/vscode-note.md from Explorer, type a heading, save, rename it, then undo the rename.
