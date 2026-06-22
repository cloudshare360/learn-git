# 5. Feature branches — Code Diagrams

Develop independently and synchronize safely.

## Lesson sequence

```mermaid
flowchart TD
  M["5. Feature branches"]
  L1["Understand and create branches"]
  M --> L1
  L2["Develop and publish a feature branch"]
  M --> L2
  L1 --> L2
  L3["Synchronize a feature with its target"]
  M --> L3
  L2 --> L3
  L4["Temporarily switch work with stash"]
  M --> L4
  L3 --> L4
```

## Concept coverage

```mermaid
flowchart LR
  M["5. Feature branches"]
  L1["Understand and create branches"]
  M --> L1
  L1 --> O1["Outcome: Create a feature branch from updated main and explain a branch as a movable commit lab…"]
  L1 --> T1["Terms: branch, commit"]
  L1 --> C1["Commands: Create and switch to a feature branch | List branches"]
  L1 --> V1["Visual: git-graph — A branch is a label"]
  L2["Develop and publish a feature branch"]
  M --> L2
  L2 --> O2["Outcome: Create focused feature commits, compare with main, and publish the branch without touc…"]
  L2 --> T2["Terms: branch, staging"]
  L2 --> C2["Commands: Compare feature commits to main | Compare file changes to main | Publish and track th…"]
  L2 --> V2["Visual: git-graph — Feature work stays isolated"]
  L3["Synchronize a feature with its target"]
  M --> L3
  L3 --> O3["Outcome: Bring current main changes into a feature, test, and update the remote feature branch."]
  L3 --> T3["Terms: branch"]
  L3 --> C3["Commands: Synchronize feature from main"]
  L3 --> V3["Visual: flow — Safe synchronization"]
  L4["Temporarily switch work with stash"]
  M --> L4
  L4 --> O4["Outcome: Use stash deliberately for short local context changes and recover its contents."]
  L4 --> T4["Terms: staging"]
  L4 --> C4["Commands: Stash tracked and untracked practice work | Inspect and restore"]
  L4 --> V4["Visual: flow — Short context switch"]
```

## Text summary

- **Understand and create branches** — Create a feature branch from updated main and explain a branch as a movable commit label.
- **Develop and publish a feature branch** — Create focused feature commits, compare with main, and publish the branch without touching main.
- **Synchronize a feature with its target** — Bring current main changes into a feature, test, and update the remote feature branch.
- **Temporarily switch work with stash** — Use stash deliberately for short local context changes and recover its contents.
