import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import { put } from "@vercel/blob"
import type { Contract } from "@/types"
import { nanoid } from "nanoid"

// Get user's contract
export async function GET(request: Request) {
  try {
    const userId = "user_123" // Placeholder

    // Fetch contract from KV store
    const contract = await kv.get<Contract>(`user:${userId}:contract`)

    if (!contract) {
      return NextResponse.json({ error: "Contract not found" }, { status: 404 })
    }

    return NextResponse.json(contract)
  } catch (error) {
    console.error("Error fetching contract:", error)
    return NextResponse.json({ error: "Failed to fetch contract" }, { status: 500 })
  }
}

// Create or update contract
export async function POST(request: Request) {
  try {
    const userId = "user_123" // Placeholder
    const contractData = await request.json()

    const newContract: Contract = {
      id: nanoid(),
      userId,
      createdAt: new Date().toISOString(),
      ...contractData,
    }

    // Generate contract JSON
    const contractJson = JSON.stringify(newContract, null, 2)
    const contractBlob = new Blob([contractJson], { type: "application/json" })

    // Store in Vercel Blob
    const blob = await put(`contracts/${userId}/${newContract.id}.json`, contractBlob, {
      access: "public",
    })

    // Update contract with blob URL
    const contractWithBlob = {
      ...newContract,
      blobUrl: blob.url,
    }

    // Save contract to KV store
    await kv.set(`user:${userId}:contract`, contractWithBlob)

    return NextResponse.json(contractWithBlob)
  } catch (error) {
    console.error("Error creating contract:", error)
    return NextResponse.json({ error: "Failed to create contract" }, { status: 500 })
  }
}
