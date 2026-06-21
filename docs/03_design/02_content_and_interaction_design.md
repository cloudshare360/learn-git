# Content and Interaction Design

## Lesson contract

Every lesson contains an outcome, prerequisites, new terms, explanation, numbered actions, applicable OS/shell commands, expected state, guided practice, common mistakes with recovery, an accessible visual, and a scored check with hint/remediation.

## Learning sequence

```text
Orientation → files/folders → terminal → Git/VS Code → local history
→ remotes → branches → collaboration → releases/automation
→ Markdown/web → portfolio → Pages/domain → maintenance
```

## Interaction rules

- The expandable course tree and Previous/Next controls provide equivalent navigation.
- System and shell selection change commands without changing the learning objective.
- A first wrong answer receives a hint; repeated error links back to the exact explanation and schedules review.
- Every diagram has a visible text alternative.
- Destructive commands appear only in labeled disposable labs with inspection first.

## Visual types

The renderer supports orientation maps, folder trees, paths, Git areas, Git graphs, remote flows, conflicts, decisions, responsive layouts, wireframes, and general flows. These are generated from structured content so visuals remain readable offline and can share accessible descriptions.

## Markmap mind maps

Course mind maps are stored as Markdown whose heading/list hierarchy is renderable by [Markmap](https://markmap.js.org/). The recommended authoring preview is the [Markmap VS Code extension](https://marketplace.visualstudio.com/items?itemName=gera2ld.markmap-vscode).

The canonical course source is [`03_course_mindmap.md`](03_course_mindmap.md). In VS Code, install the verified `gera2ld.markmap-vscode` extension, open that Markdown file, and run the Markmap preview command from the Command Palette. The Markdown hierarchy remains the accessible text fallback and the reviewable source in Git.
