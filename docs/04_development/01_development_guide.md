# Development Guide

## Local workflow

```bash
npm start
npm test
```

No package installation is required for the dependency-free application. Use a feature branch, make focused commits, run validation, and open a pull request.

## File ownership

- `js/content.js`: curriculum and question data.
- `js/app.js`: rendering, routing, persistence, and UI behavior.
- `js/validators.js`: validation logic without DOM dependencies.
- `css/styles.css`: presentation and responsive/accessibility states.
- `docs/`: numbered SDLC records.
- `scripts/validate.mjs`: automated repository quality gate.

## Content authoring

Use unique lowercase hyphenated IDs. Define a term before relying on it. Identify the active shell for every command, separate input from expected output, and state the required starting and ending state. Each mistake must include a symptom, cause, and safe recovery.

All commands must be tested in the named shell or clearly labeled conceptual. Never use real credentials, destructive shortcuts, or organization-specific workflow conventions as universal advice.

### Code-based mind maps

Use Markdown headings and lists as the source for mind maps. Preview with the [Markmap extension for VS Code](https://marketplace.visualstudio.com/items?itemName=gera2ld.markmap-vscode):

1. Install the extension from the VS Code Marketplace and verify the publisher/identifier is `gera2ld.markmap-vscode`.
2. Open a mind-map Markdown file such as `docs/03_design/03_course_mindmap.md`.
3. Open the Command Palette and select the Markmap preview command.
4. Review both the visual map and the raw Markdown outline.
5. Commit the Markdown source; generated exports are committed only when the application explicitly consumes them.

Do not make the generated diagram the only source of information. Keep the heading hierarchy meaningful for screen readers, text browsers, diffs, and environments where the extension is unavailable.

## Shared-work rules

Before parallel work, assign non-overlapping files. An agent returns a concise handoff containing changed files, validation, assumptions, and remaining risk. The integrating agent owns cross-file verification and tracker updates.
