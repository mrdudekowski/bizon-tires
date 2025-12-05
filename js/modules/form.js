// Модуль обработки форм

// CONFIG и утилиты доступны глобально
const CONFIG = window.CONFIG || {
    form: {
        honeypotField: 'website',
        validation: {
            minNameLength: 2
        }
    }
};

// Используем функции валидации из validation.js (загружается отдельно)
const validateEmail = window.validateEmail || function(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePhone = window.validatePhone || function(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.startsWith('7');
};

// Экспорт функции для глобального доступа
window.initForm = function() {
    const orderForm = document.getElementById('orderForm');
    if (!orderForm) return;

    // Форматирование телефона
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.startsWith('8')) {
                value = '7' + value.substring(1);
            }
            
            if (value.startsWith('7')) {
                let formatted = '+7';
                if (value.length > 1) {
                    formatted += ' (' + value.substring(1, 4);
                }
                if (value.length >= 4) {
                    formatted += ') ' + value.substring(4, 7);
                }
                if (value.length >= 7) {
                    formatted += '-' + value.substring(7, 9);
                }
                if (value.length >= 9) {
                    formatted += '-' + value.substring(9, 11);
                }
                e.target.value = formatted;
            } else if (value.length > 0) {
                e.target.value = '+' + value;
            }
        });
    }

    // Обработка отправки формы
    orderForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Honeypot проверка
        const honeypot = document.getElementById(CONFIG.form.honeypotField);
        if (honeypot && honeypot.value !== '') {
            return; // Бот обнаружен
        }
        
        // Получение данных формы
        const formData = new FormData(orderForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const phone = formData.get('phone').trim();
        const message = formData.get('message').trim();
        const privacy = formData.get('privacy');
        
        // Валидация
        if (!name || name.length < CONFIG.form.validation.minNameLength) {
            showMessage('Пожалуйста, введите ваше имя (минимум 2 символа)', 'error');
            return;
        }
        
        if (!email || !validateEmail(email)) {
            showMessage('Пожалуйста, введите корректный email адрес', 'error');
            return;
        }
        
        if (!phone || !validatePhone(phone)) {
            showMessage('Пожалуйста, введите корректный номер телефона', 'error');
            return;
        }
        
        if (!privacy) {
            showMessage('Необходимо согласиться с политикой конфиденциальности', 'error');
            return;
        }
        
        // Отправка формы
        const submitButton = orderForm.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Отправка...';
        }
        
        try {
            // Здесь будет реальный API запрос
            // const response = await fetch(CONFIG.api.endpoints.submitForm, {
            //     method: 'POST',
            //     body: formData
            // });
            
            // Симуляция задержки
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showMessage('Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в течение 15 минут.', 'success');
            orderForm.reset();
            
        } catch (error) {
            showMessage('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.', 'error');
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Отправить заявку';
            }
        }
    });
}

function showMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
};

