# Application Architecture

## Goals

- Static output deployable at a GitHub project-site path.
- No server, account, or database required for learning.
- Structured course data independent of presentation code.
- Accessible operation by keyboard, screen reader, touch, and pointer.
- No arbitrary command execution.

## Components

```text
index.html
  ├─ css/styles.css          visual system and responsive layout
  └─ js/app.js               routing, state, rendering, interaction
       ├─ js/content.js      modules, lessons, commands, checks
       └─ js/validators.js   assessment and capstone rules
```

The application uses URL hashes for deep links, ensuring GitHub Pages does not require server-side route rewrites. Browser storage holds operating-system choice, shell, theme, lesson state, attempts, and review items. Export produces a JSON file; reset requires confirmation.

## Security boundaries

Terminal exercises operate on predefined virtual state only. Course commands are displayed as text and copied only after learner action. The site does not request tokens, private keys, GitHub passwords, repository contents, or shell access.

## Deployment

GitHub Actions validates the repository, uploads the static files as a Pages artifact, and deploys that artifact. Every asset URL is relative so the site works beneath `/repository-name/` and with a custom domain.
