import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(projects)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()
    const data = await request.json()

    const maxOrder = await prisma.project.aggregate({ _max: { order: true } })
    const nextOrder = (maxOrder._max.order ?? 0) + 1

    const project = await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        features: data.features,
        technologies: data.technologies || [],
        tags: data.tags || [],
        emoji: data.emoji,
        imageUrl: data.imageUrl,
        demoLink: data.demoLink,
        githubLink: data.githubLink,
        date: data.date,
        order: nextOrder,
        published: data.published ?? true,
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error(error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
