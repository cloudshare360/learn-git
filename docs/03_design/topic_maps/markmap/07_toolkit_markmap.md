---
markmap:
  colorFreezeLevel: 2
  initialExpandLevel: 2
  maxWidth: 320
---

# 7. Git toolkit & releases

## Module overview

- Goal: Investigate, recover, maintain, tag, and automate.
- Lesson count: 4
- Visual types: git-graph, decision, flow

## Lessons

### Diff, log, show, blame, and help

- Outcome: Investigate a repository without changing it and identify commits using references.
- Prerequisites:
  - first-commit
- Terms:
  - commit
  - branch
- Key actions:
  - Compare states
  - Read graph history
  - Trace a line
  - Ask Git for help
- Command goals:
  - Read the complete graph
  - Inspect the previous commit
  - Open command help
- Visual: git-graph — Names resolve to commits
- Practice: Find the commit that introduced .gitignore and explain its message and changed paths.

### Reflog, detached HEAD, reset, and advanced safety

- Outcome: Recover a lost practice commit and recognize operations that rewrite unpublished history.
- Prerequisites:
  - inspect-recover
  - inspect-history
- Terms:
  - commit
  - branch
- Key actions:
  - Create a disposable lab
  - Observe detached HEAD
  - Preserve detached work
  - Recover with reflog
  - Compare reset modes
- Command goals:
  - Inspect local reference movements
  - Preserve a recovered commit
- Visual: decision — Preserve recovery
- Practice: Write a recovery decision for unstaged, staged, local committed, and shared committed work before using any command.

### Tags, semantic versions, and releases

- Outcome: Create an annotated version tag and publish a GitHub release without moving old tags.
- Prerequisites:
  - pull-request
- Terms:
  - commit
- Key actions:
  - Select the release commit
  - Create an annotated tag
  - Inspect and push
  - Create the release
  - Plan the next version
- Command goals:
  - Create an annotated release tag
  - Inspect and publish the tag
- Visual: git-graph — Stable release pointer
- Practice: Classify three changes as major, minor, or patch and explain why.

### Repository health and GitHub Actions

- Outcome: Recognize healthy repository files and read a basic continuous-integration workflow safely.
- Prerequisites:
  - pull-request
- Terms:
  - repository
  - continuous_integration
- Key actions:
  - Add repository guidance
  - Create validation workflow
  - Read Pages workflow structure
  - Require checks
  - Review dependency signals
- Command goals:
  - Run workflow validation locally
  - Inspect the Pages workflow
- Visual: flow — Automated quality gate
- Practice: Review the project Pages workflow and list its permissions and deployment trigger.
