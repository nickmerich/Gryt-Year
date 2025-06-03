"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Crown,
  Award,
  Star,
  Flame,
  Brain,
  User,
  Church,
  TrendingUp,
  Users,
  Apple,
  Zap,
  Heart,
  Mountain,
  BookOpen,
  CheckCircle,
  Sparkles,
} from "lucide-react"

interface Achievement {
  id: string
  name: string
  description: string
  icon: any
  category: "spiritual" | "physical" | "mental" | "professional" | "family" | "nutrition" | "special"
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond"
  xp: number
  unlocked: boolean
  progress: number
  maxProgress: number
  unlockedDate?: string
  rarity: "common" | "rare" | "epic" | "legendary"
}

const achievements: Achievement[] = [
  // Spiritual Achievements
  {
    id: "prayer-warrior",
    name: "Prayer Warrior",
    description: "Complete 30 days of daily prayer",
    icon: Church,
    category: "spiritual",
    tier: "gold",
    xp: 500,
    unlocked: true,
    progress: 30,
    maxProgress: 30,
    unlockedDate: "2024-01-15",
    rarity: "epic",
  },
  {
    id: "scripture-scholar",
    name: "Scripture Scholar",
    description: "Read 100 Bible verses",
    icon: BookOpen,
    category: "spiritual",
    tier: "silver",
    xp: 250,
    unlocked: true,
    progress: 100,
    maxProgress: 100,
    unlockedDate: "2024-01-20",
    rarity: "rare",
  },
  {
    id: "faith-mountain",
    name: "Faith Mountain",
    description: "Complete 7-day spiritual retreat",
    icon: Mountain,
    category: "spiritual",
    tier: "platinum",
    xp: 1000,
    unlocked: false,
    progress: 3,
    maxProgress: 7,
    rarity: "legendary",
  },

  // Physical Achievements
  {
    id: "marathon-master",
    name: "Marathon Master",
    description: "Complete a full marathon (26.2 miles)",
    icon: Trophy,
    category: "physical",
    tier: "diamond",
    xp: 2000,
    unlocked: false,
    progress: 18.5,
    maxProgress: 26.2,
    rarity: "legendary",
  },
  {
    id: "fitness-streak",
    name: "Fitness Fanatic",
    description: "Exercise for 21 consecutive days",
    icon: Flame,
    category: "physical",
    tier: "gold",
    xp: 750,
    unlocked: true,
    progress: 21,
    maxProgress: 21,
    unlockedDate: "2024-02-01",
    rarity: "epic",
  },
  {
    id: "strength-builder",
    name: "Strength Builder",
    description: "Increase max weight by 50lbs",
    icon: User,
    category: "physical",
    tier: "silver",
    xp: 300,
    unlocked: false,
    progress: 35,
    maxProgress: 50,
    rarity: "rare",
  },

  // Mental Achievements
  {
    id: "mindful-master",
    name: "Mindful Master",
    description: "Complete 100 meditation sessions",
    icon: Brain,
    category: "mental",
    tier: "gold",
    xp: 600,
    unlocked: false,
    progress: 67,
    maxProgress: 100,
    rarity: "epic",
  },
  {
    id: "journal-genius",
    name: "Journal Genius",
    description: "Write 50 journal entries",
    icon: BookOpen,
    category: "mental",
    tier: "silver",
    xp: 400,
    unlocked: true,
    progress: 50,
    maxProgress: 50,
    unlockedDate: "2024-01-25",
    rarity: "rare",
  },
  {
    id: "wisdom-seeker",
    name: "Wisdom Seeker",
    description: "Read 12 personal development books",
    icon: Star,
    category: "mental",
    tier: "platinum",
    xp: 1200,
    unlocked: false,
    progress: 8,
    maxProgress: 12,
    rarity: "legendary",
  },

  // Professional Achievements
  {
    id: "revenue-rocket",
    name: "Revenue Rocket",
    description: "Increase income by 25%",
    icon: TrendingUp,
    category: "professional",
    tier: "gold",
    xp: 800,
    unlocked: false,
    progress: 15,
    maxProgress: 25,
    rarity: "epic",
  },
  {
    id: "skill-master",
    name: "Skill Master",
    description: "Complete 5 professional certifications",
    icon: Award,
    category: "professional",
    tier: "platinum",
    xp: 1500,
    unlocked: false,
    progress: 2,
    maxProgress: 5,
    rarity: "legendary",
  },

  // Family Achievements
  {
    id: "family-first",
    name: "Family First",
    description: "Spend quality time with family 30 days",
    icon: Users,
    category: "family",
    tier: "gold",
    xp: 500,
    unlocked: true,
    progress: 30,
    maxProgress: 30,
    unlockedDate: "2024-02-10",
    rarity: "epic",
  },
  {
    id: "love-champion",
    name: "Love Champion",
    description: "Express gratitude to family 100 times",
    icon: Heart,
    category: "family",
    tier: "silver",
    xp: 350,
    unlocked: false,
    progress: 73,
    maxProgress: 100,
    rarity: "rare",
  },

  // Nutrition Achievements
  {
    id: "clean-eating",
    name: "Clean Eating Champion",
    description: "Eat healthy meals for 30 days",
    icon: Apple,
    category: "nutrition",
    tier: "gold",
    xp: 600,
    unlocked: false,
    progress: 22,
    maxProgress: 30,
    rarity: "epic",
  },
  {
    id: "hydration-hero",
    name: "Hydration Hero",
    description: "Drink 8 glasses of water daily for 14 days",
    icon: Zap,
    category: "nutrition",
    tier: "bronze",
    xp: 200,
    unlocked: true,
    progress: 14,
    maxProgress: 14,
    unlockedDate: "2024-01-30",
    rarity: "common",
  },

  // Special Achievements
  {
    id: "gryt-founder",
    name: "Gryt Founder",
    description: "Join the Gryt Year community",
    icon: Crown,
    category: "special",
    tier: "diamond",
    xp: 100,
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    unlockedDate: "2024-01-01",
    rarity: "legendary",
  },
  {
    id: "streak-legend",
    name: "Streak Legend",
    description: "Maintain a 100-day streak",
    icon: Flame,
    category: "special",
    tier: "diamond",
    xp: 3000,
    unlocked: false,
    progress: 45,
    maxProgress: 100,
    rarity: "legendary",
  },
]

const getTierColor = (tier: string) => {
  switch (tier) {
    case "bronze":
      return "from-amber-600 to-amber-800"
    case "silver":
      return "from-gray-400 to-gray-600"
    case "gold":
      return "from-yellow-400 to-yellow-600"
    case "platinum":
      return "from-purple-400 to-purple-600"
    case "diamond":
      return "from-blue-400 to-cyan-400"
    default:
      return "from-gray-300 to-gray-500"
  }
}

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "common":
      return "text-gray-600 bg-gray-100"
    case "rare":
      return "text-blue-600 bg-blue-100"
    case "epic":
      return "text-purple-600 bg-purple-100"
    case "legendary":
      return "text-yellow-600 bg-yellow-100"
    default:
      return "text-gray-600 bg-gray-100"
  }
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "spiritual":
      return Church
    case "physical":
      return User
    case "mental":
      return Brain
    case "professional":
      return TrendingUp
    case "family":
      return Users
    case "nutrition":
      return Apple
    case "special":
      return Crown
    default:
      return Star
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "spiritual":
      return "bg-yellow-500"
    case "physical":
      return "bg-blue-500"
    case "mental":
      return "bg-purple-500"
    case "professional":
      return "bg-green-500"
    case "family":
      return "bg-pink-500"
    case "nutrition":
      return "bg-orange-500"
    case "special":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

export function AchievementSystem() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const unlockedAchievements = achievements.filter((a) => a.unlocked)
  const totalXP = unlockedAchievements.reduce((sum, a) => sum + a.xp, 0)
  const completionRate = Math.round((unlockedAchievements.length / achievements.length) * 100)

  const filteredAchievements =
    selectedCategory === "all" ? achievements : achievements.filter((a) => a.category === selectedCategory)

  const categories = [
    { id: "all", name: "All", icon: Star, count: achievements.length },
    {
      id: "spiritual",
      name: "Spiritual",
      icon: Church,
      count: achievements.filter((a) => a.category === "spiritual").length,
    },
    {
      id: "physical",
      name: "Physical",
      icon: User,
      count: achievements.filter((a) => a.category === "physical").length,
    },
    { id: "mental", name: "Mental", icon: Brain, count: achievements.filter((a) => a.category === "mental").length },
    {
      id: "professional",
      name: "Professional",
      icon: TrendingUp,
      count: achievements.filter((a) => a.category === "professional").length,
    },
    { id: "family", name: "Family", icon: Users, count: achievements.filter((a) => a.category === "family").length },
    {
      id: "nutrition",
      name: "Nutrition",
      icon: Apple,
      count: achievements.filter((a) => a.category === "nutrition").length,
    },
    { id: "special", name: "Special", icon: Crown, count: achievements.filter((a) => a.category === "special").length },
  ]

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Stats */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
            <Trophy className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
          🏆 Achievement Collection
        </h1>
        <p className="text-lg text-gray-600 mb-6">Track your transformation journey with badges and trophies!</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <Card className="rounded-3xl shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600">{unlockedAchievements.length}</div>
              <div className="text-sm text-gray-600">Badges Earned</div>
              <div className="text-xs text-gray-500 mt-1">of {achievements.length} total</div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">{totalXP.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total XP</div>
              <div className="text-xs text-gray-500 mt-1">Experience Points</div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600">{completionRate}%</div>
              <div className="text-sm text-gray-600">Completion</div>
              <div className="text-xs text-gray-500 mt-1">Collection Progress</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 rounded-2xl bg-gray-100 p-1">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm flex flex-col items-center gap-1 py-3"
              >
                <IconComponent className="h-4 w-4" />
                <span className="text-xs font-medium">{category.name}</span>
                <Badge className="text-xs px-1 py-0 h-4 min-w-4 rounded-full bg-gray-200 text-gray-600">
                  {category.count}
                </Badge>
              </TabsTrigger>
            )
          })}
        </TabsList>
      </Tabs>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAchievements.map((achievement) => {
          const IconComponent = achievement.icon
          const CategoryIcon = getCategoryIcon(achievement.category)
          const isUnlocked = achievement.unlocked
          const progressPercentage = (achievement.progress / achievement.maxProgress) * 100

          return (
            <Card
              key={achievement.id}
              className={`rounded-3xl shadow-lg border-0 overflow-hidden transform hover:scale-105 transition-all ${
                isUnlocked ? "bg-white" : "bg-gray-50"
              }`}
            >
              {/* Tier indicator bar */}
              <div className={`h-2 bg-gradient-to-r ${getTierColor(achievement.tier)}`}></div>

              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isUnlocked ? `bg-gradient-to-br ${getTierColor(achievement.tier)}` : "bg-gray-300"
                      }`}
                    >
                      <IconComponent className={`h-6 w-6 ${isUnlocked ? "text-white" : "text-gray-500"}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg ${isUnlocked ? "text-gray-900" : "text-gray-500"}`}>
                        {achievement.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={`text-xs px-2 py-1 rounded-full ${getRarityColor(achievement.rarity)}`}>
                          {achievement.rarity}
                        </Badge>
                        <Badge
                          className={`${getCategoryColor(achievement.category)} text-white text-xs px-2 py-1 rounded-full`}
                        >
                          <CategoryIcon className="h-3 w-3 mr-1" />
                          {achievement.category}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {isUnlocked && (
                    <div className="flex flex-col items-center">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className={`text-sm mb-4 ${isUnlocked ? "text-gray-700" : "text-gray-500"}`}>
                  {achievement.description}
                </p>

                {/* Progress */}
                {!isUnlocked && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Progress</span>
                      <span className="text-sm text-gray-600">
                        {achievement.progress} / {achievement.maxProgress}
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2 rounded-full" />
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className={`h-4 w-4 ${isUnlocked ? "text-yellow-500" : "text-gray-400"}`} />
                    <span className={`text-sm font-bold ${isUnlocked ? "text-gray-900" : "text-gray-500"}`}>
                      {achievement.xp} XP
                    </span>
                  </div>

                  {isUnlocked && achievement.unlockedDate && (
                    <div className="text-xs text-gray-500">
                      Earned {new Date(achievement.unlockedDate).toLocaleDateString()}
                    </div>
                  )}

                  {!isUnlocked && (
                    <div className="text-xs text-gray-500">{Math.round(progressPercentage)}% complete</div>
                  )}
                </div>

                {/* Tier badge */}
                <div className="mt-4 flex justify-center">
                  <Badge
                    className={`bg-gradient-to-r ${getTierColor(achievement.tier)} text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide`}
                  >
                    {achievement.tier}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Achievements */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">🎉 Recent Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {unlockedAchievements
            .sort((a, b) => new Date(b.unlockedDate!).getTime() - new Date(a.unlockedDate!).getTime())
            .slice(0, 3)
            .map((achievement) => {
              const IconComponent = achievement.icon
              return (
                <Card
                  key={achievement.id}
                  className="rounded-3xl shadow-lg border-0 bg-gradient-to-br from-yellow-50 to-orange-50"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${getTierColor(achievement.tier)}`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{achievement.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-bold text-gray-700">{achievement.xp} XP</span>
                          <span className="text-xs text-gray-500">
                            {new Date(achievement.unlockedDate!).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
        </div>
      </div>
    </div>
  )
}
