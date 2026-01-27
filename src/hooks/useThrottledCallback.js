import { useRef, useCallback } from 'react';

/**
 * Хук для создания throttled версии callback функции
 * Ограничивает частоту вызовов функции до указанного интервала
 * 
 * @param {Function} callback - Функция для throttling
 * @param {number} delay - Задержка в миллисекундах (по умолчанию 16ms = ~60fps)
 * @returns {Function} Throttled версия callback
 * 
 * @example
 * const throttledUpdate = useThrottledCallback(updateState, 16);
 * element.addEventListener('scroll', throttledUpdate);
 */
export const useThrottledCallback = (callback, delay = 16) => {
  const lastRun = useRef(Date.now());
  const timeoutRef = useRef(null);
  
  return useCallback((...args) => {
    const now = Date.now();
    const timeSinceLastRun = now - lastRun.current;
    
    if (timeSinceLastRun >= delay) {
      // Достаточно времени прошло - выполняем сразу
      lastRun.current = now;
      callback(...args);
    } else {
      // Планируем выполнение после оставшегося времени
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      const remainingTime = delay - timeSinceLastRun;
      timeoutRef.current = setTimeout(() => {
        lastRun.current = Date.now();
        callback(...args);
      }, remainingTime);
    }
  }, [callback, delay]);
};
