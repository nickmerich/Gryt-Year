"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useOnboarding } from "../onboarding-provider"
import { GuideSymbol } from "../../guide-symbol"
import { Star, Target, Compass, Sparkles } from "lucide-react"

export function WelcomeStep() {
  const { completeStep } = useOnboarding()

  const handleGetStarted = () => {
    completeStep("welcome")
  }

  return (
    <div className="p-8">
      <div className="text-center max-w-3xl mx-auto">
        {/* Hero section */}
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <GuideSymbol variant="hero" />
              <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-yellow-400 animate-pulse" />
              <Sparkles className="absolute -bottom-2 -left-2 h-6 w-6 text-pink-400 animate-pulse" />
            </div>
          </div>

          <Badge className="bg-green-500 text-white px-6 py-2 text-lg rounded-full mb-4">
            🎉 Welcome to Your Transformation!
          </Badge>

          <h1
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Ready to Level Up
            <br />
            <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
              Your Life?
            </span>
          </h1>

          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            🚀 You're about to embark on a sacred 365-day journey of transformation.
            <br />
            <span className="font-bold text-green-600">✨ Let's set you up for success!</span>
          </p>
        </div>

        {/* Features preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="rounded-3xl shadow-lg border-0 bg-gradient-to-br from-yellow-50 to-yellow-100">
            <CardContent className="p-6 text-center">
              <Star className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">Earn XP & Badges</h3>
              <p className="text-sm text-gray-600">Gamify your growth with achievements and rewards</p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6 text-center">
              <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">Track 6 Life Pillars</h3>
              <p className="text-sm text-gray-600">Spiritual, Physical, Mental, Professional, Family, Nutrition</p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6 text-center">
              <Compass className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">AI Guide Companion</h3>
              <p className="text-sm text-gray-600">Daily motivation and personalized guidance</p>
            </CardContent>
          </Card>
        </div>

        {/* What to expect */}
        <Card className="rounded-3xl shadow-lg border-0 bg-gradient-to-br from-green-50 to-blue-50 mb-8">
          <CardContent className="p-6">
            <h3 className="font-bold text-xl text-gray-900 mb-4">🎯 What to Expect in Setup</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <span className="text-gray-700">Create your profile & answer calling questions</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <span className="text-gray-700">Choose your focus pillars & set goals</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <span className="text-gray-700">Take a quick dashboard tour</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  4
                </div>
                <span className="text-gray-700">Complete your first activity</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time estimate */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <Badge className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">⏱️ Takes 5-10 minutes</Badge>
          <Badge className="bg-green-100 text-green-600 px-4 py-2 rounded-full">🎯 Personalized for you</Badge>
          <Badge className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full">✨ Skip anytime</Badge>
        </div>

        {/* CTA */}
        <Button
          onClick={handleGetStarted}
          size="lg"
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-12 py-6 text-xl rounded-2xl shadow-lg transform hover:scale-105 transition-all"
        >
          🚀 Let's Begin My Journey!
        </Button>

        <p className="text-sm text-gray-500 mt-4">Ready to transform your life? Let's make it happen together! 💪</p>
      </div>
    </div>
  )
}
