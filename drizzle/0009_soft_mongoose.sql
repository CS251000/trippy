ALTER TABLE "users" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "full_name" varchar NOT NULL;