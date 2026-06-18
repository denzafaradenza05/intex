// ===== ВАЛИДАТОРЫ =====

export const validators = {
    // Email
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    
    // Телефон (11 цифр)
    phone: (value) => {
        const digits = value.replace(/\D/g, '');
        return digits.length === 11;
    },
    
    // Только буквы
    lettersOnly: (value) => /^[а-яА-ЯёЁ\s]*$/.test(value),
    
    // Дата не раньше сегодня
    dateNotPast: (value) => {
        const today = new Date().toISOString().split('T')[0];
        return value >= today;
    },
    
    // Минимальная длина
    minLength: (value, min) => value.trim().length >= min
};

// Функция валидации с сообщением
export const validate = (value, validator, errorMessage) => {
    return validator(value) ? { valid: true, message: '' } 
                            : { valid: false, message: errorMessage };
};