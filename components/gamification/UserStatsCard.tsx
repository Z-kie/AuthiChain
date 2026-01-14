'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Trophy, Star, Flame, TrendingUp, Award } from 'lucide-react'
import type { UserStats, Achievement } from '@/lib/supabase/types'
import {
  formatPoints,
  getLevelProgress,
  pointsForNextLevel,
  getLevelTitle,
  getStreakEmoji,
  getTierColor,
} from '@/lib/gamification'

interface UserStatsCardProps {
  stats: UserStats | null
  achievements: Achievement[]
}

export function UserStatsCard({ stats, achievements }: UserStatsCardProps) {
  if (!stats) {
    return (
      <Card className="col-span-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
        <CardContent className="p-8 text-center">
          <Trophy className="w-12 h-12 mx-auto mb-3 text-purple-500" />
          <h3 className="text-lg font-semibold mb-2">Start Your TrustChain Journey!</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Verify products to earn points, unlock achievements, and level up!
          </p>
          <Badge variant="outline" className="bg-purple-500/10 border-purple-500/50">
            Ready to begin!
          </Badge>
        </CardContent>
      </Card>
    )
  }

  const levelProgress = getLevelProgress(stats.total_points, stats.level)
  const nextLevelPoints = pointsForNextLevel(stats.level)
  const pointsNeeded = nextLevelPoints - stats.total_points

  // Get recent achievements (top 3)
  const recentAchievements = achievements.slice(0, 3)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Main Stats Card */}
      <Card className="col-span-full md:col-span-2 bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-pink-800/20 border-purple-500/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Trophy className="w-6 h-6 text-yellow-500" />
                TrustChain Stats
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {getLevelTitle(stats.level)}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-purple-500">
                Level {stats.level}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Level Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Level Progress</span>
              <span className="text-sm text-muted-foreground">
                {formatPoints(stats.total_points)} / {formatPoints(nextLevelPoints)} XP
              </span>
            </div>
            <Progress value={levelProgress} className="h-3" />
            <p className="text-xs text-muted-foreground mt-1">
              {formatPoints(pointsNeeded)} XP until Level {stats.level + 1}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
              <Star className="w-5 h-5 mx-auto mb-1 text-yellow-500 fill-yellow-500" />
              <div className="text-xl font-bold">{formatPoints(stats.total_points)}</div>
              <div className="text-xs text-muted-foreground">Total Points</div>
            </div>

            <div className="text-center p-3 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
              <Flame className="w-5 h-5 mx-auto mb-1 text-orange-500" />
              <div className="text-xl font-bold">
                {stats.current_streak} {getStreakEmoji(stats.current_streak)}
              </div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>

            <div className="text-center p-3 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
              <TrendingUp className="w-5 h-5 mx-auto mb-1 text-green-500" />
              <div className="text-xl font-bold">{stats.total_verifications}</div>
              <div className="text-xs text-muted-foreground">Verifications</div>
            </div>

            <div className="text-center p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
              <Award className="w-5 h-5 mx-auto mb-1 text-blue-500" />
              <div className="text-xl font-bold">{achievements.length}</div>
              <div className="text-xs text-muted-foreground">Achievements</div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="flex items-center justify-around pt-4 border-t border-purple-500/20">
            <div className="text-center">
              <div className="text-lg font-semibold">{stats.total_registrations}</div>
              <div className="text-xs text-muted-foreground">Products Registered</div>
            </div>
            <div className="h-8 w-px bg-purple-500/20" />
            <div className="text-center">
              <div className="text-lg font-semibold">{stats.best_streak}</div>
              <div className="text-xs text-muted-foreground">Best Streak</div>
            </div>
            <div className="h-8 w-px bg-purple-500/20" />
            <div className="text-center">
              <div className="text-lg font-semibold">{stats.counterfeit_found}</div>
              <div className="text-xs text-muted-foreground">Counterfeits Found</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Card */}
      <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentAchievements.length > 0 ? (
            <div className="space-y-3">
              {recentAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-3 rounded-lg border bg-gradient-to-br ${getTierColor(achievement.tier)} border-yellow-500/30`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">{achievement.name}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {achievement.description}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="outline" className="text-xs bg-yellow-500/20 border-yellow-500/50">
                      {achievement.tier}
                    </Badge>
                    <span className="text-xs font-semibold text-yellow-500">
                      +{achievement.point_value} XP
                    </span>
                  </div>
                </div>
              ))}

              {achievements.length > 3 && (
                <div className="text-center pt-2">
                  <Badge variant="outline" className="text-xs">
                    +{achievements.length - 3} more achievements
                  </Badge>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <Trophy className="w-12 h-12 mx-auto mb-2 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                Verify products to unlock achievements!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
