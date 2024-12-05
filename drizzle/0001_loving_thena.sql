ALTER TABLE "events" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "applyLink" text NOT NULL;