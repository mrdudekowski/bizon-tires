// Модуль навигации

// CONFIG доступен глобально через window.CONFIG (загружается из config.js)
// Используем window.CONFIG напрямую, чтобы избежать конфликта объявлений

// Экспорт функции для глобального доступа
window.initNavigation = function() {
    // Smooth scroll для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = window.CONFIG.navigation.headerHeight;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: window.CONFIG.navigation.smoothScroll ? 'smooth' : 'auto'
                });
            }
        });
    });

    // Эффект header при скролле
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.style.background = 'rgba(0, 0, 0, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
            } else {
                header.style.background = 'rgba(0, 0, 0, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }

    // Sticky CTA видимость
    const stickyCta = document.getElementById('stickyCta');
    const orderSection = document.getElementById('order');

    if (stickyCta && orderSection) {
        function toggleStickyCta() {
            const orderSectionTop = orderSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (orderSectionTop > windowHeight) {
                stickyCta.classList.add('show');
            } else {
                stickyCta.classList.remove('show');
            }
        }

        window.addEventListener('scroll', toggleStickyCta);
        window.addEventListener('resize', toggleStickyCta);
    }
};

