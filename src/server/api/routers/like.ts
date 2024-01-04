
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { currentUser } from "~/app/lib/currentUser"
import { z } from "zod"

export const likeRouter = createTRPCRouter({
    getLikedQuotes: publicProcedure
        .input(z.object({
            userId: z.string(),
            page: z.number()
        }))
        .query(async ({ ctx, input }) => {
            const { userId, page } = input

            const liked = await ctx.db.like.findMany({
                where: {
                    userId
                },
                include: {
                    quote: {
                        include: {
                            user: true,
                            likes: true
                        }
                    }
                },
                orderBy: {
                    quote: {
                        createdAt: "desc"
                    }
                },
                skip: 6 * page,
                take: 6
            })

            const quotes = liked.map((like) => like.quote)

            // return decrypt(quotes)
            return quotes
        }),

    toggleLike: publicProcedure
        .input(z.object({
            quoteId: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            const user = await currentUser()
            const { quoteId } = input
            if (!user) return

            const isLiked = await ctx.db.like.findFirst({
                where: {
                    userId: user.id,
                    quoteId,
                }
            })

            if (isLiked) {
                await ctx.db.like.deleteMany({
                    where: {
                        userId: user.id,
                        quoteId
                    }
                })
            }

            else {
                await ctx.db.like.create({
                    data: {
                        userId: user.id,
                        quoteId
                    }
                })
            }
        })
})
