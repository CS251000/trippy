ALTER TABLE "itinerary_items" DROP CONSTRAINT "itinerary_items_trip_id_trips_trip_id_fk";
--> statement-breakpoint
ALTER TABLE "review" DROP CONSTRAINT "review_trip_id_trips_trip_id_fk";
--> statement-breakpoint
ALTER TABLE "review" DROP CONSTRAINT "review_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "users_to_trips" DROP CONSTRAINT "users_to_trips_user_id_users_clerk_id_fk";
--> statement-breakpoint
ALTER TABLE "users_to_trips" DROP CONSTRAINT "users_to_trips_trip_id_trips_trip_id_fk";
--> statement-breakpoint
ALTER TABLE "users_to_trips" DROP CONSTRAINT "users_to_trips_status_trips_status_fk";
--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "trip_rating" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "itinerary_items" ADD CONSTRAINT "itinerary_items_trip_id_trips_trip_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("trip_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_trip_id_trips_trip_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("trip_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_trips" ADD CONSTRAINT "users_to_trips_user_id_users_clerk_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("clerk_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_trips" ADD CONSTRAINT "users_to_trips_trip_id_trips_trip_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("trip_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_trips" ADD CONSTRAINT "users_to_trips_status_trips_status_fk" FOREIGN KEY ("status") REFERENCES "public"."trips"("status") ON DELETE cascade ON UPDATE no action;