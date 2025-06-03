"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Sparkles, Star, Trophy, Crown, Award } from "lucide-react"

interface CelebrationAnimationProps {
  isActive: boolean
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond"
  onComplete?: () => void
}

export function CelebrationAnimation({ isActive, tier, onComplete }: CelebrationAnimationProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [showBurst, setShowBurst] = useState(false)

  useEffect(() => {
    if (isActive) {
      setShowBurst(true)
      setShowConfetti(true)

      const burstTimer = setTimeout(() => setShowBurst(false), 1000)
      const confettiTimer = setTimeout(() => setShowConfetti(false), 3000)
      const completeTimer = setTimeout(() => {
        onComplete?.()
      }, 3500)

      return () => {
        clearTimeout(burstTimer)
        clearTimeout(confettiTimer)
        clearTimeout(completeTimer)
      }
    }
  }, [isActive, onComplete])

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "bronze":
        return "text-amber-500"
      case "silver":
        return "text-gray-400"
      case "gold":
        return "text-yellow-500"
      case "platinum":
        return "text-purple-500"
      case "diamond":
        return "text-blue-400"
      default:
        return "text-yellow-500"
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "bronze":
        return Award
      case "silver":
        return Star
      case "gold":
        return Trophy
      case "platinum":
        return Crown
      case "diamond":
        return Crown
      default:
        return Trophy
    }
  }

  if (!isActive) return null

  const TierIcon = getTierIcon(tier)

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Confetti particles */}
      {showConfetti && (
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "absolute w-2 h-2 rounded-full animate-confetti",
                i % 5 === 0 && "bg-yellow-400",
                i % 5 === 1 && "bg-blue-400",
                i % 5 === 2 && "bg-green-400",
                i % 5 === 3 && "bg-purple-400",
                i % 5 === 4 && "bg-pink-400",
              )}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Star burst effect */}
      {showBurst && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Central icon */}
            <div
              className={cn(
                "w-32 h-32 rounded-full flex items-center justify-center animate-achievement-pop",
                "bg-gradient-to-br from-yellow-400 to-orange-500 shadow-2xl",
              )}
            >
              <TierIcon className={cn("h-16 w-16 text-white animate-bounce")} />
            </div>

            {/* Radiating stars */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-80px)`,
                }}
              >
                <Sparkles
                  className={cn("h-8 w-8 animate-star-burst", getTierColor(tier))}
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              </div>
            ))}

            {/* Expanding rings */}
            <div className="absolute inset-0 rounded-full border-4 border-yellow-400 animate-ring-expand opacity-60" />
            <div
              className="absolute inset-0 rounded-full border-4 border-orange-400 animate-ring-expand opacity-40"
              style={{ animationDelay: "0.2s" }}
            />
            <div
              className="absolute inset-0 rounded-full border-4 border-red-400 animate-ring-expand opacity-20"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
        </div>
      )}

      {/* Floating achievement text */}
      {showBurst && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center animate-achievement-text" style={{ marginTop: "200px" }}>
            <div className="text-4xl font-bold text-white drop-shadow-lg mb-2">🎉 Achievement Unlocked! 🎉</div>
            <div className="text-2xl font-bold text-yellow-300 drop-shadow-lg uppercase tracking-wide">{tier} Tier</div>
          </div>
        </div>
      )}
    </div>
  )
}
