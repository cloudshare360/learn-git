# 4. GitHub remotes — Code Diagrams

Connect, clone, fetch, pull, and push.

## Lesson sequence

```mermaid
flowchart TD
  M["4. GitHub remotes"]
  L1["Create and connect a GitHub repository"]
  M --> L1
  L2["Clone without nested-folder mistakes"]
  M --> L2
  L1 --> L2
  L3["Fetch, pull, push, and rejected pushes"]
  M --> L3
  L2 --> L3
```

## Concept coverage

```mermaid
flowchart LR
  M["4. GitHub remotes"]
  L1["Create and connect a GitHub repository"]
  M --> L1
  L1 --> O1["Outcome: Connect the local portfolio to an empty GitHub repository and perform the first push."]
  L1 --> T1["Terms: github, repository"]
  L1 --> C1["Commands: Add the GitHub remote | Inspect remotes | Push and set upstream"]
  L1 --> V1["Visual: remote — Local and remote"]
  L2["Clone without nested-folder mistakes"]
  M --> L2
  L2 --> O2["Outcome: Clone an existing repository into the intended parent directory and inspect what Git c…"]
  L2 --> T2["Terms: repository"]
  L2 --> C2["Commands: Clone the repository | Inspect the clone"]
  L2 --> V2["Visual: tree — Correct clone destination"]
  L3["Fetch, pull, push, and rejected pushes"]
  M --> L3
  L3 --> O3["Outcome: Explain data direction, inspect incoming changes, and recover safely from a rejected p…"]
  L3 --> T3["Terms: commit, branch"]
  L3 --> C3["Commands: Download remote references only | Update main only if fast-forward is possible | View…"]
  L3 --> V3["Visual: remote — Data directions"]
```

## Text summary

- **Create and connect a GitHub repository** — Connect the local portfolio to an empty GitHub repository and perform the first push.
- **Clone without nested-folder mistakes** — Clone an existing repository into the intended parent directory and inspect what Git configured.
- **Fetch, pull, push, and rejected pushes** — Explain data direction, inspect incoming changes, and recover safely from a rejected push.
