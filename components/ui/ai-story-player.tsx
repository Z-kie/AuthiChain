"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Download, Volume2, SkipBack, SkipForward } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface TranscriptSegment {
  timestamp: number // in seconds
  text: string
  speaker?: string
}

interface AIStoryPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  audioUrl: string
  duration: number // in seconds
  transcript: TranscriptSegment[]
  onDownload?: () => void
}

const AIStoryPlayer = React.forwardRef<HTMLDivElement, AIStoryPlayerProps>(
  ({ className, title, audioUrl, duration, transcript, onDownload, ...props }, ref) => {
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [currentTime, setCurrentTime] = React.useState(0)
    const [volume, setVolume] = React.useState(1)
    const audioRef = React.useRef<HTMLAudioElement>(null)

    // Waveform visualization data (simulated)
    const waveformBars = React.useMemo(() => {
      return Array.from({ length: 100 }, (_, i) => ({
        id: i,
        height: Math.random() * 60 + 20,
      }))
    }, [])

    // Find current transcript segment
    const currentSegment = React.useMemo(() => {
      return transcript.find((segment, index) => {
        const nextSegment = transcript[index + 1]
        return (
          currentTime >= segment.timestamp &&
          (!nextSegment || currentTime < nextSegment.timestamp)
        )
      })
    }, [currentTime, transcript])

    const progress = (currentTime / duration) * 100

    const togglePlayPause = () => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause()
        } else {
          audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
      }
    }

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = x / rect.width
      const newTime = percentage * duration

      if (audioRef.current) {
        audioRef.current.currentTime = newTime
        setCurrentTime(newTime)
      }
    }

    const skip = (seconds: number) => {
      if (audioRef.current) {
        const newTime = Math.max(0, Math.min(duration, currentTime + seconds))
        audioRef.current.currentTime = newTime
        setCurrentTime(newTime)
      }
    }

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60)
      const secs = Math.floor(seconds % 60)
      return `${mins}:${secs.toString().padStart(2, "0")}`
    }

    React.useEffect(() => {
      const audio = audioRef.current
      if (!audio) return

      const updateTime = () => setCurrentTime(audio.currentTime)
      const handleEnded = () => setIsPlaying(false)

      audio.addEventListener("timeupdate", updateTime)
      audio.addEventListener("ended", handleEnded)

      return () => {
        audio.removeEventListener("timeupdate", updateTime)
        audio.removeEventListener("ended", handleEnded)
      }
    }, [])

    return (
      <Card ref={ref} className={cn("overflow-hidden", className)} {...props}>
        <CardContent className="p-6">
          {/* Hidden audio element */}
          <audio ref={audioRef} src={audioUrl} preload="metadata" />

          {/* Title */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">AI Generated Story</p>
          </div>

          {/* Waveform Visualization */}
          <div
            className="relative h-32 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg mb-6 overflow-hidden cursor-pointer"
            onClick={handleProgressClick}
          >
            <div className="absolute inset-0 flex items-center justify-center gap-1 px-4">
              {waveformBars.map((bar, index) => {
                const barProgress = (index / waveformBars.length) * 100
                const isPast = barProgress <= progress

                return (
                  <motion.div
                    key={bar.id}
                    className={cn(
                      "flex-1 rounded-full transition-colors duration-300",
                      isPast
                        ? "bg-purple-600"
                        : "bg-purple-300"
                    )}
                    style={{ height: `${bar.height}%` }}
                    animate={
                      isPlaying && isPast
                        ? {
                            scaleY: [1, 1.2, 1],
                            transition: {
                              repeat: Infinity,
                              duration: 0.8,
                              delay: index * 0.01,
                            },
                          }
                        : {}
                    }
                  />
                )
              })}
            </div>

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  togglePlayPause()
                }}
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8 text-purple-600" />
                ) : (
                  <Play className="h-8 w-8 text-purple-600" />
                )}
              </motion.div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div
              className="h-2 bg-gray-200 rounded-full cursor-pointer overflow-hidden"
              onClick={handleProgressClick}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 to-purple-500"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => skip(-10)}
                className="h-10 w-10"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                variant="default"
                size="icon"
                onClick={togglePlayPause}
                className="h-12 w-12 bg-purple-600 hover:bg-purple-700"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => skip(10)}
                className="h-10 w-10"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-gray-500" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume * 100}
                onChange={(e) => {
                  const newVolume = parseFloat(e.target.value) / 100
                  setVolume(newVolume)
                  if (audioRef.current) {
                    audioRef.current.volume = newVolume
                  }
                }}
                className="w-24 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              {onDownload && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onDownload}
                  className="h-10 w-10"
                >
                  <Download className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Transcript Sync */}
          <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Transcript
            </h4>
            <AnimatePresence mode="wait">
              {currentSegment && (
                <motion.div
                  key={currentSegment.timestamp}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  {currentSegment.speaker && (
                    <div className="text-xs font-semibold text-purple-600">
                      {currentSegment.speaker}
                    </div>
                  )}
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {currentSegment.text}
                  </p>
                  <div className="text-xs text-gray-400">
                    {formatTime(currentSegment.timestamp)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* All transcript segments */}
            <div className="mt-4 space-y-3 border-t border-gray-200 pt-4">
              {transcript.map((segment, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = segment.timestamp
                      setCurrentTime(segment.timestamp)
                    }
                  }}
                  className={cn(
                    "text-left w-full p-2 rounded transition-colors",
                    currentSegment?.timestamp === segment.timestamp
                      ? "bg-purple-100"
                      : "hover:bg-gray-100"
                  )}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-xs text-gray-400 mt-0.5 min-w-[40px]">
                      {formatTime(segment.timestamp)}
                    </span>
                    <span className="text-xs text-gray-600">
                      {segment.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
)

AIStoryPlayer.displayName = "AIStoryPlayer"

export { AIStoryPlayer }
export type { AIStoryPlayerProps, TranscriptSegment }
