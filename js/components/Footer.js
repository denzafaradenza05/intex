export class Footer {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
    }

    render() {
        const year = new Date().getFullYear();
        this.container.innerHTML = `
            <footer class="footer">
                <p>&copy; ${year} Дизайнер интерьеров</p>
            </footer>
        `;
    }
}