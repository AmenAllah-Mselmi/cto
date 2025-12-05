/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

// POST /api/programs - Version flexible
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validation flexible
    const nom = body.nom || body.name || body.titre
    if (!nom || !body.description) {
      return NextResponse.json(
        { error: 'Name/title and description are required' },
        { status: 400 }
      )
    }
    
    // Créer un objet data avec seulement les champs valides
    const data: any = {
      nom: nom,
      description: body.description,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    // Ajouter les champs optionnels
    const optionalFields = [
      'userId', 'user_id', 'difficulte', 'difficulty', 
      'duree', 'duration', 'image', 'tags', 'category',
      'categorie', 'isPublic', 'public', 'frequency', 'frequence'
    ]
    
    optionalFields.forEach(field => {
      if (body[field] !== undefined) {
        // Mappage anglais->français si nécessaire
        if (field === 'name') data.nom = body[field]
        else if (field === 'difficulty') data.difficulte = body[field]
        else if (field === 'duration') data.duree = body[field]
        else data[field] = body[field]
      }
    })
    
    const program = await prisma.programme.create({
      data
    })
    
    return NextResponse.json(program, { status: 201 })
  } catch (error: any) {
    console.error('Error creating program:', error)
    
    // Message d'erreur plus informatif
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: 'Invalid user reference' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create program' },
      { status: 500 }
    )
  }
}