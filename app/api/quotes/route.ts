import { NextResponse } from "next/server"
import { Quote } from "@/drizzle/schema"
import { currentUser } from "@/lib/user"
import { v4 as uuid } from "uuid"
import { db } from "@/drizzle"

export async function POST(req: Request) {
    const user = await currentUser()
    if (!user) return new NextResponse("Unauthorized", { status: 401 })

    const { quote: content } = await req.json()
    if (!content) return new NextResponse("Quote is required", { status: 400 })

    try {
        const quote = await db.insert(Quote).values({
            content,
            userId: user.id,
            id: uuid()

        })

        return NextResponse.json(quote)
    } catch (error) {
        console.log("Create quote error", error)
        return new NextResponse("Create quote error", { status: 500 })
    }
}