"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, TrendingUp } from "lucide-react"

interface ReflectionReminderProps {
  weekNumber: number
  daysUntilReflection: number
  lastReflectionDate?: string
  className?: string
}

export function ReflectionReminder({
  weekNumber,
  daysUntilReflection,
  lastReflectionDate,
  className,
}: ReflectionReminderProps) {
  const isReflectionDue = daysUntilReflection <= 0

  return (
    <Card
      className={`rounded-3xl shadow-lg border-0 ${
        isReflectionDue
          ? "bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200"
          : "bg-gradient-to-br from-gray-50 to-blue-50"
      } ${className}`}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isReflectionDue ? "bg-purple-100" : "bg-blue-100"
              }`}
            >
              <Calendar className={`h-6 w-6 ${isReflectionDue ? "text-purple-600" : "text-blue-600"}`} />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-bold text-gray-900">Weekly Reflection</h3>
                {isReflectionDue && <Badge className="bg-purple-500 text-white text-xs">Due Now</Badge>}
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>Week {weekNumber}</span>
                </div>
                {!isReflectionDue && (
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{daysUntilReflection} days remaining</span>
                  </div>
                )}
                {lastReflectionDate && <span>Last: {lastReflectionDate}</span>}
              </div>
            </div>
          </div>

          <Button
            className={`rounded-2xl ${
              isReflectionDue
                ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            disabled={!isReflectionDue}
          >
            {isReflectionDue ? "Start Reflection" : "Coming Soon"}
          </Button>
        </div>

        {isReflectionDue && (
          <div className="mt-4 p-3 bg-purple-100 rounded-2xl">
            <p className="text-sm text-purple-700">
              🎯 Time to reflect on your progress! Review your habit data, celebrate wins, and plan improvements for
              next week.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
