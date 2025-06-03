"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, Calendar, TrendingUp, Plus, Edit, CheckCircle, Star } from "lucide-react"

interface Goal {
  id: string
  title: string
  description: string
  pillar: string
  targetValue: number
  currentValue: number
  unit: string
  targetDate: string
  status: "active" | "completed" | "paused"
  priority: "high" | "medium" | "low"
  xpReward: number
}

const sampleGoals: Goal[] = [
  {
    id: "1",
    title: "Marathon Training",
    description: "Complete a full marathon distance",
    pillar: "Physical",
    targetValue: 26.2,
    currentValue: 18.5,
    unit: "miles",
    targetDate: "2024-06-01",
    status: "active",
    priority: "high",
    xpReward: 2000,
  },
  {
    id: "2",
    title: "Daily Prayer Streak",
    description: "Maintain consistent daily prayer practice",
    pillar: "Spiritual",
    targetValue: 100,
    currentValue: 45,
    unit: "days",
    targetDate: "2024-04-01",
    status: "active",
    priority: "high",
    xpReward: 1500,
  },
  {
    id: "3",
    title: "Revenue Growth",
    description: "Increase monthly income significantly",
    pillar: "Professional",
    targetValue: 25,
    currentValue: 15,
    unit: "% increase",
    targetDate: "2024-12-31",
    status: "active",
    priority: "medium",
    xpReward: 3000,
  },
  {
    id: "4",
    title: "Meditation Practice",
    description: "Build a consistent meditation habit",
    pillar: "Mental",
    targetValue: 100,
    currentValue: 67,
    unit: "sessions",
    targetDate: "2024-08-01",
    status: "active",
    priority: "medium",
    xpReward: 1200,
  },
  {
    id: "5",
    title: "Family Quality Time",
    description: "Spend meaningful time with family daily",
    pillar: "Family",
    targetValue: 365,
    currentValue: 120,
    unit: "days",
    targetDate: "2024-12-31",
    status: "active",
    priority: "high",
    xpReward: 1800,
  },
  {
    id: "6",
    title: "Clean Eating Challenge",
    description: "Maintain healthy eating habits",
    pillar: "Nutrition",
    targetValue: 90,
    currentValue: 22,
    unit: "days",
    targetDate: "2024-05-01",
    status: "active",
    priority: "medium",
    xpReward: 900,
  },
]

const getPillarColor = (pillar: string) => {
  const colors: Record<string, string> = {
    Spiritual: "bg-yellow-500",
    Physical: "bg-blue-500",
    Mental: "bg-purple-500",
    Professional: "bg-green-500",
    Family: "bg-pink-500",
    Nutrition: "bg-orange-500",
  }
  return colors[pillar] || "bg-gray-500"
}

const getPriorityColor = (priority: string) => {
  const colors: Record<string, string> = {
    high: "bg-red-100 text-red-600",
    medium: "bg-yellow-100 text-yellow-600",
    low: "bg-green-100 text-green-600",
  }
  return colors[priority] || "bg-gray-100 text-gray-600"
}

const getDaysUntilTarget = (targetDate: string) => {
  const target = new Date(targetDate)
  const today = new Date()
  const diffTime = target.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

interface GoalTrackerProps {
  isPreview?: boolean
}

export function GoalTracker({ isPreview = false }: GoalTrackerProps) {
  const [selectedTab, setSelectedTab] = useState("all")

  const filteredGoals = selectedTab === "all" ? sampleGoals : sampleGoals.filter((goal) => goal.status === selectedTab)

  const completedGoals = sampleGoals.filter((goal) => goal.status === "completed").length
  const activeGoals = sampleGoals.filter((goal) => goal.status === "active").length
  const totalXP = sampleGoals.reduce((sum, goal) => sum + (goal.status === "completed" ? goal.xpReward : 0), 0)

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="rounded-3xl shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{activeGoals}</div>
            <div className="text-sm text-gray-600">Active Goals</div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{completedGoals}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6 text-center">
            <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{totalXP.toLocaleString()}</div>
            <div className="text-sm text-gray-600">XP Earned</div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-lg border-0 bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">
              {Math.round((completedGoals / sampleGoals.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Goals List */}
      <Card className="rounded-3xl shadow-lg border-0 bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">🎯 Goal Tracker</CardTitle>
            {!isPreview && (
              <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-2xl">
                <Plus className="h-4 w-4 mr-2" />
                Add Goal
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-4 rounded-2xl bg-gray-100 p-1">
              <TabsTrigger value="all" className="rounded-xl">
                All Goals
              </TabsTrigger>
              <TabsTrigger value="active" className="rounded-xl">
                Active
              </TabsTrigger>
              <TabsTrigger value="completed" className="rounded-xl">
                Completed
              </TabsTrigger>
              <TabsTrigger value="paused" className="rounded-xl">
                Paused
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredGoals.map((goal) => {
              const progress = (goal.currentValue / goal.targetValue) * 100
              const daysLeft = getDaysUntilTarget(goal.targetDate)

              return (
                <Card key={goal.id} className="rounded-3xl shadow-md border-0 bg-gray-50 overflow-hidden">
                  <div className={`h-2 ${getPillarColor(goal.pillar)}`}></div>

                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{goal.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{goal.description}</p>

                        <div className="flex items-center space-x-2 mb-3">
                          <Badge className={`${getPillarColor(goal.pillar)} text-white rounded-full px-2 py-1 text-xs`}>
                            {goal.pillar}
                          </Badge>
                          <Badge className={`${getPriorityColor(goal.priority)} rounded-full px-2 py-1 text-xs`}>
                            {goal.priority} priority
                          </Badge>
                        </div>
                      </div>

                      {!isPreview && (
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm text-gray-600">
                          {goal.currentValue} / {goal.targetValue} {goal.unit}
                        </span>
                      </div>
                      <Progress value={progress} className="h-3 rounded-full mb-1" />
                      <div className="text-xs text-gray-500">{Math.round(progress)}% complete</div>
                    </div>

                    {/* Timeline & Reward */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2 p-3 bg-white rounded-2xl">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <div>
                          <div className="text-xs text-gray-500">Target Date</div>
                          <div className="text-sm font-medium text-gray-900">
                            {daysLeft > 0 ? `${daysLeft} days left` : "Overdue"}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 p-3 bg-white rounded-2xl">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <div>
                          <div className="text-xs text-gray-500">XP Reward</div>
                          <div className="text-sm font-medium text-gray-900">{goal.xpReward.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>

                    {/* Status indicator */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            goal.status === "active"
                              ? "bg-green-500"
                              : goal.status === "completed"
                                ? "bg-blue-500"
                                : "bg-gray-400"
                          }`}
                        ></div>
                        <span className="text-sm text-gray-600 capitalize">{goal.status}</span>
                      </div>

                      {progress >= 100 && goal.status === "active" && (
                        <Badge className="bg-green-500 text-white rounded-full px-3 py-1 text-xs animate-pulse">
                          🎉 Ready to Complete!
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
