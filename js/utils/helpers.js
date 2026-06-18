// ===== ФУНКЦИОНАЛЬНОЕ ПРОГРАММИРОВАНИЕ =====

// Capitalize первая буква
export const capitalize = (str) => 
    str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

// Форматирование числа
export const formatNumber = (num, decimals = 2) => 
    Number(num).toFixed(decimals);

// Форматирование денег
export const formatMoney = (amount) => 
    new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(amount);

// Получение времени суток
export const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'day';
    if (hour >= 17 && hour < 23) return 'evening';
    return 'night';
};

// Debounce для поиска
export const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

// Генерация уникального ID
export const generateId = () => 
    Date.now().toString(36) + Math.random().toString(36).substr(2);