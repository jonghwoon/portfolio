function getProjectIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id')) || 1;
}

function renderProjectDetail() {
    const projectId = getProjectIdFromURL();
    const project = projects.find(p => p.id === projectId);

    if (!project) {
        document.getElementById('project-detail').innerHTML = '<p>プロジェクトが見つかりません。</p>';
        return;
    }

    const title = project.title[currentLanguage] || project.title.ja;
    const description = project.description[currentLanguage] || project.description.ja;
    const features = project.features[currentLanguage] || project.features.ja;

    document.getElementById('project-title').textContent = title;
    document.getElementById('project-date').textContent = project.date;
    document.getElementById('project-image').innerHTML = `<div style="font-size: 5rem;">${project.emoji}</div>`;

    const featuresList = document.getElementById('project-features');
    featuresList.innerHTML = features.map(feature => `<li>${feature}</li>`).join('');

    const descElement = document.querySelector('[data-i18n="project.overview"] + p') || document.createElement('p');
    if (!descElement.id) {
        descElement.id = 'project-description';
    }
    document.getElementById('project-description').textContent = description;

    const techStack = document.getElementById('project-tech');
    techStack.innerHTML = project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('');

    const projectLinks = document.getElementById('project-links');
    projectLinks.innerHTML = `
        <a href="#demo" class="project-link" data-i18n-text="demo">
            ${currentLanguage === 'ja' ? 'デモを見る' : currentLanguage === 'en' ? 'View Demo' : '데모 보기'}
        </a>
        <a href="#github" class="project-link" data-i18n-text="github">
            ${currentLanguage === 'ja' ? 'GitHub' : currentLanguage === 'en' ? 'GitHub' : 'GitHub'}
        </a>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    renderProjectDetail();
});

// 言語変更時にプロジェクト詳細を再レンダリング
const originalSetLanguage = window.setLanguage;
window.setLanguage = function(lang) {
    originalSetLanguage(lang);
    renderProjectDetail();
};
