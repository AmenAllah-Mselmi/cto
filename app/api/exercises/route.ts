// app/api/exercises/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/exercises
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const categorie = searchParams.get('categorie')
    const difficulty = searchParams.get('difficulty')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    const skip = (page - 1) * limit
    
    // Construire les filtres
    const where: any = {}
    
    if (search) {
      where.OR = [
        { description: { contains: search, mode: 'insensitive' } },
        { categorie: { contains: search, mode: 'insensitive' } }
      ]
    }
    
    if (categorie) {
      where.categorie = categorie
    }
    
    if (difficulty) {
      where.difficulty = difficulty
    }
    
    const [exercices, total] = await Promise.all([
      prisma.exercice.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.exercice.count({ where })
    ])
    
    return NextResponse.json({
      exercices,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching exercises:', error)
    return NextResponse.json(
      { error: 'Failed to fetch exercises' },
      { status: 500 }
    )
  }
}
