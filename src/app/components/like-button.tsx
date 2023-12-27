"use client"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import { Heart } from 'lucide-react'
import { api } from '~/trpc/react'

interface LikeButtonProps {
    quoteId: string,
    isLiked: boolean
}

export const LikeButton = ({ quoteId, isLiked }: LikeButtonProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [liked, setLiked] = useState<boolean>(false)
    const router = useRouter()

    const { mutate: toggleLike } = api.quote.toggleLike.useMutation({
        onSuccess: () => {
            setIsLoading(false)
            setLiked(prev => !prev)
        },
        onError: () => {
            setLiked(prev => !liked)
        }
    })

    useEffect(() => {
            isLiked && setLiked(isLiked)
    }, [isLiked])

    const handleLike = () => {
        setIsLoading(true)
        toggleLike({ quoteId })
    }

    return (
        <Button isLoading={isLoading} onClick={handleLike} isIconOnly className="opacity-0 group-hover:opacity-100 transition" aria-label="Like">
            <Heart fill={liked ? "white" : "transparent"} className="h-5 w-5 transition" />
        </Button>
    )
}
