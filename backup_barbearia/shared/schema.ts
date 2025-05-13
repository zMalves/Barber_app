import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const barbers = pgTable("barbers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  experience: text("experience").notNull(),
  rating: text("rating").notNull(),
  reviewCount: integer("review_count").notNull(),
  imageUrl: text("image_url").notNull(),
  available: boolean("available").notNull().default(true),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  duration: integer("duration").notNull(),
  icon: text("icon").notNull(),
});

export const timeSlots = pgTable("time_slots", {
  id: serial("id").primaryKey(),
  barberId: integer("barber_id").notNull(),
  time: text("time").notNull(),
  date: text("date").notNull(),
  available: boolean("available").notNull().default(true),
});

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  barberId: integer("barber_id").notNull(),
  serviceId: integer("service_id").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerEmail: text("customer_email").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBarberSchema = createInsertSchema(barbers).omit({ id: true });
export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export const insertTimeSlotSchema = createInsertSchema(timeSlots).omit({ id: true });
export const insertAppointmentSchema = createInsertSchema(appointments).omit({ id: true, createdAt: true });

export type Barber = typeof barbers.$inferSelect;
export type InsertBarber = z.infer<typeof insertBarberSchema>;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type TimeSlot = typeof timeSlots.$inferSelect;
export type InsertTimeSlot = z.infer<typeof insertTimeSlotSchema>;

export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
