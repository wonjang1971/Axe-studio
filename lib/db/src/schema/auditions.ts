import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const auditionRolesTable = pgTable("audition_roles", {
  id: serial("id").primaryKey(),
  roleName: text("role_name").notNull(),
  ageRange: text("age_range").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull().default("준비중"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAuditionRoleSchema = createInsertSchema(auditionRolesTable).omit({ id: true, createdAt: true });
export type InsertAuditionRole = z.infer<typeof insertAuditionRoleSchema>;
export type AuditionRole = typeof auditionRolesTable.$inferSelect;

export const auditionApplicationsTable = pgTable("audition_applications", {
  id: serial("id").primaryKey(),
  roleId: integer("role_id").notNull(),
  childName: text("child_name").notNull(),
  birthYear: text("birth_year").notNull(),
  gender: text("gender").notNull(),
  guardianName: text("guardian_name").notNull(),
  phone: text("phone").notNull(),
  portfolio: text("portfolio"),
  memo: text("memo"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAuditionApplicationSchema = createInsertSchema(auditionApplicationsTable).omit({ id: true, createdAt: true });
export type InsertAuditionApplication = z.infer<typeof insertAuditionApplicationSchema>;
export type AuditionApplication = typeof auditionApplicationsTable.$inferSelect;
