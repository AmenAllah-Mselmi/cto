import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string || 'video' // 'video' or 'image'

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = {
      video: ['video/mp4', 'video/webm', 'video/quicktime'],
      image: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    }

    const allowed = allowedTypes[type as keyof typeof allowedTypes] || allowedTypes.video
    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type. Allowed: ${allowed.join(', ')}` },
        { status: 400 }
      )
    }

    // Validate file size (max 50MB for video, 10MB for image)
    const maxSize = type === 'video' ? 50 * 1024 * 1024 : 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${type === 'video' ? '50MB' : '10MB'}` },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const extension = file.name.split('.').pop()
    const filename = `${uuidv4()}.${extension}`
    
    // Determine upload directory
    const uploadDir = type === 'video' ? 'videos' : 'images'
    const uploadPath = join(process.cwd(), 'public', 'uploads', uploadDir, filename)

    // Save file
    await writeFile(uploadPath, buffer)

    // Generate public URL
    const publicUrl = `/uploads/${uploadDir}/${filename}`

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      originalName: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}