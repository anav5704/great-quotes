import { NextResponse } from "next/server"
import { Quote } from "@/drizzle/schema"
import { currentUser } from "@/lib/user"
import { v4 as uuid } from "uuid"
import { db } from "@/drizzle"
import { eq } from "drizzle-orm"

export async function POST(req: Request) {
    const user = await currentUser()
    if (!user) return new NextResponse("Unauthorized", { status: 401 })

    const { content } = await req.json()
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

export async function PATCH(req: Request) {
    const user = await currentUser()
    if (!user) return new NextResponse("Unauthorized", { status: 401 })

    const { id, content } = await req.json()
    if (!id) return new NextResponse("Quote id is required", { status: 400 })
    if (!content) return new NextResponse("Quote is required", { status: 400 })

    try {
        const quote = await db.update(Quote).set({
            content,
            userId: user.id,
        }).where(eq(Quote.id, id))

        return NextResponse.json(quote)
    } catch (error) {
        console.log("Create quote error", error)
        return new NextResponse("Update quote error", { status: 500 })
    }
}

export async function DELETE(req: Request) {
    const user = await currentUser()
    if (!user) return new NextResponse("Unauthorized", { status: 401 })

    const { id } = await req.json()
    if (!id) return new NextResponse("Quote id is required", { status: 400 })

    try {
        const quote = await db.delete(Quote).where(eq(Quote.id, id))

        return NextResponse.json(quote)
    } catch (error) {
        console.log("Create quote error", error)
        return new NextResponse("Delete quote error", { status: 500 })
    }
}