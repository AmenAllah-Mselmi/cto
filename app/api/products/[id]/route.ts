// app/api/products/[id]/route.ts - Version corrigée
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/products/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const product = await prisma.produit.findUnique({
      where: { id },
      include: {
        recommandations: true,
        exercices: {
          include: {
            exercice: true
          }
        },
        _count: {
          select: {
            recommandations: true,
            exercices: true
          }
        }
      }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Produit non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Erreur interne' },
      { status: 500 }
    )
  }
}

// PUT /api/products/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()
    
    const updated = await prisma.produit.update({
      where: { id },
      data
    })
    
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur de mise à jour' },
      { status: 500 }
    )
  }
}

// DELETE /api/products/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    await prisma.produit.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur de suppression' },
      { status: 500 }
    )
  }
}