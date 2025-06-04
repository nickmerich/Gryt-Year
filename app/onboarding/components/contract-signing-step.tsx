"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDate } from "@/lib/utils"

interface ContractSigningStepProps {
  formData: {
    goal: string
    motivation: string
    sacrifices: string
    habits: string
    integrations: string[]
    signature: string
    signatureDate: string
  }
  setFormData: React.Dispatch<React.SetStateAction<any>>
}

export default function ContractSigningStep({ formData, setFormData }: ContractSigningStepProps) {
  const [date, setDate] = useState(formatDate(new Date()))
  const signatureRef = useRef<HTMLInputElement>(null)

  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: any) => ({
      ...prev,
      signature: e.target.value,
      signatureDate: new Date().toISOString(),
    }))
  }

  // Format integrations for display
  const integrationNames = formData.integrations.map((id) => {
    const integrationMap: Record<string, string> = {
      "apple-health": "Apple Health",
      myfitnesspal: "MyFitnessPal",
      kindle: "Kindle",
      rescuetime: "RescueTime",
      strava: "Strava",
      goodreads: "Goodreads",
    }
    return integrationMap[id] || id
  })

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-4">
        <p className="text-blue-800 font-medium">
          "A sacred commitment is the foundation of transformation. What you sign today, you build tomorrow."
        </p>
        <p className="text-blue-700 text-sm mt-1">— Gryt Year Philosophy</p>
      </div>

      <ScrollArea className="h-64 rounded-md border p-4 bg-amber-50">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-bold">GRYT YEAR TRANSFORMATION CONTRACT</h3>
            <p className="text-sm text-gray-600">A Sacred Commitment to Growth</p>
          </div>

          <p className="text-sm leading-relaxed">
            I, <span className="font-bold underline">{formData.signature || "[Your Name]"}</span>, on this day{" "}
            <span className="font-bold">{date}</span>, make a sacred commitment to my personal transformation journey.
          </p>

          <div>
            <p className="font-medium">MY GOAL:</p>
            <p className="italic">{formData.goal || "[Your goal will appear here]"}</p>
          </div>

          <div>
            <p className="font-medium">MY MOTIVATION:</p>
            <p className="italic">{formData.motivation || "[Your motivation will appear here]"}</p>
          </div>

          <div>
            <p className="font-medium">I COMMIT TO SACRIFICE:</p>
            <p className="italic">{formData.sacrifices || "[Your sacrifices will appear here]"}</p>
          </div>

          <div>
            <p className="font-medium">I COMMIT TO THESE DAILY HABITS:</p>
            <p className="italic">{formData.habits || "[Your habits will appear here]"}</p>
          </div>

          {formData.integrations.length > 0 && (
            <div>
              <p className="font-medium">I WILL TRACK MY PROGRESS WITH:</p>
              <p className="italic">{integrationNames.join(", ")}</p>
            </div>
          )}

          <p className="text-sm leading-relaxed">
            I understand that transformation requires discipline, sacrifice, and unwavering commitment. I pledge to
            honor this contract for the next 365 days, knowing that my future self depends on the actions I take today.
          </p>

          <p className="text-sm leading-relaxed">
            This contract serves as my covenant with myself and with God. I will reference it in moments of weakness and
            celebrate it in moments of strength.
          </p>

          <div className="pt-4">
            <p className="font-medium">SIGNATURE:</p>
            <p className="italic">{formData.signature || "[Sign below]"}</p>
          </div>
        </div>
      </ScrollArea>

      <div className="space-y-2">
        <Label htmlFor="signature" className="text-lg font-medium">
          Sign Your Name:
        </Label>
        <Input
          ref={signatureRef}
          id="signature"
          value={formData.signature}
          onChange={handleSignatureChange}
          className="h-16 text-2xl font-signature border-2 border-gray-300 focus:border-blue-500 rounded-xl"
          placeholder="Type your full name"
        />
        <p className="text-sm text-gray-500">
          By typing your name above, you acknowledge this as your legal digital signature.
        </p>
      </div>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <p className="text-sm text-green-800">
            <span className="font-bold">What happens next:</span> Your signed contract will be securely stored in your
            profile. You'll receive weekly reminders of your commitments and can access this document anytime for
            accountability.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
