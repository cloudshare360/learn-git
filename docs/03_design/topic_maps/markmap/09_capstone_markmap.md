---
markmap:
  colorFreezeLevel: 2
  initialExpandLevel: 2
  maxWidth: 320
---

# 9. Publish your portfolio

## Module overview

- Goal: Plan, build, deploy, release, and maintain your public work.
- Lesson count: 6
- Visual types: flow, wireframe, remote

## Lessons

### Use a practical software development lifecycle

- Outcome: Connect requirements, planning, design, development, testing, deployment, and operations through visible gates and feedback.
- Prerequisites:
  - javascript-quality
- Terms:
  - environment
- Key actions:
  - Requirements gate
  - Planning and design gate
  - Development gate
  - Testing gate
  - Deployment gate
- Visual: flow — SDLC feedback loop
- Practice: Follow docs/00_documentation_index.md and map one portfolio feature through every SDLC stage.

### Plan the capstone

- Outcome: Define audience, content, issues, branch work, quality rules, and a code-based wireframe before building.
- Prerequisites:
  - markdown
  - sdlc
- Terms:
  - repository
- Key actions:
  - Define purpose
  - Inventory content
  - Create issues
  - Draw the wireframe
  - Define done
- Visual: wireframe — Portfolio page
- Practice: Ask another person to read the plan and state what the portfolio proves within 30 seconds.

### Build through issues, branches, and PRs

- Outcome: Construct the portfolio through an auditable feature workflow while keeping main deployable.
- Prerequisites:
  - plan-portfolio
  - pull-request
- Terms:
  - branch
  - pull_request
- Key actions:
  - Build semantic structure
  - Build visual design
  - Add project evidence
  - Add enhancement
  - Document and audit
- Visual: flow — Capstone delivery loop
- Practice: Use the course capstone validator and resolve every failing item before deployment.

### Deploy with GitHub Pages

- Outcome: Publish the portfolio, verify its URL and deployment, then diagnose common path and build failures.
- Prerequisites:
  - build-capstone
  - automation-health
- Terms:
  - environment
- Key actions:
  - Pre-deploy audit
  - Configure Pages
  - Observe deployment
  - Verify publicly
  - Troubleshoot methodically
- Visual: flow — Pages deployment
- Practice: Change one harmless sentence through a feature PR, merge it, observe redeployment, and verify the exact commit reached production.

### Register and map custom domains

- Outcome: Register a domain securely and map one or multiple GitHub Pages repositories using verified DNS and HTTPS.
- Prerequisites:
  - github-pages
- Terms:
  - dns
  - environment
- Key actions:
  - Register securely
  - Plan hostnames
  - Verify ownership
  - Map a repository subdomain
  - Map apex and www
- Command goals:
  - Inspect DNS on Windows
  - Inspect DNS on macOS or Linux
- Visual: remote — One domain, several repositories
- Practice: Create a mapping table for three repositories, including hostname, repository, DNS type/value, Pages setting, verification, HTTPS, and owne…

### Release and maintain production

- Outcome: Tag the public release, document it, deliver a maintenance change, and plan responsible next steps.
- Prerequisites:
  - custom-domain
  - tags-releases
- Terms:
  - environment
  - tag
- Key actions:
  - Record v1.0.0
  - Create a maintenance issue
  - Deliver the fix
  - Verify production
  - Publish patch release
- Visual: flow — Production maintenance
- Practice: Explain your complete delivery process to another learner using the repository graph and live deployment history.
