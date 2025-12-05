// app/api/workouts/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/workouts/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const workout = await prisma.sessionEntrainement.findUnique({ // CORRECTION: sessionEntrainement au lieu de workout
      where: { id },
      include: {
        exercices: {
          include: {
            exercice: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }
      }
    })

    if (!workout) {
      return NextResponse.json(
        { error: 'Workout not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(workout)
  } catch (error) {
    console.error('Error fetching workout:', error)
    return NextResponse.json(
      { error: 'Failed to fetch workout' },
      { status: 500 }
    )
  }
}

// PUT /api/workouts/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const updatedWorkout = await prisma.sessionEntrainement.update({ // CORRECTION: sessionEntrainement au lieu de workout
      where: { id },
      data: {
        duree: body.duration,
        calories: body.calories,
        satisfaction: body.satisfaction,
        notes: body.notes,
        estComplete: body.isCompleted,
        date: body.date ? new Date(body.date) : undefined,
        // Mettre à jour les exercices si fournis
        exercices: body.exercises ? {
          deleteMany: {}, // Supprimer les anciens exercices
          create: body.exercises.map((ex: any, index: number) => ({
            exerciceId: ex.exerciseId,
            serie: index + 1,
            repetitionsCibles: ex.reps,
            poidsUtilise: ex.weight,
            reposEffectue: ex.rest,
            difficultéPerçue: ex.difficulty
          }))
        } : undefined
      },
      include: {
        exercices: {
          include: {
            exercice: true
          }
        }
      }
    })

    return NextResponse.json(updatedWorkout)
  } catch (error: any) {
    console.error('Error updating workout:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Workout not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update workout' },
      { status: 500 }
    )
  }
}

// DELETE /api/workouts/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const workout = await prisma.sessionEntrainement.findUnique({ // CORRECTION: sessionEntrainement au lieu de workout
      where: { id }
    })

    if (!workout) {
      return NextResponse.json(
        { error: 'Workout not found' },
        { status: 404 }
      )
    }

    await prisma.sessionEntrainement.delete({ // CORRECTION: sessionEntrainement au lieu de workout
      where: { id }
    })

    return NextResponse.json({ 
      success: true,
      message: 'Workout deleted successfully' 
    })
  } catch (error: any) {
    console.error('Error deleting workout:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Workout not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to delete workout' },
      { status: 500 }
    )
  }
}