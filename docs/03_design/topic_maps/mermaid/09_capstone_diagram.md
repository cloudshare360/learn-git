# 9. Publish your portfolio — Code Diagrams

Plan, build, deploy, release, and maintain your public work.

## Lesson sequence

```mermaid
flowchart TD
  M["9. Publish your portfolio"]
  L1["Use a practical software development lifecycle"]
  M --> L1
  L2["Plan the capstone"]
  M --> L2
  L1 --> L2
  L3["Build through issues, branches, and PRs"]
  M --> L3
  L2 --> L3
  L4["Deploy with GitHub Pages"]
  M --> L4
  L3 --> L4
  L5["Register and map custom domains"]
  M --> L5
  L4 --> L5
  L6["Release and maintain production"]
  M --> L6
  L5 --> L6
```

## Concept coverage

```mermaid
flowchart LR
  M["9. Publish your portfolio"]
  L1["Use a practical software development lifecycle"]
  M --> L1
  L1 --> O1["Outcome: Connect requirements, planning, design, development, testing, deployment, and operatio…"]
  L1 --> T1["Terms: environment"]
  L1 --> V1["Visual: flow — SDLC feedback loop"]
  L2["Plan the capstone"]
  M --> L2
  L2 --> O2["Outcome: Define audience, content, issues, branch work, quality rules, and a code-based wirefra…"]
  L2 --> T2["Terms: repository"]
  L2 --> V2["Visual: wireframe — Portfolio page"]
  L3["Build through issues, branches, and PRs"]
  M --> L3
  L3 --> O3["Outcome: Construct the portfolio through an auditable feature workflow while keeping main deplo…"]
  L3 --> T3["Terms: branch, pull_request"]
  L3 --> V3["Visual: flow — Capstone delivery loop"]
  L4["Deploy with GitHub Pages"]
  M --> L4
  L4 --> O4["Outcome: Publish the portfolio, verify its URL and deployment, then diagnose common path and bu…"]
  L4 --> T4["Terms: environment"]
  L4 --> V4["Visual: flow — Pages deployment"]
  L5["Register and map custom domains"]
  M --> L5
  L5 --> O5["Outcome: Register a domain securely and map one or multiple GitHub Pages repositories using ver…"]
  L5 --> T5["Terms: dns, environment"]
  L5 --> C5["Commands: Inspect DNS on Windows | Inspect DNS on macOS or Linux"]
  L5 --> V5["Visual: remote — One domain, several repositories"]
  L6["Release and maintain production"]
  M --> L6
  L6 --> O6["Outcome: Tag the public release, document it, deliver a maintenance change, and plan responsibl…"]
  L6 --> T6["Terms: environment, tag"]
  L6 --> V6["Visual: flow — Production maintenance"]
```

## Text summary

- **Use a practical software development lifecycle** — Connect requirements, planning, design, development, testing, deployment, and operations through visible gates and feedback.
- **Plan the capstone** — Define audience, content, issues, branch work, quality rules, and a code-based wireframe before building.
- **Build through issues, branches, and PRs** — Construct the portfolio through an auditable feature workflow while keeping main deployable.
- **Deploy with GitHub Pages** — Publish the portfolio, verify its URL and deployment, then diagnose common path and build failures.
- **Register and map custom domains** — Register a domain securely and map one or multiple GitHub Pages repositories using verified DNS and HTTPS.
- **Release and maintain production** — Tag the public release, document it, deliver a maintenance change, and plan responsible next steps.
