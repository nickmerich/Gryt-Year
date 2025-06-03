"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useOnboarding } from "../onboarding-provider"
import { GuideSymbol } from "../../guide-symbol"
import { Trophy, Star, Sparkles, Crown, ArrowRight, CheckCircle } from "lucide-react"

export function CelebrationStep() {
  const { completeStep } = useOnboarding()
  const [showConfetti, setShowConfetti] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)

  const celebrationMessages = [
    "🎉 Congratulations! You've completed your Gryt Year setup!",
    "💪 You're now ready to transform your life over the next 365 days!",
    "🚀 Your journey of growth, discipline, and faith begins now!",
    "✨ Remember: Love enough to pursue it. Believe deeply. Sacrifice for growth.",
  ]

  useEffect(() => {
    setShowConfetti(true)

    // Cycle through celebration messages
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % celebrationMessages.length)
    }, 3000)

    return () => clearInterval(messageInterval)
  }, [])

  const handleStartJourney = () => {
    completeStep("celebration")
    // Redirect to dashboard
    window.location.href = "/dashboard"
  }

  const setupStats = [
    { label: "Profile Created", icon: CheckCircle, completed: true },
    { label: "Calling Questions Answered", icon: CheckCircle, completed: true },
    { label: "Life Pillars Selected", icon: CheckCircle, completed: true },
    { label: "Goals Defined", icon: CheckCircle, completed: true },
    { label: "First Activity Completed", icon: CheckCircle, completed: true },
  ]

  return (
    <div className="p-8 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full animate-confetti ${
                i % 5 === 0
                  ? "bg-yellow-400"
                  : i % 5 === 1
                    ? "bg-blue-400"
                    : i % 5 === 2
                      ? "bg-green-400"
                      : i % 5 === 3
                        ? "bg-purple-400"
                        : "bg-pink-400"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Main Celebration */}
        <div className="text-center mb-8">
          <div className="relative mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce">
              <Crown className="h-16 w-16 text-white" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-yellow-400 animate-pulse" />
            <Sparkles className="absolute -bottom-2 -left-2 h-6 w-6 text-pink-400 animate-pulse" />
            <div
              className="absolute -top-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute -bottom-4 -right-4 w-4 h-4 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          <Badge className="bg-green-500 text-white px-8 py-3 text-xl rounded-full mb-6 animate-pulse">
            🎉 Setup Complete!
          </Badge>

          <h1
            className="text-4xl md:text-6xl font-bold mb-6 text-gray-900"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Welcome to Your
            <br />
            <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
              Gryt Year Journey!
            </span>
          </h1>

          <div className="h-16 flex items-center justify-center">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed animate-fade-in">
              {celebrationMessages[currentMessage]}
            </p>
          </div>
        </div>

        {/* Setup Summary */}
        <Card className="rounded-3xl shadow-xl border-0 bg-gradient-to-br from-green-50 to-blue-50 mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🏆 Your Setup Achievements</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {setupStats.map((stat, index) => {
                const IconComponent = stat.icon
                return (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-2xl shadow-sm">
                    <IconComponent className="h-6 w-6 text-green-500" />
                    <span className="font-medium text-gray-900">{stat.label}</span>
                  </div>
                )
              })}
            </div>

            <div className="text-center">
              <Badge className="bg-yellow-500 text-white px-6 py-2 rounded-full text-lg">⭐ 100% Setup Complete!</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Guide Welcome Message */}
        <Card className="rounded-3xl shadow-xl border-0 bg-white mb-8">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <GuideSymbol variant="onboarding" />
              <div className="flex-1">
                <h3 className="font-bold text-xl text-gray-900 mb-3">🤖 A Message from Your AI Guide</h3>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    🎯 <strong>Welcome to your transformation journey!</strong> I'm here to walk with you every step of
                    the way.
                  </p>
                  <p className="text-gray-700 mb-4">
                    💪 Together, we'll build discipline into habits, turn self-belief into strength, and make faith your
                    foundation. Every sacrifice will become a joyful offering toward your divine calling.
                  </p>
                  <p className="text-gray-700 font-medium">✨ Your Gryt Year starts now. Let's make it legendary! 🚀</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What's Next */}
        <Card className="rounded-3xl shadow-xl border-0 bg-gradient-to-br from-purple-50 to-pink-50 mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🚀 What Happens Next?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">📊</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Daily Tracking</h3>
                <p className="text-sm text-gray-600">
                  Log activities, earn XP, and build streaks across your life pillars
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Earn Achievements</h3>
                <p className="text-sm text-gray-600">
                  Unlock badges, celebrate milestones, and level up your transformation
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">AI Guidance</h3>
                <p className="text-sm text-gray-600">
                  Receive daily motivation, insights, and personalized recommendations
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final CTA */}
        <div className="text-center">
          <Button
            onClick={handleStartJourney}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-16 py-8 text-2xl rounded-3xl shadow-xl transform hover:scale-105 transition-all"
          >
            🎯 Enter My Dashboard
            <ArrowRight className="h-8 w-8 ml-3" />
          </Button>

          <p className="text-lg text-gray-600 mt-6">
            🔥 Your transformation begins now. Let's make this year legendary!
          </p>

          <div className="flex justify-center space-x-6 mt-8">
            <Badge className="bg-green-100 text-green-600 px-4 py-2 rounded-full">🎯 365 Days of Growth</Badge>
            <Badge className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">💪 6 Life Pillars</Badge>
            <Badge className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full">✨ Unlimited Potential</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
