import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Объединяет классы с помощью clsx и tailwind-merge
 * Удаляет конфликтующие Tailwind классы и объединяет остальные
 * 
 * @param {...any} inputs - Классы для объединения (строки, объекты, массивы)
 * @returns {string} Объединенная строка классов
 * 
 * @example
 * cn('px-2 py-1', 'px-4') // 'py-1 px-4' (px-2 перезаписан px-4)
 * cn({ 'bg-red-500': true, 'text-white': false }) // 'bg-red-500'
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
