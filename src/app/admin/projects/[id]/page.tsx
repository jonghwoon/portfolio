import { prisma } from '@/lib/prisma'
import ProjectFormClient from '../ProjectFormClient'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const isNew = id === 'new'
  let project = null

  if (!isNew) {
    try {
      project = await prisma.project.findUnique({ where: { id: parseInt(id) } })
      if (!project) notFound()
    } catch {
      notFound()
    }
  }

  return <ProjectFormClient project={project} isNew={isNew} />
}
