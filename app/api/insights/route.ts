import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import type { Insight, Habit, Goal, Sacrifice } from "@/types"
import { nanoid } from "nanoid"
import { generateInsights } from "@/lib/ai-insights"

// Get insights for current user
export async function GET(request: Request) {
  try {
    const userId = "user_123" // Placeholder

    // Fetch insights from KV store
    const insights = await kv.lrange<Insight>(`user:${userId}:insights`, 0, -1)

    return NextResponse.json(insights)
  } catch (error) {
    console.error("Error fetching insights:", error)
    return NextResponse.json({ error: "Failed to fetch insights" }, { status: 500 })
  }
}

// Generate new insights
export async function POST(request: Request) {
  try {
    const userId = "user_123" // Placeholder

    // Fetch user data
    const habits = await kv.lrange<Habit>(`user:${userId}:habits`, 0, -1)
    const goals = await kv.lrange<Goal>(`user:${userId}:goals`, 0, -1)
    const sacrifices = await kv.lrange<Sacrifice>(`user:${userId}:sacrifices`, 0, -1)

    // Generate insights using AI
    const newInsights = await generateInsights(habits, goals, sacrifices)

    // Add metadata to insights
    const insightsWithMetadata = newInsights.map((insight) => ({
      ...insight,
      id: nanoid(),
      userId,
      createdAt: new Date().toISOString(),
      status: "new",
    }))

    // Save insights to KV store
    await kv.rpush(`user:${userId}:insights`, ...insightsWithMetadata)

    return NextResponse.json(insightsWithMetadata)
  } catch (error) {
    console.error("Error generating insights:", error)
    return NextResponse.json({ error: "Failed to generate insights" }, { status: 500 })
  }
}
