import { PROJECTS } from '../data/constants.js';

export class HomePage {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
    }

    render() {
        // Создаем карточки проектов через map
        const projectsHTML = PROJECTS.map(project => `
            <article class="portfolio__card">
                <img src="${project.image}" 
                     alt="${project.title}" 
                     class="portfolio__image"
                     onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22200%22><rect fill=%22%23ddd%22 width=%22300%22 height=%22200%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22>Нет фото</text></svg>'">
                <h3 class="portfolio__card-title">${project.title}</h3>
            </article>
        `).join('');

        this.container.innerHTML = `
            <section class="hero">
                <h1 class="hero__title">Создаю уютные интерьеры</h1>
                <p class="hero__subtitle">Дизайн, который вдохновляет</p>
            </section>

            <section class="gallery-section">
                <h2 class="section-title">Примеры моих работ</h2>
                <div class="portfolio__grid">
                    ${projectsHTML}
                </div>
            </section>
        `;
    }
}