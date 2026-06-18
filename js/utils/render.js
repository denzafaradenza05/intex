// ===== ФУНКЦИИ РЕНДЕРИНГА =====

// Очистка контейнера
export const clearContainer = (selector) => {
    const container = document.querySelector(selector);
    if (container) container.innerHTML = '';
    return container;
};

// Создание элемента с атрибутами
export const createElement = (tag, attributes = {}, children = []) => {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') element.className = value;
        else if (key === 'textContent') element.textContent = value;
        else if (key === 'innerHTML') element.innerHTML = value;
        else element.setAttribute(key, value);
    });
    
    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            element.appendChild(child);
        }
    });
    
    return element;
};

// Рендер списка через map
export const renderList = (items, renderItem) => 
    items.map(renderItem).join('');

// Безопасная вставка HTML
export const safeInsertHTML = (container, html) => {
    if (container) container.innerHTML = html;
};