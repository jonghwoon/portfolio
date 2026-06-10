const translations = {
    ja: {
        'nav.home': 'ホーム',
        'nav.about': '自己紹介',
        'nav.portfolio': 'ポートフォリオ',
        'hero.title': 'ようこそ',
        'hero.subtitle': '私のポートフォリオサイトへ',
        'hero.cta': 'ポートフォリオを見る',
        'features.web': 'ウェブ開発',
        'features.web_desc': 'HTML, CSS, JavaScript を使用したモダンなウェブサイトの開発',
        'features.design': 'デザイン',
        'features.design_desc': 'ユーザーフレンドリーで美しいUI/UX設計',
        'features.responsive': 'レスポンシブ',
        'features.responsive_desc': 'すべてのデバイスで完美に動作するデザイン',
        'about.title': '自己紹介',
        'about.intro_title': 'こんにちは',
        'about.intro_text': '私は情熱的なウェブ開発者です。ユーザーの期待を超えるウェブサイトを作成することに注力しています。',
        'about.skills_title': 'スキル',
        'about.experience_title': '経歴',
        'about.experience1_title': 'シニアウェブ開発者',
        'about.experience1_period': '2020年 - 現在',
        'about.experience1_desc': '複数の大規模プロジェクトでリード開発者として従事。',
        'about.experience2_title': 'ウェブ開発者',
        'about.experience2_period': '2018年 - 2020年',
        'about.experience2_desc': 'フロントエンド開発とバックエンド統合に従事。',
        'portfolio.title': 'ポートフォリオ',
        'portfolio.subtitle': 'これまで手がけたプロジェクト一覧',
        'project.back': '← ポートフォリオに戻る',
        'project.overview': '概要',
        'project.features': '機能',
        'project.tech': '使用技術',
        'project.links': 'リンク',
        'footer.rights': 'All rights reserved.'
    },
    en: {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.portfolio': 'Portfolio',
        'hero.title': 'Welcome',
        'hero.subtitle': 'To my portfolio website',
        'hero.cta': 'View Portfolio',
        'features.web': 'Web Development',
        'features.web_desc': 'Modern website development using HTML, CSS, and JavaScript',
        'features.design': 'Design',
        'features.design_desc': 'User-friendly and beautiful UI/UX design',
        'features.responsive': 'Responsive',
        'features.responsive_desc': 'Perfect design that works on all devices',
        'about.title': 'About Me',
        'about.intro_title': 'Hello',
        'about.intro_text': 'I am a passionate web developer. I focus on creating websites that exceed user expectations.',
        'about.skills_title': 'Skills',
        'about.experience_title': 'Experience',
        'about.experience1_title': 'Senior Web Developer',
        'about.experience1_period': '2020 - Present',
        'about.experience1_desc': 'Lead developer on multiple large-scale projects.',
        'about.experience2_title': 'Web Developer',
        'about.experience2_period': '2018 - 2020',
        'about.experience2_desc': 'Engaged in frontend development and backend integration.',
        'portfolio.title': 'Portfolio',
        'portfolio.subtitle': 'A list of projects I have worked on',
        'project.back': '← Back to Portfolio',
        'project.overview': 'Overview',
        'project.features': 'Features',
        'project.tech': 'Technologies Used',
        'project.links': 'Links',
        'footer.rights': 'All rights reserved.'
    },
    ko: {
        'nav.home': '홈',
        'nav.about': '소개',
        'nav.portfolio': '포트폴리오',
        'hero.title': '환영합니다',
        'hero.subtitle': '제 포트폴리오 사이트에 오신 것을 환영합니다',
        'hero.cta': '포트폴리오 보기',
        'features.web': '웹 개발',
        'features.web_desc': 'HTML, CSS, JavaScript를 사용한 현대적인 웹사이트 개발',
        'features.design': '디자인',
        'features.design_desc': '사용자 친화적이고 아름다운 UI/UX 설계',
        'features.responsive': '반응형',
        'features.responsive_desc': '모든 기기에서 완벽하게 작동하는 디자인',
        'about.title': '소개',
        'about.intro_title': '안녕하세요',
        'about.intro_text': '저는 열정적인 웹 개발자입니다. 사용자의 기대를 초과하는 웹사이트를 만드는 데 집중하고 있습니다.',
        'about.skills_title': '기술',
        'about.experience_title': '경력',
        'about.experience1_title': '시니어 웹 개발자',
        'about.experience1_period': '2020년 - 현재',
        'about.experience1_desc': '여러 대규모 프로젝트의 리드 개발자로 참여했습니다.',
        'about.experience2_title': '웹 개발자',
        'about.experience2_period': '2018년 - 2020년',
        'about.experience2_desc': '프론트엔드 개발 및 백엔드 통합에 참여했습니다.',
        'portfolio.title': '포트폴리오',
        'portfolio.subtitle': '제가 진행한 프로젝트 목록',
        'project.back': '← 포트폴리오로 돌아가기',
        'project.overview': '개요',
        'project.features': '기능',
        'project.tech': '사용 기술',
        'project.links': '링크',
        'footer.rights': 'All rights reserved.'
    }
};

let currentLanguage = localStorage.getItem('language') || 'ja';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    updatePageTranslations();
    updateLanguageButtons();
}

function updatePageTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = translations[currentLanguage]?.[key] || translations['ja'][key];
        el.textContent = translation;
    });
}

function updateLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === currentLanguage) {
            btn.classList.add('active');
        }
    });
}

function initLanguageSelector() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLanguage);
    initLanguageSelector();
});
