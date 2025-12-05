// Утилиты для работы с API
// Доступны глобально

window.submitForm = async function(formData) {
    const CONFIG = window.CONFIG || { api: { endpoints: {} } };
    
    try {
        const response = await fetch(CONFIG.api.endpoints.submitForm || '/api/order', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Ошибка отправки формы');
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

window.getProducts = async function() {
    const CONFIG = window.CONFIG || { api: { endpoints: {} } };
    
    try {
        const response = await fetch(CONFIG.api.endpoints.getProducts || '/api/products');
        
        if (!response.ok) {
            throw new Error('Ошибка загрузки продукции');
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

