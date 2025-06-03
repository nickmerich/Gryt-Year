"use client"

import { cn } from "@/lib/utils"
import { Compass } from "lucide-react"

interface GuideSymbolProps {
  variant?: "hero" | "chat" | "onboarding" | "dashboard" | "icon"
  className?: string
  showMessage?: boolean
  message?: string
}

export function GuideSymbol({
  variant = "chat",
  className,
  showMessage = false,
  message = "I'm here to guide you on your journey!",
}: GuideSymbolProps) {
  const getSizeClasses = () => {
    switch (variant) {
      case "hero":
        return "w-32 h-32"
      case "onboarding":
        return "w-24 h-24"
      case "dashboard":
        return "w-16 h-16"
      case "icon":
        return "w-8 h-8"
      default:
        return "w-20 h-20"
    }
  }

  const getIconSize = () => {
    switch (variant) {
      case "hero":
        return "h-16 w-16"
      case "onboarding":
        return "h-12 w-12"
      case "dashboard":
        return "h-8 w-8"
      case "icon":
        return "h-4 w-4"
      default:
        return "h-10 w-10"
    }
  }

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div
        className={cn(
          "bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg",
          getSizeClasses(),
        )}
      >
        <Compass className={cn("text-white", getIconSize())} />
      </div>

      {/* Optional message bubble */}
      {showMessage && message && (
        <div className="mt-4 bg-white border border-blue-200 rounded-lg p-3 shadow-lg relative max-w-xs">
          <p className="text-sm text-gray-700">{message}</p>
          {/* Speech bubble arrow */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-blue-200 rotate-45" />
        </div>
      )}
    </div>
  )
}
