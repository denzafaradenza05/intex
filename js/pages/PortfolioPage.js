import { PROJECTS } from '../data/constants.js';

export class PortfolioPage {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.filteredProjects = [...PROJECTS];
    }

    render() {
        // Получаем уникальные категории
        const categories = ['Все', ...new Set(PROJECTS.map(p => p.category))];
        
        const filtersHTML = categories.map(cat => `
            <button class="filter-btn ${cat === 'Все' ? 'active' : ''}" 
                    data-category="${cat}">
                ${cat}
            </button>
        `).join('');

        const projectsHTML = this.filteredProjects.map(project => `
            <article class="portfolio__card">
                <img src="${project.image}" 
                     alt="${project.title}" 
                     class="portfolio__image"
                     onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22200%22><rect fill=%22%23ddd%22 width=%22300%22 height=%22200%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22>Нет фото</text></svg>'">
                <h3 class="portfolio__card-title">${project.title}</h3>
                <p class="portfolio__card-meta">${project.area} м² • ${project.year}</p>
            </article>
        `).join('');

        this.container.innerHTML = `
            <section class="portfolio">
                <h1 class="portfolio__title">Мои работы</h1>
                
                <div class="filters">
                    <input type="text" 
                           id="searchInput" 
                           class="search-input" 
                           placeholder="🔍 Поиск по названию...">
                    <div class="category-filters">
                        ${filtersHTML}
                    </div>
                </div>
                
                <div class="portfolio__grid" id="portfolioGrid">
                    ${projectsHTML}
                </div>
            </section>
        `;

        this.attachEvents();
    }

    attachEvents() {
        // Поиск
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            this.filteredProjects = PROJECTS.filter(p => 
                p.title.toLowerCase().includes(query)
            );
            this.updateGrid();
        });

        // Фильтры по категориям
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                
                // Обновляем активную кнопку
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                // Фильтруем
                this.filteredProjects = category === 'Все' 
                    ? [...PROJECTS] 
                    : PROJECTS.filter(p => p.category === category);
                
                this.updateGrid();
            });
        });
    }

    updateGrid() {
        const grid = document.getElementById('portfolioGrid');
        if (this.filteredProjects.length === 0) {
            grid.innerHTML = '<p class="no-results">Ничего не найдено 😔</p>';
            return;
        }
        
        grid.innerHTML = this.filteredProjects.map(project => `
            <article class="portfolio__card">
                <img src="${project.image}" 
                     alt="${project.title}" 
                     class="portfolio__image"
                     onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22200%22><rect fill=%22%23ddd%22 width=%22300%22 height=%22200%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22>Нет фото</text></svg>'">
                <h3 class="portfolio__card-title">${project.title}</h3>
                <p class="portfolio__card-meta">${project.area} м² • ${project.year}</p>
            </article>
        `).join('');
    }
}