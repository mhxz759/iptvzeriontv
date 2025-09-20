import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  planType: text("plan_type").notNull(), // 'monthly', 'quarterly', 'annual'
  price: integer("price").notNull(),
  pixKey: text("pix_key").notNull(),
  whatsappNumber: text("whatsapp_number").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).pick({
  planType: true,
  price: true,
  pixKey: true,
  whatsappNumber: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type Subscription = typeof subscriptions.$inferSelect;

export const planSchema = z.object({
  type: z.enum(['monthly', 'quarterly', 'annual']),
  price: z.number(),
  name: z.string(),
  features: z.array(z.string()),
});

export type Plan = z.infer<typeof planSchema>;
