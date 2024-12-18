CREATE TABLE "trip_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"destination" varchar(255) NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"description" varchar(500),
	"user_id" integer NOT NULL
);
