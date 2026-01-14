'use client'

import { useEffect, useState } from 'react'
import { Zap, Star } from 'lucide-react'
import { getLevelTitle } from '@/lib/gamification'

interface LevelUpAnimationProps {
  level: number
  active: boolean
  onComplete?: () => void
}

export function LevelUpAnimation({ level, active, onComplete }: LevelUpAnimationProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (active) {
      setVisible(true)

      const timer = setTimeout(() => {
        setVisible(false)
        setTimeout(() => onComplete?.(), 300)
      }, 3500)

      return () => clearTimeout(timer)
    }
  }, [active, onComplete])

  if (!visible || !level) return null

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
      {/* Radial burst effect */}
      <div className="absolute inset-0 animate-radial-burst">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-1 h-32 bg-gradient-to-t from-yellow-500 to-transparent"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-50%)`,
              transformOrigin: '50% 0',
            }}
          />
        ))}
      </div>

      {/* Main level up card */}
      <div className="relative z-10 animate-level-up-bounce">
        <div className="relative bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 rounded-3xl shadow-2xl border-4 border-yellow-500 overflow-hidden">
          {/* Animated stars */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <Star
                key={i}
                className="absolute text-yellow-300 fill-yellow-300 animate-float-star"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${8 + Math.random() * 8}px`,
                  height: `${8 + Math.random() * 8}px`,
                  animationDelay: `${Math.random() * 2}s`,
                  opacity: 0.6 + Math.random() * 0.4,
                }}
              />
            ))}
          </div>

          <div className="relative px-12 py-10 text-center">
            {/* Lightning bolt */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-50" />
                <Zap className="relative w-20 h-20 text-yellow-500 fill-yellow-500 animate-pulse-glow" />
              </div>
            </div>

            {/* Level up text */}
            <h2 className="text-5xl font-black text-white mb-2 drop-shadow-lg animate-text-glow">
              LEVEL UP!
            </h2>

            <div className="text-7xl font-black text-yellow-400 mb-3 drop-shadow-2xl animate-number-pop">
              {level}
            </div>

            <p className="text-xl font-semibold text-purple-200 mb-2">
              {getLevelTitle(level)}
            </p>

            <div className="flex items-center justify-center gap-2 text-yellow-300">
              <Star className="w-5 h-5 fill-yellow-300" />
              <span className="text-lg font-semibold">New rewards unlocked!</span>
              <Star className="w-5 h-5 fill-yellow-300" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes level-up-bounce {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.15) rotate(5deg);
          }
          70% {
            transform: scale(0.95) rotate(-5deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        @keyframes radial-burst {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(2) rotate(180deg);
            opacity: 0;
          }
        }
        @keyframes float-star {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes pulse-glow {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 10px #fbbf24);
          }
          50% {
            transform: scale(1.1);
            filter: drop-shadow(0 0 20px #fbbf24);
          }
        }
        @keyframes text-glow {
          0%, 100% {
            text-shadow: 0 0 20px #fbbf24, 0 0 40px #fbbf24;
          }
          50% {
            text-shadow: 0 0 30px #fbbf24, 0 0 60px #fbbf24, 0 0 80px #fbbf24;
          }
        }
        @keyframes number-pop {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-level-up-bounce {
          animation: level-up-bounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .animate-radial-burst {
          animation: radial-burst 1s ease-out;
        }
        .animate-float-star {
          animation: float-star 3s infinite ease-in-out;
        }
        .animate-pulse-glow {
          animation: pulse-glow 1.5s infinite;
        }
        .animate-text-glow {
          animation: text-glow 2s infinite;
        }
        .animate-number-pop {
          animation: number-pop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.3s backwards;
        }
      `}</style>
    </div>
  )
}
