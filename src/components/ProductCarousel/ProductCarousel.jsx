import React, { useRef, useState, useEffect, useCallback } from 'react';
import tireTypesData from '@/data/tireTypes.json';
import { useThrottledCallback } from '@/hooks/useThrottledCallback';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';
import { parseBulletPoints } from '@/utils/textUtils';

const ProductCarousel = () => {
  const trackRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const rafRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  
  // Проверка данных при монтировании
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    try {
      if (!tireTypesData || !Array.isArray(tireTypesData)) {
        throw new Error('Данные о шинах имеют неверный формат');
      }
      
      if (tireTypesData.length === 0) {
        throw new Error('Данные о шинах не найдены');
      }
      
      setData(tireTypesData);
    } catch (err) {
      console.error('Ошибка загрузки данных о шинах:', err);
      setError(err.message);
    }
  }, []);

  const updateArrowState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = track;
    // Используем небольшой допуск (1px) для учета округления и погрешностей
    const tolerance = 1;
    const isAtStart = scrollLeft <= tolerance;
    const isAtEnd = scrollLeft >= scrollWidth - clientWidth - tolerance;
    
    setCanScrollPrev(!isAtStart);
    setCanScrollNext(!isAtEnd);
  }, []);

  const scrollPrev = useCallback(() => {
    const track = trackRef.current;
    if (!track || !canScrollPrev) return;
    
    track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
    
    // Обновляем состояние после завершения smooth scroll
    // Используем несколько проверок для надежности
    const checkAfterScroll = () => {
      updateArrowState();
      // Дополнительная проверка через небольшую задержку
      setTimeout(updateArrowState, 350);
    };
    
    setTimeout(checkAfterScroll, 100);
  }, [canScrollPrev, updateArrowState]);

  const scrollNext = useCallback(() => {
    const track = trackRef.current;
    if (!track || !canScrollNext) return;
    
    track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
    
    // Обновляем состояние после завершения smooth scroll
    const checkAfterScroll = () => {
      updateArrowState();
      setTimeout(updateArrowState, 350);
    };
    
    setTimeout(checkAfterScroll, 100);
  }, [canScrollNext, updateArrowState]);

  const handleMouseDown = (event) => {
    const track = trackRef.current;
    if (!track) return;
    isDraggingRef.current = true;
    dragStartXRef.current = event.clientX;
    dragStartScrollLeftRef.current = track.scrollLeft;
  };

  const handleMouseMove = useCallback((event) => {
    if (!isDraggingRef.current) return;
    
    // Отменяем предыдущий requestAnimationFrame если есть
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    // Используем requestAnimationFrame для синхронизации с рендерингом
    rafRef.current = requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track || !isDraggingRef.current) return;
      
      const deltaX = event.clientX - dragStartXRef.current;
      track.scrollLeft = dragStartScrollLeftRef.current - deltaX;
    });
  }, []);

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    // Обновляем состояние стрелок после завершения drag
    updateArrowState();
  };

  const handleKeyDown = useCallback((event) => {
    const track = trackRef.current;
    if (!track) return;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        scrollPrev();
        break;
      case 'ArrowRight':
        event.preventDefault();
        scrollNext();
        break;
      case 'Home':
        event.preventDefault();
        track.scrollTo({ left: 0, behavior: 'smooth' });
        break;
      case 'End':
        event.preventDefault();
        track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
        break;
      default:
        // Игнорируем другие клавиши
        break;
    }
  }, [scrollPrev, scrollNext]);

  // Throttled версия для scroll (16ms = ~60fps)
  const throttledUpdateArrowState = useThrottledCallback(updateArrowState, 16);
  
  // Debounced версия для resize (300ms)
  const debouncedUpdateArrowState = useDebouncedCallback(updateArrowState, 300);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || data.length === 0) return;

    // Небольшая задержка для того, чтобы DOM успел отрендериться
    const timeoutId = setTimeout(() => {
      updateArrowState();
    }, 100);
    
    // Используем оптимизированные версии
    track.addEventListener('scroll', throttledUpdateArrowState);
    window.addEventListener('resize', debouncedUpdateArrowState);

    return () => {
      clearTimeout(timeoutId);
      track.removeEventListener('scroll', throttledUpdateArrowState);
      window.removeEventListener('resize', debouncedUpdateArrowState);
      
      // Очищаем requestAnimationFrame при размонтировании
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [data.length, updateArrowState, throttledUpdateArrowState, debouncedUpdateArrowState]);

  // Split description_short by bullet points
  const renderCard = (tire) => {
    const bulletPoints = parseBulletPoints(tire.description_short);

    return (
      <article key={tire.id} className="card-base product-card">
        <h3 className="product-card-title">{tire.name}</h3>
        <ul className="product-card-list">
          {bulletPoints.map((item) => (
            <li key={`${tire.id}-${item.substring(0, 20)}`} className="product-card-item">
              • {item}
            </li>
          ))}
        </ul>
      </article>
    );
  };

  // Обработка ошибок и пустых данных
  if (error) {
    return (
      <div className="product-carousel" role="alert" aria-live="assertive">
        <div className="section">
          <p className="section-description" style={{ color: 'var(--color-muted)' }}>
            Ошибка загрузки данных: {error}
          </p>
        </div>
      </div>
    );
  }
  
  if (data.length === 0) {
    return (
      <div className="product-carousel" role="status" aria-live="polite">
        <div className="section">
          <p className="section-description" style={{ color: 'var(--color-muted)' }}>
            Нет доступных продуктов
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-carousel">
      <div
        className="product-carousel-track"
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUpOrLeave}
        onMouseUp={handleMouseUpOrLeave}
        onKeyDown={handleKeyDown}
        role="region"
        aria-label="Карусель продуктов"
        aria-live="polite"
        aria-atomic="true"
        tabIndex={0}
      >
        {data.map(renderCard)}
      </div>

      <button
        className="carousel-nav carousel-nav-prev"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        aria-label="Предыдущий слайд"
      >
        ←
      </button>

      <button
        className="carousel-nav carousel-nav-next"
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label="Следующий слайд"
      >
        →
      </button>
    </div>
  );
};

export default ProductCarousel;
