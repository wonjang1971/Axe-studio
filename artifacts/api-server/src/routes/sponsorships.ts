import { Router } from "express";
import { db, sponsorshipInquiriesTable } from "@workspace/db";
import { SubmitSponsorshipInquiryBody } from "@workspace/api-zod";

const router = Router();

router.post("/sponsorships", async (req, res): Promise<void> => {
  const parsed = SubmitSponsorshipInquiryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation error", details: parsed.error.issues });
    return;
  }

  try {
    const [inquiry] = await db.insert(sponsorshipInquiriesTable).values({
      organizationName: parsed.data.organizationName,
      contactName: parsed.data.contactName,
      contactEmail: parsed.data.contactEmail,
      contactPhone: parsed.data.contactPhone ?? null,
      sponsorType: parsed.data.sponsorType,
      message: parsed.data.message,
    }).returning();

    res.status(201).json({
      id: inquiry.id,
      organizationName: inquiry.organizationName,
      contactName: inquiry.contactName,
      contactEmail: inquiry.contactEmail,
      contactPhone: inquiry.contactPhone,
      sponsorType: inquiry.sponsorType,
      message: inquiry.message,
      createdAt: inquiry.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to submit sponsorship inquiry");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/sponsorships", async (req, res) => {
  try {
    const inquiries = await db.select().from(sponsorshipInquiriesTable).orderBy(sponsorshipInquiriesTable.createdAt);
    res.json(inquiries.map(i => ({
      id: i.id,
      organizationName: i.organizationName,
      contactName: i.contactName,
      contactEmail: i.contactEmail,
      contactPhone: i.contactPhone,
      sponsorType: i.sponsorType,
      message: i.message,
      createdAt: i.createdAt.toISOString(),
    })));
  } catch (err) {
    req.log.error({ err }, "Failed to list inquiries");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
