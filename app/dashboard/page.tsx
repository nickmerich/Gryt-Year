"use client"

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
  Clock,
  BarChart3,
} from "lucide-react"

export default function Dashboard() {
  const habits = [
    {
      name: "Exercise",
      icon: Activity,
      streak: 12,
      todayComplete: true,
      progress: 85,
      source: "Apple Health",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      name: "Reading",
      icon: BookOpen,
      streak: 8,
      todayComplete: false,
      progress: 60,
      source: "Kindle",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      name: "Nutrition",
      icon: Apple,
      streak: 15,
      todayComplete: true,
      progress: 92,
      source: "MyFitnessPal",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      name: "Meditation",
      icon: Brain,
      streak: 5,
      todayComplete: false,
      progress: 40,
      source: "Manual",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ]

  const weeklyStats = {
    totalHabits: 4,
    completedToday: 2,
    weeklyStreak: 6,
    totalXP: 1250,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Good morning, Alex! 👋</h1>
          <p className="text-xl text-gray-600">Let's make today count. You're on a 6-day streak!</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="rounded-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Today's Progress</p>
                  <p className="text-3xl font-bold text-green-600">
                    {weeklyStats.completedToday}/{weeklyStats.totalHabits}
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
                  <p className="text-3xl font-bold text-orange-600">{weeklyStats.weeklyStreak} days</p>
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
                  <p className="text-3xl font-bold text-purple-600">{weeklyStats.totalXP}</p>
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
                  <p className="text-3xl font-bold text-blue-600">78%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Habits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Habits</h2>
            <div className="space-y-4">
              {habits.map((habit, index) => (
                <Card key={index} className="rounded-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 ${habit.bgColor} rounded-2xl flex items-center justify-center`}>
                          <habit.icon className={`h-6 w-6 ${habit.color}`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{habit.name}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-gray-100 text-gray-600 text-xs">{habit.source}</Badge>
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
                        <Button size="sm" className="rounded-full">
                          Complete
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{habit.progress}%</span>
                      </div>
                      <Progress value={habit.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* AI Guide & Insights */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Guide & Insights</h2>

            {/* AI Message */}
            <Card className="rounded-3xl shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50 mb-6">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Your AI Guide</h3>
                    <p className="text-gray-700 mb-4">
                      Great job on your exercise streak! I noticed you haven't completed your reading habit yet today.
                      Based on your pattern, you usually read best in the evening. Would you like a reminder at 7 PM?
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" className="rounded-full">
                        Set Reminder
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-full">
                        Not Today
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Insights */}
            <Card className="rounded-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  <span>Weekly Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-2xl">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="font-medium text-green-700">Improvement Detected</span>
                    </div>
                    <p className="text-sm text-green-600">
                      Your exercise consistency improved by 25% this week compared to last week!
                    </p>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-2xl">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <span className="font-medium text-orange-700">Timing Insight</span>
                    </div>
                    <p className="text-sm text-orange-600">
                      You complete meditation habits 80% more often when done in the morning.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
