# Clippyx — Product Requirements Document (MVP)

## 1. Functional requirements

### FR-01: Clipboard capture
- Capture text clipboard changes while capture is enabled.
- Ignore empty content.
- Avoid duplicate consecutive entries with identical text.
- Do not capture content when the user has paused capture.
- Do not capture clipboard content from configured excluded applications, where reliable source-app detection is available.
- Capture failures must not crash the app.

### FR-02: History
- Show entries newest first.
- Each entry shows a safe preview, timestamp, and pinned state.
- Long text is truncated in list previews but remains intact in storage.
- Selecting an entry displays a detail/preview panel.
- Support deletion of one entry and clearing unpinned history.

### FR-03: Search
- Search text content case-insensitively.
- Search updates as the user types.
- Search must not block the UI thread.
- MVP may use SQLite LIKE; evaluate FTS5 if needed.

### FR-04: Copy and paste
- Selecting an entry and pressing Enter copies it to the system clipboard.
- Provide a configurable paste behavior:
  - Copy to clipboard only (safe default).
  - Copy and attempt paste into the previously focused application (advanced behavior; must be clearly documented and tested).
- Never overwrite clipboard unexpectedly without user action.

### FR-05: Pinning
- Pin/unpin an entry.
- Pinned entries survive normal history expiry and clear-unpinned actions.
- Pinned entries can be deleted explicitly.

### FR-06: Global shortcut
- Default shortcut: `Ctrl+Shift+V`.
- Shortcut must be configurable.
- Detect registration conflicts and show a useful message.
- If shortcut registration fails, app remains usable from the tray.

### FR-07: Tray and lifecycle
- App can minimize to tray.
- Closing the main window hides it to tray by default; provide a setting to quit on close.
- Tray menu includes: Open Clippyx, Pause/Resume capture, Settings, Quit.
- Optional launch-at-login setting.
- Single-instance behavior.

### FR-08: Privacy controls
- Pause/resume capture.
- Exclude applications from capture when source application can be identified reliably.
- Configure history retention (default: 7 days) and maximum unpinned entries (default: 500).
- Clear all history with confirmation.
- Clear unpinned history separately.
- Keep all clipboard content local; no analytics containing clipboard data.
- Show a visible paused indicator.

### FR-09: Settings
- General: startup, close-to-tray, shortcut.
- History: retention days, maximum entries.
- Privacy: pause capture, excluded applications.
- About: version, license, links.

### FR-10: Error handling
- Use understandable error messages.
- Log technical details locally without logging clipboard text or secrets.
- Recover gracefully from database or clipboard errors.

## 2. Non-functional requirements
- Windows 10/11 support; validate exact minimum OS version during packaging.
- UI should remain responsive during capture and search.
- Quick window should feel instantaneous; target under 250 ms from shortcut to visible/focused UI on a typical machine after startup.
- No network calls in MVP except optional update checking/package infrastructure if explicitly added later.
- Store data in the user's application data directory.
- Database operations must be parameterized.
- Renderer must not have unrestricted Node.js access.
- Use context isolation and a strict IPC allowlist.

## 3. Acceptance checklist
- [ ] Copying text in another app creates a history item.
- [ ] Copying the same text repeatedly does not create noisy duplicates (document dedupe policy).
- [ ] Pausing capture prevents new history entries.
- [ ] Shortcut opens quick window and focuses search.
- [ ] Arrow keys move selection.
- [ ] Enter copies selected content.
- [ ] Escape hides quick window.
- [ ] Pinning survives expiry.
- [ ] Clear-unpinned leaves pinned entries.
- [ ] App can be quit from tray.
- [ ] Restart restores history and settings.
- [ ] Clipboard content is never sent to remote services.
- [ ] Tests cover capture service, retention, dedupe, and repository operations.
