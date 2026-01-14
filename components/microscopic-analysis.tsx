"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Microscope, CheckCircle, AlertTriangle } from "lucide-react"

interface MicroscopicAnalysisProps {
  confidence: number
  features?: {
    fiberPattern: number
    materialComposition: number
    surfaceTexture: number
    microscopicMarkers: number
  }
}

export function MicroscopicAnalysis({ confidence, features }: MicroscopicAnalysisProps) {
  const defaultFeatures = features || {
    fiberPattern: 0.98,
    materialComposition: 0.95,
    surfaceTexture: 0.92,
    microscopicMarkers: 0.97,
  }

  const getStatusColor = (score: number) => {
    if (score >= 0.9) return "text-green-500"
    if (score >= 0.7) return "text-yellow-500"
    return "text-red-500"
  }

  const getStatusIcon = (score: number) => {
    if (score >= 0.9) return <CheckCircle className="h-4 w-4 text-green-500" />
    return <AlertTriangle className="h-4 w-4 text-yellow-500" />
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Microscope className="h-5 w-5 text-primary" />
          <CardTitle>TrueMark™ Microscopic Analysis</CardTitle>
        </div>
        <CardDescription>
          AI-powered analysis of microscopic product features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Visual representation */}
        <div className="relative h-32 bg-gradient-to-br from-primary/5 to-primary/20 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-24 h-24">
              {/* Simulated microscopic pattern */}
              <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full border-2 border-primary/50"></div>
              <div className="absolute inset-4 rounded-full border-2 border-primary/70"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Microscope className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
          <div className="absolute top-2 right-2">
            <Badge className="bg-primary">
              {(confidence * 100).toFixed(1)}% Match
            </Badge>
          </div>
        </div>

        {/* Feature analysis */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Analysis Results:</h4>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIcon(defaultFeatures.fiberPattern)}
                <span className="text-sm">Fiber Pattern Match</span>
              </div>
              <span className={`text-sm font-mono ${getStatusColor(defaultFeatures.fiberPattern)}`}>
                {(defaultFeatures.fiberPattern * 100).toFixed(1)}%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIcon(defaultFeatures.materialComposition)}
                <span className="text-sm">Material Composition</span>
              </div>
              <span className={`text-sm font-mono ${getStatusColor(defaultFeatures.materialComposition)}`}>
                {(defaultFeatures.materialComposition * 100).toFixed(1)}%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIcon(defaultFeatures.surfaceTexture)}
                <span className="text-sm">Surface Texture</span>
              </div>
              <span className={`text-sm font-mono ${getStatusColor(defaultFeatures.surfaceTexture)}`}>
                {(defaultFeatures.surfaceTexture * 100).toFixed(1)}%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIcon(defaultFeatures.microscopicMarkers)}
                <span className="text-sm">Microscopic Markers</span>
              </div>
              <span className={`text-sm font-mono ${getStatusColor(defaultFeatures.microscopicMarkers)}`}>
                {(defaultFeatures.microscopicMarkers * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
