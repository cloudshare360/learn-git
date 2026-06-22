---
markmap:
  colorFreezeLevel: 2
  initialExpandLevel: 2
  maxWidth: 320
---

# 3. Git foundations

## Module overview

- Goal: Record clear, safe project history.
- Lesson count: 6
- Visual types: git-areas, tree, decision, flow

## Lessons

### Why version control matters

- Outcome: Explain snapshots, history, recovery, and the difference between Git and GitHub.
- Terms:
  - version_control
  - git
  - github
  - commit
  - repository
- Key actions:
  - Observe the problem
  - Map the solution
  - Adopt the safety habit
- Visual: git-areas — The four Git locations
- Practice: Describe one change that would make a useful commit in a portfolio project.

### Create your first repository

- Outcome: Initialize a portfolio repository and recognize the hidden Git metadata directory.
- Prerequisites:
  - configure-git
  - why-version-control
- Terms:
  - repository
  - git
- Key actions:
  - Create and open portfolio
  - Confirm the exact path
  - Initialize
  - Create repository files
  - Compare VS Code
- Command goals:
  - Initialize the current project
  - Inspect repository state
- Visual: tree — Repository root
- Practice: Use the file manager’s hidden-item option to observe .git, then hide hidden items again without changing .git.

### Stage and make a commit

- Outcome: Complete the edit-stage-commit cycle from the terminal and VS Code.
- Prerequisites:
  - init-repository
- Terms:
  - staging
  - commit
- Key actions:
  - Write the README
  - Inspect and compare
  - Stage selectively
  - Inspect staged content
  - Commit and inspect history
- Command goals:
  - Stage one file
  - Inspect staged changes
  - Record the snapshot
  - View concise history
- Visual: git-areas — Edit-stage-commit
- Practice: Add learning-notes.md, stage it separately, inspect the staged diff, and commit it as “Add Git learning notes.”

### .gitignore and safe project files

- Outcome: Write, test, and troubleshoot ignore rules without mistaking them for security controls.
- Prerequisites:
  - first-commit
- Terms:
  - repository
- Key actions:
  - Add practical rules
  - Create safe examples
  - Diagnose a rule
  - Understand tracked files
  - Commit policy
- Command goals:
  - Inspect why a file is ignored
  - Stop tracking a file but keep the local copy
- Visual: decision — Will .gitignore hide it from Git?
- Practice: Ignore every .log file, but use an exception rule to allow docs/example.log. Verify both paths with status and check-ignore.

### Inspect and safely undo changes

- Outcome: Choose a safe recovery based on whether work is unstaged, staged, local, or shared.
- Prerequisites:
  - first-commit
- Terms:
  - commit
  - staging
- Key actions:
  - Inspect a controlled edit
  - Unstage safely
  - Inspect a commit
  - Choose shared recovery
- Command goals:
  - Discard one unstaged practice edit
  - Unstage but keep the edit
  - Safely reverse a shared commit
- Visual: decision — Recovery by state
- Practice: Create a harmless typo commit, then revert it. Inspect the two commits and final file content.

### Track files, partial changes, and cross-platform attributes

- Outcome: Stage only intended changes, move or remove tracked files correctly, and define text and binary behavior across operating systems.
- Prerequisites:
  - gitignore
  - first-commit
- Terms:
  - staging
- Key actions:
  - Stage a portion
  - Move and remove tracked files
  - Represent an empty folder
  - Define attributes
  - Assess large assets
- Command goals:
  - Stage selected change hunks
  - Move and remove tracked practice files
- Visual: flow — Tracked-file lifecycle
- Practice: Create two independent README edits, stage and commit them separately, then verify each commit contains one concern.
