import { getServerAuthSession } from "~/server/auth"
import { db } from "~/server/db"

const currentUser = async () => {
        const session = await getServerAuthSession()
        if(!session?.user?.email) return

        const user = await db.user.findFirst({
            where: {
                email: session?.user?.email
            }
        })

        return user
}