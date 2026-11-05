# Clippyx — Technical Architecture

## Stack
- Electron
- React
- TypeScript
- Vite (renderer/build tooling)
- SQLite (choose a maintained Electron-compatible driver; document native rebuild strategy)
- Zustand or React state/context for UI state
- Tailwind CSS (optional)
- Lucide icons
- Electron Builder for packaging
- Vitest for unit tests; Playwright or Electron-focused smoke tests where practical

## Process boundaries

### Main process
Owns:
- Clipboard polling/monitoring
- Global shortcuts
- Window lifecycle and tray
- Database access
- Retention/cleanup
- OS integrations
- IPC handlers

### Preload
- Exposes a narrow, typed API using `contextBridge`.
- No generic IPC send/invoke method exposed to renderer.
- Validate all IPC payloads.

### Renderer
- React UI only.
- No direct Node access.
- No direct database access.
- Uses typed preload API.

## Suggested folder structure
```text
Clippyx/
  electron/
    main/
      index.ts
      windows/
      tray/
      shortcuts/
      clipboard/
      services/
      db/
      ipc/
    preload/
      index.ts
      api.ts
  src/
    app/
    components/
    features/
      history/
      snippets/
      settings/
    hooks/
    styles/
    types/
  tests/
    unit/
    integration/
  docs/
  package.json
  CLAUDE.md
```

## Core services
- `ClipboardMonitor`: detect clipboard changes and emit text capture events.
- `ClipboardCaptureService`: apply pause/exclusion/dedupe rules.
- `ClipRepository`: create/read/search/pin/delete records.
- `RetentionService`: expire old unpinned entries and enforce max count.
- `SettingsService`: validated local settings.
- `ShortcutService`: register/unregister global shortcuts.
- `WindowService`: quick window show/hide/focus behavior.
- `TrayService`: tray menu and lifecycle.
- `PrivacyService`: pause capture and exclusion rules.

## Clipboard monitoring
- Start with a conservative polling strategy if native event monitoring is not available through chosen APIs.
- Polling interval must be configurable internally and tested for CPU impact.
- Compare clipboard content/hash to last observed content.
- Never persist a hash as a substitute for content; use it only for dedupe/change detection.
- Avoid reading clipboard while capture is paused.
- Prevent Clippyx's own copy action from creating duplicate history entries; use an internal suppression token/flag.

## Security requirements
- `nodeIntegration: false`
- `contextIsolation: true`
- `sandbox: true` where compatible
- strict Content Security Policy
- typed IPC allowlist
- validate renderer-originated inputs
- parameterized SQL
- no clipboard content in logs
- no remote content loaded into privileged windows
- minimize permissions

## Packaging
- Build Windows x64 first.
- Provide MSIX package path for Microsoft Store submission.
- Keep GitHub release artifact as a secondary distribution option.
- Verify install, upgrade, startup, tray, and uninstall behavior.
