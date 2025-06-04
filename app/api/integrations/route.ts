import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import type { IntegrationSource } from "@/types"

// Get all integrations for current user
export async function GET(request: Request) {
  try {
    const userId = "user_123" // Placeholder

    // Fetch integrations from KV store
    const integrations = await kv.hgetall<Record<string, IntegrationSource>>(`user:${userId}:integrations`)

    return NextResponse.json(integrations || {})
  } catch (error) {
    console.error("Error fetching integrations:", error)
    return NextResponse.json({ error: "Failed to fetch integrations" }, { status: 500 })
  }
}

// Connect a new integration
export async function POST(request: Request) {
  try {
    const userId = "user_123" // Placeholder
    const { type, authData } = await request.json()

    // In a real app, this would connect to the third-party service
    // For now, we'll simulate a successful connection

    const integration: IntegrationSource = {
      type: type as any,
      status: "connected",
      lastSynced: new Date().toISOString(),
    }

    // Save integration to KV store
    await kv.hset(`user:${userId}:integrations`, { [type]: integration })

    return NextResponse.json(integration)
  } catch (error) {
    console.error("Error connecting integration:", error)
    return NextResponse.json({ error: "Failed to connect integration" }, { status: 500 })
  }
}
