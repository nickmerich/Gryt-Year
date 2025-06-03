"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Sparkles, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface AchievementNotificationProps {
  achievement: {
    name: string
    description: string
    tier: string
    xp: number
    icon: any
  }
  onClose: () => void
  onClick?: () => void
}

export function AchievementNotification({ achievement, onClose, onClick }: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Entry animation
    setTimeout(() => setIsVisible(true), 100)
    setTimeout(() => setIsAnimating(true), 200)

    // Auto-close timer
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

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

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  const handleClick = () => {
    if (onClick) {
      onClick()
      handleClose()
    }
  }

  const IconComponent = achievement.icon

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 transform transition-all duration-300 cursor-pointer",
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
      )}
      onClick={handleClick}
    >
      <Card className="rounded-3xl shadow-2xl border-0 bg-gradient-to-br from-yellow-50 to-orange-50 max-w-sm overflow-hidden">
        {/* Animated tier bar */}
        <div className={cn("h-2 bg-gradient-to-r animate-tier-slide", getTierColor(achievement.tier))}></div>

        <CardContent className="p-6 relative overflow-hidden">
          {/* Background sparkles */}
          {isAnimating && (
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <Sparkles
                  key={i}
                  className={cn("absolute text-yellow-300 animate-notification-sparkle opacity-60", "h-3 w-3")}
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          )}

          <div className="flex items-start justify-between mb-4 relative z-10">
            <div className="flex items-center space-x-3">
              <div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center shadow-lg",
                  "bg-gradient-to-br",
                  getTierColor(achievement.tier),
                  isAnimating && "animate-notification-icon",
                )}
              >
                <IconComponent className="h-8 w-8 text-white" />
              </div>
              <div>
                <Badge className="bg-green-500 text-white px-3 py-1 rounded-full text-sm mb-2 animate-badge-bounce">
                  🎉 Achievement!
                </Badge>
                <h3 className={cn("font-bold text-lg text-gray-900", isAnimating && "animate-text-slide")}>
                  {achievement.name}
                </h3>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                handleClose()
              }}
              className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <p className={cn("text-sm text-gray-700 mb-4 relative z-10", isAnimating && "animate-text-slide")}>
            {achievement.description}
          </p>

          <div className="flex items-center justify-between relative z-10">
            <div className={cn("flex items-center space-x-2", isAnimating && "animate-xp-bounce")}>
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Star className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-gray-900">+{achievement.xp} XP</span>
            </div>
            <Badge
              className={cn(
                "px-3 py-1 rounded-full text-xs font-bold uppercase text-white",
                "bg-gradient-to-r",
                getTierColor(achievement.tier),
              )}
            >
              {achievement.tier}
            </Badge>
          </div>

          {/* Celebration elements */}
          <div className="absolute -top-2 -right-2 animate-float">
            <Sparkles className="h-6 w-6 text-yellow-400" />
          </div>
          <div className="absolute -bottom-2 -left-2 animate-float" style={{ animationDelay: "0.5s" }}>
            <Sparkles className="h-4 w-4 text-pink-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
