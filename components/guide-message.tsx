"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GuideSymbol } from "./guide-symbol"

interface GuideMessageProps {
  message: string
  type?: "motivation" | "reminder" | "encouragement" | "reflection"
  className?: string
}

export function GuideMessage({ message, type = "motivation", className }: GuideMessageProps) {
  const getTypeStyles = () => {
    switch (type) {
      case "motivation":
        return "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
      case "reminder":
        return "bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200"
      case "encouragement":
        return "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
      case "reflection":
        return "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200"
      default:
        return "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
    }
  }

  return (
    <Card className={`${getTypeStyles()} ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <GuideSymbol variant="icon" />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-semibold text-gray-900">Guide</span>
              <span className="text-xs text-gray-500 uppercase tracking-wide">{type}</span>
            </div>
            <p className="text-gray-700 leading-relaxed">{message}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
