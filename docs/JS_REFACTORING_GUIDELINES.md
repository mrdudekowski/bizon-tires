# JavaScript Refactoring Guidelines

**Дата:** 2026-01-28  
**Версия:** 1.0

---

## 📋 Общие принципы

### 1. Single Responsibility Principle (SRP)
Каждый компонент/функция должна отвечать за одну вещь.

**❌ Плохо:**
```jsx
const App = () => {
  // Смешивает логику меню, скролла, рендеринга
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollToSection = (id) => { /* ... */ };
  // ... 170 строк кода
};
```

**✅ Хорошо:**
```jsx
// Кастомный хук для меню
const useMenuToggle = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
  }, [menuOpen]);
  return { menuOpen, setMenuOpen };
};

// Кастомный хук для скролла
const useScrollToSection = () => {
  return useCallback((sectionId) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
};

// Компонент App использует хуки
const App = () => {
  const { menuOpen, setMenuOpen } = useMenuToggle();
  const scrollToSection = useScrollToSection();
  // ... только рендеринг
};
```

---

### 2. DRY (Don't Repeat Yourself)
Избегайте дублирования кода.

**❌ Плохо:**
```jsx
// В ProductCarousel.jsx
const bulletPoints = tire.description_short
  .split('•')
  .map((item) => item.trim())
  .filter(Boolean);

// В BurgerMenu.jsx
description.split("•").filter(Boolean).map((item) => item.trim())
```

**✅ Хорошо:**
```jsx
// src/utils/textUtils.js
export const parseBulletPoints = (text) => {
  if (!text) return [];
  return text
    .split('•')
    .map((item) => item.trim())
    .filter(Boolean);
};

// Использование
import { parseBulletPoints } from '@/utils/textUtils';

const bulletPoints = parseBulletPoints(tire.description_short);
```

---

### 3. Константы вместо магических строк

**❌ Плохо:**
```jsx
<section id="products" className="section">
  <button onClick={() => scrollToSection("products")}>
```

**✅ Хорошо:**
```jsx
// src/constants/sections.js
export const SECTIONS = {
  HERO: 'hero',
  PRODUCTS: 'products',
  FEATURES: 'features',
  CONTACT: 'contact',
} as const;

// Использование
import { SECTIONS } from '@/constants/sections';

<section id={SECTIONS.PRODUCTS} className="section">
  <button onClick={() => scrollToSection(SECTIONS.PRODUCTS)}>
```

---

## 🎯 Специфичные рекомендации

### 4. Оптимизация производительности

#### 4.1. Throttling для scroll событий

**❌ Плохо:**
```jsx
track.addEventListener('scroll', updateArrowState);
```

**✅ Хорошо:**
```jsx
// src/hooks/useThrottledCallback.js
import { useRef, useCallback } from 'react';

export const useThrottledCallback = (callback, delay = 16) => {
  const lastRun = useRef(Date.now());
  
  return useCallback((...args) => {
    if (Date.now() - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = Date.now();
    }
  }, [callback, delay]);
};

// Использование
const throttledUpdateArrowState = useThrottledCallback(updateArrowState, 16);
track.addEventListener('scroll', throttledUpdateArrowState);
```

#### 4.2. Debouncing для resize событий

**❌ Плохо:**
```jsx
window.addEventListener('resize', updateArrowState);
```

**✅ Хорошо:**
```jsx
// src/hooks/useDebouncedCallback.js
import { useRef, useCallback } from 'react';

export const useDebouncedCallback = (callback, delay = 300) => {
  const timeoutRef = useRef(null);
  
  return useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
};

// Использование
const debouncedUpdateArrowState = useDebouncedCallback(updateArrowState, 300);
window.addEventListener('resize', debouncedUpdateArrowState);
```

#### 4.3. requestAnimationFrame для mouse move

**❌ Плохо:**
```jsx
const handleMouseMove = (event) => {
  track.scrollLeft = dragStartScrollLeftRef.current - deltaX;
};
```

**✅ Хорошо:**
```jsx
const rafRef = useRef(null);

const handleMouseMove = useCallback((event) => {
  if (!isDraggingRef.current) return;
  
  if (rafRef.current) {
    cancelAnimationFrame(rafRef.current);
  }
  
  rafRef.current = requestAnimationFrame(() => {
    const track = trackRef.current;
    if (!track) return;
    const deltaX = event.clientX - dragStartXRef.current;
    track.scrollLeft = dragStartScrollLeftRef.current - deltaX;
  });
}, []);
```

---

### 5. Доступность (A11y)

#### 5.1. Keyboard navigation для карусели

**✅ Реализация:**
```jsx
const handleKeyDown = useCallback((event) => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    scrollPrev();
  } else if (event.key === 'ArrowRight') {
    event.preventDefault();
    scrollNext();
  } else if (event.key === 'Home') {
    event.preventDefault();
    trackRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  } else if (event.key === 'End') {
    event.preventDefault();
    trackRef.current?.scrollTo({ 
      left: trackRef.current.scrollWidth, 
      behavior: 'smooth' 
    });
  }
}, [scrollPrev, scrollNext]);

<div
  className="product-carousel-track"
  ref={trackRef}
  onKeyDown={handleKeyDown}
  role="region"
  aria-label="Карусель продуктов"
  aria-live="polite"
  aria-atomic="true"
  tabIndex={0}
>
```

#### 5.2. Focus trap для модальных окон

**✅ Реализация:**
```jsx
// src/hooks/useFocusTrap.js
import { useEffect, useRef } from 'react';

export const useFocusTrap = (isActive) => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    
    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    const handleTab = (e) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };
    
    containerRef.current.addEventListener('keydown', handleTab);
    firstElement?.focus();
    
    return () => {
      containerRef.current?.removeEventListener('keydown', handleTab);
    };
  }, [isActive]);
  
  return containerRef;
};

// Использование в BurgerMenu
const menuRef = useFocusTrap(isOpen);

<aside ref={menuRef} className={styles.menuPanel}>
```

---

### 6. Обработка ошибок

**❌ Плохо:**
```jsx
import tireTypesData from '../../../data/tireTypes.json';

const ProductCarousel = () => {
  return (
    <div>
      {tireTypesData.map(renderCard)}
    </div>
  );
};
```

**✅ Хорошо:**
```jsx
import { useState, useEffect } from 'react';
import tireTypesData from '@/data/tireTypes.json';

const ProductCarousel = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    try {
      // В будущем можно загружать асинхронно
      if (!tireTypesData || tireTypesData.length === 0) {
        throw new Error('Данные о шинах не найдены');
      }
      setData(tireTypesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);
  
  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (data.length === 0) return <div>Нет доступных продуктов</div>;
  
  return (
    <div>
      {data.map(renderCard)}
    </div>
  );
};
```

---

### 7. Правильное использование ключей в map

**❌ Плохо:**
```jsx
{bulletPoints.map((item, index) => (
  <li key={index}>{item}</li>
))}
```

**✅ Хорошо:**
```jsx
// Если есть уникальный ID
{tireTypesData.map((tire) => (
  <article key={tire.id}>{/* ... */}</article>
))}

// Если нет ID, создаем стабильный ключ
{bulletPoints.map((item) => (
  <li key={`${tire.id}-${item.substring(0, 20)}`}>{item}</li>
))}
```

---

### 8. Разделение компонентов

**❌ Плохо:**
```jsx
// App.jsx - 170 строк
const App = () => {
  return (
    <>
      <header>...</header>
      <main>
        <section id="hero">...</section>
        <section id="products">...</section>
        <section id="features">...</section>
        <section id="contact">...</section>
      </main>
      <footer>...</footer>
    </>
  );
};
```

**✅ Хорошо:**
```jsx
// src/components/Header/Header.jsx
export const Header = ({ menuOpen, onMenuToggle, onScrollToSection, onScrollToTop }) => {
  // ... только логика хедера
};

// src/components/Hero/Hero.jsx
export const Hero = ({ onScrollToSection }) => {
  // ... только логика hero секции
};

// src/components/ProductsSection/ProductsSection.jsx
export const ProductsSection = () => {
  return (
    <section id={SECTIONS.PRODUCTS} className="section">
      <h2 className="section-title">Продукты</h2>
      <ProductCarousel />
    </section>
  );
};

// App.jsx - только композиция
import { Header } from '@/components/Header/Header';
import { Hero } from '@/components/Hero/Hero';
import { ProductsSection } from '@/components/ProductsSection/ProductsSection';
// ...

const App = () => {
  const { menuOpen, setMenuOpen } = useMenuToggle();
  const scrollToSection = useScrollToSection();
  
  return (
    <>
      <Header 
        menuOpen={menuOpen}
        onMenuToggle={setMenuOpen}
        onScrollToSection={scrollToSection}
      />
      <main>
        <Hero onScrollToSection={scrollToSection} />
        <ProductsSection />
        {/* ... */}
      </main>
    </>
  );
};
```

---

### 9. Кастомные хуки для переиспользования логики

**✅ Примеры:**

```jsx
// src/hooks/useScrollToSection.js
import { useCallback } from 'react';
import { SECTIONS } from '@/constants/sections';

export const useScrollToSection = () => {
  return useCallback((sectionId) => {
    const target = document.getElementById(sectionId);
    if (!target) {
      console.warn(`Section with id "${sectionId}" not found`);
      return;
    }
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);
};

// src/hooks/useMenuToggle.js
import { useState, useEffect } from 'react';

export const useMenuToggle = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);
  
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), []);
  
  return { menuOpen, openMenu, closeMenu, toggleMenu };
};

// src/hooks/useMediaQuery.js (улучшенная версия)
import { useState, useEffect } from 'react';

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return false;
    }
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }
    
    const media = window.matchMedia(query);
    const handler = (event) => setMatches(event.matches);
    
    // Проверяем поддержку addEventListener
    if (media.addEventListener) {
      media.addEventListener('change', handler);
      return () => media.removeEventListener('change', handler);
    } else {
      // Fallback для старых браузеров
      media.addListener(handler);
      return () => media.removeListener(handler);
    }
  }, [query]);

  return matches;
};
```

---

### 10. Структура проекта

**✅ Рекомендуемая структура:**

```
src/
├── components/          # Переиспользуемые компоненты
│   ├── Header/
│   ├── Hero/
│   ├── ProductCarousel/
│   └── ui/             # UI компоненты (Button, etc.)
├── hooks/              # Кастомные хуки
│   ├── useMenuToggle.js
│   ├── useScrollToSection.js
│   ├── useMediaQuery.js
│   └── useThrottledCallback.js
├── utils/              # Утилиты
│   ├── textUtils.js
│   └── constants.js
├── constants/          # Константы
│   ├── sections.js
│   └── routes.js
├── data/               # Статические данные
│   └── tireTypes.json
├── lib/                # Библиотечные утилиты
│   └── utils.js        # cn функция
├── App.jsx
├── main.jsx
└── index.css
```

---

## ✅ Чеклист рефакторинга

### Критичные (сделать немедленно)
- [ ] Создать `src/lib/utils.js` с функцией `cn`
- [ ] Исправить пути импорта (использовать алиасы `@/`)
- [ ] Удалить неиспользуемую зависимость `styled-components`

### Важные (в ближайшее время)
- [ ] Добавить throttling/debouncing для событий
- [ ] Оптимизировать `ProductCarousel` с `requestAnimationFrame`
- [ ] Добавить keyboard navigation
- [ ] Добавить focus trap для модальных окон

### Улучшения (постепенно)
- [ ] Разбить `App.jsx` на компоненты
- [ ] Вынести дублирующуюся логику в утилиты
- [ ] Добавить константы вместо магических строк
- [ ] Добавить обработку ошибок
- [ ] Исправить использование `key` в map
- [ ] Добавить PropTypes или мигрировать на TypeScript
- [ ] Написать тесты

---

## 📚 Дополнительные ресурсы

- [React Best Practices](https://react.dev/learn)
- [Web Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Accessible Components Guide](https://www.w3.org/WAI/ARIA/apg/)
