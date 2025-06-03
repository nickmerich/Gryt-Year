"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Church,
  Brain,
  User,
  TrendingUp,
  Users,
  Apple,
  CheckCircle,
  Calendar,
  Target,
  BookOpen,
  Play,
  ArrowRight,
  Star,
  Compass,
  Trophy,
  Flame,
  Award,
  Crown,
  Sparkles,
} from "lucide-react"

// Add the onboarding integration at the top of the file
import { OnboardingProvider } from "@/components/onboarding/onboarding-provider"

// Update the main component to wrap with OnboardingProvider
export default function GrytYearLanding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [onboardingData, setOnboardingData] = useState({
    calling: "",
    sacrifice: "",
    guidance: "",
  })

  const onboardingSteps = [
    {
      question: "What does God call you toward?",
      key: "calling" as keyof typeof onboardingData,
      placeholder: "Describe your divine calling and purpose...",
      emoji: "🙏",
    },
    {
      question: "What comforts will you sacrifice to achieve it?",
      key: "sacrifice" as keyof typeof onboardingData,
      placeholder: "What are you willing to give up for growth...",
      emoji: "💪",
    },
    {
      question: "How will love, self-belief, and faith guide your daily discipline?",
      key: "guidance" as keyof typeof onboardingData,
      placeholder: "Describe how these principles will shape your journey...",
      emoji: "✨",
    },
  ]

  const pillars = [
    { icon: Brain, name: "Mental / Emotional", color: "bg-purple-500", bgColor: "bg-purple-100", emoji: "🧠" },
    { icon: User, name: "Physical", color: "bg-blue-500", bgColor: "bg-blue-100", emoji: "💪" },
    { icon: Church, name: "Spiritual", color: "bg-yellow-500", bgColor: "bg-yellow-100", emoji: "🙏" },
    { icon: TrendingUp, name: "Professional", color: "bg-green-500", bgColor: "bg-green-100", emoji: "📈" },
    { icon: Users, name: "Family", color: "bg-pink-500", bgColor: "bg-pink-100", emoji: "👨‍👩‍👧‍👦" },
    { icon: Apple, name: "Nutrition", color: "bg-orange-500", bgColor: "bg-orange-100", emoji: "🍎" },
  ]

  const phases = [
    {
      name: "Foundation",
      description: "Building core habits and spiritual foundation",
      progress: 100,
      emoji: "🏗️",
      xp: 2500,
      level: "Complete!",
    },
    {
      name: "Growth",
      description: "Expanding capabilities and deepening faith",
      progress: 75,
      emoji: "🌱",
      xp: 1875,
      level: "Level 3",
    },
    {
      name: "Breakthrough",
      description: "Overcoming major obstacles and limitations",
      progress: 45,
      emoji: "⚡",
      xp: 1125,
      level: "Level 2",
    },
    {
      name: "Completion",
      description: "Achieving transformation and new identity",
      progress: 0,
      emoji: "👑",
      xp: 0,
      level: "Locked",
    },
  ]

  return (
    <OnboardingProvider>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
          {/* Floating elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-16 h-16 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute top-40 right-20 w-12 h-12 bg-green-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-32 left-20 w-20 h-20 bg-purple-400 rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute bottom-20 right-10 w-14 h-14 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
          </div>

          {/* Mascot Guide */}
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden lg:block">
            <div className="relative">
              <div className="w-40 h-40 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                <Compass className="h-20 w-20 text-white" />
              </div>
              {/* Sparkles around mascot */}
              <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-yellow-400 animate-pulse" />
              <Sparkles className="absolute -bottom-2 -left-2 h-6 w-6 text-pink-400 animate-pulse" />
            </div>
          </div>

          <div className="text-center z-10 max-w-4xl mx-auto">
            <div className="mb-8">
              <Badge className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 text-lg rounded-full mb-4">
                🎯 Transform Your Life in 365 Days!
              </Badge>
            </div>

            <h1
              className="text-6xl md:text-8xl font-bold mb-6 text-gray-900"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Level Up Your
              <br />
              <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
                Gryt Year
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              🚀 Love enough to pursue it. 💪 Believe deeply in God's purpose. 🔥 Sacrifice comforts for growth.
              <br />
              <span className="font-bold text-green-600">✨ Self-belief shifts reality!</span>
            </p>

            {/* Update the CTA buttons to link to onboarding */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-12 py-6 text-xl rounded-2xl shadow-lg transform hover:scale-105 transition-all"
                onClick={() => window.open("/onboarding", "_self")}
              >
                🎯 Start My Gryt Year
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
              <Button
                size="lg"
                className="bg-white border-2 border-green-500 text-green-600 hover:bg-green-50 px-12 py-6 text-xl rounded-2xl shadow-lg transform hover:scale-105 transition-all"
                onClick={() => window.open("/preview", "_blank")}
              >
                <Play className="mr-2 h-6 w-6" />👀 Preview Journey
              </Button>
            </div>

            {/* Stats row */}
            <div className="flex justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">10K+</div>
                <div className="text-sm text-gray-600">Lives Transformed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">365</div>
                <div className="text-sm text-gray-600">Days of Growth</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">6</div>
                <div className="text-sm text-gray-600">Life Pillars</div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <Badge className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 text-lg rounded-full mb-8">
              🏆 Your Sacred Transformation Space
            </Badge>

            <h2
              className="text-4xl md:text-5xl font-bold mb-8 text-gray-900"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Master Your Full Potential
            </h2>

            <p className="text-xl md:text-2xl text-gray-700 mb-16 max-w-4xl mx-auto leading-relaxed">
              🎯 Gryt is your sacred space for the relentless pursuit of your fullest potential—mind, body, and spirit.
              <br />
              <span className="font-bold text-purple-600">💪 Commit to one year of guided transformation!</span>
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all border-0">
                <div className="text-4xl mb-4">⛪</div>
                <h3 className="font-bold text-gray-900 text-lg">Devotion</h3>
                <p className="text-sm text-gray-600 mt-2">Sacred commitment</p>
              </Card>
              <Card className="p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all border-0">
                <div className="text-4xl mb-4">❤️</div>
                <h3 className="font-bold text-gray-900 text-lg">Love</h3>
                <p className="text-sm text-gray-600 mt-2">Passionate pursuit</p>
              </Card>
              <Card className="p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all border-0">
                <div className="text-4xl mb-4">⛰️</div>
                <h3 className="font-bold text-gray-900 text-lg">Challenge</h3>
                <p className="text-sm text-gray-600 mt-2">Growth through trials</p>
              </Card>
              <Card className="p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all border-0">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-bold text-gray-900 text-lg">Discipline</h3>
                <p className="text-sm text-gray-600 mt-2">Daily excellence</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Structured Onboarding Flow */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <div className="text-4xl">{onboardingSteps[currentStep].emoji}</div>
              </div>
              <Badge className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 text-lg rounded-full mb-4">
                🚀 Quick Setup - 3 Steps
              </Badge>
              <h2
                className="text-4xl md:text-5xl font-bold text-gray-900"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Begin Your Sacred Journey
              </h2>
              <p className="text-lg text-gray-600 mt-4">
                🧭 Let your inner compass guide you through these foundational questions
              </p>
            </div>

            <Card className="p-8 rounded-3xl shadow-xl border-0 bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader>
                <div className="flex items-center justify-between mb-6">
                  <Badge className="bg-green-500 text-white px-4 py-2 rounded-full">
                    Step {currentStep + 1} of 3 🎯
                  </Badge>
                  <div className="flex space-x-2">
                    {[0, 1, 2].map((step) => (
                      <div
                        key={step}
                        className={`w-4 h-4 rounded-full ${step <= currentStep ? "bg-green-500" : "bg-gray-200"}`}
                      />
                    ))}
                  </div>
                </div>
                <CardTitle className="text-2xl mb-4 flex items-center gap-3">
                  <span className="text-3xl">{onboardingSteps[currentStep].emoji}</span>
                  {onboardingSteps[currentStep].question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Textarea
                    placeholder={onboardingSteps[currentStep].placeholder}
                    value={onboardingData[onboardingSteps[currentStep].key]}
                    onChange={(e) =>
                      setOnboardingData((prev) => ({
                        ...prev,
                        [onboardingSteps[currentStep].key]: e.target.value,
                      }))
                    }
                    className="min-h-32 rounded-2xl border-2 border-gray-200 focus:border-green-500"
                  />
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                      disabled={currentStep === 0}
                      className="px-8 py-3 rounded-2xl"
                    >
                      ← Previous
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-8 py-3 rounded-2xl"
                      onClick={() => setCurrentStep(Math.min(2, currentStep + 1))}
                      disabled={currentStep === 2}
                    >
                      {currentStep === 2 ? "🎉 Complete!" : "Next →"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Daily Dashboard Preview */}
        <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 text-lg rounded-full mb-4">
                📊 Daily Progress Tracker
              </Badge>
              <h2
                className="text-4xl md:text-5xl font-bold text-gray-900"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                The Gryt 90 Tracker
              </h2>
              <p className="text-xl text-gray-600 mt-4">🎯 Master all 6 life pillars with daily challenges!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillars.map((pillar, index) => (
                <Card
                  key={index}
                  className="rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all border-0 bg-white overflow-hidden"
                >
                  {/* Progress bar at top */}
                  <div className={`h-2 ${pillar.color}`}></div>

                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{pillar.emoji}</div>
                        <div>
                          <CardTitle className="text-lg">{pillar.name}</CardTitle>
                          <div className="flex items-center space-x-1 mt-1">
                            <Flame className="h-4 w-4 text-orange-500" />
                            <span className="text-sm text-gray-600">7 day streak</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={`${pillar.color} text-white rounded-full px-3 py-1`}>Level 3</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-sm font-medium">Daily checklist</span>
                        </div>
                        <span className="text-xs text-green-600 font-bold">+10 XP</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                        <div className="flex items-center space-x-2">
                          <Brain className="h-5 w-5 text-blue-500" />
                          <span className="text-sm font-medium">AI affirmations</span>
                        </div>
                        <span className="text-xs text-blue-600 font-bold">+5 XP</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                        <div className="flex items-center space-x-2">
                          <BookOpen className="h-5 w-5 text-purple-500" />
                          <span className="text-sm font-medium">Journal reflection</span>
                        </div>
                        <span className="text-xs text-purple-600 font-bold">+15 XP</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-700">Today's Progress</span>
                        <span className="text-sm font-bold text-green-600">85%</span>
                      </div>
                      <Progress value={85} className="mt-2 h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* AI Companion Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 text-lg rounded-full mb-4">
                🤖 Your AI Companion
              </Badge>
              <h2
                className="text-4xl md:text-5xl font-bold text-gray-900"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Meet Your Guide
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Guide Visualization */}
              <div className="flex justify-center">
                <div className="relative">
                  {/* Main Guide */}
                  <div className="w-80 h-80 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                    <div className="w-64 h-64 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Compass className="h-32 w-32 text-white" />
                    </div>
                  </div>

                  {/* Floating achievement badges */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute top-1/2 -left-8 w-16 h-16 bg-purple-400 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                    <Crown className="h-8 w-8 text-white" />
                  </div>

                  {/* Sparkles */}
                  <Sparkles className="absolute top-8 left-8 h-8 w-8 text-yellow-400 animate-pulse" />
                  <Sparkles className="absolute bottom-8 right-8 h-6 w-6 text-pink-400 animate-pulse" />
                </div>
              </div>

              {/* Content */}
              <div>
                <Card className="p-8 rounded-3xl shadow-xl border-0 bg-gradient-to-br from-purple-50 to-pink-50">
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                          <Compass className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">Guide</h3>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-500 text-white rounded-full px-2 py-1 text-xs">
                              🔥 Always Active
                            </Badge>
                            <Badge className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
                              ⚡ AI Powered
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <blockquote className="text-lg text-gray-700 leading-relaxed bg-white p-4 rounded-2xl shadow-sm">
                        💪 "I'm here as your daily companion, walking with you step-by-step until discipline becomes
                        your habit, self-belief becomes your strength, faith your foundation, and sacrifice your joyful
                        offering!"
                      </blockquote>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 p-3 bg-white rounded-2xl shadow-sm">
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                          <Star className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <span className="text-sm font-bold">Morning motivation</span>
                          <div className="text-xs text-gray-500">+5 XP daily</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-white rounded-2xl shadow-sm">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <span className="text-sm font-bold">Smart reminders</span>
                          <div className="text-xs text-gray-500">Perfect timing</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-white rounded-2xl shadow-sm">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <span className="text-sm font-bold">Journal prompts</span>
                          <div className="text-xs text-gray-500">Deep reflection</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-white rounded-2xl shadow-sm">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <span className="text-sm font-bold">Progress insights</span>
                          <div className="text-xs text-gray-500">Real-time feedback</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Achievement System Preview */}
        <section className="py-20 px-4 bg-gradient-to-br from-yellow-50 to-orange-50">
          <div className="max-w-6xl mx-auto text-center">
            <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 text-lg rounded-full mb-4">
              🏆 Achievement System
            </Badge>
            <h2
              className="text-4xl md:text-5xl font-bold mb-8 text-gray-900"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Unlock Your Potential
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              🎯 Earn badges, collect trophies, and celebrate every milestone on your transformation journey!
            </p>

            {/* Achievement Preview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="rounded-3xl shadow-lg border-0 bg-white">
                <div className="h-2 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                      <Trophy className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Prayer Warrior</h3>
                  <p className="text-sm text-gray-600 mb-3">Complete 30 days of daily prayer</p>
                  <Badge className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs">GOLD</Badge>
                  <div className="flex items-center justify-center mt-3 space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-bold">500 XP</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl shadow-lg border-0 bg-white">
                <div className="h-2 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                      <Crown className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Gryt Founder</h3>
                  <p className="text-sm text-gray-600 mb-3">Join the Gryt Year community</p>
                  <Badge className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs">DIAMOND</Badge>
                  <div className="flex items-center justify-center mt-3 space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-bold">100 XP</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl shadow-lg border-0 bg-white">
                <div className="h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <Flame className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Fitness Fanatic</h3>
                  <p className="text-sm text-gray-600 mb-3">Exercise for 21 consecutive days</p>
                  <Badge className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">GOLD</Badge>
                  <div className="flex items-center justify-center mt-3 space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-bold">750 XP</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-12 py-6 text-xl rounded-2xl shadow-lg transform hover:scale-105 transition-all"
            >
              🏆 View All Achievements
            </Button>
          </div>
        </section>

        {/* Achievement Animation Demo */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 text-lg rounded-full mb-4">
              🎊 Live Demo
            </Badge>
            <h2
              className="text-4xl md:text-5xl font-bold mb-8 text-gray-900"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Experience Achievement Celebrations
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              🎉 See how achievements come to life with our celebration animations!
            </p>

            <Button
              size="lg"
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-12 py-6 text-xl rounded-2xl shadow-lg transform hover:scale-105 transition-all"
              onClick={() => window.open("/demo", "_blank")}
            >
              🎊 Try Achievement Animations
            </Button>
          </div>
        </section>

        {/* Milestone Tracker */}
        <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 text-lg rounded-full mb-4">
                🏆 Achievement System
              </Badge>
              <h2
                className="text-4xl md:text-5xl font-bold text-gray-900"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                90-Day Focus Cycles
              </h2>
              <p className="text-xl text-gray-600 mt-4">🎯 Level up through 4 epic transformation phases!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {phases.map((phase, index) => (
                <Card key={index} className="rounded-3xl shadow-lg border-0 bg-white overflow-hidden">
                  <div
                    className={`h-3 ${
                      phase.progress === 100 ? "bg-green-500" : phase.progress > 0 ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  ></div>

                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-4xl">{phase.emoji}</div>
                        <div>
                          <CardTitle className="text-xl">
                            Phase {index + 1}: {phase.name}
                          </CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge
                              className={`${
                                phase.progress === 100
                                  ? "bg-green-500"
                                  : phase.progress > 0
                                    ? "bg-blue-500"
                                    : "bg-gray-400"
                              } text-white rounded-full px-3 py-1`}
                            >
                              {phase.level}
                            </Badge>
                            {phase.progress > 0 && (
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm font-bold text-gray-700">{phase.xp} XP</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{phase.progress}%</div>
                        {phase.progress === 100 && <Trophy className="h-6 w-6 text-yellow-500 mx-auto mt-1" />}
                      </div>
                    </div>
                    <CardDescription className="text-base">{phase.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={phase.progress} className="mb-6 h-3 rounded-full" />

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-2xl">
                        <Target className="h-5 w-5 text-red-500" />
                        <div>
                          <div className="text-sm font-medium">Marathon</div>
                          <div className="text-xs text-gray-500">26.2 miles</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-2xl">
                        <Calendar className="h-5 w-5 text-blue-500" />
                        <div>
                          <div className="text-sm font-medium">Sobriety</div>
                          <div className="text-xs text-gray-500">Daily streak</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-2xl">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                        <div>
                          <div className="text-sm font-medium">Revenue</div>
                          <div className="text-xs text-gray-500">Growth goals</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-2xl">
                        <User className="h-5 w-5 text-purple-500" />
                        <div>
                          <div className="text-sm font-medium">Health</div>
                          <div className="text-xs text-gray-500">Weight & fitness</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final Call-to-Faith */}
        <section className="py-20 px-4 bg-gradient-to-br from-green-500 via-blue-600 to-purple-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="text-6xl mb-4">🚀</div>
              <Badge className="bg-white/20 text-white px-6 py-2 text-lg rounded-full mb-4">
                ✨ Your Transformation Awaits
              </Badge>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-8" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Ready to Level Up Your Life?
            </h2>

            <p className="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed">
              🎯 Your transformation begins with a single decision. Choose faith over fear. Choose growth over comfort.
              <br />
              <span className="font-bold">🔥 Choose your divine calling over settling!</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 px-12 py-6 text-xl font-bold rounded-2xl shadow-xl transform hover:scale-105 transition-all"
                onClick={() => window.open("/dashboard", "_blank")}
              >
                🎯 Join The Gryt Year
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
              <Button
                size="lg"
                className="bg-white/20 border-2 border-white text-white hover:bg-white hover:text-purple-600 px-12 py-6 text-xl rounded-2xl shadow-xl transform hover:scale-105 transition-all"
                onClick={() => window.open("/preview", "_blank")}
              >
                👀 Preview My Journey
              </Button>
            </div>

            {/* Achievement preview */}
            <div className="mt-12 flex justify-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
                <Trophy className="h-5 w-5 text-yellow-300" />
                <span className="text-sm">Earn achievements</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
                <Flame className="h-5 w-5 text-orange-300" />
                <span className="text-sm">Build streaks</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
                <Star className="h-5 w-5 text-yellow-300" />
                <span className="text-sm">Gain XP</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </OnboardingProvider>
  )
}
