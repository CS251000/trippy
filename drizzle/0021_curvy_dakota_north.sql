ALTER TYPE "public"."trip_type" RENAME TO "trip_types";--> statement-breakpoint
ALTER TABLE "trips" ALTER COLUMN "type" SET DATA TYPE trip_types[];--> statement-breakpoint
ALTER TABLE "trips" ALTER COLUMN "type" SET DEFAULT '{}'::text[];