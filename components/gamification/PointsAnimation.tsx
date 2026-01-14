'use client'

import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'

interface PointsAnimationProps {
  points: number
  active: boolean
  onComplete?: () => void
}

export function PointsAnimation({ points, active, onComplete }: PointsAnimationProps) {
  const [visible, setVisible] = useState(false)
  const [animatedPoints, setAnimatedPoints] = useState(0)

  useEffect(() => {
    if (active) {
      setVisible(true)

      // Animate points counting up
      const duration = 1000
      const steps = 30
      const increment = points / steps
      let current = 0

      const interval = setInterval(() => {
        current += increment
        if (current >= points) {
          setAnimatedPoints(points)
          clearInterval(interval)
        } else {
          setAnimatedPoints(Math.floor(current))
        }
      }, duration / steps)

      // Hide after animation
      const hideTimer = setTimeout(() => {
        setVisible(false)
        setAnimatedPoints(0)
        onComplete?.()
      }, 2500)

      return () => {
        clearInterval(interval)
        clearTimeout(hideTimer)
      }
    }
  }, [active, points, onComplete])

  if (!visible) return null

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
      <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-full shadow-2xl animate-bounce-in">
        <Sparkles className="w-8 h-8 animate-spin" />
        <div className="flex flex-col items-center">
          <span className="text-sm font-semibold opacity-90">Points Earned!</span>
          <span className="text-4xl font-bold">+{animatedPoints}</span>
        </div>
        <Sparkles className="w-8 h-8 animate-spin" style={{ animationDirection: 'reverse' }} />
      </div>
      <style jsx>{`
        @keyframes bounce-in {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(10deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </div>
  )
}
