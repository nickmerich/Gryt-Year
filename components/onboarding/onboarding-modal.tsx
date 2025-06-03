"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useOnboarding } from "./onboarding-provider"
import { GuideSymbol } from "../guide-symbol"
import { X, ArrowLeft, ArrowRight, SkipBackIcon as Skip } from "lucide-react"

// Import step components
import { WelcomeStep } from "./steps/welcome-step"
import { ProfileSetupStep } from "./steps/profile-setup-step"
import { CallingQuestionsStep } from "./steps/calling-questions-step"
import { PillarSelectionStep } from "./steps/pillar-selection-step"
import { GoalSettingStep } from "./steps/goal-setting-step"
import { DashboardTourStep } from "./steps/dashboard-tour-step"
import { FirstActivityStep } from "./steps/first-activity-step"
import { CelebrationStep } from "./steps/celebration-step"

interface OnboardingStep {
  id: string
  title: string
  description: string
  component: string
  completed: boolean
  required: boolean
  order: number
}

interface OnboardingModalProps {
  step: OnboardingStep
}

const stepComponents = {
  WelcomeStep,
  ProfileSetupStep,
  CallingQuestionsStep,
  PillarSelectionStep,
  GoalSettingStep,
  DashboardTourStep,
  FirstActivityStep,
  CelebrationStep,
}

export function OnboardingModal({ step }: OnboardingModalProps) {
  const { currentStep, totalSteps, nextStep, previousStep, skipOnboarding, getProgress } = useOnboarding()

  const StepComponent = stepComponents[step.component as keyof typeof stepComponents]
  const progress = getProgress()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl border-0 bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <GuideSymbol variant="onboarding" />
              <div>
                <h2 className="text-2xl font-bold" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  {step.title}
                </h2>
                <p className="text-blue-100">{step.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-white/20 text-white px-3 py-1 rounded-full">
                Step {currentStep + 1} of {totalSteps}
              </Badge>
              {!step.required && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={skipOnboarding}
                  className="text-white hover:bg-white/20 rounded-full"
                >
                  <Skip className="h-4 w-4 mr-2" />
                  Skip
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={skipOnboarding}
                className="text-white hover:bg-white/20 h-8 w-8 p-0 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-white/20" />
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-0 max-h-[60vh] overflow-y-auto">{StepComponent && <StepComponent />}</CardContent>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={previousStep} disabled={currentStep === 0} className="rounded-2xl">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center space-x-2">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index <= currentStep ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextStep}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-2xl"
            >
              {currentStep === totalSteps - 1 ? "Complete" : "Next"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
