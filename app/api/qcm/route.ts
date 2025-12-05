/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const qcmSchema = z.object({
  responses: z.array(z.object({
    questionId: z.string(),
    answer: z.any()
  })),
  duration: z.number().optional()
})

// POST submit QCM results
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
    const validatedData = qcmSchema.parse(body)

    // Calculate score based on responses
    const score = calculateScore(validatedData.responses)

    // Generate recommendations based on responses
    const recommendations = generateRecommendations(validatedData.responses, score)

    // Save QCM session
    const qcmSession = await prisma.sessionQCM.create({
      data: {
        userId: session.user.id,
        reponses: validatedData.responses,
        score: score,
        recommendations: recommendations,
        duree: validatedData.duration,
        completedAt: new Date()
      }
    })

    // Update user profile based on QCM results
    await updateUserProfile(session.user.id, validatedData.responses, score)

    return NextResponse.json({
      success: true,
      qcmSession,
      score,
      recommendations
    }, { status: 201 })
  } catch (error) {
    console.error('QCM error:', error)
    
    if (error instanceof z.ZodError) {
      // CORRECTION: Utilisez 'issues' au lieu de 'errors'
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to process QCM' },
      { status: 500 }
    )
  }
}

// GET QCM results for user
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
    const limit = parseInt(searchParams.get('limit') || '5')

    const qcmSessions = await prisma.sessionQCM.findMany({
      where: { userId: session.user.id },
      orderBy: { completedAt: 'desc' },
      take: limit
    })

    return NextResponse.json({
      qcmSessions
    })
  } catch (error) {
    console.error('Get QCM error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch QCM results' },
      { status: 500 }
    )
  }
}

function calculateScore(responses: any[]): number {
  // Simple scoring logic - in reality this would be more complex
  const totalQuestions = responses.length
  if (totalQuestions === 0) return 0
  
  const correctAnswers = responses.filter(r => 
    r.answer && typeof r.answer === 'string' && r.answer.length > 0
  ).length
  
  return Math.round((correctAnswers / totalQuestions) * 100)
}

function generateRecommendations(responses: any[], score: number) {
  const recommendations = []

  if (score < 50) {
    recommendations.push('Start with beginner-friendly exercises')
    recommendations.push('Focus on form over intensity')
  } else if (score < 75) {
    recommendations.push('Consider intermediate level workouts')
    recommendations.push('Add variety to your routine')
  } else {
    recommendations.push('You can handle advanced exercises')
    recommendations.push('Focus on progressive overload')
  }

  // Add specific recommendations based on responses
  const hasBackPain = responses.some(r => 
    r.questionId === 'previous_injuries' && 
    r.answer?.includes('back_pain')
  )

  if (hasBackPain) {
    recommendations.push('Include core strengthening exercises')
    recommendations.push('Avoid exercises that strain your back')
  }

  return recommendations
}

async function updateUserProfile(userId: string, responses: any[], score: number) {
  try {
    // Extract profile information from QCM responses
    const profileData: any = {}

    responses.forEach(response => {
      switch (response.questionId) {
        case 'experience_level':
          profileData.niveau = mapExperienceToLevel(response.answer)
          break
        case 'goal':
          profileData.objectif = mapGoalToObjective(response.answer)
          break
        case 'frequency':
          profileData.frequence = parseInt(response.answer) || 3
          break
        case 'previous_injuries':
          profileData.blessuresAnterieures = response.answer || []
          break
        case 'sports':
          profileData.sportsPratiques = response.answer || []
          break
      }
    })

    // Update user profile
    await prisma.profilSportif.upsert({
      where: { userId },
      create: {
        userId,
        niveau: profileData.niveau || 'DEBUTANT',
        objectif: profileData.objectif || 'MUSCULATION',
        frequence: profileData.frequence || 3,
        blessuresAnterieures: profileData.blessuresAnterieures || [],
        sportsPratiques: profileData.sportsPratiques || []
      },
      update: profileData
    })
  } catch (error) {
    console.error('Error updating user profile:', error)
    // Ne pas bloquer le flux principal si la mise à jour du profil échoue
  }
}

function mapExperienceToLevel(experience: string): string {
  const mapping: Record<string, string> = {
    'beginner': 'DEBUTANT',
    'intermediate': 'INTERMEDIAIRE',
    'advanced': 'AVANCE',
    'expert': 'EXPERT'
  }
  return mapping[experience] || 'DEBUTANT'
}

function mapGoalToObjective(goal: string): string {
  const mapping: Record<string, string> = {
    'strength': 'MUSCULATION',
    'weight_loss': 'PERDRE_POIDS',
    'flexibility': 'SOUPLESSE',
    'endurance': 'ENDURANCE',
    'rehabilitation': 'REEDUCATION',
    'performance': 'PERFORMANCE'
  }
  return mapping[goal] || 'MUSCULATION'
}