'use client'

import Link from 'next/link'
import Image from 'next/image'
import TechTag from '@/components/TechTag'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'

interface Project {
  id: number
  title: Record<string, string>
  description: Record<string, string>
  features: Record<string, string[]>
  technologies: string[]
  tags: string[]
  emoji?: string | null
  imageUrl?: string | null
  demoLink?: string | null
  githubLink?: string | null
  date: string
}

const labels: Record<string, {
  back: string; overview: string; features: string; tech: string; tags: string; demo: string; github: string
}> = {
  ja: { back: '← ポートフォリオに戻る', overview: '概要', features: '機能', tech: '使用技術', tags: 'タグ', demo: 'デモを見る', github: 'GitHubを見る' },
  en: { back: '← Back to Portfolio', overview: 'Overview', features: 'Features', tech: 'Technologies', tags: 'Tags', demo: 'Live Demo', github: 'View GitHub' },
  ko: { back: '← 포트폴리오로 돌아가기', overview: '개요', features: '기능', tech: '사용 기술', tags: '태그', demo: '데모 보기', github: 'GitHub 보기' },
}

export default function ProjectDetailClient({ project }: { project: Project }) {
  const { lang } = useLanguage()
  const label = labels[lang] || labels['en']
  const features = (project.features as Record<string, string[]>)?.[lang] || (project.features as Record<string, string[]>)?.['en'] || []

  return (
    <main>
      <div className="project-detail animate-fade-in">
        <Link href="/portfolio" className="project-back-link">
          {label.back}
        </Link>

        {project.imageUrl ? (
          <div style={{ position: 'relative', width: '100%', height: '300px', marginBottom: '32px', overflow: 'hidden' }}>
            <Image src={project.imageUrl} alt={t(project.title, lang)} fill style={{ objectFit: 'cover' }} />
          </div>
        ) : (
          <div className="project-hero-emoji">{project.emoji || '💼'}</div>
        )}

        <div className="page-header">
          <h1 className="display-lg">{t(project.title, lang)}</h1>
          <p className="body-sm" style={{ marginTop: '8px' }}>{project.date}</p>
          {(project.demoLink || project.githubLink) && (
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              {project.demoLink && (
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '10px 24px' }}>
                  {label.demo}
                </a>
              )}
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '10px 24px' }}>
                  {label.github}
                </a>
              )}
            </div>
          )}
        </div>

        <div className="about-section">
          <h2>{label.overview}</h2>
          <p className="body-md">{t(project.description, lang)}</p>
        </div>

        {features.length > 0 && (
          <div className="about-section">
            <h2>{label.features}</h2>
            <ul className="features-list">
              {features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {project.technologies.length > 0 && (
          <div className="about-section">
            <h2>{label.tech}</h2>
            <div className="tech-list">
              {project.technologies.map((tech, idx) => (
                <TechTag key={idx} name={tech} />
              ))}
            </div>
          </div>
        )}

        {project.tags.length > 0 && (
          <div className="about-section">
            <h2>{label.tags}</h2>
            <div className="portfolio-card-tags">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
