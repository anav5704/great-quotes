ALTER TABLE "Quote" DROP CONSTRAINT "Quote_userId_fkey";
--> statement-breakpoint
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";
--> statement-breakpoint
ALTER TABLE "Like" DROP CONSTRAINT "Like_quoteId_fkey";
--> statement-breakpoint
ALTER TABLE "User" ALTER COLUMN "createAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "Quote" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "Quote" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "Like" ALTER COLUMN "createdAt" SET DATA TYPE timestamp(3) with time zone;--> statement-breakpoint
ALTER TABLE "Like" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "Like" ALTER COLUMN "updatedAt" SET DATA TYPE timestamp(3) with time zone;--> statement-breakpoint
ALTER TABLE "Like" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Quote" ADD CONSTRAINT "Quote_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Like" ADD CONSTRAINT "Like_quoteId_Quote_id_fk" FOREIGN KEY ("quoteId") REFERENCES "public"."Quote"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
