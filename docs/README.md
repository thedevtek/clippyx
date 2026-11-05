# Clippyx — Claude Project Docs

This folder contains the product and engineering specifications for building **Clippyx**, a Windows-first developer clipboard manager.

## Recommended reading order
1. `PROJECT_BRIEF.md` — product vision and scope
2. `PRD.md` — requirements and acceptance criteria
3. `UX_SPEC.md` — screens, interactions, shortcuts
4. `ARCHITECTURE.md` — technical design and boundaries
5. `DATA_MODEL.md` — SQLite schema and retention
6. `ROADMAP.md` — milestones and implementation sequence
7. `CLAUDE.md` — working instructions for Claude Code

## How to use
Copy these files into the root of your repository. Start Claude Code in that repository and ask it to:
> Read CLAUDE.md and the linked project docs. First inspect the repository, then propose the implementation plan for Milestone 0. Do not start coding until you show the plan.

## Product guardrails
- Windows-first, local-first, privacy-first.
- MVP captures **text only**. Do not silently expand to images, HTML, cloud sync, accounts, or AI.
- Clipboard content is sensitive. Privacy controls are core functionality, not polish.
- Keep the app keyboard-first and fast.
- Prefer small, reviewable implementation steps with tests.
