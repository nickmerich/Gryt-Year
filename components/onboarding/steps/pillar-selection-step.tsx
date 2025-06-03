"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useOnboarding } from "../onboarding-provider"
import { Church, Brain, User, TrendingUp, Users, Apple, CheckCircle } from "lucide-react"

const pillars = [
  {
    id: "spiritual",
    name: "Spiritual",
    emoji: "🙏",
    icon: Church,
    color: "bg-yellow-500",
    bgColor: "bg-yellow-100",
    description: "Prayer, scripture, faith practices, spiritual growth",
    examples: ["Daily prayer", "Scripture reading", "Meditation", "Church attendance"],
    recommended: true,
  },
  {
    id: "physical",
    name: "Physical",
    emoji: "💪",
    icon: User,
    color: "bg-blue-500",
    bgColor: "bg-blue-100",
    description: "Exercise, fitness, health, body transformation",
    examples: ["Daily workouts", "Marathon training", "Strength building", "Healthy habits"],
    recommended: true,
  },
  {
    id: "mental",
    name: "Mental/Emotional",
    emoji: "🧠",
    icon: Brain,
    color: "bg-purple-500",
    bgColor: "bg-purple-100",
    description: "Mindfulness, learning, emotional intelligence, mental health",
    examples: ["Meditation", "Reading", "Journaling", "Therapy"],
    recommended: true,
  },
  {
    id: "professional",
    name: "Professional",
    emoji: "📈",
    icon: TrendingUp,
    color: "bg-green-500",
    bgColor: "bg-green-100",
    description: "Career growth, skills, income, business development",
    examples: ["Skill development", "Networking", "Income goals", "Certifications"],
    recommended: false,
  },
  {
    id: "family",
    name: "Family",
    emoji: "👨‍👩‍👧‍👦",
    icon: Users,
    color: "bg-pink-500",
    bgColor: "bg-pink-100",
    description: "Relationships, quality time, family bonds, love",
    examples: ["Quality time", "Family activities", "Communication", "Support"],
    recommended: true,
  },
  {
    id: "nutrition",
    name: "Nutrition",
    emoji: "🍎",
    icon: Apple,
    color: "bg-orange-500",
    bgColor: "bg-orange-100",
    description: "Healthy eating, meal planning, nutrition education",
    examples: ["Clean eating", "Meal prep", "Water intake", "Nutrition tracking"],
    recommended: false,
  },
]

export function PillarSelectionStep() {
  const { completeStep } = useOnboarding()
  const [selectedPillars, setSelectedPillars] = useState<string[]>(
    pillars.filter((p) => p.recommended).map((p) => p.id),
  )

  const handlePillarToggle = (pillarId: string) => {
    setSelectedPillars((prev) => (prev.includes(pillarId) ? prev.filter((id) => id !== pillarId) : [...prev, pillarId]))
  }

  const handleContinue = () => {
    localStorage.setItem("gryt-selected-pillars", JSON.stringify(selectedPillars))
    completeStep("pillar-selection")
  }

  const isValidSelection = selectedPillars.length >= 3

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="bg-blue-500 text-white px-6 py-2 text-lg rounded-full mb-4">
            🏛️ Choose Your Focus Areas
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Select Your Life Pillars
          </h2>
          <p className="text-lg text-gray-600 mb-4">Choose 3-6 life areas you want to focus on during your Gryt Year</p>
          <div className="flex justify-center space-x-4">
            <Badge className="bg-green-100 text-green-600 px-3 py-1 rounded-full">
              ✅ {selectedPillars.length} selected
            </Badge>
            <Badge className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">🎯 Recommended: 3-6 pillars</Badge>
          </div>
        </div>

        {/* Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {pillars.map((pillar) => {
            const isSelected = selectedPillars.includes(pillar.id)
            const IconComponent = pillar.icon

            return (
              <Card
                key={pillar.id}
                className={`rounded-3xl shadow-lg border-2 cursor-pointer transition-all transform hover:scale-105 ${
                  isSelected
                    ? "border-green-500 bg-gradient-to-br from-green-50 to-blue-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
                onClick={() => handlePillarToggle(pillar.id)}
              >
                {/* Selection indicator */}
                <div className={`h-2 ${isSelected ? pillar.color : "bg-gray-200"}`}></div>

                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{pillar.emoji}</div>
                      <div>
                        <CardTitle className="text-lg">{pillar.name}</CardTitle>
                        {pillar.recommended && (
                          <Badge className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs mt-1">
                            Recommended
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Checkbox checked={isSelected} className="w-6 h-6" />
                      {isSelected && <CheckCircle className="h-6 w-6 text-green-500 ml-2" />}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{pillar.description}</p>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Example activities:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {pillar.examples.map((example, index) => (
                        <div key={index} className="text-xs text-gray-500 flex items-center">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                          {example}
                        </div>
                      ))}
                    </div>
                  </div>

                  {isSelected && (
                    <div className="mt-4 p-3 bg-green-100 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">Selected for your journey!</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Guidance */}
        <Card className="rounded-3xl shadow-lg border-0 bg-gradient-to-br from-purple-50 to-pink-50 mb-8">
          <CardContent className="p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">💡</span>
              Selection Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="flex items-start space-x-2">
                <span className="text-green-500 font-bold">✓</span>
                <span>Start with 3-4 pillars if you're new to transformation work</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500 font-bold">✓</span>
                <span>Spiritual, Physical, and Mental are foundational pillars</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500 font-bold">✓</span>
                <span>You can always add or remove pillars later</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-500 font-bold">✓</span>
                <span>Choose areas where you're ready to commit daily effort</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue button */}
        <div className="text-center">
          <Button
            onClick={handleContinue}
            disabled={!isValidSelection}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-12 py-6 text-xl rounded-2xl shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isValidSelection ? "🎯 Set Goals for Selected Pillars" : "📝 Select at least 3 pillars"}
          </Button>
          <p className="text-sm text-gray-500 mt-3">
            {isValidSelection
              ? `Perfect! You've selected ${selectedPillars.length} pillars for your transformation`
              : "Choose at least 3 life areas to focus on during your Gryt Year"}
          </p>
        </div>
      </div>
    </div>
  )
}
