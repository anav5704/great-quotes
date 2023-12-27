"use client"

import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'
import { Heart } from 'lucide-react'
import { api } from '~/trpc/react'
import { useEffect, useState } from 'react'

interface LikeButtonProps {
    quoteId: string,
    isLiked: boolean
}

export const LikeButton = ({ quoteId, isLiked }: LikeButtonProps) => {
    const router = useRouter()

    const { mutate: toggleLike } = api.quote.toggleLike.useMutation({
        onSuccess: () => {
            router.refresh()
        }
    })

    const [liked, setLiked] = useState<boolean>(false)

    useEffect(() => {
            isLiked && setLiked(isLiked)
    }, [isLiked])

    return (
        <Button onClick={() => toggleLike({ quoteId })} isIconOnly className="" aria-label="Like">
            <Heart fill={liked ? "white" : "transparent"} className="h-5 w-5 transition" />
        </Button>
    )
}
