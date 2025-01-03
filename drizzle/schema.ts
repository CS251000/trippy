import { pgTable, foreignKey, serial, varchar, integer, timestamp, text, boolean, unique, numeric, date, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const role = pgEnum("role", ['host', 'admin', 'member'])
export const tripStatus = pgEnum("trip_status", ['Scheduled', 'Ongoing', 'Completed'])
export const tripType = pgEnum("trip_type", ['Relaxing', 'Adventurous', 'Sightseeing', 'Cultural', 'Wildlife', 'Beach', 'Hiking', 'Drizzle', 'Snowy', 'Romantic', 'FamilyFriendly', 'Historical', 'RoadTrip', 'Luxury', 'EcoFriendly', 'Festival', 'Wellness', 'AdventureSports', 'Cruise', 'Camping'])


export const payments = pgTable("payments", {
	paymentId: serial("payment_id").primaryKey().notNull(),
	status: varchar({ length: 50 }).notNull(),
	tripId: integer("trip_id").notNull(),
	userId: integer("user_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.tripId],
			foreignColumns: [trips.tripId],
			name: "payments_trip_id_trips_trip_id_fk"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.userId],
			name: "payments_user_id_users_user_id_fk"
		}),
]);

export const review = pgTable("review", {
	reviewId: serial("review_id").primaryKey().notNull(),
	rating: integer().notNull(),
	tripId: integer("trip_id").notNull(),
	userId: integer("user_id").notNull(),
	content: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.tripId],
			foreignColumns: [trips.tripId],
			name: "review_trip_id_trips_trip_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.userId],
			name: "review_user_id_users_user_id_fk"
		}).onDelete("cascade"),
]);

export const messages = pgTable("messages", {
	id: serial().primaryKey().notNull(),
	chatId: integer("chat_id").notNull(),
	senderId: integer("sender_id").notNull(),
	content: text().notNull(),
	renderedContent: text("rendered_content").notNull(),
	isAnnouncement: boolean("is_announcement").default(false).notNull(),
	sentAt: timestamp("sent_at", { mode: 'string' }).defaultNow(),
	url: text(),
}, (table) => [
	foreignKey({
			columns: [table.chatId],
			foreignColumns: [chats.id],
			name: "messages_chat_id_chats_id_fk"
		}),
	foreignKey({
			columns: [table.senderId],
			foreignColumns: [users.userId],
			name: "messages_sender_id_users_user_id_fk"
		}),
]);

export const users = pgTable("users", {
	userId: serial("user_id").primaryKey().notNull(),
	username: varchar({ length: 64 }).notNull(),
	email: varchar({ length: 320 }).notNull(),
	phoneNumber: varchar("phone_number", { length: 15 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	emergencyContact: varchar("emergency_contact", { length: 15 }),
	profileImage: text("profile_image"),
	age: integer().notNull(),
	clerkId: text("clerk_id").notNull(),
	fullName: varchar("full_name").notNull(),
}, (table) => [
	unique("users_clerk_id_unique").on(table.clerkId),
]);

export const itineraryItems = pgTable("itinerary_items", {
	itineraryId: serial("itinerary_id").primaryKey().notNull(),
	title: varchar({ length: 100 }).notNull(),
	description: text(),
	type: varchar({ length: 30 }).notNull(),
	status: varchar({ length: 50 }).notNull(),
	budget: numeric({ precision: 10, scale:  2 }),
	location: varchar({ length: 100 }),
	image: text(),
	startTime: timestamp("start_time", { mode: 'string' }).notNull(),
	endTime: timestamp("end_time", { mode: 'string' }).notNull(),
	tripId: integer("trip_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.tripId],
			foreignColumns: [trips.tripId],
			name: "itinerary_items_trip_id_trips_trip_id_fk"
		}).onDelete("cascade"),
]);

export const trips = pgTable("trips", {
	tripId: serial("trip_id").primaryKey().notNull(),
	title: varchar({ length: 100 }),
	description: text(),
	destination: varchar({ length: 100 }).notNull(),
	startDate: date("start_date").notNull(),
	endDate: date("end_date").notNull(),
	participantsUpperLimit: integer("participants_upper_limit"),
	budget: numeric({ precision: 10, scale:  2 }).notNull(),
	type: tripType().notNull(),
	status: tripStatus().notNull(),
	tripRating: integer("trip_rating").default(0),
});

export const chats = pgTable("chats", {
	id: serial().primaryKey().notNull(),
	tripId: integer("trip_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.tripId],
			foreignColumns: [trips.tripId],
			name: "chats_trip_id_trips_trip_id_fk"
		}),
]);

export const chatsToUsers = pgTable("chats_to_users", {
	userId: integer("user_id").notNull(),
	chatId: integer("chat_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.userId],
			name: "chats_to_users_user_id_users_user_id_fk"
		}),
	foreignKey({
			columns: [table.chatId],
			foreignColumns: [chats.id],
			name: "chats_to_users_chat_id_chats_id_fk"
		}),
	primaryKey({ columns: [table.userId, table.chatId], name: "chats_to_users_user_id_chat_id_pk"}),
]);

export const usersToTrips = pgTable("users_to_trips", {
	userId: text("user_id").notNull(),
	tripId: integer("trip_id").notNull(),
	role: role(),
	status: tripStatus(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.clerkId],
			name: "users_to_trips_user_id_users_clerk_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.tripId],
			foreignColumns: [trips.tripId],
			name: "users_to_trips_trip_id_trips_trip_id_fk"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.userId, table.tripId], name: "users_to_trips_user_id_trip_id_pk"}),
]);
