import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';

// Базовый класс для всех страниц (единый интерфейс)
export class BasePage {
    constructor() {
        this.header = new Header('#header-container');
        this.footer = new Footer('#footer-container');
        this.mainContent = document.querySelector('#main-content');
    }
    
    // Шаблонный метод — определяет порядок выполнения
    init() {
        this.header.render();
        this.render();
        this.footer.render();
        this.attachEvents();
    }
    
    // Переопределяется в дочерних классах
    render() {
        throw new Error('Метод render() должен быть реализован в дочернем классе');
    }
    
    attachEvents() {}
}