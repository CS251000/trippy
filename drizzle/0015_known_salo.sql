ALTER TABLE "users_to_trips" DROP CONSTRAINT "users_to_trips_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "users_to_trips" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users_to_trips" ADD CONSTRAINT "users_to_trips_user_id_users_clerk_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("clerk_id") ON DELETE no action ON UPDATE no action;