// Утилиты для валидации
// Доступны глобально для использования в других модулях

window.validateEmail = function(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

window.validatePhone = function(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.startsWith('7');
};

window.validateName = function(name) {
    return name && name.trim().length >= 2;
};

