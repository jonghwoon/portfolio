import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

export async function GET() {
  try {
    const home = await prisma.homeContent.findUnique({ where: { id: 1 } })
    return NextResponse.json(home)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch home content' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin()
    const data = await request.json()

    const home = await prisma.homeContent.upsert({
      where: { id: 1 },
      update: {
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        heroCta: data.heroCta,
        metrics: data.metrics,
      },
      create: {
        id: 1,
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        heroCta: data.heroCta,
        metrics: data.metrics,
      },
    })

    return NextResponse.json(home)
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error(error)
    return NextResponse.json({ error: 'Failed to update home content' }, { status: 500 })
  }
}
