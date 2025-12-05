// Конфигурация приложения - Single Source of Truth
// Доступна глобально через window.CONFIG

window.CONFIG = {
    // API endpoints (если будут использоваться)
    api: {
        baseUrl: '', // Будет заполнено при необходимости
        endpoints: {
            submitForm: '/api/order',
            getProducts: '/api/products'
        }
    },
    
    // Настройки форм
    form: {
        honeypotField: 'website',
        validation: {
            minNameLength: 2,
            phonePattern: /^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/
        }
    },
    
    // Настройки анимаций
    animations: {
        scrollOffset: 80,
        fadeInDuration: 600,
        intersectionThreshold: 0.1
    },
    
    // Настройки навигации
    navigation: {
        headerHeight: 80,
        smoothScroll: true
    },
    
    // Контакты
    contacts: {
        phone: '+7 (800) 123-45-67',
        email: 'info@bizontires.ru',
        address: 'Москва, ул. Примерная, д. 1'
    },
    
    // Режим работы
    workingHours: {
        weekdays: '9:00 - 20:00',
        weekends: '10:00 - 18:00'
    }
};

// Также доступна как const CONFIG для обратной совместимости
const CONFIG = window.CONFIG;

