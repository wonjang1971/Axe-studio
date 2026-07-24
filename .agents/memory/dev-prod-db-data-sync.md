---
name: Dev vs prod DB data drift
description: Why the published domain can differ from the preview, and how to fix content-in-DB drift safely.
---

# Preview vs published domain differ because dev and prod use SEPARATE databases

**Rule:** Replit's Publish flow migrates DB *schema* automatically but NEVER copies *data*.
Rows created/edited in the development database do not appear in production, and the
production DB (read-only replica accessible via `executeSql({environment:"production"})`)
may hold older/legacy rows.

**Why:** This caused the AXE Studio audition page to look different on the live domain:
dev had renamed role rows (e.g. "최승경"), production still had legacy rows
("주연 1 (최승경)", status "접수 준비중") plus a real application referencing role_id 1.
Name-based UI features (e.g. matching a role name to a frontend detail map) silently break
on prod when the stored names differ.

**How to apply:** Once content becomes admin-editable, code-as-source-of-truth at read
time breaks (edits get overridden). The working pattern: a one-time seed/migration that
runs at SERVER STARTUP (never inside a GET handler — a public GET must not write) and
rewrites only exactly-matched known legacy row names to canonical content; afterwards the
DB is the sole source of truth. Verify exact legacy names against prod via
`executeSql({environment:"production"})` before writing the map. Never use substring
matching (it can clobber admin-created rows); never delete/rewrite rows referenced by
existing applications — preserve ids.
