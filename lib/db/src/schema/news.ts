import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const newsItemsTable = pgTable("news_items", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(),
  category: text("category").notNull(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  badge: text("badge"),
  link: text("link"),
  isRecent: boolean("is_recent").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertNewsItemSchema = createInsertSchema(newsItemsTable).omit({ id: true, createdAt: true });
export type InsertNewsItem = z.infer<typeof insertNewsItemSchema>;
export type NewsItem = typeof newsItemsTable.$inferSelect;
