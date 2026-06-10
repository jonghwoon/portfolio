import { prisma } from '@/lib/prisma'
import ProjectDetailClient from './ProjectDetailClient'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  let project = null

  try {
    project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
    })
  } catch {
    // DB 연결 전에는 null
  }

  if (!project) {
    notFound()
  }

  return (
    <>
      <Navbar />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <ProjectDetailClient project={project as any} />
      <Footer />
    </>
  )
}
