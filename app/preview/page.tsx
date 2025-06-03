"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DashboardMetrics } from "@/components/dashboard/dashboard-metrics"
import { PillarProgress } from "@/components/dashboard/pillar-progress"
import { GoalTracker } from "@/components/dashboard/goal-tracker"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { GuideSymbol } from "@/components/guide-symbol"
import { GuideMessage } from "@/components/guide-message"
import {
  Play,
  ArrowRight,
  Star,
  Trophy,
  Target,
  Compass,
  Sparkles,
  CheckCircle,
  Calendar,
  TrendingUp,
} from "lucide-react"

export default function PreviewPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center">
                <Compass className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Gryt Year Preview
                </h1>
                <div className="text-xs text-gray-500">Experience Your Transformation Journey</div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-2xl">
                🎯 Start My Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 text-lg rounded-full mb-4">
              👀 Interactive Preview Experience
            </Badge>
          </div>

          <h1
            className="text-5xl md:text-6xl font-bold mb-6 text-gray-900"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Your Gryt Year
            <br />
            <span className="bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
              Transformation
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
            🚀 Explore what your transformation journey could look like with our interactive dashboard preview.
            <br />
            <span className="font-bold text-orange-600">✨ See your potential in action!</span>
          </p>

          {/* Preview Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <Card className="rounded-3xl shadow-lg border-0 bg-white">
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-yellow-600">50,000+</div>
                <div className="text-sm text-gray-600">XP to Earn</div>
              </CardContent>
            </Card>
            <Card className="rounded-3xl shadow-lg border-0 bg-white">
              <CardContent className="p-6 text-center">
                <Trophy className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-purple-600">120+</div>
                <div className="text-sm text-gray-600">Achievements</div>
              </CardContent>
            </Card>
            <Card className="rounded-3xl shadow-lg border-0 bg-white">
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-green-600">6</div>
                <div className="text-sm text-gray-600">Life Pillars</div>
              </CardContent>
            </Card>
            <Card className="rounded-3xl shadow-lg border-0 bg-white">
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-blue-600">365</div>
                <div className="text-sm text-gray-600">Days Journey</div>
              </CardContent>
            </Card>
          </div>

          {/* Floating Guide */}
          <div className="flex justify-center mb-8">
            <GuideSymbol
              variant="hero"
              showMessage={true}
              message="🎯 Welcome to your preview! Explore what your transformation journey could look like. Every feature you see here will be available when you start your Gryt Year!"
            />
          </div>
        </div>
      </section>

      {/* Preview Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Preview Notice */}
        <div className="mb-8">
          <Card className="rounded-3xl shadow-lg border-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">🎬 Interactive Preview Mode</h3>
                    <p className="text-blue-100">
                      This dashboard shows sample data to demonstrate your potential progress and achievements
                    </p>
                  </div>
                </div>
                <Button className="bg-white text-blue-600 hover:bg-gray-100 rounded-2xl">Start Real Journey →</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sample AI Guide Message */}
        <div className="mb-8">
          <GuideMessage
            message="🌟 This is what your daily motivation could look like! I'll be here every step of your journey, providing personalized guidance, celebrating your wins, and helping you stay on track. Ready to make this real?"
            type="motivation"
          />
        </div>

        {/* Preview Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 rounded-3xl bg-white p-2 shadow-lg">
            <TabsTrigger
              value="overview"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white"
            >
              📊 Overview
            </TabsTrigger>
            <TabsTrigger
              value="pillars"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white"
            >
              🏛️ Pillars
            </TabsTrigger>
            <TabsTrigger
              value="goals"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white"
            >
              🎯 Goals
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white"
            >
              🏆 Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <DashboardMetrics isPreview={true} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card className="rounded-3xl shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">🎯 Sample Goals Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Marathon Training</span>
                          <Badge className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs">Physical</Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">Complete a full marathon distance</div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">18.5 / 26.2 miles</span>
                          <span className="text-xs text-gray-500">70% complete</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: "70%" }}></div>
                        </div>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Daily Prayer Streak</span>
                          <Badge className="bg-yellow-500 text-white rounded-full px-2 py-1 text-xs">Spiritual</Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">Maintain consistent daily prayer</div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-500">45 / 100 days</span>
                          <span className="text-xs text-gray-500">45% complete</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 text-center">
                      <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-2xl">
                        🎯 Set Your Real Goals
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                <ActivityFeed isPreview={true} limit={4} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pillars" className="space-y-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">🏛️ Your 6 Life Pillars</h2>
              <p className="text-lg text-gray-600">
                See how you could progress across all areas of your life with daily tracking and AI guidance
              </p>
            </div>
            <PillarProgress isPreview={true} />
          </TabsContent>

          <TabsContent value="goals" className="space-y-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">🎯 Goal Tracking System</h2>
              <p className="text-lg text-gray-600">
                Experience our comprehensive goal tracking with progress monitoring and achievement rewards
              </p>
            </div>
            <GoalTracker isPreview={true} />
          </TabsContent>

          <TabsContent value="achievements" className="space-y-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">🏆 Achievement Collection</h2>
              <p className="text-lg text-gray-600">
                Discover the badges and trophies you could earn throughout your transformation journey
              </p>
            </div>

            {/* Sample Achievement Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Prayer Warrior",
                  desc: "30 days of daily prayer",
                  tier: "Gold",
                  xp: 500,
                  icon: "🙏",
                  unlocked: true,
                },
                {
                  name: "Fitness Fanatic",
                  desc: "21 consecutive workout days",
                  tier: "Gold",
                  xp: 750,
                  icon: "💪",
                  unlocked: true,
                },
                {
                  name: "Marathon Master",
                  desc: "Complete full marathon",
                  tier: "Diamond",
                  xp: 2000,
                  icon: "🏃",
                  unlocked: false,
                },
                {
                  name: "Wisdom Seeker",
                  desc: "Read 12 development books",
                  tier: "Platinum",
                  xp: 1200,
                  icon: "📚",
                  unlocked: false,
                },
                {
                  name: "Family Champion",
                  desc: "365 days quality time",
                  tier: "Gold",
                  xp: 1800,
                  icon: "👨‍👩‍👧‍👦",
                  unlocked: false,
                },
                {
                  name: "Gryt Founder",
                  desc: "Join the community",
                  tier: "Diamond",
                  xp: 100,
                  icon: "👑",
                  unlocked: true,
                },
              ].map((achievement, index) => (
                <Card
                  key={index}
                  className={`rounded-3xl shadow-lg border-0 overflow-hidden ${
                    achievement.unlocked ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <div
                    className={`h-2 ${
                      achievement.tier === "Diamond"
                        ? "bg-gradient-to-r from-blue-400 to-cyan-400"
                        : achievement.tier === "Platinum"
                          ? "bg-gradient-to-r from-purple-400 to-purple-600"
                          : "bg-gradient-to-r from-yellow-400 to-yellow-600"
                    }`}
                  ></div>
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{achievement.icon}</div>
                    <h3
                      className={`font-bold text-lg mb-2 ${achievement.unlocked ? "text-gray-900" : "text-gray-500"}`}
                    >
                      {achievement.name}
                    </h3>
                    <p className={`text-sm mb-4 ${achievement.unlocked ? "text-gray-700" : "text-gray-500"}`}>
                      {achievement.desc}
                    </p>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <Badge
                        className={`${
                          achievement.tier === "Diamond"
                            ? "bg-blue-500"
                            : achievement.tier === "Platinum"
                              ? "bg-purple-500"
                              : "bg-yellow-500"
                        } text-white rounded-full px-3 py-1 text-xs`}
                      >
                        {achievement.tier}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-bold">{achievement.xp} XP</span>
                      </div>
                    </div>
                    {achievement.unlocked && (
                      <div className="flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-sm text-green-600 font-medium">Unlocked!</span>
                        <Sparkles className="h-4 w-4 text-yellow-400 ml-2 animate-pulse" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="rounded-3xl shadow-xl border-0 bg-gradient-to-r from-green-500 via-blue-600 to-purple-700 text-white">
            <CardContent className="p-12">
              <div className="text-6xl mb-6">🚀</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Ready to Make This Real?
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
                🎯 You've seen the potential. Now it's time to unlock your transformation.
                <br />
                <span className="font-bold">✨ Your Gryt Year journey awaits!</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-12 py-6 text-xl font-bold rounded-2xl shadow-xl transform hover:scale-105 transition-all"
                >
                  🎯 Start My Gryt Year
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
                <Button
                  size="lg"
                  className="bg-white/20 border-2 border-white text-white hover:bg-white hover:text-purple-600 px-12 py-6 text-xl rounded-2xl shadow-xl transform hover:scale-105 transition-all"
                >
                  📞 Talk to Guide
                </Button>
              </div>

              <div className="mt-8 flex justify-center space-x-6">
                <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
                  <Trophy className="h-5 w-5 text-yellow-300" />
                  <span className="text-sm">120+ Achievements</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
                  <Star className="h-5 w-5 text-yellow-300" />
                  <span className="text-sm">50,000+ XP</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2">
                  <TrendingUp className="h-5 w-5 text-green-300" />
                  <span className="text-sm">365 Days Growth</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
