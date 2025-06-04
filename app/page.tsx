"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Brain,
  Apple,
  Calendar,
  BookOpen,
  ArrowRight,
  Flame,
  Smartphone,
  Activity,
  BarChart3,
  Link,
  Target,
  Users,
  MessageCircle,
  Shield,
  FolderSyncIcon as Sync,
  Heart,
  Coffee,
  Moon,
  Dumbbell,
  Book,
} from "lucide-react"

export default function GrytLanding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [onboardingData, setOnboardingData] = useState({
    goal: "",
    motivation: "",
    sacrifices: "",
    habits: "",
    contract: "",
    signature: "",
    signatureDate: "",
  })

  const onboardingSteps = [
    {
      question: "What goal are you working towards?",
      key: "goal" as keyof typeof onboardingData,
      placeholder: "e.g., Run a marathon, lose 20 pounds, read 50 books, build a business...",
      emoji: "🎯",
      description: "Define your main transformation goal",
    },
    {
      question: "Why does achieving this goal matter to you?",
      key: "motivation" as keyof typeof onboardingData,
      placeholder: "Describe your deeper motivation and what success would mean to you...",
      emoji: "💪",
      description: "Understanding your 'why' keeps you motivated",
    },
    {
      question: "What daily habits will you sacrifice to achieve this goal?",
      key: "sacrifices" as keyof typeof onboardingData,
      placeholder:
        "e.g., Stop scrolling social media for 2 hours daily, eliminate late-night snacking, quit hitting snooze...",
      emoji: "🔥",
      description: "Identify the habits you must eliminate to make room for growth",
    },
    {
      question: "Which daily habits will help you achieve your goal?",
      key: "habits" as keyof typeof onboardingData,
      placeholder: "e.g., Exercise 30 minutes, read 20 pages, meditate 10 minutes, track calories...",
      emoji: "✨",
      description: "Identify the key habits that drive your success",
    },
    {
      question: "Sign your transformation contract",
      key: "contract" as keyof typeof onboardingData,
      placeholder: "",
      emoji: "📝",
      description: "Commit to your journey with a digital signature",
    },
  ]

  const integrationCategories = [
    {
      name: "Fitness & Health",
      icon: Activity,
      color: "bg-red-500",
      bgColor: "bg-red-50",
      apps: [
        { name: "Apple Health", icon: "🍎" },
        { name: "Google Fit", icon: "🏃" },
        { name: "Fitbit", icon: "⌚" },
        { name: "Strava", icon: "🚴" },
        { name: "Garmin", icon: "📍" },
      ],
    },
    {
      name: "Nutrition",
      icon: Apple,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      apps: [
        { name: "MyFitnessPal", icon: "🍽️" },
        { name: "LoseIt!", icon: "📊" },
        { name: "Cronometer", icon: "🥗" },
        { name: "Noom", icon: "🎯" },
      ],
    },
    {
      name: "Reading & Learning",
      icon: BookOpen,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      apps: [
        { name: "Kindle", icon: "📚" },
        { name: "Goodreads", icon: "📖" },
        { name: "Audible", icon: "🎧" },
        { name: "Libby", icon: "📱" },
      ],
    },
    {
      name: "Screen Time & Focus",
      icon: Smartphone,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      apps: [
        { name: "RescueTime", icon: "⏰" },
        { name: "Screen Time", icon: "📱" },
        { name: "Freedom", icon: "🔒" },
        { name: "Forest", icon: "🌳" },
      ],
    },
    {
      name: "Productivity",
      icon: Calendar,
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
      apps: [
        { name: "Google Calendar", icon: "📅" },
        { name: "Todoist", icon: "✅" },
        { name: "Notion", icon: "📝" },
        { name: "ClickUp", icon: "🚀" },
      ],
    },
  ]

  const habitExamples = [
    { icon: Dumbbell, name: "Exercise", description: "30 min daily workout", color: "text-red-500" },
    { icon: Book, name: "Reading", description: "20 pages per day", color: "text-blue-500" },
    { icon: Apple, name: "Nutrition", description: "Track daily calories", color: "text-green-500" },
    { icon: Moon, name: "Sleep", description: "8 hours quality sleep", color: "text-purple-500" },
    { icon: Brain, name: "Meditation", description: "10 min mindfulness", color: "text-indigo-500" },
    { icon: Coffee, name: "Hydration", description: "8 glasses of water", color: "text-cyan-500" },
  ]

  const features = [
    {
      icon: Link,
      title: "Seamless Integrations",
      description: "Connect 50+ apps and automatically sync your habit data in real-time",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Get personalized nudges and recommendations based on your integrated data",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: BarChart3,
      title: "Unified Analytics",
      description: "Visualize all your habits and progress in one comprehensive dashboard",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Target,
      title: "Goal Achievement",
      description: "Set meaningful objectives and track your journey to transformation",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: MessageCircle,
      title: "Weekly Reflections",
      description: "Structured prompts help you adapt and improve based on your data",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with others on similar journeys for accountability and motivation",
      color: "from-pink-500 to-rose-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-200 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-purple-200 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-blue-200 rounded-full opacity-35 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-pink-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-36 h-36 bg-cyan-200 rounded-full opacity-25 animate-bounce"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="text-center z-10 max-w-5xl mx-auto">
          <div className="mb-8">
            <Badge className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg rounded-full mb-6 shadow-lg">
              🎯 Transform Your Life Through Daily Habits!
            </Badge>
          </div>

          <h1
            className="text-6xl md:text-8xl font-bold mb-8 text-gray-900 leading-tight"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Build Habits That
            <br />
            <span className="bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent">Change</span>{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Everything</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
            🚀 Track habits from all your apps in one place. 📊 Get AI-powered insights. 💪 See real results in 90 days.
            <br />
            <span className="font-bold text-green-600">✨ Your transformation starts with one habit!</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white px-12 py-6 text-xl rounded-full shadow-lg transform hover:scale-105 transition-all"
              onClick={() => {
                document.getElementById("onboarding")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              🎯 Start Building Habits
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">App Integrations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">90</div>
              <div className="text-gray-600">Days to Results</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">1</div>
              <div className="text-gray-600">Unified Platform</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-blue-500 text-white px-6 py-2 text-lg rounded-full mb-6">🚀 Core Features</Badge>
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Everything You Need to Transform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Gryt unifies all your personal growth activities into one seamless platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="rounded-3xl shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding Section */}
      <section id="onboarding" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-purple-500 text-white px-6 py-2 text-lg rounded-full mb-6">🎯 Quick Setup</Badge>
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Start Your Transformation
            </h2>
            <p className="text-xl text-gray-600">Answer 5 key questions to commit to your transformation</p>
          </div>

          <Card className="rounded-3xl shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between mb-6">
                <Badge className="bg-green-500 text-white px-4 py-2 rounded-full">Step {currentStep + 1} of 5</Badge>
                <div className="flex space-x-2">
                  {[0, 1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        step <= currentStep ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{onboardingSteps[currentStep].emoji}</div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {onboardingSteps[currentStep].question}
                </CardTitle>
                <p className="text-gray-600">{onboardingSteps[currentStep].description}</p>
              </div>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              {currentStep < 4 ? (
                <div className="space-y-6">
                  <div>
                    <Textarea
                      placeholder={onboardingSteps[currentStep].placeholder}
                      value={onboardingData[onboardingSteps[currentStep].key] as string}
                      onChange={(e) =>
                        setOnboardingData((prev) => ({
                          ...prev,
                          [onboardingSteps[currentStep].key]: e.target.value,
                        }))
                      }
                      className="min-h-32 rounded-2xl border-2 border-gray-200 focus:border-green-500 text-lg"
                    />
                  </div>

                  {currentStep === 2 && (
                    <Card className="rounded-2xl bg-red-50 border-2 border-red-200">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">⚠️</div>
                          <div>
                            <h4 className="font-bold text-red-800 mb-2">The Power of Sacrifice</h4>
                            <p className="text-sm text-red-700">
                              "Love enough to pursue it. Sacrifice comforts for growth." - True transformation requires
                              letting go of habits that no longer serve your highest self. Be honest about what must be
                              eliminated.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="flex justify-between items-center pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                      disabled={currentStep === 0}
                      className="rounded-2xl"
                    >
                      ← Previous
                    </Button>

                    <Button
                      className="bg-green-500 hover:bg-green-600 text-white rounded-2xl px-8"
                      onClick={() => {
                        if (currentStep < 4) {
                          setCurrentStep(currentStep + 1)
                        } else {
                          // Complete onboarding
                          document.getElementById("integrations")?.scrollIntoView({ behavior: "smooth" })
                        }
                      }}
                    >
                      {currentStep === 4 ? "Complete Setup" : "Next"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                // Contract Signing Step
                <div className="space-y-6">
                  <Card className="rounded-3xl bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                        🏛️ Gryt Year Transformation Contract
                      </h3>

                      <div className="space-y-4 text-sm text-gray-700">
                        <div className="p-4 bg-white rounded-2xl">
                          <h4 className="font-bold text-green-600 mb-2">My Commitment Goal:</h4>
                          <p className="italic">"{onboardingData.goal || "Not specified"}"</p>
                        </div>

                        <div className="p-4 bg-white rounded-2xl">
                          <h4 className="font-bold text-blue-600 mb-2">My Why & Motivation:</h4>
                          <p className="italic">"{onboardingData.motivation || "Not specified"}"</p>
                        </div>

                        <div className="p-4 bg-white rounded-2xl">
                          <h4 className="font-bold text-red-600 mb-2">Habits I Will Sacrifice:</h4>
                          <p className="italic">"{onboardingData.sacrifices || "Not specified"}"</p>
                        </div>

                        <div className="p-4 bg-white rounded-2xl">
                          <h4 className="font-bold text-purple-600 mb-2">Daily Habits I Will Build:</h4>
                          <p className="italic">"{onboardingData.habits || "Not specified"}"</p>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-yellow-50 rounded-2xl border-2 border-yellow-200">
                        <h4 className="font-bold text-yellow-800 mb-2">📋 Sacred Commitment:</h4>
                        <p className="text-sm text-yellow-700 leading-relaxed">
                          I commit to this 365-day journey of transformation. I understand that growth requires both the
                          discipline to build new habits and the courage to sacrifice old ones. I will love enough to
                          pursue my goals, believe deeply in God's purpose for my life, and maintain unwavering
                          self-belief as I transform my mind, body, and spirit.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Digital Signature Section */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Digital Signature *</label>
                      <Input
                        placeholder="Type your full name as your digital signature"
                        value={onboardingData.signature}
                        onChange={(e) =>
                          setOnboardingData((prev) => ({
                            ...prev,
                            signature: e.target.value,
                            signatureDate: new Date().toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }),
                          }))
                        }
                        className="rounded-2xl border-2 border-gray-200 focus:border-purple-500 text-lg font-cursive"
                        style={{ fontFamily: "cursive" }}
                      />
                    </div>

                    {onboardingData.signature && (
                      <div className="text-center p-4 bg-green-50 rounded-2xl border-2 border-green-200">
                        <div className="text-lg font-cursive text-green-800" style={{ fontFamily: "cursive" }}>
                          {onboardingData.signature}
                        </div>
                        <div className="text-sm text-green-600 mt-1">Signed on {onboardingData.signatureDate}</div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                      className="rounded-2xl"
                    >
                      ← Previous
                    </Button>

                    <Button
                      className="bg-purple-500 hover:bg-purple-600 text-white rounded-2xl px-8 disabled:opacity-50"
                      disabled={!onboardingData.signature}
                      onClick={() => {
                        // Save contract to localStorage (in production, this would save to database)
                        const contractData = {
                          ...onboardingData,
                          contractSigned: true,
                          contractDate: new Date().toISOString(),
                        }
                        localStorage.setItem("gryt-transformation-contract", JSON.stringify(contractData))

                        // Complete onboarding
                        document.getElementById("integrations")?.scrollIntoView({ behavior: "smooth" })
                      }}
                    >
                      {onboardingData.signature ? "🏛️ Complete Sacred Contract" : "📝 Sign to Continue"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Integrations Section */}
      <section id="integrations" className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-orange-500 text-white px-6 py-2 text-lg rounded-full mb-6">🔗 App Integrations</Badge>
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Connect Your Favorite Apps
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Automatically sync data from 50+ apps to track your habits effortlessly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {integrationCategories.map((category, index) => (
              <Card
                key={index}
                className="rounded-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mb-4`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.apps.map((app, appIndex) => (
                      <div key={appIndex} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-2xl">
                        <span className="text-2xl">{app.icon}</span>
                        <span className="font-medium text-gray-700">{app.name}</span>
                        <Badge className="ml-auto bg-green-100 text-green-600 text-xs">Auto-sync</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Habit Examples Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-green-500 text-white px-6 py-2 text-lg rounded-full mb-6">✨ Popular Habits</Badge>
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Start With These Proven Habits
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands who are transforming their lives with these powerful daily habits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {habitExamples.map((habit, index) => (
              <Card
                key={index}
                className="rounded-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                      <habit.icon className={`h-6 w-6 ${habit.color}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{habit.name}</h3>
                      <p className="text-sm text-gray-600">{habit.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Badge className="bg-blue-100 text-blue-600 text-xs">Trackable</Badge>
                    <div className="flex items-center space-x-1">
                      <Flame className="h-4 w-4 text-orange-500" />
                      <span className="text-sm text-gray-600">Build streaks</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-6xl mb-6">🚀</div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: "Montserrat, sans-serif" }}>
              Ready to Transform Your Life?
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90">
              Join thousands who are building life-changing habits with Gryt.
              <br />
              <span className="font-bold">Start seeing results in just 90 days!</span>
            </p>
          </div>

          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 px-12 py-6 text-xl font-bold rounded-full shadow-xl transform hover:scale-105 transition-all"
          >
            🎯 Start Your Transformation
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>

          <div className="mt-12 flex justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Secure & Private</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sync className="h-5 w-5" />
              <span className="text-sm">Real-time Sync</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5" />
              <span className="text-sm">Loved by 10k+ Users</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
