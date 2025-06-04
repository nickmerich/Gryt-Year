import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { createServerSupabaseClient } from "@/lib/supabase"
import { getCurrentUserId } from "@/lib/auth"

// Get current user profile
export async function GET(request: Request) {
  try {
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
    const supabase = createServerSupabaseClient()
    const userId = await getCurrentUserId()

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    const updates = await request.json()

    // Validate and sanitize input
    const allowedFields = ["name", "bio", "settings"]
    const sanitizedUpdates: any = {}

    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        sanitizedUpdates[field] = updates[field]
      }
    }

    const { data: updatedUser, error } = await supabase
      .from("users")
      .update({
        ...sanitizedUpdates,
        updated_at: new Date().toISOString(),
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
    const supabase = createServerSupabaseClient()
    const userId = await getCurrentUserId()

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type and size
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      return NextResponse.json({ error: "File too large" }, { status: 400 })
    }

    // Upload to Vercel Blob
    const blob = await put(`profile-images/${userId}/${Date.now()}-${file.name}`, file, {
      access: "public",
    })

    // Update user profile with new image URL
    const { data: updatedUser, error } = await supabase
      .from("users")
      .update({ profile_image_url: blob.url })
      .eq("id", userId)
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: "Failed to update profile image" }, { status: 500 })
    }

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error("Error uploading profile image:", error)
    return NextResponse.json({ error: "Failed to upload profile image" }, { status: 500 })
  }
}
