import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { currentUser } from "~/app/lib/currentUser"
import Cryptr from "cryptr"
import { z } from "zod";
import { Like, Quote, User } from "@prisma/client";
// import Cryptr from "cryptr"

const cryptr = new Cryptr(process.env.NEXT_CRYPTR!)
// const cryptr = new Cryptr(process.env.NEXT_CRYPTR!)

const decrypt = (quotes: (Quote & { user: User, likes: Like[] })[]) => {
    const decryptedQuotes = quotes.map((quote) => {
        const decryptedContent = cryptr.decrypt(quote.content)
        return { ...quote, content: decryptedContent }
    })
// const decrypt = (quotes: (Quote & { user: User, likes: Like[] })[]) => {
//     const decryptedQuotes = quotes.map((quote) => {
//         const decryptedContent = cryptr.decrypt(quote.content)
//         return { ...quote, content: decryptedContent }
//     })

    return decryptedQuotes
}
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

            const encryptedQuote = cryptr.encrypt(content)
            // const encryptedQuote = cryptr.encrypt(content)

            const quote = await ctx.db.quote.create({
                data: {
                    content: encryptedQuote,
                    // content: encryptedQuote,
                    content,
                    userId: user.id
                }
            })

            return quote
        }),

    getQuotes: publicProcedure
        .query(async ({ ctx }) => {
            const quotes = await ctx.db.quote.findMany({
                include: {
                    user: true,
                    likes: true,
                }
            })

            return decrypt(quotes)
            // return decrypt(quotes)
            return quotes
        }),

    getQuoteByUserId: publicProcedure
        .input(z.object({
            id: z.string()
        }))
        .query(async ({ ctx, input }) => {
            const { id } = input

            const quotes = await ctx.db.quote.findMany({
                where: {
                    userId: id
                },
                include: {
                    user: true,
                    likes: true,
                }
            })

            return decrypt(quotes)
            // return decrypt(quotes)
            return quotes
        }),

    getLikedQuotes: publicProcedure
        .input(z.object({
            userId: z.string()
        }))
        .query(async ({ ctx, input }) => {
            const { userId } = input

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
                }
            })

            const quotes = liked.map((like) => like.quote)

            return decrypt(quotes)
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

            const encryptedQuote = cryptr.encrypt(content)
            // const encryptedQuote = cryptr.encrypt(content)

            const quote = await ctx.db.quote.update({
                where: {
                    id
                },
                data: {
                    content: encryptedQuote
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
