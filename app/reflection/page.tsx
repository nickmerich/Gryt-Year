"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Brain,
  Calendar,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Target,
  Lightbulb,
  Star,
  ArrowRight,
  Award,
  BookOpen,
} from "lucide-react"

export default function WeeklyReflection() {
  const [currentStep, setCurrentStep] = useState(0)
  const [reflectionAnswers, setReflectionAnswers] = useState({
    weekPerformance: "",
    challenges: "",
    wins: "",
    adjustments: "",
    nextWeekGoals: "",
  })

  // Mock data for weekly insights
  const weeklyData = {
    weekNumber: 12,
    overallProgress: 78,
    habitsCompleted: 24,
    totalHabits: 35,
    streakDays: 6,
    xpEarned: 850,
    habits: [
      {
        name: "Exercise",
        completionRate: 86,
        trend: "up",
        trendValue: 12,
        insights: "Best performance on weekdays, struggled on weekends",
        source: "Apple Health",
      },
      {
        name: "Reading",
        completionRate: 57,
        trend: "down",
        trendValue: -8,
        insights: "Missed 3 days this week, usually strong in evenings",
        source: "Kindle",
      },
      {
        name: "Nutrition",
        completionRate: 92,
        trend: "up",
        trendValue: 15,
        insights: "Excellent consistency, meal prep strategy working well",
        source: "MyFitnessPal",
      },
      {
        name: "Meditation",
        completionRate: 71,
        trend: "up",
        trendValue: 5,
        insights: "Improving steadily, morning sessions most successful",
        source: "Manual",
      },
    ],
    aiInsights: [
      {
        type: "strength",
        title: "Nutrition Mastery",
        description:
          "Your nutrition habits are incredibly consistent. You've maintained 90%+ completion for 3 weeks straight!",
        icon: Award,
        color: "text-green-500",
        bgColor: "bg-green-50",
      },
      {
        type: "opportunity",
        title: "Reading Optimization",
        description:
          "Your reading habit drops on busy days. Consider shorter 10-minute sessions or audiobooks during commutes.",
        icon: Lightbulb,
        color: "text-orange-500",
        bgColor: "bg-orange-50",
      },
      {
        type: "pattern",
        title: "Weekend Challenge",
        description:
          "Data shows 40% lower completion rates on weekends. Plan specific weekend routines to maintain momentum.",
        icon: BarChart3,
        color: "text-blue-500",
        bgColor: "bg-blue-50",
      },
    ],
  }

  const reflectionQuestions = [
    {
      id: "weekPerformance",
      title: "How did you do this week?",
      subtitle: "Reflect on your overall performance and feelings",
      placeholder: "Think about your energy levels, consistency, challenges you faced, and moments you felt proud...",
      icon: Calendar,
    },
    {
      id: "challenges",
      title: "What were your biggest challenges?",
      subtitle: "Identify obstacles that hindered your progress",
      placeholder: "Consider time constraints, motivation dips, external factors, or specific habit difficulties...",
      icon: Target,
    },
    {
      id: "wins",
      title: "What were your biggest wins?",
      subtitle: "Celebrate your successes, no matter how small",
      placeholder: "Think about habits you maintained, breakthroughs you had, or positive changes you noticed...",
      icon: Star,
    },
    {
      id: "adjustments",
      title: "What adjustments will you make?",
      subtitle: "Based on your data and experience, what will you change?",
      placeholder: "Consider timing changes, habit modifications, new strategies, or support systems you need...",
      icon: TrendingUp,
    },
    {
      id: "nextWeekGoals",
      title: "What are your goals for next week?",
      subtitle: "Set specific, achievable intentions",
      placeholder: "Define 2-3 specific goals that will help you improve based on this week's insights...",
      icon: ArrowRight,
    },
  ]

  const handleAnswerChange = (questionId: string, value: string) => {
    setReflectionAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentStep < reflectionQuestions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Save reflection and redirect
      console.log("Saving reflection:", reflectionAnswers)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentQuestion = reflectionQuestions[currentStep]
  const progress = ((currentStep + 1) / reflectionQuestions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="bg-purple-500 text-white px-6 py-2 text-lg rounded-full mb-4">
            📊 Week {weeklyData.weekNumber} Reflection
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Weekly Reflection & Insights
          </h1>
          <p className="text-xl text-gray-600">Review your progress, celebrate wins, and plan for growth</p>
        </div>

        <Tabs defaultValue="insights" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 rounded-3xl bg-white p-2 shadow-lg">
            <TabsTrigger
              value="insights"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              📊 Data Insights
            </TabsTrigger>
            <TabsTrigger
              value="reflection"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              🤔 Reflection
            </TabsTrigger>
          </TabsList>

          {/* Data Insights Tab */}
          <TabsContent value="insights" className="space-y-8">
            {/* Weekly Overview */}
            <Card className="rounded-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-6 w-6 text-blue-500" />
                  <span>Week {weeklyData.weekNumber} Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{weeklyData.overallProgress}%</div>
                    <div className="text-sm text-gray-600">Overall Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {weeklyData.habitsCompleted}/{weeklyData.totalHabits}
                    </div>
                    <div className="text-sm text-gray-600">Habits Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">{weeklyData.streakDays}</div>
                    <div className="text-sm text-gray-600">Streak Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{weeklyData.xpEarned}</div>
                    <div className="text-sm text-gray-600">XP Earned</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 mb-4">Habit Performance Breakdown</h3>
                  {weeklyData.habits.map((habit, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-2xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-semibold text-gray-900">{habit.name}</h4>
                          <Badge className="bg-gray-100 text-gray-600 text-xs">{habit.source}</Badge>
                          <div className="flex items-center space-x-1">
                            {habit.trend === "up" ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                            <span
                              className={`text-sm font-medium ${
                                habit.trend === "up" ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {habit.trend === "up" ? "+" : ""}
                              {habit.trendValue}%
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">{habit.completionRate}%</div>
                        </div>
                      </div>
                      <Progress value={habit.completionRate} className="h-2 mb-2" />
                      <p className="text-sm text-gray-600">{habit.insights}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="rounded-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-6 w-6 text-purple-500" />
                  <span>AI-Powered Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {weeklyData.aiInsights.map((insight, index) => (
                    <div key={index} className={`p-6 ${insight.bgColor} rounded-3xl`}>
                      <div className="flex items-center space-x-3 mb-4">
                        <insight.icon className={`h-6 w-6 ${insight.color}`} />
                        <h3 className="font-bold text-gray-900">{insight.title}</h3>
                      </div>
                      <p className="text-gray-700">{insight.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reflection Tab */}
          <TabsContent value="reflection" className="space-y-8">
            {/* Progress */}
            <Card className="rounded-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-600">Reflection Progress</span>
                  <span className="text-sm text-gray-600">
                    {currentStep + 1} of {reflectionQuestions.length}
                  </span>
                </div>
                <Progress value={progress} className="h-3 rounded-full" />
              </CardContent>
            </Card>

            {/* Current Question */}
            <Card className="rounded-3xl shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <currentQuestion.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-gray-900">{currentQuestion.title}</CardTitle>
                <p className="text-gray-600">{currentQuestion.subtitle}</p>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="space-y-6">
                  <Textarea
                    placeholder={currentQuestion.placeholder}
                    value={reflectionAnswers[currentQuestion.id as keyof typeof reflectionAnswers]}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    className="min-h-40 rounded-2xl border-2 border-gray-200 focus:border-purple-500 bg-white/80 backdrop-blur-sm"
                  />

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-4">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                      className="rounded-2xl"
                    >
                      Previous
                    </Button>

                    <div className="flex space-x-2">
                      {reflectionQuestions.map((_, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index < currentStep
                              ? "bg-green-500"
                              : index === currentStep
                                ? "bg-purple-500"
                                : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>

                    <Button
                      onClick={handleNext}
                      className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white"
                    >
                      {currentStep === reflectionQuestions.length - 1 ? "Complete Reflection" : "Next"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reflection History */}
            <Card className="rounded-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-6 w-6 text-green-500" />
                  <span>Previous Reflections</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[11, 10, 9].map((week) => (
                    <div
                      key={week}
                      className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">Week {week} Reflection</h4>
                          <p className="text-sm text-gray-600">Completed on {new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-sm text-gray-600">View</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
