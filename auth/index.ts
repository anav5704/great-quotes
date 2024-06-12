import { db } from "@/drizzle"
import { User } from "@/drizzle/schema"
import { and, eq } from "drizzle-orm"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })],
    callbacks: {
        async session({ session }) {
            try {
                if (!session.user.name) throw Error("Name is required")
                if (!session.user.email) throw Error("Email is required")
                if (!session.user.image) throw Error("Image is required")

                const user = await db.query.User.findFirst({
                    where: and(
                        eq(User.email, session?.user?.email),
                        eq(User.name, session?.user?.name)
                    )
                })

                if (!user) {
                    await db.insert(User).values({
                        name: session?.user?.name,
                        email: session?.user?.email,
                    })
                }

            } catch (error) {
                console.log("Auth error: ", error)
            } finally {
                return session
            }
        }
    },
})