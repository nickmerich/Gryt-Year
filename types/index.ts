// Core User Types
export interface User {
  id: string
  email: string
  name: string
  createdAt: string
  profileImageUrl?: string
  settings: UserSettings
}

export interface UserSettings {
  notifications: NotificationSettings
  privacy: PrivacySettings
  theme: "light" | "dark" | "system"
  timeZone: string
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  dailyReminder: boolean
  weeklyReflection: boolean
  achievements: boolean
  streakAlerts: boolean
}

export interface PrivacySettings {
  shareProgress: boolean
  shareAchievements: boolean
  publicProfile: boolean
  dataCollection: boolean
}

// Goal and Habit Types
export interface Goal {
  id: string
  userId: string
  title: string
  description: string
  category: PillarType
  targetValue: number
  currentValue: number
  unit: string
  startDate: string
  targetDate: string
  status: "active" | "completed" | "paused"
  priority: "high" | "medium" | "low"
  xpReward: number
  habits: string[] // References to habit IDs
  sacrifices: string[] // References to sacrifice IDs
}

export interface Habit {
  id: string
  userId: string
  title: string
  description: string
  category: PillarType
  frequency: "daily" | "weekly" | "custom"
  customFrequency?: string
  timeOfDay?: string
  streak: number
  longestStreak: number
  completionHistory: HabitCompletion[]
  integration?: IntegrationSource
  xpReward: number
  reminderTime?: string
}

export interface HabitCompletion {
  date: string
  completed: boolean
  value?: number
  notes?: string
}

export interface Sacrifice {
  id: string
  userId: string
  title: string
  description: string
  category: PillarType
  avoidanceStreak: number
  longestAvoidanceStreak: number
  avoidanceHistory: SacrificeAvoidance[]
}

export interface SacrificeAvoidance {
  date: string
  avoided: boolean
  notes?: string
}

// Contract Types
export interface Contract {
  id: string
  userId: string
  createdAt: string
  goals: string[]
  habits: string[]
  sacrifices: string[]
  motivation: string
  signature: string
  signatureDate: string
  blobUrl?: string // URL to stored contract in Vercel Blob
}

// Integration Types
export interface IntegrationSource {
  type: "apple-health" | "myfitnesspal" | "kindle" | "rescuetime" | "strava" | "goodreads" | "manual"
  lastSynced?: string
  status: "connected" | "disconnected" | "error"
  errorMessage?: string
}

export interface IntegrationData {
  sourceId: string
  userId: string
  dataType: string
  value: any
  timestamp: string
  metadata?: Record<string, any>
}

// Analytics and Insights Types
export interface Insight {
  id: string
  userId: string
  type: "strength" | "opportunity" | "pattern" | "recommendation"
  title: string
  description: string
  category?: PillarType
  relatedHabits?: string[]
  relatedGoals?: string[]
  createdAt: string
  expiresAt?: string
  priority: "high" | "medium" | "low"
  status: "new" | "viewed" | "implemented" | "dismissed"
}

export interface Reflection {
  id: string
  userId: string
  weekNumber: number
  year: number
  completedAt: string
  overallPerformance: string
  challenges: string
  wins: string
  adjustments: string
  nextWeekGoals: string
  metrics: ReflectionMetrics
}

export interface ReflectionMetrics {
  overallProgress: number
  habitsCompleted: number
  totalHabits: number
  streakDays: number
  xpEarned: number
  habitPerformance: {
    habitId: string
    completionRate: number
    trend: "up" | "down" | "stable"
    trendValue: number
  }[]
}

// Enums and Constants
export type PillarType = "spiritual" | "physical" | "mental" | "professional" | "family" | "nutrition" | "special"

export const PILLAR_COLORS: Record<PillarType, { bg: string; text: string; light: string }> = {
  spiritual: { bg: "bg-yellow-500", text: "text-yellow-600", light: "bg-yellow-100" },
  physical: { bg: "bg-blue-500", text: "text-blue-600", light: "bg-blue-100" },
  mental: { bg: "bg-purple-500", text: "text-purple-600", light: "bg-purple-100" },
  professional: { bg: "bg-green-500", text: "text-green-600", light: "bg-green-100" },
  family: { bg: "bg-pink-500", text: "text-pink-600", light: "bg-pink-100" },
  nutrition: { bg: "bg-orange-500", text: "text-orange-600", light: "bg-orange-100" },
  special: { bg: "bg-red-500", text: "text-red-600", light: "bg-red-100" },
}
