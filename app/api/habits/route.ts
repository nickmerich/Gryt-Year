import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"
import { getCurrentUserId } from "@/lib/auth"

// Get all habits for current user
export async function GET(request: Request) {
  try {
    const supabase = createServerSupabaseClient()
    const userId = await getCurrentUserId()

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    const { data: habits, error } = await supabase
      .from("habits")
      .select(`
        *,
        habit_completions(
          date,
          completed,
          value,
          notes
        )
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to fetch habits" }, { status: 500 })
    }

    // Transform data to match our Habit type
    const today = new Date().toISOString().split("T")[0]
    const transformedHabits = habits.map((habit) => ({
      ...habit,
      completionHistory: habit.habit_completions || [],
      todayComplete:
        habit.habit_completions?.some((completion: any) => completion.date === today && completion.completed) || false,
    }))

    return NextResponse.json(transformedHabits)
  } catch (error) {
    console.error("Error fetching habits:", error)
    return NextResponse.json({ error: "Failed to fetch habits" }, { status: 500 })
  }
}

// Create a new habit
export async function POST(request: Request) {
  try {
    const supabase = createServerSupabaseClient()
    const userId = await getCurrentUserId()

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    const habitData = await request.json()

    // Validate and sanitize input
    const requiredFields = ["title", "category"]
    for (const field of requiredFields) {
      if (!habitData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    const allowedCategories = ["physical", "mental", "spiritual", "professional", "family", "nutrition"]
    if (!allowedCategories.includes(habitData.category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 })
    }

    const { data: newHabit, error } = await supabase
      .from("habits")
      .insert({
        user_id: userId,
        title: habitData.title,
        description: habitData.description || null,
        category: habitData.category,
        frequency: habitData.frequency || "daily",
        target_value: habitData.target_value || 1,
        unit: habitData.unit || null,
        xp_reward: habitData.xp_reward || 10,
        integration: habitData.integration || null,
        streak: 0,
        longest_streak: 0,
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to create habit" }, { status: 500 })
    }

    return NextResponse.json(newHabit)
  } catch (error) {
    console.error("Error creating habit:", error)
    return NextResponse.json({ error: "Failed to create habit" }, { status: 500 })
  }
}
