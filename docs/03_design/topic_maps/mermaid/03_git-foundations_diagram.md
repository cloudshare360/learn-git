# 3. Git foundations — Code Diagrams

Record clear, safe project history.

## Lesson sequence

```mermaid
flowchart TD
  M["3. Git foundations"]
  L1["Why version control matters"]
  M --> L1
  L2["Create your first repository"]
  M --> L2
  L1 --> L2
  L3["Stage and make a commit"]
  M --> L3
  L2 --> L3
  L4[".gitignore and safe project files"]
  M --> L4
  L3 --> L4
  L5["Inspect and safely undo changes"]
  M --> L5
  L4 --> L5
  L6["Track files, partial changes, and cross-platform attributes"]
  M --> L6
  L5 --> L6
```

## Concept coverage

```mermaid
flowchart LR
  M["3. Git foundations"]
  L1["Why version control matters"]
  M --> L1
  L1 --> O1["Outcome: Explain snapshots, history, recovery, and the difference between Git and GitHub."]
  L1 --> T1["Terms: version_control, git, github, commit, repository"]
  L1 --> V1["Visual: git-areas — The four Git locations"]
  L2["Create your first repository"]
  M --> L2
  L2 --> O2["Outcome: Initialize a portfolio repository and recognize the hidden Git metadata directory."]
  L2 --> T2["Terms: repository, git"]
  L2 --> C2["Commands: Initialize the current project | Inspect repository state"]
  L2 --> V2["Visual: tree — Repository root"]
  L3["Stage and make a commit"]
  M --> L3
  L3 --> O3["Outcome: Complete the edit-stage-commit cycle from the terminal and VS Code."]
  L3 --> T3["Terms: staging, commit"]
  L3 --> C3["Commands: Stage one file | Inspect staged changes | Record the snapshot | View concise history"]
  L3 --> V3["Visual: git-areas — Edit-stage-commit"]
  L4[".gitignore and safe project files"]
  M --> L4
  L4 --> O4["Outcome: Write, test, and troubleshoot ignore rules without mistaking them for security control…"]
  L4 --> T4["Terms: repository"]
  L4 --> C4["Commands: Inspect why a file is ignored | Stop tracking a file but keep the local copy"]
  L4 --> V4["Visual: decision — Will .gitignore hide it from Git?"]
  L5["Inspect and safely undo changes"]
  M --> L5
  L5 --> O5["Outcome: Choose a safe recovery based on whether work is unstaged, staged, local, or shared."]
  L5 --> T5["Terms: commit, staging"]
  L5 --> C5["Commands: Discard one unstaged practice edit | Unstage but keep the edit | Safely reverse a sha…"]
  L5 --> V5["Visual: decision — Recovery by state"]
  L6["Track files, partial changes, and cross-platform attributes"]
  M --> L6
  L6 --> O6["Outcome: Stage only intended changes, move or remove tracked files correctly, and define text a…"]
  L6 --> T6["Terms: staging"]
  L6 --> C6["Commands: Stage selected change hunks | Move and remove tracked practice files"]
  L6 --> V6["Visual: flow — Tracked-file lifecycle"]
```

## Text summary

- **Why version control matters** — Explain snapshots, history, recovery, and the difference between Git and GitHub.
- **Create your first repository** — Initialize a portfolio repository and recognize the hidden Git metadata directory.
- **Stage and make a commit** — Complete the edit-stage-commit cycle from the terminal and VS Code.
- **.gitignore and safe project files** — Write, test, and troubleshoot ignore rules without mistaking them for security controls.
- **Inspect and safely undo changes** — Choose a safe recovery based on whether work is unstaged, staged, local, or shared.
- **Track files, partial changes, and cross-platform attributes** — Stage only intended changes, move or remove tracked files correctly, and define text and binary behavior across operating systems.
