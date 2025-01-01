ALTER TABLE "users" ALTER COLUMN "user_id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "clerk_id" text NOT NULL;