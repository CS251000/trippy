ALTER TABLE "users_to_trips" DROP CONSTRAINT "users_to_trips_status_trips_status_fk";
--> statement-breakpoint
ALTER TABLE "users_to_trips" DROP COLUMN "status";