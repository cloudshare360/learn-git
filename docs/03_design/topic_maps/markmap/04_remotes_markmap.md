---
markmap:
  colorFreezeLevel: 2
  initialExpandLevel: 2
  maxWidth: 320
---

# 4. GitHub remotes

## Module overview

- Goal: Connect, clone, fetch, pull, and push.
- Lesson count: 3
- Visual types: remote, tree

## Lessons

### Create and connect a GitHub repository

- Outcome: Connect the local portfolio to an empty GitHub repository and perform the first push.
- Prerequisites:
  - first-commit
  - github-account
- Terms:
  - github
  - repository
- Key actions:
  - Pre-push safety review
  - Create the empty remote
  - Copy the HTTPS URL
  - Add and inspect origin
  - Push main
- Command goals:
  - Add the GitHub remote
  - Inspect remotes
  - Push and set upstream
- Visual: remote — Local and remote
- Practice: Edit README, commit locally, notice Git reports one commit ahead, push, and verify GitHub.

### Clone without nested-folder mistakes

- Outcome: Clone an existing repository into the intended parent directory and inspect what Git configured.
- Prerequisites:
  - connect-github
- Terms:
  - repository
- Key actions:
  - Use a separate practice location
  - Copy the HTTPS URL
  - Clone from the parent
  - Enter and inspect
  - Clone in VS Code
- Command goals:
  - Clone the repository
  - Inspect the clone
- Visual: tree — Correct clone destination
- Practice: Compare git log --oneline in the original and clone. The commit hashes should match.

### Fetch, pull, push, and rejected pushes

- Outcome: Explain data direction, inspect incoming changes, and recover safely from a rejected push.
- Prerequisites:
  - clone-repository
- Terms:
  - commit
  - branch
- Key actions:
  - Create a remote change
  - Fetch in the second clone
  - Integrate deliberately
  - Observe a safe rejection
  - Recover
- Command goals:
  - Download remote references only
  - Update main only if fast-forward is possible
  - View local and remote graph
- Visual: remote — Data directions
- Practice: Fetch a remote change, inspect origin/main with git show, then integrate it.
