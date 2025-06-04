import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import type { Habit, Goal, Sacrifice, Insight, User } from "@/types"

// Get dashboard data for current user
export async function GET(request: Request) {
  try {
    const userId = "user_123" // Placeholder

    // Fetch all user data in parallel
    const [user, habits, goals, sacrifices, insights, xp] = await Promise.all([
      kv.get<User>(`user:${userId}`),
      kv.lrange<Habit>(`user:${userId}:habits`, 0, -1),
      kv.lrange<Goal>(`user:${userId}:goals`, 0, -1),
      kv.lrange<Sacrifice>(`user:${userId}:sacrifices`, 0, -1),
      kv.lrange<Insight>(`user:${userId}:insights`, 0, -1),
      kv.get<number>(`user:${userId}:xp`) || 0,
    ])

    // Calculate metrics
    const today = new Date().toISOString().split("T")[0]

    const completedToday = habits.filter((habit) =>
      habit.completionHistory.some((c) => c.date.startsWith(today) && c.completed),
    ).length

    const totalHabits = habits.length

    // Calculate current streak
    let currentStreak = 0
    const now = new Date()

    for (let i = 0; i < 100; i++) {
      // Check up to 100 days back
      const checkDate = new Date(now)
      checkDate.setDate(now.getDate() - i)
      const dateStr = checkDate.toISOString().split("T")[0]

      const allHabitsCompleted = habits.every((habit) =>
        habit.completionHistory.some((c) => c.date.startsWith(dateStr) && c.completed),
      )

      if (allHabitsCompleted) {
        currentStreak++
      } else if (i > 0) {
        // Don't break on today
        break
      }
    }

    // Calculate weekly average
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    let totalCompletions = 0
    let totalPossible = 0

    for (let i = 0; i < 7; i++) {
      const checkDate = new Date(now)
      checkDate.setDate(now.getDate() - i)
      const dateStr = checkDate.toISOString().split("T")[0]

      habits.forEach((habit) => {
        totalPossible++
        if (habit.completionHistory.some((c) => c.date.startsWith(dateStr) && c.completed)) {
          totalCompletions++
        }
      })
    }

    const weeklyAverage = totalPossible > 0 ? Math.round((totalCompletions / totalPossible) * 100) : 0

    // Get active goals
    const activeGoals = goals.filter((goal) => goal.status === "active")

    // Get recent insights
    const recentInsights = insights
      .filter((insight) => insight.status === "new")
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3)

    return NextResponse.json({
      user,
      stats: {
        completedToday,
        totalHabits,
        currentStreak,
        weeklyAverage,
        totalXp: xp,
      },
      activeHabits: habits.slice(0, 4), // Just return a few for the dashboard
      activeGoals: activeGoals.slice(0, 3),
      activeSacrifices: sacrifices.slice(0, 3),
      recentInsights,
    })
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
