import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()

    // Test basic connection
    const { data: connectionTest, error: connectionError } = await supabase.from("users").select("count").limit(1)

    if (connectionError) {
      console.error("Connection test failed:", connectionError)
      return NextResponse.json({
        status: "error",
        message: "Failed to connect to Supabase",
        error: connectionError.message,
      })
    }

    // Test demo user exists
    const { data: demoUser, error: userError } = await supabase
      .from("users")
      .select("id, email, name")
      .eq("email", "demo@gryt.com")
      .single()

    if (userError || !demoUser) {
      return NextResponse.json({
        status: "warning",
        message: "Connected to Supabase but demo user not found",
        suggestion: "Run the seed script to create demo data",
      })
    }

    // Test habits data
    const { data: habits, error: habitsError } = await supabase
      .from("habits")
      .select("count")
      .eq("user_id", demoUser.id)

    if (habitsError) {
      return NextResponse.json({
        status: "warning",
        message: "Connected but habits table has issues",
        error: habitsError.message,
      })
    }

    return NextResponse.json({
      status: "success",
      message: "Successfully connected to Supabase",
      demoUser: {
        id: demoUser.id,
        email: demoUser.email,
        name: demoUser.name,
      },
      habitsCount: habits?.length || 0,
    })
  } catch (error) {
    console.error("Test connection error:", error)
    return NextResponse.json({
      status: "error",
      message: "Unexpected error during connection test",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
