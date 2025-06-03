"use client"

import { useOnboarding } from "./onboarding-provider"
import { OnboardingModal } from "./onboarding-modal"
import { OnboardingTooltip } from "./onboarding-tooltip"
import { OnboardingProgress } from "./onboarding-progress"

export function OnboardingOverlay() {
  const { isOnboardingActive, currentStep, steps } = useOnboarding()

  if (!isOnboardingActive) return null

  const currentStepData = steps[currentStep]

  return (
    <>
      {/* Progress indicator */}
      <OnboardingProgress />

      {/* Main onboarding modal */}
      <OnboardingModal step={currentStepData} />

      {/* Contextual tooltips */}
      <OnboardingTooltip />
    </>
  )
}
