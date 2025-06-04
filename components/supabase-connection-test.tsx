"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, RefreshCw, AlertTriangle, Info } from "lucide-react"

interface ConnectionResult {
  configured: boolean
  connected?: boolean
  message?: string
  timestamp: string
  demoMode?: boolean
  sampleUser?: boolean
  sampleUserId?: string
  sampleUserEmail?: string
  error?: string
}

export function SupabaseConnectionTest() {
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState<ConnectionResult | null>(null)

  async function testConnection() {
    setTesting(true)
    setResult(null)

    try {
      const response = await fetch("/api/test-connection")
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        configured: false,
        connected: false,
        message: "Failed to test connection",
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      })
    } finally {
      setTesting(false)
    }
  }

  const getStatusIcon = () => {
    if (!result) return null

    if (result.demoMode) {
      return <Info className="h-5 w-5 text-blue-500" />
    } else if (result.connected) {
      return <CheckCircle className="h-5 w-5 text-green-500" />
    } else if (result.configured) {
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    } else {
      return <XCircle className="h-5 w-5 text-red-500" />
    }
  }

  const getStatusColor = () => {
    if (!result) return ""

    if (result.demoMode) {
      return "bg-blue-50 border border-blue-200"
    } else if (result.connected) {
      return "bg-green-50 border border-green-200"
    } else if (result.configured) {
      return "bg-yellow-50 border border-yellow-200"
    } else {
      return "bg-red-50 border border-red-200"
    }
  }

  const getStatusTextColor = () => {
    if (!result) return ""

    if (result.demoMode) {
      return "text-blue-800"
    } else if (result.connected) {
      return "text-green-800"
    } else if (result.configured) {
      return "text-yellow-800"
    } else {
      return "text-red-800"
    }
  }

  return (
    <Card className="rounded-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Supabase Connection Status</span>
          {getStatusIcon()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={testConnection} disabled={testing} className="w-full rounded-xl">
          {testing ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Testing Connection...
            </>
          ) : (
            "Test Supabase Connection"
          )}
        </Button>

        {result && (
          <div className={`p-4 rounded-xl ${getStatusColor()}`}>
            <p className={`font-medium ${getStatusTextColor()}`}>
              {result.demoMode
                ? "Demo Mode Active"
                : result.connected
                  ? "Successfully Connected"
                  : result.configured
                    ? "Configuration Error"
                    : "Not Configured"}
            </p>

            {result.message && <p className={`text-sm mt-1 ${getStatusTextColor()}`}>{result.message}</p>}

            {result.demoMode && (
              <p className="text-sm text-blue-600 mt-1">
                Supabase environment variables are not configured. The app is running in demo mode with sample data.
              </p>
            )}

            {result.connected && result.sampleUser && (
              <div className="text-sm text-green-600 mt-2 space-y-1">
                <p>✓ Database connection successful</p>
                <p>✓ Sample user found: {result.sampleUserEmail}</p>
                <p className="font-mono text-xs">User ID: {result.sampleUserId}</p>
              </div>
            )}

            {result.connected && !result.sampleUser && (
              <p className="text-sm text-yellow-600 mt-1">
                Database connected but no sample user found. You may need to run the seed script.
              </p>
            )}

            {result.error && <p className="text-sm text-red-600 mt-1">Error: {result.error}</p>}

            <p className="text-xs text-gray-500 mt-2">Last checked: {new Date(result.timestamp).toLocaleString()}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
