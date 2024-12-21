import { pgTable, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const tripType = pgEnum("tripType", ['Relaxing', 'Adventurous', 'Sightseeing', 'Cultural', 'Wildlife', 'Beach', 'Hiking', 'Drizzle', 'Snowy', 'Romantic', 'FamilyFriendly', 'Historical', 'RoadTrip', 'Luxury', 'EcoFriendly', 'Festival', 'Wellness', 'AdventureSports', 'Cruise', 'Camping'])



