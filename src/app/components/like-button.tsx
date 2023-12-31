"use client"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import { Heart } from 'lucide-react'
import { api } from '~/trpc/react'

interface LikeButtonProps {
    quoteId: string,
    isLiked: boolean,
    likeCount: number
}

export const LikeButton = ({ quoteId, isLiked, likeCount }: LikeButtonProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [liked, setLiked] = useState<boolean>(false)
    const [likes, setLikes] = useState<number>(0)
    const router = useRouter()

    const { mutate: toggleLike } = api.quote.toggleLike.useMutation({
        onSuccess: () => {
            setIsLoading(false)
            setLiked(prev => !prev)
            liked ? setLikes(prev => prev - 1) : setLikes(prev => prev + 1)
            router.refresh()
        },
    })

    useEffect(() => {
            isLiked && setLiked(isLiked)
            likeCount && setLikes(likeCount)
    }, [setLikes, setLiked, isLiked, likeCount])

    const handleLike = () => {
        setIsLoading(true)
        toggleLike({ quoteId })
    }

    return (
        <Button isIconOnly={likes ===  0} isLoading={isLoading} onClick={handleLike} className="md:opacity-0 group-hover:opacity-100 transition" aria-label="Like"> 
            {!isLoading && ( <Heart fill={liked ? "white" : "transparent"} className="h-5 w-5 transition" /> )}
            {likes > 0 && <p className='ml-2'>{likes}</p> }
        </Button>
    )
}
