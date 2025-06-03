"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Sparkles, X, Trophy, Crown } from "lucide-react"
import { CelebrationAnimation } from "./celebration-animation"
import { cn } from "@/lib/utils"

interface Achievement {
  id: string
  name: string
  description: string
  icon: any
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond"
  xp: number
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface AchievementUnlockSequenceProps {
  achievement: Achievement
  onClose: () => void
}

export function AchievementUnlockSequence({ achievement, onClose }: AchievementUnlockSequenceProps) {
  const [phase, setPhase] = useState<"celebration" | "reveal" | "details">("celebration")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    // Sequence timing
    const revealTimer = setTimeout(() => setPhase("reveal"), 2000)
    const detailsTimer = setTimeout(() => setPhase("details"), 4000)

    return () => {
      clearTimeout(revealTimer)
      clearTimeout(detailsTimer)
    }
  }, [])

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "bronze":
        return "from-amber-600 to-amber-800"
      case "silver":
        return "from-gray-400 to-gray-600"
      case "gold":
        return "from-yellow-400 to-yellow-600"
      case "platinum":
        return "from-purple-400 to-purple-600"
      case "diamond":
        return "from-blue-400 to-cyan-400"
      default:
        return "from-gray-300 to-gray-500"
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-600 bg-gray-100"
      case "rare":
        return "text-blue-600 bg-blue-100"
      case "epic":
        return "text-purple-600 bg-purple-100"
      case "legendary":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  const IconComponent = achievement.icon

  return (
    <>
      {/* Celebration Animation */}
      <CelebrationAnimation
        isActive={phase === "celebration"}
        tier={achievement.tier}
        onComplete={() => setPhase("reveal")}
      />

      {/* Achievement Reveal Card */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all duration-500",
          isVisible ? "opacity-100" : "opacity-0",
        )}
      >
        <Card
          className={cn(
            "max-w-md w-full rounded-3xl shadow-2xl border-0 overflow-hidden transform transition-all duration-700",
            phase === "celebration" && "scale-0 opacity-0",
            phase === "reveal" && "scale-110 opacity-100 animate-achievement-reveal",
            phase === "details" && "scale-100 opacity-100",
          )}
        >
          {/* Tier indicator bar with animation */}
          <div className={cn("h-3 bg-gradient-to-r animate-tier-glow", getTierColor(achievement.tier))}></div>

          <CardContent className="p-8 bg-gradient-to-br from-yellow-50 to-orange-50 relative overflow-hidden">
            {/* Background sparkles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <Sparkles
                  key={i}
                  className={cn(
                    "absolute text-yellow-300 animate-float opacity-30",
                    i % 2 === 0 ? "h-4 w-4" : "h-3 w-3",
                  )}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${3 + Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>

            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="absolute top-4 right-4 h-8 w-8 p-0 rounded-full z-10"
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Achievement content */}
            <div className="text-center relative z-10">
              {/* Achievement icon with animation */}
              <div className="flex justify-center mb-6">
                <div
                  className={cn(
                    "w-24 h-24 rounded-full flex items-center justify-center shadow-2xl",
                    "bg-gradient-to-br",
                    getTierColor(achievement.tier),
                    phase === "reveal" && "animate-achievement-icon-bounce",
                  )}
                >
                  <IconComponent className="h-12 w-12 text-white" />
                </div>
              </div>

              {/* Achievement unlocked badge */}
              <Badge className="bg-green-500 text-white px-4 py-2 rounded-full text-lg mb-4 animate-badge-slide">
                🎉 Achievement Unlocked!
              </Badge>

              {/* Achievement name */}
              <h2
                className={cn("text-3xl font-bold text-gray-900 mb-3", phase === "details" && "animate-text-reveal")}
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {achievement.name}
              </h2>

              {/* Achievement description */}
              <p
                className={cn(
                  "text-lg text-gray-700 mb-6 leading-relaxed",
                  phase === "details" && "animate-text-reveal",
                )}
                style={{ animationDelay: "0.2s" }}
              >
                {achievement.description}
              </p>

              {/* Achievement details */}
              <div
                className={cn(
                  "flex items-center justify-center space-x-4 mb-6",
                  phase === "details" && "animate-text-reveal",
                )}
                style={{ animationDelay: "0.4s" }}
              >
                <Badge className={cn("px-3 py-1 rounded-full text-sm", getRarityColor(achievement.rarity))}>
                  {achievement.rarity.toUpperCase()}
                </Badge>
                <Badge
                  className={cn(
                    "px-3 py-1 rounded-full text-sm text-white bg-gradient-to-r",
                    getTierColor(achievement.tier),
                  )}
                >
                  {achievement.tier.toUpperCase()}
                </Badge>
              </div>

              {/* XP reward */}
              <div
                className={cn(
                  "flex items-center justify-center space-x-2 mb-6",
                  phase === "details" && "animate-xp-counter",
                )}
                style={{ animationDelay: "0.6s" }}
              >
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-3">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">+{achievement.xp} XP</div>
                  <div className="text-sm text-gray-600">Experience Points</div>
                </div>
              </div>

              {/* Action button */}
              <Button
                onClick={handleClose}
                className={cn(
                  "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600",
                  "text-white px-8 py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all",
                  phase === "details" && "animate-button-appear",
                )}
                style={{ animationDelay: "0.8s" }}
              >
                🎯 Continue Journey
              </Button>
            </div>

            {/* Floating achievement symbols */}
            <div className="absolute -top-4 -right-4 animate-float">
              <Trophy className="h-8 w-8 text-yellow-400 opacity-60" />
            </div>
            <div className="absolute -bottom-4 -left-4 animate-float" style={{ animationDelay: "1s" }}>
              <Crown className="h-6 w-6 text-purple-400 opacity-60" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
