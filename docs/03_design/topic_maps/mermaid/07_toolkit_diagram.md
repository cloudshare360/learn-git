# 7. Git toolkit & releases — Code Diagrams

Investigate, recover, maintain, tag, and automate.

## Lesson sequence

```mermaid
flowchart TD
  M["7. Git toolkit & releases"]
  L1["Diff, log, show, blame, and help"]
  M --> L1
  L2["Reflog, detached HEAD, reset, and advanced safety"]
  M --> L2
  L1 --> L2
  L3["Tags, semantic versions, and releases"]
  M --> L3
  L2 --> L3
  L4["Repository health and GitHub Actions"]
  M --> L4
  L3 --> L4
```

## Concept coverage

```mermaid
flowchart LR
  M["7. Git toolkit & releases"]
  L1["Diff, log, show, blame, and help"]
  M --> L1
  L1 --> O1["Outcome: Investigate a repository without changing it and identify commits using references."]
  L1 --> T1["Terms: commit, branch"]
  L1 --> C1["Commands: Read the complete graph | Inspect the previous commit | Open command help"]
  L1 --> V1["Visual: git-graph — Names resolve to commits"]
  L2["Reflog, detached HEAD, reset, and advanced safety"]
  M --> L2
  L2 --> O2["Outcome: Recover a lost practice commit and recognize operations that rewrite unpublished histo…"]
  L2 --> T2["Terms: commit, branch"]
  L2 --> C2["Commands: Inspect local reference movements | Preserve a recovered commit"]
  L2 --> V2["Visual: decision — Preserve recovery"]
  L3["Tags, semantic versions, and releases"]
  M --> L3
  L3 --> O3["Outcome: Create an annotated version tag and publish a GitHub release without moving old tags."]
  L3 --> T3["Terms: commit"]
  L3 --> C3["Commands: Create an annotated release tag | Inspect and publish the tag"]
  L3 --> V3["Visual: git-graph — Stable release pointer"]
  L4["Repository health and GitHub Actions"]
  M --> L4
  L4 --> O4["Outcome: Recognize healthy repository files and read a basic continuous-integration workflow sa…"]
  L4 --> T4["Terms: repository, continuous_integration"]
  L4 --> C4["Commands: Run workflow validation locally | Inspect the Pages workflow"]
  L4 --> V4["Visual: flow — Automated quality gate"]
```

## Text summary

- **Diff, log, show, blame, and help** — Investigate a repository without changing it and identify commits using references.
- **Reflog, detached HEAD, reset, and advanced safety** — Recover a lost practice commit and recognize operations that rewrite unpublished history.
- **Tags, semantic versions, and releases** — Create an annotated version tag and publish a GitHub release without moving old tags.
- **Repository health and GitHub Actions** — Recognize healthy repository files and read a basic continuous-integration workflow safely.
