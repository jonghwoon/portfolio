import { prisma } from '@/lib/prisma'
import AboutClient from './AboutClient'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - LEE JONGHOON',
  description: 'Frontend engineer specializing in high-performance web architecture.',
}

export const revalidate = 60

export default async function AboutPage() {
  let profile = null
  try {
    profile = await prisma.profile.findUnique({ where: { id: 1 } })
  } catch {
    // DB 연결 전에는 기본값 사용
  }

  return (
    <>
      <Navbar />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <AboutClient profile={profile as any} />
      <Footer />
    </>
  )
}
