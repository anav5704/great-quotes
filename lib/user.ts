import { auth } from "@/auth"
import { db } from "@/drizzle"
import { User } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export const currentUser = async () => {
    const session = await auth()

    if (!session?.user?.email) return null

    const user = await db.query.User.findFirst({
        where: eq(User.email, session.user.email),
    })

    return user
}
