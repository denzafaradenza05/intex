import { NAV_ITEMS } from '../data/constants.js';

export class Header {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
    }

    getCurrentPage() {
        const path = window.location.pathname;
        return path.split('/').pop() || 'index.html';
    }

    render() {
        const currentPage = this.getCurrentPage();
        
        const navItems = NAV_ITEMS.map(item => `
            <li>
                <a href="${item.href}" 
                   class="nav__link ${item.href === currentPage ? 'active' : ''}">
                    ${item.label}
                </a>
            </li>
        `).join('');

        this.container.innerHTML = `
            <input class="menu-btn" type="checkbox" id="menu-btn" />
            <label class="menu-icon" for="menu-btn"><span></span></label>
            <nav class="nav">
                <ul class="nav__list">${navItems}</ul>
            </nav>
        `;
    }
}