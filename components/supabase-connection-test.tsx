"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, RefreshCw } from "lucide-react"

export function SupabaseConnectionTest() {
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    message: string
    timestamp?: string
    userCount?: number
    error?: string
  } | null>(null)

  async function testConnection() {
    setTesting(true)
    setResult(null)

    try {
      const response = await fetch("/api/test-connection")
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        message: "Failed to test connection",
        error: error instanceof Error ? error.message : String(error),
      })
    } finally {
      setTesting(false)
    }
  }

  return (
    <Card className="rounded-3xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Supabase Connection Test</span>
          {result &&
            (result.success ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            ))}
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
          <div
            className={`p-4 rounded-xl ${
              result.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
            }`}
          >
            <p className={`font-medium ${result.success ? "text-green-800" : "text-red-800"}`}>{result.message}</p>

            {result.success && result.timestamp && (
              <p className="text-sm text-green-600 mt-1">Connected at: {new Date(result.timestamp).toLocaleString()}</p>
            )}

            {result.success && typeof result.userCount === "number" && (
              <p className="text-sm text-green-600">Users in database: {result.userCount}</p>
            )}

            {result.error && <p className="text-sm text-red-600 mt-1">Error: {result.error}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
