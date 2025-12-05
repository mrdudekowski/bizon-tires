// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky CTA visibility
const stickyCta = document.getElementById('stickyCta');
const orderSection = document.getElementById('order');

function toggleStickyCta() {
    if (!stickyCta || !orderSection) return;
    
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

// Phone input formatting
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

// Form validation and submission
const orderForm = document.getElementById('orderForm');
const formMessage = document.getElementById('formMessage');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.startsWith('7');
}

function showMessage(message, type) {
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

function resetForm() {
    if (orderForm) {
        orderForm.reset();
    }
}

if (orderForm) {
    orderForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Honeypot check
        const honeypot = document.getElementById('website');
        if (honeypot && honeypot.value !== '') {
            // Bot detected, silently fail
            return;
        }
        
        // Get form data
        const formData = new FormData(orderForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const phone = formData.get('phone').trim();
        const message = formData.get('message').trim();
        const privacy = formData.get('privacy');
        
        // Validation
        if (!name || name.length < 2) {
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
        
        // Disable submit button
        const submitButton = orderForm.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Отправка...';
        }
        
        // Simulate form submission (replace with actual API call)
        try {
            // Here you would normally send data to your server
            // Example: const response = await fetch('/api/order', { method: 'POST', body: formData });
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success
            showMessage('Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в течение 15 минут.', 'success');
            resetForm();
            
            // Optional: Track conversion
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'engagement',
                    'event_label': 'order_form'
                });
            }
            
        } catch (error) {
            showMessage('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.', 'error');
        } finally {
            // Re-enable submit button
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Отправить заявку';
            }
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
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

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.about-card, .advantage-item, .guarantee-item, .stat-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (header) {
        if (currentScroll > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
    
    lastScroll = currentScroll;
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

