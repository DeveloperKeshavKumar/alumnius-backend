CREATE TABLE IF NOT EXISTS "eventRegistrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"eventId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"registeredAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organizerId" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"date" timestamp NOT NULL,
	"location" varchar(255) NOT NULL,
	"isPublic" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"isDeleted" varchar(1) DEFAULT 'N' NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"alumniId" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"company" varchar(255) NOT NULL,
	"location" varchar(255),
	"salary" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"isDeleted" varchar(1) DEFAULT 'N' NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "successStories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"alumniId" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"story" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"editedAt" timestamp DEFAULT now() NOT NULL,
	"isDeleted" varchar(1) DEFAULT 'N' NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" varchar(255) DEFAULT 'student' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"isDeleted" varchar(1) DEFAULT 'N' NOT NULL,
	"deletedAt" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "eventRegistrations" ADD CONSTRAINT "eventRegistrations_eventId_events_id_fk" FOREIGN KEY ("eventId") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "eventRegistrations" ADD CONSTRAINT "eventRegistrations_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events" ADD CONSTRAINT "events_organizerId_users_id_fk" FOREIGN KEY ("organizerId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "jobs" ADD CONSTRAINT "jobs_alumniId_users_id_fk" FOREIGN KEY ("alumniId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "successStories" ADD CONSTRAINT "successStories_alumniId_users_id_fk" FOREIGN KEY ("alumniId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
