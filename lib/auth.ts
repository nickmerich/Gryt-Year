import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase"

// For demo purposes, we'll use a fixed UUID when Supabase isn't configured
const DEMO_USER_ID = "550e8400-e29b-41d4-a716-446655440000"

export async function getCurrentUserId(): Promise<string | null> {
  try {
    // If Supabase isn't configured, return demo user ID
    if (!isSupabaseConfigured()) {
      console.warn("Supabase not configured, using demo user ID")
      return DEMO_USER_ID
    }

    const supabase = createServerSupabaseClient()

    // In a real app, you would get this from the session
    // For now, we'll try to get the first user from the database
    const { data: user, error } = await supabase
      .from("users")
      .select("id")
      .eq("email", "alex@grytplatform.com")
      .single()

    if (error || !user) {
      console.warn("No user found, using demo user ID")
      return DEMO_USER_ID
    }

    return user.id
  } catch (error) {
    console.error("Error getting current user ID:", error)
    return DEMO_USER_ID
  }
}

export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

export function sanitizeUUID(uuid: string): string | null {
  if (!uuid || typeof uuid !== "string") {
    return null
  }

  const cleanUuid = uuid.trim()
  return isValidUUID(cleanUuid) ? cleanUuid : null
}

export function generateDemoData() {
  return {
    userId: DEMO_USER_ID,
    stats: {
      completedToday: 2,
      totalHabits: 4,
      currentStreak: 12,
      weeklyAverage: 85,
      totalXp: 1250,
    },
    activeHabits: [
      {
        id: "550e8400-e29b-41d4-a716-446655440001",
        user_id: DEMO_USER_ID,
        title: "Morning Exercise",
        description: "30 minutes of cardio",
        category: "physical" as const,
        frequency: "daily" as const,
        target_value: 1,
        streak: 12,
        longest_streak: 15,
        xp_reward: 15,
        created_at: "2024-12-20T00:00:00Z",
        updated_at: "2024-12-27T00:00:00Z",
        todayComplete: true,
        completionHistory: [],
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440002",
        user_id: DEMO_USER_ID,
        title: "Reading",
        description: "Read for 30 minutes",
        category: "mental" as const,
        frequency: "daily" as const,
        target_value: 1,
        streak: 8,
        longest_streak: 20,
        xp_reward: 10,
        created_at: "2024-12-20T00:00:00Z",
        updated_at: "2024-12-27T00:00:00Z",
        todayComplete: false,
        completionHistory: [],
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440003",
        user_id: DEMO_USER_ID,
        title: "Healthy Eating",
        description: "Track nutrition goals",
        category: "nutrition" as const,
        frequency: "daily" as const,
        target_value: 1,
        streak: 15,
        longest_streak: 25,
        xp_reward: 12,
        created_at: "2024-12-20T00:00:00Z",
        updated_at: "2024-12-27T00:00:00Z",
        todayComplete: true,
        completionHistory: [],
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440004",
        user_id: DEMO_USER_ID,
        title: "Meditation",
        description: "10 minutes of mindfulness",
        category: "spiritual" as const,
        frequency: "daily" as const,
        target_value: 1,
        streak: 5,
        longest_streak: 10,
        xp_reward: 8,
        created_at: "2024-12-20T00:00:00Z",
        updated_at: "2024-12-27T00:00:00Z",
        todayComplete: false,
        completionHistory: [],
      },
    ],
    activeGoals: [],
    activeSacrifices: [],
    recentInsights: [
      {
        id: "550e8400-e29b-41d4-a716-446655440010",
        user_id: DEMO_USER_ID,
        type: "strength" as const,
        title: "Consistency Champion",
        description: "Your exercise streak is impressive! You've maintained it for 12 days straight.",
        confidence: 0.95,
        status: "new" as const,
        created_at: "2024-12-27T00:00:00Z",
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440011",
        user_id: DEMO_USER_ID,
        type: "opportunity" as const,
        title: "Reading Opportunity",
        description: "You tend to skip reading on busy days. Try setting a specific time for this habit.",
        confidence: 0.8,
        status: "new" as const,
        created_at: "2024-12-27T00:00:00Z",
      },
    ],
  }
}
