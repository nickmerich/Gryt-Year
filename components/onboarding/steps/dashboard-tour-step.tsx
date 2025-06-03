"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useOnboarding } from "../onboarding-provider"
import { Play, ArrowRight, Eye, MousePointer, Compass } from "lucide-react"

const tourSteps = [
  {
    id: "overview",
    title: "📊 Dashboard Overview",
    description: "Your central hub for tracking progress across all life pillars",
    features: ["Daily XP tracking", "Streak counters", "Goal progress", "Achievement badges"],
    highlight: "metrics",
  },
  {
    id: "pillars",
    title: "🏛️ Life Pillars",
    description: "Monitor and manage your 6 areas of transformation",
    features: ["Individual pillar progress", "Daily activities", "Streak tracking", "Level progression"],
    highlight: "pillars",
  },
  {
    id: "goals",
    title: "🎯 Goal Tracker",
    description: "Set, track, and achieve your transformation goals",
    features: ["Progress visualization", "Milestone tracking", "Target dates", "Priority management"],
    highlight: "goals",
  },
  {
    id: "guide",
    title: "🤖 AI Guide",
    description: "Your personal companion for daily motivation and guidance",
    features: ["Daily motivation", "Progress insights", "Habit reminders", "Personalized tips"],
    highlight: "guide",
  },
]

export function DashboardTourStep() {
  const { completeStep } = useOnboarding()
  const [currentTourStep, setCurrentTourStep] = useState(0)
  const [tourStarted, setTourStarted] = useState(false)

  const handleStartTour = () => {
    setTourStarted(true)
  }

  const handleNextStep = () => {
    if (currentTourStep < tourSteps.length - 1) {
      setCurrentTourStep(currentTourStep + 1)
    } else {
      completeStep("dashboard-tour")
    }
  }

  const handleSkipTour = () => {
    completeStep("dashboard-tour")
  }

  const currentStep = tourSteps[currentTourStep]

  if (!tourStarted) {
    return (
      <div className="p-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Compass className="h-12 w-12 text-white" />
            </div>
            <Badge className="bg-blue-500 text-white px-6 py-2 text-lg rounded-full mb-4">🎯 Dashboard Tour</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Explore Your Dashboard
            </h2>
            <p className="text-lg text-gray-600">
              Take a quick tour to learn how to navigate your transformation dashboard
            </p>
          </div>

          {/* Tour Preview */}
          <Card className="rounded-3xl shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50 mb-8">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">🗺️ What You'll Learn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tourSteps.map((step, index) => (
                  <div key={step.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium text-gray-900 mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tour Options */}
          <div className="space-y-4">
            <Button
              onClick={handleStartTour}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-12 py-6 text-xl rounded-2xl shadow-lg transform hover:scale-105 transition-all"
            >
              <Play className="h-6 w-6 mr-3" />🎯 Start Interactive Tour
            </Button>

            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={handleSkipTour} className="rounded-2xl">
                Skip Tour
              </Button>
              <Badge className="bg-green-100 text-green-600 px-4 py-2 rounded-full">⏱️ Takes 2-3 minutes</Badge>
            </div>
          </div>

          {/* Benefits */}
          <Card className="rounded-3xl shadow-lg border-0 bg-white mt-8">
            <CardContent className="p-6">
              <h3 className="font-bold text-gray-900 mb-4">✨ Why Take the Tour?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-700">See all dashboard features</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MousePointer className="h-4 w-4 text-green-500" />
                  <span className="text-gray-700">Learn navigation shortcuts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ArrowRight className="h-4 w-4 text-purple-500" />
                  <span className="text-gray-700">Get started faster</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Tour Progress */}
        <div className="text-center mb-8">
          <Badge className="bg-blue-500 text-white px-6 py-2 text-lg rounded-full mb-4">
            🎯 Dashboard Tour - Step {currentTourStep + 1} of {tourSteps.length}
          </Badge>
          <div className="flex justify-center space-x-2 mb-4">
            {tourSteps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index <= currentTourStep ? "bg-blue-500" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Current Step */}
        <Card className="rounded-3xl shadow-lg border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-2xl text-center">{currentStep.title}</CardTitle>
            <p className="text-center text-gray-600">{currentStep.description}</p>
          </CardHeader>

          <CardContent>
            {/* Mock Dashboard Preview */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-6">
              <div className="text-center mb-4">
                <Badge className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
                  📱 Dashboard Preview
                </Badge>
              </div>

              {/* Simplified dashboard mockup based on current step */}
              {currentStep.id === "overview" && (
                <div className="space-y-4" data-onboarding="metrics">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                      <div className="text-2xl font-bold text-yellow-600">12,450</div>
                      <div className="text-xs text-gray-600">Total XP</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                      <div className="text-2xl font-bold text-orange-600">45</div>
                      <div className="text-xs text-gray-600">Day Streak</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                      <div className="text-2xl font-bold text-green-600">8</div>
                      <div className="text-xs text-gray-600">Achievements</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                      <div className="text-2xl font-bold text-blue-600">68%</div>
                      <div className="text-xs text-gray-600">Goals Progress</div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep.id === "pillars" && (
                <div className="grid grid-cols-2 gap-4" data-onboarding="pillars">
                  {["🙏 Spiritual", "💪 Physical", "🧠 Mental", "📈 Professional"].map((pillar, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{pillar}</span>
                        <Badge className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">Level 3</Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${75 + index * 5}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {currentStep.id === "goals" && (
                <div className="space-y-3" data-onboarding="goals">
                  {["Marathon Training", "Daily Prayer", "Revenue Growth"].map((goal, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{goal}</span>
                        <span className="text-xs text-gray-600">{70 + index * 10}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${70 + index * 10}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {currentStep.id === "guide" && (
                <div className="bg-white rounded-xl p-4 shadow-sm" data-onboarding="guide">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Compass className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900 mb-1">Guide</div>
                      <p className="text-sm text-gray-600">
                        🎯 Great progress today! Your spiritual streak is at 45 days. Keep building those habits! 💪
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Features List */}
            <div className="mb-6">
              <h4 className="font-bold text-gray-900 mb-3">✨ Key Features:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentStep.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => setCurrentTourStep(Math.max(0, currentTourStep - 1))}
                disabled={currentTourStep === 0}
                className="rounded-2xl"
              >
                Previous
              </Button>

              <Button variant="outline" onClick={handleSkipTour} className="rounded-2xl">
                Skip Tour
              </Button>

              <Button
                onClick={handleNextStep}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-2xl"
              >
                {currentTourStep === tourSteps.length - 1 ? "Complete Tour" : "Next Step"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
