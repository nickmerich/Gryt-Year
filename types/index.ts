// User types
export interface User {
  id: string // UUID
  email: string
  name: string
  bio?: string
  profile_image_url?: string
  settings: UserSettings
  created_at: string
  updated_at: string
}

export interface UserSettings {
  notifications: {
    email: boolean
    push: boolean
    dailyReminder: boolean
    weeklyReflection: boolean
    achievements: boolean
    streakAlerts: boolean
  }
  privacy: {
    shareProgress: boolean
    shareAchievements: boolean
    publicProfile: boolean
    dataCollection: boolean
  }
  theme: "light" | "dark" | "system"
  timeZone: string
}

// Habit types
export interface Habit {
  id: string // UUID
  user_id: string // UUID
  title: string
  description?: string
  category: PillarType
  frequency: "daily" | "weekly" | "monthly"
  target_value: number
  unit?: string
  streak: number
  longest_streak: number
  xp_reward: number
  integration?: IntegrationConfig
  created_at: string
  updated_at: string
  // Computed fields
  completionHistory?: HabitCompletion[]
  todayComplete?: boolean
}

export interface HabitCompletion {
  id?: string // UUID
  habit_id: string // UUID
  user_id: string // UUID
  date: string
  completed: boolean
  value?: number
  notes?: string
  created_at?: string
}

// Goal types
export interface Goal {
  id: string // UUID
  user_id: string // UUID
  title: string
  description?: string
  category: PillarType
  target_value: number
  current_value: number
  unit?: string
  target_date?: string
  status: "active" | "completed" | "paused" | "cancelled"
  created_at: string
  updated_at: string
}

// Sacrifice types
export interface Sacrifice {
  id: string // UUID
  user_id: string // UUID
  title: string
  description?: string
  category: string
  avoidance_streak: number
  longest_avoidance_streak: number
  created_at: string
  updated_at: string
  avoidanceHistory?: SacrificeAvoidance[]
}

export interface SacrificeAvoidance {
  id?: string // UUID
  sacrifice_id: string // UUID
  user_id: string // UUID
  date: string
  avoided: boolean
  notes?: string
  created_at?: string
}

// Contract types
export interface Contract {
  id: string // UUID
  user_id: string // UUID
  goal: string
  motivation: string
  sacrifices: string
  habits: string
  signature: string
  signature_date: string
  blob_url?: string
  created_at: string
}

// Insight types
export interface Insight {
  id: string // UUID
  user_id: string // UUID
  type: "strength" | "opportunity" | "pattern" | "recommendation"
  title: string
  description: string
  confidence: number
  status: "new" | "read" | "dismissed"
  created_at: string
}

// Integration types
export interface IntegrationSource {
  id?: string // UUID
  user_id?: string // UUID
  type: IntegrationType
  status: "connected" | "disconnected" | "error"
  last_synced?: string
  auth_data?: any
  created_at?: string
  updated_at?: string
}

export interface IntegrationConfig {
  type: IntegrationType
  dataType: string
}

export type IntegrationType = "apple-health" | "myfitnesspal" | "strava" | "kindle" | "rescuetime" | "goodreads"

// Pillar types
export type PillarType = "physical" | "mental" | "spiritual" | "professional" | "family" | "nutrition"

export const PILLAR_COLORS = {
  physical: { bg: "bg-red-500", text: "text-red-600", light: "bg-red-50" },
  mental: { bg: "bg-blue-500", text: "text-blue-600", light: "bg-blue-50" },
  spiritual: { bg: "bg-purple-500", text: "text-purple-600", light: "bg-purple-50" },
  professional: { bg: "bg-green-500", text: "text-green-600", light: "bg-green-50" },
  family: { bg: "bg-orange-500", text: "text-orange-600", light: "bg-orange-50" },
  nutrition: { bg: "bg-yellow-500", text: "text-yellow-600", light: "bg-yellow-50" },
} as const

// User XP types
export interface UserXP {
  user_id: string // UUID
  total_xp: number
  level: number
  updated_at: string
}
