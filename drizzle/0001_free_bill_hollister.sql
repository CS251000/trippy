CREATE TYPE "public"."role" AS ENUM('host', 'admin', 'member');--> statement-breakpoint
CREATE TABLE "chats" (
	"id" serial PRIMARY KEY NOT NULL,
	"trip_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "chats_to_users" (
	"user_id" integer NOT NULL,
	"chat_id" integer NOT NULL,
	CONSTRAINT "chats_to_users_user_id_chat_id_pk" PRIMARY KEY("user_id","chat_id")
);
--> statement-breakpoint
CREATE TABLE "itinerary_items" (
	"itinerary_id" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" text,
	"type" varchar(30) NOT NULL,
	"status" varchar(50) NOT NULL,
	"budget" numeric(10, 2),
	"location" varchar(100),
	"image" text,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"trip_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"chat_id" integer NOT NULL,
	"sender_id" integer NOT NULL,
	"content" text NOT NULL,
	"rendered_content" text NOT NULL,
	"is_announcement" boolean DEFAULT false NOT NULL,
	"sent_at" timestamp DEFAULT now(),
	"url" text
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"payment_id" serial PRIMARY KEY NOT NULL,
	"status" varchar(50) NOT NULL,
	"trip_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "review" (
	"review_id" serial PRIMARY KEY NOT NULL,
	"rating" integer NOT NULL,
	"trip_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users_to_trips" (
	"user_id" integer NOT NULL,
	"trip_id" integer NOT NULL,
	"role" "role",
	CONSTRAINT "users_to_trips_user_id_trip_id_pk" PRIMARY KEY("user_id","trip_id")
);
--> statement-breakpoint
ALTER TABLE "trips" ALTER COLUMN "trip_id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "trips" ALTER COLUMN "trip_id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "trips" ALTER COLUMN "destination" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "trips" ALTER COLUMN "start_date" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "trips" ALTER COLUMN "end_date" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "trips" ALTER COLUMN "budget" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "user_id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "user_id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE varchar(320);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "phone_number" SET DATA TYPE varchar(15);--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "title" varchar(100);--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "type" "tripType";--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "status" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "username" varchar(64) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "emergency_contact" varchar(15);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "profile_image" text;--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_trip_id_trips_trip_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("trip_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chats_to_users" ADD CONSTRAINT "chats_to_users_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chats_to_users" ADD CONSTRAINT "chats_to_users_chat_id_chats_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "itinerary_items" ADD CONSTRAINT "itinerary_items_trip_id_trips_trip_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("trip_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_id_chats_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_users_user_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_trip_id_trips_trip_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("trip_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_trip_id_trips_trip_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("trip_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_trips" ADD CONSTRAINT "users_to_trips_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_trips" ADD CONSTRAINT "users_to_trips_trip_id_trips_trip_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("trip_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trips" DROP COLUMN "subDestinations";--> statement-breakpoint
ALTER TABLE "trips" DROP COLUMN "tripType";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "first_name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "second_name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "emergencyPhoneNumber";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "profileImage";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "host_organization";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_phone_number_unique" UNIQUE("phone_number");