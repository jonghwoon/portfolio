'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'

interface Project {
  id: number
  title: Record<string, string>
  description: Record<string, string>
  tags: string[]
  emoji?: string | null
  imageUrl?: string | null
  date: string
}

const titles: Record<string, { portfolio: string; subtitle: string; viewDetail: string }> = {
  ja: { portfolio: 'ポートフォリオ', subtitle: 'メトリクス駆動のビジネス成果に紐付いたエンジニアリングプロジェクト。', viewDetail: '詳細を見る →' },
  en: { portfolio: 'Portfolio', subtitle: 'Engineered projects mapped to metric-driven business outcomes.', viewDetail: 'View Details →' },
  ko: { portfolio: '포트폴리오', subtitle: '지표 기반 비즈니스 성과에 매핑된 엔지니어링 프로젝트.', viewDetail: '자세히 보기 →' },
}

export default function PortfolioClient({ projects }: { projects: unknown[] }) {
  const { lang } = useLanguage()
  const title = titles[lang]

  return (
    <main>
      <section className="page-header animate-fade-in">
        <h1 className="display-lg">{title.portfolio}</h1>
        <p className="title-md">{title.subtitle}</p>
      </section>

      <section className="portfolio-grid" id="portfolio-list">
        {(projects as Project[]).map((project) => (
          <Link
            key={project.id}
            href={`/portfolio/${project.id}`}
            className="portfolio-card"
          >
            <div className="portfolio-card-image">
              {project.imageUrl ? (
                <Image src={project.imageUrl} alt={t(project.title, lang)} fill style={{ objectFit: 'cover' }} />
              ) : (
                <span>{project.emoji || '💼'}</span>
              )}
            </div>
            <div className="portfolio-card-content">
              <h3>{t(project.title, lang)}</h3>
              <p className="portfolio-card-description">
                {t(project.description, lang)}
              </p>
              <div className="portfolio-card-tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
              <span className="portfolio-card-link">{title.viewDetail}</span>
            </div>
          </Link>
        ))}
        {projects.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '48px', color: 'var(--muted)' }}>
            <p>No projects yet.</p>
          </div>
        )}
      </section>
    </main>
  )
}
