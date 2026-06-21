# Test Strategy and Report

## Automated scope

- Required files and semantic application landmarks.
- JavaScript syntax and importability.
- Unique module/lesson IDs and valid prerequisites.
- Complete lesson schema, command variants, quiz answers, and remediation data.
- Required curriculum concepts and capstone checks.
- Internal documentation links and referenced assets.
- GitHub Pages workflow structure and relative application URLs.

## Manual scope

- Keyboard-only navigation and visible focus.
- Screen-reader landmarks, labels, status messages, and diagram alternatives.
- Windows, macOS, and Linux command selection.
- Deep-link reload, Back/Forward navigation, search, and mobile panels.
- Quiz hint/remediation/completion and progress export/reset.
- Narrow, tablet, desktop, 200% zoom, reduced motion, and print.
- Pages deployment, public links, asset case, HTTPS, and custom domain.

## Current report

Operational status lives in `docs/02_planning/02_task_tracker.md`. This report stores supporting evidence and the ordered manual checklist for the live verification pass.

Date: 2026-06-21

### Automated result

Command:

```text
npm test
```

Result:

```text
Validation passed: 11 modules, 44 lessons, 13 documentation files, 14 capstone checks.
```

The validator checked required files, JavaScript parsing, lesson and quiz schemas, IDs and prerequisites, remediation states, critical curriculum coverage, one accessible visual per lesson, capstone completion, local HTML assets, project-Pages-safe paths, numbered SDLC documents, internal documentation links, Markmap source structure, and workflow permissions/stages.

Focused checks also confirmed 13 visual types, 29 simulator-eligible command lessons, and the expected portfolio/Pages files.

### Local runtime result

The application was started with `npm start` and tested over HTTP:

```text
Local home: HTTP 200, bytes 5414
Course data: HTTP 200, bytes 145121
```

The home response contained the expected “Zero to Published” application shell, and the loaded course module contained the custom-domain curriculum.

### GitHub pull-request result

- Branch: `codex/zero-to-published-course`
- Initial feature commit: `4838377`
- Pull request: https://github.com/cloudshare360/learn-git/pull/1
- GitHub Actions validation: passed

### Pre-merge learner-experience expansion

Before merge, the release added and revalidated:

- A root overview explaining purpose, audience, roadmap, outcomes, and differentiation.
- A 30-minute daily routine, active-minute goal, streak, milestone celebration, and varied module-specific benefit messages.
- Browser-native start, pause/resume, stop, and speed controls for text to speech.
- Current-block highlighting and current-word highlighting through the CSS Custom Highlight API when supported.
- An explicit Understand → See → Practice → Validate lesson sequence, enforced by the validator.

### Review findings corrected

- Corrected in-page navigation so hash-based lesson routing does not misinterpret section links.
- Preserved correct-answer feedback while marking a lesson complete.
- Added explicit SDLC, custom-domain, concrete Actions, cherry-pick/conflict, partial-staging, file tracking, attributes, and Git LFS coverage after curriculum audit.
- Ensured the portfolio starter has relative asset paths suitable for a project Pages URL.

### Environment limitation

Approved headless Edge/Chrome attempts hung under the managed execution environment and were terminated. They produced no application failure output, but are not counted as browser interaction evidence. Interactive browser, screen-reader, and live Pages verification remain release gates and must be recorded after GitHub publication.

### Manual release checklist

Run these in order once the live Pages URL exists:

1. [ ] Confirm live Pages workflow result, public URL, HTTPS, assets, console, and expected commit.
2. [ ] Verify keyboard-only tree, lesson, quiz, copy, panel, and checklist use.
3. [ ] Verify deep links and browser Back/Forward.
4. [ ] Verify Windows, macOS, and Linux command switching.
5. [ ] Verify hint, repeated-error remediation, completion, review queue, export, and reset.
6. [ ] Verify narrow/mobile layout, 200% zoom, dark theme, reduced motion, and print.
7. [ ] Verify screen-reader landmarks, labels, status messages, and visual alternatives.
