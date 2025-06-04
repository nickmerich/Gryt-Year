import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase"
import { getCurrentUserId } from "@/lib/auth"

// Get current user profile
export async function GET(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        id: "550e8400-e29b-41d4-a716-446655440000",
        email: "demo@grytplatform.com",
        name: "Demo User",
        bio: "This is a demo user account",
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
          timeZone: "UTC",
        },
        created_at: "2024-12-20T00:00:00Z",
        updated_at: "2024-12-27T00:00:00Z",
      })
    }

    const supabase = createServerSupabaseClient()
    const userId = await getCurrentUserId()

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    const { data: user, error } = await supabase.from("users").select("*").eq("id", userId).single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

// Update user profile
export async function PUT(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ message: "Demo mode - changes not saved" })
    }

    const supabase = createServerSupabaseClient()
    const userId = await getCurrentUserId()

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    const updates = await request.json()

    const { data: updatedUser, error } = await supabase
      .from("users")
      .update({
        name: updates.name,
        bio: updates.bio,
        settings: updates.settings,
      })
      .eq("id", userId)
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
    }

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

// Upload profile image
export async function POST(request: Request) {
  try {
    const userId = await getCurrentUserId()

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Upload to Vercel Blob (this works regardless of Supabase)
    const blob = await put(`profile-images/${userId}/${file.name}`, file, {
      access: "public",
    })

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ url: blob.url, message: "Demo mode - image uploaded but not saved to profile" })
    }

    // Update user profile with new image URL
    const supabase = createServerSupabaseClient()
    const { data: updatedUser, error } = await supabase
      .from("users")
      .update({ profile_image_url: blob.url })
      .eq("id", userId)
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ url: blob.url, message: "Image uploaded but profile update failed" })
    }

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error("Error uploading profile image:", error)
    return NextResponse.json({ error: "Failed to upload profile image" }, { status: 500 })
  }
}
