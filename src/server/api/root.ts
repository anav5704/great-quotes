import { quoteRouter } from "~/server/api/routers/quote";
import { createTRPCRouter } from "~/server/api/trpc";
import { likeRouter } from "./routers/like";

export const appRouter = createTRPCRouter({
  quote: quoteRouter,
  like: likeRouter
});

export type AppRouter = typeof appRouter;
