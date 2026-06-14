import { Router } from "express";
import { db, auditionRolesTable, auditionApplicationsTable } from "@workspace/db";
import { SubmitAuditionApplicationBody } from "@workspace/api-zod";

const router = Router();

router.get("/auditions/roles", async (req, res) => {
  try {
    const roles = await db.select().from(auditionRolesTable).orderBy(auditionRolesTable.id);
    res.json(roles.map(r => ({
      id: r.id,
      roleName: r.roleName,
      ageRange: r.ageRange,
      description: r.description,
      status: r.status,
    })));
  } catch (err) {
    req.log.error({ err }, "Failed to list audition roles");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/auditions/apply", async (req, res): Promise<void> => {
  const parsed = SubmitAuditionApplicationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation error", details: parsed.error.issues });
    return;
  }

  try {
    const [application] = await db.insert(auditionApplicationsTable).values({
      roleId: parsed.data.roleId,
      childName: parsed.data.childName,
      birthYear: parsed.data.birthYear,
      gender: parsed.data.gender,
      guardianName: parsed.data.guardianName,
      phone: parsed.data.phone,
      portfolio: parsed.data.portfolio ?? null,
      memo: parsed.data.memo ?? null,
    }).returning();

    res.status(201).json({
      id: application.id,
      roleId: application.roleId,
      childName: application.childName,
      birthYear: application.birthYear,
      gender: application.gender,
      guardianName: application.guardianName,
      phone: application.phone,
      portfolio: application.portfolio,
      memo: application.memo,
      createdAt: application.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to submit audition application");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/auditions/applications", async (req, res) => {
  try {
    const applications = await db.select().from(auditionApplicationsTable).orderBy(auditionApplicationsTable.createdAt);
    res.json(applications.map(a => ({
      id: a.id,
      roleId: a.roleId,
      childName: a.childName,
      birthYear: a.birthYear,
      gender: a.gender,
      guardianName: a.guardianName,
      phone: a.phone,
      portfolio: a.portfolio,
      memo: a.memo,
      createdAt: a.createdAt.toISOString(),
    })));
  } catch (err) {
    req.log.error({ err }, "Failed to list applications");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
