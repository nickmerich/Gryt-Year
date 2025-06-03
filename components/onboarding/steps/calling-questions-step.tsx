"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useOnboarding } from "../onboarding-provider"
import { Church, Heart, Sparkles, ArrowRight, ArrowLeft } from "lucide-react"

const questions = [
  {
    id: "calling",
    emoji: "🙏",
    title: "What does God call you toward?",
    placeholder: "Describe your divine calling and purpose...",
    description: "Reflect on your spiritual calling and the purpose you feel drawn to fulfill.",
    icon: Church,
    color: "from-yellow-500 to-orange-500",
    bgColor: "from-yellow-50 to-orange-50",
  },
  {
    id: "sacrifice",
    emoji: "💪",
    title: "What comforts will you sacrifice to achieve it?",
    placeholder: "What are you willing to give up for growth...",
    description: "Growth requires sacrifice. What comforts or habits will you release?",
    icon: Heart,
    color: "from-red-500 to-pink-500",
    bgColor: "from-red-50 to-pink-50",
  },
  {
    id: "guidance",
    emoji: "✨",
    title: "How will love, self-belief, and faith guide your daily discipline?",
    placeholder: "Describe how these principles will shape your journey...",
    description: "Define how these core values will influence your daily actions and decisions.",
    icon: Sparkles,
    color: "from-purple-500 to-blue-500",
    bgColor: "from-purple-50 to-blue-50",
  },
]

export function CallingQuestionsStep() {
  const { completeStep } = useOnboarding()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({
    calling: "",
    sacrifice: "",
    guidance: "",
  })

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Save answers and complete step
      localStorage.setItem("gryt-calling-answers", JSON.stringify(answers))
      completeStep("calling-questions")
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const isCurrentAnswerValid = answers[question.id as keyof typeof answers].trim().length > 10
  const allAnswersComplete = Object.values(answers).every((answer) => answer.trim().length > 10)

  const IconComponent = question.icon

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="bg-purple-500 text-white px-6 py-2 text-lg rounded-full mb-4">
            🙏 Sacred Foundation Questions
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Your Divine Calling
          </h2>
          <p className="text-lg text-gray-600">
            These foundational questions will guide your entire transformation journey
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Question Progress</span>
            <span className="text-sm text-gray-600">
              {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-3 rounded-full" />
        </div>

        {/* Question Card */}
        <Card className={`rounded-3xl shadow-xl border-0 bg-gradient-to-br ${question.bgColor} overflow-hidden`}>
          {/* Question header */}
          <div className={`h-3 bg-gradient-to-r ${question.color}`}></div>

          <CardHeader className="pb-4">
            <div className="flex items-center justify-center mb-6">
              <div
                className={`w-24 h-24 bg-gradient-to-br ${question.color} rounded-full flex items-center justify-center shadow-lg`}
              >
                <span className="text-4xl">{question.emoji}</span>
              </div>
            </div>
            <CardTitle className="text-2xl text-center text-gray-900 mb-4">{question.title}</CardTitle>
            <p className="text-center text-gray-600">{question.description}</p>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <div className="space-y-6">
              <div>
                <Textarea
                  placeholder={question.placeholder}
                  value={answers[question.id as keyof typeof answers]}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="min-h-40 rounded-2xl border-2 border-gray-200 focus:border-purple-500 bg-white/80 backdrop-blur-sm"
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-500">Take your time to reflect deeply on this question</p>
                  <span
                    className={`text-xs ${
                      answers[question.id as keyof typeof answers].length > 10 ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    {answers[question.id as keyof typeof answers].length} characters
                  </span>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="rounded-2xl"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <div className="flex space-x-2">
                  {questions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index < currentQuestion
                          ? "bg-green-500"
                          : index === currentQuestion
                            ? "bg-purple-500"
                            : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  onClick={handleNext}
                  disabled={!isCurrentAnswerValid}
                  className={`rounded-2xl ${
                    isCurrentAnswerValid
                      ? `bg-gradient-to-r ${question.color} hover:opacity-90 text-white`
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Encouragement */}
        <div className="mt-8 text-center">
          <Card className="rounded-3xl shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-center space-x-3">
                <IconComponent className="h-6 w-6 text-purple-600" />
                <p className="text-gray-700">
                  {currentQuestion === 0 && "🙏 Connect with your divine purpose and calling"}
                  {currentQuestion === 1 && "💪 Embrace the sacrifices that lead to growth"}
                  {currentQuestion === 2 && "✨ Let love, faith, and belief guide your journey"}
                </p>
              </div>
              {allAnswersComplete && currentQuestion === questions.length - 1 && (
                <div className="mt-4 p-4 bg-green-100 rounded-2xl">
                  <p className="text-green-800 font-medium">
                    🎉 Beautiful! Your answers will serve as your north star throughout this journey.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
