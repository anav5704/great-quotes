import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const quoteRouter = createTRPCRouter({
    createQuote: publicProcedure
        .input(z.object({
            content: z.string(),
            userId: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            const { content, userId } = input

            const quote = await ctx.db.quote.create({
                data: {
                    content,
                    userId,
                }
            })

            return quote
        })
});
