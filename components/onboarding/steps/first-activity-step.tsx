"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useOnboarding } from "../onboarding-provider"
import { CheckCircle, Star, Sparkles, Trophy } from "lucide-react"

const quickActivities = [
  {
    id: "prayer",
    pillar: "spiritual",
    title: "Morning Prayer",
    description: "Start with a 5-minute prayer or meditation",
    xp: 10,
    emoji: "🙏",
    time: "5 min",
  },
  {
    id: "exercise",
    pillar: "physical",
    title: "Quick Exercise",
    description: "Do 10 push-ups or a 5-minute walk",
    xp: 15,
    emoji: "💪",
    time: "5-10 min",
  },
  {
    id: "gratitude",
    pillar: "mental",
    title: "Gratitude Journal",
    description: "Write down 3 things you're grateful for",
    xp: 10,
    emoji: "📝",
    time: "3 min",
  },
  {
    id: "family-time",
    pillar: "family",
    title: "Family Check-in",
    description: "Have a meaningful conversation with a family member",
    xp: 12,
    emoji: "👨‍👩‍👧‍👦",
    time: "10 min",
  },
  {
    id: "water",
    pillar: "nutrition",
    title: "Hydration Goal",
    description: "Drink a full glass of water",
    xp: 5,
    emoji: "💧",
    time: "1 min",
  },
  {
    id: "skill-learning",
    pillar: "professional",
    title: "Learn Something New",
    description: "Read an article or watch an educational video",
    xp: 15,
    emoji: "📚",
    time: "10 min",
  },
]

export function FirstActivityStep() {
  const { completeStep } = useOnboarding()
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null)
  const [activityCompleted, setActivityCompleted] = useState(false)
  const [reflection, setReflection] = useState("")
  const [showCelebration, setShowCelebration] = useState(false)

  const handleActivitySelect = (activityId: string) => {
    setSelectedActivity(activityId)
  }

  const handleCompleteActivity = () => {
    setActivityCompleted(true)
    setShowCelebration(true)

    // Save first activity completion
    const activity = quickActivities.find((a) => a.id === selectedActivity)
    if (activity) {
      const activityData = {
        ...activity,
        completedAt: new Date().toISOString(),
        reflection,
      }
      localStorage.setItem("gryt-first-activity", JSON.stringify(activityData))
    }

    // Auto-advance after celebration
    setTimeout(() => {
      completeStep("first-activity")
    }, 3000)
  }

  const selectedActivityData = quickActivities.find((a) => a.id === selectedActivity)

  if (showCelebration) {
    return (
      <div className="p-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Celebration Animation */}
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce">
              <Trophy className="h-16 w-16 text-white" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-yellow-400 animate-pulse" />
            <Sparkles className="absolute -bottom-2 -left-2 h-6 w-6 text-pink-400 animate-pulse" />
          </div>

          <Badge className="bg-green-500 text-white px-6 py-2 text-lg rounded-full mb-4 animate-bounce">
            🎉 First Activity Complete!
          </Badge>

          <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Congratulations!
          </h2>

          <p className="text-xl text-gray-700 mb-6">
            🚀 You've just earned your first XP and started your transformation journey!
          </p>

          <Card className="rounded-3xl shadow-lg border-0 bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="text-4xl">{selectedActivityData?.emoji}</div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{selectedActivityData?.title}</h3>
                  <p className="text-gray-600">{selectedActivityData?.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-2">
                <Star className="h-6 w-6 text-yellow-500" />
                <span className="text-2xl font-bold text-gray-900">+{selectedActivityData?.xp} XP</span>
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <p className="text-gray-600 mt-6">
            ✨ Your Gryt Year dashboard is ready! Let's celebrate your setup completion.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="bg-green-500 text-white px-6 py-2 text-lg rounded-full mb-4">🎯 First Activity</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Complete Your First Activity
          </h2>
          <p className="text-lg text-gray-600">
            Start your transformation journey by completing a quick activity and earning your first XP!
          </p>
        </div>

        {!selectedActivity ? (
          <>
            {/* Activity Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                🚀 Choose a Quick Activity to Get Started
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickActivities.map((activity) => (
                  <Card
                    key={activity.id}
                    className="rounded-3xl shadow-lg border-0 cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all bg-white"
                    onClick={() => handleActivitySelect(activity.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-4">{activity.emoji}</div>
                      <h4 className="font-bold text-lg text-gray-900 mb-2">{activity.title}</h4>
                      <p className="text-sm text-gray-600 mb-4">{activity.description}</p>

                      <div className="flex items-center justify-between">
                        <Badge className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">
                          ⏱️ {activity.time}
                        </Badge>
                        <Badge className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs">
                          +{activity.xp} XP
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Encouragement */}
            <Card className="rounded-3xl shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-gray-900 mb-2">💡 Why Start with a Quick Activity?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Build momentum immediately</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>Earn your first XP points</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4 text-purple-500" />
                    <span>Experience the reward system</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Selected Activity */}
            <Card className="rounded-3xl shadow-lg border-0 bg-white mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-center space-x-3">
                  <span className="text-4xl">{selectedActivityData?.emoji}</span>
                  <div className="text-center">
                    <div className="text-2xl">{selectedActivityData?.title}</div>
                    <p className="text-gray-600 font-normal">{selectedActivityData?.description}</p>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <Badge className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">
                      ⏱️ Estimated time: {selectedActivityData?.time}
                    </Badge>
                    <Badge className="bg-yellow-100 text-yellow-600 px-4 py-2 rounded-full">
                      ⭐ Reward: +{selectedActivityData?.xp} XP
                    </Badge>
                  </div>
                </div>

                {!activityCompleted ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="font-bold text-gray-900 mb-4">🎯 Ready to Complete This Activity?</h3>
                      <p className="text-gray-600 mb-6">
                        Take a moment to complete "{selectedActivityData?.title}" and then come back to log it!
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        How did it go? (Optional reflection)
                      </label>
                      <Textarea
                        placeholder="Share your experience, how you felt, or what you learned..."
                        value={reflection}
                        onChange={(e) => setReflection(e.target.value)}
                        className="rounded-2xl border-2 border-gray-200 focus:border-green-500"
                      />
                    </div>

                    <div className="flex justify-center space-x-4">
                      <Button variant="outline" onClick={() => setSelectedActivity(null)} className="rounded-2xl">
                        Choose Different Activity
                      </Button>
                      <Button
                        onClick={handleCompleteActivity}
                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-2xl px-8"
                      >
                        <CheckCircle className="h-5 w-5 mr-2" />✅ Mark as Complete
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-green-600 mb-2">Activity Completed! 🎉</h3>
                    <p className="text-gray-600">Great job! You've earned your first XP points.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Next Steps Preview */}
            <Card className="rounded-3xl shadow-lg border-0 bg-gradient-to-br from-green-50 to-blue-50">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-4 text-center">🚀 What's Next?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl mb-2">📊</div>
                    <h4 className="font-medium text-gray-900 mb-1">Track Daily Progress</h4>
                    <p className="text-sm text-gray-600">Log activities across all your pillars</p>
                  </div>
                  <div>
                    <div className="text-3xl mb-2">🏆</div>
                    <h4 className="font-medium text-gray-900 mb-1">Earn Achievements</h4>
                    <p className="text-sm text-gray-600">Unlock badges and celebrate milestones</p>
                  </div>
                  <div>
                    <div className="text-3xl mb-2">📈</div>
                    <h4 className="font-medium text-gray-900 mb-1">Watch Your Growth</h4>
                    <p className="text-sm text-gray-600">See your transformation unfold over time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
