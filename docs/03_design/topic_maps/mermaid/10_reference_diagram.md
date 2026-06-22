# 10. Advanced reference — Code Diagrams

Recognize specialist tools and troubleshoot methodically.

## Lesson sequence

```mermaid
flowchart TD
  M["10. Advanced reference"]
  L1["Rebase, cherry-pick, bisect, clean, and large projects"]
  M --> L1
  L2["Troubleshoot Git methodically"]
  M --> L2
  L1 --> L2
```

## Concept coverage

```mermaid
flowchart LR
  M["10. Advanced reference"]
  L1["Rebase, cherry-pick, bisect, clean, and large projects"]
  M --> L1
  L1 --> O1["Outcome: Recognize advanced Git tools, their appropriate use, and their risks without applying…"]
  L1 --> T1["Terms: commit, branch"]
  L1 --> C1["Commands: Apply one inspected commit | Continue or abandon a conflicted cherry-pick | Preview u…"]
  L1 --> V1["Visual: split — Merge versus rebase"]
  L2["Troubleshoot Git methodically"]
  M --> L2
  L2 --> O2["Outcome: Capture evidence, diagnose common errors, and select the least destructive recovery."]
  L2 --> T2["Terms: repository, branch"]
  L2 --> C2["Commands: Collect a safe diagnostic snapshot"]
  L2 --> V2["Visual: decision — Troubleshooting loop"]
```

## Text summary

- **Rebase, cherry-pick, bisect, clean, and large projects** — Recognize advanced Git tools, their appropriate use, and their risks without applying them blindly.
- **Troubleshoot Git methodically** — Capture evidence, diagnose common errors, and select the least destructive recovery.
