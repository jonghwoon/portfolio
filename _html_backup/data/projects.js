const projects = [
    {
        id: 1,
        title: {
            ja: 'ECサイト構築プロジェクト',
            en: 'E-commerce Site Construction Project',
            ko: 'E커머스 사이트 구축 프로젝트'
        },
        description: {
            ja: 'React を使用した大規模な ECサイトの構築。商品管理、カート機能、決済機能などを実装。',
            en: 'Large-scale e-commerce site construction using React. Implemented product management, cart functionality, payment processing, and more.',
            ko: 'React를 사용한 대규모 전자상거래 사이트 구축. 상품 관리, 장바구니 기능, 결제 기능 등을 구현했습니다.'
        },
        features: {
            ja: ['商品検索・フィルター機能', 'ショッピングカート', '会員管理', '決済処理', 'レスポンシブデザイン'],
            en: ['Product Search & Filter', 'Shopping Cart', 'User Management', 'Payment Processing', 'Responsive Design'],
            ko: ['상품 검색 및 필터링', '장바구니', '사용자 관리', '결제 처리', '반응형 디자인']
        },
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
        date: '2023년 - 2024년',
        tags: ['React', 'Full-Stack', 'E-commerce'],
        emoji: '🛒'
    },
    {
        id: 2,
        title: {
            ja: 'ブログプラットフォーム',
            en: 'Blog Platform',
            ko: '블로그 플랫폼'
        },
        description: {
            ja: '複数ユーザーが記事を投稿・管理できるブログプラットフォーム。マークダウン対応、タグ機能、検索機能を搭載。',
            en: 'A blog platform where multiple users can post and manage articles. Features markdown support, tagging, and search functionality.',
            ko: '여러 사용자가 기사를 게시하고 관리할 수 있는 블로그 플랫폼입니다. 마크다운 지원, 태그 기능, 검색 기능을 포함합니다.'
        },
        features: {
            ja: ['記事投稿・編集', 'マークダウン対応', 'タグシステム', '検索機能', 'コメント機能'],
            en: ['Article Publishing & Editing', 'Markdown Support', 'Tag System', 'Search Function', 'Comments'],
            ko: ['기사 게시 및 편집', '마크다운 지원', '태그 시스템', '검색 기능', '댓글']
        },
        technologies: ['Next.js', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'],
        date: '2023년',
        tags: ['Next.js', 'CMS', 'Full-Stack'],
        emoji: '📝'
    },
    {
        id: 3,
        title: {
            ja: 'ダッシュボード分析ツール',
            en: 'Analytics Dashboard Tool',
            ko: '분석 대시보드 도구'
        },
        description: {
            ja: 'リアルタイムデータを可視化するダッシュボード。複数のデータソースから情報を集計し、わかりやすいグラフで表示。',
            en: 'A dashboard for visualizing real-time data. Aggregates information from multiple data sources and displays it in easy-to-understand graphs.',
            ko: '실시간 데이터를 시각화하는 대시보드입니다. 여러 데이터 소스에서 정보를 집계하여 이해하기 쉬운 그래프로 표시합니다.'
        },
        features: {
            ja: ['リアルタイム更新', '複数グラフ対応', 'データエクスポート', 'カスタマイズ可能なウィジェット'],
            en: ['Real-time Updates', 'Multiple Chart Types', 'Data Export', 'Customizable Widgets'],
            ko: ['실시간 업데이트', '다중 차트 유형', '데이터 내보내기', '사용자 정의 가능한 위젯']
        },
        technologies: ['Vue.js', 'D3.js', 'Firebase', 'Chart.js'],
        date: '2022년 - 2023년',
        tags: ['Vue.js', 'Data Visualization', 'Dashboard'],
        emoji: '📊'
    }
];
