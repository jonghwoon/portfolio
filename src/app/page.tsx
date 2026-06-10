import { prisma } from '@/lib/prisma'
import HomeClient from './HomeClient'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const revalidate = 60 // ISR: 60초마다 재생성

export default async function HomePage() {
  let homeData = null
  try {
    homeData = await prisma.homeContent.findUnique({ where: { id: 1 } })
  } catch {
    // DB 연결 전에는 기본값 사용
  }

  return (
    <>
      <Navbar />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <HomeClient data={homeData as any} />
      <Footer />
    </>
  )
}
