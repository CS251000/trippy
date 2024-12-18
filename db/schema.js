import { pgTable, serial, varchar, date, integer } from "drizzle-orm/pg-core";

export const tripDetailsTable = pgTable("trip_details", {
  id: serial("id").primaryKey(), 
  destination: varchar("destination", { length: 255 }).notNull(),
  start_date: date("start_date").notNull(),
  end_date: date("end_date").notNull(),
  description: varchar("description", { length: 500 }),
//   user_id: integer("user_id").notNull(),
});
