// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/products
export async function GET(request: NextRequest) {
  try {
    const products = await prisma.produit.findMany({
      include: {
        // vos relations ici
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// POST /api/products
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const product = await prisma.produit.create({
      data
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création' },
      { status: 500 }
    )
  }
}

// Autres méthodes si nécessaire
export async function PUT(request: NextRequest) {
  return NextResponse.json(
    { error: 'Méthode non implémentée' },
    { status: 501 }
  )
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json(
    { error: 'Méthode non implémentée' },
    { status: 501 }
  )
}