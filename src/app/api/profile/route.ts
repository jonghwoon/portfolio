import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

export async function GET() {
  try {
    const profile = await prisma.profile.findUnique({ where: { id: 1 } })
    return NextResponse.json(profile)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin()
    const data = await request.json()

    const profile = await prisma.profile.upsert({
      where: { id: 1 },
      update: {
        photoUrl: data.photoUrl,
        statement: data.statement,
        skills: data.skills,
        experiences: data.experiences,
        stats: data.stats,
      },
      create: {
        id: 1,
        photoUrl: data.photoUrl,
        statement: data.statement,
        skills: data.skills,
        experiences: data.experiences,
        stats: data.stats,
      },
    })

    return NextResponse.json(profile)
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error(error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
