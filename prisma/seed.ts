import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.PORTFOLIO_DB}`

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  // Admin 계정 생성
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'changeme123!'
  const hashedPassword = await bcrypt.hash(adminPassword, 12)

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: hashedPassword },
    create: {
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  console.log(`✅ Admin created: ${adminEmail}`)

  // 홈 콘텐츠 초기화
  await prisma.homeContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
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
      heroCta: {
        ja: '結果を見る',
        en: 'View Results',
        ko: '결과 보기',
      },
      metrics: [
        {
          value: '40%',
          label: {
            ja: 'パフォーマンス向上',
            en: 'Performance Increase',
            ko: '성능 향상',
          },
          desc: {
            ja: 'エンタープライズプラットフォームのコアウェブバイタルを最適化。',
            en: 'Optimized core web vitals across enterprise platforms.',
            ko: '엔터프라이즈 플랫폼의 코어 웹 바이탈 최적화.',
          },
        },
        {
          value: '1.2M',
          label: {
            ja: '月間アクティブユーザー',
            en: 'Monthly Active Users',
            ko: '월간 활성 사용자',
          },
          desc: {
            ja: '大規模なトラフィック成長をサポートするインフラを構築。',
            en: 'Scaled infrastructure to support massive traffic growth.',
            ko: '대규모 트래픽 성장을 지원하는 인프라 확장.',
          },
        },
        {
          value: '-15%',
          label: { ja: '直帰率', en: 'Bounce Rate', ko: '이탈률' },
          desc: {
            ja: 'UI/UXシステムを再設計しユーザー離脱を削減。',
            en: 'Redesigned UI/UX systems reducing user drop-off.',
            ko: 'UI/UX 시스템 재설계로 사용자 이탈 감소.',
          },
        },
      ],
    },
  })
  console.log('✅ HomeContent initialized')

  // 프로필 초기화
  await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      photoUrl: null,
      statement: {
        ja: '私は高性能なウェブアーキテクチャと精密なフロントエンドエンジニアリングでビジネス課題を解決する開発者です。',
        en: 'I am a developer who solves business challenges through high-performance web architecture and precise frontend engineering.',
        ko: '저는 고성능 웹 아키텍처와 정밀한 프론트엔드 엔지니어링을 통해 비즈니스 문제를 해결하는 개발자입니다.',
      },
      skills: [
        'HTML5 / CSS3',
        'JavaScript (ES6+)',
        'React / Next.js',
        'Node.js',
        'UI/UX Engineering',
        'Web Accessibility',
        'PostgreSQL',
        'Docker',
      ],
      experiences: [
        {
          period: {
            ja: '2020年 - 現在',
            en: '2020 - Present',
            ko: '2020년 - 현재',
          },
          title: {
            ja: 'シニアウェブ開発者',
            en: 'Senior Web Developer',
            ko: '시니어 웹 개발자',
          },
          desc: {
            ja: '大規模エンタープライズアーキテクチャ設計およびコアウェブバイタル最適化リード。',
            en: 'Led large-scale enterprise architecture design and core web vitals performance optimization.',
            ko: '대규모 엔터프라이즈 아키텍처 설계 및 코어 웹 바이탈 성능 최적화 리드.',
          },
        },
        {
          period: {
            ja: '2018年 - 2020年',
            en: '2018 - 2020',
            ko: '2018년 - 2020년',
          },
          title: { ja: 'ウェブ開発者', en: 'Web Developer', ko: '웹 개발자' },
          desc: {
            ja: 'フロントエンドモジュール化システム構築およびバックエンドパイプライン統合管理。',
            en: 'Built frontend modularization systems and managed backend pipeline integration.',
            ko: '프론트엔드 모듈화 시스템 구축 및 백엔드 파이프라인 통합 관리.',
          },
        },
      ],
      stats: [
        {
          value: 'LEAD',
          label: { ja: 'アーキテクチャ', en: 'Architecture', ko: '아키텍처' },
        },
        {
          value: '6+ YRS',
          label: {
            ja: 'エンジニアリング',
            en: 'Engineering',
            ko: '엔지니어링',
          },
        },
      ],
    },
  })
  console.log('✅ Profile initialized')

  // 프로젝트 초기화
  const projects = [
    {
      title: {
        ja: 'ECサイト構築プロジェクト',
        en: 'E-commerce Site Construction Project',
        ko: 'E커머스 사이트 구축 프로젝트',
      },
      description: {
        ja: 'React を使用した大規模な ECサイトの構築。商品管理、カート機能、決済機能などを実装。',
        en: 'Large-scale e-commerce site construction using React. Implemented product management, cart functionality, payment processing, and more.',
        ko: 'React를 사용한 대규모 전자상거래 사이트 구축. 상품 관리, 장바구니 기능, 결제 기능 등을 구현했습니다.',
      },
      features: {
        ja: [
          '商品検索・フィルター機能',
          'ショッピングカート',
          '会員管理',
          '決済処理',
          'レスポンシブデザイン',
        ],
        en: [
          'Product Search & Filter',
          'Shopping Cart',
          'User Management',
          'Payment Processing',
          'Responsive Design',
        ],
        ko: [
          '상품 검색 및 필터링',
          '장바구니',
          '사용자 관리',
          '결제 처리',
          '반응형 디자인',
        ],
      },
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
      tags: ['React', 'Full-Stack', 'E-commerce'],
      emoji: '🛒',
      date: '2023 - 2024',
      order: 1,
    },
    {
      title: {
        ja: 'ブログプラットフォーム',
        en: 'Blog Platform',
        ko: '블로그 플랫폼',
      },
      description: {
        ja: '複数ユーザーが記事を投稿・管理できるブログプラットフォーム。マークダウン対応、タグ機能、検索機能を搭載。',
        en: 'A blog platform where multiple users can post and manage articles. Features markdown support, tagging, and search functionality.',
        ko: '여러 사용자가 기사를 게시하고 관리할 수 있는 블로그 플랫폼입니다. 마크다운 지원, 태그 기능, 검색 기능을 포함합니다.',
      },
      features: {
        ja: [
          '記事投稿・編集',
          'マークダウン対応',
          'タグシステム',
          '検索機能',
          'コメント機能',
        ],
        en: [
          'Article Publishing & Editing',
          'Markdown Support',
          'Tag System',
          'Search Function',
          'Comments',
        ],
        ko: [
          '기사 게시 및 편집',
          '마크다운 지원',
          '태그 시스템',
          '검색 기능',
          '댓글',
        ],
      },
      technologies: ['Next.js', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'],
      tags: ['Next.js', 'CMS', 'Full-Stack'],
      emoji: '📝',
      date: '2023',
      order: 2,
    },
    {
      title: {
        ja: 'ダッシュボード分析ツール',
        en: 'Analytics Dashboard Tool',
        ko: '분석 대시보드 도구',
      },
      description: {
        ja: 'リアルタイムデータを可視化するダッシュボード。複数のデータソースから情報を集計し、わかりやすいグラフで表示。',
        en: 'A dashboard for visualizing real-time data. Aggregates information from multiple data sources and displays it in easy-to-understand graphs.',
        ko: '실시간 데이터를 시각화하는 대시보드입니다. 여러 데이터 소스에서 정보를 집계하여 이해하기 쉬운 그래프로 표시합니다.',
      },
      features: {
        ja: [
          'リアルタイム更新',
          '複数グラフ対応',
          'データエクスポート',
          'カスタマイズ可能なウィジェット',
        ],
        en: [
          'Real-time Updates',
          'Multiple Chart Types',
          'Data Export',
          'Customizable Widgets',
        ],
        ko: [
          '실시간 업데이트',
          '다중 차트 유형',
          '데이터 내보내기',
          '사용자 정의 가능한 위젯',
        ],
      },
      technologies: ['Vue.js', 'D3.js', 'Firebase', 'Chart.js'],
      tags: ['Vue.js', 'Data Visualization', 'Dashboard'],
      emoji: '📊',
      date: '2022 - 2023',
      order: 3,
    },
  ]

  for (const p of projects) {
    await prisma.project.create({ data: p })
  }
  console.log('✅ Projects initialized')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
