'use client'

import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'

interface Experience {
  period: Record<string, string>
  title: Record<string, string>
  desc: Record<string, string>
}

interface Stat {
  value: string
  label: Record<string, string>
}

interface Profile {
  photoUrl?: string | null
  statement: Record<string, string>
  skills: string[]
  experiences: Experience[]
  stats: Stat[]
}

const DEFAULT_PROFILE: Profile = {
  photoUrl: null,
  statement: {
    ja: '私は高性能なウェブアーキテクチャと精密なフロントエンドエンジニアリングでビジネス課題を解決する開発者です。',
    en: 'I am a developer who solves business challenges through high-performance web architecture and precise frontend engineering.',
    ko: '저는 고성능 웹 아키텍처와 정밀한 프론트엔드 엔지니어링을 통해 비즈니스 문제를 해결하는 개발자입니다.',
  },
  skills: ['HTML5 / CSS3', 'JavaScript (ES6+)', 'React / Next.js', 'Node.js', 'UI/UX Engineering', 'Web Accessibility'],
  experiences: [
    {
      period: { ja: '2020年 - 現在', en: '2020 - Present', ko: '2020년 - 현재' },
      title: { ja: 'シニアウェブ開発者', en: 'Senior Web Developer', ko: '시니어 웹 개발자' },
      desc: { ja: '大規模エンタープライズアーキテクチャ設計。', en: 'Led large-scale enterprise architecture design.', ko: '대규모 엔터프라이즈 아키텍처 설계.' },
    },
    {
      period: { ja: '2018年 - 2020年', en: '2018 - 2020', ko: '2018년 - 2020년' },
      title: { ja: 'ウェブ開発者', en: 'Web Developer', ko: '웹 개발자' },
      desc: { ja: 'フロントエンドモジュール化システム構築。', en: 'Built frontend modularization systems.', ko: '프론트엔드 모듈화 시스템 구축.' },
    },
  ],
  stats: [
    { value: 'LEAD', label: { ja: 'アーキテクチャ', en: 'Architecture', ko: '아키텍처' } },
    { value: '6+ YRS', label: { ja: 'エンジニアリング', en: 'Engineering', ko: '엔지니어링' } },
  ],
}

const titles: Record<string, { about: string; statement: string; skills: string; experience: string }> = {
  ja: { about: '自己紹介', statement: 'ステートメント', skills: '技術スキル', experience: '職歴' },
  en: { about: 'About Me', statement: 'Statement', skills: 'Technical Skills', experience: 'Experience' },
  ko: { about: '소개', statement: '소개글', skills: '기술 스택', experience: '경력' },
}

export default function AboutClient({ profile }: { profile: Profile | null }) {
  const { lang } = useLanguage()
  const p = profile ?? DEFAULT_PROFILE
  const title = titles[lang]

  const experiences = (p.experiences as unknown as Experience[]) || DEFAULT_PROFILE.experiences
  const stats = (p.stats as unknown as Stat[]) || DEFAULT_PROFILE.stats

  return (
    <main>
      <section className="page-header animate-fade-in">
        <h1 className="display-lg">{title.about}</h1>
      </section>

      <div className="about-grid">
        {/* Left Column */}
        <div className="profile-column">
          {p.photoUrl ? (
            <Image
              src={p.photoUrl}
              alt="Profile"
              width={180}
              height={180}
              className="profile-image"
            />
          ) : (
            <div className="profile-placeholder">
              <div className="profile-text">PROFILE<br />PHOTO</div>
            </div>
          )}

          <div className="data-grid" style={{ gridTemplateColumns: '1fr', width: '100%', marginTop: '8px', marginBottom: 0 }}>
            {stats.map((stat, idx) => (
              <div className="data-cell" key={idx}>
                <h3 className="title-lg metric">{stat.value}</h3>
                <p className="label-uppercase" style={{ fontSize: '11px' }}>{t(stat.label, lang)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="about-main-content">
          <div className="about-section">
            <h2>{title.statement}</h2>
            <p className="body-md">{t(p.statement as Record<string, string>, lang)}</p>
          </div>

          <div className="about-section">
            <h2>{title.skills}</h2>
            <div className="skills-matrix">
              {p.skills.map((skill, idx) => (
                <div className="skill-tag" key={idx}>{skill}</div>
              ))}
            </div>
          </div>

          <div className="about-section">
            <h2>{title.experience}</h2>
            <div className="experience-timeline">
              {experiences.map((exp, idx) => (
                <div className="experience-node" key={idx}>
                  <div className="exp-period">{t(exp.period, lang)}</div>
                  <div className="exp-detail">
                    <h3>{t(exp.title, lang)}</h3>
                    <p className="body-md">{t(exp.desc, lang)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
