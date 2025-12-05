import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET user statistics
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
      analysisStats,
      streak
    ] = await Promise.all([
      // User statistics
      prisma.statistiqueUtilisateur.findUnique({
        where: { userId: session.user.id }
      }),

      // Recent workouts (last 5)
      prisma.sessionEntrainement.findMany({
        where: { userId: session.user.id },
        orderBy: { date: 'desc' },
        take: 5,
        select: {
          id: true,
          date: true,
          duree: true,
          calories: true,
          satisfaction: true
        }
      }),

      // Workout distribution by type
      prisma.$queryRaw`
        SELECT 
          COUNT(*) as count,
          e.categorie as type
        FROM SessionEntrainement se
        JOIN RealisationExercice re ON se.id = re.sessionId
        JOIN Exercice e ON re.exerciceId = e.id
        WHERE se.userId = ${session.user.id}
        GROUP BY e.categorie
        ORDER BY count DESC
      `,

      // Weekly activity
      getWeeklyActivity(session.user.id, period),

      // Analysis statistics
      prisma.analysePosturale.aggregate({
        where: { userId: session.user.id },
        _avg: {
          scoreGlobal: true,
          symetrie: true
        },
        _max: {
          scoreGlobal: true
        },
        _count: true
      }),

      // Calculate streak
      calculateStreak(session.user.id)
    ])

    return NextResponse.json({
      statistics: userStats,
      recentWorkouts,
      workoutDistribution,
      weeklyActivity,
      analysisStats,
      streak,
      period
    })
  } catch (error) {
    console.error('Get stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}

async function getWeeklyActivity(userId: string, period: string) {
  const dateFilter = getDateFilter(period)
  
  const activity = await prisma.sessionEntrainement.groupBy({
    by: ['date'],
    where: {
      userId,
      date: dateFilter
    },
    _sum: {
      duree: true,
      calories: true
    },
    _count: {
      id: true
    },
    orderBy: {
      date: 'asc'
    }
  })

  return activity.map((day: any) => ({
    date: day.date,
    workouts: day._count.id,
    duration: day._sum.duree || 0,
    calories: day._sum.calories || 0
  }))
}

async function calculateStreak(userId: string): Promise<number> {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let streak = 0
  let currentDate = today

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

function getDateFilter(period: string) {
  const now = new Date()
  const filter: any = {}

  switch (period) {
    case 'week':
      filter.gte = new Date(now.setDate(now.getDate() - 7))
      break
    case 'month':
      filter.gte = new Date(now.setMonth(now.getMonth() - 1))
      break
    case 'year':
      filter.gte = new Date(now.setFullYear(now.getFullYear() - 1))
      break
  }

  return filter
}