import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const sponsorshipInquiriesTable = pgTable("sponsorship_inquiries", {
  id: serial("id").primaryKey(),
  organizationName: text("organization_name").notNull(),
  contactName: text("contact_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone"),
  sponsorType: text("sponsor_type").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSponsorshipInquirySchema = createInsertSchema(sponsorshipInquiriesTable).omit({ id: true, createdAt: true });
export type InsertSponsorshipInquiry = z.infer<typeof insertSponsorshipInquirySchema>;
export type SponsorshipInquiry = typeof sponsorshipInquiriesTable.$inferSelect;
