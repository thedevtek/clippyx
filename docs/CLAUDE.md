# Claude Code Instructions — Clippyx

You are helping build Clippyx, a Windows-first, local-first developer clipboard manager. Read `README.md`, `PROJECT_BRIEF.md`, `PRD.md`, `UX_SPEC.md`, `ARCHITECTURE.md`, `DATA_MODEL.md`, and `ROADMAP.md` before making substantial changes.

## Working rules
1. Inspect the current repository before proposing changes. Do not assume files or dependencies exist.
2. Work milestone-by-milestone in the order defined by `ROADMAP.md`.
3. Before each milestone, provide a concise implementation plan: files to create/change, key decisions, risks, and tests.
4. Wait for approval before implementing a milestone if the user asks for planning or has not authorized coding.
5. Implement in small, reviewable increments. Avoid huge one-shot code dumps.
6. Do not add features outside the current milestone without asking.
7. Prefer simple, maintainable TypeScript and explicit types. Avoid `any`; explain exceptions.
8. Keep Electron security boundaries strict: no Node integration in renderer, context isolation, narrow typed IPC, validated inputs.
9. Never log, transmit, or include clipboard content in telemetry or diagnostics.
10. Preserve clipboard behavior: capture must not interfere with normal copy/paste.
11. Add tests for core logic and update documentation.
12. After changes, report files changed, commands run, test/build results, and known limitations.

## Product constraints
- MVP supports text clipboard only.
- Local SQLite persistence.
- No account, cloud sync, AI, image history, OCR, or plugin marketplace in MVP.
- Privacy controls are mandatory.
- Default global shortcut is Ctrl+Shift+V, configurable.
- Default retention is 7 days and 500 unpinned entries.
- Pinned items do not expire automatically.

## First task
Inspect the repository and report:
- Existing structure and stack (if any)
- What is already implemented
- Missing Milestone 0 items
- A proposed step-by-step Milestone 0 plan
- Risks and validation commands

Do not start implementing until the user approves the plan.
