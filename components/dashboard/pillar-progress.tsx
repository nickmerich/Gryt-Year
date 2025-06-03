"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Church, Brain, User, TrendingUp, Users, Apple, Flame, Star, Plus, CheckCircle } from "lucide-react"

interface PillarData {
  name: string
  icon: any
  color: string
  bgColor: string
  emoji: string
  currentStreak: number
  longestStreak: number
  weeklyProgress: number
  monthlyProgress: number
  totalXP: number
  level: number
  goals: Array<{
    title: string
    progress: number
    target: string
    unit: string
  }>
  todayActivities: Array<{
    name: string
    completed: boolean
    xp: number
  }>
}

const pillarData: PillarData[] = [
  {
    name: "Spiritual",
    icon: Church,
    color: "bg-yellow-500",
    bgColor: "bg-yellow-100",
    emoji: "🙏",
    currentStreak: 45,
    longestStreak: 45,
    weeklyProgress: 95,
    monthlyProgress: 88,
    totalXP: 2250,
    level: 8,
    goals: [
      { title: "Daily Prayer", progress: 100, target: "100", unit: "days" },
      { title: "Scripture Reading", progress: 67, target: "365", unit: "verses" },
    ],
    todayActivities: [
      { name: "Morning Prayer", completed: true, xp: 10 },
      { name: "Scripture Study", completed: true, xp: 15 },
      { name: "Evening Reflection", completed: false, xp: 10 },
    ],
  },
  {
    name: "Physical",
    icon: User,
    color: "bg-blue-500",
    bgColor: "bg-blue-100",
    emoji: "💪",
    currentStreak: 21,
    longestStreak: 28,
    weeklyProgress: 85,
    monthlyProgress: 78,
    totalXP: 1890,
    level: 6,
    goals: [
      { title: "Marathon Training", progress: 70, target: "26.2", unit: "miles" },
      { title: "Strength Building", progress: 45, target: "50", unit: "lbs increase" },
    ],
    todayActivities: [
      { name: "Morning Run", completed: true, xp: 20 },
      { name: "Strength Training", completed: false, xp: 25 },
      { name: "Stretching", completed: true, xp: 5 },
    ],
  },
  {
    name: "Mental",
    icon: Brain,
    color: "bg-purple-500",
    bgColor: "bg-purple-100",
    emoji: "🧠",
    currentStreak: 14,
    longestStreak: 21,
    weeklyProgress: 75,
    monthlyProgress: 82,
    totalXP: 1560,
    level: 5,
    goals: [
      { title: "Meditation Practice", progress: 67, target: "100", unit: "sessions" },
      { title: "Reading Books", progress: 33, target: "12", unit: "books" },
    ],
    todayActivities: [
      { name: "Morning Meditation", completed: true, xp: 15 },
      { name: "Journaling", completed: true, xp: 10 },
      { name: "Learning Session", completed: false, xp: 20 },
    ],
  },
  {
    name: "Professional",
    icon: TrendingUp,
    color: "bg-green-500",
    bgColor: "bg-green-100",
    emoji: "📈",
    currentStreak: 7,
    longestStreak: 12,
    weeklyProgress: 60,
    monthlyProgress: 65,
    totalXP: 980,
    level: 4,
    goals: [
      { title: "Revenue Growth", progress: 60, target: "25", unit: "% increase" },
      { title: "Skill Certifications", progress: 40, target: "5", unit: "certs" },
    ],
    todayActivities: [
      { name: "Skill Development", completed: false, xp: 25 },
      { name: "Network Building", completed: true, xp: 15 },
      { name: "Goal Review", completed: true, xp: 10 },
    ],
  },
  {
    name: "Family",
    icon: Users,
    color: "bg-pink-500",
    bgColor: "bg-pink-100",
    emoji: "👨‍👩‍👧‍👦",
    currentStreak: 30,
    longestStreak: 30,
    weeklyProgress: 100,
    monthlyProgress: 95,
    totalXP: 1800,
    level: 7,
    goals: [
      { title: "Quality Time", progress: 82, target: "365", unit: "days" },
      { title: "Family Activities", progress: 55, target: "100", unit: "activities" },
    ],
    todayActivities: [
      { name: "Family Breakfast", completed: true, xp: 10 },
      { name: "Evening Chat", completed: true, xp: 10 },
      { name: "Family Game", completed: false, xp: 15 },
    ],
  },
  {
    name: "Nutrition",
    icon: Apple,
    color: "bg-orange-500",
    bgColor: "bg-orange-100",
    emoji: "🍎",
    currentStreak: 8,
    longestStreak: 15,
    weeklyProgress: 70,
    monthlyProgress: 68,
    totalXP: 720,
    level: 3,
    goals: [
      { title: "Clean Eating", progress: 24, target: "90", unit: "days" },
      { title: "Water Intake", progress: 85, target: "8", unit: "glasses/day" },
    ],
    todayActivities: [
      { name: "Healthy Breakfast", completed: true, xp: 5 },
      { name: "Water Goal", completed: true, xp: 5 },
      { name: "Meal Prep", completed: false, xp: 10 },
    ],
  },
]

interface PillarProgressProps {
  isPreview?: boolean
}

export function PillarProgress({ isPreview = false }: PillarProgressProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {pillarData.map((pillar, index) => (
        <Card key={index} className="rounded-3xl shadow-lg border-0 bg-white overflow-hidden">
          {/* Header with progress bar */}
          <div className={`h-3 ${pillar.color}`}></div>

          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{pillar.emoji}</div>
                <div>
                  <CardTitle className="text-xl">{pillar.name}</CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className={`${pillar.color} text-white rounded-full px-2 py-1 text-xs`}>
                      Level {pillar.level}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Flame className="h-4 w-4 text-orange-500" />
                      <span className="text-sm text-gray-600">{pillar.currentStreak} days</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">{pillar.totalXP}</div>
                <div className="text-xs text-gray-500">Total XP</div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Progress Overview */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-2xl">
                <div className="text-sm font-medium text-gray-700 mb-1">Weekly</div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">{pillar.weeklyProgress}%</span>
                  <Progress value={pillar.weeklyProgress} className="w-16 h-2" />
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl">
                <div className="text-sm font-medium text-gray-700 mb-1">Monthly</div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">{pillar.monthlyProgress}%</span>
                  <Progress value={pillar.monthlyProgress} className="w-16 h-2" />
                </div>
              </div>
            </div>

            {/* Goals */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">Active Goals</h4>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-full">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3">
                {pillar.goals.map((goal, goalIndex) => (
                  <div key={goalIndex} className="p-3 bg-gray-50 rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{goal.title}</span>
                      <span className="text-xs text-gray-500">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2 mb-1" />
                    <div className="text-xs text-gray-500">
                      Target: {goal.target} {goal.unit}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Activities */}
            {!isPreview && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Today's Activities</h4>
                <div className="space-y-2">
                  {pillar.todayActivities.map((activity, actIndex) => (
                    <div key={actIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            activity.completed ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          {activity.completed && <CheckCircle className="h-3 w-3 text-white" />}
                        </div>
                        <span className={`text-sm ${activity.completed ? "text-gray-900" : "text-gray-500"}`}>
                          {activity.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="text-xs font-bold text-gray-600">+{activity.xp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Streak Info */}
            <div className="p-3 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-700">Current Streak</div>
                  <div className="text-2xl font-bold text-orange-600">{pillar.currentStreak} days</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Best: {pillar.longestStreak} days</div>
                  <Flame className="h-8 w-8 text-orange-500 mx-auto mt-1" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
