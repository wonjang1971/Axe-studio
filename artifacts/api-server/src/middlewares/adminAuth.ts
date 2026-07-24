import type { Request, Response, NextFunction } from "express";

const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD || process.env.VITE_ADMIN_PASSWORD || "axe2026";

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const header = req.header("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!token || token !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
}
