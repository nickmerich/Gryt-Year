import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"
import { getCurrentUserId, sanitizeUUID } from "@/lib/auth"

// Mark a habit as complete for today
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerSupabaseClient()
    const userId = await getCurrentUserId()

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    const habitId = sanitizeUUID(params.id)
    if (!habitId) {
      return NextResponse.json({ error: "Invalid habit ID" }, { status: 400 })
    }

    const { value, notes } = await request.json()
    const today = new Date().toISOString().split("T")[0]

    // Verify habit belongs to user
    const { data: habit, error: habitError } = await supabase
      .from("habits")
      .select("id, xp_reward")
      .eq("id", habitId)
      .eq("user_id", userId)
      .single()

    if (habitError || !habit) {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 })
    }

    // Insert or update habit completion
    const { error: completionError } = await supabase.from("habit_completions").upsert({
      habit_id: habitId,
      user_id: userId,
      date: today,
      completed: true,
      value: value || 1,
      notes: notes || "",
    })

    if (completionError) {
      console.error("Supabase completion error:", completionError)
      return NextResponse.json({ error: "Failed to complete habit" }, { status: 500 })
    }

    // Calculate new streak
    const { data: completions, error: historyError } = await supabase
      .from("habit_completions")
      .select("date, completed")
      .eq("habit_id", habitId)
      .eq("completed", true)
      .order("date", { ascending: false })
      .limit(100)

    if (historyError) {
      console.error("Supabase history error:", historyError)
      return NextResponse.json({ error: "Failed to calculate streak" }, { status: 500 })
    }

    // Calculate streak
    let newStreak = 0
    const sortedDates = completions
      .map((c) => c.date)
      .sort()
      .reverse()

    for (let i = 0; i < sortedDates.length; i++) {
      const currentDate = new Date(sortedDates[i])
      const expectedDate = new Date()
      expectedDate.setDate(expectedDate.getDate() - i)

      if (currentDate.toISOString().split("T")[0] === expectedDate.toISOString().split("T")[0]) {
        newStreak++
      } else {
        break
      }
    }

    // Update habit with new streak
    const { data: updatedHabit, error: updateError } = await supabase
      .from("habits")
      .update({
        streak: newStreak,
        longest_streak:
          newStreak > 0 ? supabase.sql`GREATEST(longest_streak, ${newStreak})` : supabase.sql`longest_streak`,
      })
      .eq("id", habitId)
      .select()
      .single()

    if (updateError) {
      console.error("Supabase update error:", updateError)
      return NextResponse.json({ error: "Failed to update habit" }, { status: 500 })
    }

    // Update user XP
    const xpReward = habit.xp_reward || 10
    const { error: xpError } = await supabase.from("user_xp").upsert({
      user_id: userId,
      total_xp: supabase.sql`COALESCE(total_xp, 0) + ${xpReward}`,
      updated_at: new Date().toISOString(),
    })

    if (xpError) {
      console.error("Supabase XP error:", xpError)
      // Don't fail the request for XP errors
    }

    return NextResponse.json(updatedHabit)
  } catch (error) {
    console.error("Error completing habit:", error)
    return NextResponse.json({ error: "Failed to complete habit" }, { status: 500 })
  }
}
