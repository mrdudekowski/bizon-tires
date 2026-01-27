import { useRef, useCallback } from 'react';

/**
 * Хук для создания debounced версии callback функции
 * Откладывает выполнение функции до окончания периода бездействия
 * 
 * @param {Function} callback - Функция для debouncing
 * @param {number} delay - Задержка в миллисекундах (по умолчанию 300ms)
 * @returns {Function} Debounced версия callback
 * 
 * @example
 * const debouncedResize = useDebouncedCallback(handleResize, 300);
 * window.addEventListener('resize', debouncedResize);
 */
export const useDebouncedCallback = (callback, delay = 300) => {
  const timeoutRef = useRef(null);
  
  return useCallback((...args) => {
    // Отменяем предыдущий таймер
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Устанавливаем новый таймер
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
};
