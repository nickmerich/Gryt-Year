import type { Habit, Goal, Sacrifice, Insight } from "@/types"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateInsights(
  habits: Habit[],
  goals: Goal[],
  sacrifices: Sacrifice[],
): Promise<Partial<Insight>[]> {
  try {
    // Prepare data for AI analysis
    const habitData = habits.map((habit) => ({
      title: habit.title,
      category: habit.category,
      streak: habit.streak,
      longestStreak: habit.longestStreak,
      completionRate: calculateCompletionRate(habit),
      timeOfDay: habit.timeOfDay,
      completionHistory: habit.completionHistory.slice(-14), // Last 14 days
    }))

    const goalData = goals.map((goal) => ({
      title: goal.title,
      category: goal.category,
      progress: (goal.currentValue / goal.targetValue) * 100,
      targetDate: goal.targetDate,
      status: goal.status,
    }))

    const sacrificeData = sacrifices.map((sacrifice) => ({
      title: sacrifice.title,
      category: sacrifice.category,
      avoidanceStreak: sacrifice.avoidanceStreak,
      avoidanceHistory: sacrifice.avoidanceHistory.slice(-14), // Last 14 days
    }))

    // Generate insights using AI
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are an AI assistant for the Gryt Year platform, a personal transformation app focused on habit building, goal achievement, and personal growth. 
      Analyze the user's habits, goals, and sacrifices data to generate 3-5 meaningful insights.
      Each insight should be one of these types:
      1. "strength" - Identify a positive pattern or achievement
      2. "opportunity" - Suggest an area for improvement
      3. "pattern" - Highlight a behavioral pattern the user might not be aware of
      4. "recommendation" - Provide a specific, actionable recommendation
      
      Format your response as a JSON array of insights, each with:
      - type: "strength", "opportunity", "pattern", or "recommendation"
      - title: A short, impactful title
      - description: A 1-2 sentence explanation
      - category: The relevant life pillar (spiritual, physical, mental, professional, family, nutrition)
      - priority: "high", "medium", or "low"
      - relatedHabits: Array of habit titles this insight relates to (can be empty)
      - relatedGoals: Array of goal titles this insight relates to (can be empty)
      
      Be specific, practical, and encouraging. Focus on actionable insights.`,
      prompt: `Please analyze this user data and generate 3-5 insights:
      
      HABITS: ${JSON.stringify(habitData)}
      
      GOALS: ${JSON.stringify(goalData)}
      
      SACRIFICES: ${JSON.stringify(sacrificeData)}
      
      Generate the insights as a JSON array.`,
    })

    // Parse the AI response
    const insightsText = text.trim()
    const jsonStart = insightsText.indexOf("[")
    const jsonEnd = insightsText.lastIndexOf("]") + 1

    if (jsonStart >= 0 && jsonEnd > jsonStart) {
      const jsonStr = insightsText.substring(jsonStart, jsonEnd)
      const insights = JSON.parse(jsonStr) as Partial<Insight>[]
      return insights
    }

    throw new Error("Failed to parse AI-generated insights")
  } catch (error) {
    console.error("Error generating insights:", error)

    // Return fallback insights if AI fails
    return [
      {
        type: "strength",
        title: "Consistent Progress",
        description: "You've been making steady progress across multiple habits. Keep up the good work!",
        category: "special",
        priority: "medium",
        relatedHabits: [],
        relatedGoals: [],
      },
      {
        type: "recommendation",
        title: "Consider Morning Habits",
        description:
          "Morning habits tend to have higher completion rates. Try moving one of your habits to the morning.",
        category: "special",
        priority: "low",
        relatedHabits: [],
        relatedGoals: [],
      },
    ]
  }
}

function calculateCompletionRate(habit: Habit): number {
  if (habit.completionHistory.length === 0) return 0

  const completedCount = habit.completionHistory.filter((c) => c.completed).length
  return Math.round((completedCount / habit.completionHistory.length) * 100)
}
