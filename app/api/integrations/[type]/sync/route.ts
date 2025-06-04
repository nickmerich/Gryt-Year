import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import type { IntegrationSource, Habit } from "@/types"
import { syncIntegrationData } from "@/lib/integrations"

// Sync data from an integration
export async function POST(request: Request, { params }: { params: { type: string } }) {
  try {
    const userId = "user_123" // Placeholder
    const integrationType = params.type as any

    // Get integration
    const integration = await kv.hget<IntegrationSource>(`user:${userId}:integrations`, integrationType)

    if (!integration) {
      return NextResponse.json({ error: "Integration not found" }, { status: 404 })
    }

    // In a real app, this would fetch data from the third-party service
    // For now, we'll simulate fetching and processing data
    const syncedData = await syncIntegrationData(userId, integrationType)

    // Update habits based on integration data
    const habits = await kv.lrange<Habit>(`user:${userId}:habits`, 0, -1)
    const updatedHabits = habits.map((habit) => {
      if (habit.integration?.type === integrationType) {
        // Find relevant data for this habit
        const habitData = syncedData.find((data) => data.dataType === habit.title.toLowerCase().replace(/\s+/g, "-"))

        if (habitData) {
          // Update habit completion based on integration data
          const completion = {
            date: habitData.timestamp.split("T")[0],
            completed: true,
            value: habitData.value,
            notes: `Synced from ${integrationType}`,
          }

          return {
            ...habit,
            completionHistory: [...habit.completionHistory.filter((c) => c.date !== completion.date), completion],
          }
        }
      }

      return habit
    })

    // Save updated habits
    await kv.del(`user:${userId}:habits`)
    await kv.rpush(`user:${userId}:habits`, ...updatedHabits)

    // Update integration last synced time
    const updatedIntegration = {
      ...integration,
      lastSynced: new Date().toISOString(),
    }

    await kv.hset(`user:${userId}:integrations`, { [integrationType]: updatedIntegration })

    return NextResponse.json({
      success: true,
      dataCount: syncedData.length,
      lastSynced: updatedIntegration.lastSynced,
    })
  } catch (error) {
    console.error("Error syncing integration:", error)
    return NextResponse.json({ error: "Failed to sync integration" }, { status: 500 })
  }
}
