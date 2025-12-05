// Главный файл JavaScript - точка входа
// Используется как основной файл, который загружает модули

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    console.log('БИЗОН ТИРС - Лендинг загружен');
    
    // Инициализация модулей (вызываются из index.html после загрузки всех скриптов)
    // Это обеспечивает правильный порядок загрузки зависимостей
});

// Обработка ошибок
window.addEventListener('error', function(e) {
    console.error('Ошибка:', e.error);
});

