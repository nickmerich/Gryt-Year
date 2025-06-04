import { NextResponse } from "next/server"
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase"
import { getCurrentUserId, generateDemoData } from "@/lib/auth"

// Get dashboard data
export async function GET(request: Request) {
  try {
    // If Supabase isn't configured, return demo data
    if (!isSupabaseConfigured()) {
      console.warn("Supabase not configured, returning demo data")
      return NextResponse.json(generateDemoData())
    }

    const supabase = createServerSupabaseClient()
    const userId = await getCurrentUserId()

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    const today = new Date().toISOString().split("T")[0]

    // Get habits with today's completions
    const { data: habits, error: habitsError } = await supabase
      .from("habits")
      .select(`
        *,
        habit_completions(date, completed, value, notes)
      `)
      .eq("user_id", userId)

    if (habitsError) {
      console.error("Supabase habits error:", habitsError)
      // Fallback to demo data if database query fails
      return NextResponse.json(generateDemoData())
    }

    // Get goals
    const { data: goals, error: goalsError } = await supabase
      .from("goals")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "active")

    if (goalsError) {
      console.error("Supabase goals error:", goalsError)
    }

    // Get sacrifices
    const { data: sacrifices, error: sacrificesError } = await supabase
      .from("sacrifices")
      .select("*")
      .eq("user_id", userId)

    if (sacrificesError) {
      console.error("Supabase sacrifices error:", sacrificesError)
    }

    // Get recent insights
    const { data: insights, error: insightsError } = await supabase
      .from("insights")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(3)

    if (insightsError) {
      console.error("Supabase insights error:", insightsError)
    }

    // Get user XP
    const { data: userXp, error: xpError } = await supabase.from("user_xp").select("*").eq("user_id", userId).single()

    if (xpError && xpError.code !== "PGRST116") {
      console.error("Supabase XP error:", xpError)
    }

    // Transform habits data
    const activeHabits = (habits || []).map((habit) => ({
      ...habit,
      completionHistory: habit.habit_completions || [],
      todayComplete:
        habit.habit_completions?.some((completion: any) => completion.date === today && completion.completed) || false,
    }))

    // Calculate stats
    const completedToday = activeHabits.filter((h) => h.todayComplete).length
    const totalHabits = activeHabits.length

    // Calculate current streak (simplified)
    const currentStreak = activeHabits.length > 0 ? Math.max(...activeHabits.map((h) => h.streak || 0), 0) : 0

    // Calculate weekly average
    const weeklyAverage = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0

    const dashboardData = {
      stats: {
        completedToday,
        totalHabits,
        currentStreak,
        weeklyAverage,
        totalXp: userXp?.total_xp || 0,
      },
      activeHabits,
      activeGoals: goals || [],
      activeSacrifices: sacrifices || [],
      recentInsights: insights || [],
    }

    return NextResponse.json(dashboardData)
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    // Return demo data as fallback
    return NextResponse.json(generateDemoData())
  }
}
