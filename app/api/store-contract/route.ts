import { put } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const contractData = await request.json()

    // Generate a unique ID for the contract
    const userId = contractData.userId || "anonymous"
    const timestamp = Date.now()
    const contractId = `${userId}-${timestamp}`

    // Store the contract in Vercel Blob
    const { url } = await put(`contracts/${contractId}.json`, JSON.stringify(contractData), {
      contentType: "application/json",
    })

    // Return the URL of the stored contract
    return NextResponse.json({ success: true, url })
  } catch (error) {
    console.error("Error storing contract:", error)
    return NextResponse.json({ success: false, error: "Failed to store contract" }, { status: 500 })
  }
}
