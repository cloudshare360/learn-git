---
markmap:
  colorFreezeLevel: 2
  initialExpandLevel: 2
  maxWidth: 320
---

# 10. Advanced reference

## Module overview

- Goal: Recognize specialist tools and troubleshoot methodically.
- Lesson count: 2
- Visual types: split, decision

## Lessons

### Rebase, cherry-pick, bisect, clean, and large projects

- Outcome: Recognize advanced Git tools, their appropriate use, and their risks without applying them blindly.
- Prerequisites:
  - advanced-recovery
- Terms:
  - commit
  - branch
- Key actions:
  - Compare merge and rebase
  - Cherry-pick deliberately
  - Handle a conflict
  - Bisect a prepared defect
  - Dry-run clean
- Command goals:
  - Apply one inspected commit
  - Continue or abandon a conflicted cherry-pick
  - Preview untracked deletion only
  - Begin and finish a bisect lab
- Visual: split — Merge versus rebase
- Practice: Backport one prepared fix to a practice maintenance branch with cherry-pick, compare original and new hashes, and explain why normal synchr…

### Troubleshoot Git methodically

- Outcome: Capture evidence, diagnose common errors, and select the least destructive recovery.
- Prerequisites:
  - fetch-pull-push
  - inspect-recover
- Terms:
  - repository
  - branch
- Key actions:
  - Capture context
  - Inspect repository state
  - Classify the error
  - Choose the smallest recovery
  - Verify the result
- Command goals:
  - Collect a safe diagnostic snapshot
- Visual: decision — Troubleshooting loop
- Practice: Diagnose prepared examples: not a repository, ignored file, rejected push, detached HEAD, and unfinished merge.
