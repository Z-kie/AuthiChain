'use client'

import { useEffect, useState } from 'react'

interface ConfettiProps {
  active: boolean
  duration?: number
}

interface Particle {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
  color: string
  velocity: { x: number; y: number }
  rotationSpeed: number
}

const COLORS = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e']

export function Confetti({ active, duration = 3000 }: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (active && !isActive) {
      setIsActive(true)

      // Create particles
      const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: 50, // Start from center
        y: 50,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        velocity: {
          x: (Math.random() - 0.5) * 15,
          y: -Math.random() * 15 - 5,
        },
        rotationSpeed: (Math.random() - 0.5) * 10,
      }))

      setParticles(newParticles)

      // Clear after duration
      const timer = setTimeout(() => {
        setParticles([])
        setIsActive(false)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [active, isActive, duration])

  if (!isActive || particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 rounded-sm animate-confetti-fall"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
            '--velocity-x': `${particle.velocity.x}vw`,
            '--velocity-y': `${particle.velocity.y}vh`,
            '--rotation-speed': `${particle.rotationSpeed}deg`,
          } as React.CSSProperties}
        />
      ))}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(var(--velocity-x), calc(100vh + var(--velocity-y)))
                       rotate(calc(360deg * var(--rotation-speed) / 10));
            opacity: 0;
          }
        }
        .animate-confetti-fall {
          animation: confetti-fall 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
    </div>
  )
}
