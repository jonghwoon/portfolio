'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import TechTag from '@/components/TechTag'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

interface Project {
  id: number
  title: Record<string, string>
  description: Record<string, string>
  features: Record<string, string[]>
  technologies: string[]
  tags: string[]
  emoji?: string | null
  imageUrl?: string | null
  images?: string[]
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
  
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImageSrc, setModalImageSrc] = useState<string | null>(null)

  const handleImageClick = (src: string) => {
    setModalImageSrc(src)
    setIsModalOpen(true)
  }

  // Combine imageUrl (main) and images (gallery) into a single array
  const allImages = [
    ...(project.imageUrl ? [project.imageUrl] : []),
    ...(project.images || [])
  ]

  return (
    <main>
      <div className="project-detail animate-fade-in">
        <Link href="/portfolio" className="project-back-link">
          {label.back}
        </Link>

        {allImages.length > 0 ? (
          <div style={{ marginBottom: '32px' }}>
            {/* Main Image Slider */}
            <Swiper
              style={{
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
                borderRadius: '8px',
                overflow: 'hidden',
                marginBottom: '10px'
              } as React.CSSProperties}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
              {allImages.map((src, index) => (
                <SwiperSlide key={index}>
                  <div 
                    style={{ position: 'relative', width: '100%', height: '400px', cursor: 'pointer' }}
                    onClick={() => handleImageClick(src)}
                  >
                    <Image src={src} alt={`${t(project.title, lang)} ${index + 1}`} fill style={{ objectFit: 'cover' }} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnail Slider */}
            {allImages.length > 1 && (
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
                style={{ height: '80px', borderRadius: '4px', overflow: 'hidden' }}
              >
                {allImages.map((src, index) => (
                  <SwiperSlide key={`thumb-${index}`} style={{ cursor: 'pointer' }}>
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                      <Image src={src} alt={`Thumbnail ${index + 1}`} fill style={{ objectFit: 'cover', borderRadius: '4px' }} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            
            <style jsx global>{`
              .mySwiper .swiper-slide-thumb-active {
                opacity: 1 !important;
                border: 2px solid var(--accent-color, #0070f3);
              }
              .mySwiper .swiper-slide {
                transition: opacity 0.2s;
                opacity: 0.6;
              }
              .mySwiper .swiper-slide:hover {
                opacity: 0.8 !important;
              }
            `}</style>
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

      {/* Image Modal */}
      {isModalOpen && modalImageSrc && (
        <div 
          className="image-modal-overlay animate-fade-in" 
          onClick={() => setIsModalOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'zoom-out'
          }}
        >
          <img 
            src={modalImageSrc} 
            alt="Expanded image" 
            style={{ 
              maxWidth: '95vw', 
              maxHeight: '95vh', 
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 4px 32px rgba(0,0,0,0.5)'
            }} 
          />
          <button 
            onClick={() => setIsModalOpen(false)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '48px',
              cursor: 'pointer',
              zIndex: 10000,
              lineHeight: 1
            }}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
      )}
    </main>
  )
}
