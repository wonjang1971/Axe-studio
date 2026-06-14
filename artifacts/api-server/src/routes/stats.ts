import { Router } from "express";
import { db, auditionRolesTable, auditionApplicationsTable, sponsorshipInquiriesTable } from "@workspace/db";
import { count, eq } from "drizzle-orm";

const router = Router();

router.get("/stats", async (req, res) => {
  try {
    const [[{ total: totalApplications }], [{ total: totalInquiries }], [{ open: openRoles }]] = await Promise.all([
      db.select({ total: count() }).from(auditionApplicationsTable),
      db.select({ total: count() }).from(sponsorshipInquiriesTable),
      db.select({ open: count() }).from(auditionRolesTable).where(eq(auditionRolesTable.status, "접수중")),
    ]);

    res.json({
      totalApplications: Number(totalApplications),
      openRoles: Number(openRoles),
      totalInquiries: Number(totalInquiries),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get stats");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
