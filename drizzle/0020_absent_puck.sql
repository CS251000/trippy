ALTER TABLE "review" RENAME COLUMN "user_id" TO "user_clerk_id";--> statement-breakpoint
ALTER TABLE "review" DROP CONSTRAINT "review_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_user_clerk_id_users_clerk_id_fk" FOREIGN KEY ("user_clerk_id") REFERENCES "public"."users"("clerk_id") ON DELETE cascade ON UPDATE no action;