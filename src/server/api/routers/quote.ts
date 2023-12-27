import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { currentUser } from "~/app/lib/currentUser"
import { db } from "~/server/db";
import { z } from "zod";

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
                    user: true,
                    likes: true,
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
        }),

    deleteQuote: publicProcedure
        .input(z.object({
            id: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            const { id } = input

            const quote = await db.quote.delete({
                where: {
                    id
                }
            })

            return quote
        }),

        toggleLike: publicProcedure
        .input(z.object({
            quoteId: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            const user = await currentUser()
            const { quoteId } = input
            if(!user) return

            const isLiked = await db.like.findFirst({
                where: {
                    userId: user.id,
                    quoteId,
                }
            })

            if (isLiked) {
                await db.like.deleteMany({
                    where: {
                        userId: user.id,
                        quoteId
                    }
                })
            }

            else {
                await db.like.create({
                    data: {
                        userId: user.id,
                        quoteId
                    }
                })
            }
        })
});
