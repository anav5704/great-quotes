"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { Heart } from "lucide-react";
import { useEffect } from "react";

interface LikeCounterProps {
    likes: number
}

export const LikeCounter = ({ likes }: LikeCounterProps) => {
    const count = useMotionValue(0)
    const rounded = useTransform(count, Math.round)

    useEffect(() => {
        const animation = animate(count, likes, { duration: 3 })
        return animation.stop;
    }, []);

    return (
        <div className="text-3xl flex items-center gap-x-3">
            <motion.p>{rounded}</motion.p> <Heart fill="white" className="h-6 w-6" />
        </div>
    )
}
