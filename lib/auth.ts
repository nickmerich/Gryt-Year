import { createServerSupabaseClient } from "./supabase"

// For demo purposes, we'll use a fixed demo user
// In production, this would get the user from the session
export async function getCurrentUserId(): Promise<string | null> {
  try {
    const supabase = createServerSupabaseClient()

    // Get the demo user for now
    const { data: user, error } = await supabase.from("users").select("id").eq("email", "demo@gryt.com").single()

    if (error || !user) {
      console.error("Error getting current user:", error)
      return null
    }

    return user.id
  } catch (error) {
    console.error("Error in getCurrentUserId:", error)
    return null
  }
}

// Validate UUID format
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

// Sanitize and validate UUID input
export function sanitizeUUID(input: string): string | null {
  if (!input || typeof input !== "string") {
    return null
  }

  const trimmed = input.trim()

  if (!isValidUUID(trimmed)) {
    return null
  }

  return trimmed
}
