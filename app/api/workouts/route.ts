// app/api/workouts/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const workoutSchema = z.object({
  name: z.string().max(100).optional(),
  duration: z.number().min(1),
  calories: z.number().min(0).optional(),
  satisfaction: z.number().min(1).max(5).optional(),
  notes: z.string().optional(),
  exercises: z.array(z.object({
    exerciseId: z.string(),
    sets: z.number().min(1),
    reps: z.string(),
    weight: z.string().optional(),
    rest: z.number().optional(),
    difficulty: z.number().min(1).max(10).optional()
  })).optional()
})

// POST create workout
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = workoutSchema.parse(body)

    // Create workout session
    const workout = await prisma.sessionEntrainement.create({
      data: {
        userId: session.user.id,
        duree: validatedData.duration,
        calories: validatedData.calories,
        satisfaction: validatedData.satisfaction || 3,
        notes: validatedData.notes,
        estComplete: true,
        date: new Date(),
        exercices: {
          create: validatedData.exercises?.map((ex, index) => ({
            exerciceId: ex.exerciseId,
            serie: index + 1,
            repetitionsCibles: ex.reps,
            poidsUtilise: ex.weight,
            reposEffectue: ex.rest,
            difficultéPerçue: ex.difficulty
          }))
        }
      },
      include: {
        exercices: {
          include: {
            exercice: {
              select: {
                id: true,
                nom: true,
                categorie: true,
                description: true
              }
            }
          }
        }
      }
    })

    // Update user statistics
    await updateUserStatistics(session.user.id, validatedData)

    // Add to history
    await prisma.historiqueEntrainement.create({
      data: {
        userId: session.user.id,
        type: 'exercice',
        action: 'completé',
        details: {
          workoutId: workout.id,
          duration: validatedData.duration,
          calories: validatedData.calories,
          exerciseCount: validatedData.exercises?.length || 0
        }
      }
    })

    return NextResponse.json({
      success: true,
      workout
    }, { status: 201 })
  } catch (error) {
    console.error('Create workout error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues }, // Changé de errors à issues
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create workout' },
      { status: 500 }
    )
  }
}

// GET all workouts for user - CORRIGÉ: PAS DE PARAMS ICI!
export async function GET(request: NextRequest) { // ❌ PAS DE { params } ici!
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const skip = (page - 1) * limit

    const where: any = { userId: session.user.id }

    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      }
    }

    const [workouts, total] = await Promise.all([
      prisma.sessionEntrainement.findMany({
        where,
        include: {
          exercices: {
            include: {
              exercice: {
                select: {
                  id: true,
                  nom: true,
                  categorie: true,
                  description: true
                }
              }
            }
          }
        },
        orderBy: { date: 'desc' },
        skip,
        take: limit,
      }),
      prisma.sessionEntrainement.count({ where })
    ])

    return NextResponse.json({
      workouts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Get workouts error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch workouts' },
      { status: 500 }
    )
  }
}

async function updateUserStatistics(userId: string, workoutData: any) {
  await prisma.statistiqueUtilisateur.upsert({
    where: { userId },
    create: {
      userId,
      sessionsTotal: 1,
      tempsTotalEntrainement: workoutData.duration,
      caloriesTotal: workoutData.calories || 0,
      exercicesCompletes: workoutData.exercises?.length || 0,
      derniereMiseAJour: new Date()
    },
    update: {
      sessionsTotal: { increment: 1 },
      tempsTotalEntrainement: { increment: workoutData.duration },
      caloriesTotal: { increment: workoutData.calories || 0 },
      exercicesCompletes: { increment: workoutData.exercises?.length || 0 },
      derniereMiseAJour: new Date()
    }
  })
}