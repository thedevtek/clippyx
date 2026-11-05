# Clippyx — Data Model

## SQLite tables

### `clips`
- `id`: TEXT primary key (UUID)
- `content`: TEXT not null
- `content_hash`: TEXT not null (used for dedupe; not a security guarantee)
- `created_at`: INTEGER not null (UTC epoch milliseconds)
- `last_copied_at`: INTEGER nullable
- `pinned`: INTEGER not null default 0
- `source_app`: TEXT nullable (only if source detection is reliable and privacy-approved)
- `kind`: TEXT not null default 'text' (MVP only supports text)
- `title`: TEXT nullable (future/manual)
- `deleted_at`: INTEGER nullable (optional; prefer hard delete for MVP unless undo is implemented)

Indexes:
- `created_at DESC`
- `pinned, created_at DESC`
- `content_hash`

### `settings`
- `key`: TEXT primary key
- `value_json`: TEXT not null
- `updated_at`: INTEGER not null

## Retention rules
- Default: 7 days for unpinned entries.
- Default maximum: 500 unpinned entries.
- Pinned entries are excluded from automatic expiry/count trimming.
- Run cleanup at startup and after capture batches.
- Clearing unpinned history must not delete pinned entries.
- Clear-all requires explicit confirmation and deletes pinned + unpinned.

## Dedupe policy
- MVP: do not create a new entry when the current clipboard text matches the latest captured item.
- Consider a short configurable dedupe window later.
- Do not silently update timestamps in a way that changes history semantics without documenting it.

## Data location
- Use Electron `app.getPath('userData')` for database and settings.
- Document backup/export behavior before introducing migration complexity.
- Add schema versioning/migrations from the first database version.
