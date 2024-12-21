import { sql } from "drizzle-orm";
import { pgTable,integer, text, varchar, numeric, timestamp, date, pgEnum } from "drizzle-orm/pg-core";

export const tripTypeEnum = pgEnum('tripType', [
  'Relaxing',        // A calm and peaceful trip
  'Adventurous',     // For thrill-seekers
  'Sightseeing',     // Exploring famous landmarks and attractions
  'Cultural',        // Immersive cultural experiences
  'Wildlife',        // Nature and animal reserve trips
  'Beach',           // Beachside vacations
  'Hiking',          // Trekking and outdoor adventures
  'Drizzle',         // Trips during light rain
  'Snowy',           // Winter trips in snowy areas
  'Romantic',        // Perfect for couples
  'FamilyFriendly',  // Ideal for family vacations
  'Historical',      // Focused on visiting historical sites
  'RoadTrip',        // Long-distance travel by road
  'Luxury',          // High-end, luxurious travel experiences
  'EcoFriendly',     // Trips with a focus on sustainability
  'Festival',        // Attending music, art, or cultural festivals
  'Wellness',        // Focused on self-care and relaxation
  'AdventureSports', // Includes bungee jumping, rafting, etc.
  'Cruise',          // Trips on cruise ships
  'Camping',         // Outdoor camping experiences
]);


export const users= pgTable('users',{
  userId : integer('user_id').primaryKey().generatedAlwaysAsIdentity({startWith:1}),
  firstName: text('first_name').notNull(),
  secondName:text('second_name').notNull(),
  email: varchar().notNull(),
  phoneNumber: numeric('phone_number').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  emergencyPhoneNumber: numeric().notNull(),
  profileImage: text(),
  age: integer().notNull(),
  hostOrganization: text('host_organization').notNull()
});

export const trips= pgTable('trips',{
  tripId: integer('trip_id').primaryKey().generatedAlwaysAsIdentity({startWith:100}),
  destination: text().notNull(),
  subDestinations: text().array().default(sql`'{}'::text[]`),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  budget: integer().notNull(),
  tripType: tripTypeEnum()
});







