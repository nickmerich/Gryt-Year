"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useOnboarding } from "./onboarding-provider"
import { ArrowRight, X } from "lucide-react"

interface TooltipData {
  stepId: string
  element: string
  title: string
  description: string
  position: "top" | "bottom" | "left" | "right"
  offset?: { x: number; y: number }
}

const tooltipData: TooltipData[] = [
  {
    stepId: "dashboard-tour",
    element: "[data-onboarding='metrics']",
    title: "📊 Your Metrics",
    description: "Track your daily progress and XP here",
    position: "bottom",
  },
  {
    stepId: "dashboard-tour",
    element: "[data-onboarding='pillars']",
    title: "🏛️ Life Pillars",
    description: "Monitor progress across all 6 life areas",
    position: "top",
  },
  {
    stepId: "dashboard-tour",
    element: "[data-onboarding='goals']",
    title: "🎯 Your Goals",
    description: "Set and track your transformation goals",
    position: "left",
  },
  {
    stepId: "dashboard-tour",
    element: "[data-onboarding='guide']",
    title: "🤖 AI Guide",
    description: "Your personal companion for daily motivation",
    position: "bottom",
  },
]

export function OnboardingTooltip() {
  const { currentStep, steps } = useOnboarding()
  const [activeTooltip, setActiveTooltip] = useState<TooltipData | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  const currentStepData = steps[currentStep]

  useEffect(() => {
    if (!currentStepData) return

    const stepTooltips = tooltipData.filter((tooltip) => tooltip.stepId === currentStepData.id)

    if (stepTooltips.length === 0) {
      setActiveTooltip(null)
      return
    }

    // Show first tooltip for this step
    const tooltip = stepTooltips[0]
    const element = document.querySelector(tooltip.element)

    if (element) {
      const rect = element.getBoundingClientRect()
      let x = rect.left + rect.width / 2
      let y = rect.top

      // Adjust position based on tooltip position
      switch (tooltip.position) {
        case "top":
          y = rect.top - 10
          break
        case "bottom":
          y = rect.bottom + 10
          break
        case "left":
          x = rect.left - 10
          y = rect.top + rect.height / 2
          break
        case "right":
          x = rect.right + 10
          y = rect.top + rect.height / 2
          break
      }

      // Apply custom offset if provided
      if (tooltip.offset) {
        x += tooltip.offset.x
        y += tooltip.offset.y
      }

      setTooltipPosition({ x, y })
      setActiveTooltip(tooltip)

      // Highlight the target element
      element.classList.add("onboarding-highlight")
    }

    return () => {
      // Remove highlight when tooltip changes
      const elements = document.querySelectorAll(".onboarding-highlight")
      elements.forEach((el) => el.classList.remove("onboarding-highlight"))
    }
  }, [currentStep, currentStepData])

  if (!activeTooltip) return null

  const getTooltipClasses = () => {
    const base = "fixed z-50 transform"
    switch (activeTooltip.position) {
      case "top":
        return `${base} -translate-x-1/2 -translate-y-full`
      case "bottom":
        return `${base} -translate-x-1/2`
      case "left":
        return `${base} -translate-x-full -translate-y-1/2`
      case "right":
        return `${base} -translate-y-1/2`
      default:
        return `${base} -translate-x-1/2`
    }
  }

  const getArrowClasses = () => {
    const base = "absolute w-3 h-3 bg-white border transform rotate-45"
    switch (activeTooltip.position) {
      case "top":
        return `${base} top-full left-1/2 -translate-x-1/2 -translate-y-1/2 border-t-0 border-l-0`
      case "bottom":
        return `${base} -top-1.5 left-1/2 -translate-x-1/2 border-b-0 border-r-0`
      case "left":
        return `${base} left-full top-1/2 -translate-x-1/2 -translate-y-1/2 border-t-0 border-l-0`
      case "right":
        return `${base} -left-1.5 top-1/2 -translate-x-1/2 -translate-y-1/2 border-b-0 border-r-0`
      default:
        return `${base} -top-1.5 left-1/2 -translate-x-1/2 border-b-0 border-r-0`
    }
  }

  return (
    <>
      {/* Overlay to dim background */}
      <div className="fixed inset-0 z-40 bg-black/20 pointer-events-none" />

      {/* Tooltip */}
      <div
        className={getTooltipClasses()}
        style={{
          left: tooltipPosition.x,
          top: tooltipPosition.y,
        }}
      >
        <Card className="rounded-2xl shadow-xl border border-gray-200 bg-white max-w-xs">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-gray-900 text-sm">{activeTooltip.title}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTooltip(null)}
                className="h-6 w-6 p-0 rounded-full"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-sm text-gray-600 mb-3">{activeTooltip.description}</p>
            <Button
              size="sm"
              onClick={() => setActiveTooltip(null)}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl w-full"
            >
              Got it!
              <ArrowRight className="h-3 w-3 ml-2" />
            </Button>
          </CardContent>
          {/* Arrow */}
          <div className={getArrowClasses()} />
        </Card>
      </div>
    </>
  )
}
