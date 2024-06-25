import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { User } from "@/drizzle/schema"
import { and, eq } from "drizzle-orm"
import { v4 as uuid } from "uuid"
import NextAuth from "next-auth"
import { db } from "@/drizzle"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials) throw Error("Invalid username or password")

                const user = await db.query.User.findFirst({
                    // @ts-ignore
                    where: eq(User.email, credentials?.email)
                })

                return {
                    id: user?.id,
                    name: user?.name,
                    email: user?.email,
                }
            }
        })
    ],
    callbacks: {
        async session({ session }) {
            try {
                if (!session.user.name) throw Error("Name is required")
                if (!session.user.email) throw Error("Email is required")

                const user = await db.query.User.findFirst({
                    where: and(
                        eq(User.email, session?.user?.email),
                        eq(User.name, session?.user?.name)
                    )
                })

                if (!user) {
                    await db.insert(User).values({
                        id: uuid(),
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