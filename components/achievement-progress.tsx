"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target } from "lucide-react"

interface AchievementProgressProps {
  title: string
  achievements: Array<{
    name: string
    progress: number
    maxProgress: number
    xp: number
    unlocked: boolean
  }>
}

export function AchievementProgress({ title, achievements }: AchievementProgressProps) {
  const totalProgress = achievements.reduce((sum, a) => sum + (a.unlocked ? a.maxProgress : a.progress), 0)
  const totalMax = achievements.reduce((sum, a) => sum + a.maxProgress, 0)
  const overallProgress = (totalProgress / totalMax) * 100

  return (
    <Card className="rounded-3xl shadow-lg border-0 bg-white">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-blue-600" />
          <span>{title}</span>
          <Badge className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
            {Math.round(overallProgress)}%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Overall Progress</span>
              <span className="text-sm text-gray-600">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3 rounded-full" />
          </div>

          {achievements.map((achievement, index) => {
            const progressPercentage = (achievement.progress / achievement.maxProgress) * 100
            return (
              <div key={index} className="p-3 bg-gray-50 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm font-medium ${achievement.unlocked ? "text-green-600" : "text-gray-700"}`}>
                    {achievement.name}
                  </span>
                  <div className="flex items-center space-x-2">
                    {achievement.unlocked && (
                      <Badge className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">✓</Badge>
                    )}
                    <span className="text-xs text-gray-500">+{achievement.xp} XP</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500">
                    {achievement.progress} / {achievement.maxProgress}
                  </span>
                  <span className="text-xs text-gray-500">{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2 rounded-full" />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
