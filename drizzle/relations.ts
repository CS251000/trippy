import { relations } from "drizzle-orm/relations";
import { trips, payments, users, review, chats, messages, itineraryItems, chatsToUsers, usersToTrips } from "./schema";

export const paymentsRelations = relations(payments, ({one}) => ({
	trip: one(trips, {
		fields: [payments.tripId],
		references: [trips.tripId]
	}),
	user: one(users, {
		fields: [payments.userId],
		references: [users.userId]
	}),
}));

export const tripsRelations = relations(trips, ({many}) => ({
	payments: many(payments),
	reviews: many(review),
	itineraryItems: many(itineraryItems),
	chats: many(chats),
	usersToTrips: many(usersToTrips),
}));

export const usersRelations = relations(users, ({many}) => ({
	payments: many(payments),
	reviews: many(review),
	messages: many(messages),
	chatsToUsers: many(chatsToUsers),
	usersToTrips: many(usersToTrips),
}));

export const reviewRelations = relations(review, ({one}) => ({
	trip: one(trips, {
		fields: [review.tripId],
		references: [trips.tripId]
	}),
	user: one(users, {
		fields: [review.userId],
		references: [users.userId]
	}),
}));

export const messagesRelations = relations(messages, ({one}) => ({
	chat: one(chats, {
		fields: [messages.chatId],
		references: [chats.id]
	}),
	user: one(users, {
		fields: [messages.senderId],
		references: [users.userId]
	}),
}));

export const chatsRelations = relations(chats, ({one, many}) => ({
	messages: many(messages),
	trip: one(trips, {
		fields: [chats.tripId],
		references: [trips.tripId]
	}),
	chatsToUsers: many(chatsToUsers),
}));

export const itineraryItemsRelations = relations(itineraryItems, ({one}) => ({
	trip: one(trips, {
		fields: [itineraryItems.tripId],
		references: [trips.tripId]
	}),
}));

export const chatsToUsersRelations = relations(chatsToUsers, ({one}) => ({
	user: one(users, {
		fields: [chatsToUsers.userId],
		references: [users.userId]
	}),
	chat: one(chats, {
		fields: [chatsToUsers.chatId],
		references: [chats.id]
	}),
}));

export const usersToTripsRelations = relations(usersToTrips, ({one}) => ({
	user: one(users, {
		fields: [usersToTrips.userId],
		references: [users.clerkId]
	}),
	trip: one(trips, {
		fields: [usersToTrips.tripId],
		references: [trips.tripId]
	}),
}));