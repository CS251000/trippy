CREATE TYPE "public"."tripType" AS ENUM('Relaxing', 'Adventurous', 'Sightseeing', 'Cultural', 'Wildlife', 'Beach', 'Hiking', 'Drizzle', 'Snowy', 'Romantic', 'FamilyFriendly', 'Historical', 'RoadTrip', 'Luxury', 'EcoFriendly', 'Festival', 'Wellness', 'AdventureSports', 'Cruise', 'Camping');--> statement-breakpoint
CREATE TABLE "trips" (
	"trip_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "trips_trip_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 100 CACHE 1),
	"destination" text NOT NULL,
	"subDestinations" text[] DEFAULT '{}'::text[],
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"budget" integer NOT NULL,
	"tripType" "tripType"
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"first_name" text NOT NULL,
	"second_name" text NOT NULL,
	"email" varchar NOT NULL,
	"phone_number" numeric NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"emergencyPhoneNumber" numeric NOT NULL,
	"profileImage" text,
	"age" integer NOT NULL,
	"host_organization" text NOT NULL
);
