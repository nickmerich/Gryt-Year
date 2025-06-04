"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Activity,
  Apple,
  BookOpen,
  Brain,
  Target,
  Flame,
  Star,
  TrendingUp,
  CheckCircle,
  BarChart3,
  RefreshCw,
  AlertCircle,
  Award,
  Lightbulb,
} from "lucide-react"
import { ReflectionReminder } from "@/components/reflection-reminder"
import { Skeleton } from "@/components/ui/skeleton"
import { type Habit, type Goal, type Sacrifice, type Insight, type PillarType, PILLAR_COLORS } from "@/types"
import { toast } from "@/components/ui/use-toast"

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [dashboardData, setDashboardData] = useState<{
    stats: {
      completedToday: number
      totalHabits: number
      currentStreak: number
      weeklyAverage: number
      totalXp: number
    }
    activeHabits: Habit[]
    activeGoals: Goal[]
    activeSacrifices: Sacrifice[]
    recentInsights: Insight[]
  }>({
    stats: {
      completedToday: 0,
      totalHabits: 0,
      currentStreak: 0,
      weeklyAverage: 0,
      totalXp: 0,
    },
    activeHabits: [],
    activeGoals: [],
    activeSacrifices: [],
    recentInsights: [],
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  async function fetchDashboardData() {
    try {
      setLoading(true)
      const response = await fetch("/api/dashboard")

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data")
      }

      const data = await response.json()
      setDashboardData(data)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function refreshInsights() {
    try {
      setRefreshing(true)
      const response = await fetch("/api/insights", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to generate insights")
      }

      const newInsights = await response.json()

      // Update dashboard with new insights
      setDashboardData((prev) => ({
        ...prev,
        recentInsights: newInsights.slice(0, 3),
      }))

      toast({
        title: "Insights Updated",
        description: `Generated ${newInsights.length} new insights based on your data.`,
      })
    } catch (error) {
      console.error("Error generating insights:", error)
      toast({
        title: "Error",
        description: "Failed to generate new insights. Please try again.",
        variant: "destructive",
      })
    } finally {
      setRefreshing(false)
    }
  }

  async function completeHabit(habitId: string) {
    try {
      const response = await fetch(`/api/habits/${habitId}/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: 1 }),
      })

      if (!response.ok) {
        throw new Error("Failed to complete habit")
      }

      // Update local state
      setDashboardData((prev) => ({
        ...prev,
        stats: {
          ...prev.stats,
          completedToday: prev.stats.completedToday + 1,
        },
        activeHabits: prev.activeHabits.map((habit) =>
          habit.id === habitId ? { ...habit, streak: habit.streak + 1, todayComplete: true } : habit,
        ),
      }))

      toast({
        title: "Habit Completed",
        description: "Great job! Keep up the momentum.",
      })
    } catch (error) {
      console.error("Error completing habit:", error)
      toast({
        title: "Error",
        description: "Failed to mark habit as complete. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getPillarColor = (pillar: PillarType) => {
    return PILLAR_COLORS[pillar] || { bg: "bg-gray-500", text: "text-gray-600", light: "bg-gray-100" }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "strength":
        return Award
      case "opportunity":
        return Lightbulb
      case "pattern":
        return BarChart3
      case "recommendation":
        return Target
      default:
        return Star
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case "strength":
        return "text-green-500 bg-green-50"
      case "opportunity":
        return "text-orange-500 bg-orange-50"
      case "pattern":
        return "text-blue-500 bg-blue-50"
      case "recommendation":
        return "text-purple-500 bg-purple-50"
      default:
        return "text-gray-500 bg-gray-50"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {loading ? <Skeleton className="h-12 w-64" /> : "Good morning, Alex! 👋"}
          </h1>
          <p className="text-xl text-gray-600">
            {loading ? (
              <Skeleton className="h-8 w-96" />
            ) : (
              `Let's make today count. You're on a ${dashboardData.stats.currentStreak}-day streak!`
            )}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {loading ? (
            Array(4)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="rounded-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))
          ) : (
            <>
              <Card className="rounded-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Today's Progress</p>
                      <p className="text-3xl font-bold text-green-600">
                        {dashboardData.stats.completedToday}/{dashboardData.stats.totalHabits}
                      </p>
                    </div>
                    <Target className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Current Streak</p>
                      <p className="text-3xl font-bold text-orange-600">{dashboardData.stats.currentStreak} days</p>
                    </div>
                    <Flame className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total XP</p>
                      <p className="text-3xl font-bold text-purple-600">{dashboardData.stats.totalXp}</p>
                    </div>
                    <Star className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Weekly Avg</p>
                      <p className="text-3xl font-bold text-blue-600">{dashboardData.stats.weeklyAverage}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Weekly Reflection Reminder */}
        <div className="mb-8">
          <ReflectionReminder weekNumber={12} daysUntilReflection={0} lastReflectionDate="Dec 20, 2024" />
        </div>

        {/* Today's Habits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Habits</h2>
            <div className="space-y-4">
              {loading ? (
                Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <Card key={i} className="rounded-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <Skeleton className="h-24 w-full" />
                      </CardContent>
                    </Card>
                  ))
              ) : dashboardData.activeHabits.length > 0 ? (
                dashboardData.activeHabits.map((habit, index) => {
                  const IconComponent =
                    habit.category === "physical"
                      ? Activity
                      : habit.category === "nutrition"
                        ? Apple
                        : habit.category === "mental"
                          ? Brain
                          : BookOpen

                  const pillarColor = getPillarColor(habit.category)

                  return (
                    <Card key={index} className="rounded-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-12 h-12 ${pillarColor.light} rounded-2xl flex items-center justify-center`}
                            >
                              <IconComponent className={`h-6 w-6 ${pillarColor.text}`} />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900">{habit.title}</h3>
                              <div className="flex items-center space-x-2">
                                <Badge className="bg-gray-100 text-gray-600 text-xs">
                                  {habit.integration?.type || "Manual"}
                                </Badge>
                                <div className="flex items-center space-x-1">
                                  <Flame className="h-3 w-3 text-orange-500" />
                                  <span className="text-xs text-gray-600">{habit.streak} day streak</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          {habit.todayComplete ? (
                            <CheckCircle className="h-8 w-8 text-green-500" />
                          ) : (
                            <Button size="sm" className="rounded-full" onClick={() => completeHabit(habit.id)}>
                              Complete
                            </Button>
                          )}
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">
                              {Math.round((habit.streak / (habit.longestStreak || 1)) * 100)}%
                            </span>
                          </div>
                          <Progress
                            value={Math.round((habit.streak / (habit.longestStreak || 1)) * 100)}
                            className="h-2"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              ) : (
                <Card className="rounded-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">No Habits Set Up</h3>
                    <p className="text-gray-600 mb-4">
                      You haven't created any habits yet. Start building your transformation journey by adding habits.
                    </p>
                    <Button className="rounded-full">Add Your First Habit</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* AI Guide & Insights */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">AI Guide & Insights</h2>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full flex items-center gap-2"
                onClick={refreshInsights}
                disabled={refreshing}
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                {refreshing ? "Generating..." : "Refresh Insights"}
              </Button>
            </div>

            {/* AI Message */}
            <Card className="rounded-3xl shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50 mb-6">
              <CardContent className="p-6">
                {loading ? (
                  <Skeleton className="h-32 w-full" />
                ) : (
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">Your AI Guide</h3>
                      <p className="text-gray-700 mb-4">
                        {dashboardData.stats.completedToday === 0
                          ? "Good morning! You haven't completed any habits yet today. Which one would you like to tackle first?"
                          : dashboardData.stats.completedToday < dashboardData.stats.totalHabits
                            ? `Great job on completing ${dashboardData.stats.completedToday} habits today! Just ${
                                dashboardData.stats.totalHabits - dashboardData.stats.completedToday
                              } more to go to maintain your streak.`
                            : "Amazing work! You've completed all your habits for today. Your dedication is inspiring!"}
                      </p>
                      <div className="flex space-x-2">
                        <Button size="sm" className="rounded-full">
                          View All Habits
                        </Button>
                        <Button size="sm" variant="outline" className="rounded-full">
                          Ask Guide
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Insights */}
            <Card className="rounded-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  <span>Weekly Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-4">
                    {Array(2)
                      .fill(0)
                      .map((_, i) => (
                        <Skeleton key={i} className="h-24 w-full" />
                      ))}
                  </div>
                ) : dashboardData.recentInsights.length > 0 ? (
                  <div className="space-y-4">
                    {dashboardData.recentInsights.map((insight, index) => {
                      const InsightIcon = getInsightIcon(insight.type)
                      const insightColor = getInsightColor(insight.type)

                      return (
                        <div key={index} className={`p-4 ${insightColor} rounded-2xl`}>
                          <div className="flex items-center space-x-2 mb-2">
                            <InsightIcon className={`h-4 w-4 ${insightColor.split(" ")[0]}`} />
                            <span className="font-medium text-gray-900">{insight.title}</span>
                          </div>
                          <p className="text-sm text-gray-700">{insight.description}</p>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center p-6">
                    <p className="text-gray-600">
                      No insights available yet. Complete more habits to generate insights.
                    </p>
                    <Button className="mt-4 rounded-full" onClick={refreshInsights} disabled={refreshing}>
                      Generate Insights
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
