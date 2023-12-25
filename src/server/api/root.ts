import { quoteRouter } from "~/server/api/routers/quote";
import { createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  quote: quoteRouter,
});

export type AppRouter = typeof appRouter;
