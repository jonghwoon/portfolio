'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/i18n'

interface Metric {
  value: string
  label: Record<string, string>
  desc: Record<string, string>
}

interface HomeData {
  heroTitle: Record<string, string>
  heroSubtitle: Record<string, string>
  heroCta: Record<string, string>
  metrics: Metric[]
}

const DEFAULT_DATA: HomeData = {
  heroTitle: {
    ja: 'ENGINEERING\nPRECISION.',
    en: 'ENGINEERING\nPRECISION.',
    ko: '엔지니어링\n프레시전.',
  },
  heroSubtitle: {
    ja: '高性能なウェブアーキテクチャと技術リーダーシップで、ビジネス成果を最大化するエンジニア。',
    en: 'Driving technical leadership and measurable business outcomes through high-performance web architecture.',
    ko: '고성능 웹 아키텍처와 기술 리더십으로 비즈니스 성과를 극대화하는 엔지니어입니다.',
  },
  heroCta: { ja: '結果を見る', en: 'View Results', ko: '결과 보기' },
  metrics: [
    {
      value: '40%',
      label: { ja: 'パフォーマンス向上', en: 'Performance Increase', ko: '성능 향상' },
      desc: { ja: 'エンタープライズプラットフォームのコアウェブバイタルを最適化。', en: 'Optimized core web vitals across enterprise platforms.', ko: '엔터프라이즈 플랫폼의 코어 웹 바이탈 최적화.' },
    },
    {
      value: '1.2M',
      label: { ja: '月間アクティブユーザー', en: 'Monthly Active Users', ko: '월간 활성 사용자' },
      desc: { ja: '大規模なトラフィック成長をサポートするインフラを構築。', en: 'Scaled infrastructure to support massive traffic growth.', ko: '대규모 트래픽 성장을 지원하는 인프라 확장.' },
    },
    {
      value: '-15%',
      label: { ja: '直帰率', en: 'Bounce Rate', ko: '이탈률' },
      desc: { ja: 'UI/UXシステムを再設計しユーザー離脱を削減。', en: 'Redesigned UI/UX systems reducing user drop-off.', ko: 'UI/UX 시스템 재설계로 사용자 이탈 감소.' },
    },
  ],
}

const metricsLabel: Record<string, string> = {
  ja: 'ビジネスインパクト',
  en: 'Business Impact',
  ko: '비즈니스 임팩트',
}

export default function HomeClient({ data }: { data: HomeData | null }) {
  const { lang } = useLanguage()
  const d = data ?? DEFAULT_DATA

  const metrics = (d.metrics as unknown as Metric[]) || DEFAULT_DATA.metrics

  return (
    <main>
      <section className="hero animate-fade-in">
        <h1 className="hero-title" style={{ whiteSpace: 'pre-line' }}>
          {t(d.heroTitle, lang)}
        </h1>
        <p className="hero-subtitle">
          {t(d.heroSubtitle, lang)}
        </p>
        <Link href="/portfolio" className="btn-primary">
          {t(d.heroCta, lang)} →
        </Link>
      </section>

      <section className="business-metrics">
        <h2 className="display-md" style={{ marginBottom: '24px' }}>
          {metricsLabel[lang]}
        </h2>
        <div className="data-grid">
          {metrics.map((metric, idx) => (
            <div className="data-cell" key={idx}>
              <h3 className="display-md metric">{metric.value}</h3>
              <p className="label-uppercase">{t(metric.label, lang)}</p>
              <p className="body-sm" style={{ marginTop: '8px' }}>
                {t(metric.desc, lang)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
