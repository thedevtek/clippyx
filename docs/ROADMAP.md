# Clippyx — Implementation Roadmap

## Milestone 0: Foundation
- [ ] Initialize Electron + React + TypeScript project.
- [ ] Configure formatting, linting, type checking, and tests.
- [ ] Set secure BrowserWindow defaults.
- [ ] Establish typed preload API and IPC allowlist.
- [ ] Add CI build/test workflow.
- [ ] Add app icon/name/version placeholders.

Exit criteria: app starts safely and builds for Windows.

## Milestone 1: Clipboard capture + persistence
- [ ] Implement clipboard monitor.
- [ ] Implement capture service (pause, dedupe, validation).
- [ ] Create SQLite schema and migrations.
- [ ] Implement ClipRepository.
- [ ] Add retention cleanup.
- [ ] Unit tests for dedupe, retention, and repository.

Exit criteria: copied text is captured and persists after restart.

## Milestone 2: Quick clipboard UI
- [ ] Create quick window.
- [ ] History list and preview.
- [ ] Search.
- [ ] Keyboard navigation.
- [ ] Copy selected entry.
- [ ] Hide on Escape.
- [ ] Global shortcut and conflict handling.

Exit criteria: core find-and-copy flow works entirely from keyboard.

## Milestone 3: Tray + settings + privacy
- [ ] Tray icon/menu.
- [ ] Pause/resume capture.
- [ ] Retention settings.
- [ ] Clear/delete actions.
- [ ] Pin/unpin.
- [ ] Startup setting.
- [ ] Close-to-tray setting.
- [ ] Privacy copy and safe logging.

Exit criteria: app can run daily without a visible main window.

## Milestone 4: Quality + release
- [ ] Add empty/error/loading states.
- [ ] Test Windows install/uninstall/upgrade.
- [ ] Test global shortcut and focus restoration.
- [ ] Test high-DPI and multiple displays.
- [ ] Test long text and Unicode.
- [ ] Check memory/CPU over a full workday.
- [ ] Create README, screenshots, privacy policy, license.
- [ ] Build installer and MSIX package.
- [ ] Prepare Microsoft Store submission.

Exit criteria: reliable public beta.

## Milestone 5: Developer extras (after MVP feedback)
- [ ] Code language detection.
- [ ] Syntax-highlighted preview.
- [ ] JSON pretty-print preview.
- [ ] Tags and snippet collections.
- [ ] Search filters.
- [ ] Export/import snippets.
- [ ] Image and rich clipboard formats only after a separate design review.

## Definition of done for every task
- TypeScript type check passes.
- Relevant tests pass.
- No clipboard content appears in logs.
- IPC remains typed and restricted.
- UI behavior is keyboard accessible.
- Documentation updated if behavior changes.
