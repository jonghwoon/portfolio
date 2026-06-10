function renderPortfolio() {
    const portfolioList = document.getElementById('portfolio-list');
    if (!portfolioList) return;

    portfolioList.innerHTML = '';

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'portfolio-card';

        const title = project.title[currentLanguage] || project.title.ja;
        const description = project.description[currentLanguage] || project.description.ja;

        card.innerHTML = `
            <div class="portfolio-card-image">${project.emoji}</div>
            <div class="portfolio-card-content">
                <h3>${title}</h3>
                <p class="portfolio-card-description">${description}</p>
                <div class="portfolio-card-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="project-detail.html?id=${project.id}" class="portfolio-card-link">
                    ${currentLanguage === 'ja' ? '詳しく見る →' : currentLanguage === 'en' ? 'Learn More →' : '자세히 보기 →'}
                </a>
            </div>
        `;

        card.addEventListener('click', () => {
            window.location.href = `project-detail.html?id=${project.id}`;
        });

        portfolioList.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderPortfolio();
});

// 言語変更時にポートフォリオを再レンダリング
const originalSetLanguage = window.setLanguage;
window.setLanguage = function(lang) {
    originalSetLanguage(lang);
    renderPortfolio();
};
