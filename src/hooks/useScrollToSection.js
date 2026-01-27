import { useCallback } from 'react';

/**
 * Хук для плавной прокрутки к секциям страницы
 * 
 * @returns {Function} Функция для прокрутки к секции по ID
 * 
 * @example
 * const scrollToSection = useScrollToSection();
 * scrollToSection('products');
 */
export const useScrollToSection = () => {
  return useCallback((sectionId) => {
    if (!sectionId || typeof sectionId !== 'string') {
      console.warn('useScrollToSection: sectionId должен быть непустой строкой');
      return;
    }
    
    const target = document.getElementById(sectionId);
    
    if (!target) {
      console.warn(`useScrollToSection: секция с id "${sectionId}" не найдена`);
      return;
    }
    
    target.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }, []);
};
