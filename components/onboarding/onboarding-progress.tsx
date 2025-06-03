"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useOnboarding } from "./onboarding-provider"
import { CheckCircle, Circle } from "lucide-react"

export function OnboardingProgress() {
  const { currentStep, totalSteps, steps, getProgress } = useOnboarding()
  const progress = getProgress()

  return (
    <div className="fixed top-4 left-4 z-40">
      <Card className="rounded-2xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Badge className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">🚀 Setup Progress</Badge>
            <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
          </div>

          <Progress value={progress} className="h-2 mb-3" />

          <div className="space-y-2">
            {steps.slice(0, 5).map((step, index) => (
              <div key={step.id} className="flex items-center space-x-2">
                {step.completed ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : index === currentStep ? (
                  <Circle className="h-4 w-4 text-blue-500 animate-pulse" />
                ) : (
                  <Circle className="h-4 w-4 text-gray-300" />
                )}
                <span
                  className={`text-xs ${
                    step.completed
                      ? "text-green-600 font-medium"
                      : index === currentStep
                        ? "text-blue-600 font-medium"
                        : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
            {steps.length > 5 && <div className="text-xs text-gray-500 pl-6">+{steps.length - 5} more steps</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
