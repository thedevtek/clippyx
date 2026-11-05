# Clippyx — UX and Interaction Specification

## Design direction
- Compact, calm, developer-oriented desktop utility.
- Light and dark themes; default to system theme.
- Neutral surfaces with one restrained accent color.
- Clear typography, tight spacing, no decorative dashboard clutter.
- Use accessible contrast and visible keyboard focus.
- Prefer simple icons with labels/tooltips where meaning is not obvious.

## Primary window: Quick Clipboard
Suggested layout:
- Header: Clippyx icon/name, capture status indicator.
- Search input: focused automatically on open.
- Main list: clipboard entries, newest first.
- Preview area: selected item's content (read-only).
- Footer: keyboard hints and result count.

### Entry row
- Text preview (one or two lines)
- Relative timestamp
- Pin icon/state
- Optional detected category badge (plain text, URL, code) only if detection is dependable

### Quick window behavior
- `Ctrl+Shift+V`: show and focus quick window.
- `Escape`: hide quick window.
- `ArrowUp` / `ArrowDown`: navigate results.
- `Enter`: copy selected entry to clipboard and close.
- `Ctrl+P`: pin/unpin selected entry.
- `Delete`: delete selected entry.
- `Ctrl+F` or typing: focus/search.
- `Ctrl+Shift+Delete`: clear unpinned history only after confirmation; do not make this a silent destructive action.

## Main window / settings
- History view can be larger and resizable.
- Settings should be grouped: General, History, Privacy, About.
- Show capture status prominently.
- Clear distinction between “Pause capture” and “Clear history.”

## Empty states
- History empty: explain that copied text will appear here.
- Search empty: “No clips match this search.”
- Paused: show clear paused state and how to resume.

## Safety UX
- Explain that clipboard history can contain sensitive data.
- Excluded-app behavior must communicate limitations if Windows source-app detection is not reliable.
- Confirm destructive clear-all action.
- Do not show full sensitive-looking values in notifications or logs.
