export class AboutPage {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
    }

    render() {
        this.container.innerHTML = `
            <section class="about">
                <h1 class="about__title">Обо мне</h1>
                <div class="about__content">
                    <img src="images/photo.jpg" 
                         alt="Фото дизайнера" 
                         class="about__image"
                         onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><rect fill=%22%23ddd%22 width=%22200%22 height=%22200%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22>Фото</text></svg>'">
                    <div class="about__text">
                        <p>Привет! Я профессиональный дизайнер интерьеров с 3-летним опытом.</p>
                        <p>Создаю уникальные пространства для жизни и работы, где каждая деталь имеет значение.</p>
                        <p>Мой подход — сочетание эстетики и функциональности.</p>
                    </div>
                </div>
            </section>
        `;
    }
}