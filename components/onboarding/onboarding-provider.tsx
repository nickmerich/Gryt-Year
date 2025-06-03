"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface OnboardingStep {
  id: string
  title: string
  description: string
  component: string
  completed: boolean
  required: boolean
  order: number
}

interface OnboardingContextType {
  currentStep: number
  totalSteps: number
  steps: OnboardingStep[]
  isOnboardingActive: boolean
  isStepCompleted: (stepId: string) => boolean
  completeStep: (stepId: string) => void
  nextStep: () => void
  previousStep: () => void
  skipOnboarding: () => void
  restartOnboarding: () => void
  getProgress: () => number
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

const defaultSteps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Welcome to Gryt Year",
    description: "Let's get you started on your transformation journey",
    component: "WelcomeStep",
    completed: false,
    required: true,
    order: 1,
  },
  {
    id: "profile-setup",
    title: "Create Your Profile",
    description: "Tell us about yourself and your goals",
    component: "ProfileSetupStep",
    completed: false,
    required: true,
    order: 2,
  },
  {
    id: "calling-questions",
    title: "Divine Calling",
    description: "Answer the three foundational questions",
    component: "CallingQuestionsStep",
    completed: false,
    required: true,
    order: 3,
  },
  {
    id: "pillar-selection",
    title: "Choose Your Pillars",
    description: "Select which life areas you want to focus on",
    component: "PillarSelectionStep",
    completed: false,
    required: true,
    order: 4,
  },
  {
    id: "goal-setting",
    title: "Set Your Goals",
    description: "Define specific, measurable goals for each pillar",
    component: "GoalSettingStep",
    completed: false,
    required: true,
    order: 5,
  },
  {
    id: "dashboard-tour",
    title: "Dashboard Tour",
    description: "Learn how to navigate your transformation dashboard",
    component: "DashboardTourStep",
    completed: false,
    required: false,
    order: 6,
  },
  {
    id: "first-activity",
    title: "Complete First Activity",
    description: "Log your first daily activity to get started",
    component: "FirstActivityStep",
    completed: false,
    required: true,
    order: 7,
  },
  {
    id: "celebration",
    title: "You're Ready!",
    description: "Celebrate the beginning of your Gryt Year journey",
    component: "CelebrationStep",
    completed: false,
    required: true,
    order: 8,
  },
]

interface OnboardingProviderProps {
  children: ReactNode
}

export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<OnboardingStep[]>(defaultSteps)
  const [isOnboardingActive, setIsOnboardingActive] = useState(false)

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingCompleted = localStorage.getItem("gryt-onboarding-completed")
    if (!onboardingCompleted) {
      setIsOnboardingActive(true)
    }
  }, [])

  const isStepCompleted = (stepId: string) => {
    return steps.find((step) => step.id === stepId)?.completed || false
  }

  const completeStep = (stepId: string) => {
    setSteps((prevSteps) => prevSteps.map((step) => (step.id === stepId ? { ...step, completed: true } : step)))

    // Auto-advance to next step if current step is completed
    const currentStepData = steps[currentStep]
    if (currentStepData && currentStepData.id === stepId) {
      nextStep()
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Onboarding completed
      setIsOnboardingActive(false)
      localStorage.setItem("gryt-onboarding-completed", "true")
    }
  }

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skipOnboarding = () => {
    setIsOnboardingActive(false)
    localStorage.setItem("gryt-onboarding-completed", "true")
  }

  const restartOnboarding = () => {
    setCurrentStep(0)
    setSteps(defaultSteps)
    setIsOnboardingActive(true)
    localStorage.removeItem("gryt-onboarding-completed")
  }

  const getProgress = () => {
    const completedSteps = steps.filter((step) => step.completed).length
    return (completedSteps / steps.length) * 100
  }

  const value: OnboardingContextType = {
    currentStep,
    totalSteps: steps.length,
    steps,
    isOnboardingActive,
    isStepCompleted,
    completeStep,
    nextStep,
    previousStep,
    skipOnboarding,
    restartOnboarding,
    getProgress,
  }

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider")
  }
  return context
}
