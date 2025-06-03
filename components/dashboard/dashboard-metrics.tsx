"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, Flame, Star, Trophy, Calendar, Clock } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: any
  color: string
  bgColor: string
  trend?: number
  progress?: number
}

function MetricCard({ title, value, subtitle, icon: Icon, color, bgColor, trend, progress }: MetricCardProps) {
  return (
    <Card className="rounded-3xl shadow-lg border-0 bg-white overflow-hidden hover:shadow-xl transition-all">
      <div className={`h-2 ${color}`}></div>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center`}>
            <Icon className={`h-6 w-6 text-${color.split("-")[1]}-600`} />
          </div>
          {trend && (
            <Badge
              className={`${trend > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"} rounded-full px-2 py-1`}
            >
              {trend > 0 ? "↗" : "↘"} {Math.abs(trend)}%
            </Badge>
          )}
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-gray-900">{value}</div>
          <div className="text-sm font-medium text-gray-700">{title}</div>
          {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
          {progress !== undefined && (
            <div className="mt-3">
              <Progress value={progress} className="h-2 rounded-full" />
              <div className="text-xs text-gray-500 mt-1">{progress}% complete</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface DashboardMetricsProps {
  isPreview?: boolean
}

export function DashboardMetrics({ isPreview = false }: DashboardMetricsProps) {
  const metrics = isPreview
    ? [
        {
          title: "Total XP Available",
          value: "50,000+",
          subtitle: "Experience points to earn",
          icon: Star,
          color: "bg-yellow-500",
          bgColor: "bg-yellow-100",
          trend: 25,
        },
        {
          title: "Achievement Badges",
          value: "120+",
          subtitle: "Unique badges to unlock",
          icon: Trophy,
          color: "bg-purple-500",
          bgColor: "bg-purple-100",
        },
        {
          title: "Transformation Days",
          value: "365",
          subtitle: "Full year journey",
          icon: Calendar,
          color: "bg-blue-500",
          bgColor: "bg-blue-100",
        },
        {
          title: "Life Pillars",
          value: "6",
          subtitle: "Areas of growth",
          icon: Target,
          color: "bg-green-500",
          bgColor: "bg-green-100",
        },
      ]
    : [
        {
          title: "Current XP",
          value: "12,450",
          subtitle: "Experience points earned",
          icon: Star,
          color: "bg-yellow-500",
          bgColor: "bg-yellow-100",
          trend: 15,
          progress: 75,
        },
        {
          title: "Active Streak",
          value: "45",
          subtitle: "Days consecutive",
          icon: Flame,
          color: "bg-orange-500",
          bgColor: "bg-orange-100",
          trend: 12,
        },
        {
          title: "Goals Progress",
          value: "68%",
          subtitle: "Average completion",
          icon: Target,
          color: "bg-green-500",
          bgColor: "bg-green-100",
          progress: 68,
        },
        {
          title: "Daily Activities",
          value: "5/7",
          subtitle: "Completed today",
          icon: Clock,
          color: "bg-blue-500",
          bgColor: "bg-blue-100",
          progress: 71,
        },
      ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  )
}
