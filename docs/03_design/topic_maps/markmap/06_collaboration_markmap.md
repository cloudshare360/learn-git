---
markmap:
  colorFreezeLevel: 2
  initialExpandLevel: 2
  maxWidth: 320
---

# 6. Team collaboration

## Module overview

- Goal: Review, merge, resolve conflicts, and promote safely.
- Lesson count: 4
- Visual types: remote, flow, conflict

## Lessons

### Collaborators, forks, origin, and upstream

- Outcome: Choose a shared-repository or fork workflow and identify who can push where.
- Prerequisites:
  - feature-work
- Terms:
  - repository
  - pull_request
- Key actions:
  - Map ownership
  - Inspect remotes
  - Add upstream
  - Create from source main
- Command goals:
  - Add the source repository to a fork clone
  - Fetch source history
- Visual: remote — Fork relationship
- Practice: Draw User B local → origin fork → pull request → upstream source.

### Open, review, and merge a pull request

- Outcome: Complete a two-person GitHub review without confusing a pull request with git pull.
- Prerequisites:
  - sync-feature
  - collaboration-models
- Terms:
  - pull_request
- Key actions:
  - Self-review
  - Open the PR
  - Review as User B
  - Update as User A
  - Merge after checks
- Command goals:
  - Clean up after merge
- Visual: flow — Pull request lifecycle
- Practice: Use a draft PR for an incomplete project card, then mark it ready only after the acceptance checklist passes.

### Understand and resolve merge conflicts

- Outcome: Resolve a controlled same-line conflict, test the result, and complete or abort the merge.
- Prerequisites:
  - pull-request
- Terms:
  - branch
  - commit
- Key actions:
  - Create controlled divergence
  - Attempt integration
  - Resolve intentionally
  - Validate and stage
  - Complete or abort
- Command goals:
  - Find conflict state
  - Abort an unfinished practice merge
- Visual: conflict — Conflict resolution
- Practice: Resolve a conflict by combining useful text from both sides instead of choosing only one side.

### Development, test, and production workflows

- Outcome: Distinguish branches from environments and select a review-based promotion workflow.
- Prerequisites:
  - pull-request
- Terms:
  - environment
  - branch
- Key actions:
  - Choose the project model
  - Protect main
  - Understand extended promotion
  - Synchronize correctly
  - Prefer automation
- Visual: flow — Portfolio delivery
- Practice: Draw both GitHub Flow and the optional extended workflow, labeling every required PR and environment deployment.
