import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import type { Sacrifice } from "@/types"
import { nanoid } from "nanoid"

// Get all sacrifices for current user
export async function GET(request: Request) {
  try {
    const userId = "user_123" // Placeholder

    // Fetch sacrifices from KV store
    const sacrifices = await kv.lrange<Sacrifice>(`user:${userId}:sacrifices`, 0, -1)

    return NextResponse.json(sacrifices)
  } catch (error) {
    console.error("Error fetching sacrifices:", error)
    return NextResponse.json({ error: "Failed to fetch sacrifices" }, { status: 500 })
  }
}

// Create a new sacrifice
export async function POST(request: Request) {
  try {
    const userId = "user_123" // Placeholder
    const sacrificeData = await request.json()

    const newSacrifice: Sacrifice = {
      id: nanoid(),
      userId,
      ...sacrificeData,
      avoidanceStreak: 0,
      longestAvoidanceStreak: 0,
      avoidanceHistory: [],
    }

    // Save sacrifice to KV store
    await kv.rpush(`user:${userId}:sacrifices`, newSacrifice)

    return NextResponse.json(newSacrifice)
  } catch (error) {
    console.error("Error creating sacrifice:", error)
    return NextResponse.json({ error: "Failed to create sacrifice" }, { status: 500 })
  }
}
