import { relations } from "drizzle-orm";
import {
    pgEnum,
    pgTable,
    serial,
    integer,
    varchar,
    text,
    timestamp,
    primaryKey,
    numeric,
    boolean,
} from "drizzle-orm/pg-core";

export const MAX_USERNAME_LENGTH = 64;
export const MAX_EMAIL_LENGTH = 320;
export const MAX_DESTINATION_NAME_LENGTH = 100;
export const MAX_TRIP_TITLE_LENGTH = 100;

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

// Users
export const users = pgTable("users", {
    id: serial("user_id").primaryKey(),
    username: varchar("username", { length: MAX_USERNAME_LENGTH }).notNull(),
    email: varchar("email", { length: MAX_EMAIL_LENGTH }).notNull().unique(),
    phoneNumber: varchar("phone_number", { length: 15 }).unique(),
    createdAt: timestamp("created_at").defaultNow(),
    emergencyContact: varchar("emergency_contact", { length: 15 }),
    profileImage: text("profile_image"),
    age: integer("age").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
    usersToTrips: many(usersToTrips),
    chatsToUsers: many(chatsToUsers),
    reviews: many(reviews),
}));

// Trips
export const trips = pgTable("trips", {
    id: serial("trip_id").primaryKey(),
    title: varchar("title", { length: MAX_TRIP_TITLE_LENGTH }),
    description: text("description"),
    destination: varchar("destination", {
        length: MAX_DESTINATION_NAME_LENGTH,
    }).notNull(),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date").notNull(),
    budget: numeric("budget", { precision: 10, scale: 2 }).notNull(),
    type: tripTypeEnum(),
    status: varchar("status", { length: 50 }).notNull(),
});

export const tripsRelations = relations(trips, ({ many }) => ({
    usersToTrips: many(usersToTrips),
    itineraryItems: many(itineraryItems),
    reviews: many(reviews),
}));

// Users - Trips
export const role = pgEnum("role", ["host", "admin", "member"]);

export const usersToTrips = pgTable(
    "users_to_trips",
    {
        userId: integer("user_id")
            .notNull()
            .references(() => users.id),
        tripId: integer("trip_id")
            .notNull()
            .references(() => trips.id),
        role: role(),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.userId, t.tripId] }),
    })
);

export const usersToTripsRelations = relations(usersToTrips, ({ one }) => ({
    trip: one(trips, {
        fields: [usersToTrips.tripId],
        references: [trips.id],
    }),
    user: one(users, {
        fields: [usersToTrips.userId],
        references: [users.id],
    }),
}));


// Itinerary items
export const itineraryItems = pgTable("itinerary_items", {
    id: serial("itinerary_id").primaryKey(),
    title: varchar("title", { length: MAX_TRIP_TITLE_LENGTH }).notNull(),
    description: text("description"),
    type: varchar("type", { length: 30 }).notNull(),
    status: varchar("status", { length: 50 }).notNull(),
    cost: numeric("budget", { precision: 10, scale: 2 }),
    location: varchar("location", { length: MAX_DESTINATION_NAME_LENGTH }),
    image: text("image"),
    startTime: timestamp("start_time").notNull(),
    endTime: timestamp("end_time").notNull(),
    tripId: integer("trip_id").notNull().references(() => trips.id),
});

export const itineraryItemsRelations = relations(itineraryItems, ({ one }) => ({
    trip: one(trips, {
        fields: [itineraryItems.tripId],
        references: [trips.id],
    }),
}));

// Reviews
export const reviews = pgTable("review", {
    id: serial("review_id").primaryKey(),
    rating: integer("rating").notNull(),
    tripId: integer("trip_id").notNull().references(() => trips.id),
    userId: integer("user_id").notNull().references(() => users.id),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const reviewRelations = relations(reviews, ({ one }) => ({
    trip: one(trips, {
        fields: [reviews.tripId],
        references: [trips.id],
    }),
    user: one(users, {
        fields: [reviews.userId],
        references: [users.id],
    }),
}));

// Chats
export const chats = pgTable("chats", {
    id: serial("id").primaryKey(),
    tripId: integer("trip_id").notNull().references(() => trips.id),
    createdAt: timestamp("created_at").defaultNow(),
});

export const chatsRelations = relations(chats, ({ one, many }) => ({
    trip: one(trips, {
        fields: [chats.tripId],
        references: [trips.id],
    }),
    messages: many(messages),
    chatsToUsers: many(chatsToUsers),
}));

// Chats - Users
export const chatsToUsers = pgTable(
    "chats_to_users",
    {
        userId: integer("user_id")
            .notNull()
            .references(() => users.id),
        chatId: integer("chat_id")
            .notNull()
            .references(() => chats.id),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.userId, t.chatId] }),
    })
);

export const chatsToUsersRelations = relations(chatsToUsers, ({ one }) => ({
    user: one(users, {
        fields: [chatsToUsers.userId],
        references: [users.id],
    }),
    chat: one(chats, {
        fields: [chatsToUsers.chatId],
        references: [chats.id],
    }),
}));

// Messages
export const messages = pgTable("messages", {
    id: serial("id").primaryKey(),
    chatId: integer("chat_id").notNull().references(() => chats.id),
    senderId: integer("sender_id").notNull().references(() => users.id),
    content: text("content").notNull(),
    renderedContent: text("rendered_content").notNull(),
    isAnnouncement: boolean("is_announcement").notNull().default(false),
    sentAt: timestamp("sent_at").defaultNow(),
    url: text("url"), // To store multimedia content
});

export const messagesRelations = relations(messages, ({ one }) => ({
    chat: one(chats, {
        fields: [messages.chatId],
        references: [chats.id],
    }),
    sender: one(users, {
        fields: [messages.senderId],
        references: [users.id],
    }),
}));

export const payments = pgTable("payments", {
  id: serial("payment_id").primaryKey(),
  status: varchar("status", { length: 50 }).notNull(),
  tripId: integer("trip_id").notNull().references(() => trips.id),
  userId: integer("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const paymentsRelations = relations(payments, ({ one }) => ({
  trip: one(trips, {
      fields: [payments.tripId],
      references: [trips.id],
  }),
  user: one(users, {
      fields: [payments.userId],
      references: [users.id],
  }),
}));


