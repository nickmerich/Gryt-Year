import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import type { Goal } from "@/types"
import { nanoid } from "nanoid"

// Get all goals for current user
export async function GET(request: Request) {
  try {
    const userId = "user_123" // Placeholder

    // Fetch goals from KV store
    const goals = await kv.lrange<Goal>(`user:${userId}:goals`, 0, -1)

    return NextResponse.json(goals)
  } catch (error) {
    console.error("Error fetching goals:", error)
    return NextResponse.json({ error: "Failed to fetch goals" }, { status: 500 })
  }
}

// Create a new goal
export async function POST(request: Request) {
  try {
    const userId = "user_123" // Placeholder
    const goalData = await request.json()

    const newGoal: Goal = {
      id: nanoid(),
      userId,
      ...goalData,
      createdAt: new Date().toISOString(),
      status: "active",
      currentValue: 0,
    }

    // Save goal to KV store
    await kv.rpush(`user:${userId}:goals`, newGoal)

    return NextResponse.json(newGoal)
  } catch (error) {
    console.error("Error creating goal:", error)
    return NextResponse.json({ error: "Failed to create goal" }, { status: 500 })
  }
}
