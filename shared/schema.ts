import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const hrContacts = pgTable("hr_contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  company: text("company").notNull(),
  position: text("position").notNull(),
  industry: text("industry").notNull(),
});

export const emailLogs = pgTable("email_logs", {
  id: serial("id").primaryKey(),
  recipientEmail: text("recipient_email").notNull(),
  recipientName: text("recipient_name"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull(), // 'individual' or 'bulk'
  status: text("status").notNull(), // 'pending', 'sent', 'failed'
  sentAt: timestamp("sent_at"),
});

export const insertHrContactSchema = createInsertSchema(hrContacts).omit({
  id: true,
});

export const insertEmailLogSchema = createInsertSchema(emailLogs).omit({
  id: true,
  sentAt: true,
});

export const sendEmailSchema = z.object({
  recipientEmail: z.string().email("Please enter a valid email address"),
  recipientName: z.string().min(1, "Recipient name is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
  type: z.enum(["individual", "bulk"]),
  quantity: z.number().optional(),
});

export type HrContact = typeof hrContacts.$inferSelect;
export type InsertHrContact = z.infer<typeof insertHrContactSchema>;
export type EmailLog = typeof emailLogs.$inferSelect;
export type InsertEmailLog = z.infer<typeof insertEmailLogSchema>;
export type SendEmailRequest = z.infer<typeof sendEmailSchema>;
