"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, TrendingUp } from "lucide-react"

interface ConfidenceScoreProps {
  score: number
  label?: string
}

export function ConfidenceScore({ score, label = "Authenticity Confidence" }: ConfidenceScoreProps) {
  const percentage = Math.round(score * 100)
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const getColor = (score: number) => {
    if (score >= 0.9) return { stroke: "#22c55e", text: "text-green-500" }
    if (score >= 0.7) return { stroke: "#eab308", text: "text-yellow-500" }
    return { stroke: "#ef4444", text: "text-red-500" }
  }

  const colors = getColor(score)

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle>{label}</CardTitle>
        </div>
        <CardDescription>
          AI-powered authenticity verification score
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-40 h-40">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted"
              opacity="0.2"
            />
            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r="45"
              stroke={colors.stroke}
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-bold ${colors.text}`}>
              {percentage}%
            </span>
            <span className="text-xs text-muted-foreground mt-1">
              Confidence
            </span>
          </div>
        </div>

        {/* Status text */}
        <div className="mt-4 text-center">
          {score >= 0.9 && (
            <div className="flex items-center space-x-2 text-green-500">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-semibold">Highly Authentic</span>
            </div>
          )}
          {score >= 0.7 && score < 0.9 && (
            <div className="flex items-center space-x-2 text-yellow-500">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-semibold">Likely Authentic</span>
            </div>
          )}
          {score < 0.7 && (
            <div className="flex items-center space-x-2 text-red-500">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-semibold">Verification Uncertain</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
