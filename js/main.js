import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { HomePage } from './pages/HomePage.js';
import { AboutPage } from './pages/AboutPage.js';
import { PortfolioPage } from './pages/PortfolioPage.js';
import { SkillsPage } from './pages/SkillsPage.js';
import { ContactsPage } from './pages/ContactsPage.js';
import { InteractivePage } from './pages/InteractivePage.js';

// Рендерим шапку и подвал
new Header('#header-placeholder').render();
new Footer('#footer-placeholder').render();

// Определяем текущую страницу
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// Запускаем нужную страницу
const pages = {
    'index.html': () => new HomePage('#app').render(),
    'about.html': () => new AboutPage('#app').render(),
    'portfolio.html': () => new PortfolioPage('#app').render(),
    'skills.html': () => new SkillsPage('#app').render(),
    'contacts.html': () => new ContactsPage('#app').render(),
    'interactive.html': () => new InteractivePage('#app').init()
};

if (pages[currentPage]) {
    pages[currentPage]();
}

// Переключатель темы
const themeBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
}
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}
