CREATE TYPE "public"."tripStatus" AS ENUM('Scheduled', 'Ongoing', 'Completed');--> statement-breakpoint
ALTER TABLE "trips" ALTER COLUMN "type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "trips" ALTER COLUMN "status" SET DATA TYPE tripStatus;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "participants_upper_limit" integer;