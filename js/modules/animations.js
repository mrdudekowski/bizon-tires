// Модуль анимаций

// CONFIG доступен глобально через window.CONFIG (загружается из config.js)
// Используем window.CONFIG напрямую, чтобы избежать конфликта объявлений

// Экспорт функции для глобального доступа
window.initAnimations = function() {
    // Intersection Observer для анимаций при скролле
    const observerOptions = {
        threshold: window.CONFIG.animations.intersectionThreshold,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Наблюдение за элементами
    document.addEventListener('DOMContentLoaded', function() {
        const animatedElements = document.querySelectorAll(
            '.about-card, .advantage-item, .guarantee-item, .stat-item'
        );
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `opacity ${window.CONFIG.animations.fadeInDuration}ms ease, transform ${window.CONFIG.animations.fadeInDuration}ms ease`;
            observer.observe(el);
        });
    });
};

