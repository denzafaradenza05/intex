export class Modal {
    constructor(options = {}) {
        this.title = options.title || 'Модальное окно';
        this.content = options.content || '';
        this.onConfirm = options.onConfirm || (() => {});
    }
    
    render() {
        const modal = document.createElement('div');
        modal.className = 'modal modal--active';
        modal.innerHTML = `
            <div class="modal__content">
                <button class="modal__close" data-close>&times;</button>
                <h2 class="modal__title">${this.title}</h2>
                <div class="modal__text">${this.content}</div>
                <button class="modal__btn" data-confirm>OK</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.attachEvents(modal);
    }
    
    attachEvents(modal) {
        const close = () => modal.remove();
        
        modal.querySelector('[data-close]').addEventListener('click', close);
        modal.querySelector('[data-confirm]').addEventListener('click', () => {
            this.onConfirm();
            close();
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) close();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') close();
        }, { once: true });
    }
    
    static show(options) {
        return new Modal(options).render();
    }
}