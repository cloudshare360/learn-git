# Implementation Plan

## Objective

Build and verify a complete, static learning application that implements the requirements in [`../01_requirements/01_product_requirements.md`](../01_requirements/01_product_requirements.md). The application must take a learner from basic computer use through Git, GitHub collaboration, portfolio development, and GitHub Pages publication.

## Delivery strategy

The project will use standards-based HTML, CSS, and JavaScript with no required runtime service. It will:

- Run by opening it through a small local HTTP server.
- Deploy directly to GitHub Pages.
- Store learner preferences and progress in browser storage.
- Keep course content separate from rendering and interaction logic.
- Use inline SVG, HTML/CSS, and code-based diagrams so essential visuals work offline.
- Avoid executing learner commands; terminal exercises are constrained simulations.

## Architecture

```text
learn-git/
|-- index.html                 Application shell and metadata
|-- 404.html                   GitHub Pages fallback
|-- package.json               Local scripts and metadata
|-- README.md                  Setup, use, contribution, and deployment
|-- LICENSE                    Project license
|-- css/
|   `-- styles.css             Layout, themes, accessibility, responsive UI
|-- js/
|   |-- app.js                 State, routing, rendering, and event handling
|   |-- content.js             Modules, lessons, commands, diagrams, and quizzes
|   `-- validators.js          Quiz and capstone validation helpers
|-- assets/
|   |-- logo.svg
|   `-- diagrams/              Reusable accessible SVG diagrams
|-- docs/
|   |-- 01_requirements/
|   |-- 02_planning/
|   |-- 03_design/
|   |-- 04_development/
|   |-- 05_testing/
|   |-- 06_deployment/
|   `-- 07_operations/
|-- scripts/
|   `-- validate.mjs           Automated content, links, and structure checks
`-- .github/workflows/
    `-- pages.yml              GitHub Pages deployment workflow
```

## Work breakdown

### Task 1 — Planning and tracking

Create implementation documentation, architecture decisions, ordered tasks, verification rules, and a tracker.

Completion evidence:

- `docs/02_planning/01_implementation_plan.md` exists.
- `docs/02_planning/02_task_tracker.md` exists.
- Tasks have explicit acceptance checks and dependencies.

### Task 2 — Application foundation

Create the semantic application shell, responsive layout, accessible design system, navigation regions, and base project metadata.

Completion evidence:

- Application loads without framework dependencies.
- Skip link, landmarks, focus states, mobile layout, and empty states work.
- Static assets use relative URLs suitable for project Pages.

### Task 3 — Sequential curriculum content

Encode the complete beginner-to-published curriculum as structured data. Each lesson includes outcome, prerequisites, terms, explanation, steps, OS/shell commands where relevant, expected results, a visual, common mistakes, recovery, and a knowledge check.

Completion evidence:

- Course spans computer basics, tools, Git, GitHub, collaboration, releases, Markdown, web development, and Pages.
- Windows, macOS, and Linux paths are represented.
- Git concept checklist in the requirements is mapped into lessons or reference content.

### Task 4 — Navigation and learning interactions

Implement the expandable left-to-right course tree, routing/deep links, previous/next navigation, search, OS/shell switching, command copying, glossary support, theme controls, and progress persistence.

Completion evidence:

- Course nodes expand and select by mouse and keyboard.
- URLs open a specific lesson.
- OS and shell choices control commands.
- Progress survives reload and can be exported or reset.

### Task 5 — Assessments and remediation

Implement lesson checks, hints, retry behavior, exact-topic remediation links, alternative questions, mastery status, and review queue behavior.

Completion evidence:

- Incorrect attempts produce progressive help.
- Correct answers explain the result and mark the lesson complete.
- Progress summary distinguishes complete and needs-review lessons.

### Task 6 — Visual learning system and simulations

Add accessible code-based diagrams, file trees, Git graphs, flow diagrams, GUI orientation illustrations, and constrained terminal/path exercises.

Completion evidence:

- Every lesson has a meaningful visual or state diagram.
- Complex diagrams provide text alternatives.
- No simulation executes host commands.

### Task 7 — Portfolio capstone and deployment

Provide a portfolio starter, capstone checklist/validator, Markdown documentation guidance, GitHub Pages workflow, release process, and troubleshooting path.

Completion evidence:

- Learner can construct and validate a static portfolio.
- Deployment workflow is Pages-compatible.
- Capstone covers a feature branch, PR, live deployment, tag, and maintenance change.

### Task 8 — Automated quality verification

Add dependency-free automated checks for application structure, internal content references, unique IDs, lesson completeness, quiz correctness, asset existence, code fences, and required curriculum coverage.

Completion evidence:

- `npm test` passes.
- Test report records automated and manual checks.
- No broken internal file links or duplicate lesson IDs are present.

### Task 9 — Final documentation and end-to-end review

Complete setup, learner, contributor, accessibility, and deployment documentation. Perform a clean end-to-end review and reconcile the tracker.

Completion evidence:

- README includes local use and deployment.
- Content authoring rules are documented.
- All tracker items are complete or explicitly blocked with evidence.

## Verification approach

Every task follows this sequence:

```text
Implement -> inspect changed files -> run focused checks -> update tracker -> start next task
```

The final gate runs the complete validator and manually inspects:

- Desktop and narrow viewport layouts.
- Keyboard navigation and focus visibility.
- Deep-link routing.
- OS and shell command switching.
- Quiz success and remediation paths.
- Progress export/reset.
- Portfolio capstone and Pages instructions.

## Constraints and decisions

- `main` is the default branch name; legacy `master` is explained.
- GitHub uses pull requests; merge request terminology is explained for other platforms.
- GitHub Flow is the default. Long-lived `develop`, `test`, and production branch workflows are presented as optional team conventions.
- Destructive Git operations are restricted to advanced, disposable exercises with warnings.
- Screenshots are not relied on as the only source of instruction because product UIs change. Accessible vector illustrations and exact visible labels provide durable orientation.
- The site does not collect credentials, tokens, private keys, or repository contents.
