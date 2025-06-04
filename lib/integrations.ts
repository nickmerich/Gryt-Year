import type { IntegrationData } from "@/types"

export async function syncIntegrationData(userId: string, integrationType: string): Promise<IntegrationData[]> {
  // In a real app, this would connect to the third-party API
  // For now, we'll return mock data

  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)

  switch (integrationType) {
    case "apple-health":
      return [
        {
          sourceId: "apple-health",
          userId,
          dataType: "steps",
          value: Math.floor(Math.random() * 5000) + 5000, // 5000-10000 steps
          timestamp: now.toISOString(),
          metadata: { source: "iPhone" },
        },
        {
          sourceId: "apple-health",
          userId,
          dataType: "exercise",
          value: Math.floor(Math.random() * 60) + 30, // 30-90 minutes
          timestamp: now.toISOString(),
          metadata: { type: "running", calories: 350 },
        },
      ]

    case "myfitnesspal":
      return [
        {
          sourceId: "myfitnesspal",
          userId,
          dataType: "calories",
          value: Math.floor(Math.random() * 500) + 1500, // 1500-2000 calories
          timestamp: now.toISOString(),
          metadata: { meals: 3, protein: 120, carbs: 180, fat: 60 },
        },
        {
          sourceId: "myfitnesspal",
          userId,
          dataType: "water",
          value: Math.floor(Math.random() * 4) + 4, // 4-8 glasses
          timestamp: now.toISOString(),
        },
      ]

    case "kindle":
      return [
        {
          sourceId: "kindle",
          userId,
          dataType: "reading",
          value: Math.floor(Math.random() * 60) + 15, // 15-75 minutes
          timestamp: now.toISOString(),
          metadata: { book: "Atomic Habits", pages: 12 },
        },
      ]

    case "strava":
      return [
        {
          sourceId: "strava",
          userId,
          dataType: "running",
          value: Math.floor(Math.random() * 5) + 3, // 3-8 km
          timestamp: now.toISOString(),
          metadata: { duration: 35, pace: "5:30", elevation: 120 },
        },
      ]

    default:
      return []
  }
}
