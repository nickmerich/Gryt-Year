"use client"

import { OnboardingProvider } from "@/components/onboarding/onboarding-provider"
import { OnboardingOverlay } from "@/components/onboarding/onboarding-overlay"

export default function OnboardingPage() {
  return (
    <OnboardingProvider>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <OnboardingOverlay />
      </div>
    </OnboardingProvider>
  )
}
