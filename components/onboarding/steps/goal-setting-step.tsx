"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useOnboarding } from "../onboarding-provider"
import { Target, Plus, Trash2, CheckCircle } from "lucide-react"

interface Goal {
  id: string
  title: string
  description: string
  targetValue: string
  unit: string
  targetDate: string
  priority: "high" | "medium" | "low"
}

const pillarInfo = {
  spiritual: { name: "Spiritual", emoji: "🙏", color: "bg-yellow-500" },
  physical: { name: "Physical", emoji: "💪", color: "bg-blue-500" },
  mental: { name: "Mental/Emotional", emoji: "🧠", color: "bg-purple-500" },
  professional: { name: "Professional", emoji: "📈", color: "bg-green-500" },
  family: { name: "Family", emoji: "👨‍👩‍👧‍👦", color: "bg-pink-500" },
  nutrition: { name: "Nutrition", emoji: "🍎", color: "bg-orange-500" },
}

const goalTemplates = {
  spiritual: [
    { title: "Daily Prayer Streak", description: "Maintain consistent daily prayer", targetValue: "100", unit: "days" },
    { title: "Scripture Reading", description: "Read through the Bible", targetValue: "365", unit: "chapters" },
    { title: "Meditation Practice", description: "Daily meditation sessions", targetValue: "30", unit: "minutes" },
  ],
  physical: [
    { title: "Marathon Training", description: "Complete a full marathon", targetValue: "26.2", unit: "miles" },
    { title: "Weight Loss", description: "Reach target weight", targetValue: "20", unit: "lbs" },
    { title: "Strength Building", description: "Increase max bench press", targetValue: "50", unit: "lbs" },
  ],
  mental: [
    { title: "Read Books", description: "Personal development reading", targetValue: "12", unit: "books" },
    { title: "Journaling", description: "Daily reflection practice", targetValue: "365", unit: "entries" },
    { title: "Learn New Skill", description: "Master a new skill", targetValue: "1", unit: "skill" },
  ],
  professional: [
    { title: "Income Increase", description: "Boost monthly income", targetValue: "25", unit: "%" },
    { title: "Skill Certifications", description: "Earn professional certifications", targetValue: "3", unit: "certs" },
    { title: "Network Growth", description: "Expand professional network", targetValue: "50", unit: "contacts" },
  ],
  family: [
    { title: "Quality Time", description: "Daily family time", targetValue: "365", unit: "days" },
    { title: "Family Activities", description: "Plan family outings", targetValue: "24", unit: "activities" },
    { title: "Date Nights", description: "Regular couple time", targetValue: "12", unit: "dates" },
  ],
  nutrition: [
    { title: "Clean Eating", description: "Healthy meal streak", targetValue: "90", unit: "days" },
    { title: "Water Intake", description: "Daily water consumption", targetValue: "8", unit: "glasses" },
    { title: "Meal Prep", description: "Weekly meal preparation", targetValue: "52", unit: "weeks" },
  ],
}

export function GoalSettingStep() {
  const { completeStep } = useOnboarding()
  const [selectedPillars, setSelectedPillars] = useState<string[]>([])
  const [goals, setGoals] = useState<Record<string, Goal[]>>({})
  const [currentPillar, setCurrentPillar] = useState(0)

  useEffect(() => {
    // Load selected pillars from previous step
    const saved = localStorage.getItem("gryt-selected-pillars")
    if (saved) {
      const pillars = JSON.parse(saved)
      setSelectedPillars(pillars)

      // Initialize goals object
      const initialGoals: Record<string, Goal[]> = {}
      pillars.forEach((pillar: string) => {
        initialGoals[pillar] = []
      })
      setGoals(initialGoals)
    }
  }, [])

  const addGoal = (pillarId: string, template?: any) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: template?.title || "",
      description: template?.description || "",
      targetValue: template?.targetValue || "",
      unit: template?.unit || "",
      targetDate: "",
      priority: "medium",
    }

    setGoals((prev) => ({
      ...prev,
      [pillarId]: [...(prev[pillarId] || []), newGoal],
    }))
  }

  const updateGoal = (pillarId: string, goalId: string, field: keyof Goal, value: string) => {
    setGoals((prev) => ({
      ...prev,
      [pillarId]: prev[pillarId].map((goal) => (goal.id === goalId ? { ...goal, [field]: value } : goal)),
    }))
  }

  const removeGoal = (pillarId: string, goalId: string) => {
    setGoals((prev) => ({
      ...prev,
      [pillarId]: prev[pillarId].filter((goal) => goal.id !== goalId),
    }))
  }

  const handleContinue = () => {
    localStorage.setItem("gryt-goals", JSON.stringify(goals))
    completeStep("goal-setting")
  }

  const totalGoals = Object.values(goals).reduce((sum, pillarGoals) => sum + pillarGoals.length, 0)
  const isValidGoalCount = totalGoals >= selectedPillars.length // At least 1 goal per pillar

  if (selectedPillars.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Loading your selected pillars...</p>
      </div>
    )
  }

  const currentPillarId = selectedPillars[currentPillar]
  const pillar = pillarInfo[currentPillarId as keyof typeof pillarInfo]
  const pillarGoals = goals[currentPillarId] || []
  const templates = goalTemplates[currentPillarId as keyof typeof goalTemplates] || []

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="bg-green-500 text-white px-6 py-2 text-lg rounded-full mb-4">🎯 Set Your Goals</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Define Your Transformation Goals
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Set specific, measurable goals for each of your selected life pillars
          </p>
          <div className="flex justify-center space-x-4">
            <Badge className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">📊 {totalGoals} goals created</Badge>
            <Badge className="bg-green-100 text-green-600 px-3 py-1 rounded-full">
              🏛️ {selectedPillars.length} pillars
            </Badge>
          </div>
        </div>

        {/* Pillar Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-gray-100 rounded-2xl p-2">
            {selectedPillars.map((pillarId, index) => {
              const pillarData = pillarInfo[pillarId as keyof typeof pillarInfo]
              const pillarGoalCount = goals[pillarId]?.length || 0

              return (
                <button
                  key={pillarId}
                  onClick={() => setCurrentPillar(index)}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    index === currentPillar ? "bg-white shadow-md text-gray-900" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{pillarData.emoji}</span>
                    <span className="font-medium">{pillarData.name}</span>
                    <Badge className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
                      {pillarGoalCount}
                    </Badge>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Current Pillar Goals */}
        <Card className="rounded-3xl shadow-lg border-0 bg-white mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${pillar.color} rounded-full flex items-center justify-center`}>
                  <span className="text-2xl text-white">{pillar.emoji}</span>
                </div>
                <div>
                  <span className="text-2xl">{pillar.name} Goals</span>
                  <p className="text-sm text-gray-600 font-normal">
                    Set meaningful goals for your {pillar.name.toLowerCase()} transformation
                  </p>
                </div>
              </CardTitle>
              <Button
                onClick={() => addGoal(currentPillarId)}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-2xl"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Goal
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {/* Goal Templates */}
            {pillarGoals.length === 0 && (
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">💡 Popular {pillar.name} Goals:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {templates.map((template, index) => (
                    <Card
                      key={index}
                      className="rounded-2xl shadow-sm border border-gray-200 cursor-pointer hover:border-green-500 transition-colors"
                      onClick={() => addGoal(currentPillarId, template)}
                    >
                      <CardContent className="p-4">
                        <h5 className="font-medium text-gray-900 mb-1">{template.title}</h5>
                        <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                            Target: {template.targetValue} {template.unit}
                          </Badge>
                          <Plus className="h-4 w-4 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Existing Goals */}
            <div className="space-y-4">
              {pillarGoals.map((goal) => (
                <Card key={goal.id} className="rounded-2xl shadow-sm border border-gray-200">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Goal Title *</label>
                        <Input
                          placeholder="Enter goal title"
                          value={goal.title}
                          onChange={(e) => updateGoal(currentPillarId, goal.id, "title", e.target.value)}
                          className="rounded-xl border-2 border-gray-200 focus:border-green-500"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Target Value *</label>
                          <Input
                            placeholder="100"
                            value={goal.targetValue}
                            onChange={(e) => updateGoal(currentPillarId, goal.id, "targetValue", e.target.value)}
                            className="rounded-xl border-2 border-gray-200 focus:border-green-500"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                          <Input
                            placeholder="days, lbs, books"
                            value={goal.unit}
                            onChange={(e) => updateGoal(currentPillarId, goal.id, "unit", e.target.value)}
                            className="rounded-xl border-2 border-gray-200 focus:border-green-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <Textarea
                        placeholder="Describe your goal and why it's important to you..."
                        value={goal.description}
                        onChange={(e) => updateGoal(currentPillarId, goal.id, "description", e.target.value)}
                        className="rounded-xl border-2 border-gray-200 focus:border-green-500"
                      />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex space-x-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Target Date</label>
                          <Input
                            type="date"
                            value={goal.targetDate}
                            onChange={(e) => updateGoal(currentPillarId, goal.id, "targetDate", e.target.value)}
                            className="rounded-xl border-2 border-gray-200 focus:border-green-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                          <select
                            value={goal.priority}
                            onChange={(e) => updateGoal(currentPillarId, goal.id, "priority", e.target.value)}
                            className="rounded-xl border-2 border-gray-200 focus:border-green-500 px-3 py-2"
                          >
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                          </select>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeGoal(currentPillarId, goal.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {pillarGoals.length === 0 && (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No goals set for {pillar.name} yet</p>
                  <Button
                    onClick={() => addGoal(currentPillarId)}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-2xl"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Goal
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Progress Summary */}
        <Card className="rounded-3xl shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50 mb-8">
          <CardContent className="p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
              Goal Setting Progress
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedPillars.map((pillarId) => {
                const pillarData = pillarInfo[pillarId as keyof typeof pillarInfo]
                const goalCount = goals[pillarId]?.length || 0

                return (
                  <div key={pillarId} className="flex items-center space-x-3 p-3 bg-white rounded-2xl">
                    <span className="text-2xl">{pillarData.emoji}</span>
                    <div>
                      <div className="font-medium text-gray-900">{pillarData.name}</div>
                      <div className="text-sm text-gray-600">
                        {goalCount} goal{goalCount !== 1 ? "s" : ""} set
                      </div>
                    </div>
                    {goalCount > 0 && <CheckCircle className="h-5 w-5 text-green-500" />}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Continue button */}
        <div className="text-center">
          <Button
            onClick={handleContinue}
            disabled={!isValidGoalCount}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-12 py-6 text-xl rounded-2xl shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isValidGoalCount ? "🎯 Continue to Dashboard Tour" : "📝 Set at least 1 goal per pillar"}
          </Button>
          <p className="text-sm text-gray-500 mt-3">
            {isValidGoalCount
              ? `Excellent! You've set ${totalGoals} goals across ${selectedPillars.length} pillars`
              : "Add at least one goal for each selected pillar to continue"}
          </p>
        </div>
      </div>
    </div>
  )
}
