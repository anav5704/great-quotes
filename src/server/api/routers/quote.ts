import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { currentUser } from "~/app/lib/currentUser"
import { z } from "zod"

// import Cryptr from "cryptr"

// const cryptr = new Cryptr(process.env.NEXT_CRYPTR!)

// const decrypt = (quotes: (Quote & { user: User, likes: Like[] })[]) => {
//     const decryptedQuotes = quotes.map((quote) => {
//         const decryptedContent = cryptr.decrypt(quote.content)
//         return { ...quote, content: decryptedContent }
//     })

//     return decryptedQuotes
// }

export const quoteRouter = createTRPCRouter({
    createQuote: publicProcedure
        .input(z.object({
            content: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            const user = await currentUser()
            const { content } = input
            if (!user) return

            // const encryptedQuote = cryptr.encrypt(content)

            const quote = await ctx.db.quote.create({
                data: {
                    // content: encryptedQuote,
                    content,
                    userId: user.id
                }
            })

            return quote
        }),

    getQuotes: publicProcedure
        .input(z.object({
            page: z.number()
        }))
        .query(async ({ ctx, input }) => {
            const { page } = input

            const quotes = await ctx.db.quote.findMany({
                include: {
                    user: true,
                    likes: true,
                },
                orderBy: {
                    createdAt: "desc"
                },
                skip: 6 * page,
                take: 6,
            })

            // return decrypt(quotes)
            return quotes
        }),

    getQuoteByUserId: publicProcedure
        .input(z.object({
            id: z.string(),
            page: z.number()
        }))
        .query(async ({ ctx, input }) => {
            const { id, page } = input

            const quotes = await ctx.db.quote.findMany({
                where: {
                    userId: id
                },
                include: {
                    user: true,
                    likes: true,
                },
                orderBy: {
                    createdAt: "desc"
                },
                skip: 6 * page,
                take: 6
            })

            // return decrypt(quotes)
            return quotes
        }),

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

    updateQuote: publicProcedure
        .input(z.object({
            content: z.string(),
            id: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            const user = await currentUser()
            const { content, id } = input
            if (!user) return

            // const encryptedQuote = cryptr.encrypt(content)

            const quote = await ctx.db.quote.update({
                where: {
                    id
                },
                data: {
                    // content: encryptedQuote
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

            const quote = await ctx.db.quote.delete({
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
});
