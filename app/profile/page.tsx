"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { User, Settings, Bell, Shield, Moon, Sun, Upload, Save, RefreshCw } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import type { User as UserType, UserSettings } from "@/types"

export default function Profile() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<UserType | null>(null)
  const [formData, setFormData] = useState<{
    name: string
    email: string
    bio: string
    settings: UserSettings
  }>({
    name: "",
    email: "",
    bio: "",
    settings: {
      notifications: {
        email: true,
        push: true,
        dailyReminder: true,
        weeklyReflection: true,
        achievements: true,
        streakAlerts: true,
      },
      privacy: {
        shareProgress: false,
        shareAchievements: true,
        publicProfile: false,
        dataCollection: true,
      },
      theme: "light",
      timeZone: "America/New_York",
    },
  })

  useEffect(() => {
    fetchUserProfile()
  }, [])

  async function fetchUserProfile() {
    try {
      setLoading(true)
      const response = await fetch("/api/user")

      if (!response.ok) {
        throw new Error("Failed to fetch user profile")
      }

      const userData = await response.json()
      setUser(userData)
      setFormData({
        name: userData.name,
        email: userData.email,
        bio: userData.bio || "",
        settings: userData.settings,
      })
    } catch (error) {
      console.error("Error fetching user profile:", error)
      toast({
        title: "Error",
        description: "Failed to load user profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function saveProfile() {
    try {
      setSaving(true)
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          bio: formData.bio,
          settings: formData.settings,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update profile")
      }

      const updatedUser = await response.json()
      setUser(updatedUser)

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  async function uploadProfileImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/user", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload profile image")
      }

      const { url } = await response.json()

      setUser((prev) => (prev ? { ...prev, profileImageUrl: url } : null))

      toast({
        title: "Profile Image Updated",
        description: "Your profile image has been successfully updated.",
      })
    } catch (error) {
      console.error("Error uploading profile image:", error)
      toast({
        title: "Error",
        description: "Failed to upload profile image. Please try again.",
        variant: "destructive",
      })
    }
  }

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateSettings = (category: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        [category]: {
          ...prev.settings[category as keyof UserSettings],
          [field]: value,
        },
      },
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Skeleton className="h-96 w-full" />
            <div className="lg:col-span-2">
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Profile Settings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="rounded-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {user?.profileImageUrl ? (
                      <img
                        src={user.profileImageUrl || "/placeholder.svg"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      user?.name?.charAt(0).toUpperCase() || "U"
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50">
                    <Upload className="h-4 w-4 text-gray-600" />
                    <input type="file" accept="image/*" className="hidden" onChange={uploadProfileImage} />
                  </label>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
                <div className="mt-4 p-4 bg-gray-50 rounded-2xl">
                  <p className="text-sm text-gray-600">Member since</p>
                  <p className="font-medium">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settings Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 rounded-2xl bg-white/90 backdrop-blur-sm">
                <TabsTrigger value="general" className="rounded-xl">
                  <User className="h-4 w-4 mr-2" />
                  General
                </TabsTrigger>
                <TabsTrigger value="notifications" className="rounded-xl">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="privacy" className="rounded-xl">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy
                </TabsTrigger>
              </TabsList>

              {/* General Settings */}
              <TabsContent value="general">
                <Card className="rounded-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => updateFormData("name", e.target.value)}
                        className="rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        disabled
                        className="rounded-xl bg-gray-50"
                      />
                      <p className="text-xs text-gray-500">Email cannot be changed</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => updateFormData("bio", e.target.value)}
                        placeholder="Tell us about yourself and your transformation journey..."
                        className="rounded-xl"
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <div className="flex items-center space-x-4">
                        <Button
                          variant={formData.settings.theme === "light" ? "default" : "outline"}
                          size="sm"
                          className="rounded-xl"
                          onClick={() => updateSettings("theme", "", "light")}
                        >
                          <Sun className="h-4 w-4 mr-2" />
                          Light
                        </Button>
                        <Button
                          variant={formData.settings.theme === "dark" ? "default" : "outline"}
                          size="sm"
                          className="rounded-xl"
                          onClick={() => updateSettings("theme", "", "dark")}
                        >
                          <Moon className="h-4 w-4 mr-2" />
                          Dark
                        </Button>
                        <Button
                          variant={formData.settings.theme === "system" ? "default" : "outline"}
                          size="sm"
                          className="rounded-xl"
                          onClick={() => updateSettings("theme", "", "system")}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          System
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Time Zone</Label>
                      <Input
                        id="timezone"
                        value={formData.settings.timeZone}
                        onChange={(e) => updateSettings("timeZone", "", e.target.value)}
                        className="rounded-xl"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notification Settings */}
              <TabsContent value="notifications">
                <Card className="rounded-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={formData.settings.notifications.email}
                        onCheckedChange={(checked) => updateSettings("notifications", "email", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-sm text-gray-500">Receive push notifications on your device</p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={formData.settings.notifications.push}
                        onCheckedChange={(checked) => updateSettings("notifications", "push", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="daily-reminder">Daily Reminders</Label>
                        <p className="text-sm text-gray-500">Get reminded about your daily habits</p>
                      </div>
                      <Switch
                        id="daily-reminder"
                        checked={formData.settings.notifications.dailyReminder}
                        onCheckedChange={(checked) => updateSettings("notifications", "dailyReminder", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="weekly-reflection">Weekly Reflection</Label>
                        <p className="text-sm text-gray-500">Reminders for weekly reflection sessions</p>
                      </div>
                      <Switch
                        id="weekly-reflection"
                        checked={formData.settings.notifications.weeklyReflection}
                        onCheckedChange={(checked) => updateSettings("notifications", "weeklyReflection", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="achievements">Achievement Notifications</Label>
                        <p className="text-sm text-gray-500">Celebrate your wins and milestones</p>
                      </div>
                      <Switch
                        id="achievements"
                        checked={formData.settings.notifications.achievements}
                        onCheckedChange={(checked) => updateSettings("notifications", "achievements", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="streak-alerts">Streak Alerts</Label>
                        <p className="text-sm text-gray-500">Get notified about streak milestones and risks</p>
                      </div>
                      <Switch
                        id="streak-alerts"
                        checked={formData.settings.notifications.streakAlerts}
                        onCheckedChange={(checked) => updateSettings("notifications", "streakAlerts", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Privacy Settings */}
              <TabsContent value="privacy">
                <Card className="rounded-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Privacy & Data</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="share-progress">Share Progress</Label>
                        <p className="text-sm text-gray-500">Allow others to see your progress</p>
                      </div>
                      <Switch
                        id="share-progress"
                        checked={formData.settings.privacy.shareProgress}
                        onCheckedChange={(checked) => updateSettings("privacy", "shareProgress", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="share-achievements">Share Achievements</Label>
                        <p className="text-sm text-gray-500">Let others see your achievements</p>
                      </div>
                      <Switch
                        id="share-achievements"
                        checked={formData.settings.privacy.shareAchievements}
                        onCheckedChange={(checked) => updateSettings("privacy", "shareAchievements", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="public-profile">Public Profile</Label>
                        <p className="text-sm text-gray-500">Make your profile visible to other users</p>
                      </div>
                      <Switch
                        id="public-profile"
                        checked={formData.settings.privacy.publicProfile}
                        onCheckedChange={(checked) => updateSettings("privacy", "publicProfile", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="data-collection">Data Collection</Label>
                        <p className="text-sm text-gray-500">Allow anonymous data collection for insights</p>
                      </div>
                      <Switch
                        id="data-collection"
                        checked={formData.settings.privacy.dataCollection}
                        onCheckedChange={(checked) => updateSettings("privacy", "dataCollection", checked)}
                      />
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="font-medium text-gray-900 mb-2">Data Export</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Download all your data including habits, goals, reflections, and progress.
                      </p>
                      <Button variant="outline" className="rounded-xl">
                        Export My Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={saveProfile} disabled={saving} className="rounded-xl px-8">
                {saving ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
