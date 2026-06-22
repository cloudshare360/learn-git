# 2. Install your tools — Code Diagrams

Prepare Git, GitHub, and VS Code safely.

## Lesson sequence

```mermaid
flowchart TD
  M["2. Install your tools"]
  L1["Create and secure a GitHub account"]
  M --> L1
  L2["Install Git and Unix tools"]
  M --> L2
  L1 --> L2
  L3["Configure identity and defaults"]
  M --> L3
  L2 --> L3
  L4["Install and orient yourself in VS Code"]
  M --> L4
  L3 --> L4
```

## Concept coverage

```mermaid
flowchart LR
  M["2. Install your tools"]
  L1["Create and secure a GitHub account"]
  M --> L1
  L1 --> O1["Outcome: Create a durable public identity with recovery and privacy protections."]
  L1 --> T1["Terms: github, repository"]
  L1 --> V1["Visual: flow — Account safety"]
  L2["Install Git and Unix tools"]
  M --> L2
  L2 --> O2["Outcome: Install Git from an official source, select appropriate Windows options, and verify th…"]
  L2 --> T2["Terms: git, shell"]
  L2 --> C2["Commands: Verify Git | Install on Ubuntu/Debian"]
  L2 --> V2["Visual: flow — Installation path"]
  L3["Configure identity and defaults"]
  M --> L3
  L3 --> O3["Outcome: Set Git’s author identity, main default, and inspect where configuration values came f…"]
  L3 --> T3["Terms: git, commit"]
  L3 --> C3["Commands: Set global author identity | Use main for new repositories | Inspect values and sourc…"]
  L3 --> V3["Visual: layers — Configuration scopes"]
  L4["Install and orient yourself in VS Code"]
  M --> L4
  L4 --> O4["Outcome: Open a project folder, edit a file, use Source Control, and identify the active termin…"]
  L4 --> T4["Terms: directory, terminal"]
  L4 --> C4["Commands: Open the current folder in VS Code after PATH setup"]
  L4 --> V4["Visual: orientation — VS Code landmarks"]
```

## Text summary

- **Create and secure a GitHub account** — Create a durable public identity with recovery and privacy protections.
- **Install Git and Unix tools** — Install Git from an official source, select appropriate Windows options, and verify the executable.
- **Configure identity and defaults** — Set Git’s author identity, main default, and inspect where configuration values came from.
- **Install and orient yourself in VS Code** — Open a project folder, edit a file, use Source Control, and identify the active terminal shell.
