"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AchievementUnlockSequence } from "./achievement-unlock-sequence"
import { AchievementNotification } from "./achievement-notification"
import { Crown, Flame, Church, BookOpen } from "lucide-react"

const sampleAchievements = [
  {
    id: "prayer-warrior",
    name: "Prayer Warrior",
    description: "Complete 30 days of daily prayer",
    icon: Church,
    tier: "gold" as const,
    xp: 500,
    rarity: "epic" as const,
  },
  {
    id: "fitness-fanatic",
    name: "Fitness Fanatic",
    description: "Exercise for 21 consecutive days",
    icon: Flame,
    tier: "gold" as const,
    xp: 750,
    rarity: "epic" as const,
  },
  {
    id: "gryt-founder",
    name: "Gryt Founder",
    description: "Join the Gryt Year community",
    icon: Crown,
    tier: "diamond" as const,
    xp: 100,
    rarity: "legendary" as const,
  },
  {
    id: "journal-genius",
    name: "Journal Genius",
    description: "Write 50 journal entries",
    icon: BookOpen,
    tier: "silver" as const,
    xp: 400,
    rarity: "rare" as const,
  },
]

export function AchievementDemo() {
  const [showUnlockSequence, setShowUnlockSequence] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [selectedAchievement, setSelectedAchievement] = useState(sampleAchievements[0])

  const triggerUnlockSequence = (achievement: any) => {
    setSelectedAchievement(achievement)
    setShowUnlockSequence(true)
  }

  const triggerNotification = (achievement: any) => {
    setSelectedAchievement(achievement)
    setShowNotification(true)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="rounded-3xl shadow-lg border-0 bg-white mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">🎉 Achievement Animation Demo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-4">Experience the celebration animations when achievements are unlocked!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleAchievements.map((achievement) => (
              <Card key={achievement.id} className="rounded-2xl shadow-md border-0 bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <achievement.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{achievement.name}</h3>
                      <p className="text-sm text-gray-600">
                        {achievement.tier} • {achievement.xp} XP
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => triggerUnlockSequence(achievement)}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-xl flex-1"
                    >
                      🎊 Full Sequence
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => triggerNotification(achievement)}
                      className="rounded-xl flex-1"
                    >
                      🔔 Notification
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-2xl">
            <h4 className="font-bold text-blue-900 mb-2">Animation Features:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>🎊 Confetti particles and star bursts</li>
              <li>🏆 Tier-based celebration intensity</li>
              <li>✨ Sparkle effects and floating animations</li>
              <li>🎯 Smooth reveal sequences</li>
              <li>🔔 Quick notification popups</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Achievement Unlock Sequence */}
      {showUnlockSequence && (
        <AchievementUnlockSequence achievement={selectedAchievement} onClose={() => setShowUnlockSequence(false)} />
      )}

      {/* Achievement Notification */}
      {showNotification && (
        <AchievementNotification
          achievement={selectedAchievement}
          onClose={() => setShowNotification(false)}
          onClick={() => triggerUnlockSequence(selectedAchievement)}
        />
      )}
    </div>
  )
}
