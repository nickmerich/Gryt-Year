import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import type { Habit, HabitCompletion } from "@/types"

// Mark a habit as complete for today
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const userId = "user_123" // Placeholder
    const habitId = params.id
    const { value, notes } = await request.json()

    // Get all habits
    const habits = await kv.lrange<Habit>(`user:${userId}:habits`, 0, -1)
    const habitIndex = habits.findIndex((h) => h.id === habitId)

    if (habitIndex === -1) {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 })
    }

    const habit = habits[habitIndex]
    const today = new Date().toISOString().split("T")[0]

    // Check if already completed today
    const todayCompletionIndex = habit.completionHistory.findIndex((c) => c.date.startsWith(today))

    let updatedHabit: Habit

    if (todayCompletionIndex !== -1) {
      // Update existing completion
      const updatedCompletions = [...habit.completionHistory]
      updatedCompletions[todayCompletionIndex] = {
        date: today,
        completed: true,
        value,
        notes,
      }

      updatedHabit = {
        ...habit,
        completionHistory: updatedCompletions,
      }
    } else {
      // Add new completion
      const newCompletion: HabitCompletion = {
        date: today,
        completed: true,
        value,
        notes,
      }

      // Calculate streak
      let newStreak = habit.streak
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().split("T")[0]

      const yesterdayCompleted = habit.completionHistory.some((c) => c.date.startsWith(yesterdayStr) && c.completed)

      if (yesterdayCompleted || habit.streak === 0) {
        newStreak += 1
      } else {
        newStreak = 1 // Reset streak
      }

      updatedHabit = {
        ...habit,
        completionHistory: [...habit.completionHistory, newCompletion],
        streak: newStreak,
        longestStreak: Math.max(newStreak, habit.longestStreak),
      }
    }

    // Update habit in KV store
    const updatedHabits = [...habits]
    updatedHabits[habitIndex] = updatedHabit

    await kv.del(`user:${userId}:habits`)
    await kv.rpush(`user:${userId}:habits`, ...updatedHabits)

    // Update user XP
    await kv.incrby(`user:${userId}:xp`, updatedHabit.xpReward)

    return NextResponse.json(updatedHabit)
  } catch (error) {
    console.error("Error completing habit:", error)
    return NextResponse.json({ error: "Failed to complete habit" }, { status: 500 })
  }
}
