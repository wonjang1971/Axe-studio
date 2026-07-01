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

**How to apply:** For essentially-static "content" that lives in a DB table but must be
identical across environments, make server code the source of truth: keep a canonical
list in code for display fields and use the DB row only for the stable `id` (FK). Map
canonical→DB row (e.g. by name substring) at read time. This fixes the live site on the
next republish WITHOUT writing to production (the agent cannot write to prod; only SELECT).
Do NOT delete/rewrite production rows referenced by existing applications — preserve ids.
