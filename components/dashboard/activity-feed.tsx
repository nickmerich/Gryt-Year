"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Star, Trophy, Flame, CheckCircle, Target, Award, Zap } from "lucide-react"

interface ActivityItem {
  id: string
  type: "achievement" | "goal_progress" | "streak" | "xp_earned" | "milestone"
  title: string
  description: string
  timestamp: string
  xp?: number
  pillar?: string
  icon: any
  color: string
}

const recentActivities: ActivityItem[] = [
  {
    id: "1",
    type: "achievement",
    title: "Prayer Warrior Unlocked!",
    description: "Completed 30 days of daily prayer",
    timestamp: "2 hours ago",
    xp: 500,
    pillar: "Spiritual",
    icon: Trophy,
    color: "text-yellow-600",
  },
  {
    id: "2",
    type: "streak",
    title: "Family Time Streak",
    description: "Reached 30-day family quality time streak",
    timestamp: "4 hours ago",
    pillar: "Family",
    icon: Flame,
    color: "text-orange-600",
  },
  {
    id: "3",
    type: "goal_progress",
    title: "Marathon Training Progress",
    description: "Completed 18.5 miles - 70% to goal",
    timestamp: "1 day ago",
    xp: 25,
    pillar: "Physical",
    icon: Target,
    color: "text-blue-600",
  },
  {
    id: "4",
    type: "xp_earned",
    title: "Daily XP Milestone",
    description: "Earned 100+ XP today across all pillars",
    timestamp: "1 day ago",
    xp: 125,
    icon: Star,
    color: "text-purple-600",
  },
  {
    id: "5",
    type: "milestone",
    title: "Level Up!",
    description: "Reached Level 8 in Spiritual pillar",
    timestamp: "2 days ago",
    pillar: "Spiritual",
    icon: Award,
    color: "text-green-600",
  },
  {
    id: "6",
    type: "achievement",
    title: "Fitness Fanatic",
    description: "Exercised for 21 consecutive days",
    timestamp: "3 days ago",
    xp: 750,
    pillar: "Physical",
    icon: Trophy,
    color: "text-yellow-600",
  },
  {
    id: "7",
    type: "goal_progress",
    title: "Meditation Progress",
    description: "Completed session #67 of 100",
    timestamp: "3 days ago",
    xp: 15,
    pillar: "Mental",
    icon: Target,
    color: "text-purple-600",
  },
  {
    id: "8",
    type: "streak",
    title: "Scripture Reading",
    description: "Maintained 45-day reading streak",
    timestamp: "4 days ago",
    pillar: "Spiritual",
    icon: Flame,
    color: "text-orange-600",
  },
]

const getPillarColor = (pillar?: string) => {
  const colors: Record<string, string> = {
    Spiritual: "bg-yellow-100 text-yellow-600",
    Physical: "bg-blue-100 text-blue-600",
    Mental: "bg-purple-100 text-purple-600",
    Professional: "bg-green-100 text-green-600",
    Family: "bg-pink-100 text-pink-600",
    Nutrition: "bg-orange-100 text-orange-600",
  }
  return colors[pillar || ""] || "bg-gray-100 text-gray-600"
}

const getTypeIcon = (type: string) => {
  const icons: Record<string, any> = {
    achievement: Trophy,
    goal_progress: Target,
    streak: Flame,
    xp_earned: Star,
    milestone: Award,
  }
  return icons[type] || CheckCircle
}

interface ActivityFeedProps {
  isPreview?: boolean
  limit?: number
}

export function ActivityFeed({ isPreview = false, limit }: ActivityFeedProps) {
  const activities = limit ? recentActivities.slice(0, limit) : recentActivities

  return (
    <Card className="rounded-3xl shadow-lg border-0 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center space-x-2">
            <Zap className="h-6 w-6 text-blue-600" />
            <span>🚀 Activity Feed</span>
          </CardTitle>
          {!isPreview && (
            <Button variant="outline" size="sm" className="rounded-2xl">
              View All
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const IconComponent = activity.icon

            return (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-3xl hover:bg-gray-100 transition-colors"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    activity.type === "achievement"
                      ? "bg-yellow-100"
                      : activity.type === "streak"
                        ? "bg-orange-100"
                        : activity.type === "goal_progress"
                          ? "bg-blue-100"
                          : activity.type === "xp_earned"
                            ? "bg-purple-100"
                            : "bg-green-100"
                  }`}
                >
                  <IconComponent className={`h-6 w-6 ${activity.color}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{activity.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{activity.description}</p>

                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{activity.timestamp}</span>
                        </div>

                        {activity.pillar && (
                          <Badge className={`${getPillarColor(activity.pillar)} rounded-full px-2 py-1 text-xs`}>
                            {activity.pillar}
                          </Badge>
                        )}

                        {activity.xp && (
                          <Badge className="bg-yellow-100 text-yellow-600 rounded-full px-2 py-1 text-xs">
                            +{activity.xp} XP
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Type indicator */}
                    <Badge
                      className={`${
                        activity.type === "achievement"
                          ? "bg-yellow-500"
                          : activity.type === "streak"
                            ? "bg-orange-500"
                            : activity.type === "goal_progress"
                              ? "bg-blue-500"
                              : activity.type === "xp_earned"
                                ? "bg-purple-500"
                                : "bg-green-500"
                      } text-white rounded-full px-2 py-1 text-xs`}
                    >
                      {activity.type.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary stats */}
        <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-3xl">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {activities.filter((a) => a.type === "achievement").length}
              </div>
              <div className="text-xs text-gray-600">Achievements</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {activities.reduce((sum, a) => sum + (a.xp || 0), 0)}
              </div>
              <div className="text-xs text-gray-600">Total XP</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {activities.filter((a) => a.type === "streak").length}
              </div>
              <div className="text-xs text-gray-600">Active Streaks</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
