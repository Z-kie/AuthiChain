import { createClient } from '@/lib/supabase/client'
import type { AwardPointsResult, Achievement, UserStats } from './supabase/types'

export const POINTS = {
  VERIFICATION: 25,
  FIRST_VERIFICATION: 50,
  REGISTRATION: 100,
  COUNTERFEIT_FOUND: 200,
  DAILY_BONUS: 10,
  STREAK_BONUS_3: 50,
  STREAK_BONUS_7: 150,
  STREAK_BONUS_30: 500,
} as const

export const TIER_COLORS = {
  bronze: 'from-amber-700 to-amber-500',
  silver: 'from-gray-400 to-gray-300',
  gold: 'from-yellow-500 to-yellow-300',
  platinum: 'from-purple-500 to-purple-300',
  diamond: 'from-cyan-400 to-blue-500',
} as const

export const TIER_GLOWS = {
  bronze: 'shadow-amber-500/50',
  silver: 'shadow-gray-400/50',
  gold: 'shadow-yellow-400/50',
  platinum: 'shadow-purple-400/50',
  diamond: 'shadow-cyan-400/50',
} as const

/**
 * Award points to a user for an activity
 */
export async function awardPoints(
  userId: string,
  points: number,
  activityType: 'verification' | 'registration' | 'counterfeit'
): Promise<AwardPointsResult | null> {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.rpc('award_points', {
      p_user_id: userId,
      p_points: points,
      p_activity_type: activityType,
    })

    if (error) {
      console.error('Error awarding points:', error)
      return null
    }

    return data as AwardPointsResult
  } catch (err) {
    console.error('Exception awarding points:', err)
    return null
  }
}

/**
 * Get user stats
 */
export async function getUserStats(userId: string): Promise<UserStats | null> {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) {
      // User stats don't exist yet, return default
      if (error.code === 'PGRST116') {
        return {
          user_id: userId,
          total_points: 0,
          level: 1,
          current_streak: 0,
          best_streak: 0,
          total_verifications: 0,
          total_registrations: 0,
          counterfeit_found: 0,
          last_activity_date: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      }
      console.error('Error fetching user stats:', error)
      return null
    }

    return data
  } catch (err) {
    console.error('Exception fetching user stats:', err)
    return null
  }
}

/**
 * Get all achievements
 */
export async function getAchievements(): Promise<Achievement[]> {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('point_value', { ascending: true })

    if (error) {
      console.error('Error fetching achievements:', error)
      return []
    }

    return data || []
  } catch (err) {
    console.error('Exception fetching achievements:', err)
    return []
  }
}

/**
 * Get user's earned achievements
 */
export async function getUserAchievements(userId: string): Promise<Achievement[]> {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('user_achievements')
      .select('achievement_id, achievements(*)')
      .eq('user_id', userId)

    if (error) {
      console.error('Error fetching user achievements:', error)
      return []
    }

    return data?.map((ua: any) => ua.achievements).filter(Boolean) || []
  } catch (err) {
    console.error('Exception fetching user achievements:', err)
    return []
  }
}

/**
 * Check and award achievements based on user stats
 */
export async function checkAndAwardAchievements(userId: string, stats: UserStats): Promise<Achievement[]> {
  const supabase = createClient()
  const newAchievements: Achievement[] = []

  try {
    // Get all achievements
    const allAchievements = await getAchievements()

    // Get already earned achievements
    const earnedAchievements = await getUserAchievements(userId)
    const earnedIds = new Set(earnedAchievements.map(a => a.id))

    // Check each achievement
    for (const achievement of allAchievements) {
      // Skip if already earned
      if (earnedIds.has(achievement.id)) continue

      let shouldAward = false
      const criteria = achievement.criteria as any

      // Check achievement criteria
      switch (criteria.type) {
        case 'count':
          if (achievement.category === 'verification') {
            shouldAward = stats.total_verifications >= criteria.target
          } else if (achievement.category === 'registration') {
            shouldAward = stats.total_registrations >= criteria.target
          }
          break

        case 'streak':
          shouldAward = stats.current_streak >= criteria.days
          break

        case 'counterfeit':
          shouldAward = stats.counterfeit_found >= criteria.target
          break

        // Add more criteria types as needed
      }

      // Award achievement
      if (shouldAward) {
        const { error } = await supabase
          .from('user_achievements')
          .insert({
            user_id: userId,
            achievement_id: achievement.id,
          })

        if (!error) {
          newAchievements.push(achievement)
        }
      }
    }

    return newAchievements
  } catch (err) {
    console.error('Exception checking achievements:', err)
    return []
  }
}

/**
 * Calculate level from points
 */
export function calculateLevel(points: number): number {
  return Math.max(1, Math.floor(Math.sqrt(points / 100)) + 1)
}

/**
 * Calculate points needed for next level
 */
export function pointsForNextLevel(currentLevel: number): number {
  return currentLevel * currentLevel * 100
}

/**
 * Calculate progress to next level (0-100)
 */
export function getLevelProgress(currentPoints: number, currentLevel: number): number {
  const currentLevelPoints = pointsForNextLevel(currentLevel - 1)
  const nextLevelPoints = pointsForNextLevel(currentLevel)
  const pointsInCurrentLevel = currentPoints - currentLevelPoints
  const pointsNeededForLevel = nextLevelPoints - currentLevelPoints

  return Math.min(100, Math.max(0, (pointsInCurrentLevel / pointsNeededForLevel) * 100))
}

/**
 * Get tier color classes
 */
export function getTierColor(tier: string): string {
  return TIER_COLORS[tier as keyof typeof TIER_COLORS] || TIER_COLORS.bronze
}

/**
 * Get tier glow classes
 */
export function getTierGlow(tier: string): string {
  return TIER_GLOWS[tier as keyof typeof TIER_GLOWS] || TIER_GLOWS.bronze
}

/**
 * Format points with commas
 */
export function formatPoints(points: number): string {
  return points.toLocaleString()
}

/**
 * Get streak emoji
 */
export function getStreakEmoji(streak: number): string {
  if (streak >= 30) return '🔥🔥🔥'
  if (streak >= 7) return '🔥🔥'
  if (streak >= 3) return '🔥'
  return '⚡'
}

/**
 * Get level title
 */
export function getLevelTitle(level: number): string {
  if (level >= 50) return 'Legendary Verifier'
  if (level >= 40) return 'Master Guardian'
  if (level >= 30) return 'Elite Inspector'
  if (level >= 20) return 'Expert Authenticator'
  if (level >= 10) return 'Skilled Verifier'
  if (level >= 5) return 'Apprentice Guardian'
  return 'Novice Verifier'
}
