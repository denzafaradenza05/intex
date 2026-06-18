export class PortfolioCard {
    constructor(project) {
        this.project = project;
    }
    
    render() {
        return `
            <article class="portfolio__card">
                <img src="${this.project.image}" 
                     alt="${this.project.title}" 
                     class="portfolio__image"
                     loading="lazy">
                <div class="portfolio__card-content">
                    <h3 class="portfolio__card-title">${this.project.title}</h3>
                    <div class="portfolio__card-tags">
                        ${this.project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="portfolio__card-meta">
                        <span>📐 ${this.project.area} м²</span>
                        <span> ${this.project.year}</span>
                    </div>
                </div>
            </article>
        `;
    }
}