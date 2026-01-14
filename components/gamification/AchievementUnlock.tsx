'use client'

import { useEffect, useState } from 'react'
import { Trophy, Star } from 'lucide-react'
import type { Achievement } from '@/lib/supabase/types'
import { getTierColor, getTierGlow } from '@/lib/gamification'

interface AchievementUnlockProps {
  achievement: Achievement | null
  onComplete?: () => void
}

export function AchievementUnlock({ achievement, onComplete }: AchievementUnlockProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (achievement) {
      setVisible(true)

      const timer = setTimeout(() => {
        setVisible(false)
        setTimeout(() => onComplete?.(), 300)
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [achievement, onComplete])

  if (!visible || !achievement) return null

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <div className="relative animate-achievement-slide">
        {/* Glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${getTierColor(achievement.tier)} blur-xl opacity-50 rounded-2xl`} />

        {/* Main card */}
        <div className={`relative bg-gray-900 border-2 border-yellow-500 rounded-2xl shadow-2xl ${getTierGlow(achievement.tier)} overflow-hidden`}>
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />

          <div className="relative px-8 py-6 flex items-center gap-4">
            {/* Icon */}
            <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${getTierColor(achievement.tier)} flex items-center justify-center shadow-lg`}>
              <span className="text-3xl">{achievement.icon}</span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-xs font-semibold text-yellow-500 uppercase tracking-wider">
                  Achievement Unlocked!
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{achievement.name}</h3>
              <p className="text-sm text-gray-400">{achievement.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-semibold text-yellow-500">
                  +{achievement.point_value} points
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes achievement-slide {
          0% {
            transform: translateY(-150%);
            opacity: 0;
          }
          10% {
            transform: translateY(0);
            opacity: 1;
          }
          90% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-150%);
            opacity: 0;
          }
        }
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-achievement-slide {
          animation: achievement-slide 4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .animate-shine {
          animation: shine 2s infinite;
        }
      `}</style>
    </div>
  )
}
