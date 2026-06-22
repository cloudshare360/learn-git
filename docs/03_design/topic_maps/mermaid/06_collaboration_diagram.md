# 6. Team collaboration — Code Diagrams

Review, merge, resolve conflicts, and promote safely.

## Lesson sequence

```mermaid
flowchart TD
  M["6. Team collaboration"]
  L1["Collaborators, forks, origin, and upstream"]
  M --> L1
  L2["Open, review, and merge a pull request"]
  M --> L2
  L1 --> L2
  L3["Understand and resolve merge conflicts"]
  M --> L3
  L2 --> L3
  L4["Development, test, and production workflows"]
  M --> L4
  L3 --> L4
```

## Concept coverage

```mermaid
flowchart LR
  M["6. Team collaboration"]
  L1["Collaborators, forks, origin, and upstream"]
  M --> L1
  L1 --> O1["Outcome: Choose a shared-repository or fork workflow and identify who can push where."]
  L1 --> T1["Terms: repository, pull_request"]
  L1 --> C1["Commands: Add the source repository to a fork clone | Fetch source history"]
  L1 --> V1["Visual: remote — Fork relationship"]
  L2["Open, review, and merge a pull request"]
  M --> L2
  L2 --> O2["Outcome: Complete a two-person GitHub review without confusing a pull request with git pull."]
  L2 --> T2["Terms: pull_request"]
  L2 --> C2["Commands: Clean up after merge"]
  L2 --> V2["Visual: flow — Pull request lifecycle"]
  L3["Understand and resolve merge conflicts"]
  M --> L3
  L3 --> O3["Outcome: Resolve a controlled same-line conflict, test the result, and complete or abort the me…"]
  L3 --> T3["Terms: branch, commit"]
  L3 --> C3["Commands: Find conflict state | Abort an unfinished practice merge"]
  L3 --> V3["Visual: conflict — Conflict resolution"]
  L4["Development, test, and production workflows"]
  M --> L4
  L4 --> O4["Outcome: Distinguish branches from environments and select a review-based promotion workflow."]
  L4 --> T4["Terms: environment, branch"]
  L4 --> V4["Visual: flow — Portfolio delivery"]
```

## Text summary

- **Collaborators, forks, origin, and upstream** — Choose a shared-repository or fork workflow and identify who can push where.
- **Open, review, and merge a pull request** — Complete a two-person GitHub review without confusing a pull request with git pull.
- **Understand and resolve merge conflicts** — Resolve a controlled same-line conflict, test the result, and complete or abort the merge.
- **Development, test, and production workflows** — Distinguish branches from environments and select a review-based promotion workflow.
