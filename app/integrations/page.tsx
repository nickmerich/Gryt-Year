"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Smartphone, Activity, BookOpen, Utensils, Clock, CheckCircle, RefreshCw, Link, Unlink } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import type { IntegrationSource } from "@/types"

interface Integration {
  type: string
  name: string
  description: string
  icon: React.ComponentType<any>
  category: string
  features: string[]
  status?: IntegrationSource
}

const availableIntegrations: Integration[] = [
  {
    type: "apple-health",
    name: "Apple Health",
    description: "Sync your health and fitness data from Apple Health",
    icon: Smartphone,
    category: "Health & Fitness",
    features: ["Steps", "Workouts", "Heart Rate", "Sleep"],
  },
  {
    type: "myfitnesspal",
    name: "MyFitnessPal",
    description: "Track your nutrition and calorie intake",
    icon: Utensils,
    category: "Nutrition",
    features: ["Calories", "Macros", "Water Intake", "Meal Logging"],
  },
  {
    type: "strava",
    name: "Strava",
    description: "Connect your running and cycling activities",
    icon: Activity,
    category: "Fitness",
    features: ["Running", "Cycling", "Distance", "Pace"],
  },
  {
    type: "kindle",
    name: "Kindle",
    description: "Track your reading progress and time",
    icon: BookOpen,
    category: "Learning",
    features: ["Reading Time", "Books Read", "Progress", "Highlights"],
  },
  {
    type: "rescuetime",
    name: "RescueTime",
    description: "Monitor your digital productivity and screen time",
    icon: Clock,
    category: "Productivity",
    features: ["Screen Time", "App Usage", "Productivity Score", "Focus Time"],
  },
  {
    type: "goodreads",
    name: "Goodreads",
    description: "Sync your reading goals and book progress",
    icon: BookOpen,
    category: "Learning",
    features: ["Reading Goals", "Book Reviews", "Reading Challenge", "Wishlist"],
  },
]

export default function Integrations() {
  const [loading, setLoading] = useState(true)
  const [integrations, setIntegrations] = useState<Record<string, IntegrationSource>>({})
  const [syncing, setSyncing] = useState<string | null>(null)

  useEffect(() => {
    fetchIntegrations()
  }, [])

  async function fetchIntegrations() {
    try {
      setLoading(true)
      const response = await fetch("/api/integrations")

      if (!response.ok) {
        throw new Error("Failed to fetch integrations")
      }

      const data = await response.json()
      setIntegrations(data)
    } catch (error) {
      console.error("Error fetching integrations:", error)
      toast({
        title: "Error",
        description: "Failed to load integrations. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function connectIntegration(type: string) {
    try {
      const response = await fetch("/api/integrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type }),
      })

      if (!response.ok) {
        throw new Error("Failed to connect integration")
      }

      const integration = await response.json()

      setIntegrations((prev) => ({
        ...prev,
        [type]: integration,
      }))

      toast({
        title: "Integration Connected",
        description: `Successfully connected to ${availableIntegrations.find((i) => i.type === type)?.name}.`,
      })
    } catch (error) {
      console.error("Error connecting integration:", error)
      toast({
        title: "Error",
        description: "Failed to connect integration. Please try again.",
        variant: "destructive",
      })
    }
  }

  async function syncIntegration(type: string) {
    try {
      setSyncing(type)
      const response = await fetch(`/api/integrations/${type}/sync`, {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to sync integration")
      }

      const result = await response.json()

      // Update last synced time
      setIntegrations((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          lastSynced: new Date().toISOString(),
        },
      }))

      toast({
        title: "Sync Complete",
        description: `Synced ${result.dataCount} data points from ${availableIntegrations.find((i) => i.type === type)?.name}.`,
      })
    } catch (error) {
      console.error("Error syncing integration:", error)
      toast({
        title: "Error",
        description: "Failed to sync integration. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSyncing(null)
    }
  }

  async function disconnectIntegration(type: string) {
    try {
      // In a real app, this would call an API to disconnect
      setIntegrations((prev) => {
        const updated = { ...prev }
        delete updated[type]
        return updated
      })

      toast({
        title: "Integration Disconnected",
        description: `Disconnected from ${availableIntegrations.find((i) => i.type === type)?.name}.`,
      })
    } catch (error) {
      console.error("Error disconnecting integration:", error)
      toast({
        title: "Error",
        description: "Failed to disconnect integration. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (integration: Integration) => {
    const status = integrations[integration.type]

    if (!status) {
      return <Badge variant="secondary">Not Connected</Badge>
    }

    switch (status.status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-700">Connected</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge variant="secondary">Disconnected</Badge>
    }
  }

  const getLastSyncText = (integration: Integration) => {
    const status = integrations[integration.type]

    if (!status?.lastSynced) {
      return "Never synced"
    }

    const lastSync = new Date(status.lastSynced)
    const now = new Date()
    const diffMinutes = Math.floor((now.getTime() - lastSync.getTime()) / (1000 * 60))

    if (diffMinutes < 1) {
      return "Just now"
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`
    } else if (diffMinutes < 1440) {
      return `${Math.floor(diffMinutes / 60)} hours ago`
    } else {
      return `${Math.floor(diffMinutes / 1440)} days ago`
    }
  }

  const groupedIntegrations = availableIntegrations.reduce(
    (acc, integration) => {
      if (!acc[integration.category]) {
        acc[integration.category] = []
      }
      acc[integration.category].push(integration)
      return acc
    },
    {} as Record<string, Integration[]>,
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Integrations</h1>
          <p className="text-xl text-gray-600">
            Connect your favorite apps and services to automatically track your habits and goals.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="rounded-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <Skeleton className="h-48 w-full" />
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedIntegrations).map(([category, categoryIntegrations]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryIntegrations.map((integration) => {
                    const IconComponent = integration.icon
                    const isConnected = integrations[integration.type]?.status === "connected"
                    const isSyncing = syncing === integration.type

                    return (
                      <Card
                        key={integration.type}
                        className="rounded-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm"
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                                <IconComponent className="h-6 w-6 text-gray-600" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{integration.name}</CardTitle>
                                {getStatusBadge(integration)}
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-4">{integration.description}</p>

                          <div className="mb-4">
                            <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                            <div className="flex flex-wrap gap-2">
                              {integration.features.map((feature) => (
                                <Badge key={feature} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {isConnected && (
                            <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Last sync:</span>
                                <span className="font-medium">{getLastSyncText(integration)}</span>
                              </div>
                            </div>
                          )}

                          <div className="flex space-x-2">
                            {isConnected ? (
                              <>
                                <Button
                                  size="sm"
                                  className="rounded-xl flex-1"
                                  onClick={() => syncIntegration(integration.type)}
                                  disabled={isSyncing}
                                >
                                  {isSyncing ? (
                                    <>
                                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                      Syncing...
                                    </>
                                  ) : (
                                    <>
                                      <RefreshCw className="h-4 w-4 mr-2" />
                                      Sync Now
                                    </>
                                  )}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="rounded-xl"
                                  onClick={() => disconnectIntegration(integration.type)}
                                >
                                  <Unlink className="h-4 w-4" />
                                </Button>
                              </>
                            ) : (
                              <Button
                                size="sm"
                                className="rounded-xl w-full"
                                onClick={() => connectIntegration(integration.type)}
                              >
                                <Link className="h-4 w-4 mr-2" />
                                Connect
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Integration Benefits */}
        <Card className="rounded-3xl shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50 mt-12">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Connect Integrations?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Automatic Tracking</h4>
                <p className="text-gray-600">
                  No more manual logging. Your habits are tracked automatically from your favorite apps.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Better Insights</h4>
                <p className="text-gray-600">
                  Get more accurate insights and recommendations based on comprehensive data.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Save Time</h4>
                <p className="text-gray-600">
                  Focus on building habits instead of tracking them. We handle the data collection.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
