"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useOnboarding } from "../onboarding-provider"
import { User, Mail, Target, Heart } from "lucide-react"

export function ProfileSetupStep() {
  const { completeStep } = useOnboarding()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    location: "",
    motivation: "",
    experience: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleContinue = () => {
    // Save profile data (would integrate with backend)
    localStorage.setItem("gryt-profile", JSON.stringify(formData))
    completeStep("profile-setup")
  }

  const isFormValid = formData.name && formData.email && formData.motivation

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Tell Us About Yourself
          </h2>
          <p className="text-lg text-gray-600">Help us personalize your Gryt Year experience</p>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card className="rounded-3xl shadow-lg border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-600" />
                <span>Basic Information</span>
                <Badge className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">Required</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <Input
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="rounded-2xl border-2 border-gray-200 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="rounded-2xl border-2 border-gray-200 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age (Optional)</label>
                  <Input
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    className="rounded-2xl border-2 border-gray-200 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location (Optional)</label>
                  <Input
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="rounded-2xl border-2 border-gray-200 focus:border-blue-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Motivation */}
          <Card className="rounded-3xl shadow-lg border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-600" />
                <span>Your Motivation</span>
                <Badge className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">Required</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's driving you to start your Gryt Year? *
              </label>
              <Textarea
                placeholder="Share what's motivating you to transform your life this year..."
                value={formData.motivation}
                onChange={(e) => handleInputChange("motivation", e.target.value)}
                className="min-h-24 rounded-2xl border-2 border-gray-200 focus:border-red-500"
              />
              <p className="text-xs text-gray-500 mt-2">
                This helps us provide more personalized guidance and motivation
              </p>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card className="rounded-3xl shadow-lg border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-600" />
                <span>Previous Experience</span>
                <Badge className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">Optional</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Have you tried personal development programs before?
              </label>
              <Textarea
                placeholder="Tell us about any previous experiences with goal-setting, habit tracking, or transformation programs..."
                value={formData.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
                className="min-h-20 rounded-2xl border-2 border-gray-200 focus:border-green-500"
              />
            </CardContent>
          </Card>

          {/* Privacy note */}
          <Card className="rounded-3xl shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">🔒 Your Privacy Matters</h3>
                  <p className="text-sm text-gray-700">
                    We use this information to personalize your experience and provide relevant guidance. Your data is
                    secure and never shared with third parties.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Continue button */}
          <div className="text-center pt-4">
            <Button
              onClick={handleContinue}
              disabled={!isFormValid}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-12 py-6 text-xl rounded-2xl shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isFormValid ? "✨ Continue Setup" : "📝 Complete Required Fields"}
            </Button>
            <p className="text-sm text-gray-500 mt-3">
              {isFormValid ? "Great! Let's move to the next step" : "Please fill in your name, email, and motivation"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
