import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import type { Habit } from "@/types"
import { nanoid } from "nanoid"

// Get all habits for current user
export async function GET(request: Request) {
  try {
    const userId = "user_123" // Placeholder

    // Fetch habits from KV store
    const habits = await kv.lrange<Habit>(`user:${userId}:habits`, 0, -1)

    return NextResponse.json(habits)
  } catch (error) {
    console.error("Error fetching habits:", error)
    return NextResponse.json({ error: "Failed to fetch habits" }, { status: 500 })
  }
}

// Create a new habit
export async function POST(request: Request) {
  try {
    const userId = "user_123" // Placeholder
    const habitData = await request.json()

    const newHabit: Habit = {
      id: nanoid(),
      userId,
      ...habitData,
      streak: 0,
      longestStreak: 0,
      completionHistory: [],
    }

    // Save habit to KV store
    await kv.rpush(`user:${userId}:habits`, newHabit)

    return NextResponse.json(newHabit)
  } catch (error) {
    console.error("Error creating habit:", error)
    return NextResponse.json({ error: "Failed to create habit" }, { status: 500 })
  }
}
