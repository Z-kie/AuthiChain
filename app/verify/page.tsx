"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Shield, Search, CheckCircle, XCircle, Loader2, Trophy, Flame, Star } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Confetti } from "@/components/gamification/Confetti"
import { PointsAnimation } from "@/components/gamification/PointsAnimation"
import { AchievementUnlock } from "@/components/gamification/AchievementUnlock"
import { LevelUpAnimation } from "@/components/gamification/LevelUpAnimation"
import { formatPoints, getStreakEmoji } from "@/lib/gamification"

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const [truemarkId, setTruemarkId] = useState(searchParams.get("id") || "")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showPoints, setShowPoints] = useState(false)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [currentAchievementIndex, setCurrentAchievementIndex] = useState(0)
  const [animationQueue, setAnimationQueue] = useState<string[]>([])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!truemarkId.trim()) {
      toast({
        title: "Invalid Input",
        description: "Please enter a TrueMark™ ID.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch(`/api/verify/${truemarkId}`)

      if (!response.ok && response.status !== 200) {
        throw new Error("Verification failed")
      }

      const data = await response.json()
      setResult(data)

      // Trigger gamification animations if data exists
      if (data.gamification) {
        const queue: string[] = []

        // Always show confetti for authentic products
        if (data.result === 'authentic') {
          setShowConfetti(true)
        }

        // Queue animations
        if (data.gamification.pointsAwarded > 0) {
          queue.push('points')
        }
        if (data.gamification.levelUp) {
          queue.push('levelup')
        }
        if (data.gamification.achievements && data.gamification.achievements.length > 0) {
          data.gamification.achievements.forEach(() => queue.push('achievement'))
        }

        setAnimationQueue(queue)

        // Start animation sequence
        if (queue.length > 0) {
          setTimeout(() => playNextAnimation(queue, 0), 500)
        }
      }
    } catch (error) {
      console.error("Verification error:", error)
      toast({
        title: "Verification Failed",
        description: "Please check the TrueMark™ ID and try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const playNextAnimation = (queue: string[], index: number) => {
    if (index >= queue.length) return

    const animation = queue[index]

    if (animation === 'points') {
      setShowPoints(true)
    } else if (animation === 'levelup') {
      setShowLevelUp(true)
    } else if (animation === 'achievement') {
      setCurrentAchievementIndex(index - queue.filter((a, i) => i < index && a !== 'achievement').length)
    }
  }

  const handleAnimationComplete = () => {
    const currentIndex = animationQueue.findIndex((a, i) => {
      if (a === 'points' && showPoints) return true
      if (a === 'levelup' && showLevelUp) return true
      return false
    })

    if (currentIndex !== -1 && currentIndex < animationQueue.length - 1) {
      setTimeout(() => playNextAnimation(animationQueue, currentIndex + 1), 300)
    }

    setShowPoints(false)
    setShowLevelUp(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Gamification Animations */}
      <Confetti active={showConfetti} duration={3000} />
      <PointsAnimation
        points={result?.gamification?.pointsAwarded || 0}
        active={showPoints}
        onComplete={handleAnimationComplete}
      />
      <LevelUpAnimation
        level={result?.gamification?.level || 0}
        active={showLevelUp}
        onComplete={handleAnimationComplete}
      />
      {result?.gamification?.achievements?.map((achievement: any, index: number) => (
        <AchievementUnlock
          key={achievement.id}
          achievement={index === currentAchievementIndex ? achievement : null}
          onComplete={() => {
            const nextIndex = currentAchievementIndex + 1
            if (nextIndex < result.gamification.achievements.length) {
              setTimeout(() => setCurrentAchievementIndex(nextIndex), 300)
            }
          }}
        />
      ))}

      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold gradient-text">AuthiChain</span>
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Verify Product <span className="gradient-text">Authenticity</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Enter the TrueMark™ ID to verify if a product is authentic
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Enter TrueMark™ ID</CardTitle>
            <CardDescription>
              The TrueMark™ ID can be found on the product packaging or certificate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="truemark">TrueMark™ ID</Label>
                <Input
                  id="truemark"
                  value={truemarkId}
                  onChange={(e) => setTruemarkId(e.target.value)}
                  placeholder="e.g., TM-1234567890-ABC12345"
                  className="font-mono"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                variant="gradient"
                size="lg"
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Verify Product
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <Card
            className={`border-2 ${
              result.result === "authentic"
                ? "border-green-500"
                : "border-red-500"
            }`}
          >
            <CardHeader>
              <div className="flex items-center space-x-4">
                {result.result === "authentic" ? (
                  <CheckCircle className="h-12 w-12 text-green-500" />
                ) : (
                  <XCircle className="h-12 w-12 text-red-500" />
                )}
                <div>
                  <CardTitle className="text-2xl">
                    {result.result === "authentic"
                      ? "Product Verified ✓"
                      : "Verification Failed ✗"}
                  </CardTitle>
                  <CardDescription>{result.message}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {result.result === "authentic" && result.product && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Product Name</Label>
                      <p className="text-lg font-semibold">
                        {result.product.name}
                      </p>
                    </div>
                    {result.product.brand && (
                      <div>
                        <Label>Brand</Label>
                        <p className="text-lg font-semibold">
                          {result.product.brand}
                        </p>
                      </div>
                    )}
                    {result.product.category && (
                      <div>
                        <Label>Category</Label>
                        <p className="text-lg">{result.product.category}</p>
                      </div>
                    )}
                    <div>
                      <Label>Confidence</Label>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-500">
                          {(result.confidence * 100).toFixed(1)}%
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <Label>Blockchain Information</Label>
                    <div className="mt-2 space-y-2">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          TrueMark™ ID
                        </p>
                        <code className="text-sm font-mono bg-muted p-2 rounded block">
                          {result.product.truemark_id}
                        </code>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Transaction Hash
                        </p>
                        <code className="text-sm font-mono bg-muted p-2 rounded block truncate">
                          {result.product.blockchain_tx_hash}
                        </code>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Registered On
                        </p>
                        <p className="text-sm">
                          {new Date(
                            result.product.registered_at
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {result.product.description && (
                    <div className="border-t pt-4">
                      <Label>Description</Label>
                      <p className="text-muted-foreground mt-2">
                        {result.product.description}
                      </p>
                    </div>
                  )}
                </>
              )}

              {result.result === "counterfeit" && (
                <div className="space-y-4 text-center">
                  <p className="text-muted-foreground">
                    This product could not be verified in our blockchain registry.
                    It may be counterfeit or the TrueMark™ ID may be incorrect.
                  </p>
                  <div className="p-4 bg-red-500/10 rounded-lg">
                    <p className="text-sm font-medium text-red-500">
                      ⚠️ Warning: This product may not be authentic
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      If you believe this is an error, please contact the manufacturer
                      or seller for verification.
                    </p>
                  </div>
                </div>
              )}

              {/* Gamification Rewards Summary */}
              {result.gamification && (
                <div className="border-t pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <h3 className="text-lg font-semibold">Rewards Earned</h3>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-4 rounded-lg border border-yellow-500/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <p className="text-sm font-medium text-muted-foreground">Points</p>
                      </div>
                      <p className="text-2xl font-bold text-yellow-500">
                        +{formatPoints(result.gamification.pointsAwarded)}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4 rounded-lg border border-purple-500/20">
                      <p className="text-sm font-medium text-muted-foreground mb-1">Level</p>
                      <p className="text-2xl font-bold text-purple-500">
                        {result.gamification.level}
                        {result.gamification.levelUp && (
                          <span className="text-sm ml-1 text-green-500">↑</span>
                        )}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 p-4 rounded-lg border border-orange-500/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <p className="text-sm font-medium text-muted-foreground">Streak</p>
                      </div>
                      <p className="text-2xl font-bold text-orange-500">
                        {result.gamification.streak} {getStreakEmoji(result.gamification.streak)}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Trophy className="w-4 h-4 text-blue-500" />
                        <p className="text-sm font-medium text-muted-foreground">Achievements</p>
                      </div>
                      <p className="text-2xl font-bold text-blue-500">
                        +{result.gamification.achievements?.length || 0}
                      </p>
                    </div>
                  </div>

                  {result.gamification.achievements && result.gamification.achievements.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">New Achievements Unlocked:</p>
                      <div className="flex flex-wrap gap-2">
                        {result.gamification.achievements.map((achievement: any) => (
                          <Badge
                            key={achievement.id}
                            variant="outline"
                            className="px-3 py-1.5 border-yellow-500/50 bg-yellow-500/10"
                          >
                            <span className="mr-1">{achievement.icon}</span>
                            {achievement.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.gamification.levelUp && (
                    <div className="mt-4 p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
                      <p className="text-sm font-semibold text-center">
                        🎉 Congratulations! You leveled up to Level {result.gamification.level}!
                      </p>
                    </div>
                  )}

                  <div className="mt-4 text-center">
                    <Link href="/dashboard">
                      <Button variant="outline" size="sm">
                        View Full Stats
                        <Trophy className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* How to Find TrueMark™ ID */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How to Find Your TrueMark™ ID</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-medium">Check the product packaging</p>
                  <p className="text-sm text-muted-foreground">
                    Look for a TrueMark™ sticker or label on the packaging
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-medium">Scan the QR code</p>
                  <p className="text-sm text-muted-foreground">
                    If available, scan the QR code to automatically fill in the ID
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-medium">Enter the ID manually</p>
                  <p className="text-sm text-muted-foreground">
                    Type the TrueMark™ ID exactly as it appears on the product
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
