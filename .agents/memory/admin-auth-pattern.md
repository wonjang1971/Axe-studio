---
name: Admin auth pattern
description: How admin-only API endpoints are protected in the AXE Studio app
---
Admin endpoints (create role, list applications, list sponsorship inquiries) are protected server-side by `requireAdmin` middleware (Bearer token == ADMIN_PASSWORD || VITE_ADMIN_PASSWORD || "axe2026"). The admin page calls `setAuthTokenGetter(() => password)` on login so generated hooks attach the token.
**Why:** the admin password gate in admin.tsx is client-side only; architect review flagged unauthenticated admin writes as a critical access-control gap.
**How to apply:** any new admin-only route must add `requireAdmin`; public routes (roles list, apply, sponsorship submit) stay open.
