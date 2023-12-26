import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { currentUser } from "~/app/lib/currentUser"
import { z } from "zod";
import { db } from "~/server/db";

export const quoteRouter = createTRPCRouter({
    createQuote: publicProcedure
        .input(z.object({
            content: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            const user = await currentUser()
            const { content } = input
            if (!user) return

            const quote = await ctx.db.quote.create({
                data: {
                    content,
                    userId: user.id
                }
            })

            return quote
        }),

    getQuotes: publicProcedure
        .query(async ({ ctx }) => {
            const quotes = await db.quote.findMany({
                include: {
                    user: true
                }
            })
            return quotes
        }),

    updateQuote: publicProcedure
        .input(z.object({
            content: z.string(),
            id: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            const user = await currentUser()
            const { content, id } = input
            if (!user) return

            const quote = await db.quote.update({
                where: {
                    id
                },
                data: {
                    content
                }
            })

            return quote
        })
});
