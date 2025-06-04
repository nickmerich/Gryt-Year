import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { kv } from "@vercel/kv"
import type { User } from "@/types"

// Get current user profile
export async function GET(request: Request) {
  try {
    // In a real app, get the user ID from the session
    const userId = "user_123" // Placeholder

    // Fetch user from KV store
    const user = await kv.get<User>(`user:${userId}`)

    if (!user) {
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
    const userId = "user_123" // Placeholder
    const updates = await request.json()

    // Get existing user
    const existingUser = await kv.get<User>(`user:${userId}`)

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update user with new data
    const updatedUser = {
      ...existingUser,
      ...updates,
      // Don't allow overriding these fields
      id: existingUser.id,
      email: existingUser.email,
      createdAt: existingUser.createdAt,
    }

    // Save updated user
    await kv.set(`user:${userId}`, updatedUser)

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

// Upload profile image
export async function POST(request: Request) {
  try {
    const userId = "user_123" // Placeholder
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Upload to Vercel Blob
    const blob = await put(`profile-images/${userId}/${file.name}`, file, {
      access: "public",
    })

    // Update user profile with new image URL
    const existingUser = await kv.get<User>(`user:${userId}`)

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const updatedUser = {
      ...existingUser,
      profileImageUrl: blob.url,
    }

    await kv.set(`user:${userId}`, updatedUser)

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error("Error uploading profile image:", error)
    return NextResponse.json({ error: "Failed to upload profile image" }, { status: 500 })
  }
}
