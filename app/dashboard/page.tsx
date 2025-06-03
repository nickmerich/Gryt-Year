"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DashboardMetrics } from "@/components/dashboard/dashboard-metrics"
import { PillarProgress } from "@/components/dashboard/pillar-progress"
import { GoalTracker } from "@/components/dashboard/goal-tracker"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { GuideSymbol } from "@/components/guide-symbol"
import { GuideMessage } from "@/components/guide-message"
import {
  Home,
  Target,
  Trophy,
  Calendar,
  User,
  Bell,
  Search,
  Menu,
  Compass,
  Star,
  Flame,
  TrendingUp,
} from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                <Compass className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  Gryt Year
                </h1>
                <div className="text-xs text-gray-500">Your Transformation Dashboard</div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>Goals</span>
              </Button>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Trophy className="h-4 w-4" />
                <span>Achievements</span>
              </Button>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Journey</span>
              </Button>
            </nav>

            {/* User actions */}
            <div className="flex items-center space-x-4">
              <Button size="sm" variant="ghost" className="h-10 w-10 p-0 rounded-full">
                <Search className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="h-10 w-10 p-0 rounded-full relative">
                <Bell className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>
              <Button size="sm" variant="ghost" className="h-10 w-10 p-0 rounded-full">
                <User className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="md:hidden h-10 w-10 p-0 rounded-full">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
                🚀 Welcome back, Demo User!
              </h1>
              <p className="text-lg text-gray-600">Day 45 of your Gryt Year transformation journey</p>
            </div>
            <div className="hidden lg:block">
              <GuideSymbol
                variant="dashboard"
                showMessage={true}
                message="Great progress today! Keep building those habits! 💪"
              />
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="rounded-2xl shadow-md border-0 bg-gradient-to-br from-yellow-50 to-yellow-100">
              <CardContent className="p-4 text-center">
                <Star className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-600">12,450</div>
                <div className="text-xs text-gray-600">Total XP</div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl shadow-md border-0 bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-4 text-center">
                <Flame className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">45</div>
                <div className="text-xs text-gray-600">Day Streak</div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl shadow-md border-0 bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-4 text-center">
                <Trophy className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">8</div>
                <div className="text-xs text-gray-600">Achievements</div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl shadow-md border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">68%</div>
                <div className="text-xs text-gray-600">Goals Progress</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Guide Message */}
        <div className="mb-8">
          <GuideMessage
            message="🎯 You're crushing it! Your spiritual streak is at 45 days - that's incredible dedication. Today's focus: complete your marathon training run and spend quality time with family. You've got this! 💪"
            type="motivation"
          />
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 rounded-3xl bg-white p-2 shadow-lg">
            <TabsTrigger
              value="overview"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              📊 Overview
            </TabsTrigger>
            <TabsTrigger
              value="pillars"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              🏛️ Pillars
            </TabsTrigger>
            <TabsTrigger
              value="goals"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              🎯 Goals
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="rounded-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              ⚡ Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <DashboardMetrics />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <GoalTracker limit={4} />
              </div>
              <div className="space-y-6">
                <ActivityFeed limit={6} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pillars" className="space-y-8">
            <PillarProgress />
          </TabsContent>

          <TabsContent value="goals" className="space-y-8">
            <GoalTracker />
          </TabsContent>

          <TabsContent value="activity" className="space-y-8">
            <ActivityFeed />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
