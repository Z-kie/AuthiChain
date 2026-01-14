import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { awardPoints, checkAndAwardAchievements, getUserStats, POINTS } from '@/lib/gamification'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const truemarkId = params.id

    // Check if user is authenticated (optional for verification)
    const { data: { user } } = await supabase.auth.getUser()

    // Get product by TrueMark ID (public access)
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('truemark_id', truemarkId)
      .single()

    if (error || !product) {
      return NextResponse.json(
        {
          success: false,
          result: 'counterfeit',
          message: 'Product not found in blockchain registry',
          gamification: null,
        },
        { status: 200 } // Return 200 even for not found to allow verification page to show result
      )
    }

    // Simulate TrueMark™ pattern verification
    const isAuthentic = product.is_registered && product.truemark_data

    // Record the scan
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'Unknown'

    await supabase.from('scans').insert({
      product_id: product.id,
      scan_result: isAuthentic ? 'authentic' : 'counterfeit',
      confidence: isAuthentic ? 0.98 : 0.75,
      ip_address: ip,
      user_agent: userAgent,
    })

    // Award points if user is authenticated
    let gamificationData = null
    if (user) {
      // Get current stats to check if this is first verification
      const stats = await getUserStats(user.id)
      const isFirstVerification = stats?.total_verifications === 0

      // Award points
      const pointsToAward = isFirstVerification ? POINTS.FIRST_VERIFICATION : POINTS.VERIFICATION
      const activityType = isAuthentic ? 'verification' : 'counterfeit'
      const result = await awardPoints(user.id, pointsToAward, activityType)

      if (result) {
        // Check for new achievements
        const updatedStats = await getUserStats(user.id)
        const newAchievements = updatedStats
          ? await checkAndAwardAchievements(user.id, updatedStats)
          : []

        gamificationData = {
          pointsAwarded: result.points_awarded,
          newTotal: result.new_total,
          level: result.level,
          levelUp: result.level_up,
          streak: result.streak,
          achievements: newAchievements,
        }
      }
    }

    if (isAuthentic) {
      return NextResponse.json({
        success: true,
        result: 'authentic',
        product: {
          name: product.name,
          brand: product.brand,
          category: product.category,
          description: product.description,
          truemark_id: product.truemark_id,
          blockchain_tx_hash: product.blockchain_tx_hash,
          registered_at: product.created_at,
        },
        confidence: 0.98,
        message: 'Product verified as authentic',
        gamification: gamificationData,
      })
    } else {
      return NextResponse.json({
        success: false,
        result: 'counterfeit',
        message: 'Product verification failed',
        confidence: 0.75,
        gamification: gamificationData,
      })
    }
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify product' },
      { status: 500 }
    )
  }
}
