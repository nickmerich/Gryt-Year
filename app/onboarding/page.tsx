"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react"

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    goal: "",
    motivation: "",
    habits: "",
    integrations: [] as string[],
  })

  const steps = [
    {
      title: "What goal are you working towards?",
      description: "Define your main transformation goal",
      key: "goal" as keyof typeof formData,
      placeholder: "e.g., Run a marathon, lose 20 pounds, read 50 books, build a business...",
      emoji: "🎯",
    },
    {
      title: "Why does achieving this goal matter to you?",
      description: "Understanding your 'why' keeps you motivated",
      key: "motivation" as keyof typeof formData,
      placeholder: "Describe your deeper motivation and what success would mean to you...",
      emoji: "💪",
    },
    {
      title: "Which daily habits will help you achieve your goal?",
      description: "Identify the key habits that drive your success",
      key: "habits" as keyof typeof formData,
      placeholder: "e.g., Exercise 30 minutes, read 20 pages, meditate 10 minutes, track calories...",
      emoji: "✨",
    },
    {
      title: "Connect your apps for automatic tracking",
      description: "Select integrations to sync your habit data",
      key: "integrations" as keyof typeof formData,
      emoji: "🔗",
    },
  ]

  const integrationOptions = [
    { id: "apple-health", name: "Apple Health", category: "Fitness", icon: "🍎" },
    { id: "myfitnesspal", name: "MyFitnessPal", category: "Nutrition", icon: "🍽️" },
    { id: "kindle", name: "Kindle", category: "Reading", icon: "📚" },
    { id: "rescuetime", name: "RescueTime", category: "Productivity", icon: "⏰" },
    { id: "strava", name: "Strava", category: "Fitness", icon: "🚴" },
    { id: "goodreads", name: "Goodreads", category: "Reading", icon: "📖" },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      window.location.href = "/dashboard"
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleIntegration = (integrationId: string) => {
    setFormData((prev) => ({
      ...prev,
      integrations: prev.integrations.includes(integrationId)
        ? prev.integrations.filter((id) => id !== integrationId)
        : [...prev.integrations, integrationId],
    }))
  }

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="bg-green-500 text-white px-6 py-2 text-lg rounded-full mb-4">🚀 Quick Setup</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Gryt!</h1>
          <p className="text-xl text-gray-600">Let's personalize your transformation journey</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Setup Progress</span>
            <span className="text-sm text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <Card className="rounded-3xl shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="text-6xl mb-4">{currentStepData.emoji}</div>
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{currentStepData.title}</CardTitle>
            <p className="text-gray-600">{currentStepData.description}</p>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            {currentStep < 3 ? (
              <div className="space-y-6">
                <Textarea
                  placeholder={currentStepData.placeholder}
                  value={formData[currentStepData.key] as string}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [currentStepData.key]: e.target.value,
                    }))
                  }
                  className="min-h-32 rounded-2xl border-2 border-gray-200 focus:border-green-500 text-lg"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600 mb-6">
                  Select the apps you'd like to connect for automatic habit tracking:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {integrationOptions.map((integration) => (
                    <div
                      key={integration.id}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        formData.integrations.includes(integration.id)
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => toggleIntegration(integration.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={formData.integrations.includes(integration.id)}
                          onChange={() => toggleIntegration(integration.id)}
                        />
                        <span className="text-2xl">{integration.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900">{integration.name}</div>
                          <div className="text-sm text-gray-600">{integration.category}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0} className="rounded-2xl">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index < currentStep ? "bg-green-500" : index === currentStep ? "bg-blue-500" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>

              <Button onClick={handleNext} className="bg-green-500 hover:bg-green-600 text-white rounded-2xl px-8">
                {currentStep === steps.length - 1 ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete Setup
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
