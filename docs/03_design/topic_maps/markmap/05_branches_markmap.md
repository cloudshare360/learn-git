---
markmap:
  colorFreezeLevel: 2
  initialExpandLevel: 2
  maxWidth: 320
---

# 5. Feature branches

## Module overview

- Goal: Develop independently and synchronize safely.
- Lesson count: 4
- Visual types: git-graph, flow

## Lessons

### Understand and create branches

- Outcome: Create a feature branch from updated main and explain a branch as a movable commit label.
- Prerequisites:
  - fetch-pull-push
- Terms:
  - branch
  - commit
- Key actions:
  - Protect current work
  - Update main
  - Create and switch
  - Inspect labels
  - Use VS Code
- Command goals:
  - Create and switch to a feature branch
  - List branches
- Visual: git-graph — A branch is a label
- Practice: Create a temporary practice branch, switch back to the feature, then safely delete the unused practice branch.

### Develop and publish a feature branch

- Outcome: Create focused feature commits, compare with main, and publish the branch without touching main.
- Prerequisites:
  - branch-basics
- Terms:
  - branch
  - staging
- Key actions:
  - Add the feature files
  - Commit logical steps
  - Compare with main
  - Push only the feature
  - Verify GitHub
- Command goals:
  - Compare feature commits to main
  - Compare file changes to main
  - Publish and track the feature
- Visual: git-graph — Feature work stays isolated
- Practice: Use VS Code’s branch comparison and Source Control diff to self-review every changed line.

### Synchronize a feature with its target

- Outcome: Bring current main changes into a feature, test, and update the remote feature branch.
- Prerequisites:
  - feature-work
- Terms:
  - branch
- Key actions:
  - Save feature work
  - Fetch remote state
  - Update local main
  - Merge into feature
  - Resolve and test
- Command goals:
  - Synchronize feature from main
- Visual: flow — Safe synchronization
- Practice: Draw the commit graph before and after merging main into the feature.

### Temporarily switch work with stash

- Outcome: Use stash deliberately for short local context changes and recover its contents.
- Prerequisites:
  - branch-basics
- Terms:
  - staging
- Key actions:
  - Create controlled work
  - Stash deliberately
  - Switch and inspect
  - List and inspect
  - Restore and verify
- Command goals:
  - Stash tracked and untracked practice work
  - Inspect and restore
- Visual: flow — Short context switch
- Practice: Create a second stash, apply it without dropping, verify it remains listed, then drop only that verified practice entry.
