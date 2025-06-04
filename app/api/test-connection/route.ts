import { NextResponse } from "next/server"
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase"

export async function GET() {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        configured: false,
        message: "Supabase environment variables are not configured",
        timestamp: new Date().toISOString(),
        demoMode: true,
      })
    }

    const supabase = createServerSupabaseClient()

    // Test basic connection
    const { data, error } = await supabase.from("users").select("count").limit(1)

    if (error) {
      console.error("Connection test failed:", error)
      return NextResponse.json({
        configured: true,
        connected: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      })
    }

    // Test with sample user
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id, email, name")
      .eq("email", "alex@grytplatform.com")
      .single()

    return NextResponse.json({
      configured: true,
      connected: true,
      basicConnection: true,
      sampleUser: !userError,
      sampleUserId: user?.id,
      sampleUserEmail: user?.email,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Unexpected error in connection test:", error)
    return NextResponse.json({
      configured: isSupabaseConfigured(),
      connected: false,
      error: "Unexpected error occurred",
      details: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    })
  }
}
