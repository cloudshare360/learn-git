# Task Tracker

Last updated: 2026-06-21

## Status legend

- `[ ]` Not started
- `[~]` In progress
- `[x]` Completed and verified
- `[!]` Blocked; evidence and required action must be recorded

## Delivery tasks

| ID | Task | Status | Depends on | Verification evidence |
|---|---|---:|---|---|
| T01 | Planning and tracking | [x] | — | Plan and tracker created; architecture and completion gates documented. |
| T02 | Application foundation | [x] | T01 | Semantic shell, responsive three-pane CSS, accessibility baseline, relative assets, and Node syntax checks passed. |
| T03 | Sequential curriculum content | [x] | T02 | 11 modules and 44 complete lessons; syntax, IDs, prerequisites, schema, and critical coverage checks passed. |
| T04 | Navigation and learning interactions | [x] | T02, T03 | Routing, tree, search, OS/shell switching, copy, glossary, theme, progress persistence/export/reset, keyboard/mobile panel hooks implemented; static checks passed. |
| T05 | Assessments and remediation | [x] | T03, T04 | Independent validator confirms all quizzes and correct/hint/remediation states across 44 lessons. |
| T06 | Visual learning system and simulations | [x] | T03, T04 | 44 accessible visuals across 13 types; safe text-only simulator available for 29 command lessons. |
| T07 | Portfolio capstone and deployment | [x] | T03, T04 | Accessible portfolio starter, 14-item validator, validation/Pages workflows, release path, and domain guide verified. |
| T08 | Automated quality verification | [x] | T02–T07 | `npm test` passes structure, schema, content, asset, link, documentation, Markmap, and workflow checks. |
| T09 | Final documentation and end-to-end review | [x] | T08 | README, numbered SDLC documentation, contribution/security files, test evidence, route/feedback review, final static gate, and generated topic-map library completed. Browser/live checks assigned to T11. |
| T10 | Git repository publication and draft PR | [x] | T09 | Commit `4838377` pushed on `codex/zero-to-published-course`; draft PR #1 opened; GitHub validation passed. |
| T11 | GitHub Pages live verification | [~] | T10 | PR #1 merged; follow-up PR #2 enabled Pages creation for workflow deployments; workflow run `27916809416` deployed https://cloudshare360.github.io/learn-git/ from `807bc7a`. Live HTTP/title/asset/hash/404 checks passed. Fully interactive browser and screen-reader walkthrough remains constrained by the managed environment and is recorded in the test report. |

## Dependency and parallel-execution analysis

The authoritative agent/context design is [`03_agent_execution_design.md`](03_agent_execution_design.md).
This tracker is the operational source of truth for what is done, what is pending, and what order the remaining work should follow.

- Sequential critical path: T01 → T02 → T03 → contract freeze → integration → T08 → T09 → T10 → T11.
- Parallel-safe after T03: T04 interaction logic, T05 assessment logic, T06 visual assets, and T07 capstone/workflows, provided each writer owns distinct files and the frozen content contract is unchanged.
- Integration constraint: `js/app.js`, `js/content.js`, `css/styles.css`, `index.html`, this tracker, and workflows have one writer per integration window.
- Documentation/domain research ran in parallel because outputs were isolated, then were reviewed and moved into numbered SDLC paths.

## Pending-task agent registry

| Agent ID | Tasks | Status | Ownership | Exit evidence |
|---|---|---:|---|---|
| A11-coordinator | T09, T11 | [~] | Sole writer for `README.md`, this tracker, and the test report while release evidence is integrated. | Deployment evidence recorded cleanly; final interactive browser/screen-reader limitation documented consistently. |
| A11-release-owner | T11 | [x] | GitHub-side merge, Pages source, workflow observation, and public URL verification; no repository-file write ownership. | PR #1 merged, PR #2 fixed Pages enablement, workflow run `27916809416` succeeded, and live URL/title/asset checks were captured. |
| A11-accessibility-review | T09, T11 | [!] | Fully interactive browser, keyboard, and screen-reader release walkthrough. | Requires an environment that can execute reliable live browser interaction; managed headless attempts did not produce usable evidence. |

## Current ordered release sequence

Use this sequence for the remaining work so status, ownership, and evidence stay aligned:

1. **GitHub release action:** merge PR #1 and confirm the default-branch release commit.
2. **Pages configuration:** enable or confirm GitHub Actions as the Pages source.
3. **Workflow observation:** wait for the Pages deployment workflow to finish and capture the deployment URL.
4. **Live site verification:** verify public URL, expected title, relative assets, and deep-link behavior.
5. **Deferred manual review:** execute the remaining T09 checklist items against the live site in the test report's listed order.
6. **Evidence closeout:** update the README and test report, then mark T11 done only after all evidence matches and a reliable interactive browser/screen-reader pass is available.

## Task checklists

### T01 — Planning and tracking

- [x] Create `docs/`.
- [x] Define architecture and file layout.
- [x] Break work into dependency-ordered tasks.
- [x] Define acceptance evidence for each task.
- [x] Create this tracker before implementation.

### T02 — Application foundation

- [x] Create semantic HTML shell.
- [x] Create responsive three-pane layout.
- [x] Add accessibility baseline and skip navigation.
- [x] Add project metadata and relative assets.
- [x] Verify foundation before marking complete.

### T03 — Sequential curriculum content

- [x] Encode all course phases and lessons.
- [x] Include GUI and terminal procedures.
- [x] Include OS and shell command variants.
- [x] Include explanations, outputs, mistakes, and recovery.
- [x] Map advanced/reference Git concepts, including cherry-pick and cross-platform file handling.
- [x] Add SDLC, GitHub Actions, Pages, and custom-domain curriculum.
- [x] Verify syntax, IDs, prerequisites, schema completeness, and critical coverage.

### T04 — Navigation and learning interactions

- [x] Implement expandable course tree.
- [x] Implement deep links and previous/next navigation.
- [x] Implement search and filtering.
- [x] Implement OS/shell selectors.
- [x] Implement copyable commands and glossary.
- [x] Persist, export, and reset progress.
- [x] Add keyboard/mobile panel behavior and verify interaction hooks.

### T05 — Assessments and remediation

- [x] Render lesson questions.
- [x] Validate answers and explain results.
- [x] Provide first-attempt hints.
- [x] Redirect repeated mistakes to exact explanations.
- [x] Add alternate retry prompts and review status.
- [x] Verify completion/mastery behavior and schema independently.

### T06 — Visual learning system and simulations

- [x] Add reusable visual renderer.
- [x] Add file/path diagrams.
- [x] Add Git state, graph, remote, PR, and deployment diagrams.
- [x] Add GUI orientation visuals.
- [x] Add constrained non-executing terminal practice.
- [x] Verify visuals and text alternatives for every lesson.

### T07 — Portfolio capstone and deployment

- [x] Add starter portfolio files.
- [x] Add capstone checklist and validator.
- [x] Add pull-request validation and GitHub Pages workflows.
- [x] Add tagging, release, maintenance, and custom-domain path.
- [x] Verify relative paths, least-privilege permissions, validation dependency, and deployment configuration.

### T08 — Automated quality verification

- [x] Validate HTML/application structure.
- [x] Validate lesson schema and unique IDs.
- [x] Validate quiz answers and remediation targets.
- [x] Validate assets and internal links.
- [x] Validate required curriculum coverage.
- [x] Run complete automated check successfully.

### T09 — Final documentation and end-to-end review

- [x] Complete README and repository health files.
- [x] Complete content/Markmap authoring and agent-context guide.
- [x] Add generated per-topic Markmap and Mermaid documentation library.
- [x] Record automated results and environment limitations in the test report.
- [x] Perform end-to-end static flow review and correct route/feedback issues.
- [x] Verify all SDLC files use ordered numeric names and reconcile local implementation statuses.
- [ ] Complete keyboard, screen-reader, and live-browser checklist in a fully interactive browser environment after T11 publication.

### T10 — Git repository publication and draft PR

- [x] Verify GitHub CLI installation and authentication.
- [x] Inspect final scope and initialize/discover the Git repository.
- [x] Create a `codex/zero-to-published-course` branch when publishing from the default branch.
- [x] Stage intended files, commit, run checks, and push with upstream tracking.
- [x] Open a draft pull request and record its URL.

### T11 — GitHub Pages live verification

- [x] Enable/configure GitHub Actions as the Pages source.
- [x] Observe the deployment workflow to completion.
- [x] Verify the public URL, key assets, hash-route home response, 404 fallback, and expected title.
- [ ] Run the deferred T09 live manual checklist against the deployed site in a reliable interactive browser environment.
- [x] Record the live URL and deployment evidence in README/test report.

## Change log

| Date | Task | Update |
|---|---|---|
| 2026-06-21 | T01 | Created implementation plan and tracker. Started T02. |
| 2026-06-21 | T02 | Foundation checks passed. Completed T02 and started T03. |
| 2026-06-21 | T03 | Added 44-lesson curriculum, SDLC/domain/Actions/cherry-pick coverage, ran structural checks, completed T03, and started T04. |
| 2026-06-21 | T01 | Reorganized all documentation into numbered SDLC stages; added agent execution design and Markmap source. |
| 2026-06-21 | T04 | Connected course rendering, routing, tree/search, preferences, copy, glossary, responsive panels, and persisted progress; static checks passed. Started T05. |
| 2026-06-21 | T05 | Added independent quiz/schema validators; correct, hint, remediation, review, and completion states passed. |
| 2026-06-21 | T06 | Verified one accessible visual per lesson and added constrained text-only command simulation; started T07. |
| 2026-06-21 | T07 | Added portfolio starter, capstone validator, validation/Pages Actions, domain documentation, and release workflow; focused checks passed. Started T08. |
| 2026-06-21 | T08 | Added dependency-free repository validator; `npm test` passed all automated gates. |
| 2026-06-21 | T09 | Completed README/SDLC/health/test documentation and final static review; browser launch was unavailable, so live checks remain in T11. Started T10. |
| 2026-06-21 | T10 | GitHub CLI prerequisite check failed because the active keyring token is invalid. Publication stopped safely pending `gh auth login -h github.com`; T11 consequently waits. |
| 2026-06-21 | T10 | Authentication reverified successfully. Fetched existing `cloudshare360/learn-git` history, preserved `git-flowchart.html`, and based local main on `origin/main`. |
| 2026-06-21 | T10 | Configured secure GitHub CLI credential helper and repository-local no-reply authorship; full staged validation and local HTTP runtime checks passed. |
| 2026-06-21 | T10 | Pushed `4838377`, opened https://github.com/cloudshare360/learn-git/pull/1, and observed the GitHub `validate` check pass. Completed T10 and started T11. |
| 2026-06-21 | T11 | Before merge, added overview/roadmap/outcomes/differentiation, a 30-minute daily learning loop, varied progress motivation, and accessible highlighted text to speech; local revalidation in progress. |
| 2026-06-21 | T11 | Added explicit A11 coordinator/release/accessibility agent ownership and metadata so the remaining Pages deployment and manual release checks can be executed without shared-file conflicts. |
| 2026-06-21 | T11 | PR #1 merged to `main`, but the first Pages deployment failed because the repository did not yet have a Pages site. |
| 2026-06-21 | T11 | Added workflow enablement in PR #2, created the Pages site through the repository-owner API with `build_type=workflow`, and re-ran deployment successfully. |
| 2026-06-21 | T11 | Verified https://cloudshare360.github.io/learn-git/ with HTTP 200, expected title, asset responses, hash-route home response, and 404 fallback. Fully interactive browser/screen-reader evidence remains managed-environment limited. |
| 2026-06-21 | T09 | Added a generated topic-map library: one Markmap outline and one Mermaid companion diagram file per module, derived from `js/content.js`, with design/development/readme indexing and validator coverage. |
