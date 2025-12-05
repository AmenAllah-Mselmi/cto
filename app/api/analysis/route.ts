/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const period = searchParams.get('period') || 'month' // week, month, year

    const [
      userStats,
      recentWorkouts,
      workoutDistribution,
      weeklyActivity,
      muscleFocus,
      goalsProgress
    ] = await Promise.all([
      // User statistics
      prisma.statistiqueUtilisateur.findUnique({
        where: { userId: session.user.id }
      }),

      // Recent workouts
      prisma.sessionEntrainement.findMany({
        where: { userId: session.user.id },
        orderBy: { date: 'desc' },
        take: 5,
        include: {
          exercices: {
            include: {
              exercice: true
            }
          }
        }
      }),

      // Workout type distribution
      prisma.$queryRaw`
        SELECT 
          e.categorie as type,
          COUNT(*) as count
        FROM SessionEntrainement se
        JOIN RealisationExercice re ON se.id = re.sessionId
        JOIN Exercice e ON re.exerciceId = e.id
        WHERE se.userId = ${session.user.id}
        GROUP BY e.categorie
      `,

      // Weekly activity
      getWeeklyActivity(session.user.id),

      // Muscle focus
      getMuscleFocus(session.user.id),

      // Goals progress
      getGoalsProgress(session.user.id)
    ])

    // Calculate streaks
    const streak = await calculateStreak(session.user.id)

    // Generate insights
    const insights = generateInsights(
      userStats,
      workoutDistribution,
      muscleFocus
    )

    return NextResponse.json({
      statistics: userStats,
      streak,
      recentWorkouts,
      workoutDistribution,
      weeklyActivity,
      muscleFocus,
      goalsProgress,
      insights,
      period
    })

  } catch (error) {
    console.error('Get analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

async function getWeeklyActivity(userId: string) {
  const lastWeek = new Date()
  lastWeek.setDate(lastWeek.getDate() - 7)

  const activity = await prisma.sessionEntrainement.groupBy({
    by: ['date'],
    where: {
      userId,
      date: {
        gte: lastWeek
      }
    },
    _sum: {
      duree: true,
      calories: true
    },
    _count: {
      id: true
    }
  })

  return activity.map(day => ({
    date: day.date,
    workouts: day._count.id,
    duration: day._sum.duree || 0,
    calories: day._sum.calories || 0
  }))
}

async function getMuscleFocus(userId: string) {
  const muscleData = await prisma.$queryRaw`
    SELECT 
      JSON_UNQUOTE(JSON_EXTRACT(e.musclesCibles, '$[0]')) as muscle,
      COUNT(*) as count
    FROM SessionEntrainement se
    JOIN RealisationExercice re ON se.id = re.sessionId
    JOIN Exercice e ON re.exerciceId = e.id
    WHERE se.userId = ${userId}
      AND e.musclesCibles IS NOT NULL
    GROUP BY JSON_UNQUOTE(JSON_EXTRACT(e.musclesCibles, '$[0]'))
    ORDER BY count DESC
    LIMIT 6
  `

  return muscleData
}

async function getGoalsProgress(userId: string) {
  const profile = await prisma.profilSportif.findUnique({
    where: { userId }
  })

  if (!profile) {
    return []
  }

  // Calculate progress based on user's goals
  const stats = await prisma.statistiqueUtilisateur.findUnique({
    where: { userId }
  })

  const goals = [
    {
      title: 'Workout Consistency',
      target: profile.frequence * 4, // Monthly target
      current: stats?.sessionsTotal || 0,
      progress: Math.min(100, ((stats?.sessionsTotal || 0) / (profile.frequence * 4)) * 100)
    },
    {
      title: 'Calories Burned',
      target: 20000, // Monthly target
      current: stats?.caloriesTotal || 0,
      progress: Math.min(100, ((stats?.caloriesTotal || 0) / 20000) * 100)
    }
  ]

  return goals
}

async function calculateStreak(userId: string): Promise<number> {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let streak = 0
  const currentDate = today

  while (true) {
    const startOfDay = new Date(currentDate)
    const endOfDay = new Date(currentDate)
    endOfDay.setHours(23, 59, 59, 999)

    const workoutToday = await prisma.sessionEntrainement.findFirst({
      where: {
        userId,
        date: {
          gte: startOfDay,
          lte: endOfDay
        }
      }
    })

    if (!workoutToday) {
      break
    }

    streak++
    currentDate.setDate(currentDate.getDate() - 1)
  }

  return streak
}

function generateInsights(
  userStats: any,
  workoutDistribution: any,
  muscleFocus: any
): string[] {
  const insights = []

  // Check consistency
  const weeklyAvg = (userStats?.sessionsTotal || 0) / 4
  if (weeklyAvg < 3) {
    insights.push('Try to increase your workout frequency to at least 3 times per week')
  }

  // Check variety
  const distributionCount = workoutDistribution.length
  if (distributionCount < 3) {
    insights.push('Add more variety to your workouts for balanced development')
  }

  // Check muscle focus
  if (muscleFocus.length > 0) {
    const topMuscle = muscleFocus[0]
    if (topMuscle.count > 10) {
      insights.push(`You focus heavily on ${topMuscle.muscle}. Consider training other muscle groups`)
    }
  }

  if (insights.length === 0) {
    insights.push('Great progress! Keep up the consistent work')
  }

  return insights
}