import { prisma } from '@/lib/prisma'
import PortfolioClient from './PortfolioClient'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio - LEE JONGHOON',
  description: 'Engineered projects mapped to metric-driven business outcomes.',
}

export const revalidate = 60

export default async function PortfolioPage() {
  let projects: unknown[] = []
  try {
    projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    })
  } catch {
    // DB 연결 전에는 빈 배열
  }

  return (
    <>
      <Navbar />
      <PortfolioClient projects={projects} />
      <Footer />
    </>
  )
}
