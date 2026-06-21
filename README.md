# Zero to Published: Git, GitHub & the Web

An interactive, beginner-first course for people with no assumed computer knowledge. It starts with files, folders, graphical file managers, and terminals on Windows, macOS, and Linux. It progresses through Git, GitHub collaboration, Markdown, HTML, CSS, JavaScript, GitHub Actions, GitHub Pages, releases, and custom domains.

The capstone is a public portfolio website built through issues, feature branches, commits, pull requests, automated checks, deployment, tags, and maintenance releases.

The site begins with a course overview and roadmap, supports a 30-minute daily learning habit with local streak/progress tracking, and provides optional text-to-speech reading with synchronized focus highlighting.

## Project status

Repository implementation is effectively complete; the remaining open work is the live GitHub Pages release/verification pass and the manual checks that depend on that live site. Operational status is maintained only in the [task tracker](docs/02_planning/02_task_tracker.md), while the test report stores supporting evidence.

## Run locally

Prerequisite: a current Node.js installation.

```bash
npm start
```

Open `http://localhost:4173` in a browser.

Run project validation with:

```bash
npm test
```

## Course outcomes

Learners will be able to:

- Work with files and folders using graphical interfaces and terminals.
- Install and configure Git, Git Bash/Unix tools on Windows, and VS Code.
- Create, clone, inspect, commit, branch, merge, synchronize, and recover repositories.
- Use `.gitignore`, remotes, stashes, tags, releases, cherry-pick, rebase, reflog, and other tools at the appropriate level.
- Collaborate through forks, pull requests, reviews, conflicts, branch rules, and GitHub Actions.
- Build an accessible responsive portfolio with Markdown, HTML, CSS, and JavaScript.
- Deploy through GitHub Pages, connect a custom domain, enable HTTPS, and maintain releases.

## Documentation

Read the documentation in SDLC order:

1. [Documentation index](docs/00_documentation_index.md)
2. [Product requirements](docs/01_requirements/01_product_requirements.md)
3. [Implementation plan](docs/02_planning/01_implementation_plan.md)
4. [Task tracker](docs/02_planning/02_task_tracker.md)
5. [Architecture](docs/03_design/01_architecture.md)
6. [Content and interaction design](docs/03_design/02_content_and_interaction_design.md)
7. [Course mind map (Markmap source)](docs/03_design/03_course_mindmap.md)
8. [Development guide](docs/04_development/01_development_guide.md)
9. [Test strategy and report](docs/05_testing/01_test_strategy_and_report.md)
10. [GitHub Pages deployment](docs/06_deployment/01_github_pages_deployment.md)
11. [Custom domain guide](docs/06_deployment/02_custom_domain_guide.md)
12. [Operations and maintenance](docs/07_operations/01_operations_and_maintenance.md)

## Repository structure

```text
assets/                 Course images and diagrams
css/                    Application styles
docs/                   Numbered SDLC documentation
js/                     Course content and application logic
scripts/                Local server and validation tools
.github/workflows/      Validation and GitHub Pages automation
index.html              Interactive course entry point
```

## Deployment

The repository includes a GitHub Actions workflow for validation and GitHub Pages deployment. Deployment instructions, repository settings, custom-domain DNS, verification, and HTTPS are documented under [`docs/06_deployment`](docs/06_deployment/).

## Security and privacy

Never commit passwords, access tokens, private keys, recovery codes, or real `.env` values. The learning application runs locally in the browser and does not request learner credentials or execute arbitrary terminal commands.

See [SECURITY.md](SECURITY.md), [CONTRIBUTING.md](CONTRIBUTING.md), and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before reporting or contributing.

## License

This project is released under the [MIT License](LICENSE).
